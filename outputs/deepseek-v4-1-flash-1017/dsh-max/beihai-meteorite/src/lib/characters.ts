import * as THREE from "three";
import {
  applyPose,
  createFigure,
  createSkin,
  lerpPose,
  voxelModel,
  voxelMaterial,
  type Figure,
  type FaceName,
  type Pose,
  type Skin,
  type SkinPainter,
} from "@agentbench/voxel-kit";
import { clamp01, lerp, mulberry32, smooth, voxelRock } from "./helpers";

export type Expression = "calm" | "smile" | "stern" | "scream" | "sorrow";
export type VisorState = "sealed" | "clear" | "cracked" | "bloodied";

interface FaceStyle {
  skin: string;
  skinShade: string;
  hair: string;
  brow: string;
  mouth?: string;
  eye?: string;
  glasses?: boolean;
  bald?: boolean;
  female?: boolean;
  moustache?: boolean;
  age?: number;
  expression?: Expression;
  scar?: boolean;
  seed?: number;
}

const EYE_DARK = "#241a16";
const FACE_FACES: FaceName[] = ["front", "back", "left", "right", "top", "bottom"];

function paintFeatures(paint: SkinPainter, style: FaceStyle): void {
  const expression = style.expression ?? "calm";
  const eye = style.eye ?? EYE_DARK;
  const hair = style.hair;
  const skin = style.skin;
  const shade = style.skinShade;

  paint.grain("head", "all", 0.035, style.seed ?? 9);

  // Hair is painted mass, never modelled.
  paint.fill("head", "top", hair);
  paint.fill("head", "back", hair);
  paint.rect("head", "front", 0, 0, 8, 1, hair);
  paint.rect("head", "front", 0, 1, 1, style.bald ? 1 : 2, hair);
  paint.rect("head", "front", 7, 1, 1, style.bald ? 1 : 2, hair);
  paint.rect("head", "left", 0, 0, 8, style.female ? 5 : 2, hair);
  paint.rect("head", "right", 0, 0, 8, style.female ? 5 : 2, hair);

  if (style.bald) {
    paint.rect("head", "front", 2, 0, 4, 1, style.skinShade);
    paint.rect("head", "front", 3, 0, 1, 1, "rgba(255,255,255,.22)");
  }

  if (style.female) {
    paint.rect("head", "front", 0, 2, 1, 3, hair);
    paint.rect("head", "front", 7, 2, 1, 3, hair);
  }

  // Brows.
  paint.rect("head", "front", 1, 2, 2, 1, style.brow);
  paint.rect("head", "front", 5, 2, 2, 1, style.brow);
  if (expression === "stern" || expression === "sorrow") {
    paint.px("head", "front", 3, 2, style.brow);
    paint.px("head", "front", 4, 2, style.brow);
  }
  if (expression === "scream") {
    paint.rect("head", "front", 1, 1, 2, 1, style.brow);
    paint.rect("head", "front", 5, 1, 2, 1, style.brow);
  }

  // Eyes: one white texel with a dark pupil keeps the face legible at scope range.
  paint.rect("head", "front", 1, 3, 2, 1, "#d9d5c9");
  paint.rect("head", "front", 5, 3, 2, 1, "#d9d5c9");
  paint.px("head", "front", expression === "smile" ? 2 : 2, 3, eye);
  paint.px("head", "front", 5, 3, eye);
  paint.px("head", "front", 1, 4, shade);
  paint.px("head", "front", 6, 4, shade);

  if (style.glasses) {
    paint.rect("head", "front", 1, 2, 2, 2, "rgba(181,213,210,.16)");
    paint.rect("head", "front", 5, 2, 2, 2, "rgba(181,213,210,.16)");
    paint.rect("head", "front", 1, 2, 2, 1, "#3d3830");
    paint.rect("head", "front", 5, 2, 2, 1, "#3d3830");
    paint.px("head", "front", 3, 2, "#5d5344");
    paint.px("head", "front", 4, 2, "#5d5344");
    paint.px("head", "front", 0, 3, "#3d3830");
    paint.px("head", "front", 7, 3, "#3d3830");
  }

  // Nose and cheek structure.
  paint.px("head", "front", 4, 4, shade);
  paint.px("head", "front", 4, 5, shade);
  paint.px("head", "front", 1, 5, "rgba(104,62,47,.17)");
  paint.px("head", "front", 6, 5, "rgba(104,62,47,.17)");

  if (style.moustache) {
    paint.rect("head", "front", 2, 5, 4, 1, style.hair);
  }

  // Mouth.
  if (expression === "scream") {
    paint.rect("head", "front", 3, 5, 2, 2, "#2b1713");
    paint.px("head", "front", 3, 6, "#b88b75");
  } else if (expression === "smile") {
    paint.rect("head", "front", 3, 6, 2, 1, style.mouth ?? "#844c40");
    paint.px("head", "front", 2, 5, "rgba(105,62,48,.4)");
    paint.px("head", "front", 5, 5, "rgba(105,62,48,.4)");
  } else if (expression === "sorrow") {
    paint.rect("head", "front", 3, 6, 2, 1, style.mouth ?? "#845147");
    paint.px("head", "front", 2, 7, "rgba(90,52,42,.3)");
  } else if (expression === "stern") {
    paint.rect("head", "front", 2, 6, 4, 1, style.mouth ?? "#75463c");
    paint.px("head", "front", 3, 6, "#5e362f");
  } else {
    paint.rect("head", "front", 3, 6, 2, 1, style.mouth ?? "#8a5548");
  }

  if (style.age && style.age > 0) {
    paint.px("head", "front", 1, 4, "rgba(107,74,60,.28)");
    paint.px("head", "front", 6, 4, "rgba(107,74,60,.28)");
    paint.px("head", "front", 2, 1, "rgba(87,67,56,.28)");
  }
  if (style.scar) {
    paint.rect("head", "front", 6, 1, 1, 3, "rgba(99,55,45,.45)");
  }
}

