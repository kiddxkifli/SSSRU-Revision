/**
 * Web Audio & Speech Synthesis Engine for Tajwid examples and Quranic citations
 */

class AudioPronunciationEngine {
  private audioCtx: AudioContext | null = null;

  private initCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play Harakat meter (e.g. 2, 4, 6 harakat metronome tempo)
  public playHarakatMeter(counts: number = 4) {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const beatInterval = 0.45; // ~0.45s per harakat standard tarannum tempo

    for (let i = 0; i < counts; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(i === 0 ? 587.33 : 440, now + i * beatInterval); // D5 then A4

      gain.gain.setValueAtTime(0, now + i * beatInterval);
      gain.gain.linearRampToValueAtTime(0.25, now + i * beatInterval + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * beatInterval - 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * beatInterval);
      osc.stop(now + (i + 1) * beatInterval);
    }
  }

  // Play Saktah Demonstration (Sound -> 2 Harakat Silence with zero-breath marker -> Sound resumes)
  public playSaktahDemo(onComplete?: () => void) {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First word recitation tone: 'عِوَجَا'
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(392.00, now); // G4
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.2);

    // Saktah pause is exactly between 1.2s and 2.4s (Zero breath, silence)
    // Then resume 'قَيِّمَا'
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440.00, now + 2.4); // A4
    gain2.gain.setValueAtTime(0.3, now + 2.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 3.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 2.4);
    osc2.stop(now + 3.6);

    if (onComplete) {
      setTimeout(onComplete, 3700);
    }
  }

  // Play Ra' Tafkhim vs Tarqiq demonstration
  public playTafkhimTarqiqDemo(type: 'tarqiq' | 'tafkhim') {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    if (type === 'tarqiq') {
      // Thin, lighter timbre (higher resonant peak, lower fundamental formant)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now); // F4
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(300, now);
    } else {
      // Thick, heavier, fuller resonant chest timbre
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220.00, now); // A3 deeper
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
    }

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.4);

    // Speak phonetic explanation if supported
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = type === 'tarqiq' 
        ? "Tarqiq: Bunyi Ra nipis kerana baris bawah (kasrah). Contoh: Fil-amr."
        : "Tafkhim: Bunyi Ra tebal kerana baris atas (fathah) atau hadapan (dhommah).";
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ms-MY';
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  }
}

export const audioEngine = new AudioPronunciationEngine();
