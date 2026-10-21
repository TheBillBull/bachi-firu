/* ============================================================
   Bachi para Firu · FyQ I tema 4 (II): gases
   q4_gas (simulador con partículas) · q4_leyesgas (Boyle, Charles, Gay-Lussac y ley combinada) · q4_dalton
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;
  var NS = "http://www.w3.org/2000/svg";
  var reducido = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function svg(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  var MMHG = 760, KPA = 101.325;

  // ============================================================
  // GAS: partículas que chocan con las paredes y con el émbolo
  // ============================================================
  B.w.q4_gas = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Un gas ideal en un cilindro con émbolo");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-ctl></div><div class="w-plot q4-gas"></div><div class="q4-acc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "libre", n: 1, T: 300, V: 5, P: 2, pausa: !!reducido }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), acc = cuerpo.querySelector(".q4-acc");
    var sn = U.slider(ctl, { et: "Cantidad de gas <i>n</i>", min: 0.2, max: 3, step: 0.1, val: st.n, on: function (v) { st.n = v; ajusta(); }, fmt: function (v) { return fmt(v, 1) + " mol"; } });
    var sT = U.slider(ctl, { et: "Temperatura <i>T</i>", min: 100, max: 600, step: 10, val: st.T, on: function (v) { st.T = v; ajusta(); }, fmt: function (v) { return fmt(v, 0) + " K (" + fmt(v - 273.15, 0) + " °C)"; } });
    var sV = U.slider(ctl, { et: "Volumen <i>V</i>", min: 1, max: 10, step: 0.5, val: st.V, on: function (v) { st.V = v; ajusta(); }, fmt: function (v) { return fmt(v, 1) + " L"; } });
    var sP = U.slider(ctl, { et: "Presión exterior <i>P</i>", min: 0.5, max: 4, step: 0.1, val: st.P, on: function (v) { st.P = v; ajusta(); }, fmt: function (v) { return fmt(v, 1) + " atm"; } });
    var W = 300, HMAX = 220, X0 = 30, YB = 245;
    var lienzo = cuerpo.querySelector(".q4-gas"), fondo = svg("svg", { viewBox: "0 0 360 270", "class": "plot", role: "img", "aria-label": "Cilindro con partículas de gas y un émbolo móvil" }, lienzo);
    svg("rect", { x: X0 - 6, y: YB - HMAX - 8, width: W + 12, height: HMAX + 14, rx: 4, "class": "q4-cil" }, fondo);
    var gas = svg("g", {}, fondo), piston = svg("rect", { x: X0, y: 0, width: W, height: 10, rx: 3, "class": "q4-piston" }, fondo), vara = svg("rect", { x: X0 + W / 2 - 4, y: 0, width: 8, height: 30, "class": "q4-vara" }, fondo);
    var pesas = svg("g", {}, fondo), parts = [], H = 110;
    function altura() { return st.V / 10 * HMAX; }
    function ajusta() {
      var modo = st.modo, V = st.V;
      if (modo === "isobara") { V = Q.volumen(st.n, st.T, st.P); st.Vc = V; if (V > 10) V = 10; if (V < 1) V = 1; st.Vplot = V; } else { st.Vplot = V; }
      sV.el.style.display = modo === "libre" ? "" : "none"; sP.el.style.display = modo === "isobara" ? "" : "none";
      H = st.Vplot / 10 * HMAX;
      var N = Math.max(3, Math.round(st.n * 10));
      while (parts.length < N) parts.push({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * 6.283, c: svg("circle", { r: 5, "class": "q4-part" }, gas) });
      while (parts.length > N) { var q = parts.pop(); gas.removeChild(q.c); }
      parts.forEach(function (p) { if (p.y > H - 5) p.y = H - 5; });
      piston.setAttribute("y", YB - H - 10); vara.setAttribute("y", YB - H - 40);
      pesas.innerHTML = "";
      var nP = Math.min(6, Math.max(1, Math.round((modo === "isobara" ? st.P : Q.presion(st.n, st.T, st.Vplot)) * 1.5)));
      for (var i = 0; i < nP; i++) svg("rect", { x: X0 + W / 2 - 34 + (i % 3) * 24, y: YB - H - 54 - Math.floor(i / 3) * 12, width: 20, height: 10, rx: 2, "class": "q4-pesa" }, pesas);
      texto();
    }
    function texto() {
      var modo = st.modo, V = st.Vplot, P = modo === "isobara" ? st.P : Q.presion(st.n, st.T, V), Vv = modo === "isobara" ? Q.volumen(st.n, st.T, st.P) : V;
      var tope = modo === "isobara" && (Vv > 10.001 || Vv < 0.999);
      lectura.innerHTML = fil("Presión P = nRT/V", fmt(P, 3) + " atm", "pen") + fil("En otras unidades", fmt(P * KPA, 1) + " kPa · " + fmt(P * MMHG, 0) + " mmHg", "") + fil("Volumen V", fmt(Vv, 2) + " L" + (tope ? " (el émbolo llega al tope del dibujo)" : ""), tope ? "red ancho" : "ok") +
        fil("Temperatura T", fmt(st.T, 0) + " K = " + fmt(st.T - 273.15, 1) + " °C", "red") + fil("Cantidad n · partículas", fmt(st.n, 1) + " mol · " + Q.sci(st.n * Q.NA), "") +
        fil("Comprobación P·V / (n·T)", fmt(P * Vv / (st.n * st.T), 5) + " atm·L/(mol·K)  ≈ R = 0,082", "ancho");
      pie.innerHTML = modo === "libre" ? "Tú mandas sobre <b>n, T y V</b>; el gas responde con su <b>presión</b>: más moles o más temperatura → más choques y más fuertes → más P; más volumen → los choques se reparten en más pared → menos P. Las «pesas» del émbolo representan la presión." : "Aquí el émbolo es <b>libre</b> y la presión exterior es fija: si calientas, el gas se expande (V ∝ T, ley de Charles); si añades gas, el émbolo sube (V ∝ n, ley de Avogadro).";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "libre", t: "Elige n, T y V" }, { k: "isobara", t: "Presión constante (émbolo libre)" }], "libre", function (k) { st.modo = k; ajusta(); });
    U.boton(acc, st.pausa ? "▶ Reanudar el movimiento" : "⏸ Pausar el movimiento", function () { st.pausa = !st.pausa; this.textContent = st.pausa ? "▶ Reanudar el movimiento" : "⏸ Pausar el movimiento"; });
    var ultimo = null;
    function paso(t) {
      if (!cuerpo.isConnected) return;
      var dt = ultimo == null ? 0.016 : Math.min(0.05, (t - ultimo) / 1000); ultimo = t;
      var v = 85 * Math.sqrt(st.T / 300) * dt;
      parts.forEach(function (p) {
        if (!st.pausa) {
          p.x += Math.cos(p.a) * v; p.y += Math.sin(p.a) * v;
          if (p.x < 5) { p.x = 5; p.a = Math.PI - p.a; } if (p.x > W - 5) { p.x = W - 5; p.a = Math.PI - p.a; }
          if (p.y < 5) { p.y = 5; p.a = -p.a; } if (p.y > H - 5) { p.y = H - 5; p.a = -p.a; }
        }
        p.c.setAttribute("cx", X0 + p.x); p.c.setAttribute("cy", YB - p.y);
      });
      requestAnimationFrame(paso);
    }
    ajusta(); requestAnimationFrame(paso);
  };

  // ============================================================
  // LEYES: Boyle, Charles, Gay-Lussac y ley combinada
  // ============================================================
  B.w.q4_leyesgas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las leyes de los gases: Boyle, Charles, Gay-Lussac y la ley combinada");
    cuerpo.innerHTML = '<div data-ley class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="q4-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { ley: "boyle", n: 1, c: { boyle: 300, charles: 1, gay: 5 }, x: { boyle: 5, charles: 300, gay: 300 }, P1: "1", V1: "10", T1: "300", P2: "2", V2: "", T2: "300" };
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".q4-tabla"), plot = cuerpo.querySelector(".w-plot"), g;
    var CF = {
      boyle: { c: { et: "Temperatura (constante)", min: 150, max: 500, step: 10, fmt: function (v) { return fmt(v, 0) + " K"; } }, x: { et: "Volumen V", min: 1, max: 10, step: 0.25, fmt: function (v) { return fmt(v, 2) + " L"; } }, f: function (x, c, n) { return n * Q.R * c / x; } },
      charles: { c: { et: "Presión (constante)", min: 0.5, max: 4, step: 0.1, fmt: function (v) { return fmt(v, 1) + " atm"; } }, x: { et: "Temperatura T", min: 100, max: 500, step: 5, fmt: function (v) { return fmt(v, 0) + " K (" + fmt(v - 273.15, 0) + " °C)"; } }, f: function (x, c, n) { return n * Q.R * x / c; } },
      gay: { c: { et: "Volumen (constante)", min: 2, max: 10, step: 0.5, fmt: function (v) { return fmt(v, 1) + " L"; } }, x: { et: "Temperatura T", min: 100, max: 500, step: 5, fmt: function (v) { return fmt(v, 0) + " K (" + fmt(v - 273.15, 0) + " °C)"; } }, f: function (x, c, n) { return n * Q.R * x / c; } }
    };
    var sn = U.slider(ctl, { et: "Cantidad <i>n</i>", min: 0.2, max: 3, step: 0.1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " mol"; } });
    var sk = U.slider(ctl, { et: "Constante", min: 150, max: 500, step: 10, val: st.c.boyle, on: function (v) { st.c[st.ley] = v; pinta(); }, fmt: function (v) { return CF[st.ley] ? CF[st.ley].c.fmt(v) : fmt(v, 1); } });
    var sx = U.slider(ctl, { et: "Variable", min: 1, max: 10, step: 0.25, val: st.x.boyle, on: function (v) { st.x[st.ley] = v; pinta(); }, fmt: function (v) { return CF[st.ley] ? CF[st.ley].x.fmt(v) : fmt(v, 1); } });
    var comb = document.createElement("div"); comb.className = "q4-comb"; ctl.parentNode.appendChild(comb);
    var campos = {};
    ["P1", "V1", "T1", "P2", "V2", "T2"].forEach(function (k) { campos[k] = Q.campo(comb, k.charAt(0) + "<sub>" + k.charAt(1) + "</sub>", st[k], 80); campos[k].addEventListener("input", function () { st[k] = campos[k].value; pinta(); }); });
    function conf(sl, c, val) { sl.input.min = c.min; sl.input.max = c.max; sl.input.step = c.step; sl.el.querySelector(".sl-et").innerHTML = c.et; sl.set(val); }
    function combinada() {
      var CLV = ["P1", "V1", "T1", "P2", "V2", "T2"], v = {};
      CLV.forEach(function (k) { v[k] = Q.num(st[k]); });
      var vacios = CLV.filter(function (k) { return String(st[k]).trim() === ""; });
      tabla.innerHTML = "";
      if (vacios.length !== 1) { lectura.innerHTML = fil("Ley combinada  P₁V₁/T₁ = P₂V₂/T₂", "deja <b>una sola casilla vacía</b> (la incógnita) y rellena las otras cinco. La temperatura, en kelvin.", "ancho"); pie.innerHTML = ""; return; }
      var inc = vacios[0], otros = CLV.filter(function (k) { return k !== inc; });
      if (otros.some(function (k) { return isNaN(v[k]) || v[k] <= 0; })) { lectura.innerHTML = fil("Revisa los datos", "escribe números positivos (la temperatura en kelvin)", "red ancho"); return; }
      var r;
      if (inc === "P1") r = v.P2 * v.V2 * v.T1 / (v.T2 * v.V1); else if (inc === "V1") r = v.P2 * v.V2 * v.T1 / (v.T2 * v.P1); else if (inc === "T1") r = v.P1 * v.V1 * v.T2 / (v.P2 * v.V2);
      else if (inc === "P2") r = v.P1 * v.V1 * v.T2 / (v.T1 * v.V2); else if (inc === "V2") r = v.P1 * v.V1 * v.T2 / (v.T1 * v.P2); else r = v.P2 * v.V2 * v.T1 / (v.P1 * v.V1);
      var u = inc.charAt(0) === "P" ? " atm" : inc.charAt(0) === "V" ? " L" : " K  (" + fmt(r - 273.15, 1) + " °C)";
      lectura.innerHTML = fil("Incógnita " + inc.charAt(0) + "<sub>" + inc.charAt(1) + "</sub>", fmt(r, 4) + u, "ok");
      pie.innerHTML = "Si el número de moles no cambia, <b>P₁V₁/T₁ = P₂V₂/T₂</b>. Es la combinación de las tres leyes: con T constante sale Boyle; con P constante, Charles; con V constante, Gay-Lussac. Pasa siempre la temperatura a <b>kelvin</b> (K = °C + 273,15).";
    }
    function pinta() {
      var ley = st.ley, esComb = ley === "comb";
      comb.style.display = esComb ? "" : "none"; plot.style.display = esComb ? "none" : ""; [sn, sk, sx].forEach(function (s) { s.el.style.display = esComb ? "none" : ""; });
      if (esComb) { combinada(); return; }
      var C = CF[ley], n = st.n, c = st.c[ley], x = st.x[ley], R = Q.R;
      conf(sk, C.c, c); conf(sx, C.x, x);
      function f(t) { return C.f(t, c, n); }
      var y0 = f(x);
      g.limpiar();
      if (ley === "boyle") { g.rango(0, 10, 0, Math.max(f(1), 1) * 1.05); }
      else { g.rango(-300, 500, -0.04 * f(500), f(500) * 1.08); g.curva(f, { clase: "c-faint", dash: "5 5", x0: -273.15, x1: 0, n: 2 }); g.vertical(-273.15, { clase: "c-red", dash: "3 5" }); g.texto(-273.15, f(500) * 0.92, "cero absoluto", { dx: 6, clase: "red" }); }
      g.curva(f, { clase: "c-pen", x0: ley === "boyle" ? 0.4 : 0, x1: ley === "boyle" ? 10 : 500, n: ley === "boyle" ? 200 : 2 }).setAttribute("stroke-width", 3);
      g.segmento(x, 0, x, y0, { clase: "c-ok", dash: "3 4" }); g.punto(x, y0, { r: 6, clase: "c-red" });
      var pts = ley === "boyle" ? [1, 2, 4, 5, 8, 10] : [100, 200, 300, 400, 500], ejeY = ley === "charles" ? "V (L)" : "P (atm)", ejeX = ley === "boyle" ? "V (L)" : "T (K)";
      tabla.innerHTML = "<table class='fo-t q4-t'><thead><tr><th>" + ejeX + "</th><th>" + ejeY + "</th><th>" + (ley === "boyle" ? "P·V" : "cociente " + (ley === "charles" ? "V/T" : "P/T")) + "</th></tr></thead><tbody>" +
        pts.map(function (a) { var b = f(a); return "<tr><td>" + fmt(a, 0) + "</td><td>" + fmt(b, 3) + "</td><td>" + fmt(ley === "boyle" ? a * b : b / a, 5) + "</td></tr>"; }).join("") + "</tbody></table>";
      var cte = ley === "boyle" ? n * R * c : n * R / c;
      lectura.innerHTML = (ley === "boyle" ? fil("Ley de Boyle (T y n constantes)", "P·V = " + fmt(cte, 3) + " atm·L (constante)", "pen ancho") + fil("Punto elegido", "V = " + fmt(x, 2) + " L → P = " + fmt(y0, 3) + " atm", "red ancho") :
        ley === "charles" ? fil("Ley de Charles (P y n constantes)", "V/T = " + fmt(cte, 5) + " L/K (constante)", "pen ancho") + fil("Punto elegido", "T = " + fmt(x, 0) + " K → V = " + fmt(y0, 3) + " L", "red ancho") :
        fil("Ley de Gay-Lussac (V y n constantes)", "P/T = " + fmt(cte, 5) + " atm/K (constante)", "pen ancho") + fil("Punto elegido", "T = " + fmt(x, 0) + " K → P = " + fmt(y0, 3) + " atm", "red ancho")) +
        fil("Cómo es la gráfica", ley === "boyle" ? "hipérbola: al duplicar P, el volumen se reduce a la mitad" : "recta que pasa por el origen en kelvin; prolongada, llega a −273,15 °C (0 K)", "ancho");
      pie.innerHTML = ley === "boyle" ? "<b>Boyle:</b> a temperatura constante, P y V son inversamente proporcionales: P₁V₁ = P₂V₂." : ley === "charles" ? "<b>Charles:</b> a presión constante, el volumen es proporcional a la temperatura <b>absoluta</b>: V₁/T₁ = V₂/T₂. Prolongando la recta, el volumen se anularía en −273,15 °C: el cero absoluto." : "<b>Gay-Lussac:</b> a volumen constante, la presión es proporcional a la temperatura absoluta: P₁/T₁ = P₂/T₂.";
    }
    g = new B.Plot(plot, { xmin: 0, xmax: 10, ymin: 0, ymax: 6, w: 600, h: 300, etx: "", ety: "", etiqueta: "Gráfica de la ley de los gases" });
    U.fichas(cuerpo.querySelector("[data-ley]"), [{ k: "boyle", t: "Boyle (T constante)" }, { k: "charles", t: "Charles (P constante)" }, { k: "gay", t: "Gay-Lussac (V constante)" }, { k: "comb", t: "Ley combinada: calculadora" }], "boyle", function (k) { st.ley = k; pinta(); });
    pinta();
  };

  // ============================================================
  // DALTON: presiones parciales
  // ============================================================
  var VAPOR = { 15: 12.8, 20: 17.5, 25: 23.8, 30: 31.8, 35: 42.2 };       // mmHg
  B.w.q4_dalton = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mezclas de gases: la ley de Dalton");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-ctl></div><div class="q4-barras"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "mezcla", n1: 2, n2: 1, n3: 0.5, V: 10, T: 300, Pg: 740, Tc: 25 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), barras = cuerpo.querySelector(".q4-barras");
    var NM = ["N₂", "O₂", "Ar"], sl = {};
    ["n1", "n2", "n3"].forEach(function (k, i) { sl[k] = U.slider(ctl, { et: "Moles de " + NM[i], min: 0, max: 5, step: 0.1, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " mol"; } }); });
    sl.V = U.slider(ctl, { et: "Volumen del recipiente", min: 2, max: 30, step: 1, val: st.V, on: function (v) { st.V = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " L"; } });
    sl.T = U.slider(ctl, { et: "Temperatura", min: 250, max: 450, step: 5, val: st.T, on: function (v) { st.T = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " K"; } });
    sl.Pg = U.slider(ctl, { et: "Presión total del recipiente", min: 700, max: 780, step: 1, val: st.Pg, on: function (v) { st.Pg = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " mmHg"; } });
    sl.Tc = U.slider(ctl, { et: "Temperatura del agua", min: 15, max: 35, step: 5, val: st.Tc, on: function (v) { st.Tc = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " °C"; } });
    function pinta() {
      var m = st.modo;
      ["n1", "n2", "n3", "V", "T"].forEach(function (k) { sl[k].el.style.display = m === "mezcla" ? "" : "none"; }); ["Pg", "Tc"].forEach(function (k) { sl[k].el.style.display = m === "agua" ? "" : "none"; });
      if (m === "mezcla") {
        var ns = [st.n1, st.n2, st.n3], nt = ns[0] + ns[1] + ns[2];
        if (nt <= 0) { lectura.innerHTML = fil("Mezcla vacía", "añade moles de algún gas", "red ancho"); barras.innerHTML = ""; return; }
        var P = Q.presion(nt, st.T, st.V), x = ns.map(function (a) { return a / nt; }), pp = x.map(function (a) { return a * P; });
        barras.innerHTML = "<div class='q4-apilada' role='img' aria-label='presiones parciales'>" + pp.map(function (p, i) { return p > 0 ? "<span style='flex:" + p + ";background:" + Q.color(i) + "'>" + (p / P > 0.1 ? NM[i] + " " + fmt(p, 2) + " atm" : "") + "</span>" : ""; }).join("") + "</div>";
        lectura.innerHTML = fil("Presión total  P = n<sub>T</sub>RT/V", fmt(P, 3) + " atm", "pen") + fil("Moles totales", fmt(nt, 2) + " mol", "") + NM.map(function (s, i) { return fil("Gas " + s, "x = " + fmt(x[i], 3) + " · p = x·P = " + fmt(pp[i], 3) + " atm", i === 0 ? "ok ancho" : i === 1 ? "red ancho" : "ancho"); }).join("") +
          fil("Comprobación", "p₁ + p₂ + p₃ = " + fmt(pp[0] + pp[1] + pp[2], 3) + " atm = P total", "ancho");
        pie.innerHTML = "<b>Ley de Dalton:</b> la presión total es la suma de las presiones parciales, y cada una es la que ejercería ese gas si estuviera solo en el recipiente: <b>pᵢ = xᵢ·P = nᵢRT/V</b>, con la fracción molar xᵢ = nᵢ/n<sub>T</sub>. (El aire seco tiene x ≈ 0,78 de N₂, 0,21 de O₂ y 0,01 de Ar.)";
      } else {
        var Pv = VAPOR[st.Tc], Pseco = st.Pg - Pv, nseco = Q.moles(Pseco / MMHG, 0.5, st.Tc + 273.15);
        barras.innerHTML = "<div class='q4-apilada' role='img' aria-label='gas y vapor de agua'><span style='flex:" + Pseco + ";background:" + Q.color(0) + "'>gas seco " + fmt(Pseco, 1) + " mmHg</span><span style='flex:" + Pv + ";background:" + Q.color(1) + "'>vapor " + fmt(Pv, 1) + "</span></div>";
        lectura.innerHTML = fil("Presión total medida", fmt(st.Pg, 0) + " mmHg", "pen") + fil("Presión de vapor del agua a " + fmt(st.Tc, 0) + " °C", fmt(Pv, 1) + " mmHg", "red") + fil("Presión del gas seco  P = P<sub>T</sub> − p(H₂O)", fmt(Pseco, 1) + " mmHg = " + fmt(Pseco / MMHG, 4) + " atm", "ok ancho") +
          fil("Moles de gas en 0,5 L de recipiente", fmt(nseco, 5) + " mol (con PV = nRT a " + fmt(st.Tc + 273.15, 1) + " K)", "ancho");
        pie.innerHTML = "Un gas recogido <b>sobre agua</b> va mezclado con vapor de agua: la presión de la burbuja es la suma P<sub>T</sub> = p(gas) + p(H₂O). Para saber cuánto gas hay, hay que <b>restar la presión de vapor</b> del agua a esa temperatura antes de aplicar PV = nRT.";
      }
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "mezcla", t: "Mezcla de tres gases" }, { k: "agua", t: "Gas recogido sobre agua" }], "mezcla", function (k) { st.modo = k; pinta(); });
    pinta();
  };
})(window);
