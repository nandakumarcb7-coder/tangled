import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<'point' | 'hairline' | 'parting' | 'settling' | 'done'>('point');

  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const t1 = setTimeout(() => setPhase('hairline'), 700);
    const t2 = setTimeout(() => setPhase('parting'), 1800);
    const t3 = setTimeout(() => setPhase('settling'), 2900);
    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, prefersReduced]);

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={onComplete}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onComplete();
      }}
      aria-label="Cinematic opening sequence. Tap anywhere to enter."
    >
      {/* Black Shutter Curtains that part horizontally */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#140F16] z-20 pointer-events-none"
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'settling' || phase === 'done' ? '-105%' : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#140F16] z-20 pointer-events-none"
        initial={{ x: 0 }}
        animate={{
          x: phase === 'parting' || phase === 'settling' || phase === 'done' ? '105%' : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Central Seam & Golden Hairline */}
      <AnimatePresence>
        {(phase === 'point' || phase === 'hairline' || phase === 'parting') && (
          <div className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
            {/* Center Glowing Light Dot */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-[#FFD9A0]"
              style={{
                boxShadow: '0 0 24px 6px rgba(232, 196, 138, 0.95), 0 0 60px 18px rgba(232, 196, 138, 0.5)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase === 'point' ? [0, 1.2, 1] : phase === 'hairline' ? [1, 1.4] : 0,
                opacity: phase === 'parting' ? 0 : 1,
              }}
              transition={{
                duration: phase === 'point' ? 0.7 : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Vertical Hairline expanding from center */}
            <svg
              className="absolute w-12 h-64 overflow-visible"
              viewBox="0 0 40 200"
              fill="none"
            >
              <defs>
                <linearGradient id="hairlineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8C48A" stopOpacity="0" />
                  <stop offset="30%" stopColor="#E8C48A" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFD9A0" stopOpacity="1" />
                  <stop offset="70%" stopColor="#E8C48A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E8C48A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.line
                x1="20"
                y1="100"
                x2="20"
                y2="100"
                stroke="url(#hairlineGrad)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{
                  y1: phase === 'hairline' || phase === 'parting' ? 0 : 100,
                  y2: phase === 'hairline' || phase === 'parting' ? 200 : 100,
                  opacity: phase === 'parting' ? 0 : 1,
                }}
                transition={{
                  duration: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Warm light bloom bleeding through seam */}
            {phase === 'hairline' && (
              <motion.div
                className="absolute w-36 h-64 rounded-full blur-[35px] pointer-events-none"
                style={{ backgroundColor: 'rgba(232, 196, 138, 0.3)' }}
                initial={{ scaleY: 0.1, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Radial Light Flash during parting match cut */}
      <AnimatePresence>
        {phase === 'parting' && (
          <motion.div
            className="absolute inset-0 z-15 bg-radial from-[#FFD9A0]/35 via-[#E8C48A]/10 to-transparent pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.95, 0], scale: 1.25 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
