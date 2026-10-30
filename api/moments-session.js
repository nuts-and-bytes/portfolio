import {issueSession,safeEqual} from '../server/moments-core.mjs'
import {isOwner,requireOrigin,json,readBody,secret,storageReady} from '../server/moments-auth.mjs'
export default async function handler(req,res){try{
 if(req.method==='GET')return json(res,200,{owner:isOwner(req),configured:secret().length>=32&&storageReady()})
 requireOrigin(req)
 if(req.method==='DELETE'){res.setHeader('Set-Cookie','stone_session=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0');return json(res,200,{ok:true})}
 if(req.method!=='POST')return json(res,405,{error:'不支持此操作'})
 if(secret().length<32||!storageReady())return json(res,503,{error:'发布服务尚未配置完成'})
 const body=readBody(req);if(typeof body?.key!=='string'||!safeEqual(body.key,secret())){await new Promise(r=>setTimeout(r,700));return json(res,401,{error:'登录口令不正确'})}
 res.setHeader('Set-Cookie',`stone_session=${issueSession(secret())}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`);return json(res,200,{owner:true})
 }catch(e){return json(res,e.status||400,{error:e.message})}}
