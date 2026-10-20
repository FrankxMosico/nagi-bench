/**
 * A WebGL2 stand-in: accepts every call three.js makes, never draws. It does
 * parse the final GLSL three.js assembles so that active uniforms and
 * attributes are reported with real GL type enums — three.js then uploads
 * every uniform value exactly as in a browser, which exercises the film's
 * material and uniform plumbing. All shader sources are kept for inspection.
 */

const REAL: Record<string, number> = {
  DEPTH_BUFFER_BIT: 0x100, STENCIL_BUFFER_BIT: 0x400, COLOR_BUFFER_BIT: 0x4000,
  POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6,
  ZERO: 0, ONE: 1, SRC_COLOR: 0x300, ONE_MINUS_SRC_COLOR: 0x301, SRC_ALPHA: 0x302, ONE_MINUS_SRC_ALPHA: 0x303,
  DST_ALPHA: 0x304, ONE_MINUS_DST_ALPHA: 0x305, DST_COLOR: 0x306, ONE_MINUS_DST_COLOR: 0x307, SRC_ALPHA_SATURATE: 0x308,
  FUNC_ADD: 0x8006, FUNC_SUBTRACT: 0x800a, FUNC_REVERSE_SUBTRACT: 0x800b, MIN: 0x8007, MAX: 0x8008,
  ARRAY_BUFFER: 0x8892, ELEMENT_ARRAY_BUFFER: 0x8893, STATIC_DRAW: 0x88e4, DYNAMIC_DRAW: 0x88e8, STREAM_DRAW: 0x88e0,
  CULL_FACE: 0xb44, BLEND: 0xbe2, DITHER: 0xbd0, STENCIL_TEST: 0xb90, DEPTH_TEST: 0xb71, SCISSOR_TEST: 0xc11,
  POLYGON_OFFSET_FILL: 0x8037, SAMPLE_ALPHA_TO_COVERAGE: 0x809e, SAMPLE_COVERAGE: 0x80a0,
  FRONT: 0x404, BACK: 0x405, FRONT_AND_BACK: 0x408, CW: 0x900, CCW: 0x901,
  NO_ERROR: 0, BYTE: 0x1400, UNSIGNED_BYTE: 0x1401, SHORT: 0x1402, UNSIGNED_SHORT: 0x1403, INT: 0x1404, UNSIGNED_INT: 0x1405, FLOAT: 0x1406, HALF_FLOAT: 0x140b,
  DEPTH_COMPONENT: 0x1902, ALPHA: 0x1906, RGB: 0x1907, RGBA: 0x1908, LUMINANCE: 0x1909, LUMINANCE_ALPHA: 0x190a, RED: 0x1903, RG: 0x8227,
  FRAGMENT_SHADER: 0x8b30, VERTEX_SHADER: 0x8b31, COMPILE_STATUS: 0x8b81, LINK_STATUS: 0x8b82, VALIDATE_STATUS: 0x8b83,
  ACTIVE_UNIFORMS: 0x8b86, ACTIVE_ATTRIBUTES: 0x8b89, ATTACHED_SHADERS: 0x8b85, DELETE_STATUS: 0x8b80,
  FLOAT_VEC2: 0x8b50, FLOAT_VEC3: 0x8b51, FLOAT_VEC4: 0x8b52, INT_VEC2: 0x8b53, INT_VEC3: 0x8b54, INT_VEC4: 0x8b55, BOOL: 0x8b56,
  BOOL_VEC2: 0x8b57, BOOL_VEC3: 0x8b58, BOOL_VEC4: 0x8b59, FLOAT_MAT2: 0x8b5a, FLOAT_MAT3: 0x8b5b, FLOAT_MAT4: 0x8b5c,
  SAMPLER_2D: 0x8b5e, SAMPLER_3D: 0x8b5f, SAMPLER_CUBE: 0x8b60, SAMPLER_2D_SHADOW: 0x8b62, SAMPLER_2D_ARRAY: 0x8dc1,
  NEVER: 0x200, LESS: 0x201, EQUAL: 0x202, LEQUAL: 0x203, GREATER: 0x204, NOTEQUAL: 0x205, GEQUAL: 0x206, ALWAYS: 0x207,
  KEEP: 0x1e00, REPLACE: 0x1e01, INCR: 0x1e02, DECR: 0x1e03, INVERT: 0x150a,
  TEXTURE_2D: 0xde1, TEXTURE_CUBE_MAP: 0x8513, TEXTURE_3D: 0x806f, TEXTURE_2D_ARRAY: 0x8c1a, TEXTURE0: 0x84c0,
  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515, TEXTURE_MAG_FILTER: 0x2800, TEXTURE_MIN_FILTER: 0x2801, TEXTURE_WRAP_S: 0x2802, TEXTURE_WRAP_T: 0x2803, TEXTURE_WRAP_R: 0x8072,
  NEAREST: 0x2600, LINEAR: 0x2601, NEAREST_MIPMAP_NEAREST: 0x2700, LINEAR_MIPMAP_NEAREST: 0x2701, NEAREST_MIPMAP_LINEAR: 0x2702, LINEAR_MIPMAP_LINEAR: 0x2703,
  REPEAT: 0x2901, CLAMP_TO_EDGE: 0x812f, MIRRORED_REPEAT: 0x8370,
  FRAMEBUFFER: 0x8d40, RENDERBUFFER: 0x8d41, READ_FRAMEBUFFER: 0x8ca8, DRAW_FRAMEBUFFER: 0x8ca9, FRAMEBUFFER_COMPLETE: 0x8cd5,
  COLOR_ATTACHMENT0: 0x8ce0, DEPTH_ATTACHMENT: 0x8d00, STENCIL_ATTACHMENT: 0x8d20, DEPTH_STENCIL_ATTACHMENT: 0x821a,
  DEPTH_COMPONENT16: 0x81a5, DEPTH_COMPONENT24: 0x81a6, DEPTH_COMPONENT32F: 0x8cac, DEPTH24_STENCIL8: 0x88f0, DEPTH_STENCIL: 0x84f9,
  UNSIGNED_INT_24_8: 0x84fa, RGBA8: 0x8058, RGBA16F: 0x881a, RGBA32F: 0x8814, R8: 0x8229, R16F: 0x822d, R32F: 0x822e, RG8: 0x822b, RGB8: 0x8051, SRGB8_ALPHA8: 0x8c43,
  UNPACK_FLIP_Y_WEBGL: 0x9240, UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241, UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243, UNPACK_ALIGNMENT: 0xcf5, PACK_ALIGNMENT: 0xd05,
  UNPACK_ROW_LENGTH: 0xcf2, UNPACK_SKIP_PIXELS: 0xcf4, UNPACK_SKIP_ROWS: 0xcf3, UNPACK_IMAGE_HEIGHT: 0x806e, UNPACK_SKIP_IMAGES: 0x806d,
  VERSION: 0x1f02, VENDOR: 0x1f00, RENDERER: 0x1f01, SHADING_LANGUAGE_VERSION: 0x8b8c,
  MAX_TEXTURE_SIZE: 0xd33, MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c, MAX_TEXTURE_IMAGE_UNITS: 0x8872, MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d, MAX_VERTEX_ATTRIBS: 0x8869, MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb, MAX_VARYING_VECTORS: 0x8dfc,
  MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd, MAX_SAMPLES: 0x8d57, VIEWPORT: 0xba2, SCISSOR_BOX: 0xc10,
  IMPLEMENTATION_COLOR_READ_FORMAT: 0x8b9b, IMPLEMENTATION_COLOR_READ_TYPE: 0x8b9a,
  HIGH_FLOAT: 0x8df2, MEDIUM_FLOAT: 0x8df1, LOW_FLOAT: 0x8df0,
  CURRENT_PROGRAM: 0x8b8d, ARRAY_BUFFER_BINDING: 0x8894, FRAMEBUFFER_BINDING: 0x8ca6, TEXTURE_BINDING_2D: 0x8069,
  UNIFORM_BUFFER: 0x8a11, COPY_READ_BUFFER: 0x8f36, COPY_WRITE_BUFFER: 0x8f37, PIXEL_PACK_BUFFER: 0x88eb,
  SYNC_GPU_COMMANDS_COMPLETE: 0x9117, ALREADY_SIGNALED: 0x911a, TIMEOUT_EXPIRED: 0x911b, CONDITION_SATISFIED: 0x911c, WAIT_FAILED: 0x911d,
  TEXTURE_COMPARE_MODE: 0x884c, TEXTURE_COMPARE_FUNC: 0x884d, COMPARE_REF_TO_TEXTURE: 0x884e,
  TEXTURE_MAX_LEVEL: 0x813d, TEXTURE_BASE_LEVEL: 0x813c, MAX_3D_TEXTURE_SIZE: 0x8073, MAX_ARRAY_TEXTURE_LAYERS: 0x88ff,
  RED_INTEGER: 0x8d94, RG_INTEGER: 0x8228, RGB_INTEGER: 0x8d98, RGBA_INTEGER: 0x8d99,
  UNSIGNED_SHORT_4_4_4_4: 0x8033, UNSIGNED_SHORT_5_5_5_1: 0x8034, UNSIGNED_SHORT_5_6_5: 0x8363, UNSIGNED_INT_5_9_9_9_REV: 0x8c3e, UNSIGNED_INT_10F_11F_11F_REV: 0x8c3b,
};

