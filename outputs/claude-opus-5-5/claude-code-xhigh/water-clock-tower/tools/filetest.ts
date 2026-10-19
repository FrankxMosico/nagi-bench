// 以 file:// 直接打开 dist/index.html，确认离线可运行、无网络请求：bun tools/filetest.ts
import { chromium } from "playwright-core";
import { resolve } from "node:path";

const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const requests: string[] = [];
page.on("request", (r) => requests.push(r.url()));
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") console.log(`[error] ${m.text()}`); });
await page.goto("file://" + resolve("dist/index.html"));
await page.waitForFunction(() => (window as any).__ready === true, null, { timeout: 120000 });
await page.waitForTimeout(6000);
console.log("state:", await page.evaluate(() => (window as any).__state), "film:", (await page.evaluate(() => (window as any).__filmTime)).toFixed(2));
await page.screenshot({ path: "debug/filetest.png" });
const external = requests.filter((u) => !u.startsWith("file://") && !u.startsWith("data:") && !u.startsWith("blob:"));
console.log("requests:", requests.length, "non-local:", external.length, external.slice(0, 5));
await browser.close();
