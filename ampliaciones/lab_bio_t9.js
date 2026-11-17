/* ============================================================
   Bachi para Firu · Biología II, tema 9 (Anabolismo: la fotosíntesis)
   bio_esquemaz: el esquema en Z paso a paso (flujo acíclico y cíclico) con el recuento de H⁺, O₂, NADPH y ATP.
   bio_calvin:   el ciclo de Calvin como contabilidad: nº de CO₂ → ATP, NADPH y glucosas (planta C3 o C4).
   bio_fotofactores: velocidad de fotosíntesis según luz, CO₂ y temperatura (factor limitante, plantas C3 y C4).
   bio_c3c4cam:  un día en una planta C3, C4 o CAM (estomas, fijación del CO₂, fotorrespiración).
   Estilos inyectados desde aquí. Los números del modelo los recalcula herramientas/verificar_bio2_t9.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio9-estilos")) return;
    var s = document.createElement("style"); s.id = "bio9-estilos";
    s.textContent =
      ".bio9-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio9-svg text{font:600 13px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio9-svg .b9-nodo{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio9-svg .b9-nodo.on{fill:var(--pen-soft);stroke:var(--pen)}" +
      ".bio9-svg .b9-nodo.ahora{fill:var(--red-soft);stroke:var(--red);stroke-width:2.5}" +
      ".bio9-svg .b9-ar{fill:none;stroke:var(--ink-faint);stroke-width:1.5;stroke-dasharray:4 3}" +
      ".bio9-svg .b9-ar.on{stroke:var(--pen);stroke-width:2.5;stroke-dasharray:none}" +
      ".bio9-svg .b9-ar.ahora{stroke:var(--red);stroke-width:3;stroke-dasharray:none}" +
      ".bio9-svg .b9-pt{fill:var(--ink-faint)} .bio9-svg .b9-pt.on{fill:var(--pen)} .bio9-svg .b9-pt.ahora{fill:var(--red)}" +
      ".bio9-svg .b9-luz{fill:none;stroke:#e0a21a;stroke-width:3}" +
      ".bio9-svg .b9-mem{fill:var(--pen-soft);opacity:.55}" +
      ".bio9-svg .b9-peq{font-size:11px;fill:var(--ink-faint);font-weight:500}" +
      ".bio9-svg .b9-fondo{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio9-svg .b9-est{fill:var(--ok-soft);stroke:var(--ok);stroke-width:2.5}" +
      ".bio9-svg .b9-hoja{fill:var(--ok-soft);stroke:var(--ok);stroke-width:2}" +
      ".bio9-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio9-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio9-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio9-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio9-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio9-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio9-barra{margin:6px 0;font-size:13px;color:var(--ink)}" +
      ".bio9-barra .pista{height:14px;border-radius:7px;background:var(--sheet-2);border:1.5px solid var(--line);overflow:hidden;margin-top:2px}" +
      ".bio9-barra .pista i{display:block;height:100%;background:var(--pen)}" +
      ".bio9-barra.lim .pista i{background:var(--red)}" +
      ".bio9-barra.lim b{color:var(--red)}" +
      "@media(max-width:520px){.bio9-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  var NS = "http://www.w3.org/2000/svg";

  // ------------------------------------------------------------------ ESQUEMA EN Z
  // Nodos (x, y = energía: más arriba, más energía). Z: PSII → PQ → b6f → PC → PSI → Fd → NADPH.
  var NODOS = {
    h2o: [30, 218, "H₂O"], p680: [66, 176, "P680"], p680e: [66, 62, "P680*"], pq: [122, 90, "PQ"],
    b6f: [172, 112, "b₆f"], pc: [218, 134, "PC"], p700: [260, 170, "P700"], p700e: [260, 52, "P700*"],
    fd: [304, 64, "Fd"], nadp: [338, 108, "NADPH"]
  };
  // Cada paso: texto, aristas nuevas, nodos activos y recuento acumulado (por cada 2 e⁻ que recorren la cadena).
  var Z_ACICLICO = [
    { t: "<b>1. La luz excita el fotosistema II.</b> Los pigmentos antena pasan la energía al centro de reacción P680, que se queda con un electrón de alta energía (P680*).", ar: ["p680-p680e"], h: 0, o2: 0, nadph: 0, atp: 0 },
    { t: "<b>2. Fotólisis del agua.</b> P680⁺ recupera electrones del agua: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻. Los H⁺ quedan en el lumen y el O₂ sale de la hoja.", ar: ["h2o-p680"], h: 2, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>3. Cadena entre fotosistemas.</b> El electrón de P680* baja por la plastoquinona (PQ): va perdiendo energía.", ar: ["p680e-pq"], h: 2, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>4. Complejo citocromo b₆f.</b> Con la energía que pierde el electrón, bombea H⁺ del estroma al lumen (≈ 4 H⁺ por cada 2 e⁻).", ar: ["pq-b6f"], h: 6, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>5. Plastocianina (PC).</b> Una proteína con cobre lleva el electrón hasta el fotosistema I y rellena el hueco de P700.", ar: ["b6f-pc", "pc-p700"], h: 6, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>6. La luz excita el fotosistema I.</b> P700 absorbe energía y expulsa un electrón de muy alta energía (P700*).", ar: ["p700-p700e"], h: 6, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>7. Ferredoxina (Fd).</b> Recoge el electrón de P700* y lo lleva hacia el estroma.", ar: ["p700e-fd"], h: 6, o2: 0.5, nadph: 0, atp: 0 },
    { t: "<b>8. NADP⁺ reductasa.</b> NADP⁺ + H⁺ + 2 e⁻ → <b>NADPH</b>. Ya tenemos el poder reductor para el ciclo de Calvin.", ar: ["fd-nadp"], h: 6, o2: 0.5, nadph: 1, atp: 0 },
    { t: "<b>9. ATP sintasa.</b> Los H⁺ acumulados en el lumen vuelven al estroma por la ATP sintasa y se fabrica <b>ATP</b> (fotofosforilación acíclica).", ar: [], atpsint: true, h: 6, o2: 0.5, nadph: 1, atp: 1.5 }
  ];
  var Z_CICLICO = [
    { t: "<b>1. La luz excita solo el fotosistema I.</b> P700 pasa a P700* y expulsa un electrón de alta energía. No interviene el PSII: no hay fotólisis.", ar: ["p700-p700e"], h: 0, o2: 0, nadph: 0, atp: 0 },
    { t: "<b>2. La ferredoxina no entrega el electrón al NADP⁺.</b> Lo devuelve a la cadena, hacia el complejo citocromo b₆f.", ar: ["p700e-fd", "fd-b6f"], h: 0, o2: 0, nadph: 0, atp: 0 },
    { t: "<b>3. Citocromo b₆f.</b> Al pasar por él, el electrón hace que se bombeen H⁺ al lumen (≈ 4 H⁺ por cada 2 e⁻).", ar: [], h: 4, o2: 0, nadph: 0, atp: 0 },
    { t: "<b>4. Plastocianina.</b> Devuelve el electrón al P700: el ciclo queda cerrado y el mismo electrón puede volver a empezar.", ar: ["b6f-pc", "pc-p700"], h: 4, o2: 0, nadph: 0, atp: 0 },
    { t: "<b>5. ATP sintasa.</b> Los H⁺ del lumen vuelven al estroma y se fabrica <b>ATP</b> (fotofosforilación cíclica). No hay O₂ ni NADPH.", ar: [], atpsint: true, h: 4, o2: 0, nadph: 0, atp: 1 }
  ];
  var Z_ARISTAS = {
    "p680-p680e": ["p680", "p680e", true], "h2o-p680": ["h2o", "p680"], "p680e-pq": ["p680e", "pq"], "pq-b6f": ["pq", "b6f"],
    "b6f-pc": ["b6f", "pc"], "pc-p700": ["pc", "p700"], "p700-p700e": ["p700", "p700e", true], "p700e-fd": ["p700e", "fd"],
    "fd-nadp": ["fd", "nadp"], "fd-b6f": ["fd", "b6f"]
  };

  B.w.bio_esquemaz = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El esquema en Z paso a paso");
    cuerpo.innerHTML = '<p class="w-intro">Elige el flujo y avanza paso a paso. Verás por dónde viaja el electrón y qué se va produciendo (cifras por cada 2 electrones).</p>' +
      '<div data-modo></div><div data-ctl></div><div class="bio9-dibujo"></div><div class="bio9-texto bio9-veredicto"></div><div class="bio9-dato"></div>' +
      '<p class="w-pie">Convención: 4 H⁺ por cada ATP (otros libros usan ≈ 4,67; el balance exacto cambia un poco). La altura del dibujo es la energía del electrón.</p>';
    var modo = "aci", paso = 0;
    var dib = cuerpo.querySelector(".bio9-dibujo"), txt = cuerpo.querySelector(".bio9-texto"), dat = cuerpo.querySelector(".bio9-dato");
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "aci", t: "Flujo acíclico" }, { k: "cic", t: "Flujo cíclico" }], modo, function (k) { modo = k; paso = 0; sl.input.max = lista().length; sl.set(1); pinta(); });
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Paso", min: 1, max: 9, step: 1, val: 1, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { paso = Math.round(v) - 1; pinta(); } });
    function lista() { return modo === "aci" ? Z_ACICLICO : Z_CICLICO; }
    function pinta() {
      var L = lista(), n = L.length; if (paso > n - 1) paso = n - 1;
      var hechas = {}, ahora = {}, i, k;
      for (i = 0; i <= paso; i++) L[i].ar.forEach(function (a) { (i === paso ? ahora : hechas)[a] = true; });
      var nodos = {};
      Object.keys(hechas).concat(Object.keys(ahora)).forEach(function (a) { nodos[Z_ARISTAS[a][0]] = 1; nodos[Z_ARISTAS[a][1]] = 1; });
      var ahoraN = {}; Object.keys(ahora).forEach(function (a) { ahoraN[Z_ARISTAS[a][0]] = 1; ahoraN[Z_ARISTAS[a][1]] = 1; });
      var s = '<svg class="bio9-svg" viewBox="0 0 380 250" role="img" aria-label="Esquema en Z de la fase luminosa">' +
        '<rect class="b9-fondo" x="4" y="4" width="372" height="242" rx="12"/>' +
        '<rect class="b9-mem" x="4" y="231" width="372" height="15" rx="4"/><text class="b9-peq" x="12" y="242">membrana del tilacoide (abajo, el estroma)</text>' +
        '<text class="b9-peq" x="12" y="20">energía del electrón ↑</text>';
      Object.keys(Z_ARISTAS).forEach(function (a) {
        var d = Z_ARISTAS[a], p = NODOS[d[0]], q = NODOS[d[1]], cl = ahora[a] ? " ahora" : (hechas[a] ? " on" : "");
        var ocultar = (modo === "aci" && a === "fd-b6f") || (modo === "cic" && (a === "p680-p680e" || a === "h2o-p680" || a === "p680e-pq" || a === "pq-b6f" || a === "fd-nadp"));
        if (ocultar) return;
        var dx = q[0] - p[0], dy = q[1] - p[1], L2 = Math.sqrt(dx * dx + dy * dy), ux = dx / L2, uy = dy / L2;
        var x1 = p[0] + ux * 22, y1 = p[1] + uy * 11, x2 = q[0] - ux * 24, y2 = q[1] - uy * 12;
        if (d[2]) { x1 = p[0]; y1 = p[1] - 11 * (dy < 0 ? 1 : -1); x2 = q[0]; y2 = q[1] + 12 * (dy < 0 ? 1 : -1); }
        s += '<line class="b9-ar' + cl + '" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>';
        var px = x2, py = y2, nx = -uy, ny = ux;
        s += '<polygon class="b9-pt' + cl + '" points="' + px.toFixed(1) + "," + py.toFixed(1) + " " + (px - ux * 8 + nx * 4).toFixed(1) + "," + (py - uy * 8 + ny * 4).toFixed(1) + " " + (px - ux * 8 - nx * 4).toFixed(1) + "," + (py - uy * 8 - ny * 4).toFixed(1) + '"/>';
      });
      Object.keys(NODOS).forEach(function (k2) {
        if (modo === "cic" && (k2 === "h2o" || k2 === "p680" || k2 === "p680e" || k2 === "pq" || k2 === "nadp")) return;
        var p = NODOS[k2], cl = ahoraN[k2] ? " ahora" : (nodos[k2] ? " on" : "");
        s += '<rect class="b9-nodo' + cl + '" x="' + (p[0] - 26) + '" y="' + (p[1] - 11) + '" width="52" height="22" rx="7"/><text x="' + p[0] + '" y="' + (p[1] + 4) + '" text-anchor="middle">' + p[2] + '</text>';
      });
      // fotones
      var luz = [];
      if (modo === "aci") { luz.push(["p680", 0]); luz.push(["p700", 5]); } else luz.push(["p700", 0]);
      luz.forEach(function (l) { if (paso >= l[1]) { var p = NODOS[l[0]]; s += '<path class="b9-luz" d="M' + (p[0] - 34) + "," + (p[1] + 14) + ' q4,-8 8,0 t8,0 t8,0"/><text class="b9-peq" x="' + (p[0] - 36) + '" y="' + (p[1] + 28) + '">luz</text>'; } });
      // ATP sintasa
      var atp = L[paso].atpsint;
      s += '<rect class="b9-nodo' + (atp ? " ahora" : "") + '" x="150" y="196" width="86" height="24" rx="8"/><text x="193" y="212" text-anchor="middle">ATP sintasa</text>';
      s += '<text class="b9-peq" x="244" y="212">H⁺ salen ⇒ ATP</text>';
      s += '</svg>';
      dib.innerHTML = s;
      txt.innerHTML = L[paso].t;
      var c = L[paso];
      dat.innerHTML = '<div><b>H⁺ bombeados al lumen</b>' + B.fmt(c.h, 0) + '</div><div><b>O₂ liberado</b>' + (c.o2 ? B.fmt(c.o2, 1) + " (por 2 e⁻)" : "0") + '</div><div><b>NADPH formado</b>' + B.fmt(c.nadph, 0) + '</div><div><b>ATP formado</b>' + (c.atp ? "≈ " + B.fmt(c.atp, 1) : "0") + '</div>';
    }
    pinta();
  };

  // ------------------------------------------------------------------ CICLO DE CALVIN
  B.w.bio_calvin = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El ciclo de Calvin: la contabilidad");
    cuerpo.innerHTML = '<p class="w-intro">Mueve el número de CO₂ que fija la planta y mira cuánto ATP y NADPH gasta y cuánta glucosa sale. Prueba a llegar a 6.</p>' +
      '<div data-tipo></div><div data-ctl></div><div class="bio9-dato"></div><div class="bio9-veredicto"></div><p class="w-pie">C3: 3 ATP y 2 NADPH por CO₂ (2 ATP para reducir el 3-PGA y 1 para regenerar la RuBP). Planta C4: unos 2 ATP más por CO₂ para el transporte del CO₂ (convención de los libros: 5 ATP y 2 NADPH).</p>';
    var tipo = "c3", n = 3;
    var dat = cuerpo.querySelector(".bio9-dato"), ver = cuerpo.querySelector(".bio9-veredicto");
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "c3", t: "Planta C3" }, { k: "c4", t: "Planta C4" }], tipo, function (k) { tipo = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "CO₂ fijados", min: 1, max: 12, step: 1, val: n, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { n = Math.round(v); pinta(); } });
    function fr(x) { return Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : B.fmt(x, 2); }
    function pinta() {
      var atpPorCO2 = tipo === "c4" ? 5 : 3, atp = atpPorCO2 * n, nadph = 2 * n, g3p = n / 3, glu = n / 6;
      dat.innerHTML = '<div><b>3-PGA formados</b>' + (2 * n) + ' (' + (6 * n) + ' C)</div>' +
        '<div><b>G3P que salen del ciclo</b>' + fr(g3p) + '</div>' +
        '<div><b>ATP gastado</b>' + atp + (tipo === "c3" ? ' (' + (2 * n) + ' reducción + ' + n + ' regeneración)' : '') + '</div>' +
        '<div><b>NADPH gastado</b>' + nadph + '</div>' +
        '<div><b>Glucosa formada</b>' + fr(glu) + '</div>' +
        '<div><b>Balance de carbono</b>' + n + ' C del CO₂ + ' + (5 * n) + ' C de RuBP = ' + (6 * n) + ' C</div>';
      var cls = "";
      if (n % 6 === 0) { ver.textContent = "Con " + n + " CO₂ salen " + (n / 6) + " glucosa(s) completa(s): gastan " + atp + " ATP y " + nadph + " NADPH."; cls = " ok"; }
      else if (n % 3 === 0) ver.textContent = "Con " + n + " CO₂ salen " + (n / 3) + " G3P (triosas, 3 C). Para una glucosa (6 C) hacen falta dos G3P, es decir, 6 CO₂.";
      else ver.textContent = "Con " + n + " CO₂ aún no sale ninguna triosa entera: el ciclo se completa de 3 en 3 CO₂ (1 G3P) y de 6 en 6 para una glucosa.";
      ver.className = "bio9-veredicto" + cls;
    }
    pinta();
  };

  // ------------------------------------------------------------------ FACTORES QUE AFECTAN
  // Modelo de factor limitante (Blackman), en unidades arbitrarias 0–100. Se recalcula en el verificador.
  var PLANTA = {
    c3: { luzSat: 1000, co2Div: 6, tOpt: 30, tAn: 15, nombre: "C3" },
    c4: { luzSat: 1500, co2Div: 2, tOpt: 35, tAn: 15, nombre: "C4" }
  };
  function rLuz(p, I) { return Math.min(100, 100 * I / p.luzSat); }
  function rCO2(p, C) { return Math.min(100, C / p.co2Div); }
  function rTemp(p, T) { var z = (T - p.tOpt) / p.tAn; return 100 * Math.exp(-z * z); }
  function tasa(p, I, C, T) { return Math.min(rLuz(p, I), rCO2(p, C), rTemp(p, T)); }

  B.w.bio_fotofactores = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Luz, CO₂ y temperatura: ¿qué limita?");
    cuerpo.innerHTML = '<p class="w-intro">Cambia los tres factores. La velocidad de la fotosíntesis la marca el factor que está más escaso: el <b>factor limitante</b>.</p>' +
      '<div data-tipo></div><div data-ctl></div><div data-bar></div><div class="bio9-veredicto"></div>' +
      '<div data-eje></div><div class="w-plot"></div><p class="w-pie">Modelo sencillo (unidades arbitrarias, 100 = máximo de la planta): la velocidad es la menor de las tres. En una planta real las curvas son más suaves, pero la idea es la misma.</p>';
    var tipo = "c3", I = 500, C = 400, T = 25, eje = "I";
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "c3", t: "Planta C3 (trigo)" }, { k: "c4", t: "Planta C4 (maíz)" }], tipo, function (k) { tipo = k; pinta(); });
    U.slider(ctl, { et: "Luz", min: 0, max: 2000, step: 50, val: I, fmt: function (v) { return B.fmt(v, 0) + " µmol/m²s"; }, on: function (v) { I = v; pinta(); } });
    U.slider(ctl, { et: "CO₂", min: 0, max: 1000, step: 10, val: C, fmt: function (v) { return B.fmt(v, 0) + " ppm"; }, on: function (v) { C = v; pinta(); } });
    U.slider(ctl, { et: "Temperatura", min: 0, max: 50, step: 1, val: T, fmt: function (v) { return B.fmt(v, 0) + " °C"; }, on: function (v) { T = v; pinta(); } });
    U.fichas(cuerpo.querySelector("[data-eje]"), [{ k: "I", t: "Curva frente a la luz" }, { k: "C", t: "Curva frente al CO₂" }, { k: "T", t: "Curva frente a la temperatura" }], eje, function (k) { eje = k; pinta(); });
    var barras = cuerpo.querySelector("[data-bar]"), ver = cuerpo.querySelector(".bio9-veredicto");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 2000, ymin: 0, ymax: 105, w: 600, h: 250, etx: "luz (µmol/m²s)", ety: "velocidad (%)", etiqueta: "Velocidad de fotosíntesis" });
    function pinta() {
      var p = PLANTA[tipo], a = rLuz(p, I), b = rCO2(p, C), c = rTemp(p, T), v = Math.min(a, b, c);
      var lim = (a <= b && a <= c) ? "luz" : (b <= c ? "CO₂" : "temperatura");
      function barra(nom, x, esLim) { return '<div class="bio9-barra' + (esLim ? " lim" : "") + '"><b>' + nom + "</b>: " + B.fmt(x, 0) + ' %<div class="pista"><i style="width:' + x.toFixed(1) + '%"></i></div></div>'; }
      barras.innerHTML = barra("Lo que permite la luz", a, lim === "luz") + barra("Lo que permite el CO₂", b, lim === "CO₂") + barra("Lo que permite la temperatura", c, lim === "temperatura");
      ver.className = "bio9-veredicto" + (v < 30 ? " mal" : (v > 85 ? " ok" : ""));
      ver.innerHTML = "Velocidad de fotosíntesis: <b>" + B.fmt(v, 0) + " %</b>. Factor limitante: <b>" + lim + "</b>." + (v >= 99.5 ? " Todo al máximo: nada limita." : " Mejorar los otros dos factores no sube la velocidad; solo mejorar este.");
      var f, xmax, et;
      if (eje === "I") { xmax = 2000; et = "luz (µmol/m²s)"; f = function (x) { return tasa(p, x, C, T); }; }
      else if (eje === "C") { xmax = 1000; et = "CO₂ (ppm)"; f = function (x) { return tasa(p, I, x, T); }; }
      else { xmax = 50; et = "temperatura (°C)"; f = function (x) { return tasa(p, I, C, x); }; }
      g.rango(0, xmax, 0, 105);
      g.limpiar();
      g.curva(f, { clase: "c-pen", n: 300 });
      var x0 = eje === "I" ? I : (eje === "C" ? C : T);
      g.punto(x0, f(x0), { clase: "c-red" });
      g.texto(xmax * 0.99, 8, et, { ancla: "end", clase: "c-faint" });
    }
    pinta();
  };

  // ------------------------------------------------------------------ C3, C4 y CAM
  B.w.bio_c3c4cam = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un día en una planta C3, C4 o CAM");
    cuerpo.innerHTML = '<p class="w-intro">Elige la planta y el ambiente y mueve la hora del día. Fíjate en cuándo abre los estomas y de dónde saca el CO₂.</p>' +
      '<div data-pl></div><div data-amb></div><div data-ctl></div><div class="bio9-dibujo"></div><div class="bio9-dato"></div><div class="bio9-veredicto"></div>' +
      '<p class="w-pie">Esquema cualitativo: día = de 7 h a 19 h; «mediodía caluroso» = de 11 h a 17 h. La fotorrespiración solo ocurre con luz y con RuBisCO.</p>';
    var pl = "c3", amb = "templado", h = 12;
    var dib = cuerpo.querySelector(".bio9-dibujo"), dat = cuerpo.querySelector(".bio9-dato"), ver = cuerpo.querySelector(".bio9-veredicto");
    U.fichas(cuerpo.querySelector("[data-pl]"), [{ k: "c3", t: "C3 (trigo)" }, { k: "c4", t: "C4 (maíz)" }, { k: "cam", t: "CAM (cactus)" }], pl, function (k) { pl = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-amb]"), [{ k: "templado", t: "Clima templado" }, { k: "seco", t: "Calor y sequía" }], amb, function (k) { amb = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Hora", min: 0, max: 23, step: 1, val: h, fmt: function (v) { return Math.round(v) + ":00"; }, on: function (v) { h = Math.round(v); pinta(); } });
    function estado() {
      var dia = h >= 7 && h < 19, medio = h >= 11 && h < 17, ap, fix, calvin, foto, agua;
      if (pl === "cam") ap = dia ? 0 : 1;
      else if (!dia) ap = 0;
      else if (amb === "seco" && medio) ap = pl === "c3" ? 0.25 : 0.55;
      else ap = 1;
      if (pl === "c3") {
        fix = dia ? "RuBisCO, directamente" : "no fija CO₂ (sin luz)";
        calvin = dia ? "células del mesófilo" : "—";
        foto = !dia ? "ninguna (sin luz)" : (amb === "seco" && medio ? "ALTA (entra poco CO₂ y sube el O₂)" : "moderada");
      } else if (pl === "c4") {
        fix = dia ? "PEP carboxilasa (4 C: oxalacetato y malato)" : "no fija CO₂ (sin luz)";
        calvin = dia ? "células de la vaina (CO₂ concentrado)" : "—";
        foto = !dia ? "ninguna (sin luz)" : "muy baja";
      } else {
        fix = dia ? "RuBisCO, con el CO₂ que libera el malato" : "PEP carboxilasa: CO₂ → malato (a la vacuola)";
        calvin = dia ? "en el mismo tipo de célula, con estomas cerrados" : "no hay Calvin (sin luz)";
        foto = !dia ? "ninguna (sin luz)" : "muy baja";
      }
      if (ap === 0) agua = "mínima (estomas cerrados)";
      else if (pl === "cam") agua = "baja (de noche hay menos evaporación)";
      else agua = amb === "seco" && ap === 1 ? "alta" : (ap < 1 ? "reducida" : "media");
      return { dia: dia, ap: ap, fix: fix, calvin: calvin, foto: foto, agua: agua };
    }
    function pinta() {
      var e = estado();
      var s = '<svg class="bio9-svg" viewBox="0 0 380 130" role="img" aria-label="Estoma y momento del día" style="max-width:420px">' +
        '<rect class="b9-fondo" x="4" y="4" width="372" height="122" rx="12" style="fill:' + (e.dia ? "#fbe9a8" : "#1e2a4a") + ';opacity:.55"/>';
      if (e.dia) s += '<circle cx="320" cy="34" r="16" fill="#e8a317"/>';
      else s += '<circle cx="320" cy="34" r="14" fill="#cfd8ee"/><circle cx="326" cy="30" r="12" fill="#1e2a4a"/>';
      var gap = 3 + 18 * e.ap;
      s += '<path class="b9-est" d="M130,66 C150,' + (66 - 8 - gap / 2) + ' 230,' + (66 - 8 - gap / 2) + ' 250,66 C230,' + (66 - 2) + ' 150,' + (66 - 2) + ' 130,66z"/>';
      s += '<path class="b9-est" d="M130,66 C150,' + (66 + 2) + ' 230,' + (66 + 2) + ' 250,66 C230,' + (66 + 8 + gap / 2) + ' 150,' + (66 + 8 + gap / 2) + ' 130,66z"/>';
      s += '<text x="190" y="112" text-anchor="middle">estomas ' + (e.ap === 0 ? "cerrados" : (e.ap < 1 ? "casi cerrados" : "abiertos")) + '</text>';
      s += '<text class="b9-peq" x="14" y="22">' + h + ':00 · ' + (e.dia ? "día" : "noche") + '</text></svg>';
      dib.innerHTML = s;
      dat.innerHTML = '<div><b>Fija el CO₂ con</b>' + e.fix + '</div><div><b>Ciclo de Calvin</b>' + e.calvin + '</div><div><b>Fotorrespiración</b>' + e.foto + '</div><div><b>Pérdida de agua</b>' + e.agua + '</div>';
      var msg, cls = "";
      if (pl === "c3") { msg = amb === "seco" ? "Planta C3: con calor y sequía cierra los estomas al mediodía, el CO₂ baja, la RuBisCO fija O₂ y aumenta la fotorrespiración: pierde rendimiento." : "Planta C3 en clima templado: fija el CO₂ con RuBisCO a la luz, con la fotorrespiración en niveles moderados."; if (amb === "seco") cls = " mal"; }
      else if (pl === "c4") { msg = "Planta C4: la PEP carboxilasa capta el CO₂ aunque haya pocos estomas abiertos y lo concentra en la vaina. Separa las dos fijaciones en el ESPACIO (dos tipos de célula)."; cls = " ok"; }
      else { msg = "Planta CAM: separa las dos fijaciones en el TIEMPO. De noche abre los estomas y guarda el CO₂ como malato; de día cierra y lo usa. Pierde muy poca agua (desierto)."; cls = " ok"; }
      ver.className = "bio9-veredicto" + cls;
      ver.textContent = msg;
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
