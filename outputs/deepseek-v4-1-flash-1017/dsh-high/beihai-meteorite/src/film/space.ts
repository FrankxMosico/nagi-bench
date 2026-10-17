import * as THREE from "three";
import {
  applyPose,
  createFigure,
  float,
  lerpPose,
  type Figure,
  type Pose,
} from "@agentbench/voxel-kit";
import { voxelSphere } from "@agentbench/voxel-kit";
import type { Cast } from "./cast";
import { tenseZhangPose } from "./cast";
import {
  addMeteor,
  box,
  glowBox,
  glowSprite,
  mulberry32,
  pistolModel,
  range,
  smooth01,
  surface,
  vec,
} from "./visual";

export interface SpaceSet {
  root: THREE.Group;
  zhang: Figure;
  crew: Figure[];
  targetIndices: number[];
  woundedIndices: number[];
  station: THREE.Group;
  earth: THREE.Group;
  update: (time: number) => void;
}

interface FormationSpot {
  x: number;
  y: number;
  z: number;
  row: number;
}

function makeStars(): THREE.Points {
  const count = 3200;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const rng = mulberry32(9001);
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    const radius = 600 + rng() * 700;
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    sizes[i] = 0.7 + Math.pow(rng(), 7) * 4.2;
    const warm = rng();
    color.setHSL(warm > 0.86 ? 0.08 : 0.56 + rng() * 0.08, 0.12 + rng() * 0.35, 0.65 + rng() * 0.3);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float aSize;
      attribute vec3 aColor;
      varying vec3 vColor;
      void main() {
        vColor = aColor;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (700.0 / max(1.0, -mv.z));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 p = gl_PointCoord - vec2(0.5);
        if (max(abs(p.x), abs(p.y)) > 0.5) discard;
        float edge = 1.0 - smoothstep(0.22, 0.5, max(abs(p.x), abs(p.y)));
        gl_FragColor = vec4(vColor, edge);
      }
    `,
  });
  return new THREE.Points(geometry, material);
}

function earthGeometry(): THREE.BufferGeometry {
  const radius = 16;
  return voxelSphere(
    radius,
    (x, y, z) => {
      const nx = x / (radius * 2);
      const ny = y / (radius * 2);
      const nz = z / (radius * 2);
      const land =
        Math.sin(x * 0.22 + Math.sin(z * 0.16) * 2.1) +
        Math.cos(z * 0.19 + y * 0.13) * 0.86 +
        Math.sin(y * 0.29 + x * 0.07) * 0.56;
      const cloud =
        Math.sin(x * 0.36 + z * 0.21 + y * 0.13) * 0.7 +
        Math.cos(z * 0.41 - y * 0.11) * 0.42;
      const polar = Math.abs(ny) > 0.68;
      if (polar && Math.abs(ny) > 0.82) return 0xb8c4c3;
      if (cloud > 1.02) return 0xaebbb9;
      if (land > 0.5) {
        if (Math.abs(ny) > 0.48) return 0x6b7154;
        return x % 3 === 0 ? 0x7a7d53 : 0x4e6547;
      }
      if (land > 0.18) return 0x27526d;
      return nz > 0.1 ? 0x123a5a : 0x0b2b47;
    },
    { voxel: 2.0, anchor: "center" },
  );
}

function ringStation(): { group: THREE.Group; hatchLeft: THREE.Mesh; hatchRight: THREE.Mesh; hatchLight: THREE.MeshBasicMaterial; airlock: THREE.Group } {
  const group = new THREE.Group();
  const white = 0xc1c4bd;
  const warm = 0xbfc5bf;
  const blue = 0x3c6c78;
  const r = 11.5;

  // Main wheel: a chain of block modules, tangent to the circle.
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const module = new THREE.Group();
    module.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
    module.rotation.z = a + Math.PI / 2;
    group.add(module);
    box(module, 2.05, 0.86, 1.05, white, 0, 0, 0, { roughness: 0.74, metalness: 0.12 });
    box(module, 1.55, 0.12, 1.07, 0x8f948e, 0, 0.45, 0, { roughness: 0.5, metalness: 0.38 });
    box(module, 0.55, 0.24, 1.08, blue, 0, 0.1, 0.02, { emissive: 0x2a7a89, emissiveIntensity: 0.9, roughness: 0.2, metalness: 0.3 });
    for (let j = -1; j <= 1; j += 2) {
      box(module, 0.12, 0.34, 0.88, 0x8d918b, j * 0.63, -0.22, 0.02, { roughness: 0.55, metalness: 0.2 });
    }
  }

  // Spokes and hub.
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), surface(0xa9ada7, { roughness: 0.68, metalness: 0.22 }));
    spoke.scale.set(r - 1.2, 0.34, 0.36);
    spoke.position.set(Math.cos(a) * (r / 2), Math.sin(a) * (r / 2), 0);
    spoke.rotation.z = a;
    group.add(spoke);
  }
  box(group, 3.1, 3.1, 2.4, 0xaeb2ab, 0, 0, 0, { roughness: 0.6, metalness: 0.25 });
  box(group, 2.2, 2.2, 2.6, 0x8e948f, 0, 0, 0.15, { roughness: 0.52, metalness: 0.36 });
  box(group, 1.5, 1.5, 0.4, 0x343d3f, 0, 0, 1.43, { roughness: 0.4, metalness: 0.5 });
  box(group, 1.2, 0.3, 0.2, 0x5c9fab, 0, 0.45, 1.62, { emissive: 0x1b5560, emissiveIntensity: 0.6 });

  // Solar wings.
  for (const dir of [-1, 1]) {
    const wing = new THREE.Group();
    wing.position.set(dir * 7.0, 0, -1.1);
    wing.rotation.y = dir * 0.12;
    group.add(wing);
    box(wing, 8.2, 0.06, 1.2, 0x1e3640, 0, 0, 0, { roughness: 0.48, metalness: 0.3 });
    for (let i = -3; i <= 3; i++) {
      box(wing, 0.04, 0.08, 1.12, 0x375c67, i * 1.1, 0.04, 0, { roughness: 0.45, metalness: 0.4 });
    }
  }

  // The airlock reaches out toward the waiting marksman.
  const airlock = new THREE.Group();
  airlock.position.set(0, 0, 1.5);
  group.add(airlock);
  for (const x of [-1.15, 1.15]) for (const y of [-1.15, 1.15]) {
    box(airlock, 0.28, 0.28, 9.2, 0xafb3ad, x, y, 4.3, { roughness: 0.68, metalness: 0.2 });
  }
  for (const x of [-1.15, 1.15]) {
    box(airlock, 0.16, 2.55, 9.2, 0x8d938e, x, 0, 4.3, { roughness: 0.55, metalness: 0.34 });
  }
  for (const y of [-1.15, 1.15]) {
    box(airlock, 2.55, 0.16, 9.2, 0x8d938e, 0, y, 4.3, { roughness: 0.55, metalness: 0.34 });
  }
  box(airlock, 2.6, 2.6, 0.22, 0x565d5b, 0, 0, 9.0, { roughness: 0.56, metalness: 0.38 });
  box(airlock, 2.0, 2.0, 0.1, 0x101719, 0, 0, 9.13, { roughness: 0.4, metalness: 0.4 });
  const hatchLeft = box(airlock, 1.02, 2.08, 0.12, 0xc8cbc4, -0.52, 0, 9.2, { roughness: 0.62, metalness: 0.28 });
  const hatchRight = box(airlock, 1.02, 2.08, 0.12, 0xc8cbc4, 0.52, 0, 9.2, { roughness: 0.62, metalness: 0.28 });
  const hatchLightMat = new THREE.MeshBasicMaterial({ color: 0xb33a2d, toneMapped: false });
  const hatchLight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), hatchLightMat);
  hatchLight.position.set(1.58, 1.55, 9.25);
  airlock.add(hatchLight);
  return { group, hatchLeft, hatchRight, hatchLight: hatchLightMat, airlock };
}

export function createSpace(cast: Cast): SpaceSet {
  const root = new THREE.Group();
  root.name = "set:space";

  root.add(new THREE.AmbientLight(0x3f5366, 0.18));
  const hemi = new THREE.HemisphereLight(0x2d5c80, 0x030407, 0.33);
  root.add(hemi);

  root.add(makeStars());

  // Earth: a voxel world seen from outside, lit by a low sun.
  const earth = new THREE.Group();
  earth.position.set(0, -47, -112);
  root.add(earth);
  const earthMesh = new THREE.Mesh(earthGeometry(), new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1,
    metalness: 0,
  }));
  earthMesh.rotation.set(0.12, 0, -0.16);
  earth.add(earthMesh);
  const atmosphere = glowSprite(0x3e83af, 105, 0.34);
  atmosphere.position.set(0, 0, -2);
  earth.add(atmosphere);
  const earthFill = new THREE.DirectionalLight(0x4c88a9, 0.42);
  earthFill.position.set(10, -2, 15);
  earthFill.target.position.set(0, 0, 0);
  root.add(earthFill);
  root.add(earthFill.target);

  // The sun at the edge of the world.
  const sun = new THREE.Group();
  sun.position.set(-35, -11, -139);
  root.add(sun);
  const sunMesh = new THREE.Mesh(
    voxelSphere(4.1, (x, y, z, d) => (d > 0.82 ? 0xffcf7c : 0xfff2c5), { voxel: 1.3, anchor: "center" }),
    new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
  );
  sun.add(sunMesh);
  sun.add(glowSprite(0xffb45d, 39, 0.45));
  sun.add(glowSprite(0xffe1a0, 17, 0.48));
  const sunLight = new THREE.DirectionalLight(0xffc184, 3.1);
  sunLight.position.copy(sun.position).normalize().multiplyScalar(50);
  sunLight.target.position.set(0, 2, -40);
  root.add(sunLight);
  root.add(sunLight.target);
  const rim = new THREE.DirectionalLight(0x5980a0, 0.8);
  rim.position.set(20, 3, 18);
  root.add(rim);
  // Earthlight catches the faces of the crew when the sun is behind them.
  const earthlight = new THREE.PointLight(0x6e98b3, 35, 38, 1.5);
  earthlight.position.set(-6, -2, -8);
  root.add(earthlight);

  // Debris, mostly out toward the horizon.
  const debris = new THREE.Group();
  root.add(debris);
  const debrisRng = mulberry32(7711);
  const debrisMat = new THREE.MeshStandardMaterial({ color: 0x4b4a45, roughness: 0.78, metalness: 0.18 });
  for (let i = 0; i < 48; i++) {
    const size = 0.14 + debrisRng() * 1.2;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size * (0.3 + debrisRng()), size * (0.4 + debrisRng())), debrisMat);
    mesh.position.set((debrisRng() - 0.5) * 95, (debrisRng() - 0.5) * 35 + 2, -18 - debrisRng() * 76);
    mesh.rotation.set(debrisRng() * 3, debrisRng() * 3, debrisRng() * 3);
    debris.add(mesh);
  }

  // Wheel station.
  const stationData = ringStation();
  const station = stationData.group;
  station.position.set(0, 3.0, -58);
  station.rotation.z = 0.06;
  root.add(station);

  // Crew formation.
  const spots: FormationSpot[] = [];
  const rows = [
    { count: 9, y: 4.85, z: -41.2, spread: 7.0 },
    { count: 10, y: 6.05, z: -43.4, spread: 7.8 },
    { count: 11, y: 7.25, z: -45.5, spread: 8.4 },
  ];
  for (let row = 0; row < rows.length; row++) {
    const r = rows[row]!;
    for (let i = 0; i < r.count; i++) {
      const x = r.count === 1 ? 0 : -r.spread / 2 + (i / (r.count - 1)) * r.spread;
      const wobble = ((i * 37 + row * 19) % 7) * 0.035 - 0.1;
      spots.push({ x, y: r.y + wobble, z: r.z + (row === 1 ? 0.15 : 0), row });
    }
  }

  for (let i = 0; i < cast.crew.length; i++) {
    const figure = cast.crew[i]!;
    figure.root.visible = false;
    root.add(figure.root);
  }

  // Zhang Beihai, alone, five kilometres from the photograph.
  const zhang = createFigure({ body: cast.zhangBody.texture, clothes: cast.zhangSuit.texture, heightM: 1.84, castShadow: false });
  zhang.root.position.set(0, 2.15, 0.4);
  zhang.root.rotation.y = Math.PI;
  root.add(zhang.root);

  const pistol = pistolModel();
  pistol.group.position.set(0, -0.04, 0.06);
  pistol.group.scale.setScalar(1 / zhang.root.scale.x);
  pistol.group.visible = false;
  zhang.anchors.handR.add(pistol.group);

  const flashSprite = glowSprite(0xffb264, 0.45, 1);
  flashSprite.position.set(0, 0.125, 0.24);
  flashSprite.visible = false;
  pistol.muzzle.add(flashSprite);
  const flashLight = new THREE.PointLight(0xff9c50, 0, 2.5, 1.8);
  flashLight.position.set(0, 0.125, 0.24);
  pistol.muzzle.add(flashLight);

  // Bullet traces in flight.
  const bulletGroups: THREE.Group[] = [];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const core = glowBox(g, 0.035, 0.035, 0.4, i === 0 ? 0xffe4b3 : 0xbfe5dc, 0, 0, 0, 0.95);
    core.material = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xffe4b3 : 0xbfe5dc, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let j = 1; j <= 7; j++) {
      const trail = glowBox(g, 0.012, 0.012, 0.29, 0x9fd6c9, 0, 0, j * 0.12, 0.12 * (1 - j / 8));
      trail.visible = true;
    }
    g.visible = false;
    root.add(g);
    bulletGroups.push(g);
  }

  // Impact puffs: white atmosphere and crystallising blood.
  const puffCount = 5 * 70;
  const puffGeo = new THREE.BoxGeometry(1, 1, 1);
  const puffMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.54,
    depthWrite: false,
  });
  const puffs = new THREE.InstancedMesh(puffGeo, puffMat, puffCount);
  puffs.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  puffs.frustumCulled = false;
  root.add(puffs);
  const puffData = Array.from({ length: puffCount }, (_, i) => {
    const victim = Math.floor(i / 70);
    const rng = mulberry32(400 + i * 13);
    return {
      victim,
      dx: (rng() - 0.5) * 0.55,
      dy: (rng() - 0.5) * 0.5 + 0.1,
      dz: (rng() - 0.5) * 0.55,
      vx: (rng() - 0.5) * 1.7,
      vy: (rng() - 0.2) * 1.7,
      vz: (rng() - 0.3) * 1.3,
      size: 0.025 + rng() * 0.075,
      spark: rng() > 0.68,
    };
  });
  const dummy = new THREE.Object3D();
  const puffColor = new THREE.Color();
  const impactTimes = [244.35, 245.45, 246.5, 247.55, 248.55];
  const flashSprites: THREE.Sprite[] = [];
  for (let i = 0; i < 5; i++) {
    const s = glowSprite(0xff6d4a, 1.0, 0.9);
    s.visible = false;
    root.add(s);
    flashSprites.push(s);
  }

  // The relic that drifts through the coda.
  const relic = new THREE.Group();
  relic.position.set(1.18, 1.78, 2.55);
  root.add(relic);
  addMeteor(relic, 317, 4, 0.024, 0, 0, 0);
  const relicPistol = pistolModel();
  relicPistol.group.scale.setScalar(1.0);
  relicPistol.group.position.set(0.18, -0.12, 0.1);
  relicPistol.group.rotation.set(0.6, 0.2, 0.4);
  relic.add(relicPistol.group);

  // Thruster puffs for the exit.
  const thrusters: THREE.Sprite[] = [];
  for (let i = 0; i < 2; i++) {
    const s = glowSprite(0x9edbe2, 0.45, 0.45);
    s.visible = false;
    root.add(s);
    thrusters.push(s);
  }

  const impactSet = new Set<number>([2, 3, 4, 5, 6]);
  const bodyStates = new Array<boolean>(cast.crew.length).fill(false);
  let currentSuit = "suit";

  function update(time: number): void {
    const showSpaceAge = time > 185;
    station.visible = time > 190.6 && time < 288.4;
    for (let i = 0; i < cast.crew.length; i++) cast.crew[i]!.root.visible = showSpaceAge && time > 226.0 && time < 288.4;
    zhang.root.visible = showSpaceAge;
    relic.visible = time > 287;

    // Sun sinks toward the edge of the earth over the sequence.
    const sunSet = smooth01(range(time, 190, 250));
    sun.position.y = -11 - sunSet * 3.2;
    sun.position.x = -35 + sunSet * 1.8;

    // Hatch opens and the crew spills out in a loose formation.
    const hatch = smooth01(range(time, 226.5, 228.5));
    stationData.hatchLeft.position.x = -0.52 - hatch * 1.02;
    stationData.hatchRight.position.x = 0.52 + hatch * 1.02;
    stationData.hatchLight.color.setHex(time >= 226.4 ? 0x57b887 : 0xb33a2d);

    for (let i = 0; i < cast.crew.length; i++) {
      const figure = cast.crew[i]!;
      const spot = spots[i]!;
      const delay = (i % 11) * 0.13 + spot.row * 0.18;
      const fly = smooth01(range(time, 226.6 + delay, 231.7 + delay));
      const airlock = new THREE.Vector3(spot.x * 0.08, 3.0, -46.9);
      const target = new THREE.Vector3(spot.x, spot.y, spot.z);
      const p = figure.root.position;
      p.lerpVectors(airlock, target, fly);
      p.x += Math.sin(time * 0.34 + i * 1.7) * 0.035;
      p.y += Math.sin(time * 0.42 + i * 0.9) * 0.035;
      p.z += Math.sin(time * 0.27 + i * 0.6) * 0.025;

      // After the first impact, the unhurt onlookers flee back toward the airlock.
      if (time > 252.5 && !impactSet.has(i)) {
        const flee = smooth01(range(time, 252.6 + (i % 6) * 0.16, 258.4 + (i % 4) * 0.2));
        p.lerpVectors(target, new THREE.Vector3(spot.x * 0.4, 3.1, -46.8), flee);
      }
      figure.root.rotation.y = 0;

      let pose: Pose;
      if (time > 252.5 && !impactSet.has(i)) {
        pose = lerpPose(float(time * 1.2 + i), {
          hips: [0.4, 0.1, 0.1],
          neck: [-0.1, 0, 0],
          armR: [-1.2, 0.2, 0.3],
          armL: [-1.0, -0.2, -0.3],
          legR: [-0.4, 0, 0.16],
          legL: [-0.2, 0, -0.16],
          lift: 0.3,
        }, smooth01(range(time, 252.8, 256)));
      } else {
        pose = float(time + i * 0.73);
        pose.armR = [-0.78 + Math.sin(time * 0.51 + i) * 0.1, 0, 0.26];
        pose.armL = [-0.52 + Math.sin(time * 0.44 + i + 2) * 0.12, 0, -0.38];
      }
      applyPose(figure, pose);

      // The five victims: shattered visors, escaping atmosphere, frozen blood.
      const victimOrder = [2, 3, 4, 5, 6].indexOf(i);
      if (victimOrder >= 0) {
        const hitAt = impactTimes[victimOrder]!;
        const expectHit = time >= hitAt;
        if (bodyStates[i] !== expectHit) {
          figure.setBody(
            expectHit
              ? cast.hitBodies[victimOrder % cast.hitBodies.length]!.texture
              : cast.crowdBodies[i % cast.crowdBodies.length]!.texture,
          );
          bodyStates[i] = expectHit;
        }
      }
    }

    // Zhang's performance: wait, remove a glove, aim, fire, lower the pistol, leave.
    const gloveOff = smooth01(range(time, 226.1, 227.1));
    const aimAmount = smooth01(range(time, 227.4, 229.0)) * (1 - smooth01(range(time, 250.0, 254.0)));
    const leave = smooth01(range(time, 265.0, 276.0));
    const baseFloat = float(time * 0.7);
    let pose = lerpPose(baseFloat, tenseZhangPose(time, aimAmount), Math.max(aimAmount, 0.2));
    pose.neck = [
      (pose.neck?.[0] ?? 0) + 0.02,
      (pose.neck?.[1] ?? 0) - 0.03,
      (pose.neck?.[2] ?? 0),
    ];
    if (leave > 0) {
      pose = {
        ...pose,
        hips: [-0.35 + Math.sin(time * 1.2) * 0.03, 0.18, 0.12],
        neck: [0.1, 0.2, 0],
        armR: [-0.45, 0.1, 0.2],
        armL: [-0.3, -0.1, -0.2],
      };
    }
    applyPose(zhang, pose);
    zhang.root.position.z = 0.4 + leave * 11;
    zhang.root.position.y = 2.15 + Math.sin(time * 0.33) * 0.08 - leave * 0.2;
    zhang.root.rotation.y = Math.PI + leave * 0.22;

    if (gloveOff > 0.55 && currentSuit !== "bare") {
      zhang.setClothes(cast.zhangSuitBare.texture);
      currentSuit = "bare";
    } else if (gloveOff <= 0.55 && currentSuit !== "suit") {
      zhang.setClothes(cast.zhangSuit.texture);
      currentSuit = "suit";
    }

    pistol.group.visible = time > 225.9 && time < 262;
    pistol.scope.visible = time > 228.0;

    // Three bursts of ten rounds; in vacuum only the light and the suit's own
    // mechanical vibration survive.
    const inBurst = (start: number): number => {
      if (time < start || time > start + 0.72) return 0;
      const local = time - start;
      return Math.max(0, Math.sin(local * 118) * 0.5 + 0.5);
    };
    const burst = Math.max(inBurst(234.15), inBurst(236.45), inBurst(238.75));
    flashSprite.visible = burst > 0.1;
    (flashSprite.material as THREE.SpriteMaterial).opacity = burst;
    flashSprite.scale.setScalar(0.32 + burst * 0.4);
    flashLight.intensity = burst * 30;

    // Bullets cross the compressed five kilometres.
    for (let i = 0; i < 3; i++) {
      const fireTime = [234.15, 236.45, 238.75][i]!;
      const flights = time >= fireTime && time < fireTime + 10.05;
      const g = bulletGroups[i]!;
      g.visible = flights;
      if (flights) {
        const travelled = (time - fireTime) * 3.95;
        const p = Math.min(1.12, travelled / 40.2);
        const endX = [-1.75, -0.875, 0][i]!;
        g.position.set(0.3 + (endX - 0.3) * p, 3.45 + 3.0 * p, -0.25 - travelled);
        // The trail stretches behind the projectile along +Z. Each segment is fainter.
        g.children.forEach((child, index) => {
          if (index === 0) return;
          const m = child as THREE.Mesh;
          (m.material as THREE.MeshBasicMaterial).opacity = 0.1 * (1 - index / 9);
        });
      }
    }

    // Impact flashes and the expanding breath of each punctured suit.
    for (let i = 0; i < 5; i++) {
      const hitAt = impactTimes[i]!;
      const victim = [2, 3, 4, 5, 6][i]!;
      const f = flashSprites[i]!;
      const dt = time - hitAt;
      if (dt >= -0.02 && dt < 0.6) {
        f.visible = true;
        const p = figureHead(victim);
        f.position.copy(p);
        (f.material as THREE.SpriteMaterial).opacity = Math.max(0, 1 - dt / 0.6);
        f.scale.setScalar(0.35 + dt * 2.0);
      } else {
        f.visible = false;
      }
    }

    for (let i = 0; i < puffCount; i++) {
      const d = puffData[i]!;
      const victim = [2, 3, 4, 5, 6][d.victim]!;
      const hitAt = impactTimes[d.victim]!;
      const age = time - hitAt;
      if (age < 0 || age > 8.4) {
        dummy.scale.setScalar(0);
        dummy.position.set(0, -9999, 0);
        dummy.updateMatrix();
        puffs.setMatrixAt(i, dummy.matrix);
        continue;
      }
      const head = figureHead(victim);
      const drag = 1 - Math.exp(-age * 0.72);
      const spread = drag * 3.2;
      dummy.position.set(
        head.x + d.dx + d.vx * spread,
        head.y + d.dy + d.vy * spread + age * 0.08,
        head.z + d.dz + d.vz * spread,
      );
      const initial = d.spark ? 0.75 : 1;
      const s = d.size * initial * (1 + age * 0.65) * (1 - smooth01(range(age, 4.8, 8.4)));
      dummy.scale.setScalar(Math.max(0.0001, s));
      dummy.rotation.set(age * 0.4 + i, age * 0.22, age * 0.3);
      dummy.updateMatrix();
      puffs.setMatrixAt(i, dummy.matrix);
      if (d.spark) {
        const t = Math.min(1, age / 2.7);
        puffColor.setRGB(0.58 - t * 0.48, 0.04 + t * 0.7, 0.035 + t * 0.68);
      } else {
        const t = Math.min(1, age / 1.4);
        puffColor.setRGB(0.2 + t * 0.67, 0.22 + t * 0.66, 0.23 + t * 0.63);
      }
      puffs.setColorAt(i, puffColor);
    }
    puffs.instanceMatrix.needsUpdate = true;
    if (puffs.instanceColor) puffs.instanceColor.needsUpdate = true;

    // Thruster plumes as Zhang turns away from the station.
    for (let i = 0; i < 2; i++) {
      const s = thrusters[i]!;
      s.visible = time > 265.5 && time < 280.5;
      if (s.visible) {
        s.position.set(
          0.05 + i * 0.12,
          2.3 + i * 0.08 + Math.sin(time * 3.1) * 0.05,
          zhang.root.position.z + 1.05 + Math.sin(time * 17 + i) * 0.05,
        );
        (s.material as THREE.SpriteMaterial).opacity = 0.22 + Math.sin(time * 19 + i) * 0.06;
        s.scale.setScalar(0.38 + (i === 0 ? 0.08 : 0.02));
      }
    }

    // Earth turns with the slow indifference of a planet.
    earth.rotation.y = time * 0.0015;
    sunMesh.rotation.y = time * 0.04;
    debris.rotation.y = Math.sin(time * 0.04) * 0.03;
    relic.rotation.y = time * 0.16;
    relic.rotation.x = Math.sin(time * 0.24) * 0.2;
    relic.position.y = 1.78 + Math.sin(time * 0.45) * 0.04;

    // A slow fade of the Earth's atmospheric halo as the light goes.
    (atmosphere.material as THREE.SpriteMaterial).opacity = 0.34 - sunSet * 0.08;
    sunLight.intensity = 3.1 - sunSet * 1.2;
    void vec;
  }

  function figureHead(index: number): THREE.Vector3 {
    const figure = cast.crew[index]!;
    return new THREE.Vector3(
      figure.root.position.x,
      figure.root.position.y + 1.63,
      figure.root.position.z,
    );
  }

  return {
    root,
    zhang,
    crew: cast.crew,
    targetIndices: cast.targetIndices,
    woundedIndices: cast.woundedIndices,
    station,
    earth,
    update,
  };
}
