import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import geanImg from '../assets/gean.jpeg';

interface NightGardenSceneProps {
  dimmed?: boolean;
  scaleCamera?: number;
  stage?: string;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  maxOpacity: number;
}

interface DistantLantern {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  opacity: number;
}

export const NightGardenScene: React.FC<NightGardenSceneProps> = ({
  dimmed = false,
  scaleCamera = 1,
  stage = 'landing',
}) => {
  const prefersReduced = useReducedMotion();

  // Magical Golden Flower pollen & star particles
  const particles: ParticleData[] = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: 8 + ((i * 29 + 13) % 84),
      y: 15 + ((i * 37 + 23) % 72),
      size: 1.8 + (i % 3) * 0.9,
      duration: 6 + (i % 5) * 1.6,
      delay: (i * 0.6) % 5,
      maxOpacity: 0.4 + (i % 4) * 0.15,
    }));
  }, []);

  // Rising Tangled floating lanterns across the distant background horizon
  const distantLanterns: DistantLantern[] = useMemo(() => [
    { id: 1, left: 12, delay: 0.2, duration: 8.5, scale: 0.45, opacity: 0.65 },
    { id: 2, left: 26, delay: 1.8, duration: 9.2, scale: 0.55, opacity: 0.75 },
    { id: 3, left: 42, delay: 0.6, duration: 8.0, scale: 0.38, opacity: 0.55 },
    { id: 4, left: 58, delay: 2.5, duration: 10.0, scale: 0.6, opacity: 0.8 },
    { id: 5, left: 72, delay: 1.1, duration: 8.8, scale: 0.48, opacity: 0.7 },
    { id: 6, left: 86, delay: 3.2, duration: 9.5, scale: 0.4, opacity: 0.6 },
    { id: 7, left: 20, delay: 4.1, duration: 8.2, scale: 0.5, opacity: 0.7 },
    { id: 8, left: 66, delay: 3.8, duration: 9.8, scale: 0.52, opacity: 0.75 },
  ], []);

  const isLandingStage = stage === 'landing';

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none transition-opacity duration-1000 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#0C0812' }}
      aria-hidden="true"
    >
      {/* Gean Background Image Layer: ONLY rendered on the landing screen */}
      {isLandingStage && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={geanImg}
            alt=""
            className="w-full h-full object-cover opacity-100 filter saturate-[1.1] contrast-[1.05] scale-100"
          />
        </div>
      )}

      {/* Romantic Tangled Aurora Glows (Plum, Rose & Warm Gold) */}
      <div className="absolute top-[5%] right-[5%] w-[360px] h-[360px] rounded-full blur-[80px] bg-[#5B3A52]/35 pointer-events-none" />
      <div className="absolute top-[20%] left-[8%] w-[320px] h-[320px] rounded-full blur-[75px] bg-[#CE97A0]/20 pointer-events-none" />
      <div className="absolute bottom-[25%] left-[25%] w-[380px] h-[260px] rounded-full blur-[90px] bg-[#E8C48A]/18 pointer-events-none" />

      {/* Camera zoom / pull container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: prefersReduced ? 1 : scaleCamera,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Soft Corona Royal Sun Crest Glowing in High Sky */}
        <div className="absolute top-[48px] left-[32px] opacity-25">
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="18" fill="#FFD9A0" className="blur-[1px]" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M 50 14 Q 56 30 50 38 Q 44 30 50 14 Z"
                fill="#E8C48A"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Minimal Golden Slim Crescent Moon */}
        <div className="absolute top-[50px] right-[40px] opacity-85">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            className="drop-shadow-[0_0_16px_rgba(232,196,138,0.6)]"
          >
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="70%" stopColor="#E8C48A" />
                <stop offset="100%" stopColor="#C89D65" />
              </linearGradient>
            </defs>
            <path
              d="M 68 15 C 40 22 28 50 38 78 C 45 88 56 94 68 95 C 44 91 32 68 40 45 C 46 28 56 18 68 15 Z"
              fill="url(#moonGrad)"
            />
          </svg>
        </div>

        {/* Distant Rising Tangled Sky Lanterns (HIDDEN on landing screen per user request) */}
        {!isLandingStage && (
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
                animate={
                  prefersReduced
                    ? {}
                    : {
                        y: [-20, -780],
                        x: [0, l.id % 2 === 0 ? 14 : -14, 0],
                        opacity: [0, l.opacity, l.opacity, 0.15],
                      }
                }
                transition={{
                  duration: l.duration,
                  delay: l.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-6 h-9 rounded-[4px] relative"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 60%, #FFF5DE 0%, #FFD9A0 40%, #E8C48A 75%, #9E6B2A 100%)',
                      boxShadow:
                        '0 0 16px 4px rgba(232, 196, 138, 0.65), 0 0 28px 8px rgba(255, 217, 160, 0.3)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tangled Kingdom of Corona Castle Silhouette & Lake Horizon */}
        <div className="absolute bottom-[0%] left-0 right-0 h-48 pointer-events-none">
          {/* Water Lake Base Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#09050E] via-[#140C1A]/90 to-transparent" />

          {/* Shimmering Golden Lake Reflection Ripples */}
          <div className="absolute bottom-2 left-[20%] right-[20%] h-12 opacity-30 blur-[2px]">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-transparent via-[#E8C48A]/40 to-transparent"
              animate={
                prefersReduced
                  ? {}
                  : {
                      opacity: [0.2, 0.5, 0.2],
                      scaleX: [0.95, 1.05, 0.95],
                    }
              }
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Iconic Tangled Castle Silhouette (Main Spire, Turrets, Island Bridges) */}
          <svg
            viewBox="0 0 500 160"
            preserveAspectRatio="none"
            className="w-full h-full fill-[#130B17] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.8)]"
          >
            {/* Distant Hills */}
            <path d="M 0 160 L 0 110 Q 60 90 140 108 Q 220 120 300 100 Q 400 85 500 105 L 500 160 Z" opacity="0.6" />
            
            {/* Corona Castle Silhouette with Grand Center Tower & Spire */}
            <path d="M 0 160 
                     L 0 125 
                     Q 30 115, 75 122 
                     L 85 122 L 85 105 L 88 95 L 91 105 L 91 122 
                     L 135 122 L 135 110 L 140 100 L 145 110 L 145 122 
                     L 180 122 
                     L 180 85 L 185 70 L 190 55 L 195 40 L 198 25 L 201 40 L 206 55 L 211 70 L 216 85 L 216 122 
                     L 245 122 L 245 95 L 250 82 L 255 95 L 255 122 
                     L 290 122 L 290 108 L 294 96 L 298 108 L 298 122 
                     L 345 122 
                     Q 410 110, 500 120 
                     L 500 160 Z" />

            {/* Subtle Tiny Castle Window Lights */}
            <circle cx="198" cy="45" r="1.5" fill="#FFE5BD" opacity="0.8" />
            <circle cx="198" cy="62" r="1.2" fill="#FFD9A0" opacity="0.75" />
            <circle cx="198" cy="80" r="1.2" fill="#FFD9A0" opacity="0.7" />
          </svg>
        </div>

        {/* Magical Golden Hair Pollen / Fireflies */}
        {!prefersReduced && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.id % 2 === 0 ? '#FFD9A0' : '#FFF2D6',
                  boxShadow: `0 0 8px 2px ${
                    p.id % 2 === 0 ? 'rgba(232, 196, 138, 0.7)' : 'rgba(255, 242, 214, 0.8)'
                  }`,
                }}
                animate={{
                  y: [0, -38, -75],
                  x: [0, (p.id % 2 === 0 ? 1 : -1) * (8 + (p.id % 5)), 0],
                  opacity: [0, p.maxOpacity, p.maxOpacity * 0.8, 0],
                  scale: [0.8, 1.3, 0.9],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Subtle organic film grain texture */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30 mix-blend-screen" />

      {/* Atmospheric Outer Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 110px 35px rgba(10, 7, 12, 0.8)',
        }}
      />
    </div>
  );
};
