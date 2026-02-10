import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './TrackRecord.css';

const partners = [
  'Christian Dior Couture', 'Cartier', 'Christian Louboutin', 'Van Cleef & Arpels',
  'Boucheron', 'Messika', 'Le Bon Marché', 'Hublot',
  'Tag Heuer', 'Rimowa', 'Air Liquide'
];

const TrackRecord = () => {
  const { t } = useLanguage();
  const infinitePartners = [...partners, ...partners, ...partners];

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

        {/* MARQUEE : Épuré */}
        <div className="tr-marquee-wrapper">
          <div className="tr-marquee-content">
            {infinitePartners.map((name, i) => (
              <span key={i} className="tr-marquee-item">{name}</span>
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
                  <div className="tr-tags">
                    {project.focus.map((tag, j) => (
                      <span key={j} className="tr-tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="tr-outcome-pill">
                    <div className="tr-dot" />
                    {project.outcome}
                  </div>
                </div>
              </div>
              <div className="tr-card-border-effect" />
            </motion.div>
          ))}
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