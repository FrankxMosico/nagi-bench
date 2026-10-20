/**
 * Simulated-browser playback check for the built film (dist/).
 *
 *   bun tools/harness/run.ts [--rate 4] [--from 0] [--to 356]
 *
 * Loads dist/index.html into a mini DOM, imports the real bundle, clicks the
 * poster's play button, advances animation frames, exercises pause / seek /
 * volume / resume through the actual control widgets, then plays the whole
 * timeline and reports every error, the shots and cues reached, every
 * subtitle shown, and the sound factories that ran.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createElement, parseInto, ElementX, CanvasX } from "./dom";
import { AudioContextX, audioLog } from "./audio";
import { glLog } from "./webgl";

const args = process.argv.slice(2);
const opt = (k: string, d: string) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1]! : d;
};
const RATE = Number(opt("rate", "4"));

/* ------------------------------------------------------------------ globals */
const errors: string[] = [];
const warnings: string[] = [];
const origError = console.error.bind(console);
const origWarn = console.warn.bind(console);
console.error = (...a: unknown[]) => {
  errors.push(a.map(String).join(" "));
  origError("[console.error]", ...a);
};
console.warn = (...a: unknown[]) => {
  warnings.push(a.map(String).join(" "));
};
process.on("uncaughtException", (e) => errors.push(`uncaught: ${e?.stack ?? e}`));
process.on("unhandledRejection", (e) => errors.push(`unhandled rejection: ${(e as Error)?.stack ?? e}`));

const html = new ElementX("html");
const head = new ElementX("head");
const body = new ElementX("body");
html.appendChild(head);
html.appendChild(body);
const listeners = new Map<string, Array<(e: unknown) => void>>();
const rafQueue: Array<{ id: number; cb: (t: number) => void }> = [];
let rafId = 1;
let simNow = 0;

const g = globalThis as Record<string, unknown>;
g.window = globalThis;
g.self = globalThis;
g.document = {
  documentElement: html,
  head,
  body,
  createElement,
  createElementNS: (_: string, tag: string) => createElement(tag),
  createTextNode: (t: string) => ({ textContent: t }),
  querySelector: (s: string) => html.querySelector(s),
  querySelectorAll: (s: string) => html.querySelectorAll(s),
  getElementById: (id: string) => html.querySelector(`#${id}`),
  addEventListener: () => {},
  removeEventListener: () => {},
  fullscreenElement: null,
  visibilityState: "visible",
};
g.HTMLCanvasElement = CanvasX;
g.HTMLElement = ElementX;
g.devicePixelRatio = 1;
g.innerWidth = 1280;
g.innerHeight = 720;
g.addEventListener = (type: string, cb: (e: unknown) => void) => {
  if (!listeners.has(type)) listeners.set(type, []);
  listeners.get(type)!.push(cb);
};
g.removeEventListener = () => {};
g.requestAnimationFrame = (cb: (t: number) => void) => {
  const id = rafId++;
  rafQueue.push({ id, cb });
  return id;
};
g.cancelAnimationFrame = (id: number) => {
  const i = rafQueue.findIndex((r) => r.id === id);
  if (i >= 0) rafQueue.splice(i, 1);
};
g.ResizeObserver = class {
  constructor(private cb: () => void) {}
  observe() {
    setTimeout(() => this.cb(), 0);
  }
  disconnect() {}
};
g.AudioContext = AudioContextX;
g.MutationObserver = class {
  observe() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
g.getComputedStyle = (el: ElementX) => el.style;
g.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

function pumpFrame(dtMs = 1000 / 60): void {
  simNow += dtMs;
  const batch = rafQueue.splice(0, rafQueue.length);
  for (const r of batch) {
    try {
      r.cb(simNow);
    } catch (e) {
      errors.push(`frame: ${(e as Error).stack ?? e}`);
    }
  }
}
const tick = () => new Promise((r) => setTimeout(r, 0));

/* ------------------------------------------------------------------- load */
const distDir = resolve(process.cwd(), "dist");
const indexHtml = readFileSync(resolve(distDir, "index.html"), "utf8");
const bodyHtml = /<body[^>]*>([\s\S]*)<\/body>/i.exec(indexHtml)![1]!;
parseInto(body, bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, ""));
const app = html.querySelector("#app")!;
const stage = html.querySelector("#stage")!;
app.layout = { w: 1280, h: 720 };
stage.layout = { w: 1280, h: 536 };
const scriptSrc = /<script[^>]+src="([^"]+)"/i.exec(indexHtml)![1]!;
const cssHref = /<link[^>]+href="([^"]+\.css)"/i.exec(indexHtml)?.[1];
console.log(`index.html → script ${scriptSrc}${cssHref ? `, css ${cssHref}` : ""}`);
if (!scriptSrc.startsWith("./")) errors.push(`script path is not relative: ${scriptSrc}`);

