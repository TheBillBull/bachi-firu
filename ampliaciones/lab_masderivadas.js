/* ============================================================
   Bachi para Firu · laboratorio de derivadas II (Matemáticas I, tema 11)
   tresgraficas (f, f′, f″) · derivabilidad · linealizacion · valormedio · optimizar2 · cinematica
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  B.lab = B.lab || {};
  var D = B.lab.der = {};
  var INF = Infinity, fil = F.fil, pto = F.pto, etq = F.etq, num = F.num, campo = F.campo;

  // ------------------------------------------------------------
  // Derivadas numéricas (sólo para dibujar y comprobar)
  // ------------------------------------------------------------
  D.d1 = function (f, x) { var h = 1e-5 * Math.max(1, Math.abs(x)); return (f(x + h) - f(x - h)) / (2 * h); };
  D.d2 = function (f, x) { var h = 1e-3 * Math.max(1, Math.abs(x)); return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h); };
  // Cambios de signo de una función en [A, B]: devuelve [{ x, de, a }] con el signo antes y después
  D.cambios = function (g, A, Bm, N) {
    N = N || 1500; var out = [], prev = null, px = null, i;
    for (i = 0; i <= N; i++) {
      var x = A + (Bm - A) * i / N, v = g(x), s = isNaN(v) ? 0 : v > 1e-6 ? 1 : v < -1e-6 ? -1 : 0;
      if (s === 0) continue;
      if (prev !== null && s !== prev) {
        var a = px, b = x, sa = prev;
        for (var k = 0; k < 50; k++) { var m = (a + b) / 2, vm = g(m), sm = isNaN(vm) ? 0 : vm > 1e-9 ? 1 : vm < -1e-9 ? -1 : 0; if (sm === 0) { a = b = m; break; } if (sm === sa) a = m; else b = m; }
        out.push({ x: F.redond((a + b) / 2), de: sa, a: s });
      }
      prev = s; px = x;
    }
    return out;
  };

  function marco3(host, etiq, h) { return new B.Plot(host, { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 620, h: h || 200, etx: "x", ety: "", etiqueta: etiq }); }

  // ============================================================
  // TRESGRAFICAS: f, f′ y f″ una debajo de la otra
  // ============================================================
  var P3 = ["x^3-3x", "x^4-4x^2", "sin(x)", "e^(-x^2)", "x/(1+x^2)", "x^3", "ln(x)", "x*e^x", "1/x", "x^2"];
  B.w.tresgraficas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "f, f′ y f″: tres gráficas que se explican entre sí");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-zoom class="chips"></div><div class="w-plot dr-g1"></div><div class="w-plot dr-g2"></div><div class="w-plot dr-g3"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: P3[0], X: 3 }, g1, g2, g3, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var inp = campo(ctl, "f(x) =", st.f, 240);
    function pinta() {
      var r = F.leer(st.f); [g1, g2, g3].forEach(function (g) { g.limpiar(); });
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); return; }
      var f = r.g, X = st.X, d1 = function (x) { return D.d1(f, x); }, d2 = function (x) { return D.d2(f, x); };
      var ext = D.cambios(d1, -X, X), inf = D.cambios(d2, -X, X);
      var y1 = F.rangoY(f, -X, X), y2 = F.rangoY(d1, -X, X), y3 = F.rangoY(d2, -X, X);
      g1.rango(-X, X, y1[0], y1[1]); g2.rango(-X, X, y2[0], y2[1]); g3.rango(-X, X, y3[0], y3[1]);
      [g1, g2, g3].forEach(function (g) { g.limpiar(); });
      // zonas: f′ > 0 (crece) y f″ > 0 (curva hacia arriba)
      var N = 200, i;
      for (i = 0; i < N; i++) {
        var xa = -X + 2 * X * i / N, xb = -X + 2 * X * (i + 1) / N, xm = (xa + xb) / 2, a = d1(xm), c = d2(xm);
        if (!isNaN(a)) g2.rect(xa, Math.min(0, y2[1]), xb, Math.max(0, y2[0]), { clase: a > 0 ? "z-ok" : "z-red" });
        if (!isNaN(c)) g3.rect(xa, Math.min(0, y3[1]), xb, Math.max(0, y3[0]), { clase: c > 0 ? "z-pen" : "z-red" });
      }
      g1.curva(f, { clase: "c-pen", n: 600 }).setAttribute("stroke-width", 3); g2.curva(d1, { clase: "c-red", n: 600 }).setAttribute("stroke-width", 3); g3.curva(d2, { clase: "c-ok", n: 600 }).setAttribute("stroke-width", 3);
      ext.forEach(function (e) { pto(g1, e.x, f(e.x), "c-red", false, 6); etq(g1, e.x, f(e.x), e.de > 0 ? "máx" : "mín", "red", 0, e.de > 0 ? -10 : 18, "middle"); pto(g2, e.x, 0, "c-red", false, 5); g2.segmento(e.x, y2[0], e.x, y2[1], { clase: "c-faint", dash: "3 4" }); });
      inf.forEach(function (e) { pto(g1, e.x, f(e.x), "c-ok", false, 6); etq(g1, e.x, f(e.x), "inflexión", "ok", 0, -10, "middle"); pto(g3, e.x, 0, "c-ok", false, 5); g3.segmento(e.x, y3[0], e.x, y3[1], { clase: "c-faint", dash: "3 4" }); });
      function lista(l, fn) { return l.length ? l.slice(0, 6).map(fn).join(" · ") + (l.length > 6 ? " · …" : "") : "ninguno"; }
      var ps = function (e) { return "x = " + num(e.x, 3); };
      lectura.innerHTML = fil("Máximos relativos", lista(ext.filter(function (e) { return e.de > 0; }), function (e) { return "(" + num(e.x, 3) + ", " + num(f(e.x), 3) + ")"; }), "red") + fil("Mínimos relativos", lista(ext.filter(function (e) { return e.de < 0; }), function (e) { return "(" + num(e.x, 3) + ", " + num(f(e.x), 3) + ")"; }), "red") +
        fil("f′ cambia de signo en", lista(ext, ps), "") + fil("Puntos de inflexión (f″ cambia de signo)", lista(inf, function (e) { return "(" + num(e.x, 3) + ", " + num(f(e.x), 3) + ")"; }), "ok") +
        fil("Cómo leerlo", "En la gráfica de f′: verde = f′ &gt; 0 (f crece), rojo = f′ &lt; 0 (f decrece). En la de f″: azul = f″ &gt; 0 (f curvada hacia arriba, ∪), rojo = f″ &lt; 0 (curvada hacia abajo, ∩).", "ancho");
      pie.innerHTML = "Las derivadas se calculan numéricamente para dibujar. Mira que <b>los máximos y mínimos de f están donde f′ corta al eje X</b>, y que <b>los puntos de inflexión están donde f″ corta al eje X</b> (o donde f′ tiene un máximo o un mínimo).";
    }
    g1 = marco3(cuerpo.querySelector(".dr-g1"), "Función f", 220); g2 = marco3(cuerpo.querySelector(".dr-g2"), "Derivada f′", 170); g3 = marco3(cuerpo.querySelector(".dr-g3"), "Segunda derivada f″", 170);
    U.fichas(cuerpo.querySelector("[data-pre]"), P3.map(function (p, i) { return { k: String(i), t: p }; }), "0", function (k) { st.f = P3[+k]; inp.value = st.f; pinta(); });
    U.fichas(cuerpo.querySelector("[data-zoom]"), [{ k: "1.5", t: "Zoom ±1,5" }, { k: "3", t: "±3" }, { k: "6", t: "±6" }, { k: "12", t: "±12" }], "3", function (k) { st.X = parseFloat(k); pinta(); });
    inp.addEventListener("input", function () { st.f = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // DERIVABILIDAD: continuidad + derivadas laterales
  // ============================================================
  var PD = [
    { t: "x² | ax + b en x = 1", c: 1, par: ["a", "b"], v: [2, 0], rg: [-1, 3, -2, 5], f: function (x, a, b) { return x < 1 ? x * x : a * x + b; }, txt: function (a, b) { return "x² si x &lt; 1 · " + fmt(a, 1) + "x " + (b < 0 ? "− " : "+ ") + fmt(Math.abs(b), 1) + " si x ≥ 1"; }, nota: "Para que sea <b>derivable</b> hay que cumplir dos cosas en x = 1: que sea continua (1 = a + b) y que las pendientes coincidan (2 = a). Resultado: a = 2, b = −1." },
    { t: "a x² + 1 | b x + 2 en x = 1", c: 1, par: ["a", "b"], v: [1, 1], rg: [-1, 3, -3, 5], f: function (x, a, b) { return x < 1 ? a * x * x + 1 : b * x + 2; }, txt: function (a, b) { return fmt(a, 1) + "x² + 1 si x &lt; 1 · " + fmt(b, 1) + "x + 2 si x ≥ 1"; }, nota: "Continuidad: a + 1 = b + 2. Derivabilidad: 2a = b. Resolviendo: a = −1, b = −2." },
    { t: "|x| en x = 0", c: 0, par: [], v: [], rg: [-3, 3, -1, 3], f: function (x) { return Math.abs(x); }, txt: function () { return "|x|"; }, nota: "Punto angular: las pendientes laterales son −1 y 1. Continua pero <b>no derivable</b> en 0." },
    { t: "∛x en x = 0", c: 0, par: [], v: [], rg: [-3, 3, -2, 2], f: function (x) { return Math.cbrt(x); }, txt: function () { return "∛x"; }, nota: "Es continua y las secantes se hacen cada vez más verticales: <b>tangente vertical</b>, la derivada tiende a +∞. No es derivable en 0." },
    { t: "∛(x²) en x = 0", c: 0, par: [], v: [], rg: [-3, 3, -1, 3], f: function (x) { return Math.cbrt(x * x); }, txt: function () { return "∛(x²)"; }, nota: "<b>Cúspide</b>: las pendientes laterales tienden a −∞ y +∞. No derivable." },
    { t: "x·|x| en x = 0", c: 0, par: [], v: [], rg: [-2, 2, -4, 4], f: function (x) { return x * Math.abs(x); }, txt: function () { return "x·|x|"; }, nota: "Aquí las pendientes laterales coinciden (0 y 0): es <b>derivable</b> en 0 aunque lleve valor absoluto." }
  ];
  B.w.derivabilidad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Es derivable? Continuidad y derivadas laterales");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, a: 2, b: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sb;
    sa = U.slider(ctl, { et: "Parámetro <i>a</i>", min: -4, max: 4, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sb = U.slider(ctl, { et: "Parámetro <i>b</i>", min: -4, max: 4, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var P = PD[st.i], a = st.a, b = st.b, f = function (x) { return P.f(x, a, b); }, c = P.c, h = 1e-6;
      sa.el.style.display = sb.el.style.display = P.par.length ? "" : "none";
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      var fc = f(c), fl = f(c - h), fr = f(c + h), izq = (f(c - h) - f(c - 2 * h)) / h, der = (f(c + 2 * h) - f(c + h)) / h;
      g.curva(f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      var W = (P.rg[1] - P.rg[0]) * 0.35;
      if (isFinite(izq) && Math.abs(izq) < 1e3) g.segmento(c - W, fl - izq * W, c, fl, { clase: "c-ok", dash: "6 4" });
      if (isFinite(der) && Math.abs(der) < 1e3) g.segmento(c, fr, c + W, fr + der * W, { clase: "c-red", dash: "6 4" });
      pto(g, c, fc, "c-ink", false, 6);
      if (Math.abs(fl - fc) > 1e-4) pto(g, c, fl, "c-ok", true, 6);
      var cont = Math.abs(fl - fc) < 1e-4 && Math.abs(fr - fc) < 1e-4, mismo = cont && Math.abs(izq - der) < 1e-3 * Math.max(1, Math.abs(izq));
      var txtD = function (d) { return Math.abs(d) > 1e3 ? (d > 0 ? "+∞" : "−∞") : fmt(d, 4); };
      lectura.innerHTML = fil("Función", P.txt(a, b), "pen ancho") + fil("Valor por la izquierda · f(" + fmt(c, 0) + ") · por la derecha", fmt(fl, 4) + " · " + fmt(fc, 4) + " · " + fmt(fr, 4), "") +
        fil("¿Continua en x = " + fmt(c, 0) + "?", cont ? "sí" : "no (los tres valores no coinciden)", cont ? "ok" : "red") + fil("Pendiente del trozo izquierdo en x = " + fmt(c, 0), txtD(izq), "ok") + fil("Pendiente del trozo derecho en x = " + fmt(c, 0), txtD(der), "red") +
        fil("¿Derivable en x = " + fmt(c, 0) + "?", mismo ? "sí, f′(" + fmt(c, 0) + ") = " + fmt(izq, 3) : cont ? "no: es continua, pero las pendientes laterales son distintas" : "no: para ser derivable primero tiene que ser continua", mismo ? "ok ancho" : "red ancho");
      pie.innerHTML = P.nota + " Las rectas de trazos son las «tangentes laterales»: <b style='color:var(--ok)'>verde</b> la de la izquierda y <b style='color:var(--red)'>roja</b> la de la derecha; si coinciden, la función es derivable.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 3, ymin: -2, ymax: 5, w: 600, h: 330, etiqueta: "Derivabilidad" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PD.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; var P = PD[st.i]; if (P.par.length) { st.a = P.v[0]; st.b = P.v[1]; sa.set(st.a); sb.set(st.b); } pinta(); });
    pinta();
  };

  // ============================================================
  // LINEALIZACION: f(a + h) ≈ f(a) + f′(a)·h
  // ============================================================
  var PL = [
    { t: "√x en a = 4", f: Math.sqrt, a: 4, rg: [2, 6, 1, 3], ej: 0.1 },
    { t: "ln x en a = 1", f: Math.log, a: 1, rg: [0.2, 2, -1.7, 0.8], ej: 0.05 },
    { t: "sen x en a = 0", f: Math.sin, a: 0, rg: [-1.5, 1.5, -1.5, 1.5], ej: 0.3 },
    { t: "eˣ en a = 0", f: Math.exp, a: 0, rg: [-1.5, 1.5, -0.5, 4.5], ej: 0.1 },
    { t: "1/x en a = 1", f: function (x) { return 1 / x; }, a: 1, rg: [0.4, 2, -0.2, 3], ej: 0.1 },
    { t: "∛x en a = 8", f: Math.cbrt, a: 8, rg: [4, 12, 1, 3.4], ej: 0.5 }
  ];
  B.w.linealizacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Aproximación lineal: la tangente como calculadora");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, h: 0.1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sh;
    sh = U.slider(ctl, { et: "Desplazamiento <i>h</i>", min: -1, max: 1, step: 0.01, val: st.h, on: function (v) { st.h = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var P = PL[st.i], a = P.a, h = st.h, f = P.f, d = D.d1(f, a), L = function (x) { return f(a) + d * (x - a); }, x = a + h, ex = f(x), ap = L(x);
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      g.curva(f, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3); g.curva(L, { clase: "c-ok", dash: "6 4", n: 2 });
      pto(g, a, f(a), "c-ink", false, 5); etq(g, a, f(a), "a", "faint", 0, 16, "middle");
      g.segmento(x, ex, x, ap, { clase: "c-red" }).setAttribute("stroke-width", 4); pto(g, x, ex, "c-pen", false, 6); pto(g, x, ap, "c-ok", false, 6);
      var err = ex - ap;
      lectura.innerHTML = fil("Recta tangente en a", "L(x) = " + fmt(f(a), 4) + (d < 0 ? " − " : " + ") + fmt(Math.abs(d), 4) + "·(x − " + fmt(a, 2) + ")", "ok ancho") + fil("Valor exacto f(" + fmt(x, 3) + ")", fmt(ex, 6), "pen") + fil("Aproximación L(" + fmt(x, 3) + ")", fmt(ap, 6), "ok") +
        fil("Error", fmt(err, 6) + "  (" + fmt(Math.abs(ex) > 1e-12 ? Math.abs(err / ex) * 100 : 0, 3) + " %)", "red");
      pie.innerHTML = "Cerca del punto de tangencia, la gráfica y la tangente casi coinciden: <b>f(a + h) ≈ f(a) + f′(a)·h</b>. El error (segmento rojo) crece rápido al alejarte: pasa de pequeño a grande de forma cuadrática en h. Es el principio con el que las calculadoras y los ordenadores aproximan funciones.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 2, xmax: 6, ymin: 1, ymax: 3, w: 600, h: 320, etiqueta: "Función y tangente" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PL.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.h = PL[st.i].ej; sh.set(st.h); pinta(); });
    pinta();
  };

  // ============================================================
  // VALORMEDIO: la tangente paralela a la secante
  // ============================================================
  var PV = [
    { t: "x²", f: function (x) { return x * x; }, a: 0, b: 2, rg: [-0.5, 2.5, -0.5, 4.5] },
    { t: "x³ − 3x", f: function (x) { return x * x * x - 3 * x; }, a: -2, b: 2, rg: [-2.5, 2.5, -3.5, 3.5] },
    { t: "sen x", f: Math.sin, a: 0, b: 3, rg: [-0.5, 3.5, -0.5, 1.5] },
    { t: "√x", f: Math.sqrt, a: 0, b: 4, rg: [-0.5, 4.5, -0.5, 2.5] },
    { t: "eˣ", f: Math.exp, a: 0, b: 2, rg: [-0.5, 2.5, -0.5, 8] },
    { t: "|x| (no derivable en 0)", f: Math.abs, a: -1, b: 2, rg: [-1.5, 2.5, -0.5, 2.5] }
  ];
  B.w.valormedio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Teorema del valor medio: ¿dónde es la tangente paralela a la secante?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, a: 0, b: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sb;
    sa = U.slider(ctl, { et: "Extremo <i>a</i>", min: -2.5, max: 4, step: 0.1, val: st.a, on: function (v) { st.a = Math.min(v, st.b - 0.2); pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sb = U.slider(ctl, { et: "Extremo <i>b</i>", min: -2.5, max: 4, step: 0.1, val: st.b, on: function (v) { st.b = Math.max(v, st.a + 0.2); pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var P = PV[st.i], a = st.a, b = st.b, f = P.f; g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      var fa = f(a), fb = f(b);
      if (isNaN(fa) || isNaN(fb)) { lectura.innerHTML = fil("Intervalo", "f no está definida en un extremo", "red"); return; }
      var m = (fb - fa) / (b - a), cs = D.cambios(function (x) { return D.d1(f, x) - m; }, a + 1e-6, b - 1e-6, 800).map(function (e) { return e.x; });
      g.curva(f, { clase: "c-pen", n: 600 }).setAttribute("stroke-width", 3);
      g.segmento(a, fa, b, fb, { clase: "c-red" }).setAttribute("stroke-width", 3); pto(g, a, fa, "c-red", false, 6); pto(g, b, fb, "c-red", false, 6);
      var W = (b - a) * 0.45;
      cs.forEach(function (c) { var fc = f(c); g.segmento(c - W, fc - m * W, c + W, fc + m * W, { clase: "c-ok", dash: "6 4" }); pto(g, c, fc, "c-ok", false, 6); });
      lectura.innerHTML = fil("Pendiente de la secante (TVM)", "(" + fmt(fb, 4) + " − " + fmt(fa, 4) + ")/(" + fmt(b, 2) + " − " + fmt(a, 2) + ") = " + fmt(m, 4), "red ancho") +
        fil("Puntos c con f′(c) = TVM", cs.length ? cs.map(function (c) { return "c = " + fmt(c, 4); }).join(" · ") : "ninguno: f no es derivable en todo (a, b)", cs.length ? "ok ancho" : "red ancho");
      pie.innerHTML = "<b>Teorema del valor medio</b>: si f es continua en [a, b] y derivable en (a, b), existe al menos un c ∈ (a, b) con <b>f′(c) = (f(b) − f(a))/(b − a)</b>: en algún punto la pendiente instantánea es igual a la pendiente media. Con |x| y un intervalo que contiene al 0, la hipótesis falla (no es derivable en 0) y puede no haber tal c.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -0.5, xmax: 2.5, ymin: -0.5, ymax: 4.5, w: 600, h: 320, etiqueta: "Secante y tangentes paralelas" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PV.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; var P = PV[st.i]; st.a = P.a; st.b = P.b; sa.set(P.a); sb.set(P.b); pinta(); });
    pinta();
  };

  // ============================================================
  // OPTIMIZAR2: problemas de máximos y mínimos con la función objetivo dibujada
  // ============================================================
  var PO = [
    { t: "Corral junto a un río", x: "x (m, lado perpendicular al río)", dom: [0.5, 49.5], f: function (x) { return x * (100 - 2 * x); }, tipo: "máximo", u: "m²", obj: "A(x) = x(100 − 2x)", enun: "Con 100 m de valla se cerca un corral rectangular apoyado en un río (el lado del río no lleva valla). ¿Qué lado x da el área máxima?", sol: "A′(x) = 100 − 4x = 0 → x = 25 m; el lado paralelo al río mide 100 − 50 = 50 m y A = 1 250 m².", x0: 10 },
    { t: "Caja abierta", x: "x (cm, lado del cuadrado que se recorta)", dom: [0.2, 14.8], f: function (x) { return x * (30 - 2 * x) * (30 - 2 * x); }, tipo: "máximo", u: "cm³", obj: "V(x) = x(30 − 2x)²", enun: "De una cartulina cuadrada de 30 cm de lado se recortan cuatro cuadrados de lado x en las esquinas y se dobla para hacer una caja sin tapa. ¿Qué x da el volumen máximo?", sol: "V′(x) = (30 − 2x)² − 4x(30 − 2x) = (30 − 2x)(30 − 6x) = 0 → x = 5 cm (x = 15 anula el volumen); V = 5·20·20 = 2 000 cm³.", x0: 2 },
    { t: "Lata de 1 litro", x: "r (cm, radio de la base)", dom: [1.5, 12], f: function (r) { return 2 * Math.PI * r * r + 2000 / r; }, tipo: "mínimo", u: "cm²", obj: "S(r) = 2πr² + 2000/r", enun: "Una lata cilíndrica debe tener 1 litro (1 000 cm³) de capacidad. ¿Qué radio minimiza la chapa empleada (superficie total)?", sol: "S′(r) = 4πr − 2000/r² = 0 → r³ = 500/π → r = 5,42 cm; h = 1000/(πr²) = 10,84 cm = 2r. S = 553,6 cm².", x0: 3 },
    { t: "Punto de la parábola más cercano", x: "x (abscisa del punto (x, x²))", dom: [-2.5, 2.5], f: function (x) { return Math.sqrt(x * x + (x * x - 2) * (x * x - 2)); }, tipo: "mínimo", u: "u", obj: "d(x) = √(x² + (x² − 2)²)", enun: "¿Qué punto de la parábola y = x² está más cerca del punto (0, 2)? (Se minimiza la distancia d; basta con minimizar d².)", sol: "d² = x⁴ − 3x² + 4; (d²)′ = 4x³ − 6x = 2x(2x² − 3) = 0 → x = ±√(3/2) = ±1,2247 (x = 0 es un máximo relativo). d = √(7/4) = 1,3229.", x0: 0.3 },
    { t: "Beneficio de una tienda", x: "p (€, precio)", dom: [10.5, 49.5], f: function (p) { return (p - 10) * (200 - 4 * p); }, tipo: "máximo", u: "€", obj: "B(p) = (p − 10)(200 − 4p)", enun: "Un artículo cuesta 10 € fabricarlo y, vendido a p €, se venden 200 − 4p unidades. ¿Qué precio maximiza el beneficio?", sol: "B′(p) = 200 − 4p − 4(p − 10) = 240 − 8p = 0 → p = 30 €; B = 20·80 = 1 600 €.", x0: 20 }
  ];
  B.w.optimizar2 = function (host) {
    var cuerpo = B.caja(host, "Problema", "Máximos y mínimos: busca el óptimo y compruébalo con la derivada");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><p class="w-intro oz-enun"></p><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="ctl oz-acc"></div><p class="w-pie oz-sol"></p>';
    var st = { i: 0, x: 10, ver: false }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".oz-sol"), enun = cuerpo.querySelector(".oz-enun"), sl;
    function configura() { var P = PO[st.i]; sl.input.min = P.dom[0]; sl.input.max = P.dom[1]; sl.input.step = (P.dom[1] - P.dom[0]) / 400; st.x = P.x0; sl.set(P.x0); st.ver = false; }
    sl = U.slider(ctl, { et: "Valor de <i>x</i>", min: 0, max: 50, step: 0.1, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    U.boton(cuerpo.querySelector(".oz-acc"), "Mostrar / ocultar el óptimo con la derivada", function () { st.ver = !st.ver; pinta(); }, "btn-comprobar");
    function pinta() {
      var P = PO[st.i], f = P.f, x = st.x; enun.innerHTML = "<b>" + P.t + ".</b> " + P.enun;
      var y = F.rangoY(f, P.dom[0], P.dom[1]); g.rango(P.dom[0], P.dom[1], Math.min(y[0], 0), y[1]); g.limpiar();
      g.curva(f, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
      var d = D.d1(f, x), crit = D.cambios(function (t) { return D.d1(f, t); }, P.dom[0], P.dom[1], 1200);
      if (st.ver) crit.forEach(function (c) { if ((c.de > 0) === (P.tipo === "máximo")) { g.segmento(c.x, 0, c.x, f(c.x), { clase: "c-ok", dash: "4 4" }); pto(g, c.x, f(c.x), "c-ok", false, 7); } });
      g.segmento(x, 0, x, f(x), { clase: "c-faint", dash: "3 4" }); pto(g, x, f(x), "c-red", false, 6);
      var W = (P.dom[1] - P.dom[0]) * 0.12; g.segmento(x - W, f(x) - d * W, x + W, f(x) + d * W, { clase: "c-red", dash: "5 4" });
      var opt = crit.filter(function (c) { return (c.de > 0) === (P.tipo === "máximo"); })[0];
      lectura.innerHTML = fil("Función objetivo", P.obj, "pen ancho") + fil("Tu valor", "x = " + fmt(x, 3) + " → " + fmt(f(x), 3) + " " + P.u, "red") + fil("f′(x) en tu valor", fmt(d, 3) + (d > 0 ? "  (sube: aún se puede mejorar hacia la derecha)" : d < 0 ? "  (baja: se mejora hacia la izquierda)" : "  (¡tangente horizontal!)"), "") +
        (st.ver && opt ? fil("Óptimo (" + P.tipo + ")", "x = " + fmt(opt.x, 4) + " → " + fmt(f(opt.x), 3) + " " + P.u, "ok ancho") : "");
      pie.innerHTML = st.ver ? "<b>Resolución:</b> " + P.sol : "Mueve x y observa cómo cambia la función objetivo y su pendiente (recta roja de trazos). En el óptimo la tangente es <b>horizontal</b>: f′(x) = 0. Pulsa el botón para ver la solución con la derivada.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 50, ymin: 0, ymax: 1300, w: 600, h: 320, etx: "x", ety: "", etiqueta: "Función objetivo" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PO.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; configura(); pinta(); });
    configura(); pinta();
  };

  // ============================================================
  // CINEMATICA: s, v = s′, a = s″ en una situación real
  // ============================================================
  var PC = [
    { t: "Un coche", s: function (t) { return t * t * t - 6 * t * t + 9 * t; }, T: 5, u: ["m", "m/s", "m/s²"], nota: "Posición cúbica: s = t³ − 6t² + 9t. La velocidad v = s′ = 3t² − 12t + 9 = 3(t − 1)(t − 3) se anula en t = 1 y t = 3 (el coche se detiene y da marcha atrás entre esos instantes); a = s″ = 6t − 12 se anula en t = 2." },
    { t: "Pelota lanzada hacia arriba", s: function (t) { return 20 * t - 5 * t * t; }, T: 4, u: ["m", "m/s", "m/s²"], nota: "h = 20t − 5t². La velocidad v = 20 − 10t se anula en t = 2 (altura máxima) y la aceleración es constante, a = −10 m/s² (la gravedad)." },
    { t: "Crecimiento de bacterias", s: function (t) { return 100 * Math.exp(0.3 * t); }, T: 8, u: ["bacterias", "bacterias/h", "bacterias/h²"], nota: "N = 100·e^(0,3t). La velocidad de crecimiento N′ = 0,3·N es <b>proporcional a la población</b>: por eso crece cada vez más deprisa." },
    { t: "Depósito que se vacía", s: function (t) { return Math.pow(10 - t, 2); }, T: 10, u: ["litros", "L/min", "L/min²"], nota: "V = (10 − t)². V′ = −2(10 − t) &lt; 0: el volumen baja, y lo hace cada vez más despacio (V″ = 2 &gt; 0)." }
  ];
  B.w.cinematica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La derivada como velocidad y la segunda derivada como aceleración");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot cn-s"></div><div class="w-plot cn-v"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, t: 1.5 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    sl = U.slider(ctl, { et: "Instante <i>t</i>", min: 0, max: 5, step: 0.05, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var P = PC[st.i], t = st.t, s = P.s, v = function (x) { return D.d1(s, x); }, a = function (x) { return D.d2(s, x); };
      sl.input.max = P.T; var ys = F.rangoY(s, 0, P.T), yv = F.rangoY(function (x) { return v(x); }, 0, P.T), ya = F.rangoY(function (x) { return a(x); }, 0, P.T);
      g1.rango(0, P.T, ys[0], ys[1]); g1.limpiar(); var lo = Math.min(yv[0], ya[0]), hi = Math.max(yv[1], ya[1]); g2.rango(0, P.T, lo, hi); g2.limpiar();
      g1.curva(s, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3); g2.curva(v, { clase: "c-red", n: 400 }).setAttribute("stroke-width", 3); g2.curva(a, { clase: "c-ok", n: 400 }).setAttribute("stroke-width", 3);
      var vt = v(t), at = a(t), W = P.T * 0.15;
      g1.segmento(t - W, s(t) - vt * W, t + W, s(t) + vt * W, { clase: "c-red", dash: "5 4" }); pto(g1, t, s(t), "c-pen", false, 6);
      pto(g2, t, vt, "c-red", false, 6); pto(g2, t, at, "c-ok", false, 6); g2.segmento(t, lo, t, hi, { clase: "c-faint", dash: "3 4" });
      var movim = Math.abs(vt) < 1e-3 ? "instantáneamente parado" : vt > 0 ? "aumenta (v &gt; 0)" : "disminuye (v &lt; 0)", ritmo = Math.abs(at) < 1e-3 ? "ritmo constante" : (vt * at > 0 ? "cada vez más deprisa (v y a del mismo signo)" : "cada vez más despacio (v y a de signo contrario)");
      lectura.innerHTML = fil("Valor s(" + fmt(t, 2) + ")", fmt(s(t), 3) + " " + P.u[0], "pen") + fil("Velocidad v = s′(" + fmt(t, 2) + ")", fmt(vt, 3) + " " + P.u[1], "red") + fil("Aceleración a = s″(" + fmt(t, 2) + ")", fmt(at, 3) + " " + P.u[2], "ok") +
        fil("Qué pasa ahora", "s " + movim + "; " + ritmo, "ancho");
      pie.innerHTML = P.nota + " La recta roja de trazos es la tangente: su pendiente es la velocidad.";
    }
    g1 = new B.Plot(cuerpo.querySelector(".cn-s"), { xmin: 0, xmax: 5, ymin: -2, ymax: 10, w: 620, h: 210, etx: "t", ety: "", etiqueta: "Posición" });
    g2 = new B.Plot(cuerpo.querySelector(".cn-v"), { xmin: 0, xmax: 5, ymin: -5, ymax: 10, w: 620, h: 210, etx: "t", ety: "", etiqueta: "Velocidad (rojo) y aceleración (verde)" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PC.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.t = Math.min(st.t, PC[st.i].T); pinta(); });
    pinta();
  };
})(window);
