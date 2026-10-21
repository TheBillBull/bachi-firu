/* ============================================================
   Bachi para Firu · FyQ I tema 4 (I): Lavoisier, Proust y Dalton, el mol, masa molar,
   composición centesimal y fórmula empírica / molecular
   q4_lavoisier · q4_proporciones · q4_mol · q4_masamolar · q4_empirica
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;
  var NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function txt(parent, x, y, t, attrs) { var e = svg("text", attrs || {}, parent); e.setAttribute("x", x); e.setAttribute("y", y); e.textContent = t; return e; }

  // ============================================================
  // LAVOISIER: la balanza no miente (sistema cerrado frente a abierto)
  // ============================================================
  var LAV = [
    { t: "Combustión del magnesio", eq: "Mg + O2 → MgO", m: 12, gas: ["O2"], nota: "El magnesio arde y la ceniza (MgO) pesa MÁS que el metal: el oxígeno del aire se ha incorporado al sólido." },
    { t: "Descomposición de la caliza", eq: "CaCO3 → CaO + CO2", m: 50, gas: ["CO2"], nota: "El sólido que queda (CaO) pesa MENOS que la caliza: el CO₂ se escapa al aire como gas." },
    { t: "Hierro y azufre", eq: "Fe + S → FeS", m: 28, gas: [], nota: "Todo es sólido: la masa no cambia ni en abierto ni en cerrado." },
    { t: "Síntesis del agua", eq: "H2 + O2 → H2O", m: 4, gas: ["H2", "O2", "H2O"], nota: "Con gases hay que cerrar el recipiente para ver que se conserva la masa." },
    { t: "Combustión del propano", eq: "C3H8 + O2 → CO2 + H2O", m: 44, gas: ["C3H8", "O2", "CO2", "H2O"], nota: "Es la ecuación de la bombona de camping: casi todo son gases, y el «gas» que sale es más pesado de lo que entra." }
  ];
  B.w.q4_lavoisier = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Lavoisier: la balanza no miente");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-sis class="chips"></div><div data-ctl></div><div class="w-plot q4-bal"></div><div class="q4-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, cerrado: true, m: LAV[0].m }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".q4-tabla"), lienzo = cuerpo.querySelector(".q4-bal");
    var sl = U.slider(ctl, { et: "Masa del primer reactivo", min: 1, max: 100, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " g"; } });
    var fondo = svg("svg", { viewBox: "0 0 420 230", "class": "plot", role: "img", "aria-label": "Balanza con los reactivos a la izquierda y los productos a la derecha" }, lienzo);
    var viga = svg("g", { "class": "q4-viga" }, fondo);
    svg("polygon", { points: "210,200 190,222 230,222", "class": "q4-pie" }, fondo); svg("rect", { x: 205, y: 60, width: 10, height: 140, "class": "q4-pie" }, fondo);
    var panL = svg("g", {}, fondo), panR = svg("g", {}, fondo), tL, tR;
    function pinta() {
      var P = LAV[st.i], e = Q.ecuacion(P.eq), aj = Q.ajustar(e.reactivos, e.productos), esp = e.reactivos.concat(e.productos), nR = e.reactivos.length;
      var n1 = st.m / Q.masaMolar(esp[0]), masas = esp.map(function (f, k) { return aj.coefs[k] / aj.coefs[0] * n1 * Q.masaMolar(f); });
      // En abierto: el gas que entra no está en el plato izquierdo al empezar, y el gas que sale ya no está en el derecho
      var izq = 0, der = 0, k;
      for (k = 0; k < nR; k++) if (st.cerrado || P.gas.indexOf(esp[k]) < 0) izq += masas[k];
      for (k = nR; k < esp.length; k++) if (st.cerrado || P.gas.indexOf(esp[k]) < 0) der += masas[k];
      var totalIzq = 0, totalDer = 0; for (k = 0; k < nR; k++) totalIzq += masas[k]; for (k = nR; k < esp.length; k++) totalDer += masas[k];
      var dif = der - izq, ang = Math.max(-14, Math.min(14, dif / Math.max(izq, der, 1) * 60));
      viga.innerHTML = "";
      svg("rect", { x: 40, y: 58, width: 340, height: 8, rx: 4, "class": "q4-viga-r" }, viga);
      [panL, panR].forEach(function (g) { g.innerHTML = ""; });
      function plato(g, cx, y, etiqueta, valor, col) {
        svg("line", { x1: cx - 55, y1: y, x2: cx, y2: y - 36, "class": "q4-hilo" }, g); svg("line", { x1: cx + 55, y1: y, x2: cx, y2: y - 36, "class": "q4-hilo" }, g);
        svg("path", { d: "M" + (cx - 62) + " " + y + " h124 q0 22 -62 22 q-62 0 -62 -22z", "class": "q4-plato" }, g);
        txt(g, cx, y + 38, etiqueta, { "text-anchor": "middle", "class": "q4-lbl" }); txt(g, cx, y + 54, fmt(valor, 2) + " g", { "text-anchor": "middle", "class": "q4-val", style: "fill:" + col });
      }
      var desv = Math.sin(ang * Math.PI / 180) * 130;
      plato(panL, 80, 112, "reactivos", izq, "var(--pen)");
      plato(panR, 340, 112, "productos", der, "var(--red)");
      // inclinación: el plato más pesado baja
      panL.setAttribute("transform", "translate(0 " + (-desv) + ")"); panR.setAttribute("transform", "translate(0 " + desv + ")");
      viga.setAttribute("transform", "rotate(" + ang + " 210 62)");
      tabla.innerHTML = "<table class='fo-t q4-t'><thead><tr><th>Sustancia</th><th>Coef.</th><th>Masa (g)</th><th>Estado</th></tr></thead><tbody>" +
        esp.map(function (f, k) { return "<tr class='" + (k < nR ? "izq" : "") + "'><th>" + (k < nR ? "reactivo" : "producto") + " " + Q.sub(f) + "</th><td>" + aj.coefs[k] + "</td><td>" + fmt(masas[k], 2) + "</td><td>" + (P.gas.indexOf(f) >= 0 ? "gas" : "sólido") + "</td></tr>"; }).join("") +
        "<tr><th>Total</th><td></td><td>" + fmt(totalIzq, 2) + " → " + fmt(totalDer, 2) + "</td><td></td></tr></tbody></table>";
      var sinPeso = !st.cerrado && izq === 0 && der === 0;
      var aparente = sinPeso ? "todo son gases: sin recipiente cerrado no hay nada que pesar" : Math.abs(dif) < 0.005 ? "la balanza queda equilibrada" : dif > 0 ? "los productos «pesan» " + fmt(dif, 2) + " g más" : "los productos «pesan» " + fmt(-dif, 2) + " g menos";
      lectura.innerHTML = fil("Ecuación ajustada", Q.textoEcuacion(e.reactivos, e.productos, aj.coefs), "pen ancho") + fil("Masa de reactivos (todos)", fmt(totalIzq, 2) + " g", "pen") + fil("Masa de productos (todos)", fmt(totalDer, 2) + " g", "red") +
        fil("Lo que marca la balanza", st.cerrado ? "sistema cerrado: " + aparente : "sistema abierto: " + aparente, st.cerrado || Math.abs(dif) < 0.005 ? "ok ancho" : "red ancho");
      pie.innerHTML = P.nota + " <b>Ley de Lavoisier:</b> en un sistema cerrado la masa total de los reactivos es igual a la de los productos. Cuando parece que «se gana» o «se pierde» masa, es que algún gas entra o sale del sistema abierto.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), LAV.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; st.m = LAV[+k].m; sl.set(st.m); pinta(); });
    U.fichas(cuerpo.querySelector("[data-sis]"), [{ k: "c", t: "Sistema cerrado" }, { k: "a", t: "Sistema abierto" }], "c", function (k) { st.cerrado = k === "c"; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta });
    pinta();
  };

  // ============================================================
  // PROPORCIONES: Proust (proporción fija), Dalton (proporciones múltiples) y mezcla con exceso
  // ============================================================
  var COMPS = ["H2O", "CO2", "NH3", "MgO", "FeS", "NaCl", "SO2", "CuO", "CaO", "Fe2O3"];
  var DALT = [
    { t: "Óxidos de carbono", x: "C", y: "O", c: ["CO", "CO2"] },
    { t: "Óxidos de nitrógeno", x: "N", y: "O", c: ["N2O", "NO", "N2O3", "NO2", "N2O5"] },
    { t: "Óxidos de azufre", x: "S", y: "O", c: ["SO2", "SO3"] },
    { t: "Óxidos de cobre", x: "Cu", y: "O", c: ["Cu2O", "CuO"] },
    { t: "Óxidos de hierro", x: "Fe", y: "O", c: ["FeO", "Fe2O3"] },
    { t: "Agua y agua oxigenada", x: "H", y: "O", c: ["H2O", "H2O2"] }
  ];
  function ratioSencillo(v, tolerancia) {                    // [1, 2, 4] a partir de [0.571, 1.143, 2.286]
    var min = Math.min.apply(null, v), r = v.map(function (x) { return x / min; });
    for (var k = 1; k <= 12; k++) { if (r.every(function (x) { return Math.abs(x * k - Math.round(x * k)) < (tolerancia || 0.06) * Math.max(1, k * 0.5); })) return r.map(function (x) { return Math.round(x * k); }); }
    return r.map(function (x) { return fmt(x, 2); });
  }
  B.w.q4_proporciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Proust y Dalton: las proporciones en las que se combinan los elementos");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-sel class="chips"></div><div data-ctl></div><div class="q4-barras"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "proust", i: 0, d: 0, m: 36, ma: 10, mb: 8, c: 4 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), barras = cuerpo.querySelector(".q4-barras"), sel = cuerpo.querySelector("[data-sel]");
    var s1 = U.slider(ctl, { et: "Masa del compuesto", min: 1, max: 200, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " g"; } });
    var s2 = U.slider(ctl, { et: "Masa del 1.er elemento", min: 1, max: 60, step: 1, val: st.ma, on: function (v) { st.ma = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " g"; } });
    var s3 = U.slider(ctl, { et: "Masa del 2.º elemento", min: 1, max: 60, step: 1, val: st.mb, on: function (v) { st.mb = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " g"; } });
    function barra(items) {                                  // items: [{ t, v, col }] en una barra apilada
      var tot = items.reduce(function (a, b) { return a + b.v; }, 0) || 1;
      return "<div class='q4-apilada' role='img' aria-label='composición en masa'>" + items.map(function (x) { return "<span style='flex:" + Math.max(x.v, 0.0001) + ";background:" + x.col + "' title='" + x.t + "'>" + (x.v / tot > 0.08 ? x.t : "") + "</span>"; }).join("") + "</div>";
    }
    function pinta() {
      var modo = st.modo, h = "", filas;
      s1.el.style.display = modo === "proust" ? "" : "none"; s2.el.style.display = s3.el.style.display = modo === "mezcla" ? "" : "none";
      if (modo === "proust") {
        var f = COMPS[st.i], C = Q.composicion(f), masas = C.filas.map(function (r) { return st.m * r.pct / 100; });
        barras.innerHTML = barra(C.filas.map(function (r, k) { return { t: r.e + " " + fmt(masas[k], 2) + " g", v: masas[k], col: Q.color(k) }; }));
        var min = Math.min.apply(null, C.filas.map(function (r) { return r.aporte; })), rat = C.filas.map(function (r) { return r.aporte / min; });
        lectura.innerHTML = fil("Fórmula · masa molar", Q.sub(f) + " · " + fmt(C.M, 2) + " g/mol", "pen") + fil("Masa de cada elemento en " + fmt(st.m, 0) + " g", C.filas.map(function (r, k) { return r.e + ": " + fmt(masas[k], 3) + " g"; }).join(" · "), "ancho") +
          fil("Proporción en masa", C.filas.map(function (r) { return r.e; }).join(" : ") + " = " + rat.map(function (x) { return fmt(x, 2); }).join(" : "), "ok ancho") + fil("Porcentaje en masa", C.filas.map(function (r) { return r.e + " " + fmt(r.pct, 2) + " %"; }).join(" · "), "ancho");
        pie.innerHTML = "Cambia la masa del compuesto: las barras crecen o se encogen, pero <b>la proporción entre los elementos no varía nunca</b>. Eso es la ley de Proust: un compuesto tiene siempre la misma composición, se prepare como se prepare y la cantidad que sea.";
      } else if (modo === "dalton") {
        var D = DALT[st.d], x = D.x, y = D.y, fm = D.c.map(function (c) { var L = Q.leer(c).elems; return Q.masaAtomica(y) * L[y] / (Q.masaAtomica(x) * L[x]); }), rr = ratioSencillo(fm);
        barras.innerHTML = D.c.map(function (c, k) { return "<div class='q4-fila'><span class='q4-nom'>" + Q.sub(c) + "</span><span class='q4-bar' style='width:" + (fm[k] / Math.max.apply(null, fm) * 100) + "%;background:" + Q.color(k) + "'></span><span class='q4-num'>" + fmt(fm[k], 3) + " g</span></div>"; }).join("");
        lectura.innerHTML = fil("Masa de " + y + " que se combina con 1 g de " + x, D.c.map(function (c, k) { return Q.sub(c) + ": " + fmt(fm[k], 3) + " g"; }).join(" · "), "pen ancho") + fil("Cociente de esas masas", rr.join(" : "), "ok ancho");
        pie.innerHTML = "<b>Ley de Dalton (proporciones múltiples):</b> cuando dos elementos forman varios compuestos, las masas de uno que se combinan con una masa fija del otro están en una relación de <b>números enteros sencillos</b>. Aquí: " + rr.join(" : ") + ". Esa regularidad fue una de las pistas de que la materia está hecha de átomos.";
      } else {
        var Fm = COMPS[st.i], CC = Q.composicion(Fm), e1 = CC.filas[0], e2 = CC.filas[1];
        var a = st.ma, bb = st.mb, forma = Math.min(a / e1.aporte, bb / e2.aporte), nCompMasa = forma * CC.M;
        var sobra1 = a - forma * e1.aporte, sobra2 = bb - forma * e2.aporte;
        barras.innerHTML = "<div class='q4-dos'><div><b>Antes</b>" + barra([{ t: e1.e + " " + fmt(a, 0) + " g", v: a, col: Q.color(0) }, { t: e2.e + " " + fmt(bb, 0) + " g", v: bb, col: Q.color(1) }]) + "</div><div><b>Después</b>" + barra([{ t: Fm + " " + fmt(nCompMasa, 1) + " g", v: nCompMasa, col: Q.color(2) }, { t: (sobra1 > 0.001 ? e1.e : e2.e) + " sobrante " + fmt(Math.max(sobra1, sobra2), 1) + " g", v: Math.max(sobra1, sobra2), col: "var(--ink-faint)" }]) + "</div></div>";
        lectura.innerHTML = fil("Proporción exacta en " + Q.sub(Fm), e1.e + ":" + e2.e + " = " + fmt(e1.aporte, 2) + " : " + fmt(e2.aporte, 2), "pen") + fil("Compuesto formado", fmt(nCompMasa, 2) + " g de " + Q.sub(Fm), "ok") +
          fil("Elemento sobrante", Math.max(sobra1, sobra2) < 0.005 ? "ninguno: mezcla justa" : (sobra1 > sobra2 ? e1.e : e2.e) + ": " + fmt(Math.max(sobra1, sobra2), 2) + " g sin reaccionar", Math.max(sobra1, sobra2) < 0.005 ? "ok ancho" : "red ancho");
        pie.innerHTML = "Si mezclas los elementos en una proporción distinta a la del compuesto, <b>el sobrante no reacciona</b>: el compuesto que se forma conserva siempre su proporción. Busca los valores que no dejan sobrante: esa es la proporción de Proust.";
      }
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "proust", t: "Proust: proporción fija" }, { k: "dalton", t: "Dalton: proporciones múltiples" }, { k: "mezcla", t: "Mezcla con exceso" }], "proust", function (k) { st.modo = k; armar(); pinta(); });
    function armar() {
      if (st.modo === "dalton") U.fichas(sel, DALT.map(function (p, i) { return { k: String(i), t: p.t }; }), String(st.d), function (k) { st.d = +k; pinta(); });
      else U.fichas(sel, COMPS.map(function (c, i) { return { k: String(i), t: Q.sub(c) }; }), String(st.i), function (k) { st.i = +k; pinta(); });
    }
    armar(); Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // MOL: conversor entre masa, moles, partículas y átomos
  // ============================================================
  var MOLES = ["H2O", "CO2", "NaCl", "C6H12O6", "CaCO3", "NH3", "H2SO4", "Fe", "O2", "C2H6O"];
  B.w.q4_mol = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El mol: del peso de la balanza al número de partículas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div data-ctl></div><div data-uni class="chips"></div><div class="lectura anch"></div><div class="q4-tabla"></div><p class="w-pie"></p>';
    var st = { f: "H2O", v: "36", u: "g" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".q4-tabla");
    var iF = Q.campo(ctl, "Fórmula:", st.f, 150), iV = Q.campo(ctl, "Cantidad:", st.v, 110);
    Q.fichasModo(cuerpo.querySelector("[data-modo]"), function () { pinta(); });
    var UNI = [{ k: "g", t: "gramos" }, { k: "mol", t: "moles" }, { k: "N", t: "moléculas / entidades" }, { k: "at", t: "átomos totales" }];
    function pinta() {
      var L = Q.leer(st.f), v = Q.num(st.v);
      if (!L.ok) { lectura.innerHTML = fil("Revisa la fórmula", L.error, "red"); tabla.innerHTML = ""; return; }
      if (isNaN(v) || v < 0) { lectura.innerHTML = fil("Revisa la cantidad", "escribe un número positivo", "red"); tabla.innerHTML = ""; return; }
      var M = Q.masaMolar(st.f), nat = Q.nAtomos(st.f), n = st.u === "g" ? v / M : st.u === "mol" ? v : st.u === "N" ? v / Q.NA : v / nat / Q.NA;
      var m = n * M, N = n * Q.NA, atomos = N * nat;
      var pasos = st.u === "g" ? "n = m / M = " + fmt(v, 3) + " g / " + fmt(M, 2) + " g/mol = " + fmt(n, 4) + " mol" : st.u === "mol" ? "m = n · M = " + fmt(v, 3) + " mol · " + fmt(M, 2) + " g/mol = " + fmt(m, 3) + " g" : st.u === "N" ? "n = N / N<sub>A</sub> = " + Q.sci(v) + " / 6,022·10²³ = " + fmt(n, 4) + " mol" : "N = átomos / " + nat + " = " + Q.sci(v / nat) + " moléculas → n = N / N<sub>A</sub> = " + fmt(n, 4) + " mol";
      lectura.innerHTML = fil("Masa molar de " + L.formula, fmt(M, 3) + " g/mol", "pen") + fil("Cantidad de sustancia", fmt(n, 5) + " mol", "ok") + fil("Masa", fmt(m, 4) + " g", "pen") +
        fil("Número de moléculas (o unidades fórmula)", Q.sci(N), "red") + fil("Átomos totales (" + nat + " por molécula)", Q.sci(atomos), "red") + fil("Cálculo", pasos, "ancho") +
        fil("Una molécula pesa", Q.sci(M / Q.NA) + " g", "");
      tabla.innerHTML = "<table class='fo-t q4-t'><thead><tr><th>Elemento</th><th>Átomos por molécula</th><th>Moles de átomos</th><th>Número de átomos</th></tr></thead><tbody>" +
        Object.keys(L.elems).map(function (e) { return "<tr><th>" + e + "</th><td>" + L.elems[e] + "</td><td>" + fmt(n * L.elems[e], 4) + "</td><td>" + Q.sci(N * L.elems[e]) + "</td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = "<b>n = m/M</b> pasa de gramos a moles; <b>N = n·N<sub>A</sub></b> de moles a partículas. Un mol de moléculas de " + L.formula + " contiene " + nat + " moles de átomos (uno por cada átomo de la fórmula). Prueba con distintas fórmulas y con la opción de masas con decimales.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), MOLES.map(function (f) { return { k: f, t: Q.sub(f) }; }), "H2O", function (k) { st.f = k; iF.value = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-uni]"), UNI, "g", function (k) { st.u = k; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); }); iV.addEventListener("input", function () { st.v = iV.value; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // MASAMOLAR: suma de masas atómicas y composición centesimal
  // ============================================================
  var MM = ["H2O", "CO2", "NaCl", "C6H12O6", "CaCO3", "H2SO4", "Al2(SO4)3", "CuSO4·5H2O", "Fe2O3", "Ca(OH)2", "(NH4)2SO4", "C2H5OH"];
  B.w.q4_masamolar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Masa molar y composición centesimal");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div data-ctl></div><div class="q4-barras"></div><div class="q4-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: "H2O" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".q4-tabla"), barras = cuerpo.querySelector(".q4-barras");
    var iF = Q.campo(ctl, "Fórmula:", st.f, 190);
    Q.fichasModo(cuerpo.querySelector("[data-modo]"), function () { pinta(); });
    function pinta() {
      var L = Q.leer(st.f);
      if (!L.ok) { lectura.innerHTML = fil("Revisa la fórmula", L.error, "red"); tabla.innerHTML = ""; barras.innerHTML = ""; return; }
      var C = Q.composicion(st.f);
      barras.innerHTML = "<div class='q4-apilada' role='img' aria-label='composición centesimal'>" + C.filas.map(function (r, k) { return "<span style='flex:" + r.pct + ";background:" + Q.color(k) + "' title='" + r.e + " " + fmt(r.pct, 2) + " %'>" + (r.pct > 7 ? r.e + " " + fmt(r.pct, 1) + " %" : "") + "</span>"; }).join("") + "</div>";
      tabla.innerHTML = "<table class='fo-t q4-t'><thead><tr><th>Elemento</th><th>Nº de átomos</th><th>Masa atómica</th><th>Aporte (g/mol)</th><th>% en masa</th></tr></thead><tbody>" +
        C.filas.map(function (r) { return "<tr><th>" + r.e + "</th><td>" + r.n + "</td><td>" + fmt(r.ma, 3) + "</td><td>" + fmt(r.aporte, 3) + "</td><td>" + fmt(r.pct, 2) + " %</td></tr>"; }).join("") +
        "<tr><th>Total</th><td>" + Q.nAtomos(st.f) + "</td><td></td><td><b>" + fmt(C.M, 3) + "</b></td><td>100 %</td></tr></tbody></table>";
      lectura.innerHTML = fil("Masa molar de " + L.formula, fmt(C.M, 3) + " g/mol", "pen") + fil("Un mol pesa…", fmt(C.M, 2) + " g y contiene " + Q.sci(Q.NA) + " unidades fórmula", "ok ancho") +
        fil("Suma", C.filas.map(function (r) { return r.n + "·" + fmt(r.ma, 3); }).join(" + ") + " = " + fmt(C.M, 3), "ancho");
      pie.innerHTML = "La <b>masa molar</b> es la suma de las masas atómicas de todos los átomos de la fórmula, y el <b>% en masa</b> de cada elemento = aporte / masa molar × 100. Funciona con paréntesis, como Al₂(SO₄)₃, y con hidratos, como CuSO₄·5H₂O.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), MM.map(function (f) { return { k: f, t: Q.sub(f) }; }), "H2O", function (k) { st.f = k; iF.value = k; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // EMPIRICA: de los porcentajes (o de una combustión) a la fórmula empírica y molecular
  // ============================================================
  var ORD = ["C", "H", "Li", "Na", "K", "Mg", "Ca", "Ba", "Al", "Zn", "Fe", "Cu", "Ag", "Pb", "N", "P", "S", "Cl", "Br", "I", "O", "F"];
  function formulaOrdenada(c) {
    return Object.keys(c).sort(function (a, b) { var i = ORD.indexOf(a), j = ORD.indexOf(b); return (i < 0 ? 99 : i) - (j < 0 ? 99 : j); }).map(function (e) { return e + (c[e] === 1 ? "" : c[e]); }).join("");
  }
  var EMP = [
    { t: "Glucosa", d: [["C", "40,0"], ["H", "6,7"], ["O", "53,3"]], M: "180" },
    { t: "Benceno", d: [["C", "92,3"], ["H", "7,7"]], M: "78" },
    { t: "Óxido de hierro(III)", d: [["Fe", "69,9"], ["O", "30,1"]], M: "" },
    { t: "Vitamina C", d: [["C", "40,9"], ["H", "4,5"], ["O", "54,6"]], M: "176" },
    { t: "Ácido acético", d: [["C", "40,0"], ["H", "6,7"], ["O", "53,3"]], M: "60" }
  ];
  B.w.q4_empirica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "De los porcentajes a la fórmula empírica y molecular");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-pre class="chips"></div><div class="q4-emp-form"></div><div class="q4-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "pct", filas: EMP[0].d.map(function (x) { return x.slice(); }), M: EMP[0].M, mu: "2,30", co2: "4,40", h2o: "2,70", Mc: "46" }, form = cuerpo.querySelector(".q4-emp-form"), tabla = cuerpo.querySelector(".q4-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function armar() {
      form.innerHTML = "";
      var ctl = U.ctl(form), ins = [];
      if (st.modo === "pct") {
        for (var k = 0; k < 4; k++) (function (k) {
          var fila = st.filas[k] || ["", ""];
          var a = Q.campo(ctl, "Elemento " + (k + 1), fila[0], 56), b = Q.campo(ctl, "% (o g)", fila[1], 80);
          a.addEventListener("input", function () { st.filas[k] = [a.value, b.value]; pinta(); }); b.addEventListener("input", function () { st.filas[k] = [a.value, b.value]; pinta(); });
        })(k);
        var im = Q.campo(ctl, "Masa molar (opcional)", st.M, 80); im.addEventListener("input", function () { st.M = im.value; pinta(); });
      } else {
        var a1 = Q.campo(ctl, "Masa de muestra (g)", st.mu, 80), a2 = Q.campo(ctl, "CO₂ obtenido (g)", st.co2, 80), a3 = Q.campo(ctl, "H₂O obtenida (g)", st.h2o, 80), a4 = Q.campo(ctl, "Masa molar (opcional)", st.Mc, 80);
        a1.addEventListener("input", function () { st.mu = a1.value; pinta(); }); a2.addEventListener("input", function () { st.co2 = a2.value; pinta(); }); a3.addEventListener("input", function () { st.h2o = a3.value; pinta(); }); a4.addEventListener("input", function () { st.Mc = a4.value; pinta(); });
      }
    }
    function pinta() {
      var datos = [], errores = [];
      if (st.modo === "pct") {
        st.filas.forEach(function (f) { if (!f || !String(f[0]).trim()) return; var e = String(f[0]).trim(), v = Q.num(f[1]); e = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase(); if (!Q.atomo[e]) errores.push("elemento desconocido «" + e + "»"); else if (isNaN(v) || v <= 0) errores.push("falta el dato de " + e); else datos.push({ e: e, m: v }); });
      } else {
        var mu = Q.num(st.mu), mc = Q.num(st.co2), mh = Q.num(st.h2o);
        if ([mu, mc, mh].some(function (x) { return isNaN(x) || x <= 0; })) errores.push("escribe las tres masas (muestra, CO₂ y H₂O)");
        else {
          var C = mc * Q.masaAtomica("C") / Q.masaMolar("CO2"), Hh = mh * 2 * Q.masaAtomica("H") / Q.masaMolar("H2O"), O = mu - C - Hh;
          datos = [{ e: "C", m: C }, { e: "H", m: Hh }]; if (O > 0.003 * mu) datos.push({ e: "O", m: O });
          if (O < -0.01 * mu) errores.push("el C y el H suman más que la muestra: revisa los datos");
        }
      }
      if (errores.length) { lectura.innerHTML = fil("Revisa los datos", errores.join("; "), "red ancho"); tabla.innerHTML = ""; return; }
      if (datos.length < 2) { lectura.innerHTML = fil("Faltan datos", "escribe al menos dos elementos", "red ancho"); tabla.innerHTML = ""; return; }
      var tot = datos.reduce(function (a, d) { return a + d.m; }, 0);
      datos.forEach(function (d) { d.n = d.m / Q.masaAtomica(d.e); });
      var min = Math.min.apply(null, datos.map(function (d) { return d.n; })); datos.forEach(function (d) { d.r = d.n / min; });
      var k = 0, ent = null; for (var q = 1; q <= 8 && !ent; q++) if (datos.every(function (d) { return Math.abs(d.r * q - Math.round(d.r * q)) < 0.09; })) { k = q; ent = datos.map(function (d) { return Math.round(d.r * q); }); }
      tabla.innerHTML = "<table class='fo-t q4-t'><thead><tr><th>Elemento</th><th>Masa (g)</th><th>Masa atómica</th><th>Moles = m/Ar</th><th>÷ el menor</th>" + (k > 1 ? "<th>× " + k + "</th>" : "") + "<th>Subíndice</th></tr></thead><tbody>" +
        datos.map(function (d, i) { return "<tr><th>" + d.e + "</th><td>" + fmt(d.m, 3) + "</td><td>" + fmt(Q.masaAtomica(d.e), 2) + "</td><td>" + fmt(d.n, 4) + "</td><td>" + fmt(d.r, 3) + "</td>" + (k > 1 ? "<td>" + fmt(d.r * k, 2) + "</td>" : "") + "<td>" + (ent ? ent[i] : "?") + "</td></tr>"; }).join("") + "</tbody></table>";
      if (!ent) { lectura.innerHTML = fil("Fórmula empírica", "las proporciones no dan números enteros sencillos: revisa los datos o los redondeos", "red ancho"); return; }
      var emp = {}; datos.forEach(function (d, i) { emp[d.e] = ent[i]; });
      var Me = Q.masaMolar(emp), Mn = Q.num(st.modo === "pct" ? st.M : st.Mc), molec = null, nn = null;
      if (!isNaN(Mn) && Mn > 0) { nn = Mn / Me; if (Math.abs(nn - Math.round(nn)) < 0.12 && Math.round(nn) >= 1) { nn = Math.round(nn); molec = {}; for (var e in emp) molec[e] = emp[e] * nn; } }
      lectura.innerHTML = fil("Fórmula empírica", Q.sub(formulaOrdenada(emp)), "ok") + fil("Masa de la fórmula empírica", fmt(Me, 2) + " g/mol", "pen") +
        (!isNaN(Mn) && Mn > 0 ? fil("n = M / M(empírica)", fmt(Mn, 1) + " / " + fmt(Me, 2) + " = " + fmt(Mn / Me, 2), "") + fil("Fórmula molecular", molec ? Q.sub(formulaOrdenada(molec)) : "M no es múltiplo de la empírica", molec ? "ok" : "red") : fil("Fórmula molecular", "da la masa molar para calcularla", ""));
      pie.innerHTML = "<b>Pasos:</b> 1) pasa los % (o los gramos) a <b>moles</b> dividiendo entre la masa atómica; 2) <b>divide todo entre el menor</b>; 3) si salen decimales como 1,5 o 1,33, <b>multiplica</b> por 2 o por 3 hasta tener enteros; 4) los enteros son los subíndices. La molecular se obtiene multiplicando por n = M / M(empírica).";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "pct", t: "A partir de % o gramos" }, { k: "comb", t: "Análisis por combustión" }], "pct", function (k) { st.modo = k; armar(); pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), EMP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var P = EMP[+k]; st.modo = "pct"; st.filas = P.d.map(function (x) { return x.slice(); }); st.M = P.M; armar(); pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); armar(); pinta();
  };
})(window);
