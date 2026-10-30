import {get} from '@vercel/blob'
import {Readable} from 'node:stream'
import {getPost} from '../server/moments-store.mjs'
import {mediaBelongsToPost} from '../server/moments-core.mjs'
export default async function handler(req,res){try{
 if(!['GET','HEAD'].includes(req.method))return res.status(405).end()
 const {id,index,download}=req.query;if(!/^\d$/.test(index||''))return res.status(404).end()
 const post=await getPost(id);const media=post?.media?.[Number(index)];if(!media||!mediaBelongsToPost(post,media.pathname))return res.status(404).end()
 const blob=await get(media.pathname,{access:'private',...(req.headers.range?{headers:{Range:req.headers.range}}:{})});if(!blob?.stream)return res.status(404).end()
 res.status(blob.headers.get('content-range')?206:200);res.setHeader('Content-Type',media.type);res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','public, max-age=60');res.setHeader('Accept-Ranges','bytes');
 for(const h of ['content-length','content-range'])if(blob.headers.get(h))res.setHeader(h,blob.headers.get(h))
 if(download==='1')res.setHeader('Content-Disposition',`attachment; filename="stone-${Number(index)+1}.${media.pathname.split('.').pop()}"`)
 if(req.method==='HEAD'){await blob.stream.cancel();return res.end()}
 Readable.fromWeb(blob.stream).on('error',()=>res.destroy()).pipe(res)
 }catch{if(!res.headersSent)res.status(404).end();else res.destroy()}}
