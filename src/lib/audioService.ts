'use client';

/**
 * Pure Web Audio API Chiptune & Sound Effects Synthesizer for Pocket Pompom.
 * Zero external audio assets required.
 */
class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: NodeJS.Timeout | null = null;
  private isSleepBgm: boolean = false;

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

  // 1. Pop / Squish Sound
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

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 2. Coin Chime (Two-note arpeggio: B5 -> E6)
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

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // 3. Eating / Chewing Nom-Nom Sound
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

        gain.gain.setValueAtTime(0.08, now + delay);
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

  // 4. Water Splash / Bubble Sound
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

        gain.gain.setValueAtTime(0.06, now + delay);
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

  // 5. Fanfare Win Sound
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

        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
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

  // 6. Descending Lose Sound
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

        gain.gain.setValueAtTime(0.06, now + idx * 0.1);
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

  // 7. Chiptune Background Music (BGM Loop)
  public startBGM() {
    if (this.bgmInterval || this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const dayMelody = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 392.0, 329.63]; // C4, E4, G4, C5, A4, F4, G4, E4
    const nightLullaby = [196.0, 261.63, 293.66, 329.63, 261.63, 196.0]; // G3, C4, D4, E4, C4, G3

    let step = 0;
    this.bgmInterval = setInterval(() => {
      if (this.isMuted || !this.ctx) return;

      const melody = this.isSleepBgm ? nightLullaby : dayMelody;
      const freq = melody[step % melody.length];
      step++;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = this.isSleepBgm ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const targetVol = this.isSleepBgm ? 0.012 : 0.025;
        gain.gain.setValueAtTime(targetVol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (this.isSleepBgm ? 0.6 : 0.25));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + (this.isSleepBgm ? 0.6 : 0.25));
      } catch (e) {
        console.warn('BGM note error:', e);
      }
    }, this.isSleepBgm ? 800 : 380);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public setSleepBGM(isSleeping: boolean) {
    this.isSleepBgm = isSleeping;
    if (this.bgmInterval) {
      this.stopBGM();
      this.startBGM();
    }
  }
}

export const audioEngine = new RetroAudioEngine();
