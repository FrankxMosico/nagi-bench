import { installMockDom } from "./mockdom";
installMockDom();
const THREE = await import("three");
const { Raster } = await import("./raster");
const { CinematicPlayer } = await import("@agentbench/cinematic-player");
const { createWorld } = await import("../src/world");
const { buildShots } = await import("../src/shots");
const { voiceCues } = await import("../src/voice");
const { LAYERS } = await import("../src/core/particles");
const { DURATION } = await import("../src/story");

/**
 * Usage:
 *   bun tools/preview.ts sweep            — step the whole film, report errors
 *   bun tools/preview.ts 12.5 40 101 ...  — render those times to tools/out/f-<t>.png
 *   bun tools/preview.ts --w 960 ...      — width override
 */

const { mkdirSync } = await import("node:fs");
mkdirSync("/workspace/tools/out", { recursive: true });
const args = process.argv.slice(2);
let W = 720;
const wi = args.indexOf("--w");
if (wi >= 0) {
  W = Number(args[wi + 1]);
  args.splice(wi, 2);
}
const H = Math.round(W / 2.35);
const t0 = performance.now();
const world = createWorld();
console.log("world built in", Math.round(performance.now() - t0), "ms");
const shots = buildShots();
const player = new CinematicPlayer({ duration: DURATION, context: world, shots, cues: voiceCues, requestFrame: () => 0, cancelFrame: () => {} });
world.camera.aspect = 2.35;
world.camera.updateProjectionMatrix();
for (const l of LAYERS) l.setViewportHalfHeight(H / 2);

function activeShot(t: number): string {
  return shots.filter((s) => t >= s.start && t < s.end).map((s) => s.id).join("+") || "(none)";
}
function activeVoice(t: number): string {
  return voiceCues.filter((c) => t >= c.start && t < c.end).map((c) => `【${c.speaker}】${c.text}`).join(" ");
}

if (args[0] === "sweep") {
  const step = Number(args[1] ?? 0.25);
  let errors = 0;
  const tStart = performance.now();
  for (let t = 0; t <= DURATION; t += step) {
    try {
      player.seek(t);
      const c = world.camera;
      const bad = [c.position.x, c.position.y, c.position.z, c.quaternion.x, c.quaternion.w, c.fov].some((v) => !Number.isFinite(v));
      if (bad) {
        console.log("NaN camera at", t.toFixed(2), activeShot(t));
        errors++;
      }
      if (world.fx.set === "black" && world.fx.fade < 1 && !world.fx.card) console.log("uncovered black set at", t.toFixed(2));
    } catch (e) {
      errors++;
      console.log("ERROR at", t.toFixed(2), activeShot(t), (e as Error).stack?.split("\n").slice(0, 4).join(" | "));
      if (errors > 12) break;
    }
  }
  // Gaps in shot coverage.
  for (let t = 0; t < DURATION; t += 0.05) if (!shots.some((s) => t >= s.start && t < s.end)) console.log("gap at", t.toFixed(2));
  console.log("sweep done, errors:", errors, "in", Math.round(performance.now() - tStart), "ms");
  process.exit(errors ? 1 : 0);
}

const sheet = args[0] === "sheet";
if (sheet) args.shift();
const cols = 4;
const tiles: Uint8Array[] = [];
for (const a of args) {
  const t = Number(a);
  player.seek(t);
  const r = new Raster(W, H);
  r.clear();
  const fx = world.fx;
  const t1 = performance.now();
  if (fx.set === "space") r.render(world.bg, world.bgCamera);
  r.clearDepth();
  r.render(world.scene, world.camera);
  r.bloom(fx.bloom, 1.0);
  const tint = fx.tint;
  const shade = (x: number, y: number, rgb: [number, number, number]): [number, number, number] => {
    let [rr, gg, bb] = rgb;
    if (tint > 0) {
      rr *= 1 + 0.06 * tint;
      bb *= 1 - 0.1 * tint;
    } else {
      rr *= 1 + 0.08 * tint;
      bb *= 1 - 0.07 * tint;
    }
    if (fx.scope > 0) {
      const dx = x + 0.5 - W / 2;
      const dy = y + 0.5 - H / 2;
      const d = Math.sqrt(dx * dx + dy * dy) / (H / 2);
      const m = d < 0.84 ? 1 : d > 0.926 ? 0 : 1 - (d - 0.84) / 0.086;
      const cross = (Math.abs(dy) < 1 && Math.abs(dx) < H * 0.458 && Math.abs(dx) > H * 0.06) || (Math.abs(dx) < 1 && Math.abs(dy) < H * 0.458 && Math.abs(dy) > H * 0.06) || (Math.abs(dy) < 0.5 && Math.abs(dx) < H * 0.06) || (Math.abs(dx) < 0.5 && Math.abs(dy) < H * 0.06);
      const k = m * fx.scope + (1 - fx.scope);
      rr *= k;
      gg *= k;
      bb *= k;
      if (cross && fx.scope > 0.5) rr = gg = bb = 0.03;
    }
    const f = 1 - fx.fade;
    rr = rr * f + fx.flash * 0.6;
    gg = gg * f + fx.flash * 0.55;
    bb = bb * f + fx.flash * 0.45;
    return [rr, gg, bb];
  };
  if (sheet) tiles.push(r.toBytes(fx.exposure, shade));
  else r.toPNG(`/workspace/tools/out/f-${t.toFixed(1)}.png`, fx.exposure, shade);
  console.log(`t=${t.toFixed(1)} ${activeShot(t)} fade=${fx.fade.toFixed(2)} card=${fx.card ? fx.card.text + "/" + fx.card.opacity.toFixed(2) : "-"} ${Math.round(performance.now() - t1)}ms ${activeVoice(t)}`);
}
if (sheet && tiles.length) {
  const rows = Math.ceil(tiles.length / cols);
  const SW = cols * W + (cols - 1) * 4;
  const SH = rows * H + (rows - 1) * 4;
  const out = new Uint8Array(SW * SH * 3);
  tiles.forEach((tile, i) => {
    const ox = (i % cols) * (W + 4);
    const oy = Math.floor(i / cols) * (H + 4);
    for (let y = 0; y < H; y++) out.set(tile.subarray(y * W * 3, (y + 1) * W * 3), ((oy + y) * SW + ox) * 3);
  });
  const { writeRGB } = await import("./raster");
  writeRGB("/workspace/tools/out/sheet.png", SW, SH, out);
}
void THREE;
