import React, { useState } from 'react'
import './Contact.css'
import { FaLinkedin, FaGithub, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const contactInfo = [
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Abhay Sonone',
    href: 'https://www.linkedin.com/in/abhay-sonone-146a6b2b6/',
    external: true,
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'Abhay18570',
    href: 'https://github.com/Abhay18570',
    external: true,
  },
  {
    icon: <MdEmail />,
    label: 'Email',
    value: 'abhaysonone0@gmail.com',
    href: 'mailto:abhaysonone0@gmail.com',
    external: false,
  },
  {
    icon: <FaPhoneAlt />,
    label: 'Phone',
    value: '+91 9834244904',
    href: 'tel:9834244904',
    external: false,
  },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch {
      alert('Could not send message. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title fade-in"><span>Contact Me</span></h2>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info fade-in-left">
            <div className="info-header">
              <h3>Let's Build Something <span>Amazing</span> Together</h3>
              <p>
                I'm always open to exciting projects, internship opportunities, and
                collaborations. Reach out and let's create something stellar.
              </p>
            </div>

            <div className="info-items">
              {contactInfo.map((item) => (
                <a
                  className="info-item glass-card"
                  href={item.href}
                  key={item.label}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <p className="info-label">{item.label}</p>
                    <p className="info-value">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper fade-in-right">
            <div className="contact-form glass-card">
              <h3>Send a Message</h3>

              {sent && (
                <div className="form-success">
                  ✅ Message sent! I'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <><span>🚀</span> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
