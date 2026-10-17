import type { WeaponDef } from './weapons';

/** Fully procedural Web Audio sound engine. No sample assets are used. */
export class AudioManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private enabled = true;
  private volume = 0.7;

  init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    const master = ctx.createGain();
    master.gain.value = this.volume;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.knee.value = 20;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.22;
    master.connect(compressor);
    compressor.connect(ctx.destination);
    this.master = master;
    this.compressor = compressor;

    const len = Math.floor(ctx.sampleRate * 1.2);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = last * 0.55 + white * 0.45;
      data[i] = last;
    }
    this.noiseBuffer = buffer;
  }

  setEnabled(v: boolean) {
    this.enabled = v;
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(v ? this.volume : 0, this.ctx.currentTime, 0.03);
  }

  isEnabled() {
    return this.enabled;
  }

  private get ready(): boolean {
    return !!(this.enabled && this.ctx && this.master && this.ctx.state !== 'closed');
  }

  private panner(pan: number): StereoPannerNode | null {
    if (!this.ctx) return null;
    if (typeof this.ctx.createStereoPanner === 'function') {
      const p = this.ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, pan));
      return p;
    }
    return null;
  }

  private noise(duration: number, gain: number, filterType: BiquadFilterType, freq: number, pan = 0, rate = 1) {
    if (!this.ready || !this.noiseBuffer || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.playbackRate.value = rate;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = filterType === 'bandpass' ? 1.2 : 0.7;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    src.connect(filter);
    filter.connect(g);
    const p = this.panner(pan);
    if (p) {
      g.connect(p);
      p.connect(this.master);
    } else {
      g.connect(this.master);
    }
    src.start(t);
    src.stop(t + duration + 0.02);
  }

  private tone(freq: number, duration: number, gain: number, type: OscillatorType, endFreq?: number, delay = 0, pan = 0) {
    if (!this.ready || !this.ctx || !this.master) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g);
    const p = this.panner(pan);
    if (p) {
      g.connect(p);
      p.connect(this.master);
    } else g.connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.03);
  }

  private spatial(dist: number, pan: number): number {
    return 1 / (1 + Math.max(0, dist) / 20);
  }

  shot(weapon: WeaponDef, dist = 0, pan = 0) {
    if (!this.ready) return;
    const p = this.spatial(dist, pan);
    const s = weapon.sound;
    const vol = s.volume * Math.max(0.08, p);
    if (s.kind === 'rifle' || s.kind === 'smg') {
      this.noise(s.duration, vol * 0.7, 'lowpass', 2600 * s.pitch, pan, 1.2);
      this.noise(0.075, vol * 0.45, 'bandpass', 4300 * s.pitch, pan, 1.6);
      this.tone(120 * s.pitch, 0.16, vol * 0.32, 'sawtooth', 52 * s.pitch, 0, pan);
    } else if (s.kind === 'heavy') {
      this.noise(0.75, vol * 0.8, 'lowpass', 1750, pan, 0.62);
      this.noise(0.22, vol * 0.55, 'bandpass', 2200, pan, 0.85);
      this.tone(95, 0.55, vol * 0.5, 'sawtooth', 34, 0, pan);
      this.tone(1900, 0.16, vol * 0.08, 'sine', 400, 0.01, pan);
    } else if (s.kind === 'pistol') {
      this.noise(0.11, vol * 0.72, 'highpass', 900, pan, 1.6);
      this.noise(0.16, vol * 0.32, 'bandpass', 2400 * s.pitch, pan, 1.2);
      this.tone(230 * s.pitch, 0.09, vol * 0.23, 'triangle', 80 * s.pitch, 0, pan);
    } else if (s.kind === 'deagle') {
      this.noise(0.34, vol * 0.8, 'lowpass', 3200, pan, 0.9);
      this.tone(150, 0.3, vol * 0.45, 'sawtooth', 45, 0, pan);
      this.noise(0.12, vol * 0.38, 'highpass', 1500, pan, 1.4);
    } else {
      this.noise(0.12, vol * 0.4, 'bandpass', 2300, pan, 1);
    }
  }

  knife() {
    if (!this.ready) return;
    this.noise(0.13, 0.26, 'bandpass', 2600, 0, 2.2);
    this.tone(730, 0.08, 0.06, 'triangle', 300);
  }

  reload(duration: number, kind: string) {
    if (!this.ready) return;
    const pitch = kind === 'heavy' ? 0.8 : kind === 'pistol' ? 1.4 : 1;
    this.tone(410 * pitch, 0.045, 0.1, 'square', 270 * pitch, 0.03);
    this.noise(0.055, 0.12, 'highpass', 2800, 0, 1.5);
    this.tone(320 * pitch, 0.055, 0.09, 'square', 210 * pitch, duration * 0.6);
    this.noise(0.07, 0.1, 'bandpass', 1900, 0, 1);
  }

  empty() {
    if (!this.ready) return;
    this.tone(760, 0.045, 0.08, 'square', 380);
    this.noise(0.03, 0.05, 'highpass', 3000);
  }

  scope() {
    if (!this.ready) return;
    this.tone(1500, 0.045, 0.07, 'square', 900);
    this.tone(720, 0.08, 0.055, 'sine', 350, 0.04);
    this.noise(0.05, 0.04, 'bandpass', 4200, 0, 2);
  }

  footstep(running: boolean, dist = 0, pan = 0) {
    if (!this.ready) return;
    const amp = (running ? 0.14 : 0.07) * Math.max(0.1, this.spatial(dist, pan));
    this.noise(running ? 0.11 : 0.085, amp, 'lowpass', running ? 520 : 380, pan, 0.75 + Math.random() * 0.2);
    this.tone(running ? 92 : 75, 0.06, amp * 0.24, 'sine', 45, 0, pan);
  }

  hit(headshot: boolean) {
    if (!this.ready) return;
    if (headshot) {
      this.tone(1450, 0.09, 0.13, 'triangle', 2100);
      this.tone(2100, 0.07, 0.08, 'sine', 1400, 0.015);
      this.noise(0.06, 0.07, 'highpass', 3800);
    } else {
      this.tone(420, 0.055, 0.08, 'triangle', 250);
      this.noise(0.045, 0.055, 'bandpass', 1300);
    }
  }

  kill() {
    if (!this.ready) return;
    this.tone(880, 0.08, 0.1, 'triangle', 1320);
    this.tone(1320, 0.12, 0.08, 'sine', 1760, 0.07);
  }

  damage() {
    if (!this.ready) return;
    this.noise(0.12, 0.16, 'lowpass', 500);
    this.tone(140, 0.16, 0.09, 'sawtooth', 60);
  }

  bombPlant() {
    if (!this.ready) return;
    this.tone(880, 0.08, 0.09, 'square', 660);
    this.tone(660, 0.1, 0.08, 'square', 440, 0.15);
    this.noise(0.08, 0.08, 'bandpass', 1700, 0, 1.2);
  }

  bombBeep(last: boolean) {
    if (!this.ready) return;
    this.tone(last ? 1450 : 1180, 0.055, last ? 0.12 : 0.07, 'square', last ? 1180 : 980);
  }

  bombDefuse(done: boolean) {
    if (!this.ready) return;
    if (done) {
      this.tone(700, 0.1, 0.1, 'sine', 1000);
      this.tone(1050, 0.2, 0.08, 'sine', 1400, 0.08);
    } else {
      this.noise(0.06, 0.06, 'bandpass', 2400, 0, 1.3);
      this.tone(540, 0.04, 0.04, 'square', 720);
    }
  }

  explosion() {
    if (!this.ready) return;
    this.noise(1.9, 0.95, 'lowpass', 900, 0, 0.5);
    this.noise(0.9, 0.6, 'bandpass', 320, 0, 0.42);
    this.tone(110, 1.5, 0.7, 'sawtooth', 26);
    this.tone(55, 1.8, 0.4, 'sine', 20);
    this.tone(2200, 0.3, 0.12, 'sine', 200);
  }

  roundStart() {
    if (!this.ready) return;
    this.tone(520, 0.12, 0.08, 'sine', 680);
    this.tone(780, 0.16, 0.07, 'sine', 980, 0.12);
  }

  win() {
    if (!this.ready) return;
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.2, 0.08, 'triangle', f, i * 0.1));
  }

  lose() {
    if (!this.ready) return;
    [392, 330, 262].forEach((f, i) => this.tone(f, 0.26, 0.08, 'triangle', f * 0.96, i * 0.14));
  }

  pickup() {
    if (!this.ready) return;
    this.tone(420, 0.06, 0.06, 'square', 620);
    this.tone(650, 0.09, 0.05, 'sine', 880, 0.055);
  }
}
