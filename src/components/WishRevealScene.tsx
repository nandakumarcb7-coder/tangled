import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import tangledBg from '../assets/tangled.jpg';

interface WishRevealSceneProps {
  onYes: () => void;
  onNo: () => void;
}

export const WishRevealScene: React.FC<WishRevealSceneProps> = ({ onYes, onNo }) => {
  const prefersReduced = useReducedMotion();
  const [noTapCount, setNoTapCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scaled steps for Yes button upon tapping No: 1.0 -> 1.15 -> 1.30 -> 1.48 -> 1.65 (capped for 390px mobile safety)
  const yesScaleSteps = [1, 1.15, 1.3, 1.48, 1.65];
  const currentYesScale = yesScaleSteps[Math.min(noTapCount, yesScaleSteps.length - 1)];

  const words = COPY.wishRevealHeading.split(' ');

  const handleYes = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onYes();
    }, 450);
  };

  const handleNo = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onNo();
    }, 450);
  };

  return (
    <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-12 px-6 select-none overflow-hidden bg-[#140F16]">
      {/* Tangled Background Image Layer with Vivid Visibility */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img
          src={tangledBg}
          alt=""
          className="w-full h-full object-cover opacity-90 filter saturate-[1.15] contrast-[1.05] scale-105"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.90, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Soft Romantic Base Tint Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140F16]/50 via-[#1E1128]/25 to-[#120B15]/80 pointer-events-none" />

        {/* Top Soft Vignette */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#140F16]/70 via-[#140F16]/30 to-transparent pointer-events-none" />

        {/* Bottom Dark Vignette Shadow for Button Contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#140F16] via-[#140F16]/85 to-transparent pointer-events-none" />

        {/* Inner Radial Shadow Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 80px 20px rgba(15, 10, 18, 0.6)',
          }}
        />
      </div>

      {/* Ambient Radial Lighting Overlays */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <motion.div
          className="absolute top-[18%] left-[15%] w-72 h-72 rounded-full blur-[80px] bg-[#CE97A0]/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full blur-[90px] bg-[#E8C48A]/18"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {/* Top Spacer */}
      <div className="h-6" />

      {/* Center Section: Playful Word-by-Word Title */}
      <div className="flex flex-col items-center text-center max-w-xs z-10">

        {/* Playful Word-by-Word Title Reveal */}
        <h2 className="font-serif-display text-2xl sm:text-[28px] text-[#F6EEE4] leading-relaxed font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] flex flex-wrap justify-center gap-x-2">
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1], // ease-tap overshoot token
                delay: 0.35 + index * 0.12,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Interactive Yes / No Pill Buttons */}
        <div className="mt-12 w-full flex items-center justify-center space-x-6 min-h-[90px]">
          {/* YES BUTTON (Grows via transform scale with boing overshoot) */}
          <div className="relative flex items-center justify-center">
            <motion.button
              type="button"
              onClick={handleYes}
              disabled={isTransitioning}
              initial={false}
              animate={{
                scale: currentYesScale,
              }}
              whileTap={{ scale: currentYesScale * 0.94 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 18,
              }}
              className="px-7 py-3 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-semibold text-sm tracking-wide shadow-[0_4px_22px_rgba(232,196,138,0.45)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4DE] transition-colors"
            >
              Yes
            </motion.button>
          </div>

          {/* NO BUTTON (Anchored in its fixed position, responsive tactile tap) */}
          <div className="relative flex items-center justify-center">
            <motion.button
              type="button"
              onClick={handleNo}
              disabled={isTransitioning}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.12 }}
              className="px-7 py-3 rounded-full border border-[#E8C48A]/35 bg-[#221A26]/75 text-[#F6EEE4] font-sans font-medium text-sm tracking-wide backdrop-blur-sm cursor-pointer hover:border-[#E8C48A]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48A]"
            >
              No
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-6" />

      {/* Radiant Cross-fade Bloom Flash on Decision */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-radial from-[#FFF3D6] via-[#E8C48A]/90 to-[#140F16]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
