import * as THREE from "three";
import { applyPose, createFigure, type Figure, type Pose } from "@agentbench/voxel-kit";
import type { Cast } from "./cast";
import {
  box,
  caseModel,
  clothMaterial,
  concreteTexture,
  cylinderVoxelGeometry,
  glowSprite,
  labelPlane,
  metalTexture,
  pistolModel,
  pulse,
  range,
  smooth01,
  surface,
} from "./visual";

export interface BasementSet {
  root: THREE.Group;
  zhang: Figure;
  update: (time: number) => void;
}

const WALL = concreteTexture("basement-wall", "#544d43", "#3b352d", "#6b6355", [3, 2]);
const FLOOR = concreteTexture("basement-floor", "#3f3a32", "#2a2620", "#575045", [4, 4]);
const STEEL = metalTexture("basement-steel", "#484d4c", "#2d3130", "#686e6a", [2, 2]);

function beefTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#7a241d";
  ctx.fillRect(0, 0, 64, 64);
  let seed = 7;
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = rng() > 0.45 ? "#9e3b2c" : "#5d1816";
    ctx.globalAlpha = 0.28 + rng() * 0.45;
    ctx.fillRect(Math.floor(rng() * 64), Math.floor(rng() * 64), 1 + Math.floor(rng() * 6), 1 + Math.floor(rng() * 2));
  }
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "#d8bca7";
  for (let i = 0; i < 9; i++) {
    ctx.fillRect(Math.floor(rng() * 64), Math.floor(rng() * 64), 1, 5 + Math.floor(rng() * 15));
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  return tex;
}

function makeBullet(): THREE.Group {
  const group = new THREE.Group();
  const brass = new THREE.MeshStandardMaterial({ color: 0xa9854c, roughness: 0.28, metalness: 0.88 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x3d3831, roughness: 0.5, metalness: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.028, 0.028), brass);
  group.add(body);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.024, 0.024), dark);
  tip.position.x = 0.061;
  group.add(tip);
  return group;
}

