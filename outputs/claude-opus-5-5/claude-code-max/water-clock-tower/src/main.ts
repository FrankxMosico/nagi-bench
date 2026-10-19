// 入口：初始化物理与场景，按影片时间推进仿真并渲染。
import './style.css';
import RAPIER from '@dimforge/rapier3d-compat';
import { Sim } from './sim/sim';
import { applyInitialState } from './sim/init';
import { View } from './view';
import { simTimeAt, filmTimeAt } from './film/schedule';
import { Film } from './film/film';
import { detectSoftwareGL } from './render/stage';

const qs = new URLSearchParams(location.search);
// 画质：?q=high / ?q=low 强制；默认在软件渲染（SwiftShader 等）时自动用低画质
const lite = qs.get('q') === 'low' || qs.has('lite') || (qs.get('q') !== 'high' && detectSoftwareGL());
const seek = qs.has('t') ? Number(qs.get('t')) : 0;
const freeze = qs.has('freeze');
// 调试：由外部逐帧设定影片时间（物理仍按固定步长完整推进），便于截图
const manual = qs.has('manual');
(window as unknown as { __manualTime: number }).__manualTime = 0;
if (qs.has('nohud')) document.getElementById('overlay')!.style.display = 'none';
if (lite) document.body.classList.add('lite');

const loading = document.getElementById('loading')!;
const bar = loading.querySelector('.ld-bar i') as HTMLElement;
const setProgress = (p: number) => { bar.style.width = `${Math.round(p * 100)}%`; };
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

declare global { interface Window { __film?: { ready: boolean; filmTime: number; simTime: number; fps: number; frames: number; lite: boolean } } }
window.__film = { ready: false, filmTime: 0, simTime: 0, fps: 0, frames: 0, lite };

async function boot() {
  const tb = performance.now();
  const mark = (s: string) => console.debug(`[boot] ${s} ${(performance.now() - tb).toFixed(0)}ms`);
  setProgress(0.05);
  await RAPIER.init();
  mark('rapier');
  setProgress(0.3);
  await nextFrame();
  let sim = new Sim();
  applyInitialState(sim);
  mark('sim');
  setProgress(0.45);
  await nextFrame();
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  let view = new View(sim, canvas, lite);
  mark('view');
  setProgress(0.8);
  await nextFrame();
  const film = new Film(view, sim);
  mark('film');

  /** 按固定步长推进物理，直到仿真时间追上 target（每个物理步之后记录位姿用于插值） */
  const advanceTo = (target: number, maxSteps: number, silent: boolean) => {
    let n = 0;
    while (sim.time + sim.dt <= target + 1e-9 && n < maxSteps) {
      sim.step();
      view.capture();
      film.onEvents(sim.drainEvents(), silent);
      n++;
    }
  };
  // 调试/截图：可直接定位到影片某一时刻（物理仍从头完整推进）
  if (seek > 0) advanceTo(simTimeAt(seek), Infinity, true);
  mark('seek');
  film.update(seek);
  view.sync(0);
  await view.stage.renderer.compileAsync(view.stage.scene, view.stage.camera);
  mark('compile');
  view.render();
  mark('first render');
  setProgress(1);
  loading.style.opacity = '0';
  setTimeout(() => loading.remove(), 900);

  let filmStart = performance.now() - seek * 1000;
  let frames = 0, fpsT = performance.now();
  film.onRestart = () => {
    // 从头重播：重建仿真，保证与首播完全一致
    view.stage.scene.remove(view.tower.root, view.mech.root, view.water.mesh);
    sim = new Sim();
    applyInitialState(sim);
    view = new View(sim, canvas, lite);
    film.rebind(view, sim);
    filmStart = performance.now();
  };
  window.__film!.ready = true;
  (window as unknown as { __bench: (n: number, mode: string) => unknown }).__bench = (n: number, mode: string) => {
    const s2 = new Sim();
    applyInitialState(s2);
    s2.profiling = mode === 'parts';
    const t0 = performance.now();
    for (let i = 0; i < n; i++) s2.step();
    const total = performance.now() - t0;
    const p = s2.prof;
    return { perStep: total / n, refresh: p.refresh / n, water: p.water / n, world: p.world / n, events: p.events / n };
  };
  (window as unknown as { __info: () => unknown }).__info = () => {
    const r = view.stage.renderer.info;
    let meshes = 0;
    view.stage.scene.traverse((o) => { if ((o as { isMesh?: boolean }).isMesh) meshes++; });
    return { calls: r.render.calls, tris: r.render.triangles, meshes, geoms: r.memory.geometries, tex: r.memory.textures, programs: r.programs?.length ?? 0 };
  };

  const loop = () => {
    requestAnimationFrame(loop);
    const now = performance.now();
    let ft = freeze ? seek : manual ? (window as unknown as { __manualTime: number }).__manualTime : (now - filmStart) / 1000;
    let target = simTimeAt(ft);
    // 物理追赶：每帧最多推进 1.5 s 仿真时间；若机器太慢追不上，就让影片时钟等一等（宁可慢放，不跳帧）
    advanceTo(target, manual ? Infinity : Math.round(1.5 / sim.dt), false);
    if (!manual && sim.time + sim.dt <= target - 0.25) {
      ft = filmTimeAt(sim.time);
      filmStart = now - ft * 1000;
      target = simTimeAt(ft);
    }
    const alpha = Math.min(1, Math.max(0, (target - sim.time) / sim.dt));
    const t1 = performance.now();
    view.sync(alpha);
    const t2 = performance.now();
    film.update(ft);
    const t3 = performance.now();
    view.render();
    const t4 = performance.now();
    (window as unknown as { __timing: number[] }).__timing = [t1 - now, t2 - t1, t3 - t2, t4 - t3];
    frames++;
    window.__film!.frames++;
    if (now - fpsT > 1000) { window.__film!.fps = (frames * 1000) / (now - fpsT); frames = 0; fpsT = now; }
    window.__film!.filmTime = ft;
    window.__film!.simTime = sim.time;
  };
  requestAnimationFrame(loop);
}

boot().catch((e) => {
  console.error(e);
  const sub = loading.querySelector('.ld-sub');
  if (sub) sub.textContent = '加载失败：' + (e?.message ?? e);
});
