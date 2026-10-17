import * as THREE from "three";
import {
  CinematicPlayer,
  ThreeStage,
  WebAudioCueBus,
  mountCinematicControls,
  validateVoiceCues,
  type ThreeRendererLike,
} from "@agentbench/cinematic-player";
import "./styles/style.css";
import { DURATION, FIRE_TIMES, soundCues, voiceCues } from "./cues";
import { installAudio } from "./lib/audio";
import { createFilmShots, type FilmContext } from "./shots";
import { createPrologueWorld } from "./world/prologue";
import { createHutongWorld } from "./world/hutong";
import { createCollectorWorld } from "./world/collector";
import { createWorkshopWorld } from "./world/workshop";
import { createBasementWorld } from "./world/basement";
import { createSpaceWorld } from "./world/space";
import { createBaseWorld } from "./world/base";

await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

function byId<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element #${id}`);
  return element as T;
}

function makeGrain(): void {
  const grain = document.getElementById("grain");
  if (!grain) return;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const image = ctx.createImageData(128, 128);
  let seed = 0x6a09e667;
  for (let i = 0; i < image.data.length; i += 4) {
    seed = (Math.imul(seed ^ (seed >>> 15), 0x2c1b3c6d) + 0x9e3779b9) >>> 0;
    const value = ((seed >>> 11) & 255);
    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = 42 + ((seed >>> 19) & 63);
  }
  ctx.putImageData(image, 0, 0);
  grain.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  grain.style.backgroundSize = "128px 128px";
}

// ---------------------------------------------------------------------------
// Renderer and stage
// ---------------------------------------------------------------------------

