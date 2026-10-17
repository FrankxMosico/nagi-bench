import * as THREE from "three";
import {
  applyPose,
  createFigure,
  createSkin,
  voxelMaterial,
  voxelModel,
  voxelSphere,
  type Figure,
  type Pose,
  type SkinPainter,
} from "@agentbench/voxel-kit";

export interface Cast {
  zhang: Figure;
  zhou: Figure;
  chang: Figure;
  zhangWork: Figure;
  zhangSuit: Figure;
  photo: Figure[];
}

const SKIN = "#c78e61";
const SKIN_LIGHT = "#d59b6d";
const SKIN_DARK = "#a96f48";
const HAIR = "#17161a";
const GREY = "#8e8b83";
const EYE = "#141317";

function paintBase(paint: SkinPainter, skin = SKIN): void {
  for (const part of ["head", "torso", "armR", "armL", "legR", "legL"] as const) {
    paint.fill(part, "all", skin);
  }
}

function paintHead(paint: SkinPainter, opts: {
  skin?: string;
  hair?: string;
  hairRows?: number;
  brow?: string;
  eye?: string;
  mouth?: string;
  moustache?: string;
  glasses?: boolean;
  smile?: boolean;
  age?: number;
  scar?: boolean;
}): void {
  const skin = opts.skin ?? SKIN;
  const hair = opts.hair ?? HAIR;
  paint.fill("head", "all", skin);
  paint.fill("head", "top", hair);
  paint.fill("head", "back", hair);

  const hairRows = opts.hairRows ?? 2;
  paint.rect("head", "front", 0, 0, 8, hairRows, hair);
  paint.rect("head", "front", 0, hairRows, 1, 1, hair);
  paint.rect("head", "front", 7, hairRows, 1, 1, hair);
  paint.rect("head", "left", 0, 0, 8, hairRows + 1, hair);
  paint.rect("head", "right", 0, 0, 8, hairRows + 1, hair);

  if (opts.glasses) {
    paint.rect("head", "front", 1, 3, 3, 1, "rgba(28,28,30,0.85)");
    paint.rect("head", "front", 4, 3, 3, 1, "rgba(28,28,30,0.85)");
    paint.px("head", "front", 1, 5, "rgba(28,28,30,0.6)");
    paint.px("head", "front", 6, 5, "rgba(28,28,30,0.6)");
    paint.px("head", "front", 4, 4, "rgba(28,28,30,0.6)");
  }

  paint.px("head", "front", 2, 4, opts.eye ?? EYE);
  paint.px("head", "front", 5, 4, opts.eye ?? EYE);
  paint.px("head", "front", 2, 3, opts.brow ?? hair);
  paint.px("head", "front", 5, 3, opts.brow ?? hair);
  paint.rect("head", "front", 3, 4, 2, 1, "rgba(0,0,0,0.07)");

  if (opts.moustache) paint.rect("head", "front", 2, 6, 4, 1, opts.moustache);
  if (opts.smile) {
    paint.px("head", "front", 3, 7, opts.mouth ?? "#6e3a30");
    paint.px("head", "front", 4, 7, opts.mouth ?? "#6e3a30");
    paint.px("head", "front", 2, 6, "rgba(80,40,30,0.45)");
    paint.px("head", "front", 5, 6, "rgba(80,40,30,0.45)");
  } else {
    paint.rect("head", "front", 3, 7, 2, 1, opts.mouth ?? "#6e3a30");
  }

  if (opts.age && opts.age > 0) {
    for (let i = 0; i < opts.age; i++) {
      paint.px("head", "front", 1 + (i % 2), 6, "rgba(70,45,30,0.3)");
      paint.px("head", "front", 6 - (i % 2), 6, "rgba(70,45,30,0.3)");
    }
  }
  if (opts.scar) {
    paint.px("head", "front", 6, 2, "rgba(215,170,145,0.85)");
    paint.px("head", "front", 6, 3, "rgba(215,170,145,0.6)");
  }
}

function zhangBody(): THREE.Texture {
  return createSkin((paint) => {
    paintBase(paint, SKIN);
    paintHead(paint, { hairRows: 2, brow: "#211c1b", eye: EYE, scar: true, age: 1 });
    paint.rect("head", "front", 0, 1, 1, 1, "#2b2a2c");
    paint.rect("head", "front", 7, 1, 1, 1, "#2b2a2c");
    paint.rect("torso", "front", 3, 2, 2, 1, "rgba(0,0,0,0.05)");
  }).texture;
}

