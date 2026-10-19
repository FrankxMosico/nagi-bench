import type { WeaponId } from '../engine/weapons.ts';

/*
 * Fully procedural sound: every effect is synthesised at runtime with the Web Audio API
 * (filtered noise bursts + pitched oscillators + a generated reverb impulse). No audio files.
 * World sounds go through HRTF panners so enemy footsteps/shots are directional.
 */

interface GunProfile {
  crackHP: number;
  crackDecay: number;
  crackGain: number;
  bodyF: number;
  bodyQ: number;
  bodyDecay: number;
  bodyGain: number;
  thumpF0: number;
  thumpF1: number;
  thumpDecay: number;
  thumpGain: number;
  tailLP: number;
  tailDecay: number;
  tailGain: number;
}

const GUNS: Partial<Record<WeaponId, GunProfile>> = {
  // AK: heavy, low, long-ish tail.
  ak47: { crackHP: 1100, crackDecay: 0.09, crackGain: 0.85, bodyF: 650, bodyQ: 0.8, bodyDecay: 0.13, bodyGain: 0.85, thumpF0: 150, thumpF1: 42, thumpDecay: 0.17, thumpGain: 0.95, tailLP: 1300, tailDecay: 0.55, tailGain: 0.45 },
  // M4: tighter, brighter, shorter.
  m4a4: { crackHP: 2300, crackDecay: 0.055, crackGain: 0.7, bodyF: 1150, bodyQ: 1.0, bodyDecay: 0.075, bodyGain: 0.55, thumpF0: 200, thumpF1: 75, thumpDecay: 0.09, thumpGain: 0.55, tailLP: 2300, tailDecay: 0.32, tailGain: 0.3 },
  // AWP: huge boom with a long rolling tail.
  awp: { crackHP: 850, crackDecay: 0.17, crackGain: 1.1, bodyF: 380, bodyQ: 0.7, bodyDecay: 0.28, bodyGain: 1.0, thumpF0: 90, thumpF1: 26, thumpDecay: 0.45, thumpGain: 1.25, tailLP: 850, tailDecay: 1.5, tailGain: 0.75 },
  glock: { crackHP: 2700, crackDecay: 0.045, crackGain: 0.6, bodyF: 1600, bodyQ: 1.1, bodyDecay: 0.05, bodyGain: 0.4, thumpF0: 330, thumpF1: 120, thumpDecay: 0.06, thumpGain: 0.4, tailLP: 2600, tailDecay: 0.2, tailGain: 0.16 },
  // USP-S: suppressed "thup".
  usp: { crackHP: 3200, crackDecay: 0.018, crackGain: 0.12, bodyF: 850, bodyQ: 1.6, bodyDecay: 0.06, bodyGain: 0.5, thumpF0: 230, thumpF1: 90, thumpDecay: 0.05, thumpGain: 0.32, tailLP: 1100, tailDecay: 0.08, tailGain: 0.05 },
  deagle: { crackHP: 900, crackDecay: 0.12, crackGain: 1.0, bodyF: 560, bodyQ: 0.8, bodyDecay: 0.17, bodyGain: 0.95, thumpF0: 125, thumpF1: 38, thumpDecay: 0.24, thumpGain: 1.05, tailLP: 1200, tailDecay: 0.85, tailGain: 0.5 },
};

export interface Pos {
  x: number;
  y: number;
  z: number;
}

interface NoiseOpts {
  t?: number;
  type: BiquadFilterType;
  freq: number;
  freqEnd?: number;
  q?: number;
  gain: number;
  attack?: number;
  decay: number;
}

interface ToneOpts {
  t?: number;
  type?: OscillatorType;
  f0: number;
  f1?: number;
  gain: number;
  attack?: number;
  decay: number;
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private reverbSend!: GainNode;
  private noise!: AudioBuffer;
  private active = 0;
  private volume = 0.7;

  get ready(): boolean {
    return this.ctx !== null;
  }

  /** Must be called from a user gesture (click / key press). Safe to call repeatedly. */
  init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 12;
    comp.ratio.value = 5;
    comp.attack.value = 0.003;
    comp.release.value = 0.2;
    this.master = ctx.createGain();
    this.master.gain.value = this.volume;
    this.sfx = ctx.createGain();
    this.sfx.connect(comp);
    comp.connect(this.master);
    this.master.connect(ctx.destination);

