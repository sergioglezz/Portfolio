/* ============================================================
   CURSOR PERSONALIZADO + ESTELA (estilo Frutiger Aero)
   - Flecha de cristal brillante (sigue al ratón exacto)
   - Anillo-burbuja que la persigue con retardo y crece sobre lo clicable
   - Estela de luz + destellos al mover
   - Explosión de burbujas al hacer clic
   Solo en dispositivos con ratón. API: window.Cursor.toggle()
   ============================================================ */
(function () {
  'use strict';

  const mq = q => window.matchMedia && matchMedia(q).matches;
  const fine = mq('(hover: hover) and (pointer: fine)');
  const reduced = mq('(prefers-reduced-motion: reduce)');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  };

  const Cursor = {
    supported: fine,
    enabled: fine && store.get('xmb-cursor', '1') === '1',
    toggle(v) {
      if (!fine) return;
      this.enabled = typeof v === 'boolean' ? v : !this.enabled;
      store.set('xmb-cursor', this.enabled ? '1' : '0');
      apply();
    },
  };
  window.Cursor = Cursor;
  if (!fine) return;

  const CLICKABLE = 'a, button, .cat, .item, .swatch, .lang-btn, [role="button"]';

  /* ---------- DOM ---------- */
  const canvas = document.createElement('canvas');
  canvas.id = 'trail';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  const arrow = document.createElement('div');
  arrow.id = 'cursor';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = `
    <svg viewBox="0 0 26 30" width="26" height="30">
      <defs>
        <linearGradient id="cur-body" x1="0" y1="0" x2=".55" y2="1">
          <stop offset="0" style="stop-color:var(--tint-hi)"/><stop offset=".5" style="stop-color:var(--tint)"/><stop offset="1" style="stop-color:var(--tint-lo)"/>
        </linearGradient>
        <linearGradient id="cur-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M3 2.5V23l5.6-5 3.8 8.6 4.2-1.8-3.7-8.4h7.6z" fill="url(#cur-body)" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M4.7 5.6v8.6l7-.9z" fill="url(#cur-gloss)" opacity=".9"/>
    </svg>`;

  function mount() {
    document.body.append(canvas, ring, arrow);
    resize();
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  /* ---------- Sprite de burbuja (pre-renderizado) ---------- */
  const bubble = document.createElement('canvas');
  (function makeBubble() {
    const S = 64, r = 29;
    bubble.width = bubble.height = S;
    const b = bubble.getContext('2d');
    const g = b.createRadialGradient(S / 2, S / 2, r * 0.2, S / 2, S / 2, r);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.7, 'rgba(190,240,255,0.10)');
    g.addColorStop(0.92, 'rgba(210,248,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0.0)');
    b.fillStyle = g;
    b.beginPath(); b.arc(S / 2, S / 2, r, 0, Math.PI * 2); b.fill();
    b.strokeStyle = 'rgba(255,255,255,0.75)';
    b.lineWidth = 1.6;
    b.beginPath(); b.arc(S / 2, S / 2, r - 1, 0, Math.PI * 2); b.stroke();
    // reflejo
    b.fillStyle = 'rgba(255,255,255,0.9)';
    b.beginPath(); b.ellipse(S / 2 - 10, S / 2 - 11, 8, 4.5, -0.7, 0, Math.PI * 2); b.fill();
    b.fillStyle = 'rgba(255,255,255,0.5)';
    b.beginPath(); b.arc(S / 2 + 12, S / 2 + 11, 2.5, 0, Math.PI * 2); b.fill();
  })();

  /* ---------- Estado ---------- */
  let W = 0, H = 0, dpr = 1;
  let mx = -200, my = -200, rx = -200, ry = -200;
  let visible = false, hovering = false, pressed = false;
  let lastX = null, lastY = null, travel = 0;
  const trail = [];   // puntos de la estela de luz
  const parts = [];   // burbujas, destellos y ondas
  const MAX_PARTS = 180;
  let running = false, lastT = 0;
  let glow = '120, 220, 255';   // color del halo de la estela (se sincroniza con el tema)
  if (window.Waves && Waves.onTheme) {
    Waves.onTheme(top => {
      const c = [1, 3, 5].map(i => parseInt(top.slice(i, i + 2), 16));
      glow = c.map(v => Math.round(v + (255 - v) * 0.35)).join(', ');
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);

  function apply() {
    const on = Cursor.enabled;
    document.documentElement.classList.toggle('custom-cursor', on);
    if (!on) {
      trail.length = 0; parts.length = 0;
      ctx.clearRect(0, 0, W, H);
      setVisible(false);
    }
  }

  function setVisible(v) {
    visible = v;
    arrow.classList.toggle('show', v && Cursor.enabled);
    ring.classList.toggle('show', v && Cursor.enabled);
  }

  const rand = (a, b) => a + Math.random() * (b - a);

  function spawnSpark(x, y) {
    if (parts.length >= MAX_PARTS) parts.shift();
    parts.push({ k: 'spark', x: x + rand(-10, 10), y: y + rand(-10, 10), vx: rand(-0.3, 0.3), vy: rand(-0.5, 0.1), r: rand(2.5, 5), life: 0, max: rand(500, 900), ph: rand(0, 6.28) });
  }
  function spawnWave(x, y) {
    parts.push({ k: 'wave', x, y, r: 4, life: 0, max: 650 });
  }

  /* ---------- Eventos ---------- */
  window.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || !Cursor.enabled) return;
    mx = e.clientX; my = e.clientY;
    if (!visible) { rx = mx; ry = my; setVisible(true); }
    hovering = !!(e.target.closest && e.target.closest(CLICKABLE));
    ring.classList.toggle('hover', hovering);
    arrow.classList.toggle('hover', hovering);

    if (!reduced) {
      const now = performance.now();
      trail.push({ x: mx, y: my, t: now });
      if (lastX !== null) {
        const dx = mx - lastX, dy = my - lastY;
        travel += Math.hypot(dx, dy);
        while (travel > 16) {
          travel -= 16;
          // Al mover solo hay estela de luz y algún destello; las burbujas salen al hacer clic
          if (Math.random() < 0.3) spawnSpark(mx, my);
        }
      }
      lastX = mx; lastY = my;
    }
    start();
  }, { passive: true });

  window.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || !Cursor.enabled) return;
    pressed = true;
    ring.classList.add('down');
    if (!reduced) {
      spawnWave(e.clientX, e.clientY);
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2 + rand(-0.2, 0.2);
        const sp = rand(1.5, 4);
        if (parts.length >= MAX_PARTS) parts.shift();
        parts.push({ k: 'bubble', x: e.clientX, y: e.clientY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.6, r: rand(3, 9), life: 0, max: rand(700, 1200), ph: rand(0, 6.28) });
      }
      for (let i = 0; i < 6; i++) spawnSpark(e.clientX, e.clientY);
    }
    start();
  }, { passive: true });

  window.addEventListener('pointerup', () => { pressed = false; ring.classList.remove('down'); });
  document.addEventListener('mouseout', e => { if (!e.relatedTarget) { setVisible(false); lastX = lastY = null; } });
  window.addEventListener('blur', () => setVisible(false));

  /* ---------- Bucle ---------- */
  function start() {
    if (running) return;
    running = true;
    lastT = performance.now();
    requestAnimationFrame(loop);
  }

  function loop(now) {
    const dt = Math.min(50, now - lastT);
    lastT = now;
    const f = dt / 16.67;

    // Flecha: posición exacta · anillo: con retardo suave
    rx += (mx - rx) * (1 - Math.exp(-dt / 70));
    ry += (my - ry) * (1 - Math.exp(-dt / 70));
    arrow.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // Estela de luz
    const LIFE = 320;
    while (trail.length && now - trail[0].t > LIFE) trail.shift();
    if (trail.length > 1) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1], b = trail[i];
          const k = 1 - (now - b.t) / LIFE;
          if (k <= 0) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          if (pass === 0) {
            ctx.strokeStyle = `rgba(${glow}, ${0.22 * k})`;
            ctx.lineWidth = 4 + 14 * k;
          } else {
            ctx.strokeStyle = `rgba(235, 252, 255, ${0.75 * k})`;
            ctx.lineWidth = 0.8 + 3.2 * k;
          }
          ctx.stroke();
        }
      }
    }

    // Partículas
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      const t = p.life / p.max;
      if (t >= 1) { parts.splice(i, 1); continue; }

      if (p.k === 'bubble') {
        p.vx *= Math.pow(0.97, f);
        p.vy = p.vy * Math.pow(0.97, f) - 0.025 * f;          // flotan hacia arriba
        p.x += (p.vx + Math.sin(p.ph + p.life / 180) * 0.25) * f;
        p.y += p.vy * f;
        const grow = t < 0.15 ? t / 0.15 : 1;
        const pop = t > 0.85 ? 1 + (t - 0.85) * 2.5 : 1;     // se hinchan antes de explotar
        const s = p.r * 2 * grow * pop;
        ctx.globalAlpha = (t > 0.85 ? (1 - t) / 0.15 : 1) * 0.9;
        ctx.drawImage(bubble, p.x - s / 2, p.y - s / 2, s, s);
      } else if (p.k === 'spark') {
        p.x += p.vx * f; p.y += p.vy * f;
        const a = Math.sin(t * Math.PI);
        const s = p.r * (0.6 + 0.4 * Math.sin(p.ph + p.life / 60));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s * 2);
        ctx.quadraticCurveTo(p.x, p.y, p.x + s * 2, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s * 2);
        ctx.quadraticCurveTo(p.x, p.y, p.x - s * 2, p.y);
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s * 2);
        ctx.fill();
      } else if (p.k === 'wave') {
        const e = 1 - Math.pow(1 - t, 3);
        ctx.globalAlpha = (1 - t) * 0.8;
        ctx.strokeStyle = `rgb(${glow})`;
        ctx.lineWidth = 2.5 * (1 - t) + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 + 46 * e, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    const settled = Math.abs(mx - rx) < 0.3 && Math.abs(my - ry) < 0.3;
    if (!parts.length && !trail.length && settled) { running = false; return; }
    requestAnimationFrame(loop);
  }
})();
