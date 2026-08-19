import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Question2PlaceProps {
  onNext: (answer: string) => void;
}

export const Question2Place: React.FC<Question2PlaceProps> = ({ onNext }) => {
  const prefersReduced = useReducedMotion();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = answer.trim().length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onNext(answer.trim());
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isValid) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-12 px-6 select-none overflow-hidden">
      {/* Background Soft Lantern Glows for visual continuity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-72 h-72 rounded-full blur-[80px] bg-[#E8C48A]/15" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full blur-[90px] bg-[#CE97A0]/15" />
        
        {/* Subtle rising distant lanterns in background */}
        <div className="absolute inset-0">
          {[
            { id: 1, left: 16, delay: 0.5, scale: 0.45 },
            { id: 2, left: 48, delay: 1.8, scale: 0.55 },
            { id: 3, left: 82, delay: 1.0, scale: 0.4 },
          ].map((l) => (
            <motion.div
              key={l.id}
              className="absolute"
              style={{ left: `${l.left}%`, bottom: '-40px', transform: `scale(${l.scale})` }}
              animate={
                prefersReduced
                  ? {}
                  : {
                      y: [-30, -720],
                      x: [0, l.id % 2 === 0 ? 10 : -10, 0],
                      opacity: [0, 0.45, 0.45, 0],
                    }
              }
              transition={{
                duration: 9.0,
                delay: l.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div
                className="w-7 h-10 rounded-[4px] relative"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 40%, #E8C48A 75%, #B8894F 100%)',
                  boxShadow: '0 0 16px 4px rgba(232, 196, 138, 0.5)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Section / Chapter Pill */}
      <motion.div
        className="pt-2 text-center z-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#E8C48A]/90 font-medium">
          Round Two
        </p>
      </motion.div>

      {/* Center Question & Minimal Underline Text Field */}
      <motion.div
        className="w-full max-w-sm flex flex-col items-center text-center -mt-6 z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Question Heading in Display Serif (Fraunces), Ivory, Centered */}
        <label htmlFor="calicut-place-input" className="block cursor-pointer">
          <h2 className="font-serif-display text-2xl sm:text-[28px] text-[#F6EEE4] leading-relaxed font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-8">
            {COPY.question2Heading}
          </h2>
        </label>

        {/* Minimal Underline Text Field (no box, no fill, single underline) */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <textarea
              id="calicut-place-input"
              rows={2}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={COPY.question2Placeholder}
              aria-label={COPY.question2Heading}
              className="w-full bg-transparent border-0 border-b border-[#E8C48A]/40 focus:border-[#FFD9A0] focus:outline-none focus:ring-0 text-center font-serif-display text-lg sm:text-xl text-[#F6EEE4] placeholder:text-[#CFC3C8]/40 placeholder:font-sans placeholder:text-sm placeholder:italic resize-none transition-colors pb-2"
            />
          </div>

          {/* Pill-shaped "Next" button in Gold accent */}
          <motion.button
            type="submit"
            disabled={!isValid || isSubmitting}
            aria-disabled={!isValid || isSubmitting}
            initial={false}
            animate={{
              opacity: isValid ? 1 : 0.35,
              scale: isValid ? 1 : 0.96,
            }}
            whileHover={isValid ? { scale: 1.05 } : {}}
            whileTap={isValid ? { scale: 0.95 } : {}}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 px-8 py-2.5 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-medium text-xs tracking-[0.2em] uppercase shadow-[0_4px_20px_rgba(232,196,138,0.35)] transition-all ${
              isValid ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
          >
            Next
          </motion.button>
        </form>
      </motion.div>

      {/* Bottom Spacer */}
      <div className="h-6" />

      {/* Radiant Cross-fade Bloom Flash on Submit */}
      <AnimatePresence>
        {isSubmitting && (
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
