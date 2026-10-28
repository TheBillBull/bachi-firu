/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 10 (Estudio y representación de funciones)
   m2t10_estudio    (estudio guiado: la gráfica se construye paso a paso: dominio, cortes, asíntotas, extremos, inflexiones)
   m2t10_ramas      (ramas infinitas: tabla de f(x), f(x)/x y f(x) − m·x para ver si hay asíntota o rama parabólica)
   m2t10_fprima     (de la gráfica de f′ a las propiedades de f: signo, extremos, curvatura, inflexiones; luego se revela f)
   m2t10_formula    (deducir la fórmula: parámetros que hay que ajustar para cumplir los datos de la gráfica)
   m2t10_coherente  (elegir el esbozo coherente con una tabla de signos de f′ y f″)
   Reutiliza los motores de Matemáticas I (B.lab.fun, B.lab.der). Las cifras se verifican con herramientas/verificar_mates2_t10.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun, D = B.lab.der;
  var fil = F.fil, pto = F.pto, etq = F.etq;
  var T10 = B.lab.t10 = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t10-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t10-estilos";
    s.textContent =
      ".m10-paso{margin:8px 0 0;font-size:14.5px;line-height:1.5}" +
      ".m10-paso b{color:var(--pen)}" +
      ".m10-t{width:100%;border-collapse:collapse;font:14px var(--math);margin-top:8px}" +
      ".m10-t th,.m10-t td{padding:4px 8px;border-bottom:1px solid var(--line,rgba(128,128,128,.25));text-align:right}" +
      ".m10-t th{font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".m10-cand{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px}" +
      ".m10-c{border:2px solid var(--line,rgba(128,128,128,.3));border-radius:12px;padding:6px;text-align:center;min-width:0}" +
      ".m10-c.ok{border-color:var(--ok)}.m10-c.mal{border-color:var(--red)}" +
      ".m10-c .chip-btn{margin-top:4px}" +
      ".m10-tab{font-size:14px;line-height:1.55;margin:6px 0 0;padding:8px 12px;background:var(--sheet-2);border-radius:10px}" +
      ".m10-cond{display:flex;gap:8px;align-items:baseline;font-size:14.5px;line-height:1.5;margin:3px 0}" +
      ".m10-cond i{font-style:normal;font-weight:700;min-width:1.2em}" +
      ".m10-cond.ok i{color:var(--ok)}.m10-cond.no i{color:var(--red)}" +
      "@media(max-width:520px){.m10-cand{grid-template-columns:1fr}.m10-t{font-size:12.5px}.m10-t th,.m10-t td{padding:3px 4px}}";
    document.head.appendChild(s);
  })();

  function n3(x) { return fmt(Math.round(x * 1e9) / 1e9, 3); }
  function grande(v) { return !isFinite(v) ? (v > 0 ? "+∞" : "−∞") : Math.abs(v) >= 1e6 ? U.cient(v, 2) : fmt(v, 4); }
  function boton(host, texto, alClic) { var b = U.boton(host, texto, alClic); return b; }

  // ============================================================
  // 1. ESTUDIO GUIADO
  // ============================================================
  var PE = T10.estudio = [
    { t: "x²/(x − 1)", ex: "x^2/(x-1)", rg: [-5, 7, -9, 11], excl: [1],
      dom: "ℝ − {1}", sim: "ninguna (f(−x) ≠ ±f(x))",
      cor: "Eje Y: (0, 0) · Eje X: x² = 0 ⟹ (0, 0)", sig: "f ≤ 0 si x &lt; 1 · f &gt; 0 si x &gt; 1",
      av: [1], rectas: [{ m: 1, n: 1 }], asi: "Vertical x = 1 · Oblicua y = x + 1 (en ±∞) · Horizontal: no",
      ext: [{ x: 0, y: 0, t: "máx" }, { x: 2, y: 4, t: "mín" }], inf: [],
      mon: "f′ = x(x − 2)/(x − 1)² · crece en (−∞, 0) y (2, +∞); decrece en (0, 1) y (1, 2) · máx (0, 0), mín (2, 4)",
      cur: "f″ = 2/(x − 1)³ · cóncava en (−∞, 1), convexa en (1, +∞) · sin inflexiones" },
    { t: "2x/(x² − 1)", ex: "2*x/(x^2-1)", rg: [-4, 4, -5, 5], excl: [-1, 1],
      dom: "ℝ − {−1, 1}", sim: "impar: f(−x) = −f(x)",
      cor: "(0, 0) en ambos ejes", sig: "− en (−∞, −1) · + en (−1, 0) · − en (0, 1) · + en (1, +∞)",
      av: [-1, 1], rectas: [{ m: 0, n: 0 }], asi: "Verticales x = −1 y x = 1 · Horizontal y = 0 (en ±∞)",
      ext: [], inf: [{ x: 0, y: 0 }],
      mon: "f′ = −2(x² + 1)/(x² − 1)² &lt; 0 · decrece en cada tramo · sin extremos",
      cur: "f″ = 4x(x² + 3)/(x² − 1)³ · cóncava en (−∞, −1) y (0, 1); convexa en (−1, 0) y (1, +∞) · inflexión (0, 0)" },
    { t: "x·e^(−x)", ex: "x*e^(-x)", rg: [-1.5, 7, -4, 1], excl: [],
      dom: "ℝ", sim: "ninguna",
      cor: "(0, 0) en ambos ejes", sig: "f &lt; 0 si x &lt; 0 · f &gt; 0 si x &gt; 0",
      av: [], rectas: [{ m: 0, n: 0, lado: "+" }], asi: "Horizontal y = 0 solo en +∞ · en −∞, f → −∞ y f(x)/x → +∞: rama parabólica",
      ext: [{ x: 1, y: Math.exp(-1), t: "máx" }], inf: [{ x: 2, y: 2 * Math.exp(-2) }],
      mon: "f′ = (1 − x)e<sup>−x</sup> · crece en (−∞, 1), decrece en (1, +∞) · máx (1, 1/e) ≈ (1; 0,368)",
      cur: "f″ = (x − 2)e<sup>−x</sup> · cóncava en (−∞, 2), convexa en (2, +∞) · inflexión (2, 2/e²) ≈ (2; 0,271)" },
    { t: "(ln x)/x", ex: "ln(x)/x", rg: [-1, 12, -3, 1], excl: [0],
      dom: "(0, +∞)", sim: "no la hay (el dominio no es simétrico)",
      cor: "Eje Y: no (0 ∉ Dom) · Eje X: ln x = 0 ⟹ (1, 0)", sig: "f &lt; 0 en (0, 1) · f &gt; 0 en (1, +∞)",
      av: [0], rectas: [{ m: 0, n: 0, lado: "+" }], asi: "Vertical x = 0 (por la derecha, f → −∞) · Horizontal y = 0 en +∞",
      ext: [{ x: Math.E, y: 1 / Math.E, t: "máx" }], inf: [{ x: Math.exp(1.5), y: 1.5 / Math.exp(1.5) }],
      mon: "f′ = (1 − ln x)/x² · crece en (0, e), decrece en (e, +∞) · máx (e, 1/e) ≈ (2,718; 0,368)",
      cur: "f″ = (2 ln x − 3)/x³ · cóncava en (0, e<sup>3/2</sup>), convexa en (e<sup>3/2</sup>, +∞) · inflexión ≈ (4,482; 0,335)" },
    { t: "x·√(4 − x)", ex: "x*sqrt(4-x)", rg: [-5, 5, -10, 4], excl: [],
      dom: "(−∞, 4]", sim: "ninguna",
      cor: "Eje Y: (0, 0) · Eje X: x = 0 o x = 4 ⟹ (0, 0) y (4, 0)", sig: "f &lt; 0 si x &lt; 0 · f &gt; 0 en (0, 4)",
      av: [], rectas: [], asi: "Sin verticales ni horizontales · en −∞, f → −∞ y f(x)/x → +∞ (rama parabólica) · en x = 4 termina con tangente vertical",
      ext: [{ x: 8 / 3, y: 16 * Math.sqrt(3) / 9, t: "máx" }], inf: [],
      mon: "f′ = (8 − 3x)/(2√(4 − x)) · crece en (−∞, 8/3), decrece en (8/3, 4) · máx (8/3, 16√3/9) ≈ (2,667; 3,079)",
      cur: "f″ = (3x − 16)/(4(4 − x)<sup>3/2</sup>) &lt; 0 en todo el dominio · cóncava · sin inflexiones (16/3 ∉ Dom)" },
    { t: "|x² − 4|", ex: "|x^2-4|", rg: [-4, 4, -1, 12], excl: [],
      dom: "ℝ", sim: "par: f(−x) = f(x)",
      cor: "Eje Y: (0, 4) · Eje X: (−2, 0) y (2, 0)", sig: "f ≥ 0 siempre",
      av: [], rectas: [], asi: "Ninguna · en ±∞, f ≈ x² (rama parabólica)",
      ext: [{ x: -2, y: 0, t: "mín" }, { x: 0, y: 4, t: "máx" }, { x: 2, y: 0, t: "mín" }], inf: [],
      mon: "f′ = 2x si |x| &gt; 2 · f′ = −2x si |x| &lt; 2 · decrece en (−∞, −2) y (0, 2); crece en (−2, 0) y (2, +∞) · mín (±2, 0) (puntos angulares), máx (0, 4)",
      cur: "f″ = 2 si |x| &gt; 2 (convexa) · f″ = −2 si |x| &lt; 2 (cóncava) · en x = ±2 no hay tangente (picos): no son inflexiones" },
    { t: "eˣ/x", ex: "e^x/x", rg: [-5, 4, -6, 10], excl: [0],
      dom: "ℝ − {0}", sim: "ninguna",
      cor: "Ni eje Y (0 ∉ Dom) ni eje X (eˣ &gt; 0)", sig: "f &lt; 0 si x &lt; 0 · f &gt; 0 si x &gt; 0",
      av: [0], rectas: [{ m: 0, n: 0, lado: "-" }], asi: "Vertical x = 0 (−∞ por la izquierda, +∞ por la derecha) · Horizontal y = 0 solo en −∞ · en +∞ rama parabólica",
      ext: [{ x: 1, y: Math.E, t: "mín" }], inf: [],
      mon: "f′ = (x − 1)eˣ/x² · decrece en (−∞, 0) y (0, 1); crece en (1, +∞) · mín (1, e) ≈ (1; 2,718)",
      cur: "f″ = (x² − 2x + 2)eˣ/x³ (numerador siempre &gt; 0) · cóncava en (−∞, 0), convexa en (0, +∞) · sin inflexiones" }
  ];
  var PASOS_E = ["1. Dominio y simetría", "2. Cortes y signo", "3. Asíntotas", "4. Monotonía y extremos", "5. Curvatura e inflexiones", "6. La gráfica"];
  B.w.m2t10_estudio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Estudio guiado: la gráfica se construye paso a paso");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="m10-paso"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, p: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tit = cuerpo.querySelector(".m10-paso");
    var bAnt = boton(ctl, "◀ Paso anterior", function () { if (st.p > 0) { st.p--; pinta(); } });
    var bSig = boton(ctl, "Siguiente paso ▶", function () { if (st.p < 5) { st.p++; pinta(); } });
    bSig.setAttribute("data-sig", "1");
    var bTodo = boton(ctl, "Ir a la gráfica completa", function () { st.p = 5; pinta(); });
    function pinta() {
      var P = PE[st.i], r = F.leer(P.ex), p = st.p, f = r.g, i;
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      bAnt.disabled = p === 0; bSig.disabled = p === 5;
      tit.innerHTML = "<b>" + PASOS_E[p] + "</b> · paso " + (p + 1) + " de 6";
      var vx0 = P.rg[2], vx1 = P.rg[3];
      P.excl.forEach(function (x) { g.segmento(x, vx0, x, vx1, { clase: "c-faint", dash: "2 5" }); });
      if (p >= 1) P.cor && cortes(P, g, f);
      if (p >= 2) {
        P.av.forEach(function (x) { g.segmento(x, vx0, x, vx1, { clase: "c-red", dash: "7 5" }); etq(g, x, vx1, "x = " + n3(x), "c-red", 5, 14); });
        P.rectas.forEach(function (q) {
          var xa = q.lado === "+" ? Math.max(P.rg[0], P.rg[1] * 0.35) : P.rg[0], xb = q.lado === "-" ? Math.min(P.rg[1], P.rg[0] * 0.35) : P.rg[1];
          if (q.lado === "+") xa = P.rg[0]; if (q.lado === "-") xb = P.rg[1];
          g.segmento(xa, q.m * xa + q.n, xb, q.m * xb + q.n, { clase: "c-red", dash: "7 5" });
        });
      }
      if (p >= 3) P.ext.forEach(function (e) {
        var W = (P.rg[1] - P.rg[0]) * 0.06;
        g.segmento(e.x - W, e.y, e.x + W, e.y, { clase: "c-ok" }); pto(g, e.x, e.y, "c-ok", false, 6);
        etq(g, e.x, e.y, e.t, "c-ok", 8, e.t === "máx" ? -10 : 18);
      });
      if (p >= 4) P.inf.forEach(function (e) { pto(g, e.x, e.y, "c-pen", false, 6); etq(g, e.x, e.y, "inflexión", "c-pen", 8, -10); });
      if (p >= 5) g.curva(f, { clase: "c-pen", n: 800 }).setAttribute("stroke-width", 3);
      var h = fil("Dominio", P.dom, "pen") + fil("Simetría", P.sim, "pen");
      if (p >= 1) h += fil("Cortes con los ejes", P.cor, "ok ancho") + fil("Signo de f", P.sig, "ok ancho");
      if (p >= 2) h += fil("Asíntotas", P.asi, "red ancho");
      if (p >= 3) h += fil("Monotonía y extremos", P.mon, "ok ancho");
      if (p >= 4) h += fil("Curvatura e inflexiones", P.cur, "pen ancho");
      lectura.innerHTML = h;
      pie.innerHTML = p < 5 ? "Pulsa «Siguiente paso». En el último se dibuja la curva; antes, intenta imaginarla uniendo lo que ya hay: puntos, asíntotas (rojo) y tangentes horizontales (verde)." :
        "La curva pasa por los cortes, se pega a las asíntotas, sube y baja entre los extremos y cambia de curvatura justo en las inflexiones.";
    }
    function cortes(P, g, f) {
      var xs = P.rg;
      var pts = [];
      F.raices(f, xs[0], xs[1]).forEach(function (x) { if (isFinite(f(x))) pts.push([x, 0]); });
      var y0 = f(0); if (isFinite(y0)) pts.push([0, y0]);
      pts.forEach(function (q) { pto(g, q[0], q[1], "c-red", false, 5); });
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 600, h: 320, etx: "x", ety: "y", etiqueta: "Estudio guiado" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PE.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { st.i = +k; st.p = 0; pinta(); });
    pinta();
  };

  // ============================================================
  // 2. RAMAS INFINITAS
  // ============================================================
  var PRm = T10.ramas = [
    { t: "(x² + 1)/(x − 1)", ex: "(x^2+1)/(x-1)", mas: { tipo: "oblicua", m: 1, n: 1 }, menos: { tipo: "oblicua", m: 1, n: 1 } },
    { t: "√(x² + 1)", ex: "sqrt(x^2+1)", mas: { tipo: "oblicua", m: 1, n: 0 }, menos: { tipo: "oblicua", m: -1, n: 0 } },
    { t: "(x³ + 1)/x²", ex: "(x^3+1)/x^2", mas: { tipo: "oblicua", m: 1, n: 0 }, menos: { tipo: "oblicua", m: 1, n: 0 } },
    { t: "x·e^(−x)", ex: "x*e^(-x)", mas: { tipo: "horizontal", L: 0 }, menos: { tipo: "parabólica", dir: "eje Y" } },
    { t: "eˣ", ex: "e^x", mas: { tipo: "parabólica", dir: "eje Y" }, menos: { tipo: "horizontal", L: 0 } },
    { t: "ln x", ex: "ln(x)", mas: { tipo: "parabólica", dir: "eje X" }, menos: null }
  ];
  B.w.m2t10_ramas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ramas infinitas: ¿asíntota o rama parabólica?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-lado class="chips"></div><div class="w-plot"></div><div class="m10-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, s: "mas" }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".m10-tabla");
    function pinta() {
      var P = PRm[st.i], R = P[st.s], r = F.leer(P.ex), f = r.gi, sg = st.s === "mas" ? 1 : -1, rg;
      if (!R) { st.s = "mas"; R = P.mas; sg = 1; }
      rg = sg > 0 ? [-1, 12, -4, 8] : [-12, 1, -8, 4];
      var yy = F.rangoY(r.g, rg[0], rg[1]); if (P.t === "ln x") yy = [-3, 4];
      g.rango(rg[0], rg[1], Math.max(-12, yy[0]), Math.min(14, yy[1])); g.limpiar();
      g.curva(r.g, { clase: "c-pen", n: 800 }).setAttribute("stroke-width", 3);
      if (R.tipo === "oblicua") g.segmento(rg[0], R.m * rg[0] + R.n, rg[1], R.m * rg[1] + R.n, { clase: "c-red", dash: "7 5" });
      if (R.tipo === "horizontal") g.horizontal(R.L, { clase: "c-red", dash: "7 5" });
      var xs = [10, 100, 1000, 10000].map(function (v) { return sg * v; });
      var cab = '<tr><th>x</th><th>f(x)</th><th>f(x)/x</th>' + (R.tipo === "oblicua" ? "<th>f(x) − (" + (R.m === 1 ? "" : R.m === -1 ? "−" : fmt(R.m, 0)) + "x)</th>" : "") + "</tr>";
      var filas = xs.map(function (x) {
        var v = f(x);
        return "<tr><td>" + grande(x) + "</td><td>" + grande(v) + "</td><td>" + grande(v / x) + "</td>" + (R.tipo === "oblicua" ? "<td>" + grande(v - R.m * x) + "</td>" : "") + "</tr>";
      }).join("");
      tabla.innerHTML = '<table class="m10-t">' + cab + filas + "</table>";
      var con, cl = "ok ancho";
      if (R.tipo === "oblicua") con = "f(x)/x → " + n3(R.m) + " = m y f(x) − m·x → " + n3(R.n) + " = n. Asíntota oblicua <b>y = " + (R.m === 1 ? "" : R.m === -1 ? "−" : n3(R.m)) + "x" + (R.n === 0 ? "" : R.n > 0 ? " + " + n3(R.n) : " − " + n3(-R.n)) + "</b>.";
      else if (R.tipo === "horizontal") con = "f(x) → " + n3(R.L) + ": asíntota horizontal <b>y = " + n3(R.L) + "</b> (y entonces f(x)/x → 0).";
      else con = "f(x) crece sin límite y " + (P.t === "ln x" ? "f(x)/x → 0" : "f(x)/x → ∞") + ": <b>rama parabólica</b> en la dirección del " + R.dir + ". No hay asíntota.";
      lectura.innerHTML = fil("Tipo de rama en " + (sg > 0 ? "+∞" : "−∞"), R.tipo, "pen") + fil("Conclusión", con, cl);
      pie.innerHTML = "Receta: 1) ¿f(x) tiende a un número? Horizontal. 2) Si no, m = lím f(x)/x; si m es finito y no nulo, n = lím [f(x) − m·x]; si n es finito, oblicua. 3) Si no, rama parabólica.";
      var bs = cuerpo.querySelector("[data-lado]");
      bs.style.display = "";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 12, ymin: -4, ymax: 8, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Ramas infinitas" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRm.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { st.i = +k; if (!PRm[st.i][st.s]) { st.s = "mas"; ladoFichas(); } pinta(); });
    function ladoFichas() { U.fichas(cuerpo.querySelector("[data-lado]"), [{ k: "mas", t: "x → +∞" }, { k: "menos", t: "x → −∞" }], st.s, function (k) { if (!PRm[st.i][k]) { ladoFichas(); return; } st.s = k; pinta(); }); }
    ladoFichas();
    pinta();
  };

  // ============================================================
  // 3. DE LA GRÁFICA DE f′ A f
  // ============================================================
  var PF = T10.fprima = [
    { t: "f′ = x² − 2x − 3", d: "x^2-2*x-3", f0: "x^3/3-x^2-3*x", X: 5, tang: [] },
    { t: "f′ = (1 − x)e^(−x)", d: "(1-x)*e^(-x)", f0: "x*e^(-x)", X: 5, tang: [] },
    { t: "f′ = 2x/(x² + 1)", d: "2*x/(x^2+1)", f0: "ln(x^2+1)", X: 5, tang: [] },
    { t: "f′ = x³ − 2x", d: "x^3-2*x", f0: "x^4/4-x^2", X: 2.5, tang: [] },
    { t: "f′ = x²  (cuidado)", d: "x^2", f0: "x^3/3", X: 3, tang: [0] },
    { t: "f′ = −2x·e^(−x²)", d: "-2*x*e^(-x^2)", f0: "e^(-x^2)", X: 2.5, tang: [] }
  ];
  function tramos(g, A, Bm, pts, fnTxt) {
    var xs = [A].concat(pts, [Bm]), out = [], k;
    for (k = 0; k < xs.length - 1; k++) {
      var m = (xs[k] + xs[k + 1]) / 2, v = g(m), s = v > 0 ? "+" : "−";
      out.push({ a: xs[k], b: xs[k + 1], s: s });
    }
    return out;
  }
  B.w.m2t10_fprima = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Lee f a partir de la gráfica de f′");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot dr-g1"></div><div class="w-plot dr-g2"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, mostrar: false, C: 0 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sC;
    var bM = boton(ctl, "Mostrar f", function () { st.mostrar = !st.mostrar; bM.textContent = st.mostrar ? "Ocultar f" : "Mostrar f"; pinta(); });
    bM.setAttribute("data-mostrar", "1");
    sC = U.slider(ctl, { et: "Constante en f(0)", min: -3, max: 3, step: 0.5, val: 0, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var P = PF[st.i], d = F.leer(P.d).g, f0 = F.leer(P.f0).g, X = P.X, C = st.C;
      var f = function (x) { return f0(x) + C; };
      var zs = D.cambios(d, -X, X).map(function (e) { return e; });
      var d2 = function (x) { return D.d1(d, x); };
      var is = D.cambios(d2, -X, X);
      var ypd = F.rangoY(d, -X, X);
      g1.rango(-X, X, ypd[0], ypd[1]); g1.limpiar();
      g1.zona(function (x) { return Math.max(0, d(x)); }, -X, X, { clase: "z-ok" });
      g1.zona(function (x) { return Math.min(0, d(x)); }, -X, X, { clase: "z-pen" });
      g1.curva(d, { clase: "c-red", n: 600 }).setAttribute("stroke-width", 3);
      zs.forEach(function (e) { pto(g1, e.x, 0, "c-ok", false, 5); });
      is.forEach(function (e) { pto(g1, e.x, d(e.x), "c-pen", false, 5); });
      P.tang.forEach(function (x) { pto(g1, x, 0, "c-faint", false, 5); });
      var yf = F.rangoY(f, -X, X);
      g2.rango(-X, X, yf[0], yf[1]); g2.limpiar();
      if (st.mostrar) {
        g2.curva(f, { clase: "c-pen", n: 600 }).setAttribute("stroke-width", 3);
        zs.forEach(function (e) { var y = f(e.x); pto(g2, e.x, y, "c-ok", false, 6); g2.segmento(e.x - X * 0.12, y, e.x + X * 0.12, y, { clase: "c-ok" }); });
        is.forEach(function (e) { pto(g2, e.x, f(e.x), "c-pen", false, 6); });
      } else {
        g2.texto(0, (yf[0] + yf[1]) / 2, "¿Cómo será f? Léelo en la tabla y pulsa «Mostrar f»", { ancla: "middle", clase: "c-faint" });
      }
      var ps = tramos(d, -X, X, zs.map(function (e) { return e.x; })), ex = zs.map(function (e) {
        return "x = " + n3(e.x) + (e.de > 0 ? ": máximo relativo" : ": mínimo relativo") + " (f′ pasa de " + (e.de > 0 ? "+ a −" : "− a +") + ")";
      });
      P.tang.forEach(function (x) { ex.push("x = " + n3(x) + ": f′ = 0 pero no cambia de signo: tangente horizontal, sin extremo"); });
      var cur = tramos(d2, -X, X, is.map(function (e) { return e.x; })), inf = is.map(function (e) { return "x = " + n3(e.x) + (e.de > 0 ? " (f′ pasa de crecer a decrecer: de convexa a cóncava)" : " (f′ pasa de decrecer a crecer: de cóncava a convexa)"); });
      function ints(arr, mas, menos) { return arr.map(function (q) { return "(" + grande(q.a === -X ? -Infinity : q.a) + ", " + grande(q.b === X ? Infinity : q.b) + "): " + (q.s === "+" ? mas : menos); }).join(" · "); }
      lectura.innerHTML = fil("Signo de f′ ⟹ monotonía de f", ints(ps, "crece", "decrece"), "ok ancho") +
        fil("Ceros de f′ ⟹ extremos de f", ex.join(" · ") || "ninguno", "pen ancho") +
        fil("Crecimiento de f′ ⟹ curvatura de f", ints(cur, "convexa", "cóncava"), "ok ancho") +
        fil("Extremos de f′ ⟹ inflexiones de f", inf.join(" · ") || "ninguna", "pen ancho");
      pie.innerHTML = "Arriba, la gráfica de <b>f′</b> (verde: f′ &gt; 0; azul: f′ &lt; 0). Abajo, f: cambia la constante y verás que f ↑↓ pero conserva su forma (solo se desplaza). Los datos de f′ <b>no</b> dicen cuánto vale f(0).";
    }
    g1 = new B.Plot(cuerpo.querySelector(".dr-g1"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 620, h: 200, etx: "x", ety: "f′", etiqueta: "Gráfica de f′" });
    g2 = new B.Plot(cuerpo.querySelector(".dr-g2"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 620, h: 200, etx: "x", ety: "f", etiqueta: "Gráfica de f" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PF.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // 4. DEDUCIR LA FÓRMULA A PARTIR DE LOS DATOS
  // ============================================================
  var PD = T10.formula = [
    { t: "(ax + b)/(x + c)", txt: "f(x) = (a·x + b)/(x + c)",
      pars: [{ n: "a", min: -5, max: 5, step: 1, v: 1 }, { n: "b", min: -6, max: 6, step: 1, v: 0 }, { n: "c", min: -5, max: 5, step: 1, v: 0 }],
      f: function (x, p) { return (p[0] * x + p[1]) / (x + p[2]); }, rg: [-4, 6, -6, 8], sol: [3, -2, -2],
      conds: [{ t: "Asíntota vertical x = 2", res: function (p) { return p[2] + 2; }, eq: "x + c = 0 en x = 2 ⟹ c = −2" },
              { t: "Asíntota horizontal y = 3", res: function (p) { return p[0] - 3; }, eq: "lím f = a ⟹ a = 3" },
              { t: "Pasa por (0, 1)", res: function (p) { return p[1] / p[2] - 1; }, eq: "f(0) = b/c = 1 ⟹ b = −2" }],
      marcas: function (g, P) { g.vertical(2, { clase: "c-ok", dash: "5 5" }); g.horizontal(3, { clase: "c-ok", dash: "5 5" }); pto(g, 0, 1, "c-ok", false, 6); } },
    { t: "x³ + ax² + bx + c", txt: "f(x) = x³ + a·x² + b·x + c",
      pars: [{ n: "a", min: -9, max: 9, step: 1, v: 0 }, { n: "b", min: -12, max: 12, step: 1, v: 0 }, { n: "c", min: -6, max: 6, step: 1, v: 0 }],
      f: function (x, p) { return x * x * x + p[0] * x * x + p[1] * x + p[2]; }, rg: [-1, 5, -4, 8], sol: [-6, 9, 1],
      conds: [{ t: "Corta al eje Y en (0, 1)", res: function (p) { return p[2] - 1; }, eq: "f(0) = c = 1" },
              { t: "Extremo relativo en x = 1", res: function (p) { return 3 + 2 * p[0] + p[1]; }, eq: "f′(1) = 3 + 2a + b = 0" },
              { t: "Punto de inflexión en x = 2", res: function (p) { return 12 + 2 * p[0]; }, eq: "f″(2) = 12 + 2a = 0 ⟹ a = −6" }],
      marcas: function (g) { pto(g, 0, 1, "c-ok", false, 6); g.vertical(1, { clase: "c-ok", dash: "5 5" }); g.vertical(2, { clase: "c-ok", dash: "5 5" }); } },
    { t: "(ax + b)·eˣ", txt: "f(x) = (a·x + b)·eˣ",
      pars: [{ n: "a", min: -3, max: 3, step: 0.5, v: 0 }, { n: "b", min: -3, max: 3, step: 1, v: 0 }],
      f: function (x, p) { return (p[0] * x + p[1]) * Math.exp(x); }, rg: [-5, 3, -3, 4], sol: [0.5, -1],
      conds: [{ t: "Pasa por (0, −1)", res: function (p) { return p[1] + 1; }, eq: "f(0) = b = −1" },
              { t: "Tangente horizontal en x = 1", res: function (p) { return 2 * p[0] + p[1]; }, eq: "f′(x) = (ax + a + b)eˣ ⟹ f′(1) = (2a + b)e = 0 ⟹ a = 1/2" }],
      marcas: function (g) { pto(g, 0, -1, "c-ok", false, 6); g.vertical(1, { clase: "c-ok", dash: "5 5" }); } },
    { t: "a·ln x + b·x", txt: "f(x) = a·ln x + b·x",
      pars: [{ n: "a", min: -4, max: 4, step: 1, v: 0 }, { n: "b", min: -4, max: 4, step: 1, v: 0 }],
      f: function (x, p) { return p[0] * Math.log(x) + p[1] * x; }, rg: [-0.5, 6, -5, 3], sol: [2, -1],
      conds: [{ t: "Pasa por (1, −1)", res: function (p) { return p[1] + 1; }, eq: "f(1) = b = −1" },
              { t: "Extremo relativo en x = 2", res: function (p) { return p[0] / 2 + p[1]; }, eq: "f′(2) = a/2 + b = 0 ⟹ a = 2" }],
      marcas: function (g) { pto(g, 1, -1, "c-ok", false, 6); g.vertical(2, { clase: "c-ok", dash: "5 5" }); } }
  ];
  B.w.m2t10_formula = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Deduce la fórmula a partir de los datos de la gráfica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="m10-paso m10-txt"></div><div data-ctl></div><div class="w-plot"></div><div class="m10-conds"></div><p class="w-pie"></p>';
    var st = { i: 0, p: [] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), sl = [], conds = cuerpo.querySelector(".m10-conds"), pie = cuerpo.querySelector(".w-pie"), txt = cuerpo.querySelector(".m10-txt"), bSol;
    function monta() {
      ctl.innerHTML = ""; sl = [];
      var P = PD[st.i]; st.p = P.pars.map(function (q) { return q.v; }); st.ver = false;
      P.pars.forEach(function (q, k) {
        sl.push(U.slider(ctl, { et: "<i>" + q.n + "</i>", min: q.min, max: q.max, step: q.step, val: q.v, on: function (v) { st.p[k] = v; pinta(); }, fmt: function (v) { return fmt(v, q.step < 1 ? 1 : 0); } }));
      });
      bSol = boton(ctl, "Ver el sistema y la solución", function () { st.ver = true; st.p = P.sol.slice(); sl.forEach(function (s, k) { s.set(st.p[k]); }); pinta(); });
      bSol.setAttribute("data-solve", "1");
    }
    function pinta() {
      var P = PD[st.i], p = st.p, ok = true;
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      P.marcas(g, P);
      var res = P.conds.map(function (c) { var r = c.res(p); return isFinite(r) && Math.abs(r) < 1e-9; });
      ok = res.every(function (v) { return v; });
      g.curva(function (x) { return P.f(x, p); }, { clase: ok ? "c-ok" : "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      txt.innerHTML = P.txt + " &nbsp;con&nbsp; " + P.pars.map(function (q, k) { return "<b>" + q.n + " = " + fmt(p[k], q.step < 1 ? 1 : 0) + "</b>"; }).join(", ");
      conds.innerHTML = P.conds.map(function (c, k) {
        return '<div class="m10-cond ' + (res[k] ? "ok" : "no") + '"><i>' + (res[k] ? "✓" : "✗") + "</i><span>" + c.t + (st.ver ? " &nbsp;→&nbsp; <b>" + c.eq + "</b>" : "") + "</span></div>";
      }).join("");
      pie.innerHTML = ok ? "<b>¡Cumple todos los datos!</b> Cada dato es una ecuación: con tantas ecuaciones como parámetros, la solución es única." : "Cada dato (punto, asíntota, extremo, inflexión) da una ecuación para los parámetros. Ajusta los deslizadores hasta que los tres datos pasen a ✓, o pulsa el botón para ver el sistema.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -4, xmax: 6, ymin: -6, ymax: 8, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Deducir la fórmula" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PD.map(function (q, k) { return { k: String(k), t: q.t }; }), "0", function (k) { st.i = +k; monta(); pinta(); });
    monta(); pinta();
  };

  // ============================================================
  // 5. ESBOZO COHERENTE CON LA TABLA DE SIGNOS
  // ============================================================
  var PC = T10.coherente = [
    { tabla: "f′ &gt; 0 en (−∞, −1) · f′ &lt; 0 en (−1, 1) · f′ &gt; 0 en (1, +∞)<br>f″ &lt; 0 en (−∞, 0) · f″ &gt; 0 en (0, +∞)", rg: [-3, 3, -4, 4],
      cand: [{ ex: "x^3-3*x", ok: true, por: "Máximo en x = −1, mínimo en x = 1 y cambio de cóncava a convexa en 0: encaja con las dos filas." },
             { ex: "-x^3+3*x", ok: false, por: "Tiene f′ &lt; 0 donde la tabla pide f′ &gt; 0 (máximo y mínimo intercambiados) y la curvatura al revés." },
             { ex: "x^3+3*x", ok: false, por: "f′ = 3x² + 3 &gt; 0 siempre: no tiene extremos, pero la tabla exige un máximo en −1." }] },
    { tabla: "Dominio ℝ − {1}<br>f′ &gt; 0 en (−∞, 0) · f′ &lt; 0 en (0, 1) y (1, 2) · f′ &gt; 0 en (2, +∞)<br>f″ &lt; 0 en (−∞, 1) · f″ &gt; 0 en (1, +∞)", rg: [-4, 6, -8, 10],
      cand: [{ ex: "x^2/(1-x)", ok: false, por: "La asíntota está bien (x = 1), pero con 1 − x en el denominador la curvatura y los extremos se invierten: f′ &lt; 0 donde debería ser &gt; 0." },
             { ex: "x^2/(x-1)", ok: true, por: "Máximo en (0, 0), mínimo en (2, 4), cóncava a la izquierda de la asíntota y convexa a la derecha." },
             { ex: "x^2/(x+1)", ok: false, por: "Su asíntota vertical es x = −1, no x = 1: no respeta el dominio de la tabla." }] },
    { tabla: "f′ &gt; 0 en (−∞, 1) · f′ &lt; 0 en (1, +∞)<br>f″ &lt; 0 en (−∞, 2) · f″ &gt; 0 en (2, +∞)<br>Asíntota horizontal y = 0 en +∞", rg: [-2, 7, -3, 1],
      cand: [{ ex: "x*e^x", ok: false, por: "Su asíntota horizontal y = 0 está en −∞ y su extremo es un mínimo en x = −1: no encaja." },
             { ex: "x*e^(-x)", ok: true, por: "Máximo en x = 1, inflexión en x = 2 y se pega al eje X en +∞." },
             { ex: "-x*e^(-x)", ok: false, por: "Es la anterior reflejada: tiene un mínimo en x = 1 (f′ &lt; 0 antes y &gt; 0 después), al revés de la tabla." }] }
  ];
  B.w.m2t10_coherente = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Cuál de estos esbozos es coherente con la tabla?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="m10-tab"></div><div class="m10-cand"></div><p class="w-pie"></p>';
    var st = { i: 0 }, tab = cuerpo.querySelector(".m10-tab"), cand = cuerpo.querySelector(".m10-cand"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PC[st.i]; tab.innerHTML = P.tabla; cand.innerHTML = ""; pie.innerHTML = "Elige el esbozo que cumple <b>todas</b> las filas de la tabla; si te equivocas, te explico qué fila incumple.";
      P.cand.forEach(function (c, k) {
        var d = document.createElement("div"); d.className = "m10-c"; cand.appendChild(d);
        var pl = document.createElement("div"); pl.className = "w-plot"; d.appendChild(pl);
        var gg = new B.Plot(pl, { xmin: P.rg[0], xmax: P.rg[1], ymin: P.rg[2], ymax: P.rg[3], w: 300, h: 220, etiqueta: "Esbozo " + "ABC".charAt(k) });
        gg.curva(F.leer(c.ex).g, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
        var b = U.boton(d, "Elijo el " + "ABC".charAt(k), function () {
          d.className = "m10-c " + (c.ok ? "ok" : "mal");
          pie.innerHTML = (c.ok ? "<b>Correcto.</b> " : "<b>No.</b> ") + c.por;
        });
        b.setAttribute("data-c", c.ok ? "ok" : "mal");
      });
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PC.map(function (q, k) { return { k: String(k), t: "Tabla " + (k + 1) }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };
})(window);