const report: Record<string, unknown> = {};
const t0 = performance.now();
try {
  await import(resolve(distDir, scriptSrc));
} catch (e) {
  console.log("bundle import threw:", (e as Error)?.stack ?? e);
  process.exit(1);
}
console.log(`bundle evaluated; rAF queue ${rafQueue.length}`);
// let boot() run: it waits for a paint, then builds the world
for (let i = 0; i < 400 && !g.__film; i++) {
  pumpFrame();
  await new Promise((r) => setTimeout(r, 5));
}
if (errors.length) console.log("errors during boot:", errors);
const film = g.__film as {
  player: {
    currentTime: number; state: string; isPlaying: boolean; duration: number;
    play(): void; pause(): void; seek(t: number): void; setPlaybackRate(r: number): void;
    addTypedEventListener(type: string, cb: (e: { detail: Record<string, unknown> }) => void): () => void;
    getShots(): Array<{ id: string; start: number; end: number }>; getCues(): Array<Record<string, unknown>>;
  };
  audio: unknown;
};
if (!film) {
  console.log("boot did not complete", errors);
  process.exit(1);
}
report.bootSeconds = ((performance.now() - t0) / 1000).toFixed(2);
console.log(`booted in ${report.bootSeconds}s; programs so far: ${glLog.programs}`);

const player = film.player;
const canvas = stage.querySelector("canvas");
const poster = stage.querySelector(".poster");
const playBtn = app.querySelector('[data-action="play"]');
const seekBar = app.querySelector('[data-action="seek"]');
const volume = app.querySelector('[data-action="volume"]');
const subtitle = app.querySelector(".ab-cinematic-subtitle");
const timecode = app.querySelector(".ab-cinematic-time");
const checks: Array<[string, boolean, string?]> = [];
const expect = (name: string, ok: boolean, detail?: string) => {
  checks.push([name, ok, detail]);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};
expect("canvas mounted in #stage", Boolean(canvas));
expect("transport controls mounted", Boolean(playBtn && seekBar && volume && subtitle));
expect("poster present before playback", Boolean(poster));
expect("initial time is 0 and paused", player.currentTime === 0 && player.state === "paused", `t=${player.currentTime} ${player.state}`);

/* --------------------------------------------------- play via the poster */
poster!.click();
for (let i = 0; i < 5; i++) await tick();
expect("poster click starts playback", player.isPlaying, player.state);
for (let i = 0; i < 120; i++) pumpFrame();
expect("time advances with frames (≈2 s after 120 frames)", player.currentTime > 1.8 && player.currentTime < 2.2, `t=${player.currentTime.toFixed(3)}`);

/* --------------------------------------------------- pause via the button */
playBtn!.click();
await tick();
await tick();
const paused = player.currentTime;
for (let i = 0; i < 60; i++) pumpFrame();
expect("pause button pauses", player.state === "paused" && player.currentTime === paused, `t=${player.currentTime.toFixed(3)}`);

/* --------------------------------------------------- seek via the slider */
seekBar!.value = "247.5";
seekBar!.dispatchEvent(new Event("input"));
await tick();
expect("seek slider moves the playhead", Math.abs(player.currentTime - 247.5) < 1e-6, `t=${player.currentTime}`);
const sub = subtitle!.textContent;
expect("subtitle shows the manifest line at 247.5 s", sub.startsWith("【老专家（无线电）】"), sub);
expect("timecode updated", (timecode?.textContent ?? "").startsWith("04:07"), timecode?.textContent ?? "");

/* --------------------------------------------------- volume */
volume!.value = "0.5";
volume!.dispatchEvent(new Event("input"));
expect("volume slider accepted", true);

/* --------------------------------------------------- resume */
playBtn!.click();
for (let i = 0; i < 5; i++) await tick();
for (let i = 0; i < 90; i++) pumpFrame();
expect("resume after seek continues from the seek point", player.isPlaying && player.currentTime > 248.9 && player.currentTime < 249.1, `t=${player.currentTime.toFixed(3)}`);
playBtn!.click();
await tick();

