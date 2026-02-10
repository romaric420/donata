import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  const canvasRef = useRef(null)
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  /* ── Particle canvas ────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.8 + 0.4
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.3 + 0.05
        this.color = Math.random() > 0.6 ? '212,160,61' : '196,149,106'
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -10) this.x = canvas.width + 10
        if (this.x > canvas.width + 10) this.x = -10
        if (this.y < -10) this.y = canvas.height + 10
        if (this.y > canvas.height + 10) this.y = -10
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`
        ctx.fill()
      }
    }

    const count = Math.min(window.innerWidth < 768 ? 20 : 40, Math.floor(window.innerWidth / 35))
    for (let i = 0; i < count; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Softer connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(196,149,106,${0.035 * (1 - dist / 160)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Animations ─────────────────────────── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 25, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="hero" className="hero">
      {/* Background */}
      <div className="hero__bg" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Decorative shapes */}
      <div className="hero__shapes">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
        <div className="hero__line hero__line--1" />
        <div className="hero__line hero__line--2" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__inner">

          {/* Badge */}
          <motion.div {...fadeUp(0)} className="hero__badge">
            <span className="w-2 h-2 bg-copper-400 rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/55 font-semibold tracking-wide">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Title — 2 lines max */}
          <motion.h1 {...fadeUp(0.1)} className="hero__title">
            {t.hero.title}{' '}
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.2)} className="hero__subtitle">
            {t.hero.subtitle}
          </motion.p>

          {/* Buttons — both ghost, copper fill on hover */}
          <motion.div {...fadeUp(0.35)} className="hero__actions">
            <button
              onClick={() => scrollTo('#services')}
              className="hero__btn hero__btn--primary"
            >
              <span>{t.hero.cta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="hero__btn hero__btn--secondary"
            >
              <span>{t.hero.ctaSecondary}</span>

            </button>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hero__scroll"
      >
        <button onClick={() => scrollTo('#what-we-do')}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">
            {t.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom fade */}
      <div className="hero__fade" />
    </section>
  )
}

export default Hero