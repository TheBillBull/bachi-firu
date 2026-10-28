/* ============================================================
   Bachi para Firu · laboratorio de sistemas lineales (Matemáticas II, tema 3)
   motor B.lab.ms (sobre B.lab.mt: fracciones exactas) + ms_gauss · ms_discusor ·
   ms_planos · ms_cramer · ms_problema
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, H = B.h, T = B.lab.mt, F = T.F, mhtml = T.mhtml;
  var S = B.lab.ms = {};

  function estilo(id, css) {
    try {
      if (document.getElementById(id)) return;
      var s = document.createElement("style"); s.id = id; s.textContent = css; document.head.appendChild(s);
    } catch (e) { /* sin documento (volcado de datos) */ }
  }
  estilo("ms-css",
    ".ms-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto;background:var(--sheet);border:1px solid var(--line);border-radius:10px}" +
    ".ms-svg .cub{stroke:var(--ink-faint);fill:none;stroke-width:1;stroke-dasharray:3 3}" +
    ".ms-svg .eje{stroke:var(--ink-soft);stroke-width:1.2;fill:none}" +
    ".ms-svg text{fill:var(--ink-soft);font:600 13px var(--math)}" +
    ".ms-svg .pl0{fill:var(--pen);stroke:var(--pen)} .ms-svg .pl1{fill:var(--ok);stroke:var(--ok)} .ms-svg .pl2{fill:var(--red);stroke:var(--red)}" +
    ".ms-svg .pl{fill-opacity:.2;stroke-opacity:.9;stroke-width:1.5;stroke-linejoin:round}" +
    ".ms-svg .par{stroke:var(--ink-soft);stroke-width:1.4;stroke-dasharray:5 4;fill:none}" +
    ".ms-svg .com{stroke:var(--ink);stroke-width:4.5;stroke-linecap:round;fill:none}" +
    ".ms-svg .pto{fill:var(--ink);stroke:var(--sheet);stroke-width:2}" +
    ".ms-leyenda{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:13.5px;color:var(--ink-soft);margin:2px 0 4px}" +
    ".ms-leyenda i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px}" +
    ".ms-leyenda .l0{background:var(--pen)} .ms-leyenda .l1{background:var(--ok)} .ms-leyenda .l2{background:var(--red)}" +
    ".ms-eqs{font:600 17px/1.55 var(--math);color:var(--ink);margin:6px 0}" +
    ".ms-paso{border-left:4px solid var(--pen);background:var(--pen-soft);border-radius:4px 10px 10px 4px;padding:8px 14px;margin:8px 0;font-size:15px}" +
    ".ms-paso.sig{opacity:.55} .ms-paso b.n{color:var(--pen)}" +
    ".mm-t td.mal2{background:var(--red-soft);color:var(--red)}");

  // ------------------------------------------------------------
  // Motor: determinante, escalonado, clasificación y solución (fracciones exactas)
  // ------------------------------------------------------------
  var NOM = ["x", "y", "z", "t"], LIB = ["λ", "μ", "ν", "ρ"];
  S.NOM = NOM;
  function absF(f) { return F(Math.abs(f.n), f.d); }
  function termTxt(f, nom) {
    var a = absF(f);
    if (a.n === 1 && a.d === 1) return nom;
    if (a.d === 1) return a.n + nom;
    return a.n + nom + "/" + a.d;
  }
  // combinación lineal c + Σ coef·nombre, escrita con signos limpios
  S.lin = function (c, coefs, nombres) {
    var s = "", first = true;
    if (!T.z(c)) { s = T.txt(c); first = false; }
    coefs.forEach(function (f, k) {
      if (T.z(f)) return;
      var neg = f.n < 0;
      if (first) { s += (neg ? "−" : "") + termTxt(f, nombres[k]); first = false; }
      else s += (neg ? " − " : " + ") + termTxt(f, nombres[k]);
    });
    return first ? "0" : s;
  };
  // ecuación escrita a partir de una fila de la matriz ampliada
  S.eq = function (fila, n) {
    return S.lin(F(0), fila.slice(0, n), NOM) + " = " + T.txt(fila[n]);
  };
  S.det = function (A) {
    var n = A.length, M = T.copia(A), d = F(1);
    for (var c = 0; c < n; c++) {
      var p = -1, i;
      for (i = c; i < n; i++) if (!T.z(M[i][c])) { p = i; break; }
      if (p < 0) return F(0);
      if (p !== c) { var t = M[p]; M[p] = M[c]; M[c] = t; d = T.neg(d); }
      d = T.mul(d, M[c][c]);
      for (i = c + 1; i < n; i++) {
        var f = T.div(M[i][c], M[c][c]);
        M[i] = M[i].map(function (x, j) { return T.sub(x, T.mul(f, M[c][j])); });
      }
    }
    return d;
  };
  // Gauss-Jordan completo sobre las n primeras columnas
  S.rref = function (Aug, n) {
    var M = T.copia(Aug), m = M.length, r = 0, piv = [], i, j;
    for (var c = 0; c < n && r < m; c++) {
      var p = -1;
      for (i = r; i < m; i++) if (!T.z(M[i][c])) { p = i; break; }
      if (p < 0) continue;
      var t = M[p]; M[p] = M[r]; M[r] = t;
      var pv = M[r][c];
      M[r] = M[r].map(function (x) { return T.div(x, pv); });
      for (i = 0; i < m; i++) {
        if (i === r || T.z(M[i][c])) continue;
        var f = M[i][c], R = M[r];
        M[i] = M[i].map(function (x, jj) { return T.sub(x, T.mul(f, R[jj])); });
      }
      piv.push(c); r++;
    }
    var inc = false;
    for (i = r; i < m; i++) if (!T.z(M[i][n])) inc = true;
    return { R: M, piv: piv, rA: r, rAB: r + (inc ? 1 : 0) };
  };
  // clasificación y solución general: { tipo, rA, rAB, libres, sol:[{nom, txt}], punto:[fracciones] }
  S.resuelve = function (Aug, n) {
    var q = S.rref(Aug, n), tipo = q.rA !== q.rAB ? "SI" : (q.rA === n ? "SCD" : "SCI");
    var o = { tipo: tipo, rA: q.rA, rAB: q.rAB, n: n, libres: n - q.rA, sol: [], R: q.R, piv: q.piv };
    if (tipo === "SI") return o;
    var fc = [], j;
    for (j = 0; j < n; j++) if (q.piv.indexOf(j) < 0) fc.push(j);
    var nombresLib = fc.map(function (_, k) { return LIB[k]; });
    for (j = 0; j < n; j++) {
      var k = fc.indexOf(j);
      if (k >= 0) { o.sol.push({ nom: NOM[j], txt: nombresLib[k] }); continue; }
      var row = q.piv.indexOf(j), cf = fc.map(function (f) { return T.neg(q.R[row][f]); });
      o.sol.push({ nom: NOM[j], txt: S.lin(q.R[row][n], cf, nombresLib), c: q.R[row][n] });
    }
    if (tipo === "SCD") o.punto = o.sol.map(function (s) { return s.c; });
    return o;
  };
  S.solTxt = function (r) {
    if (r.tipo === "SI") return "no tiene solución";
    return r.sol.map(function (s) { return s.nom + " = " + s.txt; }).join(", ") + (r.tipo === "SCI" ? " (" + LIB.slice(0, r.libres).join(", ") + " ∈ ℝ)" : "");
  };
  S.TIPO = { SCD: "SCD · solución única", SCI: "SCI · infinitas soluciones", SI: "SI · sin solución" };
  var CLS = { SCD: "ok", SCI: "pen", SI: "red" };

  // Gauss hacia delante con fotos: [{ M, txt, piv, mod, fin }]
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function entera(M) { return M.every(function (r) { return r.every(function (x) { return x.d === 1; }); }); }
  function coefTxt(k) { return k === 1 ? "" : k + "·"; }
  S.gauss = function (Aug, n) {
    var M = T.copia(Aug), m = M.length, pasos = [], r = 0, i, sb = T.sb;
    function foto(txt, extra) { var o = { M: T.copia(M), txt: txt }; if (extra) for (var k in extra) o[k] = extra[k]; pasos.push(o); }
    foto("Matriz ampliada (A | B): una fila por ecuación, la barra separa los coeficientes de los términos independientes.");
    for (var c = 0; c < n && r < m; c++) {
      var p = -1;
      for (i = r; i < m; i++) if (!T.z(M[i][c])) { p = i; break; }
      if (p < 0) continue;
      if (p !== r) {
        var t = M[p]; M[p] = M[r]; M[r] = t;
        foto("F" + sb(r + 1) + " ↔ F" + sb(p + 1) + ": intercambio filas para tener un pivote distinto de 0 en la columna " + (c + 1) + ".", { mod: [r, p], piv: [r, c] });
      }
      for (i = r + 1; i < m; i++) {
        if (T.z(M[i][c])) continue;
        var a = M[r][c], b = M[i][c], txt;
        if (a.d === 1 && b.d === 1 && entera(M)) {
          var g = gcd(a.n, b.n), s = a.n < 0 ? -1 : 1, pa = Math.abs(a.n) / g, q = s * b.n / g;
          M[i] = M[i].map(function (x, j) { return T.sub(T.mul(F(pa), x), T.mul(F(q), M[r][j])); });
          txt = "F" + sb(i + 1) + " ← " + coefTxt(pa) + "F" + sb(i + 1) + (q > 0 ? " − " : " + ") + coefTxt(Math.abs(q)) + "F" + sb(r + 1);
          var gf = 0; M[i].forEach(function (x) { gf = gcd(gf, x.n); });
          if (gf > 1) { M[i] = M[i].map(function (x) { return F(x.n / gf); }); txt += " (y divido la fila entre " + gf + ")"; }
          foto(txt + ": hago 0 el elemento de la columna " + (c + 1) + ".", { mod: [i], piv: [r, c] });
        } else {
          var f = T.div(b, a), row = M[r];
          M[i] = M[i].map(function (x, j) { return T.sub(x, T.mul(f, row[j])); });
          var ab = absF(f), cf = (ab.n === 1 && ab.d === 1) ? "" : (ab.d === 1 ? ab.n : "(" + T.txt(ab) + ")") + "·";
          foto("F" + sb(i + 1) + " ← F" + sb(i + 1) + (f.n > 0 ? " − " : " + ") + cf + "F" + sb(r + 1) + ": hago 0 el elemento de la columna " + (c + 1) + ".", { mod: [i], piv: [r, c] });
        }
      }
      r++;
    }
    var res = S.resuelve(Aug, n), malas = [];
    for (i = 0; i < m; i++) {
      var ceros = true; for (var j = 0; j < n; j++) if (!T.z(M[i][j])) ceros = false;
      if (ceros && !T.z(M[i][n])) malas.push(i);
    }
    var eqs = [];
    for (i = 0; i < m; i++) { var nz = M[i].some(function (x) { return !T.z(x); }); if (nz) eqs.push(S.eq(M[i], n).replace(/^0 = /, "0 = ")); }
    foto("Matriz escalonada. Sistema equivalente: " + eqs.join(" ; ") + (malas.length ? ". Una fila dice 0 = " + T.txt(M[malas[0]][n]) + ", que es imposible." : "."), { fin: "esc", malas: malas, res: res });
    var fin = "rg(A) = " + res.rA + ", rg(A|B) = " + res.rAB + ", incógnitas n = " + n + ". ";
    if (res.tipo === "SI") fin += "Como rg(A) ≠ rg(A|B), el sistema es <b>incompatible</b>: no hay solución.";
    else if (res.tipo === "SCD") fin += "Como rg(A) = rg(A|B) = n, es <b>compatible determinado</b>. Sustituyendo hacia atrás: " + S.solTxt(res) + ".";
    else fin += "Como rg(A) = rg(A|B) = " + res.rA + " &lt; " + n + ", es <b>compatible indeterminado</b> con " + res.libres + " parámetro" + (res.libres > 1 ? "s" : "") + ". Pasando las incógnitas libres al otro lado y sustituyendo hacia atrás: " + S.solTxt(res) + ".";
    foto(fin, { fin: "res", malas: malas, res: res });
    return pasos;
  };

  // Enlaza <input class="mm-in"> con una matriz de estado
  function enlazar(host, M, alCambiar) {
    host.addEventListener("input", function (e) {
      var inp = e.target; if (!inp.classList || !inp.classList.contains("mm-in")) return;
      var v = T.parse(inp.value);
      inp.classList.toggle("malo", !v);
      if (!v) return;
      M[+inp.getAttribute("data-i")][+inp.getAttribute("data-j")] = v;
      alCambiar();
    });
  }
  function ecuacionesHtml(Aug, n) {
    return '<div class="ms-eqs">' + Aug.map(function (r) { return S.eq(r, n); }).join("<br>") + "</div>";
  }

  // ============================================================
  // 1. Gauss paso a paso con clasificación
  // ============================================================
  var PRES_G = [
    { k: "a", t: "SCD 3×3", A: [[2, 1, -1, -1], [1, -2, 1, 5], [3, 1, 2, 6]], n: 3 },
    { k: "b", t: "SCI", A: [[1, -1, 2, 3], [2, 1, -1, 0], [3, 0, 1, 3]], n: 3 },
    { k: "c", t: "SI", A: [[1, 1, -1, 1], [2, -1, 1, 2], [3, 0, 0, 5]], n: 3 },
    { k: "d", t: "4 ecuaciones", A: [[1, 1, 1, 4], [1, -1, 1, 2], [0, 1, -1, -1], [2, 0, 2, 6]], n: 3 },
    { k: "e", t: "2 ecuac., 3 incóg.", A: [[1, 2, -1, 3], [2, -1, 3, 1]], n: 3 },
    { k: "f", t: "Homogéneo", A: [[1, 1, 1, 0], [2, -1, 3, 0], [4, 1, 5, 0]], n: 3 }
  ];
  S.PRES_G = PRES_G;
  B.w.ms_gauss = function (host) {
    var cu = B.caja(host, "Pruébalo", "Método de Gauss y teorema de Rouché-Frobenius, paso a paso");
    cu.innerHTML = '<div data-pre></div><div class="mm-fila" data-ent></div><div class="lectura anch"></div><p class="w-pie"></p><div class="ctl" data-btn></div>';
    var pre = PRES_G[0], E = { A: T.de(pre.A) }, n = pre.n, pasos, s = 0;
    var ent = cu.querySelector("[data-ent]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function recalcula() { pasos = S.gauss(E.A, n); s = Math.min(s, pasos.length - 1); }
    function pinta() {
      var P = pasos[s], ult = s === pasos.length - 1, esc = P.fin === "esc" || P.fin === "res";
      ent.innerHTML = mhtml(P.M, { sep: n, cls: function (i, j) {
        var c = "";
        if (P.piv && i === P.piv[0] && j === P.piv[1]) c += " piv";
        if (P.mod && P.mod.indexOf(i) >= 0) c += " mod";
        if (esc && P.malas && P.malas.indexOf(i) >= 0) c += " mal2";
        return c;
      }, edit: s === 0 ? "A" : null, celda: s === 0 ? null : undefined });
      var R = pasos[pasos.length - 1].res;
      lect.innerHTML = U.lec("Paso", s + " de " + (pasos.length - 1)) +
        (ult ? U.lec("rg(A)", R.rA) + U.lec("rg(A|B)", R.rAB) + U.lec("Incógnitas", n) + U.lec("Tipo", S.TIPO[R.tipo], CLS[R.tipo]) : U.lec("Resultado", "en curso…"));
      pie.innerHTML = (s ? "<b>" + s + ".</b> " : "") + P.txt;
      var b = cu.querySelectorAll("[data-btn] button"); b[0].disabled = s === 0; b[1].disabled = ult; b[2].disabled = ult;
    }
    function armar() { recalcula(); pinta(); }
    U.fichas(cu.querySelector("[data-pre]"), PRES_G.map(function (p) { return { k: p.k, t: p.t }; }), "a", function (kk) {
      pre = PRES_G.filter(function (p) { return p.k === kk; })[0]; E.A = T.de(pre.A); n = pre.n; s = 0; armar();
    });
    ent.addEventListener("input", function (e) {
      var inp = e.target; if (!inp.classList || !inp.classList.contains("mm-in")) return;
      var v = T.parse(inp.value); inp.classList.toggle("malo", !v); if (!v) return;
      E.A[+inp.getAttribute("data-i")][+inp.getAttribute("data-j")] = v;
      pasos = S.gauss(E.A, n);
      lect.innerHTML = ""; var R = pasos[pasos.length - 1].res;
      pie.innerHTML = "Matriz modificada. Pulsa «Siguiente» para ir paso a paso.";
      lect.innerHTML = U.lec("Paso", "0 de " + (pasos.length - 1)) + U.lec("Resultado", "en curso…");
      var b = cu.querySelectorAll("[data-btn] button"); b[0].disabled = true; b[1].disabled = false; b[2].disabled = false;
    });
    var bt = cu.querySelector("[data-btn]");
    U.boton(bt, "◂ Atrás", function () { if (s > 0) { s--; pinta(); } });
    U.boton(bt, "Siguiente ▸", function () { if (s < pasos.length - 1) { s++; pinta(); } });
    U.boton(bt, "Todo ⏭", function () { s = pasos.length - 1; pinta(); });
    U.boton(bt, "↺ Reiniciar", function () { s = 0; pinta(); });
    armar();
  };

  // ============================================================
  // 2. Discusor: sistema con parámetro m
  // ============================================================
  function q16(x) { return F(Math.round(x * 16), 16); }
  var PRES_D = [
    { k: "p1", t: "Clásico 3×3", n: 3, crit: [-2, 1], pl: [["m", "1", "1", "1"], ["1", "m", "1", "m"], ["1", "1", "m", "m²"]], f: function (m) { return [[m, 1, 1, 1], [1, m, 1, m], [1, 1, m, m * m]]; }, det: "(m − 1)²(m + 2)" },
    { k: "p2", t: "Dos valores", n: 3, crit: [-3, 2], pl: [["1", "1", "−1", "1"], ["2", "3", "m", "3"], ["1", "m", "3", "2"]], f: function (m) { return [[1, 1, -1, 1], [2, 3, m, 3], [1, m, 3, 2]]; }, det: "−(m − 2)(m + 3)" },
    { k: "p3", t: "m en B y en A", n: 3, crit: [1, 2], pl: [["1", "1", "1", "3"], ["m", "2", "1", "4"], ["1", "1", "m", "m+2"]], f: function (m) { return [[1, 1, 1, 3], [m, 2, 1, 4], [1, 1, m, m + 2]]; }, det: "−(m − 1)(m − 2)" },
    { k: "p4", t: "Solo en B", n: 3, crit: [3], pl: [["1", "1", "1", "1"], ["1", "2", "3", "2"], ["1", "3", "5", "m"]], f: function (m) { return [[1, 1, 1, 1], [1, 2, 3, 2], [1, 3, 5, m]]; }, det: "0 (siempre)" },
    { k: "p5", t: "2×2", n: 2, crit: [-2, 2], pl: [["1", "m", "1"], ["m", "4", "2"]], f: function (m) { return [[1, m, 1], [m, 4, 2]]; }, det: "4 − m² = (2 − m)(2 + m)" },
    { k: "p6", t: "Homogéneo", n: 3, crit: [1, 2], pl: [["1", "1", "1", "0"], ["2", "m", "1", "0"], ["1", "1", "m", "0"]], f: function (m) { return [[1, 1, 1, 0], [2, m, 1, 0], [1, 1, m, 0]]; }, det: "(m − 1)(m − 2)" }
  ];
  S.PRES_D = PRES_D;
  S.tipoEn = function (pre, m) { return S.resuelve(T.de(pre.f(m).map(function (r) { return r.map(function (x) { return q16(x); }); })), pre.n); };
  B.w.ms_discusor = function (host) {
    var cu = B.caja(host, "Pruébalo", "Discute el sistema moviendo el parámetro m");
    cu.innerHTML = '<div data-pre></div><div class="ctl" data-m></div><div class="mm-fila" data-mats></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var pre = PRES_D[0], k4 = 0, mats = cu.querySelector("[data-mats]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    var g = new B.Plot(cu.querySelector(".w-plot"), { xmin: -5.6, xmax: 4.4, ymin: 0.3, ymax: 3.7, w: 600, h: 200, sinY: true, etx: "m", ety: null, etiqueta: "Tipo de sistema (SCD, SCI o SI) según el valor del parámetro m" });
    function pinta() {
      var m = k4 / 4, fr = pre.f(m).map(function (r) { return r.map(q16); }), r = S.resuelve(fr, pre.n), kk;
      mats.innerHTML = '<span class="mm-op">(A|B) =</span>' + mhtml(pre.pl, { sep: pre.n, celda: function (i, j, x) { return x.replace(/-/g, "−"); } }) + '<span class="mm-op">con m = ' + B.fmt(m, 2) + ' →</span>' + mhtml(fr, { sep: pre.n });
      g.limpiar();
      [3, 2, 1].forEach(function (yy) { g.horizontal(yy, { clase: "c-faint", dash: "2 5" }); });
      g.texto(-5.5, 3, "SCD", { dy: 4 }); g.texto(-5.5, 2, "SCI", { dy: 4 }); g.texto(-5.5, 1, "SI", { dy: 4 });
      for (kk = -16; kk <= 16; kk++) {
        var t = S.resuelve(pre.f(kk / 4).map(function (rr) { return rr.map(q16); }), pre.n).tipo;
        g.punto(kk / 4, t === "SCD" ? 3 : t === "SCI" ? 2 : 1, { r: 3.5, clase: CLS_P[t] });
      }
      g.vertical(m, { clase: "c-faint" });
      g.punto(m, r.tipo === "SCD" ? 3 : r.tipo === "SCI" ? 2 : 1, { r: 8, clase: CLS_P[r.tipo], capa: "top" });
      lect.innerHTML = U.lec("m", B.fmt(m, 2), "pen") + U.lec("rg(A)", r.rA) + U.lec("rg(A|B)", r.rAB) + U.lec("Tipo", S.TIPO[r.tipo], CLS[r.tipo]) +
        U.lec("Valores críticos", pre.crit.map(function (c) { return B.fmt(c, 0); }).join(" y ")) + U.lec("det(A)", pre.det);
      pie.innerHTML = r.tipo === "SI" ? "Con este m los rangos no coinciden: no hay solución." : "Solución: " + S.solTxt(r) + ".";
    }
    var CLS_P = { SCD: "c-ok", SCI: "c-pen", SI: "c-red" };
    var ctl = U.ctl(cu.querySelector("[data-m]")), sl = U.slider(ctl, { et: "parámetro m", min: -16, max: 16, step: 1, val: 0, on: function (v) { k4 = v; pinta(); }, fmt: function (v) { return B.fmt(v / 4, 2); } });
    var critBox = document.createElement("div"); critBox.className = "chips";
    cu.querySelector("[data-m]").appendChild(critBox);
    function critBotones() {
      critBox.innerHTML = "";
      pre.crit.forEach(function (c) { U.boton(critBox, "m = " + B.fmt(c, 0), function () { k4 = c * 4; sl.set(k4); pinta(); }); });
      U.boton(critBox, "m = 0,5", function () { k4 = 2; sl.set(k4); pinta(); });
    }
    U.fichas(cu.querySelector("[data-pre]"), PRES_D.map(function (p) { return { k: p.k, t: p.t }; }), "p1", function (kk) {
      pre = PRES_D.filter(function (p) { return p.k === kk; })[0]; critBotones(); pinta();
    });
    critBotones(); pinta();
  };

  // ============================================================
  // 3. Tres planos en el espacio
  // ============================================================
  var PRES_P = [
    { k: "scd", t: "Un punto (SCD)", A: [[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]] },
    { k: "haz", t: "Una recta (SCI)", A: [[1, 1, 1, 3], [1, -1, 0, 1], [2, 0, 1, 4]] },
    { k: "pri", t: "Prisma (SI)", A: [[1, 1, 1, 3], [1, -1, 0, 1], [2, 0, 1, 5]] },
    { k: "par", t: "2 paralelos + 1 (SI)", A: [[1, 1, 1, 3], [1, 1, 1, 6], [1, -1, 0, 0]] },
    { k: "c2s", t: "2 coincidentes + 1 secante (SCI)", A: [[1, 1, 1, 3], [2, 2, 2, 6], [1, -1, 0, 0]] },
    { k: "c3", t: "Coincidentes (SCI)", A: [[1, 1, 1, 3], [2, 2, 2, 6], [-1, -1, -1, -3]] },
    { k: "c2p", t: "2 coincid. + 1 paralelo (SI)", A: [[1, 1, 1, 3], [2, 2, 2, 6], [1, 1, 1, 5]] },
    { k: "p3", t: "3 paralelos (SI)", A: [[1, 1, 1, 1], [2, 2, 2, 4], [1, 1, 1, -2]] }
  ];
  S.PRES_P = PRES_P;
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function nz3(v) { return Math.abs(v[0]) > 1e-9 || Math.abs(v[1]) > 1e-9 || Math.abs(v[2]) > 1e-9; }
  // polígono de la intersección de un plano con el cubo [-H,H]³
  function poligonoPlano(nv, d, Hc) {
    var pts = [], V = [], i, j, k;
    for (i = 0; i < 8; i++) V.push([(i & 1 ? 1 : -1) * Hc, (i & 2 ? 1 : -1) * Hc, (i & 4 ? 1 : -1) * Hc]);
    for (i = 0; i < 8; i++) for (j = i + 1; j < 8; j++) {
      var df = (V[i][0] !== V[j][0]) + (V[i][1] !== V[j][1]) + (V[i][2] !== V[j][2]);
      if (df !== 1) continue;
      var fa = dot(nv, V[i]) - d, fb = dot(nv, V[j]) - d;
      if (fa * fb > 0) continue;
      if (Math.abs(fa - fb) < 1e-12) continue;
      var t = fa / (fa - fb), P = [V[i][0] + t * (V[j][0] - V[i][0]), V[i][1] + t * (V[j][1] - V[i][1]), V[i][2] + t * (V[j][2] - V[i][2])];
      if (!pts.some(function (Q) { return Math.abs(Q[0] - P[0]) + Math.abs(Q[1] - P[1]) + Math.abs(Q[2] - P[2]) < 1e-7; })) pts.push(P);
    }
    if (pts.length < 3) return [];
    var c = [0, 0, 0]; pts.forEach(function (P) { c[0] += P[0] / pts.length; c[1] += P[1] / pts.length; c[2] += P[2] / pts.length; });
    var u = cross(nv, Math.abs(nv[0]) < 0.9 * Math.hypot(nv[0], nv[1], nv[2]) ? [1, 0, 0] : [0, 1, 0]), l = Math.hypot(u[0], u[1], u[2]);
    u = u.map(function (x) { return x / l; });
    var v = cross(nv, u); l = Math.hypot(v[0], v[1], v[2]); v = v.map(function (x) { return x / l; });
    pts.sort(function (P, Q) {
      return Math.atan2(dot([P[0] - c[0], P[1] - c[1], P[2] - c[2]], v), dot([P[0] - c[0], P[1] - c[1], P[2] - c[2]], u)) -
        Math.atan2(dot([Q[0] - c[0], Q[1] - c[1], Q[2] - c[2]], v), dot([Q[0] - c[0], Q[1] - c[1], Q[2] - c[2]], u));
    });
    return pts;
  }
  // recta de intersección de dos planos recortada al cubo: [P, Q] o null
  function rectaPlanos(n1, d1, n2, d2, Hc) {
    var dv = cross(n1, n2); if (!nz3(dv)) return null;
    var l2 = dot(dv, dv), a = cross(n2, dv), b = cross(dv, n1), P0 = [0, 1, 2].map(function (i) { return (d1 * a[i] + d2 * b[i]) / l2; });
    var t0 = -1e9, t1 = 1e9;
    for (var i = 0; i < 3; i++) {
      if (Math.abs(dv[i]) < 1e-12) { if (Math.abs(P0[i]) > Hc) return null; continue; }
      var ta = (-Hc - P0[i]) / dv[i], tb = (Hc - P0[i]) / dv[i];
      t0 = Math.max(t0, Math.min(ta, tb)); t1 = Math.min(t1, Math.max(ta, tb));
    }
    if (t0 >= t1) return null;
    return [[P0[0] + t0 * dv[0], P0[1] + t0 * dv[1], P0[2] + t0 * dv[2]], [P0[0] + t1 * dv[0], P0[1] + t1 * dv[1], P0[2] + t1 * dv[2]]];
  }
  // posición relativa de tres planos a partir de los números
  S.posicion = function (Aug) {
    var r = S.resuelve(Aug, 3), par = [], coin = 0, i, j;
    function sub(a, b) { return S.rref([Aug[a], Aug[b]], 3); }
    for (i = 0; i < 3; i++) for (j = i + 1; j < 3; j++) {
      var q = sub(i, j);
      if (q.rA === 1) par.push([i, j, q.rAB === 1]);
    }
    coin = par.filter(function (p) { return p[2]; }).length;
    var txt;
    if (r.tipo === "SCD") txt = "Los tres planos se cortan en un único punto.";
    else if (r.tipo === "SCI" && r.rA === 2) txt = par.length ? "Dos planos coinciden y el tercero los corta: la solución es una recta." : "Los tres planos pasan por una misma recta (haz de planos).";
    else if (r.tipo === "SCI") txt = "Los tres planos coinciden: la solución es un plano entero (2 parámetros).";
    else if (r.rA === 1) txt = coin ? "Dos planos coinciden y el tercero es paralelo a ellos, sin tocarlos." : "Los tres planos son paralelos y distintos.";
    else txt = par.length ? "Dos planos son paralelos (distintos) y el tercero los corta a ambos." : "Los planos se cortan dos a dos en tres rectas paralelas (forman un prisma): no hay punto común.";
    return { r: r, txt: txt, par: par };
  };
  B.w.ms_planos = function (host) {
    var cu = B.caja(host, "Pruébalo", "Posición relativa de tres planos");
    cu.innerHTML = '<div data-pre></div><div class="mm-fila" data-ent></div><div class="ctl" data-rot></div><div class="ms-leyenda"><span><i class="l0"></i>plano 1</span><span><i class="l1"></i>plano 2</span><span><i class="l2"></i>plano 3</span></div><div class="ms-sv"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var pre = PRES_P[0], E = { A: T.de(pre.A) }, yaw = 35, pit = 30, Hc = 5, W = 460, Hh = 360, sc = 21;
    var ent = cu.querySelector("[data-ent]"), sv = cu.querySelector(".ms-sv"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function proy(P) {
      var a = yaw * Math.PI / 180, e = pit * Math.PI / 180, x1 = P[0] * Math.cos(a) - P[1] * Math.sin(a), y1 = P[0] * Math.sin(a) + P[1] * Math.cos(a);
      return [W / 2 + sc * x1, Hh / 2 - sc * (P[2] * Math.cos(e) - y1 * Math.sin(e))];
    }
    function pt(P) { var q = proy(P); return q[0].toFixed(1) + "," + q[1].toFixed(1); }
    function pinta() {
      var Af = E.A.map(function (r) { return r.map(T.val); }), pos = S.posicion(E.A), r = pos.r, h = "", i, j;
      // cubo
      var V = []; for (i = 0; i < 8; i++) V.push([(i & 1 ? 1 : -1) * Hc, (i & 2 ? 1 : -1) * Hc, (i & 4 ? 1 : -1) * Hc]);
      for (i = 0; i < 8; i++) for (j = i + 1; j < 8; j++) if ((V[i][0] !== V[j][0]) + (V[i][1] !== V[j][1]) + (V[i][2] !== V[j][2]) === 1) h += '<polyline class="cub" points="' + pt(V[i]) + " " + pt(V[j]) + '"/>';
      // ejes
      [[[1, 0, 0], "x"], [[0, 1, 0], "y"], [[0, 0, 1], "z"]].forEach(function (e) {
        var Q = e[0].map(function (c) { return c * (Hc + 0.6); }), p0 = proy([0, 0, 0]), p1 = proy(Q);
        h += '<line class="eje" x1="' + p0[0].toFixed(1) + '" y1="' + p0[1].toFixed(1) + '" x2="' + p1[0].toFixed(1) + '" y2="' + p1[1].toFixed(1) + '"/><text x="' + (p1[0] + 4).toFixed(1) + '" y="' + (p1[1] + 4).toFixed(1) + '">' + e[1] + "</text>";
      });
      // planos
      var coinc = [];
      Af.forEach(function (row, k) {
        var poly = poligonoPlano(row.slice(0, 3), row[3], Hc);
        if (poly.length) h += '<polygon class="pl pl' + k + '" points="' + poly.map(pt).join(" ") + '"/>';
      });
      // rectas de intersección dos a dos (discontinuas) y elemento común
      var comun = null;
      for (i = 0; i < 3; i++) for (j = i + 1; j < 3; j++) {
        var sg = rectaPlanos(Af[i].slice(0, 3), Af[i][3], Af[j].slice(0, 3), Af[j][3], Hc);
        if (!sg) continue;
        if (r.tipo === "SCI" && r.rA === 2 && !comun) comun = sg;
        h += '<polyline class="par" points="' + pt(sg[0]) + " " + pt(sg[1]) + '"/>';
      }
      if (comun) h += '<polyline class="com" points="' + pt(comun[0]) + " " + pt(comun[1]) + '"/>';
      if (r.tipo === "SCD") {
        var P = r.punto.map(T.val);
        if (Math.max(Math.abs(P[0]), Math.abs(P[1]), Math.abs(P[2])) <= Hc) h += '<circle class="pto" cx="' + proy(P)[0].toFixed(1) + '" cy="' + proy(P)[1].toFixed(1) + '" r="6.5"/>';
      }
      sv.innerHTML = '<svg class="ms-svg" viewBox="0 0 ' + W + " " + Hh + '" role="img" aria-label="Los tres planos dentro de un cubo, vistos en perspectiva">' + h + "</svg>";
      lect.innerHTML = U.lec("rg(A)", r.rA) + U.lec("rg(A|B)", r.rAB) + U.lec("Tipo", S.TIPO[r.tipo], CLS[r.tipo]) + U.lec("Solución", r.tipo === "SI" ? "ninguna" : r.tipo === "SCD" ? "(" + r.punto.map(T.txt).join(", ") + ")" : r.rA === 2 ? "una recta" : "un plano");
      pie.innerHTML = pos.txt;
    }
    function armar() { ent.innerHTML = mhtml(E.A, { sep: 3, edit: "A" }); pinta(); }
    U.fichas(cu.querySelector("[data-pre]"), PRES_P.map(function (p) { return { k: p.k, t: p.t }; }), "scd", function (kk) {
      pre = PRES_P.filter(function (p) { return p.k === kk; })[0]; E.A = T.de(pre.A); armar();
    });
    enlazar(ent, E.A, pinta);
    var ctl = U.ctl(cu.querySelector("[data-rot]"));
    U.slider(ctl, { et: "giro", min: -180, max: 180, step: 5, val: yaw, on: function (v) { yaw = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "altura", min: 0, max: 85, step: 5, val: pit, on: function (v) { pit = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    armar();
  };

  // ============================================================
  // 4. Regla de Cramer
  // ============================================================
  var PRES_C = [
    { k: "a", t: "2×2", A: [[2, 3, 12], [1, -1, 1]], n: 2 },
    { k: "b", t: "3×3", A: [[2, 1, -1, -1], [1, -2, 1, 5], [3, 1, 2, 6]], n: 3 },
    { k: "c", t: "3×3 con fracciones", A: [[1, 2, 1, 5], [2, -1, 3, 1], [1, 1, 4, 6]], n: 3 },
    { k: "d", t: "det(A) = 0", A: [[1, -1, 2, 3], [2, 1, -1, 0], [3, 0, 1, 3]], n: 3 }
  ];
  S.PRES_C = PRES_C;
  B.w.ms_cramer = function (host) {
    var cu = B.caja(host, "Pruébalo", "Regla de Cramer: determinantes y columna sustituida");
    cu.innerHTML = '<div data-pre></div><div class="mm-fila" data-ent></div><div data-var></div><div class="mm-fila" data-ai></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var pre = PRES_C[1], E = { A: T.de(pre.A) }, n = pre.n, iv = 0;
    var ent = cu.querySelector("[data-ent]"), ai = cu.querySelector("[data-ai]"), lect = cu.querySelector(".lectura"), pie = cu.querySelector(".w-pie");
    function coefs() { return E.A.map(function (r) { return r.slice(0, n); }); }
    function pinta() {
      var A = coefs(), d = S.det(A), h = "";
      if (iv >= n) iv = 0;
      var vars = cu.querySelector("[data-var]");
      U.fichas(vars, NOM.slice(0, n).map(function (v, k) { return { k: String(k), t: "incógnita " + v }; }), String(iv), function (kk) { iv = +kk; pinta(); });
      if (T.z(d)) {
        ai.innerHTML = '<div class="mm-msg">det(A) = 0: la regla de Cramer <b>no se puede aplicar</b> (habría que dividir entre 0). Hay que estudiar los rangos: el sistema es SCI o SI.</div>';
        lect.innerHTML = U.lec("det(A)", "0", "red") + U.lec("Tipo", S.TIPO[S.resuelve(E.A, n).tipo], CLS[S.resuelve(E.A, n).tipo]);
        pie.innerHTML = "Con det(A) = 0 se calculan rg(A) y rg(A|B) por Gauss o con menores y se aplica Rouché-Frobenius."; return;
      }
      var Ai = A.map(function (r, i) { var c = r.slice(); c[iv] = E.A[i][n]; return c; });
      var di = S.det(Ai);
      ai.innerHTML = '<span class="mm-op">A<sub>' + NOM[iv] + '</sub> =</span>' + mhtml(Ai, { cls: function (i, j) { return j === iv ? "col" : ""; } }) +
        '<span class="mm-op">det(A<sub>' + NOM[iv] + "</sub>) = " + T.txt(di) + "</span>";
      var xs = [], todos = true;
      for (var k = 0; k < n; k++) {
        var Ak = A.map(function (r, i) { var c = r.slice(); c[k] = E.A[i][n]; return c; });
        xs.push(T.div(S.det(Ak), d));
      }
      var ok = E.A.every(function (row, i) { var s = F(0); for (var j = 0; j < n; j++) s = T.add(s, T.mul(row[j], xs[j])); return T.eq(s, row[n]); });
      lect.innerHTML = U.lec("det(A)", T.txt(d), "pen") + U.lec(NOM[iv] + " = det(A" + NOM[iv] + ")/det(A)", T.txt(di) + " / " + T.txt(d) + " = " + T.txt(xs[iv]), "ok") + U.lec("Solución", "(" + xs.map(T.txt).join(", ") + ")") + U.lec("A·X = B", ok ? "se cumple ✓" : "no cuadra", ok ? "ok" : "red");
      pie.innerHTML = "En A<sub>" + NOM[iv] + "</sub> la columna " + (iv + 1) + " (la de " + NOM[iv] + ") se sustituye por la de términos independientes B; las demás no se tocan.";
    }
    function armar() { ent.innerHTML = mhtml(E.A, { sep: n, edit: "A" }); pinta(); }
    U.fichas(cu.querySelector("[data-pre]"), PRES_C.map(function (p) { return { k: p.k, t: p.t }; }), "b", function (kk) {
      pre = PRES_C.filter(function (p) { return p.k === kk; })[0]; E.A = T.de(pre.A); n = pre.n; iv = 0; armar();
    });
    enlazar(ent, E.A, pinta);
    armar();
  };

  // ============================================================
  // 5. De la frase a la matriz: problemas con enunciado
  // ============================================================
  var PROB = [
    { k: "e", t: "Edades",
      enun: "Un padre tiene hoy el triple de la edad de su hijo. Dentro de 10 años solo tendrá el doble. ¿Qué edades tienen?",
      inc: ["x = edad actual del padre", "y = edad actual del hijo"],
      ecs: [["«el triple de la edad de su hijo»", "x = 3y  →  x − 3y = 0"], ["«dentro de 10 años … el doble»", "x + 10 = 2(y + 10)  →  x − 2y = 10"]],
      A: [[1, -3, 0], [1, -2, 10]], n: 2, unid: ["años", "años"] },
    { k: "c", t: "Entradas de cine",
      enun: "En una sesión se venden 120 entradas y se recaudan 780 €. La entrada de adulto cuesta 8 €, la infantil 5 € y la de jubilado 4 €. Se vende el doble de entradas infantiles que de jubilados. ¿Cuántas de cada tipo?",
      inc: ["x = entradas de adulto", "y = entradas infantiles", "z = entradas de jubilado"],
      ecs: [["«se venden 120 entradas»", "x + y + z = 120"], ["«se recaudan 780 €»", "8x + 5y + 4z = 780"], ["«el doble de infantiles que de jubilados»", "y = 2z  →  y − 2z = 0"]],
      A: [[1, 1, 1, 120], [8, 5, 4, 780], [0, 1, -2, 0]], n: 3, unid: ["entradas", "entradas", "entradas"] },
    { k: "m", t: "Mezcla de cafés",
      enun: "Una tienda mezcla tres cafés, A de 6 €/kg, B de 8 €/kg y C de 10 €/kg, para obtener 100 kg de mezcla que sale a 7,6 €/kg. La cantidad de B es el doble que la de C. ¿Cuántos kg de cada café?",
      inc: ["x = kg de A", "y = kg de B", "z = kg de C"],
      ecs: [["«100 kg de mezcla»", "x + y + z = 100"], ["«a 7,6 €/kg» (coste total 760 €)", "6x + 8y + 10z = 760"], ["«B es el doble que C»", "y = 2z  →  y − 2z = 0"]],
      A: [[1, 1, 1, 100], [6, 8, 10, 760], [0, 1, -2, 0]], n: 3, unid: ["kg", "kg", "kg"] },
    { k: "p", t: "Precios",
      enun: "Por 2 bocadillos, 1 refresco y 1 postre se pagan 8,50 €; por 1 bocadillo, 2 refrescos y 1 postre, 7,50 €; y por 1 bocadillo, 1 refresco y 3 postres, 10 €. ¿Cuánto cuesta cada cosa?",
      inc: ["x = precio del bocadillo (€)", "y = precio del refresco (€)", "z = precio del postre (€)"],
      ecs: [["primera compra", "2x + y + z = 8,5"], ["segunda compra", "x + 2y + z = 7,5"], ["tercera compra", "x + y + 3z = 10"]],
      A: [[2, 1, 1, 0], [1, 2, 1, 0], [1, 1, 3, 10]], n: 3, unid: ["€", "€", "€"] },
    { k: "i", t: "Sin datos suficientes",
      enun: "Una persona reparte 6.000 € entre tres fondos: A (rinde un 2 %), B (un 4 %) y C (un 6 %). Obtiene 240 € de intereses en un año. ¿Cuánto puso en cada fondo?",
      inc: ["x = € en A", "y = € en B", "z = € en C"],
      ecs: [["«reparte 6.000 €»", "x + y + z = 6000"], ["«240 € de intereses»", "0,02x + 0,04y + 0,06z = 240  →  x + 2y + 3z = 12000"]],
      A: [[1, 1, 1, 6000], [1, 2, 3, 12000]], n: 3, unid: ["€", "€", "€"],
      nota: "Hay 3 incógnitas y solo 2 ecuaciones independientes: el sistema es SCI. Si el enunciado añade «la cantidad en C es el doble que en A», se añade la ecuación z = 2x y se obtiene una solución única." }
  ];
  PROB[3].A = [[2, 1, 1, F(17, 2)], [1, 2, 1, F(15, 2)], [1, 1, 3, 10]];
  S.PROB = PROB;
  B.w.ms_problema = function (host) {
    var cu = B.caja(host, "Pruébalo", "De la frase al sistema: planteamiento paso a paso");
    cu.innerHTML = '<div data-pre></div><p class="ms-enun"></p><div data-pasos></div><div class="ctl" data-btn></div>';
    var pb = PROB[0], s = 0, pas = cu.querySelector("[data-pasos]"), en = cu.querySelector(".ms-enun");
    function pinta() {
      var A = T.de(pb.A), r = S.resuelve(A, pb.n), h = "";
      en.innerHTML = "<b>Enunciado.</b> " + pb.enun;
      var bloques = [
        "<b class='n'>1. Incógnitas.</b> " + pb.inc.join(" · "),
        "<b class='n'>2. Ecuaciones</b> (una por cada dato): <ul>" + pb.ecs.map(function (e) { return "<li>" + e[0] + " → <b>" + e[1] + "</b></li>"; }).join("") + "</ul>",
        "<b class='n'>3. Forma matricial.</b> A·X = B con la matriz ampliada:<br>" + mhtml(A, { sep: pb.n }),
        "<b class='n'>4. Rouché-Frobenius.</b> rg(A) = " + r.rA + ", rg(A|B) = " + r.rAB + ", n = " + pb.n + " → <b>" + S.TIPO[r.tipo] + "</b>." + (r.tipo === "SCD" ? " Solución: " + S.solTxt(r) + "." : r.tipo === "SCI" ? " " + (pb.nota || "") + " Solución general: " + S.solTxt(r) + "." : ""),
        "<b class='n'>5. Interpreta y comprueba.</b> " + (r.tipo === "SCD" ? "Sustituye en <i>el enunciado</i>, no solo en las ecuaciones, y comprueba que el resultado tiene sentido (sin edades negativas ni fracciones de entrada). " + r.sol.map(function (q, k) { return pb.inc[k].split(" = ")[0] + " = " + q.txt + " " + pb.unid[k]; }).join("; ") + "." : "Un SCI no da una cantidad concreta: dice qué relación hay entre ellas. Hace falta otro dato.")
      ];
      for (var k = 0; k < bloques.length; k++) h += '<div class="ms-paso' + (k > s ? " sig" : "") + '"' + (k > s ? ' hidden' : "") + ">" + bloques[k] + "</div>";
      pas.innerHTML = h;
      var b = cu.querySelectorAll("[data-btn] button"); b[0].disabled = s === 0; b[1].disabled = s >= bloques.length - 1;
    }
    U.fichas(cu.querySelector("[data-pre]"), PROB.map(function (p) { return { k: p.k, t: p.t }; }), "e", function (kk) { pb = PROB.filter(function (p) { return p.k === kk; })[0]; s = 0; pinta(); });
    var bt = cu.querySelector("[data-btn]");
    U.boton(bt, "◂ Atrás", function () { if (s > 0) { s--; pinta(); } });
    U.boton(bt, "Siguiente ▸", function () { s++; pinta(); });
    U.boton(bt, "Todo ⏭", function () { s = 4; pinta(); });
    pinta();
  };
})(window);
