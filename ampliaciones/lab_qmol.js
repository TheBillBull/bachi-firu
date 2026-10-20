/* ============================================================
   Bachi para Firu · motor de química cuantitativa (FyQ I, temas 4 y 5)
   B.lab.qmol: masas atómicas, lectura de fórmulas, masa molar, composición,
   ajuste de ecuaciones (álgebra con fracciones), gases ideales y utilidades de interfaz.
   Sin dependencias.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var Q = B.lab.qmol = {};

  // ------------------------------------------------------------
  // Masas atómicas: [símbolo, nombre, masa «exacta» (IUPAC abreviada), masa redondeada de examen]
  // ------------------------------------------------------------
  var TABLA = [
    ["H", "hidrógeno", 1.008, 1], ["He", "helio", 4.0026, 4], ["Li", "litio", 6.94, 7], ["Be", "berilio", 9.0122, 9], ["B", "boro", 10.81, 11],
    ["C", "carbono", 12.011, 12], ["N", "nitrógeno", 14.007, 14], ["O", "oxígeno", 15.999, 16], ["F", "flúor", 18.998, 19], ["Ne", "neón", 20.180, 20],
    ["Na", "sodio", 22.990, 23], ["Mg", "magnesio", 24.305, 24], ["Al", "aluminio", 26.982, 27], ["Si", "silicio", 28.085, 28], ["P", "fósforo", 30.974, 31],
    ["S", "azufre", 32.06, 32], ["Cl", "cloro", 35.45, 35.5], ["Ar", "argón", 39.948, 40], ["K", "potasio", 39.098, 39], ["Ca", "calcio", 40.078, 40],
    ["Ti", "titanio", 47.867, 48], ["Cr", "cromo", 51.996, 52], ["Mn", "manganeso", 54.938, 55], ["Fe", "hierro", 55.845, 56], ["Co", "cobalto", 58.933, 59],
    ["Ni", "níquel", 58.693, 59], ["Cu", "cobre", 63.546, 63.5], ["Zn", "zinc", 65.38, 65.4], ["Br", "bromo", 79.904, 80], ["Rb", "rubidio", 85.468, 85.5],
    ["Sr", "estroncio", 87.62, 87.6], ["Ag", "plata", 107.87, 108], ["Cd", "cadmio", 112.41, 112], ["Sn", "estaño", 118.71, 119], ["I", "yodo", 126.90, 127],
    ["Ba", "bario", 137.33, 137], ["Pt", "platino", 195.08, 195], ["Au", "oro", 196.97, 197], ["Hg", "mercurio", 200.59, 201], ["Pb", "plomo", 207.2, 207], ["U", "uranio", 238.03, 238]
  ];
  var MAP = {};
  TABLA.forEach(function (t) { MAP[t[0]] = { s: t[0], nombre: t[1], ex: t[2], red: t[3] }; });
  Q.tabla = TABLA; Q.atomo = MAP;
  Q.modo = "red";                                       // "red" (valores de examen) o "ex" (con decimales)
  Q.masaAtomica = function (s, modo) { var a = MAP[s]; return a ? a[modo || Q.modo] : NaN; };

  Q.NA = 6.022e23; Q.R = 0.082; Q.RJ = 8.314; Q.VM = 22.4;       // N_A (1/mol) · R en atm·L/(mol·K) y J/(mol·K) · volumen molar en CN (L/mol)

  // ------------------------------------------------------------
  // Subíndices y superíndices
  // ------------------------------------------------------------
  var SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
  function normaliza(s) { return String(s == null ? "" : s).replace(/[₀-₉]/g, function (c) { return SUB[c]; }).replace(/[\s_]+/g, " ").trim(); }
  Q.sub = function (f) {                                // "Al2(SO4)3" → "Al₂(SO₄)₃"  (los números después de una letra o paréntesis cerrado)
    var s = normaliza(f), o = "", prev = "", enSub = false, i, c;
    for (i = 0; i < s.length; i++) {
      c = s.charAt(i);
      if (/\d/.test(c) && (/[A-Za-z)\]]/.test(prev) || enSub)) { o += U.sub(c); enSub = true; } else { o += c; enSub = false; }
      prev = (c === " " || c === "·") ? "" : c;
    }
    return o;
  };

  // ------------------------------------------------------------
  // Lectura de fórmulas: "Ca(OH)2", "Al2(SO4)3", "CuSO4·5H2O"  →  { elems: { Ca: 1, O: 2, H: 2 } }
  // ------------------------------------------------------------
  function leeParte(s) {
    var pos = 0;
    function grupo(cierre) {
      var cuentas = {}, c;
      while (pos < s.length) {
        c = s.charAt(pos);
        if (c === ")" || c === "]") { if (cierre) { return cuentas; } throw new Error("paréntesis que no se abre"); }
        if (c === "(" || c === "[") {
          pos++; var interior = grupo(true);
          if (pos >= s.length) throw new Error("falta cerrar un paréntesis");
          pos++;
          var m = /^\d+/.exec(s.slice(pos)), k = m ? parseInt(m[0], 10) : 1; if (m) pos += m[0].length;
          for (var e in interior) cuentas[e] = (cuentas[e] || 0) + interior[e] * k;
          continue;
        }
        var mm = /^([A-Z][a-z]?)(\d*)/.exec(s.slice(pos));
        if (!mm) throw new Error("no entiendo «" + c + "»");
        if (!MAP[mm[1]]) {
          // «Co» frente a «C» + «o»: se prueba con una sola letra
          var una = /^([A-Z])(\d*)/.exec(s.slice(pos));
          if (mm[1].length === 2 && una && MAP[una[1]] && !/^[a-z]/.test(s.charAt(pos + 1))) mm = una; else throw new Error("elemento desconocido «" + mm[1] + "»");
        }
        cuentas[mm[1]] = (cuentas[mm[1]] || 0) + (mm[2] === "" ? 1 : parseInt(mm[2], 10));
        pos += mm[0].length;
      }
      if (cierre) throw new Error("falta cerrar un paréntesis");
      return cuentas;
    }
    return grupo(false);
  }
  Q.leer = function (txt) {
    var s = normaliza(txt).replace(/\s+/g, "");
    if (!s) return { ok: false, error: "escribe una fórmula" };
    try {
      var tot = {}, partes = s.split(/[·*•]|\.(?=\d)/);
      partes.forEach(function (p) {
        var m = /^(\d+)(.*)$/.exec(p), k = 1;
        if (m && partes.length > 1) { k = parseInt(m[1], 10); p = m[2]; }
        if (!p) throw new Error("fórmula incompleta");
        var c = leeParte(p);
        for (var e in c) tot[e] = (tot[e] || 0) + c[e] * k;
      });
      return { ok: true, elems: tot, formula: Q.sub(txt) };
    } catch (e) { return { ok: false, error: e.message }; }
  };

  // Masa molar (g/mol) de una fórmula o de un diccionario de elementos
  Q.masaMolar = function (f, modo) {
    var L = typeof f === "string" ? Q.leer(f) : { ok: true, elems: f };
    if (!L.ok) return NaN;
    var m = 0; for (var e in L.elems) m += L.elems[e] * Q.masaAtomica(e, modo);
    return m;
  };
  Q.composicion = function (f, modo) {
    var L = Q.leer(f); if (!L.ok) return null;
    var M = Q.masaMolar(L.elems, modo), orden = Object.keys(L.elems).sort(function (a, b) { return (a === "C" ? -2 : a === "H" ? -1 : 0) - (b === "C" ? -2 : b === "H" ? -1 : 0) || (a < b ? -1 : 1); });
    return { M: M, filas: orden.map(function (e) { var ma = Q.masaAtomica(e, modo); return { e: e, n: L.elems[e], ma: ma, aporte: ma * L.elems[e], pct: 100 * ma * L.elems[e] / M }; }) };
  };
  Q.nAtomos = function (f) { var L = Q.leer(f), t = 0; if (!L.ok) return NaN; for (var e in L.elems) t += L.elems[e]; return t; };

  // ------------------------------------------------------------
  // Ajuste de ecuaciones: núcleo de la matriz de elementos × especies (fracciones exactas)
  // ------------------------------------------------------------
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function frac(n, d) { if (d < 0) { n = -n; d = -d; } var g = mcd(n, d); return [n / g, d / g]; }
  function fsum(a, b) { return frac(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b) { return frac(a[0] * b[0], a[1] * b[1]); }
  function fdiv(a, b) { return frac(a[0] * b[1], a[1] * b[0]); }
  Q.ecuacion = function (txt) {                         // "H2 + O2 -> H2O"  →  { reactivos: [...], productos: [...] }
    var s = normaliza(txt).replace(/→|⟶|⇒|=>|->|=/g, "→");
    var lados = s.split("→");
    if (lados.length !== 2) return { ok: false, error: "escribe reactivos → productos (con una flecha)" };
    function especies(l) { return l.split("+").map(function (x) { return x.replace(/^\s*\d+\s*/, "").replace(/\s+/g, ""); }).filter(Boolean); }
    var r = especies(lados[0]), p = especies(lados[1]);
    if (!r.length || !p.length) return { ok: false, error: "faltan sustancias a algún lado de la flecha" };
    return { ok: true, reactivos: r, productos: p };
  };
  Q.ajustar = function (reactivos, productos) {
    var esp = reactivos.concat(productos), L = esp.map(function (f) { return Q.leer(f); }), i, j;
    for (i = 0; i < L.length; i++) if (!L[i].ok) return { ok: false, error: "«" + esp[i] + "»: " + L[i].error };
    var elems = {}; L.forEach(function (l) { for (var e in l.elems) elems[e] = 1; });
    var E = Object.keys(elems), nR = reactivos.length, ncol = esp.length;
    for (i = 0; i < nR; i++) for (j = nR; j < ncol; j++) if (esp[i] === esp[j]) return { ok: false, error: "«" + esp[i] + "» aparece a los dos lados" };
    E.forEach(function (e) { var enR = false, enP = false; L.forEach(function (l, k) { if (l.elems[e]) { if (k < nR) enR = true; else enP = true; } }); if (!(enR && enP)) elems[e] = 0; });
    var falta = E.filter(function (e) { return !elems[e]; });
    if (falta.length) return { ok: false, error: "el elemento " + falta.join(", ") + " sólo aparece a un lado de la flecha" };
    var M = E.map(function (e) { return L.map(function (l, k) { return frac((l.elems[e] || 0) * (k < nR ? 1 : -1), 1); }); });
    // eliminación gaussiana (forma escalonada reducida)
    var piv = [], r = 0, c;
    for (c = 0; c < ncol && r < M.length; c++) {
      var p = -1; for (i = r; i < M.length; i++) if (M[i][c][0] !== 0) { p = i; break; }
      if (p < 0) continue;
      var t = M[r]; M[r] = M[p]; M[p] = t;
      var d = M[r][c]; for (j = 0; j < ncol; j++) M[r][j] = fdiv(M[r][j], d);
      for (i = 0; i < M.length; i++) if (i !== r && M[i][c][0] !== 0) { var f = M[i][c]; for (j = 0; j < ncol; j++) M[i][j] = fsum(M[i][j], fmul([-f[0], f[1]], M[r][j])); }
      piv.push(c); r++;
    }
    var libres = []; for (c = 0; c < ncol; c++) if (piv.indexOf(c) < 0) libres.push(c);
    if (libres.length === 0) return { ok: false, error: "no tiene solución: revisa las fórmulas (alguna está mal escrita)" };
    if (libres.length > 1) return { ok: false, error: "hay infinitas formas de ajustarla (son varias reacciones a la vez): separa las reacciones" };
    var v = []; for (c = 0; c < ncol; c++) v.push(frac(0, 1));
    v[libres[0]] = frac(1, 1);
    piv.forEach(function (pc, k) { v[pc] = frac(-M[k][libres[0]][0], M[k][libres[0]][1]); });
    var den = 1; v.forEach(function (x) { den = den / mcd(den, x[1]) * x[1]; });
    var coefs = v.map(function (x) { return x[0] * (den / x[1]); }), g = coefs.reduce(function (a, b) { return mcd(a, b); }, 0);
    coefs = coefs.map(function (x) { return x / g; });
    if (coefs.every(function (x) { return x < 0; })) coefs = coefs.map(function (x) { return -x; });
    if (coefs.some(function (x) { return x <= 0; })) return { ok: false, error: "no se puede ajustar con coeficientes positivos: revisa las sustancias" };
    return { ok: true, coefs: coefs, reactivos: reactivos, productos: productos };
  };
  // Recuento de átomos con unos coeficientes dados
  Q.recuento = function (reactivos, productos, coefs) {
    var izq = {}, der = {}, nR = reactivos.length;
    reactivos.concat(productos).forEach(function (f, k) { var l = Q.leer(f); if (!l.ok) return; var d = k < nR ? izq : der; for (var e in l.elems) d[e] = (d[e] || 0) + l.elems[e] * coefs[k]; });
    var todos = {}; for (var a in izq) todos[a] = 1; for (var b in der) todos[b] = 1;
    return Object.keys(todos).sort().map(function (e) { return { e: e, izq: izq[e] || 0, der: der[e] || 0 }; });
  };
  Q.textoEcuacion = function (reactivos, productos, coefs) {
    var nR = reactivos.length;
    function lado(l, off) { return l.map(function (f, k) { var c = coefs ? coefs[k + off] : 1; return (c === 1 ? "" : c + " ") + Q.sub(f); }).join(" + "); }
    return lado(reactivos, 0) + " → " + lado(productos, nR);
  };

  // ------------------------------------------------------------
  // Gases y disoluciones
  // ------------------------------------------------------------
  Q.presion = function (n, T, V) { return n * Q.R * T / V; };                    // atm
  Q.volumen = function (n, T, P) { return n * Q.R * T / P; };                    // L
  Q.moles = function (P, V, T) { return P * V / (Q.R * T); };
  Q.nombreSust = {};

  // ------------------------------------------------------------
  // Utilidades de interfaz compartidas
  // ------------------------------------------------------------
  Q.num = function (txt) { var v = B.Mate.numero(String(txt).replace(/\s/g, "")); return v; };
  Q.campo = function (host, et, val, ancho, extra) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" style="width:' + (ancho || 110) + 'px" value="' + val + '" aria-label="' + et.replace(/<[^>]+>/g, "") + '">' + (extra || "");
    host.appendChild(l); return l.querySelector("input");
  };
  Q.fil = function (rot, v, cl) { return U.lec(rot, v, cl); };
  Q.sci = function (x, d) {                                                       // 6,02·10²³ (con exponente real) y coma decimal
    if (x === 0) return "0"; if (!isFinite(x)) return "—";
    var e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    if (e >= -3 && e <= 5) return fmt(x, d == null ? 3 : d);
    return fmt(m, d == null ? 3 : d) + "·10" + U.sup(e);
  };
  // Cifras significativas: redondea a n cifras
  Q.cs = function (x, n) { if (!x || !isFinite(x)) return x; var e = Math.floor(Math.log10(Math.abs(x))) - n + 1, f = Math.pow(10, e); return Math.round(x / f) * f; };
  Q.colores = ["var(--pen)", "var(--red)", "var(--ok)", "#B58AF0", "#E0A030", "#2AA9B6"];
  Q.color = function (i) { return Q.colores[i % Q.colores.length]; };

  // Selector de masas atómicas («exactas» / «de examen»): cambia en todos los simuladores a la vez
  Q.escuchas = []; Q.filas = [];
  Q.fichasModo = function (host, alElegir) {
    var d = document.createElement("div"); host.appendChild(d);
    function pinta() { U.fichas(d, [{ k: "red", t: "Masas de examen (H = 1, C = 12, O = 16…)" }, { k: "ex", t: "Masas con decimales (H = 1,008…)" }], Q.modo, function (k) { Q.modo = k; Q.todos(); }); }
    pinta(); Q.filas.push({ el: d, pinta: pinta }); Q.escuchas.push({ el: d, f: alElegir });
    return d;
  };
  Q.todos = function () {
    Q.filas = Q.filas.filter(function (x) { return document.body.contains(x.el); }); Q.escuchas = Q.escuchas.filter(function (x) { return document.body.contains(x.el); });
    Q.filas.forEach(function (x) { x.pinta(); }); Q.escuchas.forEach(function (x) { x.f(); });
  };
})(window);
