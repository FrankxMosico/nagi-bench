import * as THREE from "three";
import { createSkin, type FaceName, type PartName, type SkinPainter } from "@agentbench/voxel-kit";
import { mulberry32 } from "../core/anim";

/**
 * Every identity in the film is painted into the kit's 64×64 sheets: faces,
 * hair, glasses, suit panels, visors and wear are texels, never geometry.
 */

type Pal = Record<string, string>;

/** Paint pixel-art rows onto one face. '.' leaves the pixel untouched. */
function rows(p: SkinPainter, part: PartName, face: FaceName, art: string[], pal: Pal, ox = 0, oy = 0): void {
  art.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const ch = line[x]!;
      if (ch === "." || ch === " ") continue;
      if (ch === "_") {
        p.erase(part, face, ox + x, oy + y, 1, 1);
        continue;
      }
      const c = pal[ch];
      if (c) p.px(part, face, ox + x, oy + y, c);
    }
  });
}

const LIMBS: PartName[] = ["armR", "armL", "legR", "legL"];
const SIDES: FaceName[] = ["front", "back", "left", "right"];

export type Expression =
  | "neutral"
  | "blink"
  | "narrow"
  | "smile"
  | "laugh"
  | "awkward"
  | "down"
  | "scream"
  | "grim"
  | "aside";

export type HairStyle = "crew" | "side" | "balding" | "long" | "bob" | "grey-crew";

export interface FaceSpec {
  skin: string;
  skinShade: string;
  hair: string;
  hairHi?: string;
  style: HairStyle;
  brow: string;
  iris: string;
  lip: string;
  glasses?: string;
  cheek?: string;
  wrinkles?: boolean;
  stubble?: string;
}

function headArt(f: FaceSpec, expr: Expression): string[] {
  // 8×8 front face. Letters: h hair, s skin, S shade, b brow, w white, e iris,
  // l lid, m lip, k open mouth, t teeth, g glasses, c cheek, n nose, H hair hi.
  const top = f.style === "balding" ? "SssssssS" : "hhhhhhhh";
  const second =
    f.style === "crew" || f.style === "grey-crew" ? "hssssssh"
    : f.style === "side" ? "hhhhHssh"
    : f.style === "balding" ? (f.wrinkles ? "sSSssSSs" : "ssssssss")
    : "hhsssshh";
  let brows = "sbbssbbs";
  let eyes = "swessews";
  let nose = "sssnnsss";
  let cheek = f.cheek ? "scsssscs" : "ssssssss";
  let mouth = "ssmmmmss";
  let chin = "SssssssS";
  switch (expr) {
    case "blink":
      eyes = "sllsslls";
      break;
    case "narrow":
      // Brows pressed down onto the eyes: cold focus.
      brows = "ssssssss";
      eyes = "sbessebs";
      break;
    case "smile":
      cheek = f.cheek ? "scmsSmcs" : "ssmssmss";
      mouth = "sssmmsss";
      break;
    case "laugh":
      eyes = "sllsslls";
      cheek = f.cheek ? "scmmmmcs" : "ssmmmmss";
      mouth = "sskkkkss";
      chin = "SsskksSS";
      break;
    case "awkward":
      eyes = "sewssews";
      cheek = f.cheek ? "scsssmcs" : "sssssmss";
      mouth = "ssmmmsss";
      break;
    case "down":
      eyes = "sllsslls";
      nose = "sesnnses";
      break;
    case "scream":
      brows = "bbssssbb";
      eyes = "swesswes";
      cheek = "sskttkss";
      mouth = "sskkkkss";
      chin = "SskkkksS";
      break;
    case "grim":
      brows = "sbbbbbbs";
      eyes = "slessels";
      break;
    case "aside":
      eyes = "sewssews";
      break;
    default:
      break;
  }
  const art = [top, second, brows, eyes, nose, cheek, mouth, chin];
  if (f.glasses) {
    const e = art[3]!.split("");
    e[0] = "g";
    e[3] = "g";
    e[4] = "g";
    e[7] = "g";
    art[3] = e.join("");
    const n = art[4]!.split("");
    n[1] = "g";
    n[2] = "g";
    n[5] = "g";
    n[6] = "g";
    art[4] = n.join("");
  }
  if (f.style === "long" || f.style === "bob") {
    for (let r = 1; r < (f.style === "long" ? 8 : 6); r++) {
      const line = art[r]!.split("");
      line[0] = "h";
      line[7] = "h";
      art[r] = line.join("");
    }
  }
  if (f.stubble) {
    const c = art[7]!.split("");
    for (let i = 1; i < 7; i++) if (c[i] === "s") c[i] = "x";
    art[7] = c.join("");
    const m = art[6]!.split("");
    if (m[1] === "s") m[1] = "x";
    if (m[6] === "s") m[6] = "x";
    art[6] = m.join("");
  }
  return art;
}

