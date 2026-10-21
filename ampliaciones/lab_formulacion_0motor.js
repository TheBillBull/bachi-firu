/* ============================================================
   Bachi para Firu · motor de formulación y nomenclatura inorgánica (Física y Química I, tema 3)
   B.lab.formulacion: tablas de elementos y números de oxidación, y un catálogo de compuestos
   (óxidos, peróxidos, hidróxidos, hidruros, hidrácidos, oxoácidos, sales binarias, oxisales, sales
   ácidas e iones) con su fórmula y sus nombres en nomenclatura SISTEMÁTICA (IUPAC 2005, prefijos),
   de STOCK (números romanos) y TRADICIONAL (-oso/-ico, hipo-/per-).
   El motor no toca el DOM: se puede comprobar aparte (Node). Los simuladores (q3_*) están en lab_formulacion_1base.js y lab_formulacion_2juegos.js.
   Convención de cada registro: { f: fórmula en ASCII ("Fe2(SO4)3"), fam, sist: [...], stock: [...], trad: [...], oxs, niv }
   (en cada lista de nombres, el primero es el nombre «de libro»; los demás son variantes admitidas).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  B.lab = B.lab || {};
  var F = B.lab.formulacion = {};

  // ------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------
  var PR = ["", "mono", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa", "nona", "deca"];
  var PB = ["", "", "bis", "tris", "tetrakis", "pentakis", "hexakis", "heptakis"];
  var ROM = ["0", "I", "II", "III", "IV", "V", "VI", "VII"];
  var PRO = [null, "monóxido", "dióxido", "trióxido", "tetraóxido", "pentaóxido", "hexaóxido", "heptaóxido", "octaóxido"];
  var PROE = { 4: "tetróxido", 5: "pentóxido", 6: "hexóxido", 7: "heptóxido", 8: "octóxido" };
  function pr(n) { return n === 1 ? "" : PR[n]; }                    // prefijo multiplicador sin «mono»
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function uniq(a) { var o = [], i; for (i = 0; i < a.length; i++) if (o.indexOf(a[i]) < 0) o.push(a[i]); return o; }
  var SB = "₀₁₂₃₄₅₆₇₈₉", SP = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "+": "⁺", "-": "⁻" };
  F.ROM = ROM; F.PR = PR; F.PB = PB;
  F.sub = function (n) { return String(n).replace(/\d/g, function (d) { return SB.charAt(+d); }); };
  F.sup = function (n) { return String(n).replace(/[\d+-]/g, function (d) { return SP[d]; }); };
  // "Fe2(SO4)3" → "Fe₂(SO₄)₃"
  F.pintar = function (f) { return String(f).replace(/(\d+)/g, function (d) { return F.sub(d); }); };
  // ion: símbolo y carga → "Fe³⁺", "SO₄²⁻"
  F.pintarIon = function (sym, q) { var a = Math.abs(q); return F.pintar(sym) + F.sup((a > 1 ? a : "") + (q > 0 ? "+" : "-")); };
  F.html = function (r) { return r.ion ? F.pintarIon(r.sym, r.q) : F.pintar(r.f); };
  function poli(s) { return !/^[A-Z][a-z]?$/.test(s); }            // ¿grupo poliatómico? (OH, SO4, NH4, O2…)
  function mk(s, n) { return n === 1 ? s : (poli(s) ? "(" + s + ")" + n : s + n); }

  // ------------------------------------------------------------
  // Metales: [símbolo, nombre, valencias en compuestos iónicos, adjetivo -oso, adjetivo -ico, extra]
  //   vo = valencias que solo se usan en óxidos (CrO₃, Mn₂O₇); siempre = escribir siempre el número romano
  //   niv: 1 = de uso muy habitual, 2 = menos frecuente
  // ------------------------------------------------------------
  var MET = {};
  [["Li", "litio", [1]], ["Na", "sodio", [1]], ["K", "potasio", [1]], ["Rb", "rubidio", [1], 0, 0, { niv: 2 }], ["Cs", "cesio", [1], 0, 0, { niv: 2 }],
   ["Be", "berilio", [2], 0, 0, { niv: 2 }], ["Mg", "magnesio", [2]], ["Ca", "calcio", [2]], ["Sr", "estroncio", [2], 0, 0, { niv: 2 }], ["Ba", "bario", [2]],
   ["Zn", "cinc", [2]], ["Cd", "cadmio", [2], 0, 0, { niv: 2 }], ["Ag", "plata", [1]], ["Al", "aluminio", [3]],
   ["Cu", "cobre", [1, 2], "cuproso", "cúprico"], ["Au", "oro", [1, 3], "auroso", "aúrico", { niv: 2 }], ["Fe", "hierro", [2, 3], "ferroso", "férrico"],
   ["Co", "cobalto", [2, 3], "cobaltoso", "cobáltico", { niv: 2 }], ["Ni", "níquel", [2, 3], "niqueloso", "niquélico", { niv: 2 }],
   ["Sn", "estaño", [2, 4], "estannoso", "estánnico", { niv: 2 }], ["Pb", "plomo", [2, 4], "plumboso", "plúmbico"], ["Hg", "mercurio", [2], "", "mercúrico", { niv: 2, siempre: true }],
   ["Pt", "platino", [2, 4], "platinoso", "platínico", { niv: 2 }],
   ["Cr", "cromo", [2, 3], 0, 0, { niv: 2, vo: [6] }], ["Mn", "manganeso", [2, 3, 4], 0, 0, { niv: 2, vo: [6, 7] }]
  ].forEach(function (a) {
    var m = { s: a[0], n: a[1], v: a[2], niv: 1, vo: [] };
    if (a[5]) for (var k in a[5]) m[k] = a[5][k];
    if (a[3] || a[4]) { m.t = {}; m.t[a[2][0]] = a[3]; m.t[a[2][a[2].length - 1]] = a[4]; if (a[2].length === 1) m.t[a[2][0]] = a[4]; }
    MET[m.s] = m;
  });
  F.MET = MET;
  F.METALES = Object.keys(MET);
  function adjetivo(m, v) { return m.t && m.t[v] ? m.t[v] : ""; }
  function multi(m) { return m.v.length + m.vo.length > 1 || !!m.siempre; }
  function numM(m, v) { return multi(m) ? "(" + ROM[v] + ")" : ""; }     // «(III)» solo si el metal tiene más de una valencia
  function todasV(m) { return m.v.concat(m.vo); }

  // ------------------------------------------------------------
  // No metales: nombre, terminación como anión, carga como anión (neg), números de oxidación positivos
  //   pos = todos los que usamos; ox = los que forman óxido; raiz = raíz en oxoaniones; hidr = «-hídrico»
  // ------------------------------------------------------------
  var NM = {
    H: { n: "hidrógeno", an: "hidruro", neg: 1, pos: [1], ox: [1] },
    B: { n: "boro", an: "boruro", neg: 3, pos: [3], ox: [3], raiz: "bor" },
    C: { n: "carbono", an: "carburo", neg: 4, pos: [2, 4], ox: [2, 4], raiz: "carbon", tox: { 2: "carbonoso" } },
    Si: { n: "silicio", an: "siliciuro", neg: 4, pos: [4], ox: [4], raiz: "silic" },
    N: { n: "nitrógeno", an: "nitruro", neg: 3, pos: [1, 2, 3, 4, 5], ox: [1, 2, 3, 4, 5], raiz: "nitr", sinTradOx: true },
    P: { n: "fósforo", an: "fosfuro", neg: 3, pos: [3, 5], ox: [3, 5], raiz: "fosf" },
    As: { n: "arsénico", an: "arseniuro", neg: 3, pos: [3, 5], ox: [3, 5], niv: 2 },
    Sb: { n: "antimonio", an: "antimoniuro", neg: 3, pos: [3, 5], ox: [3, 5], niv: 2 },
    O: { n: "oxígeno", an: "óxido", neg: 2 },
    S: { n: "azufre", an: "sulfuro", neg: 2, pos: [2, 4, 6], ox: [4, 6], raiz: "sulf", hidr: "sulfhídrico" },
    Se: { n: "selenio", an: "seleniuro", neg: 2, pos: [4, 6], ox: [4, 6], raiz: "selen", hidr: "selenhídrico", niv: 2 },
    Te: { n: "telurio", an: "telururo", neg: 2, pos: [4, 6], ox: [4, 6], raiz: "telur", hidr: "telurhídrico", niv: 2 },
    F: { n: "flúor", an: "fluoruro", neg: 1, hidr: "fluorhídrico" },
    Cl: { n: "cloro", an: "cloruro", neg: 1, pos: [1, 3, 5, 7], ox: [1, 3, 5, 7], raiz: "clor", hidr: "clorhídrico" },
    Br: { n: "bromo", an: "bromuro", neg: 1, pos: [1, 3, 5, 7], ox: [1, 3, 5, 7], raiz: "brom", hidr: "bromhídrico" },
    I: { n: "yodo", an: "yoduro", neg: 1, pos: [1, 3, 5, 7], ox: [1, 3, 5, 7], raiz: "yod", hidr: "yodhídrico" }
  };
  F.NM = NM;
  F.ORDEN = ["B", "Si", "C", "Sb", "As", "P", "N", "H", "Te", "Se", "S", "I", "Br", "Cl", "O", "F"];   // orden IUPAC 2005 (electronegatividad creciente)
  var raizRom = ROM;

  // Oxoácidos: [nº de H, X, nº de X, nº de O, nº de oxidación de X, adjetivo del ácido, nombre del anión (tradicional), nivel]
  var OXO = [
    [1, "Cl", 1, 1, 1, "hipocloroso", "hipoclorito", 1], [1, "Cl", 1, 2, 3, "cloroso", "clorito", 1], [1, "Cl", 1, 3, 5, "clórico", "clorato", 1], [1, "Cl", 1, 4, 7, "perclórico", "perclorato", 1],
    [1, "Br", 1, 1, 1, "hipobromoso", "hipobromito", 2], [1, "Br", 1, 2, 3, "bromoso", "bromito", 2], [1, "Br", 1, 3, 5, "brómico", "bromato", 2], [1, "Br", 1, 4, 7, "perbrómico", "perbromato", 2],
    [1, "I", 1, 1, 1, "hipoyodoso", "hipoyodito", 2], [1, "I", 1, 2, 3, "yodoso", "yodito", 2], [1, "I", 1, 3, 5, "yódico", "yodato", 2], [1, "I", 1, 4, 7, "peryódico", "peryodato", 2],
    [2, "S", 1, 3, 4, "sulfuroso", "sulfito", 1], [2, "S", 1, 4, 6, "sulfúrico", "sulfato", 1], [2, "S", 2, 7, 6, "disulfúrico", "disulfato", 2],
    [2, "Se", 1, 3, 4, "selenioso", "selenito", 2], [2, "Se", 1, 4, 6, "selénico", "selenato", 2],
    [2, "Te", 1, 3, 4, "teluroso", "telurito", 2], [2, "Te", 1, 4, 6, "telúrico", "telurato", 2],
    [1, "N", 1, 2, 3, "nitroso", "nitrito", 1], [1, "N", 1, 3, 5, "nítrico", "nitrato", 1],
    [3, "P", 1, 3, 3, "fosforoso", "fosfito", 1], [3, "P", 1, 4, 5, "fosfórico", "fosfato", 1], [1, "P", 1, 3, 5, "metafosfórico", "metafosfato", 2], [4, "P", 2, 7, 5, "difosfórico", "difosfato", 2],
    [2, "C", 1, 3, 4, "carbónico", "carbonato", 1],
    [2, "Si", 1, 3, 4, "silícico", "silicato", 2], [4, "Si", 1, 4, 4, "ortosilícico", "ortosilicato", 2],
    [3, "B", 1, 3, 3, "bórico", "borato", 2], [1, "B", 1, 2, 3, "metabórico", "metaborato", 2],
    [2, "Cr", 1, 4, 6, "crómico", "cromato", 2], [2, "Cr", 2, 7, 6, "dicrómico", "dicromato", 2],
    [2, "Mn", 1, 4, 6, "mangánico", "manganato", 2], [1, "Mn", 1, 4, 7, "permangánico", "permanganato", 2]
  ];
  var RAIZ = { Cl: "clor", Br: "brom", I: "yod", S: "sulf", Se: "selen", Te: "telur", N: "nitr", P: "fosf", C: "carbon", Si: "silic", B: "bor", Cr: "crom", Mn: "mangan" };
  var ESTIRP = { Cl: "clór", Br: "bróm", I: "yód", S: "sulfúr", Se: "selén", Te: "telúr", N: "nítr", P: "fosfór", C: "carbón", Si: "silíc", B: "bór", Cr: "cróm", Mn: "mangán" };   // «ácido trioxo…ico»
  var CRO = { Cr: 1, Mn: 1 };
  // adjetivo tradicional de los óxidos de no metales (el mismo que el del ácido «base»)
  OXO.forEach(function (o) {
    var e = NM[o[1]];
    if (!e || CRO[o[1]]) return;
    if (o[2] === 1 && !/^(meta|orto)/.test(o[5])) { e.tox = e.tox || {}; if (!e.tox[o[4]]) e.tox[o[4]] = o[5]; }
  });

  // ------------------------------------------------------------
  // Catálogo
  // ------------------------------------------------------------
  var CAT = [], IDX = {}, FAMS = {};
  F.FAM = {
    oxido: "Óxidos", peroxido: "Peróxidos", hidroxido: "Hidróxidos", hidruroM: "Hidruros metálicos", hidruroN: "Hidruros no metálicos", hidracido: "Hidrácidos",
    oxoacido: "Oxoácidos", salBin: "Sales binarias", oxisal: "Oxisales", salAcida: "Sales ácidas", ion: "Iones"
  };
  F.clave = function (s) { return B.normTexto(s, true); };
  function add(r) {
    r.niv = r.niv || 1;
    var k = F.clave(r.f);
    if (IDX[k]) { if (global.console) console.warn("fórmula repetida en el catálogo:", r.f); return null; }
    IDX[k] = r; CAT.push(r); (FAMS[r.fam] = FAMS[r.fam] || []).push(r);
    return r;
  }
  function nv(m) { return m.niv || 1; }

  // Nombre de un anión simple con prefijo: «dicloruro», «trióxido»…  (varias variantes si las hay)
  function anP(an, n, monoCanon) {
    if (n === 1) { var con = an === "óxido" ? "monóxido" : "mono" + an; return monoCanon ? [con, an] : [an, con]; }
    if (an === "óxido") return uniq([PRO[n]].concat(PROE[n] ? [PROE[n]] : []));
    return [pr(n) + an];
  }
  function sistBin(an, nx, cat, nm, monoCanon) {
    return anP(an, nx, monoCanon).map(function (a) { return a + " de " + pr(nm) + cat; });
  }
  function conNum(m, v) { return numM(m, v); }

  // --- óxidos y peróxidos, hidróxidos, hidruros, sales binarias de metales: generados por cruce de valencias
  function iónicoMetal(fam, m, v, X, a, f, oxs, extra) {      // X: fórmula del grupo aniónico; a: carga (valor absoluto)
    var g = gcd(v, a), nm = a / g, nx = v / g, mon = m.s;
    var r = { fam: fam, f: mk(mon, nm) + mk(X, nx), cat: m.s, v: v, nm: nm, nx: nx, a: a, an: X, niv: nv(m), oxs: oxs(nm, nx) };
    for (var k in extra) r[k] = extra[k];
    return r;
  }
  function nombresMetal(r, m, anion, tradAn, opts) {
    // anion: nombre del anión (óxido, cloruro, hidróxido…), con prefijos en la sistemática
    var v = r.v, num = conNum(m, v), adj = adjetivo(m, v);
    r.sist = opts.sist;
    r.stock = [anion + " de " + m.n + num].concat(num ? [] : [anion + " de " + m.n + "(" + ROM[v] + ")"]);
    r.trad = adj ? [tradAn + " " + adj] : (multi(m) ? [] : [anion + " de " + m.n]);
    return r;
  }

  // Óxidos de metales
  F.METALES.forEach(function (s) {
    var m = MET[s];
    todasV(m).forEach(function (v) {
      var r = iónicoMetal("oxido", m, v, "O", 2, "", function (nm, nx) { return [[s, nm, v], ["O", nx, -2]]; }, { tipo: "metal" });
      if (m.vo.indexOf(v) >= 0) r.niv = 2;
      nombresMetal(r, m, "óxido", "óxido", { sist: sistBin("óxido", r.nx, m.n, r.nm, false) });
      add(r);
    });
  });
  // Óxidos de no metales
  Object.keys(NM).forEach(function (s) {
    var e = NM[s];
    if (!e.ox) return;
    e.ox.forEach(function (v) {
      var g = gcd(v, 2), nx = v / g, nm = 2 / g;
      var r = { fam: "oxido", f: (s === "H" ? "H" : s) + (nm > 1 ? nm : "") + "O" + (nx > 1 ? nx : ""), tipo: "nometal", cat: s, v: v, nm: nm, nx: nx, a: 2,
        niv: ({ C: 1, S: 1, N: 1, P: 1, H: 1 }[s] ? 1 : 2), oxs: [[s, nm, v], ["O", nx, -2]] };
      if (s === "H") r.f = "H2O";
      r.sist = sistBin("óxido", nx, e.n, nm, true);
      if (s === "H") r.sist = ["óxido de dihidrógeno", "monóxido de dihidrógeno", "agua"];
      r.stock = [s === "H" ? "óxido de hidrógeno" : "óxido de " + e.n + (e.pos.length > 1 ? "(" + ROM[v] + ")" : "")];
      if (e.pos.length === 1 && s !== "H") r.stock.push("óxido de " + e.n + "(" + ROM[v] + ")");
      var adj = e.tox && !e.sinTradOx ? e.tox[v] : null;
      r.trad = s === "H" ? ["agua"] : (adj ? ["óxido " + adj] : []);
      add(r);
    });
  });

  // Peróxidos (grupo O₂, valencia −2; no se simplifica el grupo)
  [["H", 1, 1], ["Li", 1, 1], ["Na", 1, 1], ["K", 1, 1], ["Rb", 1, 2], ["Cs", 1, 2], ["Mg", 2, 1], ["Ca", 2, 1], ["Sr", 2, 2], ["Ba", 2, 1], ["Zn", 2, 1], ["Cd", 2, 2], ["Ag", 1, 1], ["Cu", 1, 2], ["Cu", 2, 2], ["Hg", 2, 2]].forEach(function (a) {
    var s = a[0], v = a[1], m = s === "H" ? { s: "H", n: "hidrógeno", v: [1], vo: [], niv: 1 } : MET[s];
    var g = gcd(v, 2), nm = 2 / g, nx = v / g;
    var r = { fam: "peroxido", f: mk(s, nm) + mk("O2", nx), cat: s, v: v, nm: nm, nx: nx, a: 2, an: "O2", niv: a[2], oxs: [[s, nm, v], ["O", 2 * nx, -1]] };
    r.sist = ["dióxido de " + pr(nm) + m.n];
    var num = s === "H" ? "" : conNum(m, v), adj = s === "H" ? "" : adjetivo(m, v);
    r.stock = ["peróxido de " + m.n + num];
    if (!num && s !== "H") r.stock.push("peróxido de " + m.n + "(" + ROM[v] + ")");
    r.trad = adj ? ["peróxido " + adj] : (s !== "H" && multi(m) ? [] : ["peróxido de " + m.n]);
    add(r);
  });
  // Hidróxidos
  F.METALES.forEach(function (s) {
    var m = MET[s];
    todasV(m).forEach(function (v) {
      var r = iónicoMetal("hidroxido", m, v, "OH", 1, "", function (nm, nx) { return [[s, nm, v], ["O", nx, -2], ["H", nx, 1]]; }, {});
      r.sist = anP("hidróxido", r.nx, false).map(function (a) { return a + " de " + pr(r.nm) + m.n; });
      nombresMetal(r, m, "hidróxido", "hidróxido", { sist: r.sist });
      if (m.vo.indexOf(v) >= 0) return;               // Cr(VI), Mn(VII) no forman hidróxido
      add(r);
    });
  });
  // Hidruros metálicos (H⁻)
  F.METALES.forEach(function (s) {
    var m = MET[s];
    m.v.forEach(function (v) {
      var r = iónicoMetal("hidruroM", m, v, "H", 1, "", function (nm, nx) { return [[s, nm, v], ["H", nx, -1]]; }, {});
      r.sist = r.nx === 1 ? ["hidruro de " + pr(r.nm) + m.n] : [pr(r.nx) + "hidruro de " + pr(r.nm) + m.n];
      nombresMetal(r, m, "hidruro", "hidruro", { sist: r.sist });
      add(r);
    });
  });

  // Hidruros no metálicos (grupos 13–15) y agua queda en los óxidos
  [["N", "NH3", 3, "azano", "amoniaco"], ["P", "PH3", 3, "fosfano", "fosfina"], ["As", "AsH3", 3, "arsano", "arsina"], ["Sb", "SbH3", 3, "estibano", "estibina"],
   ["C", "CH4", 4, "metano", "metano"], ["Si", "SiH4", 4, "silano", "silano"], ["B", "BH3", 3, "borano", "borano"]].forEach(function (a) {
    var e = NM[a[0]];
    add({ fam: "hidruroN", f: a[1], cat: a[0], nx: a[2], niv: a[0] === "N" || a[0] === "C" ? 1 : 2, oxs: [[a[0], 1, -a[2]], ["H", a[2], 1]],
      sist: uniq([a[3], pr(a[2]) + "hidruro de " + e.n]), stock: [], trad: uniq([a[4]]) });
  });

  // Hidrácidos (HX, H₂X): en estado gas «cloruro de hidrógeno»; en disolución acuosa «ácido clorhídrico»
  ["F", "Cl", "Br", "I", "S", "Se", "Te"].forEach(function (s) {
    var e = NM[s], n = e.neg;
    add({ fam: "hidracido", f: "H" + (n > 1 ? n : "") + s, cat: s, nh: n, niv: NM[s].niv || 1, oxs: [["H", n, 1], [s, 1, -n]],
      sist: [e.an + " de " + pr(n) + "hidrógeno"], stock: [e.an + " de hidrógeno"], trad: ["ácido " + e.hidr] });
  });

  // Sales binarias de metal y no metal
  var ANBIN = ["F", "Cl", "Br", "I", "S", "Se", "Te", "N", "P", "As"];
  F.METALES.forEach(function (s) {
    var m = MET[s];
    m.v.forEach(function (v) {
      ANBIN.forEach(function (x) {
        var e = NM[x];
        var r = iónicoMetal("salBin", m, v, x, e.neg, "", function (nm, nx) { return [[s, nm, v], [x, nx, -e.neg]]; }, { an: x, tipo: "metal" });
        r.niv = Math.max(nv(m), e.niv || 1, x === "N" || x === "P" ? 2 : 1);
        var sist = sistBin(e.an, r.nx, m.n, r.nm, false);
        nombresMetal(r, m, e.an, e.an, { sist: sist });
        add(r);
      });
    });
  });
  // algunos carburos y siliciuros que sí existen
  [["Al", 3, "C"], ["Be", 2, "C"], ["Mg", 2, "Si"]].forEach(function (a) {
    var m = MET[a[0]], e = NM[a[2]], v = a[1], g = gcd(v, e.neg), nm = e.neg / g, nx = v / g;
    var r = { fam: "salBin", f: mk(a[0], nm) + mk(a[2], nx), cat: a[0], v: v, nm: nm, nx: nx, an: a[2], a: e.neg, tipo: "metal", niv: 2, oxs: [[a[0], nm, v], [a[2], nx, -e.neg]] };
    nombresMetal(r, m, e.an, e.an, { sist: sistBin(e.an, nx, m.n, nm, false) });
    add(r);
  });
  // Sales binarias de dos no metales (el primero de la lista IUPAC va delante): [X, nº de oxidación de X, Y, nivel]
  [["B", 3, "F", 2], ["B", 3, "Cl", 1], ["B", 3, "Br", 2], ["B", 3, "N", 2], ["Si", 4, "C", 2], ["Si", 4, "Cl", 1], ["Si", 4, "F", 2], ["Si", 4, "S", 2], ["Si", 4, "N", 2],
   ["C", 4, "Cl", 1], ["C", 4, "F", 2], ["C", 4, "Br", 2], ["C", 4, "S", 1],
   ["Sb", 3, "Cl", 2], ["Sb", 5, "Cl", 2], ["Sb", 3, "S", 2], ["Sb", 5, "S", 2], ["As", 3, "Cl", 2], ["As", 3, "S", 2], ["As", 5, "S", 2], ["As", 5, "F", 2],
   ["P", 3, "Cl", 1], ["P", 5, "Cl", 1], ["P", 3, "Br", 2], ["P", 5, "F", 2], ["P", 5, "S", 2], ["N", 3, "F", 2], ["N", 3, "Cl", 2],
   ["Se", 6, "F", 2], ["Te", 6, "F", 2], ["S", 4, "F", 2], ["S", 6, "F", 1], ["S", 2, "Cl", 2],
   ["I", 1, "Br", 2], ["I", 1, "Cl", 2], ["I", 3, "Cl", 2], ["I", 5, "F", 2], ["I", 7, "F", 2], ["Br", 1, "Cl", 2], ["Br", 3, "F", 2], ["Br", 5, "F", 2],
   ["Cl", 1, "F", 2], ["Cl", 3, "F", 2], ["Cl", 5, "F", 2]].forEach(function (a) {
    var X = NM[a[0]], Y = NM[a[2]], v = a[1], g = gcd(v, Y.neg), nx = Y.neg / g, ny = v / g;
    var r = { fam: "salBin", f: mk(a[0], nx) + mk(a[2], ny), cat: a[0], v: v, nm: nx, nx: ny, an: a[2], a: Y.neg, tipo: "nometal", niv: a[3], oxs: [[a[0], nx, v], [a[2], ny, -Y.neg]] };
    r.sist = sistBin(Y.an, ny, X.n, nx, true);
    r.stock = [Y.an + " de " + X.n + (X.pos.length > 1 ? "(" + ROM[v] + ")" : "")];
    if (X.pos.length === 1) r.stock.push(Y.an + " de " + X.n + "(" + ROM[v] + ")");
    r.trad = [];
    add(r);
  });

  // Oxoácidos
  function oxAn(o) { return (o[3] === 1 ? "" : PR[o[3]]) + "oxido" + pr(o[2]) + RAIZ[o[1]] + "ato"; }   // «tetraoxidosulfato»
  function formAn(o) { return o[1] + (o[2] > 1 ? o[2] : "") + "O" + (o[3] > 1 ? o[3] : ""); }            // «SO4»
  F.OXO = OXO.map(function (o) { return { h: o[0], x: o[1], nx: o[2], no: o[3], ox: o[4], adj: o[5], an: o[6], niv: o[7], f: (o[0] > 1 ? "H" + o[0] : "H") + formAn(o), anf: formAn(o) }; });
  OXO.forEach(function (o) {
    var h = o[0], f = (h > 1 ? "H" + h : "H") + formAn(o);
    var oo = (o[3] === 1 ? "" : PR[o[3]]) + "oxo" + pr(o[2]) + ESTIRP[o[1]] + "ico(" + ROM[o[4]] + ")";
    add({ fam: "oxoacido", f: f, cat: o[1], ox: o[4], nh: h, nx: o[2], no: o[3], niv: o[7], oxs: [["H", h, 1], [o[1], o[2], o[4]], ["O", o[3], -2]],
      sist: [oxAn(o) + " de " + pr(h) + "hidrógeno"],
      stock: [oxAn(o) + "(" + ROM[o[4]] + ") de hidrógeno", "ácido " + oo],
      trad: ["ácido " + o[5]] });
  });

  // Cationes (para las sales)
  var CATS = [];
  F.METALES.forEach(function (s) { MET[s].v.forEach(function (v) { CATS.push({ s: s, v: v, m: MET[s] }); }); });
  CATS.push({ s: "NH4", v: 1, m: { s: "NH4", n: "amonio", v: [1], vo: [], niv: 1 } });
  F.CATIONES = CATS;

  // Oxisales y sales ácidas
  function sal(c, an, a, fam, nameParts) {      // c = {s, v, m}; an = fórmula del anión; a = carga; nameParts = datos para los nombres
    var g = gcd(c.v, a), nm = a / g, na = c.v / g, m = c.m;
    var num = c.s === "NH4" ? "" : conNum(m, c.v), adj = c.s === "NH4" ? "" : adjetivo(m, c.v);
    var r = { fam: fam, f: mk(c.s, nm) + mk(an, na), cat: c.s, v: c.v, nm: nm, na: na, a: a, an: an, niv: Math.max(nv(m), nameParts.niv) };
    var metal = pr(nm) + m.n, grp = function (x) { return na === 1 ? x : PB[na] + "(" + x + ")"; };
    r.sist = [grp(nameParts.sist) + " de " + metal];
    r.stock = [nameParts.trad + " de " + m.n + num];
    if (nameParts.stock2) r.stock.push(grp1(nameParts.stock2) + " de " + m.n + num);
    if (!num && c.s !== "NH4") r.stock.push(nameParts.trad + " de " + m.n + "(" + ROM[c.v] + ")");
    var base = adj ? [nameParts.trad + " " + adj] : (c.s !== "NH4" && multi(m) ? [] : [nameParts.trad + " de " + m.n]);
    r.trad = base;
    if (adj) r.trad.push(r.stock[0]);
    (nameParts.tradExtra || []).forEach(function (t) { r.trad.push(t + (adj ? " " + adj : " de " + m.n)); });
    if (nameParts.sistExtra) r.sist = r.sist.concat(nameParts.sistExtra.map(function (t) { return grp(t) + " de " + metal; }));
    r.oxs = nameParts.oxs(nm, na, c);
    return r;
  }
  function grp1(x) { return x; }
  OXO.forEach(function (o) {
    var anf = formAn(o), a = o[0], X = o[1];
    CATS.forEach(function (c) {
      var r = sal(c, anf, a, "oxisal", { sist: oxAn(o), trad: o[6], stock2: oxAn(o) + "(" + ROM[o[4]] + ")", niv: o[7],
        oxs: function (nm, na, cc) { return [[cc.s, nm, cc.v], [X, o[2] * na, o[4]], ["O", o[3] * na, -2]]; } });
      add(r);
    });
    // sales ácidas: quedan h hidrógenos (1 ≤ h ≤ H−1)
    for (var h = 1; h < o[0]; h++) {
      if (o[1] === "Si" || o[1] === "B" || o[1] === "Se" || o[1] === "Te" || o[1] === "Mn" || (o[1] === "P" && (o[2] > 1 || o[4] === 3)) || (o[1] === "S" && o[2] > 1)) continue;
      var anA = (h > 1 ? "H" + h : "H") + anf, carga = o[0] - h, hp = pr(h) + "hidrogeno";
      var extras = [], tradEx = [];
      if (h === 1 && o[0] === 2) { tradEx.push(o[6] + " ácido"); if (X === "C" || X === "S") tradEx.push("bi" + o[6]); }
      else if (h === 1 && o[0] === 3) tradEx.push(o[6] + " monoácido");
      else if (h === 2 && o[0] === 3) tradEx.push(o[6] + " diácido");
      CATS.forEach(function (c) {
        var r = sal(c, anA, carga, "salAcida", { sist: hp + oxAn(o), trad: hp + o[6], stock2: null, niv: Math.max(2, o[7]), tradExtra: tradEx,
          oxs: function (nm, na, cc) { return [[cc.s, nm, cc.v], ["H", h * na, 1], [X, o[2] * na, o[4]], ["O", o[3] * na, -2]]; } });
        r.h = h;
        add(r);
      });
    }
  });
  // sales ácidas de hidrácidos: M(HS)ₙ
  ["S", "Se", "Te"].forEach(function (s) {
    var e = NM[s];
    CATS.forEach(function (c) {
      var r = sal(c, "H" + s, 1, "salAcida", { sist: "hidrogeno" + e.an, trad: "hidrogeno" + e.an, stock2: null, niv: 2, tradExtra: [e.an + " ácido", "bi" + e.an],
        oxs: function (nm, na, cc) { return [[cc.s, nm, cc.v], ["H", na, 1], [s, na, -2]]; } });
      r.h = 1; r.hidra = true;
      add(r);
    });
  });

  // Iones: cationes monoatómicos, NH₄⁺, H₃O⁺; aniones simples y poliatómicos
  function ion(sym, q, nombres, niv, oxs, extra) {
    var r = { fam: "ion", ion: true, sym: sym, q: q, f: sym + (Math.abs(q) > 1 ? Math.abs(q) : "") + (q > 0 ? "+" : "-"), niv: niv, oxs: oxs, sist: nombres[0], stock: nombres[1], trad: nombres[2] };
    if (extra) for (var k in extra) r[k] = extra[k];
    return add(r);
  }
  function cargaTxt(q) { return "(" + Math.abs(q) + (q > 0 ? "+" : "−") + ")"; }
  CATS.forEach(function (c) {
    var m = c.m, v = c.v, nh = c.s === "NH4", num = nh ? "" : conNum(m, v), adj = nh ? "" : adjetivo(m, v), s;
    if (nh) s = [["ion amonio", "catión amonio"], ["ion amonio", "catión amonio"], ["ion amonio", "catión amonio"]];
    else s = [uniq(["ion " + m.n + cargaTxt(v), "catión " + m.n + cargaTxt(v)].concat(num ? [] : ["ion " + m.n, "catión " + m.n])),
      uniq(["catión " + m.n + num, "ion " + m.n + num].concat(num ? [] : ["catión " + m.n + "(" + ROM[v] + ")"])),
      adj ? ["ion " + adj, "catión " + adj] : (multi(m) ? [] : ["ion " + m.n, "catión " + m.n])];
    ion(c.s, v, s, nv(m), [[c.s, 1, v]], { tipo: "cation" });
  });
  ion("H3O", 1, [["ion oxonio", "catión oxonio", "ion hidronio", "catión hidronio"], ["ion oxonio", "catión oxonio", "ion hidronio", "catión hidronio"], ["ion hidronio", "catión hidronio", "ion oxonio"]], 2, [["H", 3, 1], ["O", 1, -2]], { tipo: "cation" });
  ["F", "Cl", "Br", "I", "S", "Se", "Te", "N", "P", "As", "H", "O", "C", "Si", "B"].forEach(function (x) {
    var e = NM[x], q = x === "H" ? 1 : e.neg, nom = e.an;
    ion(x, -q, [["ion " + nom, "anión " + nom], ["ion " + nom, "anión " + nom], ["ion " + nom, "anión " + nom]], x === "C" || x === "Si" || x === "B" || x === "As" || x === "Se" || x === "Te" ? 2 : 1, [[x, 1, -q]], { tipo: "anion" });
  });
  ion("OH", -1, [["ion hidróxido", "anión hidróxido"], ["ion hidróxido", "anión hidróxido"], ["ion hidróxido", "anión hidróxido"]], 1, [["O", 1, -2], ["H", 1, 1]], { tipo: "anion" });
  ion("O2", -2, [["ion peróxido", "anión peróxido", "ion dióxido(2−)"], ["ion peróxido", "anión peróxido"], ["ion peróxido", "anión peróxido"]], 2, [["O", 2, -1]], { tipo: "anion" });
  OXO.forEach(function (o) {
    var anf = formAn(o), q = o[0];
    ion(anf, -q, [["ion " + oxAn(o) + cargaTxt(-q), "anión " + oxAn(o) + cargaTxt(-q), "ion " + o[6], "anión " + o[6]], ["ion " + o[6], "anión " + o[6]], ["ion " + o[6], "anión " + o[6]]], o[7], [[o[1], o[2], o[4]], ["O", o[3], -2]], { tipo: "anion" });
    for (var h = 1; h < o[0]; h++) {
      if (o[1] === "Si" || o[1] === "B" || o[1] === "Se" || o[1] === "Te" || o[1] === "Mn" || (o[1] === "P" && (o[2] > 1 || o[4] === 3)) || (o[1] === "S" && o[2] > 1)) continue;
      var anA = (h > 1 ? "H" + h : "H") + anf, hp = pr(h) + "hidrogeno";
      var nombre = hp + o[6];
      ion(anA, -(o[0] - h), [["ion " + hp + oxAn(o) + cargaTxt(-(o[0] - h)), "anión " + hp + oxAn(o) + cargaTxt(-(o[0] - h)), "ion " + nombre, "anión " + nombre], ["ion " + nombre, "anión " + nombre], ["ion " + nombre, "anión " + nombre]], 2, [["H", h, 1], [o[1], o[2], o[4]], ["O", o[3], -2]], { tipo: "anion" });
    }
  });
  ["S", "Se", "Te"].forEach(function (s) { var nombre = "hidrogeno" + NM[s].an; ion("H" + s, -1, [["ion " + nombre, "anión " + nombre], ["ion " + nombre, "anión " + nombre], ["ion " + nombre, "anión " + nombre]], 2, [["H", 1, 1], [s, 1, -2]], { tipo: "anion" }); });
  // aniones simples: el símbolo ya está en F.ANIONES por «ion»
  F.CATALOGO = CAT;
  F.porFam = function (fam) { return FAMS[fam] || []; };
  F.hallar = function (s) { return IDX[F.clave(String(s))] || null; };

  // ------------------------------------------------------------
  // Acceso a los nombres por sistema
  // ------------------------------------------------------------
  F.SISTEMAS = { sist: "sistemática", stock: "de stock", trad: "tradicional" };
  F.nombres = function (r, sis) { return (r && r[sis]) || []; };
  F.nombre = function (r, sis) { var l = F.nombres(r, sis); return l.length ? l[0] : null; };
  F.sistemasDe = function (r) { return ["sist", "stock", "trad"].filter(function (s) { return F.nombres(r, s).length; }); };
  // todos los nombres admitidos (cualquier sistema)
  F.todosNombres = function (r) { return uniq([].concat(r.sist || [], r.stock || [], r.trad || [])); };

  // Índice inverso nombre → compuestos (para diagnosticar errores)
  var INV = null;
  F.porNombre = function (txt) {
    if (!INV) {
      INV = {};
      CAT.forEach(function (r) { ["sist", "stock", "trad"].forEach(function (s) { F.nombres(r, s).forEach(function (n) { var k = B.normTexto(n); (INV[k] = INV[k] || []); if (INV[k].indexOf(r) < 0) INV[k].push(r); }); }); });
    }
    return INV[B.normTexto(txt)] || [];
  };
  // ¿qué sistema(s) del compuesto r contienen este nombre?
  F.sistemaDe = function (r, txt) {
    var k = B.normTexto(txt), o = [];
    ["sist", "stock", "trad"].forEach(function (s) { if (F.nombres(r, s).some(function (n) { return B.normTexto(n) === k; })) o.push(s); });
    return o;
  };
  F.compruebaNombre = function (r, sis, txt) {       // sis = "sist" | "stock" | "trad" | "any"
    var k = B.normTexto(txt);
    if (!k) return false;
    var l = sis === "any" ? F.todosNombres(r) : F.nombres(r, sis);
    return l.some(function (n) { return B.normTexto(n) === k; });
  };
  F.compruebaFormula = function (r, txt) { return F.clave(txt) === F.clave(r.f); };

  // ------------------------------------------------------------
  // Cruce de valencias (para el simulador y las explicaciones)
  //   cat = valencia del catión, an = valencia (valor absoluto) del anión o del grupo
  // ------------------------------------------------------------
  F.cruce = function (cat, an) {
    var g = gcd(cat, an);
    return { sinSimplificar: [an, cat], nCat: an / g, nAn: cat / g, g: g, simplifica: g > 1, carga: (an / g) * cat - (cat / g) * an };
  };
  F.mk = mk; F.gcd = gcd; F.pr = pr; F.poli = poli;
  F.formAn = formAn; F.oxAn = oxAn;

  // ------------------------------------------------------------
  // Números de oxidación de un compuesto, paso a paso: [[símbolo, nº de átomos, n.º de oxidación], …]
  // ------------------------------------------------------------
  F.sumaOx = function (r) { return r.oxs.reduce(function (a, t) { return a + t[1] * t[2]; }, 0); };

  // ------------------------------------------------------------
  // Muestreo para entrenadores: filtra por familia y nivel
  // ------------------------------------------------------------
  F.muestra = function (fams, niv, sis) {
    var lista = [];
    (fams && fams.length ? fams : Object.keys(F.FAM)).forEach(function (f) {
      (FAMS[f] || []).forEach(function (r) {
        if (niv === 1 && r.niv > 1) return;
        if (sis && sis !== "any" && !F.nombres(r, sis).length) return;
        lista.push(r);
      });
    });
    return lista;
  };

  // ------------------------------------------------------------
  // Volcado para la verificación independiente (herramientas/verificar_fyq1_t3.py)
  // ------------------------------------------------------------
  F.volcar = function () {
    return {
      catalogo: CAT.map(function (r) { return { f: r.f, fam: r.fam, sist: r.sist, stock: r.stock, trad: r.trad, oxs: r.oxs, niv: r.niv, q: r.ion ? r.q : 0 }; }),
      metales: Object.keys(MET).map(function (s) { return { s: s, n: MET[s].n, v: MET[s].v, vo: MET[s].vo, t: MET[s].t || null }; }),
      oxo: F.OXO
    };
  };
})(window);
