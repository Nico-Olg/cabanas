import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';
import GalleryModal from './GalleryModal';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const FALLBACK_IMAGES = [
  { title: null, image: '/images/cabaña-exterior.jpg', galleryKey: null },
  { title: null, image: '/images/interior-cabaña.jpg', galleryKey: null },
  { title: null, image: '/images/pileta.jpg', galleryKey: 'pileta' },
  { title: null, image: '/images/patio-vinero.jpg', galleryKey: 'patio' },
  { title: null, image: '/images/vinedo-dron.jpg', galleryKey: 'vinedos' },
  { title: null, image: '/images/pet-friendly.jpg', galleryKey: null },
];

const Galeria = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(null);

  const fallback = FALLBACK_IMAGES.map((img, i) => ({
    ...img,
    title: t(`gallery.img${i + 1}`),
  }));
  const [images, setImages] = useState(fallback);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'imagenes'), where('folder', '==', 'galeria'), orderBy('createdAt', 'asc'));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setImages(snap.docs.map((d, i) => ({
            image: d.data().url,
            title: t(`gallery.img${i + 1}`) || d.data().name,
            galleryKey: null,
          })));
        }
      } catch {
        // Firebase no configurado: usa fallback local
      }
    };
    load();
  }, []);

  const handleItemClick = (galleryKey) => {
    if (galleryKey) {
      setActiveGallery(galleryKey);
      setModalOpen(true);
    }
  };

  return (
    <>
      <section id="galeria" className="gallery-section" ref={ref}>
        <div className="container">
          <motion.h2
            className="section-title centered"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t('gallery.title')}
          </motion.h2>

          <div className="gallery-grid">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`gallery-item ${image.galleryKey ? 'gallery-item--clickable' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                onClick={() => handleItemClick(image.galleryKey)}
                role={image.galleryKey ? 'button' : undefined}
                tabIndex={image.galleryKey ? 0 : undefined}
                onKeyDown={image.galleryKey ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleItemClick(image.galleryKey); } } : undefined}
              >
                {image.image ? (
                  <div className="gallery-image" style={{ backgroundImage: `url(${image.image})` }} />
                ) : (
                  <div className={`gallery-image ${image.placeholder}`} />
                )}
                <div className="gallery-overlay">
                  <span className="gallery-title">{image.title}</span>
                  {image.galleryKey && (
                    <span className="gallery-view-more">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                      </svg>
                      {t('gallery.view_gallery')}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        galleryKey={activeGallery}
      />
    </>
  );
};

export default Galeria;
