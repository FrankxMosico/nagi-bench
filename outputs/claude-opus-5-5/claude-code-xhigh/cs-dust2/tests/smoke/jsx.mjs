// Minimal JSX -> __h(type, props, ...children) transformer for the smoke test. It runs on code
// that has already had its TypeScript types stripped, and only needs to understand the JSX
// patterns used in this project (elements, fragments, string/expression/boolean/spread attributes).

const WORD = /[A-Za-z_$]/;
const WORD_CHAR = /[\w$]/;
const JSX_PREV = new Set(['(', ',', '=', '?', ':', '{', '[', '&&', '||', '=>', 'return', '', ';', '!']);

function skipString(src, i) {
  const q = src[i];
  i++;
  while (i < src.length) {
    if (src[i] === '\\') {
      i += 2;
      continue;
    }
    if (src[i] === q) return i + 1;
    i++;
  }
  return i;
}

function skipTemplate(src, i) {
  i++;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') {
      i += 2;
      continue;
    }
    if (c === '`') return i + 1;
    if (c === '$' && src[i + 1] === '{') {
      const [, end] = readBalanced(src, i + 1);
      i = end;
      continue;
    }
    i++;
  }
  return i;
}

/** src[i] === '{' → returns [inner, indexAfterClosingBrace]. */
function readBalanced(src, i) {
  let depth = 0;
  const start = i;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'") {
      i = skipString(src, i);
      continue;
    }
    if (c === '`') {
      i = skipTemplate(src, i);
      continue;
    }
    if (c === '/' && src[i + 1] === '/') {
      const j = src.indexOf('\n', i);
      i = j < 0 ? src.length : j;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const j = src.indexOf('*/', i + 2);
      i = j < 0 ? src.length : j + 2;
      continue;
    }
    if (c === '<' && depth > 0 && isJsxStart(src, i, prevSig(src, i))) {
      // Skip over nested JSX so braces inside text don't confuse the count.
      i = parseElement(src, i)[1];
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return [src.slice(start + 1, i), i + 1];
    }
    i++;
  }
  throw new Error('unbalanced braces');
}

function prevSig(src, i) {
  let j = i - 1;
  while (j >= 0 && /\s/.test(src[j])) j--;
  if (j < 0) return '';
  const c = src[j];
  if (WORD_CHAR.test(c)) {
    let k = j;
    while (k >= 0 && WORD_CHAR.test(src[k])) k--;
    return src.slice(k + 1, j + 1);
  }
  if (c === '>' && src[j - 1] === '=') return '=>';
  if (c === '&' && src[j - 1] === '&') return '&&';
  if (c === '|' && src[j - 1] === '|') return '||';
  return c;
}

function isJsxStart(src, i, prev) {
  const next = src[i + 1];
  if (!(next === '>' || /[A-Za-z]/.test(next))) return false;
  return JSX_PREV.has(prev);
}

function jsxText(raw) {
  if (!raw.includes('\n')) return raw;
  const lines = raw.split('\n');
  const parts = [];
  lines.forEach((line, idx) => {
    let l = line;
    if (idx > 0) l = l.replace(/^\s+/, '');
    if (idx < lines.length - 1) l = l.replace(/\s+$/, '');
    if (l) parts.push(l);
  });
  return parts.join(' ');
}

function parseChildren(src, i) {
  const children = [];
  for (;;) {
    if (i >= src.length) throw new Error('unterminated JSX');
    if (src.startsWith('</', i)) {
      const j = src.indexOf('>', i);
      return [children, j + 1];
    }
    if (src[i] === '<') {
      const [code, end] = parseElement(src, i);
      children.push(code);
      i = end;
      continue;
    }
    if (src[i] === '{') {
      const [inner, end] = readBalanced(src, i);
      const t = inner.trim();
      if (t && !/^\/\*[\s\S]*\*\/$/.test(t)) children.push(`(${transformJsx(inner)})`);
      i = end;
      continue;
    }
    let j = i;
    while (j < src.length && src[j] !== '<' && src[j] !== '{') j++;
    const text = jsxText(src.slice(i, j));
    if (text.trim() || (text && !src.slice(i, j).includes('\n'))) children.push(JSON.stringify(text));
    i = j;
  }
}

function parseElement(src, i) {
  i++; // '<'
  if (src[i] === '>') {
    const [children, end] = parseChildren(src, i + 1);
    return [`__h(__Fragment, null${children.map((c) => `, ${c}`).join('')})`, end];
  }
  let j = i;
  while (j < src.length && /[\w.$:-]/.test(src[j])) j++;
  const name = src.slice(i, j);
  i = j;
  const props = [];
  let children = [];
  for (;;) {
    while (/\s/.test(src[i])) i++;
    if (src[i] === '/' && src[i + 1] === '>') {
      i += 2;
      break;
    }
    if (src[i] === '>') {
      const [ch, end] = parseChildren(src, i + 1);
      children = ch;
      i = end;
      break;
    }
    if (src[i] === '{') {
      const [inner, end] = readBalanced(src, i);
      props.push(transformJsx(inner));
      i = end;
      continue;
    }
    let k = i;
    while (k < src.length && /[\w:-]/.test(src[k])) k++;
    const attr = src.slice(i, k);
    if (!attr) throw new Error(`bad JSX attribute near: ${src.slice(i, i + 40)}`);
    i = k;
    while (/\s/.test(src[i])) i++;
    let value = 'true';
    if (src[i] === '=') {
      i++;
      while (/\s/.test(src[i])) i++;
      if (src[i] === '"' || src[i] === "'") {
        const end = skipString(src, i);
        value = JSON.stringify(src.slice(i + 1, end - 1));
        i = end;
      } else if (src[i] === '{') {
        const [inner, end] = readBalanced(src, i);
        value = `(${transformJsx(inner)})`;
        i = end;
      }
    }
    props.push(`${JSON.stringify(attr)}: ${value}`);
  }
  const type = /^[a-z]/.test(name) ? JSON.stringify(name) : name;
  const propsCode = props.length ? `{${props.join(', ')}}` : 'null';
  return [`__h(${type}, ${propsCode}${children.map((c) => `, ${c}`).join('')})`, i];
}

export function transformJsx(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') {
      const j = src.indexOf('\n', i);
      const e = j < 0 ? src.length : j;
      out += src.slice(i, e);
      i = e;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const j = src.indexOf('*/', i + 2);
      const e = j < 0 ? src.length : j + 2;
      out += src.slice(i, e);
      i = e;
      continue;
    }
    if (c === '"' || c === "'") {
      const e = skipString(src, i);
      out += src.slice(i, e);
      i = e;
      continue;
    }
    if (c === '`') {
      const e = skipTemplate(src, i);
      out += src.slice(i, e);
      i = e;
      continue;
    }
    if (c === '<' && isJsxStart(src, i, prevSig(src, i))) {
      const [code, end] = parseElement(src, i);
      out += code;
      i = end;
      continue;
    }
    if (WORD.test(c)) {
      let j = i;
      while (j < src.length && WORD_CHAR.test(src[j])) j++;
      out += src.slice(i, j);
      i = j;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}
