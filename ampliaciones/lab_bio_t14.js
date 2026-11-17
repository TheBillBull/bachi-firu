/* ============================================================
   Bachi para Firu · Biología II, tema 14 (Microbiología)
   bio_crecimiento: crecimiento bacteriano. (1) calculadora de generaciones N = N0·2^n y (2) curva por fases
                    (latencia, exponencial, estacionaria, declive) en escala logarítmica o lineal.
   bio_ciclo_viral: ciclo lítico, ciclo lisogénico y retrovirus (VIH) paso a paso, con dibujo.
   Estilos inyectados desde aquí. Los números del modelo los recalcula herramientas/verificar_bio2_t14.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio14-estilos")) return;
    var s = document.createElement("style"); s.id = "bio14-estilos";
    s.textContent =
      ".bio14-svg{display:block;width:100%;max-width:460px;height:auto;margin:6px auto}" +
      ".bio14-svg text{font:600 11px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio14-svg .b14-cel{fill:var(--pen-soft);stroke:var(--pen);stroke-width:3}" +
      ".bio14-svg .b14-lis{fill:none;stroke:var(--red);stroke-width:2.5;stroke-dasharray:6 5}" +
      ".bio14-svg .b14-adn{fill:none;stroke:var(--pen);stroke-width:3}" +
      ".bio14-svg .b14-adn.mal{stroke:var(--ink-faint);stroke-dasharray:3 3}" +
      ".bio14-svg .b14-vir{fill:none;stroke:var(--red);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}" +
      ".bio14-svg .b14-cap{fill:var(--red-soft);stroke:var(--red);stroke-width:2.5;stroke-linejoin:round}" +
      ".bio14-svg .b14-cap.vacia{fill:var(--sheet-2);stroke:var(--ink-faint);stroke-dasharray:3 3}" +
      ".bio14-svg .b14-dna2{fill:none;stroke:var(--ok);stroke-width:3;stroke-linecap:round}" +
      ".bio14-svg .b14-prot{fill:var(--pen);stroke:none}" +
      ".bio14-svg .b14-bg{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio14-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio14-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio14-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio14-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio14-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio14-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio14-pasos{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}" +
      "@media(max-width:520px){.bio14-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  function f1(x) { return B.fmt(x, 1); }
  // número grande con notación científica a partir de 10^6 (coma decimal)
  function grande(x) {
    if (x < 1e6) return String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var e = Math.floor(Math.log(x) / Math.LN10 + 1e-12), m = x / Math.pow(10, e);
    var sup = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
    return B.fmt(m, 2) + " · 10" + String(e).split("").map(function (c) { return sup[c]; }).join("");
  }

  // ------------------------------------------------------------------ CRECIMIENTO
  // Curva por fases (modelo de referencia): N0 = 1000 células/mL; latencia hasta 2 h; exponencial de 2 h a 8 h con g = 30 min
  // (12 generaciones: ×4096); estacionaria de 8 h a 16 h; declive de 16 h a 24 h a −0,2 unidades de log10 por hora.
  var N0F = 1000, T_LAT = 2, T_EXP = 8, T_EST = 16, T_FIN = 24, G_H = 0.5, PEND_DECL = 0.2;
  function log10N(t) {
    var l0 = Math.log(N0F) / Math.LN10, lmax = l0 + (T_EXP - T_LAT) / G_H * Math.log(2) / Math.LN10;
    if (t <= T_LAT) return l0;
    if (t <= T_EXP) return l0 + (t - T_LAT) / G_H * Math.log(2) / Math.LN10;
    if (t <= T_EST) return lmax;
    return lmax - PEND_DECL * (t - T_EST);
  }
  function fase(t) {
    if (t <= T_LAT) return { n: "Latencia", c: "", d: "Las bacterias se adaptan al medio nuevo: fabrican enzimas y crecen de tamaño, pero casi no se dividen." };
    if (t <= T_EXP) return { n: "Exponencial", c: "ok", d: "Cada bacteria se divide a un ritmo constante: el número se duplica cada generación (recta en escala logarítmica)." };
    if (t <= T_EST) return { n: "Estacionaria", c: "", d: "Los nutrientes escasean y se acumulan residuos tóxicos: nacen tantas como mueren y el total se mantiene." };
    return { n: "Declive (muerte)", c: "mal", d: "Mueren más bacterias de las que nacen: el número total baja." };
  }

  B.w.bio_crecimiento = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Crecimiento de un cultivo bacteriano");
    cuerpo.innerHTML = '<p class="w-intro">Dos modos: calcula cuántas bacterias hay tras cierto tiempo (N = N<sub>0</sub> · 2<sup>n</sup>) o recorre las cuatro fases de la curva de crecimiento.</p>' +
      '<div data-modo></div><div data-escala></div><div data-ctl></div><div class="w-plot"></div><div class="bio14-dato"></div><div class="bio14-veredicto"></div>' +
      '<p class="w-pie">Modelo ideal: cada bacteria se divide por bipartición cada g minutos sin parar. Curva por fases: N<sub>0</sub> = 1000 células/mL, latencia de 2 h, g = 30 min en la fase exponencial.</p>';
    var st = { modo: "calc", esc: "log", k: 0, g: 20, t: 120, h: 5 };
    var dat = cuerpo.querySelector(".bio14-dato"), ver = cuerpo.querySelector(".bio14-veredicto"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 240, ymin: 0, ymax: 10, w: 600, h: 260, etx: "tiempo (min)", ety: "log₁₀ N", etiqueta: "Crecimiento bacteriano" });
    var escHost = cuerpo.querySelector("[data-escala]");
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "calc", t: "Calcular generaciones" }, { k: "fases", t: "Curva por fases" }], st.modo, function (k) { st.modo = k; montar(); });
    var sN, sG, sT, sH;
    function montar() {
      ctl.innerHTML = "";
      if (st.modo === "calc") {
        escHost.innerHTML = "";
        sN = U.slider(ctl, { et: "N₀", min: 0, max: 4, step: 1, val: st.k, fmt: function (v) { return "10" + ["⁰", "¹", "²", "³", "⁴"][Math.round(v)] + " bact."; }, on: function (v) { st.k = Math.round(v); pinta(); } });
        sG = U.slider(ctl, { et: "g", min: 5, max: 120, step: 5, val: st.g, fmt: function (v) { return Math.round(v) + " min"; }, on: function (v) { st.g = Math.round(v); pinta(); } });
        sT = U.slider(ctl, { et: "Tiempo", min: 0, max: 240, step: 5, val: st.t, fmt: function (v) { return Math.round(v) + " min"; }, on: function (v) { st.t = Math.round(v); pinta(); } });
      } else {
        U.fichas(escHost, [{ k: "log", t: "Escala logarítmica" }, { k: "lin", t: "Escala lineal" }], st.esc, function (k) { st.esc = k; pinta(); });
        sH = U.slider(ctl, { et: "Tiempo", min: 0, max: T_FIN, step: 0.5, val: st.h, fmt: function (v) { return f1(v) + " h"; }, on: function (v) { st.h = v; pinta(); } });
      }
      pinta();
    }
    function pinta() {
      g.limpiar();
      if (st.modo === "calc") {
        var n0 = Math.pow(10, st.k), n = Math.floor(st.t / st.g + 1e-9), N = n0 * Math.pow(2, n), l0 = st.k, lg = Math.log(2) / Math.LN10;
        var ymax = Math.max(4, Math.ceil(l0 + 240 / st.g * lg) + 1);
        g.rango(0, 240, 0, ymax);
        g.polilinea([[0, l0], [240, l0 + 240 / st.g * lg]], { clase: "c-faint", dash: "6 4" });
        var pts = [], i;
        for (i = 0; i <= n; i++) { pts.push([i * st.g, l0 + i * lg]); if (i < n) pts.push([(i + 1) * st.g, l0 + i * lg]); }
        pts.push([st.t, l0 + n * lg]);
        g.polilinea(pts, { clase: "c-pen" });
        g.punto(st.t, l0 + n * lg, { clase: "c-red" });
        g.texto(236, ymax - 0.7, "recta: log N = log N₀ + n · log 2", { ancla: "end", clase: "c-faint" });
        dat.innerHTML = "<div><b>Generaciones completas (n = t / g)</b>" + n + "</div><div><b>Bacterias (N = N₀ · 2ⁿ)</b>" + grande(N) + "</div><div><b>Factor de aumento</b>×" + grande(Math.pow(2, n)) + "</div><div><b>Tiempo de generación</b>" + st.g + " min</div>";
        ver.className = "bio14-veredicto" + (N > 1e12 ? " mal" : "");
        ver.textContent = N > 1e12 ? "Esa cifra es teórica: ningún cultivo real tiene alimento para tantas bacterias; antes entraría en fase estacionaria."
          : n === 0 ? "Todavía no ha pasado ni una generación: N = N₀." : "Cada generación duplica el número: tras " + n + " generaciones, 2^" + n + " = " + grande(Math.pow(2, n)) + " veces más.";
      } else {
        var y = function (t) { var l = log10N(t); return st.esc === "log" ? l : Math.pow(10, l) / 1e6; };
        var ymaxF = st.esc === "log" ? 8 : 5;
        g.rango(0, T_FIN, st.esc === "log" ? 2 : 0, ymaxF);
        var P = [], t;
        for (t = 0; t <= T_FIN + 1e-9; t += 0.25) P.push([t, y(t)]);
        g.polilinea(P, { clase: "c-faint" });
        var Q = [];
        for (t = 0; t <= st.h + 1e-9; t += 0.25) Q.push([t, y(t)]);
        if (Q.length > 1) g.polilinea(Q, { clase: "c-pen" });
        g.punto(st.h, y(st.h), { clase: "c-red" });
        [T_LAT, T_EXP, T_EST].forEach(function (x) { g.segmento(x, st.esc === "log" ? 2 : 0, x, ymaxF, { clase: "c-faint", dash: "2 4" }); });
        var fs = fase(st.h), N2 = Math.pow(10, log10N(st.h));
        dat.innerHTML = "<div><b>Fase</b>" + fs.n + "</div><div><b>Bacterias por mL</b>" + grande(N2) + "</div>";
        ver.className = "bio14-veredicto" + (fs.c ? " " + fs.c : "");
        ver.textContent = fs.d;
        cuerpo.querySelector(".w-plot").setAttribute("data-esc", st.esc);
      }
    }
    montar();
  };

  // ------------------------------------------------------------------ CICLOS VIRALES
  // piezas del dibujo
  function celula(cx, cy, rx, ry, cls) { return '<ellipse class="' + (cls || "b14-cel") + '" cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"/>'; }
  function adn(cx, cy, r, mal) { return '<circle class="b14-adn' + (mal ? " mal" : "") + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>'; }
  function profago(cx, cy, r) {   // arco rojo sobre el cromosoma circular
    var a0 = -Math.PI / 3, a1 = -Math.PI / 12;
    return '<path class="b14-vir" d="M' + (cx + r * Math.cos(a0)).toFixed(1) + " " + (cy + r * Math.sin(a0)).toFixed(1) + " A" + r + " " + r + " 0 0 1 " + (cx + r * Math.cos(a1)).toFixed(1) + " " + (cy + r * Math.sin(a1)).toFixed(1) + '"/>';
  }
  function genoma(x, y, s) {   // ADN/ARN vírico: línea ondulada roja
    s = s || 1;
    return '<path class="b14-vir" d="M' + x + " " + y + " q" + 4 * s + " " + -7 * s + " " + 8 * s + " 0 t" + 8 * s + " 0 t" + 8 * s + ' 0"/>';
  }
  function hexa(x, y, r) { var p = [], i; for (i = 0; i < 6; i++) p.push((x + r * Math.cos(i * Math.PI / 3 + Math.PI / 6)).toFixed(1) + "," + (y + r * Math.sin(i * Math.PI / 3 + Math.PI / 6)).toFixed(1)); return p.join(" "); }
  function fago(x, y, vacia, giro) {   // cabeza icosaédrica + cola; (x, y) = punta de la cola
    var r = giro ? -1 : 1;
    return '<line class="b14-vir" x1="' + x + '" y1="' + y + '" x2="' + (x - 18 * r) + '" y2="' + y + '"/><polygon class="b14-cap' + (vacia ? " vacia" : "") + '" points="' + hexa(x - 30 * r, y, 12) + '"/>';
  }
  function viriones(lista) { return lista.map(function (p) { return '<polygon class="b14-cap" points="' + hexa(p[0], p[1], 7) + '"/>'; }).join(""); }
  function puntos(lista) { return lista.map(function (p) { return '<circle class="b14-prot" cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>'; }).join(""); }
  function env(x, y) {   // virión con envoltura y espículas
    var s = "", i;
    for (i = 0; i < 8; i++) { var a = i * Math.PI / 4; s += '<line class="b14-vir" x1="' + (x + 9 * Math.cos(a)).toFixed(1) + '" y1="' + (y + 9 * Math.sin(a)).toFixed(1) + '" x2="' + (x + 14 * Math.cos(a)).toFixed(1) + '" y2="' + (y + 14 * Math.sin(a)).toFixed(1) + '"/>'; }
    return s + '<circle class="b14-cap" cx="' + x + '" cy="' + y + '" r="9"/>';
  }
  function txt(x, y, t, ancla) { return '<text x="' + x + '" y="' + y + '"' + (ancla ? ' text-anchor="' + ancla + '"' : "") + ">" + t + "</text>"; }

  var CICLOS = {
    litico: { t: "Ciclo lítico (fago)", pasos: [
      { n: "1. Adsorción", d: "El fago reconoce y se pega a un receptor de la superficie de la bacteria con las fibras de su cola.", v: "El fago es muy específico: solo infecta a las bacterias con su receptor.", c: "",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24) + fago(80, 95, false) + txt(190, 48, "bacteria", "middle") + txt(20, 60, "fago"); } },
      { n: "2. Penetración", d: "La cola se contrae e inyecta el ADN del fago; la cápsida vacía queda fuera.", v: "Entra solo el ácido nucleico: las proteínas no pasan al interior.", c: "",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24) + fago(80, 95, true) + genoma(105, 95) + txt(30, 60, "cápsida vacía"); } },
      { n: "3. Síntesis", d: "El ADN vírico toma el control: degrada el ADN de la bacteria y usa su maquinaria para copiar el genoma y fabricar proteínas víricas.", v: "La bacteria trabaja para el virus: copias de ADN y proteínas de la cápsida.", c: "ok",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24, true) + txt(190, 100, "ADN roto", "middle") + genoma(120, 70) + genoma(150, 125) + genoma(225, 62) + genoma(235, 125) + puntos([[145, 60], [215, 95], [165, 140], [260, 95], [120, 105], [250, 60]]); } },
      { n: "4. Ensamblaje", d: "Los genomas se empaquetan en cápsidas y se arman los fagos nuevos (maduración).", v: "Se forman decenas de fagos completos dentro de la célula.", c: "ok",
        dib: function () { return celula(190, 95, 110, 70) + viriones([[135, 75], [165, 110], [200, 70], [225, 105], [250, 80], [190, 120]]); } },
      { n: "5. Lisis y liberación", d: "Una enzima del fago (endolisina) rompe la pared: la bacteria revienta y libera los fagos, que infectarán a otras.", v: "La bacteria muere (lisis): por eso se llama ciclo lítico.", c: "mal",
        dib: function () { return celula(190, 95, 110, 70, "b14-lis") + viriones([[60, 40], [120, 150], [190, 30], [260, 150], [300, 60], [190, 165], [95, 95], [285, 105]]) + txt(190, 100, "célula lisada", "middle"); } }
    ] },
    lisogenico: { t: "Ciclo lisogénico (fago)", pasos: [
      { n: "1. Adsorción y penetración", d: "Igual que en el ciclo lítico: el fago se une e inyecta su ADN.", v: "Hasta aquí los dos ciclos son idénticos.", c: "",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24) + fago(80, 95, true) + genoma(110, 95) + txt(30, 60, "cápsida vacía"); } },
      { n: "2. Integración", d: "El ADN del fago se inserta en el cromosoma bacteriano y se convierte en profago. No se fabrican virus.", v: "El profago es una parte más del ADN bacteriano: la bacteria sigue viva.", c: "ok",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24) + profago(190, 95, 24) + txt(190, 150, "profago integrado", "middle"); } },
      { n: "3. Replicación pasiva", d: "Cada vez que la bacteria se divide, copia el profago junto con su ADN: todas las hijas lo llevan.", v: "El virus se multiplica «de gratis» sin matar a nadie.", c: "ok",
        dib: function () { return celula(105, 95, 80, 56) + celula(275, 95, 80, 56) + adn(105, 95, 20) + profago(105, 95, 20) + adn(275, 95, 20) + profago(275, 95, 20) + txt(190, 100, "×2", "middle") + txt(190, 170, "bacteria lisogénica", "middle"); } },
      { n: "4. Inducción", d: "Un estrés (rayos UV, sustancias tóxicas) activa el profago: se separa del cromosoma (escisión).", v: "Un cambio ambiental hace que el virus «despierte».", c: "mal",
        dib: function () { return celula(190, 95, 110, 70) + adn(190, 95, 24) + genoma(235, 55) + txt(255, 40, "UV ⚡") + txt(190, 150, "el profago se escinde", "middle"); } },
      { n: "5. Pasa al ciclo lítico", d: "Ya libre, el genoma vírico se replica y fabrica fagos nuevos; al final la bacteria se lisa.", v: "Del ciclo lisogénico se puede pasar al lítico; al revés no.", c: "mal",
        dib: function () { return celula(190, 95, 110, 70, "b14-lis") + adn(190, 95, 24, true) + viriones([[135, 75], [165, 120], [225, 75], [245, 110]]) + txt(190, 160, "lisis", "middle"); } }
    ] },
    retro: { t: "Retrovirus (VIH)", pasos: [
      { n: "1. Adsorción y fusión", d: "Las glucoproteínas de la envoltura (gp120) se unen a la proteína CD4 de un linfocito T auxiliar y la envoltura se fusiona con la membrana.", v: "Solo ataca a células con el receptor CD4: linfocitos T auxiliares, macrófagos.", c: "",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + env(78, 95) + txt(78, 70, "VIH", "middle") + txt(250, 180, "linfocito T", "middle"); } },
      { n: "2. Entrada y decapsidación", d: "La cápsida entra y se abre: libera dos copias de ARN y las enzimas (transcriptasa inversa, integrasa).", v: "El genoma del VIH es ARN monocatenario, dos copias por virión.", c: "",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + genoma(105, 75) + genoma(105, 92) + puntos([[125, 130], [140, 118]]) + txt(250, 180, "ARN ×2 + enzimas", "middle"); } },
      { n: "3. Transcripción inversa", d: "La transcriptasa inversa copia el ARN en ADN bicatenario: ARN → ADN, al revés que en la célula.", v: "Es la gran novedad de los retrovirus: la información va de ARN a ADN.", c: "ok",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + genoma(105, 70) + '<path class="b14-dna2" d="M105 100 q4 -7 8 0 t8 0 t8 0"/><path class="b14-dna2" d="M105 108 q4 -7 8 0 t8 0 t8 0"/>' + txt(105, 140, "ADN vírico (nuevo)") + txt(105, 62, "ARN"); } },
      { n: "4. Integración", d: "La integrasa inserta el ADN vírico en el cromosoma de la célula: ahora es un provirus.", v: "El provirus queda para siempre en el ADN de la célula (y de sus descendientes).", c: "ok",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + profago(210, 95, 24) + txt(210, 150, "provirus integrado", "middle"); } },
      { n: "5. Transcripción y traducción", d: "La célula transcribe el provirus: unos ARN son genomas nuevos y otros ARNm que los ribosomas traducen a proteínas víricas.", v: "Se usa la maquinaria de la célula; las proteínas se fabrican como poliproteínas que corta la proteasa.", c: "ok",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + profago(210, 95, 24) + genoma(120, 70) + genoma(140, 130) + genoma(265, 68) + puntos([[110, 100], [160, 80], [255, 110], [285, 125], [170, 145]]); } },
      { n: "6. Ensamblaje y gemación", d: "Los virus nuevos se arman y salen por gemación, llevándose un trozo de membrana como envoltura.", v: "La célula puede seguir viva un tiempo; a la larga el VIH destruye los linfocitos T y se produce el SIDA.", c: "mal",
        dib: function () { return celula(200, 95, 105, 70) + adn(210, 95, 24) + profago(210, 95, 24) + env(296, 70) + env(300, 115) + env(95, 40) + env(98, 150) + viriones([[130, 95], [160, 125]]); } }
    ] }
  };

  B.w.bio_ciclo_viral = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cómo se reproduce un virus");
    cuerpo.innerHTML = '<p class="w-intro">Elige el tipo de ciclo y avanza paso a paso. Fíjate en qué le pasa a la célula y dónde está el material genético del virus (rojo).</p>' +
      '<div data-tipo></div><div class="bio14-pasos" data-pasos></div><div class="bio14-dibujo"></div><div class="bio14-veredicto"></div><div class="bio14-dato"></div>' +
      '<p class="w-pie">Esquemas simplificados y sin escala. Rojo: material genético y cápsida del virus; azul: célula y su ADN; verde: ADN formado por transcripción inversa.</p>';
    var tipo = "litico", k = 0;
    var pas = cuerpo.querySelector("[data-pasos]"), dib = cuerpo.querySelector(".bio14-dibujo"), ver = cuerpo.querySelector(".bio14-veredicto"), dat = cuerpo.querySelector(".bio14-dato");
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "litico", t: "Ciclo lítico" }, { k: "lisogenico", t: "Ciclo lisogénico" }, { k: "retro", t: "Retrovirus (VIH)" }], tipo, function (x) { tipo = x; k = 0; pinta(); });
    U.boton(pas, "◀ Anterior", function () { if (k > 0) { k--; pinta(); } });
    U.boton(pas, "Siguiente ▶", function () { if (k < CICLOS[tipo].pasos.length - 1) { k++; pinta(); } });
    function pinta() {
      var c = CICLOS[tipo], p = c.pasos[k];
      dib.innerHTML = '<svg class="bio14-svg" viewBox="0 0 320 190" role="img" aria-label="' + c.t + ", paso " + (k + 1) + '"><rect class="b14-bg" x="3" y="3" width="314" height="184" rx="14"/>' + p.dib() + "</svg>";
      ver.className = "bio14-veredicto" + (p.c ? " " + p.c : "");
      ver.textContent = p.v;
      dat.innerHTML = "<div><b>Paso " + (k + 1) + " de " + c.pasos.length + "</b>" + p.n.replace(/^\d+\.\s*/, "") + "</div><div><b>Qué ocurre</b>" + p.d + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
