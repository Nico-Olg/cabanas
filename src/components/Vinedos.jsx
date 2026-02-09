import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Vinedos = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const varieties = [
    { name: t('vineyard.variety1_name'), type: t('vineyard.variety1_type'), emoji: "\uD83C\uDF77" },
    { name: t('vineyard.variety2_name'), type: t('vineyard.variety2_type'), emoji: "\uD83C\uDF77" },
    { name: t('vineyard.variety3_name'), type: t('vineyard.variety3_type'), emoji: "\uD83C\uDF77" },
    { name: t('vineyard.variety4_name'), type: t('vineyard.variety4_type'), emoji: "\uD83E\uDD42" },
    { name: t('vineyard.variety5_name'), type: t('vineyard.variety5_type'), emoji: "\uD83C\uDF77" },
    { name: t('vineyard.variety6_name'), type: t('vineyard.variety6_type'), emoji: "\uD83C\uDF47" },
    { name: t('vineyard.variety7_name'), type: t('vineyard.variety7_type'), emoji: "\uD83C\uDF47" },
  ];

  return (
    <section id="vinedos" className="vineyard-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header centered"
        >
          <span className="eyebrow">{t('vineyard.eyebrow')}</span>
          <h2 className="section-title">{t('vineyard.title_line1')}<br />{t('vineyard.title_line2')}</h2>
          <p className="section-subtitle">
            {t('vineyard.subtitle')}
          </p>
        </motion.div>

        <div className="vineyard-grid">
          {varieties.map((variety, index) => (
            <motion.div
              key={index}
              className="variety-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <span className="variety-emoji">{variety.emoji}</span>
              <h4 className="variety-name">{variety.name}</h4>
              <span className="variety-type">{variety.type}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="vineyard-badge-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="aver-badge">
            {t('vineyard.aver_badge')}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Vinedos;