function zhouBody(): THREE.Texture {
  return createSkin((paint) => {
    paintBase(paint, SKIN_LIGHT);
    paintHead(paint, {
      skin: "#c58b5d",
      hair: GREY,
      hairRows: 1,
      brow: "#7f7a70",
      moustache: "#8f8a80",
      smile: true,
      age: 3,
      glasses: true,
    });
    paint.rect("head", "front", 1, 1, 1, 1, "#c9b9a4");
    paint.rect("head", "front", 6, 1, 1, 1, "#c9b9a4");
    paint.rect("head", "front", 0, 2, 8, 1, GREY);
  }).texture;
}

function changBody(): THREE.Texture {
  return createSkin((paint) => {
    paintBase(paint, "#bf8357");
    paintHead(paint, {
      skin: "#bf8357",
      hair: HAIR,
      hairRows: 2,
      brow: "#3a3330",
      age: 2,
    });
    paint.rect("head", "front", 0, 1, 1, 2, GREY);
    paint.rect("head", "front", 7, 1, 1, 2, GREY);
    paint.rect("head", "front", 3, 7, 3, 1, "#59312a");
  }).texture;
}

function photoBody(seed: number, target: boolean): THREE.Texture {
  const faces = [
    { skin: "#c58a5e", hair: "#3a3330", age: 2, smile: false, glasses: false },
    { skin: "#d09a70", hair: "#1f1d22", age: 0, smile: true, glasses: false },
    { skin: "#a9744d", hair: "#55504a", age: 3, smile: false, glasses: true },
    { skin: "#c98f63", hair: "#2f2b2c", age: 1, smile: false, glasses: false },
    { skin: "#d5a078", hair: "#6b5a49", age: 2, smile: true, glasses: false },
    { skin: "#b77e55", hair: "#242124", age: 1, smile: false, glasses: false },
    { skin: "#c18a60", hair: "#4b4740", age: 2, smile: false, glasses: true },
    { skin: "#d39a6e", hair: "#39312d", age: 0, smile: false, glasses: false },
    { skin: "#b58159", hair: "#2e2a2b", age: 3, smile: true, glasses: false },
    { skin: "#c68f65", hair: "#5f554c", age: 1, smile: false, glasses: false },
  ];
  const face = faces[seed % faces.length]!;
  return createSkin((paint) => {
    paintBase(paint, face.skin);
    paintHead(paint, {
      skin: face.skin,
      hair: face.hair,
      hairRows: seed === 1 ? 3 : 2,
      brow: seed === 2 ? "#777269" : "#2a2524",
      moustache: seed === 2 ? "#8c867b" : undefined,
      glasses: face.glasses,
      smile: face.smile,
      age: face.age,
      scar: target && seed === 0,
    });
    // small collar detail on the body, visible beneath the suit opening
    paint.rect("torso", "front", 2, 0, 4, 1, "#8d918c");
  }).texture;
}

function uniformClothes(seed: number, base: string, accent: string, cap: boolean): THREE.Texture {
  return createSkin((paint) => {
    const trim = seed % 2 === 0 ? accent : "#b59a63";
    paint.fill("torso", "all", base);
    paint.fill("armR", "all", base);
    paint.fill("armL", "all", base);
    paint.fill("legR", "all", "#1c252b");
    paint.fill("legL", "all", "#1c252b");
    paint.rect("legR", "front", 0, 10, 4, 2, "#111315");
    paint.rect("legR", "front", 0, 0, 4, 8, "#1c252b");
    paint.rect("legL", "front", 0, 10, 4, 2, "#111315");
    paint.rect("legL", "front", 0, 0, 4, 8, "#1c252b");
    // high collar and front closure
    paint.rect("torso", "front", 0, 0, 8, 1, "#11171b");
    paint.rect("torso", "front", 3, 1, 2, 10, "#172226");
    paint.rect("torso", "front", 2, 1, 1, 9, trim);
    paint.rect("torso", "front", 5, 1, 1, 9, trim);
    paint.rect("torso", "front", 1, 7, 2, 1, trim);
    paint.rect("torso", "front", 5, 7, 2, 1, trim);
    paint.rect("torso", "front", 0, 9, 8, 2, "#10171a");
    paint.rect("torso", "front", 3, 9, 2, 1, "#b8924e");
    // shoulder boards and sleeve cuffs
    paint.rect("armR", "top", 0, 0, 4, 4, base);
    paint.rect("armL", "top", 0, 0, 4, 4, base);
    paint.rect("armR", "front", 0, 9, 4, 2, "#131b1f");
    paint.rect("armL", "front", 0, 9, 4, 2, "#131b1f");
    paint.rect("armR", "front", 1, 1, 2, 1, trim);
    paint.rect("armL", "front", 1, 1, 2, 1, trim);
    if (cap) {
      paint.fill("head", "top", "#19252a");
      paint.rect("head", "front", 0, 0, 8, 2, "#19252a");
      paint.rect("head", "front", 0, 2, 8, 1, "#11181c");
      paint.rect("head", "front", 3, 1, 2, 1, "#b8924e");
      paint.rect("head", "left", 0, 0, 8, 2, "#19252a");
      paint.rect("head", "right", 0, 0, 8, 2, "#19252a");
    }
    paint.grain("torso", "all", 0.045, 3);
  }, { transparent: true }).texture;
}

