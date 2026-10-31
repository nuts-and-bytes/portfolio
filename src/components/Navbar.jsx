import { useState, useEffect, useRef } from 'react'
import {navigate,normalizePath} from '../lib/navigation'
import {api} from '../lib/moments'
import {loadFeed} from '../lib/moments-feed'

function NavIcon({id}) {
 const paths={cases:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',experiments:'M14 6l4 4 M4 20l6-6 M14 3a6 6 0 0 0-7 7L3 17a3 3 0 0 0 4 4l7-7a6 6 0 0 0 7-7l-4 4-4-4 4-4z',writing:'M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1z M12 5v15',about:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21v-2a8 8 0 0 1 16 0v2',moments:'M21 11a9 9 0 0 1-9 9H7l-5 2 2-5v-5a9 9 0 0 1 17-1z M8 9h8 M8 13h5'}
 return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id]}/></svg>
}

const links = [
  { id: 'cases', label: '项目' },
  { id: 'experiments', label: '工具' },
  { id: 'writing', label: '博客' },
  { id: 'about', label: '关于' },
]

export default function Navbar({route}) {
  const navRef = useRef(null)
  const [darkBackdrop, setDarkBackdrop] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('cases')
  const [keyboard,setKeyboard]=useState(false)
  const pathName=()=>normalizePath(location.pathname)
  const selected=pathName()==='/moments'?'moments':active
  const selectedIndex=[...links.map(l=>l.id),'moments'].indexOf(selected)
  const behavior=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches||keyboard?'instant':'smooth'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const nav = navRef.current?.getBoundingClientRect()
      if (nav) setDarkBackdrop(Array.from(document.querySelectorAll('.section-dark, .footer')).some(el => {
        const rect = el.getBoundingClientRect()
        return rect.height > 0 && rect.top < nav.bottom && rect.bottom > nav.top
      }))
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const frame = requestAnimationFrame(onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [route])

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
  }, [route])

  const go = (id) => { setActive(id); if(pathName() !== '/') navigate(`/#${id}`); else document.getElementById(id)?.scrollIntoView({ behavior: behavior() }) }
  const openMoments = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate('/moments')
  }

  return (
    <nav ref={navRef} className={`nav ${darkBackdrop ? 'nav-dark-backdrop' : ''} ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-progress" style={{ width: `${progress}%` }} />
      <div className="nav-inner">
        <button className="nav-logo" aria-label="stone，返回首页顶部" onClick={() => pathName() !== '/' ? navigate('/') : window.scrollTo({ top: 0, behavior: behavior() })}>
          <img src={`${import.meta.env.BASE_URL}brand/stone-mark.svg`} width="32" height="32" alt="" /><span className="stone-wordmark">stone</span>
        </button>
        <div className={`nav-links stone-nav-tabs${keyboard?' keyboard-nav':''}`} onPointerDown={()=>setKeyboard(false)} onKeyDown={()=>setKeyboard(true)}><span className="nav-selection" aria-hidden="true" style={{transform:`translateX(${Math.max(0,selectedIndex)*100}%)`}}/>
          {links.map((l) => (
            <button key={l.id} aria-current={selected===l.id?'location':undefined} className={selected===l.id?'nav-active':''} onClick={() => go(l.id)}>
              <NavIcon id={l.id}/><span>{l.label}</span>
            </button>
          ))}
          <a href="/moments" onClick={openMoments} onPointerEnter={()=>loadFeed(()=>api('moments')).catch(()=>{})} onFocus={()=>loadFeed(()=>api('moments')).catch(()=>{})} onTouchStart={()=>loadFeed(()=>api('moments')).catch(()=>{})} aria-current={selected==='moments'?'page':undefined} className={selected==='moments'?'nav-active':''}><NavIcon id="moments"/><span>动态</span></a>
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
