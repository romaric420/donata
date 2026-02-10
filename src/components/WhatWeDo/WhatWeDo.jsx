import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import './WhatWeDo.css'

const WhatWeDo = () => {
  const { t } = useLanguage()
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const anim = (d = 0) => ({
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] }
  })

  return (
    <section id="what-we-do" className="whatwedo">
      <div className="whatwedo__inner">
        <motion.div {...anim()} className="section-divider">
          <div className="w-2 h-2 rounded-full bg-copper-400" />
        </motion.div>
        <motion.h2 {...anim(0.05)} className="whatwedo__title">
          {t.whatWeDo.title}{' '}<span className="gradient-text">{t.whatWeDo.titleHighlight}</span>
        </motion.h2>
        <motion.p {...anim(0.1)} className="whatwedo__subtitle">{t.whatWeDo.subtitle}</motion.p>
        <motion.div {...anim(0.15)}>
          <button onClick={() => scrollTo('#services')} className="btn-primary">
            <span>{t.whatWeDo.cta}</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeDo
