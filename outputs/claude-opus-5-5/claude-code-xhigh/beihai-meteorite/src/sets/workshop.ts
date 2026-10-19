import * as THREE from "three";
import { walk, type Pose } from "@agentbench/voxel-kit";
import { Actor } from "../cast/actors";
import { reach } from "../cast/ik";
import { ZHANG_BODY, clothTexture, paintCoat } from "../cast/skins";
import { hash1, hash3, numTrack, poseTrack, range, smooth, v3Track } from "../core/anim";
import { ParticleLayer } from "../core/particles";
import { Grid, MAT } from "../core/vox";
import { makeSlug, stoneGrid } from "../props";

/**
 * A space-force research workshop after hours: one man, one CNC machine,
 * three stones becoming thirty-six slugs.
 */

/** Light fixture k switches on at FIX_ON[k] and off at FIX_OFF[k]. */
export const FIX_ON = [126.9, 127.35, 127.8, 128.25, 128.7, 129.15];
export const FIX_OFF = [149.4, 149.75, 150.1, 150.45, 150.8, 151.15];
/** Plunge times of the core drill (seconds). */
export const PLUNGES = [131.9, 133.1, 134.3, 135.5];
/** When each of the thirty-six slugs drops into the tray. */
export const SLUG_DROPS: number[] = Array.from({ length: 36 }, (_, k) => (k < 35 ? 137.5 + 6.2 * Math.pow(k / 35, 0.8) : 144.65));

function fixtureLevel(t: number, k: number): number {
  const on = FIX_ON[k]!;
  const off = FIX_OFF[k]!;
  if (t < on || t >= off + 0.12) return 0;
  // Starter flicker: two stutters before the tube catches.
  const d = t - on;
  if (d < 0.32) return d < 0.06 || (d > 0.14 && d < 0.2) ? 0.7 : 0.05;
  if (t > off) return 0.2;
  return 1;
}

export function workshopLight(t: number): number {
  let s = 0;
  for (let k = 0; k < 6; k++) s += fixtureLevel(t, k);
  return s / 6;
}

export interface Workshop {
  group: THREE.Group;
  zhang: Actor;
  marks: Record<string, THREE.Vector3>;
  update(t: number): void;
}

