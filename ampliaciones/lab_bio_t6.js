/* ============================================================
   Bachi para Firu · Biología II, tema 6 (La célula)
   bio_celula: célula animal, vegetal y procariota; pulsa un orgánulo y mira qué es, cómo es y dónde está.
   bio_transporte: cuatro formas de cruzar la membrana + curva de velocidad (lineal frente a saturable) y efecto de quitar el ATP.
   bio_secrecion: la ruta de una proteína, del núcleo a la exocitosis, paso a paso (secreción, lisosoma o membrana).
   Estilos inyectados desde aquí. Las cifras del modelo (v = 3·S; v = 100·S/(2+S)) las recalcula herramientas/verificar_bio2_t6.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio6-estilos")) return;
    var s = document.createElement("style"); s.id = "bio6-estilos";
    s.textContent =
      ".bio6-svg{display:block;width:100%;max-width:520px;height:auto;margin:6px auto}" +
      ".bio6-svg text{font:600 11px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio6-svg .b6-m{fill:var(--sheet);stroke:var(--ink-faint);stroke-width:3}" +
      ".bio6-svg .b6-pared{fill:none;stroke:var(--ink-faint);stroke-width:9}" +
      ".bio6-svg .b6-nuc{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2.5}" +
      ".bio6-svg .b6-nu{fill:var(--pen);opacity:.55}" +
      ".bio6-svg .b6-rer{fill:none;stroke:var(--pen);stroke-width:7;stroke-linecap:round;stroke-linejoin:round}" +
      ".bio6-svg .b6-rel{fill:none;stroke:var(--pen);stroke-width:3.5;stroke-linecap:round;opacity:.8}" +
      ".bio6-svg .b6-pt{fill:var(--ink)}" +
      ".bio6-svg .b6-gol{fill:none;stroke:var(--ok);stroke-width:6;stroke-linecap:round}" +
      ".bio6-svg .b6-liso{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio6-svg .b6-mito{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio6-svg .b6-cr{fill:none;stroke:var(--red);stroke-width:1.6}" +
      ".bio6-svg .b6-cloro{fill:var(--ok-soft);stroke:var(--ok);stroke-width:2}" +
      ".bio6-svg .b6-gr{fill:var(--ok);opacity:.7}" +
      ".bio6-svg .b6-vac{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2;opacity:.8}" +
      ".bio6-svg .b6-cent{fill:var(--ink-faint)}" +
      ".bio6-svg .b6-cito{fill:none;stroke:var(--ink-faint);stroke-width:1.4;stroke-dasharray:5 4}" +
      ".bio6-svg .b6-adn{fill:var(--red-soft);stroke:var(--red);stroke-width:2.5}" +
      ".bio6-svg .b6-fl{fill:none;stroke:var(--ink-faint);stroke-width:3;stroke-linecap:round}" +
      ".bio6-svg .b6-o{cursor:pointer}" +
      ".bio6-svg .b6-o:hover{filter:drop-shadow(0 0 3px var(--pen))}" +
      ".bio6-svg .b6-o.on{filter:drop-shadow(0 0 5px var(--red))}" +
      ".bio6-svg .b6-fase{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio6-svg .b6-cab{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.5}" +
      ".bio6-svg .b6-col{stroke:var(--pen);stroke-width:2;fill:none}" +
      ".bio6-svg .b6-prot{fill:var(--ok-soft);stroke:var(--ok);stroke-width:2.5}" +
      ".bio6-svg .b6-par{fill:var(--red)}" +
      ".bio6-svg .b6-flecha{fill:none;stroke:var(--red);stroke-width:2.5}" +
      ".bio6-svg .b6-dot{fill:var(--red);stroke:var(--sheet);stroke-width:1.5;transition:cx .6s,cy .6s}" +
      ".bio6-svg .b6-el{opacity:.45;transition:opacity .3s}" +
      ".bio6-svg .b6-el.on{opacity:1;filter:drop-shadow(0 0 4px var(--pen))}" +
      ".bio6-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio6-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio6-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio6-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio6-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio6-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio6-pres{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}" +
      ".bio6-pres span{padding:4px 9px;border-radius:999px;border:1.5px solid var(--line);font-size:13px;color:var(--ink);background:var(--sheet)}" +
      ".bio6-pres span.si{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio6-pres span.no{color:var(--ink-faint);text-decoration:line-through}" +
      ".bio6-botones{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0}" +
      "@media(max-width:520px){.bio6-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  function f1(x) { return B.fmt(x, 1); }
  function grp(k, inner) { return '<g class="b6-o" data-k="' + k + '" tabindex="0" role="button" aria-label="' + k + '">' + inner + "</g>"; }
  function pts(lista, cl) { return lista.map(function (p) { return '<circle class="' + cl + '" cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>'; }).join(""); }

  // ------------------------------------------------------------------ 1. ¿QUÉ HAY DENTRO DE LA CÉLULA?
  // p = presencia [animal, vegetal, procariota]
  var ORG = {
    mem: { n: "Membrana plasmática", e: "Una membrana: bicapa de fosfolípidos con proteínas (y colesterol en la animal).", f: "Separa la célula del exterior y controla qué entra y qué sale; recibe señales.", p: [1, 1, 1] },
    pared: { n: "Pared celular", e: "Envuelve la membrana. Vegetal: celulosa. Bacteria: peptidoglucano.", f: "Da forma y protege de la rotura por ósmosis (turgencia).", p: [0, 1, 1] },
    nuc: { n: "Núcleo", e: "Envoltura de dos membranas con poros; dentro, cromatina y nucleolo.", f: "Guarda el ADN y dirige la célula: aquí se replica y se transcribe.", p: [1, 1, 0] },
    nucleolo: { n: "Nucleolo", e: "Zona densa dentro del núcleo, sin membrana.", f: "Fabrica el ARN ribosómico y ensambla las subunidades de los ribosomas.", p: [1, 1, 0] },
    nucleoide: { n: "Nucleoide", e: "Zona del citoplasma con un único ADN circular, sin envoltura.", f: "Contiene el cromosoma bacteriano.", p: [0, 0, 1] },
    plasmido: { n: "Plásmido", e: "Pequeño ADN circular extra, independiente del cromosoma.", f: "Lleva genes accesorios (p. ej. resistencia a antibióticos).", p: [0, 0, 1] },
    ribo: { n: "Ribosomas", e: "ARNr y proteínas, sin membrana. 80S en eucariotas (60S + 40S); 70S en procariotas (50S + 30S).", f: "Traducen el ARNm: fabrican proteínas.", p: [1, 1, 1] },
    rer: { n: "Retículo endoplasmático rugoso", e: "Sacos aplanados cubiertos de ribosomas, continuos con la envoltura nuclear.", f: "Sintetiza y pliega proteínas de secreción, de membrana y de lisosomas.", p: [1, 1, 0] },
    rel: { n: "Retículo endoplasmático liso", e: "Red de tubos sin ribosomas.", f: "Sintetiza lípidos, detoxifica (hígado) y almacena Ca²⁺ (músculo).", p: [1, 1, 0] },
    golgi: { n: "Aparato de Golgi", e: "Pila de sacos aplanados con cara cis (entrada) y cara trans (salida).", f: "Modifica, clasifica y empaqueta en vesículas; forma lisosomas.", p: [1, 1, 0] },
    liso: { n: "Lisosomas", e: "Vesículas de una membrana con enzimas hidrolíticas (pH ≈ 5).", f: "Digieren material captado y orgánulos viejos (autofagia).", p: [1, 0, 0] },
    mito: { n: "Mitocondria", e: "Doble membrana; la interna forma crestas; matriz con ADN circular y ribosomas 70S.", f: "Respiración celular: produce la mayor parte del ATP.", p: [1, 1, 0] },
    cloro: { n: "Cloroplasto", e: "Doble membrana; tilacoides apilados (grana) en el estroma, con ADN y ribosomas 70S.", f: "Fotosíntesis: transforma la luz en energía química y fija CO₂.", p: [0, 1, 0] },
    vac: { n: "Vacuola central", e: "Una membrana (tonoplasto); puede ocupar el 80–90 % de la célula.", f: "Almacena agua, iones y desechos; mantiene la turgencia.", p: [0, 1, 0] },
    cent: { n: "Centriolos", e: "Dos cilindros perpendiculares de 9 tripletes de microtúbulos (9 × 3).", f: "Organizan el huso mitótico y la base de cilios y flagelos.", p: [1, 0, 0] },
    cito: { n: "Citoesqueleto", e: "Red de microfilamentos, filamentos intermedios y microtúbulos.", f: "Da forma, mueve orgánulos y vesículas y permite la división.", p: [1, 1, 0] },
    flag: { n: "Flagelo bacteriano", e: "Filamento de flagelina que gira anclado en la pared y la membrana.", f: "Movimiento de la bacteria (distinto del flagelo eucariota 9 + 2).", p: [0, 0, 1] }
  };
  var TIPOS = {
    animal: { t: "Eucariota animal", claves: ["mem", "nuc", "nucleolo", "ribo", "rer", "rel", "golgi", "liso", "mito", "cent", "cito"], i: 0 },
    vegetal: { t: "Eucariota vegetal", claves: ["pared", "mem", "nuc", "nucleolo", "ribo", "rer", "rel", "golgi", "mito", "cloro", "vac", "cito"], i: 1 },
    proca: { t: "Procariota (bacteria)", claves: ["pared", "mem", "nucleoide", "plasmido", "ribo", "flag"], i: 2 }
  };

  function dibujo(tipo) {
    var o = "";
    if (tipo === "animal") {
      o += grp("mem", '<ellipse class="b6-m" cx="160" cy="115" rx="148" ry="102"/>');
      o += grp("cito", '<path class="b6-cito" d="M105 70 L52 42 M120 150 L72 190 M160 150 L150 205 M70 105 L18 112 M190 60 L230 22"/>');
      o += grp("nuc", '<circle class="b6-nuc" cx="115" cy="105" r="42"/>');
      o += grp("nucleolo", '<circle class="b6-nu" cx="106" cy="98" r="12"/>');
      o += grp("rer", '<path class="b6-rer" d="M165 62 q16 8 0 16 t0 16 t0 16 t0 16"/><path class="b6-rer" d="M180 62 q16 8 0 16 t0 16 t0 16 t0 16"/>' + pts([[172, 60], [172, 126], [187, 60], [187, 126]], "b6-pt"));
      o += grp("ribo", pts([[60, 150], [75, 160], [140, 168], [150, 40], [225, 160], [95, 170], [200, 40]], "b6-pt"));
      o += grp("rel", '<path class="b6-rel" d="M190 150 q14 -12 28 0 t28 0 t28 0 M200 168 q14 -12 28 0 t28 0"/>');
      o += grp("golgi", '<path class="b6-gol" d="M215 80 q22 -9 44 0"/><path class="b6-gol" d="M213 91 q24 -9 48 0"/><path class="b6-gol" d="M213 102 q24 -9 48 0"/><path class="b6-gol" d="M215 113 q22 -9 44 0"/>');
      o += grp("liso", '<circle class="b6-liso" cx="272" cy="138" r="10"/><circle class="b6-liso" cx="284" cy="116" r="6"/>');
      o += grp("mito", '<ellipse class="b6-mito" cx="70" cy="170" rx="24" ry="12"/><path class="b6-cr" d="M54 170 l5 -7 l5 7 l5 -7 l5 7 l5 -7 l5 7 l5 -7"/><ellipse class="b6-mito" cx="215" cy="190" rx="22" ry="11"/><path class="b6-cr" d="M200 190 l5 -6 l5 6 l5 -6 l5 6 l5 -6 l5 6"/>');
      o += grp("cent", '<rect class="b6-cent" x="150" y="182" width="16" height="6" rx="2"/><rect class="b6-cent" x="154" y="168" width="6" height="16" rx="2"/>');
    } else if (tipo === "vegetal") {
      o += grp("pared", '<rect class="b6-pared" x="6" y="6" width="308" height="218" rx="18"/>');
      o += grp("mem", '<rect class="b6-m" x="14" y="14" width="292" height="202" rx="14"/>');
      o += grp("vac", '<ellipse class="b6-vac" cx="118" cy="115" rx="64" ry="78"/><text x="118" y="119" text-anchor="middle">vacuola</text>');
      o += grp("cito", '<path class="b6-cito" d="M30 30 L52 60 M190 30 L215 38 M300 110 L282 130 M30 200 L55 180"/>');
      o += grp("nuc", '<circle class="b6-nuc" cx="248" cy="62" r="30"/>');
      o += grp("nucleolo", '<circle class="b6-nu" cx="242" cy="58" r="9"/>');
      o += grp("rer", '<path class="b6-rer" d="M200 108 q8 12 16 0 t16 0 t16 0 t16 0"/><path class="b6-rer" d="M200 122 q8 12 16 0 t16 0 t16 0 t16 0"/>');
      o += grp("ribo", pts([[40, 120], [28, 150], [160, 28], [195, 90], [290, 90], [180, 205], [40, 40]], "b6-pt"));
      o += grp("rel", '<path class="b6-rel" d="M195 140 q10 -10 20 0 t20 0 t20 0"/>');
      o += grp("golgi", '<path class="b6-gol" d="M200 168 q18 -8 36 0"/><path class="b6-gol" d="M198 178 q20 -8 40 0"/><path class="b6-gol" d="M198 188 q20 -8 40 0"/><path class="b6-gol" d="M200 198 q18 -8 36 0"/>');
      o += grp("mito", '<ellipse class="b6-mito" cx="272" cy="148" rx="17" ry="9"/><path class="b6-cr" d="M259 148 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5"/>');
      o += grp("cloro", '<ellipse class="b6-cloro" cx="270" cy="192" rx="24" ry="12"/><rect class="b6-gr" x="258" y="187" width="6" height="9"/><rect class="b6-gr" x="268" y="187" width="6" height="9"/><rect class="b6-gr" x="278" y="187" width="6" height="9"/><ellipse class="b6-cloro" cx="38" cy="95" rx="12" ry="22"/><rect class="b6-gr" x="33" y="84" width="9" height="6"/><rect class="b6-gr" x="33" y="94" width="9" height="6"/>');
    } else {
      o += grp("pared", '<rect class="b6-pared" x="14" y="50" width="236" height="130" rx="65"/>');
      o += grp("mem", '<rect class="b6-m" x="23" y="59" width="218" height="112" rx="56"/>');
      o += grp("flag", '<path class="b6-fl" d="M250 115 q10 -20 20 0 t20 0 t20 0"/>');
      o += grp("nucleoide", '<ellipse class="b6-adn" cx="115" cy="115" rx="48" ry="30"/><path class="b6-cr" d="M80 112 c14 -26 40 -20 30 4 c-8 18 -26 16 -14 -2 c10 -14 32 -10 24 6 c-6 12 -22 12 -12 0 M100 130 c14 8 40 4 52 -10"/>');
      o += grp("plasmido", '<circle class="b6-adn" cx="190" cy="92" r="11" style="fill:none"/>');
      o += grp("ribo", pts([[55, 90], [60, 140], [175, 135], [200, 125], [215, 105], [90, 150], [150, 80], [45, 115], [165, 150]], "b6-pt"));
    }
    return '<svg class="bio6-svg" viewBox="0 0 320 230" role="img" aria-label="Esquema de una ' + TIPOS[tipo].t + '. Pulsa un orgánulo.">' + o + "</svg>";
  }

  B.w.bio_celula = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Dentro de la célula: pulsa un orgánulo");
    cuerpo.innerHTML = '<p class="w-intro">Elige el tipo de célula y pulsa un orgánulo, en el dibujo o en la lista. Verás cómo es, qué hace y en qué tipos de célula aparece.</p>' +
      '<div data-tipo></div><div class="bio6-dib"></div><div data-lista></div><div class="bio6-veredicto"></div><div class="bio6-pres"></div>' +
      '<p class="w-pie">Esquemas simplificados y sin escala. Los lisosomas se indican solo en la célula animal: en la vegetal, la vacuola hace un trabajo parecido.</p>';
    var tipo = "animal", sel = "mem";
    var dib = cuerpo.querySelector(".bio6-dib"), ver = cuerpo.querySelector(".bio6-veredicto"), pres = cuerpo.querySelector(".bio6-pres"), lista = cuerpo.querySelector("[data-lista]");
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "animal", t: "Animal" }, { k: "vegetal", t: "Vegetal" }, { k: "proca", t: "Procariota" }], tipo, function (k) {
      tipo = k; if (TIPOS[k].claves.indexOf(sel) < 0) sel = TIPOS[k].claves[0]; pinta();
    });
    function elige(k) { if (TIPOS[tipo].claves.indexOf(k) >= 0) { sel = k; pinta(); } }
    dib.addEventListener("click", function (e) { var g = e.target.closest("[data-k]"); if (g) elige(g.getAttribute("data-k")); });
    dib.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { var g = e.target.closest("[data-k]"); if (g) { e.preventDefault(); elige(g.getAttribute("data-k")); } } });
    function pinta() {
      dib.innerHTML = dibujo(tipo);
      Array.prototype.forEach.call(dib.querySelectorAll("[data-k]"), function (g) {
        var k = g.getAttribute("data-k"); g.setAttribute("aria-label", ORG[k].n); if (k === sel) g.classList.add("on");
      });
      U.fichas(lista, TIPOS[tipo].claves.map(function (k) { return { k: k, t: ORG[k].n }; }), sel, function (k) { elige(k); });
      var o = ORG[sel];
      ver.innerHTML = "<b>" + o.n + "</b><br><i>Cómo es:</i> " + o.e + "<br><i>Qué hace:</i> " + o.f;
      var nombres = ["Animal", "Vegetal", "Procariota"];
      pres.innerHTML = nombres.map(function (nm, i) { return '<span class="' + (o.p[i] ? "si" : "no") + '">' + nm + (o.p[i] ? " ✓" : " ✗") + "</span>"; }).join("");
    }
    pinta();
  };

  // ------------------------------------------------------------------ 2. TRANSPORTE A TRAVÉS DE LA MEMBRANA
  var K_SIMPLE = 3, VMAX = 100, KM = 2;     // v = 3·S ; v = 100·S/(2+S)  (unidades arbitrarias, [S] en mM)
  function vSimple(S) { return K_SIMPLE * S; }
  function vSat(S) { return VMAX * S / (KM + S); }
  var TRANS = {
    simple: { t: "Difusión simple", grad: "A favor", atp: "No", prot: "Ninguna", ej: "O₂, CO₂, etanol, esteroides", msg: "La molécula pequeña y apolar se disuelve en la bicapa y la atraviesa sola, de donde hay más a donde hay menos. La velocidad crece en proporción a la diferencia de concentración: no se satura." },
    facil: { t: "Difusión facilitada", grad: "A favor", atp: "No", prot: "Canal o permeasa", ej: "glucosa (GLUT), iones por canales, agua por acuaporinas", msg: "Sigue siendo a favor del gradiente y sin ATP, pero necesita una proteína: la molécula polar no puede cruzar los lípidos. Hay pocas proteínas, así que la velocidad se satura (V<sub>max</sub>)." },
    activo: { t: "Transporte activo", grad: "En contra", atp: "Sí", prot: "Bomba (ATPasa)", ej: "bomba Na⁺/K⁺: saca 3 Na⁺ y mete 2 K⁺ por cada ATP", msg: "Mueve la sustancia contra su gradiente y gasta ATP. También se satura. Si se quita el ATP (cianuro, falta de glucosa u oxígeno), la bomba se para y el gradiente se pierde." },
    masa: { t: "Transporte en masa", grad: "No aplica", atp: "Sí", prot: "Vesículas", ej: "fagocitosis, pinocitosis, exocitosis de hormonas", msg: "Para partículas o macromoléculas: la membrana forma una vesícula que se cierra (endocitosis) o se fusiona con ella para vaciarse fuera (exocitosis). Gasta energía y reordena la membrana." }
  };
  function dibTrans(k, conATP) {
    var s = '<svg class="bio6-svg" viewBox="0 0 320 200" role="img" aria-label="Transporte ' + TRANS[k].t + '">';
    s += '<rect class="b6-fase" x="2" y="2" width="316" height="84" rx="8"/><rect class="b6-fase" x="2" y="114" width="316" height="84" rx="8"/>';
    s += '<text x="10" y="16">Exterior</text><text x="10" y="192">Interior</text>';
    var huecoDe = k === "facil" || k === "activo" ? [140, 180] : null, i;
    // membrana: cabezas arriba y abajo con hueco para la proteína
    var arriba = "", abajo = "";
    for (i = 0; i < 15; i++) {
      var x = 14 + i * 21;
      if (huecoDe && x > huecoDe[0] - 14 && x < huecoDe[1] + 14) continue;
      arriba += '<circle class="b6-cab" cx="' + x + '" cy="90" r="7.5"/><path class="b6-col" d="M' + x + ' 97 v6"/>';
      abajo += '<circle class="b6-cab" cx="' + x + '" cy="110" r="7.5"/><path class="b6-col" d="M' + x + ' 103 v-0"/>';
    }
    s += arriba + abajo;
    if (k === "simple") {
      s += pts([[40, 30], [90, 55], [140, 25], [200, 50], [250, 30], [280, 60], [60, 70], [220, 20]], "b6-par");
      s += pts([[100, 150], [230, 165]], "b6-par");
      s += '<path class="b6-flecha" d="M160 40 L160 160"/><path class="b6-flecha" d="M152 150 L160 162 L168 150"/><text x="168" y="58">O₂</text><text x="168" y="84" style="font-size:10px">atraviesa los lípidos</text>';
    } else if (k === "facil") {
      s += '<rect class="b6-prot" x="140" y="80" width="40" height="40" rx="10"/><text x="160" y="104" text-anchor="middle" style="font-size:10px">canal</text>';
      s += pts([[40, 30], [90, 55], [140, 25], [200, 50], [250, 30], [280, 60], [60, 70], [220, 20]], "b6-par");
      s += pts([[100, 150], [230, 165]], "b6-par");
      s += '<path class="b6-flecha" d="M160 40 L160 74"/><path class="b6-flecha" d="M160 126 L160 160"/><path class="b6-flecha" d="M152 150 L160 162 L168 150"/><text x="196" y="70">glucosa</text>';
    } else if (k === "activo") {
      s += '<rect class="b6-prot" x="140" y="76" width="40" height="48" rx="10"/><text x="160" y="104" text-anchor="middle" style="font-size:10px">bomba</text>';
      s += pts([[40, 30], [90, 55], [140, 25]], "b6-par");
      s += pts([[60, 150], [100, 165], [140, 150], [200, 165], [250, 150], [280, 168], [230, 135], [30, 170]], "b6-par");
      s += '<path class="b6-flecha" d="M160 126 L160 40"/><path class="b6-flecha" d="M152 50 L160 38 L168 50"/><text x="170" y="64">Na⁺ sale</text>';
      s += conATP ? '<text x="196" y="146">ATP → ADP + Pᵢ</text>' : '<text x="196" y="146" style="fill:var(--red)">sin ATP: parada</text>';
    } else {
      s += '<path class="b6-col" d="M2 100 H96 q22 0 22 -14 q0 -16 -22 -16 q-22 0 -22 16"/>';
      s += '<circle class="b6-cab" cx="96" cy="86" r="0"/><ellipse class="b6-prot" cx="120" cy="140" rx="22" ry="20"/><text x="120" y="144" text-anchor="middle" style="font-size:10px">vesícula</text>';
      s += '<path class="b6-flecha" d="M96 48 L106 118"/><path class="b6-flecha" d="M97 108 L106 120 L112 107"/><text x="40" y="30">endocitosis</text>';
      s += '<ellipse class="b6-prot" cx="236" cy="140" rx="22" ry="20"/><path class="b6-flecha" d="M236 118 L236 60"/><path class="b6-flecha" d="M229 70 L236 58 L243 70"/><text x="246" y="40">exocitosis</text>';
      s += pts([[40, 150]], "b6-par");
    }
    return s + "</svg>";
  }

  B.w.bio_transporte = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cuatro formas de cruzar la membrana");
    cuerpo.innerHTML = '<p class="w-intro">Elige el mecanismo y compara. Con el deslizador subes la concentración fuera y ves cómo responde la velocidad; con «Sin ATP» comprueba qué transportes se paran.</p>' +
      '<div data-tipo></div><div class="bio6-dib"></div><div class="bio6-dato"></div><div class="bio6-veredicto"></div>' +
      '<div data-atp></div><div data-ctl></div><div class="w-plot"></div><div class="bio6-lect lectura anch"></div>' +
      '<p class="w-pie">Unidades arbitrarias: difusión simple v = 3·[S]; mecanismos con proteína v = 100·[S]/(2 + [S]), con [S] en mM.</p>';
    var tp = "simple", atp = true, S = 2;
    var dib = cuerpo.querySelector(".bio6-dib"), dat = cuerpo.querySelector(".bio6-dato"), ver = cuerpo.querySelector(".bio6-veredicto"), plot = cuerpo.querySelector(".w-plot"), lect = cuerpo.querySelector(".bio6-lect");
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "simple", t: "Difusión simple" }, { k: "facil", t: "Difusión facilitada" }, { k: "activo", t: "Transporte activo" }, { k: "masa", t: "En masa" }], tp, function (k) { tp = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-atp]"), [{ k: "si", t: "Con ATP" }, { k: "no", t: "Sin ATP (cianuro)" }], "si", function (k) { atp = k === "si"; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "[S] fuera", min: 0, max: 20, step: 0.5, val: S, fmt: function (v) { return f1(v) + " mM"; }, on: function (v) { S = v; pinta(); } });
    var g = new B.Plot(plot, { xmin: 0, xmax: 20, ymin: 0, ymax: 105, w: 600, h: 260, etx: "[S] fuera (mM)", ety: "v (u. a.)", etiqueta: "Velocidad de transporte frente a concentración exterior" });
    function vel() {
      if (tp === "simple") return vSimple(S);
      if (tp === "facil") return vSat(S);
      if (tp === "activo") return atp ? vSat(S) : 0;
      return null;
    }
    function pinta() {
      var T = TRANS[tp], v = vel();
      dib.innerHTML = dibTrans(tp, atp);
      dat.innerHTML = "<div><b>Gradiente</b>" + T.grad + "</div><div><b>Gasto de ATP</b>" + T.atp + "</div><div><b>Proteína</b>" + T.prot + "</div><div><b>Ejemplos</b>" + T.ej + "</div>";
      var cls = "";
      if (tp === "activo" && !atp) cls = " mal";
      ver.className = "bio6-veredicto" + cls;
      ver.innerHTML = "<b>" + T.t + ".</b> " + T.msg;
      plot.style.display = lect.style.display = tp === "masa" ? "none" : "";
      cuerpo.querySelector("[data-atp]").style.display = tp === "activo" || tp === "masa" ? "" : "none";
      cuerpo.querySelector("[data-ctl]").style.display = tp === "masa" ? "none" : "";
      if (tp === "masa") return;
      g.limpiar();
      g.curva(vSimple, { clase: tp === "simple" ? "c-pen" : "c-faint", dash: tp === "simple" ? null : "6 4" });
      g.curva(vSat, { clase: tp === "simple" ? "c-faint" : (tp === "activo" && !atp ? "c-faint" : "c-ok"), dash: tp === "simple" ? "6 4" : null });
      if (tp === "activo" && !atp) g.segmento(0, 0, 20, 0, { clase: "c-red" });
      g.punto(S, v, { clase: "c-red" });
      if (tp !== "simple") g.horizontal(VMAX, { clase: "c-faint" });
      g.texto(19.8, VMAX + 2, "Vmax", { ancla: "end", clase: "c-faint" });
      lect.innerHTML = "[S] = " + f1(S) + " mM → <b>v = " + f1(v) + " u. a.</b>" + (tp !== "simple" ? " (" + f1(v / VMAX * 100) + " % de V<sub>max</sub>)" : "");
    }
    pinta();
  };

  // ------------------------------------------------------------------ 3. RUTA DE UNA PROTEÍNA
  var PASOS = [
    { t: "1. Núcleo", o: "núcleo", txt: "Un gen se transcribe a ARNm, que sale al citoplasma por los poros de la envoltura nuclear.", el: ["nuc"], x: 50, y: 60 },
    { t: "2. Ribosoma y péptido señal", o: "RER", txt: "El ARNm se une a un ribosoma. El extremo inicial de la proteína (péptido señal) lo lleva a acoplarse al retículo rugoso.", el: ["rer"], x: 90, y: 40 },
    { t: "3. Dentro del RER", o: "RER", txt: "Mientras se sintetiza, la cadena entra en la luz del RER; allí se pliega y recibe sus primeros azúcares (glicosilación).", el: ["rer"], x: 99, y: 72 },
    { t: "4. Vesícula de transporte", o: "vesícula", txt: "Un trozo de RER se estrangula y forma una vesícula (ya sin ribosomas) que viaja hacia el Golgi.", el: ["v1"], x: 140, y: 100 },
    { t: "5. Aparato de Golgi", o: "Golgi", txt: "La vesícula se funde con la cara cis. La proteína va madurando a través de los sacos y se modifica (más azúcares, cortes).", el: ["gol"], x: 190, y: 102 },
    { t: "6. Clasificación en la cara trans", o: "vesícula", el: ["v2"], x: 238, y: 95 },
    { t: "7. Destino final", o: "membrana", el: ["mem"], x: 305, y: 95 }
  ];
  var DESTINO = {
    sec: { n: "Secreción", t6: "Desde la cara trans salen vesículas de secreción cargadas con la proteína (p. ej. insulina, enzimas digestivas).", t7: "Exocitosis: la vesícula se fusiona con la membrana plasmática y libera la proteína fuera de la célula.", x6: 238, y6: 95, x7: 305, y7: 95, el6: ["v2"], el7: ["mem"] },
    liso: { n: "Lisosoma", t6: "Las proteínas marcadas como enzimas digestivas salen en vesículas que se convertirán en lisosomas.", t7: "Queda en el lisosoma: las hidrolasas trabajarán dentro, a pH ≈ 5, sin dañar el resto de la célula.", x6: 200, y6: 150, x7: 205, y7: 158, el6: ["v3"], el7: ["v3"] },
    mem: { n: "Membrana", t6: "Si es una proteína de membrana, queda anclada en la pared de la vesícula, con su parte soluble hacia la luz.", t7: "La vesícula se fusiona con la membrana plasmática: la proteína queda en ella y su parte interior mira ahora al exterior.", x6: 238, y6: 95, x7: 285, y7: 95, el6: ["v2"], el7: ["mem"] }
  };
  function dibSec(paso, dest) {
    var P = PASOS[paso], x = P.x, y = P.y, el = P.el;
    if (paso === 5) { x = DESTINO[dest].x6; y = DESTINO[dest].y6; el = DESTINO[dest].el6; }
    if (paso === 6) { x = DESTINO[dest].x7; y = DESTINO[dest].y7; el = DESTINO[dest].el7; }
    function c(k, inner) { return '<g class="b6-el' + (el.indexOf(k) >= 0 ? " on" : "") + '" data-el="' + k + '">' + inner + "</g>"; }
    var s = '<svg class="bio6-svg" viewBox="0 0 320 200" role="img" aria-label="Ruta de una proteína de secreción, paso ' + (paso + 1) + '">';
    s += c("nuc", '<circle class="b6-nuc" cx="50" cy="60" r="36"/><path class="b6-m" d="M18 40 l-6 -4 M14 70 l-8 0 M30 92 l-4 6" style="stroke-width:3"/><text x="50" y="108" text-anchor="middle">núcleo</text>');
    s += c("rer", '<path class="b6-rer" d="M92 24 q12 10 0 20 t0 20 t0 20 t0 20"/><path class="b6-rer" d="M106 24 q12 10 0 20 t0 20 t0 20 t0 20"/>' + pts([[86, 24], [86, 64], [100, 104], [100, 24]], "b6-pt") + '<text x="100" y="124" text-anchor="middle">RER</text>');
    s += c("v1", '<circle class="b6-liso" cx="140" cy="100" r="8"/><text x="140" y="124" text-anchor="middle" style="font-size:10px">vesícula</text>');
    s += c("gol", '<path class="b6-gol" d="M165 82 q25 -10 50 0"/><path class="b6-gol" d="M163 94 q27 -10 54 0"/><path class="b6-gol" d="M163 106 q27 -10 54 0"/><path class="b6-gol" d="M165 118 q25 -10 50 0"/><text x="190" y="140" text-anchor="middle">Golgi</text><text x="156" y="76" style="font-size:9px">cis</text><text x="214" y="76" style="font-size:9px">trans</text>');
    s += c("v2", '<circle class="b6-liso" cx="238" cy="95" r="8"/>');
    s += c("v3", '<circle class="b6-liso" cx="200" cy="155" r="9"/><text x="200" y="182" text-anchor="middle" style="font-size:10px">lisosoma</text>');
    s += c("mem", '<path class="b6-m" d="M285 6 V194" style="stroke-width:7"/><text x="284" y="14" text-anchor="end" style="font-size:10px">membrana</text><text x="294" y="30" style="font-size:10px">exterior</text>');
    s += '<circle class="b6-dot" cx="' + x + '" cy="' + y + '" r="5.5"/></svg>';
    return s;
  }

  B.w.bio_secrecion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El viaje de una proteína por la célula");
    cuerpo.innerHTML = '<p class="w-intro">Avanza paso a paso (el punto rojo es la proteína). En los pasos 6 y 7 puedes elegir su destino: secreción, lisosoma o membrana.</p>' +
      '<div data-dest></div><div data-pasos></div><div class="bio6-dib"></div><div class="bio6-veredicto"></div><div class="bio6-botones"></div>' +
      '<p class="w-pie">Ruta de síntesis y secreción: núcleo → ribosoma → RER → vesícula → Golgi → vesícula → destino (Palade, 1974).</p>';
    var paso = 0, dest = "sec";
    var dib = cuerpo.querySelector(".bio6-dib"), ver = cuerpo.querySelector(".bio6-veredicto"), fp = cuerpo.querySelector("[data-pasos]");
    U.fichas(cuerpo.querySelector("[data-dest]"), [{ k: "sec", t: "Se secreta" }, { k: "liso", t: "Va a un lisosoma" }, { k: "mem", t: "Es de membrana" }], dest, function (k) { dest = k; pinta(); });
    var bt = cuerpo.querySelector(".bio6-botones");
    U.boton(bt, "← Anterior", function () { if (paso > 0) { paso--; pinta(); } });
    U.boton(bt, "Siguiente →", function () { if (paso < PASOS.length - 1) { paso++; pinta(); } });
    U.boton(bt, "Reiniciar", function () { paso = 0; pinta(); });
    function pinta() {
      var P = PASOS[paso], txt = paso === 5 ? DESTINO[dest].t6 : paso === 6 ? DESTINO[dest].t7 : P.txt, titulo = P.t;
      if (paso === 6) titulo = "7. Destino final: " + DESTINO[dest].n.toLowerCase();
      U.fichas(fp, PASOS.map(function (p, i) { return { k: String(i), t: String(i + 1) }; }), String(paso), function (k) { paso = +k; pinta(); });
      dib.innerHTML = dibSec(paso, dest);
      ver.innerHTML = "<b>" + titulo + "</b><br>" + txt + "<br><i>Orgánulo:</i> " + P.o;
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
