import {requireOwner,requireOrigin,json,readBody,storageReady} from '../server/moments-auth.mjs'
import {validatePost} from '../server/moments-core.mjs'
import {getPost,listPosts,publishPost,publicPost,updatePost,deletePost} from '../server/moments-store.mjs'
export default async function handler(req,res){try{
 if(['POST','PATCH','DELETE'].includes(req.method)){requireOrigin(req);requireOwner(req)}
 if(!storageReady())return json(res,503,{error:'动态服务尚未配置完成'})
 if(req.method==='GET'){const {id,cursor}=req.query;if(id){const post=await getPost(id);return post?.status==='published'?json(res,200,{post:publicPost(post)}):json(res,404,{error:'动态不存在'})}return json(res,200,await listPosts(typeof cursor==='string'?cursor:undefined))}
 if(req.method==='PATCH')return json(res,200,{post:publicPost(await updatePost(readBody(req)))})
 if(req.method==='DELETE'){await deletePost(readBody(req)?.id);return json(res,200,{ok:true})}
 if(req.method!=='POST')return json(res,405,{error:'不支持此操作'})
 const post=validatePost(readBody(req));return json(res,201,{post:publicPost(await publishPost(post))})
 }catch(e){console.error('moments',e.name);return json(res,e.status||400,{error:e.status?e.message:'操作未完成，请保留内容并重试'})}}
