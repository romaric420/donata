import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './TrackRecord.css';

const logos = [
  { name: 'Dior',                 src: '/images/logos/Dior.PNG' },
  { name: 'Cartier',              src: '/images/logos/cqrtier.PNG' },
  { name: 'Givenchy',             src: '/images/logos/Givenchy.png' },
  { name: 'Hublot',               src: '/images/logos/hublot.PNG' },
  { name: 'Messika',              src: '/images/logos/Messika.png' },
  { name: 'Tag Heuer',            src: '/images/logos/Tag Heuer.png' },
  { name: 'Van Cleef & Arpels',   src: '/images/logos/van.PNG',                    large: true },
  { name: 'Zenith',               src: '/images/logos/Zenith.png' },
  { name: 'Air Liquide',          src: '/images/logos/air.PNG' },
  { name: 'Boucheron',            src: '/images/logos/boucheron.PNG',              large: true },
  { name: 'Christian Louboutin',  src: '/images/logos/christian louboutin.png',   large: true },
  { name: 'Le Bon Marché',        src: '/images/logos/le bon marche.png' },
  { name: 'Rimowa',               src: '/images/logos/rimowa logo.png' },
];

const infiniteLogos = [...logos, ...logos, ...logos];

const TrackRecord = () => {
  const { t } = useLanguage();

  const reveal = {
    initial: { y: 100, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="track-record" className="tr-section">
      <div className="tr-container">

        {/* HEADER : Alignement Chirurgical */}
        <header className="tr-header">
          <motion.div {...reveal} className="tr-header-top">
            <span className="tr-super-title">Expertise & Network</span>
            <div className="tr-header-line" />
          </motion.div>

          <div className="tr-header-main">
            <motion.h2 {...reveal} className="tr-title">
              Track <span className="tr-serif italic">Record</span>
            </motion.h2>
            <motion.p {...reveal} transition={{ delay: 0.1 }} className="tr-description">
              {t.trackRecord.description}
            </motion.p>
          </div>
        </header>

        {/* MARQUEE : Logos réels */}
        <div className="tr-marquee-wrapper">
          <div className="tr-marquee-content">
            {infiniteLogos.map((logo, i) => (
              <div key={i} className="tr-marquee-logo">
                <img src={logo.src} alt={logo.name} className={`tr-marquee-img${logo.large ? ' tr-marquee-img--large' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* BENTO GRID : Structure 12 colonnes "Carrée" */}
        <div className="tr-bento-grid">
          {t.trackRecord.cases.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`tr-project-card tr-col-${i}`}
            >
              <div className="tr-card-content">
                <div className="tr-card-header">
                  <span className="tr-card-num">({String(i + 1).padStart(2, '0')})</span>
                  <span className="tr-card-category">{project.industry}</span>
                </div>

                <div className="tr-card-body">
                  <h3 className="tr-card-title">{project.company}</h3>
                  <p className="tr-card-subtitle">{project.role}</p>
                </div>

                <div className="tr-card-footer">
                  <div className="tr-focus-list">
                    {project.focus.map((item, j) => (
                      <div key={j} className="tr-focus-item">
                        <div className="tr-focus-dot" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="tr-outcome-block">
                    <span className="tr-outcome-label">Outcome</span>
                    <p className="tr-outcome-text">{project.outcome}</p>
                  </div>
                </div>
              </div>
              <div className="tr-card-border-effect" />
            </motion.div>
          ))}
        </div>

        {/* OUTCOMES & SCALE : 4 blocs */}
        <div className="tr-outcomes-section">
          <div className="tr-outcomes-header">
            <h3 className="tr-outcomes-title">{t.trackRecord.outcomesTitle}</h3>
            <p className="tr-outcomes-subtitle">{t.trackRecord.outcomesSubtitle}</p>
          </div>
          <div className="tr-outcomes-grid">
            {t.trackRecord.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="tr-outcome-card"
              >
                <span className="tr-outcome-card-num">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="tr-outcome-card-title">{outcome.title}</h4>
                <p className="tr-outcome-card-desc">{outcome.description}</p>
                <span className="tr-outcome-card-detail">{outcome.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA : Minimaliste */}
        <footer className="tr-footer">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="tr-cta-btn"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="tr-cta-label">{t.trackRecord.cta}</span>
            <div className="tr-cta-icon">→</div>
          </motion.button>
        </footer>

      </div>
    </section>
  );
};

export default TrackRecord;