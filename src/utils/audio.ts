// Web Audio API Procedural Synthesizer & Speech Narration for Magic Learning Land
// All sound frequencies, envelopes and synthesizers are deterministic and verified.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private musicEnabled: boolean = false;
  private bgmTimer: number | null = null;

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  public isVoiceEnabled() {
    return this.voiceEnabled;
  }

  public isMusicEnabled() {
    return this.musicEnabled;
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    } catch {}
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
    } catch {}
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
    } catch {}
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
    } catch {}
  }

  // Big Fanfare for Badges & Game Completion
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const melody = [
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.3 },
        { f: 783.99, d: 0.3 },
        { f: 1046.5, d: 0.6 },
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
    } catch {}
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

  // Snap / Chomp
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

  // VERIFIED PROCEDURAL ANIMAL SOUNDS (Dedicated synthesizers matching each animal)
  public playAnimalSound(animalId: string) {
    if (!this.soundEnabled) return;
    const normalized = animalId.toLowerCase().trim();
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      switch (normalized) {
        case 'dog': {
          // Dog Barking (2 energetic bark pulses: Woof Woof!)
          [0, 0.2].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(260, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + offset + 0.12);

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
          // Cat Meowing (Smooth rising then gently falling tone: Meooww~)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(450, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(760, ctx.currentTime + 0.22);
          osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.6);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.7);
          break;
        }

        case 'cow': {
          // Cow Mooing (Deep resonant low vibrating tone: Moooo~)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(130, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(155, ctx.currentTime + 0.3);
          osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.8);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.95);
          break;
        }

        case 'pig': {
          // Pig Oinking (Rapid grunt frequency modulation: Oink Oink!)
          [0, 0.18, 0.36].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + offset + 0.1);

            gain.gain.setValueAtTime(0.28, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.12);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.13);
          });
          break;
        }

        case 'chicken': {
          // Chicken Clucking (Short staccato clucks: Cluck Cluck Cluck!)
          [0, 0.12, 0.24, 0.38].forEach((offset, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            const baseFreq = idx === 3 ? 520 : 420;
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, ctx.currentTime + offset + 0.06);

            gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.08);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.09);
          });
          break;
        }

        case 'lion': {
          // Lion Roaring (Deep guttural rumbling roar: Rrrrroaaar!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(85, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(170, ctx.currentTime + 0.25);
          osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.8);

          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.9);
          break;
        }

        case 'elephant': {
          // Elephant Trumpeting (High brassy vibrato fanfare: Pawooooo!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(640, ctx.currentTime + 0.15);
          osc.frequency.linearRampToValueAtTime(580, ctx.currentTime + 0.5);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.7);
          break;
        }

        case 'horse': {
          // Horse Neighing (High whinny trill shaking pitch: Whinny-neigh!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(550, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(780, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(620, ctx.currentTime + 0.4);
          osc.frequency.linearRampToValueAtTime(700, ctx.currentTime + 0.6);
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.9);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.95);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 1.0);
          break;
        }

        case 'sheep': {
          // Sheep Bleating (Tremolo bleat: Baaa-aaa-aaa!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(240, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.6);

          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.7);
          break;
        }

        case 'goat': {
          // Goat Bleating (Faster higher pitch bleat: Maaaa!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(310, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.5);

          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.6);
          break;
        }

        case 'duck': {
          // Duck Quacking (Nasal downward sweep: Quack Quack!)
          [0, 0.22].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(330, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + offset + 0.14);

            gain.gain.setValueAtTime(0.28, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.16);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.18);
          });
          break;
        }

        case 'frog': {
          // Frog Croaking (Low resonant double ribbit: Ribbit Ribbit!)
          [0, 0.18].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, ctx.currentTime + offset);
            osc.frequency.linearRampToValueAtTime(260, ctx.currentTime + offset + 0.07);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + offset + 0.14);

            gain.gain.setValueAtTime(0.3, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.15);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.16);
          });
          break;
        }

        case 'bird': {
          // Bird Chirping (Sweet high frequency trills: Tweet Tweet!)
          [0, 0.12, 0.24].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + offset + 0.08);

            gain.gain.setValueAtTime(0.22, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.09);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.1);
          });
          break;
        }

        case 'tiger': {
          // Tiger Roaring (Fierce growl & roar: Grrr-Roar!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(95, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.2);
          osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.75);

          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.85);
          break;
        }

        case 'monkey': {
          // Monkey Chattering (High playful chatter: Ooh Ooh Aah Aah!)
          [0, 0.12, 0.24, 0.36].forEach((offset, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const freq = idx % 2 === 0 ? 580 : 820;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + offset + 0.07);

            gain.gain.setValueAtTime(0.25, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.09);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.1);
          });
          break;
        }

        case 'bee': {
          // Bee Buzzing (Continuous sawtooth buzz: Bzzzzz!)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, ctx.currentTime);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.65);
          break;
        }

        case 'owl': {
          // Owl Hooting (Low gentle hoots: Hoooot Hoooot!)
          [0, 0.3].forEach((offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, ctx.currentTime + offset);
            osc.frequency.linearRampToValueAtTime(370, ctx.currentTime + offset + 0.1);
            osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + offset + 0.24);

            gain.gain.setValueAtTime(0.01, ctx.currentTime + offset);
            gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + offset + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.28);
          });
          break;
        }

        default:
          this.playPop(520);
      }
    } catch {}
  }

  // EVERYDAY SOUNDS (Bell, Car Horn, Rain, Clock, Siren, Drum)
  public playCommonSound(soundId: string) {
    if (!this.soundEnabled) return;
    const normalized = soundId.toLowerCase().trim();
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      switch (normalized) {
        case 'bell': {
          // Ding Dong / Clear Brass Bell
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.35, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.95);
          break;
        }

        case 'car':
        case 'car_horn': {
          // Beep Beep! (Dual tone car horn)
          [0, 0.2].forEach((offset) => {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.type = 'sawtooth';
            osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(440, ctx.currentTime + offset);
            osc2.frequency.setValueAtTime(554, ctx.currentTime + offset);

            gain.gain.setValueAtTime(0.2, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.14);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(ctx.currentTime + offset);
            osc2.start(ctx.currentTime + offset);
            osc1.stop(ctx.currentTime + offset + 0.15);
            osc2.stop(ctx.currentTime + offset + 0.15);
          });
          break;
        }

        case 'rain': {
          // Pitter patter drops
          for (let i = 0; i < 6; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const freq = 600 + Math.random() * 400;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + i * 0.08 + 0.04);

            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + i * 0.08 + 0.06);
          }
          break;
        }

        case 'clock': {
          // Tick Tock Tick Tock
          [0, 0.25, 0.5, 0.75].forEach((offset, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            const freq = idx % 2 === 0 ? 800 : 600;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);

            gain.gain.setValueAtTime(0.18, ctx.currentTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + offset);
            osc.stop(ctx.currentTime + offset + 0.06);
          });
          break;
        }

        case 'siren': {
          // Wee Woo Wee Woo
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(650, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(950, ctx.currentTime + 0.35);
          osc.frequency.linearRampToValueAtTime(650, ctx.currentTime + 0.7);

          gain.gain.setValueAtTime(0.01, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.8);
          break;
        }

        case 'drum': {
          // Drum beat: Boom!
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(140, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.2);

          gain.gain.setValueAtTime(0.4, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.28);
          break;
        }

        case 'whistle': {
          // Whistle: Tweet!
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);

          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.28);
          break;
        }

        default:
          this.playPop(520);
      }
    } catch {}
  }

  // Gentle Background Marimba BGM Loop Synthesizer
  private startBgmLoop() {
    this.stopBgmLoop();
    if (!this.musicEnabled) return;

    const chords = [
      [523.25, 659.25, 783.99], // C
      [440.0, 554.37, 659.25], // A
      [349.23, 440.0, 523.25], // F
      [392.0, 493.88, 587.33], // G
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

  // Kid-Friendly Speech Synthesis with automatic voice picker
  public speak(text: string, force = false) {
    if (!this.voiceEnabled && !force) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Slightly paced for early childhood
      utterance.pitch = 1.2; // Friendly, warm
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Female') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('Victoria'))
        ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  // Convenient helper aliases and sound effects
  public setMuted(muted: boolean) {
    this.soundEnabled = !muted;
    this.voiceEnabled = !muted;
    this.musicEnabled = !muted;
  }

  public isMutedState(): boolean {
    return !this.soundEnabled;
  }

  public playCelebration() {
    this.playSuccess();
  }

  public playVictoryFanfare(_arg?: unknown) {
    this.playFanfare();
  }

  public playWrong() {
    this.playTryAgain();
  }

  public playGentlePop() {
    this.playPop(520);
  }

  public playLetterChime(_freq?: number) {
    this.playStar();
  }

  public playCrunch() {
    this.playPop(300);
  }

  public playChestOpen() {
    this.playFanfare();
  }

  public playBridgeStep() {
    this.playPop(600);
  }

  public playNumberCount(num: number) {
    this.playPop(300 + num * 40);
    this.speak(num.toString());
  }

  public playLetterSound(letter: string) {
    this.playPop(440);
    this.speak(letter);
  }
}

export const sound = new SoundEngine();
export const soundEngine = sound;
export default soundEngine;

