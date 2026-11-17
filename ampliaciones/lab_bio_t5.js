/* ============================================================
   Bachi para Firu · Biología II, tema 5 (Ácidos nucleicos)
   bio_adn: escribe una hebra de ADN (A, C, G, T). Modo «Doble hélice»: la hebra complementaria antiparalela, los
   puentes de hidrógeno (2 en A–T, 3 en C–G), el %GC y la longitud (0,34 nm por par de bases). Modo «Transcribir»:
   la hebra es el molde (3′→5′) y se muestra el ARNm (5′→3′) con U en lugar de T.
   Estilos inyectados desde aquí. Las cifras de los preajustes las recalcula herramientas/verificar_bio2_t5.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio5-estilos")) return;
    var s = document.createElement("style"); s.id = "bio5-estilos";
    s.textContent =
      ".bio5-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio5-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio5-svg .b5-cad{fill:none;stroke:var(--pen);stroke-width:3;stroke-linejoin:round;stroke-linecap:round}" +
      ".bio5-svg .b5-cad2{fill:none;stroke:var(--red);stroke-width:3;stroke-linejoin:round;stroke-linecap:round}" +
      ".bio5-svg .b5-bola{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2}" +
      ".bio5-svg .b5-marco{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio5-in{font:600 16px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;padding:7px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);color:var(--ink);width:100%;max-width:340px;box-sizing:border-box}" +
      ".bio5-lab{display:block;margin:8px 0 4px;font-size:14px;color:var(--ink)}" +
      ".bio5-et{display:block;margin-bottom:4px;font-weight:600}" +
      ".bio5-hebras{margin:8px 0;padding:10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet)}" +
      ".bio5-rot{font-size:12px;color:var(--ink-faint);margin:2px 0;font-weight:600}" +
      ".bio5-cols{display:flex;flex-wrap:wrap;gap:2px;margin:2px 0}" +
      ".bio5-par{display:flex;flex-direction:column;align-items:center;min-width:17px;font:700 15px ui-monospace,Menlo,Consolas,monospace;color:var(--ink)}" +
      ".bio5-par i{font:600 11px var(--body,sans-serif);font-style:normal;color:var(--ink-faint);line-height:1.5}" +
      ".bio5-par .at{color:var(--pen)}.bio5-par .cg{color:var(--red)}" +
      ".bio5-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio5-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35;overflow-wrap:anywhere}" +
      ".bio5-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio5-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      "@media(max-width:520px){.bio5-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  var PRE = [
    { k: "corta", t: "Mixta", s: "ATGCGTACCT" },
    { k: "gc", t: "Rica en GC", s: "GCGGCCGCGC" },
    { k: "at", t: "Rica en AT", s: "TATAAATATA" },
    { k: "gen", t: "ADN→ARN", s: "TACGGATTC" }
  ];
  var COMP = { A: "T", T: "A", C: "G", G: "C" }, COMP_ARN = { A: "U", T: "A", C: "G", G: "C" };
  B.lab = B.lab || {};
  B.lab.bioAdnPre = PRE;

  B.w.bio_adn = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Complementariedad de bases: escribe una hebra");
    cuerpo.innerHTML = '<p class="w-intro">Escribe una secuencia (solo A, C, G, T; máximo 20 bases) o elige una. Mira cómo se empareja cada base, cuántos puentes de hidrógeno hay y qué ARN se obtendría.</p>' +
      '<div data-modo></div><div data-pre></div>' +
      '<label class="bio5-lab"><span class="bio5-et"></span><input class="bio5-in" type="text" maxlength="20" autocomplete="off" spellcheck="false" aria-label="Secuencia de bases" value="' + PRE[0].s + '"></label>' +
      '<div class="bio5-hebras"></div><div class="bio5-dato"></div><div class="bio5-veredicto"></div>' +
      '<p class="w-pie">0,34 nm por par de bases; A–T: 2 puentes de H; C–G: 3. En el ARN la timina se sustituye por uracilo.</p>';
    var modo = "adn", inp = cuerpo.querySelector(".bio5-in"), et = cuerpo.querySelector(".bio5-et");
    var heb = cuerpo.querySelector(".bio5-hebras"), dat = cuerpo.querySelector(".bio5-dato"), ver = cuerpo.querySelector(".bio5-veredicto");
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "adn", t: "Doble hélice" }, { k: "arn", t: "Transcribir a ARN" }], modo, function (k) { modo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p) { return { k: p.k, t: p.t }; }), "corta", function (k) {
      inp.value = PRE.filter(function (p) { return p.k === k; })[0].s; pinta();
    });
    inp.addEventListener("input", pinta);

    function cuenta(s) {
      var c = { A: 0, T: 0, C: 0, G: 0 }, i;
      for (i = 0; i < s.length; i++) c[s.charAt(i)]++;
      return c;
    }
    function pinta() {
      var limpio = inp.value.toUpperCase().replace(/[^ACGT]/g, "");
      if (limpio !== inp.value) inp.value = limpio;
      var s = limpio, n = s.length, c = cuenta(s), i, cols = "", cl, comp = "";
      et.textContent = modo === "adn" ? "Hebra dada (se lee 5′ → 3′)" : "Hebra molde de ADN (se lee 3′ → 5′)";
      if (!n) {
        heb.innerHTML = "<p>Escribe al menos una base (A, C, G o T).</p>"; dat.innerHTML = ""; ver.textContent = "Sin secuencia no hay nada que emparejar."; return;
      }
      for (i = 0; i < n; i++) {
        cl = (s.charAt(i) === "A" || s.charAt(i) === "T") ? "at" : "cg";
        if (modo === "adn") {
          comp += COMP[s.charAt(i)];
          cols += '<span class="bio5-par"><b class="' + cl + '">' + s.charAt(i) + '</b><i>' + (cl === "at" ? "2" : "3") + '</i><b class="' + cl + '">' + COMP[s.charAt(i)] + '</b></span>';
        } else {
          comp += COMP_ARN[s.charAt(i)];
          cols += '<span class="bio5-par"><b class="' + cl + '">' + s.charAt(i) + '</b><i>↓</i><b class="' + cl + '">' + COMP_ARN[s.charAt(i)] + '</b></span>';
        }
      }
      var gc = c.G + c.C, pctGC = 100 * gc / n;
      if (modo === "adn") {
        heb.innerHTML = '<div class="bio5-rot">5′ → 3′ (hebra dada)</div><div class="bio5-cols">' + cols + '</div><div class="bio5-rot">3′ ← 5′ (hebra complementaria; cifra = puentes de H)</div>';
        var h = 2 * (c.A + c.T) + 3 * gc;
        dat.innerHTML = "<div><b>Longitud</b>" + n + " pb · " + B.fmt(n * 0.34, 2) + " nm</div>" +
          "<div><b>Hebra dada</b>A " + c.A + " · T " + c.T + " · C " + c.C + " · G " + c.G + "</div>" +
          "<div><b>Puentes de hidrógeno</b>" + h + " (" + (c.A + c.T) + " A–T × 2 + " + gc + " C–G × 3)</div>" +
          "<div><b>% de G + C</b>" + B.fmt(pctGC, 1) + " %</div>" +
          "<div><b>Hebra complementaria</b>3′-" + comp + "-5′</div>" +
          "<div><b>En la doble hélice</b>A = T = " + B.fmt(100 * (c.A + c.T) / (2 * n), 1) + " % · C = G = " + B.fmt(100 * gc / (2 * n), 1) + " %</div>";
        ver.textContent = "Cada A se empareja con T y cada C con G: por eso en la doble hélice %A = %T y %C = %G (Chargaff). Con " + B.fmt(pctGC, 1) + " % de G+C hay " + h + " puentes de hidrógeno en " + n + " pb: " +
          (pctGC > 50 ? "más G–C, más estable (funde a más temperatura)." : pctGC < 50 ? "más A–T, menos estable (funde antes)." : "mitad y mitad.");
      } else {
        heb.innerHTML = '<div class="bio5-rot">3′ → 5′ (molde de ADN)</div><div class="bio5-cols">' + cols + '</div><div class="bio5-rot">5′ → 3′ (ARNm sintetizado)</div>';
        var gcA = comp.replace(/[AU]/g, "").length;
        dat.innerHTML = "<div><b>Molde de ADN</b>3′-" + s + "-5′</div>" +
          "<div><b>ARNm</b>5′-" + comp + "-3′</div>" +
          "<div><b>Longitud</b>" + n + " nucleótidos</div>" +
          "<div><b>Uracilos (U)</b>" + c.A + " (uno por cada A del molde)</div>" +
          "<div><b>Tripletes completos</b>" + Math.floor(n / 3) + " (3 bases por codón)</div>" +
          "<div><b>% de G + C del ARNm</b>" + B.fmt(100 * gcA / n, 1) + " %</div>";
        ver.textContent = "La ARN polimerasa lee el molde y pone la base complementaria; donde el molde tiene A, el ARNm lleva U (no hay T en el ARN). El ARNm es copia de la hebra de ADN que no se leyó (la codificante), pero con U.";
      }
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
