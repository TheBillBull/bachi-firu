/* ============================================================
   Bachi para Firu · laboratorio de matrices (Matemáticas II, tema 1)
   motor B.lab.mt (fracciones exactas) + mm_producto · mm_potencias ·
   mm_gauss · mm_ecuacion · mm_rango
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, H = B.h;
  B.lab = B.lab || {};
  var T = B.lab.mt = {};

  function estilo(id, css) {
    try {
      if (document.getElementById(id)) return;
      var s = document.createElement("style"); s.id = id; s.textContent = css; document.head.appendChild(s);
    } catch (e) { /* sin documento (volcado de datos) */ }
  }
  estilo("mm-css",
    ".mm-fila{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px;margin:12px 0 6px;font-family:var(--math)}" +
    ".mm-op{font:600 22px/1 var(--math);color:var(--ink-soft)}" +
    ".mm-wrap{display:inline-block;max-width:100%;overflow-x:auto;vertical-align:middle}" +
    ".mm-t{border-collapse:separate;border-spacing:3px;border-left:2px solid var(--ink-soft);border-right:2px solid var(--ink-soft);border-radius:6px;padding:2px 4px;font:17px/1.2 var(--math);color:var(--ink)}" +
    ".mm-t td{min-width:2.3em;height:2.2em;text-align:center;border-radius:6px;padding:0 3px;transition:background .15s}" +
    ".mm-t td.sep{border-left:2px dashed var(--ink-faint);padding-left:8px}" +
    ".mm-t td.fila{background:var(--pen-soft)} .mm-t td.col{background:var(--ok-soft)} .mm-t td.fila.col{background:var(--hl-wash,var(--pen-soft));outline:2px solid var(--pen)}" +
    ".mm-t td.act{background:var(--pen-soft);outline:2px solid var(--pen);font-weight:700} .mm-t td.pend{color:var(--ink-faint);cursor:pointer}" +
    ".mm-t td.hecho{cursor:pointer} .mm-t td.piv{background:var(--hl-wash,var(--pen-soft));outline:2px solid var(--pen);font-weight:700}" +
    ".mm-t td.mod{background:var(--ok-soft)} .mm-t td.mal{background:var(--red-soft);color:var(--red)} .mm-t td.bien{background:var(--ok-soft)}" +
    ".mm-in{width:2.6em;height:2.1em;text-align:center;font:inherit;color:var(--ink);background:var(--sheet);border:1.5px solid var(--line);border-radius:6px;padding:0}" +
    ".mm-in:focus{outline:2px solid var(--pen);border-color:var(--pen)} .mm-in.malo{border-color:var(--red);background:var(--red-soft)}" +
    ".mm-t .frac{font-size:.85em}" +
    ".mm-nota{font:600 13px/1.4 var(--body);color:var(--ink-soft);margin:2px 0 0}" +
    ".mm-pots{display:flex;flex-wrap:wrap;gap:8px 12px;margin:8px 0;align-items:flex-end}" +
    ".mm-pot{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:13px;color:var(--ink-soft)} .mm-pot.ult{color:var(--pen);font-weight:700}" +
    ".mm-pasos{margin:6px 0 0;padding-left:22px;font-size:14.5px;color:var(--ink-soft)} .mm-pasos li{margin:2px 0} .mm-pasos li.on{color:var(--ink);font-weight:600}" +
    ".mm-eq{font:600 20px/1.3 var(--math);color:var(--ink);margin:6px 0}" +
    ".mm-msg{border-left:4px solid var(--red);background:var(--red-soft);border-radius:4px 10px 10px 4px;padding:8px 14px;margin:10px 0;font-size:14.5px}" +
    ".mm-msg.ok{border-color:var(--ok);background:var(--ok-soft)}" +
    ".mm-t td{white-space:nowrap} .mm-nw{display:inline-flex;align-items:center;gap:1px;white-space:nowrap}" +
    "@media (max-width:520px){.mm-t{font-size:15px}.mm-t td{min-width:2em}.mm-in{width:2.3em}}" +
    ".mm-t.g{font-size:14px;border-spacing:2px;padding:2px 2px}.mm-t.g td{min-width:1.5em;padding:0 2px}");

  // ------------------------------------------------------------
  // Fracciones exactas: { n, d }
  // ------------------------------------------------------------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function F(n, d) { d = d == null ? 1 : d; if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return { n: n / g, d: d / g }; }
  var f0 = F(0), f1 = F(1);
  T.F = F;
  T.add = function (a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); };
  T.sub = function (a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); };
  T.mul = function (a, b) { return F(a.n * b.n, a.d * b.d); };
  T.div = function (a, b) { return F(a.n * b.d, a.d * b.n); };
  T.neg = function (a) { return F(-a.n, a.d); };
  T.z = function (a) { return a.n === 0; };
  T.eq = function (a, b) { return a.n === b.n && a.d === b.d; };
  T.val = function (a) { return a.n / a.d; };
  function sg(n) { return n < 0 ? "−" : ""; }
  T.txt = function (a) { return a.d === 1 ? sg(a.n) + Math.abs(a.n) : sg(a.n) + Math.abs(a.n) + "/" + a.d; };
  T.html = function (a) { return a.d === 1 ? sg(a.n) + Math.abs(a.n) : "<span class='mm-nw'>" + sg(a.n) + H.fr(Math.abs(a.n), a.d) + "</span>"; };
  T.parse = function (s) {
    s = String(s).replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/,/g, ".");
    var m;
    if ((m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s))) {
      var dec = m[3] || "", n = parseInt(m[2] + dec, 10), d = Math.pow(10, dec.length);
      if (n > 1e7) return null;
      return F(m[1] ? -n : n, d);
    }
    if ((m = /^(-?\d+)\/(\d+)$/.exec(s))) { if (+m[2] === 0 || Math.abs(+m[1]) > 1e7) return null; return F(+m[1], +m[2]); }
    return null;
  };

  // ------------------------------------------------------------
  // Matrices de fracciones (arrays de filas)
  // ------------------------------------------------------------
  T.de = function (rows) { return rows.map(function (r) { return r.map(function (x) { return typeof x === "number" ? F(x) : x; }); }); };
  T.copia = function (A) { return A.map(function (r) { return r.slice(); }); };
  T.id = function (n) { var I = []; for (var i = 0; i < n; i++) { I.push([]); for (var j = 0; j < n; j++) I[i].push(i === j ? f1 : f0); } return I; };
  T.mmul = function (A, Bm) {
    var m = A.length, n = Bm.length, q = Bm[0].length, C = [];
    for (var i = 0; i < m; i++) { C.push([]); for (var j = 0; j < q; j++) { var s = f0; for (var k = 0; k < n; k++) s = T.add(s, T.mul(A[i][k], Bm[k][j])); C[i].push(s); } }
    return C;
  };
  T.madd = function (A, Bm) { return A.map(function (r, i) { return r.map(function (x, j) { return T.add(x, Bm[i][j]); }); }); };
  T.msub = function (A, Bm) { return A.map(function (r, i) { return r.map(function (x, j) { return T.sub(x, Bm[i][j]); }); }); };
  T.igual = function (A, Bm) { return A.length === Bm.length && A[0].length === Bm[0].length && A.every(function (r, i) { return r.every(function (x, j) { return T.eq(x, Bm[i][j]); }); }); };
  T.potencia = function (A, k) { var P = T.id(A.length); for (var i = 0; i < k; i++) P = T.mmul(P, A); return P; };
  var SUB = "₀₁₂₃₄₅₆₇₈₉";
  function sb(i) { return String(i).split("").map(function (c) { return SUB.charAt(+c); }).join(""); }
  T.sb = sb;

  // Gauss-Jordan sobre (A | I): lista de pasos { M, txt, mod, piv, fin }
  T.gj = function (A) {
    var n = A.length, M = A.map(function (r, i) { return r.concat(T.id(n)[i]); }), pasos = [];
    function foto(txt, extra) { var o = { M: T.copia(M), txt: txt }; if (extra) for (var k in extra) o[k] = extra[k]; pasos.push(o); }
    foto("Escribimos la matriz ampliada (A | I).");
    for (var c = 0; c < n; c++) {
      var r = -1, i;
      for (i = c; i < n; i++) if (!T.z(M[i][c])) { r = i; break; }
      if (r < 0) { foto("En la columna " + (c + 1) + " no queda ningún pivote (todo ceros desde la fila " + (c + 1) + "): A no tiene inversa.", { fin: "sing", piv: [c, c] }); return pasos; }
      if (r !== c) { var t = M[r]; M[r] = M[c]; M[c] = t; foto("F" + sb(c + 1) + " ↔ F" + sb(r + 1) + ": intercambio filas para tener un pivote distinto de 0.", { mod: [c, r], piv: [c, c] }); }
      var p = M[c][c];
      if (!T.eq(p, f1)) {
        M[c] = M[c].map(function (x) { return T.div(x, p); });
        foto("F" + sb(c + 1) + " ← F" + sb(c + 1) + (p.n === -1 && p.d === 1 ? " · (−1)" : " ÷ " + (p.n < 0 || p.d !== 1 ? "(" + T.txt(p) + ")" : T.txt(p))) + ": el pivote pasa a valer 1.", { mod: [c], piv: [c, c] });
      }
      for (i = 0; i < n; i++) {
        if (i === c || T.z(M[i][c])) continue;
        var f = M[i][c];
        M[i] = M[i].map(function (x, j) { return T.sub(x, T.mul(f, M[c][j])); });
        var ab = F(Math.abs(f.n), f.d), coef = T.eq(ab, f1) ? "" : (ab.d === 1 ? ab.n : "(" + T.txt(ab) + ")") + "·";
        foto("F" + sb(i + 1) + " ← F" + sb(i + 1) + (f.n > 0 ? " − " : " + ") + coef + "F" + sb(c + 1) + ": hago 0 el " + T.txt(f) + " de la columna " + (c + 1) + ".", { mod: [i], piv: [c, c] });
      }
    }
    foto("A la izquierda queda la identidad: A⁻¹ es la parte derecha.", { fin: "ok" });
    return pasos;
  };
  T.inv = function (A) {
    var p = T.gj(A), u = p[p.length - 1];
    if (u.fin !== "ok") return null;
    return u.M.map(function (r) { return r.slice(A.length); });
  };

  // Escalonamiento (Gauss hacia delante): { rango, R, pasos:[txt] }
  T.escalona = function (A0) {
    var A = T.copia(A0), m = A.length, n = A[0].length, r = 0, pasos = [];
    for (var c = 0; c < n && r < m; c++) {
      var p = -1, i;
      for (i = r; i < m; i++) if (!T.z(A[i][c])) { p = i; break; }
      if (p < 0) continue;
      if (p !== r) { var t = A[p]; A[p] = A[r]; A[r] = t; pasos.push("F" + sb(r + 1) + " ↔ F" + sb(p + 1)); }
      for (i = r + 1; i < m; i++) {
        if (T.z(A[i][c])) continue;
        var f = T.div(A[i][c], A[r][c]);
        A[i] = A[i].map(function (x, j) { return T.sub(x, T.mul(f, A[r][j])); });
        var ab = F(Math.abs(f.n), f.d), coef = T.eq(ab, f1) ? "" : (ab.d === 1 ? ab.n : "(" + T.txt(ab) + ")") + "·";
        pasos.push("F" + sb(i + 1) + " ← F" + sb(i + 1) + (f.n > 0 ? " − " : " + ") + coef + "F" + sb(r + 1));
      }
      r++;
    }
    return { rango: r, R: A, pasos: pasos };
  };

  // ------------------------------------------------------------
  // Dibujo de matrices
  // ------------------------------------------------------------
  // o = { cls(i,j), sep, edit: nombre, celda(i,j,x) }
  function mhtml(M, o) {
    o = o || {};
    var h = '<span class="mm-wrap"' + (o.id ? ' data-mat="' + o.id + '"' : "") + '><table class="mm-t' + (M[0].length >= 5 ? " g" : "") + '"><tbody>';
    for (var i = 0; i < M.length; i++) {
      h += "<tr>";
      for (var j = 0; j < M[i].length; j++) {
        var cl = (o.cls && o.cls(i, j)) || "";
        if (o.sep != null && j === o.sep) cl += " sep";
        h += '<td class="' + cl + '" data-i="' + i + '" data-j="' + j + '">' +
          (o.edit ? '<input class="mm-in" type="text" autocomplete="off" data-m="' + o.edit + '" data-i="' + i + '" data-j="' + j + '" value="' + T.txt(M[i][j]).replace("−", "-") + '" aria-label="' + o.edit + " fila " + (i + 1) + " columna " + (j + 1) + '">' : (o.celda ? o.celda(i, j, M[i][j]) : T.html(M[i][j]))) + "</td>";
      }
      h += "</tr>";
    }
    return h + "</tbody></table></span>";
  }
  T.mhtml = mhtml;
  // matriz para texto de teoría: T.m([[1,2],[3,4]])
  T.m = function (rows, sep) {
    return mhtml(rows.map(function (r) { return r.map(function (x) { if (typeof x === "string") return T.parse(x); return typeof x === "number" ? F(x) : x; }); }), { sep: sep });
  };
  // matriz con textos libres (parámetros): T.mt([["1","a"],["b","0"]])
  T.mt = function (rows) {
    return mhtml(rows.map(function (r) { return r.map(function (x) { return x; }); }), { celda: function (i, j, x) { return String(x).replace(/-/g, "−"); } });
  };

  // Enlaza <input class="mm-in"> de un contenedor con una matriz de estado: alCambiar(nombre) tras una edición válida
  function enlazar(host, estado, alCambiar) {
    host.addEventListener("input", function (e) {
      var inp = e.target; if (!inp.classList || !inp.classList.contains("mm-in")) return;
      var v = T.parse(inp.value);
      inp.classList.toggle("malo", !v);
      if (!v) return;
      estado[inp.getAttribute("data-m")][+inp.getAttribute("data-i")][+inp.getAttribute("data-j")] = v;
      alCambiar(inp.getAttribute("data-m"));
    });
  }
  function dimTxt(M) { return M.length + "×" + M[0].length; }
  function par(f) { return f.n < 0 || f.d !== 1 ? "(" + T.txt(f) + ")" : T.txt(f); }
  function rel(m, n, base) {
    var M = [];
    for (var i = 0; i < m; i++) { M.push([]); for (var j = 0; j < n; j++) M[i].push(F(((i * 2 + j * 3 + base) % 5) - 1)); }
    return M;
  }

  // ============================================================
  // 1. Producto fila × columna
  // ============================================================
  B.w.mm_producto = function (host) {
    var cu = B.caja(host, "Pruébalo", "Multiplicar matrices: fila por columna");
    cu.innerHTML = '<div data-pre></div><div class="ctl" data-dims></div><div class="mm-fila" data-mats></div><div class="lectura anch"></div><p class="w-pie"></p><div class="ctl" data-btn></div>';
    var pres = [
      { k: "tema", t: "Ejemplo del tema", A: [[1, 2], [3, 4]], B: [[5, 6], [7, 8]] },
      { k: "rect", t: "2×3 por 3×2", A: [[1, 0, 2], [-1, 3, 1]], B: [[3, 1], [2, 1], [1, 0]] },
      { k: "conm", t: "No conmutan", A: [[1, 1], [0, 1]], B: [[1, 0], [1, 1]] },
      { k: "nulo", t: "AB = O con A, B ≠ O", A: [[1, 1], [1, 1]], B: [[1, -1], [-1, 1]] },
      { k: "no", t: "No se puede", A: [[1, 2, 3], [4, 5, 6]], B: [[1, 0, 2], [0, 1, 1]] }
    ];
    var E = { A: null, B: null }, k = 0;
    var mats = cu.querySelector("[data-mats]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    var sl = {};
    function dims() { return [E.A.length, E.A[0].length, E.B.length, E.B[0].length]; }
    function ajusta(M, m, n, base) { var R = rel(m, n, base); for (var i = 0; i < m; i++) for (var j = 0; j < n; j++) if (M[i] && M[i][j]) R[i][j] = M[i][j]; return R; }
    function armar() {
      mats.innerHTML = '<span data-a>' + mhtml(E.A, { edit: "A" }) + '</span><span class="mm-op">×</span><span data-b>' + mhtml(E.B, { edit: "B" }) + '</span><span class="mm-op">=</span><span data-c></span>';
      pinta();
    }
    function pinta() {
      var m = E.A.length, n = E.A[0].length, p = E.B.length, q = E.B[0].length, ok = n === p, C = ok ? T.mmul(E.A, E.B) : null;
      var tot = ok ? m * q : 0; if (k > tot) k = tot;
      var ci = k ? Math.floor((k - 1) / q) : -1, cj = k ? (k - 1) % q : -1;
      Array.prototype.forEach.call(mats.querySelectorAll("[data-a] td"), function (td) { td.classList.toggle("fila", ok && +td.getAttribute("data-i") === ci); });
      Array.prototype.forEach.call(mats.querySelectorAll("[data-b] td"), function (td) { td.classList.toggle("col", ok && +td.getAttribute("data-j") === cj); });
      var cc = mats.querySelector("[data-c]");
      if (ok) {
        cc.innerHTML = mhtml(C, { id: "C", cls: function (i, j) { var idx = i * q + j; return idx === k - 1 ? "act" : idx < k ? "hecho" : "pend"; }, celda: function (i, j, x) { return (i * q + j) < k ? T.html(x) : "?"; } });
        Array.prototype.forEach.call(cc.querySelectorAll("td"), function (td) { td.addEventListener("click", function () { k = +td.getAttribute("data-i") * q + +td.getAttribute("data-j") + 1; pinta(); }); });
      } else cc.innerHTML = '<span class="mm-msg">no existe</span>';
      var bExiste = q === m, igual = null, motivo = "";
      if (ok && bExiste) { var BAm = T.mmul(E.B, E.A); if (BAm.length === C.length && BAm[0].length === C[0].length) igual = T.igual(C, BAm); else motivo = "no: distinto tamaño"; }
      else if (ok || bExiste) motivo = "no: solo existe uno";
      else motivo = "no existe ninguno";
      lect.innerHTML =
        U.lec("A y B", "A " + m + "×" + n + " · B " + p + "×" + q) +
        U.lec("A·B", ok ? "existe: " + m + "×" + q : "no existe", ok ? "ok" : "red") +
        U.lec("B·A", bExiste ? "existe: " + p + "×" + n : "no existe", bExiste ? "ok" : "red") +
        U.lec("¿A·B = B·A?", igual === null ? motivo : igual ? "sí (casualidad)" : "no", igual === true ? "ok" : "red");
      if (!ok) pie.innerHTML = "A tiene <b>" + n + "</b> columnas y B tiene <b>" + p + "</b> filas: para multiplicar tienen que coincidir. Cambia las dimensiones con los deslizadores.";
      else if (!k) pie.innerHTML = "El resultado será " + m + "×" + q + ". Pulsa «Siguiente» para ver cómo sale cada elemento, o pulsa una casilla del resultado.";
      else {
        var t = [], s = f0, ts = [];
        for (var x = 0; x < n; x++) { t.push(par(E.A[ci][x]) + "·" + par(E.B[x][cj])); s = T.add(s, T.mul(E.A[ci][x], E.B[x][cj])); }
        pie.innerHTML = "(A·B)<sub>" + (ci + 1) + (cj + 1) + "</sub> = fila " + (ci + 1) + " de A · columna " + (cj + 1) + " de B = " + t.join(" + ") + " = <b>" + T.txt(s) + "</b>";
      }
    }
    var ctl = U.ctl(cu.querySelector("[data-dims]"));
    function dim(et, idx) {
      return U.slider(ctl, { et: et, min: 1, max: 4, step: 1, val: 2, on: function (v) {
        var d = dims(); d[idx] = v;
        E.A = ajusta(E.A, d[0], d[1], 0); E.B = ajusta(E.B, d[2], d[3], 2); k = 0; armar();
      }, fmt: function (v) { return String(v); } });
    }
    sl.am = dim("filas de A", 0); sl.an = dim("columnas de A", 1); sl.bp = dim("filas de B", 2); sl.bq = dim("columnas de B", 3);
    function elige(kk) {
      var p = pres.filter(function (x) { return x.k === kk; })[0];
      E.A = T.de(p.A); E.B = T.de(p.B); k = 0;
      sl.am.set(E.A.length); sl.an.set(E.A[0].length); sl.bp.set(E.B.length); sl.bq.set(E.B[0].length);
      armar();
    }
    U.fichas(cu.querySelector("[data-pre]"), pres.map(function (p) { return { k: p.k, t: p.t }; }), "tema", elige);
    enlazar(mats, E, function () { pinta(); });
    var bt = cu.querySelector("[data-btn]");
    U.boton(bt, "Siguiente ▸", function () { var d = dims(); if (d[1] === d[2]) { k = Math.min(k + 1, d[0] * d[3]); pinta(); } });
    U.boton(bt, "Todo ⏭", function () { var d = dims(); if (d[1] === d[2]) { k = d[0] * d[3]; pinta(); } });
    U.boton(bt, "↺ Reiniciar", function () { k = 0; pinta(); });
    elige("tema");
  };

  // ============================================================
  // 2. Potencias y patrón
  // ============================================================
  function fib(n) { var a = 0, b = 1; for (var i = 0; i < n; i++) { var t = a + b; a = b; b = t; } return a; }
  var POT = [
    { k: "diag", t: "Diagonal", A: [[2, 0], [0, -1]], forma: "Aⁿ = diag(2ⁿ, (−1)ⁿ): se eleva cada elemento de la diagonal.", f: function (n) { return [[Math.pow(2, n), 0], [0, Math.pow(-1, n)]]; } },
    { k: "unip", t: "[[1,1],[0,1]]", A: [[1, 1], [0, 1]], forma: "Aⁿ = [[1, n], [0, 1]]: cada potencia suma 1 arriba a la derecha.", f: function (n) { return [[1, n], [0, 1]]; } },
    { k: "doble", t: "[[2,1],[0,2]]", A: [[2, 1], [0, 2]], forma: "A = 2I + N con N² = O: Aⁿ = [[2ⁿ, n·2ⁿ⁻¹], [0, 2ⁿ]].", f: function (n) { return [[Math.pow(2, n), n * Math.pow(2, n - 1)], [0, Math.pow(2, n)]]; } },
    { k: "tri3", t: "Triangular 3×3", A: [[1, 1, 1], [0, 1, 1], [0, 0, 1]], forma: "A = I + N con N³ = O: Aⁿ = I + nN + n(n−1)/2·N², así que a₁₃ = n(n+1)/2.", f: function (n) { return [[1, n, n * (n + 1) / 2], [0, 1, n], [0, 0, 1]]; } },
    { k: "nil", t: "Nilpotente 3×3", A: [[0, 1, 0], [0, 0, 1], [0, 0, 0]], forma: "A² ≠ O pero A³ = O: desde n = 3 todas las potencias son la matriz nula.", f: function (n) { return n === 1 ? [[0, 1, 0], [0, 0, 1], [0, 0, 0]] : n === 2 ? [[0, 0, 1], [0, 0, 0], [0, 0, 0]] : [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; } },
    { k: "idem", t: "Idempotente", A: [[2, -2], [1, -1]], forma: "A² = A (idempotente): todas las potencias valen A.", f: function () { return [[2, -2], [1, -1]]; } },
    { k: "invol", t: "Intercambio", A: [[0, 1], [1, 0]], forma: "A² = I (involutiva): Aⁿ = A si n es impar e I si n es par.", f: function (n) { return n % 2 ? [[0, 1], [1, 0]] : [[1, 0], [0, 1]]; } },
    { k: "giro", t: "Giro de 90°", A: [[0, -1], [1, 0]], forma: "A⁴ = I: las potencias se repiten con periodo 4 (A, −I, −A, I).", f: function (n) { var r = n % 4; return r === 1 ? [[0, -1], [1, 0]] : r === 2 ? [[-1, 0], [0, -1]] : r === 3 ? [[0, 1], [-1, 0]] : [[1, 0], [0, 1]]; } },
    { k: "fib", t: "Fibonacci", A: [[1, 1], [1, 0]], forma: "Aⁿ = [[Fₙ₊₁, Fₙ], [Fₙ, Fₙ₋₁]] con Fₙ los números de Fibonacci (0, 1, 1, 2, 3, 5, 8…).", f: function (n) { return [[fib(n + 1), fib(n)], [fib(n), fib(n - 1)]]; } }
  ];
  T.POT = POT;
  B.w.mm_potencias = function (host) {
    var cu = B.caja(host, "Pruébalo", "Potencias de una matriz: busca el patrón");
    cu.innerHTML = '<div data-pre></div><div class="ctl" data-n></div><div class="mm-pots"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var pre = POT[0], n = 4, pots = cu.querySelector(".mm-pots"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function pinta() {
      var A = T.de(pre.A), P = T.id(A.length), h = "", Pn;
      for (var i = 1; i <= n; i++) {
        P = T.mmul(P, A); Pn = P;
        if (n <= 6 || i > n - 6 || i <= 2) h += '<div class="mm-pot' + (i === n ? " ult" : "") + '"><span>A<sup>' + i + "</sup></span>" + mhtml(P) + "</div>";
        else if (i === 3) h += '<div class="mm-pot"><span>…</span></div>';
      }
      pots.innerHTML = h;
      var Fm = T.de(pre.f(n)), coincide = T.igual(Fm, Pn);
      lect.innerHTML = U.lec("Potencia", "A" + U.sup(n) + " es " + dimTxt(Pn), "pen") + U.lec("Fórmula del patrón", coincide ? "coincide con el cálculo ✓" : "NO coincide", coincide ? "ok" : "red");
      pie.innerHTML = "<b>Patrón:</b> " + pre.forma;
    }
    var ctl = U.ctl(cu.querySelector("[data-n]"));
    U.slider(ctl, { et: "exponente n", min: 1, max: 12, step: 1, val: n, on: function (v) { n = v; pinta(); }, fmt: function (v) { return String(v); } });
    U.fichas(cu.querySelector("[data-pre]"), POT.map(function (p) { return { k: p.k, t: p.t }; }), "diag", function (kk) { pre = POT.filter(function (p) { return p.k === kk; })[0]; pinta(); });
    pinta();
  };

  // ============================================================
  // 3. Gauss-Jordan guiado
  // ============================================================
  B.w.mm_gauss = function (host) {
    var cu = B.caja(host, "Pruébalo", "Matriz inversa por Gauss-Jordan, paso a paso");
    cu.innerHTML = '<div data-pre></div><div class="mm-fila" data-ent></div><div class="mm-fila" data-amp></div><div class="lectura anch"></div><p class="w-pie"></p><div class="ctl" data-btn></div>';
    var pres = [
      { k: "a", t: "2×2", A: [[2, 1], [5, 3]] },
      { k: "b", t: "3×3", A: [[1, 2, 3], [0, 1, 4], [1, 0, 6]] },
      { k: "c", t: "3×3 con intercambio", A: [[0, 1, 2], [1, 0, 3], [4, -3, 8]] },
      { k: "d", t: "2×2 sin inversa", A: [[1, 2], [2, 4]] },
      { k: "e", t: "3×3 sin inversa", A: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }
    ];
    var E = { A: T.de(pres[0].A) }, pasos, s = 0;
    var ent = cu.querySelector("[data-ent]"), amp = cu.querySelector("[data-amp]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function recalcula() { pasos = T.gj(E.A); s = Math.min(s, pasos.length - 1); }
    function pinta() {
      var P = pasos[s], n = E.A.length;
      amp.innerHTML = mhtml(P.M, { sep: n, cls: function (i, j) {
        var c = ""; if (P.piv && i === P.piv[0] && j === P.piv[1] && s > 0) c += " piv";
        if (P.mod && P.mod.indexOf(i) >= 0) c += " mod";
        if (P.fin === "ok" && j >= n) c += " bien";
        if (P.fin === "sing" && j < n && i >= P.piv[0]) c += " mal";
        return c;
      } });
      var ult = s === pasos.length - 1, ver = "";
      if (ult && P.fin === "ok") {
        var Ai = P.M.map(function (r) { return r.slice(n); });
        ver = T.igual(T.mmul(E.A, Ai), T.id(n)) ? "A·A⁻¹ = I ✓" : "no cuadra";
      }
      lect.innerHTML = U.lec("Paso", s + " de " + (pasos.length - 1)) + U.lec("Resultado", !ult ? "en curso…" : P.fin === "ok" ? "A⁻¹ encontrada" : "A no es invertible", !ult ? "" : P.fin === "ok" ? "ok" : "red") + (ver ? U.lec("Comprobación", ver, "ok") : "");
      pie.innerHTML = (s ? "<b>" + s + ".</b> " : "") + P.txt;
      var b = cu.querySelectorAll("[data-btn] button"); b[0].disabled = s === 0; b[1].disabled = ult; b[2].disabled = ult;
    }
    function armar() {
      ent.innerHTML = '<span class="mm-op">A =</span>' + mhtml(E.A, { edit: "A" });
      recalcula(); pinta();
    }
    function elige(kk) { E.A = T.de(pres.filter(function (p) { return p.k === kk; })[0].A); s = 0; armar(); }
    U.fichas(cu.querySelector("[data-pre]"), pres.map(function (p) { return { k: p.k, t: p.t }; }), "a", elige);
    enlazar(ent, E, function () { s = 0; recalcula(); pinta(); });
    var bt = cu.querySelector("[data-btn]");
    U.boton(bt, "◂ Atrás", function () { if (s > 0) { s--; pinta(); } });
    U.boton(bt, "Siguiente ▸", function () { if (s < pasos.length - 1) { s++; pinta(); } });
    U.boton(bt, "Todo ⏭", function () { s = pasos.length - 1; pinta(); });
    U.boton(bt, "↺ Reiniciar", function () { s = 0; pinta(); });
    armar();
  };

  // ============================================================
  // 4. Ecuaciones matriciales: despeja sin dividir
  // ============================================================
  B.w.mm_ecuacion = function (host) {
    var cu = B.caja(host, "Pruébalo", "Ecuaciones matriciales: ¿por qué lado multiplico?");
    cu.innerHTML = '<div data-pre></div><div class="mm-fila" data-ent></div><div class="mm-eq"></div><ol class="mm-pasos"></ol><div class="mm-fila" data-res></div><div class="lectura anch"></div><p class="w-pie"></p><div class="ctl" data-btn></div>';
    var I2 = T.id(2);
    function inv(M) { return T.inv(M); }
    var FORMAS = [
      { k: "ax", t: "AX = B", eq: "A·X = B", usa: "AB", pasos: ["Multiplico por A⁻¹ <b>por la izquierda</b> en los dos miembros: A⁻¹·A·X = A⁻¹·B.", "Como A⁻¹·A = I: X = A⁻¹·B."], need: ["A"],
        X: function (A, Bm) { return T.mmul(inv(A), Bm); }, lhs: function (A, Bm, X) { return T.mmul(A, X); }, rhs: function (A, Bm) { return Bm; }, mal: function (A, Bm) { return T.mmul(Bm, inv(A)); }, malTxt: "B·A⁻¹" },
      { k: "xa", t: "XA = B", eq: "X·A = B", usa: "AB", pasos: ["Multiplico por A⁻¹ <b>por la derecha</b> en los dos miembros: X·A·A⁻¹ = B·A⁻¹.", "Como A·A⁻¹ = I: X = B·A⁻¹."], need: ["A"],
        X: function (A, Bm) { return T.mmul(Bm, inv(A)); }, lhs: function (A, Bm, X) { return T.mmul(X, A); }, rhs: function (A, Bm) { return Bm; }, mal: function (A, Bm) { return T.mmul(inv(A), Bm); }, malTxt: "A⁻¹·B" },
      { k: "axb", t: "AXB = C", eq: "A·X·B = C", usa: "ABC", pasos: ["A⁻¹ por la izquierda y B⁻¹ por la derecha: A⁻¹·A·X·B·B⁻¹ = A⁻¹·C·B⁻¹.", "Se cancelan los pares: X = A⁻¹·C·B⁻¹."], need: ["A", "B"],
        X: function (A, Bm, C) { return T.mmul(T.mmul(inv(A), C), inv(Bm)); }, lhs: function (A, Bm, X) { return T.mmul(T.mmul(A, X), Bm); }, rhs: function (A, Bm, X, C) { return C; }, mal: function (A, Bm, C) { return T.mmul(T.mmul(inv(Bm), C), inv(A)); }, malTxt: "B⁻¹·C·A⁻¹" },
      { k: "axbc", t: "AX + B = C", eq: "A·X + B = C", usa: "ABC", pasos: ["Paso los sumandos que no llevan X: A·X = C − B.", "Ahora multiplico por A⁻¹ por la izquierda: X = A⁻¹·(C − B)."], need: ["A"],
        X: function (A, Bm, C) { return T.mmul(inv(A), T.msub(C, Bm)); }, lhs: function (A, Bm, X) { return T.madd(T.mmul(A, X), Bm); }, rhs: function (A, Bm, X, C) { return C; }, mal: function (A, Bm, C) { return T.mmul(T.msub(C, Bm), inv(A)); }, malTxt: "(C − B)·A⁻¹" },
      { k: "axx", t: "AX + X = B", eq: "A·X + X = B", usa: "AB", pasos: ["X está en los dos sumandos: saco factor común <b>por la derecha</b>, A·X + I·X = (A + I)·X.", "(A + I)·X = B, y multiplico por (A + I)⁻¹ por la izquierda: X = (A + I)⁻¹·B."], need: ["A+I"],
        X: function (A, Bm) { return T.mmul(inv(T.madd(A, I2)), Bm); }, lhs: function (A, Bm, X) { return T.madd(T.mmul(A, X), X); }, rhs: function (A, Bm) { return Bm; }, mal: null },
      { k: "xax", t: "XA = X + B", eq: "X·A = X + B", usa: "AB", pasos: ["Paso X al otro lado: X·A − X = B, y saco factor común <b>por la izquierda</b>: X·(A − I) = B.", "Multiplico por (A − I)⁻¹ por la derecha: X = B·(A − I)⁻¹."], need: ["A−I"],
        X: function (A, Bm) { return T.mmul(Bm, inv(T.msub(A, I2))); }, lhs: function (A, Bm, X) { return T.mmul(X, A); }, rhs: function (A, Bm, X) { return T.madd(X, Bm); }, mal: null }
    ];
    var E = { A: T.de([[2, 1], [5, 3]]), B: T.de([[4, 1], [9, 2]]), C: T.de([[1, 2], [3, 4]]) }, forma = FORMAS[0], malOn = false;
    var ent = cu.querySelector("[data-ent]"), eq = cu.querySelector(".mm-eq"), ol = cu.querySelector(".mm-pasos"), res = cu.querySelector("[data-res]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function armar() {
      var h = '<span class="mm-op">A =</span>' + mhtml(E.A, { edit: "A" }) + '<span class="mm-op">B =</span>' + mhtml(E.B, { edit: "B" });
      if (forma.usa.indexOf("C") >= 0) h += '<span class="mm-op">C =</span>' + mhtml(E.C, { edit: "C" });
      ent.innerHTML = h; pinta();
    }
    function invertible(nm) {
      if (nm === "A") return !!inv(E.A); if (nm === "B") return !!inv(E.B);
      if (nm === "A+I") return !!inv(T.madd(E.A, I2)); if (nm === "A−I") return !!inv(T.msub(E.A, I2)); return true;
    }
    function pinta() {
      eq.innerHTML = "Resolver: " + forma.eq;
      ol.innerHTML = forma.pasos.map(function (p) { return "<li class='on'>" + p + "</li>"; }).join("");
      var falta = forma.need.filter(function (nm) { return !invertible(nm); });
      cu.querySelector("[data-btn]").style.display = forma.mal ? "" : "none";
      if (falta.length) {
        res.innerHTML = '<div class="mm-msg">La matriz <b>' + falta.join(" y ") + "</b> no tiene inversa (determinante 0): la ecuación no se puede despejar así y no tiene solución única. Cambia los números.</div>";
        lect.innerHTML = ""; pie.innerHTML = ""; return;
      }
      var X = forma.X(E.A, E.B, E.C), Xv = (malOn && forma.mal) ? forma.mal(E.A, E.B, E.C) : X;
      var L = forma.lhs(E.A, E.B, Xv), R = forma.rhs(E.A, E.B, Xv, E.C), bien = T.igual(L, R);
      res.innerHTML = '<span class="mm-op">' + (malOn && forma.mal ? "X = " + forma.malTxt + " =" : "X =") + "</span>" + mhtml(Xv, {}) +
        '<span class="mm-op">Comprobación:</span>' + mhtml(L, { cls: function () { return bien ? "bien" : "mal"; } }) + '<span class="mm-op">' + (bien ? "=" : "≠") + "</span>" + mhtml(R, { cls: function () { return bien ? "bien" : "mal"; } });
      lect.innerHTML = U.lec("Orden", malOn && forma.mal ? "equivocado" : "correcto", malOn && forma.mal ? "red" : "ok") + U.lec("¿Cumple la ecuación?", bien ? "sí" : "no", bien ? "ok" : "red");
      pie.innerHTML = malOn && forma.mal ? "Con el orden cambiado, <b>" + forma.malTxt + "</b> no verifica la ecuación: al multiplicar por la inversa del lado equivocado no se cancela nada." : "Sustituye siempre X en la ecuación original: es la comprobación que pide el examen.";
    }
    U.fichas(cu.querySelector("[data-pre]"), FORMAS.map(function (f) { return { k: f.k, t: f.t }; }), "ax", function (kk) { forma = FORMAS.filter(function (f) { return f.k === kk; })[0]; malOn = false; armar(); });
    enlazar(ent, E, function () { pinta(); });
    U.boton(cu.querySelector("[data-btn]"), "Probar el orden equivocado", function () { malOn = !malOn; this.textContent = malOn ? "Volver al orden correcto" : "Probar el orden equivocado"; pinta(); });
    armar();
  };

  // ============================================================
  // 5. Rango según un parámetro
  // ============================================================
  var RANG = [
    { k: "p1", t: "3×3 simétrica", pl: [["1", "1", "a"], ["1", "a", "1"], ["a", "1", "1"]], f: function (a) { return [[1, 1, a], [1, a, 1], [a, 1, 1]]; } },
    { k: "p2", t: "2×3", pl: [["1", "a", "2"], ["a", "4", "2a"]], f: function (a) { return [[1, a, 2], [a, 4, 2 * a]]; } },
    { k: "p3", t: "3×3 cíclica", pl: [["a", "1", "0"], ["0", "a", "1"], ["1", "0", "a"]], f: function (a) { return [[a, 1, 0], [0, a, 1], [1, 0, a]]; } },
    { k: "p4", t: "3×4", pl: [["1", "1", "1", "a"], ["1", "a", "1", "1"], ["a", "1", "1", "1"]], f: function (a) { return [[1, 1, 1, a], [1, a, 1, 1], [a, 1, 1, 1]]; } }
  ];
  T.RANG = RANG;
  B.w.mm_rango = function (host) {
    var cu = B.caja(host, "Pruébalo", "Rango según un parámetro");
    cu.innerHTML = '<div data-pre></div><div class="ctl" data-a></div><div class="mm-fila" data-mats></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var pre = RANG[0], a2 = 0, mats = cu.querySelector("[data-mats]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    var g = new B.Plot(cu.querySelector(".w-plot"), { xmin: -4.5, xmax: 4.5, ymin: -0.2, ymax: 3.8, w: 600, h: 230, etx: "a", ety: "rango", etiqueta: "Rango de la matriz según el valor del parámetro a" });
    function rg(k2) { return T.escalona(T.de(pre.f(k2 / 2))).rango; }
    function pinta() {
      var a = a2 / 2, Mf = T.de(pre.f(a)), res = T.escalona(Mf), max = 0, crit = [], k;
      for (k = -8; k <= 8; k++) max = Math.max(max, rg(k));
      for (k = -8; k <= 8; k++) if (rg(k) < max) crit.push(k / 2);
      mats.innerHTML = '<span class="mm-op">M =</span>' + T.mt(pre.pl) + '<span class="mm-op">con a = ' + B.fmt(a, 1) + ' →</span>' + mhtml(Mf, {}) + '<span class="mm-op">escalonada →</span>' + mhtml(res.R, { cls: function (i, j) { return ""; } });
      g.limpiar();
      var pts = [];
      for (k = -8; k <= 8; k++) { var r = rg(k); pts.push([k / 2, r]); g.punto(k / 2, r, { r: 3.5, clase: r < max ? "c-red" : "c-pen" }); }
      g.horizontal(max, { clase: "c-faint", dash: "4 4" });
      g.vertical(a, { clase: "c-ok" });
      g.punto(a, res.rango, { r: 7, clase: "c-ok" });
      lect.innerHTML = U.lec("a", B.fmt(a, 1), "pen") + U.lec("Rango de M", String(res.rango), res.rango < max ? "red" : "ok") + U.lec("Rango más alto", String(max)) + U.lec("Valores de a con rango menor", crit.length ? crit.map(function (x) { return B.fmt(x, 1); }).join(", ") : "ninguno");
      pie.innerHTML = res.pasos.length ? "Pasos de Gauss: " + res.pasos.join(" · ") + "." : "La matriz ya está escalonada.";
    }
    var ctl = U.ctl(cu.querySelector("[data-a]"));
    U.slider(ctl, { et: "parámetro a", min: -8, max: 8, step: 1, val: 0, on: function (v) { a2 = v; pinta(); }, fmt: function (v) { return B.fmt(v / 2, 1); } });
    U.fichas(cu.querySelector("[data-pre]"), RANG.map(function (p) { return { k: p.k, t: p.t }; }), "p1", function (kk) { pre = RANG.filter(function (p) { return p.k === kk; })[0]; pinta(); });
    pinta();
  };
})(window);
