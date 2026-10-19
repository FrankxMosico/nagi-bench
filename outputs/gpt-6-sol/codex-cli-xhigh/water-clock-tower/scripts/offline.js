import { readFile, writeFile } from 'node:fs/promises';

// Vite emits one self-contained JS bundle for this project. A classic, deferred
// script and a normal stylesheet can both load from file:// without CORS.
const file = new URL('../dist/index.html', import.meta.url);
let html = await readFile(file, 'utf8');
html = html.replace(/<script type="module" crossorigin src="(\.\/assets\/[^\"]+\.js)"><\/script>/,
  '<script defer src="$1"></script>');
html = html.replace(/<link rel="stylesheet" crossorigin href="(\.\/assets\/[^\"]+\.css)">/,
  '<link rel="stylesheet" href="$1">');
await writeFile(file, html);
