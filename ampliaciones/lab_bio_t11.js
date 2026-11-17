/* ============================================================
   Bachi para Firu · Biología II, tema 11 (Base molecular de la herencia)
   bio_meselson:  el tubo de centrifugación de Meselson y Stahl, generación a generación, para los tres modelos.
   bio_horquilla: la horquilla de replicación: hebra adelantada continua y retrasada en fragmentos de Okazaki (procariota o eucariota).
   bio_telomeros: acortamiento de los telómeros con cada división (célula somática, madre y cancerosa).
   Estilos inyectados desde aquí. Los números del modelo los recalcula herramientas/verificar_bio2_t11.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio11-estilos")) return;
    var s = document.createElement("style"); s.id = "bio11-estilos";
    s.textContent =
      ".bio11-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio11-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio11-svg .b11-peq{font-size:10.5px;fill:var(--ink-faint);font-weight:500}" +
      ".bio11-svg .b11-tubo{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio11-svg .b11-banda{fill:var(--pen)}" +
      ".bio11-svg .b11-banda.mid{fill:#b07a1d}" +
      ".bio11-svg .b11-banda.lig{fill:var(--ok)}" +
      ".bio11-svg .b11-mol{fill:none;stroke:var(--ink-faint);stroke-width:2}" +
      ".bio11-svg .b11-ant{stroke:var(--ink-faint);stroke-width:3;fill:none}" +
      ".bio11-svg .b11-ad{stroke:var(--pen);stroke-width:4;fill:none}" +
      ".bio11-svg .b11-ok{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.5}" +
      ".bio11-svg .b11-now{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio11-svg .b11-cebo{fill:var(--red)}" +
      ".bio11-svg .b11-barra{fill:var(--pen)} .bio11-svg .b11-barra.mal{fill:var(--red)} .bio11-svg .b11-barra.ok{fill:var(--ok)}" +
      ".bio11-svg .b11-fondo{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio11-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio11-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio11-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio11-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio11-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio11-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      "@media(max-width:520px){.bio11-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------------ MESELSON Y STAHL
  var D15 = 1.724, D14 = 1.710, DMID = (D15 + D14) / 2;      // g/mL (valores del experimento original, redondeados)
  function bandas(modelo, n) {
    var f = Math.pow(0.5, n);
    if (n === 0) return [{ d: D15, f: 1, c: "pes" }];
    if (modelo === "con") return [{ d: D15, f: f, c: "pes" }, { d: D14, f: 1 - f, c: "lig" }];
    if (modelo === "sem") return n === 1 ? [{ d: DMID, f: 1, c: "mid" }] : [{ d: DMID, f: 2 * f, c: "mid" }, { d: D14, f: 1 - 2 * f, c: "lig" }];
    return [{ d: D14 + (D15 - D14) * f, f: 1, c: "mid" }];
  }
  function igual(a, b) {
    if (a.length !== b.length) return false;
    return a.every(function (x, i) { return Math.abs(x.d - b[i].d) < 1e-9 && Math.abs(x.f - b[i].f) < 1e-9; });
  }
  var NOM = { con: "conservativo", sem: "semiconservativo", dis: "dispersivo" };

  B.w.bio_meselson = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El tubo de Meselson y Stahl");
    cuerpo.innerHTML = '<p class="w-intro">Elige un modelo y avanza las generaciones en medio con <sup>14</sup>N. Cada tubo muestra dónde se queda el ADN al centrifugar: arriba el ligero, abajo el pesado. Compara con lo que se vio de verdad.</p>' +
      '<div data-m></div><div data-ctl></div><div class="bio11-dibujo"></div><div class="bio11-dato"></div><div class="bio11-veredicto"></div>' +
      '<p class="w-pie">Densidades de referencia: ADN <sup>15</sup>N = 1,724 g/mL y ADN <sup>14</sup>N = 1,710 g/mL; el híbrido queda en el punto medio (1,717). El grosor de cada banda es proporcional a la fracción de moléculas.</p>';
    var mod = "sem", gen = 1;
    var dib = cuerpo.querySelector(".bio11-dibujo"), dat = cuerpo.querySelector(".bio11-dato"), ver = cuerpo.querySelector(".bio11-veredicto");
    U.fichas(cuerpo.querySelector("[data-m]"), [{ k: "con", t: "Conservativo" }, { k: "sem", t: "Semiconservativo" }, { k: "dis", t: "Dispersivo" }], mod, function (k) { mod = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Generaciones en <sup>14</sup>N", min: 0, max: 4, step: 1, val: gen, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { gen = Math.round(v); pinta(); } });
    function y(d) { return 34 + (d - 1.708) / (1.726 - 1.708) * 110; }
    function pct(x) { return B.fmt(100 * x, 1) + " %"; }
    function pinta() {
      var s = '<svg class="bio11-svg" viewBox="0 0 400 190" role="img" aria-label="Tubos de centrifugación por generación" style="max-width:440px">' +
        '<text class="b11-peq" x="4" y="14">más ligero ↑</text><text class="b11-peq" x="4" y="184">más pesado ↓</text>';
      for (var g = 0; g <= gen; g++) {
        var x = 62 + g * 66;
        s += '<rect class="b11-tubo" x="' + x + '" y="20" width="44" height="150" rx="14"/>';
        bandas(mod, g).forEach(function (b) {
          var h = 3 + 14 * b.f, yy = y(b.d);
          s += '<rect class="b11-banda ' + b.c + '" x="' + (x + 3) + '" y="' + (yy - h / 2).toFixed(1) + '" width="38" height="' + h.toFixed(1) + '" rx="3"/>';
        });
        s += '<text x="' + (x + 22) + '" y="184" text-anchor="middle">' + (g === 0 ? "gen. 0" : "gen. " + g) + '</text>';
      }
      dib.innerHTML = s + "</svg>";
      var bs = bandas(mod, gen);
      var nom = { pes: "pesado (¹⁵N-¹⁵N)", mid: "intermedio (híbrido)", lig: "ligero (¹⁴N-¹⁴N)" };
      dat.innerHTML = '<div><b>Bandas en el tubo</b>' + bs.length + '</div>' +
        '<div><b>Qué hay</b>' + bs.map(function (b) { return pct(b.f) + " " + nom[b.c]; }).join("; ") + '</div>';
      var cls = "", t;
      if (gen === 0) t = "Generación 0: todo el ADN es pesado (cultivo en ¹⁵N). Es el punto de partida; los tres modelos coinciden.";
      else if (gen <= 2) {
        var obs = bandas("sem", gen), coinc = igual(bs, obs);
        t = "Generación " + gen + ": " + (gen === 1 ? "Meselson y Stahl vieron una sola banda intermedia." : "vieron dos bandas, intermedia y ligera, a partes iguales (50 % y 50 %).") + " El modelo " + NOM[mod] + (coinc ? " lo explica" : " NO lo explica") + ".";
        cls = coinc ? " ok" : " mal";
        if (coinc && mod === "dis") t += " (Por sí solo, este resultado no basta para descartarlo: lo descarta la generación 2.)";
        if (!coinc && mod === "con") t += " Predice una banda pesada y otra ligera, nunca una intermedia.";
        if (!coinc && mod === "dis") t += " Predice una única banda cada vez más ligera, sin banda totalmente ligera.";
      } else t = "Generación " + gen + ": predicción del modelo " + NOM[mod] + " (no es la que decidió el experimento: ya en la generación 2 el semiconservativo era el único compatible).";
      ver.className = "bio11-veredicto" + cls;
      ver.textContent = t;
    }
    pinta();
  };

  // ------------------------------------------------------------------ HORQUILLA DE REPLICACIÓN
  var TIPOS = {
    pro: { nom: "Procariota (E. coli)", frag: 1500, max: 6000, ini: 4500, paso: 100, ad: "ADN polimerasa III", fr: "1000-2000 nt" },
    euc: { nom: "Eucariota", frag: 200, max: 2000, ini: 1000, paso: 50, ad: "ADN polimerasas δ y ε", fr: "100-200 nt" }
  };
  function recuento(tipo, L) {
    var s = TIPOS[tipo].frag, tot = L > 0 ? Math.ceil(L / s) : 0;
    return { total: tot, completos: Math.floor(L / s), cebadores: L > 0 ? tot + 1 : 0 };
  }

  B.w.bio_horquilla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La horquilla de replicación y los fragmentos de Okazaki");
    cuerpo.innerHTML = '<p class="w-intro">Avanza la horquilla (nucleótidos ya replicados desde el origen). La hebra adelantada se hace de una vez; la retrasada, a trozos, y cada trozo necesita su cebador de ARN.</p>' +
      '<div data-t></div><div data-ctl></div><div class="bio11-dibujo"></div><div class="bio11-dato"></div><div class="bio11-veredicto"></div>' +
      '<p class="w-pie">Tamaños orientativos de los libros de texto: fragmentos de ≈ 1500 nt en procariotas y ≈ 200 nt en eucariotas. Cebadores = 1 (hebra adelantada) + 1 por fragmento de la retrasada.</p>';
    var tipo = "euc", L = TIPOS.euc.ini;
    var dib = cuerpo.querySelector(".bio11-dibujo"), dat = cuerpo.querySelector(".bio11-dato"), ver = cuerpo.querySelector(".bio11-veredicto");
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Longitud replicada", min: 0, max: TIPOS.euc.max, step: TIPOS.euc.paso, val: L, fmt: function (v) { return B.fmt(v, 0) + " nt"; }, on: function (v) { L = v; pinta(); } });
    U.fichas(cuerpo.querySelector("[data-t]"), [{ k: "euc", t: "Eucariota" }, { k: "pro", t: "Procariota" }], tipo, function (k) {
      tipo = k; var t = TIPOS[k];
      sl.input.max = t.max; sl.input.step = t.paso; L = t.ini; sl.set(L); pinta();
    });
    function pinta() {
      var t = TIPOS[tipo], r = recuento(tipo, L), W = 300, x0 = 24, esc = W / t.max, xf = x0 + L * esc;
      var s = '<svg class="bio11-svg" viewBox="0 0 400 190" role="img" aria-label="Horquilla de replicación" style="max-width:460px">' +
        '<text class="b11-peq" x="4" y="14">origen</text><text class="b11-peq" x="396" y="14" text-anchor="end">ADN parental →</text>';
      s += '<line class="b11-ant" x1="' + xf.toFixed(1) + '" y1="92" x2="392" y2="92"/><line class="b11-ant" x1="' + xf.toFixed(1) + '" y1="98" x2="392" y2="98"/>';
      s += '<line class="b11-ant" x1="' + x0 + '" y1="50" x2="' + xf.toFixed(1) + '" y2="50"/><line class="b11-ant" x1="' + x0 + '" y1="140" x2="' + xf.toFixed(1) + '" y2="140"/>';
      s += '<line class="b11-mol" x1="' + xf.toFixed(1) + '" y1="92" x2="' + xf.toFixed(1) + '" y2="50"/><line class="b11-mol" x1="' + xf.toFixed(1) + '" y1="98" x2="' + xf.toFixed(1) + '" y2="140"/>';
      s += '<text class="b11-peq" x="' + x0 + '" y="43">molde de la hebra adelantada</text><text class="b11-peq" x="' + x0 + '" y="158">molde de la hebra retrasada</text>';
      if (L > 0) s += '<line class="b11-ad" x1="' + x0 + '" y1="64" x2="' + xf.toFixed(1) + '" y2="64"/><polygon points="' + xf.toFixed(1) + ',64 ' + (xf - 8).toFixed(1) + ',59 ' + (xf - 8).toFixed(1) + ',69" fill="var(--pen)"/>' +
        '<rect class="b11-cebo" x="' + (x0 - 3) + '" y="60" width="6" height="8"/>';
      for (var i = 0; i < r.total; i++) {
        var a = x0 + i * t.frag * esc, b = Math.min(xf, x0 + (i + 1) * t.frag * esc), ahora = i === r.total - 1 && L % t.frag !== 0;
        s += '<rect class="' + (ahora ? "b11-now" : "b11-ok") + '" x="' + (a + 0.7).toFixed(1) + '" y="124" width="' + Math.max(1, b - a - 1.4).toFixed(1) + '" height="9" rx="2"/>' +
          '<rect class="b11-cebo" x="' + (b - 4).toFixed(1) + '" y="124" width="4" height="9"/>';
      }
      s += '<text class="b11-peq" x="' + (xf + 4).toFixed(1) + '" y="86">helicasa</text>';
      s += '<text class="b11-peq" x="4" y="182">rojo oscuro = cebador de ARN · azul = fragmento hecho · rojo claro = en construcción</text></svg>';
      dib.innerHTML = s;
      dat.innerHTML = '<div><b>Hebra adelantada</b>' + B.fmt(L, 0) + ' nt, de una vez (1 cebador)</div>' +
        '<div><b>Hebra retrasada</b>' + r.total + ' fragmento' + (r.total === 1 ? "" : "s") + ' de Okazaki' + (r.total > r.completos ? " (" + r.completos + " completo" + (r.completos === 1 ? "" : "s") + " y 1 en construcción)" : "") + '</div>' +
        '<div><b>Cebadores de ARN</b>' + r.cebadores + '</div>' +
        '<div><b>Enzima principal</b>' + t.ad + '</div>';
      ver.className = "bio11-veredicto" + (L === 0 ? "" : " ok");
      ver.textContent = L === 0 ? "La horquilla aún no ha empezado a avanzar." : "En " + t.nom.toLowerCase() + ", con fragmentos de " + t.fr + ": tras replicar " + B.fmt(L, 0) + " nt, la retrasada lleva " + r.total + " fragmento(s) y se han usado " + r.cebadores + " cebadores. Después se cambia cada cebador por ADN y la ligasa une los trozos.";
    }
    pinta();
  };

  // ------------------------------------------------------------------ TELÓMEROS
  var TEL = { ini: 10000, crit: 4000, tipos: {
    som: { nom: "Célula somática", perd: 100, txt: "sin telomerasa" },
    mad: { nom: "Célula madre", perd: 20, txt: "telomerasa poco activa" },
    can: { nom: "Célula cancerosa", perd: 0, txt: "telomerasa muy activa" } } };
  function longTel(tipo, d) { return TEL.ini - TEL.tipos[tipo].perd * d; }

  B.w.bio_telomeros = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Telómeros: un contador de divisiones");
    cuerpo.innerHTML = '<p class="w-intro">Cada vez que una célula copia su ADN lineal, pierde un trocito del extremo. Mira cómo cambia el telómero según el tipo de célula.</p>' +
      '<div data-t></div><div data-ctl></div><div class="bio11-dibujo"></div><div class="bio11-dato"></div><div class="bio11-veredicto"></div>' +
      '<p class="w-pie">Modelo de ejemplo (unidades de los libros): telómero inicial de 10 000 nt; la célula somática pierde 100 nt por división; por debajo de 4000 nt la célula deja de dividirse (senescencia). Los valores reales varían entre personas y tejidos.</p>';
    var tipo = "som", d = 20;
    var dib = cuerpo.querySelector(".bio11-dibujo"), dat = cuerpo.querySelector(".bio11-dato"), ver = cuerpo.querySelector(".bio11-veredicto");
    U.fichas(cuerpo.querySelector("[data-t]"), [{ k: "som", t: "Somática" }, { k: "mad", t: "Madre" }, { k: "can", t: "Cancerosa" }], tipo, function (k) { tipo = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Divisiones", min: 0, max: 80, step: 1, val: d, fmt: function (v) { return String(Math.round(v)); }, on: function (v) { d = Math.round(v); pinta(); } });
    function pinta() {
      var L = longTel(tipo, d), sen = L <= TEL.crit, tp = TEL.tipos[tipo];
      var w = Math.max(0, 340 * L / TEL.ini), wc = 340 * TEL.crit / TEL.ini;
      dib.innerHTML = '<svg class="bio11-svg" viewBox="0 0 400 90" role="img" aria-label="Longitud del telómero" style="max-width:440px">' +
        '<rect class="b11-fondo" x="24" y="30" width="340" height="22" rx="6"/>' +
        '<rect class="b11-barra ' + (sen ? "mal" : (tipo === "can" ? "ok" : "")) + '" x="24" y="30" width="' + w.toFixed(1) + '" height="22" rx="6"/>' +
        '<line x1="' + (24 + wc).toFixed(1) + '" y1="22" x2="' + (24 + wc).toFixed(1) + '" y2="60" stroke="var(--red)" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<text class="b11-peq" x="' + (24 + wc).toFixed(1) + '" y="74" text-anchor="middle">límite crítico 4000 nt</text>' +
        '<text class="b11-peq" x="24" y="22">telómero (TTAGGG repetido)</text></svg>';
      dat.innerHTML = '<div><b>Tipo</b>' + tp.nom + ' (' + tp.txt + ')</div><div><b>Longitud del telómero</b>' + B.fmt(L, 0) + ' nt tras ' + d + ' divisiones</div>';
      ver.className = "bio11-veredicto" + (sen ? " mal" : (tipo === "can" ? " ok" : ""));
      if (sen) ver.textContent = "Senescencia: el telómero ya es demasiado corto y la célula somática deja de dividirse (límite de Hayflick, ≈ 60 divisiones en este modelo).";
      else if (tipo === "can") ver.textContent = "La telomerasa repone lo que se pierde: el telómero no se acorta y la célula puede dividirse sin límite. Es una de las marcas del cáncer.";
      else if (tipo === "mad") ver.textContent = "La telomerasa compensa casi todo el acortamiento: las células madre pueden dividirse muchas más veces que las somáticas.";
      else ver.textContent = "Todavía quedan " + Math.floor((L - TEL.crit) / tp.perd) + " divisiones antes del límite crítico.";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
