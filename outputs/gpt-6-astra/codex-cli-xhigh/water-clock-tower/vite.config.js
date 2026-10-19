import { defineConfig } from 'vite';
// Classic IIFE output keeps file:// usable: no module fetch, WASM, or runtime imports.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: { format: 'iife', entryFileNames: 'assets/film.js', assetFileNames: 'assets/[name][extname]' }
    }
  },
  plugins: [{
    name: 'offline-classic-script',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const item of Object.values(bundle)) if (item.type === 'asset' && item.fileName.endsWith('.html')) {
        item.source = String(item.source).replace(/<script type="module" crossorigin([^>]*)>/g, '<script defer$1>').replace(/ crossorigin/g, '');
      }
    }
  }]
});
