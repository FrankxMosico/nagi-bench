// 批量截取影片帧：bun tools/film.ts 2,7,12 [输出目录] [额外查询串 用:和;]
// 页面以 freeze 模式加载，按时间顺序调用 __seek(t) 快进物理后截图。
import { chromium } from "playwright-core";
import { readFile, mkdir } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const times = (process.argv[2] ?? "1").split(",").map(Number).sort((a, b) => a - b);
const outDir = process.argv[3] ?? "debug/film";
const extra = (process.argv[4] ?? "").replaceAll(":", "=").replaceAll(";", "&");
await mkdir(outDir, { recursive: true });
const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") console.log(`[${m.type()}] ${m.text()}`); });
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://film.local") return route.abort();
  const p = decodeURIComponent(url.pathname).replace(/\/$/, "/index.html");
  try {
    await route.fulfill({ status: 200, body: await readFile(join(root, p)), contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
await page.goto(`http://film.local/index.html?t=0&freeze${extra ? "&" + extra : ""}`);
await page.waitForFunction(() => (window as any).__ready === true, null, { timeout: 120000 });
for (const t of times) {
  await page.evaluate((tt) => (window as any).__seek(tt), t);
  await page.waitForTimeout(700);
  const file = join(outDir, `f${String(Math.round(t * 10)).padStart(4, "0")}.png`);
  await page.screenshot({ path: file });
  console.log("shot", t, file);
}
await browser.close();
