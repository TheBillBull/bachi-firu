/* ============================================================
   Bachi para Firu · Química II, tema 3: Sistema periódico
   Reutiliza el motor B.lab.quim de lab_atomo.js (elementos, configuraciones) y añade:
   Q.slater (carga nuclear efectiva) · q3_zef · q3_anomalias · q3_radios
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.quim, EL = Q.EL;
  function fil(r, v, c) { return U.lec(r, v, c); }

  // ------------------------------------------------------------
  // Reglas de Slater. cfg = [{n, l, e}] ; se calcula para el electrón más externo
  //  ns, np : mismo grupo 0,35 (1s: 0,30) · capa n−1: 0,85 · capas n−2 y menores: 1,00
  //  nd, nf : mismo grupo 0,35 · todos los grupos de la izquierda: 1,00
  // ------------------------------------------------------------
  Q.slater = function (Z, cfg) {
    var nmax = 0, lmax = 0, N = 0, i;
    cfg.forEach(function (s) { N += s.e; if (s.n > nmax || (s.n === nmax && s.l > lmax)) { nmax = s.n; lmax = s.l; } });
    var esD = lmax >= 2, mismo = 0, capaN1 = 0, resto = 0, izq = 0, parts = [];
    cfg.forEach(function (s) {
      var e = s.e, igual = s.n === nmax && (esD ? s.l === lmax : s.l <= 1);
      if (igual) { mismo += e; return; }
      if (esD) { izq += e; return; }
      if (s.n === nmax - 1) capaN1 += e; else if (s.n < nmax - 1) resto += e; else izq += e;   // izq: caso imposible
    });
    mismo -= 1;                                            // el propio electrón no se cuenta
    var cm = nmax === 1 ? 0.30 : 0.35, sigma;
    if (esD) { sigma = cm * mismo + 1.0 * izq; parts = [[mismo, cm, "mismo grupo"], [izq, 1.0, "grupos a la izquierda"]]; }
    else { sigma = cm * mismo + 0.85 * capaN1 + 1.0 * resto; parts = [[mismo, cm, "mismo grupo (n = " + nmax + ")"], [capaN1, 0.85, "capa n = " + (nmax - 1)], [resto, 1.0, "capas internas"]]; }
    return { n: nmax, l: lmax, N: N, sigma: sigma, zef: Z - sigma, partes: parts };
  };
  var LET = ["s", "p", "d", "f"];
  Q.etqSlater = function (r) { return r.n + LET[r.l]; };

  // ------------------------------------------------------------
  // Afinidad electrónica (kJ/mol, energía liberada al captar un e⁻; CRC/NIST).
  // null = no libera energía (el anión no es estable: Be, N, Mg y gases nobles)
  // ------------------------------------------------------------
  Q.AE = { 1: 73, 2: null, 3: 60, 4: null, 5: 27, 6: 122, 7: null, 8: 141, 9: 328, 10: null, 11: 53, 12: null, 13: 42, 14: 134, 15: 72, 16: 200, 17: 349, 18: null, 19: 48, 20: 2 };

  // Radios iónicos de Shannon (pm, índice de coordinación 6; el N³⁻ solo está tabulado con 4)
  Q.IONES = [
    { s: "N", Z: 7, q: -3, r: 146 }, { s: "O", Z: 8, q: -2, r: 140 }, { s: "F", Z: 9, q: -1, r: 133 }, { s: "Na", Z: 11, q: 1, r: 102 }, { s: "Mg", Z: 12, q: 2, r: 72 }, { s: "Al", Z: 13, q: 3, r: 53.5 },
    { s: "S", Z: 16, q: -2, r: 184 }, { s: "Cl", Z: 17, q: -1, r: 181 }, { s: "K", Z: 19, q: 1, r: 138 }, { s: "Ca", Z: 20, q: 2, r: 100 }, { s: "Sc", Z: 21, q: 3, r: 74.5 },
    { s: "Se", Z: 34, q: -2, r: 198 }, { s: "Br", Z: 35, q: -1, r: 196 }, { s: "Rb", Z: 37, q: 1, r: 152 }, { s: "Sr", Z: 38, q: 2, r: 118 }
  ];
  // Pares átomo → ion (radio covalente del átomo, de la tabla del tema 1; radio iónico de Shannon)
  Q.PARES = [
    { s: "Li", q: 1, r: 76 }, { s: "Na", q: 1, r: 102 }, { s: "K", q: 1, r: 138 }, { s: "Mg", q: 2, r: 72 }, { s: "Al", q: 3, r: 53.5 },
    { s: "O", q: -2, r: 140 }, { s: "F", q: -1, r: 133 }, { s: "S", q: -2, r: 184 }, { s: "Cl", q: -1, r: 181 }, { s: "Br", q: -1, r: 196 }
  ];

  // ============================================================
  // Q3_ZEF: carga nuclear efectiva (Slater)
  // ============================================================
  var COLP = ["#D14D72", "#E2A400", "#2E86DE", "#13804B"];
  B.w.q3_zef = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Carga nuclear efectiva (reglas de Slater)");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { Z: 11, q: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g, slZ, slQ;
    var neutros = EL.filter(function (e) { return e.Z <= 36; }).map(function (e) { return Q.slater(e.Z, Q.config(e.Z, true)); });
    slZ = U.slider(ctl, { et: "Elemento (<i>Z</i>)", min: 3, max: 36, step: 1, val: st.Z, on: function (v) { st.Z = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].s; } });
    slQ = U.slider(ctl, { et: "Carga del ion", min: -2, max: 3, step: 1, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return v === 0 ? "neutro" : (v > 0 ? "+" : "−") + Math.abs(v); } });
    function pinta() {
      var Z = st.Z, q = st.q, el = EL[Z - 1], cfg = Q.configIon(Z, q), N = Z - q;
      if (N < 1) { lectura.innerHTML = fil("Carga imposible", "no quedan electrones", "red"); return; }
      var r = Q.slater(Z, cfg), nombre = Q.ion(el.s, q);
      g.limpiar();
      [10, 18, 36].forEach(function (z) { g.segmento(z + 0.5, 0, z + 0.5, 12, { clase: "c-faint", dash: "3 5" }); });
      var prev = null;
      EL.forEach(function (e) {
        if (e.Z > 36 || e.Z < 3) return;
        var v = neutros[e.Z - 1].zef;
        if (prev && prev.p === e.p) g.segmento(prev.Z, neutros[prev.Z - 1].zef, e.Z, v, { clase: "c-faint" });
        prev = e;
        var pt = g.punto(e.Z, v, { r: 4, clase: "c-pen" }); pt.style.fill = COLP[["s", "p", "d", "f"].indexOf(Q.bloque(e.Z))];
      });
      g.punto(Z, r.zef, { r: 8, clase: "c-red" });
      g.texto(Z, r.zef, nombre + ": " + fmt(r.zef, 2), { dy: -12, ancla: "middle", clase: "red" });
      var filas = r.partes.filter(function (p) { return p[0] > 0; }).map(function (p) { return p[0] + " × " + fmt(p[1], 2) + " <small>(" + p[2] + ")</small>"; });
      lectura.innerHTML = fil("Átomo o ion", nombre + " · " + N + " e⁻", "pen") + fil("Configuración", Q.cfgTxt(cfg, true), "ancho") +
        fil("Electrón estudiado (el más externo)", Q.etqSlater(r), "ok") + fil("Apantallamiento σ", filas.join(" + ") + " = " + fmt(r.sigma, 2), "ancho") +
        fil("Z* = Z − σ", Z + " − " + fmt(r.sigma, 2) + " = " + fmt(r.zef, 2), "red");
      pie.innerHTML = "Puntos: <i>Z</i>* del electrón más externo de cada átomo neutro (colores: bloque s, p, d). En un periodo sube casi sin pausa porque cada electrón nuevo se añade <b>en la misma capa</b> y apantalla poco (0,35) mientras el núcleo gana un protón entero. Al empezar el periodo siguiente cae: el nuevo electrón está en una capa más lejos y los de dentro lo apantallan casi del todo. Modelo cualitativo: no esperes valores exactos.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 2, xmax: 37, ymin: 0, ymax: 12, w: 620, h: 300, etx: "Z", ety: "Z* (electrón más externo)", etiqueta: "Carga nuclear efectiva del electrón más externo en función de Z" });
    U.fichas(cuerpo.querySelector("[data-pre]"), [{ k: "11,0", t: "Na" }, { k: "11,1", t: "Na⁺" }, { k: "9,0", t: "F" }, { k: "9,-1", t: "F⁻" }, { k: "19,0", t: "K" }, { k: "26,0", t: "Fe (3d)" }], "11,0", function (k) {
      var p = k.split(","); st.Z = +p[0]; st.q = +p[1]; slZ.set(st.Z); slQ.set(st.q); pinta();
    });
    pinta();
  };

  // ============================================================
  // Q3_ANOMALIAS: anomalías de la energía de ionización y de la afinidad electrónica
  // ============================================================
  var ANOM = {
    ie: [
      { k: "be", t: "Be → B", a: 4, b: 5, txt: "El B (2s² 2p¹) pierde con facilidad su electrón 2p, que está algo más alto y más apantallado por los 2s², mientras que el Be (2s²) tendría que perder un electrón 2s, más penetrante y más ligado. Por eso EI(B) &lt; EI(Be) aunque B tenga un protón más." },
      { k: "n", t: "N → O", a: 7, b: 8, txt: "En el N (2p³) los tres electrones están desapareados, uno por orbital (semicapa llena, estable). En el O (2p⁴) hay un par apareado en un orbital: la repulsión entre esos dos electrones facilita arrancar uno. EI(O) &lt; EI(N)." },
      { k: "mg", t: "Mg → Al", a: 12, b: 13, txt: "Igual que Be → B, un periodo más abajo: el Al (3s² 3p¹) pierde un electrón 3p, más alto y más apantallado que los 3s² del Mg. EI(Al) &lt; EI(Mg)." },
      { k: "p", t: "P → S", a: 15, b: 16, txt: "Igual que N → O: el P (3p³) tiene la semicapa llena con tres electrones desapareados; el S (3p⁴) tiene un par apareado cuya repulsión facilita arrancar un electrón. EI(S) &lt; EI(P)." }
    ],
    ae: [
      { k: "bemg", t: "Be, N, Mg: ≈ 0", a: 4, b: 12, txt: "Be (2s²) y Mg (3s²) tienen el subnivel s completo: el electrón nuevo iría a un p, más alto y apantallado. El N (2p³) tiene la semicapa llena: el nuevo electrón tendría que aparearse y sufrir repulsión. En los tres, captar un electrón apenas libera energía (o hay que aportarla)." },
      { k: "nobles", t: "Gases nobles: ≈ 0", a: 10, b: 18, txt: "He, Ne y Ar tienen la capa de valencia completa: el electrón nuevo debe ir a la capa siguiente, lejos del núcleo y bien apantallado. No liberan energía: no forman aniones estables." },
      { k: "clf", t: "Cl &gt; F", a: 9, b: 17, txt: "Lo esperable sería que el F, más pequeño, tuviese la mayor afinidad. Pero en el F el electrón entra en una capa n = 2 muy compacta y siente fuerte repulsión de los 7 electrones ya presentes; en el Cl (n = 3) hay más espacio. Resultado: AE(Cl) = 349 &gt; AE(F) = 328 kJ/mol." }
    ]
  };
  B.w.q3_anomalias = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Energía de ionización y afinidad electrónica: los puntos que se salen de la tendencia");
    cuerpo.innerHTML = '<div data-prop class="chips"></div><div data-an class="chips"></div><div class="w-plot"></div><div class="q1-orbitales" data-orb></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { p: "ie", k: null }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), orb = cuerpo.querySelector("[data-orb]");
    function valor(Z) { return st.p === "ie" ? EL[Z - 1].ie : Q.AE[Z]; }
    function eligeAn() {
      U.fichas(cuerpo.querySelector("[data-an]"), [{ k: "", t: "Ver curva" }].concat(ANOM[st.p].map(function (a) { return { k: a.k, t: a.t }; })), st.k || "", function (k) { st.k = k || null; pinta(); });
    }
    function ultimos(Z) { return Q.config(Z, true).slice(-2).map(Q.cajasHTML).join(""); }
    function pinta() {
      var ie = st.p === "ie", top = ie ? 2600 : 380, an = ANOM[st.p].filter(function (a) { return a.k === st.k; })[0], Z;
      g.rango(0.4, 20.6, 0, top); g.limpiar();
      [2, 10, 18].forEach(function (z) { g.segmento(z + 0.5, 0, z + 0.5, top, { clase: "c-faint", dash: "3 5" }); });
      var prev = null;
      for (Z = 1; Z <= 20; Z++) {
        var v = valor(Z), z = EL[Z - 1], cero = v == null;
        if (cero) v = 0;
        if (prev && prev.p === z.p) g.segmento(prev.Z, prev.v, Z, v, { clase: "c-faint" });
        prev = { Z: Z, v: v, p: z.p };
        var marc = an && (Z === an.a || Z === an.b || (st.k === "bemg" && (Z === 4 || Z === 7 || Z === 12)) || (st.k === "nobles" && (Z === 2 || Z === 10 || Z === 18)));
        var pt = g.punto(Z, v, { r: marc ? 8 : 4.5, clase: marc ? "c-red" : "c-pen" });
        if (!marc) pt.style.fill = COLP[["s", "p", "d", "f"].indexOf(Q.bloque(Z))];
        g.texto(Z, top * 0.045, z.s, { dy: 0, ancla: "middle", clase: marc ? "red" : "faint" });
      }
      if (an) {
        var za = st.k === "bemg" ? [4, 7, 12] : st.k === "nobles" ? [2, 10, 18] : [an.a, an.b];
        lectura.innerHTML = fil("Casos", za.map(function (z) { return EL[z - 1].s + " (" + (valor(z) == null ? "≈ 0" : valor(z)) + ")"; }).join(" · ") + " kJ/mol", "red") + fil("Explicación", an.txt, "ancho");
        orb.innerHTML = za.slice(0, 2).map(function (z) { return "<span>" + EL[z - 1].s + ": </span>" + ultimos(z); }).join("");
      } else {
        lectura.innerHTML = fil("Qué ver", ie ? "En cada periodo la EI sube con irregularidades: dos caídas pequeñas (Be → B y N → O) en el 2.º periodo; las mismas en el 3.º (Mg → Al, P → S)." : "La AE es mayor en la parte alta de la derecha (halógenos). Los elementos con subnivel completo (Be, Mg) o semicapa llena (N) y los gases nobles liberan ≈ 0.", "ancho");
        orb.innerHTML = "";
      }
      pie.innerHTML = (ie ? "Primera energía de ionización (kJ/mol)." : "Afinidad electrónica = energía <b>liberada</b> al captar un electrón (kJ/mol); ΔH = −AE. Los puntos en 0 son elementos que no liberan energía.") + " Colores: bloque s / p. Pulsa un caso para ver los orbitales implicados.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0.4, xmax: 20.6, ymin: 0, ymax: 2600, w: 640, h: 300, sinX: true, etx: "", ety: "kJ/mol", etiqueta: "Propiedad en función de Z" });
    U.fichas(cuerpo.querySelector("[data-prop]"), [{ k: "ie", t: "1.ª energía de ionización" }, { k: "ae", t: "Afinidad electrónica" }], "ie", function (k) { st.p = k; st.k = null; eligeAn(); pinta(); });
    eligeAn(); pinta();
  };

  // ============================================================
  // Q3_RADIOS: radio de iones y especies isoelectrónicas
  // ============================================================
  B.w.q3_radios = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Radio de los iones: ¿quién es más grande?");
    cuerpo.innerHTML = '<div data-m class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: "i10" }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var SERIES = { i10: [7, 8, 9, 11, 12, 13], i18: [16, 17, 19, 20, 21], i36: [34, 35, 37, 38] };
    function ionPorZ(Z) { return Q.IONES.filter(function (i) { return i.Z === Z; })[0]; }
    function pinta() {
      var Z, i;
      if (st.m === "par") {
        g.rango(0, Q.PARES.length + 1, 0, 230); g.limpiar();
        Q.PARES.forEach(function (p, k) {
          var at = Q.porSimbolo(p.s), signo = p.q > 0;
          g.rect(k + 0.55, 0, k + 1, at.r, { clase: "z-pen" });
          g.rect(k + 1, 0, k + 1.45, p.r, { clase: signo ? "z-ok" : "z-red" });
          g.texto(k + 0.78, at.r, String(at.r), { dy: -5, ancla: "middle", clase: "faint" });
          g.texto(k + 1.22, p.r, fmt(p.r, p.r % 1 ? 1 : 0), { dy: -5, ancla: "middle", clase: signo ? "ok" : "red" });
          g.texto(k + 1, 5, Q.ion(p.s, p.q), { dy: 0, ancla: "middle" });
        });
        lectura.innerHTML = fil("Cationes (verde)", "más pequeños que su átomo: pierden electrones (a veces toda una capa) y los que quedan sienten más Z*", "ok ancho") +
          fil("Aniones (rojo)", "más grandes que su átomo: ganan electrones, la repulsión aumenta y Z* baja", "red ancho");
        pie.innerHTML = "Barra azul = átomo neutro (radio covalente); barra de color = ion (radio de Shannon, pm).";
        return;
      }
      var Zs = SERIES[st.m], mx = 230, ne = st.m === "i10" ? 10 : st.m === "i18" ? 18 : 36;
      g.rango(0, Zs.length + 1, 0, mx); g.limpiar();
      Zs.forEach(function (z, k) {
        var io = ionPorZ(z), neg = io.q < 0;
        g.rect(k + 0.65, 0, k + 1.35, io.r, { clase: neg ? "z-red" : "z-ok" });
        g.texto(k + 1, io.r, fmt(io.r, io.r % 1 ? 1 : 0), { dy: -5, ancla: "middle", clase: neg ? "red" : "ok" });
        g.texto(k + 1, 5, Q.ion(io.s, io.q), { dy: 0, ancla: "middle" });
      });
      var tabla = Zs.map(function (z) { var io = ionPorZ(z), r = Q.slater(z, Q.configIon(z, io.q)); return Q.ion(io.s, io.q) + ": Z = " + z + ", Z* ≈ " + fmt(r.zef, 2); });
      lectura.innerHTML = fil("Todos tienen", ne + " electrones y la misma configuración (" + Q.cfgTxt(Q.config(ne, false), true) + ")", "pen ancho") + fil("Cambia", "el número de protones Z", "ancho") + fil("Z* (Slater)", tabla.join(" · "), "ancho") +
        fil("Conclusión", "a más protones, mayor Z* y menor radio: " + Zs.map(function (z) { var io = ionPorZ(z); return Q.ion(io.s, io.q); }).join(" &gt; "), "red ancho");
      pie.innerHTML = "Especies isoelectrónicas: mismo número de electrones, distinto número de protones. Radios de Shannon en pm (el N³⁻ está tabulado con coordinación 4). Cuanto mayor es <i>Z</i>, más fuerte tira el núcleo de los mismos electrones.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 7, ymin: 0, ymax: 230, w: 620, h: 290, sinX: true, etx: "", ety: "pm", etiqueta: "Radios iónicos" });
    U.fichas(cuerpo.querySelector("[data-m]"), [{ k: "i10", t: "10 e⁻ (como el Ne)" }, { k: "i18", t: "18 e⁻ (como el Ar)" }, { k: "i36", t: "36 e⁻ (como el Kr)" }, { k: "par", t: "Átomo → ion" }], "i10", function (k) { st.m = k; pinta(); });
    pinta();
  };
})(window);
