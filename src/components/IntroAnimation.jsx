import React, { useEffect, useMemo, useState } from 'react'
import './IntroAnimation.css'

const planetSequence = [
  { name: 'Neptune', theme: 'neptune', caption: 'Crossing frozen blue frontiers' },
  { name: 'Uranus', theme: 'uranus', caption: 'Drifting through silent aurora bands' },
  { name: 'Saturn', theme: 'saturn', caption: 'Orbiting luminous rings of gravity' },
  { name: 'Jupiter', theme: 'jupiter', caption: 'Brushing against colossal storms' },
  { name: 'Mars', theme: 'mars', caption: 'Entering a crimson corridor' },
  { name: 'Earth', theme: 'earth', caption: "Locking onto Abhay's world" },
]

const buildStars = (count, seedOffset = 0) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${seedOffset}-${index}`,
    size: 0.8 + (((index + seedOffset) * 7) % 24) / 10,
    top: `${(index * 37 + seedOffset * 17) % 100}%`,
    left: `${(index * 19 + seedOffset * 13) % 100}%`,
    duration: `${8 + ((index + seedOffset) % 11)}s`,
    delay: `${((index + seedOffset) % 8) * -0.7}s`,
    opacity: (0.3 + (((index + seedOffset) * 11) % 10) / 15).toFixed(2),
    blur: `${(((index + seedOffset) * 5) % 5) * 0.6}px`,
    hue: `${195 + (((index + seedOffset) * 17) % 55)}`,
  }))

function IntroAnimation({ onComplete }) {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [phase, setPhase] = useState('gateway')
  const [isMobile, setIsMobile] = useState(false)

  const backgroundStars = useMemo(() => buildStars(70, 1), [])
  const midStars = useMemo(() => buildStars(38, 8), [])
  const foregroundStars = useMemo(() => buildStars(22, 16), [])
  const trails = useMemo(() => Array.from({ length: 14 }, (_, index) => index), [])
  const particles = useMemo(() => Array.from({ length: 18 }, (_, index) => index), [])
  const galaxies = useMemo(() => Array.from({ length: 5 }, (_, index) => index), [])
  const dustFields = useMemo(() => Array.from({ length: 8 }, (_, index) => index), [])
  const planetDust = useMemo(() => Array.from({ length: 6 }, (_, index) => index), [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateMobileState = (event) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMobileState)
      return () => mediaQuery.removeEventListener('change', updateMobileState)
    }

    mediaQuery.addListener(updateMobileState)
    return () => mediaQuery.removeListener(updateMobileState)
  }, [])

  useEffect(() => {
    const stepDuration = isMobile ? 1150 : 1450
    const totalDuration = isMobile ? 8500 : 11000
    const earthTransitionAt = totalDuration - (isMobile ? 1700 : 2200)
    const burstAt = totalDuration - (isMobile ? 900 : 1150)

    const timers = [
      window.setTimeout(() => setPhase('travel'), 500),
      ...planetSequence.map((_, index) =>
        window.setTimeout(() => setCurrentPlanetIndex(index), 900 + stepDuration * index)
      ),
      window.setTimeout(() => setPhase('earth'), earthTransitionAt),
      window.setTimeout(() => setPhase('burst'), burstAt),
      window.setTimeout(() => {
        setPhase('complete')
        onComplete?.()
      }, totalDuration),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [isMobile, onComplete])

  const currentPlanet = planetSequence[currentPlanetIndex]
  const introTitle = phase === 'earth' || phase === 'burst'
    ? "Welcome to Abhay's Universe"
    : 'Entering the Cosmic Gateway...'

  return (
    <div className={`intro-screen intro-phase-${phase}`}>
      <button
        type="button"
        className="intro-skip-button"
        onClick={() => {
          setPhase('complete')
          onComplete?.()
        }}
      >
        Skip Intro
      </button>

      <div className="intro-space-gradient" />
      <div className="intro-sun-glow" />
      <div className="intro-volumetric-beam" />
      <div className="intro-nebula intro-nebula-a" />
      <div className="intro-nebula intro-nebula-b" />
      <div className="intro-nebula intro-nebula-c" />
      <div className="intro-deep-space-grain" />
      <div className="intro-galaxy-swirl" />
      <div className="intro-distant-galaxies" aria-hidden="true">
        {galaxies.map((galaxy) => (
          <span key={galaxy} className={`intro-distant-galaxy galaxy-${galaxy + 1}`} />
        ))}
      </div>
      <div className="intro-dust-field intro-dust-field-back" aria-hidden="true">
        {dustFields.map((dust) => (
          <span
            key={`back-${dust}`}
            className="intro-dust-particle"
            style={{
              '--dust-top': `${8 + dust * 11}%`,
              '--dust-left': `${5 + ((dust * 13) % 88)}%`,
              '--dust-size': `${20 + (dust % 3) * 16}px`,
              '--dust-delay': `${dust * -1.4}s`,
            }}
          />
        ))}
      </div>
      <div className="intro-vignette" />
      <div className="intro-warp-overlay" />

      <div className="intro-star-layer intro-star-layer-back" aria-hidden="true">
        {backgroundStars.map((star) => (
          <span
            key={star.id}
            className="intro-star"
            style={{
              '--star-size': `${star.size}px`,
              '--star-top': star.top,
              '--star-left': star.left,
              '--star-duration': star.duration,
              '--star-delay': star.delay,
              '--star-opacity': star.opacity,
              '--star-blur': star.blur,
              '--star-hue': star.hue,
            }}
          />
        ))}
      </div>

      <div className="intro-star-layer intro-star-layer-mid" aria-hidden="true">
        {midStars.map((star) => (
          <span
            key={star.id}
            className="intro-star"
            style={{
              '--star-size': `${star.size + 0.5}px`,
              '--star-top': star.top,
              '--star-left': star.left,
              '--star-duration': star.duration,
              '--star-delay': star.delay,
              '--star-opacity': star.opacity,
              '--star-blur': star.blur,
              '--star-hue': star.hue,
            }}
          />
        ))}
      </div>

      <div className="intro-star-layer intro-star-layer-front" aria-hidden="true">
        {foregroundStars.map((star) => (
          <span
            key={star.id}
            className="intro-star"
            style={{
              '--star-size': `${star.size + 1}px`,
              '--star-top': star.top,
              '--star-left': star.left,
              '--star-duration': star.duration,
              '--star-delay': star.delay,
              '--star-opacity': star.opacity,
              '--star-blur': star.blur,
              '--star-hue': star.hue,
            }}
          />
        ))}
      </div>

      <div className="intro-trails" aria-hidden="true">
        {trails.map((trail) => (
          <span
            key={trail}
            className="intro-trail"
            style={{
              '--trail-delay': `${trail * -0.3}s`,
              '--trail-top': `${6 + trail * 6.2}%`,
            }}
          />
        ))}
      </div>

      <div className="intro-copy">
        <p className="intro-kicker">Portfolio launch sequence</p>
        <h1>{introTitle}</h1>
        <p className="intro-subtitle">{currentPlanet.caption}</p>
        <div className="intro-copy-line" />
      </div>

      <div className="intro-planet-stage" aria-hidden="true">
        {planetSequence.map((planet, index) => (
          <div
            key={planet.name}
            className={[
              'intro-planet-card',
              `planet-${planet.theme}`,
              currentPlanetIndex === index ? 'is-active' : '',
              currentPlanetIndex > index ? 'is-past' : '',
            ].join(' ')}
          >
            <div className="intro-planet-glow" />
            <div className="intro-planet-orbit-haze" />
            <div className="intro-planet-core">
              {planet.theme === 'saturn' && <div className="intro-saturn-rings" />}
              {planet.theme === 'earth' && <div className="intro-earth-clouds" />}
              <div className="intro-planet-noise" />
              <div className="intro-planet-terminator" />
              <div className="intro-planet-rim-light" />
              <div className="intro-planet-shimmer" />
              <div className="intro-planet-shadow" />
            </div>
            <div className="intro-planet-label">
              <span className="intro-planet-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{planet.name}</span>
            </div>
            <div className="intro-planet-dust" aria-hidden="true">
              {planetDust.map((dust) => (
                <span
                  key={`${planet.name}-${dust}`}
                  className="intro-planet-dust-particle"
                  style={{
                    '--planet-dust-top': `${18 + dust * 10}%`,
                    '--planet-dust-left': `${12 + dust * 12}%`,
                    '--planet-dust-delay': `${dust * -0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="intro-dust-field intro-dust-field-front" aria-hidden="true">
        {dustFields.map((dust) => (
          <span
            key={`front-${dust}`}
            className="intro-dust-particle"
            style={{
              '--dust-top': `${14 + dust * 9}%`,
              '--dust-left': `${2 + ((dust * 17) % 92)}%`,
              '--dust-size': `${36 + (dust % 4) * 22}px`,
              '--dust-delay': `${dust * -0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="intro-burst" aria-hidden="true">
        <div className="intro-burst-core" />
        <div className="intro-burst-ring intro-burst-ring-a" />
        <div className="intro-burst-ring intro-burst-ring-b" />
        <div className="intro-burst-ring intro-burst-ring-c" />
        <div className="intro-shockwave-mist" />
        <div className="intro-flash" />
        <div className="intro-lightning intro-lightning-a" />
        <div className="intro-lightning intro-lightning-b" />
        <div className="intro-lightning intro-lightning-c" />
        <div className="intro-particles">
          {particles.map((particle) => (
            <span
              key={particle}
              className="intro-particle"
              style={{
                '--particle-angle': `${particle * 20}deg`,
                '--particle-delay': `${particle * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="intro-audio-hook" aria-hidden="true">
        <span>Sound-ready ambience layer</span>
      </div>
    </div>
  )
}

export default IntroAnimation
