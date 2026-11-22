/* ============================================================
   PORTFOLIO · motor del menú (halo 3D), arranque, idiomas y sonido
   Contenido en data.js · textos de interfaz en i18n.js
   ============================================================ */
(function () {
  'use strict';

  const DATA = window.PORTFOLIO;
  const I = window.I18N;
  const $ = (s, r = document) => r.querySelector(s);
  const body = document.body;
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const safe = store => ({
    get(k, d) { try { const v = store().getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { store().setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  });
  const local = safe(() => window.localStorage);
  const session = safe(() => window.sessionStorage);

  /* ============================================================
     IDIOMA
     ============================================================ */
  let LANG = local.get('xmb-lang', I.defaultLang);
  if (!I.ui[LANG]) LANG = I.defaultLang;

  // Traduce un valor: string → igual; {en, es, ...} → el idioma actual (o inglés)
  const tr = v => {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v)) return v[LANG] != null ? v[LANG] : (v.en != null ? v.en : Object.values(v)[0]);
    return v;
  };
  const trList = v => { const x = tr(v); return Array.isArray(x) ? x.map(tr) : x ? [x] : []; };
  const ui = k => (I.ui[LANG] && I.ui[LANG][k]) || I.ui.en[k] || k;
  const langName = code => (I.languages.find(l => l.code === code) || {}).name || code;

  function applyStaticTexts() {
    document.documentElement.lang = LANG;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = ui(el.dataset.i18n); });
    $('.panel-close').setAttribute('aria-label', ui('close'));
  }

  /* ============================================================
     ICONOS
     - Glifos de trazo (48×48)
     - xmbIcon(): icono sólido plateado estilo consola
     ============================================================ */
  const F = 'fill="rgba(255,255,255,.2)"';       // relleno sutil (duotono)
  const D = 'fill="#fff" stroke="none"';          // punto sólido
  const ICONS = {
    user: `<circle cx="24" cy="17" r="7" ${F}/><path d="M10 40c1.6-7.4 7.2-11.5 14-11.5S36.4 32.6 38 40"/>`,
    folder: `<path d="M7 15a3 3 0 0 1 3-3h9l4 4.5h15a3 3 0 0 1 3 3V35a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3z" ${F}/>`,
    chip: `<rect x="14" y="14" width="20" height="20" rx="4" ${F}/><rect x="20" y="20" width="8" height="8" rx="1.5"/><path d="M19 8v6M29 8v6M19 34v6M29 34v6M8 19h6M8 29h6M34 19h6M34 29h6"/>`,
    briefcase: `<rect x="7" y="15" width="34" height="24" rx="4" ${F}/><path d="M18 15v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M7 25h34"/>`,
    cap: `<path d="M5 19l19-9 19 9-19 9z" ${F}/><path d="M13 23.5V31c0 2.8 5 5 11 5s11-2.2 11-5v-7.5M43 19v10"/>`,
    mail: `<rect x="7" y="12" width="34" height="24" rx="4" ${F}/><path d="M9 15l15 11 15-11"/>`,
    gear: `<circle cx="24" cy="24" r="12" ${F}/><circle cx="24" cy="24" r="5"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M11.3 36.7l3.5-3.5M33.2 14.8l3.5-3.5"/>`,
    star: `<path d="M24 8l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L24 32l-9.4 5.1 1.8-10.5-7.7-7.5 10.6-1.5z" ${F}/>`,
    heart: `<path d="M24 39S8.5 30 8.5 19.5A8 8 0 0 1 24 15.5a8 8 0 0 1 15.5 4C39.5 30 24 39 24 39z" ${F}/>`,
    image: `<rect x="7" y="10" width="34" height="28" rx="4" ${F}/><circle cx="17.5" cy="19.5" r="3"/><path d="M8 33l10-8.5 7.5 6.5 5-4 9.5 8"/>`,
    code: '<path d="M17 15l-9 9 9 9M31 15l9 9-9 9M27 11l-6 26"/>',
    server: `<rect x="9" y="9" width="30" height="12" rx="3" ${F}/><rect x="9" y="27" width="30" height="12" rx="3" ${F}/><circle cx="15" cy="15" r="1.6" ${D}/><circle cx="15" cy="33" r="1.6" ${D}/><path d="M23 15h10M23 33h10"/>`,
    monitor: `<rect x="6" y="9" width="36" height="24" rx="4" ${F}/><path d="M18 40h12M24 33v7"/>`,
    cube: `<path d="M24 6l16 9v18l-16 9-16-9V15z" ${F}/><path d="M8 15l16 9 16-9M24 24v18"/>`,
    gamepad: `<path d="M16 15h16c6 0 10.5 4.6 10.5 10.6 0 1-.1 1.9-.4 2.8l-1.6 6c-.9 3.4-5.3 4.3-7.4 1.5L30 31H18l-3.1 4.9c-2.1 2.8-6.5 1.9-7.4-1.5l-1.6-6A10.6 10.6 0 0 1 16 15z" ${F}/><path d="M16 20.5v6M13 23.5h6"/><circle cx="31" cy="21.5" r="1.5" ${D}/><circle cx="34.5" cy="25.5" r="1.5" ${D}/>`,
    globe: `<circle cx="24" cy="24" r="16" ${F}/><path d="M8 24h32M24 8c4.5 4.6 6.8 10 6.8 16S28.5 35.4 24 40c-4.5-4.6-6.8-10-6.8-16S19.5 12.6 24 8z"/>`,
    book: `<path d="M24 13c-4-3-9.5-3.8-16-3v27c6.5-.8 12 0 16 3 4-3 9.5-3.8 16-3V10c-6.5-.8-12 0-16 3z" ${F}/><path d="M24 13v27"/>`,
    award: `<circle cx="24" cy="19" r="10" ${F}/><path d="M18.5 27.5L16 41l8-4 8 4-2.5-13.5"/>`,
    file: `<path d="M13 6h15l8 8v28H13z" ${F}/><path d="M28 6v8h8M19 24h11M19 30h11M19 36h7"/>`,
    card: `<rect x="7" y="11" width="34" height="26" rx="4" ${F}/><circle cx="17" cy="21" r="3.5"/><path d="M11.5 31c1-3 3-4.5 5.5-4.5s4.5 1.5 5.5 4.5M28 20h8M28 26h8"/>`,
    branch: '<circle cx="15" cy="11" r="3.5"/><circle cx="15" cy="37" r="3.5"/><circle cx="33" cy="17" r="3.5"/><path d="M15 14.5v19M33 20.5c0 8-8 8-15.5 13"/>',
    sound: `<path d="M9 19h6l9-7v24l-9-7H9z" ${F}/><path d="M30 19c1.7 1.5 2.5 3.2 2.5 5s-.8 3.5-2.5 5M34.5 14.5c3 2.6 4.5 5.8 4.5 9.5s-1.5 6.9-4.5 9.5"/>`,
    mute: `<path d="M9 19h6l9-7v24l-9-7H9z" ${F}/><path d="M31 20l8 8M39 20l-8 8"/>`,
    palette: `<path d="M24 7C14.6 7 7 14 7 23c0 8.5 6.5 14 14 14 2.3 0 3.3-1.4 3.3-3 0-2.1-1.7-2.6-1.7-4.5 0-1.5 1.2-2.6 2.8-2.6H30c6 0 11-4 11-9.6C41 11.6 33.4 7 24 7z" ${F}/><circle cx="15.5" cy="21" r="2" ${D}/><circle cx="20.5" cy="14" r="2" ${D}/><circle cx="28.5" cy="13" r="2" ${D}/><circle cx="34" cy="18.5" r="2" ${D}/>`,
    power: '<path d="M24 8v15"/><path d="M15.5 14a14 14 0 1 0 17 0"/>',
    info: `<circle cx="24" cy="24" r="16" ${F}/><path d="M24 22v10"/><circle cx="24" cy="16" r="1.8" ${D}/>`,
    rocket: `<path d="M24 6c6.5 4.8 9.3 12.3 7.5 21.5h-15C14.7 18.3 17.5 10.8 24 6z" ${F}/><circle cx="24" cy="18" r="3"/><path d="M16.5 27.5L11 33l6.5.5M31.5 27.5L37 33l-6.5.5M21 32l3 8 3-8"/>`,
    database: `<ellipse cx="24" cy="12" rx="14" ry="5" ${F}/><path d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5"/>`,
    wrench: `<path d="M29.5 9a9.5 9.5 0 0 0-9 12.3L8.5 33.3a3.3 3.3 0 0 0 4.7 4.7L25.2 26A9.5 9.5 0 0 0 38.5 17l-5.7 1.2-3.1-3.1L31 9.3a9.5 9.5 0 0 0-1.5-.3z" ${F}/>`,
    phone: `<rect x="14" y="5" width="20" height="38" rx="4" ${F}/><path d="M21 37h6"/>`,
    cursor: `<path d="M14 7v28l7-6.2 5.2 11.8 5-2.2-5.1-11.5H35z" ${F}/>`,
    translate: '<path d="M6 11h18M15 7v4M10.5 11c1 5.5 4.6 10 10 12M19.5 11c-1 5.6-5.4 11-12 13.5"/><path d="M25 41l7.5-18L40 41M27.8 35h9.4"/>',
    dot: '<circle cx="24" cy="24" r="6"/>',
  };

  // Icono de línea simple (botones pequeños)
  const icon = (name, sw) =>
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="${sw || 2.2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.dot}</svg>`;

  /* ---------- Iconos estilo consola (XMB) ----------
     Siluetas sólidas con degradado blanco → plata, detalles en gris
     y un brillo suave (CSS). Cada icono tiene:
       b: formas rellenas (cuerpo)   s: trazos gruesos plateados
       d: detalles grabados en gris  dw: grosor de los detalles */
  const SOLID = {
    gear: { b: '<path d="M20.5 5h7l1.3 5.6 3.6 2.1 5.4-1.9 3.5 6.1-4.3 3.8v4.6l4.3 3.8-3.5 6.1-5.4-1.9-3.6 2.1L27.5 43h-7l-1.3-5.6-3.6-2.1-5.4 1.9-3.5-6.1 4.3-3.8v-4.6l-4.3-3.8 3.5-6.1 5.4 1.9 3.6-2.1zM24 17.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13z"/>' },
    user: { b: '<circle cx="24" cy="14.5" r="8.5"/><path d="M7 42c0-9.5 7.6-15 17-15s17 5.5 17 15z"/>' },
    folder: { b: '<path d="M5 13a3 3 0 0 1 3-3h10.5l4 4.5H40a3 3 0 0 1 3 3V37a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"/>', d: '<path d="M6 19.5h36"/>' },
    chip: {
      b: '<rect x="12" y="12" width="24" height="24" rx="3.5"/><path d="M17 5h3v6h-3zM22.5 5h3v6h-3zM28 5h3v6h-3zM17 37h3v6h-3zM22.5 37h3v6h-3zM28 37h3v6h-3zM5 17h6v3H5zM5 22.5h6v3H5zM5 28h6v3H5zM37 17h6v3h-6zM37 22.5h6v3h-6zM37 28h6v3h-6z"/>',
      d: '<rect x="18.5" y="18.5" width="11" height="11" rx="1.5"/>',
    },
    briefcase: { b: '<path d="M16.5 15v-3.5A3.5 3.5 0 0 1 20 8h8a3.5 3.5 0 0 1 3.5 3.5V15H28v-3.5h-8V15z"/><rect x="5" y="15" width="38" height="25" rx="3.5"/>', d: '<path d="M6 25.5h36"/><rect x="21" y="23" width="6" height="5" rx="1"/>' },
    cap: { b: '<path d="M3 18.5L24 9l21 9.5L24 28z"/><path d="M11.5 23.5V31c0 3.3 5.6 6 12.5 6s12.5-2.7 12.5-6v-7.5L24 29.2z"/><rect x="41.5" y="20.5" width="2.2" height="11"/><circle cx="42.6" cy="33" r="2.4"/>' },
    mail: { b: '<rect x="4" y="10" width="40" height="28" rx="3.5"/>', d: '<path d="M6.5 13l17.5 13.5L41.5 13"/>' },
    star: { b: '<path d="M24 4.5l5.8 11.8 13 1.9-9.4 9.2 2.2 13L24 34.2l-11.6 6.2 2.2-13-9.4-9.2 13-1.9z"/>' },
    heart: { b: '<path d="M24 41S5.5 30.5 5.5 18A9.5 9.5 0 0 1 24 13.5 9.5 9.5 0 0 1 42.5 18C42.5 30.5 24 41 24 41z"/>' },
    image: { b: '<rect x="4" y="8" width="40" height="32" rx="3.5"/>', d: '<circle cx="15.5" cy="18" r="3.5"/><path d="M7 35l10-9 8 7 6-5 10 8.5"/>' },
    code: { s: '<path d="M15 13L4.5 24 15 35M33 13l10.5 11L33 35M28 8l-8 32"/>' },
    server: { b: '<rect x="6" y="6" width="36" height="15" rx="3"/><rect x="6" y="27" width="36" height="15" rx="3"/>', d: '<path d="M12.5 13.5h.01M12.5 34.5h.01M21 13.5h14M21 34.5h14"/>', dw: 2.8 },
    monitor: { b: '<rect x="3" y="7" width="42" height="27" rx="3"/><path d="M19.5 34h9l1.5 5.5h-12z"/><rect x="13" y="39" width="22" height="3" rx="1.5"/>', d: '<rect x="7" y="11" width="34" height="19" rx="1"/>' },
    cube: { b: '<path d="M24 3.5l18.5 10.3v20.4L24 44.5 5.5 34.2V13.8z"/>', d: '<path d="M6.5 14L24 24l17.5-10M24 24v19.5"/>' },
    gamepad: {
      b: '<path d="M15 13h18c7 0 12 5.3 12 12.2 0 1.1-.1 2.2-.4 3.2l-1.9 7c-1.1 4-6.3 5-8.7 1.8L30.5 32h-13l-3.5 5.2c-2.4 3.2-7.6 2.2-8.7-1.8l-1.9-7A12.2 12.2 0 0 1 15 13z"/>',
      d: '<path d="M15 19v8M11 23h8"/><circle cx="31.5" cy="20.5" r="1.3"/><circle cx="35.5" cy="25" r="1.3"/>',
    },
    globe: { b: '<circle cx="24" cy="24" r="19"/>', d: '<path d="M6 24h36M24 5.5c5 5 7.8 11.4 7.8 18.5S29 37.5 24 42.5c-5-5-7.8-11.4-7.8-18.5S19 10.5 24 5.5zM9 14.5h30M9 33.5h30"/>', dw: 1.8 },
    book: { b: '<path d="M23 11.5C18.5 8.3 12 7.4 4 8.3v30c8-.9 14.5 0 19 3.2zM25 11.5c4.5-3.2 11-4.1 19-3.2v30c-8-.9-14.5 0-19 3.2z"/>' },
    award: { b: '<circle cx="24" cy="18" r="13"/><path d="M16.5 28.5L13 44l11-5.5L35 44l-3.5-15.5A15 15 0 0 1 24 31a15 15 0 0 1-7.5-2.5z"/>', d: '<circle cx="24" cy="18" r="8"/>' },
    file: { b: '<path d="M10 4h18l10 10v30H10z"/>', d: '<path d="M28 5v9h9M16 23h16M16 29h16M16 35h10"/>' },
    card: { b: '<rect x="3" y="9" width="42" height="30" rx="3.5"/>', d: '<circle cx="15" cy="21" r="4.5"/><path d="M8 33c1.2-4 3.8-6 7-6s5.8 2 7 6M27.5 19h11M27.5 25h11M27.5 31h7"/>' },
    branch: { s: '<circle cx="13" cy="9.5" r="4.5"/><circle cx="13" cy="38.5" r="4.5"/><circle cx="35" cy="16" r="4.5"/><path d="M13 14v20M35 20.5c0 9-9.5 9-19 14"/>' },
    sound: { b: '<path d="M5 17h8l12-9.5v33L13 31H5z"/>', s: '<path d="M30.5 17.5c2 1.8 3 4 3 6.5s-1 4.7-3 6.5M36 12c3.8 3.2 5.8 7.3 5.8 12S39.8 32.8 36 36"/>' },
    palette: {
      b: '<path d="M24 4C13 4 4 12.2 4 22.6c0 9.9 7.6 16.4 16.4 16.4 2.7 0 3.9-1.6 3.9-3.5 0-2.5-2-3-2-5.3 0-1.8 1.4-3 3.3-3h5.4C38 27.2 44 22.6 44 16 44 9.3 35 4 24 4z"/>',
      d: '<circle cx="13.5" cy="21" r="2.2"/><circle cx="19" cy="12.5" r="2.2"/><circle cx="28.5" cy="11.5" r="2.2"/><circle cx="35" cy="18" r="2.2"/>',
    },
    power: { s: '<path d="M24 5v18"/><path d="M13.5 12a16 16 0 1 0 21 0"/>' },
    info: { b: '<circle cx="24" cy="24" r="19"/>', d: '<path d="M24 21.5v12M24 15v.4"/>', dw: 3.6 },
    rocket: { b: '<path d="M24 3c8 5.8 11.4 15 9.3 26.5H14.7C12.6 18 16 8.8 24 3z"/><path d="M14.5 21.5L8 29v8l7.5-4.5zM33.5 21.5L40 29v8l-7.5-4.5z"/><path d="M19.5 32.5h9L24 44z"/>', d: '<circle cx="24" cy="16.5" r="3.6"/>' },
    database: { b: '<path d="M7 10c0-3.6 7.6-6.5 17-6.5S41 6.4 41 10v28c0 3.6-7.6 6.5-17 6.5S7 41.6 7 38z"/>', d: '<path d="M7.5 10c0 3.6 7.4 6.5 16.5 6.5S40.5 13.6 40.5 10M7.5 24c0 3.6 7.4 6.5 16.5 6.5S40.5 27.6 40.5 24"/>' },
    wrench: { b: '<path d="M31 4a11 11 0 0 0-10.4 14.4L5.6 33.4a4 4 0 0 0 5.6 5.7l15-15A11 11 0 0 0 43 13.5l-6.6 1.4-3.7-3.7L34 4.6A11 11 0 0 0 31 4z"/>' },
    phone: { b: '<rect x="12" y="3" width="24" height="42" rx="4.5"/>', d: '<rect x="15.5" y="8" width="17" height="28" rx="1"/><path d="M21.5 40.5h5"/>' },
    cursor: { b: '<path d="M12 4v33l8.5-7.5 6.2 14 6-2.7-6.2-13.8H38z"/>' },
    translate: {
      b: '<path d="M6 5h20a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H15l-6 5.5V24H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"/><path d="M23 26h19a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3v5l-6-5H23a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z"/>',
      d: '<path d="M10 20l6-11 6 11M12.2 16h7.6M26 32h13M26 36.5h8"/>',
    },
    cloud: { b: '<path d="M13 38a9.5 9.5 0 0 1-1.6-18.9A13 13 0 0 1 36.3 16.4 10.8 10.8 0 0 1 36 38z"/>' },
    pipeline: { b: '<circle cx="8.5" cy="24" r="5.5"/><circle cx="24" cy="24" r="5.5"/><circle cx="39.5" cy="24" r="5.5"/>', s: '<path d="M14.5 24h3.5M30 24h3.5M8.5 15v-4h31v4"/>' },
    chart: { b: '<rect x="5" y="27" width="9" height="15" rx="1.5"/><rect x="19.5" y="17" width="9" height="25" rx="1.5"/><rect x="34" y="7" width="9" height="35" rx="1.5"/>' },
    cards: {
      b: '<path d="M5.6 13.2l9.4-2.6v29.6l-3 .8a3 3 0 0 1-3.7-2.1L3.5 16.9a3 3 0 0 1 2.1-3.7z"/><rect x="17" y="6" width="26" height="36" rx="3.5"/>',
      d: '<path d="M30 30s-6.5-3.8-6.5-8.2a3.3 3.3 0 0 1 6.5-1.2 3.3 3.3 0 0 1 6.5 1.2C36.5 26.2 30 30 30 30z"/>',
    },
    location: { b: '<path d="M24 45S9 30 9 19a15 15 0 0 1 30 0c0 11-15 26-15 26zM24 13.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 1 0 0-11z"/>' },
  };

  function injectIconDefs() {
    const s = '<svg class="icon-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>'
      + '<linearGradient id="x-fill" gradientUnits="userSpaceOnUse" x1="0" y1="3" x2="0" y2="45">'
      + '<stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#eef2f6"/><stop offset="1" stop-color="#a5afbb"/></linearGradient>'
      + '</defs></svg>';
    body.insertAdjacentHTML('afterbegin', s);
  }

  function xmbIcon(name) {
    const g = SOLID[name] || { s: (ICONS[name] || ICONS.dot).replace(/fill="[^"]*"/g, 'fill="none"') };
    return '<svg class="xi" viewBox="0 0 48 48" aria-hidden="true">'
      + (g.b ? `<g fill="url(#x-fill)" stroke="url(#x-fill)" stroke-width="1" stroke-linejoin="round" fill-rule="evenodd">${g.b}</g>` : '')
      + (g.s ? `<g fill="none" stroke="url(#x-fill)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">${g.s}</g>` : '')
      + (g.d ? `<g fill="none" stroke="#56616f" stroke-opacity=".7" stroke-width="${g.dw || 2.2}" stroke-linecap="round" stroke-linejoin="round">${g.d}</g>` : '')
      + '</svg>';
  }

  // Colores del tema (cursor, burbujas de idioma…)
  const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mixRgb = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgbStr = a => `rgb(${a.join(',')})`;
  function setTint(top, bottom) {
    const T = hexRgb(top), B = hexRgb(bottom);
    const st = document.documentElement.style;
    st.setProperty('--tint-hi', rgbStr(mixRgb(T, [255, 255, 255], 0.5)));
    st.setProperty('--tint', rgbStr(mixRgb(T, [255, 255, 255], 0.08)));
    st.setProperty('--tint-lo', rgbStr(mixRgb(T, B, 0.6)));
  }

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ============================================================
     SONIDO (Web Audio, sintetizado)
     ============================================================ */
  const Sound = {
    ctx: null,
    master: null,
    on: local.get('xmb-sound', '1') === '1',
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.on ? 0.55 : 0;
      const comp = this.ctx.createDynamicsCompressor();
      this.master.connect(comp).connect(this.ctx.destination);
    },
    toggle(v) {
      this.on = typeof v === 'boolean' ? v : !this.on;
      local.set('xmb-sound', this.on ? '1' : '0');
      if (this.master) this.master.gain.setTargetAtTime(this.on ? 0.55 : 0, this.ctx.currentTime, 0.05);
      updateMuteBtn();
    },
    tone(freq, { type = 'sine', dur = 0.12, vol = 0.12, at = 0, attack = 0.005, slide = 0 } = {}) {
      if (!this.ctx || !this.on) return;
      const c = this.ctx, t = c.currentTime + at;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.master);
      o.start(t);
      o.stop(t + dur + 0.05);
    },
    tick() { this.tone(2100, { dur: 0.05, vol: 0.05, slide: 0.7 }); this.tone(1050, { dur: 0.06, vol: 0.03, type: 'triangle' }); },
    move() {
      this.tone(1500, { dur: 0.07, vol: 0.06, slide: 0.8 });
      this.tone(750, { dur: 0.08, vol: 0.035, type: 'triangle' });
      this.tone(3000, { dur: 0.25, vol: 0.012, at: 0.03, slide: 1.2 });
    },
    confirm() {
      this.tone(880, { dur: 0.18, vol: 0.08, type: 'triangle' });
      this.tone(1318.5, { dur: 0.26, vol: 0.07, type: 'triangle', at: 0.06 });
      this.tone(2637, { dur: 0.3, vol: 0.02, at: 0.06 });
    },
    back() {
      this.tone(988, { dur: 0.14, vol: 0.07, type: 'triangle' });
      this.tone(659, { dur: 0.2, vol: 0.06, type: 'triangle', at: 0.06 });
    },
    boot() {
      if (!this.ctx || !this.on) return;
      const c = this.ctx, t = c.currentTime;
      // Barrido de aire (ruido filtrado)
      const len = c.sampleRate * 2.5;
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const n = c.createBufferSource();
      n.buffer = buf;
      const nf = c.createBiquadFilter();
      nf.type = 'bandpass';
      nf.Q.value = 1.2;
      nf.frequency.setValueAtTime(300, t);
      nf.frequency.exponentialRampToValueAtTime(5000, t + 1.2);
      nf.frequency.exponentialRampToValueAtTime(800, t + 2.4);
      const ng = c.createGain();
      ng.gain.setValueAtTime(0.0001, t);
      ng.gain.exponentialRampToValueAtTime(0.12, t + 0.6);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      n.connect(nf).connect(ng).connect(this.master);
      n.start(t);
      // Acorde de pad con ataque lento
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(400, t);
      lp.frequency.exponentialRampToValueAtTime(2600, t + 2.5);
      lp.frequency.exponentialRampToValueAtTime(700, t + 7);
      const pg = c.createGain();
      pg.gain.setValueAtTime(0.0001, t);
      pg.gain.exponentialRampToValueAtTime(0.16, t + 1.6);
      pg.gain.setValueAtTime(0.16, t + 4.2);
      pg.gain.exponentialRampToValueAtTime(0.0001, t + 7.5);
      lp.connect(pg).connect(this.master);
      [146.83, 220, 293.66, 369.99, 440, 659.25].forEach((f, i) => {
        [-6, 6].forEach(det => {
          const o = c.createOscillator();
          o.type = 'sawtooth';
          o.frequency.value = f;
          o.detune.value = det + i;
          const og = c.createGain();
          og.gain.value = 0.05;
          o.connect(og).connect(lp);
          o.start(t);
          o.stop(t + 7.6);
        });
      });
      [1174.66, 1479.98, 1760, 2349.32].forEach((f, i) => this.tone(f, { dur: 1.4, vol: 0.025, at: 1.1 + i * 0.09, attack: 0.02 }));
      [1760, 2217.46, 2637, 3520].forEach((f, i) => this.tone(f, { dur: 1.6, vol: 0.02, at: 3.7 + i * 0.08, attack: 0.02 }));
    },
  };

  /* ============================================================
     MENÚ: halo 3D de categorías + columna de ítems
     ============================================================ */
  const catsEl = $('#cats');
  const colsEl = $('#cols');
  const halo = $('#halo');
  const panel = $('#panel');
  const panelContent = $('.panel-content');
  const panelScroll = $('.panel-scroll');

  const cats = DATA.categories.map((c, i) => ({ ...c, index: i, sel: c.start || 0, el: null, col: null, itemEls: [] }));
  const N = cats.length;
  const STEP = (Math.PI * 2) / N;
  const mod = (a, n) => ((a % n) + n) % n;
  const startIdx = Math.max(0, cats.findIndex(c => c.id === DATA.startCategory));
  const state = { cat: startIdx, panel: false, panelItem: null, ready: false };
  const ring = { rot: startIdx, target: startIdx, rate: 9 };

  function itemSubtitle(it) {
    if (it.action === 'sound') return Sound.on ? ui('on') : ui('off');
    if (it.action === 'lang') return langName(LANG);
    if (it.action === 'cursor') return window.Cursor && window.Cursor.enabled ? ui('on') : ui('off');
    return tr(it.subtitle);
  }

  function build() {
    catsEl.innerHTML = '';
    colsEl.innerHTML = '';
    cats.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'cat';
      el.setAttribute('role', 'tab');
      el.innerHTML = `<div class="cat-inner" style="--i:${i}"><div class="cat-icon">${xmbIcon(c.icon)}</div><div class="cat-label">${esc(tr(c.label))}</div></div>`;
      el.addEventListener('click', () => { if (state.panel) closePanel(); goCatIndex(i); });
      catsEl.appendChild(el);
      c.el = el;

      const col = document.createElement('div');
      col.className = 'col';
      c.itemEls = [];
      c.items.forEach((it, j) => {
        const ie = document.createElement('div');
        ie.className = 'item';
        ie.innerHTML = `<div class="item-in"><div class="item-icon">${xmbIcon(it.icon)}</div><div class="item-text"><span class="item-title">${esc(tr(it.title))}</span><span class="item-sub">${esc(itemSubtitle(it))}</span></div></div>`;
        ie.addEventListener('click', e => {
          e.stopPropagation();
          if (state.cat !== i) { goCatIndex(i); return; }
          if (c.sel === j) openItem();
          else goItem(j - c.sel);
        });
        col.appendChild(ie);
        c.itemEls.push(ie);
      });
      colsEl.appendChild(col);
      c.col = col;
    });
  }

  /* ---------- Geometría del halo ---------- */
  let G = null;
  function metrics() {
    // Si la ventana aún no tiene tamaño (pestaña oculta), usar uno por defecto
    const w = window.innerWidth || 1280, h = window.innerHeight || 720, m = w < 768;
    const K = 2.2;                       // perspectiva fuerte: P = K·R (más pequeño = más exagerado)
    const halfW = w * (m ? 0.38 : 0.3); // medio ancho visible del anillo (los vecinos pueden salirse)
    const R = halfW * K / (K - 1);
    const P = R * K;
    const frontY = h * (m ? 0.29 : 0.35);
    const drop = h * (m ? 0.1 : 0.14);  // cuánto baja el icono delantero respecto al centro del anillo
    G = {
      m, w, h, R, P, frontY,
      cx: w / 2,
      tilt: drop / R,
      cy: frontY - drop,
      sF: P / (P - R),
      colX: m ? 52 : w / 2,           // en móvil la lista va a la izquierda para que quepa el texto
      selOff: m ? 104 : 140,
      ih: m ? 62 : 76,
      above: m ? 74 : 100,   // distancia del primer ítem de arriba al icono de la categoría
      ihA: m ? 48 : 58,      // separación entre los ítems de arriba (más juntos)
    };
    drawHalo();
  }

  // Proyección de un ángulo del anillo a pantalla (θ=0 → delante)
  function proj(theta) {
    const X = G.R * Math.sin(theta), Z = G.R * Math.cos(theta);
    const s = (G.P / (G.P - Z)) / G.sF;
    return { x: G.cx + X * s, y: G.cy + Z * G.tilt * s, s, z: Z / G.R };
  }

  // Anillo muy sutil: una línea fina y unos pocos puntos de luz
  const haloDots = [];
  const DOTS = 20;
  function drawHalo() {
    const path = (from, to) => {
      const pts = [];
      for (let k = 0; k <= 90; k++) { const p = proj(from + (to - from) * k / 90); pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`); }
      return `M${pts.join('L')}`;
    };
    const front = path(-Math.PI / 2, Math.PI / 2);
    const back = path(Math.PI / 2, Math.PI * 1.5);
    const yF = proj(0).y, yS = G.cy, yB = proj(Math.PI).y;
    halo.setAttribute('viewBox', `0 0 ${G.w} ${G.h}`);
    halo.innerHTML = `
      <defs>
        <linearGradient id="halo-front" gradientUnits="userSpaceOnUse" x1="0" y1="${yS}" x2="0" y2="${yF}">
          <stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/>
        </linearGradient>
        <linearGradient id="halo-back" gradientUnits="userSpaceOnUse" x1="0" y1="${yS}" x2="0" y2="${yB}">
          <stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/>
        </linearGradient>
        <filter id="halo-far" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="2.6"/></filter>
        <filter id="halo-glow" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <path d="${back}" fill="none" stroke="url(#halo-back)" stroke-width="2.5" filter="url(#halo-far)"/>
      <path d="${front}" fill="none" stroke="url(#halo-front)" stroke-width="8" opacity=".35" filter="url(#halo-glow)"/>
      <path d="${front}" fill="none" stroke="url(#halo-front)" stroke-width="1.2"/>
      <g class="halo-dots"></g>`;
    const g = halo.querySelector('.halo-dots');
    haloDots.length = 0;
    for (let j = 0; j < DOTS; j++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('fill', '#fff');
      g.appendChild(c);
      haloDots.push(c);
    }
  }

  // Coloca categorías y destellos según la rotación actual
  let backDim = 0;
  function placeRing(rot, t) {
    // Si hay ítems por encima del seleccionado, el fondo del halo se aparta un poco
    const want = cats[state.cat].sel > 0 && !state.panel ? 1 : 0;
    backDim += (want - backDim) * 0.12;
    cats.forEach((c, i) => {
      const p = proj((i - rot) * STEP);
      const front = (p.z + 1) / 2;
      const far = 1 - front;
      const o = (0.15 + 0.85 * Math.pow(front, 1.8)) * (1 - backDim * 0.75 * far);
      const blur = far > 0.25 ? (far - 0.25) * 3.2 : 0;
      c.el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${p.s.toFixed(4)})`;
      c.el.style.zIndex = String(Math.round(100 + p.z * 50));
      c.el.style.setProperty('--o', o.toFixed(3));
      c.el.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : '';
    });
    for (let j = 0; j < DOTS; j++) {
      const a = (j / DOTS) * Math.PI * 2 - rot * STEP + t * 0.06;
      const p = proj(a);
      const front = (p.z + 1) / 2;
      const tw = 0.55 + 0.45 * Math.sin(t * 2.2 + j * 1.7);
      haloDots[j].setAttribute('cx', p.x.toFixed(1));
      haloDots[j].setAttribute('cy', p.y.toFixed(1));
      haloDots[j].setAttribute('r', ((j % 4 === 0 ? 1.8 : 1.1) * p.s).toFixed(2));
      haloDots[j].setAttribute('opacity', ((0.05 + 0.3 * front) * tw).toFixed(2));
    }
  }

  let lastT = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    ring.rot += (ring.target - ring.rot) * (1 - Math.exp(-dt * (reduced ? 30 : ring.rate)));
    if (Math.abs(ring.target - ring.rot) < 0.001) { ring.rot = ring.target; ring.rate = 9; }
    const sway = reduced ? 0 : Math.sin(now / 1000 * 0.6) * 0.02;
    placeRing(ring.rot + sway, now / 1000);
    requestAnimationFrame(frame);
  }

  // Columna de ítems (transiciones CSS)
  function layout() {
    cats.forEach((c, i) => {
      let d = mod(i - state.cat + Math.floor(N / 2), N) - Math.floor(N / 2);
      c.el.classList.toggle('active', d === 0);
      c.el.setAttribute('aria-selected', d === 0);
      c.col.style.transform = `translate3d(${G.colX + d * 60}px, 0, 0)`;
      c.col.classList.toggle('active', d === 0);
      c.itemEls.forEach((ie, j) => {
        const k = j - c.sel;
        let y, o;
        if (k === 0) { y = G.frontY + G.selOff; o = 1; }
        else if (k > 0) { y = G.frontY + G.selOff + k * G.ih + 12; o = Math.max(0, 0.85 - (k - 1) * 0.14); }
        else { y = G.frontY - G.above + (k + 1) * G.ihA; o = Math.max(0, 0.55 - (-k - 1) * 0.13); }
        ie.style.transform = `translate3d(0, ${y}px, 0)`;
        ie.style.setProperty('--o', o);
        ie.classList.toggle('sel', k === 0);
        ie.classList.toggle('above', k < 0);
      });
    });
  }

  function animateCol(c) {
    c.itemEls.forEach((ie, j) => ie.firstElementChild.style.setProperty('--d', Math.abs(j - c.sel)));
    c.col.classList.remove('enter');
    void c.col.offsetWidth;
    c.col.classList.add('enter');
  }

  function rotateBy(delta) {
    if (!delta) return;
    ring.target += delta;
    state.cat = mod(Math.round(ring.target), N);
    Sound.move();
    animateCol(cats[state.cat]);
    layout();
  }
  function goCatIndex(i) {
    rotateBy(mod(i - state.cat + Math.floor(N / 2), N) - Math.floor(N / 2));
  }

  function goItem(delta) {
    const c = cats[state.cat];
    const n = Math.max(0, Math.min(c.items.length - 1, c.sel + delta));
    if (n === c.sel) return;
    c.sel = n;
    Sound.tick();
    layout();
  }

  /* ---------- Panel ---------- */
  const head = (kicker, title, sub) =>
    `<div class="p-head"><div class="p-kicker">${esc(kicker)}</div>${title ? `<h2>${esc(title)}</h2>` : ''}${sub ? `<p>${esc(sub)}</p>` : ''}</div>`;

  function blocksFor(p, cat) {
    const out = [];
    const kicker = tr(p.kicker) || tr(cat.label);
    const title = tr(p.title), sub = tr(p.subtitle);
    if (p.avatar) {
      out.push(head(kicker));
      out.push(`<div class="p-avatar"><div class="avatar-wrap"><div class="avatar-ring"></div><div class="avatar">${esc(p.avatar)}${p.photo ? `<img src="${esc(p.photo)}" alt="">` : ''}</div></div><div class="p-head"><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div></div>`);
    } else {
      out.push(head(kicker, title, sub));
    }
    if (p.image) out.push(`<div class="p-image"><img src="${esc(p.image)}" alt="${esc(title)}"></div>`);
    const paras = trList(p.body);
    if (paras.length) out.push(`<div class="p-body">${paras.map(t => `<p>${esc(t)}</p>`).join('')}</div>`);
    if (p.stats && p.stats.length) out.push(`<div class="p-stats">${p.stats.map(s => `<div class="stat"><strong>${esc(tr(s.value))}</strong><span>${esc(tr(s.label))}</span></div>`).join('')}</div>`);
    if (p.bars && p.bars.length) {
      out.push(`<div class="p-bars">${p.bars.map((b, i) => `<div><div class="bar-head"><span>${esc(tr(b.name))}</span><span>${b.level}%</span></div><div class="bar"><div class="bar-fill" style="--i:${i};width:${Math.max(0, Math.min(100, b.level))}%"></div></div></div>`).join('')}</div>`);
    }
    if (p.timeline && p.timeline.length) {
      out.push(`<div class="p-timeline">${p.timeline.map((e, i) => {
        const place = tr(e.place), text = tr(e.text);
        return `<div class="tl" style="--i:${i}"><div class="tl-date">${esc(tr(e.date))}</div><h3>${esc(tr(e.title))}</h3>${place ? `<div class="tl-place">${esc(place)}</div>` : ''}${text ? `<p>${esc(text)}</p>` : ''}</div>`;
      }).join('')}</div>`);
    }
    if (p.pdf) {
      out.push(`<div class="p-pdf"><iframe src="${esc(p.pdf)}#view=FitH&toolbar=0" title="${esc(title)}" loading="lazy"></iframe></div>`);
    }
    const tags = trList(p.tags);
    if (tags.length) out.push(`<div class="p-tags">${tags.map((t, i) => `<span class="tag" style="--i:${i}">${esc(t)}</span>`).join('')}</div>`);
    if (p.links && p.links.length) {
      out.push(`<div class="p-links">${p.links.map(l => {
        const ok = !!l.url;
        const ext = ok && (/^https?:/.test(l.url) || l.newTab);
        return `<a class="btn${ok ? '' : ' disabled'}" href="${ok ? esc(l.url) : '#'}"${ext ? ' target="_blank" rel="noopener"' : ''}${ok && l.download ? ` download="${esc(l.download === true ? '' : l.download)}"` : ''}${ok ? '' : ' aria-disabled="true" tabindex="-1"'}>${icon(l.icon || 'globe', 2.4)}<span>${esc(tr(l.label))}${ok ? '' : ` · ${esc(ui('soon'))}`}</span></a>`;
      }).join('')}</div>`);
    }
    return out;
  }

  const themeName = n => (n === 'auto' ? ui('auto') : ((I.themes[LANG] || I.themes.en)[n] || n));
  function themeBlocks() {
    const names = ['auto', ...Object.keys(Waves.THEMES)];
    const sw = names.map(n => {
      const [a, b] = Waves.THEMES[n === 'auto' ? Waves.resolvedName() : n] || Waves.THEMES.azul;
      const bg = n === 'auto'
        ? 'conic-gradient(#c4302a, #d07a22, #b8962a, #2f9a55, #1f9fb0, #2a63c4, #7b3fc4, #c44f8f, #c4302a)'
        : `linear-gradient(160deg, ${a}, ${b})`;
      return `<button class="swatch${Waves.current === n ? ' on' : ''}" data-theme="${n}" type="button"><i style="background:${bg}"></i>${esc(themeName(n))}</button>`;
    }).join('');
    return [head(ui('settings'), ui('themeTitle'), ui('themeDesc')), `<div class="p-themes">${sw}</div>`];
  }

  function langBlocks() {
    const btns = I.languages.map(l =>
      `<button class="lang-btn${l.code === LANG ? ' on' : ''}" data-lang="${l.code}" type="button" lang="${l.code}"><span class="lang-code">${l.code.toUpperCase()}</span><span class="lang-name">${esc(l.name)}</span></button>`
    ).join('');
    return [head(ui('settings'), ui('langTitle'), ui('langDesc')), `<div class="p-langs">${btns}</div>`];
  }

  function renderPanel(blocks, animate = true) {
    panelContent.classList.toggle('no-anim', !animate);
    panelContent.innerHTML = blocks.map((b, i) => `<div class="blk" style="--i:${i}">${b}</div>`).join('');
    if (animate) panelScroll.scrollTop = 0;
    panelContent.querySelectorAll('.swatch').forEach(s => s.addEventListener('click', () => { setTheme(s.dataset.theme); Sound.tick(); }));
    panelContent.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang); Sound.tick(); }));
  }

  function renderPanelFor(it, animate) {
    panel.classList.toggle('wide', !!(it.panel && it.panel.pdf));
    if (it.action === 'theme') renderPanel(themeBlocks(), animate);
    else if (it.action === 'lang') renderPanel(langBlocks(), animate);
    else if (it.panel) renderPanel(blocksFor(it.panel, cats[state.cat]), animate);
  }

  function openItem() {
    const c = cats[state.cat];
    const it = c.items[c.sel];
    if (!it) return;
    if (it.action === 'sound') { Sound.toggle(); Sound.confirm(); refreshSubtitles(); return; }
    if (it.action === 'cursor') { if (window.Cursor) window.Cursor.toggle(); Sound.confirm(); refreshSubtitles(); return; }
    if (it.action === 'reboot') { Sound.confirm(); replayBoot(); return; }
    if (!it.panel && it.action !== 'theme' && it.action !== 'lang') return;
    renderPanelFor(it, true);
    Sound.confirm();
    state.panel = true;
    state.panelItem = it;
    body.classList.add('panel-open');
    panel.setAttribute('aria-hidden', 'false');
  }

  function closePanel(silent) {
    if (!state.panel) return;
    state.panel = false;
    state.panelItem = null;
    body.classList.remove('panel-open');
    panel.setAttribute('aria-hidden', 'true');
    if (!silent) Sound.back();
  }

  function refreshSubtitles() {
    cats.forEach(c => c.items.forEach((it, j) => {
      if (it.action) c.itemEls[j].querySelector('.item-sub').textContent = itemSubtitle(it);
    }));
  }

  /* ---------- Tema e idioma ---------- */
  function setTheme(name) {
    Waves.setTheme(name);
    local.set('xmb-theme', name);
    panel.querySelectorAll('.swatch').forEach(s => s.classList.toggle('on', s.dataset.theme === name));
  }
  function cycleTheme(dir) {
    const names = ['auto', ...Object.keys(Waves.THEMES)];
    setTheme(names[mod(names.indexOf(Waves.current) + dir, names.length)]);
    Sound.tick();
  }

  function setLang(code) {
    if (!I.ui[code] || code === LANG) return;
    LANG = code;
    local.set('xmb-lang', code);
    applyStaticTexts();
    build();
    layout();
    updateMuteBtn();
    if (state.panel && state.panelItem) renderPanelFor(state.panelItem, false);
  }
  function cycleLang(dir) {
    const codes = I.languages.map(l => l.code);
    setLang(codes[mod(codes.indexOf(LANG) + dir, codes.length)]);
    Sound.tick();
  }

  /* ---------- Botón de sonido ---------- */
  const muteBtn = $('#mute');
  function updateMuteBtn() {
    muteBtn.innerHTML = icon(Sound.on ? 'sound' : 'mute', 2.6);
    muteBtn.setAttribute('aria-label', Sound.on ? ui('mute') : ui('unmute'));
    refreshSubtitles();
  }
  muteBtn.addEventListener('click', () => { Sound.init(); Sound.toggle(); Sound.tick(); });

  // La marca de arriba a la izquierda lleva al Perfil
  $('#brand').addEventListener('click', () => {
    if (!state.ready) return;
    if (state.panel) closePanel(true);
    goCatIndex(startIdx);
  });

  /* ============================================================
     ENTRADA: teclado, rueda, táctil
     ============================================================ */
  document.addEventListener('keydown', e => {
    if (!state.ready) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    const act = state.panelItem && state.panelItem.action;
    const picker = act === 'theme' || act === 'lang';

    if (state.panel) {
      if (k === 'Escape' || k === 'Backspace' || (k === 'ArrowLeft' && !picker)) { e.preventDefault(); closePanel(); }
      else if (picker && (k === 'ArrowLeft' || k === 'ArrowRight')) {
        e.preventDefault();
        const dir = k === 'ArrowRight' ? 1 : -1;
        if (act === 'theme') cycleTheme(dir); else cycleLang(dir);
      }
      else if (k === 'ArrowDown') { e.preventDefault(); panelScroll.scrollBy({ top: 90, behavior: 'smooth' }); }
      else if (k === 'ArrowUp') { e.preventDefault(); panelScroll.scrollBy({ top: -90, behavior: 'smooth' }); }
      return;
    }

    switch (k) {
      case 'ArrowLeft': e.preventDefault(); rotateBy(-1); break;
      case 'ArrowRight': e.preventDefault(); rotateBy(1); break;
      case 'ArrowUp': e.preventDefault(); goItem(-1); break;
      case 'ArrowDown': e.preventDefault(); goItem(1); break;
      case 'Enter': case ' ': case 'x': case 'X': e.preventDefault(); openItem(); break;
      default: break;
    }
  });

  let wheelAcc = 0, wheelLock = 0;
  window.addEventListener('wheel', e => {
    if (!state.ready || state.panel) return;
    e.preventDefault();
    const now = performance.now();
    const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
    wheelAcc += horiz ? (e.deltaX || e.deltaY) : e.deltaY;
    if (now < wheelLock || Math.abs(wheelAcc) < 30) return;
    const dir = Math.sign(wheelAcc);
    wheelAcc = 0;
    wheelLock = now + 120;
    if (horiz) rotateBy(dir); else goItem(dir);
  }, { passive: false });

  let touch = null;
  const xmb = $('#xmb');
  xmb.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  xmb.addEventListener('touchend', e => {
    if (!touch || !state.ready || state.panel) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x, dy = t.clientY - touch.y;
    touch = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
    if (Math.abs(dx) > Math.abs(dy)) rotateBy(dx < 0 ? 1 : -1);
    else goItem(-Math.round(dy / 60) || (dy < 0 ? 1 : -1));
  }, { passive: true });
  xmb.addEventListener('touchmove', e => { if (state.ready && !state.panel) e.preventDefault(); }, { passive: false });

  $('.panel-close').addEventListener('click', () => closePanel());
  xmb.addEventListener('click', e => { if (state.panel && !e.target.closest('.item.sel')) closePanel(); });

  window.addEventListener('resize', () => { metrics(); layout(); });

  /* ============================================================
     RELOJ
     ============================================================ */
  (function clock() {
    const d = $('#clock-date'), t = $('#clock-time');
    const pad = n => String(n).padStart(2, '0');
    function tick() {
      const now = new Date();
      d.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}`;
      t.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    }
    tick();
    setInterval(tick, 5000);
  })();

  /* ============================================================
     ARRANQUE
     ============================================================ */
  const boot = $('#boot');
  const BOOT_MS = reduced ? 1200 : 6300;
  let bootTimer = null;

  function makeParticles() {
    const box = $('.boot-particles');
    box.innerHTML = '';
    const n = reduced ? 0 : 46;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 120 + Math.random() * Math.min(window.innerWidth, 900) * 0.55;
      const s = document.createElement('span');
      s.style.setProperty('--x', `${Math.cos(a) * r}px`);
      s.style.setProperty('--y', `${Math.sin(a) * r * 0.45}px`);
      s.style.setProperty('--s', `${1 + Math.random() * 3}px`);
      s.style.setProperty('--dur', `${1.4 + Math.random() * 1.6}s`);
      s.style.setProperty('--del', `${0.2 + Math.random() * 0.5}s`);
      box.appendChild(s);
    }
  }

  function playBoot() {
    makeParticles();
    boot.classList.remove('done', 'gone', 'playing');
    void boot.offsetWidth;
    boot.classList.add('playing');
    Sound.boot();
    clearTimeout(bootTimer);
    bootTimer = setTimeout(finishBoot, BOOT_MS);
  }

  function finishBoot() {
    clearTimeout(bootTimer);
    if (state.ready) return;
    session.set('xmb-booted', '1');
    boot.classList.add('done');
    setTimeout(() => boot.classList.add('gone'), 1000);
    enterMenu();
  }

  function enterMenu() {
    state.ready = true;
    // El halo entra girando
    ring.rot = ring.target - N * 0.6;
    ring.rate = 3.2;
    layout();
    animateCol(cats[state.cat]);
    body.classList.add('ready');
  }

  function replayBoot() {
    closePanel(true);
    state.ready = false;
    body.classList.remove('ready');
    playBoot();
  }

  // Pantalla de inicio: espera interacción (desbloquea el audio)
  function onStartInput(e) {
    if (boot.classList.contains('gone')) return;
    if (boot.classList.contains('playing')) { finishBoot(); return; }
    if (e.type === 'keydown' && (e.altKey || e.ctrlKey || e.metaKey)) return;
    Sound.init();
    playBoot();
  }
  boot.addEventListener('pointerdown', onStartInput);
  document.addEventListener('keydown', e => { if (!state.ready) { e.preventDefault(); onStartInput(e); } });

  const unlock = () => { Sound.init(); window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); };
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);

  /* ============================================================
     INICIO
     ============================================================ */
  injectIconDefs();
  applyStaticTexts();
  Waves.onTheme(setTint);
  Waves.init($('#bg'), local.get('xmb-theme', 'auto'));
  metrics();
  build();
  updateMuteBtn();
  layout();
  requestAnimationFrame(frame);

  if (session.get('xmb-booted', '') === '1') {
    boot.classList.add('done', 'gone');
    enterMenu();
  }
})();
