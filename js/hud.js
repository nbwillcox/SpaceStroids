/* HUD, banners and the decorative side panels. */
(function (G) {
  'use strict';
  const U = G.U, C = G.C, GFX = G.gfx;
  const W = C.W, H = C.H;
  const HUD = {};
  const FONT = '"Segoe UI", system-ui, -apple-system, Roboto, sans-serif';

  function txt(ctx, s, x, y, size, color, align, weight, glow) {
    ctx.font = (weight || 800) + ' ' + size + 'px ' + FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'alphabetic';
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 10; }
    ctx.fillStyle = color; ctx.fillText(s, x, y);
    ctx.shadowBlur = 0;
  }
  HUD.txt = txt;

  HUD.draw = function (ctx, g) {
    if (g.demo) return;
    const p = g.player, spr = GFX.spr;
    const grad = ctx.createLinearGradient(0, 0, 0, 78);
    grad.addColorStop(0, 'rgba(2,4,18,0.78)'); grad.addColorStop(1, 'rgba(2,4,18,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, 78);
    txt(ctx, 'SCORE', 18, 17, 11, '#ff7a5d', 'left', 800);
    txt(ctx, U.fmt(g.score), 18, 40, 24, '#ffffff', 'left', 800, 'rgba(120,200,255,0.8)');
    txt(ctx, 'HIGH SCORE', W / 2, 17, 11, '#ff7a5d', 'center', 800);
    txt(ctx, U.fmt(Math.max(g.hi, g.score)), W / 2, 40, 24, '#9fe8ff', 'center', 800, 'rgba(120,200,255,0.8)');
    txt(ctx, 'WAVE', W - 18, 17, 11, '#ff7a5d', 'right', 800);
    txt(ctx, String(g.stage), W - 18, 40, 24, '#ffffff', 'right', 800, 'rgba(120,200,255,0.8)');
    for (let i = 0; i < Math.max(0, g.lives - 1); i++) GFX.draw(ctx, spr.player, 28 + i * 26, 64, 0, 0.3, 0.3);
    if (g.mult > 1) {
      const bx = 28 + Math.max(0, g.lives - 1) * 26 + 10;
      txt(ctx, 'x' + g.mult, bx, 68, 18, '#ffd24a', 'left', 900, 'rgba(255,200,60,0.9)');
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(bx + 30, 60, 44, 5);
      ctx.fillStyle = '#ffd24a'; ctx.fillRect(bx + 30, 60, 44 * Math.max(0, g.comboT / 2.4), 5);
    }
    for (let i = 0; i < C.MAX_TIER; i++) {
      ctx.fillStyle = i < p.tier ? '#ffd24a' : 'rgba(255,255,255,0.18)';
      ctx.shadowColor = '#ffd24a'; ctx.shadowBlur = i < p.tier ? 8 : 0;
      ctx.fillRect(W / 2 - 38 + i * 20, 58, 16, 6);
      ctx.shadowBlur = 0;
    }
    if (p.shield > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(W / 2 - 40, 68, 80, 3);
      ctx.fillStyle = '#6cc8ff'; ctx.fillRect(W / 2 - 40, 68, 80 * p.shield / C.SHIELD_TIME, 3);
    }
    const ready = p.hyperCd <= 0, k = ready ? 1 : 1 - p.hyperCd / C.HYPER_CD;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(W / 2 - 50, H - 16, 100, 5);
    ctx.fillStyle = ready ? '#c88aff' : 'rgba(200,140,255,0.5)'; ctx.fillRect(W / 2 - 50, H - 16, 100 * k, 5);
    txt(ctx, ready ? 'HYPERSPACE READY' : 'HYPERSPACE', W / 2, H - 22, 9, ready ? '#d9b3ff' : 'rgba(255,255,255,0.45)', 'center', 700);
    HUD.banner(ctx, g);
  };

  HUD.banner = function (ctx, g) {
    const b = g.banner;
    if (!b) return;
    const k = b.t / b.life;
    const a = k < 0.1 ? k / 0.1 : k > 0.82 ? Math.max(0, (1 - k) / 0.18) : 1;
    const sc = 1 + (k < 0.1 ? (0.1 - k) * 3 : 0);
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(W / 2, H * 0.36);
    if (b.warn) {
      const flick = Math.floor(b.t * 4) % 2;
      const g2 = ctx.createLinearGradient(0, -50, 0, 50);
      g2.addColorStop(0, 'rgba(255,40,40,0)'); g2.addColorStop(0.5, 'rgba(255,40,40,' + (flick ? 0.5 : 0.28) + ')'); g2.addColorStop(1, 'rgba(255,40,40,0)');
      ctx.fillStyle = g2; ctx.fillRect(-W / 2, -50, W, 100);
      ctx.scale(sc, sc);
      txt(ctx, 'WARNING', 0, 12, 56, flick ? '#ff6a6a' : '#ffffff', 'center', 900, 'rgba(255,40,40,1)');
      txt(ctx, b.sub, 0, 44, 15, '#ffd0d0', 'center', 700);
    } else if (b.small) {
      txt(ctx, b.text, 0, 0, 26, '#7dffb8', 'center', 900, 'rgba(60,255,160,0.9)');
    } else {
      ctx.scale(sc, sc);
      txt(ctx, b.text, 0, 0, b.text.length > 18 ? 30 : 46, '#ffffff', 'center', 900, 'rgba(255,150,90,1)');
      if (b.sub) txt(ctx, b.sub, 0, 36, 22, '#ffd24a', 'center', 800, 'rgba(255,200,60,0.9)');
    }
    ctx.restore();
  };

  /* decorative panels on wide windows; coords are screen pixels */
  HUD.sides = function (ctx, v) {
    const sw = v.ox;
    if (sw < 150) return;
    const sc = Math.min(1.15, sw / 240), cx1 = sw / 2, cx2 = v.ox + W * v.s + sw / 2, top = v.oy + 70 * sc;
    const col = 'rgba(160,215,255,0.8)';
    ctx.save();
    txt(ctx, 'SPACESTROIDS', cx1, top, 15 * sc, '#ffffff', 'center', 900, 'rgba(255,150,90,0.9)');
    const help = ['TURN', 'A D  /  ← →', 'THRUST / REVERSE', 'W S  /  ↑ ↓', 'FIRE', 'SPACE  /  LEFT CLICK', 'HYPERSPACE', 'SHIFT  /  RIGHT CLICK', 'PAUSE', 'P  /  ESC'];
    help.forEach((s, i) => txt(ctx, s, cx1, top + 44 * sc + i * 19 * sc, (i % 2 ? 12 : 10) * sc, i % 2 ? col : '#ff7a5d', 'center', i % 2 ? 700 : 800));
    txt(ctx, 'TOP PILOTS', cx2, top, 15 * sc, '#ffffff', 'center', 900, 'rgba(255,150,90,0.9)');
    G.scores.list.slice(0, 7).forEach((r, i) => txt(ctx, (i + 1) + '. ' + r.name + '  ' + U.fmt(r.score), cx2, top + 34 * sc + i * 22 * sc, 13 * sc, i === 0 ? '#ffd24a' : col, 'center', 700));
    txt(ctx, 'FREE TO PLAY & SHARE', cx2, top + 230 * sc, 10 * sc, '#ff7a5d', 'center', 800);
    txt(ctx, 'github.com/nbwillcox', cx2, top + 248 * sc, 12 * sc, col, 'center', 700);
    txt(ctx, '/SpaceStroids', cx2, top + 264 * sc, 12 * sc, col, 'center', 700);
    ctx.restore();
  };

  G.hud = HUD;
})((window.SGS = window.SGS || {}));
