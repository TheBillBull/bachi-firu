/* ============================================================
   Bachi para Firu · laboratorio de límites y continuidad (Matemáticas I, tema 10)
   motor B.lab.lim (límites laterales, continuidad, asíntotas)
   + acercar · infinito · asintotas · bolzano · epsdelta · jerarquia
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  B.lab = B.lab || {};
  var Lm = B.lab.lim = {};
  var INF = Infinity, fil = F.fil, pto = F.pto, etq = F.etq, num = F.num, campo = F.campo;

  // ------------------------------------------------------------
  // Límite lateral numérico: x = a ± h con h = 0,1 … 0,00001
  //   { tipo: "lim" | "inf" | "osc" | "indef", L, signo, v }
  // ------------------------------------------------------------
  var HS = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5];
  function bonito(v) { var r = Math.round(v * 1e5) / 1e5; return Math.abs(v - r) < 2e-5 ? (Object.is(r, -0) ? 0 : r) : Math.round(v * 1e6) / 1e6; }
  Lm.lateral = function (g, a, dir, gi) {
    gi = gi || g.gi;
    var h0 = function (h) { return a + dir * h * Math.max(1, Math.abs(a)); };
    var v = HS.map(function (h) { return g(h0(h)); }), i;
    if (gi) {
      var w = HS.map(function (h) { return gi(h0(h)); });
      // desbordamiento (por ejemplo e^(1/x) con x → 0⁺): vale ±∞ de verdad
      if (w.slice(2).every(function (t) { return !isNaN(t); }) && w.slice(2).some(function (t) { return !isFinite(t); }) && (isNaN(v[4]) || isNaN(v[3]))) {
        var big = w.slice(2).filter(function (t) { return !isFinite(t); })[0];
        return { tipo: "inf", signo: Math.sign(big), v: w };
      }
    }
    if (isNaN(v[4]) || isNaN(v[3]) || isNaN(v[2])) return { tipo: "indef", v: v };
    var sc = Math.max(1, Math.abs(v[4]));
    var d = [Math.abs(v[1] - v[0]), Math.abs(v[2] - v[1]), Math.abs(v[3] - v[2]), Math.abs(v[4] - v[3])];
    var peq = d[3] <= 2e-3 * sc && d[2] <= 2e-2 * sc, geom = d[3] <= 0.3 * d[2] + 1e-9 && d[2] <= 0.3 * d[1] + 1e-9 && d[3] <= 0.3 * sc;
    if (peq || geom) return { tipo: "lim", L: bonito((10 * v[4] - v[3]) / 9), v: v };      // extrapolación de Richardson (el error es proporcional a h)
    var crece = true;
    for (i = 1; i < 5; i++) if (!(Math.abs(v[i]) > Math.abs(v[i - 1]))) crece = false;
    var mismo = v[2] * v[3] > 0 && v[3] * v[4] > 0;
    if (crece && mismo && Math.abs(v[4]) > 3 && Math.abs(v[4]) - Math.abs(v[3]) >= 0.5 * (Math.abs(v[1]) - Math.abs(v[0]))) return { tipo: "inf", signo: Math.sign(v[4]), v: v };
    return { tipo: "osc", v: v };
  };
  Lm.txtLat = function (r) {
    return r.tipo === "lim" ? fmt(r.L, 5) : r.tipo === "inf" ? (r.signo > 0 ? "+∞" : "−∞") : r.tipo === "osc" ? "no se acerca a nada (oscila)" : "no definida";
  };
  function igual(a, b) { return Math.abs(a - b) <= 1e-4 * Math.max(1, Math.abs(a), Math.abs(b)); }

  // Estudio completo en un punto: laterales, límite y tipo de continuidad
  Lm.estudio = function (g, a, gi) {
    var izq = Lm.lateral(g, a, -1, gi), der = Lm.lateral(g, a, 1, gi), fa = g(a), r = { izq: izq, der: der, fa: fa };
    var fin = function (z) { return z.tipo === "lim"; }, inf = function (z) { return z.tipo === "inf"; };
    r.defIzq = izq.tipo !== "indef"; r.defDer = der.tipo !== "indef";
    if (!r.defIzq && !r.defDer) { r.limite = "fuera"; r.tipo = "fuera del dominio"; return r; }
    if (!r.defIzq || !r.defDer) { r.limite = "un lado"; r.tipo = "sólo definida a un lado"; return r; }
    if (fin(izq) && fin(der) && igual(izq.L, der.L)) {
      r.limite = "finito"; r.L = (izq.L + der.L) / 2; r.L = bonito(r.L);
      if (!isNaN(fa) && igual(fa, r.L)) r.tipo = "continua"; else r.tipo = "discontinuidad evitable";
    } else if (fin(izq) && fin(der)) { r.limite = "no existe"; r.tipo = "discontinuidad de salto finito"; r.salto = Math.abs(der.L - izq.L); }
    else if (inf(izq) && inf(der) && izq.signo === der.signo) { r.limite = "infinito"; r.signoInf = izq.signo; r.tipo = "discontinuidad de salto infinito (asíntota vertical)"; }
    else if (inf(izq) || inf(der)) { r.limite = "no existe"; r.tipo = "discontinuidad de salto infinito (asíntota vertical)"; }
    else { r.limite = "no existe"; r.tipo = "discontinuidad esencial (oscila)"; }
    return r;
  };

  // ------------------------------------------------------------
  // Asíntotas: verticales, horizontales y oblicuas
  // ------------------------------------------------------------
  function racional(v, maxQ) {
    for (var q = 1; q <= (maxQ || 12); q++) { var p = Math.round(v * q); if (Math.abs(v - p / q) < 2e-4) return p / q; }
    return Math.round(v * 1e4) / 1e4;
  }
  Lm.oblicua = function (g, signo) {
    var X1 = signo * 1e6, X2 = signo * 1e7, m1 = g(X1) / X1, m2 = g(X2) / X2;
    if (isNaN(m1) || isNaN(m2) || Math.abs(m2) < 1e-6 || Math.abs(m1 - m2) > 1e-3 * Math.max(1, Math.abs(m2))) return null;
    var m = racional(m2, 12), n1 = g(X1) - m * X1, n2 = g(X2) - m * X2;
    if (isNaN(n1) || isNaN(n2) || Math.abs(n1 - n2) > 1e-2 * Math.max(1, Math.abs(n2))) return null;
    return { m: m, n: racional(n2, 12) };
  };
  Lm.asintotas = function (g) {
    var D = F.dominio(g, -60, 60), V = F.vertical(g, D), res = { vert: V.as, huecos: V.huecos, H: [], O: [] };
    [1, -1].forEach(function (s) {
      var z = F.infinito(g, s);
      if (z.tipo === "lim") res.H.push({ lado: s, y: z.L });
      else if (z.tipo === "inf") { var o = Lm.oblicua(g, s); if (o) res.O.push({ lado: s, m: o.m, n: o.n }); }
    });
    return res;
  };

  function expoTxt(x) { return x === 0 ? "0" : Math.abs(x) >= 1e5 || Math.abs(x) < 1e-3 ? U.cient(x, 2) : fmt(x, 4); }
  function ecuacionRecta(m, n) { return "y = " + (m === 1 ? "" : m === -1 ? "−" : fmt(m, 3)) + "x" + (n === 0 ? "" : (n > 0 ? " + " : " − ") + fmt(Math.abs(n), 3)); }

  // ============================================================
  // ACERCAR: laterales, límite y continuidad en un punto
  // ============================================================
  var PRE = [
    { f: "(x^2-1)/(x-1)", a: "1", t: "(x²−1)/(x−1) en 1", nota: "Hueco: no existe f(1), pero el límite vale 2 (la función se parece a x + 1)." },
    { f: "(x^2-9)/(x-3)", a: "3", t: "(x²−9)/(x−3) en 3", nota: "Indeterminación 0/0: factorizando, (x−3)(x+3)/(x−3) = x + 3 → 6." },
    { f: "(sqrt(x+4)-2)/x", a: "0", t: "(√(x+4)−2)/x en 0", nota: "0/0 con raíz: se resuelve multiplicando por el conjugado. Límite 1/4." },
    { f: "sin(x)/x", a: "0", t: "sen x / x en 0", nota: "Límite notable: sen x / x → 1 (con x en radianes)." },
    { f: "(1-cos(x))/x^2", a: "0", t: "(1−cos x)/x² en 0", nota: "Límite notable: (1 − cos x)/x² → 1/2." },
    { f: "|x|/x", a: "0", t: "|x|/x en 0", nota: "Laterales distintos: −1 por la izquierda y 1 por la derecha. El límite no existe (salto)." },
    { f: "1/x", a: "0", t: "1/x en 0", nota: "−∞ por la izquierda y +∞ por la derecha: asíntota vertical, sin límite." },
    { f: "1/x^2", a: "0", t: "1/x² en 0", nota: "+∞ por los dos lados: el límite es +∞ (x² es positivo)." },
    { f: "1/(x-2)", a: "2", t: "1/(x−2) en 2", nota: "k/0: hay que estudiar los signos a cada lado: −∞ y +∞." },
    { f: "e^(1/x)", a: "0", t: "e^(1/x) en 0", nota: "Por la izquierda e^(−∞) = 0 y por la derecha e^(+∞) = +∞." },
    { f: "sin(1/x)", a: "0", t: "sen(1/x) en 0", nota: "Oscila infinitas veces entre −1 y 1: no se acerca a nada (discontinuidad esencial)." },
    { f: "x*sin(1/x)", a: "0", t: "x·sen(1/x) en 0", nota: "Aunque sen(1/x) oscila, queda «apretada» por |x| → el límite es 0 (teorema del sándwich)." },
    { f: "(x^2-4x+3)/(x^2-1)", a: "1", t: "(x²−4x+3)/(x²−1) en 1", nota: "0/0: (x−1)(x−3)/((x−1)(x+1)) → (x−3)/(x+1) → −1." },
    { f: "x^2", a: "2", t: "x² en 2 (continua)", nota: "Las funciones polinómicas son continuas: el límite es simplemente f(2) = 4." }
  ];
  B.w.acercar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Acércate a un punto: límites laterales, límite y continuidad");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-zoom class="chips"></div><div class="w-plot"></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: PRE[0].f, a: PRE[0].a, Z: 2, i: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    var iF = campo(ctl, "f(x) =", st.f, 220), iA = campo(ctl, "a =", st.a, 70);
    function pinta() {
      var r = F.leer(st.f), a = B.Mate.numero(st.a); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); tabla.innerHTML = ""; return; }
      if (isNaN(a)) { lectura.innerHTML = fil("Revisa «a»", "escribe un número (por ejemplo 2, −1, 0,5)", "red"); tabla.innerHTML = ""; return; }
      var f = r.g, E = Lm.estudio(f, a, r.gi), Z = st.Z;
      var y = F.rangoY(f, a - Z, a + Z), ys = [y[0], y[1]];
      [E.izq, E.der].forEach(function (z) { if (z.tipo === "lim") ys.push(z.L - 0.05 * (y[1] - y[0]), z.L + 0.05 * (y[1] - y[0])); });
      if (!isNaN(E.fa) && Math.abs(E.fa) < 1e6) ys.push(E.fa);
      var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys); if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
      g.rango(a - Z, a + Z, lo, hi); g.limpiar();
      g.vertical(a, { clase: "c-faint", dash: "5 5" });
      if (E.izq.tipo === "lim") g.segmento(a - Z, E.izq.L, a, E.izq.L, { clase: "c-pen", dash: "3 4" });
      if (E.der.tipo === "lim") g.segmento(a, E.der.L, a + Z, E.der.L, { clase: "c-red", dash: "3 4" });
      g.curva(f, { clase: "c-ink", n: 700 }).setAttribute("stroke-width", 3);
      if (E.izq.tipo === "lim") pto(g, a, E.izq.L, "c-pen", true, 6); if (E.der.tipo === "lim") pto(g, a, E.der.L, "c-red", true, 6);
      if (!isNaN(E.fa) && Math.abs(E.fa) < 1e6) pto(g, a, E.fa, "c-ok", false, 6);
      // tabla de aproximación
      var hs = [0.1, 0.01, 0.001, 0.0001], filas = hs.map(function (h) {
        var xi = a - h, xd = a + h, vi = f(xi), vd = f(xd);
        return "<tr><td>" + fmt(xi, 5) + "</td><td class='pen'>" + (isNaN(vi) ? "—" : expoTxt(vi)) + "</td><td>" + fmt(xd, 5) + "</td><td class='red'>" + (isNaN(vd) ? "—" : expoTxt(vd)) + "</td></tr>";
      }).join("");
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>x → a⁻</th><th>f(x)</th><th>x → a⁺</th><th>f(x)</th></tr></thead><tbody>" + filas + "</tbody></table>";
      var cum = [E.defIzq && E.defDer, !isNaN(E.fa), E.limite === "finito", E.limite === "finito" && !isNaN(E.fa) && igual(E.L, E.fa)];
      var lim = E.limite === "finito" ? fmt(E.L, 5) : E.limite === "infinito" ? (E.signoInf > 0 ? "+∞" : "−∞") : E.limite === "no existe" ? "no existe" : E.limite === "fuera" ? "—" : "sólo laterales";
      lectura.innerHTML = fil("Límite por la izquierda", "lím<sub>x→" + fmt(a, 3) + "⁻</sub> f(x) = " + Lm.txtLat(E.izq), "pen") + fil("Límite por la derecha", "lím<sub>x→" + fmt(a, 3) + "⁺</sub> f(x) = " + Lm.txtLat(E.der), "red") +
        fil("Límite en x = " + fmt(a, 3), lim, E.limite === "finito" || E.limite === "infinito" ? "ok" : "red") + fil("Valor f(" + fmt(a, 3) + ")", isNaN(E.fa) ? "no existe" : fmt(E.fa, 5), "ok") +
        fil("¿Es continua en x = " + fmt(a, 3) + "?", E.tipo, E.tipo === "continua" ? "ok" : "red ancho") +
        fil("Las tres condiciones", "<ul class='lec-ul'><li>" + (isNaN(E.fa) ? "✗" : "✓") + " existe f(a)</li><li>" + (E.limite === "finito" ? "✓" : "✗") + " existe el límite (finito)</li><li>" + (cum[3] ? "✓" : "✗") + " coinciden: límite = f(a)</li></ul>", "ancho");
      pie.innerHTML = (PRE[st.i] && PRE[st.i].f === st.f ? PRE[st.i].nota + " " : "") + "Los <b>círculos huecos</b> (azul: izquierda, rojo: derecha) marcan a qué altura se acerca la curva; el punto verde es el valor real f(a). El cálculo es numérico: sirve para comprobar tus resultados.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 4, ymin: -2, ymax: 5, w: 600, h: 320, etiqueta: "Entorno del punto" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.f = PRE[+k].f; st.a = PRE[+k].a; iF.value = st.f; iA.value = st.a; pinta(); });
    U.fichas(cuerpo.querySelector("[data-zoom]"), [{ k: "2", t: "Zoom ±2" }, { k: "0.5", t: "±0,5" }, { k: "0.1", t: "±0,1" }, { k: "0.02", t: "±0,02" }], "2", function (k) { st.Z = parseFloat(k); pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); }); iA.addEventListener("input", function () { st.a = iA.value; pinta(); });
    pinta();
  };

  // ============================================================
  // INFINITO: tendencia cuando x → ±∞
  // ============================================================
  var PI = [
    "(3x^2+2x)/(x^2-1)", "(2x-1)/(x+3)", "(x^2+1)/(x-1)", "(x+1)/(x^2+1)", "e^x", "e^(-x)", "ln(x)", "sin(x)/x",
    "sqrt(x^2+3x)-x", "x*sin(1/x)", "(1+1/x)^x", "(2x^3-x)/(5x^3+4x^2)", "x-sqrt(x^2+1)", "x^2-x^3"
  ];
  B.w.infinito = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Qué pasa cuando x se hace enorme?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-zoom class="chips"></div><div class="w-plot"></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: PI[0], X: 30 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    var iF = campo(ctl, "f(x) =", st.f, 260);
    function pinta() {
      var r = F.leer(st.f); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); tabla.innerHTML = ""; return; }
      var f = r.g, X = st.X, y = F.rangoY(f, -X, X), A = Lm.asintotas(f), mas = F.infinito(f, 1), menos = F.infinito(f, -1);
      g.rango(-X, X, y[0], y[1]); g.limpiar();
      A.vert.forEach(function (c) { if (Math.abs(c) < X) g.segmento(c, y[0], c, y[1], { clase: "c-red", dash: "6 5" }); });
      A.H.forEach(function (h) { g.horizontal(h.y, { clase: "c-ok", dash: "6 5" }); });
      A.O.forEach(function (o) { g.recta(o.m, 0, o.n, { clase: "c-ok", dash: "6 5" }); });
      g.curva(f, { clase: "c-pen", n: 900 }).setAttribute("stroke-width", 3);
      var xs = [10, 100, 1000, 1e4, 1e5, 1e6];
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>x</th>" + xs.map(function (t) { return "<th>" + (t >= 1e4 ? "10<sup>" + Math.log10(t) + "</sup>" : fmt(t, 0)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        "<tr><th>f(x)</th>" + xs.map(function (t) { var v = f(t); return "<td class='pen'>" + (isNaN(v) ? "—" : expoTxt(v)) + "</td>"; }).join("") + "</tr>" +
        "<tr><th>x</th>" + xs.map(function (t) { return "<th>" + (t >= 1e4 ? "−10<sup>" + Math.log10(t) + "</sup>" : "−" + fmt(t, 0)) + "</th>"; }).join("") + "</tr>" +
        "<tr><th>f(x)</th>" + xs.map(function (t) { var v = f(-t); return "<td class='red'>" + (isNaN(v) ? "—" : expoTxt(v)) + "</td>"; }).join("") + "</tr></tbody></table>";
      var as = [];
      A.vert.forEach(function (c) { as.push("vertical x = " + num(c)); });
      A.H.forEach(function (h) { as.push("horizontal y = " + num(h.y) + " (x → " + (h.lado > 0 ? "+∞" : "−∞") + ")"); });
      A.O.forEach(function (o) { as.push("oblicua " + ecuacionRecta(o.m, o.n) + " (x → " + (o.lado > 0 ? "+∞" : "−∞") + ")"); });
      lectura.innerHTML = fil("lím<sub>x→+∞</sub> f(x)", F.txtInfinito(mas).replace("tiende a ", ""), "pen") + fil("lím<sub>x→−∞</sub> f(x)", F.txtInfinito(menos).replace("tiende a ", ""), "red") + fil("Asíntotas", as.length ? as.join(" · ") : "ninguna", "ok ancho");
      pie.innerHTML = "La primera fila de la tabla muestra f(x) para x enormes y positivos, y la segunda para x enormes y negativos. Si los valores se estabilizan en un número L, la recta y = L es una <b>asíntota horizontal</b>; si crecen sin límite, el límite es ±∞ (y puede haber una asíntota oblicua).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -30, xmax: 30, ymin: -5, ymax: 5, w: 600, h: 320, etiqueta: "Comportamiento en el infinito" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PI.map(function (p, i) { return { k: String(i), t: p }; }), "0", function (k) { st.f = PI[+k]; iF.value = st.f; pinta(); });
    U.fichas(cuerpo.querySelector("[data-zoom]"), [{ k: "10", t: "Ventana ±10" }, { k: "30", t: "±30" }, { k: "100", t: "±100" }, { k: "1000", t: "±1000" }], "30", function (k) { st.X = parseFloat(k); pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    pinta();
  };

  // ============================================================
  // ASINTOTAS: vertical, horizontal y oblicua de una función
  // ============================================================
  var PA = ["(x^2+1)/(x-1)", "(2x^2+1)/x", "1/(x-2)", "(x^2-4)/(x^2-3x+2)", "(x^2-1)/(x^2-4)", "e^x/(x)", "(3x+1)/(x-2)", "sqrt(x^2+1)", "x+1/x", "ln(x)"];
  B.w.asintotas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Busca las asíntotas de una función");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: PA[0] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iF = campo(ctl, "f(x) =", st.f, 260);
    function pinta() {
      var r = F.leer(st.f); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); return; }
      var f = r.g, A = Lm.asintotas(f), X = 8, y = F.rangoY(f, -X, X);
      g.rango(-X, X, Math.max(y[0], -15), Math.min(y[1], 15)); g.limpiar();
      A.vert.forEach(function (c) { if (Math.abs(c) < X) { g.segmento(c, -50, c, 50, { clase: "c-red", dash: "6 5" }); etq(g, c, g.c.ymax, "x = " + num(c, 3), "red", 6, 16); } });
      A.H.forEach(function (h) { g.horizontal(h.y, { clase: "c-ok", dash: "6 5" }); });
      var vistas = []; A.O.forEach(function (o) { if (vistas.indexOf(o.m + "," + o.n) < 0) { vistas.push(o.m + "," + o.n); g.recta(o.m, 0, o.n, { clase: "c-ok", dash: "6 5" }); } });
      g.curva(f, { clase: "c-pen", n: 900 }).setAttribute("stroke-width", 3);
      A.huecos.forEach(function (h) { if (Math.abs(h[0]) < X) pto(g, h[0], h[1], "c-pen", true, 5); });
      var D = F.dominio(f, -60, 60);
      lectura.innerHTML = fil("Dominio", F.txtIntervalos(D), "") + fil("Asíntotas verticales", A.vert.length ? A.vert.map(function (c) { return "x = " + num(c, 4); }).join(" · ") : "ninguna", "red") +
        fil("Asíntotas horizontales", A.H.length ? A.H.map(function (h) { return "y = " + num(h.y, 4) + " (x → " + (h.lado > 0 ? "+∞" : "−∞") + ")"; }).join(" · ") : "ninguna", "ok") +
        fil("Asíntotas oblicuas", A.O.length ? A.O.map(function (o) { return ecuacionRecta(o.m, o.n) + " (x → " + (o.lado > 0 ? "+∞" : "−∞") + ")"; }).join(" · ") : "ninguna", "ok") +
        (A.huecos.length ? fil("Huecos (0/0)", A.huecos.map(function (h) { return "(" + num(h[0], 3) + ", " + num(h[1], 3) + ")"; }).join(" · "), "ancho") : "");
      pie.innerHTML = "<b>Vertical</b> x = a: el límite en a es ±∞ (se anula el denominador sin que se anule el numerador). <b>Horizontal</b> y = L: lím f(x) = L cuando x → ±∞. <b>Oblicua</b> y = mx + n: m = lím f(x)/x y n = lím (f(x) − mx). Si hay horizontal hacia un lado no hay oblicua hacia ese lado.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -8, xmax: 8, ymin: -6, ymax: 6, w: 600, h: 330, etiqueta: "Asíntotas" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PA.map(function (p, i) { return { k: String(i), t: p }; }), "0", function (k) { st.f = PA[+k]; iF.value = st.f; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    pinta();
  };

  // ============================================================
  // BOLZANO: bisección
  // ============================================================
  var PB = [["x^3+x-3", "1", "2"], ["cos(x)-x", "0", "1"], ["e^x-3", "0", "2"], ["x^2-2", "1", "2"], ["x^3-6x^2+9x-2", "0", "1"]];
  B.w.bolzano = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Teorema de Bolzano: acorralar una raíz por bisección");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="ctl bz-acc"></div><div class="lectura anch"></div><div class="ac-tabla bz-tab"></div><p class="w-pie"></p>';
    var st = { f: PB[0][0], a: PB[0][1], b: PB[0][2], pasos: [] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), acc = cuerpo.querySelector(".bz-acc"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".bz-tab");
    var iF = campo(ctl, "f(x) =", st.f, 220), iA = campo(ctl, "a =", st.a, 60), iB = campo(ctl, "b =", st.b, 60);
    function leer() { var r = F.leer(st.f); return { r: r, a: B.Mate.numero(st.a), b: B.Mate.numero(st.b) }; }
    function reinicia() { st.pasos = []; pinta(); }
    function siguiente() {
      var L = leer(); if (!L.r.ok || isNaN(L.a) || isNaN(L.b) || !(L.a < L.b)) return;
      var f = L.r.g, a = st.pasos.length ? st.pasos[st.pasos.length - 1].a2 : L.a, b = st.pasos.length ? st.pasos[st.pasos.length - 1].b2 : L.b;
      if (isNaN(f(a)) || isNaN(f(b)) || f(a) * f(b) >= 0) return;
      var m = (a + b) / 2, fm = f(m), a2 = a, b2 = b;
      if (fm === 0) { a2 = m; b2 = m; } else if (f(a) * fm < 0) b2 = m; else a2 = m;
      st.pasos.push({ a: a, b: b, m: m, fm: fm, a2: a2, b2: b2 }); pinta();
    }
    U.boton(acc, "Dividir el intervalo por la mitad", function () { siguiente(); }, "btn-comprobar");
    U.boton(acc, "10 pasos", function () { for (var i = 0; i < 10; i++) siguiente(); });
    U.boton(acc, "Reiniciar", reinicia);
    function pinta() {
      var L = leer(); g.limpiar();
      if (!L.r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", L.r.error, "red"); tabla.innerHTML = ""; return; }
      if (isNaN(L.a) || isNaN(L.b) || !(L.a < L.b)) { lectura.innerHTML = fil("Intervalo", "escribe a &lt; b", "red"); tabla.innerHTML = ""; return; }
      var f = L.r.g, a0 = L.a, b0 = L.b, w = b0 - a0, X0 = a0 - w * 0.4, X1 = b0 + w * 0.4, y = F.rangoY(f, X0, X1);
      g.rango(X0, X1, Math.min(y[0], -0.1 * (y[1] - y[0])), Math.max(y[1], 0.1 * (y[1] - y[0]))); g.limpiar();
      var fa = f(a0), fb = f(b0), ok = !isNaN(fa) && !isNaN(fb) && fa * fb < 0;
      var ult = st.pasos.length ? st.pasos[st.pasos.length - 1] : null, ca = ult ? ult.a2 : a0, cb = ult ? ult.b2 : b0;
      g.rect(ca, g.c.ymin, cb, g.c.ymax, { clase: "z-ok" });
      g.curva(f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      pto(g, a0, fa, "c-red", false, 5); pto(g, b0, fb, "c-red", false, 5);
      st.pasos.forEach(function (p) { if (!isNaN(p.fm)) pto(g, p.m, p.fm, "c-ok", false, 3); });
      // continuidad en [a, b]: ¿hay puntos sin definir o asíntotas?
      var cont = true, i; for (i = 0; i <= 400; i++) { var xx = a0 + (b0 - a0) * i / 400, v = f(xx); if (isNaN(v) || Math.abs(v) > 1e6) cont = false; }
      var D = F.dominio(f, a0 - 1, b0 + 1), roto = D.length > 1 || (D.length === 1 && (D[0].lo > a0 || D[0].hi < b0));
      var msg = !ok ? "no se cumple f(a)·f(b) &lt; 0: <b>Bolzano no se puede aplicar</b> (no se puede asegurar que haya raíz)" : (!cont || roto) ? "f(a)·f(b) &lt; 0, pero la función <b>no es continua</b> en [a, b]: el teorema no vale" : "f continua en [a, b] y f(a)·f(b) &lt; 0 ⇒ existe al menos un c ∈ (a, b) con f(c) = 0";
      lectura.innerHTML = fil("Extremos del intervalo", "f(" + fmt(a0, 4) + ") = " + fmt(fa, 5) + " · f(" + fmt(b0, 4) + ") = " + fmt(fb, 5), "pen") + fil("Conclusión", msg, ok && cont && !roto ? "ok ancho" : "red ancho") +
        (ult ? fil("Raíz acorralada en", "[" + fmt(ult.a2, 6) + ", " + fmt(ult.b2, 6) + "]  (anchura " + U.cient(ult.b2 - ult.a2, 2) + ")", "ok") + fil("Aproximación tras " + st.pasos.length + " pasos", "c ≈ " + fmt((ult.a2 + ult.b2) / 2, 6), "red") : "");
      tabla.innerHTML = st.pasos.length ? "<table class='fo-t ac-t'><thead><tr><th>Paso</th><th>[a, b]</th><th>m = (a+b)/2</th><th>f(m)</th><th>Nuevo intervalo</th></tr></thead><tbody>" +
        st.pasos.map(function (p, i) { return "<tr><td>" + (i + 1) + "</td><td>[" + fmt(p.a, 5) + ", " + fmt(p.b, 5) + "]</td><td>" + fmt(p.m, 6) + "</td><td>" + expoTxt(p.fm) + "</td><td>[" + fmt(p.a2, 5) + ", " + fmt(p.b2, 5) + "]</td></tr>"; }).join("") + "</tbody></table>" : "";
      pie.innerHTML = "<b>Teorema de Bolzano</b>: si f es continua en [a, b] y f(a) y f(b) tienen signos opuestos, la gráfica tiene que cruzar el eje X en algún punto de (a, b). Partiendo el intervalo por la mitad y quedándote con el trozo donde cambia el signo, acorralas la raíz cada vez más (cada paso divide la anchura entre 2).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 3, ymin: -4, ymax: 8, w: 600, h: 320, etiqueta: "Bisección" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PB.map(function (p) { return { k: p[0], t: p[0] + " en [" + p[1] + ", " + p[2] + "]" }; }), PB[0][0], function (k) { var p = PB.filter(function (z) { return z[0] === k; })[0]; st.f = p[0]; st.a = p[1]; st.b = p[2]; iF.value = st.f; iA.value = st.a; iB.value = st.b; reinicia(); });
    [iF, iA, iB].forEach(function (el) { el.addEventListener("input", function () { st.f = iF.value; st.a = iA.value; st.b = iB.value; reinicia(); }); });
    pinta();
  };

  // ============================================================
  // EPSDELTA: la definición de límite como un juego
  // ============================================================
  var PE = [
    { t: "2x + 1 en a = 1", f: function (x) { return 2 * x + 1; }, a: 1, L: 3, nota: "Para esta recta de pendiente 2, δ = ε/2 funciona siempre." },
    { t: "x² en a = 2", f: function (x) { return x * x; }, a: 2, L: 4, nota: "Aquí la pendiente cambia: δ depende de ε y de la zona." },
    { t: "(x²−1)/(x−1) en a = 1", f: function (x) { return (x * x - 1) / (x - 1); }, a: 1, L: 2, nota: "En x = 1 la función no existe, pero el límite sí: la definición ignora lo que pase exactamente en a." },
    { t: "√x en a = 4", f: Math.sqrt, a: 4, L: 2, nota: "En un entorno de 4 la raíz crece despacio: δ puede ser relativamente grande." },
    { t: "1/x en a = 1", f: function (x) { return 1 / x; }, a: 1, L: 1, nota: "Cuanto más a la izquierda, más empinada: el δ útil lo marca el lado izquierdo." }
  ];
  B.w.epsdelta = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La definición de límite como un juego: ε y δ");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, e: 0.5, d: 0.4 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "ε (tolerancia en y)", min: 0.05, max: 2, step: 0.05, val: st.e, on: function (v) { st.e = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    U.slider(ctl, { et: "δ (entorno en x)", min: 0.01, max: 2, step: 0.01, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function funciona(P, e, d) {
      for (var i = 0; i <= 600; i++) { var x = P.a - d + 2 * d * i / 600; if (Math.abs(x - P.a) < 1e-12) continue; var v = P.f(x); if (isNaN(v)) continue; if (!(Math.abs(v - P.L) < e)) return x; }
      return null;
    }
    function dmax(P, e) { var lo = 0, hi = 3; for (var i = 0; i < 40; i++) { var m = (lo + hi) / 2; if (funciona(P, e, m) === null) lo = m; else hi = m; } return lo; }
    function pinta() {
      var P = PE[st.i], e = st.e, d = st.d; g.rango(P.a - 2.4, P.a + 2.4, P.L - 3, P.L + 3); g.limpiar();
      g.rect(P.a - 2.4, P.L - e, P.a + 2.4, P.L + e, { clase: "z-ok" }); g.rect(P.a - d, P.L - 3, P.a + d, P.L + 3, { clase: "z-pen" });
      g.segmento(P.a - 2.4, P.L, P.a + 2.4, P.L, { clase: "c-ok", dash: "4 4" }); g.vertical(P.a, { clase: "c-faint", dash: "4 4" });
      g.curva(P.f, { clase: "c-ink", n: 600 }).setAttribute("stroke-width", 3);
      pto(g, P.a, P.L, "c-red", true, 6);
      var mal = funciona(P, e, d), dm = dmax(P, e);
      if (mal !== null && !isNaN(P.f(mal))) pto(g, mal, P.f(mal), "c-red", false, 6);
      lectura.innerHTML = fil("Reto", "lím<sub>x→" + fmt(P.a, 0) + "</sub> f(x) = " + fmt(P.L, 0) + ": ¿qué δ hace que |f(x) − " + fmt(P.L, 0) + "| &lt; " + fmt(e, 2) + " siempre que 0 &lt; |x − " + fmt(P.a, 0) + "| &lt; δ?", "ancho") +
        fil("Tu δ = " + fmt(d, 2), mal === null ? "✓ Funciona: toda la parte de la curva dentro de la banda azul vertical queda dentro de la banda verde horizontal" : "✗ No funciona: para x = " + fmt(mal, 3) + " resulta f(x) = " + fmt(P.f(mal), 3) + ", fuera de la banda", mal === null ? "ok ancho" : "red ancho") +
        fil("δ máximo que sirve para ε = " + fmt(e, 2), "δ ≈ " + fmt(dm, 3), "pen");
      pie.innerHTML = P.nota + " <b>Definición:</b> lím f(x) = L significa que para <i>cualquier</i> ε &gt; 0 existe un δ &gt; 0 tal que si 0 &lt; |x − a| &lt; δ entonces |f(x) − L| &lt; ε. Pruébalo achicando ε: siempre hay un δ que funciona.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 4, ymin: 0, ymax: 6, w: 600, h: 330, etiqueta: "Entorno ε–δ" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // JERARQUIA: ¿quién crece más deprisa?
  // ============================================================
  var PJ = [
    { t: "ln x frente a x", f: Math.log, g: function (x) { return x; }, nf: "ln x", ng: "x", xs: [10, 100, 1e3, 1e4, 1e5, 1e6], res: "ln x / x → 0: <b>x crece mucho más deprisa</b> que ln x." },
    { t: "√x frente a ln x", f: Math.sqrt, g: Math.log, nf: "√x", ng: "ln x", xs: [10, 100, 1e3, 1e4, 1e5, 1e6], res: "√x / ln x → +∞: cualquier potencia le gana a cualquier logaritmo." },
    { t: "x² frente a 2ˣ", f: function (x) { return x * x; }, g: function (x) { return Math.pow(2, x); }, nf: "x²", ng: "2ˣ", xs: [5, 10, 20, 50, 100, 200], res: "x² / 2ˣ → 0: <b>la exponencial</b> crece mucho más deprisa que la potencia." },
    { t: "x¹⁰ frente a 2ˣ", f: function (x) { return Math.pow(x, 10); }, g: function (x) { return Math.pow(2, x); }, nf: "x¹⁰", ng: "2ˣ", xs: [10, 30, 60, 100, 200, 500], res: "Al principio x¹⁰ es muchísimo mayor, pero a partir de x ≈ 59 la exponencial la supera y la distancia se hace enorme: x¹⁰ / 2ˣ → 0." },
    { t: "2ˣ frente a 3ˣ", f: function (x) { return Math.pow(2, x); }, g: function (x) { return Math.pow(3, x); }, nf: "2ˣ", ng: "3ˣ", xs: [5, 10, 20, 50, 100, 200], res: "(2/3)ˣ → 0: entre exponenciales gana la de base mayor." },
    { t: "x³ frente a x²", f: function (x) { return x * x * x; }, g: function (x) { return x * x; }, nf: "x³", ng: "x²", xs: [10, 100, 1e3, 1e4, 1e5, 1e6], res: "x³ / x² = x → +∞: entre potencias gana la de mayor exponente." }
  ];
  B.w.jerarquia = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Jerarquía de infinitos: ¿quién crece más deprisa?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0 }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    function pinta() {
      var P = PJ[st.i], filas = P.xs.map(function (x) { var a = P.f(x), b = P.g(x); return "<tr><th>" + (x >= 1e4 ? "10<sup>" + Math.round(Math.log10(x)) + "</sup>" : fmt(x, 0)) + "</th><td class='pen'>" + expoTxt(a) + "</td><td class='red'>" + expoTxt(b) + "</td><td>" + expoTxt(a / b) + "</td></tr>"; }).join("");
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>x</th><th>" + P.nf + "</th><th>" + P.ng + "</th><th>cociente</th></tr></thead><tbody>" + filas + "</tbody></table>";
      lectura.innerHTML = fil("Orden de crecimiento (de menor a mayor)", "log x ≪ x ≪ x² ≪ x³ ≪ … ≪ aˣ (a &gt; 1) ≪ x!", "ok ancho") + fil("Este caso", P.res, "pen ancho");
      pie.innerHTML = "Se compara el <b>cociente</b> f/g al crecer x: si tiende a 0, g «gana»; si tiende a ∞, gana f; si tiende a un número distinto de 0, crecen al mismo ritmo. Esta jerarquía decide, por ejemplo, que lím x⁵/2ˣ = 0 y que lím ln x/x = 0.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PJ.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // LEERLIMITES: leer límites, asíntotas y continuidad en una gráfica
  // ============================================================
  var GRL = [
    { k: "A", t: "Gráfica A (hueco y punto aparte)", rg: [-3, 5, -1, 6],
      tr: [{ f: function (x) { return x + 1; }, a: -INF, b: 1, ca: false, cb: false }, { f: function (x) { return x + 1; }, a: 1, b: INF, ca: false, cb: false }], pts: [[1, 4, false]],
      preguntas: [
        { q: "lím<sub>x→1⁻</sub> f(x) =", op: ["2", "4", "1", "No existe"], ok: 0, por: "Por la izquierda la curva sube hasta la altura 2 (círculo hueco)." },
        { q: "lím<sub>x→1⁺</sub> f(x) =", op: ["2", "4", "3", "No existe"], ok: 0, por: "Por la derecha también se acerca a la altura 2: el hueco está a esa altura." },
        { q: "lím<sub>x→1</sub> f(x) =", op: ["2", "4", "No existe", "+∞"], ok: 0, por: "Los dos laterales valen 2: el límite existe y es 2." },
        { q: "f(1) =", op: ["4", "2", "No existe", "1"], ok: 0, por: "El punto relleno está a altura 4: f(1) = 4, aunque el límite sea 2." },
        { q: "En x = 1, f tiene…", op: ["una discontinuidad evitable", "un salto finito", "una asíntota vertical", "continuidad"], ok: 0, por: "Existen límite (2) y f(1) (4), pero no coinciden: discontinuidad evitable." }
      ] },
    { k: "B", t: "Gráfica B (salto)", rg: [-3, 5, -3, 5],
      tr: [{ f: function (x) { return x; }, a: -INF, b: 2, ca: false, cb: false }, { f: function (x) { return 5 - x; }, a: 2, b: 4.6, ca: true, cb: true }], pts: [],
      preguntas: [
        { q: "lím<sub>x→2⁻</sub> f(x) =", op: ["2", "3", "5", "No existe"], ok: 0, por: "Por la izquierda la recta llega a la altura 2 (círculo hueco)." },
        { q: "lím<sub>x→2⁺</sub> f(x) =", op: ["3", "2", "1", "No existe"], ok: 0, por: "Por la derecha el trozo empieza en el punto relleno de altura 3." },
        { q: "lím<sub>x→2</sub> f(x) =", op: ["No existe (los laterales son distintos)", "2", "3", "2,5"], ok: 0, por: "2 ≠ 3: el límite no existe." },
        { q: "f(2) =", op: ["3", "2", "No existe", "5"], ok: 0, por: "El punto relleno está en (2, 3)." },
        { q: "El tipo de discontinuidad en x = 2 es…", op: ["salto finito de tamaño 1", "evitable", "salto infinito", "esencial"], ok: 0, por: "Los dos laterales son finitos y distintos (2 y 3): salto de 1." }
      ] },
    { k: "C", t: "Gráfica C (hipérbola con asíntotas)", rg: [-5, 7, -6, 8], asv: 1, ash: 2,
      tr: [{ f: function (x) { return 2 * x / (x - 1); }, a: -INF, b: 1, ca: false, cb: false }, { f: function (x) { return 2 * x / (x - 1); }, a: 1, b: INF, ca: false, cb: false }], pts: [],
      preguntas: [
        { q: "lím<sub>x→1⁻</sub> f(x) =", op: ["−∞", "+∞", "2", "0"], ok: 0, por: "Por la izquierda la curva cae hacia abajo pegada a la asíntota x = 1." },
        { q: "lím<sub>x→1⁺</sub> f(x) =", op: ["+∞", "−∞", "2", "0"], ok: 0, por: "Por la derecha la curva sube hacia arriba pegada a la asíntota." },
        { q: "lím<sub>x→+∞</sub> f(x) =", op: ["2", "1", "0", "+∞"], ok: 0, por: "A la derecha la curva se pega a la recta horizontal y = 2." },
        { q: "lím<sub>x→−∞</sub> f(x) =", op: ["2", "1", "0", "−∞"], ok: 0, por: "A la izquierda también se acerca a y = 2." },
        { q: "Sus asíntotas son…", op: ["x = 1 e y = 2", "x = 2 e y = 1", "sólo x = 1", "sólo y = 2"], ok: 0, por: "Las dos rectas discontinuas: vertical x = 1 y horizontal y = 2." },
        { q: "En x = 1, f tiene…", op: ["un salto infinito (asíntota)", "una discontinuidad evitable", "un salto finito", "continuidad"], ok: 0, por: "Los laterales son −∞ y +∞: asíntota vertical (salto infinito)." }
      ] }
  ];
  B.w.leerlimites = function (host) { F.lector(host, "Entrenamiento", "Lee los límites en la gráfica", GRL, "Elige una respuesta en cada apartado: se corrige al momento y te explica por qué. Los círculos huecos son valores a los que se acerca la curva sin tomarlos."); };
})(window);
