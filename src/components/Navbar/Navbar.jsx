import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t, language, toggleLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  const navItems = [
    { label: t.nav.why, id: '#why-donota' },
    { label: t.nav.services, id: '#services' },
    { label: t.nav.track, id: '#track-record' },
    { label: t.nav.contact, id: '#contact' },
  ]

  const scrollTo = (id) => {
    setIsOpen(false)
    const element = document.querySelector(id)
    if (element) {
      const offset = 80
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // VARIANTES POUR L'ANIMATION "SLIDE" DU MENU MOBILE
  // Initial: 100% (tout à droite, invisible) -> Animate: 0 (visible)
  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 30,    // Moins de rebond, plus fluide
        stiffness: 300  // Assez rapide
      }
    }
  }

  const listVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <>
      <header className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* 1. LOGO BRILLANT */}
          <button onClick={() => scrollTo('#hero')} className="nav-logo-block">
            <span className="logo-d">D</span>
            <div className="logo-text-group">
              <span className="logo-main">DONOTA</span>
              <span className="logo-sub">ADVISORY</span>
            </div>
          </button>

          {/* 2. MENU DESKTOP (Centré) */}
          <nav className="nav-links-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3. ACTIONS (Toggle & Burger) */}
          <div className="nav-right-side">

            {/* TOGGLE LANGUE (Style Switch On/Off) */}
            <div className="lang-toggle-pill" onClick={toggleLanguage}>
              {/* Le fond orange qui bouge */}
              <div className={`toggle-slider ${language === 'fr' ? 'right' : ''}`}></div>

              {/* Les Textes */}
              <span className={`lang-text ${language === 'en' ? 'active' : 'inactive'}`}>EN</span>
              <span className={`lang-text ${language === 'fr' ? 'active' : 'inactive'}`}>FR</span>
            </div>

            {/* Burger Icon */}
            <button
              className="burger-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE MENU (Slide depuis la droite) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants} /* Utilise le slide défini plus haut */
          >
            {/* BOUTON FERMER */}
            <button className="close-btn-mobile" onClick={() => setIsOpen(false)}>
              <svg
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* CONTENU */}
            <motion.div className="mobile-nav-content" variants={listVariants}>
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  className="mobile-link"
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Langue Mobile */}
              <motion.div className="lang-mobile-wrapper" variants={itemVariants}>
                <button
                  className={`lang-mobile-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => language !== 'en' && toggleLanguage()}
                >
                  EN
                </button>
                <span className="lang-separator">|</span>
                <button
                  className={`lang-mobile-btn ${language === 'fr' ? 'active' : ''}`}
                  onClick={() => language !== 'fr' && toggleLanguage()}
                >
                  FR
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar