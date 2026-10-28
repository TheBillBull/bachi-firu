/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 8 (Derivadas)
   m2t8_trozos  (función a trozos con parámetros: ecuaciones de continuidad y de derivabilidad, y el valor que «empalma suave»)
   m2t8_rolle   (teorema de Rolle: comprueba las tres hipótesis y marca los puntos c con tangente horizontal)
   m2t8_hopital (L'Hôpital: tabla numérica de f/g y f′/g′ al acercarse al punto)
   Reutiliza los motores de Matemáticas I (B.lab.fun, B.lab.der). Las cifras se verifican con herramientas/verificar_mates2_t8.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun, D = B.lab.der;
  var fil = F.fil, pto = F.pto;
  var T8 = B.lab.t8 = {};

  // ---------------- 1. Función a trozos con parámetros ----------------
  // L y R: trozos izquierdo y derecho; dL, dR: sus derivadas; sol: valores que empalman suave
  var PT = T8.trozos = [
    { t: "Polinomio y logaritmo en x = 1", c: 1, par: ["a", "b"], v: [0, 0], sol: [-1, 3], rg: [-1, 3.5, -3, 5],
      L: function (x, a, b) { return a * x * x + b * x; }, R: function (x) { return 2 + Math.log(x); },
      dL: function (x, a, b) { return 2 * a * x + b; }, dR: function (x) { return 1 / x; },
      txt: "ax² + bx si x ≤ 1 · 2 + ln x si x > 1", eq: "a + b = 2 (continuidad) · 2a + b = 1 (derivabilidad)" },
    { t: "Exponencial y parábola en x = 0", c: 0, par: ["a", "b"], v: [0, 0], sol: [2, 1], rg: [-3, 2, -1, 8],
      L: function (x, a) { return Math.exp(x) + a; }, R: function (x, a, b) { return x * x + b * x + 3; },
      dL: function (x) { return Math.exp(x); }, dR: function (x, a, b) { return 2 * x + b; },
      txt: "eˣ + a si x &lt; 0 · x² + bx + 3 si x ≥ 0", eq: "1 + a = 3 (continuidad) · 1 = b (derivabilidad)" },
    { t: "Recta y parábola en x = 2", c: 2, par: ["a", "b"], v: [0, 0], sol: [4, -4], rg: [-1, 4, -9, 12],
      L: function (x, a, b) { return a * x + b; }, R: function (x) { return x * x; },
      dL: function (x, a) { return a; }, dR: function (x) { return 2 * x; },
      txt: "ax + b si x ≤ 2 · x² si x &gt; 2", eq: "2a + b = 4 (continuidad) · a = 4 (derivabilidad)" },
    { t: "Con valor absoluto: |x − 1|·(x + a)", c: 1, par: ["a"], v: [2], sol: [-1], rg: [-2, 3.5, -4, 6],
      L: function (x, a) { return -(x - 1) * (x + a); }, R: function (x, a) { return (x - 1) * (x + a); },
      dL: function (x, a) { return -(2 * x - 1 + a); }, dR: function (x, a) { return 2 * x - 1 + a; },
      txt: "|x − 1|·(x + a)", eq: "continua siempre · −(1 + a) = 1 + a (derivabilidad)" }
  ];
  B.w.m2t8_trozos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Función a trozos: ¿para qué parámetros «empalma suave»?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, a: 0, b: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sb, bt;
    sa = U.slider(ctl, { et: "Parámetro <i>a</i>", min: -4, max: 4, step: 0.5, val: 0, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sb = U.slider(ctl, { et: "Parámetro <i>b</i>", min: -4, max: 4, step: 0.5, val: 0, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    bt = document.createElement("button"); bt.type = "button"; bt.className = "chip-btn"; bt.textContent = "Poner los valores que empalman"; bt.setAttribute("data-solve", "1"); ctl.appendChild(bt);
    bt.onclick = function () { var P = PT[st.i]; st.a = P.sol[0]; sa.set(st.a); if (P.par.length > 1) { st.b = P.sol[1]; sb.set(st.b); } pinta(); };
    function pinta() {
      var P = PT[st.i], a = st.a, b = st.b, c = P.c;
      sb.el.style.display = P.par.length > 1 ? "" : "none";
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      var Lc = P.L(c, a, b), Rc = P.R(c, a, b), dl = P.dL(c, a, b), dr = P.dR(c, a, b);
      g.curva(function (x) { return x <= c ? P.L(x, a, b) : NaN; }, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      g.curva(function (x) { return x > c ? P.R(x, a, b) : NaN; }, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      var W = (P.rg[1] - P.rg[0]) * 0.3;
      g.segmento(c - W, Lc - dl * W, c, Lc, { clase: "c-ok", dash: "6 4" });
      g.segmento(c, Rc, c + W, Rc + dr * W, { clase: "c-red", dash: "6 4" });
      pto(g, c, Lc, "c-ok", false, 6); pto(g, c, Rc, "c-red", Math.abs(Lc - Rc) > 1e-9, 6);
      var cont = Math.abs(Lc - Rc) < 1e-9, der = cont && Math.abs(dl - dr) < 1e-9;
      lectura.innerHTML = fil("Función", P.txt, "pen ancho") +
        fil("Límite por la izquierda · por la derecha en x = " + fmt(c, 0), fmt(Lc, 3) + " · " + fmt(Rc, 3), cont ? "ok" : "red") +
        fil("¿Continua?", cont ? "sí" : "no: hay un salto de " + fmt(Math.abs(Lc - Rc), 3), cont ? "ok" : "red") +
        fil("Pendiente por la izquierda · por la derecha", fmt(dl, 3) + " · " + fmt(dr, 3), der ? "ok" : "red") +
        fil("¿Derivable en x = " + fmt(c, 0) + "?", der ? "sí: f′(" + fmt(c, 0) + ") = " + fmt(dl, 3) : cont ? "no: es continua pero tiene un punto angular" : "no: ni siquiera es continua", der ? "ok ancho" : "red ancho");
      pie.innerHTML = "Ecuaciones que hay que resolver: <b>" + P.eq + "</b>. Verde: tangente por la izquierda; rojo: por la derecha. Si coinciden, la gráfica empalma sin pico. Valores correctos: " +
        P.par.map(function (n, k) { return "<b>" + n + " = " + fmt(P.sol[k], 1) + "</b>"; }).join(", ") + ".";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 3, ymin: -3, ymax: 5, w: 600, h: 320, etiqueta: "Función a trozos" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PT.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) {
      st.i = +k; var P = PT[st.i]; st.a = P.v[0]; sa.set(st.a); if (P.par.length > 1) { st.b = P.v[1]; sb.set(st.b); } pinta();
    });
    pinta();
  };

  // ---------------- 2. Teorema de Rolle ----------------
  var PR = T8.rolle = [
    { t: "x² − 4x + 3 en [1, 3]", f: function (x) { return x * x - 4 * x + 3; }, a: 1, b: 3, rg: [0, 4, -2, 4], cont: true, der: true },
    { t: "x³ − 3x en [0, √3]", f: function (x) { return x * x * x - 3 * x; }, a: 0, b: Math.sqrt(3), rg: [-0.5, 2.2, -3, 1.5], cont: true, der: true },
    { t: "cos x en [0, 2π]", f: Math.cos, a: 0, b: 2 * Math.PI, rg: [-0.5, 6.8, -1.6, 1.6], cont: true, der: true },
    { t: "|x| en [−1, 1]", f: Math.abs, a: -1, b: 1, rg: [-1.5, 1.5, -0.5, 1.6], cont: true, der: false, falla: "f no es derivable en x = 0 (punto angular)" },
    { t: "x² en [0, 1]", f: function (x) { return x * x; }, a: 0, b: 1, rg: [-0.5, 1.5, -0.5, 1.5], cont: true, der: true, falla: "f(0) ≠ f(1)" },
    { t: "1/x² en [−1, 1]", f: function (x) { return 1 / (x * x); }, a: -1, b: 1, rg: [-1.5, 1.5, -0.5, 6], cont: false, der: false, falla: "f no está definida (ni es continua) en x = 0" }
  ];
  B.w.m2t8_rolle = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Teorema de Rolle: las tres hipótesis y el punto c");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0 }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PR[st.i], f = P.f, a = P.a, b = P.b, fa = f(a), fb = f(b);
      g.rango(P.rg[0], P.rg[1], P.rg[2], P.rg[3]); g.limpiar();
      g.curva(f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      g.segmento(a, P.rg[2], a, P.rg[3], { clase: "c-faint", dash: "3 4" }); g.segmento(b, P.rg[2], b, P.rg[3], { clase: "c-faint", dash: "3 4" });
      var igual = isFinite(fa) && isFinite(fb) && Math.abs(fa - fb) < 1e-9, ok = P.cont && P.der && igual;
      var cs = ok ? D.cambios(function (x) { return D.d1(f, x); }, a + 1e-6, b - 1e-6, 1200).map(function (e) { return e.x; }) : [];
      if (isFinite(fa)) pto(g, a, fa, "c-red", false, 6);
      if (isFinite(fb)) pto(g, b, fb, "c-red", false, 6);
      var W = (b - a) * 0.25;
      cs.forEach(function (c) { var fc = f(c); g.segmento(c - W, fc, c + W, fc, { clase: "c-ok", dash: "6 4" }); pto(g, c, fc, "c-ok", false, 6); });
      var sino = function (v) { return v ? "sí" : "no"; };
      lectura.innerHTML = fil("1) Continua en [a, b]", sino(P.cont), P.cont ? "ok" : "red") + fil("2) Derivable en (a, b)", sino(P.der), P.der ? "ok" : "red") +
        fil("3) f(a) = f(b)", isFinite(fa) && isFinite(fb) ? fmt(fa, 3) + " y " + fmt(fb, 3) + ": " + sino(igual) : "no se puede evaluar", igual ? "ok" : "red") +
        fil("Puntos c con f′(c) = 0", ok ? cs.map(function (c) { return "c = " + fmt(c, 4); }).join(" · ") : "el teorema no se puede aplicar", ok ? "ok ancho" : "red ancho");
      pie.innerHTML = ok ? "Se cumplen las tres hipótesis, así que existe al menos un c ∈ (a, b) con <b>f′(c) = 0</b> (tangente horizontal, en verde)." :
        "<b>No se puede aplicar Rolle:</b> " + P.falla + ". Ojo: que falle una hipótesis no prueba que no haya tangente horizontal; solo que el teorema no la garantiza.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 4, ymin: -2, ymax: 4, w: 600, h: 300, etiqueta: "Teorema de Rolle" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PR.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ---------------- 3. L'Hôpital ----------------
  var PH = T8.hopital = [
    { t: "sen x / x  (x → 0)", f: Math.sin, g: function (x) { return x; }, df: Math.cos, dg: function () { return 1; }, tipo: "0/0", lim: "1", pasos: "cos x / 1 → 1", xs: [0.5, 0.1, 0.01, 0.001] },
    { t: "(1 − cos x) / x²  (x → 0)", f: function (x) { return 1 - Math.cos(x); }, g: function (x) { return x * x; }, df: Math.sin, dg: function (x) { return 2 * x; }, tipo: "0/0", lim: "1/2", pasos: "sen x / 2x sigue siendo 0/0; otra vez: cos x / 2 → 1/2", xs: [0.5, 0.1, 0.01, 0.001] },
    { t: "(eˣ − 1 − x) / x²  (x → 0)", f: function (x) { return Math.exp(x) - 1 - x; }, g: function (x) { return x * x; }, df: function (x) { return Math.exp(x) - 1; }, dg: function (x) { return 2 * x; }, tipo: "0/0", lim: "1/2", pasos: "(eˣ − 1)/2x sigue siendo 0/0; otra vez: eˣ / 2 → 1/2", xs: [0.5, 0.1, 0.01, 0.001] },
    { t: "ln x / (x − 1)  (x → 1)", f: Math.log, g: function (x) { return x - 1; }, df: function (x) { return 1 / x; }, dg: function () { return 1; }, tipo: "0/0", lim: "1", pasos: "(1/x) / 1 → 1", xs: [1.5, 1.1, 1.01, 1.001] },
    { t: "eˣ / x²  (x → +∞)", f: Math.exp, g: function (x) { return x * x; }, df: Math.exp, dg: function (x) { return 2 * x; }, tipo: "∞/∞", lim: "+∞", pasos: "eˣ/2x sigue siendo ∞/∞; otra vez: eˣ / 2 → +∞", xs: [5, 10, 20, 40] },
    { t: "ln x / x  (x → +∞)", f: Math.log, g: function (x) { return x; }, df: function (x) { return 1 / x; }, dg: function () { return 1; }, tipo: "∞/∞", lim: "0", pasos: "(1/x) / 1 = 1/x → 0", xs: [10, 100, 1000, 10000] },
    { t: "x·ln x  (x → 0⁺) = ln x / (1/x)", f: Math.log, g: function (x) { return 1 / x; }, df: function (x) { return 1 / x; }, dg: function (x) { return -1 / (x * x); }, tipo: "∞/∞", lim: "0", pasos: "(1/x) / (−1/x²) = −x → 0", xs: [0.5, 0.1, 0.01, 0.001] }
  ];
  B.w.m2t8_hopital = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "L'Hôpital: ¿f/g y f′/g′ se acercan al mismo número?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="lectura anch"></div><div data-tab></div><p class="w-pie"></p>';
    var st = { i: 0 }, lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector("[data-tab]"), pie = cuerpo.querySelector(".w-pie");
    function n4(v) { return isFinite(v) ? (Math.abs(v) >= 1e5 ? v.toExponential(2).replace(".", ",") : fmt(v, 4)) : "—"; }
    function pinta() {
      var P = PH[st.i], filas = P.xs.map(function (x) {
        return "<tr><td>" + fmt(x, 3) + "</td><td>" + n4(P.f(x) / P.g(x)) + "</td><td>" + n4(P.df(x) / P.dg(x)) + "</td></tr>";
      }).join("");
      lectura.innerHTML = fil("Indeterminación", P.tipo, "red") + fil("Límite (por L'Hôpital)", P.lim, "ok") + fil("Derivando arriba y abajo", P.pasos, "pen ancho");
      tab.innerHTML = "<table class='lamina-table'><thead><tr><th>x</th><th>f(x)/g(x)</th><th>f′(x)/g′(x)</th></tr></thead><tbody>" + filas + "</tbody></table>";
      pie.innerHTML = "Las dos columnas tienden al mismo valor (" + P.lim + "): eso es lo que garantiza el teorema <b>cuando el cociente de derivadas tiene límite</b>. Solo se aplica a 0/0 o ∞/∞; antes de derivar, comprueba la forma.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PH.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };
})(window);
