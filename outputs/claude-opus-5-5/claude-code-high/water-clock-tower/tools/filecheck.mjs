// Opens dist/index.html straight from disk (file://) with NO autoplay
// permission and no network, checks for errors, the play overlay, and that
// clicking it starts the film.
import { chromium } from "playwright-core";
import { resolve } from "node:path";
import { mkdir } from "node:fs/promises";

const out = resolve(process.argv[2] ?? ".cap/file");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/opt/agentbench/browser/chromium_headless_shell-1228/chrome-linux/headless_shell",
  chromiumSandbox: false,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--disable-dev-shm-usage", "--autoplay-policy=user-gesture-required"],
});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, offline: true });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(`[${m.type()}] ${m.text()}`); });
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => errors.push(`[requestfailed] ${r.url()}`));
await page.goto("file://" + resolve("dist/index.html"));
await page.waitForFunction(() => {
  const b = document.querySelector(".overlay button");
  return b && !b.disabled;
}, null, { timeout: 120000 }).catch((e) => errors.push("overlay button never enabled: " + e.message));
await page.screenshot({ path: `${out}/1_overlay.png` });
const status = await page.evaluate(() => document.querySelector(".overlay .status")?.textContent);
console.log("overlay status:", status);
await page.click(".overlay button");
await page.waitForTimeout(6000);
await page.screenshot({ path: `${out}/2_after_click.png` });
const hidden = await page.evaluate(() => document.querySelector(".overlay")?.classList.contains("hide"));
console.log("overlay hidden after click:", hidden);
console.log(errors.length ? errors.join("\n") : "no console errors/warnings");
await browser.close();
