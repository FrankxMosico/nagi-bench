import * as THREE from "three";
import { walk, type Pose } from "@agentbench/voxel-kit";
import { Actor } from "../cast/actors";
import { reach } from "../cast/ik";
import { COLLECTOR_BODY, ZHANG_BODY, clothTexture, paintCardigan, paintCoat, type Expression } from "../cast/skins";
import { blendPose, hash1, hash3, mix, mulberry32, numTrack, poseTrack, range, smooth, stateTrack, v3Track, wobble, type V3 } from "../core/anim";
import { Grid, MAT, shade } from "../core/vox";
import { makePhone, makeStone, makeTeacup, makeTeapot, stoneGrid } from "../props";

/**
 * Beijing, four months earlier. A grey-brick hutong at dusk and the
 * collector's dim courtyard room: a small private museum of stones under
 * warm cabinet light — his "small world".
 */

// ================================================================= exterior

export interface Alley {
  group: THREE.Group;
  zhang: Actor;
  pigeons: THREE.Group[];
  update(t: number): void;
}

const BRICK = [0x7c7f82, 0x74777a, 0x85888b, 0x6e7174];

export function buildAlley(): Alley {
  const group = new THREE.Group();
  group.name = "alley";
  const v = 0.125;
  const g = new Grid();
  const rnd = (x: number, y: number, z: number) => BRICK[Math.floor(hash3(Math.floor(x / 2) + (y % 2), y, z, 3) * 4)]!;
  // Ground: worn grey paving.
  g.box(-24, -1, -200, 24, 0, 24, (x, _y, z) => (x % 6 === 0 || z % 6 === 0 ? 0x4e5052 : hash3(x, 0, z, 1) < 0.5 ? 0x5d5f61 : 0x57595b));
  // Walls both sides, 3.2 m, with tile caps.
  for (const side of [-1, 1]) {
    const x0 = side < 0 ? -15 : 13;
    g.box(x0, 0, -200, x0 + 2, 26, 24, (x, y, z) => rnd(x, y, z));
    g.box(x0 - 1, 26, -200, x0 + 3, 27, 24, 0x3c3f42);
    g.box(x0 - 1, 27, -200, x0 + 3, 28, 24, (_x, _y, z) => (z % 2 === 0 ? 0x2f3235 : 0x45484b));
  }
  // Gatehouse on the right wall at z ≈ −12 m: red doors, stone drums, a little tiled roof.
  const gz = -96;
  g.clearBox(13, 0, gz - 8, 15, 22, gz + 8);
  g.box(13, 0, gz - 10, 16, 24, gz - 8, 0x5d6063);
  g.box(13, 0, gz + 8, 16, 24, gz + 10, 0x5d6063);
  g.box(12, 22, gz - 11, 17, 25, gz + 11, 0x3c2a22);
  for (let k = 0; k < 6; k++) g.box(11 - k, 25 + k, gz - 12, 18, 26 + k, gz + 12, (x, _y, z) => (z % 2 === 0 ? 0x2c2f32 : 0x3f4245));
  // Doors: left leaf ajar, right closed, painted vermilion with brass knockers.
  const door = 0x8e2b1f;
  g.box(14, 0, gz - 8, 15, 21, gz, (_x, y, z) => (y === 10 && (z === gz - 2) ? 0xc9a24a : (z === gz - 1 || y === 20) ? 0x6e2016 : door));
  g.box(14, 15, gz - 5, 15, 17, gz - 3, 0xd8b24c);
  g.box(14, 0, gz, 15, 1, gz + 8, 0x3a3a3a);
  // Stone drums.
  for (const dz of [gz - 11, gz + 9]) g.box(11, 0, dz, 13, 4, dz + 2, 0x9a9a94);
  // Threshold and step.
  g.box(11, 0, gz - 8, 14, 1, gz + 8, 0x8c8c86);
  const built = g.toGroup(v, [0, 0, 0], MAT);
  group.add(built);
  // The open right leaf swung inward, warm light behind.
  const leaf = new Grid();
  leaf.box(0, 0, 0, 1, 21, 8, (_x, y, z) => (y === 10 && z === 2 ? 0xc9a24a : y === 20 || z === 0 ? 0x6e2016 : door));
  const leafG = leaf.toGroup(v, [0, 0, 0]);
  leafG.position.set(15 * v, 0, gz * v);
  leafG.rotation.y = -1.1;
  group.add(leafG);
  const glowWall = new Grid();
  glowWall.box(0, 0, 0, 1, 20, 7, 0xffc078, true);
  const gw = glowWall.toGroup(v, [0, 0, 0], { ...MAT, glow: MAT.glowSoft });
  gw.position.set(19 * v, 0, (gz + 0.5) * v);
  group.add(gw);
  // "福" diamond on the closed leaf.
  const fu = new Grid();
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) if (Math.abs(i) + Math.abs(j) <= 3) fu.set(0, i, j, Math.abs(i) + Math.abs(j) === 3 ? 0xb22a1c : 0xd23a26);
  [[1, 1], [-1, 0], [0, -1], [1, -1], [-1, 1], [0, 0]].forEach(([a, b]) => fu.set(0, a!, b!, 0x1a1a1a));
  const fuG = fu.toGroup(0.06, [0, 0, 0]);
  fuG.position.set(14 * v - 0.01, 1.7, (gz + 4) * v);
  group.add(fuG);

  // Jujube branch over the wall, bare.
  const tree = new Grid();
  const tr = mulberry32(5);
  const branch = (x: number, y: number, z: number, dx: number, dy: number, dz: number, n: number, depth: number) => {
    let px = x, py = y, pz = z;
    for (let i = 0; i < n; i++) {
      px += dx + (tr() - 0.5) * 0.6;
      py += dy + (tr() - 0.5) * 0.3;
      pz += dz + (tr() - 0.5) * 0.6;
      tree.set(Math.round(px), Math.round(py), Math.round(pz), 0x2a201a);
      if (depth > 0 && tr() < 0.12) branch(px, py, pz, dx * 0.5 + (tr() - 0.5), 0.5 + tr() * 0.4, dz * 0.5 + (tr() - 0.5), Math.floor(n * 0.5), depth - 1);
    }
  };
  branch(-20, 18, -60, 0.55, 0.45, 0.1, 30, 3);
  branch(-19, 18, -66, 0.6, 0.6, -0.2, 26, 3);
  const treeG = tree.toGroup(v, [0, 0, 0]);
  group.add(treeG);

  // Overhead wires.
  const wire = new Grid();
  for (let z = 10; z > -190; z--) wire.set(Math.round(Math.sin(z * 0.05) * 1), 30 + Math.round(Math.abs(Math.sin(z * 0.04)) * 2), z, 0x1c1c1c);
  const wireG = wire.toGroup(v, [0, 0, 0]);
  group.add(wireG);
  // Bicycle leaning on the left wall.
  const bike = new Grid();
  for (let a = 0; a < 24; a++) {
    const ang = (a / 24) * Math.PI * 2;
    bike.set(0, Math.round(3 + Math.sin(ang) * 3), Math.round(Math.cos(ang) * 3), 0x1a1a1a);
    bike.set(0, Math.round(3 + Math.sin(ang) * 3), Math.round(10 + Math.cos(ang) * 3), 0x1a1a1a);
  }
  for (let z = 0; z <= 10; z++) bike.set(0, 3 + Math.round((z / 10) * 3 * (z < 5 ? 1 : 0)), z, 0x2f4a6a);
  bike.box(0, 6, 1, 1, 7, 9, 0x2f4a6a);
  bike.box(0, 7, 8, 1, 10, 9, 0x2f4a6a);
  bike.box(0, 10, 7, 1, 11, 11, 0x1a1a1a);
  bike.box(0, 7, 2, 1, 8, 4, 0x3a2a1a);
  const bikeG = bike.toGroup(v, [0, 0, 0]);
  bikeG.position.set(-1.65, 0, -6.5);
  bikeG.rotation.z = 0.12;
  group.add(bikeG);
  // Street lamp bracket on the left wall.
  const lamp = new Grid();
  lamp.box(0, 0, 0, 4, 1, 1, 0x2a2a2a);
  lamp.box(3, -2, 0, 4, 0, 1, 0x2a2a2a);
  lamp.box(2, -3, -1, 5, -2, 2, 0xffd28a, true);
  const lampG = lamp.toGroup(v, [0, 0, 0]);
  lampG.position.set(-1.6, 2.9, -18);
  group.add(lampG);

  // Dusk sky: a gradient dome.
  const sky = new THREE.Mesh(new THREE.BoxGeometry(400, 200, 600), new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, depthWrite: false, fog: false }));
  {
    const geo = sky.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const col: number[] = [];
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const k = THREE.MathUtils.clamp((y + 20) / 120, 0, 1);
      const towardSun = THREE.MathUtils.clamp(-z / 300, 0, 1);
      c.setRGB(mix(1.4, 0.18, k) * mix(0.6, 1, towardSun), mix(0.62, 0.2, k) * mix(0.6, 1, towardSun), mix(0.38, 0.42, k));
      col.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  }
  sky.position.set(0, 60, -60);
  sky.renderOrder = -10;
  group.add(sky);

  // Light: a low sun at the far end of the alley, sky fill, the lamp.
  const sun = new THREE.DirectionalLight(0xffa860, 5.0);
  sun.position.set(-8, 7, -60);
  sun.target.position.set(0, 0, -8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 120 });
  sun.shadow.bias = -0.0005;
  group.add(sun, sun.target);
  group.add(new THREE.HemisphereLight(0x7a86b8, 0x5a4434, 1.7));
  const lampLight = new THREE.PointLight(0xffc27a, 3, 9, 2);
  lampLight.position.set(-1.25, 2.5, -18);
  group.add(lampLight);
  const doorLight = new THREE.PointLight(0xffb060, 6, 6, 2);
  doorLight.position.set(2.6, 1.4, -11.9);
  group.add(doorLight);

  // Pigeons wheeling overhead.
  const pigeons: THREE.Group[] = [];
  for (let k = 0; k < 7; k++) {
    const pg = new Grid();
    pg.box(-1, 0, -2, 2, 1, 2, 0x8c8f96);
    pg.set(0, 1, 2, 0x5a5e66).set(0, 0, 2, 0x5a5e66);
    const body = pg.toGroup(0.07, [0.5, 0.5, 0]);
    const wingL = new Grid().box(0, 0, -1, 4, 1, 2, 0x9a9da4).toGroup(0.07, [0, 0.5, 0]);
    const wingR = new Grid().box(-4, 0, -1, 0, 1, 2, 0x9a9da4).toGroup(0.07, [0, 0.5, 0]);
    wingL.position.x = 0.07;
    wingR.position.x = -0.07;
    const bird = new THREE.Group();
    bird.add(body, wingL, wingR);
    bird.userData.wings = [wingL, wingR];
    group.add(bird);
    pigeons.push(bird);
  }

  const zhang = new Actor("zhang", ZHANG_BODY, 1.8);
  zhang.wear(clothTexture("coat", paintCoat));
  group.add(zhang.root);

  const zpos = v3Track([
    [33, [0.3, 0, 1.5]],
    [39.2, [0.4, 0, -10.6]],
    [40.6, [1.3, 0, -11.9]],
    [42, [2.6, 0, -12]],
  ], (x) => x);
  const zyaw = numTrack([
    [33, Math.PI],
    [39.0, Math.PI],
    [40.4, Math.PI / 2 + 0.3],
  ]);

  return {
    group,
    zhang,
    pigeons,
    update(t: number) {
      const p = zpos(t);
      zhang.place(p[0], p[1], p[2], zyaw(t));
      zhang.pose(blendPose(walk(t, 0.9), { neck: [0.05, 0, 0] }, 0.2));
      zhang.face("neutral");
      pigeons.forEach((b, k) => {
        const a = t * 0.35 + k * 0.9;
        const r = 9 + (k % 3) * 2;
        b.position.set(Math.cos(a) * r, 9 + Math.sin(a * 1.7 + k) * 1.2 + k * 0.3, -16 + Math.sin(a) * r);
        b.rotation.set(0, -a, Math.sin(a) * 0.3);
        const flap = Math.sin(t * 14 + k * 2) * 0.7;
        const [wl, wr] = b.userData.wings as THREE.Object3D[];
        wl!.rotation.z = flap;
        wr!.rotation.z = -flap;
      });
    },
  };
}

