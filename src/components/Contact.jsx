export default function Contact() {
  return (
    <section id="contact">
      <div className="c-inner">
        <p className="s-label rv">Get in touch</p>
        <h2 className="s-title rv">Let's work<br/>together.</h2>
        <p className="c-sub rv">Open to full-time roles and freelance projects. If you're building something meaningful and need a designer who thinks beyond screens, let's talk.</p>
        <div className="c-links rv">
          <a href="mailto:aryanshrrr123@gmail.com" className="btn btn-p">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 2.5l6 5 6-5M1 2.5h12v10H1v-10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            aryanshrrr123@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/aryan-shrestha-401626125/" target="_blank" rel="noopener noreferrer" className="btn btn-s">
            LinkedIn{' '}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
