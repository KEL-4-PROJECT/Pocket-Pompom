'use client';

/**
 * Pure Web Audio API Chiptune & Sound Effects Synthesizer for Pocket Pompom.
 * Zero external audio assets required.
 */
export type BGMMode = 'day' | 'night' | 'arcade';

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: NodeJS.Timeout | null = null;
  private currentBgmMode: BGMMode = 'day';

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;
    if (muted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.isMuted;
  }

  public toggleMute(): boolean {
    return this.setMuted(!this.isMuted);
  }

  // 1. Pop / Squish Sound (Boosted volume: 0.30)
  public playPopSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);

      gain.gain.setValueAtTime(0.30, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 2. Coin Chime (Two-note arpeggio: B5 -> E6, Boosted volume: 0.20)
  public playCoinSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.07); // E6

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 3. Eating / Chewing Nom-Nom Sound (Boosted volume: 0.25)
  public playEatSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.1, 0.2].forEach((delay, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(i % 2 === 0 ? 340 : 240, now + delay);
        osc.frequency.exponentialRampToValueAtTime(160, now + delay + 0.07);

        gain.gain.setValueAtTime(0.25, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.005, now + delay + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.07);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 4. Water Splash / Bubble Sound (Boosted volume: 0.22)
  public playWaterSplash() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.06, 0.12].forEach((delay) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(450 + Math.random() * 200, now + delay);
        osc.frequency.exponentialRampToValueAtTime(850 + Math.random() * 200, now + delay + 0.05);

        gain.gain.setValueAtTime(0.22, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.005, now + delay + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.05);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 5. Fanfare Win Sound (Boosted volume: 0.25)
  public playWinSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.08 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.15);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 6. Descending Lose Sound (Boosted volume: 0.22)
  public playLoseSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [400, 340, 280, 220];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.22, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.1 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.12);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 7. Chiptune Background Music (Multi-mode: Day, Night, Arcade)
  public startBGM() {
    if (this.bgmInterval || this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const dayMelody = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 392.0, 329.63];
    const nightLullaby = [196.0, 261.63, 293.66, 329.63, 261.63, 196.0];
    const arcadeMelody = [
      523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 880.0, 698.46,
      783.99, 659.25, 698.46, 587.33, 659.25, 523.25, 587.33, 493.88
    ];

    let step = 0;
    const intervalTime =
      this.currentBgmMode === 'arcade'
        ? 190
        : this.currentBgmMode === 'night'
        ? 750
        : 350;

    this.bgmInterval = setInterval(() => {
      if (this.isMuted || !this.ctx) return;

      let melody = dayMelody;
      let oscType: OscillatorType = 'triangle';
      let vol = 0.08;
      let noteDuration = 0.25;

      if (this.currentBgmMode === 'night') {
        melody = nightLullaby;
        oscType = 'sine';
        vol = 0.04;
        noteDuration = 0.6;
      } else if (this.currentBgmMode === 'arcade') {
        melody = arcadeMelody;
        oscType = 'square';
        vol = 0.10;
        noteDuration = 0.16;
      }

      const freq = melody[step % melody.length];
      step++;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + noteDuration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + noteDuration);

        // Add Driving Sub-Bass line for High-Energy Arcade Mode
        if (this.currentBgmMode === 'arcade' && step % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sawtooth';
          bassOsc.frequency.setValueAtTime(freq / 2, now);
          bassGain.gain.setValueAtTime(vol * 0.5, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + noteDuration);
          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + noteDuration);
        }
      } catch (e) {
        console.warn('BGM note error:', e);
      }
    }, intervalTime);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public setBGMMode(mode: BGMMode) {
    if (this.currentBgmMode === mode) return;
    this.currentBgmMode = mode;
    if (this.bgmInterval) {
      this.stopBGM();
      this.startBGM();
    }
  }

  public setSleepBGM(isSleeping: boolean) {
    this.setBGMMode(isSleeping ? 'night' : 'day');
  }

  public setArcadeBGM(isArcade: boolean) {
    this.setBGMMode(isArcade ? 'arcade' : 'day');
  }
}

export const audioEngine = new RetroAudioEngine();
