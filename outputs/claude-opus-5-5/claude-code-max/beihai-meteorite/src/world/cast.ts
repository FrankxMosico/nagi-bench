import * as THREE from "three";
import {
  applyPose,
  createFigure,
  createSkin,
  voxelMaterial,
  type Figure,
  type Pose,
  type Skin,
  type SkinPainter,
} from "@agentbench/voxel-kit";
import { VoxelGrid } from "./vox";
import { makeCanvas } from "./fx";
import { hash1 } from "./util";

/* ======================================================================== */
/*  Faces                                                                    */
/* ======================================================================== */

export type Expr =
  | "neutral"
  | "blink"
  | "talk"
  | "smile"
  | "smileTalk"
  | "laugh"
  | "scream"
  | "pain"
  | "squint"
  | "awkward"
  | "grim"
  | "dead";

export interface FaceSpec {
  skin: string;
  shadow: string;
  hair: string;
  hairStyle: "crew" | "receding" | "bald" | "short" | "long" | "parted" | "bob";
  brow: string;
  browStyle?: "thick" | "thin";
  pupil: string;
  white: string;
  mouth: string;
  lip?: string;
  glasses?: string;
  lens?: string;
  cheek?: string;
  wrinkle?: string;
  stubble?: string;
  /** Pupils look toward the centre (default) or straight. */
  gaze?: "in" | "out";
}

function paintHair(p: SkinPainter, f: FaceSpec): void {
  const H = f.hair;
  const S = f.skin;
  // Top
  if (f.hairStyle === "bald") p.fill("head", "top", S);
  else if (f.hairStyle === "receding") {
    p.fill("head", "top", H);
    p.rect("head", "top", 2, 4, 4, 4, S);
  } else p.fill("head", "top", H);
  // Back
  p.fill("head", "back", S);
  const backRows = f.hairStyle === "long" ? 8 : f.hairStyle === "bob" ? 7 : f.hairStyle === "bald" ? 0 : 6;
  if (f.hairStyle === "bald") p.rect("head", "back", 0, 1, 8, 4, H);
  else p.rect("head", "back", 0, 0, 8, backRows, H);
  // Sides
  for (const side of ["left", "right"] as const) {
    p.fill("head", side, S);
    const rows = f.hairStyle === "long" ? 8 : f.hairStyle === "bob" ? 6 : f.hairStyle === "crew" ? 2 : 3;
    if (f.hairStyle !== "bald") p.rect("head", side, 0, 0, 8, rows, H);
    else p.rect("head", side, 0, 2, 8, 2, H);
    // sideburn towards the face, ear in the middle
    if (f.hairStyle !== "long" && f.hairStyle !== "bob") {
      const front = side === "left" ? 0 : 7; // face-local column nearest the face
      p.rect("head", side, front, 0, 1, 4, f.hairStyle === "bald" ? S : H);
    }
    p.rect("head", side, 3, 3, 2, 2, f.shadow);
  }
  p.fill("head", "bottom", f.shadow);
  p.grain("head", ["top", "back", "left", "right"], 0.06, 7);
}

