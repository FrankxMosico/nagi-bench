import "./style.css";
import * as THREE from "three";
import {
  CinematicPlayer,
  ThreeStage,
  WebAudioCueBus,
  mountCinematicControls,
  validateVoiceCues,
  type ThreeRendererLike,
} from "@agentbench/cinematic-player";
import { buildFilm } from "./world/index";
import { resetFrame, type FilmContext } from "./world/context";
import { fxUniforms } from "./world/fx";
import { voiceCues } from "./voice";
import { soundCues } from "./audio/cues";
import { registerSounds } from "./audio/sounds";
import { GROUP_GAINS } from "./audio/mix";
import { createPost, interiorEnvironment, spaceEnvironment } from "./post";
import { createOverlay } from "./overlay";
import { DURATION } from "./timeline";

/**
 * 《尘世之外》 — entry point. Builds every set procedurally, then hands the
 * absolute timeline to the AgentBench player: shots derive the picture, the
 * voice manifest drives the subtitles, the sound cue sheet drives Web Audio.
 */

const app = document.querySelector<HTMLElement>("#app")!;
const stageEl = document.querySelector<HTMLElement>("#stage")!;
const loading = document.querySelector<HTMLElement>("#loading")!;
const loadingText = document.querySelector<HTMLElement>("#loading-text")!;

function nextPaint(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

async function boot(): Promise<void> {
  await nextPaint();
  const film = buildFilm((label) => {
    loadingText.textContent = `正在生成场景：${label}`;
  });
  validateVoiceCues(voiceCues, DURATION);

  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true, powerPreference: "high-performance" });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const env = spaceEnvironment(renderer);
  film.sets.space.setEnvironment(env);
  film.sets.prologue.scene.environment = env;
  film.sets.cabin.scene.environment = env;
  // indoors only the metal gets reflections; painted wood and plaster stay as lit
  const room = interiorEnvironment(renderer);
  for (const set of [film.sets.collector, film.sets.workshop, film.sets.basement]) {
    set.scene.traverse((o) => {
      const mat = (o as THREE.Mesh).material;
      for (const m of Array.isArray(mat) ? mat : mat ? [mat] : []) {
        if (m instanceof THREE.MeshStandardMaterial && m.metalness >= 0.3 && !m.envMap) {
          m.envMap = room;
          m.envMapIntensity = 0.8;
        }
      }
    });
  }

  const ctx: FilmContext = film.ctx;
  const post = createPost(renderer, ctx);
  const overlay = createOverlay(stageEl);
  const size = new THREE.Vector2();

  // quality guard: if playback cannot hold ~25 fps, step down resolution, then bloom
  let lastFrame = 0;
  let avgMs = 16;
  let qualityStep = 0;
  const watchFrameRate = () => {
    const now = performance.now();
    if (player.isPlaying && lastFrame > 0) {
      avgMs = avgMs * 0.96 + Math.min(200, now - lastFrame) * 0.04;
      if (avgMs > 40 && player.currentTime > 4) {
        qualityStep++;
        avgMs = 16;
        if (qualityStep === 1) {
          renderer.setPixelRatio(1);
          post.setPixelRatio(1);
        } else if (qualityStep === 2) post.setBloomEnabled(false);
      }
    }
    lastFrame = player.isPlaying ? now : 0;
  };

  const rendererLike: ThreeRendererLike = {
    domElement: renderer.domElement,
    setSize: (w, h, updateStyle) => {
      renderer.setSize(w, h, updateStyle);
      post.setSize(w, h);
    },
    setPixelRatio: (r) => {
      renderer.setPixelRatio(r);
      post.setPixelRatio(r);
    },
    render: () => {
      watchFrameRate();
      renderer.getSize(size);
      const aspect = size.x / Math.max(1, size.y);
      if (Math.abs(ctx.camera.aspect - aspect) > 1e-4) {
        ctx.camera.aspect = aspect;
        ctx.camera.updateProjectionMatrix();
      }
      fxUniforms.uScale.value = (size.y * renderer.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(ctx.camera.fov) / 2));
      post.render(player.currentTime);
      overlay.update(ctx);
      // the next frame's shots start from a neutral grade and empty overlays
      resetFrame(ctx);
    },
    dispose: () => renderer.dispose(),
  };

  const player = new CinematicPlayer<FilmContext>({
    duration: DURATION,
    context: ctx,
    shots: film.shots,
    cues: [...voiceCues, ...soundCues],
  });

  const audio = new WebAudioCueBus(player);
  registerSounds(audio as WebAudioCueBus<unknown>);

  const stage = new ThreeStage({
    player,
    renderer: rendererLike,
    scene: ctx.scene,
    camera: () => ctx.camera,
    container: stageEl,
    maxPixelRatio: 1.5,
  });

  const controls = mountCinematicControls({ player, audio, container: app });

  // mix: groups are created lazily once the AudioContext exists
  let mixed = false;
  player.addTypedEventListener("statechange", (event) => {
    if (event.detail.state === "playing" && !mixed) {
      mixed = true;
      for (const [group, gain] of Object.entries(GROUP_GAINS)) audio.setGroupGain(group, gain);
    }
  });

  // warm-up: render one frame of every set so shaders and shadow maps compile
  // now rather than as a hitch in the middle of playback
  const warm = [1, 11, 18, 30, 108, 120, 140, 146, 170, 177, 180.5, 183.2, 186, 228, 248, 270, 280.5, 305, 324, 340];
  for (let k = 0; k < warm.length; k++) {
    loadingText.textContent = `正在预热画面 ${k + 1}/${warm.length}`;
    player.seek(warm[k]!);
    await nextPaint();
  }

  // poster: a still of the sunset ring, captured from the film itself
  player.seek(219.6);
  let still = "";
  try {
    still = renderer.domElement.toDataURL("image/jpeg", 0.86);
  } catch {
    still = "";
  }
  player.seek(0);
  const poster = document.createElement("div");
  poster.className = "poster";
  if (still) poster.style.backgroundImage = `url(${still})`;
  poster.innerHTML = `
    <div class="poster-title">尘世之外</div>
    <div class="poster-sub">根据刘慈欣《三体Ⅱ·黑暗森林》片段改编</div>
    <button class="poster-play" type="button" aria-label="播放">▶</button>
    <div class="poster-hint">建议佩戴耳机 · 全片约 6 分钟</div>`;
  stageEl.appendChild(poster);
  const start = async () => {
    await audio.unlock();
    if (!player.isPlaying) player.play();
  };
  poster.addEventListener("click", () => void start());
  player.addTypedEventListener("statechange", (event) => {
    if (event.detail.state === "playing") {
      poster.style.opacity = "0";
      poster.style.pointerEvents = "none";
      setTimeout(() => poster.remove(), 1000);
    }
  });

  window.addEventListener("keydown", (e) => {
    // focused controls handle their own keys (Space on a button already clicks it)
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === "BUTTON" || target.tagName === "INPUT")) return;
    if (e.code === "Space") {
      e.preventDefault();
      void audio.unlock().then(() => (player.isPlaying ? player.pause() : player.play()));
    } else if (e.code === "ArrowRight") player.seek(Math.min(DURATION, player.currentTime + 5));
    else if (e.code === "ArrowLeft") player.seek(Math.max(0, player.currentTime - 5));
  });

  loading.style.opacity = "0";
  setTimeout(() => loading.remove(), 700);

  (window as unknown as Record<string, unknown>).__film = { player, audio, stage, controls, film };
}

boot().catch((err: unknown) => {
  console.error(err);
  loadingText.textContent = `加载失败：${err instanceof Error ? err.message : String(err)}`;
});
