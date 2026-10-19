import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import { P, buildMachine, type Machine } from "./physics/machine";
import { makeMaterials } from "./scene/materials";
import { buildEnvironment } from "./scene/environment";
import { MachineVisuals } from "./scene/machineVisuals";
import { buildStatics } from "./scene/statics";
import { buildTower } from "./scene/tower";
import { QUALITY, detectSoftwareRenderer } from "./quality";
import { FILM_END, FOCUS, HUD_NODES, INSET, PHYS0, SCENE, describeTimeline, filmTimeAt, physTimeAt, playRate } from "./film/timeline";
import { evalCamera, cutFade } from "./film/camera";
import { Overlay } from "./film/overlay";
import { AudioEngine } from "./audio/audio";

declare global {
  interface Window { __ready?: boolean; __filmTime?: number; __state?: string }
}

const INITIAL_FILL = 8;

async function main() {
  const params = new URLSearchParams(location.search);
  const L0 = performance.now();
  const mark = (s: string) => { if (params.has("perf")) console.log(`[load] ${s} ${(performance.now() - L0).toFixed(0)}ms (page ${performance.now().toFixed(0)}ms)`); };
  mark("start");
  if (params.has("perf")) console.log(describeTimeline());
  await RAPIER.init();
  mark("rapier");
  const canvas = document.getElementById("gl") as HTMLCanvasElement;
  QUALITY.low = params.has("low") || (!params.has("high") && detectSoftwareRenderer());
  const low = QUALITY.low;

  // ---------------------------------------------------------------- 渲染器与场景
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !low, powerPreference: "high-performance" });
  const basePR = low ? 0.5 : Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(basePR);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = !low;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.05, 1000);
  const mats = makeMaterials();
  const env = buildEnvironment(scene, mats);
  mark("materials+env");

  // ---------------------------------------------------------------- 物理
  const newMachine = () => {
    const mm = buildMachine(RAPIER, { initialFill: INITIAL_FILL });
    while (mm.time < PHYS0 - 1e-9) mm.step();
    mm.sounds.length = 0;
    return mm;
  };
  let m: Machine = newMachine();
  mark("physics");
  const vis = new MachineVisuals(mats);
  vis.bind(m);
  scene.add(vis.root);
  scene.add(buildStatics(mats, m));
  scene.add(buildTower(mats));
  mark("geometry");

  const overlay = new Overlay(document.getElementById("overlay")!);
  const audio = new AudioEngine();

  // 预编译全部着色器，并临时关闭视锥剔除把所有物体画一遍：
  // 让每种绘制状态在加载阶段就完成编译，避免播放途中首次出现某个部件时卡顿
  evalCamera(0, camera);
  vis.update(0);
  {
    const culled: THREE.Object3D[] = [];
    scene.traverse((o) => { if (o.frustumCulled) { culled.push(o); o.frustumCulled = false; } });
    renderer.compile(scene, camera);
    mark("compile");
    // 只在 1×1 像素区域内绘制：触发全部管线编译，又几乎不产生片元着色开销
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, 1, 1);
    renderer.render(scene, camera);
    renderer.setScissorTest(false);
    renderer.getContext().getError();
    for (const o of culled) o.frustumCulled = true;
    mark("warmup");
  }
  document.getElementById("loading")?.remove();

  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);
  // 标签页隐藏时画面会停住，同时暂停音频时钟，回来后音画仍然同步
  document.addEventListener("visibilitychange", () => {
    const ctx = audio.ctx as AudioContext;
    if (document.hidden) { if (ctx.state === "running") void ctx.suspend(); }
    else if (ctx.state === "suspended" && audio.isStarted) void ctx.resume();
    last = performance.now();
  });

  // ---------------------------------------------------------------- 影片状态
  let state: "waiting" | "playing" | "ended" = "waiting";
  let filmT = 0;
  const debugT = params.get("t") ? Number(params.get("t")) : null;
  const camOverride = params.get("cam") ? params.get("cam")!.split(",").map(Number) : null;
  const syncGpu = params.has("sync");
  const freeze = params.has("freeze");

  const restart = (withSound: boolean, at = 0) => {
    m.world.free();
    m = newMachine();
    vis.bind(m);
    filmT = at;
    const T = physTimeAt(at);
    while (m.time < T - 1e-9) m.step();
    m.sounds.length = 0;
    state = "playing";
    overlay.showReplay(false);
    if (withSound && audio.running) audio.startMusic(at);
    else audio.stopMusic();
  };

  overlay.replayBtn.addEventListener("click", async () => {
    await audio.resume();
    overlay.showSoundButton(false);
    restart(true);
  });
  overlay.soundBtn.addEventListener("click", async () => {
    const ok = await audio.resume();
    overlay.showSoundButton(!ok);
    restart(ok);
  });

  // 测试钩子：离线渲染整段配乐 + 一组音效，返回每秒峰值/均方根电平（dBFS），用于检查是否爆音
  (window as unknown as { __audioTest: (secs: number) => Promise<unknown> }).__audioTest = async (secs: number) => {
    const sr = 44100;
    const off = new OfflineAudioContext(2, Math.ceil(sr * secs), sr);
    const eng = new AudioEngine(off);
    eng.startMusic(0);
    eng.setContinuous(0.16, 0.3, 0);
    const locks = [1.6, 4.29, 7.05, 9.82, 14.47, 17.23, 19.89, 22.49, 25.12, 27.77, 30.39, 33.13];
    locks.forEach((t, i) => { eng.lock(1, (i % 3 - 1) * 0.4, t); eng.lock(0.5, 0, t - 0.65); eng.tick(0.7, 0.2, t - 0.08); });
    [1.61, 7.0, 14.5, 19.8, 25.1, 30.4].forEach((t) => eng.bell(1, 0.3, t));
    [4.2, 9.7, 17.2, 22.4, 27.7, 33.1].forEach((t) => eng.drum(1, -0.3, t));
    const buf = await off.startRendering();
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    // 画出包络与频谱图，便于目视检查
    {
      const W = 1440, H = 600;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const g = cv.getContext("2d")!;
      g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
      const spp = Math.floor(L.length / W);
      g.strokeStyle = "#6cf";
      for (let x = 0; x < W; x++) {
        let pk = 0;
        for (let i = x * spp; i < (x + 1) * spp; i++) pk = Math.max(pk, Math.abs(L[i]));
        g.beginPath(); g.moveTo(x, 100 - pk * 95); g.lineTo(x, 100 + pk * 95); g.stroke();
      }
      // 频谱图：简单 DFT（对数频率 60Hz–6kHz）
      const N = 2048, bins = 100;
      for (let x = 0; x < W; x += 2) {
        const c = Math.floor((x / W) * L.length);
        for (let b = 0; b < bins; b++) {
          const f = 60 * Math.pow(100, b / bins);
          let re = 0, im = 0;
          for (let i = 0; i < N; i += 2) {
            const v = (L[c + i] ?? 0) * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N));
            const ph = (2 * Math.PI * f * i) / sr;
            re += v * Math.cos(ph); im += v * Math.sin(ph);
          }
          const mag = Math.sqrt(re * re + im * im) / (N / 4);
          const db = 20 * Math.log10(mag + 1e-6);
          const lv = Math.max(0, Math.min(1, (db + 70) / 60));
          g.fillStyle = `rgb(${lv * 255 | 0},${lv * lv * 200 | 0},${(1 - lv) * 80 | 0})`;
          g.fillRect(x, H - 10 - (b + 1) * 4, 2, 4);
        }
      }
      g.fillStyle = "#fff";
      for (let s = 0; s < secs; s += 2) g.fillText(String(s), (s / secs) * W, 215);
      (window as unknown as { __audioPng: string }).__audioPng = cv.toDataURL("image/png");
    }
    const out: { s: number; peak: number; rms: number }[] = [];
    let gPeak = 0;
    for (let s = 0; s < secs; s++) {
      let pk = 0, sum = 0, n = 0;
      for (let i = s * sr; i < Math.min(L.length, (s + 1) * sr); i++) {
        const a = Math.max(Math.abs(L[i]), Math.abs(R[i]));
        pk = Math.max(pk, a);
        sum += L[i] * L[i] + R[i] * R[i];
        n += 2;
      }
      gPeak = Math.max(gPeak, pk);
      out.push({ s, peak: +(20 * Math.log10(pk + 1e-9)).toFixed(1), rms: +(10 * Math.log10(sum / n + 1e-12)).toFixed(1) });
    }
    return { peakDb: +(20 * Math.log10(gPeak)).toFixed(2), perSecond: out };
  };

  // 调试钩子：跳转到影片时刻（只向前快进物理），供截图检查
  (window as unknown as { __seek: (t: number) => void }).__seek = (to: number) => {
    if (to < filmT || state !== "playing") restart(false, 0);
    const T = physTimeAt(to);
    while (m.time < T - 1e-9) m.step();
    m.sounds.length = 0;
    filmT = to;
  };

  if (debugT !== null) {
    restart(false, debugT);
  } else {
    const ok = params.has("mute") ? false : await audio.resume();
    if (ok) {
      restart(true);
    } else {
      // 浏览器拦截自动播放：显示“播放”按钮；若一直无人点击，则静音开播并提供开启声音的按钮
      overlay.showStart(async () => {
        const on = await audio.resume();
        restart(on);
        overlay.showSoundButton(!on);
      });
      setTimeout(() => {
        if (state === "waiting") {
          overlay.hideStart();
          restart(false);
          overlay.showSoundButton(true);
        }
      }, 8000);
    }
  }

  // ---------------------------------------------------------------- 每帧
  const D2R = 180 / Math.PI;
  const px1 = new Uint8Array(4);
  const tmp = new THREE.Vector3();
  const screenPan = (p: THREE.Vector3) => {
    tmp.copy(p).project(camera);
    return Math.max(-1, Math.min(1, tmp.x)) * 0.7;
  };
  const distGain = (p: THREE.Vector3, ref: number) => Math.max(0.22, Math.min(1, ref / camera.position.distanceTo(p)));

  let last = performance.now();
  let lockFlashAt = -10;
  const insetCam = new THREE.PerspectiveCamera(26, 1, 0.05, 60);
  /** 画中画在屏幕上的位置（CSS 像素，左上角为原点）；grow 为出现动画进度 */
  const insetRect = (grow: number) => {
    const W = window.innerWidth, H = window.innerHeight;
    const size = Math.round(Math.min(W * 0.24, H * 0.42) * (0.6 + 0.4 * grow));
    return { x: Math.round(W * 0.985 - size), y: Math.round(H * 0.15), w: size, h: size };
  };
  const perf = params.has("perf");
  let pf = { n: 0, phys: 0, render: 0, t0: performance.now(), steps: 0 };
  // 单帧最多追赶的时间：软件渲染时帧很慢，放宽上限以保持与真实时间同步
  const maxDt = low ? 1.0 : 0.25;
  const frame = () => {
    const gl = renderer.getContext() as WebGL2RenderingContext;
    const now = performance.now();
    const dt = Math.max(0, Math.min(maxDt, (now - last) / 1000));
    last = now;
    const p0 = now;

    if (state === "playing" && !freeze) {
      const target = filmT + dt;
      const T = physTimeAt(target);
      let steps = 0;
      const maxSteps = Math.ceil(maxDt / P.dt) + 2;
      while (m.time < T - 1e-9 && steps < maxSteps) {
        m.step();
        steps++;
      }
      filmT = m.time >= T - 1e-6 ? target : Math.max(filmT, filmTimeAt(m.time));
      if (filmT >= FILM_END + 0.6) {
        state = "ended";
        overlay.showReplay(true);
        audio.fadeOutAll(2.5);
      }
    } else if (state === "ended" && !freeze) {
      // 片尾：机器继续实时运转
      const T = m.time + dt;
      while (m.time < T - 1e-9) m.step();
    }
    const t = state === "waiting" ? 0 : Math.min(filmT, FILM_END + 0.6);
    window.__filmTime = t;
    pf.phys += performance.now() - p0;
    window.__state = state;

    // 物理事件 → 音效
    for (const s of m.sounds) {
      if (perf && (s.kind === "lock" || s.kind === "bell" || s.kind === "drum") && s.strength > 0.5) console.log(`[event] ${s.kind} film ${filmTimeAt(s.t).toFixed(2)}`);
      if (state !== "playing") break;
      if (s.kind === "lock") {
        if (s.strength < 0.25) continue;
        const p = vis.anchor("pawl");
        audio.lock(s.strength * distGain(p, 7), screenPan(p));
        if (s.strength > 0.5) lockFlashAt = filmT;
      } else if (s.kind === "tongue") {
        const p = vis.anchor("fork");
        audio.tick(0.7 * distGain(p, 6), screenPan(p));
      } else if (s.kind === "drum" && s.strength > 0.3) {
        const p = vis.anchor("jackDrum");
        audio.drum(s.strength * distGain(p, 6), screenPan(p));
      } else if (s.kind === "bell" && s.strength > 0.3) {
        const p = vis.anchor("jackBell");
        audio.bell(s.strength * distGain(p, 6), screenPan(p));
      }
    }
    m.sounds.length = 0;

    // 镜头
    evalCamera(t, camera);
    if (camOverride) {
      camera.position.set(camOverride[0], camOverride[1], camOverride[2]);
      camera.lookAt(camOverride[3], camOverride[4], camOverride[5]);
      if (camOverride[6]) { camera.fov = camOverride[6]; camera.updateProjectionMatrix(); }
    }

    // 讲解高亮与因果链状态（S3 起由物理状态驱动，保证与实际动作同步）
    const forkA = m.relAngle(m.ground, m.fork, "z") * D2R;
    const balA = m.relAngle(m.ground, m.bal, "z") * D2R;
    const wheelW = Math.abs(m.wheel.angvel().x);
    const tzW = Math.abs(m.tianzhu.angvel().y);
    const hud = HUD_NODES.map(() => false);
    const hl: Record<string, number> = {};
    const inS = (a: number, b: number) => t >= a && t < b;
    const inScene = (k: keyof typeof SCENE) => inS(SCENE[k][0], SCENE[k][1]);
    if (inS(SCENE.water[0], SCENE.esc[1])) { hud[0] = true; hud[1] = true; hl.bucket = 1; }
    if (inScene("esc")) {
      if (forkA < -1.0) { hud[2] = true; hl.fork = 1; hl.forkWeight = 1; }
      if (balA < -0.7) { hud[3] = true; hl.chain = 1; hl.bal = 1; }
      if (balA < -2.5) { hud[4] = true; hl.pawl = 1; }
      if (wheelW > 0.06) { hud[5] = true; hl.wheel = 0.6; hl.cross = 1; }
      // 天关卡住横档的一瞬间闪亮，与撞击声同步
      const since = t - lockFlashAt;
      if (since >= 0 && since < 0.6) { hl.pawl = Math.max(hl.pawl ?? 0, 1.6 * (1 - since / 0.6)); hud[4] = true; }
    }
    if (inS(SCENE.gears[0], SCENE.time[1])) {
      if (wheelW > 0.06) hud[5] = true;
      if (tzW > 0.05 || inScene("gears")) hud[6] = true;
    }
    if (inScene("upper")) hud[7] = true;
    if (inScene("time")) { hud[6] = true; hud[8] = true; }
    for (const f of FOCUS) if (inS(f.t0, f.t1)) for (const k of f.keys) hl[k] = Math.max(hl[k] ?? 0, 0.8);
    for (const key of Object.keys(vis.hlMats)) vis.setHighlight(key, hl[key] ?? 0);
    vis.setHighlight("bucket", hl.bucket ?? 0);

    vis.update(t);
    env.update(now / 1000);
    void p0;

    // 持续音：水流、木轮隆隆
    if (state === "playing") {
      const sp = vis.anchor("spout");
      const water = 0.16 * Math.max(0.12, Math.min(1, 4.5 / camera.position.distanceTo(sp)));
      const wp = vis.anchor("wheel");
      audio.setContinuous(water, screenPan(sp), Math.min(0.5, wheelW * 0.7) * distGain(wp, 7));
    } else {
      audio.setContinuous(0, 0, 0);
    }

    {
      overlay.update(t, {
        camera, width: window.innerWidth, height: window.innerHeight,
        anchor: (n) => vis.anchor(n), hudState: hud, slow: state === "playing" ? playRate(t) : 1, fade: state === "waiting" ? 0 : cutFade(t),
      });
      const r0 = performance.now();
      renderer.render(scene, camera);
      // 画中画放大镜：特写天关与横档（第二个相机，同一物理场景）
      const ins = INSET.find((s) => t >= s.t0 && t < s.t1);
      const grow = ins ? Math.min(1, (t - ins.t0) / 0.35, (ins.t1 - t) / 0.25) : 0;
      overlay.setInset(grow > 0.02 ? insetRect(grow) : null, ins?.title ?? "");
      if (ins && grow > 0.02) {
        const r = insetRect(grow);
        const a = vis.anchor(ins.anchor);
        insetCam.position.set(a.x + ins.off[0], a.y + ins.off[1], a.z + ins.off[2]);
        insetCam.lookAt(a.x + ins.look[0], a.y + ins.look[1], a.z + ins.look[2]);
        insetCam.fov = ins.fov;
        insetCam.aspect = r.w / r.h;
        insetCam.updateProjectionMatrix();
        const H = window.innerHeight;
        renderer.setScissorTest(true);
        renderer.setViewport(r.x, H - r.y - r.h, r.w, r.h);
        renderer.setScissor(r.x, H - r.y - r.h, r.w, r.h);
        renderer.shadowMap.autoUpdate = false;
        renderer.render(scene, insetCam);
        renderer.shadowMap.autoUpdate = true;
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
      }
      if (low) {
        // 软件渲染：一次同步往返，等 GPU 进程处理完本帧命令，避免命令堆积导致截图/合成卡顿
        gl.getError();
      } else if (syncGpu) {
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px1);
      }
      pf.render += performance.now() - r0;
      pf.n++;
    }
    if (perf && performance.now() - pf.t0 > 2000) {
      const el = (performance.now() - pf.t0) / 1000;
      console.log(`[perf] fps ${(pf.n / el).toFixed(1)} phys ${(pf.phys / pf.n).toFixed(0)}ms render ${(pf.render / pf.n).toFixed(0)}ms film ${t.toFixed(2)} wall ${(performance.now() / 1000).toFixed(1)}`);
      pf = { n: 0, phys: 0, render: 0, t0: performance.now(), steps: 0 };
    }
    window.__ready = true;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

main();
