import {test} from 'node:test'
import assert from 'node:assert/strict'
import {loadFeed,clearFeedCache} from '../src/lib/moments-feed.js'
test('prefetch and navigation share one public feed request; publishing can refresh',async()=>{
 clearFeedCache();let calls=0
 const fetcher=async()=>({posts:[{id:++calls}]})
 const [a,b]=await Promise.all([loadFeed(fetcher),loadFeed(fetcher)])
 assert.equal(calls,1);assert.deepEqual(a,b)
 assert.deepEqual(await loadFeed(fetcher),a)
 assert.equal((await loadFeed(fetcher,{force:true})).posts[0].id,2)
})
test('failed prefetch can be retried',async()=>{
 clearFeedCache()
 await assert.rejects(loadFeed(async()=>{throw Error('offline')}))
 assert.deepEqual(await loadFeed(async()=>({posts:[]})),{posts:[]})
})
