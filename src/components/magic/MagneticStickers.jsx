import { useEffect, useRef, useState } from 'react'

const STICKERS = [
  { label: 'research',        shape: 'pill'   },
  { label: 'sketch · iterate', shape: 'rect'  },
  { label: 'ship',            shape: 'circle' },
  { label: 'design tokens',   shape: 'rect'   },
  { label: 'craft',           shape: 'pill'   },
  { label: 'a11y',            shape: 'circle' },
  { label: 'whitespace',      shape: 'pill'   },
  { label: 'system',          shape: 'rect'   },
  { label: 'flow',            shape: 'circle' },
  { label: 'detail',          shape: 'pill'   },
  { label: 'empathy',         shape: 'rect'   },
  { label: 'context',         shape: 'pill'   },
]

const POSITIONS = [
  { top: '8%',  left: '6%'  },
  { top: '18%', left: '36%' },
  { top: '10%', left: '70%' },
  { top: '36%', left: '14%' },
  { top: '44%', left: '46%' },
  { top: '28%', left: '82%' },
  { top: '60%', left: '4%'  },
  { top: '68%', left: '32%' },
  { top: '56%', left: '64%' },
  { top: '76%', left: '82%' },
  { top: '82%', left: '20%' },
  { top: '50%', left: '88%' },
]

const ACCENTS = ['var(--teal)', 'var(--teal-l)']

function Sticker({ label, shape, layout, accent }) {
  const ref = useRef(null)
  const [t, setT] = useState({ x: 0, y: 0, r: 0, s: 1 })

  useEffect(() => {
    // Skip on touch-primary devices (iPhones, Android) — no hover capability
    if (window.matchMedia('(hover: none)').matches) return

    const update = (clientX, clientY) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy
      const dist = Math.hypot(dx, dy)
      const radius = 200
      if (dist < radius) {
        const k = 1 - dist / radius
        setT({ x: dx * 0.35 * k, y: dy * 0.35 * k, r: dx * 0.06 * k, s: 1 + k * 0.22 })
      } else {
        setT({ x: 0, y: 0, r: 0, s: 1 })
      }
    }

    const onMove  = (e) => update(e.clientX, e.clientY)
    const onTouch = (e) => {
      if (e.touches.length) update(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => setT({ x: 0, y: 0, r: 0, s: 1 })

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('touchmove', onTouch, { passive: true })
    document.addEventListener('touchend',  onTouchEnd)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onTouch)
      document.removeEventListener('touchend',  onTouchEnd)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={`sticker sticker-${shape}`}
      style={{
        transform: `translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px) rotate(${t.r.toFixed(2)}deg) scale(${t.s.toFixed(3)})`,
        ...layout,
        '--accent': accent
      }}
    >
      {label}
    </span>
  )
}

export default function MagneticStickers() {
  return (
    <div className="sticker-wall">
      <div className="sticker-wall-grid"></div>
      {STICKERS.map((s, i) => (
        <Sticker
          key={i}
          label={s.label}
          shape={s.shape}
          layout={POSITIONS[i]}
          accent={ACCENTS[i % 2]}
        />
      ))}
    </div>
  )
}
