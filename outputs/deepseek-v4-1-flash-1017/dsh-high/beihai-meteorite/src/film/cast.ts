import * as THREE from "three";
import {
  applyPose,
  createFigure,
  createSkin,
  idle,
  lerpPose,
  type Figure,
  type Pose,
  type Skin,
  type SkinPainter,
} from "@agentbench/voxel-kit";

const SKIN = {
  zhang: "#b98563",
  zhangShade: "#9a6b4d",
  collector: "#c78f68",
  collectorShade: "#a77554",
  crew0: "#a97757",
  crew1: "#c08a67",
  crew2: "#8f644c",
};

const HAIR = {
  black: "#1a1918",
  blackLight: "#2b2926",
  grey: "#aaa9a1",
  greyDark: "#7c7b74",
  brown: "#35271d",
};

function faceBase(paint: SkinPainter, skin: string, shade: string, hair: string, hairLight: string): void {
  paint.fill("head", "all", skin);
  paint.fill("head", ["top", "back", "left", "right"], hair);
  paint.rect("head", "front", 0, 0, 8, 2, hair);
  paint.rect("head", "front", 0, 2, 1, 2, hair);
  paint.rect("head", "front", 7, 2, 1, 2, hair);
  paint.rect("head", "front", 1, 2, 2, 1, hair);
  paint.rect("head", "front", 5, 2, 2, 1, hair);
  paint.rect("head", "front", 1, 1, 3, 1, hairLight);
  paint.rect("head", "front", 3, 2, 1, 1, shade);
  paint.rect("head", "front", 1, 4, 1, 2, shade);
  paint.rect("head", "front", 6, 4, 1, 2, shade);
  paint.rect("head", "front", 3, 4, 2, 1, shade);
  paint.rect("head", "front", 3, 5, 1, 1, `${skin}`);
  paint.rect("head", "front", 4, 5, 1, 1, shade);
  paint.rect("head", "front", 1, 6, 1, 1, shade);
  paint.rect("head", "front", 6, 6, 1, 1, shade);
  paint.rect("head", "front", 2, 7, 4, 1, shade);
}

function eyes(paint: SkinPainter, iris = "#241c16", white = "#e2dcc9"): void {
  paint.rect("head", "front", 1, 3, 2, 1, white);
  paint.rect("head", "front", 5, 3, 2, 1, white);
  paint.rect("head", "front", 2, 3, 1, 1, iris);
  paint.rect("head", "front", 5, 3, 1, 1, iris);
  paint.rect("head", "front", 1, 2, 2, 1, HAIR.black);
  paint.rect("head", "front", 5, 2, 2, 1, HAIR.black);
}

function mouth(paint: SkinPainter, curve: "flat" | "smile" | "firm", color = "#58392f"): void {
  if (curve === "smile") {
    paint.rect("head", "front", 3, 6, 2, 1, color);
    paint.px("head", "front", 2, 6, color);
    paint.px("head", "front", 5, 6, color);
  } else if (curve === "firm") {
    paint.rect("head", "front", 3, 6, 2, 1, color);
    paint.rect("head", "front", 2, 6, 1, 1, "#734b3e");
    paint.rect("head", "front", 5, 6, 1, 1, "#734b3e");
  } else {
    paint.rect("head", "front", 3, 6, 2, 1, color);
  }
}

function zhangBody(): Skin {
  return createSkin((paint) => {
    faceBase(paint, SKIN.zhang, SKIN.zhangShade, HAIR.black, HAIR.blackLight);
    eyes(paint, "#171310", "#d6d0be");
    mouth(paint, "firm");
    paint.rect("head", "front", 0, 0, 8, 1, "#111110");
    paint.rect("head", "front", 2, 2, 3, 1, HAIR.black);
    paint.rect("head", "front", 2, 7, 4, 1, "#a77253");
    for (const part of ["torso", "armR", "armL", "legR", "legL"] as const) {
      paint.fill(part, "all", SKIN.zhang);
    }
    paint.grain("head", "all", 0.035, 2);
  });
}

