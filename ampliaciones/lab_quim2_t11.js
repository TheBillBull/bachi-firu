/* ============================================================
   Bachi para Firu · Química II, tema 11: Polímeros y macromoléculas
   Dos simuladores:
   q11_cadena (constructor de cadena: une monómeros por adición o por condensación; muestra qué se libera, la unidad repetida y la masa molar) ·
   q11_red (entrecruzamiento: de termoplástico a elastómero y a termoestable)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;
  function fil(r, v, c) { return U.lec(r, v, c); }
  function d(x, n) { return (Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n).replace(".", ",").replace("-", "−"); }
  function miles(x) { var s = String(Math.round(x)), o = ""; while (s.length > 3) { o = " " + s.slice(-3) + o; s = s.slice(0, -3); } return s + o; }
  function estilo() {
    if (document.getElementById("q11-css")) return;
    var s = document.createElement("style"); s.id = "q11-css";
    s.textContent =
      ".q11-fila { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 8px 0; font-size: 14px; }" +
      ".q11-fila .q11-et { flex: 0 0 100%; font: 700 12px var(--body); text-transform: uppercase; letter-spacing: .04em; color: var(--ink-soft); }" +
      ".q11-b { border: 1.5px solid var(--line); border-radius: 10px; padding: 6px 10px; background: var(--sheet-2); line-height: 1.3; font-family: var(--math); max-width: 100%; overflow-wrap: anywhere; }" +
      ".q11-b.a { border-color: var(--pen); } .q11-b.b { border-color: var(--ok); } .q11-b.u { border-color: var(--ink-soft); }" +
      ".q11-b small { display: block; font: 12px var(--body); color: var(--ink-soft); }" +
      ".q11-op { color: var(--ink-soft); font-weight: 700; } .q11-agua { color: var(--red, var(--ink-soft)); font-weight: 700; }" +
      ".q11-svg { width: 100%; height: auto; max-width: 560px; display: block; margin: 6px auto; } .q11-svg .cad { fill: none; stroke: var(--pen); stroke-width: 2.2; stroke-linejoin: round; }" +
      ".q11-svg .pte { stroke: var(--red, #c0392b); stroke-width: 2.6; stroke-linecap: round; } .q11-svg .pun { fill: var(--red, #c0392b); }";
    document.head.appendChild(s);
  }

  // ---------------- datos (masas atómicas del examen: C 12, H 1, O 16, N 14, Cl 35,5, F 19) ----------------
  var AT = { C: 12, H: 1, O: 16, N: 14, Cl: 35.5, F: 19 };
  function masa(c) { var m = 0; for (var k in c) m += AT[k] * c[k]; return m; }
  var AD = {
    pe: { t: "Eteno → PE", mon: "eteno", fm: "CH₂=CH₂", c: { C: 2, H: 4 }, u: "CH₂−CH₂", pol: "polietileno (PE)", uso: "bolsas, film, botellas, juguetes" },
    pp: { t: "Propeno → PP", mon: "propeno", fm: "CH₂=CH−CH₃", c: { C: 3, H: 6 }, u: "CH₂−CH(CH₃)", pol: "polipropileno (PP)", uso: "envases, tapones, fibras, piezas de coche" },
    pvc: { t: "Cloroeteno → PVC", mon: "cloroeteno (cloruro de vinilo)", fm: "CH₂=CHCl", c: { C: 2, H: 3, Cl: 1 }, u: "CH₂−CHCl", pol: "policloruro de vinilo (PVC)", uso: "tuberías, marcos de ventana, cables" },
    ps: { t: "Estireno → PS", mon: "estireno (feniletileno)", fm: "CH₂=CH−C₆H₅", c: { C: 8, H: 8 }, u: "CH₂−CH(C₆H₅)", pol: "poliestireno (PS)", uso: "envases de yogur, bandejas, aislante (corcho blanco)" },
    ptfe: { t: "Tetrafluoroeteno → PTFE", mon: "tetrafluoroeteno", fm: "CF₂=CF₂", c: { C: 2, F: 4 }, u: "CF₂−CF₂", pol: "politetrafluoroeteno (PTFE, teflón)", uso: "sartenes antiadherentes, juntas" },
    pan: { t: "Acrilonitrilo → PAN", mon: "acrilonitrilo (propenonitrilo)", fm: "CH₂=CH−CN", c: { C: 3, H: 3, N: 1 }, u: "CH₂−CH(CN)", pol: "poliacrilonitrilo (PAN)", uso: "fibras acrílicas (jerséis, mantas)" },
    pmma: { t: "Metacrilato → PMMA", mon: "metacrilato de metilo", fm: "CH₂=C(CH₃)−COOCH₃", c: { C: 5, H: 8, O: 2 }, u: "CH₂−C(CH₃)(COOCH₃)", pol: "polimetacrilato de metilo (PMMA, plexiglás)", uso: "metacrilato transparente, mamparas, lentes" }
  };
  var CO = {
    nylon: { t: "Nailon 6,6", n: 2, m: [{ nom: "ácido hexanodioico", f: "HOOC−(CH₂)₄−COOH", c: { C: 6, H: 10, O: 4 } }, { nom: "hexano-1,6-diamina", f: "H₂N−(CH₂)₆−NH₂", c: { C: 6, H: 16, N: 2 } }],
      u: "CO−(CH₂)₄−CO−NH−(CH₂)₆−NH", enlace: "amida (−CO−NH−)", pol: "nailon 6,6 (poliamida)", uso: "fibras textiles, cuerdas, medias, piezas mecánicas" },
    pet: { t: "PET", n: 2, m: [{ nom: "ácido tereftálico", f: "HOOC−C₆H₄−COOH", c: { C: 8, H: 6, O: 4 } }, { nom: "etano-1,2-diol", f: "HO−CH₂−CH₂−OH", c: { C: 2, H: 6, O: 2 } }],
      u: "CO−C₆H₄−CO−O−CH₂−CH₂−O", enlace: "éster (−COO−)", pol: "polietilentereftalato (PET, poliéster)", uso: "botellas, fibras de poliéster (ropa polar)" },
    pla: { t: "PLA", n: 1, m: [{ nom: "ácido láctico", f: "HO−CH(CH₃)−COOH", c: { C: 3, H: 6, O: 3 } }],
      u: "O−CH(CH₃)−CO", enlace: "éster (−COO−)", pol: "ácido poliláctico (PLA, poliéster biodegradable)", uso: "envases compostables, suturas, impresión 3D" },
    pep: { t: "Péptido (glicina)", n: 1, m: [{ nom: "glicina (aminoácido)", f: "H₂N−CH₂−COOH", c: { C: 2, H: 5, N: 1, O: 2 } }],
      u: "NH−CH₂−CO", enlace: "peptídico (−CO−NH−)", pol: "polipéptido (proteína)", uso: "proteínas: enzimas, colágeno, queratina" },
    glu: { t: "Almidón o celulosa", n: 1, m: [{ nom: "glucosa", f: "C₆H₁₂O₆", c: { C: 6, H: 12, O: 6 } }],
      u: "C₆H₁₀O₅", enlace: "glucosídico (C−O−C)", pol: "polisacárido (almidón o celulosa)", uso: "reserva de energía (almidón), pared vegetal (celulosa)" }
  };
  var MH2O = 18;
  function datosCO(k, n) {   // masas y agua para n unidades repetidas
    var P = CO[k], suma = 0, i; for (i = 0; i < P.m.length; i++) suma += masa(P.m[i].c);
    var unidad = suma - P.n * MH2O, enlaces = P.n * n - 1;
    return { suma: suma, unidad: unidad, enlaces: enlaces, mol: P.n * n, M: n * suma - enlaces * MH2O };
  }

  // ============================================================
  // Q11_CADENA
  // ============================================================
  B.w.q11_cadena = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Constructor de cadenas: ¿qué se libera al unir los monómeros?");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-sel class="chips"></div><div data-ctl></div><div class="q11-dib"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "ad", k: "pe", i: 20 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), dib = cuerpo.querySelector(".q11-dib"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var selHost = cuerpo.querySelector("[data-sel]");
    function nDe(i) { return Math.round(Math.pow(10, i / 10)); }
    U.slider(ctl, { et: "Unidades repetidas", min: 0, max: 40, step: 1, val: st.i, on: function (v) { st.i = v; pinta(); }, fmt: function (v) { return "n = " + miles(nDe(v)); } });
    function blq(txt, cl, pie2) { return '<span class="q11-b ' + cl + ' mv q3f">' + txt + (pie2 ? "<small>" + pie2 + "</small>" : "") + "</span>"; }
    function pinta() {
      var n = nDe(st.i), h = "";
      if (st.modo === "ad") {
        var P = AD[st.k], Mm = masa(P.c), mostrar = Math.min(n, 3), j, cad = "";
        h += '<div class="q11-fila"><span class="q11-et">Monómeros (con doble enlace)</span>';
        for (j = 0; j < mostrar; j++) h += (j ? '<span class="q11-op">+</span>' : "") + blq(P.fm, "a");
        h += (n > mostrar ? '<span class="q11-op">+ …</span>' : "") + "</div>";
        for (j = 0; j < mostrar; j++) cad += P.u + (j < mostrar - 1 ? "−" : "");
        h += '<div class="q11-fila"><span class="q11-et">Polímero (solo enlaces simples C−C)</span>' + blq("−" + cad + (n > mostrar ? "−…" : "−"), "u") + blq("−[" + P.u + "]<sub>n</sub>−", "u", "unidad repetida") + "</div>";
        dib.innerHTML = h;
        lectura.innerHTML = fil("Monómero", P.mon + ", M = " + d(Mm, 1) + " g/mol", "pen ancho") +
          fil("Unidad repetida", "misma fórmula que el monómero: M = " + d(Mm, 1) + " g/mol", "") +
          fil("Se libera", "nada: no se pierde ningún átomo", "ok") +
          fil("M(polímero) = n · M(monómero)", miles(n * Mm) + " g/mol", "ok") +
          fil("Polímero", P.pol, "ancho") + fil("Usos", P.uso, "ancho");
        pie.innerHTML = "En la <b>adición</b> el doble enlace C=C se abre y cada carbono se une a un monómero vecino. Por eso <b>polímero = n · monómero</b>: la fórmula de la unidad repetida es la del monómero.";
      } else {
        var Q = CO[st.k], dc = datosCO(st.k, n), mm = Math.min(n, 2), r, s, nm = Q.m.length;
        h += '<div class="q11-fila"><span class="q11-et">Monómeros (con dos grupos que reaccionan)</span>';
        for (r = 0; r < mm; r++) for (s = 0; s < nm; s++) h += ((r || s) ? '<span class="q11-op">+</span>' : "") + blq(Q.m[s].f, s ? "b" : "a", Q.m[s].nom);
        h += (n > mm ? '<span class="q11-op">+ …</span>' : "") + "</div>";
        h += '<div class="q11-fila"><span class="q11-et">Polímero + moléculas pequeñas liberadas</span>' + blq("−[" + Q.u + "]<sub>n</sub>−", "u", "enlace " + Q.enlace) + '<span class="q11-op">+</span><span class="q11-agua">' + miles(dc.enlaces) + " H₂O</span></div>";
        dib.innerHTML = h;
        var sumTxt = Q.m.map(function (x) { return d(masa(x.c), 0); }).join(" + ");
        lectura.innerHTML = fil("Monómeros", Q.m.map(function (x) { return x.nom + " (M = " + d(masa(x.c), 0) + ")"; }).join(" y "), "pen ancho") +
          fil("Enlace que se forma", Q.enlace, "") +
          fil("Se libera", "1 H₂O por cada enlace: " + miles(dc.enlaces) + (dc.enlaces === 1 ? " molécula de agua" : " moléculas de agua"), "red") +
          fil("Unidad repetida", "M = " + sumTxt + " − " + (Q.n * MH2O) + " = " + d(dc.unidad, 0) + " g/mol", "") +
          fil("M(polímero) ≈ n · M(unidad)", miles(n * dc.unidad) + " g/mol", "ok") +
          fil("Polímero", Q.pol, "ancho") + fil("Usos", Q.uso, "ancho");
        pie.innerHTML = "En la <b>condensación</b> cada enlace nuevo expulsa una molécula pequeña (aquí agua). Por eso <b>la unidad repetida pesa menos que los monómeros juntos</b>: " + (Q.n === 2 ? "se pierden 2 H₂O por unidad (una por cada enlace). " : "se pierde 1 H₂O por unidad. ") + "<small>(Con n pequeño, los dos extremos de la cadena añaden 18 g/mol a la masa exacta; se desprecia.)</small>";
      }
    }
    function listaSel() {
      var tab = st.modo === "ad" ? AD : CO;
      U.fichas(selHost, Object.keys(tab).map(function (k) { return { k: k, t: tab[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "ad", t: "Adición" }, { k: "co", t: "Condensación" }], st.modo, function (k) {
      st.modo = k; st.k = k === "ad" ? "pe" : "nylon"; listaSel(); pinta();
    });
    listaSel(); pinta();
  };

  // ============================================================
  // Q11_RED: entrecruzamiento
  // ============================================================
  var PUENTES = [140, 40, 240, 100, 200, 60, 260, 180], NCAD = 4;
  var TIPOS = [
    { max: 0, t: "Termoplástico", calor: "se reblandece y se funde; al enfriarse vuelve a endurecer", disolv: "se disuelve o se hincha en ciertos disolventes", estira: "se deforma y no recupera del todo", clase: "pen", reciclar: "reciclable fundiéndolo de nuevo" },
    { max: 25, t: "Elastómero", calor: "no funde: se descompone si se calienta mucho", disolv: "solo se hincha", estira: "se estira mucho y recupera la forma al soltar", clase: "ok", reciclar: "difícil de reciclar" },
    { max: 100, t: "Termoestable", calor: "no se reblandece ni funde: se carboniza", disolv: "no se disuelve", estira: "rígido y duro; se rompe antes que estirarse", clase: "red", reciclar: "no se puede refundir" }
  ];
  function tipoDe(p) { for (var i = 0; i < TIPOS.length; i++) if (p <= TIPOS[i].max) return TIPOS[i]; return TIPOS[TIPOS.length - 1]; }
  function nPuentes(p) { return Math.round(p / 100 * PUENTES.length); }
  B.w.q11_red = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Entrecruzamiento: de la cadena suelta a la red");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q11-dib"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { p: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), dib = cuerpo.querySelector(".q11-dib"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Entrecruzamiento", min: 0, max: 100, step: 5, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return d(v, 0) + " %"; } });
    var PRE = [{ k: 0, t: "Polietileno" }, { k: 10, t: "Goma vulcanizada" }, { k: 40, t: "Ebonita" }, { k: 90, t: "Baquelita" }];
    function pinta() {
      var T = tipoDe(st.p), nb = nPuentes(st.p), c, g, x, svg = '<svg class="q11-svg" viewBox="0 0 300 140" role="img" aria-label="Cadenas de polímero con ' + (nb * (NCAD - 1)) + ' puentes">';
      for (c = 0; c < NCAD; c++) {
        var y0 = 20 + c * 34, pts = [];
        for (x = 0; x <= 300; x += 10) pts.push(x + "," + (y0 + ((x / 10) % 2 ? -5 : 5)));
        svg += '<polyline class="cad" points="' + pts.join(" ") + '"/>';
      }
      for (g = 0; g < NCAD - 1; g++) for (var j = 0; j < nb; j++) {
        x = PUENTES[(j + g * 3) % PUENTES.length]; var ya = 25 + g * 34, yb = 59 + g * 34;
        svg += '<line class="pte" x1="' + x + '" y1="' + ya + '" x2="' + x + '" y2="' + yb + '"/><circle class="pun" cx="' + x + '" cy="' + ya + '" r="3"/><circle class="pun" cx="' + x + '" cy="' + yb + '" r="3"/>';
      }
      dib.innerHTML = svg + "</svg>";
      lectura.innerHTML = fil("Puentes entre cadenas", String(nb * (NCAD - 1)), "") + fil("Tipo", T.t, T.clase) +
        fil("Al calentar", T.calor, "ancho") + fil("En disolvente", T.disolv, "ancho") + fil("Al estirar", T.estira, "ancho") + fil("Reciclado", T.reciclar, "ancho");
      pie.innerHTML = "Los puentes (en rojo) son enlaces covalentes entre cadenas, por ejemplo los puentes de azufre de la vulcanización. <small>Los porcentajes son orientativos: sirven para ver la tendencia, no son medidas reales.</small>";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), PRE.map(function (x) { return { k: String(x.k), t: x.t }; }), "0", function (k) { st.p = +k; sl.set(st.p); pinta(); });
    pinta();
  };

  B.lab.q11 = { AD: AD, CO: CO, AT: AT, masa: masa, datosCO: datosCO };
})(window);