function paintFace(p: SkinPainter, f: FaceSpec, e: Expr): void {
  const S = f.skin;
  const D = f.shadow;
  p.fill("head", "front", S);
  // Hairline
  switch (f.hairStyle) {
    case "crew":
      p.rect("head", "front", 0, 0, 8, 1, f.hair);
      p.px("head", "front", 0, 1, f.hair).px("head", "front", 7, 1, f.hair);
      break;
    case "short":
      p.rect("head", "front", 0, 0, 8, 1, f.hair);
      p.rect("head", "front", 0, 1, 2, 1, f.hair).px("head", "front", 7, 1, f.hair);
      break;
    case "parted":
      p.rect("head", "front", 0, 0, 8, 1, f.hair);
      p.rect("head", "front", 4, 1, 4, 1, f.hair).px("head", "front", 0, 1, f.hair);
      break;
    case "long":
    case "bob":
      p.rect("head", "front", 0, 0, 8, 1, f.hair);
      p.rect("head", "front", 0, 1, 3, 1, f.hair).rect("head", "front", 6, 1, 2, 1, f.hair);
      p.rect("head", "front", 0, 2, 1, 6, f.hair).rect("head", "front", 7, 2, 1, 6, f.hair);
      break;
    case "receding":
      p.px("head", "front", 0, 0, f.hair).px("head", "front", 7, 0, f.hair);
      p.px("head", "front", 0, 1, f.hair).px("head", "front", 7, 1, f.hair);
      break;
    case "bald":
      break;
  }
  if (f.wrinkle) p.rect("head", "front", 2, 1, 4, 1, f.wrinkle);

  // Brows
  const browLeftY = e === "scream" || e === "pain" || e === "awkward" ? 1 : 2;
  const thick = (f.browStyle ?? "thick") === "thick";
  const brow = (x: number, y: number) => p.px("head", "front", x, y, f.brow);
  if (e === "grim" || e === "squint") {
    brow(1, 2); brow(2, 2); brow(5, 2); brow(6, 2);
    p.px("head", "front", 2, 3, f.brow).px("head", "front", 5, 3, f.brow);
  } else if (e === "scream" || e === "pain") {
    brow(1, 2); brow(2, browLeftY); brow(5, browLeftY); brow(6, 2);
  } else if (e === "awkward") {
    brow(1, 2); brow(2, 2); brow(5, 1); brow(6, 1);
  } else {
    if (thick) { brow(1, 2); brow(2, 2); brow(5, 2); brow(6, 2); }
    else { brow(1, 2); brow(2, 2); brow(5, 2); brow(6, 2); }
  }

  // Eyes (row 3). Column 1/6 are the outer corners, 2/5 the inner.
  const gazeIn = (f.gaze ?? "in") === "in";
  const outer = (x: number, c: string) => p.px("head", "front", x, 3, c);
  switch (e) {
    case "blink":
    case "dead":
      p.rect("head", "front", 1, 3, 2, 1, D).rect("head", "front", 5, 3, 2, 1, D);
      if (e === "dead") p.px("head", "front", 2, 3, f.pupil).px("head", "front", 5, 3, f.pupil);
      break;
    case "laugh":
      p.rect("head", "front", 1, 3, 2, 1, f.pupil).rect("head", "front", 5, 3, 2, 1, f.pupil);
      p.px("head", "front", 1, 4, D).px("head", "front", 6, 4, D);
      break;
    case "squint":
      outer(1, D); outer(6, D);
      p.px("head", "front", 2, 3, f.pupil).px("head", "front", 5, 3, f.pupil);
      break;
    case "scream":
      p.rect("head", "front", 1, 3, 2, 1, f.white).rect("head", "front", 5, 3, 2, 1, f.white);
      p.px("head", "front", gazeIn ? 2 : 1, 3, f.pupil).px("head", "front", gazeIn ? 5 : 6, 3, f.pupil);
      break;
    default:
      if (gazeIn) {
        outer(1, f.white); outer(6, f.white);
        p.px("head", "front", 2, 3, f.pupil).px("head", "front", 5, 3, f.pupil);
      } else {
        outer(2, f.white); outer(5, f.white);
        p.px("head", "front", 1, 3, f.pupil).px("head", "front", 6, 3, f.pupil);
      }
  }
  if (f.glasses) {
    const G = f.glasses;
    p.px("head", "front", 0, 3, G).px("head", "front", 3, 3, G).px("head", "front", 4, 3, G).px("head", "front", 7, 3, G);
    if (f.lens && e !== "blink" && e !== "laugh" && e !== "dead") {
      p.px("head", "front", gazeIn ? 1 : 2, 3, f.lens).px("head", "front", gazeIn ? 6 : 5, 3, f.lens);
    }
  }

  // Nose and cheeks
  p.rect("head", "front", 3, 4, 2, 1, D);
  if (f.cheek) p.px("head", "front", 1, 5, f.cheek).px("head", "front", 6, 5, f.cheek);
  if (f.stubble) p.rect("head", "front", 1, 6, 6, 2, f.stubble).px("head", "front", 0, 7, f.stubble).px("head", "front", 7, 7, f.stubble);

  // Mouth (rows 5-7)
  const M = f.mouth;
  const L = f.lip ?? M;
  switch (e) {
    case "talk":
      p.rect("head", "front", 3, 6, 2, 1, M).rect("head", "front", 3, 7, 2, 1, L);
      break;
    case "smileTalk":
      p.px("head", "front", 2, 5, M).px("head", "front", 5, 5, M);
      p.rect("head", "front", 3, 6, 2, 1, M).rect("head", "front", 3, 7, 2, 1, L);
      break;
    case "smile":
      p.px("head", "front", 2, 5, M).px("head", "front", 5, 5, M);
      p.rect("head", "front", 3, 6, 2, 1, M);
      break;
    case "laugh":
      p.px("head", "front", 1, 5, M).px("head", "front", 6, 5, M);
      p.rect("head", "front", 2, 6, 4, 1, M).rect("head", "front", 3, 7, 2, 1, L);
      break;
    case "scream":
      p.rect("head", "front", 2, 5, 4, 1, M).rect("head", "front", 2, 6, 4, 2, L);
      p.rect("head", "front", 3, 6, 2, 1, M);
      break;
    case "pain":
      p.rect("head", "front", 2, 6, 4, 1, "#e8e4da").rect("head", "front", 2, 7, 4, 1, M);
      break;
    case "awkward":
      p.rect("head", "front", 3, 6, 3, 1, M).px("head", "front", 6, 5, M);
      break;
    case "grim":
      p.rect("head", "front", 2, 6, 4, 1, M);
      break;
    case "dead":
      p.rect("head", "front", 3, 6, 2, 2, M);
      break;
    default:
      p.rect("head", "front", 2, 6, 4, 1, M);
      p.px("head", "front", 2, 6, D).px("head", "front", 5, 6, D);
  }
  // Jaw shading
  p.px("head", "front", 0, 7, D).px("head", "front", 7, 7, D);
}

