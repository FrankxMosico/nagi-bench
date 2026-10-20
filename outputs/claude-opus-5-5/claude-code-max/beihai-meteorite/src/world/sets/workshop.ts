import * as THREE from "three";
import { walk as walkPose, type Pose } from "@agentbench/voxel-kit";
import { Actor, coatNavy, ZHANG_FACE } from "../cast";
import { VoxelGrid, vmesh, vglow, jitter, rockGeometry, glowBox } from "../vox";
import { Particles, makeCanvas } from "../fx";
import { ironPalette } from "./prologue";
import { W } from "../../timeline";
import { speaking } from "../../voice";
import { addPose, hashInt, mulberry32, seg, smooth, trackNum, trackPose, trackV3, type Key, type V3 } from "../util";

/**
 * A model workshop in a Space Force institute, after hours. One CNC lathe in a
 * cone of cold light; everything else is silhouettes and moonlit windows.
 * The lathe faces +Z; its spindle axis runs along X.
 */

export interface WorkshopSet {
  scene: THREE.Scene;
  zhang: Actor;
  points: Record<string, THREE.Vector3>;
  update(t: number): void;
  head(out?: THREE.Vector3): THREE.Vector3;
}

const SPINDLE = new THREE.Vector3(-0.35, 1.18, 0.05);

function hall(): { solid: THREE.BufferGeometry; glow: THREE.BufferGeometry } {
  const V = 0.2;
  const nx = 100; // x -10..10
  const ny = 32; // y 0..6.4
  const nz = 70; // z -7..7
  const g = new VoxelGrid(nx, ny, nz);
  const L = new VoxelGrid(nx, ny, nz);
  for (let k = 0; k < nz; k++) for (let i = 0; i < nx; i++) {
    g.set(i, 0, k, jitter((i + k) % 9 === 0 ? 0x3d4044 : 0x4a4d52, 0.05, hashInt(Math.floor(i / 3), Math.floor(k / 3))));
    if ((i === 40 || i === 60) && k > 10 && k < 60) g.set(i, 0, k, 0xc9a23a); // floor safety lines
  }
  for (let j = 1; j < ny; j++) {
    for (let i = 0; i < nx; i++) g.set(i, j, 0, j < 6 ? 0x4c5156 : 0x5e6368);
    for (let k = 0; k < nz; k++) {
      g.set(0, j, k, 0x55595e);
      g.set(nx - 1, j, k, 0x55595e);
    }
  }
  // tall factory windows on the back wall, moonlit
  for (let w = 0; w < 6; w++) {
    const i0 = 6 + w * 15;
    for (let i = i0; i < i0 + 12; i++) for (let j = 14; j < 29; j++) {
      const mull = (i - i0) % 4 === 0 || j % 5 === 4 || i === i0 + 11 || j === 14;
      if (mull) g.set(i, j, 0, 0x22252a);
      else {
        g.set(i, j, 0, null);
        L.set(i, j, 0, 0x6f8fc8);
      }
    }
  }
  // roof trusses
  for (let i = 0; i < nx; i += 12) for (let k = 0; k < nz; k++) g.set(i, 30, k, 0x2c2f33);
  // silhouettes of other machines
  const rng = mulberry32(3);
  for (let m = 0; m < 6; m++) {
    const i0 = 6 + Math.floor(rng() * 80);
    const k0 = 6 + Math.floor(rng() * 18);
    if (Math.abs(i0 - 50) < 14 && k0 > 28 && k0 < 42) continue;
    const w = 6 + Math.floor(rng() * 8);
    const h = 5 + Math.floor(rng() * 6);
    const d = 5 + Math.floor(rng() * 5);
    g.box(i0, 1, k0, i0 + w, 1 + h, k0 + d, jitter(0x3f5a52, 0.08, rng()));
    L.set(i0 + 1, h - 1, k0 + d, 0x33ff66);
  }
  return { solid: g.geometry(V, "min").translate(-10, 0, -7), glow: L.geometry(V, "min").translate(-10, 0, -7) };
}

