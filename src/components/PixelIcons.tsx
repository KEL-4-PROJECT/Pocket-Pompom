'use client';

import React from 'react';

export interface PixelIconProps {
  size?: number;
  className?: string;
}

const baseStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  shapeRendering: 'crispEdges' as const,
};

// 1. Pixel Coin (Gold with sparkle)
export const PixelCoin: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="4" y="2" width="8" height="12" fill="#F1A208" />
    <rect x="2" y="4" width="12" height="8" fill="#F1A208" />
    <rect x="5" y="3" width="6" height="10" fill="#FFD166" />
    <rect x="3" y="5" width="10" height="6" fill="#FFD166" />
    <rect x="5" y="4" width="3" height="3" fill="#FFFDF5" />
    <rect x="7" y="7" width="2" height="4" fill="#E08E00" />
  </svg>
);

// 2. Pixel Hunger (Chicken Drumstick / Onigiri)
export const PixelHunger: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="6" y="2" width="6" height="7" fill="#C8553D" />
    <rect x="5" y="3" width="8" height="5" fill="#C8553D" />
    <rect x="7" y="3" width="3" height="3" fill="#F28F3B" />
    <rect x="4" y="9" width="4" height="4" fill="#FFFDF5" />
    <rect x="2" y="11" width="3" height="3" fill="#FFFDF5" />
  </svg>
);

// 3. Pixel Energy (Yellow Lightning Bolt)
export const PixelEnergy: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="9,1 4,8 8,8 6,15 13,6 9,6" fill="#FFD166" />
    <polygon points="8,3 5,8 8,8 7,13 11,7 9,7" fill="#FFFDF5" />
  </svg>
);

// 4. Pixel Happiness (Pink/Red Heart)
export const PixelHappiness: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="3" width="4" height="4" fill="#FF4D6D" />
    <rect x="9" y="3" width="4" height="4" fill="#FF4D6D" />
    <rect x="2" y="5" width="12" height="5" fill="#FF4D6D" />
    <rect x="4" y="10" width="8" height="3" fill="#FF4D6D" />
    <rect x="6" y="13" width="4" height="2" fill="#FF4D6D" />
    <rect x="4" y="4" width="2" height="2" fill="#FFB3C1" />
  </svg>
);

// 5. Pixel Cleanliness (Soap Bubble)
export const PixelCleanliness: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="4" y="2" width="8" height="12" fill="#4EA8DE" />
    <rect x="2" y="4" width="12" height="8" fill="#4EA8DE" />
    <rect x="5" y="3" width="6" height="10" fill="#90E0EF" />
    <rect x="3" y="5" width="10" height="6" fill="#90E0EF" />
    <rect x="4" y="4" width="3" height="3" fill="#FFFFFF" />
  </svg>
);

// 6. Navigation Buttons Icons
export const PixelFeedIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="8,2 14,12 2,12" fill="#F4A261" />
    <rect x="5" y="8" width="6" height="4" fill="#E76F51" />
    <rect x="6" y="4" width="4" height="2" fill="#2A9D8F" />
  </svg>
);

export const PixelBathIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="8" width="12" height="6" fill="#48CAE4" />
    <rect x="1" y="8" width="14" height="2" fill="#90E0EF" />
    <circle cx="5" cy="5" r="2" fill="#CAF0F8" />
    <circle cx="10" cy="4" r="1.5" fill="#CAF0F8" />
  </svg>
);

export const PixelPlayIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="5" width="12" height="7" fill="#7209B7" />
    <rect x="4" y="3" width="8" height="2" fill="#B5179E" />
    <rect x="4" y="7" width="3" height="3" fill="#F72585" />
    <circle cx="11" cy="8.5" r="1" fill="#4CC9F0" />
  </svg>
);

export const PixelSleepIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <path d="M12 2A8 8 0 1 0 14 10A7 7 0 0 1 12 2Z" fill="#F4C0D5" />
    <rect x="2" y="11" width="2" height="2" fill="#FFD166" />
    <rect x="13" y="12" width="2" height="2" fill="#FFD166" />
  </svg>
);

