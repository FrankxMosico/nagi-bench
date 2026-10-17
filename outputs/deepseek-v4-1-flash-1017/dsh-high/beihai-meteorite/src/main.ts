import "./style.css";
import * as THREE from "three";
import {
  CinematicPlayer,
  ThreeStage,
  WebAudioCueBus,
  mountCinematicControls,
  validateVoiceCues,
} from "@agentbench/cinematic-player";
import { buildCast } from "./film/cast";
import { createShop } from "./film/shop";
import { createWorkshop } from "./film/workshop";
import { createBasement } from "./film/basement";
import { createSpace } from "./film/space";
import { createShots } from "./film/shots";
import { hideAll, type FilmContext } from "./film/stage";
import { installSoundDesign } from "./film/audio";
import { soundCues, voiceCues } from "./film/cues";
import { clamp01, smooth01 } from "./film/visual";

const FILM_DURATION = 330;

const app = document.querySelector<HTMLElement>("#app")!;
const stageContainer = document.querySelector<HTMLElement>("#stage")!;
const titleLayer = document.querySelector<HTMLElement>("#titleLayer")!;
const scopeOverlay = document.querySelector<HTMLElement>("#scopeOverlay")!;
const startGate = document.querySelector<HTMLElement>("#startGate")!;
const startButton = document.querySelector<HTMLButtonElement>("#startButton")!;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000003);

