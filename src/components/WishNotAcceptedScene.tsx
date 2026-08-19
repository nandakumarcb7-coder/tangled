import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WishNotAcceptedSceneProps {
  onContinue?: () => void;
}

interface FallingLantern {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  swayAmp: number;
}

export const WishNotAcceptedScene: React.FC<WishNotAcceptedSceneProps> = ({ onContinue }) => {
  const prefersReduced = useReducedMotion();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSettled(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Cluster of lanterns that gently fall and dim out
  const fallingLanterns: FallingLantern[] = [
    { id: 1, left: 18, delay: 0.1, duration: 4.2, scale: 0.7, swayAmp: 10 },
    { id: 2, left: 36, delay: 0.6, duration: 4.8, scale: 0.85, swayAmp: -14 },
    { id: 3, left: 54, delay: 0.3, duration: 4.0, scale: 0.75, swayAmp: 12 },
    { id: 4, left: 72, delay: 0.8, duration: 4.5, scale: 0.8, swayAmp: -11 },
    { id: 5, left: 88, delay: 0.4, duration: 3.8, scale: 0.6, swayAmp: 8 },
    { id: 6, left: 26, delay: 1.2, duration: 4.4, scale: 0.65, swayAmp: -10 },
    { id: 7, left: 62, delay: 1.4, duration: 4.6, scale: 0.75, swayAmp: 12 },
  ];

  return (
    <div
      onClick={onContinue}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onContinue) {
          onContinue();
        }
      }}
      tabIndex={0}
      className="relative z-20 w-full h-full flex flex-col justify-between items-center py-12 px-6 select-none overflow-hidden bg-[#140F16] cursor-pointer focus:outline-none"
      role="button"
      aria-label="Your wish is not accepted. Touch or press enter for the secret."
    >
      {/* Dimmed Night Sky Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 rounded-full blur-[80px] bg-[#5B3A52]/30" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full blur-[90px] bg-[#221A26]/40" />
      </div>

      {/* Top Spacer */}
      <div className="h-6" />

      {/* Center Section: Title with Decaying Head-Shake Wobble */}
      <div className="flex flex-col items-center text-center max-w-xs z-10 -mt-6">
        <motion.h2
          className="font-serif-display text-2xl sm:text-[30px] text-[#F6EEE4] leading-relaxed font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -10 }}
          animate={
            prefersReduced
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: 0,
                  x: [0, -3, 3, -2, 2, -1, 1, 0], // decaying playful head-shake wobble
                }
          }
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {COPY.wishNotAcceptedHeading}
        </motion.h2>
      </div>

      {/* Inverted Falling Lanterns (Gently drift down from top and dim out) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingLanterns.map((l) => (
          <motion.div
            key={l.id}
            className="absolute"
            style={{
              left: `${l.left}%`,
              top: '-60px',
              transform: `scale(${l.scale})`,
            }}
            initial={{ y: 0, opacity: 0.85 }}
            animate={
              prefersReduced
                ? { opacity: [0.85, 0] }
                : {
                    y: 720,
                    x: [0, l.swayAmp, -l.swayAmp, 0],
                    opacity: [0.85, 0.7, 0.2, 0], // Dim out as they fall
                  }
            }
            transition={{
              duration: l.duration,
              delay: l.delay,
              ease: 'easeIn',
            }}
          >
            {/* Soft Warm Sky Lantern that fades */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-10 h-14 rounded-[5px] relative flex items-center justify-center border border-[#FFF6E6]/30"
                style={{
                  background: 'radial-gradient(ellipse at 50% 65%, #FFF4DE 0%, #FFD9A0 40%, #E8C48A 75%, #8E5A63 100%)',
                  boxShadow: '0 0 16px 4px rgba(232, 196, 138, 0.45)',
                }}
              >
                <div className="w-[1px] h-full bg-[#FFF6E6]/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Settled Resting State Hint */}
      <div className="pb-4 z-30">
        <AnimatePresence>
          {settled && (
            <motion.div
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#E8C48A]/20 bg-[#221A26]/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={
                prefersReduced
                  ? { opacity: 0.75 }
                  : {
                      opacity: [0.5, 0.9, 0.5],
                      y: 0,
                    }
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C48A] opacity-70 animate-ping" />
              <p className="font-serif-display text-xs tracking-[0.2em] italic text-[#F6EEE4]/85">
                {COPY.continuationNote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
