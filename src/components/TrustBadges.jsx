import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TrustBadges = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const badges = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Miembro AVER",
      subtext: "Asociación Vitivinícultores ER"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Pet Friendly",
      subtext: "Mascotas bienvenidas"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="8" r="5" strokeWidth="2"/>
          <path d="M12 13v8m-4-4l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "8 Varietales",
      subtext: "Genética mendocina"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" strokeWidth="2"/>
        </svg>
      ),
      text: "3 Hectáreas",
      subtext: "Reserva Natural Privada"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="trust-badges-section"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div className="trust-badges-grid">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="trust-badge"
            variants={item}
          >
            <div className="trust-badge__icon">
              {badge.icon}
            </div>
            <div className="trust-badge__content">
              <span className="trust-badge__text">{badge.text}</span>
              <span className="trust-badge__subtext">{badge.subtext}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustBadges;
