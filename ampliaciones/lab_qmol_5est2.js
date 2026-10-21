/* ============================================================
   Bachi para Firu · FyQ I tema 5 (II): rendimiento, gases, disoluciones, combustión, problemas y plan
   q5_rendimiento · q5_gases · q5_disoluciones · q5_combustion · q5_practica · q5_mapa
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;
  var NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function ecuHtml(R) { return "<div class='q5-ecuacion'>" + R.todas.map(function (x, k) { return (k === R.r.length ? "<span class='q5-fl'>⟶</span>" : k ? "<span class='q5-mas'>+</span>" : "") + "<span class='q5-esp q5-solo'><b>" + (x.c === 1 ? "" : x.c) + "</b> " + Q.sub(x.f) + Q.simboloEstado(x.e) + "</span>"; }).join("") + "</div>"; }
  function elige(a) { return a[Math.floor(Math.random() * a.length)]; }
  function entre(a, b, paso) { return a + Math.floor(Math.random() * ((b - a) / paso + 1)) * paso; }
  var K = 273;                                                    // K = °C + 273 (convenio de examen)

  // ============================================================
  // RENDIMIENTO Y PUREZA
  // ============================================================
  var RE = [
    { id: "caliza", r: 0, p: 1, m: 500, pur: 90, real: 220 },
    { id: "altohorno", r: 0, p: 2, m: 1000, pur: 80, real: 500 },
    { id: "clorato", r: 0, p: 2, m: 100, pur: 95, real: 33 },
    { id: "fermenta", r: 0, p: 1, m: 100, pur: 100, real: 40 },
    { id: "bicarbonato", r: 0, p: 1, m: 84, pur: 98, real: 50 },
    { id: "airbag", r: 0, p: 2, m: 65, pur: 100, real: 30 },
    { id: "haber", r: 1, p: 2, m: 6, pur: 100, real: 20 }
  ];
  B.w.q5_rendimiento = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Pureza, rendimiento y masa realmente obtenida");
    cuerpo.innerHTML = '<div data-ctl></div><div data-modo class="chips"></div><div class="q5-ecu"></div><div class="q5-casc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, modo: "real", m: RE[0].m, pur: RE[0].pur, real: RE[0].real, eta: 80 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ecu = cuerpo.querySelector(".q5-ecu"), casc = cuerpo.querySelector(".q5-casc"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.selector(ctl, "Reacción:", RE.map(function (d, i) { var R = Q.reaccion(d.id); return { k: String(i), t: R.t + " (" + Q.sub(R.todas[d.r].f) + " → " + Q.sub(R.todas[d.p].f) + ")" }; }), "0", function (k) { st.i = +k; var d = RE[st.i]; st.m = d.m; st.pur = d.pur; st.real = d.real; iM.value = d.m; iP.value = d.pur; iR.value = d.real; pinta(); });
    var iM = Q.campo(ctl, "Muestra (g)", st.m, 90), iP = Q.campo(ctl, "Pureza (%)", st.pur, 70), iR = Q.campo(ctl, "Masa obtenida (g)", st.real, 90), iE = Q.campo(ctl, "Rendimiento (%)", st.eta, 80);
    [[iM, "m"], [iP, "pur"], [iR, "real"], [iE, "eta"]].forEach(function (a) { a[0].addEventListener("input", function () { st[a[1]] = a[0].value; pinta(); }); });
    function pinta() {
      var d = RE[st.i], R = Q.reaccion(d.id), re = R.todas[d.r], pr = R.todas[d.p];
      iR.parentNode.style.display = st.modo === "real" ? "" : "none"; iE.parentNode.style.display = st.modo === "real" ? "none" : "";
      ecu.innerHTML = ecuHtml(R);
      var m = Q.num(st.m), pur = Q.num(st.pur), real = Q.num(st.real), eta = Q.num(st.eta);
      if ([m, pur].some(function (x) { return isNaN(x) || x <= 0; }) || pur > 100) { casc.innerHTML = ""; lectura.innerHTML = fil("Revisa los datos", "la muestra debe ser positiva y la pureza estar entre 0 y 100 %", "red ancho"); return; }
      if (st.modo === "real" ? (isNaN(real) || real < 0) : (isNaN(eta) || eta < 0)) { casc.innerHTML = ""; lectura.innerHTML = fil("Revisa los datos", st.modo === "real" ? "escribe la masa obtenida (≥ 0)" : "escribe el rendimiento (≥ 0)", "red ancho"); return; }
      var Mr = Q.masaMolar(re.f), Mp = Q.masaMolar(pr.f), mPura = m * pur / 100, nR = mPura / Mr, nP = nR * pr.c / re.c, mTeo = nP * Mp, mReal = st.modo === "real" ? real : mTeo * eta / 100, et = st.modo === "real" ? mReal / mTeo * 100 : eta;
      var filas = [["Muestra (con impurezas)", m, "var(--ink-faint)"], ["Reactivo puro: " + Q.sub(re.f), mPura, "var(--pen)"], ["Producto teórico: " + Q.sub(pr.f), mTeo, "var(--ok)"], ["Producto real: " + Q.sub(pr.f), mReal, "var(--red)"]], mx = Math.max.apply(null, filas.map(function (f) { return f[1]; })) || 1;
      casc.innerHTML = filas.map(function (f) { return "<div class='q5-cf'><span class='q5-cl'>" + f[0] + "</span><span class='q5-cbw'><span class='q5-cb' style='width:" + Math.max(1, f[1] / mx * 100) + "%;background:" + f[2] + "'></span></span><span class='q5-cv'>" + fmt(f[1], 2) + " g</span></div>"; }).join("");
      lectura.innerHTML = fil("1) Masa de reactivo puro", fmt(m, 2) + " g · " + fmt(pur, 2) + " % = " + fmt(mPura, 3) + " g de " + Q.sub(re.f), "pen") + fil("2) Moles de " + Q.sub(re.f), fmt(mPura, 3) + " / " + fmt(Mr, 2) + " = " + fmt(nR, 4) + " mol", "") +
        fil("3) Moles teóricos de " + Q.sub(pr.f), fmt(nR, 4) + " · " + pr.c + "/" + re.c + " = " + fmt(nP, 4) + " mol", "") + fil("4) Masa teórica (rendimiento 100 %)", fmt(nP, 4) + " · " + fmt(Mp, 2) + " = " + fmt(mTeo, 3) + " g", "ok") +
        (st.modo === "real" ? fil("5) Rendimiento = real / teórico · 100", fmt(mReal, 3) + " / " + fmt(mTeo, 3) + " · 100 = " + fmt(et, 2) + " %", et > 100.0001 ? "red ancho" : "red ancho") : fil("5) Masa real = teórica · rendimiento", fmt(mTeo, 3) + " · " + fmt(eta, 2) + " / 100 = " + fmt(mReal, 3) + " g", "red ancho")) +
        (et > 100.0001 ? fil("Aviso", "Un rendimiento superior al 100 % es imposible: revisa los datos (¿producto húmedo o con impurezas?).", "red ancho") : "");
      pie.innerHTML = "<b>Orden de los cálculos:</b> primero la <b>pureza</b> (se corrige la masa del reactivo antes de convertirla a moles), después la estequiometría hasta el producto <b>teórico</b>, y por último el <b>rendimiento</b> (compara lo real con lo teórico). El rendimiento nunca se aplica a los reactivos.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "real", t: "Tengo la masa obtenida → calcular el rendimiento" }, { k: "eta", t: "Tengo el rendimiento → calcular la masa obtenida" }], "real", function (k) { st.modo = k; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // GASES: volúmenes de combinación y PV = nRT
  // ============================================================
  var GASR = ["haber", "vapor", "propano", "co", "altohorno", "metano", "bicarbonato", "zinc", "caliza", "clorato", "carbonato", "airbag", "oxigenada", "fermenta"];
  B.w.q5_gases = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Reacciones con gases: volúmenes y PV = nRT");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-ctl></div><div class="q5-ecu"></div><div class="q5-dato-t">Dato conocido</div><div data-dato class="chips"></div><div data-uni class="chips"></div><div class="w-plot q5-cil"></div><div class="q5-tabla"></div><div class="q5-dato-t">Quiero calcular</div><div data-obj class="chips"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "vol", id: "haber", j: 0, k: 2, u: "g", v: "10", V0: 6, P: 1, Tc: 25 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ecu = cuerpo.querySelector(".q5-ecu"), lienzo = cuerpo.querySelector(".q5-cil"), tabla = cuerpo.querySelector(".q5-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.selector(ctl, "Reacción:", GASR.map(function (id) { return { k: id, t: Q.reaccion(id).t }; }), st.id, function (k) { st.id = k; st.j = 0; st.k = Math.min(1, Q.reaccion(k).todas.length - 1); st.u = "g"; armar(); });
    var iV = Q.campo(ctl, "Cantidad:", st.v, 100); iV.addEventListener("input", function () { st.v = iV.value; pinta(); });
    var sV0 = U.slider(ctl, { et: "Volumen del gas conocido", min: 1, max: 20, step: 0.5, val: st.V0, fmt: function (v) { return fmt(v, 1) + " L"; }, on: function (v) { st.V0 = v; pinta(); } });
    var sP = U.slider(ctl, { et: "Presión", min: 0.5, max: 4, step: 0.1, val: st.P, fmt: function (v) { return fmt(v, 1) + " atm"; }, on: function (v) { st.P = v; pinta(); } });
    var sT = U.slider(ctl, { et: "Temperatura", min: 0, max: 200, step: 5, val: st.Tc, fmt: function (v) { return fmt(v, 0) + " °C"; }, on: function (v) { st.Tc = v; pinta(); } });
    function gases(R) { var a = []; R.todas.forEach(function (x, i) { if (x.e === "g") a.push(i); }); return a; }
    function armar() {
      var R = Q.reaccion(st.id), gs = gases(R), vol = st.modo === "vol", lista = vol ? gs : R.todas.map(function (x, i) { return i; });
      if (lista.indexOf(st.j) < 0) st.j = lista[0]; if (lista.indexOf(st.k) < 0 || (st.k === st.j && lista.length > 1)) st.k = lista.filter(function (i) { return i !== st.j; })[0] || st.j;
      U.fichas(cuerpo.querySelector("[data-dato]"), lista.map(function (i) { return { k: String(i), t: Q.sub(R.todas[i].f) }; }), String(st.j), function (k) { st.j = +k; armarUni(); pinta(); });
      U.fichas(cuerpo.querySelector("[data-obj]"), lista.map(function (i) { return { k: String(i), t: Q.sub(R.todas[i].f) }; }), String(st.k), function (k) { st.k = +k; pinta(); });
      armarUni(); pinta();
    }
    function armarUni() {
      var R = Q.reaccion(st.id), ops = [{ k: "g", t: "gramos" }, { k: "mol", t: "moles" }];
      if (R.todas[st.j].e === "g") ops.push({ k: "L", t: "litros a esa P y T" });
      if (!ops.some(function (o) { return o.k === st.u; })) st.u = "g";
      U.fichas(cuerpo.querySelector("[data-uni]"), ops, st.u, function (k) { st.u = k; pinta(); });
    }
    function cilindros(R, filas, titulo) {                                         // columnas de bloques: un bloque = «un volumen» de la ecuación
      lienzo.innerHTML = ""; var W = 520, H = 230, base = 180, an = (W - 20) / filas.length, ub = 0;
      var maxC = Math.max.apply(null, filas.map(function (f) { return f.c; })), hb = Math.min(34, 140 / maxC);
      var top = Math.max(0, base - maxC * hb - 30), s = svg("svg", { viewBox: "0 " + top + " " + W + " " + (H - top), "class": "plot q5-graf", role: "img", "aria-label": titulo }, lienzo);
      svg("line", { x1: 10, y1: base, x2: W - 10, y2: base, "class": "q5-eje" }, s);
      filas.forEach(function (f, k) {
        var cx = 10 + an * (k + 0.5), bw = Math.min(70, an - 24), col = Q.color(f.idx);
        for (var b = 0; b < f.c; b++) svg("rect", { x: cx - bw / 2, y: base - (b + 1) * hb + 1, width: bw, height: hb - 2, rx: 4, fill: col, "fill-opacity": 0.85 }, s);
        var t = svg("text", { x: cx, y: base - f.c * hb - 6, "text-anchor": "middle", "class": "q5-val" }, s); t.textContent = f.v;
        t = svg("text", { x: cx, y: base + 20, "text-anchor": "middle", "class": "q5-lbl" }, s); t.textContent = f.c + " " + Q.sub(R.todas[f.idx].f);
      });
    }
    function pinta() {
      var R = Q.reaccion(st.id), todas = R.todas, gs = gases(R), vol = st.modo === "vol", d = todas[st.j], obj = todas[st.k];
      ecu.innerHTML = ecuHtml(R);
      iV.parentNode.style.display = vol ? "none" : ""; sV0.el.style.display = vol ? "" : "none"; sP.el.style.display = sT.el.style.display = vol ? "none" : "";
      cuerpo.querySelector("[data-uni]").style.display = vol ? "none" : "";
      if (vol) {
        tabla.innerHTML = "";
        if (gs.length < 2) { lienzo.innerHTML = ""; lectura.innerHTML = fil("Aquí hay un solo gas", "Los volúmenes sólo se comparan entre gases: usa el modo «PV = nRT» o elige otra reacción.", "red ancho"); pie.innerHTML = ""; return; }
        var unit = st.V0 / d.c, filas = gs.map(function (i) { return { idx: i, c: todas[i].c, v: fmt(unit * todas[i].c, 2) + " L" }; });
        cilindros(R, filas, "Columnas de volumen de cada gas, proporcionales a los coeficientes");
        lectura.innerHTML = fil("Relación de volúmenes", gs.map(function (i) { return todas[i].c; }).join(" : ") + " (los coeficientes de los gases)", "pen ancho") + gs.map(function (i, k) { return fil("V(" + Q.sub(todas[i].f) + ")", fmt(unit * todas[i].c, 3) + " L" + (i === st.j ? " (dato)" : " = " + fmt(st.V0, 1) + " · " + todas[i].c + "/" + d.c), i === st.j ? "pen" : "ok"); }).join("") +
          fil("Condiciones", "mismas P y T para todos los gases (hipótesis de Avogadro: a igual P y T, igual volumen ⇔ igual nº de moléculas)", "ancho");
        pie.innerHTML = "<b>Ley de Gay-Lussac de los volúmenes de combinación:</b> si todos los gases se miden a la misma presión y temperatura, sus volúmenes están en la misma relación que sus coeficientes. Cada «bloque» del dibujo es un volumen de la ecuación. No hace falta ni la masa molar ni R.";
        return;
      }
      var v = Q.num(st.v), T = st.Tc + K, Md = Q.masaMolar(d.f);
      if (isNaN(v) || v < 0) { tabla.innerHTML = ""; lienzo.innerHTML = ""; lectura.innerHTML = fil("Revisa la cantidad", "escribe un número positivo", "red ancho"); return; }
      var n0 = st.u === "g" ? v / Md : st.u === "mol" ? v : Q.moles(st.P, v, T), xi = n0 / d.c;
      var VPT = function (n) { return Q.volumen(n, T, st.P); };
      tabla.innerHTML = "<table class='fo-t q5-t'><thead><tr><th>Sustancia</th><th>Coef.</th><th>Moles</th><th>Masa (g)</th><th>V a " + fmt(st.P, 1) + " atm y " + fmt(st.Tc, 0) + " °C (L)</th><th>V en CN (L)</th></tr></thead><tbody>" +
        todas.map(function (x, k) { var n = xi * x.c; return "<tr class='" + (k === st.j ? "izq" : "") + "'><th>" + Q.sub(x.f) + Q.simboloEstado(x.e) + "</th><td>" + x.c + "</td><td>" + fmt(n, 4) + "</td><td>" + fmt(n * Q.masaMolar(x.f), 3) + "</td><td>" + (x.e === "g" ? fmt(VPT(n), 3) : "—") + "</td><td>" + (x.e === "g" ? fmt(n * Q.VM, 3) : "—") + "</td></tr>"; }).join("") + "</tbody></table>";
      var fg = gs.map(function (i) { var n = xi * todas[i].c; return { idx: i, c: todas[i].c, v: fmt(VPT(n), 2) + " L" }; });
      if (fg.length) cilindros(R, fg, "Volumen de cada gas a la presión y temperatura elegidas; cada bloque es un coeficiente"); else lienzo.innerHTML = "";
      var p1 = st.u === "g" ? "n(" + Q.sub(d.f) + ") = m/M = " + fmt(v, 3) + " / " + fmt(Md, 2) + " = " + fmt(n0, 4) + " mol" : st.u === "mol" ? "n(" + Q.sub(d.f) + ") = " + fmt(n0, 4) + " mol" : "n(" + Q.sub(d.f) + ") = PV/(RT) = " + fmt(st.P, 1) + "·" + fmt(v, 2) + " / (0,082·" + (st.Tc + K) + ") = " + fmt(n0, 4) + " mol";
      var nO = xi * obj.c, p2 = st.k === st.j ? "" : "<br>n(" + Q.sub(obj.f) + ") = " + fmt(n0, 4) + " · " + obj.c + "/" + d.c + " = " + fmt(nO, 4) + " mol";
      var p3 = "<br>m(" + Q.sub(obj.f) + ") = " + fmt(nO, 4) + " · " + fmt(Q.masaMolar(obj.f), 2) + " = <b>" + fmt(nO * Q.masaMolar(obj.f), 3) + " g</b>" + (obj.e === "g" ? "<br>V = nRT/P = " + fmt(nO, 4) + " · 0,082 · " + T + " / " + fmt(st.P, 1) + " = <b>" + fmt(VPT(nO), 3) + " L</b> (a esa P y T)" : "");
      lectura.innerHTML = fil("Cadena de cálculo", p1 + p2 + p3, "pen ancho") + fil("T en kelvin", fmt(st.Tc, 0) + " °C + 273 = " + T + " K", "ancho");
      pie.innerHTML = "Con gases fuera de condiciones normales no sirve el «22,4 L/mol»: pasa el dato a <b>moles</b> (con n = PV/RT si es un gas), aplica la proporción de la ecuación y, si piden un volumen de gas, vuelve con <b>V = nRT/P</b>. La temperatura siempre en <b>kelvin</b>.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "vol", t: "Sólo gases: volúmenes (Gay-Lussac)" }, { k: "pvnrt", t: "Cualquier dato: moles, masa y PV = nRT" }], "vol", function (k) { st.modo = k; armar(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); armar();
  };

  // ============================================================
  // DISOLUCIONES: neutralización, precipitación y gases desprendidos
  // ============================================================
  var DISR = ["neut1", "neut2", "agcl", "pbi2", "caco3pp", "zinc", "carbonato", "cobre"];
  B.w.q5_disoluciones = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Reacciones en disolución: ¿qué se forma y qué sobra?");
    cuerpo.innerHTML = '<div data-ctl></div><div data-sl></div><div class="q5-ecu"></div><div class="w-plot q5-graf-c"></div><div class="q5-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { id: "neut1", V: [100, 80], M: [0.5, 0.5], m: [10, 10] }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), slH = U.ctl(cuerpo.querySelector("[data-sl]")), ecu = cuerpo.querySelector(".q5-ecu"), lienzo = cuerpo.querySelector(".q5-graf-c"), tabla = cuerpo.querySelector(".q5-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.selector(ctl, "Reacción:", DISR.map(function (id) { return { k: id, t: Q.reaccion(id).t }; }), st.id, function (k) { st.id = k; defecto(); armar(); });
    var sl = [];
    function defecto() { var R = Q.reaccion(st.id); st.V = [100, 80]; st.M = [0.5, 0.5]; st.m = [10, 10]; if (st.id === "neut2") st.M = [0.5, 0.8]; if (st.id === "zinc") st.m[0] = 5; if (st.id === "carbonato") st.m[0] = 10; if (st.id === "cobre") st.m[0] = 2; }
    function armar() {
      var R = Q.reaccion(st.id); slH.innerHTML = ""; sl = [];
      R.r.forEach(function (x, k) {
        var o = {};
        if (x.e === "aq") {
          o.V = U.slider(slH, { et: "Volumen de " + Q.sub(x.f), min: 10, max: 500, step: 5, val: st.V[k], fmt: function (v) { return fmt(v, 0) + " mL"; }, on: function (v) { st.V[k] = v; pinta(); } });
          o.M = U.slider(slH, { et: "Molaridad de " + Q.sub(x.f), min: 0.05, max: 3, step: 0.05, val: st.M[k], fmt: function (v) { return fmt(v, 2) + " M"; }, on: function (v) { st.M[k] = v; pinta(); } });
        } else o.m = U.slider(slH, { et: "Masa de " + Q.sub(x.f), min: 0, max: 60, step: 0.5, val: st.m[k], fmt: function (v) { return fmt(v, 1) + " g"; }, on: function (v) { st.m[k] = v; pinta(); } });
        sl.push(o);
      });
      pinta();
    }
    function pinta() {
      var R = Q.reaccion(st.id), todas = R.todas, nR = R.r.length, M = todas.map(function (x) { return Q.masaMolar(x.f); });
      ecu.innerHTML = ecuHtml(R);
      var n0 = R.r.map(function (x, k) { return x.e === "aq" ? st.M[k] * st.V[k] / 1000 : st.m[k] / M[k]; }), raz = n0.map(function (n, k) { return n / R.r[k].c; }), xi = Math.min(raz[0], raz[1]), lim = Math.abs(raz[0] - raz[1]) < 1e-9 ? -1 : raz[0] < raz[1] ? 0 : 1;
      var ini = todas.map(function (x, k) { return k < nR ? n0[k] : 0; }), fin = todas.map(function (x, k) { return k < nR ? Math.max(0, n0[k] - x.c * xi) : x.c * xi; });
      Q.grafAntesDespues(lienzo, todas, ini, fin, "mol");
      var Vtot = 0; R.r.forEach(function (x, k) { if (x.e === "aq") Vtot += st.V[k]; });
      tabla.innerHTML = "<table class='fo-t q5-t'><thead><tr><th>Reactivo</th><th>Datos</th><th>Moles</th><th>Moles ÷ coef.</th><th>Veredicto</th></tr></thead><tbody>" +
        R.r.map(function (x, k) { return "<tr class='" + (k === lim ? "izq" : "") + "'><th>" + Q.sub(x.f) + Q.simboloEstado(x.e) + "</th><td>" + (x.e === "aq" ? fmt(st.M[k], 2) + " M · " + fmt(st.V[k], 0) + " mL" : fmt(st.m[k], 1) + " g") + "</td><td>" + fmt(n0[k], 4) + "</td><td>" + fmt(raz[k], 4) + "</td><td>" + (lim === -1 ? "proporción exacta" : k === lim ? "LIMITANTE" : "en exceso") + "</td></tr>"; }).join("") + "</tbody></table>";
      var l = "";
      if (xi <= 0) l = fil("Resultado", "No hay reacción: falta algún reactivo.", "red ancho");
      else {
        l = fil("Reactivo limitante", lim === -1 ? "ninguno (proporción exacta)" : Q.sub(R.r[lim].f), "red") + fil("La reacción ocurre", fmt(xi, 4) + " veces", "pen");
        R.p.forEach(function (x, k) {
          var n = x.c * xi, m = n * M[nR + k], txt = fmt(n, 4) + " mol = " + fmt(m, 3) + " g";
          if (x.e === "g") txt += " = " + fmt(n * Q.VM, 3) + " L en CN"; else if (x.e === "aq" && Vtot > 0) txt += " → concentración final " + fmt(n / (Vtot / 1000), 4) + " M (en " + fmt(Vtot, 0) + " mL)";
          l += fil("Se forma " + Q.sub(x.f) + Q.simboloEstado(x.e), txt, x.e === "s" ? "ok ancho" : "ancho");
        });
        if (lim !== -1) { var e = 1 - lim; l += fil("Sobra de " + Q.sub(R.r[e].f), fmt(fin[e], 4) + " mol = " + fmt(fin[e] * M[e], 3) + " g", "ancho"); }
        if (R.r[0].e === "aq" && R.r[1].e === "aq") { var VB = n0[0] / R.r[0].c * R.r[1].c / st.M[1] * 1000; l += fil("Volumen de " + Q.sub(R.r[1].f) + " para reaccionar justo con todo el " + Q.sub(R.r[0].f), fmt(VB, 2) + " mL (con ese volumen no sobra ninguno de los dos)", "pen ancho"); }
      }
      lectura.innerHTML = l;
      pie.innerHTML = "En disolución, los moles salen de <b>n = M·V</b> (V en litros); un sólido se pasa a moles con <b>n = m/M</b>. Después todo es igual: divide entre el coeficiente, busca el limitante y calcula lo que se forma. Un <b>precipitado</b> es un producto sólido (s); un <b>gas</b> se desprende (g).";
    }
    Q.escuchas.push({ el: cuerpo, f: pinta }); defecto(); armar();
  };

  // ============================================================
  // COMBUSTIÓN: oxígeno, aire, CO₂ y agua
  // ============================================================
  var COMB = [
    { f: "CH4", t: "Metano (gas natural)" }, { f: "C2H6", t: "Etano" }, { f: "C3H8", t: "Propano" }, { f: "C4H10", t: "Butano" }, { f: "C8H18", t: "Octano (gasolina)" }, { f: "C2H5OH", t: "Etanol" }, { f: "C2H2", t: "Acetileno" }, { f: "C6H12O6", t: "Glucosa" }
  ];
  function combustion(f, completa) { var A = Q.ajustar([f, "O2"], [completa ? "CO2" : "CO", "H2O"]); return A.ok ? A.coefs : null; }
  B.w.q5_combustion = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Quemar combustibles: oxígeno, aire y CO₂");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div data-ctl></div><div class="q5-ecu"></div><div class="lectura anch"></div><div class="q5-dato-t">CO₂ que se emite por cada kilogramo de combustible (combustión completa)</div><div class="q5-barras"></div><p class="w-pie"></p>';
    var st = { i: 4, completa: true, m: 1000 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ecu = cuerpo.querySelector(".q5-ecu"), lectura = cuerpo.querySelector(".lectura"), barras = cuerpo.querySelector(".q5-barras"), pie = cuerpo.querySelector(".w-pie");
    var sm = U.slider(ctl, { et: "Masa de combustible", min: 10, max: 5000, step: 10, val: st.m, fmt: function (v) { return v >= 1000 ? fmt(v / 1000, 2) + " kg" : fmt(v, 0) + " g"; }, on: function (v) { st.m = v; pinta(); } });
    function pinta() {
      var c = COMB[st.i], co = combustion(c.f, st.completa), M = Q.masaMolar(c.f), prod = st.completa ? "CO2" : "CO";
      if (!co) { lectura.innerHTML = fil("No se puede ajustar", "revisa la fórmula", "red ancho"); return; }
      var R = { r: [{ f: c.f, c: co[0], e: c.f === "C2H5OH" ? "l" : c.f === "C6H12O6" ? "s" : "g" }, { f: "O2", c: co[1], e: "g" }], p: [{ f: prod, c: co[2], e: "g" }, { f: "H2O", c: co[3], e: "l" }] };
      R.todas = R.r.concat(R.p);
      ecu.innerHTML = ecuHtml(R);
      var n = st.m / M, xi = n / co[0], nO = xi * co[1], nC = xi * co[2], nH = xi * co[3], MO = Q.masaMolar("O2"), Mc = Q.masaMolar(prod), Mw = Q.masaMolar("H2O");
      lectura.innerHTML = fil("Moles de " + Q.sub(c.f), fmt(st.m, 1) + " / " + fmt(M, 2) + " = " + fmt(n, 3) + " mol", "pen") + fil("Oxígeno necesario", fmt(nO, 3) + " mol = " + fmt(nO * MO, 1) + " g = " + fmt(nO * Q.VM, 1) + " L en CN", "ok") +
        fil("Aire necesario (21 % de O₂ en volumen)", fmt(nO * Q.VM / 0.21, 0) + " L en CN (unos " + fmt(nO * Q.VM / 0.21 / 1000, 2) + " m³)", "ancho") + fil("Se forma " + Q.sub(prod), fmt(nC, 3) + " mol = " + fmt(nC * Mc, 1) + " g = " + fmt(nC * Q.VM, 1) + " L en CN", "red ancho") +
        fil("Se forma agua", fmt(nH, 3) + " mol = " + fmt(nH * Mw, 1) + " g", "") + fil("Masa conservada", "reactivos " + fmt(st.m + nO * MO, 1) + " g → productos " + fmt(nC * Mc + nH * Mw, 1) + " g", "ancho");
      var datos = COMB.map(function (x, k) { var cc = combustion(x.f, true), Mx = Q.masaMolar(x.f); return { t: x.t, v: cc ? cc[2] * Q.masaMolar("CO2") / (cc[0] * Mx) : 0, k: k }; }), mx = Math.max.apply(null, datos.map(function (d) { return d.v; }));
      barras.innerHTML = datos.map(function (d) { return "<div class='q4-fila q5-fila" + (d.k === st.i ? " q5-sel" : "") + "'><span>" + d.t + "</span><span class='q4-bar' style='width:" + d.v / mx * 100 + "%;background:" + (d.k === st.i ? "var(--red)" : "var(--ink-faint)") + "'></span><span class='q4-num'>" + fmt(d.v, 2) + " kg</span></div>"; }).join("");
      pie.innerHTML = st.completa ? "En la <b>combustión completa</b> todo el carbono sale como CO₂ y todo el hidrógeno como H₂O. El oxígeno del aire es sólo un 21 % del volumen, por eso hace falta casi cinco veces más volumen de aire que de O₂. Ojo: comparar «kg de CO₂ por kg de combustible» no es comparar «CO₂ por energía obtenida» (eso lo verás en termoquímica)." : "En la <b>combustión incompleta</b> falta oxígeno y parte del carbono sale como <b>CO</b> (tóxico e inodoro): se gasta menos O₂ y se aprovecha menos energía. Por eso hay que ventilar estufas y calderas.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), COMB.map(function (c, i) { return { k: String(i), t: c.t }; }), String(st.i), function (k) { st.i = +k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "c", t: "Combustión completa (CO₂)" }, { k: "i", t: "Combustión incompleta (CO)" }], "c", function (k) { st.completa = k === "c"; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // PRÁCTICA: generador de problemas de estequiometría
  // ============================================================
  var LISTA1 = ["haber", "agua", "metano", "propano", "magnesio", "zinc", "aluminio", "oxido", "caliza", "clorato", "termita", "sodio", "carbonato", "altohorno", "butano", "co"];
  var DOS = ["agua", "haber", "metano", "hierroS", "magnesio", "zinc", "termita", "oxido", "etanol", "co", "carbono"];
  var GSOL = [["caliza", 0, 1], ["clorato", 0, 2], ["zinc", 0, 3], ["carbonato", 0, 2], ["airbag", 0, 2], ["oxigenada", 0, 2], ["magnesio", 0, 0]];
  var AJ = ["N2 + H2 -> NH3", "CH4 + O2 -> CO2 + H2O", "C3H8 + O2 -> CO2 + H2O", "Fe + O2 -> Fe2O3", "Al + HCl -> AlCl3 + H2", "KClO3 -> KCl + O2", "Fe2O3 + CO -> Fe + CO2", "Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O", "C6H12O6 + O2 -> CO2 + H2O", "NH3 + O2 -> NO + H2O", "C4H10 + O2 -> CO2 + H2O", "Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", "FeS2 + O2 -> Fe2O3 + SO2"];
  function sub(f) { return Q.sub(f); }
  var GEN = [
    function () {                                               // mol-mol
      var R = Q.reaccion(elige(LISTA1)), t = R.todas, j = Math.floor(Math.random() * t.length), k; do { k = Math.floor(Math.random() * t.length); } while (k === j);
      var n = elige([0.5, 1, 2, 3, 4, 5, 6, 8]), r = n * t[k].c / t[j].c, enR = function (i) { return i < R.r.length; };
      var q = enR(j) && !enR(k) ? "Cuando reaccionan " + n + " mol de " + sub(t[j].f) + ", ¿cuántos <b>moles</b> de " + sub(t[k].f) + " se forman?" : enR(j) && enR(k) ? "¿Cuántos <b>moles</b> de " + sub(t[k].f) + " reaccionan con " + n + " mol de " + sub(t[j].f) + "?" : !enR(j) && enR(k) ? "Para obtener " + n + " mol de " + sub(t[j].f) + ", ¿cuántos <b>moles</b> de " + sub(t[k].f) + " hacen falta?" : "Si se forman " + n + " mol de " + sub(t[j].f) + ", ¿cuántos <b>moles</b> de " + sub(t[k].f) + " se forman a la vez?";
      return { q: Q.textoReac(R) + "<br>" + q, r: r, u: "mol", pasos: ["Proporción de la ecuación: " + t[k].c + " mol de " + sub(t[k].f) + " por cada " + t[j].c + " mol de " + sub(t[j].f), "n = " + n + " · " + t[k].c + "/" + t[j].c + " = " + fmt(r, 4) + " mol"] };
    },
    function () {                                               // masa-masa
      var R = Q.reaccion(elige(LISTA1)), t = R.todas, j = Math.floor(Math.random() * t.length), k; do { k = Math.floor(Math.random() * t.length); } while (k === j);
      var m = elige([10, 20, 25, 40, 50, 80, 100, 150, 200]), Mj = Q.masaMolar(t[j].f), Mk = Q.masaMolar(t[k].f), nj = m / Mj, nk = nj * t[k].c / t[j].c, r = nk * Mk;
      return { q: Q.textoReac(R) + "<br>¿Cuántos <b>gramos</b> de " + sub(t[k].f) + " corresponden (se consumen o se forman, según el caso) a " + m + " g de " + sub(t[j].f) + "? (Masas de examen.)", r: r, u: "g", pasos: ["n(" + sub(t[j].f) + ") = " + m + " / " + fmt(Mj, 2) + " = " + fmt(nj, 4) + " mol", "n(" + sub(t[k].f) + ") = " + fmt(nj, 4) + " · " + t[k].c + "/" + t[j].c + " = " + fmt(nk, 4) + " mol", "m = " + fmt(nk, 4) + " · " + fmt(Mk, 2) + " = " + fmt(r, 3) + " g"] };
    },
    function () {                                               // limitante en moles
      var R = Q.reaccion(elige(DOS)), a = entre(1, 8, 1) / 2, b = entre(1, 8, 1) / 2, ra = a / R.r[0].c, rb = b / R.r[1].c, xi = Math.min(ra, rb), p = R.p[0], r = xi * p.c;
      return { q: Q.textoReac(R) + "<br>Se mezclan " + fmt(a, 1) + " mol de " + sub(R.r[0].f) + " con " + fmt(b, 1) + " mol de " + sub(R.r[1].f) + ". ¿Cuántos <b>moles</b> de " + sub(p.f) + " se forman como máximo?", r: r, u: "mol", pasos: ["Moles ÷ coeficiente: " + sub(R.r[0].f) + ": " + fmt(a, 1) + "/" + R.r[0].c + " = " + fmt(ra, 3) + " · " + sub(R.r[1].f) + ": " + fmt(b, 1) + "/" + R.r[1].c + " = " + fmt(rb, 3), "El limitante es " + sub(ra <= rb ? R.r[0].f : R.r[1].f) + " (cociente menor)", "n(" + sub(p.f) + ") = " + fmt(xi, 3) + " · " + p.c + " = " + fmt(r, 4) + " mol"] };
    },
    function () {                                               // limitante con masas
      var R = Q.reaccion(elige(DOS)), M0 = Q.masaMolar(R.r[0].f), M1 = Q.masaMolar(R.r[1].f), m0 = entre(10, 100, 5), m1 = entre(10, 100, 5), n0 = m0 / M0, n1 = m1 / M1, xi = Math.min(n0 / R.r[0].c, n1 / R.r[1].c), p = R.p[0], Mp = Q.masaMolar(p.f), r = xi * p.c * Mp;
      return { q: Q.textoReac(R) + "<br>Se hacen reaccionar " + m0 + " g de " + sub(R.r[0].f) + " con " + m1 + " g de " + sub(R.r[1].f) + ". ¿Cuántos <b>gramos</b> de " + sub(p.f) + " se obtienen? (Masas de examen.)", r: r, u: "g", pasos: ["n(" + sub(R.r[0].f) + ") = " + m0 + "/" + fmt(M0, 2) + " = " + fmt(n0, 4) + " mol · n(" + sub(R.r[1].f) + ") = " + m1 + "/" + fmt(M1, 2) + " = " + fmt(n1, 4) + " mol", "÷ coef.: " + fmt(n0 / R.r[0].c, 4) + " y " + fmt(n1 / R.r[1].c, 4) + " → limitante " + sub(n0 / R.r[0].c <= n1 / R.r[1].c ? R.r[0].f : R.r[1].f), "m(" + sub(p.f) + ") = " + fmt(xi, 4) + " · " + p.c + " · " + fmt(Mp, 2) + " = " + fmt(r, 3) + " g"] };
    },
    function () {                                               // rendimiento
      var d = elige(RE), R = Q.reaccion(d.id), re = R.todas[d.r], pr = R.todas[d.p], m = elige([50, 100, 200, 500]), eta = elige([60, 70, 75, 80, 85, 90]), nR = m / Q.masaMolar(re.f), mT = nR * pr.c / re.c * Q.masaMolar(pr.f), r = mT * eta / 100;
      return { q: Q.textoReac(R) + "<br>Se parte de " + m + " g de " + sub(re.f) + " y la reacción tiene un rendimiento del " + eta + " %. ¿Qué masa (en gramos) de " + sub(pr.f) + " se obtiene realmente?", r: r, u: "g", pasos: ["n(" + sub(re.f) + ") = " + m + "/" + fmt(Q.masaMolar(re.f), 2) + " = " + fmt(nR, 4) + " mol", "Masa teórica de " + sub(pr.f) + " = " + fmt(mT, 3) + " g", "Masa real = " + fmt(mT, 3) + " · " + eta + "/100 = " + fmt(r, 3) + " g"] };
    },
    function () {                                               // pureza
      var d = elige(RE.filter(function (x) { return x.id !== "haber"; })), R = Q.reaccion(d.id), re = R.todas[d.r], pr = R.todas[d.p], m = elige([100, 200, 250, 500, 1000]), pur = elige([70, 75, 80, 85, 90, 95]), mp = m * pur / 100, nR = mp / Q.masaMolar(re.f), r = nR * pr.c / re.c * Q.masaMolar(pr.f);
      return { q: Q.textoReac(R) + "<br>Una muestra de " + m + " g de " + sub(re.f) + " tiene una pureza del " + pur + " %. Suponiendo un rendimiento del 100 %, ¿cuántos <b>gramos</b> de " + sub(pr.f) + " se obtienen?", r: r, u: "g", pasos: ["Masa de " + sub(re.f) + " puro = " + m + " · " + pur + "/100 = " + fmt(mp, 3) + " g", "n = " + fmt(mp, 3) + "/" + fmt(Q.masaMolar(re.f), 2) + " = " + fmt(nR, 4) + " mol", "m(" + sub(pr.f) + ") = " + fmt(nR, 4) + " · " + pr.c + "/" + re.c + " · " + fmt(Q.masaMolar(pr.f), 2) + " = " + fmt(r, 3) + " g"] };
    },
    function () {                                               // volumen de gas en CN
      var g = elige(GSOL.slice(0, 6)), R = Q.reaccion(g[0]), re = R.todas[g[1]], pr = R.todas[g[2]], m = elige([10, 20, 25, 50, 100]), nR = m / Q.masaMolar(re.f), n = nR * pr.c / re.c, r = n * Q.VM;
      return { q: Q.textoReac(R) + "<br>Al reaccionar " + m + " g de " + sub(re.f) + ", ¿qué <b>volumen</b> (litros) de " + sub(pr.f) + " se obtiene medido en condiciones normales? (22,4 L/mol)", r: r, u: "L", pasos: ["n(" + sub(re.f) + ") = " + m + "/" + fmt(Q.masaMolar(re.f), 2) + " = " + fmt(nR, 4) + " mol", "n(" + sub(pr.f) + ") = " + fmt(nR, 4) + " · " + pr.c + "/" + re.c + " = " + fmt(n, 4) + " mol", "V = n·22,4 = " + fmt(r, 3) + " L"] };
    },
    function () {                                               // volumen de gas a P y T
      var g = elige(GSOL.slice(0, 6)), R = Q.reaccion(g[0]), re = R.todas[g[1]], pr = R.todas[g[2]], m = elige([10, 20, 25, 50, 100]), P = elige([0.8, 1, 1.5, 2]), Tc = elige([0, 20, 25, 27, 50, 100]), nR = m / Q.masaMolar(re.f), n = nR * pr.c / re.c, r = n * Q.R * (Tc + K) / P;
      return { q: Q.textoReac(R) + "<br>Al reaccionar " + m + " g de " + sub(re.f) + ", ¿qué <b>volumen</b> (litros) de " + sub(pr.f) + " se obtiene a " + fmt(P, 1) + " atm y " + Tc + " °C? (R = 0,082 atm·L/(mol·K); K = °C + 273)", r: r, u: "L", pasos: ["n(" + sub(pr.f) + ") = " + fmt(n, 4) + " mol (por estequiometría)", "T = " + Tc + " + 273 = " + (Tc + K) + " K", "V = nRT/P = " + fmt(n, 4) + " · 0,082 · " + (Tc + K) + " / " + fmt(P, 1) + " = " + fmt(r, 3) + " L"] };
    },
    function () {                                               // precipitado
      var R = Q.reaccion(elige(["agcl", "pbi2", "caco3pp"])), re = R.r[0], pr = R.p[0], V =elige([50, 100, 150, 200, 250]), Mm = elige([0.1, 0.2, 0.25, 0.5, 1]), n = Mm * V / 1000, nn = n * pr.c / re.c, r = nn * Q.masaMolar(pr.f);
      return { q: Q.textoReac(R) + "<br>A " + V + " mL de disolución " + fmt(Mm, 2) + " M de " + sub(re.f) + " se le añade un exceso de " + sub(R.r[1].f) + ". ¿Cuántos <b>gramos</b> de " + sub(pr.f) + " precipitan?", r: r, u: "g", pasos: ["n(" + sub(re.f) + ") = M·V = " + fmt(Mm, 2) + " · " + fmt(V / 1000, 3) + " = " + fmt(n, 4) + " mol", "n(" + sub(pr.f) + ") = " + fmt(n, 4) + " · " + pr.c + "/" + re.c + " = " + fmt(nn, 4) + " mol", "m = " + fmt(nn, 4) + " · " + fmt(Q.masaMolar(pr.f), 2) + " = " + fmt(r, 3) + " g"] };
    },
    function () {                                               // volumen de disolución para neutralizar
      var d = elige(["neut1", "neut2"]), R = Q.reaccion(d), V1 = elige([20, 25, 50, 100]), M1 = elige([0.1, 0.2, 0.5, 1]), M2 = elige([0.1, 0.25, 0.5, 1, 2]), n1 = M1 * V1 / 1000, n2 = n1 * R.r[1].c / R.r[0].c, r = n2 / M2 * 1000;
      return { q: Q.textoReac(R) + "<br>¿Qué <b>volumen</b> (mL) de " + sub(R.r[1].f) + " " + fmt(M2, 2) + " M hace falta para neutralizar justo " + V1 + " mL de " + sub(R.r[0].f) + " " + fmt(M1, 2) + " M?", r: r, u: "mL", pasos: ["n(" + sub(R.r[0].f) + ") = " + fmt(M1, 2) + " · " + fmt(V1 / 1000, 3) + " = " + fmt(n1, 4) + " mol", "n(" + sub(R.r[1].f) + ") = " + fmt(n1, 4) + " · " + R.r[1].c + "/" + R.r[0].c + " = " + fmt(n2, 4) + " mol", "V = n/M = " + fmt(n2, 4) + " / " + fmt(M2, 2) + " = " + fmt(n2 / M2, 5) + " L = " + fmt(r, 3) + " mL"] };
    },
    function () {                                               // suma de coeficientes
      var e = elige(AJ), E = Q.ecuacion(e), A = Q.ajustar(E.reactivos, E.productos), s = A.coefs.reduce(function (a, b) { return a + b; }, 0);
      return { q: "Ajusta la ecuación <b>" + Q.textoEcuacion(E.reactivos, E.productos, null) + "</b> con los coeficientes enteros más pequeños y escribe la <b>suma de todos los coeficientes</b>.", r: s, u: "", pasos: ["Ecuación ajustada: " + Q.textoEcuacion(E.reactivos, E.productos, A.coefs), "Suma: " + A.coefs.join(" + ") + " = " + s] };
    }
  ];
  B.w.q5_practica = function (host) {
    var cuerpo = B.caja(host, "Entrenamiento", "Generador de problemas de estequiometría");
    cuerpo.innerHTML = '<div class="q5-prob"></div><div data-ctl></div><div class="lectura anch"></div><div class="q5-sol" hidden></div><p class="w-pie">Cada pulsación crea un problema nuevo con otros números y otra reacción. Escribe tu resultado (con coma o punto decimal) y pulsa «Comprobar»; la tolerancia es del 1 %. Usa las masas atómicas de examen.</p>';
    var st = { p: null, racha: 0, aciertos: 0, total: 0 }, enun = cuerpo.querySelector(".q5-prob"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".q5-sol");
    var inp = Q.campo(ctl, "Tu respuesta", "", 150);
    function nuevo() {
      var prev = st.p, i; do { i = Math.floor(Math.random() * GEN.length); } while (prev && prev.i === i && GEN.length > 1);
      st.p = GEN[i](); st.p.i = i; enun.innerHTML = "<p class='q4-enun'>" + st.p.q + "</p>"; inp.value = ""; sol.hidden = true; sol.innerHTML = ""; lectura.innerHTML = marcador();
    }
    function marcador() { return fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.aciertos + " de " + st.total, "pen"); }
    function comprobar() {
      var v = Q.num(inp.value); if (isNaN(v)) { lectura.innerHTML = marcador() + fil("No entiendo tu respuesta", "escribe un número (puedes usar coma decimal)", "red ancho"); return; }
      var r = st.p.r, ok = Math.abs(v - r) <= 0.01 * Math.abs(r) + 1e-12; st.total++; if (ok) { st.aciertos++; st.racha++; } else st.racha = 0;
      lectura.innerHTML = marcador() + fil(ok ? "✓ Correcto" : "✗ Todavía no", ok ? "¡Bien! " + fmt(r, 4) + " " + st.p.u : "Revisa el planteamiento (¿ecuación ajustada? ¿todo en moles?); el resultado está en «Ver solución».", ok ? "ok ancho" : "red ancho");
      if (ok) verSol();
    }
    function verSol() { sol.hidden = false; sol.innerHTML = "<ol class='steps'>" + st.p.pasos.map(function (x) { return "<li class='step'><div class='math-line'>" + x + "</div></li>"; }).join("") + "</ol><div class='result-box'><span class='result-label'>Resultado</span>" + fmt(st.p.r, 4) + " " + st.p.u + "</div>"; }
    var acc = document.createElement("div"); acc.className = "ctl"; cuerpo.querySelector("[data-ctl]").parentNode.insertBefore(acc, lectura);
    U.boton(acc, "Comprobar", comprobar, "btn-comprobar"); U.boton(acc, "Ver solución", verSol); U.boton(acc, "Otro problema", nuevo);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); comprobar(); } });
    nuevo();
  };

  // ============================================================
  // MAPA: construye el plan de resolución según lo que dice el enunciado
  // ============================================================
  var RASGOS = [
    { k: "pur", t: "Dan una pureza o riqueza" },
    { k: "dos", t: "Dan cantidades de dos reactivos" },
    { k: "dis", t: "Hay una disolución con molaridad" },
    { k: "gas", t: "Hay un gas fuera de condiciones normales" },
    { k: "vol", t: "Piden el volumen de un gas" },
    { k: "eta", t: "Dan un rendimiento" }
  ];
  var EJEMPLOS = [
    { t: "Caliza impura y rendimiento", on: ["pur", "eta"], q: "«Se calientan 500 g de caliza del 90 % de riqueza en CaCO₃. Si el rendimiento es del 80 %, ¿cuántos gramos de CaO se obtienen?»" },
    { t: "Zinc con ácido y H₂ en el laboratorio", on: ["dis", "gas", "vol", "dos"], q: "«Se añaden 5 g de Zn a 100 mL de HCl 1 M. ¿Qué volumen de H₂ se recoge a 1,2 atm y 27 °C?»" },
    { t: "Dos masas de reactivos", on: ["dos"], q: "«Se mezclan 28 g de N₂ con 10 g de H₂. ¿Cuántos gramos de NH₃ se forman?»" },
    { t: "Gas en condiciones normales", on: ["vol"], q: "«¿Qué volumen de CO₂ en condiciones normales se obtiene al descomponer 50 g de CaCO₃?»" },
    { t: "Precipitado en disolución", on: ["dis", "dos"], q: "«Se mezclan 100 mL de AgNO₃ 0,5 M con 100 mL de NaCl 0,25 M. ¿Qué masa de AgCl precipita?»" }
  ];
  B.w.q5_mapa = function (host) {
    var cuerpo = B.caja(host, "Método", "Construye el plan de resolución de tu problema");
    cuerpo.innerHTML = '<div class="q5-dato-t">Ejemplos para probar</div><div data-ej class="chips"></div><div class="q5-enunc" aria-live="polite"></div><div class="q5-dato-t">¿Qué aparece en el enunciado? (pulsa los que sean)</div><div data-r class="q5-rasgos"></div><div class="q5-dato-t">Tu plan, paso a paso</div><ol class="steps q5-plan" aria-live="polite"></ol><p class="w-pie"></p>';
    var st = { on: {}, ej: -1 }, rasgos = cuerpo.querySelector("[data-r]"), plan = cuerpo.querySelector(".q5-plan"), enunc = cuerpo.querySelector(".q5-enunc"), pie = cuerpo.querySelector(".w-pie");
    function renderRasgos() {
      rasgos.innerHTML = RASGOS.map(function (r) { return "<button type='button' class='chip-btn" + (st.on[r.k] ? " on" : "") + "' data-k='" + r.k + "' aria-pressed='" + !!st.on[r.k] + "'>" + r.t + "</button>"; }).join("");
    }
    rasgos.addEventListener("click", function (e) { var b = e.target.closest("[data-k]"); if (!b) return; st.on[b.getAttribute("data-k")] = !st.on[b.getAttribute("data-k")]; st.ej = -1; renderRasgos(); pinta(); });
    function pinta() {
      var o = st.on, p = [];
      enunc.innerHTML = st.ej >= 0 ? "<blockquote>" + EJEMPLOS[st.ej].q + "</blockquote>" : "";
      p.push("<b>Ajusta la ecuación.</b> Comprueba átomo a átomo; sin coeficientes correctos todo lo demás falla.");
      if (o.pur) p.push("<b>Corrige la pureza.</b> m(puro) = m(muestra) · (% pureza/100). Sólo el reactivo impuro se corrige.");
      if (o.dis) p.push("<b>Moles de la disolución:</b> n = M · V(L). Si en vez de molaridad te dan % y densidad, pasa antes a molaridad.");
      p.push("<b>Pasa todos los datos a moles</b> (n = m/M para sólidos y líquidos" + (o.gas ? "; n = PV/RT para el gas, con T en K" : "; n = V/22,4 si son litros de gas en CN") + ").");
      if (o.dos) p.push("<b>Busca el limitante:</b> divide los moles de cada reactivo entre su coeficiente; el menor cociente es el limitante. A partir de aquí calcula siempre con él.");
      p.push("<b>Aplica la proporción de la ecuación</b> con el reactivo " + (o.dos ? "limitante" : "dato") + ": n(buscada) = n(dato) · coef(buscada)/coef(dato).");
      if (o.vol) p.push(o.gas ? "<b>Calcula el volumen del gas</b> con V = nRT/P (T en kelvin; R = 0,082 atm·L/(mol·K))." : "<b>Calcula el volumen del gas en CN:</b> V = n · 22,4 L/mol.");
      else p.push("<b>Pasa los moles a la unidad que piden:</b> masa (m = n·M), número de partículas (N = n·N<sub>A</sub>) o concentración.");
      if (o.eta) p.push("<b>Aplica el rendimiento al final:</b> cantidad real = cantidad teórica · (% rendimiento/100).");
      p.push("<b>Revisa:</b> unidades, cifras significativas y que el resultado sea razonable (¿sale más producto que masa total de reactivos?).");
      plan.innerHTML = p.map(function (x) { return "<li class='step'><div class='math-line'>" + x + "</div></li>"; }).join("");
      pie.innerHTML = "El orden importa: <b>pureza → moles → limitante → proporción → unidad pedida → rendimiento</b>. Pasos que no aparecen en el enunciado, se saltan.";
    }
    U.fichas(cuerpo.querySelector("[data-ej]"), EJEMPLOS.map(function (e, i) { return { k: String(i), t: e.t }; }), "-1", function (k) { st.ej = +k; st.on = {}; EJEMPLOS[st.ej].on.forEach(function (x) { st.on[x] = true; }); renderRasgos(); pinta(); });
    renderRasgos(); pinta();
  };
})(window);
