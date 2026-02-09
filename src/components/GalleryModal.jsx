import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const GalleryModal = ({ isOpen, onClose, galleryKey }) => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  const galleries = {
    vinedos: {
      title: t('gallery_modal.vinedos_title'),
      description: t('gallery_modal.vinedos_desc'),
      images: [
        { gradient: 'linear-gradient(135deg, #2d5016 0%, #4a7c2e 50%, #6fa844 100%)', label: t('gallery_modal.vinedos_img1') },
        { gradient: 'linear-gradient(135deg, #3a6b35 0%, #5a9f3e 50%, #7bc462 100%)', label: t('gallery_modal.vinedos_img2') },
        { gradient: 'linear-gradient(135deg, #4a7c2e 0%, #6fa844 50%, #97bc62 100%)', label: t('gallery_modal.vinedos_img3') },
        { gradient: 'linear-gradient(135deg, #5b2c3f 0%, #6fa844 50%, #d4b896 100%)', label: t('gallery_modal.vinedos_img4') },
        { gradient: 'linear-gradient(135deg, #2c5f2d 0%, #4a7c2e 50%, #6fa844 100%)', label: t('gallery_modal.vinedos_img5') },
        { gradient: 'linear-gradient(135deg, #1a4012 0%, #2d5016 50%, #4a7c2e 100%)', label: t('gallery_modal.vinedos_img6') },
      ],
    },
    patio: {
      title: t('gallery_modal.patio_title'),
      description: t('gallery_modal.patio_desc'),
      images: [
        { gradient: 'linear-gradient(135deg, #5b2c3f 0%, #812b2f 50%, #a8444a 100%)', label: t('gallery_modal.patio_img1') },
        { gradient: 'linear-gradient(135deg, #6b4423 0%, #a0845c 50%, #d4b896 100%)', label: t('gallery_modal.patio_img2') },
        { gradient: 'linear-gradient(135deg, #812b2f 0%, #a8444a 50%, #d4b896 100%)', label: t('gallery_modal.patio_img3') },
        { gradient: 'linear-gradient(135deg, #4a2c17 0%, #7a5530 50%, #a8845c 100%)', label: t('gallery_modal.patio_img4') },
        { gradient: 'linear-gradient(135deg, #3a6b35 0%, #812b2f 50%, #d4b896 100%)', label: t('gallery_modal.patio_img5') },
      ],
    },
    pileta: {
      title: t('gallery_modal.pileta_title'),
      description: t('gallery_modal.pileta_desc'),
      images: [
        { gradient: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)', label: t('gallery_modal.pileta_img1') },
        { gradient: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 50%, #80DEEA 100%)', label: t('gallery_modal.pileta_img2') },
        { gradient: 'linear-gradient(135deg, #0288D1 0%, #26C6DA 50%, #80DEEA 100%)', label: t('gallery_modal.pileta_img3') },
        { gradient: 'linear-gradient(135deg, #3a7bd5 0%, #4a7c2e 50%, #00d2ff 100%)', label: t('gallery_modal.pileta_img4') },
        { gradient: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 50%, #90CAF9 100%)', label: t('gallery_modal.pileta_img5') },
      ],
    },
  };

  const gallery = galleries[galleryKey] || galleries.vinedos;

  useEffect(() => {
    if (isOpen) setCurrentImage(0);
  }, [isOpen, galleryKey]);

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
    if (e.key === 'ArrowRight') setCurrentImage(prev => (prev + 1) % gallery.images.length);
    if (e.key === 'ArrowLeft') setCurrentImage(prev => (prev - 1 + gallery.images.length) % gallery.images.length);
  }, [onClose, gallery.images.length]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const nextImage = () => setCurrentImage(prev => (prev + 1) % gallery.images.length);
  const prevImage = () => setCurrentImage(prev => (prev - 1 + gallery.images.length) % gallery.images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="gallery-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="gallery-modal__close" onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image carousel */}
            <div className="gallery-modal__carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="gallery-modal__slide"
                  style={{ background: gallery.images[currentImage].gradient }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="gallery-modal__slide-label">{gallery.images[currentImage].label}</span>
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="gallery-modal__counter">
                {currentImage + 1} / {gallery.images.length}
              </div>

              {/* Carousel controls */}
              <button className="gallery-modal__arrow gallery-modal__arrow--prev" onClick={prevImage} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="gallery-modal__arrow gallery-modal__arrow--next" onClick={nextImage} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="gallery-modal__dots">
                {gallery.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`gallery-modal__dot ${idx === currentImage ? 'gallery-modal__dot--active' : ''}`}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={`Image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="gallery-modal__content">
              <h3 className="gallery-modal__title">{gallery.title}</h3>
              <p className="gallery-modal__desc">{gallery.description}</p>

              {/* Thumbnail strip */}
              <div className="gallery-modal__thumbs">
                {gallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`gallery-modal__thumb ${idx === currentImage ? 'gallery-modal__thumb--active' : ''}`}
                    style={{ background: img.gradient }}
                    onClick={() => setCurrentImage(idx)}
                    aria-label={img.label}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
