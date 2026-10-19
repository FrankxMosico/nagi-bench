// Parses every .ts/.tsx file with Node's bundled swc (amaro) to catch syntax errors without
// needing the TypeScript package. Run with: node --expose-internals tests/smoke/syntax-check.cjs
const fs = require('fs');
const path = require('path');
const amaro = require('internal/deps/amaro/dist/index');

const root = path.resolve(__dirname, '../../src');
let failed = 0;
let count = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(name)) {
      count++;
      const tsx = name.endsWith('.tsx');
      try {
        amaro.transformSync(fs.readFileSync(p, 'utf8'), {
          mode: 'strip-only',
          filename: name,
          parser: { syntax: 'typescript', tsx },
        });
      } catch (e) {
        failed++;
        console.log(`SYNTAX ERROR ${path.relative(root, p)}: ${e.message}`);
      }
    }
  }
}
walk(root);
console.log(`${count} files parsed, ${failed} with errors`);
process.exit(failed ? 1 : 0);
