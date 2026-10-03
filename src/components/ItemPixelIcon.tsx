'use client';

import React from 'react';

export interface ItemPixelIconProps {
  itemId: string;
  size?: number;
  className?: string;
}

export const ItemPixelIcon: React.FC<ItemPixelIconProps> = ({ itemId, size = 36, className = '' }) => {
  return (
    <div style={{ width: size, height: size }} className={`inline-block flex-shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 24 24"
        style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}
      >
        {/* Background Hanger / Stand glow */}
        <rect x="1" y="1" width="22" height="22" fill="#FAF5FF" rx="4" stroke="#E9D5FF" strokeWidth="1" />

        {/* OUTFITS */}
        {itemId === 'strawberry_apron' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Red Apron Body */}
            <rect x="7" y="7" width="10" height="12" fill="#E63946" rx="1" />
            {/* Apron Straps */}
            <rect x="8" y="5" width="2" height="3" fill="#F4A261" />
            <rect x="14" y="5" width="2" height="3" fill="#F4A261" />
            {/* Strawberry Leaf Top */}
            <rect x="10" y="8" width="4" height="2" fill="#2A9D8F" />
            {/* Strawberry Seeds */}
            <rect x="9" y="12" width="1" height="1" fill="#FFE3E3" />
            <rect x="14" y="12" width="1" height="1" fill="#FFE3E3" />
            <rect x="11" y="15" width="1" height="1" fill="#FFE3E3" />
            {/* White Frill Hem */}
            <rect x="7" y="18" width="10" height="2" fill="#FFFFFF" />
          </g>
        )}

        {itemId === 'cozy_sweater' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Sweater Body - Pastel Yellow */}
            <rect x="6" y="6" width="12" height="13" fill="#FDE047" rx="1" />
            {/* Sleeves */}
            <rect x="4" y="8" width="3" height="8" fill="#FACC15" />
            <rect x="17" y="8" width="3" height="8" fill="#FACC15" />
            {/* Lavender Turtle Neck */}
            <rect x="9" y="5" width="6" height="3" fill="#C084FC" />
            {/* Sweater Stripes */}
            <rect x="6" y="11" width="12" height="2" fill="#C084FC" />
            <rect x="6" y="15" width="12" height="2" fill="#A855F7" />
          </g>
        )}

        {itemId === 'party_dress' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Bodice - Frilly Purple */}
            <rect x="8" y="6" width="8" height="6" fill="#8B5CF6" />
            {/* Golden Sash */}
            <rect x="7" y="11" width="10" height="2" fill="#F59E0B" />
            <rect x="11" y="12" width="2" height="4" fill="#D97706" />
            {/* Wide Frilly Skirt */}
            <path d="M5 13 h14 L18 20 H6 Z" fill="#A855F7" />
            {/* Lace Trims */}
            <rect x="5" y="19" width="14" height="2" fill="#F472B6" />
            <rect x="9" y="7" width="6" height="1" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {itemId === 'witch_robe' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Midnight Purple Robe Body */}
            <rect x="6" y="6" width="12" height="14" fill="#4C1D95" rx="1" />
            {/* Wide Sorcerer Sleeves */}
            <rect x="3" y="8" width="4" height="9" fill="#5B21B6" />
            <rect x="17" y="8" width="4" height="9" fill="#5B21B6" />
            {/* Gold Trim & Magic Gem */}
            <rect x="11" y="6" width="2" height="14" fill="#F59E0B" />
            <rect x="10" y="9" width="4" height="3" fill="#EC4899" />
            {/* Star Sparkle */}
            <rect x="8" y="15" width="2" height="2" fill="#FDE047" />
            <rect x="14" y="15" width="2" height="2" fill="#FDE047" />
          </g>
        )}

        {itemId === 'angel_robe' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Heavenly White Robe */}
            <rect x="6" y="6" width="12" height="14" fill="#FFFFFF" rx="1" stroke="#E2E8F0" />
            {/* Angel Wings Backing */}
            <path d="M2 7 h4 v6 h-4 Z M18 7 h4 v6 h-4 Z" fill="#E0F2FE" />
            {/* Golden Collar & Belt */}
            <rect x="8" y="6" width="8" height="2" fill="#F59E0B" />
            <rect x="6" y="12" width="12" height="2" fill="#38BDF8" />
            {/* Golden Hem */}
            <rect x="6" y="18" width="12" height="2" fill="#F59E0B" />
          </g>
        )}

        {itemId === 'sakura_kimono' && (
          <g>
            {/* Hanger Hook */}
            <path d="M11 3 h2 v2 h-1 v1 h-3 v-1 h2 Z" fill="#94A3B8" />
            {/* Pink Kimono Body */}
            <rect x="5" y="6" width="14" height="14" fill="#F472B6" rx="1" />
            {/* Wide Kimono Sleeves */}
            <rect x="2" y="7" width="4" height="10" fill="#FB7185" />
            <rect x="18" y="7" width="4" height="10" fill="#FB7185" />
            {/* Red Obi Sash */}
            <rect x="7" y="11" width="10" height="4" fill="#E11D48" />
            <rect x="10" y="10" width="4" height="6" fill="#F59E0B" />
            {/* Cherry Blossom Flowers */}
            <rect x="7" y="8" width="2" height="2" fill="#FFFFFF" />
            <rect x="15" y="16" width="2" height="2" fill="#FFFFFF" />
          </g>
        )}

        {/* ACCESSORIES */}
        {itemId === 'pink_ribbon' && (
          <g>
            {/* Rosy Ribbon Bow */}
            <rect x="6" y="8" width="5" height="5" fill="#EC4899" rx="1" />
            <rect x="13" y="8" width="5" height="5" fill="#EC4899" rx="1" />
            <rect x="10" y="9" width="4" height="4" fill="#F472B6" />
            <rect x="11" y="10" width="2" height="2" fill="#BE185D" />
            {/* Ribbon Tails */}
            <rect x="8" y="13" width="3" height="5" fill="#F472B6" />
            <rect x="13" y="13" width="3" height="5" fill="#F472B6" />
          </g>
        )}

        {itemId === 'flower_pin' && (
          <g>
            {/* Daisy Petals */}
            <rect x="9" y="5" width="6" height="14" fill="#FFFFFF" rx="2" />
            <rect x="5" y="9" width="14" height="6" fill="#FFFFFF" rx="2" />
            <rect x="7" y="7" width="10" height="10" fill="#F8FAFC" rx="1" />
            {/* Center Yellow Pollen */}
            <rect x="10" y="10" width="4" height="4" fill="#F59E0B" rx="1" />
            {/* Green Leaf Clip */}
            <rect x="15" y="15" width="4" height="3" fill="#22C55E" />
          </g>
        )}

        {itemId === 'round_glasses' && (
          <g>
            {/* Left Gold Frame */}
            <rect x="4" y="9" width="7" height="7" fill="#F59E0B" rx="2" />
            <rect x="5" y="10" width="5" height="5" fill="#E0F2FE" />
            {/* Right Gold Frame */}
            <rect x="13" y="9" width="7" height="7" fill="#F59E0B" rx="2" />
            <rect x="14" y="10" width="5" height="5" fill="#E0F2FE" />
            {/* Bridge & Temples */}
            <rect x="11" y="11" width="2" height="2" fill="#D97706" />
            <rect x="2" y="11" width="2" height="1" fill="#D97706" />
            <rect x="20" y="11" width="2" height="1" fill="#D97706" />
            {/* Glass Glint */}
            <rect x="6" y="11" width="2" height="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="15" y="11" width="2" height="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}

        {itemId === 'headset' && (
          <g>
            {/* Headband Band */}
            <path d="M6 9 C6 4, 18 4, 18 9" fill="none" stroke="#A855F7" strokeWidth="2" />
            {/* Cat Ears */}
            <polygon points="5,7 8,2 9,7" fill="#EC4899" />
            <polygon points="19,7 16,2 15,7" fill="#EC4899" />
            <polygon points="6,6 8,3 8,6" fill="#F472B6" />
            <polygon points="18,6 16,3 16,6" fill="#F472B6" />
            {/* Ear Cups - Neon Blue */}
            <rect x="3" y="9" width="5" height="8" fill="#38BDF8" rx="2" />
            <rect x="16" y="9" width="5" height="8" fill="#38BDF8" rx="2" />
            <rect x="4" y="11" width="3" height="4" fill="#A855F7" />
            <rect x="17" y="11" width="3" height="4" fill="#A855F7" />
          </g>
        )}

        {itemId === 'halo' && (
          <g>
            {/* Glowing Golden Ring */}
            <ellipse cx="12" cy="11" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <ellipse cx="12" cy="11" rx="7" ry="3" fill="none" stroke="#FDE047" strokeWidth="1" />
            {/* Holy Glow */}
            <ellipse cx="12" cy="11" rx="9" ry="5" fill="none" stroke="#FEF08A" strokeWidth="1" opacity="0.5" />
            {/* Sparkles */}
            <rect x="4" y="6" width="2" height="2" fill="#FFFFFF" />
            <rect x="18" y="6" width="2" height="2" fill="#FFFFFF" />
            <rect x="12" y="16" width="1" height="3" fill="#F59E0B" opacity="0.6" />
          </g>
        )}

        {itemId === 'crown' && (
          <g>
            {/* Golden Royal Crown */}
            <polygon points="4,16 5,7 9,12 12,5 15,12 19,7 20,16" fill="#F59E0B" />
            <rect x="4" y="15" width="16" height="3" fill="#D97706" rx="1" />
            {/* Red Velvet Interior Cushion */}
            <polygon points="6,15 7,10 12,8 17,10 18,15" fill="#DC2626" opacity="0.7" />
            {/* Ruby Jewels */}
            <rect x="11" y="4" width="2" height="2" fill="#EF4444" />
            <rect x="4" y="6" width="2" height="2" fill="#3B82F6" />
            <rect x="18" y="6" width="2" height="2" fill="#3B82F6" />
            <rect x="11" y="15" width="2" height="2" fill="#EF4444" />
          </g>
        )}

        {/* Fallback for 'none' or unknown */}
        {(itemId === 'none' || (![
          'strawberry_apron', 'cozy_sweater', 'party_dress', 'witch_robe', 'angel_robe', 'sakura_kimono',
          'pink_ribbon', 'flower_pin', 'round_glasses', 'headset', 'halo', 'crown'
        ].includes(itemId))) && (
          <g>
            <circle cx="12" cy="12" r="6" fill="#CBD5E1" />
            <line x1="8" y1="8" x2="16" y2="16" stroke="#64748B" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default ItemPixelIcon;
