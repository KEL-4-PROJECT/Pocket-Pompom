'use client';

import React, { useState } from 'react';
import PompomPixel from '@/components/PompomPixel';
import { PixelCoin, PixelCleanliness, PixelToothbrushIcon, PixelToiletIcon, PixelBathtubIcon } from '@/components/PixelIcons';
import { Pet } from '@/lib/petService';
import { audioEngine } from '@/lib/audioService';

export interface BathroomViewProps {
  pet: Pet;
  onUpdateStats: (updates: Partial<Pet>) => Promise<void>;
  onFinishBath: () => Promise<void>;
  onExit: () => void;
}

export const BathroomView: React.FC<BathroomViewProps> = ({
  pet,
  onUpdateStats,
  onFinishBath,
  onExit,
}) => {
  const [station, setStation] = useState<'bathtub' | 'toothbrush' | 'toilet'>('bathtub');
  const [isSoapy, setIsSoapy] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);
  const [message, setMessage] = useState('Welcome to Pompom\'s Cozy Bathroom! 🛁');

  // Bathtub Soap
  const handleApplySoap = () => {
    audioEngine.playWaterSplash();
    setIsSoapy(true);
    setMessage('Rubbed bubbly soap foam on Pompom! Scrub scrub scrub~ 🧼');
  };

  // Bathtub Rinse
  const handleRinseClean = async () => {
    audioEngine.playWaterSplash();
    setIsSoapy(false);
    const newClean = Math.min(100, pet.cleanliness + 60);
    setMessage('Shower rinsed all soap away! Pompom is squeaky clean! 🚿 (+60% Clean)');
    await onUpdateStats({ cleanliness: newClean });
  };

  // Toothbrushing
  const handleBrushTeeth = async () => {
    audioEngine.playWaterSplash();
    setIsBrushing(true);
    setMessage('Brushing Pompom\'s teeth... Sparkly white smile! 🪥✨');

    setTimeout(async () => {
      setIsBrushing(false);
      const newClean = Math.min(100, pet.cleanliness + 25);
      setMessage('Finished brushing! Fresh minty breath~ (+25% Clean)');
      await onUpdateStats({ cleanliness: newClean });
    }, 2000);
  };

  // Toilet Flush
  const handleToiletFlush = async () => {
    audioEngine.playWaterSplash();
    audioEngine.playCoinSound();
    setIsFlushing(true);
    setMessage('Flush! Pompom earned +10 bonus coins for hygiene! 🚽🪙');

    const newClean = Math.min(100, pet.cleanliness + 15);
    const newHunger = Math.max(0, pet.hunger - 5);
    const newCoins = pet.coins + 10;

    await onUpdateStats({ cleanliness: newClean, hunger: newHunger, coins: newCoins });

    setTimeout(() => {
      setIsFlushing(false);
    }, 1800);
  };

  // Finish Bath
  const handleCompleteBath = async () => {
    audioEngine.playWinSound();
    await onFinishBath();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-sky-100 via-cyan-100 to-sky-200 text-slate-800 font-mono select-none p-4 md:p-6 overflow-y-auto animate-fade-in">
      {/* Background Retro Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0077B6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Header Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur-md border border-sky-200">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-black text-white shadow hover:bg-sky-700 active:scale-95 transition-all"
        >
          <span>⬅ Return to Living Room</span>
        </button>

        <h1 className="text-sm md:text-base font-black tracking-wider text-sky-700">
          COZY PASTEL BATHROOM 🛁
        </h1>

        <div className="flex items-center space-x-2 rounded-xl bg-sky-100 px-3 py-1.5 font-black text-sky-800 shadow-inner">
          <PixelCleanliness size={20} />
          <span className="text-xs md:text-sm">{pet.cleanliness}%</span>
        </div>
      </header>

      {/* Main Bathroom Scene */}
      <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
        {/* Message Dialog */}
        <div className="mb-4 max-w-md rounded-2xl bg-white px-5 py-2.5 text-center text-xs font-bold text-slate-800 shadow-lg border-2 border-sky-300">
          <p>{message}</p>
        </div>

        {/* 16-Bit SVG Bathroom Background & Furniture */}
        <div className="relative h-80 w-full max-w-xl rounded-3xl bg-sky-50 p-4 border-4 border-sky-300 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
          {/* Bathroom Wall & Tiles */}
          <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full pointer-events-none" style={{ shapeRendering: 'crispEdges' }}>
            {/* Wall Tiles */}
            <rect x="0" y="0" width="320" height="140" fill="#E0F7FA" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="140" stroke="#B2EBF2" strokeWidth="1" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="320" y2={i * 20} stroke="#B2EBF2" strokeWidth="1" />
            ))}

            {/* Floor Tiles */}
            <rect x="0" y="140" width="320" height="60" fill="#80DEEA" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 20} y1="140" x2={i * 20} y2="200" stroke="#4DD0E1" strokeWidth="1" />
            ))}

            {/* Bathtub Structure */}
            {station === 'bathtub' && (
              <g id="bathtub-env">
                <rect x="50" y="110" width="220" height="65" fill="#FFFFFF" rx="8" />
                <rect x="40" y="105" width="240" height="12" fill="#E0F7FA" rx="4" />
                <rect x="60" y="120" width="200" height="40" fill="#80D8FF" rx="4" opacity="0.7" />
                {/* Shower Head */}
                <rect x="250" y="30" width="6" height="80" fill="#B0BEC5" />
                <rect x="230" y="30" width="26" height="6" fill="#B0BEC5" />
                <polygon points="225,36 235,36 230,45" fill="#78909C" />
              </g>
            )}

            {/* Sink Structure */}
            {station === 'toothbrush' && (
              <g id="sink-env">
                {/* Mirror */}
                <rect x="130" y="15" width="60" height="70" fill="#E0F7FA" rx="6" />
                <rect x="125" y="10" width="70" height="80" fill="#80DEEA" rx="8" opacity="0.4" />
                {/* Sink */}
                <rect x="110" y="110" width="100" height="45" fill="#FFFFFF" rx="4" />
                <rect x="100" y="105" width="120" height="10" fill="#E0F7FA" rx="3" />
                <rect x="145" y="85" width="10" height="25" fill="#B0BEC5" />
              </g>
            )}

            {/* Toilet Structure */}
            {station === 'toilet' && (
              <g id="toilet-env">
                <rect x="120" y="45" width="80" height="75" fill="#FFFFFF" rx="6" />
                <rect x="115" y="40" width="90" height="10" fill="#E0F7FA" rx="3" />
                <rect x="110" y="115" width="100" height="55" fill="#FFFFFF" rx="8" />
                <rect x="180" y="55" width="12" height="6" fill="#B0BEC5" rx="1" />
              </g>
            )}
          </svg>

          {/* Station Visual Pompom Character */}
          <div className="relative z-10 my-auto">
            <PompomPixel
              state={isBrushing ? 'play' : pet.is_sleeping ? 'sleeping' : 'idle'}
              outfit={pet.equipped_outfit}
              accessory={pet.equipped_accessory}
              isDirty={pet.cleanliness < 40 && !isSoapy}
              isSoapy={isSoapy}
              size={station === 'bathtub' ? 190 : 170}
            />
          </div>
        </div>
      </main>

      {/* Interactive Station Selection & Action Controls Footer */}
      <footer className="relative z-10 mx-auto w-full max-w-4xl rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur-md border border-sky-200">
        {/* Station Navigation Tabs */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          <button
            onClick={() => setStation('bathtub')}
            className={`flex items-center justify-center space-x-2 rounded-xl py-2 text-xs font-black transition-all ${
              station === 'bathtub' ? 'bg-sky-500 text-white shadow-md' : 'bg-sky-100 text-sky-900'
            }`}
          >
            <PixelBathtubIcon size={18} />
            <span>Bathtub</span>
          </button>

          <button
            onClick={() => setStation('toothbrush')}
            className={`flex items-center justify-center space-x-2 rounded-xl py-2 text-xs font-black transition-all ${
              station === 'toothbrush' ? 'bg-sky-500 text-white shadow-md' : 'bg-sky-100 text-sky-900'
            }`}
          >
            <PixelToothbrushIcon size={18} />
            <span>Toothbrush</span>
          </button>

          <button
            onClick={() => setStation('toilet')}
            className={`flex items-center justify-center space-x-2 rounded-xl py-2 text-xs font-black transition-all ${
              station === 'toilet' ? 'bg-sky-500 text-white shadow-md' : 'bg-sky-100 text-sky-900'
            }`}
          >
            <PixelToiletIcon size={18} />
            <span>Toilet</span>
          </button>
        </div>

        {/* Station Actions */}
        <div className="rounded-2xl bg-sky-50 p-3 text-center border border-sky-200">
          {station === 'bathtub' && (
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleApplySoap}
                className="rounded-xl bg-pink-400 px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-pink-500 active:scale-95"
              >
                🧼 Apply Bubbly Soap
              </button>
              <button
                onClick={handleRinseClean}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-sky-600 active:scale-95"
              >
                🚿 Rinse Clean (+60%)
              </button>
            </div>
          )}

          {station === 'toothbrush' && (
            <div className="flex justify-center">
              <button
                onClick={handleBrushTeeth}
                disabled={isBrushing}
                className="rounded-xl bg-indigo-500 px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-indigo-600 disabled:opacity-50 active:scale-95"
              >
                {isBrushing ? 'Brushing Teeth... ✨' : '🪥 Brush Teeth (+25%)'}
              </button>
            </div>
          )}

          {station === 'toilet' && (
            <div className="flex justify-center">
              <button
                onClick={handleToiletFlush}
                disabled={isFlushing}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-emerald-600 disabled:opacity-50 active:scale-95"
              >
                {isFlushing ? 'Flushing... 🚽' : '🚽 Flush Toilet (+10 Coins Bonus!)'}
              </button>
            </div>
          )}
        </div>

        {/* Finish Bath Button */}
        <div className="mt-3">
          <button
            onClick={handleCompleteBath}
            className="w-full rounded-2xl bg-sky-600 py-3 text-xs font-black text-white shadow-lg hover:bg-sky-700 active:scale-95"
          >
            ✨ Finish Bath & Restore 100% Cleanliness
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BathroomView;
