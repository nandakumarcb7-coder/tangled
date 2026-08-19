import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BALLOON_SPECS, BalloonSpec, COPY, balloonMessages } from '../lib/sceneConfig';
import { Balloon } from './Balloon';
import { ParticleBurst } from './ParticleBurst';
import { FloatingMessage } from './FloatingMessage';

interface BalloonQuestionProps {
  onComplete: () => void;
}

interface PoppedState {
  id: number;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  message: string;
  scaleMultiplier: number;
}

export const BalloonQuestion: React.FC<BalloonQuestionProps> = ({ onComplete }) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [activeBurst, setActiveBurst] = useState<PoppedState | null>(null);
  const [floatingMessage, setFloatingMessage] = useState<PoppedState | null>(null);
  const [isInputLocked, setIsInputLocked] = useState<boolean>(false);
  const [isFinalTransitioning, setIsFinalTransitioning] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePop = (spec: BalloonSpec, clientX: number, clientY: number) => {
    if (isInputLocked || isFinalTransitioning) return;
    setIsInputLocked(true);

    const attemptIndex = poppedBalloons.length; // 0, 1, 2, 3
    const nextPopped = [...poppedBalloons, spec.id];
    const isFinalBalloon = nextPopped.length >= BALLOON_SPECS.length;

    // Get message based on attempt number
    const messageText = balloonMessages[attemptIndex] || balloonMessages[balloonMessages.length - 1];
    const scaleMultiplier = 1.0 + attemptIndex * 0.02; // 1.0, 1.02, 1.04, 1.06

    let posX = clientX;
    let posY = clientY;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      posX = clientX - rect.left;
      posY = clientY - rect.top;
    }

    // Safe fallback bounds
    if (isNaN(posX) || posX <= 0) {
      posX = (spec.offsetX / 100) * 340 + 20;
    }
    if (isNaN(posY) || posY <= 0) {
      posY = 240 + spec.offsetY;
    }

    const state: PoppedState = {
      id: spec.id,
      x: posX,
      y: posY,
      color: spec.color,
      glowColor: spec.glowColor,
      message: messageText,
      scaleMultiplier,
    };

    setActiveBurst(state);
    setFloatingMessage(state);

    setTimeout(() => {
      setPoppedBalloons(nextPopped);
      if (!isFinalBalloon) {
        setIsInputLocked(false);
      }
    }, 280);

    // If this was the 4th (final) balloon, hold so the message can be read, then trigger the bloom/transition
    if (isFinalBalloon) {
      setIsFinalTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 1800);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-full flex flex-col justify-between py-8 px-4 select-none overflow-hidden"
    >
      {/* Top Question Header */}
      <motion.div
        className="text-center pt-4 px-3"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <h1 className="font-serif-display text-2xl sm:text-[30px] text-[#F6EEE4] leading-tight font-light tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
          {COPY.questionHeading}{' '}
          <span className="font-sans inline-block ml-1" role="img" aria-label="balloon">
            {COPY.questionEmoji}
          </span>
        </h1>
      </motion.div>

      {/* Organic Balloon Arc Field */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[360px] h-[360px] flex items-center justify-between px-1">
          {BALLOON_SPECS.map((spec) => {
            const isPopped = poppedBalloons.includes(spec.id);

            return (
              <div
                key={spec.id}
                style={{
                  transform: `translateY(${spec.offsetY}px) scale(${spec.scale})`,
                  visibility: isPopped ? 'hidden' : 'visible',
                  pointerEvents: isPopped ? 'none' : 'auto',
                }}
                className="relative z-20"
              >
                <Balloon
                  spec={spec}
                  onPop={handlePop}
                  disabled={isInputLocked || isFinalTransitioning || isPopped}
                />
              </div>
            );
          })}
        </div>

        {/* Dynamic Particle Burst Layer */}
        {activeBurst && (
          <ParticleBurst
            key={`burst-${activeBurst.id}`}
            x={activeBurst.x}
            y={activeBurst.y}
            color={activeBurst.color}
            onComplete={() => setActiveBurst(null)}
          />
        )}

        {/* Floating Teasing Response Pill with Attempt-Driven Message */}
        {floatingMessage && (
          <FloatingMessage
            key={`msg-${floatingMessage.id}-${floatingMessage.scaleMultiplier}`}
            x={floatingMessage.x}
            y={floatingMessage.y}
            message={floatingMessage.message}
            glowColor={floatingMessage.glowColor}
            scaleMultiplier={floatingMessage.scaleMultiplier}
            onDismiss={() => setFloatingMessage(null)}
          />
        )}
      </div>

      {/* Atmospheric Hint Text */}
      <motion.div
        className="text-center pb-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 1.0, delay: 0.4 }}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#CFC3C8] font-medium">
          {COPY.questionHint}
        </p>
      </motion.div>

      {/* Full-screen Radiant Bloom for Final Balloon Transition */}
      <AnimatePresence>
        {isFinalTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none bg-radial from-[#FFF3D6] via-[#E8C48A]/85 to-[#140F16]"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.4, 0.95], scale: [0.4, 1.2, 2.0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
