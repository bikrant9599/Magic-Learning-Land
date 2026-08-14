// Web Audio API Synthesizer and Web Speech API Narration for Nursery Children

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;

  constructor() {
    // Lazy AudioContext initialization on first user gesture
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  public isVoiceEnabled() {
    return this.voiceEnabled;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Bubble Pop Sound
  public playPop(frequency = 440) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 2.2, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // AudioContext fallback
    }
  }

  // Cheerful Success Chime (Arpeggio)
  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

        const startTime = ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch {
      // AudioContext fallback
    }
  }

  // Star Sparkle Chime
  public playStar() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const notes = [880, 1174.66, 1396.91, 1760]; // A5, D6, F6, A6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.06);

        const startTime = ctx.currentTime + index * 0.06;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // AudioContext fallback
    }
  }

  // Gentle Reassuring Hint / Try Again Sound
  public playTryAgain() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // fallback
    }
  }

  // Big Fanfare for Badges & Game Completion
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 523.25, d: 0.15 }, // C5
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.3 },  // E5
        { f: 783.99, d: 0.3 },  // G5
        { f: 1046.5, d: 0.6 },  // C6
      ];

      let elapsed = 0;
      melody.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, ctx.currentTime + elapsed);

        const startTime = ctx.currentTime + elapsed;
        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + item.d + 0.05);

        elapsed += item.d * 0.9;
      });
    } catch {
      // fallback
    }
  }

  // Munch / Crunch Sound for Feeding the Bunny
  public playCrunch() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180 + Math.random() * 80, ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.06);
      }
    } catch {}
  }

  // Animal Sound Synthesizers (Procedural Audio for instant offline delight)
  public playAnimalSound(animalId: string) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      switch (animalId) {
        case 'dog': {
          // Woof! Woof! (2 short bark pulses)
          [0, 0.22].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(280, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + offset + 0.12);

            gain.gain.setValueAtTime(0.35, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.14);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.15);
          });
          break;
        }

        case 'cat': {
          // Meow~ (rising then falling smooth tone)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(450, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(750, ctx.currentTime + 0.2);
          osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.55);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.65);
          break;
        }

        case 'cow': {
          // Moo~ (deep, warm, resonant vibrating tone)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(130, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(155, ctx.currentTime + 0.25);
          osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.75);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.9);
          break;
        }

        case 'lion': {
          // Roar! (Low rumbling growl)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(80, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.7);

          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.85);
          break;
        }

        case 'elephant': {
          // Trumpet! (High brassy vibrato fanfare)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(620, ctx.currentTime + 0.15);
          osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + 0.5);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.65);
          break;
        }

        case 'bird': {
          // Chirp Chirp! (Fast high frequency trills)
          [0, 0.12, 0.24].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(2600, ctx.currentTime + offset + 0.08);

            gain.gain.setValueAtTime(0.2, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.09);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.1);
          });
          break;
        }

        case 'duck': {
          // Quack Quack!
          [0, 0.2].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + offset + 0.12);

            gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.14);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.15);
          });
          break;
        }

        case 'sheep': {
          // Baaa~
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(240, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(210, ctx.currentTime + 0.5);

          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.6);
          break;
        }

        default:
          this.playPop(500);
      }
    } catch {
      // fallback
    }
  }

  // Coin Pickup Sound
  public playCoin() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {}
  }

  // Card Flip Sound
  public playCardFlip() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  // Chest Open Jingle
  public playChestOpen() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        const st = ctx.currentTime + idx * 0.06;
        gain.gain.setValueAtTime(0.22, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(st);
        osc.stop(st + 0.35);
      });
    } catch {}
  }

  // Bridge Hop / Water Drop Step
  public playBridgeStep() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {}
  }

  // Alligator Snap Chomp
  public playAlligatorSnap() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }

  // Gentle Background Marimba BGM Loop Synthesizer
  private bgmTimer: number | null = null;
  private musicEnabled: boolean = false;

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }
  }

  public isMusicEnabled() {
    return this.musicEnabled;
  }

  private startBgmLoop() {
    this.stopBgmLoop();
    if (!this.musicEnabled) return;

    const chords = [
      [523.25, 659.25, 783.99], // C
      [440.0, 554.37, 659.25],  // A
      [349.23, 440.0, 523.25],  // F
      [392.0, 493.88, 587.33],  // G
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.musicEnabled) return;
      try {
        const ctx = this.initCtx();
        if (ctx) {
          const chord = chords[chordIdx % chords.length];
          chord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);

            const st = ctx.currentTime + i * 0.15;
            gain.gain.setValueAtTime(0.04, st);
            gain.gain.exponentialRampToValueAtTime(0.0001, st + 1.2);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(st);
            osc.stop(st + 1.25);
          });
          chordIdx++;
        }
      } catch {}
      this.bgmTimer = window.setTimeout(playChord, 1800);
    };

    playChord();
  }

  private stopBgmLoop() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Phonics letter chime
  public playLetterChime(freq = 600) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {}
  }

  // Kid-Friendly Speech Synthesis

  public speak(text: string, force = false) {
    if (!this.voiceEnabled && !force) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;  // Slightly slower, clear for nursery age
      utterance.pitch = 1.25; // Friendly, cheerful tone
      utterance.volume = 1;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria')))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech error handling
    }
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }
}

export const sound = new SoundEngine();
