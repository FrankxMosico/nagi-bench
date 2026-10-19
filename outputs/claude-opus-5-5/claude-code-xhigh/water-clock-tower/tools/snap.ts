// 调试快照：bun tools/snap.ts t1,t2,... [out-dir] [initialFill]
// 运行物理到指定时刻，把碰撞体线框投影到枢轮平面 (u,v)，用无头浏览器栅格化为 PNG。
import RAPIER from "@dimforge/rapier3d-compat";
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { buildMachine, WHEEL_C } from "../src/physics/machine";

await RAPIER.init();
const times = (process.argv[2] ?? "0,1").split(",").map(Number);
const out = process.argv[3] ?? "debug";
const mode = process.argv[5] ?? "uv"; // uv | xy | xz
const view = (process.argv[6] ?? "-3,-3.2,3.6,3").split(",").map(Number); // u0,v0,u1,v1
mkdirSync(out, { recursive: true });
const m = buildMachine(RAPIER, { initialFill: Number(process.argv[4] ?? 8) });
const proj = (x: number, y: number, z: number): [number, number, number] =>
  mode === "xy" ? [x, y, z] : mode === "xz" ? [x, -z, y] : [z - WHEEL_C.z, y - WHEEL_C.y, WHEEL_C.x - x];
const frames: { t: number; lines: number[]; colors: number[]; water: number[] }[] = [];
for (const t of times) {
  while (m.time < t) m.step();
  const dbg = m.world.debugRender();
  const lines: number[] = [];
  for (let i = 0; i < dbg.vertices.length; i += 3) {
    lines.push(...proj(dbg.vertices[i], dbg.vertices[i + 1], dbg.vertices[i + 2]));
  }
  const water: number[] = [];
  for (const b of m.water) {
    const p = b.translation();
    const q = proj(p.x, p.y, p.z);
    water.push(q[0], q[1]);
  }
  frames.push({ t, lines, colors: Array.from(dbg.colors), water });
}
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
});
const page = await browser.newPage({ viewport: { width: 900, height: 820 } });
page.on("pageerror", (e) => console.log("pageerror", e.message));
page.on("console", (e) => console.log("console", e.text()));
for (const f of frames) {
  const html = `<html><body style="margin:0;background:#111"><canvas id=c width=900 height=820></canvas><script>(()=>{
  const f=${JSON.stringify(f)}; const V=${JSON.stringify(view)};
  const c=document.getElementById('c').getContext('2d');
  const sx=900/(V[2]-V[0]), sy=820/(V[3]-V[1]); const s=Math.min(sx,sy);
  const P=(u,v)=>[(u-V[0])*s, 820-(v-V[1])*s];
  c.strokeStyle='#333'; c.beginPath(); for(let u=Math.ceil(V[0]);u<=V[2];u++){const a=P(u,V[1]),b=P(u,V[3]);c.moveTo(...a);c.lineTo(...b);} for(let v=Math.ceil(V[1]);v<=V[3];v++){const a=P(V[0],v),b=P(V[2],v);c.moveTo(...a);c.lineTo(...b);} c.stroke();
  for(let i=0;i<f.lines.length;i+=6){
    const w=(f.lines[i+2]+f.lines[i+5])/2;
    const col=f.colors.slice((i/3)*4,(i/3)*4+4);
    c.strokeStyle='rgba('+(col[0]*255|0)+','+(col[1]*255|0)+','+(col[2]*255|0)+','+(w>0.3?1:w>0.21?0.8:0.45)+')';
    c.beginPath(); c.moveTo(...P(f.lines[i],f.lines[i+1])); c.lineTo(...P(f.lines[i+3],f.lines[i+4])); c.stroke();
  }
  c.fillStyle='#4af';
  for(let i=0;i<f.water.length;i+=2){const p=P(f.water[i],f.water[i+1]); c.beginPath(); c.arc(p[0],p[1],0.05*s,0,7); c.fill();}
  c.fillStyle='#fff'; c.font='20px monospace'; c.fillText('t='+f.t,10,24);
  })()</script></body></html>`;
  await page.setContent(html);
  await page.screenshot({ path: `${out}/snap_${String(Math.round(f.t * 100)).padStart(5, "0")}.png` });
}
await browser.close();
console.log("ok", frames.length);
