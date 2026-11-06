import {get, put, list, head} from '@vercel/blob'
import {ID, validateMedia, validatePost} from './moments-core.mjs'

// Listing the store is a Blob Advanced Operation (2,000/month on Hobby). Reading
// one object is a Simple Operation. The public feed is mirrored into one private
// index so page views never scan the store. A scan runs only while that index is missing.
const FEED_PATH = 'feed/index.json'
const PAGE = 20
const FEED_TTL = 15000
const POST_PUT = {access: 'private', addRandomSuffix: false, contentType: 'application/json'}

let memory = null
let generation = 0
let readSeq = 0
let pending = null
let rebuildPromise = null
let rebuildFailedAt = 0
const readingPosts = new Map()

function failure(message, status = 400) {
  return Object.assign(Error(message), {status})
}

export function publicPost(p) {
  return {
    id: p.id,
    text: p.text,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    media: p.media.map((m, i) => ({
      type: m.type,
      size: m.size,
      url: `/api/moments-media?id=${p.id}&index=${i}&v=${encodeURIComponent(p.updatedAt || p.createdAt)}`,
    })),
  }
}

function present(post) {
  if (!post || !ID.test(post.id) || typeof post.text !== 'string' || !Array.isArray(post.media)) return null
  return {
    id: post.id,
    text: post.text,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    media: post.media.filter(m => m && typeof m.url === 'string' && m.url.startsWith('/api/moments-media?')).map(m => ({type: m.type, size: m.size, url: m.url})),
  }
}

export async function getPost(id) {
  if (!ID.test(id)) return null
  const current = readingPosts.get(id)
  if (current) return current
  const run = readPost(id).finally(() => { if (readingPosts.get(id) === run) readingPosts.delete(id) })
  readingPosts.set(id, run)
  return run
}

async function readPost(id) {
  const result = await get(`posts/${id}.json`, {access: 'private', useCache: false})
  if (!result?.stream) return null
  const post = JSON.parse(await new Response(result.stream).text())
  Object.defineProperty(post, 'etag', {value: result.blob.etag})
  return post
}

export function pageFeed(posts, cursor) {
  let start = 0
  if (typeof cursor === 'string' && cursor.length) {
    if (!/^\d{1,9}$/.test(cursor)) throw failure('动态列表已更新，请重新加载', 400)
    start = Number(cursor)
  }
  const end = start + PAGE
  return {posts: posts.slice(start, end).map(present).filter(Boolean), cursor: end < posts.length ? String(end) : null}
}

function samePost(a, b) {
  return !!a && a.text === b.text && a.createdAt === b.createdAt && a.updatedAt === b.updatedAt && JSON.stringify(a.media) === JSON.stringify(b.media)
}

function insertById(posts, post) {
  const index = posts.findIndex(item => item.id > post.id)
  if (index === -1) return [...posts, post]
  return [...posts.slice(0, index), post, ...posts.slice(index)]
}

export function nextFeed(posts, event) {
  if (event.type === 'delete') {
    const next = posts.filter(post => post.id !== event.id)
    return next.length === posts.length ? posts : next
  }
  const post = publicPost(event.record)
  const index = posts.findIndex(item => item.id === post.id)
  if (event.type === 'publish') {
    if (index !== -1 && samePost(posts[index], post)) return posts
    const rest = index === -1 ? posts : posts.filter(item => item.id !== post.id)
    return [post, ...rest]
  }
  if (index === -1) return insertById(posts, post)
  if (samePost(posts[index], post)) return posts
  const next = posts.slice()
  next[index] = post
  return next
}

export async function commitFeed(event, io) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const current = await io.load()
    const posts = nextFeed(current.posts || [], event)
    if (posts === current.posts) return current
    try {
      return await io.save(posts, current.etag)
    } catch (error) {
      if (attempt === 4) throw error
    }
  }
}

async function syncFeed(event) {
  await commitFeed(event, {
    load: loadIndex,
    save: (posts, etag) => saveFeed(posts, etag ? {etag} : {}),
  })
}

async function mirror(io, event) {
  if (typeof io.noteFeed !== 'function') return
  try {
    await io.noteFeed(event)
  } catch (error) {
    if (error.status) throw error
    throw failure('动态已保存，但公开列表更新失败，请再试一次', 503)
  }
}

export async function listPosts(cursor, options = {}) {
  const readFeed = options.readFeed || (fresh => readPublishedFeed({fresh}))
  const posts = await readFeed(options.fresh === true)
  if (!Array.isArray(posts)) throw failure('动态列表暂时不可用', 503)
  return pageFeed(posts, cursor)
}

export async function readPublishedFeed({fresh = false} = {}) {
  if (!fresh && memory && Date.now() - memory.at < FEED_TTL) return memory.posts
  if (!fresh && pending) return (await pending).posts
  const run = loadIndex()
  if (!fresh) pending = run.finally(() => { if (pending === run) pending = null })
  return (await run).posts
}

async function loadIndex() {
  const existing = await fetchFeed()
  if (existing) return existing
  return ensureFeed()
}

async function fetchFeed() {
  const token = generation
  const seq = ++readSeq
  const result = await get(FEED_PATH, {access: 'private', useCache: false})
  if (!result?.stream) return generation === token ? null : memory
  let body = null
  try { body = JSON.parse(await new Response(result.stream).text()) } catch { body = null }
  if (!body || body.version !== 1 || !Array.isArray(body.posts)) return generation === token ? null : memory
  const state = {posts: body.posts, etag: result.blob.etag, at: Date.now()}
  // A write that landed while this read was in flight is newer than the body just parsed.
  if (generation !== token) return memory || state
  // A slower read must not overwrite a read that started later. Callers still use the body they fetched.
  if (seq !== readSeq) return state
  memory = state
  return state
}

