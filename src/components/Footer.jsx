import React from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  {
    icon: <FaLinkedinIn />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhay-sonone-146a6b2b6/',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/Abhay18570',
  },
  {
    icon: <FaInstagram />,
    label: 'Instagram',
    href: 'https://www.instagram.com/ab_hay.18/',
  },
]

function Footer() {
  const handleNav = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              Abhay<span className="logo-accent">Portfolio</span>
              <span className="logo-bracket">/&gt;</span>
            </div>
            <p className="footer-tagline">
              Crafting digital experiences from the cosmos.
            </p>
            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer-social"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNav(link.href)
                    }}
                  >
                    <span className="link-arrow">&gt;</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <p>abhaysonone0@gmail.com</p>
            <p>+91 9834244904</p>
            <p>Mumbai, Maharashtra</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Abhay Sonone. Crafted with care.</p>
            <p className="footer-sub">Built with React + Vite</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
