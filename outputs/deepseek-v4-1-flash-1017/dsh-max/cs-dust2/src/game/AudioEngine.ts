import type { WeaponId } from './types';

type ShotProfile = {
  bodyFreq: number;
  bodyType: OscillatorType;
  noiseFreq: number;
  noiseQ: number;
  duration: number;
  noiseGain: number;
  tail: number;
  crackFreq: number;
};

const SHOT_PROFILES: Record<Exclude<WeaponId, 'knife'>, ShotProfile> = {
  ak47: {
    bodyFreq: 96,
    bodyType: 'triangle',
    noiseFreq: 820,
    noiseQ: 0.6,
    duration: 0.19,
    noiseGain: 0.58,
    tail: 0.24,
    crackFreq: 2300,
  },
  m4a4: {
    bodyFreq: 165,
    bodyType: 'square',
    noiseFreq: 1650,
    noiseQ: 0.8,
    duration: 0.12,
    noiseGain: 0.4,
    tail: 0.1,
    crackFreq: 3600,
  },
  awp: {
    bodyFreq: 52,
    bodyType: 'sine',
    noiseFreq: 520,
    noiseQ: 0.35,
    duration: 0.5,
    noiseGain: 0.85,
    tail: 0.7,
    crackFreq: 1800,
  },
  glock: {
    bodyFreq: 210,
    bodyType: 'triangle',
    noiseFreq: 1350,
    noiseQ: 0.7,
    duration: 0.09,
    noiseGain: 0.32,
    tail: 0.07,
    crackFreq: 3000,
  },
  usp: {
    bodyFreq: 260,
    bodyType: 'triangle',
    noiseFreq: 1750,
    noiseQ: 1.2,
    duration: 0.08,
    noiseGain: 0.26,
    tail: 0.07,
    crackFreq: 3400,
  },
  deagle: {
    bodyFreq: 135,
    bodyType: 'sawtooth',
    noiseFreq: 980,
    noiseQ: 0.5,
    duration: 0.22,
    noiseGain: 0.62,
    tail: 0.3,
    crackFreq: 2400,
  },
};

