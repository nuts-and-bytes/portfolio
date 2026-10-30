import {verifySession,validOrigin} from './moments-core.mjs'
export const origin=()=>process.env.STONE_SITE_ORIGIN||'https://heystone.site'
export const secret=()=>process.env.STONE_ADMIN_KEY||''
export function isOwner(req){const value=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('stone_session='))?.slice(14);return verifySession(value,secret())}
export function requireOwner(req){if(!isOwner(req)){const e=Error('请先登录');e.status=401;throw e}}
export function requireOrigin(req){if(!validOrigin(req.headers.origin,origin())){const e=Error('请求来源不允许');e.status=403;throw e}}
export function json(res,status,body){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');return res.status(status).json(body)}
export function readBody(req){if(Number(req.headers['content-length'])>100000)throw Error('请求过大');const value=typeof req.body==='string'?JSON.parse(req.body):req.body;if(JSON.stringify(value||{}).length>100000)throw Error('请求过大');return value}
export function storageReady(){return !!(process.env.BLOB_READ_WRITE_TOKEN||process.env.BLOB_STORE_ID)}
