import React, { useState, useEffect } from 'react'
import './Navbar.css'
import resumePdf from '../Resume/Abhay_Sonone_Resume.pdf'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const resumeHref = resumePdf
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.replace('#', ''))
      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(sections[index])
        if (section && window.scrollY >= section.offsetTop - 120) {
          setActive(sections[index])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a
          className="nav-logo"
          href="#"
          onClick={(event) => {
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="logo-bracket">&lt;</span>
          Abhay
          <span className="logo-accent">Portfolio</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                className={`nav-link ${active === link.href.replace('#', '') ? 'active' : ''}`}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(link.href)
                }}
              >
                {link.label}
                <span className="nav-link-glow" />
              </a>
            </li>
          ))}
          <li className="nav-resume-item">
            <a
              className="nav-resume-btn"
              href={resumeHref}
              download="Abhay_Sonone_Resume.pdf"
              onClick={(event) => {
                if (!resumeHref) event.preventDefault()
                setMenuOpen(false)
              }}
            >
              Download Resume
            </a>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
