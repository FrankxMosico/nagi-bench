import * as THREE from "three";
import {
  applyPose,
  lerpPose,
  walk,
  type Figure,
  type Pose,
} from "@agentbench/voxel-kit";
import type { Cast } from "./cast";
import { seatedCollectorPose, standingCollectorPose, tenseZhangPose } from "./cast";
import {
  addMeteor,
  box,
  caseModel,
  concreteTexture,
  fabricTexture,
  glowBox,
  labelPlane,
  phoneModel,
  plane,
  range,
  smooth01,
  surface,
  woodTexture,
} from "./visual";

export interface ShopSet {
  root: THREE.Group;
  zhang: Figure;
  collector: Figure;
  phone: THREE.Group;
  briefcase: THREE.Group;
  update: (time: number) => void;
}

const WOOD = woodTexture("shop-walnut", "#4b3120", "#2a1a10", "#6b4a30", [3, 2]);
const WOOD_DARK = woodTexture("shop-walnut-dark", "#342116", "#1b100a", "#4a3322", [2, 3]);
const FLOOR = woodTexture("shop-floor", "#3b2a1d", "#20150e", "#5a402a", [5, 5]);
const PLASTER = concreteTexture("shop-plaster", "#6a5a45", "#4c3e30", "#81715a", [3, 2]);

function glassMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x9fb4b2,
    roughness: 0.08,
    metalness: 0.18,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

function meteorDisplay(parent: THREE.Object3D, x: number, y: number, z: number, seed: number, scale = 0.08): void {
  const m = addMeteor(parent, seed, 4, scale, x, y, z);
  m.rotation.set(seed * 0.7, seed * 1.1, seed * 0.3);
}

