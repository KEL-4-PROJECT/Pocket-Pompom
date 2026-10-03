'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelCoin, PixelCloseIcon, PixelPlayIcon } from '@/components/PixelIcons';
import PompomPixel from '@/components/PompomPixel';
import { Pet } from '@/lib/petService';
import { audioEngine } from '@/lib/audioService';

export interface PlaygroundModalProps {
  pet: Pet;
  onClose: () => void;
  onGameComplete: (coinsEarned: number, happinessGain: number) => Promise<void>;
}

type GameType = 'menu' | 'cup_shuffle' | 'catch_mochi' | 'cloud_bounce';

// ============================================================================
// 16-BIT RETRO COUNTDOWN OVERLAY COMPONENT
// ============================================================================
const CountdownOverlay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState<number | 'GO!'>(3);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    audioEngine.playPopSound();
    const timer3 = setTimeout(() => {
      setCount(2);
      audioEngine.playPopSound();
    }, 800);

    const timer2 = setTimeout(() => {
      setCount(1);
      audioEngine.playPopSound();
    }, 1600);

    const timer1 = setTimeout(() => {
      setCount('GO!');
      audioEngine.playCoinSound();
    }, 2400);

    const timerGo = setTimeout(() => {
      onCompleteRef.current();
    }, 3100);

    return () => {
      clearTimeout(timer3);
      clearTimeout(timer2);
      clearTimeout(timer1);
      clearTimeout(timerGo);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md rounded-3xl animate-fade-in">
      <div className="text-center select-none">
        <p className="text-xs font-black tracking-widest text-pink-400 uppercase mb-2 animate-bounce">
          GET READY! 🎮
        </p>
        <div
          key={String(count)}
          className={`text-6xl md:text-8xl font-black tracking-widest animate-pulse ${
            count === 'GO!' ? 'text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110' : 'text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]'
          }`}
        >
          {count}
        </div>
      </div>
    </div>
  );
};

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  pet,
  onClose,
  onGameComplete,
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Summary Reward Modal State
  const [summary, setSummary] = useState<{
    gameTitle: string;
    coinsEarned: number;
    happinessGain: number;
    scoreText?: string;
  } | null>(null);

  // Energy & Cleanliness Check before starting any game
  const startGame = (game: GameType) => {
    if (pet.energy < 10) {
      setErrorMessage('Pompom is too tired to play! Put Pompom to sleep first~ 😴');
      audioEngine.playLoseSound();
      return;
    }
    setErrorMessage(null);
    setActiveGame(game);
    audioEngine.playPopSound();
  };

  const handleFinishSession = async (
    gameTitle: string,
    coinsEarned: number,
    happinessGain: number,
    scoreText?: string
  ) => {
    setSummary({ gameTitle, coinsEarned, happinessGain, scoreText });
    await onGameComplete(coinsEarned, happinessGain);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-white min-h-screen w-full overflow-y-auto p-4 md:p-8 font-mono select-none animate-fade-in">
      {/* Background Retro Pixel Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ====================================================================== */}
      {/* TOP NAVIGATION BAR                                                     */}
      {/* ====================================================================== */}
      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between rounded-2xl bg-white/10 p-3 shadow-lg backdrop-blur-md border border-white/20">
        <button
          onClick={onClose}
          className="flex items-center space-x-2 rounded-xl bg-pink-600 px-4 py-2 text-xs font-black text-white shadow hover:bg-pink-700 active:scale-95 transition-all"
        >
          <span>⬅ Kembali ke Ruangan</span>
        </button>

        <div className="flex items-center space-x-2">
          <PixelPlayIcon size={24} />
          <h1 className="text-sm md:text-base font-black tracking-wider text-purple-300">
            POMPOM'S ARCADE ARENA 🎮
          </h1>
        </div>

        <div className="flex items-center space-x-2 rounded-xl bg-amber-500/20 px-3 py-1.5 font-black text-amber-300 border border-amber-500/40">
          <PixelCoin size={20} />
          <span className="text-xs md:text-sm">{pet.coins.toLocaleString()}</span>
        </div>
      </header>

      {/* Error Alert for Low Energy */}
      {errorMessage && (
        <div className="relative z-10 mx-auto my-3 w-full max-w-md rounded-2xl bg-pink-500/90 p-3 text-center text-xs font-bold text-white shadow-xl border-2 border-pink-300 animate-bounce">
          {errorMessage}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 1. ARCADE LOBBY MENU (FULL SCREEN)                                     */}
      {/* ====================================================================== */}
      {activeGame === 'menu' && !summary && (
        <main className="relative z-10 my-auto mx-auto flex w-full max-w-4xl flex-col items-center py-6">
          {/* Hero Pompom Arcade Host */}
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-3 max-w-xs rounded-2xl bg-white px-5 py-2.5 text-center text-xs font-bold text-slate-900 shadow-xl border-2 border-purple-400 animate-pulse">
              "Pilih permainan di bawah! Ayo main bareng Pompom~ 🍡"
            </div>
            <PompomPixel
              state="play"
              outfit={pet.equipped_outfit}
              accessory={pet.equipped_accessory}
              size={220}
            />
          </div>

          <p className="mb-4 text-xs font-bold text-purple-300 text-center">
            Setiap sesi permainan mengonsumsi ⚡ -10% Energi & 🧼 -5% Kebersihan.
          </p>

          {/* 3 Large Arcade Game Cards */}
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Cup Shuffle */}
            <div
              onClick={() => startGame('cup_shuffle')}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 shadow-2xl border-2 border-purple-500/40 hover:border-purple-400 hover:bg-slate-800/90 transition-all hover:-translate-y-1 active:scale-95"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">🥤</span>
                  <span className="rounded-full bg-purple-500/30 px-3 py-1 text-[10px] font-black text-purple-300 border border-purple-400/40">
                    3 Ronde
                  </span>
                </div>
                <h3 className="text-sm font-black text-purple-300 group-hover:text-purple-200">
                  Cup Shuffle
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Tebak mangkuk mana yang menyembunyikan mochi stroberi Pompom!
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-purple-500/20 pt-3">
                <span className="text-xs font-black text-amber-400">🪙 s/d 180 Koin</span>
                <span className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-black text-white shadow-lg group-hover:bg-purple-500">
                  MAIN ▶
                </span>
              </div>
            </div>

            {/* Card 2: Catch the Mochi */}
            <div
              onClick={() => startGame('catch_mochi')}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 shadow-2xl border-2 border-pink-500/40 hover:border-pink-400 hover:bg-slate-800/90 transition-all hover:-translate-y-1 active:scale-95"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">🍡</span>
                  <span className="rounded-full bg-pink-500/30 px-3 py-1 text-[10px] font-black text-pink-300 border border-pink-400/40">
                    30 Detik
                  </span>
                </div>
                <h3 className="text-sm font-black text-pink-300 group-hover:text-pink-200">
                  Catch the Mochi
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Tangkap makanan jatuh di keranjang sambil menghindari batu berduri!
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-pink-500/20 pt-3">
                <span className="text-xs font-black text-amber-400">🪙 s/d 120 Koin</span>
                <span className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-black text-white shadow-lg group-hover:bg-pink-500">
                  MAIN ▶
                </span>
              </div>
            </div>

            {/* Card 3: Cloud Bounce */}
            <div
              onClick={() => startGame('cloud_bounce')}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl bg-slate-900/80 p-5 shadow-2xl border-2 border-indigo-500/40 hover:border-indigo-400 hover:bg-slate-800/90 transition-all hover:-translate-y-1 active:scale-95"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">☁️</span>
                  <span className="rounded-full bg-indigo-500/30 px-3 py-1 text-[10px] font-black text-indigo-300 border border-indigo-400/40">
                    Arcade Jump
                  </span>
                </div>
                <h3 className="text-sm font-black text-indigo-300 group-hover:text-indigo-200">
                  Cloud Bounce
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Lompat tinggi menembus awan empuk, kumpulkan koin & hindari duri tajam!
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-indigo-500/20 pt-3">
                <span className="text-xs font-black text-amber-400">🪙 Koin Tanpa Batas!</span>
                <span className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white shadow-lg group-hover:bg-indigo-500">
                  MAIN ▶
                </span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================== */}
      {/* 2. FULL SCREEN MINI GAME 1: CUP SHUFFLE                                */}
      {/* ====================================================================== */}
      {activeGame === 'cup_shuffle' && !summary && (
        <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
          <CupShuffleGame
            pet={pet}
            onFinish={(scoreCorrect) => {
              let coins = 20;
              let hap = 10;
              if (scoreCorrect === 3) { coins = 180; hap = 30; }
              else if (scoreCorrect === 2) { coins = 120; hap = 20; }
              else if (scoreCorrect === 1) { coins = 60; hap = 15; }

              handleFinishSession('Cup Shuffle 🥤', coins, hap, `Skor: ${scoreCorrect}/3 Tebakan Benar!`);
            }}
            onExit={() => setActiveGame('menu')}
          />
        </main>
      )}

      {/* ====================================================================== */}
      {/* 3. FULL SCREEN MINI GAME 2: CATCH THE MOCHI                            */}
      {/* ====================================================================== */}
      {activeGame === 'catch_mochi' && !summary && (
        <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
          <CatchMochiGame
            pet={pet}
            onFinish={(totalCoins) => {
              handleFinishSession('Catch the Mochi 🍡', totalCoins, 30, `Makanan Tertangkap: 🪙 ${totalCoins} Koin!`);
            }}
            onExit={() => setActiveGame('menu')}
          />
        </main>
      )}

      {/* ====================================================================== */}
      {/* 4. FULL SCREEN MINI GAME 3: CLOUD BOUNCE                              */}
      {/* ====================================================================== */}
      {activeGame === 'cloud_bounce' && !summary && (
        <main className="relative z-10 my-auto mx-auto flex w-full max-w-3xl flex-col items-center py-4">
          <CloudBounceGame
            pet={pet}
            onFinish={(coinsEarned, cloudsLanded) => {
              handleFinishSession('Cloud Bounce ☁️', coinsEarned, 25, `Berhasil Menjajaki ${cloudsLanded} Awan!`);
            }}
            onExit={() => setActiveGame('menu')}
          />
        </main>
      )}

      {/* ====================================================================== */}
      {/* 5. FULL SCREEN SUMMARY REWARD SCREEN                                   */}
      {/* ====================================================================== */}
      {summary && (
        <main className="relative z-10 my-auto mx-auto flex w-full max-w-md flex-col items-center py-8 text-center">
          <div className="mb-4 flex flex-col items-center">
            <PompomPixel
              state="play"
              outfit={pet.equipped_outfit}
              accessory={pet.equipped_accessory}
              size={220}
            />
            <h2 className="mt-4 text-2xl font-black text-purple-300">Selesai Bermain {summary.gameTitle}! 🎉</h2>
            {summary.scoreText && (
              <p className="mt-1 text-sm font-bold text-slate-300">{summary.scoreText}</p>
            )}
          </div>

          <div className="mb-6 w-full rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-md border border-white/20 space-y-3">
            <div className="flex items-center justify-center space-x-3 text-2xl font-black text-amber-300">
              <PixelCoin size={32} />
              <span>+ {summary.coinsEarned} Koin</span>
            </div>
            <div className="text-sm font-bold text-pink-300">
              💖 + {summary.happinessGain}% Bonus Kebahagiaan
            </div>
          </div>

          <button
            onClick={() => {
              setSummary(null);
              setActiveGame('menu');
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-4 text-sm font-black text-white shadow-xl hover:from-purple-500 hover:to-pink-500 active:scale-95 transition-all"
          >
            Klaim Hadiah & Kembali ke Arcade
          </button>
        </main>
      )}
    </div>
  );
};

// ============================================================================
// COMPONENT 1: CUP SHUFFLE
// ============================================================================
const CupShuffleGame: React.FC<{
  pet: Pet;
  onFinish: (scoreCorrect: number) => void;
  onExit: () => void;
}> = ({ pet, onFinish, onExit }) => {
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [round, setRound] = useState(1);
  const [scoreCorrect, setScoreCorrect] = useState(0);
  const [phase, setPhase] = useState<'peek' | 'shuffle' | 'guess' | 'reveal'>('peek');
  const [mochiCup, setMochiCup] = useState(1);
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [timer, setTimer] = useState(5);
  const [positions, setPositions] = useState<number[]>([0, 1, 2]);

  const slotLeftPercentages = ['8%', '40%', '72%'];

  const startRound = (rNum: number) => {
    const randomCup = Math.floor(Math.random() * 3);
    setMochiCup(randomCup);
    setSelectedCup(null);
    setPositions([0, 1, 2]);
    setPhase('peek');

    setTimeout(() => {
      setPhase('shuffle');
      let swaps = 0;
      const shuffleInterval = setInterval(() => {
        setPositions((prev) => {
          const next = [...prev];
          const i = Math.floor(Math.random() * 3);
          let j = Math.floor(Math.random() * 3);
          while (j === i) {
            j = Math.floor(Math.random() * 3);
          }
          const temp = next[i];
          next[i] = next[j];
          next[j] = temp;
          return next;
        });
        swaps++;
        if (swaps >= 10) {
          clearInterval(shuffleInterval);
          setPhase('guess');
          setTimer(5);
        }
      }, 340 - rNum * 50);
    }, 2000);
  };

  useEffect(() => {
    if (!isCountingDown) {
      startRound(round);
    }
  }, [round, isCountingDown]);

  useEffect(() => {
    if (phase !== 'guess' || isCountingDown) return;
    if (timer <= 0) {
      handleGuess(-1);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [phase, timer, isCountingDown]);

  const handleGuess = (cupIndex: number) => {
    if (phase !== 'guess' || isCountingDown) return;
    setSelectedCup(cupIndex);
    setPhase('reveal');

    const isRight = cupIndex === mochiCup;
    if (isRight) {
      audioEngine.playCoinSound();
    } else {
      audioEngine.playLoseSound();
    }
    const newScore = isRight ? scoreCorrect + 1 : scoreCorrect;
    if (isRight) setScoreCorrect(newScore);

    setTimeout(() => {
      if (round < 3) {
        setRound(round + 1);
      } else {
        onFinish(newScore);
      }
    }, 2200);
  };

  let pompomExpression: 'idle' | 'play' | 'sad' | 'eating' = 'idle';
  if (phase === 'shuffle') pompomExpression = 'play';
  if (phase === 'reveal') {
    pompomExpression = selectedCup === mochiCup ? 'play' : 'sad';
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      {isCountingDown && (
        <CountdownOverlay onComplete={() => setIsCountingDown(false)} />
      )}

      <div className="mb-4 flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
        <button onClick={onExit} className="text-xs font-bold text-purple-300 hover:text-white">
          ◀ Kembali ke Arcade
        </button>
        <div className="text-xs font-black text-amber-300">
          Ronde {round} / 3 | Skor: {scoreCorrect}
        </div>
      </div>

      <div className="mb-2 flex flex-col items-center">
        <PompomPixel
          state={pompomExpression}
          outfit={pet.equipped_outfit}
          accessory={pet.equipped_accessory}
          size={180}
        />
      </div>

      <div className="mb-3 rounded-2xl bg-white/20 px-6 py-2 text-center text-xs font-bold text-white backdrop-blur-md">
        {phase === 'peek' && '👀 Perhatikan tempat mochi stroberi bersembunyi!'}
        {phase === 'shuffle' && '🌀 Mangkuk diacak super cepat... Perhatikan baik-baik!'}
        {phase === 'guess' && `👉 Klik mangkuk tempat mochi berada! (${timer} dtk)`}
        {phase === 'reveal' && (selectedCup === mochiCup ? '🎉 Benar! Kamu menemukannya!' : '❌ Ops! Mangkuk salah!')}
      </div>

      <div className="relative h-60 w-full max-w-xl rounded-3xl bg-amber-900/60 p-6 border-4 border-amber-800 shadow-2xl overflow-hidden">
        {[0, 1, 2].map((cupIdx) => {
          const slotIdx = positions[cupIdx];
          const leftPercent = slotLeftPercentages[slotIdx];
          const isLanded = selectedCup === cupIdx || (phase === 'reveal' && cupIdx === mochiCup);
          const isLifted = phase === 'peek' && cupIdx === mochiCup;
          const isMochiOwner = cupIdx === mochiCup;

          return (
            <div
              key={cupIdx}
              onClick={() => handleGuess(cupIdx)}
              style={{
                left: leftPercent,
                top: '55%',
                transform: 'translateY(-50%)',
                transition: 'left 0.3s ease-in-out',
              }}
              className="absolute cursor-pointer hover:scale-105 active:scale-95 transition-transform flex flex-col items-center"
            >
              {isMochiOwner && (
                <div className="absolute left-6 bottom-3 z-0 text-3xl">🍡</div>
              )}

              <div
                style={{
                  transform: isLifted || (phase === 'reveal' && isLanded) ? 'translateY(-40px)' : 'translateY(0px)',
                  transition: 'transform 0.3s ease-out',
                }}
                className="relative z-10"
              >
                <svg viewBox="0 0 32 32" className="h-20 w-20 shape-crisp">
                  <rect x="6" y="8" width="20" height="20" fill="#9B5DE5" rx="2" />
                  <rect x="4" y="6" width="24" height="4" fill="#7209B7" />
                  <rect x="8" y="10" width="4" height="16" fill="#C77DFF" opacity="0.5" />
                  <rect x="12" y="14" width="8" height="8" fill="#FEE440" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 2: CATCH THE MOCHI (BALANCED REWARD COINS)
// ============================================================================
interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'mochi' | 'strawberry' | 'star' | 'rock';
  speed: number;
}

const CatchMochiGame: React.FC<{
  pet: Pet;
  onFinish: (totalCoins: number) => void;
  onExit: () => void;
}> = ({ pet, onFinish, onExit }) => {
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [pompomX, setPompomX] = useState(180);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [coins, setCoins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const containerWidth = 400;

  // Timer Countdown Loop
  useEffect(() => {
    if (isCountingDown || isGameOver) return;
    if (timeLeft <= 0) {
      onFinish(coins);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isCountingDown, isGameOver, timeLeft, coins]);

  // FAST ITEM SPAWNER LOOP (Every 380ms for intense rain!)
  useEffect(() => {
    if (isCountingDown || isGameOver) return;
    const spawnInterval = setInterval(() => {
      const types: ('mochi' | 'strawberry' | 'star' | 'rock')[] = [
        'mochi', 'mochi', 'strawberry', 'star', 'rock', 'rock', 'rock'
      ];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const timeElapsed = 30 - timeLeft;
      const baseSpeed = 6 + Math.random() * 4 + timeElapsed * 0.15;

      const newItem: FallingItem = {
        id: Date.now() + Math.random(),
        x: Math.floor(Math.random() * (containerWidth - 40)),
        y: 0,
        type: randomType,
        speed: baseSpeed,
      };
      setItems((prev) => [...prev, newItem]);
    }, 380);
    return () => clearInterval(spawnInterval);
  }, [isCountingDown, isGameOver, timeLeft]);

  // Physics & Collision Detection
  useEffect(() => {
    if (isCountingDown || isGameOver) return;
    const gameLoop = setInterval(() => {
      setItems((prevItems) => {
        const updated: FallingItem[] = [];
        for (const item of prevItems) {
          const nextY = item.y + item.speed;

          // Hitbox collision check with Pompom's basket
          if (nextY >= 250 && nextY <= 295 && Math.abs(item.x - pompomX) < 42) {
            if (item.type === 'rock') {
              // INSTANT GAME OVER UPON HITTING A ROCK 🪨
              setIsGameOver(true);
              audioEngine.playLoseSound();
              setTimeout(() => {
                onFinish(coins);
              }, 1200);
              return prevItems;
            } else {
              // BALANCED REWARD COINS PER ITEM (Max cap 120)
              let value = 3;
              if (item.type === 'strawberry') value = 5;
              if (item.type === 'star') value = 10;
              setCoins((c) => Math.min(120, c + value));
              audioEngine.playCoinSound();
            }
            continue;
          }

          if (nextY < 320) {
            updated.push({ ...item, y: nextY });
          }
        }
        return updated;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [isCountingDown, isGameOver, pompomX, coins, onFinish]);

  const moveLeftTouch = () => setPompomX((x) => Math.max(10, x - 40));
  const moveRightTouch = () => setPompomX((x) => Math.min(containerWidth - 70, x + 40));

  return (
    <div className="relative w-full flex flex-col items-center">
      {isCountingDown && (
        <CountdownOverlay onComplete={() => setIsCountingDown(false)} />
      )}

      {/* GAME OVER OVERLAY */}
      {isGameOver && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md rounded-3xl animate-fade-in text-center p-6">
          <div className="text-5xl mb-2 animate-bounce">💥🪨</div>
          <h3 className="text-2xl font-black text-pink-400 tracking-wider">GAME OVER!</h3>
          <p className="mt-1 text-xs font-bold text-slate-300">Pompom tertimpa batu berduri!</p>
          <div className="mt-4 text-base font-black text-amber-300 bg-white/10 px-4 py-2 rounded-2xl border border-amber-400/40">
            Koin Terkumpul: 🪙 {coins}
          </div>
        </div>
      )}

      <div className="mb-3 flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
        <button onClick={onExit} className="text-xs font-bold text-pink-300 hover:text-white">
          ◀ Kembali ke Arcade
        </button>
        <div className="flex items-center space-x-4 text-xs font-black">
          <span className="text-pink-300 font-bold">⏱️ Waktu: {timeLeft}s</span>
          <span className="flex items-center space-x-1 text-amber-300">
            <PixelCoin size={18} /> <span>{coins}</span>
          </span>
        </div>
      </div>

      {/* Game Arena */}
      <div className="relative mb-3 h-80 w-full max-w-md overflow-hidden rounded-3xl bg-slate-900 border-4 border-pink-500/50 shadow-2xl">
        {items.map((item) => (
          <div
            key={item.id}
            style={{ left: item.x, top: item.y }}
            className="absolute text-2xl pointer-events-none drop-shadow-md"
          >
            {item.type === 'mochi' && '🍡'}
            {item.type === 'strawberry' && '🍓'}
            {item.type === 'star' && '⭐'}
            {item.type === 'rock' && '🪨'}
          </div>
        ))}

        {/* Pompom Character */}
        <div
          style={{ left: pompomX, bottom: 10 }}
          className={`absolute transition-all duration-75 ${isGameOver ? 'opacity-50 scale-90' : ''}`}
        >
          <PompomPixel
            state={isGameOver ? 'sad' : 'idle'}
            outfit={pet.equipped_outfit}
            accessory={pet.equipped_accessory}
            size={70}
          />
        </div>
      </div>

      {/* Touch Buttons */}
      <div className="flex w-full max-w-md space-x-4">
        <button
          onClick={moveLeftTouch}
          disabled={isGameOver}
          className="flex-1 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 py-4 text-sm font-black text-white shadow-xl hover:from-pink-500 hover:to-rose-500 active:scale-95 disabled:opacity-50"
        >
          ◀ GESER KIRI
        </button>
        <button
          onClick={moveRightTouch}
          disabled={isGameOver}
          className="flex-1 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 py-4 text-sm font-black text-white shadow-xl hover:from-pink-500 hover:to-rose-500 active:scale-95 disabled:opacity-50"
        >
          GESER KANAN ▶
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 3: CLOUD BOUNCE
// ============================================================================
interface PhysicsCloud {
  id: number;
  x: number;
  y: number;
  width: number;
  type: 'normal' | 'golden' | 'boost' | 'fragile' | 'moving' | 'spike';
  dx?: number;
  hasCoin?: boolean;
}

const CloudBounceGame: React.FC<{
  pet: Pet;
  onFinish: (coins: number, cloudsLanded: number) => void;
  onExit: () => void;
}> = ({ pet, onFinish, onExit }) => {
  const [isCountingDown, setIsCountingDown] = useState(true);
  const containerWidth = 360;
  const containerHeight = 360;
  const pompomSize = 56;

  // Pompom Physics State
  const [posX, setPosX] = useState(150);
  const [posY, setPosY] = useState(200);
  const [vy, setVy] = useState(-10);
  const [vx, setVx] = useState(0);

  const [coins, setCoins] = useState(0);
  const [cloudsLanded, setCloudsLanded] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initial Platforms Setup
  const [clouds, setClouds] = useState<PhysicsCloud[]>([
    { id: 1, x: 130, y: 300, width: 75, type: 'normal' },
    { id: 2, x: 40, y: 210, width: 70, type: 'golden', hasCoin: true },
    { id: 3, x: 210, y: 130, width: 68, type: 'moving', dx: 2.2 },
    { id: 4, x: 90, y: 50, width: 68, type: 'spike' },
    { id: 5, x: 220, y: -20, width: 70, type: 'boost' },
  ]);

  // Main 60FPS Real-Time Physics Loop
  useEffect(() => {
    if (isCountingDown || gameOver) return;

    const gravity = 0.42;
    const interval = setInterval(() => {
      // 1. Horizontal player movement & screen wrap
      setPosX((currX) => {
        let nextX = currX + vx;
        if (nextX < -20) nextX = containerWidth - 35;
        if (nextX > containerWidth - 25) nextX = -10;
        return nextX;
      });

      // 2. Move sliding platforms horizontally
      setClouds((prevClouds) =>
        prevClouds.map((c) => {
          if (c.type === 'moving' && c.dx) {
            let nextX = c.x + c.dx;
            let nextDx = c.dx;
            if (nextX <= 10 || nextX >= containerWidth - c.width - 10) {
              nextDx = -c.dx;
              nextX = c.x + nextDx;
            }
            return { ...c, x: nextX, dx: nextDx };
          }
          return c;
        })
      );

      // 3. Vertical player movement & gravity
      setVy((currVy) => currVy + gravity);

      setPosY((currY) => {
        let nextY = currY + vy;

        // Camera Scroll
        if (nextY < 130) {
          const scrollDelta = 130 - nextY;
          nextY = 130;

          setClouds((prevClouds) => {
            const updated = prevClouds.map((c) => ({
              ...c,
              y: c.y + scrollDelta,
            }));

            const filtered = updated.filter((c) => c.y < containerHeight + 40);

            while (filtered.length < 5) {
              const highestY = Math.min(...filtered.map((c) => c.y), 90);
              const rType = Math.random();
              let type: 'normal' | 'golden' | 'boost' | 'fragile' | 'moving' | 'spike' = 'normal';
              let dx = 0;

              if (rType < 0.20) {
                type = 'moving';
                dx = Math.random() < 0.5 ? 2.5 : -2.5;
              } else if (rType < 0.35) {
                type = 'fragile';
              } else if (rType < 0.50) {
                type = 'golden';
              } else if (rType < 0.62) {
                type = 'boost';
              } else if (rType < 0.82) {
                // 20% Chance of Spike Hazard! 🌵
                type = 'spike';
              }

              filtered.push({
                id: Date.now() + Math.random(),
                x: Math.floor(Math.random() * (containerWidth - 80)),
                y: highestY - (75 + Math.random() * 25),
                width: 68 + Math.floor(Math.random() * 8),
                type,
                dx,
                hasCoin: type !== 'spike' && Math.random() < 0.35,
              });
            }

            return filtered;
          });
        }

        // Game Over: Pompom fell below bottom
        if (nextY > containerHeight + 20) {
          setGameOver(true);
          audioEngine.playLoseSound();
          setTimeout(() => onFinish(coins, cloudsLanded), 800);
        }

        return nextY;
      });

      // 4. Collision Check with Clouds (Bounce or Spike)
      setClouds((prevClouds) => {
        let bounced = false;
        const nextClouds = prevClouds.map((cloud) => {
          const pompomFeetY = posY + pompomSize - 10;
          const isIntersectY =
            pompomFeetY >= cloud.y - 12 && pompomFeetY <= cloud.y + 18;
          const isIntersectX =
            posX + pompomSize - 12 >= cloud.x && posX + 12 <= cloud.x + cloud.width;

          if (isIntersectY && isIntersectX) {
            // SPIKE HAZARD COLLISION! 🌵
            if (cloud.type === 'spike' && !gameOver) {
              setGameOver(true);
              audioEngine.playLoseSound();
              setTimeout(() => onFinish(coins, cloudsLanded), 1200);
              return cloud;
            }

            // BOUNCE CHECK (Falling down)
            if (vy > 0 && !bounced) {
              bounced = true;

              const bounceForce = cloud.type === 'boost' ? -14 : -10;
              setVy(bounceForce);
              setCloudsLanded((c) => c + 1);

              if (cloud.type === 'golden') {
                audioEngine.playCoinSound();
                setCoins((c) => c + 15); // UNLIMITED COINS!
              } else if (cloud.type === 'boost') {
                audioEngine.playWinSound();
              } else {
                audioEngine.playPopSound();
              }

              if (cloud.hasCoin) {
                audioEngine.playCoinSound();
                setCoins((c) => c + 5); // UNLIMITED COINS!
              }

              if (cloud.type === 'fragile') {
                return { ...cloud, y: 999 };
              }

              return { ...cloud, hasCoin: false };
            }
          }
          return cloud;
        });

        return nextClouds;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [isCountingDown, posX, posY, vy, vx, gameOver, coins, cloudsLanded, onFinish]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {isCountingDown && (
        <CountdownOverlay onComplete={() => setIsCountingDown(false)} />
      )}

      {/* GAME OVER SPIKE / FALL OVERLAY */}
      {gameOver && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md rounded-3xl animate-fade-in text-center p-6">
          <div className="text-5xl mb-2 animate-bounce">🌵💥</div>
          <h3 className="text-2xl font-black text-rose-400 tracking-wider">GAME OVER!</h3>
          <p className="mt-1 text-xs font-bold text-slate-300">Pompom menabrak duri tajam!</p>
          <div className="mt-4 flex flex-col items-center space-y-1 text-xs font-black text-amber-300 bg-white/10 px-5 py-2.5 rounded-2xl border border-amber-400/40">
            <span>Tinggi: ☁️ {cloudsLanded} Awan</span>
            <span className="text-sm">Total Koin: 🪙 {coins}</span>
          </div>
        </div>
      )}

      {/* Top HUD */}
      <div className="mb-3 flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
        <button onClick={onExit} className="text-xs font-bold text-indigo-300 hover:text-white">
          ◀ Kembali ke Arcade
        </button>
        <div className="flex items-center space-x-4 text-xs font-black">
          <span>Tinggi: {cloudsLanded} Awan</span>
          <span className="flex items-center space-x-1 text-amber-300">
            <PixelCoin size={18} /> <span>{coins}</span>
          </span>
        </div>
      </div>

      {/* Real-Time Arcade Physics Arena */}
      <div className="relative mb-3 h-[360px] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 border-4 border-indigo-500/50 shadow-2xl">
        {/* Sky Stars */}
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        {/* Floating Cloud Platforms & Spike Hazards */}
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            style={{ left: cloud.x, top: cloud.y, width: cloud.width }}
            className={`absolute flex items-center justify-center rounded-full py-1 text-[10px] font-black shadow-lg transition-transform ${
              cloud.type === 'spike'
                ? 'bg-rose-600 text-white border-2 border-rose-400 animate-pulse drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]'
                : cloud.type === 'golden'
                ? 'bg-amber-300 text-amber-950 border-2 border-amber-500 animate-pulse'
                : cloud.type === 'boost'
                ? 'bg-emerald-400 text-emerald-950 border-2 border-emerald-600'
                : cloud.type === 'fragile'
                ? 'bg-slate-400 text-slate-900 border-2 border-slate-600 border-dashed'
                : cloud.type === 'moving'
                ? 'bg-cyan-400 text-cyan-950 border-2 border-cyan-600'
                : 'bg-white text-indigo-950 border-2 border-indigo-200'
            }`}
          >
            {cloud.hasCoin && <span className="mr-1">🪙</span>}
            {cloud.type === 'spike' && '🌵 DURI'}
            {cloud.type === 'golden' && '⭐ GOLD'}
            {cloud.type === 'boost' && '🚀 BOOST'}
            {cloud.type === 'fragile' && '⚡ CRACK'}
            {cloud.type === 'moving' && '↔️ SLIDE'}
            {cloud.type === 'normal' && '☁️ CLOUD'}
          </div>
        ))}

        {/* Pompom Bouncing Real-Time Sprite */}
        <div
          style={{ left: posX, top: posY }}
          className={`absolute transition-transform ${vy < 0 ? 'scale-110 -rotate-3' : 'scale-100 rotate-3'}`}
        >
          <PompomPixel
            state={gameOver ? 'sad' : vy < 0 ? 'play' : 'idle'}
            outfit={pet.equipped_outfit}
            accessory={pet.equipped_accessory}
            size={pompomSize}
          />
        </div>
      </div>

      {/* Touch Steering Control Buttons */}
      <div className="flex w-full max-w-sm space-x-3">
        <button
          onMouseDown={() => setVx(-6.5)}
          onMouseUp={() => setVx(0)}
          onTouchStart={() => setVx(-6.5)}
          onTouchEnd={() => setVx(0)}
          className="flex-1 rounded-2xl bg-indigo-600 py-3.5 text-xs font-black text-white shadow-xl hover:bg-indigo-500 active:scale-95"
        >
          ◀ KIRI
        </button>

        <button
          onMouseDown={() => setVx(6.5)}
          onMouseUp={() => setVx(0)}
          onTouchStart={() => setVx(6.5)}
          onTouchEnd={() => setVx(0)}
          className="flex-1 rounded-2xl bg-indigo-600 py-3.5 text-xs font-black text-white shadow-xl hover:bg-indigo-500 active:scale-95"
        >
          KANAN ▶
        </button>
      </div>
    </div>
  );
};

export default PlaygroundModal;
