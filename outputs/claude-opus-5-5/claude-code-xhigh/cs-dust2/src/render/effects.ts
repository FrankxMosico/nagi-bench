import * as THREE from 'three';
import { createDecalTexture, createFlashTexture, createGlowTexture, createSmokeTexture } from './textures.ts';

interface Particle {
  sprite: THREE.Sprite;
  life: number;
  maxLife: number;
  vel: THREE.Vector3;
  grow: number;
  startScale: number;
  startOpacity: number;
  gravity: number;
}

interface Tracer {
  mesh: THREE.Mesh;
  life: number;
}

const UP = new THREE.Vector3(0, 1, 0);

/** Pooled transient effects: tracers, muzzle flashes, impact dust, blood, decals, explosions. */
export class Effects {
  readonly group = new THREE.Group();
  readonly flashTexture: THREE.Texture;
  private readonly glowTex: THREE.Texture;
  private readonly smokeTex: THREE.Texture;
  private readonly decalTex: THREE.Texture;
  private readonly particles: Particle[] = [];
  private readonly freeSprites: THREE.Sprite[] = [];
  private readonly tracers: Tracer[] = [];
  private readonly decals: THREE.Mesh[] = [];
  private decalIdx = 0;
  private readonly tracerGeo: THREE.CylinderGeometry;
  private readonly tracerMat: THREE.MeshBasicMaterial;
  private readonly decalGeo: THREE.PlaneGeometry;
  private readonly decalMat: THREE.MeshBasicMaterial;
  private readonly lights: { light: THREE.PointLight; life: number; max: number; peak: number }[] = [];