function zhouClothes(): THREE.Texture {
  return createSkin((paint) => {
    paint.fill("torso", "all", "#5b5345");
    paint.fill("armR", "all", "#5b5345");
    paint.fill("armL", "all", "#5b5345");
    paint.fill("legR", "all", "#373330");
    paint.fill("legL", "all", "#373330");
    paint.rect("torso", "front", 0, 0, 8, 3, "#4a4338");
    paint.rect("torso", "front", 3, 1, 2, 9, "#7a6d57");
    paint.rect("torso", "front", 2, 8, 4, 2, "#6b5f4e");
    paint.rect("torso", "front", 1, 10, 6, 2, "#2b2925");
    paint.rect("legR", "front", 0, 10, 4, 2, "#1c1b19");
    paint.rect("legL", "front", 0, 10, 4, 2, "#1c1b19");
    paint.rect("armR", "front", 0, 9, 4, 3, "#c78e61");
    paint.rect("armL", "front", 0, 9, 4, 3, "#c78e61");
    paint.grain("torso", "all", 0.08, 9);
    paint.grain("armR", "all", 0.07, 10);
    paint.grain("armL", "all", 0.07, 11);
  }, { transparent: true }).texture;
}

function workClothes(): THREE.Texture {
  return createSkin((paint) => {
    const base = "#4e554d";
    paint.fill("torso", "all", base);
    paint.fill("armR", "all", base);
    paint.fill("armL", "all", base);
    paint.fill("legR", "all", "#3c423d");
    paint.fill("legL", "all", "#3c423d");
    paint.rect("torso", "front", 0, 0, 8, 1, "#383d38");
    paint.rect("torso", "front", 3, 0, 2, 10, "#2b302c");
    paint.rect("torso", "front", 1, 7, 6, 1, "#2f3530");
    paint.rect("torso", "front", 1, 8, 2, 1, "#b59a63");
    paint.rect("torso", "front", 5, 8, 2, 1, "#b59a63");
    paint.rect("armR", "front", 0, 5, 4, 1, "#2f3530");
    paint.rect("armL", "front", 0, 5, 4, 1, "#2f3530");
    paint.rect("armR", "front", 0, 10, 4, 2, "#c78e61");
    paint.rect("armL", "front", 0, 10, 4, 2, "#c78e61");
    paint.rect("legR", "front", 0, 10, 4, 2, "#1e211f");
    paint.rect("legL", "front", 0, 10, 4, 2, "#1e211f");
    paint.grain("torso", "all", 0.09, 21);
    paint.grain("legR", "all", 0.08, 22);
    paint.grain("legL", "all", 0.08, 23);
  }, { transparent: true }).texture;
}

