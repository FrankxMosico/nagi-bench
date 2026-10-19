// 播放整片并统计音频输出电平：bun tools/audiocheck.mjs
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';

const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[console.${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.goto('file://' + resolve('dist/index.html') + '?audiodebug&q=low&res=0.3');
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
const state = await page.evaluate(() => (window.__audioStats ? 'ok' : 'none'));
console.log('audio stats:', state);
await page.waitForTimeout(36000);
const stats = await page.evaluate(() => window.__audioStats);
const film = await page.evaluate(() => window.__film);
console.log('film time reached', film.filmTime.toFixed(2), 'fps', film.fps.toFixed(1));
// 每秒汇总
const bySec = new Map();
for (const s of stats) {
  const k = Math.floor(s.t);
  const e = bySec.get(k) ?? { peak: 0, rmsSum: 0, n: 0 };
  e.peak = Math.max(e.peak, s.peak); e.rmsSum += s.rms; e.n++;
  bySec.set(k, e);
}
let maxPeak = 0;
for (const [k, e] of [...bySec].sort((a, b) => a[0] - b[0])) {
  maxPeak = Math.max(maxPeak, e.peak);
  const bar = '#'.repeat(Math.round((e.rmsSum / e.n) * 200));
  console.log(`${String(k).padStart(3)}s peak=${e.peak.toFixed(3)} rms=${(e.rmsSum / e.n).toFixed(3)} ${bar}`);
}
console.log('MAX PEAK', maxPeak.toFixed(3));
await browser.close();
