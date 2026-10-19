// 实时播放并记录卡顿：每帧间隔超过阈值时打印影片时间与着色器程序数。bun tools/stalls.mjs [--secs 45] [--size 1280x720]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const [W, H] = opt('size', '1280x720').split('x').map(Number);
const secs = Number(opt('secs', '45'));
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
if (args.includes('--noeffects')) {
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = '*{backdrop-filter:none!important;box-shadow:none!important;text-shadow:none!important}#leaders g{filter:none!important}';
    document.head.appendChild(s);
  }));
}
if (args.includes('--nooverlay')) {
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = '#overlay{display:none!important}';
    document.head.appendChild(s);
  }));
}
const seek = opt('t', '');
await page.goto('file://' + resolve('dist/index.html') + '?mute' + (args.includes('--nohud') ? '&nohud' : '') + (seek ? `&t=${seek}` : ''));
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
await page.evaluate(() => {
  const log = (window.__stalls = []);
  let last = performance.now(), lastProg = window.__info().programs;
  const tick = () => {
    const now = performance.now();
    const prog = window.__info().programs;
    if (now - last > 400 || prog !== lastProg) log.push(`dt=${(now - last).toFixed(0)}ms film=${window.__film.filmTime.toFixed(2)} programs=${prog} js=[${(window.__timing ?? []).map((x) => x.toFixed(0)).join(',')}]`);
    last = now; lastProg = prog;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.waitForTimeout(secs * 1000);
const log = await page.evaluate(() => window.__stalls);
console.log(log.join('\n'));
console.log('final film', await page.evaluate(() => window.__film.filmTime.toFixed(2)));
await browser.close();
