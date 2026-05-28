import { useRef } from 'react'

function ScrollFrame({ src, alt, style, onImageClick }) {
  const frameRef = useRef(null)
  const imgRef = useRef(null)

  function handleMouseEnter() {
    const frame = frameRef.current
    const img = imgRef.current
    if (!frame || !img) return
    const renderedH = img.offsetHeight || (img.naturalHeight / img.naturalWidth) * frame.offsetWidth
    const maxScroll = Math.max(0, Math.round(renderedH - frame.clientHeight))
    if (maxScroll <= 0) return
    const dur = Math.max(2, maxScroll / 200)
    img.style.transition = `transform ${dur}s linear`
    img.style.transform = `translateY(-${maxScroll}px)`
  }

  function handleMouseLeave() {
    const img = imgRef.current
    if (!img) return
    img.style.transition = 'transform 0.4s ease'
    img.style.transform = 'translateY(0)'
  }

  return (
    <div
      ref={frameRef}
      className="scroll-frame"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        className="scroll-img"
        src={src}
        alt={alt}
        onClick={() => onImageClick && onImageClick(src)}
      />
    </div>
  )
}

export default function Work({ onOpenLightbox }) {
  const meshdeskImgs = ['meshdesk-1.png', 'meshdesk-2.png', 'meshdesk-3.png', 'meshdesk-4.png']
  const lumleImgs    = ['lumle-1.png', 'lumle-2.png', 'lumle-3.png']
  const paradiseImgs = ['paradise-1.png', 'paradise-2.png', 'paradise-3.png', 'paradise-4.png']

  function open(images, src) {
    const idx = images.indexOf(src)
    onOpenLightbox(images, idx >= 0 ? idx : 0)
  }

  return (
    <section id="work">
      <div className="s-inner">
        <p className="s-label rv">Selected Work</p>
        <h2 className="s-title rv">Projects I've owned.</h2>
        <div className="p-grid">

          {/* 01 — MeshDesk */}
          <div className="p-card big rv">
            <div className="p-num">01</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
              <ScrollFrame
                src="meshdesk-1.png" alt="MeshDesk dashboard"
                style={{position:'relative',borderRadius:'10px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                onImageClick={src => open(meshdeskImgs, src)}
              />
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
                <ScrollFrame src="meshdesk-2.png" alt="MeshDesk WhatsApp"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(meshdeskImgs, src)}
                />
                <ScrollFrame src="meshdesk-3.png" alt="MeshDesk Analytics"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(meshdeskImgs, src)}
                />
                <ScrollFrame src="meshdesk-4.png" alt="MeshDesk Customer"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(meshdeskImgs, src)}
                />
              </div>
            </div>
            <p className="p-eye">SaaS Platform</p>
            <h3 className="p-title">MeshDesk Ecosystem</h3>
            <p className="p-desc">Three interconnected products in one platform: a smart booking and scheduling system, an AI-powered receptionist, and a project management planner, all sharing a unified data layer. Owned end-to-end product design across all three and acted as Product Owner alongside the design role.</p>
            <div className="p-tags">
              <span className="tag">Product Design</span><span className="tag">Design System</span>
              <span className="tag">UX Research</span><span className="tag">Product Ownership</span>
              <span className="tag">SaaS</span><span className="tag">Figma</span>
            </div>
          </div>

          {/* 02 — Lumle */}
          <div className="p-card big rv d1">
            <div className="p-num">02</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 0.28fr 0.28fr',gap:'10px',marginBottom:'28px',alignItems:'stretch'}}>
              <ScrollFrame src="lumle-1.png" alt="Lumle website"
                style={{position:'relative',borderRadius:'10px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                onImageClick={src => open(lumleImgs, src)}
              />
              <ScrollFrame src="lumle-2.png" alt="Lumle mobile"
                style={{position:'relative',borderRadius:'14px',overflow:'hidden',border:'1px solid var(--border)',background:'var(--bg3)'}}
                onImageClick={src => open(lumleImgs, src)}
              />
              <ScrollFrame src="lumle-3.png" alt="Lumle food detail"
                style={{position:'relative',borderRadius:'14px',overflow:'hidden',border:'1px solid var(--border)',background:'var(--bg3)'}}
                onImageClick={src => open(lumleImgs, src)}
              />
            </div>
            <p className="p-eye">Web & Mobile App</p>
            <h3 className="p-title">Finland-Based Nepali-Indian Restaurant</h3>
            <p className="p-desc">A Nepali-Indian restaurant in Finland with table reservations, digital menu, loyalty programme, and gift card purchasing. Designed the full experience across both web and mobile with shared components.</p>
            <div className="p-tags">
              <span className="tag">Mobile App</span><span className="tag">Web Design</span>
              <span className="tag">Loyalty UX</span><span className="tag">Figma</span>
            </div>
          </div>

          {/* 03 — Paradise */}
          <div className="p-card big rv d2">
            <div className="p-num">03</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
              <ScrollFrame src="paradise-1.png" alt="Paradise homepage"
                style={{position:'relative',borderRadius:'10px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                onImageClick={src => open(paradiseImgs, src)}
              />
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
                <ScrollFrame src="paradise-2.png" alt="Paradise course"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(paradiseImgs, src)}
                />
                <ScrollFrame src="paradise-3.png" alt="Paradise booking"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(paradiseImgs, src)}
                />
                <ScrollFrame src="paradise-4.png" alt="Paradise extra"
                  style={{position:'relative',borderRadius:'8px',overflow:'hidden',border:'1px solid var(--border)',aspectRatio:'16/9',background:'var(--bg3)'}}
                  onImageClick={src => open(paradiseImgs, src)}
                />
              </div>
            </div>
            <p className="p-eye">Website</p>
            <h3 className="p-title">Educational Institution Website</h3>
            <p className="p-desc">Two core MVPs: purchasable courses with a full browsing and checkout flow, and bookable reading rooms users can reserve directly through the site. Also included a blog and articles section.</p>
            <div className="p-tags">
              <span className="tag">Web Design</span><span className="tag">E-commerce UX</span>
              <span className="tag">Booking Flow</span><span className="tag">Figma</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
