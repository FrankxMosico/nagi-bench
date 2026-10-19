// 截取影片指定时刻：bun tools/shoot.mjs 0,5,12.8 [--out shots] [--size 1280x720] [--lite] [--wait 1500]
// 以 file:// 打开 dist/index.html（同时验证离线直接打开可用），用 ?t=..&freeze 定格。
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const flag = (n) => { const i = args.indexOf('--' + n); if (i >= 0) { args.splice(i, 1); return true; } return false; };
const out = resolve(opt('out', 'shots'));
const [W, H] = opt('size', '1280x720').split('x').map(Number);
const wait = Number(opt('wait', '1500'));
const lite = flag('lite');
const hq = flag('hq'); // 强制高画质
const extraList = ['mute'];
if (hq) extraList.push('q=high');
const extra = extraList.join('&');
const times = (args[0] ?? '0').split(',').map(Number);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
page.on('console', (m) => { if (m.type() !== 'debug') console.log(`[console.${m.type()}] ${m.text()}`); });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
for (const t of times) {
  const url = 'file://' + resolve('dist/index.html') + `?t=${t}&freeze${lite ? '&lite' : ''}${extra ? '&' + extra : ''}`;
  const t0 = Date.now();
  await page.goto(url);
  await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 120000 });
  await page.waitForTimeout(wait);
  const file = `${out}/f${String(t.toFixed(2)).padStart(6, '0')}.png`;
  await page.screenshot({ path: file, timeout: 600000 });
  const info = await page.evaluate(() => window.__film);
  console.log(`shot ${file} (${Date.now() - t0} ms) fps=${info.fps.toFixed(1)} sim=${info.simTime.toFixed(2)}`);
}
await browser.close();
