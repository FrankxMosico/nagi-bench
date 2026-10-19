import { defineConfig, type Plugin } from "vite";

// 构建为单个经典脚本（非 ES module），使 dist/index.html 既能通过 http 访问，
// 也能直接双击以 file:// 打开（浏览器会拦截 file:// 下的 module 脚本）。
function classicScript(): Plugin {
  return {
    name: "classic-script",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>')
          .replace(/ crossorigin/g, "");
      },
    },
  };
}

export default defineConfig({
  base: "./",
  build: {
    target: "es2020",
    modulePreload: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 8000,
    rolldownOptions: {
      output: { format: "iife" },
    },
  },
  plugins: [classicScript()],
});
