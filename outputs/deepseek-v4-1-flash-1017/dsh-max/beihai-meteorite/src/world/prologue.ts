import * as THREE from "three";
import { voxelSphere } from "@agentbench/voxel-kit";
import {
  addBox,
  addBatchedBoxes,
  canvasTexture,
  createStarfield,
  glowTexture,
  makeGlowSprite,
  makeMistSprite,
  mulberry32,
  TAU,
} from "../lib/helpers";
import { createMeteoriteMesh } from "../lib/characters";

export interface PrologueWorld {
  group: THREE.Group;
  update: (time: number, localTime: number) => void;
}

function makeStreak(seed: number): THREE.Group {
  const rng = mulberry32(seed);
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({
    color: 0xffddb0,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const core = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 1.9 + rng() * 1.3), material);
  core.rotation.z = -0.2;
  group.add(core);
  for (let i = 0; i < 3; i++) {
    const side = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.01, 0.8 + rng() * 0.7),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x9cc3cf : 0xffc88b,
        transparent: true,
        opacity: 0.18 + rng() * 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    side.position.set((rng() - 0.5) * 0.04, (rng() - 0.5) * 0.04, -0.3 - i * 0.18);
    side.rotation.z = -0.2;
    group.add(side);
  }
  const tip = makeGlowSprite(0xffe4b4, 0.16, 0.8);
  tip.position.z = 0.9;
  group.add(tip);
  group.visible = false;
  return group;
}

export function createPrologueWorld(): PrologueWorld {
  const group = new THREE.Group();
  group.name = "prologue";
  group.visible = true;

  group.add(createStarfield(980, 50, 150, 4, 0xcbdbe7, 0x91aeba));
  const dustLayer = createStarfield(260, 4, 18, 47, 0x7c99a8, 0xdbcfae);
  (dustLayer.material as THREE.PointsMaterial).size = 0.7;
  group.add(dustLayer);

  // The earth, small enough to remind us that every world can be held in one hand.
  const earth = new THREE.Mesh(
    voxelSphere(
      34,
      (x, y, z, ratio) => {
        const nx = (x - 34) / 34;
        const ny = (y - 34) / 34;
        const nz = (z - 34) / 34;
        if (Math.abs(ny) > 0.88) return 0xb6c9c9;
        const h = Math.sin(nx * 5.3 + 1) * Math.cos(nz * 4.4 + 2) + Math.sin(nx * nz * 12);
        if (h > 0.18) return 0x415c45;
        if (h > 0.4) return 0x796342;
        if (ratio > 0.99) return 0x5f97aa;
        return 0x0e334b;
      },
      { voxel: 0.34, anchor: "center" },
    ),
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0,
      emissive: 0x071924,
      emissiveIntensity: 0.6,
    }),
  );
  earth.position.set(13, -24, -76);
  earth.rotation.z = 0.3;
  group.add(earth);
  const earthHalo = makeGlowSprite(0x66a0ba, 45, 0.2);
  earthHalo.position.set(12, -12, -72);
  group.add(earthHalo);

  // A single stone, close enough to see its contradictions.
  const stone = createMeteoriteMesh(18, 42, true);
  stone.position.set(-0.1, 0.05, -1.55);
  stone.rotation.set(0.2, 0.7, -0.25);
  stone.scale.setScalar(1.05);
  group.add(stone);
  group.add(makeMistSprite(2.4, 0.025));

  const rimGroup = new THREE.Group();
  group.add(rimGroup);
  const warm = new THREE.PointLight(0xffbc78, 6.5, 9, 2);
  warm.position.set(1.8, 2.4, 1.0);
  rimGroup.add(warm);
  const cold = new THREE.PointLight(0x5a93bc, 2.4, 7, 2);
  cold.position.set(-2.4, -2.0, 0.8);
  rimGroup.add(cold);
  const sunDirectional = new THREE.DirectionalLight(0xffd39c, 1.1);
  sunDirectional.position.set(2, 4, 5);
  group.add(sunDirectional);
  group.add(new THREE.AmbientLight(0x121b21, 0.8));

  const streaks = [makeStreak(31), makeStreak(72), makeStreak(105)];
  streaks[0].position.set(-13, 7, -36);
  streaks[1].position.set(9, 13, -48);
  streaks[2].position.set(16, -2, -44);
  streaks.forEach((s) => group.add(s));

  const emberGeo = new THREE.BufferGeometry();
  const positions: number[] = [];
  const rng = mulberry32(515);
  for (let i = 0; i < 52; i++) positions.push((rng() - 0.5) * 3, (rng() - 0.5) * 2, -1 + rng() * 2);
  emberGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const embers = new THREE.Points(
    emberGeo,
    new THREE.PointsMaterial({
      color: 0xffc889,
      size: 0.015,
      map: glowTexture("rgba(255,226,172,1)", "rgba(214,136,65,.3)"),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(embers);

  const update = (time: number, localTime: number): void => {
    stone.rotation.y = 0.7 + localTime * 0.075;
    stone.rotation.x = 0.2 + Math.sin(localTime * 0.21) * 0.08;
    stone.rotation.z = -0.25 + Math.sin(localTime * 0.13) * 0.04;
    stone.position.y = 0.05 + Math.sin(localTime * 0.4) * 0.012;
    embers.rotation.y = time * 0.02;
    warm.intensity = 6.5 + Math.sin(time * 2.3) * 0.1;
    earth.rotation.y = 0.1 + time * 0.001;
    streaks.forEach((streak, i) => {
      const start = 6.8 + i * 1.4;
      const p = (localTime - start) / 2.2;
      streak.visible = p > 0 && p < 1;
      if (streak.visible) {
        streak.position.x = -13 + p * (25 + i * 8) + i * 10 - 2;
        streak.position.y = 7 - p * (9 + i * 2);
        const material = (streak.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = 0.6 * Math.sin(Math.PI * p);
      }
    });
    dustLayer.rotation.z = time * 0.002;
  };
  update(0, 0);

  return { group, update };
}