/** Base body sheet: head plus bare limbs (always redressed by a clothing sheet). */
function paintBody(p: SkinPainter, f: FaceSpec, e: Expr): void {
  paintHair(p, f);
  paintFace(p, f, e);
  for (const arm of ["armR", "armL"] as const) {
    p.fill(arm, "all", f.skin);
    p.fill(arm, "bottom", f.shadow);
  }
  p.fill("torso", "all", "#d8d4cc");
  for (const leg of ["legR", "legL"] as const) p.fill(leg, "all", "#55565a");
}

/* ======================================================================== */
/*  Costumes (clothing sheets)                                               */
/* ======================================================================== */

type Painter = (p: SkinPainter) => void;

const ARMS = ["armR", "armL"] as const;
const LEGS = ["legR", "legL"] as const;

/** Leave the bottom `rows` of each arm transparent so the painted hands show. */
function sleeves(p: SkinPainter, colour: string, cuff: string | null, handRows = 2): void {
  for (const a of ARMS) {
    p.fill(a, "all", colour);
    p.clear(a, "bottom");
    for (const face of ["front", "back", "left", "right"] as const) {
      p.erase(a, face, 0, 12 - handRows, 4, handRows);
      if (cuff) p.rect(a, face, 0, 12 - handRows - 1, 4, 1, cuff);
    }
  }
}

function trousers(p: SkinPainter, colour: string, shoe: string, sole?: string): void {
  for (const l of LEGS) {
    p.fill(l, "all", colour);
    for (const face of ["front", "back", "left", "right"] as const) p.rect(l, face, 0, 10, 4, 2, shoe);
    p.fill(l, "bottom", sole ?? shoe);
    if (sole) for (const face of ["front", "back", "left", "right"] as const) p.rect(l, face, 0, 11, 4, 1, sole);
  }
}

/** Zhang, civilian: dark navy wool coat over a white shirt. */
export const coatNavy: Painter = (p) => {
  const coat = "#1f2636";
  const coatDark = "#161b27";
  p.fill("torso", "all", coat);
  // shirt collar and lapels
  p.rect("torso", "front", 3, 0, 2, 2, "#e9e6df");
  p.px("torso", "front", 3, 2, "#e9e6df");
  p.rect("torso", "front", 2, 0, 1, 3, coatDark).rect("torso", "front", 5, 0, 1, 3, coatDark);
  p.rect("torso", "front", 4, 2, 1, 10, coatDark);
  p.px("torso", "front", 3, 5, "#3a4256").px("torso", "front", 3, 8, "#3a4256");
  p.rect("torso", "front", 0, 8, 2, 1, coatDark).rect("torso", "front", 6, 8, 2, 1, coatDark);
  p.rect("torso", "top", 2, 1, 4, 2, "#e9e6df");
  sleeves(p, coat, coatDark, 2);
  trousers(p, "#24262b", "#0e0e10");
  // coat tails over the thighs
  for (const l of LEGS) for (const face of ["front", "back", "left", "right"] as const) p.rect(l, face, 0, 0, 4, 4, coat);
  p.rect("legR", "front", 3, 0, 1, 4, coatDark);
  p.rect("legL", "front", 0, 0, 1, 4, coatDark);
  p.grain("torso", "all", 0.07, 3);
  for (const a of ARMS) p.grain(a, "all", 0.07, 4);
};