const scene = new THREE.Scene();
scene.background = null;
const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.02, 1400);
camera.position.set(0, 1.5, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute("aria-label", "陨石子弹，Three.js 体素电影画面");

const prologue = createPrologueWorld();
const hutong = createHutongWorld();
const collector = createCollectorWorld();
const workshop = createWorkshopWorld();
const basement = createBasementWorld();
const space = createSpaceWorld();
const base = createBaseWorld();

const worldGroups = [
  prologue.group,
  hutong.group,
  collector.group,
  workshop.group,
  basement.group,
  space.group,
  base.group,
];
for (const group of worldGroups) {
  group.visible = false;
  scene.add(group);
}

const context: FilmContext = {
  scene,
  camera,
  worlds: { prologue, hutong, collector, workshop, basement, space, base },
};

// ---------------------------------------------------------------------------
// Timeline and procedural sound
// ---------------------------------------------------------------------------

validateVoiceCues(voiceCues, DURATION);
const shots = createFilmShots();
const player = new CinematicPlayer<FilmContext>({
  duration: DURATION,
  context,
  shots,
  cues: [...voiceCues, ...soundCues],
});

const audio = new WebAudioCueBus<FilmContext>(player);
installAudio(audio);
audio.setMasterGain(0.8);
audio.setGroupGain("amb", 0.78);
audio.setGroupGain("score", 0.7);
audio.setGroupGain("sfx", 0.95);
audio.setGroupGain("suit", 0.84);
audio.setGroupGain("radio", 0.82);
audio.setGroupGain("space", 0.55);

const stage = new ThreeStage({
  player,
  renderer: renderer as unknown as ThreeRendererLike,
  scene,
  camera: () => camera,
  container: byId("stage"),
  maxPixelRatio: Math.min(2, window.devicePixelRatio || 1),
});

const controls = mountCinematicControls<FilmContext>({
  player,
  audio,
  showFullscreen: true,
});


// ---------------------------------------------------------------------------
// DOM overlays — titles, cards, scope, end card
// ---------------------------------------------------------------------------

const titleCard = byId("film-title");
const placeCard = byId("place-card");
const placeIndex = byId("place-index");
const placeTitle = byId("place-title");
const placeSub = byId("place-sub");
const scopeOverlay = byId("scope");
const endCard = byId("end-card");
const startPrompt = byId("start-prompt");
const startButton = byId<HTMLButtonElement>("start-button");
const boot = byId("boot");

let hasStarted = false;
let currentPlaceKey = "";

interface PlaceWindow {
  from: number;
  to: number;
  index: string;
  title: string;
  sub: string;
}

const placeWindows: PlaceWindow[] = [
  {
    from: 11.0,
    to: 19.2,
    index: "01",
    title: "北京 · 胡同深处",
    sub: "危机纪元十二年 · 深秋",
  },
  {
    from: 110.0,
    to: 118.2,
    index: "02",
    title: "太空军研究所 · 模型车间",
    sub: "凌晨 02:40 / 禁止记录",
  },
  {
    from: 156.3,
    to: 164.0,
    index: "03",
    title: "地下七层",
    sub: "未登记设施 / 声音比光先到",
  },
  {
    from: 234.8,
    to: 243.6,
    index: "04",
    title: "地球同步轨道",
    sub: "黄河空间站 / 距地三万六千公里",
  },
  {
    from: 337.6,
    to: 344.6,
    index: "05",
    title: "一号基地 · 返航后",
    sub: "同一时刻，太空重归寂静",
  },
];

function setPlaceCard(window: PlaceWindow | null): void {
  if (!window) {
    placeCard.classList.remove("is-visible");
    currentPlaceKey = "";
    return;
  }
  const key = `${window.from}-${window.title}`;
  if (currentPlaceKey !== key) {
    placeIndex.textContent = window.index;
    placeTitle.textContent = window.title;
    placeSub.textContent = window.sub;
    currentPlaceKey = key;
  }
  placeCard.classList.add("is-visible");
}

function updateOverlays(time: number): void {
  // Film title: only the opening.
  const titleVisible = time >= 0.0 && time < 8.85;
  titleCard.classList.toggle("is-visible", titleVisible);

  let activePlace: PlaceWindow | null = null;
  for (const window of placeWindows) {
    if (time >= window.from && time < window.to) {
      activePlace = window;
      break;
    }
  }
  setPlaceCard(activePlace);

  scopeOverlay.classList.toggle("is-visible", time >= 311.2 && time < 315.0);
  endCard.classList.toggle("is-visible", time >= 347);

  if (hasStarted || player.currentTime > 0.08) {
    startPrompt.classList.add("is-hidden");
  }
}

function hideBoot(): void {
  boot.classList.add("is-hidden");
  window.setTimeout(() => boot.remove(), 1350);
}

function startFilm(): void {
  hasStarted = true;
  startPrompt.classList.add("is-hidden");
  void audio.unlock().then(() => {
    player.play();
  });
}

startButton.addEventListener("click", startFilm);
player.addTypedEventListener("statechange", (event) => {
  if (event.detail.state === "playing") {
    hasStarted = true;
    startPrompt.classList.add("is-hidden");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (player.isPlaying) {
      player.pause();
    } else {
      if (!hasStarted) startFilm();
      else {
        void audio.unlock().then(() => player.play());
      }
    }
  } else if (event.code === "ArrowRight") {
    player.seek(Math.min(player.duration, player.currentTime + 10));
  } else if (event.code === "ArrowLeft") {
    player.seek(Math.max(0, player.currentTime - 10));
  }
});

player.addTypedEventListener("frame", (event) => {
  updateOverlays(event.detail.time);
});

// The opening frame must be complete before the boot screen lifts.
makeGrain();
updateOverlays(0);
player.refresh();
window.setTimeout(hideBoot, 180);

// Handy for automated verification and projection booths alike.
(window as typeof window & {
  __meteorBullets?: {
    player: CinematicPlayer<FilmContext>;
    audio: WebAudioCueBus<FilmContext>;
    stage: ThreeStage<FilmContext>;
    controls: ReturnType<typeof mountCinematicControls>;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    voices: typeof voiceCues;
    sounds: typeof soundCues;
    fireTimes: readonly number[];
    duration: number;
  };
}).__meteorBullets = {
  player,
  audio,
  stage,
  controls,
  scene,
  camera,
  voices: voiceCues,
  sounds: soundCues,
  fireTimes: FIRE_TIMES,
  duration: DURATION,
};

window.addEventListener("beforeunload", () => {
  controls.destroy();
  stage.destroy();
  audio.destroy();
  player.destroy();
});
