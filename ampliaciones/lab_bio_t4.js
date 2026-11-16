/* ============================================================
   Bachi para Firu · Biología II, tema 4 (Proteínas y enzimas)
   bio_aminoacidos: construye un péptido uniendo aminoácidos (enlaces peptídicos, agua liberada, masa, combinaciones).
   bio_enzima: curva de Michaelis–Menten (velocidad frente a sustrato) con [E] y con inhibidor competitivo / no competitivo.
   bio_factores: actividad enzimática frente a la temperatura y al pH, con enzimas de distinto óptimo.
   Estilos inyectados desde aquí. Los números de los modelos los recalcula herramientas/verificar_bio2_t4.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio4-estilos")) return;
    var s = document.createElement("style"); s.id = "bio4-estilos";
    s.textContent =
      ".bio4-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio4-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio4-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio4-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio4-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio4-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio4-cadena{display:flex;flex-wrap:wrap;align-items:center;gap:2px 0;margin:10px 0;min-height:44px;padding:8px;border:1.5px dashed var(--line);border-radius:10px;font-size:14px;color:var(--ink)}" +
      ".bio4-cadena .aa{padding:5px 8px;border-radius:8px;border:1.5px solid var(--pen);background:var(--pen-soft);font-weight:700}" +
      ".bio4-cadena .aa.polar{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio4-cadena .aa.ac{border-color:var(--red);background:var(--red-soft)}" +
      ".bio4-cadena .aa.bas{border-color:var(--ink);background:var(--sheet-2)}" +
      ".bio4-cadena .en{padding:0 3px;font-size:11px;color:var(--ink-faint);white-space:nowrap}" +
      ".bio4-cadena .ext{font-size:11px;color:var(--ink-faint);padding:0 4px;font-weight:700}" +
      ".bio4-botones{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}" +
      ".bio4-botones button{padding:6px 10px;border-radius:9px;border:1.5px solid var(--line);background:var(--sheet);color:var(--ink);font:600 13px var(--body,sans-serif);cursor:pointer}" +
      ".bio4-botones button:hover{border-color:var(--pen)}" +
      ".bio4-botones button.accion{border-style:dashed}" +
      ".bio4-svg{display:block;width:100%;max-width:560px;height:auto;margin:8px auto}" +
      ".bio4-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio4-svg .at{font-size:15px;font-weight:700}" +
      ".bio4-svg .en{stroke:var(--ink);stroke-width:2;fill:none}" +
      ".bio4-svg .pep{stroke:var(--red);stroke-width:4;fill:none}" +
      ".bio4-svg .caja{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio4-svg .h2o{fill:var(--pen-soft);stroke:var(--pen);stroke-width:2}" +
      ".bio4-svg .pie{font-size:11px;fill:var(--ink-faint);font-weight:500}" +
      "@media(max-width:520px){.bio4-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  function f1(x) { return B.fmt(x, 1); }
  function miles(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  // ------------------------------------------------------------------ CONSTRUYE UN PÉPTIDO
  var AGUA = 18.015;   // g/mol
  var AA = [
    { k: "Gly", n: "glicina", m: 75.07, c: "apolar" },
    { k: "Ala", n: "alanina", m: 89.09, c: "apolar" },
    { k: "Val", n: "valina", m: 117.15, c: "apolar" },
    { k: "Phe", n: "fenilalanina", m: 165.19, c: "apolar" },
    { k: "Ser", n: "serina", m: 105.09, c: "polar" },
    { k: "Cys", n: "cisteína", m: 121.16, c: "polar" },
    { k: "Asp", n: "ácido aspártico", m: 133.10, c: "ac" },
    { k: "Lys", n: "lisina", m: 146.19, c: "bas" }
  ];
  var CLASES = { apolar: "radical apolar", polar: "radical polar sin carga", ac: "radical ácido (carga −)", bas: "radical básico (carga +)" };
  function porK(k) { var r = null; AA.forEach(function (a) { if (a.k === k) r = a; }); return r; }
  function nombrePep(n) { return n === 1 ? "aminoácido libre" : n === 2 ? "dipéptido" : n === 3 ? "tripéptido" : n === 4 ? "tetrapéptido" : n === 5 ? "pentapéptido" : n <= 10 ? "oligopéptido" : "polipéptido"; }
  function combos(n) { return n <= 8 ? miles(Math.pow(20, n)) : B.fmt(Math.pow(20, n) / Math.pow(10, Math.floor(Math.log(Math.pow(20, n)) / Math.LN10)), 2) + " · 10^" + Math.floor(Math.log(Math.pow(20, n)) / Math.LN10 + 1e-9); }

  B.w.bio_aminoacidos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Construye un péptido");
    cuerpo.innerHTML = '<p class="w-intro">Pulsa los aminoácidos para añadirlos a la cadena (de izquierda a derecha, del extremo N al extremo C). Cada unión es un enlace peptídico y libera una molécula de agua.</p>' +
      '<div class="bio4-botones" data-aa></div><div class="bio4-botones" data-acc></div><div class="bio4-cadena"></div><div class="bio4-dato"></div><div class="bio4-veredicto"></div>' +
      '<p class="w-pie">Masas de los aminoácidos libres en g/mol; masa del péptido = suma − 18,015 por cada enlace. Máximo 12 residuos.</p>';
    var cad = [], MAX = 12;
    var bA = cuerpo.querySelector("[data-aa]"), bC = cuerpo.querySelector("[data-acc]"), dib = cuerpo.querySelector(".bio4-cadena"), dat = cuerpo.querySelector(".bio4-dato"), ver = cuerpo.querySelector(".bio4-veredicto");
    bA.innerHTML = AA.map(function (a) { return '<button type="button" data-aa="' + a.k + '" title="' + a.n + '">' + a.k + "</button>"; }).join("");
    bC.innerHTML = '<button type="button" class="accion" data-q="1">Quitar el último</button><button type="button" class="accion" data-q="0">Vaciar</button>';
    bA.onclick = function (e) { var b = e.target.closest("[data-aa]"); if (b && cad.length < MAX) { cad.push(b.getAttribute("data-aa")); pinta(); } };
    bC.onclick = function (e) { var b = e.target.closest("[data-q]"); if (!b) return; if (b.getAttribute("data-q") === "1") cad.pop(); else cad = []; pinta(); };
    function pinta() {
      var n = cad.length, suma = 0, ac = 0, bas = 0, cys = 0, html = "";
      cad.forEach(function (k, i) {
        var a = porK(k); suma += a.m; if (a.c === "ac") ac++; if (a.c === "bas") bas++; if (k === "Cys") cys++;
        if (i === 0) html += '<span class="ext">H₂N–</span>';
        html += '<span class="aa ' + a.c + '" title="' + a.n + ": " + CLASES[a.c] + '">' + k + "</span>";
        html += i < n - 1 ? '<span class="en">–CO–NH–</span>' : '<span class="ext">–COOH</span>';
      });
      dib.innerHTML = n ? html : '<span class="en">Cadena vacía: añade un aminoácido</span>';
      var masa = n ? suma - AGUA * (n - 1) : 0;
      dat.innerHTML = "<div><b>Aminoácidos</b>" + n + (n ? " (" + nombrePep(n) + ")" : "") + "</div>" +
        "<div><b>Enlaces peptídicos</b>" + Math.max(0, n - 1) + "</div>" +
        "<div><b>Moléculas de agua liberadas</b>" + Math.max(0, n - 1) + "</div>" +
        "<div><b>Masa del péptido</b>" + (n ? B.fmt(masa, 2) + " g/mol" : "—") + "</div>" +
        "<div><b>Cadenas distintas de este largo</b>" + (n ? "20^" + n + " = " + combos(n) : "—") + "</div>" +
        "<div><b>Radicales con carga</b>" + ac + " ácido(s) (−), " + bas + " básico(s) (+)</div>";
      var msg = "";
      if (!n) msg = "Empieza pulsando un aminoácido.";
      else if (n === 1) msg = "Un solo aminoácido: todavía no hay enlace peptídico.";
      else msg = "Un péptido de " + n + " aminoácidos tiene " + (n - 1) + " enlaces y ha liberado " + (n - 1) + " H₂O: siempre n − 1.";
      if (cys >= 2) msg += " Con dos cisteínas, sus grupos –SH pueden unirse en un puente disulfuro (estructura terciaria).";
      ver.className = "bio4-veredicto" + (cys >= 2 ? " ok" : "");
      ver.textContent = msg;
    }
    pinta();
  };

  // ------------------------------------------------------------------ MICHAELIS–MENTEN CON INHIBIDOR
  var KM = 2, VMAX1 = 100;   // mM y µmol/min con [E] = 1
  function parametros(E, inh, i) {
    var vmax = VMAX1 * E, km = KM;
    if (inh === "comp") km = KM * (1 + i);
    else if (inh === "nocomp") vmax = vmax / (1 + i);
    return { vmax: vmax, km: km };
  }
  function vel(S, p) { return p.vmax * S / (p.km + S); }

  B.w.bio_enzima = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Velocidad de una enzima y su inhibidor");
    cuerpo.innerHTML = '<p class="w-intro">Mueve la cantidad de sustrato [S] y mira cómo la velocidad llega a un tope (V<sub>max</sub>). Prueba a duplicar la enzima y a añadir un inhibidor competitivo o no competitivo.</p>' +
      '<div data-inh></div><div data-ctl></div><div class="w-plot"></div><div class="bio4-dato"></div><div class="bio4-veredicto"></div>' +
      '<p class="w-pie">Curva gris discontinua: sin inhibidor y con [E] = 1. [I]/K<sub>i</sub>: cuántas veces el inhibidor supera su constante de inhibición.</p>';
    var st = { S: 2, E: 1, inh: "no", i: 2 };
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 20, ymin: 0, ymax: 215, w: 600, h: 280, etx: "[S] (mM)", ety: "v (µmol/min)", etiqueta: "Velocidad inicial frente a concentración de sustrato" });
    var dat = cuerpo.querySelector(".bio4-dato"), ver = cuerpo.querySelector(".bio4-veredicto");
    U.fichas(cuerpo.querySelector("[data-inh]"), [{ k: "no", t: "Sin inhibidor" }, { k: "comp", t: "Competitivo" }, { k: "nocomp", t: "No competitivo" }], st.inh, function (k) { st.inh = k; pinta(); });
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    U.slider(ctl, { et: "[S]", min: 0.1, max: 20, step: 0.1, val: st.S, fmt: function (v) { return f1(v) + " mM"; }, on: function (v) { st.S = v; pinta(); } });
    U.slider(ctl, { et: "[E]", min: 0.5, max: 2, step: 0.5, val: st.E, fmt: function (v) { return "×" + f1(v); }, on: function (v) { st.E = v; pinta(); } });
    U.slider(ctl, { et: "[I]/Kᵢ", min: 0, max: 4, step: 0.5, val: st.i, fmt: function (v) { return f1(v); }, on: function (v) { st.i = v; pinta(); } });
    function pinta() {
      var p = parametros(st.E, st.inh, st.inh === "no" ? 0 : st.i), p0 = parametros(1, "no", 0), v = vel(st.S, p);
      g.limpiar();
      g.curva(function (x) { return vel(x, p0); }, { clase: "c-faint", dash: "6 4" });
      g.horizontal(p.vmax, { clase: "c-ok" });
      g.segmento(p.km, 0, p.km, p.vmax / 2, { clase: "c-ok" });
      g.curva(function (x) { return vel(x, p); }, { clase: "c-pen" });
      g.punto(st.S, v, { clase: "c-red" });
      g.texto(19.8, p.vmax + 8, "Vmax", { ancla: "end", clase: "c-ok" });
      g.texto(p.km + 0.3, 8, "Km", { clase: "c-ok" });
      dat.innerHTML = "<div><b>Velocidad v</b>" + f1(v) + " µmol/min</div><div><b>v / Vmax</b>" + f1(v / p.vmax * 100) + " %</div>" +
        "<div><b>Vmax</b>" + f1(p.vmax) + " µmol/min</div><div><b>Km (con inhibidor)</b>" + f1(p.km) + " mM</div>";
      var msg, cls = "";
      if (st.inh === "comp") { msg = "Competitivo: el inhibidor compite por el sitio activo. La V<sub>max</sub> se alcanza igual, pero hace falta más sustrato para llegar a la mitad: K<sub>m</sub> aparente sube."; cls = " mal"; }
      else if (st.inh === "nocomp") { msg = "No competitivo: el inhibidor se une fuera del sitio activo y deja inservible parte de la enzima. Baja la V<sub>max</sub>; la K<sub>m</sub> no cambia y más sustrato no lo arregla."; cls = " mal"; }
      else if (st.S >= 10 * KM) { msg = "Casi toda la enzima está ocupada: aunque eches más sustrato, la velocidad apenas sube (saturación)."; cls = " ok"; }
      else msg = "Con poco sustrato la velocidad crece casi en proporción; al acercarse a la saturación, cada vez menos.";
      ver.className = "bio4-veredicto" + cls;
      ver.innerHTML = msg;
    }
    pinta();
  };

  // ------------------------------------------------------------------ TEMPERATURA Y pH
  var ENZ_T = [{ k: "hum", t: "Humana (37 °C)", opt: 37 }, { k: "taq", t: "Taq polimerasa (72 °C)", opt: 72 }, { k: "pez", t: "Pez antártico (15 °C)", opt: 15 }];
  var ENZ_P = [{ k: "pep", t: "Pepsina (pH 2)", opt: 2 }, { k: "ami", t: "Amilasa salival (pH 6,8)", opt: 6.8 }, { k: "tri", t: "Tripsina (pH 8)", opt: 8 }];
  function relT(T, opt) { return T <= opt ? Math.pow(2, (T - opt) / 10) : Math.pow(2, -Math.pow((T - opt) / 5, 2)); }
  function relP(pH, opt) { return Math.pow(2, -Math.pow(pH - opt, 2)); }

  B.w.bio_factores = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Temperatura, pH y actividad enzimática");
    cuerpo.innerHTML = '<p class="w-intro">Elige el factor y la enzima, y mueve el control. Verás la actividad relativa (100 % = en su óptimo) y por qué cae la curva.</p>' +
      '<div data-modo></div><div data-enz></div><div data-ctl></div><div class="w-plot"></div><div class="bio4-dato"></div><div class="bio4-veredicto"></div>' +
      '<p class="w-pie">Modelo cualitativo: por debajo del óptimo la actividad se duplica cada 10 °C; por encima, la enzima se desnaturaliza y cae en picado. En el pH, cae a la mitad a una unidad del óptimo.</p>';
    var st = { modo: "T", enz: { T: "hum", P: "pep" }, T: 37, P: 7 };
    var g, gModo = "", hostG = cuerpo.querySelector(".w-plot");
    function plot() {
      if (gModo === st.modo) return;
      gModo = st.modo; hostG.innerHTML = "";
      g = new B.Plot(hostG, st.modo === "T" ? { xmin: 0, xmax: 100, ymin: 0, ymax: 110, w: 600, h: 260, etx: "T (°C)", ety: "actividad (%)", etiqueta: "Actividad enzimática frente a la temperatura" }
        : { xmin: 0, xmax: 14, ymin: 0, ymax: 110, w: 600, h: 260, etx: "pH", ety: "actividad (%)", etiqueta: "Actividad enzimática frente al pH" });
    }
    var dat = cuerpo.querySelector(".bio4-dato"), ver = cuerpo.querySelector(".bio4-veredicto"), cEnz = cuerpo.querySelector("[data-enz]");
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), slT, slP, ctlT, ctlP;
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "T", t: "Temperatura" }, { k: "P", t: "pH" }], st.modo, function (k) { st.modo = k; fichasEnz(); pinta(); });
    slT = U.slider(ctl, { et: "T", min: 0, max: 100, step: 1, val: st.T, fmt: function (v) { return Math.round(v) + " °C"; }, on: function (v) { st.T = v; pinta(); } });
    slP = U.slider(ctl, { et: "pH", min: 0, max: 14, step: 0.1, val: st.P, fmt: function (v) { return B.fmt(v, 1); }, on: function (v) { st.P = v; pinta(); } });
    ctlT = slT.el; ctlP = slP.el;
    function lista() { return st.modo === "T" ? ENZ_T : ENZ_P; }
    function actual() { var r = lista()[0]; lista().forEach(function (e) { if (e.k === st.enz[st.modo]) r = e; }); return r; }
    function fichasEnz() {
      U.fichas(cEnz, lista().map(function (e) { return { k: e.k, t: e.t }; }), st.enz[st.modo], function (k) { st.enz[st.modo] = k; pinta(); });
    }
    function pinta() {
      var e = actual(), esT = st.modo === "T", x = esT ? st.T : st.P, rel = (esT ? relT(x, e.opt) : relP(x, e.opt)), msg, cls = "";
      ctlT.style.display = esT ? "" : "none"; ctlP.style.display = esT ? "none" : "";
      plot(); g.limpiar();
      g.curva(function (t) { return 100 * (esT ? relT(t, e.opt) : relP(t, e.opt)); }, { clase: "c-pen", n: 400 });
      g.vertical(e.opt, { clase: "c-ok" });
      g.punto(x, 100 * rel, { clase: "c-red" });
      dat.innerHTML = "<div><b>" + (esT ? "Temperatura" : "pH") + "</b>" + (esT ? Math.round(x) + " °C" : B.fmt(x, 1)) + "</div><div><b>Actividad relativa</b>" + f1(rel * 100) + " %</div>" +
        "<div><b>Óptimo de esta enzima</b>" + (esT ? e.opt + " °C" : B.fmt(e.opt, 1)) + "</div><div><b>Estado</b>" + (rel >= 0.9 ? "en su óptimo" : (esT && x > e.opt ? "desnaturalizándose" : esT ? "lenta (frío)" : "lejos del óptimo")) + "</div>";
      if (rel >= 0.9) { msg = "Cerca del óptimo: la forma del sitio activo es la ideal y la actividad es máxima."; cls = " ok"; }
      else if (esT && x < e.opt) msg = "Poca energía cinética: menos choques entre enzima y sustrato. La enzima sigue intacta: al calentar, recupera la actividad.";
      else if (esT) { msg = "Por encima del óptimo se rompen los enlaces débiles, el sitio activo pierde su forma y la enzima se desnaturaliza: la actividad cae de golpe y no se recupera al enfriar."; cls = " mal"; }
      else { msg = "Un pH alejado del óptimo cambia las cargas de los aminoácidos del sitio activo: el sustrato no encaja bien y, si es extremo, la proteína se desnaturaliza."; cls = rel < 0.2 ? " mal" : ""; }
      ver.className = "bio4-veredicto" + cls;
      ver.textContent = msg;
    }
    fichasEnz(); pinta();
  };
})(typeof window !== "undefined" ? window : this);