/** Zhang, basement: dark olive knit sweater, sleeves pushed up a little. */
export const sweaterOlive: Painter = (p) => {
  const knit = "#3c4134";
  p.fill("torso", "all", knit);
  p.rect("torso", "front", 2, 0, 4, 1, "#2d3127");
  p.rect("torso", "front", 0, 11, 8, 1, "#2d3127");
  for (let y = 1; y < 11; y += 2) p.rect("torso", "front", 0, y, 8, 1, "#41463a");
  sleeves(p, knit, "#2d3127", 3);
  trousers(p, "#2a2b2e", "#111112");
  p.grain("torso", "all", 0.1, 11);
  for (const a of ARMS) p.grain(a, "all", 0.1, 12);
};

/** Workshop: a grey technician's jacket over the coat silhouette. */
export const jacketGrey: Painter = (p) => {
  const j = "#4a4f57";
  p.fill("torso", "all", j);
  p.rect("torso", "front", 3, 0, 2, 1, "#e9e6df");
  p.rect("torso", "front", 4, 1, 1, 11, "#3a3e45");
  p.rect("torso", "front", 1, 4, 2, 2, "#3e434a").rect("torso", "front", 5, 4, 2, 2, "#3e434a");
  sleeves(p, j, "#3a3e45", 2);
  trousers(p, "#24262b", "#0e0e10");
  p.grain("torso", "all", 0.06, 21);
};

/** The collector: brown knit cardigan, pale shirt, old Beijing cloth shoes. */
export const cardigan: Painter = (p) => {
  const c = "#6d4a33";
  const cd = "#563826";
  p.fill("torso", "all", c);
  p.rect("torso", "front", 3, 0, 2, 3, "#b9c7cf");
  p.px("torso", "front", 2, 0, "#b9c7cf").px("torso", "front", 5, 0, "#b9c7cf");
  p.rect("torso", "front", 4, 3, 1, 9, cd);
  for (const y of [4, 6, 8, 10]) p.px("torso", "front", 3, y, "#d8c9a3");
  p.rect("torso", "front", 0, 7, 2, 2, cd).rect("torso", "front", 6, 7, 2, 2, cd);
  p.rect("torso", "top", 2, 1, 4, 2, "#b9c7cf");
  sleeves(p, c, cd, 2);
  trousers(p, "#3a3b40", "#1b1b1d", "#e7e1d3");
  p.grain("torso", "all", 0.12, 31);
  for (const a of ARMS) p.grain(a, "all", 0.12, 32);
};

export interface SuitOptions {
  stripe: string;
  /** "glove": bulky EVA glove; "thin": the cloth liner glove. */
  gloveR?: "glove" | "thin";
  /** 0..1 frost on the thin liner glove. */
  frost?: number;
  flag?: boolean;
  rank?: boolean;
  seed?: number;
}

