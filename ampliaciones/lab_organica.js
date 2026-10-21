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
    var omitirUnsat = !g && !nsus && n <= 3 && dobles.length + triples.length === 1;
    txt = stem;
    partes.forEach(function (p) { txt += (p.locs && !omitirUnsat ? "-" + p.locs.join(",") + "-" : "") + p.r; });
    var locG = num.grupo[0], omitirG = !nsus && !hayMult && ((g === "ol" || g === "amina") && n <= 2 || (g === "ona" && n <= 4));
    var fin = { "": "o", ol: (omitirG ? "" : "-" + locG + "-") + "ol", amina: (omitirG ? "" : "-" + locG + "-") + "amina", ona: (omitirG ? "" : "-" + locG + "-") + "ona", al: "al", oico: "oico" }[g];
    txt += fin;
    // sustituyentes por orden alfabético con prefijos multiplicadores
    var por = {};
    num.susObj.forEach(function (q) { (por[q.t] = por[q.t] || []).push(q.l); });
    var pref = Object.keys(por).sort().map(function (t) { var l = por[t].sort(function (a, b) { return a - b; }); return l.join(",") + "-" + MULT[l.length] + t; }).join("-");
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
    return out.join("");
  };

  // ------------------------------------------------------------
  // Dibujo esquelético (zigzag) en un B.Plot
  // ------------------------------------------------------------
  var LB = 1.1547, DZ = 0.5774;
  function posC(i) { return [i - 1, i % 2 === 0 ? DZ : 0]; }
  function ang(a) { var r = a * Math.PI / 180; return [Math.cos(r), Math.sin(r)]; }
  function lineas(g, p, q, orden, clase) {
    var dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, offs = orden === 1 ? [0] : orden === 2 ? [-0.055, 0.055] : [-0.09, 0, 0.09];
    offs.forEach(function (o) { g.segmento(p[0] + nx * o, p[1] + ny * o, q[0] + nx * o, q[1] + ny * o, { clase: clase || "c-ink" }).setAttribute("stroke-width", 2.4); });
  }
  O.rango = function (g, n) {
    var c = g.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj, W = (n - 1) + 4.6, semi = Math.max(2.1, W / 2 * ph / pw);
    g.rangoIso((n - 1) / 2, 0.3, semi);
  };
  O.dibuja = function (g, m, mostrarNum) {
    var A = O.analiza(m), g0 = m.grupo || "", pos = m.pos || 1, n = m.n, i;
    g.limpiar();
    if (A.errores.length && A.errores.some(function (e) { return /más de 4/.test(e); })) { /* se dibuja igualmente */ }
    var P = []; for (i = 1; i <= n; i++) P[i] = posC(i);
    for (i = 1; i < n; i++) lineas(g, P[i], P[i + 1], m.enl[i - 1]);
    if (n === 1) g.punto(P[1][0], P[1][1], { r: 3, clase: "c-ink" });
    // elementos que salen de cada carbono
    for (i = 1; i <= n; i++) {
      var items = [];
      if (g0 && pos === i) {
        if (g0 === "ol") items.push({ t: "OH", o: 1, lab: true }); else if (g0 === "amina") items.push({ t: "NH₂", o: 1, lab: true });
        else if (g0 === "ona") items.push({ t: "O", o: 2, lab: true, vert: true });
        else if (g0 === "al") items.push({ t: "O", o: 2, lab: true });
        else if (g0 === "oico") { items.push({ t: "OH", o: 1, lab: true }); items.push({ t: "O", o: 2, lab: true, vert: true }); }
      }
      (m.sus || []).forEach(function (q) { if (q.p === i) { var s = SUST[q.t]; items.push(s.c ? { t: q.t, o: 1, alq: s.c } : { t: s.x, o: 1, lab: true }); } });
      if (!items.length) continue;
      var alto = i % 2 === 0, away = alto ? 90 : 270, term = i === 1 || i === n, cont = i === 1 ? 150 : (n % 2 === 1 ? 30 : 330), angs = [];
      if (n === 1) angs = [150, 30, 270, 90].slice(0, items.length);
      else if (term) { angs = items.length === 1 ? [items[0].vert ? away : cont] : items.length === 2 ? [cont, away] : [cont, away, cont + (alto ? -60 : 60)]; if (items.length === 2 && items[0].vert) angs = [away, cont]; }
      else angs = items.length === 1 ? [away] : items.length === 2 ? [away - 32, away + 32] : [away - 45, away, away + 45];
      items.forEach(function (it, k) {
        var a = angs[k] !== undefined ? angs[k] : away, v = ang(a), q = [P[i][0] + LB * v[0], P[i][1] + LB * v[1]];
        if (it.alq) {
          lineas(g, P[i], q, 1);
          if (it.alq === 2) { var a2 = a + (Math.sin(a * Math.PI / 180) >= 0 ? -60 : 60), v2 = ang(a2); lineas(g, q, [q[0] + LB * v2[0], q[1] + LB * v2[1]], 1); }
        } else {
          var corto = [P[i][0] + (LB - 0.32) * v[0], P[i][1] + (LB - 0.32) * v[1]];
          lineas(g, P[i], corto, it.o);
          g.texto(q[0], q[1], it.t, { ancla: "middle", dy: 5, clase: it.t === "O" || it.t === "OH" ? "red" : "pen" });
        }
      });
    }
    if (mostrarNum) {
      var num = mejor(m), loc = function (k) { return num.d === 0 ? k : n + 1 - k; };
      for (i = 1; i <= n; i++) g.texto(P[i][0], P[i][1] + (i % 2 === 0 ? -0.34 : 0.34), String(loc(i)), { ancla: "middle", dy: 4, clase: "faint" });
    }
  };

  // ------------------------------------------------------------
  // Interfaz del constructor (se reutiliza en el reto)
  // ------------------------------------------------------------
  var BONDS = ["—", "=", "≡"];
  function constructor(host, opts) {
    opts = opts || {};
    var st = { m: { n: 5, enl: [1, 1, 1, 1], grupo: "", pos: 1, sus: [] }, num: true, tipo: "metil" };
    host.innerHTML = '<div class="q7-pre chips" data-pre></div><div class="q7-ctr"><div class="q7-fila"><label class="q7-lab">Carbonos de la cadena principal <b data-nv></b></label><input type="range" min="1" max="10" step="1" value="5" aria-label="Número de carbonos de la cadena principal"></div>' +
      '<div class="q7-fila"><span class="q7-lab">Enlaces entre carbonos <small>(toca para cambiar: simple, doble, triple)</small></span><div class="q7-bonds" data-bonds></div></div>' +
      '<div class="q7-fila"><span class="q7-lab">Grupo funcional principal</span><div class="chips" data-grp></div><label class="q7-sel">en el carbono <select data-gpos></select></label></div>' +
      '<div class="q7-fila"><span class="q7-lab">Sustituyentes</span><div class="chips" data-tsus></div><label class="q7-sel">en el carbono <select data-spos></select></label><button type="button" class="chip-btn" data-add>＋ Añadir</button><div class="q7-lista" data-lista></div></div></div>' +
      '<div class="w-plot"></div><div class="lectura anch" data-lec></div><div class="q7-aviso" data-aviso></div>';
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
      var m = st.m, A = O.analiza(m); O.rango(g, m.n); O.dibuja(g, m, st.num && !A.errores.length);
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
    cuerpo.innerHTML = '<div class="q7-cont"></div><p class="w-pie">Cambia la longitud de la cadena, los enlaces, el grupo funcional y los sustituyentes: el nombre se calcula con las reglas IUPAC (cadena principal, grupo principal con el localizador más bajo, enlaces múltiples, sustituyentes en orden alfabético). Con «Numeración» verás el sentido en que se numera la cadena. Si la molécula es imposible (más de 4 enlaces en un carbono) te lo dice.</p>';
    var presets = d && d.moleculas ? d.moleculas.slice(0, 14).map(function (x) { return { etq: x.nombre, spec: x }; }) : null;
    constructor(cuerpo.querySelector(".q7-cont"), { presets: presets });
  };

  // ============================================================
  // RETO: construye la molécula que se pide
  // ============================================================
  B.w.q7_reto = function (host, args, d) {
    var cuerpo = B.caja(host, "Reto", "Construye la molécula con este nombre");
    var lista = (d && d.retos) || [];
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
    var banco = (d && d.moleculas) || [], g, st = { m: null, aciertos: 0, total: 0, hecho: false }, ops = cuerpo.querySelector("[data-ops]"), res = cuerpo.querySelector(".q7-res"), cond = cuerpo.querySelector(".q7-cond"), marc = cuerpo.querySelector(".q7-marc");
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 620, h: 230, limpio: true, etiqueta: "Molécula" });
    var FAMS = ["alcano", "alqueno", "alquino", "alcohol", "aldehído", "cetona", "ácido carboxílico", "amina", "derivado halogenado"];
    function famSimple(m) { var f = O.familia(m); if (/halogenado/.test(f)) return "derivado halogenado"; if (/alcohol/.test(f)) return "alcohol"; if (/aldehído/.test(f)) return "aldehído"; if (/cetona/.test(f)) return "cetona"; if (/ácido/.test(f)) return "ácido carboxílico"; if (/amina/.test(f)) return "amina"; if (/alquino|diino/.test(f)) return "alquino"; if (/eno|dieno/.test(f) && !/alcano/.test(f)) return "alqueno"; return "alcano"; }
    function nuevo() {
      var pool = modo === "grupos" ? banco.filter(function (x) { return true; }) : banco;
      var x = azar(pool); st.m = O.copia(x); st.m.nombre = x.nombre; st.hecho = false; res.className = "q7-res"; res.textContent = "";
      O.rango(g, st.m.n); O.dibuja(g, st.m, false);
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
