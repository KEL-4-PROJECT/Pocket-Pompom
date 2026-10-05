'use client';

import React, { useState } from 'react';
import PompomPixel from '@/components/PompomPixel';
import {
  PixelCoin,
  PixelMochi,
  PixelOnigiri,
  PixelPudding,
  PixelPancake,
  PixelShortcake,
  PixelBento,
  PixelMilk,
  PixelBoba,
  PixelMatcha,
  PixelSoda,
  PixelElixir,
} from '@/components/PixelIcons';
import { Pet } from '@/lib/petService';
import { audioEngine } from '@/lib/audioService';

export interface FoodItem {
  id: string;
  name: string;
  type: 'food' | 'drink';
  cost: number;
  hungerGain?: number;
  energyGain?: number;
  happinessGain?: number;
  description: string;
  iconKey: string;
}

const renderFoodIcon = (iconKey: string, size = 28) => {
  switch (iconKey) {
    case 'mochi':
      return <PixelMochi size={size} />;
    case 'onigiri':
      return <PixelOnigiri size={size} />;
    case 'pudding':
      return <PixelPudding size={size} />;
    case 'pancake':
      return <PixelPancake size={size} />;
    case 'shortcake':
      return <PixelShortcake size={size} />;
    case 'bento':
      return <PixelBento size={size} />;
    case 'milk':
      return <PixelMilk size={size} />;
    case 'boba':
      return <PixelBoba size={size} />;
    case 'matcha':
      return <PixelMatcha size={size} />;
    case 'soda':
      return <PixelSoda size={size} />;
    case 'elixir':
      return <PixelElixir size={size} />;
    default:
      return <PixelMochi size={size} />;
  }
};

const FOOD_MENU: FoodItem[] = [
  { id: 'strawberry_mochi', name: 'Strawberry Mochi', type: 'food', cost: 80, hungerGain: 15, happinessGain: 5, description: 'Soft strawberry rice cake', iconKey: 'mochi' },
  { id: 'onigiri', name: 'Triangle Onigiri', type: 'food', cost: 150, hungerGain: 40, description: 'Rice triangle wrapped in nori', iconKey: 'onigiri' },
  { id: 'caramel_pudding', name: 'Caramel Pudding', type: 'food', cost: 200, hungerGain: 35, happinessGain: 15, description: 'Custard with caramel glaze', iconKey: 'pudding' },
  { id: 'rainbow_pancake', name: 'Rainbow Pancake', type: 'food', cost: 350, hungerGain: 55, happinessGain: 20, description: 'Fluffy pancake stack', iconKey: 'pancake' },
  { id: 'strawberry_shortcake', name: 'Strawberry Shortcake', type: 'food', cost: 500, hungerGain: 75, happinessGain: 30, description: 'Layer cake with fresh cream', iconKey: 'shortcake' },
  { id: 'royal_golden_bento', name: 'Royal Golden Bento', type: 'food', cost: 850, hungerGain: 100, happinessGain: 40, description: 'Royal bento feast', iconKey: 'bento' },
];

const DRINK_MENU: FoodItem[] = [
  { id: 'warm_milk', name: 'Warm Milk', type: 'drink', cost: 100, energyGain: 15, happinessGain: 10, description: 'Comforting glass of milk', iconKey: 'milk' },
  { id: 'boba_tea', name: 'Boba Milk Tea', type: 'drink', cost: 250, energyGain: 30, happinessGain: 25, description: 'Sweet tea with boba pearls', iconKey: 'boba' },
  { id: 'matcha_latte', name: 'Matcha Latte', type: 'drink', cost: 320, energyGain: 40, happinessGain: 20, description: 'Rich Uji matcha latte', iconKey: 'matcha' },
  { id: 'berry_soda', name: 'Berry Soda', type: 'drink', cost: 400, energyGain: 50, happinessGain: 35, description: 'Fizzy sparkling soda', iconKey: 'soda' },
  { id: 'starlight_elixir', name: 'Starlight Elixir', type: 'drink', cost: 900, energyGain: 100, happinessGain: 50, description: 'Magical glowing potion', iconKey: 'elixir' },
];

export interface DiningRoomViewProps {
  pet: Pet;
  onFeedItem: (item: FoodItem) => Promise<void>;
  onExit: () => void;
}

