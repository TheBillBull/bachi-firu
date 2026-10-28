/* ============================================================
   Bachi para Firu · Química II, tema 8: Oxidación-reducción
   Cinco simuladores:
   q8_ajusta (ajuste ion-electrón paso a paso, medio ácido y básico) · q8_escala (potenciales estándar: ¿reacciona?, fem, ΔG°)
   q8_pila (pila galvánica configurable: ánodo, cátodo, puente salino, electrones e iones) · q8_valora (valoraciones redox)
   q8_faraday (electrólisis: masa, tiempo e intensidad; cubas en serie)
   Comparten datos: los potenciales de la escala son los de la pila, y la reacción global sale de sumar semirreacciones.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;
  var F = 96500, RT = 0.0592;                       // F = 96 500 C/mol (el dato de los exámenes); 0,0592 = 2,303·RT/F a 25 °C
  function fil(r, v, c) { return U.lec(r, v, c); }
  function d(x, n) { return (Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n).replace(".", ",").replace("-", "−"); }
  function sg(x, n) { return (x > 0 ? "+" : "") + d(x, n); }
  function cs(x, n) {                                // notación científica con coma: 3,86·10⁻⁴
    if (x === 0 || !isFinite(x)) return d(x, 2);
    var e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e <= 4) return d(x, Math.max(0, (n == null ? 3 : n + 1) - 1 - e));
    return d(x / Math.pow(10, e), n == null ? 2 : n) + "·10" + U.sup(e);
  }
  function mcd(a, b) { return b ? mcd(b, a % b) : a; }
  function mcm(a, b) { return a * b / mcd(a, b); }
  function sel(host, etiqueta, opciones, actual, alElegir) {
    var l = document.createElement("label"); l.className = "bx-campo q8-selector";
    l.innerHTML = '<span class="bx-et">' + etiqueta + '</span><select aria-label="' + etiqueta.replace(/<[^>]+>/g, "") + '">' +
      opciones.map(function (o) { return '<option value="' + o.k + '"' + (o.k === actual ? " selected" : "") + ">" + o.t + "</option>"; }).join("") + "</select>";
    host.appendChild(l);
    var s = l.querySelector("select"); s.addEventListener("change", function () { alElegir(s.value); });
    return { el: l, set: function (k) { s.value = k; } };
  }
  function estilo() {
    if (document.getElementById("q8-css")) return;
    var s = document.createElement("style"); s.id = "q8-css";
    s.textContent =
      ".q8-selector select { font: 500 15px/1.3 var(--body); color: var(--ink); background: var(--sheet); border: 1.5px solid var(--line); border-radius: 8px; padding: 6px 8px; max-width: 100%; }" +
      ".q8-selector { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink-soft); flex-wrap: wrap; }" +
      ".q8-svg { width: 100%; height: auto; display: block; max-width: 560px; margin: 6px auto; }" +
      ".q8-svg text { font: 700 15px var(--body); fill: var(--ink); } .q8-svg text.sm { font-weight: 600; font-size: 14px; fill: var(--ink-soft); }" +
      ".q8-svg text.pen { fill: var(--pen); } .q8-svg text.red { fill: var(--red); } .q8-svg text.ok { fill: var(--ok); }" +
      ".q8-vaso { fill: none; stroke: var(--ink-faint); stroke-width: 3; stroke-linejoin: round; }" +
      ".q8-liq { fill: var(--pen); fill-opacity: .14; } .q8-liq.b { fill: var(--red); fill-opacity: .12; }" +
      ".q8-elec { fill: var(--ink-faint); stroke: var(--ink); stroke-width: 1.5; } .q8-elec.pt { fill: var(--sheet-2); }" +
      ".q8-dep { fill: var(--red); fill-opacity: .55; stroke: var(--red); stroke-width: 1.2; } .q8-fant { fill: none; stroke: var(--ink-faint); stroke-width: 1.5; stroke-dasharray: 4 3; }" +
      ".q8-hilo { fill: none; stroke: var(--ink); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; } .q8-hilo.off { stroke-dasharray: 2 7; stroke: var(--ink-faint); }" +
      ".q8-puente { fill: none; stroke-width: 15; stroke-linejoin: round; stroke: var(--ink-faint); } .q8-puente2 { fill: none; stroke-width: 10; stroke-linejoin: round; stroke: var(--sheet-2); }" +
      ".q8-volt { fill: var(--sheet); stroke: var(--ink); stroke-width: 2.5; }" +
      ".q8-fe { fill: var(--red); } .q8-fa { fill: var(--pen); } .q8-fc { fill: var(--ok); }" +
      ".q8-pasos { margin: 10px 0 0; } .q8-paso { border-left: 4px solid var(--pen); background: var(--sheet-2); border-radius: 4px 10px 10px 4px; padding: 7px 12px; margin: 8px 0; font-size: 15px; line-height: 1.5; }" +
      ".q8-paso b.t { display: block; font: 700 13px var(--body); color: var(--pen); } .q8-paso .mv { font: 500 16px/1.7 var(--math); }" +
      ".q8-paso.fin { border-left-color: var(--ok); } .q8-paso.fin b.t { color: var(--ok); }" +
      ".q8-esc { margin: 8px 0 0; display: grid; gap: 2px; } .q8-fila { display: grid; grid-template-columns: minmax(96px, 1.1fr) 52px minmax(0, 2fr); gap: 6px; align-items: center; font: 600 13px var(--body); padding: 1px 4px; border-radius: 6px; }" +
      ".q8-fila.ox { background: var(--red-soft); } .q8-fila.re { background: var(--ok-soft); }" +
      ".q8-fila .e { text-align: right; color: var(--ink-soft); } .q8-bar { position: relative; height: 10px; } .q8-bar i { position: absolute; top: 1px; height: 8px; border-radius: 3px; background: var(--ink-faint); }" +
      ".q8-bar i.p { background: var(--pen); } .q8-bar i.n { background: var(--red); opacity: .8; } .q8-bar:before { content: ''; position: absolute; left: var(--cero); top: -3px; width: 1.5px; height: 16px; background: var(--ink); }" +
      "@media (max-width: 520px) { .q8-fila { grid-template-columns: minmax(80px, 1.3fr) 44px minmax(0, 1.2fr); font-size: 12px; } }";
    document.head.appendChild(s);
  }

  // ------------------------------------------------------------
  // Pares redox (potenciales estándar de reducción a 25 °C, en V; ox + n e⁻ → red)
  // ------------------------------------------------------------
  var PARES = [
    { k: "li", t: "Li⁺/Li", E: -3.04, n: 1, ox: [[1, "Li⁺"]], red: [[1, "Li"]], el: "metal" },
    { k: "na", t: "Na⁺/Na", E: -2.71, n: 1, ox: [[1, "Na⁺"]], red: [[1, "Na"]], el: "metal" },
    { k: "mg", t: "Mg²⁺/Mg", E: -2.37, n: 2, ox: [[1, "Mg²⁺"]], red: [[1, "Mg"]], el: "metal" },
    { k: "al", t: "Al³⁺/Al", E: -1.66, n: 3, ox: [[1, "Al³⁺"]], red: [[1, "Al"]], el: "metal" },
    { k: "zn", t: "Zn²⁺/Zn", E: -0.76, n: 2, ox: [[1, "Zn²⁺"]], red: [[1, "Zn"]], el: "metal" },
    { k: "fe", t: "Fe²⁺/Fe", E: -0.44, n: 2, ox: [[1, "Fe²⁺"]], red: [[1, "Fe"]], el: "metal" },
    { k: "ni", t: "Ni²⁺/Ni", E: -0.25, n: 2, ox: [[1, "Ni²⁺"]], red: [[1, "Ni"]], el: "metal" },
    { k: "pb", t: "Pb²⁺/Pb", E: -0.13, n: 2, ox: [[1, "Pb²⁺"]], red: [[1, "Pb"]], el: "metal" },
    { k: "h", t: "H⁺/H₂", E: 0.00, n: 2, ox: [[2, "H⁺"]], red: [[1, "H₂"]], el: "gas" },
    { k: "cu", t: "Cu²⁺/Cu", E: 0.34, n: 2, ox: [[1, "Cu²⁺"]], red: [[1, "Cu"]], el: "metal" },
    { k: "i", t: "I₂/I⁻", E: 0.54, n: 2, ox: [[1, "I₂"]], red: [[2, "I⁻"]], el: "inerte" },
    { k: "fe3", t: "Fe³⁺/Fe²⁺", E: 0.77, n: 1, ox: [[1, "Fe³⁺"]], red: [[1, "Fe²⁺"]], el: "inerte" },
    { k: "ag", t: "Ag⁺/Ag", E: 0.80, n: 1, ox: [[1, "Ag⁺"]], red: [[1, "Ag"]], el: "metal" },
    { k: "no3", t: "NO₃⁻/NO", E: 0.96, n: 3, ox: [[1, "NO₃⁻"], [4, "H⁺"]], red: [[1, "NO"], [2, "H₂O"]], el: "inerte" },
    { k: "br", t: "Br₂/Br⁻", E: 1.07, n: 2, ox: [[1, "Br₂"]], red: [[2, "Br⁻"]], el: "inerte" },
    { k: "cr", t: "Cr₂O₇²⁻/Cr³⁺", E: 1.33, n: 6, ox: [[1, "Cr₂O₇²⁻"], [14, "H⁺"]], red: [[2, "Cr³⁺"], [7, "H₂O"]], el: "inerte" },
    { k: "cl", t: "Cl₂/Cl⁻", E: 1.36, n: 2, ox: [[1, "Cl₂"]], red: [[2, "Cl⁻"]], el: "inerte" },
    { k: "mn", t: "MnO₄⁻/Mn²⁺", E: 1.51, n: 5, ox: [[1, "MnO₄⁻"], [8, "H⁺"]], red: [[1, "Mn²⁺"], [4, "H₂O"]], el: "inerte" },
    { k: "f", t: "F₂/F⁻", E: 2.87, n: 2, ox: [[1, "F₂"]], red: [[2, "F⁻"]], el: "inerte" }
  ];
  var PORK = {}; PARES.forEach(function (p) { PORK[p.k] = p; });
  var PILA_K = ["mg", "al", "zn", "fe", "ni", "pb", "h", "cu", "ag", "fe3"];

  // Suma de semirreacciones: c = el par que se reduce, a = el par que se oxida. Devuelve la reacción global ajustada.
  function combina(c, a) {
    var L = mcm(c.n, a.n), mc = L / c.n, ma = L / a.n, izq = {}, der = {}, orden = [];
    function add(m, lista, mult) { lista.forEach(function (p) { m[p[1]] = (m[p[1]] || 0) + p[0] * mult; if (orden.indexOf(p[1]) < 0) orden.push(p[1]); }); }
    if (a.el === "metal") { add(izq, a.red, ma); add(der, a.ox, ma); add(izq, c.ox, mc); add(der, c.red, mc); }   // metal que se oxida primero: Zn + Cu²⁺ ⟶ Zn²⁺ + Cu
    else { add(izq, c.ox, mc); add(der, c.red, mc); add(izq, a.red, ma); add(der, a.ox, ma); }
    Object.keys(izq).forEach(function (k) { if (der[k]) { var m = Math.min(izq[k], der[k]); izq[k] -= m; der[k] -= m; } });
    var g = 0; [izq, der].forEach(function (m) { Object.keys(m).forEach(function (k) { if (m[k]) g = mcd(g, m[k]); }); });
    g = g || 1;
    function lado(m) {
      var ks = orden.filter(function (k) { return m[k] > 0; });
      ["H⁺", "OH⁻", "H₂O"].forEach(function (x) { var i = ks.indexOf(x); if (i >= 0) { ks.splice(i, 1); ks.push(x); } });
      return ks.map(function (k) { var c = m[k] / g; return (c === 1 ? "" : c + " ") + k; }).join(" + ");
    }
    var ci = {}, cd = {}; Object.keys(izq).forEach(function (k) { if (izq[k]) ci[k] = izq[k] / g; }); Object.keys(der).forEach(function (k) { if (der[k]) cd[k] = der[k] / g; });
    return { L: L, mc: mc, ma: ma, texto: lado(izq) + " ⟶ " + lado(der), izq: ci, der: cd, ne: L / g };
  }
  function semi(p, sentido) {                        // texto de una semirreacción: "red" (reducción) u "oxi" (oxidación)
    function lado(l) { return l.map(function (x) { return (x[0] === 1 ? "" : x[0] + " ") + x[1]; }).join(" + "); }
    return sentido === "red" ? lado(p.ox) + " + " + p.n + " e⁻ ⟶ " + lado(p.red) : lado(p.red) + " ⟶ " + lado(p.ox) + " + " + p.n + " e⁻";
  }

  // ============================================================
  // Q8_ESCALA: potenciales estándar y predicción
  // ============================================================
  var RAPIDOS = [
    { k: "a", t: "Zn en HCl", c: "h", a: "zn" }, { k: "b", t: "Cu en HCl", c: "h", a: "cu" }, { k: "c", t: "Fe desplaza Cu²⁺", c: "cu", a: "fe" },
    { k: "d", t: "Cu desplaza Zn²⁺", c: "zn", a: "cu" }, { k: "e", t: "Cu en HNO₃", c: "no3", a: "cu" }, { k: "f", t: "Cl₂ con Br⁻", c: "cl", a: "br" },
    { k: "g", t: "I₂ con Br⁻", c: "i", a: "br" }
  ];
  B.w.q8_escala = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "La escala de potenciales: ¿reacciona o no?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q8-esc" data-esc></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { c: "cu", a: "zn" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), esc = cuerpo.querySelector("[data-esc]"),
      lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sc, sa;
    var op = PARES.map(function (p) { return { k: p.k, t: p.t }; });
    sc = sel(ctl, "Se reduce (oxidante):", op, st.c, function (k) { st.c = k; pinta(); });
    sa = sel(ctl, "Se oxida (reductor, forma reducida de):", op, st.a, function (k) { st.a = k; pinta(); });
    function pinta() {
      var c = PORK[st.c], a = PORK[st.a], E = c.E - a.E, ok = E > 0;
      // filas de la escala, de más oxidante (arriba) a menos
      var cero = 3.2 / 6.1 * 100;
      var filas = PARES.slice().sort(function (x, y) { return y.E - x.E; }).map(function (p) {
        var cls = p.k === st.c ? " ox" : (p.k === st.a ? " re" : ""), w = Math.abs(p.E) / 6.1 * 100;
        var barra = p.E >= 0 ? '<i class="p" style="left:' + cero + '%;width:' + w + '%"></i>' : '<i class="n" style="left:' + (cero - w) + '%;width:' + w + '%"></i>';
        return '<div class="q8-fila' + cls + '"><span>' + p.t + '</span><span class="e">' + sg(p.E, 2) + ' V</span><span class="q8-bar" style="--cero:' + cero + '%">' + barra + "</span></div>";
      });
      esc.innerHTML = filas.join("");
      if (c.k === a.k) {
        lectura.innerHTML = fil("Resultado", "elige dos pares distintos", "ancho");
        pie.innerHTML = "Arriba: los oxidantes más fuertes (potencial alto). Abajo: los reductores más fuertes (potencial muy negativo)."; return;
      }
      var r = combina(c, a), n = r.L, G0 = -n * F * E / 1000, logK = n * E / RT;
      var rev = combina(a, c);
      lectura.innerHTML = fil("E° de la pila = E°(cátodo) − E°(ánodo)", sg(c.E, 2) + " − (" + sg(a.E, 2) + ") = " + sg(E, 2) + " V", ok ? "ok" : "red") +
        fil("¿Espontánea?", ok ? "sí: E° > 0" : "no: E° < 0 (sería espontánea la inversa)", ok ? "ok" : "red") +
        fil("Reacción global" + (ok ? "" : " (inversa, la espontánea)"), ok ? r.texto : rev.texto, "ancho") +
        fil("n (electrones)", String(n), "") + fil("ΔG° = −n·F·E°", sg(G0, 0) + " kJ", ok ? "ok" : "red") + fil("log K = n·E°/0,0592", d(logK, 1), "");
      pie.innerHTML = "<b>Regla rápida:</b> reacciona el oxidante <span style='color:var(--red)'>(fila roja)</span> con el reductor <span style='color:var(--ok)'>(fila verde)</span> si la fila roja está <b>más arriba</b> que la verde. " +
        "Aquí: " + c.t + " (" + sg(c.E, 2) + " V) " + (ok ? "está por encima de " : "está por debajo de ") + a.t + " (" + sg(a.E, 2) + " V).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), RAPIDOS.map(function (r) { return { k: r.k, t: r.t }; }), "", function (k) {
      var r = RAPIDOS.filter(function (x) { return x.k === k; })[0]; st.c = r.c; st.a = r.a; sc.set(r.c); sa.set(r.a); pinta();
    });
    pinta();
  };

  // ============================================================
  // Q8_PILA: pila galvánica configurable
  // ============================================================
  function ionSol(p) { return p.el === "metal" ? p.ox[0][1] + " 1 M" : (p.el === "gas" ? "H⁺ 1 M" : p.red[0][1] + ", " + p.ox[0][1] + " 1 M"); }
  function notAnodo(p) {
    if (p.el === "metal") return p.red[0][1] + "(s) | " + p.ox[0][1] + "(1 M)";
    if (p.el === "gas") return "Pt | H₂(1 atm) | H⁺(1 M)";
    return "Pt | Fe²⁺(1 M), Fe³⁺(1 M)";
  }
  function notCatodo(p) {
    if (p.el === "metal") return p.ox[0][1] + "(1 M) | " + p.red[0][1] + "(s)";
    if (p.el === "gas") return "H⁺(1 M) | H₂(1 atm) | Pt";
    return "Fe³⁺(1 M), Fe²⁺(1 M) | Pt";
  }
  B.w.q8_pila = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Monta tu pila: ánodo, cátodo, electrones e iones");
    cuerpo.innerHTML = '<div data-ctl></div><div data-chips class="chips"></div><svg class="q8-svg" viewBox="0 0 520 335" role="img" aria-label="Esquema de una pila galvánica"></svg><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { x: "zn", y: "cu", puente: true }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), svg = cuerpo.querySelector("svg"),
      lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var op = PILA_K.map(function (k) { return { k: k, t: PORK[k].t }; });
    sel(ctl, "Semicelda 1:", op, st.x, function (k) { st.x = k; pinta(); });
    sel(ctl, "Semicelda 2:", op, st.y, function (k) { st.y = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-chips]"), [{ k: "1", t: "Con puente salino" }, { k: "0", t: "Sin puente salino" }], "1", function (k) { st.puente = k === "1"; pinta(); });
    function flecha(x, y, dir, cls) { var s = 7 * dir; return '<polygon class="' + cls + '" points="' + (x + s) + "," + y + " " + (x - s) + "," + (y - 6) + " " + (x - s) + "," + (y + 6) + '"/>'; }
    function pinta() {
      var p1 = PORK[st.x], p2 = PORK[st.y];
      if (p1.k === p2.k) { svg.innerHTML = '<text x="260" y="170" text-anchor="middle">Elige dos semiceldas distintas</text>'; lectura.innerHTML = fil("fem", "0 V: sin diferencia de potencial", "ancho"); pie.innerHTML = ""; return; }
      var c = p1.E > p2.E ? p1 : p2, a = c === p1 ? p2 : p1, E = c.E - a.E, on = st.puente;
      var r = combina(c, a), s = "";
      // vasos y líquidos
      s += '<rect class="q8-liq b" x="32" y="175" width="176" height="108"/><rect class="q8-liq" x="312" y="175" width="176" height="108"/>';
      s += '<path class="q8-vaso" d="M30 150 V285 H210 V150"/><path class="q8-vaso" d="M310 150 V285 H490 V150"/>';
      // electrodos
      function elect(cx, p, esAnodo) {
        var h = "";
        if (p.el === "metal") {
          if (esAnodo) h += '<rect class="q8-fant" x="' + (cx - 10) + '" y="95" width="20" height="160"/><rect class="q8-elec" x="' + (cx - 6) + '" y="95" width="12" height="160"/>';
          else h += '<rect class="q8-elec" x="' + (cx - 10) + '" y="95" width="20" height="160"/><rect class="q8-dep" x="' + (cx - 15) + '" y="178" width="30" height="77"/>';
        } else h += '<rect class="q8-elec pt" x="' + (cx - 10) + '" y="95" width="20" height="160"/>';
        if (p.el === "gas") for (var i = 0; i < 4; i++) h += '<circle class="q8-fant" cx="' + (cx + (esAnodo ? -22 : 22) + (i % 2) * 6) + '" cy="' + (225 - i * 17) + '" r="4"/>';
        return h;
      }
      s += elect(120, a, true) + elect(400, c, false);
      s += '<text class="sm" x="138" y="118">' + (a.el === "metal" ? a.red[0][1] : "Pt") + '</text><text class="sm" x="418" y="118">' + (c.el === "metal" ? c.red[0][1] : "Pt") + "</text>";
      // cable y voltímetro
      s += '<path class="q8-hilo" d="M120 95 V45 H232 M288 45 H400 V95"/><circle class="q8-volt" cx="260" cy="45" r="28"/>';
      s += '<text x="260" y="44" text-anchor="middle" style="font-size:16px">' + (on ? d(E, 2) : "0,00") + '</text><text class="sm" x="260" y="60" text-anchor="middle" style="font-size:12px">voltios</text>';
      if (on) {
        s += flecha(180, 45, 1, "q8-fe") + flecha(345, 45, 1, "q8-fe") + '<text class="red" x="180" y="32" text-anchor="middle">e⁻</text><text class="red" x="345" y="32" text-anchor="middle">e⁻</text>';
      }
      // puente salino
      if (on) {
        s += '<path class="q8-puente" d="M165 218 V130 H355 V218"/><path class="q8-puente2" d="M165 218 V130 H355 V218"/>';
        s += '<text class="pen" x="168" y="118">⟵ aniones</text><text class="ok" x="354" y="118" text-anchor="end">cationes ⟶</text>';
      } else {
        s += '<path class="q8-puente" style="stroke-dasharray:3 8;opacity:.5" d="M165 218 V130 H355 V218"/><text class="red" x="260" y="118" text-anchor="middle">puente retirado: circuito abierto</text>';
      }
      // rótulos
      s += '<text class="red" x="120" y="304" text-anchor="middle">ÁNODO (−)</text><text class="ok" x="400" y="304" text-anchor="middle">CÁTODO (+)</text>';
      s += '<text class="sm" x="120" y="322" text-anchor="middle">' + ("oxidación · " + (a.el === "metal" ? "se disuelve" : (a.el === "gas" ? "se consume H₂" : "Pt inerte"))) + '</text><text class="sm" x="400" y="322" text-anchor="middle">' +
        ("reducción · " + (c.el === "metal" ? "se deposita" : (c.el === "gas" ? "burbujea H₂" : "Pt inerte"))) + "</text>";
      s += '<text class="sm" x="68" y="274" text-anchor="middle">' + ionSol(a).split(" 1 M")[0].split(", ")[0] + '</text><text class="sm" x="445" y="274" text-anchor="middle">' + ionSol(c).split(" 1 M")[0].split(", ")[0] + "</text>";
      svg.innerHTML = s;
      var G = -r.L * F * E / 1000;
      lectura.innerHTML = fil("Ánodo (−): oxidación", semi(a, "oxi"), "red") + fil("Cátodo (+): reducción", semi(c, "red"), "ok") +
        fil("Reacción global", r.texto, "ancho") + fil("Notación de la pila", notAnodo(a) + " ‖ " + notCatodo(c), "ancho") +
        fil("fem = E°cátodo − E°ánodo", sg(c.E, 2) + " − (" + sg(a.E, 2) + ") = " + d(E, 2) + " V", "pen") + fil("ΔG° = −n·F·E°", sg(G, 0) + " kJ/mol (n = " + r.L + ")", "pen") +
        fil("Electrones", "del " + (a.el === "metal" ? a.red[0][1] : "Pt (ánodo)") + " al " + (c.el === "metal" ? c.red[0][1] : "Pt (cátodo)") + " por el cable", "ancho") +
        fil("Estado", on ? "funciona: circula corriente" : "no circula corriente: sin puente se acumula carga en cada vaso y la reacción se detiene", on ? "ok" : "red");
      pie.innerHTML = "El ánodo es el polo <b>negativo</b> (ahí se liberan los electrones); el cátodo, el <b>positivo</b>. El puente salino cierra el circuito: los <b>aniones van hacia el ánodo</b> y los <b>cationes hacia el cátodo</b>. " +
        "El de potencial mayor siempre es el cátodo, aunque lo pongas en la semicelda 1.";
    }
    pinta();
  };

  // ============================================================
  // Q8_AJUSTA: ion-electrón paso a paso
  // ============================================================
  function S(f, el, nEl, O, H, q, nox) { return { f: f, el: el, nEl: nEl, O: O, H: H, q: q, nox: nox }; }
  var SP = {
    mno4: S("MnO₄⁻", "Mn", 1, 4, 0, -1, 7), mn2: S("Mn²⁺", "Mn", 1, 0, 0, 2, 2), mno2: S("MnO₂", "Mn", 1, 2, 0, 0, 4),
    fe2: S("Fe²⁺", "Fe", 1, 0, 0, 2, 2), fe3: S("Fe³⁺", "Fe", 1, 0, 0, 3, 3),
    cr2o7: S("Cr₂O₇²⁻", "Cr", 2, 7, 0, -2, 6), cr3: S("Cr³⁺", "Cr", 1, 0, 0, 3, 3),
    c2o4: S("C₂O₄²⁻", "C", 2, 4, 0, -2, 3), co2: S("CO₂", "C", 1, 2, 0, 0, 4),
    h2o2: S("H₂O₂", "O", 2, 2, 2, 0, -1), o2: S("O₂", "O", 2, 2, 0, 0, 0),
    cu: S("Cu", "Cu", 1, 0, 0, 0, 0), cu2: S("Cu²⁺", "Cu", 1, 0, 0, 2, 2), no3: S("NO₃⁻", "N", 1, 3, 0, -1, 5), no: S("NO", "N", 1, 1, 0, 0, 2),
    cl: S("Cl⁻", "Cl", 1, 0, 0, -1, -1), cl2: S("Cl₂", "Cl", 2, 0, 0, 0, 0), clo: S("ClO⁻", "Cl", 1, 1, 0, -1, 1),
    i: S("I⁻", "I", 1, 0, 0, -1, -1), i2: S("I₂", "I", 2, 0, 0, 0, 0)
  };
  // cada semirreacción: izq → der con los coeficientes del átomo principal (ca, cb)
  function H1(a, b, ca, cb) { return { izq: SP[a], der: SP[b], ca: ca, cb: cb }; }
  var REACCIONES = [
    { k: "mnfe", t: "MnO₄⁻ + Fe²⁺", medio: "ácido", red: H1("mno4", "mn2", 1, 1), oxi: H1("fe2", "fe3", 1, 1), nota: "la valoración clásica con permanganato" },
    { k: "crfe", t: "Cr₂O₇²⁻ + Fe²⁺", medio: "ácido", red: H1("cr2o7", "cr3", 1, 2), oxi: H1("fe2", "fe3", 1, 1), nota: "dicromato: cada Cr gana 3 e⁻ y hay dos Cr" },
    { k: "mnox", t: "MnO₄⁻ + C₂O₄²⁻", medio: "ácido", red: H1("mno4", "mn2", 1, 1), oxi: H1("c2o4", "co2", 1, 2), nota: "oxalato: se oxida a CO₂ y suelta 2 e⁻" },
    { k: "mnh2o2", t: "MnO₄⁻ + H₂O₂", medio: "ácido", red: H1("mno4", "mn2", 1, 1), oxi: H1("h2o2", "o2", 1, 1), nota: "el agua oxigenada hace de reductor (O: −1 → 0)" },
    { k: "cuno3", t: "Cu + NO₃⁻", medio: "ácido", red: H1("no3", "no", 1, 1), oxi: H1("cu", "cu2", 1, 1), nota: "el cobre se disuelve en HNO₃ (no en HCl)" },
    { k: "mncl", t: "MnO₄⁻ + Cl⁻", medio: "ácido", red: H1("mno4", "mn2", 1, 1), oxi: H1("cl", "cl2", 2, 1), nota: "dos Cl⁻ forman una molécula de Cl₂" },
    { k: "cri", t: "Cr₂O₇²⁻ + I⁻", medio: "ácido", red: H1("cr2o7", "cr3", 1, 2), oxi: H1("i", "i2", 2, 1), nota: "dos I⁻ forman una molécula de I₂" },
    { k: "mno2cl", t: "MnO₂ + Cl⁻", medio: "ácido", red: H1("mno2", "mn2", 1, 1), oxi: H1("cl", "cl2", 2, 1), nota: "así se prepara cloro en el laboratorio" },
    { k: "mni", t: "MnO₄⁻ + I⁻", medio: "básico", red: H1("mno4", "mno2", 1, 1), oxi: H1("i", "i2", 2, 1), nota: "en medio básico el Mn solo llega a MnO₂" },
    { k: "cl2", t: "Cl₂ + OH⁻ (dismutación)", medio: "básico", red: H1("cl2", "cl", 1, 2), oxi: H1("cl2", "clo", 1, 2), nota: "el mismo Cl₂ se reduce y se oxida a la vez" }
  ];
  function nox(n) { return (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n); }
  // ajusta una semirreacción: devuelve las etapas (cada una con los extras de cada lado) y el estado final
  function ajustaMedia(h, medio) {
    var L = { H2O: 0, Hp: 0, OH: 0, e: 0 }, R = { H2O: 0, Hp: 0, OH: 0, e: 0 }, et = [];
    function copia() { return { L: JSON.parse(JSON.stringify(L)), R: JSON.parse(JSON.stringify(R)) }; }
    et.push(copia());
    var OL = h.ca * h.izq.O, OR = h.cb * h.der.O, HL = h.ca * h.izq.H, HR = h.cb * h.der.H, QL = h.ca * h.izq.q, QR = h.cb * h.der.q;
    if (OL > OR) R.H2O += OL - OR; else L.H2O += OR - OL;
    et.push(copia());
    HL += 2 * L.H2O; HR += 2 * R.H2O;
    if (HL > HR) R.Hp += HL - HR; else L.Hp += HR - HL;
    et.push(copia());
    QL += L.Hp; QR += R.Hp;
    if (QL > QR) L.e += QL - QR; else R.e += QR - QL;
    et.push(copia());
    if (medio === "básico") {
      L.OH += R.Hp; R.OH += L.Hp; L.H2O += L.Hp; R.H2O += R.Hp; L.Hp = 0; R.Hp = 0;
      var m = Math.min(L.H2O, R.H2O); L.H2O -= m; R.H2O -= m;
      et.push(copia());
    }
    return { et: et, ne: L.e + R.e, L: L, R: R };
  }
  function ladoTxt(sp, c, ex) {
    var t = [];
    function term(n, f) { return (n === 1 ? "" : n + " ") + f; }
    if (c) t.push(term(c, sp.f));
    if (ex.H2O) t.push(term(ex.H2O, "H₂O")); if (ex.Hp) t.push(term(ex.Hp, "H⁺")); if (ex.OH) t.push(term(ex.OH, "OH⁻")); if (ex.e) t.push(term(ex.e, "e⁻"));
    return t.join(" + ");
  }
  function rxTxt(h, ex) { return ladoTxt(h.izq, h.ca, ex.L) + " ⟶ " + ladoTxt(h.der, h.cb, ex.R); }
  // suma de dos semirreacciones ya ajustadas, con multiplicadores
  function sumaTotal(R, ar, ao, m1, m2) {
    var izq = {}, der = {}, ord = [];
    function add(m, k, v) { if (!v) return; m[k] = (m[k] || 0) + v; if (ord.indexOf(k) < 0) ord.push(k); }
    function aporta(h, a, mu) {
      add(izq, h.izq.f, h.ca * mu); add(der, h.der.f, h.cb * mu);
      add(izq, "H₂O", a.L.H2O * mu); add(der, "H₂O", a.R.H2O * mu); add(izq, "H⁺", a.L.Hp * mu); add(der, "H⁺", a.R.Hp * mu);
      add(izq, "OH⁻", a.L.OH * mu); add(der, "OH⁻", a.R.OH * mu);
    }
    aporta(R.red, ar, m1); aporta(R.oxi, ao, m2);
    Object.keys(izq).forEach(function (k) { if (der[k]) { var m = Math.min(izq[k], der[k]); izq[k] -= m; der[k] -= m; } });
    var g = 0; [izq, der].forEach(function (m) { Object.keys(m).forEach(function (k) { if (m[k]) g = mcd(g, m[k]); }); }); g = g || 1;
    function lado(m) {
      var ks = ord.filter(function (k) { return m[k] > 0; });
      ["H⁺", "OH⁻", "H₂O"].forEach(function (x) { var i = ks.indexOf(x); if (i >= 0) { ks.splice(i, 1); ks.push(x); } });
      return ks.map(function (k) { var c = m[k] / g; return (c === 1 ? "" : c + " ") + k; }).join(" + ");
    }
    var ci = {}, cd = {}; Object.keys(izq).forEach(function (k) { if (izq[k]) ci[k] = izq[k] / g; }); Object.keys(der).forEach(function (k) { if (der[k]) cd[k] = der[k] / g; });
    return { texto: lado(izq) + " ⟶ " + lado(der), izq: ci, der: cd, g: g };
  }
  function resuelve(R) {
    var ar = ajustaMedia(R.red, R.medio), ao = ajustaMedia(R.oxi, R.medio), L = mcm(ar.ne, ao.ne), m1 = L / ar.ne, m2 = L / ao.ne;
    return { ar: ar, ao: ao, L: L, m1: m1, m2: m2, tot: sumaTotal(R, ar.et[ar.et.length - 1], ao.et[ao.et.length - 1], m1, m2) };
  }
  B.w.q8_ajusta = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Ajustador ion-electrón, paso a paso");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q8-pasos"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "mnfe", n: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), pasos = cuerpo.querySelector(".q8-pasos"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var bSig = U.boton(ctl, "Siguiente paso ▶", function () { st.n++; pinta(); }), bTodo = U.boton(ctl, "Ver todos los pasos", function () { st.n = 99; pinta(); }), bRei = U.boton(ctl, "↺ Reiniciar", function () { st.n = 1; pinta(); });
    function R() { return REACCIONES.filter(function (r) { return r.k === st.k; })[0]; }
    function pinta() {
      var r = R(), z = resuelve(r), base = r.medio === "básico", p = [], red = r.red, oxi = r.oxi;
      var etR = z.ar.et, etO = z.ao.et, fR = etR[etR.length - 1], fO = etO[etO.length - 1];
      function par(t, cuerpoHtml, cls) { p.push('<div class="q8-paso' + (cls ? " " + cls : "") + '"><b class="t">' + t + '</b><span class="mv q3f">' + cuerpoHtml + "</span></div>"); }
      par("1. Números de oxidación: ¿quién cambia?",
        red.izq.el + ": " + nox(red.izq.nox) + " ⟶ " + nox(red.der.nox) + " (baja " + (red.izq.nox - red.der.nox) + " por átomo): <b>" + red.izq.f + " se reduce</b>, es el oxidante.<br>" +
        oxi.izq.el + ": " + nox(oxi.izq.nox) + " ⟶ " + nox(oxi.der.nox) + " (sube " + (oxi.der.nox - oxi.izq.nox) + " por átomo): <b>" + oxi.izq.f + " se oxida</b>, es el reductor. Medio <b>" + r.medio + "</b>.");
      par("2. Escribe las dos semirreacciones y ajusta el átomo que cambia",
        "Reducción: " + rxTxt(red, etR[0]) + "<br>Oxidación: " + rxTxt(oxi, etO[0]));
      par("3. Ajusta el oxígeno con H₂O", "Reducción: " + rxTxt(red, etR[1]) + "<br>Oxidación: " + rxTxt(oxi, etO[1]));
      par("4. Ajusta el hidrógeno con H⁺", "Reducción: " + rxTxt(red, etR[2]) + "<br>Oxidación: " + rxTxt(oxi, etO[2]));
      par("5. Ajusta la carga con electrones", "Reducción: " + rxTxt(red, etR[3]) + "  (" + z.ar.ne + " e⁻)<br>Oxidación: " + rxTxt(oxi, etO[3]) + "  (" + z.ao.ne + " e⁻)");
      if (base) par("6. Medio básico: convierte los H⁺ en agua con OH⁻",
        "Sumo a los dos lados tantos OH⁻ como H⁺ haya (H⁺ + OH⁻ ⟶ H₂O) y simplifico el agua repetida.<br>Reducción: " + rxTxt(red, fR) + "<br>Oxidación: " + rxTxt(oxi, fO));
      var k = base ? 7 : 6;
      par(k + ". Iguala los electrones ganados y perdidos", "Reducción ×" + z.m1 + "  (" + z.ar.ne + "·" + z.m1 + " = " + z.L + " e⁻)<br>Oxidación ×" + z.m2 + "  (" + z.ao.ne + "·" + z.m2 + " = " + z.L + " e⁻)");
      par((k + 1) + ". Suma, cancela los e⁻ y simplifica", "<b>" + z.tot.texto + "</b>");
      // comprobación
      par((k + 2) + ". Comprueba átomos y carga", "Se conserva cada elemento y la carga neta es la misma a ambos lados: " + cargaTot(z.tot, "izq") + " = " + cargaTot(z.tot, "der") + ".", "fin");
      var total = p.length, mostrar = Math.min(st.n, total);
      pasos.innerHTML = p.slice(0, mostrar).join("");
      bSig.disabled = bTodo.disabled = mostrar >= total;
      lectura.innerHTML = mostrar >= total ? fil("Ecuación iónica ajustada", z.tot.texto, "ancho ok") + fil("Electrones que se intercambian", String(z.L / z.tot.g), "") : fil("Paso", mostrar + " de " + total, "");
      pie.innerHTML = r.t + " · medio " + r.medio + ": " + r.nota + ". Pulsa «Siguiente paso» para ir viendo cada etapa.";
    }
    function cargaTot(tot, lado) {
      var q = { "Mn²⁺": 2, "Fe³⁺": 3, "Fe²⁺": 2, "MnO₄⁻": -1, "Cr₂O₇²⁻": -2, "Cr³⁺": 3, "C₂O₄²⁻": -2, "Cu²⁺": 2, "NO₃⁻": -1, "Cl⁻": -1, "I⁻": -1, "ClO⁻": -1, "H⁺": 1, "OH⁻": -1 }, s = 0;
      Object.keys(tot[lado]).forEach(function (k) { s += (q[k] || 0) * tot[lado][k]; });
      return (s > 0 ? "+" : s < 0 ? "−" : "") + Math.abs(s);
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), REACCIONES.map(function (r) { return { k: r.k, t: r.t }; }), st.k, function (k) { st.k = k; st.n = 1; pinta(); });
    pinta();
  };

  // ============================================================
  // Q8_VALORA: valoraciones redox
  // ============================================================
  var VALORA = {
    mnfe: { t: "MnO₄⁻ con Fe²⁺", tit: "MnO₄⁻", ne_t: 5, an: "Fe²⁺", ne_a: 1, M: 55.85, ec: "MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ ⟶ Mn²⁺ + 5 Fe³⁺ + 4 H₂O", fin: "el primer exceso de MnO₄⁻ deja la disolución rosa-violeta" },
    mnox: { t: "MnO₄⁻ con C₂O₄²⁻", tit: "MnO₄⁻", ne_t: 5, an: "C₂O₄²⁻", ne_a: 2, M: 88.02, ec: "2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺ ⟶ 2 Mn²⁺ + 10 CO₂ + 8 H₂O", fin: "rosa persistente (el Mn²⁺ formado actúa de catalizador)" },
    mnh2o2: { t: "MnO₄⁻ con H₂O₂", tit: "MnO₄⁻", ne_t: 5, an: "H₂O₂", ne_a: 2, M: 34.01, ec: "2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ ⟶ 2 Mn²⁺ + 5 O₂ + 8 H₂O", fin: "rosa persistente: el agua oxigenada se desprende como O₂" },
    crfe: { t: "Cr₂O₇²⁻ con Fe²⁺", tit: "Cr₂O₇²⁻", ne_t: 6, an: "Fe²⁺", ne_a: 1, M: 55.85, ec: "Cr₂O₇²⁻ + 6 Fe²⁺ + 14 H⁺ ⟶ 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O", fin: "el dicromato no es autoindicador: se usa un indicador redox (difenilamina)" }
  };
  B.w.q8_valora = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Valoración redox: de los mL gastados a la concentración");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q8-pasos"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "mnfe", c: 0.02, v: 18.4, va: 20 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), pasos = cuerpo.querySelector(".q8-pasos"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Concentración del valorante", min: 0.01, max: 0.1, step: 0.005, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return d(v, 3) + " mol/L"; } });
    U.slider(ctl, { et: "Volumen gastado", min: 5, max: 40, step: 0.1, val: st.v, on: function (v) { st.v = v; pinta(); }, fmt: function (v) { return d(v, 1) + " mL"; } });
    U.slider(ctl, { et: "Muestra valorada", min: 5, max: 50, step: 1, val: st.va, on: function (v) { st.va = v; pinta(); }, fmt: function (v) { return d(v, 0) + " mL"; } });
    function pinta() {
      var V = VALORA[st.k], nt = st.c * st.v, ne = nt * V.ne_t, na = ne / V.ne_a, ca = na / st.va, razon = V.ne_t / V.ne_a;
      pasos.innerHTML =
        '<div class="q8-paso"><b class="t">1. Reacción ajustada</b><span class="mv q3f">' + V.ec + "</span></div>" +
        '<div class="q8-paso"><b class="t">2. Moles de valorante (n = C·V)</b><span class="mv q3f">' + d(st.c, 3) + " mol/L · " + d(st.v, 1) + " mL = <b>" + d(nt, 3) + " mmol de " + V.tit + "</b></span></div>" +
        '<div class="q8-paso"><b class="t">3. Electrones (cada ' + V.tit + " gana " + V.ne_t + " e⁻)</b><span class=\"mv q3f\">" + d(nt, 3) + " · " + V.ne_t + " = <b>" + d(ne, 3) + " mmol de e⁻</b></span></div>" +
        '<div class="q8-paso"><b class="t">4. Moles de ' + V.an + " (cada uno cede " + V.ne_a + " e⁻)</b><span class=\"mv q3f\">" + d(ne, 3) + " / " + V.ne_a + " = <b>" + d(na, 3) + " mmol de " + V.an + "</b>  (razón " + d(razon, 2) + " : 1)</span></div>" +
        '<div class="q8-paso fin"><b class="t">5. Concentración de la muestra</b><span class="mv q3f">' + d(na, 3) + " mmol / " + d(st.va, 0) + " mL = <b>" + d(ca, 4) + " mol/L</b> de " + V.an + "</span></div>";
      lectura.innerHTML = fil("[" + V.an + "]", d(ca, 4) + " mol/L", "ok") + fil("Concentración en masa", d(ca * V.M, 2) + " g/L", "ok") + fil("Razón de moles", d(razon, 2) + " " + V.an + " por " + V.tit, "") +
        fil("Punto final", V.fin, "ancho");
      pie.innerHTML = "Punto de equivalencia: moles de e⁻ cedidos = moles de e⁻ ganados. Con los coeficientes de la ecuación ajustada llegas al mismo resultado (razón " + d(razon, 2) + " : 1).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(VALORA).map(function (k) { return { k: k, t: VALORA[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q8_FARADAY: electrólisis, masa, tiempo e intensidad; cubas en serie
  // ============================================================
  var SUST = [
    { k: "cu", t: "Cu (de Cu²⁺)", sem: "Cu²⁺ + 2 e⁻ ⟶ Cu", M: 63.5, n: 2, gas: false },
    { k: "ag", t: "Ag (de Ag⁺)", sem: "Ag⁺ + e⁻ ⟶ Ag", M: 107.9, n: 1, gas: false },
    { k: "al", t: "Al (de Al³⁺)", sem: "Al³⁺ + 3 e⁻ ⟶ Al", M: 27.0, n: 3, gas: false },
    { k: "zn", t: "Zn (de Zn²⁺)", sem: "Zn²⁺ + 2 e⁻ ⟶ Zn", M: 65.4, n: 2, gas: false },
    { k: "ni", t: "Ni (de Ni²⁺)", sem: "Ni²⁺ + 2 e⁻ ⟶ Ni", M: 58.7, n: 2, gas: false },
    { k: "au", t: "Au (de Au³⁺)", sem: "Au³⁺ + 3 e⁻ ⟶ Au", M: 197.0, n: 3, gas: false },
    { k: "na", t: "Na (de NaCl fundido)", sem: "Na⁺ + e⁻ ⟶ Na", M: 23.0, n: 1, gas: false },
    { k: "cl2", t: "Cl₂ (ánodo, de Cl⁻)", sem: "2 Cl⁻ ⟶ Cl₂ + 2 e⁻", M: 71.0, n: 2, gas: true },
    { k: "h2", t: "H₂ (cátodo, de H⁺)", sem: "2 H⁺ + 2 e⁻ ⟶ H₂", M: 2.0, n: 2, gas: true },
    { k: "o2", t: "O₂ (ánodo, del agua)", sem: "2 H₂O ⟶ O₂ + 4 H⁺ + 4 e⁻", M: 32.0, n: 4, gas: true }
  ];
  var SK = {}; SUST.forEach(function (s) { SK[s.k] = s; });
  B.w.q8_faraday = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora de Faraday: masa, tiempo o intensidad");
    cuerpo.innerHTML = '<div data-inc class="chips"></div><div data-ser class="chips"></div><div data-ctl></div><div class="q8-pasos"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { inc: "m", s1: "cu", s2: "ag", serie: false, I: 2, tm: 60, m: 1.5 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), pasos = cuerpo.querySelector(".q8-pasos"),
      lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sI, sT, sM, sc2;
    var op = SUST.map(function (s) { return { k: s.k, t: s.t }; });
    sel(ctl, "Se produce:", op, st.s1, function (k) { st.s1 = k; pinta(); });
    sI = U.slider(ctl, { et: "Intensidad", min: 0.1, max: 10, step: 0.1, val: st.I, on: function (v) { st.I = v; pinta(); }, fmt: function (v) { return d(v, 1) + " A"; } });
    sT = U.slider(ctl, { et: "Tiempo", min: 1, max: 240, step: 1, val: st.tm, on: function (v) { st.tm = v; pinta(); }, fmt: function (v) { return d(v, 0) + " min"; } });
    sM = U.slider(ctl, { et: "Masa", min: 0.1, max: 30, step: 0.1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return d(v, 1) + " g"; } });
    sc2 = sel(ctl, "Segunda cuba en serie:", op, st.s2, function (k) { st.s2 = k; pinta(); });
    function pinta() {
      var s = SK[st.s1], t = st.tm * 60, m, I, T, pasosH = "", q;
      sI.el.style.display = st.inc === "i" ? "none" : ""; sT.el.style.display = st.inc === "t" ? "none" : ""; sM.el.style.display = st.inc === "m" ? "none" : "";
      sc2.el.style.display = st.serie ? "" : "none";
      if (st.inc === "m") { I = st.I; T = t; m = s.M * I * T / (s.n * F); }
      else if (st.inc === "t") { I = st.I; m = st.m; T = m * s.n * F / (s.M * I); }
      else { m = st.m; T = t; I = m * s.n * F / (s.M * T); }
      q = I * T;
      var ne = q / F, nmol = ne / s.n;
      pasosH += '<div class="q8-paso"><b class="t">Semirreacción</b><span class="mv q3f">' + s.sem + "  (n = " + s.n + " e⁻ por " + (s.gas ? "molécula" : "átomo") + ")</span></div>";
      pasosH += '<div class="q8-paso"><b class="t">Ley de Faraday</b><span class="mv q3f">m = M·I·t / (n·F) = ' + d(s.M, 1) + " · " + d(I, 3) + " · " + d(T, 0) + " / (" + s.n + " · 96 500) = <b>" + d(m, 3) + " g</b></span></div>";
      pasosH += '<div class="q8-paso"><b class="t">Camino por moles</b><span class="mv q3f">Q = I·t = ' + d(q, 0) + " C → n(e⁻) = Q/F = " + cs(ne, 3) + " mol → n(" + s.t.split(" ")[0] + ") = " + cs(nmol, 3) + " mol</span></div>";
      var extra = "";
      if (s.gas) extra = fil("Volumen del gas (1 atm, 25 °C)", d(nmol * 0.082 * 298, 3) + " L", "ok");
      if (st.serie) {
        var s2 = SK[st.s2], m2 = q / F / s2.n * s2.M;
        pasosH += '<div class="q8-paso fin"><b class="t">Segunda cuba (misma intensidad y tiempo: misma carga)</b><span class="mv q3f">m₂ = M·Q / (n·F) = ' + d(s2.M, 1) + " · " + d(q, 0) + " / (" + s2.n + " · 96 500) = <b>" + d(m2, 3) + " g</b></span></div>";
        extra += fil("Masa en la 2.ª cuba", d(m2, 3) + " g", "ok") + fil("m₂/m₁ = (M₂/n₂)/(M₁/n₁)", d(m2 / m, 3), "");
      }
      pasos.innerHTML = pasosH;
      lectura.innerHTML = fil("Masa", d(m, 3) + " g", st.inc === "m" ? "ok" : "") + fil("Tiempo", d(T, 0) + " s (" + d(T / 60, 2) + " min · " + d(T / 3600, 3) + " h)", st.inc === "t" ? "ok" : "") +
        fil("Intensidad", d(I, 3) + " A", st.inc === "i" ? "ok" : "") + fil("Carga Q = I·t", d(q, 0) + " C", "") + fil("Electrones", cs(ne, 3) + " mol", "") + fil("Moles de sustancia", cs(nmol, 3) + " mol", "") + extra;
      pie.innerHTML = "1 mol de electrones transporta <b>96 500 C</b>. Con la misma carga, cada cuba en serie produce la masa que corresponde a su M/n (masa equivalente).";
    }
    U.fichas(cuerpo.querySelector("[data-inc]"), [{ k: "m", t: "Calcular la masa" }, { k: "t", t: "Calcular el tiempo" }, { k: "i", t: "Calcular la intensidad" }], "m", function (k) { st.inc = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-ser]"), [{ k: "0", t: "Una cuba" }, { k: "1", t: "Dos cubas en serie" }], "0", function (k) { st.serie = k === "1"; pinta(); });
    pinta();
  };

  B.lab.q8 = { PARES: PARES, combina: combina, REACCIONES: REACCIONES, resuelve: resuelve, VALORA: VALORA, SUST: SUST, F: F, PILA_K: PILA_K, notAnodo: notAnodo, notCatodo: notCatodo };
})(window);
