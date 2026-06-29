import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import JourneyMoments from './components/JourneyMoments'
import Education from './components/Education'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarField from './components/StarField'
import UFOCursor from './components/UFOCursor'

function App() {
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

  return (
    <>
      <UFOCursor />

      <div className="app">
        <StarField />
        <Navbar />
        <main>
          <Hero />
          <About />
          <JourneyMoments />
          <Education />
          <TechStack />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
