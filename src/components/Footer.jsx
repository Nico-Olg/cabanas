import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
// import Newsletter from './Newsletter'; // TODO: Activar cuando tengamos backend

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter signup - TODO: Descomentar cuando tengamos backend */}
        {/* <Newsletter /> */}

           {/* Columna central: Logo */}
          <div className="footer-logo-container">
            <img
              src="/images/Cabañas-del-vieñdo-blanco2.png"
              alt="Cabañas del Viñedo"
              className="footer-logo-img"
            />
          </div>

        <div className="footer-content">
          {/* Columna izquierda: Brand + Contacto */}
          <div className="footer-left">
            <div className="footer-brand">
              <h3 className="footer-logo">Cabañas del Viñedo</h3>
              <p className="footer-tagline">{t('footer.tagline')}</p>
            </div>

            <div className="footer-contact">
              <h4 className="footer-title">{t('footer.contact_title')}</h4>
              <a href="tel:+543434516846" className="footer-link">
                (343) 4516846
              </a>
              <a href="https://wa.me/543434516846" className="footer-link" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

       

          {/* Columna derecha: Redes sociales */}
          <div className="footer-social">
            <h4 className="footer-title">{t('footer.follow_title')}</h4>
            <div className="social-links">
              <a href="https://instagram.com/cabanasdelvinedo/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label={t('footer.instagram_aria')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                </svg>
              </a>
              <a href="https://facebook.com/cabanasdelvinedo" className="social-link" target="_blank" rel="noopener noreferrer" aria-label={t('footer.facebook_aria')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright')}
          </p>
          <p className="footer-credit">
            {t('footer.location')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
