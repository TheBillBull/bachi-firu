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

  // ============================================================
  // Q7_REACCIONES: máquina de reacciones orgánicas
  // ============================================================
  var ATOMOS_RX = ["C", "H", "O", "N", "F", "Cl", "Br", "I", "Na", "K"];
  function cu(extra) { var c = { C: 0, H: 0, O: 0, N: 0, F: 0, Cl: 0, Br: 0, I: 0, Na: 0, K: 0 }; Object.keys(extra || {}).forEach(function (k) { c[k] = extra[k]; }); return c; }
  function suma(lista) { var t = cu(); lista.forEach(function (c) { ATOMOS_RX.forEach(function (e) { t[e] += (c[e] || 0); }); }); return t; }
  function cuentaMol(m) { return cu(O.cuenta(m)); }
  function balance(izq, der) {
    var a = suma(izq), b = suma(der), ok = true, partes = [];
    ATOMOS_RX.forEach(function (e) { if (a[e] || b[e]) { if (a[e] !== b[e]) ok = false; partes.push(e + " " + a[e] + (a[e] === b[e] ? " = " : " ≠ ") + b[e]); } });
    return partes.join(" · ") + (ok ? " ✓" : " ✗");
  }
  var REAC_INORG = { H2: cu({ H: 2 }), Cl2: cu({ Cl: 2 }), Br2: cu({ Br: 2 }), HCl: cu({ H: 1, Cl: 1 }), HBr: cu({ H: 1, Br: 1 }), H2O: cu({ H: 2, O: 1 }), NaOH: cu({ Na: 1, O: 1, H: 1 }), KOH: cu({ K: 1, O: 1, H: 1 }), O: cu({ O: 1 }),
    NaCl: cu({ Na: 1, Cl: 1 }), NaBr: cu({ Na: 1, Br: 1 }), KCl: cu({ K: 1, Cl: 1 }), KBr: cu({ K: 1, Br: 1 }) };
  function halogenoDe(m) { var q = m.sus.filter(esHal)[0]; return q ? (q.t === "cloro" ? "Cl" : q.t === "bromo" ? "Br" : q.t === "fluoro" ? "F" : "I") : null; }
  O.RX_TIPOS = [{ k: "adicion", t: "Adición" }, { k: "halogenacion", t: "Halogenación" }, { k: "hidrolisis", t: "Hidrólisis" }, { k: "eliminacion", t: "Eliminación" }, { k: "oxidacion", t: "Oxidación" }, { k: "ester", t: "Esterificación" }];
  O.rxLista = function (tipo) {
    var R = O.REAC;
    return tipo === "adicion" ? R.alquenos.concat(R.alquinos) : tipo === "halogenacion" ? R.alcanos : tipo === "hidrolisis" ? R.halogenuros : tipo === "eliminacion" ? R.halogenuros.concat(R.alcoholesE) : tipo === "oxidacion" ? R.alcoholesO : [];
  };
  // Resultado de una reacción: prods (especificaciones), izq y der (recuentos de átomos), reactivo, condiciones, regla…
  O.rxCalcula = function (st) {
    var lista = O.rxLista(st.tipo), m = lista[Math.min(st.i, lista.length - 1)], r = { m: m, nombreM: O.nombrar(m), prods: [], extras: [] }, x, p, i;
    if (st.tipo === "adicion") {
      var triple = multiple(m) && m.enl[multiple(m) - 1] === 3, eq = triple ? st.eq : 1;
      x = O.reacAdicion(m, st.reag, eq);
      if (!x) { r.error = "Esa combinación no da un producto válido."; return r; }
      r.prods = [x.prod]; r.reactivoTxt = (eq > 1 ? eq + " " : "") + st.reag.replace(/(\d)/g, function (d) { return sub(+d); });
      r.izq = [cuentaMol(m)]; for (i = 0; i < eq; i++) r.izq.push(REAC_INORG[st.reag]); r.der = [cuentaMol(x.prod)];
      r.cond = st.reag === "H2" ? "catalizador Pt, Pd o Ni (hidrogenación)" : st.reag === "Cl2" || st.reag === "Br2" ? "X₂ disuelto en CCl₄, a temperatura ambiente" : st.reag === "H2O" ? "H₂SO₄ diluido como catalizador (hidratación)" : "HX gaseoso o disuelto";
      var H = O.analiza(m).H, a = multiple(m), b = a + 1;
      r.regla = (st.reag === "HCl" || st.reag === "HBr" || st.reag === "H2O") ? (H[a] === H[b] ? "El enlace múltiple es simétrico (los dos carbonos tienen los mismos hidrógenos): sólo hay un producto posible y no hace falta la regla de Markovnikov." : "<b>Regla de Markovnikov</b>: el H del reactivo se une al carbono del enlace múltiple que ya tenía más hidrógenos (C" + (H[a] > H[b] ? a : b) + "), y el grupo X u OH va al que tenía menos (C" + x.mk + ").") : "Se rompe el enlace π y se añaden los dos átomos del reactivo, uno a cada carbono del enlace múltiple" + (triple && eq === 2 ? " (con dos equivalentes, el triple pasa a sencillo)." : triple ? " (con un equivalente, el triple pasa a doble)." : ".");
      r.tipoTxt = "adición (se rompe un enlace π)";
    } else if (st.tipo === "halogenacion") {
      var hal = st.hal, k, q; p = O.reacSustHal(m, hal, Math.min(st.c, m.n));
      if (!p) { r.error = "No se puede sustituir ahí."; return r; }
      r.prods = [p]; r.reactivoTxt = (hal === "cloro" ? "Cl" : "Br") + sub(2); r.izq = [cuentaMol(m), REAC_INORG[hal === "cloro" ? "Cl2" : "Br2"]];
      r.der = [cuentaMol(p), REAC_INORG[hal === "cloro" ? "HCl" : "HBr"]]; r.cond = "luz ultravioleta (o calor): mecanismo radicalario"; r.tipoTxt = "sustitución radicalaria (un H se cambia por un halógeno)";
      var distintos = {}; for (k = 1; k <= m.n; k++) { q = O.reacSustHal(m, hal, k); if (q) distintos[O.nombrar(q)] = 1; }
      r.extras = Object.keys(distintos);
      r.regla = "La reacción no es selectiva: con luz UV se forma una mezcla de todos los derivados monohalogenados posibles (" + r.extras.length + " distintos en este alcano), además de di- y trihalogenados. El bromo es más selectivo que el cloro.";
    } else if (st.tipo === "hidrolisis") {
      p = O.reacSustOH(m); r.prods = [p]; var X = halogenoDe(m); r.reactivoTxt = "NaOH(aq)"; r.izq = [cuentaMol(m), REAC_INORG.NaOH]; r.der = [cuentaMol(p), REAC_INORG["Na" + X]];
      r.cond = "NaOH en disolución acuosa, calor suave"; r.tipoTxt = "sustitución nucleófila (el OH⁻ sustituye al halógeno)";
      r.regla = "El ion OH⁻ (rico en electrones) ataca al carbono unido al halógeno y lo desplaza como ion " + X + "⁻. Se forma un alcohol y la sal NaX.";
    } else if (st.tipo === "eliminacion") {
      x = O.reacElim(m); if (!x) { r.error = "No hay hidrógeno vecino que eliminar."; return r; }
      r.prods = [x.prod]; var esAlc = m.grupo === "ol", X2 = esAlc ? null : halogenoDe(m);
      r.reactivoTxt = esAlc ? "H₂SO₄ conc." : "KOH (etanol)"; r.izq = esAlc ? [cuentaMol(m)] : [cuentaMol(m), REAC_INORG.KOH];
      r.der = esAlc ? [cuentaMol(x.prod), REAC_INORG.H2O] : [cuentaMol(x.prod), REAC_INORG["K" + X2], REAC_INORG.H2O];
      r.cond = esAlc ? "H₂SO₄ concentrado y calor (deshidratación)" : "KOH disuelto en etanol, calor"; r.tipoTxt = "eliminación (sale " + (esAlc ? "H₂O" : "HX") + " y aparece un enlace doble)";
      r.regla = x.empate ? "Los dos carbonos vecinos tienen los mismos hidrógenos (o sólo hay uno posible): se obtiene un único alqueno." : "<b>Regla de Saytzeff</b>: el H que se pierde sale del carbono vecino con <i>menos</i> hidrógenos (C" + x.q + "), y se obtiene el alqueno más sustituido.";
    } else if (st.tipo === "oxidacion") {
      x = O.reacOxid(m); r.reactivoTxt = "K₂Cr₂O₇ / H⁺"; r.cond = "dicromato de potasio en medio ácido, calor"; r.tipoTxt = "oxidación (el carbono del −OH gana enlaces con el oxígeno)";
      if (x.clase === "terciario") { r.prods = []; r.sinReaccion = true; r.izq = [cuentaMol(m)]; r.der = [cuentaMol(m)]; r.regla = "Un <b>alcohol terciario</b> no tiene H en el carbono del −OH: no se oxida en estas condiciones."; }
      else if (x.clase === "primario") { r.prods = [x.ald, x.acido]; r.izq = [cuentaMol(m), REAC_INORG.O]; r.der = [cuentaMol(x.ald), REAC_INORG.H2O]; r.regla = "<b>Alcohol primario</b>: primero se oxida a aldehído (si se destila a medida que se forma) y, con exceso de oxidante, sigue hasta ácido carboxílico: R−CH₂OH → R−CHO → R−COOH."; r.dobleBalance = [[cuentaMol(x.ald), REAC_INORG.O], [cuentaMol(x.acido)]]; }
      else { r.prods = [x.cetona]; r.izq = [cuentaMol(m), REAC_INORG.O]; r.der = [cuentaMol(x.cetona), REAC_INORG.H2O]; r.regla = "<b>Alcohol secundario</b>: se oxida a cetona y ahí se detiene (no tiene más H en ese carbono)."; }
    }
    return r;
  };
  B.w.q7_reacciones = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Máquina de reacciones orgánicas");
    cuerpo.innerHTML = '<div data-tipo class="chips"></div><div data-ctl></div><div data-reag class="chips"></div><div data-eq class="chips"></div><div class="q7-rx"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { tipo: "adicion", i: 1, reag: "HBr", eq: 1, hal: "cloro", c: 1, n: 2, mm: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), rx = cuerpo.querySelector(".q7-rx"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"),
      reagEl = cuerpo.querySelector("[data-reag]"), eqEl = cuerpo.querySelector("[data-eq]"), selEl, selLab, slC, slN, slM;
    selLab = document.createElement("label"); selLab.className = "bx-campo q7-selector"; selLab.innerHTML = '<span class="bx-et">Reactivo orgánico:</span><select aria-label="Reactivo orgánico"></select>'; ctl.appendChild(selLab); selEl = selLab.querySelector("select");
    slC = U.slider(ctl, { et: "Carbono sustituido", min: 1, max: 5, step: 1, val: 1, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return "C" + v; } });
    slN = U.slider(ctl, { et: "C del ácido", min: 1, max: 4, step: 1, val: 2, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return String(v); } });
    slM = U.slider(ctl, { et: "C del alcohol", min: 1, max: 4, step: 1, val: 2, on: function (v) { st.mm = v; pinta(); }, fmt: function (v) { return String(v); } });
    function caja(titulo, m, G, nombre, extra) {
      var d = document.createElement("div"); d.className = "q7-mol"; d.innerHTML = '<div class="q7-mol-p"></div><b class="q7-mol-n">' + nombre + "</b>" + (extra ? "<small>" + extra + "</small>" : "");
      rx.appendChild(d);
      var g = new B.Plot(d.querySelector(".q7-mol-p"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 280, h: 170, limpio: true, etiqueta: titulo + ": " + nombre });
      O.dibujaGrafo(g, G || O.grafoDeSpec(m), { min: 1.6 });
    }
    function flecha(texto) { var f = document.createElement("div"); f.className = "q7-rx-fl"; f.innerHTML = "<span>" + texto + "</span><b>⟶</b>"; rx.appendChild(f); }
    function mas(t) { var f = document.createElement("div"); f.className = "q7-rx-fl"; f.innerHTML = "<b>" + (t || "+") + "</b>"; rx.appendChild(f); }
    function opcionesReactivo() {
      var lista = O.rxLista(st.tipo); selLab.style.display = lista.length ? "" : "none";
      selEl.innerHTML = lista.map(function (m, i) { return '<option value="' + i + '">' + O.nombrar(m) + "</option>"; }).join("");
      if (st.i >= lista.length) st.i = 0; selEl.value = String(st.i);
      slC.el.style.display = st.tipo === "halogenacion" ? "" : "none"; slN.el.style.display = slM.el.style.display = st.tipo === "ester" ? "" : "none";
      if (st.tipo === "halogenacion") { var n = lista[st.i].n; slC.input.max = n; if (st.c > n) { st.c = n; slC.set(n); } }
      var reag = [];
      if (st.tipo === "adicion") reag = [{ k: "H2", t: "H₂" }, { k: "Cl2", t: "Cl₂" }, { k: "Br2", t: "Br₂" }, { k: "HCl", t: "HCl" }, { k: "HBr", t: "HBr" }, { k: "H2O", t: "H₂O" }];
      else if (st.tipo === "halogenacion") reag = [{ k: "cloro", t: "Cl₂ + luz UV" }, { k: "bromo", t: "Br₂ + luz UV" }];
      reagEl.style.display = reag.length ? "" : "none";
      var esAlquino = st.tipo === "adicion" && lista[st.i] && lista[st.i].enl.indexOf(3) >= 0;
      eqEl.style.display = esAlquino ? "" : "none";
      if (esAlquino) U.fichas(eqEl, [{ k: "1", t: "1 equivalente" }, { k: "2", t: "2 equivalentes" }], String(st.eq), function (k) { st.eq = +k; pinta(); });
      if (reag.length) U.fichas(reagEl, reag, st.tipo === "adicion" ? st.reag : st.hal, function (k) { if (st.tipo === "adicion") st.reag = k; else st.hal = k; pinta(); });
    }
    function pinta() {
      rx.innerHTML = "";
      if (st.tipo === "ester") {
        eqEl.style.display = "none"; selLab.style.display = "none"; reagEl.style.display = "none"; slC.el.style.display = "none"; slN.el.style.display = slM.el.style.display = "";
        var e = O.ester(st.n, st.mm), R = O.RAIZ, ac = new Array(st.n).join("C-") + "C(=O)-O", al = new Array(st.mm).join("C-") + "C-O", nA = "ácido " + R[st.n] + "anoico", nB = st.mm <= 2 ? R[st.mm] + "anol" : R[st.mm] + "an-1-ol";
        var GA = O.grafoDeSmiles(ac), GB = O.grafoDeSmiles(al), GE = O.grafoDeSmiles(e.smiles);
        caja("Ácido", null, GA, nA); mas(); caja("Alcohol", null, GB, nB); flecha("H₂SO₄ (cat.), calor<br>⇌"); caja("Éster", null, GE, e.nombre, "+ H₂O");
        var cA = O.cuentaGrafo(GA), cB = O.cuentaGrafo(GB), cE = O.cuentaGrafo(GE);
        lectura.innerHTML = U.lec("Reacción", nA + " + " + nB + " ⇌ <b>" + e.nombre + "</b> + agua", "pen ancho") + U.lec("Fórmula del éster", O.formulaMolecular(cE) + " · " + e.cond, "ok ancho") +
          U.lec("Balance de átomos", balance([cu(cA), cu(cB)], [cu(cE), REAC_INORG.H2O]), "ancho") + U.lec("Tipo", "condensación (se pierde una molécula de agua)", "ancho");
        pie.innerHTML = "La <b>esterificación</b> es reversible: el ácido aporta el −OH y el alcohol el H (el agua se forma con el OH del ácido y el H del alcohol). Se favorece quitando agua o poniendo un exceso de uno de los reactivos. El nombre del éster es «<i>-ato de -ilo</i>»: del ácido <i>etanoico</i> y el <i>etanol</i> sale el <i>etanoato de etilo</i>. Muchos ésteres huelen a fruta.";
        return;
      }
      opcionesReactivo();
      var r = O.rxCalcula(st);
      if (r.error) { lectura.innerHTML = U.lec("Aviso", r.error, "red ancho"); pie.innerHTML = ""; return; }
      caja("Reactivo", r.m, null, r.nombreM);
      flecha(r.reactivoTxt + "<br><small>" + r.cond + "</small>");
      if (r.sinReaccion) { var d0 = document.createElement("div"); d0.className = "q7-mol q7-nada"; d0.innerHTML = "<b class='q7-mol-n'>no hay reacción</b>"; rx.appendChild(d0); }
      r.prods.forEach(function (p, k) { if (k > 0) flecha("más oxidante"); caja("Producto", p, null, O.nombrar(p), O.condensada(p)); });
      var eqTxt = r.nombreM + " + " + r.reactivoTxt + " ⟶ " + (r.sinReaccion ? "no reacciona" : r.prods.map(function (p) { return "<b>" + O.nombrar(p) + "</b>"; }).join(" ⟶ "));
      lectura.innerHTML = U.lec("Reacción", eqTxt, "pen ancho") + U.lec("Tipo", r.tipoTxt, "ancho") + U.lec("Balance de átomos", balance(r.izq, r.der), "ancho") +
        (r.dobleBalance ? U.lec("Segunda oxidación (aldehído → ácido)", balance(r.dobleBalance[0], r.dobleBalance[1]), "ancho") : "") + (r.extras.length > 1 ? U.lec("Todos los monoderivados posibles", r.extras.join(" · "), "ancho") : "");
      pie.innerHTML = r.regla;
    }
    U.fichas(cuerpo.querySelector("[data-tipo]"), O.RX_TIPOS, st.tipo, function (k) {
      st.tipo = k; st.i = 0; st.c = 1; if (k === "adicion") { st.reag = "HBr"; st.i = 1; } pinta();
    });
    selEl.addEventListener("change", function () { st.i = parseInt(selEl.value, 10); pinta(); });
    pinta();
  };

  // ============================================================
  // Q7_COMBUSTION: ecuación, oxígeno, CO₂ y energía de un combustible
  // ============================================================
  O.combustionDatos = function (i, masaG) {
    var m = O.REAC.combustibles[i], c = O.cuenta(m), r = O.reacComb(c), M = O.masa(c), n = masaG / M, xi = n / r.comb, dh = O.REAC.dhc[i];
    return { m: m, c: c, r: r, M: M, n: n, nO2: xi * r.o2, nCO2: xi * r.co2, nH2O: xi * r.h2o, E: n * dh, dh: dh, co2PorMJ: c.C * 44.01 / dh };
  };
  B.w.q7_combustion = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Quemar un combustible: ecuación, oxígeno, CO₂ y energía");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="q7-ec"></div><div class="lectura anch"></div><div class="q5-dato-t">kg de CO₂ emitidos por cada MJ de energía obtenida</div><div class="q4-barras q7-barras"></div><p class="w-pie"></p>';
    var st = { i: 2, m: 1000 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ec = cuerpo.querySelector(".q7-ec"), lectura = cuerpo.querySelector(".lectura"), barras = cuerpo.querySelector(".q7-barras"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Masa de combustible", min: 10, max: 5000, step: 10, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return v >= 1000 ? fmt(v / 1000, 2) + " kg" : fmt(v, 0) + " g"; } });
    function pinta() {
      var d = O.combustionDatos(st.i, st.m), c = d.c, M = O.REAC.combustibles;
      ec.innerHTML = "<div class='q5-ecuacion'>" + O.ecuacionComb(c, d.r) + "</div>";
      lectura.innerHTML = U.lec("Combustible", O.nombrar(d.m) + " · " + O.formulaMolecular(c) + " · M = " + fmt(d.M, 2) + " g/mol", "pen ancho") + U.lec("Moles quemados", fmt(st.m, 0) + " / " + fmt(d.M, 2) + " = " + fmt(d.n, 3) + " mol", "") +
        U.lec("Oxígeno necesario", fmt(d.nO2, 2) + " mol = " + fmt(d.nO2 * 32, 0) + " g = " + fmt(d.nO2 * 22.4, 0) + " L en CN", "ok") + U.lec("Aire necesario (21 % de O₂)", fmt(d.nO2 * 22.4 / 0.21 / 1000, 2) + " m³ en CN", "") +
        U.lec("CO₂ emitido", fmt(d.nCO2, 2) + " mol = " + fmt(d.nCO2 * 44.01, 0) + " g", "red") + U.lec("Agua formada", fmt(d.nH2O, 2) + " mol = " + fmt(d.nH2O * 18.02, 0) + " g", "") +
        U.lec("Energía desprendida", fmt(d.E, 0) + " kJ (" + fmt(d.dh, 0) + " kJ/mol · " + fmt(d.n, 3) + " mol)", "ancho") + U.lec("Poder calorífico", fmt(d.dh / d.M, 1) + " MJ/kg", "");
      var datos = M.map(function (m, k) { return { t: O.nombrar(m), v: O.combustionDatos(k, 100).co2PorMJ, k: k }; }), mx = Math.max.apply(null, datos.map(function (x) { return x.v; }));
      barras.innerHTML = datos.map(function (x) { return "<div class='q4-fila q7-hf" + (x.k === st.i ? " q5-sel" : "") + "'><span>" + x.t + "</span><span class='q4-bar' style='width:" + x.v / mx * 100 + "%;background:" + (x.k === st.i ? "var(--red)" : "var(--ink-faint)") + "'></span><span class='q4-num'>" + fmt(x.v, 3) + "</span></div>"; }).join("");
      pie.innerHTML = "En la <b>combustión completa</b> todo el carbono sale como CO₂ y el hidrógeno como H₂O: C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + y/2 H₂O. Los datos de energía son entalpías de combustión estándar con el agua líquida. Por cada MJ de energía, el gas natural (metano) emite menos CO₂ que la gasolina o el butano, porque tiene más hidrógeno por carbono.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), O.REAC.combustibles.map(function (m, i) { return { k: String(i), t: O.nombrar(m) }; }), String(st.i), function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q7_ISOMERIA: isómeros de una misma fórmula molecular
  // ============================================================
  // cada isómero: [nombre, SMILES simplificado, relación con el primero, punto de ebullición (°C), especificación de cadena (para verificar el nombre) o null]
  O.ISOMEROS = [
    { f: "C₄H₁₀", t: "Butano", d: [["butano", "CCCC", "—", -0.5], ["2-metilpropano", "CC(C)C", "de cadena", -11.7]], nota: "Misma fórmula, distinta forma de la cadena: el ramificado es más compacto y hierve unos 11 °C más abajo." },
    { f: "C₅H₁₂", t: "Pentano", d: [["pentano", "CCCCC", "—", 36.1], ["2-metilbutano", "CC(C)CC", "de cadena", 27.8], ["2,2-dimetilpropano", "CC(C)(C)C", "de cadena", 9.5]], nota: "Tres isómeros de cadena. Cuanto más ramificado y esférico, menor superficie de contacto y menos fuerzas de London: el punto de ebullición baja de 36 a 9,5 °C." },
    { f: "C₆H₁₄", t: "Hexano", d: [["hexano", "CCCCCC", "—", 68.7], ["2-metilpentano", "CC(C)CCC", "de cadena", 60.3], ["3-metilpentano", "CCC(C)CC", "de cadena", 63.3], ["2,2-dimetilbutano", "CC(C)(C)CC", "de cadena", 49.7], ["2,3-dimetilbutano", "CC(C)C(C)C", "de cadena", 58.0]], nota: "Cinco isómeros. El C₇H₁₆ tiene 9, el C₈H₁₈ tiene 18 y el C₂₀H₄₂ tiene más de 366 000." },
    { f: "C₄H₈", t: "Buteno", d: [["but-1-eno", "C=CCC", "—", -6.3], ["cis-but-2-eno", "C~C=C~C", "de posición", 3.7], ["trans-but-2-eno", "CC=CC", "de posición (y geométrica con el anterior)", 0.9], ["2-metilprop-1-eno", "C=C(C)C", "de cadena", -6.9]], nota: "Además hay dos cicloalcanos de fórmula C₄H₈ (ciclobutano y metilciclopropano) que no se dibujan aquí. El cis- y el trans-but-2-eno son <b>estereoisómeros</b>: mismo orden de enlaces, distinta disposición en el espacio (el doble enlace no gira)." },
    { f: "C₂H₆O", t: "Etanol", d: [["etanol", "CCO", "—", 78.4], ["metoximetano (éter dimetílico)", "COC", "de función", -24.8]], nota: "Alcohol frente a éter: el −OH forma puentes de hidrógeno y el éter no, de ahí 103 °C de diferencia en el punto de ebullición." },
    { f: "C₃H₈O", t: "Propanol", d: [["propan-1-ol", "CCCO", "—", 97.2], ["propan-2-ol", "CC(O)C", "de posición", 82.3], ["metoxietano", "COCC", "de función", 7.4]], nota: "Los dos alcoholes son isómeros de posición (el −OH en el C1 o en el C2); el éter es un isómero de función." },
    { f: "C₄H₁₀O", t: "Butanol", d: [["butan-1-ol", "CCCCO", "—", 117.7], ["butan-2-ol", "CCC(C)O", "de posición", 99.5], ["2-metilpropan-1-ol", "OCC(C)C", "de cadena", 107.9], ["2-metilpropan-2-ol", "CC(C)(C)O", "de cadena y posición", 82.4], ["etoxietano (éter dietílico)", "CCOCC", "de función", 34.6], ["1-metoxipropano", "COCCC", "de función", 39.0], ["2-metoxipropano", "COC(C)C", "de función", 31.0]], nota: "Siete isómeros con tres tipos de isomería: 4 alcoholes (cadena y posición) y 3 éteres (función)." },
    { f: "C₃H₆O", t: "Propanona", d: [["propanona", "CC(=O)C", "—", 56.1], ["propanal", "CCC=O", "de función", 48.0], ["prop-2-en-1-ol", "C=CCO", "de función", 97.0], ["metoxieteno", "C=COC", "de función", 5.5]], nota: "Cetona, aldehído, alcohol insaturado y éter insaturado: misma fórmula y cuatro funciones distintas (hay otros isómeros cíclicos, como el oxirano o el ciclopropanol)." },
    { f: "C₂H₄O₂", t: "Ácido etanoico", d: [["ácido etanoico", "CC(=O)O", "—", 118.1], ["metanoato de metilo", "C(=O)OC", "de función", 31.8]], nota: "El ácido forma dímeros por puentes de hidrógeno y hierve a 118 °C; el éster, sin O–H, a solo 32 °C." },
    { f: "C₄H₈O₂", t: "Ácido butanoico", d: [["ácido butanoico", "CCCC(=O)O", "—", 163.5], ["ácido 2-metilpropanoico", "CC(C)C(=O)O", "de cadena", 154.5], ["etanoato de etilo", "CC(=O)OCC", "de función", 77.1], ["propanoato de metilo", "CCC(=O)OC", "de función", 79.8], ["metanoato de propilo", "C(=O)OCCC", "de función", 80.8], ["metanoato de isopropilo", "C(=O)OC(C)C", "de función", 68.0]], nota: "Dos ácidos (isómeros de cadena) y cuatro ésteres: los ésteres hierven a 70–80 °C (sin puentes de H) y los ácidos a más de 150 °C." },
    { f: "C₄H₉Cl", t: "Clorobutano", d: [["1-clorobutano", "CCCCCl", "—", 78.4], ["2-clorobutano", "CCC(C)Cl", "de posición", 68.3], ["1-cloro-2-metilpropano", "ClCC(C)C", "de cadena", 68.5], ["2-cloro-2-metilpropano", "CC(C)(C)Cl", "de cadena y posición", 51.0]], nota: "Cuatro derivados halogenados: el halógeno en C1 o C2 de la cadena de butano, o sobre la cadena ramificada del isobutano." }
  ];
  B.w.q7_isomeria = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Isómeros: la misma fórmula, estructuras distintas");
    cuerpo.innerHTML = '<div data-form class="chips"></div><div data-iso class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><div class="q7-tabla"></div><p class="w-pie"></p>';
    var st = { g: 3, k: 0 }, g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 210, limpio: true, etiqueta: "Isómero" }), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".q7-tabla");
    function formulaDe(smi) { return O.formulaMolecular(O.cuentaGrafo(O.grafoDeSmiles(smi))); }
    function pinta() {
      var G = O.ISOMEROS[st.g], x = G.d[Math.min(st.k, G.d.length - 1)], graf = O.grafoDeSmiles(x[1]), f = O.formulaMolecular(O.cuentaGrafo(graf));
      O.dibujaGrafo(g, graf, { min: 1.7 });
      var todas = G.d.every(function (y) { return formulaDe(y[1]) === f; });
      lectura.innerHTML = U.lec("Isómero", "<span class='q7-nombre'>" + x[0] + "</span>", "ok ancho") + U.lec("Fórmula molecular", f, "red") + U.lec("Relación con el primero", x[2], "pen") + U.lec("Punto de ebullición", fmt(x[3], 1) + " °C", "") +
        U.lec("Isómeros de esta fórmula (acíclicos)", G.d.length + " · ¿todos con la misma fórmula? " + (todas ? "sí ✓" : "no ✗"), "ancho");
      var mx = Math.max.apply(null, G.d.map(function (y) { return y[3]; })), mn = Math.min.apply(null, G.d.map(function (y) { return y[3]; })), rg = (mx - mn) || 1;
      tabla.innerHTML = G.d.map(function (y, j) { return "<div class='q4-fila q7-hf" + (j === st.k ? " q5-sel" : "") + "'><span>" + y[0] + "</span><span class='q4-bar' style='width:" + (8 + 92 * (y[3] - mn) / rg) + "%;background:" + (j === st.k ? "var(--red)" : "var(--ink-faint)") + "'></span><span class='q4-num'>" + fmt(y[3], 1) + " °C</span></div>"; }).join("");
      pie.innerHTML = G.nota;
    }
    function fichasIso() { var G = O.ISOMEROS[st.g]; U.fichas(cuerpo.querySelector("[data-iso]"), G.d.map(function (y, i) { return { k: String(i), t: y[0] }; }), String(st.k), function (k) { st.k = +k; pinta(); }); }
    U.fichas(cuerpo.querySelector("[data-form]"), O.ISOMEROS.map(function (G, i) { return { k: String(i), t: G.f }; }), String(st.g), function (k) { st.g = +k; st.k = 0; fichasIso(); pinta(); });
    fichasIso(); pinta();
  };

  // ------------------------------------------------------------
  // Volcado para la verificación independiente (Node): moléculas al azar (semilla fija) con nombre, fórmula y masa,
  // todas las reacciones del simulador con sus productos y los combustibles con sus coeficientes
  // ------------------------------------------------------------
  O.volcar = function () {
    var sem = 12345;
    function azar() { sem = (sem * 1103515245 + 12345) & 0x7fffffff; return sem / 0x7fffffff; }
    function entero(a, b) { return a + Math.floor(azar() * (b - a + 1)); }
    var tipos = ["metil", "etil", "cloro", "bromo", "fluoro", "yodo"], grupos = ["", "", "ol", "al", "ona", "oico", "amina"], banco = [], rech = [], intentos = 0;
    while (banco.length < 1500 && intentos++ < 20000) {
      var n = entero(1, 8), enl = [], i, m;
      for (i = 1; i < n; i++) { var r = azar(); enl.push(r < 0.78 ? 1 : r < 0.94 ? 2 : 3); }
      var g = grupos[entero(0, grupos.length - 1)], pos = 1;
      if (g === "ona") pos = n >= 3 ? entero(2, n - 1) : 1; else if (g === "al" || g === "oico") pos = azar() < 0.5 ? 1 : n; else if (g) pos = entero(1, n);
      var sus = [], k, ns = entero(0, 3);
      for (k = 0; k < ns; k++) sus.push({ p: entero(1, n), t: tipos[entero(0, tipos.length - 1)] });
      m = { n: n, enl: enl, grupo: g, pos: pos, sus: sus };
      if (O.analiza(m).errores.length) { if (rech.length < 600) rech.push(m); continue; }
      var c = O.cuenta(m);
      banco.push({ m: m, nombre: O.nombrar(m), cuenta: c, masa: O.masa(c), insat: O.insaturaciones(c), H: O.analiza(m).H });
    }
    var reac = O.todasLasReacciones().map(function (x) {
      function cu(mm) { return mm ? O.cuenta(mm) : null; }
      return { tipo: x.tipo, m: x.m || null, nombreM: x.m ? O.nombrar(x.m) : null, cuentaM: cu(x.m), reactivo: x.reactivo || null, hal: x.hal || null, c: x.c || null, eq: x.eq || null, prod: x.prod || null, cuentaP: cu(x.prod), nombre: x.nombre || null,
        clase: x.clase || null, ald: x.ald || null, acido: x.acido || null, cetona: x.cetona || null, coef: x.coef || null, n: x.n || null, mm: x.m && x.n ? null : null, formula: x.formula || null, smiles: x.smiles || null, empate: x.empate || false };
    });
    var comb = O.REAC.combustibles.map(function (m, i) { var c = O.cuenta(m); return { m: m, nombre: O.nombrar(m), cuenta: c, r: O.reacComb(c), dh: O.REAC.dhc[i], masa: O.masa(c) }; });
    var iso = O.ISOMEROS.map(function (G) { return { f: G.f, d: G.d.map(function (x) { var gr = O.grafoDeSmiles(x[1]); return { nombre: x[0], smiles: x[1], tipo: x[2], pe: x[3], formula: O.formulaMolecular(O.cuentaGrafo(gr)), cuenta: O.cuentaGrafo(gr) }; }) }; });
    var serie = {}; Object.keys(O.SERIES).forEach(function (k) { var S = O.SERIES[k]; serie[k] = { n0: S.n0, pe: S.pe, filas: S.pe.map(function (pe, i) { var n = S.n0 + i, c = S.cuenta(n); return { n: n, nombre: S.nombre(n), cuenta: c, masa: masaDeC(c), estado: O.estadoA25(k, n) }; }) }; });
    function masaDeC(c) { return O.masa({ C: c.C, H: c.H, O: c.O, N: 0, F: 0, Cl: 0, Br: 0, I: 0 }); }
    var quiral = O.QUIRAL.map(function (x) { var gr = O.grafoDeSmiles(x.s); return { t: x.t, s: x.s, q: O.carbonosQuirales(gr).length, formula: O.formulaMolecular(O.cuentaGrafo(gr)) }; });
    var pol = O.POLIMEROS.map(function (p) { return { mon: p.mon, smiles: p.smiles, cuenta: p.cuenta, masa: O.masa(Object.assign({ C: 0, H: 0, O: 0, N: 0, F: 0, Cl: 0, Br: 0, I: 0 }, p.cuenta)), grafo: p.smiles ? O.cuentaGrafo(O.grafoDeSmiles(p.smiles)) : null }; });
    var idh = O.IDH_EJEMPLOS.map(function (e) { return { t: e.t, C: e.C, H: e.H, N: e.N, X: e.X, O: e.O, idh: O.idh(e), lectura: O.idhLectura(O.idh(e)) }; });
    var comb2 = O.REAC.combustibles.map(function (m, i) { var d = O.combustionDatos(i, 1000); return { i: i, M: d.M, n: d.n, nO2: d.nO2, nCO2: d.nCO2, nH2O: d.nH2O, E: d.E, co2PorMJ: d.co2PorMJ }; });
    return { banco: banco, rechazadas: rech, reacciones: reac, comb: comb, dhc: O.REAC.dhc, RAIZ: O.RAIZ, isomeros: iso, series: serie, quiral: quiral, polimeros: pol, idh: idh, comb1kg: comb2, rx: O.RX_TIPOS.length };
  };
})(window);
