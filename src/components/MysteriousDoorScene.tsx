import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MysteriousDoorSceneProps {
  onComplete: () => void;
}

export const MysteriousDoorScene: React.FC<MysteriousDoorSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  // Multi-stage unlock states for curiosity & realism
  const [isUnlocking, setIsUnlocking] = useState(false);   // Step 1: Lock flare & seam crack
  const [isDoorOpening, setIsDoorOpening] = useState(false); // Step 2: 3D Door swing open
  const [isCameraPush, setIsCameraPush] = useState(false);   // Step 3: Zoom into golden light portal

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleDoorTap = () => {
    if (isUnlocking || isDoorOpening || showInput) return;
    setShowInput(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isUnlocking || isDoorOpening) return;

    const trimmed = code.trim().toUpperCase();
    if (trimmed === COPY.scratchCode) {
      // Correct passcode! Begin dramatic multi-stage curiosity reveal sequence
      setShowInput(false);
      setIsError(false);

      // Phase 1: Heavy latch rumble & keyhole ignition flare (0ms)
      setIsUnlocking(true);

      // Phase 2: 3D Doors crack & swing wide open (700ms)
      setTimeout(() => setIsDoorOpening(true), 700);

      // Phase 3: Camera zooms through open doorway into golden portal (2200ms)
      setTimeout(() => setIsCameraPush(true), 2200);

      // Phase 4: Transition smoothly to next scene (3400ms)
      setTimeout(() => onComplete(), 3400);
    } else {
      // Wrong code — shake animation
      setIsError(true);
      setCode('');
      setTimeout(() => setIsError(false), 1500);
    }
  };

  return (
    <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-10 px-6 select-none overflow-hidden bg-[#0A060E]">
      {/* Deep Night Sanctuary Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A060E] via-[#160B1E] to-[#08040A] pointer-events-none" />

      {/* Atmospheric Glows */}
      <div className="absolute top-[8%] left-[12%] w-[300px] h-[300px] rounded-full blur-[90px] bg-[#5B3A52]/30 pointer-events-none" />
      <div className="absolute bottom-[12%] right-[10%] w-[280px] h-[280px] rounded-full blur-[80px] bg-[#E8C48A]/20 pointer-events-none" />

      {/* Floating Dust Motes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {!prefersReduced && Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFD9A0]"
            style={{
              left: `${(i * 29 + 13) % 94}%`,
              top: `${(i * 37 + 11) % 82}%`,
              width: `${1.5 + (i % 3) * 0.5}px`,
              height: `${1.5 + (i % 3) * 0.5}px`,
              boxShadow: '0 0 6px 1.5px rgba(255,217,160,0.8)',
            }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [0, -35, -70],
            }}
            transition={{
              duration: 4.5 + (i % 3) * 1.5,
              delay: (i * 0.4) % 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Top Title */}
      <motion.div
        className="pt-6 text-center z-20"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: isCameraPush ? 0 : 1, y: isCameraPush ? -20 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-serif-display text-lg sm:text-xl text-[#F6EEE4] font-light italic tracking-wide leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {COPY.doorTitle}
        </h2>
      </motion.div>

      {/* Center Section: 3D Realistic Mysterious Door */}
      <motion.div
        className="relative z-20 flex flex-col items-center my-auto cursor-pointer"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 1,
          scale: isCameraPush ? 2.4 : isUnlocking && !isDoorOpening ? [1, 1.03, 0.98, 1.02, 1] : 1,
        }}
        transition={{
          duration: isCameraPush ? 1.4 : isUnlocking ? 0.6 : 1.0,
          ease: isCameraPush ? [0.6, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
        }}
        onClick={handleDoorTap}
        role="button"
        tabIndex={0}
        aria-label="Tap the mysterious door to unlock"
      >
        {/* Door Frame Container with 3D Perspective */}
        <div className="relative w-[260px] h-[380px]" style={{ perspective: '1200px' }}>
          
          {/* Background Golden Realm & Floating Lanterns behind open door */}
          <div className="absolute inset-[30px_32px_4px_32px] rounded-t-[100px] overflow-hidden bg-[#0F0814] z-0 flex items-center justify-center">
            {/* Radiant Golden Sunburst Portal */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 30%, #E8C48A 65%, #2B1530 100%)',
              }}
              animate={{
                opacity: isDoorOpening ? 1 : 0.05,
                scale: isDoorOpening ? [1, 1.15, 1] : 0.9,
              }}
              transition={{ duration: 2.0, ease: 'easeOut' }}
            />

            {/* Rising Sky Lanterns inside open portal */}
            {isDoorOpening && !prefersReduced && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                  { left: '20%', delay: 0.2, scale: 0.6 },
                  { left: '50%', delay: 0.5, scale: 0.8 },
                  { left: '75%', delay: 0.1, scale: 0.5 },
                ].map((l, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute bottom-0 w-6 h-9 rounded-[4px]"
                    style={{
                      left: l.left,
                      background: 'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 40%, #E8C48A 75%, #9E6B2A 100%)',
                      boxShadow: '0 0 16px 4px rgba(232,196,138,0.8)',
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -260, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.5, delay: l.delay, ease: 'easeOut' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stone Archway Surround Overlay */}
          <svg
            width="260"
            height="380"
            viewBox="0 0 260 380"
            fill="none"
            className="absolute inset-0 z-30 pointer-events-none drop-shadow-[0_12px_36px_rgba(0,0,0,0.9)]"
          >
            <defs>
              <linearGradient id="stoneArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3E2C40" />
                <stop offset="50%" stopColor="#2A1C2C" />
                <stop offset="100%" stopColor="#18101C" />
              </linearGradient>

              <linearGradient id="goldArchTrim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C48A" />
                <stop offset="50%" stopColor="#FFD9A0" />
                <stop offset="100%" stopColor="#C89D65" />
              </linearGradient>
            </defs>

            {/* Outer Stone Frame */}
            <path
              d="M 6 380 L 6 70 Q 6 6 60 6 L 200 6 Q 254 6 254 70 L 254 380 L 228 380 L 228 90 Q 228 38 178 38 L 82 38 Q 32 38 32 90 L 32 380 Z"
              fill="url(#stoneArchGrad)"
              stroke="#5B3A52"
              strokeWidth="1.5"
            />

            {/* Archway Gold Trim Contour */}
            <path
              d="M 26 380 L 26 85 Q 26 28 80 28 L 180 28 Q 234 28 234 85 L 234 380"
              fill="none"
              stroke="url(#goldArchTrim)"
              strokeWidth="2"
              strokeOpacity="0.75"
            />

            {/* Decorative Top Runes */}
            <text x="75" y="21" fill="#FFD9A0" fontSize="8" fontFamily="serif" opacity="0.6">✦ ◇ ✦ ◇ ✦ ◇ ✦</text>
          </svg>

          {/* ===== 3D REALISTIC DOUBLE DOORS ===== */}
          <div className="absolute inset-[38px_32px_0px_32px] z-20 flex" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* LEFT DOOR LEAF */}
            <motion.div
              className="w-1/2 h-full relative"
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: isDoorOpening ? -112 : 0,
              }}
              transition={{
                duration: 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <svg width="98" height="342" viewBox="0 0 98 342" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="leftDoorWood" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A3424" />
                    <stop offset="40%" stopColor="#382516" />
                    <stop offset="100%" stopColor="#25170C" />
                  </linearGradient>
                  <linearGradient id="goldDetail" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8C48A" />
                    <stop offset="100%" stopColor="#C89D65" />
                  </linearGradient>
                </defs>

                {/* Left Door Base */}
                <rect x="0" y="0" width="98" height="342" fill="url(#leftDoorWood)" />

                {/* Wood Grain Lines */}
                <line x1="20" y1="0" x2="20" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.5" />
                <line x1="48" y1="0" x2="48" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.4" />
                <line x1="76" y1="0" x2="76" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.5" />

                {/* Carved Panel Insets */}
                <rect x="10" y="16" width="78" height="135" rx="5" fill="none" stroke="url(#goldDetail)" strokeWidth="1.2" strokeOpacity="0.4" />
                <rect x="10" y="175" width="78" height="150" rx="5" fill="none" stroke="url(#goldDetail)" strokeWidth="1.2" strokeOpacity="0.4" />

                {/* Corona Sun Crest Emblem */}
                <g transform="translate(49, 83)" opacity="0.65">
                  <circle r="12" fill="none" stroke="#E8C48A" strokeWidth="1.2" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0" y1="-16" x2="0" y2="-21"
                      stroke="#E8C48A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      transform={`rotate(${i * 45})`}
                    />
                  ))}
                </g>

                {/* Left Metal Hinges */}
                <rect x="1" y="40" width="7" height="18" rx="2" fill="#6B4D29" stroke="#25170C" strokeWidth="1" />
                <rect x="1" y="270" width="7" height="18" rx="2" fill="#6B4D29" stroke="#25170C" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* RIGHT DOOR LEAF */}
            <motion.div
              className="w-1/2 h-full relative"
              style={{
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: isDoorOpening ? 112 : 0,
              }}
              transition={{
                duration: 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <svg width="98" height="342" viewBox="0 0 98 342" fill="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="rightDoorWood" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A3424" />
                    <stop offset="40%" stopColor="#382516" />
                    <stop offset="100%" stopColor="#25170C" />
                  </linearGradient>
                </defs>

                {/* Right Door Base */}
                <rect x="0" y="0" width="98" height="342" fill="url(#rightDoorWood)" />

                {/* Wood Grain Lines */}
                <line x1="22" y1="0" x2="22" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.5" />
                <line x1="50" y1="0" x2="50" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.4" />
                <line x1="78" y1="0" x2="78" y2="342" stroke="#1A0F07" strokeWidth="0.8" opacity="0.5" />

                {/* Carved Panel Insets */}
                <rect x="10" y="16" width="78" height="135" rx="5" fill="none" stroke="url(#goldDetail)" strokeWidth="1.2" strokeOpacity="0.4" />
                <rect x="10" y="175" width="78" height="150" rx="5" fill="none" stroke="url(#goldDetail)" strokeWidth="1.2" strokeOpacity="0.4" />

                {/* Corona Sun Crest Emblem */}
                <g transform="translate(49, 83)" opacity="0.65">
                  <circle r="12" fill="none" stroke="#E8C48A" strokeWidth="1.2" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0" y1="-16" x2="0" y2="-21"
                      stroke="#E8C48A"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      transform={`rotate(${i * 45})`}
                    />
                  ))}
                </g>

                {/* Right Metal Hinges */}
                <rect x="90" y="40" width="7" height="18" rx="2" fill="#6B4D29" stroke="#25170C" strokeWidth="1" />
                <rect x="90" y="270" width="7" height="18" rx="2" fill="#6B4D29" stroke="#25170C" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* SEAM LIGHT BEAM CRACK (Ignites during curiosity phase before doors swing) */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, #FFE8B8, #FFD9A0, #FFE8B8)',
                boxShadow: '0 0 16px 6px rgba(255,217,160,0.9)',
              }}
              animate={{
                width: isDoorOpening ? [0, 4, 16, 0] : isUnlocking ? [0, 4, 2] : 0,
                opacity: isDoorOpening ? [0, 1, 0] : isUnlocking ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          {/* KEYHOLE MEDALLION AT SEAM CENTER */}
          {!isDoorOpening && (
            <motion.div
              className="absolute z-30 pointer-events-none"
              style={{
                left: '50%',
                top: '60%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={isUnlocking ? {
                scale: [1, 1.4, 1.1],
                filter: 'drop-shadow(0 0 24px rgba(255,217,160,1))',
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#E8C48A" strokeWidth="2" />
                <circle cx="20" cy="20" r="14" fill="#25170C" stroke="#C89D65" strokeWidth="1" />
                <circle cx="20" cy="16" r="4" fill="#FFD9A0" />
                <path d="M 18 18 L 20 30 L 22 18 Z" fill="#FFD9A0" />
              </svg>
            </motion.div>
          )}

          {/* Pulsing Aura around Keyhole */}
          {!isDoorOpening && !showInput && (
            <motion.div
              className="absolute z-20 pointer-events-none rounded-full"
              style={{
                left: '50%',
                top: '60%',
                transform: 'translate(-50%, -50%)',
                width: 50,
                height: 50,
              }}
              animate={prefersReduced ? {} : {
                boxShadow: [
                  '0 0 20px 6px rgba(232,196,138,0.3)',
                  '0 0 40px 14px rgba(232,196,138,0.7)',
                  '0 0 20px 6px rgba(232,196,138,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.div>

      {/* Bottom Hint */}
      <div className="pb-4 z-20 h-12 flex items-center justify-center">
        {!showInput && !isUnlocking && !isDoorOpening && (
          <motion.div
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#E8C48A]/20 bg-[#221A26]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C48A] opacity-70 animate-ping" />
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#CFC3C8]/80 font-medium">
              {COPY.doorTapHint}
            </p>
          </motion.div>
        )}
      </div>

      {/* ===== CODE INPUT MODAL ===== */}
      <AnimatePresence>
        {showInput && !isUnlocking && !isDoorOpening && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#070408]/75 backdrop-blur-sm"
              onClick={() => { setShowInput(false); setCode(''); setIsError(false); }}
            />

            {/* Modal card */}
            <motion.div
              className="relative w-full max-w-xs z-50 p-6 rounded-[28px] border border-[#E8C48A]/30 bg-[#1A1220]/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.85, y: 30 }}
              animate={isError ? {
                scale: 1,
                y: 0,
                x: [0, -8, 8, -6, 6, -3, 3, 0],
              } : {
                scale: 1,
                y: 0,
              }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={isError ? {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              } : {
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#E8C48A]/10 blur-[30px] pointer-events-none" />

              {/* Lock icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#E8C48A]/50 flex items-center justify-center bg-[#221A26]/80">
                  <span className="text-xl">🔐</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                {/* Code input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setIsError(false); }}
                  placeholder={COPY.doorInputPlaceholder}
                  maxLength={12}
                  autoComplete="off"
                  className={`w-full py-3 px-4 rounded-xl text-center font-mono text-lg tracking-[0.3em] uppercase bg-[#0E0A12] border ${
                    isError ? 'border-red-400/60 text-red-300' : 'border-[#E8C48A]/40 text-[#FFD9A0]'
                  } placeholder:text-[#CFC3C8]/30 placeholder:font-sans placeholder:text-xs placeholder:tracking-wider placeholder:normal-case focus:outline-none focus:border-[#FFD9A0] transition-colors`}
                />

                {/* Error message */}
                <AnimatePresence>
                  {isError && (
                    <motion.p
                      className="mt-2 text-xs text-red-400/90 font-sans tracking-wider text-center"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {COPY.doorErrorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={code.trim().length === 0}
                  whileHover={code.trim().length > 0 ? { scale: 1.04 } : {}}
                  whileTap={code.trim().length > 0 ? { scale: 0.96 } : {}}
                  className={`mt-5 w-full py-3 rounded-full font-sans font-semibold text-sm tracking-[0.15em] uppercase transition-all ${
                    code.trim().length > 0
                      ? 'bg-[#E8C48A] text-[#140F16] shadow-[0_4px_20px_rgba(232,196,138,0.4)] cursor-pointer'
                      : 'bg-[#221A26] text-[#CFC3C8]/40 cursor-not-allowed'
                  }`}
                >
                  {COPY.doorOpenButton}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FINAL GOLDEN LIGHT FLOOD OVERLAY ===== */}
      <AnimatePresence>
        {isCameraPush && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-radial from-[#FFF4DE] via-[#E8C48A]/90 to-[#140F16]"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0, 1, 1] }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
