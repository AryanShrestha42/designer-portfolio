export default function Marquee({ items, speed = 28, reverse = false }) {
  const row = items.map((it, i) => (
    <span key={i} className="marquee-item">
      {it}
      <span className="marquee-dot">✦</span>
    </span>
  ))
  return (
    <div className="marquee">
      <div
        className={`marquee-track ${reverse ? 'rev' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {row}{row}
      </div>
    </div>
  )
}
