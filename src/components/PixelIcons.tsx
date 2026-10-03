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
