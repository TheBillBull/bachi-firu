/* ============================================================
   Bachi para Firu · laboratorio de termoquímica (Física y Química I, tema 6)
   datos + motor B.lab.termo  ·  q6_primer · q6_diagrama · q6_calor · q6_mezcla · q6_cambio
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var T = B.lab.termo = {};

  // ------------------------------------------------------------
  // Datos (tablas de un libro de texto de 1.º de Bachillerato)
  // ------------------------------------------------------------
  // calor específico (J·g⁻¹·K⁻¹)
  T.CE = {
    agua: { n: "agua líquida", c: 4.18 }, hielo: { n: "hielo", c: 2.09 }, vapor: { n: "vapor de agua", c: 2.01 },
    etanol: { n: "etanol", c: 2.44 }, aluminio: { n: "aluminio", c: 0.897 }, hierro: { n: "hierro", c: 0.449 },
    cobre: { n: "cobre", c: 0.385 }, plomo: { n: "plomo", c: 0.129 }, aire: { n: "aire", c: 1.005 }, vidrio: { n: "vidrio", c: 0.84 }
  };
  T.LF = 334;   // J/g  calor latente de fusión del agua
  T.LV = 2260;  // J/g  calor latente de vaporización del agua
  T.CAL = 4.184; // J por caloría
  T.ATML = 101.325; // J por atm·L

  // masas molares (g/mol)
  T.M = {
    "H₂": 2.016, "CH₄": 16.04, "C₂H₆": 30.07, "C₃H₈": 44.10, "C₄H₁₀": 58.12, "C₈H₁₈": 114.23, "C₂H₅OH": 46.07, "CH₃OH": 32.04, "C": 12.01,
    "C₆H₁₂O₆": 180.16, "CO₂": 44.01, "H₂O": 18.02, "CaCO₃": 100.09, "NH₃": 17.03, "CO": 28.01, "SO₂": 64.06, "Fe₂O₃": 159.69, "Al": 26.98
  };

  // entalpías de formación estándar (kJ/mol); los elementos en su forma estable valen 0
  T.HF = {
    "CH₄(g)": -74.8, "C₂H₆(g)": -84.7, "C₃H₈(g)": -103.8, "C₄H₁₀(g)": -125.7, "C₂H₄(g)": 52.3, "C₂H₂(g)": 226.7, "CO(g)": -110.5, "CO₂(g)": -393.5,
    "H₂O(l)": -285.8, "H₂O(g)": -241.8, "H₂O₂(l)": -187.8, "NH₃(g)": -46.1, "NO(g)": 90.3, "NO₂(g)": 33.2, "SO₂(g)": -296.8, "SO₃(g)": -395.7, "HCl(g)": -92.3,
    "CaO(s)": -635, "CaCO₃(s)": -1207, "Fe₂O₃(s)": -824.2, "Al₂O₃(s)": -1675.7, "C₂H₅OH(l)": -277.7, "CH₃OH(l)": -238.7, "C₆H₁₂O₆(s)": -1273, "C₈H₁₈(l)": -250,
    "NaCl(s)": -411.2, "O₃(g)": 142.7,
    "O₂(g)": 0, "H₂(g)": 0, "N₂(g)": 0, "C(grafito)": 0, "Fe(s)": 0, "Al(s)": 0, "S(s)": 0, "Cl₂(g)": 0
  };

  // entalpías de enlace medias (kJ/mol)
  T.EE = { "H–H": 436, "C–C": 348, "C=C": 614, "C≡C": 839, "C–H": 413, "O=O": 498, "O–H": 463, "C=O": 799, "H–Cl": 431, "Cl–Cl": 243, "N≡N": 945, "N–H": 391, "C–Cl": 328, "C–O": 358 };

  // ------------------------------------------------------------
  // Motor de la ley de Hess
  //   una ecuación: { r: [[coef, "C(s)"], …], p: [[coef, "CO₂(g)"], …], dH }
  // ------------------------------------------------------------
  T.mapa = function (eq, f) {
    var m = {}; f = f == null ? 1 : f;
    eq.p.forEach(function (s) { m[s[1]] = (m[s[1]] || 0) + f * s[0]; });
    eq.r.forEach(function (s) { m[s[1]] = (m[s[1]] || 0) - f * s[0]; });
    return m;
  };
  // filas: [{ eq, f (factor ≥ 0), inv (boolean) }] → { mapa, dH }
  T.suma = function (filas) {
    var m = {}, dH = 0;
    filas.forEach(function (x) {
      var f = (x.f || 0) * (x.inv ? -1 : 1);
      if (!f) return;
      var mm = T.mapa(x.eq, f);
      Object.keys(mm).forEach(function (k) { m[k] = (m[k] || 0) + mm[k]; });
      dH += f * x.eq.dH;
    });
    Object.keys(m).forEach(function (k) { if (Math.abs(m[k]) < 1e-9) delete m[k]; });
    return { mapa: m, dH: dH };
  };
  T.iguales = function (a, b) {
    var ks = {}; Object.keys(a).concat(Object.keys(b)).forEach(function (k) { ks[k] = 1; });
    return Object.keys(ks).every(function (k) { return Math.abs((a[k] || 0) - (b[k] || 0)) < 1e-9; });
  };
  function coefTxt(c) {
    var a = Math.abs(c);
    if (Math.abs(a - 1) < 1e-9) return "";
    if (Math.abs(a - 0.5) < 1e-9) return "½";
    if (Math.abs(a - 1.5) < 1e-9) return "3/2";
    if (Math.abs(a - 2.5) < 1e-9) return "5/2";
    if (Math.abs(a - 3.5) < 1e-9) return "7/2";
    if (Math.abs(a - 4.5) < 1e-9) return "9/2";
    return fmt(a, 3);
  }
  // mapa → «2 H₂ + O₂ → 2 H₂O»
  T.ecTxt = function (m) {
    var r = [], p = [];
    Object.keys(m).forEach(function (k) { (m[k] > 0 ? p : r).push((coefTxt(m[k]) ? coefTxt(m[k]) + " " : "") + k); });
    return (r.length ? r.join(" + ") : "∅") + " ⟶ " + (p.length ? p.join(" + ") : "∅");
  };
  T.eqTxt = function (eq) {
    function lado(l) { return l.map(function (s) { return (coefTxt(s[0]) ? coefTxt(s[0]) + " " : "") + s[1]; }).join(" + "); }
    return lado(eq.r) + " ⟶ " + lado(eq.p);
  };
  T.dHReaccion = function (eq) {      // ΣΔHf(productos) − ΣΔHf(reactivos)
    var s = 0;
    eq.p.forEach(function (x) { s += x[0] * T.HF[x[1]]; });
    eq.r.forEach(function (x) { s -= x[0] * T.HF[x[1]]; });
    return s;
  };
  // curva de calentamiento del agua para m gramos: T en °C a partir de Q (J) desde T0 = −30 °C
  T.tramos = function (m) {
    return [
      { n: "Calentar el hielo de −30 °C a 0 °C", Q: m * T.CE.hielo.c * 30, t0: -30, t1: 0, liso: true },
      { n: "Fundir el hielo a 0 °C", Q: m * T.LF, t0: 0, t1: 0 },
      { n: "Calentar el agua de 0 °C a 100 °C", Q: m * T.CE.agua.c * 100, t0: 0, t1: 100, liso: true },
      { n: "Vaporizar el agua a 100 °C", Q: m * T.LV, t0: 100, t1: 100 },
      { n: "Calentar el vapor de 100 °C a 130 °C", Q: m * T.CE.vapor.c * 30, t0: 100, t1: 130, liso: true }
    ];
  };
  T.tempDeQ = function (tr, Q) {
    var acc = 0;
    for (var i = 0; i < tr.length; i++) {
      if (Q <= acc + tr[i].Q + 1e-9) { var f = tr[i].Q ? (Q - acc) / tr[i].Q : 0; return { T: tr[i].t0 + (tr[i].t1 - tr[i].t0) * f, i: i, f: f }; }
      acc += tr[i].Q;
    }
    return { T: tr[tr.length - 1].t1, i: tr.length - 1, f: 1 };
  };

  // ------------------------------------------------------------
  // Auxiliares de interfaz
  // ------------------------------------------------------------
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function kJ(x, d) { return fmt(x, d == null ? 1 : d); }
  T.fil = fil;

  // ============================================================
  // PRIMER: ΔU = Q + W y trabajo de expansión
  // ============================================================
  B.w.q6_primer = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Primer principio: ΔU = Q + W");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="q6-sep"><b>Trabajo de expansión a presión constante</b>: W = −p·ΔV</div><div data-ctl2></div><div class="lectura anch q6-lec2"></div><p class="w-pie"></p>';
    var PRE = [
      { t: "Un gas se calienta y se expande", Q: 80, W: -30 }, { t: "Compresión rápida (sin intercambio de calor)", Q: 0, W: 60 },
      { t: "Sistema aislado", Q: 0, W: 0 }, { t: "El gas se enfría a volumen constante", Q: -70, W: 0 }, { t: "Se comprime y desprende calor", Q: -40, W: 90 }
    ];
    var st = { Q: 80, W: -30, p: 1, v1: 2, v2: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ctl2 = U.ctl(cuerpo.querySelector("[data-ctl2]"));
    var lec = cuerpo.querySelector(".lectura"), lec2 = cuerpo.querySelector(".q6-lec2"), pie = cuerpo.querySelector(".w-pie");
    var sQ = U.slider(ctl, { et: "Calor <i>Q</i> (J)", min: -100, max: 100, step: 5, val: st.Q, on: function (v) { st.Q = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var sW = U.slider(ctl, { et: "Trabajo <i>W</i> (J)", min: -100, max: 100, step: 5, val: st.W, on: function (v) { st.W = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl2, { et: "Presión (atm)", min: 0.5, max: 5, step: 0.5, val: st.p, on: function (v) { st.p = v; pinta2(); }, fmt: function (v) { return fmt(v, 1); } });
    var sV1 = U.slider(ctl2, { et: "Volumen inicial (L)", min: 1, max: 10, step: 0.5, val: st.v1, on: function (v) { st.v1 = v; pinta2(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl2, { et: "Volumen final (L)", min: 1, max: 10, step: 0.5, val: st.v2, on: function (v) { st.v2 = v; pinta2(); }, fmt: function (v) { return fmt(v, 1); } });
    function barra(y, v, clase, rot) {
      g.rect(Math.min(0, v), y - 0.28, Math.max(0, v), y + 0.28, { clase: clase });
      g.texto(v >= 0 ? v : v, y, rot + " = " + (v > 0 ? "+" : "") + fmt(v, 0) + " J", { dx: v >= 0 ? 8 : -8, dy: 5, ancla: v >= 0 ? "start" : "end", clase: "pen" });
    }
    function pinta() {
      var Q = st.Q, W = st.W, dU = Q + W; g.limpiar();
      g.segmento(0, 0, 0, 3.5, { clase: "c-ink" });
      barra(3, Q, "z-red", "Q"); barra(2, W, "z-pen", "W"); barra(1, dU, dU >= 0 ? "z-ok" : "z-red", "ΔU");
      var calor = Q > 0 ? "el sistema <b>recibe</b> calor" : Q < 0 ? "el sistema <b>cede</b> calor" : "no hay intercambio de calor";
      var trab = W > 0 ? "se realiza trabajo <b>sobre</b> el sistema (compresión)" : W < 0 ? "el sistema <b>realiza</b> trabajo sobre el entorno (expansión)" : "no hay trabajo";
      lec.innerHTML = fil("Calor", fmt(Q, 0) + " J · " + calor, "red ancho") + fil("Trabajo", fmt(W, 0) + " J · " + trab, "pen ancho") +
        fil("Energía interna ΔU = Q + W", fmt(dU, 0) + " J · " + (dU > 0 ? "la energía interna <b>aumenta</b>" : dU < 0 ? "la energía interna <b>disminuye</b>" : "la energía interna no cambia"), "ok ancho");
      pie.innerHTML = "Convenio de signos: <b>lo que entra en el sistema es positivo</b> y lo que sale es negativo. Q &gt; 0 si recibe calor; W &gt; 0 si se hace trabajo sobre él. Q y W <b>no son funciones de estado</b>, pero su suma ΔU sí lo es: sólo depende del estado inicial y final.";
    }
    function pinta2() {
      var dV = st.v2 - st.v1, W = -st.p * dV * T.ATML;
      lec2.innerHTML = fil("ΔV", fmt(dV, 1) + " L · " + (dV > 0 ? "expansión" : dV < 0 ? "compresión" : "sin cambio de volumen"), "ancho") +
        fil("W = −p·ΔV", fmt(-st.p * dV, 2) + " atm·L = " + fmt(W, 1) + " J", "pen ancho") + fil("Sentido", W < 0 ? "el sistema realiza trabajo sobre el entorno" : W > 0 ? "el entorno realiza trabajo sobre el sistema" : "no hay trabajo", "ancho");
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -220, xmax: 220, ymin: 0.2, ymax: 3.8, w: 600, h: 230, limpio: true, etiqueta: "Balance de energía del sistema" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.Q = PRE[+k].Q; st.W = PRE[+k].W; sQ.set(st.Q); sW.set(st.W); pinta(); });
    pinta(); pinta2();
  };

  // ============================================================
  // DIAGRAMA: perfil de energía, ΔH, energía de activación y catalizador
  // ============================================================
  B.w.q6_diagrama = function (host) {
    var cuerpo = B.caja(host, "Míralo", "Diagrama entálpico: exotérmica, endotérmica y catalizador");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-cat class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var PRE = [
      { t: "Combustión (exotérmica)", dH: -120, Ea: 70 }, { t: "Fusión de una sal (endotérmica)", dH: 70, Ea: 110 }, { t: "Reacción muy exotérmica", dH: -220, Ea: 40 }, { t: "Reacción muy endotérmica", dH: 180, Ea: 230 }
    ];
    var st = { dH: -120, Ea: 70, cat: false }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), bola, an;
    var sD = U.slider(ctl, { et: "ΔH (kJ/mol)", min: -250, max: 250, step: 10, val: st.dH, on: function (v) { st.dH = v; pinta(); }, fmt: function (v) { return (v > 0 ? "+" : "") + fmt(v, 0); } });
    var sE = U.slider(ctl, { et: "Energía de activación (kJ/mol)", min: 20, max: 300, step: 10, val: st.Ea, on: function (v) { st.Ea = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function perfil(dH, Ea, x) {      // altura (kJ/mol) del perfil con los reactivos en 0
      var s = x * x * (3 - 2 * x), pico = 0.4, sp = pico * pico * (3 - 2 * pico);
      return dH * s + (Ea - dH * sp) * Math.exp(-Math.pow((x - pico) / 0.16, 2));
    }
    function datos() {
      var Ea = Math.max(st.Ea, Math.max(st.dH, 0) + 10), Ef = st.cat ? Math.max(Ea * 0.55, Math.max(st.dH, 0) + 5) : Ea;
      return { dH: st.dH, Ea: Ea, Ef: Ef };
    }
    function pinta() {
      var D = datos(), dH = D.dH, top = Math.max(D.Ea, dH) + 40, bot = Math.min(0, dH) - 40;
      g.rango(0, 1, bot, top); g.limpiar();
      g.segmento(0, 0, 0.28, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4); g.segmento(0.72, dH, 1, dH, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      g.texto(0.02, 0, "Reactivos", { dy: -8, clase: "pen" }); g.texto(0.98, dH, "Productos", { dy: dH >= 0 ? -8 : 18, ancla: "end", clase: "red" });
      if (st.cat) g.curva(function (x) { return perfil(dH, D.Ea, x); }, { clase: "c-faint", dash: "6 5", n: 200 });
      g.curva(function (x) { return perfil(dH, D.Ef, x); }, { clase: "c-pen", n: 220 }).setAttribute("stroke-width", 3.2);
      U.flecha(g, 0.5, 0, 0.5, D.Ef * 0.97, { clase: "c-red", grosor: 2 }); g.texto(0.5, D.Ef / 2, "Eₐ", { dx: 8, clase: "red" });
      if (Math.abs(dH) > 5) { U.flecha(g, 0.88, 0, 0.88, dH, { clase: "c-ok", grosor: 2.5 }); g.texto(0.88, dH / 2, "ΔH", { dx: 8, clase: "ok" }); }
      g.horizontal(0, { clase: "c-faint", dash: "3 4" });
      var tipo = dH < 0 ? "exotérmica (ΔH &lt; 0): los productos tienen menos entalpía que los reactivos; se libera energía" : dH > 0 ? "endotérmica (ΔH &gt; 0): los productos tienen más entalpía; se absorbe energía" : "ΔH = 0";
      lec.innerHTML = fil("Tipo", tipo, (dH < 0 ? "ok" : "red") + " ancho") + fil("ΔH", (dH > 0 ? "+" : "") + fmt(dH, 0) + " kJ/mol", "ok") + fil("Eₐ de la reacción directa", fmt(D.Ef, 0) + " kJ/mol" + (st.cat ? " (con catalizador; sin él: " + fmt(D.Ea, 0) + ")" : ""), "red") +
        fil("Eₐ de la reacción inversa", fmt(D.Ef - dH, 0) + " kJ/mol  (Eₐ directa − ΔH)", "pen");
      pie.innerHTML = "Eₐ es la «cuesta» que hay que subir para que la reacción arranque. El <b>catalizador</b> baja Eₐ (línea azul frente a la gris discontinua) pero <b>no cambia ΔH</b> ni los niveles inicial y final: acelera la reacción sin alterar el balance energético. Ojo: ΔH negativo no significa que la reacción sea rápida ni que ocurra sola sin «empujón».";
      if (bola) colocaBola(an ? Math.min(an.t, 3) : 0);
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: -150, ymax: 150, w: 600, h: 320, sinX: true, etx: "coordenada de reacción", ety: "H (kJ/mol)", etiqueta: "Perfil de energía de una reacción" });
    bola = g.punto(0, 0, { capa: "top", r: 8, clase: "c-red" });
    var barra = document.createElement("div"); cuerpo.insertBefore(barra, cuerpo.querySelector("[data-ctl]"));
    function colocaBola(t) { var D = datos(), x = Math.min(1, t / 3); g.mover(bola, x, perfil(D.dH, D.Ef, x)); }
    an = U.animar(barra, function (t) { colocaBola(t); if (t > 3.2) return false; });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.dH = PRE[+k].dH; st.Ea = PRE[+k].Ea; sD.set(st.dH); sE.set(st.Ea); pinta(); });
    U.fichas(cuerpo.querySelector("[data-cat]"), [{ k: "no", t: "Sin catalizador" }, { k: "si", t: "Con catalizador" }], "no", function (k) { st.cat = k === "si"; pinta(); });
    pinta(); colocaBola(0);
  };

  // ============================================================
  // CALOR: Q = m·c·ΔT
  // ============================================================
  var SUST = ["agua", "etanol", "aluminio", "hierro", "cobre", "plomo", "aire"];
  B.w.q6_calor = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calor específico: Q = m·c·ΔT");
    cuerpo.innerHTML = '<div data-sus class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { s: "agua", m: 200, t1: 20, t2: 60 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Masa (g)", min: 10, max: 1000, step: 10, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "Temperatura inicial (°C)", min: 0, max: 100, step: 5, val: st.t1, on: function (v) { st.t1 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "Temperatura final (°C)", min: 0, max: 100, step: 5, val: st.t2, on: function (v) { st.t2 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      var S = T.CE[st.s], m = st.m, dT = st.t2 - st.t1, Q = m * S.c * dT, Qagua = m * T.CE.agua.c * dT;
      var qmax = Math.max(1, Math.abs(Q), Math.abs(Qagua)) / 1000 * 1.1; g.rango(0, qmax, 0, 100); g.limpiar();
      var qk = Math.abs(Q) / 1000, sig = dT >= 0 ? 1 : -1;
      g.curva(function (x) { return st.t1 + sig * x * 1000 / (m * T.CE.agua.c); }, { clase: "c-faint", dash: "6 5", n: 2 });
      g.curva(function (x) { return st.t1 + sig * x * 1000 / (m * S.c); }, { clase: "c-pen", n: 2 }).setAttribute("stroke-width", 3);
      g.segmento(qk, 0, qk, st.t2, { clase: "c-red", dash: "4 4" }); g.punto(qk, st.t2, { r: 6, clase: "c-red" }); g.punto(0, st.t1, { r: 5, clase: "c-ok" });
      g.texto(qk, 0, "Q = " + fmt(qk, 2) + " kJ", { dy: -8, dx: -6, ancla: "end", clase: "red" });
      var ratio = S.c / T.CE.agua.c;
      lec.innerHTML = fil("Sustancia", S.n + " · c = " + fmt(S.c, 3) + " J/(g·K)", "pen") + fil("ΔT = T<sub>f</sub> − T<sub>i</sub>", (dT > 0 ? "+" : "") + fmt(dT, 0) + " K · " + (dT > 0 ? "se calienta" : dT < 0 ? "se enfría" : "sin cambio"), "ancho") +
        fil("Q = m·c·ΔT", fmt(Q, 0) + " J = " + fmt(Q / 1000, 2) + " kJ · " + (Q > 0 ? "calor absorbido" : Q < 0 ? "calor cedido" : "—"), "red ancho") +
        fil("En calorías", fmt(Q / T.CAL, 0) + " cal = " + fmt(Q / T.CAL / 1000, 2) + " kcal", "") + fil("Comparación con el agua", "la misma masa de agua necesitaría " + fmt(Qagua / 1000, 2) + " kJ (" + (ratio < 1 ? "el agua «cuesta» más de calentar: c mayor" : ratio > 1 ? "esta sustancia «cuesta» más que el agua" : "igual") + ")", "ancho");
      pie.innerHTML = "<b>Calor específico c</b>: energía necesaria para subir 1 K la temperatura de 1 g de sustancia. Pendientes: la recta azul es la sustancia elegida y la gris, el agua con la misma masa; cuanto menor es la pendiente (mayor c), más energía hace falta por grado. Por eso el agua modera el clima y los metales se calientan tan rápido.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 50, ymin: 0, ymax: 100, w: 600, h: 300, etx: "Q (kJ)", ety: "T (°C)", etiqueta: "Temperatura frente a calor aportado" });
    U.fichas(cuerpo.querySelector("[data-sus]"), SUST.map(function (k) { return { k: k, t: T.CE[k].n }; }), "agua", function (k) { st.s = k; pinta(); });
    pinta();
  };

  // ============================================================
  // MEZCLA: equilibrio térmico
  // ============================================================
  var SM = ["agua", "aluminio", "cobre", "hierro", "etanol"];
  B.w.q6_mezcla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Equilibrio térmico: ¿a qué temperatura se igualan?");
    cuerpo.innerHTML = '<div class="q6-fila"><div><b>Cuerpo 1</b><div data-s1 class="chips"></div></div><div><b>Cuerpo 2</b><div data-s2 class="chips"></div></div></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { s1: "agua", s2: "cobre", m1: 200, m2: 150, t1: 20, t2: 95 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function sl(et, k, mn, mx, stp) { U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } }); }
    sl("Masa 1 (g)", "m1", 10, 500, 10); sl("T 1 (°C)", "t1", 0, 100, 5); sl("Masa 2 (g)", "m2", 10, 500, 10); sl("T 2 (°C)", "t2", 0, 100, 5);
    function pinta() {
      var c1 = T.CE[st.s1].c, c2 = T.CE[st.s2].c, k1 = st.m1 * c1, k2 = st.m2 * c2, Te = (k1 * st.t1 + k2 * st.t2) / (k1 + k2), Q = k1 * (Te - st.t1);
      g.limpiar();
      function col(x, t, clase, et) { g.rect(x - 0.32, 0, x + 0.32, t, { clase: clase }); g.texto(x, t, fmt(t, 1) + " °C", { dy: -6, ancla: "middle", clase: "pen" }); g.texto(x, 0, et, { dy: 16, ancla: "middle", clase: "faint" }); }
      col(1, st.t1, "z-pen", "cuerpo 1"); col(2, st.t2, "z-red", "cuerpo 2"); col(3, Te, "z-ok", "equilibrio");
      g.horizontal(Te, { clase: "c-ok", dash: "5 4" });
      var cal = st.t1 < st.t2 ? 1 : 2;
      lec.innerHTML = fil("Temperatura de equilibrio", "T<sub>e</sub> = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂) = " + fmt(Te, 2) + " °C", "ok ancho") +
        fil("Capacidades caloríficas m·c", "cuerpo 1: " + fmt(k1, 1) + " J/K · cuerpo 2: " + fmt(k2, 1) + " J/K", "ancho") +
        fil("Calor intercambiado", fmt(Math.abs(Q), 0) + " J (lo que gana el más frío = lo que cede el más caliente)", "red ancho") +
        fil("Comprobación", "Q<sub>cedido</sub> + Q<sub>ganado</sub> = " + fmt(k1 * (Te - st.t1) + k2 * (Te - st.t2), 6) + " J ≈ 0", "");
      pie.innerHTML = "En un sistema aislado, <b>el calor que cede el cuerpo caliente es el que gana el frío</b>: m₁c₁(T<sub>e</sub> − T₁) + m₂c₂(T<sub>e</sub> − T₂) = 0. La temperatura final queda más cerca de la del cuerpo con mayor <b>m·c</b> (el que «pesa» más térmicamente).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0.3, xmax: 3.7, ymin: 0, ymax: 110, w: 560, h: 260, sinX: true, ety: "T (°C)", etiqueta: "Temperaturas inicial y de equilibrio" });
    U.fichas(cuerpo.querySelector("[data-s1]"), SM.map(function (k) { return { k: k, t: T.CE[k].n }; }), "agua", function (k) { st.s1 = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-s2]"), SM.map(function (k) { return { k: k, t: T.CE[k].n }; }), "cobre", function (k) { st.s2 = k; pinta(); });
    pinta();
  };

  // ============================================================
  // CAMBIO: curva de calentamiento del agua
  // ============================================================
  B.w.q6_cambio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Curva de calentamiento del agua: de hielo a vapor");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="ac-tabla q6-tab"></div><p class="w-pie"></p>';
    var st = { m: 100, f: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".q6-tab"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Masa de agua (g)", min: 10, max: 500, step: 10, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "Energía aportada (% del total)", min: 0, max: 100, step: 1, val: 50, on: function (v) { st.f = v / 100; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } });
    var ESTADO = ["hielo (sólido)", "hielo + agua (fusión, 0 °C)", "agua líquida", "agua + vapor (ebullición, 100 °C)", "vapor de agua"];
    function pinta() {
      var tr = T.tramos(st.m), total = tr.reduce(function (a, x) { return a + x.Q; }, 0), Q = st.f * total, r = T.tempDeQ(tr, Q);
      g.rango(0, total / 1000, -40, 140); g.limpiar();
      var acc = 0, pts = [[0, -30]];
      tr.forEach(function (x) { acc += x.Q; pts.push([acc / 1000, x.t1]); });
      g.polilinea(pts, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.horizontal(0, { clase: "c-faint", dash: "3 4" });
      g.punto(Q / 1000, r.T, { r: 7, clase: "c-red" });
      g.segmento(Q / 1000, -40, Q / 1000, r.T, { clase: "c-red", dash: "4 4" });
      var iFase = r.i, nombre = ESTADO[iFase === 0 ? 0 : iFase];
      if (iFase === 1 && r.f <= 1e-9) nombre = ESTADO[0]; if (iFase === 3 && r.f <= 1e-9) nombre = ESTADO[2];
      lec.innerHTML = fil("Energía aportada", fmt(Q / 1000, 1) + " kJ de un total de " + fmt(total / 1000, 1) + " kJ", "red ancho") + fil("Temperatura", fmt(r.T, 1) + " °C", "pen") + fil("Estado", nombre, "ok ancho");
      tab.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Tramo</th><th>Q (kJ)</th><th>% del total</th></tr></thead><tbody>" + tr.map(function (x) { return "<tr><td style='text-align:left'>" + x.n + "</td><td>" + fmt(x.Q / 1000, 2) + "</td><td>" + fmt(100 * x.Q / total, 1) + " %</td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = "En los <b>tramos inclinados</b> el calor sube la temperatura (Q = m·c·ΔT, con un c distinto para cada fase). En las <b>mesetas</b> hay cambio de estado: la energía se invierte en romper las fuerzas intermoleculares y la temperatura <b>no cambia</b> (Q = m·L). Fíjate en lo caro que es vaporizar: más del 70 % de la energía total.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 100, ymin: -40, ymax: 140, w: 600, h: 320, etx: "Q (kJ)", ety: "T (°C)", etiqueta: "Curva de calentamiento del agua" });
    pinta();
  };
})(window);
