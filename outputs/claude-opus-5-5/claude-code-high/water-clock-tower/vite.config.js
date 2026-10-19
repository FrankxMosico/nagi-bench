import { defineConfig } from "vite";

// The built page must open straight from disk (file://), where browsers refuse
// to load ES-module scripts. Bundle everything into one classic IIFE script
// and reference it with a plain deferred <script> tag.
/** @returns {import("vite").Plugin} */
function classicScript() {
  return {
    name: "classic-script",
    enforce: "post",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>')
          .replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href=');
      },
    },
  };
}

export default defineConfig({
  base: "./",
  cacheDir: ".vite-cache",
  plugins: [classicScript()],
  build: {
    target: "es2022",
    assetsInlineLimit: 0,
    // one self-contained bundle (three.js + Rapier with its WASM inlined)
    chunkSizeWarningLimit: 8192,
    modulePreload: false,
    rolldownOptions: {
      output: {
        format: "iife",
        codeSplitting: false,
      },
    },
  },
});
