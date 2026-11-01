import {useEffect,useRef,useState} from 'react'
import {upload} from '@vercel/blob/client'
import Footer from '../components/Footer'
import {api,checkFiles,draft,postId,postUrl,TYPES} from '../lib/moments'
import '../moments.css'
import {loadFeed,clearFeedCache} from '../lib/moments-feed'

function Attachment({file}){
 const [url,setUrl]=useState('')
 useEffect(()=>{const value=URL.createObjectURL(file);setUrl(value);return()=>URL.revokeObjectURL(value)},[file])
 return file.type.startsWith('video/')?<video src={url} controls playsInline preload="metadata"/>:<img src={url} alt="待发布图片预览"/>
}
async function uploadMedia(files,cache,onProgress){
 const media=[]
 for(let i=0;i<files.length;i++){
  const file=files[i];let path=cache.get(file)
  if(!path){const ext=file.type.split('/')[1].replace('jpeg','jpg').replace('quicktime','mov');const result=await upload(`uploads/${crypto.randomUUID()}.${ext}`,file,{access:'private',handleUploadUrl:'/api/moments-upload',clientPayload:JSON.stringify({type:file.type,size:file.size}),multipart:file.size>5*1024*1024,onUploadProgress:p=>onProgress(`上传附件 ${i+1}/${files.length} · ${Math.round(p.percentage)}%`)});path=result.pathname;cache.set(file,path)}
  media.push({pathname:path,type:file.type,size:file.size})
 }
 return media
}
function EditPost({post,onSave,onCancel}){
 const [text,setText]=useState(post.text),[kept,setKept]=useState(post.media.map((_,i)=>i)),[files,setFiles]=useState([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[progress,setProgress]=useState('')
 const input=useRef(),cache=useRef(new Map()),lock=useRef(false)
 const dirty=text!==post.text||kept.length!==post.media.length||files.length>0
 useEffect(()=>{const warn=e=>{if(dirty){e.preventDefault();e.returnValue=''}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn)},[dirty])
 function add(items){if(busy)return;try{const next=[...files,...Array.from(items)];checkFiles([...kept.map(i=>post.media[i]),...next]);setFiles(next);setError('')}catch(e){setError(e.message)}}
 async function save(e){e.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError('');try{
  checkFiles([...kept.map(i=>post.media[i]),...files]);const media=await uploadMedia(files,cache.current,setProgress)
  setProgress('正在保存…');const result=await api('moments',{method:'PATCH',body:JSON.stringify({id:post.id,text,keepMedia:kept,media,revision:post.updatedAt||post.createdAt})});onSave(result.post)
 }catch(e){setError(e.message)}finally{lock.current=false;setBusy(false);setProgress('')}}
 return <form className="moment-editor" onSubmit={save} aria-label="编辑动态" onPaste={e=>{const incoming=Array.from(e.clipboardData?.items||[]).filter(i=>i.kind==='file').map(i=>i.getAsFile()).filter(Boolean);if(incoming.length){e.preventDefault();add(incoming)}}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();add(e.dataTransfer.files)}}>
  <h3>编辑动态</h3><textarea autoFocus aria-label="修改动态正文" value={text} maxLength={10000} disabled={busy} onChange={e=>setText(e.target.value)}/>
  <div className="moment-previews">{kept.map(i=><figure key={i}>{post.media[i].type.startsWith('video/')?<video src={post.media[i].url} controls playsInline preload="metadata"/>:<img src={post.media[i].url} alt={`原附件 ${i+1}`}/>}<button type="button" disabled={busy} onClick={()=>setKept(a=>a.filter(n=>n!==i))}>移除附件 {i+1}</button></figure>)}{files.map((file,i)=><figure key={i}><Attachment file={file}/><button type="button" disabled={busy} onClick={()=>setFiles(a=>a.filter((_,n)=>n!==i))}>移除新附件 {i+1}</button></figure>)}</div>
  <input type="file" ref={input} hidden multiple accept={TYPES.join(',')} onChange={e=>{add(e.target.files);e.target.value=''}}/>
  <div className="moment-actions"><button type="button" disabled={busy} onClick={()=>input.current.click()}>添加图片 / 视频</button><button className="moment-primary" disabled={busy||!dirty||(!text.trim()&&!kept.length&&!files.length)}>{busy?'保存中…':'保存修改'}</button><button type="button" disabled={busy} onClick={()=>{if(!dirty||window.confirm('放弃这次未保存的修改？'))onCancel()}}>取消</button></div>
  <small>支持粘贴图片、视频。保存后更新网站内容，已分享到其他平台的内容需自行修改。</small>
  {progress&&<p role="status">{progress}</p>}{error&&<p className="moment-error" role="alert">{error}，修改仍保留在这里。</p>}
 </form>
}
function Share({post,onClose}){
 const [status,setStatus]=useState('');const [files,setFiles]=useState(null);const [preparing,setPreparing]=useState(false)
 const text=`${post.text}\n\n${postUrl(post.id)}`
 async function copy(){try{await navigator.clipboard.writeText(text);setStatus('文案已复制，可粘贴到平台编辑器')}catch{setStatus('未能自动复制，请选中下方文案手动复制')}}
 async function prepare(){setPreparing(true);try{const items=await Promise.all(post.media.map(async(m,i)=>{const r=await fetch(m.url);if(!r.ok)throw Error('素材下载失败');return new File([await r.blob()],`stone-${i+1}.${m.type.split('/')[1].replace('jpeg','jpg').replace('quicktime','mov')}`,{type:m.type})}));setFiles(items);setStatus('素材已准备，可使用系统分享或逐个下载')}catch(e){setStatus(e.message)}finally{setPreparing(false)}}
 async function shareFiles(){try{await navigator.share({text:post.text,files});setStatus('已交给系统分享面板，请在目标应用确认发布')}catch(e){setStatus(e.name==='AbortError'?'已取消分享':'此设备不支持分享这些素材，请下载后手动添加')}}
 return <section className="moment-share" aria-label="辅助分享到 X 或小红书">
   <div className="moment-row"><h3>分享到 X / 小红书</h3><button onClick={onClose}>收起</button></div>
   <p>文案可带到 X；图片和视频需在平台手动添加。小红书请粘贴文案并添加素材，最后由你确认发布。</p>
   <textarea aria-label="分享文案" readOnly value={text} rows={4}/>
   <div className="moment-actions"><button onClick={copy}>复制文案</button><a href={`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">打开 X 编辑器 ↗</a><a href="https://creator.xiaohongshu.com/publish/publish" target="_blank" rel="noopener noreferrer">打开小红书创作中心 ↗</a></div>
   {post.media.length>0&&<><div className="moment-actions">{post.media.map((m,i)=><a key={m.url} href={`${m.url}&download=1`} download>下载{m.type.startsWith('video/')?'视频':`图片 ${i+1}`}</a>)}</div><button disabled={preparing} onClick={prepare}>{preparing?'正在准备素材…':'准备手机系统分享'}</button>{files&&navigator.canShare?.({files})&&<button onClick={shareFiles}>选择应用分享素材</button>}</>}
   <p role="status">{status}</p><small>打开编辑器不代表已经发布；平台发布结果请在对应账号中确认。</small>
 </section>
}
export default function Moments({route,active=true}){
 const [session,setSession]=useState(null),[login,setLogin]=useState(false),[key,setKey]=useState(''),[remember,setRemember]=useState(true),[posts,setPosts]=useState([]),[cursor,setCursor]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[notice,setNotice]=useState(''),[text,setText]=useState(''),[files,setFiles]=useState([]),[id,setId]=useState(postId),[busy,setBusy]=useState(false),[progress,setProgress]=useState(''),[restored,setRestored]=useState(false),[sharing,setSharing]=useState(null),[editing,setEditing]=useState(null),[deleting,setDeleting]=useState(null)
 const input=useRef();const uploaded=useRef(new Map());const lock=useRef(false)
 const selected=new URLSearchParams(location.search).get('post')
 async function load(next,force=false){setLoading(true);try{const path=`moments${selected?`?id=${encodeURIComponent(selected)}`:next?`?cursor=${encodeURIComponent(next)}`:''}`;const data=await (selected||next?api(path):loadFeed(()=>api(path),{force}));setPosts(p=>next?[...p,...data.posts]:data.post?[data.post]:data.posts);setCursor(data.cursor||null);setError('')}catch(e){setError(e.message)}finally{setLoading(false)}}
 useEffect(()=>{if(!active)return;api('moments-session').then(setSession).catch(()=>setSession({owner:false,configured:false,configurationIssue:'无法连接登录服务，请刷新页面重试。'}));load()},[active,route])
 useEffect(()=>{if(!session?.owner)return;let active=true;draft('get').then(value=>{if(!active)return;if(value){setText(value.text||'');setFiles(value.files||[]);setId(value.id||postId());setNotice('已恢复此设备的草稿')}setRestored(true)}).catch(()=>{setRestored(true);setNotice('此浏览器无法保存本地草稿，请勿在发布前关闭页面')});return()=>{active=false}},[session?.owner])
 useEffect(()=>{if(!session?.owner||!restored||busy)return;const timer=setTimeout(()=>draft('put',{id,text,files}).catch(()=>setNotice('本地草稿保存失败，请保持页面打开')),500);return()=>clearTimeout(timer)},[id,text,files,restored,busy,session?.owner])
 useEffect(()=>{const warn=e=>{if(text.trim()||files.length){e.preventDefault();e.returnValue=''}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn)},[text,files])
 async function signIn(e){e.preventDefault();setBusy(true);setError('');try{await api('moments-session',{method:'POST',body:JSON.stringify({key,remember})});setKey('');setSession({owner:true,configured:true});setLogin(false)}catch(e){setError(e.message)}finally{setBusy(false)}}
 async function logout(){try{await api('moments-session',{method:'DELETE'});setSession(s=>({...s,owner:false}));setText('');setFiles([]);setRestored(false);setEditing(null);setSharing(null);setNotice('已退出，草稿保留在此设备')}catch(e){setError(e.message)}}
 async function removePost(post){
  if(!window.confirm('确定删除这条动态？删除后网站上将不再展示，无法撤销。'))return
  setDeleting(post.id);setError('')
  try{await api('moments',{method:'DELETE',body:JSON.stringify({id:post.id})});clearFeedCache();setPosts(items=>items.filter(p=>p.id!==post.id));setSharing(null);setNotice('动态已删除。其他平台已发布的内容不会自动删除。')}catch(e){setError(e.message)}finally{setDeleting(null)}
 }
 function savedPost(post){clearFeedCache();setPosts(items=>items.map(p=>p.id===post.id?post:p));setEditing(null);setSharing(null);setNotice('修改已保存')}
 function add(items){if(busy)return;try{const all=[...files,...Array.from(items)];checkFiles(all);setFiles(all);setError('')}catch(e){setError(e.message)}}
 function paste(e){const incoming=Array.from(e.clipboardData?.items||[]).filter(i=>i.kind==='file').map(i=>i.getAsFile()).filter(Boolean);if(incoming.length){e.preventDefault();add(incoming)}}
 async function publish(){if(lock.current)return;lock.current=true;setBusy(true);setError('');try{
  checkFiles(files);if(!text.trim()&&!files.length)throw Error('请写点内容或添加附件')
  const media=await uploadMedia(files,uploaded.current,setProgress)
  setProgress('正在发布…');const {post}=await api('moments',{method:'POST',body:JSON.stringify({id,text,media})});clearFeedCache();setPosts(p=>[post,...p.filter(x=>x.id!==post.id)]);setSharing(post.id);setText('');setFiles([]);setId(postId());uploaded.current.clear();await draft('clear').catch(()=>{});setNotice('已发布到个人网站。分享到平台时，仍需你确认发布。')
 }catch(e){setError(e.message);setNotice('未发布成功，内容和附件仍保留，可重试')}finally{lock.current=false;setBusy(false);setProgress('')}}
 return <><main className="moments-page"><header className="moments-heading"><h1 tabIndex={-1}>动态</h1><p>想法、日常，和正在做的事。</p></header>
 {session?.owner&&<section className="moment-composer" aria-label="发布动态" onPaste={paste} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();add(e.dataTransfer.files)}}>
  <div className="moment-row"><h2>写一条动态</h2><button onClick={logout} disabled={busy||!!editing||!!deleting}>退出登录</button></div>
  <textarea value={text} onChange={e=>setText(e.target.value)} maxLength={10000} placeholder="此刻想分享什么？可以直接粘贴图片或视频文件。" aria-label="动态正文" disabled={busy}/>
  <div className="moment-previews">{files.map((f,i)=><figure key={`${f.name}-${i}`}><Attachment file={f}/><button disabled={busy} onClick={()=>setFiles(a=>a.filter((_,j)=>i!==j))} aria-label={`移除附件 ${i+1}`}>移除</button></figure>)}</div>
  <input ref={input} type="file" accept={TYPES.join(',')} multiple hidden onChange={e=>{add(e.target.files);e.target.value=''}}/>
  <div className="moment-row"><button disabled={busy} onClick={()=>input.current.click()}>添加图片 / 视频</button><span>{text.length} / 10000</span><button className="moment-primary" disabled={busy||(!text.trim()&&!files.length)} onClick={publish}>{busy?'发布中…':'发布到网站'}</button></div>
  <small>最多 9 张图片（每张 10 MB）或 1 个视频（50 MB）。粘贴不可用时可选择文件。草稿仅保存在当前设备。</small>
  {busy&&<p role="status">{progress}</p>}
 </section>}
 {notice&&<p className="moment-notice" role="status">{notice}</p>}{error&&<p className="moment-error" role="alert">{error} <button onClick={()=>load(undefined,true)}>重新加载列表</button></p>}
 {loading&&!posts.length&&<div className="moment-loading" role="status"><span>正在读取最新动态…</span><div aria-hidden="true" className="moment-placeholder"><i/><i/><i/></div></div>}
 {!loading&&!error&&!posts.length&&<div className="moments-empty"><h2>故事还在路上</h2><p>新的想法和记录，会留在这里。</p></div>}
 <div className="moments-feed">{posts.map(p=><article className="moment-post" key={p.id}><header className="moment-row"><div className="moment-author"><img src={`${import.meta.env.BASE_URL}brand/stone-mark.svg`} width="44" height="44" alt=""/><div><strong>朱鑫垚 <span>stone</span></strong><a href={`/moments?post=${p.id}`}><time dateTime={p.createdAt}>{new Date(p.createdAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',dateStyle:'medium',timeStyle:'short'})}</time></a></div></div><span className="moment-visibility">{p.updatedAt?'已编辑 · 公开':'公开'}</span></header><p className="moment-text">{p.text}</p><div className={`moment-media ${p.media.length===1?'single':''}`}>{p.media.map(m=>m.type.startsWith('video/')?<video key={m.url} src={m.url} controls playsInline preload="metadata"/>:<a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer"><img src={m.url} loading="lazy" alt="动态配图"/></a>)}</div>{session?.owner&&<>{editing===p.id?<EditPost key={p.id} post={p} onSave={savedPost} onCancel={()=>setEditing(null)}/>:<div className="moment-actions"><button disabled={!!editing||!!deleting} onClick={()=>{setEditing(p.id);setSharing(null)}}>编辑</button><button className="moment-danger" disabled={!!editing||!!deleting} onClick={()=>removePost(p)}>{deleting===p.id?'删除中…':'删除'}</button><button onClick={()=>setSharing(sharing===p.id?null:p.id)}>分享这条动态</button></div>}</>}{sharing===p.id&&<Share post={p} onClose={()=>setSharing(null)}/>}</article>)}</div>
 {cursor&&!selected&&<button disabled={loading} onClick={()=>load(cursor)}>查看更多动态</button>}
 {selected&&<a href="/moments" className="moment-back">查看全部动态 →</a>}
 {!session?.owner&&<div className="moment-owner"><button onClick={()=>setLogin(v=>!v)}>站主登录</button>{login&&<form onSubmit={signIn}><label>管理员口令<input type="password" autoComplete="current-password" value={key} onChange={e=>setKey(e.target.value)} required/></label><label className="moment-remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>记住这台设备，保持登录 180 天</label><p className="moment-login-hint">仅在自己的电脑或手机上勾选。退出登录后需重新输入口令。</p><button className="moment-primary" disabled={busy||!session?.configured}>{busy?'登录中…':'登录'}</button>{!session?.configured&&<p>{session?.configurationIssue||'正在检查登录服务…'}</p>}</form>}</div>}
 </main><Footer/></>
}
