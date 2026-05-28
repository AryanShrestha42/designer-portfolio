/**
 * OrbitField — concentric rings with orbital nodes.
 * Pure CSS animation, GPU-friendly, zero JS per frame.
 */
export default function OrbitField({ size = 460 }) {
  const c = size / 2
  const rings = [
    { r: 0.20, dur: '26s', dir: 'normal',  stroke: 0.55, dash: '',        nodes: [{ a: 0,   sz: 7 }] },
    { r: 0.30, dur: '38s', dir: 'reverse', stroke: 0.45, dash: '3 7',     nodes: [{ a: 0,   sz: 6 }, { a: 180, sz: 4 }] },
    { r: 0.40, dur: '58s', dir: 'normal',  stroke: 0.35, dash: '',        nodes: [{ a: 30,  sz: 8 }, { a: 150, sz: 5 }, { a: 270, sz: 4 }] },
    { r: 0.485,dur: '88s', dir: 'reverse', stroke: 0.28, dash: '1 9',     nodes: [{ a: 60,  sz: 5 }, { a: 240, sz: 3 }] },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="orbit-field"
      style={{ '--c': `${c}px` }}
    >
      <defs>
        <radialGradient id="of-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#0A9B9B" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#0A9B9B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#007A7A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="of-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#0A9B9B" stopOpacity="1" />
          <stop offset="60%" stopColor="#0A9B9B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0A9B9B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft core glow */}
      <circle cx={c} cy={c} r={size * 0.22} fill="url(#of-core)" className="of-core" />

      {/* rings */}
      {rings.map((ring, i) => (
        <g
          key={i}
          className="of-ring"
          style={{ '--dur': ring.dur, animationDirection: ring.dir }}
        >
          <circle
            cx={c} cy={c} r={size * ring.r}
            fill="none"
            stroke="#0A9B9B"
            strokeOpacity={ring.stroke}
            strokeWidth="1.1"
            strokeDasharray={ring.dash}
          />
          {ring.nodes.map((n, j) => {
            const rad = (n.a * Math.PI) / 180
            const x = c + Math.cos(rad) * size * ring.r
            const y = c + Math.sin(rad) * size * ring.r
            return (
              <g key={j}>
                <circle cx={x} cy={y} r={n.sz * 2.2} fill="url(#of-node)" />
                <circle cx={x} cy={y} r={n.sz * 0.55} fill="#0A9B9B" />
              </g>
            )
          })}
        </g>
      ))}

      {/* center mark */}
      <circle cx={c} cy={c} r="5" fill="#0A9B9B" />
      <circle cx={c} cy={c} r="11" fill="none" stroke="#0A9B9B" strokeOpacity="0.45" strokeWidth="1" />
      {/* cross-hair ticks */}
      <line x1={c - 18} y1={c} x2={c - 10} y2={c} stroke="#0A9B9B" strokeOpacity="0.55" strokeWidth="1" />
      <line x1={c + 10} y1={c} x2={c + 18} y2={c} stroke="#0A9B9B" strokeOpacity="0.55" strokeWidth="1" />
      <line x1={c} y1={c - 18} x2={c} y2={c - 10} stroke="#0A9B9B" strokeOpacity="0.55" strokeWidth="1" />
      <line x1={c} y1={c + 10} x2={c} y2={c + 18} stroke="#0A9B9B" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  )
}