export function suitPainter(o: SuitOptions): Painter {
  return (p) => {
    const W = "#e6e6e1";
    const P = "#c3c7cc";
    const J = "#8e96a0";
    const ring = "#a9b0b9";
    p.fill("torso", "all", W);
    // chest control box with indicator lights
    p.rect("torso", "front", 2, 3, 4, 3, "#4b525c");
    p.px("torso", "front", 2, 3, "#58d27a").px("torso", "front", 3, 3, "#e2b23c").px("torso", "front", 5, 4, "#d24a3a");
    p.rect("torso", "front", 0, 0, 8, 1, P);
    p.rect("torso", "front", 0, 9, 8, 1, J);
    p.rect("torso", "front", 1, 10, 2, 1, P).rect("torso", "front", 5, 10, 2, 1, P);
    p.rect("torso", "back", 0, 0, 8, 12, P);
    p.rect("torso", "left", 0, 9, 4, 1, J).rect("torso", "right", 0, 9, 4, 1, J);
    if (o.rank) p.rect("torso", "front", 6, 1, 1, 1, "#d8b44a");
    p.grain("torso", "all", 0.04, (o.seed ?? 1) + 40);

    for (const a of ARMS) {
      p.fill(a, "all", W);
      for (const face of ["front", "back", "left", "right"] as const) {
        p.rect(a, face, 0, 2, 4, 1, o.stripe);
        p.rect(a, face, 0, 5, 4, 1, J); // elbow joint
        p.rect(a, face, 0, 8, 4, 1, ring); // wrist ring
        p.rect(a, face, 0, 9, 4, 3, "#dcdcd6"); // glove
      }
      p.fill(a, "bottom", "#cfcfc9");
      p.fill(a, "top", W);
    }
    if (o.flag) {
      p.rect("armL", "left", 1, 0, 2, 2, "#c8302a");
      p.px("armL", "left", 1, 0, "#f1d34a");
      p.rect("armL", "front", 1, 0, 2, 1, "#c8302a");
    }
    if ((o.gloveR ?? "glove") === "thin") {
      const frost = o.frost ?? 0;
      for (const face of ["front", "back", "left", "right"] as const) {
        p.rect("armR", face, 0, 9, 4, 3, "#80848b");
        p.rect("armR", face, 0, 8, 4, 1, "#c9ced6");
        // frost creeps from the fingertips upward
        const rows = Math.round(frost * 3);
        for (let r = 0; r < rows; r++) {
          for (let x = 0; x < 4; x++) {
            if (hash1(x * 7 + r * 13 + face.length * 3) < 0.35 + frost * 0.55) p.px("armR", face, x, 11 - r, "#dfe9f2");
          }
        }
      }
      p.fill("armR", "bottom", frost > 0.4 ? "#dfe9f2" : "#80848b");
    }

    for (const l of LEGS) {
      p.fill(l, "all", W);
      for (const face of ["front", "back", "left", "right"] as const) {
        p.rect(l, face, 0, 4, 4, 1, J); // knee
        p.rect(l, face, 0, 8, 4, 4, "#d2d3cf"); // boot
        p.rect(l, face, 0, 11, 4, 1, "#5d636b");
      }
      p.fill(l, "bottom", "#3d4248");
    }
    // the thigh work pocket that holds the pistol
    p.rect("legR", "right", 0, 1, 4, 3, P);
    p.rect("legR", "right", 0, 1, 4, 1, J);
  };
}

/* ======================================================================== */
/*  Actor                                                                    */
/* ======================================================================== */

export interface ActorOptions {
  face: FaceSpec;
  heightM?: number;
  arm?: "classic" | "slim";
  exprs?: Expr[];
  outfits: Record<string, Painter>;
  outfit?: string;
}

/**
 * A cast member: one kit figure plus its painted expression sheets and
 * wardrobe. Everything structural comes from `createFigure`.
 */
export class Actor {
  readonly holder = new THREE.Group();
  readonly fig: Figure;
  readonly face: FaceSpec;
  private readonly bodies = new Map<Expr, THREE.Texture>();
  private readonly wardrobe = new Map<string, Skin>();
  private readonly painters: Record<string, Painter>;
  private exprNow: Expr | null = null;
  private outfitNow: string | null = null;
  private readonly arm: "classic" | "slim";

  constructor(o: ActorOptions) {
    this.face = o.face;
    this.arm = o.arm ?? "classic";
    this.painters = o.outfits;
    for (const e of o.exprs ?? ["neutral", "blink", "talk"]) this.bodyFor(e);
    const first = o.outfit ?? Object.keys(o.outfits)[0]!;
    this.fig = createFigure({
      body: this.bodyFor("neutral"),
      clothes: this.clothesFor(first).texture,
      heightM: o.heightM ?? 1.78,
      arm: this.arm,
    });
    this.exprNow = "neutral";
    this.outfitNow = first;
    this.holder.add(this.fig.root);
  }

  private bodyFor(e: Expr): THREE.Texture {
    let tex = this.bodies.get(e);
    if (!tex) {
      tex = createSkin((p) => paintBody(p, this.face, e), { arm: this.arm }).texture;
      this.bodies.set(e, tex);
    }
    return tex;
  }

  private clothesFor(name: string): Skin {
    let skin = this.wardrobe.get(name);
    if (!skin) {
      const painter = this.painters[name];
      if (!painter) throw new Error(`unknown outfit ${name}`);
      skin = createSkin(painter, { transparent: true, arm: this.arm });
      this.wardrobe.set(name, skin);
    }
    return skin;
  }

