import { useState, useEffect } from 'react'

function SunIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="2" fill="white"/>
      <path d="M5 1v1M5 8v1M1 5h1M8 5h1M2.2 2.2l.7.7M7.1 7.1l.7.7M2.2 7.8l.7-.7M7.1 2.9l.7-.7" stroke="white" strokeWidth=".8" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none">
      <path d="M9 5A4 4 0 015 1a4 4 0 100 8 4 4 0 004-4z" fill="white"/>
    </svg>
  )
}

export default function Nav({ theme, onToggle }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      let cur = ''
      document.querySelectorAll('section[id]').forEach(s => {
        if (sy >= s.offsetTop - 100) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav>
      <div className="nav-inner">
        <a href="#hero" className="logo">Aryan<span>.</span></a>
        <div className="nav-r">
          <ul className="nav-links">
            <li><a href="#about" className={active === 'about' ? 'on' : ''}>About</a></li>
            <li><a href="#work" className={active === 'work' ? 'on' : ''}>Work</a></li>
            <li><a href="#skills" className={active === 'skills' ? 'on' : ''}>Skills</a></li>
            <li><a href="#contact" className={active === 'contact' ? 'on' : ''}>Contact</a></li>
          </ul>
          <button className="tog" onClick={onToggle} aria-label="Toggle theme">
            <div className="tog-dot">
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
