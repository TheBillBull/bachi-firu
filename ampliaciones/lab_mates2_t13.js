/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 13 (Azar y probabilidad)
   m2_venn_prob (Venn con P(A), P(B), P(A ∩ B): todas las probabilidades derivadas) ·
   m2_total_bayes (árbol con tres causas editable: probabilidad total y Bayes con barras antes/después).
   Reutiliza el motor de Matemáticas I (B.ui, estilos m13-* y los widgets m13_contingencia, m13_bayes, m13_urna, m13_combinatoria).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var NS = "http://www.w3.org/2000/svg";

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t13-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t13-estilos";
    s.textContent =
      ".m2p-barra{fill:color-mix(in srgb,var(--ink-faint) 55%,transparent)}" +
      ".m2p-barra.post{fill:var(--red)}" +
      ".m2p-hoja.sel{fill:var(--ok);stroke:var(--ok)}" +
      ".m2p-aviso{margin:6px 0 0;font-size:14px;color:var(--ink-soft)}";
    document.head.appendChild(s);
  })();

  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function txt(t, x, y, clase, ancla, parent, tam) { var e = el("text", { x: x, y: y, "text-anchor": ancla || "middle", "class": "m13-t " + (clase || "") }, parent); if (tam) e.setAttribute("font-size", tam); e.textContent = t; return e; }
  function lienzo(host, w, h, etiqueta) { var s = el("svg", { viewBox: "0 0 " + w + " " + h, "class": "m13-svg", role: "img", "aria-label": etiqueta }); host.appendChild(s); return s; }
  function d4(x) { return fmt(Math.round(x * 1e6) / 1e6, 4); }
  function d2(x) { return fmt(Math.round(x * 1e6) / 1e6, 2); }
  function fil(r, v, c) { return U.lec(r, v, c); }

  // ============================================================
  // VENN DE PROBABILIDADES: P(A), P(B), P(A ∩ B) ⟹ todo lo demás
  // Las tres entradas son enteros (centésimas) para que las comparaciones sean exactas.
  // ============================================================
  var VPRE = [
    { k: "ind", t: "Independientes", a: 50, b: 40, i: 20 },
    { k: "inc", t: "Incompatibles", a: 30, b: 40, i: 0 },
    { k: "sub", t: "A dentro de B", a: 20, b: 50, i: 20 },
    { k: "dep", t: "Dependientes", a: 60, b: 50, i: 40 },
    { k: "cub", t: "Entre los dos cubren todo", a: 70, b: 60, i: 30 }
  ];
  var VOPS = [
    { k: "u", t: "A ∪ B (al menos uno)", f: [1, 1, 1, 0], v: function (a, b, i) { return a + b - i; }, ex: "P(A) + P(B) − P(A ∩ B)" },
    { k: "i", t: "A ∩ B (los dos)", f: [0, 1, 0, 0], v: function (a, b, i) { return i; }, ex: "dato" },
    { k: "amb", t: "A − B (solo A)", f: [1, 0, 0, 0], v: function (a, b, i) { return a - i; }, ex: "P(A) − P(A ∩ B)" },
    { k: "bma", t: "B − A (solo B)", f: [0, 0, 1, 0], v: function (a, b, i) { return b - i; }, ex: "P(B) − P(A ∩ B)" },
    { k: "ex", t: "Exactamente uno", f: [1, 0, 1, 0], v: function (a, b, i) { return a + b - 2 * i; }, ex: "P(A) + P(B) − 2·P(A ∩ B)" },
    { k: "ni", t: "Ninguno: Ā ∩ B̄ = (A ∪ B)ᶜ", f: [0, 0, 0, 1], v: function (a, b, i) { return 100 - (a + b - i); }, ex: "1 − P(A ∪ B)" },
    { k: "nl", t: "No los dos: Ā ∪ B̄ = (A ∩ B)ᶜ", f: [1, 0, 1, 1], v: function (a, b, i) { return 100 - i; }, ex: "1 − P(A ∩ B)" }
  ];
  B.w.m2_venn_prob = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Venn de probabilidades: mueve P(A), P(B) y P(A ∩ B)");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-op class="chips"></div><div data-ctl></div><div class="m13-venn"></div><div class="lectura anch"></div><p class="m2p-aviso"></p><p class="w-pie"></p>';
    var st = { a: 50, b: 40, i: 20, op: "u" }, cont = cuerpo.querySelector(".m13-venn"), lectura = cuerpo.querySelector(".lectura"), aviso = cuerpo.querySelector(".m2p-aviso"), pie = cuerpo.querySelector(".w-pie"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var W = 600, H = 300, cA = [225, 150], cB = [375, 150], R = 112;
    function f2(v) { return fmt(v / 100, 2); }
    var sA = U.slider(ctl, { et: "P(A)", min: 0, max: 100, step: 1, val: st.a, on: function (v) { st.a = v; ajusta(); }, fmt: f2 });
    var sB = U.slider(ctl, { et: "P(B)", min: 0, max: 100, step: 1, val: st.b, on: function (v) { st.b = v; ajusta(); }, fmt: f2 });
    var sI = U.slider(ctl, { et: "P(A ∩ B)", min: 0, max: 100, step: 1, val: st.i, on: function (v) { st.i = v; pinta(); }, fmt: f2 });
    function limites() { return [Math.max(0, st.a + st.b - 100), Math.min(st.a, st.b)]; }
    function ajusta() {
      var L = limites(); st.i = Math.max(L[0], Math.min(L[1], st.i));
      sI.input.min = L[0]; sI.input.max = L[1]; sI.set(st.i); pinta();
    }
    function pinta() {
      var a = st.a, b = st.b, i = st.i, op = VOPS.filter(function (o) { return o.k === st.op; })[0], L = limites();
      var reg = [a - i, i, b - i, 100 - (a + b - i)];            // solo A, ambos, solo B, ninguno
      cont.innerHTML = ""; var s = lienzo(cont, W, H, "Diagrama de Venn con las probabilidades de cada región");
      var defs = el("defs", null, s), cp = el("clipPath", { id: "m2pvA" }, defs); el("circle", { cx: cA[0], cy: cA[1], r: R }, cp);
      function capa(forma, activa) { forma.setAttribute("class", "m13-vacio"); var cop = forma.cloneNode(false); cop.setAttribute("class", activa ? "m13-reg" : "m13-nada"); s.appendChild(forma); s.appendChild(cop); }
      // regiones: 0 solo A, 1 ambos, 2 solo B, 3 ninguno. Se pinta el universo, luego A, luego B, y la intersección encima
      capa(el("rect", { x: 6, y: 6, width: W - 12, height: H - 12, rx: 10 }), op.f[3]);
      capa(el("circle", { cx: cA[0], cy: cA[1], r: R }), op.f[0]);
      capa(el("circle", { cx: cB[0], cy: cB[1], r: R }), op.f[2]);
      capa(el("circle", { cx: cB[0], cy: cB[1], r: R, "clip-path": "url(#m2pvA)" }), op.f[1]);
      el("rect", { x: 6, y: 6, width: W - 12, height: H - 12, rx: 10, "class": "m13-univ" }, s);
      el("circle", { cx: cA[0], cy: cA[1], r: R, "class": "m13-cir pen" }, s); el("circle", { cx: cB[0], cy: cB[1], r: R, "class": "m13-cir red" }, s);
      txt("A", cA[0] - 78, 56, "pen", "middle", s, 22); txt("B", cB[0] + 78, 56, "red", "middle", s, 22); txt("E", 24, 30, "faint", "middle", s, 18);
      var pos = [[165, 158], [300, 158], [435, 158], [540, 270]];
      for (var k = 0; k < 4; k++) txt(d2(reg[k] / 100), pos[k][0], pos[k][1], op.f[k] ? "sel" : "faint", "middle", s, 21);
      var tot = op.v(a, b, i) / 100, ind = i * 100 === a * b, inc = i === 0;
      lectura.innerHTML =
        fil("Región iluminada: " + op.t.replace(/ \(.*$/, ""), d2(tot) + "  =  " + op.ex, "ok ancho") +
        fil("P(A ∪ B)", d2((a + b - i) / 100)) + fil("P(A ∩ B)", d2(i / 100)) +
        fil("P(Ā ∩ B̄)  [= 1 − P(A ∪ B)]", d2(1 - (a + b - i) / 100), "pen") + fil("P(Ā ∪ B̄)  [= 1 − P(A ∩ B)]", d2(1 - i / 100), "pen") +
        fil("Exactamente uno", d2((a + b - 2 * i) / 100)) + fil("P(Ā) · P(B̄)", d2((100 - a) * (100 - b) / 10000)) +
        fil("P(A | B) = P(A ∩ B)/P(B)", b ? d4(i / b) : "—", "red") + fil("P(B | A) = P(A ∩ B)/P(A)", a ? d4(i / a) : "—", "red") +
        fil("¿Independientes?", ind ? "sí: P(A)·P(B) = " + d4(a * b / 10000) + " = P(A ∩ B)" : "no: P(A)·P(B) = " + d4(a * b / 10000) + " ≠ " + d2(i / 100), ind ? "ok ancho" : "ancho") +
        fil("¿Incompatibles?", inc ? "sí: A ∩ B = ∅" : "no: P(A ∩ B) = " + d2(i / 100) + " ≠ 0", inc ? "ok ancho" : "ancho");
      aviso.textContent = "P(A ∩ B) solo puede valer entre " + d2(L[0] / 100) + " y " + d2(L[1] / 100) + " con estos P(A) y P(B).";
      pie.innerHTML = "Cada región del dibujo lleva su probabilidad; las cuatro suman 1. Todo lo demás sale de <b>sumar regiones</b>. Fíjate en dos cosas: (1) «independientes» e «incompatibles» son casi opuestos: si P(A) y P(B) no son cero, dos sucesos incompatibles <b>nunca</b> pueden ser independientes (prueba el botón «Incompatibles»); (2) las leyes de De Morgan: «ninguno» y «no los dos» son los complementarios de «al menos uno» y de «los dos».";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), VPRE.map(function (p) { return { k: p.k, t: p.t }; }), "ind", function (k) {
      var p = VPRE.filter(function (q) { return q.k === k; })[0]; st.a = p.a; st.b = p.b; st.i = p.i; sA.set(p.a); sB.set(p.b); ajusta();
    });
    U.fichas(cuerpo.querySelector("[data-op]"), VOPS.map(function (o) { return { k: o.k, t: o.t }; }), "u", function (k) { st.op = k; pinta(); });
    ajusta();
  };

  // ============================================================
  // ÁRBOL CON TRES CAUSAS: probabilidad total y Bayes
  // ============================================================
  var TPRE = [
    { k: "fab", t: "Fábrica: 3 máquinas", p: [50, 30], q: [2, 3, 6], nB: ["M₁", "M₂", "M₃"], nA: "pieza defectuosa", nAn: "pieza correcta", nota: "Cada máquina fabrica una parte de las piezas y tiene su porcentaje de defectuosas." },
    { k: "dos", t: "Solo dos máquinas", p: [60, 40], q: [2, 5, 0], nB: ["M₁", "M₂", "M₃"], nA: "pieza defectuosa", nAn: "pieza correcta", nota: "El ejemplo de la teoría: la tercera máquina no fabrica nada (P = 0)." },
    { k: "edad", t: "Test por grupos de edad", p: [60, 30], q: [1, 3, 8], nB: ["jóvenes", "adultos", "mayores"], nA: "enfermo", nAn: "sano", nota: "Si una persona está enferma, ¿de qué grupo es más probable que sea?" },
    { k: "ind", t: "A no depende de B", p: [50, 30], q: [10, 10, 10], nB: ["B₁", "B₂", "B₃"], nA: "A", nAn: "Ā", nota: "Todas las causas dan A con la misma probabilidad: saber A no cambia nada (posterior = prior)." }
  ];
  B.w.m2_total_bayes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Árbol con tres causas: probabilidad total y Bayes");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-dado class="chips"></div><div data-ctl></div><div class="m13-venn m2p-arbol"></div><div class="m13-venn m2p-barras"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, p1: 50, p2: 30, q: [2, 3, 6], dado: "a" }, arbol = cuerpo.querySelector(".m2p-arbol"), barras = cuerpo.querySelector(".m2p-barras"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    function pc(v) { return fmt(v, 1) + " %"; }
    var s1 = U.slider(ctl, { et: "P(B₁)", min: 0, max: 100, step: 0.5, val: st.p1, on: function (v) { st.p1 = v; if (st.p1 + st.p2 > 100) { st.p2 = 100 - st.p1; s2.set(st.p2); } s2.input.max = 100 - st.p1; pinta(); }, fmt: pc });
    var s2 = U.slider(ctl, { et: "P(B₂)", min: 0, max: 100, step: 0.5, val: st.p2, on: function (v) { st.p2 = v; pinta(); }, fmt: pc });
    var sq = [0, 1, 2].map(function (k) { return U.slider(ctl, { et: "P(A | B" + ["₁", "₂", "₃"][k] + ")", min: 0, max: 100, step: 0.5, val: st.q[k], on: function (v) { st.q[k] = v; pinta(); }, fmt: pc }); });
    function pinta() {
      var N = TPRE[st.i], p = [st.p1 / 100, st.p2 / 100, Math.max(0, 1 - st.p1 / 100 - st.p2 / 100)], q = st.q.map(function (v) { return v / 100; });
      var conj = [0, 1, 2].map(function (k) { return [p[k] * q[k], p[k] * (1 - q[k])]; });             // [Bk∩A, Bk∩Ā]
      var pA = conj[0][0] + conj[1][0] + conj[2][0], pAn = 1 - pA, d = st.dado === "a" ? 0 : 1, den = d ? pAn : pA;
      var post = [0, 1, 2].map(function (k) { return den > 1e-12 ? conj[k][d] / den : NaN; });
      // ---- árbol
      var W = 600, Hh = 330; arbol.innerHTML = ""; var s = lienzo(arbol, W, Hh, "Árbol de tres causas B1, B2 y B3 y el suceso A");
      var r = [28, 165], m = [[210, 55], [210, 165], [210, 275]], hojas = [];
      for (var k = 0; k < 3; k++) hojas.push([[395, m[k][1] - 24], [395, m[k][1] + 24]]);
      function rama(a, b, et, cl, dy) { el("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": "m13-rama " + (cl || "") }, s); txt(et, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (dy || -7), cl || "", "middle", s, 12.5); }
      for (k = 0; k < 3; k++) {
        rama(r, m[k], d2(p[k]), k === 1 ? "faint" : "pen", k === 0 ? -8 : k === 2 ? 16 : -7);
        rama(m[k], hojas[k][0], d2(q[k]), "pen", -6); rama(m[k], hojas[k][1], d2(1 - q[k]), "faint", 14);
        el("circle", { cx: m[k][0], cy: m[k][1], r: 7, "class": "m13-nodo" }, s); txt(N.nB[k], m[k][0] - 4, m[k][1] - 14, "pen", "end", s, 13);
        for (var j = 0; j < 2; j++) {
          var sel = j === d; el("circle", { cx: hojas[k][j][0], cy: hojas[k][j][1], r: 6, "class": "m13-hoja m2p-hoja" + (sel ? " sel" : "") }, s);
          txt("B" + ["₁", "₂", "₃"][k] + " ∩ " + (j ? "Ā" : "A") + " = " + d4(conj[k][j]), hojas[k][j][0] + 13, hojas[k][j][1] + 5, sel ? "ok" : "faint", "start", s, 13);
        }
      }
      el("circle", { cx: r[0], cy: r[1], r: 7, "class": "m13-nodo" }, s);
      // ---- barras antes / después
      var Wb = 600, Hb = 150; barras.innerHTML = ""; var sb = lienzo(barras, Wb, Hb, "Probabilidad de cada causa antes y después de saber el resultado");
      var x0 = 110, ancho = 400;
      txt("Antes: P(Bᵢ)", x0, 16, "faint", "start", sb, 12); txt("Después: P(Bᵢ | " + (d ? "Ā" : "A") + ")", x0 + 205, 16, "red", "start", sb, 12);
      for (k = 0; k < 3; k++) {
        var y = 26 + k * 40;
        txt(N.nB[k], 8, y + 24, "pen", "start", sb, 14);
        el("rect", { x: x0, y: y, width: Math.max(1, p[k] * ancho * 0.45), height: 14, rx: 3, "class": "m2p-barra" }, sb); txt(d2(p[k]), x0 + p[k] * ancho * 0.45 + 5, y + 12, "faint", "start", sb, 12);
        var pv = isNaN(post[k]) ? 0 : post[k];
        el("rect", { x: x0, y: y + 17, width: Math.max(1, pv * ancho * 0.45), height: 14, rx: 3, "class": "m2p-barra post" }, sb); txt(isNaN(post[k]) ? "—" : d2(pv), x0 + pv * ancho * 0.45 + 5, y + 29, "red", "start", sb, 12);
      }
      var rows = fil("Contexto", N.nota, "ancho") +
        fil("P(B₃) = 1 − P(B₁) − P(B₂)", d4(p[2])) +
        fil("Total: P(A)", conj.map(function (c) { return d4(c[0]); }).join(" + ") + " = " + d4(pA), "ok ancho") +
        fil("P(Ā)", d4(pAn));
      for (k = 0; k < 3; k++) if (p[k] > 0) rows += fil("Bayes: P(B" + ["₁", "₂", "₃"][k] + " | " + (d ? "Ā" : "A") + ")", isNaN(post[k]) ? "—" : d4(conj[k][d]) + " / " + d4(den) + " = " + d4(post[k]), "red ancho");
      lectura.innerHTML = rows;
      pie.innerHTML = "Cada hoja es el producto de su rama: <b>P(Bᵢ ∩ A) = P(Bᵢ)·P(A | Bᵢ)</b>. La <b>probabilidad total</b> suma las hojas con A (las verdes si elegiste «Dado A»). <b>Bayes</b> divide cada hoja verde entre esa suma, así que las tres probabilidades «después» suman siempre 1. Las barras rojas son las grises corregidas por la información: la causa que más «tiende» a producir A sube, y la que menos, baja.";
    }
    function aplica(k) {
      var N = TPRE.filter(function (t) { return t.k === k; })[0]; st.i = TPRE.indexOf(N); st.p1 = N.p[0]; st.p2 = N.p[1]; st.q = N.q.slice();
      s2.input.max = 100; s1.set(st.p1); s2.set(st.p2); s2.input.max = 100 - st.p1; sq.forEach(function (sl, j) { sl.set(st.q[j]); });
      pinta();
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), TPRE.map(function (t) { return { k: t.k, t: t.t }; }), "fab", aplica);
    U.fichas(cuerpo.querySelector("[data-dado]"), [{ k: "a", t: "Dado A (ocurre)" }, { k: "n", t: "Dado Ā (no ocurre)" }], "a", function (k) { st.dado = k; pinta(); });
    s2.input.max = 100 - st.p1;
    pinta();
  };
})(window);
