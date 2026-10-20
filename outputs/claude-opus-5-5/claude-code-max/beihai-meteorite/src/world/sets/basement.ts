import * as THREE from "three";
import { type Pose } from "@agentbench/voxel-kit";
import { Actor, sweaterOlive, ZHANG_FACE } from "../cast";
import { VoxelGrid, vmesh, jitter, glowBox } from "../vox";
import { Particles } from "../fx";
import { pistolGeometry, PISTOL_MUZZLE, magazineGeometry, propMesh } from "../props";
import { B } from "../../timeline";
import { addPose, hashInt, mulberry32, seg, smooth, trackPose, type Key } from "../util";

/**
 * A low concrete basement, one bulb on a chain. Thirty-six caseless rounds in a
 * grid; a bundle of spacesuit fabric round a slab of raw beef in the corner.
 * Room: x -2..2, z -1.75..1.75, y 0..2.3. Table at the centre, target at (-1.6, 0.7, -1.4).
 */

export interface BasementSet {
  scene: THREE.Scene;
  zhang: Actor;
  points: Record<string, THREE.Vector3>;
  update(t: number): void;
  head(out?: THREE.Vector3): THREE.Vector3;
  hand(out?: THREE.Vector3): THREE.Vector3;
  /** The open face of his left hand, where the fragments lie, and its outward normal. */
  palm(out?: THREE.Vector3, normal?: THREE.Vector3): THREE.Vector3;
}

const TABLE_Y = 0.8;
const GRID0 = new THREE.Vector3(-0.2, TABLE_Y, -0.18);
const STEP = 0.055;
export const TARGET = new THREE.Vector3(-1.55, 0.72, -1.35);
/** The ammunition case, at the far left of the table, clear of the grid. */
const CASE_X = -0.46;

function shell(): THREE.BufferGeometry {
  const V = 0.1;
  const g = new VoxelGrid(40, 23, 35);
  const conc = (i: number, j: number, k: number) => {
    const stain = hashInt(Math.floor(i / 3), Math.floor(j / 4), Math.floor(k / 3));
    return jitter(stain > 0.8 ? 0x5a6155 : stain > 0.5 ? 0x6b7265 : 0x747a6c, 0.06, hashInt(i, j, k));
  };
  for (let k = 0; k < 35; k++) for (let i = 0; i < 40; i++) {
    g.set(i, 0, k, jitter(0x5e5f5a, 0.07, hashInt(i, k)));
    g.set(i, 22, k, conc(i, 22, k));
  }
  for (let j = 1; j < 22; j++) {
    for (let i = 0; i < 40; i++) {
      g.set(i, j, 0, conc(i, j, 0));
      g.set(i, j, 34, conc(i, j, 34));
    }
    for (let k = 0; k < 35; k++) {
      g.set(0, j, k, conc(0, j, k));
      g.set(39, j, k, conc(39, j, k));
    }
  }
  // pipes along the ceiling
  for (let i = 0; i < 40; i++) {
    g.set(i, 21, 4, 0x6b4a32).set(i, 21, 6, 0x3e5a6a).set(i, 20, 6, 0x3e5a6a);
  }
  // floor drain
  g.box(18, 0, 22, 21, 1, 25, 0x2a2b2a);
  // a stair stub in the corner
  for (let s = 0; s < 6; s++) g.box(33, 1, 28 - s * 2, 39, 2 + s * 3, 30 - s * 2, 0x666b60);
  return g.geometry(V, "min").translate(-2, 0, -1.75);
}

function table(): THREE.BufferGeometry {
  const g = new VoxelGrid(12, 8, 8);
  g.box(0, 7, 0, 12, 8, 8, 0x6e4a30);
  for (const [i, k] of [[0, 0], [11, 0], [0, 7], [11, 7]] as const) g.box(i, 0, k, i + 1, 7, k + 1, 0x4a3020);
  return g.geometry(0.1, "min");
}

function crate(): THREE.BufferGeometry {
  const g = new VoxelGrid(6, 6, 6);
  g.fill((x, y, z) => ((x + y + z) % 3 === 0 ? 0x7a5a38 : 0x8a6a44));
  return g.geometry(0.1, "min");
}

