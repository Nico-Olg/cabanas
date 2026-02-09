import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Testimonios = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      text: t('testimonials.t1_text'),
      author: t('testimonials.t1_author'),
      origin: t('testimonials.t1_origin'),
    },
    {
      text: t('testimonials.t2_text'),
      author: t('testimonials.t2_author'),
      origin: t('testimonials.t2_origin'),
    },
    {
      text: t('testimonials.t3_text'),
      author: t('testimonials.t3_author'),
      origin: t('testimonials.t3_origin'),
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="section-title">{t('testimonials.title')}</h2>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="testimonial-quote">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M10.667 18.667c-2.946 0-5.334-2.388-5.334-5.334C5.333 8.06 9.393 4 14.667 4v4c-2.946 0-5.334 2.388-5.334 5.333h5.334v10.667H5.333v-5.333h5.334zm16 0c-2.946 0-5.334-2.388-5.334-5.334C21.333 8.06 25.393 4 30.667 4v4c-2.946 0-5.334 2.388-5.334 5.333h5.334v10.667H21.333v-5.333h5.334z" fill="currentColor"/>
                </svg>
              </div>
              <p className="testimonial-text">{item.text}</p>
              <div className="testimonial-author">
                <strong>{item.author}</strong>
                <span>{item.origin}</span>
              </div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.333l1.867 4.534 4.8.4-3.6 3.2 1.066 4.866L8 11.867l-4.133 2.466 1.066-4.866-3.6-3.2 4.8-.4L8 1.333z"/>
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
