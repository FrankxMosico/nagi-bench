import "./style.css";
import * as THREE from "three";
import {
  CinematicPlayer,
  ThreeStage,
  WebAudioCueBus,
  fadeEnvelope,
  mountCinematicControls,
  validateVoiceCues,
} from "@agentbench/cinematic-player";
import { buildWorld } from "./film/sets";
import { shots, type FilmContext } from "./film/shots";
import { voiceCues, soundCues } from "./film/cues";
import { FILM_DURATION } from "./film/timeline";
import { defineSounds } from "./film/audio";

const stageRoot = document.querySelector<HTMLElement>("#stage")!;
const loading = document.querySelector<HTMLElement>("#loading")!;
const titleCard = document.querySelector<HTMLElement>("#title-card")!;
const scopeMask = document.querySelector<HTMLElement>("#scope-mask")!;
const credits = document.querySelector<HTMLElement>("#credits")!;
const chapterCard = document.querySelector<HTMLElement>("#chapter-card")!;
const chapterText = document.querySelector<HTMLElement>("#chapter-text")!;
const flash = document.querySelector<HTMLElement>("#flash")!;
const fade = document.querySelector<HTMLElement>("#fade")!;

validateVoiceCues(voiceCues, FILM_DURATION);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
  stencil: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x04060a, 1);

function chapterAt(time: number): { text: string; start: number; end: number } | null {
  if (time >= 13.6 && time <= 18.2) return { text: "北京 · 胡同深处", start: 13.6, end: 18.2 };
  if (time >= 111.0 && time <= 116.4) return { text: "同步轨道 · 三万六千公里", start: 111.0, end: 116.4 };
  if (time >= 227.6 && time <= 232.8) return { text: "黄河站外 · 十公里", start: 227.6, end: 232.8 };
  return null;
}

async function boot(): Promise<void> {
  // Let the loading frame paint before constructing a few hundred thousand voxels.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const world = buildWorld();
  const scene = world.scene;
  const context: FilmContext = { world };

  // The camera used by the world is the one the renderer observes.
  const filmCamera = world.camera;
  filmCamera.aspect = window.innerWidth / window.innerHeight;

  renderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
  });

  const player = new CinematicPlayer<FilmContext>({
    duration: FILM_DURATION,
    context,
    shots,
    cues: [...voiceCues, ...soundCues],
  });

  const audio = new WebAudioCueBus(player);
  defineSounds(audio);

  const stage = new ThreeStage<FilmContext>({
    player,
    renderer: renderer as any,
    scene,
    camera: () => filmCamera,
    container: stageRoot,
    maxPixelRatio: 2,
  });

  const controls = mountCinematicControls<FilmContext>({
    player,
    audio,
    container: stageRoot,
    showFullscreen: true,
  });

  player.addTypedEventListener("frame", ({ detail }) => {
    const t = detail.time;

    const title = fadeEnvelope(t, 7.2, 13.0, 1.4, 1.1);
    titleCard.style.opacity = String(title);
    titleCard.style.transition = "none";

    const scope = fadeEnvelope(t, 282.0, 286.1, 0.3, 0.18);
    scopeMask.style.opacity = String(scope);

    credits.style.opacity = t >= 337.6 ? "1" : "0";
    credits.style.transition = "none";

    const chapter = chapterAt(t);
    if (chapter) {
      const a = Math.min(
        fadeEnvelope(t, chapter.start, chapter.end, 0.6, 0.6),
        1,
      );
      chapterText.textContent = chapter.text;
      chapterCard.style.opacity = String(a);
    } else {
      chapterCard.style.opacity = "0";
    }

    // A single-frame optical flare from the basement pistol.
    const shoot = Math.max(0, 1 - Math.abs(t - 210.0) / 0.055);
    flash.style.opacity = String(shoot * 0.07);

    const openFade = (1 - Math.min(1, Math.max(0, t / 1.15))) * 0.55;
    const closeFade = Math.min(1, Math.max(0, (t - 337.1) / 0.9));
    fade.style.opacity = String(Math.max(openFade, closeFade));

    world.updateEnvironment(t);
    if (player.isPlaying) controls.subtitle.setAttribute("data-playing", "true");
  });

  // A deterministic first frame: seek to zero and render before the user clicks.
  player.seek(0);
  player.refresh();
  stage.resize();
  loading.classList.add("hidden");
  window.setTimeout(() => loading.remove(), 1200);

  // Expose only for inspection; never used by the film.
  (window as any).__meteorite = { player, audio, stage, controls, world };

  // Keyboard transport is an accessibility convenience around the same player.
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (player.isPlaying) player.pause();
      else {
        void audio.unlock().then(() => player.play());
      }
    } else if (event.code === "ArrowRight") {
      player.seek(Math.min(player.duration, player.currentTime + 5));
    } else if (event.code === "ArrowLeft") {
      player.seek(Math.max(0, player.currentTime - 5));
    }
  });
}

void boot();