function collectorBody(): Skin {
  return createSkin((paint) => {
    faceBase(paint, SKIN.collector, SKIN.collectorShade, HAIR.grey, "#c5c4bb");
    paint.rect("head", "front", 1, 0, 6, 1, "#d0cfc5");
    eyes(paint, "#2b211a", "#e5deca");
    mouth(paint, "smile");
    paint.rect("head", "front", 1, 3, 2, 1, "#e8e3d3");
    paint.rect("head", "front", 5, 3, 2, 1, "#e8e3d3");
    // Painted wire spectacles: two thin lenses and a bridge.
    paint.rect("head", "front", 0, 2, 4, 1, "#4b4438");
    paint.rect("head", "front", 4, 2, 4, 1, "#4b4438");
    paint.px("head", "front", 0, 3, "#4b4438");
    paint.px("head", "front", 3, 3, "#4b4438");
    paint.px("head", "front", 4, 3, "#4b4438");
    paint.px("head", "front", 7, 3, "#4b4438");
    paint.px("head", "front", 0, 4, "#4b4438");
    paint.px("head", "front", 3, 4, "#4b4438");
    paint.px("head", "front", 4, 4, "#4b4438");
    paint.px("head", "front", 7, 4, "#4b4438");
    paint.rect("head", "front", 1, 6, 1, 1, "#a57457");
    paint.rect("head", "front", 6, 6, 1, 1, "#a57457");
    for (const part of ["torso", "armR", "armL", "legR", "legL"] as const) {
      paint.fill(part, "all", SKIN.collector);
    }
    paint.grain("head", "all", 0.04, 5);
  });
}

function crewBody(index: number): Skin {
  const skins = [SKIN.crew0, SKIN.crew1, SKIN.crew2];
  const skin = skins[index % skins.length]!;
  const hair = index % 3 === 0 ? HAIR.black : index % 3 === 1 ? HAIR.brown : "#49433a";
  const hairLight = index % 3 === 0 ? HAIR.blackLight : "#5d5045";
  return createSkin((paint) => {
    faceBase(paint, skin, "#7f5941", hair, hairLight);
    eyes(paint, index % 2 === 0 ? "#1c1712" : "#2f2b24");
    mouth(paint, index % 3 === 0 ? "flat" : "firm");
    for (const part of ["torso", "armR", "armL", "legR", "legL"] as const) paint.fill(part, "all", skin);
    paint.grain("head", "all", 0.04, 8 + index);
  });
}

function hitBody(index: number): Skin {
  return createSkin((paint) => {
    const skins = [SKIN.crew0, SKIN.crew1, SKIN.crew2];
    const skin = skins[index % 3]!;
    faceBase(paint, skin, "#7f5941", HAIR.black, HAIR.blackLight);
    eyes(paint, "#1b1711");
    mouth(paint, "flat", "#4c100c");
    const rng = mulberry32(31 + index * 17);
    // Red bloom behind the shattered faceplate, then bright fracture lines.
    paint.rect("head", "front", 1, 1, 6, 6, "rgba(112,15,11,0.82)");
    paint.rect("head", "front", 2, 2, 4, 3, "rgba(181,44,24,0.85)");
    paint.rect("head", "front", 3, 3, 2, 3, "#7d160f");
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(rng() * 8);
      const y = Math.floor(1 + rng() * 5);
      paint.px("head", "front", x, y, "#f2e6d2");
      if (x < 7 && y < 6) paint.px("head", "front", x + 1, y + 1, "#d9cbb8");
      if (x > 0 && y > 1) paint.px("head", "front", x - 1, y, "#d9cbb8");
    }
    paint.rect("head", "front", 0, 0, 8, 1, "#e2ddd0");
    paint.rect("head", "front", 0, 7, 8, 1, "#e2ddd0");
    for (const part of ["torso", "armR", "armL", "legR", "legL"] as const) paint.fill(part, "all", skin);
    paint.grain("head", "all", 0.04, 40 + index);
  });
}