function suitClothes(opts: {
  clear: boolean;
  noGlove?: boolean;
  damaged?: boolean;
  accent?: string;
}): THREE.Texture {
  const accent = opts.accent ?? "#b2483b";
  return createSkin((paint) => {
    const white = "#d8d8d0";
    const shade = "#bdbeb6";
    const grey = "#9b9d98";
    paint.fill("torso", "all", white);
    paint.fill("armR", "all", white);
    paint.fill("armL", "all", white);
    paint.fill("legR", "all", white);
    paint.fill("legL", "all", white);
    // torso paneling
    paint.rect("torso", "front", 0, 0, 8, 1, shade);
    paint.rect("torso", "front", 0, 9, 8, 3, shade);
    paint.rect("torso", "front", 1, 4, 6, 1, accent);
    paint.rect("torso", "front", 1, 5, 6, 2, "#b6b8b1");
    paint.rect("torso", "front", 2, 5, 4, 2, "#2a3438");
    paint.rect("torso", "front", 3, 6, 2, 1, "#9bd8c3");
    paint.rect("torso", "front", 1, 2, 2, 1, "#8f928c");
    paint.rect("torso", "front", 5, 2, 2, 1, "#8f928c");
    // arm rings and cuff
    for (const arm of ["armR", "armL"] as const) {
      paint.rect(arm, "front", 0, 4, 4, 1, grey);
      paint.rect(arm, "front", 0, 8, 4, 1, grey);
      if (opts.noGlove && arm === "armR") {
        paint.clear(arm, ["front", "back", "left", "right"]);
        paint.rect(arm, "front", 0, 0, 4, 8, white);
        paint.rect(arm, "front", 0, 8, 4, 1, grey);
        paint.rect(arm, "back", 0, 0, 4, 8, white);
        paint.rect(arm, "left", 0, 0, 4, 8, white);
        paint.rect(arm, "right", 0, 0, 4, 8, white);
      } else {
        paint.rect(arm, "front", 0, 9, 4, 3, "#565c5e");
      }
    }
    // boots and knee seams
    for (const leg of ["legR", "legL"] as const) {
      paint.rect(leg, "front", 0, 9, 4, 3, "#6c716f");
      paint.rect(leg, "front", 0, 8, 4, 1, accent);
      paint.rect(leg, "front", 0, 4, 4, 1, shade);
    }
    // life-support pack is separate geometry; helmet is painted
    paint.fill("head", "top", white);
    paint.rect("head", "back", 0, 0, 8, 8, "#c9cac2");
    paint.rect("head", "left", 0, 0, 8, 8, white);
    paint.rect("head", "right", 0, 0, 8, 8, white);
    if (opts.clear) {
      paint.clear("head", "front");
      paint.rect("head", "front", 0, 0, 8, 1, white);
      paint.rect("head", "front", 0, 7, 8, 1, grey);
      paint.rect("head", "front", 0, 0, 1, 8, white);
      paint.rect("head", "front", 7, 0, 1, 8, white);
      paint.rect("head", "front", 1, 1, 6, 1, "#aeb1ab");
      if (opts.damaged) {
        const cracks = [
          [1, 2], [2, 3], [2, 4], [3, 4], [3, 5], [4, 4], [5, 3], [5, 2], [6, 2], [4, 1], [4, 2],
        ];
        for (const [x, y] of cracks) paint.px("head", "front", x, y, "rgba(232,248,246,0.9)");
        paint.rect("head", "front", 5, 1, 2, 2, "#531d1d");
        paint.px("head", "front", 5, 3, "#7d2222");
        paint.px("head", "front", 6, 3, "#a02a2a");
        paint.rect("torso", "front", 1, 3, 2, 2, "#2a1d1c");
        paint.rect("armR", "front", 1, 6, 2, 1, "#4a1f1f");
      }
    } else {
      paint.fill("head", "front", "#1b353d");
      paint.rect("head", "front", 0, 0, 8, 1, "#9da5a0");
      paint.rect("head", "front", 0, 7, 8, 1, "#6a7170");
      paint.rect("head", "front", 0, 0, 1, 8, "#c9cac2");
      paint.rect("head", "front", 7, 0, 1, 8, "#c9cac2");
      paint.rect("head", "front", 1, 2, 3, 1, "rgba(160,205,215,0.32)");
      paint.rect("head", "front", 2, 3, 2, 1, "rgba(120,170,190,0.2)");
      paint.rect("head", "front", 4, 4, 2, 1, "rgba(80,120,135,0.18)");
      paint.rect("head", "front", 1, 5, 5, 1, "rgba(70,105,120,0.22)");
    }
    paint.grain("torso", "all", 0.025, 31);
    paint.grain("legR", "all", 0.025, 32);
    paint.grain("legL", "all", 0.025, 33);
  }, { transparent: true }).texture;
}

