// 打印指定影片时刻各运动箭头的状态：bun tools/arrowdbg.mjs 14.2 [15.0 ...]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';

const times = process.argv.slice(2).map(Number);
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.goto('file://' + resolve('dist/index.html') + '?mute&manual');
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
for (const t of times) {
  await page.evaluate((tt) => { window.__manualTime = tt; }, t);
  const f0 = await page.evaluate(() => window.__film.frames);
  await page.waitForFunction(([tt, f]) => Math.abs(window.__film.filmTime - tt) < 1e-6 && window.__film.frames > f + 12, [t, f0], { timeout: 300000 });
  const rows = await page.evaluate(() => [...document.querySelectorAll('#leaders > g')].map((g) => `${g.style.opacity} ${g.getAttribute('transform') ?? ''}`));
  console.log(`t=${t}`);
  rows.forEach((r, i) => console.log(`  #${i} ${r}`));
}
await browser.close();
