import * as THREE from "three";
import RAPIER from "@dimforge/rapier3d-compat";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createSim, DT, type Sim } from "./sim/sim";
import { makeMaterials } from "./render/materials";
import { buildEnvironment } from "./render/env";
import { buildTower } from "./render/tower";
import { buildMechanism } from "./render/mechanism";
import { Director, FILM_END } from "./film/director";
import { buildUI, el } from "./film/ui";
import { AudioEngine } from "./audio/audio";

const params = new URLSearchParams(location.search);
const FREE = params.has("free");
const CAPTURE = params.has("capture");
// seconds of simulated running before the film starts (overridable for tests)
const WARMUP = Number(params.get("warm") ?? 6.0);
const SEED = Number(params.get("seed") ?? 7);
// Physics costs ~0.3 s of CPU per simulated second, so even on a slow
// (software-rendered) machine the simulation can keep up with the wall clock:
// allow up to one second of simulation per frame before the film slows down.
const MAX_STEPS = 260;

const canvas = document.getElementById("view") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.05, 600);
camera.position.set(25, 3.2, 17);
camera.lookAt(0, 5.8, -0.4);

const ui = buildUI();
const overlay = el("div", "overlay", `
  <h2>水运仪象台</h2>
  <p>一部约三十秒的物理科普短片</p>
  <p class="status">正在搭建机械与水流……</p>
  <div class="progress"><div></div></div>
  <button disabled>▶ 播放（有声）</button>`, ui.ui);
const statusEl = overlay.querySelector(".status") as HTMLElement;
const barEl = overlay.querySelector(".progress div") as HTMLElement;
const playBtn = overlay.querySelector("button") as HTMLButtonElement;

const M = makeMaterials();
buildEnvironment(scene, renderer);
buildTower(M, scene);

type World = { sim: Sim; mech: ReturnType<typeof buildMechanism>; director: Director | null; objects: THREE.Object3D[] };
let W: World | null = null;
let audio: AudioEngine | null = null;

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

async function buildWorld(progress: (f: number) => void): Promise<World> {
  const before = new Set(scene.children);
  const sim = createSim(RAPIER, SEED);
  const mech = buildMechanism(sim, M, scene);
  const objects = scene.children.filter((o) => !before.has(o));
  // warm up so the wheel is already turning with water in its scoops
  const total = Math.round(WARMUP / DT);
  let done = 0;
  while (done < total) {
    const t0 = performance.now();
    while (done < total && performance.now() - t0 < 30) {
      sim.step();
      done++;
    }
    progress(done / total);
    mech.update(1 / 60);
    if (!CAPTURE) await nextFrame();
  }
  mech.update(1);
  return { sim, mech, director: null, objects };
}

function disposeWorld(w: World) {
  for (const o of w.objects) scene.remove(o);
  w.sim.world.free();
}

let simCarry = 0;
function frame(dtReal: number, render = true) {
  if (!W) return;
  const d = W.director;
  if (d && !d.done) {
    const want = dtReal * d.rate + simCarry;
    let n = Math.floor(want / DT);
    let dtFilm = dtReal;
    if (n > MAX_STEPS) {
      n = MAX_STEPS;
      dtFilm = (n * DT) / d.rate;
      simCarry = 0;
    } else simCarry = want - n * DT;
    for (let i = 0; i < n; i++) W.sim.step();
    d.update(dtFilm, audio?.now());
    if (audio) {
      const now = audio.now(), ft = d.ft;
      audio.scheduleMusic(ft, (t) => now + (t - ft), d.rate);
    }
  } else if (d && d.done) {
    // after the end card the machine keeps running gently in real time
    const want = dtReal + simCarry;
    const n = Math.min(MAX_STEPS, Math.floor(want / DT));
    simCarry = want - n * DT;
    for (let i = 0; i < n; i++) W.sim.step();
    d.update(dtReal, audio?.now());
  } else {
    // free / preview mode: just run the machine
    const want = dtReal + simCarry;
    const n = Math.min(MAX_STEPS, Math.floor(want / DT));
    simCarry = want - n * DT;
    for (let i = 0; i < n; i++) W.sim.step();
  }
  if (render) {
    W.mech.update(dtReal);
    renderer.render(scene, camera);
  }
}

function startFilm(withAudio: boolean) {
  if (!W) return;
  overlay.classList.add("hide");
  W.director = new Director(camera, W.sim, W.mech, ui, withAudio ? audio : null);
  W.director.onEnd = () => {
    audio?.fadeOutMusic(audio.ctx.currentTime + 1.5, 3);
    setTimeout(() => ui.replay.classList.add("on"), 1200);
  };
  if (withAudio && audio) audio.start();
}

