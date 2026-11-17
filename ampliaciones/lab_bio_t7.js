/* ============================================================
   Bachi para Firu · Biología II, tema 7 (El núcleo y el ciclo celular)
   bio_ciclo: elige una especie (2n = 4, 8, 14 o 46), mitosis o meiosis y una fase; muestra los cromosomas dibujados y, POR
   CÉLULA, cuántos cromosomas, cromátidas y cantidad de ADN (en unidades c) hay, y cuántas células existen en ese momento.
   También exporta B.lab.bioCiclo (tabla de estados) para que se pueda comprobar desde fuera.
   Estilos inyectados desde aquí. Las cifras las recalcula herramientas/verificar_bio2_t7.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio7-estilos")) return;
    var s = document.createElement("style"); s.id = "bio7-estilos";
    s.textContent =
      ".bio7-svg{display:block;width:100%;max-width:600px;height:auto;margin:6px auto}" +
      ".bio7-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio7-svg .b7-marco{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio7-svg .b7-ej{stroke:var(--ink-faint);stroke-width:1.2;fill:none}" +
      ".bio7-svg .b7-m{fill:none;stroke:var(--pen);stroke-width:3;stroke-linejoin:round}" +
      ".bio7-svg .b7-me{fill:none;stroke:var(--red);stroke-width:3;stroke-linejoin:round}" +
      ".bio7-svg .b7-cr{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2.5;stroke-linecap:round}" +
      ".bio7-svg .b7-cr2{fill:var(--pen-soft);stroke:var(--red);stroke-width:2.5;stroke-linecap:round}" +
      ".bio7-svg .b7-pt{fill:var(--ink)}" +
      ".bio7-svg .b7-fl{stroke:var(--ink-faint);stroke-width:1;fill:none}" +
      ".bio7-svg .b7-lin{stroke:var(--line);stroke-width:1;stroke-dasharray:3 3}" +
      ".bio7-cel{margin:8px 0;padding:10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;justify-content:center;min-height:64px}" +
      ".bio7-biv{display:inline-flex;gap:1px;padding:2px 3px;border:1.5px dashed var(--ink-faint);border-radius:8px}" +
      ".bio7-gl{display:inline-block;width:16px;height:30px}" +
      ".bio7-gl.dup{width:24px}" +
      ".bio7-gl .a{stroke:var(--pen);stroke-width:5;stroke-linecap:round}" +
      ".bio7-gl .b{stroke:var(--red);stroke-width:5;stroke-linecap:round}" +
      ".bio7-gl .c{fill:var(--ink)}" +
      ".bio7-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio7-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35;overflow-wrap:anywhere}" +
      ".bio7-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio7-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio7-et{font-size:13px;font-weight:600;color:var(--ink-faint);margin:6px 0 2px}" +
      "@media(max-width:520px){.bio7-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  /* Convenio: valores POR CÉLULA en la fase indicada. d = 2n. ADN en unidades c (gameto haploide = 1c, diploide en G1 = 2c).
     Cada cromosoma de G1 tiene 1 cromátida (1 molécula de ADN); tras la fase S tiene 2. gl = [cromosomas simples, cromosomas dobles] dibujados. */
  function estados(d, modo) {
    var n = d / 2, L;
    if (modo === "mit") {
      L = [
        { k: "g1", t: "G1", cel: 1, cr: d, cm: d, adn: 2, plo: "2n", gl: [d, 0], txt: "Interfase, antes de copiar el ADN: cada cromosoma tiene una sola cromátida (una molécula de ADN)." },
        { k: "s", t: "S", cel: 1, cr: d, cm: "entre " + d + " y " + 2 * d, adn: "entre 2c y 4c", plo: "2n", gl: [n, n], txt: "Se replica el ADN: la cantidad de ADN sube de 2c a 4c, pero el número de cromosomas no cambia (cada uno acaba con 2 cromátidas)." },
        { k: "g2", t: "G2", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], txt: "ADN ya duplicado: cada cromosoma tiene 2 cromátidas hermanas. La célula revisa la copia antes de dividirse." },
        { k: "pro", t: "Profase", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], txt: "La cromatina se condensa en cromosomas visibles, desaparece el nucléolo, se rompe la envoltura y se forma el huso." },
        { k: "met", t: "Metafase", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], txt: "Los cromosomas, de máxima condensación, se alinean en el plano ecuatorial unidos al huso por sus cinetocoros: el mejor momento para contarlos." },
        { k: "ana", t: "Anafase", cel: 1, cr: 2 * d, cm: 2 * d, adn: 4, plo: "2n", gl: [2 * d, 0], txt: "Se parte el centrómero y cada cromátida hermana pasa a ser un cromosoma: durante unos minutos hay el doble de cromosomas (2d), d hacia cada polo." },
        { k: "tel", t: "Telofase y citocinesis", cel: 2, cr: d, cm: d, adn: 2, plo: "2n", gl: [d, 0], txt: "Se reforman los núcleos y se reparte el citoplasma: dos células hijas idénticas, con d cromosomas de una cromátida y 2c de ADN cada una." }
      ];
    } else {
      L = [
        { k: "g1", t: "G1", cel: 1, cr: d, cm: d, adn: 2, plo: "2n", gl: [d, 0], txt: "Célula diploide antes de la fase S: d cromosomas de una cromátida, 2c de ADN." },
        { k: "g2", t: "Interfase tras S", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], txt: "Una única replicación del ADN para las dos divisiones: 4c de ADN, cada cromosoma con 2 cromátidas." },
        { k: "p1", t: "Profase I", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], par: true, txt: "Los homólogos se emparejan (sinapsis) formando " + n + " bivalentes (tétradas) y se entrecruzan (crossing-over): aquí nace la variabilidad." },
        { k: "m1", t: "Metafase I", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], par: true, txt: "Los bivalentes se colocan en el ecuador: cada homólogo mira a un polo distinto, al azar." },
        { k: "a1", t: "Anafase I", cel: 1, cr: d, cm: 2 * d, adn: 4, plo: "2n", gl: [0, d], txt: "Se separan los cromosomas homólogos (no las cromátidas): " + n + " cromosomas dobles hacia cada polo. Es la división reduccional." },
        { k: "t1", t: "Telofase I", cel: 2, cr: n, cm: d, adn: 2, plo: "n", gl: [0, n], txt: "Dos células haploides (n), pero con cromosomas todavía duplicados: " + n + " cromosomas, " + d + " cromátidas, 2c de ADN cada una." },
        { k: "p2", t: "Profase II", cel: 2, cr: n, cm: d, adn: 2, plo: "n", gl: [0, n], txt: "Sin nueva replicación del ADN. Cada célula se prepara para repartir las cromátidas." },
        { k: "m2", t: "Metafase II", cel: 2, cr: n, cm: d, adn: 2, plo: "n", gl: [0, n], txt: "Los " + n + " cromosomas dobles de cada célula se alinean en el ecuador (se parece a una mitosis de una célula haploide)." },
        { k: "a2", t: "Anafase II", cel: 2, cr: d, cm: d, adn: 2, plo: "n", gl: [d, 0], txt: "Se separan las cromátidas hermanas: por un momento cada célula tiene " + d + " cromosomas simples (" + n + " por polo). Es la división ecuacional." },
        { k: "t2", t: "Telofase II", cel: 4, cr: n, cm: n, adn: 1, plo: "n", gl: [n, 0], txt: "Cuatro células haploides (gametos o esporas): " + n + " cromosomas de una cromátida y 1c de ADN cada una." }
      ];
    }
    return L;
  }
  B.lab = B.lab || {};
  B.lab.bioCiclo = estados;

  function glifo(dup, rojo) {
    if (dup) return '<svg class="bio7-gl dup" viewBox="0 0 24 30" aria-hidden="true"><line class="a" x1="7" y1="4" x2="7" y2="26"/><line class="b" x1="17" y1="4" x2="17" y2="26"/><circle class="c" cx="12" cy="15" r="2.6"/></svg>';
    return '<svg class="bio7-gl" viewBox="0 0 16 30" aria-hidden="true"><line class="' + (rojo ? "b" : "a") + '" x1="8" y1="4" x2="8" y2="26"/><circle class="c" cx="8" cy="15" r="2.6"/></svg>';
  }

  B.w.bio_ciclo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cromosomas, cromátidas y ADN en cada fase");
    cuerpo.innerHTML = '<p class="w-intro">Elige una especie (2n es su número de cromosomas), mitosis o meiosis y una fase. Verás cuántos cromosomas y cromátidas tiene <b>cada célula</b> y cuánto ADN lleva (en unidades c).</p>' +
      '<div class="bio7-et">Especie</div><div data-esp></div><div class="bio7-et">Tipo de división</div><div data-modo></div><div class="bio7-et">Fase</div><div data-fase></div>' +
      '<div class="bio7-cel" aria-label="Dibujo de los cromosomas de una célula"></div><div class="bio7-dato"></div><div class="bio7-veredicto"></div>' +
      '<p class="w-pie">c = cantidad de ADN de un gameto haploide. Un cromosoma de G1 tiene 1 cromátida; tras la fase S, 2 cromátidas hermanas (azul y roja en el dibujo). Valores por célula.</p>';
    var d = 8, modo = "mit", k = "g1";
    var cel = cuerpo.querySelector(".bio7-cel"), dat = cuerpo.querySelector(".bio7-dato"), ver = cuerpo.querySelector(".bio7-veredicto");
    var hFase = cuerpo.querySelector("[data-fase]");
    var ESP = [{ k: "4", t: "2n = 4" }, { k: "8", t: "2n = 8 (mosca)" }, { k: "14", t: "2n = 14 (guisante)" }, { k: "46", t: "2n = 46 (humano)" }];
    U.fichas(cuerpo.querySelector("[data-esp]"), ESP, "8", function (v) { d = parseInt(v, 10); pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "mit", t: "Mitosis" }, { k: "mei", t: "Meiosis" }], "mit", function (v) { modo = v; k = "g1"; fases(); pinta(); });
    function fases() {
      hFase.innerHTML = "";
      U.fichas(hFase, estados(d, modo).map(function (e) { return { k: e.k, t: e.t }; }), k, function (v) { k = v; pinta(); });
    }
    function pinta() {
      var L = estados(d, modo), e = L.filter(function (x) { return x.k === k; })[0] || L[0], html = "", i;
      if (e.par) {
        for (i = 0; i < d / 2; i++) html += '<span class="bio7-biv">' + glifo(true) + glifo(true) + '</span>';
      } else {
        for (i = 0; i < e.gl[0]; i++) html += glifo(false, false);
        for (i = 0; i < e.gl[1]; i++) html += glifo(true);
      }
      cel.innerHTML = html;
      dat.innerHTML = "<div><b>Células en este momento</b>" + e.cel + "</div>" +
        "<div><b>Cromosomas por célula</b>" + e.cr + "</div>" +
        "<div><b>Cromátidas por célula</b>" + e.cm + "</div>" +
        "<div><b>ADN por célula</b>" + (typeof e.adn === "number" ? e.adn + "c" : e.adn) + "</div>" +
        "<div><b>Dotación de la célula</b>" + (e.plo === "2n" ? "diploide (2n)" : "haploide (n)") + "</div>" +
        "<div><b>Moléculas de ADN por célula</b>" + e.cm + "</div>";
      ver.textContent = e.t + ": " + e.txt;
    }
    fases(); pinta();
  };
})(typeof window !== "undefined" ? window : this);
