/* ============================================================
   Bachi para Firu · química del carbono (FyQ I, tema 7), simuladores adicionales
   q7_serie (series homólogas y puntos de ebullición) · q7_insaturacion (grado de insaturación)
   q7_polimeros (monómero → polímero) · q7_quiral (carbonos asimétricos)
   Comparten el motor B.lab.org de lab_organica.js y lab_orgreacciones.js
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, O = B.lab.org, sub = U.sub;
  var MASA = { C: 12.011, H: 1.008, O: 15.999, N: 14.007, F: 18.998, Cl: 35.45, Br: 79.904, I: 126.904 };
  function masaDe(c) { var s = 0; Object.keys(c).forEach(function (k) { s += c[k] * MASA[k]; }); return s; }
  function formulaTxt(c) { return O.formulaMolecular(c); }

  // ------------------------------------------------------------
  // Series homólogas (n = nº de carbonos): fórmula general, nombre y punto de ebullición normal (°C)
  // ------------------------------------------------------------
  var R = O.RAIZ;
  function nomEno(n) { return n === 2 ? "eteno" : n === 3 ? "propeno" : R[n] + "-1-eno"; }
  function nomIno(n) { return n === 2 ? "etino" : n === 3 ? "propino" : R[n] + "-1-ino"; }
  function nomOl(n) { return n <= 2 ? R[n] + "anol" : R[n] + "an-1-ol"; }
  O.SERIES = {
    alcano: { t: "Alcanos", gen: "CₙH₂ₙ₊₂", n0: 1, nombre: function (n) { return R[n] + "ano"; }, cuenta: function (n) { return { C: n, H: 2 * n + 2, O: 0 }; }, pe: [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.7, 150.8, 174.1], pf25: [] },
    alqueno: { t: "Alquenos (1-enos)", gen: "CₙH₂ₙ", n0: 2, nombre: nomEno, cuenta: function (n) { return { C: n, H: 2 * n, O: 0 }; }, pe: [-103.7, -47.6, -6.3, 30.0, 63.4, 93.6, 121.3, 146.9, 170.6], pf25: [] },
    alquino: { t: "Alquinos (1-inos)", gen: "CₙH₂ₙ₋₂", n0: 2, nombre: nomIno, cuenta: function (n) { return { C: n, H: 2 * n - 2, O: 0 }; }, pe: [-84.0, -23.2, 8.1, 40.2, 71.3, 99.7, 126.3, 150.8, 174.0], pf25: [] },
    alcohol: { t: "Alcoholes (1-oles)", gen: "CₙH₂ₙ₊₁OH", n0: 1, nombre: nomOl, cuenta: function (n) { return { C: n, H: 2 * n + 2, O: 1 }; }, pe: [64.7, 78.4, 97.2, 117.7, 138.0, 157.0, 176.0, 195.0, 214.0, 233.0], pf25: [] },
    acido: { t: "Ácidos carboxílicos", gen: "CₙH₂ₙ₊₁COOH", n0: 1, nombre: function (n) { return "ácido " + R[n] + "anoico"; }, cuenta: function (n) { return { C: n, H: 2 * n, O: 2 }; }, pe: [100.8, 118.1, 141.2, 163.5, 186.1, 205.8, 223.0, 239.7, 254.0, 270.0], pf25: [10] }
  };
  O.SERIES_ORDEN = ["alcano", "alqueno", "alquino", "alcohol", "acido"];
  O.estadoA25 = function (fam, n) {
    var S = O.SERIES[fam], pe = S.pe[n - S.n0];
    if (pe < 25) return "gas";
    return S.pf25.indexOf(n) >= 0 ? "sólido" : "líquido";
  };
  B.w.q7_serie = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Series homólogas: cada CH₂ añade unos grados al punto de ebullición");
    cuerpo.innerHTML = '<div data-fam class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: "alcano", n: 4 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 12.4, ymin: -200, ymax: 300, w: 600, h: 280, ety: "T ebullición (°C)", etiqueta: "Punto de ebullición frente al número de carbonos" });
    sl = U.slider(ctl, { et: "Carbonos (n)", min: 1, max: 10, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return String(v); } });
    var CLS = { alcano: "c-pen", alqueno: "c-ok", alquino: "c-red", alcohol: "c-ink", acido: "c-faint" };
    function pinta() {
      var S = O.SERIES[st.f]; if (st.n < S.n0) { st.n = S.n0; sl.set(S.n0); }
      var n = st.n, c = S.cuenta(n), pe = S.pe[n - S.n0], prev = n > S.n0 ? S.pe[n - 1 - S.n0] : null;
      g.limpiar(); g.rango(0, 12.4, -200, 300); g.horizontal(25, { clase: "c-faint" }); g.texto(0.15, 25, "25 °C", { dy: -4, clase: "faint" });
      O.SERIES_ORDEN.forEach(function (k) {
        var Z = O.SERIES[k], pts = Z.pe.map(function (v, i) { return [Z.n0 + i, v]; });
        g.polilinea(pts, { clase: k === st.f ? CLS[k] : "c-faint" });
        if (k === st.f) pts.forEach(function (p) { g.punto(p[0], p[1], { r: p[0] === n ? 7 : 3.5, clase: p[0] === n ? "c-red" : CLS[k] }); });
        else g.texto(Z.n0 + Z.pe.length - 1, Z.pe[Z.pe.length - 1], Z.t.split(" ")[0], { dx: 5, dy: 3, clase: "faint" });
      });
      lectura.innerHTML = U.lec("Compuesto", "<span class='q7-nombre'>" + S.nombre(n) + "</span>", "ok ancho") + U.lec("Fórmula general", S.gen, "pen") + U.lec("Fórmula (n = " + n + ")", formulaTxt({ C: c.C, H: c.H, O: c.O }), "red") +
        U.lec("Masa molar", fmt(masaDe(c), 2) + " g/mol", "") + U.lec("Punto de ebullición", fmt(pe, 1) + " °C", "") + U.lec("Estado a 25 °C", O.estadoA25(st.f, n), "") +
        U.lec("Incremento respecto al anterior", prev === null ? "—" : "+" + fmt(pe - prev, 1) + " °C (un CH₂ más)", "ancho");
      pie.innerHTML = "En una serie homóloga cada compuesto difiere del anterior en un grupo CH₂. Al crecer la cadena aumentan la masa molar, el número de electrones y la superficie de contacto, así que crecen las fuerzas de London (Tema 2) y el punto de ebullición, sobre todo en las primeras (+20 a +60 °C por carbono) y menos después (≈ +20 °C). Con la misma cadena, los grupos que forman puentes de hidrógeno (alcoholes y, aún más, ácidos carboxílicos, que forman dímeros) hierven mucho más alto que los hidrocarburos.";
    }
    U.fichas(cuerpo.querySelector("[data-fam]"), O.SERIES_ORDEN.map(function (k) { return { k: k, t: O.SERIES[k].t }; }), st.f, function (k) { st.f = k; pinta(); });
    pinta();
  };

  // ------------------------------------------------------------
  // Grado de insaturación (índice de deficiencia de hidrógeno): IDH = (2C + 2 + N − H − X)/2
  // ------------------------------------------------------------
  O.idh = function (c) { return (2 * c.C + 2 + (c.N || 0) - c.H - (c.X || 0)) / 2; };
  O.IDH_EJEMPLOS = [
    { t: "etano", C: 2, H: 6, N: 0, X: 0, O: 0, nota: "Saturado: sólo enlaces sencillos y sin ciclos." },
    { t: "eteno", C: 2, H: 4, N: 0, X: 0, O: 0, nota: "Un doble enlace." },
    { t: "etino", C: 2, H: 2, N: 0, X: 0, O: 0, nota: "Un triple enlace (cuenta como 2 insaturaciones)." },
    { t: "ciclohexano", C: 6, H: 12, N: 0, X: 0, O: 0, nota: "Un anillo (ciclo saturado) cuenta como 1, igual que un doble enlace." },
    { t: "hex-1-eno", C: 6, H: 12, N: 0, X: 0, O: 0, nota: "Un doble enlace: misma fórmula que el ciclohexano; son isómeros." },
    { t: "benceno", C: 6, H: 6, N: 0, X: 0, O: 0, nota: "4: tres dobles enlaces y un anillo." },
    { t: "propanona", C: 3, H: 6, N: 0, X: 0, O: 1, nota: "El oxígeno no cuenta en la fórmula; el C=O sí es una insaturación." },
    { t: "cloroetano", C: 2, H: 5, N: 0, X: 1, O: 0, nota: "Cada halógeno cuenta como un hidrógeno: saturado." },
    { t: "etanamina", C: 2, H: 7, N: 1, X: 0, O: 0, nota: "Cada nitrógeno suma 1 a los hidrógenos esperados: saturado." },
    { t: "naftaleno", C: 10, H: 8, N: 0, X: 0, O: 0, nota: "7: cinco dobles enlaces y dos anillos." },
    { t: "glucosa (abierta)", C: 6, H: 12, N: 0, X: 0, O: 6, nota: "1: el grupo C=O (aldehído) de la cadena abierta; en forma de anillo, 1 ciclo." },
    { t: "ácido etanoico", C: 2, H: 4, N: 0, X: 0, O: 2, nota: "1: el C=O del grupo carboxilo." }
  ];
  O.idhLectura = function (v) {
    if (v < 0 || Math.abs(v - Math.round(v)) > 1e-9) return "fórmula imposible";
    return ["saturado (sin dobles, triples ni ciclos)", "1 doble enlace o 1 ciclo", "2: un triple, dos dobles, o un doble + un ciclo, o dos ciclos", "3: p. ej. tres dobles enlaces, o un triple y un doble…", "4 o más: ¡compuesto aromático probable! (el benceno es 4)"][Math.min(Math.round(v), 4)];
  };
  B.w.q7_insaturacion = function (host) {
    var cuerpo = B.caja(host, "Calculadora", "Grado de insaturación de una fórmula molecular");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { C: 6, H: 6, N: 0, X: 0, O: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sC, sH, sN, sX, sO;
    sC = U.slider(ctl, { et: "Carbonos", min: 1, max: 12, step: 1, val: st.C, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return String(v); } });
    sH = U.slider(ctl, { et: "Hidrógenos", min: 0, max: 30, step: 1, val: st.H, on: function (v) { st.H = v; pinta(); }, fmt: function (v) { return String(v); } });
    sN = U.slider(ctl, { et: "Nitrógenos", min: 0, max: 3, step: 1, val: st.N, on: function (v) { st.N = v; pinta(); }, fmt: function (v) { return String(v); } });
    sX = U.slider(ctl, { et: "Halógenos", min: 0, max: 4, step: 1, val: st.X, on: function (v) { st.X = v; pinta(); }, fmt: function (v) { return String(v); } });
    sO = U.slider(ctl, { et: "Oxígenos", min: 0, max: 6, step: 1, val: st.O, on: function (v) { st.O = v; pinta(); }, fmt: function (v) { return String(v); } });
    var nota = "";
    function pinta() {
      var c = { C: st.C, H: st.H, N: st.N, X: st.X, O: st.O }, v = O.idh(c), txt = "C" + (c.C > 1 ? sub(c.C) : "") + (c.H ? "H" + (c.H > 1 ? sub(c.H) : "") : "") + (c.N ? "N" + (c.N > 1 ? sub(c.N) : "") : "") + (c.O ? "O" + (c.O > 1 ? sub(c.O) : "") : "") + (c.X ? "X" + (c.X > 1 ? sub(c.X) : "") : "");
      lectura.innerHTML = U.lec("Fórmula", txt, "pen") + U.lec("Cuenta", "(2·" + c.C + " + 2 + " + c.N + " − " + c.H + " − " + c.X + ")/2 = " + fmt(v, 1), "") + U.lec("Grado de insaturación", Math.abs(v - Math.round(v)) < 1e-9 && v >= 0 ? String(Math.round(v)) : "—", v < 0 || Math.abs(v - Math.round(v)) > 1e-9 ? "red" : "ok") +
        U.lec("Qué significa", O.idhLectura(v), "ancho") + (nota ? U.lec("Ejemplo", nota, "ancho") : "");
      pie.innerHTML = "El <b>grado de insaturación</b> cuenta cuántos pares de átomos de H «faltan» respecto del alcano de la misma cadena: cada doble enlace o ciclo resta 2 H (cuenta 1), cada triple enlace resta 4 H (cuenta 2). Fórmula: <b>(2C + 2 + N − H − X)/2</b>; el oxígeno no interviene. Si sale un número negativo o con decimales, esa fórmula no corresponde a ninguna molécula neutra.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), O.IDH_EJEMPLOS.map(function (e, i) { return { k: String(i), t: e.t }; }), "", function (k) {
      var e = O.IDH_EJEMPLOS[+k]; st.C = e.C; st.H = e.H; st.N = e.N; st.X = e.X; st.O = e.O; sC.set(e.C); sH.set(e.H); sN.set(e.N); sX.set(e.X); sO.set(e.O); nota = e.t + ": " + e.nota; pinta();
    });
    pinta();
  };

  // ------------------------------------------------------------
  // Polímeros de adición: monómero → polímero
  // ------------------------------------------------------------
  O.POLIMEROS = [
    { mon: "eteno (etileno)", smiles: "C=C", cuenta: { C: 2, H: 4 }, pol: "polietileno (PE)", unidad: "(−CH₂−CH₂−)ₙ", usos: "bolsas, botellas, films, juguetes" },
    { mon: "propeno", smiles: "C=CC", cuenta: { C: 3, H: 6 }, pol: "polipropileno (PP)", unidad: "(−CH₂−CH(CH₃)−)ₙ", usos: "envases, tapones, fibras, piezas de coche" },
    { mon: "cloroeteno (cloruro de vinilo)", smiles: "C=CCl", cuenta: { C: 2, H: 3, Cl: 1 }, pol: "poli(cloruro de vinilo) (PVC)", unidad: "(−CH₂−CHCl−)ₙ", usos: "tuberías, marcos de ventana, cables" },
    { mon: "tetrafluoroeteno", smiles: "FC(F)=C(F)F", cuenta: { C: 2, F: 4 }, pol: "politetrafluoroeteno (PTFE, teflón)", unidad: "(−CF₂−CF₂−)ₙ", usos: "antiadherente de sartenes, juntas, cintas de fontanería" },
    { mon: "propenonitrilo (acrilonitrilo)", smiles: "C=CC#N", cuenta: { C: 3, H: 3, N: 1 }, pol: "poliacrilonitrilo (fibra acrílica)", unidad: "(−CH₂−CH(CN)−)ₙ", usos: "fibras textiles acrílicas, fibra de carbono" },
    { mon: "buta-1,3-dieno", smiles: "C=CC=C", cuenta: { C: 4, H: 6 }, pol: "polibutadieno (caucho sintético)", unidad: "(−CH₂−CH=CH−CH₂−)ₙ", usos: "neumáticos, suelas, gomas" },
    { mon: "estireno (feniletileno)", smiles: null, cuenta: { C: 8, H: 8 }, pol: "poliestireno (PS)", unidad: "(−CH₂−CH(C₆H₅)−)ₙ", usos: "envases, bandejas, poliestireno expandido (corcho blanco)" }
  ];
  B.w.q7_polimeros = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Polimerización por adición: de monómero a polímero");
    cuerpo.innerHTML = '<div data-mon class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: 0, x: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 190, limpio: true, etiqueta: "Monómero" });
    U.slider(ctl, { et: "Unidades repetidas, n", min: 0, max: 4, step: 0.05, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(Math.round(Math.pow(10, v)), 0); } });
    function pinta() {
      var P = O.POLIMEROS[st.k], n = Math.round(Math.pow(10, st.x)), cm = { C: 0, H: 0, O: 0, N: 0, F: 0, Cl: 0, Br: 0, I: 0 }, k;
      for (k in P.cuenta) cm[k] = P.cuenta[k];
      var M = masaDe(cm), f = formulaTxt(cm);
      g.limpiar();
      if (P.smiles) O.dibujaGrafo(g, O.grafoDeSmiles(P.smiles), { min: 1.5 }); else { g.rango(-2, 6, -2.2, 2.6); g.texto(2, 0, "C₆H₅−CH=CH₂  (con anillo bencénico)", { ancla: "middle", clase: "pen" }); }
      lectura.innerHTML = U.lec("Monómero", "<span class='q7-nombre'>" + P.mon + "</span> · " + f + " · M = " + fmt(M, 2) + " g/mol", "ok ancho") + U.lec("Polímero", P.pol, "pen ancho") + U.lec("Unidad que se repite", P.unidad, "ancho") +
        U.lec("Con n = " + fmt(n, 0), "n " + f + " ⟶ " + P.unidad.replace("ₙ", "<sub>" + n + "</sub>"), "ancho") + U.lec("Masa molar del polímero", fmt(n * M, 0) + " g/mol (n · M del monómero)", "red") + U.lec("Átomos de carbono en la cadena", fmt(n * cm.C, 0), "") + U.lec("Usos", P.usos, "ancho");
      pie.innerHTML = "En la <b>polimerización por adición</b> se rompe el enlace π de cada monómero y las moléculas se encadenan por enlaces σ: el polímero tiene los mismos átomos que los monómeros (no se pierde nada, sólo se unen), por eso su masa molar es n veces la del monómero. Los polímeros reales tienen cadenas de miles de unidades; su masa molar ronda 10⁴–10⁶ g/mol.";
    }
    U.fichas(cuerpo.querySelector("[data-mon]"), O.POLIMEROS.map(function (p, i) { return { k: String(i), t: p.pol.replace(/ \(.*/, "") }; }), "0", function (k) { st.k = +k; pinta(); });
    pinta();
  };

  // ------------------------------------------------------------
  // Quiralidad: carbonos con cuatro sustituyentes distintos (molécula acíclica, SMILES simplificado)
  // ------------------------------------------------------------
  O.canonRama = function (G, A, i, padre, ordenEnl) {
    var hijos = [], k;
    A[i].forEach(function (z) { if (z.v !== padre) hijos.push(O.canonRama(G, A, z.v, i, G.b[z.k].o)); });
    for (k = 0; k < G.a[i].h; k++) hijos.push("H");
    hijos.sort();
    return (ordenEnl || 0) + G.a[i].e + "(" + hijos.join(",") + ")";
  };
  O.carbonosQuirales = function (G) {
    var A = G.a.map(function () { return []; }), res = [];
    G.b.forEach(function (e, k) { A[e.i].push({ v: e.j, k: k }); A[e.j].push({ v: e.i, k: k }); });
    G.a.forEach(function (at, i) {
      if (at.e !== "C") return;
      if (A[i].some(function (z) { return G.b[z.k].o > 1; })) return;
      if (A[i].length + at.h !== 4) return;
      var ramas = [], k;
      A[i].forEach(function (z) { ramas.push(O.canonRama(G, A, z.v, i, G.b[z.k].o)); });
      for (k = 0; k < at.h; k++) ramas.push("H");
      var vistos = {}; ramas.forEach(function (r) { vistos[r] = 1; });
      if (Object.keys(vistos).length === 4) res.push(i);
    });
    return res;
  };
  O.QUIRAL = [
    { t: "butan-2-ol", s: "CCC(C)O", nota: "El C2 tiene H, OH, CH₃ y CH₂CH₃: cuatro cosas distintas. Existen dos enantiómeros, (R)- y (S)-butan-2-ol." },
    { t: "propan-2-ol", s: "CC(C)O", nota: "El C2 tiene dos grupos CH₃ iguales: no es quiral." },
    { t: "2-clorobutano", s: "CCC(C)Cl", nota: "C2 con H, Cl, CH₃ y CH₂CH₃: quiral." },
    { t: "ácido láctico (2-hidroxipropanoico)", s: "CC(O)C(=O)O", nota: "El ácido L-láctico es el de los músculos y el yogur; su imagen especular es el D-láctico." },
    { t: "alanina (ácido 2-aminopropanoico)", s: "CC(N)C(=O)O", nota: "Casi todos los aminoácidos de las proteínas son L (quirales, salvo la glicina)." },
    { t: "glicina (ácido 2-aminoetanoico)", s: "NCC(=O)O", nota: "El C2 tiene dos H: no es quiral. Es el único aminoácido proteico sin carbono asimétrico." },
    { t: "3-metilhexano", s: "CCC(C)CCC", nota: "El C3 tiene H, CH₃, etilo y propilo: quiral aunque sea un hidrocarburo." },
    { t: "3-metilpentano", s: "CCC(C)CC", nota: "El C3 tiene dos etilos: no es quiral." },
    { t: "2-metilbutano", s: "CC(C)CC", nota: "El C2 tiene dos CH₃: no es quiral." },
    { t: "butano-2,3-diol", s: "CC(O)C(O)C", nota: "Dos carbonos asimétricos iguales entre sí: hay una forma meso (con plano de simetría), por eso son 3 estereoisómeros y no 4." },
    { t: "2-bromo-3-clorobutano", s: "CC(Br)C(Cl)C", nota: "Dos centros distintos: 2² = 4 estereoisómeros." },
    { t: "ácido tartárico (2,3-dihidroxibutanodioico)", s: "OC(=O)C(O)C(O)C(=O)O", nota: "Dos carbonos asimétricos iguales: hay forma meso. Louis Pasteur separó a mano los cristales de los enantiómeros en 1848." },
    { t: "glicerol (propano-1,2,3-triol)", s: "OCC(O)CO", nota: "El C2 tiene dos grupos CH₂OH iguales: no es quiral." },
    { t: "2-clorobutanal", s: "CCC(Cl)C=O", nota: "C2 con H, Cl, CHO y etilo: quiral." },
    { t: "bromoclorofluorometano", s: "FC(Cl)Br", nota: "El ejemplo clásico: un carbono con H, F, Cl y Br." },
    { t: "3-metilhex-1-eno", s: "C=CC(C)CC", nota: "El C3 tiene H, CH₃, vinilo y etilo: quiral (el doble enlace está en un sustituyente, no en el C3)." }
  ];
  B.w.q7_quiral = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Tiene carbonos asimétricos (quirales)?");
    cuerpo.innerHTML = '<div data-mol class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><div class="q7-juego"></div><p class="w-pie"></p>';
    var st = { k: 0 }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), juego = cuerpo.querySelector(".q7-juego");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 210, limpio: true, etiqueta: "Molécula con sus carbonos asimétricos marcados" });
    function pinta() {
      var x = O.QUIRAL[st.k], G = O.grafoDeSmiles(x.s), q = O.carbonosQuirales(G), f = formulaTxt(O.cuentaGrafo(G));
      O.dibujaGrafo(g, G, { min: 1.7 });
      q.forEach(function (i) { g.punto(G.a[i].x, G.a[i].y, { r: 13, clase: "c-red" }).setAttribute("fill-opacity", "0.22"); g.texto(G.a[i].x, G.a[i].y, "*", { dx: 14, dy: -9, clase: "red" }); });
      lectura.innerHTML = U.lec("Molécula", "<span class='q7-nombre'>" + x.t + "</span> · " + f, "ok ancho") + U.lec("Carbonos asimétricos", q.length ? q.length + " (marcados con *)" : "ninguno", q.length ? "red" : "") +
        U.lec("Estereoisómeros posibles (máx. 2ⁿ)", q.length ? String(Math.pow(2, q.length)) + (q.length > 1 && /butano-2,3-diol|tartárico/.test(x.t) ? " → 3 reales (hay forma meso)" : "") : "1 (no hay enantiómeros)", "") + U.lec("¿Actividad óptica?", q.length ? "sí (si no es la forma meso)" : "no: es idéntica a su imagen especular", "ancho");
      pie.innerHTML = x.nota;
      juego.innerHTML = "";
    }
    U.fichas(cuerpo.querySelector("[data-mol]"), O.QUIRAL.map(function (m, i) { return { k: String(i), t: m.t.replace(/ \(.*/, "") }; }), "0", function (k) { st.k = +k; pinta(); });
    pinta();
  };
})(window);
