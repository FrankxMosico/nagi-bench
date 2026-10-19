// Node ESM hooks for the smoke test: maps three / react / react-dom to local mocks, strips
// TypeScript from .tsx via Node's bundled swc and converts JSX with tests/smoke/jsx.mjs.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transformJsx } from './jsx.mjs';

const require = createRequire(import.meta.url);
const amaro = require('internal/deps/amaro/dist/index');
const here = dirname(fileURLToPath(import.meta.url));
const srcRoot = join(here, '../../src');
const mock = (f) => pathToFileURL(join(here, 'mocks', f)).href;

const MAP = {
  three: 'three-generated',
  react: mock('react.mjs'),
  'react-dom/client': mock('react-dom-client.mjs'),
  'jsx-mock': mock('react.mjs'),
};

function threeExports() {
  const names = new Set();
  const walk = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.tsx?$/.test(n)) for (const m of readFileSync(p, 'utf8').matchAll(/THREE\.([A-Za-z_][\w]*)/g)) names.add(m[1]);
    }
  };
  walk(srcRoot);
  return [...names];
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'three') return { url: 'mock:three', shortCircuit: true };
  if (MAP[specifier]) return { url: MAP[specifier], shortCircuit: true };
  if (specifier.endsWith('.css')) return { url: 'mock:css', shortCircuit: true };
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url === 'mock:css') return { format: 'module', source: 'export default {};', shortCircuit: true };
  if (url === 'mock:three') {
    const names = threeExports();
    const src = `import { makeAny } from ${JSON.stringify(mock('any.mjs'))};\n` + names.map((n) => `export const ${n} = makeAny(${JSON.stringify('THREE.' + n)});`).join('\n');
    return { format: 'module', source: src, shortCircuit: true };
  }
  if (url.endsWith('.tsx')) {
    const raw = readFileSync(fileURLToPath(url), 'utf8');
    const stripped = amaro.transformSync(raw, { mode: 'strip-only', filename: 'x.tsx', parser: { syntax: 'typescript', tsx: true } }).code;
    const code = `import { __h, __Fragment } from 'jsx-mock';\n${transformJsx(stripped)}`;
    return { format: 'module', source: code, shortCircuit: true };
  }
  return nextLoad(url, context);
}
