import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COPY } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WishCandleSceneProps {
  onComplete: () => void;
}

export const WishCandleScene: React.FC<WishCandleSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [showCandle, setShowCandle] = useState(false);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [isDarkening, setIsDarkening] = useState(false);

  const isExtinguishedRef = useRef<boolean>(false);
  const lastTapTimeRef = useRef<number>(0);

  // Initial delay before candle appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCandle(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Extinguish sequence
  const handleExtinguish = () => {
    if (isExtinguishedRef.current) return;
    isExtinguishedRef.current = true;
    setIsExtinguished(true);

    // Step 1: Smoke rises (~280ms)
    setTimeout(() => {
      setShowSmoke(true);
    }, 280);

    // Step 2: Darkening wash (~1.6s)
    setTimeout(() => {
      setIsDarkening(true);
    }, 1600);

    // Step 3: Complete transition to next stage (~2.6s)
    setTimeout(() => {
      onComplete();
    }, 2600);
  };

  // Handle right-click (contextmenu) or double-tap/click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!showCandle || isExtinguished || isExtinguishedRef.current) return;
    handleExtinguish();
  };

  const handleDoubleClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!showCandle || isExtinguished || isExtinguishedRef.current) return;
    handleExtinguish();
  };

  const handleTouch = (e?: React.TouchEvent | React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!showCandle || isExtinguished || isExtinguishedRef.current) return;

    const now = performance.now();
    const timeSinceLastTap = now - lastTapTimeRef.current;

    if (timeSinceLastTap > 0 && timeSinceLastTap < 450) {
      // Double tap / double touch detected!
      handleExtinguish();
    }

    lastTapTimeRef.current = now;
  };

  return (
    <div
      className="relative z-20 w-full h-full flex flex-col justify-between items-center py-10 px-6 select-none overflow-hidden bg-[#0A060C] cursor-pointer"
      onClick={handleTouch}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      role="region"
      aria-label="Make a wish candle scene. Right click or double tap to extinguish."
    >
      {/* ===== MYSTERIOUS ROOM AMBIENCE ===== */}
      {/* Room Wall Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080509] via-[#140D17] to-[#0A060C] pointer-events-none" />

      {/* Stone Arch Chamber Background Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <svg viewBox="0 0 390 844" preserveAspectRatio="none" className="w-full h-full fill-none">
          {/* Ancient Stone Arch Outline */}
          <path
            d="M 40 844 L 40 320 Q 40 180 195 180 Q 350 180 350 320 L 350 844"
            stroke="#2E1C2B"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Subtle Chamber Pillars */}
          <line x1="20" y1="0" x2="20" y2="844" stroke="#1F131D" strokeWidth="2" />
          <line x1="370" y1="0" x2="370" y2="844" stroke="#1F131D" strokeWidth="2" />
        </svg>
      </div>

      {/* Warm Volumetric Room Glow from Candle (STAYS LIT CONTINUOUSLY!) */}
      {!isExtinguished && (
        <div
          className="absolute top-[30%] left-[10%] w-[320px] h-[340px] rounded-full blur-[90px] pointer-events-none transition-opacity duration-700"
          style={{ backgroundColor: 'rgba(232, 196, 138, 0.28)' }}
        />
      )}

      {/* Floating Mysterious Dust Motes illuminated by flame */}
      {!isExtinguished && !prefersReduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#FFF3D6]"
              style={{
                left: `${15 + ((i * 23 + 11) % 70)}%`,
                top: `${25 + ((i * 37 + 19) % 50)}%`,
                width: `${1.2 + (i % 3) * 0.6}px`,
                height: `${1.2 + (i % 3) * 0.6}px`,
                boxShadow: '0 0 6px 1px rgba(255, 243, 214, 0.7)',
              }}
              animate={{
                y: [0, -25, -50],
                x: [0, (i % 2 === 0 ? 8 : -8), 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 4 + (i % 4) * 1.5,
                delay: (i * 0.4) % 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Top Section: Wish Heading Text in Elegant Cursive Font */}
      <div className="pt-10 px-4 text-center z-20 max-w-xs">
        <motion.h1
          className="font-cursive text-3xl sm:text-4xl text-[#F6EEE4] leading-snug font-normal tracking-wide drop-shadow-[0_2px_14px_rgba(232,196,138,0.45)] capitalize"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.98, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {COPY.wishInitialLine}
        </motion.h1>
      </div>

      {/* Center Section: Ornate Antique Candelabra & Candle */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-2 z-20">
        <AnimatePresence>
          {showCandle && (
            <motion.div
              className="relative flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Flame Radial Aura Bloom */}
              {!isExtinguished && (
                <div
                  className="absolute -top-12 w-48 h-48 rounded-full blur-[40px] pointer-events-none opacity-80"
                  style={{ backgroundColor: 'rgba(255, 217, 160, 0.45)' }}
                />
              )}

              {/* Hand-Crafted Ornate Candle & Antique Brass Candelabra Stand */}
              <div className="relative flex flex-col items-center">
                <svg
                  width="160"
                  height="260"
                  viewBox="0 0 160 260"
                  fill="none"
                  className="overflow-visible drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
                >
                  <defs>
                    {/* Wax Body Volume Gradient */}
                    <linearGradient id="waxBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#DDD2C3" />
                      <stop offset="25%" stopColor="#FFF9EE" />
                      <stop offset="70%" stopColor="#E2D4C1" />
                      <stop offset="100%" stopColor="#BBAF9E" />
                    </linearGradient>

                    {/* Antique Brass Metallic Stand Gradient */}
                    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5E4323" />
                      <stop offset="30%" stopColor="#A8824B" />
                      <stop offset="60%" stopColor="#E8C48A" />
                      <stop offset="85%" stopColor="#8C6332" />
                      <stop offset="100%" stopColor="#3E2A14" />
                    </linearGradient>

                    {/* Outer Flame Radial Gradient */}
                    <radialGradient id="outerFlameGrad" cx="50%" cy="65%" r="65%">
                      <stop offset="0%" stopColor="#FFF7E6" stopOpacity="0.98" />
                      <stop offset="30%" stopColor="#FFD9A0" stopOpacity="0.95" />
                      <stop offset="70%" stopColor="#E8C48A" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#E88A3C" stopOpacity="0" />
                    </radialGradient>

                    {/* Inner Luminous Hot Flame Gradient */}
                    <linearGradient id="innerFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#4A7BFF" stopOpacity="0.9" />
                      <stop offset="18%" stopColor="#FFC875" />
                      <stop offset="65%" stopColor="#FFF4DE" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>

                  {/* ===== FLAME LAYER (STAYS LIT CONTINUOUSLY UNTIL RIGHT-CLICK / DOUBLE-TAP!) ===== */}
                  {!isExtinguished && (
                    <g className={prefersReduced ? '' : 'animate-flame-flicker'}>
                      {/* Outer Soft Flame Glow Aura */}
                      <circle
                        cx="80"
                        cy="70"
                        r="26"
                        fill="url(#outerFlameGrad)"
                        className="blur-[5px] opacity-85"
                      />

                      {/* Main Teardrop Flame Body */}
                      <path
                        d="M 80 38 
                           C 92 56, 96 76, 90 88 
                           C 85 96, 75 96, 70 88 
                           C 64 76, 68 56, 80 38 Z"
                        fill="url(#outerFlameGrad)"
                      />

                      {/* Inner Hot Luminous Core */}
                      <path
                        d="M 80 48 
                           C 87 60, 90 76, 86 84 
                           C 82 90, 78 90, 74 84 
                           C 70 76, 73 60, 80 48 Z"
                        fill="url(#innerFlameGrad)"
                      />

                      {/* Base Blue Spark (Oxygen Burn) */}
                      <ellipse cx="80" cy="88" rx="4.5" ry="2.5" fill="#5D8EFF" opacity="0.8" />
                    </g>
                  )}

                  {/* ===== SMOKE WISP (Dissipates after extinguish) ===== */}
                  <AnimatePresence>
                    {showSmoke && (
                      <motion.g
                        key="candle-smoke-group"
                        initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                        animate={{
                          opacity: [0.9, 0.5, 0],
                          y: -75,
                          scale: [0.8, 1.4, 2.0],
                          x: [0, 10, -8, 14],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: '80px 88px' }}
                      >
                        <path
                          d="M 80 88 Q 74 68 83 50 T 76 26 T 84 6"
                          stroke="#E2D4C1"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                          className="blur-[1px] opacity-80"
                        />
                        <circle cx="82" cy="89" r="2" fill="#BBAF9E" opacity="0.85" />
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* ===== CANDLE WICK ===== */}
                  <path
                    d="M 80 94 Q 81.5 89 79.5 85"
                    stroke="#2A1B10"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {isExtinguished && (
                    <circle cx="79.5" cy="85" r="1.5" fill="#E86A38" className="animate-pulse" />
                  )}

                  {/* ===== WAX CANDLE BODY & DRIPS ===== */}
                  {/* Concave Melted Top Basin */}
                  <ellipse cx="80" cy="95" rx="26" ry="6.5" fill="#D4C5B3" />
                  <ellipse cx="80" cy="95" rx="22" ry="4.5" fill="#B8AA98" opacity="0.5" />

                  {/* Cylinder Body */}
                  <path
                    d="M 54 95 
                       C 54 95, 54 165, 54 175 
                       C 54 180, 66 184, 80 184 
                       C 94 184, 106 180, 106 175 
                       C 106 165, 106 95, 106 95 Z"
                    fill="url(#waxBodyGrad)"
                  />

                  {/* Organic Layered Wax Drips */}
                  <path
                    d="M 60 96 C 60 115 64 125 64 132 C 64 137 59 137 59 130 C 59 120 57 105 57 96 Z"
                    fill="#FFF9EE"
                    opacity="0.9"
                  />
                  <path
                    d="M 98 96 C 98 110 102 120 102 126 C 102 130 97 130 97 124 C 97 116 95 106 95 96 Z"
                    fill="#FFF9EE"
                    opacity="0.85"
                  />
                  <path
                    d="M 76 96 C 76 108 79 116 79 122 C 79 125 74 125 74 120 C 74 112 73 104 73 96 Z"
                    fill="#EDE3D5"
                    opacity="0.75"
                  />

                  {/* ===== ANTIQUE BRASS CANDELABRA STAND ===== */}
                  {/* Wax Drip Plate Disc */}
                  <ellipse cx="80" cy="175" rx="36" ry="9" fill="url(#brassGrad)" stroke="#5E4323" strokeWidth="1" />
                  <ellipse cx="80" cy="174" rx="30" ry="7" fill="#8C6332" opacity="0.6" />

                  {/* Ornate Handle Loop */}
                  <path
                    d="M 44 175 Q 18 175 18 200 Q 18 225 44 225"
                    stroke="url(#brassGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Turned Brass Pedestal Base */}
                  <path
                    d="M 70 178 L 90 178 L 93 205 L 67 205 Z"
                    fill="url(#brassGrad)"
                  />
                  <ellipse cx="80" cy="205" rx="16" ry="4" fill="#A8824B" />

                  {/* Base Ring Tier 1 */}
                  <ellipse cx="80" cy="222" rx="34" ry="8" fill="url(#brassGrad)" />
                  {/* Base Ring Tier 2 (Bottom Feet) */}
                  <ellipse cx="80" cy="228" rx="42" ry="10" fill="url(#brassGrad)" stroke="#3E2A14" strokeWidth="1" />

                  {/* Table Surface Candle Drop Shadow & Warm Glow */}
                  <ellipse
                    cx="80"
                    cy="234"
                    rx="52"
                    ry="11"
                    fill="#000000"
                    opacity="0.7"
                    className="blur-[4px]"
                  />
                  {!isExtinguished && (
                    <ellipse
                      cx="80"
                      cy="232"
                      rx="48"
                      ry="9"
                      fill="#FFD9A0"
                      opacity="0.25"
                      className="blur-[6px]"
                    />
                  )}
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Spacer (No text below!) */}
      <div className="h-6" />

      {/* Step 3: Complete Darkness Wash */}
      <AnimatePresence>
        {isDarkening && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-[#070408]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
