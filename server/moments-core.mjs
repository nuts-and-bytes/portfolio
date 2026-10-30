import { createHmac, timingSafeEqual } from 'node:crypto'
export const MAX_TEXT=10000
export const TYPES=['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime']
export const ID=/^\d{13}-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
export const MEDIA=/^uploads\/[0-9a-f-]{36}\.(jpg|png|webp|gif|mp4|webm|mov)$/
export function safeEqual(a,b){const x=Buffer.from(String(a));const y=Buffer.from(String(b));return x.length===y.length&&timingSafeEqual(x,y)}
export function issueSession(secret,now=Date.now()) { if(secret.length<32)throw Error('未配置管理员登录');const exp=String(now+7*86400000);return `${exp}.${createHmac('sha256',secret).update('stone-session:'+exp).digest('base64url')}` }
export function verifySession(value,secret,now=Date.now()){if(!secret||secret.length<32||typeof value!=='string')return false;const [exp,sig,...rest]=value.split('.');if(rest.length||!/^\d{13}$/.test(exp)||Number(exp)<=now||Number(exp)>now+7*86400000)return false;return safeEqual(sig||'',createHmac('sha256',secret).update('stone-session:'+exp).digest('base64url'))}
export function validOrigin(origin,expected){return !!origin&&origin===expected}
export function validateMedia(m){if(!m||!TYPES.includes(m.type)||!Number.isSafeInteger(m.size)||m.size<=0)throw Error('不支持的附件格式');const limit=m.type.startsWith('video/')?50:10;if(m.size>limit*1024*1024)throw Error(`附件超过 ${limit} MB`);return true}
export function validatePost(input){if(!input||!ID.test(input.id)||typeof input.text!=='string'||input.text.length>MAX_TEXT||!Array.isArray(input.media)||input.media.length>9)throw Error('动态内容格式不正确');const media=input.media.map(m=>{validateMedia(m);if(!MEDIA.test(m.pathname))throw Error('附件路径不正确');return {pathname:m.pathname,type:m.type,size:m.size}});if(!input.text.trim()&&!media.length)throw Error('请写点内容或添加附件');if(new Set(media.map(m=>m.pathname)).size!==media.length)throw Error('附件重复');if(media.some(m=>m.type.startsWith('video/'))&&media.length!==1)throw Error('每条动态支持最多 9 张图片或 1 个视频');return {id:input.id,text:input.text.trim(),media}}
export function mediaBelongsToPost(post,path){return post?.status==='published'&&post.media?.some(m=>m.pathname===path)===true}
