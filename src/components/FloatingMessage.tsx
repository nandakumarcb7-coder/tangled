import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingMessageProps {
  x: number;
  y: number;
  message: string;
  glowColor: string;
  scaleMultiplier?: number;
  onDismiss: () => void;
}

export const FloatingMessage: React.FC<FloatingMessageProps> = ({
  x,
  y,
  message,
  glowColor,
  scaleMultiplier = 1.0,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  // Clamp positioning within screen margins so it never clips off-screen
  const clampedX = Math.max(90, Math.min(x, 280));
  const clampedY = Math.max(85, y - 55);

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        onClick={onDismiss}
        className="absolute z-40 cursor-pointer select-none"
        style={{
          left: `${clampedX}px`,
          top: `${clampedY}px`,
          transform: 'translate(-50%, -50%)',
        }}
        initial={{
          opacity: 0,
          scale: 0.85 * scaleMultiplier,
          y: 12,
        }}
        animate={{
          opacity: 1,
          scale: [0.85 * scaleMultiplier, 1.04 * scaleMultiplier, 1.0 * scaleMultiplier],
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92 * scaleMultiplier,
          y: -16,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        transition={{
          duration: 0.42,
          ease: [0.34, 1.56, 0.64, 1], // ease-tap overshoot
        }}
      >
        <div
          className="px-4 py-2.5 rounded-full backdrop-blur-md bg-[#221A26]/90 border shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-105"
          style={{
            borderColor: glowColor || 'rgba(232, 196, 138, 0.4)',
            boxShadow: `0 4px 20px -2px ${glowColor || 'rgba(0,0,0,0.5)'}, 0 0 14px 2px ${glowColor || 'rgba(232,196,138,0.2)'}`,
          }}
        >
          <span className="font-serif-display text-[#F6EEE4] text-sm tracking-wide font-normal whitespace-nowrap">
            {message}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
