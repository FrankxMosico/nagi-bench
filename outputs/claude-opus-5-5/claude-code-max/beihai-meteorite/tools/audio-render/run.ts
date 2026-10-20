/**
 * Offline render of the film's soundtrack through the real player + cue bus.
 *
 *   bun tools/audio-render/run.ts [--from 0] [--to 356] [--wav out.wav]
 *
 * Writes a 16 kHz stereo WAV of the master output and a JSON report with
 * per-cue peak/RMS (dBFS, at the cue's own output) and per-second master levels.
 */
import { writeFileSync } from "node:fs";
import { CinematicPlayer, WebAudioCueBus, type SoundCue } from "@agentbench/cinematic-player";
import { OCtx, BLOCK, type OGain } from "./engine";
import { registerSounds } from "../../src/audio/sounds";
import { soundCues } from "../../src/audio/cues";
import { GROUP_GAINS } from "../../src/audio/mix";
import { DURATION } from "../../src/timeline";

const args = process.argv.slice(2);
const opt = (k: string, d: string) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1]! : d;
};
const FROM = Number(opt("from", "0"));
const TO = Number(opt("to", String(DURATION)));
const WAV = opt("wav", ".preview/soundtrack.wav");
const SR = 16000;

const ctx = new OCtx(SR);
const g = globalThis as Record<string, unknown>;
g.window = globalThis;
g.AudioContext = function () {
  return ctx;
};

let rafCb: ((t: number) => void) | null = null;
const player = new CinematicPlayer({
  duration: DURATION,
  context: {},
  cues: soundCues,
  requestFrame: (cb) => {
    rafCb = cb;
    return 1;
  },
  cancelFrame: () => {
    rafCb = null;
  },
});
const bus = new WebAudioCueBus(player);

// meter every cue's output node
const meters = new Map<string, { sound: string; group: string; start: number; m: { peak: number; sumSq: number; n: number } }>();
const realDefine = bus.define.bind(bus);
(bus as unknown as { define: typeof bus.define }).define = (name, factory) =>
  realDefine(name, (c) => {
    const out = c.output as unknown as OGain;
    const m = { peak: 0, sumSq: 0, n: 0 };
    out.meter = m;
    meters.set(c.cue.id, { sound: c.cue.sound, group: c.cue.group ?? "sfx", start: c.cue.start, m });
    return factory(c);
  });
registerSounds(bus as WebAudioCueBus<unknown>);

await bus.unlock();
// the UI default volume
bus.setMasterGain(0.8);
player.seek(FROM);
player.play();
for (const [grp, v] of Object.entries(GROUP_GAINS)) bus.setGroupGain(grp, v);

const total = Math.ceil((TO - FROM) * SR);
const L = new Float32Array(total + BLOCK);
const R = new Float32Array(total + BLOCK);
let written = 0;
let simMs = 0;
const frameMs = 1000 / 60;
const wall = performance.now();
// ctx time starts at 0 and the player starts at FROM: offset the timeline
ctx.frame = 0;
rafCb!(0);
while (written < total && player.isPlaying) {
  simMs += frameMs;
  rafCb?.(simMs);
  const targetSamples = Math.floor((simMs / 1000) * SR);
  while (ctx.frame + BLOCK <= targetSamples && written < total) {
    const [l, r] = ctx.renderBlock();
    L.set(l, written);
    R.set(r, written);
    written += BLOCK;
  }
  if ((simMs / 1000) % 20 < frameMs / 1000) process.stdout.write(`  t=${(FROM + simMs / 1000).toFixed(0)}s nodes=${ctx.nodes}\r`);
}
console.log(`\nrendered ${(written / SR).toFixed(1)}s of audio in ${((performance.now() - wall) / 1000).toFixed(1)}s`);

/* ------------------------------------------------------------------ WAV */
const pcm = Buffer.alloc(44 + written * 4);
pcm.write("RIFF", 0);
pcm.writeUInt32LE(36 + written * 4, 4);
pcm.write("WAVE", 8);
pcm.write("fmt ", 12);
pcm.writeUInt32LE(16, 16);
pcm.writeUInt16LE(1, 20);
pcm.writeUInt16LE(2, 22);
pcm.writeUInt32LE(SR, 24);
pcm.writeUInt32LE(SR * 4, 28);
pcm.writeUInt16LE(4, 32);
pcm.writeUInt16LE(16, 34);
pcm.write("data", 36);
pcm.writeUInt32LE(written * 4, 40);
for (let i = 0; i < written; i++) {
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i]!)) * 32767), 44 + i * 4);
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i]!)) * 32767), 46 + i * 4);
}
writeFileSync(WAV, pcm);

/* ------------------------------------------------------------- analysis */
const db = (x: number) => (x > 0 ? 20 * Math.log10(x) : -120);
const perSecond: Array<{ t: number; rmsDb: number; peakDb: number }> = [];
for (let s = 0; s * SR < written; s++) {
  let pk = 0;
  let ss = 0;
  let n = 0;
  for (let i = s * SR; i < Math.min(written, (s + 1) * SR); i++) {
    const v = Math.max(Math.abs(L[i]!), Math.abs(R[i]!));
    pk = Math.max(pk, v);
    ss += (L[i]! ** 2 + R[i]! ** 2) / 2;
    n++;
  }
  perSecond.push({ t: FROM + s, rmsDb: Number(db(Math.sqrt(ss / Math.max(1, n))).toFixed(1)), peakDb: Number(db(pk).toFixed(1)) });
}
const cues = [...meters.entries()].map(([id, v]) => ({
  id,
  sound: v.sound,
  group: v.group,
  start: v.start,
  peakDb: Number(db(v.m.peak).toFixed(1)),
  rmsDb: Number(db(Math.sqrt(v.m.sumSq / Math.max(1, v.m.n))).toFixed(1)),
}));
cues.sort((a, b) => a.start - b.start);
writeFileSync(".preview/audio-report.json", JSON.stringify({ perSecond, cues }, null, 1));
const limiter = (bus as unknown as { audioContext?: unknown }).audioContext ? null : null;
void limiter;
console.log("per-cue levels (dBFS at the cue output, before group/master gain):");
for (const c of cues) console.log(`${c.start.toFixed(1).padStart(6)}  ${c.sound.padEnd(18)} ${c.group.padEnd(6)} peak ${String(c.peakDb).padStart(6)}  rms ${String(c.rmsDb).padStart(6)}`);
console.log("master RMS per second (dBFS):");
for (let i = 0; i < perSecond.length; i += 12) {
  const row = perSecond.slice(i, i + 12);
  console.log(`${String(row[0]!.t).padStart(4)}s  ${row.map((p) => String(Math.round(p.rmsDb)).padStart(4)).join("")}`);
}
const loud = perSecond.filter((p) => p.peakDb > -6.5);
console.log(`seconds with master peak > -6.5 dBFS (limiter engaged): ${loud.map((p) => p.t).join(", ") || "none"}`);
void (null as unknown as SoundCue);