    // White noise source buffer.
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // Generated impulse response: dense early reflections + exponential decay ("open desert town").
    const irLen = Math.floor(ctx.sampleRate * 1.8);
    const ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = ir.getChannelData(ch);
      for (let i = 0; i < irLen; i++) {
        const t = i / ctx.sampleRate;
        const early = t > 0.03 && t < 0.12 && Math.random() < 0.02 ? 0.6 : 0;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 3.2) * 0.5 + early * (Math.random() * 2 - 1);
      }
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.32;
    this.reverbSend.connect(conv);
    conv.connect(comp);
  }

  setVolume(v: number): void {
    this.volume = v;
    if (this.ctx) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
  }

  suspend(): void {
    if (this.ctx && this.ctx.state === 'running') void this.ctx.suspend();
  }

  resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
  }

  setListener(x: number, y: number, z: number, fx: number, fy: number, fz: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const l = ctx.listener;
    if (l.positionX) {
      const t = ctx.currentTime;
      l.positionX.setValueAtTime(x, t);
      l.positionY.setValueAtTime(y, t);
      l.positionZ.setValueAtTime(z, t);
      l.forwardX.setValueAtTime(fx, t);
      l.forwardY.setValueAtTime(fy, t);
      l.forwardZ.setValueAtTime(fz, t);
      l.upX.setValueAtTime(0, t);
      l.upY.setValueAtTime(1, t);
      l.upZ.setValueAtTime(0, t);
    } else {
      l.setPosition(x, y, z);
      l.setOrientation(fx, fy, fz, 0, 1, 0);
    }
  }

  /** Output node: positional (HRTF panner) when pos is given, otherwise straight to the mix. */
  private out(pos: Pos | null, gain: number, reverb = 0): AudioNode | null {
    const ctx = this.ctx;
    if (!ctx) return null;
    if (this.active > 90) return null;
    const g = ctx.createGain();
    g.gain.value = gain;
    if (pos) {
      const p = ctx.createPanner();
      p.panningModel = 'HRTF';
      p.distanceModel = 'inverse';
      p.refDistance = 2.5;
      p.rolloffFactor = 1.05;
      p.maxDistance = 150;
      if (p.positionX) {
        p.positionX.value = pos.x;
        p.positionY.value = pos.y;
        p.positionZ.value = pos.z;
      } else p.setPosition(pos.x, pos.y, pos.z);
      g.connect(p);
      p.connect(this.sfx);
    } else {
      g.connect(this.sfx);
    }
    if (reverb > 0) {
      const s = ctx.createGain();
      s.gain.value = reverb;
      g.connect(s);
      s.connect(this.reverbSend);
    }
    return g;
  }

  private track(node: AudioScheduledSourceNode): void {
    this.active++;
    node.onended = () => {
      this.active--;
    };
  }

  private noiseBurst(dest: AudioNode, o: NoiseOpts): void {
    const ctx = this.ctx as AudioContext;
    const t = o.t ?? ctx.currentTime;
    const attack = o.attack ?? 0.001;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = o.type;
    f.frequency.setValueAtTime(o.freq, t);
    if (o.freqEnd) f.frequency.exponentialRampToValueAtTime(o.freqEnd, t + attack + o.decay);
    f.Q.value = o.q ?? 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(o.gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + o.decay);
    src.connect(f);
    f.connect(g);
    g.connect(dest);
    src.start(t, Math.random() * 1.5);
    src.stop(t + attack + o.decay + 0.05);
    this.track(src);
  }

  private tone(dest: AudioNode, o: ToneOpts): void {
    const ctx = this.ctx as AudioContext;
    const t = o.t ?? ctx.currentTime;
    const attack = o.attack ?? 0.002;
    const osc = ctx.createOscillator();
    osc.type = o.type ?? 'sine';
    osc.frequency.setValueAtTime(o.f0, t);
    if (o.f1) osc.frequency.exponentialRampToValueAtTime(o.f1, t + attack + o.decay);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(o.gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + o.decay);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + attack + o.decay + 0.05);
    this.track(osc);
  }

  // ─────────────────────────── weapons ───────────────────────────

  gunshot(id: WeaponId, pos: Pos | null): void {
    const p = GUNS[id];
    if (!p) return;
    const own = pos === null;
    const dest = this.out(pos, own ? 0.75 : 1.6, own ? 0.7 : 1.0);
    if (!dest) return;
    const v = 0.92 + Math.random() * 0.16;
    this.noiseBurst(dest, { type: 'highpass', freq: p.crackHP * v, gain: p.crackGain, decay: p.crackDecay });
    this.noiseBurst(dest, { type: 'bandpass', freq: p.bodyF * v, q: p.bodyQ, gain: p.bodyGain, decay: p.bodyDecay });
    this.tone(dest, { type: 'sine', f0: p.thumpF0 * v, f1: p.thumpF1, gain: p.thumpGain, decay: p.thumpDecay });
    this.noiseBurst(dest, { type: 'lowpass', freq: p.tailLP, freqEnd: p.tailLP * 0.4, gain: p.tailGain, attack: 0.006, decay: p.tailDecay });
    if (id === 'usp') this.noiseBurst(dest, { type: 'bandpass', freq: 3800, q: 3, gain: 0.25, decay: 0.02, t: (this.ctx as AudioContext).currentTime + 0.03 });
    if (id === 'awp' && own) this.boltCycle(0.55);
  }

  private boltCycle(delay: number): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const dest = this.out(null, 0.5);
    if (!dest) return;
    const t = ctx.currentTime + delay;
    this.noiseBurst(dest, { t, type: 'bandpass', freq: 2200, q: 2, gain: 0.5, decay: 0.04 });
    this.noiseBurst(dest, { t: t + 0.12, type: 'bandpass', freq: 1600, freqEnd: 2600, q: 2, gain: 0.35, decay: 0.09 });
    this.noiseBurst(dest, { t: t + 0.3, type: 'bandpass', freq: 2600, q: 2.5, gain: 0.5, decay: 0.035 });
  }

  reload(id: WeaponId, duration: number, pos: Pos | null): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const dest = this.out(pos, pos ? 0.8 : 0.55);
    if (!dest) return;
    const t = ctx.currentTime;
    const rifle = id === 'ak47' || id === 'm4a4' || id === 'awp';
    // mag out
    this.noiseBurst(dest, { t: t + duration * 0.12, type: 'bandpass', freq: 3200, q: 2.5, gain: 0.55, decay: 0.03 });
    this.noiseBurst(dest, { t: t + duration * 0.15, type: 'bandpass', freq: 1200, freqEnd: 700, q: 1.5, gain: 0.3, decay: 0.12 });
    // mag in
    this.tone(dest, { t: t + duration * 0.5, f0: 190, f1: 95, gain: 0.45, decay: 0.07 });
    this.noiseBurst(dest, { t: t + duration * 0.5, type: 'bandpass', freq: 1500, q: 1.8, gain: 0.6, decay: 0.05 });
    // bolt / slide
    const b = t + duration * (rifle ? 0.76 : 0.8);
    this.noiseBurst(dest, { t: b, type: 'bandpass', freq: rifle ? 2000 : 2600, q: 2, gain: 0.55, decay: 0.035 });
    this.noiseBurst(dest, { t: b + 0.09, type: 'bandpass', freq: rifle ? 2800 : 3400, q: 2.5, gain: 0.6, decay: 0.03 });
  }

  dryFire(): void {
    const dest = this.out(null, 0.6);
    if (!dest) return;
    this.noiseBurst(dest, { type: 'bandpass', freq: 3600, q: 4, gain: 0.6, decay: 0.015 });
  }

  draw(id: WeaponId): void {
    const dest = this.out(null, 0.35);
    if (!dest) return;
    if (id === 'knife') {
      this.noiseBurst(dest, { type: 'bandpass', freq: 3000, freqEnd: 6000, q: 3, gain: 0.5, decay: 0.15 });
      return;
    }
    this.noiseBurst(dest, { type: 'bandpass', freq: 1800, q: 1.5, gain: 0.4, decay: 0.06 });
    this.noiseBurst(dest, { t: (this.ctx as AudioContext).currentTime + 0.08, type: 'bandpass', freq: 2800, q: 2, gain: 0.45, decay: 0.03 });
  }

  scope(zoomIn: boolean): void {
    const dest = this.out(null, 0.45);
    if (!dest) return;
    this.noiseBurst(dest, { type: 'bandpass', freq: zoomIn ? 2400 : 1400, freqEnd: zoomIn ? 800 : 2600, q: 2.2, gain: 0.5, decay: 0.07 });
    this.noiseBurst(dest, { t: (this.ctx as AudioContext).currentTime + 0.05, type: 'bandpass', freq: 4200, q: 4, gain: 0.35, decay: 0.012 });
  }

  knifeSwing(pos: Pos | null, hit: boolean): void {
    const dest = this.out(pos, 0.6);
    if (!dest) return;
    this.noiseBurst(dest, { type: 'bandpass', freq: 500, freqEnd: 2600, q: 1.4, gain: 0.45, attack: 0.03, decay: 0.16 });
    if (hit) {
      const t = (this.ctx as AudioContext).currentTime + 0.06;
      this.tone(dest, { t, f0: 150, f1: 70, gain: 0.7, decay: 0.1 });
      this.noiseBurst(dest, { t, type: 'lowpass', freq: 900, gain: 0.6, decay: 0.08 });
    }
  }

  // ─────────────────────────── movement ───────────────────────────

  footstep(pos: Pos | null): void {
    const dest = this.out(pos, pos ? 0.95 : 0.28);
    if (!dest) return;
    const v = 0.8 + Math.random() * 0.4;
    this.noiseBurst(dest, { type: 'lowpass', freq: 650 * v, gain: 0.7, attack: 0.004, decay: 0.07 });
    this.noiseBurst(dest, { type: 'highpass', freq: 3500 * v, gain: 0.12, attack: 0.004, decay: 0.05 });
    this.tone(dest, { f0: 95 * v, f1: 60, gain: 0.25, decay: 0.05 });
  }

  land(pos: Pos | null): void {
    const dest = this.out(pos, pos ? 0.9 : 0.45);
    if (!dest) return;
    this.tone(dest, { f0: 100, f1: 48, gain: 0.6, decay: 0.12 });
    this.noiseBurst(dest, { type: 'lowpass', freq: 500, gain: 0.6, decay: 0.1 });
  }

  // ─────────────────────────── feedback ───────────────────────────

  hitMarker(headshot: boolean, helmet: boolean): void {
    const dest = this.out(null, 0.4);
    if (!dest) return;
    if (headshot && helmet) {
      // metallic helmet "dink"
      for (const [f, g] of [
        [2650, 0.35],
        [3990, 0.22],
        [5310, 0.14],
      ]) {
        this.tone(dest, { type: 'sine', f0: f, gain: g, decay: 0.28 });
      }
    } else if (headshot) {
      this.noiseBurst(dest, { type: 'bandpass', freq: 2200, q: 1.5, gain: 0.6, decay: 0.05 });
      this.tone(dest, { type: 'triangle', f0: 1500, f1: 1100, gain: 0.3, decay: 0.08 });
    } else {
      this.tone(dest, { type: 'triangle', f0: 1900, gain: 0.25, decay: 0.035 });
      this.noiseBurst(dest, { type: 'bandpass', freq: 1200, q: 1.2, gain: 0.25, decay: 0.03 });
    }
  }

  killConfirm(headshot: boolean): void {
    const ctx = this.ctx;
    const dest = this.out(null, 0.35);
    if (!ctx || !dest) return;
    const t = ctx.currentTime + 0.04;
    const notes = headshot ? [988, 1319, 1976] : [880, 1319];
    notes.forEach((f, i) => this.tone(dest, { t: t + i * 0.075, type: 'triangle', f0: f, gain: 0.5, decay: 0.16 }));
  }

  hurt(): void {
    const dest = this.out(null, 0.55);
    if (!dest) return;
    this.tone(dest, { f0: 120, f1: 55, gain: 0.8, decay: 0.14 });
    this.noiseBurst(dest, { type: 'lowpass', freq: 450, gain: 0.7, decay: 0.09 });
  }

  pickup(): void {
    const dest = this.out(null, 0.4);
    if (!dest) return;
    this.noiseBurst(dest, { type: 'bandpass', freq: 2400, q: 2, gain: 0.5, decay: 0.04 });
    this.tone(dest, { type: 'triangle', f0: 660, f1: 990, gain: 0.15, decay: 0.08 });
  }

  // ─────────────────────────── C4 ───────────────────────────

  plantKey(pos: Pos | null): void {
    const dest = this.out(pos, 0.5);
    if (!dest) return;
    this.tone(dest, { type: 'square', f0: 1250 + Math.random() * 300, gain: 0.12, decay: 0.05 });
  }

  bombPlanted(pos: Pos | null): void {
    const ctx = this.ctx;
    const dest = this.out(pos, 0.8);
    if (!ctx || !dest) return;
    const t = ctx.currentTime;
    this.tone(dest, { t, type: 'square', f0: 990, gain: 0.18, decay: 0.12 });
    this.tone(dest, { t: t + 0.16, type: 'square', f0: 1480, gain: 0.18, decay: 0.2 });
  }

  bombBeep(pos: Pos, urgency: number): void {
    const dest = this.out(pos, 1.2);
    if (!dest) return;
    this.tone(dest, { type: 'sine', f0: 2600 + urgency * 600, gain: 0.5, decay: 0.07 });
  }

  defuseTick(pos: Pos | null): void {
    const dest = this.out(pos, 0.5);
    if (!dest) return;
    this.noiseBurst(dest, { type: 'bandpass', freq: 2800 + Math.random() * 800, q: 3, gain: 0.45, decay: 0.025 });
  }

  bombDefused(): void {
    const ctx = this.ctx;
    const dest = this.out(null, 0.6);
    if (!ctx || !dest) return;
    const t = ctx.currentTime;
    this.noiseBurst(dest, { t, type: 'highpass', freq: 3000, gain: 0.6, decay: 0.04 }); // wire snip
    this.tone(dest, { t: t + 0.12, type: 'sine', f0: 1500, f1: 600, gain: 0.3, decay: 0.35 });
  }

  explosion(pos: Pos): void {
    const ctx = this.ctx;
    const dest = this.out(pos, 3.2, 1.6);
    if (!ctx || !dest) return;
    this.noiseBurst(dest, { type: 'lowpass', freq: 1400, freqEnd: 120, gain: 1.6, attack: 0.005, decay: 2.8 });
    this.tone(dest, { type: 'sine', f0: 70, f1: 22, gain: 1.6, decay: 1.4 });
    this.tone(dest, { type: 'triangle', f0: 45, f1: 25, gain: 1.0, decay: 2.0 });
    this.noiseBurst(dest, { type: 'highpass', freq: 1800, gain: 0.7, decay: 0.45 });
    for (let i = 0; i < 6; i++) {
      this.noiseBurst(dest, { t: ctx.currentTime + 0.2 + Math.random() * 0.9, type: 'bandpass', freq: 600 + Math.random() * 1500, q: 2, gain: 0.35, decay: 0.12 });
    }
  }

  // ─────────────────────────── round ───────────────────────────

  roundStart(): void {
    const ctx = this.ctx;
    const dest = this.out(null, 0.3);
    if (!ctx || !dest) return;
    const t = ctx.currentTime;
    this.noiseBurst(dest, { t, type: 'bandpass', freq: 1800, q: 1, gain: 0.25, decay: 0.12 }); // radio squelch
    this.tone(dest, { t: t + 0.1, type: 'square', f0: 880, gain: 0.1, decay: 0.08 });
    this.tone(dest, { t: t + 0.22, type: 'square', f0: 1175, gain: 0.1, decay: 0.1 });
  }

  roundEnd(win: boolean): void {
    const ctx = this.ctx;
    const dest = this.out(null, 0.32);
    if (!ctx || !dest) return;
    const t = ctx.currentTime + 0.1;
    const notes = win ? [523, 659, 784, 1047] : [587, 523, 440, 349];
    notes.forEach((f, i) => this.tone(dest, { t: t + i * 0.14, type: 'triangle', f0: f, gain: 0.45, decay: 0.3 }));
  }

  dispose(): void {
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
