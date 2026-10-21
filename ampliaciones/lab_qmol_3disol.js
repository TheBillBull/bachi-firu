/* ============================================================
   Bachi para Firu · FyQ I tema 4 (III): disoluciones y entrenador de problemas
   q4_disolucion · q4_dilucion · q4_practica
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;
  var NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }

  // ============================================================
  // DISOLUCION: todas las concentraciones a la vez
  // ============================================================
  var DIS = [
    { t: "Suero fisiológico", f: "NaCl", m: "9", V: "1000", d: "1,005", pct: "0,9" },
    { t: "Ácido clorhídrico comercial", f: "HCl", m: "440", V: "1000", d: "1,19", pct: "37" },
    { t: "Vinagre", f: "CH3COOH", m: "50,5", V: "1000", d: "1,01", pct: "5" },
    { t: "Suero glucosado", f: "C6H12O6", m: "50", V: "1000", d: "1,02", pct: "5" },
    { t: "Sosa 1 M", f: "NaOH", m: "40", V: "1000", d: "1,04", pct: "4" },
    { t: "Lejía (hipoclorito)", f: "NaClO", m: "50", V: "1000", d: "1,07", pct: "5" }
  ];
  B.w.q4_disolucion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Todas las formas de expresar la concentración");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-modo class="chips"></div><div data-mm class="chips"></div><div data-ctl></div><div class="q4-barras"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "masa", i: 0, f: DIS[0].f, m: DIS[0].m, V: DIS[0].V, d: DIS[0].d, pct: DIS[0].pct }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), barras = cuerpo.querySelector(".q4-barras");
    var iF = Q.campo(ctl, "Soluto:", st.f, 120), iM = Q.campo(ctl, "Masa soluto (g)", st.m, 80), iP = Q.campo(ctl, "% en masa", st.pct, 80), iV = Q.campo(ctl, "Volumen disolución (mL)", st.V, 90), iD = Q.campo(ctl, "Densidad (g/mL)", st.d, 80);
    Q.fichasModo(cuerpo.querySelector("[data-mm]"), function () { pinta(); });
    function pinta() {
      var L = Q.leer(st.f), V = Q.num(st.V), d = Q.num(st.d), masaMode = st.modo === "masa";
      iM.parentNode.style.display = masaMode ? "" : "none"; iP.parentNode.style.display = masaMode ? "none" : "";
      if (!L.ok) { lectura.innerHTML = fil("Revisa la fórmula", L.error, "red ancho"); barras.innerHTML = ""; return; }
      if ([V, d].some(function (x) { return isNaN(x) || x <= 0; })) { lectura.innerHTML = fil("Revisa los datos", "el volumen y la densidad deben ser números positivos", "red ancho"); return; }
      var M = Q.masaMolar(st.f), ms, pct, mdis = V * d;
      if (masaMode) { ms = Q.num(st.m); if (isNaN(ms) || ms < 0) { lectura.innerHTML = fil("Revisa la masa", "escribe un número positivo", "red ancho"); return; } pct = ms / mdis * 100; }
      else { pct = Q.num(st.pct); if (isNaN(pct) || pct <= 0 || pct >= 100) { lectura.innerHTML = fil("Revisa el %", "escribe un porcentaje entre 0 y 100", "red ancho"); return; } ms = mdis * pct / 100; }
      if (ms >= mdis) { lectura.innerHTML = fil("Datos imposibles", "la masa de soluto no puede superar la de la disolución (" + fmt(mdis, 1) + " g)", "red ancho"); return; }
      var n = ms / M, mdv = mdis - ms, nAgua = mdv / 18.0, Mol = n / (V / 1000), mol = n / (mdv / 1000), x = n / (n + nAgua);
      barras.innerHTML = "<div class='q4-apilada' role='img' aria-label='soluto y disolvente en masa'><span style='flex:" + ms + ";background:" + Q.color(1) + "'>" + (ms / mdis > 0.12 ? "soluto " + fmt(ms, 1) + " g" : "") + "</span><span style='flex:" + mdv + ";background:" + Q.color(0) + "'>disolvente " + fmt(mdv, 1) + " g</span></div>";
      lectura.innerHTML = fil("Masa de la disolución  m = V·d", fmt(V, 1) + " mL · " + fmt(d, 3) + " g/mL = " + fmt(mdis, 2) + " g", "pen ancho") + fil("Moles de soluto  n = m/M", fmt(ms, 3) + " / " + fmt(M, 2) + " = " + fmt(n, 4) + " mol", "") +
        fil("Molaridad  M = n/V(L)", fmt(Mol, 4) + " mol/L", "ok") + fil("Molalidad  m = n/kg disolvente", fmt(mol, 4) + " mol/kg", "ok") + fil("% en masa", fmt(pct, 3) + " %", "red") + fil("Concentración en masa", fmt(ms / (V / 1000), 3) + " g/L", "red") +
        fil("Fracción molar del soluto", fmt(x, 5), "") + fil("ppm (mg de soluto por kg)", fmt(ms / mdis * 1e6, 0), "") + fil("De % y densidad a molaridad", "M = (% · d · 10) / M<sub>soluto</sub> = (" + fmt(pct, 2) + " · " + fmt(d, 3) + " · 10) / " + fmt(M, 2) + " = " + fmt(pct * d * 10 / M, 4) + " mol/L", "ancho");
      pie.innerHTML = "La <b>molaridad</b> usa el volumen de <b>disolución</b>; la <b>molalidad</b> la masa de <b>disolvente</b> (no depende de la temperatura). Para pasar de % en masa a molaridad hace falta la <b>densidad</b>: en 1 L hay 1000·d gramos de disolución y de ellos el % es soluto.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), DIS.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var P = DIS[+k]; st.i = +k; st.f = P.f; st.m = P.m; st.V = P.V; st.d = P.d; st.pct = P.pct; iF.value = P.f; iM.value = P.m; iV.value = P.V; iD.value = P.d; iP.value = P.pct; pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "masa", t: "Datos: gramos de soluto y volumen" }, { k: "pct", t: "Datos: % en masa y densidad" }], "masa", function (k) { st.modo = k; pinta(); });
    [[iF, "f"], [iM, "m"], [iP, "pct"], [iV, "V"], [iD, "d"]].forEach(function (a) { a[0].addEventListener("input", function () { st[a[1]] = a[0].value; pinta(); }); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // DILUCION: preparar, diluir y mezclar disoluciones
  // ============================================================
  B.w.q4_dilucion = function (host) {
    var cuerpo = B.caja(host, "Laboratorio", "Preparar, diluir y mezclar disoluciones");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-ctl></div><div class="w-plot q4-lab"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "dil", M1: 6, V2: 500, M2: 1, Mb: 0.5, V1m: 200, M2m: 2, V2m: 300, sol: "NaCl", Vs: 250, Ms: 0.5 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), lienzo = cuerpo.querySelector(".q4-lab");
    var s = {};
    function S(k, o) { s[k] = U.slider(ctl, { et: o.et, min: o.min, max: o.max, step: o.step, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: o.fmt }); }
    S("M1", { et: "Disolución concentrada (M)", min: 1, max: 12, step: 0.5, fmt: function (v) { return fmt(v, 1) + " M"; } });
    S("M2", { et: "Concentración deseada (M)", min: 0.1, max: 5, step: 0.1, fmt: function (v) { return fmt(v, 1) + " M"; } });
    S("V2", { et: "Volumen final", min: 50, max: 1000, step: 50, fmt: function (v) { return fmt(v, 0) + " mL"; } });
    S("V1m", { et: "Disolución A: volumen", min: 50, max: 500, step: 25, fmt: function (v) { return fmt(v, 0) + " mL"; } });
    S("Mb", { et: "Disolución A: molaridad", min: 0.1, max: 4, step: 0.1, fmt: function (v) { return fmt(v, 1) + " M"; } });
    S("V2m", { et: "Disolución B: volumen", min: 50, max: 500, step: 25, fmt: function (v) { return fmt(v, 0) + " mL"; } });
    S("M2m", { et: "Disolución B: molaridad", min: 0.1, max: 4, step: 0.1, fmt: function (v) { return fmt(v, 1) + " M"; } });
    S("Vs", { et: "Volumen que se quiere preparar", min: 50, max: 1000, step: 50, fmt: function (v) { return fmt(v, 0) + " mL"; } });
    S("Ms", { et: "Molaridad deseada", min: 0.1, max: 3, step: 0.1, fmt: function (v) { return fmt(v, 1) + " M"; } });
    var isol = Q.campo(ctl, "Soluto sólido:", st.sol, 120); isol.addEventListener("input", function () { st.sol = isol.value; pinta(); });
    var fondo = svg("svg", { viewBox: "0 0 420 210", "class": "plot", role: "img", "aria-label": "Vasos de precipitados con disoluciones de distinta concentración" }, lienzo);
    function vaso(x, nivel, M, etiqueta, maxM) {
      var alto = 120, y0 = 160, h = alto * Math.max(0.05, Math.min(1, nivel));
      svg("path", { d: "M" + x + " " + (y0 - alto - 8) + " v" + (alto + 8) + " q0 14 16 14 h58 q16 0 16 -14 v-" + (alto + 8), "class": "q4-vaso" }, fondo);
      svg("rect", { x: x + 1, y: y0 - h, width: 88, height: h, "class": "q4-liq", "fill-opacity": Math.min(0.95, 0.12 + 0.83 * M / maxM) }, fondo);
      var t = svg("text", { x: x + 45, y: y0 + 34, "text-anchor": "middle", "class": "q4-lbl" }, fondo); t.textContent = etiqueta;
    }
    function pinta() {
      var m = st.modo;
      ["M1", "M2", "V2"].forEach(function (k) { s[k].el.style.display = m === "dil" ? "" : "none"; }); ["V1m", "Mb", "V2m", "M2m"].forEach(function (k) { s[k].el.style.display = m === "mez" ? "" : "none"; }); ["Vs", "Ms"].forEach(function (k) { s[k].el.style.display = m === "sol" ? "" : "none"; }); isol.parentNode.style.display = m === "sol" ? "" : "none";
      while (fondo.firstChild) fondo.removeChild(fondo.firstChild);
      if (m === "dil") {
        var M1 = st.M1, M2 = Math.min(st.M2, M1), V2 = st.V2, V1 = M2 * V2 / M1, Va = V2 - V1, n = M2 * V2 / 1000;
        vaso(40, 0.8, M1, "concentrada " + fmt(M1, 1) + " M", 12); vaso(250, 0.85, M2, "final " + fmt(M2, 1) + " M", 12);
        var fl = svg("path", { d: "M140 90 h90", "class": "q4-flecha" }, fondo); var tt = svg("text", { x: 185, y: 80, "text-anchor": "middle", "class": "q4-lbl" }, fondo); tt.textContent = "+ agua";
        lectura.innerHTML = fil("Moles de soluto en la final  n = M₂·V₂", fmt(n, 4) + " mol", "pen") + fil("Volumen de concentrada que se toma  V₁ = M₂V₂/M₁", fmt(V1, 2) + " mL", "ok") + fil("Agua que se añade", fmt(Va, 2) + " mL (hasta completar " + fmt(V2, 0) + " mL en el matraz aforado)", "red ancho") +
          fil("Factor de dilución", "× " + fmt(M1 / M2, 2) + " (la concentración se divide entre " + fmt(M1 / M2, 2) + ")", "ancho");
        pie.innerHTML = "<b>M₁·V₁ = M₂·V₂</b>: al diluir, los moles de soluto <b>no cambian</b>; sólo se añade disolvente. Se mide V₁ con una pipeta, se pasa a un matraz aforado y se enrasa con agua hasta V₂. (Con los ácidos fuertes: siempre «el ácido al agua».)";
      } else if (m === "mez") {
        var n1 = st.Mb * st.V1m / 1000, n2 = st.M2m * st.V2m / 1000, Vt = st.V1m + st.V2m, Mf = (n1 + n2) / (Vt / 1000);
        vaso(30, st.V1m / 500 * 0.9, st.Mb, "A " + fmt(st.Mb, 1) + " M", 4); vaso(160, st.V2m / 500 * 0.9, st.M2m, "B " + fmt(st.M2m, 1) + " M", 4); vaso(300, Vt / 1000 * 0.95, Mf, "mezcla " + fmt(Mf, 2) + " M", 4);
        lectura.innerHTML = fil("Moles en A", fmt(st.Mb, 1) + " · " + fmt(st.V1m / 1000, 3) + " L = " + fmt(n1, 4) + " mol", "pen") + fil("Moles en B", fmt(st.M2m, 1) + " · " + fmt(st.V2m / 1000, 3) + " L = " + fmt(n2, 4) + " mol", "red") + fil("Volumen final (se suponen volúmenes aditivos)", fmt(Vt, 0) + " mL", "") +
          fil("Molaridad de la mezcla  M = (n₁ + n₂)/(V₁ + V₂)", fmt(Mf, 4) + " mol/L", "ok ancho");
        pie.innerHTML = "Al <b>mezclar</b> dos disoluciones del mismo soluto, <b>se suman los moles y se suman los volúmenes</b> (si son aditivos). La molaridad resultante queda siempre entre las dos de partida, más cerca de la de mayor volumen.";
      } else {
        var L = Q.leer(st.sol);
        if (!L.ok) { lectura.innerHTML = fil("Revisa la fórmula", L.error, "red ancho"); return; }
        var Msol = Q.masaMolar(st.sol), nn = st.Ms * st.Vs / 1000, mm = nn * Msol;
        vaso(160, 0.85, st.Ms, st.Vs + " mL · " + fmt(st.Ms, 1) + " M", 3);
        lectura.innerHTML = fil("Masa molar de " + L.formula, fmt(Msol, 2) + " g/mol", "pen") + fil("Moles necesarios  n = M·V", fmt(st.Ms, 1) + " · " + fmt(st.Vs / 1000, 3) + " L = " + fmt(nn, 4) + " mol", "") + fil("Masa que hay que pesar  m = n·M", fmt(mm, 3) + " g de " + L.formula, "ok ancho");
        pie.innerHTML = "<b>Receta:</b> 1) calcula los moles n = M·V (V en litros); 2) pásalos a gramos con la masa molar; 3) pesa el soluto, disuélvelo en algo de agua en un vaso, trasvasa a un matraz aforado del volumen deseado y <b>enrasa</b> con agua hasta la marca.";
      }
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "dil", t: "Diluir una disolución" }, { k: "mez", t: "Mezclar dos disoluciones" }, { k: "sol", t: "Preparar a partir de sólido" }], "dil", function (k) { st.modo = k; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta }); pinta();
  };

  // ============================================================
  // PRACTICA: problemas de mol, gases y disoluciones con números aleatorios
  // ============================================================
  var SUST = ["H2O", "CO2", "NaCl", "CaCO3", "NH3", "H2SO4", "C6H12O6", "NaOH", "HCl", "Mg(OH)2", "Al2O3", "CH4"];
  function elige(a) { return a[Math.floor(Math.random() * a.length)]; }
  function entre(a, b, paso) { return a + Math.floor(Math.random() * ((b - a) / paso + 1)) * paso; }
  var GEN = [
    function () { var f = elige(SUST), m = entre(10, 200, 5), M = Q.masaMolar(f); return { q: "¿Cuántos <b>moles</b> hay en " + m + " g de " + Q.sub(f) + "? (Masas de examen.)", r: m / M, u: "mol", pasos: ["M(" + Q.sub(f) + ") = " + fmt(M, 2) + " g/mol", "n = m/M = " + m + " / " + fmt(M, 2) + " = " + fmt(m / M, 4) + " mol"] }; },
    function () { var f = elige(SUST), m = entre(5, 100, 5), M = Q.masaMolar(f); return { q: "¿Cuántas <b>moléculas</b> hay en " + m + " g de " + Q.sub(f) + "? Escribe el resultado como 1,2*10^24.", r: m / M * Q.NA, u: "moléculas", sci: true, pasos: ["n = " + m + " / " + fmt(M, 2) + " = " + fmt(m / M, 4) + " mol", "N = n·N<sub>A</sub> = " + fmt(m / M, 4) + " · 6,022·10²³ = " + Q.sci(m / M * Q.NA)] }; },
    function () { var f = elige(["NaCl", "NaOH", "HCl", "KOH", "CaCl2"]), n = entre(1, 8, 1) / 4, V = entre(100, 500, 50), M = Q.masaMolar(f), m = n * M; return { q: "Se disuelven " + fmt(m, 2) + " g de " + Q.sub(f) + " hasta completar " + V + " mL de disolución. ¿Cuál es la <b>molaridad</b>?", r: n / (V / 1000), u: "mol/L", pasos: ["n = " + fmt(m, 2) + " / " + fmt(M, 2) + " = " + fmt(n, 4) + " mol", "M = n/V = " + fmt(n, 4) + " / " + fmt(V / 1000, 3) + " L = " + fmt(n / (V / 1000), 4) + " mol/L"] }; },
    function () { var n = entre(1, 6, 1) / 2, T = entre(0, 100, 25), V = Q.volumen(n, T + 273, 1); return { q: "¿Qué <b>volumen</b> (en litros) ocupan " + fmt(n, 1) + " mol de un gas ideal a 1 atm y " + T + " °C? (R = 0,082 atm·L/(mol·K), K = °C + 273)", r: V, u: "L", pasos: ["T = " + (T + 273) + " K", "V = nRT/P = " + fmt(n, 1) + " · 0,082 · " + (T + 273) + " / 1 = " + fmt(V, 3) + " L"] }; },
    function () { var f = elige(["CaCO3", "H2SO4", "Fe2O3", "Al2(SO4)3", "C6H12O6"]), L = Q.leer(f), els = Object.keys(L.elems), e = elige(els), M = Q.masaMolar(f), p = L.elems[e] * Q.masaAtomica(e) / M * 100; return { q: "¿Qué <b>porcentaje en masa</b> de " + e + " hay en " + Q.sub(f) + "?", r: p, u: "%", pasos: ["M = " + fmt(M, 2) + " g/mol", "% " + e + " = " + L.elems[e] + "·" + fmt(Q.masaAtomica(e), 2) + " / " + fmt(M, 2) + " · 100 = " + fmt(p, 2) + " %"] }; },
    function () { var M1 = elige([2, 4, 6, 10, 12]), M2 = elige([0.1, 0.2, 0.5, 1]), V2 = elige([250, 500, 1000]), V1 = M2 * V2 / M1; return { q: "¿Qué volumen (en mL) de una disolución " + M1 + " M hay que tomar para preparar " + V2 + " mL de disolución " + fmt(M2, 1) + " M?", r: V1, u: "mL", pasos: ["M₁V₁ = M₂V₂ → V₁ = M₂V₂/M₁", "V₁ = " + fmt(M2, 1) + " · " + V2 + " / " + M1 + " = " + fmt(V1, 2) + " mL"] }; },
    function () { var P = entre(1, 4, 1) / 2, V = entre(2, 20, 2), T = entre(0, 100, 25), n = P * V / (Q.R * (T + 273)); return { q: "Un gas ocupa " + V + " L a " + fmt(P, 1) + " atm y " + T + " °C. ¿Cuántos <b>moles</b> son? (R = 0,082; K = °C + 273)", r: n, u: "mol", pasos: ["T = " + (T + 273) + " K", "n = PV/RT = " + fmt(P, 1) + " · " + V + " / (0,082 · " + (T + 273) + ") = " + fmt(n, 4) + " mol"] }; }
  ];
  B.w.q4_practica = function (host) {
    var cuerpo = B.caja(host, "Entrenamiento", "Generador de problemas: mol, gases y disoluciones");
    cuerpo.innerHTML = '<div class="q4-prob"></div><div data-ctl></div><div class="lectura anch"></div><div class="q4-sol" hidden></div><p class="w-pie">Cada pulsación crea un problema nuevo con otros números. Escribe tu resultado (con coma o punto decimal) y pulsa «Comprobar»; la tolerancia es del 1 %.</p>';
    var st = { p: null, racha: 0, aciertos: 0, total: 0 }, enun = cuerpo.querySelector(".q4-prob"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".q4-sol");
    var inp = Q.campo(ctl, "Tu respuesta", "", 150);
    function nuevo() {
      var prev = st.p, i; do { i = Math.floor(Math.random() * GEN.length); } while (prev && prev.i === i && GEN.length > 1);
      st.p = GEN[i](); st.p.i = i; enun.innerHTML = "<p class='q4-enun'>" + st.p.q + "</p>"; inp.value = ""; sol.hidden = true; sol.innerHTML = ""; lectura.innerHTML = marcador();
    }
    function marcador() { return fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.aciertos + " de " + st.total, "pen"); }
    function comprobar() {
      var v = Q.num(inp.value); if (isNaN(v)) { lectura.innerHTML = marcador() + fil("No entiendo tu respuesta", "escribe un número (puedes usar 1,2*10^24)", "red ancho"); return; }
      var r = st.p.r, ok = Math.abs(v - r) <= 0.01 * Math.abs(r) + 1e-12; st.total++; if (ok) { st.aciertos++; st.racha++; } else st.racha = 0;
      lectura.innerHTML = marcador() + fil(ok ? "✓ Correcto" : "✗ Todavía no", ok ? "¡Bien! " + fmt(r, 4) + " " + st.p.u : "Revisa el planteamiento; el resultado correcto está en «Ver solución».", ok ? "ok ancho" : "red ancho");
      if (ok) verSol();
    }
    function verSol() { sol.hidden = false; sol.innerHTML = "<ol class='steps'>" + st.p.pasos.map(function (x) { return "<li class='step'><div class='math-line'>" + x + "</div></li>"; }).join("") + "</ol><div class='result-box'><span class='result-label'>Resultado</span>" + (st.p.sci ? Q.sci(st.p.r) : fmt(st.p.r, 4)) + " " + st.p.u + "</div>"; }
    var acc = document.createElement("div"); acc.className = "ctl"; cuerpo.querySelector("[data-ctl]").parentNode.insertBefore(acc, lectura);
    U.boton(acc, "Comprobar", comprobar, "btn-comprobar"); U.boton(acc, "Ver solución", verSol); U.boton(acc, "Otro problema", nuevo);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); comprobar(); } });
    nuevo();
  };
})(window);