/** The test bundle: layered suit fabric. `open` peels the top layer back. */
function bundle(open: boolean): THREE.BufferGeometry {
  const g = new VoxelGrid(12, 6, 10);
  g.fill((x, y, z) => {
    const edge = x === 0 || x === 11 || z === 0 || z === 9 || y === 5;
    if (!open) return edge ? ((x + z) % 4 === 0 ? 0xd9d9d2 : 0xeceae2) : 0xe6e4dc;
    // cutaway: white outer skin, yellow insulation foam, blue tubing, then the beef
    if (y === 5) return null;
    if (y >= 1 && y <= 4 && x > 1 && x < 10 && z > 1 && z < 8) {
      // raw beef: deep red, irregular streaks of fat, a darker cut surface
      const fat = Math.abs(Math.sin(x * 0.9 + z * 0.35 + y * 1.7)) < 0.16;
      return fat ? 0xe8cfc4 : y === 4 ? ((x * 7 + z * 3) % 5 === 0 ? 0x7e1a20 : 0x9a2228) : 0x8a1c22;
    }
    if (x === 1 || x === 10 || z === 1 || z === 8) return y % 2 === 0 ? 0xd8c070 : 0x3a6ab0;
    return 0xeceae2;
  });
  return g.geometry(0.06, "min");
}

/** A caseless round: a propellant block with a bullet (copper) or a meteorite tip. */
function roundGeo(tip: "copper" | "stone" | "none"): THREE.BufferGeometry {
  const g = new VoxelGrid(3, 7, 3);
  g.box(0, 0, 0, 3, 4, 3, 0x3a3226);
  g.box(0, 3, 0, 3, 4, 3, 0x2a241c);
  if (tip === "copper") g.box(0, 4, 0, 3, 6, 3, 0xb8733a).set(1, 6, 1, 0xc9844a);
  if (tip === "stone") g.box(0, 4, 0, 3, 6, 3, 0x6f747a).set(1, 6, 1, 0x9aa0a6);
  return g.geometry(0.0028, "center");
}

