/* ============================================================
   Bachi para Firu · Química II, tema 5: Cinética química
   Reutiliza q6_diagrama (perfil de energía, Ea directa/inversa, ΔH y catalizador) y añade cinco:
   q5_curvas (concentración–tiempo: velocidad media, instantánea y coeficientes) · q5_tabla (velocidades iniciales → órdenes)
   q5_maxwell (Maxwell–Boltzmann: fracción de choques con E ≥ Ea) · q5_arrhenius (k frente a T, dos temperaturas)
   q5_mecanismo (etapa lenta, intermedios y ley de velocidad)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  function fil(r, v, c) { return U.lec(r, v, c); }
  var R = 8.314;   // J/(mol·K)

  function cien(x, d) { return U.cient(x, d == null ? 2 : d); }

  // ============================================================
  // Q5_CURVAS: [especie] frente a t; velocidad media (secante) e instantánea (tangente)
  //   v = k·[A]^n  ·  d[A]/dt = −a·v  ·  d[B]/dt = +b·v
  // ============================================================
  var REAC = {
    n2o5: { t: "2 N₂O₅ → 4 NO₂ + O₂", x0: 1.0, esp: [["N₂O₅", -2], ["NO₂", 4], ["O₂", 1]] },
    haber: { t: "N₂ + 3 H₂ → 2 NH₃", x0: 1.0, esp: [["N₂", -1], ["H₂", -3], ["NH₃", 2]], h2: 3 },
    hi: { t: "2 HI → H₂ + I₂", x0: 1.0, esp: [["HI", -2], ["H₂", 1], ["I₂", 1]] }
  };
  // concentración del primer reactivo (el que fija el orden) en el tiempo t, con orden n y constante k (analítico)
  //   d[A]/dt = −a·k·[A]^n  (a = |coeficiente de A|)
  function concA(x0, a, n, k, t) {
    if (n === 0) return Math.max(0, x0 - a * k * t);
    if (n === 1) return x0 * Math.exp(-a * k * t);
    return 1 / (1 / x0 + a * k * t);
  }
  // avance ξ (mol/L de «reacción» = Δ[A]/(−a)) y concentración de cada especie
  function conc(R0, n, k, t) {
    var a = -R0.esp[0][1], A = concA(R0.x0, a, n, k, t), xi = (R0.x0 - A) / a;
    return R0.esp.map(function (e, i) {
      if (e[1] < 0) { var ini = i === 0 ? R0.x0 : R0.x0 * (-e[1]) / a; return ini + e[1] * xi; }
      return e[1] * xi;
    });
  }
  function vInst(R0, n, k, t) {      // v = k·[A]^n (con n = 0 vale k mientras quede A)
    var A = concA(R0.x0, -R0.esp[0][1], n, k, t);
    return n === 0 ? (A > 0 ? k : 0) : k * Math.pow(A, n);
  }
  var TMAX = 20;
  B.w.q5_curvas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Concentración frente al tiempo: velocidad media e instantánea");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ord class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { r: "n2o5", n: 1, k: 0.1, t1: 2, t2: 8 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "k", min: 0.02, max: 0.3, step: 0.01, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    var s1 = U.slider(ctl, { et: "t₁ (s)", min: 0, max: 18, step: 0.5, val: st.t1, on: function (v) { st.t1 = v; if (st.t2 <= v + 0.5) { st.t2 = Math.min(20, v + 0.5); s2.set(st.t2); } pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var s2 = U.slider(ctl, { et: "t₂ (s)", min: 0.5, max: 20, step: 0.5, val: st.t2, on: function (v) { st.t2 = v; if (st.t1 >= v - 0.5) { st.t1 = Math.max(0, v - 0.5); s1.set(st.t1); } pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var cl = ["c-red", "c-ink", "c-pen", "c-ok"];
    function pinta() {
      var R0 = REAC[st.r], n = st.n, k = st.k, a = -R0.esp[0][1];
      var ymax = 0; R0.esp.forEach(function (e, i) { var f = e[1] < 0 ? (i === 0 ? R0.x0 : R0.x0 * (-e[1]) / a) : e[1] * R0.x0 / a; ymax = Math.max(ymax, f); });
      g.rango(0, TMAX, 0, ymax * 1.08); g.limpiar();
      R0.esp.forEach(function (e, i) {
        g.curva(function (t) { return conc(R0, n, k, t)[i]; }, { clase: cl[i], n: 160 }).setAttribute("stroke-width", i === 0 ? 3.2 : 2.4);
      });
      // secante de la primera especie entre t1 y t2 y tangente en t1
      var C1 = conc(R0, n, k, st.t1), C2 = conc(R0, n, k, st.t2);
      g.vertical(st.t1, { clase: "c-faint", dash: "3 4" }); g.vertical(st.t2, { clase: "c-faint", dash: "3 4" });
      g.segmento(st.t1, C1[0], st.t2, C2[0], { clase: "c-red", dash: "6 4" });
      var pend = -a * vInst(R0, n, k, st.t1), dt = 3.2;
      g.segmento(Math.max(0, st.t1 - dt), C1[0] - pend * Math.min(dt, st.t1), Math.min(TMAX, st.t1 + dt), C1[0] + pend * Math.min(dt, TMAX - st.t1), { clase: "c-ok" }).setAttribute("stroke-width", 2.4);
      g.punto(st.t1, C1[0], { r: 5.5, clase: "c-ok" }); g.punto(st.t2, C2[0], { r: 5.5, clase: "c-red" });
      R0.esp.forEach(function (e, i) { g.texto(TMAX, conc(R0, n, k, TMAX)[i], e[0], { ancla: "end", dy: -6, clase: ["red", "ink", "pen", "ok"][i] }); });
      var dtt = st.t2 - st.t1;
      var filas = R0.esp.map(function (e, i) {
        var d = (C2[i] - C1[i]) / dtt;
        return e[0] + ": " + fmt(d, 4) + " ÷ " + Math.abs(e[1]) + " = " + fmt(Math.abs(d / e[1]), 4);
      });
      var vm = Math.abs((C2[0] - C1[0]) / dtt / R0.esp[0][1]);
      lectura.innerHTML = fil("Velocidad media entre t₁ y t₂", fmt(vm, 4) + " mol/(L·s)", "red") +
        fil("Velocidad instantánea en t₁ (tangente verde)", fmt(vInst(R0, n, k, st.t1), 4) + " mol/(L·s)", "ok") +
        fil("Por especie: Δ[ ]/Δt (mol/(L·s)) ÷ coeficiente = v", filas.join("<br>"), "ancho");
      pie.innerHTML = "<b>Secante roja discontinua</b> = velocidad media en el intervalo; <b>tangente verde</b> = velocidad en el instante t₁. En orden 0 (recta) coinciden siempre; en orden 1 y 2 la curva se aplana y la velocidad va bajando, así que la media entre t₁ y t₂ queda por debajo de la instantánea en t₁. Cada especie varía a un ritmo proporcional a su coeficiente, pero v = |Δ[X]/Δt|/coeficiente es única.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: TMAX, ymin: 0, ymax: 1.1, w: 620, h: 310, etx: "t (s)", ety: "[ ] (mol/L)", etiqueta: "Concentración frente a tiempo" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(REAC).map(function (k) { return { k: k, t: REAC[k].t }; }), st.r, function (k) { st.r = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-ord]"), [{ k: "0", t: "orden 0" }, { k: "1", t: "orden 1" }, { k: "2", t: "orden 2" }], "1", function (k) { st.n = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q5_TABLA: método de las velocidades iniciales
  // ============================================================
  var TAB = {
    d1: { t: "A + B → C", sp: ["A", "B"], ord: [2, 1], k: 0.5, uk: "L²·mol⁻²·s⁻¹", ex: [[0.10, 0.10, 5.0e-4], [0.20, 0.10, 2.0e-3], [0.10, 0.20, 1.0e-3], [0.20, 0.20, 4.0e-3]] },
    d2: { t: "A + B → D", sp: ["A", "B"], ord: [1, 0], k: 0.040, uk: "s⁻¹", ex: [[0.10, 0.10, 4.0e-3], [0.20, 0.10, 8.0e-3], [0.10, 0.30, 4.0e-3], [0.30, 0.20, 1.2e-2]] },
    d3: { t: "2 NO + 2 H₂ → N₂ + 2 H₂O", sp: ["NO", "H₂"], ord: [2, 1], k: 0.30, uk: "L²·mol⁻²·s⁻¹", ex: [[0.10, 0.20, 6.0e-4], [0.20, 0.20, 2.4e-3], [0.10, 0.40, 1.2e-3], [0.30, 0.10, 2.7e-3]] }
  };
  B.w.q5_tabla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Velocidades iniciales: deduce los órdenes de la tabla");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-tab></div><div data-par class="chips"></div><div class="lectura anch" data-an></div><div data-resp></div><div class="lectura anch" data-fin></div><p class="w-pie"></p>';
    var st = { d: "d1", par: "0-1", o: [null, null] }, tab = cuerpo.querySelector("[data-tab]"), an = cuerpo.querySelector("[data-an]"), resp = cuerpo.querySelector("[data-resp]"), fin = cuerpo.querySelector("[data-fin]"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var D = TAB[st.d], par = st.par.split("-").map(Number), i = par[0], j = par[1], E = D.ex;
      tab.innerHTML = "<div style='overflow-x:auto'><table class='lamina-table q3t' style='width:100%;text-align:center'><thead><tr><th>Exp.</th><th>[" + D.sp[0] + "] (mol/L)</th><th>[" + D.sp[1] + "] (mol/L)</th><th>v<sub>0</sub> (mol/(L·s))</th></tr></thead><tbody>" +
        E.map(function (e, q) { var on = q === i || q === j; return "<tr" + (on ? " style='font-weight:700;background:var(--c-pen-bg,rgba(80,120,220,.12))'" : "") + "><td>" + (q + 1) + "</td><td>" + fmt(e[0], 2) + "</td><td>" + fmt(e[1], 2) + "</td><td>" + cien(e[2], 2) + "</td></tr>"; }).join("") + "</tbody></table></div>";
      var a = E[i], b = E[j], ra = b[0] / a[0], rb = b[1] / a[1], rv = b[2] / a[2], txt;
      if (Math.abs(ra - 1) < 1e-9 && Math.abs(rb - 1) < 1e-9) txt = "Las dos filas son iguales";
      else if (Math.abs(rb - 1) < 1e-9) txt = "Solo cambia [" + D.sp[0] + "] (×" + fmt(ra, 2) + "): v cambia ×" + fmt(rv, 2) + ". Entonces " + fmt(ra, 2) + "<sup>n</sup> = " + fmt(rv, 2) + " → <b>n(" + D.sp[0] + ") = " + fmt(Math.log(rv) / Math.log(ra), 2) + "</b>.";
      else if (Math.abs(ra - 1) < 1e-9) txt = "Solo cambia [" + D.sp[1] + "] (×" + fmt(rb, 2) + "): v cambia ×" + fmt(rv, 2) + ". Entonces " + fmt(rb, 2) + "<sup>m</sup> = " + fmt(rv, 2) + " → <b>m(" + D.sp[1] + ") = " + fmt(Math.log(rv) / Math.log(rb), 2) + "</b>.";
      else txt = "Cambian las dos concentraciones (×" + fmt(ra, 2) + " y ×" + fmt(rb, 2) + "): con este par no se aísla ningún orden. Úsalo solo cuando ya conozcas uno de ellos, o elige otro par.";
      an.innerHTML = fil("Cociente de concentraciones y de velocidades", "[" + D.sp[0] + "]: ×" + fmt(ra, 2) + " · [" + D.sp[1] + "]: ×" + fmt(rb, 2) + " · v: ×" + fmt(rv, 2), "pen ancho") + fil("Qué se deduce", txt, "ancho");
      var ops = function (q) { return [0, 1, 2].map(function (n) { return "<button type='button' class='chip-btn" + (st.o[q] === n ? " on" : "") + "' data-q='" + q + "' data-n='" + n + "'>orden " + n + "</button>"; }).join(""); };
      resp.innerHTML = "<div class='chips' style='margin-top:8px'><b style='align-self:center'>Orden respecto a " + D.sp[0] + ":</b> " + ops(0) + "</div><div class='chips'><b style='align-self:center'>Orden respecto a " + D.sp[1] + ":</b> " + ops(1) + "</div><div class='chips'><button type='button' class='chip-btn' data-ok>Comprobar</button></div>";
      Array.prototype.forEach.call(resp.querySelectorAll("[data-n]"), function (bt) { bt.onclick = function () { st.o[+bt.getAttribute("data-q")] = +bt.getAttribute("data-n"); fin.innerHTML = ""; pinta(); }; });
      resp.querySelector("[data-ok]").onclick = comprueba;
      pie.innerHTML = "Método: compara dos experimentos en los que <b>solo cambia un reactivo</b>; el cociente de velocidades es el cociente de concentraciones elevado a su orden. Después, con cualquier experimento, k = v / ([A]<sup>n</sup>[B]<sup>m</sup>).";
    }
    function comprueba() {
      var D = TAB[st.d];
      if (st.o[0] == null || st.o[1] == null) { fin.innerHTML = fil("Falta", "Elige un orden para cada reactivo.", "red ancho"); return; }
      var bien0 = st.o[0] === D.ord[0], bien1 = st.o[1] === D.ord[1], e = D.ex[0];
      if (bien0 && bien1) {
        var k = e[2] / (Math.pow(e[0], D.ord[0]) * Math.pow(e[1], D.ord[1]));
        fin.innerHTML = fil("Correcto", "v = k·[" + D.sp[0] + "]" + (D.ord[0] === 1 ? "" : U.sup(D.ord[0])) + "·[" + D.sp[1] + "]" + (D.ord[1] === 1 ? "" : U.sup(D.ord[1])) + " · orden total " + (D.ord[0] + D.ord[1]), "ok ancho") +
          fil("Constante k (con el exp. 1)", fmt(k, 3) + " " + D.uk, "ok ancho");
      } else {
        fin.innerHTML = fil("Todavía no", (bien0 ? "" : "Revisa " + D.sp[0] + ": busca dos experimentos en los que solo cambie " + D.sp[0] + ". ") + (bien1 ? "" : "Revisa " + D.sp[1] + ": busca dos experimentos en los que solo cambie " + D.sp[1] + "."), "red ancho");
      }
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(TAB).map(function (k) { return { k: k, t: TAB[k].t }; }), st.d, function (k) { st.d = k; st.o = [null, null]; st.par = "0-1"; fin.innerHTML = ""; parejas(); pinta(); });
    function parejas() {
      var ps = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3]];
      U.fichas(cuerpo.querySelector("[data-par]"), ps.map(function (p) { return { k: p[0] + "-" + p[1], t: "Comparar " + (p[0] + 1) + " y " + (p[1] + 1) }; }), st.par, function (k) { st.par = k; pinta(); });
    }
    parejas(); pinta();
  };

  // ============================================================
  // Q5_MAXWELL: distribución de energías de las partículas y fracción con E ≥ Ea
  //   f(E) = (2/√π)·(RT)^(-3/2)·√E·e^(−E/RT)   (E en kJ/mol);  P(E ≥ Ea) = Γ(3/2, x)/Γ(3/2), x = Ea/RT
  // ============================================================
  function fracMB(Ea, T) {     // E en kJ/mol
    var x = Ea * 1000 / (R * T), a = x, b = x + 60, n = 2400, h = (b - a) / n, s = 0;
    for (var i = 0; i <= n; i++) { var u = a + i * h, f = Math.sqrt(u) * Math.exp(-u); s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * f; }
    return s * h / 3 / (Math.sqrt(Math.PI) / 2);
  }
  function densMB(E, T) { var rt = R * T / 1000; return 2 / Math.sqrt(Math.PI) * Math.pow(rt, -1.5) * Math.sqrt(E) * Math.exp(-E / rt); }
  var TREF = 300;
  B.w.q5_maxwell = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Maxwell–Boltzmann: ¿cuántos choques superan la Eₐ?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-zoom class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { T: 400, Ea: 30, zoom: false }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sT, sE;
    sT = U.slider(ctl, { et: "T (K)", min: 250, max: 1200, step: 10, val: st.T, on: function (v) { st.T = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " K (" + fmt(v - 273.15, 0) + " °C)"; } });
    sE = U.slider(ctl, { et: "Eₐ (kJ/mol)", min: 5, max: 60, step: 1, val: st.Ea, on: function (v) { st.Ea = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      var T = st.T, Ea = st.Ea, XMAX = 80, YM = st.zoom ? Math.max(densMB(Ea, T), densMB(Ea, TREF)) * 3 : 0.2;
      g.rango(0, XMAX, 0, YM); g.limpiar();
      var pts = [[Ea, 0]]; for (var e = Ea; e <= XMAX; e += 0.5) pts.push([e, densMB(e, T)]); pts.push([XMAX, 0]);
      g.poligono(pts, { clase: "z-red" });
      g.curva(function (E) { return densMB(E, TREF); }, { clase: "c-faint", dash: "6 4", x0: 0.05, x1: XMAX, n: 240 });
      g.curva(function (E) { return densMB(E, T); }, { clase: "c-pen", x0: 0.05, x1: XMAX, n: 240 }).setAttribute("stroke-width", 3);
      g.segmento(Ea, 0, Ea, YM, { clase: "c-red" }); g.texto(Ea, YM, "Eₐ", { dx: 5, dy: 12, clase: "red" });
      g.texto(XMAX, YM * 0.95, "azul: T actual", { ancla: "end", clase: "pen" }); g.texto(XMAX, YM * 0.87, "gris: 300 K", { ancla: "end", clase: "faint" });
      if (st.zoom) g.texto(XMAX, YM * 0.79, "vertical ampliada ×" + cien(0.2 / YM, 1), { ancla: "end", clase: "red" });
      var f = fracMB(Ea, T), f0 = fracMB(Ea, TREF);
      lectura.innerHTML = fil("Fracción de partículas con E ≥ Eₐ a " + fmt(T, 0) + " K", cien(f, 2) + "  (" + (f >= 0.01 ? fmt(f * 100, 1) + " %" : cien(f * 100, 2) + " %") + ")", "red ancho") +
        fil("A 300 K", cien(f0, 2), "faint") + fil("Cociente", T === TREF ? "×1" : "×" + (f / f0 >= 1000 ? cien(f / f0, 2) : fmt(f / f0, 2)), "ok") +
        fil("Energía más probable ≈ RT/2", fmt(R * T / 2000, 2) + " kJ/mol", "pen");
      pie.innerHTML = "El área total bajo la curva es siempre 1 (todas las partículas). Al subir T, la curva se <b>ensancha y se aplana</b> y el área a la derecha de Eₐ (zona roja) crece mucho, aunque la energía media solo cambie un poco: por eso k aumenta tanto con T. Con Eₐ típicas (decenas de kJ/mol) solo choca con energía suficiente una fracción pequeñísima a temperatura ambiente. La fracción es ≈ e<sup>−Eₐ/RT</sup> (el factor de Arrhenius).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 80, ymin: 0, ymax: 0.2, w: 620, h: 300, sinY: true, etx: "energía E (kJ/mol)", ety: "fracción de partículas", etiqueta: "Distribución de Maxwell–Boltzmann" });
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "a", t: "Eₐ = 20, 300 → 310 K" }, { k: "b", t: "Eₐ = 50, 300 → 600 K" }, { k: "c", t: "Eₐ = 10, a 300 K" }], "", function (k) {
      var P = { a: [310, 20], b: [600, 50], c: [300, 10] }[k]; st.T = P[0]; st.Ea = P[1]; sT.set(P[0]); sE.set(P[1]); pinta();
    });
    U.fichas(cuerpo.querySelector("[data-zoom]"), [{ k: "n", t: "Vista completa" }, { k: "z", t: "Ampliar la cola (área tras Eₐ)" }], "n", function (k) { st.zoom = k === "z"; pinta(); });
    pinta();
  };

  // ============================================================
  // Q5_ARRHENIUS: k(T) = A·e^(−Ea/RT);  ln(k2/k1) = (Ea/R)(1/T1 − 1/T2)
  // ============================================================
  B.w.q5_arrhenius = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Arrhenius con dos temperaturas");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { v: "ln", Ea: 60, T1: 300, T2: 320 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), cont = cuerpo.querySelector(".w-plot");
    U.slider(ctl, { et: "Eₐ (kJ/mol)", min: 10, max: 150, step: 5, val: st.Ea, on: function (v) { st.Ea = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "T₁ (K)", min: 250, max: 500, step: 5, val: st.T1, on: function (v) { st.T1 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    U.slider(ctl, { et: "T₂ (K)", min: 260, max: 600, step: 5, val: st.T2, on: function (v) { st.T2 = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function plot() {
      cont.innerHTML = "";
      g = new B.Plot(cont, st.v === "ln" ? { xmin: 2, xmax: 4, ymin: -1, ymax: 1, w: 620, h: 300, etx: "1000/T (10⁻³ K⁻¹)", ety: "ln(k/k₁)", etiqueta: "ln k frente a 1/T" }
        : { xmin: 250, xmax: 600, ymin: 0, ymax: 2, w: 620, h: 300, etx: "T (K)", ety: "k / k₁", etiqueta: "k frente a T" });
    }
    function pinta() {
      var Ea = st.Ea * 1000, T1 = st.T1, T2 = Math.max(st.T2, T1 + 5), lnr = Ea / R * (1 / T1 - 1 / T2), rat = Math.exp(lnr);
      if (st.v === "ln") {
        var xa = 1000 / T2, xb = 1000 / T1, pad = (xb - xa) * 0.3 + 0.03, kk = Ea / R / 1000;
        g.rango(xa - pad, xb + pad, -kk * pad - 0.5, lnr + kk * pad + 0.5); g.limpiar();
        var y = function (x) { return -kk * (x - xb); };
        g.curva(y, { clase: "c-pen" }).setAttribute("stroke-width", 3);
        g.segmento(xa, 0, xb, 0, { clase: "c-faint", dash: "4 4" }); g.segmento(xa, 0, xa, lnr, { clase: "c-faint", dash: "4 4" });
        g.punto(xb, 0, { r: 6, clase: "c-pen" }); g.punto(xa, lnr, { r: 6, clase: "c-red" });
        g.texto(xb, 0, "T₁", { dy: -10, ancla: "middle", clase: "pen" }); g.texto(xa, lnr, "T₂", { dy: -10, ancla: "middle", clase: "red" });
      } else {
        g.rango(T1 - (T2 - T1) * 0.1 - 5, T2 + (T2 - T1) * 0.1 + 5, 0, rat * 1.15); g.limpiar();
        g.curva(function (T) { return Math.exp(Ea / R * (1 / T1 - 1 / T)); }, { clase: "c-pen", x0: T1, x1: T2, n: 120 }).setAttribute("stroke-width", 3);
        g.punto(T1, 1, { r: 6, clase: "c-pen" }); g.punto(T2, rat, { r: 6, clase: "c-red" });
        g.texto(T1, 1, "k₁", { dy: -10, dx: 8, clase: "pen" }); g.texto(T2, rat, "k₂", { dy: 16, ancla: "end", clase: "red" });
      }
      var q10 = Math.exp(Ea / R * (1 / T1 - 1 / (T1 + 10)));
      lectura.innerHTML = fil("k₂ / k₁", rat < 1000 ? fmt(rat, rat < 10 ? 2 : 1) : cien(rat, 2), "red") +
        fil("ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)", fmt(lnr, 3), "pen") +
        fil("Pendiente de ln k frente a 1/T = −Eₐ/R", fmt(-Ea / R, 0) + " K", "ok") +
        fil("Cada +10 K a partir de T₁ multiplica k por", fmt(q10, 2), "ancho");
      pie.innerHTML = "Con Eₐ mayor la reacción es <b>más sensible</b> a la temperatura (pendiente más negativa). La «regla» de que k se duplica cada +10 K solo es aproximada: sale con Eₐ ≈ 50 kJ/mol cerca de la temperatura ambiente. En la EvAU se usa <b>ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)</b> con T en kelvin y R = 8,314 J/(mol·K).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "ln", t: "ln k frente a 1/T (recta)" }, { k: "k", t: "k frente a T (curva)" }], st.v, function (k) { st.v = k; plot(); pinta(); });
    plot(); pinta();
  };

  // ============================================================
  // Q5_MECANISMO: etapa lenta, intermedios, catalizador y ley de velocidad
  // ============================================================
  var MEC = {
    m1: { t: "NO₂ + CO → NO + CO₂", glob: "NO₂ + CO → NO + CO₂", obs: "v = k·[NO₂]²", dH: -226,
      et: [["NO₂ + NO₂ → NO₃ + NO", "k₁[NO₂]²", "bimolecular"], ["NO₃ + CO → NO₂ + CO₂", "k₂[NO₃][CO]", "bimolecular"]], inter: "NO₃", cat: "—", nota: "La etapa lenta usa solo reactivos de la reacción global; el NO₃ (intermedio) aparece y desaparece. Observa que la ley no contiene [CO]: el CO reacciona después de la etapa lenta." },
    m2: { t: "2 NO₂ + F₂ → 2 NO₂F", glob: "2 NO₂ + F₂ → 2 NO₂F", obs: "v = k·[NO₂]·[F₂]", dH: -284,
      et: [["NO₂ + F₂ → NO₂F + F", "k₁[NO₂][F₂]", "bimolecular"], ["NO₂ + F → NO₂F", "k₂[NO₂][F]", "bimolecular"]], inter: "F (átomo)", cat: "—", nota: "Los coeficientes de la global (2 NO₂) no son los órdenes: el orden respecto al NO₂ es 1 porque en la etapa lenta solo interviene una molécula de NO₂." },
    m3: { t: "2 H₂O₂ → 2 H₂O + O₂ (con I⁻)", glob: "2 H₂O₂ → 2 H₂O + O₂", obs: "v = k·[H₂O₂]·[I⁻]", dH: -196,
      et: [["H₂O₂ + I⁻ → H₂O + IO⁻", "k₁[H₂O₂][I⁻]", "bimolecular"], ["H₂O₂ + IO⁻ → H₂O + O₂ + I⁻", "k₂[H₂O₂][IO⁻]", "bimolecular"]], inter: "IO⁻", cat: "I⁻", nota: "El I⁻ se gasta en la etapa 1 y se regenera en la 2: es un catalizador (no figura en la global pero sí en la ley de velocidad). El IO⁻ se forma y se consume: es un intermedio." }
  };
  B.w.q5_mecanismo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mecanismo de reacción: ¿cuál es la etapa lenta?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-lenta class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: "m1", s: 1 }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function nivel(a, b, x) { var s = x * x * (3 - 2 * x); return a + (b - a) * s; }
    function perfil(M, lenta, x) {        // reactivos 0 → intermedio I → productos P; dos picos
      var I = 15, P = M.dH / 5, p1 = lenta === 1 ? 95 : 45, p2 = I + (lenta === 2 ? 95 : 30);
      var base = x < 0.5 ? nivel(0, I, x / 0.5) : nivel(I, P, (x - 0.5) / 0.5);
      var b1 = (p1 - nivel(0, I, 0.5)) * Math.exp(-Math.pow((x - 0.25) / 0.085, 2));
      var b2 = (p2 - nivel(I, P, 0.5)) * Math.exp(-Math.pow((x - 0.75) / 0.085, 2));
      return base + b1 + b2;
    }
    function pinta() {
      var M = MEC[st.m], s = st.s, E1 = M.et[0], E2 = M.et[1], ley = s === 1 ? E1[1] : E2[1], interviene = s === 2;
      g.rango(0, 1, -60, 140); g.limpiar();
      g.curva(function (x) { return perfil(M, s, x); }, { clase: "c-pen", n: 260 }).setAttribute("stroke-width", 3.2);
      g.segmento(0, 0, 0.1, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4); g.segmento(0.9, M.dH / 5, 1, M.dH / 5, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      g.segmento(0.44, 15, 0.56, 15, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      g.texto(0.01, 0, "Reactivos", { dy: -8, clase: "pen" }); g.texto(0.99, M.dH / 5, "Productos", { dy: -8, ancla: "end", clase: "red" });
      g.texto(0.5, 15, "intermedio: " + M.inter, { dy: -10, ancla: "middle", clase: "faint" });
      g.texto(0.25, s === 1 ? 95 : 45, "etapa 1" + (s === 1 ? " (lenta)" : " (rápida)"), { dy: -10, ancla: "middle", clase: s === 1 ? "red" : "ok" });
      g.texto(0.75, 15 + (s === 2 ? 95 : 30), "etapa 2" + (s === 2 ? " (lenta)" : " (rápida)"), { dy: -10, ancla: "middle", clase: s === 2 ? "red" : "ok" });
      var coincide = !interviene;
      lectura.innerHTML = fil("Reacción global", M.glob + "  (ΔH = " + fmt(M.dH, 0) + " kJ)", "ancho") +
        fil("Etapa 1", E1[0] + " · " + E1[2], "ancho") + fil("Etapa 2", E2[0] + " · " + E2[2], "ancho") +
        fil("Ley de velocidad si la etapa " + s + " es la lenta", "v = " + ley.replace(/k[₁₂]/, "k"), (coincide ? "ok" : "red") + " ancho") +
        fil("Ley observada experimentalmente", M.obs, "pen ancho") +
        fil("¿Coinciden?", coincide ? "Sí: la etapa 1 como lenta explica la ley observada." : "No: la etapa 2 daría una ley con un intermedio (" + M.inter + "), que no se puede medir ni aparece en la global. Descartada.", (coincide ? "ok" : "red") + " ancho");
      pie.innerHTML = M.nota + " <b>Intermedio</b>: se forma y se consume (no está en la global). <b>Catalizador</b>: se consume y se regenera. La etapa lenta es la de <b>mayor Eₐ</b> y manda sobre la velocidad global.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: -60, ymax: 140, w: 620, h: 300, sinX: true, sinY: true, etx: "coordenada de reacción", ety: "E (esquema)", etiqueta: "Perfil de un mecanismo en dos etapas" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(MEC).map(function (k) { return { k: k, t: MEC[k].t }; }), st.m, function (k) { st.m = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-lenta]"), [{ k: "1", t: "La etapa lenta es la 1" }, { k: "2", t: "La etapa lenta es la 2" }], "1", function (k) { st.s = +k; pinta(); });
    pinta();
  };

  B.lab = B.lab || {};
  B.lab.q5 = { REAC: REAC, TAB: TAB, MEC: MEC, concA: concA, conc: conc, vInst: vInst, fracMB: fracMB, R: R };
})(window);
