import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Experiencias = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 40l10-16 6 8 8-12 8 12" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="34" cy="14" r="4" stroke="var(--accent)" strokeWidth="2"/>
          <path d="M4 42h40" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('experiences.exp1_title'),
      desc: t('experiences.exp1_desc'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8c-4 0-8 4-8 10 0 4 2 7 4 9l4 5 4-5c2-2 4-5 4-9 0-6-4-10-8-10z" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 32h12M16 36h16M20 40h8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="16" r="3" stroke="var(--primary)" strokeWidth="2"/>
        </svg>
      ),
      title: t('experiences.exp2_title'),
      desc: t('experiences.exp2_desc'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M6 6v10c0 2.2 1.8 4 4 4h8a4 4 0 004-4V6M14 6v34M42 30V6a10 10 0 00-10 10v10c0 2.2 1.8 4 4 4h6zm0 0v14" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 24h6M32 14h4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('experiences.exp3_title'),
      desc: t('experiences.exp3_desc'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="20" r="6" stroke="var(--primary)" strokeWidth="2.5"/>
          <path d="M24 26v4M18 36c0-4 2.7-6 6-6s6 2 6 6" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M12 14c-2 3-3 6-3 10 0 4 1 7 3 10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 14c2 3 3 6 3 10 0 4-1 7-3 10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 10c-3 4-5 9-5 14s2 10 5 14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d="M40 10c3 4 5 9 5 14s-2 10-5 14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
      title: t('experiences.exp4_title'),
      desc: t('experiences.exp4_desc'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="14" cy="34" r="8" stroke="var(--primary)" strokeWidth="2.5"/>
          <circle cx="34" cy="34" r="8" stroke="var(--primary)" strokeWidth="2.5"/>
          <path d="M14 34l10-18h8l2 10" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 16l10 18" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="16" r="2" fill="var(--primary)"/>
        </svg>
      ),
      title: t('experiences.exp5_title'),
      desc: t('experiences.exp5_desc'),
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4 28c0-6 4-12 10-14 2-1 4-2 4-4V8h12v2c0 2 2 3 4 4 6 2 10 8 10 14v4H4v-4z" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 32v6M36 32v6M8 38h32" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 20c0 2.2 1.8 4 4 4s4-1.8 4-4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('experiences.exp6_title'),
      desc: t('experiences.exp6_desc'),
    },
  ];

  return (
    <section id="experiencias" className="experiences-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">{t('experiences.eyebrow')}</span>
          <h2 className="section-title">{t('experiences.title_line1')}<br />{t('experiences.title_line2')}</h2>
          <p className="section-subtitle">
            {t('experiences.subtitle')}
          </p>
        </motion.div>

        <div className="experiences-grid">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <span className="experience-icon">{exp.icon}</span>
              <h4 className="experience-title">{exp.title}</h4>
              <p className="experience-desc">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiencias;
