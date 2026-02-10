import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // TODO: Integrar con Google Apps Script o servicio de email
    // Por ahora simulamos el envío
    setTimeout(() => {
      console.log('Newsletter signup:', email);
      setStatus('success');
      setEmail('');

      // Resetear después de 3 segundos
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="newsletter">
      <div className="newsletter__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="newsletter__content">
        <h4 className="newsletter__title">{t('newsletter.title')}</h4>
        <p className="newsletter__subtitle">{t('newsletter.subtitle')}</p>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter__input"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            className="newsletter__button"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' && t('newsletter.loading')}
            {status === 'success' && '✓'}
            {(status === 'idle' || status === 'error') && t('newsletter.button')}
          </button>
        </form>
        {status === 'error' && (
          <span className="newsletter__error">{t('newsletter.error')}</span>
        )}
        {status === 'success' && (
          <span className="newsletter__success">{t('newsletter.success')}</span>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
