import { defineConfig } from "vite";

// Loaded with `--configLoader native` because the shared node_modules is read-only
// and the default loader would try to write a temporary bundle into it.
export default defineConfig({
  // Relative base so dist/index.html keeps working wherever the bundle is hosted.
  base: "./",
  cacheDir: ".vite-cache",
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 2500,
  },
});
