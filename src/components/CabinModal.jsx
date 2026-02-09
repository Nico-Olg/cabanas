import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

// SVG Icons (same as Cabanas.jsx for consistency)
const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
  </svg>
);
const AcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 16a4 4 0 108 0M12 4v4M4 12h4M16 12h4M6.34 6.34l2.83 2.83M14.83 9.17l2.83-2.83"/>
  </svg>
);
const TvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
  </svg>
);
const ParkingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/>
  </svg>
);
const KitchenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
);
const BedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20M6 8v9"/>
  </svg>
);
const BathIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h3v2.25"/>
    <path d="M4 21l1-1.5M20 21l-1-1.5"/>
  </svg>
);
const GrillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12a8 8 0 00-8 8h16a8 8 0 00-8-8zM12 12V2M8 20l-2 2M16 20l2 2M8 6h8"/>
  </svg>
);
const FireplaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20h18M5 20V8l7-4 7 4v12"/>
    <path d="M12 20v-6c-2 0-3 1.5-3 3s1 3 3 3zM12 14c2 0 3 1.5 3 3s-1 3-3 3"/>
  </svg>
);
const HammockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6l3 2M21 6l-3 2"/>
    <path d="M6 8c0 6 4 8 6 8s6-2 6-8"/>
    <path d="M2 22l4-14M22 22l-4-14"/>
  </svg>
);
const SolarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="8" width="20" height="8" rx="1"/>
    <path d="M6 8V6M10 8V6M14 8V6M18 8V6"/>
    <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
    <path d="M12 16v4M8 20h8"/>
  </svg>
);
const DeckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18h20M4 18v-4h16v4"/>
    <path d="M6 14V8M18 14V8M2 8h20"/>
    <path d="M10 8V4M14 8V4"/>
  </svg>
);

