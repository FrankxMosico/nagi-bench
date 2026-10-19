// 浏览器内物理步进基准：bun tools/bench.mjs
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';

const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.goto('file://' + resolve('dist/index.html') + '?mute&freeze&q=low');
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
for (const [n, mode] of [[600, 'parts'], [1500, 'parts'], [1500, 'plain']]) {
  const r = await page.evaluate(([n, m]) => window.__bench(n, m), [n, mode]);
  console.log(n, mode, JSON.stringify(r, (k, v) => (typeof v === 'number' ? Number(v.toFixed(3)) : v)));
}
await browser.close();
