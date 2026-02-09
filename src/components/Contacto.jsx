import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const Contacto = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your Google Apps Script URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setIsSubmitted(true);

      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact Form',
          event_label: 'Landing Page Lead'
        });
      }

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);

    } catch (error) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-header">
            <h2 className="section-title">{t('contact.title_line1')}<br />{t('contact.title_line2')}</h2>
            <p className="contact-subtitle">
              {t('contact.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.label_name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.placeholder_name')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t('contact.label_phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.placeholder_phone')}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.label_email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('contact.placeholder_email')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.label_message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder={t('contact.placeholder_message')}
              />
            </div>

            <div className="contact-buttons">
              <button
                type="submit"
                className="btn-primary full-width"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? t('contact.btn_submitting') : isSubmitted ? t('contact.btn_submitted') : t('contact.btn_submit')}
                {!isSubmitting && !isSubmitted && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              <a
                href={`https://wa.me/543434516846?text=${t('whatsapp.prefilled')}`}
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="#fff">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.968-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.914-.604 1.206-.604.146 0 .278.008.396.014.428.018.642.042.924.716.354.842 1.216 2.96 1.322 3.176.108.216.216.508.068.802-.138.3-.258.486-.476.746-.216.26-.426.46-.642.74-.198.244-.42.504-.176.932.244.426 1.084 1.788 2.328 2.896 1.598 1.424 2.942 1.866 3.36 2.074.428.216.676.18.924-.108.254-.294 1.084-1.26 1.374-1.694.284-.428.574-.36.966-.216.396.144 2.506 1.182 2.934 1.398.428.216.714.324.82.504.108.182.108 1.044-.282 2.144z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <div className="trust-badges">
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l2.5 6.5L19 9.5l-4.5 4.5 1 7-5.5-3-5.5 3 1-7L1 9.5l6.5-1L10 2z" fill="currentColor"/>
                </svg>
                <span>{t('contact.trust1')}</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9h2v4h-2V7zm0 5h2v2h-2v-2z" fill="currentColor"/>
                </svg>
                <span>{t('contact.trust2')}</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fill="currentColor"/>
                </svg>
                <span>{t('contact.trust3')}</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacto;
