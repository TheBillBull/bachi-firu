/* ============================================================
   Bachi para Firu · laboratorio de equilibrio químico
   eqtiempo: cinética real (v directa = v inversa)
   equilibrio: simulador de perturbaciones (Le Chatelier con Q y Kc)
   El motor numérico (B.lab.eq) no toca el DOM: se puede comprobar aparte.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, fmt = B.fmt;
  B.lab = B.lab || {};
  var R_GAS = 8.314; // J/(mol·K)

  // ---------- reacciones de demostración (datos didácticos) ----------
  // nu < 0 reactivos, nu > 0 productos · dH en kJ por mol de reacción tal como está escrita
  var REAC = {
    nh3: { t: "N₂ + 3 H₂ ⇌ 2 NH₃", esp: [{ n: "N₂", nu: -1 }, { n: "H₂", nu: -3 }, { n: "NH₃", nu: 2 }],
      dH: -92.2, T0: 750, Kc0: 0.08, ini: [1, 3, 0], V0: 2, Tr: [600, 900, 5], Vr: [0.5, 4, 0.05], dn: 0.5, puntos: 10,
      nota: "Síntesis de Haber-Bosch: exotérmica (ΔH = −92,2 kJ). K<sub>c</sub> = 0,08 a 750 K (valor didáctico)." },
    hi: { t: "H₂ + I₂ ⇌ 2 HI", esp: [{ n: "H₂", nu: -1 }, { n: "I₂", nu: -1 }, { n: "HI", nu: 2 }],
      dH: -9.4, T0: 700, Kc0: 54, ini: [1, 1, 0], V0: 2, Tr: [500, 900, 5], Vr: [0.5, 4, 0.05], dn: 0.5, puntos: 20,
      nota: "Δn(gas) = 0: cambiar el volumen no desplaza el equilibrio. K<sub>c</sub> = 54 a 700 K, ΔH = −9,4 kJ (casi térmica neutra)." },
    no2: { t: "N₂O₄ ⇌ 2 NO₂", esp: [{ n: "N₂O₄", nu: -1 }, { n: "NO₂", nu: 2 }],
      dH: 57.2, T0: 298, Kc0: 4.6e-3, ini: [0.1, 0], V0: 1, Tr: [280, 400, 2], Vr: [0.25, 2, 0.05], dn: 0.05, puntos: 400,
      nota: "Endotérmica (ΔH = +57,2 kJ). N₂O₄ es incoloro y NO₂ pardo: ¡el color te chiva el equilibrio! K<sub>c</sub> = 4,6·10⁻³ a 298 K." }
  };
  var ORDEN = ["nh3", "hi", "no2"];

  // ============================================================
  // Motor numérico
  // ============================================================
  function Kc(R, T) { return R.Kc0 * Math.exp(-(R.dH * 1000 / R_GAS) * (1 / T - 1 / R.T0)); } // van 't Hoff
  function lnQ(R, n, V) {
    var s = 0;
    for (var i = 0; i < R.esp.length; i++) s += R.esp[i].nu * Math.log(Math.max(n[i] / V, 1e-300));
    return s;
  }
  // Avance ξ (mol) que lleva el sistema a Q = Kc. Q crece con ξ, así que basta bisección.
  function avance(R, n, V, T) {
    var lk = Math.log(Kc(R, T)), lo = -Infinity, hi = Infinity, i, lim;
    for (i = 0; i < R.esp.length; i++) {
      lim = -n[i] / R.esp[i].nu;
      if (R.esp[i].nu > 0) lo = Math.max(lo, lim); else hi = Math.min(hi, lim);
    }
    for (var k = 0; k < 200; k++) {
      var mid = (lo + hi) / 2, nn = n.map(function (v, j) { return v + R.esp[j].nu * mid; });
      if (lnQ(R, nn, V) < lk) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }
  function equilibrioDe(R, n, V, T) { var xi = avance(R, n, V, T); return n.map(function (v, i) { return Math.max(1e-9, v + R.esp[i].nu * xi); }); }
  function dnGas(R) { return R.esp.reduce(function (a, e) { return a + e.nu; }, 0); }
  B.lab.eq = { REAC: REAC, Kc: Kc, lnQ: lnQ, avance: avance, equilibrioDe: equilibrioDe, dnGas: dnGas };

  function sup(n) {
    var m = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return String(n).split("").map(function (c) { return m[c]; }).join("");
  }
  function fmtK(k) {
    if (k >= 0.01 && k < 1000) return fmt(k, k < 1 ? 4 : 2);
    var e = Math.floor(Math.log10(k)), m = k / Math.pow(10, e);
    return fmt(m, 2) + "·10" + sup(e);
  }
  function lec(r, v, c) { return '<div class="lec ' + (c || "") + '"><small>' + r + "</small><b>" + v + "</b></div>"; }
  var CLASES = ["c-pen", "c-red", "c-ok"];

  // ============================================================
  // EQTIEMPO: cinética real de H₂ + I₂ ⇌ 2HI (V = 1 L, 700 K)
  //   dξ/dt = k_d·[H₂][I₂] − k_i·[HI]²,  con k_i = k_d / K_c
  // ============================================================
  B.w.eqtiempo = function (host) {
    var cuerpo = B.caja(host, "Míralo", "El equilibrio se alcanza desde los dos lados");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot top"></div><div class="w-plot bot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var chips = cuerpo.querySelector(".chips"), pT = cuerpo.querySelector(".w-plot.top"), pB = cuerpo.querySelector(".w-plot.bot"), elLec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var KC = 54, KD = 0.5, KI = KD / KC, TMAX = 18;
    var ESC = { r: { t: "Parto solo de reactivos (1 mol de H₂ y 1 mol de I₂)", c0: [1, 1, 0] }, p: { t: "Parto solo de producto (2 mol de HI)", c0: [0, 0, 2] } };

    function simular(c0) {
      var c = c0.slice(), t = 0, dt = 0.01, out = [];
      for (var i = 0; i <= TMAX / dt; i++) {
        var vd = KD * c[0] * c[1], vi = KI * c[2] * c[2];
        if (i % 10 === 0) out.push({ t: t, c: c.slice(), vd: vd, vi: vi });
        var xi = (vd - vi) * dt; c[0] -= xi; c[1] -= xi; c[2] += 2 * xi; t += dt;
      }
      return out;
    }
    function pinta(k) {
      var S = simular(ESC[k].c0), ult = S[S.length - 1];
      pT.innerHTML = ""; pB.innerHTML = "";
      var g1 = new B.Plot(pT, { xmin: 0, xmax: TMAX, ymin: 0, ymax: 2.1, w: 640, h: 230, etx: "t (s)", ety: "[ ] mol/L", etiqueta: "Concentraciones frente al tiempo" });
      var g2 = new B.Plot(pB, { xmin: 0, xmax: TMAX, ymin: 0, ymax: 0.55, w: 640, h: 190, etx: "t (s)", ety: "velocidad", etiqueta: "Velocidades de reacción directa e inversa" });
      [0, 1, 2].forEach(function (j) {
        if (j === 1) return; // [H₂] = [I₂]: se dibuja una sola
        g1.polilinea(S.map(function (s) { return [s.t, s.c[j]]; }), { clase: CLASES[j] });
        g1.horizontal(ult.c[j], { clase: "c-faint", dash: "3 5", capa: "fijo" });
      });
      g1.texto(0.4, 1.0, "[H₂] = [I₂]", { dy: -8, clase: "pen" }); g1.texto(TMAX - 0.3, ult.c[2], "[HI]", { dy: -8, ancla: "end", clase: "ok" });
      g2.polilinea(S.map(function (s) { return [s.t, s.vd]; }), { clase: "c-pen" });
      g2.polilinea(S.map(function (s) { return [s.t, s.vi]; }), { clase: "c-red" });
      g2.texto(1.1, S[110].vd, "v directa", { dx: 4, dy: -6, clase: "pen" }); g2.texto(TMAX - 0.3, ult.vi, "v inversa", { dy: -12, ancla: "end", clase: "red" });
      var ig = S.findIndex(function (s) { return s.t > 0.5 && Math.abs(s.vd - s.vi) < 0.03 * s.vd; });
      if (ig > 0) { g2.vertical(S[ig].t, { clase: "c-ok", dash: "5 4" }); g2.texto(S[ig].t, 0.38, "ya casi iguales", { dx: 6, clase: "ok" }); }
      var kfin = ult.c[2] * ult.c[2] / (ult.c[0] * ult.c[1]);
      elLec.innerHTML = lec("[H₂] = [I₂] final", fmt(ult.c[0], 3) + " mol/L", "pen") + lec("[HI] final", fmt(ult.c[2], 3) + " mol/L", "ok") + lec("v en el equilibrio (las dos)", fmt(ult.vd, 3), "") + lec("K<sub>c</sub> con los valores finales", fmt(kfin, 1), "red");
      pie.innerHTML = "Las concentraciones <b>dejan de cambiar</b> cuando v directa = v inversa. No son iguales entre sí: son constantes. Pruébalo desde el otro lado y comprueba que K<sub>c</sub> sale igual.";
    }
    var cur = "r";
    chips.innerHTML = Object.keys(ESC).map(function (k) { return '<button type="button" class="chip-btn' + (k === cur ? " on" : "") + '" data-k="' + k + '" aria-pressed="' + (k === cur) + '">' + ESC[k].t + "</button>"; }).join("");
    chips.onclick = function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      cur = b.getAttribute("data-k");
      Array.prototype.forEach.call(chips.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      pinta(cur);
    };
    pinta(cur);
  };

  // ============================================================
  // EQUILIBRIO: simulador de perturbaciones
  // ============================================================
  B.w.equilibrio = function (host) {
    var cuerpo = B.caja(host, "Laboratorio", "Perturba el equilibrio y mira qué pasa");
    cuerpo.innerHTML = '<div class="chips" data-reac></div><p class="eq-ec" data-ec></p>' +
      '<div class="eq-fila"><div class="eq-cil"><svg class="eq-svg" viewBox="0 0 170 205" role="img" aria-label="Recipiente con émbolo y partículas de cada sustancia"></svg></div><div class="eq-esp" data-esp></div></div>' +
      '<div class="ctl eq-ctl"><label>Temperatura <input type="range" data-T aria-label="Temperatura"> <span class="mv" data-Tv></span></label>' +
      '<label>Volumen <input type="range" data-V aria-label="Volumen del recipiente"> <span class="mv" data-Vv></span></label>' +
      '<button type="button" class="chip-btn" data-reset>↺ Reiniciar</button></div>' +
      '<div class="lectura" data-lec></div><div class="eq-gauge" aria-hidden="true"><span class="eq-g-et izq"><span class="eq-g-largo">Q &lt; K<sub>c</sub> → </span>productos</span><span class="eq-g-et cen">equilibrio</span><span class="eq-g-et der">reactivos<span class="eq-g-largo"> ← Q &gt; K<sub>c</sub></span></span><i class="eq-g-marca"></i></div>' +
      '<p class="eq-porque" data-porque aria-live="polite"></p><div class="w-plot"></div><p class="hint" data-nota></p>';
    var q = function (s) { return cuerpo.querySelector(s); };
    var elReac = q("[data-reac]"), elEc = q("[data-ec]"), elEsp = q("[data-esp]"), svgEl = q(".eq-svg"), sT = q("[data-T]"), sV = q("[data-V]"), vT = q("[data-Tv]"), vV = q("[data-Vv]");
    var elLec = q("[data-lec]"), marca = q(".eq-g-marca"), porque = q("[data-porque]"), elPlot = q(".w-plot"), nota = q("[data-nota]");
    var TAU = 1.5, VENTANA = 36, NS = "http://www.w3.org/2000/svg";
    var S, g, dots = [], ultimoDibujo = 0, ultimoT = null;

    // ----- estado -----
    function nAhora(t) {
      var k = 1 - Math.exp(-(t - S.tp) / TAU);
      return S.n0.map(function (v, i) { return v + (S.nT[i] - v) * k; });
    }
    function muestra(t, n, V, forzar) {
      var u = S.hist[S.hist.length - 1];
      if (!forzar && u && t - u.t < 0.08) return;
      S.hist.push({ t: t, c: n.map(function (v) { return v / V; }) });
      if (S.hist.length > 1500) S.hist.shift();
    }
    function inicia(k) {
      var R = REAC[k];
      S = { k: k, R: R, V: R.V0, T: R.T0, t: 0, tp: 0, n0: R.ini.map(function (v) { return Math.max(v, 1e-6); }), hist: [], marcas: [] };
      S.nT = equilibrioDe(R, S.n0, S.V, S.T);
      muestra(0, S.n0, S.V, true);
      S.porque = "<b>Empiezas solo con reactivos:</b> Q = 0 es menor que K<sub>c</sub>, así que el sistema evoluciona hacia los productos hasta que Q = K<sub>c</sub>.";
    }
    function sentido(n, V, T) {
      var d = lnQ(S.R, n, V) - Math.log(Kc(S.R, T));
      return Math.abs(d) < 0.01 ? 0 : d < 0 ? 1 : -1;
    }
    function frase(dir) {
      return dir > 0 ? "Ahora Q &lt; K<sub>c</sub>: el sistema evoluciona hacia los <b>productos</b> (→)." : dir < 0 ? "Ahora Q &gt; K<sub>c</sub>: el sistema evoluciona hacia los <b>reactivos</b> (←)." : "Q = K<sub>c</sub>: sigue en equilibrio.";
    }

    function perturba(ev, conMarca) {
      var R = S.R, t = S.t, antes = { n: nAhora(t), V: S.V, T: S.T }, txt, causa;
      muestra(t, antes.n, S.V, true);
      S.n0 = antes.n.slice();
      if (ev.tipo === "esp") {
        var e = R.esp[ev.i]; S.n0[ev.i] = Math.max(1e-6, S.n0[ev.i] + ev.d);
        txt = (ev.d > 0 ? "+" : "−") + fmt(Math.abs(ev.d), 2) + " mol " + e.n;
        causa = (ev.d > 0 ? "Has añadido " : "Has retirado ") + e.n + ": su concentración cambia y con ella Q.";
      } else if (ev.tipo === "V") {
        S.V = ev.v; txt = "V = " + fmt(ev.v, 2) + " L";
        var dn = dnGas(R);
        causa = (ev.v < antes.V ? "Has comprimido el recipiente (más presión)." : "Has ampliado el recipiente (menos presión).") +
          (dn === 0 ? " Como Δn(gas) = 0, Q no cambia: <b>no hay desplazamiento</b>." : " Δn(gas) = " + dn + " (" + (dn < 0 ? "menos" : "más") + " moles de gas en los productos), así que Q cambia.");
      } else {
        S.T = ev.v; txt = "T = " + Math.round(ev.v) + " K";
        var sube = Kc(R, ev.v) > Kc(R, antes.T);
        causa = (ev.v > antes.T ? "Has subido T." : "Has bajado T.") + " La reacción es " + (R.dH < 0 ? "exotérmica" : "endotérmica") + ", así que K<sub>c</sub> " + (sube ? "aumenta" : "disminuye") + " (Q no cambia en el instante).";
      }
      S.tp = t; S.nT = equilibrioDe(R, S.n0, S.V, S.T);
      muestra(t, S.n0, S.V, true);
      if (conMarca) { S.marcas.push({ t: t, txt: txt }); if (S.marcas.length > 12) S.marcas.shift(); }
      var yaEstabaEnEq = Math.abs(lnQ(R, antes.n, antes.V) - Math.log(Kc(R, antes.T))) < 0.05;
      S.porque = "<b>" + causa + "</b> " + frase(sentido(S.n0, S.V, S.T)) +
        (yaEstabaEnEq ? "" : " <small>(el sistema todavía no había terminado de llegar al equilibrio; espera unos segundos antes de perturbar para verlo limpio)</small>");
    }

    // ----- dibujo -----
    function svgEl_(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
    function montarSvg() {
      svgEl.innerHTML = "";
      S.cil = {};
      S.cil.fondo = svgEl_("rect", { x: 20, y: 10, width: 120, height: 170, "class": "eq-cuerpo" }, svgEl);
      S.cil.gas = svgEl_("rect", { x: 20, "class": "eq-gas", width: 120 }, svgEl);
      dots = S.R.esp.map(function (_, i) {
        var arr = [], semilla = (i + 1) * 7919;
        for (var j = 0; j < 70; j++) {
          semilla = (semilla * 16807) % 2147483647; var u = semilla / 2147483647;
          semilla = (semilla * 16807) % 2147483647; var v = semilla / 2147483647;
          arr.push({ u: u, v: v, el: svgEl_("circle", { r: 3.6, "class": "eq-dot d" + i }, svgEl) });
        }
        return arr;
      });
      S.cil.piston = svgEl_("rect", { x: 14, width: 132, height: 9, rx: 2, "class": "eq-piston" }, svgEl);
      S.cil.varilla = svgEl_("line", { x1: 80, x2: 80, y1: 2, "class": "eq-varilla" }, svgEl);
      S.cil.asa = svgEl_("line", { x1: 60, x2: 100, y1: 2, y2: 2, "class": "eq-varilla" }, svgEl);
      svgEl_("path", { d: "M20 10 V180 H140 V10", "class": "eq-pared" }, svgEl);
      S.cil.txtV = svgEl_("text", { x: 146, "class": "eq-txt", "text-anchor": "start", "font-size": 11 }, svgEl);
      S.cil.txtT = svgEl_("text", { x: 80, y: 198, "class": "eq-txt", "text-anchor": "middle" }, svgEl);
    }
    function pintaSvg(n) {
      var R = S.R, Hmax = 165, Hmin = 50, f = (S.V - R.Vr[0]) / (R.Vr[1] - R.Vr[0]), H = Hmin + (Hmax - Hmin) * f, yTop = 180 - H;
      S.cil.gas.setAttribute("y", yTop); S.cil.gas.setAttribute("height", H);
      S.cil.piston.setAttribute("y", yTop - 9); S.cil.varilla.setAttribute("y2", yTop - 9); S.cil.varilla.setAttribute("y1", 3); S.cil.asa.setAttribute("y1", 3); S.cil.asa.setAttribute("y2", 3);
      S.cil.txtV.setAttribute("y", yTop + 4); S.cil.txtV.textContent = fmt(S.V, 2) + " L";
      S.cil.txtT.textContent = "T = " + Math.round(S.T) + " K";
      // el NO₂ es pardo: el gas se oscurece al formarse
      var esNO2 = S.k === "no2";
      S.cil.gas.setAttribute("class", "eq-gas" + (esNO2 ? " pardo" : ""));
      S.cil.gas.style.fillOpacity = esNO2 ? Math.min(0.92, (n[1] / S.V) / 0.12) : 1;
      dots.forEach(function (arr, i) {
        var cnt = Math.min(70, Math.round(n[i] * R.puntos));
        arr.forEach(function (d, j) {
          if (j < cnt) { d.el.setAttribute("cx", 28 + d.u * 104); d.el.setAttribute("cy", 180 - 8 - d.v * (H - 16)); d.el.style.display = ""; } else d.el.style.display = "none";
        });
      });
    }
    function pintaEsp(n) {
      var R = S.R, cs = n.map(function (v) { return v / S.V; }), mx = Math.max.apply(null, cs) * 1.15 || 1;
      elEsp.innerHTML = R.esp.map(function (e, i) {
        return '<div class="eq-it"><i class="eq-pt d' + i + '"></i><span class="eq-nom">' + e.n + '</span><span class="eq-barra"><i class="d' + i + '" style="width:' + Math.min(100, 100 * cs[i] / mx) + '%"></i></span><b class="eq-c">' + fmt(cs[i], 3) + ' <small>mol/L</small></b>' +
          '<button type="button" class="chip-btn" data-add="' + i + '" data-s="-1" aria-label="Retirar ' + fmt(R.dn, 2) + ' mol de ' + e.n + '">−</button><button type="button" class="chip-btn" data-add="' + i + '" data-s="1" aria-label="Añadir ' + fmt(R.dn, 2) + ' mol de ' + e.n + '">+</button></div>';
      }).join("") + '<p class="eq-dn">Cada botón añade o retira ' + fmt(R.dn, 2) + " mol.</p>";
    }
    // pinta las barras sin reconstruir los botones (para no perder el foco mientras se anima)
    function actualizaBarras(n) {
      var cs = n.map(function (v) { return v / S.V; }), mx = Math.max.apply(null, cs) * 1.15 || 1, filas = elEsp.querySelectorAll(".eq-it");
      Array.prototype.forEach.call(filas, function (f, i) {
        f.querySelector(".eq-barra i").style.width = Math.min(100, 100 * cs[i] / mx) + "%";
        f.querySelector(".eq-c").innerHTML = fmt(cs[i], 3) + " <small>mol/L</small>";
      });
    }
    function pintaLec(n) {
      var Q = Math.exp(lnQ(S.R, n, S.V)), K = Kc(S.R, S.T), d = Math.log(Q / K);
      elLec.innerHTML = lec("Q", fmtK(Q), "pen") + lec("K<sub>c</sub> a " + Math.round(S.T) + " K", fmtK(K), "red") + lec("Δn (gas)", String(dnGas(S.R))) +
        lec("Tendencia", Math.abs(d) < 0.01 ? "equilibrio" : d < 0 ? "→ productos" : "← reactivos", Math.abs(d) < 0.01 ? "ok" : "");
      var pos = 50 + 50 * Math.max(-1, Math.min(1, d / 3));
      marca.style.left = pos + "%"; // Q pequeña (hacia productos) a la izquierda
    }
    function pintaGrafica(t, n) {
      var R = S.R, t0 = Math.max(0, t - VENTANA), t1 = Math.max(VENTANA, t), vis = S.hist.filter(function (h) { return h.t >= t0 - 1; });
      var mx = 0; vis.forEach(function (h) { h.c.forEach(function (c) { mx = Math.max(mx, c); }); });
      var ahora = n.map(function (v) { return v / S.V; }); ahora.forEach(function (c) { mx = Math.max(mx, c); });
      var paso = mx < 0.5 ? 0.1 : mx < 1 ? 0.2 : mx < 2.5 ? 0.5 : 1;
      var ymax = Math.max(paso * 2, Math.ceil(mx * 1.15 / paso) * paso);
      if (!S.ymax || Math.abs(S.ymax - ymax) / ymax > 0.02 || S.t0 !== Math.round(t0)) { S.ymax = ymax; S.t0 = Math.round(t0); g.rango(t0, t1, 0, ymax); }
      g.limpiar();
      S.marcas.forEach(function (m, i) {
        if (m.t < t0) return;
        g.vertical(m.t, { clase: "c-faint", dash: "3 4" });
        g.texto(m.t, ymax, m.txt, { dx: 4, dy: 14 + 15 * (i % 2), clase: "faint" });
      });
      R.esp.forEach(function (e, i) {
        var pts = vis.map(function (h) { return [h.t, h.c[i]]; }); pts.push([t, ahora[i]]);
        g.polilinea(pts, { clase: CLASES[i] });
        g.texto(t, ahora[i], e.n, { dx: -4, dy: -7, ancla: "end", clase: i === 0 ? "pen" : i === 1 ? "red" : "ok" });
      });
    }

    function configurarControles() {
      var R = S.R;
      sT.min = R.Tr[0]; sT.max = R.Tr[1]; sT.step = R.Tr[2]; sT.value = S.T;
      sV.min = R.Vr[0]; sV.max = R.Vr[1]; sV.step = R.Vr[2]; sV.value = S.V;
      vT.textContent = Math.round(S.T) + " K"; vV.textContent = fmt(S.V, 2) + " L";
      elEc.innerHTML = '<span class="eq-reac">' + R.t + "</span> <small>" + R.nota + "</small>";
      nota.innerHTML = R.dH < 0 ? "Prueba: sube la temperatura, comprime el recipiente, añade un reactivo… ¿hacia dónde se desplaza? Mira siempre Q y K<sub>c</sub>. (Espera a que se asiente antes de cada cambio.)" : "Prueba: sube la temperatura y fíjate en el color del gas (más NO₂ = más pardo). Comprime el recipiente: ¿qué lado tiene menos moles de gas?";
    }
    function reinicia(k) {
      inicia(k); montarSvg();
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: 0, xmax: VENTANA, ymin: 0, ymax: 2, w: 640, h: 250, etx: "t", ety: "[ ] mol/L", etiqueta: "Concentraciones frente al tiempo" });
      S.ymax = 0; S.t0 = -1;
      configurarControles(); pintaEsp(nAhora(0));
      porque.innerHTML = S.porque;
    }

    // ----- eventos -----
    elReac.innerHTML = ORDEN.map(function (k, i) { return '<button type="button" class="chip-btn' + (i === 0 ? " on" : "") + '" data-k="' + k + '" aria-pressed="' + (i === 0) + '">' + REAC[k].t + "</button>"; }).join("");
    elReac.onclick = function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      Array.prototype.forEach.call(elReac.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      reinicia(b.getAttribute("data-k"));
    };
    elEsp.addEventListener("click", function (e) {
      var b = e.target.closest("[data-add]"); if (!b) return;
      perturba({ tipo: "esp", i: +b.getAttribute("data-add"), d: +b.getAttribute("data-s") * S.R.dn }, true);
      porque.innerHTML = S.porque;
    });
    sT.addEventListener("input", function () { vT.textContent = Math.round(+sT.value) + " K"; perturba({ tipo: "T", v: +sT.value }, false); porque.innerHTML = S.porque; });
    sT.addEventListener("change", function () { S.marcas.push({ t: S.t, txt: "T = " + Math.round(+sT.value) + " K" }); });
    sV.addEventListener("input", function () { vV.textContent = fmt(+sV.value, 2) + " L"; perturba({ tipo: "V", v: +sV.value }, false); porque.innerHTML = S.porque; });
    sV.addEventListener("change", function () { S.marcas.push({ t: S.t, txt: "V = " + fmt(+sV.value, 2) + " L" }); });
    q("[data-reset]").addEventListener("click", function () { reinicia(S.k); });

    // ----- bucle de animación (se detiene si la actividad no se ve) -----
    function bucle(ts) {
      if (!host.isConnected) return;
      if (host.offsetParent !== null && !document.hidden) {
        if (ultimoT === null) ultimoT = ts;
        var dt = Math.min(0.1, (ts - ultimoT) / 1000); ultimoT = ts;
        S.t += dt;
        var n = nAhora(S.t);
        muestra(S.t, n, S.V);
        pintaSvg(n); actualizaBarras(n); pintaLec(n);
        if (ts - ultimoDibujo > 90) { ultimoDibujo = ts; pintaGrafica(S.t, n); porque.innerHTML = S.porque; }
      } else ultimoT = null;
      requestAnimationFrame(bucle);
    }
    reinicia("nh3");
    requestAnimationFrame(bucle);
  };

})(window);
