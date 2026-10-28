/* ============================================================
   Bachi para Firu · Química II, tema 7: Ácidos y bases
   Seis simuladores: q7_escala (pH, pOH y Kw) · q7_calc (calculadora de pH guiada, paso a paso)
   q7_distrib (distribución de especies frente al pH) · q7_sal (hidrólisis de sales)
   q7_regul (disolución reguladora) · q7_valora (curva de valoración e indicador)
   Todos usan el mismo motor: el balance de cargas se resuelve exactamente (sin aproximar) por bisección.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  function fil(r, v, c) { return U.lec(r, v, c); }
  var KW = 1e-14;
  function p2(x) { return (Math.round(x * 100) / 100).toFixed(2).replace(".", ",").replace("-", "−"); }
  // notación científica a partir de 0,1: 0,1 → «0,1»; 0,0316 → «3,16·10⁻²»
  function cs(x, d) {
    if (x === 0 || !isFinite(x)) return fmt(x, 2);
    var e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -1 && e <= 3) return fmt(x, Math.max(0, (d == null ? 3 : d + 1) - 1 - e));
    return fmt(x / Math.pow(10, e), d == null ? 2 : d) + "·10" + U.sup(e);
  }
  function pK(k) { return -Math.log10(k); }

  // ------------------------------------------------------------
  // Motor: p = { na, cl, w: [{ c, ka, z }] }
  //   na = [catión fuerte] (Na⁺…), cl = [anión fuerte] (Cl⁻…) en mol/L;
  //   cada especie débil, de concentración total c, con la constante de acidez ka de su par HA/A:
  //   z = 1 si HA es un catión (NH₄⁺), z = 0 si es neutro (CH₃COOH).
  //   Balance de cargas: [H⁺] + na + Σ z·c·H/(H+ka) = [OH⁻] + cl + Σ (1−z)·c·ka/(ka+H)
  // ------------------------------------------------------------
  function phDe(p) {
    function f(pH) {
      var H = Math.pow(10, -pH), pos = H + (p.na || 0), neg = KW / H + (p.cl || 0);
      (p.w || []).forEach(function (s) { pos += s.z * s.c * H / (H + s.ka); neg += (1 - s.z) * s.c * s.ka / (s.ka + H); });
      return pos - neg;
    }
    var lo = -2, hi = 16, m, i;
    for (i = 0; i < 90; i++) { m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  function cuad(K, c) { return (-K + Math.sqrt(K * K + 4 * K * c)) / 2; }   // x² + Kx − Kc = 0

  // ============================================================
  // Q7_ESCALA: pH, pOH y Kw
  // ============================================================
  var SUST = [
    { k: "0", t: "Jugo gástrico", ph: 1.5 }, { k: "1", t: "Limón", ph: 2.3 }, { k: "2", t: "Vinagre", ph: 2.9 },
    { k: "3", t: "Lluvia", ph: 5.6 }, { k: "4", t: "Agua pura", ph: 7 }, { k: "5", t: "Sangre", ph: 7.4 },
    { k: "6", t: "Amoníaco", ph: 11.5 }, { k: "7", t: "Lejía", ph: 12.5 }
  ];
  B.w.q7_escala = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La escala de pH: [H⁺], [OH⁻] y Kw");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { ph: 7 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    sl = U.slider(ctl, { et: "pH", min: 0, max: 14, step: 0.1, val: 7, on: function (v) { st.ph = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var ph = st.ph, poh = 14 - ph, h = Math.pow(10, -ph), oh = Math.pow(10, -poh);
      g.limpiar();
      g.rect(0, -15, 7, 1, { clase: "z-red" }); g.rect(7, -15, 14, 1, { clase: "z-pen" });
      g.texto(3.5, -13.6, "ácida", { ancla: "middle", clase: "faint" }); g.texto(10.5, -13.6, "básica", { ancla: "middle", clase: "faint" });
      g.curva(function (x) { return -x; }, { clase: "c-red", x0: 0, x1: 14 });
      g.curva(function (x) { return x - 14; }, { clase: "c-pen", x0: 0, x1: 14 });
      g.texto(12, -12, "[H⁺]", { ancla: "middle", clase: "faint", dy: -8 }); g.texto(2, -12, "[OH⁻]", { ancla: "middle", clase: "faint", dy: -8 });
      g.segmento(ph, -15, ph, 1, { clase: "c-faint", dash: "4 4" });
      g.punto(ph, -ph, { r: 6, clase: "c-red" }); g.punto(ph, ph - 14, { r: 6, clase: "c-pen" });
      var neutra = Math.abs(ph - 7) < 0.05;
      lectura.innerHTML = fil("pH", fmt(ph, 1), "pen") + fil("pOH = 14 − pH", fmt(poh, 1)) +
        fil("[H⁺]", cs(h) + " mol/L", "red") + fil("[OH⁻]", cs(oh) + " mol/L", "pen") +
        fil("[H⁺]·[OH⁻]", "siempre 1,0·10⁻¹⁴ = Kw", "ancho") +
        fil("Carácter", neutra ? "neutra" : (ph < 7 ? "ácida" : "básica") + ": [H⁺] es " + cs(h / 1e-7, 2) + " veces la del agua pura", "ancho");
      pie.innerHTML = "Cada unidad de pH es un factor <b>10</b> en [H⁺] (y al revés en [OH⁻]). Las dos rectas se cruzan en pH 7, donde [H⁺] = [OH⁻] = 10⁻⁷ mol/L. Su suma en escala logarítmica vale siempre −14 porque [H⁺]·[OH⁻] = K<sub>w</sub> (a 25 °C). Los valores de las sustancias son orientativos.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 14, ymin: -15, ymax: 1, w: 620, h: 280, etx: "pH", ety: "log [ion]", etiqueta: "Concentraciones de H+ y OH- frente al pH" });
    U.fichas(cuerpo.querySelector("[data-sel]"), SUST.map(function (s) { return { k: s.k, t: s.t }; }), "4", function (k) { st.ph = SUST[+k].ph; sl.set(st.ph); pinta(); });
    pinta();
  };

  // ============================================================
  // Q7_CALC: calculadora de pH guiada (enseña los pasos y compara «aproximado» con «exacto»)
  // ============================================================
  var ACIDOS = [{ t: "CH₃COOH", K: 1.8e-5 }, { t: "HF", K: 6.8e-4 }, { t: "HNO₂", K: 4.5e-4 }, { t: "HCN", K: 4.9e-10 }];
  var BASES = [{ t: "NH₃", K: 1.8e-5 }, { t: "CH₃NH₂", K: 4.4e-4 }];
  B.w.q7_calc = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora de pH guiada: ¿aproximo o resuelvo la ecuación?");
    cuerpo.innerHTML = '<div data-tipo class="chips"></div><div data-sus class="chips"></div><div data-ctl></div><div class="lectura anch"></div><div class="w-pasos"></div><div data-gr class="chips"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var st = { tipo: "af", sus: 0, lc: -1, K: 1.8e-5, gr: "ph" }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")),
        lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos"), pie = cuerpo.querySelector(".w-pie"), slk;
    var elTipo = cuerpo.querySelector("[data-tipo]"), elSus = cuerpo.querySelector("[data-sus]");
    U.slider(ctl, { et: "Concentración c", min: -3.5, max: 0, step: 0.05, val: st.lc, on: function (v) { st.lc = v; pinta(); }, fmt: function (v) { return cs(Math.pow(10, v), 2) + " mol/L"; } });
    slk = U.slider(ctl, { et: "pK", min: 2, max: 9, step: 0.01, val: pK(st.K), on: function (v) { st.K = Math.pow(10, -v); pinta(); }, fmt: function (v) { return p2(v) + " (K = " + cs(Math.pow(10, -v), 2) + ")"; } });
    function acido() { return st.tipo === "af" || st.tipo === "ad"; }
    function fuerte() { return st.tipo === "af" || st.tipo === "bf"; }
    function lista() { return acido() ? ACIDOS : BASES; }
    function eligeSus() {
      elSus.style.display = fuerte() ? "none" : ""; slk.el.style.display = fuerte() ? "none" : "";
      if (!fuerte()) U.fichas(elSus, lista().map(function (s, i) { return { k: String(i), t: s.t }; }), String(st.sus), function (k) { st.sus = +k; st.K = lista()[st.sus].K; slk.set(pK(st.K)); pinta(); });
    }
    function phDeC(l, ac, K) { return phDe({ w: [{ c: Math.pow(10, l), ka: ac ? K : KW / K, z: ac ? 0 : 1 }] }); }
    function phFuerte(l, ac) { var c = Math.pow(10, l), x = (c + Math.sqrt(c * c + 4 * KW)) / 2; return ac ? -Math.log10(x) : 14 + Math.log10(x); }
    function pinta() {
      var ac = acido(), c = Math.pow(10, st.lc), K = st.K, f = fmt, html, ion = ac ? "H⁺" : "OH⁻";
      if (fuerte()) {
        var x = (c + Math.sqrt(c * c + 4 * KW)) / 2, ph = phFuerte(st.lc, ac);
        html = "<ol><li><b>Disociación total</b>: " + (ac ? "HA + H₂O → A⁻ + H₃O⁺" : "BOH → B⁺ + OH⁻") + " (una sola flecha).</li>" +
          "<li>Por tanto [" + ion + "] = c = <b>" + cs(c) + " mol/L</b>" + (c < 1e-6 ? ". Con c tan baja el agua aporta casi tanto como el " + (ac ? "ácido" : "la base") + " y hay que contarla: [" + ion + "] = " + cs(x) : "") + ".</li>" +
          "<li>" + (ac ? "pH = −log[H⁺] = <b>" + p2(ph) + "</b>" : "pOH = −log[OH⁻] = " + p2(14 - ph) + ", pH = 14 − pOH = <b>" + p2(ph) + "</b>") + ".</li></ol>";
        lectura.innerHTML = fil("pH", p2(ph), "pen") + fil("[" + ion + "]", cs(x) + " mol/L") + fil("α", "100 % (total)", "ok") + fil("Tipo", (ac ? "ácido" : "base") + " fuerte");
      } else {
        var K0 = ac ? "K<sub>a</sub>" : "K<sub>b</sub>", xa = Math.sqrt(K * c), xq = cuad(K, c), aA = xa / c, aQ = xq / c, vale = aA < 0.05,
            xf = vale ? xa : xq, pEx = phDeC(st.lc, ac, K), pAp = ac ? -Math.log10(xa) : 14 + Math.log10(xa), pFin = ac ? -Math.log10(xf) : 14 + Math.log10(xf);
        html = "<ol><li>Equilibrio: " + (ac ? "HA + H₂O ⇌ A⁻ + H₃O⁺" : "B + H₂O ⇌ BH⁺ + OH⁻") + ".</li>" +
          "<li>Tabla (tema 6): inicial <b>c</b>, <b>0</b>, <b>0</b> · cambio <b>−x</b>, <b>+x</b>, <b>+x</b> · equilibrio <b>c − x</b>, <b>x</b>, <b>x</b>, con x = [" + ion + "].</li>" +
          "<li>" + K0 + " = x² / (c − x) = <b>" + cs(K) + "</b> (p" + K0 + " = " + p2(pK(K)) + ").</li>" +
          "<li>Si α es pequeño, c − x ≈ c y x ≈ √(" + K0 + "·c) = √(" + cs(K) + " · " + cs(c) + ") = <b>" + cs(xa) + " mol/L</b>.</li>" +
          "<li>Comprobación: α ≈ x/c = <b>" + f(aA * 100, 2) + " %</b> → " + (vale ? "menor que el 5 %: <b>la aproximación vale</b>." : "mayor o igual que el 5 %: <b>no vale</b>. Se resuelve x² + " + K0 + "·x − " + K0 + "·c = 0 y sale x = <b>" + cs(xq) + " mol/L</b>.") + "</li>" +
          "<li>" + (ac ? "pH = −log x = <b>" + p2(pFin) + "</b>" : "pOH = −log x = " + p2(-Math.log10(xf)) + ", pH = 14 − pOH = <b>" + p2(pFin) + "</b>") + ".</li></ol>";
        if (Math.abs(pEx - pFin) > 0.03) html += "<p><small>Con una constante muy pequeña o una disolución muy diluida el agua aporta iones comparables a los de " + (ac ? "ese ácido" : "esa base") + " y este método se queda corto; el pH «exacto» de arriba ya los incluye.</small></p>";
        lectura.innerHTML = fil("pH (exacto)", p2(pEx), "pen") + fil("pH aproximado", p2(pAp), vale ? "ok" : "red") + fil("α exacto", f(aQ * 100, 2) + " %") + fil("α aproximado", f(aA * 100, 2) + " %", vale ? "ok" : "red") +
          fil("¿Vale la aproximación?", vale ? "sí, α &lt; 5 %" : "no, α ≥ 5 %: resuelve la ecuación de 2.º grado", "ancho " + (vale ? "ok" : "red"));
      }
      pasos.innerHTML = html;
      dibuja(ac, K, c, K0);
    }
    function dibuja(ac, K, c) {
      var cl = ac ? "c-red" : "c-pen";
      if (st.gr === "ph") {
        g.rango(-3.5, 0, 0, 14); g.limpiar();
        g.curva(function (l) { return phFuerte(l, ac); }, { clase: "c-faint", dash: "5 4", x0: -3.5, x1: 0 });
        if (!fuerte()) g.curva(function (l) { return phDeC(l, ac, K); }, { clase: cl, x0: -3.5, x1: 0 });
        g.punto(st.lc, fuerte() ? phFuerte(st.lc, ac) : phDeC(st.lc, ac, K), { r: 6, clase: cl });
        g.texto(-3.4, ac ? 13 : 1.2, "pH", { clase: "faint" });
        pie.innerHTML = "Eje horizontal: log c (de 0,0003 a 1 mol/L). La curva discontinua es la de un " + (ac ? "ácido" : "una base") + " <b>fuerte</b> de la misma c" + (fuerte() ? ": pH = −log c (ácido) o 14 + log c (base), una recta." : "; el " + (ac ? "ácido" : "la base") + " débil queda lejos de ella.");
      } else {
        g.rango(-3.5, 0, 0, 100); g.limpiar();
        g.rect(-3.5, 0, 0, 5, { clase: "z-ok" });
        if (fuerte()) g.curva(function () { return 100; }, { clase: "c-ok", x0: -3.5, x1: 0 });
        else {
          g.curva(function (l) { return Math.min(100, 100 * Math.sqrt(K / Math.pow(10, l))); }, { clase: "c-faint", dash: "5 4", x0: -3.5, x1: 0 });
          g.curva(function (l) { var cc = Math.pow(10, l); return 100 * cuad(K, cc) / cc; }, { clase: cl, x0: -3.5, x1: 0 });
        }
        g.punto(st.lc, fuerte() ? 100 : 100 * cuad(K, c) / c, { r: 6, clase: cl });
        g.texto(-3.4, 92, "α (%)", { clase: "faint" });
        pie.innerHTML = "Franja verde: α &lt; 5 %, donde la aproximación vale. Curva continua: α exacto; discontinua: α aproximado √(K/c). Al <b>diluir</b> (ir a la izquierda) α sube y la aproximación deja de valer.";
      }
    }
    U.fichas(elTipo, [{ k: "af", t: "Ácido fuerte" }, { k: "ad", t: "Ácido débil" }, { k: "bf", t: "Base fuerte" }, { k: "bd", t: "Base débil" }], st.tipo, function (k) {
      st.tipo = k; st.sus = 0; if (!fuerte()) { st.K = lista()[0].K; slk.set(pK(st.K)); } eligeSus(); pinta();
    });
    U.fichas(cuerpo.querySelector("[data-gr]"), [{ k: "ph", t: "Gráfico: pH según c" }, { k: "al", t: "Gráfico: α según c" }], "ph", function (k) { st.gr = k; pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3.5, xmax: 0, ymin: 0, ymax: 14, w: 620, h: 270, etx: "log c", ety: "", etiqueta: "pH o grado de disociación frente a la concentración" });
    eligeSus(); pinta();
  };

  // ============================================================
  // Q7_DISTRIB: fracción de cada especie de un ácido frente al pH
  // ============================================================
  var DIS = {
    ac: { t: "CH₃COOH", esp: ["CH₃COOH", "CH₃COO⁻"], K: [1.8e-5] },
    hf: { t: "HF", esp: ["HF", "F⁻"], K: [6.8e-4] },
    nh4: { t: "NH₄⁺", esp: ["NH₄⁺", "NH₃"], K: [KW / 1.8e-5] },
    hclo: { t: "HClO", esp: ["HClO", "ClO⁻"], K: [3.0e-8] },
    co2: { t: "H₂CO₃", esp: ["H₂CO₃", "HCO₃⁻", "CO₃²⁻"], K: [4.5e-7, 4.7e-11] }
  };
  function fracs(Ks, ph) {
    var n = Ks.length, H = Math.pow(10, -ph), t = [Math.pow(H, n)], P = 1, i, s;
    for (i = 1; i <= n; i++) { P *= Ks[i - 1]; t.push(P * Math.pow(H, n - i)); }
    s = t.reduce(function (a, b) { return a + b; }, 0);
    return t.map(function (x) { return x / s; });
  }
  B.w.q7_distrib = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Qué especie predomina a cada pH?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "ac", ph: 4.74 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    sl = U.slider(ctl, { et: "pH", min: 0, max: 14, step: 0.05, val: st.ph, on: function (v) { st.ph = v; pinta(); }, fmt: function (v) { return p2(v); } });
    var CL = ["c-red", "c-ok", "c-pen"], TX = ["red", "ok", "pen"];
    function pinta() {
      var S = DIS[st.k], n = S.K.length, fr = fracs(S.K, st.ph), mejor = 0;
      g.limpiar();
      S.esp.forEach(function (e, i) { g.curva(function (x) { return 100 * fracs(S.K, x)[i]; }, { clase: CL[i], x0: 0, x1: 14 }); g.punto(st.ph, 100 * fr[i], { r: 6, clase: CL[i] }); if (fr[i] > fr[mejor]) mejor = i; });
      S.K.forEach(function (K, i) { g.segmento(pK(K), 0, pK(K), 100, { clase: "c-faint", dash: "4 4" }); g.texto(pK(K), 100, "pK" + (n > 1 ? (i + 1) : "") + " = " + p2(pK(K)), { ancla: "middle", dy: 12, clase: "faint" }); });
      g.segmento(st.ph, 0, st.ph, 100, { clase: "c-ink" });
      lectura.innerHTML = S.esp.map(function (e, i) { return fil(e, fmt(100 * fr[i], 1) + " %", TX[i] + (i === mejor ? " ancho" : "")); }).join("") +
        fil("Predomina", S.esp[mejor], "ancho") +
        fil("[" + S.esp[1] + "]/[" + S.esp[0] + "]", "10<sup>pH − pK" + (n > 1 ? "<sub>a1</sub>" : "<sub>a</sub>") + "</sup> = " + cs(Math.pow(10, st.ph - pK(S.K[0])), 2), "ancho");
      pie.innerHTML = "Regla: si pH &lt; pK<sub>a</sub> predomina la forma <b>ácida</b>; si pH &gt; pK<sub>a</sub>, la <b>básica</b>; si pH = pK<sub>a</sub>, están al 50 % (Henderson–Hasselbalch). Cerca de ese punto (±1 unidad de pH) conviven las dos formas: es la zona de las disoluciones reguladoras.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 14, ymin: 0, ymax: 105, w: 620, h: 280, etx: "pH", ety: "%", etiqueta: "Distribución de especies frente al pH" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(DIS).map(function (k) { return { k: k, t: DIS[k].t }; }), st.k, function (k) {
      st.k = k; st.ph = Math.round(pK(DIS[k].K[0]) * 20) / 20; sl.set(st.ph); pinta();
    });
    pinta();
  };

  // ============================================================
  // Q7_SAL: hidrólisis de sales, paso a paso
  // ============================================================
  var NaP = { f: "Na⁺", d: "NaOH (base fuerte)" }, ClP = { f: "Cl⁻", d: "HCl (ácido fuerte)" };
  var NH4P = { f: "NH₄⁺", d: "NH₃ (base débil, K<sub>b</sub> = 1,8·10⁻⁵)", Kb: 1.8e-5, base: "NH₃" };
  function anion(f, h, Ka) { return { f: f, d: h + " (ácido débil, K<sub>a</sub> = " + cs(Ka, 1) + ")", Ka: Ka, ac: h }; }
  var SAL = [
    { k: "nacl", t: "NaCl", c: NaP, a: ClP },
    { k: "nh4cl", t: "NH₄Cl", c: NH4P, a: ClP },
    { k: "naac", t: "CH₃COONa", c: NaP, a: anion("CH₃COO⁻", "CH₃COOH", 1.8e-5) },
    { k: "nacn", t: "NaCN", c: NaP, a: anion("CN⁻", "HCN", 4.9e-10) },
    { k: "naf", t: "NaF", c: NaP, a: anion("F⁻", "HF", 6.8e-4) },
    { k: "nh4ac", t: "CH₃COONH₄", c: NH4P, a: anion("CH₃COO⁻", "CH₃COOH", 1.8e-5) },
    { k: "nh4cn", t: "NH₄CN", c: NH4P, a: anion("CN⁻", "HCN", 4.9e-10) }
  ];
  B.w.q7_sal = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Hidrólisis: ¿qué pH tiene una disolución de sal?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="lectura anch"></div><div class="w-pasos"></div><p class="w-pie"></p>';
    var st = { k: "naac", lc: -1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Concentración c", min: -3, max: 0, step: 0.05, val: st.lc, on: function (v) { st.lc = v; pinta(); }, fmt: function (v) { return cs(Math.pow(10, v), 2) + " mol/L"; } });
    function pinta() {
      var S = SAL.filter(function (s) { return s.k === st.k; })[0], c = Math.pow(10, st.lc), f = fmt, w = [], na = 0, cl = 0, h = [], html, ph, tipo, Kh, x;
      if (S.c.Kb) w.push({ c: c, ka: KW / S.c.Kb, z: 1 }); else na = c;
      if (S.a.Ka) w.push({ c: c, ka: S.a.Ka, z: 0 }); else cl = c;
      ph = phDe({ na: na, cl: cl, w: w });
      html = "<ol><li><b>Disociación</b> (100 %): " + S.t + " → " + S.c.f + " + " + S.a.f + ", cada ion a " + cs(c) + " mol/L.</li>" +
        "<li><b>Catión</b> " + S.c.f + ": viene de " + S.c.d + (S.c.Kb ? ", así que es un <b>ácido débil</b> con K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = " + cs(KW / S.c.Kb) : "; no reacciona con el agua") + ".</li>" +
        "<li><b>Anión</b> " + S.a.f + ": viene de " + S.a.d + (S.a.Ka ? ", así que es una <b>base débil</b> con K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = " + cs(KW / S.a.Ka) : "; no reacciona con el agua") + ".</li>";
      if (!S.c.Kb && !S.a.Ka) { tipo = "neutra"; html += "<li>Ningún ion se hidroliza: el pH es el del agua, <b>7,00</b>.</li></ol>"; }
      else if (S.c.Kb && !S.a.Ka) {
        Kh = KW / S.c.Kb; x = Math.sqrt(Kh * c); tipo = "ácida";
        html += "<li><b>Hidrólisis</b>: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ ; x = √(K<sub>a</sub>·c) = √(" + cs(Kh) + " · " + cs(c) + ") = " + cs(x) + " mol/L = [H⁺].</li><li>pH = −log x = <b>" + p2(-Math.log10(x)) + "</b> → disolución <b>ácida</b>.</li></ol>";
      } else if (!S.c.Kb && S.a.Ka) {
        Kh = KW / S.a.Ka; x = Math.sqrt(Kh * c); tipo = "básica";
        html += "<li><b>Hidrólisis</b>: " + S.a.f + " + H₂O ⇌ " + S.a.ac + " + OH⁻ ; x = √(K<sub>b</sub>·c) = √(" + cs(Kh) + " · " + cs(c) + ") = " + cs(x) + " mol/L = [OH⁻].</li><li>pOH = " + p2(-Math.log10(x)) + " → pH = 14 − pOH = <b>" + p2(14 + Math.log10(x)) + "</b> → disolución <b>básica</b>.</li></ol>";
      } else {
        var Ka1 = KW / S.c.Kb, Kb1 = KW / S.a.Ka, pa = pK(S.a.Ka), pb = pK(S.c.Kb);
        tipo = Math.abs(ph - 7) < 0.1 ? "casi neutra" : ph < 7 ? "ácida" : "básica";
        html += "<li>Se hidrolizan <b>los dos</b>: compara K<sub>a</sub>(" + S.c.f + ") = " + cs(Ka1) + " con K<sub>b</sub>(" + S.a.f + ") = " + cs(Kb1) + ". " + (Ka1 > Kb1 * 1.2 ? "Gana el ácido: pH &lt; 7." : Kb1 > Ka1 * 1.2 ? "Gana la base: pH &gt; 7." : "Son casi iguales: pH ≈ 7.") + "</li>" +
          "<li>Resultado (independiente de c): pH = 7 + ½(pK<sub>a</sub> − pK<sub>b</sub>) = 7 + ½(" + p2(pa) + " − " + p2(pb) + ") = <b>" + p2(7 + 0.5 * (pa - pb)) + "</b>.</li></ol>";
      }
      pasos.innerHTML = html;
      lectura.innerHTML = fil("pH (exacto)", p2(ph), "pen") + fil("Carácter", tipo, ph < 6.9 ? "red" : ph > 7.1 ? "pen" : "ok") + fil("[H⁺]", cs(Math.pow(10, -ph)) + " mol/L");
      pie.innerHTML = "Regla: el ion que viene del ácido o la base <b>fuerte</b> no hace nada; el que viene del <b>débil</b> se hidroliza y manda. «El más fuerte gana»: por eso NH₄Cl es ácida y CH₃COONa básica. Cuando hay dos iones débiles se comparan sus constantes.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), SAL.map(function (s) { return { k: s.k, t: s.t }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q7_REGUL: disolución reguladora (tampón) frente a agua pura al añadir ácido o base fuertes
  // ============================================================
  var PARES = {
    ac: { t: "CH₃COOH / CH₃COO⁻", K: 1.8e-5, z: 0 }, nh4: { t: "NH₄⁺ / NH₃", K: KW / 1.8e-5, z: 1 },
    co2: { t: "H₂CO₃ / HCO₃⁻", K: 4.5e-7, z: 0 }, hclo: { t: "HClO / ClO⁻", K: 3.0e-8, z: 0 }
  };
  function phRegul(k, ct, r, x) {   // 100 mL de tampón de concentración total ct y cociente base/ácido r; x mmol de NaOH (+) o de HCl (−)
    var P = PARES[k], nHA = ct * 100 / (1 + r), nA = ct * 100 * r / (1 + r);
    return phDe({ na: ((P.z === 0 ? nA : 0) + Math.max(x, 0)) / 100, cl: ((P.z === 1 ? nHA : 0) + Math.max(-x, 0)) / 100, w: [{ c: ct, ka: P.K, z: P.z }] });
  }
  B.w.q7_regul = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Disolución reguladora: ¿cuánto resiste?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "ac", lc: -1, lr: 0, x: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Concentración total", min: -2, max: 0, step: 0.05, val: st.lc, on: function (v) { st.lc = v; pinta(); }, fmt: function (v) { return cs(Math.pow(10, v), 2) + " mol/L"; } });
    U.slider(ctl, { et: "[base]/[ácido]", min: -1, max: 1, step: 0.05, val: 0, on: function (v) { st.lr = v; pinta(); }, fmt: function (v) { return fmt(Math.pow(10, v), 2); } });
    U.slider(ctl, { et: "Añado (100 mL)", min: -20, max: 20, step: 0.5, val: 0, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return v === 0 ? "nada" : fmt(Math.abs(v), 1) + " mmol de " + (v < 0 ? "HCl" : "NaOH"); } });
    function modelo() {
      var P = PARES[st.k], ct = Math.pow(10, st.lc), r = Math.pow(10, st.lr), nHA = ct * 100 / (1 + r), nA = ct * 100 * r / (1 + r);
      return { P: P, ct: ct, r: r, nHA: nHA, nA: nA, buf: function (x) { return phRegul(st.k, ct, r, x); }, agua: function (x) { return phDe({ na: Math.max(x, 0) / 100, cl: Math.max(-x, 0) / 100 }); } };
    }
    function pinta() {
      var M = modelo(), p0 = M.buf(0), p1 = M.buf(st.x), a1 = M.agua(st.x), pka = pK(M.P.K);
      g.limpiar();
      g.rect(-20, pka - 1, 20, pka + 1, { clase: "z-ok" });
      g.texto(19.5, pka + 1, "pK ± 1", { ancla: "end", dy: -4, clase: "faint" });
      g.curva(function (x) { return M.agua(x); }, { clase: "c-faint", dash: "5 4", x0: -20, x1: 20, n: 400 });
      g.curva(function (x) { return M.buf(x); }, { clase: "c-ok", x0: -20, x1: 20, n: 400 });
      g.segmento(st.x, 0, st.x, 14, { clase: "c-faint", dash: "3 4" });
      g.punto(st.x, a1, { r: 5, clase: "c-faint" }); g.punto(st.x, p1, { r: 6, clase: "c-ok" });
      var agota = st.x > 0 ? st.x > M.nHA - 1e-9 : -st.x > M.nA - 1e-9;
      var nb = M.nA + st.x, na = M.nHA - st.x, hh = nb > 0 && na > 0 ? p2(pka + Math.log10(nb / na)) : "—";
      lectura.innerHTML = fil("pH inicial (exacto)", p2(p0), "ok") + fil("pH tras añadir (exacto)", p2(p1), "ok") + fil("Variación ΔpH", p2(p1 - p0), "ok") +
        fil("Agua pura tras añadir lo mismo", p2(a1), "faint") +
        fil("Henderson–Hasselbalch", hh + " = pK + log(" + fmt(Math.max(nb, 0), 1) + " / " + fmt(Math.max(na, 0), 1) + ")", "ancho") +
        fil("Composición inicial (mmol)", "ácido " + fmt(M.nHA, 1) + " · base " + fmt(M.nA, 1), "ancho") +
        fil("Estado", st.x === 0 ? "equilibrado: solo cuenta el cociente base/ácido" : (agota ? "tampón agotado: añadiste más que lo que tenía para neutralizar" : "resiste: solo cambia la proporción base/ácido"), "ancho");
      pie.innerHTML = "Curva verde: el tampón. Discontinua: 100 mL de agua pura con lo mismo. Con poca cantidad añadida el tampón casi no se mueve, y el agua salta varias unidades. Más concentración total (más mmol) = <b>más capacidad</b>; la relación base/ácido fija el <b>pH</b> inicial. Ir fuera de pK ± 1 reduce la capacidad. La ecuación de Henderson–Hasselbalch es una aproximación: coincide con el cálculo exacto hasta la centésima o dos.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -20, xmax: 20, ymin: 0, ymax: 14, w: 620, h: 280, etx: "mmol añadidos (− HCl · + NaOH)", ety: "pH", etiqueta: "pH frente a ácido o base añadidos" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(PARES).map(function (k) { return { k: k, t: PARES[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q7_VALORA: curva de valoración, punto de equivalencia e indicador
  // ============================================================
  var TIPOS = {
    ss: { t: "HCl con NaOH", sub: "fuerte + fuerte", an: "HCl", ti: "NaOH", dir: 1 },
    ds: { t: "CH₃COOH con NaOH", sub: "débil + fuerte", an: "CH₃COOH", ti: "NaOH", dir: 1, Ka: 1.8e-5 },
    bd: { t: "NH₃ con HCl", sub: "base débil", an: "NH₃", ti: "HCl", dir: -1, Kb: 1.8e-5 },
    bs: { t: "NaOH con HCl", sub: "base fuerte", an: "NaOH", ti: "HCl", dir: -1 }
  };
  var IND = [
    { k: "nm", t: "Naranja de metilo", lo: 3.1, hi: 4.4, ca: "rojo", cb: "amarillo" },
    { k: "rm", t: "Rojo de metilo", lo: 4.2, hi: 6.3, ca: "rojo", cb: "amarillo" },
    { k: "bt", t: "Azul de bromotimol", lo: 6.0, hi: 7.6, ca: "amarillo", cb: "azul" },
    { k: "ff", t: "Fenolftaleína", lo: 8.2, hi: 10.0, ca: "incoloro", cb: "rosa" },
    { k: "no", t: "Sin indicador" }
  ];
  function phValora(k, c0, ct, V0, V) {
    var T = TIPOS[k], Vt = V0 + V, n0 = c0 * V0, nt = ct * V, p;
    if (k === "ss") p = { cl: n0 / Vt, na: nt / Vt };
    else if (k === "ds") p = { na: nt / Vt, w: [{ c: n0 / Vt, ka: T.Ka, z: 0 }] };
    else if (k === "bd") p = { cl: nt / Vt, w: [{ c: n0 / Vt, ka: KW / T.Kb, z: 1 }] };
    else p = { na: n0 / Vt, cl: nt / Vt };
    return phDe(p);
  }
  B.w.q7_valora = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Valoración: curva de pH, punto de equivalencia e indicador");
    cuerpo.innerHTML = '<div data-tipo class="chips"></div><div data-ind class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "ss", ind: "ff", c0: 0.1, ct: 0.1, f: 0.5 }, V0 = 25, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "[muestra]", min: 0.05, max: 0.5, step: 0.01, val: st.c0, on: function (v) { st.c0 = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " mol/L (25 mL)"; } });
    U.slider(ctl, { et: "[bureta]", min: 0.05, max: 0.5, step: 0.01, val: st.ct, on: function (v) { st.ct = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " mol/L"; } });
    U.slider(ctl, { et: "Volumen añadido", min: 0, max: 2, step: 0.005, val: st.f, on: function (v) { st.f = v; pinta(); }, fmt: function (v) { return fmt(v * Veq(), 1) + " mL"; } });
    function Veq() { return st.c0 * V0 / st.ct; }
    function phAt(V) { return phValora(st.k, st.c0, st.ct, V0, V); }
    function pinta() {
      var T = TIPOS[st.k], ve = Veq(), V = st.f * ve, ph = phAt(V), peq = phAt(ve), j1 = phAt(0.999 * ve), j2 = phAt(1.001 * ve), jlo = Math.min(j1, j2), jhi = Math.max(j1, j2);
      var I = IND.filter(function (x) { return x.k === st.ind; })[0], veredicto, clz = "z-red";
      g.rango(0, 2 * ve, 0, 14); g.limpiar();
      if (I.lo != null) {
        var ideal = I.lo <= peq && peq <= I.hi, mid = (I.lo + I.hi) / 2, vale = mid >= jlo && mid <= jhi;
        clz = ideal ? "z-ok" : vale ? "z-pen" : "z-red";
        g.rect(0, I.lo, 2 * ve, I.hi, { clase: clz });
        g.texto(1.98 * ve, I.hi, I.t, { ancla: "end", dy: -4, clase: "faint" });
        veredicto = ideal ? "Ideal: su zona de viraje contiene el pH del punto de equivalencia." : vale ? "Sirve: vira dentro del salto, con un error de menos del 0,1 %, aunque no contiene el pH de equivalencia." : "No sirve: vira fuera del salto de pH y el color cambiaría antes o después del punto de equivalencia.";
      } else veredicto = "Elige un indicador para ver su zona de viraje.";
      g.curva(function (v) { return phAt(v); }, { clase: "c-pen", x0: 0, x1: 2 * ve, n: 400 });
      g.segmento(ve, 0, ve, 14, { clase: "c-faint", dash: "5 4" });
      g.texto(ve, 0.4, "equivalencia", { ancla: "middle", clase: "faint" });
      g.punto(ve, peq, { r: 5, clase: "c-ok" });
      if (st.k === "ds" || st.k === "bd") { var pka = st.k === "ds" ? pK(T.Ka) : 14 - pK(T.Kb); g.punto(ve / 2, phAt(ve / 2), { r: 4, clase: "c-red" }); g.texto(ve / 2, phAt(ve / 2), "pH = pK", { ancla: "middle", dy: st.k === "ds" ? 16 : -8, clase: "faint" }); }
      g.punto(V, ph, { r: 6.5, clase: "c-red" });
      var estado, f = st.f;
      if (f === 0) estado = "solo " + T.an;
      else if (Math.abs(f - 1) < 0.003) estado = "punto de equivalencia: solo la sal";
      else if (f < 1) estado = st.k === "ss" || st.k === "bs" ? "queda " + T.an + " sin neutralizar (exceso)" : st.k === "ds" ? "mezcla reguladora CH₃COOH / CH₃COO⁻" : "mezcla reguladora NH₃ / NH₄⁺";
      else estado = "exceso de " + T.ti + " (la sal no cuenta)";
      var col = I.lo == null ? "—" : ph < I.lo ? I.ca : ph > I.hi ? I.cb : "viraje (mezcla de colores)";
      lectura.innerHTML = fil("Volumen de equivalencia", fmt(ve, 2) + " mL (C·V = C·V)", "ok") + fil("pH en la equivalencia", p2(peq), "ok") + fil("Salto (±0,1 %)", fmt(jlo, 1) + " a " + fmt(jhi, 1)) +
        fil("Ahora: V, pH", fmt(V, 1) + " mL · " + p2(ph), "red") + fil("En el matraz", estado, "ancho") + fil("Color del indicador", col, "ancho") + fil("Indicador elegido", veredicto, "ancho " + (clz === "z-ok" ? "ok" : clz === "z-pen" ? "pen" : "red"));
      pie.innerHTML = "La curva sube (o baja) de forma brusca alrededor de la equivalencia. En fuerte–fuerte el punto vale <b>pH 7</b>; en débil–fuerte la sal formada se hidroliza y el pH de equivalencia es <b>&gt; 7</b> (ácido débil) o <b>&lt; 7</b> (base débil). Banda: zona de viraje del indicador (verde = ideal; azul = sirve; roja = no sirve).";
    }
    U.fichas(cuerpo.querySelector("[data-tipo]"), Object.keys(TIPOS).map(function (k) { return { k: k, t: TIPOS[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-ind]"), IND.map(function (i) { return { k: i.k, t: i.t }; }), st.ind, function (k) { st.ind = k; pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 50, ymin: 0, ymax: 14, w: 620, h: 300, etx: "mL añadidos", ety: "pH", etiqueta: "Curva de valoración" });
    pinta();
  };

  B.lab = B.lab || {};
  B.lab.q7 = { phDe: phDe, cuad: cuad, fracs: fracs, DIS: DIS, SAL: SAL, TIPOS: TIPOS, PARES: PARES, ACIDOS: ACIDOS, BASES: BASES, IND: IND, SUST: SUST, phValora: phValora, phRegul: phRegul };
})(window);
