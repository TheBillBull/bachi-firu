/* ============================================================
   Bachi para Firu · laboratorio de números (Matemáticas I, tema 1)
   intervalos · opintervalos · valorabs · radicales · cientifica · errabs
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};

  // ---------- álgebra de intervalos (para operar y escribir) ----------
  // Un intervalo es { lo, hi, lc, hc }: extremos y si están incluidos (lc, hc). ±Infinity cuenta como abierto.
  function vacio(i) { return i.lo > i.hi || (i.lo === i.hi && !(i.lc && i.hc)); }
  function inter(a, b) {
    var lo, lc, hi, hc;
    if (a.lo > b.lo) { lo = a.lo; lc = a.lc; } else if (a.lo < b.lo) { lo = b.lo; lc = b.lc; } else { lo = a.lo; lc = a.lc && b.lc; }
    if (a.hi < b.hi) { hi = a.hi; hc = a.hc; } else if (a.hi > b.hi) { hi = b.hi; hc = b.hc; } else { hi = a.hi; hc = a.hc && b.hc; }
    return { lo: lo, hi: hi, lc: lc, hc: hc };
  }
  function une(a, b) {
    if (vacio(a)) return vacio(b) ? [] : [b];
    if (vacio(b)) return [a];
    var p = a.lo <= b.lo ? a : b, q = p === a ? b : a;                // p empieza antes
    var toca = q.lo < p.hi || (q.lo === p.hi && (p.hc || q.lc));
    if (!toca) return [p, q];
    var lo = Math.min(a.lo, b.lo), lc = a.lo === b.lo ? a.lc || b.lc : (a.lo < b.lo ? a.lc : b.lc);
    var hi = Math.max(a.hi, b.hi), hc = a.hi === b.hi ? a.hc || b.hc : (a.hi > b.hi ? a.hc : b.hc);
    return [{ lo: lo, hi: hi, lc: lc, hc: hc }];
  }
  function num(x) { return x === Infinity ? "+∞" : x === -Infinity ? "−∞" : fmt(x, 2); }
  function txt(i) {
    if (vacio(i)) return "∅";
    return (i.lc && isFinite(i.lo) ? "[" : "(") + num(i.lo) + ", " + num(i.hi) + (i.hc && isFinite(i.hi) ? "]" : ")");
  }
  function desig(i) {
    if (vacio(i)) return "sin solución";
    var l = isFinite(i.lo), r = isFinite(i.hi);
    if (l && r) return fmt(i.lo, 2) + (i.lc ? " ≤ " : " &lt; ") + "x" + (i.hc ? " ≤ " : " &lt; ") + fmt(i.hi, 2);
    if (l) return "x " + (i.lc ? "≥ " : "&gt; ") + fmt(i.lo, 2);
    if (r) return "x " + (i.hc ? "≤ " : "&lt; ") + fmt(i.hi, 2);
    return "cualquier x";
  }
  B.lab.intervalo = { inter: inter, une: une, txt: txt, vacio: vacio };

  // Punto de la recta: relleno si está incluido, hueco si no
  function punto(g, x, y, cerrado, color, o) {
    var p = g.punto(x, y, { r: (o && o.r) || 8, clase: "c-pen", capa: (o && o.capa) || "din" });
    p.style.fill = cerrado ? color : "var(--sheet)"; p.style.stroke = color; p.style.strokeWidth = 3;
    return p;
  }
  function tramo(g, a, b, y, color) {
    var l = g.segmento(a, y, b, y, { clase: "c-pen" });
    l.style.stroke = color; l.setAttribute("stroke-width", 9); l.style.strokeLinecap = "butt"; l.style.opacity = ".55";
    return l;
  }

  // ============================================================
  // INTERVALOS: arrastra los extremos y cambia si entran o no
  // ============================================================
  B.w.intervalos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un intervalo en la recta real");
    cuerpo.innerHTML = '<div data-tipo></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { tipo: "acot", a: -2, b: 5, ca: true, cb: false, x0: 1 }, g, ha, hb;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), pie = cuerpo.querySelector(".w-pie"), lectura = cuerpo.querySelector(".lectura");
    var bA = U.boton(ctl, "", function () { st.ca = !st.ca; pinta(); }), bB = U.boton(ctl, "", function () { st.cb = !st.cb; pinta(); });
    var sl = U.slider(ctl, { et: "Un punto <i>x</i>", min: -8, max: 8, step: 0.1, val: st.x0, on: function (v) { st.x0 = v; pinta(); } });

    function intervalo() {
      return { lo: st.tipo === "izq" ? -Infinity : st.a, hi: st.tipo === "der" ? Infinity : st.b, lc: st.ca, hc: st.cb };
    }
    function pinta() {
      var I = intervalo(), color = "var(--ok)";
      g.limpiar();
      var xa = isFinite(I.lo) ? I.lo : -8, xb = isFinite(I.hi) ? I.hi : 8;
      tramo(g, xa, xb, 0, color);
      if (isFinite(I.lo)) { g.mover(ha, st.a, 0); ha.style.fill = st.ca ? color : "var(--sheet)"; ha.style.stroke = color; ha.style.display = ""; } else ha.style.display = "none";
      if (isFinite(I.hi)) { g.mover(hb, st.b, 0); hb.style.fill = st.cb ? color : "var(--sheet)"; hb.style.stroke = color; hb.style.display = ""; } else hb.style.display = "none";
      if (!isFinite(I.hi)) g.texto(7.6, 0, "+∞ →", { dy: -18, ancla: "end", clase: "ok" });
      if (!isFinite(I.lo)) g.texto(-7.6, 0, "← −∞", { dy: -18, ancla: "start", clase: "ok" });
      var dentro = !vacio(I) && (st.x0 > I.lo || (st.x0 === I.lo && I.lc)) && (st.x0 < I.hi || (st.x0 === I.hi && I.hc));
      g.punto(st.x0, 0.55, { r: 6, clase: dentro ? "c-ok" : "c-red" });
      g.texto(st.x0, 0.55, "x = " + fmt(st.x0, 1), { dy: -12, ancla: "middle", clase: dentro ? "ok" : "red" });
      bA.textContent = "Extremo izquierdo: " + (st.ca ? "cerrado [" : "abierto (");
      bB.textContent = "Extremo derecho: " + (st.cb ? "cerrado ]" : "abierto )");
      bA.style.display = st.tipo === "izq" ? "none" : ""; bB.style.display = st.tipo === "der" ? "none" : "";
      lectura.innerHTML = U.lec("Intervalo", txt(I), "pen") + U.lec("Desigualdad", desig(I)) + U.lec("En conjuntos", "{x ∈ ℝ : " + desig(I) + "}") +
        U.lec("¿x pertenece?", dentro ? "sí ✓" : "no ✗", dentro ? "ok" : "red");
      pie.textContent = "Círculo relleno = el extremo SÍ entra (corchete). Círculo hueco = NO entra (paréntesis). El infinito nunca entra: siempre va con paréntesis.";
    }
    function montar() {
      var el = cuerpo.querySelector(".w-plot"); el.innerHTML = "";
      g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -1.2, ymax: 1.2, w: 640, h: 150, sinY: true, etx: "", etiqueta: "Recta real con un intervalo marcado" });
      ha = g.punto(0, 0, { capa: "top", r: 10, clase: "c-pen" }); hb = g.punto(0, 0, { capa: "top", r: 10, clase: "c-pen" });
      ha.style.strokeWidth = 3; hb.style.strokeWidth = 3;
      g.arrastrar(ha, function (x) { st.a = Math.max(-7.5, Math.min(st.b - 0.5, Math.round(x * 2) / 2)); pinta(); }, { get: function () { return st.a; }, paso: 0.5, etiqueta: "Extremo izquierdo" });
      g.arrastrar(hb, function (x) { st.b = Math.min(7.5, Math.max(st.a + 0.5, Math.round(x * 2) / 2)); pinta(); }, { get: function () { return st.b; }, paso: 0.5, etiqueta: "Extremo derecho" });
      pinta();
    }
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "acot", t: "(a, b) acotado" }, { k: "der", t: "(a, +∞) semirrecta →" }, { k: "izq", t: "(−∞, b) semirrecta ←" }], st.tipo, function (k) { st.tipo = k; pinta(); });
    void sl; montar();
  };

  // ============================================================
  // OPINTERVALOS: unión e intersección de dos intervalos
  // ============================================================
  B.w.opintervalos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Unión e intersección de intervalos");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var A = { lo: -2, hi: 3, lc: true, hc: false }, Bb = { lo: 0, hi: 5, lc: false, hc: true }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura");
    var tg = [["A", A, "lc", "A: extremo izq."], ["A", A, "hc", "A: extremo der."], ["B", Bb, "lc", "B: extremo izq."], ["B", Bb, "hc", "B: extremo der."]].map(function (t) {
      var b = U.boton(ctl, "", function () { t[1][t[2]] = !t[1][t[2]]; pinta(); }); b._t = t; return b;
    });
    var ctl2 = U.ctl(cuerpo.querySelector("[data-ctl]"));
    function sli(et, I, k) { return U.slider(ctl2, { et: et, min: -7, max: 7, step: 0.5, val: I[k], on: function (v) { I[k] = v; if (I.lo > I.hi) { if (k === "lo") I.hi = v; else I.lo = v; } pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    var s = [sli("A desde", A, "lo"), sli("A hasta", A, "hi"), sli("B desde", Bb, "lo"), sli("B hasta", Bb, "hi")];
    function fila(I, y, color, nombre) {
      if (vacio(I)) { g.texto(-7.6, y, nombre + " = ∅", { dx: 0, dy: -10, clase: "faint" }); return; }
      tramo(g, I.lo, I.hi, y, color); punto(g, I.lo, y, I.lc, color, { r: 7 }); punto(g, I.hi, y, I.hc, color, { r: 7 });
      g.texto(-7.6, y, nombre, { dy: -12, clase: "faint" });
    }
    function pinta() {
      var I = inter(A, Bb), U2 = une(A, Bb);
      g.limpiar();
      fila(A, 2.4, "var(--pen)", "A"); fila(Bb, 1.3, "var(--red)", "B");
      fila(I, -0.9, "var(--ok)", "A ∩ B"); U2.forEach(function (u, i) { fila(u, -2.1, "var(--ok)", i ? "" : "A ∪ B"); });
      tg.forEach(function (b) { var t = b._t; b.textContent = t[3] + ": " + (t[1][t[2]] ? "incluido" : "no incluido"); });
      lectura.innerHTML = U.lec("A", txt(A), "pen") + U.lec("B", txt(Bb), "red") + U.lec("A ∩ B (en los dos)", vacio(I) ? "∅" : txt(I), "ok") + U.lec("A ∪ B (en alguno)", U2.length ? U2.map(txt).join(" ∪ ") : "∅", "ok");
    }
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -3, ymax: 3.2, w: 640, h: 270, sinY: true, etx: "", etiqueta: "Dos intervalos y su unión e intersección" });
    void s; pinta();
    cuerpo.querySelector(".w-pie").textContent = "Intersección: puntos que están en A y en B a la vez. Unión: puntos que están en A o en B (o en los dos). Un extremo solo entra si entra en todos los intervalos que lo comparten.";
  };

  // ============================================================
  // VALORABS: |x − a| como distancia
  // ============================================================
  B.w.valorabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El valor absoluto es una distancia");
    cuerpo.innerHTML = '<div data-ops></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { op: "lt", a: 2, k: 3, x0: 0 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sa = U.slider(ctl, { et: "Centro <i>a</i>", min: -5, max: 5, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sk = U.slider(ctl, { et: "Radio <i>k</i>", min: 0, max: 6, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sx = U.slider(ctl, { et: "Un punto <i>x</i>", min: -10, max: 10, step: 0.1, val: st.x0, on: function (v) { st.x0 = v; pinta(); } });
    var SIGNO = { eq: "=", lt: "&lt;", le: "≤", gt: "&gt;", ge: "≥" };
    function solucion() {
      var a = st.a, k = st.k, op = st.op, I = null;
      if (op === "lt") I = [{ lo: a - k, hi: a + k, lc: false, hc: false }];
      else if (op === "le") I = [{ lo: a - k, hi: a + k, lc: true, hc: true }];
      else if (op === "gt") I = [{ lo: -Infinity, hi: a - k, lc: false, hc: false }, { lo: a + k, hi: Infinity, lc: false, hc: false }];
      else if (op === "ge") I = [{ lo: -Infinity, hi: a - k, lc: false, hc: true }, { lo: a + k, hi: Infinity, lc: true, hc: false }];
      return I;
    }
    function cumple(x) {
      var d = Math.abs(x - st.a), e = 1e-9;
      return st.op === "eq" ? Math.abs(d - st.k) < e : st.op === "lt" ? d < st.k - e : st.op === "le" ? d <= st.k + e : st.op === "gt" ? d > st.k + e : d >= st.k - e;
    }
    function pinta() {
      var a = st.a, k = st.k, color = "var(--ok)", I = solucion();
      g.limpiar();
      g.segmento(a, 0.9, a + k, 0.9, { clase: "c-red" }); g.segmento(a, 0.9, a - k, 0.9, { clase: "c-red", dash: "5 4" });
      g.texto(a + k / 2, 0.9, "k = " + fmt(k, 1), { dy: -8, ancla: "middle", clase: "red" });
      if (st.op === "eq") { [a - k, a + k].forEach(function (x) { punto(g, x, 0, true, color); }); }
      else I.forEach(function (i) { tramo(g, Math.max(i.lo, -10), Math.min(i.hi, 10), 0, color); if (isFinite(i.lo)) punto(g, i.lo, 0, i.lc, color); if (isFinite(i.hi)) punto(g, i.hi, 0, i.hc, color); });
      g.punto(a, 0, { r: 5, clase: "c-ink" }); g.texto(a, 0, "a = " + fmt(a, 1), { dy: 40, ancla: "middle", clase: "faint" });
      var ok = cumple(st.x0), d = Math.abs(st.x0 - a);
      g.punto(st.x0, -0.65, { r: 6, clase: ok ? "c-ok" : "c-red" });
      g.segmento(a, -0.65, st.x0, -0.65, { clase: ok ? "c-ok" : "c-red", dash: "4 4" });
      g.texto(st.x0, -0.65, "x = " + fmt(st.x0, 1), { dy: 20, ancla: "middle", clase: ok ? "ok" : "red" });
      var sol = st.op === "eq" ? "x = " + fmt(a - k, 1) + "  ó  x = " + fmt(a + k, 1) : I.map(txt).join(" ∪ ");
      var ec = "|x " + (a < 0 ? "+ " + fmt(-a, 1) : a > 0 ? "− " + fmt(a, 1) : "") + "| " + SIGNO[st.op] + " " + fmt(k, 1);
      lectura.innerHTML = U.lec("Ecuación o inecuación", ec, "pen") + U.lec("Solución", sol, "ok") + U.lec("Distancia de x a a", fmt(d, 2)) + U.lec("¿x la cumple?", ok ? "sí ✓" : "no ✗", ok ? "ok" : "red");
      pie.innerHTML = st.op === "eq" ? "Dos puntos a distancia <b>k</b> de <b>a</b>: uno a cada lado." : (st.op === "lt" || st.op === "le") ? "«Distancia pequeña»: los puntos <b>cerca</b> de a forman un intervalo (entre a−k y a+k)." : "«Distancia grande»: los puntos <b>lejos</b> de a forman dos semirrectas.";
    }
    U.fichas(cuerpo.querySelector("[data-ops]"), [{ k: "eq", t: "|x − a| = k" }, { k: "lt", t: "|x − a| &lt; k" }, { k: "le", t: "|x − a| ≤ k" }, { k: "gt", t: "|x − a| &gt; k" }, { k: "ge", t: "|x − a| ≥ k" }], st.op, function (k) { st.op = k; pinta(); });
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -10, xmax: 10, ymin: -1.3, ymax: 1.5, w: 640, h: 190, sinY: true, etx: "", etiqueta: "Recta real: puntos a distancia k del centro a" });
    void sa; void sk; void sx; pinta();
  };

  // ============================================================
  // GRAFABS: y = |a·x − b| + c  (la «V» y sus trozos)
  // ============================================================
  B.w.grafabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La gráfica de y = |a·x − b| + c");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 2, b: 4, c: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function sl(et, k, mn, mx) { return U.slider(ctl, { et: et, min: mn, max: mx, step: 0.5, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    sl("a", "a", -3, 3); sl("b", "b", -6, 6); sl("c", "c", -4, 4);
    function f(x) { return Math.abs(st.a * x - st.b) + st.c; }
    function pinta() {
      g.limpiar();
      g.curva(f, { clase: "c-pen" });
      var a = st.a, b = st.b, c = st.c, xv = a === 0 ? null : b / a;
      if (xv !== null) { g.punto(xv, c, { r: 6, clase: "c-red" }); g.texto(xv, c, "vértice (" + fmt(xv, 2) + ", " + fmt(c, 2) + ")", { dx: 10, dy: 22, clase: "red" }); g.vertical(xv, { clase: "c-faint", dash: "4 4" }); }
      var trozo1 = a === 0 ? "" : (a > 0 ? "x ≥ " : "x ≤ ") + fmt(xv, 2), trozo2 = a === 0 ? "" : (a > 0 ? "x &lt; " : "x &gt; ") + fmt(xv, 2);
      var lin = function (m, n) { return U.recta(m, n).replace("y = ", ""); };
      lectura.innerHTML = U.lec("Función", "|" + (a === 1 ? "" : a === -1 ? "−" : fmt(a, 1)) + "x " + (b < 0 ? "+ " + fmt(-b, 1) : "− " + fmt(b, 1)) + "|" + (c ? (c > 0 ? " + " : " − ") + fmt(Math.abs(c), 1) : ""), "pen") +
        (a === 0 ? U.lec("Es constante", fmt(Math.abs(b) + c, 1)) : U.lec("Trozo 1 (" + trozo1 + ")", lin(a, c - b), "ok") + U.lec("Trozo 2 (" + trozo2 + ")", lin(-a, c + b), "red"));
      pie.innerHTML = a === 0 ? "Con a = 0 no hay «V»: es una recta horizontal." : "El vértice está donde se anula lo de dentro: <b>x = b/a</b>. A la derecha (si a &gt; 0) se quitan las barras tal cual; a la izquierda se cambia el signo de lo de dentro. El parámetro <b>c</b> sube o baja la «V».";
    }
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -5, ymax: 11, w: 640, h: 300, etiqueta: "Gráfica de y = |a x − b| + c" });
    pinta();
  };

  // ============================================================
  // RADICALES: entrenador con ejercicios infinitos
  // ============================================================
  function mcd(a, b) { return b ? mcd(b, a % b) : a; }
  function azar(l) { return l[Math.floor(Math.random() * l.length)]; }
  var LIBRES = [2, 3, 5, 6, 7, 10, 11];
  var GEN = {
    simplificar: function () {
      var f = azar([2, 3, 4, 5, 6, 7]), g = azar(LIBRES.slice(0, 6)), n = f * f * g;
      return { enun: "Simplifica √" + n, campos: [{ et: "a =", v: f }, { et: "b =", v: g }], forma: "El resultado es a√b, con b sin cuadrados dentro.",
        pasos: ["Descomponemos " + n + " buscando un cuadrado perfecto: " + n + " = " + (f * f) + " · " + g + " = " + f + "² · " + g, "√" + n + " = √(" + f + "²·" + g + ") = " + f + "·√" + g, "<b>√" + n + " = " + f + "√" + g + "</b>"] };
    },
    racionalizar: function () {
      var b = azar([2, 3, 5, 6, 7]), a = azar([2, 3, 4, 5, 6, 8, 9, 10, 12]), d = mcd(a, b), p = a / d, q = b / d;
      return { enun: "Racionaliza " + a + "/√" + b + " y escríbelo como (p/q)·√" + b, campos: [{ et: "p =", v: p }, { et: "q =", v: q }], forma: "Fracción irreducible p/q (si q = 1, escribe 1).",
        pasos: ["Multiplicamos arriba y abajo por √" + b + ": " + a + "/√" + b + " = (" + a + "·√" + b + ")/(√" + b + "·√" + b + ") = " + a + "√" + b + "/" + b, "Simplificamos la fracción " + a + "/" + b + (d > 1 ? " dividiendo entre " + d + ": " + p + "/" + q : " (ya es irreducible)"), "<b>" + a + "/√" + b + " = " + (q === 1 ? p : p + "/" + q) + "√" + b + "</b>"] };
    },
    suma: function () {
      var g = azar([2, 3, 5]), fs = [azar([1, 2, 3]), azar([2, 3, 4]), azar([3, 4, 5])], cs = [azar([1, 2, 3]), azar([1, 2, 3]), azar([1, 2, 3])], sg = [1, azar([1, -1]), azar([1, -1])], tot = 0, t = [], pasos1 = [], pasos2 = [];
      for (var i = 0; i < 3; i++) {
        var n = fs[i] * fs[i] * g;
        t.push((i ? (sg[i] > 0 ? " + " : " − ") : "") + (cs[i] === 1 ? "" : cs[i]) + "√" + n);
        pasos1.push((cs[i] === 1 ? "" : cs[i] + "·") + "√" + n + " = " + (cs[i] === 1 ? "" : cs[i] + "·") + fs[i] + "√" + g + " = " + (cs[i] * fs[i]) + "√" + g);
        tot += sg[i] * cs[i] * fs[i];
        pasos2.push((i ? (sg[i] > 0 ? "+ " : "− ") : "") + (cs[i] * fs[i]));
      }
      return { enun: "Calcula " + t.join(""), campos: [{ et: "a =", v: tot }, { et: "b =", v: g }], forma: "El resultado es a√b (a puede ser negativo).",
        pasos: ["Simplificamos cada raíz hasta que todas tengan √" + g + ":<br>" + pasos1.join("<br>"), "Sumamos los coeficientes (radicales semejantes): " + pasos2.join(" ") + " = " + tot, "<b>Resultado: " + tot + "√" + g + "</b>"] };
    }
  };
  B.lab.radicalesGen = GEN;

  B.w.radicales = function (host) {
    var cuerpo = B.caja(host, "Entrenador", "Radicales: simplificar, sumar y racionalizar");
    cuerpo.innerHTML = '<div data-modo></div><div class="dv-enun"></div><form class="dv-form" novalidate><div class="bx-campos" data-campos></div><button type="submit" class="btn-comprobar">Comprobar</button><button type="button" class="chip-btn" data-ver>Ver pasos</button><button type="button" class="chip-btn" data-nuevo>Otro ejercicio</button></form><p class="dv-lee" data-forma></p><div class="bx-res" aria-live="polite"></div><p class="dv-pie"></p>';
    var st = { modo: "simplificar", ej: null, racha: 0, ok: 0 }, enun = cuerpo.querySelector(".dv-enun"), campos = cuerpo.querySelector("[data-campos]"), res = cuerpo.querySelector(".bx-res"), pie = cuerpo.querySelector(".dv-pie"), forma = cuerpo.querySelector("[data-forma]");
    function nuevo() {
      st.ej = GEN[st.modo](); res.className = "bx-res"; res.innerHTML = "";
      enun.innerHTML = '<span class="dv-f">' + st.ej.enun + "</span>";
      campos.innerHTML = st.ej.campos.map(function (c, i) { return '<label class="bx-campo"><span class="bx-et">' + c.et + '</span><input type="text" data-k="' + i + '" autocomplete="off" inputmode="numeric" style="width:90px"><span class="bx-mk" aria-hidden="true"></span></label>'; }).join("");
      forma.textContent = st.ej.forma; pinta();
    }
    function pinta() { pie.textContent = "Racha: " + st.racha + " · Acertados en esta sesión: " + st.ok; }
    cuerpo.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var bien = 0;
      st.ej.campos.forEach(function (c, i) {
        var inp = cuerpo.querySelector('[data-k="' + i + '"]'), v = B.Mate.numero(inp.value), ok = !isNaN(v) && Math.abs(v - c.v) < 1e-9, lab = inp.closest(".bx-campo");
        lab.classList.toggle("ok", ok); lab.classList.toggle("mal", !ok); if (ok) bien++;
      });
      if (bien === st.ej.campos.length) { st.racha++; st.ok++; res.className = "bx-res ok"; res.innerHTML = "<b>✓ ¡Correcto!</b> <button type=\"button\" class=\"btn-comprobar\" data-nuevo>Siguiente →</button>"; }
      else { st.racha = 0; res.className = "bx-res mal"; res.innerHTML = "<b>Todavía no.</b> Pulsa «Ver pasos» si te atascas."; }
      pinta();
    });
    cuerpo.addEventListener("click", function (e) {
      if (e.target.closest("[data-nuevo]")) nuevo();
      if (e.target.closest("[data-ver]")) { st.racha = 0; res.className = "bx-res"; res.innerHTML = '<div class="bx-pista">' + st.ej.pasos.map(function (p, i) { return "<b>Paso " + (i + 1) + ":</b> " + p; }).join("<br>") + "</div>"; pinta(); }
    });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "simplificar", t: "Simplificar √n" }, { k: "suma", t: "Sumar radicales" }, { k: "racionalizar", t: "Racionalizar a/√b" }], st.modo, function (k) { st.modo = k; nuevo(); });
    nuevo();
  };

  // ============================================================
  // CIENTIFICA: notación científica con órdenes de magnitud reales
  // ============================================================
  var ORDENES = [
    [-10, "el tamaño de un átomo (≈ 10⁻¹⁰ m)"], [-7, "la longitud de onda de la luz visible (≈ 5·10⁻⁷ m)"], [-5, "un glóbulo rojo (≈ 8·10⁻⁶ m)"],
    [-3, "una hormiga (≈ 4·10⁻³ m)"], [0, "una persona (≈ 1,7 m)"], [3, "el Everest (≈ 8,8·10³ m)"], [6, "el radio de la Tierra (≈ 6,4·10⁶ m)"],
    [8, "la distancia Tierra–Luna (≈ 3,8·10⁸ m)"], [11, "la distancia Tierra–Sol (≈ 1,5·10¹¹ m)"], [16, "un año luz (≈ 9,5·10¹⁵ m)"]
  ];
  function decimal(a, n) {          // a·10ⁿ escrito en decimal (a con una cifra decimal)
    var m = String(Math.round(a * 10)), e = n - 1, ent, dec = "";
    if (e >= 0) ent = m + new Array(e + 1).join("0");
    else if (-e < m.length) { ent = m.slice(0, m.length + e); dec = m.slice(m.length + e); }
    else { ent = "0"; dec = new Array(-e - m.length + 1).join("0") + m; }
    dec = dec.replace(/0+$/, "");
    return ent.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? "," + dec : "");
  }
  B.w.cientifica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Notación científica: mueve la coma");
    cuerpo.innerHTML = '<div data-ctl></div><div class="cs-num"></div><div class="lectura"></div><p class="w-pie"></p><hr class="cs-hr"><p class="w-intro"><b>Al revés:</b> escribe un número decimal y te lo paso a notación científica.</p><form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">Número</span><input type="text" autocomplete="off" inputmode="decimal" placeholder="por ejemplo 0,00032 ó 45000000"></label><button type="submit" class="btn-comprobar">Convertir</button></form><div class="bx-res cs-res" aria-live="polite"></div>';
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), big = cuerpo.querySelector(".cs-num"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var st = { a: 4.5, n: 7 };
    U.slider(ctl, { et: "Mantisa <i>a</i>", min: 1, max: 9.9, step: 0.1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Exponente <i>n</i>", min: -10, max: 16, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return String(v); } });
    function pinta() {
      var a = Math.round(st.a * 10) / 10, n = st.n, cerca = ORDENES.reduce(function (m, o) { return Math.abs(o[0] - n) < Math.abs(m[0] - n) ? o : m; });
      big.innerHTML = '<div class="cs-linea"><span class="cs-lab">Científica</span><b>' + fmt(a, 1) + " × 10<sup>" + n + "</sup></b></div><div class=\"cs-linea\"><span class=\"cs-lab\">Decimal</span><b class=\"cs-dec\">" + decimal(a, n) + "</b></div>";
      lectura.innerHTML = U.lec("Coma", n === 0 ? "sin mover" : (n > 0 ? "→ " + n + " lugares a la derecha" : "← " + (-n) + " lugares a la izquierda")) + U.lec("Cifras significativas", String(String(Math.round(a * 10)).replace(/0+$/, "").length)) + U.lec("Orden de magnitud", "10" + U.sup(n + (a >= 5 ? 1 : 0)), "pen");
      pie.innerHTML = "Orden de magnitud parecido a: <b>" + cerca[1] + "</b>.";
    }
    pinta();
    cuerpo.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = cuerpo.querySelector("input[type=text]").value.replace(/\./g, "").replace(",", "."), v = parseFloat(raw), r = cuerpo.querySelector(".cs-res");
      if (!isFinite(v) || v === 0) { r.className = "bx-res mal cs-res"; r.textContent = "Escribe un número distinto de 0 (con coma decimal si quieres)."; return; }
      var n = Math.floor(Math.log10(Math.abs(v)) + 1e-12), a = v / Math.pow(10, n);
      r.className = "bx-res ok cs-res";
      r.innerHTML = "<b>" + fmt(a, 6) + " × 10<sup>" + n + "</sup></b> — la coma se ha movido " + Math.abs(n) + " lugares hacia la " + (n > 0 ? "izquierda (exponente positivo: número grande)" : n < 0 ? "derecha (exponente negativo: número pequeño)" : "izquierda… 0 lugares") + ". La mantisa cumple 1 ≤ a &lt; 10.";
    });
  };

  // ============================================================
  // ERRABS: error absoluto y relativo
  // ============================================================
  B.w.errabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Error absoluto y error relativo");
    cuerpo.innerHTML = '<div data-pre></div><form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">Valor real</span><input type="text" data-r autocomplete="off" style="width:130px"></label><label class="bx-campo"><span class="bx-et">Aproximación</span><input type="text" data-m autocomplete="off" style="width:130px"></label><button type="submit" class="btn-comprobar">Calcular</button></form><div class="lectura"></div><p class="w-pie"></p>';
    var PRE = [
      { k: "cuerda", t: "Cuerda de 10 m, medida 9,8 m", r: "10", m: "9,8" },
      { k: "viaje", t: "Madrid–Barcelona 505 km, medido 504 km", r: "505", m: "504" },
      { k: "pi", t: "π ≈ 22/7", r: "pi", m: "22/7" },
      { k: "raiz", t: "√2 ≈ 1,41", r: "sqrt(2)", m: "1,41" }
    ];
    var form = cuerpo.querySelector("form"), ir = form.querySelector("[data-r]"), im = form.querySelector("[data-m]"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function calcula() {
      var R = B.Mate.numero(ir.value), M = B.Mate.numero(im.value);
      if (isNaN(R) || isNaN(M) || R === 0) { lectura.innerHTML = U.lec("Revisa", "los valores no son válidos"); return; }
      var ea = Math.abs(R - M), er = ea / Math.abs(R);
      lectura.innerHTML = U.lec("Valor real", fmt(R, 6)) + U.lec("Aproximación", fmt(M, 6)) + U.lec("Error absoluto |real − aprox.|", fmt(ea, 6), "red") + U.lec("Error relativo (÷ real)", fmt(er, 6), "pen") + U.lec("En porcentaje", fmt(er * 100, 4) + " %", "pen");
      pie.innerHTML = "El <b>error relativo</b> compara el error con el tamaño de lo que mides: " + (er < 0.005 ? "es muy pequeño (menos del 0,5 %): buena aproximación." : er < 0.05 ? "es pequeño (menos del 5 %)." : "es notable (más del 5 %): la aproximación es floja.");
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p) { return { k: p.k, t: p.t }; }), "cuerda", function (k) {
      var p = PRE.filter(function (x) { return x.k === k; })[0]; ir.value = p.r; im.value = p.m; calcula();
    });
    ir.value = "10"; im.value = "9,8";
    form.addEventListener("submit", function (e) { e.preventDefault(); calcula(); });
    ir.addEventListener("input", calcula); im.addEventListener("input", calcula);
    calcula();
  };

})(window);
