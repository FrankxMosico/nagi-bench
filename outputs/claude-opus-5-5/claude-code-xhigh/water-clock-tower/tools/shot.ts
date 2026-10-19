// 截图检查：bun tools/shot.ts "<query>" out.png [等待毫秒] [宽x高]
// 以拦截请求的方式从 dist/ 提供文件，打开 index.html?<query>，等 window.__ready 后截图。
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

// 查询串里用 ":" 代替 "="、";" 代替 "&"，例如 "t:1;freeze"
const query = (process.argv[2] ?? "").replaceAll(":", "=").replaceAll(";", "&");
const out = process.argv[3] ?? "debug/shot.png";
const wait = Number(process.argv[4] ?? 300);
const [w, h] = (process.argv[5] ?? "1280x720").split("x").map(Number);
const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".wasm": "application/wasm" };

const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: w, height: h } });
page.on("console", (m) => console.log(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.stack ?? e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://shot.local") return route.abort();
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith("/")) p += "index.html";
  try {
    const body = await readFile(join(root, p));
    await route.fulfill({ status: 200, body, contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
const t0 = Date.now();
await page.goto(`http://shot.local/index.html?${query}`);
await page.waitForFunction(() => (window as any).__ready === true, null, { timeout: 120000 });
console.log("ready after", Date.now() - t0, "ms");
await page.waitForTimeout(wait);
const s0 = Date.now();
await page.screenshot({ path: out });
console.log("shot", out, "took", Date.now() - s0, "ms; total", Date.now() - t0, "ms");
await browser.close();
