/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 10: dinámica II)
   f10_plano · f10_poleas · f10_curva · f10_choque · f10_caida · f10_leer · f10_dcl
   (usa el motor B.lab.din definido en lab_mec1f_din.js)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, D = B.lab.din, M = B.lab.mec1;
  var R = Math.PI / 180;
  function lec(r, v, c) { return U.lec(r, v, c); }
  function f2(x, d) { return fmt(x, d == null ? 2 : d); }
  var iso = D.iso, caja = D.caja, vec = D.vec;

  // ============================================================
  // F10_PLANO: plano inclinado con rozamiento y una fuerza paralela
  // ============================================================
  var PP = [
    { k: "liso", t: "Sin rozamiento", th: 30, mu: 0, m: 5, F: 0 },
    { k: "mad", t: "Con rozamiento (μ = 0,3)", th: 30, mu: 0.3, m: 5, F: 0 },
    { k: "crit", t: "A punto de resbalar (tan θ = μ)", th: 27, mu: 0.51, m: 5, F: 0 },
    { k: "sube", t: "Empujar hacia arriba", th: 30, mu: 0.3, m: 5, F: 40 },
    { k: "cte", t: "Subir a velocidad constante", th: 30, mu: 0.3, m: 5, F: 36 }
  ];
  B.w.f10_plano = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Plano inclinado: componentes del peso, normal y rozamiento");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var L = 6, s0 = 3, TM = 6, st = { th: 30, mu: 0.3, m: 5, F: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 8, ymin: -1, ymax: 7, w: 600, h: 360, limpio: true, etiqueta: "Bloque sobre un plano inclinado con sus fuerzas" });
    function reinicia() { st.t = 0; sl.t.set(0); pinta(); }
    sl.th = U.slider(ctl, { et: "Ángulo θ", min: 0, max: 60, step: 1, val: st.th, on: function (v) { st.th = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 1, step: 0.01, val: st.mu, on: function (v) { st.mu = v; reinicia(); }, fmt: function (v) { return f2(v, 2); } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 20, step: 1, val: st.m, on: function (v) { st.m = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.F = U.slider(ctl, { et: "Fuerza F ∥ al plano (↑ positiva)", min: -60, max: 60, step: 1, val: st.F, on: function (v) { st.F = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + " N"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var c = D.plano(st.m, st.th, st.mu, st.F), th = st.th * R, sn = Math.sin(th), cs = Math.cos(th), Hh = L * sn, a = c.a, s = Math.max(0, Math.min(L - 0.4, s0 + 0.5 * a * st.t * st.t)), v = a * st.t;
      if (s <= 0 || s >= L - 0.4) v = 0;
      iso(g, -0.5, L * cs + 1, -1, Math.max(Hh, 2) + 2.2); g.limpiar();
      g.poligono([[0, 0], [L * cs, 0], [0, Hh]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 1.8 });
      var ux = cs, uy = -sn, nx = sn, ny = cs, b = 0.9, px = s * ux, py = Hh + s * uy, cx = px + (b / 2) * nx, cy = py + (b / 2) * ny;
      g.poligono([[px - b / 2 * ux, py - b / 2 * uy], [px + b / 2 * ux, py + b / 2 * uy], [px + b / 2 * ux + b * nx, py + b / 2 * uy + b * ny], [px - b / 2 * ux + b * nx, py - b / 2 * uy + b * ny]], { clase: "z-hl", borde: "var(--ink)", grosor: 1.8 });
      var P = st.m * D.g, k = 2.3 / Math.max(P, Math.abs(st.F), c.Frmax, 1);
      vec(g, cx, cy, cx, cy - P * k, "c-ink", "P", { dx: 6, dy: 12 });                                       // peso
      g.segmento(cx, cy, cx + c.Pp * k * ux, cy + c.Pp * k * uy, { clase: "c-faint", dash: "4 4" });          // P∥
      g.segmento(cx, cy, cx - c.Pn * k * nx, cy - c.Pn * k * ny, { clase: "c-faint", dash: "4 4" });          // P⊥
      vec(g, cx, cy, cx + c.N * k * nx, cy + c.N * k * ny, "c-ok", "N", { dx: 6, dy: -4 });
      if (Math.abs(c.Fr) > 0.05) vec(g, cx, cy, cx + c.Fr * k * ux, cy + c.Fr * k * uy, "c-red", "Fr", { dx: -6, dy: -6, ancla: "end" });
      if (Math.abs(st.F) > 0.05) vec(g, cx, cy, cx - st.F * k * ux, cy - st.F * k * uy, "c-pen", "F", { dx: 6, dy: -6 });
      g.texto(L * cs * 0.7, 0, "θ = " + f2(st.th, 0) + "°", { dy: -8, ancla: "middle", clase: "faint" });
      var frn = c.estado === "reposo" ? Math.abs(c.Fn) : c.Frmax, estado = c.estado === "reposo" ? "en reposo (rozamiento estático)" : c.estado === "baja" ? "desliza plano abajo" : "desliza plano arriba";
      lectura.innerHTML = lec("P∥ = m·g·sen θ (a favor del plano)", f2(c.Pp, 2) + " N", "") + lec("P⊥ = m·g·cos θ (= N)", f2(c.Pn, 2) + " N", "ok") + lec("Rozamiento máximo μ·N", f2(c.Frmax, 2) + " N", "red") +
        lec("Rozamiento que actúa", f2(frn, 2) + " N" + (c.estado === "reposo" ? " (= fuerza neta que lo intentaría mover)" : ""), "red") +
        lec("Fuerza neta a lo largo del plano", f2(c.Fn + c.Fr, 2) + " N", "pen") + lec("Aceleración", f2(Math.abs(a), 3) + " m/s²" + (a !== 0 ? (a > 0 ? " (plano abajo)" : " (plano arriba)") : ""), "ok") +
        lec("Estado", estado, "ancho red") + lec("Velocidad ahora", f2(Math.abs(v), 2) + " m/s") + (st.F === 0 ? lec("Ángulo crítico  tan θ = μ", f2(Math.atan(st.mu) / R, 1) + "°  (" + (st.th > Math.atan(st.mu) / R + 1e-9 ? "desliza" : "no desliza") + ")", "ancho") : "");
      pie.innerHTML = "El peso se descompone en <b>P∥ = m·g·sen θ</b> (tira del bloque plano abajo) y <b>P⊥ = m·g·cos θ</b> (lo aprieta contra el plano y lo equilibra la normal: N = m·g·cos θ). El rozamiento máximo es μ·N. Si P∥ (más F) no supera ese máximo el bloque no se mueve; si lo supera, a = (fuerza neta)/m. Las flechas discontinuas son las <b>componentes</b> del peso, no fuerzas añadidas.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PP.map(function (p) { return { k: p.k, t: p.t }; }), "mad", function (k) {
      var p = PP.filter(function (z) { return z.k === k; })[0]; st.th = p.th; st.mu = p.mu; st.m = p.m; st.F = p.F;
      sl.th.set(p.th); sl.mu.set(p.mu); sl.m.set(p.m); sl.F.set(p.F); reinicia();
    });
    pinta();
  };

  // ============================================================
  // F10_POLEAS: sistemas de dos cuerpos unidos por una cuerda
  // ============================================================
  B.w.f10_poleas = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Dos cuerpos unidos por una cuerda: Atwood, mesa y plano");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 5, st = { modo: "atwood", m1: 3, m2: 5, mu: 0.2, th: 30, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -1, ymax: 8, w: 600, h: 380, limpio: true, etiqueta: "Dos cuerpos unidos por una cuerda y una polea" });
    function reinicia() { st.t = 0; sl.t.set(0); pinta(); }
    sl.m1 = U.slider(ctl, { et: "Masa m₁", min: 1, max: 10, step: 0.5, val: st.m1, on: function (v) { st.m1 = v; reinicia(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.m2 = U.slider(ctl, { et: "Masa m₂ (colgante)", min: 1, max: 10, step: 0.5, val: st.m2, on: function (v) { st.m2 = v; reinicia(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 0.8, step: 0.01, val: st.mu, on: function (v) { st.mu = v; reinicia(); }, fmt: function (v) { return f2(v, 2); } });
    sl.th = U.slider(ctl, { et: "Ángulo θ", min: 15, max: 60, step: 1, val: st.th, on: function (v) { st.th = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function calc() {          // a > 0: m₂ desciende
      var G = D.g, m1 = st.m1, m2 = st.m2, mu = st.mu, th = st.th * R, a, T, estado;
      if (st.modo === "atwood") { var q = D.atwood(m1, m2); a = q.a; T = m1 * (G + a); estado = Math.abs(a) < 1e-9 ? "equilibrio" : a > 0 ? "m₂ baja, m₁ sube" : "m₁ baja, m₂ sube"; }
      else if (st.modo === "mesa") {
        if (m2 * G <= mu * m1 * G + 1e-12) { a = 0; T = m2 * G; estado = "no se mueve: el rozamiento estático basta"; }
        else { a = (m2 - mu * m1) * G / (m1 + m2); T = m2 * (G - a); estado = "m₂ baja y m₁ se desliza hacia la polea"; }
      } else {
        var Pp = m1 * G * Math.sin(th), Fr = mu * m1 * G * Math.cos(th), ar = (m2 * G - Pp - Fr) / (m1 + m2), ad = (m2 * G - Pp + Fr) / (m1 + m2);
        if (ar > 1e-12) { a = ar; estado = "m₂ baja y m₁ sube por el plano"; T = m2 * (G - a); }
        else if (ad < -1e-12) { a = ad; estado = "m₁ baja por el plano y m₂ sube"; T = m2 * (G - a); }
        else { a = 0; estado = "no se mueve (rozamiento estático)"; T = m2 * G; }
      }
      return { a: a, T: T, estado: estado };
    }
    function bl(m) { return 0.45 + 0.13 * m; }          // lado del bloque según su masa
    function cuerda(x0, y0, x1, y1) { g.segmento(x0, y0, x1, y1, { clase: "c-ink" }).setAttribute("stroke-width", 1.6); }
    function polea(cx, cy, r) { g.punto(cx, cy, { r: Math.abs(g.px(cx + r) - g.px(cx)), clase: "c-faint" }); g.punto(cx, cy, { r: 4, clase: "c-ink" }); }
    function pinta() {
      var c = calc(), a = c.a, t = st.t, d = Math.max(-1.6, Math.min(1.6, 0.5 * a * t * t)), vel = a * t, h1 = bl(st.m1), h2 = bl(st.m2), th = st.th * R, G = D.g;
      sl.mu.el.style.display = st.modo === "atwood" ? "none" : ""; sl.th.el.style.display = st.modo === "plano" ? "" : "none";
      if (Math.abs(d) >= 1.6) vel = 0;
      if (st.modo === "atwood") {
        iso(g, -4.5, 4.5, -0.5, 8.5); g.limpiar();
        var top1 = 4.6 + d, top2 = 4.6 - d, cy = 7.4, r = 0.6;
        g.segmento(-4.5, 0, 4.5, 0, { clase: "c-ink" });
        polea(0, cy, r);
        cuerda(-r, cy, -r, top1); cuerda(r, cy, r, top2);
        caja(g, -r, top1 - h1, h1, h1, "z-pen", "var(--pen)"); caja(g, r, top2 - h2, h2, h2, "z-ok", "var(--ok)");
        g.texto(-r, top1 - h1 / 2, "m₁", { ancla: "middle", dy: 4, clase: "pen" }); g.texto(r, top2 - h2 / 2, "m₂", { ancla: "middle", dy: 4, clase: "ok" });
        var k = 1.8 / Math.max(st.m1 * G, st.m2 * G);
        vec(g, -r, top1 - h1, -r, top1 - h1 + c.T * k, "c-red", "T", { dx: -6, ancla: "end", dy: 4 }); vec(g, -r, top1 - h1, -r, top1 - h1 - st.m1 * G * k, "c-ink", "P₁", { dx: -6, ancla: "end", dy: 12 });
        vec(g, r, top2 - h2, r, top2 - h2 + c.T * k, "c-red", "T", { dx: 6, dy: 4 }); vec(g, r, top2 - h2, r, top2 - h2 - st.m2 * G * k, "c-ink", "P₂", { dx: 6, dy: 12 });
      } else if (st.modo === "mesa") {
        iso(g, -6, 3.5, -1.5, 7); g.limpiar();
        var yt = 3.4, xb = -2.6 + d, ymid = yt + h1 / 2, rr = 0.55, pcx = 0.3, pcy = ymid - rr + 0.0;
        g.segmento(-6, -1.2, 3.5, -1.2, { clase: "c-ink" });
        g.poligono([[-6, yt], [0, yt], [0, yt - 0.3], [-6, yt - 0.3]], { clase: "z-hl", borde: "var(--ink-soft)", grosor: 1.6 });
        g.segmento(-5.6, yt - 0.3, -5.6, -1.2, { clase: "c-faint" }); g.segmento(-0.4, yt - 0.3, -0.4, -1.2, { clase: "c-faint" });
        pcy = ymid - rr;
        polea(pcx, pcy, rr);
        var top2m = pcy - 0.5 - d;
        cuerda(xb + h1 / 2, ymid, pcx, ymid); cuerda(pcx + rr, pcy, pcx + rr, top2m);
        caja(g, xb, yt, h1, h1, "z-pen", "var(--pen)"); g.texto(xb, yt + h1 / 2, "m₁", { ancla: "middle", dy: 4, clase: "pen" });
        caja(g, pcx + rr, top2m - h2, h2, h2, "z-ok", "var(--ok)"); g.texto(pcx + rr, top2m - h2 / 2, "m₂", { ancla: "middle", dy: 4, clase: "ok" });
        var km = 1.8 / Math.max(st.m2 * G, st.mu * st.m1 * G, 1);
        vec(g, xb + h1 / 2, ymid, xb + h1 / 2 + c.T * km, ymid, "c-red", "T", { dy: -8 });
        if (st.mu > 0) { var frm = Math.min(st.mu * st.m1 * G, c.a === 0 ? c.T : 1e9); vec(g, xb - h1 / 2, yt + 0.15, xb - h1 / 2 - frm * km, yt + 0.15, "c-faint", "Fr", { ancla: "end", dy: 14 }); }
        vec(g, pcx + rr, top2m - h2, pcx + rr, top2m - h2 + c.T * km, "c-red", "T", { dx: 6, dy: 4 }); vec(g, pcx + rr, top2m - h2, pcx + rr, top2m - h2 - st.m2 * G * km, "c-ink", "P₂", { dx: 6, dy: 12 });
      } else {
        var Lr = 5, cs = Math.cos(th), sn = Math.sin(th), Hh = Lr * sn;
        iso(g, -Lr * cs - 0.5, 3, -4.6, Hh + 2.4); g.limpiar();
        g.segmento(-Lr * cs - 0.5, -4.4, 3, -4.4, { clase: "c-ink" });
        g.poligono([[-Lr * cs, 0], [0, Hh], [0, -4.4], [-Lr * cs, -4.4]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 1.6 });
        var nx = -sn, ny = cs, ux = cs, uy = sn, off = 0.5, rp = 0.4, pc = [nx * (off - rp), Hh + ny * (off - rp)], sx = 2.2 - d;      // s: distancia al vértice a lo largo del plano
        polea(pc[0], pc[1], rp);
        var bp = [-sx * ux, Hh - sx * uy], bc = [bp[0] + nx * 0.5 * 0.9, bp[1] + ny * 0.5 * 0.9], bb = 0.9;
        g.poligono([[bp[0] - bb / 2 * ux, bp[1] - bb / 2 * uy], [bp[0] + bb / 2 * ux, bp[1] + bb / 2 * uy], [bp[0] + bb / 2 * ux + bb * nx, bp[1] + bb / 2 * uy + bb * ny], [bp[0] - bb / 2 * ux + bb * nx, bp[1] - bb / 2 * uy + bb * ny]], { clase: "z-pen", borde: "var(--pen)", grosor: 1.8 });
        g.texto(bc[0], bc[1], "m₁", { ancla: "middle", dy: 4, clase: "pen" });
        cuerda(bp[0] + nx * off + bb / 2 * ux, bp[1] + ny * off + bb / 2 * uy, nx * off, Hh + ny * off);
        var top2p = pc[1] - 0.4 - d;
        cuerda(pc[0] + rp, pc[1], pc[0] + rp, top2p);
        caja(g, pc[0] + rp, top2p - h2, h2, h2, "z-ok", "var(--ok)"); g.texto(pc[0] + rp, top2p - h2 / 2, "m₂", { ancla: "middle", dy: 4, clase: "ok" });
        g.texto(-Lr * cs * 0.75, 0, "θ = " + f2(st.th, 0) + "°", { dy: -8, ancla: "middle", clase: "faint" });
      }
      var extra = st.modo === "mesa" ? lec("Rozamiento máximo en m₁ (μ·m₁·g)", f2(st.mu * st.m1 * G, 2) + " N", "red") : st.modo === "plano" ? lec("P₁∥ = m₁g sen θ  ·  μ·N₁", f2(st.m1 * G * Math.sin(th), 2) + " N  ·  " + f2(st.mu * st.m1 * G * Math.cos(th), 2) + " N", "red") : "";
      lectura.innerHTML = lec("Aceleración del sistema", f2(Math.abs(a), 3) + " m/s²", "ok") + lec("Tensión de la cuerda T", f2(c.T, 2) + " N", "red") + lec("Peso de m₂ (para comparar)", f2(st.m2 * G, 2) + " N") + lec("¿T = m₂·g?", Math.abs(c.T - st.m2 * G) < 1e-6 ? "sí (no hay aceleración)" : "no: T " + (c.T < st.m2 * G ? "&lt;" : "&gt;") + " m₂·g", "") +
        extra + lec("Velocidad ahora", f2(Math.abs(vel), 2) + " m/s") + lec("Estado", c.estado, "ancho pen");
      pie.innerHTML = st.modo === "atwood" ? "<b>Máquina de Atwood</b>: la cuerda tiene la <b>misma tensión</b> en ambos lados y los dos cuerpos tienen la <b>misma aceleración</b> (en módulo). Para cada cuerpo: m₂g − T = m₂a y T − m₁g = m₁a. Sumando: <b>a = (m₂ − m₁)g/(m₁ + m₂)</b>. Con masas iguales, a = 0. La tensión nunca coincide con ningún peso salvo en equilibrio." :
        st.modo === "mesa" ? "<b>Mesa + colgante</b>: sobre m₂ (vertical): m₂g − T = m₂a. Sobre m₁ (horizontal): T − μm₁g = m₁a. Sumando: <b>a = (m₂ − μm₁)g/(m₁ + m₂)</b>; la normal de m₁ es su peso. Si m₂g no supera el rozamiento máximo de m₁, el sistema ni arranca." :
        "<b>Plano + colgante</b>: sobre m₁, a lo largo del plano: T − m₁g sen θ − μm₁g cos θ = m₁a. Sobre m₂: m₂g − T = m₂a. Sumando: <b>a = (m₂ − m₁ sen θ − μm₁ cos θ)g/(m₁ + m₂)</b>. Observa que si m₂ es muy pequeña, m₁ baja por el plano y el rozamiento cambia de sentido.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "atwood", t: "Máquina de Atwood" }, { k: "mesa", t: "Mesa con bloque colgante" }, { k: "plano", t: "Plano con bloque colgante" }], "atwood", function (k) { st.modo = k; reinicia(); });
    pinta();
  };

  // ============================================================
  // F10_CURVA: curva plana y peraltada (dinámica circular)
  // ============================================================
  function vcurva(r, mu, thG) {          // velocidades límite en m/s
    var tn = Math.tan(thG * R), vmax = (1 - mu * tn) > 1e-9 ? Math.sqrt(r * D.g * (tn + mu) / (1 - mu * tn)) : Infinity, vmin = tn > mu ? Math.sqrt(r * D.g * (tn - mu) / (1 + mu * tn)) : 0;
    return { vmax: vmax, vmin: vmin, vid: Math.sqrt(r * D.g * tn) };
  }
  D.vcurva = vcurva;
  B.w.f10_curva = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Un coche en una curva: rozamiento y peralte");
    cuerpo.innerHTML = '<div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { v: 60, r: 100, mu: 0.6, th: 0, m: 1000 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -5, xmax: 5, ymin: -3, ymax: 4, w: 300, h: 300, limpio: true, etiqueta: "Coche en una curva visto desde atrás" });
    var gV = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 300, ymin: 0, ymax: 200, w: 300, h: 300, etx: "r (m)", ety: "v (km/h)", etiqueta: "Velocidad máxima frente al radio" });
    iso(gE, -5, 5, -3, 4);
    sl.v = U.slider(ctl, { et: "Velocidad v", min: 10, max: 160, step: 1, val: st.v, on: function (v) { st.v = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " km/h"; } });
    sl.r = U.slider(ctl, { et: "Radio de la curva r", min: 20, max: 300, step: 5, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " m"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0.05, max: 1, step: 0.01, val: st.mu, on: function (v) { st.mu = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    sl.th = U.slider(ctl, { et: "Peralte θ", min: 0, max: 30, step: 1, val: st.th, on: function (v) { st.th = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.m = U.slider(ctl, { et: "Masa del coche", min: 500, max: 2500, step: 100, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    function pinta() {
      var v = st.v / 3.6, th = st.th * R, ac = v * v / st.r, N = st.m * (D.g * Math.cos(th) + ac * Math.sin(th)), Frn = st.m * (ac * Math.cos(th) - D.g * Math.sin(th)), muN = Math.abs(Frn) / N, lim = vcurva(st.r, st.mu, st.th), ok = muN <= st.mu + 1e-12;
      var P = st.m * D.g, k = 2.2 / Math.max(P, N, Math.abs(Frn), st.m * ac);
      gE.limpiar();
      var Rx = 5, ys = Rx * Math.tan(th);
      g_road(gE, th, ok);
      var cx = -Math.sin(th) * 0.85, cy = Math.cos(th) * 0.85;               // centro del coche
      vec(gE, cx, cy, cx, cy - P * k, "c-ink", "P", { dx: 6, dy: 12 });
      vec(gE, cx, cy, cx - Math.sin(th) * N * k, cy + Math.cos(th) * N * k, "c-ok", "N", { dx: -6, dy: -2, ancla: "end" });
      if (Math.abs(Frn) > 1) vec(gE, cx, cy, cx - Math.cos(th) * Frn * k, cy - Math.sin(th) * Frn * k, "c-red", "Fr", { dx: 6, dy: 10 });
      gE.texto(-4.8, 3.4, "⟵ centro", { clase: "faint" });
      // v máx(r)
      gV.rango(0, 300, 0, 200); gV.limpiar();
      gV.curva(function (r) { return Math.min(220, vcurva(r, st.mu, st.th).vmax * 3.6); }, { clase: "c-red", x0: 20, x1: 300, n: 120 }).setAttribute("stroke-width", 3);
      if (lim.vmin > 0) gV.curva(function (r) { return vcurva(r, st.mu, st.th).vmin * 3.6; }, { clase: "c-pen", x0: 20, x1: 300, n: 120, dash: "5 4" });
      gV.punto(st.r, st.v, { r: 7, clase: ok ? "c-ok" : "c-red" });
      lectura.innerHTML = lec("Aceleración centrípeta  a = v²/r", f2(ac, 2) + " m/s²", "pen") + lec("Fuerza centrípeta necesaria  m·v²/r", f2(st.m * ac, 0) + " N", "pen") + lec("Normal  N", f2(N, 0) + " N", "ok") +
        lec("Rozamiento necesario  F<sub>r</sub>", f2(Math.abs(Frn), 0) + " N" + (Frn < 0 ? " (hacia fuera)" : " (hacia el centro)"), "red") + lec("μ necesario  F<sub>r</sub>/N", f2(muN, 3), ok ? "ok" : "red") +
        lec("Velocidad máxima sin derrapar", isFinite(lim.vmax) ? f2(lim.vmax * 3.6, 1) + " km/h" : "sin límite", "red") + (st.th > 0 ? lec("Velocidad «ideal» (sin rozamiento)", f2(lim.vid * 3.6, 1) + " km/h", "") : "") +
        lec("Resultado", ok ? "el coche toma la curva" : (Frn > 0 ? "DERRAPA hacia fuera: v demasiado alta" : "se desliza hacia dentro: v demasiado baja"), "ancho " + (ok ? "ok" : "red"));
      pie.innerHTML = "En una curva la fuerza neta debe apuntar al centro con valor m·v²/r (<b>fuerza centrípeta</b>: no es una fuerza nueva, es la resultante de las reales). En una curva <b>plana</b> la aporta sólo el rozamiento: m·v²/r ≤ μ·m·g, luego <b>v<sub>máx</sub> = √(μ·g·r)</b> y no depende de la masa. Con <b>peralte</b>, la normal también empuja hacia dentro: v² = r·g·(tan θ + μ)/(1 − μ·tan θ). La curva roja es el límite superior; si hay peralte, la azul discontinua es el límite inferior.";
    }
    function g_road(g, th, ok) {
      var c = Math.cos(th), s = Math.sin(th), long = 5;
      g.poligono([[-long * c, -long * s], [long * c, long * s], [long * c, -3], [-long * c, -3]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 1.6 });
      var u = [c, s], n = [-s, c], pts = [[-1.8, 0.15], [1.8, 0.15], [1.8, 0.8], [1.05, 1.5], [-1.05, 1.5], [-1.8, 0.8]].map(function (p) { return [p[0] * u[0] + p[1] * n[0], p[0] * u[1] + p[1] * n[1]]; });
      g.poligono(pts, { clase: ok ? "z-ok" : "z-red", borde: ok ? "var(--ok)" : "var(--red)", grosor: 2 });
      g.punto(-1.1 * u[0] + 0.15 * n[0], -1.1 * u[1] + 0.15 * n[1], { r: 6, clase: "c-ink" }); g.punto(1.1 * u[0] + 0.15 * n[0], 1.1 * u[1] + 0.15 * n[1], { r: 6, clase: "c-ink" });
    }
    pinta();
  };

  // ============================================================
  // F10_CHOQUE: choques en una dimensión
  // ============================================================
  var PCH = [
    { k: "el", t: "Elástico, masas iguales", m1: 4, v1: 4, m2: 4, v2: 0, e: 1 },
    { k: "in", t: "Perfectamente inelástico", m1: 4, v1: 4, m2: 4, v2: 0, e: 0 },
    { k: "pes", t: "El ligero choca con el pesado", m1: 2, v1: 4, m2: 8, v2: 0, e: 1 },
    { k: "par", t: "Parcialmente elástico (e = 0,5)", m1: 4, v1: 4, m2: 4, v2: -2, e: 0.5 },
    { k: "frente", t: "De frente con distinta masa", m1: 6, v1: 3, m2: 2, v2: -3, e: 1 }
  ];
  B.w.f10_choque = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Choques en una dimensión: cantidad de movimiento y energía");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-escena"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 4, TC = 1.2, st = { m1: 4, v1: 4, m2: 4, v2: 0, e: 1, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -12, xmax: 12, ymin: -1, ymax: 4, w: 640, h: 200, limpio: true, etiqueta: "Dos carritos que chocan" });
    function reinicia() { st.t = 0; sl.t.set(0); pinta(); }
    sl.m1 = U.slider(ctl, { et: "Masa m₁ (azul)", min: 1, max: 10, step: 1, val: st.m1, on: function (v) { st.m1 = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.v1 = U.slider(ctl, { et: "Velocidad v₁", min: -6, max: 6, step: 0.5, val: st.v1, on: function (v) { st.v1 = v; reinicia(); }, fmt: function (v) { return f2(v, 1) + " m/s"; } });
    sl.m2 = U.slider(ctl, { et: "Masa m₂ (verde)", min: 1, max: 10, step: 1, val: st.m2, on: function (v) { st.m2 = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.v2 = U.slider(ctl, { et: "Velocidad v₂", min: -6, max: 6, step: 0.5, val: st.v2, on: function (v) { st.v2 = v; reinicia(); }, fmt: function (v) { return f2(v, 1) + " m/s"; } });
    sl.e = U.slider(ctl, { et: "Coef. de restitución e", min: 0, max: 1, step: 0.05, val: st.e, on: function (v) { st.e = v; reinicia(); }, fmt: function (v) { return f2(v, 2); } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var m1 = st.m1, m2 = st.m2, v1 = st.v1, v2 = st.v2, e = st.e, acerca = v1 - v2 > 1e-9, r = D.choque(m1, v1, m2, v2, e), t = st.t;
      // posiciones relativas al centro de masas: el choque ocurre en t = TC (en x_cm del instante)
      var vcm = (m1 * v1 + m2 * v2) / (m1 + m2), w1 = 1.2 + 0.7 * Math.sqrt(m1), w2 = 1.2 + 0.7 * Math.sqrt(m2), d0 = (w1 + w2) / 2;
      var gap0 = acerca ? (v1 - v2) * TC : 6, x1, x2, vv1, vv2;       // separación centro-centro antes: d0 + gap
      var s0 = d0 + gap0;
      if (acerca) {
        if (t < TC) { vv1 = v1; vv2 = v2; } else { vv1 = r.v1; vv2 = r.v2; }
        // posición relativa: s(t) = s0 - (v1 - v2)t antes; después s = d0 + (r.v2 - r.v1)(t - TC)
        var s = t < TC ? s0 - (v1 - v2) * t : d0 + (r.v2 - r.v1) * (t - TC);
        x1 = -(m2 / (m1 + m2)) * s; x2 = (m1 / (m1 + m2)) * s;
      } else { var sl_ = s0 + (v2 - v1) * t; x1 = -(m2 / (m1 + m2)) * sl_; x2 = (m1 / (m1 + m2)) * sl_; vv1 = v1; vv2 = v2; }
      var ext = Math.max(10, Math.abs(x1) + w1, Math.abs(x2) + w2, (acerca ? s0 : 8)); ext = Math.ceil(ext * 1.1);
      gE.rango(-ext, ext, -1, 4); gE.limpiar();
      gE.segmento(-ext, 0, ext, 0, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      var off = (((-vcm * t) % 4) + 4) % 4, i, unit = ext / 12;
      for (i = -8; i <= 8; i++) { var xm = i * 4 + off; if (xm > -ext && xm < ext) gE.segmento(xm, 0, xm, -0.2, { clase: "c-ink" }); }
      function carro(x, w, m, clase, borde, et) { var ww = w * unit, hh = 0.6 + 0.12 * m; caja(gE, x, 0.15, ww, hh, clase, borde); gE.punto(x - ww * 0.3, 0.15, { r: 4.5, clase: "c-ink" }); gE.punto(x + ww * 0.3, 0.15, { r: 4.5, clase: "c-ink" }); gE.texto(x, 0.15 + hh / 2, et, { ancla: "middle", dy: 4 }); }
      carro(x1, w1, m1, "z-pen", "var(--pen)", f2(m1, 0) + " kg"); carro(x2, w2, m2, "z-ok", "var(--ok)", f2(m2, 0) + " kg");
      if (Math.abs(vv1) > 0.01) vec(gE, x1, 2.6, x1 + vv1 * unit * 0.8, 2.6, "c-pen", "v₁", { dy: -8 });
      if (Math.abs(vv2) > 0.01) vec(gE, x2, 3.2, x2 + vv2 * unit * 0.8, 3.2, "c-ok", "v₂", { dy: -8 });
      var p0 = m1 * v1 + m2 * v2, p1 = m1 * r.v1 + m2 * r.v2, E0 = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2, E1 = 0.5 * m1 * r.v1 * r.v1 + 0.5 * m2 * r.v2 * r.v2;
      lectura.innerHTML = (acerca ? "" : lec("Aviso", "con estas velocidades no chocan (v₁ ≤ v₂): aumenta v₁ o disminuye v₂", "ancho red")) +
        lec("Antes: v₁ ; v₂", f2(v1, 2) + " ; " + f2(v2, 2) + " m/s") + lec("Después: v₁′ ; v₂′", acerca ? f2(r.v1, 2) + " ; " + f2(r.v2, 2) + " m/s" : "—", "ok") +
        lec("Cantidad de movimiento p antes → después", acerca ? f2(p0, 2) + " → " + f2(p1, 2) + " kg·m/s" : f2(p0, 2) + " kg·m/s", "pen") + lec("Energía cinética antes → después", acerca ? f2(E0, 2) + " → " + f2(E1, 2) + " J" : f2(E0, 2) + " J", "red") +
        lec("Energía perdida (calor y deformación)", acerca ? f2(E0 - E1, 2) + " J" + (E0 > 0 ? " (" + f2((E0 - E1) / E0 * 100, 0) + " %)" : "") : "—", "red") + lec("Velocidad del centro de masas", f2(vcm, 2) + " m/s (no cambia)", "");
      pie.innerHTML = "En cualquier choque, si no hay fuerzas externas, la <b>cantidad de movimiento total se conserva</b> (3.ª ley: las fuerzas internas son iguales y opuestas). La energía cinética sólo se conserva en el choque <b>elástico</b> (e = 1); en el perfectamente inelástico (e = 0) los cuerpos quedan unidos con la velocidad del centro de masas y se pierde la mayor energía posible. La cámara sigue al centro de masas.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PCH.map(function (p) { return { k: p.k, t: p.t }; }), "el", function (k) {
      var p = PCH.filter(function (z) { return z.k === k; })[0]; st.m1 = p.m1; st.v1 = p.v1; st.m2 = p.m2; st.v2 = p.v2; st.e = p.e;
      sl.m1.set(p.m1); sl.v1.set(p.v1); sl.m2.set(p.m2); sl.v2.set(p.v2); sl.e.set(p.e); reinicia();
    });
    pinta();
  };

  // ============================================================
  // F10_CAIDA: caída con resistencia del aire (velocidad límite)
  // ============================================================
  var PCA = [
    { k: "para", t: "Paracaidista en picado (55 m/s)", vl: 55 },
    { k: "abre", t: "Con el paracaídas abierto (6 m/s)", vl: 6 },
    { k: "gota", t: "Gota de lluvia (8 m/s)", vl: 8 },
    { k: "pluma", t: "Una pluma (1 m/s)", vl: 1 },
    { k: "bola", t: "Bola de acero (110 m/s)", vl: 110 }
  ];
  B.w.f10_caida = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Caída con resistencia del aire: velocidad límite");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 20, st = { vl: 55, m: 80, t: 6 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gV = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: 0, xmax: TM, ymin: 0, ymax: 60, w: 320, h: 270, etx: "t (s)", ety: "v (m/s)", etiqueta: "Velocidad frente al tiempo" });
    var gF = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: TM, ymin: 0, ymax: 1000, w: 320, h: 270, etx: "t (s)", ety: "F (N)", etiqueta: "Peso y resistencia del aire" });
    sl.vl = U.slider(ctl, { et: "Velocidad límite", min: 1, max: 120, step: 1, val: st.vl, on: function (v) { st.vl = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " m/s"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.05, max: 100, step: 0.05, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " kg"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " s"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var G = D.g, vl = st.vl, m = st.m, t = st.t, kq = m * G / (vl * vl), vt = function (s) { return vl * Math.tanh(G * s / vl); }, v = vt(t), y = vl * vl / G * Math.log(Math.cosh(G * t / vl)), a = G * (1 - v * v / (vl * vl)), Fa = kq * v * v, P = m * G;
      var vmax = Math.max(10, Math.ceil(Math.min(vl * 1.15, G * TM) / 10) * 10);
      gV.rango(0, TM, 0, vmax); gV.limpiar();
      gV.segmento(0, vl, TM, vl, { clase: "c-faint", dash: "5 4" }); gV.texto(TM, vl, "v límite", { dx: -4, dy: -6, ancla: "end", clase: "faint" });
      gV.segmento(0, 0, Math.min(TM, vmax / G), G * Math.min(TM, vmax / G), { clase: "c-ok", dash: "5 4" });
      gV.curva(vt, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      gV.segmento(t, 0, t, v, { clase: "c-faint", dash: "3 4" }); gV.punto(t, v, { r: 6, clase: "c-red" });
      gF.rango(0, TM, 0, Math.max(10, Math.ceil(P * 1.2 / 10) * 10)); gF.limpiar();
      gF.segmento(0, P, TM, P, { clase: "c-ink" }).setAttribute("stroke-width", 3); gF.texto(TM, P, "peso m·g", { dx: -4, dy: -6, ancla: "end" });
      gF.curva(function (s) { return kq * vt(s) * vt(s); }, { clase: "c-red", n: 200 }).setAttribute("stroke-width", 3);
      gF.segmento(t, 0, t, Fa, { clase: "c-faint", dash: "3 4" }); gF.punto(t, Fa, { r: 6, clase: "c-red" });
      var t95 = vl / G * Math.atanh(0.95);
      lectura.innerHTML = lec("Velocidad v(t)", f2(v, 2) + " m/s = " + f2(v * 3.6, 1) + " km/h", "pen") + lec("Aceleración a = g(1 − v²/v<sub>lím</sub>²)", f2(a, 3) + " m/s²", "ok") + lec("Resistencia del aire  k·v²", f2(Fa, 1) + " N de " + f2(P, 1) + " N de peso", "red") +
        lec("Distancia caída", f2(y, 1) + " m") + lec("Sin aire  (v = g·t)", f2(G * t, 1) + " m/s ; " + f2(0.5 * G * t * t, 1) + " m", "") + lec("Tiempo para alcanzar el 95 % de v<sub>lím</sub>", f2(t95, 1) + " s", "") +
        lec("Constante k = m·g/v<sub>lím</sub>²", f2(kq, 3) + " kg/m", "");
      pie.innerHTML = "Con resistencia del aire F<sub>aire</sub> = k·v² (proporcional al cuadrado de la velocidad) la fuerza neta es m·g − k·v². Al principio v es pequeña y a ≈ g; conforme v crece, la resistencia aumenta hasta igualar al peso: entonces <b>ΣF = 0, a = 0</b> y el cuerpo cae con <b>velocidad constante</b> (la 1.ª ley otra vez): v<sub>lím</sub> = √(m·g/k). La curva verde discontinua es la caída libre sin aire.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PCA.map(function (p) { return { k: p.k, t: p.t }; }), "para", function (k) { var p = PCA.filter(function (z) { return z.k === k; })[0]; st.vl = p.vl; sl.vl.set(p.vl); pinta(); });
    pinta();
  };

  // ============================================================
  // F10_LEER: lee fuerzas en gráficas v–t
  // ============================================================
  var GVF = [
    { k: "A", t: "Gráfica A (m = 2 kg)", tmax: 10, rg: [0, 25], pts: [[0, 0], [5, 20], [10, 20]], preguntas: [
      { q: "¿Cuánto vale la aceleración entre 0 y 5 s?", op: ["4 m/s²", "20 m/s²", "2 m/s²", "0"], ok: 0, por: "Pendiente = (20 − 0)/5 = 4 m/s²." },
      { q: "¿Qué fuerza neta actúa sobre el cuerpo en ese tramo (m = 2 kg)?", op: ["8 N", "40 N", "4 N", "0"], ok: 0, por: "ΣF = m·a = 2·4 = 8 N." },
      { q: "¿Y entre 5 s y 10 s?", op: ["Fuerza neta nula (MRU)", "8 N", "20 N", "−8 N"], ok: 0, por: "v es constante: a = 0, luego ΣF = 0 (1.ª ley)." },
      { q: "Si hay rozamiento constante de 3 N, ¿qué fuerza aplicada hace falta en 0–5 s?", op: ["11 N", "8 N", "5 N", "3 N"], ok: 0, por: "F − Fr = m·a → F = 8 + 3 = 11 N." } ] },
    { k: "B", t: "Gráfica B (m = 5 kg)", tmax: 10, rg: [-6, 12], pts: [[0, 10], [4, 10], [10, -5]], preguntas: [
      { q: "¿Cuánto vale la aceleración entre 4 s y 10 s?", op: ["−2,5 m/s²", "2,5 m/s²", "−15 m/s²", "−1,5 m/s²"], ok: 0, por: "Pendiente = (−5 − 10)/(10 − 4) = −2,5 m/s²." },
      { q: "¿Cuál es la fuerza neta en ese tramo y hacia dónde apunta?", op: ["12,5 N, en sentido negativo", "12,5 N, en sentido positivo", "50 N, en sentido negativo", "0"], ok: 0, por: "ΣF = 5·(−2,5) = −12,5 N: apunta en sentido negativo, aunque al principio el cuerpo se mueva en el positivo." },
      { q: "¿En qué instante se detiene momentáneamente?", op: ["8 s", "4 s", "10 s", "6 s"], ok: 0, por: "v = 10 − 2,5(t − 4) = 0 → t − 4 = 4 → t = 8 s." },
      { q: "¿Qué ocurre con el sentido de la velocidad después de ese instante?", op: ["Se invierte, pero la fuerza no cambia", "No cambia", "La fuerza se invierte", "La fuerza se anula"], ok: 0, por: "ΣF sigue siendo −12,5 N: el cuerpo frena, se para y vuelve hacia atrás." } ] },
    { k: "C", t: "Gráfica C (m = 1 kg)", tmax: 12, rg: [-1, 9], pts: [[0, 0], [3, 6], [6, 6], [9, 0], [12, 0]], preguntas: [
      { q: "¿En qué intervalos la fuerza neta es cero?", op: ["3–6 s y 9–12 s", "Sólo 3–6 s", "0–3 s", "Nunca"], ok: 0, por: "Cuando la gráfica es horizontal (v constante), a = 0 y ΣF = 0." },
      { q: "¿Cuánto vale la fuerza neta entre 6 s y 9 s?", op: ["−2 N", "2 N", "−6 N", "0"], ok: 0, por: "a = (0 − 6)/3 = −2 m/s²; ΣF = 1·(−2) = −2 N." },
      { q: "¿Qué distancia recorre en los 12 s (área bajo la curva)?", op: ["36 m", "72 m", "18 m", "48 m"], ok: 0, por: "Triángulo 0–3 s: ½·3·6 = 9 m; rectángulo 3–6 s: 3·6 = 18 m; triángulo 6–9 s: 9 m. Total: 36 m." } ] }
  ];
  B.w.f10_leer = function (host) { M.lector(host, "Entrenamiento", "Lee la fuerza neta en una gráfica velocidad–tiempo", GVF, "t (s)", "v (m/s)", "Recuerda: la pendiente de v–t es la aceleración y ΣF = m·a. Elige una respuesta en cada apartado."); };

  // ============================================================
  // F10_DCL: ¿qué fuerzas actúan? (diagrama de cuerpo libre)
  // ============================================================
  var s30 = Math.sin(30 * R), c30 = Math.cos(30 * R);
  var DCL = [
    { k: "mesa", t: "Libro en reposo sobre una mesa", ctx: "suelo", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Siempre actúa: la Tierra atrae al libro." },
      { n: "Normal", l: "N", d: [0, 1], por: "La mesa empuja al libro hacia arriba y lo equilibra." },
      { n: "Rozamiento", d: null, por: "No hay tendencia a deslizar: no hay rozamiento." },
      { n: "Fuerza de inercia", d: null, por: "La inercia es una propiedad, no una fuerza." } ] },
    { k: "empuje", t: "Caja empujada a velocidad constante", ctx: "suelo", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Siempre actúa." },
      { n: "Normal", l: "N", d: [0, 1], por: "El suelo empuja a la caja." },
      { n: "Fuerza de la mano", l: "F", d: [1, 0], por: "La mano está en contacto y empuja: es una fuerza real." },
      { n: "Rozamiento", l: "Fr", d: [-1, 0], por: "Se opone al deslizamiento; como v es constante, vale lo mismo que la mano." },
      { n: "«Fuerza del movimiento»", d: null, por: "No existe: para mantener v constante no hace falta ninguna fuerza neta." } ] },
    { k: "lanz", t: "Pelota subiendo tras lanzarla (sin aire)", ctx: "aire", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Es la única fuerza: por eso frena al subir y luego cae." },
      { n: "Fuerza de la mano", d: null, por: "Ya no hay contacto: la mano no actúa una vez soltada." },
      { n: "Fuerza que la impulsa hacia arriba", d: null, por: "Sube por inercia (velocidad adquirida), no por una fuerza hacia arriba." },
      { n: "Normal", d: null, por: "No hay ninguna superficie en contacto." } ] },
    { k: "plano", t: "Bloque deslizando plano abajo con rozamiento", ctx: "plano", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Vertical y hacia abajo. Sus componentes P∥ y P⊥ no son fuerzas añadidas." },
      { n: "Normal", l: "N", d: [s30, c30], por: "Perpendicular al plano." },
      { n: "Rozamiento", l: "Fr", d: [-c30, s30], por: "Paralelo al plano y contra el deslizamiento (plano arriba)." },
      { n: "Fuerza de bajada (P∥) como fuerza extra", d: null, por: "P∥ es una componente del peso: contarla además del peso sería contarla dos veces." } ] },
    { k: "curva", t: "Coche tomando una curva plana (visto de frente)", ctx: "suelo", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Siempre actúa." },
      { n: "Normal", l: "N", d: [0, 1], por: "El asfalto empuja al coche." },
      { n: "Rozamiento (hacia el centro)", l: "Fr", d: [-1, 0], por: "Es la fuerza real que hace de centrípeta." },
      { n: "Fuerza centrífuga", d: null, por: "Sólo existe en un sistema no inercial; en un diagrama de fuerzas reales no se dibuja." },
      { n: "Fuerza centrípeta (además de las otras)", d: null, por: "La centrípeta no es una fuerza nueva: es la resultante de las reales." } ] },
    { k: "colg", t: "Lámpara colgada del techo por un cable", ctx: "techo", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "La Tierra atrae a la lámpara." },
      { n: "Tensión del cable", l: "T", d: [0, 1], por: "El cable tira de la lámpara hacia arriba y equilibra el peso." },
      { n: "Normal", d: null, por: "No se apoya sobre ninguna superficie." },
      { n: "Fuerza del techo", d: null, por: "El techo actúa sobre el cable, no directamente sobre la lámpara." } ] },
    { k: "aire", t: "Paracaidista a velocidad límite", ctx: "aire", fz: [
      { n: "Peso", l: "P", d: [0, -1], por: "Siempre actúa." },
      { n: "Resistencia del aire", l: "R", d: [0, 1], por: "Hacia arriba y de igual módulo que el peso: ΣF = 0 y v constante." },
      { n: "Normal", d: null, por: "No hay superficie de apoyo." },
      { n: "Fuerza de la velocidad", d: null, por: "La velocidad no es una fuerza." } ] }
  ];
  B.w.f10_dcl = function (host) {
    var cuerpo = B.caja(host, "Actividad", "Diagrama de cuerpo libre: ¿qué fuerzas actúan?");
    cuerpo.innerHTML = '<p class="w-intro">Elige una situación, marca las fuerzas que actúan sobre el cuerpo y pulsa «Comprobar».</p><div data-sel class="chips"></div><div class="f8-dos"><div data-g></div><div data-lista></div></div><p class="w-pie"></p>';
    var st = { k: DCL[0].k, sel: {}, hecho: false }, pie = cuerpo.querySelector(".w-pie"), lista = cuerpo.querySelector("[data-lista]");
    var g = new B.Plot(cuerpo.querySelector("[data-g]"), { xmin: -4, xmax: 4, ymin: -3, ymax: 4, w: 320, h: 250, limpio: true, etiqueta: "Situación" });
    iso(g, -4, 4, -3, 4);
    function sc() { return DCL.filter(function (z) { return z.k === st.k; })[0]; }
    function dibuja() {
      var s = sc(), ctx = s.ctx;
      g.limpiar();
      if (ctx === "suelo") { g.segmento(-4, -0.9, 4, -0.9, { clase: "c-ink" }).setAttribute("stroke-width", 3); }
      if (ctx === "plano") { g.poligono([[-4, -0.4 + 4 * Math.tan(30 * R)], [4, -0.4 - 4 * Math.tan(30 * R)], [-4, -0.4 - 4 * Math.tan(30 * R)]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 1.6 }); }
      if (ctx === "techo") { g.segmento(-2, 3.6, 2, 3.6, { clase: "c-ink" }).setAttribute("stroke-width", 4); g.segmento(0, 3.6, 0, 0.3, { clase: "c-ink" }); }
      if (ctx === "plano") {
        var bx = 0, by = -0.4, ux = c30, uy = -s30, nx = s30, ny = c30, b = 1.0;
        g.poligono([[bx - b / 2 * ux, by - b / 2 * uy], [bx + b / 2 * ux, by + b / 2 * uy], [bx + b / 2 * ux + b * nx, by + b / 2 * uy + b * ny], [bx - b / 2 * ux + b * nx, by - b / 2 * uy + b * ny]], { clase: "z-hl", borde: "var(--ink)", grosor: 1.8 });
        g.punto(bx + b / 2 * nx, by + b / 2 * ny, { r: 3, clase: "c-ink" });
        s._cx = bx + b / 2 * nx; s._cy = by + b / 2 * ny;
      } else { caja(g, 0, -0.9, 1.4, 1.2, "z-hl", "var(--ink)"); s._cx = 0; s._cy = -0.3; g.punto(0, -0.3, { r: 3, clase: "c-ink" }); }
      if (st.hecho) {
        s.fz.forEach(function (f, i) {
          if (!f.d) return;
          var L = 1.9, cl = ["c-ink", "c-ok", "c-red", "c-pen", "c-faint"][Math.min(i, 4)];
          vec(g, s._cx, s._cy, s._cx + f.d[0] * L, s._cy + f.d[1] * L, cl, f.l || "F", { dx: 6, dy: -4, punta: 9 });
        });
      }
    }
    function lee() {
      var s = sc();
      lista.innerHTML = '<div class="chips" data-fz>' + s.fz.map(function (f, i) {
        var cls = "chip-btn" + (st.sel[i] ? " on" : "") + (st.hecho ? (!!f.d === !!st.sel[i] ? " bien" : " mal") : "");
        return '<button type="button" class="' + cls + '" data-i="' + i + '" aria-pressed="' + (!!st.sel[i]) + '">' + f.n + "</button>";
      }).join("") + "</div>" +
        (st.hecho ? '<div class="dcl-res">' + s.fz.map(function (f) {
          return '<p class="lg-r ' + (f.d ? "ok" : "mal") + '"><b>' + (f.d ? "✓ " : "✗ ") + f.n + ":</b> " + f.por + "</p>";
        }).join("") + "</div>" : "") +
        '<div class="chips"><button type="button" class="chip-btn" data-chk>' + (st.hecho ? "Otra vez" : "Comprobar") + "</button></div>";
      var ok = s.fz.every(function (f, i) { return !!f.d === !!st.sel[i]; });
      pie.innerHTML = st.hecho ? (ok ? "<b>¡Perfecto!</b> Ese es el diagrama de cuerpo libre correcto. Recuerda: sólo se dibujan <b>fuerzas reales</b> (interacciones con otros cuerpos) y sólo las que actúan <b>sobre el cuerpo</b> elegido." : "<b>Casi.</b> Mira los ✓ y ✗ de abajo: las fuerzas verdes son las que actúan; las rojas son confusiones típicas.") : "Truco: pregúntate «¿qué cuerpo toca al mío?» (contacto: normal, rozamiento, tensión, empujón) y «¿hay alguna atracción a distancia?» (el peso).";
    }
    lista.addEventListener("click", function (e) {
      var b = e.target.closest("[data-i]");
      if (b && !st.hecho) { var i = +b.getAttribute("data-i"); st.sel[i] = !st.sel[i]; lee(); return; }
      if (e.target.closest("[data-chk]")) { st.hecho = !st.hecho; if (!st.hecho) st.sel = {}; dibuja(); lee(); }
    });
    U.fichas(cuerpo.querySelector("[data-sel]"), DCL.map(function (z) { return { k: z.k, t: z.t }; }), DCL[0].k, function (k) { st.k = k; st.sel = {}; st.hecho = false; dibuja(); lee(); });
    dibuja(); lee();
  };
})(window);
