// Contact sheet: tiles PNGs from a folder into one image.
//   bun tools/sheet.mjs .captures sheet.png [cols]
import { chromium } from "playwright-core";
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const dir = resolve(process.argv[2] ?? ".captures");
const out = resolve(process.argv[3] ?? ".captures/sheet.png");
const cols = Number(process.argv[4] ?? 4);
const files = (await readdir(dir)).filter((f) => /^f.*\.png$/.test(f)).sort();
const imgs = await Promise.all(files.map(async (f) => `data:image/png;base64,${(await readFile(join(dir, f))).toString("base64")}`));
const W = 400, H = 225;
const rows = Math.ceil(imgs.length / cols);
const html = `<html><body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${W}px);gap:4px">
${imgs.map((src, i) => `<div style="position:relative"><img src="${src}" style="width:${W}px;height:${H}px;display:block"><span style="position:absolute;left:4px;top:2px;color:#ff0;font:bold 14px sans-serif;text-shadow:0 0 3px #000">${files[i]}</span></div>`).join("")}
</body></html>`;
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
});
const page = await browser.newPage({ viewport: { width: cols * (W + 4), height: rows * (H + 4) } });
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`wrote ${out} (${imgs.length} tiles)`);
