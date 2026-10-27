/* ============================================================
   Bachi para Firu · laboratorio de termoquímica II (Física y Química I, tema 6)
   q6_hess · q6_formacion · q6_enlaces · q6_espontaneidad · q6_combustibles
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, T = B.lab.termo, fil = T.fil;
  T.HF["CH₃Cl(g)"] = -81.9; T.M["N₂"] = 28.01; T.M["C₂H₄"] = 28.05; T.M["H₂O₂"] = 34.01; T.M["C₄H₁₀"] = 58.12;
  function eq(r, p, dH) { return { r: r, p: p, dH: dH }; }
  function signo(x, d) { return (x > 0 ? "+" : x < 0 ? "−" : "") + fmt(Math.abs(x), d == null ? 1 : d); }

  // ============================================================
  // HESS: combina ecuaciones para llegar a la que buscas
  // ============================================================
  var HP = [
    { t: "Combustión del metano", obj: eq([[1, "CH₄(g)"], [2, "O₂(g)"]], [[1, "CO₂(g)"], [2, "H₂O(l)"]]),
      dato: [eq([[1, "C(s)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -393.5), eq([[1, "H₂(g)"], [0.5, "O₂(g)"]], [[1, "H₂O(l)"]], -285.8), eq([[1, "C(s)"], [2, "H₂(g)"]], [[1, "CH₄(g)"]], -74.8)],
      sol: [[1, 0], [2, 0], [1, 1]] },
    { t: "Formación del CO", obj: eq([[1, "C(s)"], [0.5, "O₂(g)"]], [[1, "CO(g)"]]),
      dato: [eq([[1, "C(s)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -393.5), eq([[1, "CO(g)"], [0.5, "O₂(g)"]], [[1, "CO₂(g)"]], -283.0)], sol: [[1, 0], [1, 1]] },
    { t: "Formación del etano", obj: eq([[2, "C(s)"], [3, "H₂(g)"]], [[1, "C₂H₆(g)"]]),
      dato: [eq([[1, "C₂H₆(g)"], [3.5, "O₂(g)"]], [[2, "CO₂(g)"], [3, "H₂O(l)"]], -1560), eq([[1, "C(s)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -393.5), eq([[1, "H₂(g)"], [0.5, "O₂(g)"]], [[1, "H₂O(l)"]], -285.8)], sol: [[1, 1], [2, 0], [3, 0]] },
    { t: "Diamante → grafito", obj: eq([[1, "C(diamante)"]], [[1, "C(grafito)"]]),
      dato: [eq([[1, "C(grafito)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -393.5), eq([[1, "C(diamante)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -395.4)], sol: [[1, 1], [1, 0]] },
    { t: "N₂ + 2 O₂ → 2 NO₂", obj: eq([[1, "N₂(g)"], [2, "O₂(g)"]], [[2, "NO₂(g)"]]),
      dato: [eq([[1, "N₂(g)"], [1, "O₂(g)"]], [[2, "NO(g)"]], 180.5), eq([[2, "NO(g)"], [1, "O₂(g)"]], [[2, "NO₂(g)"]], -114.1)], sol: [[1, 0], [1, 0]] },
    { t: "Formación del SO₃", obj: eq([[1, "S(s)"], [1.5, "O₂(g)"]], [[1, "SO₃(g)"]]),
      dato: [eq([[1, "S(s)"], [1, "O₂(g)"]], [[1, "SO₂(g)"]], -296.8), eq([[1, "SO₂(g)"], [0.5, "O₂(g)"]], [[1, "SO₃(g)"]], -98.9)], sol: [[1, 0], [1, 0]] },
    { t: "Formación del acetileno", obj: eq([[2, "C(s)"], [1, "H₂(g)"]], [[1, "C₂H₂(g)"]]),
      dato: [eq([[1, "C₂H₂(g)"], [2.5, "O₂(g)"]], [[2, "CO₂(g)"], [1, "H₂O(l)"]], -1299.5), eq([[1, "C(s)"], [1, "O₂(g)"]], [[1, "CO₂(g)"]], -393.5), eq([[1, "H₂(g)"], [0.5, "O₂(g)"]], [[1, "H₂O(l)"]], -285.8)], sol: [[1, 1], [2, 0], [1, 0]] }
  ];
  var FACT = [0, 0.5, 1, 1.5, 2, 3, 4];
  B.w.q6_hess = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Constructor de la ley de Hess");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><p class="q6-obj"></p><div class="q6-hfilas"></div><div class="lectura anch"></div><div class="ctl q6-acc"></div><p class="w-pie"></p>';
    var st = { i: 0, filas: [] }, filas = cuerpo.querySelector(".q6-hfilas"), obj = cuerpo.querySelector(".q6-obj"), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), acc = cuerpo.querySelector(".q6-acc");
    function carga() {
      var P = HP[st.i]; st.filas = P.dato.map(function () { return { f: 0, inv: false }; });
      obj.innerHTML = "<b>Objetivo:</b> " + T.eqTxt(P.obj) + "  &nbsp;(ΔH = ?)";
      filas.innerHTML = P.dato.map(function (d, i) {
        return '<div class="q6-hrow" data-i="' + i + '"><div class="q6-heq"><b>(' + (i + 1) + ')</b> ' + T.eqTxt(d) + '  <span class="q6-hdh">ΔH = ' + signo(d.dH) + ' kJ</span></div>' +
          '<label class="q6-hc">Multiplicar por <select data-f>' + FACT.map(function (f) { return '<option value="' + f + '">' + (f === 0 ? "0 (no la uso)" : f === 0.5 ? "½" : f === 1.5 ? "3/2" : f) + "</option>"; }).join("") + '</select></label>' +
          '<button type="button" class="chip-btn" data-inv aria-pressed="false">⇄ Invertir</button></div>';
      }).join("");
      pinta();
    }
    function lee() {
      Array.prototype.forEach.call(filas.querySelectorAll(".q6-hrow"), function (r, i) {
        st.filas[i].f = parseFloat(r.querySelector("[data-f]").value); st.filas[i].inv = r.querySelector("[data-inv]").getAttribute("aria-pressed") === "true";
      });
    }
    function pinta() {
      lee();
      var P = HP[st.i], datos = P.dato.map(function (d, i) { return { eq: d, f: st.filas[i].f, inv: st.filas[i].inv }; }), S = T.suma(datos), meta = T.mapa(P.obj), ok = T.iguales(S.mapa, meta) && Object.keys(S.mapa).length > 0;
      var partes = datos.filter(function (x) { return x.f; }).map(function (x) { return (x.inv ? "(−1)·" : "") + (x.f === 1 ? "" : T.fmtF(x.f) + "·") + "(" + signo(x.eq.dH) + ")"; });
      Array.prototype.forEach.call(filas.querySelectorAll(".q6-hrow"), function (r, i) { r.classList.toggle("q6-uso", !!st.filas[i].f); });
      lec.innerHTML = fil("Tu suma", Object.keys(S.mapa).length ? T.ecTxt(S.mapa) : "(todavía no has elegido ninguna ecuación)", "ancho") +
        fil("ΔH de tu suma", partes.length ? partes.join(" + ") + " = " + signo(S.dH) + " kJ" : "—", "red ancho") +
        fil("¿Coincide con el objetivo?", ok ? "✓ Sí: <b>ΔH = " + signo(S.dH) + " kJ</b>" : "✗ Todavía no. Objetivo: " + T.ecTxt(meta), ok ? "ok ancho" : "red ancho");
      pie.innerHTML = "Para cada ecuación decide <b>si hay que invertirla</b> (cambia el signo de su ΔH) y <b>por cuánto multiplicarla</b> (multiplica también su ΔH). Las sustancias que aparecen a los dos lados se cancelan. Pista: empieza por la sustancia que sólo aparece en una ecuación.";
    }
    filas.addEventListener("change", pinta);
    filas.addEventListener("click", function (e) { var b = e.target.closest("[data-inv]"); if (!b) return; b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"); b.classList.toggle("on"); pinta(); });
    U.boton(acc, "Ver una solución", function () {
      var P = HP[st.i];
      Array.prototype.forEach.call(filas.querySelectorAll(".q6-hrow"), function (r, i) { r.querySelector("[data-f]").value = String(P.sol[i][0]); var b = r.querySelector("[data-inv]"); b.setAttribute("aria-pressed", P.sol[i][1] ? "true" : "false"); b.classList.toggle("on", !!P.sol[i][1]); });
      pinta();
    });
    U.boton(acc, "Borrar", function () { carga(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), HP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; carga(); });
    carga();
  };
  T.fmtF = function (f) { return f === 0.5 ? "½" : f === 1.5 ? "3/2" : fmt(f, 2); };

  // ============================================================
  // FORMACIÓN: ΔH° = ΣΔHf(productos) − ΣΔHf(reactivos)
  // ============================================================
  var FP = [
    { t: "Combustión del metano", eq: eq([[1, "CH₄(g)"], [2, "O₂(g)"]], [[1, "CO₂(g)"], [2, "H₂O(l)"]]) },
    { t: "Combustión del propano", eq: eq([[1, "C₃H₈(g)"], [5, "O₂(g)"]], [[3, "CO₂(g)"], [4, "H₂O(l)"]]) },
    { t: "Combustión del etanol", eq: eq([[1, "C₂H₅OH(l)"], [3, "O₂(g)"]], [[2, "CO₂(g)"], [3, "H₂O(l)"]]) },
    { t: "Combustión de la glucosa", eq: eq([[1, "C₆H₁₂O₆(s)"], [6, "O₂(g)"]], [[6, "CO₂(g)"], [6, "H₂O(l)"]]) },
    { t: "Descomposición del CaCO₃", eq: eq([[1, "CaCO₃(s)"]], [[1, "CaO(s)"], [1, "CO₂(g)"]]) },
    { t: "Termita", eq: eq([[1, "Fe₂O₃(s)"], [2, "Al(s)"]], [[1, "Al₂O₃(s)"], [2, "Fe(s)"]]) },
    { t: "Síntesis del amoniaco", eq: eq([[1, "N₂(g)"], [3, "H₂(g)"]], [[2, "NH₃(g)"]]) },
    { t: "Oxidación del NH₃", eq: eq([[4, "NH₃(g)"], [5, "O₂(g)"]], [[4, "NO(g)"], [6, "H₂O(g)"]]) },
    { t: "2 SO₂ + O₂ → 2 SO₃", eq: eq([[2, "SO₂(g)"], [1, "O₂(g)"]], [[2, "SO₃(g)"]]) },
    { t: "Hidrogenación del eteno", eq: eq([[1, "C₂H₄(g)"], [1, "H₂(g)"]], [[1, "C₂H₆(g)"]]) },
    { t: "Combustión del CO", eq: eq([[1, "CO(g)"], [0.5, "O₂(g)"]], [[1, "CO₂(g)"]]) },
    { t: "Descomposición del H₂O₂", eq: eq([[2, "H₂O₂(l)"]], [[2, "H₂O(l)"], [1, "O₂(g)"]]) }
  ];
  function formulaBase(s) { return s.replace(/\((s|l|g|grafito)\)$/, ""); }
  B.w.q6_formacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Entalpía de reacción con entalpías de formación");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><p class="q6-obj"></p><div class="ac-tabla q6-tab"></div><div class="lectura anch"></div><div data-ctl></div><div class="lectura anch q6-lec2"></div><p class="w-pie"></p>';
    var st = { i: 0, g: 10 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), obj = cuerpo.querySelector(".q6-obj"), tab = cuerpo.querySelector(".q6-tab"), lec = cuerpo.querySelector(".lectura"), lec2 = cuerpo.querySelector(".q6-lec2"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Masa (g)", min: 1, max: 200, step: 1, val: st.g, on: function (v) { st.g = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " g"; } });
    function pinta() {
      var P = FP[st.i], e = P.eq, sp = 0, sr = 0;
      obj.innerHTML = "<b>Reacción:</b> " + T.eqTxt(e);
      function fila(x) { var h = T.HF[x[1]], c = x[0] * h; return "<tr><td style='text-align:left'>" + x[1] + "</td><td>" + T.fmtF(x[0]) + "</td><td>" + signo(h) + "</td><td>" + signo(c) + "</td></tr>"; }
      e.p.forEach(function (x) { sp += x[0] * T.HF[x[1]]; }); e.r.forEach(function (x) { sr += x[0] * T.HF[x[1]]; });
      var dH = sp - sr;
      tab.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Sustancia</th><th>Coef.</th><th>ΔH°<sub>f</sub> (kJ/mol)</th><th>Coef.·ΔH°<sub>f</sub></th></tr></thead><tbody>" +
        "<tr><th colspan='4' style='text-align:left'>Productos</th></tr>" + e.p.map(fila).join("") + "<tr><th colspan='3' style='text-align:left'>Σ productos</th><td><b>" + signo(sp) + "</b></td></tr>" +
        "<tr><th colspan='4' style='text-align:left'>Reactivos</th></tr>" + e.r.map(fila).join("") + "<tr><th colspan='3' style='text-align:left'>Σ reactivos</th><td><b>" + signo(sr) + "</b></td></tr></tbody></table>";
      lec.innerHTML = fil("ΔH° = Σ productos − Σ reactivos", signo(sp) + " − (" + signo(sr) + ") = <b>" + signo(dH) + " kJ</b>", "ok ancho") + fil("Tipo", dH < 0 ? "exotérmica: desprende calor" : dH > 0 ? "endotérmica: absorbe calor" : "ΔH = 0", dH < 0 ? "red" : "pen");
      var s0 = e.r[0], base = formulaBase(s0[1]), M = T.M[base];
      if (M) { var n = st.g / M, Q = n / s0[0] * dH; lec2.innerHTML = fil("Calor para " + fmt(st.g, 0) + " g de " + base, "n = " + fmt(n, 3) + " mol → Q = (n/coef)·ΔH = " + signo(Q, 1) + " kJ  (" + (Q < 0 ? "se desprende" : "se absorbe") + ")", "red ancho"); }
      else lec2.innerHTML = "";
      pie.innerHTML = "Los elementos en su forma estable (O₂, H₂, N₂, C grafito, metales…) tienen ΔH°<sub>f</sub> = 0. Cada ΔH°<sub>f</sub> se multiplica por su <b>coeficiente</b> en la ecuación ajustada. ΔH de la reacción se refiere a «moles de reacción» tal como está escrita.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), FP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // ENLACES: ΔH ≈ Σ E(rotos) − Σ E(formados)
  // ============================================================
  var EP = [
    { t: "H₂ + Cl₂ → 2 HCl", eq: "H₂(g) + Cl₂(g) → 2 HCl(g)", rot: [[1, "H–H"], [1, "Cl–Cl"]], form: [[2, "H–Cl"]], exp: 2 * -92.3 },
    { t: "2 H₂ + O₂ → 2 H₂O(g)", eq: "2 H₂(g) + O₂(g) → 2 H₂O(g)", rot: [[2, "H–H"], [1, "O=O"]], form: [[4, "O–H"]], exp: 2 * -241.8 },
    { t: "N₂ + 3 H₂ → 2 NH₃", eq: "N₂(g) + 3 H₂(g) → 2 NH₃(g)", rot: [[1, "N≡N"], [3, "H–H"]], form: [[6, "N–H"]], exp: 2 * -46.1 },
    { t: "Combustión del metano", eq: "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g)", rot: [[4, "C–H"], [2, "O=O"]], form: [[2, "C=O"], [4, "O–H"]], exp: -393.5 + 2 * -241.8 + 74.8 },
    { t: "Combustión del propano", eq: "C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(g)", rot: [[2, "C–C"], [8, "C–H"], [5, "O=O"]], form: [[6, "C=O"], [8, "O–H"]], exp: 3 * -393.5 + 4 * -241.8 + 103.8 },
    { t: "Hidrogenación del eteno", eq: "C₂H₄(g) + H₂(g) → C₂H₆(g)", rot: [[1, "C=C"], [1, "H–H"]], form: [[1, "C–C"], [2, "C–H"]], exp: -84.7 - 52.3 },
    { t: "CH₄ + Cl₂ → CH₃Cl + HCl", eq: "CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g)", rot: [[1, "C–H"], [1, "Cl–Cl"]], form: [[1, "C–Cl"], [1, "H–Cl"]], exp: -81.9 - 92.3 + 74.8 }
  ];
  B.w.q6_enlaces = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Entalpías de enlace: romper cuesta, formar libera");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><p class="q6-obj"></p><div class="w-plot"></div><div class="ac-tabla q6-tab"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0 }, g, obj = cuerpo.querySelector(".q6-obj"), tab = cuerpo.querySelector(".q6-tab"), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = EP[st.i], er = 0, ef = 0;
      P.rot.forEach(function (x) { er += x[0] * T.EE[x[1]]; }); P.form.forEach(function (x) { ef += x[0] * T.EE[x[1]]; });
      var dH = er - ef, top = Math.max(er, ef) * 1.12;
      obj.innerHTML = "<b>" + P.eq.replace(/→/g, "⟶") + "</b>";
      g.rango(0.2, 4.4, 0, top); g.limpiar();
      g.rect(0.6, 0, 1.4, er, { clase: "z-red" }); g.texto(1, er, "+" + fmt(er, 0), { dy: -6, ancla: "middle", clase: "red" }); g.texto(1, 0, "se rompen", { dy: 16, ancla: "middle", clase: "faint" });
      g.rect(1.8, 0, 2.6, ef, { clase: "z-ok" }); g.texto(2.2, ef, "−" + fmt(ef, 0), { dy: -6, ancla: "middle", clase: "ok" }); g.texto(2.2, 0, "se forman", { dy: 16, ancla: "middle", clase: "faint" });
      g.rect(3.0, Math.min(0, 0), 3.8, Math.abs(dH), { clase: dH < 0 ? "z-pen" : "z-red" }); g.texto(3.4, Math.abs(dH), "ΔH = " + signo(dH, 0), { dy: -6, ancla: "middle", clase: "pen" }); g.texto(3.4, 0, "balance", { dy: 16, ancla: "middle", clase: "faint" });
      function fila(x) { return "<tr><td style='text-align:left'>" + x[0] + " × " + x[1] + "</td><td>" + T.EE[x[1]] + "</td><td>" + fmt(x[0] * T.EE[x[1]], 0) + "</td></tr>"; }
      tab.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Enlace</th><th>E (kJ/mol)</th><th>Total (kJ)</th></tr></thead><tbody><tr><th colspan='3' style='text-align:left'>Enlaces que se rompen (absorben energía)</th></tr>" + P.rot.map(fila).join("") +
        "<tr><th colspan='2' style='text-align:left'>Σ rotos</th><td><b>" + fmt(er, 0) + "</b></td></tr><tr><th colspan='3' style='text-align:left'>Enlaces que se forman (liberan energía)</th></tr>" + P.form.map(fila).join("") + "<tr><th colspan='2' style='text-align:left'>Σ formados</th><td><b>" + fmt(ef, 0) + "</b></td></tr></tbody></table>";
      lec.innerHTML = fil("ΔH ≈ Σ E(rotos) − Σ E(formados)", fmt(er, 0) + " − " + fmt(ef, 0) + " = <b>" + signo(dH, 0) + " kJ</b>", "ok ancho") +
        fil("ΔH «real» (con entalpías de formación)", signo(P.exp, 1) + " kJ", "pen") + fil("Diferencia", fmt(Math.abs(dH - P.exp), 1) + " kJ (" + fmt(100 * Math.abs(dH - P.exp) / Math.abs(P.exp), 1) + " %)", "");
      pie.innerHTML = "Las entalpías de enlace son <b>valores medios</b> y las sustancias deben estar en fase gaseosa: por eso el resultado es una <b>estimación</b>, no un dato exacto. Si se absorbe más energía al romper de la que se libera al formar, ΔH &gt; 0 (endotérmica); si ocurre lo contrario, ΔH &lt; 0.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0.2, xmax: 4.4, ymin: 0, ymax: 5000, w: 560, h: 250, sinX: true, ety: "kJ", etiqueta: "Energía de enlaces rotos y formados" });
    U.fichas(cuerpo.querySelector("[data-pre]"), EP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // ESPONTANEIDAD: ΔG = ΔH − T·ΔS
  // ============================================================
  var GP = [
    { t: "CaCO₃ → CaO + CO₂", dH: 178.3, dS: 160.5, nota: "Descomposición térmica: ΔH &gt; 0 y ΔS &gt; 0 (se forma un gas). Sólo es espontánea a alta temperatura." },
    { t: "2 H₂O₂ → 2 H₂O + O₂", dH: -196, dS: 126, nota: "ΔH &lt; 0 y ΔS &gt; 0: espontánea a cualquier temperatura (el agua oxigenada se descompone sola, despacio)." },
    { t: "N₂ + 3 H₂ → 2 NH₃", dH: -92.2, dS: -198.7, nota: "ΔH &lt; 0 y ΔS &lt; 0 (4 mol de gas → 2 mol): espontánea sólo a baja temperatura (por eso el proceso Haber busca un compromiso)." },
    { t: "H₂O(s) → H₂O(l)", dH: 6.01, dS: 22.0, nota: "Fusión del hielo (por mol): ΔH &gt; 0 y ΔS &gt; 0; la temperatura de equilibrio es 273 K = 0 °C." },
    { t: "3 O₂ → 2 O₃", dH: 285.4, dS: -137.2, nota: "ΔH &gt; 0 y ΔS &lt; 0: no es espontánea a ninguna temperatura (el ozono se forma con radiación, no «solo»)." },
    { t: "NH₄NO₃ (disolución)", dH: 25.7, dS: 108.7, nota: "Endotérmica pero espontánea a 298 K: el desorden aumenta tanto que compensa (bolsa de frío instantáneo)." },
    { t: "C(grafito) + O₂ → CO₂", dH: -393.5, dS: 2.9, nota: "ΔH muy negativa y ΔS casi nula: espontánea siempre (la entropía casi no influye)." }
  ];
  B.w.q6_espontaneidad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Es espontánea? ΔG = ΔH − T·ΔS");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><div class="ac-tabla q6-tab"></div><p class="w-pie"></p>';
    var st = { i: 0, T: 298 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".q6-tab"), pie = cuerpo.querySelector(".w-pie");
    var sT = U.slider(ctl, { et: "T (K)", min: 1, max: 2000, step: 1, val: st.T, on: function (v) { st.T = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " K"; } });
    function pinta() {
      var P = GP[st.i], dG = P.dH - st.T * P.dS / 1000, Teq = P.dS !== 0 ? P.dH * 1000 / P.dS : null, Tmax = 2000;
      var y0 = P.dH - 0 * P.dS, y1 = P.dH - Tmax * P.dS / 1000, ymin = Math.min(y0, y1, -20), ymax = Math.max(y0, y1, 20), pad = (ymax - ymin) * 0.1;
      g.rango(0, Tmax, ymin - pad, ymax + pad); g.limpiar();
      g.rect(0, g.c.ymin, Tmax, 0, { clase: "z-ok" }); g.rect(0, 0, Tmax, g.c.ymax, { clase: "z-red" });
      g.curva(function (t) { return P.dH - t * P.dS / 1000; }, { clase: "c-pen", n: 2 }).setAttribute("stroke-width", 3.2);
      g.texto(Tmax * 0.98, g.c.ymin, "ΔG &lt; 0: espontánea".replace("&lt;", "<"), { dy: -8, ancla: "end", clase: "ok" }); g.texto(Tmax * 0.98, g.c.ymax, "ΔG > 0: no espontánea", { dy: 18, ancla: "end", clase: "red" });
      if (Teq && Teq > 0 && Teq < Tmax) { g.punto(Teq, 0, { r: 6, clase: "c-red" }); g.texto(Teq, 0, "T = " + fmt(Teq, 0) + " K", { dy: -10, ancla: "middle", clase: "red" }); }
      g.segmento(st.T, g.c.ymin, st.T, g.c.ymax, { clase: "c-faint", dash: "4 4" }); g.punto(st.T, dG, { r: 7, clase: "c-ok" });
      var caso = P.dH < 0 && P.dS > 0 ? "ΔH &lt; 0 y ΔS &gt; 0 → espontánea siempre" : P.dH > 0 && P.dS < 0 ? "ΔH &gt; 0 y ΔS &lt; 0 → nunca espontánea" : P.dH < 0 && P.dS < 0 ? "ΔH &lt; 0 y ΔS &lt; 0 → espontánea a baja temperatura" : "ΔH &gt; 0 y ΔS &gt; 0 → espontánea a alta temperatura";
      lec.innerHTML = fil("Datos", "ΔH = " + signo(P.dH, 1) + " kJ · ΔS = " + signo(P.dS, 1) + " J/K", "ancho") + fil("Caso", caso, "pen ancho") +
        fil("ΔG a " + fmt(st.T, 0) + " K (" + fmt(st.T - 273.15, 0) + " °C)", signo(dG, 1) + " kJ · " + (dG < 0 ? "<b>espontánea</b>" : dG > 0 ? "no espontánea" : "equilibrio"), (dG < 0 ? "ok" : "red") + " ancho") +
        fil("Temperatura de equilibrio (ΔG = 0)", Teq && Teq > 0 ? "T = ΔH/ΔS = " + fmt(Teq, 0) + " K = " + fmt(Teq - 273.15, 0) + " °C" : "no existe (ΔG no cambia de signo para T &gt; 0)", "ancho");
      var tr = [[-1, 1, "Espontánea siempre", "p. ej. combustiones con aumento de gas"], [1, -1, "No espontánea nunca", "p. ej. 3 O₂ → 2 O₃"], [-1, -1, "Espontánea a T baja", "p. ej. síntesis del NH₃"], [1, 1, "Espontánea a T alta", "p. ej. descomposición del CaCO₃"]];
      tab.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>ΔH</th><th>ΔS</th><th>Resultado</th></tr></thead><tbody>" + tr.map(function (x) { var cur = Math.sign(P.dH) === x[0] && Math.sign(P.dS) === x[1]; return "<tr class='" + (cur ? "q6-cur" : "") + "'><td>" + (x[0] < 0 ? "−" : "+") + "</td><td>" + (x[1] < 0 ? "−" : "+") + "</td><td style='text-align:left'>" + x[2] + " <small>" + x[3] + "</small></td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = P.nota + " Mueve la temperatura: la recta azul es ΔG(T) y su pendiente es −ΔS. Cuando corta el eje es el punto de equilibrio T = ΔH/ΔS.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 2000, ymin: -200, ymax: 200, w: 600, h: 300, etx: "T (K)", ety: "ΔG (kJ)", etiqueta: "ΔG frente a la temperatura" });
    U.fichas(cuerpo.querySelector("[data-pre]"), GP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // COMBUSTIBLES: energía, masa y CO₂
  // ============================================================
  var CB = [
    { n: "Hidrógeno", f: "H₂", M: 2.016, h: 285.8, nc: 0 }, { n: "Metano", f: "CH₄", M: 16.04, h: 890.3, nc: 1 }, { n: "Propano", f: "C₃H₈", M: 44.10, h: 2220, nc: 3 },
    { n: "Butano", f: "C₄H₁₀", M: 58.12, h: 2877, nc: 4 }, { n: "Octano (gasolina)", f: "C₈H₁₈", M: 114.23, h: 5470, nc: 8 }, { n: "Etanol", f: "C₂H₅OH", M: 46.07, h: 1367, nc: 2 },
    { n: "Carbón", f: "C", M: 12.01, h: 393.5, nc: 1 }, { n: "Glucosa", f: "C₆H₁₂O₆", M: 180.16, h: 2803, nc: 6 }
  ];
  CB.forEach(function (c) { c.kjg = c.h / c.M; c.co2 = c.nc * 44.01 / c.h * 1000; });   // kJ/g y g de CO₂ por MJ
  B.lab.termo.COMB = CB;
  B.w.q6_combustibles = function (host) {
    var cuerpo = B.caja(host, "Problema", "Combustibles: energía y CO₂");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="ac-tabla q6-tab"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: 1, V: 20, dT: 50, eta: 70 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), tab = cuerpo.querySelector(".q6-tab"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Agua (L)", min: 1, max: 200, step: 1, val: st.V, on: function (v) { st.V = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " L"; } });
    U.slider(ctl, { et: "Subida (K)", min: 5, max: 80, step: 5, val: st.dT, on: function (v) { st.dT = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " K"; } });
    U.slider(ctl, { et: "Rendimiento", min: 30, max: 100, step: 5, val: st.eta, on: function (v) { st.eta = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } });
    function pinta() {
      var C = CB[st.k], Q = st.V * 1000 * T.CE.agua.c * st.dT / 1000, Qc = Q / (st.eta / 100), n = Qc / C.h, m = n * C.M, co2 = n * C.nc * 44.01;
      var max = Math.max.apply(null, CB.map(function (c) { return c.kjg; })); g.limpiar();
      CB.forEach(function (c, i) { var y = CB.length - i; g.rect(0, y - 0.35, c.kjg, y + 0.35, { clase: i === st.k ? "z-red" : "z-pen" }); g.texto(0, y, c.n, { dx: 6, dy: 5, clase: "pen" }); g.texto(c.kjg, y, fmt(c.kjg, 1) + " kJ/g", { dx: 6, dy: 5, clase: "faint" }); });
      tab.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Combustible</th><th>M (g/mol)</th><th>−ΔH<sub>c</sub> (kJ/mol)</th><th>kJ/g</th><th>g CO₂ por MJ</th></tr></thead><tbody>" + CB.map(function (c, i) { return "<tr class='" + (i === st.k ? "q6-cur" : "") + "'><td style='text-align:left'>" + c.n + " (" + c.f + ")</td><td>" + fmt(c.M, 2) + "</td><td>" + fmt(c.h, 1) + "</td><td>" + fmt(c.kjg, 1) + "</td><td>" + fmt(c.co2, 1) + "</td></tr>"; }).join("") + "</tbody></table>";
      lec.innerHTML = fil("Calor útil necesario", "Q = m·c·ΔT = " + fmt(st.V * 1000, 0) + " g · 4,18 J/(g·K) · " + fmt(st.dT, 0) + " K = " + fmt(Q, 0) + " kJ", "pen ancho") +
        fil("Calor que hay que producir (rendimiento " + fmt(st.eta, 0) + " %)", fmt(Qc, 0) + " kJ", "ancho") + fil("Cantidad de " + C.n.toLowerCase(), fmt(n, 2) + " mol = " + fmt(m, 1) + " g", "red") + fil("CO₂ emitido", fmt(co2 / 1000, 2) + " kg", st.k === 0 ? "ok" : "red");
      pie.innerHTML = "<b>−ΔH<sub>c</sub></b> es la energía que desprende la combustión completa de 1 mol (con agua líquida). Dividiendo entre la masa molar sale la <b>energía por gramo</b>; el hidrógeno es el que más da por gramo y no emite CO₂, pero es el más difícil de almacenar. Entre los combustibles de carbono, cuanto más hidrógeno tiene la molécula (metano), menos CO₂ por energía obtenida.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 200, ymin: 0.4, ymax: CB.length + 0.8, w: 600, h: 280, sinY: true, etx: "kJ/g", etiqueta: "Energía por gramo de combustible" });
    U.fichas(cuerpo.querySelector("[data-sel]"), CB.map(function (c, i) { return { k: String(i), t: c.n }; }), "1", function (k) { st.k = +k; pinta(); });
    pinta();
  };
})(window);