function makeBodySkin(style: FaceStyle): { skin: Skin; texture: THREE.CanvasTexture } {
  const skin = createSkin((paint) => {
    paint.fill("head", "all", style.skin);
    paint.fill("torso", "all", style.skin);
    paint.fill("armR", "all", style.skin);
    paint.fill("armL", "all", style.skin);
    paint.fill("legR", "all", style.skin);
    paint.fill("legL", "all", style.skin);
    paintFeatures(paint, style);
  });
  return { skin, texture: skin.texture };
}

function clearLowerArm(paint: SkinPainter, which: "armR" | "armL" = "armR"): void {
  const width = 4;
  for (const face of FACE_FACES) {
    paint.erase(which, face, 0, 10, width, 2);
  }
  paint.rect(which, "front", 0, 9, width, 1, "#d4d6ce");
  paint.rect(which, "back", 0, 9, width, 1, "#aeb5b1");
  paint.rect(which, "left", 0, 9, 4, 1, "#c9ccc4");
  paint.rect(which, "right", 0, 9, 4, 1, "#bfc5c0");
}

function paintUniformBody(
  paint: SkinPainter,
  options: { jacket: string; jacketDark: string; collar: string; trousers: string; insignia?: string },
): void {
  const { jacket, jacketDark, collar, trousers } = options;
  paint.fill("torso", "all", jacket);
  paint.fill("armR", "all", jacket);
  paint.fill("armL", "all", jacket);
  paint.fill("legR", "all", trousers);
  paint.fill("legL", "all", trousers);
  paint.grain("torso", "all", 0.055, 21);
  paint.grain("armR", "all", 0.04, 26);
  paint.grain("armL", "all", 0.04, 22);
  paint.grain("legR", "all", 0.055, 31);
  paint.grain("legL", "all", 0.055, 34);

  // Jacket folds and seams.
  paint.rect("torso", "front", 0, 9, 8, 3, jacketDark);
  paint.rect("torso", "front", 3, 9, 2, 1, "#b99656");
  paint.rect("torso", "front", 3, 1, 2, 1, collar);
  paint.rect("torso", "front", 0, 0, 8, 1, jacketDark);
  paint.rect("torso", "front", 1, 0, 1, 2, collar);
  paint.rect("torso", "front", 6, 0, 1, 2, collar);
  paint.rect("torso", "front", 1, 3, 2, 2, "rgba(0,0,0,.11)");
  paint.rect("torso", "front", 5, 3, 2, 2, "rgba(0,0,0,.11)");
  paint.rect("torso", "front", 3, 1, 1, 6, "rgba(228,204,155,.6)");
  paint.rect("torso", "front", 3, 10, 2, 1, "#171b1c");
  if (options.insignia) {
    paint.rect("torso", "front", 1, 2, 1, 1, options.insignia);
    paint.rect("torso", "right", 0, 2, 4, 1, options.insignia);
  }
  paint.rect("torso", "back", 0, 6, 8, 1, "rgba(0,0,0,.15)");

  // Sleeves and cuff rings.
  for (const arm of ["armR", "armL"] as const) {
    paint.rect(arm, "front", 0, 8, 4, 1, jacketDark);
    paint.rect(arm, "back", 0, 8, 4, 1, jacketDark);
    paint.rect(arm, "left", 0, 8, 4, 1, jacketDark);
    paint.rect(arm, "right", 0, 8, 4, 1, jacketDark);
    paint.rect(arm, "front", 0, 2, 1, 1, collar);
    paint.rect(arm, "back", 0, 2, 1, 1, collar);
    clearLowerArm(paint, arm);
  }

  for (const leg of ["legR", "legL"] as const) {
    paint.rect(leg, "front", 1, 0, 1, 9, "rgba(0,0,0,.13)");
    paint.rect(leg, "front", 0, 10, 4, 2, "#131719");
    paint.rect(leg, "left", 0, 10, 4, 2, "#191d1f");
    paint.rect(leg, "right", 0, 10, 4, 2, "#101416");
    paint.rect(leg, "front", 0, 10, 4, 1, "rgba(207,196,169,.12)");
  }
}

