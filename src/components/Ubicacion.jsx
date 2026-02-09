import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Ubicacion = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="ubicacion" className="location-section">
      <div className="container">
        <div className="location-content">
          <motion.div
            ref={ref}
            className="location-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow">{t('location.eyebrow')}</span>
            <h2 className="section-title">{t('location.title_line1')}<br />{t('location.title_line2')}</h2>

            <div className="location-details">
              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>{t('location.detail1_title')}</strong>
                  <span>{t('location.detail1_desc')}</span>
                </div>
              </div>

              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>{t('location.detail2_title')}</strong>
                  <span>{t('location.detail2_desc')}</span>
                </div>
              </div>

              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>{t('location.detail3_title')}</strong>
                  <span>{t('location.detail3_desc')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="location-map"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="map-container">
              <iframe
                title={t('location.map_title')}
                src="https://maps.google.com/maps?q=-30.750293528738894,-59.61139471952832&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;
