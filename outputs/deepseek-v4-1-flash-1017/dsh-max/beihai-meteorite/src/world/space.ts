import * as THREE from "three";
import {
  applyPose,
  voxelSphere,
  type Pose,
} from "@agentbench/voxel-kit";
import {
  addBox,
  addBatchedBoxes,
  addLabelPlane,
  canvasTexture,
  clamp01,
  createStarfield,
  fbm,
  glowTexture,
  lerp,
  makeGlowSprite,
  makeMistSprite,
  mulberry32,
  setCamera,
  smooth,
  softMistTexture,
  TAU,
  createTextTexture,
} from "../lib/helpers";
import {
  createBackpack,
  createCrowdAstronaut,
  createPistolRig,
  createTarget,
  createZhang,
  floatingWorkPose,
  type AstronautActor,
  type PistolRig,
  type ZhangActor,
} from "../lib/characters";
import { FIRE_TIMES } from "../cues";

const EARTH_CENTER = new THREE.Vector3(0, -78, -166);
const EARTH_RADIUS = 63;
const STATION_CENTER = new THREE.Vector3(-4.2, 7.0, -84);
const AIRLOCK_GLOBAL = new THREE.Vector3(0.9, -0.2, -81.1);
const LINEUP_Z = -46;

const CREW_FRONT_X = [-4.3, -2.8, -1.3, 0.2, 1.7, 3.2, 4.7];
const CREW_BACK_X = [-5.0, -3.3, -1.6, 0.1, 1.8, 3.5, 5.2];
const CREW_THIRD_X = [-3.8, -1.7, 0.4, 2.5, 4.6];
const HIT_TIMES = [313.1, 312.42, 313.7, 315.2, 316.7];
const VICTIM_INDICES = [1, 2, 3, 4, 5];
const TARGET_CREW = [2, 3, 4];

interface CrewEntry {
  actor: AstronautActor;
  start: THREE.Vector3;
  lineup: THREE.Vector3;
  phase: number;
  index: number;
  victimSlot: number;
  puffs: THREE.Sprite[];
  hitTime: number | null;
  visorState: "sealed" | "clear" | "cracked" | "bloodied";
  screamed: boolean;
}

function earthGeometry(radius = 70, voxel = 0.9): THREE.BufferGeometry {
  const ocean = [0x0a2439, 0x0d2e47, 0x123d58, 0x0a2b43, 0x174d63, 0x0e344f];
  const land = [0x3b5c43, 0x4c6747, 0x756545, 0x887650, 0x2f5647, 0x5a6846, 0x665a40];
  const ice = [0xc2d1d1, 0xdde5e1, 0xaabfc2, 0xe6e6dd];
  const cloud = [0xaabfc2, 0xc6d5d4, 0xdde4de, 0x93aeb4];
  const city = [0xc8a267, 0xd6b478, 0x9c7742];
  const span = Math.ceil(radius) * 2;
  return voxelSphere(
    radius,
    (x, y, z, ratio) => {
      const nx = (x + 0.5 - span / 2) / radius;
      const ny = (y + 0.5 - span / 2) / radius;
      const nz = (z + 0.5 - span / 2) / radius;
      const lat = Math.abs(ny);
      if (lat > 0.87) {
        return ice[(Math.abs(x * 7 + z * 11) % ice.length)]!;
      }
      const elevation = fbm(nx * 2.35 + 3.2, nz * 2.2 + ny * 1.45 + 2.0, 3);
      const weather = fbm(nx * 4.1 + 14.1, nz * 3.5 + ny * 2.9 + 4.6, 2);
      if (weather > 0.6) {
        return cloud[Math.floor(weather * cloud.length * 3) % cloud.length]!;
      }
      if (ratio > 0.987 && weather > 0.5) return 0xd4e1e0;
      let palette: number[];
      if (elevation > 0.535) {
        palette = land;
        // A few lit city pixels on the nightward edge.
        if (elevation > 0.63 && weather > 0.53 && nx + nz < -0.25) {
          return city[(x + z + 4) % city.length]!;
        }
      } else {
        palette = ocean;
      }
      const index = Math.floor((elevation * 79 + Math.abs(nx * 31 + nz * 13)) % palette.length);
      return palette[index]!;
    },
    { voxel, anchor: "center" },
  );
}

function makeEarth(radius = 70, voxel = 0.9): THREE.Mesh {
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.9,
    metalness: 0,
    emissive: 0x06131c,
    emissiveIntensity: 0.46,
  });
  const earth = new THREE.Mesh(earthGeometry(radius, voxel), material);
  earth.position.copy(EARTH_CENTER);
  earth.rotation.y = 0.4;
  earth.rotation.z = 0.14;
  return earth;
}

function beamBetween(
  from: THREE.Vector3,
  to: THREE.Vector3,
  thickness: number,
  material: THREE.Material,
): THREE.Mesh {
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(thickness, length, thickness), material);
  mesh.position.copy(from).addScaledVector(direction, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return mesh;
}

function makeCrewCamera(): THREE.Group {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2f3838, roughness: 0.55, metalness: 0.35 });
  addBox(g, [0.28, 0.23, 0.38], [0, 0, 0], bodyMat);
  addBox(g, [0.16, 0.17, 0.22], [0, 0, 0.28], new THREE.MeshStandardMaterial({ color: 0x1b2020, roughness: 0.35, metalness: 0.5 }));
  addBox(g, [0.12, 0.12, 0.04], [0, 0, 0.42], new THREE.MeshBasicMaterial({ color: 0x87b7b4, toneMapped: false }), { castShadow: false });
  addBox(g, [0.06, 0.12, 0.06], [0, 0.17, -0.04], bodyMat);
  addBox(g, [0.18, 0.13, 0.05], [0, -0.17, -0.02], bodyMat);
  return g;
}