export const DiningRoomView: React.FC<DiningRoomViewProps> = ({
  pet,
  onFeedItem,
  onExit,
}) => {
  const [activeTab, setActiveTab] = useState<'food' | 'drink'>('food');
  const [currentPlateItem, setCurrentPlateItem] = useState<FoodItem | null>(null);
  const [isEating, setIsEating] = useState(false);
  const [message, setMessage] = useState('Welcome to Pompom\'s Dining Room! Select food to serve on the table');

  const handleSelectFood = async (item: FoodItem) => {
    if (pet.coins < item.cost) {
      audioEngine.playLoseSound();
      setMessage(`Not enough coins for ${item.name}! (Need ${item.cost} Coins)`);
      return;
    }

    setCurrentPlateItem(item);
    setIsEating(true);
    audioEngine.playEatSound();
    setMessage(`Serving ${item.name} on the plate! Yum nom nom~`);

    await onFeedItem(item);

    setTimeout(() => {
      setIsEating(false);
      setCurrentPlateItem(null);
      setMessage(`Pompom finished eating ${item.name}! So satisfied~`);
    }, 2800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-amber-100 via-orange-100 to-amber-200 text-slate-800 font-mono select-none p-4 md:p-6 overflow-y-auto animate-fade-in">
      {/* Background Retro Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8B5A3C 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Header Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur-md border border-orange-200">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 rounded-xl bg-orange-500 px-4 py-2 text-xs font-black text-white shadow hover:bg-orange-600 active:scale-95 transition-all"
        >
          <span>⬅ Return to Living Room</span>
        </button>

        <h1 className="text-sm md:text-base font-black tracking-wider text-orange-700">
          DINING ROOM & KITCHEN
        </h1>

        <div className="flex items-center space-x-2 rounded-xl bg-amber-100 px-3 py-1.5 font-black text-amber-800 shadow-inner">
          <PixelCoin size={20} />
          <span className="text-xs md:text-sm">{pet.coins}</span>
        </div>
      </header>

      {/* Main Dining Room Scene */}
      <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
        {/* Dialog Message */}
        <div className="mb-4 max-w-md rounded-2xl bg-white px-5 py-2.5 text-center text-xs font-bold text-slate-800 shadow-lg border-2 border-orange-300">
          <p>{message}</p>
        </div>

        {/* 16-Bit SVG Kitchen & Dining Table Background */}
        <div className="relative h-72 w-full max-w-xl rounded-3xl bg-orange-50 p-4 border-4 border-orange-300 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
          {/* Kitchen Wall Tiles & Shelf in Background */}
          <svg viewBox="0 0 320 180" className="absolute inset-0 w-full h-full pointer-events-none" style={{ shapeRendering: 'crispEdges' }}>
            {/* Kitchen Tiles */}
            <rect x="0" y="0" width="320" height="120" fill="#FFF8F0" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="120" stroke="#FFE3CD" strokeWidth="1" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="320" y2={i * 20} stroke="#FFE3CD" strokeWidth="1" />
            ))}
            {/* Kitchen Shelf & Utensils */}
            <rect x="30" y="25" width="100" height="6" fill="#8C5A3C" rx="1" />
            <rect x="40" y="15" width="8" height="10" fill="#E63946" />
            <rect x="55" y="12" width="10" height="13" fill="#48CAE4" />
            <rect x="72" y="16" width="12" height="9" fill="#FFD166" />

            {/* Pastel Refrigerator on Right */}
            <rect x="250" y="10" width="55" height="110" fill="#90E0EF" rx="4" />
            <rect x="250" y="45" width="55" height="2" fill="#0077B6" />
            <rect x="255" y="25" width="4" height="15" fill="#FFFFFF" rx="1" />
            <rect x="255" y="55" width="4" height="20" fill="#FFFFFF" rx="1" />

            {/* Wooden Floor */}
            <rect x="0" y="120" width="320" height="60" fill="#D9A066" />
            <line x1="0" y1="140" x2="320" y2="140" stroke="#B87B43" strokeWidth="1" />
            <line x1="0" y1="160" x2="320" y2="160" stroke="#B87B43" strokeWidth="1" />
          </svg>

          {/* Pompom Sitting at Table */}
          <div className="relative z-10 mt-2">
            <PompomPixel
              state={isEating ? 'eating' : 'idle'}
              outfit={pet.equipped_outfit}
              accessory={pet.equipped_accessory}
              size={170}
            />
          </div>

          {/* Wooden Dining Table in Foreground */}
          <div className="relative z-20 w-full h-20 rounded-2xl bg-amber-900 border-t-4 border-amber-700 shadow-xl flex items-center justify-center">
            {/* Ceramic Plate */}
            <div className="relative flex items-center justify-center w-28 h-10 bg-white rounded-full border-2 border-slate-300 shadow-inner">
              {currentPlateItem ? (
                <div className="animate-bounce flex items-center justify-center">
                  {renderFoodIcon(currentPlateItem.iconKey, 32)}
                </div>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">Empty Plate</span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Food & Drink Selection Carousel Bar */}
      <footer className="relative z-10 mx-auto w-full max-w-4xl rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur-md border border-orange-200">
        {/* Category Tabs */}
        <div className="mb-3 flex space-x-3">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2 text-xs font-black transition-all ${
              activeTab === 'food' ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-100 text-orange-900'
            }`}
          >
            <PixelBento size={18} />
            <span>Food Menu</span>
          </button>
          <button
            onClick={() => setActiveTab('drink')}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2 text-xs font-black transition-all ${
              activeTab === 'drink' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-100 text-amber-900'
            }`}
          >
            <PixelBoba size={18} />
            <span>Drink Menu</span>
          </button>
        </div>

        {/* Menu Cards List */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
          {(activeTab === 'food' ? FOOD_MENU : DRINK_MENU).map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectFood(item)}
              className="cursor-pointer flex items-center justify-between rounded-xl bg-orange-50 p-2.5 border border-orange-200 hover:border-orange-400 hover:bg-orange-100 transition-all active:scale-95"
            >
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  {renderFoodIcon(item.iconKey, 28)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800">{item.name}</h4>
                  <div className="flex space-x-1 text-[9px] font-bold text-orange-600">
                    {item.hungerGain && <span>+{item.hungerGain}% H</span>}
                    {item.energyGain && <span>+{item.energyGain}% E</span>}
                    {item.happinessGain && <span>+{item.happinessGain}% Happy</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 rounded-lg bg-amber-400 px-2 py-1 text-[11px] font-black text-slate-900 shadow">
                <PixelCoin size={14} />
                <span>{item.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default DiningRoomView;