let cache: {
  zhangBody?: THREE.Texture;
  zhouBody?: THREE.Texture;
  changBody?: THREE.Texture;
  photoBodies?: THREE.Texture[];
  zhangUniform?: THREE.Texture;
  changUniform?: THREE.Texture;
  zhouClothes?: THREE.Texture;
  work?: THREE.Texture;
  suitOpaque?: THREE.Texture;
  suitClear?: THREE.Texture;
  suitClearNoGlove?: THREE.Texture;
  damaged?: THREE.Texture[];
} = {};

function getCache() {
  if (!cache.zhangBody) cache.zhangBody = zhangBody();
  if (!cache.zhouBody) cache.zhouBody = zhouBody();
  if (!cache.changBody) cache.changBody = changBody();
  if (!cache.zhangUniform) cache.zhangUniform = uniformClothes(0, "#26363b", "#a8874f", true);
  if (!cache.changUniform) cache.changUniform = uniformClothes(1, "#242c32", "#9e814b", false);
  if (!cache.zhouClothes) cache.zhouClothes = zhouClothes();
  if (!cache.work) cache.work = workClothes();
  if (!cache.suitOpaque) cache.suitOpaque = suitClothes({ clear: false });
  if (!cache.suitClear) cache.suitClear = suitClothes({ clear: true });
  if (!cache.suitClearNoGlove) cache.suitClearNoGlove = suitClothes({ clear: true, noGlove: true });
  if (!cache.photoBodies) cache.photoBodies = Array.from({ length: 10 }, (_, i) => photoBody(i, i < 5));
  if (!cache.damaged) {
    cache.damaged = [
      suitClothes({ clear: true, damaged: true, accent: "#b2483b" }),
      suitClothes({ clear: true, damaged: true, accent: "#3b6fa8" }),
      suitClothes({ clear: true, damaged: true, accent: "#b08b3e" }),
    ];
  }
  return cache;
}

export function createCast(): Cast {
  const c = getCache();
  const zhang = createFigure({ body: c.zhangBody!, clothes: c.zhangUniform!, heightM: 1.82 });
  const zhou = createFigure({ body: c.zhouBody!, clothes: c.zhouClothes!, heightM: 1.72 });
  const chang = createFigure({ body: c.changBody!, clothes: c.changUniform!, heightM: 1.78 });
  const zhangWork = createFigure({ body: c.zhangBody!, clothes: c.work!, heightM: 1.82 });
  const zhangSuit = createFigure({ body: c.zhangBody!, clothes: c.suitClear!, heightM: 1.82 });
  const photo = Array.from({ length: 10 }, (_, i) =>
    createFigure({
      body: c.photoBodies![i]!,
      clothes: c.suitOpaque!,
      heightM: i < 3 ? 1.82 : 1.72 + (i % 3) * 0.045,
    }),
  );
  return { zhang, zhou, chang, zhangWork, zhangSuit, photo };
}

export function getSuitTextures() {
  const c = getCache();
  return {
    opaque: c.suitOpaque!,
    clear: c.suitClear!,
    clearNoGlove: c.suitClearNoGlove!,
    damaged: c.damaged!,
  };
}

/* ------------------------------------------------------------------ props */

export function pistolGeometry(): THREE.BufferGeometry {
  const P = {
    "#": 0x2b3034,
    g: 0x3b342c,
    t: 0x20262a,
    s: 0x4a5358,
  };
  const rows = [
    "....###########",
    "....#....s....#",
    "....#....s....#",
    "....###########",
    "....#..##......",
    "....#.##.......",
    "....###........",
    ".....##........",
    ".....##........",
    ".....##........",
  ];
  const geometry = voxelModel({
    palette: P,
    layers: [rows, rows, rows],
    axis: "x",
    voxel: 0.3,
  });
  return geometry;
}

export function magazineGeometry(): THREE.BufferGeometry {
  const rows = ["..##", "..##", "..##", "..##", "..##", "..##"];
  return voxelModel({
    palette: { "#": 0x3a3f42 },
    layers: [rows, rows],
    axis: "x",
    voxel: 0.26,
  });
}

