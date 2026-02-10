import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';
import VarietyModal from './VarietyModal';

const Vinedos = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVariety, setActiveVariety] = useState(null);

  const varieties = [
    { key: 'malbec', name: t('vineyard.variety1_name'), type: t('vineyard.variety1_type'), image: '/images/varietales/variedad-malbec.jpg', fallback: 'linear-gradient(135deg, #2d0a31 0%, #5a1a4a 50%, #812b2f 100%)' },
    { key: 'cabernet', name: t('vineyard.variety2_name'), type: t('vineyard.variety2_type'), image: '/images/varietales/variedad-cabernet-sauvignon.jpg', fallback: 'linear-gradient(135deg, #1a0520 0%, #3d1535 50%, #6b2040 100%)' },
    { key: 'tannat', name: t('vineyard.variety3_name'), type: t('vineyard.variety3_type'), image: '/images/varietales/variedad-tannat.jpg', fallback: 'linear-gradient(135deg, #1f0a28 0%, #3a1540 50%, #5e2060 100%)' },
    { key: 'viognier', name: t('vineyard.variety4_name'), type: t('vineyard.variety4_type'), image: '/images/varietales/variedad-viognier.jpg', fallback: 'linear-gradient(135deg, #3a3520 0%, #6b6030 50%, #a89550 100%)' },
    { key: 'marselan', name: t('vineyard.variety5_name'), type: t('vineyard.variety5_type'), image: '/images/varietales/Marselan.jpg', fallback: 'linear-gradient(135deg, #250a20 0%, #4a1838 50%, #702850 100%)' },
    { key: 'flame', name: t('vineyard.variety6_name'), type: t('vineyard.variety6_type'), image: '/images/varietales/Flame-Seedless.jpg', fallback: 'linear-gradient(135deg, #2a1520 0%, #6b3040 50%, #a04858 100%)' },
    { key: 'redglobe', name: t('vineyard.variety7_name'), type: t('vineyard.variety7_type'), image: '/images/varietales/Red-Globe.jpeg', fallback: 'linear-gradient(135deg, #2a1020 0%, #5a2035 50%, #8a3050 100%)' },
  ];

  const handleCardClick = (key) => {
    setActiveVariety(key);
    setModalOpen(true);
  };

  return (
    <>
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
                key={variety.key}
                className="variety-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => handleCardClick(variety.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(variety.key); } }}
              >
                <div
                  className="variety-card__bg"
                  style={{
                    background: `url(${variety.image}) center/cover no-repeat, ${variety.fallback}`,
                  }}
                />
                <div className="variety-card__overlay" />
                <div className="variety-card__content">
                  <h4 className="variety-name">{variety.name}</h4>
                  <span className="variety-type">{variety.type}</span>
                  <span className="variety-card__cta">{t('vineyard.view_detail')}</span>
                </div>
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

      <VarietyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        varietyKey={activeVariety}
      />
    </>
  );
};

export default Vinedos;