function makeAirlock(): {
  group: THREE.Group;
  left: THREE.Group;
  right: THREE.Group;
  indicator: THREE.MeshBasicMaterial;
  light: THREE.PointLight;
} {
  const group = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x555f5d, metalness: 0.66, roughness: 0.38 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x12191a, metalness: 0.5, roughness: 0.6 });
  addBox(group, [2.15, 2.35, 1.0], [0, 0, 0], dark);
  addBox(group, [2.65, 2.8, 0.38], [0, 0, -0.44], frameMat);
  addBox(group, [1.28, 1.36, 0.14], [0, 0, 0.5], frameMat);
  addBox(group, [1.06, 1.14, 0.06], [0, 0, 0.59], new THREE.MeshBasicMaterial({ color: 0x0a0e0f }), { castShadow: false });
  // A warm-lit interior becomes visible as the two doors slide apart.
  addBox(group, [1.02, 1.1, 0.03], [0, 0, 0.35], new THREE.MeshBasicMaterial({ color: 0x9a5b31, toneMapped: false }), { castShadow: false });
  addBox(group, [0.75, 0.82, 0.02], [0, 0, 0.42], new THREE.MeshBasicMaterial({ color: 0x3b2418, toneMapped: false }), { castShadow: false });
  addBox(group, [0.05, 0.82, 0.03], [0, 0, 0.46], new THREE.MeshBasicMaterial({ color: 0xf2c384, toneMapped: false }), { castShadow: false });
  const left = new THREE.Group();
  left.position.set(-0.53, 0, 0.62);
  group.add(left);
  addBox(left, [0.53, 1.14, 0.07], [0, 0, 0], frameMat);
  addBox(left, [0.08, 0.6, 0.12], [0.2, 0, 0], new THREE.MeshStandardMaterial({ color: 0x8b7e5b, metalness: 0.7, roughness: 0.3 }), { castShadow: false });
  const right = new THREE.Group();
  right.position.set(0.53, 0, 0.62);
  group.add(right);
  addBox(right, [0.53, 1.14, 0.07], [0, 0, 0], frameMat);
  addBox(right, [0.08, 0.6, 0.12], [-0.2, 0, 0], new THREE.MeshStandardMaterial({ color: 0x8b7e5b, metalness: 0.7, roughness: 0.3 }), { castShadow: false });
  const indicatorMat = new THREE.MeshBasicMaterial({ color: 0x5d281b, toneMapped: false });
  addBox(group, [0.18, 0.1, 0.09], [0, 1.46, 0.52], indicatorMat, { castShadow: false });
  addBox(group, [2.8, 0.08, 0.16], [0, -1.48, 0.54], frameMat, { castShadow: false });
  const light = new THREE.PointLight(0xffb46a, 2.4, 4.5, 2);
  light.position.set(0, 0.1, 1.2);
  group.add(light);
  return { group, left, right, indicator: indicatorMat, light };
}

export interface SpaceWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  gun: PistolRig;
  airlockGlobal: THREE.Vector3;
  targetGlobals: THREE.Vector3[];
  zhangMuzzle: THREE.Object3D;
  update: (time: number) => void;
  setCrewVisible: (visible: boolean) => void;
  setGunVisible: (visible: boolean) => void;
  setScopeVisible: (visible: boolean) => void;
  setBulletsVisible: (visible: boolean) => void;
  setZhangJets: (active: boolean) => void;
  setSunset: (value: number) => void;
  setVisorClear: () => void;
  getVictimPoint: (index: number) => THREE.Vector3;
  setSoloVictim: (index: number | null) => void;
}

