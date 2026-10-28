/* ============================================================
   Bachi para Firu · Química II, tema 10: Reactividad de los compuestos del carbono
   Tres simuladores nuevos (el resto del tema reutiliza q7_reacciones y q7_combustion de FyQ I):
   q10_markov (adición de HX/H₂O a un alqueno: carbocationes y perfil de energía) ·
   q10_induc (efecto inductivo: la acidez de los ácidos halogenados) ·
   q10_ester (esterificación: equilibrio, K = 4 y rendimiento según el exceso de alcohol)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;
  function fil(r, v, c) { return U.lec(r, v, c); }
  function d(x, n) { return (Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n).replace(".", ",").replace("-", "−"); }
  function estilo() {
    if (document.getElementById("q10-css")) return;
    var s = document.createElement("style"); s.id = "q10-css";
    s.textContent =
      ".q10-fila { display: grid; grid-template-columns: minmax(96px, 36%) 1fr 52px; gap: 8px; align-items: center; margin: 5px 0; font-size: 14px; }" +
      ".q10-fila .n { color: var(--ink); line-height: 1.25; } .q10-fila .v { font: 700 14px var(--math); text-align: right; color: var(--ink-soft); }" +
      ".q10-pista { height: 16px; border-radius: 8px; background: var(--sheet-2); position: relative; overflow: hidden; } .q10-pista i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--pen); border-radius: 8px; opacity: .8; }" +
      ".q10-fila.ref .q10-pista i { background: var(--ink-faint); }" +
      ".q10-prod { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0; } .q10-prod > div { border: 1.5px solid var(--line); border-radius: 10px; padding: 8px 10px; font-size: 14px; line-height: 1.4; }" +
      ".q10-prod > div.may { border-color: var(--ok); background: var(--sheet-2); } .q10-prod b { display: block; font: 700 12px var(--body); text-transform: uppercase; letter-spacing: .04em; color: var(--ink-soft); }" +
      "@media (max-width: 520px) { .q10-prod { grid-template-columns: 1fr; } }";
    document.head.appendChild(s);
  }

  // ============================================================
  // Q10_MARKOV
  // ============================================================
  // tipo de carbocatión → energía relativa (kcal/mol, afinidad al ion hidruro en fase gas, referencia: terciario = 0)
  var CAT = { t: { n: "terciario", E: 0 }, s: { n: "secundario", E: 18 }, p: { n: "primario", E: 42 } };
  // cada alqueno: carbocatión y nombre [halogenuro con {X}, alcohol] de cada posible producto; hs = H de cada carbono del doble enlace
  var ALQ = {
    propeno: { t: "Propeno", f: "CH₃−CH=CH₂", a: ["s", "2-{X}propano", "propan-2-ol"], b: ["p", "1-{X}propano", "propan-1-ol"], hs: [2, 1] },
    but1: { t: "But-1-eno", f: "CH₃−CH₂−CH=CH₂", a: ["s", "2-{X}butano", "butan-2-ol"], b: ["p", "1-{X}butano", "butan-1-ol"], hs: [2, 1] },
    mpropeno: { t: "2-Metilpropeno", f: "(CH₃)₂C=CH₂", a: ["t", "2-{X}-2-metilpropano", "2-metilpropan-2-ol"], b: ["p", "1-{X}-2-metilpropano", "2-metilpropan-1-ol"], hs: [2, 0] },
    mbut2: { t: "2-Metilbut-2-eno", f: "(CH₃)₂C=CH−CH₃", a: ["t", "2-{X}-2-metilbutano", "2-metilbutan-2-ol"], b: ["s", "2-{X}-3-metilbutano", "3-metilbutan-2-ol"], hs: [1, 0] },
    pent2: { t: "Pent-2-eno", f: "CH₃−CH=CH−CH₂−CH₃", a: ["s", "2-{X}pentano", "pentan-2-ol"], b: ["s", "3-{X}pentano", "pentan-3-ol"], hs: [1, 1] },
    but2: { t: "But-2-eno", f: "CH₃−CH=CH−CH₃", a: ["s", "2-{X}butano", "butan-2-ol"], b: null, hs: [1, 1] }
  };
  var HX = { HBr: { x: "bromo", t: "HBr" }, HCl: { x: "cloro", t: "HCl" }, H2O: { x: "", t: "H₂O (H⁺)" } };
  function suaviza(pts, x) {                       // interpolación coseno entre puntos clave
    for (var i = 0; i < pts.length - 1; i++) if (x <= pts[i + 1][0]) {
      var u = (x - pts[i][0]) / (pts[i + 1][0] - pts[i][0]); u = (1 - Math.cos(Math.PI * u)) / 2;
      return pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u;
    }
    return pts[pts.length - 1][1];
  }
  function perfil(Ec) {                            // reactivos → estado de transición → carbocatión → estado de transición → producto
    var pts = [[0, 0], [1, 0], [3, Ec + 10], [4.6, Ec], [6, Ec + 6], [8, -14], [9, -14]], P = [];
    for (var x = 0; x <= 9.001; x += 0.15) P.push([x, suaviza(pts, x)]);
    return P;
  }
  B.w.q10_markov = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Markovnikov: ¿qué carbocatión se forma?");
    cuerpo.innerHTML = '<div data-alq class="chips"></div><div data-hx class="chips"></div><div class="w-plot"></div><div class="q10-prod"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: "propeno", x: "HBr" }, plot = cuerpo.querySelector(".w-plot"), prod = cuerpo.querySelector(".q10-prod"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(plot, { xmin: 0, xmax: 9, ymin: -22, ymax: 78, w: 600, h: 270, sinX: true, etx: "avance de la reacción", ety: "energía (kcal/mol, orientativa)", etiqueta: "Perfil de energía de las dos formas de adición" });
    function nombre(p, h) { return h.x ? p[1].replace("{X}", h.x) : p[2]; }
    function pinta() {
      var A = ALQ[st.a], h = HX[st.x], ca = CAT[A.a[0]], cb = A.b ? CAT[A.b[0]] : null, simetrico = !A.b, mismo = !!A.b && A.a[0] === A.b[0];
      g.limpiar();
      g.polilinea(perfil(20 + ca.E), { clase: "c-ok" });
      g.texto(4.6, 20 + ca.E - 7, ca.n, { ancla: "middle", clase: "c-ok" });
      if (cb && !mismo) {
        g.polilinea(perfil(20 + cb.E), { clase: "c-red" });
        g.texto(4.6, 20 + cb.E - 7, cb.n, { ancla: "middle", clase: "c-red" });
      }
      g.texto(0.1, 4, "alqueno + " + h.t, { clase: "c-faint" }); g.texto(9, -19, "producto", { ancla: "end", clase: "c-faint" });
      var cA = "<div class='may'><b>" + (mismo || simetrico ? "producto" : "producto principal") + "</b>" + nombre(A.a, h) + "</div>";
      var cB = A.b ? "<div" + (mismo ? " class='may'" : "") + "><b>" + (mismo ? "producto equivalente" : "producto minoritario") + "</b>" + nombre(A.b, h) + "</div>" : "<div><b>producto minoritario</b>ninguno: el alqueno es simétrico</div>";
      prod.innerHTML = cA + cB;
      var reglaH = "el H va al carbono con <b>más</b> H (" + A.hs[0] + " H frente a " + A.hs[1] + " H) y " + (h.x ? "el halógeno" : "el OH") + " al que tiene menos";
      lectura.innerHTML = fil("Alqueno", A.t + " · " + A.f, "pen ancho") +
        fil("Carbocatión más estable", ca.n + (cb && !mismo ? " (el otro sería " + cb.n + ")" : ""), "ok") +
        fil("Diferencia de energía", cb ? d(Math.abs(ca.E - cb.E), 0) + " kcal/mol" : "—", "") +
        fil("Regla de Markovnikov", simetrico ? "no hace falta: los dos carbonos tienen igual número de H" : (mismo ? "los dos carbocationes son " + ca.n + "s: salen ambos productos en proporción parecida" : reglaH), "ancho");
      pie.innerHTML = "El H⁺ ataca al doble enlace y deja un <b>carbocatión</b> en el otro carbono. Cuanto más sustituido (terciario &gt; secundario &gt; primario), más estable, se forma más deprisa y manda el producto. " +
        "Es la causa profunda de la regla «el H al carbono con más H»." + (cb && cb.n === "primario" ? " (El primario es tan inestable que casi no se forma: es el producto minoritario.)" : "");
    }
    U.fichas(cuerpo.querySelector("[data-alq]"), Object.keys(ALQ).map(function (k) { return { k: k, t: ALQ[k].t }; }), st.a, function (k) { st.a = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-hx]"), Object.keys(HX).map(function (k) { return { k: k, t: HX[k].t }; }), st.x, function (k) { st.x = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q10_INDUC: pKa de ácidos carboxílicos sustituidos (datos de tablas, 25 °C)
  // ============================================================
  var PKA = {
    nhal: { t: "Nº de Cl", datos: [["CH₃COOH", 4.76], ["ClCH₂COOH", 2.87], ["Cl₂CHCOOH", 1.35], ["Cl₃CCOOH", 0.66]],
      nota: "Cada Cl atrae más electrones del grupo −COOH, estabiliza el carboxilato y hace más fuerte el ácido: tres Cl multiplican la Ka por más de 10 000." },
    hal: { t: "Qué halógeno", datos: [["CH₃COOH (sin X)", 4.76], ["FCH₂COOH", 2.59], ["ClCH₂COOH", 2.87], ["BrCH₂COOH", 2.90], ["ICH₂COOH", 3.18]],
      nota: "A mayor electronegatividad del halógeno, mayor efecto inductivo (−I) y ácido más fuerte: F &gt; Cl &gt; Br &gt; I." },
    dist: { t: "Distancia al −COOH", datos: [["butanoico (sin Cl)", 4.82], ["2-clorobutanoico", 2.84], ["3-clorobutanoico", 4.06], ["4-clorobutanoico", 4.52]],
      nota: "El efecto inductivo se debilita muy deprisa con la distancia: a tres enlaces apenas se nota. Se transmite por los enlaces σ y casi se apaga a partir del tercer carbono." },
    cadena: { t: "Grupos dadores (+I)", datos: [["HCOOH", 3.75], ["CH₃COOH", 4.76], ["CH₃CH₂COOH", 4.87], ["(CH₃)₃CCOOH", 5.03]],
      nota: "Los grupos alquilo empujan electrones (+I): desestabilizan el carboxilato y el ácido es más débil. El fórmico (sin alquilo) es el más fuerte de los cuatro." }
  };
  B.w.q10_induc = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Efecto inductivo: cuánto cambia la acidez");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="q10-filas"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "nhal" }, fs = cuerpo.querySelector(".q10-filas"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = PKA[st.k];
      fs.innerHTML = P.datos.map(function (x, i) {
        var fuerza = 100 * (1 - x[1] / 6);          // barra más larga = ácido más fuerte (pKa bajo)
        return '<div class="q10-fila' + (i === 0 ? " ref" : "") + '"><span class="n mv q3f">' + x[0] + '</span><span class="q10-pista"><i style="width:' + fuerza.toFixed(1) + '%"></i></span><span class="v">' + d(x[1], 2) + "</span></div>";
      }).join("");
      var ord = P.datos.slice().sort(function (a, b) { return a[1] - b[1]; }), mejor = ord[0], peor = ord[ord.length - 1], razon = Math.pow(10, peor[1] - mejor[1]);
      lectura.innerHTML = fil("Ácido más fuerte", mejor[0] + " (pKa " + d(mejor[1], 2) + ")", "ok") + fil("Ácido más débil", peor[0] + " (pKa " + d(peor[1], 2) + ")", "red") +
        fil("Ka(más fuerte) / Ka(más débil) = 10^ΔpKa", "× " + (razon >= 100 ? String(Math.round(razon)) : d(razon, 1)), "ancho");
      pie.innerHTML = P.nota + " <small>(Barra más larga = ácido más fuerte = pKa más bajo.)</small>";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(PKA).map(function (k) { return { k: k, t: PKA[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q10_ESTER: CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O, K = 4
  // ============================================================
  function equilibrio(K, a, b) {                  // a mol de ácido, b mol de alcohol; devuelve x = mol de éster
    // x² = K (a−x)(b−x)  →  (K−1)x² − K(a+b)x + K·a·b = 0 ; la raíz que no supera al reactivo limitante
    var A = K - 1, Bq = -K * (a + b), C = K * a * b, disc = Bq * Bq - 4 * A * C;
    var r1 = (-Bq - Math.sqrt(disc)) / (2 * A), r2 = (-Bq + Math.sqrt(disc)) / (2 * A);
    return (r1 > 0 && r1 <= Math.min(a, b) + 1e-9) ? r1 : r2;
  }
  B.w.q10_ester = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Esterificación de Fischer: ¿cuánto éster se obtiene?");
    cuerpo.innerHTML = '<div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var K = 4, st = { a: 1, b: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Ácido etanoico inicial", min: 0.5, max: 5, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return d(v, 1) + " mol"; } });
    U.slider(ctl, { et: "Etanol inicial", min: 0.5, max: 10, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return d(v, 1) + " mol"; } });
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 0, ymax: 105, w: 600, h: 250, etx: "etanol / ácido (mol/mol)", ety: "rendimiento (%)", etiqueta: "Rendimiento frente al exceso de alcohol" });
    function pinta() {
      var x = equilibrio(K, st.a, st.b), lim = Math.min(st.a, st.b), rend = 100 * x / lim, r = Math.min(10, st.b / st.a);
      g.limpiar();
      var pts = []; for (var q = 0.1; q <= 10.001; q += 0.1) pts.push([q, 100 * equilibrio(K, 1, q) / Math.min(1, q)]);
      g.polilinea(pts, { clase: "c-pen" });
      g.horizontal(100, { clase: "c-faint", dash: "4 4" });
      g.punto(r, rend, { clase: "c-red", r: 6 });
      g.texto(r, rend - 9, d(rend, 0) + " %", { ancla: r > 8 ? "end" : "middle", clase: "c-red" });
      lectura.innerHTML = fil("Equilibrio", "CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O (K = 4)", "pen ancho") +
        fil("Éster en el equilibrio", d(x, 3) + " mol", "ok") + fil("Agua formada", d(x, 3) + " mol", "") +
        fil("Ácido sin reaccionar", d(st.a - x, 3) + " mol", "") + fil("Etanol sin reaccionar", d(st.b - x, 3) + " mol", "") +
        fil("Rendimiento (sobre el reactivo limitante)", d(rend, 1) + " %", "ok") +
        fil("Comprobación de K", d(x * x / ((st.a - x) * (st.b - x)), 2), "");
      pie.innerHTML = "Con cantidades iguales solo se llega al <b>67 %</b>. Para empujar el equilibrio hacia el éster (Le Châtelier) se pone <b>exceso de uno de los reactivos</b> o se <b>retira el agua</b>. El H₂SO₄ solo hace de catalizador: acelera, no cambia K.";
    }
    pinta();
  };

  B.lab.q10 = { CAT: CAT, ALQ: ALQ, PKA: PKA, equilibrio: equilibrio };
})(window);
