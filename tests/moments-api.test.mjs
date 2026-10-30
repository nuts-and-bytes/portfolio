import test from 'node:test'
import assert from 'node:assert/strict'
import session from '../api/moments-session.js'
import posts from '../api/moments.js'
import media from '../api/moments-media.js'

function response(){return {headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.code=n;return this},json(body){this.body=body;return this},end(){this.ended=true;return this}}}
test('incomplete configuration explains the missing step without exposing credentials',async()=>{
 const previous=process.env.STONE_ADMIN_KEY
 process.env.STONE_ADMIN_KEY='short-test-value'
 try{const res=response();await session({method:'GET',headers:{}},res);assert.equal(res.body.configured,false);assert.match(res.body.configurationIssue,/至少 32/);assert.equal(JSON.stringify(res.body).includes('short-test-value'),false)}finally{if(previous===undefined)delete process.env.STONE_ADMIN_KEY;else process.env.STONE_ADMIN_KEY=previous}
})
test('public visitors cannot publish, including a forged owner field',async()=>{
 const res=response();await posts({method:'POST',headers:{origin:'https://heystone.site'},body:{owner:true,text:'forged'},query:{}},res)
 assert.equal(res.code,401)
})
test('cross-site requests cannot create or delete a session',async()=>{
 for(const method of ['POST','DELETE']){const res=response();await session({method,headers:{origin:'https://evil.example'},body:{}},res);assert.equal(res.code,403)}
})
test('session login issues a secure cookie and logout clears it',async()=>{
 const previous=process.env.STONE_ADMIN_KEY,storage=process.env.BLOB_STORE_ID
 process.env.STONE_ADMIN_KEY='local-test-only-key-with-at-least-32-characters';process.env.BLOB_STORE_ID='test-store'
 try{
  const res=response();await session({method:'POST',headers:{origin:'https://heystone.site'},body:{key:process.env.STONE_ADMIN_KEY}},res)
  assert.equal(res.code,200);assert.match(res.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Strict/)
  const read=response();await session({method:'GET',headers:{cookie:res.headers['Set-Cookie'].split(';')[0]}},read);assert.equal(read.body.owner,true)
  const out=response();await session({method:'DELETE',headers:{origin:'https://heystone.site'}},out);assert.match(out.headers['Set-Cookie'],/Max-Age=0/)
 }finally{if(previous===undefined)delete process.env.STONE_ADMIN_KEY;else process.env.STONE_ADMIN_KEY=previous;if(storage===undefined)delete process.env.BLOB_STORE_ID;else process.env.BLOB_STORE_ID=storage}
})
test('media endpoint rejects arbitrary paths before touching storage',async()=>{
 const res=response();await media({method:'GET',headers:{},query:{id:'../private',index:'0'}},res);assert.equal(res.code,404)
})
