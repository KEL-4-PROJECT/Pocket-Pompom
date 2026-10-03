'use client';

import React, { useState } from 'react';
import PompomPixel from '@/components/PompomPixel';
import ItemPixelIcon from '@/components/ItemPixelIcon';
import { PixelCoin } from '@/components/PixelIcons';
import { Pet, InventoryItem } from '@/lib/petService';
import { audioEngine } from '@/lib/audioService';

export interface BoutiqueCatalogItem {
  id: string;
  name: string;
  type: 'outfit' | 'accessory';
  cost: number;
  description: string;
}

const BOUTIQUE_OUTFITS: BoutiqueCatalogItem[] = [
  { id: 'strawberry_apron', name: 'Strawberry Apron', type: 'outfit', cost: 150, description: 'Cute red apron with strawberry seeds' },
  { id: 'cozy_sweater', name: 'Cozy Sweater', type: 'outfit', cost: 1200, description: 'Warm pastel yellow & lavender sweater' },
  { id: 'party_dress', name: 'Party Dress', type: 'outfit', cost: 2800, description: 'Frilly purple gown with golden sash' },
  { id: 'witch_robe', name: 'Witch Robe', type: 'outfit', cost: 5000, description: 'Mystical midnight purple mage robe' },
  { id: 'angel_robe', name: 'Angel Robe', type: 'outfit', cost: 8500, description: 'Heavenly white robe with golden trim' },
  { id: 'sakura_kimono', name: 'Sakura Kimono', type: 'outfit', cost: 15000, description: 'Traditional cherry blossom kimono' },
];

const BOUTIQUE_ACCESSORIES: BoutiqueCatalogItem[] = [
  { id: 'pink_ribbon', name: 'Pink Ribbon', type: 'accessory', cost: 100, description: 'Charming rosy hair ribbon' },
  { id: 'flower_pin', name: 'Flower Pin', type: 'accessory', cost: 600, description: 'Bright daisy flower hair clip' },
  { id: 'round_glasses', name: 'Round Glasses', type: 'accessory', cost: 1500, description: 'Retro intellectual round frames' },
  { id: 'headset', name: 'Cat Ear Headset', type: 'accessory', cost: 4000, description: 'Cute gamer headset with cat ears' },
  { id: 'halo', name: 'Golden Halo', type: 'accessory', cost: 7500, description: 'Divine glowing golden halo' },
  { id: 'crown', name: 'Royal Crown', type: 'accessory', cost: 12500, description: 'Golden crown with ruby jewel' },
];

export interface WardrobeViewProps {
  pet: Pet;
  inventory: InventoryItem[];
  onEquipItem: (type: 'outfit' | 'accessory', itemId: string) => Promise<void>;
  onBuyAndEquipItem: (item: BoutiqueCatalogItem) => Promise<void>;
  onExit: () => void;
}

