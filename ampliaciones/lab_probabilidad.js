/* ============================================================
   Bachi para Firu · laboratorio de probabilidad (Matemáticas I, tema 13)
   motor B.lab.prob (fracciones, combinatoria exacta, binomial)
   + m13_laplace · m13_venn · m13_union · m13_arbol · m13_urna · m13_bayes
   · m13_montecarlo · m13_combinatoria · m13_cumple · m13_monty · m13_binomial · m13_contingencia
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var P = B.lab.prob = {};
  var NS = "http://www.w3.org/2000/svg";

  // ------------------------------------------------------------
  // Motor: fracciones, factoriales exactos (BigInt), combinatoria, binomial, generador
  // ------------------------------------------------------------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  P.gcd = gcd;
  P.frac = function (n, d) {
    if (d === 0) return "—";
    var g = gcd(n, d); n /= g; d /= g; if (d < 0) { n = -n; d = -d; }
    return d === 1 ? String(n) : n + "/" + d;
  };
  P.fact = function (n) { var r = 1n; for (var i = 2; i <= n; i++) r *= BigInt(i); return r; };
  P.comb = function (n, k) { if (k < 0 || k > n) return 0n; var r = 1n; k = Math.min(k, n - k); for (var i = 1; i <= k; i++) r = r * BigInt(n - k + i) / BigInt(i); return r; };
  P.variaciones = function (n, k) { if (k > n || k < 0) return 0n; var r = 1n; for (var i = 0; i < k; i++) r *= BigInt(n - i); return r; };
  P.big = function (v) { var s = v.toString(), o = "", c = 0; for (var i = s.length - 1; i >= 0; i--) { o = s.charAt(i) + o; if (++c % 3 === 0 && i > 0) o = " " + o; } return o; };
  P.binom = function (n, k, p) { return Number(P.comb(n, k)) * Math.pow(p, k) * Math.pow(1 - p, n - k); };
  P.rng = function (seed) { var s = seed >>> 0; return function () { s += 0x6D2B79F5; var t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  P.cumpleanos = function (n, dias) { var q = 1; for (var i = 0; i < n; i++) q *= (dias - i) / dias; return 1 - q; };

  // ------------------------------------------------------------
  // Utilidades de interfaz
  // ------------------------------------------------------------
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function txt(t, x, y, clase, ancla, parent, tam) { var e = el("text", { x: x, y: y, "text-anchor": ancla || "middle", "class": "m13-t " + (clase || "") }, parent); if (tam) e.setAttribute("font-size", tam); e.textContent = t; return e; }
  function pct(x) { return fmt(100 * x, 2) + " %"; }
  function dec(x) { return fmt(x, 4); }
  function lienzo(host, w, h, etiqueta) {
    var s = el("svg", { viewBox: "0 0 " + w + " " + h, "class": "m13-svg", role: "img", "aria-label": etiqueta }); host.appendChild(s); return s;
  }
  function slider(host, et, mn, mx, st, val, on, f) { return U.slider(host, { et: et, min: mn, max: mx, step: st, val: val, on: on, fmt: f || function (v) { return fmt(v, 2); } }); }

  // ============================================================
  // LAPLACE: casos favorables y casos posibles
  // ============================================================
  function dosDados() { var o = []; for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) o.push({ l: a + "·" + b, a: a, b: b }); return o; }
  function baraja() {
    var o = [], palos = [["O", "oros"], ["C", "copas"], ["E", "espadas"], ["B", "bastos"]], nums = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
    palos.forEach(function (p) { nums.forEach(function (n) { o.push({ l: n + p[0], n: n, p: p[1] }); }); }); return o;
  }
  function monedas() { var o = []; for (var i = 0; i < 8; i++) { var s = ""; for (var j = 2; j >= 0; j--) s += (i >> j & 1) ? "X" : "C"; o.push({ l: s, c: (s.match(/C/g) || []).length }); } return o; }
  var EXPS = {
    dado: { t: "Un dado", cols: 6, out: [1, 2, 3, 4, 5, 6].map(function (v) { return { l: String(v), v: v }; }), ev: [
      { t: "sale par", f: function (o) { return o.v % 2 === 0; } }, { t: "sale más de 4", f: function (o) { return o.v > 4; } }, { t: "múltiplo de 3", f: function (o) { return o.v % 3 === 0; } },
      { t: "número primo", f: function (o) { return [2, 3, 5].indexOf(o.v) >= 0; } }, { t: "sale 7 (imposible)", f: function () { return false; } }, { t: "sale menos de 7 (seguro)", f: function () { return true; } }] },
    dos: { t: "Dos dados", cols: 6, out: dosDados(), ev: [
      { t: "suma = 7", f: function (o) { return o.a + o.b === 7; } }, { t: "suma ≥ 10", f: function (o) { return o.a + o.b >= 10; } }, { t: "dobles (iguales)", f: function (o) { return o.a === o.b; } },
      { t: "al menos un 6", f: function (o) { return o.a === 6 || o.b === 6; } }, { t: "ningún 6", f: function (o) { return o.a !== 6 && o.b !== 6; } }, { t: "producto = 12", f: function (o) { return o.a * o.b === 12; } },
      { t: "suma par", f: function (o) { return (o.a + o.b) % 2 === 0; } }, { t: "1.º menor que 2.º", f: function (o) { return o.a < o.b; } }] },
    baraja: { t: "Baraja española (40 cartas)", cols: 10, out: baraja(), ev: [
      { t: "as", f: function (o) { return o.n === 1; } }, { t: "copas", f: function (o) { return o.p === "copas"; } }, { t: "figura (sota, caballo o rey)", f: function (o) { return o.n >= 10; } },
      { t: "oros o figura", f: function (o) { return o.p === "oros" || o.n >= 10; } }, { t: "rey de copas", f: function (o) { return o.n === 12 && o.p === "copas"; } }, { t: "no es de oros", f: function (o) { return o.p !== "oros"; } },
      { t: "un 7", f: function (o) { return o.n === 7; } }] },
    monedas: { t: "Tres monedas", cols: 4, out: monedas(), ev: [
      { t: "exactamente 2 caras", f: function (o) { return o.c === 2; } }, { t: "al menos una cara", f: function (o) { return o.c >= 1; } }, { t: "ninguna cara", f: function (o) { return o.c === 0; } },
      { t: "3 caras o 3 cruces", f: function (o) { return o.c === 3 || o.c === 0; } }, { t: "más caras que cruces", f: function (o) { return o.c >= 2; } }] },
    urna: { t: "Urna: 5 rojas y 3 azules", cols: 8, out: [1, 2, 3, 4, 5].map(function (i) { return { l: "R" + i, c: "r" }; }).concat([1, 2, 3].map(function (i) { return { l: "A" + i, c: "a" }; })), ev: [
      { t: "bola roja", f: function (o) { return o.c === "r"; } }, { t: "bola azul", f: function (o) { return o.c === "a"; } }, { t: "bola verde (imposible)", f: function () { return false; } }] }
  };
  B.w.m13_laplace = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Regla de Laplace: cuenta casos favorables y casos posibles");
    cuerpo.innerHTML = '<div data-exp class="chips"></div><div data-ev class="chips"></div><div class="m13-grid"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { e: "dos", v: 0 }, grid = cuerpo.querySelector(".m13-grid"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function evChips() { U.fichas(cuerpo.querySelector("[data-ev]"), EXPS[st.e].ev.map(function (v, i) { return { k: String(i), t: v.t }; }), String(st.v), function (k) { st.v = +k; pinta(); }); }
    function pinta() {
      var X = EXPS[st.e], A = X.ev[st.v], n = X.out.length, fav = 0;
      grid.style.gridTemplateColumns = "repeat(" + X.cols + ", minmax(0, 1fr))";
      grid.innerHTML = X.out.map(function (o) { var s = A.f(o); if (s) fav++; return '<div class="m13-cel' + (s ? " fav" : "") + '">' + o.l + "</div>"; }).join("");
      var p = fav / n;
      lectura.innerHTML = fil("Casos posibles", n, "pen") + fil("Casos favorables (" + A.t + ")", fav, "ok") + fil("P(" + A.t + ")", fav + "/" + n + (P.frac(fav, n) !== fav + "/" + n ? " = " + P.frac(fav, n) : "") + " = " + dec(p) + " = " + pct(p), "ok ancho") +
        fil("Suceso contrario", "P(no " + A.t + ") = " + (n - fav) + "/" + n + " = " + P.frac(n - fav, n) + " = 1 − " + P.frac(fav, n), "red ancho");
      pie.innerHTML = "Las casillas verdes son los casos favorables. La regla de Laplace sólo es válida si <b>todos los casos posibles son equiprobables</b> (dado sin trucar, baraja bien barajada, monedas justas). Con dos dados hay <b>36</b> casos y no 11 (las sumas no son equiprobables: sólo hay una manera de sacar 2 y seis de sacar 7).";
    }
    U.fichas(cuerpo.querySelector("[data-exp]"), Object.keys(EXPS).map(function (k) { return { k: k, t: EXPS[k].t }; }), "dos", function (k) { st.e = k; st.v = 0; evChips(); pinta(); });
    evChips(); pinta();
  };

  // ============================================================
  // VENN: operaciones con sucesos
  // ============================================================
  var VP = [
    { t: "pares y múltiplos de 3", A: function (v) { return v % 2 === 0; }, B: function (v) { return v % 3 === 0; }, nA: "pares", nB: "múltiplos de 3" },
    { t: "≤ 6 y ≥ 4", A: function (v) { return v <= 6; }, B: function (v) { return v >= 4; }, nA: "números ≤ 6", nB: "números ≥ 4" },
    { t: "primos e impares", A: function (v) { return [2, 3, 5, 7, 11].indexOf(v) >= 0; }, B: function (v) { return v % 2 === 1; }, nA: "primos", nB: "impares" },
    { t: "A dentro de B", A: function (v) { return v % 4 === 0; }, B: function (v) { return v % 2 === 0; }, nA: "múltiplos de 4", nB: "pares" },
    { t: "incompatibles", A: function (v) { return v <= 3; }, B: function (v) { return v >= 10; }, nA: "números ≤ 3", nB: "números ≥ 10" }
  ];
  var VOP = [
    { k: "u", t: "A ∪ B", f: function (a, b) { return a || b; } }, { k: "i", t: "A ∩ B", f: function (a, b) { return a && b; } }, { k: "na", t: "Ā", f: function (a) { return !a; } }, { k: "nb", t: "B̄", f: function (a, b) { return !b; } },
    { k: "amb", t: "A − B", f: function (a, b) { return a && !b; } }, { k: "bma", t: "B − A", f: function (a, b) { return b && !a; } },
    { k: "dm1", t: "(A ∪ B)ᶜ = Ā ∩ B̄", f: function (a, b) { return !(a || b); } }, { k: "dm2", t: "(A ∩ B)ᶜ = Ā ∪ B̄", f: function (a, b) { return !(a && b); } }
  ];
  B.w.m13_venn = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Operaciones con sucesos: diagramas de Venn");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-op class="chips"></div><div class="m13-venn"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { p: 0, o: "u" }, cont = cuerpo.querySelector(".m13-venn"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var W = 600, H = 340, cA = [230, 170], cB = [370, 170], R = 118;
    function region(x, y) { var a = Math.hypot(x - cA[0], y - cA[1]) < R - 10, b = Math.hypot(x - cB[0], y - cB[1]) < R - 10; return a && b ? "i" : a ? "a" : b ? "b" : "n"; }
    function slots() {
      var S = { a: [], b: [], i: [], n: [] };
      for (var y = 40; y <= H - 30; y += 30) for (var x = 24; x <= W - 24; x += 34) {
        var r = region(x, y), dA = Math.hypot(x - cA[0], y - cA[1]), dB = Math.hypot(x - cB[0], y - cB[1]);
        var fuera = Math.hypot(x - cA[0], y - cA[1]) > R + 14 && Math.hypot(x - cB[0], y - cB[1]) > R + 14;
        if (r !== "n" || fuera) S[r].push([x, y, r === "a" ? dA : r === "b" ? dB : Math.min(dA, dB)]);
      }
      var cen = { a: [160, 170], b: [440, 170], i: [300, 170], n: [300, 40] };
      Object.keys(S).forEach(function (k) { S[k].sort(function (p, q) { return Math.hypot(p[0] - cen[k][0], p[1] - cen[k][1]) - Math.hypot(q[0] - cen[k][0], q[1] - cen[k][1]); }); });
      return S;
    }
    var SL = slots();
    function pinta() {
      var V = VP[st.p], op = VOP.filter(function (o) { return o.k === st.o; })[0], vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      var grupo = { a: [], b: [], i: [], n: [] };
      vals.forEach(function (v) { var a = V.A(v), b = V.B(v); grupo[a && b ? "i" : a ? "a" : b ? "b" : "n"].push(v); });
      var reg = { a: op.f(true, false), b: op.f(false, true), i: op.f(true, true), n: op.f(false, false) };
      cont.innerHTML = ""; var s = lienzo(cont, W, H, "Diagrama de Venn de los sucesos A y B");
      var defs = el("defs", null, s), cp = el("clipPath", { id: "m13vA" }, defs); el("circle", { cx: cA[0], cy: cA[1], r: R }, cp);
      function capa(forma, activa) { forma.setAttribute("class", "m13-vacio"); var copia = forma.cloneNode(false); copia.setAttribute("class", activa ? "m13-reg" : "m13-nada"); s.appendChild(forma); s.appendChild(copia); }
      capa(el("rect", { x: 6, y: 6, width: W - 12, height: H - 12, rx: 10 }), reg.n);
      capa(el("circle", { cx: cA[0], cy: cA[1], r: R }), reg.a);
      capa(el("circle", { cx: cB[0], cy: cB[1], r: R }), reg.b);
      capa(el("circle", { cx: cB[0], cy: cB[1], r: R, "clip-path": "url(#m13vA)" }), reg.i);
      el("rect", { x: 6, y: 6, width: W - 12, height: H - 12, rx: 10, "class": "m13-univ" }, s); txt("E = {1, …, 12}", 20, 26, "faint", "start", s, 13);
      el("circle", { cx: cA[0], cy: cA[1], r: R, "class": "m13-cir pen" }, s); el("circle", { cx: cB[0], cy: cB[1], r: R, "class": "m13-cir red" }, s);
      txt("A", cA[0] - 82, 70, "pen", "middle", s, 20); txt("B", cB[0] + 82, 70, "red", "middle", s, 20);
      ["a", "b", "i", "n"].forEach(function (k) { grupo[k].forEach(function (v, j) { var q = SL[k][j]; if (q) txt(String(v), q[0], q[1] + 5, reg[k] ? "sel" : "", "middle", s, 15); }); });
      var sel = []; ["a", "i", "b", "n"].forEach(function (k) { if (reg[k]) sel = sel.concat(grupo[k]); }); sel.sort(function (x, y) { return x - y; });
      var A = vals.filter(V.A), Bs = vals.filter(V.B);
      lectura.innerHTML = fil("A (" + V.nA + ")", "{" + A.join(", ") + "}", "pen ancho") + fil("B (" + V.nB + ")", "{" + Bs.join(", ") + "}", "red ancho") + fil("Operación " + op.t, "{" + sel.join(", ") + "}", "ok ancho") +
        fil("Probabilidad (Laplace)", sel.length + "/12 = " + P.frac(sel.length, 12) + " = " + dec(sel.length / 12), "ok") + fil("¿Incompatibles?", grupo.i.length ? "no: A ∩ B = {" + grupo.i.join(", ") + "}" : "sí: A ∩ B = ∅");
      pie.innerHTML = "Se ilumina la región que corresponde a la operación elegida. Las dos últimas son las <b>leyes de De Morgan</b>: el complementario de la unión es la intersección de los complementarios, y el de la intersección es la unión de los complementarios. Comprueba que los conjuntos de las dos expresiones coinciden.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), VP.map(function (v, i) { return { k: String(i), t: v.t }; }), "0", function (k) { st.p = +k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-op]"), VOP.map(function (o) { return { k: o.k, t: o.t }; }), "u", function (k) { st.o = k; pinta(); });
    pinta();
  };

  // ============================================================
  // UNION: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
  // ============================================================
  function lente(r1, r2, d) {
    if (d >= r1 + r2) return 0; if (d <= Math.abs(r1 - r2)) return Math.PI * Math.pow(Math.min(r1, r2), 2);
    var a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)), b = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2)), c = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
    return a + b - c;
  }
  B.w.m13_union = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La probabilidad de la unión: no cuentes dos veces la intersección");
    cuerpo.innerHTML = '<div class="m13-venn"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: 0.5, b: 0.4, ab: 0.2 }, cont = cuerpo.querySelector(".m13-venn"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sa = slider(ctl, "P(A)", 0.05, 0.95, 0.01, st.a, function (v) { st.a = v; pinta(); }), sb = slider(ctl, "P(B)", 0.05, 0.95, 0.01, st.b, function (v) { st.b = v; pinta(); }), sab = slider(ctl, "P(A ∩ B)", 0, 0.95, 0.01, st.ab, function (v) { st.ab = v; pinta(); });
    function pinta() {
      var lo = Math.max(0, st.a + st.b - 1), hi = Math.min(st.a, st.b), ab = Math.max(lo, Math.min(hi, st.ab)); if (Math.abs(ab - st.ab) > 1e-9) { st.ab = ab; sab.set(ab); }
      var W = 600, H = 300, r1 = 130 * Math.sqrt(st.a), r2 = 130 * Math.sqrt(st.b), ratio = hi > 0 ? ab / hi : 0, d0 = Math.abs(r1 - r2), d1 = r1 + r2, small = Math.PI * Math.pow(Math.min(r1, r2), 2), d = d1;
      var l = d0, h = d1; for (var i = 0; i < 40; i++) { var m = (l + h) / 2; if (lente(r1, r2, m) / small > ratio) l = m; else h = m; } d = (l + h) / 2; if (ratio <= 1e-9) d = d1; if (ratio >= 1 - 1e-9) d = d0;
      var cx = W / 2, xa = cx - d / 2 - (r1 - r2) / 2 * 0, xb = xa + d;
      xa = cx - (d + r1 + r2) / 2 + r1; xb = xa + d;
      cont.innerHTML = ""; var s = lienzo(cont, W, H, "Diagrama de Venn con probabilidades"); el("rect", { x: 6, y: 6, width: W - 12, height: H - 12, rx: 10, "class": "m13-univ" }, s);
      var defs = el("defs", null, s), cp = el("clipPath", { id: "m13uA" }, defs); el("circle", { cx: xa, cy: H / 2, r: r1 }, cp);
      el("circle", { cx: xa, cy: H / 2, r: r1, "class": "m13-cir pen m13-fa" }, s); el("circle", { cx: xb, cy: H / 2, r: r2, "class": "m13-cir red m13-fb" }, s); el("circle", { cx: xb, cy: H / 2, r: r2, "class": "m13-reg", "clip-path": "url(#m13uA)" }, s);
      txt("A", xa - r1 + 18, H / 2 - r1 + 24, "pen", "middle", s, 20); txt("B", xb + r2 - 18, H / 2 - r2 + 24, "red", "middle", s, 20);
      txt(fmt(st.a - ab, 2), (xa - r1 + (xb - r2)) / 2 + (ratio < 0.999 ? 0 : 0), H / 2 + 6, "pen", "middle", s, 16); txt(fmt(ab, 2), (xb - r2 + xa + r1) / 2, H / 2 + 6, "ok", "middle", s, 16); txt(fmt(st.b - ab, 2), (xa + r1 + xb + r2) / 2, H / 2 + 6, "red", "middle", s, 16);
      txt("fuera: " + fmt(1 - st.a - st.b + ab, 2), 22, H - 18, "faint", "start", s, 13);
      var un = st.a + st.b - ab;
      lectura.innerHTML = fil("P(A) + P(B)", fmt(st.a, 2) + " + " + fmt(st.b, 2) + " = " + fmt(st.a + st.b, 2), "pen") + fil("− P(A ∩ B)", "− " + fmt(ab, 2), "red") + fil("P(A ∪ B)", fmt(un, 2) + " = " + pct(un), "ok") + fil("P(ni A ni B) = 1 − P(A ∪ B)", fmt(1 - un, 2), "ok") +
        fil("¿Incompatibles?", ab === 0 ? "sí: no se solapan, P(A ∪ B) = P(A) + P(B)" : "no: se solapan", "ancho") + fil("¿Independientes?", Math.abs(ab - st.a * st.b) < 0.0051 ? "sí: P(A ∩ B) = P(A)·P(B) = " + fmt(st.a * st.b, 3) : "no: P(A)·P(B) = " + fmt(st.a * st.b, 3) + " ≠ " + fmt(ab, 2), "ancho");
      pie.innerHTML = "Si sumas P(A) + P(B), los resultados que están en las dos cosas (la <b>zona verde</b> del solapamiento) se cuentan <b>dos veces</b>: por eso se resta una vez P(A ∩ B). Los números dentro del diagrama son las probabilidades de cada región (sólo A, A y B, sólo B). El dibujo es proporcional, no exacto.";
    }
    pinta();
  };

  // ============================================================
  // ARBOL: probabilidad total y teorema de Bayes
  // ============================================================
  var PA = [
    { t: "Test médico", a: 0.01, b1: 0.95, b2: 0.05, nA: "enfermo", nB: "test positivo", nota: "Prevalencia 1 %, sensibilidad 95 %, falsos positivos 5 %." },
    { t: "Dos máquinas", a: 0.6, b1: 0.02, b2: 0.05, nA: "pieza de la máquina 1", nB: "pieza defectuosa", nota: "La máquina 1 fabrica el 60 % con un 2 % de defectos; la 2, el 40 % con un 5 %." },
    { t: "Lluvia", a: 0.3, b1: 0.6, b2: 0.2, nA: "llueve hoy", nB: "llueve mañana", nota: "Si llueve hoy, mañana llueve con prob. 0,6; si no, con 0,2." },
    { t: "Independientes", a: 0.4, b1: 0.5, b2: 0.5, nA: "A", nB: "B", nota: "P(B | A) = P(B | Ā): saber A no cambia la probabilidad de B." }
  ];
  B.w.m13_arbol = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Diagrama de árbol: probabilidad total y teorema de Bayes");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="m13-venn"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, a: PA[0].a, b1: PA[0].b1, b2: PA[0].b2 }, cont = cuerpo.querySelector(".m13-venn"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    sl.a = slider(ctl, "P(A)", 0.001, 0.999, 0.001, st.a, function (v) { st.a = v; pinta(); }, function (v) { return fmt(v, 3); });
    sl.b1 = slider(ctl, "P(B | A)", 0, 1, 0.001, st.b1, function (v) { st.b1 = v; pinta(); }, function (v) { return fmt(v, 3); });
    sl.b2 = slider(ctl, "P(B | Ā)", 0, 1, 0.001, st.b2, function (v) { st.b2 = v; pinta(); }, function (v) { return fmt(v, 3); });
    function pinta() {
      var N = PA[st.i], a = st.a, b1 = st.b1, b2 = st.b2, pab = a * b1, pnab = (1 - a) * b2, pb = pab + pnab, pnaB = a * (1 - b1), pnanb = (1 - a) * (1 - b2), pb_ = 1 - pb;
      var W = 600, H = 330; cont.innerHTML = ""; var s = lienzo(cont, W, H, "Diagrama de árbol");
      var n0 = [30, 165], nA = [250, 90], nN = [250, 240], hojas = [[480, 50], [480, 130], [480, 200], [480, 280]];
      function rama(p, q, etiqueta, clase) { el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], "class": "m13-rama " + (clase || "") }, s); txt(etiqueta, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 - 6, clase || "", "middle", s, 13); }
      rama(n0, nA, "P(A) = " + fmt(a, 3), "pen"); rama(n0, nN, "P(Ā) = " + fmt(1 - a, 3), "faint");
      rama(nA, hojas[0], "B: " + fmt(b1, 3), "pen"); rama(nA, hojas[1], "B̄: " + fmt(1 - b1, 3), "pen"); rama(nN, hojas[2], "B: " + fmt(b2, 3), "faint"); rama(nN, hojas[3], "B̄: " + fmt(1 - b2, 3), "faint");
      [n0, nA, nN].forEach(function (n) { el("circle", { cx: n[0], cy: n[1], r: 7, "class": "m13-nodo" }, s); });
      var resultados = [["A ∩ B", pab, "ok"], ["A ∩ B̄", pnaB, ""], ["Ā ∩ B", pnab, "ok"], ["Ā ∩ B̄", pnanb, ""]];
      hojas.forEach(function (h, k) { el("circle", { cx: h[0], cy: h[1], r: 6, "class": "m13-hoja " + resultados[k][2] }, s); txt(resultados[k][0] + " = " + fmt(resultados[k][1], 4), h[0] + 14, h[1] + 5, resultados[k][2], "start", s, 14); });
      txt("A = " + N.nA, 250, 60, "pen", "middle", s, 12); txt("B = " + N.nB, 480, 22, "faint", "middle", s, 12);
      var pAB = pb > 0 ? pab / pb : NaN, pAnb = pb_ > 0 ? pnaB / pb_ : NaN;
      lectura.innerHTML = fil("Contexto", N.nota, "ancho") + fil("Probabilidad total P(B)", "P(A)·P(B|A) + P(Ā)·P(B|Ā) = " + fmt(pab, 4) + " + " + fmt(pnab, 4) + " = " + fmt(pb, 4), "ok ancho") +
        fil("Bayes: P(A | B)", isNaN(pAB) ? "—" : fmt(pab, 4) + " / " + fmt(pb, 4) + " = " + fmt(pAB, 4) + " = " + pct(pAB), "red ancho") + fil("P(A | B̄)", isNaN(pAnb) ? "—" : fmt(pAnb, 4)) +
        fil("¿Independientes?", Math.abs(b1 - b2) < 0.0006 ? "sí: P(B | A) = P(B | Ā)" : "no: saber A cambia la probabilidad de B", "ancho");
      pie.innerHTML = "Multiplicando a lo largo de cada rama se obtiene la probabilidad de cada «camino»: <b>P(A ∩ B) = P(A)·P(B | A)</b>. Sumando los caminos que acaban en B se obtiene la <b>probabilidad total</b>. Y dividiendo el camino A ∩ B entre P(B) se «da la vuelta» a la condicionada: es el <b>teorema de Bayes</b>.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PA.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; var N = PA[st.i]; st.a = N.a; st.b1 = N.b1; st.b2 = N.b2; sl.a.set(N.a); sl.b1.set(N.b1); sl.b2.set(N.b2); pinta(); });
    pinta();
  };

  // ============================================================
  // URNA: extracciones con y sin reposición (fracciones exactas)
  // ============================================================
  B.w.m13_urna = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Urna: dos extracciones, con y sin reposición");
    cuerpo.innerHTML = '<div data-rep class="chips"></div><div class="m13-venn"></div><div data-ctl></div><div class="ac-tabla m13-urna"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { r: 5, a: 3, rep: false }, cont = cuerpo.querySelector(".m13-venn"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".m13-urna"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    slider(ctl, "Bolas rojas", 1, 9, 1, st.r, function (v) { st.r = v; pinta(); }, function (v) { return fmt(v, 0); }); slider(ctl, "Bolas azules", 1, 9, 1, st.a, function (v) { st.a = v; pinta(); }, function (v) { return fmt(v, 0); });
    function pinta() {
      var R = st.r, A = st.a, N = R + A, rep = st.rep, W = 600, H = 70; cont.innerHTML = ""; var s = lienzo(cont, W, H, "Urna con bolas rojas y azules");
      for (var i = 0; i < N; i++) el("circle", { cx: 30 + i * 32, cy: 35, r: 12, "class": "m13-bola " + (i < R ? "r" : "a") }, s);
      var den2 = rep ? N : N - 1, ramas = [["R", "R", R * (rep ? R : R - 1), N * den2], ["R", "A", R * A, N * den2], ["A", "R", A * R, N * den2], ["A", "A", A * (rep ? A : A - 1), N * den2]];
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>1.ª</th><th>P(1.ª)</th><th>2.ª</th><th>P(2.ª | 1.ª)</th><th>P(camino)</th></tr></thead><tbody>" + ramas.map(function (r, k) {
        var p1 = r[0] === "R" ? P.frac(R, N) : P.frac(A, N), p2 = r[0] === "R" ? (r[1] === "R" ? P.frac(rep ? R : R - 1, den2) : P.frac(A, den2)) : (r[1] === "R" ? P.frac(R, den2) : P.frac(rep ? A : A - 1, den2));
        return "<tr><td class='" + (r[0] === "R" ? "red" : "pen") + "'>" + (r[0] === "R" ? "roja" : "azul") + "</td><td>" + p1 + "</td><td class='" + (r[1] === "R" ? "red" : "pen") + "'>" + (r[1] === "R" ? "roja" : "azul") + "</td><td>" + p2 + "</td><td><b>" + P.frac(r[2], r[3]) + "</b> = " + fmt(r[2] / r[3], 4) + "</td></tr>"; }).join("") + "</tbody></table>";
      var pRR = ramas[0][2] / ramas[0][3], pRA = ramas[1][2] / ramas[1][3], pAR = ramas[2][2] / ramas[2][3], pAA = ramas[3][2] / ramas[3][3];
      var nr = ramas[0][2] + ramas[1][2] + ramas[2][2], tot = ramas[0][3];
      lectura.innerHTML = fil("Las dos rojas", P.frac(ramas[0][2], tot) + " = " + dec(pRR), "red") + fil("Las dos del mismo color", P.frac(ramas[0][2] + ramas[3][2], tot) + " = " + dec(pRR + pAA), "ok") + fil("Una de cada color", P.frac(ramas[1][2] + ramas[2][2], tot) + " = " + dec(pRA + pAR), "pen") +
        fil("Al menos una roja", P.frac(nr, tot) + " = " + dec(pRR + pRA + pAR) + "  (= 1 − P(las dos azules) = 1 − " + P.frac(ramas[3][2], tot) + ")", "ok ancho") + fil("Comprobación", "las cuatro ramas suman " + P.frac(ramas[0][2] + ramas[1][2] + ramas[2][2] + ramas[3][2], tot), "ancho");
      pie.innerHTML = rep ? "<b>Con reposición</b>: la urna recupera su composición, así que las dos extracciones son <b>independientes</b>: P(R y R) = P(R)·P(R)." : "<b>Sin reposición</b>: la composición cambia tras la primera extracción, y las dos extracciones son <b>dependientes</b>: P(R y R) = P(R)·P(R | R) = " + P.frac(R, N) + "·" + P.frac(R - 1, N - 1) + ".";
    }
    U.fichas(cuerpo.querySelector("[data-rep]"), [{ k: "sin", t: "Sin reposición" }, { k: "con", t: "Con reposición" }], "sin", function (k) { st.rep = k === "con"; pinta(); });
    pinta();
  };

  // ============================================================
  // BAYES: 1 000 personas, frecuencias naturales
  // ============================================================
  B.w.m13_bayes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Bayes con 1 000 personas: ¿qué significa dar positivo?");
    cuerpo.innerHTML = '<div class="m13-venn"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { prev: 0.01, sens: 0.95, esp: 0.95 }, cont = cuerpo.querySelector(".m13-venn"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    slider(ctl, "Prevalencia (enfermos)", 0.001, 0.5, 0.001, st.prev, function (v) { st.prev = v; pinta(); }, function (v) { return fmt(100 * v, 1) + " %"; });
    slider(ctl, "Sensibilidad (positivo si enfermo)", 0.5, 1, 0.005, st.sens, function (v) { st.sens = v; pinta(); }, function (v) { return fmt(100 * v, 1) + " %"; });
    slider(ctl, "Especificidad (negativo si sano)", 0.5, 1, 0.005, st.esp, function (v) { st.esp = v; pinta(); }, function (v) { return fmt(100 * v, 1) + " %"; });
    function pinta() {
      // Cantidades exactas (pueden ser fraccionarias: 9,5 de 10 enfermos); sólo los puntos del dibujo se redondean
      var Ex = 1000 * st.prev, TPx = Ex * st.sens, FNx = Ex - TPx, Sx = 1000 - Ex, FPx = Sx * (1 - st.esp), TNx = Sx - FPx;
      var E = Math.round(Ex), TP = Math.round(E * st.sens), FN = E - TP, S = 1000 - E, FP = Math.round(S * (1 - st.esp)), TN = S - FP;
      var W = 600, H = 250; cont.innerHTML = ""; var s = lienzo(cont, W, H, "Mil personas: enfermos y sanos, con test positivo o negativo");
      var tipos = [["tp", TP], ["fn", FN], ["fp", FP], ["tn", TN]], lista = []; tipos.forEach(function (t) { for (var i = 0; i < t[1]; i++) lista.push(t[0]); });
      lista.forEach(function (t, i) { var c = i % 50, f = Math.floor(i / 50); el("circle", { cx: 18 + c * 11.4, cy: 16 + f * 11.4, r: 4.2, "class": "m13-pto " + t }, s); });
      var pos = TPx + FPx, ppv = pos ? TPx / pos : NaN, npv = (FNx + TNx) ? TNx / (FNx + TNx) : NaN, c1 = function (v) { return fmt(v, 1); };
      lectura.innerHTML = fil("Enfermos · sanos", c1(Ex) + " · " + c1(Sx), "ancho") + fil("Enfermos con test positivo (VP)", c1(TPx), "red") + fil("Enfermos con test negativo (FN)", c1(FNx)) + fil("Sanos con test positivo (FP)", c1(FPx), "pen") + fil("Sanos con test negativo (VN)", c1(TNx)) +
        fil("Si das positivo, ¿cuál es la probabilidad de estar enfermo?", pos ? c1(TPx) + "/(" + c1(TPx) + " + " + c1(FPx) + ") = " + pct(ppv) : "—", "ok ancho") + fil("Si das negativo, ¿probabilidad de estar sano?", isNaN(npv) ? "—" : pct(npv), "ancho");
      pie.innerHTML = "Cada punto es una persona: <b style='color:var(--red)'>rojo relleno</b> = enfermo con positivo; <b style='color:var(--red)'>rojo hueco</b> = enfermo con negativo; <b style='color:var(--pen)'>azul relleno</b> = sano con positivo (falso positivo); gris = sano con negativo. Cuando la enfermedad es <b>rara</b>, incluso un test muy bueno produce más falsos positivos que verdaderos: dar positivo no significa «estar enfermo» con seguridad. Es el fallo de la «falacia de la tasa base». (Los puntos se redondean a personas enteras; las cuentas usan los valores exactos.)";
    }
    pinta();
  };

  // ============================================================
  // MONTECARLO: la frecuencia relativa se acerca a la probabilidad
  // ============================================================
  var MC = [
    { k: "moneda", t: "Moneda: sale cara", p: 0.5, txt: "1/2", f: function (r) { return r() < 0.5; } },
    { k: "seis", t: "Dado: sale 6", p: 1 / 6, txt: "1/6", f: function (r) { return Math.floor(r() * 6) === 5; } },
    { k: "par", t: "Dado: sale par", p: 0.5, txt: "1/2", f: function (r) { return Math.floor(r() * 6) % 2 === 1; } },
    { k: "siete", t: "Dos dados: suma 7", p: 1 / 6, txt: "6/36 = 1/6", f: function (r) { return Math.floor(r() * 6) + Math.floor(r() * 6) === 5; } },
    { k: "tres", t: "Tres monedas: 2 caras", p: 3 / 8, txt: "3/8", f: function (r) { var c = 0; for (var i = 0; i < 3; i++) if (r() < 0.5) c++; return c === 2; } },
    { k: "as", t: "Baraja de 40: sale un as", p: 0.1, txt: "4/40 = 1/10", f: function (r) { return Math.floor(r() * 40) < 4; } },
    { k: "ruleta", t: "Ruleta (37): sale rojo", p: 18 / 37, txt: "18/37", f: function (r) { return Math.floor(r() * 37) < 18; } }
  ];
  B.w.m13_montecarlo = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Ley de los grandes números: simula y mira cómo se estabiliza");
    cuerpo.innerHTML = '<div data-exp class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, n: 0, h: 0, rnd: P.rng(2024), x: [], y: [] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function reinicia() { st.n = 0; st.h = 0; st.x = []; st.y = []; st.rnd = P.rng(2024 + st.i * 31); pinta(); }
    function tira(k) { var X = MC[st.i]; for (var j = 0; j < k; j++) { st.n++; if (X.f(st.rnd)) st.h++; if (st.n <= 200 || st.n % Math.ceil(st.n / 200) === 0 || j === k - 1) { st.x.push(st.n); st.y.push(st.h / st.n); } } pinta(); }
    [1, 10, 100, 1000].forEach(function (k) { U.boton(ctl, "+" + k, function () { tira(k); }, k === 100 ? "btn-comprobar" : "chip-btn"); });
    U.boton(ctl, "Reiniciar", reinicia);
    function pinta() {
      var X = MC[st.i], N = Math.max(10, Math.pow(10, Math.ceil(Math.log10(Math.max(st.n, 10))))); g.rango(0, N, 0, 1); g.limpiar();
      g.horizontal(X.p, { clase: "c-ok", dash: "6 5" });
      if (st.x.length > 1) g.polilinea(st.x.map(function (v, i) { return [v, st.y[i]]; }), { clase: "c-pen" });
      var f = st.n ? st.h / st.n : NaN;
      lectura.innerHTML = fil("Experimento", X.t, "ancho") + fil("Probabilidad teórica", X.txt + " = " + dec(X.p), "ok") + fil("Repeticiones", st.n, "pen") + fil("Veces que ocurre", st.h) + fil("Frecuencia relativa", st.n ? st.h + "/" + st.n + " = " + dec(f) : "—", "pen") + fil("Diferencia con la teórica", st.n ? fmt(Math.abs(f - X.p), 4) : "—", "red");
      pie.innerHTML = "La <b>línea verde</b> es la probabilidad teórica y la <b>azul</b> la frecuencia relativa acumulada. Con pocas repeticiones oscila mucho; al aumentar n se va pegando a la verde. Es la <b>ley de los grandes números</b>: la frecuencia relativa de un suceso tiende a su probabilidad. (No dice que en n lanzamientos «tenga que compensarse» lo anterior: sólo que la proporción se estabiliza.)";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 0, ymax: 1, w: 600, h: 300, etx: "n", ety: "f", etiqueta: "Frecuencia relativa frente al número de repeticiones" });
    U.fichas(cuerpo.querySelector("[data-exp]"), MC.map(function (x, i) { return { k: String(i), t: x.t }; }), "0", function (k) { st.i = +k; reinicia(); });
    pinta();
  };

  // ============================================================
  // COMBINATORIA: variaciones, permutaciones y combinaciones
  // ============================================================
  B.w.m13_combinatoria = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Contar sin listar: ¿importa el orden? ¿se repite?");
    cuerpo.innerHTML = '<div data-orden class="chips"></div><div data-rep class="chips"></div><div data-ctl></div><div class="lectura anch"></div><div class="m13-pascal"></div><p class="w-pie"></p>';
    var st = { n: 6, k: 3, ord: true, rep: false }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pascal = cuerpo.querySelector(".m13-pascal"), pie = cuerpo.querySelector(".w-pie"), sk;
    slider(ctl, "Elementos disponibles n", 1, 20, 1, st.n, function (v) { st.n = v; if (st.k > v && !st.rep) { st.k = v; sk.set(v); } pinta(); }, function (v) { return fmt(v, 0); });
    sk = slider(ctl, "Elegidos k", 0, 20, 1, st.k, function (v) { st.k = v; pinta(); }, function (v) { return fmt(v, 0); });
    function pinta() {
      var n = st.n, k = st.k, nombre, formula, val, ejemplo;
      if (k > n && !st.rep) { lectura.innerHTML = fil("Sin repetición", "no se pueden elegir más elementos (k = " + k + ") de los que hay (n = " + n + ")", "red ancho"); pascal.innerHTML = ""; return; }
      if (st.ord && !st.rep) { nombre = "Variaciones V(" + n + ", " + k + ")"; formula = "n·(n − 1)·…·(n − k + 1) = n!/(n − k)!"; val = P.variaciones(n, k); ejemplo = "podios, contraseñas sin repetir letras"; }
      else if (st.ord && st.rep) { nombre = "Variaciones con repetición VR(" + n + ", " + k + ")"; formula = "nᵏ"; val = BigInt(n) ** BigInt(k); ejemplo = "códigos de k dígitos, quinielas"; }
      else if (!st.ord && !st.rep) { nombre = "Combinaciones C(" + n + ", " + k + ")"; formula = "n!/(k!·(n − k)!) = (n k)"; val = P.comb(n, k); ejemplo = "comités, manos de cartas, lotería"; }
      else { nombre = "Combinaciones con repetición CR(" + n + ", " + k + ")"; formula = "C(n + k − 1, k)"; val = P.comb(n + k - 1, k); ejemplo = "elegir k bolas de n sabores"; }
      lectura.innerHTML = fil("Tipo", nombre, "pen ancho") + fil("Fórmula", formula, "ancho") + fil("Resultado", P.big(val), "ok ancho") + fil("Permutaciones de n elementos P(n) = n!", n + "! = " + P.big(P.fact(n)), "ancho") + fil("Se usa en", ejemplo, "ancho") +
        fil("Relación clave", "V(n, k) = C(n, k)·k!  →  " + P.big(P.variaciones(n, Math.min(k, n))) + " = " + P.big(P.comb(n, Math.min(k, n))) + " · " + P.big(P.fact(Math.min(k, n))), "ancho");
      // triángulo de Pascal
      var h = ""; for (var i = 0; i <= Math.min(n, 12); i++) { h += "<div class='m13-pf'>"; for (var j = 0; j <= i; j++) h += "<span class='m13-pc" + (i === n && j === k ? " sel" : i === n ? " fila" : "") + "'>" + P.big(P.comb(i, j)) + "</span>"; h += "</div>"; }
      pascal.innerHTML = n <= 12 ? "<p class='m13-pt'>Triángulo de Pascal: la fila n = " + n + " tiene los números combinatorios C(" + n + ", j).</p>" + h : "<p class='m13-pt'>(El triángulo de Pascal se muestra para n ≤ 12.)</p>";
      pie.innerHTML = "Tres preguntas deciden la fórmula: <b>1.</b> ¿Importa el orden? (ABC ≠ CBA → variaciones; ABC = CBA → combinaciones) · <b>2.</b> ¿Se pueden repetir los elementos? · <b>3.</b> ¿Se usan todos? (entonces son permutaciones, n!).";
    }
    U.fichas(cuerpo.querySelector("[data-orden]"), [{ k: "si", t: "El orden importa" }, { k: "no", t: "El orden no importa" }], "si", function (k) { st.ord = k === "si"; pinta(); });
    U.fichas(cuerpo.querySelector("[data-rep]"), [{ k: "no", t: "Sin repetición" }, { k: "si", t: "Con repetición" }], "no", function (k) { st.rep = k === "si"; pinta(); });
    pinta();
  };

  // ============================================================
  // CUMPLE: la paradoja de los cumpleaños
  // ============================================================
  B.w.m13_cumple = function (host) {
    var cuerpo = B.caja(host, "Sorpresa", "La paradoja de los cumpleaños");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 23, rnd: P.rng(77), sim: null }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    slider(ctl, "Personas en el grupo", 2, 80, 1, st.n, function (v) { st.n = v; st.sim = null; pinta(); }, function (v) { return fmt(v, 0); });
    U.boton(ctl, "Simular 1 000 grupos", function () { var c = 0; for (var t = 0; t < 1000; t++) { var seen = {}, rep = false; for (var i = 0; i < st.n; i++) { var d = Math.floor(st.rnd() * 365); if (seen[d]) { rep = true; break; } seen[d] = 1; } if (rep) c++; } st.sim = c; pinta(); }, "btn-comprobar");
    function pinta() {
      var n = st.n, p = P.cumpleanos(n, 365); g.limpiar();
      g.horizontal(0.5, { clase: "c-faint", dash: "4 4" });
      var pts = []; for (var i = 1; i <= 80; i++) pts.push([i, P.cumpleanos(i, 365)]); g.polilinea(pts, { clase: "c-pen" });
      g.vertical(n, { clase: "c-faint", dash: "4 4" }); g.punto(n, p, { r: 7, clase: "c-red" });
      var prod = []; for (var j = 0; j < Math.min(n, 4); j++) prod.push("(" + (365 - j) + "/365)");
      lectura.innerHTML = fil("Probabilidad de que ALGUNOS coincidan", dec(p) + " = " + pct(p), "red ancho") + fil("Probabilidad de que NINGUNO coincida", prod.join(" · ") + (n > 4 ? " · …" : "") + " = " + dec(1 - p), "ancho") + fil("Simulación (1 000 grupos)", st.sim == null ? "pulsa el botón" : st.sim + " de 1 000 tienen alguna coincidencia = " + fmt(st.sim / 10, 1) + " %", "pen ancho") +
        fil("Umbral", "con 23 personas ya hay más del 50 %; con 57, más del 99 %", "ancho");
      pie.innerHTML = "Parece increíble que con sólo 23 personas sea más probable que no que dos cumplan años el mismo día, pero se calcula con el <b>suceso contrario</b>: P(alguna coincidencia) = 1 − P(ninguna) y P(ninguna) = (365/365)·(364/365)·(363/365)·… Hay muchísimos <b>pares</b> posibles de personas (en 23 personas, C(23, 2) = 253), y cada par tiene una pequeña probabilidad de coincidir.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 80, ymin: 0, ymax: 1.02, w: 600, h: 300, etx: "n", ety: "P", etiqueta: "Probabilidad de coincidencia según el tamaño del grupo" });
    pinta();
  };

  // ============================================================
  // MONTY: el concurso de las tres puertas
  // ============================================================
  B.w.m13_monty = function (host) {
    var cuerpo = B.caja(host, "Juego", "El problema de Monty Hall: ¿cambias de puerta?");
    cuerpo.innerHTML = '<div class="m13-mt"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { fase: 0, coche: 0, elegida: -1, abierta: -1, rnd: P.rng(5150), s: [0, 0], c: [0, 0], msg: "Elige una puerta: detrás de una hay un coche; detrás de las otras dos, cabras." }, mt = cuerpo.querySelector(".m13-mt"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function nueva() { st.fase = 0; st.coche = Math.floor(st.rnd() * 3); st.elegida = -1; st.abierta = -1; st.msg = "Elige una puerta: detrás de una hay un coche; detrás de las otras dos, cabras."; pinta(); }
    function simula(cambia) { var gan = 0; for (var i = 0; i < 1000; i++) { var c = Math.floor(st.rnd() * 3), e = Math.floor(st.rnd() * 3), ab = [0, 1, 2].filter(function (d) { return d !== e && d !== c; }), a = ab[Math.floor(st.rnd() * ab.length)], f = cambia ? [0, 1, 2].filter(function (d) { return d !== e && d !== a; })[0] : e; if (f === c) gan++; } return gan; }
    U.boton(ctl, "Nueva partida", nueva, "btn-comprobar");
    U.boton(ctl, "Simular 1 000 veces «cambiando»", function () { st.simC = simula(true); pinta(); });
    U.boton(ctl, "Simular 1 000 veces «quedándome»", function () { st.simQ = simula(false); pinta(); });
    mt.addEventListener("click", function (e) {
      var b = e.target.closest("[data-d]"), a = e.target.closest("[data-a]");
      if (b && st.fase === 0) { st.elegida = +b.getAttribute("data-d"); var op = [0, 1, 2].filter(function (d) { return d !== st.elegida && d !== st.coche; }); st.abierta = op[Math.floor(st.rnd() * op.length)]; st.fase = 1; st.msg = "El presentador abre la puerta " + (st.abierta + 1) + ": hay una cabra. ¿Te quedas con la " + (st.elegida + 1) + " o cambias?"; pinta(); }
      if (a && st.fase === 1) { var cambia = a.getAttribute("data-a") === "c", fin = cambia ? [0, 1, 2].filter(function (d) { return d !== st.elegida && d !== st.abierta; })[0] : st.elegida, gana = fin === st.coche; var i = cambia ? 1 : 0; st.s[i]++; if (gana) st.c[i]++; st.fase = 2; st.msg = (cambia ? "Cambiaste a la puerta " : "Te quedaste con la puerta ") + (fin + 1) + ": " + (gana ? "¡COCHE! 🎉" : "cabra.") + " El coche estaba tras la puerta " + (st.coche + 1) + "."; pinta(); }
    });
    function pinta() {
      var h = ""; for (var d = 0; d < 3; d++) { var abierta = st.fase === 2 || d === st.abierta, cls = "m13-puerta" + (d === st.elegida ? " elegida" : "") + (abierta ? " abierta" : ""), cont = abierta ? (d === st.coche ? "🚗" : "🐐") : (d + 1);
        h += "<button type='button' class='" + cls + "' data-d='" + d + "'" + (st.fase !== 0 ? " disabled" : "") + " aria-label='Puerta " + (d + 1) + "'>" + cont + "</button>"; }
      h += "<p class='m13-msg'>" + st.msg + "</p>";
      if (st.fase === 1) h += "<div class='chips'><button type='button' class='chip-btn' data-a='q'>Me quedo con la " + (st.elegida + 1) + "</button><button type='button' class='chip-btn' data-a='c'>Cambio de puerta</button></div>";
      mt.innerHTML = h;
      var f = function (a, b) { return b ? a + " de " + b + " = " + fmt(100 * a / b, 1) + " %" : "—"; };
      lectura.innerHTML = fil("Tus partidas quedándote", f(st.c[0], st.s[0])) + fil("Tus partidas cambiando", f(st.c[1], st.s[1]), "ok") + fil("Simulación: siempre cambia", st.simC == null ? "pulsa el botón" : st.simC + " de 1 000 = " + fmt(st.simC / 10, 1) + " %", "ok ancho") + fil("Simulación: siempre se queda", st.simQ == null ? "pulsa el botón" : st.simQ + " de 1 000 = " + fmt(st.simQ / 10, 1) + " %", "pen ancho");
      pie.innerHTML = "<b>¿Por qué cambiar es mejor?</b> Al elegir tenías 1/3 de acertar y 2/3 de equivocarte. El presentador, que <i>sabe</i> dónde está el coche, siempre abre una puerta con cabra: si te habías equivocado (2/3), cambiar te lleva al coche; si habías acertado (1/3), cambiar te lleva a la cabra. Cambiar gana con probabilidad <b>2/3</b>; quedarse, con <b>1/3</b>. La información nueva que da el presentador modifica la probabilidad condicionada.";
    }
    nueva();
  };

  // ============================================================
  // BINOMIAL: B(n, p)
  // ============================================================
  B.w.m13_binomial = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Distribución binomial B(n, p): número de éxitos en n pruebas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 10, p: 0.5, k: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sn, sp, sk;
    sn = slider(ctl, "Pruebas n", 1, 30, 1, st.n, function (v) { st.n = v; if (st.k > v) { st.k = v; sk.set(v); } sk.input.max = v; pinta(); }, function (v) { return fmt(v, 0); });
    sp = slider(ctl, "Probabilidad de éxito p", 0.01, 0.99, 0.01, st.p, function (v) { st.p = v; pinta(); });
    sk = slider(ctl, "Valor k", 0, 30, 1, st.k, function (v) { st.k = Math.min(v, st.n); pinta(); }, function (v) { return fmt(v, 0); });
    function pinta() {
      var n = st.n, p = st.p, k = Math.min(st.k, n), pm = [], ac = 0, mx = 0, i; for (i = 0; i <= n; i++) { pm.push(P.binom(n, i, p)); mx = Math.max(mx, pm[i]); }
      g.rango(-0.8, n + 0.8, 0, Math.max(0.1, mx * 1.2)); g.limpiar();
      for (i = 0; i <= n; i++) g.rect(i - 0.4, 0, i + 0.4, pm[i], { clase: i === k ? "z-red" : i < k ? "z-pen" : "z-ok" });
      var cum = 0; for (i = 0; i <= k; i++) cum += pm[i];
      lectura.innerHTML = fil("Modelo", "X ~ B(" + n + ", " + fmt(p, 2) + ")", "ancho") + fil("P(X = " + k + ")", "C(" + n + ", " + k + ")·" + fmt(p, 2) + "<sup>" + k + "</sup>·" + fmt(1 - p, 2) + "<sup>" + (n - k) + "</sup> = " + dec(pm[k]), "red ancho") + fil("P(X ≤ " + k + ")", dec(cum), "pen") + fil("P(X ≥ " + k + ")", dec(1 - cum + pm[k]), "ok") +
        fil("Media μ = n·p", fmt(n * p, 3), "ok") + fil("Varianza σ² = n·p·(1 − p)", fmt(n * p * (1 - p), 3)) + fil("Desviación típica σ", fmt(Math.sqrt(n * p * (1 - p)), 3));
      pie.innerHTML = "Cada barra es P(X = j). La barra <b style='color:var(--red)'>roja</b> es la del valor k elegido; las azules, los valores menores (P(X ≤ k) es su suma). Se usa cuando se repite <b>n veces</b> una prueba con sólo dos resultados (éxito/fracaso), <b>independientes</b> y con la misma probabilidad p de éxito. Con p = 0,5 es simétrica; si p crece, se desplaza a la derecha.";
    }
    var PRESET = [["Moneda ×10", 10, 0.5, 5], ["Dado ×12 (sale 6)", 12, 1 / 6, 2], ["Examen test (20, 4 opciones)", 20, 0.25, 5], ["Piezas defectuosas", 25, 0.04, 1]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRESET.map(function (z, i) { return { k: String(i), t: z[0] }; }), "0", function (k) { var z = PRESET[+k]; st.n = z[1]; st.p = Math.round(z[2] * 100) / 100; st.k = z[3]; sn.set(z[1]); sp.set(st.p); sk.input.max = z[1]; sk.set(z[3]); pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 11, ymin: 0, ymax: 0.3, w: 600, h: 300, etx: "k", ety: "P", etiqueta: "Distribución binomial" });
    pinta();
  };

  // ============================================================
  // CONTINGENCIA: tabla 2 × 2, condicionadas e independencia
  // ============================================================
  var CT = [
    { t: "Vacuna y contagio", n: ["vacunado", "no vacunado", "contagiado", "no contagiado"], f: [[10, 190], [60, 240]], nota: "Filas: contagiado / no contagiado. Columnas: vacunado / no vacunado." },
    { t: "Independientes", n: ["A", "Ā", "B", "B̄"], f: [[20, 30], [40, 60]], nota: "P(A ∩ B) = P(A)·P(B) en todas las casillas." },
    { t: "Gimnasio y lesión", n: ["entrena", "no entrena", "lesionado", "sano"], f: [[12, 8], [88, 92]], nota: "Entrenar y lesionarse." }
  ];
  B.w.m13_contingencia = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Tabla de contingencia 2 × 2: probabilidades conjuntas, marginales y condicionadas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="ac-tabla m13-ct"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, f: CT[0].f.map(function (r) { return r.slice(); }) }, ct = cuerpo.querySelector(".m13-ct"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function tabla() {
      var N = CT[st.i].n, f = st.f;
      ct.innerHTML = "<table class='fo-t ac-t m13-t2'><thead><tr><th></th><th>" + N[0] + " (A)</th><th>" + N[1] + " (Ā)</th><th>Total</th></tr></thead><tbody>" +
        [0, 1].map(function (i) { return "<tr><th>" + N[2 + i] + " (" + (i ? "B̄" : "B") + ")</th>" + [0, 1].map(function (j) { return "<td><input type='number' min='0' max='9999' value='" + f[i][j] + "' data-i='" + i + "' data-j='" + j + "' aria-label='Frecuencia de " + N[2 + i] + " y " + N[j] + "'></td>"; }).join("") + "<td class='tot'></td></tr>"; }).join("") + "<tr class='m13-tot'><th>Total</th><td></td><td></td><td></td></tr></tbody></table>";
    }
    function pinta() {
      var f = st.f, N = f[0][0] + f[0][1] + f[1][0] + f[1][1], A = f[0][0] + f[1][0], Bn = f[0][0] + f[0][1], AB = f[0][0];
      var tr = ct.querySelectorAll("tbody tr"); if (tr.length === 3) { tr[0].querySelector(".tot").textContent = Bn; tr[1].querySelector(".tot").textContent = f[1][0] + f[1][1]; var t = tr[2].querySelectorAll("td"); t[0].textContent = A; t[1].textContent = f[0][1] + f[1][1]; t[2].textContent = N; }
      if (N <= 0) { lectura.innerHTML = fil("Tabla vacía", "escribe alguna frecuencia", "red ancho"); return; }
      var pA = A / N, pB = Bn / N, pAB = AB / N, cond1 = Bn ? AB / Bn : NaN, cond2 = A ? AB / A : NaN, indep = Math.abs(pAB - pA * pB) < 0.5 / N + 1e-9 && Math.abs(AB * N - A * Bn) <= Math.max(1, N / 100);
      lectura.innerHTML = fil("P(A) · P(B)", P.frac(A, N) + " = " + dec(pA) + " · " + P.frac(Bn, N) + " = " + dec(pB), "pen ancho") + fil("P(A ∩ B)", P.frac(AB, N) + " = " + dec(pAB), "ok") + fil("P(A ∪ B)", dec(pA + pB - pAB), "ok") + fil("P(A | B) = P(A ∩ B)/P(B)", isNaN(cond1) ? "—" : P.frac(AB, Bn) + " = " + dec(cond1), "red") + fil("P(B | A) = P(A ∩ B)/P(A)", isNaN(cond2) ? "—" : P.frac(AB, A) + " = " + dec(cond2), "red") +
        fil("¿Independientes?", indep ? "sí: P(A ∩ B) = P(A)·P(B)" : "no: P(A)·P(B) = " + dec(pA * pB) + " ≠ P(A ∩ B) = " + dec(pAB), indep ? "ok ancho" : "red ancho");
      pie.innerHTML = CT[st.i].nota + " Todas las probabilidades salen de contar: las <b>conjuntas</b> dividen cada casilla entre el total; las <b>marginales</b>, cada total de fila o columna; las <b>condicionadas</b>, la casilla entre el total de su fila o columna.";
    }
    ct.addEventListener("input", function (e) { var t = e.target; if (t.tagName !== "INPUT") return; st.f[+t.getAttribute("data-i")][+t.getAttribute("data-j")] = Math.max(0, Math.min(9999, Math.round(parseFloat(t.value) || 0))); pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), CT.map(function (c, i) { return { k: String(i), t: c.t }; }), "0", function (k) { st.i = +k; st.f = CT[st.i].f.map(function (r) { return r.slice(); }); tabla(); pinta(); });
    tabla(); pinta();
  };
})(window);
