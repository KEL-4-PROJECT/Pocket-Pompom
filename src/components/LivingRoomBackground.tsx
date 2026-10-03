'use client';

import React, { useState } from 'react';
import { audioEngine } from '@/lib/audioService';

export interface LivingRoomBackgroundProps {
  isNightMode?: boolean;
  onInteractPlant?: () => void;
  onInteractFireplace?: () => void;
  onInteractClock?: () => void;
  onInteractBookshelf?: () => void;
  onInteractWindow?: () => void;
  children?: React.ReactNode;
}

export const LivingRoomBackground: React.FC<LivingRoomBackgroundProps> = ({
  isNightMode = false,
  onInteractPlant,
  onInteractFireplace,
  onInteractClock,
  onInteractBookshelf,
  onInteractWindow,
  children,
}) => {
  const [weather, setWeather] = useState<'sunny' | 'rainbow' | 'night'>(
    isNightMode ? 'night' : 'sunny'
  );

  const handleWindowClick = () => {
    audioEngine.playPopSound();
    setWeather((prev) => {
      if (prev === 'sunny') return 'rainbow';
      if (prev === 'rainbow') return 'night';
      return 'sunny';
    });
    if (onInteractWindow) onInteractWindow();
  };

  const handleFireplaceClick = () => {
    audioEngine.playPopSound();
    if (onInteractFireplace) onInteractFireplace();
  };

  const handleClockClick = () => {
    audioEngine.playCoinSound();
    if (onInteractClock) onInteractClock();
  };

  const handlePlantClick = () => {
    audioEngine.playWaterSplash();
    if (onInteractPlant) onInteractPlant();
  };

  const handleBookshelfClick = () => {
    audioEngine.playPopSound();
    if (onInteractBookshelf) onInteractBookshelf();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-between min-h-[480px] rounded-3xl overflow-hidden shadow-2xl transition-colors duration-500 border-4 border-amber-200 dark:border-slate-700">
      <style>{`
        @keyframes fireFlicker {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes cloudFloat {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(120px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .anim-fire { animation: fireFlicker 0.4s ease-in-out infinite; }
        .anim-cloud { animation: cloudFloat 18s linear infinite; }
        .anim-star { animation: starTwinkle 1.5s ease-in-out infinite; }
      `}</style>

      {/* SVG Pixel Living Room Background (Wallpaper, Flooring, Window, Furniture) */}
      <svg
        viewBox="0 0 320 280"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* ================================================================== */}
        {/* WALLPAPER (Top 70% of room)                                        */}
        {/* ================================================================== */}
        <rect
          x="0"
          y="0"
          width="320"
          height="200"
          fill={isNightMode ? '#1E1B4B' : '#FFF5EB'}
        />
        {/* Striped Wallpaper Pattern */}
        {Array.from({ length: 16 }).map((_, i) => (
          <rect
            key={i}
            x={i * 20}
            y="0"
            width="10"
            height="200"
            fill={isNightMode ? '#2E2A72' : '#FFECE0'}
            opacity="0.5"
          />
        ))}

        {/* Baseboard Moulding Trim */}
        <rect
          x="0"
          y="196"
          width="320"
          height="6"
          fill={isNightMode ? '#3730A3' : '#E6C4A8'}
        />

        {/* ================================================================== */}
        {/* HARDWOOD FLOORING (Bottom 30% of room)                             */}
        {/* ================================================================== */}
        <rect
          x="0"
          y="202"
          width="320"
          height="78"
          fill={isNightMode ? '#111827' : '#D9A066'}
        />
        {/* Wooden Floor Planks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="0"
            y={202 + i * 10}
            width="320"
            height="1"
            fill={isNightMode ? '#1F2937' : '#B87B43'}
          />
        ))}

        {/* Checkered Mochi Carpet / Rug under Pompom */}
        <rect
          x="80"
          y="225"
          width="160"
          height="45"
          fill={isNightMode ? '#312E81' : '#FCE7F3'}
          rx="6"
        />
        <rect
          x="85"
          y="228"
          width="150"
          height="39"
          fill={isNightMode ? '#4338CA' : '#F472B6'}
          opacity="0.3"
          rx="4"
        />

        {/* ================================================================== */}
        {/* WALL PICTURE FRAMES                                                */}
        {/* ================================================================== */}
        {/* Picture Frame Left */}
        <rect
          x="20"
          y="40"
          width="36"
          height="46"
          fill={isNightMode ? '#4338CA' : '#8C5A3C'}
        />
        <rect
          x="23"
          y="43"
          width="30"
          height="40"
          fill={isNightMode ? '#312E81' : '#FFFDF5'}
        />
        {/* Mini Strawberry Art */}
        <rect x="33" y="58" width="10" height="12" fill="#E63946" />
        <rect x="36" y="54" width="4" height="4" fill="#2A9D8F" />

        {/* Picture Frame Right */}
        <rect
          x="264"
          y="40"
          width="36"
          height="46"
          fill={isNightMode ? '#4338CA' : '#8C5A3C'}
        />
        <rect
          x="267"
          y="43"
          width="30"
          height="40"
          fill={isNightMode ? '#312E81' : '#FFFDF5'}
        />
        {/* Mini Heart Art */}
        <polygon points="282,56 276,64 288,64" fill="#FF4D6D" />
        <circle cx="279" cy="56" r="3" fill="#FF4D6D" />
        <circle cx="285" cy="56" r="3" fill="#FF4D6D" />
      </svg>

      {/* ====================================================================== */}
      {/* INTERACTIVE CLICKABLE FURNITURE ITEMS OVERLAY                           */}
      {/* ====================================================================== */}

      {/* 1. Interactive Wall Clock */}
      <div
        onClick={handleClockClick}
        className="absolute top-6 left-1/2 -translate-x-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        title="Click Clock to check time!"
      >
        <svg viewBox="0 0 24 24" className="w-9 h-9 shape-crisp">
          <circle cx="12" cy="12" r="10" fill="#8C5A3C" />
          <circle cx="12" cy="12" r="8" fill="#FFFDF5" />
          <rect x="11.5" y="6" width="1" height="6" fill="#3D2314" />
          <rect x="12" y="11.5" width="5" height="1" fill="#3D2314" />
          <circle cx="12" cy="12" r="1.5" fill="#E63946" />
        </svg>
      </div>

      {/* 2. Interactive Pixel Window */}
      <div
        onClick={handleWindowClick}
        className="absolute top-10 left-20 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="Click Window to change sky weather!"
      >
        <div className="relative w-24 h-28 overflow-hidden rounded-xl border-4 border-amber-800 bg-sky-300 dark:border-indigo-900 shadow-md">
          {/* Sky Background depending on weather state */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              weather === 'sunny'
                ? 'bg-gradient-to-b from-sky-400 to-sky-200'
                : weather === 'rainbow'
                ? 'bg-gradient-to-b from-indigo-300 via-pink-200 to-amber-200'
                : 'bg-gradient-to-b from-slate-950 to-indigo-950'
            }`}
          >
            {/* Sun / Moon */}
            {weather === 'sunny' && (
              <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-amber-300 shadow-md border-2 border-amber-400" />
            )}
            {weather === 'rainbow' && (
              <div className="absolute top-4 inset-x-0 h-8 rounded-full border-t-4 border-pink-400 border-b-4 border-amber-300 opacity-80" />
            )}
            {weather === 'night' && (
              <>
                <div className="absolute top-2 right-3 h-5 w-5 rounded-full bg-amber-100 shadow" />
                <div className="absolute top-4 left-3 h-1 w-1 bg-white rounded-full anim-star" />
                <div className="absolute top-10 left-10 h-1.5 w-1.5 bg-white rounded-full anim-star" />
              </>
            )}

            {/* Floating Pixel Clouds */}
            <div className="absolute top-8 left-0 text-xs anim-cloud opacity-80">☁️</div>
          </div>

          {/* Window Frame Panes */}
          <div className="absolute inset-0 pointer-events-none border-r-2 border-b-2 border-amber-900/60 dark:border-indigo-900/60" />
        </div>
      </div>

      {/* 3. Interactive Cozy Fireplace */}
      <div
        onClick={handleFireplaceClick}
        className="absolute bottom-16 left-6 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="Click Fireplace for cozy warmth!"
      >
        <svg viewBox="0 0 36 44" className="w-16 h-20 shape-crisp">
          {/* Brick Frame */}
          <rect x="2" y="2" width="32" height="40" fill="#9C4027" rx="2" />
          <rect x="4" y="4" width="28" height="6" fill="#B85235" />
          {/* Fire Opening */}
          <rect x="8" y="16" width="20" height="26" fill="#2B140E" rx="1" />
          {/* Fire Flames */}
          <g className="anim-fire">
            <polygon points="18,22 13,38 23,38" fill="#F4A261" />
            <polygon points="18,26 15,38 21,38" fill="#E76F51" />
            <polygon points="18,30 16,38 20,38" fill="#FFD166" />
          </g>
          {/* Wooden Logs */}
          <rect x="11" y="36" width="14" height="4" fill="#5C3823" rx="1" />
        </svg>
      </div>

      {/* 4. Interactive House Plant */}
      <div
        onClick={handlePlantClick}
        className="absolute bottom-16 right-6 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        title="Click Plant to water!"
      >
        <svg viewBox="0 0 32 40" className="w-14 h-18 shape-crisp">
          {/* Clay Pot */}
          <rect x="8" y="24" width="16" height="14" fill="#C8553D" rx="1" />
          <rect x="6" y="22" width="20" height="4" fill="#E26D5C" rx="1" />
          {/* Green Leaves */}
          <circle cx="16" cy="14" r="9" fill="#2A9D8F" />
          <circle cx="11" cy="12" r="7" fill="#264653" />
          <circle cx="21" cy="12" r="7" fill="#E9C46A" opacity="0.3" />
          <circle cx="16" cy="9" r="6" fill="#2A9D8F" />
        </svg>
      </div>

      {/* 5. Interactive Bookshelf Cabinet */}
      <div
        onClick={handleBookshelfClick}
        className="absolute top-12 right-12 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title="Click Bookshelf to read fairy tales!"
      >
        <svg viewBox="0 0 32 44" className="w-14 h-20 shape-crisp">
          <rect x="2" y="2" width="28" height="40" fill="#6F452A" rx="2" />
          <rect x="4" y="4" width="24" height="16" fill="#4A2E1B" />
          <rect x="4" y="22" width="24" height="16" fill="#4A2E1B" />
          {/* Books */}
          <rect x="6" y="8" width="4" height="12" fill="#E63946" />
          <rect x="11" y="6" width="4" height="14" fill="#48CAE4" />
          <rect x="16" y="10" width="5" height="10" fill="#FFD166" />
          <rect x="22" y="7" width="4" height="13" fill="#9B5DE5" />
          {/* Lower Shelf Toy */}
          <circle cx="12" cy="30" r="4" fill="#F472B6" />
          <rect x="18" y="27" width="7" height="7" fill="#38BDF8" rx="1" />
        </svg>
      </div>

      {/* ====================================================================== */}
      {/* CENTER STAGE: POMPOM CHARACTER                                         */}
      {/* ====================================================================== */}
      <div className="relative z-20 my-auto flex flex-col items-center pt-24 pb-8">
        {children}
      </div>
    </div>
  );
};

export default LivingRoomBackground;
