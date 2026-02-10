import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './WhyDonota.css'

const WhyDonota = () => {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Détection Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-Play sur Mobile
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.whyDonota.reasons.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile, t.whyDonota.reasons.length])

  // Animation Desktop
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const cardVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  // Animation Mobile
  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  }

  return (
    <section id="why-donota" className="why-section-wrapper">

      {/* FOND ANIMÉ (Blobs Luxe) */}
      <div className="why-animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="why-container">

        {/* HEADER */}
        <div className="why-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="why-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">{t.whyDonota.badge}</span>
            </div>

            <h2 className="why-title">
              {t.whyDonota.title} <span className="text-highlight">{t.whyDonota.titleHighlight}</span>
            </h2>

            <p className="why-subtitle">
              {t.whyDonota.subtitle}
            </p>
          </motion.div>
        </div>

        {/* CONTENU */}
        {isMobile ? (
          /* --- MOBILE : CARROUSEL --- */
          <div className="why-mobile-slider">
            <div className="slider-track">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="slider-card-wrapper"
                >
                  <GlassCard r={t.whyDonota.reasons[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="slider-pagination">
              {t.whyDonota.reasons.map((_, idx) => (
                <div
                  key={idx}
                  className={`pagination-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* --- DESKTOP : GRILLE --- */
          <motion.div
            className="why-grid"
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.whyDonota.reasons.map((r, i) => (
              <motion.div key={i} variants={cardVars} className="grid-item">
                <GlassCard r={r} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  )
}

// Composant Carte "Glass" (Sans Numéro)
const GlassCard = ({ r }) => (
  <div className="why-card-glass">
    {/* Effet Brillance */}
    <div className="shine-effect"></div>

    <div className="card-body">
      {/* Icône décorative (remplace le numéro) */}
      <div className="card-icon-wrapper">
        <div className="card-icon-badge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="card-line"></div>
      </div>

      <h3 className="card-title">{r.title}</h3>
      <p className="card-text">{r.description}</p>
    </div>
  </div>
)

export default WhyDonota