  /** Register (or replace) an outfit painter at runtime, e.g. a frost stage. */
  addOutfit(name: string, painter: Painter): void {
    this.painters[name] = painter;
  }

  setExpr(e: Expr): void {
    if (e === this.exprNow) return;
    this.exprNow = e;
    this.fig.setBody(this.bodyFor(e));
  }

  setOutfit(name: string): void {
    if (name === this.outfitNow) return;
    this.outfitNow = name;
    this.fig.setClothes(this.clothesFor(name).texture);
  }

  pose(p: Pose): void {
    applyPose(this.fig, p);
  }

  /** Expression with blinks and lip flap layered on top. */
  perform(t: number, base: Expr, speaking: boolean, seed = 0): void {
    let e = base;
    if (speaking) {
      const open = Math.sin(t * 23.0 + seed) + Math.sin(t * 14.3 + seed * 2.1) * 0.8 > 0.15;
      if (open) e = base === "smile" || base === "laugh" ? "smileTalk" : "talk";
      else if (base === "laugh") e = "smile";
    }
    if (!speaking && (e === "neutral" || e === "smile" || e === "grim" || e === "awkward")) {
      if (blinking(t, seed)) e = "blink";
    }
    this.setExpr(e);
  }
}

export function blinking(t: number, seed: number): boolean {
  const period = 3.3 + (seed % 7) * 0.31;
  const phase = (((t + seed * 1.37) % period) + period) % period;
  return phase < 0.14;
}

/* ======================================================================== */
/*  Spacesuit hardware hung on the kit's anchors                             */
/* ======================================================================== */

let helmetGeo: THREE.BufferGeometry | null = null;
let packGeo: THREE.BufferGeometry | null = null;

/** Helmet shell in figure px: a bevelled block with a window for the visor. */
function helmetGeometry(): THREE.BufferGeometry {
  if (helmetGeo) return helmetGeo;
  const n = 26;
  const g = new VoxelGrid(n, n, n);
  const W = 0xe7e7e2;
  const band = 0xc5c9ce;
  const ring = 0x5b6168;
  g.fill((x, y, z) => {
    const shell = x === 0 || y === 0 || z === 0 || x === n - 1 || y === n - 1 || z === n - 1;
    const thick = x <= 1 || y <= 1 || z <= 1 || x >= n - 2 || y >= n - 2 || z >= n - 2;
    if (!shell && !thick) return null;
    // bevel the edges
    const ex = x <= 1 || x >= n - 2;
    const ey = y <= 1 || y >= n - 2;
    const ez = z <= 1 || z >= n - 2;
    if ((ex && ey) || (ey && ez) || (ex && ez)) {
      const cx = Math.min(x, n - 1 - x);
      const cy = Math.min(y, n - 1 - y);
      const cz = Math.min(z, n - 1 - z);
      if (cx + cy + cz < 2) return null;
    }
    // visor window on the front face
    if (z >= n - 2 && x >= 3 && x <= n - 4 && y >= 4 && y <= 19) {
      const corner = (x <= 3 || x >= n - 4) && (y <= 4 || y >= 19);
      if (!corner) return null;
    }
    if (y <= 2) return ring;
    if (y >= 20 && y <= 21) return band;
    return W;
  });
  helmetGeo = g.geometry(0.4, "center");
  return helmetGeo;
}

function packGeometry(): THREE.BufferGeometry {
  if (packGeo) return packGeo;
  const g = new VoxelGrid(18, 22, 8);
  g.fill((x, y, z) => {
    const nozzle = (x <= 1 || x >= 16) && (y <= 1 || y >= 20) && z <= 1;
    if (nozzle) return 0x3b3f45;
    if (z === 0 && x >= 4 && x <= 13 && y >= 5 && y <= 16) return 0xcfd2d6;
    if (y === 10 || y === 11) return 0xb9bec4;
    return 0xe2e2dd;
  });
  packGeo = g.geometry(0.5, "center");
  return packGeo;
}

export interface SuitRig {
  helmet: THREE.Mesh;
  visor: THREE.Mesh;
  visorMat: THREE.MeshStandardMaterial;
  crack: THREE.Mesh;
  crackMat: THREE.MeshBasicMaterial;
  pack: THREE.Mesh;
  /** Local positions (pack space) of the four thruster nozzles. */
  nozzles: THREE.Vector3[];
  helmetLamp: THREE.Mesh[];
  /** 0 = gold sun visor, 1 = clear. */
  setVisor(clear: number): void;
  setCrack(amount: number): void;
}

