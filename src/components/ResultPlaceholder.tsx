import React from 'react';
import { motion } from 'motion/react';
import { COPY } from '../lib/sceneConfig';

interface ResultPlaceholderProps {
  customNote?: string;
}

export const ResultPlaceholder: React.FC<ResultPlaceholderProps> = ({ customNote }) => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-12 px-6 select-none text-center space-y-4">
      {customNote && (
        <motion.div
          className="space-y-1.5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#E8C48A] font-medium">
            Destination Locked
          </p>
          <p className="font-serif-display text-2xl text-[#FFF6E6] font-normal italic">
            &ldquo;{customNote}&rdquo;
          </p>
        </motion.div>
      )}

      <motion.p
        className="font-serif-display text-2xl sm:text-3xl text-[#F6EEE4] font-light italic tracking-widest opacity-85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4,
        }}
      >
        {COPY.continuationNote}
      </motion.p>
    </div>
  );
};