function paintCardigan(paint: SkinPainter): void {
  const cardigan = "#6b5840";
  const cardiganDark = "#4a3b2b";
  paint.fill("torso", "all", "#d0c2aa");
  paint.fill("armR", "all", cardigan);
  paint.fill("armL", "all", cardigan);
  paint.fill("legR", "all", "#3d3a33");
  paint.fill("legL", "all", "#3d3a33");
  paint.grain("torso", "all", 0.09, 54);
  paint.grain("armR", "all", 0.06, 57);
  paint.grain("armL", "all", 0.06, 53);
  paint.grain("legR", "all", 0.08, 62);
  paint.grain("legL", "all", 0.08, 66);

  // An open, lived-in cardigan over a pale shirt.
  paint.rect("torso", "front", 0, 0, 2, 9, cardigan);
  paint.rect("torso", "front", 6, 0, 2, 9, cardigan);
  paint.rect("torso", "front", 2, 0, 4, 9, "#cbbda5");
  paint.rect("torso", "front", 3, 0, 1, 2, "#9f927e");
  paint.rect("torso", "front", 3, 2, 1, 1, "#58493a");
  paint.rect("torso", "front", 3, 5, 1, 1, "#58493a");
  paint.rect("torso", "front", 3, 8, 1, 1, "#58493a");
  paint.rect("torso", "front", 0, 9, 8, 3, "#3a3932");
  paint.rect("torso", "front", 3, 10, 2, 1, "#77674a");
  paint.rect("torso", "front", 0, 2, 1, 6, "rgba(255,235,199,.07)");
  paint.rect("torso", "front", 7, 2, 1, 6, "rgba(255,235,199,.07)");
  paint.rect("torso", "front", 0, 0, 8, 1, cardiganDark);

  for (const arm of ["armR", "armL"] as const) {
    paint.rect(arm, "front", 0, 8, 4, 2, cardiganDark);
    paint.rect(arm, "back", 0, 8, 4, 2, cardiganDark);
    paint.rect(arm, "left", 0, 8, 4, 2, cardiganDark);
    paint.rect(arm, "right", 0, 8, 4, 2, cardiganDark);
    clearLowerArm(paint, arm);
  }
  for (const leg of ["legR", "legL"] as const) {
    paint.rect(leg, "front", 1, 0, 1, 9, "rgba(0,0,0,.16)");
    paint.rect(leg, "front", 0, 10, 4, 2, "#201d19");
    paint.rect(leg, "left", 0, 10, 4, 2, "#25221c");
    paint.rect(leg, "right", 0, 10, 4, 2, "#191612");
  }
}

