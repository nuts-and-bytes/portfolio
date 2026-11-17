import {requireOwner,requireOrigin,json,readBody,storageReady,isOwner} from '../server/moments-auth.mjs'
import {validatePost} from '../server/moments-core.mjs'
import {getPost,listPosts,publishPost,publicPost,updatePost,deletePost} from '../server/moments-store.mjs'
export default async function handler(req,res){try{
 if(['POST','PATCH','DELETE'].includes(req.method)){requireOrigin(req);requireOwner(req)}
 if(!storageReady())return json(res,503,{error:'动态抽屉还在整理中，稍后再来看看吧'})
 if(req.method==='GET'){const {id,cursor}=req.query;if(id){const post=await getPost(id);return post?.status==='published'?json(res,200,{post:publicPost(post)}):json(res,404,{error:'没找到这一条动态，可能已经收起来了'})}return json(res,200,await listPosts(typeof cursor==='string'?cursor:undefined,{fresh:isOwner(req)}))}
 if(req.method==='PATCH')return json(res,200,{post:publicPost(await updatePost(readBody(req)))})
 if(req.method==='DELETE'){await deletePost(readBody(req)?.id);return json(res,200,{ok:true})}
 if(req.method!=='POST')return json(res,405,{error:'不支持此操作'})
 const post=validatePost(readBody(req));return json(res,201,{post:publicPost(await publishPost(post))})
 }catch(e){console.error('moments',e.name);const fallback=req.method==='GET'?'小石头翻抽屉时卡了一下，稍后再来看看吧':'操作还没完成，写下的内容都在，稍后重试即可';return json(res,e.status||400,{error:e.status?e.message:fallback})}}
