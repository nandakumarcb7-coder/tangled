/**
 * Scene Configuration, Palette Tokens, and Copy Strings
 * Atmospheric / Immersive Media Theme
 */

export const PALETTE = {
  nightBase: '#140F16',      // near-black charcoal-plum, primary canvas
  nightSurface: '#221A26',   // elevated panels, message cards
  accentGold: '#E8C48A',     // primary light source, glows, CTAs
  accentGoldHot: '#FFD9A0',  // bloom/flash highlight only
  accentRose: '#CE97A0',     // balloon 1, secondary accents
  accentLavender: '#A897C4', // balloon 2
  accentPlum: '#5B3A52',     // balloon 4, shadow tinting
  inkIvory: '#F6EEE4',       // primary text on dark
  inkIvoryMuted: '#CFC3C8',  // secondary/caption text
} as const;

export const MOTION_TOKENS = {
  easeReveal: [0.22, 1, 0.36, 1],
  easeSettle: [0.16, 1, 0.3, 1],
  easeTap: [0.34, 1.56, 0.64, 1],
  durationXs: 0.12,
  durationSm: 0.26,
  durationMd: 0.48,
  durationLg: 0.90,
} as const;

export const COPY = {
  landingTeaser: "Something brought you here,\nCall it what you will, fate, destiny",
  landingHint: "touch to begin",
  questionHeading: "Correct balloon kand pidikk",
  questionEmoji: "🎈",
  questionHint: "Touch one to find the way",
  question2Heading: "Which is your favourite place in Calicut",
  question2Placeholder: "type your answer…",
  wishInitialLine: "close your Eyes and make a wish",
  wishCandleLine: "If you blow this your wish will be show by God",
  wishCandleHint: "Double tap screen to extinguish ✨",
  wishRevealHeading: "Ooh so u wished for see me",
  wishNotAcceptedHeading: "Your wish is not accepted Njn varum 😌",
  wishAcceptedQuote: "All ur wishes will came to you....",
  darknessHint: "touch to continue",
  continuationNote: "touch for the secret… 💫",
  finaleBadge: "Wish Status: Approved 💖",
  finaleTwistHeader: "Just kidding!",
  finalePlaceSubtext: "Your wish has been granted!",
  finaleDateTitle: "Let's go together! ✨",
  finaleDateDetails: "A special date awaits us soon",
  replayHint: "Replay Experience ↺",
  // Scratch Card Scene
  scratchTitle: "Secret key for the Wishing Willow",
  scratchHint: "Scratch to reveal the secret key ✨",
  scratchCode: "S17T2002",
  scratchRevealed: "You found the key!",
  scratchNext: "Continue to the door →",
  // Mysterious Door Scene
  doorTitle: "The Wishing Willow awaits beyond",
  doorTapHint: "Tap the door to unlock",
  doorInputPlaceholder: "Enter the secret key…",
  doorOpenButton: "OPEN DOOR ✨",
  doorErrorMsg: "Wrong key! Check your scratch card 🔍",
};

export const balloonMessages = [
  "Thettichalloo 😴",              // attempt 1
  "Veendum thettichallo",          // attempt 2
  "Sheee ithum pooyi",             // attempt 3
  "You are eliminated to next round", // attempt 4 (final balloon)
];

export interface BalloonSpec {
  id: number;
  name: string;
  color: string;
  highlightColor: string;
  shadowColor: string;
  glowColor: string;
  // Field positions & aesthetic offsets
  offsetX: number;
  offsetY: number;
  scale: number;
  rotation: number;
  driftDuration: number;
  driftDelay: number;
  swayDuration: number;
}

export const BALLOON_SPECS: BalloonSpec[] = [
  {
    id: 0,
    name: 'Rose Balloon',
    color: '#CE97A0',
    highlightColor: '#F3D5DB',
    shadowColor: '#8E5A63',
    glowColor: 'rgba(206, 151, 160, 0.5)',
    offsetX: 15,
    offsetY: 20,
    scale: 0.98,
    rotation: -4.5,
    driftDuration: 4.8,
    driftDelay: 0.2,
    swayDuration: 4.4,
  },
  {
    id: 1,
    name: 'Lavender Balloon',
    color: '#A897C4',
    highlightColor: '#DFD5EE',
    shadowColor: '#6B5A8E',
    glowColor: 'rgba(168, 151, 196, 0.5)',
    offsetX: 40,
    offsetY: -18,
    scale: 1.04,
    rotation: 3.2,
    driftDuration: 5.6,
    driftDelay: 1.1,
    swayDuration: 5.0,
  },
  {
    id: 2,
    name: 'Gold Balloon',
    color: '#FFD9A0',
    highlightColor: '#FFF4E0',
    shadowColor: '#B28A47',
    glowColor: 'rgba(232, 196, 138, 0.6)',
    offsetX: 62,
    offsetY: 10,
    scale: 1.0,
    rotation: -2.2,
    driftDuration: 5.1,
    driftDelay: 0.6,
    swayDuration: 4.6,
  },
  {
    id: 3,
    name: 'Plum Balloon',
    color: '#8E5A7D',
    highlightColor: '#B882A6',
    shadowColor: '#5B3A52',
    glowColor: 'rgba(142, 90, 125, 0.5)',
    offsetX: 85,
    offsetY: -10,
    scale: 1.02,
    rotation: 4.0,
    driftDuration: 6.0,
    driftDelay: 1.7,
    swayDuration: 5.3,
  },
];
