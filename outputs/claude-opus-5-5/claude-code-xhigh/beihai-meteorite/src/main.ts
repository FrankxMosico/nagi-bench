import * as THREE from "three";
import {
  CinematicPlayer,
  ThreeStage,
  WebAudioCueBus,
  mountCinematicControls,
  validateVoiceCues,
  type TimelineCue,
} from "@agentbench/cinematic-player";
import { createWorld, type World } from "./world";
import { buildShots } from "./shots";
import { voiceCues } from "./voice";
import { buildSoundCues } from "./audio/cues";
import { registerSounds, warmAudio } from "./audio/sounds";
import { createPost } from "./post";
import { Overlay, OVERLAY_CSS } from "./overlay";
import { LAYERS } from "./core/particles";
import { DURATION } from "./story";

const POSTER_CSS = `
.poster{position:absolute;inset:0;z-index:30;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.2vh;
  background:radial-gradient(ellipse at 62% 40%,rgba(255,170,90,.16),rgba(0,0,0,0) 38%),radial-gradient(ellipse at 50% 120%,rgba(40,80,140,.25),rgba(0,0,0,0) 60%),#000;
  color:#e9e4da;font-family:"Noto Serif SC","Source Han Serif SC","Songti SC","STSong",serif;cursor:pointer;transition:opacity .6s ease}
.poster h1{margin:0;font-weight:400;font-size:clamp(30px,8vh,96px);letter-spacing:.6em;padding-left:.6em}
.poster p{margin:0;font-size:clamp(11px,1.8vh,18px);letter-spacing:.3em;color:#a9a397}
.poster .go{margin-top:3vh;padding:.7em 1.8em;border:1px solid #e2bd7680;border-radius:999px;font:500 clamp(12px,1.9vh,18px)/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.2em;color:#f1d9a8;background:#ffffff08}
.poster .hint{position:absolute;bottom:4vh;font:400 clamp(10px,1.4vh,14px)/1.6 ui-sans-serif,system-ui,sans-serif;letter-spacing:.12em;color:#7d786f;text-align:center}
.poster.hidden{opacity:0;pointer-events:none}
`;

const app = document.getElementById("app")!;
const frame = document.getElementById("frame")!;
const style = document.createElement("style");
style.textContent = OVERLAY_CSS + POSTER_CSS;
document.head.appendChild(style);

const poster = document.createElement("div");
poster.className = "poster";
poster.innerHTML = `<h1>尘世之外</h1><p>一部方块电影 · 改编自刘慈欣《三体Ⅱ·黑暗森林》</p><div class="go">正在搭建场景……</div>
  <div class="hint">全片 5 分 52 秒 · 建议佩戴耳机<br>空格键 播放/暂停 · ← → 快退/快进 5 秒</div>`;
app.appendChild(poster);
const go = poster.querySelector(".go") as HTMLDivElement;

function boot(): void {
  const renderer = new THREE.WebGLRenderer({ antialias: false, logarithmicDepthBuffer: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 1);

  const world: World = createWorld();
  const post = createPost(renderer, world);
  const overlay = new Overlay(frame);
  const voices = validateVoiceCues(voiceCues, DURATION);
  const cues: TimelineCue[] = [...voices, ...buildSoundCues()];
  const player = new CinematicPlayer<World>({ duration: DURATION, context: world, shots: buildShots(), cues });

  const buf = new THREE.Vector2();
  const stageRenderer = {
    domElement: renderer.domElement,
    setSize(w: number, h: number, updateStyle?: boolean) {
      renderer.setSize(w, h, updateStyle);
      post.setSize(w, h);
    },
    setPixelRatio(r: number) {
      renderer.setPixelRatio(r);
      post.setPixelRatio(r);
    },
    render() {
      renderer.getDrawingBufferSize(buf);
      for (const l of LAYERS) l.setViewportHalfHeight(buf.y / 2);
      overlay.apply(world.fx, player.currentTime);
      post.render(player.currentTime);
    },
    dispose() {
      renderer.dispose();
    },
  };
  const stage = new ThreeStage({ player, renderer: stageRenderer, scene: world.scene, camera: () => world.camera, container: frame, maxPixelRatio: 1.5 });
  const audio = new WebAudioCueBus(player);
  registerSounds(audio as WebAudioCueBus<unknown>);
  const controls = mountCinematicControls({ player, audio, container: app });

  let warmed = false;
  const unlock = async () => {
    const ac = await audio.unlock();
    if (ac && !warmed) {
      warmed = true;
      warmAudio(ac);
      audio.setGroupGain("music", 0.9);
    }
  };
  // The transport's own play button also unlocks; warm the buffers on that path too.
  controls.root.addEventListener("click", () => void unlock(), true);
  const start = async () => {
    await unlock();
    poster.classList.add("hidden");
    if (!player.isPlaying) player.play();
  };
  go.textContent = "▶  开始放映";
  poster.addEventListener("click", () => void start());
  player.addTypedEventListener("statechange", (e) => {
    if (e.detail.state === "playing") poster.classList.add("hidden");
  });
  window.addEventListener("keydown", async (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      await unlock();
      poster.classList.add("hidden");
      if (player.isPlaying) player.pause();
      else player.play();
    } else if (e.code === "ArrowRight") player.seek(Math.min(DURATION, player.currentTime + 5));
    else if (e.code === "ArrowLeft") player.seek(Math.max(0, player.currentTime - 5));
  });

  // Resizing a canvas clears it; while paused nothing else would redraw it.
  new ResizeObserver(() => {
    if (!player.isPlaying) player.refresh();
  }).observe(frame);

  // Exposed for inspection and automated checks.
  (window as unknown as Record<string, unknown>).__film = { player, world, stage, audio, controls };
}

// Let the poster paint before the voxel world is meshed.
requestAnimationFrame(() => setTimeout(boot, 30));