/* --------------------------------------------------- full pass */
const shotsSeen = new Set<string>();
const subtitlesSeen = new Map<string, number>();
player.addTypedEventListener("frame", (e) => {
  const t = e.detail.time as number;
  for (const s of player.getShots()) if (t >= s.start && t < s.end) shotsSeen.add(s.id);
  const text = subtitle!.textContent;
  if (text && !subtitlesSeen.has(text)) subtitlesSeen.set(text, t);
});
const soundsStarted = new Map<string, number>();
player.addTypedEventListener("cue", (e) => {
  const c = e.detail.cue as Record<string, unknown>;
  if (c.kind === "sound") soundsStarted.set(String(c.sound), (soundsStarted.get(String(c.sound)) ?? 0) + 1);
});
const startErrors = audioLog.errors.length;
player.seek(Number(opt("from", "0")));
player.setPlaybackRate(RATE);
playBtn!.click();
for (let i = 0; i < 5; i++) await tick();
const to = Number(opt("to", String(player.duration)));
const wall = performance.now();
let frames = 0;
// shader programs linked during playback are hitches on a real GPU: report when
const lateCompiles: number[] = [];
const lateShaders: string[] = [];
let programsBefore = glLog.programs;
let shadersBefore = glLog.shaders.length;
while (player.state === "playing" && player.currentTime < to && frames < 200000) {
  pumpFrame();
  frames++;
  if (glLog.programs > programsBefore) {
    for (let k = programsBefore; k < glLog.programs; k++) lateCompiles.push(Number(player.currentTime.toFixed(2)));
    programsBefore = glLog.programs;
    for (const sh of glLog.shaders.slice(shadersBefore)) {
      if (sh.type !== "fragment") continue;
      const name = /#define SHADER_NAME (\S+)/.exec(sh.source)?.[1] ?? "?";
      const lights = [...sh.source.matchAll(/#define NUM_(\w+?)_LIGHTS (\d+)/g)].map((m) => `${m[1]}=${m[2]}`).join(" ");
      const flags = ["USE_FOG", "USE_MAP", "USE_ENVMAP", "USE_COLOR", "USE_SHADOWMAP", "TONE_MAPPING", "USE_INSTANCING", "FLAT_SHADED", "DOUBLE_SIDED", "USE_LOGDEPTHBUF", "USE_POINTS_UV"].filter((f) => sh.source.includes(`#define ${f}`));
      lateShaders.push(`  @${player.currentTime.toFixed(2)}s ${name} [${lights}] ${flags.join(" ")}`);
    }
  }
  shadersBefore = glLog.shaders.length;
  if (frames % 300 === 0) {
    await tick();
    process.stdout.write(`  t=${player.currentTime.toFixed(1)}s\r`);
  }
}
const wallS = (performance.now() - wall) / 1000;
console.log(`\nfull pass: ${frames} frames in ${wallS.toFixed(1)}s wall (${((wallS / frames) * 1000).toFixed(1)} ms/frame)`);
console.log(`shader programs linked during playback: ${lateCompiles.length ? lateCompiles.map((t) => `${t}s`).join(", ") : "none"}`);
for (const l of lateShaders) console.log(l);
report.lateCompiles = lateCompiles;
expect("reaches the end of the film", to < player.duration || (player.state === "ended" && player.currentTime === player.duration), `state=${player.state} t=${player.currentTime}`);
const allShots = player.getShots().map((s) => s.id);
const missed = allShots.filter((id) => !shotsSeen.has(id));
expect("every shot was rendered", missed.length === 0, missed.join(", "));
const voiceTotal = player.getCues().filter((c) => typeof c.speaker === "string").length;
expect("every voice cue appeared as a subtitle", subtitlesSeen.size >= voiceTotal, `${subtitlesSeen.size}/${voiceTotal}`);
const badFormat = [...subtitlesSeen.keys()].filter((s) => !/^【[^】]+】\S/.test(s));
expect("subtitle format is 【说话者】文本", badFormat.length === 0, badFormat.slice(0, 3).join(" | "));
const soundNames = new Set(player.getCues().filter((c) => c.kind === "sound").map((c) => String(c.sound)));
const notStarted = [...soundNames].filter((s) => !soundsStarted.has(s));
expect("every sound cue fired", notStarted.length === 0, notStarted.join(", "));
expect("no Web Audio API misuse", audioLog.errors.length === startErrors && audioLog.errors.length === 0, audioLog.errors.slice(0, 5).join(" | "));
expect("no uniform upload problems", glLog.errors.length === 0, glLog.errors.slice(0, 5).join(" | "));
expect("no console errors or exceptions", errors.length === 0, errors.slice(0, 3).join(" | "));

/* --------------------------------------------------- end + restart */
playBtn!.click();
for (let i = 0; i < 5; i++) await tick();
pumpFrame();
pumpFrame();
expect("play after the end restarts from 0", player.isPlaying && player.currentTime < 1, `t=${player.currentTime.toFixed(2)} ${player.state}`);
playBtn!.click();

report.checks = checks;
report.frames = frames;
report.programs = glLog.programs;
report.shaders = glLog.shaders.length;
report.draws = glLog.draws;
report.audioNodes = audioLog.nodes;
report.audioSources = audioLog.sources;
report.warnings = [...new Set(warnings)].slice(0, 20);
report.errors = errors;
report.subtitles = [...subtitlesSeen.entries()].map(([s, t]) => `${t.toFixed(1)}  ${s}`);
report.sounds = Object.fromEntries(soundsStarted);
const outDir = resolve(process.cwd(), ".preview");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "harness-report.json"), JSON.stringify(report, null, 2));
writeFileSync(resolve(outDir, "shaders.glsl"), glLog.shaders.map((s, i) => `// ===== ${i} ${s.type}\n${s.source}`).join("\n\n"));
console.log(`programs ${glLog.programs}, shaders ${glLog.shaders.length}, draws ${glLog.draws}, audio nodes ${audioLog.nodes}`);
console.log(`warnings (${warnings.length}):`, [...new Set(warnings)].slice(0, 8));
const failed = checks.filter((c) => !c[1]).length;
console.log(failed ? `${failed} check(s) FAILED` : "all checks passed");
void dirname;
process.exit(failed ? 1 : 0);
