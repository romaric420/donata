import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Lissage de la progression pour que le cercle ne saccade pas
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  // Détection du scroll pour afficher/masquer
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top-container"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
        >
          {/* Cercle de progression SVG */}
          <svg className="progress-ring" width="54" height="54" viewBox="0 0 54 54">
            {/* Fond du cercle */}
            <circle
              className="progress-ring__circle-bg"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="transparent"
              r="24"
              cx="27"
              cy="27"
            />
            {/* Cercle animé (Progression) */}
            <motion.circle
              className="progress-ring__circle"
              stroke="url(#gradient-gold)"
              strokeWidth="2"
              fill="transparent"
              r="24"
              cx="27"
              cy="27"
              style={{ pathLength, rotate: -90, transformOrigin: "center" }}
            />
            {/* Dégradé pour le cercle */}
            <defs>
              <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b07d52" />
                <stop offset="100%" stopColor="#e9c062" />
              </linearGradient>
            </defs>
          </svg>

          {/* Bouton central avec la flèche */}
          <div className="scroll-btn-inner">
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, -4, 0] }} // Petite animation de rebond continu
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path d="M18 15L12 9L6 15" />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop