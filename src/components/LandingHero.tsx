import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LandingHeroProps {
  onBegin: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onBegin }) => {
  const prefersReduced = useReducedMotion();
  const [isBlooming, setIsBlooming] = useState(false);

  const handleTap = () => {
    if (isBlooming) return;
    setIsBlooming(true);
    // After bloom flash reaches apex, transition
    setTimeout(() => {
      onBegin();
    }, 450);
  };

  return (
    <div
      onClick={handleTap}
      className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 px-6 select-none cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTap();
        }
      }}
      aria-label="Touch to begin experience"
    >
      {/* Top spacer */}
      <div className="h-4" />

      {/* Center Group: Teaser copy + Focal Object */}
      <div className="flex flex-col items-center text-center max-w-xs -mt-4">
        {/* Teaser line */}
        <motion.p
          className="font-serif-display text-lg sm:text-xl text-[#F6EEE4] leading-relaxed font-light tracking-wide italic opacity-95 mb-10 whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {COPY.landingTeaser}
        </motion.p>

        {/* Central Focal Object: Glowing Glass Paper Lantern */}
        <div className="relative flex items-center justify-center">
          {/* Ambient Warm Halo behind lantern */}
          <motion.div
            className="absolute w-52 h-52 rounded-full blur-[42px] pointer-events-none"
            style={{ backgroundColor: 'rgba(232, 196, 138, 0.28)' }}
            animate={
              prefersReduced
                ? {}
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.55, 0.9, 0.55],
                  }
            }
            transition={{
              duration: 3.0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Interactive Focal Object Button */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTap();
            }}
            aria-label="Begin experience"
            className="relative p-4 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48A] transition-transform active:scale-95"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: isBlooming ? [1, 1.4, 2.2] : prefersReduced ? 1 : [1, 1.04, 1],
              opacity: isBlooming ? [1, 1, 0] : 1,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={
              isBlooming
                ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                : {
                    scale: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 0.8, ease: 'easeOut' },
                  }
            }
          >
            {/* Pulsing ring indicator around lantern */}
            <div className="absolute inset-0 rounded-full border border-[#E8C48A]/40 animate-ping opacity-30 pointer-events-none" />

            {/* SVG Hand-crafted Paper Lantern */}
            <svg
              width="92"
              height="110"
              viewBox="0 0 86 102"
              fill="none"
              className="drop-shadow-[0_8px_28px_rgba(232,196,138,0.45)]"
            >
              <defs>
                <radialGradient
                  id="lanternBody"
                  cx="40%"
                  cy="35%"
                  r="65%"
                  fx="38%"
                  fy="30%"
                >
                  <stop offset="0%" stopColor="#FFF4DE" />
                  <stop offset="25%" stopColor="#FFD9A0" />
                  <stop offset="60%" stopColor="#E8C48A" />
                  <stop offset="90%" stopColor="#AF8347" />
                  <stop offset="100%" stopColor="#5E4019" />
                </radialGradient>

                <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#FFD9A0" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E8C48A" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5E4323" />
                  <stop offset="50%" stopColor="#E8C48A" />
                  <stop offset="100%" stopColor="#5E4323" />
                </linearGradient>
              </defs>

              {/* Suspension top ring */}
              <circle cx="43" cy="8" r="5" stroke="url(#metalRim)" strokeWidth="1.5" />

              {/* Lantern Cap Top */}
              <path
                d="M 33 13 L 53 13 C 55 13 56 15 54 17 L 50 20 L 36 20 L 32 17 C 30 15 31 13 33 13 Z"
                fill="url(#metalRim)"
              />

              {/* Lantern Main Faceted Glass Body */}
              <path
                d="M 36 20 C 20 28 14 48 18 68 C 22 80 32 90 43 92 C 54 90 64 80 68 68 C 72 48 66 28 50 20 Z"
                fill="url(#lanternBody)"
                stroke="#FFD9A0"
                strokeWidth="0.85"
                strokeOpacity="0.75"
              />

              {/* Delicate vertical ribs/flutes */}
              <path
                d="M 43 20 C 33 35 33 75 43 92"
                stroke="#FFE5BD"
                strokeWidth="0.9"
                strokeOpacity="0.65"
                fill="none"
              />
              <path
                d="M 43 20 C 53 35 53 75 43 92"
                stroke="#B8894F"
                strokeWidth="0.9"
                strokeOpacity="0.65"
                fill="none"
              />

              {/* Inner luminous warm core */}
              <ellipse
                cx="43"
                cy="54"
                rx="15"
                ry="19"
                fill="url(#innerGlow)"
              />

              {/* Lantern Bottom Ring Cap */}
              <path
                d="M 39 92 L 47 92 L 44 98 L 42 98 Z"
                fill="url(#metalRim)"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Bottom Hint */}
      <motion.div
        className="flex flex-col items-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#E8C48A]/25 bg-[#221A26]/60 backdrop-blur-sm"
          animate={
            prefersReduced
              ? { opacity: 0.8 }
              : {
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.02, 1],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#E8C48A] animate-ping" />
          <p className="font-sans-ui text-xs tracking-[0.25em] uppercase text-[#F6EEE4] font-medium">
            {COPY.landingHint}
          </p>
        </motion.div>
      </motion.div>

      {/* Match-cut Bloom Flash Overlay on Tap */}
      <AnimatePresence>
        {isBlooming && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-radial from-[#FFF3D6] via-[#E8C48A]/90 to-[#140F16]"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 0.95], scale: [0.3, 1.4, 2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
