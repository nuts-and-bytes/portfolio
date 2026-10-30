import test from 'node:test'
import assert from 'node:assert/strict'
import { issueSession, verifySession, validOrigin, validatePost, validateMedia, mediaBelongsToPost } from '../server/moments-core.mjs'
const secret='a'.repeat(48)
test('session rejects tampering, expiry and missing configuration',()=>{
 const cookie=issueSession(secret,1700000000000)
 assert.equal(verifySession(cookie,secret,1700000000001),true)
 assert.equal(verifySession(cookie+'x',secret,1700000000001),false)
 assert.equal(verifySession(cookie,secret,1700000000000+8*86400000),false)
 assert.equal(verifySession(cookie,'',1700000000001),false)
})
test('writes require the configured origin, not arbitrary host headers',()=>{
 assert.equal(validOrigin('https://heystone.site','https://heystone.site'),true)
 assert.equal(validOrigin('https://evil.test','https://heystone.site'),false)
 assert.equal(validOrigin(undefined,'https://heystone.site'),false)
})
test('post validates text, ids and attachments instead of trusting browser payload',()=>{
 const id='8234567890123-12345678-1234-4234-8234-123456789012'
 assert.equal(validatePost({id,text:'hello',media:[]}).text,'hello')
 assert.throws(()=>validatePost({id,text:' ',media:[]}))
 assert.throws(()=>validatePost({id:'../private',text:'x',media:[]}))
 assert.throws(()=>validatePost({id,text:'x'.repeat(10001),media:[]}))
 assert.throws(()=>validatePost({id,text:'x',media:[{pathname:'https://evil.test/a.png',type:'image/png',size:1}]}))
})
test('media type and size limits enforce safe browser-playable attachments',()=>{
 assert.equal(validateMedia({type:'image/png',size:1024}),true)
 assert.equal(validateMedia({type:'video/mp4',size:40*1024*1024}),true)
 assert.throws(()=>validateMedia({type:'image/svg+xml',size:10}))
 assert.throws(()=>validateMedia({type:'video/mp4',size:51*1024*1024}))
 assert.throws(()=>validateMedia({type:'image/png',size:0}))
})
test('private uploads cannot be accessed until referenced by a published post',()=>{
 const path='uploads/a.png'
 assert.equal(mediaBelongsToPost({status:'draft',media:[{pathname:path}]},path),false)
 assert.equal(mediaBelongsToPost({status:'published',media:[{pathname:path}]},path),true)
 assert.equal(mediaBelongsToPost({status:'published',media:[]},path),false)
})
