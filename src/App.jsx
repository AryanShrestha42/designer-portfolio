import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import Playground from './components/Playground'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [lb, setLb] = useState({ open: false, images: [], index: 0 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const ro = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            ro.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  function openLightbox(images, index) {
    setLb({ open: true, images, index })
  }

  return (
    <>
      <Nav theme={theme} onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <Hero />
      <About />
      <Work onOpenLightbox={openLightbox} />
      <Playground />
      <Skills />
      <Contact />
      <Footer />
      {lb.open && (
        <Lightbox
          images={lb.images}
          index={lb.index}
          onIndexChange={i => setLb(prev => ({ ...prev, index: i }))}
          onClose={() => setLb(prev => ({ ...prev, open: false }))}
        />
      )}
    </>
  )
}
