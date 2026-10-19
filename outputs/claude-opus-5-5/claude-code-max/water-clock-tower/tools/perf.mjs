// 测量无头浏览器中的帧率：bun tools/perf.mjs [--extra a=b&c] [--size 1280x720] [--secs 20] [--t 6] [--run]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const extra = opt('extra', '').split(',').filter(Boolean).join('&'); // 逗号分隔
const [W, H] = opt('size', '1280x720').split('x').map(Number);
const secs = Number(opt('secs', '20'));
const t = opt('t', '6');
const run = args.includes('--run');
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
let t0 = Date.now();
page.on('console', (m) => { if (m.type() !== 'debug' || args.includes('--v')) console.log(`[console.${m.type()}] ${m.text()} @${Date.now() - t0}ms`); });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
t0 = Date.now();
await page.goto('file://' + resolve('dist/index.html') + `?${run ? '' : `t=${t}&freeze&`}${extra}`);
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
console.log('ready after', Date.now() - t0, 'ms', 'lite=', await page.evaluate(() => window.__film.lite));
let last = await page.evaluate(() => window.__film.frames);
let lastT = Date.now();
for (let i = 0; i < secs / 2; i++) {
  await page.waitForTimeout(2000);
  const f = await page.evaluate(() => ({ ...window.__film, info: window.__info?.(), timing: window.__timing }));
  const now = Date.now();
  console.log(`+${((now - t0) / 1000).toFixed(1)}s frames/s=${((f.frames - last) * 1000 / (now - lastT)).toFixed(2)} film=${f.filmTime.toFixed(2)} sim=${f.simTime.toFixed(2)} calls=${f.info?.calls} js=[${(f.timing ?? []).map((x) => x.toFixed(1)).join(',')}]`);
  last = f.frames; lastT = now;
}
await browser.close();