const TYPE: Record<string, number> = {
  float: REAL.FLOAT!, vec2: REAL.FLOAT_VEC2!, vec3: REAL.FLOAT_VEC3!, vec4: REAL.FLOAT_VEC4!,
  int: REAL.INT!, ivec2: REAL.INT_VEC2!, ivec3: REAL.INT_VEC3!, ivec4: REAL.INT_VEC4!,
  bool: REAL.BOOL!, mat2: REAL.FLOAT_MAT2!, mat3: REAL.FLOAT_MAT3!, mat4: REAL.FLOAT_MAT4!,
  sampler2D: REAL.SAMPLER_2D!, samplerCube: REAL.SAMPLER_CUBE!, sampler2DShadow: REAL.SAMPLER_2D_SHADOW!, sampler3D: REAL.SAMPLER_3D!, sampler2DArray: REAL.SAMPLER_2D_ARRAY!,
};

let nextConst = 0x20000;
const DYN: Record<string, number> = {};

export const glLog = {
  shaders: [] as Array<{ type: string; source: string }>,
  programs: 0,
  draws: 0,
  errors: [] as string[],
};

interface ProgramX {
  vs?: { source: string };
  fs?: { source: string };
  uniforms: Array<{ name: string; type: number; size: number }>;
  attribs: Array<{ name: string; type: number; size: number }>;
}

