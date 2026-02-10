import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Experiencias = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      image: '/images/experiencias/exp-avistaje2.jpg',
      fallback: 'linear-gradient(135deg, #2c5f2d 0%, #4a7c2e 50%, #6fa844 100%)',
      title: t('experiences.exp1_title'),
      desc: t('experiences.exp1_desc'),
    },
    {
      image: '/images/experiencias/exp-desgustacion.jpg',
      fallback: 'linear-gradient(135deg, #5b2c3f 0%, #812b2f 50%, #a8444a 100%)',
      title: t('experiences.exp2_title'),
      desc: t('experiences.exp2_desc'),
    },
    {
      image: '/images/experiencias/exp-gastronomia.jpg',
      fallback: 'linear-gradient(135deg, #6b4423 0%, #a0845c 50%, #d4b896 100%)',
      title: t('experiences.exp3_title'),
      desc: t('experiences.exp3_desc'),
    },
    {
      image: '/images/experiencias/exp-avistaje.jpg',
      fallback: 'linear-gradient(135deg, #3a6b35 0%, #5a9f3e 50%, #97bc62 100%)',
      title: t('experiences.exp4_title'),
      desc: t('experiences.exp4_desc'),
    },
    {
      image: '/images/experiencias/exp-atardecer2.jpg',
      fallback: 'linear-gradient(135deg, #8b6f47 0%, #a0845c 50%, #c4a882 100%)',
      title: t('experiences.exp5_title'),
      desc: t('experiences.exp5_desc'),
    },
    {
      image: '/images/experiencias/exp-pileta.jpg',
      fallback: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
      title: t('experiences.exp6_title'),
      desc: t('experiences.exp6_desc'),
    },
    {
      image: '/images/experiencias/exp-actividades.jpg',
      fallback: 'linear-gradient(135deg, #d4a574 0%, #c0392b 50%, #812b2f 100%)',
      title: t('experiences.exp7_title'),
      desc: t('experiences.exp7_desc'),
    },
    {
      image: '/images/experiencias/exp-rio.jpg',
      fallback: 'linear-gradient(135deg, #4a7c2e 0%, #2c5f2d 50%, #1a4012 100%)',
      title: t('experiences.exp8_title'),
      desc: t('experiences.exp8_desc'),
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
              <div
                className="experience-card__bg"
                style={{
                  background: `url(${exp.image}) center/cover no-repeat, ${exp.fallback}`,
                }}
              />
              <div className="experience-card__overlay" />
              <div className="experience-card__content">
                <h4 className="experience-title">{exp.title}</h4>
                <p className="experience-desc">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiencias;