export function createSpaceWorld(): SpaceWorld {
  const group = new THREE.Group();
  group.name = "orbit";
  group.visible = false;

  // Distant stars, multiple scales so the void has depth without becoming noise.
  group.add(createStarfield(1300, 250, 700, 21, 0xd8e3eb, 0x9fb4c2));
  const starDust = createStarfield(260, 60, 220, 918, 0xb8c8d2, 0x88a8b8);
  (starDust.material as THREE.PointsMaterial).size = 1.1;
  group.add(starDust);

  const earth = makeEarth(70, 0.9);
  group.add(earth);
  const halo = makeGlowSprite(0x4e8fb9, 220, 0.11);
  halo.position.copy(EARTH_CENTER).add(new THREE.Vector3(-10, 34, 12));
  group.add(halo);
  const atmosphere = makeGlowSprite(0x83c8de, 150, 0.08);
  atmosphere.position.copy(EARTH_CENTER).add(new THREE.Vector3(-8, 48, 18));
  group.add(atmosphere);

  // Sun: a small voxel furnace with an impractical lens glow.
  const sunGroup = new THREE.Group();
  sunGroup.position.set(40, 35, -260);
  group.add(sunGroup);
  const sunGeo = voxelSphere(
    6,
    (x, y, z) => {
      const d = Math.sqrt(x * x + y * y + z * z);
      if (d > 5.2) return 0xffc36a;
      if (d > 4.1) return 0xfff3cf;
      return 0xfffdf2;
    },
    { voxel: 1.0 },
  );
  const sunMesh = new THREE.Mesh(sunGeo, new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }));
  sunGroup.add(sunMesh);
  const sunGlow = makeGlowSprite(0xffe0a7, 96, 0.55);
  sunGlow.position.z = 14;
  sunGroup.add(sunGlow);
  const sunCore = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture("rgba(255,255,247,1)", "rgba(255,206,132,.55)"),
      color: 0xfff4d6,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    }),
  );
  sunCore.scale.setScalar(26);
  sunCore.position.z = 18;
  sunGroup.add(sunCore);
  const sunInner = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture("rgba(255,255,255,1)", "rgba(255,232,178,.8)"),
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    }),
  );
  sunInner.scale.setScalar(13);
  sunInner.position.z = 19;
  sunGroup.add(sunInner);
  const sunStreak = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture("rgba(255,241,208,1)", "rgba(218,143,67,.3)"),
      color: 0xffd89e,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    }),
  );
  sunStreak.scale.set(120, 14, 1);
  sunStreak.position.z = 12;
  sunGroup.add(sunStreak);
  const sunFlare = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture("rgba(255,248,218,1)", "rgba(235,170,83,.32)"),
        color: i % 2 ? 0xc0e2e6 : 0xffc27a,
        transparent: true,
        opacity: 0.1 - i * 0.015,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    s.scale.setScalar(9 + i * 5);
    s.position.set(-i * 6.3, i * 2.7, 0);
    sunFlare.add(s);
  }
  group.add(sunFlare);

  // Sunlight and earthshine.
  const sunLight = new THREE.DirectionalLight(0xffe0b2, 3.6);
  sunLight.position.copy(sunGroup.position);
  sunLight.target.position.set(0, 0, -46);
  group.add(sunLight, sunLight.target);
  const earthShine = new THREE.DirectionalLight(0x5e8ba8, 0.65);
  earthShine.position.set(0, -30, -20);
  earthShine.target.position.set(0, 0, -40);
  group.add(earthShine, earthShine.target);
  const rim = new THREE.DirectionalLight(0x89b3c2, 0.8);
  rim.position.set(-30, 15, -120);
  rim.target.position.set(0, 0, -40);
  group.add(rim, rim.target);
  const faceFill = new THREE.DirectionalLight(0xc3dbe2, 1.55);
  faceFill.position.set(14, 7, 28);
  faceFill.target.position.set(0, 3, -46);
  group.add(faceFill, faceFill.target);
  group.add(new THREE.AmbientLight(0x1d2a33, 1.02));
  const lineupFill = new THREE.SpotLight(0xd4e4e6, 520, 55, 0.5, 0.8, 2);
  lineupFill.position.set(-1, 7, -29);
  lineupFill.target.position.set(0.1, 4.25, -46);
  group.add(lineupFill, lineupFill.target);

  // Space elevator ribbon: a bright thread from the wheel to the planet.
  const ribbonMat = new THREE.MeshBasicMaterial({ color: 0x5e777b, transparent: true, opacity: 0.14, toneMapped: false });
  const ribbonTop = STATION_CENTER.clone().add(new THREE.Vector3(0, -8.4, 0.4));
  const ribbonBottom = new THREE.Vector3(-1.3, -25.0, -118);
  group.add(beamBetween(ribbonTop, ribbonBottom, 0.11, ribbonMat));
  for (let i = 0; i < 10; i++) {
    const p = ribbonTop.clone().lerp(ribbonBottom, i / 10);
    const dot = makeGlowSprite(0x9ac1c8, 0.8, 0.15);
    dot.position.copy(p);
    group.add(dot);
  }

  // Wheel station, a machine of rings and spokes.
  const station = new THREE.Group();
  station.position.copy(STATION_CENTER);
  group.add(station);
  const frameBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const lightBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const ringRadius = 8.8;
  const segments = 34;
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * TAU;
    const x = Math.cos(a) * ringRadius;
    const y = Math.sin(a) * ringRadius;
    for (const z of [-0.46, 0.46]) {
      frameBoxes.push({
        position: [x, y, z],
        size: [1.72, 0.72, 0.52],
        color: i % 5 === 0 ? 0x6f786f : 0x3b4649,
        rotation: [0, 0, a + Math.PI / 2],
      });
    }
    if (i % 2 === 0) {
      lightBoxes.push({
        position: [x, y, 0.75],
        size: [0.28, 0.11, 0.08],
        color: i % 8 === 0 ? 0xffc37a : 0x9fd8d0,
        rotation: [0, 0, a + Math.PI / 2],
      });
    }
    if (i % 3 === 0) {
      frameBoxes.push({
        position: [x, y, 1.0],
        size: [0.5, 0.38, 0.3],
        color: 0x777d72,
        rotation: [0, 0, a + Math.PI / 2],
      });
      lightBoxes.push({ position: [x, y, 1.17], size: [0.13, 0.09, 0.04], color: 0xe7b475 });
    }
    if (i % 4 === 0) {
      frameBoxes.push({
        position: [x * 1.1, y * 1.1, 0.0],
        size: [1.8, 0.09, 1.6],
        color: 0x242d2f,
        rotation: [0, 0, a],
      });
    }
  }
  // Inner ring.
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TAU;
    frameBoxes.push({
      position: [Math.cos(a) * 6.1, Math.sin(a) * 6.1, 0],
      size: [1.75, 0.45, 0.7],
      color: i % 3 === 0 ? 0x877d66 : 0x424e50,
      rotation: [0, 0, a + Math.PI / 2],
    });
  }
  // Spokes.
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    frameBoxes.push({
      position: [Math.cos(a) * 4.0, Math.sin(a) * 4.0, 0],
      size: [6.4, 0.24, 0.4],
      color: 0x59615c,
      rotation: [0, 0, a],
    });
    frameBoxes.push({
      position: [Math.cos(a) * 4.05, Math.sin(a) * 4.05, 0.27],
      size: [5.9, 0.07, 0.05],
      color: 0x323b3c,
      rotation: [0, 0, a],
    });
  }
  // Central hub, docks and radiator planes.
  frameBoxes.push({ position: [0, 0, 0], size: [2.9, 2.9, 2.1], color: 0x515d5d });
  frameBoxes.push({ position: [0, 0, 1.15], size: [2.0, 2.0, 0.9], color: 0x2f3838 });
  frameBoxes.push({ position: [0, 2.0, 0], size: [2.7, 0.36, 1.4], color: 0x72807b });
  frameBoxes.push({ position: [0, -2.0, 0], size: [2.7, 0.36, 1.4], color: 0x72807b });
  frameBoxes.push({ position: [0, 0, -1.8], size: [0.6, 4.5, 0.26], color: 0x454f4e });
  for (const [x, y, rot] of [
    [7.2, 4.2, 0.25],
    [-7.2, 4.2, -0.25],
    [7.2, -4.2, 0.25],
    [-7.2, -4.2, -0.25],
  ] as Array<[number, number, number]>) {
    frameBoxes.push({
      position: [x, y, -1.6],
      size: [5.8, 1.6, 0.09],
      color: 0x273435,
      rotation: [0, 0, rot],
    });
    for (let k = 0; k < 5; k++) {
      frameBoxes.push({
        position: [x, y, -1.54],
        size: [0.06, 1.6, 0.06],
        color: 0x7f8b7e,
        rotation: [0, 0, rot],
      });
    }
    lightBoxes.push({ position: [x, y, -1.48], size: [0.09, 0.09, 0.04], color: 0xc6d8b4 });
  }
  const stationFrame = addBatchedBoxes(station, frameBoxes, { roughness: 0.62, metalness: 0.3 }, false, false);
  if (stationFrame) stationFrame.name = "huanghe-wheel";
  const stationLights = addBatchedBoxes(station, lightBoxes, { toneMapped: false, roughness: 0.5 }, false, false);
  if (stationLights) {
    stationLights.material = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  }
  const stationGlow = makeGlowSprite(0x8bb7bd, 27, 0.06);
  stationGlow.position.set(0, 0, 2);
  station.add(stationGlow);

  // Painted name on the hub.
  addLabelPlane(station, [0, 0.2, 1.58], [0, 0, 0], {
    width: 1.5,
    height: 0.58,
    text: "黄河",
    bg: "#12191a",
    color: "#d8b47f",
    size: 100,
    fontFamily: '"Noto Serif CJK SC", serif',
    emissive: true,
  });
  addLabelPlane(station, [0, -0.36, 1.58], [0, 0, 0], {
    width: 2.4,
    height: 0.25,
    text: "HUANGHE SYNCHRONOUS",
    bg: "#12191a",
    color: "#7c9b9c",
    size: 28,
    fontFamily: '"Courier New", monospace',
    emissive: true,
  });

  const airlock = makeAirlock();
  airlock.group.position.set(4.7, -7.15, 1.35);
  station.add(airlock.group);
  addLabelPlane(station, [4.7, -5.6, 2.02], [0, 0, 0], {
    width: 1.26,
    height: 0.24,
    text: "三号气闸 / A3",
    bg: "#222b2a",
    color: "#cdbb98",
    size: 31,
    fontFamily: '"Noto Sans CJK SC", sans-serif',
    emissive: true,
  });

  // Dock arms, antenna, and a tiny construction yard silhouette.
  const dockRng = mulberry32(443);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + 0.2;
    const r = 11 + (i % 3) * 1.2;
    frameBoxes.length = 0;
    const g = new THREE.Group();
    g.position.set(Math.cos(a) * r, Math.sin(a) * r, -2.5 - (i % 2) * 1.3);
    station.add(g);
    addBox(g, [0.15, 1.3 + dockRng() * 2.2, 0.15], [0, 0, 0], new THREE.MeshStandardMaterial({ color: 0x252c2d, metalness: 0.6, roughness: 0.55 }));
    addBox(g, [0.8, 0.1, 0.2], [0.35, 0.5, 0], new THREE.MeshStandardMaterial({ color: 0x2b3332, metalness: 0.5, roughness: 0.55 }), {
      rotation: [0, 0, 0.4],
    });
    const nav = makeGlowSprite(i % 2 ? 0xff8b55 : 0x79b7c8, 0.75, 0.32);
    nav.position.set(0, 1 + dockRng() * 0.8, 0);
    g.add(nav);
  }

  // Scaffolding of an unfinished interstellar shipyard.
  const yard = new THREE.Group();
  yard.position.set(17, 10, -102);
  group.add(yard);
  const yardBoxes: Parameters<typeof addBatchedBoxes>[1] = [];
  const yardRng = mulberry32(781);
  for (let i = 0; i < 22; i++) {
    yardBoxes.push({
      position: [(yardRng() - 0.5) * 14, (yardRng() - 0.5) * 8, (yardRng() - 0.5) * 5],
      size: [0.12, 0.12, 2 + yardRng() * 7],
      color: 0x3c4748,
      rotation: [yardRng() * 0.7, yardRng() * TAU, yardRng() * 0.5],
    });
  }
  for (let i = 0; i < 8; i++) {
    yardBoxes.push({
      position: [(yardRng() - 0.5) * 11, (yardRng() - 0.5) * 6, (yardRng() - 0.5) * 3],
      size: [2.4, 0.05, 0.12],
      color: 0x4e5758,
      rotation: [0, yardRng() * Math.PI, 0],
    });
  }
  addBatchedBoxes(yard, yardBoxes, { metalness: 0.45, roughness: 0.55 }, false, false);
  for (let i = 0; i < 4; i++) {
    const lamp = makeGlowSprite(0xd9ac6e, 1.1, 0.25);
    lamp.position.set(17 + (i - 2) * 4, 8 + (i % 2) * 2, -102 + i * 0.7);
    group.add(lamp);
  }

  // Further habitats like encampments in the dark.
  const depotRng = mulberry32(178);
  for (let s = 0; s < 5; s++) {
    const baseX = -35 + s * 19;
    const baseY = -1 + (s % 3) * 4;
    const baseZ = -125 - s * 9;
    const cluster = new THREE.Group();
    cluster.position.set(baseX, baseY, baseZ);
    group.add(cluster);
    const boxes: Parameters<typeof addBatchedBoxes>[1] = [];
    for (let i = 0; i < 7; i++) {
      boxes.push({
        position: [(depotRng() - 0.5) * 5, (depotRng() - 0.5) * 2.4, (depotRng() - 0.5) * 3],
        size: [0.8 + depotRng() * 1.5, 0.4 + depotRng() * 1.3, 0.7 + depotRng() * 1.7],
        color: depotRng() > 0.5 ? 0x333d3f : 0x4a514a,
      });
    }
    addBatchedBoxes(cluster, boxes, { roughness: 0.8, metalness: 0.2 }, false, false);
    const lamp = makeGlowSprite(0x87a8af, 1.4, 0.09);
    cluster.add(lamp);
  }

  // Small debris documented by the source: the perfect camouflage for a waiting man.
  const debrisRng = mulberry32(458);
  const debris: THREE.Mesh[] = [];
  const debrisMat = new THREE.MeshStandardMaterial({ color: 0x4d5151, metalness: 0.45, roughness: 0.66 });
  for (let i = 0; i < 26; i++) {
    const size = 0.15 + debrisRng() * 1.1;
    const piece = new THREE.Mesh(new THREE.BoxGeometry(size, size * (0.4 + debrisRng()), size * (0.5 + debrisRng())), debrisMat);
    piece.position.set(-16 + debrisRng() * 32, -2 + debrisRng() * 14, -74 + debrisRng() * 58);
    piece.rotation.set(debrisRng() * TAU, debrisRng() * TAU, debrisRng() * TAU);
    piece.userData.spin = (debrisRng() - 0.5) * 0.1;
    group.add(piece);
    debris.push(piece);
  }

  // Zhang, waiting.
  const zhang = createZhang();
  zhang.setSuit("clear");
  zhang.figure.root.position.set(0, 0, 0);
  zhang.figure.root.rotation.y = 0;
  zhang.figure.anchors.back.add(createBackpack());
  group.add(zhang.figure.root);
  const gun = createPistolRig(false);
  gun.root.visible = false;
  zhang.figure.anchors.handR.add(gun.root);
  const muzzleLight = new THREE.PointLight(0xffcd85, 0, 3.2, 2);
  muzzleLight.position.set(0, 0, 3.6);
  gun.root.add(muzzleLight);

  // Suit thruster puffs for the escape.
  const zhangJets: THREE.Sprite[] = [];
  for (let i = 0; i < 6; i++) {
    const sprite = makeMistSprite(i < 2 ? 12 : 8, 0);
    const side = i < 2 ? (i ? 8 : -8) : (i - 3.5) * 2.2;
    sprite.position.set(side, -1.2 - (i % 3) * 0.8, -2.0 - (i % 2) * 1.2);
    zhang.figure.anchors.back.add(sprite);
    zhangJets.push(sprite);
  }
  const jetGlow = makeGlowSprite(0xdaf1f4, 18, 0);
  jetGlow.position.set(0, -0.5, -3.0);
  zhang.figure.anchors.back.add(jetGlow);
  zhangJets.push(jetGlow);

  // The line-up. Every figure is built with the supplied kit.
  const crew: CrewEntry[] = [];
  const victims: CrewEntry[] = [];
  const lineupPositions: THREE.Vector3[] = [];
  const lineupRows: Array<{ xs: number[]; y: number; z: number }> = [
    { xs: CREW_FRONT_X, y: 3.05, z: LINEUP_Z },
    { xs: CREW_BACK_X, y: 4.15, z: LINEUP_Z - 2.15 },
    { xs: CREW_THIRD_X, y: 5.2, z: LINEUP_Z - 4.25 },
  ];
  const totalCrew = CREW_FRONT_X.length + CREW_BACK_X.length + CREW_THIRD_X.length;
  let crewIndex = 0;
  for (let row = 0; row < lineupRows.length; row++) {
    const cfg = lineupRows[row]!;
    for (let col = 0; col < cfg.xs.length; col++) {
      const index = crewIndex++;
      let actor: AstronautActor;
      if (index === 2) actor = createTarget(0);
      else if (index === 3) actor = createTarget(1);
      else if (index === 4) actor = createTarget(2);
      else actor = createCrowdAstronaut(40 + index * 7, row === 0 ? "#b07b54" : "#879b95");
      actor.setVisor("sealed");
      const lineup = new THREE.Vector3(cfg.xs[col]!, cfg.y, cfg.z);
      lineupPositions.push(lineup);
      const start = AIRLOCK_GLOBAL.clone().add(
        new THREE.Vector3((index % 5 - 2) * 0.5, (Math.floor(index / 5) % 4 - 1.5) * 0.35, -index * 0.07),
      );
      actor.figure.root.position.copy(start);
      actor.figure.root.rotation.y = 0;
      actor.figure.root.visible = false;
      group.add(actor.figure.root);
      const puffs: THREE.Sprite[] = [];
      for (let k = 0; k < 2; k++) {
        const puff = makeMistSprite(1.2, 0);
        group.add(puff);
        puffs.push(puff);
      }
      const victimSlot = VICTIM_INDICES.indexOf(index);
      const entry: CrewEntry = {
        actor,
        start,
        lineup,
        phase: index * 0.61,
        index,
        victimSlot,
        puffs,
        hitTime: victimSlot >= 0 ? HIT_TIMES[victimSlot]! : null,
        visorState: "sealed",
        screamed: false,
      };
      crew.push(entry);
      if (victimSlot >= 0) victims.push(entry);
    }
  }
  // Photographer (a separate kit figure, since he is not in formation).
  const photographer = createCrowdAstronaut(620, "#aab1a4");
  photographer.setVisor("clear");
  photographer.figure.root.position.set(6.6, 3.2, -37.6);
  photographer.figure.root.rotation.y = -0.88;
  const cameraProp = makeCrewCamera();
  cameraProp.scale.setScalar(0.025);
  cameraProp.position.set(0, 0.05, 0.38);
  photographer.figure.anchors.handR.add(cameraProp);
  photographer.figure.root.visible = false;
  group.add(photographer.figure.root);

  // Breath vapour and blood crystals.
  const mistTexture = softMistTexture();
  const gasSprites: THREE.Sprite[] = [];
  for (let v = 0; v < victims.length; v++) {
    for (let k = 0; k < 4; k++) {
      const mat = new THREE.SpriteMaterial({
        map: mistTexture,
        color: k === 0 ? 0xe1e8e6 : 0xbfd0d2,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.3);
      group.add(sprite);
      gasSprites.push(sprite);
    }
  }
  const bloodTexture = canvasTexture(8, 8, (ctx) => {
    ctx.fillStyle = "#7d211b";
    ctx.fillRect(2, 2, 4, 4);
    ctx.fillStyle = "#c14b40";
    ctx.fillRect(3, 3, 2, 2);
  }, { nearest: true });
  const bloodPoints = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xd45b4e,
      size: 0.11,
      map: bloodTexture,
      transparent: true,
      alphaTest: 0.4,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  const bloodPerVictim = 18;
  const bloodPositions = new Float32Array(victims.length * bloodPerVictim * 3);
  const bloodData: Array<{ dir: THREE.Vector3; speed: number }> = [];
  const bloodRng = mulberry32(559);
  for (let i = 0; i < victims.length * bloodPerVictim; i++) {
    const dir = new THREE.Vector3(bloodRng() - 0.35, bloodRng() - 0.2, bloodRng() * 1.5 + 0.2).normalize();
    bloodData.push({ dir, speed: 0.4 + bloodRng() * 1.5 });
  }
  const bloodGeo = new THREE.BufferGeometry();
  bloodGeo.setAttribute("position", new THREE.BufferAttribute(bloodPositions, 3));
  (bloodPoints as THREE.Points).geometry = bloodGeo;
  group.add(bloodPoints);

  // Fired meteor bullets: glints and short vacuum trails.
  const bulletGroup = new THREE.Group();
  bulletGroup.visible = false;
  group.add(bulletGroup);
  const bulletPositions = new Float32Array(30 * 3);
  const bulletGeo = new THREE.BufferGeometry();
  bulletGeo.setAttribute("position", new THREE.BufferAttribute(bulletPositions, 3));
  const bulletMat = new THREE.PointsMaterial({
    color: 0xffe5b2,
    size: 0.42,
    map: glowTexture("rgba(255,250,227,1)", "rgba(240,172,83,.4)"),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const bulletPoints = new THREE.Points(bulletGeo, bulletMat);
  bulletPoints.frustumCulled = false;
  bulletGroup.add(bulletPoints);
  const bulletBloom = new THREE.Points(
    bulletGeo,
    new THREE.PointsMaterial({
      color: 0xffd89a,
      size: 0.95,
      map: glowTexture("rgba(255,250,230,1)", "rgba(236,161,72,.35)"),
      transparent: true,
      opacity: 0.33,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  bulletBloom.frustumCulled = false;
  bulletGroup.add(bulletBloom);
  const trailPositions = new Float32Array(30 * 6);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
  const trailMat = new THREE.LineBasicMaterial({
    color: 0xffddb0,
    transparent: true,
    opacity: 0.68,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const trails = new THREE.LineSegments(trailGeo, trailMat);
  trails.frustumCulled = false;
  bulletGroup.add(trails);
  const bulletTargets = [
    lineupPositions[2]!.clone().add(new THREE.Vector3(0, 1.0, 0)),
    lineupPositions[3]!.clone().add(new THREE.Vector3(0, 1.0, 0)),
    lineupPositions[4]!.clone().add(new THREE.Vector3(0, 1.0, 0)),
  ];

  // Fine drifting particles around the waiting figure.
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions: number[] = [];
  const dustRng = mulberry32(888);
  for (let i = 0; i < 100; i++) {
    dustPositions.push(-7 + dustRng() * 14, -4 + dustRng() * 9, -28 + dustRng() * 28);
  }
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xc4d8da,
      size: 0.012,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(dust);

  // Helpers for the sequence.
  let crewVisible = false;
  let gunVisible = false;
  let bulletsVisible = false;
  let zhangJetsActive = false;
  let visorClear = false;
  let airlockAmount = 0;
  let soloVictim: number | null = null;
  const tmp = new THREE.Vector3();
  const prevPositions = new Float32Array(30 * 3);
  const jetPuffs = crew.flatMap((entry) => entry.puffs);
  let targetPositions = lineupPositions.filter((_, i) => TARGET_CREW.includes(i));

  const gasOffsets = [
    new THREE.Vector3(0, 1.55, 0.1),
    new THREE.Vector3(0.15, 1.35, 0.15),
    new THREE.Vector3(-0.2, 1.05, 0.1),
    new THREE.Vector3(0.1, 1.82, 0),
  ];

  const setCrewVisible = (visible: boolean): void => {
    crewVisible = visible;
    crew.forEach((entry) => {
      entry.actor.figure.root.visible = visible;
    });
    photographer.figure.root.visible = visible;
    if (!visible) jetPuffs.forEach((puff) => (puff.visible = false));
  };

  const setGunVisible = (visible: boolean): void => {
    gunVisible = visible;
    gun.root.visible = visible;
  };
  const setScopeVisible = (visible: boolean): void => {
    gun.scope.visible = visible;
  };
  const setBulletsVisible = (visible: boolean): void => {
    bulletsVisible = visible;
    bulletGroup.visible = visible;
  };
  const setZhangJets = (active: boolean): void => {
    zhangJetsActive = active;
    zhangJets.forEach((puff) => (puff.visible = active));
  };
  const setVisorClear = (): void => {
    visorClear = true;
  };
  void visorClear;
  void setVisorClear;
  const setSoloVictim = (index: number | null): void => {
    soloVictim = index;
  };
  const setSunset = (value: number): void => {
    // 0 = high; 1 = below the planetary limb.
    const v = clamp01(value);
    const baseY = 35;
    sunGroup.position.y = lerp(baseY, -78, v);
    sunFlare.position.copy(sunGroup.position);
    sunLight.position.copy(sunGroup.position);
    sunLight.intensity = lerp(3.6, 0.85, smooth(v));
    sunLight.color.setHSL(lerp(0.1, 0.055, v), lerp(0.55, 0.82, v), lerp(0.82, 0.6, v));
    sunGlow.material.opacity = lerp(0.55, 0.2, v);
    sunStreak.material.opacity = lerp(0.4, 0.12, v);
  };

  const updateCrew = (time: number): void => {
    if (!crewVisible) return;
    const visibleAt = 267.2;
    const departed = time >= visibleAt;
    for (const entry of crew) {
      const root = entry.actor.figure.root;
      if (!departed) {
        root.visible = false;
        entry.puffs.forEach((p) => (p.visible = false));
        continue;
      }
      root.visible = soloVictim === null ? true : entry.victimSlot === soloVictim;
      // Flight from the airlock to the authorised photograph formation.
      const departDelay = entry.index * 0.1;
      const exitT = smooth(clamp01((time - (visibleAt + departDelay)) / 10.4));
      const lineupFinished = visibleAt + departDelay + 10.4;
      const driftPhase = entry.phase;
      const bob = new THREE.Vector3(
        Math.sin(time * 0.37 + driftPhase) * 0.055,
        Math.sin(time * 0.43 + driftPhase * 1.3) * 0.075,
        Math.cos(time * 0.31 + driftPhase) * 0.04,
      );
      if (time < 319.15) {
        tmp.copy(entry.start).lerp(entry.lineup, exitT);
        const arc = Math.sin(Math.PI * exitT) * 0.9;
        tmp.y += arc + bob.y;
        tmp.x += Math.sin(exitT * Math.PI) * (entry.index % 2 ? 0.5 : -0.5) + bob.x;
        tmp.z += bob.z;
        root.position.copy(tmp);
        const turned = smooth(clamp01((time - 317.7 - entry.victimSlot * 0.12) / 1.4));
        root.rotation.y = (entry.victimSlot >= 0 ? -0.8 : 0) * turned;
      } else {
        const returnT = smooth(clamp01((time - 319.15) / 5.2));
        const start = entry.lineup.clone().add(bob);
        const end = AIRLOCK_GLOBAL.clone().add(
          new THREE.Vector3((entry.index % 5 - 2) * 0.65, (Math.floor(entry.index / 4) % 3 - 1) * 0.4, -entry.index * 0.03),
        );
        root.position.copy(start).lerp(end, returnT);
        root.position.y += Math.sin(Math.PI * returnT) * 0.7;
        const targetYaw = entry.victimSlot >= 0 ? -0.55 : Math.PI;
        root.rotation.y = lerp(entry.victimSlot >= 0 ? -0.8 : 0, targetYaw, smooth(clamp01((time - 319.15) / 1.25)));
      }

      const flightPose = floatingWorkPose(time * 0.52 + driftPhase);
      // Tiny individual asymmetries: this is a human formation, not a rank of statues.
      flightPose.hips = [
        (flightPose.hips?.[0] ?? 0) + 0.04 * Math.sin(entry.index * 2.1),
        (flightPose.hips?.[1] ?? 0) + 0.04 * Math.sin(entry.index * 1.3 + 0.6),
        (flightPose.hips?.[2] ?? 0) + 0.03 * Math.sin(entry.index * 0.9 + 1.4),
      ];
      flightPose.armR = [
        (flightPose.armR?.[0] ?? 0) + (entry.index % 3 - 1) * 0.1,
        flightPose.armR?.[1] ?? 0,
        (flightPose.armR?.[2] ?? 0) + (entry.index % 4 - 1.5) * 0.05,
      ];
      flightPose.armL = [
        (flightPose.armL?.[0] ?? 0) + (entry.index % 4 - 1.5) * 0.08,
        flightPose.armL?.[1] ?? 0,
        (flightPose.armL?.[2] ?? 0),
      ];
      flightPose.neck = [
        (flightPose.neck?.[0] ?? 0) + (entry.index % 2) * 0.04,
        (flightPose.neck?.[1] ?? 0) + Math.sin(entry.index * 1.7) * 0.1,
        (flightPose.neck?.[2] ?? 0),
      ];
      let pose: Pose = flightPose;
      const hit = entry.hitTime;
      if (hit !== null && time >= hit) {
        const dt = time - hit;
        const settle = smooth(clamp01(dt / 1.5));
        const limp: Pose = {
          hips: [-0.32 + Math.sin(dt * 0.7) * 0.02, 0.25 * settle, 0.08],
          neck: [-0.18, 0.35 * settle, 0.18 * settle],
          armR: [-1.4 + Math.sin(dt * 0.8) * 0.1, 0.16, 0.7],
          armL: [-0.5 + Math.cos(dt * 0.6) * 0.1, -0.28, -0.8],
          legR: [-0.65 + Math.sin(dt * 0.5) * 0.08, 0.13, 0.18],
          legL: [-0.22, -0.1, -0.20],
          lift: 1.15 + Math.sin(dt * 0.35) * 0.2,
        };
        pose = limp;
      } else if (time > 317.15) {
        const panic = smooth(clamp01((time - 317.15) / 1.5));
        const armR = pose.armR ?? [0, 0, 0];
        const armL = pose.armL ?? [0, 0, 0];
        pose = {
          hips: [-0.1, 0, 0],
          neck: [0.1, 0.2 * Math.sin(time * 1.7), 0],
          armR: [lerp(armR[0], -1.8, panic), armR[1], armR[2]],
          armL: [lerp(armL[0], -1.5, panic), armL[1], armL[2]],
          legR: leverLeg(pose, "legR", panic),
          legL: leverLeg(pose, "legL", panic),
          lift: pose.lift,
        };
      }
      applyPose(entry.actor.figure, pose);

      // Visor state is switched only when it actually changes.
      let desiredVisor: "sealed" | "clear" | "cracked" | "bloodied" = time > 280.35 ? "clear" : "sealed";
      if (hit !== null && time >= hit) desiredVisor = "bloodied";
      if (entry.visorState !== desiredVisor) {
        entry.visorState = desiredVisor;
        entry.actor.setVisor(desiredVisor);
      }
      if (hit !== null) {
        const shouldScream = time > hit + 0.2;
        if (entry.screamed !== shouldScream) {
          entry.screamed = shouldScream;
          entry.actor.setScream(shouldScream);
        }
      }

      // Jet backpacks.
      const moving = (time > 268 && time < lineupFinished + 0.2) || time > 319.2;
      entry.puffs.forEach((puff, k) => {
        const base = root.position;
        const off = time > 319.2 ? new THREE.Vector3((k - 0.5) * 0.25, 0.2, 0.7) : new THREE.Vector3((k - 0.5) * 0.25, 0.2, -0.7);
        puff.position.copy(base).add(off);
        puff.visible = moving;
        const mat = puff.material as THREE.SpriteMaterial;
        mat.opacity = moving ? 0.16 + 0.07 * Math.sin(time * 9 + entry.phase + k) : 0;
        puff.scale.setScalar(0.65 + 0.35 * Math.sin(time * 5 + k + entry.phase));
      });
    }
    photographer.figure.root.visible = time > 279.4 && soloVictim === null;
    if (time > 279.4) {
      applyPose(photographer.figure, {
        hips: [-0.05, 0.05, 0],
        neck: [0.08, -0.45, 0],
        armR: [-1.15, 0.2, 0.28],
        armL: [-0.3, -0.1, -0.35],
        legR: [-0.28, 0, 0.06],
        legL: [-0.18, 0, -0.06],
        lift: Math.sin(time * 0.5) * 0.1,
      });
    }
  };

  function leverLeg(pose: Pose, joint: "legR" | "legL", amount: number): [number, number, number] {
    const current = pose[joint] ?? [0, 0, 0];
    const target = joint === "legR" ? [-0.9, 0.1, 0.15] : [-0.7, -0.1, -0.15];
    return [
      lerp(current[0], target[0], amount),
      lerp(current[1], target[1], amount),
      lerp(current[2], target[2], amount),
    ];
  }

  const updateGasAndBlood = (time: number): void => {
    const gasPer = 4;
    for (let v = 0; v < victims.length; v++) {
      const entry = victims[v]!;
      const hit = entry.hitTime;
      const root = entry.actor.figure.root;
      for (let k = 0; k < gasPer; k++) {
        const sprite = gasSprites[v * gasPer + k]!;
        if (hit === null || time < hit || (soloVictim !== null && soloVictim !== v)) {
          sprite.visible = false;
          continue;
        }
        const dt = time - hit;
        sprite.visible = dt < 17;
        const offset = gasOffsets[k]!;
        const drift = new THREE.Vector3(Math.sin(entry.phase + k) * 0.1, 0.05 + k * 0.02, 0.1 + k * 0.05).multiplyScalar(Math.min(dt, 8));
        sprite.position.copy(root.position).add(offset).add(drift);
        const material = sprite.material as THREE.SpriteMaterial;
        material.opacity = Math.max(0, 0.72 * (1 - dt / 17)) * (0.45 + 0.55 * Math.sin(clamp01(dt / 0.4) * Math.PI * 0.5));
        sprite.scale.setScalar(0.34 + Math.min(dt, 7) * 0.3 + k * 0.1);
      }
    }
    const arr = bloodGeo.attributes.position.array as Float32Array;
    for (let v = 0; v < victims.length; v++) {
      const entry = victims[v]!;
      const hit = entry.hitTime;
      const root = entry.actor.figure.root;
      for (let p = 0; p < bloodPerVictim; p++) {
        const idx = v * bloodPerVictim + p;
        if (hit === null || time < hit) {
          arr[idx * 3] = 0;
          arr[idx * 3 + 1] = -999;
          arr[idx * 3 + 2] = 0;
          continue;
        }
        const dt = Math.max(0, time - hit);
        const data = bloodData[idx]!;
        if (soloVictim !== null && soloVictim !== v) {
          arr[idx * 3] = 0;
          arr[idx * 3 + 1] = -999;
          arr[idx * 3 + 2] = 0;
          continue;
        }
        const origin = root.position.clone().add(new THREE.Vector3(0, 1.55, 0));
        const travel = Math.min(dt, 5.5);
        const pnt = origin.addScaledVector(data.dir, 0.05 + data.speed * travel * 0.1);
        pnt.y += Math.sin(dt * 1.4 + p) * 0.04 - Math.min(dt, 8) * 0.012;
        arr[idx * 3] = pnt.x;
        arr[idx * 3 + 1] = pnt.y;
        arr[idx * 3 + 2] = pnt.z;
      }
    }
    bloodGeo.attributes.position.needsUpdate = true;
    (bloodPoints.material as THREE.PointsMaterial).opacity = 0.9;
  };

  const update = (time: number): void => {
    // Planet and debris drift is derived from absolute time; seeking stays exact.
    earth.rotation.y = 0.4 + time * 0.00055;
    debris.forEach((piece) => {
      piece.rotation.x += 0; // set below, never accumulated
      piece.rotation.y = piece.userData.phase ?? (piece.userData.phase = piece.rotation.y);
      piece.rotation.y = (piece.userData.phase as number) + time * (piece.userData.spin as number);
      piece.rotation.x = (piece.userData.spin as number) * time * 0.7 + 0.2;
    });
    dust.rotation.y = time * 0.0015;
    station.rotation.z = Math.sin(time * 0.01) * 0.0015;
    const glowPulse = 0.5 + 0.5 * Math.sin(time * 0.6);
    airlock.light.intensity = 2.4 + glowPulse * 1.1;
    // Airlock slides open a moment before the first astronaut emerges.
    airlockAmount = smooth(clamp01((time - 266.6) / 1.8));
    airlock.left.position.x = -0.53 - airlockAmount * 0.5;
    airlock.right.position.x = 0.53 + airlockAmount * 0.5;
    const opening = time > 266.6;
    airlock.indicator.color.setHex(opening ? 0x6fd6a3 : 0x7c2a1d);

    updateCrew(time);
    updateGasAndBlood(time);

    // Sun sinks behind the planet between egress and firing.
    const sunsetT = smooth(clamp01((time - 271) / 24));
    setSunset(sunsetT);
    sunFlare.position.copy(sunGroup.position);
    sunFlare.quaternion.copy(sunGroup.quaternion);

    gun.setFlash(0);
    // A flash that only exists on the retina.
    let flash = 0;
    for (const shot of FIRE_TIMES) {
      const d = time - shot;
      if (d >= -0.02 && d < 0.075) flash = Math.max(flash, 1 - Math.abs(d) / 0.075);
    }
    gun.setFlash(flash);
    muzzleLight.intensity = flash * 40;
    if (gunVisible) {
      // Gun scope/sight slightly catches the sun.
      gun.flash.visible = true;
    }

    // Trail bullets through the vacuum, no sound and no drag.
    if (bulletsVisible) {
      const posArr = bulletGeo.attributes.position.array as Float32Array;
      const trailArr = trailGeo.attributes.position.array as Float32Array;
      const start = zhang.figure.root.position.clone().add(new THREE.Vector3(0.04, 1.36, -0.24));
      for (let i = 0; i < 30; i++) {
        const t0 = FIRE_TIMES[i]!;
        const p = clamp01((time - t0) / 9.98);
        const target = bulletTargets[Math.min(2, Math.floor(i / 10))]!;
        const pPrev = clamp01((time - t0 - 0.46) / 9.98);
        const x = lerp(start.x, target.x, p);
        const y = lerp(start.y, target.y, p);
        const z = lerp(start.z, target.z, p);
        posArr[i * 3] = x;
        posArr[i * 3 + 1] = y;
        posArr[i * 3 + 2] = z;
        const px = lerp(start.x, target.x, pPrev);
        const py = lerp(start.y, target.y, pPrev);
        const pz = lerp(start.z, target.z, pPrev);
        trailArr[i * 6] = px;
        trailArr[i * 6 + 1] = py;
        trailArr[i * 6 + 2] = pz;
        trailArr[i * 6 + 3] = x;
        trailArr[i * 6 + 4] = y;
        trailArr[i * 6 + 5] = z;
      }
      bulletGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.position.needsUpdate = true;
    }

    zhangJets.forEach((puff, i) => {
      const mat = puff.material as THREE.SpriteMaterial;
      const isGlow = i === zhangJets.length - 1;
      mat.opacity = zhangJetsActive ? (isGlow ? 0.12 : 0.16 + 0.05 * Math.sin(time * 7.2 + i)) : 0;
      if (isGlow) puff.scale.setScalar(18 + 2 * Math.sin(time * 2.3));
      else puff.scale.setScalar(9.5 + 1.8 * Math.sin(time * 5 + i));
    });
  };

  update(0);
  setCrewVisible(false);
  setGunVisible(false);
  setScopeVisible(false);
  setBulletsVisible(false);

  return {
    group,
    zhang,
    gun,
    airlockGlobal: AIRLOCK_GLOBAL.clone(),
    targetGlobals: targetPositions.map((target) => target.clone().add(new THREE.Vector3(0, 1.0, 0))),
    zhangMuzzle: gun.muzzle,
    update,
    setCrewVisible,
    setGunVisible,
    setScopeVisible,
    setBulletsVisible,
    setZhangJets,
    setSunset,
    setVisorClear,
    getVictimPoint(index: number) {
      const entry = victims[Math.max(0, Math.min(victims.length - 1, index))]!;
      return entry.actor.figure.root.position.clone().add(new THREE.Vector3(0, 1.42, 0));
    },
    setSoloVictim,
  };
}
