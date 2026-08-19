import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import townImg from '../assets/town.jpeg';

interface FinalRevealSceneProps {
  placeAnswer?: string;
  onReplay: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const FinalRevealScene: React.FC<FinalRevealSceneProps> = ({
  onReplay,
}) => {
  const prefersReduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setParticles((prev) => [...prev.slice(-12), newParticle]);
  };

  const handleBye = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onReplay();
    }, 600);
  };

  // Floating sky lanterns
  const ascendingLanterns = [
    { id: 1, left: 10, delay: 0.1, duration: 4.5, scale: 0.5, opacity: 0.8 },
    { id: 2, left: 28, delay: 0.7, duration: 5.2, scale: 0.65, opacity: 0.9 },
    { id: 3, left: 45, delay: 0.3, duration: 4.2, scale: 0.55, opacity: 0.85 },
    { id: 4, left: 65, delay: 1.1, duration: 5.0, scale: 0.7, opacity: 0.95 },
    { id: 5, left: 85, delay: 0.5, duration: 4.6, scale: 0.48, opacity: 0.75 },
    { id: 6, left: 20, delay: 1.6, duration: 5.5, scale: 0.6, opacity: 0.8 },
    { id: 7, left: 75, delay: 1.4, duration: 4.8, scale: 0.52, opacity: 0.85 },
  ];

  return (
    <div
      onClick={handleTap}
      className="relative z-20 w-full h-full flex flex-col justify-between items-center py-10 px-6 select-none overflow-hidden bg-[#140F16]"
      role="region"
      aria-label="Grand Finale scene."
    >
      {/* Background Image: Town Artwork with High Opacity & Blending */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img
          src={townImg}
          alt="Corona Town"
          className="w-full h-full object-cover opacity-90 filter saturate-[1.15] contrast-[1.05] scale-105"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 0.90, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Deep Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140F16]/50 via-[#1E1128]/25 to-[#120B15]/85 pointer-events-none" />

        {/* Top Vignette Shadow */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#140F16]/80 via-[#140F16]/40 to-transparent pointer-events-none" />

        {/* Bottom Vignette Shadow for Button Contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#140F16] via-[#140F16]/85 to-transparent pointer-events-none" />

        {/* Inner Radial Inset Shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 90px 25px rgba(15, 10, 18, 0.7)',
          }}
        />
      </div>

      {/* Romantic Ambient Aura Glows */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[85px] bg-[#E8C48A]/20 pointer-events-none z-1" />
      <div className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] rounded-full blur-[90px] bg-[#CE97A0]/25 pointer-events-none z-1" />

      {/* Ascending Floating Sky Lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {ascendingLanterns.map((l) => (
          <motion.div
            key={l.id}
            className="absolute"
            style={{
              left: `${l.left}%`,
              bottom: '-50px',
              transform: `scale(${l.scale})`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={
              prefersReduced
                ? { opacity: l.opacity }
                : {
                    y: -780,
                    x: [0, l.id % 2 === 0 ? 16 : -16, 0],
                    opacity: [0, l.opacity, l.opacity, 0.2],
                  }
            }
            transition={{
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className="w-8 h-11 rounded-[4px] relative flex items-center justify-center border border-[#FFD9A0]/50"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 60%, #FFFFFF 0%, #FFF3D6 30%, #FFD9A0 60%, #E8C48A 85%, #9E6B2A 100%)',
                  boxShadow:
                    '0 0 20px 5px rgba(255, 217, 160, 0.8), 0 0 35px 12px rgba(232, 196, 138, 0.4)',
                }}
              >
                <div className="w-[1px] h-full bg-[#FFF5E4]/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Tap Sparkle Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none z-40 text-lg select-none"
            style={{ left: p.x - 10, top: p.y - 10 }}
            initial={{ opacity: 1, scale: 0.6, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.4,
              y: -40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Top Badge */}
      <motion.div
        className="pt-4 text-center z-20"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#E8C48A]/40 bg-[#221A26]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-[#FFD9A0] animate-pulse" />
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#FFD9A0] font-semibold">
            {COPY.finaleBadge}
          </span>
        </div>
      </motion.div>

      {/* Center Spacer */}
      <div className="my-auto" />

      {/* Bottom Bye Button */}
      <motion.div
        className="pb-6 z-30 flex items-center justify-center"
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={handleBye}
          disabled={isClosing}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="px-10 py-3.5 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-bold text-base tracking-widest uppercase shadow-[0_6px_28px_rgba(232,196,138,0.55)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4DE] transition-colors"
        >
          Bye 👋
        </motion.button>
      </motion.div>

      {/* Fade Out Closing Transition */}
      <AnimatePresence>
        {isClosing && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-[#070408]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
