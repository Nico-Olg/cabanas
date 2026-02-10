import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Stats from './components/Stats';
import Concepto from './components/Concepto';
import Galeria from './components/Galeria';
import ParallaxDivider from './components/ParallaxDivider';
import Cabanas from './components/Cabanas';
import Vinedos from './components/Vinedos';
import Experiencias from './components/Experiencias';
import Testimonios from './components/Testimonios';
import Ubicacion from './components/Ubicacion';
import FAQ from './components/FAQ';
import PostalesBanner from './components/PostalesBanner';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/CabanasDelVinedo.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.pageYOffset / totalScroll) : 0;
      const progressPct = currentProgress * 100;
      setScrollProgress(progressPct);

      const blend = 15 + (currentProgress * 70);
      document.body.style.setProperty('--blend-point', `${blend}%`);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

        {/* 1. Hero impacto visual */}
        <Hero />

        {/* 2. Trust Badges - credibilidad inmediata */}
        <TrustBadges />

        {/* 3. Stats - datos que anclan credibilidad */}
        <Stats />

        {/* 3. Concepto - storytelling del lugar */}
        <Concepto />

        {/* 4. Galeria - mostrar los espacios */}
        <Galeria />

        {/* 5. Divider cinematico - frase que queda */}
        <ParallaxDivider />

        {/* 6. Cabanas - el producto principal */}
        <Cabanas />

        {/* 7. Vinedos - el diferencial unico */}
        <Vinedos />

        {/* 8. Experiencias - que mas se puede hacer */}
        <Experiencias />

        {/* 9. Testimonios - prueba social */}
        <Testimonios />

        {/* 10. Ubicacion - como llegar */}
        <Ubicacion />

        {/* 11. FAQ - resolver dudas antes de contactar */}
        <FAQ />

        {/* 12. Contacto - conversion */}
        <Contacto />

        {/* 13. Postales del Viñedo - cross-sell (después del contacto para no generar fuga) */}
        <PostalesBanner />

        {/* 14. Footer */}
        <Footer />

        {/* WhatsApp FAB */}
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