function lathe(): { body: THREE.BufferGeometry; glow: THREE.BufferGeometry } {
  // 2.6 × 1.8 × 1.3 m at 0.05 m voxels, origin at the centre of its footprint
  const V = 0.05;
  const g = new VoxelGrid(52, 36, 26);
  const L = new VoxelGrid(52, 36, 26);
  const body = 0xc9cfc8;
  const dark = 0x3d4146;
  g.box(0, 0, 0, 52, 10, 26, dark); // base
  g.box(0, 10, 0, 52, 36, 4, body); // back wall of the enclosure
  g.box(3, 13, 3, 49, 33, 4, 0x7d837f); // its inside face, oil-darkened
  g.box(0, 10, 0, 3, 36, 26, body); // left end
  g.box(49, 10, 0, 52, 36, 26, body); // right end
  g.box(0, 33, 0, 52, 36, 26, body); // roof
  g.box(3, 10, 4, 49, 13, 22, 0x6c7279); // chip tray floor
  // headstock on the left with the chuck facing +X
  g.box(3, 13, 6, 14, 30, 20, 0xaab1aa);
  // tool turret on the right
  g.box(30, 13, 8, 38, 22, 18, 0x8e959c);
  g.box(31, 22, 10, 37, 26, 16, 0x6c7279);
  g.box(27, 21, 12, 31, 23, 14, 0x2a2d31); // the cutting tool holder
  // control panel on the right front
  g.box(40, 18, 22, 49, 32, 26, 0x2e3237);
  for (let i = 41; i < 48; i++) for (let j = 25; j < 31; j++) L.set(i, j, 25, 0x0f3a24); // screen backing
  L.set(42, 20, 25, 0x2bff6a).set(45, 20, 25, 0xff3322); // start / e-stop
  // a stripe and a small logo plate
  g.box(0, 9, 25, 52, 10, 26, 0xd9a52e);
  // work light inside the roof
  for (let i = 8; i < 44; i++) L.set(i, 32, 10, 0xeaf4ff);
  return { body: g.geometry(V, "center").translate(0, 0.9, 0), glow: L.geometry(V, "center").translate(0, 0.9, 0) };
}

/** Seven-segment style counter texture for the lathe screen. */
function counterTexture(): { tex: THREE.CanvasTexture; draw: (n: number, rpm: number) => void } {
  const w = 48;
  const h = 32;
  const c = makeCanvas(w, h);
  const ctx = c.getContext("2d")!;
  const DIG: Record<string, string[]> = {
    "0": ["111", "101", "101", "101", "111"],
    "1": ["010", "110", "010", "010", "111"],
    "2": ["111", "001", "111", "100", "111"],
    "3": ["111", "001", "111", "001", "111"],
    "4": ["101", "101", "111", "001", "001"],
    "5": ["111", "100", "111", "001", "111"],
    "6": ["111", "100", "111", "101", "111"],
    "7": ["111", "001", "010", "010", "010"],
    "8": ["111", "101", "111", "101", "111"],
    "9": ["111", "101", "111", "001", "111"],
  };
  const glyph = (s: string, x0: number, y0: number, sc: number, col: string) => {
    ctx.fillStyle = col;
    let x = x0;
    for (const ch of s) {
      const g = DIG[ch];
      if (g) for (let y = 0; y < 5; y++) for (let xx = 0; xx < 3; xx++) if (g[y]![xx] === "1") ctx.fillRect(x + xx * sc, y0 + y * sc, sc, sc);
      x += 4 * sc;
    }
  };
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  let last = "";
  const draw = (n: number, rpm: number) => {
    const key = `${n}:${rpm}`;
    if (key === last) return;
    last = key;
    ctx.fillStyle = "#03140b";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1a5a32";
    ctx.fillRect(2, 2, 44, 1);
    glyph(String(n).padStart(3, "0"), 6, 6, 3, "#56ff9a");
    glyph(String(rpm).padStart(4, "0"), 8, 24, 1, "#2fbf6a");
    glyph("762", 30, 24, 1, "#2fbf6a");
    tex.needsUpdate = true;
  };
  draw(0, 0);
  return { tex, draw };
}