const camera = new THREE.PerspectiveCamera(42, 1, 0.04, 2400);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance",
  alpha: false,
});
renderer.setClearColor(0x000000, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute("aria-label", "陨石子弹，程序化三维电影");

const cast = buildCast();
const shop = createShop(cast);
const workshop = createWorkshop(cast);
const basement = createBasement(cast);
const space = createSpace(cast);
scene.add(shop.root, workshop.root, basement.root, space.root);

const context: FilmContext = {
  scene,
  camera,
  renderer,
  cast,
  sets: { shop, workshop, basement, space },
  activeSet: null,
};

hideAll(context);
validateVoiceCues(voiceCues, FILM_DURATION);
const shots = createShots();
const player = new CinematicPlayer<FilmContext>({
  duration: FILM_DURATION,
  context,
  shots,
  cues: [...voiceCues, ...soundCues],
});

const stage = new ThreeStage({
  player,
  renderer: renderer as any,
  scene,
  camera: () => camera,
  container: stageContainer,
  maxPixelRatio: 1.8,
});

const audio = new WebAudioCueBus(player);
installSoundDesign(audio);

const controls = mountCinematicControls({
  player,
  audio,
  container: app,
  showFullscreen: true,
});

interface TitleCard {
  start: number;
  end: number;
  fadeIn: number;
  fadeOut: number;
  key: string;
  html: string;
}

const titleCards: TitleCard[] = [
  {
    start: -1.0,
    end: 9.4,
    fadeIn: 1.8,
    fadeOut: 1.1,
    key: "main",
    html: `<div class="card">
      <p class="kicker">A PROCEDURAL VOXEL FILM</p>
      <h1 class="main-title">陨石子弹<em>METEOR BULLETS</em></h1>
      <p class="sub">改编自 刘慈欣《三体》<br>画面与声音，均由代码在浏览器中生成</p>
    </div>`,
  },
  {
    start: 104.9,
    end: 112.0,
    fadeIn: 0.8,
    fadeOut: 0.5,
    key: "chapter-two",
    html: `<div class="card">
      <span class="chapter-no">ACT II</span>
      <h2 class="chapter">一年后</h2>
      <div class="chapter-rule"></div>
      <p class="location">太空军 · 精密加工研究所</p>
      <p class="location" style="margin-top:0.9rem;opacity:0.62">增援未来计划 · 出发前九十天</p>
    </div>`,
  },
  {
    start: 184.9,
    end: 193.0,
    fadeIn: 0.65,
    fadeOut: 0.45,
    key: "chapter-three",
    html: `<div class="card">
      <span class="chapter-no">ACT III</span>
      <h2 class="chapter">五公里外</h2>
      <div class="chapter-rule"></div>
      <p class="location">地球同步轨道 · 黄河空间站 · 日落前五分钟</p>
    </div>`,
  },
  {
    start: 304.0,
    end: 319.0,
    fadeIn: 1.2,
    fadeOut: 1.0,
    key: "credits",
    html: `<div class="credits">
      <div class="row"><span class="role">原作</span><span class="name">刘慈欣《三体》</span></div>
      <div class="row"><span class="role">改编 · 导演</span><span class="name">程序化体素电影实验</span></div>
      <div class="row"><span class="role">摄影 · 剪辑</span><span class="name">实时三维镜头系统</span></div>
      <div class="row"><span class="role">人物 · 场景</span><span class="name">Voxel Kit / 全程序化几何</span></div>
      <div class="row"><span class="role">声音</span><span class="name">Web Audio 实时合成，无采样素材</span></div>
      <div class="row"><span class="role">字幕 · 待配音文本</span><span class="name">单一结构化语音清单</span></div>
      <div class="final">陨 石 子 弹</div>
    </div>`,
  },
  {
    start: 319.0,
    end: 330.01,
    fadeIn: 0.9,
    fadeOut: 0.0,
    key: "end",
    html: `<div class="card">
      <p class="kicker">METEOR BULLETS</p>
      <h2 class="main-title" style="font-size:clamp(46px,7vw,104px)">陨石子弹<em>全片终</em></h2>
      <p class="sub">他没有回头。<br>身后，是一整个正在醒来的世界。</p>
    </div>`,
  },
];

let activeTitle = "";

function renderTitles(time: number): void {
  const card = titleCards.find((item) => time >= item.start && time < item.end);
  if (!card) {
    if (activeTitle !== "") {
      titleLayer.style.opacity = "0";
      activeTitle = "";
    }
    return;
  }
  const fadeIn = card.fadeIn <= 0 ? 1 : smooth01((time - card.start) / card.fadeIn);
  const fadeOut = card.fadeOut <= 0 ? 1 : 1 - smooth01((time - (card.end - card.fadeOut)) / card.fadeOut);
  const opacity = clamp01(Math.min(fadeIn, fadeOut));
  titleLayer.style.opacity = String(opacity);
  if (activeTitle !== card.key) {
    titleLayer.innerHTML = card.html;
    activeTitle = card.key;
  }
}

function renderSpecialLayers(time: number): void {
  const scopeOn = time >= 228.1 && time < 234.0;
  scopeOverlay.style.opacity = scopeOn ? "1" : "0";
  scopeOverlay.setAttribute("aria-hidden", scopeOn ? "false" : "true");
  renderTitles(time);
}

const detachOverlay = player.addTypedEventListener("frame", ({ detail }) => {
  renderSpecialLayers(detail.time);
});

// A single gesture unlocks the audio graph and starts the picture.
async function startFilm(): Promise<void> {
  startGate.classList.add("hidden");
  await audio.unlock();
  player.play();
}

startButton.addEventListener("click", () => {
  void startFilm();
});

player.addTypedEventListener("statechange", ({ detail }) => {
  if (detail.state === "playing") startGate.classList.add("hidden");
});

// Give the transport its first visible position even while paused.
renderSpecialLayers(player.currentTime);

// Keep the frame correct after a resize or a return from fullscreen.
const refreshOnResize = (): void => {
  stage.resize();
  player.refresh();
};
window.addEventListener("resize", refreshOnResize);
document.addEventListener("fullscreenchange", refreshOnResize);

window.addEventListener("beforeunload", () => {
  detachOverlay();
  controls.destroy();
  audio.destroy();
  stage.destroy(true);
  player.destroy();
});

// A small, useful introduction in the console without affecting playback.
console.info("陨石子弹 · procedural voxel film · 330s");
void startGate;
