import * as THREE from "three";
import { applyPose, createFigure, lerpPose, type Figure, type Pose } from "@agentbench/voxel-kit";
import type { Cast } from "./cast";
import {
  box,
  concreteTexture,
  cylinderVoxelGeometry,
  glowBox,
  labelPlane,
  metalTexture,
  range,
  smooth01,
  surface,
  woodTexture,
} from "./visual";

export interface WorkshopSet {
  root: THREE.Group;
  zhang: Figure;
  update: (time: number) => void;
}

const FLOOR = concreteTexture("workshop-floor", "#30383b", "#202628", "#4a5050", [4, 4]);
const WALL = concreteTexture("workshop-wall", "#3b4243", "#2a3031", "#535a5a", [3, 2]);
const STEEL = metalTexture("workshop-steel", "#5d6668", "#3c4446", "#7c8585", [2, 2]);

function statusScreen(text: string, width: number, height: number): THREE.Mesh {
  const tex = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#081214";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1f5d5b";
    ctx.lineWidth = 4;
    ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
    ctx.fillStyle = "#9de5d4";
    ctx.font = '500 54px "Courier New", monospace';
    ctx.fillText(text, 44, 108);
    ctx.fillStyle = "#4ea699";
    ctx.font = '400 24px "Courier New", monospace';
    ctx.fillText("METEORITE / IRON-NICKEL", 44, 160);
    ctx.fillStyle = "#d5b268";
    ctx.font = '400 26px "Courier New", monospace';
    ctx.fillText("AXIS FEED   0.02 mm", 44, 200);
    ctx.fillStyle = "#2b7d74";
    ctx.fillRect(44, 214, 300, 6);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    return canvasTexture;
  })();
  const map = tex;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map, toneMapped: false }),
  );
  return mesh;
}

