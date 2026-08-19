import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RapunzelLanternSceneProps {
  onComplete: () => void;
}

export const RapunzelLanternScene: React.FC<RapunzelLanternSceneProps> = ({ onComplete }) => {
  const prefersReduced = useReducedMotion();
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }

    // Auto advance after 3.8s animation
    const finishTimer = setTimeout(() => {
      setIsFinishing(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3800);

    return () => {
      clearTimeout(finishTimer);
    };
  }, [onComplete, prefersReduced]);

  const handleSkip = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  // Generate 18 rising background floating lanterns (the iconic Tangled lantern festival)
  const distantLanterns = [
    { id: 1, left: 12, delay: 0.2, duration: 4.2, scale: 0.45, opacity: 0.65 },
    { id: 2, left: 24, delay: 0.8, duration: 4.8, scale: 0.55, opacity: 0.75 },
    { id: 3, left: 38, delay: 0.4, duration: 4.4, scale: 0.38, opacity: 0.55 },
    { id: 4, left: 52, delay: 1.1, duration: 5.0, scale: 0.6, opacity: 0.8 },
    { id: 5, left: 68, delay: 0.6, duration: 4.6, scale: 0.48, opacity: 0.7 },
    { id: 6, left: 82, delay: 0.9, duration: 4.3, scale: 0.52, opacity: 0.75 },
    { id: 7, left: 18, delay: 1.4, duration: 5.2, scale: 0.35, opacity: 0.5 },
    { id: 8, left: 74, delay: 1.6, duration: 4.9, scale: 0.42, opacity: 0.65 },
    { id: 9, left: 30, delay: 1.9, duration: 4.5, scale: 0.5, opacity: 0.7 },
    { id: 10, left: 60, delay: 2.1, duration: 4.7, scale: 0.58, opacity: 0.8 },
    { id: 11, left: 88, delay: 1.8, duration: 5.1, scale: 0.4, opacity: 0.6 },
    { id: 12, left: 8, delay: 2.3, duration: 4.6, scale: 0.45, opacity: 0.65 },
  ];

  return (
    <div
      className="relative z-20 w-full h-full flex flex-col justify-between items-center overflow-hidden select-none bg-[#140F16]"
      onClick={handleSkip}
      role="region"
      aria-label="Rapunzel lantern release animation. Tap anywhere to skip."
    >
      {/* Deep Tangled Night Sky with Purple/Plum & Rose Aurora Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140F16] via-[#221528] to-[#120B15]" />
      
      {/* Soft Romantic Glows */}
      <div className="absolute top-[15%] left-[10%] w-[280px] h-[280px] rounded-full blur-[70px] bg-[#CE97A0]/25 pointer-events-none" />
      <div className="absolute top-[5%] right-[10%] w-[320px] h-[320px] rounded-full blur-[80px] bg-[#5B3A52]/40 pointer-events-none" />
      <div className="absolute bottom-[25%] left-[20%] w-[350px] h-[250px] rounded-full blur-[90px] bg-[#E8C48A]/20 pointer-events-none" />

      {/* Starry Night particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FFF5E4]"
            style={{
              left: `${(i * 37 + 13) % 96}%`,
              top: `${(i * 47 + 7) % 65}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              boxShadow: i % 2 === 0 ? '0 0 6px 1px rgba(255, 245, 228, 0.8)' : 'none',
            }}
            animate={{
              opacity: [0.2, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3),
              delay: (i * 0.3) % 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Rising Floating Tangled Lanterns in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {distantLanterns.map((l) => (
          <motion.div
            key={l.id}
            className="absolute"
            style={{
              left: `${l.left}%`,
              bottom: '-40px',
              transform: `scale(${l.scale})`,
              opacity: l.opacity,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -750,
              x: [0, (l.id % 2 === 0 ? 15 : -15), 0],
              opacity: [0, l.opacity, l.opacity, 0.2],
            }}
            transition={{
              duration: l.duration,
              delay: l.delay,
              ease: 'easeOut',
            }}
          >
            {/* Distant Tangled Lantern SVG */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-7 h-10 rounded-[4px] relative"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, #FFF3D6 0%, #FFD9A0 40%, #E8C48A 75%, #B8894F 100%)',
                  boxShadow: '0 0 16px 4px rgba(232, 196, 138, 0.7), 0 0 30px 10px rgba(255, 217, 160, 0.3)',
                }}
              >
                {/* Subtle Corona Sun Emblem */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-3 h-3 rounded-full border border-[#8C5D20]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Header / Caption */}
      <motion.div
        className="pt-10 px-6 text-center z-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3 }}
      >
        <p className="font-serif-display text-lg sm:text-xl text-[#F6EEE4] italic font-light tracking-wide opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          &ldquo;and at last I see the light&hellip;&rdquo;
        </p>
      </motion.div>

      {/* Main Rapunzel Silhouette & Released Main Lantern Scene */}
      <div className="relative w-full h-[520px] flex items-end justify-center pointer-events-none">
        {/* Glowing Golden Hair Aura Effect */}
        <motion.div
          className="absolute bottom-[60px] left-[15%] w-[180px] h-[280px] rounded-full blur-[45px] pointer-events-none"
          style={{ backgroundColor: 'rgba(255, 217, 160, 0.3)' }}
          animate={{
            opacity: [0.4, 0.85, 0.5],
            scale: [0.95, 1.1, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Primary Released Floating Sky Lantern (Rises from Rapunzel's hands) */}
        <motion.div
          className="absolute z-20"
          style={{ bottom: '180px', left: '46%' }}
          initial={{ y: 0, scale: 0.85, opacity: 0.9 }}
          animate={{
            y: [-10, -70, -220, -420],
            x: [0, 8, -6, 12],
            scale: [0.85, 1.05, 1.15, 0.9],
            opacity: [0.95, 1, 1, 0.85],
          }}
          transition={{
            duration: 3.6,
            times: [0, 0.25, 0.65, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Main Hero Lantern */}
          <div className="relative flex flex-col items-center">
            {/* Luminous Bloom Glow */}
            <div
              className="absolute -inset-4 rounded-full blur-[20px]"
              style={{ backgroundColor: 'rgba(255, 217, 160, 0.7)' }}
            />
            {/* Lantern Body */}
            <div
              className="w-12 h-16 rounded-[6px] relative flex items-center justify-center border border-[#FFD9A0]/60"
              style={{
                background: 'radial-gradient(ellipse at 50% 65%, #FFFFFF 0%, #FFF3D6 30%, #FFD9A0 60%, #E8C48A 85%, #9E6B2A 100%)',
                boxShadow: '0 0 28px 8px rgba(255, 217, 160, 0.85), 0 0 60px 20px rgba(232, 196, 138, 0.45)',
              }}
            >
              {/* Tangled Royal Sun Crest Silhouette */}
              <svg width="24" height="24" viewBox="0 0 100 100" className="opacity-55 fill-[#7A4B12]">
                <circle cx="50" cy="50" r="18" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d="M 50 20 Q 55 32 50 38 Q 45 32 50 20 Z"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </svg>
            </div>
            {/* Subtle soft flame base */}
            <div className="w-5 h-1.5 rounded-full bg-[#FFE2A8] blur-[1px] mt-0.5" />
          </div>
        </motion.div>

        {/* Rapunzel Artistic Silhouette & Flowing Magic Golden Hair */}
        <div className="relative w-[340px] h-[360px] flex items-end justify-center">
          <svg
            viewBox="0 0 340 360"
            fill="none"
            className="w-full h-full drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            <defs>
              {/* Magic Golden Hair Gradient */}
              <linearGradient id="magicHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="25%" stopColor="#FFD9A0" />
                <stop offset="60%" stopColor="#E8C48A" />
                <stop offset="85%" stopColor="#C4934E" />
                <stop offset="100%" stopColor="#6E4416" />
              </linearGradient>

              {/* Character Dress Gradient (Romantic Plum/Lavender) */}
              <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8E5A7D" />
                <stop offset="50%" stopColor="#5B3A52" />
                <stop offset="100%" stopColor="#2D1A29" />
              </linearGradient>

              {/* Soft Body Silhouette */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#452C3E" />
                <stop offset="100%" stopColor="#1E121C" />
              </linearGradient>
            </defs>

            {/* Cascading Glowing Braided Golden Hair that pools and swirls at bottom */}
            {/* Layer 1: Outer Hair Wave */}
            <path
              d="M 148 110 
                 C 120 140, 90 180, 85 240 
                 C 80 280, 95 320, 140 340 
                 C 190 355, 280 350, 310 330 
                 C 325 320, 330 300, 305 305 
                 C 260 315, 180 325, 135 300 
                 C 105 280, 115 230, 135 180 
                 C 145 155, 155 130, 152 110 Z"
              fill="url(#magicHairGrad)"
              opacity="0.95"
            />

            {/* Layer 2: Main Flowing Strand with Shimmer Highlights */}
            <path
              d="M 152 105 
                 C 138 135, 115 175, 108 220 
                 C 102 265, 118 295, 155 315 
                 C 200 335, 270 330, 290 315
                 C 270 320, 210 320, 170 300 
                 C 135 280, 125 245, 132 205 
                 C 140 165, 160 135, 162 105 Z"
              fill="#FFE8BA"
              opacity="0.8"
            />

            {/* Glowing Golden Highlights / Strands */}
            <path
              d="M 145 120 Q 110 190 115 260 T 170 325"
              stroke="#FFFDF5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.75"
              fill="none"
            />
            <path
              d="M 155 115 Q 128 175 132 245 T 220 325"
              stroke="#FFD9A0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.85"
              fill="none"
            />

            {/* Tiny magical flowers/sparkles woven into hair */}
            <circle cx="120" cy="180" r="3.5" fill="#FFF2D6" opacity="0.9" />
            <circle cx="108" cy="230" r="4" fill="#CE97A0" opacity="0.9" />
            <circle cx="122" cy="275" r="3.5" fill="#FFF2D6" opacity="0.9" />
            <circle cx="160" cy="310" r="4" fill="#A897C4" opacity="0.9" />
            <circle cx="230" cy="328" r="3.5" fill="#FFF2D6" opacity="0.9" />

            {/* Rapunzel Body Silhouette */}
            {/* Elegant Medieval Corset / Dress Bodice */}
            <path
              d="M 152 145 
                 C 152 135, 165 130, 175 130 
                 C 185 130, 196 138, 195 148 
                 C 193 170, 198 210, 210 260 
                 C 215 285, 222 315, 230 350 
                 L 135 350 
                 C 145 310, 150 270, 152 230 
                 C 153 195, 150 165, 152 145 Z"
              fill="url(#dressGrad)"
            />

            {/* Dress Lacing / Details */}
            <path
              d="M 166 148 L 178 155 L 166 163 L 178 170 L 167 178"
              stroke="#CE97A0"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
              fill="none"
            />

            {/* Neck & Delicately Tilted Profile Head gazing upward */}
            {/* Neck */}
            <path
              d="M 162 118 L 174 118 L 173 132 L 160 132 Z"
              fill="url(#bodyGrad)"
            />

            {/* Hair Crown & Bun/Tresses framing head */}
            <ellipse
              cx="160"
              cy="98"
              rx="15"
              ry="18"
              transform="rotate(-15 160 98)"
              fill="url(#magicHairGrad)"
            />

            {/* Profile Head Silhouette gazing upwards toward the lantern */}
            <path
              d="M 160 84 
                 C 172 84, 180 92, 178 104 
                 C 177 109, 179 111, 182 111 
                 C 180 114, 176 116, 172 120 
                 C 166 122, 156 120, 152 114 
                 C 147 105, 150 88, 160 84 Z"
              fill="url(#bodyGrad)"
            />

            {/* Soft upward-turned nose and gentle eyelashes */}
            <path
              d="M 174 98 C 178 100, 180 102, 178 105 C 176 107, 173 108, 174 111"
              stroke="#452C3E"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Hair bangs / front tendril with golden glow */}
            <path
              d="M 158 84 C 168 88, 172 96, 165 106"
              stroke="#FFF2D6"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Arms Reaching Upwards Releasing the Lantern */}
            {/* Left Arm / Forearm */}
            <path
              d="M 158 140 
                 C 152 145, 142 165, 148 185 
                 C 152 195, 162 198, 172 190 
                 C 178 180, 175 160, 170 148 Z"
              fill="url(#bodyGrad)"
            />
            {/* Right Arm Reaching Forward-Up */}
            <path
              d="M 185 142 
                 C 192 148, 202 160, 204 175 
                 C 205 185, 198 190, 190 185 
                 C 182 178, 178 162, 178 148 Z"
              fill="url(#bodyGrad)"
            />
            {/* Hands gently open beneath lantern */}
            <path
              d="M 165 185 C 170 178, 178 178, 182 183 C 185 188, 178 194, 170 192 Z"
              fill="url(#bodyGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Skip Button & Bottom Bar */}
      <div className="pb-8 px-6 w-full flex items-center justify-center z-30">
        <button
          type="button"
          onClick={handleSkip}
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#CFC3C8]/80 hover:text-[#FFF5E4] px-4 py-2 rounded-full border border-[#E8C48A]/20 bg-[#221A26]/50 backdrop-blur-sm cursor-pointer transition-all hover:border-[#E8C48A]/50 active:scale-95"
        >
          Skip to Puzzle &rarr;
        </button>
      </div>

      {/* Radiant Transition Flash */}
      <AnimatePresence>
        {isFinishing && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-radial from-[#FFF4DE] via-[#E8C48A]/90 to-[#140F16]"
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
