import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const mainLinks = [
  { id: 'hero', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'experience', label: '经历' },
  { id: 'contact', label: '联系' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    mainLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">Eric Lu</Link>
          <ul className="navbar-links">
            {mainLinks.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={activeSection === link.id ? 'active' : ''}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="打开菜单">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav">
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="关闭菜单">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {mainLinks.map(link => (
            <button key={link.id} onClick={() => { scrollToSection(link.id); setMobileOpen(false) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', fontSize: '1.5rem', padding: '8px 0', display: 'block', width: '100%', textAlign: 'center' }}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
