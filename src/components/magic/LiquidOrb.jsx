import { useEffect, useRef, useState } from 'react'

function buildBlobPath(time, size, points, variance, mx, my) {
  const cx = size / 2, cy = size / 2
  const baseR = size * 0.34
  const coords = []
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    const n = Math.sin(time * 0.0008 + i * 1.7) * variance
            + Math.cos(time * 0.00052 + i * 2.3) * variance * 0.6
    const r = baseR * (1 + n)
    const px = cx + Math.cos(angle) * baseR
    const py = cy + Math.sin(angle) * baseR
    const dx = px - mx
    const dy = py - my
    const dist = Math.hypot(dx, dy)
    const repel = Math.max(0, 1 - dist / 110) * 22
    const dirx = dist === 0 ? 0 : dx / dist
    const diry = dist === 0 ? 0 : dy / dist
    coords.push({
      x: cx + Math.cos(angle) * r + dirx * repel,
      y: cy + Math.sin(angle) * r + diry * repel
    })
  }
  let d = ''
  for (let i = 0; i < points; i++) {
    const cur = coords[i]
    const next = coords[(i + 1) % points]
    const mid = { x: (cur.x + next.x) / 2, y: (cur.y + next.y) / 2 }
    if (i === 0) d += `M ${mid.x.toFixed(2)} ${mid.y.toFixed(2)}`
    const nn = coords[(i + 2) % points]
    const nextMid = { x: (next.x + nn.x) / 2, y: (next.y + nn.y) / 2 }
    d += ` Q ${next.x.toFixed(2)} ${next.y.toFixed(2)} ${nextMid.x.toFixed(2)} ${nextMid.y.toFixed(2)}`
  }
  return d + ' Z'
}

export default function LiquidOrb({ size = 320 }) {
  const wrapRef = useRef(null)
  const [path, setPath] = useState('')
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const onMove = (e) => {
      const rect = wrapRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let raf
    const start = performance.now()
    const loop = (t) => {
      setPath(buildBlobPath(t - start, size, 10, 0.10, mouseRef.current.x, mouseRef.current.y))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [size])

  return (
    <div ref={wrapRef} className="orb-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="orb-fill" cx="38%" cy="36%" r="68%">
            <stop offset="0%" stopColor="#0A9B9B" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#007A7A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#007A7A" stopOpacity="0.0" />
          </radialGradient>
          <filter id="orb-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <path d={path} fill="url(#orb-fill)" filter="url(#orb-blur)" />
        <path d={path} fill="none" stroke="#0A9B9B" strokeOpacity="0.55" strokeWidth="1.2" />
      </svg>
    </div>
  )
}
