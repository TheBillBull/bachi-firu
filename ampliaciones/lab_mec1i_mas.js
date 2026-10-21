/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 13: movimiento armónico simple II)
   f13_vertical · f13_pendulo · f13_asociacion · f13_amortiguado · f13_resonancia
   (usa el motor B.lab.mas definido en lab_mec1h_mas.js)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, S = B.lab.mas;
  var PI = Math.PI, R = PI / 180;
  function lec(r, v, c) { return U.lec(r, v, c); }
  function f2(x, d) { return fmt(x, d == null ? 2 : d); }
  var rect = S.rect, muelleV = S.muelleV, flecha = S.flecha;

  var ASTRO = [{ k: "t", t: "Tierra (9,8)", g: 9.8 }, { k: "m", t: "Marte (3,71)", g: 3.71 }, { k: "l", t: "Luna (1,62)", g: 1.62 }, { k: "j", t: "Júpiter (24,8)", g: 24.8 }];
  function gDe(k) { return ASTRO.filter(function (z) { return z.k === k; })[0].g; }

  // ============================================================
  // F13_VERTICAL: muelle vertical y gravedad
  // ============================================================
  B.w.f13_vertical = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Muelle vertical: el equilibrio se desplaza, el periodo no cambia");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { as: "t", k: 40, m: 1, A: 0.1, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -1.5, xmax: 1.5, ymin: -3, ymax: 0.3, w: 300, h: 340, limpio: true, etiqueta: "Masa colgada de un muelle" });
    var gY = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 2, ymin: -0.5, ymax: 0.5, w: 330, h: 340, etx: "t (s)", ety: "x (m)", etiqueta: "Alargamiento frente al tiempo" });
    sl.k = U.slider(ctl, { et: "Constante k", min: 10, max: 100, step: 5, val: st.k, on: function (v) { st.k = v; ajusta(); }, fmt: function (v) { return f2(v, 0) + " N/m"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.2, max: 3, step: 0.1, val: st.m, on: function (v) { st.m = v; ajusta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.A = U.slider(ctl, { et: "Amplitud A", min: 0, max: 0.4, step: 0.01, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " m"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: 2, step: 0.01, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    function per() { return 2 * PI / S.omega(st.k, st.m); }
    function ajusta() { var T2 = 2 * per(); sl.t.input.max = T2; sl.t.input.step = T2 / 200; st.t = Math.min(st.t, T2); sl.t.set(st.t); pinta(); }
    U.animar(ctl, function (t, dt, reinicio) {
      var T = per(), kv = Math.min(1, T / 1.6);
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t = (st.t + dt * kv) % (2 * T); sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var g = gDe(st.as), w = S.omega(st.k, st.m), T = 2 * PI / w, dl = st.m * g / st.k, A = st.A, t = st.t, x = dl + A * Math.cos(w * t), L0 = 1, T2 = 2 * T;
      var rango = Math.max(dl + A + 0.3, 0.6);
      gE.rango(-1.5, 1.5, -(L0 + rango + 0.7), 0.3); gE.limpiar();
      var hb = 0.22 * (L0 + rango + 1) / 3;
      gE.segmento(-1.1, 0, 1.1, 0, { clase: "c-ink" }).setAttribute("stroke-width", 5);
      var yb = -(L0 + x);
      muelleV(gE, 0, 0, yb, 14, 0.22); rect(gE, 0, yb - hb / 2, 0.8, hb, "z-pen", "var(--pen)");
      gE.segmento(-1.4, -L0, 1.4, -L0, { clase: "c-faint", dash: "3 3" }); gE.texto(1.4, -L0, "L₀", { dy: -5, ancla: "end", clase: "faint" });
      gE.segmento(-1.4, -(L0 + dl), 1.4, -(L0 + dl), { clase: "c-ok", dash: "4 3" }); gE.texto(-1.4, -(L0 + dl), "equilibrio", { dy: -5, clase: "ok" });
      if (A > 0) { gE.segmento(0.9, -(L0 + dl - A), 0.9, -(L0 + dl + A), { clase: "c-red" }).setAttribute("stroke-width", 2.5); }
      gY.rango(0, T2, Math.min(-0.05, dl - A - 0.1) , dl + A + 0.1); gY.limpiar();
      gY.horizontal(0, { clase: "c-faint", dash: "3 4" }); gY.horizontal(dl, { clase: "c-ok", dash: "4 3" });
      gY.curva(function (q) { return dl + A * Math.cos(w * q); }, { clase: "c-pen", n: 240 }).setAttribute("stroke-width", 3);
      gY.segmento(t, 0, t, x, { clase: "c-faint", dash: "3 4" }); gY.punto(t, x, { r: 6, clase: "c-red" });
      gY.texto(T2, dl, "Δℓ", { dx: -4, dy: -6, ancla: "end", clase: "ok" }); gY.texto(T2, 0, "ℓ = ℓ₀", { dx: -4, dy: -6, ancla: "end", clase: "faint" });
      lectura.innerHTML = lec("Alargamiento en el equilibrio  Δℓ = m·g/k", f2(dl * 100, 1) + " cm", "ok") + lec("Frecuencia angular  ω = √(k/m)", f2(w, 3) + " rad/s", "pen") + lec("Periodo  T = 2π√(m/k)", f2(T, 3) + " s", "pen") +
        lec("Alargamiento ahora", f2(x * 100, 1) + " cm" + (x < 0 ? " (comprimido)" : ""), "") + lec("Alargamiento máximo  Δℓ + A", f2((dl + A) * 100, 1) + " cm", "red") + lec("Fuerza máxima del muelle  k(Δℓ + A)", f2(st.k * (dl + A), 2) + " N", "") +
        lec("g del astro", f2(g, 2) + " m/s²", "") + lec("¿Cambia T con g?", "No: T depende sólo de m y k", "ancho ok");
      pie.innerHTML = "Al colgar la masa, el muelle se estira hasta que <b>k·Δℓ = m·g</b>: ese es el nuevo punto de equilibrio (línea verde). La masa oscila <b>alrededor de ese punto</b> como si no existiera el peso: la gravedad sólo desplaza el centro de la oscilación. Por eso, si cambias de astro, cambia Δℓ pero <b>el periodo es el mismo</b> (no así el del péndulo, que sí depende de g). Si A &gt; Δℓ, el muelle llega a comprimirse por encima de su longitud natural.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), ASTRO.map(function (p) { return { k: p.k, t: p.t }; }), "t", function (k) { st.as = k; pinta(); });
    ajusta();
  };

  // ============================================================
  // F13_PENDULO: péndulo simple, comparación con el MAS
  // ============================================================
  B.w.f13_pendulo = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Péndulo simple: ¿cuándo es un MAS?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { as: "t", l: 1, th: 10, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, sol = null, NN = 1800;
    var gE = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -2.6, xmax: 2.6, ymin: -3, ymax: 0.4, w: 300, h: 300, limpio: true, etiqueta: "Péndulo simple" });
    var gT = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 4, ymin: -80, ymax: 80, w: 330, h: 300, etx: "t (s)", ety: "θ (°)", etiqueta: "Ángulo frente al tiempo" });
    sl.l = U.slider(ctl, { et: "Longitud l", min: 0.2, max: 5, step: 0.1, val: st.l, on: function (v) { st.l = v; recalc(); }, fmt: function (v) { return f2(v, 1) + " m"; } });
    sl.th = U.slider(ctl, { et: "Amplitud angular θ₀", min: 1, max: 80, step: 1, val: st.th, on: function (v) { st.th = v; recalc(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: 4, step: 0.01, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    function T0() { return 2 * PI * Math.sqrt(st.l / gDe(st.as)); }
    function tmax() { return 3 * S.Tpend(st.l, gDe(st.as), st.th); }
    function recalc() { var tm = tmax(); sol = S.pendulo(st.l, gDe(st.as), st.th, tm, NN); sl.t.input.max = tm; sl.t.input.step = tm / 300; st.t = Math.min(st.t, tm); sl.t.set(st.t); pinta(); }
    recalc();
    U.animar(ctl, function (t, dt, reinicio) {
      var tm = tmax(), kv = Math.min(1, T0() / 1.8);
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t = (st.t + dt * kv) % tm; sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var g = gDe(st.as), l = st.l, th0 = st.th, tm = tmax(), t0 = T0(), Tr = S.Tpend(l, g, th0), w = Math.sqrt(g / l), i = Math.min(NN, Math.round(st.t / tm * NN)), th = sol.th[i], thH = th0 * R * Math.cos(w * st.t), Ld = 2.5, d, k;
      B.lab.din.iso(gE, -2.7, 2.7, -3, 0.4); gE.limpiar();
      gE.segmento(-1.4, 0, 1.4, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4); gE.arco(0, 0, Ld * 0.55, -90 - th0, -90 + th0, { clase: "c-faint", dash: "3 3" });
      gE.segmento(0, 0, 0, -Ld, { clase: "c-faint", dash: "2 4" });
      gE.segmento(0, 0, Ld * Math.sin(thH), -Ld * Math.cos(thH), { clase: "c-red", dash: "4 3" }); gE.punto(Ld * Math.sin(thH), -Ld * Math.cos(thH), { r: 9, clase: "c-red" });
      gE.segmento(0, 0, Ld * Math.sin(th), -Ld * Math.cos(th), { clase: "c-ink" }).setAttribute("stroke-width", 2.5); gE.punto(Ld * Math.sin(th), -Ld * Math.cos(th), { r: 11, clase: "c-pen" });
      gT.rango(0, tm, -th0 * 1.2, th0 * 1.2); gT.limpiar();
      var pts = []; for (k = 0; k <= NN; k += 6) pts.push([sol.t[k], sol.th[k] / R]);
      gT.curva(function (q) { return th0 * Math.cos(w * q); }, { clase: "c-red", dash: "5 4", n: 300 });
      gT.polilinea(pts, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      gT.segmento(st.t, 0, st.t, th / R, { clase: "c-faint", dash: "3 4" }); gT.punto(st.t, th / R, { r: 6, clase: "c-pen" });
      d = (Tr / t0 - 1) * 100;
      lectura.innerHTML = lec("Periodo del MAS  T₀ = 2π√(l/g)", f2(t0, 3) + " s", "red") + lec("Periodo real del péndulo", f2(Tr, 3) + " s", "pen") + lec("Diferencia (real respecto al MAS)", f2(d, 2) + " %", Math.abs(d) < 1 ? "ok" : "red") +
        lec("Frecuencia angular  ω = √(g/l)", f2(w, 3) + " rad/s", "") + lec("Ángulo ahora (real)", f2(th / R, 1) + "°", "pen") + lec("Velocidad máxima real  √(2gl(1 − cos θ₀))", f2(Math.sqrt(2 * g * l * (1 - Math.cos(th0 * R))), 3) + " m/s", "") +
        lec("g del astro", f2(g, 2) + " m/s²", "");
      pie.innerHTML = "Para <b>ángulos pequeños</b> (hasta unos 15°) sen θ ≈ θ y el péndulo cumple a = −(g/l)·s: es un MAS de periodo <b>T = 2π√(l/g)</b>, que <b>no depende de la masa ni de la amplitud</b> (isocronismo de Galileo) y sí de l y de g. Con amplitudes grandes el periodo real (azul) es algo mayor que el del MAS (rojo): a 60° la diferencia ya es del 7 %. Cámbialo de astro y comprueba cómo varía T con g.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), ASTRO.map(function (p) { return { k: p.k, t: p.t }; }), "t", function (k) { st.as = k; recalc(); });
    recalc();
  };

  // ============================================================
  // F13_ASOCIACION: muelles en serie y en paralelo
  // ============================================================
  B.w.f13_asociacion = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Muelles en serie y en paralelo: constante equivalente");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "serie", k1: 40, k2: 60, m: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 3, ymin: -5.6, ymax: 0.5, w: 560, h: 340, limpio: true, etiqueta: "Dos muelles asociados con una masa colgada" });
    sl.k1 = U.slider(ctl, { et: "Constante k₁", min: 10, max: 200, step: 5, val: st.k1, on: function (v) { st.k1 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " N/m"; } });
    sl.k2 = U.slider(ctl, { et: "Constante k₂", min: 10, max: 200, step: 5, val: st.k2, on: function (v) { st.k2 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " N/m"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.2, max: 5, step: 0.1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    function eq() { return st.modo === "serie" ? st.k1 * st.k2 / (st.k1 + st.k2) : st.k1 + st.k2; }
    function pinta() {
      var k1 = st.k1, k2 = st.k2, m = st.m, ke = eq(), P = m * S.g, esc = 1.2 / (P / 10), L0 = 1.0, T = 2 * PI * Math.sqrt(m / ke);
      g.limpiar(); g.segmento(-2.4, 0, 2.4, 0, { clase: "c-ink" }).setAttribute("stroke-width", 5);
      if (st.modo === "serie") {
        var x1 = P / k1, x2 = P / k2, y1 = -(L0 + x1 * esc), y2 = y1 - (L0 + x2 * esc);
        muelleV(g, 0, 0, y1, 12, 0.25); muelleV(g, 0, y1, y2, 12, 0.25); rect(g, 0, y2 - 0.45, 1.0, 0.9, "z-pen", "var(--pen)"); g.texto(0, y2 - 0.45, f2(m, 1) + " kg", { ancla: "middle", dy: 4 });
        g.texto(0.6, y1 / 2, "k₁", { clase: "pen" }); g.texto(0.6, (y1 + y2) / 2, "k₂", { clase: "pen" });
        flecha(g, 1.5, y2 - 0.45, 1.5, y2 - 0.45 - 1.2, "c-ink", "P", { dx: 6, dy: 12 });
        lectura.innerHTML = lec("Constante equivalente  k = k₁k₂/(k₁ + k₂)", f2(ke, 2) + " N/m", "ok") + lec("Misma fuerza en los dos", f2(P, 2) + " N (= m·g)", "") + lec("Alargamiento del muelle 1  x₁ = F/k₁", f2(x1 * 100, 1) + " cm", "pen") + lec("Alargamiento del muelle 2  x₂ = F/k₂", f2(x2 * 100, 1) + " cm", "pen") +
          lec("Alargamiento total  x₁ + x₂ = F/k", f2((x1 + x2) * 100, 1) + " cm", "ok") + lec("Periodo  T = 2π√(m/k)", f2(T, 3) + " s", "red") + lec("Comparación", "k equivalente &lt; el menor de los dos: el conjunto es más blando", "ancho");
        pie.innerHTML = "En <b>serie</b> (uno a continuación del otro) los dos muelles soportan <b>la misma fuerza</b> (el peso) y <b>sus alargamientos se suman</b>: x = x₁ + x₂ ⇒ 1/k = 1/k₁ + 1/k₂. El conjunto es más blando que cada muelle por separado.";
      } else {
        var xe = P / ke, yb = -(L0 + xe * esc);
        muelleV(g, -1, 0, yb, 12, 0.25); muelleV(g, 1, 0, yb, 12, 0.25); g.segmento(-1.4, yb, 1.4, yb, { clase: "c-ink" }).setAttribute("stroke-width", 4); rect(g, 0, yb - 0.5, 1.0, 0.9, "z-pen", "var(--pen)"); g.texto(0, yb - 0.5, f2(m, 1) + " kg", { ancla: "middle", dy: 4 });
        g.texto(-1.8, yb / 2, "k₁", { clase: "pen" }); g.texto(1.35, yb / 2, "k₂", { clase: "pen" });
        flecha(g, 1.9, yb - 0.5, 1.9, yb - 0.5 - 1.2, "c-ink", "P", { dx: 6, dy: 12 });
        lectura.innerHTML = lec("Constante equivalente  k = k₁ + k₂", f2(ke, 2) + " N/m", "ok") + lec("Mismo alargamiento en los dos  x = F/k", f2(xe * 100, 2) + " cm", "pen") + lec("Fuerza en el muelle 1  F₁ = k₁·x", f2(k1 * xe, 2) + " N", "pen") + lec("Fuerza en el muelle 2  F₂ = k₂·x", f2(k2 * xe, 2) + " N", "pen") +
          lec("Comprobación  F₁ + F₂", f2(k1 * xe + k2 * xe, 2) + " N = m·g", "ok") + lec("Periodo  T = 2π√(m/k)", f2(T, 3) + " s", "red") + lec("Comparación", "k equivalente &gt; la mayor de las dos: el conjunto es más rígido", "ancho");
        pie.innerHTML = "En <b>paralelo</b> (los dos sujetan la misma masa) <b>los alargamientos son iguales</b> y <b>las fuerzas se suman</b>: F = F₁ + F₂ ⇒ k = k₁ + k₂. El conjunto es más rígido y, con la misma masa, oscila más deprisa (T menor).";
      }
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "serie", t: "En serie" }, { k: "par", t: "En paralelo" }], "serie", function (k) { st.modo = k === "serie" ? "serie" : "par"; pinta(); });
    pinta();
  };

  // ============================================================
  // F13_AMORTIGUADO: oscilaciones amortiguadas
  // ============================================================
  var PAM = [
    { k: "no", t: "Sin amortiguamiento", g: 0 },
    { k: "deb", t: "Débil (subamortiguado)", g: 0.4 },
    { k: "fu", t: "Fuerte (subamortiguado)", g: 2.5 },
    { k: "cr", t: "Crítico", g: 6 },
    { k: "so", t: "Sobreamortiguado", g: 10 }
  ];
  B.w.f13_amortiguado = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Oscilaciones amortiguadas: del columpio a los amortiguadores");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { w0: 6, gam: 0.4 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: -1.2, ymax: 1.2, w: 600, h: 300, etx: "t (s)", ety: "x/x₀", etiqueta: "Oscilación amortiguada" });
    sl.w0 = U.slider(ctl, { et: "Frecuencia propia ω₀", min: 2, max: 10, step: 0.5, val: st.w0, on: function (v) { st.w0 = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " rad/s"; } });
    sl.gam = U.slider(ctl, { et: "Amortiguamiento γ", min: 0, max: 12, step: 0.1, val: st.gam, on: function (v) { st.gam = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " s⁻¹"; } });
    function pinta() {
      var w0 = st.w0, gam = st.gam, reg = gam < w0 - 1e-9 ? (gam === 0 ? "sin amortiguamiento (MAS)" : "subamortiguado: oscila con amplitud decreciente") : Math.abs(gam - w0) < 1e-9 ? "amortiguamiento crítico: vuelve al equilibrio lo más rápido sin oscilar" : "sobreamortiguado: vuelve despacio sin oscilar", wd = gam < w0 ? Math.sqrt(w0 * w0 - gam * gam) : 0;
      var tmax = Math.max(4, gam > 0 ? Math.min(30, 5 / Math.max(0.1, gam < w0 ? gam : gam - Math.sqrt(gam * gam - w0 * w0))) : 4 * 2 * PI / w0);
      tmax = Math.max(tmax, 2 * 2 * PI / w0); g.rango(0, tmax, -1.2, 1.2); g.limpiar();
      if (gam > 0 && gam < w0) { g.curva(function (t) { return Math.exp(-gam * t); }, { clase: "c-faint", dash: "5 4" }); g.curva(function (t) { return -Math.exp(-gam * t); }, { clase: "c-faint", dash: "5 4" }); }
      g.curva(function (t) { return S.amort(w0, gam, t); }, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
      lectura.innerHTML = lec("Frecuencia propia (sin amortiguar)  ω₀", f2(w0, 2) + " rad/s", "") + lec("Amortiguamiento  γ", f2(gam, 2) + " s⁻¹", "") + lec("Régimen", reg, "ancho " + (gam < w0 ? "ok" : "red")) +
        (gam < w0 ? lec("Frecuencia amortiguada  ω<sub>d</sub> = √(ω₀² − γ²)", f2(wd, 3) + " rad/s", "pen") + lec("Periodo  T<sub>d</sub> = 2π/ω<sub>d</sub>", f2(2 * PI / wd, 3) + " s", "pen") : "") +
        (gam > 0 && gam < w0 ? lec("La amplitud cae a 1/e en  t = 1/γ", f2(1 / gam, 2) + " s", "red") + lec("Factor de calidad  Q = ω₀/(2γ)", f2(w0 / (2 * gam), 2), "") : "") + (gam === 0 ? lec("Sin pérdidas", "la amplitud se mantiene: MAS ideal", "ok") : "");
      pie.innerHTML = "Cuando hay rozamiento o resistencia (fuerza proporcional a la velocidad, −b·v) la energía se disipa y la amplitud disminuye siguiendo una <b>envolvente exponencial</b> e<sup>−γt</sup> (líneas discontinuas). La oscilación sigue teniendo un periodo constante, algo mayor que el ideal. Si el amortiguamiento es muy fuerte ya no hay oscilación: el amortiguador de un coche está diseñado cerca del régimen <b>crítico</b> para que tras un bache vuelva a su sitio sin rebotar.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PAM.map(function (p) { return { k: p.k, t: p.t }; }), "deb", function (k) { var p = PAM.filter(function (z) { return z.k === k; })[0]; st.gam = k === "cr" ? st.w0 : p.g; sl.gam.set(st.gam); pinta(); });
    pinta();
  };

  // ============================================================
  // F13_RESONANCIA: oscilaciones forzadas
  // ============================================================
  var PRES = [
    { k: "baja", t: "Muy por debajo de ω₀", w: 3, gam: 1 },
    { k: "res", t: "Cerca de la resonancia", w: 9.8, gam: 1 },
    { k: "alta", t: "Muy por encima de ω₀", w: 18, gam: 1 },
    { k: "amort", t: "Resonancia con mucho amortiguamiento", w: 9, gam: 5 },
    { k: "casi", t: "Resonancia casi sin amortiguar", w: 10, gam: 0.2 }
  ];
  B.w.f13_resonancia = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Resonancia: oscilaciones forzadas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var W0 = 10, st = { w: 9.8, gam: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gR = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: 0, xmax: 20, ymin: 0, ymax: 6, w: 330, h: 300, etx: "ω (rad/s)", ety: "A/A₀", etiqueta: "Curva de resonancia" });
    var gT = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 2, ymin: -6, ymax: 6, w: 330, h: 300, etx: "t (s)", ety: "", etiqueta: "Fuerza y respuesta" });
    sl.w = U.slider(ctl, { et: "Frecuencia de la fuerza ω", min: 0.5, max: 20, step: 0.1, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " rad/s"; } });
    sl.gam = U.slider(ctl, { et: "Amortiguamiento γ", min: 0.2, max: 5, step: 0.1, val: st.gam, on: function (v) { st.gam = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " s⁻¹"; } });
    function pinta() {
      var w = st.w, gam = st.gam, r = S.resp(W0, gam, w), d = S.fase(W0, gam, w), ymax = Math.max(1.5, Math.ceil(S.resp(W0, gam, Math.sqrt(Math.max(0.01, W0 * W0 - 2 * gam * gam))) * 1.15)), wres = W0 * W0 - 2 * gam * gam > 0 ? Math.sqrt(W0 * W0 - 2 * gam * gam) : 0, T = 2 * PI / w, tm = Math.max(2 * T, 0.5);
      gR.rango(0, 20, 0, ymax); gR.limpiar(); gR.vertical(W0, { clase: "c-faint", dash: "4 4" }); gR.texto(W0, ymax, "ω₀", { dx: 4, dy: 14, clase: "faint" });
      gR.curva(function (q) { return S.resp(W0, gam, q); }, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3); gR.punto(w, r, { r: 7, clase: "c-red" });
      var am = Math.max(1.2, r * 1.2); gT.rango(0, tm, -am, am); gT.limpiar();
      gT.curva(function (t) { return Math.cos(w * t); }, { clase: "c-faint", dash: "5 4", n: 400 }); gT.curva(function (t) { return r * Math.cos(w * t - d); }, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      gT.texto(tm, 1, "fuerza", { dx: -4, dy: -6, ancla: "end", clase: "faint" }); gT.texto(tm, r, "respuesta", { dx: -4, dy: -6, ancla: "end", clase: "pen" });
      lectura.innerHTML = lec("Frecuencia propia del sistema  ω₀", f2(W0, 1) + " rad/s", "") + lec("Amplitud relativa  A/A₀  (A₀ = F₀/k)", f2(r, 2), "red") + lec("Retraso de la respuesta  δ", f2(d / R, 0) + "°", "pen") +
        lec("Máximo de la curva (resonancia)  ω<sub>res</sub> = √(ω₀² − 2γ²)", wres > 0 ? f2(wres, 2) + " rad/s" : "sin máximo (γ grande)", "ok") + lec("Factor de calidad  Q = ω₀/(2γ)", f2(W0 / (2 * gam), 1), "") +
        lec("Situación", Math.abs(w - W0) < 0.6 ? "¡resonancia! la amplitud se dispara" : w < W0 ? "frecuencia baja: el sistema sigue a la fuerza (A ≈ A₀)" : "frecuencia alta: el sistema casi no se mueve", "ancho " + (Math.abs(w - W0) < 0.6 ? "red" : "ok"));
      pie.innerHTML = "Cuando una fuerza periódica empuja a un oscilador, éste acaba oscilando <b>con la frecuencia de la fuerza</b>, pero su amplitud depende de lo cerca que esté esa frecuencia de la propia ω₀. Si ω ≈ ω₀ ocurre la <b>resonancia</b>: cada empujón llega justo a tiempo y la amplitud crece mucho; con poco amortiguamiento (γ pequeño) el pico es altísimo. Es lo que ocurre al empujar un columpio al ritmo adecuado, al sintonizar una radio o, con consecuencias desastrosas, en puentes que se han hundido por oscilaciones excesivas. El retraso entre fuerza y respuesta pasa de 0° (ω ≪ ω₀) a 90° (resonancia) y a 180° (ω ≫ ω₀).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRES.map(function (p) { return { k: p.k, t: p.t }; }), "res", function (k) { var p = PRES.filter(function (z) { return z.k === k; })[0]; st.w = p.w; st.gam = p.gam; sl.w.set(p.w); sl.gam.set(p.gam); pinta(); });
    pinta();
  };
})(window);
