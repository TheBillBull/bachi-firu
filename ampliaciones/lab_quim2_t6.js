/* ============================================================
   Bachi para Firu · Química II, tema 6: Equilibrio químico (ampliación B)
   Se suma a lab_equilibrio.js (eqtiempo, equilibrio), que ya cubre Q frente a K, Le Chatelier y la vuelta al equilibrio en el tiempo.
   Aquí solo lo que faltaba:
   q6_alfa      grado de disociación α frente al volumen (cuándo importa V y cuándo no)
   q6_vanthoff  ln K frente a 1/T: pendiente = −ΔH/R (exotérmica / endotérmica)
   q6_inerte    gas inerte a V constante y a P constante
   q6_ks        solubilidad de una sal poco soluble y efecto del ion común
   q6_precip    ¿precipita al mezclar? Q frente a Ks
   El motor (B.lab.q6) no toca el DOM.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  function fil(r, v, c) { return U.lec(r, v, c); }
  function cien(x, d) { return U.cient(x, d == null ? 2 : d); }
  var R = 8.314;

  // ---------- motor ----------
  function biseccion(f, lo, hi) {            // f(lo) y f(hi) de signo contrario
    var flo = f(lo), m, fm;
    for (var i = 0; i < 200; i++) {
      m = (lo + hi) / 2; fm = f(m);
      if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m;
    }
    return (lo + hi) / 2;
  }
  // esp = [{nu}] (nu<0 reactivos); n = moles; devuelve ln Q con concentraciones n/V
  function lnQ(esp, n, V) {
    var s = 0;
    for (var i = 0; i < esp.length; i++) s += esp[i].nu * Math.log(Math.max(n[i] / V, 1e-300));
    return s;
  }
  // avance ξ (mol) desde la mezcla n hasta Q = Kc
  function avance(esp, n, V, Kc) {
    var lo = -Infinity, hi = Infinity, i, lim;
    for (i = 0; i < esp.length; i++) {
      lim = -n[i] / esp[i].nu;
      if (esp[i].nu > 0) lo = Math.max(lo, lim); else hi = Math.min(hi, lim);
    }
    var eps = 1e-12 * (isFinite(hi - lo) ? Math.max(1, hi - lo) : 1);
    if (!isFinite(lo)) lo = -1e3; if (!isFinite(hi)) hi = 1e3;
    var lk = Math.log(Kc);
    return biseccion(function (x) {
      var s = 0;
      for (var j = 0; j < esp.length; j++) s += esp[j].nu * Math.log(Math.max(n[j] + esp[j].nu * x, 1e-300) / V);
      return s - lk;
    }, lo + eps, hi - eps);
  }
  function mezcla(esp, n, x) { return n.map(function (v, i) { return Math.max(0, v + esp[i].nu * x); }); }

  // sales poco solubles: Ks = (m s)^m (n s)^n
  var SAL = {
    agcl: { t: "AgCl", cat: "Ag⁺", an: "Cl⁻", m: 1, n: 1, Ks: 1.8e-10 },
    baso4: { t: "BaSO₄", cat: "Ba²⁺", an: "SO₄²⁻", m: 1, n: 1, Ks: 1.1e-10 },
    pbi2: { t: "PbI₂", cat: "Pb²⁺", an: "I⁻", m: 1, n: 2, Ks: 7.1e-9 },
    caf2: { t: "CaF₂", cat: "Ca²⁺", an: "F⁻", m: 1, n: 2, Ks: 3.9e-11 },
    ag2cro4: { t: "Ag₂CrO₄", cat: "Ag⁺", an: "CrO₄²⁻", m: 2, n: 1, Ks: 1.1e-12 }
  };
  function sol0(S) { return Math.pow(S.Ks / (Math.pow(S.m, S.m) * Math.pow(S.n, S.n)), 1 / (S.m + S.n)); }
  // solubilidad (mol/L) con concentración c de ion común (cat: catión o anión)
  function solIon(S, c, ion) {
    var cc = ion === "cat" ? c : 0, ca = ion === "an" ? c : 0, lk = Math.log(S.Ks);
    return Math.exp(biseccion(function (ls) {
      var s = Math.exp(ls);
      return S.m * Math.log(S.m * s + cc) + S.n * Math.log(S.n * s + ca) - lk;
    }, -60, 5));
  }
  function qProd(S, ccat, can) { return Math.pow(ccat, S.m) * Math.pow(can, S.n); }

  B.lab = B.lab || {};
  B.lab.q6 = { avance: avance, mezcla: mezcla, lnQ: lnQ, SAL: SAL, sol0: sol0, solIon: solIon, qProd: qProd };

  // ============================================================
  // Q6_ALFA: grado de disociación frente al volumen
  // ============================================================
  var DISO = {
    pcl5: { t: "PCl₅ ⇌ PCl₃ + Cl₂", Kc: 0.0267, a: 1, esp: [{ n: "PCl₅", nu: -1 }, { n: "PCl₃", nu: 1 }, { n: "Cl₂", nu: 1 }], dn: 1 },
    n2o4: { t: "N₂O₄ ⇌ 2 NO₂", Kc: 4.6e-3, a: 1, esp: [{ n: "N₂O₄", nu: -1 }, { n: "NO₂", nu: 2 }], dn: 1 },
    hi: { t: "2 HI ⇌ H₂ + I₂", Kc: 0.0184, a: 2, esp: [{ n: "HI", nu: -2 }, { n: "H₂", nu: 1 }, { n: "I₂", nu: 1 }], dn: 0 }
  };
  function alfa(D, n0, V) {
    var n = D.esp.map(function (e, i) { return i === 0 ? n0 : 0; });
    var x = avance(D.esp, n, V, D.Kc), ne = mezcla(D.esp, n, x);
    return { alfa: D.a * x / n0, ne: ne, c: ne.map(function (v) { return v / V; }) };
  }
  B.lab.q6.alfa = alfa; B.lab.q6.DISO = DISO;

  B.w.q6_alfa = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Grado de disociación α: ¿importa el volumen?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><p class="eq-ec" data-ec></p><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { r: "pcl5", n0: 1, V: 10 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ec = cuerpo.querySelector("[data-ec]");
    U.slider(ctl, { et: "n₀ (mol)", min: 0.2, max: 2, step: 0.1, val: st.n0, on: function (v) { st.n0 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "V (L)", min: 1, max: 20, step: 0.5, val: st.V, on: function (v) { st.V = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 1, xmax: 20, ymin: 0, ymax: 1.05, w: 620, h: 280, etx: "V (L)", ety: "α", etiqueta: "Grado de disociación frente al volumen" });
    function pinta() {
      var D = DISO[st.r], a = alfa(D, st.n0, st.V);
      ec.innerHTML = "K<sub>c</sub> = " + (D.Kc < 0.01 ? cien(D.Kc, 1) : fmt(D.Kc, 4)) + " · Δn(gas) = " + (D.dn > 0 ? "+" : "") + D.dn;
      g.limpiar();
      g.curva(function (V) { return alfa(D, st.n0, V).alfa; }, { clase: "c-pen", n: 80, x0: 1, x1: 20 }).setAttribute("stroke-width", 3);
      g.punto(st.V, a.alfa, { r: 6, clase: "c-red" });
      g.segmento(st.V, 0, st.V, a.alfa, { clase: "c-faint", dash: "4 4" });
      var h = D.esp.map(function (e, i) { return fil("[" + e.n + "]", fmt(a.c[i], 4) + " M", i === 0 ? "red" : "pen"); }).join("");
      lectura.innerHTML = fil("α", fmt(a.alfa * 100, 1) + " %", "ok") + h + fil("Comprobación: Q = K<sub>c</sub>", fmt(Math.exp(lnQ(D.esp, a.ne, st.V)), 5), "ancho");
      pie.innerHTML = D.dn === 0
        ? "Aquí Δn = 0: el volumen se cancela en K<sub>c</sub> y <b>α no depende de V</b> (la curva es plana)."
        : "Δn = +1: al <b>aumentar V</b> (menos presión) el equilibrio se desplaza hacia el lado con más moles de gas y α sube. Con n₀ mayor, α baja.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "pcl5", t: "PCl₅ ⇌ PCl₃ + Cl₂" }, { k: "n2o4", t: "N₂O₄ ⇌ 2 NO₂" }, { k: "hi", t: "2 HI ⇌ H₂ + I₂" }], st.r, function (k) { st.r = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q6_VANTHOFF: ln K frente a 1/T
  // ============================================================
  B.w.q6_vanthoff = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La constante K frente a la temperatura");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var T1 = 300, st = { dH: -92, T2: 600 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sH = U.slider(ctl, { et: "ΔH (kJ/mol)", min: -150, max: 150, step: 2, val: st.dH, on: function (v) { st.dH = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "T (K)", min: 250, max: 700, step: 10, val: st.T2, on: function (v) { st.T2 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 1.3, xmax: 4.1, ymin: -10, ymax: 10, w: 620, h: 300, etx: "1000/T (10⁻³ K⁻¹)", ety: "ln(K/K₃₀₀)", etiqueta: "ln K frente a 1/T" });
    function pinta() {
      var dH = st.dH, T2 = st.T2, x1 = 1000 / T1, x2 = 1000 / T2;
      var f = function (x) { return -(dH / R) * (x - x1); };
      var ymax = Math.max(1.5, Math.abs(f(1.3)), Math.abs(f(4.1))) * 1.1;
      g.rango(1.3, 4.1, -ymax, ymax); g.limpiar();
      g.curva(f, { clase: dH < 0 ? "c-pen" : "c-red", n: 20 }).setAttribute("stroke-width", 3);
      g.segmento(1.3, 0, 4.1, 0, { clase: "c-faint", dash: "4 4" });
      g.punto(x1, 0, { r: 6, clase: "c-faint" }); g.punto(x2, f(x2), { r: 6, clase: "c-ok" });
      g.texto(x1, 0, "300 K", { dy: -10, ancla: "middle" }); g.texto(x2, f(x2), T2 + " K", { dy: f(x2) >= 0 ? 18 : -10, ancla: "middle" });
      var rat = Math.exp(f(x2));
      var tipo = dH < -0.5 ? "exotérmica" : dH > 0.5 ? "endotérmica" : "sin efecto térmico";
      var ef = Math.abs(T2 - T1) < 1 ? "T igual: K no cambia" : (T2 > T1) === (dH > 0) ? (dH === 0 ? "K no cambia" : "K aumenta: más productos") : "K disminuye: más reactivos";
      lectura.innerHTML = fil("Reacción", tipo, "pen") + fil("K(" + T2 + " K) / K(300 K)", rat < 1000 && rat > 0.001 ? fmt(rat, rat < 10 ? 3 : 1) : cien(rat, 2), "red") + fil("Pendiente = −ΔH/R", fmt(-dH * 1000 / R, 0) + " K", "ok") + fil("Al pasar de 300 K a " + T2 + " K", ef, "ancho");
      pie.innerHTML = "ln(K₂/K₁) = −(ΔH/R)·(1/T₂ − 1/T₁). Exotérmica (ΔH &lt; 0): pendiente positiva en este eje, K <b>baja</b> al subir T. Endotérmica: K <b>sube</b>. Solo la temperatura cambia K.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "-92", t: "NH₃ (ΔH = −92)" }, { k: "57", t: "N₂O₄ → 2 NO₂ (+57)" }, { k: "-9", t: "H₂ + I₂ (−9)" }, { k: "0", t: "ΔH = 0" }], "-92", function (k) { st.dH = +k; sH.set(+k); pinta(); });
    pinta();
  };

  // ============================================================
  // Q6_INERTE: gas inerte a V constante o a P constante
  // ============================================================
  var INER = {
    nh3: { t: "N₂ + 3 H₂ ⇌ 2 NH₃", Kc: 0.08, V0: 2, ini: [1, 3, 0], esp: [{ n: "N₂", nu: -1 }, { n: "H₂", nu: -3 }, { n: "NH₃", nu: 2 }] },
    pcl5: { t: "PCl₅ ⇌ PCl₃ + Cl₂", Kc: 0.0267, V0: 10, ini: [1, 0, 0], esp: [{ n: "PCl₅", nu: -1 }, { n: "PCl₃", nu: 1 }, { n: "Cl₂", nu: 1 }] },
    hi: { t: "H₂ + I₂ ⇌ 2 HI", Kc: 54, V0: 2, ini: [1, 1, 0], esp: [{ n: "H₂", nu: -1 }, { n: "I₂", nu: -1 }, { n: "HI", nu: 2 }] }
  };
  function inerte(D, cond, nHe) {
    var x0 = avance(D.esp, D.ini, D.V0, D.Kc), n1 = mezcla(D.esp, D.ini, x0), nt = n1.reduce(function (a, b) { return a + b; }, 0);
    var V2 = cond === "P" ? D.V0 * (nt + nHe) / nt : D.V0;
    var q2 = Math.exp(lnQ(D.esp, n1, V2) - Math.log(D.Kc));        // Q/K justo tras añadir el inerte
    var x2 = avance(D.esp, n1, V2, D.Kc), n2 = mezcla(D.esp, n1, x2);
    return { n1: n1, n2: n2, V2: V2, qk: q2 };
  }
  B.lab.q6.inerte = inerte; B.lab.q6.INER = INER;

  B.w.q6_inerte = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Añadir un gas inerte: ¿a V o a P constante?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-cond class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { r: "nh3", c: "V", he: 3 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), cont = cuerpo.querySelector(".w-plot");
    U.slider(ctl, { et: "He añadido (mol)", min: 0, max: 6, step: 0.5, val: st.he, on: function (v) { st.he = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var D = INER[st.r], s = inerte(D, st.c, st.he), k = D.esp.length, ymax = 0;
      s.n1.concat(s.n2).forEach(function (v) { ymax = Math.max(ymax, v); });
      cont.innerHTML = "";
      g = new B.Plot(cont, { xmin: 0, xmax: k, ymin: 0, ymax: ymax * 1.2 + 0.01, w: 620, h: 260, sinX: true, etx: "", ety: "n (mol)", etiqueta: "Moles de cada especie antes y después" });
      D.esp.forEach(function (e, i) {
        g.rect(i + 0.12, 0, i + 0.48, s.n1[i], { clase: "z-pen" }); g.rect(i + 0.52, 0, i + 0.88, s.n2[i], { clase: "z-ok" });
        g.texto(i + 0.5, 0, e.n, { dy: -6, ancla: "middle", clase: "pen" });
        g.texto(i + 0.3, s.n1[i], fmt(s.n1[i], 2), { dy: -4, ancla: "middle" }); g.texto(i + 0.7, s.n2[i], fmt(s.n2[i], 2), { dy: -4, ancla: "middle" });
      });
      var cambia = s.n2.some(function (v, i) { return Math.abs(v - s.n1[i]) > 0.0005; });
      var sent = !cambia ? "ninguno" : s.qk < 1 ? "→ productos" : "← reactivos";
      lectura.innerHTML = fil("Volumen", fmt(D.V0, 1) + " L ⟶ " + fmt(s.V2, 2) + " L", "pen") + fil("Q / K<sub>c</sub> al añadir He", fmt(s.qk, 3), "red") + fil("Desplazamiento", sent, "ok");
      pie.innerHTML = st.c === "V"
        ? "<b>V constante:</b> el helio sube la presión total, pero no cambia las concentraciones de las demás sustancias. Q = K<sub>c</sub> y <b>no hay desplazamiento</b> (barras iguales)."
        : "<b>P constante:</b> el recipiente se expande al meter helio. Las concentraciones bajan como si hubieras <em>disminuido la presión</em>: se favorece el lado con <b>más moles de gas</b> (si Δn = 0, nada).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "nh3", t: "N₂ + 3 H₂ ⇌ 2 NH₃" }, { k: "pcl5", t: "PCl₅ ⇌ PCl₃ + Cl₂" }, { k: "hi", t: "H₂ + I₂ ⇌ 2 HI" }], st.r, function (k) { st.r = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-cond]"), [{ k: "V", t: "V constante" }, { k: "P", t: "P constante" }], st.c, function (k) { st.c = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q6_KS: solubilidad e ion común
  // ============================================================
  var SALES = Object.keys(SAL);
  function chipsSal() { return SALES.map(function (k) { return { k: k, t: SAL[k].t }; }); }
  B.w.q6_ks = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Solubilidad y efecto del ion común");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ion class="chips"></div><p class="eq-ec" data-ec></p><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { s: "agcl", ion: "an", p: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ec = cuerpo.querySelector("[data-ec]");
    U.slider(ctl, { et: "[ion común] = 10<sup>−p</sup> M · p", min: 0, max: 5, step: 0.1, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 0, ymin: -8, ymax: -1, w: 620, h: 280, etx: "log [ion común]", ety: "log s", etiqueta: "Solubilidad frente a concentración del ion común" });
    function pinta() {
      var S = SAL[st.s], c = Math.pow(10, -st.p), s0 = sol0(S), s = solIon(S, c, st.ion), ionTxt = st.ion === "cat" ? S.cat : S.an;
      ec.innerHTML = S.t + " ⇌ " + (S.m > 1 ? S.m : "") + S.cat + " + " + (S.n > 1 ? S.n : "") + S.an + " · K<sub>s</sub> = " + cien(S.Ks, 1);
      g.rango(-5, 0, Math.floor(Math.log10(solIon(S, 1, st.ion))) - 0.5, Math.log10(s0) + 1.2); g.limpiar();
      g.horizontal(Math.log10(s0), { clase: "c-faint", dash: "5 4" });
      g.curva(function (x) { return Math.log10(solIon(S, Math.pow(10, x), st.ion)); }, { clase: "c-pen", n: 60, x0: -5, x1: 0 }).setAttribute("stroke-width", 3);
      g.punto(-st.p, Math.log10(s), { r: 6, clase: "c-red" });
      g.texto(-4.9, Math.log10(s0), "sin ion común", { dy: -8 });
      lectura.innerHTML = fil("s sin ion común", cien(s0, 2) + " M", "pen") + fil("s con " + fmt(c, c < 0.01 ? 5 : 3) + " M de " + ionTxt, cien(s, 2) + " M", "red") + fil("Se disuelve ÷", fmt(s0 / s, s0 / s < 100 ? 1 : 0), "ok") +
        fil("Comprobación: Q = K<sub>s</sub>", cien(qProd(S, S.m * s + (st.ion === "cat" ? c : 0), S.n * s + (st.ion === "an" ? c : 0)), 2), "ancho");
      pie.innerHTML = "Añadir un ion que ya forma parte de la sal <b>desplaza el equilibrio de solubilidad hacia el sólido</b> (Le Chatelier): la sal se disuelve menos. K<sub>s</sub> no cambia, porque no cambia la temperatura.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), chipsSal(), st.s, function (k) { st.s = k; renueva(); pinta(); });
    function renueva() {
      var S = SAL[st.s];
      U.fichas(cuerpo.querySelector("[data-ion]"), [{ k: "cat", t: "ion común: " + S.cat }, { k: "an", t: "ion común: " + S.an }], st.ion, function (k) { st.ion = k; pinta(); });
    }
    renueva(); pinta();
  };

  // ============================================================
  // Q6_PRECIP: ¿precipita al mezclar?
  // ============================================================
  B.w.q6_precip = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Precipita al mezclar? Q frente a K<sub>s</sub>");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><p class="eq-ec" data-ec></p><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { s: "agcl", p1: 4, p2: 4, V1: 50, V2: 50 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ec = cuerpo.querySelector("[data-ec]");
    U.slider(ctl, { et: "p₁ ([catión] = 10<sup>−p</sup> M)", min: 1, max: 7, step: 0.1, val: st.p1, on: function (v) { st.p1 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "V₁ (mL)", min: 10, max: 200, step: 5, val: st.V1, on: function (v) { st.V1 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "p₂ ([anión] = 10<sup>−p</sup> M)", min: 1, max: 7, step: 0.1, val: st.p2, on: function (v) { st.p2 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "V₂ (mL)", min: 10, max: 200, step: 5, val: st.V2, on: function (v) { st.V2 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -18, xmax: 0, ymin: 0, ymax: 1, w: 620, h: 150, etx: "log₁₀ (producto de concentraciones)", sinY: true, etiqueta: "Q frente a Ks en escala logarítmica" });
    function pinta() {
      var S = SAL[st.s], V = st.V1 + st.V2, c1 = Math.pow(10, -st.p1) * st.V1 / V, c2 = Math.pow(10, -st.p2) * st.V2 / V;
      var Q = qProd(S, c1, c2), lk = Math.log10(S.Ks), lq = Math.log10(Q), prec = Q > S.Ks * 1.0000001;
      ec.innerHTML = S.t + " ⇌ " + (S.m > 1 ? S.m : "") + S.cat + " + " + (S.n > 1 ? S.n : "") + S.an + " · K<sub>s</sub> = " + cien(S.Ks, 1) + " · Q = [" + S.cat + "]" + (S.m > 1 ? "<sup>" + S.m + "</sup>" : "") + "[" + S.an + "]" + (S.n > 1 ? "<sup>" + S.n + "</sup>" : "");
      g.limpiar();
      g.rect(-18, 0, lk, 1, { clase: "z-ok" }); g.rect(lk, 0, 0, 1, { clase: "z-pen" });
      g.vertical(lk, { clase: "c-ok" }).setAttribute("stroke-width", 3);
      g.vertical(Math.max(-17.8, Math.max(-18, lq)), { clase: "c-red" }).setAttribute("stroke-width", 4);
      g.texto(lk, 0.88, "Kₛ", { dx: -6, ancla: "end", clase: "ok" }); g.texto(Math.max(-17.5, lq), 0.55, "Q", { dx: lq < -9 ? 8 : -8, ancla: lq < -9 ? "start" : "end", clase: "red" });
      g.texto(-17.8, 0.2, "no precipita", { clase: "ok" }); g.texto(-0.2, 0.2, "precipita", { ancla: "end", clase: "pen" });
      lectura.innerHTML = fil("[" + S.cat + "] tras mezclar", cien(c1, 2) + " M", "pen") + fil("[" + S.an + "] tras mezclar", cien(c2, 2) + " M", "pen") + fil("Q", cien(Q, 2), "red") + fil("Q / K<sub>s</sub>", Q / S.Ks < 1000 ? fmt(Q / S.Ks, Q / S.Ks < 10 ? 2 : 1) : cien(Q / S.Ks, 2), "ok") +
        fil("Veredicto", prec ? "Q &gt; K<sub>s</sub>: precipita" : Math.abs(Q / S.Ks - 1) < 1e-6 ? "Q = K<sub>s</sub>: saturada" : "Q &lt; K<sub>s</sub>: no precipita", "ancho");
      pie.innerHTML = "Al mezclar, el volumen total es V₁ + V₂ y cada concentración se <b>diluye</b>: c' = c·V/(V₁ + V₂). Esa es la trampa clásica. Después se compara Q con K<sub>s</sub>: si Q &gt; K<sub>s</sub> se forma precipitado hasta que las concentraciones cumplen K<sub>s</sub>.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), chipsSal(), st.s, function (k) { st.s = k; pinta(); });
    pinta();
  };

})(window);