const GOLD = new THREE.Color("#d6a443");
const CLEAR = new THREE.Color("#f4f8ff");

export function suitUp(actor: Actor, crackTexture?: THREE.Texture): SuitRig {
  const headAnchor = actor.fig.anchors.head;
  const helmet = new THREE.Mesh(helmetGeometry(), voxelMaterial({ roughness: 0.55, metalness: 0.05 }));
  helmet.position.set(0, -4.0, 0);
  helmet.castShadow = true;
  headAnchor.add(helmet);

  const visorMat = new THREE.MeshStandardMaterial({
    color: GOLD.clone(),
    metalness: 1,
    roughness: 0.18,
    transparent: true,
    opacity: 0.94,
    envMapIntensity: 1.6,
    depthWrite: false,
  });
  const visor = new THREE.Mesh(new THREE.BoxGeometry(8.2, 6.2, 0.16), visorMat);
  visor.position.set(0, -4.5, 4.95);
  visor.renderOrder = 6;
  headAnchor.add(visor);

  const crackMat = new THREE.MeshBasicMaterial({
    map: crackTexture ?? null,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const crack = new THREE.Mesh(new THREE.PlaneGeometry(8.2, 6.2), crackMat);
  crack.position.set(0, -4.5, 5.06);
  crack.renderOrder = 7;
  crack.visible = false;
  headAnchor.add(crack);

  const lamps: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const lamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.4),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#fff3d6").multiplyScalar(2.2) }),
    );
    lamp.position.set(side * 4.3, -0.9, 5.1);
    headAnchor.add(lamp);
    lamps.push(lamp);
  }

  const pack = new THREE.Mesh(packGeometry(), voxelMaterial({ roughness: 0.6 }));
  pack.position.set(0, 0.4, -2.0);
  pack.castShadow = true;
  actor.fig.anchors.back.add(pack);
  const nozzles = [
    new THREE.Vector3(-4.0, -5.0, -2.2),
    new THREE.Vector3(4.0, -5.0, -2.2),
    new THREE.Vector3(-4.0, 5.0, -2.2),
    new THREE.Vector3(4.0, 5.0, -2.2),
  ];

  const rig: SuitRig = {
    helmet,
    visor,
    visorMat,
    crack,
    crackMat,
    pack,
    nozzles,
    helmetLamp: lamps,
    setVisor(clear) {
      const c = Math.min(1, Math.max(0, clear));
      visorMat.color.copy(GOLD).lerp(CLEAR, c);
      visorMat.metalness = 1 - c * 0.92;
      visorMat.roughness = 0.18 - c * 0.12;
      visorMat.opacity = 0.94 - c * 0.84;
      visorMat.envMapIntensity = 1.6 - c * 0.9;
    },
    setCrack(amount) {
      crack.visible = amount > 0.001;
      crackMat.opacity = Math.min(1, amount);
    },
  };
  rig.setVisor(0);
  return rig;
}

