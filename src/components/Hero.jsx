import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import DesignCube from './magic/DesignCube'
import OrbitField from './magic/OrbitField'
import Marquee from './magic/Marquee'

export default function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()

  // Map document scrollY into 0..1 progress through the hero section.
  // Sampling section position from the DOM each frame keeps us layout-correct.
  const sp = useTransform(scrollY, (v) => {
    const el = ref.current
    if (!el) return 0
    const range = el.offsetHeight - window.innerHeight
    if (range <= 0) return 0
    return Math.max(0, Math.min(1, (v - el.offsetTop) / range))
  })

  // Phase A — title block
  const titleY       = useTransform(sp, [0, 0.42], [0, -160])
  const titleScale   = useTransform(sp, [0, 0.42], [1, 0.75])
  const titleOpacity = useTransform(sp, [0, 0.26, 0.42], [1, 1, 0])
  const subOpacity   = useTransform(sp, [0, 0.18], [1, 0])

  // Phase A→B — cube begins fading at 0.22, fully GONE by 0.46
  // (no overlap with process headline — clean scene cut)
  const cubeX       = useTransform(sp, [0, 0.44], ['0%', '-22%'])
  const cubeY       = useTransform(sp, [0, 0.40], [0, 56])
  const cubeScale   = useTransform(sp, [0, 0.40], [1, 1.30])
  const cubeOpacity = useTransform(sp, [0.20, 0.46], [1, 0])

  // Phase B — orbital field blooms in as cube exits
  const orbScale   = useTransform(sp, [0.28, 0.56], [0.55, 1])
  const orbOpacity = useTransform(sp, [0.28, 0.50, 0.85, 1], [0, 1, 1, 0])

  // Phase B — process headline starts at 0.46 (cube is fully gone)
  const procOpacity = useTransform(sp, [0.46, 0.62], [0, 1])
  const procY       = useTransform(sp, [0.46, 0.62], [44, 0])
  const procExit    = useTransform(sp, [0.84, 1], [0, -60])
  const procExitOp  = useTransform(sp, [0.84, 1], [1, 0])

  // Phase C — marquee reveal
  const marqOpacity = useTransform(sp, [0.76, 0.90], [0, 1])
  const marqY       = useTransform(sp, [0.76, 0.90], [40, 0])

  // Subtle mouse parallax on background orbs (single rAF loop, scoped to hero)
  useEffect(() => {
    const orbs = document.querySelectorAll('.hero-sticky .h-orb')
    if (!orbs.length) return
    let tx = 0, ty = 0, cx = 0, cy = 0, raf, moving = false, idleSince = performance.now()
    const onMove = (e) => {
      tx = (e.clientX - window.innerWidth / 2) / window.innerWidth
      ty = (e.clientY - window.innerHeight / 2) / window.innerHeight
      moving = true
      idleSince = performance.now()
    }
    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      orbs.forEach((o, i) => {
        const s = (i + 1) * 14
        o.style.transform = `translate3d(${cx * s}px,${cy * s}px,0)`
      })
      if (moving || Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick)
      } else if (performance.now() - idleSince > 1000) {
        raf = null
      } else {
        raf = requestAnimationFrame(tick)
      }
    }
    const wake = () => { if (!raf) { moving = true; raf = requestAnimationFrame(tick) } }
    document.addEventListener('mousemove', e => { onMove(e); wake() }, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero" ref={ref} className="hero-magic">
      <div className="hero-sticky">
        <div className="h-grid"></div>
        <div className="h-orb h-orb1"></div>
        <div className="h-orb h-orb2"></div>

        {/* Phase A — Title */}
        <motion.div
          className="hero-title-wrap"
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
        >
          <h1 className="h-name">
            Product<br/><span className="ac">Designer.</span>
          </h1>
          <motion.div style={{ opacity: subOpacity }}>
            <p className="h-sub">
              I design digital products that make complex things feel simple.
              Based in Lalitpur, Nepal. Working with teams across the world.
            </p>
            <div className="h-btns">
              <a href="#about" className="btn btn-p">
                Scroll for magic
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M4 9l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contact" className="btn btn-s">Get in touch</a>
            </div>
          </motion.div>
        </motion.div>

        {/* DesignCube — floats early, dissolves mid-scroll */}
        <motion.div
          className="hero-cube-wrap"
          style={{ x: cubeX, y: cubeY, scale: cubeScale, opacity: cubeOpacity }}
        >
          <DesignCube size={260} />
        </motion.div>

        {/* OrbitField — appears mid-scroll behind process headline */}
        <div className="hero-orb-anchor">
          <motion.div
            className="hero-orb-wrap"
            style={{ scale: orbScale, opacity: orbOpacity }}
          >
            <OrbitField size={460} />
          </motion.div>
        </div>

        {/* Process headline */}
        <div className="hero-process-anchor">
          <motion.div
            className="hero-process"
            style={{ opacity: procOpacity, y: procY }}
          >
            <motion.div style={{ y: procExit, opacity: procExitOp }}>
              <p className="hero-process-eye">·  process</p>
              <h2 className="hero-process-title">
                Research. Sketch.<br/>
                <span className="ac">Iterate.</span> Ship.
              </h2>
              <p className="hero-process-sub">
                Design isn't decoration — it's the <em>thinking</em> rendered visible.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee at the bottom — last reveal */}
        <motion.div className="hero-marquee" style={{ opacity: marqOpacity, y: marqY }}>
          <Marquee
            items={[
              'Product Design',
              'Design Systems',
              'UX Research',
              'Prototyping',
              'Visual Design',
              'Product Ownership',
            ]}
            speed={34}
          />
        </motion.div>

        {/* Scroll cue, fades on first scroll */}
        <motion.div className="hero-cue" style={{ opacity: subOpacity }}>
          <div className="hero-cue-line"></div>
          <span>scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
