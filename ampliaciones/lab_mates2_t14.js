/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 14 (Distribuciones de probabilidad)
   m2t14_discreta (variable aleatoria discreta: función de probabilidad, media y desviación típica)
   m2t14_binom    (binomial B(n, p): barras con P(X=k), P(X≤k), P(X≥k) o P(a≤X≤b) sombreadas)
   m2t14_normal   (campana N(μ, σ): área sombreada, tipificación y lectura de la tabla N(0,1))
   m2t14_inversa  (búsqueda inversa: dado el porcentaje, hallar k)
   m2t14_aprox    (binomial frente a normal con corrección de continuidad)
   Las cifras se verifican con herramientas/verificar_mates2_t14.py (scipy/sympy).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var fil = F.fil;
  var T = B.lab.t14 = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t14-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t14-estilos";
    s.textContent =
      ".m14-t{width:100%;border-collapse:collapse;font:14px var(--math);margin-top:8px}" +
      ".m14-t th,.m14-t td{padding:4px 8px;border-bottom:1px solid var(--line,rgba(128,128,128,.25));text-align:right}" +
      ".m14-t th{font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".m14-t td:first-child,.m14-t th:first-child{text-align:left}" +
      ".m14-ok{color:var(--ok);font-weight:700}.m14-no{color:var(--red);font-weight:700}" +
      "@media(max-width:520px){.m14-t{font-size:12.5px}.m14-t th,.m14-t td{padding:3px 4px}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------
  // Motor numérico: Φ(z), Φ⁻¹, tabla N(0,1) a 4 decimales, binomial
  // ------------------------------------------------------------
  function erf(x) {                      // serie de Maclaurin (|x| ≤ 4) y fracción continua fuera
    var ax = Math.abs(x), s;
    if (ax > 6) return x > 0 ? 1 : -1;
    if (ax <= 3) {
      var term = ax, sum = ax, n = 0;
      while (Math.abs(term) > 1e-17 * Math.abs(sum) && n < 200) { n++; term *= -ax * ax / n; sum += term / (2 * n + 1); }
      s = 2 / Math.sqrt(Math.PI) * sum;
    } else {
      var f = 0, k; for (k = 60; k >= 1; k--) f = k / 2 / (ax + f);
      s = 1 - Math.exp(-ax * ax) / Math.sqrt(Math.PI) / (ax + f);
    }
    return x < 0 ? -s : s;
  }
  T.phi = function (z) { return 0.5 * (1 + erf(z / Math.SQRT2)); };
  T.dens = function (z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); };
  T.phiInv = function (p) { var lo = -9, hi = 9, m, i; for (i = 0; i < 80; i++) { m = (lo + hi) / 2; if (T.phi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };
  T.r4 = function (x) { return Math.round(x * 1e4 + 1e-9) / 1e4; };
  T.r2 = function (x) { return Math.round(x * 100 + 1e-9 * (x < 0 ? -1 : 1)) / 100; };
  T.phiT = function (z) { var a = T.r4(T.phi(T.r2(Math.abs(z)))); return z >= 0 ? a : T.r4(1 - a); };   // Φ(z) por la tabla, con simetría
  T.zTabla = function (p) {            // z (2 decimales) cuya Φ de la tabla está más cerca de p
    var mejor = 0, d = 9, z, e;
    for (z = -4; z <= 4.0001; z += 0.01) { e = Math.abs(T.phiT(T.r2(z)) - p); if (e < d - 1e-12) { d = e; mejor = T.r2(z); } }
    return mejor;
  };
  var LF = [0];
  function lf(n) { while (LF.length <= n) LF.push(LF[LF.length - 1] + Math.log(LF.length)); return LF[n]; }
  T.pmf = function (n, k, p) { if (k < 0 || k > n) return 0; if (p <= 0) return k === 0 ? 1 : 0; if (p >= 1) return k === n ? 1 : 0; return Math.exp(lf(n) - lf(k) - lf(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p)); };
  T.cdf = function (n, k, p) { var s = 0, i; for (i = 0; i <= Math.min(k, n); i++) s += T.pmf(n, i, p); return k < 0 ? 0 : Math.min(1, s); };
  T.aprox = function (n, p, k, modo) {   // exacta y por la normal (sin y con corrección) para P(X≤k), P(X=k), P(X≥k)
    var mu = n * p, sg = Math.sqrt(n * p * (1 - p)), ex, sin, con;
    var Z = function (x) { return T.phi((x - mu) / sg); };
    if (modo === "le") { ex = T.cdf(n, k, p); sin = Z(k); con = Z(k + 0.5); }
    else if (modo === "eq") { ex = T.pmf(n, k, p); sin = 0; con = Z(k + 0.5) - Z(k - 0.5); }
    else { ex = 1 - T.cdf(n, k - 1, p); sin = 1 - Z(k); con = 1 - Z(k - 0.5); }
    return { mu: mu, sg: sg, ex: ex, sin: sin, con: con, cond: n * p >= 5 && n * (1 - p) >= 5 };
  };
  T.DISC = [
    { t: "Dado (puntos)", x: [1, 2, 3, 4, 5, 6], p: [1, 1, 1, 1, 1, 1].map(function (v) { return v / 6; }), pt: ["1/6", "1/6", "1/6", "1/6", "1/6", "1/6"], nota: "Equiprobable: μ = 3,5 aunque el 3,5 no sale nunca." },
    { t: "Caras en 2 monedas", x: [0, 1, 2], p: [0.25, 0.5, 0.25], pt: ["0,25", "0,5", "0,25"], nota: "Simétrica: la media cae en el centro." },
    { t: "Suma de 2 dados", x: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], p: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map(function (v) { return v / 36; }), pt: ["1/36", "2/36", "3/36", "4/36", "5/36", "6/36", "5/36", "4/36", "3/36", "2/36", "1/36"], nota: "Triangular y simétrica: μ = 7." },
    { t: "Juego: gana 5 € con un 6, pierde 1 €", x: [-1, 5], p: [5 / 6, 1 / 6], pt: ["5/6", "1/6"], nota: "μ = 0: es un juego justo (ganancia media nula)." },
    { t: "Tabla dada (P = 0,1·…)", x: [0, 1, 2, 3, 4], p: [0.1, 0.3, 0.4, 0.15, 0.05], pt: ["0,1", "0,3", "0,4", "0,15", "0,05"], nota: "Un caso típico de enunciado con tabla." }
  ];
  T.disc = function (d) {
    var mu = 0, e2 = 0, sp = 0, i; for (i = 0; i < d.x.length; i++) { mu += d.x[i] * d.p[i]; e2 += d.x[i] * d.x[i] * d.p[i]; sp += d.p[i]; }
    return { mu: mu, e2: e2, var: e2 - mu * mu, sg: Math.sqrt(e2 - mu * mu), sp: sp };
  };

  // ------------------------------------------------------------
  // Utilidades de interfaz
  // ------------------------------------------------------------
  function dec(x) { return fmt(x, 4); }
  function slider(host, et, mn, mx, st, val, on, f) { return U.slider(host, { et: et, min: mn, max: mx, step: st, val: val, on: on, fmt: f || function (v) { return fmt(v, 2); } }); }
  function entero(v) { return fmt(v, 0); }
  function rangoSl(sl, mn, mx, st, val) { sl.input.min = mn; sl.input.max = mx; sl.input.step = st; sl.set(Math.max(mn, Math.min(mx, val))); }
  function cad(z) { return fmt(z, 2); }

  // ============================================================
  // DISCRETA: función de probabilidad, μ y σ
  // ============================================================
  B.w.m2t14_discreta = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Variable aleatoria discreta: función de probabilidad, media y desviación típica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 7, ymin: 0, ymax: 0.5, w: 600, h: 260, etx: "x", ety: "P", etiqueta: "Función de probabilidad" });
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta(i) {
      var d = T.DISC[i], r = T.disc(d), mx = Math.max.apply(null, d.p), n = d.x.length, a = d.x[0], b = d.x[n - 1];
      g.rango(a - 0.8, b + 0.8, 0, mx * 1.25); g.limpiar();
      d.x.forEach(function (x, j) { g.rect(x - 0.35, 0, x + 0.35, d.p[j], { clase: "z-pen" }); });
      g.segmento(r.mu, 0, r.mu, mx * 1.25, { clase: "c-red", dash: "5 4" });
      g.texto(r.mu, mx * 1.18, "μ", { clase: "c-red", dx: 4 });
      var sx = d.x.map(function (x, j) { return fmt(x, 0) + "·" + d.pt[j]; }).join(" + ");
      lectura.innerHTML = fil("Valores x", d.x.map(function (x) { return fmt(x, 0); }).join(", "), "ancho") + fil("P(x)", d.pt.join(" · "), "ancho") +
        fil("Comprobación ΣP", fmt(r.sp, 4), "ok") + fil("Media μ = Σ x·P(x)", sx + " = " + fmt(r.mu, 3), "red ancho") +
        fil("E(X²) = Σ x²·P(x)", fmt(r.e2, 3)) + fil("Varianza σ² = E(X²) − μ²", fmt(r.var, 4)) + fil("Desviación típica σ", fmt(r.sg, 4), "pen");
      pie.innerHTML = d.nota + " La línea roja marca la media: el «centro de gravedad» de las barras. La σ mide cuánto se reparten las barras alrededor de ella.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), T.DISC.map(function (z, i) { return { k: String(i), t: z.t }; }), "0", function (k) { pinta(+k); });
    pinta(0);
  };

  // ============================================================
  // BINOMIAL con probabilidad pedida sombreada
  // ============================================================
  B.w.m2t14_binom = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Binomial B(n, p): sombrea la probabilidad que piden");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 10, p: 0.3, a: 3, b: 5, m: "eq" }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sn, sp, sa, sb;
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 11, ymin: 0, ymax: 0.3, w: 600, h: 280, etx: "k", ety: "P", etiqueta: "Binomial" });
    sn = slider(ctl, "Pruebas n", 1, 40, 1, st.n, function (v) { st.n = v; ajusta(); pinta(); }, entero);
    sp = slider(ctl, "Probabilidad de éxito p", 0.05, 0.95, 0.05, st.p, function (v) { st.p = v; pinta(); });
    sa = slider(ctl, "Valor k (o límite inferior a)", 0, 40, 1, st.a, function (v) { st.a = v; if (st.b < v) { st.b = v; sb.set(v); } pinta(); }, entero);
    sb = slider(ctl, "Límite superior b", 0, 40, 1, st.b, function (v) { st.b = v; if (st.a > v) { st.a = v; sa.set(v); } pinta(); }, entero);
    function ajusta() { sa.input.max = st.n; sb.input.max = st.n; if (st.a > st.n) { st.a = st.n; sa.set(st.n); } if (st.b > st.n) { st.b = st.n; sb.set(st.n); } }
    function pinta() {
      var n = st.n, p = st.p, a = st.a, b = st.b, m = st.m, pm = [], mx = 0, i, tot = 0, inc, txt, comp;
      for (i = 0; i <= n; i++) { pm.push(T.pmf(n, i, p)); mx = Math.max(mx, pm[i]); }
      sb.el.style.display = m === "ent" ? "" : "none";
      g.rango(-0.8, n + 0.8, 0, Math.max(0.1, mx * 1.2)); g.limpiar();
      for (i = 0; i <= n; i++) {
        inc = m === "eq" ? i === a : m === "le" ? i <= a : m === "ge" ? i >= a : (i >= a && i <= b);
        if (inc) tot += pm[i];
        g.rect(i - 0.4, 0, i + 0.4, pm[i], { clase: inc ? "z-red" : "z-pen" });
      }
      if (m === "eq") { txt = "P(X = " + a + ") = C(" + n + ", " + a + ")·" + fmt(p, 2) + "<sup>" + a + "</sup>·" + fmt(1 - p, 2) + "<sup>" + (n - a) + "</sup> = " + dec(tot); comp = "—"; }
      else if (m === "le") { txt = "P(X ≤ " + a + ") = P(0) + … + P(" + a + ") = " + dec(tot); comp = "1 − P(X ≥ " + (a + 1) + ") = " + dec(1 - tot) + " ⟶ P(X > " + a + ")"; }
      else if (m === "ge") { var q = a === 0 ? 0 : T.cdf(n, a - 1, p); txt = "P(X ≥ " + a + ") = 1 − P(X ≤ " + (a - 1) + ") = 1 − " + dec(q) + " = " + dec(tot); comp = "Complementario: P(X ≤ " + (a - 1) + ") = " + dec(q); }
      else { txt = "P(" + a + " ≤ X ≤ " + b + ") = P(X ≤ " + b + ") − P(X ≤ " + (a - 1) + ") = " + dec(T.cdf(n, b, p)) + " − " + dec(a === 0 ? 0 : T.cdf(n, a - 1, p)) + " = " + dec(tot); comp = "Suma de " + (b - a + 1) + " barras"; }
      lectura.innerHTML = fil("Modelo", "X ~ B(" + n + "; " + fmt(p, 2) + ")", "ancho") + fil("Probabilidad pedida", txt, "red ancho") + (m === "eq" ? "" : fil("Otra forma", comp, "ancho")) +
        fil("Media μ = n·p", fmt(n * p, 3), "ok") + fil("Desviación típica σ = √(n·p·q)", fmt(Math.sqrt(n * p * (1 - p)), 3), "pen");
      pie.innerHTML = "Las barras <b style='color:var(--red)'>rojas</b> son las que suman la probabilidad pedida. Con «≥» conviene el <b>complementario</b>: 1 − P(X ≤ k − 1) es una resta en vez de muchas sumas.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "eq", t: "P(X = k)" }, { k: "le", t: "P(X ≤ k)" }, { k: "ge", t: "P(X ≥ k)" }, { k: "ent", t: "P(a ≤ X ≤ b)" }], "eq", function (k) { st.m = k; pinta(); });
    ajusta(); pinta();
  };

  // ============================================================
  // NORMAL: área, tipificación y tabla
  // ============================================================
  var CTX = [
    { t: "Estándar N(0, 1)", mu: 0, sg: 1, a: -1, b: 1.5, u: "" },
    { t: "Pesos N(70; 8)", mu: 70, sg: 8, a: 62, b: 82, u: " kg" },
    { t: "Notas N(6; 1,5)", mu: 6, sg: 1.5, a: 5, b: 8, u: "" },
    { t: "Tiempos N(25; 4)", mu: 25, sg: 4, a: 20, b: 30, u: " min" }
  ];
  B.w.m2t14_normal = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Normal N(μ, σ): tipifica y lee la tabla");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { mu: 70, sg: 8, a: 62, b: 82, m: "le", u: " kg" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), smu, ssg, sa, sb;
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: 0, ymax: 1, w: 600, h: 270, etx: "x", sinY: true, etiqueta: "Campana normal" });
    smu = slider(ctl, "Media μ", -10, 100, 1, st.mu, function (v) { st.mu = v; ajusta(); pinta(); }, function (v) { return fmt(v, 0); });
    ssg = slider(ctl, "Desviación σ", 0.5, 20, 0.5, st.sg, function (v) { st.sg = v; ajusta(); pinta(); }, function (v) { return fmt(v, 1); });
    sa = slider(ctl, "Valor a", 0, 1, 0.1, st.a, function (v) { st.a = v; if (st.b < v) { st.b = v; sb.set(v); } pinta(); }, function (v) { return fmt(v, 2); });
    sb = slider(ctl, "Valor b", 0, 1, 0.1, st.b, function (v) { st.b = v; if (st.a > v) { st.a = v; sa.set(v); } pinta(); }, function (v) { return fmt(v, 2); });
    function ajusta() {
      var lo = st.mu - 3.5 * st.sg, hi = st.mu + 3.5 * st.sg, pa = st.sg / 10;
      rangoSl(sa, lo, hi, pa, st.a); rangoSl(sb, lo, hi, pa, st.b); st.a = sa.get(); st.b = sb.get();
      if (st.b < st.a) { st.b = st.a; sb.set(st.a); }
    }
    function pinta() {
      var mu = st.mu, sg = st.sg, a = st.a, b = st.b, m = st.m, pico = 1 / (sg * Math.sqrt(2 * Math.PI)), f = function (x) { return pico * Math.exp(-Math.pow((x - mu) / sg, 2) / 2); };
      var za = (a - mu) / sg, zb = (b - mu) / sg, k, pe, pt, cuenta, etq;
      g.rango(mu - 4 * sg, mu + 4 * sg, 0, pico * 1.22); g.limpiar();
      if (m === "le") g.zona(f, mu - 4 * sg, a, { clase: "z-red" }); else if (m === "ge") g.zona(f, a, mu + 4 * sg, { clase: "z-red" }); else g.zona(f, a, b, { clase: "z-red" });
      g.curva(f, { clase: "c-pen" });
      for (k = -3; k <= 3; k++) { g.segmento(mu + k * sg, 0, mu + k * sg, f(mu + k * sg), { clase: "c-faint" }); if (Math.abs(k) <= 2) g.texto(mu + k * sg, pico * 0.05, "z=" + (k < 0 ? "−" : "") + Math.abs(k), { ancla: "middle", clase: "c-faint" }); }
      g.segmento(a, 0, a, f(a) + pico * 0.08, { clase: "c-red" });
      if (m === "ent") g.segmento(b, 0, b, f(b) + pico * 0.08, { clase: "c-red" });
      if (m === "le") { pe = T.phi(za); pt = T.phiT(za); etq = "P(X ≤ " + fmt(a, 2) + ") = P(Z ≤ " + cad(za) + ")"; cuenta = "Φ(" + cad(za) + ") = " + dec(pt); }
      else if (m === "ge") { pe = 1 - T.phi(za); pt = T.r4(1 - T.phiT(za)); etq = "P(X ≥ " + fmt(a, 2) + ") = P(Z ≥ " + cad(za) + ")"; cuenta = "1 − Φ(" + cad(za) + ") = 1 − " + dec(T.phiT(za)) + " = " + dec(pt); }
      else { pe = T.phi(zb) - T.phi(za); pt = T.r4(T.phiT(zb) - T.phiT(za)); etq = "P(" + fmt(a, 2) + " ≤ X ≤ " + fmt(b, 2) + ") = P(" + cad(za) + " ≤ Z ≤ " + cad(zb) + ")"; cuenta = "Φ(" + cad(zb) + ") − Φ(" + cad(za) + ") = " + dec(T.phiT(zb)) + " − " + dec(T.phiT(za)) + " = " + dec(pt); }
      sb.el.style.display = m === "ent" ? "" : "none";
      lectura.innerHTML = fil("Modelo", "X ~ N(" + fmt(mu, 0) + "; " + fmt(sg, 1) + ")", "ancho") + fil("Tipificación z = (x − μ)/σ", "z<sub>a</sub> = (" + fmt(a, 2) + " − " + fmt(mu, 0) + ")/" + fmt(sg, 1) + " = " + cad(za) + (m === "ent" ? " · z<sub>b</sub> = " + cad(zb) : ""), "pen ancho") +
        fil("Probabilidad pedida", etq, "ancho") + fil("Con la tabla N(0,1)", cuenta, "red ancho") + fil("Valor exacto (calculadora)", dec(pe) + "  (" + fmt(pe * 100, 2) + " %)");
      pie.innerHTML = "Los números <b>z</b> bajo la campana cuentan desviaciones típicas desde la media: tipificar es solo cambiar de escala, por eso la <b>forma y el área no cambian</b>. La tabla sólo da P(Z ≤ z) para z ≥ 0; con z negativa se usa la simetría: P(Z ≤ −z) = 1 − P(Z ≤ z).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), CTX.map(function (z, i) { return { k: String(i), t: z.t }; }), "1", function (k) { var z = CTX[+k]; st.mu = z.mu; st.sg = z.sg; smu.set(z.mu); ssg.set(z.sg); ajusta(); st.a = z.a; st.b = z.b; sa.set(z.a); sb.set(z.b); pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "le", t: "P(X ≤ a)" }, { k: "ge", t: "P(X ≥ a)" }, { k: "ent", t: "P(a ≤ X ≤ b)" }], "le", function (k) { st.m = k; pinta(); });
    ajusta(); st.a = 62; st.b = 82; sa.set(62); sb.set(82); pinta();
  };

  // ============================================================
  // INVERSA: dado el porcentaje, hallar k
  // ============================================================
  B.w.m2t14_inversa = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Búsqueda inversa: del porcentaje al valor k");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { mu: 70, sg: 8, p: 0.9, m: "le" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: 0, ymax: 1, w: 600, h: 260, etx: "x", sinY: true, etiqueta: "Campana normal" });
    var sp = slider(ctl, "Probabilidad dada", 0.05, 0.99, 0.01, st.p, function (v) { st.p = v; pinta(); }, function (v) { return fmt(v * 100, 0) + " %"; });
    function pinta() {
      var mu = st.mu, sg = st.sg, p = st.p, m = st.m, pico = 1 / (sg * Math.sqrt(2 * Math.PI)), f = function (x) { return pico * Math.exp(-Math.pow((x - mu) / sg, 2) / 2); };
      var obj, z, k, k2, tz, linea, pasos;
      if (m === "le") { obj = p; } else if (m === "ge") { obj = 1 - p; } else { obj = (1 + p) / 2; }
      z = T.zTabla(obj); k = mu + z * sg; k2 = mu - z * sg;
      tz = T.phiT(z);
      g.rango(mu - 4 * sg, mu + 4 * sg, 0, pico * 1.22); g.limpiar();
      if (m === "le") g.zona(f, mu - 4 * sg, k, { clase: "z-red" }); else if (m === "ge") g.zona(f, k, mu + 4 * sg, { clase: "z-red" }); else g.zona(f, k2, k, { clase: "z-red" });
      g.curva(f, { clase: "c-pen" });
      g.segmento(k, 0, k, f(k) + pico * 0.1, { clase: "c-red" }); g.texto(k, f(k) + pico * 0.16, "k", { ancla: "middle", clase: "c-red" });
      if (m === "ent") { g.segmento(k2, 0, k2, f(k2) + pico * 0.1, { clase: "c-red" }); g.texto(k2, f(k2) + pico * 0.16, "k′", { ancla: "middle", clase: "c-red" }); }
      if (m === "le") { linea = "P(X ≤ k) = " + fmt(p, 2) + " ⟹ P(Z ≤ z) = " + fmt(p, 2); }
      else if (m === "ge") { linea = "P(X ≥ k) = " + fmt(p, 2) + " ⟹ P(Z ≤ z) = 1 − " + fmt(p, 2) + " = " + fmt(obj, 2); }
      else { linea = "P(k′ ≤ X ≤ k) = " + fmt(p, 2) + " ⟹ P(Z ≤ z) = (1 + " + fmt(p, 2) + ")/2 = " + fmt(obj, 3); }
      pasos = "En la tabla, el valor más cercano a " + fmt(obj, 4) + " es " + dec(tz) + ", que corresponde a z = " + cad(z);
      lectura.innerHTML = fil("Modelo", "X ~ N(" + fmt(mu, 0) + "; " + fmt(sg, 1) + ")", "ancho") + fil("Planteamiento", linea, "ancho") + fil("Búsqueda en la tabla", pasos, "pen ancho") +
        fil("Destipifica x = μ + z·σ", fmt(mu, 0) + " + " + cad(z) + "·" + fmt(sg, 1) + " = " + fmt(k, 2) + (m === "ent" ? "   (y k′ = " + fmt(k2, 2) + ")" : ""), "red ancho");
      pie.innerHTML = "Se trabaja al revés: primero el área (el porcentaje), después z en el <i>cuerpo</i> de la tabla, y al final se destipifica con x = μ + z·σ. Si el área dada es &lt; 0,5, z sale negativa. Con «≥» o «central», antes hay que convertir a P(Z ≤ z).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), CTX.slice(1).map(function (z, i) { return { k: String(i + 1), t: z.t }; }), "1", function (k) { var z = CTX[+k]; st.mu = z.mu; st.sg = z.sg; pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "le", t: "P(X ≤ k) = p" }, { k: "ge", t: "P(X ≥ k) = p" }, { k: "ent", t: "central: P(k′ ≤ X ≤ k) = p" }], "le", function (k) { st.m = k; pinta(); });
    pinta();
  };

  // ============================================================
  // APROXIMACIÓN: binomial frente a normal, con y sin corrección de continuidad
  // ============================================================
  B.w.m2t14_aprox = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Binomial frente a normal: la corrección de continuidad");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 40, p: 0.5, k: 22, m: "le" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sn, sp, sk;
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: 0, ymax: 1, w: 600, h: 280, etx: "k", ety: "P", etiqueta: "Binomial y normal" });
    sn = slider(ctl, "Pruebas n", 4, 100, 1, st.n, function (v) { st.n = v; ajusta(); pinta(); }, entero);
    sp = slider(ctl, "Probabilidad p", 0.05, 0.95, 0.05, st.p, function (v) { st.p = v; ajusta(); pinta(); });
    sk = slider(ctl, "Valor k", 0, 100, 1, st.k, function (v) { st.k = v; pinta(); }, entero);
    function ajusta() { sk.input.max = st.n; if (st.k > st.n) { st.k = st.n; sk.set(st.n); } }
    function pinta() {
      var n = st.n, p = st.p, k = st.k, m = st.m, mu = n * p, sg = Math.sqrt(n * p * (1 - p)), r = T.aprox(n, p, k, m), i, pico = 1 / (sg * Math.sqrt(2 * Math.PI)), f = function (x) { return pico * Math.exp(-Math.pow((x - mu) / sg, 2) / 2); };
      var lo = Math.max(0, Math.floor(mu - 4.2 * sg)), hi = Math.min(n, Math.ceil(mu + 4.2 * sg)), mx = 0, inc, ok;
      for (i = lo; i <= hi; i++) mx = Math.max(mx, T.pmf(n, i, p));
      mx = Math.max(mx, pico);
      g.rango(lo - 0.8, hi + 0.8, 0, mx * 1.2); g.limpiar();
            for (i = lo; i <= hi; i++) { inc = m === "le" ? i <= k : m === "eq" ? i === k : i >= k; g.rect(i - 0.4, 0, i + 0.4, T.pmf(n, i, p), { clase: inc ? "z-red" : "z-pen" }); }
      g.curva(f, { clase: "c-ok" });
      ok = r.cond;
      lectura.innerHTML = fil("Modelo", "B(" + n + "; " + fmt(p, 2) + ") ≈ N(" + fmt(mu, 2) + "; " + fmt(sg, 3) + ")", "ancho") +
        fil("¿Vale la aproximación? n·p ≥ 5 y n·q ≥ 5", "n·p = " + fmt(mu, 1) + " · n·q = " + fmt(n * (1 - p), 1) + (ok ? "  ✓ sí" : "  ✗ no (poco fiable)"), (ok ? "ok" : "red") + " ancho") +
        fil("Valor exacto (binomial)", dec(r.ex), "pen") + (m === "eq" ? "" : fil("Normal SIN corrección", dec(r.sin) + "  (error " + dec(Math.abs(r.sin - r.ex)) + ")")) +
        fil("Normal CON corrección", dec(r.con) + "  (error " + dec(Math.abs(r.con - r.ex)) + ")", "ok");
      pie.innerHTML = "Barras: binomial exacta (rojas = las pedidas). Curva verde: la normal con la misma μ y σ. Como la binomial es discreta, cada barra ocupa de k − 0,5 a k + 0,5: por eso P(X ≤ k) pasa a P(Y ≤ k + 0,5) y P(X ≥ k) a P(Y ≥ k − 0,5). Baja n o acerca p a 0 o 1 y verás cómo falla.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "le", t: "P(X ≤ k)" }, { k: "eq", t: "P(X = k)" }, { k: "ge", t: "P(X ≥ k)" }], "le", function (k) { st.m = k; pinta(); });
    ajusta(); pinta();
  };
})(window);