async function ensureFeed() {
  if (rebuildFailedAt && Date.now() - rebuildFailedAt < FEED_TTL) throw failure('动态列表暂时不可用', 503)
  if (!rebuildPromise) {
    rebuildPromise = rebuild().then(state => {
      rebuildFailedAt = 0
      return state
    }).catch(error => {
      rebuildFailedAt = Date.now()
      throw error
    }).finally(() => { rebuildPromise = null })
  }
  return rebuildPromise
}

async function rebuild() {
  const posts = await scanPublished()
  const current = await fetchFeed()
  if (current) return current
  try {
    return await saveFeed(posts, {create: true})
  } catch {
    const winner = await fetchFeed()
    if (winner) return winner
    return saveFeed(posts)
  }
}

function idFromPath(pathname) {
  return String(pathname).match(/(?:^|\/)posts\/([^/]+)\.json$/)?.[1] || ''
}

async function scanPublished() {
  const posts = []
  let cursor
  for (let page = 0; page < 20; page++) {
    const result = await list({prefix: 'posts/', limit: 1000, ...(cursor ? {cursor} : {})})
    const records = await Promise.all(result.blobs.map(blob => {
      const id = idFromPath(blob.pathname)
      return ID.test(id) ? getPost(id) : null
    }))
    for (const post of records) if (post?.status === 'published') posts.push(publicPost(post))
    if (!result.hasMore) return posts
    cursor = result.cursor
  }
  return posts
}

async function saveFeed(posts, {etag, create = false} = {}) {
  const blob = await put(FEED_PATH, JSON.stringify({version: 1, posts}), {
    ...POST_PUT,
    allowOverwrite: !create,
    cacheControlMaxAge: 60,
    ...(etag ? {ifMatch: etag} : {}),
  })
  const state = {posts, etag: blob.etag, at: Date.now()}
  generation += 1
  memory = state
  return state
}

export async function publishPost(p, io = {getPost, head, put, noteFeed: syncFeed}) {
  const existing = await io.getPost(p.id)
  if (existing) {
    if (existing.status !== 'published') throw Object.assign(Error('动态已删除'), {status: 410})
    await mirror(io, {type: 'publish', record: existing})
    return existing
  }
  for (const m of p.media) {
    const meta = await io.head(m.pathname)
    if (meta.contentType !== m.type || meta.size !== m.size) throw Error('上传附件信息不一致，请重新上传')
    validateMedia({type: meta.contentType, size: meta.size})
  }
  const record = {...p, status: 'published', createdAt: new Date().toISOString()}
  try {
    await io.put(`posts/${p.id}.json`, JSON.stringify(record), {...POST_PUT, allowOverwrite: false})
  } catch (error) {
    const saved = await io.getPost(p.id)
    if (saved?.status === 'published') {
      await mirror(io, {type: 'publish', record: saved})
      return saved
    }
    throw error
  }
  await mirror(io, {type: 'publish', record})
  return record
}

export async function updatePost(input, io = {getPost, head, put, noteFeed: syncFeed}) {
  if (!input || !ID.test(input.id)) throw failure('动态不存在', 404)
  const existing = await io.getPost(input.id)
  if (existing?.status !== 'published') throw failure('动态不存在或已删除', 404)
  if (input.revision !== (existing.updatedAt || existing.createdAt)) throw failure('这条动态已更新，请重新加载后再编辑', 409)
  if (!Array.isArray(input.keepMedia) || input.keepMedia.some(i => !Number.isInteger(i) || i < 0 || i >= existing.media.length) || new Set(input.keepMedia).size !== input.keepMedia.length || !Array.isArray(input.media)) throw failure('附件选择不正确')
  const post = validatePost({id: input.id, text: input.text, media: [...input.keepMedia.map(i => existing.media[i]), ...input.media]})
  for (const m of input.media) {
    const meta = await io.head(m.pathname)
    if (meta.contentType !== m.type || meta.size !== m.size) throw failure('上传附件信息不一致，请重新上传')
  }
  const record = {...post, status: 'published', createdAt: existing.createdAt, updatedAt: new Date().toISOString()}
  const written = await io.put(`posts/${post.id}.json`, JSON.stringify(record), {...POST_PUT, allowOverwrite: true, ifMatch: existing.etag})
  try {
    await mirror(io, {type: 'update', record})
  } catch (error) {
    if (written?.etag) {
      const previous = {...existing}
      delete previous.etag
      try {
        await io.put(`posts/${post.id}.json`, JSON.stringify(previous), {...POST_PUT, allowOverwrite: true, ifMatch: written.etag})
      } catch { /* the failed index update is still the error the caller retries */ }
    }
    throw error
  }
  return record
}

export async function deletePost(id, io = {getPost, put, noteFeed: syncFeed}) {
  if (!ID.test(id)) throw failure('动态不存在', 404)
  const existing = await io.getPost(id)
  if (!existing || existing.status === 'deleted') {
    await mirror(io, {type: 'delete', id})
    return
  }
  // Keep a tombstone so a retry of the original publish cannot restore the post.
  const record = {id, status: 'deleted', text: '', media: [], createdAt: existing.createdAt, deletedAt: new Date().toISOString()}
  await io.put(`posts/${id}.json`, JSON.stringify(record), {...POST_PUT, allowOverwrite: true, ifMatch: existing.etag})
  await mirror(io, {type: 'delete', id})
}
