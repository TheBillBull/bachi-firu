/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 8: cinemática)
   motor B.lab.mec1 + f8_movil · f8_encuentro · f8_graficas · f8_caida
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var M = B.lab.mec1 = {};
  var R = Math.PI / 180;
  M.g = 9.8;

  // ------------------------------------------------------------
  // Motor: MRUA, encuentros, tiro parabólico, frenado
  // ------------------------------------------------------------
  M.pos = function (x0, v0, a, t) { return x0 + v0 * t + 0.5 * a * t * t; };
  M.vel = function (v0, a, t) { return v0 + a * t; };
  M.raices = function (A, Bq, C) {                       // A·t² + B·t + C = 0 (reales, ordenadas)
    if (Math.abs(A) < 1e-12) return Math.abs(Bq) < 1e-12 ? [] : [-C / Bq];
    var D = Bq * Bq - 4 * A * C; if (D < 0) return [];
    var s = Math.sqrt(D); return [(-Bq - s) / (2 * A), (-Bq + s) / (2 * A)].sort(function (p, q) { return p - q; });
  };
  M.distancia = function (x0, v0, a, t) {                // recorrido total (cuenta los cambios de sentido)
    var x = M.pos(x0, v0, a, t);
    if (a !== 0) { var ts = -v0 / a; if (ts > 0 && ts < t) { var xs = M.pos(x0, v0, a, ts); return Math.abs(xs - x0) + Math.abs(x - xs); } }
    return Math.abs(x - x0);
  };
  M.encuentro = function (A, Bm) {                       // móviles {x0, v0, a}: instantes t ≥ 0 con xA = xB
    var rs = M.raices(0.5 * (A.a - Bm.a), A.v0 - Bm.v0, A.x0 - Bm.x0);
    return rs.filter(function (t) { return t >= -1e-9; }).map(function (t) { return Math.max(0, t); });
  };
  M.tiro = function (v0, angGrados, h0, g) {              // lanzamiento desde y = h0 con velocidad v0 y ángulo sobre la horizontal
    var th = angGrados * R, vx = v0 * Math.cos(th), vy0 = v0 * Math.sin(th);
    var tv = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * h0)) / g, hmax = h0 + (vy0 > 0 ? vy0 * vy0 / (2 * g) : 0), tsub = vy0 > 0 ? vy0 / g : 0;
    var vyf = vy0 - g * tv;
    return { vx: vx, vy0: vy0, tv: tv, alcance: vx * tv, hmax: hmax, tsub: tsub, vyf: vyf, vf: Math.hypot(vx, vyf), angf: Math.atan2(vyf, vx) / R };
  };
  M.frenado = function (vms, treac, a) { var dr = vms * treac, df = vms * vms / (2 * a); return { dr: dr, df: df, total: dr + df, tf: vms / a }; };
  M.kmh = function (ms) { return ms * 3.6; };

  // ------------------------------------------------------------
  // Auxiliares de interfaz
  // ------------------------------------------------------------
  function lec(r, v, c) { return U.lec(r, v, c); }
  M.lec = lec;
  function nice(r) { var raw = r / 8, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }
  M.nice = nice;
  function f2(x, d) { return fmt(x, d == null ? 2 : d); }
  M.f = f2;
  function rangoY(vals, margen) {
    var lo = Math.min.apply(null, vals.concat([0])), hi = Math.max.apply(null, vals.concat([0])); if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    var d = (hi - lo) * (margen == null ? 0.12 : margen); return [lo - d, hi + d];
  }
  M.rangoY = rangoY;
  function trio(host) { return Array.prototype.slice.call(host.querySelectorAll(".f8-trio > div")); }
  function plotT(host, etx, ety, etiqueta, w, h) { return new B.Plot(host, { xmin: 0, xmax: 10, ymin: -1, ymax: 1, w: w || 330, h: h || 250, etx: etx, ety: ety, etiqueta: etiqueta }); }
  M.plotT = plotT;
  // Dibuja una pista horizontal con marcas y un coche en la posición x
  function pista(g, xmin, xmax) {
    var s = nice(xmax - xmin), x;
    g.segmento(xmin, 0, xmax, 0, { clase: "c-ink" }).setAttribute("stroke-width", 3);
    for (x = Math.ceil(xmin / s) * s; x <= xmax + 1e-9; x += s) { g.segmento(x, -0.12, x, 0.12, { clase: "c-ink" }); g.texto(x, -0.55, fmt(Math.round(x * 1e6) / 1e6, 3), { ancla: "middle", clase: "faint" }); }
    g.segmento(0, -0.3, 0, 0.3, { clase: "c-red" }).setAttribute("stroke-width", 2.5);
  }
  M.pista = pista;
  function coche(g, x, xmin, xmax, clase, etiq) {
    var L = (xmax - xmin) * 0.055, y0 = 0.14;
    g.poligono([[x - L / 2, y0], [x + L / 2, y0], [x + L / 2, y0 + 0.5], [x + L / 4, y0 + 0.5], [x + L / 6, y0 + 0.85], [x - L / 4, y0 + 0.85], [x - L / 3, y0 + 0.5], [x - L / 2, y0 + 0.5]], { clase: clase === "red" ? "z-red" : "z-pen", borde: clase === "red" ? "var(--red)" : "var(--pen)", grosor: 2 });
    g.punto(x - L / 3, y0, { r: 4.5, clase: "c-ink" }); g.punto(x + L / 3, y0, { r: 4.5, clase: "c-ink" });
    if (etiq) g.texto(x, y0 + 1.15, etiq, { ancla: "middle", clase: clase === "red" ? "red" : "pen" });
  }
  M.coche = coche;
  function lector(host, etiqueta, titulo, GR, etx, ety, pie) {
    var cuerpo = B.caja(host, etiqueta, titulo);
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="lg-pregs"></div><p class="w-pie">' + (pie || "Elige una respuesta en cada apartado: se corrige al momento y te explica por qué.") + '</p>';
    var st = { k: GR[0].k }, g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: -1, ymax: 1, w: 560, h: 300, etx: etx, ety: ety, etiqueta: "Gráfica para leer" }), pregs = cuerpo.querySelector(".lg-pregs");
    function dibuja() {
      var G = GR.filter(function (z) { return z.k === st.k; })[0];
      g.rango(0, G.tmax, G.rg[0], G.rg[1]); g.limpiar();
      g.polilinea(G.pts, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      if (G.curva) g.curva(G.curva, { clase: "c-pen", x0: 0, x1: G.tmax, n: 300 }).setAttribute("stroke-width", 3);
      pregs.innerHTML = G.preguntas.map(function (p, i) {
        return '<div class="lg-p" data-i="' + i + '"><b>' + (i + 1) + '. ' + p.q + '</b><div class="chips">' + p.op.map(function (o, j) { return '<button type="button" class="chip-btn" data-j="' + j + '">' + o + "</button>"; }).join("") + '</div><p class="lg-r"></p></div>';
      }).join("");
    }
    pregs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-j]"); if (!b) return;
      var cont = b.closest(".lg-p"), G = GR.filter(function (z) { return z.k === st.k; })[0], p = G.preguntas[+cont.getAttribute("data-i")], j = +b.getAttribute("data-j");
      Array.prototype.forEach.call(cont.querySelectorAll(".chip-btn"), function (x) { x.classList.remove("on", "bien", "mal"); });
      b.classList.add(j === p.ok ? "bien" : "mal");
      var r = cont.querySelector(".lg-r");
      r.className = "lg-r " + (j === p.ok ? "ok" : "mal");
      r.innerHTML = j === p.ok ? "<b>✓ Correcto.</b> " + p.por : "<b>Todavía no.</b> Mira otra vez la gráfica e inténtalo de nuevo.";
    });
    U.fichas(cuerpo.querySelector("[data-sel]"), GR.map(function (z) { return { k: z.k, t: z.t }; }), GR[0].k, function (k) { st.k = k; dibuja(); });
    dibuja();
  }
  M.lector = lector;

  // ============================================================
  // F8_MOVIL: MRU y MRUA con las tres gráficas enlazadas
  // ============================================================
  B.w.f8_movil = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Un móvil y sus tres gráficas: x–t, v–t y a–t");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="f8-escena"></div><div class="f8-trio"><div></div><div></div><div></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 10, st = { modo: "mrua", x0: 0, v0: 4, a: 2, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -5, xmax: 105, ymin: -1.3, ymax: 2.6, w: 640, h: 150, limpio: true, etiqueta: "Móvil sobre una carretera recta" });
    var T = trio(cuerpo), gx = plotT(T[0], "t", "x", "Posición frente al tiempo"), gv = plotT(T[1], "t", "v", "Velocidad frente al tiempo"), ga = plotT(T[2], "t", "a", "Aceleración frente al tiempo");
    var sx = U.slider(ctl, { et: "Posición inicial x₀ (m)", min: -20, max: 20, step: 1, val: st.x0, on: function (v) { st.x0 = v; pinta(); }, fmt: function (v) { return f2(v, 0); } });
    var sv = U.slider(ctl, { et: "Velocidad inicial v₀ (m/s)", min: -20, max: 30, step: 1, val: st.v0, on: function (v) { st.v0 = v; pinta(); }, fmt: function (v) { return f2(v, 0); } });
    var sa = U.slider(ctl, { et: "Aceleración a (m/s²)", min: -6, max: 6, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: TM, step: 0.1, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    var an = U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; stt.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; stt.set(TM); pinta(); return false; } stt.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var a = st.modo === "mru" ? 0 : st.a, x0 = st.x0, v0 = st.v0, t = st.t, i, xs = [], vs = [];
      sa.el.style.display = st.modo === "mru" ? "none" : "";
      for (i = 0; i <= 100; i++) { var ti = TM * i / 100; xs.push(M.pos(x0, v0, a, ti)); vs.push(M.vel(v0, a, ti)); }
      var xr = rangoY(xs.concat([x0]), 0.08), vr = rangoY(vs, 0.15), ar = rangoY([a], 0.6), x = M.pos(x0, v0, a, t), v = M.vel(v0, a, t);
      // escena
      var lo = Math.min.apply(null, xs.concat([x0, 0])), hi = Math.max.apply(null, xs.concat([x0, 0])), m = (hi - lo) * 0.08 + 3;
      gE.rango(lo - m, hi + m, -1.3, 2.6); gE.limpiar(); pista(gE, lo - m, hi + m);
      coche(gE, x, lo - m, hi + m, "pen");
      var k = (hi - lo + 2 * m) * 0.2 / Math.max(Math.abs(v0), Math.abs(M.vel(v0, a, TM)), 1);
      if (Math.abs(v) > 1e-9) U.flecha(gE, x, 1.55, x + v * k, 1.55, { clase: "c-ok" });
      if (Math.abs(a) > 1e-9) U.flecha(gE, x, 2.05, x + a * k * 3, 2.05, { clase: "c-red" });
      gE.texto(lo - m, 1.55, "v", { clase: "ok", dx: 4 }); gE.texto(lo - m, 2.05, "a", { clase: "red", dx: 4 });
      // x–t
      gx.rango(0, TM, xr[0], xr[1]); gx.limpiar();
      gx.curva(function (s) { return M.pos(x0, v0, a, s); }, { clase: "c-pen", n: 160 }).setAttribute("stroke-width", 3);
      gx.segmento(Math.max(0, t - 1.5), x - v * Math.min(t, 1.5), Math.min(TM, t + 1.5), x + v * Math.min(TM - t, 1.5), { clase: "c-ok", dash: "4 3" });
      gx.segmento(t, xr[0], t, x, { clase: "c-faint", dash: "3 4" }); gx.punto(t, x, { r: 6, clase: "c-red" });
      // v–t con el área sombreada
      gv.rango(0, TM, vr[0], vr[1]); gv.limpiar();
      if (t > 0.01) gv.zona(function (s) { return M.vel(v0, a, s); }, 0, t, { clase: "z-ok" });
      gv.curva(function (s) { return M.vel(v0, a, s); }, { clase: "c-ok", n: 2 }).setAttribute("stroke-width", 3);
      gv.segmento(t, 0, t, v, { clase: "c-faint", dash: "3 4" }); gv.punto(t, v, { r: 6, clase: "c-red" });
      // a–t
      ga.rango(0, TM, ar[0], ar[1]); ga.limpiar();
      ga.segmento(0, a, TM, a, { clase: "c-red" }).setAttribute("stroke-width", 3); ga.segmento(t, 0, t, a, { clase: "c-faint", dash: "3 4" }); ga.punto(t, a, { r: 6, clase: "c-red" });
      var dx = x - x0, dist = M.distancia(x0, v0, a, t);
      lectura.innerHTML = lec("Instante", "t = " + f2(t, 2) + " s", "") + lec("Posición", "x = " + f2(x, 2) + " m", "pen") + lec("Velocidad", "v = " + f2(v, 2) + " m/s" + (Math.abs(v) < 1e-9 ? " (parado)" : v > 0 ? " (→ sentido +)" : " (← sentido −)"), "ok") +
        lec("Aceleración", "a = " + f2(a, 2) + " m/s²" + (a === 0 ? "" : a * v > 0 ? " (acelera)" : a * v < 0 ? " (frena)" : ""), "red") + lec("Desplazamiento Δx = x − x₀", f2(dx, 2) + " m", "") +
        lec("Distancia recorrida", f2(dist, 2) + " m" + (Math.abs(dist - Math.abs(dx)) > 1e-6 ? "  (≠ |Δx|: ha cambiado de sentido)" : ""), "ancho") +
        (t > 0 ? lec("Velocidad media en [0, t]", f2(dx / t, 2) + " m/s", "") : "") +
        lec("Ecuación de la posición", "x = " + f2(x0, 1) + " + " + f2(v0, 1) + "·t" + (a !== 0 ? " + ½·" + f2(a, 1) + "·t²" : ""), "ancho");
      pie.innerHTML = "La <b>pendiente</b> de la gráfica x–t es la velocidad (la recta verde discontinua es la tangente). El <b>área</b> bajo la gráfica v–t es el desplazamiento (zona verde) y la pendiente de v–t es la aceleración. Con a = 0 es un <b>MRU</b>: x–t recta, v–t horizontal; con a ≠ 0 es un <b>MRUA</b>: x–t parábola, v–t recta.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "mru", t: "MRU (a = 0)" }, { k: "mrua", t: "MRUA (a constante)" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F8_ENCUENTRO: dos móviles, encuentro y alcance
  // ============================================================
  var PE = [
    { t: "Se acercan (MRU)", A: { x0: 0, v0: 20, a: 0 }, B: { x0: 300, v0: -10, a: 0 } },
    { t: "Alcance (mismo sentido)", A: { x0: 0, v0: 25, a: 0 }, B: { x0: 90, v0: 15, a: 0 } },
    { t: "Uno parte del reposo", A: { x0: 0, v0: 20, a: 0 }, B: { x0: 0, v0: 0, a: 2 } },
    { t: "Frena y es alcanzado", A: { x0: 0, v0: 30, a: 0 }, B: { x0: 100, v0: 20, a: -2 } },
    { t: "No se encuentran", A: { x0: 0, v0: 10, a: 0 }, B: { x0: 100, v0: 20, a: 0 } }
  ];
  B.w.f8_encuentro = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Encuentros y alcances: ¿cuándo y dónde coinciden?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-escena"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 30, st = { A: { x0: 0, v0: 20, a: 0 }, B: { x0: 300, v0: -10, a: 0 }, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -10, xmax: 400, ymin: -1.3, ymax: 2.8, w: 640, h: 170, limpio: true, etiqueta: "Dos móviles en la misma carretera" });
    var gx = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: TM, ymin: -1, ymax: 1, w: 620, h: 280, etx: "t", ety: "x", etiqueta: "Posición de los dos móviles" });
    function slid(k, c, et, mn, mx, stp) { sl[k + c] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k][c], on: function (v) { st[k][c] = v; pinta(); }, fmt: function (v) { return f2(v, stp < 1 ? 1 : 0); } }); }
    slid("A", "x0", "x₀ de A (m)", -100, 400, 10); slid("A", "v0", "v₀ de A (m/s)", -30, 40, 1); slid("A", "a", "a de A (m/s²)", -4, 4, 0.5);
    slid("B", "x0", "x₀ de B (m)", -100, 400, 10); slid("B", "v0", "v₀ de B (m/s)", -30, 40, 1); slid("B", "a", "a de B (m/s²)", -4, 4, 0.5);
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: TM, step: 0.1, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; stt.set(0); pinta(); return; } if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; stt.set(TM); pinta(); return false; } stt.set(st.t); pinta(); } }, { auto: false });
    function pinta() {
      var A = st.A, Bm = st.B, t = st.t, i, xa = [], xb = [];
      for (i = 0; i <= 120; i++) { var ti = TM * i / 120; xa.push(M.pos(A.x0, A.v0, A.a, ti)); xb.push(M.pos(Bm.x0, Bm.v0, Bm.a, ti)); }
      var todo = xa.concat(xb), lo = Math.min.apply(null, todo), hi = Math.max.apply(null, todo), m = (hi - lo) * 0.06 + 5;
      gE.rango(lo - m, hi + m, -1.3, 2.8); gE.limpiar(); pista(gE, lo - m, hi + m);
      coche(gE, M.pos(A.x0, A.v0, A.a, t), lo - m, hi + m, "pen", "A"); coche(gE, M.pos(Bm.x0, Bm.v0, Bm.a, t), lo - m, hi + m, "red", "B");
      var yr = rangoY(todo, 0.08); gx.rango(0, TM, yr[0], yr[1]); gx.limpiar();
      gx.curva(function (s) { return M.pos(A.x0, A.v0, A.a, s); }, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      gx.curva(function (s) { return M.pos(Bm.x0, Bm.v0, Bm.a, s); }, { clase: "c-red", n: 200 }).setAttribute("stroke-width", 3);
      gx.segmento(t, yr[0], t, yr[1], { clase: "c-faint", dash: "3 4" });
      var ts = M.encuentro(A, Bm).filter(function (s) { return s <= TM + 1e-9; }), tx = M.encuentro(A, Bm);
      ts.forEach(function (s) { var xp = M.pos(A.x0, A.v0, A.a, s); gx.punto(s, xp, { r: 7, clase: "c-ok" }); gx.segmento(s, yr[0], s, xp, { clase: "c-ok", dash: "4 4" }); });
      var txt;
      if (!tx.length) txt = "Las gráficas no se cortan para t ≥ 0: <b>no se encuentran</b>.";
      else txt = tx.map(function (s) { return "t = " + f2(s, 2) + " s, en x = " + f2(M.pos(A.x0, A.v0, A.a, s), 2) + " m"; }).join("  ·  y también  ");
      function eq(q) { return f2(q.x0, 0) + (q.v0 < 0 ? " − " : " + ") + f2(Math.abs(q.v0), 1) + "t" + (q.a ? (q.a < 0 ? " − " : " + ") + "½·" + f2(Math.abs(q.a), 1) + "t²" : ""); }
      var ec = "Se iguala x<sub>A</sub> = x<sub>B</sub>:  " + eq(A) + "  =  " + eq(Bm);
      lectura.innerHTML = lec("Ecuación del encuentro", ec, "ancho") + lec("Encuentro", txt, tx.length ? "ok ancho" : "red ancho") +
        lec("Móvil A en t = " + f2(t, 1) + " s", "x = " + f2(M.pos(A.x0, A.v0, A.a, t), 1) + " m · v = " + f2(M.vel(A.v0, A.a, t), 1) + " m/s", "pen") + lec("Móvil B en t = " + f2(t, 1) + " s", "x = " + f2(M.pos(Bm.x0, Bm.v0, Bm.a, t), 1) + " m · v = " + f2(M.vel(Bm.v0, Bm.a, t), 1) + " m/s", "red") +
        lec("Distancia entre ellos", f2(Math.abs(M.pos(A.x0, A.v0, A.a, t) - M.pos(Bm.x0, Bm.v0, Bm.a, t)), 1) + " m", "");
      pie.innerHTML = "Dos móviles <b>se encuentran</b> cuando tienen la <b>misma posición en el mismo instante</b>: x<sub>A</sub>(t) = x<sub>B</sub>(t). Es el punto de corte de las dos gráficas x–t. Cuando la ecuación es de 2.º grado puede haber dos soluciones: sólo valen las de t ≥ 0.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) {
      var P = PE[+k]; ["A", "B"].forEach(function (q) { ["x0", "v0", "a"].forEach(function (c) { st[q][c] = P[q][c]; sl[q + c].set(P[q][c]); }); }); pinta();
    });
    pinta();
  };

  // ============================================================
  // F8_GRAFICAS: del gráfico v–t al desplazamiento (área) y a la posición
  // ============================================================
  var PV = [
    { t: "Arranca, crucero y frena", nodos: [[0, 0], [5, 10], [15, 10], [20, 0]], nota: "Trapecio: el área total (desplazamiento) = (base mayor + base menor)/2 · altura = (20 + 10)/2 · 10 = 150 m." },
    { t: "Va y vuelve", nodos: [[0, 0], [4, 8], [8, 8], [10, 0], [14, -6], [16, 0]], nota: "Tramos con v &lt; 0: el móvil retrocede. El área bajo el eje cuenta negativa (desplazamiento) pero positiva para la distancia." },
    { t: "Frena hasta parar y arranca atrás", nodos: [[0, 12], [6, 0], [10, -8]], nota: "Una sola recta con pendiente −2 m/s²: la velocidad pasa por cero en t = 6 s (instante de giro)." },
    { t: "Aceleración variable (a tramos)", nodos: [[0, 0], [3, 12], [6, 12], [8, 4], [12, 4], [14, 10]], nota: "Cada tramo tiene su aceleración: 4 m/s², 0, −4 m/s², 0 y 3 m/s². En cada tramo es un MRU o un MRUA distinto." }
  ];
  function integra(nodos, t) {                          // ∫ v dt y ∫ |v| dt hasta t (v lineal a trozos)
    var s = 0, d = 0, i;
    for (i = 0; i < nodos.length - 1; i++) {
      var t0 = nodos[i][0], t1 = nodos[i + 1][0], v0 = nodos[i][1], v1 = nodos[i + 1][1]; if (t <= t0) break;
      var te = Math.min(t, t1), ve = v0 + (v1 - v0) * (te - t0) / (t1 - t0);
      s += (v0 + ve) / 2 * (te - t0);
      if (v0 * ve >= 0) d += Math.abs(v0 + ve) / 2 * (te - t0);
      else { var tc = t0 + (te - t0) * Math.abs(v0) / (Math.abs(v0) + Math.abs(ve)); d += Math.abs(v0) / 2 * (tc - t0) + Math.abs(ve) / 2 * (te - tc); }
    }
    return { s: s, d: d };
  }
  M.integra = integra;
  function velEn(nodos, t) { for (var i = 0; i < nodos.length - 1; i++) if (t <= nodos[i + 1][0] + 1e-12) return nodos[i][1] + (nodos[i + 1][1] - nodos[i][1]) * (t - nodos[i][0]) / (nodos[i + 1][0] - nodos[i][0]); return nodos[nodos.length - 1][1]; }
  B.w.f8_graficas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Del gráfico v–t al desplazamiento: el área");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div></div><div></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, t: 8 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), D = Array.prototype.slice.call(cuerpo.querySelectorAll(".f8-dos > div"));
    var gv = plotT(D[0], "t", "v", "Velocidad frente al tiempo", 330, 270), gx = plotT(D[1], "t", "x", "Posición acumulada", 330, 270), sl;
    sl = U.slider(ctl, { et: "Instante t (s)", min: 0, max: 20, step: 0.5, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    function pinta() {
      var P = PV[st.i], N = P.nodos, TF = N[N.length - 1][0], t = Math.min(st.t, TF), i, vs = N.map(function (n) { return n[1]; }), r = integra(N, t), v = velEn(N, t);
      sl.input.max = TF; if (st.t > TF) { st.t = TF; sl.set(TF); }
      var vr = rangoY(vs, 0.2), xs = [], ts = []; for (i = 0; i <= 120; i++) { ts.push(TF * i / 120); xs.push(integra(N, TF * i / 120).s); } var xr = rangoY(xs, 0.15);
      gv.rango(0, TF, vr[0], vr[1]); gv.limpiar();
      // áreas: positiva en verde, negativa en rojo
      for (i = 0; i < 160; i++) { var a = t * i / 160, b = t * (i + 1) / 160, vm = velEn(N, (a + b) / 2); if (b > a) gv.rect(a, 0, b, vm, { clase: vm >= 0 ? "z-ok" : "z-red" }); }
      gv.polilinea(N, { clase: "c-pen" }).setAttribute("stroke-width", 3); N.forEach(function (n) { gv.punto(n[0], n[1], { r: 3.5, clase: "c-pen" }); });
      gv.segmento(t, 0, t, v, { clase: "c-faint", dash: "3 4" }); gv.punto(t, v, { r: 6, clase: "c-red" });
      gx.rango(0, TF, xr[0], xr[1]); gx.limpiar(); gx.polilinea(ts.map(function (s, k) { return [s, xs[k]]; }), { clase: "c-ok" }).setAttribute("stroke-width", 3); gx.punto(t, r.s, { r: 6, clase: "c-red" }); gx.segmento(t, xr[0], t, r.s, { clase: "c-faint", dash: "3 4" });
      var pend = 0; for (i = 0; i < N.length - 1; i++) if (t >= N[i][0] - 1e-12 && t <= N[i + 1][0] + 1e-12) { pend = (N[i + 1][1] - N[i][1]) / (N[i + 1][0] - N[i][0]); if (t > N[i][0] + 1e-9) break; }
      lectura.innerHTML = lec("Instante", "t = " + f2(t, 1) + " s", "") + lec("Velocidad", "v = " + f2(v, 2) + " m/s", "pen") + lec("Aceleración (pendiente de v–t)", "a = " + f2(pend, 2) + " m/s²", "red") +
        lec("Desplazamiento (área con signo)", "Δx = " + f2(r.s, 2) + " m", "ok") + lec("Distancia recorrida (área en valor absoluto)", f2(r.d, 2) + " m", "") + (t > 0 ? lec("Velocidad media", f2(r.s / t, 2) + " m/s", "") : "");
      pie.innerHTML = P.nota + " <b>Verde</b>: área con v &gt; 0 (avanza). <b>Rojo</b>: área con v &lt; 0 (retrocede).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PV.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // F8_CAIDA: caída libre y lanzamiento vertical
  // ============================================================
  var CUERPOS = { tierra: ["Tierra", 9.8], luna: ["Luna", 1.62], marte: ["Marte", 3.71], jupiter: ["Júpiter", 24.8] };
  B.w.f8_caida = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Caída libre y lanzamiento vertical");
    cuerpo.innerHTML = '<div data-astro class="chips"></div><div class="f8-vert"><div class="f8-torre"></div><div class="f8-dos2"><div></div><div></div></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { astro: "tierra", h0: 40, v0: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), D = Array.prototype.slice.call(cuerpo.querySelectorAll(".f8-dos2 > div"));
    var gT = new B.Plot(cuerpo.querySelector(".f8-torre"), { xmin: -1, xmax: 1, ymin: -2, ymax: 60, w: 220, h: 340, limpio: true, etiqueta: "Altura de la piedra" });
    var gy = plotT(D[0], "t", "y", "Altura frente al tiempo", 440, 210), gv = plotT(D[1], "t", "v", "Velocidad frente al tiempo", 440, 210);
    var sh = U.slider(ctl, { et: "Altura inicial h₀ (m)", min: 0, max: 100, step: 5, val: st.h0, on: function (v) { st.h0 = v; st.t = 0; stt.set(0); pinta(); }, fmt: function (v) { return f2(v, 0); } });
    var sv = U.slider(ctl, { et: "Velocidad v₀ (m/s, + ↑)", min: -20, max: 30, step: 1, val: st.v0, on: function (v) { st.v0 = v; st.t = 0; stt.set(0); pinta(); }, fmt: function (v) { return f2(v, 0); } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: 12, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; stt.set(0); pinta(); return; } if (dt) { var g = CUERPOS[st.astro][1], tf = M.tiro(Math.abs(st.v0), st.v0 >= 0 ? 90 : -90, st.h0, g).tv; st.t += dt; if (st.t >= tf) { st.t = tf; stt.set(Math.min(12, tf)); pinta(); return false; } stt.set(Math.min(12, st.t)); pinta(); } }, { auto: false });
    function pinta() {
      var g = CUERPOS[st.astro][1], h0 = st.h0, v0 = st.v0, q = M.tiro(Math.abs(v0), v0 >= 0 ? 90 : -90, h0, g), tf = q.tv, t = Math.min(st.t, tf), y = Math.max(0, h0 + v0 * t - 0.5 * g * t * t), v = v0 - g * t;
      if (h0 === 0 && v0 === 0) { lectura.innerHTML = lec("Sin movimiento", "con h₀ = 0 y v₀ = 0 la piedra está en el suelo: sube h₀ o lanza hacia arriba", "red ancho"); gT.limpiar(); return; }
      stt.input.max = Math.max(1, Math.ceil(tf * 20) / 20); var ymax = Math.max(q.hmax, h0, 1) * 1.1; gT.rango(-1, 1, -ymax * 0.04, ymax); gT.limpiar();
      gT.segmento(-1, 0, 1, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      for (var k = 0; k <= 5; k++) { var yy = ymax * k / 5.5; gT.segmento(-1, yy, -0.8, yy, { clase: "c-faint" }); gT.texto(-0.78, yy, fmt(Math.round(yy * 10) / 10, 1) + " m", { clase: "faint", dy: 4 }); }
      gT.punto(0, y, { r: 9, clase: "c-red" });
      if (Math.abs(v) > 1e-9) U.flecha(gT, 0.55, y, 0.55, y + v * ymax * 0.012, { clase: "c-ok" });
      var TT = Math.max(tf, 0.5), ys = [], vs = [], i; for (i = 0; i <= 100; i++) { var ti = TT * i / 100; ys.push(Math.max(0, h0 + v0 * ti - 0.5 * g * ti * ti)); vs.push(v0 - g * ti); }
      var yr = rangoY(ys, 0.1), vr = rangoY(vs, 0.15);
      gy.rango(0, TT, yr[0], yr[1]); gy.limpiar(); gy.curva(function (s) { return Math.max(0, h0 + v0 * s - 0.5 * g * s * s); }, { clase: "c-pen", x0: 0, x1: tf, n: 160 }).setAttribute("stroke-width", 3); gy.punto(t, y, { r: 6, clase: "c-red" });
      if (q.tsub > 0) gy.punto(q.tsub, q.hmax, { r: 5, clase: "c-ok" });
      gv.rango(0, TT, vr[0], vr[1]); gv.limpiar(); gv.segmento(0, v0, tf, v0 - g * tf, { clase: "c-ok" }).setAttribute("stroke-width", 3); gv.punto(t, v, { r: 6, clase: "c-red" });
      lectura.innerHTML = lec("Astro · g", CUERPOS[st.astro][0] + " · g = " + f2(g, 2) + " m/s²", "") + lec("Instante", "t = " + f2(t, 2) + " s", "") + lec("Altura", "y = " + f2(y, 2) + " m", "pen") + lec("Velocidad", "v = " + f2(v, 2) + " m/s " + (Math.abs(v) < 0.005 ? "(en el punto más alto)" : v > 0 ? "(sube)" : "(baja)"), "ok") +
        lec("Altura máxima", f2(q.hmax, 2) + " m" + (q.tsub > 0 ? " (a los " + f2(q.tsub, 2) + " s)" : ""), "ancho") + lec("Tiempo de vuelo hasta el suelo", f2(tf, 2) + " s", "red") + lec("Velocidad al llegar al suelo", f2(q.vyf, 2) + " m/s (" + f2(Math.abs(q.vyf) * 3.6, 1) + " km/h)", "") +
        lec("Ecuaciones", "y = " + f2(h0, 1) + " + " + f2(v0, 1) + "·t − ½·" + f2(g, 2) + "·t²  ·  v = " + f2(v0, 1) + " − " + f2(g, 2) + "·t", "ancho");
      pie.innerHTML = "Eje vertical positivo <b>hacia arriba</b>: la aceleración es <b>−g</b> siempre, tanto al subir como al bajar. En el punto más alto v = 0 pero a sigue siendo −g. Sin rozamiento, el tiempo de subida es igual al de bajada hasta el mismo nivel y la masa del cuerpo <b>no influye</b> (en la Luna una pluma y un martillo caen a la vez).";
    }
    U.fichas(cuerpo.querySelector("[data-astro]"), Object.keys(CUERPOS).map(function (k) { return { k: k, t: CUERPOS[k][0] + " (" + f2(CUERPOS[k][1], 2) + " m/s²)" }; }), "tierra", function (k) { st.astro = k; st.t = 0; stt.set(0); pinta(); });
    pinta();
  };
})(window);
