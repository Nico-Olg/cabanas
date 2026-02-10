import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const VarietyModal = ({ isOpen, onClose, varietyKey }) => {
  const { t } = useTranslation();

  const varieties = {
    malbec: {
      name: 'Malbec',
      image: '/varietales/variedad-malbec.jpg',
      type: t('variety_modal.type_red'),
      origin: t('variety_modal.malbec_origin'),
      description: t('variety_modal.malbec_desc'),
      color: '#2d0a31',
    },
    cabernet: {
      name: 'Cabernet Sauvignon',
      image: '/varietales/variedad-cabernet-sauvignon.jpg',
      type: t('variety_modal.type_red'),
      origin: t('variety_modal.cabernet_origin'),
      description: t('variety_modal.cabernet_desc'),
      color: '#1a0520',
    },
    tannat: {
      name: 'Tannat',
      image: '/varietales/variedad-tannat.jpg',
      type: t('variety_modal.type_red'),
      origin: t('variety_modal.tannat_origin'),
      description: t('variety_modal.tannat_desc'),
      color: '#1f0a28',
    },
    viognier: {
      name: 'Viognier',
      image: '/varietales/variedad-viognier.jpg',
      type: t('variety_modal.type_white'),
      origin: t('variety_modal.viognier_origin'),
      description: t('variety_modal.viognier_desc'),
      color: '#3a3520',
    },
    marselan: {
      name: 'Marselan',
      image: '/varietales/Marselan.jpg',
      type: t('variety_modal.type_red'),
      origin: t('variety_modal.marselan_origin'),
      description: t('variety_modal.marselan_desc'),
      color: '#250a20',
    },
    flame: {
      name: 'Flame Seedless',
      image: '/varietales/Flame-Seedless.jpg',
      type: t('variety_modal.type_table'),
      origin: t('variety_modal.flame_origin'),
      description: t('variety_modal.flame_desc'),
      color: '#2a1520',
    },
    redglobe: {
      name: 'Red Globe',
      image: '/varietales/Red-Globe.jpeg',
      type: t('variety_modal.type_table'),
      origin: t('variety_modal.redglobe_origin'),
      description: t('variety_modal.redglobe_desc'),
      color: '#2a1020',
    },
  };

  const variety = varieties[varietyKey] || varieties.malbec;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="variety-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="variety-modal"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero image area */}
            <div
              className="variety-modal__hero"
              style={{
                backgroundImage: `url(${variety.image})`,
                backgroundColor: variety.color,
              }}
            >
              <div className="variety-modal__hero-overlay" />
              <button className="variety-modal__close" onClick={onClose} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="variety-modal__hero-content">
                <span className="variety-modal__type-badge">{variety.type}</span>
                <h3 className="variety-modal__name">{variety.name}</h3>
                <span className="variety-modal__origin">{variety.origin}</span>
              </div>
            </div>

            {/* Description */}
            <div className="variety-modal__body">
              <p className="variety-modal__desc">{variety.description}</p>
              <span className="variety-modal__nursery">{t('variety_modal.nursery')}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VarietyModal;