export function buildWorkshop(): WorkshopSet {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030405);
  scene.fog = new THREE.FogExp2(0x070a10, 0.03);
  const h = hall();
  scene.add(vmesh(h.solid, { roughness: 0.95 }, { receive: true, cast: true }));
  scene.add(vglow(h.glow, 2.2));

  const lt = lathe();
  const latheMesh = vmesh(lt.body, { roughness: 0.55, metalness: 0.25 }, { cast: true, receive: true });
  scene.add(latheMesh);
  scene.add(vglow(lt.glow, 2.2));
  // glass door on the enclosure front (slides along x)
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.9, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xbfd6e2, transparent: true, opacity: 0.16, roughness: 0.1, metalness: 0.2, depthWrite: false }),
  );
  scene.add(door);
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.06, 0.05), new THREE.MeshStandardMaterial({ color: 0x8e959c, roughness: 0.5 }));
  scene.add(doorFrame);
  // counter screen
  const counter = counterTexture();
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.24), new THREE.MeshBasicMaterial({ map: counter.tex }));
  screen.position.set(0.97, 1.42, 0.651);
  scene.add(screen);

  // chuck + spinning work
  const chuck = new THREE.Group();
  const chuckG = new VoxelGrid(4, 8, 8);
  chuckG.fill((x, y, z) => (Math.hypot(y - 3.5, z - 3.5) < 4 ? (x === 3 && (Math.abs(y - 3.5) < 0.6 || Math.abs(z - 3.5) < 0.6) ? 0x2a2d31 : 0x9ea5ac) : null));
  chuck.add(vmesh(chuckG.geometry(0.04, "center"), { roughness: 0.35, metalness: 0.7 }));
  chuck.position.copy(SPINDLE);
  scene.add(chuck);
  const lump = vmesh(rockGeometry(91, 6, 0.0078, ironPalette(91), 0.45), { roughness: 0.4, metalness: 0.6 });
  scene.add(lump);
  const rodG = new VoxelGrid(10, 2, 2);
  rodG.box(0, 0, 0, 10, 2, 2, 0x9aa0a8);
  const rod = vmesh(rodG.geometry(0.004, "min"), { roughness: 0.3, metalness: 0.8 });
  scene.add(rod);
  const tool = glowBox(0.008, 0.008, 0.008, 0xffffff, 1);
  scene.add(tool);

  // the tray of finished slugs on the bench
  const bench = new VoxelGrid(16, 9, 8);
  bench.box(0, 8, 0, 16, 9, 8, 0x6a6f75);
  for (const [i, k] of [[0, 0], [15, 0], [0, 7], [15, 7]] as const) bench.box(i, 0, k, i + 1, 8, k + 1, 0x3d4146);
  const benchMesh = vmesh(bench.geometry(0.1, "min"), { roughness: 0.6, metalness: 0.4 }, { receive: true, cast: true });
  benchMesh.position.set(1.6, 0, 0.6);
  scene.add(benchMesh);
  const tray = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.03, 0.22), new THREE.MeshStandardMaterial({ color: 0x3a3f45, roughness: 0.5, metalness: 0.5 }));
  tray.position.set(2.15, 0.915, 0.95);
  scene.add(tray);
  const slugGeo = new VoxelGrid(2, 3, 2);
  slugGeo.box(0, 0, 0, 2, 3, 2, 0x8a9096).box(0, 2, 0, 2, 3, 2, 0xc9ced3);
  const slugG = slugGeo.geometry(0.004, "center");
  const slugMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, metalness: 0.8 });
  const slugs = Array.from({ length: 36 }, (_, k) => {
    const m = new THREE.Mesh(slugG, slugMat);
    const r = mulberry32(k + 3);
    m.position.set(2.15 + (r() - 0.5) * 0.26, 0.937, 0.95 + (r() - 0.5) * 0.15);
    m.rotation.set(Math.PI / 2, r() * 3, r() * 3);
    scene.add(m);
    return m;
  });
  // the special cutting tool he takes away, and his evidence bag
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.06), new THREE.MeshStandardMaterial({ color: 0x2b2b26, roughness: 0.9 }));
  bag.position.set(1.85, 1.0, 0.75);
  scene.add(bag);

  // lights
  const fluoro = glowBox(1.6, 0.05, 0.12, 0xeaf4ff, 3.5);
  fluoro.position.set(0, 3.2, 0.4);
  scene.add(fluoro);
  const key = new THREE.SpotLight(0xdfeeff, 0, 0, 0.8, 0.55, 2);
  key.position.set(0, 3.15, 0.6);
  key.target.position.set(0.1, 0.9, 0.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key, key.target);
  const inner = new THREE.PointLight(0xeaf4ff, 0, 2.2, 2);
  inner.position.set(-0.1, 1.55, 0.1);
  scene.add(inner);
  // moonlight only gets in through the high windows: patches across the floor
  const moon = new THREE.DirectionalLight(0x7f9fe0, 2.6);
  moon.position.set(-3, 6, -8);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const mc = moon.shadow.camera as THREE.OrthographicCamera;
  mc.left = -14;
  mc.right = 14;
  mc.top = 12;
  mc.bottom = -12;
  mc.near = 0.5;
  mc.far = 40;
  moon.shadow.bias = -0.0008;
  scene.add(moon, moon.target);
  scene.add(new THREE.HemisphereLight(0x3a4a70, 0x101014, 1.8));
  // a bench lamp over the tray
  const benchLamp = new THREE.SpotLight(0xfff0dc, 0, 3, 0.7, 0.6, 2);
  benchLamp.position.set(2.2, 1.75, 1.05);
  benchLamp.target.position.set(2.15, 0.9, 0.95);
  scene.add(benchLamp, benchLamp.target);
  const benchBulb = glowBox(0.12, 0.04, 0.12, 0xfff0dc, 3);
  benchBulb.position.set(2.2, 1.77, 1.05);
  scene.add(benchBulb);
  const phoneGlow = new THREE.PointLight(0x8fd0ff, 0, 1.8, 2);
  scene.add(phoneGlow);
  const sparkLight = new THREE.PointLight(0xffa040, 0, 1.6, 2);
  sparkLight.position.copy(SPINDLE).add(new THREE.Vector3(0.12, 0, 0.1));
  scene.add(sparkLight);

  const sparks = new Particles(160, { additive: true });
  scene.add(sparks.points);
  const mist = new Particles(60, { soft: true });
  scene.add(mist.points);

  const zhang = new Actor({ face: ZHANG_FACE, heightM: 1.8, exprs: ["neutral", "blink", "talk", "grim"], outfits: { coat: coatNavy } });
  scene.add(zhang.holder);
  const phone = new THREE.Group();
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.15), new THREE.MeshStandardMaterial({ color: 0x141518, roughness: 0.3 }));
  const phoneScreen = glowBox(0.5, 1.0, 0.02, 0x8fd0ff, 1.8);
  phoneScreen.position.z = 0.09;
  phone.add(phoneBody, phoneScreen);
  phone.position.set(0, 0.2, 0.6);
  zhang.fig.anchors.handR.add(phone);
  const wrench = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.6), new THREE.MeshStandardMaterial({ color: 0x8a9096, metalness: 0.7, roughness: 0.35 }));
  wrench.position.set(0, 0, 0.9);
  zhang.fig.anchors.handL.add(wrench);

  const zPos: Key<V3>[] = [
    [105.8, [-6.5, 0, 4.6]],
    [W.answer, [-5.2, 0, 3.9]],
    [111.2, [-2.0, 0, 2.6]],
    [W.hangUp, [-0.9, 0, 1.6]],
    [W.lightOn + 0.4, [-0.3, 0, 1.25]],
    [W.sweep[0] - 0.3, [-0.3, 0, 1.25]],
    [W.sweep[0], [1.0, 0, 1.4]],
    [W.lightOff, [1.0, 0, 1.4]],
    [132, [0.6, 0, 2.2]],
  ];
  const zYaw: Key<number>[] = [
    [105.8, 2.3],
    [W.hangUp, 2.6],
    [W.lightOn + 0.4, Math.PI],
    [W.sweep[0] - 0.3, Math.PI],
    [W.sweep[0], Math.PI + 0.5],
    [W.lightOff, Math.PI + 0.6],
  ];
  const STAND: Pose = { armR: [0, 0, 0.06], armL: [0, 0, -0.06] };
  const PHONE: Pose = { armR: [-2.5, 0.5, -0.45], armL: [0, 0, -0.06], neck: [0, -0.15, 0] };
  const WORK: Pose = { armR: [-1.15, 0, -0.05], armL: [-1.1, 0, 0.05], neck: [0.45, 0, 0], hips: [0.12, 0, 0], legR: [-0.12, 0, 0], legL: [-0.12, 0, 0] };
  const zhangPose = (t: number): Pose => {
    const walking = t < 111.2 || (t > W.sweep[0] - 0.3 && t < W.sweep[0]) || t > W.lightOff;
    let p: Pose = walking ? walkPose(t, 1.2) : STAND;
    if (t > W.answer - 0.3 && t < W.hangUp + 0.3) {
      const k = smooth(seg(t, W.answer - 0.3, W.answer + 0.2)) * (1 - smooth(seg(t, W.hangUp, W.hangUp + 0.4)));
      p = addPose(p, { armR: [PHONE.armR![0] * k, PHONE.armR![1] * k, PHONE.armR![2] * k] });
    }
    if (t > W.lightOn + 0.4 && t < W.sweep[0] - 0.3) p = trackPose([[0, STAND], [1, WORK]], smooth(seg(t, W.lightOn + 0.4, W.clamp)));
    if (t > W.sweep[0] && t < W.lightOff) {
      const sweep = Math.sin(t * 7) * 0.25;
      p = { ...WORK, armR: [-1.0 + sweep, 0.2, 0.0], armL: [-0.7, 0, 0.1] };
      if (t > W.toolOut - 0.4) p = { ...WORK, armL: [-1.3, 0, 0.1], armR: [-0.5, 0, 0.1] };
    }
    if (t > W.lightOff - 0.4 && t < W.lightOff + 0.2) p = addPose(p, { armR: [-1.4, 0, 0.3] });
    return p;
  };

  const tmp = new THREE.Vector3();
  return {
    scene,
    zhang,
    points: {
      spindle: SPINDLE.clone(),
      screen: screen.position.clone(),
      tray: tray.position.clone(),
      lathe: new THREE.Vector3(0, 1.1, 0),
    },
    head(out = new THREE.Vector3()) {
      zhang.fig.anchors.head.updateWorldMatrix(true, false);
      return zhang.fig.anchors.head.localToWorld(out.set(0, -4, 0));
    },
    update(t) {
      zhang.holder.position.copy(trackV3(zPos, t));
      zhang.holder.rotation.y = trackNum(zYaw, t);
      zhang.pose(zhangPose(t));
      zhang.perform(t, t > W.lightOn ? "grim" : "neutral", speaking("章北海", t, ["dialogue"]), 5);
      phone.visible = t > W.ring - 0.2 && t < W.hangUp + 0.4;
      wrench.visible = t > W.toolOut - 0.5 && t < W.lightOff;
      (phoneScreen.material as THREE.MeshBasicMaterial).color.set(0x8fd0ff).multiplyScalar(t < W.answer ? 1.2 + Math.sin(t * 12) * 0.6 : 1.4);
      if (phone.visible) {
        phone.updateWorldMatrix(true, false);
        phone.getWorldPosition(phoneGlow.position);
        phoneGlow.intensity = 1.6;
      } else phoneGlow.intensity = 0;

      // lights: dark hall, then the fluorescent bank stutters on
      const on = t >= W.lightOn && t < W.lightOff;
      const flick = t < W.lightOn + 0.6 ? (Math.floor((t - W.lightOn) * 22) % 3 === 0 ? 0.15 : 1) : 1;
      key.intensity = on ? 45 * flick : 0;
      inner.intensity = on && t > W.start ? 0.6 : 0;
      benchLamp.intensity = on ? 3.5 * flick : 0;
      (benchBulb.material as THREE.MeshBasicMaterial).color.set(0xfff0dc).multiplyScalar(on ? 3 * flick : 0.05);
      (fluoro.material as THREE.MeshBasicMaterial).color.set(0xeaf4ff).multiplyScalar(on ? 3.5 * flick : 0.08);

      // door: closed while cutting
      const doorOpen = 1 - smooth(seg(t, W.doorClose - 0.4, W.doorClose)) + smooth(seg(t, W.cut[1] + 0.2, W.cut[1] + 0.8));
      door.position.set(0.05 + Math.min(1, doorOpen) * 0.9, 1.25, 0.67);
      doorFrame.position.set(door.position.x, 1.72, 0.67);

      // spindle and work: the lump turned down, then parted into slugs
      const spinning = t >= W.start && t < W.cut[1] + 0.4;
      const rpm = spinning ? Math.round(1800 * smooth(seg(t, W.start, W.start + 0.9))) : 0;
      chuck.rotation.x = spinning ? (t - W.start) * 21 : 0;
      const turned = smooth(seg(t, W.cut[0], W.cut[0] + 2.6));
      lump.visible = t > W.clamp - 0.6 && t < W.counter[0];
      lump.position.copy(SPINDLE).add(new THREE.Vector3(0.1, 0, 0));
      lump.scale.set(1, 1 - turned * 0.55, 1 - turned * 0.55);
      lump.rotation.set(chuck.rotation.x, 0.3, 0.2);
      if (t < W.clamp) {
        // carried in his hand toward the chuck
        zhang.fig.anchors.handR.updateWorldMatrix(true, false);
        zhang.fig.anchors.handR.getWorldPosition(tmp);
        lump.position.lerp(tmp, 1 - smooth(seg(t, W.clamp - 0.6, W.clamp)));
      }
      rod.visible = t >= W.counter[0] && t < W.cut[1] + 0.4;
      rod.position.copy(SPINDLE).add(new THREE.Vector3(0.06, -0.004, -0.004));
      rod.rotation.x = chuck.rotation.x;
      tool.position.copy(SPINDLE).add(new THREE.Vector3(0.12 + Math.sin(t * 3) * 0.01, 0.04, 0.02));
      tool.visible = spinning;

      const count = t < W.counter[0] ? Math.floor(seg(t, W.cut[0], W.counter[0]) * 6) : t < W.drops[0] ? 6 + Math.floor(seg(t, W.counter[0], W.counter[1]) * 18) : Math.min(36, 24 + Math.floor(seg(t, W.drops[0], W.drops[1]) * 12.99));
      counter.draw(t > W.start ? count : 0, rpm);
      slugs.forEach((m, k) => (m.visible = k < (t < W.drops[0] ? Math.max(0, count - 12) : count)));

      // sparks and coolant mist while cutting
      const cutting = t > W.cut[0] && t < W.cut[1];
      sparkLight.intensity = cutting ? 1.2 + Math.sin(t * 40) * 0.5 : 0;
      sparks.update((i, s) => {
        if (!cutting) return false;
        const r = mulberry32(i * 7 + 1);
        const period = 0.35 + r() * 0.3;
        const age = ((t + r() * 5) % period);
        const vx = 0.4 + r() * 1.2;
        const vy = 0.6 + r() * 1.4;
        const vz = (r() - 0.2) * 1.4;
        s.p.copy(SPINDLE).add(new THREE.Vector3(0.12, 0.02, 0.03));
        s.p.x += vx * age;
        s.p.y += vy * age - 4.9 * age * age;
        s.p.z += vz * age;
        s.size = 0.006 + r() * 0.006;
        s.alpha = 1 - age / period;
        s.c.setRGB(1.0, 0.6 + r() * 0.3, 0.2).multiplyScalar(3);
        return true;
      });
      mist.update((i, s) => {
        if (!cutting) return false;
        const r = mulberry32(i * 13 + 5);
        const age = (t * 0.5 + r()) % 1;
        s.p.copy(SPINDLE).add(new THREE.Vector3(0.15 + age * 0.3, 0.05 + age * 0.4, (r() - 0.5) * 0.3));
        s.size = 0.05 + age * 0.2;
        s.alpha = 0.12 * (1 - age);
        s.c.setRGB(0.8, 0.86, 0.9);
        return true;
      });
      bag.visible = t > W.sweep[0] - 0.5 && t < W.lightOff;
    },
  };
}
