import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface ParticleBurstProps {
  x: number;
  y: number;
  color: string;
  onComplete?: () => void;
}

interface BurstShard {
  id: number;
  angle: number;
  distance: number;
  size: number;
  rotation: number;
  duration: number;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  x,
  y,
  color,
  onComplete,
}) => {
  // Generate 10 glowing petal/shard particles
  const shards: BurstShard[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const angle = (i * (360 / 10) + (Math.random() * 20 - 10)) * (Math.PI / 180);
      const distance = 45 + Math.random() * 45;
      return {
        id: i,
        angle,
        distance,
        size: 4 + Math.random() * 4,
        rotation: Math.random() * 360,
        duration: 0.5 + Math.random() * 0.25,
      };
    });
  }, []);

  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {shards.map((shard, idx) => {
        const targetX = Math.cos(shard.angle) * shard.distance;
        const targetY = Math.sin(shard.angle) * shard.distance + 24; // subtle gravity drop

        return (
          <motion.div
            key={shard.id}
            className="absolute rounded-full"
            style={{
              width: `${shard.size}px`,
              height: `${shard.size * 1.5}px`,
              backgroundColor: color,
              boxShadow: `0 0 10px 2px ${color}`,
              borderRadius: '60% 40% 60% 40%',
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotate: shard.rotation,
            }}
            animate={{
              x: targetX,
              y: targetY,
              scale: [1, 0.7, 0],
              opacity: [1, 0.8, 0],
              rotate: shard.rotation + 90,
            }}
            transition={{
              duration: shard.duration,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={idx === 0 ? onComplete : undefined}
          />
        );
      })}
    </div>
  );
};