function drawCrackLines(ctx: CanvasRenderingContext2D, seed: number, blood: boolean): void {
  const rng = mulberry32(seed);
  // Clothing sheet head front rect is 8,8 at 8,8 in the 64x64 body sheet.
  ctx.save();
  ctx.beginPath();
  ctx.rect(9, 9, 6, 6);
  ctx.clip();
  ctx.strokeStyle = "rgba(217,237,235,.92)";
  ctx.lineWidth = 0.55;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    let x = 8 + rng() * 8;
    let y = 8 + rng() * 8;
    ctx.moveTo(x, y);
    for (let k = 0; k < 3; k++) {
      x += (rng() - 0.5) * 3.5;
      y += (rng() - 0.5) * 3.2;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  if (blood) {
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(${112 + (rng() * 30) | 0},${18 + (rng() * 20) | 0},${16 + (rng() * 18) | 0},${0.35 + rng() * 0.65})`;
      ctx.fillRect(8 + rng() * 8, 8 + rng() * 8, 0.6 + rng() * 1.4, 0.6 + rng() * 1.3);
    }
  }
  ctx.restore();
}

interface SuitOptions {
  accent: string;
  accentDark: string;
  visor: VisorState;
  gloveOff?: boolean;
  commander?: boolean;
  seed?: number;
}

function makeSuitSkin(options: SuitOptions): Skin {
  return createSkin(
    (paint) => {
      const white = "#d8dcd9";
      const whiteWarm = "#c7cdca";
      const dark = "#333d40";
      const accent = options.accent;
      paint.fill("torso", "all", white);
      paint.fill("armR", "all", white);
      paint.fill("armL", "all", white);
      paint.fill("legR", "all", whiteWarm);
      paint.fill("legL", "all", whiteWarm);
      paint.fill("head", "all", "#e2e4de");
      paint.grain("torso", "all", 0.04, options.seed ?? 2);
      paint.grain("armR", "all", 0.04, 3);
      paint.grain("armL", "all", 0.04, 4);
      paint.grain("legR", "all", 0.045, 5);
      paint.grain("legL", "all", 0.045, 6);

      // Padded torso, chest harness and mission patch.
      paint.rect("torso", "front", 0, 2, 8, 1, accent);
      paint.rect("torso", "front", 0, 8, 8, 1, options.accentDark);
      paint.rect("torso", "front", 1, 3, 1, 5, dark);
      paint.rect("torso", "front", 6, 3, 1, 5, dark);
      paint.rect("torso", "front", 3, 3, 2, 2, "#66797b");
      paint.rect("torso", "front", 3, 4, 1, 1, "#a04437");
      paint.rect("torso", "front", 2, 9, 4, 2, "#b3b9b4");
      paint.rect("torso", "front", 3, 10, 1, 1, accent);
      // Flag patch (painted, deliberately tiny).
      paint.rect("torso", "front", 0, 3, 1, 1, "#a32f27");
      paint.px("torso", "front", 0, 4, "#d5b65e");
      paint.rect("torso", "front", 5, 6, 2, 1, "rgba(255,255,255,.35)");
      paint.rect("torso", "back", 0, 0, 8, 2, "#b2b9b6");
      paint.rect("torso", "back", 3, 2, 2, 7, "#6f7b7e");

      // Arms: rings, elbow pads, gloves or bare hand.
      for (const arm of ["armR", "armL"] as const) {
        paint.rect(arm, "front", 0, 2, 4, 1, accent);
        paint.rect(arm, "back", 0, 2, 4, 1, accent);
        paint.rect(arm, "left", 0, 2, 4, 1, options.accentDark);
        paint.rect(arm, "right", 0, 2, 4, 1, options.accentDark);
        paint.rect(arm, "front", 0, 6, 4, 1, "#9fa9a6");
        paint.rect(arm, "front", 0, 10, 4, 2, options.gloveOff && arm === "armR" ? "#d6a281" : "#a7b0ac");
        paint.rect(arm, "back", 0, 10, 4, 2, options.gloveOff && arm === "armR" ? "#c69576" : "#949e9a");
        paint.rect(arm, "left", 0, 10, 4, 2, options.gloveOff && arm === "armR" ? "#c49175" : "#b4bab5");
        paint.rect(arm, "right", 0, 10, 4, 2, options.gloveOff && arm === "armR" ? "#ba8a70" : "#bcc1bd");
      }
      if (options.gloveOff) {
        clearLowerArm(paint, "armR");
      }

      for (const leg of ["legR", "legL"] as const) {
        paint.rect(leg, "front", 1, 0, 1, 7, "rgba(0,0,0,.13)");
        paint.rect(leg, "front", 0, 6, 4, 1, accent);
        paint.rect(leg, "front", 0, 10, 4, 2, "#5a5e58");
        paint.rect(leg, "left", 0, 10, 4, 2, "#4e524e");
        paint.rect(leg, "right", 0, 10, 4, 2, "#4e524e");
        paint.rect(leg, "top", 0, 0, 4, 4, options.accentDark);
      }

      // Helmet shell and visor treatment, all texels.
      paint.rect("head", "left", 0, 0, 8, 8, "#dfe3de");
      paint.rect("head", "right", 0, 0, 8, 8, "#d6dcd9");
      paint.rect("head", "top", 0, 0, 8, 8, "#e6e8e2");
      paint.rect("head", "back", 0, 0, 8, 8, "#cdd4d2");
      paint.rect("head", "bottom", 0, 0, 8, 8, "#6e7776");
      paint.rect("head", "left", 0, 1, 8, 1, accent);
      paint.rect("head", "right", 0, 1, 8, 1, accent);
      paint.rect("head", "back", 0, 1, 8, 1, accent);

      if (options.visor === "sealed") {
        paint.rect("head", "front", 0, 0, 8, 8, "#e2e3da");
        paint.rect("head", "front", 1, 1, 6, 5, "#263639");
        paint.rect("head", "front", 1, 1, 6, 2, "#6c6857");
        paint.rect("head", "front", 2, 2, 2, 1, "#baa06a");
        paint.rect("head", "front", 1, 5, 6, 1, "#493c2a");
        paint.rect("head", "front", 0, 6, 8, 1, "#b8bdb6");
        paint.rect("head", "front", 3, 7, 2, 1, "#4f5653");
      } else {
        paint.rect("head", "front", 0, 0, 8, 8, "#e2e3da");
        paint.erase("head", "front", 1, 1, 6, 6);
        paint.rect("head", "front", 0, 0, 8, 1, "#d1d7d3");
        paint.rect("head", "front", 0, 0, 1, 8, accent);
        paint.rect("head", "front", 7, 0, 1, 8, accent);
        paint.rect("head", "front", 1, 7, 6, 1, "#b9bfb9");
        paint.rect("head", "front", 1, 1, 6, 1, "rgba(227,246,246,.22)");
        if (options.visor !== "clear") {
          // Cracks are opaque texels drawn over the transparent visor.
          const textureCanvas = paint.ctx.canvas;
          const ctx = textureCanvas.getContext("2d");
          if (ctx) drawCrackLines(ctx, 2301 + (options.seed ?? 0), options.visor === "bloodied");
        }
        paint.rect("head", "front", 0, 7, 4, 1, options.accentDark);
      }
    },
    { transparent: true },
  );
}

export interface Actor {
  figure: Figure;
  body: THREE.Texture;
  heldMeteorite: THREE.Object3D | null;
}

export interface ZhangActor {
  figure: Figure;
  uniform: THREE.Texture;
  suitSealed: THREE.Texture;
  suitClear: THREE.Texture;
  suitBare: THREE.Texture;
  setUniform(): void;
  setSuit(state: "sealed" | "clear" | "bare"): void;
  pose: (pose: Pose) => void;
}

export interface CollectorActor {
  figure: Figure;
  uniform: THREE.Texture;
  neutral: THREE.Texture;
  smile: THREE.Texture;
  setSmile(value: boolean): void;
}

export interface AstronautActor {
  figure: Figure;
  clearSuit: THREE.Texture;
  sealedSuit: THREE.Texture;
  crackedSuit: THREE.Texture;
  bloodiedSuit: THREE.Texture;
  setVisor(state: "clear" | "sealed" | "cracked" | "bloodied"): void;
  setScream(value: boolean): void;
}

const sharedPistol = { geometry: null as THREE.BufferGeometry | null };
const sharedBackpack = { geometry: null as THREE.BufferGeometry | null, material: null as THREE.Material | null };
const sharedScope = { geometry: null as THREE.BufferGeometry | null };
const sharedFlash = { texture: null as THREE.Texture | null };

export interface PistolRig {
  root: THREE.Group;
  scope: THREE.Group;
  flash: THREE.Sprite;
  muzzle: THREE.Object3D;
  setFlash(amount: number): void;
}

function makePistolGeometry(): THREE.BufferGeometry {
  if (sharedPistol.geometry) return sharedPistol.geometry;
  const g = voxelModel({
    palette: {
      "#": 0x20262a,
      h: 0x505b60,
      g: 0x3d322a,
      a: 0x9e6c3e,
      l: 0xb9b09a,
    },
    layers: [
      [
        ".............",
        ".....#######.",
        "....##hhhhhh#",
        "....########.",
        "....##.......",
        "...##gg......",
        "..##ggg......",
        "..##gg.......",
        "..##.........",
      ],
      [
        ".............",
        "....#########",
        "....#hhhhhhh#",
        "....#########",
        "....##.......",
        "...##gg......",
        "..##ggg......",
        "..##gg.......",
        "..##.........",
      ],
      [
        ".............",
        ".....#######.",
        "....##hhhhhh#",
        "....########.",
        "....##.......",
        "...##gg......",
        "..##ggg......",
        "..##gg.......",
        "..##.........",
      ],
    ],
    axis: "x",
    voxel: 0.34,
  });
  sharedPistol.geometry = g;
  return g;
}

function makeScopeGeometry(): THREE.BufferGeometry {
  if (sharedScope.geometry) return sharedScope.geometry;
  const g = voxelModel({
    palette: {
      "#": 0x252b2d,
      l: 0x6a8f94,
      o: 0x9a6b3f,
    },
    layers: [
      ["####", "#ll#", "####"],
      ["####", "#ll#", "####"],
    ],
    axis: "x",
    voxel: 0.34,
  });
  sharedScope.geometry = g;
  return g;
}

export function createPistolRig(showScope = false): PistolRig {
  const root = new THREE.Group();
  const material = voxelMaterial({ metalness: 0.55, roughness: 0.4 });
  const body = new THREE.Mesh(makePistolGeometry(), material);
  body.position.set(0, -0.1, 1.4);
  body.castShadow = true;
  root.add(body);

  const scope = new THREE.Group();
  const scopeMesh = new THREE.Mesh(
    makeScopeGeometry(),
    voxelMaterial({ metalness: 0.7, roughness: 0.28 }),
  );
  scopeMesh.position.set(0, 0.62, 1.6);
  scope.add(scopeMesh);
  scope.visible = showScope;
  root.add(scope);

  if (!sharedFlash.texture) {
    const c = document.createElement("canvas");
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
    grad.addColorStop(0, "rgba(255,247,218,1)");
    grad.addColorStop(0.2, "rgba(255,201,94,.9)");
    grad.addColorStop(0.55, "rgba(255,125,38,.35)");
    grad.addColorStop(1, "rgba(255,100,30,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    sharedFlash.texture = new THREE.CanvasTexture(c);
    sharedFlash.texture.colorSpace = THREE.SRGBColorSpace;
  }
  const flashMaterial = new THREE.SpriteMaterial({
    map: sharedFlash.texture,
    color: 0xffd59a,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const flash = new THREE.Sprite(flashMaterial);
  flash.position.set(0, 0, 3.65);
  flash.scale.setScalar(1.1);
  root.add(flash);

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0, 3.7);
  root.add(muzzle);

  return {
    root,
    scope,
    flash,
    muzzle,
    setFlash(amount: number) {
      flashMaterial.opacity = clamp01(amount);
      flash.scale.setScalar(2.2 + clamp01(amount) * 4.2);
    },
  };
}

export function createBackpack(): THREE.Group {
  if (!sharedBackpack.geometry) {
    sharedBackpack.geometry = voxelModel({
      palette: {
        W: 0xc7cdc9,
        w: 0xaab2ae,
        d: 0x465154,
        o: 0xb87837,
        l: 0xe9b574,
      },
      layers: [
        [
          "WWWWWW",
          "WooooW",
          "WWWWWW",
          "WwwwwW",
          "WwddwW",
          "WwwwwW",
          "WWWWWW",
        ],
        [
          "WWWWWW",
          "WooooW",
          "WwWWwW",
          "WwWWwW",
          "WwddwW",
          "WwwwwW",
          "WWllWW",
        ],
      ],
      axis: "z",
      voxel: 1,
    });
    sharedBackpack.material = voxelMaterial({ roughness: 0.8, metalness: 0.15 });
  }
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(sharedBackpack.geometry!, sharedBackpack.material!);
  mesh.position.set(0, 0, -1.2);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  group.add(mesh);

  // A short antenna and a service lamp are gear, not facial geometry.
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0x596264, metalness: 0.6, roughness: 0.45 });
  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 0.45), antennaMat);
  antenna.position.set(-2.2, 3.6, -1.5);
  group.add(antenna);
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xe6b071, toneMapped: false });
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.55, 0.55), lampMat);
  lamp.position.set(0, 1.2, -2.4);
  group.add(lamp);
  return group;
}

export function createZhang(): ZhangActor {
  const body = makeBodySkin({
    skin: "#c9936d",
    skinShade: "#9e694f",
    hair: "#181b1d",
    brow: "#1b1d1c",
    expression: "calm",
    age: 1,
    seed: 40,
  });

  const uniformSkin = createSkin(
    (paint) => {
      paintUniformBody(paint, {
        jacket: "#23343a",
        jacketDark: "#141f23",
        collar: "#954c3e",
        trousers: "#1d282b",
        insignia: "#cdaa65",
      });
    },
    { transparent: true },
  );

  const suitSealed = makeSuitSkin({
    accent: "#d59652",
    accentDark: "#92653a",
    visor: "sealed",
    commander: true,
    seed: 71,
  });
  const suitClear = makeSuitSkin({
    accent: "#d59652",
    accentDark: "#92653a",
    visor: "clear",
    commander: true,
    seed: 71,
  });
  const suitBare = makeSuitSkin({
    accent: "#d59652",
    accentDark: "#92653a",
    visor: "clear",
    gloveOff: true,
    commander: true,
    seed: 71,
  });

  const figure = createFigure({
    body: body.texture,
    clothes: uniformSkin.texture,
    heightM: 1.78,
    castShadow: true,
  });

  const actor: ZhangActor = {
    figure,
    uniform: uniformSkin.texture,
    suitSealed: suitSealed.texture,
    suitClear: suitClear.texture,
    suitBare: suitBare.texture,
    setUniform() {
      figure.setClothes(uniformSkin.texture);
    },
    setSuit(state) {
      figure.setClothes(state === "sealed" ? suitSealed.texture : state === "bare" ? suitBare.texture : suitClear.texture);
    },
    pose(pose) {
      applyPose(figure, pose);
    },
  };
  return actor;
}

export function createCollector(): CollectorActor {
  const neutral = makeBodySkin({
    skin: "#c79a75",
    skinShade: "#9d7159",
    hair: "#827f76",
    brow: "#6f6c63",
    glasses: true,
    moustache: false,
    expression: "calm",
    age: 2,
    seed: 21,
  });
  const smile = makeBodySkin({
    skin: "#c79a75",
    skinShade: "#9d7159",
    hair: "#827f76",
    brow: "#6f6c63",
    glasses: true,
    expression: "smile",
    age: 2,
    seed: 21,
  });

  const cardigan = createSkin(
    (paint) => {
      paintCardigan(paint);
    },
    { transparent: true },
  );

  const figure = createFigure({
    body: neutral.texture,
    clothes: cardigan.texture,
    heightM: 1.73,
    castShadow: true,
  });

  return {
    figure,
    uniform: cardigan.texture,
    neutral: neutral.texture,
    smile: smile.texture,
    setSmile(value: boolean) {
      figure.setBody(value ? smile.texture : neutral.texture);
    },
  };
}

interface AstronautSpec {
  skin: string;
  skinShade: string;
  hair: string;
  brow: string;
  female?: boolean;
  bald?: boolean;
  moustache?: boolean;
  glasses?: boolean;
  age?: number;
  accent: string;
  accentDark: string;
  seed: number;
  commander?: boolean;
}

export function createAstronaut(spec: AstronautSpec): AstronautActor {
  const calm = makeBodySkin({
    skin: spec.skin,
    skinShade: spec.skinShade,
    hair: spec.hair,
    brow: spec.brow,
    female: spec.female,
    bald: spec.bald,
    moustache: spec.moustache,
    glasses: spec.glasses,
    age: spec.age,
    expression: "stern",
    seed: spec.seed,
  });
  const scream = makeBodySkin({
    skin: spec.skin,
    skinShade: spec.skinShade,
    hair: spec.hair,
    brow: spec.brow,
    female: spec.female,
    bald: spec.bald,
    moustache: spec.moustache,
    glasses: spec.glasses,
    age: spec.age,
    expression: "scream",
    seed: spec.seed,
  });

  const sealed = makeSuitSkin({
    accent: spec.accent,
    accentDark: spec.accentDark,
    visor: "sealed",
    commander: spec.commander,
    seed: spec.seed,
  });
  const clear = makeSuitSkin({
    accent: spec.accent,
    accentDark: spec.accentDark,
    visor: "clear",
    commander: spec.commander,
    seed: spec.seed,
  });
  const cracked = makeSuitSkin({
    accent: spec.accent,
    accentDark: spec.accentDark,
    visor: "cracked",
    commander: spec.commander,
    seed: spec.seed,
  });
  const bloodied = makeSuitSkin({
    accent: spec.accent,
    accentDark: spec.accentDark,
    visor: "bloodied",
    commander: spec.commander,
    seed: spec.seed,
  });

  const figure = createFigure({
    body: calm.texture,
    clothes: sealed.texture,
    heightM: 1.72 + (spec.seed % 13) * 0.009,
    castShadow: false,
  });
  const pack = createBackpack();
  figure.anchors.back.add(pack);

  return {
    figure,
    clearSuit: clear.texture,
    sealedSuit: sealed.texture,
    crackedSuit: cracked.texture,
    bloodiedSuit: bloodied.texture,
    setVisor(state) {
      figure.setClothes(
        state === "sealed"
          ? sealed.texture
          : state === "cracked"
            ? cracked.texture
            : state === "bloodied"
              ? bloodied.texture
              : clear.texture,
      );
    },
    setScream(value) {
      figure.setBody(value ? scream.texture : calm.texture);
    },
  };
}

export function createCrowdAstronaut(seed: number, accent = "#8a9e9b"): AstronautActor {
  const tones = ["#c99b77", "#c38967", "#d7a887", "#b67d63", "#d0a080"];
  const hairs = ["#171b1c", "#2b2521", "#4a4038", "#777267"];
  return createAstronaut({
    skin: tones[seed % tones.length]!,
    skinShade: "#93684f",
    hair: hairs[seed % hairs.length]!,
    brow: "#442f26",
    female: seed % 4 === 0,
    bald: seed % 7 === 0,
    moustache: seed % 5 === 0,
    glasses: seed % 6 === 0,
    age: 1,
    accent,
    accentDark: "#5f7472",
    seed: seed + 80,
  });
}

export const TARGET_SPECS: AstronautSpec[] = [
  {
    skin: "#c18a66",
    skinShade: "#8d5f49",
    hair: "#b7b5ac",
    brow: "#887d6f",
    age: 3,
    accent: "#bd5039",
    accentDark: "#743528",
    seed: 101,
    commander: true,
  },
  {
    skin: "#d3a482",
    skinShade: "#a3745b",
    hair: "#8c8c88",
    brow: "#716b63",
    female: true,
    glasses: true,
    age: 2,
    accent: "#6d9ca5",
    accentDark: "#466b73",
    seed: 202,
    commander: true,
  },
  {
    skin: "#c68f6c",
    skinShade: "#96664f",
    hair: "#5d574f",
    brow: "#514b43",
    bald: true,
    moustache: true,
    age: 3,
    accent: "#c8a15c",
    accentDark: "#796238",
    seed: 303,
    commander: true,
  },
];

export function createTarget(index: number): AstronautActor {
  return createAstronaut(TARGET_SPECS[index % TARGET_SPECS.length]!);
}

export function addHeldProps(figure: Figure, options: { backpack?: boolean; pistol?: boolean }): void {
  if (options.backpack) {
    figure.anchors.back.add(createBackpack());
  }
  if (options.pistol) {
    const pistol = createPistolRig(true);
    figure.anchors.handR.add(pistol.root);
  }
}

/** Explicit performance: weight, reach and breath layered over the kit's neutral idle. */
export function seatedCollectorPose(time: number, inspect = false, warm = 0): Pose {
  const breath = Math.sin(time * 1.4);
  const base: Pose = {
    hips: [-0.06, 0.02, 0],
    neck: [inspect ? 0.34 : 0.12 + breath * 0.01, 0.16, -0.03],
    armR: [inspect ? -0.42 : -0.82 + breath * 0.018, 0.18, 0.34],
    armL: [inspect ? -0.5 : -0.9 - breath * 0.018, -0.24, -0.4],
    legR: [-1.25, 0.02, 0.1],
    legL: [-1.2, -0.03, -0.12],
    lift: -0.2 + breath * 0.04,
  };
  if (warm > 0) {
    base.armR = [
      base.armR![0] + warm * 0.15,
      base.armR![1] - warm * 0.1,
      base.armR![2] + warm * 0.2,
    ];
  }
  return base;
}

export function standingAtRest(time: number): Pose {
  const breath = Math.sin(time * 1.15);
  return {
    hips: [0, 0, 0],
    neck: [-0.02 + breath * 0.01, 0.06, 0],
    armR: [0.02 + breath * 0.02, 0.02, -0.075],
    armL: [-0.02 - breath * 0.02, -0.02, 0.065],
    legR: [0, 0, 0.015],
    legL: [0, 0, -0.015],
    lift: breath * 0.03,
  };
}

export function gesturePose(time: number, phase = 0): Pose {
  const base = standingAtRest(time);
  const ease = smooth(clamp01(Math.sin(time * 0.6 + phase) * 0.5 + 0.5));
  base.armR = [lerp(-0.1, -0.35, ease), lerp(0.02, 0.18, ease), -0.12];
  return base;
}

export function workbenchPose(time: number, reach = 0.55): Pose {
  const breath = Math.sin(time * 1.25) * 0.01;
  return {
    hips: [-0.025, 0, 0],
    neck: [0.22, 0, 0],
    armR: [-0.76 + breath, 0.04, 0.18],
    armL: [-0.8 - breath, -0.05, -0.14],
    legR: [0.015, 0, 0.015],
    legL: [-0.015, 0, -0.015],
    lift: breath * 0.2,
  };
}

export function aimPose(time: number, recoil = 0, pitch = 0, yaw = 0): Pose {
  const sway = Math.sin(time * 0.9) * 0.008;
  return {
    hips: [0.025, yaw * 0.3, 0],
    neck: [pitch * 0.4 + 0.08, yaw * 0.25, 0],
    armR: [-Math.PI / 2 + pitch + recoil * 0.08 + sway, yaw * 0.2, 0.045],
    armL: [-0.5 + recoil * 0.06, 0.36, -0.55],
    legR: [-0.08, 0, 0.04],
    legL: [0.1, 0, -0.04],
    lift: -0.02 + sway,
  };
}

export function floatingWorkPose(time: number, poseTarget?: Pose, amount = 1): Pose {
  const base: Pose = {
    hips: [-0.16 + Math.sin(time * 0.33) * 0.03, Math.sin(time * 0.23) * 0.08, Math.cos(time * 0.21) * 0.03],
    neck: [0.06 + Math.sin(time * 0.4) * 0.02, Math.sin(time * 0.27) * 0.08, 0],
    armR: [-0.52 + Math.sin(time * 0.31) * 0.06, 0.08, 0.25],
    armL: [-0.35 + Math.sin(time * 0.38 + 1.4) * 0.06, -0.12, -0.3],
    legR: [-0.42 + Math.sin(time * 0.29) * 0.08, 0.1, 0.12],
    legL: [-0.22 + Math.sin(time * 0.26 + 2) * 0.08, -0.08, -0.1],
    lift: 1.2 + Math.sin(time * 0.25) * 0.2,
  };
  return poseTarget ? lerpPose(base, poseTarget, clamp01(amount)) : base;
}

export function createMeteoriteMesh(size: number, seed = 1, bright = false): THREE.Mesh {
  const r = Math.max(2, Math.round(size));
  const base = new THREE.Color(bright ? 0x8c8172 : 0x4a4640);
  const mesh = voxelRock({
    radius: r,
    voxel: 0.0095,
    seed,
    irregularity: 0.28,
    metalness: 0.42,
    roughness: 0.56,
    color(x, y, z, ratio) {
      const edge = ratio > 0.83;
      const n = ((x * 13 + y * 7 + z * 17 + seed * 5) % 9) / 9;
      const c = base.clone();
      if (edge) c.offsetHSL(-0.015, 0.02, 0.1 + n * 0.08);
      else c.offsetHSL(0, 0, (n - 0.45) * 0.14);
      return c.getHex();
    },
  });
  return mesh;
}

export const PROP_DIMENSIONS = { figureHeight: 1.8 };
