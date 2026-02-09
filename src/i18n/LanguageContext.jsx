import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import es from './es';
import en from './en';
import pt from './pt';

const translations = { pt, es, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cdv-lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('cdv-lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (translations[lang]) setLanguage(lang);
  }, []);

  const t = useCallback(
    (key) => translations[language]?.[key] || translations['es']?.[key] || key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
