import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
export default defineConfig({
  base: './',
  plugins: [{ name: 'offline-file-entry', enforce: 'post',
    buildStart() { this.emitFile({type:'asset',fileName:'assets/film.css',source:readFileSync(new URL('./src/style.css',import.meta.url),'utf8')}); },
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) if(file.type==='asset' && file.fileName.endsWith('.html')) {
        file.source=String(file.source).replace(/type="module"/g,'defer').replace(/ crossorigin/g,'').replace('</head>','<link rel="stylesheet" href="./assets/film.css" /></head>');
      }
    }
  }],
  build: { target: 'es2022', assetsInlineLimit: 0, chunkSizeWarningLimit: 700, rollupOptions: { output: { format: 'iife', name: 'WaterClock' } } }
});
