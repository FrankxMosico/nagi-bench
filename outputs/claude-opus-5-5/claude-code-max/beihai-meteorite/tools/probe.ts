import "./shim";
import * as THREE from "three";
import { CinematicPlayer } from "@agentbench/cinematic-player";
import { buildFilm } from "../src/world/index";
import { resetFrame } from "../src/world/context";
import { DURATION } from "../src/timeline";

/** Print camera and key actor positions at given times:  bun tools/probe.ts 143,151 */
const times = (process.argv[2] ?? "150").split(",").map(Number);
const film = buildFilm();
const player = new CinematicPlayer({ duration: DURATION, context: film.ctx, shots: film.shots });
const f = (v: THREE.Vector3) => `(${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)})`;
for (const t of times) {
  resetFrame(film.ctx);
  player.seek(t);
  const cam = film.ctx.camera;
  const dir = new THREE.Vector3();
  cam.getWorldDirection(dir);
  console.log(`t=${t} camera ${f(cam.position)} dir ${f(dir)} fov ${cam.fov.toFixed(1)}`);
  const b = film.sets.basement;
  console.log(`  basement: head ${f(b.head())} handL ${f(b.hand())} holder ${f(b.zhang.holder.position)}`);
  const c = film.sets.collector;
  console.log(`  collector: zhang head ${f(c.head(c.zhang))} collector head ${f(c.head(c.collector))}`);
  const w = film.sets.workshop;
  console.log(`  workshop: zhang head ${f(w.head())}`);
  const s = film.sets.space;
  const hl = new THREE.Vector3();
  s.zhang.fig.anchors.handL.getWorldPosition(hl);
  const { sunDir, Z_FWD, Z_UP, Z_RIGHT, ZPOS } = await import("../src/world/sets/space-common");
  const rel = (v: THREE.Vector3) => {
    const d = v.clone().sub(ZPOS);
    return `[F ${d.dot(Z_FWD).toFixed(2)} R ${d.dot(Z_RIGHT).toFixed(2)} U ${d.dot(Z_UP).toFixed(2)}]`;
  };
  const sd = sunDir(t);
  console.log(`  space: head ${rel(s.zhangHead())} handR ${rel(s.zhangHand())} handL ${rel(hl)} sun(F,R,U) [${sd.dot(Z_FWD).toFixed(2)}, ${sd.dot(Z_RIGHT).toFixed(2)}, ${sd.dot(Z_UP).toFixed(2)}] cam ${rel(cam.position)}`);
}