function uniformClothes(): Skin {
  return createSkin(
    (paint) => {
      paint.fill("torso", "all", "#26313a");
      paint.fill("armR", "all", "#26313a");
      paint.fill("armL", "all", "#26313a");
      paint.fill("legR", "all", "#1c252b");
      paint.fill("legL", "all", "#1c252b");
      paint.fill("torso", "front", "#2b3740");
      paint.rect("torso", "front", 0, 0, 8, 1, "#131a20");
      paint.rect("torso", "front", 1, 1, 2, 1, "#9b7a3e");
      paint.rect("torso", "front", 5, 1, 2, 1, "#9b7a3e");
      paint.rect("torso", "front", 3, 0, 2, 2, "#171f25");
      paint.rect("torso", "front", 3, 2, 2, 1, "#c6b28a");
      paint.rect("torso", "front", 3, 8, 2, 2, "#121719");
      paint.px("torso", "front", 3, 8, "#b99657");
      paint.px("torso", "front", 4, 9, "#b99657");
      paint.rect("torso", "front", 1, 3, 2, 2, "#8f2b25");
      paint.px("torso", "front", 1, 3, "#d6b25b");
      paint.px("torso", "front", 2, 4, "#d6b25b");
      paint.rect("torso", "front", 5, 3, 2, 1, "#b8b5a6");
      paint.rect("torso", "front", 5, 4, 2, 1, "#2a2b26");
      paint.rect("torso", "front", 1, 7, 2, 1, "#1d272d");
      paint.rect("torso", "front", 5, 7, 2, 1, "#1d272d");
      paint.rect("torso", "front", 1, 9, 6, 1, "#151b1f");
      paint.rect("legR", "front", 0, 10, 4, 2, "#11171a");
      paint.rect("legL", "front", 0, 10, 4, 2, "#11171a");
      for (const face of ["front", "back", "left", "right"] as const) {
        paint.rect("armR", face, 0, 0, 4, 1, "#182126");
        paint.rect("armL", face, 0, 0, 4, 1, "#182126");
      }
      // Expose the hands at the cuffs.
      for (const face of ["front", "back", "left", "right"] as const) {
        paint.erase("armR", face, 0, 10, 4, 2);
        paint.erase("armL", face, 0, 10, 4, 2);
      }
      paint.grain("torso", "all", 0.045, 9);
      paint.grain("armR", "all", 0.035, 10);
      paint.grain("armL", "all", 0.035, 11);
      paint.grain("legR", "all", 0.05, 12);
      paint.grain("legL", "all", 0.05, 13);
    },
    { transparent: true },
  );
}

function collectorClothes(): Skin {
  return createSkin(
    (paint) => {
      paint.fill("torso", "all", "#50402f");
      paint.fill("armR", "all", "#4b3b2b");
      paint.fill("armL", "all", "#4b3b2b");
      paint.fill("legR", "all", "#302b24");
      paint.fill("legL", "all", "#302b24");
      paint.fill("torso", "front", "#554433");
      paint.rect("torso", "front", 3, 0, 2, 8, "#c5b18b");
      paint.rect("torso", "front", 2, 0, 1, 7, "#6b5541");
      paint.rect("torso", "front", 5, 0, 1, 7, "#6b5541");
      paint.rect("torso", "front", 3, 1, 1, 1, "#2b241d");
      paint.rect("torso", "front", 4, 3, 1, 1, "#8f7450");
      paint.rect("torso", "front", 4, 5, 1, 1, "#8f7450");
      paint.rect("torso", "front", 0, 6, 2, 2, "#443526");
      paint.rect("torso", "front", 6, 6, 2, 2, "#443526");
      paint.rect("torso", "front", 1, 7, 1, 1, "#b2976d");
      paint.rect("torso", "front", 6, 7, 1, 1, "#b2976d");
      paint.rect("legR", "front", 0, 10, 4, 2, "#1b1814");
      paint.rect("legL", "front", 0, 10, 4, 2, "#1b1814");
      for (const face of ["front", "back", "left", "right"] as const) {
        paint.erase("armR", face, 0, 10, 4, 2);
        paint.erase("armL", face, 0, 10, 4, 2);
      }
      paint.grain("torso", "all", 0.07, 15);
      paint.grain("armR", "all", 0.07, 16);
      paint.grain("armL", "all", 0.07, 17);
      paint.grain("legR", "all", 0.05, 18);
      paint.grain("legL", "all", 0.05, 19);
    },
    { transparent: true },
  );
}

interface SuitStyle {
  base: string;
  shade: string;
  accent: string;
  trim: string;
  rank: boolean;
}

