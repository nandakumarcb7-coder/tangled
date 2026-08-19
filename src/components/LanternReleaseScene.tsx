import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LanternReleaseSceneProps {
  onComplete: () => void;
}

interface LanternItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  swayAmp: number;
  swayPeriod: number;
  tint: 'gold' | 'rose' | 'lavender';
  opacity: number;
}

export const LanternReleaseScene: React.FC<LanternReleaseSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }

    // Auto-advance after establishing 3.2s
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 450);
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  const handleSkip = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  // 20 warm-glowing sky lanterns echoing the landing lantern motif
  const lanterns: LanternItem[] = [
    { id: 1, left: 14, delay: 0.1, duration: 4.8, scale: 0.65, swayAmp: 14, swayPeriod: 3.2, tint: 'gold', opacity: 0.85 },
    { id: 2, left: 32, delay: 0.7, duration: 5.2, scale: 0.85, swayAmp: -18, swayPeriod: 3.8, tint: 'gold', opacity: 0.95 },
    { id: 3, left: 52, delay: 0.3, duration: 4.6, scale: 0.75, swayAmp: 12, swayPeriod: 3.0, tint: 'rose', opacity: 0.9 },
    { id: 4, left: 74, delay: 0.9, duration: 5.0, scale: 0.8, swayAmp: -15, swayPeriod: 3.5, tint: 'gold', opacity: 0.9 },
    { id: 5, left: 88, delay: 0.4, duration: 4.4, scale: 0.55, swayAmp: 10, swayPeriod: 2.8, tint: 'lavender', opacity: 0.8 },
    { id: 6, left: 22, delay: 1.3, duration: 5.4, scale: 0.6, swayAmp: -12, swayPeriod: 3.4, tint: 'gold', opacity: 0.85 },
    { id: 7, left: 44, delay: 1.1, duration: 4.9, scale: 0.9, swayAmp: 16, swayPeriod: 3.6, tint: 'gold', opacity: 1.0 },
    { id: 8, left: 64, delay: 1.6, duration: 5.1, scale: 0.7, swayAmp: -14, swayPeriod: 3.1, tint: 'rose', opacity: 0.85 },
    { id: 9, left: 82, delay: 1.8, duration: 4.7, scale: 0.6, swayAmp: 12, swayPeriod: 2.9, tint: 'gold', opacity: 0.8 },
    { id: 10, left: 8, delay: 2.0, duration: 5.3, scale: 0.5, swayAmp: -10, swayPeriod: 3.3, tint: 'lavender', opacity: 0.75 },
    { id: 11, left: 28, delay: 2.3, duration: 4.8, scale: 0.75, swayAmp: 15, swayPeriod: 3.5, tint: 'gold', opacity: 0.9 },
    { id: 12, left: 60, delay: 2.5, duration: 5.2, scale: 0.85, swayAmp: -16, swayPeriod: 3.7, tint: 'gold', opacity: 0.95 },
    { id: 13, left: 78, delay: 2.2, duration: 4.9, scale: 0.65, swayAmp: 11, swayPeriod: 3.0, tint: 'rose', opacity: 0.85 },
    { id: 14, left: 92, delay: 2.7, duration: 4.5, scale: 0.5, swayAmp: -8, swayPeriod: 2.7, tint: 'gold', opacity: 0.7 },
    { id: 15, left: 18, delay: 2.9, duration: 5.0, scale: 0.7, swayAmp: 13, swayPeriod: 3.2, tint: 'gold', opacity: 0.85 },
    { id: 16, left: 38, delay: 3.1, duration: 4.7, scale: 0.8, swayAmp: -15, swayPeriod: 3.4, tint: 'lavender', opacity: 0.9 },
    { id: 17, left: 50, delay: 3.3, duration: 5.1, scale: 0.95, swayAmp: 18, swayPeriod: 3.9, tint: 'gold', opacity: 1.0 },
    { id: 18, left: 70, delay: 3.0, duration: 4.8, scale: 0.65, swayAmp: -12, swayPeriod: 3.1, tint: 'gold', opacity: 0.85 },
  ];

  return (
    <div
      className="relative z-20 w-full h-full flex flex-col justify-between items-center overflow-hidden select-none cursor-pointer"
      onClick={handleSkip}
      role="region"
      aria-label="Floating sky lanterns release. Tap anywhere to continue."
    >
      {/* Sky Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full blur-[80px] bg-[#E8C48A]/20" />
        <div className="absolute bottom-[25%] right-[10%] w-80 h-80 rounded-full blur-[90px] bg-[#CE97A0]/20" />
        <div className="absolute top-[45%] right-[25%] w-64 h-64 rounded-full blur-[70px] bg-[#A897C4]/15" />
      </div>

      {/* Top Subtle Caption */}
      <motion.div
        className="pt-10 px-6 text-center z-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.2 }}
      >
        <p className="font-serif-display text-lg sm:text-xl text-[#F6EEE4] italic font-light tracking-wide opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          &ldquo;and at last the sky awakens&hellip;&rdquo;
        </p>
      </motion.div>

      {/* Rising Floating Sky Lanterns Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {lanterns.map((l) => {
          const isRose = l.tint === 'rose';
          const isLavender = l.tint === 'lavender';

          const gradStart = isRose ? '#FFF0F3' : isLavender ? '#F5F0FF' : '#FFFFFF';
          const gradMid = isRose ? '#FFA8B8' : isLavender ? '#D3C2F0' : '#FFD9A0';
          const gradOuter = isRose ? '#CE97A0' : isLavender ? '#A897C4' : '#E8C48A';
          const gradEdge = isRose ? '#8E5A63' : isLavender ? '#6B5A8E' : '#9E6B2A';
          const glowRgba = isRose
            ? 'rgba(206, 151, 160, 0.75)'
            : isLavender
            ? 'rgba(168, 151, 196, 0.75)'
            : 'rgba(232, 196, 138, 0.85)';

          return (
            <motion.div
              key={l.id}
              className="absolute"
              style={{
                left: `${l.left}%`,
                bottom: '-60px',
                transform: `scale(${l.scale})`,
                opacity: l.opacity,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={
                prefersReduced
                  ? { opacity: [0, l.opacity, 0] }
                  : {
                      y: -860,
                      x: [0, l.swayAmp, 0, -l.swayAmp, 0],
                      opacity: [0, l.opacity, l.opacity, 0.1],
                    }
              }
              transition={{
                duration: l.duration,
                delay: l.delay,
                ease: 'easeOut',
              }}
            >
              {/* Warm Paper Sky Lantern Silhouette */}
              <div className="relative flex flex-col items-center">
                {/* Luminous Core Glow */}
                <div
                  className="absolute -inset-2.5 rounded-full blur-[14px]"
                  style={{ backgroundColor: glowRgba }}
                />

                {/* Lantern Body */}
                <div
                  className="w-10 h-14 rounded-[5px] relative flex items-center justify-center border border-[#FFF6E6]/40"
                  style={{
                    background: `radial-gradient(ellipse at 50% 65%, ${gradStart} 0%, ${gradMid} 40%, ${gradOuter} 75%, ${gradEdge} 100%)`,
                    boxShadow: `0 0 20px 5px ${glowRgba}`,
                  }}
                >
                  {/* Subtle Inner Vertical Rib Lines */}
                  <div className="w-[1px] h-full bg-[#FFF6E6]/25" />
                </div>

                {/* Gentle Base Light Flare */}
                <div className="w-4 h-1 rounded-full bg-[#FFF4DE] blur-[0.5px] mt-0.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skip Button */}
      <div className="pb-8 px-6 w-full flex items-center justify-center z-30">
        <button
          type="button"
          onClick={handleSkip}
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#CFC3C8]/80 hover:text-[#FFF5E4] px-4 py-2 rounded-full border border-[#E8C48A]/20 bg-[#221A26]/50 backdrop-blur-sm cursor-pointer transition-all hover:border-[#E8C48A]/50 active:scale-95"
        >
          Continue &rarr;
        </button>
      </div>

      {/* Radiant Cross-fade Bloom Flash Overlay */}
      <AnimatePresence>
        {isExiting && (
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
