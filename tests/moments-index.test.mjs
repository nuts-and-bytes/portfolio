import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import * as store from '../server/moments-store.mjs'

const id = '8299999999999-12345678-1234-4123-8123-123456789abc'
const image = {pathname: 'uploads/12345678-1234-4123-8123-123456789abc.png', type: 'image/png', size: 123}
const original = {id, status: 'published', text: 'old', media: [image], createdAt: '2026-01-01T00:00:00.000Z', etag: 'test-etag'}
function pid(n) { return `${String(n).padStart(13, '0')}-12345678-1234-4123-8123-123456789abc` }
function entry(n, text = 'hello') { return {id: pid(n), text, createdAt: '2026-01-01T00:00:00.000Z', media: []} }

test('opening the feed reads the index and pages it, without a blob list cursor', async () => {
  const posts = Array.from({length: 25}, (_, n) => entry(n))
  let reads = 0
  const page = await store.listPosts(undefined, {readFeed: async () => { reads++; return posts }})
  assert.equal(reads, 1)
  assert.equal(page.posts.length, 20)
  assert.equal(page.cursor, '20')
  const rest = await store.listPosts('20', {readFeed: async () => posts})
  assert.equal(rest.posts.length, 5)
  assert.equal(rest.cursor, null)
  await assert.rejects(() => store.listPosts('opaque-blob-cursor', {readFeed: async () => posts}), /重新加载/)
})

test('a logged-in refresh asks for a fresh index read', async () => {
  let fresh = false
  await store.listPosts(undefined, {fresh: true, readFeed: async value => { fresh = value; return [] }})
  assert.equal(fresh, true)
  await store.listPosts(undefined, {readFeed: async value => { fresh = value; return [] }})
  assert.equal(fresh, false)
})

test('the index cannot smuggle private fields or external media urls', async () => {
  const dirty = [{...entry(1), secret: true, media: [
    {type: 'image/png', size: 4, url: '/api/moments-media?id=' + pid(1) + '&index=0&v=1', pathname: 'uploads/secret.png'},
    {type: 'image/png', size: 4, url: 'https://evil.test/a.png'},
  ]}]
  const page = await store.listPosts(undefined, {readFeed: async () => dirty})
  assert.equal(JSON.stringify(page).includes('secret'), false)
  assert.equal(JSON.stringify(page).includes('pathname'), false)
  assert.equal(JSON.stringify(page).includes('evil.test'), false)
  assert.equal(page.posts[0].media.length, 1)
})

test('publish, edit, and delete update one ordered index', () => {
  const first = {id: pid(2), status: 'published', text: 'first', media: [], createdAt: '2026-01-01T00:00:00.000Z'}
  const second = {id: pid(1), status: 'published', text: 'second', media: [], createdAt: '2026-01-02T00:00:00.000Z'}
  let posts = []
  posts = store.nextFeed(posts, {type: 'publish', record: first})
  posts = store.nextFeed(posts, {type: 'publish', record: second})
  assert.deepEqual(posts.map(post => post.id), [second.id, first.id])
  const again = store.nextFeed(posts, {type: 'publish', record: second})
  assert.equal(again, posts)
  const edited = {...second, text: 'changed', updatedAt: '2026-01-03T00:00:00.000Z'}
  posts = store.nextFeed(posts, {type: 'update', record: edited})
  assert.equal(posts[0].text, 'changed')
  assert.equal(posts[1].id, first.id)
  posts = store.nextFeed(posts, {type: 'delete', id: second.id})
  assert.deepEqual(posts.map(post => post.id), [first.id])
  assert.equal(store.nextFeed(posts, {type: 'delete', id: 'missing'}), posts)
})

test('an edit of a post missing from the index is inserted without dropping newer posts', () => {
  const newer = entry(1, 'newer')
  const older = {...entry(9, 'older'), updatedAt: '2026-01-02T00:00:00.000Z'}
  const posts = store.nextFeed([newer], {type: 'update', record: {...older, status: 'published', media: []}})
  assert.deepEqual(posts.map(post => post.text), ['newer', 'older'])
})

test('index writes retry once after a conflict and skip a no-op delete', async () => {
  let posts = [entry(1)]
  let etag = '1'
  let saves = 0
  const io = {
    load: async () => ({posts, etag}),
    save: async (next, match) => {
      saves++
      if (saves === 1) throw Error('conflict')
      assert.equal(match, '1')
      posts = next
      etag = '2'
      return {posts, etag}
    },
  }
  await store.commitFeed({type: 'publish', record: {id: pid(2), status: 'published', text: 'new', media: [], createdAt: '2026-02-01T00:00:00.000Z'}}, io)
  assert.equal(saves, 2)
  assert.equal(posts[0].id, pid(2))
  await store.commitFeed({type: 'delete', id: 'missing'}, io)
  assert.equal(saves, 2)
})

test('saving a moment also updates the index, and a failed index update rolls the edit back', async () => {
  let record = structuredClone(original)
  const events = []
  const io = {
    getPost: async () => record,
    head: async () => ({contentType: 'image/png', size: 123}),
    put: async (_path, value, options) => {
      assert.equal(options.ifMatch, record.etag)
      record = {...JSON.parse(value), etag: record.etag === 'test-etag' ? 'next-etag' : 'restored-etag'}
      return {etag: record.etag}
    },
    noteFeed: async event => events.push(event),
  }
  const published = await store.publishPost({id, text: 'ignored', media: []}, io)
  assert.equal(events.at(-1).type, 'publish')
  assert.equal(published.text, 'old')
  const updated = await store.updatePost({id, text: 'new', keepMedia: [0], media: [], revision: original.createdAt}, io)
  assert.equal(events.at(-1).type, 'update')
  assert.equal(events.at(-1).record.text, 'new')
  assert.equal(updated.text, 'new')
  await store.deletePost(id, io)
  assert.equal(events.at(-1).type, 'delete')
  assert.equal(record.status, 'deleted')
  await store.deletePost(id, io)
  assert.equal(events.at(-1).type, 'delete')

  record = structuredClone(original)
  const failing = {...io, noteFeed: async () => { throw Error('index down') }}
  await assert.rejects(() => store.updatePost({id, text: 'new', keepMedia: [0], media: [], revision: original.createdAt}, failing), /公开列表/)
  assert.equal(record.text, 'old')
  assert.equal(record.etag, 'restored-etag')
})

test('list() stays in the one-time index rebuild, not on the feed read', () => {
  const source = readFileSync(new URL('../server/moments-store.mjs', import.meta.url), 'utf8')
  const calls = [...source.matchAll(/\blist\(/g)]
  assert.equal(calls.length, 1)
  const scan = source.slice(source.indexOf('async function scanPublished'), source.indexOf('async function saveFeed'))
  assert.match(scan, /\blist\(/)
  const read = source.slice(source.indexOf('async function loadIndex'), source.indexOf('async function fetchFeed'))
  assert.equal(/\blist\(/.test(read), false)
})
