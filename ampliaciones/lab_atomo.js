/* ============================================================
   Bachi para Firu · laboratorio del átomo (Física y Química I, tema 1)
   Motor B.lab.quim (elementos, configuraciones, isótopos, Bohr) y
   q1_tabla · q1_particulas · q1_comparar · q1_isotopos · q1_config
   q1_cuanticos · q1_bohr · q1_tendencias · q1_ionsucesiva
   El motor no toca el DOM: se puede comprobar aparte (Node).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var Q = B.lab.quim = B.lab.quim || {};

  // ------------------------------------------------------------
  // Formato de fórmulas: Al2(SO4)3 → Al₂(SO₄)₃ ; SO4^2- → SO₄²⁻
  // ------------------------------------------------------------
  var SUB = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
  var SUP = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "+": "⁺", "-": "⁻", "−": "⁻" };
  Q.sup = function (s) { return String(s).split("").map(function (c) { return SUP[c] || c; }).join(""); };
  Q.sub = function (f) {
    var p = String(f).split("^"), a = p[0].replace(/([A-Za-z)\]])(\d+)/g, function (m, l, d) { return l + d.split("").map(function (c) { return SUB[c]; }).join(""); });
    return a + (p[1] ? Q.sup(p[1]) : "");
  };
  // Escribe el ion como  Fe^3+ → Fe³⁺ (la carga con el número delante del signo)
  Q.ion = function (sim, q) { return sim + (q === 0 ? "" : Q.sup((Math.abs(q) === 1 ? "" : Math.abs(q)) + (q > 0 ? "+" : "−"))); };

  // ------------------------------------------------------------
  // Elementos 1–54: [Z, símbolo, nombre, masa atómica, electronegatividad (Pauling), radio covalente (pm), 1.ª energía de ionización (kJ/mol)]
  // ------------------------------------------------------------
  var T = [
    [1, "H", "Hidrógeno", 1.008, 2.20, 31, 1312], [2, "He", "Helio", 4.0026, null, null, 2372],
    [3, "Li", "Litio", 6.94, 0.98, 128, 520], [4, "Be", "Berilio", 9.0122, 1.57, 96, 900], [5, "B", "Boro", 10.81, 2.04, 84, 801], [6, "C", "Carbono", 12.011, 2.55, 76, 1086], [7, "N", "Nitrógeno", 14.007, 3.04, 71, 1402], [8, "O", "Oxígeno", 15.999, 3.44, 66, 1314], [9, "F", "Flúor", 18.998, 3.98, 57, 1681], [10, "Ne", "Neón", 20.180, null, null, 2081],
    [11, "Na", "Sodio", 22.990, 0.93, 166, 496], [12, "Mg", "Magnesio", 24.305, 1.31, 141, 738], [13, "Al", "Aluminio", 26.982, 1.61, 121, 578], [14, "Si", "Silicio", 28.085, 1.90, 111, 787], [15, "P", "Fósforo", 30.974, 2.19, 107, 1012], [16, "S", "Azufre", 32.06, 2.58, 105, 1000], [17, "Cl", "Cloro", 35.45, 3.16, 102, 1251], [18, "Ar", "Argón", 39.948, null, null, 1521],
    [19, "K", "Potasio", 39.098, 0.82, 203, 419], [20, "Ca", "Calcio", 40.078, 1.00, 176, 590], [21, "Sc", "Escandio", 44.956, 1.36, 170, 633], [22, "Ti", "Titanio", 47.867, 1.54, 160, 659], [23, "V", "Vanadio", 50.942, 1.63, 153, 651], [24, "Cr", "Cromo", 51.996, 1.66, 139, 653], [25, "Mn", "Manganeso", 54.938, 1.55, 139, 717], [26, "Fe", "Hierro", 55.845, 1.83, 132, 763], [27, "Co", "Cobalto", 58.933, 1.88, 126, 760], [28, "Ni", "Níquel", 58.693, 1.91, 124, 737], [29, "Cu", "Cobre", 63.546, 1.90, 132, 745], [30, "Zn", "Zinc", 65.38, 1.65, 122, 906],
    [31, "Ga", "Galio", 69.723, 1.81, 122, 579], [32, "Ge", "Germanio", 72.630, 2.01, 120, 762], [33, "As", "Arsénico", 74.922, 2.18, 119, 947], [34, "Se", "Selenio", 78.971, 2.55, 120, 941], [35, "Br", "Bromo", 79.904, 2.96, 120, 1140], [36, "Kr", "Criptón", 83.798, 3.00, null, 1351],
    [37, "Rb", "Rubidio", 85.468, 0.82, 220, 403], [38, "Sr", "Estroncio", 87.62, 0.95, 195, 550], [39, "Y", "Itrio", 88.906, 1.22, 190, 600], [40, "Zr", "Circonio", 91.224, 1.33, 175, 640], [41, "Nb", "Niobio", 92.906, 1.6, 164, 652], [42, "Mo", "Molibdeno", 95.95, 2.16, 154, 684], [43, "Tc", "Tecnecio", 98, 1.9, 147, 702], [44, "Ru", "Rutenio", 101.07, 2.2, 146, 710], [45, "Rh", "Rodio", 102.91, 2.28, 142, 720], [46, "Pd", "Paladio", 106.42, 2.20, 139, 804], [47, "Ag", "Plata", 107.87, 1.93, 145, 731], [48, "Cd", "Cadmio", 112.41, 1.69, 144, 868],
    [49, "In", "Indio", 114.82, 1.78, 142, 558], [50, "Sn", "Estaño", 118.71, 1.96, 139, 709], [51, "Sb", "Antimonio", 121.76, 2.05, 139, 834], [52, "Te", "Telurio", 127.60, 2.1, 138, 869], [53, "I", "Yodo", 126.90, 2.66, 139, 1008], [54, "Xe", "Xenón", 131.29, 2.6, null, 1170]
  ];
  var NOBLES = [2, 10, 18, 36, 54], METALOIDES = [5, 14, 32, 33, 51, 52], NOMETALES = [1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53];
  var EL = T.map(function (r) {
    var Z = r[0], p = Z <= 2 ? 1 : Z <= 10 ? 2 : Z <= 18 ? 3 : Z <= 36 ? 4 : 5, g;
    if (Z <= 2) g = Z === 1 ? 1 : 18;
    else if (p <= 3) { var k = Z - (p === 2 ? 2 : 10); g = k <= 2 ? k : k + 10; }
    else { g = Z - (p === 4 ? 18 : 36); }
    return { Z: Z, s: r[1], n: r[2], m: r[3], en: r[4], r: r[5], ie: r[6], p: p, g: g,
      t: NOBLES.indexOf(Z) >= 0 ? "noble" : METALOIDES.indexOf(Z) >= 0 ? "metaloide" : NOMETALES.indexOf(Z) >= 0 ? "nometal" : "metal" };
  });
  Q.EL = EL;
  Q.porSimbolo = function (s) { for (var i = 0; i < EL.length; i++) if (EL[i].s === s) return EL[i]; return null; };
  Q.TIPOS = { metal: "Metal", nometal: "No metal", metaloide: "Semimetal", noble: "Gas noble" };

  // ------------------------------------------------------------
  // Configuración electrónica (orden de llenado de Madelung)
  // ------------------------------------------------------------
  var ORDEN = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1], [5, 0], [4, 2], [5, 1], [6, 0], [4, 3], [5, 2], [6, 1], [7, 0], [5, 3], [6, 2], [7, 1]];
  var LET = ["s", "p", "d", "f"];
  var EXC = { 24: { "4,0": 1, "3,2": 5 }, 29: { "4,0": 1, "3,2": 10 }, 41: { "5,0": 1, "4,2": 4 }, 42: { "5,0": 1, "4,2": 5 }, 44: { "5,0": 1, "4,2": 7 }, 45: { "5,0": 1, "4,2": 8 }, 46: { "5,0": 0, "4,2": 10 }, 47: { "5,0": 1, "4,2": 10 } };
  Q.EXC = EXC; Q.ORDEN = ORDEN;
  // N electrones; con exc = true se aplican las excepciones del átomo neutro (Z = N)
  Q.config = function (N, exc) {
    var out = [], resto = N, i;
    for (i = 0; i < ORDEN.length && resto > 0; i++) { var cap = 2 * (2 * ORDEN[i][1] + 1), e = Math.min(cap, resto); out.push({ n: ORDEN[i][0], l: ORDEN[i][1], e: e }); resto -= e; }
    if (exc && EXC[N]) out.forEach(function (s) { var k = s.n + "," + s.l; if (EXC[N][k] != null) s.e = EXC[N][k]; });
    return out.filter(function (s) { return s.e > 0; });
  };
  // Átomo o ion de número atómico Z y carga q (q > 0 catión: se pierden primero los electrones de mayor n y, a igual n, de mayor l)
  Q.configIon = function (Z, q) {
    if (q <= 0) return Q.config(Z - q, q === 0);
    var cfg = Q.config(Z, true).map(function (s) { return { n: s.n, l: s.l, e: s.e }; }), quitar = q;
    var orden = cfg.slice().sort(function (a, b) { return b.n - a.n || b.l - a.l; });
    orden.forEach(function (s) { var k = Math.min(s.e, quitar); s.e -= k; quitar -= k; });
    return cfg.filter(function (s) { return s.e > 0; });
  };
  Q.cfgTxt = function (cfg, abrev) {
    var N = cfg.reduce(function (a, s) { return a + s.e; }, 0), nucleo = "", saltar = 0;
    if (abrev) {
      var gases = [[54, "Xe"], [36, "Kr"], [18, "Ar"], [10, "Ne"], [2, "He"]];
      for (var i = 0; i < gases.length; i++) if (gases[i][0] < N) {
        var base = Q.config(gases[i][0], false), ok = base.every(function (b) { return cfg.some(function (s) { return s.n === b.n && s.l === b.l && s.e === b.e; }); });
        if (ok) { nucleo = "[" + gases[i][1] + "] "; saltar = base.length; break; }
      }
    }
    return nucleo + cfg.slice(saltar).map(function (s) { return s.n + LET[s.l] + Q.sup(s.e); }).join(" ");
  };
  // Orden por capas (n creciente) en lugar de orden de llenado
  Q.cfgPorCapas = function (cfg) {
    return cfg.slice().sort(function (a, b) { return a.n - b.n || a.l - b.l; }).map(function (s) { return s.n + LET[s.l] + Q.sup(s.e); }).join(" ");
  };
  Q.electronesValencia = function (cfg) {
    var nmax = Math.max.apply(null, cfg.map(function (s) { return s.n; }));
    return cfg.filter(function (s) { return s.n === nmax; }).reduce(function (a, s) { return a + s.e; }, 0);
  };
  Q.desapareados = function (cfg) {
    return cfg.reduce(function (a, s) { var o = 2 * s.l + 1; return a + (s.e <= o ? s.e : 2 * o - s.e); }, 0);
  };
  Q.bloque = function (Z) { var c = Q.config(Z, true), u = c[c.length - 1]; return LET[u.l]; };
  // Capas de Bohr (electrones por nivel n)
  Q.capas = function (cfg) { var c = []; cfg.forEach(function (s) { c[s.n - 1] = (c[s.n - 1] || 0) + s.e; }); for (var i = 0; i < c.length; i++) c[i] = c[i] || 0; return c; };

  // ------------------------------------------------------------
  // Isótopos: [A, masa isotópica (u), abundancia (%)]
  // ------------------------------------------------------------
  Q.ISOTOPOS = {
    Li: { nombre: "Litio", Z: 6 - 3, iso: [[6, 6.0151, 7.59], [7, 7.0160, 92.41]] },
    B: { nombre: "Boro", Z: 5, iso: [[10, 10.0129, 19.9], [11, 11.0093, 80.1]] },
    Ne: { nombre: "Neón", Z: 10, iso: [[20, 19.9924, 90.48], [21, 20.9938, 0.27], [22, 21.9914, 9.25]] },
    Mg: { nombre: "Magnesio", Z: 12, iso: [[24, 23.9850, 78.99], [25, 24.9858, 10.00], [26, 25.9826, 11.01]] },
    Cl: { nombre: "Cloro", Z: 17, iso: [[35, 34.9689, 75.76], [37, 36.9659, 24.24]] },
    Cu: { nombre: "Cobre", Z: 29, iso: [[63, 62.9296, 69.15], [65, 64.9278, 30.85]] },
    Br: { nombre: "Bromo", Z: 35, iso: [[79, 78.9183, 50.69], [81, 80.9163, 49.31]] },
    Ag: { nombre: "Plata", Z: 47, iso: [[107, 106.9051, 51.84], [109, 108.9048, 48.16]] }
  };
  Q.ISOTOPOS.Li.Z = 3;
  Q.masaMedia = function (iso) {
    var tot = iso.reduce(function (a, i) { return a + i[2]; }, 0);
    return iso.reduce(function (a, i) { return a + i[1] * i[2]; }, 0) / tot;
  };

  // ------------------------------------------------------------
  // Modelo de Bohr (hidrógeno)  — R_H = 1,097·10⁷ m⁻¹ ; h = 6,626·10⁻³⁴ J·s ; c = 3,00·10⁸ m/s
  // ------------------------------------------------------------
  var CTE = { RH: 1.097e7, h: 6.626e-34, c: 3.00e8, e: 1.602e-19, NA: 6.022e23, a0: 0.0529 };
  Q.CTE = CTE;
  Q.bohr = function (ni, nf) {
    var inv = CTE.RH * (1 / (nf * nf) - 1 / (ni * ni));            // 1/λ  (m⁻¹, positivo si se emite)
    var lam = Math.abs(1 / inv) * 1e9, E = CTE.h * CTE.c * Math.abs(inv);
    return { emite: ni > nf, lambda: lam, E: E, Ee: E / CTE.e, nu: CTE.c * Math.abs(inv) };
  };
  Q.energiaNivel = function (n) { return -13.6 / (n * n); };       // eV
  Q.serie = function (nf) { return nf === 1 ? "Lyman" : nf === 2 ? "Balmer" : nf === 3 ? "Paschen" : nf === 4 ? "Brackett" : nf === 5 ? "Pfund" : "serie " + nf; };
  Q.region = function (nm) { return nm < 380 ? "ultravioleta" : nm <= 780 ? "visible" : "infrarrojo"; };
  // Color aproximado de una longitud de onda (nm)
  Q.colorLambda = function (nm) {
    var r = 0, g = 0, b = 0, f;
    if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else if (nm <= 780) { r = 1; }
    else return nm < 380 ? "#7a55b8" : "#8a2a2a";
    f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
    function c(x) { return Math.round(255 * Math.pow(x * f, 0.8)); }
    return "rgb(" + c(r) + "," + c(g) + "," + c(b) + ")";
  };

  // ------------------------------------------------------------
  // Energías de ionización sucesivas (kJ/mol)
  // ------------------------------------------------------------
  Q.IONSUC = {
    Na: [496, 4562, 6910, 9543, 13354], Mg: [738, 1451, 7733, 10543, 13630], Al: [578, 1817, 2745, 11577, 14842], Si: [787, 1577, 3232, 4356, 16091], P: [1012, 1907, 2914, 4964, 6274, 21267], Ca: [590, 1145, 4912, 6491, 8153]
  };

  // ============================================================
  // Auxiliares de interfaz
  // ============================================================
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function escala(v, lo, hi) { return Math.max(0, Math.min(1, (v - lo) / (hi - lo))); }
  function colorEscala(t) { return "hsl(" + Math.round(215 - 215 * t) + ",70%," + Math.round(86 - 38 * t) + "%)"; } // azul claro → rojo
  function ejeTxt(g, x, y, t, o) { return g.texto(x, y, t, o || {}); }
  function tamano(host) { return host.clientWidth; }
  // Caja de orbitales (Hund): devuelve HTML de las flechas
  function cajas(s) {
    var o = 2 * s.l + 1, arriba = [], abajo = [], i, html = "";
    for (i = 0; i < o; i++) arriba[i] = i < s.e ? 1 : 0;
    for (i = 0; i < o; i++) abajo[i] = s.e > o + i ? 1 : 0;
    for (i = 0; i < o; i++) html += '<span class="q1-orb">' + (arriba[i] ? "↑" : "") + (abajo[i] ? "↓" : "") + "</span>";
    return '<span class="q1-sub"><b>' + s.n + LET[s.l] + "</b>" + html + "</span>";
  }
  Q.cajasHTML = cajas;

  // ============================================================
  // Q1_TABLA: tabla periódica interactiva (periodos 1–5)
  // ============================================================
  var MODOS = [{ k: "bloque", t: "Bloque" }, { k: "tipo", t: "Metal / no metal" }, { k: "r", t: "Radio atómico" }, { k: "ie", t: "Energía de ionización" }, { k: "en", t: "Electronegatividad" }, { k: "m", t: "Masa atómica" }];
  var BLOQUES = { s: "#D14D72", p: "#E2A400", d: "#2E86DE", f: "#13804B" };
  var TIPOCOL = { metal: "#6C8EBF", nometal: "#E8A33D", metaloide: "#8E6BC1", noble: "#4DB6AC" };
  B.w.q1_tabla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Tabla periódica interactiva (periodos 1 a 5)");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="q1-tp-wrap"><div class="q1-tp" role="grid" aria-label="Tabla periódica"></div></div><div class="q1-leyenda"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "bloque", Z: 11 }, tp = cuerpo.querySelector(".q1-tp"), ley = cuerpo.querySelector(".q1-leyenda"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    // construir cuadrícula 18 × 5
    var celdas = {}, html = "", p, g, hueco;
    for (p = 1; p <= 5; p++) for (g = 1; g <= 18; g++) {
      var e = EL.filter(function (x) { return x.p === p && x.g === g; })[0];
      if (e) html += '<button type="button" class="q1-el" data-z="' + e.Z + '" style="grid-column:' + g + ";grid-row:" + p + '" aria-label="' + e.n + ", número atómico " + e.Z + '"><i>' + e.Z + "</i><b>" + e.s + "</b></button>";
    }
    tp.innerHTML = html;
    Array.prototype.forEach.call(tp.querySelectorAll(".q1-el"), function (b) { celdas[b.getAttribute("data-z")] = b; });
    function rango(k) { var v = EL.map(function (x) { return x[k]; }).filter(function (x) { return x != null; }); return [Math.min.apply(null, v), Math.max.apply(null, v)]; }
    function pinta() {
      var m = st.modo, r = (m === "r" || m === "ie" || m === "en" || m === "m") ? rango(m) : null;
      EL.forEach(function (x) {
        var b = celdas[x.Z], col, v;
        if (m === "bloque") col = BLOQUES[Q.bloque(x.Z)];
        else if (m === "tipo") col = TIPOCOL[x.t];
        else { v = x[m]; col = v == null ? "var(--line)" : colorEscala(escala(v, r[0], r[1])); }
        b.style.background = col; b.style.color = (m === "bloque" || m === "tipo") ? "#fff" : "#10131c";
        b.classList.toggle("sel", x.Z === st.Z);
      });
      var el = EL[st.Z - 1], cfg = Q.config(el.Z, true), tx = {
        bloque: "Color = bloque donde se coloca el último electrón (s, p o d). El helio es del bloque s aunque se escriba en el grupo 18.",
        tipo: "Los metales están a la izquierda y abajo, los no metales arriba a la derecha; los semimetales (B, Si, Ge, As, Sb, Te) forman la «escalera».",
        r: "Radio covalente (pm): crece hacia abajo y hacia la izquierda. Los gases nobles no se colorean porque no forman enlaces covalentes.",
        ie: "Primera energía de ionización (kJ/mol): crece hacia arriba y hacia la derecha; el máximo es el helio, el mínimo el rubidio.",
        en: "Electronegatividad de Pauling: máxima en el flúor (3,98), mínima en el rubidio/potasio. Aumenta hacia arriba y a la derecha.",
        m: "Masa atómica relativa: crece con Z (con alguna inversión, como Te–I)."
      };
      var unid = { r: " pm", ie: " kJ/mol", en: "", m: " u" };
      ley.innerHTML = (m === "bloque" ? Object.keys(BLOQUES).map(function (k) { return '<span><i style="background:' + BLOQUES[k] + '"></i>bloque ' + k + "</span>"; }).join("") :
        m === "tipo" ? Object.keys(TIPOCOL).map(function (k) { return '<span><i style="background:' + TIPOCOL[k] + '"></i>' + Q.TIPOS[k] + "</span>"; }).join("") :
          '<span class="q1-grad"><i style="background:linear-gradient(90deg,' + colorEscala(0) + "," + colorEscala(0.5) + "," + colorEscala(1) + ')"></i> ' + fmt(r[0], 2) + unid[m] + " → " + fmt(r[1], 2) + unid[m] + "</span>");
      lectura.innerHTML = fil("Elemento", el.n + " (" + el.s + ")", "pen") + fil("Z · masa atómica", el.Z + " · " + fmt(el.m, 3) + " u") + fil("Periodo · grupo", el.p + " · " + el.g, "ok") + fil("Tipo", Q.TIPOS[el.t] + " · bloque " + Q.bloque(el.Z)) +
        fil("Configuración", Q.cfgTxt(cfg, true), "ancho") + fil("Electronegatividad", el.en == null ? "—" : fmt(el.en, 2)) + fil("Radio covalente", el.r == null ? "—" : el.r + " pm") + fil("1.ª E. ionización", el.ie + " kJ/mol") + fil("Electrones de valencia", String(Q.electronesValencia(cfg)), "red");
      pie.textContent = tx[m] + " Toca un elemento para ver sus datos.";
    }
    tp.addEventListener("click", function (e) { var b = e.target.closest(".q1-el"); if (!b) return; st.Z = +b.getAttribute("data-z"); pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), MODOS, st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q1_PARTICULAS: constructor de átomos e iones
  // ============================================================
  function dibujaAtomo(host, Z, A, q) {
    var cfg = Q.configIon(Z, q), capas = Q.capas(cfg), N = A - Z, w = 260, h = 260, cx = w / 2, cy = h / 2;
    var NS = "http://www.w3.org/2000/svg", s = '<svg viewBox="0 0 ' + w + " " + h + '" class="q1-atomo" role="img" aria-label="Modelo del átomo con su núcleo y sus capas electrónicas">';
    var nuc = Z + N, rn = 12 + Math.min(20, Math.sqrt(nuc) * 2.2), i, k;
    for (i = 0; i < capas.length; i++) {
      var r = rn + 22 + i * 26;
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="1.5"/>';
      for (k = 0; k < capas[i]; k++) { var a = 2 * Math.PI * k / capas[i] - Math.PI / 2 + i * 0.4; s += '<circle cx="' + (cx + r * Math.cos(a)).toFixed(1) + '" cy="' + (cy + r * Math.sin(a)).toFixed(1) + '" r="4.2" fill="var(--pen)"/>'; }
    }
    // núcleo: protones y neutrones intercalados en una nube compacta (como mucho 30 de cada tipo)
    var np = Math.min(Z, 30), nn = Math.min(N, 30), tot = np + nn, cp = np, cn = nn;
    for (i = 0; i < tot; i++) {
      var rr = rn * 0.85 * Math.sqrt((i + 0.5) / tot), th = i * 2.399963, tipo = (cp > 0 && (i % 2 === 0 || cn === 0)) ? (cp--, "p") : (cn--, "n");
      s += '<circle cx="' + (cx + rr * Math.cos(th)).toFixed(1) + '" cy="' + (cy + rr * Math.sin(th)).toFixed(1) + '" r="' + (rn > 20 ? 3.6 : 4.4) + '" fill="' + (tipo === "p" ? "var(--red)" : "var(--ink-faint)") + '" stroke="var(--sheet)" stroke-width="0.8"/>';
    }
    host.innerHTML = s + "</svg>";
  }
  B.w.q1_particulas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Construye un átomo o un ion: protones, neutrones y electrones");
    cuerpo.innerHTML = '<div class="q1-fila"><div class="q1-lienzo"></div><div><div data-ctl></div><div class="lectura anch"></div></div></div><p class="w-pie"></p>';
    var st = { Z: 17, N: 18, q: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q1-lienzo"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Protones <i>Z</i>", min: 1, max: 54, step: 1, val: st.Z, on: function (v) { st.Z = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].s; } });
    U.slider(ctl, { et: "Neutrones", min: 0, max: 80, step: 1, val: st.N, on: function (v) { st.N = v; pinta(); }, fmt: function (v) { return String(v); } });
    U.slider(ctl, { et: "Carga del ion", min: -3, max: 4, step: 1, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return v === 0 ? "neutro" : (v > 0 ? "+" : "−") + Math.abs(v); } });
    function pinta() {
      var Z = st.Z, N = st.N, A = Z + N, q = st.q, e = Z - q, el = EL[Z - 1], tipo = q === 0 ? "átomo neutro" : q > 0 ? "catión (perdió " + q + " e⁻)" : "anión (ganó " + (-q) + " e⁻)";
      if (e < 0) { lectura.innerHTML = fil("Carga imposible", "no se pueden quitar más electrones de los que hay", "red"); return; }
      dibujaAtomo(lienzo, Z, A, q);
      var nombre = el.n.toLowerCase() + "-" + A;
      lectura.innerHTML = fil("Notación", "<sup>" + A + "</sup><sub>" + Z + "</sub>" + el.s + (q ? "<sup>" + (Math.abs(q) > 1 ? Math.abs(q) : "") + (q > 0 ? "+" : "−") + "</sup>" : ""), "pen") + fil("Nombre", nombre + " (" + tipo + ")") +
        fil("Protones · neutrones · electrones", Z + " · " + N + " · " + e, "red") + fil("Número másico A = Z + N", String(A)) +
        fil("Configuración electrónica", Q.cfgTxt(Q.configIon(Z, q), true), "ancho ok") + fil("Carga neta", (Z - e) === 0 ? "0" : (Z - e > 0 ? "+" : "−") + Math.abs(Z - e));
      pie.innerHTML = "<span style='color:var(--red)'>●</span> protones (carga +) y <span style='color:var(--ink-faint)'>●</span> neutrones (sin carga) forman el <b>núcleo</b>; <span style='color:var(--pen)'>●</span> los electrones (carga −) ocupan las capas. Z identifica el elemento; cambiar los neutrones da otro <b>isótopo</b>; cambiar los electrones da un <b>ion</b>. (Con más de 30 protones o neutrones el dibujo del núcleo se limita a 30 de cada.)";
    }
    pinta();
  };

  // ============================================================
  // Q1_COMPARAR: isótopos, isóbaros, isoelectrónicos
  // ============================================================
  var PARES = [
    { a: [6, 12, 0], b: [6, 14, 0], t: "¹²C y ¹⁴C" }, { a: [18, 40, 0], b: [19, 40, 0], t: "⁴⁰Ar y ⁴⁰K" }, { a: [11, 23, 1], b: [10, 20, 0], t: "Na⁺ y Ne" },
    { a: [9, 19, -1], b: [8, 16, -2], t: "F⁻ y O²⁻" }, { a: [1, 1, 0], b: [1, 3, 0], t: "¹H y ³H" }, { a: [26, 56, 2], b: [26, 56, 3], t: "Fe²⁺ y Fe³⁺" }, { a: [17, 35, -1], b: [18, 40, 0], t: "Cl⁻ y Ar" }
  ];
  B.w.q1_comparar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Isótopos, isóbaros o isoelectrónicos? Compara dos especies");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: PARES[0].a.slice(), b: PARES[0].b.slice() }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    function slid(k, i, et, mn, mx) { sl[k + i] = U.slider(ctl, { et: et, min: mn, max: mx, step: 1, val: st[k][i], on: function (v) { st[k][i] = v; pinta(); }, fmt: function (v) { return i === 0 ? v + " · " + EL[v - 1].s : v > 0 && i === 2 ? "+" + v : String(v); } }); }
    slid("a", 0, "A: Z", 1, 54); slid("a", 1, "A: número másico", 1, 140); slid("a", 2, "A: carga", -3, 4);
    slid("b", 0, "B: Z", 1, 54); slid("b", 1, "B: número másico", 1, 140); slid("b", 2, "B: carga", -3, 4);
    function rot(x) { var el = EL[x[0] - 1]; return "<sup>" + x[1] + "</sup><sub>" + x[0] + "</sub>" + el.s + (x[2] ? "<sup>" + (Math.abs(x[2]) > 1 ? Math.abs(x[2]) : "") + (x[2] > 0 ? "+" : "−") + "</sup>" : ""); }
    function pinta() {
      var a = st.a, b = st.b, ea = a[0] - a[2], eb = b[0] - b[2], na = a[1] - a[0], nb = b[1] - b[0], res = [];
      if (a[1] < a[0] || b[1] < b[0] || ea < 0 || eb < 0) { lectura.innerHTML = fil("Valores imposibles", "el número másico no puede ser menor que Z ni sobrar cargas positivas", "red"); return; }
      if (a[0] === b[0] && a[1] !== b[1]) res.push("<b>isótopos</b> (mismo Z, distinto A)");
      if (a[1] === b[1] && a[0] !== b[0]) res.push("<b>isóbaros</b> (mismo A, distinto Z)");
      if (ea === eb && (a[0] !== b[0] || a[2] !== b[2])) res.push("<b>isoelectrónicas</b> (mismo nº de electrones: " + ea + ")");
      if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) res.push("<b>la misma especie</b>");
      if (a[0] === b[0] && a[1] === b[1] && a[2] !== b[2]) res.push("<b>el mismo elemento y el mismo isótopo, con distinta carga</b> (iones del mismo átomo)");
      if (a[1] - a[0] === b[1] - b[0] && a[0] !== b[0]) res.push("<b>isótonos</b> (mismo nº de neutrones: " + na + ")");
      lectura.innerHTML = fil("Especie A", rot(a) + " — " + a[0] + " p⁺, " + na + " n, " + ea + " e⁻", "pen") + fil("Especie B", rot(b) + " — " + b[0] + " p⁺, " + nb + " n, " + eb + " e⁻", "red") + fil("Relación", res.length ? res.join(" · ") : "ninguna de las relaciones habituales", "ok ancho");
      pie.innerHTML = "<b>Isótopos</b>: igual Z, distinto A. <b>Isóbaros</b>: igual A, distinto Z. <b>Isótonos</b>: igual número de neutrones. <b>Isoelectrónicos</b>: igual número de electrones (como Na⁺, Ne y F⁻, que tienen 10).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PARES.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var p = PARES[+k]; st.a = p.a.slice(); st.b = p.b.slice(); for (var i = 0; i < 3; i++) { sl["a" + i].set(st.a[i]); sl["b" + i].set(st.b[i]); } pinta(); });
    pinta();
  };

  // ============================================================
  // Q1_ISOTOPOS: masa atómica media
  // ============================================================
  B.w.q1_isotopos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Masa atómica media a partir de los isótopos (espectro de masas)");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var claves = Object.keys(Q.ISOTOPOS), st = { k: "Cl", ab: Q.ISOTOPOS.Cl.iso.map(function (i) { return i[2]; }) }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = [];
    function monta() {
      ctl.innerHTML = ""; sl = [];
      Q.ISOTOPOS[st.k].iso.forEach(function (i, j) {
        sl.push(U.slider(ctl, { et: "Abundancia de <sup>" + i[0] + "</sup>" + st.k, min: 0, max: 100, step: 0.01, val: st.ab[j], on: function (v) { st.ab[j] = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " %"; } }));
      });
    }
    function pinta() {
      var D = Q.ISOTOPOS[st.k], iso = D.iso.map(function (i, j) { return [i[0], i[1], st.ab[j]]; }), tot = iso.reduce(function (a, i) { return a + i[2]; }, 0), med = tot > 0 ? Q.masaMedia(iso) : NaN, real = Q.masaMedia(D.iso);
      var ms = iso.map(function (i) { return i[1]; }), lo = Math.min.apply(null, ms) - 1.5, hi = Math.max.apply(null, ms) + 1.5;
      g.rango(lo, hi, 0, 100); g.limpiar();
      iso.forEach(function (i) { var h = tot > 0 ? i[2] / tot * 100 : 0; g.rect(i[1] - 0.18, 0, i[1] + 0.18, h, { clase: "z-pen" }); g.texto(i[1], h, fmt(tot > 0 ? i[2] / tot * 100 : 0, 1) + " %", { dy: -6, ancla: "middle", clase: "pen" }); g.texto(i[1], 0, i[0] + st.k, { dy: 16, ancla: "middle" }); });
      if (!isNaN(med)) { g.segmento(med, 0, med, 100, { clase: "c-red", dash: "5 4" }); g.texto(med, 98, "M̄ = " + fmt(med, 3) + " u", { dx: 6, clase: "red" }); }
      lectura.innerHTML = fil("Suma de abundancias", fmt(tot, 2) + " %", Math.abs(tot - 100) < 0.05 ? "ok" : "red") + fil("Masa atómica media", isNaN(med) ? "—" : fmt(med, 3) + " u", "pen") + fil("Valor real (tabla)", fmt(real, 3) + " u", "ok") +
        fil("Cómo se calcula", "M̄ = Σ (masa isotópica × abundancia/100)  =  " + iso.map(function (i) { return fmt(i[1], 4) + "·" + fmt(i[2], 2) + "%"; }).join(" + "), "ancho");
      pie.innerHTML = "Cada barra es un isótopo (espectro de masas: la altura es la abundancia). La masa atómica que aparece en la tabla periódica es el <b>promedio ponderado</b> de las masas isotópicas con sus abundancias: no coincide con la masa de ningún átomo concreto. Con 100 % de un solo isótopo, la media es su masa isotópica.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 30, xmax: 40, ymin: 0, ymax: 100, w: 600, h: 280, etx: "u", ety: "%", etiqueta: "Espectro de masas" });
    U.fichas(cuerpo.querySelector("[data-pre]"), claves.map(function (k) { return { k: k, t: Q.ISOTOPOS[k].nombre }; }), "Cl", function (k) { st.k = k; st.ab = Q.ISOTOPOS[k].iso.map(function (i) { return i[2]; }); monta(); pinta(); });
    monta(); pinta();
  };

  // ============================================================
  // Q1_CONFIG: configuración electrónica, diagrama de orbitales y propiedades
  // ============================================================
  B.w.q1_config = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Configuración electrónica: Aufbau, Pauli y Hund");
    cuerpo.innerHTML = '<div data-ctl></div><div data-pre class="chips"></div><div class="q1-orbitales"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { Z: 26, q: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), orb = cuerpo.querySelector(".q1-orbitales"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), slZ, slQ;
    slZ = U.slider(ctl, { et: "Número atómico <i>Z</i>", min: 1, max: 54, step: 1, val: st.Z, on: function (v) { st.Z = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].n; } });
    slQ = U.slider(ctl, { et: "Carga del ion", min: -3, max: 4, step: 1, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return v === 0 ? "neutro" : (v > 0 ? "+" : "−") + Math.abs(v); } });
    function pinta() {
      var Z = st.Z, q = st.q, el = EL[Z - 1], N = Z - q;
      if (N < 1) { lectura.innerHTML = fil("Carga imposible", "no quedan electrones", "red"); orb.innerHTML = ""; return; }
      var cfg = Q.configIon(Z, q), exc = q === 0 && Q.EXC[Z] ? "Excepción: " + Q.cfgTxt(Q.config(Z, false), true) + " pasaría a la configuración indicada, más estable (subnivel d semilleno o lleno)." : "";
      orb.innerHTML = cfg.map(cajas).join("");
      var unp = Q.desapareados(cfg), ev = Q.electronesValencia(cfg), caps = Q.capas(cfg);
      lectura.innerHTML = fil("Configuración (llenado)", Q.cfgTxt(cfg, false), "pen ancho") + fil("Abreviada", Q.cfgTxt(cfg, true), "ancho") + fil("Por capas", Q.cfgPorCapas(cfg), "ancho") +
        fil("Electrones totales", String(N)) + fil("Capas (n = 1, 2, …)", caps.join(" · ")) + fil("Electrones en la capa más externa", String(ev), "red") +
        fil("Electrones desapareados", String(unp) + (unp ? " → paramagnético" : " → diamagnético"), "ok") + fil("Posición", "periodo " + el.p + ", grupo " + el.g + " (" + Q.TIPOS[el.t].toLowerCase() + ")") + (exc ? fil("Excepción", exc, "red ancho") : "");
      pie.innerHTML = "Los electrones se colocan siguiendo el <b>principio de Aufbau</b> (de menor a mayor energía: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p…), el de <b>exclusión de Pauli</b> (máximo dos electrones por orbital, con espines opuestos ↑↓) y la <b>regla de Hund</b> (en orbitales de igual energía, primero uno en cada uno con el mismo espín). Los cationes pierden primero los electrones de la capa más externa (el 4s antes que el 3d).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), [{ k: "11,0", t: "Na" }, { k: "26,0", t: "Fe" }, { k: "26,2", t: "Fe²⁺" }, { k: "26,3", t: "Fe³⁺" }, { k: "24,0", t: "Cr (excepción)" }, { k: "29,0", t: "Cu (excepción)" }, { k: "29,2", t: "Cu²⁺" }, { k: "17,-1", t: "Cl⁻" }, { k: "13,3", t: "Al³⁺" }, { k: "7,0", t: "N (Hund)" }], "26,0", function (k) { var p = k.split(","); st.Z = +p[0]; st.q = +p[1]; slZ.set(st.Z); slQ.set(st.q); pinta(); });
    pinta();
  };

  // ============================================================
  // Q1_CUANTICOS: números cuánticos y orbitales
  // ============================================================
  function formaOrbital(l, m) {
    var w = 120, c = 60, s = '<svg viewBox="0 0 ' + w + " " + w + '" class="q1-forma" role="img" aria-label="Forma del orbital">';
    function lobulo(a, rx, ry, col) { return '<ellipse cx="' + c + '" cy="' + c + '" rx="' + rx + '" ry="' + ry + '" fill="' + col + '" fill-opacity="0.55" stroke="' + col + '" stroke-width="1.5" transform="rotate(' + a + " " + c + " " + c + ') translate(0 0)"/>'; }
    function dos(a, d, rx, ry, col) { return '<g transform="rotate(' + a + " " + c + " " + c + ')"><ellipse cx="' + (c + d) + '" cy="' + c + '" rx="' + rx + '" ry="' + ry + '" fill="' + col + '" fill-opacity="0.55" stroke="' + col + '" stroke-width="1.5"/><ellipse cx="' + (c - d) + '" cy="' + c + '" rx="' + rx + '" ry="' + ry + '" fill="#E2A400" fill-opacity="0.55" stroke="#E2A400" stroke-width="1.5"/></g>'; }
    s += '<line x1="6" y1="' + c + '" x2="114" y2="' + c + '" stroke="var(--line)"/><line x1="' + c + '" y1="6" x2="' + c + '" y2="114" stroke="var(--line)"/>';
    if (l === 0) s += '<circle cx="' + c + '" cy="' + c + '" r="26" fill="#D14D72" fill-opacity="0.45" stroke="#D14D72" stroke-width="1.5"/>';
    else if (l === 1) s += m === 0 ? dos(90, 20, 20, 12, "#D14D72") : m === 1 ? dos(0, 20, 20, 12, "#D14D72") : dos(45, 20, 20, 12, "#D14D72");
    else if (l === 2) {
      if (m === 0) s += dos(90, 24, 14, 22, "#2E86DE") + '<ellipse cx="' + c + '" cy="' + c + '" rx="24" ry="7" fill="#E2A400" fill-opacity="0.45" stroke="#E2A400"/>';
      else if (m === 1 || m === -1) s += dos(0, 20, 18, 9, "#2E86DE") + dos(90, 20, 18, 9, "#E2A400");
      else if (m === 2) s += dos(45, 22, 20, 9, "#2E86DE") + dos(-45, 22, 20, 9, "#E2A400");
      else s += dos(0, 22, 20, 9, "#2E86DE") + dos(90, 22, 20, 9, "#E2A400");
    } else s += dos(0, 20, 16, 8, "#13804B") + dos(60, 20, 16, 8, "#13804B") + dos(120, 20, 16, 8, "#13804B");
    return s + "</svg>";
  }
  var ETQ_ORB = { 0: ["s"], 1: ["pz", "px", "py"], 2: ["dz²", "dxz", "dyz", "dxy", "dx²−y²"], 3: ["f"] };
  B.w.q1_cuanticos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Números cuánticos y forma de los orbitales");
    cuerpo.innerHTML = '<div data-ctl></div><div class="q1-fila"><div class="q1-lienzo"></div><div class="lectura anch"></div></div><div class="ac-tabla q1-tq"></div><p class="w-pie"></p>';
    var st = { n: 3, l: 2, m: 0, s: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q1-lienzo"), lectura = cuerpo.querySelector(".lectura"), tabla = cuerpo.querySelector(".q1-tq"), pie = cuerpo.querySelector(".w-pie"), sln, sll, slm, sls;
    sln = U.slider(ctl, { et: "Principal <i>n</i>", min: 1, max: 5, step: 1, val: st.n, on: function (v) { st.n = v; ajusta(); }, fmt: function (v) { return String(v); } });
    sll = U.slider(ctl, { et: "Secundario <i>l</i>", min: 0, max: 4, step: 1, val: st.l, on: function (v) { st.l = v; ajusta(); }, fmt: function (v) { return v + " (" + (LET[v] || "g") + ")"; } });
    slm = U.slider(ctl, { et: "Magnético <i>m<sub>l</sub></i>", min: -4, max: 4, step: 1, val: st.m, on: function (v) { st.m = v; ajusta(); }, fmt: function (v) { return (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v); } });
    sls = U.slider(ctl, { et: "Espín <i>m<sub>s</sub></i>", min: -1, max: 1, step: 2, val: st.s, on: function (v) { st.s = v; ajusta(); }, fmt: function (v) { return v > 0 ? "+½" : "−½"; } });
    function ajusta() { pinta(); }
    function pinta() {
      var n = st.n, l = st.l, m = st.m, errs = [];
      if (l > n - 1) errs.push("l debe ir de 0 a n − 1 = " + (n - 1));
      if (Math.abs(m) > l) errs.push("m<sub>l</sub> debe ir de −l a +l (−" + l + " … +" + l + ")");
      var ok = errs.length === 0;
      lienzo.innerHTML = ok && l <= 3 ? formaOrbital(l, m) + "<p class='w-pie' style='text-align:center'>orbital " + n + (ETQ_ORB[l] ? ETQ_ORB[l][Math.min(m + l, ETQ_ORB[l].length - 1)] : LET[l]) + "</p>" : "<p class='w-pie'>sin dibujo</p>";
      lectura.innerHTML = fil("Conjunto (n, l, m<sub>l</sub>, m<sub>s</sub>)", "(" + n + ", " + l + ", " + m + ", " + (st.s > 0 ? "+½" : "−½") + ")", ok ? "pen ancho" : "red ancho") +
        fil("¿Conjunto permitido?", ok ? "✓ Sí: es un electrón del subnivel " + n + (LET[l] || "g") : "✗ No: " + errs.join("; "), ok ? "ok ancho" : "red ancho") +
        fil("Orbitales en el nivel n", n * n + " (n²)") + fil("Electrones máximos en el nivel", String(2 * n * n) + " (2n²)") + fil("Orbitales del subnivel " + (LET[l] || "g"), String(2 * l + 1) + " → " + 2 * (2 * l + 1) + " electrones", "red");
      var filas = "";
      for (var nn = 1; nn <= 4; nn++) { var subs = []; for (var ll = 0; ll < nn; ll++) subs.push(nn + LET[ll] + " (" + (2 * ll + 1) + " orb.)"); filas += "<tr><th>" + nn + "</th><td>" + subs.join(" · ") + "</td><td>" + nn * nn + "</td><td>" + 2 * nn * nn + "</td></tr>"; }
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>n</th><th>subniveles (l = 0 … n−1)</th><th>orbitales</th><th>e⁻ máx.</th></tr></thead><tbody>" + filas + "</tbody></table>";
      pie.innerHTML = "<b>n</b> (1, 2, 3…) da el tamaño y la energía; <b>l</b> (0 … n−1) la forma (s esférica, p con dos lóbulos, d con cuatro…); <b>m<sub>l</sub></b> (−l … +l) la orientación en el espacio; <b>m<sub>s</sub></b> (±½) el espín. Dos electrones de un átomo nunca pueden tener los cuatro números iguales (Pauli).";
    }
    pinta();
  };

  // ============================================================
  // Q1_BOHR: transiciones electrónicas y espectro del hidrógeno
  // ============================================================
  B.w.q1_bohr = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Modelo de Bohr: transiciones y espectro del hidrógeno");
    cuerpo.innerHTML = '<div data-ctl></div><div class="q1-fila"><div class="q1-lienzo"></div><div class="w-plot q1-niveles"></div></div><div class="ctl q1-acc"></div><div data-serie class="chips"></div><div class="w-plot q1-espectro"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { ni: 3, nf: 2, serie: 2, anim: null }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), gb, gn, ge, slI, slF;
    slI = U.slider(ctl, { et: "Nivel inicial <i>n</i><sub>i</sub>", min: 1, max: 7, step: 1, val: st.ni, on: function (v) { st.ni = v; pinta(); }, fmt: function (v) { return String(v); } });
    slF = U.slider(ctl, { et: "Nivel final <i>n</i><sub>f</sub>", min: 1, max: 7, step: 1, val: st.nf, on: function (v) { st.nf = v; pinta(); }, fmt: function (v) { return String(v); } });
    function rad(n) { return 12 + 11 * n; }
    function dibujaOrbitas(rElec, ang, fotonT) {
      gb.limpiar();
      for (var n = 1; n <= 7; n++) { gb.arco(0, 0, rad(n) / 10, 0, 360, { clase: n === st.ni ? "c-pen" : n === st.nf ? "c-red" : "c-faint" }); if (n === st.ni || n === st.nf) gb.texto(rad(n) / 10 * Math.cos(2.4), rad(n) / 10 * Math.sin(2.4), "n=" + n, { dx: -6, dy: -4, clase: n === st.ni ? "pen" : "red", ancla: "end" }); }
      gb.punto(0, 0, { r: 6, clase: "c-red" });
      var r = rElec / 10; gb.punto(r * Math.cos(ang), r * Math.sin(ang), { r: 5, clase: "c-pen" });
      if (fotonT != null) {
        var B2 = Q.bohr(st.ni, st.nf), col = Q.colorLambda(B2.lambda), dir = st.ni > st.nf ? 1 : -1, pts = [], x0 = (st.ni > st.nf ? 1 : 1) * 0, k, base = dir > 0 ? 3 + 8 * fotonT : 11 - 8 * fotonT;
        for (k = 0; k <= 60; k++) { var t = k / 60, d = base + t * 2.6; pts.push([d * Math.cos(0.9) - 0.0, d * Math.sin(0.9) + 0.35 * Math.sin(t * 24)]); }
        var p = gb.polilinea(pts, { clase: "c-pen" }); p.style.stroke = col; p.setAttribute("stroke-width", 3.2);
      }
    }
    function pinta(sinAnim) {
      if (st.anim) { cancelAnimationFrame(st.anim); st.anim = null; }
      var ni = st.ni, nf = st.nf, B2 = ni === nf ? null : Q.bohr(ni, nf);
      dibujaOrbitas(rad(ni), 0.5, null);
      // niveles de energía
      gn.limpiar();
      for (var n = 1; n <= 7; n++) { var E = Q.energiaNivel(n); gn.segmento(0.2, E, 0.8, E, { clase: n === ni ? "c-pen" : n === nf ? "c-red" : "c-faint" }).setAttribute("stroke-width", n === ni || n === nf ? 3 : 1.5); if (n <= 3 || n === ni || n === nf) gn.texto(0.82, E, "n=" + n + " (" + fmt(E, 2) + " eV)", { dx: 3, dy: 4, clase: n === ni ? "pen" : n === nf ? "red" : "faint" }); }
      if (B2) { var col = Q.colorLambda(B2.lambda); var f = gn.segmento(0.5, Q.energiaNivel(ni), 0.5, Q.energiaNivel(nf), { clase: "c-ok" }); f.style.stroke = col; f.setAttribute("stroke-width", 4); gn.punto(0.5, Q.energiaNivel(nf), { r: 5, clase: "c-red" }); }
      // espectro de la serie
      dibujaSerie();
      if (!B2) { lectura.innerHTML = fil("Transición", "n<sub>i</sub> = n<sub>f</sub>: no hay salto, no hay fotón", "red ancho"); return; }
      var E1 = Q.energiaNivel(ni), E2 = Q.energiaNivel(nf);
      lectura.innerHTML = fil("Transición", ni + " → " + nf + (B2.emite ? "  (emisión de un fotón)" : "  (absorción de un fotón)"), (B2.emite ? "red" : "pen") + " ancho") +
        fil("ΔE = |E<sub>f</sub> − E<sub>i</sub>|", fmt(B2.Ee, 3) + " eV = " + U.cient(B2.E, 3) + " J", "pen") + fil("Longitud de onda λ", fmt(B2.lambda, 1) + " nm", "ok") + fil("Frecuencia ν", U.cient(B2.nu, 3) + " Hz") +
        fil("Región", Q.region(B2.lambda) + " · serie " + Q.serie(Math.min(ni, nf)), "red") + fil("1/λ = R<sub>H</sub>(1/n<sub>f</sub>² − 1/n<sub>i</sub>²)", fmt(Math.abs(1 / (B2.lambda * 1e-9)), 0) + " m⁻¹", "ancho");
      pie.innerHTML = "La energía del nivel n es E<sub>n</sub> = −13,6 eV/n². Al bajar de nivel el electrón <b>emite</b> un fotón con energía igual a la diferencia (ΔE = hν = hc/λ); al subir debe <b>absorber</b> justo esa energía. Por eso el espectro del hidrógeno es de <b>rayas</b> discretas y no continuo. Pulsa «Animar transición» para verlo.";
    }
    function dibujaSerie() {
      var nf = st.serie, ls = [], k;
      for (k = nf + 1; k <= nf + 8; k++) ls.push([k, Q.bohr(k, nf).lambda]);
      var lim = Q.bohr(1e6, nf).lambda, lo = Math.min(lim, ls[0][1]), hi = Math.max.apply(null, ls.map(function (x) { return x[1]; }));
      var a = nf === 2 ? 340 : lo * 0.9, b = nf === 2 ? 700 : hi * 1.08;
      ge.rango(a, b, 0, 1); ge.limpiar();
      if (a < 780 && b > 380) { for (var x = Math.max(380, a); x < Math.min(780, b); x += 5) { var rc = ge.rect(x, 0, x + 5.5, 0.12, { clase: "z-pen" }); rc.style.fill = Q.colorLambda(x + 2); rc.style.opacity = 0.9; } }
      ge.segmento(lim, 0, lim, 1, { clase: "c-faint", dash: "4 4" }); ge.texto(lim, 0.98, "límite " + fmt(lim, 0) + " nm", { dx: 4, clase: "faint" });
      ls.forEach(function (x, i) { var s = ge.segmento(x[1], 0.12, x[1], 0.85, { clase: "c-ink" }); s.style.stroke = Q.colorLambda(x[1]) === "#8a2a2a" || Q.colorLambda(x[1]) === "#7a55b8" ? "var(--ink)" : Q.colorLambda(x[1]); s.setAttribute("stroke-width", 3); if (i < 4) ge.texto(x[1], i % 2 ? 0.97 : 0.9, ["α", "β", "γ", "δ"][i] + " " + fmt(x[1], 0), { dx: i % 2 ? 4 : -4, dy: 0, clase: "faint", ancla: i % 2 ? "start" : "end" }); });
    }
    cuerpo.querySelector(".q1-acc").innerHTML = "";
    U.boton(cuerpo.querySelector(".q1-acc"), "▶ Animar transición", function () {
      if (st.ni === st.nf) return;
      if (st.anim) cancelAnimationFrame(st.anim);
      var t0 = null, ni = st.ni, nf = st.nf, dur = 1500;
      function paso(ts) {
        if (t0 === null) t0 = ts; var t = Math.min(1, (ts - t0) / dur), r = rad(ni) + (rad(nf) - rad(ni)) * t;
        dibujaOrbitas(r, 0.5 + 12 * t, t > 0.7 ? (t - 0.7) / 0.3 : null);
        if (t < 1) st.anim = requestAnimationFrame(paso); else { st.anim = null; dibujaOrbitas(rad(nf), 0.5 + 12, 1); }
      }
      st.anim = requestAnimationFrame(paso);
    }, "btn-comprobar");
    gb = new B.Plot(cuerpo.querySelector(".q1-lienzo"), { xmin: -10, xmax: 10, ymin: -10, ymax: 10, w: 300, h: 300, limpio: true, etiqueta: "Órbitas de Bohr" });
    gb.rangoIso(0, 0, 10);
    gn = new B.Plot(cuerpo.querySelector(".q1-niveles"), { xmin: 0, xmax: 1.7, ymin: -14.5, ymax: 0.8, w: 340, h: 300, sinX: true, etx: "", ety: "E (eV)", etiqueta: "Niveles de energía" });
    ge = new B.Plot(cuerpo.querySelector(".q1-espectro"), { xmin: 340, xmax: 700, ymin: 0, ymax: 1, w: 640, h: 150, sinY: true, etx: "λ (nm)", ety: "", etiqueta: "Espectro de emisión" });
    U.fichas(cuerpo.querySelector("[data-serie]"), [{ k: "1", t: "Serie de Lyman (→ n=1, UV)" }, { k: "2", t: "Serie de Balmer (→ n=2, visible)" }, { k: "3", t: "Serie de Paschen (→ n=3, IR)" }, { k: "4", t: "Serie de Brackett (→ n=4, IR)" }], "2", function (k) { st.serie = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q1_TENDENCIAS: propiedades periódicas frente a Z
  // ============================================================
  var PROP = { r: { t: "Radio covalente (pm)", u: "pm", dec: 0 }, ie: { t: "1.ª energía de ionización (kJ/mol)", u: "kJ/mol", dec: 0 }, en: { t: "Electronegatividad (Pauling)", u: "", dec: 2 } };
  var COLG = ["#D14D72", "#E2A400", "#2E86DE", "#13804B"];
  B.w.q1_tendencias = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Propiedades periódicas en función del número atómico");
    cuerpo.innerHTML = '<div data-prop class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="q1-juego"></div><p class="w-pie"></p>';
    var st = { k: "r", Z: 11 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), juego = cuerpo.querySelector(".q1-juego"), sl;
    sl = U.slider(ctl, { et: "Elemento (<i>Z</i>)", min: 1, max: 54, step: 1, val: st.Z, on: function (v) { st.Z = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].s; } });
    function pinta() {
      var P = PROP[st.k], vs = EL.map(function (e) { return e[st.k]; }).filter(function (v) { return v != null; }), lo = 0, hi = Math.max.apply(null, vs) * 1.1;
      g.rango(0, 55, lo, hi); g.limpiar();
      [2, 10, 18, 36, 54].forEach(function (z) { g.segmento(z + 0.5, lo, z + 0.5, hi, { clase: "c-faint", dash: "3 5" }); });
      var prev = null;
      EL.forEach(function (e) {
        var v = e[st.k]; if (v == null) { prev = null; return; }
        if (prev && prev.p === e.p) g.segmento(prev.Z, prev[st.k], e.Z, v, { clase: "c-faint" });
        prev = e;
      });
      EL.forEach(function (e) { var v = e[st.k]; if (v == null) return; var pt = g.punto(e.Z, v, { r: e.Z === st.Z ? 7 : 4.5, clase: "c-pen" }); pt.style.fill = COLG[["s", "p", "d", "f"].indexOf(Q.bloque(e.Z))]; if (e.Z === st.Z) pt.style.stroke = "var(--ink)"; });
      EL.forEach(function (e) { if (e.g === 1 && e.Z > 2 && e[st.k] != null) g.texto(e.Z, e[st.k], e.s, { dy: -9, ancla: "middle", clase: "faint" }); });
      var el = EL[st.Z - 1], v = el[st.k];
      lectura.innerHTML = fil("Elemento", el.n + " (Z = " + el.Z + ")", "pen") + fil(P.t, v == null ? "no definida" : fmt(v, P.dec) + " " + P.u, "red") + fil("Posición", "periodo " + el.p + ", grupo " + el.g, "ok") + fil("Tendencia en su periodo", st.k === "r" ? "disminuye hacia la derecha" : "aumenta hacia la derecha");
      pie.innerHTML = "Cada tramo de líneas es un <b>periodo</b> (separados por líneas discontinuas): la propiedad sube o baja a lo largo de él y vuelve a empezar en el siguiente metal alcalino. Colores: <span style='color:#D14D72'>●</span> bloque s <span style='color:#E2A400'>●</span> p <span style='color:#2E86DE'>●</span> d. Los gases nobles tienen la energía de ionización más alta de su periodo y los alcalinos la más baja.";
    }
    function nuevoJuego() {
      var pool = EL.filter(function (e) { return e.Z <= 36 && e.t !== "noble" && e[st.k] != null && e.g !== 12 && !(e.g >= 3 && e.g <= 11); }), elegidos = [], tries = 0;
      while (elegidos.length < 3 && tries++ < 200) { var c = pool[Math.floor(Math.random() * pool.length)]; if (elegidos.indexOf(c) < 0 && elegidos.every(function (x) { return Math.abs(x[st.k] - c[st.k]) > (st.k === "en" ? 0.2 : st.k === "r" ? 8 : 40); })) elegidos.push(c); }
      var orden = [], P = PROP[st.k];
      juego.innerHTML = "<p><b>Reto:</b> ordena de <b>mayor a menor</b> " + P.t.toLowerCase() + ". Toca los elementos en ese orden.</p><div class='chips q1-j-op'>" + elegidos.map(function (e) { return "<button type='button' class='chip-btn' data-z='" + e.Z + "'>" + e.n + " (" + e.s + ")</button>"; }).join("") + "</div><p class='q1-j-msg' aria-live='polite'></p><button type='button' class='chip-btn q1-j-nv'>Otro reto</button>";
      juego.querySelector(".q1-j-op").addEventListener("click", function (ev) {
        var b = ev.target.closest("[data-z]"); if (!b || b.disabled) return; orden.push(+b.getAttribute("data-z")); b.disabled = true; b.classList.add("on"); b.textContent = orden.length + ". " + b.textContent;
        if (orden.length === 3) {
          var corr = elegidos.slice().sort(function (a, b2) { return b2[st.k] - a[st.k]; }), ok = corr.every(function (e, i) { return e.Z === orden[i]; });
          juego.querySelector(".q1-j-msg").innerHTML = ok ? "<b style='color:var(--ok)'>✓ Correcto.</b> " + corr.map(function (e) { return e.s + " (" + fmt(e[st.k], P.dec) + ")"; }).join(" &gt; ") : "<b style='color:var(--red)'>Todavía no.</b> Orden correcto: " + corr.map(function (e) { return e.s + " (" + fmt(e[st.k], P.dec) + " " + P.u + ")"; }).join(" &gt; ") + ". Mira las posiciones: " + corr.map(function (e) { return e.s + " periodo " + e.p + ", grupo " + e.g; }).join("; ") + ".";
        }
      });
      juego.querySelector(".q1-j-nv").addEventListener("click", nuevoJuego);
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 55, ymin: 0, ymax: 250, w: 660, h: 320, etx: "Z", ety: "", etiqueta: "Propiedad periódica" });
    U.fichas(cuerpo.querySelector("[data-prop]"), Object.keys(PROP).map(function (k) { return { k: k, t: PROP[k].t }; }), "r", function (k) { st.k = k; pinta(); nuevoJuego(); });
    pinta(); nuevoJuego();
  };

  // ============================================================
  // Q1_IONSUCESIVA: energías de ionización sucesivas
  // ============================================================
  B.w.q1_ionsucesiva = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Energías de ionización sucesivas: ¿cuántos electrones de valencia?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "Mg" }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var v = Q.IONSUC[st.k], el = Q.porSimbolo(st.k), mx = Math.max.apply(null, v) * 1.12, salto = 0, mejor = 0, i;
      for (i = 1; i < v.length; i++) if (v[i] / v[i - 1] > mejor) { mejor = v[i] / v[i - 1]; salto = i; }
      g.rango(0, v.length + 1, 0, mx); g.limpiar();
      v.forEach(function (x, k) { var r = g.rect(k + 0.65, 0, k + 1.35, x, { clase: k === salto - 1 || k === salto ? "z-red" : "z-pen" }); g.texto(k + 1, x, fmt(x, 0), { dy: -6, ancla: "middle", clase: k === salto ? "red" : "pen" }); g.texto(k + 1, 0, "E" + (k + 1), { dy: 16, ancla: "middle" }); });
      g.segmento(salto + 0.5, 0, salto + 0.5, mx, { clase: "c-red", dash: "5 4" });
      lectura.innerHTML = fil("Elemento", el.n + " (Z = " + el.Z + ")", "pen") + fil("Mayor salto entre", "E" + salto + " y E" + (salto + 1) + " (×" + fmt(mejor, 1) + ")", "red") + fil("Electrones de valencia", String(salto), "ok") + fil("Configuración", Q.cfgTxt(Q.config(el.Z, true), true), "ancho");
      pie.innerHTML = "Cada columna es la energía (kJ/mol) para arrancar el 1.º, 2.º, 3.º… electrón. Mientras se arrancan electrones de la capa de valencia las energías suben poco; al llegar a los electrones de la capa interna (más cerca del núcleo y sin apantallar) hay un <b>salto enorme</b>. El salto indica cuántos electrones de valencia tiene el átomo.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 6, ymin: 0, ymax: 16000, w: 600, h: 300, sinX: true, etx: "", ety: "kJ/mol", etiqueta: "Energías de ionización sucesivas" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(Q.IONSUC).map(function (k) { return { k: k, t: k }; }), "Mg", function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q1_DECAIMIENTO: semivida y datación
  // ============================================================
  var RAD = {
    c14: { t: "Carbono-14", T: 5730, u: "años", nota: "Datación de restos orgánicos de hasta unos 50 000 años." },
    i131: { t: "Yodo-131", T: 8.02, u: "días", nota: "Se usa en medicina nuclear (tiroides); en un par de meses prácticamente ha desaparecido." },
    co60: { t: "Cobalto-60", T: 5.27, u: "años", nota: "Fuente de radiación gamma para radioterapia y esterilización." },
    h3: { t: "Tritio (³H)", T: 12.32, u: "años", nota: "Isótopo radiactivo del hidrógeno; se produce en la atmósfera y en reactores." },
    tc99: { t: "Tecnecio-99m", T: 6.01, u: "horas", nota: "El más usado en diagnóstico por imagen: decae en horas y casi no irradia al paciente." },
    u238: { t: "Uranio-238", T: 4.468e9, u: "años", nota: "Semivida de la edad de la Tierra: sirve para datar rocas." }
  };
  Q.RAD = RAD;
  Q.fraccion = function (t, T) { return Math.pow(0.5, t / T); };
  Q.edad = function (fraccion, T) { return T * Math.log(1 / fraccion) / Math.log(2); };
  B.w.q1_decaimiento = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Desintegración radiactiva: semivida y datación");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "c14", h: 3 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Semividas transcurridas", min: 0, max: 8, step: 0.25, val: st.h, on: function (v) { st.h = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var R = RAD[st.k], h = st.h, f = Math.pow(0.5, h), t = h * R.T;
      g.limpiar();
      g.curva(function (x) { return 100 * Math.pow(0.5, x); }, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      for (var k = 1; k <= 4; k++) { g.segmento(k, 0, k, 100 * Math.pow(0.5, k), { clase: "c-faint", dash: "3 4" }); g.texto(k, 100 * Math.pow(0.5, k), fmt(100 * Math.pow(0.5, k), 2) + " %", { dx: 4, dy: -6, clase: "faint" }); }
      g.segmento(h, 0, h, 100 * f, { clase: "c-red", dash: "5 4" }); g.segmento(0, 100 * f, h, 100 * f, { clase: "c-red", dash: "5 4" }); g.punto(h, 100 * f, { r: 6, clase: "c-red" });
      lectura.innerHTML = fil("Isótopo", R.t + " · T<sub>½</sub> = " + (R.T >= 1e6 ? U.cient(R.T, 3) : fmt(R.T, 2)) + " " + R.u, "pen ancho") + fil("Tiempo transcurrido", (t >= 1e6 ? U.cient(t, 3) : fmt(t, 2)) + " " + R.u, "red") + fil("Fracción que queda", fmt(100 * f, 3) + " %", "ok") + fil("Fracción desintegrada", fmt(100 - 100 * f, 3) + " %") +
        fil("Ley de desintegración", "N = N₀·(½)<sup>t/T</sup>", "ancho");
      pie.innerHTML = R.nota + " En cada semivida queda la mitad de lo que había: 100 % → 50 % → 25 % → 12,5 %… Para <b>datar</b>, se mide qué fracción queda y se despeja t = T·log₂(N₀/N); por ejemplo, un resto con el 25 % del carbono-14 inicial tiene dos semividas: 11 460 años.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 8, ymin: 0, ymax: 105, w: 600, h: 280, etx: "semividas", ety: "%", etiqueta: "Desintegración" });
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(RAD).map(function (k) { return { k: k, t: RAD[k].t }; }), "c14", function (k) { st.k = k; pinta(); });
    pinta();
  };
})(window);
