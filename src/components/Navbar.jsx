import { useState, useEffect } from 'react'

const links = [
  { id: 'cases', label: '项目' },
  { id: 'experiments', label: '工具' },
  { id: 'writing', label: '博客' },
  { id: 'about', label: '关于' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-30% 0px -55% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (id) => { if(location.pathname !== '/') location.href = `/#${id}`; else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-progress" style={{ width: `${progress}%` }} />
      <div className="nav-inner">
        <button className="nav-logo" aria-label="stone，返回首页顶部" onClick={() => location.pathname !== '/' ? location.assign('/') : window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={`${import.meta.env.BASE_URL}brand/stone-mark.svg`} width="32" height="32" alt="" /><span className="stone-wordmark">stone</span>
        </button>
        <div className="nav-links">
          {links.map((l) => (
            <button key={l.id} className={active === l.id ? 'nav-active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href="/moments" className={location.pathname === '/moments' ? 'nav-active' : ''}>动态</a>
        </div>
        <a className="nav-github" href="https://github.com/nuts-and-bytes" target="_blank" rel="noopener noreferrer" aria-label="GitHub（新窗口打开）" title="GitHub">
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 4.9 4.9 0 0 0-.1-3.7S17.5 1 15 2.8a12.8 12.8 0 0 0-6 0C6.5 1 5.3 1.4 5.3 1.4a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.5 3.7c0 5.3 3.2 6.5 6.2 6.8a3.3 3.3 0 0 0-.9 2.6V22" />
          </svg>
        </a>
      </div>
    </nav>
  )
}
