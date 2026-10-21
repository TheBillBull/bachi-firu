/* ============================================================
   Bachi para Firu · laboratorio de rectas II (Matemáticas I, tema 8)
   proglineal · haz · equilibrio
   Es autónomo: no depende del orden de carga de los archivos lab_*.js.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-9 ? 0 : x; }
  function entero(x) { return Math.abs(x - Math.round(x)) < 1e-9; }
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }
  function asa(g, get, set, clase, etq, lim) {
    var h = g.punto(0, 0, { capa: "top", r: 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) { var p = get(); if (tecla) set(snap(x, lim), p[1]); else set(snap(x, lim), snap(y, lim)); }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function etq(g, p, t, clase, dx, dy) { g.texto(p[0], p[1], t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase }); }
  function pt(p) { var d = entero(p[0]) && entero(p[1]) ? 0 : 2; return "(" + fmt(cero(p[0]), d) + (d ? "; " : ", ") + fmt(cero(p[1]), d) + ")"; }
  // Ecuación Ax + By + C = 0 bien escrita
  function ec(A, Bc, C, d) {
    d = d == null ? 2 : d;
    function term(c, v, primero) {
      c = Math.abs(c) < 5e-3 ? 0 : c; if (c === 0) return "";
      var a = Math.abs(c), s = c < 0 ? "−" : (primero ? "" : "+"), n = Math.abs(a - 1) < 1e-9 ? "" : fmt(a, d);
      return (primero ? s : " " + s + " ") + n + v;
    }
    var t = term(A, "x", true); t += term(Bc, "y", t === "");
    if (Math.abs(C) >= 5e-3) t += (t === "" ? (C < 0 ? "−" : "") : (C < 0 ? " − " : " + ")) + fmt(Math.abs(C), d);
    return (t === "" ? "0" : t) + " = 0";
  }
  function recta(g, A, Bc, C, clase, dash) {   // dibuja la recta completa Ax + By + C = 0
    var e = 400, l;
    if (Math.abs(Bc) < 1e-12) { var x = -C / A; l = g.segmento(x, -e, x, e, { clase: clase, dash: dash }); }
    else l = g.segmento(-e, (-A * -e - C) / Bc, e, (-A * e - C) / Bc, { clase: clase, dash: dash });
    return l;
  }

  // ============================================================
  // PROGLINEAL: optimizar una función lineal sobre una región (los óptimos están en los vértices)
  // ============================================================
  var BIG = 100;
  var PL = [
    { n: "Cultivos (máximo)", tipo: "max", p: 4, q: 3, ver: [12, 14],
      cons: [[1, 1, "<=", 12, "x + y ≤ 12"], [2, 1, "<=", 18, "2x + y ≤ 18"], [1, 0, ">=", 2, "x ≥ 2"], [0, 1, ">=", 0, "y ≥ 0"]],
      txt: "x e y son las hectáreas de trigo y de maíz: hay 12 ha, 18 horas de trabajo (2 h por ha de trigo y 1 h por ha de maíz) y al menos 2 ha de trigo. F = 4x + 3y es el beneficio en centenas de euros." },
    { n: "Piensos (mínimo, región no acotada)", tipo: "min", p: 3, q: 4, ver: [12, 14],
      cons: [[2, 1, ">=", 12, "2x + y ≥ 12"], [1, 2, ">=", 9, "x + 2y ≥ 9"], [1, 0, ">=", 0, "x ≥ 0"], [0, 1, ">=", 0, "y ≥ 0"]],
      txt: "x e y son los kilos de dos piensos que deben aportar al menos 12 unidades de proteína (2 por kg de A, 1 por kg de B) y 9 de fibra (1 y 2). F = 3x + 4y es el coste en euros: se busca el mínimo." },
    { n: "Infinitas soluciones", tipo: "max", p: 1, q: 1, ver: [12, 14],
      cons: [[1, 1, "<=", 12, "x + y ≤ 12"], [2, 1, "<=", 18, "2x + y ≤ 18"], [1, 0, ">=", 2, "x ≥ 2"], [0, 1, ">=", 0, "y ≥ 0"]],
      txt: "Con F = x + y, las rectas de nivel son paralelas al lado x + y = 12 y el máximo se alcanza en todos los puntos de ese lado." },
    { n: "Sin solución", tipo: "max", p: 1, q: 1, ver: [8, 8],
      cons: [[1, 1, "<=", 2, "x + y ≤ 2"], [1, 1, ">=", 5, "x + y ≥ 5"], [1, 0, ">=", 0, "x ≥ 0"], [0, 1, ">=", 0, "y ≥ 0"]],
      txt: "Las condiciones x + y ≤ 2 y x + y ≥ 5 se contradicen: la región factible es vacía y el problema no tiene solución." }
  ];
  B.w.proglineal = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Programación lineal: el óptimo está en un vértice");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { i: 0, p: PL[0].p, q: PL[0].q, k: 20, tipo: PL[0].tipo }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var opt = null;
    var sP = U.slider(ctl, { et: "Coef. de x en F", min: -6, max: 6, step: 0.5, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sQ = U.slider(ctl, { et: "Coef. de y en F", min: -6, max: 6, step: 0.5, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sK = U.slider(ctl, { et: "Nivel F = k", min: -20, max: 100, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.boton(ctl, "Ir al óptimo", function () { if (opt !== null) { st.k = Math.max(-20, Math.min(100, opt)); sK.set(st.k); pinta(); } });
    function recorta(poly, h) {
      var out = [];
      for (var i = 0; i < poly.length; i++) {
        var P = poly[i], Qn = poly[(i + 1) % poly.length], fp = h.a * P[0] + h.b * P[1] - h.c, fq = h.a * Qn[0] + h.b * Qn[1] - h.c;
        if (fp <= 1e-9) out.push(P);
        if ((fp < -1e-9 && fq > 1e-9) || (fp > 1e-9 && fq < -1e-9)) { var t = fp / (fp - fq); out.push([P[0] + t * (Qn[0] - P[0]), P[1] + t * (Qn[1] - P[1])]); }
      }
      return out;
    }
    function unicos(pts) { var o = []; pts.forEach(function (p) { if (!o.some(function (q) { return Math.abs(q[0] - p[0]) < 1e-7 && Math.abs(q[1] - p[1]) < 1e-7; })) o.push(p); }); return o; }
    function pinta() {
      var pr = PL[st.i], H = pr.cons.map(function (c) { return c[2] === "<=" ? { a: c[0], b: c[1], c: c[3] } : { a: -c[0], b: -c[1], c: -c[3] }; });
      var poly = [[-BIG, -BIG], [BIG, -BIG], [BIG, BIG], [-BIG, BIG]];
      H.forEach(function (h) { poly = recorta(poly, h); });
      poly = unicos(poly);
      var vacia = poly.length < 3;
      var ver = [];
      if (!vacia) {
        for (var i = 0; i < H.length; i++) for (var j = i + 1; j < H.length; j++) {
          var D = H[i].a * H[j].b - H[j].a * H[i].b; if (Math.abs(D) < 1e-12) continue;
          var x = (H[i].c * H[j].b - H[j].c * H[i].b) / D, y = (H[i].a * H[j].c - H[j].a * H[i].c) / D;
          if (H.every(function (h) { return h.a * x + h.b * y - h.c <= 1e-7; })) ver.push([x, y]);
        }
        ver = unicos(ver);
      }
      var nulo = st.p === 0 && st.q === 0;
      var F = function (p) { return st.p * p[0] + st.q * p[1]; };
      var noAcot = !vacia && poly.some(function (p) { return Math.abs(p[0]) > BIG - 1e-6 || Math.abs(p[1]) > BIG - 1e-6; });
      var mejores = [], sinOptimo = false, mejor = null;
      if (!vacia && !nulo) {
        var signo = st.tipo === "max" ? 1 : -1;
        mejor = Math.max.apply(null, poly.map(function (p) { return signo * F(p); })) * signo;
        var emp = poly.filter(function (p) { return Math.abs(F(p) - mejor) < 1e-7; });
        if (emp.some(function (p) { return Math.abs(p[0]) > BIG - 1e-6 || Math.abs(p[1]) > BIG - 1e-6; })) sinOptimo = true; else mejores = emp;
      }
      opt = (!vacia && !nulo && !sinOptimo) ? mejor : null;
      g.limpiar(); g.rango(-1, pr.ver[0], -1, pr.ver[1]);
      if (!vacia) g.poligono(poly, { clase: "z-ok", borde: "var(--ok)", grosor: 1.2 });
      pr.cons.forEach(function (c) { recta(g, c[0], c[1], -c[3], "c-red"); });
      if (!nulo) { var l = recta(g, st.p, st.q, -st.k, "c-pen", "7 4"); l.setAttribute("stroke-width", 3); }
      ver.forEach(function (v) {
        var es = mejores.some(function (m) { return Math.abs(m[0] - v[0]) < 1e-7 && Math.abs(m[1] - v[1]) < 1e-7; });
        g.punto(v[0], v[1], { r: es ? 8 : 5, clase: es ? "c-ok" : "c-ink" });
        if (!nulo) g.texto(v[0], v[1], "F=" + fmt(F(v), 1).replace(",0", ""), { dx: 9, dy: -9, clase: es ? "ok" : "faint" });
      });
      var cards = "";
      if (vacia) cards = U.lec("Región factible", "vacía: no hay solución", "red");
      else {
        cards = U.lec("Función objetivo", "F = " + fmt(st.p, 1) + "·x " + (st.q < 0 ? "− " : "+ ") + fmt(Math.abs(st.q), 1) + "·y · " + (st.tipo === "max" ? "máximo" : "mínimo"), "pen") + U.lec("Región", (noAcot ? "no acotada" : "acotada") + " · " + ver.length + " vértices");
        ver.slice(0, 6).forEach(function (v) { var es = mejores.some(function (m) { return Math.abs(m[0] - v[0]) < 1e-7 && Math.abs(m[1] - v[1]) < 1e-7; }); cards += U.lec("Vértice " + pt(v), "F = " + fmt(F(v), 2), es ? "ok" : ""); });
        cards += U.lec("Solución", nulo ? "F = 0 en todas partes" : sinOptimo ? "no hay " + (st.tipo === "max" ? "máximo" : "mínimo") + " (F mejora sin límite)" : mejores.length > 1 ? "infinitas: todo el lado entre " + pt(mejores[0]) + " y " + pt(mejores[1]) + " (F = " + fmt(mejor, 2) + ")" : (st.tipo === "max" ? "máximo" : "mínimo") + " en " + pt(mejores[0]) + ": F = " + fmt(mejor, 2), sinOptimo ? "red" : "ok");
      }
      lectura.innerHTML = cards;
      pie.innerHTML = pr.txt + " <b>Restricciones:</b> " + pr.cons.map(function (c) { return c[4]; }).join(" · ") + ". Mueve el <b>nivel k</b>: la recta discontinua azul F = k se desplaza paralelamente a sí misma; el último punto de la región que toca es la solución, y siempre es un <b>vértice</b> (o un lado entero si la recta de nivel es paralela a él). Cambia los coeficientes para girar las rectas de nivel y ver cómo el óptimo salta de un vértice a otro.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 12, ymin: -1, ymax: 14, w: 540, h: 400, etx: "x", ety: "y", etiqueta: "Región factible y recta de nivel de la función objetivo" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PL.map(function (p, i) { return { k: String(i), t: p.n }; }), "0", function (k) {
      st.i = +k; st.p = PL[st.i].p; st.q = PL[st.i].q; st.tipo = PL[st.i].tipo; sP.set(st.p); sQ.set(st.q); pinta();
    });
    pinta();
  };

  // ============================================================
  // HAZ: todas las rectas por un punto, por la intersección de dos rectas, o paralelas
  // ============================================================
  var PARES = [[[1, 1, -4], [1, -1, 0]], [[2, -1, -1], [1, 2, -8]]];
  B.w.haz = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Haz de rectas");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "centro", P: [1, 2], al: 45, par: 0, k: 1, Q: [3, -1], kp: 2 }, g, hP, hQ, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var S = {};
    function sl(k, et, mn, mx, stp, f) { S[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: f }); }
    sl("al", "Ángulo de la recta", 0, 179, 1, function (v) { return v + "°"; });
    sl("k", "Parámetro <i>k</i>", -4, 4, 0.25, function (v) { return fmt(v, 2); });
    sl("kp", "Término k", -10, 10, 0.5, function (v) { return fmt(v, 1); });
    var MOSTRAR = { centro: ["al"], inters: ["k"], paral: ["kp"] };
    function pinta() {
      Object.keys(S).forEach(function (k) { S[k].el.style.display = MOSTRAR[st.modo].indexOf(k) >= 0 ? "" : "none"; });
      hP.style.display = st.modo === "centro" ? "" : "none"; hQ.style.display = st.modo === "inters" ? "" : "none";
      g.limpiar();
      var txt = "";
      if (st.modo === "centro") {
        g.mover(hP, st.P[0], st.P[1]);
        for (var a = 0; a < 180; a += 15) { var m0 = Math.tan(a * R); if (a === 90) recta(g, 1, 0, -st.P[0], "c-faint", "2 4"); else recta(g, m0, -1, st.P[1] - m0 * st.P[0], "c-faint", "2 4"); }
        var vert = st.al === 90, m = Math.tan(st.al * R), A, Bc, C;
        if (vert) { A = 1; Bc = 0; C = -st.P[0]; } else { A = m; Bc = -1; C = st.P[1] - m * st.P[0]; }
        var l = recta(g, A, Bc, C, "c-red"); l.setAttribute("stroke-width", 3);
        g.punto(st.P[0], st.P[1], { r: 6, clase: "c-pen" }); etq(g, st.P, "P", "pen");
        lectura.innerHTML = U.lec("Centro del haz P", pt(st.P), "pen") + U.lec("Pendiente m = tan α", vert ? "no existe (vertical)" : fmt(m, 3), "red") +
          U.lec("Recta del haz", vert ? "x = " + fmt(st.P[0], 1) : "y − " + (st.P[1] < 0 ? "(" + fmt(st.P[1], 1) + ")" : fmt(st.P[1], 1)) + " = " + fmt(m, 2) + "·(x − " + (st.P[0] < 0 ? "(" + fmt(st.P[0], 1) + ")" : fmt(st.P[0], 1)) + ")") + U.lec("En forma general", ec(A, Bc, C, 2), "ok");
        pie.innerHTML = "Las rectas que pasan por un punto P forman un <b>haz central</b>: y − y₀ = m·(x − x₀), una recta distinta para cada pendiente m (y la vertical x = x₀, que no tiene pendiente). Arrastra P y gira la recta con el ángulo.";
      } else if (st.modo === "inters") {
        var r = PARES[st.par][0], s = PARES[st.par][1], D = r[0] * s[1] - s[0] * r[1], P = [(r[1] * s[2] - s[1] * r[2]) / D, (s[0] * r[2] - r[0] * s[2]) / D];
        g.mover(hQ, st.Q[0], st.Q[1]);
        var rr = recta(g, r[0], r[1], r[2], "c-pen"); rr.setAttribute("stroke-width", 2.5); var ss = recta(g, s[0], s[1], s[2], "c-red"); ss.setAttribute("stroke-width", 2.5);
        var A1 = r[0] + st.k * s[0], B1 = r[1] + st.k * s[1], C1 = r[2] + st.k * s[2];
        var h1 = recta(g, A1, B1, C1, "c-ok"); h1.setAttribute("stroke-width", 3.5);
        var fs = s[0] * st.Q[0] + s[1] * st.Q[1] + s[2], fr = r[0] * st.Q[0] + r[1] * st.Q[1] + r[2];
        var kq = Math.abs(fs) < 1e-9 ? null : -fr / fs;
        if (kq !== null) recta(g, r[0] + kq * s[0], r[1] + kq * s[1], r[2] + kq * s[2], "c-ink", "6 4");
        g.punto(P[0], P[1], { r: 6, clase: "c-ink" }); etq(g, P, "P" + " " + pt(P), "faint", 8, 16);
        g.punto(st.Q[0], st.Q[1], { r: 4, clase: "c-ink" });
        lectura.innerHTML = U.lec("r (azul)", ec(r[0], r[1], r[2], 0), "pen") + U.lec("s (roja)", ec(s[0], s[1], s[2], 0), "red") + U.lec("Se cortan en P", pt(P)) +
          U.lec("r + k·s = 0 con k = " + fmt(st.k, 2), ec(A1, B1, C1, 2), "ok") +
          U.lec("Recta del haz por Q = " + pt(st.Q), kq === null ? "es s (k → ∞)" : "k = " + fmt(kq, 3), "");
        pie.innerHTML = "Si r: A₁x + B₁y + C₁ = 0 y s: A₂x + B₂y + C₂ = 0 se cortan en P, la ecuación <b>r + k·s = 0</b> da (variando k) todas las rectas que pasan por P (salvo s). Sirve para hallar la recta por la intersección <i>sin calcular P</i>: se arrastra Q (punto negro) y la recta discontinua es la del haz que pasa por Q, con k = −r(Q)/s(Q).";
      } else {
        var n = [2, 1];
        for (var c = -10; c <= 10; c += 2) recta(g, n[0], n[1], c, "c-faint", "2 4");
        var lp = recta(g, n[0], n[1], st.kp, "c-red"); lp.setAttribute("stroke-width", 3);
        var nn = Math.hypot(n[0], n[1]);
        U.flecha(g, 0, 0, n[0] / nn * 1.5, n[1] / nn * 1.5, { clase: "c-pen" }); etq(g, [n[0] / nn * 1.5, n[1] / nn * 1.5], "n", "pen");
        lectura.innerHTML = U.lec("Recta del haz", ec(n[0], n[1], st.kp, 1), "red") + U.lec("Vector normal común", "n = (2, 1)", "pen") + U.lec("Distancia al origen |k|/|n|", fmt(Math.abs(st.kp) / nn, 3), "ok") + U.lec("Separación entre k y k + 1", fmt(1 / nn, 3));
        pie.innerHTML = "Las rectas <b>paralelas</b> a Ax + By + C = 0 forman el haz Ax + By + k = 0: comparten el vector normal (A, B) y solo cambia el término independiente k. La distancia entre dos de ellas, k₁ y k₂, es |k₁ − k₂|/√(A² + B²).";
      }
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 520, h: 380, etx: "x", ety: "y", etiqueta: "Haz de rectas" });
    g.rangoIso(0, 0, 6.5);
    hP = asa(g, function () { return st.P; }, function (x, y) { st.P = [x, y]; pinta(); }, "c-pen", "Centro del haz", 6);
    hQ = asa(g, function () { return st.Q; }, function (x, y) { st.Q = [x, y]; pinta(); }, "c-ok", "Punto por el que debe pasar la recta", 6);
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "centro", t: "Rectas por un punto" }, { k: "inters", t: "r + k·s = 0" }, { k: "paral", t: "Paralelas" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // EQUILIBRIO: modelos lineales de coste e ingreso
  // ============================================================
  B.w.equilibrio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Coste, ingreso y punto de equilibrio");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { F: 3000, c: 12, p: 20, x: 250 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var S = {};
    function sl(k, et, mn, mx, stp, f) { S[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: f }); }
    var eur = function (v) { return fmt(v, 0) + " €"; }, eur1 = function (v) { return fmt(v, 1) + " €"; };
    sl("F", "Costes fijos", 0, 6000, 100, eur); sl("c", "Coste por unidad", 0, 40, 0.5, eur1); sl("p", "Precio por unidad", 0, 60, 0.5, eur1); sl("x", "Unidades <i>x</i>", 0, 800, 10, function (v) { return fmt(v, 0); });
    function pinta() {
      var F = st.F, c = st.c, p = st.p, x = st.x, hay = p > c + 1e-9, xe = hay ? F / (p - c) : null, ye = hay ? p * xe : null;
      var xmax = Math.max(100, Math.ceil((hay ? 2 * xe : 600) / 100) * 100); xmax = Math.min(xmax, 4000);
      var C = function (u) { return F + c * u; }, I = function (u) { return p * u; };
      var ymax = Math.max(C(xmax), I(xmax), 100) * 1.08;
      g.limpiar(); g.rango(0, xmax, 0, ymax);
      if (hay && xe < xmax) {
        g.poligono([[0, F], [xe, ye], [0, 0]], { clase: "z-red" });
        g.poligono([[xe, ye], [xmax, I(xmax)], [xmax, C(xmax)]], { clase: "z-ok" });
      } else g.poligono([[0, F], [xmax, C(xmax)], [xmax, I(xmax)], [0, 0]], { clase: "z-red" });
      var lc = g.segmento(0, C(0), xmax, C(xmax), { clase: "c-red" }); lc.setAttribute("stroke-width", 3); var li = g.segmento(0, 0, xmax, I(xmax), { clase: "c-pen" }); li.setAttribute("stroke-width", 3);
      g.texto(xmax, C(xmax), "Coste", { dx: -4, dy: -8, ancla: "end", clase: "red" }); g.texto(xmax, I(xmax), "Ingreso", { dx: -4, dy: 16, ancla: "end", clase: "pen" });
      if (hay && xe <= xmax) { g.punto(xe, ye, { r: 7, clase: "c-ok" }); g.texto(xe, ye, "equilibrio", { dx: 10, dy: 16, clase: "ok" }); }
      g.segmento(Math.min(x, xmax), 0, Math.min(x, xmax), ymax, { clase: "c-hl", dash: "4 4" }); g.punto(Math.min(x, xmax), C(x), { r: 5, clase: "c-red" }); g.punto(Math.min(x, xmax), I(x), { r: 5, clase: "c-pen" });
      var Bx = I(x) - C(x);
      lectura.innerHTML = U.lec("Coste C(x) = " + fmt(F, 0) + " + " + fmt(c, 1) + "·x", fmt(C(x), 0) + " €", "red") + U.lec("Ingreso I(x) = " + fmt(p, 1) + "·x", fmt(I(x), 0) + " €", "pen") +
        U.lec("Beneficio B(x) = I − C", (Bx >= 0 ? "+" : "−") + fmt(Math.abs(Bx), 0) + " € " + (Bx >= 0 ? "(ganas)" : "(pierdes)"), Bx >= 0 ? "ok" : "red") +
        U.lec("Margen por unidad p − c", fmt(p - c, 1) + " €") +
        U.lec("Punto de equilibrio", hay ? "x* = " + fmt(xe, 1) + " unidades (" + fmt(ye, 0) + " €)" : "no existe: p ≤ c", hay ? "ok" : "red");
      pie.innerHTML = "El coste es una recta <b>C(x) = costes fijos + c·x</b> y el ingreso otra, <b>I(x) = p·x</b>. Donde se cortan (<b>punto de equilibrio</b>) C(x) = I(x), es decir, x* = costes fijos/(p − c): antes se pierde dinero (zona roja) y después se gana (zona verde). La pendiente de cada recta es lo que cuesta o lo que se cobra por cada unidad; la ordenada en el origen del coste son los gastos que hay que pagar aunque no se venda nada.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 800, ymin: 0, ymax: 20000, w: 540, h: 380, etx: "unidades", ety: "€", etiqueta: "Rectas de coste e ingreso y punto de equilibrio" });
    var PRE = [["Taller", 3000, 12, 20, 250], ["Imprenta", 2000, 5, 9, 300], ["Margen pequeño", 1500, 18, 20, 400], ["Precio bajo", 1000, 15, 12, 200]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (q, i) { return { k: String(i), t: q[0] }; }), "0", function (k) { var q = PRE[+k]; st.F = q[1]; st.c = q[2]; st.p = q[3]; st.x = q[4]; S.F.set(q[1]); S.c.set(q[2]); S.p.set(q[3]); S.x.set(q[4]); pinta(); });
    pinta();
  };
})(window);
