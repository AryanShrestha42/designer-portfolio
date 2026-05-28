import MagneticStickers from './magic/MagneticStickers'
import Marquee from './magic/Marquee'

export default function Playground() {
  return (
    <section id="playground">
      <div className="s-inner">
        <div className="pg-head">
          <div>
            <p className="s-label rv">Designer · playground</p>
            <h2 className="s-title rv">Words I design by.</h2>
          </div>
          <p className="pg-blurb rv d1">
            A working vocabulary. Drag your cursor across &mdash; the words
            should respond, because <em>nothing here is decoration.</em>
          </p>
        </div>
        <div className="rv d2">
          <MagneticStickers />
        </div>
      </div>
      <div className="pg-marquee rv">
        <Marquee
          items={['ship the thinking', 'sweat the detail', 'pixels with intent', 'systems > screens', 'iterate · iterate · iterate']}
          speed={42}
          reverse
        />
      </div>
    </section>
  )
}
