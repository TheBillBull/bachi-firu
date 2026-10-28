/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 7 (Límites de funciones y continuidad)
   m2_empalme (función a trozos con parámetros que se ve empalmar) ·
   m2_numero_e (la indeterminación 1<sup>∞</sup> y el número e, con tabla numérica).
   Reutiliza el motor de Matemáticas I: B.lab.fun (parser de funciones, lecturas, puntos).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var fil = F.fil, pto = F.pto, etq = F.etq, INF = Infinity;

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t7-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t7-estilos";
    s.textContent =
      ".m7-pasos{margin:6px 0 0;padding:0 0 0 1.2em;font-size:14.5px;line-height:1.55}" +
      ".m7-pasos li{margin:3px 0;overflow-wrap:anywhere}" +
      ".m7-t{width:100%;border-collapse:collapse;font:14px var(--math);margin-top:6px}" +
      ".m7-t th,.m7-t td{padding:4px 8px;border-bottom:1px solid var(--line,rgba(128,128,128,.25));text-align:right}" +
      ".m7-t th{font-size:12px;color:var(--ink-faint);font-weight:600}" +
      "@media(max-width:520px){.m7-t{font-size:12.5px}.m7-t th,.m7-t td{padding:3px 4px}}";
    document.head.appendChild(s);
  })();

  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 3).replace(/,000$/, "").replace(/(,\d\d)0$/, "$1").replace(/(,\d)0$/, "$1"); }
  function sg(x) { return x < 0 ? "−" + n2(-x) : n2(x); }

  // ============================================================
  // EMPALME: la función a trozos con parámetros, continua solo para el valor justo
  // ============================================================
  var EM = [
    { t: "a·x + 1  /  x² − 1", rg: [-3, 5, -3, 10], x0: 2,
      par: [{ n: "a", min: -2, max: 4, step: 0.25, val: 0, sol: 1 }],
      tr: [{ f: function (x, p) { return p.a * x + 1; }, txt: function (p) { return n2(p.a) + "x + 1"; }, a: -INF, b: 2, ca: false, cb: false },
           { f: function (x) { return x * x - 1; }, txt: function () { return "x² − 1"; }, a: 2, b: INF, ca: true, cb: false }],
      ec: ["En x = 2: lím<sub>x→2⁻</sub> = 2a + 1 y lím<sub>x→2⁺</sub> = f(2) = 2² − 1 = 3.", "Continuidad ⟺ 2a + 1 = 3 ⟹ a = 1."] },
    { t: "Dos parámetros a y b", rg: [-4, 4, -2, 5], x0: -1,
      par: [{ n: "a", min: -3, max: 3, step: 0.25, val: 0, sol: 0.5 }, { n: "b", min: -3, max: 3, step: 0.25, val: 0, sol: 1.5 }],
      tr: [{ f: function (x) { return x + 2; }, txt: function () { return "x + 2"; }, a: -INF, b: -1, ca: false, cb: false },
           { f: function (x, p) { return p.a * x + p.b; }, txt: function (p) { return n2(p.a) + "x + " + n2(p.b); }, a: -1, b: 1, ca: true, cb: true },
           { f: function (x) { return 3 - x; }, txt: function () { return "3 − x"; }, a: 1, b: INF, ca: false, cb: false }],
      ec: ["En x = −1: lím⁻ = −1 + 2 = 1 y f(−1) = −a + b ⟹ −a + b = 1.", "En x = 1: f(1) = a + b y lím⁺ = 3 − 1 = 2 ⟹ a + b = 2.", "Se suman: 2b = 3 ⟹ b = 3/2 y a = 1/2."] },
    { t: "sen(ax)/x  y  b·cos x + 1", rg: [-3, 3, -2, 9], x0: 0,
      par: [{ n: "a", min: 0, max: 8, step: 0.5, val: 2, sol: 6 }, { n: "b", min: 0, max: 8, step: 0.5, val: 2, sol: 5 }],
      tr: [{ f: function (x, p) { return Math.sin(p.a * x) / x; }, txt: function (p) { return "sen(" + n2(p.a) + "x)/x"; }, a: -INF, b: 0, ca: false, cb: false },
           { f: function () { return 6; }, txt: function () { return "6"; }, a: 0, b: 0, ca: true, cb: true },
           { f: function (x, p) { return p.b * Math.cos(x) + 1; }, txt: function (p) { return n2(p.b) + "·cos x + 1"; }, a: 0, b: INF, ca: false, cb: false }],
      ec: ["lím<sub>x→0⁻</sub> sen(ax)/x = a (límite notable) y f(0) = 6 ⟹ a = 6.", "lím<sub>x→0⁺</sub> (b·cos x + 1) = b + 1 = f(0) = 6 ⟹ b = 5."] },
    { t: "Hueco que se rellena con k", rg: [-1, 8, -1, 2], x0: 3,
      par: [{ n: "k", min: -1, max: 1, step: 0.05, val: 0, sol: 0.25 }],
      tr: [{ f: function (x) { return (Math.sqrt(x + 1) - 2) / (x - 3); }, txt: function () { return "(√(x+1) − 2)/(x − 3)"; }, a: -INF, b: 3, ca: false, cb: false },
           { f: function (x, p) { return p.k; }, txt: function (p) { return n2(p.k); }, a: 3, b: 3, ca: true, cb: true },
           { f: function (x) { return (Math.sqrt(x + 1) - 2) / (x - 3); }, txt: function () { return "(√(x+1) − 2)/(x − 3)"; }, a: 3, b: INF, ca: false, cb: false }],
      ec: ["Multiplicando por el conjugado: (√(x+1) − 2)/(x − 3) = 1/(√(x+1) + 2) cuando x ≠ 3.", "lím<sub>x→3</sub> = 1/(2 + 2) = 1/4, así que f(3) = k debe valer 1/4."] }
  ];

  B.w.m2_empalme = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Función a trozos: ¿qué parámetro la hace continua?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="ctl m7-acc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, p: {} }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), acc = cuerpo.querySelector(".m7-acc"),
        lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sls = [], mostrada = false;

    function contiene(t, x) { return (x > t.a && x < t.b) || (x === t.a && t.ca) || (x === t.b && t.cb); }
    function cond(t) {
      if (t.a === t.b) return "x = " + n2(t.a);
      var lo = isFinite(t.a), hi = isFinite(t.b);
      if (lo && hi) return n2(t.a) + (t.ca ? " ≤ " : " &lt; ") + "x" + (t.cb ? " ≤ " : " &lt; ") + n2(t.b);
      return lo ? "x " + (t.ca ? "≥" : "&gt;") + " " + n2(t.a) : "x " + (t.cb ? "≤" : "&lt;") + " " + n2(t.b);
    }
    // valor de un trozo en c; si no está definido (0/0) se acerca por el lado indicado
    function valor(t, c, lado, p) {
      var v = t.f(c, p);
      if (isFinite(v)) return v;
      return t.f(c + lado * 1e-7, p);
    }
    function sliders() {
      ctl.innerHTML = ""; sls = [];
      var P = EM[st.i].par; st.p = {};
      P.forEach(function (q) {
        st.p[q.n] = q.val;
        sls.push(U.slider(ctl, { et: "Parámetro <i>" + q.n + "</i>", min: q.min, max: q.max, step: q.step, val: q.val, fmt: function (v) { return fmt(v, 2); }, on: function (v) { st.p[q.n] = v; mostrada = false; pinta(); } }));
      });
    }
    function pinta() {
      var T = EM[st.i], p = st.p, R = T.rg; g.rango(R[0], R[1], R[2], R[3]); g.limpiar();
      T.tr.forEach(function (t) {
        if (t.a === t.b) { var v0 = t.f(t.a, p); if (isFinite(v0)) pto(g, t.a, v0, "c-pen", false, 5); return; }
        var a = Math.max(t.a, R[0] - 1), b = Math.min(t.b, R[1] + 1);
        g.curva(function (x) { return t.f(x, p); }, { clase: "c-pen", x0: a, x1: b, n: 500 }).setAttribute("stroke-width", 3);
      });
      // puntos de ruptura
      var cs = []; T.tr.forEach(function (t) { [t.a, t.b].forEach(function (c) { if (isFinite(c) && cs.indexOf(c) < 0) cs.push(c); }); }); cs.sort(function (u, v) { return u - v; });
      var filas = [], todo = true;
      cs.forEach(function (c) {
        var izq = null, der = null, en = null;
        T.tr.forEach(function (t) {
          if (t.b === c && t.a < c) izq = valor(t, c, -1, p);
          if (t.a === c && t.b > c) der = valor(t, c, 1, p);
          if (contiene(t, c)) en = valor(t, c, 0, p);
        });
        if (en == null) en = null;
        var ig = function (u, v) { return Math.abs(u - v) < 1e-4; };
        var okL = izq == null || en == null || ig(izq, en), okR = der == null || en == null || ig(der, en), ok = okL && okR && (izq == null || der == null || ig(izq, der));
        if (!ok) todo = false;
        if (izq != null) pto(g, c, izq, ok ? "c-ok" : "c-red", !ok || en == null, 5);
        if (der != null && !ok) pto(g, c, der, "c-red", true, 5);
        if (en != null) pto(g, c, en, ok ? "c-ok" : "c-red", false, 6);
        g.segmento(c, R[2], c, R[3], { clase: "c-faint", dash: "4 5" });
        filas.push("En <b>x = " + n2(c) + "</b>: por la izquierda " + (izq == null ? "—" : n2(izq)) + ", por la derecha " + (der == null ? "—" : n2(der)) + ", f = " + (en == null ? "—" : n2(en)) + " ⟶ " +
          (ok ? "<b style='color:var(--ok)'>empalma (continua)</b>" : "<b style='color:var(--red)'>no empalma</b>" + (izq != null && der != null && !ig(izq, der) ? " (salto de " + n2(Math.abs(der - izq)) + ")" : "")));
      });
      var sol = T.par.every(function (q) { return Math.abs(p[q.n] - q.sol) < 1e-9; });
      lectura.innerHTML =
        fil("Trozos", "<ul class='lec-ul'>" + T.tr.map(function (t) { return "<li>" + t.txt(p) + "  si  " + cond(t) + "</li>"; }).join("") + "</ul>", "pen") +
        fil("Empalmes", "<ul class='lec-ul'>" + filas.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>", todo ? "ok anch" : "red anch") +
        fil("Conclusión", todo ? "f es <b>continua en todo ℝ</b>" + (sol ? " con " + T.par.map(function (q) { return q.n + " = " + n2(q.sol); }).join(" y ") : "") : "f <b>no es continua</b>: mueve los deslizadores hasta que el hueco o el salto desaparezca", todo ? "ok ancho" : "red ancho") +
        (mostrada ? fil("Cómo se calcula", "<ol class='m7-pasos'>" + T.ec.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>", "pen anch") : "");
      pie.innerHTML = "Para que una función a trozos sea continua en un punto de ruptura hay que igualar <b>límite por la izquierda = límite por la derecha = valor de f</b>. Cada igualdad es una ecuación para los parámetros.";
    }
    function carga(i) { st.i = i; mostrada = false; sliders(); g.rango(EM[i].rg[0], EM[i].rg[1], EM[i].rg[2], EM[i].rg[3]); pinta(); }
    U.boton(acc, "Mostrar la solución y su cálculo", function () {
      var T = EM[st.i]; T.par.forEach(function (q, j) { st.p[q.n] = q.sol; sls[j].set(q.sol); }); mostrada = true; pinta();
    }, "btn-comprobar");
    U.boton(acc, "Reiniciar", function () { carga(st.i); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 5, ymin: -3, ymax: 10, w: 600, h: 320, etx: "x", ety: "y", etiqueta: "Función a trozos con parámetros" });
    U.fichas(cuerpo.querySelector("[data-pre]"), EM.map(function (q, i) { return { k: String(i), t: q.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // NUMERO_E: 1<sup>∞</sup> → e^L con tabla numérica
  // ============================================================
  var NE = [
    { t: "(1 + 1/x)ˣ", f: "(1+1/x)^x", a: INF, L: 1, rg: [1, 40, 1.5, 3],
      pasos: ["Base: 1 + 1/x → 1; exponente: x → ∞. Es 1<sup>∞</sup>.", "Es la definición de e: lím (1 + 1/x)ˣ = e.", "L = lím x·(1/x) = 1 ⟹ resultado e¹."] },
    { t: "(1 + 3/x)^(2x)", f: "(1+3/x)^(2*x)", a: INF, L: 6, rg: [1, 40, 0, 450],
      pasos: ["Base → 1 y exponente → ∞: 1<sup>∞</sup>.", "Fórmula: lím f^g = e^L con L = lím g·(f − 1).", "L = lím 2x·(3/x) = 6 ⟹ resultado e⁶."] },
    { t: "((x+3)/(x−1))^(2x)", f: "((x+3)/(x-1))^(2*x)", a: INF, L: 8, rg: [3, 40, 0, 3600],
      pasos: ["Base: (x+3)/(x−1) → 1; exponente 2x → ∞: 1<sup>∞</sup>.", "f − 1 = (x+3)/(x−1) − 1 = 4/(x−1).", "L = lím 2x·4/(x−1) = 8 ⟹ resultado e⁸."] },
    { t: "((x²+1)/(x²−1))^(x²)", f: "((x^2+1)/(x^2-1))^(x^2)", a: INF, L: 2, rg: [2, 12, 4, 40],
      pasos: ["Base → 1 y exponente x² → ∞: 1<sup>∞</sup>.", "f − 1 = 2/(x² − 1).", "L = lím x²·2/(x² − 1) = 2 ⟹ resultado e²."] },
    { t: "((x−1)/(x+2))ˣ", f: "((x-1)/(x+2))^x", a: INF, L: -3, rg: [2, 40, 0, 0.3],
      pasos: ["Base: (x−1)/(x+2) → 1 por debajo; exponente x → ∞: 1<sup>∞</sup>.", "f − 1 = (x−1)/(x+2) − 1 = −3/(x+2).", "L = lím x·(−3/(x+2)) = −3 ⟹ resultado e⁻³ ≈ 0,0498."] },
    { t: "(1 + 3x)^(1/x)  en 0", f: "(1+3*x)^(1/x)", a: 0, L: 3, rg: [0.001, 0.6, 3, 8],
      pasos: ["Si x → 0⁺: base 1 + 3x → 1 y exponente 1/x → ∞: 1<sup>∞</sup>.", "L = lím (1/x)·(3x) = 3.", "Resultado e³ ≈ 20,09."] },
    { t: "(cos x)^(1/x²)  en 0", f: "cos(x)^(1/x^2)", a: 0, L: -0.5, rg: [0.001, 1, 0.3, 1],
      pasos: ["Si x → 0: cos x → 1 y 1/x² → ∞: 1<sup>∞</sup>.", "L = lím (cos x − 1)/x² = −1/2 (límite notable (1 − cos x)/x² → 1/2).", "Resultado e^(−1/2) = 1/√e ≈ 0,6065."] }
  ];
  B.w.m2_numero_e = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Indeterminación 1 elevado a ∞: la tabla se acerca a e elevado a L");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><div class="m7-tab"></div><p class="w-pie"></p>';
    var st = { i: 0 }, g, lectura = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".m7-tab"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var T = NE[st.i], r = F.leer(T.f), f = r.g, E = Math.exp(T.L), R = T.rg;
      var xs = T.a === INF ? [10, 100, 1e3, 1e4, 1e5, 1e6] : [1e-1, 1e-2, 1e-3, 1e-4, 1e-5];
      g.rango(R[0], R[1], R[2], R[3]); g.limpiar();
      g.horizontal(E, { clase: "c-ok", dash: "6 5" });
      g.curva(f, { clase: "c-pen", x0: R[0], x1: R[1], n: 600 }).setAttribute("stroke-width", 3);
      etq(g, R[0] + (R[1] - R[0]) * 0.5, E, "y = e^" + sg(T.L) + " ≈ " + fmt(E, 4), "ok", 0, -8, "middle");
      lectura.innerHTML = fil("Tipo", "1<sup>∞</sup> (base → 1, exponente → ∞)", "pen") + fil("L = lím g·(f − 1)", sg(T.L), "ok") + fil("Resultado", "e<sup>" + sg(T.L) + "</sup> ≈ " + fmt(E, 5), "ok") +
        fil("Pasos", "<ol class='m7-pasos'>" + T.pasos.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>", "pen anch");
      tab.innerHTML = "<table class='m7-t'><thead><tr><th>" + (T.a === INF ? "x" : "x → 0⁺") + "</th><th>f(x)</th><th>e<sup>" + sg(T.L) + "</sup> − f(x)</th></tr></thead><tbody>" +
        xs.map(function (x) { var v = f(x); return "<tr><td>" + (T.a === INF ? (x >= 1e4 ? "10" + "<sup>" + Math.round(Math.log10(x)) + "</sup>" : fmt(x, 0)) : fmt(x, 5).replace(/0+$/, "")) + "</td><td>" + fmt(v, 5) + "</td><td>" + (Math.abs(E - v) < 1e-5 ? "≈ 0" : fmt(E - v, 5)) + "</td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = "Regla: si f → 1 y g → ∞, entonces <b>lím f<sup>g</sup> = e<sup>L</sup></b> con <b>L = lím g·(f − 1)</b>. Es la forma rápida de «dar la vuelta» al número e.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 1, xmax: 40, ymin: 0, ymax: 4, w: 600, h: 300, etx: "x", ety: "y", etiqueta: "Indeterminación 1 elevado a infinito" });
    U.fichas(cuerpo.querySelector("[data-pre]"), NE.map(function (q, i) { return { k: String(i), t: q.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };
})(window);
