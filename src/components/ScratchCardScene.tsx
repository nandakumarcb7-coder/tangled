import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ScratchCardSceneProps {
  onComplete: () => void;
}

export const ScratchCardScene: React.FC<ScratchCardSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Card dimensions
  const CARD_WIDTH = 280;
  const CARD_HEIGHT = 160;

  // Initialize the scratch canvas with metallic foil
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CARD_WIDTH * dpr;
    canvas.height = CARD_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    // Metallic gold/silver foil gradient
    const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
    gradient.addColorStop(0, '#C9B896');
    gradient.addColorStop(0.2, '#E8D5A8');
    gradient.addColorStop(0.4, '#D4C09C');
    gradient.addColorStop(0.5, '#F0E6D0');
    gradient.addColorStop(0.6, '#C4AA78');
    gradient.addColorStop(0.8, '#E2D0AD');
    gradient.addColorStop(1, '#B8A07A');

    // Fill the foil background
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, CARD_WIDTH, CARD_HEIGHT, 16);
    ctx.fill();

    // Add subtle texture pattern
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * CARD_WIDTH;
      const y = Math.random() * CARD_HEIGHT;
      const size = Math.random() * 2 + 0.5;
      ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#8B7355';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw center scratch text
    ctx.fillStyle = '#9E8A6C';
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH HERE ✦', CARD_WIDTH / 2, CARD_HEIGHT / 2);

    // Draw decorative border
    ctx.strokeStyle = '#B8A07A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(6, 6, CARD_WIDTH - 12, CARD_HEIGHT - 12, 12);
    ctx.stroke();

    // Draw corner flourishes
    const flourishSize = 14;
    ctx.strokeStyle = '#A08C6C';
    ctx.lineWidth = 1.5;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(16, 26); ctx.quadraticCurveTo(16, 16, 26, 16);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(CARD_WIDTH - 16, 26); ctx.quadraticCurveTo(CARD_WIDTH - 16, 16, CARD_WIDTH - 26, 16);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(16, CARD_HEIGHT - 26); ctx.quadraticCurveTo(16, CARD_HEIGHT - 16, 26, CARD_HEIGHT - 16);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(CARD_WIDTH - 16, CARD_HEIGHT - 26); ctx.quadraticCurveTo(CARD_WIDTH - 16, CARD_HEIGHT - 16, CARD_WIDTH - 26, CARD_HEIGHT - 16);
    ctx.stroke();
  }, []);

  // Calculate scratch percentage
  const calculateScratchPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    return (transparent / total) * 100;
  }, []);

  // Scratch at position
  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    const radius = 28 * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Check progress periodically
    const percent = calculateScratchPercent();
    setScratchPercent(percent);

    if (percent > 35 && !isRevealed) {
      setIsRevealed(true);
      // Auto-clear remaining foil with fade
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 400);
    }
  }, [calculateScratchPercent, isRevealed]);

  // Mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  }, [scratch]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  }, [scratch]);

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  }, [scratch]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  }, [scratch]);

  const handleTouchEnd = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => onComplete(), 500);
  };

  // Sparkle positions for the decorative border
  const sparkles = [
    { x: 15, y: 10, delay: 0 },
    { x: 85, y: 8, delay: 0.3 },
    { x: 50, y: 92, delay: 0.6 },
    { x: 10, y: 55, delay: 0.9 },
    { x: 92, y: 50, delay: 1.2 },
    { x: 30, y: 5, delay: 0.4 },
    { x: 70, y: 95, delay: 0.7 },
  ];

  return (
    <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-10 px-6 select-none overflow-hidden bg-[#140F16]">
      {/* Night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140F16] via-[#1E1328] to-[#120B15] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-[12%] left-[8%] w-[300px] h-[300px] rounded-full blur-[80px] bg-[#E8C48A]/20 pointer-events-none" />
      <div className="absolute bottom-[18%] right-[12%] w-[280px] h-[280px] rounded-full blur-[75px] bg-[#5B3A52]/30 pointer-events-none" />

      {/* Floating background lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 14, delay: 0.3, dur: 9, scale: 0.4 },
          { left: 52, delay: 2.0, dur: 10, scale: 0.5 },
          { left: 82, delay: 1.2, dur: 8.5, scale: 0.35 },
        ].map((l, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${l.left}%`, bottom: '-30px', transform: `scale(${l.scale})` }}
            animate={prefersReduced ? {} : {
              y: [-20, -760],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{ duration: l.dur, delay: l.delay, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="w-6 h-9 rounded-[4px]"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 40%, #E8C48A 75%, #9E6B2A 100%)',
                boxShadow: '0 0 14px 4px rgba(232,196,138,0.6)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Top: Title */}
      <motion.div
        className="pt-6 text-center z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h2 className="font-serif-display text-xl sm:text-2xl text-[#F6EEE4] font-light italic tracking-wide leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {COPY.scratchTitle}
        </h2>
      </motion.div>

      {/* Center: Scratch Card */}
      <motion.div
        className="z-10 flex flex-col items-center my-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {/* Ornate Card Container with animated sparkle border */}
        <div
          ref={containerRef}
          className="relative rounded-2xl p-[3px] overflow-visible"
          style={{
            background: 'linear-gradient(135deg, #E8C48A, #FFD9A0, #C89D65, #E8C48A)',
            boxShadow: '0 8px 32px rgba(232,196,138,0.35), 0 0 60px rgba(232,196,138,0.15)',
          }}
        >
          {/* Animated sparkles on the border */}
          {!prefersReduced && sparkles.map((s, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white z-30 pointer-events-none"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                boxShadow: '0 0 6px 2px rgba(255,255,255,0.9)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 1.8,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Inner card body */}
          <div className="relative rounded-[13px] overflow-hidden bg-[#1A1220]" style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
            {/* Hidden code layer (underneath the foil) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-0 px-4">
              {/* Decorative sun crest above code */}
              <svg width="32" height="32" viewBox="0 0 100 100" className="mb-2 opacity-60 fill-[#E8C48A]">
                <circle cx="50" cy="50" r="16" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d="M 50 18 Q 55 30 50 36 Q 45 30 50 18 Z"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </svg>

              {/* The secret code (Mirrored horizontally on display) */}
              <motion.div
                className="inline-block"
                style={{ transform: 'scaleX(-1)' }}
              >
                <motion.p
                  className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.35em] text-[#FFD9A0]"
                  style={{
                    textShadow: '0 0 20px rgba(255,217,160,0.8), 0 0 40px rgba(232,196,138,0.4)',
                  }}
                  animate={isRevealed ? {
                    scale: [1, 1.08, 1],
                  } : {}}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {COPY.scratchCode}
                </motion.p>
              </motion.div>

              {/* Mirror icon */}
              <p className="mt-2 text-base">
                🪞
              </p>
            </div>

            {/* Scratch Canvas (the foil overlay) */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 z-10 rounded-[13px] cursor-pointer touch-none transition-opacity duration-500 ${
                isRevealed ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>

        {/* Revealed badge (Pre-reveal hint text removed as requested) */}
        <div className="mt-5 h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isRevealed && (
              <motion.div
                key="revealed"
                className="flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#E8C48A]/50 bg-[#221A26]/80"
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="text-sm">🔑</span>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#FFD9A0] font-semibold">
                  {COPY.scratchRevealed}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom: Next button (appears after reveal) */}
      <div className="pb-4 z-10 h-16 flex items-center justify-center">
        <AnimatePresence>
          {isRevealed && (
            <motion.button
              type="button"
              onClick={handleNext}
              disabled={isTransitioning}
              className="px-8 py-3 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-semibold text-sm tracking-wide shadow-[0_4px_22px_rgba(232,196,138,0.5)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF4DE] active:scale-95 transition-transform"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
            >
              {COPY.scratchNext}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Transition flash */}
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