export const PixelWardrobeIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="2" width="10" height="12" fill="#9B5DE5" />
    <rect x="4" y="3" width="8" height="10" fill="#F15BB5" />
    <rect x="7" y="2" width="2" height="12" fill="#7209B7" />
    <rect x="5" y="7" width="1" height="2" fill="#FEE440" />
    <rect x="10" y="7" width="1" height="2" fill="#FEE440" />
  </svg>
);

export const PixelLightIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="6" y="2" width="4" height="2" fill="#F4A261" />
    <polygon points="8,4 12,12 4,12" fill="#FFD166" />
    <rect x="7" y="12" width="2" height="3" fill="#E76F51" />
  </svg>
);

export const PixelCloseIcon: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="3" width="10" height="10" fill="#E63946" />
    <path d="M5 5L11 11M11 5L5 11" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

export const PixelToothbrushIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="11" width="12" height="3" fill="#48CAE4" />
    <rect x="3" y="7" width="4" height="4" fill="#FFFFFF" />
  </svg>
);

export const PixelToiletIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="2" width="10" height="6" fill="#EDF2F4" />
    <rect x="2" y="8" width="12" height="6" fill="#8D99AE" />
    <rect x="4" y="9" width="8" height="4" fill="#FFFFFF" />
  </svg>
);

export const PixelBathtubIcon: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="1" y="6" width="14" height="7" fill="#FFFFFF" />
    <rect x="2" y="13" width="3" height="2" fill="#2B2D42" />
    <rect x="11" y="13" width="3" height="2" fill="#2B2D42" />
    <rect x="3" y="4" width="3" height="3" fill="#90E0EF" />
  </svg>
);

export const PixelAudioIcon: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="3,6 6,6 9,3 9,13 6,10 3,10" fill="#3A86FF" />
    <path d="M11 5C12 7 12 9 11 11" stroke="#3A86FF" strokeWidth="1.5" fill="none" />
    <path d="M13 3C15 7 15 9 13 13" stroke="#3A86FF" strokeWidth="1.5" fill="none" />
  </svg>
);

export const PixelMuteIcon: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="3,6 6,6 9,3 9,13 6,10 3,10" fill="#8D99AE" />
    <line x1="11" y1="5" x2="15" y2="11" stroke="#E63946" strokeWidth="1.5" />
    <line x1="15" y1="5" x2="11" y2="11" stroke="#E63946" strokeWidth="1.5" />
  </svg>
);

// --- FOOD & DRINK PIXEL ICONS ---
export const PixelMochi: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="6" width="10" height="7" fill="#FFB7C5" rx="3" />
    <rect x="5" y="4" width="6" height="3" fill="#2A9D8F" rx="1" />
    <rect x="5" y="7" width="2" height="2" fill="#FFFFFF" opacity="0.8" />
    <rect x="4" y="9" width="8" height="3" fill="#F472B6" />
  </svg>
);

export const PixelOnigiri: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="8,2 14,13 2,13" fill="#FFFFFF" />
    <polygon points="8,3 13,12 3,12" fill="#F8FAFC" />
    <rect x="6" y="8" width="4" height="5" fill="#1E293B" />
  </svg>
);

export const PixelPudding: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <path d="M4 6 H12 L14 13 H2 Z" fill="#FDE047" />
    <path d="M4 6 H12 L13 9 H3 Z" fill="#B45309" />
    <circle cx="8" cy="4" r="2" fill="#EF4444" />
  </svg>
);

export const PixelPancake: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="10" width="12" height="4" fill="#D97706" rx="2" />
    <rect x="3" y="6" width="10" height="4" fill="#F59E0B" rx="2" />
    <rect x="4" y="3" width="8" height="3" fill="#FCD34D" rx="1" />
    <rect x="7" y="2" width="2" height="2" fill="#FEE440" />
  </svg>
);