/** All sounds are synthesized live with oscillators, noise and filters. */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private ambientStarted = false;
  private muted = false;
  private masterVolume = 0.72;

  async init(): Promise<void> {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.masterVolume;
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -16;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 8;
      this.compressor.attack.value = 0.002;
      this.compressor.release.value = 0.22;
      this.master.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
      this.noiseBuffer = this.makeNoiseBuffer(this.ctx);
    }
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Browser may defer until the next gesture; every play() attempts resume too.
      }
    }
    if (!this.ambientStarted) {
      this.ambientStarted = true;
      this.startAmbient();
    }
  }

  resume(): void {
    if (this.ctx?.state === 'suspended') void this.ctx.resume();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : this.masterVolume, this.ctx.currentTime, 0.03);
    }
  }

  get isMuted(): boolean {
    return this.muted;
  }

  private makeNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const length = Math.floor(ctx.sampleRate * 1.1);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      // A touch of smoothing takes the edge off pure white noise.
      last = white * 0.82 + last * 0.18;
      data[i] = last;
    }
    return buffer;
  }

  private ensure(): boolean {
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return true;
  }

  private get now(): number {
    return this.ctx?.currentTime ?? 0;
  }

  private noiseSource(): AudioBufferSourceNode | null {
    if (!this.ctx || !this.noiseBuffer) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    return src;
  }

  private makePanner(pan: number): StereoPannerNode | null {
    if (!this.ctx) return null;
    const panner = this.ctx.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    return panner;
  }

  private route(pan: number, gainValue: number, when = this.now): { gain: GainNode; panner: StereoPannerNode } | null {
    if (!this.ctx || !this.master) return null;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(Math.max(0.0001, gainValue), when);
    const panner = this.makePanner(pan);
    if (!panner) return null;
    gain.connect(panner);
    panner.connect(this.master);
    return { gain, panner };
  }

  private noiseBurst(opts: {
    when?: number;
    duration: number;
    gain: number;
    pan: number;
    filterType?: BiquadFilterType;
    frequency: number;
    q?: number;
    sweepTo?: number;
    attack?: number;
    delay?: number;
  }): void {
    if (!this.ensure() || !this.ctx) return;
    const normalizedGain = Math.max(0.0002, opts.gain);
    if (normalizedGain <= 0.0002) return;
    const src = this.noiseSource();
    if (!src) return;
    const when = (opts.when ?? this.now) + (opts.delay ?? 0);
    const route = this.route(opts.pan, normalizedGain, when);
    if (!route) return;
    const filter = this.ctx.createBiquadFilter();
    filter.type = opts.filterType ?? 'bandpass';
    filter.frequency.setValueAtTime(opts.frequency, when);
    if (opts.sweepTo) filter.frequency.exponentialRampToValueAtTime(Math.max(20, opts.sweepTo), when + opts.duration);
    filter.Q.value = opts.q ?? 0.7;
    const attack = opts.attack ?? 0.002;
    route.gain.gain.setValueAtTime(0.0001, when);
    route.gain.gain.exponentialRampToValueAtTime(normalizedGain, when + attack);
    route.gain.gain.exponentialRampToValueAtTime(0.0001, when + opts.duration);
    src.connect(filter);
    filter.connect(route.gain);
    src.start(when);
    src.stop(when + opts.duration + 0.03);
  }

  private tone(opts: {
    frequency: number;
    endFrequency?: number;
    duration: number;
    gain: number;
    pan: number;
    type?: OscillatorType;
    delay?: number;
    attack?: number;
    when?: number;
  }): void {
    if (!this.ensure() || !this.ctx) return;
    const normalizedGain = Math.max(0.0002, opts.gain);
    if (normalizedGain <= 0.0002) return;
    const when = (opts.when ?? this.now) + (opts.delay ?? 0);
    const route = this.route(opts.pan, normalizedGain, when);
    if (!route) return;
    const osc = this.ctx.createOscillator();
    osc.type = opts.type ?? 'sine';
    osc.frequency.setValueAtTime(opts.frequency, when);
    if (opts.endFrequency) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, opts.endFrequency), when + opts.duration);
    }
    const attack = opts.attack ?? 0.003;
    route.gain.gain.setValueAtTime(0.0001, when);
    route.gain.gain.exponentialRampToValueAtTime(normalizedGain, when + attack);
    route.gain.gain.exponentialRampToValueAtTime(0.0001, when + opts.duration);
    osc.connect(route.gain);
    osc.start(when);
    osc.stop(when + opts.duration + 0.03);
  }

  private click(when: number, pan: number, freq = 1600, gain = 0.06, delay = 0): void {
    this.noiseBurst({
      when,
      delay,
      duration: 0.032,
      gain,
      pan,
      filterType: 'bandpass',
      frequency: freq,
      q: 1.8,
      attack: 0.001,
    });
    this.tone({
      when,
      delay,
      frequency: freq * 0.6,
      endFrequency: freq * 0.28,
      duration: 0.035,
      gain: gain * 0.6,
      pan,
      type: 'square',
    });
  }

  shot(weapon: WeaponId, pan: number, volume = 1): void {
    if (!this.ensure()) return;
    if (weapon === 'knife') {
      this.noiseBurst({
        duration: 0.18,
        gain: 0.2 * volume,
        pan,
        filterType: 'bandpass',
        frequency: 1800,
        sweepTo: 260,
        q: 1.1,
      });
      this.tone({ frequency: 420, endFrequency: 90, duration: 0.12, gain: 0.04 * volume, pan, type: 'sine' });
      return;
    }
    const profile = SHOT_PROFILES[weapon];
    const when = this.now;
    this.tone({
      when,
      frequency: profile.bodyFreq,
      endFrequency: profile.bodyFreq * 0.55,
      duration: profile.duration,
      gain: 0.24 * volume,
      pan,
      type: profile.bodyType,
    });
    this.noiseBurst({
      when,
      duration: profile.duration,
      gain: profile.noiseGain * volume,
      pan,
      filterType: 'bandpass',
      frequency: profile.noiseFreq,
      q: profile.noiseQ,
    });
    this.noiseBurst({
      when,
      duration: 0.045,
      gain: 0.3 * volume,
      pan,
      filterType: 'highpass',
      frequency: profile.crackFreq,
      q: 0.5,
    });
    this.tone({
      when,
      frequency: 55,
      endFrequency: 32,
      duration: profile.tail,
      gain: 0.16 * volume,
      pan,
      type: 'sine',
    });
    if (weapon === 'awp') {
      this.noiseBurst({
        when,
        duration: 0.55,
        gain: 0.18 * volume,
        pan,
        filterType: 'lowpass',
        frequency: 340,
        sweepTo: 90,
        q: 0.5,
      });
    }
  }

  reload(weapon: WeaponId, totalTime: number, pan = 0): void {
    if (!this.ensure()) return;
    const now = this.now;
    const rifle = weapon === 'ak47' || weapon === 'm4a4' || weapon === 'awp';
    this.click(now, pan, rifle ? 850 : 1100, 0.07);
    this.click(now, pan, rifle ? 1300 : 1500, 0.045, totalTime * 0.34);
    this.click(now, pan, rifle ? 1050 : 1250, 0.055, totalTime * 0.62);
    if (weapon === 'awp') {
      this.click(now, pan, 700, 0.08, totalTime * 0.78);
      this.tone({
        frequency: 240,
        endFrequency: 180,
        duration: 0.1,
        gain: 0.03,
        pan,
        type: 'triangle',
        delay: totalTime * 0.78,
      });
    }
  }

  footstep(surface: 'sand' | 'concrete' | 'tunnel', volume = 1, pan = 0): void {
    if (!this.ensure()) return;
    const freq = surface === 'sand' ? 560 : surface === 'tunnel' ? 330 : 430;
    this.noiseBurst({
      duration: 0.085,
      gain: 0.11 * volume,
      pan,
      filterType: 'lowpass',
      frequency: freq,
      q: 0.8,
      attack: 0.001,
    });
    this.tone({
      frequency: surface === 'tunnel' ? 78 : 62,
      endFrequency: 36,
      duration: 0.08,
      gain: 0.035 * volume,
      pan,
      type: 'sine',
    });
  }

  scope(): void {
    if (!this.ensure()) return;
    this.click(this.now, 0, 2200, 0.055);
    this.tone({ frequency: 520, endFrequency: 760, duration: 0.1, gain: 0.03, pan: 0.05, type: 'triangle' });
  }

  hit(headshot: boolean): void {
    if (!this.ensure()) return;
    const when = this.now;
    this.tone({
      when,
      frequency: headshot ? 1420 : 880,
      duration: 0.06,
      gain: 0.065,
      pan: 0.15,
      type: 'triangle',
    });
    if (headshot) {
      this.tone({ when, frequency: 1900, duration: 0.09, gain: 0.04, pan: 0.1, type: 'sine', delay: 0.018 });
    }
  }

  damage(): void {
    if (!this.ensure()) return;
    this.tone({ frequency: 82, endFrequency: 44, duration: 0.18, gain: 0.12, pan: 0, type: 'sawtooth' });
    this.noiseBurst({ duration: 0.11, gain: 0.12, pan: 0, filterType: 'lowpass', frequency: 280 });
  }

  kill(headshot = false): void {
    if (!this.ensure()) return;
    const now = this.now;
    this.tone({ when: now, frequency: 660, duration: 0.08, gain: 0.05, pan: 0.2, type: 'triangle' });
    this.tone({ when: now, frequency: 990, duration: 0.12, gain: 0.045, pan: 0.2, type: 'triangle', delay: 0.07 });
    if (headshot) {
      this.tone({ when: now, frequency: 1320, duration: 0.14, gain: 0.035, pan: 0.2, type: 'sine', delay: 0.14 });
    }
  }

  roundStart(): void {
    if (!this.ensure()) return;
    const now = this.now;
    this.tone({ when: now, frequency: 290, duration: 0.13, gain: 0.055, pan: 0, type: 'triangle' });
    this.tone({ when: now, frequency: 390, duration: 0.22, gain: 0.05, pan: 0, type: 'triangle', delay: 0.14 });
  }

  result(won: boolean): void {
    if (!this.ensure()) return;
    const now = this.now;
    if (won) {
      [392, 523.25, 659.25].forEach((freq, i) => {
        this.tone({ when: now, frequency: freq, duration: 0.3, gain: 0.045, pan: 0, type: 'triangle', delay: i * 0.12 });
      });
    } else {
      [220, 174.61, 130.81].forEach((freq, i) => {
        this.tone({ when: now, frequency: freq, duration: 0.34, gain: 0.04, pan: 0, type: 'sine', delay: i * 0.14 });
      });
    }
  }

  bombPlantStart(): void {
    if (!this.ensure()) return;
    const now = this.now;
    this.click(now, 0, 1600, 0.05);
    this.tone({ when: now, frequency: 640, duration: 0.12, gain: 0.03, pan: 0, type: 'square', delay: 0.06 });
  }

  bombPlanted(): void {
    if (!this.ensure()) return;
    const now = this.now;
    this.tone({ when: now, frequency: 830, duration: 0.09, gain: 0.06, pan: 0, type: 'square' });
    this.tone({ when: now, frequency: 830, duration: 0.09, gain: 0.06, pan: 0, type: 'square', delay: 0.14 });
    this.tone({ when: now, frequency: 1100, duration: 0.2, gain: 0.03, pan: 0, type: 'sine', delay: 0.28 });
  }

  bombBeep(pan = 0, volume = 0.8): void {
    if (!this.ensure()) return;
    this.tone({
      frequency: 1760,
      duration: 0.055,
      gain: 0.035 * volume,
      pan,
      type: 'square',
      attack: 0.001,
    });
  }

  defuseTick(pan = 0): void {
    if (!this.ensure()) return;
    this.click(this.now, pan, 1200, 0.035);
    this.tone({ frequency: 420, endFrequency: 300, duration: 0.08, gain: 0.02, pan, type: 'triangle' });
  }

  explosion(): void {
    if (!this.ensure()) return;
    const now = this.now;
    this.tone({ when: now, frequency: 62, endFrequency: 22, duration: 2.2, gain: 0.48, pan: 0, type: 'sine' });
    this.noiseBurst({
      when: now,
      duration: 2.0,
      gain: 0.6,
      pan: 0,
      filterType: 'lowpass',
      frequency: 1300,
      sweepTo: 60,
      q: 0.6,
      attack: 0.001,
    });
    this.noiseBurst({
      when: now,
      duration: 0.5,
      gain: 0.45,
      pan: 0,
      filterType: 'highpass',
      frequency: 2000,
      q: 0.4,
      attack: 0.001,
    });
    for (let i = 0; i < 9; i++) {
      this.noiseBurst({
        when: now,
        delay: 0.12 + Math.random() * 0.9,
        duration: 0.09,
        gain: 0.055,
        pan: (Math.random() - 0.5) * 0.7,
        filterType: 'bandpass',
        frequency: 700 + Math.random() * 1300,
        q: 0.8,
      });
    }
  }

  pickup(): void {
    if (!this.ensure()) return;
    this.tone({ frequency: 300, endFrequency: 430, duration: 0.09, gain: 0.035, pan: 0, type: 'triangle' });
  }

  uiClick(): void {
    if (!this.ensure()) return;
    this.tone({ frequency: 780, duration: 0.045, gain: 0.025, pan: 0, type: 'square' });
  }

  dispose(): void {
    this.ambientStarted = false;
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.master = null;
      this.compressor = null;
      this.noiseBuffer = null;
    }
  }

  private startAmbient(): void {
    if (!this.ctx || !this.master || !this.noiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;
    filter.Q.value = 0.3;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.013;
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.006;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start();
    lfo.start();
  }
}
