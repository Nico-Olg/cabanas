import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const ParallaxDivider = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="parallax-divider">
      <motion.div className="parallax-divider__bg" style={{ y }} />
      <div className="parallax-divider__overlay" />
      <div className="parallax-divider__content">
        <motion.p
          className="parallax-divider__quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {t('divider.quote')}
        </motion.p>
      </div>
    </section>
  );
};

export default ParallaxDivider;
