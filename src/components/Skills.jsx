export default function Skills() {
  return (
    <section id="skills">
      <div className="s-inner">
        <p className="s-label rv">What I bring</p>
        <h2 className="s-title rv">Skills &amp; Tools</h2>
        <div className="sk-grid">

          <div className="sk-block rv">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="3" width="26" height="26" rx="3" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M3 11h26M11 11v18" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <div className="sk-name">Product Design</div>
            <div className="sk-items">
              <span className="sk-item">Figma</span><span className="sk-item">UX Research</span>
              <span className="sk-item">User Flows</span><span className="sk-item">Wireframing</span>
              <span className="sk-item">Prototyping</span><span className="sk-item">Usability Testing</span>
            </div>
          </div>

          <div className="sk-block rv d1">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.5"/>
            </svg>
            <div className="sk-name">Design Systems</div>
            <div className="sk-items">
              <span className="sk-item">Component Libraries</span><span className="sk-item">Design Tokens</span>
              <span className="sk-item">Developer Handoff</span><span className="sk-item">Figma Variables</span>
              <span className="sk-item">Auto Layout</span>
            </div>
          </div>

          <div className="sk-block rv d2">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <path d="M16 3l13 7.5v13L16 31 3 23.5v-13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M16 3v28M3 10.5l13 7.5 13-7.5" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <div className="sk-name">Collaboration</div>
            <div className="sk-items">
              <span className="sk-item">Stakeholder Comms</span><span className="sk-item">Sprint Planning</span>
              <span className="sk-item">Jira</span><span className="sk-item">Product Ownership</span>
              <span className="sk-item">Cross-functional</span>
            </div>
          </div>

          <div className="sk-block rv">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <path d="M5 27l7-11 5 7 5-5 5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="25" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <div className="sk-name">Visual Design</div>
            <div className="sk-items">
              <span className="sk-item">UI Design</span><span className="sk-item">Typography</span>
              <span className="sk-item">Brand Identity</span><span className="sk-item">Graphic Design</span>
              <span className="sk-item">Social Assets</span>
            </div>
          </div>

          <div className="sk-block rv d1">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <path d="M16 5v4M16 23v4M5 16h4M23 16h4M8.3 8.3l2.8 2.8M20.9 20.9l2.8 2.8M8.3 23.7l2.8-2.8M20.9 11.1l2.8-2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <div className="sk-name">Growth &amp; Strategy</div>
            <div className="sk-items">
              <span className="sk-item">Lead Generation</span><span className="sk-item">LinkedIn Content</span>
              <span className="sk-item">Outreach</span><span className="sk-item">Product Thinking</span>
            </div>
          </div>

          <div className="sk-block rv d2">
            <svg className="sk-icon" viewBox="0 0 32 32" fill="none">
              <path d="M7 26V14l9-7 9 7v12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <rect x="12" y="18" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M16 18v8" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            <div className="sk-name">Currently Learning</div>
            <div className="sk-items">
              <span className="sk-item">Framer</span><span className="sk-item">Motion Design</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