/** Pixel-art crack and blood spatter for a shattered visor (82 x 62 canvas). */
export function crackTexture(seed: number): THREE.CanvasTexture {
  const w = 82;
  const h = 62;
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d")!;
  const img = ctx.getImageData(0, 0, w, h);
  const put = (x: number, y: number, r: number, g: number, b: number, a: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = (Math.floor(y) * w + Math.floor(x)) * 4;
    img.data[i] = r;
    img.data[i + 1] = g;
    img.data[i + 2] = b;
    img.data[i + 3] = a;
  };
  // milky fog over most of the visor
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = hash1(x * 31 + y * 17 + seed);
      put(x, y, 205 + k * 30, 212 + k * 25, 220 + k * 20, 150 + k * 60);
    }
  }
  // radiating cracks from the impact point
  const cx = 30 + (seed % 5) * 4;
  const cy = 28;
  for (let r = 0; r < 14; r++) {
    let x = cx;
    let y = cy;
    let a = (r / 14) * Math.PI * 2 + hash1(seed + r) * 0.4;
    const len = 18 + hash1(r * 3 + seed) * 40;
    for (let s = 0; s < len; s++) {
      put(x, y, 250, 252, 255, 255);
      a += (hash1(r * 91 + s + seed) - 0.5) * 0.35;
      x += Math.cos(a);
      y += Math.sin(a);
    }
  }
  // blood: dense near the impact, flecks outwards
  for (let i = 0; i < 260; i++) {
    const ang = hash1(i * 7 + seed) * Math.PI * 2;
    const dist = Math.pow(hash1(i * 13 + seed), 1.8) * 30;
    const x = cx + Math.cos(ang) * dist * 1.3;
    const y = cy + Math.sin(ang) * dist * 0.9 + 4;
    const s = hash1(i * 5) < 0.2 ? 2 : 1;
    for (let dy = 0; dy < s; dy++) for (let dx = 0; dx < s; dx++) put(x + dx, y + dy, 120 + hash1(i) * 40, 8, 12, 255);
  }
  ctx.putImageData(img, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ======================================================================== */
/*  The cast                                                                 */
/* ======================================================================== */

export const ZHANG_FACE: FaceSpec = {
  skin: "#c79a74",
  shadow: "#a77c5c",
  hair: "#16130f",
  hairStyle: "crew",
  brow: "#1a1612",
  pupil: "#141419",
  white: "#d9d3ca",
  mouth: "#6a3d33",
  lip: "#4a2420",
  stubble: "#b48d6c",
};

export const COLLECTOR_FACE: FaceSpec = {
  skin: "#d4a07c",
  shadow: "#b58262",
  hair: "#9a9792",
  hairStyle: "receding",
  brow: "#6d6a66",
  browStyle: "thin",
  pupil: "#2a2420",
  white: "#e7e1d8",
  mouth: "#7a3b33",
  lip: "#5a2420",
  glasses: "#3a2c22",
  lens: "#c9d6dc",
  cheek: "#d98e74",
  wrinkle: "#c08d6c",
};

const SKINS = ["#c99c78", "#d6a985", "#bf8f6b", "#e0b493", "#b88763", "#cfa07d"];
const SHADOWS = ["#a87e5f", "#b88b6b", "#a07254", "#c39878", "#986c4d", "#ad8263"];
const HAIRS = ["#17130f", "#221a14", "#2b2219", "#3a2f25", "#121010"];

/** Deterministic crowd face. */
export function crowdFace(i: number): FaceSpec {
  const k = (n: number) => Math.floor(hash1(i * 13.7 + n * 3.1) * 1000);
  const s = k(1) % SKINS.length;
  const styles: FaceSpec["hairStyle"][] = ["short", "parted", "crew", "bob", "short", "long", "parted"];
  const hairStyle = styles[k(2) % styles.length]!;
  const female = hairStyle === "bob" || hairStyle === "long";
  return {
    skin: SKINS[s]!,
    shadow: SHADOWS[s]!,
    hair: HAIRS[k(3) % HAIRS.length]!,
    hairStyle,
    brow: "#1d1814",
    browStyle: female ? "thin" : "thick",
    pupil: "#161417",
    white: "#e1dbd2",
    mouth: female ? "#9a4b4b" : "#73423a",
    lip: "#4e2222",
    glasses: k(4) % 5 === 0 ? "#2a2a2e" : undefined,
    lens: "#cbd7df",
    cheek: female ? "#d9947f" : undefined,
  };
}

/** The three veterans in the front row. */
export const TARGET_FACES: FaceSpec[] = [
  {
    skin: "#cf9f7d",
    shadow: "#ae7f60",
    hair: "#e6e4df",
    hairStyle: "short",
    brow: "#bdbab4",
    pupil: "#211c18",
    white: "#e5dfd6",
    mouth: "#7a4038",
    glasses: "#1c1c1f",
    lens: "#cfd9df",
    wrinkle: "#b9896a",
  },
  {
    skin: "#d6a684",
    shadow: "#b78666",
    hair: "#8f8c87",
    hairStyle: "parted",
    brow: "#5d5a56",
    browStyle: "thin",
    pupil: "#231d19",
    white: "#e5dfd6",
    mouth: "#7f3f37",
    cheek: "#dc947a",
    wrinkle: "#be8f6f",
  },
  {
    skin: "#c49371",
    shadow: "#a27455",
    hair: "#b5b2ad",
    hairStyle: "bald",
    brow: "#76736e",
    pupil: "#1e1a17",
    white: "#e2dcd3",
    mouth: "#6e3a33",
    glasses: "#7d6a4a",
    lens: "#d3dde2",
    wrinkle: "#a8795b",
  },
];
