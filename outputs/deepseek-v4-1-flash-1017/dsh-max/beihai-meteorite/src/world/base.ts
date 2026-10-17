import * as THREE from "three";
import { voxelSphere } from "@agentbench/voxel-kit";
import {
  addBatchedBoxes,
  addBox,
  addPlane,
  canvasTexture,
  clamp01,
  concreteTexture,
  createStarfield,
  glowTexture,
  makeGlowSprite,
  makeMistSprite,
  makeTickerTexture,
  mulberry32,
  smooth,
  TAU,
} from "../lib/helpers";
import { createMeteoriteMesh, createZhang, type ZhangActor } from "../lib/characters";

export interface BaseWorld {
  group: THREE.Group;
  zhang: ZhangActor;
  update: (time: number, localTime: number) => void;
  screenLight: THREE.PointLight;
}

function lowResEarth(): THREE.Mesh {
  const span = 72;
  const radius = 34;
  const ocean = [0x0a263d, 0x10364f, 0x174a63, 0x0b2c45];
  const land = [0x3e5b42, 0x726244, 0x8a7751, 0x2f5045];
  const ice = [0xd2dfdc, 0xb5c9c8];
  const geometry = voxelSphere(
    radius,
    (x, y, z, ratio) => {
      const nx = (x + 0.5 - span / 2) / radius;
      const ny = (y + 0.5 - span / 2) / radius;
      const nz = (z + 0.5 - span / 2) / radius;
      if (Math.abs(ny) > 0.88) return ice[Math.abs(x + z) % ice.length]!;
      const h = Math.sin(nx * 5.1 + 1.2) * Math.cos(nz * 4.2 - 0.8) + Math.sin(nx * nz * 9.3) * 0.3;
      if (h > 0.17) return land[Math.abs((x * 3 + z * 5) % land.length)]!;
      if (ratio > 0.99) return 0x6c9fa9;
      return ocean[Math.abs((x * 5 + z * 7) % ocean.length)]!;
    },
    { voxel: 0.42, anchor: "center" },
  );
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0,
      emissive: 0x08202d,
      emissiveIntensity: 0.8,
    }),
  );
  mesh.position.set(-9.2, -14.0, -32);
  mesh.rotation.z = 0.22;
  return mesh;
}

