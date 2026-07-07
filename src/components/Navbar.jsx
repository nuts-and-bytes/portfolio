import { useState, useEffect } from 'react'

const links = [
  { id: 'cases', label: '案例' },
  { id: 'experiments', label: '实验' },
  { id: 'writing', label: '写作' },
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

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-progress" style={{ width: `${progress}%` }} />
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          朱鑫垚 <span className="nav-logo-en">Xinyao Zhu</span>
        </button>
        <div className="nav-links">
          {links.map((l) => (
            <button key={l.id} className={active === l.id ? 'nav-active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
