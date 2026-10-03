'use client';

import React, { useEffect, useState, useRef } from 'react';
import PompomPixel, { PompomState } from '@/components/PompomPixel';
import PlaygroundModal from '@/components/PlaygroundModal';
import LivingRoomBackground from '@/components/LivingRoomBackground';
import DiningRoomView, { FoodItem } from '@/components/DiningRoomView';
import BathroomView from '@/components/BathroomView';
import WardrobeView, { BoutiqueCatalogItem } from '@/components/WardrobeView';
import EntryLoginModal from '@/components/EntryLoginModal';
import {
  PixelCoin,
  PixelHunger,
  PixelEnergy,
  PixelHappiness,
  PixelCleanliness,
  PixelFeedIcon,
  PixelBathIcon,
  PixelPlayIcon,
  PixelSleepIcon,
  PixelWardrobeIcon,
  PixelAudioIcon,
  PixelMuteIcon,
} from '@/components/PixelIcons';
import {
  getPetData,
  getOrCreatePetByName,
  updatePetStats,
  equipItem,
  buyAndEquipItem,
  cleanPet,
  Pet,
  InventoryItem,
} from '@/lib/petService';
import { audioEngine } from '@/lib/audioService';

type ActiveScreen = 'living' | 'feed' | 'bath' | 'wardrobe' | 'play';

