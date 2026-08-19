/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NightGardenScene } from './components/NightGardenScene';
import { CinematicIntro } from './components/CinematicIntro';
import { LandingHero } from './components/LandingHero';
import { ScratchCardScene } from './components/ScratchCardScene';
import { MysteriousDoorScene } from './components/MysteriousDoorScene';
import { LanternReleaseScene } from './components/LanternReleaseScene';
import { WishCandleScene } from './components/WishCandleScene';
import { DarknessRestingScene } from './components/DarknessRestingScene';
import { WishRevealScene } from './components/WishRevealScene';
import { WishNotAcceptedScene } from './components/WishNotAcceptedScene';
import { WishAcceptedScene } from './components/WishAcceptedScene';
import { FinalRevealScene } from './components/FinalRevealScene';

export type Stage =
  | 'intro'
  | 'landing'
  | 'scratchCard'
  | 'mysteriousDoor'
  | 'lanternRelease'
  | 'wish'
  | 'darkness'
  | 'wishReveal'
  | 'wishAccepted'
  | 'wishNotAccepted'
  | 'finale';

export default function App() {
  const [stage, setStage] = useState<Stage>('intro');
  const [placeAnswer, setPlaceAnswer] = useState<string>('');

  const isDeepDark = stage === 'wish' || stage === 'darkness';

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#070408] flex items-center justify-center">
      {/* Full-Bleed Atmospheric Background for Desktop Framing */}
      {!isDeepDark && (
        <NightGardenScene stage={stage} dimmed={stage === 'intro'} scaleCamera={stage === 'intro' ? 1.08 : 1} />
      )}

      {/* Cinematic Frame Container (390x844, 48px rounded radius, immersive jewel shadows) */}
      <div className="relative w-full h-full sm:w-[390px] sm:h-[844px] sm:max-h-[92vh] sm:rounded-[48px] sm:overflow-hidden cinematic-shadow bg-[#0E0910] flex flex-col justify-between">
        {/* Inner Persistent Night Garden Layer inside the device viewport */}
        {!isDeepDark && (
          <NightGardenScene stage={stage} scaleCamera={stage === 'intro' ? 1.08 : 1} />
        )}

        {/* Scene State Machine Container */}
        <div className="relative z-10 w-full h-full flex flex-col pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
          <AnimatePresence mode="wait">
            {stage === 'intro' && (
              <motion.div
                key="intro-stage"
                className="absolute inset-0 w-full h-full"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <CinematicIntro onComplete={() => setStage('landing')} />
              </motion.div>
            )}

            {stage === 'landing' && (
              <motion.div
                key="landing-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <LandingHero onBegin={() => setStage('scratchCard')} />
              </motion.div>
            )}

            {stage === 'scratchCard' && (
              <motion.div
                key="scratch-card-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScratchCardScene onComplete={() => setStage('mysteriousDoor')} />
              </motion.div>
            )}

            {stage === 'mysteriousDoor' && (
              <motion.div
                key="mysterious-door-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <MysteriousDoorScene onComplete={() => setStage('lanternRelease')} />
              </motion.div>
            )}

            {stage === 'lanternRelease' && (
              <motion.div
                key="lantern-release-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <LanternReleaseScene onComplete={() => setStage('wish')} />
              </motion.div>
            )}

            {stage === 'wish' && (
              <motion.div
                key="wish-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <WishCandleScene onComplete={() => setStage('darkness')} />
              </motion.div>
            )}

            {stage === 'darkness' && (
              <motion.div
                key="darkness-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <DarknessRestingScene onContinue={() => setStage('wishReveal')} />
              </motion.div>
            )}

            {stage === 'wishReveal' && (
              <motion.div
                key="wish-reveal-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <WishRevealScene
                  onYes={() => setStage('wishAccepted')}
                  onNo={() => setStage('wishNotAccepted')}
                />
              </motion.div>
            )}

            {stage === 'wishAccepted' && (
              <motion.div
                key="wish-accepted-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <WishAcceptedScene onContinue={() => setStage('finale')} />
              </motion.div>
            )}

            {stage === 'wishNotAccepted' && (
              <motion.div
                key="wish-not-accepted-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                <WishNotAcceptedScene onContinue={() => setStage('finale')} />
              </motion.div>
            )}

            {stage === 'finale' && (
              <motion.div
                key="finale-stage"
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <FinalRevealScene
                  placeAnswer={placeAnswer}
                  onReplay={() => setStage('intro')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