function spaceSuit(style: SuitStyle, bareRightHand = false): Skin {
  return createSkin(
    (paint) => {
      paint.fill("torso", "all", style.base);
      paint.fill("armR", "all", style.base);
      paint.fill("armL", "all", style.base);
      paint.fill("legR", "all", style.shade);
      paint.fill("legL", "all", style.shade);
      paint.fill("head", "all", style.base);

      paint.rect("torso", "front", 1, 2, 6, 4, style.accent);
      paint.rect("torso", "front", 2, 3, 4, 2, "#1d3948");
      paint.rect("torso", "front", 1, 0, 6, 1, "#8b8e88");
      paint.rect("torso", "front", 0, 1, 1, 9, "#b2b5ad");
      paint.rect("torso", "front", 7, 1, 1, 9, "#b2b5ad");
      paint.rect("torso", "front", 3, 7, 2, 1, "#7f8480");
      paint.rect("torso", "front", 1, 7, 1, 1, style.trim);
      paint.rect("torso", "front", 6, 7, 1, 1, style.trim);
      paint.rect("torso", "front", 5, 1, 2, 1, "#a43a2c");
      paint.rect("torso", "front", 3, 9, 2, 1, "#878c88");
      paint.rect("torso", "front", 3, 10, 2, 1, "#5b605d");
      paint.rect("torso", "back", 1, 2, 6, 5, "#b7bbb5");
      paint.rect("torso", "back", 2, 3, 4, 3, style.accent);
      paint.rect("torso", "back", 3, 4, 2, 1, style.trim);

      for (const face of ["front", "back", "left", "right"] as const) {
        paint.rect("armR", face, 0, 8, 4, 1, "#8f948f");
        paint.rect("armL", face, 0, 8, 4, 1, "#8f948f");
        paint.rect("armR", face, 0, 0, 4, 1, style.accent);
        paint.rect("armL", face, 0, 0, 4, 1, style.accent);
        paint.rect("legR", face, 0, 8, 4, 1, "#7f8581");
        paint.rect("legL", face, 0, 8, 4, 1, "#7f8581");
      }
      paint.rect("legR", "front", 0, 10, 4, 2, "#4d5352");
      paint.rect("legL", "front", 0, 10, 4, 2, "#4d5352");

      // Helmet: a painted shell with a transparent face window.
      paint.rect("head", "front", 0, 0, 8, 8, style.base);
      paint.rect("head", "front", 0, 0, 8, 1, style.trim);
      paint.rect("head", "front", 0, 7, 8, 1, "#8f9490");
      paint.rect("head", "front", 0, 1, 1, 6, "#b7bbb4");
      paint.rect("head", "front", 7, 1, 1, 6, "#b7bbb4");
      paint.rect("head", "front", 1, 0, 6, 1, style.accent);
      paint.clear("head", "front");
      paint.rect("head", "front", 0, 0, 8, 1, style.base);
      paint.rect("head", "front", 0, 7, 8, 1, "#a5aaa5");
      paint.rect("head", "front", 0, 1, 1, 6, style.base);
      paint.rect("head", "front", 7, 1, 1, 6, style.base);
      paint.rect("head", "front", 1, 1, 1, 1, "rgba(198,232,227,0.95)");
      paint.rect("head", "front", 6, 1, 1, 1, "rgba(198,232,227,0.72)");
      paint.rect("head", "front", 0, 0, 8, 1, style.accent);
      paint.rect("head", "front", 0, 7, 8, 1, "#8e938f");
      paint.rect("head", "front", 0, 1, 1, 6, "#b7bbb4");
      paint.rect("head", "front", 7, 1, 1, 6, "#b7bbb4");
      paint.rect("head", "top", 1, 1, 6, 6, style.trim);
      paint.rect("head", "back", 2, 2, 4, 4, "#7c817d");
      paint.rect("head", "back", 3, 3, 2, 1, style.accent);

      if (style.rank) {
        paint.rect("torso", "front", 0, 3, 1, 2, "#d8b45e");
        paint.rect("torso", "front", 7, 3, 1, 2, "#d8b45e");
        paint.rect("torso", "front", 2, 1, 1, 1, "#d8b45e");
        paint.rect("torso", "front", 5, 1, 1, 1, "#d8b45e");
      }

      if (bareRightHand) {
        for (const face of ["front", "back", "left", "right"] as const) {
          paint.erase("armR", face, 0, 9, 4, 3);
        }
        paint.rect("armR", "front", 0, 9, 4, 1, "#6d7371");
      }

      paint.grain("torso", "all", 0.035, 21);
      paint.grain("armR", "all", 0.03, 22);
      paint.grain("armL", "all", 0.03, 23);
      paint.grain("legR", "all", 0.035, 24);
      paint.grain("legL", "all", 0.035, 25);
    },
    { transparent: true },
  );
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Cast {
  zhangBody: Skin;
  collectorBody: Skin;
  zhangUniform: Skin;
  collectorClothes: Skin;
  zhangSuit: Skin;
  zhangSuitBare: Skin;
  crowdBodies: Skin[];
  crowdSuits: Skin[];
  targetSuit: Skin;
  hitBodies: Skin[];
  zhangShop: Figure;
  collector: Figure;
  zhangSpace: Figure;
  crew: Figure[];
  targetIndices: number[];
  woundedIndices: number[];
}

const SPACE_SUIT_STYLES: SuitStyle[] = [
  { base: "#d6d9d1", shade: "#aeb4ae", accent: "#476b7d", trim: "#e9e9e1", rank: false },
  { base: "#c9cec7", shade: "#9ea69f", accent: "#6d594e", trim: "#e7e6db", rank: false },
  { base: "#dfe0d7", shade: "#b3b8b1", accent: "#3f6270", trim: "#f0efe7", rank: false },
];

export function buildCast(): Cast {
  const zhangBody = zhangBodySkin();
  const collectorBody = collectorBodySkin();
  const zhangUniform = uniformClothes();
  const collectorClothes = collectorClothesSkin();
  const zhangSuit = spaceSuit(SPACE_SUIT_STYLES[0]!, false);
  const zhangSuitBare = spaceSuit(SPACE_SUIT_STYLES[0]!, true);
  const crowdBodies = [0, 1, 2].map((index) => crewBody(index));
  const crowdSuits = SPACE_SUIT_STYLES.map((style) => spaceSuit(style, false));
  const targetSuit = spaceSuit({ base: "#e2e2d8", shade: "#b7bbb3", accent: "#7a3028", trim: "#e9c981", rank: true }, false);
  const hitBodies = [0, 1, 2].map((index) => hitBody(index));

  const zhangShopFig = createFigure({ body: zhangBody.texture, clothes: zhangUniform.texture, heightM: 1.84 });
  const collectorFig = createFigure({
    body: collectorBody.texture,
    clothes: collectorClothes.texture,
    heightM: 1.76,
    arm: "slim",
  });
  const zhangSpaceFig = createFigure({ body: zhangBody.texture, clothes: zhangSuit.texture, heightM: 1.84, castShadow: false });

  const crew: Figure[] = [];
  for (let i = 0; i < 30; i++) {
    const target = i === 3 || i === 4 || i === 5;
    crew.push(
      createFigure({
        body: crowdBodies[i % crowdBodies.length]!.texture,
        clothes: target ? targetSuit.texture : crowdSuits[i % crowdSuits.length]!.texture,
        heightM: i % 7 === 0 ? 1.74 : 1.78 + (i % 5) * 0.012,
        arm: i % 4 === 0 ? "slim" : "classic",
        castShadow: false,
      }),
    );
  }

  return {
    zhangBody,
    collectorBody,
    zhangUniform,
    collectorClothes,
    zhangSuit,
    zhangSuitBare,
    crowdBodies,
    crowdSuits,
    targetSuit,
    hitBodies,
    zhangShop: zhangShopFig,
    collector: collectorFig,
    zhangSpace: zhangSpaceFig,
    crew,
    targetIndices: [3, 4, 5],
    woundedIndices: [2, 3, 4, 5, 6],
  };
}

function zhangBodySkin(): Skin { return zhangBody(); }
function collectorBodySkin(): Skin { return collectorBody(); }
function collectorClothesSkin(): Skin { return collectorClothes(); }

export function seatedCollectorPose(time: number, gesture = 0): Pose {
  const breath = Math.sin(time * 1.3);
  return {
    hips: [0.04, 0, 0],
    neck: [0.16 + breath * 0.012, -0.06 + gesture * 0.08, 0],
    armR: [-0.62 - gesture * 0.35, 0.12, 0.22],
    armL: [-0.4, -0.1, -0.22],
    legR: [-1.28, 0, 0.03],
    legL: [-1.18, 0, -0.03],
    lift: -2.45 + breath * 0.06,
  };
}

export function standingCollectorPose(time: number, gesture = 0): Pose {
  return {
    hips: [0, 0, 0],
    neck: [0.03 + Math.sin(time * 1.4) * 0.01, -0.03 + gesture * 0.05, 0],
    armR: [-0.2 - gesture * 0.56, 0.06, 0.17],
    armL: [-0.08, -0.04, -0.15],
    legR: [0, 0, 0.01],
    legL: [0, 0, -0.01],
    lift: Math.sin(time * 1.3) * 0.05,
  };
}

export function tenseZhangPose(time: number, aimAmount = 0): Pose {
  const breath = Math.sin(time * 1.6);
  const base: Pose = {
    hips: [0.02, 0, 0],
    neck: [0.02, 0.06, 0],
    armR: [-0.2, 0.04, 0.09],
    armL: [-0.13, -0.06, -0.1],
    legR: [0.04, 0, 0.015],
    legL: [-0.03, 0, -0.015],
    lift: breath * 0.07,
  };
  if (aimAmount <= 0) return base;
  const aiming: Pose = {
    hips: [0.02, -0.05, 0],
    neck: [0.025, 0.04, 0],
    armR: [-Math.PI / 2 + 0.02 + breath * 0.006, 0.015, 0.06],
    armL: [-Math.PI / 2 + 0.03, -0.03, -0.1],
    legR: [0.06, 0, 0.02],
    legL: [-0.05, 0, -0.02],
    lift: breath * 0.045,
  };
  return lerpPose(base, aiming, aimAmount);
}

export function walkPose(time: number): Pose {
  return idle(time * 0.2);
}