// ================================================================= interior

export interface Room {
  group: THREE.Group;
  zhang: Actor;
  collector: Actor;
  cup: THREE.Group;
  zhangCup: THREE.Group;
  stones: THREE.Group[];
  heldStone: THREE.Group;
  phone: THREE.Group;
  radio: THREE.Group;
  pendulum: THREE.Object3D;
  cabinetDoor: THREE.Object3D;
  lampHead: THREE.Object3D;
  update(t: number): void;
  /** Handy world points for cameras. */
  marks: Record<string, THREE.Vector3>;
}

export const ROOM = { w: 7, d: 5, h: 3.2 };

/** Cabinet light strips: warm and modest, so the stones stay the subject. */
const STRIP_GLOW = new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(0.75, 0.7, 0.62) });

export function buildRoom(): Room {
  const group = new THREE.Group();
  group.name = "room";
  const v = 0.1;
  const g = new Grid();
  const X = 35; // half-width in cells
  const Z = 25;
  const H = 32;
  // Floor: square grey tiles.
  g.box(-X, -1, -Z, X, 0, Z, (x, _y, z) => ((x + 100) % 5 === 0 || (z + 100) % 5 === 0 ? 0x403c38 : hash3(Math.floor(x / 5), 0, Math.floor(z / 5), 2) < 0.5 ? 0x55514c : 0x4d4944));
  // Walls with dark timber wainscot and plaster above.
  const wall = (x: number, y: number, z: number) => {
    if (y < 9) return y === 8 ? 0x2a1a12 : hash3(x, y, z, 4) < 0.5 ? 0x3e2618 : 0x3a2316;
    return hash3(Math.floor(x / 3), Math.floor(y / 3), z, 6) < 0.15 ? 0xa59a86 : 0xb2a892;
  };
  g.box(-X - 1, 0, -Z - 1, X + 1, H, -Z, wall);
  g.box(-X - 1, 0, Z, X + 1, H, Z + 1, wall);
  g.box(-X - 1, 0, -Z, -X, H, Z, wall);
  g.box(X, 0, -Z, X + 1, H, Z, wall);
  // Ceiling beams.
  g.box(-X, H, -Z, X, H + 1, Z, 0x2a1d16);
  for (let x = -X; x < X; x += 8) g.box(x, H - 2, -Z, x + 2, H, Z, 0x3a2418);
  // Door (front-left) and lattice window (front-right).
  g.clearBox(-28, 0, Z, -18, 22, Z + 1);
  g.box(-29, 0, Z, -28, 23, Z + 1, 0x2a1810);
  g.box(-18, 0, Z, -17, 23, Z + 1, 0x2a1810);
  g.box(-29, 22, Z, -17, 23, Z + 1, 0x2a1810);
  g.clearBox(6, 10, Z, 26, 26, Z + 1);
  for (let x = 6; x < 26; x++) for (let y = 10; y < 26; y++) {
    const lattice = (x - 6) % 3 === 0 || (y - 10) % 3 === 0 || x === 25 || y === 25;
    if (lattice) g.set(x, y, Z, 0x3a2216);
  }
  const shell = g.toGroup(v, [0, 0, 0], MAT);
  group.add(shell);
  // Window paper glows with the dusk outside.
  const paper = new Grid();
  for (let x = 6; x < 26; x++) for (let y = 10; y < 26; y++) {
    const lattice = (x - 6) % 3 === 0 || (y - 10) % 3 === 0 || x === 25 || y === 25;
    if (!lattice) paper.set(x, y, 0, 0xffb878, true);
  }
  const paperG = paper.toGroup(v, [0, 0, 0], { ...MAT, glow: new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(0.9, 0.7, 0.55), transparent: true, opacity: 0.55, depthWrite: false }) });
  paperG.position.set(0, 0, (Z + 0.6) * v);
  group.add(paperG);

  // ---------------------------------------------------------------- cabinets
  const stoneGeos: Array<{ base: THREE.BufferGeometry; pal: string }> = [];
  const pals = ["iron", "chondrite", "stony", "pallasite", "mars", "iron", "chondrite", "stony"] as const;
  for (let k = 0; k < 12; k++) {
    const sg = stoneGrid({ radius: 3 + (k % 4), seed: k * 13 + 1, palette: pals[k % pals.length], squash: [1, 0.7 + (k % 3) * 0.1, 1.1] });
    const b = sg.build(0.012, [0, -3, 0]).base!;
    stoneGeos.push({ base: b, pal: pals[k % pals.length]! });
  }
  const cabinet = (cx: number, cz: number, rotY: number, widthCells: number, seed: number) => {
    const c = new Grid();
    const w = widthCells;
    const d = 5;
    const h = 22;
    const wood = 0x3b2417;
    c.box(0, 0, 0, w, h, d, (x, y, z) => {
      const frame = x === 0 || x === w - 1 || y === 0 || y === h - 1 || y < 6 || z === 0;
      if (frame) return y < 6 ? (y === 5 ? 0x24150d : wood) : wood;
      if (z === d - 1 && (x % 10 === 0)) return wood; // mullions
      if (y % 4 === 1 && z < d - 1) return y === h - 2 ? null : 0x5a3a28; // shelves
      return null;
    });
    // Light strips under each shelf.
    for (let y = 9; y < h - 1; y += 4) for (let x = 1; x < w - 1; x++) c.set(x, y + 3, 0, 0xffd6a0, true);
    const cg = c.toGroup(v, [w / 2, 0, d / 2], { ...MAT, glow: STRIP_GLOW });
    const holder = new THREE.Group();
    holder.add(cg);
    // Glass front.
    const glass = new THREE.Mesh(new THREE.BoxGeometry((w - 2) * v, (h - 7) * v, 0.01), MAT.glass);
    glass.position.set(0, (6 + (h - 7) / 2) * v, (d / 2 - 0.5) * v);
    holder.add(glass);
    // Stones on the shelves under spot light.
    const r = mulberry32(seed);
    for (let y = 9; y < h - 1; y += 4) {
      for (let x = 2; x < w - 2; x += 3 + Math.floor(r() * 2)) {
        const sgeo = stoneGeos[Math.floor(r() * stoneGeos.length)]!;
        const m = new THREE.Mesh(sgeo.base, sgeo.pal === "iron" ? MAT.metal : MAT.std);
        m.position.set((x - w / 2) * v, (y + 1) * v + 0.04, (r() - 0.5) * 0.12);
        m.rotation.y = r() * 6;
        m.castShadow = false;
        holder.add(m);
      }
    }
    const inner = new THREE.PointLight(0xffe6c0, 1.3, 1.6, 2);
    inner.position.set(0, (h - 2) * v, (d / 2 - 1.5) * v);
    holder.add(inner);
    holder.position.set(cx, 0, cz);
    holder.rotation.y = rotY;
    group.add(holder);
    return holder;
  };
  cabinet(-2.2, -2.2, 0, 22, 1);
  cabinet(0.2, -2.2, 0, 22, 2);
  cabinet(2.4, -2.2, 0, 18, 3);
  const leftCab = cabinet(-3.2, -0.6, Math.PI / 2, 22, 4);
  cabinet(-3.2, 1.6, Math.PI / 2, 14, 5);
  // The cabinet door the collector opens (left cabinet, hinged glass leaf).
  const cabinetDoor = new THREE.Group();
  const leafGlass = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.5, 0.012), new THREE.MeshStandardMaterial({ color: 0xaac4cc, transparent: true, opacity: 0.18, roughness: 0.05 }));
  leafGlass.position.set(0.45, 0, 0);
  const leafFrame = new Grid();
  leafFrame.box(0, 0, 0, 9, 15, 1, (x, y) => (x === 0 || x === 8 || y === 0 || y === 14 ? 0x3b2417 : null));
  const lf = leafFrame.toGroup(v, [0, 7.5, 0.5]);
  cabinetDoor.add(leafGlass, lf);
  cabinetDoor.position.set(-0.95, 1.35, 0.26);
  leftCab.add(cabinetDoor);

  // ---------------------------------------------------------------- worktable, lamp, radio, clock, safe
  const work = new Grid();
  work.box(0, 0, 0, 8, 8, 20, (x, y, z) => (y === 7 ? 0x5a3624 : (x === 0 || x === 7) && (z === 0 || z === 19) ? 0x3b2417 : y === 6 && (x === 0 || z === 0 || z === 19) ? 0x3b2417 : null));
  work.box(1, 7, 2, 7, 8, 18, 0x6a4430);
  const workG = work.toGroup(v, [4, 0, 10]);
  workG.position.set(3.0, 0, -0.4);
  group.add(workG);
  // Stool.
  const stool = new Grid();
  stool.box(0, 0, 0, 4, 5, 4, (x, y, z) => (y === 4 ? 0x5a3624 : (x === 0 || x === 3) && (z === 0 || z === 3) ? 0x3b2417 : null));
  const stoolG = stool.toGroup(v, [2, 0, 2]);
  stoolG.position.set(2.25, 0, -0.4);
  group.add(stoolG);
  // Magnifier lamp: clamp, two arms, ring head.
  const lampHead = new THREE.Group();
  {
    const arm = new Grid();
    arm.box(0, 0, 0, 1, 6, 1, 0x2a2a2a);
    arm.box(0, 6, 0, 1, 7, 6, 0x2a2a2a);
    const ag = arm.toGroup(v * 0.6, [0.5, 0, 0.5]);
    ag.position.set(3.25, 0.8, -1.0);
    ag.rotation.y = -Math.PI / 2 - 0.3;
    group.add(ag);
    const ring = new Grid();
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      ring.set(Math.round(Math.cos(ang) * 4), 0, Math.round(Math.sin(ang) * 4), 0x2a2a2a);
      ring.set(Math.round(Math.cos(ang) * 3), -1, Math.round(Math.sin(ang) * 3), 0xe8f4ff, true);
    }
    const rg = ring.toGroup(0.022, [0, 0, 0], { ...MAT, glow: MAT.glowHot });
    lampHead.add(rg);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.008, 0.13), new THREE.MeshStandardMaterial({ color: 0xcfe6f0, transparent: true, opacity: 0.25, roughness: 0.02 }));
    lampHead.add(lens);
    lampHead.position.set(2.85, 1.18, -0.45);
    group.add(lampHead);
  }
  // Old radio on a wall shelf.
  const radio = new Grid();
  radio.box(0, 0, 0, 10, 6, 4, (x, y) => (y === 0 || y === 5 || x === 0 || x === 9 ? 0x4a2a18 : x < 5 ? ((x + y) % 2 === 0 ? 0x2a2018 : 0x3a2c20) : 0x5a3a24));
  radio.box(6, 2, 4, 9, 4, 5, 0xffc060, true);
  const radioG = radio.toGroup(0.04, [5, 0, 2], { ...MAT, glow: MAT.glowSoft });
  const shelf = new Grid().box(0, 0, 0, 12, 1, 5, 0x3b2417).toGroup(0.04, [6, 1, 2.5]);
  const radioHolder = new THREE.Group();
  radioHolder.add(radioG, shelf);
  radioHolder.position.set(3.38, 1.75, 0.9);
  radioHolder.rotation.y = -Math.PI / 2;
  group.add(radioHolder);
  // Wall clock with a swinging pendulum.
  const clock = new Grid();
  clock.box(0, 0, 0, 8, 20, 3, (x, y, z) => (x === 0 || x === 7 || y === 0 || y === 19 || y === 13 || z === 0 ? 0x3a2216 : y > 13 ? 0xe8e0c8 : null));
  clock.set(3, 16, 3, 0x111111).set(4, 16, 3, 0x111111).set(4, 17, 3, 0x111111).set(5, 15, 3, 0x111111);
  const clockG = clock.toGroup(0.045, [4, 0, 1.5]);
  const clockHolder = new THREE.Group();
  clockHolder.add(clockG);
  const pendulum = new THREE.Group();
  const pend = new Grid();
  pend.box(0, -9, 0, 1, 0, 1, 0xb08a3a);
  pend.box(-1, -12, 0, 2, -9, 1, 0xd8b04a);
  pendulum.add(pend.toGroup(0.045, [0.5, 0, 0.5], { ...MAT, std: MAT.metal }));
  pendulum.position.set(0, 12.5 * 0.045, 0.02);
  clockHolder.add(pendulum);
  clockHolder.position.set(3.4, 1.15, 1.9);
  clockHolder.rotation.y = -Math.PI / 2;
  group.add(clockHolder);
  // Safe in the back-right corner.
  const safe = new Grid();
  safe.box(0, 0, 0, 6, 8, 6, (x, y, z) => (z === 5 && x > 0 && x < 5 && y > 0 && y < 7 ? 0x2c3a30 : 0x24302a));
  safe.set(3, 4, 6, 0xc0a050);
  const safeG = safe.toGroup(0.1, [3, 0, 3], { ...MAT, std: MAT.metal });
  safeG.position.set(3.1, 0, -2.0);
  safeG.rotation.y = -0.6;
  group.add(safeG);

  // ---------------------------------------------------------------- tea table and chairs
  const table = new Grid();
  table.box(0, 0, 0, 9, 8, 9, (x, y, z) => (y >= 7 ? 0x4a2a1a : y === 6 && (x === 0 || x === 8 || z === 0 || z === 8) ? 0x3b2010 : (x === 0 || x === 8) && (z === 0 || z === 8) ? 0x3b2010 : null));
  const tableG = table.toGroup(v, [4.5, 0, 4.5]);
  tableG.position.set(0, 0, 0.2);
  group.add(tableG);
  const chair = (x: number, rot: number) => {
    const c = new Grid();
    c.box(0, 0, 0, 5, 12, 5, (cx, cy, cz) => {
      if (cy === 4) return 0x4a2a1a;
      if (cz === 0 && cy > 4) return cx === 2 || cx === 0 || cx === 4 ? 0x3b2010 : cy === 11 ? 0x3b2010 : null;
      if ((cx === 0 || cx === 4) && (cz === 0 || cz === 4) && cy < 4) return 0x3b2010;
      if ((cx === 0 || cx === 4) && cy === 7) return 0x3b2010;
      return null;
    });
    const cg = c.toGroup(v, [2.5, 0, 2.5]);
    cg.position.set(x, 0, 0.2);
    cg.rotation.y = rot;
    group.add(cg);
  };
  chair(-0.82, Math.PI / 2);
  chair(0.82, -Math.PI / 2);
  // Tea set.
  const teapot = makeTeapot();
  teapot.position.set(0.12, 0.8, -0.18);
  group.add(teapot);
  const cup = makeTeacup();
  cup.position.set(0.22, 0.8, 0.3);
  group.add(cup);
  const zhangCup = makeTeacup();
  group.add(zhangCup);
  // Pendant lamp over the table.
  const pend2 = new Grid();
  pend2.box(-3, 0, -3, 4, 1, 4, 0x2a2018);
  pend2.box(-2, -1, -2, 3, 0, 3, 0xfff0c0, true);
  pend2.box(0, 1, 0, 1, 12, 1, 0x1a1a1a);
  const pendG = pend2.toGroup(0.05, [0.5, 0, 0.5], { ...MAT, glow: MAT.glowHot });
  pendG.position.set(0, 2.2, 0.2);
  group.add(pendG);

  // Meteorites for the sale: walnut, apple, then three of a size.
  const walnut = makeStone({ radius: 9, seed: 8, palette: "iron", cut: true });
  const apple = makeStone({ radius: 9, seed: 21, palette: "iron", cut: true });
  const trio = [makeStone({ radius: 9, seed: 31, palette: "iron", cut: true }), makeStone({ radius: 9, seed: 47, palette: "iron", cut: true }), makeStone({ radius: 8.5, seed: 59, palette: "iron", cut: true })];
  for (const s of [walnut, apple, ...trio]) group.add(s);
  const heldStone = makeStone({ radius: 8, seed: 3, palette: "pallasite" });

  const phone = makePhone();
  phone.scale.setScalar(1.5);

  // ---------------------------------------------------------------- light
  group.add(new THREE.AmbientLight(0x4a3a30, 1.0));
  const pendant = new THREE.SpotLight(0xffd29a, 7.5, 7, 0.95, 0.85, 2);
  pendant.position.set(0, 2.18, 0.2);
  pendant.target.position.set(0, 0, 0.2);
  pendant.castShadow = true;
  pendant.shadow.mapSize.set(1024, 1024);
  pendant.shadow.bias = -0.0006;
  group.add(pendant, pendant.target);
  const lampSpot = new THREE.SpotLight(0xe8f2ff, 5, 2.5, 0.7, 0.5, 2);
  const workFill = new THREE.PointLight(0xffc890, 2.4, 4.5, 2);
  workFill.position.set(2.0, 1.9, 0.9);
  group.add(workFill);
  lampSpot.position.set(2.85, 1.15, -0.45);
  lampSpot.target.position.set(2.95, 0.8, -0.45);
  group.add(lampSpot, lampSpot.target);
  const window = new THREE.DirectionalLight(0xff9a58, 2.6);
  window.position.set(1.8, 3.6, 7);
  window.target.position.set(0.8, 0, 0);
  window.castShadow = true;
  window.shadow.mapSize.set(1024, 1024);
  Object.assign(window.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
  group.add(window, window.target);
  for (const [x, z] of [[-1.2, -1.4], [1.4, -1.4], [-2.5, 0.4]] as const) {
    const cl = new THREE.PointLight(0xffe2b0, 1.6, 3.2, 2);
    cl.position.set(x, 1.6, z);
    group.add(cl);
  }

  // ---------------------------------------------------------------- cast
  const zhang = new Actor("zhang", ZHANG_BODY, 1.8);
  zhang.wear(clothTexture("coat", paintCoat));
  const collector = new Actor("collector", COLLECTOR_BODY, 1.72);
  collector.wear(clothTexture("cardigan", paintCardigan));
  group.add(zhang.root, collector.root);
  const zCup = new THREE.Object3D();
  zhang.hold("handR", zCup);
  const cHand = new THREE.Object3D();
  collector.hold("handR", cHand);
  const cHandL = new THREE.Object3D();
  collector.hold("handL", cHandL);
  const zHandL = new THREE.Object3D();
  zhang.hold("handL", zHandL);
  group.add(heldStone, phone);

  // Blocking ------------------------------------------------------------
  // Collector: worktable (bent to the lamp) → greets → radio → tea table →
  // left cabinet for the iron stones → back to the table.
  const cPos = v3Track([
    [41, [2.28, 0, -0.4]],
    [45.6, [2.28, 0, -0.4]],
    [46.6, [2.05, 0, 0.0]],
    [48.2, [2.05, 0, 0.0]],
    [49.6, [2.9, 0, 0.9]],
    [50.6, [2.9, 0, 0.9]],
    [53.4, [1.25, 0, 0.2]],
    [55.0, [0.95, 0, 0.2]],
    [98.4, [0.95, 0, 0.2]],
    [99.8, [-1.6, 0, -0.4]],
    [100.8, [-2.4, 0, -0.55]],
    [107.8, [-2.4, 0, -0.55]],
    [109.0, [-0.6, 0, -0.4]],
    [110.0, [0.95, 0, 0.2]],
  ], (x) => x);
  const cYaw = numTrack([
    [41, Math.PI / 2],
    [45.2, Math.PI / 2],
    [46.2, -1.29],
    [48.2, -1.29],
    [48.9, Math.PI / 2 + 0.3],
    [50.6, Math.PI / 2 + 0.3],
    [51.6, -Math.PI / 2 - 0.5],
    [55.0, -Math.PI / 2],
    [98.4, -Math.PI / 2],
    [99.0, -Math.PI / 2 - 0.22],
    [100.8, -Math.PI / 2],
    [107.6, -Math.PI / 2],
    [108.4, Math.PI / 2 - 0.1],
    [109.4, Math.PI / 2],
    [110.0, -Math.PI / 2],
  ]);
  const seated = (pose: Pose): Pose => ({ ...pose, legR: [-Math.PI / 2 + 0.05, 0, -0.04], legL: [-Math.PI / 2 + 0.05, 0, 0.04], lift: -4.2 });
  const cHunch: Pose = seated({ hips: [0.35, 0, 0], neck: [0.5, 0, 0], armR: reach("R", [-2, 2, 9]), armL: reach("L", [2, 1, 8]) });
  const cWave: Pose = { armR: [-2.5, 0, -0.3], armL: [0.1, 0, 0.1], neck: [-0.05, 0, 0] };
  const cSeat: Pose = seated({ hips: [0.08, 0, 0], armR: reach("R", [-2, 2, 9]), armL: reach("L", [2, 2, 9]) });
  const cPour: Pose = seated({ hips: [0.12, 0.2, 0], armR: reach("R", [1, 2, 12]), armL: reach("L", [3, 2, 9]), neck: [0.35, 0.2, 0] });
  const cOffer: Pose = seated({ hips: [0.1, 0, 0], armR: reach("R", [-1, 3, 13]), armL: reach("L", [2, 2, 9]), neck: [0.15, 0, 0] });
  const cHold: Pose = seated({ hips: [0, 0, 0], armR: reach("R", [-3, 12, 10]), armL: reach("L", [2, 2, 9]), neck: [-0.25, 0, 0] });
  const cLaugh = (t: number): Pose => seated({ hips: [-0.15 + Math.sin(t * 9) * 0.04, 0, 0], neck: [-0.35 + Math.sin(t * 9) * 0.05, 0, 0], armR: reach("R", [-2, 6, 14]), armL: reach("L", [3, 1, 6]) });
  const cAwk: Pose = seated({ hips: [0.05, 0, 0], neck: [0.1, 0.2, 0.08], armR: reach("R", [-6, 15, 4]), armL: reach("L", [2, 2, 9]) });
  const cShow: Pose = seated({ hips: [0.15, 0, 0], neck: [0.3, 0, 0], armR: reach("R", [0, 3, 12]), armL: reach("L", [2, 3, 12]) });
  const cCabinet: Pose = { armR: reach("R", [-1, 8, 12]), armL: [-1.2, 0, 0.1], neck: [0.0, 0, 0] };
  const cCarry: Pose = { armR: reach("R", [-1, 4, 10]), armL: reach("L", [1, 4, 10]), neck: [0.2, 0, 0] };
  const cWalk = (t: number) => walk(t, 1.0);
  const cPose = poseTrack([
    [41, cHunch],
    [45.4, cHunch],
    [46.2, cWave],
    [47.8, cWave],
    [48.4, cWalk],
    [49.4, cWalk],
    [49.8, { armR: reach("R", [-1, 10, 10]) }],
    [50.6, { armR: reach("R", [-1, 10, 10]) }],
    [51.2, cWalk],
    [54.6, cWalk],
    [55.6, cSeat],
    [57.6, cSeat],
    [58.4, cPour],
    [60.6, cPour],
    [61.4, cOffer],
    [62.6, cSeat],
    [71.0, cSeat],
    [72.0, cHold],
    [80.6, cHold],
    [81.6, cSeat],
    [92.2, cSeat],
    [92.7, cLaugh],
    [95.4, cLaugh],
    [96.0, cSeat],
    [98.2, cSeat],
    [98.8, cWalk],
    [100.4, cWalk],
    [100.9, cCabinet],
    [107.4, cCabinet],
    [108.0, cWalk],
    [109.4, cWalk],
    [109.9, cCarry],
    [110.6, cShow],
    [112.4, cShow],
    [113.2, cSeat],
    [116.0, cSeat],
    [116.4, cAwk],
    [119.0, cAwk],
    [119.6, cSeat],
  ]);
  const cFace = stateTrack<Expression>([
    [41, "down"],
    [45.4, "smile"],
    [47.6, "smile"],
    [58.4, "down"],
    [61.4, "smile"],
    [72, "smile"],
    [73.5, "neutral"],
    [76.2, "smile"],
    [92.6, "laugh"],
    [95.8, "smile"],
    [100.8, "neutral"],
    [109.6, "smile"],
    [113.8, "neutral"],
    [116.0, "awkward"],
    [119.4, "neutral"],
  ]);

  // Zhang: enters, studies the cabinets, sits, cup, phone.
  const zPos = v3Track([
    [41, [-2.3, 0, 3.2]],
    [42.6, [-2.3, 0, 2.6]],
    [44.4, [-2.2, 0, 1.5]],
    [48.0, [-2.2, 0, 1.5]],
    [50.0, [-1.6, 0, -1.3]],
    [53.6, [0.4, 0, -1.4]],
    [55.4, [-0.4, 0, -0.4]],
    [56.8, [-0.95, 0, 0.2]],
  ], (x) => x);
  const zYaw = numTrack([
    [41, Math.PI],
    [44.4, Math.PI],
    [46.0, Math.PI - 0.7],
    [48.0, Math.PI - 0.9],
    [49.2, Math.PI],
    [51.0, Math.PI + 0.25],
    [53.6, Math.PI],
    [55.0, Math.PI / 2 + 0.4],
    [56.8, Math.PI / 2],
  ]);
  const zSeat: Pose = seated({ hips: [0.02, 0, 0], armR: reach("R", [-2, 2, 9]), armL: reach("L", [2, 2, 9]), neck: [0.05, 0, 0] });
  const zCupUp: Pose = seated({ armR: reach("R", [-2, 6, 12]), armL: reach("L", [2, 2, 9]), neck: [0.08, 0, 0] });
  const zCupRaise: Pose = seated({ armR: reach("R", [-3, 13, 11]), armL: reach("L", [2, 2, 9]), neck: [-0.05, 0, 0] });
  const zPhone: Pose = seated({ armR: reach("R", [-1.5, 4, 11]), armL: reach("L", [1.5, 4, 11]), neck: [0.45, 0, 0] });
  const zLook = (t: number): Pose => ({ ...walk(t, 0.55), neck: [-0.05, Math.sin(t * 0.8) * 0.3 + 0.2, 0] });
  const zPose = poseTrack([
    [41, (t: number) => walk(t, 0.8)],
    [44.2, (t: number) => walk(t, 0.8)],
    [44.8, { neck: [-0.1, -0.5, 0] }],
    [47.6, { neck: [0, -0.2, 0] }],
    [48.4, zLook],
    [54.6, zLook],
    [56.0, (t: number) => walk(t, 0.8)],
    [57.0, zSeat],
    [61.2, zSeat],
    [61.9, zCupUp],
    [63.4, { ...zSeat, neck: [0.25, 0, 0] }],
    [64.2, zCupUp],
    [83.0, zCupUp],
    [84.0, zCupRaise],
    [90.6, zCupRaise],
    [91.4, zCupUp],
    [108.4, zCupUp],
    [109.2, zSeat],
    [113.0, zSeat],
    [113.6, zPhone],
    [118.6, zPhone],
    [119.4, zSeat],
    [121.0, zSeat],
    [121.8, { ...zSeat, hips: [0.12, 0, 0], neck: [0.32, 0, 0] }],
  ]);
  const zFace = stateTrack<Expression>([
    [41, "neutral"],
    [63.2, "blink"],
    [63.6, "neutral"],
    [84.4, "smile"],
    [89.6, "neutral"],
    [93.0, "smile"],
    [96.6, "neutral"],
    [99.0, "aside"],
    [106.4, "neutral"],
    [116.4, "narrow"],
    [119.4, "neutral"],
    [124.6, "blink"],
    [124.9, "neutral"],
  ]);

  const marks = {
    table: new THREE.Vector3(0, 0.85, 0.2),
    zhangHead: new THREE.Vector3(-0.95, 1.25, 0.2),
    collectorHead: new THREE.Vector3(0.95, 1.2, 0.2),
    door: new THREE.Vector3(-2.3, 1.4, 2.5),
    work: new THREE.Vector3(2.8, 0.9, -0.4),
  };

  const tmp = new THREE.Vector3();
  return {
    group,
    zhang,
    collector,
    cup,
    zhangCup,
    stones: [walnut, apple, ...trio],
    heldStone,
    phone,
    radio: radioHolder,
    pendulum,
    cabinetDoor,
    lampHead,
    marks,
    update(t: number) {
      const cp = cPos(t);
      collector.place(cp[0], cp[1], cp[2], cYaw(t));
      collector.pose(cPose(t));
      collector.face(Math.sin(t * 0.9 + 1) > 0.985 ? "blink" : cFace(t));
      const zp = zPos(t);
      zhang.place(zp[0], zp[1], zp[2], zYaw(t));
      zhang.pose(zPose(t));
      zhang.face(Math.sin(t * 0.8) > 0.988 && zFace(t) === "neutral" ? "blink" : zFace(t));
      pendulum.rotation.z = Math.sin(t * Math.PI) * 0.18;
      // Cups: Zhang's sits by the pot until poured and offered, then in his hand.
      group.updateMatrixWorld(true);
      if (t < 61.6) {
        zhangCup.position.set(-0.05, 0.8, 0.12);
        zhangCup.rotation.set(0, 0, 0);
        if (t > 60.4) {
          // Offered across the table in the collector's hand.
          cHand.getWorldPosition(tmp);
          zhangCup.position.copy(tmp).add(new THREE.Vector3(0, 0.02, 0));
        }
      } else if (t < 109.0 || t > 200) {
        zCup.getWorldPosition(tmp);
        zhangCup.position.copy(tmp).add(new THREE.Vector3(0, 0.0, 0));
        zhangCup.rotation.set(0, 0, 0);
      } else {
        zhangCup.position.set(-0.32, 0.8, 0.32);
      }
      // A small chondrite in the collector's hand while he talks about other worlds.
      heldStone.visible = t > 47 && t < 81.6;
      if (heldStone.visible) {
        cHand.getWorldPosition(tmp);
        heldStone.position.copy(tmp).add(new THREE.Vector3(0, 0.14, 0));
        if (t > 55.6 && t < 71.6) heldStone.position.set(0.55, 0.83, 0.42);
      }
      // Sale stones: walnut and apple out of the cabinet, then the trio on the table.
      const [walnut, apple, s1, s2, s3] = this.stones as THREE.Group[];
      walnut!.visible = t > 101.4 && t < 109.8;
      apple!.visible = t > 107.0 && t < 109.8;
      cHand.getWorldPosition(tmp);
      walnut!.position.copy(tmp).add(new THREE.Vector3(0, 0.15, 0));
      cHandL.getWorldPosition(tmp);
      apple!.position.copy(tmp).add(new THREE.Vector3(0, 0.15, 0));
      const trioOn = t > 109.8;
      const spots: V3[] = [[-0.2, 0.83, 0.3], [-0.04, 0.83, 0.33], [0.12, 0.83, 0.3]];
      [s1, s2, s3].forEach((s, k) => {
        s!.visible = trioOn;
        const sp = spots[k]!;
        s!.position.set(sp[0], sp[1], sp[2]);
        s!.rotation.set(-Math.PI / 2, 0, k * 1.3 + 0.4);
      });
      // Cabinet glass leaf.
      cabinetDoor.rotation.y = -1.3 * smooth(range(t, 100.9, 101.6)) * (1 - smooth(range(t, 107.4, 108.0)));
      // Phone.
      phone.visible = t > 113.5 && t < 119.0;
      if (phone.visible) {
        zHandL.getWorldPosition(tmp);
        phone.position.copy(tmp).add(new THREE.Vector3(0.05, 0.14, 0));
        phone.rotation.set(-1.0, Math.PI / 2, 0);
      }
      void wobble;
      void hash1;
      void shade;
      void mix;
    },
  };
}