export const PixelShortcake: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="8,2 14,13 2,13" fill="#FFFFFF" />
    <polygon points="8,5 13,13 3,13" fill="#F472B6" />
    <rect x="2" y="11" width="12" height="2" fill="#FFFFFF" />
    <circle cx="8" cy="3" r="2" fill="#EF4444" />
  </svg>
);

export const PixelBento: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="3" width="12" height="10" fill="#991B1B" rx="1" />
    <rect x="3" y="4" width="10" height="8" fill="#F59E0B" />
    <rect x="4" y="5" width="3" height="3" fill="#FFFFFF" />
    <rect x="5" y="6" width="1" height="1" fill="#EF4444" />
    <rect x="8" y="5" width="4" height="2" fill="#22C55E" />
    <rect x="8" y="8" width="4" height="3" fill="#E11D48" />
  </svg>
);

export const PixelMilk: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="4" y="5" width="8" height="9" fill="#FFFFFF" rx="1" />
    <polygon points="8,1 12,5 4,5" fill="#38BDF8" />
    <rect x="5" y="8" width="6" height="3" fill="#38BDF8" />
  </svg>
);

export const PixelBoba: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="7" y="1" width="2" height="5" fill="#EC4899" />
    <path d="M4 5 H12 L11 14 H5 Z" fill="#FDBA74" />
    <rect x="3" y="4" width="10" height="2" fill="#FFFFFF" />
    <circle cx="6" cy="11" r="1" fill="#1E293B" />
    <circle cx="8" cy="12" r="1" fill="#1E293B" />
    <circle cx="10" cy="11" r="1" fill="#1E293B" />
  </svg>
);

export const PixelMatcha: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <path d="M3 5 H13 L12 13 H4 Z" fill="#15803D" />
    <rect x="3" y="4" width="10" height="2" fill="#DCFCE7" />
    <rect x="5" y="7" width="6" height="1" fill="#86EFAC" />
  </svg>
);

export const PixelSoda: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="9" y="1" width="2" height="5" fill="#F43F5E" />
    <path d="M4 5 H12 L11 14 H5 Z" fill="#FB7185" />
    <rect x="3" y="4" width="10" height="2" fill="#FFFFFF" />
    <rect x="5" y="7" width="2" height="2" fill="#FFFFFF" opacity="0.6" />
    <rect x="8" y="9" width="2" height="2" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const PixelElixir: React.FC<PixelIconProps> = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="7" y="2" width="2" height="2" fill="#CBD5E1" />
    <rect x="6" y="4" width="4" height="2" fill="#E2E8F0" />
    <circle cx="8" cy="10" r="5" fill="#A855F7" />
    <circle cx="8" cy="10" r="3" fill="#C084FC" />
    <rect x="7" y="9" width="2" height="2" fill="#FFFFFF" />
  </svg>
);

// --- GENERAL UI & DECORATION PIXEL ICONS ---
export const PixelStrawberry: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <path d="M4 6 C4 3, 12 3, 12 6 C12 11, 8 15, 8 15 C8 15, 4 11, 4 6 Z" fill="#EF4444" />
    <polygon points="8,1 5,4 11,4" fill="#22C55E" />
    <rect x="6" y="6" width="1" height="1" fill="#FFE4E6" />
    <rect x="9" y="8" width="1" height="1" fill="#FFE4E6" />
    <rect x="6" y="10" width="1" height="1" fill="#FFE4E6" />
  </svg>
);

export const PixelStar: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#F59E0B" />
    <polygon points="8,3 9.5,6.5 13,6.5 10,8.5 11,12 8,10 5,12 6,8.5 3,6.5 6.5,6.5" fill="#FDE047" />
  </svg>
);

export const PixelSparkle: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="8,1 9.5,6.5 15,8 9.5,9.5 8,15 6.5,9.5 1,8 6.5,6.5" fill="#F59E0B" />
    <polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#FFFFFF" />
  </svg>
);

export const PixelRock: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="4,3 12,2 15,8 13,14 3,13 1,7" fill="#64748B" />
    <polygon points="5,4 11,3 14,8 12,13 4,12 2,7" fill="#94A3B8" />
    <rect x="4" y="5" width="4" height="2" fill="#CBD5E1" />
  </svg>
);

