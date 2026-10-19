import { defineConfig, type Plugin } from 'vite';

// 构建为经典脚本（IIFE）并使用相对路径：dist/index.html 可直接双击（file://）离线打开。
const classicScript = (): Plugin => ({
  name: 'classic-script',
  enforce: 'post',
  transformIndexHtml(html) {
    return html
      .replace(/<script type="module" crossorigin src=/g, '<script defer src=')
      .replace(/<script type="module" src=/g, '<script defer src=')
      .replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ');
  },
});

export default defineConfig({
  base: './',
  plugins: [classicScript()],
  build: {
    target: 'es2020',
    modulePreload: false,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 8000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/app-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
