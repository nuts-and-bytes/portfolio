export function internalRoute(event, origin) {
 const link=event.target.closest?.('a[href]')
 if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return null
 const url=new URL(link.href,origin)
 return url.origin===origin&&['/','/moments'].includes(url.pathname)?url:null
}
export function navigate(to){
 const url=new URL(to,location.origin)
 if(url.href===location.href){
  if(url.hash)document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView()
  else window.scrollTo(0,0)
  return
 }
 history.pushState(null,'',url);window.dispatchEvent(new PopStateEvent('popstate'))
}
