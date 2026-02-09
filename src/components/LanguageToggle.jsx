import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className="lang-toggle" role="group" aria-label="Language selector">
      <button
        className={`lang-toggle__btn ${language === 'pt' ? 'lang-toggle__active' : ''}`}
        onClick={() => changeLanguage('pt')}
      >
        BR
      </button>
      <span className="lang-toggle__separator">|</span>
      <button
        className={`lang-toggle__btn ${language === 'es' ? 'lang-toggle__active' : ''}`}
        onClick={() => changeLanguage('es')}
      >
        ES
      </button>
      <span className="lang-toggle__separator">|</span>
      <button
        className={`lang-toggle__btn ${language === 'en' ? 'lang-toggle__active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
