import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Concepto = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      image: '/images/cabaña-exterior.jpg',
      title: t('concept.pillar1_title'),
      description: t('concept.pillar1_desc')
    },
    {
      image: '/images/vinedo-atardecer.png',
      title: t('concept.pillar2_title'),
      description: t('concept.pillar2_desc')
    },
    {
      image: '/images/naturaleza-sin-filtro.jpg',
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
              style={{ backgroundImage: `url(${pillar.image})` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="pillar-card__overlay" />
              <div className="pillar-card__content">
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Concepto;
