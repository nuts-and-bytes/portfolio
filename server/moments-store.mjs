import {get,put,list,head} from '@vercel/blob'
import {ID,validateMedia} from './moments-core.mjs'
export async function getPost(id){if(!ID.test(id))return null;const r=await get(`posts/${id}.json`,{access:'private',useCache:false});return r?JSON.parse(await new Response(r.stream).text()):null}
export function publicPost(p){return {id:p.id,text:p.text,createdAt:p.createdAt,media:p.media.map((m,i)=>({type:m.type,size:m.size,url:`/api/moments-media?id=${p.id}&index=${i}`}))}}
export async function listPosts(cursor){const r=await list({prefix:'posts/',limit:20,...(cursor?{cursor}:{})});const posts=await Promise.all(r.blobs.map(b=>getPost(b.pathname.slice(6,-5))));return {posts:posts.filter(p=>p?.status==='published').map(publicPost),cursor:r.hasMore?r.cursor:null}}
export async function publishPost(p){const existing=await getPost(p.id);if(existing)return existing;
 for(const m of p.media){const meta=await head(m.pathname);if(meta.contentType!==m.type||meta.size!==m.size)throw Error('上传附件信息不一致，请重新上传');validateMedia({type:meta.contentType,size:meta.size})}
 const record={...p,status:'published',createdAt:new Date().toISOString()};
 try{await put(`posts/${p.id}.json`,JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json'})}catch(error){const saved=await getPost(p.id);if(saved)return saved;throw error}
 return record
}
