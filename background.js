// =====================================================
// background.js — fond animé tigre × galactique
// =====================================================
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initLeaves();
  }

  // ---- ÉTOILES ----
  const STAR_COUNT = 80;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:     Math.random(),
    y:     Math.random() * 0.5, // seulement dans la moitié haute → ciel
    r:     Math.random() * 1.4 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.04 + 0.01,
  }));

  // ---- RAYURES DE TIGRE ----
  const STRIPE_COUNT = 9;
  const stripes = Array.from({ length: STRIPE_COUNT }, (_, i) => ({
    offset: (i / STRIPE_COUNT) * 1.8,
    speed:  0.00018 + Math.random() * 0.00012,
    width:  0.022 + Math.random() * 0.028,
    alpha:  0.07 + Math.random() * 0.07,  // beaucoup plus visible
  }));

  // ---- FEUILLES DE JUNGLE ----
  // Grandes feuilles statiques en décoration sur les bords
  const BORDER_LEAVES = [
    { x: -0.02, y: 0.05,  angle: -0.3,  scale: 1.8, color: '#1a4a0a' },
    { x: -0.02, y: 0.25,  angle:  0.2,  scale: 1.4, color: '#0d3306' },
    { x: -0.02, y: 0.55,  angle: -0.5,  scale: 2.0, color: '#1f5c0e' },
    { x: -0.02, y: 0.78,  angle:  0.1,  scale: 1.6, color: '#153d09' },
    { x:  1.02, y: 0.10,  angle:  3.5,  scale: 1.7, color: '#1a4a0a' },
    { x:  1.02, y: 0.35,  angle:  3.0,  scale: 2.1, color: '#0d3306' },
    { x:  1.02, y: 0.60,  angle:  3.8,  scale: 1.5, color: '#1f5c0e' },
    { x:  1.02, y: 0.85,  angle:  3.2,  scale: 1.9, color: '#153d09' },
    { x:  0.15, y: -0.02, angle: -1.4,  scale: 1.3, color: '#1a4a0a' },
    { x:  0.40, y: -0.02, angle: -1.6,  scale: 1.6, color: '#0d3306' },
    { x:  0.65, y: -0.02, angle: -1.2,  scale: 1.4, color: '#1f5c0e' },
    { x:  0.85, y: -0.02, angle: -1.5,  scale: 1.7, color: '#153d09' },
    { x:  0.20, y:  1.02, angle:  1.6,  scale: 1.5, color: '#1a4a0a' },
    { x:  0.50, y:  1.02, angle:  1.4,  scale: 1.8, color: '#0d3306' },
    { x:  0.75, y:  1.02, angle:  1.7,  scale: 1.3, color: '#1f5c0e' },
  ];
  let leafSwayT = 0;

  // ---- PARTICULES TOMBANTES (feuilles) ----
  const FALLING_COUNT = 30;
  let fallingLeaves = [];

  function makeFallingLeaf() {
    return {
      x:     Math.random() * W,
      y:     -20,
      vx:    (Math.random() - 0.5) * 0.8,
      vy:    Math.random() * 0.7 + 0.3,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.025,
      scale: Math.random() * 0.8 + 0.4,
      color: ['#1a4a0a', '#2d6a1a', '#0d3306', '#ff6b1a', '#ffb347'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.5 + 0.3,
    };
  }

  function initLeaves() {
    fallingLeaves = Array.from({ length: FALLING_COUNT }, () => {
      const l = makeFallingLeaf();
      l.y = Math.random() * H; // distribution initiale sur tout l'écran
      return l;
    });
  }

  // ---- EMOJIS TOMBANTS (tigre + galactique) ----
  const EMOJIS = ['🐯', '🌌', '🐯', '⭐', '🐯', '🌠', '🌿', '✨'];
  const EMOJI_COUNT = 18;
  let emojiParticles = [];

  function makeEmoji() {
    return {
      x:     Math.random() * W,
      y:     -40,
      vy:    Math.random() * 0.9 + 0.4,
      vx:    (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.018,
      size:  Math.floor(Math.random() * 20 + 18), // 18–38px
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      alpha: Math.random() * 0.45 + 0.25,
    };
  }

  function initEmojis() {
    emojiParticles = Array.from({ length: EMOJI_COUNT }, () => {
      const e = makeEmoji();
      e.y = Math.random() * H; // répartis dès le départ
      return e;
    });
  }

  function drawEmojis() {
    emojiParticles.forEach(e => {
      e.x     += e.vx + Math.sin(t * 0.015 + e.alpha * 8) * 0.25;
      e.y     += e.vy;
      e.angle += e.spin;

      if (e.y > H + 50) Object.assign(e, makeEmoji());

      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.globalAlpha = e.alpha;
      ctx.font = `${e.size}px serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.emoji, 0, 0);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }

  // ---- PARTICULES MONTANTES (étoiles/cosmos) ----
  const RISING_COUNT = 25;
  let risingStars = [];

  function makeRisingStar() {
    return {
      x:     Math.random() * W,
      y:     H + 10,
      vy:    -(Math.random() * 0.6 + 0.2),
      r:     Math.random() * 2.5 + 0.8,
      color: Math.random() > 0.5 ? '#7b2fff' : '#00d4ff',
      alpha: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function initRisingStars() {
    risingStars = Array.from({ length: RISING_COUNT }, () => {
      const s = makeRisingStar();
      s.y = Math.random() * H;
      return s;
    });
  }

  // ---- HALOS ----
  const halos = [
    { x: 0.15, y: 0.15, color: '#7b2fff', r: 0.35, phase: 0,        speed: 0.008 },
    { x: 0.85, y: 0.80, color: '#ff6b1a', r: 0.40, phase: Math.PI,  speed: 0.007 },
    { x: 0.50, y: 0.45, color: '#00d4ff', r: 0.20, phase: 1.2,      speed: 0.013 },
    { x: 0.80, y: 0.15, color: '#ffb347', r: 0.25, phase: 2.0,      speed: 0.009 }, // halo tigre en haut
    { x: 0.20, y: 0.80, color: '#2d6a1a', r: 0.28, phase: 0.8,      speed: 0.006 }, // halo jungle en bas
  ];

  // ---- LIANE VERTICALE ----
  // Lianes qui descendent des coins
  const vines = [
    { x: 0.04, segments: 8, color: '#1a4a0a', sway: 0,    phase: 0 },
    { x: 0.96, segments: 6, color: '#0d3306', sway: 0,    phase: 1.5 },
    { x: 0.12, segments: 5, color: '#1f5c0e', sway: 0,    phase: 0.8 },
    { x: 0.88, segments: 7, color: '#153d09', sway: 0,    phase: 2.2 },
  ];

  let t = 0;

  // ---- DESSIN FEUILLE ----
  function drawLeafShape(ctx, size, color) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo( size * 1.1, -size * 0.3,  size * 1.1,  size * 0.3, 0,  size);
    ctx.bezierCurveTo(-size * 1.1,  size * 0.3, -size * 1.1, -size * 0.3, 0, -size);
    ctx.fillStyle = color;
    ctx.fill();
    // Nervure centrale
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0,  size);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = size * 0.08;
    ctx.stroke();
  }

  function drawBackground() {
    ctx.fillStyle = '#060d06'; // légèrement verdâtre → ambiance jungle
    ctx.fillRect(0, 0, W, H);
  }

  function drawHalos() {
    halos.forEach(h => {
      const pulse  = 0.85 + 0.15 * Math.sin(t * h.speed + h.phase);
      const radius = h.r * Math.min(W, H) * pulse;
      const grd = ctx.createRadialGradient(h.x * W, h.y * H, 0, h.x * W, h.y * H, radius);
      grd.addColorStop(0,   h.color + '38');
      grd.addColorStop(0.5, h.color + '18');
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });
  }

  function drawStripes() {
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(Math.PI / 5.5); // ~32°
    const diag = Math.sqrt(W * W + H * H);
    stripes.forEach(s => {
      s.offset = (s.offset + s.speed) % 1.8;
      const x = (s.offset - 0.9) * diag - diag / 2;
      const w = s.width * diag;
      const grd = ctx.createLinearGradient(x, 0, x + w, 0);
      grd.addColorStop(0,   'rgba(255,107,26,0)');
      grd.addColorStop(0.25, `rgba(180,60,0,${s.alpha})`);
      grd.addColorStop(0.5,  `rgba(255,140,50,${s.alpha * 1.5})`);
      grd.addColorStop(0.75, `rgba(180,60,0,${s.alpha})`);
      grd.addColorStop(1,   'rgba(255,107,26,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(x, -diag, w, diag * 2);
    });
    ctx.restore();
  }

  function drawStars() {
    stars.forEach(s => {
      const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.8})`;
      ctx.fill();
    });
  }

  function drawBorderLeaves() {
    leafSwayT += 0.008;
    BORDER_LEAVES.forEach((l, i) => {
      const sway = Math.sin(leafSwayT + i * 0.7) * 0.12;
      ctx.save();
      ctx.translate(l.x * W, l.y * H);
      ctx.rotate(l.angle + sway);
      ctx.globalAlpha = 0.75;
      drawLeafShape(ctx, 60 * l.scale, l.color);

      // Quelques feuilles secondaires
      ctx.rotate(0.4);
      ctx.globalAlpha = 0.45;
      drawLeafShape(ctx, 38 * l.scale, l.color);
      ctx.restore();
    });
  }

  function drawVines() {
    vines.forEach((v, vi) => {
      const segH = H * 0.12;
      ctx.beginPath();
      ctx.moveTo(v.x * W, 0);
      for (let i = 0; i <= v.segments; i++) {
        const y    = i * segH;
        const sway = Math.sin(t * 0.007 + v.phase + i * 0.5) * 18;
        if (i === 0) ctx.moveTo(v.x * W + sway, y);
        else ctx.lineTo(v.x * W + sway, y);

        // Petite feuille à chaque nœud
        if (i > 0 && i < v.segments) {
          ctx.save();
          ctx.translate(v.x * W + sway, y);
          ctx.rotate(Math.sin(t * 0.007 + i) * 0.3 + (vi % 2 === 0 ? 0.6 : -0.6));
          ctx.globalAlpha = 0.55;
          drawLeafShape(ctx, 14, '#1f5c0e');
          ctx.restore();
        }
      }
      ctx.strokeStyle = '#1a4a0a';
      ctx.lineWidth   = 2.5;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  function drawFallingLeaves() {
    fallingLeaves.forEach(l => {
      l.x     += l.vx + Math.sin(t * 0.02 + l.alpha * 10) * 0.3;
      l.y     += l.vy;
      l.angle += l.spin;

      if (l.y > H + 30) {
        const nl = makeFallingLeaf();
        Object.assign(l, nl);
      }

      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.angle);
      ctx.globalAlpha = l.alpha;
      drawLeafShape(ctx, 10 * l.scale, l.color);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }

  function drawRisingStars() {
    risingStars.forEach(s => {
      s.y     += s.vy;
      s.alpha *= 0.9995;

      if (s.y < -10) {
        const ns = makeRisingStar();
        Object.assign(s, ns);
      }

      const flicker = 0.6 + 0.4 * Math.sin(t * 0.08 + s.phase);
      ctx.beginPath();
      // Petit éclat en croix
      const r = s.r;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = s.alpha * flicker;
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 4);
      grd.addColorStop(0,   '#ffffff');
      grd.addColorStop(0.2, s.color);
      grd.addColorStop(1,   'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }

  // Grille cosmique en perspective, limitée à la moitié haute
  function drawGrid() {
    const alpha = 0.022 + 0.012 * Math.sin(t * 0.004);
    const VP    = { x: W / 2, y: H * 0.35 };
    ctx.strokeStyle = `rgba(123,47,255,${alpha})`;
    ctx.lineWidth   = 0.6;

    for (let i = 0; i <= 8; i++) {
      const frac = i / 8;
      const y    = VP.y + (H * 0.5 - VP.y) * frac; // s'arrête à mi-hauteur
      const spread = frac * 0.85;
      ctx.beginPath();
      ctx.moveTo(VP.x - spread * W, y);
      ctx.lineTo(VP.x + spread * W, y);
      ctx.stroke();
    }
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath();
      ctx.moveTo(VP.x + i * (W / 14), VP.y);
      ctx.lineTo(VP.x + i * (W / 2.2), H * 0.5);
      ctx.stroke();
    }
  }

  function loop() {
    t++;
    drawBackground();
    drawHalos();
    drawStripes();
    drawGrid();
    drawStars();
    drawVines();
    drawBorderLeaves();
    drawFallingLeaves();
    drawRisingStars();
    drawEmojis();
    requestAnimationFrame(loop);
  }

  resize();
  initRisingStars();
  initEmojis();
  loop();

  window.addEventListener('resize', () => {
    resize();
    initRisingStars();
    initEmojis();
  });
})();