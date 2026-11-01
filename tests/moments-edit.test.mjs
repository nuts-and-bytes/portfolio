import test from 'node:test'
import assert from 'node:assert/strict'
import * as store from '../server/moments-store.mjs'
import handler from '../api/moments.js'
const id='8299999999999-12345678-1234-4123-8123-123456789abc'
const image={pathname:'uploads/12345678-1234-4123-8123-123456789abc.png',type:'image/png',size:123}
const original={id,status:'published',text:'old',media:[image],createdAt:'2026-01-01T00:00:00.000Z',etag:'test-etag'}
function fixture(){let record=structuredClone(original);return {io:{getPost:async()=>record,head:async()=>({contentType:'image/png',size:123}),put:async(_,value,options)=>{assert.equal(options.ifMatch,record.etag);record={...JSON.parse(value),etag:'updated-etag'}}},read:()=>record}}
test('editing preserves date and old media, accepts replacement, versions public URLs',async()=>{
 const f=fixture();const result=await store.updatePost({id,text:'new',keepMedia:[0],media:[],revision:original.createdAt},f.io)
 assert.equal(result.text,'new');assert.equal(result.createdAt,original.createdAt);assert.deepEqual(result.media,[image]);assert.ok(result.updatedAt)
 assert.match(store.publicPost(result).media[0].url,/&v=/)
 const replacement=await store.updatePost({id,text:'replacement',keepMedia:[],media:[image],revision:result.updatedAt},f.io);assert.equal(replacement.media.length,1)
})
test('editing rejects stale versions, foreign indexes and empty posts without changing original',async()=>{
 for(const body of [{revision:'stale',keepMedia:[0],text:'new'},{revision:original.createdAt,keepMedia:[9],text:'new'},{revision:original.createdAt,keepMedia:[],text:''}]){
 const f=fixture();await assert.rejects(()=>store.updatePost({id,media:[],...body},f.io));assert.deepEqual(f.read(),original)
 }
})
test('deletion is idempotent, removes public media and prevents edits or publish resurrection',async()=>{
 const f=fixture();await store.deletePost(id,f.io);assert.equal(f.read().status,'deleted');assert.deepEqual(f.read().media,[])
 await store.deletePost(id,f.io)
 await assert.rejects(()=>store.updatePost({id,text:'resurrect',keepMedia:[],media:[]},f.io))
 await assert.rejects(()=>store.publishPost({id,text:'retry',media:[]},f.io))
})
test('visitors and cross-site requests cannot edit or delete',async()=>{
 for(const method of ['PATCH','DELETE'])for(const origin of ['https://heystone.site','https://evil.example']){
 const res={setHeader(){},status(n){this.code=n;return this},json(){return this}}
 await handler({method,headers:{origin},body:{id,text:'forged'},query:{}},res)
 assert.equal(res.code,origin.includes('evil')?403:401)
 }
})

test('a concurrent write conflict does not report a successful update',async()=>{
 const f=fixture();f.io.put=async()=>{throw Error('etag mismatch')}
 await assert.rejects(()=>store.updatePost({id,text:'changed',keepMedia:[0],media:[],revision:original.createdAt},f.io))
 assert.equal(f.read().text,'old')
})
