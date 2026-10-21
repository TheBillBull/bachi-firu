/* ============================================================
   Bachi para Firu · laboratorio de vectores II (Matemáticas I, tema 7; también sirve a Física)
   descomposicion · ejesgirados · moviles
   Usa el motor B.lab.vec de lab_vectores.js (se consulta al montar el widget,
   así que no importa el orden de carga de los archivos lab_*.js).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }
  function txt(u, d) { d = d == null ? 2 : d; return "(" + fmt(cero(u[0]), d) + ", " + fmt(cero(u[1]), d) + ")"; }
  // Punto asible con ajuste a la cuadrícula de 0,5
  function asa(g, get, set, clase, etq, lim, r) {
    var h = g.punto(0, 0, { capa: "top", r: r || 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) { var p = get(); if (tecla) set(snap(x, lim), p[1]); else set(snap(x, lim), snap(y, lim)); }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function etiqueta(g, p, t, clase, dx, dy) { g.texto(p[0], p[1], t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase }); }

  // ============================================================
  // DESCOMPOSICION: el peso en un plano inclinado (componente paralela y perpendicular)
  // ============================================================
  B.w.descomposicion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Plano inclinado: descomponer el peso");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { al: 30, m: 10, mu: 0.4 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var G = 9.8, L = 7, K = 50;
    U.slider(ctl, { et: "Inclinación <i>α</i>", min: 0, max: 70, step: 1, val: st.al, on: function (v) { st.al = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Masa (kg)", min: 1, max: 20, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 1, step: 0.05, val: st.mu, on: function (v) { st.mu = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var a = st.al * R, sn = Math.sin(a), cs = Math.cos(a), P = st.m * G, Pp = P * sn, Pn = P * cs, fmax = st.mu * Pn;
      var u = [cs, sn], n = [-sn, cs], s0 = 4.4, h = 0.42;
      var C = [s0 * u[0] + h * n[0], s0 * u[1] + h * n[1]];
      g.limpiar();
      g.poligono([[0, 0], [L * cs, 0], [L * cs, L * sn]], { clase: "z-pen", borde: "var(--ink-faint)" });
      if (st.al > 0) g.arco(L * cs, 0, 1.1, 180 - st.al, 180, { clase: "c-hl" }).setAttribute("stroke-width", 3);
      if (st.al > 0) g.texto(L * cs - 1.5, 0.3, "α", { clase: "faint" });
      var cuatro = [[-0.7, -h], [0.7, -h], [0.7, h], [-0.7, h]].map(function (q) { return [C[0] + q[0] * u[0] + q[1] * n[0], C[1] + q[0] * u[1] + q[1] * n[1]]; });
      g.poligono(cuatro, { clase: "z-ok", borde: "var(--ink)" });
      var W = [0, -P / K], Wp = [-Pp / K * u[0], -Pp / K * u[1]], Wn = [-Pn / K * n[0], -Pn / K * n[1]];
      function desde(v) { return [C[0] + v[0], C[1] + v[1]]; }
      g.segmento(C[0] + W[0], C[1] + W[1], C[0] + Wp[0], C[1] + Wp[1], { clase: "c-faint", dash: "4 4" });
      g.segmento(C[0] + W[0], C[1] + W[1], C[0] + Wn[0], C[1] + Wn[1], { clase: "c-faint", dash: "4 4" });
      U.flecha(g, C[0], C[1], C[0] + Wn[0], C[1] + Wn[1], { clase: "c-pen" });
      U.flecha(g, C[0], C[1], C[0] + Wp[0], C[1] + Wp[1], { clase: "c-red" });
      U.flecha(g, C[0], C[1], C[0] + W[0], C[1] + W[1], { clase: "c-ink" });
      var Nv = [Pn / K * n[0], Pn / K * n[1]];
      U.flecha(g, C[0], C[1], C[0] + Nv[0], C[1] + Nv[1], { clase: "c-ok" });
      var f = Math.min(Pp, fmax);
      if (f > 0.5) U.flecha(g, C[0], C[1], C[0] + f / K * u[0], C[1] + f / K * u[1], { clase: "c-faint", grosor: 4 });
      etiqueta(g, desde(W), "P", "faint", 8, 4); etiqueta(g, desde(Wp), "P∥", "red", -10, 16); etiqueta(g, desde(Wn), "P⊥", "pen", 8, 12); etiqueta(g, desde(Nv), "N", "ok", 8, -6);
      var desliza = Pp > fmax + 1e-9, acc = G * (sn - st.mu * cs);
      lectura.innerHTML = U.lec("Peso P = m·g", fmt(P, 1) + " N", "") + U.lec("P∥ = P·sen α (baja por el plano)", fmt(Pp, 1) + " N", "red") +
        U.lec("P⊥ = P·cos α (aprieta el plano)", fmt(Pn, 1) + " N", "pen") + U.lec("Normal N = P⊥", fmt(Pn, 1) + " N", "ok") +
        U.lec("Rozamiento máximo μ·N", fmt(fmax, 1) + " N") +
        U.lec("¿Desliza?", desliza ? "sí · a = " + fmt(acc, 2) + " m/s²" : "no: el rozamiento equilibra P∥", desliza ? "red" : "ok") +
        U.lec("Ángulo crítico arctan μ", fmt(Math.atan(st.mu) / R, 1) + "°");
      pie.innerHTML = "El peso P (negro) se descompone en la <b>componente paralela al plano</b> P∥ = P·sen α (roja, la que tira hacia abajo) y la <b>perpendicular</b> P⊥ = P·cos α (azul, la que aprieta contra el plano; la normal N, verde, la equilibra). La flecha gris es el rozamiento. Desliza si P∥ &gt; μ·N, es decir, si <b>tan α &gt; μ</b>. Con α = 0° todo el peso es perpendicular; con α = 90° todo sería paralelo.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 10, ymin: -2, ymax: 8, w: 520, h: 400, etx: "", ety: "", limpio: true, etiqueta: "Bloque en un plano inclinado con su peso descompuesto" });
    g.rangoIso(3.4, 2.8, 4.6);
    pinta();
  };

  // ============================================================
  // EJESGIRADOS: coordenadas en una base ortonormal girada
  // ============================================================
  B.w.ejesgirados = function (host) {
    var V = B.lab.vec;
    var cuerpo = B.caja(host, "Pruébalo", "Base ortonormal girada: coordenadas con el producto escalar");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { phi: 30, v: [4, 2] }, g, hv, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sP = U.slider(ctl, { et: "Giro de los ejes <i>φ</i>", min: -90, max: 90, step: 1, val: st.phi, on: function (v) { st.phi = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var p = st.phi * R, e1 = [Math.cos(p), Math.sin(p)], e2 = [-Math.sin(p), Math.cos(p)], v = st.v;
      var a = V.dot(v, e1), b = V.dot(v, e2), A = [a * e1[0], a * e1[1]], Bv = [b * e2[0], b * e2[1]];
      g.limpiar(); g.mover(hv, v[0], v[1]);
      g.segmento(-9 * e1[0], -9 * e1[1], 9 * e1[0], 9 * e1[1], { clase: "c-pen", dash: "2 5" });
      g.segmento(-9 * e2[0], -9 * e2[1], 9 * e2[0], 9 * e2[1], { clase: "c-red", dash: "2 5" });
      g.segmento(v[0], v[1], A[0], A[1], { clase: "c-faint", dash: "4 4" }); g.segmento(v[0], v[1], Bv[0], Bv[1], { clase: "c-faint", dash: "4 4" });
      U.flecha(g, 0, 0, A[0], A[1], { clase: "c-pen", grosor: 5 }); U.flecha(g, 0, 0, Bv[0], Bv[1], { clase: "c-red", grosor: 5 });
      U.flecha(g, 0, 0, e1[0], e1[1], { clase: "c-ink", grosor: 2.5 }); U.flecha(g, 0, 0, e2[0], e2[1], { clase: "c-ink", grosor: 2.5 });
      etiqueta(g, [e1[0] * 1.15, e1[1] * 1.15], "e₁", "pen", 4, 14); etiqueta(g, [e2[0] * 1.15, e2[1] * 1.15], "e₂", "red", -22, 4);
      U.flecha(g, 0, 0, v[0], v[1], { clase: "c-ok" }); etiqueta(g, v, "v", "ok");
      lectura.innerHTML = U.lec("e₁ = (cos φ, sen φ)", txt(e1, 3), "pen") + U.lec("e₂ = (−sen φ, cos φ)", txt(e2, 3), "red") +
        U.lec("v en la base canónica", txt(v, 1), "ok") + U.lec("a = v·e₁ · b = v·e₂", "(" + fmt(cero(a), 3) + ", " + fmt(cero(b), 3) + ")", "") +
        U.lec("Comprobación a²+b² = |v|²", fmt(a * a + b * b, 3) + " = " + fmt(V.dot(v, v), 3), "ok");
      pie.innerHTML = "En una base <b>ortonormal</b> (vectores unitarios y perpendiculares) no hace falta resolver ningún sistema: las coordenadas de v son simplemente sus <b>productos escalares con los vectores de la base</b>, a = v·e₁ y b = v·e₂, y v = a·e₁ + b·e₂. Los ejes giran, las coordenadas cambian, pero la longitud de v (|v|² = a² + b²) no. Con φ = 0° se recupera la base canónica.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 520, h: 380, etx: "x", ety: "y", etiqueta: "Un vector y sus coordenadas en unos ejes girados" });
    g.rangoIso(0, 0, 5.5);
    hv = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-ok", "Extremo de v", 5.5);
    U.fichas(cuerpo.querySelector("[data-pre]"), [{ k: "0", t: "φ = 0° (canónica)" }, { k: "45", t: "φ = 45°" }, { k: "37", t: "φ = 37°" }, { k: "v", t: "e₁ alineado con v" }], "", function (k) {
      var f = k === "v" ? Math.max(-90, Math.min(90, Math.round(Math.atan2(st.v[1], st.v[0]) / R))) : +k; st.phi = f; sP.set(f); pinta();
    });
    pinta();
  };

  // ============================================================
  // MOVILES: velocidad relativa y distancia mínima
  // ============================================================
  B.w.moviles = function (host) {
    var V = B.lab.vec;
    var cuerpo = B.caja(host, "Pruébalo", "Dos móviles: ¿cuánto se acercan?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot rd-circ" data-g1></div><div data-ctl></div><div class="w-plot rd-circ" data-g2></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a0: [-4, -2], va: [2, 1], b0: [4, -3], vb: [-2, 2], t: 0 }, g, g2, hA, hVA, hB, hVB, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var TM = 8;
    var sT = U.slider(ctl, { et: "Tiempo <i>t</i> (h)", min: 0, max: TM, step: 0.1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " h"; } });
    function pos(r0, v, t) { return [r0[0] + v[0] * t, r0[1] + v[1] * t]; }
    function pinta() {
      var a0 = st.a0, b0 = st.b0, va = st.va, vb = st.vb, t = st.t;
      var dr = [b0[0] - a0[0], b0[1] - a0[1]], dv = [vb[0] - va[0], vb[1] - va[1]], dv2 = V.dot(dv, dv);
      var ts = dv2 < 1e-9 ? null : -V.dot(dr, dv) / dv2, dmin = dv2 < 1e-9 ? V.mod(dr) : Math.abs(V.det(dr, dv)) / Math.sqrt(dv2);
      var At = pos(a0, va, t), Bt = pos(b0, vb, t), d = Math.hypot(Bt[0] - At[0], Bt[1] - At[1]);
      g.limpiar(); g.mover(hA, a0[0], a0[1]); g.mover(hB, b0[0], b0[1]); g.mover(hVA, a0[0] + va[0], a0[1] + va[1]); g.mover(hVB, b0[0] + vb[0], b0[1] + vb[1]);
      var pA = pos(a0, va, TM), pB = pos(b0, vb, TM);
      g.segmento(a0[0], a0[1], pA[0], pA[1], { clase: "c-pen", dash: "5 4" }); g.segmento(b0[0], b0[1], pB[0], pB[1], { clase: "c-red", dash: "5 4" });
      for (var k = 1; k <= 6; k++) { var qa = pos(a0, va, k), qb = pos(b0, vb, k); g.punto(qa[0], qa[1], { r: 2.5, clase: "c-pen" }); g.punto(qb[0], qb[1], { r: 2.5, clase: "c-red" }); }
      U.flecha(g, a0[0], a0[1], a0[0] + va[0], a0[1] + va[1], { clase: "c-pen" }); U.flecha(g, b0[0], b0[1], b0[0] + vb[0], b0[1] + vb[1], { clase: "c-red" });
      if (ts !== null && ts >= 0 && ts <= TM) {
        var Ms = pos(a0, va, ts), Ns = pos(b0, vb, ts);
        g.segmento(Ms[0], Ms[1], Ns[0], Ns[1], { clase: "c-ok" }).setAttribute("stroke-width", 4);
        g.punto(Ms[0], Ms[1], { r: 4, clase: "c-ok" }); g.punto(Ns[0], Ns[1], { r: 4, clase: "c-ok" });
      }
      g.segmento(At[0], At[1], Bt[0], Bt[1], { clase: "c-ink", dash: "2 3" });
      g.punto(At[0], At[1], { r: 7, clase: "c-pen" }); etiqueta(g, At, "A", "pen", 9, -9); g.punto(Bt[0], Bt[1], { r: 7, clase: "c-red" }); etiqueta(g, Bt, "B", "red", 9, -9);
      // distancia en función del tiempo
      var f = function (x) { return Math.hypot(dr[0] + dv[0] * x, dr[1] + dv[1] * x); }, ymax = 1;
      for (var i = 0; i <= 40; i++) ymax = Math.max(ymax, f(TM * i / 40));
      g2.limpiar(); g2.rango(0, TM, 0, Math.ceil(ymax * 1.1));
      g2.curva(f, { clase: "c-pen", x0: 0, x1: TM });
      g2.segmento(t, 0, t, Math.ceil(ymax * 1.1), { clase: "c-hl", dash: "4 4" }); g2.punto(t, d, { r: 5, clase: "c-pen" });
      if (ts !== null && ts >= 0 && ts <= TM) { g2.punto(ts, dmin, { r: 6, clase: "c-ok" }); g2.texto(ts, dmin, "mínimo", { dx: 8, dy: -8, clase: "ok" }); }
      var choque = ts !== null && ts >= 0 && dmin < 0.05;
      lectura.innerHTML = U.lec("Δr₀ = B − A (en t = 0)", txt(dr, 1), "pen") + U.lec("Δv = v<sub>B</sub> − v<sub>A</sub>", txt(dv, 1), "red") +
        U.lec("Instante de máximo acercamiento", ts === null ? "no hay (la distancia es constante)" : ts >= 0 ? "t* = " + fmt(ts, 2) + " h" : "ya pasó (t* = " + fmt(ts, 2) + " h): se alejan", "ok") +
        U.lec("Distancia mínima (t ≥ 0)", fmt(ts !== null && ts < 0 ? V.mod(dr) : dmin, 3) + " km", choque ? "red" : "ok") +
        U.lec("Distancia ahora", fmt(d, 3) + " km") + U.lec("¿Chocan?", choque ? "sí, en t* = " + fmt(ts, 2) + " h" : "no", choque ? "red" : "");
      pie.innerHTML = "Arrastra las posiciones iniciales y los <b>extremos de las flechas de velocidad</b> (lo que recorre cada móvil en 1 hora). La posición de B respecto de A es Δr(t) = Δr₀ + Δv·t y la distancia es |Δr(t)|; es mínima cuando Δr es <b>perpendicular</b> a Δv, o sea Δr·Δv = 0: <b>t* = −Δr₀·Δv/|Δv|²</b> y d<sub>mín</sub> = |det(Δr₀, Δv)|/|Δv|. Hay choque si d<sub>mín</sub> = 0, es decir, si Δr₀ y Δv son paralelos y apuntan en sentidos opuestos.";
    }
    g = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 520, h: 380, etx: "x (km)", ety: "y (km)", etiqueta: "Trayectorias de dos móviles con velocidad constante" });
    g.rangoIso(0, 0, 5.5);
    g2 = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: TM, ymin: 0, ymax: 10, w: 520, h: 210, etx: "t (h)", ety: "d (km)", etiqueta: "Distancia entre los móviles según el tiempo" });
    hA = asa(g, function () { return st.a0; }, function (x, y) { st.a0 = [x, y]; pinta(); }, "c-pen", "Posición inicial de A", 5.5);
    hB = asa(g, function () { return st.b0; }, function (x, y) { st.b0 = [x, y]; pinta(); }, "c-red", "Posición inicial de B", 5.5);
    hVA = asa(g, function () { return [st.a0[0] + st.va[0], st.a0[1] + st.va[1]]; }, function (x, y) { st.va = [x - st.a0[0], y - st.a0[1]]; pinta(); }, "c-pen", "Velocidad de A", 5.5, 6);
    hVB = asa(g, function () { return [st.b0[0] + st.vb[0], st.b0[1] + st.vb[1]]; }, function (x, y) { st.vb = [x - st.b0[0], y - st.b0[1]]; pinta(); }, "c-red", "Velocidad de B", 5.5, 6);
    var PRE = [["Cruce sin choque", [-4, -2], [2, 1], [4, -3], [-2, 2]], ["Choque", [-4, 0], [2, 0], [2, 3], [-1, -1.5]], ["Se alejan", [-4, 0], [-1, 0], [2, 2], [2, 1]], ["Mismo rumbo", [-4, -3], [1, 1], [3, 2], [1, 1]]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[0] }; }), "0", function (k) { var p = PRE[+k]; st.a0 = p[1].slice(); st.va = p[2].slice(); st.b0 = p[3].slice(); st.vb = p[4].slice(); st.t = 0; sT.set(0); pinta(); });
    pinta();
  };
})(window);
