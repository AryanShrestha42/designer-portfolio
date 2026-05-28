import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function DesignCube({ size = 240 }) {
  const stageRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useSpring(useTransform(my, [-1, 1], [12, -12]), { damping: 22, stiffness: 140 })
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { damping: 22, stiffness: 140 })

  useEffect(() => {
    const onMove = (e) => {
      const rect = stageRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const radius = 420
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / radius)))
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / radius)))
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const half = size / 2

  return (
    <div ref={stageRef} className="cube-stage" style={{ width: size, height: size }}>
      <motion.div className="cube-tilt" style={{ rotateX: tiltX, rotateY: tiltY }}>
        <div className="cube" style={{ '--cube-half': `${half}px` }}>
          <div className="cube-face cube-front">
            <span className="cube-label">color</span>
            <div className="cube-swatches">
              <div style={{ background:'#007A7A' }} />
              <div style={{ background:'#0A9B9B' }} />
              <div style={{ background:'#3A6060' }} />
              <div style={{ background:'#8AADAD' }} />
              <div style={{ background:'#E4EDED' }} />
            </div>
          </div>
          <div className="cube-face cube-back">
            <span className="cube-label">type</span>
            <div className="cube-aa">Aa</div>
          </div>
          <div className="cube-face cube-right">
            <span className="cube-label">grid</span>
            <div className="cube-grid-pattern" />
          </div>
          <div className="cube-face cube-left">
            <span className="cube-label">space</span>
            <div className="cube-space">
              <div /><div /><div /><div />
            </div>
          </div>
          <div className="cube-face cube-top">
            <span className="cube-label">tokens</span>
            <div className="cube-tokens">
              <code>--teal</code>
              <code>--text</code>
              <code>--bg</code>
            </div>
          </div>
          <div className="cube-face cube-bottom">
            <span className="cube-label">ship</span>
            <div className="cube-ship">✦</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
