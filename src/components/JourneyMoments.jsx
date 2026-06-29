import React from 'react'
import './JourneyMoments.css'

const imageModules = import.meta.glob('../floating_images/f*.jpeg', {
  eager: true,
  import: 'default',
})

const journeyImages = Object.entries(imageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, src]) => src)

function JourneyCard({ src, index, duplicate = false }) {
  return (
    <article className="journey-card" aria-hidden={duplicate ? 'true' : undefined}>
      <div className="journey-image-frame">
        <img src={src} alt={duplicate ? '' : `Journey moment ${index + 1}`} className="journey-image" />
      </div>
    </article>
  )
}

function JourneyMoments() {
  return (
    <section className="journey-moments" id="journey-moments">
      <div className="container">
        <h2 className="section-title fade-in"><span>My Journey Moments</span></h2>

        <div className="journey-carousel fade-in" aria-label="My Journey Moments image carousel">
          <div className="journey-track">
            {journeyImages.map((src, index) => (
              <JourneyCard src={src} index={index} key={`${src}-primary`} />
            ))}
            {journeyImages.map((src, index) => (
              <JourneyCard src={src} index={index} key={`${src}-duplicate`} duplicate />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyMoments
