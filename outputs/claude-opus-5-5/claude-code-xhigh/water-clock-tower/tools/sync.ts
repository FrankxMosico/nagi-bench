// 检查影片时钟与真实时间是否同步：每秒采样一次 __filmTime。bun tools/sync.ts [秒数]
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const secs = Number(process.argv[2] ?? 30);
const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript" };
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-dev-shm-usage", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://sync.local") return route.abort();
  const p = decodeURIComponent(url.pathname).replace(/\/$/, "/index.html");
  try {
    await route.fulfill({ status: 200, body: await readFile(join(root, p)), contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
await page.goto("http://sync.local/", { waitUntil: "load" });
const start = Date.now();
let first = -1;
for (let i = 0; i <= secs; i++) {
  const delay = start + i * 1000 - Date.now();
  if (delay > 0) await page.waitForTimeout(delay);
  const w = (Date.now() - start) / 1000;
  const f = (await page.evaluate(() => (window as any).__filmTime ?? -1)) as number;
  if (first < 0 && f > 0) first = w - f;
  console.log(`wall ${w.toFixed(1)}  film ${f.toFixed(2)}  ${first >= 0 ? "lag " + (w - first - f).toFixed(2) : ""}`);
}
await browser.close();
