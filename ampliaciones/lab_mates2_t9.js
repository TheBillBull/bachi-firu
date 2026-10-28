/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 9 (Aplicaciones de la derivada)
   m2_signos (f, f′ y f″ con un punto que se mueve) · m2_absolutos (extremos absolutos en [a, b]) ·
   m2_parametros (hallar parámetros a partir de condiciones) · m2_problema (optimización guiada) ·
   m2_lhopital (tabla f/g frente a f′/g′).
   Reutiliza el motor de Matemáticas I: B.lab.fun (lecturas, puntos) y B.lab.der (derivadas numéricas y cambios de signo).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun, D = B.lab.der;
  var fil = F.fil, pto = F.pto, etq = F.etq, INF = Infinity;

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t9-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t9-estilos";
    s.textContent =
      ".m9-pasos{margin:6px 0 0;padding:0 0 0 1.2em;font-size:14.5px;line-height:1.55}" +
      ".m9-pasos li{margin:3px 0;overflow-wrap:anywhere}" +
      ".m9-t{width:100%;border-collapse:collapse;font:14px var(--math);margin-top:6px}" +
      ".m9-t th,.m9-t td{padding:4px 8px;border-bottom:1px solid var(--line,rgba(128,128,128,.25));text-align:right}" +
      ".m9-t th{font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".m9-t td:first-child,.m9-t th:first-child{text-align:left}" +
      ".m9-t tr.m9-max td{color:var(--ok);font-weight:700}.m9-t tr.m9-min td{color:var(--red);font-weight:700}" +
      ".m9-enun{margin:0 0 6px;font-size:15px;line-height:1.5}" +
      "@media(max-width:520px){.m9-t{font-size:12.5px}.m9-t th,.m9-t td{padding:3px 4px}}";
    document.head.appendChild(s);
  })();

  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 3).replace(/,000$/, "").replace(/(,\d\d)0$/, "$1").replace(/(,\d)0$/, "$1"); }
  function sg(x) { return x < 0 ? "−" + n2(-x) : n2(x); }
  function lista(arr) { return "<ol class='m9-pasos'>" + arr.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>"; }

  // ============================================================
  // SIGNOS: f, f′ y f″ con un punto que se mueve
  // ============================================================
  var SG = [
    { t: "x³ − 3x² − 9x + 5", f: function (x) { return x * x * x - 3 * x * x - 9 * x + 5; }, rg: [-3, 5, -25, 20], nota: "Dos extremos relativos (máximo en x = −1, mínimo en x = 3) y una inflexión en x = 1." },
    { t: "x·e^(−x)", f: function (x) { return x * Math.exp(-x); }, rg: [-1, 6, -2.2, 0.6], nota: "Un máximo en x = 1 y una inflexión en x = 2, donde la curva pasa de ∩ a ∪." },
    { t: "x⁴ − 4x³", f: function (x) { return x * x * x * (x - 4); }, rg: [-1, 4.2, -30, 12], nota: "En x = 0 se anula f′ pero NO hay extremo (f′ no cambia de signo): es una inflexión con tangente horizontal." },
    { t: "ln(x)/x", f: function (x) { return Math.log(x) / x; }, rg: [0.3, 9, -1.5, 0.6], nota: "Dominio x &gt; 0. Máximo en x = e ≈ 2,718 e inflexión en x = e<sup>3/2</sup> ≈ 4,482." },
    { t: "e^(−x²)", f: function (x) { return Math.exp(-x * x); }, rg: [-3, 3, -0.2, 1.1], nota: "Máximo en x = 0 y dos inflexiones en x = ±1/√2 ≈ ±0,707 (la «campana de Gauss»)." },
    { t: "x³", f: function (x) { return x * x * x; }, rg: [-2, 2, -8, 8], nota: "f′(0) = 0 y f″(0) = 0, pero hay inflexión y no hay extremo: f siempre crece." }
  ];
  B.w.m2_signos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mueve el punto: el signo de f′ y de f″ explica la gráfica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot m9-g1"></div><div class="w-plot m9-g2"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, x: 0 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    sl = U.slider(ctl, { et: "Posición <i>x</i>", min: -3, max: 5, step: 0.01, val: 0, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function carga(i) {
      st.i = i; var R = SG[i].rg; st.x = R[0] + (R[1] - R[0]) * 0.18;
      sl.input.min = R[0]; sl.input.max = R[1]; sl.input.step = 0.01; st.x = Math.round(st.x * 100) / 100; sl.set(st.x); pinta();
    }
    function pinta() {
      var P = SG[st.i], f = P.f, R = P.rg, x = st.x, d1 = function (t) { return D.d1(f, t); }, d2 = function (t) { return D.d2(f, t); };
      var ext = D.cambios(d1, R[0], R[1], 1200), inf = D.cambios(d2, R[0], R[1], 1200);
      var y1 = F.rangoY(d1, R[0], R[1]);
      g1.rango(R[0], R[1], R[2], R[3]); g1.limpiar(); g2.rango(R[0], R[1], y1[0], y1[1]); g2.limpiar();
      // curva troceada por colores según el signo de f′
      var N = 360, tr = [], cl = null, i;
      for (i = 0; i <= N; i++) {
        var t = R[0] + (R[1] - R[0]) * i / N, s = d1(t) >= 0 ? "c-ok" : "c-red";
        if (s !== cl) { tr.push({ c: s, p: tr.length ? [tr[tr.length - 1].p[tr[tr.length - 1].p.length - 1]] : [] }); cl = s; }
        tr[tr.length - 1].p.push([t, f(t)]);
      }
      tr.forEach(function (q) { if (q.p.length > 1) g1.polilinea(q.p, { clase: q.c }).setAttribute("stroke-width", 3); });
      g2.horizontal(0, { clase: "c-faint" });
      for (i = 0; i < 160; i++) {
        var xa = R[0] + (R[1] - R[0]) * i / 160, xb = R[0] + (R[1] - R[0]) * (i + 1) / 160, v = d1((xa + xb) / 2);
        if (!isNaN(v)) g2.rect(xa, Math.min(0, y1[1]), xb, Math.max(0, y1[0]), { clase: v > 0 ? "z-ok" : "z-red" });
      }
      g2.curva(d1, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 2.5);
      ext.forEach(function (e) { pto(g1, e.x, f(e.x), "c-pen", false, 6); etq(g1, e.x, f(e.x), e.de > 0 ? "máx" : "mín", "", 0, e.de > 0 ? -10 : 18, "middle"); pto(g2, e.x, 0, "c-pen", false, 5); });
      inf.forEach(function (e) { pto(g1, e.x, f(e.x), "c-faint", true, 6); });
      var a = d1(x), c = d2(x), fx = f(x), W = (R[1] - R[0]) * 0.12;
      g1.segmento(x - W, fx - a * W, x + W, fx + a * W, { clase: "c-pen", dash: "5 4" });
      pto(g1, x, fx, "c-red", false, 7); pto(g2, x, a, "c-red", false, 6);
      var nt = Math.abs(a) < 0.02;
      lectura.innerHTML =
        fil("f(x)", n2(fx), "pen") +
        fil("f′(x)", sg(a) + (nt ? " ⟶ tangente horizontal" : a > 0 ? " &gt; 0 ⟶ f crece" : " &lt; 0 ⟶ f decrece"), nt ? "red" : a > 0 ? "ok" : "red") +
        fil("f″(x)", sg(c) + (Math.abs(c) < 0.02 ? " ⟶ posible inflexión" : c > 0 ? " &gt; 0 ⟶ convexa ∪" : " &lt; 0 ⟶ cóncava ∩"), "pen") +
        fil("Máximos relativos", ext.filter(function (e) { return e.de > 0; }).map(function (e) { return "x = " + n2(e.x); }).join(" · ") || "ninguno", "ok") +
        fil("Mínimos relativos", ext.filter(function (e) { return e.de < 0; }).map(function (e) { return "x = " + n2(e.x); }).join(" · ") || "ninguno", "red") +
        fil("Inflexiones (f″ cambia de signo)", inf.map(function (e) { return "x = " + n2(e.x); }).join(" · ") || "ninguna", "pen") +
        fil("Qué ver aquí", P.nota, "pen anch");
      pie.innerHTML = "Arriba, f: <b>verde</b> donde f′ &gt; 0 (crece), <b>rojo</b> donde f′ &lt; 0 (decrece); los círculos huecos son inflexiones. Abajo, f′: los máximos y mínimos de f están donde f′ <b>corta el eje</b> cambiando de signo.";
    }
    g1 = new B.Plot(cuerpo.querySelector(".m9-g1"), { xmin: -3, xmax: 5, ymin: -5, ymax: 5, w: 600, h: 250, etx: "x", ety: "", etiqueta: "Función f" });
    g2 = new B.Plot(cuerpo.querySelector(".m9-g2"), { xmin: -3, xmax: 5, ymin: -5, ymax: 5, w: 600, h: 170, etx: "x", ety: "", etiqueta: "Derivada f′" });
    U.fichas(cuerpo.querySelector("[data-pre]"), SG.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // ABSOLUTOS: candidatos en un intervalo cerrado [a, b]
  // ============================================================
  var AB = [
    { t: "x³ − 6x² + 9x + 1", f: function (x) { return x * x * x - 6 * x * x + 9 * x + 1; }, rg: [-1, 6], ab: [0, 5], nota: "Hay dos mínimos absolutos empatados (x = 0 y x = 3)." },
    { t: "|x² − 1|", f: function (x) { return Math.abs(x * x - 1); }, rg: [-3, 3], ab: [-2, 2], nota: "Los mínimos están en x = ±1, donde f NO es derivable (punto angular): hay que mirarlos aparte." },
    { t: "x/(x² + 1)", f: function (x) { return x / (x * x + 1); }, rg: [-1, 5], ab: [0, 3], nota: "Máximo en x = 1 con f = 1/2; el mínimo está en el extremo x = 0." },
    { t: "x·e^(−x)", f: function (x) { return x * Math.exp(-x); }, rg: [-1, 5], ab: [0, 3], nota: "El máximo es interior (x = 1); si amplías b, el valor en el extremo sigue siendo menor." },
    { t: "x² si x ≤ 1;  2 − x si x &gt; 1", f: function (x) { return x <= 1 ? x * x : 2 - x; }, rg: [-2, 4], ab: [-1, 3], nota: "En x = 1 hay un punto angular (f′ cambia de 2 a −1): es candidato aunque f′ no valga 0." }
  ];
  B.w.m2_absolutos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Máximo y mínimo absolutos en [a, b]: compara los candidatos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><div class="m9-tab"></div><p class="w-pie"></p>';
    var st = { i: 0, a: 0, b: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".m9-tab"), pie = cuerpo.querySelector(".w-pie"), sa, sb;
    sa = U.slider(ctl, { et: "Extremo <i>a</i>", min: -1, max: 6, step: 0.1, val: 0, on: function (v) { st.a = Math.min(v, st.b - 0.2); pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sb = U.slider(ctl, { et: "Extremo <i>b</i>", min: -1, max: 6, step: 0.1, val: 5, on: function (v) { st.b = Math.max(v, st.a + 0.2); pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function carga(i) {
      st.i = i; var P = AB[i]; [sa, sb].forEach(function (s) { s.input.min = P.rg[0]; s.input.max = P.rg[1]; });
      st.a = P.ab[0]; st.b = P.ab[1]; sa.set(st.a); sb.set(st.b); pinta();
    }
    function pinta() {
      var P = AB[st.i], f = P.f, a = st.a, b = st.b, R = P.rg;
      var cand = [{ x: a, tipo: "extremo del intervalo" }, { x: b, tipo: "extremo del intervalo" }];
      D.cambios(function (t) { return D.d1(f, t); }, a + 1e-4, b - 1e-4, 1500).forEach(function (e) { cand.push({ x: Math.round(e.x * 1e4) / 1e4, tipo: "punto crítico" }); });
      cand.forEach(function (c) { c.y = f(c.x); });
      var mx = Math.max.apply(null, cand.map(function (c) { return c.y; })), mn = Math.min.apply(null, cand.map(function (c) { return c.y; }));
      var yr = F.rangoY(f, R[0], R[1]);
      g.rango(R[0], R[1], Math.min(yr[0], 0), yr[1]); g.limpiar();
      g.rect(a, g.c.ymin, b, g.c.ymax, { clase: "z-pen" });
      g.curva(f, { clase: "c-faint", n: 500 });
      g.curva(f, { clase: "c-pen", x0: a, x1: b, n: 500 }).setAttribute("stroke-width", 3.5);
      cand.forEach(function (c) {
        var cl = Math.abs(c.y - mx) < 1e-6 ? "c-ok" : Math.abs(c.y - mn) < 1e-6 ? "c-red" : "c-faint";
        g.segmento(c.x, 0, c.x, c.y, { clase: cl, dash: "3 4" }); pto(g, c.x, c.y, cl === "c-faint" ? "c-pen" : cl, false, cl === "c-faint" ? 5 : 8);
      });
      cand.sort(function (u, v) { return u.x - v.x; });
      var imax = cand.filter(function (c) { return Math.abs(c.y - mx) < 1e-6; }), imin = cand.filter(function (c) { return Math.abs(c.y - mn) < 1e-6; });
      lectura.innerHTML =
        fil("Máximo absoluto", n2(mx) + " en " + imax.map(function (c) { return "x = " + n2(c.x); }).join(" y "), "ok") +
        fil("Mínimo absoluto", n2(mn) + " en " + imin.map(function (c) { return "x = " + n2(c.x); }).join(" y "), "red") +
        fil("Qué ver aquí", P.nota, "pen anch");
      tab.innerHTML = "<table class='m9-t'><thead><tr><th>Candidato</th><th>x</th><th>f(x)</th></tr></thead><tbody>" + cand.map(function (c) {
        var cl = Math.abs(c.y - mx) < 1e-6 ? "m9-max" : Math.abs(c.y - mn) < 1e-6 ? "m9-min" : "";
        return "<tr class='" + cl + "'><td>" + c.tipo + "</td><td>" + n2(c.x) + "</td><td>" + n2(c.y) + (cl === "m9-max" ? "  (máx)" : cl === "m9-min" ? "  (mín)" : "") + "</td></tr>";
      }).join("") + "</tbody></table>";
      pie.innerHTML = "Método de Weierstrass: si f es continua en [a, b], el máximo y el mínimo absolutos están entre los <b>puntos críticos del interior</b> (f′ = 0 o no existe) y los <b>dos extremos</b>. Se calculan todos los valores y se comparan. Mueve a y b y mira cómo cambia el ganador.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 6, ymin: -1, ymax: 5, w: 600, h: 300, etx: "x", ety: "", etiqueta: "Extremos absolutos en un intervalo cerrado" });
    U.fichas(cuerpo.querySelector("[data-pre]"), AB.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // PARÁMETROS: la función con parámetros que cumple las condiciones
  // ============================================================
  var PA = [
    { t: "x³ + ax² + bx", f: function (x, p) { return x * x * x + p.a * x * x + p.b * x; }, rg: [-2, 6, -10, 14],
      par: [{ n: "a", min: -10, max: 4, step: 0.5, val: 0, sol: -6 }, { n: "b", min: -4, max: 14, step: 0.5, val: 0, sol: 9 }],
      cond: [{ txt: "extremo en x = 1:  f′(1) = 3 + 2a + b = 0", x: 1, r: function (p) { return 3 + 2 * p.a + p.b; } },
             { txt: "inflexión en x = 2:  f″(2) = 12 + 2a = 0", x: 2, r: function (p) { return 12 + 2 * p.a; } }],
      ec: ["f′(x) = 3x² + 2ax + b y f″(x) = 6x + 2a.", "Inflexión en x = 2: f″(2) = 12 + 2a = 0 ⟹ a = −6.", "Extremo en x = 1: f′(1) = 3 + 2a + b = 0 ⟹ 3 − 12 + b = 0 ⟹ b = 9.", "Comprobación: f″(1) = 6 − 12 = −6 &lt; 0, luego en x = 1 hay un máximo relativo."] },
    { t: "ax³ + bx", f: function (x, p) { return p.a * x * x * x + p.b * x; }, rg: [-3, 3, -8, 8],
      par: [{ n: "a", min: -3, max: 3, step: 0.25, val: 0, sol: 1 }, { n: "b", min: -6, max: 3, step: 0.25, val: 0, sol: -3 }],
      cond: [{ txt: "pasa por (1, −2):  a + b = −2", x: 1, r: function (p) { return p.a + p.b + 2; } },
             { txt: "extremo en x = 1:  f′(1) = 3a + b = 0", x: 1, r: function (p) { return 3 * p.a + p.b; } }],
      ec: ["f(1) = a + b = −2 y f′(x) = 3ax² + b ⟹ f′(1) = 3a + b = 0.", "Restando: 2a = 2 ⟹ a = 1, y b = −3.", "f(x) = x³ − 3x: f″(1) = 6 &gt; 0, mínimo relativo en (1, −2)."] },
    { t: "a·ln x + b·x²", f: function (x, p) { return p.a * Math.log(x) + p.b * x * x; }, rg: [0.2, 4, -6, 14],
      par: [{ n: "a", min: -8, max: 4, step: 0.5, val: 0, sol: -4 }, { n: "b", min: -1, max: 5, step: 0.5, val: 0, sol: 2 }],
      cond: [{ txt: "pasa por (1, 2):  f(1) = b = 2", x: 1, r: function (p) { return p.b - 2; } },
             { txt: "extremo en x = 1:  f′(1) = a + 2b = 0", x: 1, r: function (p) { return p.a + 2 * p.b; } }],
      ec: ["f(1) = a·ln 1 + b = b = 2.", "f′(x) = a/x + 2bx ⟹ f′(1) = a + 2b = 0 ⟹ a = −4.", "f″(x) = −a/x² + 2b = 4/x² + 4 &gt; 0: en (1, 2) hay un mínimo relativo."] },
    { t: "(ax + b)/(x² + 1)", f: function (x, p) { return (p.a * x + p.b) / (x * x + 1); }, rg: [-5, 5, -4, 4],
      par: [{ n: "a", min: -2, max: 8, step: 0.5, val: 0, sol: 4 }, { n: "b", min: -4, max: 4, step: 0.5, val: 0, sol: 0 }],
      cond: [{ txt: "pasa por (1, 2):  (a + b)/2 = 2", x: 1, r: function (p) { return (p.a + p.b) / 2 - 2; } },
             { txt: "extremo en x = 1:  f′(1) = −b/2 = 0", x: 1, r: function (p) { return -p.b / 2; } }],
      ec: ["f′(x) = [a(x² + 1) − 2x(ax + b)]/(x² + 1)² = (−ax² − 2bx + a)/(x² + 1)².", "f′(1) = −2b/4 = −b/2 = 0 ⟹ b = 0.", "f(1) = (a + 0)/2 = 2 ⟹ a = 4.", "f(x) = 4x/(x² + 1): máximo en (1, 2) y mínimo en (−1, −2)."] }
  ];
  B.w.m2_parametros = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Hallar parámetros: ajusta a y b hasta cumplir todas las condiciones");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="ctl m9-acc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, p: {} }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), acc = cuerpo.querySelector(".m9-acc"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sls = [], mostrada = false;
    function sliders() {
      ctl.innerHTML = ""; sls = []; st.p = {};
      PA[st.i].par.forEach(function (q) {
        st.p[q.n] = q.val;
        sls.push(U.slider(ctl, { et: "Parámetro <i>" + q.n + "</i>", min: q.min, max: q.max, step: q.step, val: q.val, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.p[q.n] = v; mostrada = false; pinta(); } }));
      });
    }
    function pinta() {
      var T = PA[st.i], p = st.p, R = T.rg; g.rango(R[0], R[1], R[2], R[3]); g.limpiar();
      g.curva(function (x) { return T.f(x, p); }, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
      var todas = true, filas = [];
      T.cond.forEach(function (c) {
        var ok = Math.abs(c.r(p)) < 1e-9; if (!ok) todas = false;
        var y = T.f(c.x, p);
        g.segmento(c.x, R[2], c.x, R[3], { clase: ok ? "c-ok" : "c-faint", dash: "4 5" });
        if (isFinite(y)) pto(g, c.x, y, ok ? "c-ok" : "c-red", false, 6);
        filas.push("<li>" + c.txt + " ⟶ " + (ok ? "<b style='color:var(--ok)'>se cumple</b>" : "<b style='color:var(--red)'>falta " + sg(c.r(p)) + "</b>") + "</li>");
      });
      lectura.innerHTML =
        fil("Condiciones (lo que falta para que valga 0)", "<ul class='lec-ul'>" + filas.join("") + "</ul>", todas ? "ok anch" : "red anch") +
        fil("Conclusión", todas ? "Con " + T.par.map(function (q) { return q.n + " = " + n2(p[q.n]); }).join(" y ") + " se cumplen <b>todas</b>" : "Todavía no: mueve los deslizadores", todas ? "ok anch" : "pen anch") +
        (mostrada ? fil("Cómo se calcula", lista(T.ec), "pen anch") : "");
      pie.innerHTML = "Cada condición del enunciado (pasar por un punto, extremo, inflexión…) se traduce en una <b>ecuación</b> sobre los parámetros: f(x₀) = y₀, f′(x₀) = 0, f″(x₀) = 0. Con dos incógnitas hacen falta dos ecuaciones.";
    }
    function carga(i) { st.i = i; mostrada = false; sliders(); pinta(); }
    U.boton(acc, "Mostrar la solución y su cálculo", function () {
      var T = PA[st.i]; T.par.forEach(function (q, j) { st.p[q.n] = q.sol; sls[j].set(q.sol); }); mostrada = true; pinta();
    }, "btn-comprobar");
    U.boton(acc, "Reiniciar", function () { carga(st.i); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -10, ymax: 14, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Función con parámetros" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PA.map(function (q, i) { return { k: String(i), t: q.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // PROBLEMA: optimización guiada, paso a paso
  // ============================================================
  var PR = [
    { t: "Caja abierta", x: "x = lado del cuadrado recortado (cm)", dom: [0, 12], x0: 1.5, u: "cm³", tipo: "máximo", xs: 4,
      f: function (x) { return x * (24 - 2 * x) * (24 - 2 * x); }, obj: "V(x) = x(24 − 2x)²",
      enun: "A una lámina cuadrada de cartón de 24 cm de lado se le recorta un cuadrado de lado x en cada esquina y se doblan los bordes para formar una caja sin tapa. ¿Qué x da el mayor volumen?",
      pasos: ["<b>Variable y objetivo.</b> x es el lado del cuadrado recortado. La base queda (24 − 2x) × (24 − 2x) y la altura es x: V(x) = x(24 − 2x)².",
              "<b>Dominio.</b> Hace falta x &gt; 0 y 24 − 2x &gt; 0: x ∈ (0, 12).",
              "<b>Derivada.</b> V′(x) = (24 − 2x)² + x·2(24 − 2x)(−2) = (24 − 2x)(24 − 6x). Se anula en x = 12 (fuera del dominio útil, V = 0) y en <b>x = 4</b>.",
              "<b>Clasificar.</b> V″(x) = 24x − 192 ⟹ V″(4) = −96 &lt; 0: máximo. (Además V(0) = V(12) = 0 en los bordes.)",
              "<b>Respuesta.</b> x = 4 cm; la caja mide 16 × 16 × 4 y su volumen máximo es <b>1024 cm³</b>."] },
    { t: "Lata de 500 cm³", x: "r = radio de la base (cm)", dom: [1.5, 10], x0: 7, u: "cm²", tipo: "mínimo", xs: Math.cbrt(250 / Math.PI),
      f: function (r) { return 2 * Math.PI * r * r + 1000 / r; }, obj: "S(r) = 2πr² + 1000/r",
      enun: "Una lata cilíndrica debe contener 500 cm³. ¿Qué radio y qué altura usan la menor cantidad de chapa (superficie total)?",
      pasos: ["<b>Variable y objetivo.</b> S = 2πr² + 2πrh (dos tapas y el lateral). La condición πr²h = 500 da h = 500/(πr²), y entonces S(r) = 2πr² + 1000/r.",
              "<b>Dominio.</b> r &gt; 0 (cuando r → 0 o r → ∞, S → ∞): se espera un mínimo interior.",
              "<b>Derivada.</b> S′(r) = 4πr − 1000/r² = 0 ⟹ r³ = 250/π ⟹ <b>r ≈ 4,30 cm</b>.",
              "<b>Clasificar.</b> S″(r) = 4π + 2000/r³ &gt; 0 para todo r &gt; 0: mínimo (y absoluto).",
              "<b>Respuesta.</b> r ≈ 4,30 cm y h = 500/(πr²) ≈ 8,60 cm (<b>h = 2r</b>); superficie mínima ≈ <b>348,7 cm²</b>."] },
    { t: "Cercado con valla central", x: "x = lado paralelo a la valla central (m)", dom: [0, 200], x0: 40, u: "m²", tipo: "máximo", xs: 100,
      f: function (x) { return x * (600 - 3 * x) / 2; }, obj: "A(x) = x(600 − 3x)/2",
      enun: "Con 600 m de valla se cerca un campo rectangular y se divide en dos partes iguales con otra valla paralela a uno de los lados. ¿Qué dimensiones dan la mayor superficie?",
      pasos: ["<b>Variable y objetivo.</b> Sean x los tres lados iguales (los dos exteriores y la división) e y los otros dos. Valla: 3x + 2y = 600 ⟹ y = (600 − 3x)/2. Área A = xy = x(600 − 3x)/2.",
              "<b>Dominio.</b> x &gt; 0 e y &gt; 0 ⟹ x ∈ (0, 200).",
              "<b>Derivada.</b> A′(x) = (600 − 6x)/2 = 300 − 3x = 0 ⟹ <b>x = 100</b>.",
              "<b>Clasificar.</b> A″(x) = −3 &lt; 0: máximo. En los bordes del dominio A → 0.",
              "<b>Respuesta.</b> x = 100 m, y = 150 m; superficie máxima <b>15 000 m²</b>."] },
    { t: "Beneficio por precio", x: "p = precio de venta (€)", dom: [20, 80], x0: 30, u: "€", tipo: "máximo", xs: 50,
      f: function (p) { return (p - 20) * (400 - 5 * p); }, obj: "B(p) = (p − 20)(400 − 5p)",
      enun: "Un producto cuesta 20 € fabricarlo. Si se vende a p euros, se venden 400 − 5p unidades. ¿Qué precio maximiza el beneficio y cuánto vale éste?",
      pasos: ["<b>Variable y objetivo.</b> Beneficio = (precio − coste) · unidades: B(p) = (p − 20)(400 − 5p) = −5p² + 500p − 8000.",
              "<b>Dominio.</b> Vender sin pérdida y con demanda positiva: 20 ≤ p ≤ 80 (a p = 80 no se vende nada).",
              "<b>Derivada.</b> B′(p) = −10p + 500 = 0 ⟹ <b>p = 50</b>.",
              "<b>Clasificar.</b> B″ = −10 &lt; 0: máximo. En los bordes B(20) = B(80) = 0, mucho menor.",
              "<b>Respuesta.</b> Precio óptimo 50 €; se venden 150 unidades y el beneficio es <b>4500 €</b>."] },
    { t: "Distancia mínima a una curva", x: "x = abscisa del punto (x, √x)", dom: [0, 6], x0: 1, u: "(distancia)²", tipo: "mínimo", xs: 3.5,
      f: function (x) { return (x - 4) * (x - 4) + x; }, obj: "d²(x) = (x − 4)² + x",
      enun: "¿Qué punto de la curva y = √x está más cerca del punto (4, 0)?",
      pasos: ["<b>Variable y objetivo.</b> Un punto de la curva es (x, √x); su distancia a (4, 0) es d = √((x − 4)² + x). Minimizar d equivale a minimizar <b>d² = (x − 4)² + x</b> (la raíz es creciente), que es más cómodo.",
              "<b>Dominio.</b> √x exige x ≥ 0: [0, +∞). Cuando x → ∞, d² → ∞.",
              "<b>Derivada.</b> (d²)′ = 2(x − 4) + 1 = 2x − 7 = 0 ⟹ <b>x = 7/2</b>.",
              "<b>Clasificar.</b> (d²)″ = 2 &gt; 0: mínimo. En el borde x = 0, d² = 16, mayor que el valor en x = 7/2.",
              "<b>Respuesta.</b> El punto es (7/2, √(7/2)) ≈ (3,5; 1,87); d² = 15/4, luego la distancia mínima es <b>√15/2 ≈ 1,94</b>."] },
    { t: "Ventana normanda", x: "x = radio del semicírculo (m)", dom: [0, 1.16], x0: 0.3, u: "m²", tipo: "máximo", xs: 6 / (4 + Math.PI),
      f: function (x) { return 6 * x - (2 + Math.PI / 2) * x * x; }, obj: "A(x) = 6x − (2 + π/2)x²",
      enun: "Una ventana tiene forma de rectángulo coronado por un semicírculo cuyo diámetro es la base del rectángulo. Su perímetro es 6 m. ¿Qué radio da la mayor superficie (mayor luz)?",
      pasos: ["<b>Variable y objetivo.</b> Radio x (base 2x) y altura lateral y. Perímetro: 2x + 2y + πx = 6 ⟹ y = (6 − 2x − πx)/2. Área: A = 2xy + πx²/2 = 6x − (2 + π/2)x².",
              "<b>Dominio.</b> x &gt; 0 e y ≥ 0 ⟹ 0 &lt; x ≤ 6/(2 + π) ≈ 1,167.",
              "<b>Derivada.</b> A′(x) = 6 − (4 + π)x = 0 ⟹ <b>x = 6/(4 + π) ≈ 0,840</b>, dentro del dominio.",
              "<b>Clasificar.</b> A″ = −(4 + π) &lt; 0: máximo.",
              "<b>Respuesta.</b> x ≈ 0,840 m (base 1,68 m, y ≈ 0,840 m: y = x). Área máxima = 3x = 18/(4 + π) ≈ <b>2,52 m²</b>."] }
  ];
  B.w.m2_problema = function (host) {
    var cuerpo = B.caja(host, "Problema", "Optimización guiada: del enunciado a la respuesta en cinco pasos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><p class="m9-enun"></p><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="ctl m9-acc"></div><div class="m9-sol"></div><p class="w-pie"></p>';
    var st = { i: 0, x: 1, n: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), solEl = cuerpo.querySelector(".m9-sol"), pie = cuerpo.querySelector(".w-pie"), enun = cuerpo.querySelector(".m9-enun"), sl;
    sl = U.slider(ctl, { et: "Valor de <i>x</i>", min: 0, max: 10, step: 0.01, val: 1, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function carga(i) {
      st.i = i; st.n = 0; var P = PR[i]; sl.input.min = P.dom[0]; sl.input.max = P.dom[1]; sl.input.step = P.dom[1] - P.dom[0] < 3 ? 0.001 : 0.01;
      st.x = P.x0; sl.set(P.x0); pinta();
    }
    function pinta() {
      var P = PR[st.i], f = P.f, x = st.x, d = D.d1(f, x);
      enun.innerHTML = "<b>" + P.t + ".</b> " + P.enun;
      var yr = F.rangoY(f, P.dom[0], P.dom[1]);
      g.rango(P.dom[0], P.dom[1], Math.min(yr[0], 0), yr[1]); g.limpiar();
      g.curva(f, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
      if (st.n >= 4) { g.segmento(P.xs, 0, P.xs, f(P.xs), { clase: "c-ok", dash: "4 4" }); pto(g, P.xs, f(P.xs), "c-ok", false, 8); }
      g.segmento(x, 0, x, f(x), { clase: "c-faint", dash: "3 4" }); pto(g, x, f(x), "c-red", false, 6);
      var W = (P.dom[1] - P.dom[0]) * 0.12; g.segmento(x - W, f(x) - d * W, x + W, f(x) + d * W, { clase: "c-red", dash: "5 4" });
      lectura.innerHTML = fil("Función objetivo", P.obj, "pen anch") + fil("Variable", P.x, "pen anch") +
        fil("Tu valor", "x = " + fmt(x, 3) + " ⟶ " + fmt(f(x), 3) + " " + P.u, "red") +
        fil("f′ en tu valor", sg(d) + (Math.abs(d) < 0.02 * (yr[1] - yr[0]) / (P.dom[1] - P.dom[0]) ? " ⟶ tangente casi horizontal" : (d > 0) === (P.tipo === "máximo") ? " (aún puedes mejorar)" : " (aún puedes mejorar, al otro lado)"), "pen");
      solEl.innerHTML = st.n ? lista(P.pasos.slice(0, st.n)) : "";
      pie.innerHTML = "Mueve x para «buscar a ojo» el " + P.tipo + ": en el óptimo la tangente es <b>horizontal</b> (f′ = 0). Pulsa «Siguiente paso» para ver cómo se plantea y se justifica.";
    }
    var acc = cuerpo.querySelector(".m9-acc");
    U.boton(acc, "Siguiente paso", function () { st.n = Math.min(5, st.n + 1); pinta(); }, "btn-comprobar");
    U.boton(acc, "Reiniciar pasos", function () { st.n = 0; pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 0, ymax: 10, w: 600, h: 300, etx: "x", ety: "", etiqueta: "Función objetivo" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PR.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // L'HÔPITAL: f/g frente a f′/g′ (y cuándo no sirve)
  // ============================================================
  var LH = [
    { t: "sen x / x  (x → 0)", xs: [0.5, 0.1, 0.01, 0.001], fs: [Math.sin, Math.cos], gs: [function (x) { return x; }, function () { return 1; }], L: 1,
      nota: "0/0. f′/g′ = cos x / 1 → 1." },
    { t: "(eˣ − 1 − x)/x²  (x → 0)", xs: [0.5, 0.1, 0.01, 0.001], fs: [function (x) { return Math.exp(x) - 1 - x; }, function (x) { return Math.exp(x) - 1; }, Math.exp], gs: [function (x) { return x * x; }, function (x) { return 2 * x; }, function () { return 2; }], L: 0.5,
      nota: "0/0, y tras derivar una vez SIGUE siendo 0/0: se vuelve a aplicar. f″/g″ = eˣ/2 → 1/2." },
    { t: "ln x / x²  (x → +∞)", xs: [10, 100, 1000, 10000], fs: [Math.log, function (x) { return 1 / x; }], gs: [function (x) { return x * x; }, function (x) { return 2 * x; }], L: 0,
      nota: "∞/∞. f′/g′ = 1/(2x²) → 0. Coincide con la jerarquía de infinitos: x² crece más que ln x." },
    { t: "x² / eˣ  (x → +∞)", xs: [10, 20, 30, 40], fs: [function (x) { return x * x; }, function (x) { return 2 * x; }, function () { return 2; }], gs: [Math.exp, Math.exp, Math.exp], L: 0,
      nota: "∞/∞ dos veces seguidas: f″/g″ = 2/eˣ → 0. La exponencial gana a cualquier potencia." },
    { t: "(tg x − x)/x³  (x → 0)", xs: [0.5, 0.1, 0.01, 0.001], fs: [function (x) { return Math.tan(x) - x; }, function (x) { var c = Math.cos(x); return 1 / (c * c) - 1; }, function (x) { var c = Math.cos(x); return 2 * Math.sin(x) / (c * c * c); }], gs: [function (x) { return x * x * x; }, function (x) { return 3 * x * x; }, function (x) { return 6 * x; }], L: 1 / 3,
      nota: "0/0 dos veces seguidas. f″/g″ = 2 sen x/(6x cos³x) → 1/3 usando el límite notable sen x/x → 1." },
    { t: "(x + sen x)/x  (x → +∞)  ¡TRAMPA!", xs: [10, 100, 1000, 10000], fs: [function (x) { return x + Math.sin(x); }, function (x) { return 1 + Math.cos(x); }], gs: [function (x) { return x; }, function () { return 1; }], L: 1, trampa: true,
      nota: "∞/∞, pero f′/g′ = 1 + cos x NO tiene límite (oscila entre 0 y 2). L'Hôpital no dice nada; el límite existe y vale 1 (dividiendo entre x: 1 + sen x/x → 1)." }
  ];
  B.w.m2_lhopital = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "L'Hôpital: ¿se parecen f/g y f′/g′ cerca del punto?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="lectura anch"></div><div class="m9-tab"></div><p class="w-pie"></p>';
    var st = { i: 0 }, lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".m9-tab"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var T = LH[st.i], niv = T.fs.length, cab = ["x", "f / g"], i, k;
      for (k = 1; k < niv; k++) cab.push("f" + (k === 1 ? "′" : "″") + " / g" + (k === 1 ? "′" : "″"));
      var filas = T.xs.map(function (x) {
        var celdas = [x >= 1e4 ? "10<sup>4</sup>" : fmt(x, x < 1 ? (x <= 0.001 ? 3 : x <= 0.01 ? 2 : 1) : 0)];
        for (k = 0; k < niv; k++) celdas.push(fmt(T.fs[k](x) / T.gs[k](x), 5));
        return "<tr><td>" + celdas.join("</td><td>") + "</td></tr>";
      });
      tab.innerHTML = "<table class='m9-t'><thead><tr><th>" + cab.join("</th><th>") + "</th></tr></thead><tbody>" + filas.join("") + "</tbody></table>";
      lectura.innerHTML = fil("Límite", T.trampa ? "f/g → 1, pero f′/g′ no tiene límite" : sg(T.L) === "0,333" ? "1/3" : sg(T.L) === "0,5" ? "1/2" : sg(T.L), T.trampa ? "red" : "ok") + fil("Comentario", T.nota, T.trampa ? "red anch" : "pen anch");
      pie.innerHTML = "Regla: si f/g es 0/0 o ∞/∞ y <b>existe</b> lím f′/g′, entonces lím f/g = lím f′/g′. Fíjate en que las columnas de derivadas se acercan al mismo número que la primera (salvo en la trampa, donde f′/g′ ni siquiera converge).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), LH.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };
})(window);
