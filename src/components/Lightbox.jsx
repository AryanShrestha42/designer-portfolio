import { useEffect } from 'react'

export default function Lightbox({ images, index, onIndexChange, onClose }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onIndexChange(Math.max(0, index - 1))
      if (e.key === 'ArrowRight') onIndexChange(Math.min(images.length - 1, index + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images, onClose, onIndexChange])

  return (
    <div className="lb-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button className="lb-prev" onClick={() => onIndexChange(Math.max(0, index - 1))} aria-label="Previous">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <img className="lb-img" src={images[index]} alt=""/>
      <button className="lb-next" onClick={() => onIndexChange(Math.min(images.length - 1, index + 1))} aria-label="Next">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
