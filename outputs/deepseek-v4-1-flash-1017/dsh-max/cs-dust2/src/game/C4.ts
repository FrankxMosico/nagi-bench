import * as THREE from 'three';
import type { BombStatus } from './types';
import { makeC4Texture } from './textures';

export class C4Prop {
  readonly group = new THREE.Group();
  readonly ledMaterial: THREE.MeshStandardMaterial;
  private readonly led: THREE.Mesh;

  constructor() {
    this.group.name = 'c4_prop';
    const bodyTex = makeC4Texture();
    const bodyMat = new THREE.MeshStandardMaterial({
      map: bodyTex,
      color: '#909079',
      roughness: 0.72,
      metalness: 0.18,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.28), bodyMat);
    body.position.y = 0.12;
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);

    const casingMat = new THREE.MeshStandardMaterial({
      color: '#3a4033',
      roughness: 0.7,
      metalness: 0.35,
    });
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.035, 0.31), casingMat);
      rail.position.set(0, 0.12 + side * 0.085, 0);
      this.group.add(rail);
    }
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 5, 8, Math.PI), casingMat);
    handle.position.set(0.1, 0.25, 0);
    handle.rotation.z = 0.1;
    this.group.add(handle);

    // Antenna / receiver.
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.22, 5),
      new THREE.MeshStandardMaterial({ color: '#1f221e', metalness: 0.7, roughness: 0.4 }),
    );
    antenna.position.set(-0.16, 0.32, 0.02);
    antenna.rotation.z = -0.25;
    this.group.add(antenna);

    this.ledMaterial = new THREE.MeshStandardMaterial({
      color: '#4a0b06',
      emissive: '#ff2c13',
      emissiveIntensity: 0,
      roughness: 0.25,
    });
    this.led = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.025), this.ledMaterial);
    this.led.position.set(0.13, 0.22, -0.147);
    this.group.add(this.led);

    const wireMat = new THREE.MeshStandardMaterial({ color: '#b3311f', roughness: 0.8 });
    const wireGeo = new THREE.TorusGeometry(0.12, 0.01, 4, 14, Math.PI * 1.3);
    const wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.set(-0.02, 0.22, -0.14);
    wire.rotation.set(Math.PI / 2, 0.2, 0.3);
    this.group.add(wire);
    const wire2 = new THREE.Mesh(wireGeo, wireMat);
    wire2.position.set(0.02, 0.24, -0.15);
    wire2.rotation.set(Math.PI / 2, -0.4, -0.3);
    this.group.add(wire2);

  }

  updateBlink(time: number, status: BombStatus, bombTimer: number): void {
    let intensity = 0;
    if (status === 'planted') {
      const interval = Math.max(0.16, Math.min(0.85, bombTimer / 40));
      const phase = (time % interval) / interval;
      intensity = phase < 0.35 ? 1 : 0;
      this.ledMaterial.emissiveIntensity = intensity * 3.2;
    } else if (status === 'dropped') {
      intensity = Math.sin(time * 2.5) > 0.4 ? 0.65 : 0.12;
      this.ledMaterial.emissiveIntensity = intensity;
    } else {
      this.ledMaterial.emissiveIntensity = 0.14;
    }
    this.led.visible = true;
  }

  dispose(): void {
    this.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial && mat.map) mat.map.dispose();
          mat.dispose();
        });
      }
    });
  }
}
