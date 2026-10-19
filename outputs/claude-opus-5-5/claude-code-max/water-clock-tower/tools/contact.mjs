// 逐帧设定影片时间截图并拼成联系表：bun tools/contact.mjs [--step 1] [--from 0] [--len 33] [--out shots/contact] [--hq] [--cols 6]
import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const step = Number(opt('step', '1'));
const from = Number(opt('from', '0'));
const out = resolve(opt('out', 'shots/contact'));
const hq = args.includes('--hq');
const total = Number(opt('len', '33'));
const cols = Number(opt('cols', '6'));
const [W, H] = opt('size', '960x540').split('x').map(Number);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell',
  chromiumSandbox: false,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.goto('file://' + resolve('dist/index.html') + `?mute&manual${hq ? '&q=high' : ''}`);
await page.waitForFunction(() => window.__film && window.__film.ready, null, { timeout: 180000 });
const files = [];
for (let t = from; t <= from + total + 1e-6; t += step) {
  await page.evaluate((tt) => { window.__manualTime = tt; }, t);
  const f0 = await page.evaluate(() => window.__film.frames);
  await page.waitForFunction(([tt, f]) => Math.abs(window.__film.filmTime - tt) < 1e-6 && window.__film.frames > f + 2, [t, f0], { timeout: 300000 });
  await page.waitForTimeout(500); // 等 CSS 过渡
  const f = `${out}/c${String(t.toFixed(1)).padStart(5, '0')}.png`;
  await page.screenshot({ path: f, timeout: 300000 });
  files.push({ f, ft: t });
  process.stdout.write(`${t.toFixed(1)} `);
}
console.log();
const tw = 1920 / cols;
const html = `<html><body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols}, ${tw}px);gap:2px">${files.map(({ f, ft }) => `<div style="position:relative"><img src="file://${f}" style="width:${tw}px;display:block"><span style="position:absolute;left:4px;top:2px;color:#ff0;font:bold 14px monospace;text-shadow:0 0 3px #000">${ft.toFixed(1)}</span></div>`).join('')}</body></html>`;
writeFileSync(`${out}/sheet.html`, html);
const p2 = await browser.newPage({ viewport: { width: 1920 + cols * 2, height: 400 } });
await p2.goto(`file://${out}/sheet.html`);
await p2.screenshot({ path: `${out}/sheet.png`, fullPage: true });
await browser.close();
console.log('sheet', `${out}/sheet.png`);