function paintHead(p: SkinPainter, f: FaceSpec, expr: Expression): void {
  const pal: Pal = {
    h: f.hair,
    H: f.hairHi ?? f.hair,
    s: f.skin,
    S: f.skinShade,
    b: f.brow,
    w: "#eeeae2",
    e: f.iris,
    l: f.skinShade,
    m: f.lip,
    k: "#3a1a18",
    t: "#e9e3d8",
    g: f.glasses ?? "#222",
    c: f.cheek ?? f.skin,
    n: f.skinShade,
    x: f.stubble ?? f.skinShade,
  };
  p.fill("head", "all", f.skin);
  rows(p, "head", "front", headArt(f, expr), pal);
  // Sides: left face (+X) has its front at column 0, right face (−X) at column 7.
  const sideCrew = ["hhhhhhhh", "shhhhhhh", "sshhhhhh", "ssSshhhh", "ssSSshhh", "sssssshh", "SsssssSh", "SSsssSSS"];
  const sideLong = ["hhhhhhhh", "hhhhhhhh", "shhhhhhh", "ssShhhhh", "ssShhhhh", "sshhhhhh", "shhhhhhh", "hhhhhhhh"];
  const sideBald = ["SsssssSS", "sssssshh", "ssSsshhh", "ssSShhhh", "sssshhhh", "ssssshhh", "SsssssSh", "SSsssSSS"];
  const side = f.style === "long" || f.style === "bob" ? sideLong : f.style === "balding" ? sideBald : sideCrew;
  rows(p, "head", "left", side, pal);
  rows(p, "head", "right", side.map((r) => r.split("").reverse().join("")), pal);
  const back = f.style === "balding"
    ? ["SsssssSS", "ssssssss", "hhsssshh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "shhhhhhs", "SSSSSSSS"]
    : f.style === "long"
      ? ["hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh"]
      : ["hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "hhhhhhhh", "shhhhhhs", "SSSSSSSS"];
  rows(p, "head", "back", back, pal);
  if (f.style === "balding") {
    p.fill("head", "top", f.skin);
    rows(p, "head", "top", ["hhhhhhhh", "hsssssshh".slice(0, 8), "hssssssh", "hssssssh", "hssssssh", "hssssssh", "ssssssss", "SsssssSS"], pal);
  } else {
    p.fill("head", "top", f.hair);
    if (f.hairHi) {
      p.px("head", "top", 2, 3, f.hairHi).px("head", "top", 5, 2, f.hairHi).px("head", "top", 4, 5, f.hairHi);
    }
  }
  p.fill("head", "bottom", f.skinShade);
  p.grain("head", "all", 0.04, 7);
}

export interface BodySpec {
  face: FaceSpec;
  /** Colour of the hands (skin, or a thin inner glove). */
  hands?: string;
  under?: string;
}

/** Body sheet: the bare figure — face, hands and an undergarment base. */
export function paintBody(spec: BodySpec, expr: Expression): (p: SkinPainter) => void {
  return (p) => {
    paintHead(p, spec.face, expr);
    const under = spec.under ?? "#6b6f74";
    p.fill("torso", "all", under);
    p.rect("torso", "front", 2, 0, 4, 1, spec.face.skin);
    for (const limb of LIMBS) p.fill(limb, "all", under);
    const hands = spec.hands ?? spec.face.skin;
    for (const arm of ["armR", "armL"] as PartName[]) {
      for (const face of SIDES) p.rect(arm, face, 0, 9, 4, 3, hands);
      p.fill(arm, "bottom", hands);
    }
    p.grain("torso", "all", 0.06, 3);
  };
}

const skinCache = new Map<string, THREE.Texture>();

export function bodyTexture(key: string, spec: BodySpec, expr: Expression): THREE.Texture {
  const id = `${key}:${expr}`;
  let t = skinCache.get(id);
  if (!t) {
    t = createSkin(paintBody(spec, expr)).texture;
    skinCache.set(id, t);
  }
  return t;
}

// ---------------------------------------------------------------- faces

export const FACES = {
  zhang: {
    skin: "#c08f69",
    skinShade: "#9c6f50",
    hair: "#17130f",
    style: "crew",
    brow: "#1b1510",
    iris: "#2a1d14",
    lip: "#a26a54",
  } satisfies FaceSpec,
  collector: {
    skin: "#d6a37d",
    skinShade: "#b07f5e",
    hair: "#4a4744",
    hairHi: "#a7a29b",
    style: "side",
    brow: "#3d3530",
    iris: "#3b2a1e",
    lip: "#9a5a4a",
    glasses: "#c9a24e",
    cheek: "#d98c74",
  } satisfies FaceSpec,
} as const;

export const ZHANG_BODY: BodySpec = { face: FACES.zhang, under: "#3a3f3a" };
export const ZHANG_SPACE_BODY: BodySpec = { face: FACES.zhang, hands: "#2c2f33", under: "#30343a" };
export const COLLECTOR_BODY: BodySpec = { face: FACES.collector, under: "#e8e2d4" };

/** Procedural crowd faces for the Yellow River station delegation. */
export function crowdFace(seed: number, old = false): FaceSpec {
  const r = mulberry32(seed * 977 + 13);
  const skins: Array<[string, string]> = [
    ["#d3a27c", "#ae7f5d"],
    ["#c79670", "#a07253"],
    ["#e0b592", "#bb8f6e"],
    ["#b98563", "#946347"],
    ["#d8ac88", "#b08664"],
  ];
  const [skin, skinShade] = skins[Math.floor(r() * skins.length)]!;
  const female = !old && r() < 0.3;
  const greys = ["#b9b6b0", "#d9d6d0", "#8d8a85"];
  const darks = ["#1a1612", "#2b211a", "#3a2c20", "#151515"];
  const hair = old ? greys[Math.floor(r() * greys.length)]! : darks[Math.floor(r() * darks.length)]!;
  const style: HairStyle = female ? (r() < 0.5 ? "bob" : "long") : old ? (r() < 0.5 ? "balding" : "grey-crew") : r() < 0.5 ? "crew" : "side";
  return {
    skin,
    skinShade,
    hair,
    hairHi: old ? "#efece6" : undefined,
    style,
    brow: old ? "#7d7870" : "#221a14",
    iris: "#2a1e16",
    lip: female ? "#a85a55" : "#8a5545",
    glasses: r() < (old ? 0.5 : 0.2) ? "#2a2a2a" : undefined,
    wrinkles: old,
  };
}

// ---------------------------------------------------------------- clothing

export function paintCoat(p: SkinPainter): void {
  const coat = "#2b3039";
  const coatDark = "#20242b";
  const trouser = "#24262a";
  const shoe = "#111214";
  p.fill("torso", "all", coat);
  // Stand collar and a white shirt edge, a straight row of buttons.
  rows(p, "torso", "front", ["SwwwwwwS", "SScwwcSS", "SSSbSSSS", "SSSSSSSS", "SSSbSSSS", "SSSSSSSS", "SSSbSSSS", "llllllll", "SSSbSSSS", "SSSSSSSS", "SSSSSSSS", "SSSSSSSS"], {
    S: coat,
    w: "#d9d6cf",
    c: coatDark,
    b: "#0f1012",
    l: coatDark,
  });
  p.rect("torso", "back", 0, 7, 8, 1, coatDark);
  for (const arm of ["armR", "armL"] as PartName[]) {
    p.fill(arm, ["front", "back", "left", "right", "top"], coat);
    for (const f of SIDES) {
      p.rect(arm, f, 0, 8, 4, 1, coatDark);
      p.erase(arm, f, 0, 9, 4, 3);
    }
    p.clear(arm, "bottom");
  }
  for (const leg of ["legR", "legL"] as PartName[]) {
    p.fill(leg, "all", trouser);
    for (const f of SIDES) {
      p.rect(leg, f, 0, 0, 4, 4, coat);
      p.rect(leg, f, 0, 10, 4, 2, shoe);
    }
    p.fill(leg, "bottom", shoe);
  }
  p.grain("torso", "all", 0.07, 11);
  for (const l of LIMBS) p.grain(l, "all", 0.07, 12);
}

/** Shirt sleeves for the basement: olive service shirt, cuffs rolled once. */
export function paintShirt(p: SkinPainter): void {
  const shirt = "#5a6148";
  const dark = "#474d39";
  p.fill("torso", "all", shirt);
  rows(p, "torso", "front", ["dSSSSSSd", "dSSdSSSd", "SSSbSSSS", "SpSSSSpS", "SSSbSSSS", "SSSSSSSS", "SSSbSSSS", "SSSSSSSS", "SSSbSSSS", "kkkkkkkk", "SSSSSSSS", "SSSSSSSS"], {
    S: shirt,
    d: dark,
    b: "#2f3326",
    p: dark,
    k: "#1a1a1a",
  });
  for (const arm of ["armR", "armL"] as PartName[]) {
    p.fill(arm, ["front", "back", "left", "right", "top"], shirt);
    for (const f of SIDES) {
      p.rect(arm, f, 0, 6, 4, 1, dark);
      p.erase(arm, f, 0, 7, 4, 5);
    }
    p.clear(arm, "bottom");
  }
  for (const leg of ["legR", "legL"] as PartName[]) {
    p.fill(leg, "all", "#26282b");
    for (const f of SIDES) p.rect(leg, f, 0, 10, 4, 2, "#111214");
    p.fill(leg, "bottom", "#111214");
  }
  p.grain("torso", "all", 0.08, 21);
}

export function paintCardigan(p: SkinPainter): void {
  const knit = "#8a6a3e";
  const knitDark = "#6f5430";
  p.fill("torso", "all", knit);
  rows(p, "torso", "front", ["KwwwwwwK", "KKwwwwKK", "KKKwwKKK", "KKKwwKKK", "KKbwwbKK", "KKKwwKKK", "KKbwwbKK", "KKKwwKKK", "KKbwwbKK", "KKKwwKKK", "dddddddd", "KKKKKKKK"], {
    K: knit,
    w: "#e8e2d4",
    b: "#3a2a18",
    d: knitDark,
  });
  for (const arm of ["armR", "armL"] as PartName[]) {
    p.fill(arm, ["front", "back", "left", "right", "top"], knit);
    for (const f of SIDES) {
      p.rect(arm, f, 0, 8, 4, 1, knitDark);
      p.erase(arm, f, 0, 9, 4, 3);
    }
    p.clear(arm, "bottom");
  }
  for (const leg of ["legR", "legL"] as PartName[]) {
    p.fill(leg, "all", "#55565a");
    for (const f of SIDES) p.rect(leg, f, 0, 10, 4, 2, "#1b1a19");
    p.fill(leg, "bottom", "#1b1a19");
  }
  p.grain("torso", "all", 0.12, 31);
  p.grain("armR", "all", 0.12, 32);
  p.grain("armL", "all", 0.12, 33);
}

export type VisorState = { kind: "opaque" } | { kind: "clear" } | { kind: "dissolve"; amount: number; seed: number } | { kind: "cracked" };

export interface SuitSpec {
  base: string;
  panel: string;
  dark: string;
  accent: string;
  visorTint: string;
  visorHi: string;
  patch?: string;
  /** Right outer glove removed (the bare thin glove shows through). */
  noRightGlove?: boolean;
  /** Gold sun-shield strip along the top of a clear visor. */
  shieldStrip?: boolean;
}

export const SUIT_STATION: SuitSpec = {
  base: "#e7e6e1",
  panel: "#c6c8c6",
  dark: "#8b9096",
  accent: "#2f6cb3",
  visorTint: "#b8862e",
  visorHi: "#f3d58a",
  patch: "#c23a2a",
};

export const SUIT_OFFICIAL: SuitSpec = { ...SUIT_STATION, accent: "#c8892c" };

export const SUIT_ZHANG: SuitSpec = {
  base: "#5c636b",
  panel: "#474d55",
  dark: "#2c3035",
  accent: "#a8472b",
  visorTint: "#6d5a2a",
  visorHi: "#c9a85c",
  shieldStrip: true,
};

const VISOR = { x: 1, y: 2, w: 6, h: 5 };

export function paintSuit(spec: SuitSpec, visor: VisorState): (p: SkinPainter) => void {
  return (p) => {
    // Helmet shell.
    p.fill("head", "all", spec.base);
    p.fill("head", "top", spec.panel);
    p.rect("head", "top", 3, 0, 2, 8, spec.dark);
    rows(p, "head", "front", ["PPPPPPPP", "PddddddP", "d......d", "d......d", "d......d", "d......d", "d......d", "PdddddPP"], {
      P: spec.panel,
      d: spec.dark,
    });
    for (const side of ["left", "right"] as FaceName[]) {
      p.rect("head", side, 2, 3, 3, 3, spec.panel);
      p.px("head", side, 3, 4, spec.accent);
    }
    p.rect("head", "back", 1, 5, 6, 3, spec.panel);
    // Visor glass.
    const { x, y, w, h } = VISOR;
    if (visor.kind === "opaque") {
      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          const hi = (i + j === 2 || i + j === 3) && j < 3;
          p.px("head", "front", x + i, y + j, hi ? spec.visorHi : j < 2 ? spec.visorTint : shadeHex(spec.visorTint, 0.75 - j * 0.04));
        }
      }
    } else if (visor.kind === "clear") {
      p.erase("head", "front", x, y, w, h);
      if (spec.shieldStrip) p.rect("head", "front", x, y, w, 1, spec.visorTint);
      p.px("head", "front", x + w - 1, y + 1, spec.visorHi);
    } else if (visor.kind === "dissolve") {
      const order = shuffledIndices(w * h, visor.seed);
      const cut = Math.round(visor.amount * w * h);
      for (let n = 0; n < w * h; n++) {
        const idx = order[n]!;
        const i = idx % w;
        const j = Math.floor(idx / w);
        if (n < cut) p.erase("head", "front", x + i, y + j, 1, 1);
        else p.px("head", "front", x + i, y + j, j < 2 ? spec.visorTint : shadeHex(spec.visorTint, 0.75));
      }
    } else {
      // Crazed, frosted, blood thrown against the inside.
      rows(p, "head", "front", ["wcwwcw", "cwrcwr", "wrrwcw", "rcwrrc", "wwrcww"], { w: "#d9dde0", c: "#9aa3a8", r: "#8e1f1a" }, x, y);
    }
    // Torso: chest control unit, name patch, waist bearing.
    p.fill("torso", "all", spec.base);
    rows(p, "torso", "front", ["BBBBBBBB", "BpBBBBaB", "BBBBBBBB", "BBuuuuBB", "BBuRGuBB", "BBuyBuBB", "BBuuuuBB", "BBBBBBBB", "PPPPPPPP", "dddddddd", "BBBBBBBB", "PPPPPPPP"], {
      B: spec.base,
      P: spec.panel,
      d: spec.dark,
      u: spec.dark,
      R: "#d8402f",
      G: "#56c16a",
      y: "#e8c34a",
      p: spec.patch ?? spec.panel,
      a: spec.accent,
    });
    p.rect("torso", "back", 0, 9, 8, 1, spec.dark);
    for (const side of ["left", "right"] as FaceName[]) p.rect("torso", side, 0, 9, 4, 1, spec.dark);
    // Arms: shoulder stripe, wrist bearing, outer gloves.
    for (const arm of ["armR", "armL"] as PartName[]) {
      p.fill(arm, "all", spec.base);
      for (const f of SIDES) {
        p.rect(arm, f, 0, 1, 4, 1, spec.accent);
        p.rect(arm, f, 0, 5, 4, 1, spec.panel);
        p.rect(arm, f, 0, 8, 4, 1, "#9ea4aa");
        p.rect(arm, f, 0, 9, 4, 3, spec.panel);
        p.rect(arm, f, 0, 11, 4, 1, spec.dark);
      }
      p.fill(arm, "bottom", spec.dark);
    }
    if (spec.noRightGlove) {
      for (const f of SIDES) p.erase("armR", f, 0, 9, 4, 3);
      p.clear("armR", "bottom");
    }
    // Legs: knee pads, boots.
    for (const leg of ["legR", "legL"] as PartName[]) {
      p.fill(leg, "all", spec.base);
      for (const f of SIDES) {
        p.rect(leg, f, 0, 0, 4, 1, spec.dark);
        p.rect(leg, f, 0, 9, 4, 3, spec.dark);
      }
      p.rect(leg, "front", 0, 5, 4, 2, spec.panel);
      p.fill(leg, "bottom", "#1f2226");
    }
    p.grain("torso", "all", 0.03, 41);
    for (const l of LIMBS) p.grain(l, "all", 0.03, 42);
  };
}

function shuffledIndices(n: number, seed: number): number[] {
  const r = mulberry32(seed);
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function shadeHex(c: string, k: number): string {
  const n = parseInt(c.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * k));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * k));
  const b = Math.min(255, Math.round((n & 255) * k));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const clothCache = new Map<string, THREE.Texture>();

export function clothTexture(key: string, draw: (p: SkinPainter) => void): THREE.Texture {
  let t = clothCache.get(key);
  if (!t) {
    t = createSkin(draw, { transparent: true }).texture;
    clothCache.set(key, t);
  }
  return t;
}

export function suitTexture(key: string, spec: SuitSpec, visor: VisorState): THREE.Texture {
  const v = visor.kind === "dissolve" ? `d${Math.round(visor.amount * 30)}:${visor.seed}` : visor.kind;
  const id = `${key}:${v}:${spec.noRightGlove ? "ng" : "g"}`;
  return clothTexture(id, paintSuit(spec, visor.kind === "dissolve" ? { ...visor, amount: Math.round(visor.amount * 30) / 30 } : visor));
}
