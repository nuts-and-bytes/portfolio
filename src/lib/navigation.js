const listeners = new Set()

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function normalizePath(pathname) {
  const stripped = String(pathname || '/').replace(/\/+$/, '')
  return stripped === '' ? '/' : stripped
}

export function currentRoute() {
  return normalizePath(location.pathname) + location.search + location.hash
}

export function internalRoute(event, origin) {
  const link = event.target.closest?.('a[href]')
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return null
  const url = new URL(link.href, origin)
  url.pathname = normalizePath(url.pathname)
  return url.origin === origin && (url.pathname === '/' || url.pathname === '/moments') ? url : null
}

function destination(to) {
  const raw = typeof to === 'string' ? to : `${to.pathname}${to.search}${to.hash}`
  const url = new URL(raw, location.origin)
  url.pathname = normalizePath(url.pathname)
  return url
}

export function navigate(to) {
  const url = destination(to)
  const next = url.pathname + url.search + url.hash
  if (url.href === location.href || next === currentRoute()) {
    if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView()
    else window.scrollTo(0, 0)
    return
  }
  history.pushState(null, '', next)
  for (const listener of listeners) listener(next)
}