  constructor() {
    this.flashTexture = createFlashTexture();
    this.glowTex = createGlowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)');
    this.smokeTex = createSmokeTexture();
    this.decalTex = createDecalTexture();
    this.tracerGeo = new THREE.CylinderGeometry(0.008, 0.008, 1, 4, 1, true);
    this.tracerGeo.translate(0, 0.5, 0);
    this.tracerMat = new THREE.MeshBasicMaterial({ color: 0xffe2a0, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < 32; i++) {
      const mesh = new THREE.Mesh(this.tracerGeo, this.tracerMat.clone());
      mesh.visible = false;
      mesh.frustumCulled = false;
      this.group.add(mesh);
      this.tracers.push({ mesh, life: 0 });
    }
    this.decalGeo = new THREE.PlaneGeometry(0.11, 0.11);
    this.decalMat = new THREE.MeshBasicMaterial({
      map: this.decalTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    });
    for (let i = 0; i < 96; i++) {
      const d = new THREE.Mesh(this.decalGeo, this.decalMat);
      d.visible = false;
      this.group.add(d);
      this.decals.push(d);
    }
    // Fixed light pool (constant light count avoids shader recompiles).
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(0xffb060, 0, 9, 2);
      this.group.add(light);
      this.lights.push({ light, life: 0, max: 1, peak: 0 });
    }
  }

  private sprite(): THREE.Sprite {
    const s = this.freeSprites.pop();
    if (s) {
      s.visible = true;
      return s;
    }
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false }));
    this.group.add(sp);
    return sp;
  }

  private spawn(
    tex: THREE.Texture,
    color: number,
    pos: THREE.Vector3,
    vel: THREE.Vector3,
    scale: number,
    grow: number,
    life: number,
    opacity: number,
    additive: boolean,
    gravity = 0,
  ): void {
    if (this.particles.length > 220) return;
    const sp = this.sprite();
    const m = sp.material;
    m.map = tex;
    m.color.setHex(color);
    m.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
    m.opacity = opacity;
    m.rotation = Math.random() * Math.PI * 2;
    m.needsUpdate = true;
    sp.position.copy(pos);
    sp.scale.set(scale, scale, 1);
    this.particles.push({ sprite: sp, life: life, maxLife: life, vel: vel.clone(), grow, startScale: scale, startOpacity: opacity, gravity });
  }

  private flashLight(pos: THREE.Vector3, intensity: number, duration: number, color = 0xffb060): void {
    let slot = this.lights[0];
    for (const l of this.lights) if (l.life <= 0) {
      slot = l;
      break;
    }
    slot.light.position.copy(pos);
    slot.light.color.setHex(color);
    slot.life = duration;
    slot.max = duration;
    slot.peak = intensity;
    slot.light.intensity = intensity;
  }

  tracer(from: THREE.Vector3, to: THREE.Vector3): void {
    const t = this.tracers.find((x) => x.life <= 0) ?? this.tracers[0];
    const dir = to.clone().sub(from);
    const len = dir.length();
    if (len < 0.5) return;
    dir.normalize();
    // Visible streak segment that travels with the bullet.
    t.mesh.position.copy(from).addScaledVector(dir, Math.min(1.5, len * 0.1));
    t.mesh.quaternion.setFromUnitVectors(UP, dir);
    t.mesh.scale.set(1, Math.min(len * 0.85, 30), 1);
    t.mesh.visible = true;
    (t.mesh.material as THREE.MeshBasicMaterial).opacity = 0.75;
    t.life = 0.06;
  }

  muzzleFlash(pos: THREE.Vector3, big: boolean): void {
    this.spawn(this.flashTexture, 0xffd090, pos, new THREE.Vector3(), big ? 0.55 : 0.35, 1.5, 0.05, 1, true);
    this.flashLight(pos, big ? 10 : 6, 0.06);
  }

  impact(point: THREE.Vector3, normal: THREE.Vector3): void {
    for (let i = 0; i < 4; i++) {
      const v = normal.clone().multiplyScalar(0.6 + Math.random() * 0.9).add(new THREE.Vector3((Math.random() - 0.5) * 0.8, Math.random() * 0.6, (Math.random() - 0.5) * 0.8));
      this.spawn(this.smokeTex, 0xc9b28a, point.clone().addScaledVector(normal, 0.05), v, 0.12, 1.4, 0.45 + Math.random() * 0.3, 0.65, false, -0.4);
    }
    this.spawn(this.glowTex, 0xffd38a, point.clone().addScaledVector(normal, 0.03), new THREE.Vector3(), 0.12, 0, 0.05, 1, true);
    const d = this.decals[this.decalIdx++ % this.decals.length];
    d.position.copy(point).addScaledVector(normal, 0.012);
    d.lookAt(point.x + normal.x, point.y + normal.y, point.z + normal.z);
    d.rotation.z = Math.random() * Math.PI;
    d.visible = true;
  }

  blood(point: THREE.Vector3, dir: THREE.Vector3, heavy: boolean): void {
    const n = heavy ? 7 : 4;
    for (let i = 0; i < n; i++) {
      const v = dir.clone().multiplyScalar(1 + Math.random() * 1.5).add(new THREE.Vector3((Math.random() - 0.5) * 1.2, Math.random() * 1.0, (Math.random() - 0.5) * 1.2));
      this.spawn(this.smokeTex, 0x8a0c0c, point, v, 0.1 + Math.random() * 0.08, 1.2, 0.35 + Math.random() * 0.2, 0.9, false, 4);
    }
  }

  sparks(point: THREE.Vector3): void {
    for (let i = 0; i < 5; i++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 3, Math.random() * 2.5, (Math.random() - 0.5) * 3);
      this.spawn(this.glowTex, 0xffe0a0, point, v, 0.04, 0, 0.2, 1, true, 9);
    }
  }

  explosion(pos: THREE.Vector3): void {
    const center = pos.clone().add(new THREE.Vector3(0, 0.8, 0));
    this.spawn(this.glowTex, 0xffffff, center, new THREE.Vector3(), 3, 20, 0.25, 1, true);
    for (let i = 0; i < 14; i++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 9, Math.random() * 7, (Math.random() - 0.5) * 9);
      this.spawn(this.flashTexture, 0xff8a30, center, v, 2 + Math.random() * 2, 3, 0.5 + Math.random() * 0.4, 1, true, 3);
    }
    for (let i = 0; i < 22; i++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 6, 1 + Math.random() * 4, (Math.random() - 0.5) * 6);
      this.spawn(this.smokeTex, 0x3a332c, center, v, 2 + Math.random() * 2, 2.2, 2.5 + Math.random() * 2, 0.75, false, -0.3);
    }
    for (let i = 0; i < 24; i++) {
      const v = new THREE.Vector3((Math.random() - 0.5) * 22, Math.random() * 14, (Math.random() - 0.5) * 22);
      this.spawn(this.glowTex, 0xffd080, center, v, 0.15, 0, 0.8 + Math.random() * 0.6, 1, true, 12);
    }
    this.flashLight(center, 400, 0.9, 0xffa040);
  }

  update(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        p.sprite.visible = false;
        this.freeSprites.push(p.sprite);
        this.particles.splice(i, 1);
        continue;
      }
      const k = 1 - p.life / p.maxLife;
      p.vel.y -= p.gravity * dt;
      p.vel.multiplyScalar(Math.exp(-dt * 1.8));
      p.sprite.position.addScaledVector(p.vel, dt);
      const s = p.startScale * (1 + p.grow * k);
      p.sprite.scale.set(s, s, 1);
      p.sprite.material.opacity = p.startOpacity * (1 - k);
    }
    for (const t of this.tracers) {
      if (t.life <= 0) continue;
      t.life -= dt;
      if (t.life <= 0) t.mesh.visible = false;
      else (t.mesh.material as THREE.MeshBasicMaterial).opacity = 0.75 * (t.life / 0.06);
    }
    for (const l of this.lights) {
      if (l.life <= 0) continue;
      l.life -= dt;
      l.light.intensity = l.life > 0 ? l.peak * (l.life / l.max) : 0;
    }
  }

  clearDecals(): void {
    for (const d of this.decals) d.visible = false;
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof THREE.Sprite) o.material.dispose();
    });
    for (const t of this.tracers) (t.mesh.material as THREE.Material).dispose();
    this.tracerGeo.dispose();
    this.tracerMat.dispose();
    this.decalGeo.dispose();
    this.decalMat.dispose();
    this.flashTexture.dispose();
    this.glowTex.dispose();
    this.smokeTex.dispose();
    this.decalTex.dispose();
  }
}
