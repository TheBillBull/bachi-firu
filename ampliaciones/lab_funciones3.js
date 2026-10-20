/* ============================================================
   Bachi para Firu · laboratorio de funciones III (Matemáticas I, tema 9)
   expolog · modelo · inversa · compuesta · interseccion · hiperbola · ondas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var INF = Infinity, fil = F.fil, pto = F.pto, etq = F.etq, num = F.num, campo = F.campo;
  var R = Math.PI / 180;

  // ============================================================
  // EXPOLOG: aˣ y logₐ x son inversas (simétricas respecto a y = x)
  // ============================================================
  B.w.expolog = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Exponencial y logaritmo: dos funciones inversas");
    cuerpo.innerHTML = '<div data-base class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var BAS = { "0.5": 0.5, "1.5": 1.5, "2": 2, e: Math.E, "3": 3, "10": 10 }, TXT = { "0.5": "½", "1.5": "1,5", "2": "2", e: "e", "3": "3", "10": "10" };
    var st = { b: "2", t: 1.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Exponente <i>t</i> (punto P)", min: -3, max: 3, step: 0.25, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var a = BAS[st.b], t = st.t, nm = TXT[st.b]; g.limpiar();
      var fe = function (x) { return Math.pow(a, x); }, fl = function (x) { return Math.log(x) / Math.log(a); };
      g.segmento(-9, -9, 9, 9, { clase: "c-faint", dash: "6 5" }); etq(g, 4.3, 4.3, "y = x", "faint", 8, 14);
      g.horizontal(0, { clase: "c-ok", dash: "2 5" }); g.vertical(0, { clase: "c-ok", dash: "2 5" });
      g.curva(fe, { clase: "c-pen", n: 600 }).setAttribute("stroke-width", 3); g.curva(fl, { clase: "c-red", n: 600 }).setAttribute("stroke-width", 3);
      pto(g, 0, 1, "c-pen", false, 4); pto(g, 1, a, "c-pen", false, 4); pto(g, 1, 0, "c-red", false, 4); pto(g, a, 1, "c-red", false, 4);
      var y = fe(t);
      g.segmento(t, y, y, t, { clase: "c-ink", dash: "3 4" });
      pto(g, t, y, "c-pen", false, 7); etq(g, t, y, "P", "pen", -10, -10, "end");
      pto(g, y, t, "c-red", false, 7); etq(g, y, t, "P′", "red", 10, 16);
      lectura.innerHTML = fil("Exponencial", "f(x) = " + nm + "ˣ  ·  Dom = ℝ  ·  Im = (0, +∞)", "pen") + fil("Logaritmo", "g(x) = log<sub>" + nm + "</sub> x  ·  Dom = (0, +∞)  ·  Im = ℝ", "red") +
        fil("Punto P sobre la exponencial", "P = (" + fmt(t, 2) + ", " + fmt(y, 3) + ")  porque  " + nm + "<sup>" + fmt(t, 2) + "</sup> = " + fmt(y, 3), "pen") +
        fil("Su simétrico P′ sobre el logaritmo", "P′ = (" + fmt(y, 3) + ", " + fmt(t, 2) + ")  porque  log<sub>" + nm + "</sub>(" + fmt(y, 3) + ") = " + fmt(t, 2), "red") +
        fil("Crecimiento", a > 1 ? "las dos son crecientes (base " + nm + " &gt; 1)" : "las dos son decrecientes (base " + nm + " &lt; 1)") + fil("Puntos fijos", "(0, 1) y (1, " + nm + ") en la exponencial · (1, 0) y (" + nm + ", 1) en el logaritmo");
      pie.innerHTML = "Cada punto (x, y) de la exponencial se convierte en (y, x) en el logaritmo: la gráfica de una es el <b>reflejo respecto a la recta y = x</b> de la otra. Por eso la asíntota horizontal y = 0 de la exponencial se vuelve la vertical x = 0 del logaritmo.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 560, h: 380, etiqueta: "Exponencial y logaritmo" });
    g.rangoIso(1, 1, 5.5);
    U.fichas(cuerpo.querySelector("[data-base]"), Object.keys(BAS).map(function (k) { return { k: k, t: "base " + TXT[k] }; }), "2", function (k) { st.b = k; pinta(); });
    pinta();
  };

  // ============================================================
  // MODELO: crecimiento y decrecimiento exponencial C·(1 + r)^t
  // ============================================================
  B.w.modelo = function (host) {
    var cuerpo = B.caja(host, "Problema", "Modelo exponencial: ¿cuánto tarda en llegar?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var PRE = [
      { t: "Población", c0: 1200, r: 3, f: 2, u: "años", mag: "habitantes", nota: "Una ciudad crece un 3 % cada año." },
      { t: "Ahorro", c0: 5000, r: 2.5, f: 1.6, u: "años", mag: "€", nota: "Un depósito con interés compuesto anual del 2,5 %." },
      { t: "Medicamento", c0: 200, r: -15, f: 0.25, u: "horas", mag: "mg", nota: "El organismo elimina el 15 % del fármaco cada hora." },
      { t: "Desintegración", c0: 100, r: -13, f: 0.5, u: "años", mag: "g", nota: "Un isótopo pierde el 13 % de su masa cada año (semivida ≈ 5 años)." },
      { t: "Depreciación", c0: 20000, r: -12, f: 0.5, u: "años", mag: "€", nota: "Un coche pierde el 12 % de su valor cada año." }
    ];
    var st = { i: 0, c0: 1200, r: 3, f: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sc = U.slider(ctl, { et: "Valor inicial <i>C</i>₀", min: 100, max: 20000, step: 100, val: st.c0, on: function (v) { st.c0 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var sr = U.slider(ctl, { et: "Variación por periodo <i>r</i> (%)", min: -20, max: 20, step: 0.5, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " %"; } });
    var sf = U.slider(ctl, { et: "Objetivo (× <i>C</i>₀)", min: 0.1, max: 4, step: 0.05, val: st.f, on: function (v) { st.f = v; pinta(); }, fmt: function (v) { return "× " + fmt(v, 2); } });
    function pinta() {
      var P = PRE[st.i], c0 = st.c0, r = st.r / 100, base = 1 + r, f = st.f, meta = c0 * f;
      g.limpiar();
      if (Math.abs(r) < 1e-9) { lectura.innerHTML = fil("r = 0", "no hay variación: el valor se queda en " + fmt(c0, 0), "red"); g.rango(0, 10, 0, c0 * 1.3); g.horizontal(c0, { clase: "c-pen" }); return; }
      var tstar = Math.log(f) / Math.log(base), T2 = Math.abs(Math.log(2) / Math.log(base)), alcanzable = tstar >= 0;
      var T = alcanzable ? 1.4 * tstar : 3 * T2; T = !isFinite(T) ? 10 : Math.max(5, Math.min(120, T));
      var fn = function (t) { return c0 * Math.pow(base, t); }, top = Math.max(c0 * 1.2, fn(T) * 1.05, meta * 1.15);
      g.rango(0, T, 0, top); g.limpiar();
      g.horizontal(meta, { clase: "c-ok", dash: "6 5" });
      g.curva(fn, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3);
      if (alcanzable && tstar <= T) { g.segmento(tstar, 0, tstar, meta, { clase: "c-red", dash: "4 4" }); pto(g, tstar, meta, "c-red", false, 7); etq(g, tstar, 0, "t = " + fmt(tstar, 2), "red", 0, -8, "middle"); }
      pto(g, 0, c0, "c-pen", false, 5);
      var dob = r > 0 ? "Tiempo de duplicación" : "Semivida (se reduce a la mitad)";
      lectura.innerHTML = fil("Contexto", P.nota) + fil("Modelo", "C(t) = " + fmt(c0, 0) + " · " + fmt(base, 4) + "<sup>t</sup>  (t en " + P.u + ")", "pen") +
        fil("Objetivo", fmt(meta, 1) + " " + P.mag + "  (× " + fmt(f, 2) + ")", "ok") +
        fil("Se alcanza en", !alcanzable ? "nunca hacia delante: con esa variación el valor " + (r > 0 ? "sólo crece" : "sólo decrece") + " (ya lo superó en el pasado)" : "t = ln " + fmt(f, 2) + " / ln " + fmt(base, 4) + " = " + fmt(tstar, 3) + " " + P.u, "red") +
        fil(dob, fmt(T2, 2) + " " + P.u + "  (t = ln 2 / |ln " + fmt(base, 4) + "|)") + fil("Tras 10 " + P.u, fmt(fn(10), 1) + " " + P.mag);
      pie.innerHTML = "Para hallar <b>cuándo</b> se alcanza un valor hay que despejar el exponente: C₀·(1 + r)<sup>t</sup> = meta → (1 + r)<sup>t</sup> = meta/C₀ → <b>t = ln(meta/C₀) / ln(1 + r)</b>. Ahí es donde el logaritmo «deshace» la exponencial.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 0, ymax: 3000, w: 600, h: 330, etx: "t", ety: "C", etiqueta: "Crecimiento exponencial" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var P = PRE[+k]; st.i = +k; st.c0 = P.c0; st.r = P.r; st.f = P.f; sc.set(P.c0); sr.set(P.r); sf.set(P.f); pinta(); });
    pinta();
  };

  // ============================================================
  // INVERSA: f y f⁻¹ son simétricas respecto a y = x
  // ============================================================
  var INV = {
    lin: { t: "2x + 3", f: function (x) { return 2 * x + 3; }, fi: function (x) { return (x - 3) / 2; }, tf: "f(x) = 2x + 3", ti: "f⁻¹(x) = (x − 3)/2", dom: "ℝ", rec: "ℝ", pasos: ["Escribe y = 2x + 3.", "Intercambia x e y: x = 2y + 3.", "Despeja y: y = (x − 3)/2."], inj: true },
    cub: { t: "x³", f: function (x) { return x * x * x; }, fi: Math.cbrt, tf: "f(x) = x³", ti: "f⁻¹(x) = ∛x", dom: "ℝ", rec: "ℝ", pasos: ["y = x³.", "Intercambia: x = y³.", "Despeja: y = ∛x."], inj: true },
    exp: { t: "eˣ", f: Math.exp, fi: Math.log, tf: "f(x) = eˣ", ti: "f⁻¹(x) = ln x", dom: "ℝ", rec: "(0, +∞)", pasos: ["y = eˣ.", "Intercambia: x = eʸ.", "Despeja con el logaritmo: y = ln x."], inj: true },
    cuad: { t: "x² (x ≥ 0)", f: function (x) { return x >= 0 ? x * x : NaN; }, fi: Math.sqrt, tf: "f(x) = x²  con x ≥ 0", ti: "f⁻¹(x) = √x", dom: "[0, +∞)", rec: "[0, +∞)", pasos: ["y = x²  (sólo para x ≥ 0).", "Intercambia: x = y².", "Despeja: y = √x (raíz positiva, porque y ≥ 0)."], inj: true },
    cuad2: { t: "x² (todo ℝ)", f: function (x) { return x * x; }, fi: null, tf: "f(x) = x²  con x ∈ ℝ", ti: "no tiene inversa en ℝ", dom: "ℝ", rec: "[0, +∞)", pasos: ["y = x² con x ∈ ℝ.", "Intercambia y despeja: y = ±√x … ¡dos valores para cada x!", "No es función: x² NO es inyectiva (f(2) = f(−2) = 4). Para invertirla hay que restringir el dominio a x ≥ 0 o a x ≤ 0."], inj: false },
    hom: { t: "(x + 1)/(x − 1)", f: function (x) { return (x + 1) / (x - 1); }, fi: function (x) { return (x + 1) / (x - 1); }, tf: "f(x) = (x + 1)/(x − 1)", ti: "f⁻¹(x) = (x + 1)/(x − 1)  (¡la misma!)", dom: "ℝ − {1}", rec: "ℝ − {1}", pasos: ["y = (x + 1)/(x − 1).", "Intercambia: x = (y + 1)/(y − 1).", "Quita denominador: xy − x = y + 1 → xy − y = x + 1 → y(x − 1) = x + 1.", "Despeja: y = (x + 1)/(x − 1). Es su propia inversa (una «involución»)."], inj: true },
    raiz: { t: "√(x − 1)", f: function (x) { return Math.sqrt(x - 1); }, fi: function (x) { return x >= 0 ? x * x + 1 : NaN; }, tf: "f(x) = √(x − 1)", ti: "f⁻¹(x) = x² + 1  con x ≥ 0", dom: "[1, +∞)", rec: "[0, +∞)", pasos: ["y = √(x − 1).", "Intercambia: x = √(y − 1).", "Eleva al cuadrado: x² = y − 1.", "Despeja: y = x² + 1, pero sólo con x ≥ 0 (porque la raíz nunca es negativa)."], inj: true }
  };
  B.w.inversa = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Función inversa: el reflejo respecto a y = x");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "lin", t: 1, c: 3, rec: false }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Punto P (valor de <i>x</i>)", min: -4, max: 4, step: 0.25, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    U.slider(ctl, { et: "Recta horizontal y = c", min: -4, max: 6, step: 0.25, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function cortes(f, c) { var n = 0, prev = null; for (var i = 0; i <= 1600; i++) { var x = -8 + 16 * i / 1600, v = f(x) - c; if (!isNaN(v) && prev !== null && !isNaN(prev) && prev * v < 0 && Math.abs(v) < 30 && Math.abs(prev) < 30) n++; if (!isNaN(v) && v === 0) n++; prev = v; } return n; }
    function pinta() {
      var I = INV[st.k], t = st.t; g.limpiar();
      g.segmento(-12, -12, 12, 12, { clase: "c-faint", dash: "6 5" }); etq(g, 4.6, 4.6, "y = x", "faint", 6, 16);
      g.curva(I.f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      if (I.fi) g.curva(I.fi, { clase: "c-red", n: 700 }).setAttribute("stroke-width", 3);
      if (st.k === "hom") { g.vertical(1, { clase: "c-faint", dash: "2 5" }); g.horizontal(1, { clase: "c-faint", dash: "2 5" }); }
      var y = I.f(t), txt;
      if (isFinite(y)) {
        pto(g, t, y, "c-pen", false, 7); etq(g, t, y, "P", "pen", -10, -10, "end");
        if (I.fi) { g.segmento(t, y, y, t, { clase: "c-ink", dash: "3 4" }); pto(g, y, t, "c-red", false, 7); etq(g, y, t, "P′", "red", 10, 16); }
        txt = "f(" + fmt(t, 2) + ") = " + fmt(y, 3) + (I.fi ? "  →  f⁻¹(" + fmt(y, 3) + ") = " + fmt(I.fi(y), 3) : "");
      } else txt = "f no está definida en x = " + fmt(t, 2);
      var c = st.c; g.horizontal(c, { clase: "c-ok", dash: "5 4" });
      var n = cortes(I.f, c);
      lectura.innerHTML = fil("Función", I.tf, "pen") + fil("Inversa", I.ti, "red") + fil("Dominio · recorrido de f", I.dom + "  ·  " + I.rec) +
        fil("Punto P y su simétrico", txt) + fil("Prueba de la recta horizontal y = " + fmt(c, 2), "corta a f en " + n + (n === 1 ? " punto" : " puntos") + (n > 1 ? " → una misma y viene de varias x: NO es inyectiva en este rango" : n === 1 ? " → de momento, 1 x por cada y" : " → ese valor no es imagen de ningún x"), "ok") +
        fil("Cómo se calcula", "<ol class='lec-ol'>" + I.pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol>");
      pie.innerHTML = "<b>Inversa</b> = deshacer la función: si f(a) = b entonces f⁻¹(b) = a, y las gráficas son <b>simétricas respecto a y = x</b>. Sólo tienen inversa las funciones <b>inyectivas</b> (cada y sale de un único x): la recta horizontal de la gráfica nunca debe cortar a f más de una vez. Dominio y recorrido <b>se intercambian</b>.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 560, h: 380, etiqueta: "Función e inversa" });
    g.rangoIso(0.5, 0.5, 5.5);
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(INV).map(function (k) { return { k: k, t: INV[k].t }; }), "lin", function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // COMPUESTA: f∘g y g∘f
  // ============================================================
  var COMP = {
    a: { t: "x² y x + 1", f: "x^2", g: "x+1", tf: "f(x) = x²", tg: "g(x) = x + 1", fg: "(x + 1)²", gf: "x² + 1" },
    b: { t: "√x y x − 4", f: "sqrt(x)", g: "x-4", tf: "f(x) = √x", tg: "g(x) = x − 4", fg: "√(x − 4)", gf: "√x − 4" },
    c: { t: "1/x y x² − 1", f: "1/x", g: "x^2-1", tf: "f(x) = 1/x", tg: "g(x) = x² − 1", fg: "1/(x² − 1)", gf: "1/x² − 1" },
    d: { t: "ln x y x²", f: "ln(x)", g: "x^2", tf: "f(x) = ln x", tg: "g(x) = x²", fg: "ln(x²)", gf: "(ln x)²" },
    e: { t: "2x + 1 y (x − 1)/2", f: "2x+1", g: "(x-1)/2", tf: "f(x) = 2x + 1", tg: "g(x) = (x − 1)/2", fg: "x", gf: "x" },
    s: { t: "sen x y 2x", f: "sen(x)", g: "2x", tf: "f(x) = sen x", tg: "g(x) = 2x", fg: "sen(2x)", gf: "2·sen x" }
  };
  B.w.compuesta = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Composición de funciones: f∘g no es lo mismo que g∘f");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "a", x: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Valor de <i>x</i>", min: -5, max: 5, step: 0.25, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var C = COMP[st.k], f = F.leer(C.f).g, gg = F.leer(C.g).g, fg = function (x) { return f(gg(x)); }, gf = function (x) { return gg(f(x)); }, x = st.x;
      var y = F.rangoY(fg, -6, 6), z = F.rangoY(gf, -6, 6), lo = Math.min(y[0], z[0], -2), hi = Math.max(y[1], z[1], 2);
      g.rango(-6, 6, Math.max(lo, -12), Math.min(hi, 12)); g.limpiar();
      g.curva(f, { clase: "c-faint", dash: "3 5", n: 500 }); g.curva(gg, { clase: "c-faint", dash: "7 4", n: 500 });
      g.curva(fg, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3); g.curva(gf, { clase: "c-red", n: 700 }).setAttribute("stroke-width", 3);
      var v1 = fg(x), v2 = gf(x);
      if (isFinite(v1)) pto(g, x, v1, "c-pen", false, 6); if (isFinite(v2)) pto(g, x, v2, "c-red", false, 6);
      var D1 = F.txtIntervalos(F.dominio(fg, -60, 60)), D2 = F.txtIntervalos(F.dominio(gf, -60, 60));
      function cad(a, b, c) { return isFinite(b) && isFinite(c) ? fmt(a, 2) + " → " + fmt(b, 3) + " → " + fmt(c, 3) : "no se puede (algún paso queda fuera del dominio)"; }
      lectura.innerHTML = fil("Funciones", C.tf + "  ·  " + C.tg, "") +
        fil("(f∘g)(x) = f(g(x))", C.fg + "  ·  Dom = " + D1, "pen") + fil("(g∘f)(x) = g(f(x))", C.gf + "  ·  Dom = " + D2, "red") +
        fil("Cadena de f∘g en x = " + fmt(x, 2), "x → g(x) → f(g(x)):  " + cad(x, gg(x), v1), "pen") + fil("Cadena de g∘f en x = " + fmt(x, 2), "x → f(x) → g(f(x)):  " + cad(x, f(x), v2), "red");
      pie.innerHTML = "En <b>f∘g</b> se aplica primero <b>g</b> y después f (se lee de derecha a izquierda). Las dos composiciones suelen dar funciones distintas, con dominios distintos. Las curvas grises discontinuas son f y g. Cuando f∘g = g∘f = x, las funciones son <b>inversas</b> una de otra.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -6, ymax: 6, w: 600, h: 340, etiqueta: "Composiciones" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(COMP).map(function (k) { return { k: k, t: COMP[k].t }; }), "a", function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // INTERSECCION: f(x) = g(x), f(x) > g(x), f(x) < g(x) por vía gráfica
  // ============================================================
  B.w.interseccion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ecuaciones e inecuaciones leídas en la gráfica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-modo class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var PRE = [["x^2", "x+2"], ["x^2-4", "0"], ["e^x", "x+2"], ["sqrt(x)", "x/2"], ["1/x", "x"], ["abs(x)", "2"], ["x^3-3x", "1"]];
    var st = { f: PRE[0][0], g: PRE[0][1], m: "=" }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iF = campo(ctl, "f(x) =", st.f, 170), iG = campo(ctl, "g(x) =", st.g, 170);
    function pinta() {
      var rf = F.leer(st.f), rg = F.leer(st.g); g.limpiar();
      if (!rf.ok || !rg.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", (rf.ok ? rg.error : rf.error), "red"); return; }
      var f = rf.g, gg = rg.g, h = function (x) { var a = f(x), b = gg(x); return isNaN(a) || isNaN(b) ? NaN : a - b; }, X = 8;
      var y = F.rangoY(function (x) { var a = f(x); return isNaN(a) ? gg(x) : a; }, -X, X), y2 = F.rangoY(gg, -X, X), lo = Math.min(y[0], y2[0]), hi = Math.max(y[1], y2[1]);
      g.rango(-X, X, lo, hi); g.limpiar();
      var D = F.dominio(h, -60, 60), rs = F.raices(h, -60, 60);
      // partición del dominio en trozos con signo constante
      var sol = [];
      D.forEach(function (I) {
        var cortes = [I.lo].concat(rs.filter(function (r) { return r > I.lo && r < I.hi; })).concat([I.hi]);
        for (var k = 0; k < cortes.length - 1; k++) {
          var a = cortes[k], b = cortes[k + 1], mid = isFinite(a) && isFinite(b) ? (a + b) / 2 : isFinite(a) ? a + 1 : isFinite(b) ? b - 1 : 0, s = h(mid);
          if (isNaN(s)) continue;
          if ((st.m === ">" && s > 0) || (st.m === "<" && s < 0)) sol.push({ lo: a, hi: b, loC: false, hiC: false });
        }
      });
      // fusiona trozos contiguos separados por una raíz (no se pueden unir en estrictas)
      if (st.m !== "=") sol.forEach(function (I) {
        var a = Math.max(I.lo, -X), b = Math.min(I.hi, X);
        if (b > a) { g.rect(a, lo, b, hi, { clase: "z-ok" }); g.segmento(a, lo + (hi - lo) * 0.05, b, lo + (hi - lo) * 0.05, { clase: "c-ok" }).setAttribute("stroke-width", 6); }
      });
      g.curva(f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3); g.curva(gg, { clase: "c-red", n: 700 }).setAttribute("stroke-width", 3);
      var vis = rs.filter(function (r) { return Math.abs(r) <= X; });
      vis.forEach(function (r) { var v = f(r); pto(g, r, v, "c-ok", false, 6); g.segmento(r, 0, r, v, { clase: "c-ok", dash: "3 4" }); });
      var res;
      if (st.m === "=") res = rs.length ? "x = " + rs.map(function (r) { return num(r, 4); }).join(",  x = ") + "  →  puntos " + rs.filter(function (r) { return Math.abs(r) < 1000; }).map(function (r) { return "(" + num(r, 3) + ", " + num(f(r), 3) + ")"; }).join(" ") : "las gráficas no se cortan: no hay solución";
      else res = sol.length ? F.txtIntervalos(sol) : "ningún x cumple la desigualdad";
      lectura.innerHTML = fil("Ecuación / inecuación", "f(x) " + (st.m === "=" ? "=" : st.m === ">" ? "&gt;" : "&lt;") + " g(x)", "") + fil("Solución", res, "ok") + fil("Dominio de la comparación", F.txtIntervalos(D)) +
        fil("Cómo leerlo", st.m === "=" ? "se buscan las x donde las dos curvas se cortan (puntos verdes)" : st.m === ">" ? "se buscan las x donde la curva azul (f) está POR ENCIMA de la roja (g): zona verde" : "se buscan las x donde la curva azul (f) está POR DEBAJO de la roja (g): zona verde");
      pie.innerHTML = "Resolver <b>f(x) = g(x)</b> es hallar la abscisa de los puntos de corte; resolver <b>f(x) &gt; g(x)</b> es ver para qué x la gráfica de f queda por encima. Es el mismo método que usarás con inecuaciones: se estudia el signo de f(x) − g(x) entre sus ceros.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -8, xmax: 8, ymin: -6, ymax: 6, w: 600, h: 340, etiqueta: "Dos funciones y sus cortes" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[0] + "  ·  " + p[1] }; }), "0", function (k) { st.f = PRE[+k][0]; st.g = PRE[+k][1]; iF.value = st.f; iG.value = st.g; pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "=", t: "f(x) = g(x)" }, { k: ">", t: "f(x) > g(x)" }, { k: "<", t: "f(x) < g(x)" }], "=", function (k) { st.m = k; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); }); iG.addEventListener("input", function () { st.g = iG.value; pinta(); });
    pinta();
  };

  // ============================================================
  // HIPERBOLA: y = (ax + b)/(cx + d) = q + k/(x − p)
  // ============================================================
  B.w.hiperbola = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Proporcionalidad inversa y función homográfica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var PRE = [[1, 0, 0, 1, "k/x = 1/x"], [2, 1, 1, -1, "(2x+1)/(x−1)"], [1, 2, 1, 0, "(x+2)/x"], [-1, 3, 1, 2, "(−x+3)/(x+2)"], [3, 0, 1, -2, "3x/(x−2)"]];
    // el primero: 1/x → (a=0,b=1,c=1,d=0)
    PRE[0] = [0, 1, 1, 0, "1/x"];
    var st = { a: 2, b: 1, c: 1, d: -1 }, g, sl = {}, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function slid(c, et, mn, mx) { sl[c] = U.slider(ctl, { et: et, min: mn, max: mx, step: 1, val: st[c], on: function (v) { st[c] = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } }); }
    slid("a", "<i>a</i>", -4, 4); slid("b", "<i>b</i>", -6, 6); slid("c", "<i>c</i>", -3, 3); slid("d", "<i>d</i>", -6, 6);
    function pinta() {
      var a = st.a, b = st.b, c = st.c, d = st.d; g.limpiar();
      var txt = "y = (" + lin(a, b) + ")/(" + lin(c, d) + ")";
      if (c === 0) { lectura.innerHTML = fil("Función", txt, "pen") + fil("Caso especial", d === 0 ? "el denominador es 0: no hay función" : "c = 0: ya no hay x en el denominador, es una función afín", "red"); return; }
      var det = a * d - b * c, p = -d / c, q = a / c, k = (b * c - a * d) / (c * c);
      var f = function (x) { return (a * x + b) / (c * x + d); };
      g.vertical(p, { clase: "c-red", dash: "6 5" }); g.horizontal(q, { clase: "c-red", dash: "6 5" });
      if (det === 0) {
        g.horizontal(q, { clase: "c-pen" }).setAttribute("stroke-width", 3); pto(g, p, q, "c-pen", true, 6);
        lectura.innerHTML = fil("Función", txt, "pen") + fil("Simplificación", "ad − bc = 0: el numerador es un múltiplo del denominador → la función se reduce a la constante y = " + fmt(q, 3) + " (con un hueco en x = " + fmt(p, 3) + ")", "red");
        return;
      }
      g.curva(f, { clase: "c-pen", n: 800 }).setAttribute("stroke-width", 3);
      pto(g, p, q, "c-ok", false, 5); etq(g, p, q, "centro (" + fmt(p, 2) + ", " + fmt(q, 2) + ")", "ok", 8, -10);
      lectura.innerHTML = fil("Función", txt, "pen") + fil("Dividiendo: forma reducida", "y = " + fmt(q, 3) + " + " + (k < 0 ? "(" + fmt(k, 3) + ")" : fmt(k, 3)) + " / (x " + (p < 0 ? "+ " : "− ") + fmt(Math.abs(p), 3) + ")", "ok") +
        fil("Asíntota vertical", "x = " + fmt(p, 3) + "  (donde c·x + d = 0)", "red") + fil("Asíntota horizontal", "y = " + fmt(q, 3) + "  (el cociente a/c)", "red") +
        fil("Dominio · Recorrido", "ℝ − {" + fmt(p, 3) + "}  ·  ℝ − {" + fmt(q, 3) + "}") + fil("Crecimiento", k > 0 ? "decrece en cada rama (k = " + fmt(k, 3) + " &gt; 0)" : "crece en cada rama (k = " + fmt(k, 3) + " &lt; 0)") +
        fil("Cortes con los ejes", (a !== 0 ? "eje X: (" + fmt(-b / a, 3) + ", 0)" : "no corta al eje X") + (d !== 0 ? " · eje Y: (0, " + fmt(b / d, 3) + ")" : " · no corta al eje Y"));
      pie.innerHTML = "Toda función homográfica (ax + b)/(cx + d) es una <b>hipérbola</b> y = q + k/(x − p): la misma 1/x desplazada a su centro (p, q) (con p = −d/c, q = a/c) y estirada por k = (bc − ad)/c². Las asíntotas se leen sin dibujar nada: <b>x = −d/c</b> e <b>y = a/c</b>.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -8, xmax: 8, ymin: -6, ymax: 6, w: 600, h: 340, etiqueta: "Hipérbola" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[4] }; }), "1", function (k) { var P = PRE[+k]; st.a = P[0]; st.b = P[1]; st.c = P[2]; st.d = P[3]; sl.a.set(P[0]); sl.b.set(P[1]); sl.c.set(P[2]); sl.d.set(P[3]); pinta(); });
    pinta();
    function lin(a, b) { var s = a === 0 ? "" : (a === 1 ? "x" : a === -1 ? "−x" : fmt(a, 0) + "x"); if (b !== 0) s += s ? (b > 0 ? " + " : " − ") + Math.abs(b) : fmt(b, 0); return s || "0"; }
  };

  // ============================================================
  // ONDAS: y = A·sen(B(x − C)) + D
  // ============================================================
  B.w.ondas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Funciones trigonométricas: amplitud, periodo y desfase");
    cuerpo.innerHTML = '<div data-fun class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { fn: "sen", A: 2, B: 1, C: 0, D: 0 }, g, sl = {}, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function piT(d) { return B.lab.trig && B.lab.trig.piTxt ? B.lab.trig.piTxt(d) : fmt(d * R, 3) + " rad"; }
    sl.A = U.slider(ctl, { et: "Amplitud <i>A</i>", min: -3, max: 3, step: 0.5, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sl.B = U.slider(ctl, { et: "Frecuencia <i>B</i>", min: 0.5, max: 4, step: 0.5, val: st.B, on: function (v) { st.B = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sl.C = U.slider(ctl, { et: "Desfase <i>C</i>", min: -6, max: 6, step: 1, val: st.C, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return piT(v * 30); } });
    sl.D = U.slider(ctl, { et: "Subida <i>D</i>", min: -3, max: 3, step: 0.5, val: st.D, on: function (v) { st.D = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var A = st.A, Bf = st.B, C = st.C * Math.PI / 6, D = st.D, fn = st.fn; g.limpiar();
      var base = fn === "sen" ? Math.sin : fn === "cos" ? Math.cos : Math.tan, T = fn === "tan" ? Math.PI / Bf : 2 * Math.PI / Bf;
      var f = function (x) { return A * base(Bf * (x - C)) + D; };
      g.horizontal(D, { clase: "c-faint", dash: "5 5" });
      if (fn !== "tan") { g.horizontal(D + Math.abs(A), { clase: "c-ok", dash: "3 4" }); g.horizontal(D - Math.abs(A), { clase: "c-ok", dash: "3 4" }); }
      else { for (var j = -8; j <= 8; j++) { var xa = C + (Math.PI / 2 + j * Math.PI) / Bf; if (Math.abs(xa) < 8) g.vertical(xa, { clase: "c-red", dash: "6 5" }); } }
      g.curva(function (x) { return base(x); }, { clase: "c-faint", dash: "7 4", n: 700 });
      g.curva(f, { clase: "c-pen", n: 900 }).setAttribute("stroke-width", 3);
      var ini = fn === "cos" ? C : C; pto(g, ini, fn === "tan" ? D : A * (fn === "sen" ? 0 : 1) + D, "c-red", false, 5);
      var extra = fn === "tan" ? fil("Asíntotas verticales", "x = C + (π/2 + kπ)/B  (la tangente no está definida allí)", "red") : fil("Máximo · mínimo", fmt(D + Math.abs(A), 2) + " · " + fmt(D - Math.abs(A), 2), "ok");
      lectura.innerHTML = fil("Función", "y = " + (A === 1 ? "" : A === -1 ? "−" : fmt(A, 1) + "·") + (fn === "sen" ? "sen" : fn === "cos" ? "cos" : "tan") + "(" + (Bf === 1 ? "" : fmt(Bf, 1)) + (st.C ? (Bf === 1 ? "(x " : "(x ") + (st.C > 0 ? "− " : "+ ") + piT(Math.abs(st.C) * 30) + ")" : "x") + ")" + (D ? " " + (D < 0 ? "− " : "+ ") + fmt(Math.abs(D), 1) : ""), "pen") +
        fil("Amplitud |A|", fn === "tan" ? "no hay (la tangente no está acotada)" : fmt(Math.abs(A), 2), "ok") + fil("Periodo", fn === "tan" ? "π/B = " + piT(180 / Bf) : "2π/B = " + piT(360 / Bf)) +
        fil("Desfase", "C = " + piT(st.C * 30) + (st.C > 0 ? " a la derecha" : st.C < 0 ? " a la izquierda" : "")) + fil("Eje central", "y = " + fmt(D, 1), "red") + extra +
        fil("Recorrido", fn === "tan" ? "ℝ" : "[" + fmt(D - Math.abs(A), 2) + ", " + fmt(D + Math.abs(A), 2) + "]");
      pie.innerHTML = "Curva gris: la función base. <b>A</b> estira en vertical (y la invierte si es negativa), <b>B</b> acorta el periodo (T = 2π/B), <b>C</b> desplaza la onda hacia la derecha y <b>D</b> sube el eje central. El punto rojo marca el inicio de un ciclo.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2 * Math.PI, xmax: 2 * Math.PI, ymin: -6, ymax: 6, w: 620, h: 320, sinX: true, etx: "x", etiqueta: "Onda trigonométrica" });
    [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2].forEach(function (m) { g.segmento(m * Math.PI, -6, m * Math.PI, 6, { clase: "c-faint", dash: "2 5", capa: "fijo" }); g.texto(m * Math.PI, 0, piT(m * 180), { dy: 15, ancla: "middle", clase: "faint", capa: "fijo" }); });
    U.fichas(cuerpo.querySelector("[data-fun]"), [{ k: "sen", t: "Seno" }, { k: "cos", t: "Coseno" }, { k: "tan", t: "Tangente" }], "sen", function (k) { st.fn = k; pinta(); });
    pinta();
  };
})(window);