export const PixelSpike: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <polygon points="3,15 8,2 13,15" fill="#E11D48" />
    <polygon points="4,14 8,4 12,14" fill="#F43F5E" />
    <line x1="8" y1="4" x2="8" y2="14" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
  </svg>
);

export const PixelRibbon: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="4" width="5" height="5" fill="#EC4899" rx="1" />
    <rect x="9" y="4" width="5" height="5" fill="#EC4899" rx="1" />
    <rect x="6" y="5" width="4" height="3" fill="#F472B6" />
    <rect x="4" y="9" width="3" height="5" fill="#F472B6" />
    <rect x="9" y="9" width="3" height="5" fill="#F472B6" />
  </svg>
);

export const PixelOutfit: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <path d="M5 3 H11 L13 7 L11 8 V14 H5 V8 L3 7 Z" fill="#A855F7" />
    <rect x="6" y="3" width="4" height="2" fill="#F472B6" />
    <rect x="5" y="8" width="6" height="2" fill="#F59E0B" />
  </svg>
);

export const PixelStore: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="6" width="10" height="8" fill="#EC4899" rx="1" />
    <path d="M5 6 C5 3, 11 3, 11 6" fill="none" stroke="#BE185D" strokeWidth="2" />
    <rect x="5" y="8" width="6" height="4" fill="#FDF2F8" />
  </svg>
);

export const PixelUser: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <circle cx="8" cy="5" r="3" fill="#EC4899" />
    <path d="M3 14 C3 10, 13 10, 13 14 Z" fill="#EC4899" />
  </svg>
);

export const PixelShower: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="12" y="1" width="2" height="7" fill="#64748B" />
    <rect x="6" y="1" width="8" height="2" fill="#64748B" />
    <polygon points="4,3 8,3 6,6" fill="#94A3B8" />
    <circle cx="4" cy="9" r="1" fill="#38BDF8" />
    <circle cx="6" cy="11" r="1" fill="#38BDF8" />
    <circle cx="5" cy="13" r="1" fill="#38BDF8" />
  </svg>
);

export const PixelTimer: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <circle cx="8" cy="9" r="6" fill="#38BDF8" />
    <circle cx="8" cy="9" r="4.5" fill="#E0F2FE" />
    <rect x="7" y="1" width="2" height="2" fill="#0284C7" />
    <rect x="7.5" y="6" width="1" height="3.5" fill="#0369A1" />
    <rect x="8" y="8.5" width="2.5" height="1" fill="#0369A1" />
  </svg>
);

export const PixelCloud: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="3" y="7" width="10" height="5" fill="#FFFFFF" rx="2" />
    <circle cx="6" cy="7" r="3" fill="#FFFFFF" />
    <circle cx="10" cy="7.5" r="2.5" fill="#FFFFFF" />
    <rect x="3" y="10" width="10" height="2" fill="#E2E8F0" />
  </svg>
);

export const PixelMirror: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <ellipse cx="8" cy="6" rx="5" ry="4" fill="#94A3B8" />
    <ellipse cx="8" cy="6" rx="3.8" ry="3" fill="#E0F2FE" />
    <rect x="7" y="10" width="2" height="5" fill="#64748B" />
    <rect x="7.5" y="7" width="1" height="2" fill="#FFFFFF" />
  </svg>
);

export const PixelArcade: React.FC<PixelIconProps> = ({ size = 20, className = '' }) => (
  <svg viewBox="0 0 16 16" style={{ width: size, height: size, ...baseStyle }} className={className}>
    <rect x="2" y="4" width="12" height="8" fill="#8B5CF6" rx="2" />
    <rect x="4" y="7" width="4" height="2" fill="#DDD6FE" />
    <rect x="5" y="6" width="2" height="4" fill="#DDD6FE" />
    <circle cx="11" cy="7" r="1" fill="#EC4899" />
    <circle cx="13" cy="9" r="1" fill="#F59E0B" />
  </svg>
);

