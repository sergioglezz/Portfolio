/* ============================================================
   TEXTOS DE LA INTERFAZ (no del contenido) en cada idioma.
   El contenido del portfolio se traduce en data.js.
   ============================================================ */
window.I18N = {
  defaultLang: 'en',

  languages: [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
  ],

  ui: {
    en: {
      start: 'Press any key to start', skip: 'Press to skip',
      hCat: 'Category', hSel: 'Select', hOpen: 'Open', hBack: 'Back', hTouch: 'Swipe to navigate · Tap to open',
      on: 'On', off: 'Off', mute: 'Mute', unmute: 'Unmute', close: 'Close', soon: 'coming soon',
      settings: 'Settings',
      themeTitle: 'Background theme', themeDesc: '“Auto” changes colour every month. Use ◀ ▶ or tap a colour.', auto: 'Auto (month)',
      langTitle: 'Language', langDesc: 'Choose the language of the site. Use ◀ ▶ or tap one.',
    },
    es: {
      start: 'Pulsa cualquier tecla para empezar', skip: 'Pulsa para saltar',
      hCat: 'Categoría', hSel: 'Elegir', hOpen: 'Abrir', hBack: 'Volver', hTouch: 'Desliza para navegar · Toca para abrir',
      on: 'Activado', off: 'Desactivado', mute: 'Silenciar', unmute: 'Activar sonido', close: 'Cerrar', soon: 'próximamente',
      settings: 'Ajustes',
      themeTitle: 'Tema del fondo', themeDesc: '«Auto» cambia el color cada mes. Usa ◀ ▶ o toca un color.', auto: 'Auto (mes)',
      langTitle: 'Idioma', langDesc: 'Elige el idioma de la web. Usa ◀ ▶ o toca uno.',
    },
    fr: {
      start: 'Appuie sur une touche pour commencer', skip: 'Appuie pour passer',
      hCat: 'Catégorie', hSel: 'Choisir', hOpen: 'Ouvrir', hBack: 'Retour', hTouch: 'Glisse pour naviguer · Touche pour ouvrir',
      on: 'Activé', off: 'Désactivé', mute: 'Couper le son', unmute: 'Activer le son', close: 'Fermer', soon: 'bientôt',
      settings: 'Paramètres',
      themeTitle: 'Thème du fond', themeDesc: '« Auto » change la couleur chaque mois. Utilise ◀ ▶ ou touche une couleur.', auto: 'Auto (mois)',
      langTitle: 'Langue', langDesc: 'Choisis la langue du site. Utilise ◀ ▶ ou touche-en une.',
    },
    pt: {
      start: 'Pressione qualquer tecla para começar', skip: 'Pressione para pular',
      hCat: 'Categoria', hSel: 'Escolher', hOpen: 'Abrir', hBack: 'Voltar', hTouch: 'Deslize para navegar · Toque para abrir',
      on: 'Ativado', off: 'Desativado', mute: 'Silenciar', unmute: 'Ativar som', close: 'Fechar', soon: 'em breve',
      settings: 'Configurações',
      themeTitle: 'Tema do fundo', themeDesc: '“Auto” muda a cor a cada mês. Use ◀ ▶ ou toque em uma cor.', auto: 'Auto (mês)',
      langTitle: 'Idioma', langDesc: 'Escolha o idioma do site. Use ◀ ▶ ou toque em um.',
    },
    de: {
      start: 'Drücke eine beliebige Taste', skip: 'Zum Überspringen drücken',
      hCat: 'Kategorie', hSel: 'Auswählen', hOpen: 'Öffnen', hBack: 'Zurück', hTouch: 'Wischen zum Navigieren · Tippen zum Öffnen',
      on: 'An', off: 'Aus', mute: 'Stumm', unmute: 'Ton an', close: 'Schließen', soon: 'demnächst',
      settings: 'Einstellungen',
      themeTitle: 'Hintergrund', themeDesc: '„Auto“ wechselt die Farbe jeden Monat. Nutze ◀ ▶ oder tippe auf eine Farbe.', auto: 'Auto (Monat)',
      langTitle: 'Sprache', langDesc: 'Wähle die Sprache der Seite. Nutze ◀ ▶ oder tippe auf eine.',
    },
    ja: {
      start: '何かキーを押してスタート', skip: '押してスキップ',
      hCat: 'カテゴリー', hSel: '選択', hOpen: '開く', hBack: '戻る', hTouch: 'スワイプで移動・タップで開く',
      on: 'オン', off: 'オフ', mute: 'ミュート', unmute: 'サウンドをオン', close: '閉じる', soon: '近日公開',
      settings: '設定',
      themeTitle: '背景テーマ', themeDesc: '「自動」は毎月色が変わります。◀ ▶ または色をタップ。', auto: '自動（月）',
      langTitle: '言語', langDesc: 'サイトの言語を選択。◀ ▶ またはタップ。',
    },
  },

  // Nombres de los temas de color (las claves coinciden con waves.js)
  themes: {
    en: { plata: 'Silver', oro: 'Gold', lima: 'Lime', rosa: 'Pink', verde: 'Green', morado: 'Purple', cian: 'Cyan', azul: 'Blue', violeta: 'Violet', naranja: 'Orange', granate: 'Maroon', rojo: 'Red' },
    es: { plata: 'Plata', oro: 'Oro', lima: 'Lima', rosa: 'Rosa', verde: 'Verde', morado: 'Morado', cian: 'Cian', azul: 'Azul', violeta: 'Violeta', naranja: 'Naranja', granate: 'Granate', rojo: 'Rojo' },
    fr: { plata: 'Argent', oro: 'Or', lima: 'Citron vert', rosa: 'Rose', verde: 'Vert', morado: 'Pourpre', cian: 'Cyan', azul: 'Bleu', violeta: 'Violet', naranja: 'Orange', granate: 'Bordeaux', rojo: 'Rouge' },
    pt: { plata: 'Prata', oro: 'Ouro', lima: 'Lima', rosa: 'Rosa', verde: 'Verde', morado: 'Roxo', cian: 'Ciano', azul: 'Azul', violeta: 'Violeta', naranja: 'Laranja', granate: 'Grená', rojo: 'Vermelho' },
    de: { plata: 'Silber', oro: 'Gold', lima: 'Limette', rosa: 'Rosa', verde: 'Grün', morado: 'Lila', cian: 'Cyan', azul: 'Blau', violeta: 'Violett', naranja: 'Orange', granate: 'Bordeaux', rojo: 'Rot' },
    ja: { plata: 'シルバー', oro: 'ゴールド', lima: 'ライム', rosa: 'ピンク', verde: 'グリーン', morado: 'パープル', cian: 'シアン', azul: 'ブルー', violeta: 'バイオレット', naranja: 'オレンジ', granate: 'ワイン', rojo: 'レッド' },
  },
};