export function buildWorkshop(): Workshop {
  const group = new THREE.Group();
  group.name = "workshop";
  const v = 0.2;
  const g = new Grid();
  const X = 35;
  const Z = 22;
  const H = 25;
  g.box(-X, -1, -Z, X, 0, Z, (x, _y, z) => {
    if ((x === -6 || x === 9) && z > -10 && z < 12) return 0xc9a227;
    if ((z === -10 || z === 12) && x >= -6 && x <= 9) return 0xc9a227;
    return hash3(Math.floor(x / 3), 0, Math.floor(z / 3), 8) < 0.5 ? 0x5a5b5c : 0x535455;
  });
  const wallC = (x: number, y: number, z: number) => (y < 6 ? 0x3c4a52 : hash3(Math.floor(x / 2), Math.floor(y / 2), z, 2) < 0.5 ? 0x6c7174 : 0x666b6e);
  g.box(-X, 0, -Z - 1, X, H, -Z, wallC);
  g.box(-X - 1, 0, -Z, -X, H, Z, wallC);
  g.box(X, 0, -Z, X + 1, H, Z, wallC);
  g.box(-X, H, -Z, X, H + 1, Z, 0x2a2c2e);
  // Roof trusses.
  for (let x = -X; x < X; x += 10) g.box(x, H - 2, -Z, x + 1, H - 1, Z, 0x3a3c3e);
  // Pegboard with tools on the back wall.
  for (let x = -20; x < -6; x++) for (let y = 6; y < 13; y++) g.set(x, y, -Z, (x + y) % 2 === 0 ? 0x8a7a5a : 0x7d6e50);
  [[-18, 9], [-15, 10], [-12, 8], [-9, 10]].forEach(([x, y]) => g.box(x!, y!, -Z + 1, x! + 1, y! + 3, -Z + 2, 0xb03a2a));
  const shell = g.toGroup(v, [0, 0, 0], MAT);
  group.add(shell);

  // Fluorescent fixtures: two rows of three.
  const fixtures: THREE.Object3D[] = [];
  const fixLights: THREE.PointLight[] = [];
  for (let k = 0; k < 6; k++) {
    const fx = -4.5 + (k % 3) * 4.5;
    const fz = k < 3 ? -1.6 : 2.4;
    const housing = new Grid().box(0, 0, 0, 30, 1, 3, 0x9a9da0).toGroup(0.05, [15, 0, 1.5]);
    housing.position.set(fx, 4.62, fz);
    group.add(housing);
    const tube = new Grid().box(0, 0, 0, 28, 1, 1, 0xe8f4ff, true).toGroup(0.05, [14, 1, 0.5], { ...MAT, glow: new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(3, 3, 3) }) });
    tube.position.set(fx, 4.6, fz);
    group.add(tube);
    fixtures.push(tube);
    const l = new THREE.PointLight(0xd8ecff, 0, 12, 2);
    l.position.set(fx, 4.3, fz);
    group.add(l);
    fixLights.push(l);
  }
  const keyLight = new THREE.SpotLight(0xcfe6ff, 0, 14, 0.75, 0.6, 1.6);
  keyLight.position.set(0.5, 4.4, 1.2);
  keyLight.target.position.set(0, 0.6, -0.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  group.add(keyLight, keyLight.target);
  const ambient = new THREE.AmbientLight(0x2a3a4a, 0.25);
  group.add(ambient);

  // ---------------------------------------------------------------- CNC machine
  const mv = 0.05;
  const m = new Grid();
  const MW = 48;
  const MH = 44;
  const MD = 36;
  m.box(0, 0, 0, MW, MH, MD, (x, y, z) => {
    const shellCell = x === 0 || x === MW - 1 || y === 0 || y === MH - 1 || z === 0 || z === MD - 1;
    if (!shellCell) return null;
    // Front window.
    if (z === MD - 1 && x > 8 && x < 36 && y > 14 && y < 36) return null;
    if (y < 10) return y === 9 ? 0x2a2e33 : 0x3a3f45;
    if (z === MD - 1 && (y === 12 || y === 38)) return 0x2f6cb3;
    return hash3(x, y, z, 4) < 0.5 ? 0xd8dbdc : 0xd0d3d4;
  });
  // Window frame.
  for (let x = 8; x <= 36; x++) for (let y = 14; y <= 36; y++) if (x === 8 || x === 36 || y === 14 || y === 36) m.set(x, y, MD - 1, 0x2a2e33);
  // Control panel pod with a glowing screen on the right.
  m.box(MW, 18, MD - 8, MW + 6, 34, MD, 0x3a3f45);
  m.box(MW + 1, 24, MD, MW + 5, 32, MD + 1, 0x48c0e0, true);
  m.box(MW + 1, 20, MD, MW + 2, 21, MD + 1, 0x40e060, true);
  m.box(MW + 3, 20, MD, MW + 4, 21, MD + 1, 0xe04030, true);
  // Interior: bed and vise.
  m.box(6, 10, 6, MW - 6, 12, MD - 6, 0x4a4f55);
  m.box(18, 12, 14, 30, 15, 22, 0x2c3035);
  const machine = m.toGroup(mv, [MW / 2, 0, MD / 2], { ...MAT, std: MAT.satin });
  group.add(machine);
  // Interior light.
  const machLight = new THREE.PointLight(0xe8f4ff, 0, 2.2, 2);
  machLight.position.set(0, 1.7, 0.2);
  group.add(machLight);
  // Glass.
  const glass = new THREE.Mesh(new THREE.BoxGeometry(27 * mv, 21 * mv, 0.01), MAT.glass);
  glass.position.set((22 - MW / 2) * mv, 25 * mv, (MD / 2 - 0.5) * mv);
  group.add(glass);

  // The stone in the vise, with holes appearing plunge by plunge.
  const sv = 0.004;
  const stoneVariants: THREE.Group[] = [];
  const holeCells: Array<[number, number]> = [[-4, -3], [3, -3], [-4, 4], [3, 4]];
  for (let k = 0; k <= PLUNGES.length; k++) {
    const sg = stoneGrid({ radius: 10, seed: 31, palette: "iron", squash: [1.2, 0.8, 1.0] });
    for (let h = 0; h < k; h++) {
      const [hx, hz] = holeCells[h]!;
      for (let y = -12; y < 12; y++) for (let dx = 0; dx < 2; dx++) for (let dz = 0; dz < 2; dz++) sg.set(hx + dx, y, hz + dz, null);
    }
    // Bright fresh-cut rims around the holes.
    for (let h = 0; h < k; h++) {
      const [hx, hz] = holeCells[h]!;
      for (let dx = -1; dx < 3; dx++) for (let dz = -1; dz < 3; dz++) {
        for (let y = 12; y > -12; y--) {
          if (sg.has(hx + dx, y, hz + dz)) {
            sg.set(hx + dx, y, hz + dz, 0xc8c8c0);
            break;
          }
        }
      }
    }
    const grp = sg.toGroup(sv, [0, 0, 0], { ...MAT, std: MAT.metal });
    grp.position.set(0, 15 * mv + 8 * sv, 0);
    grp.visible = false;
    group.add(grp);
    stoneVariants.push(grp);
  }
  // Spindle head and core drill.
  const spindle = new THREE.Group();
  const sp = new Grid();
  sp.box(-4, 0, -4, 4, 8, 4, 0x3a3f45);
  sp.box(-2, -3, -2, 2, 0, 2, 0x8a8f96);
  const spG = sp.toGroup(0.025, [0, 0, 0], { ...MAT, std: MAT.metal });
  spindle.add(spG);
  const bit = new Grid();
  bit.box(0, -18, 0, 2, 0, 2, (_x, y) => (y < -14 ? 0xd8c070 : 0xb8bcc0));
  const bitG = bit.toGroup(0.005, [1, 0, 1], { ...MAT, std: MAT.metal });
  bitG.position.y = -3 * 0.025;
  spindle.add(bitG);
  group.add(spindle);

  // Tray of thirty-six slots on a cart by the machine, and the falling slugs.
  const tray = new Grid();
  tray.box(0, 0, 0, 25, 2, 25, (x, y, z) => (y === 1 && x % 4 !== 0 && z % 4 !== 0 ? null : 0x2c3035));
  const trayG = tray.toGroup(0.004, [12.5, 0, 12.5], { ...MAT, std: MAT.satin });
  const cart = new Grid().box(0, 0, 0, 10, 16, 8, (x, y, z) => (y === 15 || ((x === 0 || x === 9) && (z === 0 || z === 7)) ? 0x4a4f55 : null)).toGroup(0.05, [5, 0, 4], { ...MAT, std: MAT.satin });
  const trayHolder = new THREE.Group();
  trayHolder.add(cart);
  trayG.position.y = 0.8;
  trayHolder.add(trayG);
  trayHolder.position.set(-1.7, 0, 1.0);
  group.add(trayHolder);
  const slugs = SLUG_DROPS.map((_, k) => {
    const s = makeSlug(k + 100);
    s.scale.setScalar(1.15);
    trayHolder.add(s);
    return s;
  });
  const slotPos = (k: number) => new THREE.Vector3(((k % 6) - 2.5) * 0.016, 0.8 + 0.006, (Math.floor(k / 6) - 2.5) * 0.016);
  // Chute that the slugs drop from.
  const chute = new Grid().box(0, 0, 0, 3, 20, 3, (x, y, z) => (x === 1 && z === 1 && y > 1 ? null : 0x6a6f75)).toGroup(0.008, [1.5, 0, 1.5], { ...MAT, std: MAT.metal });
  chute.position.set(0.0, 0.92, 0.0);
  trayHolder.add(chute);

  // Lathe and bench in the background.
  const lathe = new Grid();
  lathe.box(0, 0, 0, 40, 8, 10, 0x3a4a3a);
  lathe.box(0, 8, 2, 40, 10, 8, 0x5a6a5a);
  lathe.box(2, 10, 1, 10, 18, 9, 0x4a5a4a);
  lathe.box(32, 10, 3, 38, 15, 7, 0x4a5a4a);
  const latheG = lathe.toGroup(0.05, [20, 0, 5], { ...MAT, std: MAT.satin });
  latheG.position.set(4.6, 0, -3.2);
  group.add(latheG);
  const bench = new Grid().box(0, 0, 0, 36, 18, 14, (x, y, z) => (y === 17 || ((x === 0 || x === 35) && (z === 0 || z === 13)) ? 0x5a3a24 : null)).toGroup(0.05, [18, 0, 7], MAT);
  bench.position.set(-4.6, 0, -3.6);
  group.add(bench);
  const drum = new Grid();
  for (let y = 0; y < 18; y++) for (let x = -6; x <= 6; x++) for (let z = -6; z <= 6; z++) if (x * x + z * z <= 36) drum.set(x, y, z, y % 6 === 0 ? 0x1f3f6f : 0x2a4f8a);
  const drumG = drum.toGroup(0.05, [0, 0, 0]);
  drumG.position.set(-6.2, 0, 2.6);
  group.add(drumG);

  // Chips and coolant.
  const chips = new ParticleLayer(1200, THREE.AdditiveBlending);
  group.add(chips.points);
  const mist = new ParticleLayer(800, THREE.NormalBlending);
  group.add(mist.points);

  // Zhang.
  const zhang = new Actor("zhang", ZHANG_BODY, 1.8);
  zhang.wear(clothTexture("coat", paintCoat));
  group.add(zhang.root);
  const zPos = v3Track([
    [126, [1.25, 0, 1.55]],
    [144.6, [1.25, 0, 1.55]],
    [145.6, [-0.2, 0, 1.25]],
    [148.4, [-0.2, 0, 1.25]],
    [149.4, [1.2, 0, 1.7]],
  ], (x) => x);
  const zYaw = numTrack([
    [126, Math.PI + 0.5],
    [144.8, Math.PI + 0.5],
    [145.6, Math.PI],
    [148.6, Math.PI],
    [149.4, Math.PI + 0.6],
  ]);
  const panel: Pose = { armR: reach("R", [-1, 6, 10]), armL: [0.05, 0, 0.08], neck: [0.25, 0.1, 0] };
  const press = (t: number): Pose => ({ ...panel, armR: reach("R", [-1, 6 + Math.max(0, Math.sin(t * 3)) * 1.5, 11]) });
  const watch: Pose = { armR: [0.05, 0, -0.08], armL: [0.05, 0, 0.08], neck: [0.1, -0.35, 0], hips: [0.05, -0.15, 0] };
  const brush = (t: number): Pose => ({ armR: reach("R", [-2 + Math.sin(t * 7) * 2, 0, 10]), armL: reach("L", [3, -1, 9]), neck: [0.6, 0, 0], hips: [0.25, 0, 0] });
  const holdTool: Pose = { armR: reach("R", [-2, 14, 9]), armL: [0.05, 0, 0.08], neck: [-0.1, 0, 0] };
  const zPose = poseTrack([
    [126, panel],
    [127.0, press],
    [130.4, press],
    [131.2, watch],
    [144.4, watch],
    [145.0, (t: number) => walk(t, 0.9)],
    [145.6, brush],
    [147.0, brush],
    [147.6, holdTool],
    [148.6, holdTool],
    [149.2, (t: number) => walk(t, 0.9)],
    [150.0, panel],
  ]);
  const tool = new Grid().box(0, 0, 0, 2, 16, 2, (_x, y) => (y < 4 ? 0xd8c070 : 0xb8bcc0)).toGroup(0.006, [1, 0, 1], { ...MAT, std: MAT.metal });
  zhang.hold("handR", tool);
  tool.position.set(0, 0, 0.12);
  tool.rotation.x = Math.PI / 2;

  const marks = {
    vise: new THREE.Vector3(0, 0.8, 0),
    tray: new THREE.Vector3(-1.7, 0.8, 1.0),
    panel: new THREE.Vector3(1.4, 1.4, 1.0),
  };

  return {
    group,
    zhang,
    marks,
    update(t: number) {
      // Lights.
      let total = 0;
      for (let k = 0; k < 6; k++) {
        const lv = fixtureLevel(t, k);
        total += lv;
        fixtures[k]!.visible = lv > 0.1;
        fixLights[k]!.intensity = lv * 9;
      }
      const room = total / 6;
      keyLight.intensity = room * 14;
      ambient.intensity = 0.06 + room * 0.3;
      const machineOn = t > 130.6 && t < 146;
      machLight.intensity = machineOn ? 1.6 : t > 127 && t < 149.5 ? 0.25 : 0;
      // Stone: show the variant matching the number of finished holes; gone after cutting.
      let holes = 0;
      for (const p of PLUNGES) if (t > p + 0.7) holes++;
      stoneVariants.forEach((s, k) => (s.visible = k === holes && t < 136.9));
      // Spindle: rapid over each hole, plunge, retract.
      const hc = [[-4, -3], [3, -3], [-4, 4], [3, 4]];
      let sx = 0;
      let sz = 0;
      let sy = 1.35;
      let spin = 0;
      for (let k = 0; k < PLUNGES.length; k++) {
        const p0 = PLUNGES[k]!;
        if (t >= p0 - 0.5 && t < p0 + 1.2) {
          sx = (hc[k]![0] + 1) * 0.004;
          sz = (hc[k]![1] + 1) * 0.004;
          const down = smooth(range(t, p0 - 0.1, p0 + 0.5)) * (1 - smooth(range(t, p0 + 0.7, p0 + 1.0)));
          sy = 1.35 - down * 0.48;
          spin = 1;
        }
      }
      if (t > 131 && t < 136.4) spin = 1;
      spindle.position.set(sx, sy, sz);
      spindle.rotation.y = spin ? t * 60 : 0;
      // Chips and coolant while cutting.
      chips.begin();
      mist.begin();
      for (let k = 0; k < PLUNGES.length; k++) {
        const p0 = PLUNGES[k]!;
        const cutStart = p0 + 0.25;
        const cutEnd = p0 + 0.7;
        for (let i = 0; i < 160; i++) {
          const te = cutStart + (i / 160) * (cutEnd - cutStart);
          if (te > t) break;
          const age = t - te;
          if (age > 0.9) continue;
          const a = hash1(i + k * 1000, 1) * Math.PI * 2;
          const sp = 0.4 + hash1(i + k * 1000, 2) * 0.9;
          const x = sx + Math.cos(a) * sp * age;
          const z = sz + Math.sin(a) * sp * age;
          const y = 0.84 + (0.8 * age - 4.9 * age * age) * hash1(i, 3);
          const hot = 1 - age / 0.9;
          chips.push(x, y, z, 0.0035, 1.4 * hot + 0.3, 0.8 * hot + 0.3, 0.35 * hot + 0.3, hot);
        }
        for (let i = 0; i < 60; i++) {
          const te = p0 + (i / 60) * 1.2;
          if (te > t) break;
          const age = t - te;
          if (age > 1.6) continue;
          const a = hash1(i + k * 500, 5) * Math.PI * 2;
          mist.push(sx + Math.cos(a) * 0.06 * age, 0.86 + age * 0.05, sz + Math.sin(a) * 0.06 * age, 0.004 + age * 0.01, 0.8, 0.9, 1.0, 0.18 * (1 - age / 1.6));
        }
      }
      chips.end();
      mist.end();
      // Slugs dropping into the tray.
      slugs.forEach((s, k) => {
        const td = SLUG_DROPS[k]!;
        s.visible = t >= td - 0.18 && t < 152;
        if (!s.visible) return;
        const target = slotPos(k);
        const fall = range(t, td - 0.18, td);
        const y = target.y + (1 - fall * fall) * 0.14;
        const bounce = t > td ? Math.abs(Math.sin((t - td) * 40)) * Math.exp(-(t - td) * 18) * 0.006 : 0;
        s.position.set(fall < 1 ? 0 + (target.x - 0) * fall : target.x, y + bounce, fall < 1 ? (target.z - 0) * fall : target.z);
        s.rotation.set(fall < 1 ? fall * 3 : 0, k * 0.7, 0);
      });
      // Zhang.
      const zp = zPos(t);
      zhang.place(zp[0], zp[1], zp[2], zYaw(t));
      zhang.pose(zPose(t));
      zhang.face(t > 146.8 && t < 148.8 ? "narrow" : Math.sin(t * 0.8) > 0.985 ? "blink" : "neutral");
      tool.visible = t > 147.2 && t < 149.6;
    },
  };
}
