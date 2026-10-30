// Only public feed data is cached; login and drafts never enter this cache.
let cached = null
let pending = null
let generation = 0
const TTL = 15000
export function clearFeedCache() { cached = null; pending = null; generation++ }
export async function loadFeed(fetcher, {force = false} = {}) {
  if (force) clearFeedCache()
  if (cached && Date.now() - cached.at < TTL) return cached.data
  if (pending) return pending
  const version = generation
  const request = Promise.resolve().then(fetcher).then(data => {
    if (version === generation) cached = {data, at: Date.now()}
    return data
  }).finally(() => { if (pending === request) pending = null })
  pending = request
  return request
}
