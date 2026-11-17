/* ============================================================
   Bachi para Firu · Biología II, tema 15 (Inmunología)
   bio_respuesta: gráfica de anticuerpos en el tiempo: respuesta primaria y secundaria (mismo antígeno o antígeno distinto).
   bio_anticuerpo: esquema de un anticuerpo (IgG) en el que se pulsa cada parte.
   bio_transfusion: transfusión entre un donante y un receptor (ABO y Rh) con el porqué de la reacción.
   Estilos inyectados desde aquí. Los números los recalcula herramientas/verificar_bio2_t15.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio15-estilos")) return;
    var s = document.createElement("style"); s.id = "bio15-estilos";
    s.textContent =
      ".bio15-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio15-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio15-svg .ej{stroke:var(--ink-faint);stroke-width:1.5;fill:none}" +
      ".bio15-svg .cur1{fill:none;stroke:var(--pen);stroke-width:3}" +
      ".bio15-svg .cur2{fill:none;stroke:var(--red);stroke-width:3}" +
      ".bio15-svg .marca{stroke:var(--ink-faint);stroke-width:1.5;stroke-dasharray:5 4}" +
      ".bio15-svg .ab-h{fill:none;stroke:var(--pen);stroke-width:16;stroke-linecap:round;stroke-linejoin:round}" +
      ".bio15-svg .ab-l{fill:none;stroke:var(--ok);stroke-width:12;stroke-linecap:round;stroke-linejoin:round}" +
      ".bio15-svg .ab-v{fill:none;stroke:var(--red);stroke-width:6;stroke-linecap:round;opacity:.9}" +
      ".bio15-svg .ab-ss{stroke:var(--ink);stroke-width:3}" +
      ".bio15-svg .ab-zona{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5;stroke-dasharray:6 4}" +
      ".bio15-svg .ab-sel{stroke:var(--ink)!important;stroke-width:3.5;opacity:1}" +
      ".bio15-svg .hit{cursor:pointer}" +
      ".bio15-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio15-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio15-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio15-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio15-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio15-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio15-leyenda{display:flex;flex-wrap:wrap;gap:10px;font-size:13px;color:var(--ink);margin:2px 0}" +
      ".bio15-leyenda i{display:inline-block;width:18px;height:4px;border-radius:2px;vertical-align:middle;margin-right:5px}" +
      ".bio15-fila{margin:8px 0 2px;font-size:13px;color:var(--ink-faint);font-weight:700;text-transform:uppercase;letter-spacing:.03em}" +
      ".bio15-par{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}" +
      ".bio15-par .b15-cuadro{border:1.5px solid var(--line);border-radius:10px;padding:8px;background:var(--sheet);text-align:center;color:var(--ink);font-size:14px}" +
      ".bio15-par svg{width:100%;max-width:150px;height:auto}" +
      ".bio15-par svg text{font:700 13px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio15-par .he{fill:var(--red-soft);stroke:var(--red);stroke-width:2.5}" +
      ".bio15-par .b15-ag{fill:var(--pen);stroke:none}" +
      ".bio15-par .b15-ac{fill:none;stroke:var(--ok);stroke-width:3}" +
      ".bio15-par.mal .b15-cuadro:first-child{border-color:var(--red)}" +
      "@media(max-width:520px){.bio15-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  function f1(x) { return (Math.round(x * 100) / 100).toFixed(2).replace(".", ","); }

  // ------------------------------------------------------------------ RESPUESTA PRIMARIA Y SECUNDARIA
  // Modelo cualitativo (unidades arbitrarias): subida con sen², pico y caída exponencial.
  //   respuesta primaria:   latencia 5 d, pico a los 14 d tras el contacto (altura 1), caída con tau = 15 d
  //   respuesta secundaria: latencia 2 d, pico a los 7 d tras el contacto (altura 10), caída con tau = 60 d
  var P1 = { lag: 5, pico: 14, A: 1, tau: 15 }, P2 = { lag: 2, pico: 7, A: 10, tau: 60 };
  function resp(t, t0, p) {
    var s = t - t0;
    if (s <= p.lag) return 0;
    if (s <= p.pico) return p.A * Math.pow(Math.sin(Math.PI / 2 * (s - p.lag) / (p.pico - p.lag)), 2);
    return p.A * Math.exp(-(s - p.pico) / p.tau);
  }

  B.w.bio_respuesta = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Primer y segundo contacto con un antígeno");
    cuerpo.innerHTML = '<p class="w-intro">El primer contacto con el antígeno A ocurre el día 0. Elige qué pasa en el segundo contacto y cuándo.</p>' +
      '<div data-tipo></div><div data-ctl></div><svg class="bio15-svg" viewBox="0 0 560 250" role="img" aria-label="Anticuerpos en sangre según los días"></svg>' +
      '<div class="bio15-leyenda"></div><div class="bio15-dato"></div><div class="bio15-veredicto"></div>' +
      '<p class="w-pie">Modelo cualitativo en unidades arbitrarias: lo importante es la forma (latencia, altura, duración), no las cifras.</p>';
    var tipo = "mismo", d2 = 40;
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "mismo", t: "2.º contacto: el mismo antígeno (A)" }, { k: "otro", t: "2.º contacto: otro antígeno (B)" }], tipo, function (k) { tipo = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Día del 2.º contacto", min: 20, max: 100, step: 5, val: d2, fmt: function (v) { return "día " + v; }, on: function (v) { d2 = v; pinta(); } });
    var svg = cuerpo.querySelector("svg"), ley = cuerpo.querySelector(".bio15-leyenda"), dat = cuerpo.querySelector(".bio15-dato"), ver = cuerpo.querySelector(".bio15-veredicto");
    var X0 = 50, X1 = 540, Y0 = 215, Y1 = 20, TMAX = 140, VMAX = 12;
    function px(t) { return X0 + (X1 - X0) * t / TMAX; }
    function py(v) { return Y0 - (Y0 - Y1) * v / VMAX; }
    function curva(f) {
      var pts = [], t;
      for (t = 0; t <= TMAX; t += 1) pts.push(px(t).toFixed(1) + "," + py(Math.min(f(t), VMAX)).toFixed(1));
      return pts.join(" ");
    }
    function pinta() {
      var fA, fB = null, ej = "", t;
      if (tipo === "mismo") fA = function (x) { return resp(x, 0, P1) + resp(x, d2, P2); };
      else { fA = function (x) { return resp(x, 0, P1); }; fB = function (x) { return resp(x, d2, P1); }; }
      ej += '<line class="ej" x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '"/><line class="ej" x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '"/>';
      for (t = 0; t <= TMAX; t += 20) ej += '<text x="' + px(t) + '" y="' + (Y0 + 16) + '" text-anchor="middle">' + t + "</text>";
      ej += '<text x="' + ((X0 + X1) / 2) + '" y="246" text-anchor="middle">días desde el primer contacto</text>';
      ej += '<text x="14" y="' + ((Y0 + Y1) / 2) + '" text-anchor="middle" transform="rotate(-90 14 ' + ((Y0 + Y1) / 2) + ')">anticuerpos (u. arb.)</text>';
      ej += '<line class="marca" x1="' + px(0) + '" y1="' + Y0 + '" x2="' + px(0) + '" y2="' + Y1 + '"/><text x="' + (px(0) + 4) + '" y="' + (Y1 + 2) + '">1.º contacto</text>';
      ej += '<line class="marca" x1="' + px(d2) + '" y1="' + Y0 + '" x2="' + px(d2) + '" y2="' + Y1 + '"/><text x="' + (px(d2) + 4) + '" y="' + (Y1 + 14) + '">2.º contacto</text>';
      svg.innerHTML = ej + '<polyline class="cur1" points="' + curva(fA) + '"/>' + (fB ? '<polyline class="cur2" points="' + curva(fB) + '"/>' : "");
      ley.innerHTML = tipo === "mismo" ? '<span><i style="background:var(--pen)"></i>anticuerpos anti-A</span>' : '<span><i style="background:var(--pen)"></i>anti-A</span><span><i style="background:var(--red)"></i>anti-B</span>';
      var previo = resp(d2, 0, P1);
      var pico2 = tipo === "mismo" ? P2.A + resp(d2 + P2.pico, 0, P1) : P1.A;
      dat.innerHTML = "<div><b>Latencia del 1.º contacto</b>" + P1.lag + " días</div>" +
        "<div><b>Latencia del 2.º contacto</b>" + (tipo === "mismo" ? P2.lag : P1.lag) + " días</div>" +
        "<div><b>Pico tras el 1.º contacto</b>" + f1(P1.A) + " u.</div>" +
        "<div><b>Pico tras el 2.º contacto</b>" + f1(pico2) + " u.</div>" +
        "<div><b>Anticuerpos justo antes del 2.º</b>" + f1(previo) + " u.</div>";
      if (tipo === "mismo") { ver.className = "bio15-veredicto ok"; ver.textContent = "Respuesta secundaria: más rápida (2 días de latencia frente a 5), unas 10 veces más alta y más duradera, porque ya había células de memoria contra A."; }
      else { ver.className = "bio15-veredicto mal"; ver.textContent = "Antígeno distinto: la memoria contra A no sirve. Frente a B el organismo hace una respuesta primaria: latencia de 5 días y pico bajo (1 u.)."; }
    }
    pinta();
  };

  // ------------------------------------------------------------------ ANTICUERPO
  var PARTES = {
    pesada: ["Cadena pesada (H)", "Cada anticuerpo tiene dos, idénticas, de unos 50 kDa (≈ 440 aminoácidos). Forman el tronco y la mitad de cada brazo de la «Y». Se unen entre sí y a las ligeras por puentes disulfuro."],
    ligera: ["Cadena ligera (L)", "Dos, idénticas, de unos 25 kDa (≈ 220 aminoácidos). Cada una acompaña a una cadena pesada en un brazo. Peso total del IgG: 2 · 50 + 2 · 25 = 150 kDa."],
    variable: ["Región variable", "Extremo de cada brazo, formado por la parte inicial de una cadena pesada y de una ligera. Su secuencia cambia de un anticuerpo a otro: es la que reconoce el antígeno."],
    sitio: ["Sitio de unión al antígeno", "El hueco formado por las regiones variables. Encaja con el epítopo del antígeno como una llave en su cerradura. Un IgG tiene 2 sitios, iguales entre sí."],
    bisagra: ["Región bisagra", "Zona flexible entre los brazos y el tronco: permite abrir y cerrar la «Y» para unirse a antígenos separados entre sí."],
    ss: ["Puentes disulfuro", "Enlaces covalentes S–S entre cisteínas que mantienen unidas las cuatro cadenas (dos H–H y dos H–L)."],
    fab: ["Fragmento Fab", "«Fragmento de unión al antígeno»: cada brazo (una cadena ligera completa y la mitad de una pesada). Hay dos por anticuerpo."],
    fc: ["Fragmento Fc (región constante)", "El tronco. Su secuencia es la misma en todos los anticuerpos de una clase y determina la clase (IgG, IgM, IgA, IgE, IgD). Se une a los fagocitos y activa el complemento."]
  };
  B.w.bio_anticuerpo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Anatomía de un anticuerpo (IgG)");
    cuerpo.innerHTML = '<p class="w-intro">Pulsa una parte del dibujo o de la lista para ver qué es y para qué sirve.</p>' +
      '<svg class="bio15-svg" viewBox="0 0 300 300" role="img" aria-label="Esquema de un anticuerpo en forma de Y" style="max-width:340px">' +
      '<rect class="ab-zona" x="10" y="12" width="280" height="136" rx="12" data-p="fab" style="cursor:pointer"/>' +
      '<rect class="ab-zona" x="104" y="160" width="92" height="132" rx="12" data-p="fc" style="cursor:pointer"/>' +
      '<polyline class="ab-h hit" data-p="pesada" points="62,52 112,128 142,166 142,262"/><polyline class="ab-h hit" data-p="pesada" points="238,52 188,128 158,166 158,262"/>' +
      '<polyline class="ab-l hit" data-p="ligera" points="34,66 84,142"/><polyline class="ab-l hit" data-p="ligera" points="266,66 216,142"/>' +
      '<polyline class="ab-v hit" data-p="variable" points="62,52 50,36 34,66 46,82"/><polyline class="ab-v hit" data-p="variable" points="238,52 250,36 266,66 254,82"/>' +
      '<circle class="ab-v hit" data-p="sitio" cx="48" cy="48" r="9" style="fill:var(--sheet)"/><circle class="ab-v hit" data-p="sitio" cx="252" cy="48" r="9" style="fill:var(--sheet)"/>' +
      '<line class="ab-ss hit" data-p="ss" x1="100" y1="110" x2="120" y2="124"/><line class="ab-ss hit" data-p="ss" x1="200" y1="110" x2="180" y2="124"/><line class="ab-ss hit" data-p="ss" x1="143" y1="202" x2="157" y2="202"/>' +
      '<circle class="ab-ss hit" data-p="bisagra" cx="150" cy="158" r="9" style="fill:var(--sheet)"/>' +
      '<text x="20" y="140">Fab</text><text x="160" y="284">Fc</text></svg>' +
      '<div data-lista></div><div class="bio15-veredicto"></div>';
    var ver = cuerpo.querySelector(".bio15-veredicto"), svg = cuerpo.querySelector("svg"), lista = cuerpo.querySelector("[data-lista]");
    var orden = ["pesada", "ligera", "variable", "sitio", "bisagra", "ss", "fab", "fc"];
    function elegir(k) {
      Array.prototype.forEach.call(svg.querySelectorAll("[data-p]"), function (e) { e.classList.toggle("ab-sel", e.getAttribute("data-p") === k && e.tagName !== "rect"); });
      Array.prototype.forEach.call(lista.children, function (c) { var on = c.getAttribute("data-k") === k; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      ver.innerHTML = "<b>" + PARTES[k][0] + ".</b> " + PARTES[k][1];
    }
    U.fichas(lista, orden.map(function (k) { return { k: k, t: PARTES[k][0].replace(/ \(.*\)/, "") }; }), "variable", elegir);
    svg.addEventListener("click", function (e) { var t = e.target.closest("[data-p]"); if (t) elegir(t.getAttribute("data-p")); });
    elegir("variable");
  };

  // ------------------------------------------------------------------ TRANSFUSIONES ABO + Rh
  var GRUPOS = { A: ["A"], B: ["B"], AB: ["A", "B"], O: [] };
  function antis(ag) { return ["A", "B", "D"].filter(function (a) { return ag.indexOf(a) < 0; }); }   // anticuerpos que puede tener (anti-D solo si Rh− y sensibilizado)
  function antigenos(g, rh) { return GRUPOS[g].concat(rh === "+" ? ["D"] : []); }
  function hematie(ag) {
    var pos = [[28, 36], [92, 36], [60, 78], [26, 76], [94, 76]], s = '<svg viewBox="0 0 120 112" aria-hidden="true"><ellipse class="he" cx="60" cy="56" rx="52" ry="46"/>';
    ag.forEach(function (a, i) { var p = pos[i]; s += '<circle class="b15-ag" cx="' + p[0] + '" cy="' + p[1] + '" r="9"/><text x="' + p[0] + '" y="' + (p[1] + 4.5) + '" text-anchor="middle" style="fill:var(--sheet)">' + (a === "D" ? "D" : a) + "</text>"; });
    if (!ag.length) s += '<text x="60" y="61" text-anchor="middle">sin antígenos</text>';
    return s + "</svg>";
  }
  function plasma(g, rh) {
    var ac = antis(GRUPOS[g]).filter(function (a) { return a !== "D"; }), s = '<svg viewBox="0 0 120 112" aria-hidden="true">';
    ac.forEach(function (a, i) {
      var x = 30 + i * 60;
      s += '<polyline class="b15-ac" points="' + (x - 14) + ",22 " + x + ",50 " + (x + 14) + ',22"/><line class="b15-ac" x1="' + x + '" y1="50" x2="' + x + '" y2="84"/><text x="' + x + '" y="104" text-anchor="middle">anti-' + a + "</text>";
    });
    if (!ac.length) s += '<text x="60" y="58" text-anchor="middle">sin anti-A ni anti-B</text>';
    return s + "</svg>";
  }
  B.w.bio_transfusion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Se puede transfundir?");
    cuerpo.innerHTML = '<p class="w-intro">Elige el grupo del donante y del receptor. Se transfunden hematíes: ¿hay en el receptor anticuerpos contra los antígenos de esos hematíes?</p>' +
      '<div class="bio15-fila">Donante: grupo</div><div data-dg></div><div data-dr></div>' +
      '<div class="bio15-fila">Receptor: grupo</div><div data-rg></div><div data-rr></div>' +
      '<div class="bio15-par"></div><div class="bio15-dato"></div><div class="bio15-veredicto"></div>' +
      '<p class="w-pie">Los anticuerpos anti-A y anti-B son «naturales» (están sin contacto previo); el anti-D solo aparece tras sensibilizarse un receptor Rh− con sangre Rh+.</p>';
    var d = { g: "O", rh: "−" }, r = { g: "AB", rh: "+" };
    var gs = [{ k: "A", t: "A" }, { k: "B", t: "B" }, { k: "AB", t: "AB" }, { k: "O", t: "O" }], rs = [{ k: "+", t: "Rh +" }, { k: "−", t: "Rh −" }];
    U.fichas(cuerpo.querySelector("[data-dg]"), gs, d.g, function (k) { d.g = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-dr]"), rs, d.rh, function (k) { d.rh = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-rg]"), gs, r.g, function (k) { r.g = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-rr]"), rs, r.rh, function (k) { r.rh = k; pinta(); });
    var par = cuerpo.querySelector(".bio15-par"), dat = cuerpo.querySelector(".bio15-dato"), ver = cuerpo.querySelector(".bio15-veredicto");
    function pinta() {
      var ad = antigenos(d.g, d.rh), ar = antigenos(r.g, r.rh);
      var ataca = ad.filter(function (a) { return ar.indexOf(a) < 0; });
      var ok = ataca.length === 0;
      var nom = function (g, rh) { return g + (rh === "+" ? "+" : "−"); };
      par.className = "bio15-par" + (ok ? "" : " mal");
      par.innerHTML = '<div class="b15-cuadro">' + hematie(ad) + "<br>Hematíes del donante " + nom(d.g, d.rh) + "</div><div class=\"b15-cuadro\">" + plasma(r.g, r.rh) + "<br>Plasma del receptor " + nom(r.g, r.rh) + "</div>";
      var n = 0; ["A", "B", "AB", "O"].forEach(function (g1) { ["+", "−"].forEach(function (a1) { ["A", "B", "AB", "O"].forEach(function (g2) { ["+", "−"].forEach(function (a2) {
        var x = antigenos(g1, a1), y = antigenos(g2, a2); if (x.every(function (a) { return y.indexOf(a) >= 0; })) n++; }); }); }); });
      dat.innerHTML = "<div><b>Antígenos del donante</b>" + (ad.join(", ") || "ninguno") + "</div><div><b>Antígenos del receptor</b>" + (ar.join(", ") || "ninguno") + "</div>" +
        "<div><b>Atacados por el receptor</b>" + (ataca.join(", ") || "ninguno") + "</div><div><b>Combinaciones compatibles</b>" + n + " de 64</div>";
      if (ok) { ver.className = "bio15-veredicto ok"; ver.textContent = "Compatible: los hematíes del donante no tienen ningún antígeno que el receptor no tenga. No hay aglutinación."; }
      else {
        ver.className = "bio15-veredicto mal";
        var tx = ataca.map(function (a) { return a === "D" ? "anti-D" : "anti-" + a; }).join(" y ");
        ver.textContent = "Incompatible: los hematíes del donante llevan el antígeno " + ataca.join(" y ") + " y el receptor lo reconoce como extraño (" + tx + (ataca.indexOf("D") >= 0 && ataca.length === 1 ? ", que el receptor Rh− forma tras sensibilizarse" : "") + "): aglutinación y hemólisis.";
      }
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
