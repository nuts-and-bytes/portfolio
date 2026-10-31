import test from 'node:test'
import assert from 'node:assert/strict'
import {internalRoute,navigate,subscribe} from '../src/lib/navigation.js'
function click(href,extra={}){return {button:0,target:{closest:()=>({href,target:'',hasAttribute:()=>false})},...extra}}
test('internal links stay in the app but external links and modified clicks retain browser behavior',()=>{
 assert.equal(internalRoute(click('https://heystone.site/moments'),'https://heystone.site').pathname,'/moments')
 assert.equal(internalRoute(click('https://heystone.site/moments/'),'https://heystone.site').pathname,'/moments')
 assert.equal(internalRoute(click('https://heystone.site/moments/?post=1'),'https://heystone.site').search,'?post=1')
 assert.equal(internalRoute(click('https://heystone.site/moments/extra'),'https://heystone.site'),null)
 assert.equal(internalRoute(click('https://heystone.site/#cases'),'https://heystone.site').hash,'#cases')
 assert.equal(internalRoute(click('https://x.com/intent/tweet'),'https://heystone.site'),null)
 assert.equal(internalRoute(click('https://heystone.site/moments',{metaKey:true}),'https://heystone.site'),null)
 assert.equal(internalRoute(click('https://heystone.site/api/moments-media'),'https://heystone.site'),null)
})
test('navigation pushes a path string and updates route subscribers directly',()=>{
 const previous={location:globalThis.location,history:globalThis.history};let next,notified
 globalThis.location={origin:'https://heystone.site',href:'https://heystone.site/',pathname:'/',search:'',hash:''}
 globalThis.history={pushState:(_,__,url)=>next=url}
 const unsubscribe=subscribe(route=>{notified=route})
 try{navigate('/moments/');assert.equal(next,'/moments');assert.equal(typeof next,'string');assert.equal(notified,'/moments')}finally{unsubscribe();for(const [k,v] of Object.entries(previous)){if(v===undefined)delete globalThis[k];else globalThis[k]=v}}
})
test('clicking the same contact anchor again still scrolls to its section',()=>{
 const oldLocation=globalThis.location,oldDocument=globalThis.document;let scrolled=false
 globalThis.location={origin:'https://heystone.site',href:'https://heystone.site/#about'}
 globalThis.document={getElementById:id=>{assert.equal(id,'about');return {scrollIntoView:()=>{scrolled=true}}}}
 try{navigate('/#about');assert.equal(scrolled,true)}finally{if(oldLocation===undefined)delete globalThis.location;else globalThis.location=oldLocation;if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument}
})