function cabinet(parent: THREE.Object3D, x: number, z: number, length: number, seed: number): THREE.Group {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  parent.add(group);

  const width = 0.52;
  const height = 2.34;
  const depth = length;
  const woodMat = surface(0x4a3120, { map: WOOD, roughness: 0.72 });
  const trimMat = surface(0x2a1a11, { map: WOOD_DARK, roughness: 0.78 });

  // Back, sides, top and base.
  box(group, 0.04, height, depth, 0x4a3120, -0.25, height / 2, 0, { map: WOOD, roughness: 0.75, receiveShadow: true });
  box(group, width, height, 0.07, 0x3b2617, 0, height / 2, -depth / 2, { map: WOOD_DARK, roughness: 0.8 });
  box(group, width, height, 0.07, 0x3b2617, 0, height / 2, depth / 2, { map: WOOD_DARK, roughness: 0.8 });
  box(group, width + 0.08, 0.12, depth + 0.08, 0x2c1c12, 0, 0.06, 0, { map: WOOD_DARK, roughness: 0.7 });
  box(group, width + 0.08, 0.12, depth + 0.08, 0x2c1c12, 0, height - 0.04, 0, { map: WOOD_DARK, roughness: 0.7 });
  box(group, 0.09, height, 0.09, 0x2c1c12, 0.19, height / 2, -depth / 2 + 0.05, { map: WOOD_DARK });
  box(group, 0.09, height, 0.09, 0x2c1c12, 0.19, height / 2, depth / 2 - 0.05, { map: WOOD_DARK });
  box(group, width, 0.08, depth, 0x5a3c24, 0, 0.17, 0, { map: WOOD, roughness: 0.7 });

  // Shelves and individual spots.
  for (let level = 0; level < 3; level++) {
    const shelfY = 0.62 + level * 0.64;
    box(group, 0.46, 0.05, depth - 0.1, 0x5a3c25, 0, shelfY, 0, { map: WOOD, roughness: 0.64 });
    const light = new THREE.PointLight(0xffbf76, 4.8, 2.1, 1.7);
    light.position.set(0.12, shelfY + 0.45, 0);
    group.add(light);
    glowBox(group, 0.02, 0.018, depth * 0.7, 0xffc77e, 0.17, shelfY + 0.54, 0, 0.8);
    for (let item = 0; item < 4; item++) {
      const itemZ = -depth * 0.33 + item * depth * 0.22;
      meteorDisplay(group, 0.08 + (item % 2) * 0.08, shelfY + 0.09, itemZ, seed + level * 13 + item, 0.005 + ((seed + item) % 4) * 0.0011);
    }
    if (seed === 31 && level === 1) {
      // One hero specimen, catching the little spot like a reliquary.
      const hero = addMeteor(group, 413, 6, 0.017, 0.16, shelfY + 0.12, depth * 0.3, false);
      hero.rotation.set(0.4, 2.1, 0.2);
      const heroLight = new THREE.PointLight(0xffd39b, 5.0, 1.35, 1.5);
      heroLight.position.set(0.18, shelfY + 0.5, depth * 0.3);
      group.add(heroLight);
    }
  }

  // Glass face and a thin highlighted reflection.
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.012, height - 0.24, depth - 0.1), glassMaterial());
  glass.position.set(0.255, height / 2, 0);
  group.add(glass);
  const reflection = new THREE.Mesh(
    new THREE.PlaneGeometry(0.012, height * 0.8),
    new THREE.MeshBasicMaterial({ color: 0xc9d1c7, transparent: true, opacity: 0.035, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  reflection.rotation.y = Math.PI / 2;
  reflection.position.set(0.263, height * 0.58, depth * 0.17);
  group.add(reflection);

  // A little museum plaque.
  const plaque = labelPlane("铁陨石 / IRON", 0.3, 0.055, {
    width: 512,
    height: 96,
    background: "#241811",
    color: "#c9b58f",
    font: '500 32px "Noto Serif CJK SC", serif',
  });
  plaque.rotation.y = Math.PI / 2;
  plaque.position.set(0.271, 0.19, depth * 0.18);
  group.add(plaque);

  void woodMat;
  void trimMat;
  return group;
}

function workbench(parent: THREE.Object3D): THREE.Group {
  const group = new THREE.Group();
  group.position.set(1.1, 0, -1.9);
  parent.add(group);

  const top = surface(0x5a3a24, { map: WOOD, roughness: 0.56 });
  box(group, 2.45, 0.1, 1.08, 0x5a3a24, 0, 0.82, 0, { map: WOOD, roughness: 0.56, castShadow: true });
  for (const x of [-1.05, 1.05]) {
    for (const z of [-0.42, 0.42]) {
      box(group, 0.09, 0.8, 0.09, 0x372216, x, 0.4, z, { map: WOOD_DARK, roughness: 0.8 });
    }
  }
  box(group, 2.2, 0.26, 0.86, 0x3c281a, 0, 0.16, 0, { map: WOOD_DARK, roughness: 0.8 });
  // Front apron and drawer pulls.
  box(group, 2.35, 0.25, 0.05, 0x4a3020, 0, 0.64, 0.5, { map: WOOD, roughness: 0.75 });
  for (const x of [-0.66, 0, 0.66]) {
    box(group, 0.56, 0.025, 0.03, 0x1f1610, x, 0.64, 0.54, { roughness: 0.6, metalness: 0.35 });
    box(group, 0.1, 0.022, 0.05, 0xad9368, x, 0.64, 0.56, { roughness: 0.3, metalness: 0.8 });
  }

  // Microscope.
  const scope = new THREE.Group();
  scope.position.set(0.86, 0.87, -0.18);
  group.add(scope);
  box(scope, 0.32, 0.05, 0.32, 0x1d2223, 0, 0.02, 0, { roughness: 0.35, metalness: 0.72 });
  box(scope, 0.07, 0.34, 0.07, 0x6c6e69, -0.08, 0.21, 0, { roughness: 0.4, metalness: 0.65 });
  box(scope, 0.2, 0.06, 0.07, 0x777b76, 0, 0.4, 0, { roughness: 0.35, metalness: 0.6 });
  box(scope, 0.07, 0.2, 0.07, 0x14191a, 0.07, 0.29, 0, { roughness: 0.3, metalness: 0.7 });
  box(scope, 0.03, 0.02, 0.03, 0x96dfd2, 0.07, 0.18, 0, { emissive: 0x54a599, emissiveIntensity: 1.3 });

  // Magnifier and tools.
  const magnifier = new THREE.Group();
  magnifier.position.set(-0.72, 0.89, 0.12);
  group.add(magnifier);
  box(magnifier, 0.18, 0.015, 0.11, 0x14191a, 0, 0, 0, { roughness: 0.3, metalness: 0.7 });
  box(magnifier, 0.025, 0.012, 0.15, 0x5c4630, 0.14, 0, 0.01, { roughness: 0.6 });
  const lens = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.006, 0.1), new THREE.MeshStandardMaterial({
    color: 0x9bc7c2, transparent: true, opacity: 0.42, roughness: 0.06, metalness: 0.2,
  }));
  lens.position.set(0, 0.014, 0.01);
  magnifier.add(lens);

  // Tea, papers, a small tray of samples.
  const cup = new THREE.Group();
  cup.position.set(-0.95, 0.89, 0.28);
  group.add(cup);
  box(cup, 0.11, 0.11, 0.11, 0xd5c6a9, 0, 0.055, 0, { roughness: 0.58 });
  box(cup, 0.08, 0.006, 0.08, 0x4b2b17, 0, 0.111, 0, { roughness: 0.3 });
  box(cup, 0.025, 0.05, 0.05, 0xd5c6a9, 0.075, 0.065, 0, { roughness: 0.58 });
  box(group, 0.38, 0.008, 0.26, 0xb3a78f, -1.02, 0.875, -0.27, { roughness: 0.9 });

  // The deal stones.
  for (let i = 0; i < 3; i++) {
    const m = addMeteor(group, 70 + i * 11, 5, 0.0105 + i * 0.0012, -0.42 + i * 0.31, 0.92, 0.14, false);
    m.rotation.set(0.2 + i, 1.5 - i * 0.4, 0.6);
  }
  addMeteor(group, 19, 4, 0.0075, 0.22, 0.92, 0.25, false);

  return group;
}

