/* ============================================================
   Bachi para Firu · Biología II, tema 13 (Mutaciones e ingeniería genética)
   bio_mutacion:    introduce una mutación génica (sustitución, inserción o deleción) en un trozo del gen de la β-globina
                    y mira qué pasa con la proteína (silenciosa, cambio de sentido, sin sentido, desplazamiento del marco).
   bio_restriccion: digiere con enzimas de restricción un ADN de 6000 pb (lineal o circular) y mira los fragmentos y el gel.
   bio_pcr:         copias de ADN tras n ciclos de PCR (ideal o con eficiencia < 100 %).
   Estilos inyectados desde aquí. Los números los recalcula herramientas/verificar_bio2_t13.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio13-estilos")) return;
    var s = document.createElement("style"); s.id = "bio13-estilos";
    s.textContent =
      ".bio13-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio13-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio13-svg .b13-peq{font-size:10.5px;fill:var(--ink-faint);font-weight:500}" +
      ".bio13-svg .b13-gel{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio13-svg .b13-pozo{fill:var(--bg,var(--sheet));stroke:var(--line);stroke-width:1}" +
      ".bio13-svg .b13-banda{fill:var(--pen)} .bio13-svg .b13-banda.mk{fill:var(--ink-faint)}" +
      ".bio13-svg .b13-barra{fill:var(--pen)} .bio13-svg .b13-barra.on{fill:var(--ok)}" +
      ".bio13-svg .b13-eje{stroke:var(--line);stroke-width:1.5}" +
      ".bio13-sec{margin:6px 0;padding:9px 11px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font:600 14px/1.9 var(--mono,ui-monospace,monospace);color:var(--ink);overflow-wrap:anywhere}" +
      ".bio13-sec .cod{display:inline-block;margin-right:7px}" +
      ".bio13-sec .mal{color:var(--red);text-decoration:underline}" +
      ".bio13-sec .ins{color:var(--red);background:var(--red-soft)}" +
      ".bio13-sec .rot{color:var(--ink-faint);font-weight:500;font-family:var(--body,sans-serif);font-size:12px;margin-right:6px}" +
      ".bio13-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio13-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio13-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio13-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio13-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio13-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      "@media(max-width:520px){.bio13-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------------ MUTACIONES GÉNICAS
  // Código genético estándar: orden U, C, A, G para las tres posiciones (una letra por aminoácido; * = parada).
  var TABLA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  var BASES = "UCAG";
  var TRES = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", "*": "STOP", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly" };
  function aa(cod) { return TABLA.charAt(BASES.indexOf(cod[0]) * 16 + BASES.indexOf(cod[1]) * 4 + BASES.indexOf(cod[2])); }
  // mRNA de ejemplo: los 8 primeros codones del gen de la β-globina humana (Met-Val-His-Leu-Thr-Pro-Glu-Glu) y un codón de parada
  var SEQ = "AUGGUGCACCUGACUCCUGAGGAGUAA";
  function traduce(s) {                          // → { aas: [..], parada: bool, completo: bool }
    var r = [], i;
    for (i = 0; i + 3 <= s.length; i += 3) {
      var a = aa(s.substr(i, 3));
      if (a === "*") return { aas: r, parada: true, resto: s.length - i - 3 };
      r.push(a);
    }
    return { aas: r, parada: false, resto: s.length - i };
  }
  function muta(modo, pos, base) {               // pos: 1..27 (inserción: antes de ese nucleótido)
    var p = pos - 1;
    if (modo === "sub") return SEQ.slice(0, p) + base + SEQ.slice(p + 1);
    if (modo === "ins") return SEQ.slice(0, p) + base + SEQ.slice(p);
    return SEQ.slice(0, p) + SEQ.slice(p + 1);
  }
  function nombres(t) { return t.aas.map(function (a) { return TRES[a]; }).join("–"); }

  B.w.bio_mutacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Provoca una mutación génica");
    cuerpo.innerHTML = '<p class="w-intro">Este es el principio del ARNm de la β-globina (una cadena de la hemoglobina). Elige el tipo de cambio, la posición y la base, y mira qué pasa con la proteína. Los botones de «casos» reproducen ejemplos reales.</p>' +
      '<div data-c></div><div data-m></div><div data-b></div><div data-ctl></div>' +
      '<div class="bio13-sec bio13-orig"></div><div class="bio13-sec bio13-mut"></div><div class="bio13-dato"></div><div class="bio13-veredicto"></div>' +
      '<p class="w-pie">Se lee en tripletes desde el AUG. Las posiciones se cuentan desde el primer nucleótido (1-27). La inserción coloca la base nueva justo antes del nucleótido elegido. Código genético estándar.</p>';
    var modo = "sub", pos = 20, base = "U";
    var ori = cuerpo.querySelector(".bio13-orig"), mut = cuerpo.querySelector(".bio13-mut"), dat = cuerpo.querySelector(".bio13-dato"), ver = cuerpo.querySelector(".bio13-veredicto");
    var fCas, fModo, fBase, sl;
    var CASOS = { falc: ["sub", 20, "U"], sil: ["sub", 21, "A"], sin: ["sub", 19, "U"], mar: ["ins", 7, "G"], del: ["del", 12, "U"] };
    fCas = U.fichas(cuerpo.querySelector("[data-c]"), [{ k: "falc", t: "Anemia falciforme" }, { k: "sil", t: "Silenciosa" }, { k: "sin", t: "Sin sentido" }, { k: "mar", t: "Inserción" }, { k: "del", t: "Deleción" }], "", function (k) {
      var c = CASOS[k]; modo = c[0]; pos = c[1]; base = c[2]; sync(); pinta();
    });
    function pintaChips() {
      fModo = U.fichas(cuerpo.querySelector("[data-m]"), [{ k: "sub", t: "Sustitución" }, { k: "ins", t: "Inserción" }, { k: "del", t: "Deleción" }], modo, function (k) { modo = k; limpia(); pinta(); });
      fBase = U.fichas(cuerpo.querySelector("[data-b]"), [{ k: "A", t: "A" }, { k: "U", t: "U" }, { k: "G", t: "G" }, { k: "C", t: "C" }], base, function (k) { base = k; limpia(); pinta(); });
    }
    var enCaso = false;
    function limpia() {                          // al tocar algo a mano, el «caso» deja de estar marcado
      if (enCaso) return;
      Array.prototype.forEach.call(cuerpo.querySelectorAll("[data-c] .chip-btn"), function (c) { c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); });
    }
    function sync() {                            // vuelve a pintar chips y deslizador tras un caso
      pintaChips();
      enCaso = true; sl.value = pos; sl.dispatchEvent(new Event("input")); enCaso = false;
    }
    pintaChips();
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Posición", min: 1, max: 27, step: 1, val: pos, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { pos = Math.round(v); limpia(); pinta(); } });
    sl = cuerpo.querySelector("input[type=range]");
    function fmtSeq(s, marca) {                  // tripletes; marca = {tipo, i} para resaltar
      var h = "";
      for (var i = 0; i < s.length; i += 3) {
        var c = s.substr(i, 3).split("").map(function (ch, k) {
          var j = i + k;
          if (marca && marca.tipo === "sub" && j === marca.i) return '<span class="mal">' + ch + "</span>";
          if (marca && marca.tipo === "ins" && j === marca.i) return '<span class="ins">' + ch + "</span>";
          return ch;
        }).join("");
        h += '<span class="cod">' + c + "</span>";
      }
      return h;
    }
    function pinta() {
      var orig = traduce(SEQ), m2 = muta(modo, pos, base), t = traduce(m2);
      var marca = modo === "del" ? null : { tipo: modo, i: pos - 1 };
      ori.innerHTML = '<span class="rot">original</span>' + fmtSeq(SEQ, null) + '<br><span class="rot">proteína</span>' + nombres(orig) + " (parada)";
      var iguales = m2 === SEQ;
      var sinAUG = m2.substr(0, 3) !== "AUG";
      var prot = sinAUG ? "no se inicia (falta el AUG)" : (nombres(t) || "—") + (t.parada ? " (parada)" : "…");
      mut.innerHTML = '<span class="rot">mutante' + (modo === "del" ? " (se quita el nucleótido " + pos + ")" : "") + '</span>' + fmtSeq(m2, marca) + '<br><span class="rot">proteína</span>' + prot;
      var cls = "", txt = "";
      var longMut = sinAUG ? 0 : t.aas.length;
      if (iguales) { txt = "No hay cambio: has puesto la misma base que ya estaba."; }
      else if (modo !== "sub") {
        cls = "mal"; txt = "<b>Mutación por desplazamiento del marco de lectura (" + (modo === "ins" ? "inserción" : "deleción") + " de 1 base).</b> Desde el cambio, todos los codones se leen distinto: " +
          (sinAUG ? "además, el AUG ha desaparecido." : (t.parada ? "la proteína acaba antes o después de lo normal." : "no aparece ningún codón de parada en este fragmento y la proteína seguiría creciendo.")) + " Suele ser más grave que una sustitución.";
      } else if (sinAUG) {
        cls = "mal"; txt = "<b>Se destruye el codón de inicio</b>: sin AUG al principio la traducción no empieza donde debe.";
      } else {
        var c0 = SEQ.substr(Math.floor((pos - 1) / 3) * 3, 3), c1 = m2.substr(Math.floor((pos - 1) / 3) * 3, 3);
        var a0 = aa(c0), a1 = aa(c1), nc = Math.floor((pos - 1) / 3) + 1;
        if (a0 === a1) { cls = "ok"; txt = "<b>Mutación silenciosa</b>: " + c0 + " → " + c1 + " sigue codificando " + TRES[a0] + ". El código genético es degenerado."; }
        else if (a1 === "*") { cls = "mal"; txt = "<b>Mutación sin sentido</b>: " + c0 + " (" + TRES[a0] + ") → " + c1 + " (parada). La proteína se corta tras " + (nc - 1) + " aminoácidos."; }
        else if (a0 === "*") { cls = "mal"; txt = "<b>Se pierde la parada</b>: " + c0 + " → " + c1 + " (" + TRES[a1] + "). La proteína sería más larga de lo normal."; }
        else { cls = "mal"; txt = "<b>Mutación de cambio de sentido</b> en el codón " + nc + ": " + c0 + " (" + TRES[a0] + ") → " + c1 + " (" + TRES[a1] + ")." + (c0 === "GAG" && c1 === "GUG" ? " Es la mutación de la <b>anemia falciforme</b>: Glu → Val en la β-globina." : ""); }
      }
      dat.innerHTML = '<div><b>Aminoácidos de la proteína original</b>' + orig.aas.length + '</div><div><b>Aminoácidos de la proteína mutante</b>' + longMut + (t.parada || sinAUG ? "" : " (sin parada)") + '</div>';
      ver.className = "bio13-veredicto" + (cls ? " " + cls : "");
      ver.innerHTML = txt;
    }
    pinta();
  };

  // ------------------------------------------------------------------ ENZIMAS DE RESTRICCIÓN
  var LONG = 6000;
  var ENZ = {
    eco: { nom: "EcoRI", sitio: "G↓AATTC", pos: [1000, 3000], extremo: "cohesivos" },
    bam: { nom: "BamHI", sitio: "G↓GATCC", pos: [2200], extremo: "cohesivos" },
    hin: { nom: "HindIII", sitio: "A↓AGCTT", pos: [4800], extremo: "cohesivos" }
  };
  function cortes(keys) {
    var c = [];
    keys.forEach(function (k) { c = c.concat(ENZ[k].pos); });
    return c.sort(function (a, b) { return a - b; });
  }
  function fragmentos(c, circular) {
    var f = [], i;
    if (!c.length) return [LONG];
    if (circular) {
      for (i = 0; i < c.length - 1; i++) f.push(c[i + 1] - c[i]);
      f.push(LONG - c[c.length - 1] + c[0]);
    } else {
      f.push(c[0]);
      for (i = 0; i < c.length - 1; i++) f.push(c[i + 1] - c[i]);
      f.push(LONG - c[c.length - 1]);
    }
    return f;
  }
  function milesp(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  B.w.bio_restriccion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Digestión con enzimas de restricción");
    cuerpo.innerHTML = '<p class="w-intro">Un ADN de 6000 pb (pares de bases) tiene sitios de corte de tres enzimas: EcoRI (en 1000 y 3000), BamHI (en 2200) y HindIII (en 4800). Elige la enzima o la mezcla y mira los fragmentos y cómo saldrían en un gel de electroforesis.</p>' +
      '<div data-f></div><div data-t></div><div class="bio13-dibujo"></div><div class="bio13-dato"></div><div class="bio13-veredicto"></div>' +
      '<p class="w-pie">Las posiciones son las del corte, en pb desde el extremo izquierdo de la molécula lineal. En el gel, los fragmentos más cortos migran más lejos hacia el polo positivo (+). Dos fragmentos del mismo tamaño forman una sola banda más intensa.</p>';
    var ens = "eco", forma = "lin";
    var dib = cuerpo.querySelector(".bio13-dibujo"), dat = cuerpo.querySelector(".bio13-dato"), ver = cuerpo.querySelector(".bio13-veredicto");
    var COMB = { eco: ["eco"], bam: ["bam"], hin: ["hin"], eb: ["eco", "bam"], eh: ["eco", "hin"], tres: ["eco", "bam", "hin"] };
    U.fichas(cuerpo.querySelector("[data-f]"), [{ k: "eco", t: "EcoRI" }, { k: "bam", t: "BamHI" }, { k: "hin", t: "HindIII" }, { k: "eb", t: "EcoRI + BamHI" }, { k: "eh", t: "EcoRI + HindIII" }, { k: "tres", t: "Las tres" }], ens, function (k) { ens = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-t]"), [{ k: "lin", t: "ADN lineal" }, { k: "cir", t: "ADN circular (plásmido)" }], forma, function (k) { forma = k; pinta(); });
    function yb(n) { var a = Math.log(6200), b = Math.log(400); return 30 + (a - Math.log(n)) / (a - b) * 130; }
    function banda(x, n, cls) { return '<rect class="b13-banda ' + (cls || "") + '" x="' + x + '" y="' + yb(n).toFixed(1) + '" width="46" height="5" rx="2"/>'; }
    function pinta() {
      var keys = COMB[ens], c = cortes(keys), circ = forma === "cir", fr = fragmentos(c, circ);
      var ord = fr.slice().sort(function (a, b) { return b - a; });
      var dif = []; ord.forEach(function (x) { if (dif.indexOf(x) < 0) dif.push(x); });
      var s = '<svg class="bio13-svg" viewBox="0 0 400 190" role="img" aria-label="Gel de electroforesis" style="max-width:440px"><rect class="b13-gel" x="20" y="14" width="360" height="164" rx="8"/>';
      var carriles = [{ t: "marcador", m: [6000, 4000, 3000, 2000, 1000, 500], mk: true }, { t: "sin cortar", m: [LONG] }, { t: "digestión", m: dif }];
      carriles.forEach(function (ca, i) {
        var x = 46 + i * 112;
        s += '<rect class="b13-pozo" x="' + x + '" y="20" width="46" height="6" rx="2"/>';
        ca.m.forEach(function (n) { s += banda(x, n, ca.mk ? "mk" : ""); if (ca.mk) s += '<text class="b13-peq" x="' + (x + 50) + '" y="' + (yb(n) + 5).toFixed(1) + '">' + n + '</text>'; });
        s += '<text class="b13-peq" x="' + (x + 23) + '" y="190" text-anchor="middle">' + ca.t + '</text>';
      });
      dib.innerHTML = s + "</svg>";
      var lista = dif.map(function (x) { var n = fr.filter(function (y) { return y === x; }).length; return milesp(x) + " pb" + (n > 1 ? " (×" + n + ", una sola banda)" : ""); }).join(" · ");
      dat.innerHTML = '<div><b>Cortes</b>' + c.length + ' (en ' + c.join(", ") + ')</div><div><b>Fragmentos</b>' + fr.length + (circ ? " (circular: tantos como cortes)" : " (lineal: cortes + 1)") + '</div><div><b>Tamaños</b>' + lista + '</div><div><b>Suma</b>' + milesp(fr.reduce(function (a, b) { return a + b; }, 0)) + ' pb (= la molécula entera)</div>';
      var dobles = ord.length - dif.length;
      ver.className = "bio13-veredicto" + (dobles ? " mal" : " ok");
      ver.textContent = (circ ? "Un plásmido circular con n sitios da n fragmentos (con 1 solo corte, se linealiza). " : "Una molécula lineal con n sitios da n + 1 fragmentos. ") +
        (dobles ? "Ojo: hay " + (dobles + 1 > 2 ? "varios fragmentos" : "dos fragmentos") + " del mismo tamaño: en el gel solo ves " + dif.length + " bandas aunque haya " + fr.length + " fragmentos." : "Todas las bandas distintas: en el gel ves tantas bandas como fragmentos.");
    }
    pinta();
  };

  // ------------------------------------------------------------------ PCR
  function copias(n0, n, e) { return n0 * Math.pow(1 + e, n); }
  function sci(x) {
    if (x < 1e12) return milesp(x);
    var ex = Math.floor(Math.log10(x)), m = x / Math.pow(10, ex);
    return B.fmt(m, 2) + " · 10<sup>" + ex + "</sup>";
  }

  B.w.bio_pcr = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "PCR: cuántas copias hay tras n ciclos");
    cuerpo.innerHTML = '<p class="w-intro">Cada ciclo de PCR tiene tres pasos (95 °C, 55 °C y 72 °C) y, si todo va perfecto, duplica el número de copias. Cambia los ciclos, las moléculas de partida y la eficiencia.</p>' +
      '<div data-n0></div><div data-e></div><div data-ctl></div><div class="bio13-dibujo"></div><div class="bio13-dato"></div><div class="bio13-veredicto"></div>' +
      '<p class="w-pie">Modelo: copias = N₀ · (1 + eficiencia)<sup>n</sup>. Moléculas del tamaño exacto (solo caso ideal) = N₀ · (2<sup>n</sup> − 2n): los primeros productos de longitud exacta aparecen en el ciclo 3. Ciclo de ejemplo: 30 s a 95 °C + 30 s a 55 °C + 60 s a 72 °C = 2 min. El gráfico usa escala logarítmica.</p>';
    var n0 = 1, ef = 1, n = 10;
    var dib = cuerpo.querySelector(".bio13-dibujo"), dat = cuerpo.querySelector(".bio13-dato"), ver = cuerpo.querySelector(".bio13-veredicto");
    U.fichas(cuerpo.querySelector("[data-n0]"), [{ k: "1", t: "1 molécula" }, { k: "10", t: "10 moléculas" }, { k: "100", t: "100 moléculas" }], "1", function (k) { n0 = +k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-e]"), [{ k: "1", t: "Eficiencia 100 %" }, { k: "0.9", t: "90 %" }, { k: "0.8", t: "80 %" }], "1", function (k) { ef = +k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Ciclos", min: 0, max: 35, step: 1, val: n, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { n = Math.round(v); pinta(); } });
    function pinta() {
      var tot = copias(n0, n, ef), maxl = Math.log10(copias(100, 35, 1)), s = '<svg class="bio13-svg" viewBox="0 0 400 140" role="img" aria-label="Copias por ciclo (escala logarítmica)" style="max-width:440px"><line class="b13-eje" x1="20" y1="120" x2="390" y2="120"/>';
      for (var c = 0; c <= 35; c++) {
        var h = Math.max(1, 100 * Math.log10(Math.max(1, copias(n0, c, ef))) / maxl);
        s += '<rect class="b13-barra' + (c <= n ? " on" : "") + '" x="' + (22 + c * 10.2).toFixed(1) + '" y="' + (120 - h).toFixed(1) + '" width="8" height="' + h.toFixed(1) + '" rx="1.5" style="opacity:' + (c <= n ? 1 : 0.25) + '"/>';
      }
      s += '<text class="b13-peq" x="22" y="134">0</text><text class="b13-peq" x="384" y="134" text-anchor="end">35 ciclos</text><text class="b13-peq" x="22" y="12">log(copias)</text></svg>';
      dib.innerHTML = s;
      var ex = ef === 1 ? n0 * (Math.pow(2, n) - 2 * n) : null;
      dat.innerHTML = '<div><b>Copias de la región diana</b>' + sci(tot) + '</div><div><b>Duración aproximada</b>' + (n * 2) + ' min (' + n + ' ciclos de 2 min)</div>' +
        '<div><b>Del tamaño exacto</b>' + (ex === null ? "— (solo se calcula con eficiencia 100 %)" : sci(ex)) + '</div><div><b>Factor de amplificación</b>×' + sci(tot / n0) + '</div>';
      ver.className = "bio13-veredicto" + (n < 3 ? "" : (n > 30 ? " mal" : " ok"));
      ver.innerHTML = n === 0 ? "Sin ciclos: solo está el ADN de partida." :
        n < 3 ? "Todavía no hay moléculas del tamaño exacto: se necesitan al menos 3 ciclos (los dos primeros solo dan productos más largos)." :
        n > 30 ? "En la práctica, pasados ≈ 30-35 ciclos se agotan cebadores y nucleótidos y la Taq se cansa: se llega a una meseta y deja de duplicarse. Más ciclos no sirven." :
        "Crecimiento exponencial: con eficiencia 100 %, cada ciclo duplica. Con eficiencia menor, el crecimiento por ciclo es (1 + eficiencia) y la diferencia se acumula muchísimo.";
    }
    pinta();
  };

  // se exponen para depuración y para el verificador
  B.bio13 = { aa: aa, traduce: traduce, muta: muta, fragmentos: fragmentos, cortes: cortes, copias: copias, TABLA: TABLA, SEQ: SEQ };
})(typeof window !== "undefined" ? window : this);