export function suitPackGeometry(): THREE.BufferGeometry {
  const P = { "#": 0xbfc1b9, d: 0x555c5c, r: 0x8f3f35, w: 0xd8d8d0 };
  const side = [
    "..wwww..",
    ".wwwwww.",
    ".wrrrrw.",
    ".wwwwww.",
    ".wddddw.",
    ".wddddw.",
    ".wwwwww.",
    "..dddd..",
    "...dd...",
  ];
  return voxelModel({ palette: P, layers: [side, side], axis: "x", voxel: 0.42 });
}

export function helmetGloveGeometry(): THREE.BufferGeometry {
  const P = { "#": 0x565c5e, w: 0xd8d8d0 };
  const rows = ["..ww..", ".wwww.", ".w##w.", ".wwww.", "..ww.."];
  return voxelModel({ palette: P, layers: [rows, rows, rows], axis: "x", voxel: 0.34 });
}

export function meteoriteGeometry(radiusVox: number, voxel: number, seed: number): THREE.BufferGeometry {
  const base = new THREE.Color(0x4a4744);
  const bright = new THREE.Color(0x77736c);
  const dark = new THREE.Color(0x2a2928);
  let s = seed >>> 0;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  return voxelSphere(
    radiusVox,
    (x, y, z, d) => {
      const n = Math.sin(x * 2.1 + seed) * Math.cos(y * 2.7 - seed) * Math.sin(z * 1.9 + seed * 0.7);
      if (d > 0.96 && n > 0.1) return null;
      const t = rand();
      const c = base.clone();
      if (t > 0.87) c.copy(bright);
      else if (t < 0.18) c.copy(dark);
      c.offsetHSL(0, 0, n * 0.06 + (rand() - 0.5) * 0.035);
      return c.getHex();
    },
    { voxel },
  );
}

export function makePistol(): THREE.Group {
  const group = new THREE.Group();
  const body = new THREE.Mesh(pistolGeometry(), voxelMaterial());
  body.castShadow = true;
  group.add(body);
  const scope = new THREE.Group();
  const tube = new THREE.Mesh(
    voxelModel({
      palette: { "#": 0x22282c, l: 0x79b6bd },
      layers: [["..####..", ".######.", "##llll##", "##llll##", ".######.", "..####.."], ["..####..", ".######.", "##llll##", "##llll##", ".######.", "..####.."]],
      axis: "x",
      voxel: 0.22,
    }),
    voxelMaterial(),
  );
  scope.add(tube);
  scope.position.set(0, 2.1, 1.7);
  group.add(scope);
  return group;
}

export function makeGloveProp(): THREE.Mesh {
  return new THREE.Mesh(helmetGloveGeometry(), voxelMaterial());
}

export function basePose(t = 0): Pose {
  return {
    hips: [0, 0, 0],
    neck: [0, 0, 0],
    armR: [0, 0, 0.04 + Math.sin(t * 1.2) * 0.01],
    armL: [0, 0, -0.04 - Math.sin(t * 1.2) * 0.01],
    legR: [0, 0, 0],
    legL: [0, 0, 0],
    lift: Math.sin(t * 1.4) * 0.06,
  };
}

export function seatedPose(t: number, activity = 0): Pose {
  return {
    hips: [0.08, 0, 0],
    neck: [0.18 - activity * 0.14 + Math.sin(t * 0.8) * 0.02, 0.06, 0],
    armR: [-0.62 - activity * 0.5, 0.15, 0.2],
    armL: [-0.58 - activity * 0.35, -0.15, -0.2],
    legR: [-1.48, 0, 0.08],
    legL: [-1.48, 0, -0.08],
    lift: -2.6,
  };
}

export function applyStanding(figure: Figure, time: number, lean = 0): void {
  applyPose(figure, {
    ...basePose(time),
    hips: [lean * 0.1, 0, 0],
    neck: [lean * 0.12, Math.sin(time * 0.25) * 0.03, 0],
  });
}

export function aimPose(t: number, pitch = 0): Pose {
  return {
    hips: [0, 0.16, 0],
    neck: [pitch * 0.4, 0.2, 0],
    armR: [-Math.PI / 2 + pitch, 0.02, 0.045 + Math.sin(t * 2.1) * 0.008],
    armL: [-1.06, -0.22, -0.44],
    legR: [0.06, 0, 0.03],
    legL: [-0.04, 0, -0.03],
    lift: 0,
  };
}
