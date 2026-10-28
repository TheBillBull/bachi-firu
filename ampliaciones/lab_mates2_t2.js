/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 2 (Determinantes)
   det_geom · det_props · det_adjuntos · det_param · det_calc
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var D = B.lab.det = {};

  // ---------- estilos propios (inyectados desde el JS) ----------
  (function () {
    if (!global.document || !document.head || document.getElementById("dt-estilos")) return;
    var s = document.createElement("style"); s.id = "dt-estilos";
    s.textContent =
      ".dt-fila{display:flex;flex-wrap:wrap;gap:14px 22px;align-items:center;margin:8px 0}" +
      ".dt-bloque{display:flex;flex-direction:column;align-items:flex-start;gap:4px;max-width:100%}" +
      ".dt-bloque>small{font-size:11.5px;color:var(--ink-faint)}" +
      ".dt-par{border-radius:14px}.dt-d{border-left-width:2px!important;border-right-width:2px!important}.dt-m{font-size:16px}.dt-m .matrix-cell{min-width:1.5em;padding:1px 3px;border-radius:5px}" +
      ".dt-m .hi{background:var(--hl-mark,rgba(255,200,0,.28))}" +
      ".dt-m .pos{color:var(--ok)}.dt-m .neg{color:var(--red)}.dt-m .dim{color:var(--ink-faint)}" +
      ".dt-m .sel{background:color-mix(in srgb,var(--pen) 22%,transparent);font-weight:700}" +
      ".dt-log{margin:6px 0 0;padding:0;list-style:none;font-size:13.5px;line-height:1.45}" +
      ".dt-log li{padding:3px 0;border-top:1px solid var(--line,rgba(128,128,128,.25))}" +
      ".dt-terms{font:14.5px/1.7 var(--math);margin:4px 0}.dt-terms div{padding:1px 0}" +
      ".dt-ok{color:var(--ok);font-weight:700}.dt-mal{color:var(--red);font-weight:700}" +
      "@media(max-width:520px){.dt-m{font-size:14px}.dt-m .matrix-row{gap:8px}.dt-fila{gap:10px 14px}}";
    document.head.appendChild(s);
  })();

  // ---------- álgebra básica ----------
  function sg(n) { return n < 0 ? "−" + (-n) : String(n); }
  function par(n) { return n < 0 ? "(−" + (-n) + ")" : String(n); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  D.frac = function (n, d) {                       // fracción reducida como HTML
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d) || 1; n /= g; d /= g;
    return d === 1 ? sg(n) : (n < 0 ? "−" : "") + B.h.fr(Math.abs(n), d);
  };
  D.menor = function (A, i, j) {
    return A.filter(function (_, r) { return r !== i; }).map(function (f) { return f.filter(function (_, c) { return c !== j; }); });
  };
  D.det = function (A) {
    var n = A.length;
    if (n === 1) return A[0][0];
    if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    var s = 0;
    for (var j = 0; j < n; j++) if (A[0][j]) s += (j % 2 ? -1 : 1) * A[0][j] * D.det(D.menor(A, 0, j));
    return s;
  };
  D.tras = function (A) { return A[0].map(function (_, j) { return A.map(function (f) { return f[j]; }); }); };
  D.cof = function (A) {
    return A.map(function (f, i) { return f.map(function (_, j) { return ((i + j) % 2 ? -1 : 1) * D.det(D.menor(A, i, j)); }); });
  };
  D.rango = function (A, tol) {                     // eliminación numérica (A puede tener decimales)
    var M = A.map(function (f) { return f.slice(); }), r = 0, n = M.length, m = M[0].length, esc = 0;
    tol = tol || 1e-9;
    M.forEach(function (f) { f.forEach(function (x) { esc = Math.max(esc, Math.abs(x)); }); });
    for (var c = 0; c < m && r < n; c++) {
      var p = r;
      for (var i = r + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
      if (Math.abs(M[p][c]) <= tol * Math.max(1, esc)) continue;
      var t = M[p]; M[p] = M[r]; M[r] = t;
      for (var k = r + 1; k < n; k++) { var q = M[k][c] / M[r][c]; for (var l = c; l < m; l++) M[k][l] -= q * M[r][l]; }
      r++;
    }
    return r;
  };

  // matriz como HTML. A: filas (números o textos). cls(i,j) → clase; txt(i,j,v) → texto de la celda
  function mx(A, cls, txt, esDet) {
    return '<span class="matrix dt-m ' + (esDet ? "dt-d" : "dt-par") + '">' + A.map(function (f, i) {
      return '<span class="matrix-row">' + f.map(function (v, j) {
        return '<span class="matrix-cell ' + (cls ? cls(i, j) || "" : "") + '">' + (txt ? txt(i, j, v) : (typeof v === "number" ? sg(v) : v)) + "</span>";
      }).join("") + "</span>";
    }).join("") + "</span>";
  }
  D.mat = function (A) { return mx(A); };           // para la teoría: matriz con paréntesis redondeados
  D.dtm = function (A) { return mx(A, null, null, true); };   // determinante con barras rectas
  function bloque(titulo, html) { return '<div class="dt-bloque"><small>' + titulo + "</small>" + html + "</div>"; }
  function clonar(A) { return A.map(function (f) { return f.slice(); }); }

  // ============================================================
  // ÁREA Y VOLUMEN: el determinante como medida con signo
  // ============================================================
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }
  function asa(g, get, set, clase, etq, lim) {
    var h = g.punto(0, 0, { capa: "top", r: 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) {
      if (tecla) set(snap(x, lim), get()[1]); else set(snap(x, lim), snap(y, lim));
    }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function etq(g, p, t, clase) { g.texto(p[0], p[1], t, { dx: 8, dy: -8, clase: clase }); }

  B.w.det_geom = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El determinante mide área y volumen");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "2d", u: [3, 1], v: [1, 2], w: [1, 1, 2] }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), plotEl = cuerpo.querySelector(".w-plot");
    var g, h1, h2, sl = [];
    var pres2 = [
      { k: "0", t: "Ejemplo", u: [3, 1], v: [1, 2] }, { k: "1", t: "Intercambio u ↔ v", u: [1, 2], v: [3, 1] },
      { k: "2", t: "Proporcionales", u: [2, 1], v: [4, 2] }, { k: "3", t: "Cuadrado", u: [2, 0], v: [0, 2] }
    ];
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "2d", t: "2D · área" }, { k: "3d", t: "3D · volumen" }], st.modo, function (k) { st.modo = k; arma(); });
    function arma() {
      plotEl.innerHTML = ""; ctl.innerHTML = ""; sl = [];
      var pre = cuerpo.querySelector("[data-pre]");
      if (st.modo === "2d") {
        g = new B.Plot(plotEl, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 520, h: 380, etx: "x", ety: "y", etiqueta: "Vectores u y v y el paralelogramo que forman" });
        g.rangoIso(0, 0, 5);
        h1 = asa(g, function () { return st.u; }, function (x, y) { st.u = [x, y]; pinta(); }, "c-pen", "Extremo del vector u", 5);
        h2 = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-red", "Extremo del vector v", 5);
        U.fichas(pre, pres2.map(function (p) { return { k: p.k, t: p.t }; }), "-", function (k) { var p = pres2[+k]; st.u = p.u.slice(); st.v = p.v.slice(); pinta(); });
        pre.style.display = "";
      } else {
        g = new B.Plot(plotEl, { xmin: -4, xmax: 10, ymin: -4, ymax: 6, w: 560, h: 340, etx: "", ety: "", etiqueta: "Paralelepípedo de aristas u, v y w" });
        ["a", "b", "c"].forEach(function (n, i) {
          sl.push(U.slider(ctl, { et: "w<sub>" + "xyz"[i] + "</sub>", min: -2, max: 3, step: 1, val: st.w[i], on: function (v) { st.w[i] = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } }));
        });
        pre.innerHTML = ""; pre.style.display = "none";
      }
      pinta();
    }
    function pinta2() {
      var u = st.u, v = st.v, d = u[0] * v[1] - u[1] * v[0], s = [u[0] + v[0], u[1] + v[1]];
      g.limpiar(); g.mover(h1, u[0], u[1]); g.mover(h2, v[0], v[1]);
      g.poligono([[0, 0], u, s, v], { clase: d > 0 ? "z-ok" : d < 0 ? "z-red" : "z-pen", borde: "var(--ink-faint)" });
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); etq(g, u, "u", "pen");
      U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" }); etq(g, v, "v", "red");
      lectura.innerHTML =
        U.lec("det(u, v)", "|" + sg(u[0]) + " " + sg(u[1]) + "; " + sg(v[0]) + " " + sg(v[1]) + "| = " + fmt(d, 1)) +
        U.lec("Área del paralelogramo", "|det| = " + fmt(Math.abs(d), 1)) +
        U.lec("Área del triángulo 0,u,v", fmt(Math.abs(d) / 2, 2)) +
        U.lec("Orientación", d > 0 ? "antihoraria (+)" : d < 0 ? "horaria (−)" : "colineales (0)", d > 0 ? "ok" : d < 0 ? "mal" : "");
      pie.innerHTML = d === 0 ? "Con det = 0 los vectores son <b>proporcionales</b>: el paralelogramo se aplasta en un segmento y su área es 0."
        : "Mueve los puntos. El <b>valor absoluto</b> del determinante es el área; el <b>signo</b> dice si para ir de u a v se gira en sentido antihorario (verde, +) u horario (rojo, −). Intercambiar u y v cambia el signo.";
    }
    function P(p) { return [p[0] + 0.5 * p[1], p[2] + 0.3 * p[1]]; }
    function pinta3() {
      var u = [2, 0, 0], v = [1, 2, 0], w = st.w, add = function (a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; };
      var O = [0, 0, 0], uv = add(u, v), uw = add(u, w), vw = add(v, w), uvw = add(uv, w);
      var d = D.det([u, v, w]), base = 4, alt = Math.abs(w[2]);
      g.limpiar();
      g.poligono([P(O), P(u), P(uv), P(v)], { clase: "z-pen", borde: "var(--ink-faint)" });
      g.poligono([P(w), P(uw), P(uvw), P(vw)], { clase: d > 0 ? "z-ok" : d < 0 ? "z-red" : "z-pen", borde: "var(--ink-faint)" });
      [[O, w], [u, uw], [v, vw], [uv, uvw]].forEach(function (e) { var a = P(e[0]), b = P(e[1]); g.segmento(a[0], a[1], b[0], b[1], { clase: "c-faint", dash: "3 3" }); });
      [[u, "u", "c-pen"], [v, "v", "c-red"], [w, "w", "c-ok"]].forEach(function (e) {
        var b = P(e[0]); U.flecha(g, 0, 0, b[0], b[1], { clase: e[2] }); g.texto(b[0], b[1], e[1], { dx: 8, dy: -8, clase: e[2].replace("c-", "") });
      });
      lectura.innerHTML =
        U.lec("det(u, v, w)", fmt(d, 0)) + U.lec("Volumen", "|det| = " + fmt(Math.abs(d), 0)) +
        U.lec("Base (u, v)", fmt(base, 0)) + U.lec("Altura sobre la base", fmt(alt, 0)) +
        U.lec("Orientación", d > 0 ? "directa (+)" : d < 0 ? "inversa (−)" : "coplanarios (0)", d > 0 ? "ok" : d < 0 ? "mal" : "");
      pie.innerHTML = d === 0 ? "w está en el plano de u y v: los tres vectores son <b>coplanarios</b> y el volumen es 0."
        : "Fíjate: <b>w<sub>x</sub> y w<sub>y</sub> no cambian el volumen</b> (deslizan la cara de arriba sin cambiar la altura); sólo importa w<sub>z</sub>. El volumen es base × altura = 4·|w<sub>z</sub>|.";
    }
    function pinta() { if (st.modo === "2d") pinta2(); else pinta3(); }
    arma();
  };

  // ============================================================
  // PROPIEDADES, FILA A FILA
  // ============================================================
  B.w.det_props = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Propiedades del determinante, fila a fila");
    cuerpo.innerHTML = '<div data-pre></div><div class="dt-fila"><div data-mat></div></div><div data-fa class="chips"></div><div data-fb class="chips"></div><div data-ctl></div><div data-ops class="chips"></div><div class="lectura anch"></div><ul class="dt-log"></ul><p class="w-pie"></p>';
    var pres = [
      { k: "0", t: "Ejemplo", m: [[1, 2, 0], [3, 1, 2], [0, 1, 4]] },
      { k: "1", t: "Otro", m: [[2, 1, 3], [1, 0, 2], [4, 1, 5]] },
      { k: "2", t: "Triangular", m: [[2, 5, 1], [0, 3, 4], [0, 0, -1]] }
    ];
    var st = { pi: 0, A: clonar(pres[0].m), d0: 0, a: 0, b: 1, k: 2, log: [], ult: "" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var matEl = cuerpo.querySelector("[data-mat]"), lec = cuerpo.querySelector(".lectura"), log = cuerpo.querySelector(".dt-log"), pie = cuerpo.querySelector(".w-pie");
    var sk = U.slider(ctl, { et: "Número <i>k</i>", min: -3, max: 3, step: 1, val: 2, on: function (v) { st.k = v; }, fmt: function (v) { return fmt(v, 0); } });
    U.fichas(cuerpo.querySelector("[data-pre]"), pres.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { st.pi = +k; st.A = clonar(pres[+k].m); st.d0 = D.det(st.A); st.log = []; pinta(); });
    var filas = [{ k: "0", t: "F1" }, { k: "1", t: "F2" }, { k: "2", t: "F3" }];
    var fa = cuerpo.querySelector("[data-fa]"), fb = cuerpo.querySelector("[data-fb]");
    U.fichas(fa, filas.map(function (f) { return { k: f.k, t: "fila a = " + f.t }; }), "0", function (k) { st.a = +k; });
    U.fichas(fb, filas.map(function (f) { return { k: f.k, t: "fila b = " + f.t }; }), "1", function (k) { st.b = +k; });
    st.d0 = D.det(st.A);
    var ops = [
      { k: "swap", t: "Intercambiar a ↔ b" }, { k: "add", t: "a ← a + k·b" }, { k: "mul", t: "Multiplicar fila a por k" },
      { k: "all", t: "Multiplicar toda A por k" }, { k: "tra", t: "Trasponer" }, { k: "res", t: "Reiniciar" }
    ];
    var opsEl = cuerpo.querySelector("[data-ops]"); opsEl.className = "chips";
    ops.forEach(function (o) { U.boton(opsEl, o.t, function () { aplica(o.k); }); });
    function aplica(k) {
      var A = st.A, a = st.a, b = st.b, kk = st.k, antes = D.det(A), esp = null, txt = "";
      if (k === "res") { st.A = clonar(pres[st.pi].m); st.log = []; st.ult = ""; pinta(); return; }
      if ((k === "swap" || k === "add") && a === b) { st.ult = "Elige dos filas distintas (a ≠ b)."; pinta(); return; }
      if (k === "swap") { var t = A[a]; A[a] = A[b]; A[b] = t; esp = -antes; txt = "F" + (a + 1) + " ↔ F" + (b + 1) + ": regla «intercambiar dos filas cambia el signo»"; }
      else if (k === "add") { A[a] = A[a].map(function (x, j) { return x + kk * A[b][j]; }); esp = antes; txt = "F" + (a + 1) + " ← F" + (a + 1) + " + (" + sg(kk) + ")·F" + (b + 1) + ": regla «sumar a una fila un múltiplo de otra no cambia nada»"; }
      else if (k === "mul") { A[a] = A[a].map(function (x) { return x * kk; }); esp = kk * antes; txt = "F" + (a + 1) + " × (" + sg(kk) + "): regla «multiplicar una fila por k multiplica |A| por k»"; }
      else if (k === "all") { st.A = A.map(function (f) { return f.map(function (x) { return x * kk; }); }); A = st.A; esp = Math.pow(kk, 3) * antes; txt = "(" + sg(kk) + ")·A: regla «|kA| = k³·|A|» (orden 3)"; }
      else if (k === "tra") { st.A = D.tras(A); A = st.A; esp = antes; txt = "Aᵗ: regla «|Aᵗ| = |A|»"; }
      var des = D.det(A), ok = des === esp;
      st.log.unshift("<li>" + txt + ".<br>|A| pasa de <b>" + sg(antes) + "</b> a <b>" + sg(des) + "</b> (esperado " + sg(esp) + ") <span class='" + (ok ? "dt-ok" : "dt-mal") + "'>" + (ok ? "✓" : "✗") + "</span></li>");
      st.log = st.log.slice(0, 5); st.ult = ""; pinta();
    }
    function pinta() {
      var A = st.A, d = D.det(A);
      matEl.innerHTML = bloque("Matriz actual A", mx(A, function (i) { return i === st.a ? "sel" : i === st.b ? "hi" : ""; }));
      lec.innerHTML = U.lec("|A| inicial", sg(st.d0)) + U.lec("|A| ahora", sg(d), d === 0 ? "mal" : "ok") + U.lec("¿Tiene inversa?", d === 0 ? "no (|A| = 0)" : "sí (|A| ≠ 0)");
      log.innerHTML = st.log.join("");
      pie.innerHTML = st.ult || "Elige las filas <b>a</b> (azul) y <b>b</b> (amarillo), el número <i>k</i> y pulsa una operación: la web recalcula |A| con Sarrus y lo compara con lo que predice la propiedad. Prueba <b>k = 0</b> o hacer dos filas iguales para ver |A| = 0.";
    }
    pinta();
  };

  // ============================================================
  // DESARROLLO POR ADJUNTOS E INVERSA
  // ============================================================
  var PRE_ADJ = [
    { k: "0", t: "3×3 (−22)", m: [[1, 2, 0], [3, 1, 2], [0, 1, 4]] },
    { k: "1", t: "3×3 con ceros", m: [[2, 1, 0], [1, 3, 1], [0, 1, 2]] },
    { k: "2", t: "3×3 (|A| = 1)", m: [[1, 2, 3], [0, 1, 4], [5, 6, 0]] },
    { k: "3", t: "Singular", m: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { k: "4", t: "4×4", m: [[2, 0, 1, 3], [1, 2, 0, 1], [0, 1, 0, 2], [3, 0, 0, 1]] }
  ];
  D.PRE_ADJ = PRE_ADJ;
  B.w.det_adjuntos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Adjuntos: desarrollo del determinante e inversa");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div data-lin class="chips"></div><div data-paso class="chips"></div><div class="dt-fila" data-mats></div><div class="dt-terms"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, modo: /inversa$/.test(host.getAttribute("data-ref") || "") ? "inv" : "des", lin: "f0", paso: 4 };
    var mats = cuerpo.querySelector("[data-mats]"), terms = cuerpo.querySelector(".dt-terms"), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var linEl = cuerpo.querySelector("[data-lin]"), pasoEl = cuerpo.querySelector("[data-paso]");
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "des", t: "Desarrollo por una línea" }, { k: "inv", t: "Inversa por adjuntos" }], st.modo, function (k) { st.modo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_ADJ.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { st.i = +k; if (st.lin.charAt(1) >= PRE_ADJ[st.i].m.length) st.lin = "f0"; opciones(); pinta(); });
    function opciones() {
      var n = PRE_ADJ[st.i].m.length, o = [];
      for (var i = 0; i < n; i++) o.push({ k: "f" + i, t: "Fila " + (i + 1) });
      for (var j = 0; j < n; j++) o.push({ k: "c" + j, t: "Columna " + (j + 1) });
      U.fichas(linEl, o, st.lin, function (k) { st.lin = k; pinta(); });
      U.fichas(pasoEl, [{ k: "1", t: "① Menores" }, { k: "2", t: "② Adjuntos" }, { k: "3", t: "③ Traspuesta" }, { k: "4", t: "④ Dividir entre |A|" }], String(st.paso), function (k) { st.paso = +k; pinta(); });
    }
    function pinta() {
      var A = PRE_ADJ[st.i].m, n = A.length, d = D.det(A), M = A.map(function (f, i) { return f.map(function (_, j) { return D.det(D.menor(A, i, j)); }); });
      var C = D.cof(A);
      linEl.style.display = st.modo === "des" ? "" : "none"; pasoEl.style.display = st.modo === "inv" ? "" : "none";
      if (st.modo === "des") {
        var fila = st.lin.charAt(0) === "f", idx = +st.lin.charAt(1), suma = 0, tr = [], ceros = [];
        var sig = A.map(function (f, i) { return f.map(function (_, j) { return (i + j) % 2 ? "−" : "+"; }); });
        mats.innerHTML = bloque("Matriz A (línea elegida resaltada)", mx(A, function (i, j) { return (fila ? i === idx : j === idx) ? "sel" : ""; })) +
          bloque("Signos (−1)<sup>i+j</sup>", mx(sig, function (i, j) { return sig[i][j] === "+" ? "pos" : "neg"; }));
        for (var t = 0; t < n; t++) {
          var i = fila ? idx : t, j = fila ? t : idx, a = A[i][j], c = C[i][j];
          suma += a * c;
          tr.push("<div>" + (a === 0 ? "a<sub>" + (i + 1) + (j + 1) + "</sub> = 0: el término vale 0 (no hace falta el menor)"
            : "a<sub>" + (i + 1) + (j + 1) + "</sub>·(" + (((i + j) % 2) ? "−" : "+") + ")·|M<sub>" + (i + 1) + (j + 1) + "</sub>| = " + par(a) + "·(" + (((i + j) % 2) ? "−" : "+") + ")·(" + sg(M[i][j]) + ") = <b>" + sg(a * c) + "</b>") + "</div>");
        }
        for (var q = 0; q < n; q++) { var z = 0; for (var r = 0; r < n; r++) if (A[fila ? q : r][fila ? r : q] === 0) z++; ceros.push(z); }
        var mejor = ceros.indexOf(Math.max.apply(null, ceros));
        terms.innerHTML = tr.join("") + "<div>Suma de los términos: <b>|A| = " + sg(suma) + "</b></div>";
        lec.innerHTML = U.lec("|A| por esta línea", sg(suma)) + U.lec("|A| por Sarrus / otro desarrollo", sg(d)) + U.lec("Ceros en la línea elegida", String(ceros[idx])) +
          U.lec("Línea con más ceros", (fila ? "fila " : "columna ") + (mejor + 1) + " (" + ceros[mejor] + (ceros[mejor] === 1 ? " cero)" : " ceros)"));
        pie.innerHTML = "Elige una fila o columna: <b>el resultado es siempre el mismo</b>, pero cuantos más ceros tenga la línea, menos menores hay que calcular. Con la 4×4 se nota mucho.";
      } else {
        var T = D.tras(C);
        var inv = d !== 0, titulo, mat;
        if (st.paso === 1) { titulo = "Menores M<sub>ij</sub> = |A sin fila i ni columna j|"; mat = mx(M); }
        else if (st.paso === 2) { titulo = "Adjuntos A<sub>ij</sub> = (−1)<sup>i+j</sup>·M<sub>ij</sub>  (matriz Adj(A))"; mat = mx(C, function (i, j) { return (i + j) % 2 ? "neg" : "pos"; }); }
        else if (st.paso === 3) { titulo = "Traspuesta de la adjunta: Adj(A)<sup>t</sup>"; mat = mx(T); }
        else { titulo = inv ? "A<sup>−1</sup> = Adj(A)<sup>t</sup> / |A|" : "|A| = 0: no hay inversa"; mat = inv ? mx(T, null, function (i, j, v) { return D.frac(v, d); }) : '<span class="dt-mal">no existe</span>'; }
        mats.innerHTML = bloque("Matriz A, |A| = " + sg(d), mx(A)) + '<span style="font-size:22px">→</span>' + bloque(titulo, mat);
        terms.innerHTML = "";
        lec.innerHTML = U.lec("|A|", sg(d), inv ? "ok" : "mal") + U.lec("¿Tiene inversa?", inv ? "sí" : "no: |A| = 0");
        pie.innerHTML = st.paso === 1 ? "Cada menor es un determinante de orden " + (n - 1) + ", que sale de tachar una fila y una columna."
          : st.paso === 2 ? "Se cambia el signo según el tablero + − + / − + − / + − +…"
          : st.paso === 3 ? "<b>Ojo</b>: la traspuesta. Es el error más típico: olvidar este paso."
          : inv ? "Se divide cada elemento entre |A|. Comprobación rápida: la fila 1 de A por la columna 1 de A<sup>−1</sup> debe dar 1."
          : "Si |A| = 0 no se puede dividir: la matriz no tiene inversa (es singular).";
      }
    }
    opciones(); pinta();
  };

  // ============================================================
  // DETERMINANTE CON PARÁMETRO
  // ============================================================
  var PRE_PAR = [
    { k: "0", t: "m en la diagonal inversa", f: function (m) { return [[1, 1, m], [1, m, 1], [m, 1, 1]]; }, txt: [["1", "1", "m"], ["1", "m", "1"], ["m", "1", "1"]], raices: [1, -2], rn: ["1", "−2"], ymax: 10, ymin: -10 },
    { k: "1", t: "Tridiagonal", f: function (m) { return [[m, 1, 0], [1, m, 1], [0, 1, m]]; }, txt: [["m", "1", "0"], ["1", "m", "1"], ["0", "1", "m"]], raices: [-Math.SQRT2, 0, Math.SQRT2], rn: ["−√2", "0", "√2"], ymax: 8, ymin: -8 },
    { k: "2", t: "Una sola raíz", f: function (m) { return [[1, 2, 1], [2, m, 2], [1, 2, 3]]; }, txt: [["1", "2", "1"], ["2", "m", "2"], ["1", "2", "3"]], raices: [4], rn: ["4"], ymax: 12, ymin: -12 },
    { k: "3", t: "2×2: m² − 4", f: function (m) { return [[m, 4], [1, m]]; }, txt: [["m", "4"], ["1", "m"]], raices: [-2, 2], rn: ["−2", "2"], ymax: 12, ymin: -6 }
  ];
  D.PRE_PAR = PRE_PAR;
  B.w.det_param = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Determinante con parámetro: ¿para qué m se anula?");
    cuerpo.innerHTML = '<div data-pre></div><div data-raiz class="chips"></div><div class="dt-fila"><div data-mat></div></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, m: 0.5 }, g, pm, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), matEl = cuerpo.querySelector("[data-mat]");
    var sk = U.slider(ctl, { et: "Parámetro <i>m</i>", min: -4, max: 4, step: 0.05, val: 0.5, on: function (v) { st.m = Math.round(v * 1000) / 1000; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_PAR.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { st.i = +k; arma(); });
    function arma() {
      var p = PRE_PAR[st.i], el = cuerpo.querySelector(".w-plot");
      el.innerHTML = "";
      g = new B.Plot(el, { xmin: -4, xmax: 4, ymin: p.ymin, ymax: p.ymax, w: 560, h: 280, etx: "m", ety: "|A(m)|", etiqueta: "Valor del determinante según m" });
      pm = g.punto(0, 0, { capa: "top", r: 7, clase: "c-pen" });
      var o = p.raices.map(function (r, j) { return { k: String(j), t: "m = " + p.rn[j] }; });
      U.fichas(cuerpo.querySelector("[data-raiz]"), o, "-", function (k) { st.m = p.raices[+k]; sk.set(st.m); pinta(); });
      pinta();
    }
    function pinta() {
      var p = PRE_PAR[st.i], A = p.f(st.m), d = D.det(A), esRaiz = p.raices.some(function (r) { return Math.abs(r - st.m) < 1e-9; });
      if (esRaiz) d = 0;
      g.limpiar();
      g.horizontal(0, { clase: "c-faint" });
      g.curva(function (m) { return D.det(p.f(m)); }, { clase: "c-pen" });
      p.raices.forEach(function (r, j) { g.punto(r, 0, { clase: "c-red", r: 6 }); g.texto(r, 0, p.rn[j], { dx: 6, dy: -9, clase: "red" }); });
      g.mover(pm, st.m, Math.max(p.ymin, Math.min(p.ymax, d)));
      var rg = esRaiz ? D.rango(A) : (Math.abs(d) < 1e-9 ? D.rango(A) : A.length);
      matEl.innerHTML = bloque("A(m) con m = " + fmt(st.m, 2), mx(A, null, function (i, j) { var t = p.txt[i][j]; return t === "m" ? "<b>" + fmt(st.m, 2) + "</b>" : t; }));
      lec.innerHTML = U.lec("|A(m)|", fmt(d, 3), esRaiz ? "mal" : "") + U.lec("rg A(m)", String(rg), esRaiz ? "mal" : "ok") + U.lec("¿Tiene inversa?", esRaiz ? "no (|A| = 0)" : "sí") + U.lec("Valores que anulan |A|", "m = " + p.rn.join(", "));
      pie.innerHTML = "Desliza <i>m</i>. Donde la curva corta el eje (puntos rojos) el determinante vale 0: <b>justo ahí</b> baja el rango y desaparece la inversa. Para cualquier otro valor, rg = " + A.length + ". Pulsa los botones de «m =» para saltar a cada raíz.";
    }
    arma();
  };

  // ============================================================
  // CALCULADORA DE PROPIEDADES: |k·A^p·(Aᵗ)^q·B|
  // ============================================================
  B.w.det_calc = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calcula |k·Aᵖ·(Aᵗ)ᵠ·B| sin conocer A");
    cuerpo.innerHTML = '<div data-n class="chips"></div><div data-ctl></div><div data-usaB class="chips"></div><div class="dt-terms"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 3, dA: 3, k: 2, p: -1, q: 1, b: 0, dB: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var terms = cuerpo.querySelector(".dt-terms"), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.fichas(cuerpo.querySelector("[data-n]"), [{ k: "2", t: "Orden n = 2" }, { k: "3", t: "n = 3" }, { k: "4", t: "n = 4" }], "3", function (k) { st.n = +k; pinta(); });
    function sl(et, min, max, val, key) { return U.slider(ctl, { et: et, min: min, max: max, step: 1, val: val, on: function (v) { st[key] = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } }); }
    sl("|A|", -5, 5, 3, "dA"); sl("k", -3, 4, 2, "k"); sl("Exponente p de A", -2, 3, -1, "p"); sl("Exponente q de Aᵗ", 0, 2, 1, "q");
    U.fichas(cuerpo.querySelector("[data-usaB]"), [{ k: "0", t: "Sin B" }, { k: "1", t: "Multiplicar por B (|B| = 2)" }], "0", function (k) { st.b = +k; pinta(); });
    function sup(e) { return e === 1 ? "" : "<sup>" + sg(e) + "</sup>"; }
    function pinta() {
      var n = st.n, dA = st.dA, k = st.k, p = st.p, q = st.q, b = st.b, e = p + q;
      var expr = (k === 1 ? "" : sg(k)) + "A" + sup(p) + (q ? "·(A<sup>t</sup>)" + sup(q) : "") + (b ? "·B" : "");
      var l1 = "|" + expr + "| = " + par(k) + "<sup>" + n + "</sup>·|A|" + sup(p) + (q ? "·|A<sup>t</sup>|" + sup(q) : "") + (b ? "·|B|" : "");
      var l2 = "= " + par(k) + "<sup>" + n + "</sup>·" + par(dA) + sup(p) + (q ? "·" + par(dA) + sup(q) : "") + (b ? "·" + par(st.dB) : "");
      var ok = !(dA === 0 && p < 0), num = 1, den = 1;
      if (ok) {
        num = Math.pow(k, n) * (b ? st.dB : 1);
        if (e >= 0) num *= Math.pow(dA, e); else den = Math.pow(dA, -e);
      }
      var res = ok ? D.frac(num, den) : '<span class="dt-mal">no existe: A no tiene inversa</span>';
      terms.innerHTML = "<div>" + l1 + "</div><div>(la clave: |kA| = kⁿ|A|, |Aᵗ| = |A|, |A<sup>−1</sup>| = 1/|A|, |AB| = |A||B|)</div><div>" + l2 + "</div><div>= <b>" + res + "</b></div>";
      lec.innerHTML = U.lec("Expresión", "|" + expr + "|") + U.lec("Resultado", ok ? D.frac(num, den) : "no existe", ok ? "ok" : "mal") + U.lec("Exponente total de |A|", sg(e)) + U.lec("Factor k<sup>n</sup>", sg(Math.pow(k, n)));
      pie.innerHTML = "Cambia el orden <i>n</i>: el número <i>k</i> sale <b>elevado a n</b>, no multiplicado. Con exponentes negativos, A debe ser invertible (|A| ≠ 0).";
    }
    pinta();
  };
})(window);
