/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 12 (Integral definida)
   m2t12_riemann   (sumas de Riemann con deslizador de n: izquierda, derecha, punto medio, trapecios, inferior y superior)
   m2t12_signo     (área cuando f cambia de signo: zonas coloreadas, integral neta frente a área)
   m2t12_entre     (área entre dos curvas: cortes, cuál va encima, suma de tramos)
   m2t12_fint      (función integral F(x) = ∫ f(t)dt: se dibuja al mover x; extremo superior x o x²)
   m2t12_medio     (valor medio de f y teorema del valor medio integral)
   Reutiliza el lector de expresiones de Matemáticas I (B.lab.fun.leer). Las cifras se verifican con herramientas/verificar_mates2_t12.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var fil = F.fil, pto = F.pto, etq = F.etq;
  var T12 = B.lab.t12 = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t12-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t12-estilos";
    s.textContent =
      ".m12-t{width:100%;border-collapse:collapse;font:14px var(--math);margin-top:8px}" +
      ".m12-t th,.m12-t td{padding:4px 8px;border-bottom:1px solid var(--line,rgba(128,128,128,.25));text-align:right}" +
      ".m12-t th{font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".m12-t td:first-child,.m12-t th:first-child{text-align:left}" +
      ".m12-pos{color:var(--ok);font-weight:700}.m12-neg{color:var(--red);font-weight:700}" +
      ".m12-dos{display:grid;grid-template-columns:1fr;gap:6px}" +
      "@media(max-width:520px){.m12-t{font-size:12.5px}.m12-t th,.m12-t td{padding:3px 4px}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------
  // Motor numérico
  // ------------------------------------------------------------
  function simpson(f, a, b, n) {
    if (a === b) return 0;
    n = n || 400; if (n % 2) n++;
    var h = (b - a) / n, s = f(a) + f(b), i;
    for (i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
    return s * h / 3;
  }
  function ceros(h, a, b) {
    var N = 797, out = [], x0 = a, v0 = h(a), i, x1, v1, lo, hi, vl, m, k;
    for (i = 1; i <= N; i++) {
      x1 = a + (b - a) * i / N; v1 = h(x1);
      if (v1 === 0 && i < N) { out.push(x1); }
      else if (v0 * v1 < 0) {
        lo = x0; hi = x1; vl = v0;
        for (k = 0; k < 60; k++) { m = (lo + hi) / 2; if (h(m) * vl > 0) lo = m; else hi = m; }
        out.push((lo + hi) / 2);
      }
      x0 = x1; v0 = v1;
    }
    return out;
  }
  // trozos entre ceros de h en [a, b]: [{a, b, v}] con v = ∫ h en el trozo
  function trozos(h, a, b) {
    var xs = [a].concat(ceros(h, a, b), [b]), out = [], k;
    for (k = 0; k < xs.length - 1; k++) out.push({ a: xs[k], b: xs[k + 1], v: simpson(h, xs[k], xs[k + 1], 200) });
    return out;
  }
  T12.simpson = simpson; T12.ceros = ceros; T12.trozos = trozos;
  function fn(txt) { var r = F.leer(txt); return r.g; }
  function rangoY(fs, xa, xb, incl0) {
    var lo = incl0 === false ? Infinity : 0, hi = incl0 === false ? -Infinity : 0, i, x, v, k;
    for (k = 0; k < fs.length; k++) for (i = 0; i <= 300; i++) {
      x = xa + (xb - xa) * i / 300; v = fs[k](x);
      if (isFinite(v) && Math.abs(v) < 1e6) { lo = Math.min(lo, v); hi = Math.max(hi, v); }
    }
    var pad = (hi - lo) * 0.12 || 1;
    return [lo - pad, hi + pad];
  }
  function num3(x) { return fmt(Math.round(x * 1e9) / 1e9, 3); }
  function sg(v) { return v > 0 ? '<span class="m12-pos">+' + num3(v) + "</span>" : '<span class="m12-neg">−' + num3(-v) + "</span>"; }

  // ============================================================
  // 1. SUMAS DE RIEMANN
  // ============================================================
  var PR = T12.riemann = [
    { t: "x² en [0, 3]", ex: "x^2", a: 0, b: 3, I: 9, Is: "9" },
    { t: "√x en [0, 4]", ex: "sqrt(x)", a: 0, b: 4, I: 16 / 3, Is: "16/3" },
    { t: "1/x en [1, 2]", ex: "1/x", a: 1, b: 2, I: Math.log(2), Is: "ln 2" },
    { t: "sen x en [0, π]", ex: "sin(x)", a: 0, b: Math.PI, I: 2, Is: "2" },
    { t: "eˣ en [0, 1]", ex: "e^x", a: 0, b: 1, I: Math.E - 1, Is: "e − 1" }
  ];
  var MET = [
    { k: "izq", t: "Izquierda" }, { k: "der", t: "Derecha" }, { k: "med", t: "Punto medio" },
    { k: "tra", t: "Trapecios" }, { k: "inf", t: "Inferior" }, { k: "sup", t: "Superior" }
  ];
  // suma de Riemann (n subintervalos iguales) con el método dado; devuelve { s, alt: [{x0, x1, y0, y1}] }
  T12.suma = function (f, a, b, n, met) {
    var h = (b - a) / n, s = 0, parts = [], i, x0, x1, y0, y1, c, m, j, v, lo, hi;
    for (i = 0; i < n; i++) {
      x0 = a + i * h; x1 = x0 + h;
      if (met === "izq") { y0 = y1 = f(x0); s += y0 * h; }
      else if (met === "der") { y0 = y1 = f(x1); s += y0 * h; }
      else if (met === "med") { y0 = y1 = f((x0 + x1) / 2); s += y0 * h; }
      else if (met === "tra") { y0 = f(x0); y1 = f(x1); s += (y0 + y1) / 2 * h; }
      else {
        lo = Infinity; hi = -Infinity;
        for (j = 0; j <= 24; j++) { v = f(x0 + h * j / 24); lo = Math.min(lo, v); hi = Math.max(hi, v); }
        y0 = y1 = met === "inf" ? lo : hi; s += y0 * h;
      }
      parts.push({ x0: x0, x1: x1, y0: y0, y1: y1 });
    }
    return { s: s, parts: parts };
  };

  B.w.m2t12_riemann = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Sumas de Riemann: rectángulos que se acercan al área");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-met class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, m: "izq", n: 4 }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g, sl;
    function pinta() {
      var P = PR[st.i], f = fn(P.ex), r = T12.suma(f, P.a, P.b, st.n, st.m), yy = rangoY([f], P.a, P.b), mg = (P.b - P.a) * 0.08;
      g.rango(P.a - mg, P.b + mg, yy[0], yy[1]); g.limpiar();
      r.parts.forEach(function (q) {
        if (st.m === "tra") g.poligono([[q.x0, 0], [q.x0, q.y0], [q.x1, q.y1], [q.x1, 0]], { clase: "z-pen", borde: "var(--pen)", grosor: 1 });
        else g.rect(q.x0, 0, q.x1, q.y0, { clase: "z-pen", borde: "var(--pen)" });
      });
      g.curva(f, { clase: "c-red", n: 400, x0: P.a, x1: P.b }).setAttribute("stroke-width", 3);
      var err = r.s - P.I, rel = Math.abs(err / P.I) * 100;
      lectura.innerHTML =
        fil("Suma con n = " + st.n, fmt(r.s, 4), "pen") +
        fil("Valor exacto ∫ f", P.Is + " ≈ " + fmt(P.I, 4), "ok") +
        fil("Error (suma − exacto)", (err >= 0 ? "+" : "−") + fmt(Math.abs(err), 4) + " · " + (rel < 0.01 ? "&lt; 0,01" : fmt(rel, 2)) + " %", Math.abs(err) < 0.01 * Math.abs(P.I) ? "ok" : "");
      pie.innerHTML = st.m === "inf" || st.m === "sup"
        ? "Suma inferior s<sub>n</sub> ≤ ∫ f ≤ S<sub>n</sub> suma superior. Cuando n crece, las dos se pegan al mismo número: eso es que f es integrable."
        : "Multiplica el número de rectángulos: la suma se aproxima al área exacta. El punto medio y los trapecios mejoran mucho más deprisa que izquierda o derecha.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 3, ymin: -1, ymax: 10, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Sumas de Riemann" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PR.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { st.i = +k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-met]"), MET, st.m, function (k) { st.m = k; pinta(); });
    sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "n (rectángulos)", min: 1, max: 60, step: 1, val: st.n, fmt: function (v) { return fmt(v, 0); }, on: function (v) { st.n = Math.round(v); pinta(); } });
    pinta();
  };

  // ============================================================
  // Dibujo común de zonas con signo (signo y entre)
  // ============================================================
  function filasTrozos(tr, nombre) {
    return '<table class="m12-t"><tr><th>Tramo</th><th>' + nombre + "</th><th>Área</th></tr>" + tr.map(function (q) {
      return "<tr><td>[" + num3(q.a) + "; " + num3(q.b) + "]</td><td>" + sg(q.v) + "</td><td>" + num3(Math.abs(q.v)) + "</td></tr>";
    }).join("") + "</table>";
  }

  // ============================================================
  // 2. ÁREA CON CAMBIO DE SIGNO
  // ============================================================
  var PS = T12.signo = [
    { t: "x² − 4x + 3", ex: "x^2-4*x+3", a: 0, b: 4, rg: [-0.5, 4.5] },
    { t: "x³ − x", ex: "x^3-x", a: -1, b: 2, rg: [-1.5, 2.5] },
    { t: "x³ − 3x² + 2x", ex: "x^3-3*x^2+2*x", a: 0, b: 2, rg: [-0.5, 2.5] },
    { t: "sen x", ex: "sin(x)", a: 0, b: 2 * Math.PI, rg: [-0.3, 6.6] }
  ];
  T12.signoCalc = function (ex, a, b) {
    var f = fn(ex), tr = trozos(f, a, b), neta = 0, area = 0;
    tr.forEach(function (q) { neta += q.v; area += Math.abs(q.v); });
    return { tr: tr, neta: neta, area: area };
  };
  B.w.m2t12_signo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Integral neta frente a área real");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><div class="m12-tab"></div><p class="w-pie"></p>';
    var st = { i: 0, a: PS[0].a, b: PS[0].b }, g, sa, sb, lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".m12-tab"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PS[st.i], f = fn(P.ex), c = T12.signoCalc(P.ex, st.a, st.b), yy = rangoY([f], P.rg[0], P.rg[1]);
      g.rango(P.rg[0], P.rg[1], yy[0], yy[1]); g.limpiar();
      c.tr.forEach(function (q) { g.zona(f, q.a, q.b, { clase: q.v >= 0 ? "z-ok" : "z-red" }); });
      g.curva(f, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      g.vertical(st.a, { clase: "c-faint", dash: "5 4" }); g.vertical(st.b, { clase: "c-faint", dash: "5 4" });
      c.tr.slice(1).forEach(function (q) { pto(g, q.a, 0, "c-red"); });
      lectura.innerHTML =
        fil("Integral ∫ f (neta)", num3(c.neta), "pen") +
        fil("Área real = suma de |trozos|", num3(c.area), "ok" + (Math.abs(c.neta - c.area) > 1e-6 ? " ancho" : ""));
      tab.innerHTML = filasTrozos(c.tr, "∫ f");
      pie.innerHTML = c.tr.length > 1 && Math.abs(c.neta - c.area) > 1e-6
        ? "Verde: f ≥ 0 (suma). Rojo: f &lt; 0 (resta). La integral neta compensa; el área no. Los puntos rojos son los ceros que parten el intervalo."
        : "Aquí f no cambia de signo en [a, b]: integral neta y área coinciden (salvo el signo si f &lt; 0).";
    }
    function preset(k) {
      var P = PS[k]; st.i = k; st.a = P.a; st.b = P.b;
      sa.input.min = sb.input.min = P.rg[0]; sa.input.max = sb.input.max = P.rg[1];
      sa.set(P.a); sb.set(P.b); pinta();
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 5, ymin: -2, ymax: 4, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Área con cambio de signo" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PS.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { preset(+k); });
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    sa = U.slider(ctl, { et: "a", min: -0.5, max: 4.5, val: PS[0].a, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.a = Math.min(v, st.b - 0.1); if (st.a !== v) sa.set(st.a); pinta(); } });
    sb = U.slider(ctl, { et: "b", min: -0.5, max: 4.5, val: PS[0].b, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.b = Math.max(v, st.a + 0.1); if (st.b !== v) sb.set(st.b); pinta(); } });
    preset(0);
  };

  // ============================================================
  // 3. ÁREA ENTRE DOS CURVAS
  // ============================================================
  var PE = T12.entre = [
    { t: "x y x²", f: "x", g: "x^2", tf: "x", tg: "x²", a: 0, b: 1, rg: [-0.5, 1.5] },
    { t: "x² y x + 2", f: "x+2", g: "x^2", tf: "x + 2", tg: "x²", a: -1, b: 2, rg: [-2.5, 3] },
    { t: "x³ y x", f: "x", g: "x^3", tf: "x", tg: "x³", a: -1, b: 1, rg: [-1.6, 1.6] },
    { t: "sen x y cos x", f: "cos(x)", g: "sin(x)", tf: "cos x", tg: "sen x", a: 0, b: Math.PI / 2, rg: [-0.3, 3.4] },
    { t: "√x y x²", f: "sqrt(x)", g: "x^2", tf: "√x", tg: "x²", a: 0, b: 1, rg: [-0.3, 1.6] }
  ];
  T12.entreCalc = function (fe, ge, a, b) {
    var f = fn(fe), g = fn(ge), h = function (x) { return f(x) - g(x); }, tr = trozos(h, a, b), neta = 0, area = 0;
    tr.forEach(function (q) { neta += q.v; area += Math.abs(q.v); });
    return { tr: tr, neta: neta, area: area };
  };
  B.w.m2t12_entre = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Área entre dos curvas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><div class="m12-tab"></div><p class="w-pie"></p>';
    var st = { i: 0, a: 0, b: 1 }, g, sa, sb, lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".m12-tab"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PE[st.i], f = fn(P.f), q = fn(P.g), c = T12.entreCalc(P.f, P.g, st.a, st.b), yy = rangoY([f, q], P.rg[0], P.rg[1]);
      g.rango(P.rg[0], P.rg[1], yy[0], yy[1]); g.limpiar();
      c.tr.forEach(function (t) { g.zona(f, t.a, t.b, { g: q, clase: t.v >= 0 ? "z-ok" : "z-pen" }); });
      g.curva(f, { clase: "c-red", n: 400 }).setAttribute("stroke-width", 3);
      g.curva(q, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      g.vertical(st.a, { clase: "c-faint", dash: "5 4" }); g.vertical(st.b, { clase: "c-faint", dash: "5 4" });
      c.tr.slice(1).forEach(function (t) { pto(g, t.a, f(t.a), "c-ok"); });
      lectura.innerHTML =
        fil("Curva roja f", P.tf, "") +
        fil("Curva azul g", P.tg, "") +
        fil("∫ (f − g) neta", num3(c.neta), "pen") +
        fil("Área = suma de |trozos|", num3(c.area), "ok");
      tab.innerHTML = filasTrozos(c.tr, "∫ (f − g)");
      pie.innerHTML = "Verde: f va por encima de g (f − g &gt; 0). Azul claro: g va por encima. Los puntos verdes son cortes f = g: ahí cambia quién va encima y hay que partir la integral.";
    }
    function preset(k) {
      var P = PE[k]; st.i = k; st.a = P.a; st.b = P.b;
      sa.input.min = sb.input.min = P.rg[0]; sa.input.max = sb.input.max = P.rg[1];
      sa.set(P.a); sb.set(P.b); pinta();
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 2, ymin: -1, ymax: 2, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Área entre dos curvas" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PE.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { preset(+k); });
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    sa = U.slider(ctl, { et: "a", min: -0.5, max: 1.5, val: 0, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.a = Math.min(v, st.b - 0.05); if (st.a !== v) sa.set(st.a); pinta(); } });
    sb = U.slider(ctl, { et: "b", min: -0.5, max: 1.5, val: 1, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.b = Math.max(v, st.a + 0.05); if (st.b !== v) sb.set(st.b); pinta(); } });
    preset(0);
  };

  // ============================================================
  // 4. FUNCIÓN INTEGRAL F(x) = ∫ₐ^u f(t) dt
  // ============================================================
  var PI = T12.fint = [
    { t: "t² − 4t + 3", ex: "t^2-4*t+3", a: 0, T: [-1, 5], x0: 2 },
    { t: "sen t", ex: "sin(t)", a: 0, T: [-0.5, 10], x0: 2 },
    { t: "e^(−t²)", ex: "e^(-t^2)", a: 0, T: [-3, 3], x0: 1 },
    { t: "2t/(1 + t²)", ex: "2*t/(1+t^2)", a: 0, T: [-4, 4], x0: 1.5 }
  ];
  B.w.m2t12_fint = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Función integral: F se dibuja al mover x");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-lim class="chips"></div><div data-ctl></div><div class="w-plot" data-top></div><div class="w-plot" data-bot></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, cuad: false, x: 2 }, gt, gb, sl, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function dom() { var P = PI[st.i]; return st.cuad ? [-Math.sqrt(P.T[1]), Math.sqrt(P.T[1])] : P.T; }
    function ajusta() {
      var d = dom(), P = PI[st.i];
      sl.input.min = d[0]; sl.input.max = d[1];
      st.x = Math.min(d[1], Math.max(d[0], st.cuad ? Math.min(P.x0, Math.sqrt(P.T[1]) * 0.7) : P.x0)); sl.set(st.x);
    }
    function pinta() {
      var P = PI[st.i], f = fn(P.ex), u = st.cuad ? st.x * st.x : st.x, d = dom();
      var Fu = function (uu) { return simpson(f, P.a, uu, Math.max(20, Math.ceil(Math.abs(uu - P.a) * 40))); };
      var G = function (x) { return Fu(st.cuad ? x * x : x); };
      var dG = function (x) { return st.cuad ? 2 * x * f(x * x) : f(x); };
      var yt = rangoY([f], P.T[0], P.T[1]), yb = rangoY([G], d[0], d[1]);
      gt.rango(P.T[0], P.T[1], yt[0], yt[1]); gt.limpiar();
      gt.zona(f, Math.min(P.a, u), Math.max(P.a, u), { clase: (u >= P.a) === true ? "z-pen" : "z-red" });
      gt.curva(f, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      gt.vertical(u, { clase: "c-red", dash: "5 4" }); gt.vertical(P.a, { clase: "c-faint", dash: "5 4" });
      gb.rango(d[0], d[1], yb[0], yb[1]); gb.limpiar();
      gb.curva(G, { clase: "c-ok", n: 400 }).setAttribute("stroke-width", 3);
      gb.vertical(st.x, { clase: "c-faint", dash: "5 4" });
      pto(gb, st.x, G(st.x), "c-red", false, 6);
      // extremos de G (ceros de G′ con cambio de signo)
      var ex = ceros(dG, d[0], d[1]), txt = ex.map(function (z) {
        var s0 = dG(z - 1e-3), tipo = s0 > 0 ? "máx" : "mín"; pto(gb, z, G(z), s0 > 0 ? "c-pen" : "c-ok", true, 4);
        return tipo + " en x = " + fmt(Math.round(z * 1e4) / 1e4, 3);
      });
      var der = dG(st.x), nombre = st.cuad ? "F(x) = ∫ f(t) dt, de a hasta x²" : "F(x) = ∫ f(t) dt, de a hasta x";
      lectura.innerHTML =
        fil(nombre.replace("F(x)", "F(" + fmt(st.x, 2) + ")"), num3(G(st.x)), "pen") +
        fil(st.cuad ? "F′(x) = f(x²)·2x" : "F′(x) = f(x)", num3(der), der > 1e-9 ? "ok" : der < -1e-9 ? "red" : "") +
        fil("F en este punto", Math.abs(der) < 0.02 ? "tangente horizontal" : der > 0 ? "crece ↗" : "decrece ↘", "") +
        fil("Extremos de F", txt.length ? txt.join(" · ") : "ninguno en este intervalo", "ancho");
      pie.innerHTML = "Arriba: f y el área desde a = " + fmt(P.a, 0) + " hasta " + (st.cuad ? "x²" : "x") + " (azul: sumando, rojo: restando). Abajo: el valor de esa área en función de x. F crece cuando " + (st.cuad ? "2x·f(x²) &gt; 0" : "f &gt; 0") + " y sus extremos están donde " + (st.cuad ? "esa derivada cambia" : "f cambia") + " de signo.";
    }
    gt = new B.Plot(cuerpo.querySelector("[data-top]"), { xmin: -1, xmax: 5, ymin: -2, ymax: 4, w: 600, h: 200, etx: "t", ety: "f(t)", etiqueta: "La función f" });
    gb = new B.Plot(cuerpo.querySelector("[data-bot]"), { xmin: -1, xmax: 5, ymin: -2, ymax: 4, w: 600, h: 220, etx: "x", ety: "F(x)", etiqueta: "La función integral F" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PI.map(function (q, k) { return { k: String(k), t: "f(t) = " + q.t }; }), "0", function (k) { st.i = +k; ajusta(); pinta(); });
    U.fichas(cuerpo.querySelector("[data-lim]"), [{ k: "x", t: "Extremo superior x" }, { k: "x2", t: "Extremo superior x²" }], "x", function (k) { st.cuad = k === "x2"; ajusta(); pinta(); });
    sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "x", min: -1, max: 5, step: 0.02, val: 2, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.x = v; pinta(); } });
    ajusta(); pinta();
  };

  // ============================================================
  // 5. VALOR MEDIO
  // ============================================================
  var PM = T12.medio = [
    { t: "x² en [0, 3]", ex: "x^2", a: 0, b: 3 },
    { t: "sen x en [0, π]", ex: "sin(x)", a: 0, b: Math.PI },
    { t: "eˣ en [0, 1]", ex: "e^x", a: 0, b: 1 },
    { t: "x³ − 3x en [0, 3]", ex: "x^3-3*x", a: 0, b: 3 }
  ];
  T12.medioCalc = function (ex, a, b) {
    var f = fn(ex), I = simpson(f, a, b, 800), mu = I / (b - a);
    return { I: I, mu: mu, cs: ceros(function (x) { return f(x) - mu; }, a, b) };
  };
  B.w.m2t12_medio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Valor medio de f y teorema del valor medio");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, c: 1, rev: false }, g, sl, btn, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PM[st.i], f = fn(P.ex), M = T12.medioCalc(P.ex, P.a, P.b), L = P.b - P.a, fc = f(st.c), yy = rangoY([f], P.a, P.b), mg = L * 0.08;
      g.rango(P.a - mg, P.b + mg, yy[0], yy[1]); g.limpiar();
      g.zona(f, P.a, P.b, { clase: "z-pen" });
      g.rect(P.a, 0, P.b, fc, { clase: "z-ok", borde: "var(--ok)" });
      g.curva(f, { clase: "c-pen", n: 400, x0: P.a, x1: P.b }).setAttribute("stroke-width", 3);
      g.horizontal(M.mu, { clase: "c-red", dash: "6 4" });
      g.vertical(st.c, { clase: "c-faint", dash: "5 4" });
      pto(g, st.c, fc, "c-ok", false, 6);
      if (st.rev) M.cs.forEach(function (z) { pto(g, z, f(z), "c-red", false, 6); });
      var dif = fc * L - M.I, cerca = Math.abs(fc - M.mu) < 0.01 * Math.max(1, Math.abs(M.mu));
      lectura.innerHTML =
        fil("Área bajo la curva ∫ f", num3(M.I), "pen") +
        fil("Valor medio μ = ∫ f / (b − a)", num3(M.mu), "pen") +
        fil("Rectángulo f(c)·(b − a)", num3(fc * L), cerca ? "ok" : "") +
        fil("Rectángulo − área", (dif >= 0 ? "+" : "−") + num3(Math.abs(dif)), cerca ? "ok" : "") +
        (st.rev ? fil("c que cumplen f(c) = μ", M.cs.map(function (z) { return fmt(Math.round(z * 1e4) / 1e4, 3); }).join(" · "), "ok ancho") : "");
      pie.innerHTML = cerca
        ? "¡Este c cumple el teorema! La altura f(c) es el valor medio y el rectángulo verde tiene exactamente el área de la zona azul."
        : "Mueve c hasta que el rectángulo verde «compense» la zona azul (diferencia 0): la altura f(c) debe valer μ (línea roja discontinua).";
    }
    function preset(k) {
      var P = PM[k]; st.i = k; sl.input.min = P.a; sl.input.max = P.b; st.c = P.a + (P.b - P.a) * 0.2; sl.set(st.c); st.rev = false; btn.textContent = "Revelar los c"; pinta();
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 3, ymin: -1, ymax: 10, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Valor medio" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PM.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { preset(+k); });
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    sl = U.slider(ctl, { et: "c", min: 0, max: 3, step: 0.01, val: 1, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.c = v; pinta(); } });
    btn = U.boton(ctl, "Revelar los c", function () { st.rev = !st.rev; btn.textContent = st.rev ? "Ocultar los c" : "Revelar los c"; pinta(); });
    preset(0);
  };
})(window);