export function createBasement(cast: Cast): BasementSet {
  const root = new THREE.Group();
  root.name = "set:basement";

  root.add(new THREE.AmbientLight(0x7e6d53, 0.2));
  const hemi = new THREE.HemisphereLight(0x4e564d, 0x1b1510, 0.18);
  root.add(hemi);

  // Narrow concrete shell.
  box(root, 7.2, 0.2, 6.4, 0x3f3a32, 0, -0.1, 0, { map: FLOOR, roughness: 0.96, receiveShadow: true });
  box(root, 7.2, 3.5, 0.26, 0x544d43, 0, 1.75, -3.18, { map: WALL, roughness: 1, receiveShadow: true });
  box(root, 7.2, 3.5, 0.26, 0x4d463c, 0, 1.75, 3.18, { map: WALL, roughness: 1 });
  box(root, 0.26, 3.5, 6.4, 0x4e473d, -3.55, 1.75, 0, { map: WALL, roughness: 1, receiveShadow: true });
  box(root, 0.26, 3.5, 6.4, 0x4e473d, 3.55, 1.75, 0, { map: WALL, roughness: 1 });
  box(root, 7.2, 0.24, 6.4, 0x413a31, 0, 3.42, 0, { map: WALL, roughness: 1 });

  // Concrete block seams.
  for (let y = 0.3; y < 3.3; y += 0.44) {
    const line = box(root, 7.0, 0.009, 0.01, 0x2b2620, 0, y, -3.04, { roughness: 1 });
    line.visible = true;
  }
  for (let i = 0; i < 4; i++) {
    const x = -2.6 + i * 1.7;
    box(root, 0.012, 3.4, 0.01, 0x2e2923, x, 1.7, -3.04, { roughness: 1 });
  }

  // Stairs behind a steel door at the front.
  box(root, 1.35, 2.5, 0.13, 0x24292a, 2.0, 1.25, 3.06, { map: STEEL, roughness: 0.55, metalness: 0.45 });
  box(root, 0.13, 0.32, 0.12, 0xb39866, 1.43, 1.18, 2.98, { roughness: 0.3, metalness: 0.85 });
  for (let i = 0; i < 3; i++) box(root, 1.1, 0.045, 0.06, 0x5f625d, 2.0, 0.38 + i * 0.48, 3.14, { roughness: 0.5, metalness: 0.6 });

  // Pipes and electrical clutter.
  for (let i = 0; i < 2; i++) {
    box(root, 0.16, 0.16, 5.5, 0x3a3530, -3.28 + i * 0.28, 2.86, -0.15, { roughness: 0.45, metalness: 0.62 });
    for (let j = 0; j < 5; j++) box(root, 0.22, 0.06, 0.22, 0x4c4640, -3.28 + i * 0.28, 2.86, -2.4 + j * 1.1, { roughness: 0.5, metalness: 0.5 });
  }
  box(root, 0.45, 0.7, 0.22, 0x30302b, 3.1, 2.4, -2.9, { roughness: 0.7, metalness: 0.2 });
  box(root, 0.36, 0.24, 0.03, 0x7d2c24, 3.1, 2.45, -2.77, { emissive: 0x45110d, emissiveIntensity: 0.4 });
  const warning = labelPlane("危险 / LIVE", 0.65, 0.21, {
    width: 512,
    height: 128,
    background: "#4b201d",
    color: "#e0c5a5",
    font: '500 48px "Noto Sans CJK SC", sans-serif',
  });
  warning.position.set(3.1, 2.15, -2.76);
  root.add(warning);

  // A bare hanging bulb: the only warm source in the room.
  box(root, 0.02, 1.1, 0.02, 0x181511, 0.0, 2.95, 0.25, { roughness: 0.8 });
  box(root, 0.24, 0.1, 0.24, 0x25231d, 0, 2.38, 0.25, { roughness: 0.5, metalness: 0.5 });
  glowBoxWarm(root, 0, 2.34, 0.25);
  const bulb = new THREE.PointLight(0xffc98f, 32, 6.2, 1.55);
  bulb.position.set(0, 2.35, 0.25);
  bulb.castShadow = false;
  root.add(bulb);
  const overhead = new THREE.SpotLight(0xffc690, 48, 6.2, Math.PI / 3.2, 0.62, 1.6);
  overhead.position.set(0.0, 3.25, 0.3);
  overhead.target.position.set(0.3, 0.4, -0.5);
  overhead.castShadow = true;
  overhead.shadow.mapSize.set(1024, 1024);
  overhead.shadow.bias = -0.0005;
  root.add(overhead);
  root.add(overhead.target);
  const fill = new THREE.PointLight(0xffb979, 4.2, 4.6, 1.8);
  fill.position.set(1.5, 1.5, 2.1);
  root.add(fill);

  // Work table.
  box(root, 2.8, 0.1, 1.3, 0x4f3925, 0.0, 0.9, -0.1, { roughness: 0.6, receiveShadow: true });
  for (const x of [-1.2, 1.2]) for (const z of [-0.5, 0.5]) box(root, 0.1, 0.9, 0.1, 0x2e241a, x, 0.45, z, { roughness: 0.72 });
  box(root, 2.6, 0.18, 1.1, 0x3b2c1e, 0, 0.8, -0.1, { roughness: 0.8 });

  // Target cloth bag hanging from the wall.
  const bag = new THREE.Group();
  bag.position.set(0.35, 1.42, -2.53);
  root.add(bag);
  box(bag, 0.042, 1.7, 0.042, 0x65605a, -0.62, 0.95, 0, { roughness: 0.5, metalness: 0.7 });
  box(bag, 0.042, 1.7, 0.042, 0x65605a, 0.62, 0.95, 0, { roughness: 0.5, metalness: 0.7 });
  box(bag, 1.32, 0.05, 0.15, 0x6d6860, 0, 1.8, 0, { roughness: 0.45, metalness: 0.65 });
  const bagBody = box(bag, 1.32, 1.15, 0.34, 0x8d846e, 0, 0.2, 0, {
    map: clothMaterial(0x8d846e).map ?? undefined,
    roughness: 0.98,
    castShadow: true,
  });
  void bagBody;
  box(bag, 1.36, 0.11, 0.35, 0x6b6355, 0, -0.38, 0, { roughness: 1 });
  // Stitching and a strap.
  box(bag, 1.1, 0.035, 0.015, 0x595340, 0, 0.36, 0.181, { roughness: 1 });
  box(bag, 0.08, 0.6, 0.02, 0x5b5547, -0.3, 0.05, 0.183, { roughness: 1 });
  box(bag, 0.08, 0.6, 0.02, 0x5b5547, 0.3, 0.05, 0.183, { roughness: 1 });

  const holes: THREE.Mesh[] = [];
  const holePositions: Array<[number, number]> = [
    [-0.22, 0.36],
    [-0.05, 0.31],
    [0.19, 0.35],
    [0.27, 0.08],
    [-0.14, 0.02],
  ];
  for (let i = 0; i < holePositions.length; i++) {
    const [x, y] = holePositions[i]!;
    const hole = new THREE.Mesh(
      new THREE.PlaneGeometry(0.045, 0.055),
      new THREE.MeshBasicMaterial({ color: 0x171210, transparent: true, opacity: 0.96, side: THREE.DoubleSide }),
    );
    hole.position.set(x, y, 0.19);
    hole.visible = false;
    bag.add(hole);
    holes.push(hole);
    const fray = new THREE.Mesh(
      new THREE.PlaneGeometry(0.09, 0.012),
      new THREE.MeshBasicMaterial({ color: 0x4d473a, transparent: true, opacity: 0.8 }),
    );
    fray.position.set(x + 0.018, y - 0.032, 0.186);
    fray.rotation.z = 0.3 - i * 0.15;
    fray.visible = false;
    bag.add(fray);
  }

  // Table-top evidence: cartridges, glue, pliers, a case, and the beef.
  const bullets = new THREE.Group();
  bullets.position.set(-0.82, 0.96, 0.19);
  root.add(bullets);
  const bulletMeshes: THREE.Group[] = [];
  for (let i = 0; i < 36; i++) {
    const b = makeBullet();
    b.position.set(-0.3 + (i % 6) * 0.12, 0.016, -0.3 + Math.floor(i / 6) * 0.12);
    b.rotation.y = 0.08 * ((i % 3) - 1);
    bullets.add(b);
    bulletMeshes.push(b);
  }
  box(bullets, 0.78, 0.02, 0.78, 0x2c2b27, 0, 0, 0, { roughness: 0.5, metalness: 0.4 });
  box(bullets, 0.82, 0.05, 0.03, 0x77756b, 0, 0.01, -0.4, { roughness: 0.3, metalness: 0.6 });
  box(bullets, 0.82, 0.05, 0.03, 0x77756b, 0, 0.01, 0.4, { roughness: 0.3, metalness: 0.6 });

  // Tools.
  box(root, 0.24, 0.03, 0.06, 0x777a74, 0.95, 0.965, 0.35, { roughness: 0.35, metalness: 0.8 });
  box(root, 0.24, 0.03, 0.06, 0x4e514d, 0.95, 0.99, 0.35, { roughness: 0.35, metalness: 0.8 });
  box(root, 0.05, 0.13, 0.05, 0x4e514d, 1.08, 1.02, 0.35, { roughness: 0.5, metalness: 0.7 });
  box(root, 0.1, 0.16, 0.1, 0xd8c9a8, 1.25, 0.98, 0.28, { roughness: 0.55 });
  box(root, 0.07, 0.06, 0.07, 0x503225, 1.25, 1.09, 0.28, { roughness: 0.45 });

  // The cloth bag remains open, revealing beef on the table.
  const beefGroup = new THREE.Group();
  beefGroup.position.set(0.12, 0.99, -0.13);
  beefGroup.visible = false;
  root.add(beefGroup);
  const beefMat = surface(0x9d3a2c, { map: beefTexture(), roughness: 0.72 });
  const leftBeef = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.24), beefMat);
  leftBeef.position.set(-0.16, 0.08, 0);
  leftBeef.castShadow = true;
  beefGroup.add(leftBeef);
  const rightBeef = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.24), beefMat);
  rightBeef.position.set(0.16, 0.08, 0);
  rightBeef.castShadow = true;
  beefGroup.add(rightBeef);
  for (let i = 0; i < 5; i++) {
    const frag = new THREE.Mesh(
      new THREE.BoxGeometry(0.04 + (i % 2) * 0.016, 0.035, 0.032 + (i % 3) * 0.012),
      new THREE.MeshStandardMaterial({ color: 0x3b3328, roughness: 0.62, metalness: 0.35 }),
    );
    frag.position.set(-0.12 + (i % 3) * 0.12, 0.18, -0.07 + Math.floor(i / 3) * 0.12);
    frag.rotation.set(i * 0.7, i * 0.9, i * 0.4);
    frag.visible = false;
    frag.userData.fragment = true;
    beefGroup.add(frag);
  }

  const bulletCase = caseModel();
  bulletCase.position.set(-0.05, 0.97, 0.18);
  bulletCase.scale.setScalar(0.8);
  bulletCase.rotation.y = -0.2;
  root.add(bulletCase);

  // The pistol itself, with the improvised scope.
  const zhang = createFigure({ body: cast.zhangBody.texture, clothes: cast.zhangUniform.texture, heightM: 1.84 });
  zhang.root.position.set(0.0, 0, 1.43);
  zhang.root.rotation.y = Math.PI;
  root.add(zhang.root);

  const pistol = pistolModel();
  pistol.group.position.set(0, -0.04, 0.06);
  pistol.group.rotation.set(-0.08, 0, 0);
  pistol.group.scale.setScalar(1 / zhang.root.scale.x);
  pistol.group.visible = true;
  pistol.scope.visible = false;
  zhang.anchors.handR.add(pistol.group);

  const flashSprite = glowSprite(0xffb266, 0.62, 1);
  flashSprite.position.set(0, 0.125, 0.23);
  flashSprite.visible = false;
  pistol.muzzle.add(flashSprite);
  const flashLight = new THREE.PointLight(0xff9f4f, 0, 4.2, 1.7);
  flashLight.position.set(0, 0.125, 0.22);
  pistol.muzzle.add(flashLight);

  // Smoke.
  const smokeCount = 90;
  const smokeGeo = new THREE.BufferGeometry();
  const smokePositions = new Float32Array(smokeCount * 3);
  smokeGeo.setAttribute("position", new THREE.BufferAttribute(smokePositions, 3));
  const smokeSeeds = Array.from({ length: smokeCount }, (_, i) => ({
    x: ((i * 37) % 100) / 100 - 0.5,
    y: ((i * 53) % 100) / 100 - 0.5,
    z: ((i * 71) % 100) / 100 - 0.5,
    phase: (i * 0.173) % 1,
  }));
  const smoke = new THREE.Points(
    smokeGeo,
    new THREE.PointsMaterial({
      color: 0xb8b1a3,
      size: 0.11,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    }),
  );
  smoke.visible = false;
  root.add(smoke);

  let beefOpened = false;

  function update(time: number): void {
    const aimAmount = smooth01(range(time, 152.2, 153.2)) * (1 - smooth01(range(time, 160.2, 161.4)));
    const shot = pulse(time, 158.75, 0.11);
    const recoil = Math.exp(-Math.pow((time - 158.9) / 0.22, 2));
    const inspect = smooth01(range(time, 162.4, 164.2));
    const pack = smooth01(range(time, 177.2, 180.0));
    const breath = Math.sin(time * 1.5);

    let pose: Pose = {
      hips: [0.01, 0, 0],
      neck: [0.04, 0.02, 0],
      armR: [-0.33, 0.08, 0.12],
      armL: [-0.24, -0.06, -0.13],
      legR: [0.03, 0, 0.01],
      legL: [-0.02, 0, -0.01],
      lift: breath * 0.06,
    };
    if (aimAmount > 0.01) {
      const aiming: Pose = {
        hips: [0.02, 0.02, 0],
        neck: [0.11, 0.02, 0],
        armR: [-Math.PI / 2 - 0.06 + recoil * 0.2, 0.02, 0.035],
        armL: [-Math.PI / 2 + 0.03, -0.05, -0.06],
        legR: [0.06, 0, 0.02],
        legL: [-0.03, 0, -0.02],
        lift: breath * 0.04,
      };
      pose = {
        hips: aiming.hips,
        neck: aiming.neck,
        armR: [
          pose.armR![0] + (aiming.armR![0] - pose.armR![0]) * aimAmount,
          pose.armR![1] + (aiming.armR![1] - pose.armR![1]) * aimAmount,
          pose.armR![2] + (aiming.armR![2] - pose.armR![2]) * aimAmount,
        ],
        armL: [
          pose.armL![0] + (aiming.armL![0] - pose.armL![0]) * aimAmount,
          pose.armL![1] + (aiming.armL![1] - pose.armL![1]) * aimAmount,
          pose.armL![2] + (aiming.armL![2] - pose.armL![2]) * aimAmount,
        ],
        legR: aiming.legR,
        legL: aiming.legL,
        lift: aiming.lift,
      };
    }
    if (inspect > 0.01 && aimAmount < 0.02) {
      pose = {
        ...pose,
        neck: [0.28 * inspect, 0.12 * inspect, 0],
        armR: [-0.75 * inspect, 0.18, 0.2],
        armL: [-0.58 * inspect, -0.14, -0.23],
        lift: -0.65 * inspect,
      };
    }
    if (pack > 0.01) {
      pose = {
        ...pose,
        neck: [0.14, 0.08, 0],
        armR: [-0.62, 0.18, 0.09],
        armL: [-0.56, -0.15, -0.15],
      };
    }
    applyPose(zhang, pose);

    // The shot.
    flashSprite.visible = shot > 0.02;
    (flashSprite.material as THREE.SpriteMaterial).opacity = Math.min(1, shot * 1.5);
    flashSprite.scale.setScalar(0.42 + shot * 0.7);
    flashLight.intensity = shot * 240;
    const muzzleWorld = new THREE.Vector3();
    pistol.muzzle.getWorldPosition(muzzleWorld);

    // Smoke lingers and crawls across the ceiling.
    smoke.visible = time > 158.8 && time < 173;
    if (smoke.visible) {
      const positions = smokeGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < smokeCount; i++) {
        const s = smokeSeeds[i]!;
        const age = time - 158.8 + s.phase * 0.7;
        const spread = Math.min(1.5, age * 0.18);
        positions.setXYZ(
          i,
          muzzleWorld.x + s.x * spread + Math.sin(age * 0.7 + i) * 0.08,
          muzzleWorld.y + 0.1 + s.y * spread * 0.5 + age * 0.08,
          muzzleWorld.z + s.z * spread,
        );
      }
      positions.needsUpdate = true;
    }

    for (const hole of holes) hole.visible = time >= 158.86;
    for (const child of bag.children) if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial && child.material.opacity === 0.8) child.visible = time >= 158.86;

    beefGroup.visible = time > 166.8;
    beefOpened = time > 169.2;
    const opening = beefOpened ? 0.035 : 0;
    leftBeef.position.x = -0.16 - opening;
    rightBeef.position.x = 0.16 + opening;
    for (const child of beefGroup.children) {
      if (child.userData.fragment) child.visible = time > 169.6;
    }

    // Four rounds are loaded; the rest return to the case.
    for (let i = 0; i < bulletMeshes.length; i++) {
      const b = bulletMeshes[i]!;
      if (time > 152.4 && i >= 32 && time < 177.4) b.visible = false;
      else b.visible = true;
      if (i < 32) {
        const stagger = pack > 0 ? smooth01(range(time, 177.5 + i * 0.06, 179.8 + i * 0.035)) : 0;
        const startX = -0.3 + (i % 6) * 0.12;
        const startZ = -0.3 + Math.floor(i / 6) * 0.12;
        b.position.set(
          startX + (0.77 + 0.3 - startX) * stagger,
          0.016 + stumble(stagger) * 0.12,
          startZ + (0.03 + 0.3 - startZ) * stagger,
        );
        b.scale.setScalar(1 - smooth01(range(stagger, 0.75, 1)) * 0.92);
      }
    }

    pistol.scope.visible = false;
    pistol.group.visible = time > 148.8 && time < 177.2;
    bulletCase.visible = time > 176.4;

    void inspect;
  }

  function stumble(v: number): number {
    return Math.sin(v * Math.PI) * 0.4;
  }

  return { root, zhang, update };
}

function glowBoxWarm(parent: THREE.Object3D, x: number, y: number, z: number): void {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.13, 0.17, 0.13),
    new THREE.MeshStandardMaterial({ color: 0xffe0b4, emissive: 0xffd09a, emissiveIntensity: 2.8, roughness: 0.2 }),
  );
  mesh.position.set(x, y, z);
  parent.add(mesh);
}
