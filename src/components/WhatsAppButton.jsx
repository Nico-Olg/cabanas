import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/543434516846?text=${t('whatsapp.prefilled')}`}
      className={`whatsapp-fab ${visible ? 'whatsapp-fab--visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.aria')}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.968-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.914-.604 1.206-.604.146 0 .278.008.396.014.428.018.642.042.924.716.354.842 1.216 2.96 1.322 3.176.108.216.216.508.068.802-.138.3-.258.486-.476.746-.216.26-.426.46-.642.74-.198.244-.42.504-.176.932.244.426 1.084 1.788 2.328 2.896 1.598 1.424 2.942 1.866 3.36 2.074.428.216.676.18.924-.108.254-.294 1.084-1.26 1.374-1.694.284-.428.574-.36.966-.216.396.144 2.506 1.182 2.934 1.398.428.216.714.324.82.504.108.182.108 1.044-.282 2.144z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
