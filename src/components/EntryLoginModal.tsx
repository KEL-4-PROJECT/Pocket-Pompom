'use client';

import React, { useState, useEffect } from 'react';
import PompomPixel from '@/components/PompomPixel';
import { PixelPlayIcon, PixelUser, PixelCloseIcon, PixelSparkle } from '@/components/PixelIcons';
import { audioEngine } from '@/lib/audioService';

export interface EntryLoginModalProps {
  onLogin: (name: string) => Promise<void>;
  currentName?: string;
  onCancel?: () => void;
}

export const EntryLoginModal: React.FC<EntryLoginModalProps> = ({
  onLogin,
  currentName = '',
  onCancel,
}) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      const profiles = JSON.parse(localStorage.getItem('pompom_saved_profiles') || '[]');
      if (Array.isArray(profiles)) {
        setSavedProfiles(profiles);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) {
      setErrorMsg('Masukkan nama kamu terlebih dahulu!');
      audioEngine.playLoseSound();
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    audioEngine.playCoinSound();

    try {
      await onLogin(cleanName);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal masuk. Coba lagi.');
      setIsSubmitting(false);
    }
  };

  const handleSelectSaved = async (name: string) => {
    setNameInput(name);
    setIsSubmitting(true);
    setErrorMsg('');
    audioEngine.playPopSound();
    try {
      await onLogin(name);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal masuk. Coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 font-mono select-none animate-fade-in">
      {/* Retro Pixel Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#F472B6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100 p-6 shadow-2xl border-4 border-pink-400 text-slate-800 flex flex-col items-center">
        {/* Optional Cancel/Close button if switching profiles */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 flex items-center space-x-1 rounded-xl bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 active:scale-95"
          >
            <PixelCloseIcon size={12} />
            <span>Batal</span>
          </button>
        )}

        {/* Title Header */}
        <div className="mb-4 flex items-center space-x-2 rounded-2xl bg-white/90 px-4 py-2 shadow border border-pink-300">
          <PixelPlayIcon size={24} />
          <h2 className="text-sm md:text-base font-black tracking-wider text-pink-700 uppercase">
            Sistem Masuk Pocket Pompom
          </h2>
        </div>

        {/* Character Host */}
        <div className="mb-4 flex flex-col items-center">
          <div className="mb-3 max-w-xs rounded-2xl bg-white px-4 py-2.5 text-center text-xs font-bold text-slate-800 shadow-md border-2 border-pink-300 animate-bounce">
            "Halo! Siapa namamu? Koin, pakaian & barang yang kamu beli akan tersimpan otomatis!"
          </div>
          <PompomPixel state="play" outfit="none" accessory="pink_ribbon" size={160} />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          <div>
            <label className="block text-xs font-black text-pink-900 mb-1">
              NAMA PEMILIK / POMPOM:
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Contoh: Naerra, Pompom, Caca..."
              maxLength={20}
              className="w-full rounded-2xl border-2 border-pink-400 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-inner focus:border-pink-600 focus:outline-none placeholder:font-normal placeholder:text-slate-400"
              autoFocus
            />
          </div>

          {errorMsg && (
            <p className="text-center text-xs font-bold text-rose-600 bg-rose-100 p-2 rounded-xl border border-rose-300">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-3.5 text-xs font-black tracking-wider text-white shadow-lg hover:from-pink-600 hover:to-purple-700 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? 'MEMUAT PROFIL...' : 'MASUK KE GAME ▶'}
          </button>
        </form>

        {/* Saved Profiles Quick Select */}
        {savedProfiles.length > 0 && (
          <div className="mt-5 w-full border-t border-pink-200 pt-3">
            <p className="text-[11px] font-black text-slate-600 mb-2 text-center flex items-center justify-center space-x-1">
              <PixelUser size={14} />
              <span>PROFIL TERSIMPAN DI PERANGKAT INI:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-h-24 overflow-y-auto">
              {savedProfiles.map((profName) => (
                <button
                  key={profName}
                  onClick={() => handleSelectSaved(profName)}
                  disabled={isSubmitting}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-pink-700 border border-pink-300 shadow-sm hover:bg-pink-100 hover:border-pink-500 active:scale-95 transition-all"
                >
                  {profName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryLoginModal;

