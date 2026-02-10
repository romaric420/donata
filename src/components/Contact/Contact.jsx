import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './Contact.css'

const Contact = () => {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)

    const formData = new FormData(event.target)
    const email = formData.get('email')

    // Validation Email
    if (!emailRegex.test(email)) {
      setStatus('error')
      setLoading(false)
      return
    }

    if (!accessKey || !uuidRegex.test(accessKey)) {
      setStatus('error')
      setLoading(false)
      return
    }

    formData.append('access_key', accessKey)
    formData.append('source_site', 'donota-advisory')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setStatus('success')
        event.target.reset()
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const anim = (d = 0) => ({
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: d, ease: 'easeOut' },
  })

  const cardLink = "https://publicard.net/c/vida-tokodi/"

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070")' }} />
      <div className="contact-overlay" />

      <div className="contact-container">
        <div className="contact-header">
          <motion.h2 {...anim()} className="section-title">
            {t.contact.title} <span className="text-gradient">{t.contact.titleHighlight}</span>
          </motion.h2>
          <motion.p {...anim(0.1)} className="section-subtitle">{t.contact.subtitle}</motion.p>
          <motion.p {...anim(0.15)} className="section-description">{t.contact.description}</motion.p>
        </div>

        <motion.div {...anim(0.2)} className="contact-card">
          <div className="contact-grid">
            <div className="form-column">
              <h3 className="form-title">{t.contact.formTitle}</h3>
              <form id="contact-form" onSubmit={handleSubmit} className="contact-form">
                <div className="floating-field">
                  <input type="text" name="name" placeholder=" " required className="floating-input" />
                  <label className="floating-label">{t.contact.namePlaceholder}</label>
                  <div className="floating-line" />
                </div>

                <div className="floating-field">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="floating-input"
                  />
                  <label className="floating-label">{t.contact.emailPlaceholder}</label>
                  <div className="floating-line" />
                </div>

                <div className="floating-field">
                  <input type="tel" name="phone" placeholder=" " required pattern="[0-9+\s\-\(\)\.]{10,20}" className="floating-input" />
                  <label className="floating-label">{t.contact.phonePlaceholder}</label>
                  <div className="floating-line" />
                </div>

                <div className="floating-field">
                  <textarea name="message" placeholder=" " required rows={4} className="floating-input floating-textarea" />
                  <label className="floating-label">{t.contact.messagePlaceholder}</label>
                  <div className="floating-line" />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="submit-loader"></span> : <span>{t.contact.sendButton}</span>}
                </button>

                {status === 'success' && <motion.div className="form-message form-message--success">{t.contact.successMessage}</motion.div>}
                {status === 'error' && <motion.div className="form-message form-message--error">{t.contact.errorMessage || 'Invalid email or server error.'}</motion.div>}
              </form>
            </div>

            <div className="info-column">
              {/* QR Code pour Desktop */}
              <div className="qr-wrapper">
                <div className="qr-border-gradient">
                  <div className="qr-box">
                    <a href={cardLink} target="_blank" rel="noopener noreferrer">
                      <img src="/images/Qrcode.png" alt="QR Code" className="qr-image" />
                    </a>
                  </div>
                </div>
                <p className="qr-title">{t.contact.qrTitle}</p>
                <p className="qr-desc">{t.contact.qrSubtitle}</p>
              </div>

              {/* Bouton Mobile : Tap to Save */}
              <div className="mobile-btn-wrapper">
                <a href={cardLink} target="_blank" rel="noopener noreferrer" className="mobile-btn">
                  Tap to Save my Business Card
                </a>
              </div>

              <div className="divider"></div>

              <div className="linkedin-wrapper">
                <p className="linkedin-label">{t.contact.linkedinTitle}</p>
                <a href="https://www.linkedin.com/in/vida-tokodi-pmp%C2%AE-3345981a1" target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  {t.contact.linkedinButton}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...anim(0.3)} className="location-badge">
          <span>{t.contact.location}</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact