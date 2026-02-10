import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './About.css'

const About = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const profileImage = "https://media.licdn.com/dms/image/v2/D4E03AQEAMPE9l5ID2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731332321687?e=1772064000&v=beta&t=QFY2FlUpAaB5_OWZRnPaXCRKeFX5LuYlh9WO8SbO1nA"

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">

          {/* --- GAUCHE : PHOTO (Taille Réduite) --- */}
          <div className="about-visual">
            <motion.div
              className="base-photo-frame"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="frame-navy"></div>
              <div className="frame-gold"></div>
              <div className="frame-image-wrapper">
                <img src={profileImage} alt="Profile" className="base-img" />
                <div className="img-overlay"></div>
              </div>
            </motion.div>
          </div>

          {/* --- DROITE : PREVIEW --- */}
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={fadeInUp} className="badge-wrapper">
              <span className="badge-line"></span>
              <span className="badge-text">{t.about.experienceBadge || "PROFILE"}</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="about-name">
              {t.about.name}
            </motion.h2>

            <motion.h3 variants={fadeInUp} className="about-role">
              {t.about.role}
            </motion.h3>

            <motion.p variants={fadeInUp} className="about-teaser">
              {t.about.paragraphs[0]}...
            </motion.p>

            <motion.div variants={fadeInUp} className="btn-wrapper">
              <button onClick={() => setIsOpen(true)} className="btn-read-more">
                <span>{t.about.readMore || "En savoir plus"}</span>
                <div className="btn-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </div>
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* --- MODALE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >

              <button className="modal-close" onClick={() => setIsOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* Contenu Scrollable */}
              <div className="modal-scroll-wrapper">

                {/* 1. Bannière colorée */}
                <div className="modal-banner"></div>

                {/* 2. Contenu principal */}
                <div className="modal-inner-content">

                  {/* Photo qui chevauche (Overlap) */}
                  <div className="modal-avatar-wrapper">
                    <img src={profileImage} alt="Full Profile" />
                  </div>

                  <div className="modal-header-info">
                    <h3>{t.about.name}</h3>
                    <p className="modal-role-label">{t.about.role}</p>
                  </div>

                  <div className="modal-divider"></div>

                  <div className="modal-text-body">
                    {t.about.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="modal-footer-section">
                    <span className="credentials">{t.about.credentials}</span>
                    <a
                      href="https://www.linkedin.com/in/vida-tokodi-pmp%C2%AE-3345981a1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-linkedin-btn"
                    >
                      LinkedIn Profile
                    </a>
                  </div>

                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default About