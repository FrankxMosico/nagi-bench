import * as THREE from "three";
import { float as floatPose, type Pose } from "@agentbench/voxel-kit";
import { Actor, suitPainter, suitUp, ZHANG_FACE, type SuitRig } from "../cast";
import { VoxelGrid, vmesh, vglow, jitter } from "../vox";
import { makeCanvas } from "../fx";
import { locatorGeometry, propMesh } from "../props";
import { S } from "../../timeline";
import { addPose, hashInt, scalePose, seg, smooth, trackPose, trackV3, type Key, type V3 } from "../util";

/**
 * Base One: Zhang's sleeping cabin and the airlock below it. The airlock's
 * outer hatch faces the Earth (-Y), so when it opens the shared space backdrop
 * shows through the hole.
 */

export interface CabinSet {
  scene: THREE.Scene;
  zhang: Actor;
  rig: SuitRig;
  photo: THREE.Mesh;
  locator: THREE.Group;
  outerDoor: THREE.Group;
  /** World positions for framing. */
  cabinCentre: THREE.Vector3;
  airlockCentre: THREE.Vector3;
  update(t: number): void;
  headWorld(out?: THREE.Vector3): THREE.Vector3;
}

/** Pixel-art portrait of Zhang's father: a naval officer, black mourning corner. */
function fatherPhoto(): THREE.CanvasTexture {
  const w = 24;
  const h = 30;
  const c = makeCanvas(w, h);
  const ctx = c.getContext("2d")!;
  const fill = (x: number, y: number, ww: number, hh: number, col: string) => {
    ctx.fillStyle = col;
    ctx.fillRect(x, y, ww, hh);
  };
  fill(0, 0, w, h, "#2a241c"); // frame
  fill(2, 2, w - 4, h - 4, "#bdb6a4"); // faded photo background
  // uniform shoulders (navy white summer dress)
  fill(4, 21, 16, 7, "#e9e6dc");
  fill(10, 21, 4, 3, "#2a2f3a");
  fill(5, 23, 3, 1, "#c9a94a");
  fill(16, 23, 3, 1, "#c9a94a");
  // face
  fill(8, 11, 8, 9, "#b58d6c");
  fill(9, 14, 2, 1, "#2a221c");
  fill(13, 14, 2, 1, "#2a221c");
  fill(9, 13, 2, 1, "#4a3a2c");
  fill(13, 13, 2, 1, "#4a3a2c");
  fill(11, 16, 2, 1, "#8f6b52");
  fill(10, 18, 4, 1, "#6b4436");
  // cap: white top, black band, badge
  fill(6, 7, 12, 3, "#efede6");
  fill(7, 10, 10, 1, "#1d1d22");
  fill(11, 8, 2, 1, "#d4b24a");
  // black ribbon across the top-left corner
  for (let k = 0; k < 7; k++) fill(k, 6 - k, 2, 1, "#0b0b0d");
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function cabinShell(): { shell: THREE.BufferGeometry; lights: THREE.BufferGeometry } {
  // Cabin: 2.6 × 2.4 × 3.0 m, voxel 0.1 m. Airlock shaft below: 2.0 m wide, 3.2 m deep.
  const V = 0.1;
  const nx = 28;
  const nz = 32;
  const ny = 60; // y from -3.6 .. 2.4
  const g = new VoxelGrid(nx, ny, nz);
  const L = new VoxelGrid(nx, ny, nz);
  const y0 = 36; // cabin floor index (y = 0)
  const panel = (x: number, y: number, z: number) => {
    const seam = x % 6 === 0 || z % 6 === 0 || (y - y0) % 8 === 0;
    return jitter(seam ? 0xb6bcc4 : 0xdfe3e6, 0.03, hashInt(Math.floor(x / 3), Math.floor(y / 3), Math.floor(z / 3)));
  };
  // cabin box
  for (let y = y0; y < ny; y++) {
    for (let z = 0; z < nz; z++) {
      for (let x = 0; x < nx; x++) {
        const wall = x === 0 || x === nx - 1 || z === 0 || z === nz - 1 || y === y0 || y === ny - 1;
        if (!wall) continue;
        g.set(x, y, z, panel(x, y, z));
      }
    }
  }
  // floor opening into the airlock shaft (2.0 m round-ish)
  for (let z = 6; z < 26; z++) for (let x = 4; x < 24; x++) {
    const d = Math.hypot(x - 13.5, z - 15.5);
    if (d < 9.5) g.set(x, y0, z, null);
    else if (d < 10.5) g.set(x, y0, z, 0xd9a52e);
  }
  // airlock shaft walls
  for (let y = 0; y < y0; y++) {
    for (let z = 4; z < 28; z++) for (let x = 2; x < 26; x++) {
      const d = Math.hypot(x - 13.5, z - 15.5);
      if (d >= 10.5 && d < 11.6) g.set(x, y, z, y % 6 === 0 ? 0x6d7480 : jitter(0x9aa2ab, 0.04, hashInt(x, y, z)));
    }
  }
  // outer hatch frame at the bottom (the door itself is separate)
  for (let z = 4; z < 28; z++) for (let x = 2; x < 26; x++) {
    const d = Math.hypot(x - 13.5, z - 15.5);
    if (d >= 9.0 && d < 11.6) {
      const a = Math.atan2(z - 15.5, x - 13.5);
      g.set(x, 0, z, Math.floor((a + Math.PI) / (Math.PI / 8)) % 2 === 0 ? 0xe2b432 : 0x24262a);
    }
  }
  // ceiling light panels
  for (let z = 8; z < 24; z++) for (let x = 6; x < 22; x++) if (x % 8 > 1 && z % 8 > 1) L.set(x, ny - 2, z, 0xeef6ff);
  // handrails
  for (let z = 3; z < 29; z++) {
    g.set(1, y0 + 12, z, 0xd9a52e);
    g.set(nx - 2, y0 + 12, z, 0xd9a52e);
  }
  // sleeping bag on the back wall (z = 1)
  for (let y = y0 + 3; y < y0 + 21; y++) for (let x = 8; x < 20; x++) {
    const edge = x === 8 || x === 19 || y === y0 + 3 || y === y0 + 20;
    g.set(x, y, 1, edge ? 0x3e4f6e : jitter(0x55698f, 0.05, hashInt(x, y)));
    if (y % 6 === 0) g.set(x, y, 2, 0x2b2f36); // straps
  }
  // porthole on the side wall (x = nx - 1): leave a hole, ring frame
  for (let y = y0 + 10; y < y0 + 18; y++) for (let z = 18; z < 26; z++) {
    const d = Math.hypot(y - (y0 + 13.5), z - 21.5);
    if (d < 3.2) g.set(nx - 1, y, z, null);
    else if (d < 4.3) g.set(nx - 1, y, z, 0x5b6370);
  }
  // locker and panel on the left wall
  for (let y = y0 + 4; y < y0 + 16; y++) for (let z = 20; z < 30; z++) g.set(1, y, z, z % 5 === 0 ? 0x8a929c : 0xc7ccd2);
  L.set(1, y0 + 14, 22, 0x47e07a).set(1, y0 + 14, 24, 0xe0b247);
  return {
    shell: g.geometry(V, "min").translate(-1.4, -3.6, -1.6),
    lights: L.geometry(V, "min").translate(-1.4, -3.6, -1.6),
  };
}

function hatchDoor(): THREE.BufferGeometry {
  const g = new VoxelGrid(20, 1, 20);
  for (let z = 0; z < 20; z++) for (let x = 0; x < 20; x++) {
    const d = Math.hypot(x - 9.5, z - 9.5);
    if (d > 9.6) continue;
    g.set(x, 0, z, d > 8.4 ? 0x7b838e : (x === 9 || x === 10) && d < 6 ? 0xd5a13a : 0xb9c0c8);
  }
  return g.geometry(0.1, "center");
}

export function buildCabin(): CabinSet {
  const scene = new THREE.Scene();
  scene.background = null;
  const shell = cabinShell();
  scene.add(vmesh(shell.shell, { roughness: 0.75, metalness: 0.1 }, { receive: true }));
  scene.add(vglow(shell.lights, 2.2));

  // outer hatch (Earth-facing), slides aside
  const outerDoor = new THREE.Group();
  outerDoor.add(vmesh(hatchDoor(), { roughness: 0.5, metalness: 0.3 }));
  outerDoor.position.set(0, -3.55, 0);
  scene.add(outerDoor);
  // warning beacon in the airlock
  const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.12), new THREE.MeshBasicMaterial({ color: 0xff2a1a }));
  beacon.position.set(0.9, -1.6, -0.4);
  scene.add(beacon);
  const beaconLight = new THREE.PointLight(0xff2a1a, 3, 6, 2);
  beaconLight.position.copy(beacon.position).add(new THREE.Vector3(-0.25, 0, 0.1));
  scene.add(beaconLight);

  // the father's photograph, clipped beside the sleeping bag
  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.2),
    new THREE.MeshStandardMaterial({ map: fatherPhoto(), roughness: 0.6 }),
  );
  photo.position.set(0.75, 1.45, -1.37);
  photo.rotation.y = -0.08;
  scene.add(photo);

  // lighting
  scene.add(new THREE.HemisphereLight(0xdfe9ff, 0x404650, 0.9));
  const ceiling = new THREE.PointLight(0xeef4ff, 6, 8, 2);
  ceiling.position.set(0, 2.1, 0);
  scene.add(ceiling);
  const reading = new THREE.SpotLight(0xffe2b8, 4, 4, 0.5, 0.6, 2);
  reading.position.set(0.9, 2.1, -0.6);
  reading.target.position.set(0.75, 1.4, -1.4);
  scene.add(reading, reading.target);
  const airlockLight = new THREE.PointLight(0xd8e6ff, 2.2, 5, 2);
  airlockLight.position.set(-0.6, -1.4, 0.5);
  scene.add(airlockLight);

  // Zhang, suited, helmet in hand until he puts it on
  const zhang = new Actor({
    face: ZHANG_FACE,
    heightM: 1.8,
    exprs: ["neutral", "blink", "grim"],
    outfits: { suit: suitPainter({ stripe: "#b8322a", flag: true, rank: true, seed: 99 }) },
  });
  const rig = suitUp(zhang);
  rig.setVisor(0.86);
  scene.add(zhang.holder);

  // the locator unit: on his chest, then strapped to the bag, blinking
  const locator = new THREE.Group();
  const locMesh = propMesh(locatorGeometry(), { roughness: 0.5 });
  locator.add(locMesh);
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), new THREE.MeshBasicMaterial({ color: 0x40ff80 }));
  led.position.set(0.04, 0.02, 0.06);
  locator.add(led);
  scene.add(locator);

  const cabinCentre = new THREE.Vector3(0, 1.2, 0);
  const airlockCentre = new THREE.Vector3(0, -1.8, 0);

  const IDLE: Pose = { armR: [-0.25, 0, 0.18], armL: [-0.25, 0, -0.18], legR: [-0.25, 0, 0.05], legL: [-0.1, 0, -0.05] };
  const REACH_CHEST: Pose = { armR: [-1.2, 0, -0.25], armL: [-0.3, 0, -0.2], legR: [-0.25, 0, 0.05], legL: [-0.1, 0, -0.05], neck: [0.35, 0, 0] };
  const STRAP: Pose = { armR: [-1.45, 0.1, 0.1], armL: [-0.4, 0, -0.2], legR: [-0.2, 0, 0.05], legL: [-0.1, 0, -0.05], neck: [0.15, 0.25, 0] };
  const LOOK: Pose = { armR: [-0.6, 0.1, 0.15], armL: [-0.3, 0, -0.2], legR: [-0.2, 0, 0.05], legL: [-0.1, 0, -0.05], neck: [0.05, 0.42, 0] };
  const HELMET_UP: Pose = { armR: [-2.7, 0, 0.35], armL: [-2.7, 0, -0.35], legR: [-0.2, 0, 0.05], legL: [-0.1, 0, -0.05], neck: [-0.1, 0, 0] };
  const keys: Key<Pose>[] = [
    [S.cabin, IDLE],
    [S.locatorOff - 0.5, REACH_CHEST],
    [S.locatorOff + 0.3, REACH_CHEST],
    [S.locatorStrap - 0.2, STRAP],
    [S.locatorStrap + 0.5, STRAP],
    [171.4, LOOK],
    [172.9, LOOK],
    [S.helmetOn - 0.2, HELMET_UP],
    [S.helmetOn + 0.4, HELMET_UP],
    [S.helmetOn + 1.2, IDLE],
  ];
  const posKeys: Key<V3>[] = [
    [S.cabin, [0.2, 0.25, 0.3]],
    [S.locatorStrap, [0.45, 0.28, -0.55]],
    [172.9, [0.45, 0.3, -0.5]],
    [174.6, [0.1, 0.2, 0.1]],
  ];
  const yawKeys: Key<number>[] = [
    [S.cabin, Math.PI * 0.85],
    [S.locatorStrap - 0.6, Math.PI],
    [172.9, Math.PI],
    [174.6, Math.PI * 0.9],
  ];
  // airlock blocking: floating in the shaft, feet toward the outer hatch
  const airPos: Key<V3>[] = [
    [S.airlock, [0, -2.6, 0.1]],
    [S.outerOpen[1], [0, -2.45, 0.1]],
    [181.6, [0, -3.4, 0.1]],
  ];

  const head = new THREE.Vector3();
  return {
    scene,
    zhang,
    rig,
    photo,
    locator,
    outerDoor,
    cabinCentre,
    airlockCentre,
    headWorld(out = new THREE.Vector3()) {
      zhang.fig.anchors.head.updateWorldMatrix(true, false);
      return zhang.fig.anchors.head.localToWorld(out.set(0, -4, 0));
    },
    update(t) {
      zhang.holder.visible = true;
      const inAirlock = t >= S.airlock;
      // helmet: lifted in both hands above his head, then brought down over it
      const helmetUp = t >= S.helmetOn - 0.55;
      const dy = 6 * (1 - smooth(seg(t, S.helmetOn - 0.15, S.helmetOn + 0.15)));
      rig.helmet.visible = helmetUp;
      rig.visor.visible = helmetUp;
      rig.helmet.position.y = -4.0 + dy;
      rig.visor.position.y = -4.5 + dy;
      rig.helmetLamp.forEach((l) => {
        l.visible = helmetUp;
        l.position.y = -0.9 + dy;
      });
      if (!inAirlock) {
        const p = trackV3(posKeys, t);
        zhang.holder.position.copy(p);
        zhang.holder.rotation.set(0, (() => {
          let v = 0;
          for (let i = yawKeys.length - 1; i >= 0; i--) if (t >= yawKeys[i]![0]) { v = yawKeys[i]![1]; break; }
          const k = yawKeys.findIndex((kk) => kk[0] > t);
          if (k > 0) {
            const a = yawKeys[k - 1]!;
            const b = yawKeys[k]!;
            v = a[1] + (b[1] - a[1]) * smooth((t - a[0]) / (b[0] - a[0]));
          }
          return v;
        })(), 0);
        const pose = addPose(trackPose(keys, t), scalePose(floatPose(t * 0.6), 0.25));
        zhang.pose(pose);
      } else {
        const p = trackV3(airPos, t);
        zhang.holder.position.copy(p);
        zhang.holder.rotation.set(0.12, Math.PI, 0);
        zhang.pose(addPose(IDLE, scalePose(floatPose(t * 0.6), 0.3)));
      }
      zhang.perform(t, t > 171.2 && t < 173.0 ? "grim" : "neutral", false, 5);

      // locator: chest → hand → strapped to the bag
      zhang.holder.updateMatrixWorld(true);
      if (t < S.locatorOff) {
        zhang.fig.joints.hips.localToWorld(head.set(-1.5, 8, 2.6));
        locator.position.copy(head);
        locator.quaternion.copy(zhang.holder.quaternion);
      } else if (t < S.locatorStrap) {
        zhang.fig.anchors.handR.getWorldPosition(locator.position);
        locator.quaternion.copy(zhang.holder.quaternion);
      } else {
        locator.position.set(0.55, 1.15, -1.36);
        locator.rotation.set(0, 0, 0.1);
      }
      led.visible = (t * 1.2) % 1 < 0.15;

      // airlock: red until pumped down, then green; the outer hatch slides away
      const green = t >= S.airlockGreen;
      (beacon.material as THREE.MeshBasicMaterial).color.set(green ? 0x2bff6a : 0xff2a1a).multiplyScalar(3);
      beaconLight.color.set(green ? 0x2bff6a : 0xff2a1a);
      beaconLight.intensity = green ? 3 : 2 + Math.sin(t * 9) * 1.2;
      const open = smooth(seg(t, S.outerOpen[0], S.outerOpen[1]));
      outerDoor.position.set(open * 2.3, -3.55 - Math.min(1, open * 4) * 0.12, 0);
    },
  };
}
