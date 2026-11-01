import {get,put,list,head} from '@vercel/blob'
import {ID,validateMedia,validatePost} from './moments-core.mjs'
export async function getPost(id){if(!ID.test(id))return null;const r=await get(`posts/${id}.json`,{access:'private',useCache:false});if(!r)return null;const post=JSON.parse(await new Response(r.stream).text());Object.defineProperty(post,'etag',{value:r.blob.etag});return post}
export function publicPost(p){return {id:p.id,text:p.text,createdAt:p.createdAt,updatedAt:p.updatedAt,media:p.media.map((m,i)=>({type:m.type,size:m.size,url:`/api/moments-media?id=${p.id}&index=${i}&v=${encodeURIComponent(p.updatedAt||p.createdAt)}`}))}}
export async function listPosts(cursor){const r=await list({prefix:'posts/',limit:20,...(cursor?{cursor}:{})});const posts=await Promise.all(r.blobs.map(b=>getPost(b.pathname.slice(6,-5))));return {posts:posts.filter(p=>p?.status==='published').map(publicPost),cursor:r.hasMore?r.cursor:null}}
export async function publishPost(p,io={getPost,head,put}){const existing=await io.getPost(p.id);if(existing){if(existing.status!=='published')throw Object.assign(Error('动态已删除'),{status:410});return existing;}
 for(const m of p.media){const meta=await io.head(m.pathname);if(meta.contentType!==m.type||meta.size!==m.size)throw Error('上传附件信息不一致，请重新上传');validateMedia({type:meta.contentType,size:meta.size})}
 const record={...p,status:'published',createdAt:new Date().toISOString()};
 try{await io.put(`posts/${p.id}.json`,JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/json'})}catch(error){const saved=await io.getPost(p.id);if(saved?.status==='published')return saved;throw error}
 return record
}

function failure(message,status=400){return Object.assign(Error(message),{status})}
export async function updatePost(input,io={getPost,head,put}){
 if(!input||!ID.test(input.id))throw failure('动态不存在',404)
 const existing=await io.getPost(input.id)
 if(existing?.status!=='published')throw failure('动态不存在或已删除',404)
 if(input.revision!==(existing.updatedAt||existing.createdAt))throw failure('这条动态已更新，请重新加载后再编辑',409)
 if(!Array.isArray(input.keepMedia)||input.keepMedia.some(i=>!Number.isInteger(i)||i<0||i>=existing.media.length)||new Set(input.keepMedia).size!==input.keepMedia.length||!Array.isArray(input.media))throw failure('附件选择不正确')
 const post=validatePost({id:input.id,text:input.text,media:[...input.keepMedia.map(i=>existing.media[i]),...input.media]})
 for(const m of input.media){const meta=await io.head(m.pathname);if(meta.contentType!==m.type||meta.size!==m.size)throw failure('上传附件信息不一致，请重新上传')}
 const record={...post,status:'published',createdAt:existing.createdAt,updatedAt:new Date().toISOString()}
 await io.put(`posts/${post.id}.json`,JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:true,ifMatch:existing.etag,contentType:'application/json'})
 return record
}
export async function deletePost(id,io={getPost,put}){
 if(!ID.test(id))throw failure('动态不存在',404)
 const existing=await io.getPost(id)
 if(!existing||existing.status==='deleted')return
 // Keep a tombstone so a retry of the original publish cannot restore the post.
 const record={id,status:'deleted',text:'',media:[],createdAt:existing.createdAt,deletedAt:new Date().toISOString()}
 await io.put(`posts/${id}.json`,JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:true,ifMatch:existing.etag,contentType:'application/json'})
}
