import type { WeaponId } from './types';

/**
 * Every sound in the game is synthesized at runtime. No audio assets are used.
 */
export class AudioSynth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private footParity = false;
  enabled = true;

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 22;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.22;
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(compressor);
    compressor.connect(this.ctx.destination);
    const length = Math.floor(this.ctx.sampleRate * 1.5);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = last * 0.32 + white * 0.68;
      data[i] = last;
    }
    this.noiseBuffer = buffer;
  }

  resume() {
    if (this.ctx?.state === 'suspended') void this.ctx.resume();
  }

  private get time() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  private noise(duration: number, gain: number, filterType: BiquadFilterType, frequency: number, q = 1, delay = 0, rate = 1) {
    if (!this.ctx || !this.master || !this.noiseBuffer || !this.enabled) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = rate;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const env = this.ctx.createGain();
    const t = this.time + delay;
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.004);
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(filter);
    filter.connect(env);
    env.connect(this.master);
    src.start(t, Math.random() * 0.3);
    src.stop(t + duration + 0.03);
  }

  private tone(
    type: OscillatorType, freq: number, endFreq: number, duration: number, gain: number,
    delay = 0, attack = 0.004,
  ) {
    if (!this.ctx || !this.master || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    const t = this.time + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(env);
    env.connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.03);
  }

  shoot(id: WeaponId) {
    this.init();
    if (!this.ctx) return;
    if (id === 'ak47') {
      this.noise(0.18, 0.68, 'lowpass', 1850, 0.8);
      this.noise(0.055, 0.32, 'highpass', 3300, 0.7);
      this.tone('sine', 92, 38, 0.2, 0.52);
      this.tone('square', 170, 60, 0.055, 0.1);
    } else if (id === 'm4a4') {
      this.noise(0.13, 0.46, 'lowpass', 2700, 1.1);
      this.noise(0.045, 0.3, 'highpass', 4200, 0.8);
      this.tone('sine', 125, 48, 0.12, 0.28);
      this.tone('triangle', 250, 90, 0.04, 0.09);
    } else if (id === 'awp') {
      this.noise(0.55, 0.9, 'lowpass', 1500, 0.7);
      this.noise(0.09, 0.48, 'highpass', 3000, 0.8);
      this.tone('sine', 63, 22, 0.6, 0.72);
      this.tone('sawtooth', 105, 30, 0.28, 0.17);
      this.noise(0.3, 0.16, 'lowpass', 700, 0.6, 0.09);
    } else if (id === 'deagle') {
      this.noise(0.24, 0.72, 'lowpass', 2200, 0.9);
      this.tone('sine', 105, 35, 0.26, 0.54);
      this.tone('square', 210, 70, 0.06, 0.15);
      this.noise(0.08, 0.28, 'highpass', 3600, 0.8);
    } else if (id === 'knife') {
      this.noise(0.16, 0.22, 'bandpass', 2400, 2.5, 0, 1.5);
      this.tone('sine', 1400, 340, 0.13, 0.045);
    } else if (id === 'usp') {
      this.noise(0.12, 0.32, 'bandpass', 1500, 1.2);
      this.noise(0.035, 0.2, 'highpass', 4500, 0.7);
      this.tone('sine', 180, 65, 0.11, 0.2);
    } else {
      this.noise(0.11, 0.32, 'bandpass', 1750, 1.1);
      this.noise(0.03, 0.2, 'highpass', 5000, 0.8);
      this.tone('triangle', 220, 80, 0.1, 0.17);
    }
  }

  reload(id: WeaponId) {
    this.init();
    if (id === 'awp') {
      this.noise(0.06, 0.18, 'bandpass', 1800, 2, 0.06);
      this.noise(0.08, 0.2, 'bandpass', 900, 1.5, 0.7);
      this.noise(0.05, 0.22, 'bandpass', 2400, 2, 1.25);
      this.noise(0.07, 0.24, 'bandpass', 1300, 1.5, 1.6);
    } else {
      this.noise(0.05, 0.16, 'bandpass', 1500, 2, 0.08);
      this.noise(0.055, 0.18, 'bandpass', 900, 1.6, 0.38);
      this.tone('square', 280, 160, 0.025, 0.04, 0.5);
    }
  }

  empty() {
    this.init();
    this.noise(0.025, 0.12, 'highpass', 3200, 0.8);
    this.tone('square', 700, 450, 0.025, 0.03);
  }

  switchWeapon() {
    this.init();
    this.noise(0.05, 0.12, 'bandpass', 2200, 1.8);
  }

  footstep(volume = 1, _team: 'CT' | 'T' = 'CT') {
    if (!this.ctx) return;
    this.footParity = !this.footParity;
    const freq = this.footParity ? 460 : 620;
    this.noise(0.065, 0.12 * volume, 'lowpass', 780, 0.8, 0, this.footParity ? 1 : 0.9);
    this.tone('sine', freq, 180, 0.06, 0.025 * volume);
  }

  scope() {
    this.init();
    this.noise(0.05, 0.13, 'bandpass', 1900, 3);
    this.tone('sine', 900, 480, 0.12, 0.035);
    this.noise(0.06, 0.09, 'bandpass', 3200, 4, 0.1);
  }

  hit(headshot = false) {
    this.init();
    this.tone('sine', headshot ? 1550 : 980, headshot ? 1100 : 760, 0.075, headshot ? 0.13 : 0.075);
    if (headshot) this.tone('triangle', 2200, 1600, 0.1, 0.05, 0.025);
  }

  kill() {
    this.init();
    this.tone('triangle', 660, 660, 0.12, 0.06);
    this.tone('triangle', 990, 990, 0.16, 0.055, 0.08);
    this.tone('sine', 1320, 1320, 0.2, 0.035, 0.15);
  }

  damage() {
    this.init();
    this.noise(0.13, 0.3, 'lowpass', 500, 0.8);
    this.tone('sine', 80, 45, 0.18, 0.18);
  }

  beep(high = false) {
    this.init();
    this.tone('square', high ? 1480 : 1120, high ? 1200 : 980, 0.075, 0.04);
  }

  plant() {
    this.init();
    for (let i = 0; i < 4; i++) {
      this.noise(0.035, 0.13, 'bandpass', 1200 + i * 260, 2, i * 0.08);
    }
    this.tone('square', 880, 660, 0.22, 0.04, 0.45);
  }

  defuseTick(progress: number) {
    this.init();
    this.tone('square', 720 + progress * 220, 760 + progress * 220, 0.04, 0.025);
    this.noise(0.03, 0.08, 'highpass', 2600, 1);
  }

  defused() {
    this.init();
    this.tone('sine', 620, 880, 0.22, 0.08);
    this.tone('triangle', 880, 1320, 0.35, 0.06, 0.14);
  }

  explosion() {
    this.init();
    this.noise(1.9, 1.0, 'lowpass', 620, 0.7);
    this.noise(0.3, 0.65, 'highpass', 1400, 0.6);
    this.tone('sine', 52, 18, 1.7, 0.8);
    this.tone('sawtooth', 90, 24, 0.7, 0.22);
    this.noise(0.9, 0.24, 'lowpass', 320, 0.8, 0.35);
  }

  roundStart() {
    this.init();
    this.tone('triangle', 440, 440, 0.12, 0.04);
    this.tone('triangle', 660, 660, 0.15, 0.04, 0.13);
    this.tone('triangle', 880, 880, 0.2, 0.04, 0.27);
  }

  roundEnd(win: boolean) {
    this.init();
    if (win) {
      this.tone('triangle', 523, 523, 0.2, 0.05);
      this.tone('triangle', 659, 659, 0.2, 0.05, 0.18);
      this.tone('triangle', 784, 784, 0.34, 0.055, 0.36);
    } else {
      this.tone('sine', 330, 300, 0.32, 0.05);
      this.tone('sine', 247, 210, 0.45, 0.045, 0.22);
    }
  }

  pickup() {
    this.init();
    this.tone('square', 720, 960, 0.07, 0.035);
    this.tone('square', 1080, 1320, 0.08, 0.03, 0.08);
  }

  door() {
    this.noise(0.4, 0.08, 'bandpass', 430, 1.6, 0, 0.7);
    this.tone('sawtooth', 110, 80, 0.35, 0.015);
  }

  whistle() {
    this.init();
    this.tone('sine', 1600, 1200, 0.2, 0.025);
    this.tone('sine', 1200, 900, 0.24, 0.02, 0.2);
  }

  close() {
    if (this.ctx) {
      void this.ctx.close().catch(() => {});
      this.ctx = null;
      this.master = null;
      this.noiseBuffer = null;
    }
  }
}
