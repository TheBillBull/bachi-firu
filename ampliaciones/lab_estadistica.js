/* ============================================================
   Bachi para Firu · laboratorio de estadística bidimensional (Matemáticas I, tema 12)
   motor B.lab.est (medias, covarianza, r, regresión, tablas de doble entrada)
   + m12_nube · m12_minimos · m12_tabla · m12_doble · m12_atipicos
   · m12_prediccion · m12_adivina · m12_dosrectas · m12_unidades · m12_curva
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var E = B.lab.est = {};

  // ------------------------------------------------------------
  // Motor estadístico (definiciones de este curso: se divide entre n)
  // ------------------------------------------------------------
  E.suma = function (a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; };
  // pts = [[x, y], …] ; w = frecuencias opcionales
  E.stats = function (pts, w) {
    var n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0, i, f;
    for (i = 0; i < pts.length; i++) { f = w ? w[i] : 1; n += f; sx += f * pts[i][0]; sy += f * pts[i][1]; sxx += f * pts[i][0] * pts[i][0]; syy += f * pts[i][1] * pts[i][1]; sxy += f * pts[i][0] * pts[i][1]; }
    var mx = sx / n, my = sy / n, vx = sxx / n - mx * mx, vy = syy / n - my * my, cov = sxy / n - mx * my;
    var r = vx > 1e-12 && vy > 1e-12 ? cov / Math.sqrt(vx * vy) : NaN;
    return { n: n, sx: sx, sy: sy, sxx: sxx, syy: syy, sxy: sxy, mx: mx, my: my, vx: vx, vy: vy, dx: Math.sqrt(Math.max(vx, 0)), dy: Math.sqrt(Math.max(vy, 0)), cov: cov, r: r, r2: r * r,
      m: vx > 1e-12 ? cov / vx : NaN, a: vx > 1e-12 ? my - cov / vx * mx : NaN,           // y = a + m·x  (y sobre x)
      mxy: vy > 1e-12 ? cov / vy : NaN, axy: vy > 1e-12 ? mx - cov / vy * my : NaN };        // x = axy + mxy·y  (x sobre y)
  };
  E.sse = function (pts, m, n) { var s = 0; pts.forEach(function (p) { var e = p[1] - (m * p[0] + n); s += e * e; }); return s; };
  E.fuerza = function (r) {
    if (isNaN(r)) return "no se puede calcular";
    var a = Math.abs(r), t = a >= 0.995 ? "perfecta" : a >= 0.9 ? "muy fuerte" : a >= 0.7 ? "fuerte" : a >= 0.4 ? "moderada" : a >= 0.2 ? "débil" : "prácticamente nula";
    return a < 0.2 ? t : (r > 0 ? "positiva " : "negativa ") + t;
  };
  // generador pseudoaleatorio reproducible
  E.rng = function (seed) { var s = seed >>> 0; return function () { s += 0x6D2B79F5; var t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  E.normal = function (rnd) { var u = Math.max(rnd(), 1e-9), v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  // nube con coeficiente de correlación MUESTRAL exactamente r (media 5, desviaciones sx, sy)
  E.nubeCon = function (r, n, seed, sx, sy, cx, cy) {
    var rnd = E.rng(seed || 7), x = [], e = [], i;
    for (i = 0; i < n; i++) { x.push(E.normal(rnd)); e.push(E.normal(rnd)); }
    function est(a) { var m = E.suma(a) / a.length, v = 0; a.forEach(function (t) { v += (t - m) * (t - m); }); return { m: m, s: Math.sqrt(v / a.length) }; }
    var ex = est(x); x = x.map(function (t) { return (t - ex.m) / ex.s; });
    var c = 0; for (i = 0; i < n; i++) c += x[i] * e[i]; c /= n;
    e = e.map(function (t, k) { return t - c * x[k]; });
    var ee = est(e); e = e.map(function (t) { return (t - ee.m) / ee.s; });
    var s = Math.sqrt(Math.max(0, 1 - r * r)), pts = [];
    for (i = 0; i < n; i++) pts.push([(cx == null ? 5 : cx) + (sx || 1.6) * x[i], (cy == null ? 5 : cy) + (sy || 1.6) * (r * x[i] + s * e[i])]);
    return pts;
  };
  // tabla de doble entrada: celdas f[i][j] con i = fila (y), j = columna (x)
  E.doble = function (xs, ys, f) {
    var pts = [], w = [], i, j, nx = xs.length, ny = ys.length;
    var fx = xs.map(function () { return 0; }), fy = ys.map(function () { return 0; }), n = 0;
    for (i = 0; i < ny; i++) for (j = 0; j < nx; j++) { var c = f[i][j] || 0; pts.push([xs[j], ys[i]]); w.push(c); fx[j] += c; fy[i] += c; n += c; }
    var st = n > 0 ? E.stats(pts, w) : null;
    return { n: n, fx: fx, fy: fy, st: st };
  };

  // ------------------------------------------------------------
  // Utilidades de interfaz
  // ------------------------------------------------------------
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function etq(g, x, y, t, clase, dx, dy, ancla) { g.texto(x, y, t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase, ancla: ancla }); }
  function campo(host, et, val, ancho) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 180) + 'px" value="' + val + '" aria-label="' + et.replace(/<[^>]+>/g, "") + '">';
    host.appendChild(l); return l.querySelector("input");
  }
  function casilla(host, et, val, on) {
    var l = document.createElement("label"); l.className = "m12-check";
    l.innerHTML = '<input type="checkbox"' + (val ? " checked" : "") + "> <span>" + et + "</span>"; host.appendChild(l);
    var i = l.querySelector("input"); i.addEventListener("change", function () { on(i.checked); }); return i;
  }
  function num(t) { var v = B.Mate.numero(t); return v; }
  function lista(t) { return String(t).split(/;|\s+/).filter(function (s) { return s !== ""; }).map(num); }
  function sig(v, d) { return v === 0 ? "0" : (v < 0 ? "−" : "+") + " " + fmt(Math.abs(v), d == null ? 3 : d); }
  function ecuacion(a, m, d) {          // y = a + m·x  →  texto
    if (isNaN(a) || isNaN(m)) return "no existe";
    return "y = " + fmt(m, d == null ? 3 : d) + "·x " + sig(a, d == null ? 3 : d);
  }
  function coords(g, ev) {
    var pt = g.svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    var m = g.svg.getScreenCTM(); if (!m) return null;
    var q = pt.matrixTransform(m.inverse()); return { x: g.ix(q.x), y: g.iy(q.y) };
  }
  function red1(v) { return Math.round(v * 10) / 10; }
  function plano(host, etiqueta, x0, x1, y0, y1, w, h) {
    return new B.Plot(host, { xmin: x0, xmax: x1, ymin: y0, ymax: y1, w: w || 560, h: h || 360, etx: "x", ety: "y", etiqueta: etiqueta });
  }
  // asa arrastrable de un punto; teclado: ←→ cambian x y ↑↓ cambian y
  function asa(g, get, set, clase, etiqueta, rg) {
    var h = g.punto(0, 0, { capa: "top", r: 8, clase: clase });
    h.addEventListener("keydown", function (ev) {
      if (ev.key !== "ArrowUp" && ev.key !== "ArrowDown") return;
      ev.preventDefault(); ev.stopImmediatePropagation();
      set(get()[0], get()[1] + (ev.key === "ArrowUp" ? 0.1 : -0.1));
    });
    g.arrastrar(h, function (x, y, tecla) { if (tecla) set(x, get()[1]); else set(x, y); }, { get: function () { return get()[0]; }, paso: 0.1, etiqueta: etiqueta });
    return h;
  }
  function limita(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // ============================================================
  // NUBE: puntos arrastrables y recta de regresión en vivo
  // ============================================================
  var PRE_NUBE = [
    { t: "Positiva fuerte", pts: E.nubeCon(0.95, 12, 3) },
    { t: "Positiva débil", pts: E.nubeCon(0.45, 14, 11) },
    { t: "Negativa fuerte", pts: E.nubeCon(-0.9, 12, 5) },
    { t: "Sin relación", pts: E.nubeCon(0.0, 16, 9) },
    { t: "Relación curva (no lineal)", pts: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(function (x) { return [x, 0.1 * (x - 5) * (x - 5) * 2 + 1.5 + 0.0]; }) },
    { t: "Con un valor atípico", pts: E.nubeCon(0.92, 10, 21, 1.3, 1.3, 4.5, 4.5).concat([[9, 1]]) }
  ];
  PRE_NUBE.forEach(function (p) { p.pts = p.pts.map(function (q) { return [limita(red1(q[0]), 0.2, 9.8), limita(red1(q[1]), 0.2, 9.8)]; }); });
  B.w.m12_nube = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Nube de puntos: arrastra, añade y mira cómo cambia la recta");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { pts: PRE_NUBE[0].pts.map(function (p) { return p.slice(); }), res: false, cen: true }, g, hs = [];
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    casilla(ctl, "Mostrar los residuos", false, function (v) { st.res = v; pinta(); });
    casilla(ctl, "Mostrar el centro (x̄, ȳ)", true, function (v) { st.cen = v; pinta(); });
    U.boton(ctl, "Quitar el último punto", function () { if (st.pts.length > 2) { st.pts.pop(); sync(); pinta(); } });
    U.boton(ctl, "Restaurar", function () { cargar(st.i == null ? 0 : st.i); });
    function sync() {
      while (hs.length < st.pts.length) (function (k) { hs.push(asa(g, function () { return st.pts[k]; }, function (x, y) { st.pts[k] = [limita(red1(x), 0, 10), limita(red1(y), 0, 10)]; pinta(); }, "c-pen", "Punto " + (k + 1))); })(hs.length);
      while (hs.length > st.pts.length) { var h = hs.pop(); h.parentNode.removeChild(h); }
    }
    function cargar(i) { st.i = i; st.pts = PRE_NUBE[i].pts.map(function (p) { return p.slice(); }); sync(); pinta(); }
    function pinta() {
      g.limpiar(); st.pts.forEach(function (p, k) { g.mover(hs[k], p[0], p[1]); hs[k].setAttribute("aria-label", "Punto " + (k + 1) + ": (" + fmt(p[0], 1) + ", " + fmt(p[1], 1) + ")"); });
      var S = E.stats(st.pts);
      if (!isNaN(S.m)) {
        g.recta(S.m, S.mx, S.my, { clase: "c-ok" }).setAttribute("stroke-width", 3);
        if (st.res) st.pts.forEach(function (p) { g.segmento(p[0], p[1], p[0], S.a + S.m * p[0], { clase: "c-red", dash: "3 3" }); });
      }
      if (st.cen) { g.punto(S.mx, S.my, { r: 6, clase: "c-red" }); etq(g, S.mx, S.my, "(x̄, ȳ)", "red", 8, 16); }
      lectura.innerHTML = fil("Puntos", st.pts.length) + fil("x̄ · ȳ", fmt(S.mx, 2) + " · " + fmt(S.my, 2), "pen") + fil("Sx · Sy", fmt(S.dx, 3) + " · " + fmt(S.dy, 3)) + fil("Covarianza Sxy", fmt(S.cov, 3), "pen") +
        fil("Coeficiente de correlación r", isNaN(S.r) ? "—" : fmt(S.r, 4), "ok") + fil("Relación", E.fuerza(S.r), "ok") + fil("Recta de regresión de y sobre x", ecuacion(S.a, S.m), "ancho red");
      pie.innerHTML = "Arrastra un punto (o usa las flechas con el teclado) y observa r y la recta. <b>Haz clic</b> en un hueco para añadir un punto. Los puntos azules son los datos; el punto rojo es el centro de la nube (x̄, ȳ), por el que <b>siempre</b> pasa la recta de regresión; los segmentos rojos (residuos) son lo que se «equivoca» la recta en cada dato.";
    }
    g = plano(cuerpo.querySelector(".w-plot"), "Nube de puntos", 0, 10, 0, 10, 560, 360);
    g.svg.addEventListener("click", function (ev) {
      if (ev.target.classList && ev.target.classList.contains("p-asa")) return;
      var c = coords(g, ev); if (!c || c.x < 0 || c.x > 10 || c.y < 0 || c.y > 10 || st.pts.length >= 30) return;
      st.pts.push([red1(c.x), red1(c.y)]); sync(); pinta();
    });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_NUBE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { cargar(+k); });
    cargar(0);
  };

  // ============================================================
  // MINIMOS: la mejor recta minimiza la suma de cuadrados
  // ============================================================
  var DAT_MIN = [
    { t: "Estudio y nota", pts: [[1, 2], [2, 4], [3, 3], [4, 6], [5, 5], [6, 8], [7, 7]], nota: "Horas de estudio (x) y calificación (y)." },
    { t: "Descenso", pts: [[1, 7], [2, 6], [3, 6.5], [4, 4], [5, 3.5], [6, 2], [7, 2.5]], nota: "Una relación negativa." },
    { t: "Casi una recta", pts: [[1, 1.2], [2, 2.1], [3, 2.9], [4, 4.2], [5, 4.9], [6, 6.1]], nota: "Los datos casi están alineados." }
  ];
  B.w.m12_minimos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mínimos cuadrados: busca la recta que menos error comete");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, m: 0.5, n: 1 }, g, sm, sn, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    sm = U.slider(ctl, { et: "Pendiente <i>m</i>", min: -2, max: 2, step: 0.05, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sn = U.slider(ctl, { et: "Ordenada <i>n</i>", min: -2, max: 8, step: 0.05, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    U.boton(ctl, "Colocar la recta de regresión", function () { var S = E.stats(DAT_MIN[st.i].pts); st.m = S.m; st.n = S.a; sm.set(S.m); sn.set(S.a); pinta(); }, "btn-comprobar");
    function pinta() {
      var P = DAT_MIN[st.i].pts, S = E.stats(P), best = E.sse(P, S.m, S.a), mine = E.sse(P, st.m, st.n); g.limpiar();
      P.forEach(function (p) { var yl = st.m * p[0] + st.n, d = yl - p[1]; if (Math.abs(d) > 1e-9) g.rect(p[0], p[1], p[0] + d, yl, { clase: "z-red" }); });
      g.recta(S.m, S.mx, S.my, { clase: "c-faint", dash: "6 5" });
      g.recta(st.m, 0, st.n, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      P.forEach(function (p) { g.punto(p[0], p[1], { r: 5, clase: "c-ink" }); });
      var ratio = mine / best;
      lectura.innerHTML = fil("Tu recta", "y = " + fmt(st.m, 2) + "x " + sig(st.n, 2), "pen") + fil("Suma de cuadrados de tus errores", fmt(mine, 3), "red") + fil("Mínimo posible (recta de regresión)", fmt(best, 3) + "   (y = " + fmt(S.m, 3) + "x " + sig(S.a, 3) + ")", "ok") +
        fil("Veredicto", ratio < 1.001 ? "¡Es la recta de regresión! Ninguna otra recta comete menos error." : ratio < 1.15 ? "Muy cerca: tu error es solo un " + fmt((ratio - 1) * 100, 1) + " % mayor." : "Tu error es " + fmt(ratio, 2) + " veces el mínimo. Sigue ajustando.", ratio < 1.001 ? "ok ancho" : "ancho");
      pie.innerHTML = DAT_MIN[st.i].nota + " Cada <b>cuadrado rojo</b> tiene de lado el error vertical entre un dato y tu recta: su área es el error al cuadrado. La recta de <b>mínimos cuadrados</b> (línea gris discontinua) es la que hace <b>mínima la suma de las áreas</b>. Es exactamente la recta de regresión y − ȳ = (Sxy/Sx²)(x − x̄).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 9, ymin: -1, ymax: 9, w: 520, h: 360, etx: "x", ety: "y", etiqueta: "Recta y cuadrados de los errores" });
    g.rangoIso(4, 4, 5.2);
    U.fichas(cuerpo.querySelector("[data-pre]"), DAT_MIN.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // TABLA: hoja de cálculo paso a paso
  // ============================================================
  var PRE_TAB = [
    { t: "x: 2, 4, 6, 8 · y: 3, 5, 7, 9", x: "2; 4; 6; 8", y: "3; 5; 7; 9" },
    { t: "Horas de estudio y nota", x: "1; 2; 3; 4; 5", y: "3; 4; 6; 7; 8" },
    { t: "Temperatura y consumo", x: "10; 15; 20; 25; 30", y: "80; 65; 55; 42; 30" },
    { t: "Sin relación clara", x: "1; 2; 3; 4; 5; 6", y: "5; 2; 6; 3; 5; 4" }
  ];
  B.w.m12_tabla = function (host) {
    var cuerpo = B.caja(host, "Calcula con orden", "La hoja de cálculo: sumas, medias, covarianza, r y recta");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="ac-tabla m12-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { x: PRE_TAB[0].x, y: PRE_TAB[0].y }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".m12-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iX = campo(ctl, "x:", st.x, 230), iY = campo(ctl, "y:", st.y, 230);
    function pinta() {
      var x = lista(st.x), y = lista(st.y);
      if (!x.length || x.length !== y.length || x.some(isNaN) || y.some(isNaN)) { tabla.innerHTML = ""; lectura.innerHTML = fil("Revisa los datos", "escribe los mismos valores en x e y, separados por «;» (por ejemplo 2; 4; 6)", "red ancho"); return; }
      if (x.length > 14) { tabla.innerHTML = ""; lectura.innerHTML = fil("Demasiados datos", "usa como máximo 14 parejas", "red ancho"); return; }
      var pts = x.map(function (v, i) { return [v, y[i]]; }), S = E.stats(pts), n = pts.length;
      var f = function (v) { return fmt(v, 3); };
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>i</th><th>xᵢ</th><th>yᵢ</th><th>xᵢ²</th><th>yᵢ²</th><th>xᵢ·yᵢ</th></tr></thead><tbody>" +
        pts.map(function (p, i) { return "<tr><td>" + (i + 1) + "</td><td>" + f(p[0]) + "</td><td>" + f(p[1]) + "</td><td>" + f(p[0] * p[0]) + "</td><td>" + f(p[1] * p[1]) + "</td><td>" + f(p[0] * p[1]) + "</td></tr>"; }).join("") +
        "<tr class='m12-tot'><th>Σ</th><td><b>" + f(S.sx) + "</b></td><td><b>" + f(S.sy) + "</b></td><td><b>" + f(S.sxx) + "</b></td><td><b>" + f(S.syy) + "</b></td><td><b>" + f(S.sxy) + "</b></td></tr></tbody></table>";
      lectura.innerHTML = fil("Medias", "x̄ = " + f(S.sx) + "/" + n + " = " + f(S.mx) + " · ȳ = " + f(S.sy) + "/" + n + " = " + f(S.my), "pen ancho") +
        fil("Varianzas", "Sx² = " + f(S.sxx) + "/" + n + " − " + f(S.mx) + "² = " + f(S.vx) + " · Sy² = " + f(S.syy) + "/" + n + " − " + f(S.my) + "² = " + f(S.vy), "ancho") +
        fil("Desviaciones típicas", "Sx = " + f(S.dx) + " · Sy = " + f(S.dy)) + fil("Covarianza", "Sxy = " + f(S.sxy) + "/" + n + " − " + f(S.mx) + "·" + f(S.my) + " = " + f(S.cov), "pen ancho") +
        fil("Coeficiente r", isNaN(S.r) ? "—" : "r = " + f(S.cov) + "/(" + f(S.dx) + "·" + f(S.dy) + ") = " + fmt(S.r, 4), "ok ancho") + fil("Relación", E.fuerza(S.r) + (isNaN(S.r) ? "" : "  (r² = " + fmt(S.r2, 3) + ": el " + fmt(S.r2 * 100, 1) + " % de la variación de y se explica por x)"), "ancho") +
        fil("Recta de y sobre x", isNaN(S.m) ? "—" : "y − " + f(S.my) + " = (" + f(S.cov) + "/" + f(S.vx) + ")(x − " + f(S.mx) + ")  →  " + ecuacion(S.a, S.m), "red ancho") + fil("Recta de x sobre y", isNaN(S.mxy) ? "—" : "x − " + f(S.mx) + " = (" + f(S.cov) + "/" + f(S.vy) + ")(y − " + f(S.my) + ")  →  x = " + fmt(S.mxy, 3) + "·y " + sig(S.axy, 3), "ancho");
      pie.innerHTML = "Es el esquema que debes seguir en un examen: tabla con xᵢ, yᵢ, xᵢ², yᵢ², xᵢyᵢ y sus sumas → medias → varianzas → covarianza → r → recta. Escribe tus datos separados por «;» (con coma decimal si quieres).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_TAB.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.x = PRE_TAB[+k].x; st.y = PRE_TAB[+k].y; iX.value = st.x; iY.value = st.y; pinta(); });
    iX.addEventListener("input", function () { st.x = iX.value; pinta(); }); iY.addEventListener("input", function () { st.y = iY.value; pinta(); });
    pinta();
  };

  // ============================================================
  // DOBLE: tabla de doble entrada, marginales y condicionadas
  // ============================================================
  var PRE_DOB = [
    { t: "Estudio y nota (dependientes)", xs: [1, 2, 3], ys: [4, 6, 8], f: [[6, 2, 1], [3, 5, 3], [1, 3, 6]], nx: "horas de estudio", ny: "nota" },
    { t: "Independientes", xs: [1, 2, 3], ys: [4, 6, 8], f: [[2, 4, 6], [3, 6, 9], [1, 2, 3]], nx: "x", ny: "y" },
    { t: "Relación decreciente", xs: [10, 20, 30], ys: [1, 2, 3], f: [[1, 3, 7], [3, 6, 3], [7, 3, 1]], nx: "temperatura (°C)", ny: "horas de calefacción" }
  ];
  B.w.m12_doble = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Tabla de doble entrada: marginales, condicionadas e independencia");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="ac-tabla m12-dob"></div><div data-cond class="chips"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, f: PRE_DOB[0].f.map(function (r) { return r.slice(); }), c: 0 }, dob = cuerpo.querySelector(".m12-dob"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), cond = cuerpo.querySelector("[data-cond]");
    function tabla() {
      var P = PRE_DOB[st.i], D = E.doble(P.xs, P.ys, st.f);
      var h = "<p class='m12-cab'><b>x</b> = " + P.nx + " · <b>y</b> = " + P.ny + "</p><table class='fo-t ac-t m12-t'><thead><tr><th>y ↓ · x →</th>" + P.xs.map(function (v) { return "<th>" + v + "</th>"; }).join("") + "<th>Total fᵧ</th></tr></thead><tbody>";
      P.ys.forEach(function (yv, i) {
        h += "<tr><th>" + yv + "</th>" + P.xs.map(function (_, j) { return "<td><input type='number' min='0' max='99' step='1' value='" + st.f[i][j] + "' data-i='" + i + "' data-j='" + j + "' aria-label='Frecuencia de x = " + P.xs[j] + " e y = " + yv + "'></td>"; }).join("") + "<td class='pen'><b>" + D.fy[i] + "</b></td></tr>";
      });
      h += "<tr class='m12-tot'><th>Total fₓ</th>" + D.fx.map(function (v) { return "<td class='red'><b>" + v + "</b></td>"; }).join("") + "<td><b>" + D.n + "</b></td></tr></tbody></table>";
      dob.innerHTML = h;
    }
    function pinta() {
      var P = PRE_DOB[st.i], D = E.doble(P.xs, P.ys, st.f), S = D.st;
      if (!S || D.n <= 0) { lectura.innerHTML = fil("Tabla vacía", "escribe alguna frecuencia", "red ancho"); return; }
      var j = st.c, cj = D.fx[j];
      var dist = P.ys.map(function (yv, i) { return cj > 0 ? st.f[i][j] / cj : 0; }), media = 0; dist.forEach(function (p, i) { media += p * P.ys[i]; });
      // independencia: fᵢⱼ ≈ fᵧ·fₓ/n
      var maxDif = 0; P.ys.forEach(function (_, i) { P.xs.forEach(function (_, jj) { maxDif = Math.max(maxDif, Math.abs(st.f[i][jj] - D.fy[i] * D.fx[jj] / D.n)); }); });
      var indep = maxDif < 0.5;
      lectura.innerHTML = fil("Distribución marginal de x", P.xs.map(function (v, k) { return v + ": " + D.fx[k]; }).join(" · "), "red ancho") + fil("Distribución marginal de y", P.ys.map(function (v, k) { return v + ": " + D.fy[k]; }).join(" · "), "pen ancho") +
        fil("x̄ · Sx", fmt(S.mx, 3) + " · " + fmt(S.dx, 3)) + fil("ȳ · Sy", fmt(S.my, 3) + " · " + fmt(S.dy, 3)) + fil("Covarianza · r", fmt(S.cov, 3) + " · " + (isNaN(S.r) ? "—" : fmt(S.r, 3)), "ok") +
        fil("Y condicionada a x = " + P.xs[j], P.ys.map(function (yv, i) { return "P(y = " + yv + " | x = " + P.xs[j] + ") = " + st.f[i][j] + "/" + cj + " = " + fmt(dist[i], 3); }).join(" · ") + "  →  media condicionada ȳ|x=" + P.xs[j] + " = " + fmt(media, 3), "ancho") +
        fil("¿Independientes?", indep ? "Sí: fᵢⱼ = fᵧ·fₓ/n en todas las casillas (la distribución condicionada no depende de x)" : "No: hay casillas que se alejan de fᵧ·fₓ/n (máxima diferencia " + fmt(maxDif, 2) + ")", indep ? "ok ancho" : "red ancho");
      pie.innerHTML = "Edita las frecuencias. Las <b>marginales</b> son los totales de filas y columnas; la <b>condicionada</b> de y dado x = " + P.xs[j] + " es la columna dividida entre su total. Si las variables son <b>independientes</b>, todas las columnas tienen la misma distribución condicionada. Si r = 0 puede que haya relación (no lineal): r sólo mide lo lineal.";
    }
    function condChips() { var P = PRE_DOB[st.i]; U.fichas(cond, P.xs.map(function (v, j) { return { k: String(j), t: "y | x = " + v }; }), String(st.c), function (k) { st.c = +k; pinta(); }); }
    dob.addEventListener("input", function (e) { var t = e.target; if (t.tagName !== "INPUT") return; st.f[+t.getAttribute("data-i")][+t.getAttribute("data-j")] = Math.max(0, Math.min(99, Math.round(parseFloat(t.value) || 0))); pinta(); var tot = E.doble(PRE_DOB[st.i].xs, PRE_DOB[st.i].ys, st.f); /* totales */ dob.querySelectorAll("td.pen b").forEach(function (b, k) { b.textContent = tot.fy[k]; }); dob.querySelectorAll("tr.m12-tot td b").forEach(function (b, k) { b.textContent = k < tot.fx.length ? tot.fx[k] : tot.n; }); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_DOB.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.f = PRE_DOB[st.i].f.map(function (r) { return r.slice(); }); st.c = 0; tabla(); condChips(); pinta(); });
    tabla(); condChips(); pinta();
  };

  // ============================================================
  // ATIPICOS: un solo dato puede cambiarlo todo
  // ============================================================
  B.w.m12_atipicos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un valor atípico puede cambiarlo todo");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var base = E.nubeCon(0.95, 10, 4, 1.6, 1.6, 4, 4).map(function (p) { return [red1(p[0]), red1(p[1])]; });
    var st = { o: [9, 1], ver: true }, g, h, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    casilla(ctl, "Incluir el punto atípico (rojo) en el cálculo", true, function (v) { st.ver = v; pinta(); });
    function pinta() {
      g.limpiar(); g.mover(h, st.o[0], st.o[1]);
      var S0 = E.stats(base), S1 = E.stats(base.concat([st.o]));
      base.forEach(function (p) { g.punto(p[0], p[1], { r: 5, clase: "c-pen" }); });
      g.recta(S0.m, S0.mx, S0.my, { clase: "c-pen", dash: "6 5" });
      var S = st.ver ? S1 : S0;
      if (st.ver) g.recta(S1.m, S1.mx, S1.my, { clase: "c-red" }).setAttribute("stroke-width", 3);
      lectura.innerHTML = fil("Sin el punto atípico", "r = " + fmt(S0.r, 3) + " · " + ecuacion(S0.a, S0.m, 2), "pen ancho") + fil("Con el punto atípico", "r = " + fmt(S1.r, 3) + " · " + ecuacion(S1.a, S1.m, 2), st.ver ? "red ancho" : "ancho") +
        fil("Cambio en r", fmt(S1.r - S0.r, 3)) + fil("Cambio en la pendiente", fmt(S1.m - S0.m, 3)) + fil("Qué pasaría", Math.abs(S1.r - S0.r) > 0.3 ? "Un solo dato ha deshecho (o invertido) la correlación." : Math.abs(S1.r - S0.r) > 0.05 ? "Un solo dato ya desplaza r de forma apreciable." : "Este punto encaja con el resto: apenas influye.", "ancho");
      pie.innerHTML = "Arrastra el <b style='color:var(--red)'>punto rojo</b>. La línea azul discontinua es la recta de los diez puntos «normales»; la roja continua incluye al punto atípico. Los atípicos alejados en horizontal (con mucha «palanca») son los más peligrosos. Antes de calcular r conviene <b>dibujar la nube</b> y buscar datos extraños.";
    }
    g = plano(cuerpo.querySelector(".w-plot"), "Dato atípico", 0, 10, 0, 10, 560, 340);
    h = asa(g, function () { return st.o; }, function (x, y) { st.o = [limita(red1(x), 0, 10), limita(red1(y), 0, 10)]; pinta(); }, "c-red", "Punto atípico");
    pinta();
  };

  // ============================================================
  // PREDICCION: interpolar o extrapolar
  // ============================================================
  var PRE_PRED = [
    { t: "Altura de un niño", x: [2, 3, 4, 5, 6, 7, 8, 9, 10], y: [87, 95, 102, 109, 115, 121, 127, 133, 138], nx: "edad (años)", ny: "altura (cm)", rg: [0, 45, 40, 300], dx: 1, u: "cm", ejemplo: [40, "a los 40 años la recta predice una altura absurda"] },
    { t: "Precio de un coche", x: [1, 2, 3, 4, 5, 6, 7, 8], y: [18.5, 16.1, 14.4, 12.2, 10.8, 8.7, 7.1, 5.4], nx: "antigüedad (años)", ny: "precio (miles de €)", rg: [0, 20, -10, 24], dx: 0.5, u: "mil €", ejemplo: [18, "con 18 años la recta daría un precio negativo"] },
    { t: "Temperatura y helados", x: [18, 20, 22, 24, 26, 28, 30], y: [60, 80, 95, 120, 145, 160, 190], nx: "temperatura (°C)", ny: "helados vendidos", rg: [0, 45, -80, 400], dx: 1, u: "helados", ejemplo: [5, "a 5 °C la recta daría ventas negativas"] }
  ];
  B.w.m12_prediccion = function (host) {
    var cuerpo = B.caja(host, "Problema", "Predecir con la recta: interpolar sí, extrapolar con cuidado");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, x: 5 }, g, sl, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    sl = U.slider(ctl, { et: "Valor de <i>x</i> que quieres predecir", min: 0, max: 40, step: 0.5, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var P = PRE_PRED[st.i], pts = P.x.map(function (v, k) { return [v, P.y[k]]; }), S = E.stats(pts), R = P.rg;
      g.rango(R[0], R[1], R[2], R[3]); g.limpiar();
      var x0 = P.x[0], x1 = P.x[P.x.length - 1];
      g.rect(x0, R[2], x1, R[3], { clase: "z-ok" }); g.rect(R[0], R[2], x0, R[3], { clase: "z-red" }); g.rect(x1, R[2], R[1], R[3], { clase: "z-red" });
      g.recta(S.m, S.mx, S.my, { clase: "c-ok" }).setAttribute("stroke-width", 3);
      pts.forEach(function (p) { g.punto(p[0], p[1], { r: 5, clase: "c-pen" }); });
      var yh = S.a + S.m * st.x, dentro = st.x >= x0 && st.x <= x1;
      g.vertical(st.x, { clase: "c-faint", dash: "4 4" }); g.horizontal(yh, { clase: "c-faint", dash: "4 4" });
      g.punto(st.x, yh, { r: 7, clase: dentro ? "c-ok" : "c-red" });
      var se = Math.sqrt(E.sse(pts, S.m, S.a) / pts.length);
      lectura.innerHTML = fil("Recta de regresión", ecuacion(S.a, S.m, 3), "pen ancho") + fil("r · r²", fmt(S.r, 4) + " · " + fmt(S.r2, 4), "ok") + fil("Error típico de los residuos", "± " + fmt(se, 2) + " " + P.u) +
        fil("Predicción para x = " + fmt(st.x, 1), fmt(yh, 2) + " (" + P.ny + ")", dentro ? "ok" : "red") +
        fil("Tipo de estimación", dentro ? "interpolación (x dentro del rango observado [" + x0 + ", " + x1 + "]): fiable" : "extrapolación (x fuera del rango [" + x0 + ", " + x1 + "]): poco fiable" + (st.x === P.ejemplo[0] ? " — " + P.ejemplo[1] : ""), dentro ? "ok ancho" : "red ancho");
      pie.innerHTML = "La zona <b style='color:var(--ok)'>verde</b> es el rango en el que están los datos; la <b style='color:var(--red)'>roja</b>, donde no hay datos. Dentro de la verde la recta es una buena aproximación; fuera, estás suponiendo que la relación lineal «continúa», y eso suele ser falso. Prueba con x = " + P.ejemplo[0] + ".";
    }
    g = plano(cuerpo.querySelector(".w-plot"), "Interpolación y extrapolación", 0, 45, 0, 300, 600, 340);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_PRED.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.x = Math.round((PRE_PRED[st.i].x[0] + PRE_PRED[st.i].x[PRE_PRED[st.i].x.length - 1]) / 2); sl.set(st.x); pinta(); });
    pinta();
  };

  // ============================================================
  // ADIVINA: ¿qué r tiene esta nube?
  // ============================================================
  B.w.m12_adivina = function (host) {
    var cuerpo = B.caja(host, "Juego", "¿Qué coeficiente de correlación tiene esta nube?");
    cuerpo.innerHTML = '<div class="w-plot"></div><div class="m12-op chips"></div><div class="lectura anch"></div><div data-ctl></div><p class="w-pie"></p>';
    var OBJ = [-0.95, -0.8, -0.5, -0.2, 0, 0.2, 0.5, 0.8, 0.95, 0.99], st = { seed: 100, r: 0.8, ok: 0, tot: 0, hecho: false }, g, ops = cuerpo.querySelector(".m12-op"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    function nueva() {
      var rnd = E.rng(st.seed++ * 7919); st.r = OBJ[Math.floor(rnd() * OBJ.length)]; st.hecho = false;
      var op = [st.r]; while (op.length < 4) { var c = OBJ[Math.floor(rnd() * OBJ.length)]; if (op.indexOf(c) < 0) op.push(c); }
      op.sort(function (a, b) { return a - b; }); st.op = op;
      var pts = E.nubeCon(st.r, 22, st.seed * 13, 1.7, 1.7, 5, 5); st.pts = pts;
      g.limpiar(); pts.forEach(function (p) { g.punto(limita(p[0], 0.1, 9.9), limita(p[1], 0.1, 9.9), { r: 4.5, clase: "c-pen" }); });
      ops.innerHTML = op.map(function (v, k) { return '<button type="button" class="chip-btn" data-k="' + k + '">r = ' + fmt(v, 2) + "</button>"; }).join("");
      lectura.innerHTML = fil("Marcador", st.ok + " aciertos de " + st.tot, "pen") + fil("Pista", "Si los puntos suben, r es positivo; si bajan, negativo; cuanto más alineados, más cerca de ±1.");
    }
    ops.addEventListener("click", function (e) {
      var b = e.target.closest("[data-k]"); if (!b || st.hecho) return; st.hecho = true; st.tot++;
      var v = st.op[+b.getAttribute("data-k")], bien = Math.abs(v - st.r) < 1e-9; if (bien) st.ok++;
      Array.prototype.forEach.call(ops.children, function (c) { var vv = st.op[+c.getAttribute("data-k")]; if (Math.abs(vv - st.r) < 1e-9) c.classList.add("bien"); else if (c === b) c.classList.add("mal"); });
      var S = E.stats(st.pts);
      lectura.innerHTML = fil("Marcador", st.ok + " aciertos de " + st.tot, "pen") + fil(bien ? "✓ Correcto" : "Era otra", "r real de esta nube = " + fmt(S.r, 3) + " (" + E.fuerza(S.r) + ")", bien ? "ok ancho" : "red ancho");
    });
    U.boton(ctl, "Otra nube", nueva, "btn-comprobar");
    g = plano(cuerpo.querySelector(".w-plot"), "Nube para adivinar r", 0, 10, 0, 10, 520, 320);
    pie.innerHTML = "Entrena el ojo: con la práctica reconocerás un r ≈ 0,9 de un r ≈ 0,5 a primera vista. Recuerda que la correlación mide lo <b>lineal</b>.";
    nueva();
  };

  // ============================================================
  // DOSRECTAS: y sobre x y x sobre y
  // ============================================================
  B.w.m12_dosrectas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las dos rectas de regresión: y sobre x y x sobre y");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { r: 0.7 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Correlación <i>r</i>", min: -1, max: 1, step: 0.05, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var pts = E.nubeCon(st.r, 24, 2024, 1.7, 1.7, 5, 5), S = E.stats(pts); g.limpiar();
      pts.forEach(function (p) { g.punto(p[0], p[1], { r: 4, clase: "c-faint" }); });
      g.recta(S.m, S.mx, S.my, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      if (Math.abs(S.mxy) > 1e-6) g.recta(1 / S.mxy, S.mx, S.my, { clase: "c-red" }).setAttribute("stroke-width", 3); else g.vertical(S.mx, { clase: "c-red" }).setAttribute("stroke-width", 3);
      g.punto(S.mx, S.my, { r: 6, clase: "c-ink" });
      lectura.innerHTML = fil("r de la nube", fmt(S.r, 3), "ok") + fil("y sobre x (azul)", ecuacion(S.a, S.m), "pen ancho") + fil("x sobre y (roja)", "x = " + fmt(S.mxy, 3) + "·y " + sig(S.axy, 3), "red ancho") +
        fil("Producto de las pendientes mᵧₓ·mₓᵧ", fmt(S.m * S.mxy, 4) + "  (= r² = " + fmt(S.r2, 4) + ")") + fil("Qué se ve", Math.abs(S.r) > 0.99 ? "r = ±1: las dos rectas coinciden" : Math.abs(S.r) < 0.05 ? "r ≈ 0: una es horizontal (y = ȳ) y la otra vertical (x = x̄): perpendiculares" : "se cortan en el centro (x̄, ȳ), tanto más abiertas cuanto menor es |r|", "ancho");
      pie.innerHTML = "Las dos rectas se cortan <b>siempre</b> en el centro (x̄, ȳ). La <b>azul</b> (y sobre x) minimiza los errores en vertical y sirve para predecir y; la <b>roja</b> (x sobre y) minimiza los errores en horizontal y sirve para predecir x. Cuanto mayor es |r|, más se parecen; con |r| = 1 son la misma recta.";
    }
    g = plano(cuerpo.querySelector(".w-plot"), "Las dos rectas de regresión", 0, 10, 0, 10, 520, 340);
    g.rangoIso(5, 5, 5.2);
    pinta();
  };

  // ============================================================
  // UNIDADES: cambiar la escala no cambia r
  // ============================================================
  B.w.m12_unidades = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cambiar de unidades: qué cambia y qué no");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="ac-tabla m12-uni"></div><div data-ctl></div><p class="w-pie"></p>';
    var DATOS = [{ t: "Altura (cm) y peso (kg)", x: [150, 158, 165, 170, 176, 182], y: [49, 54, 60, 66, 72, 79], nx: "altura", ny: "peso" }, { t: "x: 1…6 · y: 2, 3, 5, 4, 6, 7", x: [1, 2, 3, 4, 5, 6], y: [2, 3, 5, 4, 6, 7], nx: "x", ny: "y" }];
    var st = { i: 0, a: 1, b: 0, c: 1, d: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), uni = cuerpo.querySelector(".m12-uni"), pie = cuerpo.querySelector(".w-pie");
    function deslizador(clave, et, mn, mx, step) { U.slider(ctl, { et: et, min: mn, max: mx, step: step, val: st[clave], on: function (v) { st[clave] = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } }); }
    deslizador("a", "x′ = <i>a</i>·x + b: <i>a</i>", -2, 2, 0.01); deslizador("b", "<i>b</i>", -50, 50, 1); deslizador("c", "y′ = <i>c</i>·y + d: <i>c</i>", -2, 2, 0.01); deslizador("d", "<i>d</i>", -50, 50, 1);
    function pinta() {
      var D = DATOS[st.i], p0 = D.x.map(function (v, k) { return [v, D.y[k]]; }), p1 = p0.map(function (p) { return [st.a * p[0] + st.b, st.c * p[1] + st.d]; }), S0 = E.stats(p0), S1 = E.stats(p1);
      var f = function (v) { return isNaN(v) ? "—" : fmt(v, 3); };
      uni.innerHTML = "<table class='fo-t ac-t'><thead><tr><th></th><th>Originales</th><th>Transformados</th><th>Relación</th></tr></thead><tbody>" +
        [["x̄", S0.mx, S1.mx, "x̄′ = a·x̄ + b"], ["ȳ", S0.my, S1.my, "ȳ′ = c·ȳ + d"], ["Sx", S0.dx, S1.dx, "Sx′ = |a|·Sx"], ["Sy", S0.dy, S1.dy, "Sy′ = |c|·Sy"], ["Sxy", S0.cov, S1.cov, "Sxy′ = a·c·Sxy"], ["r", S0.r, S1.r, "r′ = ± r (el signo de a·c)"]].map(function (r) { return "<tr" + (r[0] === "r" ? " class='m12-tot'" : "") + "><th>" + r[0] + "</th><td>" + f(r[1]) + "</td><td>" + f(r[2]) + "</td><td>" + r[3] + "</td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = "Cambiar las unidades (cm → m con a = 0,01; kg → libras con c = 2,2046) o el origen (sumar una constante) <b>modifica las medias, las desviaciones y la covarianza, pero no |r|</b>: por eso r sirve para comparar. Sólo cambia el signo de r si a·c &lt; 0 (se invierte el sentido de una variable).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), DATOS.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // CURVA: cuando la nube no es una recta (ajustes con logaritmos)
  // ============================================================
  var PRE_CUR = [
    { t: "Bacterias (exponencial)", x: [0, 1, 2, 3, 4, 5, 6], y: [100, 160, 250, 410, 650, 1020, 1630], nx: "horas", ny: "bacterias" },
    { t: "Planetas (potencial)", x: [0.39, 0.72, 1, 1.52, 5.2, 9.58], y: [0.24, 0.62, 1, 1.88, 11.86, 29.46], nx: "distancia al Sol (UA)", ny: "periodo (años)" },
    { t: "Aprendizaje (logarítmica)", x: [1, 2, 4, 8, 16, 32], y: [30, 44, 58, 71, 86, 99], nx: "horas de práctica", ny: "puntuación" }
  ];
  function ajusta(tipo, pts) {
    var T = pts.map(function (p) { return tipo === "lin" ? [p[0], p[1]] : tipo === "exp" ? [p[0], Math.log(p[1])] : tipo === "pot" ? [Math.log(p[0]), Math.log(p[1])] : [Math.log(p[0]), p[1]]; });
    if (T.some(function (q) { return !isFinite(q[0]) || !isFinite(q[1]); })) return { na: true, sse: Infinity, r: NaN, eq: "—", f: function () { return NaN; } };
    var S = E.stats(T), f;
    if (tipo === "lin") f = function (x) { return S.a + S.m * x; };
    else if (tipo === "exp") f = function (x) { return Math.exp(S.a) * Math.exp(S.m * x); };
    else if (tipo === "pot") f = function (x) { return Math.exp(S.a) * Math.pow(x, S.m); };
    else f = function (x) { return S.a + S.m * Math.log(x); };
    var sse = 0; pts.forEach(function (p) { var e = p[1] - f(p[0]); sse += e * e; });
    var eq = tipo === "lin" ? "y = " + fmt(S.m, 3) + "x " + sig(S.a, 3) : tipo === "exp" ? "y = " + fmt(Math.exp(S.a), 3) + "·e<sup>" + fmt(S.m, 4) + "x</sup>" : tipo === "pot" ? "y = " + fmt(Math.exp(S.a), 3) + "·x<sup>" + fmt(S.m, 3) + "</sup>" : "y = " + fmt(S.a, 2) + " " + sig(S.m, 2) + "·ln x";
    return { S: S, f: f, sse: sse, eq: eq, r: S.r };
  }
  B.w.m12_curva = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cuando la nube no es una recta: ajustes con logaritmos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-mod class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, m: "lin" }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PRE_CUR[st.i], pts = P.x.map(function (v, k) { return [v, P.y[k]]; });
      var xs = P.x, x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), ymax = Math.max.apply(null, P.y);
      g.rango(Math.max(0, x0 - (x1 - x0) * 0.08), x1 + (x1 - x0) * 0.08, 0, ymax * 1.12); g.limpiar();
      var F = ajusta(st.m, pts), ordenado = ["lin", "exp", "pot", "log"].map(function (t) { return [t, ajusta(t, pts)]; });
      var mejor = ordenado.filter(function (o) { return !o[1].na; }).sort(function (a, b) { return a[1].sse - b[1].sse; })[0][0];
      if (!F.na) g.curva(F.f, { clase: "c-ok", x0: st.m === "pot" || st.m === "log" ? Math.max(1e-3, g.c.xmin) : g.c.xmin, n: 400 }).setAttribute("stroke-width", 3);
      pts.forEach(function (p) { g.punto(p[0], p[1], { r: 5, clase: "c-pen" }); });
      var nombres = { lin: "Lineal y = ax + b", exp: "Exponencial y = a·e^(bx)", pot: "Potencial y = a·x^b", log: "Logarítmica y = a + b·ln x" };
      lectura.innerHTML = fil("Modelo elegido", nombres[st.m], "ok ancho") + (F.na ? fil("Aplicabilidad", "este modelo no se puede aplicar a estos datos (necesita logaritmos de valores positivos y hay x ≤ 0 o y ≤ 0)", "red ancho") : fil("Ecuación", F.eq, "pen ancho") + fil("r (de la recta transformada)", fmt(F.r, 4), "ok") + fil("Suma de cuadrados en la escala original", fmt(F.sse, 2), "red")) +
        fil("Comparación (suma de cuadrados)", ordenado.map(function (o) { return nombres[o[0]].split(" ")[0] + ": " + (o[1].na ? "no aplicable" : o[1].sse > 1e9 ? U.cient(o[1].sse, 2) : fmt(o[1].sse, 1)); }).join(" · "), "ancho") + fil("Mejor modelo para estos datos", nombres[mejor], mejor === st.m ? "ok ancho" : "red ancho");
      pie.innerHTML = "Si la nube se curva, se <b>transforma</b> una variable para «enderezarla»: <b>exponencial</b> (y = a·eᵇˣ): ln y frente a x es una recta · <b>potencial</b> (y = a·xᵇ): ln y frente a ln x es una recta · <b>logarítmica</b> (y = a + b·ln x): y frente a ln x es una recta. Después se aplica la regresión lineal a los datos transformados.";
    }
    g = plano(cuerpo.querySelector(".w-plot"), "Ajuste de modelos", 0, 7, 0, 2000, 600, 340);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_CUR.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-mod]"), [{ k: "lin", t: "Recta" }, { k: "exp", t: "Exponencial" }, { k: "pot", t: "Potencial" }, { k: "log", t: "Logarítmica" }], "lin", function (k) { st.m = k; pinta(); });
    pinta();
  };
})(window);