export function createShop(cast: Cast): ShopSet {
  const root = new THREE.Group();
  root.name = "set:shop";

  const ambient = new THREE.AmbientLight(0x9e8567, 0.36);
  root.add(ambient);
  const hemi = new THREE.HemisphereLight(0x526775, 0x2a1d13, 0.3);
  root.add(hemi);

  // Floor and shell.
  box(root, 12.2, 0.2, 9.2, 0x3b2a1d, 0, -0.1, 0, { map: FLOOR, roughness: 0.82, receiveShadow: true });
  box(root, 12.2, 4.5, 0.25, 0x5b4a36, 0, 2.25, -4.62, { map: PLASTER, roughness: 0.98 });
  box(root, 0.25, 4.5, 9.1, 0x51422f, -6.1, 2.25, 0, { map: PLASTER, roughness: 0.98 });
  box(root, 0.25, 4.5, 9.1, 0x4c3d2c, 6.1, 2.25, 0, { map: PLASTER, roughness: 0.98 });
  box(root, 12.2, 0.18, 9.1, 0x3b2a1d, 0, 4.42, 0, { map: WOOD_DARK, roughness: 0.9 });
  // Front wall with a doorway at the left.
  box(root, 2.3, 4.5, 0.25, 0x51422f, -5.05, 2.25, 4.56, { map: PLASTER, roughness: 0.98 });
  box(root, 8.55, 4.5, 0.25, 0x51422f, 1.98, 2.25, 4.56, { map: PLASTER, roughness: 0.98 });
  box(root, 1.6, 1.95, 0.25, 0x51422f, -3.22, 3.52, 4.56, { map: PLASTER, roughness: 0.98 });

  // Ceiling beams.
  for (let i = -3; i <= 3; i++) {
    box(root, 12.0, 0.16, 0.18, 0x2f2116, 0, 4.22, i * 1.34, { map: WOOD_DARK, roughness: 0.88 });
  }

  // Cabinets: left wall and a low cabinet under the back wall.
  cabinet(root, -5.72, -2.75, 2.65, 4);
  cabinet(root, -5.72, 0.08, 2.65, 31);
  cabinet(root, -5.72, 2.91, 2.65, 57);
  const backCase = cabinet(root, 4.64, -4.35, 2.1, 72);
  backCase.rotation.y = Math.PI / 2;
  backCase.position.set(4.75, 0, -4.34);
  const centerCase = cabinet(root, 1.08, -4.48, 2.15, 88);
  centerCase.rotation.y = -Math.PI / 2;
  centerCase.position.set(1.08, 0, -4.48);

  // Safe in the back right corner.
  const safe = new THREE.Group();
  safe.position.set(4.45, 0, -3.73);
  root.add(safe);
  box(safe, 1.3, 1.5, 0.85, 0x232625, 0, 0.75, 0, { roughness: 0.38, metalness: 0.72, castShadow: true });
  box(safe, 1.14, 1.32, 0.06, 0x2b302e, 0, 0.76, 0.46, { roughness: 0.3, metalness: 0.82 });
  box(safe, 0.16, 0.16, 0.04, 0xb7a173, -0.28, 0.78, 0.51, { roughness: 0.25, metalness: 0.9 });
  for (let i = 0; i < 3; i++) box(safe, 0.05, 0.05, 0.04, 0x0c0e0e, 0.26, 0.96 - i * 0.16, 0.51, { roughness: 0.2, metalness: 0.5 });

  // Rug.
  box(root, 5.2, 0.014, 3.3, 0x3e2d23, 0.5, 0.012, 0.35, { map: fabricTexture("shop-rug", "#3e2d23", "#281c16", "#5e4432", [3, 2]), roughness: 1 });

  // Door and courtyard beyond.
  const doorHinge = new THREE.Group();
  doorHinge.position.set(-2.4, 0, 4.55);
  root.add(doorHinge);
  const door = box(doorHinge, 1.54, 2.45, 0.08, 0x342318, -0.77, 1.225, 0, { map: WOOD, roughness: 0.72, castShadow: true });
  void door;
  for (let i = 0; i < 4; i++) {
    box(doorHinge, 1.26, 0.025, 0.025, 0x1f1510, -0.77, 0.45 + i * 0.52, -0.055, { map: WOOD_DARK });
  }
  box(doorHinge, 0.06, 0.06, 0.08, 0xb59b69, -0.16, 1.12, 0.08, { roughness: 0.3, metalness: 0.8 });

  const outsideGlow = new THREE.PointLight(0x6f94b6, 18, 6, 1.8);
  outsideGlow.position.set(-3.3, 2.2, 5.3);
  root.add(outsideGlow);
  const outside = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 3.1),
    new THREE.MeshBasicMaterial({ color: 0x293643, fog: false }),
  );
  outside.position.set(-3.25, 1.5, 5.55);
  root.add(outside);
  for (let i = 0; i < 5; i++) {
    const slab = box(root, 0.3 + i * 0.12, 2.1, 0.02, 0x10151b, -4.1 + i * 0.5, 1.2, 5.52, { roughness: 1 });
    slab.rotation.z = (i - 2) * 0.12;
  }
  const doorLight = glowBox(root, 1.44, 2.38, 0.02, 0x7896ad, -3.2, 1.3, 5.48, 0.08);

  // A latticed window on the courtyard wall keeps the room breathing.
  const windowGroup = new THREE.Group();
  windowGroup.position.set(2.35, 2.35, 4.41);
  root.add(windowGroup);
  box(windowGroup, 2.6, 1.75, 0.04, 0x273743, 0, 0, 0, { roughness: 0.5, metalness: 0.1 });
  const windowGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.35, 1.5),
    new THREE.MeshBasicMaterial({ color: 0x304859, transparent: true, opacity: 0.75, fog: false }),
  );
  windowGlow.position.z = 0.026;
  windowGroup.add(windowGlow);
  for (const x of [-1.18, 1.18]) box(windowGroup, 0.13, 1.9, 0.1, 0x2f2015, x, 0, 0.05, { map: WOOD_DARK, roughness: 0.75 });
  for (const y of [-0.8, 0, 0.8]) box(windowGroup, 2.55, 0.09, 0.1, 0x2f2015, 0, y, 0.05, { map: WOOD_DARK, roughness: 0.75 });
  for (const x of [-0.58, 0, 0.58]) box(windowGroup, 0.055, 1.55, 0.08, 0x3a281a, x, 0, 0.07, { map: WOOD, roughness: 0.7 });
  for (const y of [-0.4, 0.4]) box(windowGroup, 2.35, 0.045, 0.07, 0x3a281a, 0, y, 0.07, { map: WOOD, roughness: 0.7 });
  const windowLight = new THREE.PointLight(0x6f93ac, 15, 5.5, 1.8);
  windowLight.position.set(2.35, 2.7, 3.95);
  root.add(windowLight);

  // A pencil-drawn star chart, one of the collector's small doorways out.
  const chartCanvas = document.createElement("canvas");
  chartCanvas.width = 256;
  chartCanvas.height = 180;
  const chartCtx = chartCanvas.getContext("2d")!;
  chartCtx.fillStyle = "#b7ab8f";
  chartCtx.fillRect(0, 0, 256, 180);
  chartCtx.strokeStyle = "rgba(50,42,32,0.5)";
  chartCtx.lineWidth = 1;
  chartCtx.beginPath();
  chartCtx.arc(128, 90, 64, 0, Math.PI * 2);
  chartCtx.stroke();
  chartCtx.beginPath();
  chartCtx.arc(128, 90, 39, 0, Math.PI * 2);
  chartCtx.stroke();
  chartCtx.strokeStyle = "rgba(52,42,29,0.8)";
  chartCtx.font = "italic 15px serif";
  chartCtx.fillStyle = "rgba(42,34,24,0.75)";
  chartCtx.fillText("AD ASTRA", 92, 168);
  let chartSeed = 31;
  const chartRand = () => { chartSeed = (chartSeed * 1664525 + 1013904223) >>> 0; return chartSeed / 4294967296; };
  for (let i = 0; i < 34; i++) {
    const a = chartRand() * Math.PI * 2;
    const r = Math.sqrt(chartRand()) * 62;
    const x = 128 + Math.cos(a) * r;
    const y = 90 + Math.sin(a) * r * 0.76;
    chartCtx.fillStyle = chartRand() > 0.75 ? "#5f4735" : "#3b3226";
    chartCtx.fillRect(x, y, chartRand() > 0.8 ? 3 : 2, chartRand() > 0.8 ? 3 : 2);
  }
  const chartTexture = new THREE.CanvasTexture(chartCanvas);
  chartTexture.colorSpace = THREE.SRGBColorSpace;
  const chart = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.8),
    new THREE.MeshStandardMaterial({ map: chartTexture, roughness: 0.9 }),
  );
  chart.position.set(4.35, 2.45, 4.41);
  root.add(chart);
  box(root, 1.28, 0.06, 0.08, 0x2f2015, 4.35, 2.88, 4.395, { map: WOOD_DARK, roughness: 0.7 });
  box(root, 1.28, 0.06, 0.08, 0x2f2015, 4.35, 2.02, 4.395, { map: WOOD_DARK, roughness: 0.7 });
  box(root, 0.06, 0.92, 0.08, 0x2f2015, 3.72, 2.45, 4.395, { map: WOOD_DARK, roughness: 0.7 });
  box(root, 0.06, 0.92, 0.08, 0x2f2015, 4.98, 2.45, 4.395, { map: WOOD_DARK, roughness: 0.7 });

  // Hanging work lamp.
  const lampPos = new THREE.Vector3(1.1, 3.42, -1.9);
  box(root, 0.035, 0.9, 0.035, 0x1a1713, lampPos.x, 3.9, lampPos.z, { roughness: 0.8 });
  box(root, 0.54, 0.28, 0.4, 0x2f342e, lampPos.x, 3.44, lampPos.z, { roughness: 0.45, metalness: 0.55 });
  glowBox(root, 0.42, 0.035, 0.28, 0xffd39a, lampPos.x, 3.29, lampPos.z, 0.92);
  const lamp = new THREE.PointLight(0xffbd76, 24, 6.4, 1.55);
  lamp.position.copy(lampPos);
  root.add(lamp);

  // A low, soft bounce fills faces without flattening the candle-lit room.
  const faceFill = new THREE.PointLight(0xffd8ab, 8.5, 6.8, 1.7);
  faceFill.position.set(0.6, 2.15, 1.9);
  root.add(faceFill);

  const spot = new THREE.SpotLight(0xffc47f, 54, 8.5, Math.PI / 4.1, 0.62, 1.5);
  spot.position.set(1.1, 4.0, -1.25);
  spot.target.position.set(1.1, 0.5, -2.0);
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  spot.shadow.camera.near = 0.5;
  spot.shadow.camera.far = 8;
  spot.shadow.bias = -0.0007;
  root.add(spot);
  root.add(spot.target);

  // Cabinet key light, deliberately low and warm.
  const cabinetLight = new THREE.SpotLight(0xffb15e, 26, 8, Math.PI / 3.2, 0.7, 1.8);
  cabinetLight.position.set(-2.5, 3.7, 1.3);
  cabinetLight.target.position.set(-5.0, 1.1, 0.1);
  root.add(cabinetLight);
  root.add(cabinetLight.target);

  // Work table sets the social geography of the scene.
  workbench(root);

  // Chairs.
  const chair = new THREE.Group();
  chair.position.set(1.26, 0, -0.34);
  root.add(chair);
  box(chair, 0.52, 0.08, 0.52, 0x3b2617, 0, 0.48, 0, { map: WOOD, roughness: 0.8 });
  box(chair, 0.5, 0.74, 0.08, 0x392517, 0, 0.84, -0.24, { map: WOOD, roughness: 0.8 });
  for (const x of [-0.21, 0.21]) for (const z of [-0.21, 0.21]) box(chair, 0.06, 0.48, 0.06, 0x2b1b11, x, 0.24, z, { map: WOOD_DARK });
  const stool = new THREE.Group();
  stool.position.set(1.1, 0, -2.77);
  root.add(stool);
  box(stool, 0.55, 0.09, 0.55, 0x402a1a, 0, 0.52, 0, { map: WOOD, roughness: 0.8 });
  for (const x of [-0.2, 0.2]) for (const z of [-0.2, 0.2]) box(stool, 0.07, 0.5, 0.07, 0x2a1b11, x, 0.25, z, { map: WOOD_DARK });

  // Figures.
  const zhang = cast.zhangShop;
  zhang.root.position.set(-3.65, 0, 4.2);
  zhang.root.rotation.y = Math.PI;
  root.add(zhang.root);

  const collector = cast.collector;
  collector.root.position.set(1.1, 0, -2.82);
  collector.root.rotation.y = 0;
  root.add(collector.root);

  // Hand anchors inherit the figure's uniform root scale. Props authored in
  // metres are counter-scaled so a 24 cm pistol reads as 24 cm in the world.
  const propScale = 1 / zhang.root.scale.x;
  const phone = phoneModel();
  phone.visible = false;
  phone.position.set(0, 0.02 * propScale, 0.06 * propScale);
  phone.rotation.set(-Math.PI / 2, 0, 0);
  phone.scale.setScalar(propScale);
  zhang.anchors.handR.add(phone);

  const briefcase = caseModel();
  briefcase.visible = false;
  briefcase.position.set(0, 0, 0.03 * propScale);
  briefcase.rotation.set(Math.PI / 2, 0, 0);
  briefcase.scale.setScalar(propScale);
  zhang.anchors.handL.add(briefcase);

  // Dust motes suspended in the warm light.
  const dustCount = 170;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustBase: THREE.Vector3[] = [];
  const rng = (() => {
    let a = 1234567;
    return () => {
      a = (a * 1664525 + 1013904223) >>> 0;
      return a / 4294967296;
    };
  })();
  for (let i = 0; i < dustCount; i++) {
    const p = new THREE.Vector3(-5.4 + rng() * 10.4, 0.4 + rng() * 3.5, -4.0 + rng() * 7.6);
    dustBase.push(p);
    dustPositions[i * 3] = p.x;
    dustPositions[i * 3 + 1] = p.y;
    dustPositions[i * 3 + 2] = p.z;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xdcc49a,
      size: 0.018,
      transparent: true,
      opacity: 0.44,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  root.add(dust);

  // A few soft shafts of exterior light, kept abstract and blocky.
  for (let i = 0; i < 3; i++) {
    const shaft = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9 + i * 0.25, 4.2),
      new THREE.MeshBasicMaterial({ color: 0x6f8fa8, transparent: true, opacity: 0.018, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );
    shaft.position.set(-2.3 + i * 0.55, 2.0, 3.0 - i * 0.7);
    shaft.rotation.set(0.35, -0.42 + i * 0.08, -0.55);
    root.add(shaft);
  }

  let lastSuit: string | null = null;

  function update(time: number): void {
    // Door choreography.
    const openIn = smooth01(range(time, 19.35, 20.35));
    const closeIn = smooth01(range(time, 23.2, 24.0));
    const openOut = smooth01(range(time, 99.0, 100.0));
    let doorAngle = 0;
    if (time >= 19 && time < 24) doorAngle = openIn * (1 - closeIn) * 1.35;
    else if (time >= 99) doorAngle = openOut * 1.4;
    doorHinge.rotation.y = -doorAngle;

    // Zhang enters, waits, and leaves.
    const walkIn = smooth01(range(time, 20.1, 23.4));
    const leave = smooth01(range(time, 99.5, 102.9));
    const zhangRoot = zhang.root;
    if (time < 20.1) {
      zhangRoot.position.set(-3.58, 0, 4.15);
      zhangRoot.rotation.y = Math.PI;
    } else if (time < 23.4) {
      zhangRoot.position.set(
        -3.58 + (1.18 + 3.58) * walkIn,
        0,
        4.15 + (-0.54 - 4.15) * walkIn,
      );
      zhangRoot.rotation.y = Math.atan2(1.18 + 3.58, -0.54 - 4.15);
    } else if (time < 99.5) {
      zhangRoot.position.set(1.18, 0, -0.54);
      zhangRoot.rotation.y = Math.PI;
    } else {
      zhangRoot.position.set(
        1.18 + (-3.58 - 1.18) * leave,
        0,
        -0.54 + (4.15 + 0.54) * leave,
      );
      zhangRoot.rotation.y = Math.atan2(-3.58 - 1.18, 4.15 + 0.54);
    }

    // Zhang's performance: stillness, then a small, deliberate phone gesture.
    const phoneUp = smooth01(range(time, 80.4, 81.0)) * (1 - smooth01(range(time, 85.8, 86.8)));
    const walking = time > 20.1 && time < 23.4;
    let pose: Pose;
    if (walking) {
      pose = walk(time, 1.15);
    } else {
      pose = tenseZhangPose(time, 0);
      pose.armR = [-0.2 - phoneUp * 1.3, 0.03, 0.08 - phoneUp * 0.18];
      pose.neck = [0.02 + phoneUp * 0.1, 0.06, 0];
      pose.armL = [-0.12, -0.03, -0.1];
    }
    applyPose(zhang, pose);
    phone.visible = phoneUp > 0.08;
    briefcase.visible = time < 24 || time > 99.3;

    // The collector works seated, then stands to greet and show his collection.
    const stand = smooth01(range(time, 21.1, 22.2)) * (1 - smooth01(range(time, 97.0, 98.2)));
    const greet = Math.max(
      Math.exp(-Math.pow((time - 23.0) / 1.4, 2)),
      Math.exp(-Math.pow((time - 67.6) / 2.0, 2)) * 0.8,
      Math.exp(-Math.pow((time - 75.8) / 1.8, 2)) * 0.6,
      Math.exp(-Math.pow((time - 84.6) / 1.8, 2)) * 0.45,
      Math.exp(-Math.pow((time - 96.0) / 1.4, 2)) * 0.4,
    );
    const story = Math.exp(-Math.pow((time - 39.0) / 3.8, 2));
    const gesture = Math.max(greet, story * 0.65);
    const seatedPose = seatedCollectorPose(time, gesture);
    const standingPose = standingCollectorPose(time, gesture);
    let collectorPose = lerpPose(seatedPose, standingPose, stand);
    // A small bow toward the departing visitor.
    if (time > 98.2) {
      collectorPose = {
        ...collectorPose,
        neck: [0.25, 0.04, 0],
        armR: [-0.35, 0.05, 0.2],
        lift: (collectorPose.lift ?? 0) - 0.2,
      };
    }
    applyPose(collector, collectorPose);

    // Dusk in the courtyard cools and warms by turns.
    outsideGlow.intensity = 17 + Math.sin(time * 0.37) * 2.2;
    (doorLight.material as THREE.MeshBasicMaterial).opacity = 0.05 + openIn * 0.1;

    // Dust drifts slowly, as if the room has its own weather.
    const arr = dustGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < dustCount; i++) {
      const p = dustBase[i]!;
      arr.setXYZ(
        i,
        p.x + Math.sin(time * 0.09 + i * 1.13) * 0.18,
        p.y + Math.sin(time * 0.07 + i * 0.61) * 0.12,
        p.z + Math.cos(time * 0.08 + i * 0.71) * 0.15,
      );
    }
    arr.needsUpdate = true;

    // Subtle lamp life.
    lamp.intensity = 23 + Math.sin(time * 7.1) * 0.35 + Math.sin(time * 2.3) * 0.5;

    if (lastSuit !== "shop") lastSuit = "shop";
  }

  return { root, zhang, collector, phone, briefcase, update };
}