/** Strip comments and resolve the simple #if/#ifdef structure three.js emits. */
function activeDeclarations(src: string, kind: "uniform" | "attribute"): Array<{ name: string; type: number; size: number }> {
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const defines = new Set<string>();
  const stack: boolean[] = [true];
  const out: Array<{ name: string; type: number; size: number }> = [];
  const seen = new Set<string>();
  for (const rawLine of code.split("\n")) {
    const line = rawLine.trim();
    const live = stack.every(Boolean);
    let m: RegExpExecArray | null;
    if ((m = /^#define\s+(\w+)/.exec(line))) {
      if (live) defines.add(m[1]!);
      continue;
    }
    if ((m = /^#ifdef\s+(\w+)/.exec(line))) { stack.push(defines.has(m[1]!)); continue; }
    if ((m = /^#ifndef\s+(\w+)/.exec(line))) { stack.push(!defines.has(m[1]!)); continue; }
    if ((m = /^#if\s+(.*)$/.exec(line))) {
      const expr = m[1]!;
      let v = true;
      const d = /defined\s*\(\s*(\w+)\s*\)/g;
      let dm: RegExpExecArray | null;
      const terms: boolean[] = [];
      while ((dm = d.exec(expr))) terms.push(defines.has(dm[1]!));
      if (terms.length) v = expr.includes("||") ? terms.some(Boolean) : terms.every(Boolean);
      else if (/^\d+$/.test(expr.trim())) v = expr.trim() !== "0";
      stack.push(v);
      continue;
    }
    if (/^#elif/.test(line)) { const prev = stack.pop()!; stack.push(!prev); continue; }
    if (/^#else/.test(line)) { const prev = stack.pop()!; stack.push(!prev); continue; }
    if (/^#endif/.test(line)) { stack.pop(); continue; }
    if (!live) continue;
    const re = kind === "uniform"
      ? /^uniform\s+(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)\s*(\[\s*(\d+)\s*\])?\s*;/
      : /^(?:attribute|in)\s+(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)\s*;/;
    if ((m = re.exec(line))) {
      const t = TYPE[m[1]!];
      if (t === undefined) continue; // structs and arrays of structs are left out
      if (seen.has(m[2]!)) continue;
      seen.add(m[2]!);
      out.push({ name: m[4] ? `${m[2]}[0]` : m[2]!, type: t, size: m[4] ? Number(m[4]) : 1 });
    }
  }
  return out;
}

export function createWebGL2(canvas: { width: number; height: number }): unknown {
  const programs = new WeakMap<object, ProgramX>();
  const shaders = new WeakMap<object, { type: number; source: string }>();
  const ext = (name: string): unknown => {
    switch (name) {
      case "KHR_parallel_shader_compile":
      case "EXT_disjoint_timer_query_webgl2":
      case "WEBGL_multisampled_render_to_texture":
      case "OVR_multiview2":
        return null;
      case "EXT_texture_filter_anisotropic":
        return { MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff, TEXTURE_MAX_ANISOTROPY_EXT: 0x84fe };
      case "WEBGL_lose_context":
        return { loseContext() {}, restoreContext() {} };
      default:
        return {};
    }
  };
  const impl: Record<string, unknown> = {
    canvas,
    get drawingBufferWidth() {
      return canvas.width;
    },
    get drawingBufferHeight() {
      return canvas.height;
    },
    getContextAttributes: () => ({ alpha: true, antialias: true, depth: true, stencil: false, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false, desynchronized: false, xrCompatible: false }),
    isContextLost: () => false,
    getSupportedExtensions: () => ["EXT_color_buffer_float", "OES_texture_float_linear", "EXT_texture_filter_anisotropic"],
    getExtension: ext,
    getError: () => 0,
    getParameter: (p: number) => {
      switch (p) {
        case REAL.VERSION: return "WebGL 2.0 (harness)";
        case REAL.SHADING_LANGUAGE_VERSION: return "WebGL GLSL ES 3.00 (harness)";
        case REAL.VENDOR: return "harness";
        case REAL.RENDERER: return "harness";
        case REAL.VIEWPORT:
        case REAL.SCISSOR_BOX: return new Int32Array([0, 0, canvas.width, canvas.height]);
        case REAL.MAX_TEXTURE_SIZE: return 8192;
        case REAL.MAX_CUBE_MAP_TEXTURE_SIZE: return 8192;
        case REAL.MAX_3D_TEXTURE_SIZE: return 2048;
        case REAL.MAX_SAMPLES: return 4;
        case REAL.MAX_VERTEX_UNIFORM_VECTORS: return 1024;
        case REAL.MAX_FRAGMENT_UNIFORM_VECTORS: return 1024;
        case REAL.MAX_VARYING_VECTORS: return 30;
        case REAL.MAX_VERTEX_ATTRIBS: return 16;
        case REAL.MAX_TEXTURE_IMAGE_UNITS: return 16;
        case REAL.MAX_VERTEX_TEXTURE_IMAGE_UNITS: return 16;
        case REAL.MAX_COMBINED_TEXTURE_IMAGE_UNITS: return 32;
        case REAL.IMPLEMENTATION_COLOR_READ_FORMAT: return REAL.RGBA;
        case REAL.IMPLEMENTATION_COLOR_READ_TYPE: return REAL.UNSIGNED_BYTE;
        case 0x84ff: return 16;
        default: return 0;
      }
    },
    getShaderPrecisionFormat: () => ({ precision: 23, rangeMin: 127, rangeMax: 127 }),
    createShader: (type: number) => {
      const s = {};
      shaders.set(s, { type, source: "" });
      return s;
    },
    shaderSource: (s: object, src: string) => {
      shaders.get(s)!.source = src;
    },
    compileShader: (s: object) => {
      const sh = shaders.get(s)!;
      glLog.shaders.push({ type: sh.type === REAL.VERTEX_SHADER ? "vertex" : "fragment", source: sh.source });
    },
    getShaderParameter: () => true,
    getShaderInfoLog: () => "",
    getShaderSource: (s: object) => shaders.get(s)?.source ?? "",
    deleteShader: () => {},
    createProgram: () => {
      const p = {};
      programs.set(p, { uniforms: [], attribs: [] });
      glLog.programs++;
      return p;
    },
    attachShader: (p: object, s: object) => {
      const sh = shaders.get(s)!;
      const prog = programs.get(p)!;
      if (sh.type === REAL.VERTEX_SHADER) prog.vs = sh;
      else prog.fs = sh;
    },
    linkProgram: (p: object) => {
      const prog = programs.get(p)!;
      const vs = prog.vs?.source ?? "";
      const fs = prog.fs?.source ?? "";
      const u = [...activeDeclarations(vs, "uniform"), ...activeDeclarations(fs, "uniform")];
      const seen = new Set<string>();
      prog.uniforms = u.filter((x) => (seen.has(x.name) ? false : (seen.add(x.name), true)));
      prog.attribs = activeDeclarations(vs, "attribute");
    },
    getProgramParameter: (p: object, pname: number) => {
      const prog = programs.get(p)!;
      if (pname === REAL.LINK_STATUS || pname === REAL.VALIDATE_STATUS) return true;
      if (pname === REAL.ACTIVE_UNIFORMS) return prog.uniforms.length;
      if (pname === REAL.ACTIVE_ATTRIBUTES) return prog.attribs.length;
      return 0;
    },
    getProgramInfoLog: () => "",
    getActiveUniform: (p: object, i: number) => programs.get(p)!.uniforms[i] ?? null,
    getActiveAttrib: (p: object, i: number) => programs.get(p)!.attribs[i] ?? null,
    getUniformLocation: (p: object, name: string) => ({ program: p, name }),
    getAttribLocation: (p: object, name: string) => programs.get(p)!.attribs.findIndex((a) => a.name === name),
    deleteProgram: () => {},
    checkFramebufferStatus: () => REAL.FRAMEBUFFER_COMPLETE,
    fenceSync: () => ({}),
    clientWaitSync: () => REAL.CONDITION_SATISFIED,
    getSyncParameter: () => 0x9119,
    drawArrays: () => void glLog.draws++,
    drawElements: () => void glLog.draws++,
    drawArraysInstanced: () => void glLog.draws++,
    drawElementsInstanced: () => void glLog.draws++,
    readPixels: () => {},
  };
  const uniformSetter = (name: string) => (loc: unknown, ...vals: unknown[]) => {
    if (loc === undefined) glLog.errors.push(`${name} called with undefined location`);
    for (const v of vals) {
      if (typeof v === "number" && !Number.isFinite(v)) glLog.errors.push(`${name}(${(loc as { name?: string })?.name}) got non-finite ${v}`);
    }
  };
  for (const n of ["uniform1f", "uniform2f", "uniform3f", "uniform4f", "uniform1i", "uniform2i", "uniform3i", "uniform4i", "uniform1fv", "uniform2fv", "uniform3fv", "uniform4fv", "uniform1iv", "uniformMatrix3fv", "uniformMatrix4fv", "uniformMatrix2fv", "uniform1ui", "uniform1uiv"]) {
    impl[n] = uniformSetter(n);
  }
  return new Proxy(impl, {
    get(target, key: string | symbol) {
      if (typeof key === "symbol") return (target as Record<symbol, unknown>)[key];
      if (key in target) return target[key];
      if (/^[A-Z0-9_]+$/.test(key)) {
        if (REAL[key] !== undefined) return REAL[key];
        if (DYN[key] === undefined) DYN[key] = nextConst++;
        return DYN[key];
      }
      if (key.startsWith("create")) return () => ({});
      if (key.startsWith("is")) return () => true;
      return () => undefined;
    },
  });
}
