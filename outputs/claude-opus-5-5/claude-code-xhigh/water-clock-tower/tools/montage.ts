// 把多张截图拼成一张联系表：bun tools/montage.ts 输出.png 列数 图1 图2 ...
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";

const [out, colsS, ...files] = process.argv.slice(2);
const cols = Number(colsS);
const imgs = await Promise.all(files.map(async (f) => "data:image/png;base64," + (await readFile(f)).toString("base64")));
const w = 640, h = 360;
const rows = Math.ceil(imgs.length / cols);
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
});
const page = await browser.newPage({ viewport: { width: cols * w, height: rows * (h + 22) } });
const cells = imgs
  .map((s, i) => `<div><img src="${s}" width=${w} height=${h} style="display:block"><div style="height:22px">${files[i].split("/").pop()}</div></div>`)
  .join("");
await page.setContent(
  `<html><body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${w}px);font:14px monospace;color:#fff">${cells}</body></html>`,
);
await page.waitForTimeout(300);
await page.screenshot({ path: out });
await browser.close();
console.log("ok", out);
