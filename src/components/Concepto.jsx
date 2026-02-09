import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Concepto = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M6 42h36M10 42V22l14-12 14 12v20M18 42v-12h12v12" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 26h8M24 22v8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('concept.pillar1_title'),
      description: t('concept.pillar1_desc')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" stroke="var(--primary)" strokeWidth="2.5"/>
          <path d="M16 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="2" fill="var(--primary)"/>
          <circle cx="28" cy="20" r="2" fill="var(--primary)"/>
          <path d="M24 4v4M4 24h4M44 24h-4M24 44v-4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('concept.pillar2_title'),
      description: t('concept.pillar2_desc')
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4c-4 8-16 12-16 24a16 16 0 0032 0C40 16 28 12 24 4z" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 36v-16M24 20l-6 8M24 24l6 6" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('concept.pillar3_title'),
      description: t('concept.pillar3_desc')
    }
  ];

  return (
    <section id="concepto" className="concept-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="eyebrow">{t('concept.eyebrow')}</span>
          <h2 className="section-title">{t('concept.title_line1')}<br />{t('concept.title_line2')}</h2>
          <p className="section-subtitle">
            {t('concept.subtitle')}
          </p>
        </motion.div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="pillar-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="pillar-icon">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-description">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Concepto;
