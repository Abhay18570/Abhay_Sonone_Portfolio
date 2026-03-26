import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import TechStack from './components/TechStack'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarField from './components/StarField'
import IntroAnimation from './components/IntroAnimation'

const INTRO_SESSION_KEY = 'abhay-portfolio-intro-played'

const getShouldPlayIntro = () => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true'
  } catch {
    return true
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(getShouldPlayIntro)
  const [appVisible, setAppVisible] = useState(() => !getShouldPlayIntro())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!showIntro) {
      setAppVisible(true)
      return
    }

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    } catch {
      // If storage is unavailable we simply replay the intro on future mounts.
    }
  }, [showIntro])

  useEffect(() => {
    const clearIntroSession = () => {
      try {
        window.sessionStorage.removeItem(INTRO_SESSION_KEY)
      } catch {
        // Ignore storage cleanup failures.
      }
    }

    window.addEventListener('beforeunload', clearIntroSession)
    return () => window.removeEventListener('beforeunload', clearIntroSession)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('intro-active', showIntro)
    return () => document.body.classList.remove('intro-active')
  }, [showIntro])

  const handleIntroFinish = () => {
    setShowIntro(false)
    window.setTimeout(() => setAppVisible(true), 120)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroFinish} />}

      <div className={`app ${appVisible ? 'app-visible' : 'app-hidden'}`}>
      <StarField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App
