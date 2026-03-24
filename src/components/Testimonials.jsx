import React, { useState, useEffect } from 'react'
import './Testimonials.css'

function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const cardColors = ['cyan', 'purple', 'blue']

function Testimonials() {
  const [showAll, setShowAll] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [testimonials, setTestimonials] = useState([])

  // Load testimonials from the server on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(() => {})
  }, [])

  const allTestimonials = [...testimonials].reverse()
  const visible = showAll ? allTestimonials : allTestimonials.slice(0, 3)

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required.'
    if (!message.trim()) errs.message = 'Testimonial is required.'
    else if (message.trim().length < 10) errs.message = 'Testimonial must be at least 10 characters.'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    try {
      const res = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      const newEntry = await res.json()
      setTestimonials(prev => [...prev, newEntry])
      setName('')
      setMessage('')
      setErrors({})
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      alert('Could not submit testimonial. Make sure the server is running.')
    }
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title fade-in"><span>Testimonials</span></h2>

        {/* Cards */}
        <div className="testimonials-cards fade-in">
          {visible.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card glass-card card-${cardColors[i % cardColors.length]}`}
            >
              <div className="quote-mark">&ldquo;</div>
              <p className="testimonial-text">{t.message}</p>
              <div className="testimonial-footer">
                <div className={`testimonial-avatar avatar-${cardColors[i % cardColors.length]}`}>
                  {getInitials(t.name)}
                </div>
                <div className="testimonial-author">
                  <h4>{t.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="testimonials-actions">
          {allTestimonials.length > 3 && (
            <button
              className="btn-testimonial"
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll ? 'Show Less' : 'View All Testimonials'}
            </button>
          )}
          <button
            className="btn-testimonial btn-share"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? 'Close Form' : 'Share Your Experience'}
          </button>
        </div>

        {/* Testimonial form */}
        {showForm && (
          <div className="testimonial-form-wrapper glass-card">
            <h3 className="form-heading">Leave a Testimonial</h3>
            <p className="form-subtitle">Share your experience working with me.</p>

            {success && <p className="form-success">Thank you! Your testimonial has been added.</p>}

            <form className="testimonial-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Write your testimonial..."
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className={errors.message ? 'input-error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-testimonial btn-submit">
                Submit Testimonial
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
