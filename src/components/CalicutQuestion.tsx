import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CalicutQuestionProps {
  onComplete: (answer: string) => void;
}

export const CalicutQuestion: React.FC<CalicutQuestionProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setSubmittedAnswer(answer.trim());
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    onComplete(submittedAnswer || answer.trim());
  };

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#120D1A]">
      {/* --- BACKGROUND ARTWORK: RAPUNZEL BALCONY & STARRY NIGHT --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Midnight Blue to Plum Night Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1026] via-[#1A1633] to-[#120D1A]" />

        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-[8%] left-[10%] w-64 h-64 rounded-full blur-[70px] bg-[#3B2D54]/50" />
        <div className="absolute top-[25%] right-[5%] w-72 h-72 rounded-full blur-[80px] bg-[#E8C48A]/15" />
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full blur-[90px] bg-[#8E5A7D]/30" />

        {/* Twinkling Starfield */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#FFF9E6]"
              style={{
                left: `${(i * 29 + 7) % 94}%`,
                top: `${(i * 37 + 11) % 55}%`,
                width: `${1.2 + (i % 3) * 0.8}px`,
                height: `${1.2 + (i % 3) * 0.8}px`,
                boxShadow: i % 3 === 0 ? '0 0 6px 1.5px rgba(255, 249, 230, 0.9)' : 'none',
              }}
              animate={
                prefersReduced
                  ? {}
                  : {
                      opacity: [0.2, 0.95, 0.2],
                      scale: [0.8, 1.3, 0.8],
                    }
              }
              transition={{
                duration: 2.2 + (i % 4) * 0.8,
                delay: (i * 0.25) % 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Rising Golden Floating Lanterns in the distance */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { id: 1, left: 18, delay: 0.5, duration: 8.5, scale: 0.5 },
            { id: 2, left: 32, delay: 2.5, duration: 9.0, scale: 0.4 },
            { id: 3, left: 55, delay: 1.2, duration: 8.0, scale: 0.6 },
            { id: 4, left: 78, delay: 3.8, duration: 9.5, scale: 0.45 },
          ].map((l) => (
            <motion.div
              key={l.id}
              className="absolute"
              style={{ left: `${l.left}%`, bottom: '-40px', transform: `scale(${l.scale})` }}
              animate={
                prefersReduced
                  ? {}
                  : {
                      y: [-40, -680],
                      x: [0, l.id % 2 === 0 ? 12 : -12, 0],
                      opacity: [0, 0.85, 0.85, 0],
                    }
              }
              transition={{
                duration: l.duration,
                delay: l.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div
                className="w-8 h-11 rounded-[4px] relative"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 40%, #E8C48A 75%, #B8894F 100%)',
                  boxShadow: '0 0 20px 6px rgba(232, 196, 138, 0.8), 0 0 35px 12px rgba(255, 217, 160, 0.4)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* --- ILLUSTRATION: RAPUNZEL AT BALCONY WINDOW --- */}
        <div className="absolute inset-x-0 bottom-0 top-[5%] flex items-end justify-center pointer-events-none opacity-90">
          <svg
            viewBox="0 0 400 580"
            fill="none"
            className="w-full h-full max-w-[420px] object-cover"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              {/* Stone Arch Gradient */}
              <linearGradient id="stoneWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#43384D" />
                <stop offset="40%" stopColor="#2A2234" />
                <stop offset="100%" stopColor="#181320" />
              </linearGradient>

              {/* Stone Balustrade Gradient */}
              <linearGradient id="balustradeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A3F55" />
                <stop offset="25%" stopColor="#352C3E" />
                <stop offset="100%" stopColor="#1E1724" />
              </linearGradient>

              {/* Glowing Golden Hair Gradient */}
              <linearGradient id="rapunzelHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E7" />
                <stop offset="20%" stopColor="#FFE1A8" />
                <stop offset="50%" stopColor="#E8C48A" />
                <stop offset="80%" stopColor="#C99854" />
                <stop offset="100%" stopColor="#784C1C" />
              </linearGradient>

              {/* Dress Bodice Gradient */}
              <linearGradient id="dressBodice" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B37E9E" />
                <stop offset="40%" stopColor="#8E5A7D" />
                <stop offset="80%" stopColor="#5E3853" />
                <stop offset="100%" stopColor="#381E32" />
              </linearGradient>

              {/* Puffed Sleeve Stripes Gradient */}
              <linearGradient id="sleeveStripes" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CE97A0" />
                <stop offset="50%" stopColor="#8E5A7D" />
                <stop offset="100%" stopColor="#CE97A0" />
              </linearGradient>

              {/* Skin Tone Gradient with Warm Night Light */}
              <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2E8" />
                <stop offset="40%" stopColor="#F9D7C5" />
                <stop offset="85%" stopColor="#D9A894" />
                <stop offset="100%" stopColor="#966353" />
              </linearGradient>

              {/* Emerald Green Eye Gradient */}
              <radialGradient id="greenEye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7AE6A2" />
                <stop offset="50%" stopColor="#2E9E58" />
                <stop offset="100%" stopColor="#104D27" />
              </radialGradient>
            </defs>

            {/* Tower Stone Window Frame on Right Edge */}
            <path
              d="M 330 0 L 400 0 L 400 580 L 330 580 C 330 380 345 220 330 0 Z"
              fill="url(#stoneWallGrad)"
            />
            {/* Window Inner Reveal/Sill */}
            <path
              d="M 330 0 L 350 0 L 350 420 L 330 420 Z"
              fill="#261E2E"
              opacity="0.9"
            />

            {/* --- RAPUNZEL FIGURE GAZING UPWARD --- */}
            <g transform="translate(15, 60)">
              {/* Back Hair Cascading Down Left and pooling */}
              <path
                d="M 175 140 
                   C 130 180, 80 240, 65 310 
                   C 50 370, 70 440, 110 460 
                   C 160 480, 260 480, 310 450 
                   C 250 460, 150 460, 115 420 
                   C 85 380, 95 310, 125 240 
                   C 145 190, 175 160, 175 140 Z"
                fill="url(#rapunzelHair)"
              />

              {/* Body & Dress */}
              {/* Corset Bodice */}
              <path
                d="M 160 270 
                   C 150 250, 170 235, 195 235 
                   C 225 235, 250 250, 245 275 
                   C 250 330, 270 400, 290 450 
                   L 130 450 
                   C 145 390, 155 330, 160 270 Z"
                fill="url(#dressBodice)"
              />

              {/* Bodice Corset Lacing */}
              <path
                d="M 195 245 L 210 255 L 195 265 L 210 275 L 195 285 L 210 295"
                stroke="#FFB6C1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 190 240 Q 202 248 215 240"
                stroke="#FFF0F5"
                strokeWidth="2"
                fill="none"
              />

              {/* Puffed Striped Sleeve (Left) */}
              <ellipse
                cx="155"
                cy="265"
                rx="22"
                ry="28"
                transform="rotate(-15 155 265)"
                fill="url(#sleeveStripes)"
              />
              {/* Puffed Sleeve (Right) */}
              <ellipse
                cx="255"
                cy="260"
                rx="22"
                ry="28"
                transform="rotate(15 255 260)"
                fill="url(#sleeveStripes)"
              />

              {/* Lower Sleeves (Lavender/Pink Fitted) */}
              <path
                d="M 148 285 C 145 315, 148 350, 165 385 L 180 375 C 168 340, 165 310, 165 285 Z"
                fill="#CE97A0"
              />
              <path
                d="M 260 280 C 255 310, 235 345, 215 375 L 230 385 C 250 350, 270 310, 270 280 Z"
                fill="#CE97A0"
              />

              {/* Arms Leaning on Balcony Rail */}
              {/* Forearms crossed on stone ledge */}
              <path
                d="M 155 365 
                   C 165 360, 240 360, 275 365 
                   C 285 375, 280 395, 265 398 
                   C 230 400, 150 400, 140 385 Z"
                fill="url(#skinTone)"
              />

              {/* Right Hand propping chin dreamily */}
              <path
                d="M 162 275 
                   C 162 250, 165 220, 172 195 
                   C 176 185, 185 180, 188 190 
                   C 188 210, 178 245, 175 275 Z"
                fill="url(#skinTone)"
              />
              {/* Delicate fingers under chin */}
              <path
                d="M 172 188 C 172 178, 178 174, 184 176 C 188 178, 192 188, 188 195 Z"
                fill="url(#skinTone)"
              />

              {/* Neck & Chest Décolletage */}
              <path
                d="M 188 170 C 190 200, 185 225, 185 240 C 200 245, 220 245, 230 235 C 230 215, 225 185, 220 170 Z"
                fill="url(#skinTone)"
              />
              {/* Delicate Lace Trim */}
              <path
                d="M 180 236 Q 205 250 235 236"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="3 2"
                fill="none"
              />

              {/* Head Silhouette tilted dreamily upward to the stars */}
              <path
                d="M 182 145 
                   C 180 115, 205 90, 235 95 
                   C 265 100, 280 125, 275 155 
                   C 270 178, 250 195, 225 195 
                   C 200 195, 185 175, 182 145 Z"
                fill="url(#skinTone)"
              />

              {/* Rosy Cheeks */}
              <ellipse cx="205" cy="158" rx="14" ry="9" fill="#FF8596" opacity="0.35" />
              <ellipse cx="258" cy="162" rx="12" ry="8" fill="#FF8596" opacity="0.3" />

              {/* Dreamy Expression: Upward Gazing Emerald Eyes */}
              {/* Left Eye */}
              <path
                d="M 198 140 C 205 128, 220 128, 228 140 C 220 148, 205 148, 198 140 Z"
                fill="#FFFFFF"
              />
              <circle cx="214" cy="136" r="7" fill="url(#greenEye)" />
              <circle cx="214" cy="136" r="4" fill="#0E2415" />
              <circle cx="216" cy="133" r="2.5" fill="#FFFFFF" />
              <path
                d="M 196 138 C 205 125, 222 125, 230 137"
                stroke="#2B150A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Eyelashes */}
              <path d="M 226 133 L 232 128" stroke="#2B150A" strokeWidth="2" strokeLinecap="round" />

              {/* Right Eye */}
              <path
                d="M 244 142 C 250 132, 265 132, 272 142 C 265 150, 250 150, 244 142 Z"
                fill="#FFFFFF"
              />
              <circle cx="258" cy="138" r="6.5" fill="url(#greenEye)" />
              <circle cx="258" cy="138" r="3.8" fill="#0E2415" />
              <circle cx="260" cy="135" r="2.2" fill="#FFFFFF" />
              <path
                d="M 242 140 C 250 129, 266 129, 274 139"
                stroke="#2B150A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 270 135 L 276 130" stroke="#2B150A" strokeWidth="2" strokeLinecap="round" />

              {/* Delicate Eyebrows */}
              <path
                d="M 195 125 C 205 118, 220 120, 226 126"
                stroke="#8A5A2B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 245 126 C 255 120, 268 122, 275 128"
                stroke="#8A5A2B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Nose */}
              <path
                d="M 233 145 C 235 156, 237 160, 240 160"
                stroke="#C4846C"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Gentle Open Lips (Dreamy smile) */}
              <path
                d="M 226 172 Q 236 178 248 172"
                stroke="#D15B6E"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 228 174 Q 237 182 246 174"
                stroke="#E88294"
                strokeWidth="2"
                fill="none"
              />

              {/* Front Golden Hair Bangs & Long Flowing Tresses */}
              {/* Crown of hair */}
              <path
                d="M 175 125 
                   C 185 80, 230 65, 275 80 
                   C 310 95, 320 140, 310 180 
                   C 300 230, 290 280, 295 340 
                   C 300 390, 320 440, 340 470 
                   C 310 465, 280 430, 275 370 
                   C 270 310, 285 240, 285 180 
                   C 285 140, 270 105, 245 100 
                   C 215 95, 190 110, 175 125 Z"
                fill="url(#rapunzelHair)"
              />

              {/* Swooping front lock across forehead */}
              <path
                d="M 190 95 C 215 100, 245 110, 235 130 C 220 118, 205 108, 190 95 Z"
                fill="#FFF4D6"
              />

              {/* Purple Blossoms in Rapunzel's Hair */}
              {/* Blossom 1 (Top Right) */}
              <g transform="translate(290, 110)">
                <circle cx="-5" cy="0" r="4.5" fill="#CE97A0" />
                <circle cx="5" cy="0" r="4.5" fill="#A897C4" />
                <circle cx="0" cy="-5" r="4.5" fill="#CE97A0" />
                <circle cx="0" cy="5" r="4.5" fill="#A897C4" />
                <circle cx="0" cy="0" r="2.5" fill="#FFEAA7" />
              </g>
              {/* Blossom 2 (Cheek area) */}
              <g transform="translate(305, 185)">
                <circle cx="-4" cy="0" r="4" fill="#CE97A0" />
                <circle cx="4" cy="0" r="4" fill="#A897C4" />
                <circle cx="0" cy="-4" r="4" fill="#CE97A0" />
                <circle cx="0" cy="0" r="2" fill="#FFEAA7" />
              </g>
              {/* Blossom 3 (Lower hair) */}
              <g transform="translate(315, 275)">
                <circle cx="-4" cy="0" r="4" fill="#A897C4" />
                <circle cx="4" cy="0" r="4" fill="#CE97A0" />
                <circle cx="0" cy="4" r="4" fill="#A897C4" />
                <circle cx="0" cy="0" r="2" fill="#FFEAA7" />
              </g>
            </g>

            {/* --- STONE BALCONY RAILING & PURPLE FLOWER GARLAND --- */}
            {/* Balcony Ledge Rail */}
            <path
              d="M 0 450 L 400 450 L 400 475 L 0 475 Z"
              fill="url(#balustradeGrad)"
              stroke="#5E4F6C"
              strokeWidth="2"
            />
            {/* Balcony Wall Below */}
            <path
              d="M 0 475 L 400 475 L 400 580 L 0 580 Z"
              fill="#18121F"
            />
            {/* Balcony Carved Arch details */}
            <path
              d="M 40 475 C 40 520, 80 540, 110 475 
                 M 140 475 C 140 520, 180 540, 210 475 
                 M 240 475 C 240 520, 280 540, 310 475 
                 M 340 475 C 340 520, 380 540, 400 475"
              stroke="#32243C"
              strokeWidth="4"
              fill="none"
            />

            {/* Lush Cascading Purple Bougainvillea / Ivy Flowers along Balcony */}
            {/* Climbing Vines along window on right */}
            <path
              d="M 360 0 Q 345 80 365 160 T 350 300 T 365 450"
              stroke="#2E4A28"
              strokeWidth="3"
              fill="none"
            />
            {/* Vines along Balcony ledge */}
            <path
              d="M 0 455 Q 100 445 200 460 T 400 450"
              stroke="#2E4A28"
              strokeWidth="4"
              fill="none"
            />

            {/* Clustered Purple Petals along Balcony */}
            {Array.from({ length: 42 }).map((_, i) => {
              const x = (i * 9.5 + (i % 5) * 3) % 400;
              const y = 438 + ((i * 17) % 35);
              const isRose = i % 2 === 0;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3.5 + (i % 3) * 1.2}
                  fill={isRose ? '#CE97A0' : '#8E5A7D'}
                  opacity={0.85}
                />
              );
            })}
            {/* Highlighting bright flowers on balcony */}
            {Array.from({ length: 22 }).map((_, i) => {
              const x = (i * 18 + 12) % 390;
              const y = 442 + ((i * 13) % 25);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={2.5}
                  fill="#DDB3FF"
                  opacity={0.9}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* --- TOP BRANDING / INTRO TEXT --- */}
      <motion.div
        className="relative z-20 pt-6 px-4 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#E8C48A] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Chapter Two &bull; Kozhikode Memories
        </p>
      </motion.div>

      {/* --- FLOATING QUESTION & INTERACTIVE ANSWER CARD --- */}
      <div className="relative z-30 w-full px-4 pb-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="question-form"
              className="w-full max-w-sm rounded-[28px] p-6 backdrop-blur-xl bg-[#1A1224]/85 border border-[#E8C48A]/35 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(232,196,138,0.2)] flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Question Title in Display Serif */}
              <h2 className="font-serif-display text-xl sm:text-2xl text-[#F6EEE4] leading-snug font-normal tracking-wide mb-1">
                Which is your fav place in calicut?{' '}
                <span className="font-sans inline-block text-lg" role="img" aria-label="sparkles">
                  ✨
                </span>
              </h2>

              <p className="font-sans text-xs text-[#CFC3C8]/80 mb-5 tracking-wide">
                Tell me the special spot that holds your heart
              </p>

              {/* Form Input Container */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-3.5">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="e.g. Kozhikode Beach, Mananchira, Beypore..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#120B18]/90 border border-[#E8C48A]/40 text-[#F6EEE4] placeholder-[#CFC3C8]/40 text-sm font-sans focus:outline-none focus:border-[#FFD9A0] focus:ring-2 focus:ring-[#E8C48A]/40 transition-all shadow-inner"
                    autoFocus
                    required
                  />
                  {answer.trim().length > 0 && (
                    <span className="absolute right-3.5 top-3.5 text-xs text-[#E8C48A]">
                      ✨
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={!answer.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E8C48A] via-[#FFD9A0] to-[#E8C48A] text-[#140F16] font-sans font-semibold text-sm tracking-wide shadow-[0_4px_20px_rgba(232,196,138,0.4)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center space-x-2"
                >
                  <span>Lock it in</span>
                  <span className="text-base">&rarr;</span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* --- SUBMITTED / ROMANTIC REVEAL RESTING STATE --- */
            <motion.div
              key="submitted-card"
              className="w-full max-w-sm rounded-[28px] p-6 backdrop-blur-xl bg-[#1A1224]/90 border border-[#E8C48A]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(232,196,138,0.25)] flex flex-col items-center text-center space-y-4"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="w-12 h-12 rounded-full bg-[#E8C48A]/20 border border-[#E8C48A]/60 flex items-center justify-center text-xl">
                🌙
              </div>

              <div className="space-y-1">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8C48A] font-medium">
                  Your Answer
                </p>
                <h3 className="font-serif-display text-2xl text-[#FFF6E6] font-normal italic tracking-wide">
                  &ldquo;{submittedAnswer}&rdquo;
                </h3>
              </div>

              <p className="font-serif-display text-sm text-[#F6EEE4]/90 italic leading-relaxed pt-1">
                Noted in the stars... maybe that&apos;s where our next chapter begins.
              </p>

              <motion.button
                type="button"
                onClick={handleFinish}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#E8C48A] text-[#140F16] font-sans font-semibold text-xs uppercase tracking-widest shadow-[0_4px_16px_rgba(232,196,138,0.4)] cursor-pointer"
              >
                Continue &rarr;
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
