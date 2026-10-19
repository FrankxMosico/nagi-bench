// 导出物理事件时间表：bun tools/events.ts [秒数] [--write]
// 物理是确定性的（固定步长、相同初始状态），因此可以离线预先算出事件发生的物理时刻，
// 供影片时间线把慢放区间、字幕切换对齐到真实的机械动作上。--write 时写入 src/film/physEvents.json。
import RAPIER from "@dimforge/rapier3d-compat";
import { buildMachine } from "../src/physics/machine";
import { writeFileSync } from "node:fs";

await RAPIER.init();
const secs = Number(process.argv[2] ?? 40);
const write = process.argv.includes("--write");
const m = buildMachine(RAPIER, { initialFill: 8 });
const D = 180 / Math.PI;
let moving = false, forkDown = false;
const ev = { dip: [] as number[], release: [] as number[], lock: [] as number[], drum: [] as number[], bell: [] as number[] };
const r3 = (x: number) => Math.round(x * 1000) / 1000;
while (m.time < secs) {
  m.step();
  const w = Math.abs(m.wheel.angvel().x);
  const fa = m.relAngle(m.ground, m.fork, "z") * D;
  if (!forkDown && fa < -1.5) { forkDown = true; ev.dip.push(r3(m.time)); }
  if (forkDown && fa > -0.5) forkDown = false;
  if (!moving && w > 0.05) { moving = true; ev.release.push(r3(m.time)); }
  if (moving && w < 0.01) moving = false;
  for (const s of m.sounds.splice(0)) {
    if (s.kind === "lock" && s.strength > 0.5) ev.lock.push(r3(s.t));
    if ((s.kind === "drum" || s.kind === "bell") && s.strength > 0.3) ev[s.kind].push(r3(s.t));
  }
}
// 以“枢衡下压”划分每一拍：放开取其后的第一次转动，锁住取下一拍之前的最后一次撞击
const steps = ev.dip.map((d, i) => {
  const next = ev.dip[i + 1] ?? Infinity;
  const release = ev.release.find((t) => t > d && t < next) ?? d;
  const locks = ev.lock.filter((t) => t > release && t < next);
  return { dip: d, release, lock: locks.length ? locks[locks.length - 1] : release };
});
const out = { steps, drum: ev.drum, bell: ev.bell };
for (const s of steps) console.log(`dip ${s.dip.toFixed(2)}  release ${s.release.toFixed(2)}  lock ${s.lock.toFixed(2)}`);
console.log("drum", ev.drum.join(" "));
console.log("bell", ev.bell.join(" "));
if (write) {
  writeFileSync("src/film/physEvents.json", JSON.stringify(out, null, 1) + "\n");
  console.log("written src/film/physEvents.json");
}