export const WardrobeView: React.FC<WardrobeViewProps> = ({
  pet,
  inventory,
  onEquipItem,
  onBuyAndEquipItem,
  onExit,
}) => {
  const [activeTab, setActiveTab] = useState<'closet' | 'boutique'>('closet');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'outfit' | 'accessory'>('all');
  const [previewOutfit, setPreviewOutfit] = useState<string | null>(null);
  const [previewAccessory, setPreviewAccessory] = useState<string | null>(null);
  const [message, setMessage] = useState('Selamat datang di Lemari Pompom! Coba-coba baju di depan cermin 🪞');

  const currentOutfit = previewOutfit ?? pet.equipped_outfit;
  const currentAccessory = previewAccessory ?? pet.equipped_accessory;

  const handleEquipCloset = async (type: 'outfit' | 'accessory', itemId: string) => {
    audioEngine.playPopSound();
    setPreviewOutfit(null);
    setPreviewAccessory(null);
    await onEquipItem(type, itemId);
    if (itemId === 'none') {
      setMessage(`Dilepas! Pompom kembali polos ✨`);
    } else {
      setMessage(`Dipakai: ${itemId.replace('_', ' ')}! Pompom makin imut~ ✨`);
    }
  };

  const handleBuyItem = async (item: BoutiqueCatalogItem) => {
    if (pet.coins < item.cost) {
      audioEngine.playLoseSound();
      setMessage(`Koin tidak cukup untuk ${item.name}! (Butuh 🪙 ${item.cost})`);
      return;
    }

    audioEngine.playCoinSound();
    setPreviewOutfit(null);
    setPreviewAccessory(null);
    await onBuyAndEquipItem(item);
    setMessage(`Berhasil membeli & memakai ${item.name}! 🎉`);
  };

  // Filter closet inventory by subcategory
  const filteredInventory = inventory.filter((invItem) => {
    if (categoryFilter === 'all') return true;
    return invItem.item_type === categoryFilter;
  });

  // Filter boutique catalog by subcategory
  const filteredCatalog = [...BOUTIQUE_OUTFITS, ...BOUTIQUE_ACCESSORIES].filter((bItem) => {
    if (categoryFilter === 'all') return true;
    return bItem.type === categoryFilter;
  });

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-pink-100 via-purple-100 to-pink-200 text-slate-800 font-mono select-none p-4 md:p-6 overflow-y-auto animate-fade-in">
      {/* Background Retro Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#9B5DE5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Header Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl bg-white/80 p-3 shadow-lg backdrop-blur-md border border-pink-200">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 rounded-xl bg-pink-600 px-4 py-2 text-xs font-black text-white shadow hover:bg-pink-700 active:scale-95 transition-all"
        >
          <span>⬅ Kembali ke Ruang Tengah</span>
        </button>

        <h1 className="text-sm md:text-base font-black tracking-wider text-pink-700">
          POMPOM DRESSING ROOM & BOUTIQUE 🎀
        </h1>

        <div className="flex items-center space-x-2 rounded-xl bg-amber-100 px-3 py-1.5 font-black text-amber-800 shadow-inner">
          <PixelCoin size={20} />
          <span className="text-xs md:text-sm">{pet.coins.toLocaleString()}</span>
        </div>
      </header>

      {/* Main Dressing Room Scene */}
      <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
        {/* Message Dialog */}
        <div className="mb-4 max-w-md rounded-2xl bg-white px-5 py-2.5 text-center text-xs font-bold text-slate-800 shadow-lg border-2 border-pink-300">
          <p>{message}</p>
        </div>

        {/* 16-Bit SVG Fitting Room & Closet Environment */}
        <div className="relative h-80 w-full max-w-xl rounded-3xl bg-pink-50 p-4 border-4 border-pink-300 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
          {/* Environment Background */}
          <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full pointer-events-none" style={{ shapeRendering: 'crispEdges' }}>
            {/* Wallpaper with Vertical Pastel Stripes */}
            <rect x="0" y="0" width="320" height="140" fill="#FDE2E4" />
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={i * 20} y="0" width="10" height="140" fill="#FFCAD4" opacity="0.4" />
            ))}

            {/* Wooden Parquet Floor */}
            <rect x="0" y="140" width="320" height="60" fill="#D9A066" />
            <line x1="0" y1="160" x2="320" y2="160" stroke="#B87B43" strokeWidth="1" />
            <line x1="0" y1="180" x2="320" y2="180" stroke="#B87B43" strokeWidth="1" />

            {/* GRAND OPEN WOODEN CLOSET CABINET (Left Side) */}
            <rect x="10" y="10" width="110" height="140" fill="#8C5A3C" rx="6" stroke="#5C3823" strokeWidth="2" />
            <rect x="15" y="15" width="100" height="130" fill="#4A2C1B" rx="3" />
            {/* Inner Shelves */}
            <rect x="15" y="65" width="100" height="4" fill="#8C5A3C" />
            <rect x="15" y="105" width="100" height="4" fill="#8C5A3C" />

            {/* TOP RACK: Hanging Clothes & Coat Hangers */}
            <rect x="20" y="22" width="90" height="3" fill="#D9A066" />

            {/* Hanging Apron */}
            <path d="M26 25 h4 v2 h-2 v1 h-1 Z" fill="#94A3B8" />
            <rect x="24" y="28" width="8" height="18" fill="#E63946" rx="1" />
            <rect x="26" y="30" width="4" height="2" fill="#2A9D8F" />

            {/* Hanging Sweater */}
            <path d="M42 25 h4 v2 h-2 v1 h-1 Z" fill="#94A3B8" />
            <rect x="39" y="28" width="10" height="20" fill="#FDE047" rx="1" />
            <rect x="39" y="34" width="10" height="4" fill="#C084FC" />

            {/* Hanging Party Dress */}
            <path d="M58 25 h4 v2 h-2 v1 h-1 Z" fill="#94A3B8" />
            <rect x="55" y="28" width="10" height="26" fill="#8B5CF6" rx="1" />
            <rect x="54" y="38" width="12" height="4" fill="#F59E0B" />

            {/* Hanging Witch Robe */}
            <path d="M74 25 h4 v2 h-2 v1 h-1 Z" fill="#94A3B8" />
            <rect x="71" y="28" width="10" height="30" fill="#4C1D95" rx="1" />
            <rect x="75" y="30" width="2" height="26" fill="#F59E0B" />

            {/* Hanging Sakura Kimono */}
            <path d="M90 25 h4 v2 h-2 v1 h-1 Z" fill="#94A3B8" />
            <rect x="87" y="28" width="11" height="28" fill="#F472B6" rx="1" />
            <rect x="88" y="36" width="9" height="6" fill="#E11D48" />

            {/* MIDDLE SHELF: Accessories Display Velvet Cushion */}
            <rect x="20" y="73" width="90" height="28" fill="#581C87" rx="2" />
            {/* Displayed Ribbon */}
            <rect x="24" y="80" width="12" height="10" fill="#EC4899" rx="2" />
            {/* Displayed Flower Pin */}
            <circle cx="48" cy="85" r="5" fill="#FFFFFF" />
            <circle cx="48" cy="85" r="2" fill="#F59E0B" />
            {/* Displayed Glasses */}
            <rect x="60" y="82" width="6" height="6" fill="#F59E0B" rx="1" />
            <rect x="68" y="82" width="6" height="6" fill="#F59E0B" rx="1" />
            {/* Displayed Headset */}
            <path d="M78 86 C78 78, 90 78, 90 86" fill="none" stroke="#A855F7" strokeWidth="2" />
            <rect x="76" y="84" width="4" height="6" fill="#38BDF8" />
            <rect x="88" y="84" width="4" height="6" fill="#38BDF8" />

            {/* BOTTOM SHELF: Crown & Halo Display Box */}
            <rect x="20" y="113" width="90" height="24" fill="#2E1065" rx="2" />
            {/* Golden Halo */}
            <ellipse cx="38" cy="123" rx="10" ry="4" fill="none" stroke="#F59E0B" strokeWidth="2" />
            {/* Royal Crown */}
            <polygon points="70,130 72,118 77,124 80,116 83,124 88,118 90,130" fill="#F59E0B" />
            <rect x="70" y="128" width="20" height="3" fill="#D97706" />

            {/* FULL-LENGTH FITTING MIRROR (Right Side) */}
            <rect x="225" y="10" width="80" height="145" fill="#8C5A3C" rx="10" stroke="#5C3823" strokeWidth="2" />
            <rect x="232" y="17" width="66" height="131" fill="#E0F7FA" rx="6" />
            {/* Mirror Glass Glint Lines */}
            <polygon points="236,25 255,25 240,140 236,140" fill="#FFFFFF" opacity="0.35" />
            <polygon points="262,25 272,25 252,140 242,140" fill="#FFFFFF" opacity="0.2" />

            {/* Fitting Pedestal Rug */}
            <ellipse cx="170" cy="168" rx="45" ry="12" fill="#F472B6" opacity="0.6" />
            <ellipse cx="170" cy="168" rx="40" ry="10" fill="#FCE7F3" opacity="0.8" />
          </svg>

          {/* Pompom Standing in Front of Mirror on Pedestal */}
          <div className="relative z-10 my-auto">
            <PompomPixel
              state="play"
              outfit={currentOutfit}
              accessory={currentAccessory}
              size={185}
            />
          </div>
        </div>
      </main>

      {/* Closet / Boutique Selection Controls Footer */}
      <footer className="relative z-10 mx-auto w-full max-w-4xl rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur-md border border-pink-200">
        {/* Main Location Tabs */}
        <div className="mb-3 flex space-x-3">
          <button
            onClick={() => setActiveTab('closet')}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition-all ${
              activeTab === 'closet' ? 'bg-pink-500 text-white shadow-md' : 'bg-pink-100 text-pink-900'
            }`}
          >
            👚 Lemari Saya ({inventory.length})
          </button>

          <button
            onClick={() => setActiveTab('boutique')}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition-all ${
              activeTab === 'boutique' ? 'bg-purple-500 text-white shadow-md' : 'bg-purple-100 text-purple-900'
            }`}
          >
            🛍️ Katalog Butik Premium
          </button>
        </div>

        {/* Sub-category Filter Buttons (Outfit vs Accessory vs All) */}
        <div className="mb-3 flex items-center justify-center space-x-2 bg-pink-50 p-1.5 rounded-2xl border border-pink-200">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 text-[11px] font-black rounded-xl transition-all ${
              categoryFilter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-pink-100'
            }`}
          >
            🌟 Semua Item
          </button>

          <button
            onClick={() => setCategoryFilter('outfit')}
            className={`flex items-center space-x-1 px-3 py-1 text-[11px] font-black rounded-xl transition-all ${
              categoryFilter === 'outfit'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white text-pink-700 hover:bg-pink-100'
            }`}
          >
            <span>👗</span>
            <span>Kategori Baju (Outfits)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('accessory')}
            className={`flex items-center space-x-1 px-3 py-1 text-[11px] font-black rounded-xl transition-all ${
              categoryFilter === 'accessory'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-purple-700 hover:bg-purple-100'
            }`}
          >
            <span>🎀</span>
            <span>Kategori Aksesori</span>
          </button>
        </div>

        {/* Closet Grid View */}
        {activeTab === 'closet' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1">
            {filteredInventory.length === 0 ? (
              <p className="col-span-3 text-center text-xs font-bold text-slate-500 py-6">
                {categoryFilter === 'all'
                  ? 'Lemari baju kamu masih kosong! Beli item di Katalog Butik Premium.'
                  : categoryFilter === 'outfit'
                  ? 'Belum ada baju/outfit di lemari kamu.'
                  : 'Belum ada aksesori di lemari kamu.'}
              </p>
            ) : (
              filteredInventory.map((invItem) => {
                const isEquipped =
                  invItem.item_type === 'outfit'
                    ? pet.equipped_outfit === invItem.item_id
                    : pet.equipped_accessory === invItem.item_id;

                return (
                  <div
                    key={invItem.id}
                    className="flex items-center justify-between rounded-2xl bg-pink-50/80 p-2.5 border border-pink-200 shadow-sm hover:border-pink-300 transition-all"
                  >
                    <div className="flex items-center space-x-2.5">
                      <ItemPixelIcon itemId={invItem.item_id} size={40} />
                      <div>
                        <h4 className="text-xs font-black text-slate-800 capitalize leading-tight">
                          {invItem.item_id.replace('_', ' ')}
                        </h4>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          invItem.item_type === 'outfit' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {invItem.item_type === 'outfit' ? '👗 Outfit' : '🎀 Aksesori'}
                        </span>
                      </div>
                    </div>

                    {isEquipped ? (
                      <button
                        onClick={() => handleEquipCloset(invItem.item_type, 'none')}
                        className="rounded-xl bg-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-300 active:scale-95 transition-all"
                      >
                        Unequip
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEquipCloset(invItem.item_type, invItem.item_id)}
                        className="rounded-xl bg-pink-500 px-3 py-1.5 text-[11px] font-black text-white shadow hover:bg-pink-600 active:scale-95 transition-all"
                      >
                        Equip
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Boutique Catalog View */}
        {activeTab === 'boutique' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto pr-1">
            {filteredCatalog.map((bItem) => {
              const alreadyOwned = inventory.some((i) => i.item_id === bItem.id);

              return (
                <div
                  key={bItem.id}
                  onClick={() => {
                    if (bItem.type === 'outfit') setPreviewOutfit(bItem.id);
                    else setPreviewAccessory(bItem.id);
                    setMessage(`Mencoba ${bItem.name} di cermin! ✨`);
                  }}
                  className="cursor-pointer flex items-center justify-between rounded-2xl bg-purple-50/80 p-2.5 border border-purple-200 hover:border-purple-400 hover:bg-purple-100/90 transition-all active:scale-95 shadow-sm"
                >
                  <div className="flex items-center space-x-2.5">
                    <ItemPixelIcon itemId={bItem.id} size={40} />
                    <div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight">{bItem.name}</h4>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        bItem.type === 'outfit' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {bItem.type === 'outfit' ? '👗 Outfit' : '🎀 Aksesori'}
                      </span>
                    </div>
                  </div>

                  {alreadyOwned ? (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-xl">Dimiliki</span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyItem(bItem);
                      }}
                      className="flex items-center space-x-1 rounded-xl bg-amber-400 px-3 py-1.5 text-[11px] font-black text-slate-900 shadow hover:bg-amber-500 active:scale-95 transition-all"
                    >
                      <PixelCoin size={14} />
                      <span>{bItem.cost.toLocaleString()}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Reset Preview Button */}
        {(previewOutfit || previewAccessory) && (
          <div className="mt-3">
            <button
              onClick={() => {
                setPreviewOutfit(null);
                setPreviewAccessory(null);
                setMessage('Reset pratinjau cermin!');
              }}
              className="w-full rounded-xl bg-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
            >
              Reset Pratinjau Cermin
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default WardrobeView;
