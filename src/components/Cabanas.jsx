import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';
import CabinModal from './CabinModal';

// SVG Icons for amenities
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

const PetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 5.172C10 3.782 8.884 2.5 7.5 2.5S5 3.782 5 5.172C5 6.56 6.116 7.5 7.5 7.5S10 6.56 10 5.172zM19 5.172C19 3.782 17.884 2.5 16.5 2.5S14 3.782 14 5.172C14 6.56 15.116 7.5 16.5 7.5S19 6.56 19 5.172zM6.5 12.172C6.5 10.782 5.384 9.5 4 9.5s-2.5 1.282-2.5 2.672C1.5 13.56 2.616 14.5 4 14.5s2.5-1.44 2.5-2.328zM22.5 12.172C22.5 10.782 21.384 9.5 20 9.5s-2.5 1.282-2.5 2.672c0 1.388 1.116 2.328 2.5 2.328s2.5-1.44 2.5-2.328z"/>
    <path d="M12 22c-4 0-7-2-7-5 0-2 1.5-4 3.5-5 1-.5 2.2-.8 3.5-.8s2.5.3 3.5.8c2 1 3.5 3 3.5 5 0 3-3 5-7 5z"/>
  </svg>
);

const Cabanas = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('small');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const cabinTypes = [
    {
      type: 'small',
      title: t('cabins.small_title'),
      description: t('cabins.small_desc'),
      imageClass: 'placeholder-small',
      names: ['Cabernet Sauvignon', 'Marselan', 'Tannat', 'Viognier', 'Malbec', 'Syrah'],
    },
    {
      type: 'large',
      title: t('cabins.large_title'),
      description: t('cabins.large_desc'),
      imageClass: 'placeholder-large',
      names: ['Chardonnay'],
    },
  ];

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
    { icon: <PetIcon />, label: t('cabins.amenity_pets') },
  ];

  return (
    <>
      <section id="cabanas" className="cabins-section">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <span className="eyebrow">{t('cabins.eyebrow')}</span>
            <h2 className="section-title">{t('cabins.title_line1')}<br />{t('cabins.title_line2')}</h2>
            <p className="section-subtitle">{t('cabins.subtitle')}</p>
          </motion.div>

          <div className="cabins-grid">
            {cabinTypes.map((cabin, index) => (
              <motion.div
                key={index}
                className="cabin-card cabin-card--clickable"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => openModal(cabin.type)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openModal(cabin.type); }}
              >
                <div className={`cabin-card__image ${cabin.imageClass}`}>
                  <div className="cabin-card__view-more">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                      <path d="M11 8v6M8 11h6"/>
                    </svg>
                    <span>{t('cabins.view_more')}</span>
                  </div>
                </div>
                <div className="cabin-card__body">
                  <h3 className="cabin-card__title">{cabin.title}</h3>
                  <p className="cabin-card__desc">{cabin.description}</p>
                  <div className="cabin-names">
                    {cabin.names.map((name, i) => (
                      <span key={i} className="cabin-name-tag">{name}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="amenities-shared"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="amenities-list">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenity.icon}
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="cabins-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href={`https://wa.me/543434516846?text=${encodeURIComponent('Hola, quiero consultar disponibilidad en Cabañas del Viñedo')}`}
              className="btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 32 32" width="20" height="20" fill="#fff">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.968-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.914-.604 1.206-.604.146 0 .278.008.396.014.428.018.642.042.924.716.354.842 1.216 2.96 1.322 3.176.108.216.216.508.068.802-.138.3-.258.486-.476.746-.216.26-.426.46-.642.74-.198.244-.42.504-.176.932.244.426 1.084 1.788 2.328 2.896 1.598 1.424 2.942 1.866 3.36 2.074.428.216.676.18.924-.108.254-.294 1.084-1.26 1.374-1.694.284-.428.574-.36.966-.216.396.144 2.506 1.182 2.934 1.398.428.216.714.324.82.504.108.182.108 1.044-.282 2.144z"/>
              </svg>
              {t('cabins.cta')}
            </a>
          </motion.div>
        </div>
      </section>

      <CabinModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cabinType={modalType}
      />
    </>
  );
};

export default Cabanas;
