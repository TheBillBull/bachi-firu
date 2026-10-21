/* ============================================================
   Bachi para Firu · química del carbono (FyQ I, tema 7)
   reacciones orgánicas (adición, sustitución, eliminación, oxidación, combustión, condensación),
   combustión de hidrocarburos y alcoholes e isomería · q7_reacciones · q7_combustion · q7_isomeria
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, O = B.lab.org, sub = U.sub;
  function M(n, enl, grupo, pos, sus) { return { n: n, enl: enl, grupo: grupo || "", pos: pos || 1, sus: sus || [] }; }
  function S(p, t) { return { p: p, t: t }; }
  function lin(n) { var e = []; for (var i = 1; i < n; i++) e.push(1); return e; }
  O.M = M; O.S = S; O.lin = lin;
  function esHal(q) { return q.t === "cloro" || q.t === "bromo" || q.t === "fluoro" || q.t === "yodo"; }
  function multiple(m) { for (var i = 0; i < m.enl.length; i++) if (m.enl[i] > 1) return i + 1; return 0; }   // enlace entre C(k) y C(k+1)
  function Hs(m) { return O.analiza(m).H; }
  function valido(m) { return O.analiza(m).errores.length === 0; }

  // ------------------------------------------------------------
  // Motor de reacciones sobre moléculas {n, enl, grupo, pos, sus}
  // ------------------------------------------------------------
  // Adición al enlace múltiple (reglas: se rompe un enlace π; Markovnikov: X u OH van al carbono con menos H)
  O.reacAdicion = function (m, reactivo, eq) {
    var k = multiple(m), orden = m.enl[k - 1], H = Hs(m), p = O.copia(m), a = k, b = k + 1, i;
    eq = orden === 3 ? (eq || 1) : 1;
    var hal = reactivo.indexOf("Cl") >= 0 ? "cloro" : "bromo";
    var mk = H[a] <= H[b] ? a : b;                                // carbono que recibe X u OH
    p.enl[k - 1] = orden - eq;
    if (reactivo === "Cl2" || reactivo === "Br2") { for (i = 0; i < eq; i++) { p.sus.push(S(a, hal)); p.sus.push(S(b, hal)); } }
    else if (reactivo === "HCl" || reactivo === "HBr") { for (i = 0; i < eq; i++) p.sus.push(S(mk, hal)); }
    else if (reactivo === "H2O") { p.grupo = "ol"; p.pos = mk; }
    if (!valido(p)) return null;
    return { prod: p, eq: eq, mk: mk, orden: orden };
  };
  // Sustitución radicalaria de un H por halógeno (luz UV) en el carbono c
  O.reacSustHal = function (m, hal, c) {
    var p = O.copia(m); p.sus.push(S(c, hal));
    return valido(p) ? p : null;
  };
  // Sustitución nucleófila: el halógeno se cambia por OH (NaOH acuoso)
  O.reacSustOH = function (m) {
    var q = m.sus.filter(esHal)[0], p = O.copia(m);
    p.sus = p.sus.filter(function (x) { return !(x.p === q.p && x.t === q.t); });
    p.grupo = "ol"; p.pos = q.p;
    return valido(p) ? p : null;
  };
  // Eliminación: sale H₂O (alcohol, H₂SO₄ conc.) o HX (halogenuro, KOH en etanol); regla de Saytzeff
  O.reacElim = function (m) {
    var H = Hs(m), n = m.n, hal = m.sus.filter(esHal)[0], c = m.grupo === "ol" ? m.pos : hal.p, cand = [], p = O.copia(m);
    [c - 1, c + 1].forEach(function (q) { if (q >= 1 && q <= n && H[q] >= 1) cand.push(q); });
    if (!cand.length) return null;
    cand.sort(function (x, y) { return H[x] - H[y]; });
    var q = cand[0];
    p.enl[Math.min(c, q) - 1] = 2;
    if (m.grupo === "ol") p.grupo = ""; else p.sus = p.sus.filter(function (x) { return !(x.p === hal.p && x.t === hal.t); });
    return valido(p) ? { prod: p, empate: cand.length > 1 && H[cand[0]] === H[cand[1]], H: H, c: c, q: q } : null;
  };
  // Oxidación de alcoholes con K₂Cr₂O₇/H⁺: primario → aldehído (→ ácido), secundario → cetona, terciario: nada
  O.reacOxid = function (m) {
    var c = m.pos, h = Hs(m)[c], a = O.copia(m), b = O.copia(m);
    if (h === 0) return { clase: "terciario" };
    if (h >= 2) { a.grupo = "al"; b.grupo = "oico"; return { clase: "primario", ald: a, acido: b }; }
    a.grupo = "ona"; return { clase: "secundario", cetona: a };
  };
  // Combustión completa de CₐH_bO_c: coeficientes enteros mínimos
  O.reacComb = function (c) {
    var o2 = c.C + c.H / 4 - c.O / 2, ks = [1, 2, 4], i, k = 4;
    for (i = 0; i < ks.length; i++) { var kk = ks[i]; if (Math.abs(kk * o2 - Math.round(kk * o2)) < 1e-9 && Math.abs(kk * c.H / 2 - Math.round(kk * c.H / 2)) < 1e-9) { k = kk; break; } }
    return { comb: k, o2: Math.round(k * o2), co2: k * c.C, h2o: Math.round(k * c.H / 2), k: k };
  };
  // Esterificación: ácido alcanoico lineal (n C) + alcohol lineal (m C) ⇌ éster + agua
  O.ester = function (n, m) {
    var s = "", i, acil = n === 1 ? "H" : "CH" + sub(3) + new Array(n - 1).join("−CH" + sub(2)), alq = new Array(m).join("CH" + sub(2) + "−") + "CH" + sub(3);
    for (i = 1; i < n; i++) s += "C-";
    s += "C(=O)-O-";
    for (i = 1; i < m; i++) s += "C-";
    s += "C";
    var R = O.RAIZ;
    return { smiles: s, nombre: R[n] + "anoato de " + R[m] + "ilo", cond: acil + "−COO−" + alq, formula: O.formulaMolecular(O.cuentaGrafo(O.grafoDeSmiles(s))) };
  };
  O.ecuacionComb = function (c, r) {
    function t(k, f) { return (k === 1 ? "" : k + " ") + f; }
    return t(r.comb, O.formulaMolecular(c)) + " + " + t(r.o2, "O" + sub(2)) + " ⟶ " + t(r.co2, "CO" + sub(2)) + " + " + t(r.h2o, "H" + sub(2) + "O");
  };

  // ------------------------------------------------------------
  // Reactivos disponibles
  // ------------------------------------------------------------
  var ALQUENOS = [M(2, [2]), M(3, [2, 1]), M(4, [2, 1, 1]), M(4, [1, 2, 1]), M(3, [2, 1], "", 1, [S(2, "metil")]), M(4, [1, 2, 1], "", 1, [S(2, "metil")]), M(5, [2, 1, 1, 1])];
  var ALQUINOS = [M(2, [3]), M(3, [3, 1]), M(4, [3, 1, 1]), M(4, [1, 3, 1])];
  var ALCANOS = [M(2, [1]), M(3, [1, 1]), M(4, [1, 1, 1]), M(3, [1, 1], "", 1, [S(2, "metil")]), M(5, [1, 1, 1, 1])];
  var HALOGENUROS = [M(2, [1], "", 1, [S(1, "bromo")]), M(3, [1, 1], "", 1, [S(1, "cloro")]), M(3, [1, 1], "", 1, [S(2, "cloro")]), M(4, [1, 1, 1], "", 1, [S(2, "bromo")]), M(3, [1, 1], "", 1, [S(2, "cloro"), S(2, "metil")])];
  var ALCOHOLES_E = [M(2, [1], "ol", 1), M(3, [1, 1], "ol", 1), M(3, [1, 1], "ol", 2), M(4, [1, 1, 1], "ol", 1), M(4, [1, 1, 1], "ol", 2), M(5, [1, 1, 1, 1], "ol", 3)];
  var ALCOHOLES_O = [M(2, [1], "ol", 1), M(3, [1, 1], "ol", 1), M(3, [1, 1], "ol", 2), M(4, [1, 1, 1], "ol", 2), M(3, [1, 1], "ol", 1, [S(2, "metil")]), M(3, [1, 1], "ol", 2, [S(2, "metil")])];
  var COMBUSTIBLES = [M(1, []), M(2, [1]), M(3, [1, 1]), M(4, [1, 1, 1]), M(6, lin(6)), M(8, lin(8)), M(5, [1, 1, 1, 1], "", 1, [S(2, "metil"), S(2, "metil"), S(4, "metil")]), M(2, [2]), M(2, [3]), M(1, [], "ol", 1), M(2, [1], "ol", 1), M(3, [1, 1], "ol", 1)];
  var HC_DH = [890, 1560, 2220, 2877, 4163, 5470, 5461, 1411, 1300, 726, 1367, 2021];    // −ΔH°c en kJ/mol (agua líquida)
  O.REAC = { alquenos: ALQUENOS, alquinos: ALQUINOS, alcanos: ALCANOS, halogenuros: HALOGENUROS, alcoholesE: ALCOHOLES_E, alcoholesO: ALCOHOLES_O, combustibles: COMBUSTIBLES, dhc: HC_DH };

  // todas las combinaciones que ofrece el widget, con su resultado: lo usa también la verificación
  O.todasLasReacciones = function () {
    var out = [];
    ALQUENOS.forEach(function (m) { ["H2", "Cl2", "Br2", "HCl", "HBr", "H2O"].forEach(function (r) { var x = O.reacAdicion(m, r, 1); out.push({ tipo: "adicion", m: m, reactivo: r, eq: 1, prod: x && x.prod, nombre: x && O.nombrar(x.prod) }); }); });
    ALQUINOS.forEach(function (m) { ["H2", "Cl2", "Br2", "HCl", "HBr"].forEach(function (r) { [1, 2].forEach(function (eq) { var x = O.reacAdicion(m, r, eq); out.push({ tipo: "adicion", m: m, reactivo: r, eq: eq, prod: x && x.prod, nombre: x && O.nombrar(x.prod) }); }); }); });
    ALCANOS.forEach(function (m) { ["cloro", "bromo"].forEach(function (h) { for (var c = 1; c <= m.n; c++) { var p = O.reacSustHal(m, h, c); out.push({ tipo: "halogenacion", m: m, hal: h, c: c, prod: p, nombre: p && O.nombrar(p) }); } }); });
    HALOGENUROS.forEach(function (m) { var p = O.reacSustOH(m); out.push({ tipo: "hidrolisis", m: m, prod: p, nombre: p && O.nombrar(p) }); var e = O.reacElim(m); out.push({ tipo: "eliminacion", m: m, prod: e && e.prod, nombre: e && O.nombrar(e.prod), empate: e && e.empate }); });
    ALCOHOLES_E.forEach(function (m) { var e = O.reacElim(m); out.push({ tipo: "eliminacion", m: m, prod: e && e.prod, nombre: e && O.nombrar(e.prod), empate: e && e.empate }); });
    ALCOHOLES_O.forEach(function (m) { var o = O.reacOxid(m); out.push({ tipo: "oxidacion", m: m, clase: o.clase, ald: o.ald && O.nombrar(o.ald), acido: o.acido && O.nombrar(o.acido), cetona: o.cetona && O.nombrar(o.cetona) }); });
    COMBUSTIBLES.forEach(function (m) { var c = O.cuenta(m), r = O.reacComb(c); out.push({ tipo: "combustion", m: m, coef: [r.comb, r.o2, r.co2, r.h2o] }); });
    var n, mm; for (n = 1; n <= 4; n++) for (mm = 1; mm <= 4; mm++) { var e2 = O.ester(n, mm); out.push({ tipo: "ester", n: n, m: mm, nombre: e2.nombre, smiles: e2.smiles, formula: e2.formula }); }
    return out;
  };
})(window);
