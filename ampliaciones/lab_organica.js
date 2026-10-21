/* ============================================================
   Bachi para Firu · laboratorio de química orgánica (Física y Química I, tema 7)
   motor B.lab.org (valencias, nombre IUPAC, fórmulas, dibujo) ·
   q7_constructor · q7_reto · q7_nombrar · q7_grupos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var O = B.lab.org = {};

  var RAIZ = ["", "met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec"];
  var MULT = ["", "", "di", "tri", "tetra", "penta", "hexa"];
  var SUST = { metil: { c: 1, h: 3 }, etil: { c: 2, h: 5 }, fluoro: { x: "F" }, cloro: { x: "Cl" }, bromo: { x: "Br" }, yodo: { x: "I" } };
  var GRP = { "": { etq: "" }, ol: { etq: "alcohol" }, al: { etq: "aldehído" }, ona: { etq: "cetona" }, oico: { etq: "ácido carboxílico" }, amina: { etq: "amina" } };
  var MASA = { C: 12.011, H: 1.008, O: 15.999, N: 14.007, F: 18.998, Cl: 35.45, Br: 79.904, I: 126.904 };
  O.SUST = SUST; O.GRP = GRP; O.RAIZ = RAIZ;

  // nombres comunes que conviene conocer
  O.COMUN = { "metano": "gas natural", "etanol": "alcohol etílico", "metanol": "alcohol metílico", "etanal": "acetaldehído", "metanal": "formaldehído", "propanona": "acetona",
    "ácido metanoico": "ácido fórmico", "ácido etanoico": "ácido acético", "eteno": "etileno", "etino": "acetileno", "propeno": "propileno", "metanamina": "metilamina", "etanamina": "etilamina",
    "2-metilpropano": "isobutano", "propan-2-ol": "alcohol isopropílico", "buta-1,3-dieno": "butadieno" };

  O.copia = function (m) { return { n: m.n, enl: m.enl.slice(), grupo: m.grupo || "", pos: m.pos || 1, sus: (m.sus || []).map(function (s) { return { p: s.p, t: s.t }; }) }; };
  function sub(n) { return U.sub(n); }

  // ------------------------------------------------------------
  // Valencias y validez de la cadena principal
  //   devuelve { errores, H (hidrógenos por carbono, 1-indexado) }
  // ------------------------------------------------------------
  O.analiza = function (m) {
    var n = m.n, g = m.grupo || "", pos = m.pos || 1, err = [], H = [0], i, s;
    if (n < 1 || n > 10) err.push("La cadena debe tener entre 1 y 10 carbonos.");
    var go = { ol: 1, al: 2, ona: 2, oico: 3, amina: 1 }[g] || 0;
    if ((g === "al" || g === "oico") && !(pos === 1 || pos === n)) err.push("El grupo " + (g === "al" ? "−CHO" : "−COOH") + " sólo puede estar en un extremo de la cadena.");
    if (g === "ona" && !(n >= 3 && pos >= 2 && pos <= n - 1)) err.push("La cetona (−CO−) necesita un carbono interior: cadena de 3 o más carbonos y posición entre 2 y " + (n - 1) + ".");
    if (g && (pos < 1 || pos > n)) err.push("La posición del grupo debe estar entre 1 y " + n + ".");
    for (i = 1; i <= n; i++) {
      var lig = (i > 1 ? m.enl[i - 2] : 0) + (i < n ? m.enl[i - 1] : 0), ns = 0;
      (m.sus || []).forEach(function (q) { if (q.p === i) ns++; });
      var h = 4 - lig - (g && pos === i ? go : 0) - ns;
      if (h < 0) err.push("El carbono " + i + " tendría más de 4 enlaces: cambia algún enlace múltiple, el grupo o un sustituyente.");
      if (g === "al" && pos === i && h < 1) err.push("En un aldehído el carbono −CHO conserva un hidrógeno: quita el sustituyente o el enlace múltiple de ese carbono.");
      H[i] = h;
    }
    (m.sus || []).forEach(function (q) { if (q.p < 1 || q.p > n) err.push("Un sustituyente está fuera de la cadena."); });
    // la cadena principal debe ser la más larga que contenga el grupo y todos los enlaces múltiples
    if (!err.length) (m.sus || []).forEach(function (q) {
      var L = SUST[q.t].c || 0; if (!L) return;
      [[0, n - q.p + 1], [1, q.p]].forEach(function (lado) {
        var adelante = lado[0] === 0, k = lado[1], contiene = true, j;
        if (g && !(adelante ? pos >= q.p : pos <= q.p)) contiene = false;
        for (j = 1; j < n; j++) if (m.enl[j - 1] > 1 && !(adelante ? j >= q.p : j + 1 <= q.p)) contiene = false;
        if (contiene && L + k > n) err.push("Hay una cadena más larga que contiene el grupo y los enlaces múltiples (a través del " + q.t + " de C" + q.p + "): la cadena principal debe ser la más larga.");
      });
    });
    return { errores: err.filter(function (e, k, a) { return a.indexOf(e) === k; }), H: H };
  };

  // ------------------------------------------------------------
  // Nombre IUPAC
  // ------------------------------------------------------------
  function cmp(a, b) { for (var i = 0; i < Math.max(a.length, b.length); i++) { if ((a[i] === undefined ? 1e9 : a[i]) !== (b[i] === undefined ? 1e9 : b[i])) return (a[i] === undefined ? 1e9 : a[i]) - (b[i] === undefined ? 1e9 : b[i]); } return 0; }
  function numerar(m, d) {          // d = 0: de C1 a Cn; d = 1: al revés
    var n = m.n, loc = function (i) { return d === 0 ? i : n + 1 - i; }, dobles = [], triples = [], i;
    for (i = 1; i < n; i++) { var l = Math.min(loc(i), loc(i + 1)); if (m.enl[i - 1] === 2) dobles.push(l); else if (m.enl[i - 1] === 3) triples.push(l); }
    var sus = (m.sus || []).map(function (q) { return { l: loc(q.p), t: q.t }; });
    var todos = dobles.concat(triples).sort(function (a, b) { return a - b; });
    var alf = sus.slice().sort(function (a, b) { return a.t < b.t ? -1 : a.t > b.t ? 1 : a.l - b.l; }).map(function (q) { return q.l; });
    return { grupo: m.grupo ? [loc(m.pos || 1)] : [], mult: todos, dobles: dobles.sort(function (a, b) { return a - b; }), triples: triples.sort(function (a, b) { return a - b; }), sus: sus.map(function (q) { return q.l; }).sort(function (a, b) { return a - b; }), alf: alf, susObj: sus, d: d };
  }
  function mejor(m) {
    var g = m.grupo || "";
    var cands = [numerar(m, 0), numerar(m, 1)];
    if (g === "al" || g === "oico") cands = cands.filter(function (c) { return c.grupo[0] === 1; });
    if (!cands.length) cands = [numerar(m, 0)];
    var claves = function (c) { return [c.grupo, c.mult, c.dobles, c.sus, c.alf]; };
    var best = cands[0];
    for (var i = 1; i < cands.length; i++) {
      var a = claves(cands[i]), b = claves(best), r = 0;
      for (var k = 0; k < a.length && r === 0; k++) r = cmp(a[k], b[k]);
      if (r < 0) best = cands[i];
    }
    return best;
  }
  O.nombrarConNumeracion = function (m, num) {
    var n = m.n, g = m.grupo || "", dobles = num.dobles, triples = num.triples, nsus = (m.sus || []).length;
    var partes = [], stem = RAIZ[n], txt;
    var hayMult = dobles.length + triples.length > 0;
    if (!hayMult) partes = [{ r: "an" }];
    else {
      if (dobles.length) partes.push({ locs: dobles, r: (dobles.length > 1 ? MULT[dobles.length] : "") + "en" });
      if (triples.length) partes.push({ locs: triples, r: (triples.length > 1 ? MULT[triples.length] : "") + "in" });
    }
    if (hayMult && partes[0].locs.length > 1) stem += "a";
    var unaIns = dobles.length + triples.length === 1;
    var omitirUnsat = !g && unaIns && (n === 2 || (!nsus && n <= 3));
    txt = stem;
    partes.forEach(function (p) { txt += (p.locs && !omitirUnsat ? "-" + p.locs.join(",") + "-" : "") + p.r; });
    var locG = num.grupo[0], omitirG = !nsus && !hayMult && ((g === "ol" || g === "amina") && n <= 2 || (g === "ona" && n <= 4));
    var fin = { "": "o", ol: (omitirG ? "" : "-" + locG + "-") + "ol", amina: (omitirG ? "" : "-" + locG + "-") + "amina", ona: (omitirG ? "" : "-" + locG + "-") + "ona", al: "al", oico: "oico" }[g];
    txt += fin;
    // sustituyentes por orden alfabético con prefijos multiplicadores
    var por = {};
    num.susObj.forEach(function (q) { (por[q.t] = por[q.t] || []).push(q.l); });
    // metano, etano y eteno con un solo sustituyente no necesitan localizador (todas las posiciones son equivalentes)
    var sinLoc = n === 1 || (n === 2 && !g && nsus === 1);
    var pref = Object.keys(por).sort().map(function (t) { var l = por[t].sort(function (a, b) { return a - b; }); return (sinLoc ? "" : l.join(",") + "-") + MULT[l.length] + t; }).join("-");
    var nombre = pref + txt;
    if (g === "oico") nombre = "ácido " + nombre;
    return nombre;
  };
  O.nombrar = function (m) {
    if (O.analiza(m).errores.length) return null;
    return O.nombrarConNumeracion(m, mejor(m));
  };
  O.numeracion = function (m) { return mejor(m); };

  // ------------------------------------------------------------
  // Fórmulas
  // ------------------------------------------------------------
  O.cuenta = function (m) {
    var A = O.analiza(m), g = m.grupo || "", c = { C: m.n, H: 0, O: 0, N: 0, F: 0, Cl: 0, Br: 0, I: 0 }, i;
    for (i = 1; i <= m.n; i++) c.H += A.H[i];
    if (g === "ol") { c.O += 1; c.H += 1; } else if (g === "al" || g === "ona") c.O += 1; else if (g === "oico") { c.O += 2; c.H += 1; } else if (g === "amina") { c.N += 1; c.H += 2; }
    (m.sus || []).forEach(function (q) { var s = SUST[q.t]; if (s.c) { c.C += s.c; c.H += s.h; } else c[s.x] += 1; });
    return c;
  };
  O.formulaMolecular = function (c) {
    var t = "C" + (c.C > 1 ? sub(c.C) : "") + (c.H ? "H" + (c.H > 1 ? sub(c.H) : "") : "");
    ["Br", "Cl", "F", "I", "N", "O"].forEach(function (e) { if (c[e]) t += e + (c[e] > 1 ? sub(c[e]) : ""); });
    return t;
  };
  O.masa = function (c) { var s = 0; Object.keys(c).forEach(function (k) { s += c[k] * MASA[k]; }); return s; };
  O.insaturaciones = function (c) { return (2 * c.C + 2 + c.N - c.H - c.F - c.Cl - c.Br - c.I) / 2; };
  O.familia = function (m) {
    var g = m.grupo || "", nd = 0, nt = 0, i, hal = (m.sus || []).some(function (q) { return SUST[q.t].x; });
    for (i = 0; i < m.n - 1; i++) { if (m.enl[i] === 2) nd++; else if (m.enl[i] === 3) nt++; }
    if (g) return GRP[g].etq + (nd || nt ? " insaturado" : "");
    var base = nd && nt ? "enino" : nd > 1 ? "dieno" : nd ? "alqueno" : nt > 1 ? "diino" : nt ? "alquino" : "alcano";
    return hal ? "derivado halogenado (" + base + ")" : base;
  };
  O.condensada = function (m) {
    var A = O.analiza(m), g = m.grupo || "", pos = m.pos || 1, out = [], i, SIM = { 1: "−", 2: "=", 3: "≡" };
    for (i = 1; i <= m.n; i++) {
      var h = A.H[i], term = i === 1 || i === m.n, piezas = [], base;
      (m.sus || []).forEach(function (q) { if (q.p === i) piezas.push(q.t); });
      var cont = {}; piezas.forEach(function (t) { cont[t] = (cont[t] || 0) + 1; });
      var txt;
      if (g === "al" && pos === i) txt = "CH" + (h > 1 ? sub(h) : "") + "O";
      else if (g === "oico" && pos === i) txt = "C" + (h ? "H" + (h > 1 ? sub(h) : "") : "") + "OOH";
      else {
        base = "C" + (h ? "H" + (h > 1 ? sub(h) : "") : "");
        var extra = []; if (g === "ona" && pos === i) extra.push(["O", 1, true]); else if (g === "ol" && pos === i) extra.push(["OH", 1, true]); else if (g === "amina" && pos === i) extra.push(["NH" + sub(2), 1, true]);
        Object.keys(cont).sort().forEach(function (t) { var s = SUST[t]; extra.push([s.c ? (s.c === 1 ? "CH" + sub(3) : "CH" + sub(2) + "CH" + sub(3)) : s.x, cont[t], !s.c]); });
        if (extra.length === 1 && extra[0][2]) txt = base + extra[0][0] + (extra[0][1] > 1 ? sub(extra[0][1]) : "");
        else txt = base + extra.map(function (e) { return "(" + e[0] + ")" + (e[1] > 1 ? sub(e[1]) : ""); }).join("");
        if (g === "ona" && pos === i) txt = "CO";
      }
      out.push(txt);
      if (i < m.n) out.push(SIM[m.enl[i - 1]]);
    }
    // el grupo terminal se escribe a la derecha: CH₃−CH₂−CHO, CH₃−COOH, CH₃−CH₂−CH₂OH
    var soloX = !g && m.n > 1 && (m.sus || []).length > 0 && (m.sus || []).every(function (q) { return q.p === 1 && SUST[q.t].x; });
    if ((g && pos === 1 && m.n > 1 && g !== "ona") || soloX) out.reverse();
    return out.join("");
  };

  // ------------------------------------------------------------
  // Grafo molecular y dibujo esquelético (zigzag) en un B.Plot
  //   átomos {e, h}, enlaces {i, j, o}; sirve para cadenas con sustituyentes
  //   (grafoDeSpec) y para cualquier molécula acíclica escrita como SMILES simplificado
  // ------------------------------------------------------------
  var VAL = { C: 4, N: 3, O: 2, F: 1, Cl: 1, Br: 1, I: 1 };
  function hidrogenos(G) {
    G.a.forEach(function (x) { x.suma = 0; });
    G.b.forEach(function (e) { G.a[e.i].suma += e.o; G.a[e.j].suma += e.o; });
    G.a.forEach(function (x) { x.h = Math.max(0, VAL[x.e] - x.suma); });
  }
  // SMILES simplificado: átomos C N O F Cl Br I; enlaces - = #; ramas entre paréntesis; ~ = enlace simple que deja el siguiente grupo del mismo lado (cis)
  O.grafoDeSmiles = function (s) {
    var G = { a: [], b: [], main: null, num: {} }, i = 0, pila = [], prev = -1, ord = 1, cis = false;
    while (i < s.length) {
      var c = s.charAt(i), e;
      if (c === "(") { pila.push(prev); i++; continue; }
      if (c === ")") { prev = pila.pop(); i++; continue; }
      if (c === "-") { ord = 1; i++; continue; }
      if (c === "=") { ord = 2; i++; continue; }
      if (c === "#") { ord = 3; i++; continue; }
      if (c === "~") { ord = 1; cis = true; i++; continue; }
      e = c;
      if ((c === "C" && s.charAt(i + 1) === "l") || (c === "B" && s.charAt(i + 1) === "r")) { e = s.substr(i, 2); i++; }
      i++;
      G.a.push({ e: e });
      var k = G.a.length - 1;
      if (prev >= 0) G.b.push({ i: prev, j: k, o: ord, cis: cis });
      ord = 1; cis = false; prev = k;
    }
    hidrogenos(G);
    return G;
  };
  O.grafoDeSpec = function (m) {
    var G = { a: [], b: [], main: [], num: {} }, n = m.n, g = m.grupo || "", pos = m.pos || 1, i;
    function add(e) { G.a.push({ e: e }); return G.a.length - 1; }
    function enlace(i1, j1, o) { G.b.push({ i: i1, j: j1, o: o }); }
    for (i = 1; i <= n; i++) { G.main.push(add("C")); if (i > 1) enlace(i - 2, i - 1, m.enl[i - 2]); }
    if (g) {
      var c = pos - 1;
      if (g === "ol") enlace(c, add("O"), 1);
      else if (g === "amina") enlace(c, add("N"), 1);
      else if (g === "ona" || g === "al") enlace(c, add("O"), 2);
      else if (g === "oico") { enlace(c, add("O"), 2); enlace(c, add("O"), 1); }
    }
    (m.sus || []).forEach(function (q) {
      var s = SUST[q.t], c = q.p - 1;
      if (s.c) { var k = add("C"); enlace(c, k, 1); if (s.c === 2) enlace(k, add("C"), 1); } else enlace(c, add(s.x), 1);
    });
    hidrogenos(G);
    return G;
  };
  O.cuentaGrafo = function (G) {
    var c = { C: 0, H: 0, O: 0, N: 0, F: 0, Cl: 0, Br: 0, I: 0 };
    G.a.forEach(function (x) { c[x.e]++; c.H += x.h; });
    return c;
  };

  var LB = 1.1547;
  function rad(a) { return a * Math.PI / 180; }
  function difAng(a, b) { return Math.abs((((a - b) % 360) + 540) % 360 - 180); }     // distancia angular, 0..180
  function adyac(G) { var A = G.a.map(function () { return []; }); G.b.forEach(function (e, k) { A[e.i].push({ v: e.j, k: k }); A[e.j].push({ v: e.i, k: k }); }); return A; }
  function camino(G, A) {                           // el camino más largo del árbol (diámetro)
    function bfs(s) {
      var dist = {}, prev = {}, q = [s], last = s; dist[s] = 0;
      while (q.length) { var u = q.shift(); last = u; A[u].forEach(function (x) { if (dist[x.v] === undefined) { dist[x.v] = dist[u] + 1; prev[x.v] = u; q.push(x.v); } }); }
      return { last: last, prev: prev };
    }
    var r1 = bfs(0), r2 = bfs(r1.last), path = [], u = r2.last;
    while (u !== undefined) { path.push(u); u = r2.prev[u]; }
    return path.reverse();
  }
  // Coloca los átomos: el camino principal en zigzag (los enlaces triples y los alenos, rectos) y las ramas en el hueco más libre
  O.coloca = function (G) {
    var A = adyac(G), main = G.main && G.main.length ? G.main : camino(G, A), i;
    function orden(u, v) { var r = 1; A[u].forEach(function (x) { if (x.v === v) r = G.b[x.k].o; }); return r; }
    function esCis(u, v) { var r = false; A[u].forEach(function (x) { if (x.v === v && G.b[x.k].cis) r = true; }); return r; }
    var giros = [], signo = 1, hay = false;
    for (i = 1; i < main.length - 1; i++) {
      var o0 = orden(main[i - 1], main[i]), o1 = orden(main[i], main[i + 1]);
      if (o0 === 3 || o1 === 3 || (o0 === 2 && o1 === 2)) giros[i] = 0;
      else { if (!esCis(main[i], main[i + 1])) signo = -signo; giros[i] = signo * 60; hay = true; }
    }
    G.a.forEach(function (x) { x.dir = []; x.puesto = false; });
    var d = hay ? 30 : 0, x = 0, y = 0;
    G.a[main[0]].x = 0; G.a[main[0]].y = 0; G.a[main[0]].puesto = true;
    for (i = 0; i < main.length - 1; i++) {
      if (i > 0) d += giros[i];
      var u = main[i], v = main[i + 1];
      x += LB * Math.cos(rad(d)); y += LB * Math.sin(rad(d));
      G.a[v].x = x; G.a[v].y = y; G.a[v].puesto = true;
      G.a[u].dir.push(d); G.a[v].dir.push(d + 180);
    }
    function tam(u, padre) { var s = 1; A[u].forEach(function (z) { if (z.v !== padre) s += tam(z.v, u); }); return s; }
    function esSp(u) { var t = 0, dd = 0; A[u].forEach(function (z) { var o = G.b[z.k].o; if (o === 3) t++; else if (o === 2) dd++; }); return t > 0 || dd > 1; }
    var cola = main.slice();
    while (cola.length) {
      var p = cola.shift(), ap = G.a[p];
      var hijos = A[p].filter(function (z) { return !G.a[z.v].puesto; });
      hijos.sort(function (a1, b1) { return tam(b1.v, p) - tam(a1.v, p); });
      hijos.forEach(function (z) {
        var ex = ap.dir, cand = [], a;
        if (ex.length === 1 && esSp(p)) cand = [ex[0] + 180];
        else if (ex.length === 1) cand = [ex[0] + 120, ex[0] - 120];
        else for (a = 0; a < 360; a += 30) { if (ex.every(function (e) { return difAng(a, e) >= 55; })) cand.push(a); }
        if (!cand.length) for (a = 0; a < 360; a += 30) cand.push(a);
        var mejorA = null, mejorS = -1;
        cand.forEach(function (c1) {
          var qx = ap.x + LB * Math.cos(rad(c1)), qy = ap.y + LB * Math.sin(rad(c1)), sc = 1e9;
          G.a.forEach(function (o, k) { if (o.puesto && k !== p) sc = Math.min(sc, Math.hypot(o.x - qx, o.y - qy)); });
          sc = Math.round(sc * 100) / 100 + (ex.length ? Math.min.apply(null, ex.map(function (e) { return difAng(c1, e); })) / 1000 : 0);
          if (sc > mejorS + 1e-9) { mejorS = sc; mejorA = c1; }
        });
        var ch = G.a[z.v];
        ch.x = ap.x + LB * Math.cos(rad(mejorA)); ch.y = ap.y + LB * Math.sin(rad(mejorA)); ch.puesto = true; ch.dir.push(mejorA + 180); ap.dir.push(mejorA);
        cola.push(z.v);
      });
    }
    return G;
  };

  var COL = { O: "red", N: "pen", F: "ok", Cl: "ok", Br: "ok", I: "ok" };
  function etiqueta(at) {
    if (at.e === "C") return "";
    var t = at.e;
    if ((at.e === "O" || at.e === "N") && at.h > 0) t += "H" + (at.h > 1 ? sub(at.h) : "");
    return t;
  }
  // Dibuja el grafo en el B.Plot g. o.num = { índiceDeÁtomo: "texto" } para numerar la cadena
  O.dibujaGrafo = function (g, G, o) {
    o = o || {};
    O.coloca(G);
    var xs = G.a.map(function (t) { return t.x; }), ys = G.a.map(function (t) { return t.y; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var c = g.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj;
    var hw = (x1 - x0) / 2 + 0.95, hh = (y1 - y0) / 2 + 0.95, semi = Math.max(hh, hw * ph / pw, o.min || 1.75), ppu = ph / (2 * semi);
    g.limpiar(); g.rangoIso((x0 + x1) / 2, (y0 + y1) / 2, semi);
    if (G.a.length === 1) { g.texto(0, 0, G.a[0].e === "C" ? "CH" + (G.a[0].h > 1 ? sub(G.a[0].h) : "") : G.a[0].e, { ancla: "middle", dy: 6, clase: "pen" }); return; }
    G.b.forEach(function (e) {
      var p = G.a[e.i], q = G.a[e.j], dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      function corte(at, signo) {
        var t = etiqueta(at); if (!t) return 0;
        var len = t.replace(/[₀-₉]/g, "x").length;
        return (5 + Math.abs(ux) * len * 4.8 + Math.abs(uy) * 7) / ppu;
      }
      var s1 = corte(p, 1), s2 = corte(q, -1), ax = p.x + ux * s1, ay = p.y + uy * s1, bx = q.x - ux * s2, by = q.y - uy * s2;
      var offs = e.o === 1 ? [0] : e.o === 2 ? [-3.2 / ppu, 3.2 / ppu] : [-5.5 / ppu, 0, 5.5 / ppu];
      offs.forEach(function (of) { g.segmento(ax - uy * of, ay + ux * of, bx - uy * of, by + ux * of, { clase: "c-ink" }).setAttribute("stroke-width", 2.4); });
    });
    G.a.forEach(function (at) { var t = etiqueta(at); if (t) g.texto(at.x, at.y, t, { ancla: "middle", dy: 5, clase: COL[at.e] || "" }); });
    if (o.num) {
      var puestos = [], r = 17 / ppu;
      Object.keys(o.num).forEach(function (k) {
        var at = G.a[k], best = null, bs = -1, a;
        for (a = 0; a < 360; a += 30) {
          var lib = Math.min.apply(null, at.dir.map(function (e) { return difAng(a, e); }).concat([180]));
          if (lib < 45) continue;
          var px = at.x + r * Math.cos(rad(a)), py = at.y + r * Math.sin(rad(a)), sc = 1e9;
          G.a.forEach(function (z, j) { if (String(j) !== k) sc = Math.min(sc, Math.hypot(z.x - px, z.y - py) * 0.8); });
          puestos.forEach(function (z) { sc = Math.min(sc, Math.hypot(z[0] - px, z[1] - py)); });
          sc += lib / 1000;
          if (sc > bs) { bs = sc; best = [px, py]; }
        }
        if (!best) best = [at.x + r, at.y + r];
        puestos.push(best);
        g.texto(best[0], best[1], String(o.num[k]), { ancla: "middle", dy: 4, clase: "faint" });
      });
    }
  };
  O.dibuja = function (g, m, mostrarNum) {
    var G = O.grafoDeSpec(m), num = null;
    if (mostrarNum && !O.analiza(m).errores.length) { var nu = mejor(m); num = {}; for (var i = 1; i <= m.n; i++) num[i - 1] = nu.d === 0 ? i : m.n + 1 - i; }
    O.dibujaGrafo(g, G, { num: num });
  };

  // ------------------------------------------------------------
  // Interfaz del constructor (se reutiliza en el reto)
  // ------------------------------------------------------------
  var BONDS = ["−", "=", "≡"];
  function constructor(host, opts) {
    opts = opts || {};
    var st = { m: { n: 5, enl: [1, 1, 1, 1], grupo: "", pos: 1, sus: [] }, num: true, tipo: "metil" };
    host.innerHTML = '<div class="q7-pre chips" data-pre></div><div class="w-plot"></div><div class="lectura anch" data-lec></div><div class="q7-aviso" data-aviso></div>' +
      '<div class="q7-ctr"><div class="q7-fila"><label class="q7-lab">Carbonos de la cadena principal <b data-nv></b></label><input type="range" min="1" max="10" step="1" value="5" aria-label="Número de carbonos de la cadena principal"></div>' +
      '<div class="q7-fila"><span class="q7-lab">Enlaces entre carbonos <small>(toca para cambiar: simple, doble, triple)</small></span><div class="q7-bonds" data-bonds></div></div>' +
      '<div class="q7-fila"><span class="q7-lab">Grupo funcional principal</span><div class="chips" data-grp></div><label class="q7-sel">en el carbono <select data-gpos></select></label></div>' +
      '<div class="q7-fila"><span class="q7-lab">Sustituyentes</span><div class="chips" data-tsus></div><label class="q7-sel">en el carbono <select data-spos></select></label><button type="button" class="chip-btn" data-add>＋ Añadir</button><div class="q7-lista" data-lista></div></div></div>';
    var pre = host.querySelector("[data-pre]"), rg = host.querySelector("input[type=range]"), nv = host.querySelector("[data-nv]"), bonds = host.querySelector("[data-bonds]"), grp = host.querySelector("[data-grp]"), gpos = host.querySelector("[data-gpos]"),
      tsus = host.querySelector("[data-tsus]"), spos = host.querySelector("[data-spos]"), lista = host.querySelector("[data-lista]"), lec = host.querySelector("[data-lec]"), aviso = host.querySelector("[data-aviso]"), g;
    g = new B.Plot(host.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 620, h: 250, limpio: true, etiqueta: "Fórmula esquelética de la molécula" });
    function opcionesPos(sel, n, actual, solo) {
      sel.innerHTML = ""; for (var i = 1; i <= n; i++) { if (solo && solo.indexOf(i) < 0) continue; var o = document.createElement("option"); o.value = i; o.textContent = i; sel.appendChild(o); }
      sel.value = String(Math.min(Math.max(actual, 1), n));
    }
    function sincroniza() {
      var m = st.m, n = m.n;
      nv.textContent = n; rg.value = n;
      bonds.innerHTML = ""; for (var i = 1; i < n; i++) { var b = document.createElement("button"); b.type = "button"; b.className = "q7-bond"; b.setAttribute("data-b", i); b.setAttribute("aria-label", "Enlace entre C" + i + " y C" + (i + 1) + ": " + ["simple", "doble", "triple"][m.enl[i - 1] - 1]); b.innerHTML = "<small>C" + i + "–C" + (i + 1) + "</small><b>" + BONDS[m.enl[i - 1] - 1] + "</b>"; bonds.appendChild(b); }
      var solo = m.grupo === "al" || m.grupo === "oico" ? [1, n] : m.grupo === "ona" ? null : null;
      opcionesPos(gpos, n, m.pos, solo && n > 1 ? solo : null);
      gpos.disabled = !m.grupo; if (m.grupo) { if (solo && n > 1 && [1, n].indexOf(m.pos) < 0) m.pos = 1; gpos.value = String(m.pos); }
      opcionesPos(spos, n, parseInt(spos.getAttribute("data-v") || "2", 10) || 2);
      lista.innerHTML = m.sus.map(function (q, k) { return '<button type="button" class="q7-chip" data-q="' + k + '" aria-label="Quitar ' + q.t + ' del carbono ' + q.p + '">' + q.t + " en C" + q.p + ' <span aria-hidden="true">×</span></button>'; }).join("");
      Array.prototype.forEach.call(grp.querySelectorAll(".chip-btn"), function (c) { var on = c.getAttribute("data-k") === (m.grupo || "ninguno"); c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      Array.prototype.forEach.call(tsus.querySelectorAll(".chip-btn"), function (c) { var on = c.getAttribute("data-k") === st.tipo; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
    }
    function pinta() {
      var m = st.m, A = O.analiza(m); O.dibuja(g, m, st.num && !A.errores.length);
      if (A.errores.length) { lec.innerHTML = U.lec("Esta molécula no es posible", A.errores.join(" "), "red ancho"); aviso.textContent = ""; if (opts.alCambiar) opts.alCambiar(null, st); return; }
      var c = O.cuenta(m), nombre = O.nombrar(m), comun = O.COMUN[nombre];
      lec.innerHTML = U.lec("Nombre IUPAC", "<span class='q7-nombre'>" + nombre + "</span>" + (comun ? " <small class='q7-comun'>(" + comun + ")</small>" : ""), "ok ancho") +
        U.lec("Fórmula semidesarrollada", O.condensada(m), "pen ancho") + U.lec("Fórmula molecular", O.formulaMolecular(c), "red") + U.lec("Masa molar", fmt(O.masa(c), 2) + " g/mol", "") +
        U.lec("Familia", O.familia(m), "") + U.lec("Grado de insaturación", String(O.insaturaciones(c)), "");
      if (opts.alCambiar) opts.alCambiar(nombre, st);
    }
    function todo() { sincroniza(); pinta(); }
    rg.addEventListener("input", function () { var n = parseInt(rg.value, 10), m = st.m; while (m.enl.length < n - 1) m.enl.push(1); m.enl.length = Math.max(0, n - 1); m.n = n; if (m.pos > n) m.pos = n; m.sus = m.sus.filter(function (q) { return q.p <= n; }); todo(); });
    bonds.addEventListener("click", function (e) { var b = e.target.closest("[data-b]"); if (!b) return; var i = parseInt(b.getAttribute("data-b"), 10) - 1; st.m.enl[i] = st.m.enl[i] % 3 + 1; todo(); var nb = bonds.querySelector('[data-b="' + (i + 1) + '"]'); if (nb) nb.focus(); });
    U.fichas(grp, [{ k: "ninguno", t: "Ninguno (hidrocarburo)" }, { k: "ol", t: "Alcohol −OH" }, { k: "al", t: "Aldehído −CHO" }, { k: "ona", t: "Cetona −CO−" }, { k: "oico", t: "Ácido −COOH" }, { k: "amina", t: "Amina −NH₂" }], "ninguno", function (k) { st.m.grupo = k === "ninguno" ? "" : k; if (st.m.grupo === "ona") st.m.pos = Math.min(Math.max(st.m.pos, 2), st.m.n - 1 || 1); if ((st.m.grupo === "al" || st.m.grupo === "oico")) st.m.pos = 1; todo(); });
    gpos.addEventListener("change", function () { st.m.pos = parseInt(gpos.value, 10); todo(); });
    U.fichas(tsus, [{ k: "metil", t: "Metil −CH₃" }, { k: "etil", t: "Etil −C₂H₅" }, { k: "cloro", t: "Cloro −Cl" }, { k: "bromo", t: "Bromo −Br" }, { k: "fluoro", t: "Fluoro −F" }], "metil", function (k) { st.tipo = k; sincroniza(); });
    spos.addEventListener("change", function () { spos.setAttribute("data-v", spos.value); });
    host.querySelector("[data-add]").addEventListener("click", function () { st.m.sus.push({ p: parseInt(spos.value, 10), t: st.tipo }); spos.setAttribute("data-v", spos.value); todo(); });
    lista.addEventListener("click", function (e) { var b = e.target.closest("[data-q]"); if (!b) return; st.m.sus.splice(parseInt(b.getAttribute("data-q"), 10), 1); todo(); });
    function carga(spec) {
      var m = O.copia(spec); st.m = m; spos.setAttribute("data-v", "2"); todo();
    }
    if (opts.presets) U.fichas(pre, opts.presets.map(function (p, i) { return { k: String(i), t: p.etq }; }), "", function (k) { carga(opts.presets[+k].spec); });
    else pre.style.display = "none";
    todo();
    return { carga: carga, estado: st, redibuja: pinta, nombre: function () { return O.nombrar(st.m); } };
  }
  O.constructor = constructor;

  // ============================================================
  // CONSTRUCTOR libre
  // ============================================================
  B.w.q7_constructor = function (host, args, d) {
    var cuerpo = B.caja(host, "Pruébalo", "Constructor de moléculas orgánicas con nomenclatura IUPAC");
    cuerpo.innerHTML = '<div class="q7-cont"></div><p class="w-pie">Cambia la longitud de la cadena, los enlaces, el grupo funcional y los sustituyentes: el nombre se calcula con las reglas IUPAC (cadena principal, grupo principal con el localizador más bajo, enlaces múltiples, sustituyentes en orden alfabético). Los números grises del dibujo muestran el sentido en que se numera la cadena. Si la molécula es imposible (más de 4 enlaces en un carbono) te lo dice.</p>';
    var presets = d ? d.slice(0, 14).map(function (x) { return { etq: x.nombre, spec: x }; }) : null;
    constructor(cuerpo.querySelector(".q7-cont"), { presets: presets });
  };

  // ============================================================
  // RETO: construye la molécula que se pide
  // ============================================================
  B.w.q7_reto = function (host, args, d) {
    var cuerpo = B.caja(host, "Reto", "Construye la molécula con este nombre");
    var lista = d || [];
    cuerpo.innerHTML = '<div class="q7-objetivo"><span class="q7-lab">Construye:</span> <b class="q7-nombre" data-obj></b></div><div class="q7-cont"></div><div class="ctl q7-acc"></div><p class="q7-res" aria-live="polite"></p>';
    var st = { i: 0, ok: 0 }, obj = cuerpo.querySelector("[data-obj]"), res = cuerpo.querySelector(".q7-res"), cur = null, nombreAct = null;
    var api = constructor(cuerpo.querySelector(".q7-cont"), { alCambiar: function (nombre) { nombreAct = nombre; res.className = "q7-res"; res.textContent = ""; } });
    function nuevo() { obj.textContent = lista[st.i % lista.length].nombre; api.carga({ n: 4, enl: [1, 1, 1], grupo: "", pos: 1, sus: [] }); res.textContent = ""; }
    function comprueba() {
      var obj_ = lista[st.i % lista.length].nombre;
      if (nombreAct === obj_) { res.className = "q7-res ok"; res.innerHTML = "<b>✓ Correcto.</b> Has construido " + obj_ + "."; st.ok++; }
      else if (nombreAct === null) { res.className = "q7-res mal"; res.textContent = "Esa molécula no es posible todavía: revisa los avisos."; }
      else { res.className = "q7-res mal"; res.innerHTML = "<b>Todavía no.</b> Lo que has construido se llama «" + nombreAct + "». Compara el número de carbonos, el grupo y la posición de los sustituyentes."; }
    }
    var acc = cuerpo.querySelector(".q7-acc");
    U.boton(acc, "Comprobar", comprueba, "btn-comprobar");
    U.boton(acc, "Otro reto", function () { st.i++; nuevo(); });
    U.boton(acc, "Pista", function () { var o = lista[st.i % lista.length]; res.className = "q7-res"; res.innerHTML = "Pista: " + o.pista; });
    nuevo();
  };

  // ============================================================
  // NOMBRAR: elige el nombre de la molécula dibujada
  // ============================================================
  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mezcla(a) { var b = a.slice(), i, j, t; for (i = b.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  O.distractores = function (m) {
    var correcto = O.nombrar(m), res = [], c, i;
    function ponn(x) { var nn = x && O.nombrar(x); if (nn && nn !== correcto && res.indexOf(nn) < 0) res.push(nn); }
    // numeración contraria
    var num = mejor(m), inv = numerar(m, 1 - num.d); if (!((m.grupo === "al" || m.grupo === "oico") && inv.grupo[0] !== 1)) { var nn = O.nombrarConNumeracion(m, inv); if (nn !== correcto && res.indexOf(nn) < 0) res.push(nn); }
    // un carbono más / menos
    [1, -1].forEach(function (dn) { c = O.copia(m); c.n = m.n + dn; if (c.n < 1 || c.n > 10) return; if (dn > 0) c.enl.push(1); else { c.enl.pop(); c.sus = c.sus.filter(function (q) { return q.p <= c.n; }); if (c.pos > c.n) c.pos = c.n; } ponn(c); });
    // otro grupo
    ["ol", "ona", "al", "oico", "amina", ""].forEach(function (g) { if (g === (m.grupo || "")) return; c = O.copia(m); c.grupo = g; if (g === "al" || g === "oico") c.pos = 1; else if (g === "ona") c.pos = Math.max(2, Math.min(c.pos, Math.max(2, c.n - 1))); ponn(c); });
    // sustituyente en otra posición / sin sustituyente
    if (m.sus.length) { for (i = 0; i < m.sus.length; i++) { c = O.copia(m); c.sus.splice(i, 1); ponn(c); c = O.copia(m); c.sus[i].p = Math.min(m.n, m.sus[i].p + 1); ponn(c); } }
    // otro enlace múltiple
    if (m.n >= 3) { c = O.copia(m); c.enl[0] = c.enl[0] === 1 ? 2 : 1; ponn(c); }
    return res;
  };
  function tarjetaNombrar(host, d, titulo, modo) {
    var cuerpo = B.caja(host, "Entrénate", titulo);
    cuerpo.innerHTML = '<div class="w-plot"></div><div class="q7-cond lectura anch"></div><div class="q7-ops" data-ops></div><p class="q7-res" aria-live="polite"></p><div class="ctl q7-acc"></div><p class="w-pie q7-marc"></p>';
    var banco = d || [], g, st = { m: null, aciertos: 0, total: 0, hecho: false }, ops = cuerpo.querySelector("[data-ops]"), res = cuerpo.querySelector(".q7-res"), cond = cuerpo.querySelector(".q7-cond"), marc = cuerpo.querySelector(".q7-marc");
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 620, h: 230, limpio: true, etiqueta: "Molécula" });
    var FAMS = ["alcano", "alqueno", "alquino", "alcohol", "aldehído", "cetona", "ácido carboxílico", "amina", "derivado halogenado"];
    function famSimple(m) { var f = O.familia(m); if (/halogenado/.test(f)) return "derivado halogenado"; if (/alcohol/.test(f)) return "alcohol"; if (/aldehído/.test(f)) return "aldehído"; if (/cetona/.test(f)) return "cetona"; if (/ácido/.test(f)) return "ácido carboxílico"; if (/amina/.test(f)) return "amina"; if (/alquino|diino/.test(f)) return "alquino"; if (/eno|dieno/.test(f) && !/alcano/.test(f)) return "alqueno"; return "alcano"; }
    function nuevo() {
      var pool = modo === "grupos" ? banco.filter(function (x) { return true; }) : banco;
      var x = azar(pool); st.m = O.copia(x); st.m.nombre = x.nombre; st.hecho = false; res.className = "q7-res"; res.textContent = "";
      O.dibuja(g, st.m, false);
      cond.innerHTML = U.lec("Fórmula semidesarrollada", O.condensada(st.m), "pen ancho");
      var correcta, lista;
      if (modo === "grupos") {
        correcta = famSimple(st.m); lista = FAMS.filter(function (f) { return f !== correcta; }); lista = mezcla(lista).slice(0, 3).concat([correcta]);
        marc.innerHTML = "¿A qué familia pertenece? Fíjate en el grupo característico (o en el tipo de enlaces C–C si es un hidrocarburo).";
      } else {
        correcta = O.nombrar(st.m); var dd = mezcla(O.distractores(st.m)).slice(0, 3); lista = dd.concat([correcta]);
        marc.innerHTML = "Cuenta los carbonos de la cadena más larga que contiene el grupo principal, numera por el extremo que dé el localizador más bajo al grupo (después a los enlaces múltiples y a los sustituyentes) y ordena los sustituyentes alfabéticamente.";
      }
      lista = mezcla(lista);
      ops.innerHTML = lista.map(function (t) { return '<button type="button" class="chip-btn q7-op" data-t="' + t.replace(/"/g, "&quot;") + '">' + t + "</button>"; }).join("");
      ops.setAttribute("data-ok", correcta);
    }
    ops.addEventListener("click", function (e) {
      var b = e.target.closest(".q7-op"); if (!b || st.hecho) return;
      var ok = b.getAttribute("data-t") === ops.getAttribute("data-ok"); st.total++; if (ok) st.aciertos++; st.hecho = true;
      b.classList.add(ok ? "bien" : "mal");
      Array.prototype.forEach.call(ops.querySelectorAll(".q7-op"), function (x) { if (x.getAttribute("data-t") === ops.getAttribute("data-ok")) x.classList.add("bien"); });
      var nm = O.nombrar(st.m);
      res.className = "q7-res " + (ok ? "ok" : "mal");
      res.innerHTML = (ok ? "<b>✓ Correcto.</b> " : "<b>✗ No.</b> ") + "Es <b>" + nm + "</b>" + (modo === "grupos" ? " (" + O.familia(st.m) + ")" : "") + ". Llevas " + st.aciertos + " de " + st.total + ".";
    });
    var acc = cuerpo.querySelector(".q7-acc");
    U.boton(acc, "Siguiente molécula", nuevo, "btn-comprobar");
    nuevo();
  }
  B.w.q7_nombrar = function (host, args, d) { tarjetaNombrar(host, d, "¿Cómo se llama esta molécula?", "nombres"); };
  B.w.q7_grupos = function (host, args, d) { tarjetaNombrar(host, d, "¿A qué familia pertenece?", "grupos"); };
})(window);
