import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './Services.css'

/* ── Model icons ── */
const modelIcons = [
  /* compass - strategy */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
  /* trending - optimization */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
]

/* ── Marquee background icons ── */
const marqueeIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="8" y="2" width="8" height="6" rx="1" /><rect x="1" y="16" width="8" height="6" rx="1" /><rect x="15" y="16" width="8" height="6" rx="1" /><path d="M12 8v4" /><path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
]

const MarqueeRow = ({ reverse = false, speed = 60 }) => (
  <div className={`services-marquee__row ${reverse ? 'services-marquee__row--reverse' : ''}`}>
    {[0, 1].map((copy) => (
      <div key={copy} className="services-marquee__track" style={{ animationDuration: `${speed}s` }}>
        {marqueeIcons.map((icon, i) => (
          <div key={`${copy}-${i}`} className="services-marquee__icon">{icon}</div>
        ))}
      </div>
    ))}
  </div>
)

/* ── Engagement Model Card ── */
const ModelCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="model-card"
  >
    <div className="model-card__accent" />
    <div className="model-card__top">
      <div className="model-card__icon">{modelIcons[index]}</div>
      <span className="model-card__number">{service.number}</span>
    </div>
    <p className="model-card__for">{service.for}</p>
    <h3 className="model-card__title">{service.title}</h3>
    <div className="model-card__paragraphs">
      {service.paragraphs.map((p, i) => (
        <p key={i} className="model-card__paragraph">{p}</p>
      ))}
    </div>
    <div className="model-card__mandate">
      <p className="model-card__mandate-title">{service.mandateTitle}</p>
      <div className="model-card__features">
        {service.features.map((f, i) => (
          <div key={i} className="model-card__feature">
            <div className="model-card__dot" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="model-card__outcome">
      <span className="model-card__outcome-label">Outcome</span>
      <p className="model-card__outcome-text">{service.outcome}</p>
    </div>
  </motion.div>
)

/* ── Mobile Carousel Card ── */
const CarouselModelCard = ({ service, index }) => (
  <div className="model-card model-card--carousel">
    <div className="model-card__accent model-card__accent--visible" />
    <div className="model-card__top">
      <div className="model-card__icon model-card__icon--active">{modelIcons[index]}</div>
      <span className="model-card__number">{service.number}</span>
    </div>
    <p className="model-card__for">{service.for}</p>
    <h3 className="model-card__title">{service.title}</h3>
    <div className="model-card__paragraphs">
      {service.paragraphs.map((p, i) => (
        <p key={i} className="model-card__paragraph">{p}</p>
      ))}
    </div>
    <div className="model-card__mandate">
      <p className="model-card__mandate-title">{service.mandateTitle}</p>
      <div className="model-card__features">
        {service.features.map((f, i) => (
          <div key={i} className="model-card__feature">
            <div className="model-card__dot" />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="model-card__outcome">
      <span className="model-card__outcome-label">Outcome</span>
      <p className="model-card__outcome-text">{service.outcome}</p>
    </div>
  </div>
)

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 260 : -260, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir < 0 ? 260 : -260, opacity: 0, scale: 0.94 }),
}

const AUTOPLAY_DELAY = 5000

const Services = () => {
  const { t } = useLanguage()
  const [[current, direction], setCurrent] = useState([0, 0])
  const [isMobile, setIsMobile] = useState(false)
  const touchStart = useRef(null)
  const autoplayRef = useRef(null)
  const items = t.services.items
  const total = items.length

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    autoplayRef.current = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % total, 1])
    }, AUTOPLAY_DELAY)
    return () => clearInterval(autoplayRef.current)
  }, [isMobile, total])

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % total, 1])
    }, AUTOPLAY_DELAY)
  }, [total])

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => [(prev + dir + total) % total, dir])
    resetAutoplay()
  }, [total, resetAutoplay])

  const goTo = useCallback((i) => {
    setCurrent(([prev]) => [i, i > prev ? 1 : -1])
    resetAutoplay()
  }, [resetAutoplay])

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) paginate(diff > 0 ? 1 : -1)
    touchStart.current = null
  }

  const anim = (d = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: d, ease: [0.16, 1, 0.3, 1] }
  })

  return (
    <section id="services" className="services">
      <div className="services__glow services__glow--1" />
      <div className="services__glow services__glow--2" />

      {/* Icon Marquee */}
      <div className="services-marquee" aria-hidden="true">
        <MarqueeRow speed={70} />
        <MarqueeRow reverse speed={55} />
        <MarqueeRow speed={65} />
        <MarqueeRow reverse speed={75} />
      </div>

      <div className="services__container">
        {/* Header */}
        <div className="services__header">
          <motion.div {...anim()}>
            <span className="services__badge">
              <span className="services__badge-dot" />
              <span className="services__badge-text">{t.services.title}</span>
            </span>
          </motion.div>
          <motion.h2 {...anim(0.05)} className="services__title">{t.services.title}</motion.h2>
          <motion.p {...anim(0.1)} className="services__subtitle">{t.services.description}</motion.p>
        </div>

        {/* Desktop: 2-column grid */}
        {!isMobile && (
          <div className="services__models-grid">
            {items.map((service, index) => (
              <ModelCard key={index} service={service} index={index} />
            ))}
          </div>
        )}

        {/* Mobile: carousel */}
        {isMobile && (
          <div className="services-carousel">
            <button className="services-carousel__arrow" onClick={() => paginate(-1)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div className="services-carousel__viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, scale: { duration: 0.25 } }}
                  className="services-carousel__slide"
                >
                  <CarouselModelCard service={items[current]} index={current} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="services-carousel__arrow" onClick={() => paginate(1)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            <div className="services-carousel__dots">
              {items.map((_, i) => (
                <button key={i} className={`services-carousel__dot ${i === current ? 'services-carousel__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Model ${i + 1}`} />
              ))}
            </div>
          </div>
        )}

        {/* Closing statement */}
        <motion.p {...anim(0.2)} className="services__closing">{t.services.closing}</motion.p>

        {/* CTA */}
        <motion.div {...anim(0.25)} className="services__cta">
          <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
            <span>{t.services.cta}</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
