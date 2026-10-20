import "./shim";
import * as THREE from "three";
import { writeFileSync, mkdirSync } from "node:fs";
import { encodePNG, contactSheet } from "./png";
import { CinematicPlayer } from "@agentbench/cinematic-player";
import { buildFilm } from "../src/world/index";
import { resetFrame } from "../src/world/context";
import { fxUniforms } from "../src/world/fx";
import { DURATION } from "../src/timeline";
import { Raster } from "./raster";

/**
 * Offline frame preview:  bun tools/preview.ts --t 250,260.5 --w 720 --out $TMPDIR/prev [--sheet name]
 * Renders the real scene graph at the requested absolute times with the CPU
 * rasteriser and writes PNGs (and optionally a labelled contact sheet).
 */

const args = process.argv.slice(2);
const get = (k: string, d?: string) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1]! : d;
};
const W = Number(get("w", "720"));
const H = Math.round(W / 2.39);
const outDir = get("out", ".preview")!;
const times = (get("t", "200") as string).split(",").map(Number);
const sheet = get("sheet");
mkdirSync(outDir, { recursive: true });

const t0 = performance.now();
const film = buildFilm();
console.log(`built world in ${((performance.now() - t0) / 1000).toFixed(2)}s`);
const { ctx } = film;
ctx.camera.aspect = W / H;
ctx.camera.updateProjectionMatrix();
const player = new CinematicPlayer({ duration: DURATION, context: ctx, shots: film.shots });
const backCam = new THREE.PerspectiveCamera();

const files: string[] = [];
const frames: Array<{ rgb: Uint8Array; label: string }> = [];
for (const t of times) {
  const s0 = performance.now();
  resetFrame(ctx);
  ctx.scene = film.black;
  ctx.backdrop = null;
  player.seek(t);
  // the shots may have changed fov: keep aspect correct
  ctx.camera.aspect = W / H;
  ctx.camera.updateProjectionMatrix();
  const r = new Raster(W, H);
  r.perPixel = args.includes("--pp");
  r.starScale = Math.max(1, H / 540);
  r.uScale = H / (2 * Math.tan(THREE.MathUtils.degToRad(ctx.camera.fov) / 2));
  fxUniforms.uScale.value = r.uScale;
  const bgv = ctx.scene.background as THREE.Color | THREE.Texture | null;
  if (bgv && (bgv as THREE.Texture).isTexture) {
    // screen-space gradient background (sky texture)
    const img = (bgv as THREE.Texture).image as { width: number; height: number; data: Uint8ClampedArray };
    r.clear(0, 0, 0);
    for (let y = 0; y < H; y++) {
      const ty = Math.min(img.height - 1, Math.floor((y / H) * img.height));
      const i = ty * img.width * 4;
      const c = new THREE.Color().setRGB(img.data[i]! / 255, img.data[i + 1]! / 255, img.data[i + 2]! / 255, THREE.SRGBColorSpace);
      for (let x = 0; x < W; x++) {
        r.color[(y * W + x) * 3] = c.r;
        r.color[(y * W + x) * 3 + 1] = c.g;
        r.color[(y * W + x) * 3 + 2] = c.b;
      }
    }
  } else {
    const bg = (bgv as THREE.Color | null) ?? new THREE.Color(0, 0, 0);
    r.clear(bg.r, bg.g, bg.b);
  }
  if (ctx.backdrop) {
    backCam.fov = ctx.camera.fov;
    backCam.aspect = W / H;
    backCam.near = 1;
    backCam.far = 20000;
    backCam.position.set(0, 0, 0);
    backCam.quaternion.copy(ctx.camera.getWorldQuaternion(new THREE.Quaternion()));
    backCam.updateProjectionMatrix();
    backCam.updateMatrixWorld(true);
    r.render(ctx.backdrop, backCam);
    r.clearDepth();
  }
  r.render(ctx.scene, ctx.camera);
  const rgb = r.toRGB8(ctx.grade.toneExposure);
  post(rgb, W, H);
  const base = `${outDir}/f_${t.toFixed(2).padStart(7, "0")}`;
  writeFileSync(`${base}.png`, encodePNG(rgb, W, H));
  files.push(`${base}.png`);
  frames.push({ rgb, label: t.toFixed(1) });
  const cap = ctx.overlay.caption && ctx.overlay.captionOpacity > 0.05 ? ` caption="${ctx.overlay.caption}"` : "";
  console.log(`t=${t} -> ${base}.png (${((performance.now() - s0) / 1000).toFixed(2)}s)${cap}${ctx.overlay.title ? ` title="${ctx.overlay.title}"` : ""}`);
}

if (sheet && frames.length > 1) {
  const cols = Number(get("cols", "3"));
  const cs = contactSheet(frames, W, H, cols);
  writeFileSync(`${outDir}/${sheet}.png`, encodePNG(cs.rgb, cs.w, cs.h));
  console.log(`sheet -> ${outDir}/${sheet}.png`);
}

function post(rgb: Uint8Array, w: number, h: number): void {
  const g = ctx.grade;
  const aspect = w / h;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      let r = rgb[i]! / 255;
      let gg = rgb[i + 1]! / 255;
      let b = rgb[i + 2]! / 255;
      r *= g.exposure;
      gg *= g.exposure;
      b *= g.exposure;
      const l = 0.2126 * r + 0.7152 * gg + 0.0722 * b;
      r = l + (r - l) * g.saturation;
      gg = l + (gg - l) * g.saturation;
      b = l + (b - l) * g.saturation;
      r = (r - 0.5) * g.contrast + 0.5;
      gg = (gg - 0.5) * g.contrast + 0.5;
      b = (b - 0.5) * g.contrast + 0.5;
      r = r * g.gain.r + g.lift.r * (1 - r);
      gg = gg * g.gain.g + g.lift.g * (1 - gg);
      b = b * g.gain.b + g.lift.b * (1 - b);
      const px = (x / w - 0.5) * aspect;
      const py = y / h - 0.5;
      const d = Math.sqrt(px * px + py * py);
      const vig = 1 - g.vignette * Math.min(1, Math.max(0, (d - 0.35) / 0.75)) ** 1.5;
      r *= vig;
      gg *= vig;
      b *= vig;
      if (g.scope > 0) {
        const sd = Math.sqrt(px * px + py * py) / g.scopeRadius;
        const mask = 1 - Math.min(1, Math.max(0, (sd - 0.94) / 0.06));
        const inner = 1 - 0.35 * Math.max(0, sd - 0.6) / 0.4;
        r *= mask * inner;
        gg *= mask * inner;
        b *= mask * inner;
        if (g.reticle > 0 && sd < 0.94) {
          const lw = 0.6 / h;
          if (Math.abs(py) < lw && Math.abs(px) > 0.012) r = gg = b = 0.02;
          if (Math.abs(px) < lw && Math.abs(py) > 0.012) r = gg = b = 0.02;
        }
      }
      r = r * (1 - g.flash) + g.flashColor.r * g.flash;
      gg = gg * (1 - g.flash) + g.flashColor.g * g.flash;
      b = b * (1 - g.flash) + g.flashColor.b * g.flash;
      r *= 1 - g.fade;
      gg *= 1 - g.fade;
      b *= 1 - g.fade;
      rgb[i] = Math.max(0, Math.min(255, Math.round(r * 255)));
      rgb[i + 1] = Math.max(0, Math.min(255, Math.round(gg * 255)));
      rgb[i + 2] = Math.max(0, Math.min(255, Math.round(b * 255)));
    }
  }
}
