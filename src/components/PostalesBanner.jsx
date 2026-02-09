import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const PostalesBanner = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="postales-banner" ref={ref}>
      <motion.div
        className="postales-banner__inner"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="postales-banner__content">
          <span className="postales-banner__eyebrow">{t('postales.eyebrow')}</span>
          <h3 className="postales-banner__title">{t('postales.title')}</h3>
          <p className="postales-banner__desc">{t('postales.desc')}</p>
          <a
            href="https://postales.vercel.app"
            className="postales-banner__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('postales.cta')}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="postales-banner__visual">
          <div className="postales-banner__badge">
            <span className="postales-banner__badge-label">Postales del Viñedo</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PostalesBanner;
