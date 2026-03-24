import React, { useEffect, useState } from 'react'
import './Hero.css'
import profileImageSrc from '../images/abhay-pf.png'
import FloatingImages from './FloatingImages'

const typingWords = ['Designer', 'Coder', 'Developer', 'Problem Solver', 'Tech Explorer']

function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const currentWord = typingWords[wordIndex]
    const wordComplete = typedText === currentWord
    const wordDeleted = typedText === ''

    let delay = 120

    if (isDeleting) {
      delay = 65
    } else if (wordComplete) {
      delay = 1400
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && !wordComplete) {
        setTypedText(currentWord.slice(0, typedText.length + 1))
        return
      }

      if (!isDeleting && wordComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && !wordDeleted) {
        setTypedText(currentWord.slice(0, typedText.length - 1))
        return
      }

      setIsDeleting(false)
      setWordIndex((currentIndex) => (currentIndex + 1) % typingWords.length)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isDeleting, typedText, wordIndex])

  return (
    <section className="hero" id="home">
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <FloatingImages />

      <div className="container hero-content">
        <div className="profile-wrapper fade-in">
          <div className="profile-ring ring-outer" />
          <div className="profile-ring ring-middle" />
          <div className="profile-image-container">
            {profileImageSrc ? (
              <img
                src={profileImageSrc}
                alt="Abhay Sonone"
                className="profile-image"
              />
            ) : (
              <div className="profile-fallback" aria-hidden="true">
                <div className="profile-fallback-core" />
                <div className="profile-fallback-glow" />
              </div>
            )}
          </div>
          <div className="profile-status">
            <span className="status-dot" />
            Open to work
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-greeting fade-in">Hello Universe, I am</p>
          <h1 className="hero-name fade-in">
            Abhay<br />
            <span className="name-accent">Sonone</span>
          </h1>
          <p className="hero-subtitle fade-in" aria-live="polite">
            <span className="typing-prefix">I build as a</span>
            <span className="typing-text">{typedText}</span>
            <span className="typing-caret" aria-hidden="true" />
          </p>

          <div className="hero-buttons fade-in">
            <button className="btn btn-primary" onClick={() => handleScroll('techstack')}>
              View Projects
            </button>
            <button className="btn btn-secondary" onClick={() => handleScroll('contact')}>
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