export default function PocketPompomMain() {
  // State definitions
  const [pet, setPet] = useState<Pet | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pompomState, setPompomState] = useState<PompomState>('idle');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Full Screen Navigation State
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('living');
  const [dialogText, setDialogText] = useState('Selamat datang di Pocket Pompom! Mochi mochi~');

  // Ref for debounced auto-save
  const petRef = useRef<Pet | null>(null);
  petRef.current = pet;

  // Night mode is automatically ON when Pompom is sleeping, otherwise OFF
  const isNightMode = Boolean(pet?.is_sleeping);

  // 1. Initial Load & Offline Sleep Regeneration
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPetData();
        if (data.pet) {
          let loadedPet = data.pet;

          // Offline sleep regeneration calculation
          if (loadedPet.is_sleeping && loadedPet.sleep_start_time) {
            const now = new Date().getTime();
            const sleepStart = new Date(loadedPet.sleep_start_time).getTime();
            const elapsedSeconds = Math.max(0, Math.floor((now - sleepStart) / 1000));
            const energyGained = Math.floor(elapsedSeconds / 6);

            if (energyGained > 0) {
              const newEnergy = Math.min(100, loadedPet.energy + energyGained);
              loadedPet = { ...loadedPet, energy: newEnergy };
              await updatePetStats(loadedPet.id, { energy: newEnergy });
            }
          }

          setPet(loadedPet);
          setInventory(data.inventory);
          if (loadedPet.is_sleeping) {
            setPompomState('sleeping');
            audioEngine.setSleepBGM(true);
          }
        } else {
          // If no active profile, show login modal
          setShowLoginModal(true);
        }
      } catch (err) {
        console.error('Failed to load Pompom data:', err);
        setShowLoginModal(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Profile Login Handler
  const handleProfileLogin = async (name: string) => {
    handleUserFirstInteraction();
    const result = await getOrCreatePetByName(name);
    if (result.pet) {
      setPet(result.pet);
      setInventory(result.inventory);
      setShowLoginModal(false);
      setDialogText(`Selamat datang kembali, ${result.pet.pet_name}! Data koin & lemari kamu tersimpan rapi ✨`);
    }
  };

  // First interaction BGM trigger
  const handleUserFirstInteraction = () => {
    if (!isAudioMuted) {
      audioEngine.startBGM();
    }
  };

  const toggleAudioMute = () => {
    const nextMute = audioEngine.toggleMute();
    setIsAudioMuted(nextMute);
  };

  // 2. Main Game Loop (Stat Decay & Sleep Energy Regen every 5s)
  useEffect(() => {
    if (!pet) return;

    const interval = setInterval(() => {
      setPet((prev) => {
        if (!prev) return prev;

        if (prev.is_sleeping) {
          const newEnergy = Math.min(100, prev.energy + 1);
          return { ...prev, energy: newEnergy };
        } else {
          const newHunger = Math.max(0, prev.hunger - 1);
          const newHappiness = Math.max(0, prev.happiness - 1);
          return { ...prev, hunger: newHunger, happiness: newHappiness };
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [pet?.id]);

  // 3. Periodic Auto-Save to Supabase (every 12s)
  useEffect(() => {
    if (!pet) return;

    const saveInterval = setInterval(async () => {
      const currentPet = petRef.current;
      if (currentPet) {
        try {
          await updatePetStats(currentPet.id, {
            hunger: currentPet.hunger,
            energy: currentPet.energy,
            happiness: currentPet.happiness,
            cleanliness: currentPet.cleanliness,
            coins: currentPet.coins,
            is_sleeping: currentPet.is_sleeping,
            sleep_start_time: currentPet.sleep_start_time,
          });
        } catch (err) {
          console.error('Auto-save error:', err);
        }
      }
    }, 12000);

    return () => clearInterval(saveInterval);
  }, [pet?.id]);

  // 4. AUTOMATIC SPEECH BUBBLE & EXPRESSION UPDATER BASED ON STATS (<30%)
  useEffect(() => {
    if (!pet) return;
    if (pompomState === 'eating' || pompomState === 'play') return;

    if (pet.is_sleeping) {
      setPompomState('sleeping');
      setDialogText('Zzz... Pompom sedang bermimpi stroberi ~ 💤');
    } else if (pet.hunger < 30) {
      setPompomState('sad');
      setDialogText('Perut Pompom lapar banget nih! Ayo beri makan mochi di Dapur~ 🍡');
    } else if (pet.cleanliness < 30) {
      setPompomState('sad');
      setDialogText('Pompom terasa kotor nih... Ayo mandi di Kamar Mandi! 🧼');
    } else if (pet.energy < 30) {
      setPompomState('sad');
      setDialogText('Pompom mengantuk sekali... Tidurkan Pompom di kasur yuk! 😴');
    } else if (pet.happiness < 30) {
      setPompomState('sad');
      setDialogText('Pompom merasa sedih... Ayo main game di Arcade Arena! 🎮');
    } else {
      setPompomState('idle');
    }
  }, [pet?.hunger, pet?.energy, pet?.happiness, pet?.cleanliness, pet?.is_sleeping, pompomState]);

  // Manual Click on Pompom (Spoken Dialog & SFX)
  const handlePompomClick = () => {
    handleUserFirstInteraction();
    audioEngine.playPopSound();

    if (!pet) return;

    if (pet.is_sleeping) {
      setDialogText('Zzz... Pompom sedang bermimpi stroberi ~ 💤');
    } else if (pet.hunger < 30) {
      setDialogText('Perut Pompom lapar banget! Beri makan mochi dong~ 🍡');
    } else if (pet.cleanliness < 30) {
      setDialogText('Ih... Pompom kotor! Mandikan Pompom di Kamar Mandi dong~ 🧼');
    } else if (pet.energy < 30) {
      setDialogText('Mengantuk sekali... Tidurkan Pompom di kasur yuk! 😴');
    } else {
      const quotes = [
        `Pompom sayang ${pet.pet_name}! 💕`,
        'Mochi mochi~ Kenyal dan imut!',
        'Kamu pemilik terbaik di dunia! ✨',
        'Mau coba baju baru di Lemari hari ini?',
        'Bermain bersama Pompom sangat menyenangkan! 🎈',
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setDialogText(randomQuote);
    }
  };

  // Toggle Sleep Mode (Automatic Night Light)
  const toggleSleepMode = async () => {
    handleUserFirstInteraction();
    audioEngine.playPopSound();

    if (!pet) return;

    const newSleepStatus = !pet.is_sleeping;
    const nowIso = newSleepStatus ? new Date().toISOString() : null;

    setPompomState(newSleepStatus ? 'sleeping' : 'idle');
    audioEngine.setSleepBGM(newSleepStatus);

    setPet((prev) =>
      prev
        ? {
            ...prev,
            is_sleeping: newSleepStatus,
            sleep_start_time: nowIso,
          }
        : prev
    );

    setDialogText(newSleepStatus ? 'Selamat tidur Pompom! Mimpinya indah ya~ 😴' : 'Selamat pagi! Pompom sudah bangun!');

    try {
      await updatePetStats(pet.id, {
        is_sleeping: newSleepStatus,
        sleep_start_time: nowIso,
      });
    } catch (err) {
      console.error('Error toggling sleep mode:', err);
    }
  };

  // Living Room Furniture Handlers
  const handleInteractPlant = async () => {
    if (!pet) return;
    const newClean = Math.min(100, pet.cleanliness + 5);
    setPet((prev) => (prev ? { ...prev, cleanliness: newClean } : prev));
    setDialogText('Pompom menyiram tanaman hias! Daun-daun hijau segar~ 🌿 (+5 Clean)');
    await updatePetStats(pet.id, { cleanliness: newClean });
  };

  const handleInteractFireplace = async () => {
    if (!pet) return;
    const newHap = Math.min(100, pet.happiness + 5);
    setPet((prev) => (prev ? { ...prev, happiness: newHap } : prev));
    setDialogText('Hangat dan nyaman di dekat perapian! 🔥 (+5 Happy)');
    await updatePetStats(pet.id, { happiness: newHap });
  };

  const handleInteractClock = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDialogText(`Ting tong! Waktu sekarang menunjukkan jam ${timeStr} ⏰`);
  };

  const handleInteractBookshelf = () => {
    setDialogText('Pompom sedang membaca buku dongeng sebelum tidur! 📖✨');
  };

  const handleInteractWindow = () => {
    setDialogText('Melihat ke luar jendela! Hari yang cerah~ ☀️🌈');
  };

  // General Update Handler for Rooms
  const handleUpdateStats = async (updates: Partial<Pet>) => {
    if (!pet) return;
    setPet((prev) => (prev ? { ...prev, ...updates } : prev));
    try {
      await updatePetStats(pet.id, updates);
    } catch (err) {
      console.error('Error updating stats:', err);
    }
  };

  // Feeding Handler in DiningRoomView
  const handleFeedItem = async (item: FoodItem) => {
    if (!pet) return;
    const newCoins = pet.coins - item.cost;
    const newHunger = Math.min(100, pet.hunger + (item.hungerGain || 0));
    const newEnergy = Math.min(100, pet.energy + (item.energyGain || 0));
    const newHappiness = Math.min(100, pet.happiness + (item.happinessGain || 0));

    setPet((prev) =>
      prev
        ? {
            ...prev,
            coins: newCoins,
            hunger: newHunger,
            energy: newEnergy,
            happiness: newHappiness,
          }
        : prev
    );

    try {
      await updatePetStats(pet.id, {
        coins: newCoins,
        hunger: newHunger,
        energy: newEnergy,
        happiness: newHappiness,
      });
    } catch (err) {
      console.error('Error feeding pet:', err);
    }
  };

  // Finish Bath in BathroomView
  const handleFinishBath = async () => {
    if (!pet) return;
    try {
      const updated = await cleanPet(pet.id);
      setPet(updated);
      setCurrentScreen('living');
      setDialogText('Pompom sudah 100% bersih dan wangi!');
    } catch (err) {
      console.error('Error cleaning pet:', err);
    }
  };

  // Wardrobe Closet Handler
  const handleEquipCloset = async (type: 'outfit' | 'accessory', itemId: string) => {
    if (!pet) return;
    try {
      const updated = await equipItem(pet.id, type, itemId);
      setPet(updated);
    } catch (err) {
      console.error('Error equipping item:', err);
    }
  };

  // Wardrobe Boutique Purchase Handler
  const handleBuyBoutiqueItem = async (item: BoutiqueCatalogItem) => {
    if (!pet) return;
    try {
      const result = await buyAndEquipItem(pet.id, item.id, item.type, item.cost);
      setPet(result.pet);
      setInventory((prev) => [...prev, result.inventoryItem]);
    } catch (err: unknown) {
      console.error('Error buying boutique item:', err);
    }
  };

  // Mini Games Completion Handler
  const handleMiniGameComplete = async (coinsEarned: number, happinessGain: number) => {
    audioEngine.playWinSound();
    if (!pet) return;
    const newEnergy = Math.max(0, pet.energy - 10);
    const newClean = Math.max(0, pet.cleanliness - 5);
    const newCoins = pet.coins + coinsEarned;
    const newHappiness = Math.min(100, pet.happiness + happinessGain);

    setPet((prev) =>
      prev
        ? {
            ...prev,
            energy: newEnergy,
            cleanliness: newClean,
            coins: newCoins,
            happiness: newHappiness,
          }
        : prev
    );

    try {
      await updatePetStats(pet.id, {
        energy: newEnergy,
        cleanliness: newClean,
        coins: newCoins,
        happiness: newHappiness,
      });
    } catch (err) {
      console.error('Error saving mini game rewards:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-100 font-mono text-pink-700 select-none">
        <div className="text-center">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <p className="text-xl font-bold tracking-widest">MEMUAT POCKET POMPOM...</p>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // FULL SCREEN DEDICATED ROOM VIEWS SWITCHER
  // ==========================================================================

  // Entry Login Modal (if no pet or manually switching profile)
  if (showLoginModal || !pet) {
    return (
      <EntryLoginModal
        onLogin={handleProfileLogin}
        currentName={pet?.pet_name}
        onCancel={pet ? () => setShowLoginModal(false) : undefined}
      />
    );
  }

  // 1. Dining Room & Kitchen View (Feed)
  if (currentScreen === 'feed') {
    return (
      <DiningRoomView
        pet={pet}
        onFeedItem={handleFeedItem}
        onExit={() => setCurrentScreen('living')}
      />
    );
  }

  // 2. Bathroom View (Bath)
  if (currentScreen === 'bath') {
    return (
      <BathroomView
        pet={pet}
        onUpdateStats={handleUpdateStats}
        onFinishBath={handleFinishBath}
        onExit={() => setCurrentScreen('living')}
      />
    );
  }

  // 3. Wardrobe & Dressing Room View (Wardrobe)
  if (currentScreen === 'wardrobe') {
    return (
      <WardrobeView
        pet={pet}
        inventory={inventory}
        onEquipItem={handleEquipCloset}
        onBuyAndEquipItem={handleBuyBoutiqueItem}
        onExit={() => setCurrentScreen('living')}
      />
    );
  }

  // 4. Arcade Arena View (Play)
  if (currentScreen === 'play') {
    return (
      <PlaygroundModal
        pet={pet}
        onClose={() => setCurrentScreen('living')}
        onGameComplete={handleMiniGameComplete}
      />
    );
  }

  // ==========================================================================
  // MAIN LIVING ROOM VIEW (Default)
  // ==========================================================================
  return (
    <main
      onClick={handleUserFirstInteraction}
      className={`relative flex min-h-screen flex-col items-center justify-between font-mono transition-colors duration-500 select-none ${
        isNightMode ? 'bg-slate-900 text-purple-200' : 'bg-amber-50 text-slate-800'
      }`}
    >
      {/* Background Retro Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {/* HEADER & STATUS BARS */}
      <header className="z-10 w-full max-w-md p-4">
        {/* Top Title & Coin Bar */}
        <div className="mb-3 flex items-center justify-between rounded-xl bg-white/80 p-3 shadow-md backdrop-blur-md dark:bg-slate-800/80">
          <div>
            <h1 className="text-lg font-black tracking-wider text-pink-600 dark:text-pink-400">POCKET POMPOM</h1>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">👤 {pet.pet_name}</span>
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-[10px] font-black text-pink-600 underline hover:text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded"
              >
                Ganti
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudioMute}
              className="flex items-center justify-center rounded-lg bg-slate-200 p-2 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200"
              title={isAudioMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            >
              {isAudioMuted ? <PixelMuteIcon size={20} /> : <PixelAudioIcon size={20} />}
            </button>

            {/* Coin Balance */}
            <div className="flex items-center space-x-2 rounded-lg bg-amber-100 px-3 py-1.5 font-black text-amber-800 shadow-inner dark:bg-amber-900/60 dark:text-amber-300">
              <PixelCoin size={22} />
              <span className="text-sm">{pet.coins.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 4 Stat Progress Bars */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          {/* Hunger Bar */}
          <div className="flex items-center space-x-2 rounded-lg bg-orange-100 p-2 text-orange-900 shadow-sm dark:bg-orange-950/60 dark:text-orange-200">
            <PixelHunger size={20} />
            <div className="w-full">
              <div className="flex justify-between mb-0.5">
                <span>Lapar</span>
                <span>{pet.hunger}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-orange-200 dark:bg-orange-900">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${pet.hunger}%` }}
                />
              </div>
            </div>
          </div>

          {/* Energy Bar */}
          <div className="flex items-center space-x-2 rounded-lg bg-amber-100 p-2 text-amber-900 shadow-sm dark:bg-amber-950/60 dark:text-amber-200">
            <PixelEnergy size={20} />
            <div className="w-full">
              <div className="flex justify-between mb-0.5">
                <span>Energi</span>
                <span>{pet.energy}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-amber-200 dark:bg-amber-900">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${pet.energy}%` }}
                />
              </div>
            </div>
          </div>

          {/* Happiness Bar */}
          <div className="flex items-center space-x-2 rounded-lg bg-pink-100 p-2 text-pink-900 shadow-sm dark:bg-pink-950/60 dark:text-pink-200">
            <PixelHappiness size={20} />
            <div className="w-full">
              <div className="flex justify-between mb-0.5">
                <span>Bahagia</span>
                <span>{pet.happiness}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-pink-200 dark:bg-pink-900">
                <div
                  className="h-full bg-pink-500 transition-all duration-500"
                  style={{ width: `${pet.happiness}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cleanliness Bar */}
          <div className="flex items-center space-x-2 rounded-lg bg-sky-100 p-2 text-sky-900 shadow-sm dark:bg-sky-950/60 dark:text-sky-200">
            <PixelCleanliness size={20} />
            <div className="w-full">
              <div className="flex justify-between mb-0.5">
                <span>Bersih</span>
                <span>{pet.cleanliness}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-sky-200 dark:bg-sky-900">
                <div
                  className="h-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${pet.cleanliness}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LIVING ROOM SCENE WITH INTERACTIVE FURNITURE */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center p-4 w-full">
        <LivingRoomBackground
          isNightMode={isNightMode}
          onInteractPlant={handleInteractPlant}
          onInteractFireplace={handleInteractFireplace}
          onInteractClock={handleInteractClock}
          onInteractBookshelf={handleInteractBookshelf}
          onInteractWindow={handleInteractWindow}
        >
          {/* Speech Bubble */}
          <div className="mb-4 max-w-xs rounded-2xl bg-white px-4 py-2.5 text-center text-xs font-bold text-slate-800 shadow-lg border-2 border-pink-300 dark:bg-slate-800 dark:text-pink-200 dark:border-pink-500">
            <p>{dialogText}</p>
          </div>

          {/* Pompom Character */}
          <div className="relative cursor-pointer" onClick={handlePompomClick}>
            <PompomPixel
              state={pompomState}
              outfit={pet.equipped_outfit}
              accessory={pet.equipped_accessory}
              isSleepingInBed={pet.is_sleeping}
              isDirty={pet.cleanliness < 40}
              size={240}
            />
          </div>
        </LivingRoomBackground>
      </section>

      {/* FOOTER ACTION NAVIGATION BAR FOR SWITCHING ROOMS */}
      <footer className="z-10 w-full max-w-md p-4">
        <div className="grid grid-cols-5 gap-2 rounded-2xl bg-white/90 p-2 shadow-xl backdrop-blur-md dark:bg-slate-800/90 border border-pink-200 dark:border-slate-700">
          {/* Feed Button -> Switch to Dining Room */}
          <button
            disabled={pet.is_sleeping}
            onClick={() => {
              handleUserFirstInteraction();
              audioEngine.playPopSound();
              setCurrentScreen('feed');
            }}
            className="flex flex-col items-center justify-center rounded-xl p-2 font-bold text-orange-600 transition-all hover:bg-orange-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none dark:text-orange-400 dark:hover:bg-slate-700"
            title={pet.is_sleeping ? 'Pompom sedang tidur! 💤' : 'Ruang Makan'}
          >
            <PixelFeedIcon size={26} />
            <span className="mt-1 text-[10px]">Makan</span>
          </button>

          {/* Bath Button -> Switch to Bathroom */}
          <button
            disabled={pet.is_sleeping}
            onClick={() => {
              handleUserFirstInteraction();
              audioEngine.playPopSound();
              setCurrentScreen('bath');
            }}
            className="flex flex-col items-center justify-center rounded-xl p-2 font-bold text-sky-600 transition-all hover:bg-sky-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none dark:text-sky-400 dark:hover:bg-slate-700"
            title={pet.is_sleeping ? 'Pompom sedang tidur! 💤' : 'Kamar Mandi'}
          >
            <PixelBathIcon size={26} />
            <span className="mt-1 text-[10px]">Mandi</span>
          </button>

          {/* Play Button -> Switch to Arcade */}
          <button
            disabled={pet.is_sleeping}
            onClick={() => {
              handleUserFirstInteraction();
              audioEngine.playPopSound();
              setCurrentScreen('play');
            }}
            className="flex flex-col items-center justify-center rounded-xl p-2 font-bold text-purple-600 transition-all hover:bg-purple-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none dark:text-purple-400 dark:hover:bg-slate-700"
            title={pet.is_sleeping ? 'Pompom sedang tidur! 💤' : 'Arcade Arena'}
          >
            <PixelPlayIcon size={26} />
            <span className="mt-1 text-[10px]">Main</span>
          </button>

          {/* Wardrobe Button -> Switch to Dressing Room */}
          <button
            disabled={pet.is_sleeping}
            onClick={() => {
              handleUserFirstInteraction();
              audioEngine.playPopSound();
              setCurrentScreen('wardrobe');
            }}
            className="flex flex-col items-center justify-center rounded-xl p-2 font-bold text-pink-600 transition-all hover:bg-pink-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none dark:text-pink-400 dark:hover:bg-slate-700"
            title={pet.is_sleeping ? 'Pompom sedang tidur! 💤' : 'Lemari Pakaian'}
          >
            <PixelWardrobeIcon size={26} />
            <span className="mt-1 text-[10px]">Lemari</span>
          </button>

          {/* Sleep / Wake Button (Automatically toggles Night Light) */}
          <button
            onClick={toggleSleepMode}
            className={`flex flex-col items-center justify-center rounded-xl p-2 font-bold transition-all active:scale-95 ${
              pet.is_sleeping
                ? 'bg-amber-400 text-slate-900 shadow-md animate-pulse'
                : 'text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-slate-700'
            }`}
          >
            <PixelSleepIcon size={26} />
            <span className="mt-1 text-[10px]">{pet.is_sleeping ? 'Bangun' : 'Tidur'}</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
