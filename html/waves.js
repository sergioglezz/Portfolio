/* ============================================================
   FONDO ANIMADO · ondas tipo menú de consola
   WebGL (shader) con fallback a Canvas 2D.
   API: Waves.init(canvas) · Waves.setTheme(nombre) · Waves.THEMES
   ============================================================ */
(function () {
  'use strict';

  // [arriba, abajo]
  const THEMES = {
    plata:   ['#8a93a3', '#23282f'],
    oro:     ['#b8962a', '#2e2105'],
    lima:    ['#7fae2a', '#182606'],
    rosa:    ['#c44f8f', '#2e071c'],
    verde:   ['#2f9a55', '#05221a'],
    morado:  ['#7b3fc4', '#17072e'],
    cian:    ['#1f9fb0', '#04252e'],
    azul:    ['#2a63c4', '#061738'],
    violeta: ['#5a4fd0', '#100d36'],
    naranja: ['#d07a22', '#2e1704'],
    granate: ['#9a2a3f', '#220509'],
    rojo:    ['#c4302a', '#2a0705'],
  };
  const MONTHS = ['plata', 'oro', 'lima', 'rosa', 'verde', 'morado', 'cian', 'azul', 'violeta', 'naranja', 'granate', 'rojo'];

  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);

  function resolve(name) {
    if (name === 'auto' || !THEMES[name]) name = MONTHS[new Date().getMonth()];
    return name;
  }

  // Brillo según la hora del día (noche más oscuro)
  function dayLight() {
    const h = new Date().getHours() + new Date().getMinutes() / 60;
    if (h >= 8 && h < 19) return 1.0;
    if (h >= 6 && h < 8) return 0.75 + 0.25 * ((h - 6) / 2);
    if (h >= 19 && h < 22) return 1.0 - 0.3 * ((h - 19) / 3);
    return 0.7;
  }

  let canvas, gl, ctx2d, prog, uni = {};
  let scale = 1, w = 0, h = 0;
  const cur = { top: [0, 0, 0], bot: [0, 0, 0] };
  const target = { top: [0, 0, 0], bot: [0, 0, 0] };
  let light = dayLight();
  const listeners = [];
  const t0 = performance.now();

  /* ---------- Shader ---------- */
  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;
  const FS = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScale;
uniform vec3 uTop;
uniform vec3 uBot;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float base(float x, float t, float ph){
  return 0.44 + 0.10*sin(x*1.55 + t*0.21 + ph)
              + 0.05*sin(x*3.10 - t*0.17 + ph*2.0)
              + 0.022*sin(x*5.30 + t*0.33 + ph*0.5);
}
float spread(float x, float t, float ph){
  return 0.075*sin(x*1.15 - t*0.12 + ph) + 0.02;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float x = uv.x * aspect;
  float t = uTime;
  float fy = gl_FragCoord.y;

  // Fondo: degradado diagonal + foco de luz
  float g = clamp(uv.y*0.75 + uv.x*0.25, 0.0, 1.0);
  vec3 col = mix(uBot, uTop, smoothstep(0.0, 1.05, g));
  vec2 c = (uv - vec2(0.72, 0.62)) * vec2(aspect, 1.0);
  col += uTop * 0.28 * exp(-dot(c, c) * 2.2);

  float lw = 1.15 * uScale;
  float lines = 0.0;
  float fill = 0.0;
  float glow = 0.0;

  for (int r = 0; r < 2; r++) {
    float ph = float(r) * 2.4;
    float b = base(x, t, ph) - float(r) * 0.06;
    float s = spread(x, t, ph) * (1.0 - float(r) * 0.35);
    float lo = 1e5; float hi = -1e5;
    for (int i = 0; i < 18; i++) {
      float f = float(i) / 17.0 - 0.5;
      float y = b + s * f + 0.010 * sin(x * 4.0 + float(i) * 0.7 + t * 0.4) * f;
      float py = y * uRes.y;
      lo = min(lo, py); hi = max(hi, py);
      float d = fy - py;
      float wgt = 0.07 + 0.22 * pow(abs(f) * 2.0, 4.0);
      lines += exp(-(d * d) / (lw * lw)) * wgt * (1.0 - float(r) * 0.35);
    }
    float px = 2.0 * uScale;
    fill += smoothstep(lo - px, lo + px, fy) * (1.0 - smoothstep(hi - px, hi + px, fy)) * (0.05 - float(r) * 0.02);
    glow += exp(-abs(fy - b * uRes.y) / (70.0 * uScale)) * (0.07 - float(r) * 0.03);
  }

  col += vec3(1.0) * (lines * 0.6 + fill + glow);

  // Destellos que flotan cerca de la onda
  vec2 gp = uv * vec2(aspect, 1.0) * 26.0;
  gp.x += t * 0.25;
  gp.y += sin(t * 0.2 + uv.x * 3.0) * 0.4;
  vec2 id = floor(gp);
  vec2 fr = fract(gp) - 0.5;
  float hh = hash(id);
  vec2 o = vec2(hash(id + 1.3), hash(id + 7.1)) - 0.5;
  float sp = step(0.9, hh) * smoothstep(0.09, 0.0, length(fr - o * 0.7));
  sp *= 0.5 + 0.5 * sin(t * 1.7 + hh * 60.0);
  sp *= exp(-abs(uv.y - base(x, t, 0.0)) * 7.0);
  col += sp * 0.9;

  // Viñeta
  col *= 1.0 - 0.38 * length((uv - 0.5) * vec2(1.0, 1.2));
  gl_FragColor = vec4(col, 1.0);
}`;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function initGL() {
    gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return false;
    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) { gl = null; return false; }
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl = null; return false; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ['uRes', 'uTime', 'uScale', 'uTop', 'uBot'].forEach(n => (uni[n] = gl.getUniformLocation(prog, n)));
    return true;
  }

  function resize() {
    const cw = window.innerWidth, ch = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Limitar píxeles para que vaya fluido en pantallas grandes
    scale = Math.min(dpr, Math.sqrt(2400000 / (cw * ch)));
    w = Math.round(cw * scale);
    h = Math.round(ch * scale);
    canvas.width = w;
    canvas.height = h;
    if (gl) gl.viewport(0, 0, w, h);
  }

  function lerpColors() {
    const k = 0.035;
    for (let i = 0; i < 3; i++) {
      cur.top[i] += (target.top[i] * light - cur.top[i]) * k;
      cur.bot[i] += (target.bot[i] * light - cur.bot[i]) * k;
    }
  }

  function frameGL(t) {
    gl.uniform2f(uni.uRes, w, h);
    gl.uniform1f(uni.uTime, t);
    gl.uniform1f(uni.uScale, scale);
    gl.uniform3fv(uni.uTop, cur.top);
    gl.uniform3fv(uni.uBot, cur.bot);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /* ---------- Fallback Canvas 2D ---------- */
  const rgb = a => `rgb(${a.map(v => Math.round(Math.min(1, v) * 255)).join(',')})`;
  function frame2D(t) {
    const g = ctx2d.createLinearGradient(0, 0, w * 0.3, h);
    g.addColorStop(0, rgb(cur.top));
    g.addColorStop(1, rgb(cur.bot));
    ctx2d.fillStyle = g;
    ctx2d.fillRect(0, 0, w, h);
    const aspect = w / h;
    ctx2d.lineWidth = scale;
    for (let r = 0; r < 2; r++) {
      const ph = r * 2.4;
      for (let i = 0; i < 12; i++) {
        const f = i / 11 - 0.5;
        ctx2d.strokeStyle = `rgba(255,255,255,${0.08 + 0.25 * Math.pow(Math.abs(f) * 2, 4)})`;
        ctx2d.beginPath();
        for (let px = 0; px <= w; px += 10) {
          const x = (px / w) * aspect;
          const b = 0.44 + 0.1 * Math.sin(x * 1.55 + t * 0.21 + ph) + 0.05 * Math.sin(x * 3.1 - t * 0.17 + ph * 2) - r * 0.06;
          const s = 0.075 * Math.sin(x * 1.15 - t * 0.12 + ph) + 0.02;
          const y = h - (b + s * f) * h;
          px === 0 ? ctx2d.moveTo(px, y) : ctx2d.lineTo(px, y);
        }
        ctx2d.stroke();
      }
    }
  }

  function loop() {
    const t = ((performance.now() - t0) / 1000) * (reduced ? 0.12 : 1) + 40.0;
    lerpColors();
    if (gl) frameGL(t);
    else if (ctx2d) frame2D(t);
    requestAnimationFrame(loop);
  }

  const Waves = {
    THEMES,
    current: 'auto',
    init(el, themeName) {
      canvas = el;
      if (!initGL()) ctx2d = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
      this.setTheme(themeName || 'auto', true);
      setInterval(() => { light = dayLight(); }, 60000);
      requestAnimationFrame(loop);
    },
    setTheme(name, instant) {
      this.current = THEMES[name] ? name : 'auto';
      const [top, bot] = THEMES[resolve(this.current)];
      target.top = hex(top);
      target.bot = hex(bot);
      if (instant) {
        cur.top = target.top.map(v => v * light);
        cur.bot = target.bot.map(v => v * light);
      }
      listeners.forEach(fn => fn(top, bot));
    },
    // Avisa cuando cambia el color del tema (y una vez al suscribirse)
    onTheme(fn) {
      listeners.push(fn);
      const [top, bot] = THEMES[resolve(this.current)];
      fn(top, bot);
    },
    colors() { return THEMES[resolve(this.current)]; },
    resolvedName() { return resolve(this.current); },
  };

  window.Waves = Waves;
})();