export function buildBasement(): BasementSet {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020202);
  scene.add(vmesh(shell(), { roughness: 0.95 }, { receive: true }));
  const tbl = vmesh(table(), { roughness: 0.8 }, { cast: true, receive: true });
  tbl.position.set(-0.6, 0, -0.4);
  scene.add(tbl);
  const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.006, 0.6), new THREE.MeshStandardMaterial({ color: 0x2c3a2e, roughness: 1 }));
  cloth.position.set(0, TABLE_Y + 0.003, 0);
  cloth.receiveShadow = true;
  scene.add(cloth);
  const cr = vmesh(crate(), { roughness: 0.9 }, { cast: true, receive: true });
  cr.position.set(-1.9, 0, -1.7);
  scene.add(cr);
  const bundleClosed = vmesh(bundle(false), { roughness: 0.95 }, { cast: true, receive: true });
  const bundleOpen = vmesh(bundle(true), { roughness: 0.8 }, { cast: true, receive: true });
  for (const b of [bundleClosed, bundleOpen]) {
    b.position.set(TARGET.x - 0.36, 0.6, TARGET.z - 0.3);
    scene.add(b);
  }
  // bullet holes: small dark squares on the bundle's face
  const holes = [0, 1, 2, 3].map((k) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.018, 0.004), new THREE.MeshBasicMaterial({ color: 0x1a1210 }));
    h.position.set(TARGET.x - 0.1 + k * 0.06 + (k % 2) * 0.01, 0.74 + (k % 3) * 0.02, TARGET.z + 0.302);
    scene.add(h);
    return h;
  });

  // rounds: 6 × 6 on the cloth
  const geoCopper = roundGeo("copper");
  const geoStone = roundGeo("stone");
  const geoBare = roundGeo("none");
  const roundMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.4 });
  const rounds = Array.from({ length: 36 }, (_, k) => {
    const m = new THREE.Mesh(geoCopper, roundMat);
    m.position.set(GRID0.x + (k % 6) * STEP, TABLE_Y + 0.012, GRID0.z + Math.floor(k / 6) * STEP);
    m.castShadow = true;
    scene.add(m);
    return m;
  });
  // tools on the table
  const pliers = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.012, 0.16), new THREE.MeshStandardMaterial({ color: 0xa02a22, roughness: 0.5 }));
  pliers.position.set(0.25, TABLE_Y + 0.01, 0.1);
  scene.add(pliers);
  const glue = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.12), new THREE.MeshStandardMaterial({ color: 0xd8d8d0, roughness: 0.4 }));
  glue.position.set(0.3, TABLE_Y + 0.016, -0.12);
  scene.add(glue);
  const glueBand = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.032, 0.03), new THREE.MeshStandardMaterial({ color: 0xc8302a }));
  glueBand.position.copy(glue.position).add(new THREE.Vector3(0, 0, 0.02));
  scene.add(glueBand);
  // an open steel case lined with foam, so the rounds can stand inside it
  const caseG = new VoxelGrid(22, 6, 16);
  caseG.box(0, 0, 0, 22, 6, 16, 0x23262b).box(1, 1, 1, 21, 6, 15, null).box(1, 1, 1, 21, 2, 15, 0x3a4038);
  const caseBox = vmesh(caseG.geometry(0.01, "center"), { roughness: 0.5, metalness: 0.4 }, { cast: true, receive: true });
  caseBox.position.set(CASE_X, TABLE_Y + 0.03, 0.14);
  scene.add(caseBox);
  const caseLid = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, 0.16), new THREE.MeshStandardMaterial({ color: 0x2b2f35, roughness: 0.5, metalness: 0.4 }));
  scene.add(caseLid);

  // the bulb
  const bulb = glowBox(0.07, 0.09, 0.07, 0xffe0a8, 6);
  bulb.position.set(-0.1, 1.95, 0.05);
  scene.add(bulb);
  const cord = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.3, 0.01), new THREE.MeshStandardMaterial({ color: 0x111111 }));
  cord.position.set(-0.1, 2.15, 0.05);
  scene.add(cord);
  const bulbLight = new THREE.PointLight(0xffd59a, 0, 0, 2);
  bulbLight.position.copy(bulb.position).add(new THREE.Vector3(0, -0.06, 0));
  bulbLight.castShadow = true;
  bulbLight.shadow.mapSize.set(1024, 1024);
  bulbLight.shadow.bias = -0.002;
  scene.add(bulbLight);
  const hemi = new THREE.HemisphereLight(0x3a3a30, 0x101010, 0);
  scene.add(hemi);
  // what the bulb throws back up off the cloth: a soft warm fill on his face over the work
  const bounce = new THREE.SpotLight(0xffc890, 0, 1.4, 0.85, 1.0, 2);
  bounce.position.set(0.05, 0.84, 0.0);
  bounce.target.position.set(0.05, 1.3, 0.6);
  scene.add(bounce, bounce.target);
  const flashLight = new THREE.PointLight(0xffd8a0, 0, 0, 2);
  scene.add(flashLight);

  const smoke = new Particles(240, { soft: true });
  scene.add(smoke.points);
  const grit = new Particles(40, {});
  scene.add(grit.points);

  // Zhang
  const zhang = new Actor({ face: ZHANG_FACE, heightM: 1.8, exprs: ["neutral", "blink", "grim", "squint"], outfits: { sweater: sweaterOlive } });
  scene.add(zhang.holder);
  const pistol = propMesh(pistolGeometry(), { metalness: 0.55, roughness: 0.38 });
  zhang.fig.anchors.handR.add(pistol);
  const flash = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 2.2), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.86, 0.6).multiplyScalar(12) }));
  flash.position.copy(PISTOL_MUZZLE).add(new THREE.Vector3(0, 0, 1.2));
  pistol.add(flash);
  const mag = propMesh(magazineGeometry());
  zhang.fig.anchors.handL.add(mag);
  mag.position.set(0, 0.6, 0.6);
  const pliersHand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 2.6), new THREE.MeshStandardMaterial({ color: 0xa02a22, roughness: 0.5 }));
  pliersHand.position.set(0, 0, 1.4);
  zhang.fig.anchors.handR.add(pliersHand);
  const knife = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 3.0), new THREE.MeshStandardMaterial({ color: 0xc9ced4, metalness: 0.8, roughness: 0.2 }));
  knife.position.set(0, 0, 1.8);
  zhang.fig.anchors.handR.add(knife);

  const SEAT: Pose = { legR: [-Math.PI / 2 - 0.1, 0, 0.05], legL: [-Math.PI / 2 - 0.1, 0, -0.05], lift: -4.0, armR: [-1.48, 0.12, 0.05], armL: [-1.45, -0.12, -0.05], neck: [0.32, 0, 0], hips: [0.1, 0, 0] };
  // standing under the bulb, the open hand held up to the light
  const PALM: Pose = { armL: [-1.15, 0.2, -0.2], armR: [-0.25, 0, 0.08], neck: [0.55, 0.12, 0], hips: [0.08, 0, 0] };
  const AIM: Pose = { armR: [-Math.PI / 2 + 0.05, 0.18, 0.1], armL: [-Math.PI / 2 + 0.07, 0.18, -0.26], neck: [0.06, 0.15, 0], hips: [0, 0.35, 0] };
  const CROUCH: Pose = { armR: [-1.35, 0, 0.1], armL: [-1.25, 0, -0.1], neck: [0.6, 0, 0], hips: [0.35, 0, 0], legR: [-0.35, 0, 0], legL: [-0.35, 0, 0], lift: -2 };
  const keys: Key<Pose>[] = [
    [132, SEAT],
    [144.6, SEAT],
    [145.15, AIM],
    [148.6, AIM],
    [149.2, CROUCH],
    [158.55, CROUCH],
    [158.6, PALM],
    [163.75, PALM],
    [163.8, SEAT],
    [168, SEAT],
  ];
  const stool = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.46, 0.34), new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.85 }));
  stool.position.set(0.05, 0.23, 0.68);
  stool.castShadow = true;
  scene.add(stool);
  const crouchAt = new THREE.Vector3(TARGET.x + 0.82, 0, TARGET.z + 0.42);
  const crouchYaw = Math.atan2(TARGET.x - crouchAt.x, TARGET.z - crouchAt.z);
  const palmAt = new THREE.Vector3(-0.6, 0, -0.75);
  const palmYaw = Math.atan2(-0.1 - palmAt.x, 0.05 - palmAt.z); // toward the bulb
  const where = (t: number) => {
    // seated at the table, then standing to fire, crouched at the bundle, up under the bulb
    if (t < 144.6) return { p: new THREE.Vector3(0.05, 0, 0.62), yaw: Math.PI };
    if (t < 148.8) return { p: new THREE.Vector3(0.3, 0, 0.75), yaw: Math.PI + 0.62 };
    if (t < 158.6) return { p: crouchAt, yaw: crouchYaw };
    if (t < 163.8) return { p: palmAt, yaw: palmYaw };
    return { p: new THREE.Vector3(0.05, 0, 0.62), yaw: Math.PI };
  };

  const shotFlash = (t: number) => {
    let f = 0;
    for (const s of B.shots) {
      const d = t - s;
      if (d >= 0 && d < 0.09) f = Math.max(f, 1 - d / 0.09);
    }
    return f;
  };

  const tmp = new THREE.Vector3();
  return {
    scene,
    zhang,
    points: { table: new THREE.Vector3(0, TABLE_Y, 0), grid: GRID0.clone().add(new THREE.Vector3(STEP * 2.5, 0, STEP * 2.5)), target: TARGET.clone(), bulb: bulb.position.clone() },
    head(out = new THREE.Vector3()) {
      zhang.fig.anchors.head.updateWorldMatrix(true, false);
      return zhang.fig.anchors.head.localToWorld(out.set(0, -4, 0));
    },
    hand(out = new THREE.Vector3()) {
      zhang.fig.anchors.handL.updateWorldMatrix(true, false);
      return zhang.fig.anchors.handL.getWorldPosition(out);
    },
    palm(out = new THREE.Vector3(), normal) {
      const a = zhang.fig.anchors.handL;
      a.updateWorldMatrix(true, false);
      // anchor frame: +Z along the arm to the fist, +Y the face that opens upward
      if (normal) normal.set(0, 1, 0).transformDirection(a.matrixWorld);
      return a.localToWorld(out.set(0, 2.25, -1.0));
    },
    update(t) {
      const lit = t >= B.chain && t < B.chainOff;
      bulbLight.intensity = lit ? 9 : 0;
      hemi.intensity = lit ? 0.35 : 0;
      bounce.intensity = lit ? 0.75 : 0;
      (bulb.material as THREE.MeshBasicMaterial).color.set(0xffe0a8).multiplyScalar(lit ? 6 : 0.05);
      const w = where(t);
      zhang.holder.position.copy(w.p);
      zhang.holder.rotation.y = w.yaw;
      let pose = trackPose(keys, t);
      // working hands: small repeated pulls with the pliers
      if (t > B.pulls[0]! - 0.3 && t < B.tips + 0.6) pose = addPose(pose, { armR: [Math.sin(t * 9) * 0.08, 0, 0] });
      // recoil
      for (const s of B.shots) {
        const d = t - s;
        if (d >= 0 && d < 0.3) pose = addPose(pose, { armR: [-0.25 * Math.exp(-d * 18), 0, 0], armL: [-0.22 * Math.exp(-d * 18), 0, 0] });
      }
      zhang.pose(pose);
      zhang.perform(t, t > 145 && t < 148.6 ? "squint" : "grim", false, 5);

      pistol.visible = t > B.load[0]! - 0.4 && t < 148.9;
      mag.visible = t > B.load[0]! - 0.6 && t < B.insert;
      pliersHand.visible = t > B.pulls[0]! - 0.4 && t < B.glue - 0.2;
      knife.visible = t > B.knife[0] - 0.3 && t < B.knife[1] + 0.2;
      const f = shotFlash(t);
      flash.visible = f > 0.3;
      if (f > 0) {
        flash.updateWorldMatrix(true, false);
        flash.getWorldPosition(flashLight.position);
        flashLight.intensity = 70 * f;
      } else flashLight.intensity = 0;

      // rounds: copper heads pulled off one by one, meteorite tips glued on
      const pulled = t < B.pulls[0]! ? 0 : Math.min(36, Math.floor(1 + seg(t, B.pulls[0]!, B.glue) * 36));
      const tipped = t < B.glue ? 0 : Math.min(36, Math.floor(seg(t, B.glue, B.tips + 0.5) * 36.99));
      const loaded = B.load.filter((l) => t >= l).length;
      rounds.forEach((m, k) => {
        m.geometry = k < tipped ? geoStone : k < pulled ? geoBare : geoCopper;
        const inCase = t >= 163.8 && k >= 4;
        const used = k < loaded;
        m.visible = !used && !(t >= B.caseLatch && inCase);
        if (inCase && t < B.caseLatch) {
          const kk = k - 4;
          m.position.set(CASE_X - 0.077 + (kk % 8) * 0.022, TABLE_Y + 0.03, 0.107 + Math.floor(kk / 8) * 0.022);
        } else m.position.set(GRID0.x + (k % 6) * STEP, TABLE_Y + 0.012, GRID0.z + Math.floor(k / 6) * STEP);
      });
      const lidOpen = t < B.caseLatch - 0.6 ? 1 : 1 - smooth(seg(t, B.caseLatch - 0.6, B.caseLatch));
      caseLid.position.set(CASE_X, TABLE_Y + 0.064 + lidOpen * 0.07, 0.14 - lidOpen * 0.08);
      caseLid.rotation.x = -lidOpen * 1.2;

      // the bundle: holes after the shots, opened for inspection
      holes.forEach((h, k) => (h.visible = t > B.shots[k]! && t < B.unwrap[0]));
      const opened = t >= B.unwrap[0] + 0.8;
      bundleClosed.visible = !opened;
      bundleOpen.visible = opened;

      // gun smoke hanging in the bulb light
      smoke.update((i, s) => {
        const r = mulberry32(i * 3 + 11);
        const shot = B.shots[i % 4]!;
        const age = t - shot - r() * 0.1;
        if (age < 0 || age > 22) return false;
        const muzzle = new THREE.Vector3(-0.15, 1.3, 0.25);
        const dir = TARGET.clone().sub(muzzle).normalize();
        s.p.copy(muzzle).addScaledVector(dir, (1 - Math.exp(-age * 2.5)) * (0.3 + r() * 0.6));
        s.p.x += (r() - 0.5) * age * 0.12;
        s.p.y += age * 0.025 + (r() - 0.5) * 0.15 * Math.min(1, age);
        s.p.z += (r() - 0.5) * age * 0.12;
        s.size = 0.06 + Math.min(age, 6) * 0.07 + r() * 0.05;
        s.alpha = (lit ? 0.11 : 0) * Math.exp(-age * 0.12) * Math.min(1, age * 8);
        s.c.setRGB(0.72, 0.72, 0.68);
        return s.alpha > 0.003;
      });
      // the fragments in his palm: crumbs lying on the open face of the hand
      const palm = t > 158.4 && t < 163.8;
      const handL = zhang.fig.anchors.handL;
      if (palm) handL.updateWorldMatrix(true, false);
      grit.update((i, s) => {
        if (!palm) return false;
        const r = mulberry32(i * 5 + 2);
        handL.localToWorld(s.p.set((r() - 0.5) * 2.4, 2.3 + r() * 0.15, -0.3 - r() * 2.2));
        s.size = 0.004 + r() * 0.006;
        const glint = r() > 0.82;
        s.c.setRGB(0.07, 0.065, 0.06).multiplyScalar(glint ? 5 : 1);
        return true;
      });
    },
  };
}
