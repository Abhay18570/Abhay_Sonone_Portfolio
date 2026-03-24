import React, { useEffect, useRef } from 'react'
import './StarField.css'

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    // Star layers
    const layers = [
      { count: 150, speed: 0.02, size: 1, opacity: 0.5 },
      { count: 80,  speed: 0.04, size: 1.5, opacity: 0.7 },
      { count: 40,  speed: 0.07, size: 2, opacity: 0.9 },
    ]

    const stars = []

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: layer.size + Math.random() * 0.5,
          speed: layer.speed + Math.random() * 0.01,
          opacity: layer.opacity * (0.6 + Math.random() * 0.4),
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
        })
      }
    })

    // Nebula clouds
    const nebulae = [
      { x: width * 0.2, y: height * 0.3, r: 300, color: 'rgba(168,85,247,0.04)' },
      { x: width * 0.8, y: height * 0.7, r: 250, color: 'rgba(0,245,255,0.03)' },
      { x: width * 0.5, y: height * 0.5, r: 400, color: 'rgba(59,130,246,0.025)' },
    ]

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Draw nebulae
      nebulae.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        grad.addColorStop(0, n.color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw stars
      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed
        const twinkleFactor = 0.5 + 0.5 * Math.sin(star.twinkle)
        const currentOpacity = star.opacity * twinkleFactor

        ctx.save()
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = '#fff'
        ctx.shadowBlur = star.size > 1.5 ? 6 : 3
        ctx.shadowColor = star.size > 1.5 ? 'rgba(0,245,255,0.8)' : 'rgba(255,255,255,0.8)'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        star.y -= star.speed
        if (star.y < -5) {
          star.y = height + 5
          star.x = Math.random() * width
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" />
}

export default StarField
