import React, { useEffect, useRef, useState } from 'react'
import './UFOCursor.css'

const MAX_PARTICLES = 32
const PARTICLE_LIFETIME = 520
const ACTIVATION_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 769px)'

const isInteractiveTarget = (target) => {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    target.closest(
      'a, button, [role="button"], input, textarea, select, summary, label, .btn, .nav-link, .nav-resume-btn'
    )
  )
}

function UFOCursor() {
  const cursorRef = useRef(null)
  const animationFrameRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const particlesRef = useRef([])
  const particleIdRef = useRef(0)
  const interactiveRef = useRef(false)
  const pointerRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0,
    targetY: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
    rotation: 0,
    visible: false,
  })
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia(ACTIVATION_QUERY)
    const updateEnabled = () => setEnabled(mediaQuery.matches)

    updateEnabled()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateEnabled)
      return () => mediaQuery.removeEventListener('change', updateEnabled)
    }

    mediaQuery.addListener(updateEnabled)
    return () => mediaQuery.removeListener(updateEnabled)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('ufo-cursor-active', enabled)

    if (!enabled) {
      setVisible(false)
      setInteractive(false)
      setParticles([])
      particlesRef.current = []
    }

    return () => document.body.classList.remove('ufo-cursor-active')
  }, [enabled])

  useEffect(() => {
    interactiveRef.current = interactive
  }, [interactive])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const soundHookRef = { current: null }

    const spawnParticle = (timestamp) => {
      const pointer = pointerRef.current
      if (pointer.speed < 0.35 || !pointer.visible) {
        return
      }

      const directionX = pointer.speed > 0 ? pointer.velocityX / pointer.speed : 0
      const directionY = pointer.speed > 0 ? pointer.velocityY / pointer.speed : 0
      const baseX = pointer.x - directionX * 18
      const baseY = pointer.y - directionY * 18 + 10
      const isSpark = Math.random() > 0.84

      particlesRef.current.push({
        id: particleIdRef.current += 1,
        x: baseX + (Math.random() - 0.5) * 8,
        y: baseY + (Math.random() - 0.5) * 8,
        vx: -directionX * (0.4 + Math.random() * 0.9) + (Math.random() - 0.5) * 0.45,
        vy: -directionY * (0.4 + Math.random() * 0.7) + 0.45 + Math.random() * 0.4,
        bornAt: timestamp,
        size: isSpark ? 4 + Math.random() * 2 : 7 + Math.random() * 6,
        spark: isSpark,
      })

      if (soundHookRef.current) {
        soundHookRef.current(pointer.speed)
      }

      if (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current.splice(0, particlesRef.current.length - MAX_PARTICLES)
      }
    }

    const animate = (timestamp) => {
      const pointer = pointerRef.current
      const elapsed = lastTimestampRef.current ? timestamp - lastTimestampRef.current : 16
      lastTimestampRef.current = timestamp

      const ease = 1 - Math.pow(0.15, elapsed / 16.67)
      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease

      const deltaX = pointer.targetX - pointer.x
      const deltaY = pointer.targetY - pointer.y
      pointer.velocityX = deltaX
      pointer.velocityY = deltaY
      pointer.speed = Math.hypot(deltaX, deltaY)
      pointer.rotation += (Math.max(-16, Math.min(16, deltaX * 0.32)) - pointer.rotation) * 0.14

      if (pointer.visible && pointer.speed > 0.18 && elapsed < 40) {
        const density = Math.min(2, Math.floor(pointer.speed / 8) + 1)
        for (let index = 0; index < density; index += 1) {
          spawnParticle(timestamp)
        }
      }

      particlesRef.current = particlesRef.current
        .map((particle) => {
          const age = timestamp - particle.bornAt
          const life = Math.max(0, 1 - age / PARTICLE_LIFETIME)

          return {
            ...particle,
            x: particle.x + particle.vx * (elapsed / 16.67),
            y: particle.y + particle.vy * (elapsed / 16.67),
            scale: 0.55 + life * 0.7,
            opacity: life,
            life,
          }
        })
        .filter((particle) => particle.life > 0)

      if (cursorRef.current) {
        const scale = interactiveRef.current ? 1.12 : 1
        cursorRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) rotate(${pointer.rotation}deg) scale(${scale})`
        cursorRef.current.style.opacity = pointer.visible ? '1' : '0'
      }

      setParticles(
        particlesRef.current.map((particle) => ({
          id: particle.id,
          x: particle.x,
          y: particle.y,
          scale: particle.scale,
          opacity: particle.opacity,
          size: particle.size,
          spark: particle.spark,
        }))
      )

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event) => {
      pointerRef.current.targetX = event.clientX
      pointerRef.current.targetY = event.clientY
      pointerRef.current.visible = true
      setVisible(true)
      setInteractive(isInteractiveTarget(event.target))
    }

    const handlePointerDown = (event) => {
      setInteractive(isInteractiveTarget(event.target))
    }

    const handlePointerLeave = (event) => {
      if (event.relatedTarget) {
        return
      }

      pointerRef.current.visible = false
      setVisible(false)
      setInteractive(false)
    }

    const handleWindowBlur = () => {
      pointerRef.current.visible = false
      setVisible(false)
      setInteractive(false)
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('mousedown', handlePointerDown, { passive: true })
    window.addEventListener('mouseout', handlePointerLeave)
    window.addEventListener('blur', handleWindowBlur)

    animationFrameRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseout', handlePointerLeave)
      window.removeEventListener('blur', handleWindowBlur)
      lastTimestampRef.current = 0
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div className={`ufo-cursor-layer ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`ufo-flame-particle ${particle.spark ? 'is-spark' : ''}`}
          style={{
            transform: `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%) scale(${particle.scale})`,
            opacity: particle.opacity,
            width: `${particle.size}px`,
            height: `${particle.spark ? particle.size : particle.size * 1.45}px`,
          }}
        />
      ))}

      <div ref={cursorRef} className={`ufo-cursor ${interactive ? 'is-interactive' : ''}`}>
        <div className="ufo-ambient-glow" />
        <div className="ufo-screen-glow" />
        <div className="ufo-craft">
          <span className="ufo-dome" />
          <span className="ufo-rim" />
          <span className="ufo-core-light" />
          <span className="ufo-thruster" />
        </div>
      </div>
    </div>
  )
}

export default UFOCursor
