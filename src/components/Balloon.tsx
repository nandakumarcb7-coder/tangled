import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { BalloonSpec } from '../lib/sceneConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BalloonProps {
  spec: BalloonSpec;
  onPop: (spec: BalloonSpec, x: number, y: number) => void;
  disabled?: boolean;
}

export const Balloon: React.FC<BalloonProps> = ({
  spec,
  onPop,
  disabled = false,
}) => {
  const prefersReduced = useReducedMotion();
  const [isPressed, setIsPressed] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const gradId = `balloonGrad-${spec.id}`;
  const highlightGradId = `highlightGrad-${spec.id}`;
  const shadowGradId = `shadowGrad-${spec.id}`;

  const triggerPop = (e?: React.MouseEvent | React.TouchEvent) => {
    if (disabled || isPopping) return;

    let posX = 0;
    let posY = 0;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      posX = rect.left + rect.width / 2;
      posY = rect.top + rect.height / 3;
    } else if (e && 'clientX' in e && e.clientX > 0) {
      posX = e.clientX;
      posY = e.clientY;
    }

    setIsPopping(true);
    onPop(spec, posX, posY);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        transform: `rotate(${spec.rotation}deg)`,
      }}
    >
      {/* Balloon Motion Container */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={
          isPopping
            ? {
                scale: [1, 1.15, 0],
                rotate: [0, 8, -12],
                y: [0, -14, -30],
                opacity: [1, 1, 0],
              }
            : isPressed
            ? {
                scale: 0.92,
                filter: 'brightness(0.92)',
              }
            : prefersReduced
            ? { y: 0 }
            : {
                y: [0, -10, 0],
              }
        }
        transition={
          isPopping
            ? {
                duration: 0.28,
                times: [0, 0.25, 1],
                ease: [0.16, 1, 0.3, 1],
              }
            : isPressed
            ? {
                duration: 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }
            : {
                duration: spec.driftDuration,
                delay: spec.driftDelay,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        {/* Interactive Touch/Click Button Target */}
        <button
          type="button"
          disabled={disabled || isPopping}
          onClick={(e) => {
            e.stopPropagation();
            triggerPop(e);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            triggerPop();
          }}
          onPointerDown={() => setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          onPointerLeave={() => setIsPressed(false)}
          aria-label={`${spec.name} option`}
          className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C48A] rounded-full p-2 transition-transform hover:scale-105 active:scale-95 z-20"
          style={{ minWidth: '70px', minHeight: '120px' }}
        >
          {/* SVG Hand-crafted Balloon */}
          <svg
            width="72"
            height="120"
            viewBox="0 0 76 130"
            fill="none"
            className="overflow-visible pointer-events-none"
          >
            <defs>
              {/* Balloon Main Volume Radial Gradient */}
              <radialGradient
                id={gradId}
                cx="35%"
                cy="32%"
                r="68%"
                fx="32%"
                fy="28%"
              >
                <stop offset="0%" stopColor={spec.highlightColor} stopOpacity="0.95" />
                <stop offset="40%" stopColor={spec.color} />
                <stop offset="85%" stopColor={spec.shadowColor} />
                <stop offset="100%" stopColor="#1E1420" stopOpacity="0.95" />
              </radialGradient>

              {/* Top-Left Specular Sheen */}
              <radialGradient id={highlightGradId} cx="35%" cy="30%" r="45%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>

              {/* Under-Balloon Drop Shadow Gradient */}
              <radialGradient id={shadowGradId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Teardrop Balloon Main Body */}
            <path
              d="M 38 4 
                 C 58 4, 72 20, 72 44 
                 C 72 64, 58 84, 43 89 
                 L 43 91 
                 L 33 91 
                 L 33 89 
                 C 18 84, 4 64, 4 44 
                 C 4 20, 18 4, 38 4 Z"
              fill={`url(#${gradId})`}
              stroke={spec.highlightColor}
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />

            {/* Specular Glint Ellipse (Upper-Left Reflection) */}
            <ellipse
              cx="26"
              cy="28"
              rx="12"
              ry="18"
              transform="rotate(-22 26 28)"
              fill={`url(#${highlightGradId})`}
            />

            {/* Secondary Tiny Crescent Highlight at rim */}
            <path
              d="M 14 36 C 12 28, 16 18, 24 12"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />

            {/* Tied Knot Geometry at neck base */}
            <path
              d="M 32 89 L 44 89 L 46 95 L 30 95 Z"
              fill={spec.shadowColor}
            />
            <ellipse
              cx="38"
              cy="93"
              rx="4.5"
              ry="2"
              fill={spec.color}
              stroke={spec.shadowColor}
              strokeWidth="0.5"
            />

            {/* Balloon Thread / String (Quadratic Bezier with sway) */}
            <path
              d="M 38 95 Q 33 108 39 118 T 37 130"
              stroke="#D3C7CF"
              strokeWidth="0.85"
              strokeOpacity="0.65"
              fill="none"
              className={spec.id % 2 === 0 ? 'animate-sway-a' : 'animate-sway-b'}
            />
          </svg>
        </button>

        {/* Soft Blurred Drop-Shadow Grounding Ellipse */}
        <div
          className="w-10 h-3 rounded-full blur-[4px] mt-1 opacity-40 pointer-events-none"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        />
      </motion.div>
    </div>
  );
};