ui.replay.addEventListener("click", async () => {
  ui.replay.classList.remove("on");
  ui.end.classList.remove("on");
  if (audio) {
    audio.stop();
    const old = audio;
    setTimeout(() => old.close(), 1500);
  }
  audio = new AudioEngine();
  await audio.resume();
  overlay.classList.remove("hide");
  playBtn.style.display = "none";
  statusEl.textContent = "重新注水……";
  if (W) disposeWorld(W);
  W = null;
  W = await buildWorld((f) => (barEl.style.width = `${f * 100}%`));
  simCarry = 0;
  startFilm(true);
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
});

async function main() {
  await RAPIER.init();
  W = await buildWorld((f) => (barEl.style.width = `${f * 100}%`));

  if (CAPTURE) {
    // deterministic stepping for offline review: window.__cap.advance(seconds)
    overlay.classList.add("hide");
    W.director = new Director(camera, W.sim, W.mech, ui, null);
    const api = {
      t: () => W!.director!.ft,
      advance(sec: number, fps = 30) {
        const n = Math.round(sec * fps);
        for (let i = 0; i < n; i++) {
          // keep the glow/drop state current but only draw the last frame
          frame(1 / fps, false);
          W!.mech.update(1 / fps);
        }
        renderer.render(scene, camera);
        return W!.director!.ft;
      },
      state: () => ({
        ft: +W!.director!.ft.toFixed(2), simT: +W!.sim.t.toFixed(2), steps: W!.sim.steps, rate: +W!.director!.rate.toFixed(2),
        drops: W!.sim.drops.length, stage: W!.director!.stageInfo,
        calls: renderer.info.render.calls, tris: renderer.info.render.triangles,
        events: W!.director!.eventLog.join(" "),
        lift: +W!.sim.lockLift().toFixed(3), wheelW: +W!.sim.wheel.angvel().x.toFixed(3), sh: +W!.sim.shuhengAngle().toFixed(3),
        fill: W!.sim.waterIn(W!.sim.fillingScoop()),
      }),
    };
    (window as unknown as { __cap: typeof api }).__cap = api;
    renderer.render(scene, camera);
    return;
  }

  if (params.has("audiotest")) {
    // render the whole soundtrack offline (film-time driven) and report levels
    overlay.classList.add("hide");
    const SR = 44100, DUR = FILM_END + 4;
    const off = new OfflineAudioContext(2, Math.ceil(SR * DUR), SR);
    const A = new AudioEngine(off);
    audio = A;
    W.director = new Director(camera, W.sim, W.mech, ui, A);
    const d = W.director;
    A.timeSource = () => d.ft;
    A.start();
    d.onEnd = () => A.fadeOutMusic(d.ft + 1.5, 3);
    while (d.ft < DUR - 0.5) frame(1 / 30, false);
    const buf = await off.startRendering();
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    let peak = 0, clip = 0, sum = 0, maxWin = 0;
    const win = Math.floor(SR * 0.05);
    let acc = 0;
    const perSec: number[] = [];
    let secAcc = 0;
    for (let i = 0; i < L.length; i++) {
      const a = Math.max(Math.abs(L[i]), Math.abs(R[i]));
      peak = Math.max(peak, a);
      if (a > 0.98) clip++;
      const e = (L[i] * L[i] + R[i] * R[i]) / 2;
      sum += e;
      acc += e;
      secAcc += e;
      if (i % win === win - 1) {
        maxWin = Math.max(maxWin, Math.sqrt(acc / win));
        acc = 0;
      }
      if (i % SR === SR - 1) {
        perSec.push(Math.round(20 * Math.log10(Math.sqrt(secAcc / SR) + 1e-9)));
        secAcc = 0;
      }
    }
    const report = {
      peak: +peak.toFixed(3),
      peakDb: +(20 * Math.log10(peak)).toFixed(1),
      rmsDb: +(20 * Math.log10(Math.sqrt(sum / L.length))).toFixed(1),
      loudest50msDb: +(20 * Math.log10(maxWin)).toFixed(1),
      clippedSamples: clip,
      perSecondDb: perSec,
    };
    console.log("AUDIO REPORT " + JSON.stringify(report));
    (window as unknown as { __audioReport: typeof report }).__audioReport = report;
    return;
  }

  if (FREE) {
    overlay.classList.add("hide");
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.5, 3, -1);
    camera.position.set(6, 4, -1);
    controls.update();
  }

  let last = performance.now();
  const loop = () => {
    const now = performance.now();
    // a hidden tab gets no frames: don't try to catch up more than a second
    const dt = Math.min(1.0, (now - last) / 1000);
    last = now;
    frame(dt);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  if (FREE) return;

  audio = new AudioEngine();
  const ok = await Promise.race([audio.resume(), new Promise<boolean>((r) => setTimeout(() => r(false), 400))]);
  if (ok && audio.running && !params.has("click")) {
    startFilm(true);
  } else {
    statusEl.textContent = "准备就绪";
    playBtn.disabled = false;
    playBtn.addEventListener("click", async () => {
      await audio!.resume();
      startFilm(true);
    }, { once: true });
  }
}
main();
