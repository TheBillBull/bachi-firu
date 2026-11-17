/* ============================================================
   Bachi para Firu · Biología II, tema 12 (Expresión génica)
   bio_traductor: del ADN a la proteína: escribes una hebra de ADN, ves el ARNm, los codones, los aminoácidos y el ribosoma leyendo.
   bio_maduracion: del pre-ARNm al ARNm maduro (caperuza, splicing, poli-A) y splicing alternativo.
   bio_operon: operón lac (glucosa, lactosa, mutantes) y operón trp (triptófano).
   Estilos inyectados desde aquí. Las traducciones, las longitudes y los estados del operón los recalcula herramientas/verificar_bio2_t12.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio12-estilos")) return;
    var s = document.createElement("style"); s.id = "bio12-estilos";
    s.textContent =
      ".bio12-svg{display:block;width:100%;max-width:580px;height:auto;margin:6px auto}" +
      ".bio12-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio12-svg .b12-peq{font-size:10.5px;fill:var(--ink-faint);font-weight:500}" +
      ".bio12-svg .b12-adn{fill:none;stroke:var(--ink-faint);stroke-width:4}" +
      ".bio12-svg .b12-exon{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.5}" +
      ".bio12-svg .b12-exon.sal{fill:var(--sheet-2);stroke:var(--line);stroke-dasharray:4 3}" +
      ".bio12-svg .b12-intron{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio12-svg .b12-cap{fill:var(--red)} .bio12-svg .b12-polya{fill:var(--ok)}" +
      ".bio12-svg .b12-gen{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.5}" +
      ".bio12-svg .b12-gen.on{fill:var(--ok-soft);stroke:var(--ok)}" +
      ".bio12-svg .b12-prom{fill:var(--sheet-2);stroke:var(--ink-faint);stroke-width:1.5}" +
      ".bio12-svg .b12-op{fill:var(--sheet-2);stroke:var(--red);stroke-width:2}" +
      ".bio12-svg .b12-rep{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio12-svg .b12-rep.off{fill:var(--sheet-2);stroke:var(--ink-faint);stroke-dasharray:4 3}" +
      ".bio12-svg .b12-pol{fill:var(--ok-soft);stroke:var(--ok);stroke-width:2}" +
      ".bio12-svg .b12-pol.debil{fill:var(--sheet-2);stroke:var(--ok);stroke-dasharray:4 3}" +
      ".bio12-svg .b12-mrna{fill:none;stroke:var(--ok);stroke-width:3}" +
      ".bio12-svg .b12-rib{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.5}" +
      ".bio12-svg .b12-trna{fill:var(--sheet);stroke:var(--red);stroke-width:2}" +
      ".bio12-svg .b12-aa{fill:var(--ok)}" +
      ".bio12-svg .b12-cod{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio12-svg .b12-cod.act{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2.5}" +
      ".bio12-svg .b12-cod.fin{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio12-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio12-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35;min-width:0;overflow-wrap:anywhere}" +
      ".bio12-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio12-dato .sec{font-family:ui-monospace,Menlo,Consolas,monospace;letter-spacing:.04em}" +
      ".bio12-dato .ancho{grid-column:1/-1}" +
      ".bio12-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio12-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio12-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio12-in{width:100%;box-sizing:border-box;padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);color:var(--ink);font:600 15px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase}" +
      ".bio12-lab{display:block;font-size:12px;color:var(--ink-faint);margin:6px 0 3px;text-transform:uppercase;letter-spacing:.03em}" +
      "@media(max-width:520px){.bio12-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------------ código genético (orden de bases U, C, A, G)
  var BASES = "UCAG";
  var TABLA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  var AA = { F: ["Phe", "fenilalanina"], L: ["Leu", "leucina"], S: ["Ser", "serina"], Y: ["Tyr", "tirosina"], C: ["Cys", "cisteína"], W: ["Trp", "triptófano"],
    P: ["Pro", "prolina"], H: ["His", "histidina"], Q: ["Gln", "glutamina"], R: ["Arg", "arginina"], I: ["Ile", "isoleucina"], M: ["Met", "metionina"],
    T: ["Thr", "treonina"], N: ["Asn", "asparagina"], K: ["Lys", "lisina"], V: ["Val", "valina"], A: ["Ala", "alanina"], D: ["Asp", "aspártico"],
    E: ["Glu", "glutámico"], G: ["Gly", "glicina"], "*": ["Stop", "parada"] };
  function aaDe(cod) {
    var i = BASES.indexOf(cod.charAt(0)) * 16 + BASES.indexOf(cod.charAt(1)) * 4 + BASES.indexOf(cod.charAt(2));
    return TABLA.charAt(i);
  }
  var COMP = { A: "T", T: "A", C: "G", G: "C" };
  function comp(s) { return s.split("").map(function (b) { return COMP[b]; }).join(""); }
  function aARN(s) { return s.replace(/T/g, "U"); }
  function anticodon(cod) {   // codón 5'→3' → anticodón 3'→5'
    var c = { A: "U", U: "A", G: "C", C: "G" };
    return cod.split("").map(function (b) { return c[b]; }).join("");
  }
  function traducir(arn) {    // desde el primer AUG; devuelve codones, aminoácidos y si terminó en parada
    var ini = arn.indexOf("AUG");
    if (ini < 0) return { ini: -1, cod: [], aa: [], parada: false };
    var cod = [], aa = [], parada = false;
    for (var i = ini; i + 3 <= arn.length; i += 3) {
      var c = arn.substr(i, 3), a = aaDe(c);
      cod.push(c);
      if (a === "*") { parada = true; break; }
      aa.push(a);
    }
    return { ini: ini, cod: cod, aa: aa, parada: parada };
  }
  B.lab = B.lab || {};
  B.lab.bio12 = { AA: AA, aaDe: aaDe, traducir: traducir, comp: comp, aARN: aARN, anticodon: anticodon };

  // ------------------------------------------------------------------ TRADUCTOR
  var PRE = {
    corto: { t: "Péptido corto", s: "ATGTTTGGCAAAGATTGA" },
    utr: { t: "Con secuencia antes del AUG", s: "GGCATGGCCGAGCTGTAAC" },
    stop: { t: "Parada prematura", s: "ATGGCTTGGTAATTTGGCCAT" }
  };

  B.w.bio_traductor = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Del ADN a la proteína: transcribe y traduce");
    cuerpo.innerHTML = '<p class="w-intro">Elige un ejemplo o escribe tu propia secuencia de ADN (solo A, C, G y T). Verás la hebra molde, el ARNm, los codones y la proteína; con el deslizador, el ribosoma lee codón a codón.</p>' +
      '<div data-pre></div><div data-hebra></div><label class="bio12-lab">Secuencia de ADN</label><input class="bio12-in" type="text" maxlength="45" spellcheck="false" autocomplete="off" aria-label="Secuencia de ADN">' +
      '<div data-ctl></div><div class="bio12-dibujo"></div><div class="bio12-dato"></div><div class="bio12-veredicto"></div>' +
      '<p class="w-pie">Hebra codificante: tiene la misma secuencia que el ARNm (con T en lugar de U). Hebra molde: la que lee la ARN polimerasa (complementaria y antiparalela). El ribosoma empieza en el primer AUG y termina en un codón de parada.</p>';
    var hebra = "cod", seq = PRE.corto.s, k = 0, ultimaPre = "corto";
    var inp = cuerpo.querySelector("input"), dib = cuerpo.querySelector(".bio12-dibujo"), dat = cuerpo.querySelector(".bio12-dato"), ver = cuerpo.querySelector(".bio12-veredicto");
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Codón", min: 0, max: 5, step: 1, val: 0, fmt: function (v) { return "n.º " + (Math.round(v) + 1); }, on: function (v) { k = Math.round(v); pinta(); } });
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(PRE).map(function (x) { return { k: x, t: PRE[x].t }; }), "corto", function (x) {
      ultimaPre = x; hebra = "cod"; seq = PRE[x].s; inp.value = seq; k = 0; sl.set(0);
      cuerpo.querySelectorAll("[data-hebra] .chip-btn").forEach(function (c) { var on = c.getAttribute("data-k") === "cod"; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      pinta();
    });
    U.fichas(cuerpo.querySelector("[data-hebra]"), [{ k: "cod", t: "Escribo la hebra codificante" }, { k: "mol", t: "Escribo la hebra molde" }], hebra, function (x) { hebra = x; pinta(); });
    inp.value = seq;
    inp.addEventListener("input", function () {
      var v = inp.value.toUpperCase().replace(/[^ACGT]/g, "");
      if (v !== inp.value.toUpperCase()) inp.value = v;
      seq = v; k = 0; sl.set(0); pinta();
    });
    function pinta() {
      var cod = hebra === "cod" ? seq : comp(seq);              // hebra codificante 5'→3'
      var molde = comp(cod);                                      // molde escrita 3'→5' bajo la codificante (complemento base a base)
      var arn = aARN(cod), tr = traducir(arn), n = tr.cod.length;
      sl.input.max = Math.max(0, n - 1); if (k > n - 1) { k = Math.max(0, n - 1); sl.set(k); }
      var W = 560, x0 = 6, filas = tr.ini >= 0 ? tr.cod : [];
      var s = '<svg class="bio12-svg" viewBox="0 0 ' + W + ' 170" role="img" aria-label="Ribosoma leyendo el ARNm">';
      if (tr.ini < 0) {
        s += '<text x="10" y="40">No hay codón AUG: el ribosoma no encuentra dónde empezar.</text>';
      } else {
        var cw = Math.min(70, (W - 20) / Math.max(1, filas.length)), xs = 10;
        for (var i = 0; i < filas.length; i++) {
          var a = aaDe(filas[i]), stop = a === "*", x = xs + i * cw;
          s += '<rect class="b12-cod' + (i === k ? (stop ? " fin" : " act") : "") + '" x="' + (x + 2).toFixed(1) + '" y="86" width="' + (cw - 4).toFixed(1) + '" height="26" rx="5"/>' +
            '<text x="' + (x + cw / 2).toFixed(1) + '" y="104" text-anchor="middle" style="font-size:' + (cw < 40 ? 9 : 12) + 'px">' + filas[i] + '</text>' +
            '<text class="b12-peq" x="' + (x + cw / 2).toFixed(1) + '" y="128" text-anchor="middle">' + AA[a][0] + '</text>';
        }
        var xr = xs + k * cw + cw / 2;
        s += '<rect class="b12-rib" x="' + (xr - 34).toFixed(1) + '" y="46" width="68" height="34" rx="14"/><text class="b12-peq" x="' + xr.toFixed(1) + '" y="38" text-anchor="middle">ribosoma</text>';
        var cur = filas[k], ant = anticodon(cur), a2 = aaDe(cur);
        if (a2 !== "*") {
          s += '<rect class="b12-trna" x="' + (xr - 22).toFixed(1) + '" y="52" width="44" height="22" rx="6"/><text x="' + xr.toFixed(1) + '" y="67" text-anchor="middle" style="font-size:10px">' + ant + '</text>' +
            '';
        } else {
          s += '<text class="b12-peq" x="' + xr.toFixed(1) + '" y="66" text-anchor="middle">sin ARNt</text>';
        }
        s += '<text class="b12-peq" x="10" y="150">ARNm: 5\' → 3\' (a partir del AUG)</text>';
      }
      s += '</svg>';
      dib.innerHTML = s;
      var prot = tr.aa.map(function (a) { return AA[a][0]; }).join(" – ");
      var f1 = '<div class="ancho"><b>Hebra codificante 5\'→3\'</b><span class="sec">' + (cod || "—") + '</span></div>' +
        '<div class="ancho"><b>Hebra molde 3\'→5\'</b><span class="sec">' + (molde || "—") + '</span></div>' +
        '<div class="ancho"><b>ARNm 5\'→3\'</b><span class="sec">' + (arn || "—") + '</span></div>';
      var f2 = tr.ini < 0 ? '' : '<div><b>Primer AUG</b>posición ' + (tr.ini + 1) + (tr.ini > 0 ? ' (antes hay ' + tr.ini + ' nt sin traducir)' : '') + '</div>' +
        '<div><b>Proteína</b>' + tr.aa.length + ' aminoácido' + (tr.aa.length === 1 ? '' : 's') + (tr.parada ? ' + parada' : ', sin codón de parada') + '</div>' +
        '<div class="ancho"><b>Cadena de aminoácidos</b>' + (prot || "—") + '</div>';
      dat.innerHTML = f1 + f2;
      if (tr.ini < 0) { ver.className = "bio12-veredicto mal"; ver.textContent = seq.length < 3 ? "Escribe al menos 3 bases." : "Sin AUG no hay inicio de traducción: prueba con otra secuencia."; return; }
      var cur2 = tr.cod[k], a3 = aaDe(cur2);
      ver.className = "bio12-veredicto" + (a3 === "*" ? " mal" : " ok");
      ver.textContent = a3 === "*"
        ? "Codón " + cur2 + ": es de parada. Ningún ARNt lo reconoce; un factor de liberación suelta la cadena de " + tr.aa.length + " aminoácidos."
        : "Codón " + cur2 + " → anticodón del ARNt 3'-" + anticodon(cur2) + "-5' → " + AA[a3][1] + " (" + AA[a3][0] + "). " + (k === 0 ? "Es el AUG de inicio: metionina." : "Se une con enlace peptídico a la cadena (" + k + " aa antes).");
    }
    pinta();
  };

  // ------------------------------------------------------------------ MADURACIÓN DEL ARNm
  // Modelo de ejemplo: 4 exones y 3 intrones (longitudes en nt) más caperuza y cola poli-A de 200 A.
  var EXON = [90, 120, 60, 150], INTR = [400, 800, 300], POLYA = 200;
  function longitudes(omitido, paso) {
    var pre = EXON.reduce(function (a, b) { return a + b; }, 0) + INTR.reduce(function (a, b) { return a + b; }, 0);
    var ex = EXON.reduce(function (a, e, i) { return a + (omitido === i ? 0 : e); }, 0);
    return { pre: pre, ex: ex, madura: ex + POLYA, aa: ex / 3 };
  }
  B.lab.bio12.longitudes = longitudes;

  B.w.bio_maduracion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Maduración del ARNm: caperuza, splicing y poli-A");
    cuerpo.innerHTML = '<p class="w-intro">En eucariotas, el ARN recién transcrito (pre-ARNm) se procesa en el núcleo antes de salir. Avanza paso a paso; después prueba el splicing alternativo saltándote un exón.</p>' +
      '<div data-ctl></div><div data-alt></div><div class="bio12-dibujo"></div><div class="bio12-dato"></div><div class="bio12-veredicto"></div>' +
      '<p class="w-pie">Modelo de ejemplo: 4 exones (90, 120, 60 y 150 nt) y 3 intrones (400, 800 y 300 nt). La cola poli-A se cuenta como 200 A. La caperuza no suma longitud en este modelo. Los exones se cuentan de 3 en 3 para saber cuántos aminoácidos codifican.</p>';
    var paso = 0, omit = -1;
    var dib = cuerpo.querySelector(".bio12-dibujo"), dat = cuerpo.querySelector(".bio12-dato"), ver = cuerpo.querySelector(".bio12-veredicto");
    var NOMP = ["0. Pre-ARNm", "1. Caperuza", "2. Poli-A", "3. Splicing"];
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Paso", min: 0, max: 3, step: 1, val: 0, fmt: function (v) { return NOMP[Math.round(v)]; }, on: function (v) { paso = Math.round(v); pinta(); } });
    U.fichas(cuerpo.querySelector("[data-alt]"), [{ k: "-1", t: "Splicing normal" }, { k: "1", t: "Salta el exón 2" }, { k: "2", t: "Salta el exón 3" }], "-1", function (k) { omit = parseInt(k, 10); pinta(); });
    function pinta() {
      var L = longitudes(omit), W = 540, s = '<svg class="bio12-svg" viewBox="0 0 560 150" role="img" aria-label="Maduración del ARNm">';
      var todos = [];                                      // piezas en orden: exón, intrón, exón…
      for (var i = 0; i < EXON.length; i++) { todos.push({ t: "e", n: i, l: EXON[i] }); if (i < INTR.length) todos.push({ t: "i", n: i, l: INTR[i] }); }
      var piezas = paso >= 3 ? todos.filter(function (p) { return p.t === "e"; }) : todos;
      var x = paso >= 1 ? 40 : 20, y = 48;
      if (paso >= 1) s += '<circle class="b12-cap" cx="24" cy="' + (y + 14) + '" r="9"/><text class="b12-peq" x="24" y="' + (y - 6) + '" text-anchor="middle">caperuza</text>';
      for (var j = 0; j < piezas.length; j++) {
        var p = piezas[j], salta = paso >= 3 && p.t === "e" && omit === p.n, w = paso >= 3 ? p.l * 0.75 : Math.max(10, p.l * 400 / 1920);
        if (salta) continue;
        s += '<rect class="' + (p.t === "e" ? "b12-exon" : "b12-intron") + '" x="' + x.toFixed(1) + '" y="' + y + '" width="' + w.toFixed(1) + '" height="28" rx="4"/>' +
          '<text class="b12-peq" x="' + (x + w / 2).toFixed(1) + '" y="' + (y + 18) + '" text-anchor="middle">' + (p.t === "e" ? "E" + (p.n + 1) : "I" + (p.n + 1)) + '</text>';
        x += w + 1;
      }
      if (paso >= 2) {
        var wp = 60;
        s += '<rect class="b12-polya" x="' + (x + 2).toFixed(1) + '" y="' + (y + 8) + '" width="' + wp + '" height="12" rx="3"/><text class="b12-peq" x="' + (x + 2 + wp / 2).toFixed(1) + '" y="' + (y - 6) + '" text-anchor="middle">cola poli-A</text>';
      }
      if (paso >= 3 && omit >= 0) s += '<text class="b12-peq" x="20" y="116">Exón ' + (omit + 1) + ' omitido: se pierde con los intrones</text>';
      s += '<text class="b12-peq" x="20" y="136">E = exón (codifica) · I = intrón (se elimina) · 5\' a la izquierda</text></svg>';
      dib.innerHTML = s;
      var txt, cls = "bio12-veredicto";
      if (paso === 0) txt = "El pre-ARNm tiene " + B.fmt(L.pre, 0) + " nt: exones e intrones mezclados. Todavía no sirve para traducir.";
      else if (paso === 1) txt = "La caperuza protege el extremo 5' de las nucleasas y ayuda al ribosoma a reconocer el ARNm.";
      else if (paso === 2) txt = "La cola de unas " + POLYA + " adeninas protege el extremo 3' y favorece la salida del núcleo y la estabilidad del ARNm.";
      else { cls += " ok"; txt = omit < 0 ? "El splicing elimina " + B.fmt(L.pre - EXON.reduce(function (a, b) { return a + b; }, 0), 0) + " nt de intrones y empalma los 4 exones: " + B.fmt(L.ex, 0) + " nt codificantes, que son " + B.fmt(L.aa, 0) + " codones." :
        "Splicing alternativo: al omitir el exón " + (omit + 1) + " quedan " + B.fmt(L.ex, 0) + " nt, es decir, " + B.fmt(L.aa, 0) + " codones: otro ARNm y otra proteína con el mismo gen."; }
      ver.className = cls; ver.textContent = txt;
      dat.innerHTML = '<div><b>Longitud del pre-ARNm</b>' + B.fmt(L.pre, 0) + ' nt</div>' +
        '<div><b>Longitud actual</b>' + B.fmt(paso >= 3 ? L.ex + (paso >= 2 ? POLYA : 0) : L.pre + (paso >= 2 ? POLYA : 0), 0) + ' nt' + (paso >= 2 ? ' (con poli-A)' : '') + '</div>' +
        '<div><b>Caperuza</b>' + (paso >= 1 ? 'sí' : 'no') + '</div><div><b>Cola poli-A</b>' + (paso >= 2 ? 'sí' : 'no') + '</div>' +
        (paso >= 3 ? '<div><b>ARNm maduro</b>' + B.fmt(L.madura, 0) + ' nt (' + B.fmt(L.ex, 0) + ' codificantes)</div><div><b>Codones de la región codificante</b>' + B.fmt(L.aa, 0) + '</div>' : '');
    }
    pinta();
  };

  // ------------------------------------------------------------------ OPERONES
  // Estado del operón lac según glucosa, lactosa y genotipo.
  function estadoLac(glu, lac, geno) {
    var bloquea = geno === "wt" && !lac;                                   // lacI⁻ y lacOᶜ: el represor no bloquea
    var nivel = bloquea ? 0 : (glu ? 1 : 2);                                // 0 ninguna, 1 baja, 2 alta
    return { bloquea: bloquea, nivel: nivel, cap: !glu };
  }
  function estadoTrp(trp) { return { bloquea: trp, nivel: trp ? 0 : 2 }; }
  B.lab.bio12.estadoLac = estadoLac; B.lab.bio12.estadoTrp = estadoTrp;
  var NIV = ["no se transcribe (solo una expresión basal mínima)", "se transcribe poco", "se transcribe mucho"];

  B.w.bio_operon = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Operones lac y trp de E. coli");
    cuerpo.innerHTML = '<p class="w-intro">Un operón es un grupo de genes con un mismo promotor y operador, que se transcriben juntos en un solo ARNm. Cambia el ambiente de la bacteria y mira qué ocurre.</p>' +
      '<div data-op></div><div data-g></div><div data-l></div><div data-m></div><div class="bio12-dibujo"></div><div class="bio12-dato"></div><div class="bio12-veredicto"></div>' +
      '<p class="w-pie">Operón lac: inducible (se enciende al haber lactosa) y con control positivo por glucosa (CAP + AMPc). Operón trp: reprimible (se apaga al haber triptófano). Mutantes: lacI⁻ no fabrica represor funcional; lacOᶜ tiene el operador alterado y el represor no se une.</p>';
    var op = "lac", glu = true, lac = false, geno = "wt";
    var dib = cuerpo.querySelector(".bio12-dibujo"), dat = cuerpo.querySelector(".bio12-dato"), ver = cuerpo.querySelector(".bio12-veredicto");
    var dg = cuerpo.querySelector("[data-g]"), dl = cuerpo.querySelector("[data-l]"), dm = cuerpo.querySelector("[data-m]");
    function ctlPorOperon() {
      if (op === "lac") {
        U.fichas(dg, [{ k: "1", t: "Con glucosa" }, { k: "0", t: "Sin glucosa" }], glu ? "1" : "0", function (k) { glu = k === "1"; pinta(); });
        U.fichas(dl, [{ k: "0", t: "Sin lactosa" }, { k: "1", t: "Con lactosa" }], lac ? "1" : "0", function (k) { lac = k === "1"; pinta(); });
        U.fichas(dm, [{ k: "wt", t: "Bacteria normal" }, { k: "I", t: "Mutante lacI⁻" }, { k: "O", t: "Mutante lacOᶜ" }], geno, function (k) { geno = k; pinta(); });
      } else {
        U.fichas(dg, [{ k: "0", t: "Sin triptófano" }, { k: "1", t: "Con triptófano" }], lac ? "1" : "0", function (k) { lac = k === "1"; pinta(); });
        dl.innerHTML = ""; dl.className = ""; dm.innerHTML = ""; dm.className = "";
      }
    }
    U.fichas(cuerpo.querySelector("[data-op]"), [{ k: "lac", t: "Operón lac" }, { k: "trp", t: "Operón trp" }], op, function (k) { op = k; if (k === "trp") lac = false; else { lac = false; glu = true; geno = "wt"; } ctlPorOperon(); pinta(); });
    function genes(x, y, on, nombres) {
      var s = "";
      for (var i = 0; i < nombres.length; i++) s += '<rect class="b12-gen' + (on ? " on" : "") + '" x="' + (x + i * 62) + '" y="' + y + '" width="58" height="26" rx="5"/><text x="' + (x + i * 62 + 29) + '" y="' + (y + 17) + '" text-anchor="middle" style="font-size:11px">' + nombres[i] + '</text>';
      return s;
    }
    function pinta() {
      var st = op === "lac" ? estadoLac(glu, lac, geno) : estadoTrp(lac), s, on = st.nivel > 0;
      s = '<svg class="bio12-svg" viewBox="0 0 560 175" role="img" aria-label="Operón">';
      s += '<line class="b12-adn" x1="10" y1="100" x2="550" y2="100"/>';
      if (op === "lac") {
        s += '<rect class="b12-gen" x="12" y="87" width="46" height="26" rx="5"/><text x="35" y="104" text-anchor="middle" style="font-size:11px">lacI</text>';
        s += '<rect class="b12-prom" x="150" y="87" width="46" height="26" rx="5"/><text x="173" y="104" text-anchor="middle" style="font-size:10px">promotor</text>';
        s += '<rect class="b12-op" x="198" y="87" width="40" height="26" rx="5"/><text x="218" y="104" text-anchor="middle" style="font-size:10px">operador</text>';
        s += genes(244, 87, on, ["lacZ", "lacY", "lacA"]);
        s += '<text class="b12-peq" x="244" y="140">β-galactosidasa · permeasa · transacetilasa</text>';
        s += '<rect class="b12-prom" x="100" y="87" width="46" height="26" rx="5"/><text x="123" y="104" text-anchor="middle" style="font-size:10px">sitio CAP</text>';
        var repSt = geno === "I" ? "ausente" : (st.bloquea ? "unido" : "libre");
        if (geno === "I") s += '<text class="b12-peq" x="35" y="75" text-anchor="middle">sin represor funcional</text>';
        else if (st.bloquea) s += '<rect class="b12-rep" x="196" y="56" width="44" height="28" rx="14"/><text x="218" y="74" text-anchor="middle" style="font-size:10px">represor</text>';
        else s += '<rect class="b12-rep off" x="40" y="46" width="64" height="28" rx="14"/><text x="72" y="64" text-anchor="middle" style="font-size:10px">' + (lac ? "represor + alolactosa" : "represor") + '</text>';
        if (st.cap) s += '<circle class="b12-pol" cx="123" cy="70" r="12"/><text class="b12-peq" x="123" y="52" text-anchor="middle">CAP-AMPc</text>';
        if (on) s += '<rect class="b12-pol' + (st.nivel === 1 ? " debil" : "") + '" x="150" y="52" width="46" height="28" rx="10"/><text x="173" y="70" text-anchor="middle" style="font-size:10px">ARN pol</text>' +
          '<path class="b12-mrna" d="M300 84 C 380 60, 440 60, 540 70"/><text class="b12-peq" x="500" y="56" text-anchor="middle">ARNm</text>';
        dat.innerHTML = '<div><b>Represor</b>' + (geno === "I" ? 'no funcional' : st.bloquea ? 'unido al operador (bloquea)' : (lac ? 'inactivo: la alolactosa lo ha soltado' : 'libre')) + '</div>' +
          '<div><b>CAP-AMPc</b>' + (st.cap ? 'unido: ayuda a la ARN polimerasa' : 'no actúa (hay glucosa, poco AMPc)') + '</div>' +
          '<div class="ancho"><b>Genes lacZ, lacY, lacA</b>' + NIV[st.nivel] + '</div>';
        if (geno === "wt") {
          ver.textContent = !lac ? "Sin lactosa el represor se queda unido al operador: la ARN polimerasa no puede avanzar. " + (glu ? "Con glucosa, la bacteria usa la glucosa." : "Aunque no haya glucosa, sin lactosa no tiene sentido fabricar las enzimas.")
            : (glu ? "Hay lactosa pero también glucosa: el represor se suelta, pero sin CAP-AMPc la ARN polimerasa trabaja poco. La bacteria prefiere la glucosa." : "Sin glucosa y con lactosa: se suelta el represor y actúa CAP-AMPc. Máxima transcripción: la bacteria digiere la lactosa.");
        } else if (geno === "I") ver.textContent = "Sin represor funcional el operador siempre está libre: expresión constitutiva (siempre encendido), aunque no haya lactosa. El nivel lo sigue regulando la glucosa vía CAP.";
        else ver.textContent = "El operador alterado no reconoce al represor (aunque sea normal): el operón está siempre encendido, haya o no lactosa. El mutante afecta solo al ADN que lleva el operador (actúa en cis).";
        ver.className = "bio12-veredicto" + (st.nivel === 2 ? " ok" : st.nivel === 0 ? " mal" : "");
      } else {
        s += '<rect class="b12-gen" x="12" y="87" width="46" height="26" rx="5"/><text x="35" y="104" text-anchor="middle" style="font-size:11px">trpR</text>';
        s += '<rect class="b12-prom" x="150" y="87" width="46" height="26" rx="5"/><text x="173" y="104" text-anchor="middle" style="font-size:10px">promotor</text>';
        s += '<rect class="b12-op" x="198" y="87" width="40" height="26" rx="5"/><text x="218" y="104" text-anchor="middle" style="font-size:10px">operador</text>';
        s += genes(244, 87, on, ["trpE", "trpD", "trpC", "trpB", "trpA"]);
        s += '<text class="b12-peq" x="244" y="140">enzimas que fabrican triptófano</text>';
        if (st.bloquea) s += '<rect class="b12-rep" x="196" y="56" width="44" height="28" rx="14"/><text x="218" y="74" text-anchor="middle" style="font-size:10px">represor + Trp</text>';
        else s += '<rect class="b12-rep off" x="40" y="46" width="64" height="28" rx="14"/><text x="72" y="64" text-anchor="middle" style="font-size:10px">represor inactivo</text>';
        if (on) s += '<rect class="b12-pol" x="150" y="52" width="46" height="28" rx="10"/><text x="173" y="70" text-anchor="middle" style="font-size:10px">ARN pol</text><path class="b12-mrna" d="M360 84 C 420 60, 480 60, 545 70"/><text class="b12-peq" x="500" y="56" text-anchor="middle">ARNm</text>';
        dat.innerHTML = '<div><b>Represor</b>' + (st.bloquea ? 'activado por el triptófano: se une al operador' : 'inactivo (sin triptófano no se une)') + '</div>' +
          '<div><b>Genes trpE a trpA</b>' + NIV[st.nivel] + '</div>';
        ver.className = "bio12-veredicto" + (st.nivel === 2 ? " ok" : " mal");
        ver.textContent = st.bloquea ? "Hay triptófano en el medio: la bacteria no necesita fabricarlo. El triptófano (correpresor) activa el represor, que se une al operador y apaga el operón." : "Sin triptófano el represor es inactivo y no se une: se transcriben los 5 genes y la bacteria fabrica su propio triptófano.";
      }
      s += '</svg>';
      dib.innerHTML = s;
    }
    ctlPorOperon(); pinta();
  };
})(typeof window !== "undefined" ? window : this);
