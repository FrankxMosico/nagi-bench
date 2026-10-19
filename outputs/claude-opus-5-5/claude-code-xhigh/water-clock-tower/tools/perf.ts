// 实时播放性能检查：bun tools/perf.ts [秒数] [额外查询串 用:和;]
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const secs = Number(process.argv[2] ?? 12);
const extra = (process.argv[3] ?? "").replaceAll(":", "=").replaceAll(";", "&");
const root = resolve("dist");
const TYPES: Record<string, string> = { ".html": "text/html", ".js": "text/javascript" };
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-dev-shm-usage", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("console", (m) => { if (!m.text().includes("GPU stall")) console.log(`[${m.type()}] ${m.text()}`); });
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== "http://perf.local") return route.abort();
  const p = decodeURIComponent(url.pathname).replace(/\/$/, "/index.html");
  try {
    await route.fulfill({ status: 200, body: await readFile(join(root, p)), contentType: TYPES[extname(p)] ?? "application/octet-stream" });
  } catch {
    await route.fulfill({ status: 404, body: "nf" });
  }
});
await page.goto(`http://perf.local/index.html?perf${extra ? "&" + extra : ""}`);
await page.waitForTimeout(secs * 1000);
await browser.close();
