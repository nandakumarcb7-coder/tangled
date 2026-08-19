import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import rapunzalBg from '../assets/rapunzal.jpg';

interface WishAcceptedSceneProps {
  onContinue: () => void;
}

interface LoveHeart {
  id: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
  heartChar: string;
}

export const WishAcceptedScene: React.FC<WishAcceptedSceneProps> = ({ onContinue }) => {
  const prefersReduced = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tapHearts, setTapHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const hearts: LoveHeart[] = useMemo(() => {
    const chars = ['💖', '💕', '💗', '✨', '🌸', '💖'];
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: 10 + ((i * 27 + 13) % 80),
      scale: 0.7 + (i % 4) * 0.25,
      duration: 5 + (i % 4) * 1.4,
      delay: (i * 0.4) % 3,
      heartChar: chars[i % chars.length],
    }));
  }, []);

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newHeart = { id: Date.now() + Math.random(), x, y };

    setTapHearts((prev) => [...prev.slice(-8), newHeart]);
  };

  const handleProceed = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div
      onClick={handleTap}
      className="relative z-20 w-full h-full flex flex-col justify-between items-center py-10 px-6 select-none overflow-hidden bg-[#140F16] cursor-pointer"
    >
      {/* Background Image: Rapunzal with Atmospheric Shadow Blending */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img
          src={rapunzalBg}
          alt="Rapunzel"
          className="w-full h-full object-cover opacity-85 filter saturate-[1.15] contrast-[1.05] scale-105"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 0.85, scale: 1.02 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        {/* Deep Romantic Dark Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140F16]/60 via-[#1E1128]/30 to-[#120B15]/90 pointer-events-none" />

        {/* Top Vignette Shadow */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#140F16] via-[#140F16]/50 to-transparent pointer-events-none" />

        {/* Bottom Vignette Shadow for Button Contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#140F16] via-[#140F16]/90 to-transparent pointer-events-none" />

        {/* Inner Radial Inset Shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 90px 25px rgba(15, 10, 18, 0.75)',
          }}
        />
      </div>

      {/* ===== LOVE ANIMATION: FLOATING HEARTS & LIGHTING HALOS ===== */}
      {/* Ambient Pulsing Heart Glow Aura */}
      <div className="absolute inset-0 pointer-events-none z-1 flex items-center justify-center">
        <motion.div
          className="w-72 h-72 rounded-full blur-[80px] bg-[#CE97A0]/35"
          animate={
            prefersReduced
              ? {}
              : {
                  scale: [1, 1.2, 0.95, 1.15, 1],
                  opacity: [0.4, 0.7, 0.45, 0.65, 0.4],
                }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Rising Love Hearts Particles */}
      {!prefersReduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(255,182,193,0.8)]"
              style={{
                left: `${h.left}%`,
                bottom: '-40px',
                transform: `scale(${h.scale})`,
              }}
              animate={{
                y: [0, -780],
                x: [0, (h.id % 2 === 0 ? 16 : -16), (h.id % 2 === 0 ? -12 : 12), 0],
                opacity: [0, 0.9, 0.9, 0],
                scale: [h.scale * 0.8, h.scale * 1.1, h.scale * 0.9],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {h.heartChar}
            </motion.div>
          ))}
        </div>
      )}

      {/* Tap-Spawned Burst Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <AnimatePresence>
          {tapHearts.map((th) => (
            <motion.div
              key={th.id}
              className="absolute text-2xl filter drop-shadow-[0_0_12px_rgba(255,217,160,0.9)]"
              style={{ left: th.x, top: th.y }}
              initial={{ scale: 0, opacity: 1, y: 0 }}
              animate={{ scale: [0, 1.6, 1.2], opacity: [1, 0.9, 0], y: -50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Spacer */}
      <div className="h-6 z-20" />

      {/* Center Quote Block */}
      <div className="flex flex-col items-center text-center max-w-xs z-20 my-auto">
        <motion.div
          className="mb-4 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#CE97A0]/50 bg-[#221A26]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, scale: 0.8, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="text-sm">💖</span>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#FFD9A0] font-semibold">
            Wish Granted
          </span>
        </motion.div>

        {/* Romantic Quote in Great Vibes Cursive */}
        <motion.h1
          className="font-cursive text-3xl sm:text-4xl text-[#F6EEE4] leading-relaxed font-normal tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] px-2"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          "{COPY.wishAcceptedQuote}"
        </motion.h1>
      </div>

      {/* Bottom Action Button */}
      <div className="pb-6 z-20">
        <motion.button
          type="button"
          onClick={handleProceed}
          disabled={isTransitioning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(232,196,138,0.5)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4DE] transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.4 }}
        >
          Continue ✨
        </motion.button>
      </div>

      {/* Transition Flash */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-radial from-[#FFF3D6] via-[#E8C48A]/90 to-[#140F16]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
