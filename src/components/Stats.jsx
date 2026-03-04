import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Counter from './Counter';

const Stats = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const fallbackStats = [
    { end: 7, suffix: '', label: t('stats.cabins') },
    { end: 7, suffix: '', label: t('stats.varieties') },
    { end: 11, suffix: ' ha', label: t('stats.hectares') },
    { end: 100, suffix: '%', label: t('stats.nature') },
  ];

  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'config', 'stats'));
        if (snap.exists() && snap.data().items?.length) {
          setStats(snap.data().items.map((s) => ({
            end: Number(s.value) || 0,
            suffix: s.suffix || '',
            label: s.label,
          })));
        }
      } catch {
        // Firebase no configurado: usa el fallback
      }
    };
    load();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <span className="stat-number">
                <Counter end={stat.end} suffix={stat.suffix} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