export function createBaseWorld(): BaseWorld {
  const group = new THREE.Group();
  group.name = "first-base";
  group.visible = false;

  const wall = new THREE.MeshStandardMaterial({
    map: concreteTexture([2, 2]),
    color: 0x495a5e,
    roughness: 0.8,
    metalness: 0.1,
  });
  const floorMat = new THREE.MeshStandardMaterial({
    map: concreteTexture([3, 3]),
    color: 0x303b3d,
    roughness: 0.7,
    metalness: 0.2,
  });
  const trim = new THREE.MeshStandardMaterial({ color: 0x202c2e, roughness: 0.55, metalness: 0.5 });
  const pale = new THREE.MeshStandardMaterial({ color: 0x7b8783, roughness: 0.65, metalness: 0.25 });

  addBox(group, [6.0, 0.2, 6.3], [0, -0.1, 0.3], floorMat, { castShadow: false });
  addBox(group, [6.0, 0.2, 6.3], [0, 3.05, 0.3], trim, { castShadow: false });
  addBox(group, [6.0, 3.1, 0.22], [0, 1.55, -2.85], wall);
  addBox(group, [0.22, 3.0, 6.3], [-3.0, 1.5, 0.3], wall);
  addBox(group, [0.22, 3.0, 6.3], [3.0, 1.5, 0.3], wall);
  addBox(group, [6.0, 3.1, 0.22], [0, 1.55, 3.55], wall);

  // A rectangular window cut into the back wall.
  const windowX = -0.72;
  addBox(group, [1.2, 2.7, 0.24], [-2.4, 1.35, -2.85], wall);
  addBox(group, [2.7, 2.7, 0.24], [2.35, 1.35, -2.85], wall);
  addBox(group, [1.9, 0.66, 0.24], [-0.72, 2.72, -2.85], wall);
  addBox(group, [1.9, 0.58, 0.24], [-0.72, 0.55, -2.85], wall);
  addBox(group, [2.2, 0.16, 0.4], [-0.72, 1.15, -2.7], pale);
  addBox(group, [2.2, 0.16, 0.4], [-0.72, 2.38, -2.7], pale);
  addBox(group, [0.16, 1.4, 0.4], [-1.72, 1.78, -2.7], pale);
  addBox(group, [0.16, 1.4, 0.4], [0.28, 1.78, -2.7], pale);
  const windowView = canvasTexture(256, 160, (ctx) => {
    ctx.fillStyle = "#010307";
    ctx.fillRect(0, 0, 256, 160);
    const rng = mulberry32(1803);
    for (let i = 0; i < 55; i++) {
      const b = 0.3 + rng() * 0.7;
      ctx.fillStyle = `rgba(${Math.floor(180 + b * 60)},${Math.floor(205 + b * 40)},255,${0.35 + rng() * 0.65})`;
      const size = rng() > 0.9 ? 2 : 1;
      ctx.fillRect(Math.floor(rng() * 256), Math.floor(rng() * 102), size, size);
    }
    // A blocky Earth limb fills the lower part of the window.
    const cx = 132;
    const cy = 236;
    const radius = 166;
    const colors = ["#0a273b", "#0e344b", "#15445d", "#0b2d44", "#1b5166"];
    for (let y = 0; y < 160; y += 6) {
      for (let x = 0; x < 256; x += 6) {
        const dx = x + 3 - cx;
        const dy = y + 3 - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > radius) continue;
        const band = Math.sin(x * 0.042 + y * 0.03) + Math.cos(x * 0.021 - y * 0.046);
        let col = colors[Math.abs((x + y * 3) % colors.length)]!;
        if (band > 1.18 && d < radius - 16) col = "#48654e";
        else if (band > 1.35 && d < radius - 20) col = "#806d4b";
        if (d > radius - 14) col = "#9fd6df";
        if (band > 0.6 && d > radius - 26) col = "#86b7bd";
        ctx.fillStyle = col;
        ctx.fillRect(x, y, 6, 6);
      }
    }
    const glow = ctx.createLinearGradient(0, 48, 0, 105);
    glow.addColorStop(0, "rgba(90,162,190,0)");
    glow.addColorStop(0.7, "rgba(112,194,214,.28)");
    glow.addColorStop(1, "rgba(231,205,159,.6)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 48, 256, 62);
    // The faint sun glint at the horizon.
    ctx.fillStyle = "rgba(255,229,182,.85)";
    ctx.fillRect(222, 74, 5, 5);
    ctx.fillStyle = "rgba(255,202,112,.16)";
    ctx.fillRect(214, 70, 20, 20);
  }, { nearest: true, anisotropy: 4 });
  const windowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(2.12, 1.33),
    new THREE.MeshBasicMaterial({ map: windowView, toneMapped: false }),
  );
  windowPlane.position.set(-0.72, 1.77, -2.71);
  group.add(windowPlane);
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 1.18),
    new THREE.MeshPhysicalMaterial({
      color: 0xaacdd8,
      transparent: true,
      opacity: 0.1,
      roughness: 0.04,
      metalness: 0.1,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  glass.position.set(windowX, 1.77, -2.69);
  group.add(glass);

  // Bed, desk, lockers and domestic marks: he is back, but not home.
  addBox(group, [2.0, 0.34, 0.9], [-1.9, 0.28, 2.55], trim);
  addBox(group, [1.9, 0.1, 0.82], [-1.9, 0.48, 2.55], new THREE.MeshStandardMaterial({ color: 0x5a625b, roughness: 0.95 }));
  addBox(group, [0.4, 0.22, 0.35], [-2.4, 0.62, 2.4], pale);
  addBox(group, [1.45, 0.08, 0.75], [1.65, 0.84, 1.85], pale);
  for (const [x, z] of [[1.0, 1.55], [2.3, 1.55], [1.0, 2.15], [2.3, 2.15]] as Array<[number, number]>) {
    addBox(group, [0.06, 0.8, 0.06], [x, 0.42, z], trim);
  }
  addBox(group, [0.65, 1.9, 0.66], [2.45, 0.95, 2.85], trim);
  addBox(group, [0.5, 0.04, 0.06], [2.45, 1.32, 2.5], pale, { castShadow: false });

  // A small evidence case on the desk, open.
  addBox(group, [0.5, 0.09, 0.34], [1.55, 0.91, 1.78], new THREE.MeshStandardMaterial({ color: 0x1a1e1e, metalness: 0.4, roughness: 0.5 }), {
    castShadow: false,
  });
  addBox(group, [0.42, 0.03, 0.26], [1.55, 0.97, 1.78], new THREE.MeshStandardMaterial({ color: 0x3d433a, roughness: 0.8 }), {
    castShadow: false,
  });
  const evidence = createMeteoriteMesh(2, 812, true);
  evidence.scale.setScalar(0.38);
  evidence.position.set(1.48, 1.03, 1.79);
  group.add(evidence);
  const brassCase = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 0.09, 0.025),
    new THREE.MeshStandardMaterial({ color: 0x7a633c, metalness: 0.65, roughness: 0.35 }),
  );
  brassCase.position.set(1.65, 1.02, 1.75);
  brassCase.rotation.z = 0.7;
  group.add(brassCase);

  // Wall display: the public version of what happened.
  const ticker = makeTickerTexture([
    "黄河站遭遇微陨石雨",
    "五名宇航员遇难",
    "无工质推进项目重新论证",
    "事故原因调查中",
  ]);
  addBox(group, [1.88, 1.55, 0.22], [1.96, 1.8, -2.7], trim);
  const screen = addPlane(
    group,
    [1.62, 1.29],
    [1.96, 1.82, -2.57],
    new THREE.MeshBasicMaterial({ map: ticker, toneMapped: false }),
  );
  screen.name = "news-screen";
  const screenLight = new THREE.PointLight(0x8abfc4, 3.8, 5.2, 2);
  screenLight.position.set(1.6, 1.7, -1.5);
  group.add(screenLight);
  // A narrow recessed LED strip above the screen.
  addBox(group, [1.7, 0.025, 0.05], [1.96, 2.52, -2.5], new THREE.MeshBasicMaterial({ color: 0x89bab4, toneMapped: false }), {
    castShadow: false,
  });

  // Room ribs and a service hatch.
  for (const z of [-1.8, 0.3, 2.45]) {
    addBox(group, [6.0, 0.12, 0.12], [0, 2.82, z], pale, { castShadow: false });
    addBox(group, [0.12, 0.12, 6.0], [-1.4, 2.84, 0.3], pale, { castShadow: false });
  }
  addBox(group, [0.65, 1.15, 0.1], [2.18, 1.62, 3.42], trim);
  addBox(group, [0.5, 0.04, 0.04], [2.18, 1.55, 3.36], pale, { castShadow: false });
  addBox(group, [0.18, 0.18, 0.08], [1.74, 1.77, -2.52], new THREE.MeshBasicMaterial({ color: 0x6f9990, toneMapped: false }), {
    castShadow: false,
  });

  // A single practical lamp, deliberately too warm for the rest of the room.
  const lamp = new THREE.Group();
  lamp.position.set(1.9, 1.62, 2.2);
  group.add(lamp);
  addBox(lamp, [0.08, 0.7, 0.08], [0, 0.2, 0], trim);
  addBox(lamp, [0.34, 0.2, 0.22], [0, 0.55, 0.02], new THREE.MeshStandardMaterial({ color: 0x2f3a36, metalness: 0.35, roughness: 0.5 }), {
    rotation: [0, 0, 0.15],
  });
  addBox(lamp, [0.24, 0.02, 0.16], [0, 0.45, 0.02], new THREE.MeshBasicMaterial({ color: 0xffc681, toneMapped: false }), {
    castShadow: false,
  });
  const lampLight = new THREE.PointLight(0xffc27b, 2.6, 3.4, 2);
  lampLight.position.set(0, 0.38, 0);
  lamp.add(lampLight);

  // Window view: stars and a small Earth beyond the glass.
  const stars = createStarfield(700, 26, 92, 991, 0xc9d9df, 0x9eb8c3);
  stars.position.z = -8;
  group.add(stars);
  const earth = lowResEarth();
  group.add(earth);
  const earthGlow = makeGlowSprite(0x6ea7c3, 42, 0.18);
  earthGlow.position.set(-9.2, -1.0, -31);
  group.add(earthGlow);
  const sunGlow = makeGlowSprite(0xffdca4, 18, 0.18);
  sunGlow.position.set(13, 7, -55);
  group.add(sunGlow);
  const mist = makeMistSprite(3.0, 0.035);
  mist.position.set(-0.9, 1.8, -1.8);
  group.add(mist);

  // Lighting: cold instrument glow from an unseen ceiling, warm desk lamp,
  // and the reflected blue of Earth through the window.
  const hemi = new THREE.HemisphereLight(0x96b2b7, 0x2a2f28, 0.92);
  group.add(hemi);
  const key = new THREE.SpotLight(0xd2e2de, 104, 9, 0.95, 0.82, 2);
  key.position.set(-2.0, 3.0, 1.8);
  key.target.position.set(-0.8, 1.1, -0.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0014;
  group.add(key, key.target);
  const windowLight = new THREE.PointLight(0x6399ad, 6.5, 6, 2);
  windowLight.position.set(-0.7, 1.8, -2.2);
  group.add(windowLight);
  const rim = new THREE.DirectionalLight(0x93bec9, 0.62);
  rim.position.set(4, 2, -3);
  group.add(rim);
  const faceFill = new THREE.PointLight(0xffd9ad, 7.0, 4.6, 2);
  faceFill.position.set(1.2, 1.75, 0.85);
  group.add(faceFill);
  const earthFill = new THREE.DirectionalLight(0x5a8aa0, 0.55);
  earthFill.position.set(-2, -3, -8);
  earthFill.target.position.set(-0.3, 1.2, 0);
  group.add(earthFill, earthFill.target);

  // Dust and a faint reflection on the glass.
  const dustGeo = new THREE.BufferGeometry();
  const dust: number[] = [];
  const rng = mulberry32(773);
  for (let i = 0; i < 80; i++) dust.push(-2.8 + rng() * 5.6, 0.2 + rng() * 2.6, -2.5 + rng() * 5.2);
  dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dust, 3));
  const dustPoints = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xc8d8d2, size: 0.02, transparent: true, opacity: 0.16, depthWrite: false }),
  );
  group.add(dustPoints);

  // Zhang, out of his suit, and the only warm-blooded thing in the frame.
  const zhang = createZhang();
  zhang.setUniform();
  zhang.figure.root.position.set(-0.35, 0, -0.1);
  zhang.figure.root.rotation.y = Math.PI;
  group.add(zhang.figure.root);

  let local = 0;
  const update = (time: number, localTime: number): void => {
    local = localTime;
    const flicker = 0.97 + Math.sin(time * 1.3) * 0.015 + Math.sin(time * 17.3) * 0.004;
    screenLight.intensity = 3.6 * flicker;
    lampLight.intensity = 2.6 * (0.98 + Math.sin(time * 0.7) * 0.02);
    mist.position.x = -0.9 + Math.sin(time * 0.1) * 0.1;
    dustPoints.position.y = Math.sin(time * 0.07) * 0.05;
    earth.rotation.z = 0.22 + Math.sin(time * 0.01) * 0.01;
    // He turns from the window to face us only at the end.
    const turn = smooth(clamp01((time - 339.8) / 2.4));
    zhang.figure.root.rotation.y = Math.PI * (1 - turn);
  };

  update(337, 0);
  return { group, zhang, update, screenLight };
}
