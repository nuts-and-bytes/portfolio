import {handleUpload} from '@vercel/blob/client'
import {requireOwner,requireOrigin,json,readBody,storageReady} from '../server/moments-auth.mjs'
import {MEDIA,validateMedia} from '../server/moments-core.mjs'
export default async function handler(req,res){try{
 if(req.method!=='POST')return json(res,405,{error:'不支持此操作'})
 if(!storageReady())return json(res,503,{error:'存储未配置'})
 const body=readBody(req)
 const result=await handleUpload({request:req,body,onBeforeGenerateToken:async(pathname,payload)=>{
   requireOrigin(req);requireOwner(req);if(!MEDIA.test(pathname))throw Error('不允许的上传路径');const info=JSON.parse(payload||'{}');validateMedia(info)
   return {allowedContentTypes:[info.type],maximumSizeInBytes:info.size,validUntil:Date.now()+15*60000,addRandomSuffix:false,allowOverwrite:false}
 },onUploadCompleted:async()=>{}})
 return json(res,200,result)
 }catch(e){return json(res,e.status||400,{error:e.status?e.message:'上传未完成，请检查格式和大小后重试'})}}