const CabinModal = ({ isOpen, onClose, cabinType }) => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  // cabin data based on type
  const cabinData = {
    small: {
      title: t('cabin_modal.small_title'),
      capacity: t('cabin_modal.small_capacity'),
      description: t('cabin_modal.small_desc'),
      names: ['Cabernet Sauvignon', 'Marselan', 'Tannat', 'Viognier', 'Malbec', 'Syrah'],
      images: [
        { gradient: 'linear-gradient(135deg, #6b4423 0%, #a0845c 50%, #d4b896 100%)', label: t('cabin_modal.img_exterior') },
        { gradient: 'linear-gradient(135deg, #8b6f47 0%, #c4a882 50%, #e8d5b7 100%)', label: t('cabin_modal.img_interior') },
        { gradient: 'linear-gradient(135deg, #5a3a1f 0%, #8b6240 50%, #b08860 100%)', label: t('cabin_modal.img_bedroom') },
        { gradient: 'linear-gradient(135deg, #4a2c17 0%, #7a5530 50%, #a8845c 100%)', label: t('cabin_modal.img_kitchen') },
        { gradient: 'linear-gradient(135deg, #3a6b35 0%, #5a9f3e 50%, #7bc462 100%)', label: t('cabin_modal.img_grill') },
      ],
      highlights: [
        t('cabin_modal.small_h1'),
        t('cabin_modal.small_h2'),
        t('cabin_modal.small_h3'),
      ],
      whatsappMsg: t('cabin_modal.small_wa'),
    },
    large: {
      title: t('cabin_modal.large_title'),
      capacity: t('cabin_modal.large_capacity'),
      description: t('cabin_modal.large_desc'),
      names: ['Chardonnay'],
      images: [
        { gradient: 'linear-gradient(135deg, #5b2c3f 0%, #812b2f 50%, #c4a882 100%)', label: t('cabin_modal.img_exterior') },
        { gradient: 'linear-gradient(135deg, #7a3d50 0%, #a8444a 50%, #d4b896 100%)', label: t('cabin_modal.img_living') },
        { gradient: 'linear-gradient(135deg, #6b4423 0%, #a0845c 50%, #d4b896 100%)', label: t('cabin_modal.img_bedroom') },
        { gradient: 'linear-gradient(135deg, #4a2c17 0%, #7a5530 50%, #b08860 100%)', label: t('cabin_modal.img_kitchen') },
        { gradient: 'linear-gradient(135deg, #3a6b35 0%, #5a9f3e 50%, #7bc462 100%)', label: t('cabin_modal.img_grill') },
      ],
      highlights: [
        t('cabin_modal.large_h1'),
        t('cabin_modal.large_h2'),
        t('cabin_modal.large_h3'),
      ],
      whatsappMsg: t('cabin_modal.large_wa'),
    },
  };

  const cabin = cabinData[cabinType] || cabinData.small;

  const amenities = [
    { icon: <KitchenIcon />, label: t('cabins.amenity_kitchen') },
    { icon: <AcIcon />, label: t('cabins.amenity_ac') },
    { icon: <FireplaceIcon />, label: t('cabins.amenity_fireplace') },
    { icon: <TvIcon />, label: t('cabins.amenity_tv') },
    { icon: <SolarIcon />, label: t('cabins.amenity_solar') },
    { icon: <BedIcon />, label: t('cabins.amenity_bedding') },
    { icon: <BathIcon />, label: t('cabins.amenity_bathroom') },
    { icon: <GrillIcon />, label: t('cabins.amenity_grill') },
    { icon: <DeckIcon />, label: t('cabins.amenity_deck') },
    { icon: <HammockIcon />, label: t('cabins.amenity_hammocks') },
    { icon: <WifiIcon />, label: t('cabins.amenity_wifi') },
    { icon: <ParkingIcon />, label: t('cabins.amenity_parking') },
  ];

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImage(0);
    }
  }, [isOpen, cabinType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setCurrentImage(prev => (prev + 1) % cabin.images.length);
    if (e.key === 'ArrowLeft') setCurrentImage(prev => (prev - 1 + cabin.images.length) % cabin.images.length);
  }, [onClose, cabin.images.length]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const nextImage = () => setCurrentImage(prev => (prev + 1) % cabin.images.length);
  const prevImage = () => setCurrentImage(prev => (prev - 1 + cabin.images.length) % cabin.images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cabin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="cabin-modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="cabin-modal__close" onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image carousel */}
            <div className="cabin-modal__carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="cabin-modal__slide"
                  style={{ background: cabin.images[currentImage].gradient }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="cabin-modal__slide-label">{cabin.images[currentImage].label}</span>
                </motion.div>
              </AnimatePresence>

              {/* Carousel controls */}
              <button className="cabin-modal__arrow cabin-modal__arrow--prev" onClick={prevImage} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cabin-modal__arrow cabin-modal__arrow--next" onClick={nextImage} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="cabin-modal__dots">
                {cabin.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`cabin-modal__dot ${idx === currentImage ? 'cabin-modal__dot--active' : ''}`}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="cabin-modal__content">
              <div className="cabin-modal__header">
                <h3 className="cabin-modal__title">{cabin.title}</h3>
                <span className="cabin-modal__badge">{cabin.capacity}</span>
              </div>

              <p className="cabin-modal__desc">{cabin.description}</p>

              {/* Cabin names */}
              <div className="cabin-modal__names">
                {cabin.names.map((name, i) => (
                  <span key={i} className="cabin-name-tag">{name}</span>
                ))}
              </div>

              {/* Highlights */}
              <div className="cabin-modal__highlights">
                {cabin.highlights.map((h, i) => (
                  <div key={i} className="cabin-modal__highlight">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.3 4L6 11.3 2.7 8" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="cabin-modal__amenities">
                <h4 className="cabin-modal__amenities-title">{t('cabin_modal.amenities_title')}</h4>
                <div className="cabin-modal__amenities-grid">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="cabin-modal__amenity">
                      {amenity.icon}
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/543434516846?text=${encodeURIComponent(cabin.whatsappMsg)}`}
                className="btn-whatsapp cabin-modal__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="#fff">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.968-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.914-.604 1.206-.604.146 0 .278.008.396.014.428.018.642.042.924.716.354.842 1.216 2.96 1.322 3.176.108.216.216.508.068.802-.138.3-.258.486-.476.746-.216.26-.426.46-.642.74-.198.244-.42.504-.176.932.244.426 1.084 1.788 2.328 2.896 1.598 1.424 2.942 1.866 3.36 2.074.428.216.676.18.924-.108.254-.294 1.084-1.26 1.374-1.694.284-.428.574-.36.966-.216.396.144 2.506 1.182 2.934 1.398.428.216.714.324.82.504.108.182.108 1.044-.282 2.144z"/>
                </svg>
                {t('cabin_modal.cta')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CabinModal;