export function createWorkshop(cast: Cast): WorkshopSet {
  const root = new THREE.Group();
  root.name = "set:workshop";

  root.add(new THREE.AmbientLight(0x7d9297, 0.34));
  const hemi = new THREE.HemisphereLight(0x8eaeb9, 0x151a1b, 0.42);
  root.add(hemi);

  // Industrial shell.
  box(root, 13, 0.22, 10, 0x30383b, 0, -0.11, 0, { map: FLOOR, roughness: 0.9, receiveShadow: true });
  box(root, 13, 5.2, 0.28, 0x363e3f, 0, 2.6, -5.02, { map: WALL, roughness: 0.95 });
  box(root, 0.28, 5.2, 10.1, 0x31393b, -6.5, 2.6, 0, { map: WALL, roughness: 0.95 });
  box(root, 0.28, 5.2, 10.1, 0x31393b, 6.5, 2.6, 0, { map: WALL, roughness: 0.95 });
  box(root, 13, 0.2, 10.1, 0x252c2e, 0, 5.15, 0, { map: WALL, roughness: 0.95 });
  // Front wall, with a personnel door.
  box(root, 4.0, 5.2, 0.28, 0x313a3b, -4.5, 2.6, 5.02, { map: WALL, roughness: 0.95 });
  box(root, 6.8, 5.2, 0.28, 0x313a3b, 2.9, 2.6, 5.02, { map: WALL, roughness: 0.95 });
  box(root, 2.2, 1.8, 0.28, 0x313a3b, -1.3, 4.3, 5.02, { map: WALL, roughness: 0.95 });

  // High windows and night beyond.
  for (let i = 0; i < 3; i++) {
    const x = -3.9 + i * 3.9;
    box(root, 2.7, 1.4, 0.06, 0x1d2c37, x, 3.55, -4.84, { roughness: 0.2, metalness: 0.25 });
    for (let j = 0; j < 4; j++) box(root, 2.7, 0.025, 0.08, 0x66716e, x, 3.0 + j * 0.32, -4.8, { roughness: 0.4, metalness: 0.5 });
    const cityLight = new THREE.PointLight(0x567792, 7, 7, 1.8);
    cityLight.position.set(x, 3.3, -4.6);
    root.add(cityLight);
  }

  // Ceiling light bars.
  for (let i = 0; i < 3; i++) {
    const x = -3.5 + i * 3.5;
    box(root, 2.5, 0.12, 0.2, 0x78827f, x, 4.86, -0.8, { roughness: 0.4, metalness: 0.65 });
    glowBox(root, 2.24, 0.035, 0.12, 0xd4f0e9, x, 4.78, -0.8, 0.65);
    const light = new THREE.PointLight(0xbfe3dd, 48, 8.5, 1.55);
    light.position.set(x, 4.55, -0.3 + (i - 1) * 1.2);
    root.add(light);
  }

  // Painted safety lines on the floor.
  for (let i = 0; i < 2; i++) {
    box(root, 4.6, 0.008, 0.09, 0x9f7b35, -1.1, 0.006, 1.8 + i * 2.1, { roughness: 0.9 });
  }
  box(root, 0.09, 0.008, 3.8, 0x9f7b35, 2.9, 0.006, 1.2, { roughness: 0.9 });

  // CNC lathe: base, bed, headstock, tailstock, control cabinet.
  const lathe = new THREE.Group();
  lathe.position.set(-0.15, 0, -0.15);
  root.add(lathe);
  box(lathe, 3.3, 0.32, 1.0, 0x444e50, 0, 0.22, 0, { map: STEEL, roughness: 0.48, metalness: 0.55, castShadow: true });
  box(lathe, 3.0, 0.16, 0.52, 0x22292b, 0, 0.53, 0.02, { map: STEEL, roughness: 0.32, metalness: 0.72 });
  box(lathe, 0.8, 0.95, 0.7, 0x5a6465, -1.02, 0.92, 0, { map: STEEL, roughness: 0.46, metalness: 0.5, castShadow: true });
  box(lathe, 0.64, 0.44, 0.48, 0x343d3f, -1.02, 1.58, 0, { map: STEEL, roughness: 0.35, metalness: 0.62 });
  box(lathe, 0.36, 0.36, 0.36, 0x151a1b, 1.28, 0.86, 0, { roughness: 0.32, metalness: 0.75 });
  box(lathe, 0.18, 0.1, 0.18, 0x9a9f98, 1.47, 0.85, 0, { roughness: 0.3, metalness: 0.85 });
  box(lathe, 0.58, 1.55, 0.48, 0x394244, 1.82, 0.77, 0.26, { map: STEEL, roughness: 0.5, metalness: 0.45, castShadow: true });
  box(lathe, 0.5, 0.38, 0.04, 0x0d1517, 1.82, 1.23, 0.51, { roughness: 0.18, metalness: 0.2 });
  const screen = statusScreen("CNC / 07", 0.44, 0.3);
  screen.position.set(1.82, 1.24, 0.535);
  lathe.add(screen);
  for (let i = 0; i < 5; i++) glowBox(lathe, 0.045, 0.02, 0.02, i < 3 ? 0x65d7c2 : 0xd0a95a, 1.57 + i * 0.07, 0.63, 0.51, 0.8);
  // Work lamp.
  box(lathe, 0.06, 0.65, 0.06, 0x262c2d, -0.7, 1.55, 0.45, { roughness: 0.5, metalness: 0.6 });
  const workLamp = new THREE.PointLight(0xffd3a0, 22, 3.0, 1.5);
  workLamp.position.set(-0.7, 1.9, 0.4);
  lathe.add(workLamp);
  glowBox(lathe, 0.16, 0.09, 0.16, 0xffd09b, -0.7, 1.83, 0.4, 0.8);

  // Rotating chuck: block-built so it belongs to the same world as the figures.
  const chuck = new THREE.Group();
  chuck.position.set(-0.62, 1.06, 0);
  lathe.add(chuck);
  box(chuck, 0.12, 0.3, 0.3, 0x868b84, 0, 0, 0, { roughness: 0.3, metalness: 0.8 });
  for (let i = 0; i < 3; i++) {
    const jaw = box(chuck, 0.18, 0.09, 0.1, 0x282f31, 0.04, Math.cos((i / 3) * Math.PI * 2) * 0.13, Math.sin((i / 3) * Math.PI * 2) * 0.13, { roughness: 0.35, metalness: 0.75 });
    jaw.rotation.x = (i / 3) * Math.PI * 2;
  }
  const workingStone = new THREE.Mesh(cylinderVoxelGeometry(3, 14, 0x4e463a), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.44, metalness: 0.7 }));
  workingStone.scale.set(0.012, 0.012, 0.012);
  workingStone.rotation.z = Math.PI / 2;
  workingStone.position.set(0.3, 0, 0);
  lathe.add(workingStone);

  // Tool board and bench at the side.
  box(root, 2.4, 1.8, 0.1, 0x2a3132, -4.8, 2.6, -4.75, { map: STEEL, roughness: 0.62, metalness: 0.3 });
  for (let i = 0; i < 9; i++) {
    const x = -5.75 + (i % 5) * 0.46;
    const y = 2.05 + Math.floor(i / 5) * 0.5;
    box(root, 0.07, 0.28 + (i % 3) * 0.08, 0.05, 0x747a72, x, y, -4.64, { roughness: 0.4, metalness: 0.7 });
  }
  box(root, 2.8, 0.08, 0.9, 0x41494a, -4.7, 0.9, -3.85, { map: STEEL, roughness: 0.5, metalness: 0.4, castShadow: true });
  box(root, 2.8, 0.76, 0.85, 0x343b3d, -4.7, 0.47, -3.85, { map: STEEL, roughness: 0.7, metalness: 0.35 });

  // The 36 finished cylinders.
  const tray = new THREE.Group();
  tray.position.set(-3.7, 0.95, -3.82);
  root.add(tray);
  box(tray, 0.9, 0.035, 0.9, 0x2b3030, 0, 0, 0, { roughness: 0.3, metalness: 0.65 });
  box(tray, 0.98, 0.06, 0.08, 0x6f7671, 0, 0.02, -0.47, { roughness: 0.4, metalness: 0.6 });
  box(tray, 0.98, 0.06, 0.08, 0x6f7671, 0, 0.02, 0.47, { roughness: 0.4, metalness: 0.6 });
  const cylGeo = cylinderVoxelGeometry(3, 12, 0x4c4438);
  const cylMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.78 });
  for (let i = 0; i < 36; i++) {
    const m = new THREE.Mesh(cylGeo, cylMat);
    m.scale.set(0.01, 0.01, 0.01);
    m.rotation.z = Math.PI / 2;
    m.rotation.y = 0.08 * ((i % 3) - 1);
    m.position.set(
      -0.34 + (i % 6) * 0.136,
      0.035,
      -0.34 + Math.floor(i / 6) * 0.136,
    );
    tray.add(m);
  }

  // A labeled rack, to make the room feel like a working institution.
  const sign = labelPlane("太空军 · 精密加工", 2.6, 0.32, {
    width: 1024,
    height: 128,
    background: "#1a2021",
    color: "#b8c8c1",
    font: '500 46px "Noto Sans CJK SC", sans-serif',
    align: "left",
    padding: 34,
  });
  sign.position.set(3.9, 3.05, -4.86);
  root.add(sign);

  // The figure, built from the shared kit and dressed in his uniform.
  const zhang = createFigure({ body: cast.zhangBody.texture, clothes: cast.zhangUniform.texture, heightM: 1.84 });
  zhang.root.position.set(3.35, 0, 4.05);
  zhang.root.rotation.y = Math.PI;
  root.add(zhang.root);

  // Sparks at the cutting point.
  const sparkCount = 90;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
  const sparkSeeds = Array.from({ length: sparkCount }, (_, i) => ({
    a: (i * 2.399) % (Math.PI * 2),
    r: 0.2 + ((i * 37) % 100) / 180,
    up: 0.2 + ((i * 53) % 100) / 80,
    phase: ((i * 0.173) % 1),
  }));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      color: 0xffc26a,
      size: 0.026,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  sparks.visible = false;
  root.add(sparks);

  function update(time: number): void {
    // Entrance: the room is already awake before he arrives.
    const enter = smooth01(range(time, 112.4, 115.4));
    zhang.root.position.set(
      3.35 + (1.72 - 3.35) * enter,
      0,
      4.05 + (0.94 - 4.05) * enter,
    );
    zhang.root.rotation.y = Math.PI;

    const work = smooth01(range(time, 118.0, 120.4)) * (1 - smooth01(range(time, 133.0, 136.0)));
    const walking = time > 112.4 && time < 115.4;
    let pose: Pose;
    if (walking) {
      const phase = time * 6.8;
      pose = {
        hips: [0, Math.sin(phase) * 0.04, 0],
        neck: [-0.05, 0, 0],
        armR: [Math.sin(phase) * 0.56, 0, 0.07],
        armL: [-Math.sin(phase) * 0.56, 0, -0.07],
        legR: [-Math.sin(phase) * 0.56, 0, 0],
        legL: [Math.sin(phase) * 0.56, 0, 0],
        lift: Math.abs(Math.cos(phase)) * 0.25 - 0.15,
      };
    } else {
      const breath = Math.sin(time * 1.5);
      const adjust = Math.exp(-Math.pow((time - 124.7) / 1.2, 2)) + Math.exp(-Math.pow((time - 128.4) / 1.1, 2)) * 0.8;
      pose = {
        hips: [0.02, 0.02, 0],
        neck: [0.06, -0.08, 0],
        armR: [-0.58 - work * 0.5 + adjust * 0.12, 0.13, 0.08],
        armL: [-0.34 - work * 0.28, -0.1, -0.16],
        legR: [0.02, 0, 0.01],
        legL: [-0.02, 0, -0.01],
        lift: breath * 0.06,
      };
    }
    applyPose(zhang, pose);

    // The lathe spins, pauses, spins again.
    const spinning = time > 120.0 && time < 131.6;
    if (spinning) chuck.rotation.x = (time - 120.0) * 15.5;
    workingStone.visible = time > 120.0 && time < 131.8;
    if (spinning) {
      const vibration = Math.sin(time * 43) * 0.0015;
      lathe.position.x = -0.15 + vibration;
    } else {
      lathe.position.x = -0.15;
    }

    // Sparks stream from the contact point, deterministic for seeking.
    sparks.visible = spinning && time > 121.5;
    if (sparks.visible) {
      const positions = sparkGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sparkCount; i++) {
        const s = sparkSeeds[i]!;
        const age = (time * 1.7 + s.phase) % 1;
        const radius = s.r * age * 1.4;
        positions.setXYZ(
          i,
          -0.25 + Math.cos(s.a) * radius,
          1.03 + s.up * age * 0.6 - age * age * 0.8,
          0.1 + Math.sin(s.a) * radius,
        );
      }
      positions.needsUpdate = true;
    }

    workLamp.intensity = spinning ? 19 + Math.sin(time * 11) * 3 : 7;
    void lerpPose;
    void surface;
    void woodTexture;
  }

  return { root, zhang, update };
}
