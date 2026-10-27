/* ============================================================
   Bachi para Firu · laboratorio de vectores (Matemáticas I, tema 7; también sirve a Física)
   vectores · escalar · combinacion · segmento · baricentro · fuerzas · trabajo
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var V = B.lab.vec = {};
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }

  V.mod = function (u) { return Math.hypot(u[0], u[1]); };
  V.dot = function (u, v) { return u[0] * v[0] + u[1] * v[1]; };
  V.det = function (u, v) { return u[0] * v[1] - u[1] * v[0]; };
  V.ang = function (u, v) { var c = V.dot(u, v) / (V.mod(u) * V.mod(v)); return Math.acos(Math.max(-1, Math.min(1, c))) / R; };
  V.txt = function (u, d) { d = d == null ? 2 : d; return "(" + fmt(cero(u[0]), d) + ", " + fmt(cero(u[1]), d) + ")"; };
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }

  // Punto asible con ajuste a la cuadrícula de 0,5
  function asa(g, get, set, clase, etq, lim) {
    var h = g.punto(0, 0, { capa: "top", r: 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) {
      if (tecla) set(snap(x, lim), get()[1]); else set(snap(x, lim), snap(y, lim));
    }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function campoPlot(host, o) {
    var g = new B.Plot(host, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: o.w || 520, h: o.h || 380, etx: "x", ety: "y", etiqueta: o.etiqueta });
    g.rangoIso(o.cx || 0, o.cy || 0, o.semi || 5);
    return g;
  }
  function etiqueta(g, p, t, clase, dx, dy) { g.texto(p[0], p[1], t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase }); }

  // ============================================================
  // VECTORES: suma, resta, producto por un número, módulo
  // ============================================================
  B.w.vectores = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Operaciones con vectores");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "suma", u: [3, 1], v: [1, 3], k: 2 }, g, h1, h2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sk = U.slider(ctl, { et: "Número <i>k</i>", min: -3, max: 3, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var u = st.u, v = st.v, m = st.modo, k = st.k, res, tit;
      sk.el.style.display = m === "esc" ? "" : "none";
      g.limpiar(); g.mover(h1, u[0], u[1]); g.mover(h2, v[0], v[1]);
      h2.style.display = m === "esc" || m === "mod" ? "none" : "";
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); etiqueta(g, u, "u", "pen");
      if (m !== "esc" && m !== "mod") { U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" }); etiqueta(g, v, "v", "red"); }
      if (m === "suma") {
        res = [u[0] + v[0], u[1] + v[1]]; tit = "u + v";
        g.segmento(u[0], u[1], res[0], res[1], { clase: "c-red", dash: "4 4" }); g.segmento(v[0], v[1], res[0], res[1], { clase: "c-pen", dash: "4 4" });
        U.flecha(g, 0, 0, res[0], res[1], { clase: "c-ok" }); etiqueta(g, res, "u + v", "ok");
        pie.innerHTML = "<b>Regla del paralelogramo</b>: u + v es la diagonal del paralelogramo de lados u y v. Equivale a la <b>regla del triángulo</b>: se coloca el origen de v en el extremo de u (línea discontinua roja) y el vector suma va del origen de u al extremo de v.";
      } else if (m === "res") {
        res = [u[0] - v[0], u[1] - v[1]]; tit = "u − v";
        U.flecha(g, v[0], v[1], u[0], u[1], { clase: "c-ok" }); etiqueta(g, [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2], "u − v", "ok", 6, -8);
        pie.innerHTML = "<b>u − v</b> es el vector que va del <b>extremo de v al extremo de u</b> (verde). Es la forma de calcular el vector AB entre dos puntos: AB = B − A (extremo menos origen).";
      } else if (m === "esc") {
        res = [k * u[0], k * u[1]]; tit = "k·u";
        if (k !== 0) { U.flecha(g, 0, 0, res[0], res[1], { clase: "c-ok" }); etiqueta(g, res, "k·u", "ok"); }
        pie.innerHTML = "Multiplicar por k estira o encoge u: el módulo se multiplica por |k|. Si <b>k es negativo</b>, el sentido se invierte; si k = 0 se obtiene el vector nulo. Todos los múltiplos de u son <b>paralelos</b> a u.";
      } else {
        res = u; tit = "u";
        g.segmento(0, 0, u[0], 0, { clase: "c-red" }).setAttribute("stroke-width", 3); g.segmento(u[0], 0, u[0], u[1], { clase: "c-ok" }).setAttribute("stroke-width", 3);
        g.texto(u[0] / 2, 0, "u₁ = " + fmt(u[0], 1), { dy: 16, ancla: "middle", clase: "red" }); g.texto(u[0], u[1] / 2, "u₂ = " + fmt(u[1], 1), { dx: 8, clase: "ok" });
        pie.innerHTML = "Las componentes u₁ y u₂ son los <b>catetos</b> de un triángulo rectángulo y el vector es la hipotenusa: |u| = √(u₁² + u₂²) (Pitágoras).";
      }
      lectura.innerHTML = U.lec("u", V.txt(u), "pen") + (m !== "esc" && m !== "mod" ? U.lec("v", V.txt(v), "red") : "") + U.lec(tit, V.txt(res), "ok") + U.lec("Módulo de " + tit, fmt(V.mod(res), 3)) + (m === "mod" ? U.lec("Vector unitario u/|u|", V.mod(u) > 0 ? V.txt([u[0] / V.mod(u), u[1] / V.mod(u)], 3) : "—") : "");
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Vectores en el plano", semi: 6.5 });
    h1 = asa(g, function () { return st.u; }, function (x, y) { st.u = [x, y]; pinta(); }, "c-pen", "Extremo de u", 7);
    h2 = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-red", "Extremo de v", 7);
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "u + v" }, { k: "res", t: "u − v" }, { k: "esc", t: "k·u" }, { k: "mod", t: "módulo" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // ESCALAR: producto escalar, ángulo y proyección
  // ============================================================
  B.w.escalar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Producto escalar, ángulo y proyección");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { u: [4, 1], v: [2, 3] }, g, h1, h2, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var u = st.u, v = st.v, d = V.dot(u, v), mu = V.mod(u), mv = V.mod(v);
      g.limpiar(); g.mover(h1, u[0], u[1]); g.mover(h2, v[0], v[1]);
      if (mu < 1e-9 || mv < 1e-9) { lectura.innerHTML = U.lec("Vector nulo", "mueve u y v para que no sean nulos", "red"); return; }
      var ang = V.ang(u, v), cr = V.det(u, v), proy = d / (mu * mu), pp = [proy * u[0], proy * u[1]];
      var tipo = Math.abs(d) < 1e-9 ? "perpendiculares (u·v = 0)" : Math.abs(cr) < 1e-9 ? (d > 0 ? "paralelos, mismo sentido" : "paralelos, sentido contrario") : d > 0 ? "ángulo agudo (u·v &gt; 0)" : "ángulo obtuso (u·v &lt; 0)";
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" });
      etiqueta(g, u, "u", "pen"); etiqueta(g, v, "v", "red");
      g.segmento(v[0], v[1], pp[0], pp[1], { clase: "c-faint", dash: "4 4" });
      g.segmento(0, 0, pp[0], pp[1], { clase: "c-ok" }).setAttribute("stroke-width", 5);
      g.arco(0, 0, 0.8, Math.atan2(u[1], u[0]) / R, Math.atan2(u[1], u[0]) / R + (cr >= 0 ? ang : -ang), { clase: "c-hl" });
      lectura.innerHTML = U.lec("u · v = u₁v₁ + u₂v₂", fmt(u[0], 1) + "·" + fmt(v[0], 1) + " + " + fmt(u[1], 1) + "·" + fmt(v[1], 1) + " = " + fmt(d, 2), "ok") + U.lec("|u| · |v| · cos α", fmt(mu, 3) + " · " + fmt(mv, 3) + " · " + fmt(Math.cos(ang * R), 4) + " = " + fmt(mu * mv * Math.cos(ang * R), 2)) + U.lec("Ángulo α", fmt(ang, 2) + "°", "red") + U.lec("Posición", tipo, "pen") + U.lec("Proyección de v sobre u (longitud con signo)", fmt(d / mu, 3), "ok");
      pie.innerHTML = "Arrastra los extremos de u y v. El producto escalar es un <b>número</b> (no un vector): vale 0 cuando son perpendiculares, es positivo si el ángulo es agudo y negativo si es obtuso. El segmento verde es la <b>proyección ortogonal</b> de v sobre u: su longitud es (u·v)/|u|.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Dos vectores, su ángulo y la proyección", semi: 5.5 });
    h1 = asa(g, function () { return st.u; }, function (x, y) { st.u = [x, y]; pinta(); }, "c-pen", "Extremo de u", 6);
    h2 = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-red", "Extremo de v", 6);
    pinta();
  };

  // ============================================================
  // COMBINACION: bases y coordenadas
  // ============================================================
  B.w.combinacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Bases: cualquier vector es una combinación lineal");
    cuerpo.innerHTML = '<div data-base class="chips"></div><div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var BASES = { can: [[1, 0], [0, 1], "base canónica i = (1, 0), j = (0, 1)"], b1: [[2, 1], [-1, 1], "u = (2, 1), v = (−1, 1)"], b2: [[1, 1], [1, -1], "u = (1, 1), v = (1, −1)"], b3: [[3, 1], [1, 2], "u = (3, 1), v = (1, 2)"] };
    var st = { base: "b1", w: [3, 4] }, g, hw, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var b = BASES[st.base], u = b[0], v = b[1], w = st.w, D = V.det(u, v), a = V.det(w, v) / D, c = V.det(u, w) / D;
      g.limpiar(); g.mover(hw, w[0], w[1]);
      var au = [a * u[0], a * u[1]], cv = [c * v[0], c * v[1]];
      g.segmento(au[0], au[1], w[0], w[1], { clase: "c-red", dash: "4 4" }); g.segmento(cv[0], cv[1], w[0], w[1], { clase: "c-pen", dash: "4 4" });
      U.flecha(g, 0, 0, au[0], au[1], { clase: "c-pen" }); U.flecha(g, 0, 0, cv[0], cv[1], { clase: "c-red" });
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" });
      g.texto(u[0], u[1], "u", { dx: 8, dy: -8, clase: "pen" }); g.texto(v[0], v[1], "v", { dx: 8, dy: -8, clase: "red" });
      U.flecha(g, 0, 0, w[0], w[1], { clase: "c-ok" }); g.texto(w[0], w[1], "w", { dx: 8, dy: -8, clase: "ok" });
      lectura.innerHTML = U.lec("Base elegida", BASES[st.base][2]) + U.lec("w (coordenadas habituales)", V.txt(w), "ok") + U.lec("w = a·u + b·v", "a = " + fmt(a, 3) + " · b = " + fmt(c, 3), "pen") + U.lec("Comprobación", fmt(a, 2) + "·" + V.txt(u, 0) + " + " + fmt(c, 2) + "·" + V.txt(v, 0) + " = " + V.txt([a * u[0] + c * v[0], a * u[1] + c * v[1]], 2));
      pie.innerHTML = "Dos vectores <b>no paralelos</b> forman una <b>base</b>: cualquier vector w se escribe de forma única como a·u + b·v (a y b son sus coordenadas en esa base). Con la base canónica (i, j) las coordenadas son las de siempre. Arrastra w y cambia de base.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Un vector como combinación lineal de dos vectores de la base", semi: 6 });
    hw = asa(g, function () { return st.w; }, function (x, y) { st.w = [x, y]; pinta(); }, "c-ok", "Extremo de w", 8);
    U.fichas(cuerpo.querySelector("[data-base]"), Object.keys(BASES).map(function (k) { return { k: k, t: BASES[k][2] }; }), st.base, function (k) { st.base = k; pinta(); });
    pinta();
  };

  // ============================================================
  // SEGMENTO: punto medio, simétrico y división en una razón
  // ============================================================
  B.w.segmento = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Puntos de un segmento: P = A + t·AB");
    cuerpo.innerHTML = '<div data-t class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-3, -2], B: [4, 3], t: 0.5 }, g, hA, hB, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Parámetro <i>t</i>", min: -1, max: 2, step: 0.05, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var A = st.A, Bq = st.B, t = st.t, AB = [Bq[0] - A[0], Bq[1] - A[1]], P = [A[0] + t * AB[0], A[1] + t * AB[1]];
      g.limpiar(); g.mover(hA, A[0], A[1]); g.mover(hB, Bq[0], Bq[1]);
      g.segmento(-9 * AB[0] + A[0], -9 * AB[1] + A[1], 9 * AB[0] + A[0], 9 * AB[1] + A[1], { clase: "c-faint", dash: "3 5" });
      g.segmento(A[0], A[1], Bq[0], Bq[1], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.punto(A[0], A[1], { r: 5, clase: "c-pen" }); g.punto(Bq[0], Bq[1], { r: 5, clase: "c-pen" });
      etiqueta(g, A, "A", "pen"); etiqueta(g, Bq, "B", "pen");
      g.punto(P[0], P[1], { r: 7, clase: "c-red" }); etiqueta(g, P, "P", "red");
      var razon = Math.abs(1 - t) < 1e-9 ? "∞ (P = B)" : fmt(t / (1 - t), 3);
      lectura.innerHTML = U.lec("AB = B − A", V.txt(AB), "pen") + U.lec("P = A + t·AB", V.txt(P, 3), "red") + U.lec("AP/PB", razon) + U.lec("Dónde está P", t < 0 ? "fuera, antes de A" : t > 1 ? "fuera, después de B" : t === 0 ? "en A" : t === 1 ? "en B" : Math.abs(t - 0.5) < 1e-9 ? "en el punto medio" : "dentro del segmento", "ok");
      pie.innerHTML = "Cada punto de la recta AB se obtiene como P = A + t·AB. Con <b>t = 1/2</b> sale el <b>punto medio</b> M = ((a₁ + b₁)/2, (a₂ + b₂)/2). Con t entre 0 y 1, P está en el segmento; con <b>t = 2</b>, P es el <b>simétrico de A respecto de B</b>. Si P divide al segmento en la razón AP/PB = r, entonces t = r/(1 + r).";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Segmento AB y un punto P = A + t·AB", semi: 6 });
    hA = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Punto A", 8);
    hB = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Punto B", 8);
    U.fichas(cuerpo.querySelector("[data-t]"), [{ k: "0.5", t: "punto medio (t = 1/2)" }, { k: "0.3333333333333333", t: "t = 1/3" }, { k: "0.6666666666666666", t: "t = 2/3" }, { k: "0.25", t: "t = 1/4" }, { k: "2", t: "simétrico de A respecto de B (t = 2)" }, { k: "-1", t: "simétrico de B respecto de A (t = −1)" }], "", function (k) { st.t = parseFloat(k); sl.set(Math.round(st.t * 100) / 100); pinta(); });
    pinta();
  };

  // ============================================================
  // BARICENTRO: tres puntos, las medianas y el área
  // ============================================================
  B.w.baricentro = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Triángulo: baricentro, medianas y área");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-4, -2], B: [4, -1], C: [0, 4] }, g, hs = {}, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var A = st.A, Bq = st.B, Cq = st.C;
      g.limpiar(); ["A", "B", "C"].forEach(function (k) { g.mover(hs[k], st[k][0], st[k][1]); });
      var G = [(A[0] + Bq[0] + Cq[0]) / 3, (A[1] + Bq[1] + Cq[1]) / 3], MA = [(Bq[0] + Cq[0]) / 2, (Bq[1] + Cq[1]) / 2], MB = [(A[0] + Cq[0]) / 2, (A[1] + Cq[1]) / 2], MC = [(A[0] + Bq[0]) / 2, (A[1] + Bq[1]) / 2];
      var AB = [Bq[0] - A[0], Bq[1] - A[1]], AC = [Cq[0] - A[0], Cq[1] - A[1]], area = Math.abs(V.det(AB, AC)) / 2;
      g.poligono([A, Bq, Cq], { clase: "z-pen", borde: "var(--pen)" });
      [[A, MA], [Bq, MB], [Cq, MC]].forEach(function (p) { g.segmento(p[0][0], p[0][1], p[1][0], p[1][1], { clase: "c-ok", dash: "5 4" }); });
      [MA, MB, MC].forEach(function (m) { g.punto(m[0], m[1], { r: 4, clase: "c-ok" }); });
      g.punto(G[0], G[1], { r: 7, clase: "c-red" }); etiqueta(g, G, "G", "red");
      etiqueta(g, A, "A", "pen"); etiqueta(g, Bq, "B", "pen"); etiqueta(g, Cq, "C", "pen");
      lectura.innerHTML = U.lec("Baricentro G = (A + B + C)/3", V.txt(G, 3), "red") + U.lec("Puntos medios de los lados", V.txt(MA, 1) + " · " + V.txt(MB, 1) + " · " + V.txt(MC, 1), "ok") + U.lec("Área = ½·|det(AB, AC)|", fmt(area, 3), "pen") + U.lec("¿Están alineados?", area < 1e-9 ? "sí (área 0)" : "no");
      pie.innerHTML = "El <b>baricentro</b> es la media de los tres vértices y es el punto donde se cortan las <b>medianas</b> (rectas del vértice al punto medio del lado opuesto, en verde). Divide cada mediana en dos trozos en razón 2 : 1. El área se calcula con el determinante de dos lados: S = ½·|AB₁·AC₂ − AB₂·AC₁|.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Triángulo con sus medianas y su baricentro", semi: 6 });
    hs.A = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Vértice A", 8);
    hs.B = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Vértice B", 8);
    hs.C = asa(g, function () { return st.C; }, function (x, y) { st.C = [x, y]; pinta(); }, "c-pen", "Vértice C", 8);
    pinta();
  };

  // ============================================================
  // FUERZAS: composición de dos fuerzas y equilibrio
  // ============================================================
  B.w.fuerzas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Suma de fuerzas: la resultante y la equilibrante");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { f1: 6, a1: 20, f2: 5, a2: 110 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "|F₁| (N)", min: 0, max: 10, step: 0.5, val: st.f1, on: function (v) { st.f1 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo de F₁", min: 0, max: 360, step: 5, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "|F₂| (N)", min: 0, max: 10, step: 0.5, val: st.f2, on: function (v) { st.f2 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo de F₂", min: 0, max: 360, step: 5, val: st.a2, on: function (v) { st.a2 = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var F1 = [st.f1 * Math.cos(st.a1 * R), st.f1 * Math.sin(st.a1 * R)], F2 = [st.f2 * Math.cos(st.a2 * R), st.f2 * Math.sin(st.a2 * R)], Rs = [F1[0] + F2[0], F1[1] + F2[1]];
      g.limpiar();
      g.segmento(F1[0], F1[1], Rs[0], Rs[1], { clase: "c-red", dash: "4 4" }); g.segmento(F2[0], F2[1], Rs[0], Rs[1], { clase: "c-pen", dash: "4 4" });
      U.flecha(g, 0, 0, F1[0], F1[1], { clase: "c-pen" }); U.flecha(g, 0, 0, F2[0], F2[1], { clase: "c-red" });
      etiqueta(g, F1, "F₁", "pen"); etiqueta(g, F2, "F₂", "red");
      U.flecha(g, 0, 0, Rs[0], Rs[1], { clase: "c-ok" }); etiqueta(g, Rs, "R", "ok");
      if (V.mod(Rs) > 1e-9) { U.flecha(g, 0, 0, -Rs[0], -Rs[1], { clase: "c-faint" }); etiqueta(g, [-Rs[0], -Rs[1]], "E", "faint"); }
      var angR = ((Math.atan2(Rs[1], Rs[0]) / R) + 360) % 360;
      lectura.innerHTML = U.lec("F₁", V.txt(F1) + " N", "pen") + U.lec("F₂", V.txt(F2) + " N", "red") + U.lec("Resultante R = F₁ + F₂", V.txt(Rs) + " N", "ok") + U.lec("|R| y ángulo", fmt(V.mod(Rs), 3) + " N · " + (V.mod(Rs) < 1e-9 ? "—" : fmt(angR, 1) + "°")) + U.lec("Equilibrante E = −R", V.txt([-Rs[0], -Rs[1]]) + " N") + U.lec("Ángulo entre F₁ y F₂", st.f1 > 0 && st.f2 > 0 ? fmt(V.ang(F1, F2), 1) + "°" : "—");
      pie.innerHTML = "La fuerza neta es la <b>suma vectorial</b> de las fuerzas. Para que el cuerpo esté en equilibrio hace falta una tercera fuerza, la <b>equilibrante</b> E = −R, con el mismo módulo y sentido contrario (flecha gris). Prueba: dos fuerzas iguales a 120° dan una resultante igual a cada una de ellas.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -10, xmax: 10, ymin: -10, ymax: 10, w: 460, h: 380, etx: "x (N)", ety: "y (N)", etiqueta: "Fuerzas sobre un cuerpo" });
    g.rangoIso(0, 0, 11);
    pinta();
  };

  // ============================================================
  // TRABAJO: W = F·d = |F||d|cos α
  // ============================================================
  B.w.trabajo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El trabajo es un producto escalar");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { F: 8, a: 35, d: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "|F| (N)", min: 1, max: 12, step: 0.5, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo α", min: 0, max: 180, step: 5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "|d| (m)", min: 1, max: 8, step: 0.5, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var F = [st.F * Math.cos(st.a * R), st.F * Math.sin(st.a * R)], d = [st.d, 0], W = V.dot(F, d), Fp = F[0];
      g.limpiar();
      g.segmento(0, 0, st.d, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4); U.flecha(g, 0, 0, st.d, 0, { clase: "c-ink", grosor: 4 }); g.texto(st.d, 0, "desplazamiento d", { dy: 20, ancla: "end", clase: "faint" });
      U.flecha(g, 0, 0, F[0], F[1], { clase: "c-red" }); etiqueta(g, F, "F", "red");
      g.segmento(F[0], F[1], F[0], 0, { clase: "c-faint", dash: "4 4" });
      g.segmento(0, 0, Fp, 0, { clase: W >= 0 ? "c-ok" : "c-red" }).setAttribute("stroke-width", 6);
      g.arco(0, 0, 1.2, 0, st.a, { clase: "c-hl" });
      lectura.innerHTML = U.lec("W = F·d = |F|·|d|·cos α", fmt(st.F, 1) + "·" + fmt(st.d, 1) + "·" + fmt(Math.cos(st.a * R), 3) + " = " + fmt(W, 2) + " J", W >= 0 ? "ok" : "red") + U.lec("Componente de F en la dirección de d", fmt(Fp, 3) + " N") + U.lec("Signo del trabajo", st.a < 90 ? "positivo (la fuerza ayuda al movimiento)" : st.a === 90 ? "cero (fuerza perpendicular: no trabaja)" : "negativo (la fuerza frena)");
      pie.innerHTML = "El trabajo de una fuerza constante es el producto escalar de la fuerza por el desplazamiento: sólo cuenta la <b>componente de F en la dirección del movimiento</b> (la proyección verde). Con α = 90° la fuerza no trabaja (por ejemplo, la normal o el peso en un suelo horizontal). Es lo que verás en Física de 1.º, tema de trabajo y energía.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 14, ymin: -8, ymax: 8, w: 520, h: 330, etx: "", ety: "", limpio: true, etiqueta: "Fuerza, desplazamiento y trabajo" });
    g.rangoIso(4, 0, 6.5);
    pinta();
  };
})(window);
