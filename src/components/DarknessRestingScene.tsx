import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface DarknessRestingSceneProps {
  onContinue?: () => void;
}

export const DarknessRestingScene: React.FC<DarknessRestingSceneProps> = ({ onContinue }) => {
  const prefersReduced = useReducedMotion();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative z-30 w-full h-full bg-[#070408] select-none flex flex-col justify-end items-center pb-12 px-6 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      aria-label="Deep stillness. Touch anywhere to continue."
    >
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#E8C48A]/15 bg-[#140F16]/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={
              prefersReduced
                ? { opacity: 0.6 }
                : {
                    opacity: [0.35, 0.75, 0.35],
                    y: 0,
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C48A] opacity-60 animate-ping" />
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#CFC3C8]/75 font-medium">
              {COPY.darknessHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
