/* ============================================================
   Bachi para Firu · Química II, tema 2 («Estructura de la materia»)
   Tres laboratorios nuevos (el resto se reutiliza de lab_atomo.js: q1_bohr, q1_cuanticos, q1_config):
     qq2_fotoel   efecto fotoeléctrico: Ec = hν − W frente a ν, con umbral, metal y longitud de onda
     qq2_broglie  dualidad onda-corpúsculo (λ = h/mv) e incertidumbre (Δx·Δp ≥ h/4π)
     qq2_llenar   «llénalo tú»: coloca los electrones en las cajas y comprueba Aufbau, Pauli y Hund
   Constantes (las mismas que usa el tema): h = 6,626·10⁻³⁴ J·s · c = 3,00·10⁸ m/s · e = 1,602·10⁻¹⁹ C · mₑ = 9,109·10⁻³¹ kg
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.quim, fil = U.lec;
  var K = { h: 6.626e-34, c: 3.00e8, e: 1.602e-19, me: 9.109e-31, mp: 1.673e-27 };
  Q.K2 = K;

  // ============================================================
  // QQ2_FOTOEL: efecto fotoeléctrico
  // ============================================================
  var METALES = { Cs: ["Cs", 2.1], Na: ["Na", 2.3], Ca: ["Ca", 2.9], Zn: ["Zn", 4.3], Cu: ["Cu", 4.7], Pt: ["Pt", 5.6] };
  B.w.qq2_fotoel = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Efecto fotoeléctrico: Ec = hν − W");
    cuerpo.innerHTML = '<div data-met class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: "Na", lam: 300, I: 50 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g;
    U.slider(ctl, { et: "Longitud de onda λ", min: 100, max: 800, step: 5, val: st.lam, on: function (v) { st.lam = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " nm · " + Q.region(v); } });
    U.slider(ctl, { et: "Intensidad de la luz", min: 10, max: 100, step: 10, val: st.I, on: function (v) { st.I = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 32, ymin: -6.5, ymax: 13, w: 600, h: 300, etx: "ν (·10¹⁴ Hz)", ety: "Ec (eV)", etiqueta: "Energía cinética frente a frecuencia" });
    function pinta() {
      var W = METALES[st.m][1], nu = K.c / (st.lam * 1e-9), Ef = K.h * nu / K.e, Ec = Ef - W, nu0 = W * K.e / K.h, lam0 = K.c / nu0 * 1e9, x = nu / 1e14, emite = Ec > 0;
      g.limpiar();
      g.horizontal(0, { clase: "c-faint" });
      var pts = [], k; for (k = 0; k <= 64; k++) { var xx = k * 0.5; pts.push([xx, K.h * xx * 1e14 / K.e - W]); }
      g.polilinea(pts.filter(function (p) { return p[0] <= nu0 / 1e14 + 0.01; }), { clase: "c-faint" }).setAttribute("stroke-dasharray", "5 4");
      g.polilinea(pts.filter(function (p) { return p[0] >= nu0 / 1e14 - 0.01; }).map(function (p, i, a) { return i === 0 ? [nu0 / 1e14, 0] : p; }), { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.punto(nu0 / 1e14, 0, { clase: "c-red", r: 5 });
      g.texto(nu0 / 1e14, 0, "ν₀ = " + fmt(nu0 / 1e14, 2), { dx: 6, dy: -9, clase: "red" });
      g.texto(0.4, -W, "−W = −" + fmt(W, 1) + " eV", { dx: 4, dy: -8, clase: "faint" });
      g.segmento(x, -6.5, x, Math.max(Ec, -6), { clase: emite ? "c-ok" : "c-red", dash: "3 4" });
      g.punto(x, Math.max(Ec, -6), { clase: emite ? "c-ok" : "c-red", r: 6 });
      g.texto(x, Math.max(Ec, -6), emite ? "Ec = " + fmt(Ec, 2) + " eV" : "no hay emisión", { dx: x > 22 ? -10 : 10, dy: x > 22 ? 16 : -10, ancla: x > 22 ? "end" : "start", clase: emite ? "ok" : "red" });
      var v = emite ? Math.sqrt(2 * Ec * K.e / K.me) : 0, corr = emite ? st.I : 0;
      lectura.innerHTML =
        fil("Fotón: E = hc/λ = hν", fmt(Ef, 2) + " eV = " + U.cient(Ef * K.e, 3) + " J  (ν = " + U.cient(nu, 3) + " Hz)", "pen ancho") +
        fil("Trabajo de extracción W (" + st.m + ")", fmt(W, 1) + " eV = " + U.cient(W * K.e, 3) + " J", "") +
        fil("Umbral: ν₀ = W/h · λ₀ = hc/W", U.cient(nu0, 3) + " Hz · " + fmt(lam0, 0) + " nm (" + Q.region(lam0) + ")", "red ancho") +
        (emite ? fil("Ec máxima = hν − W", fmt(Ec, 2) + " eV = " + U.cient(Ec * K.e, 3) + " J", "ok") + fil("Velocidad máxima", U.cient(v, 3) + " m/s", "ok") + fil("Potencial de frenado V₀ = Ec/e", fmt(Ec, 2) + " V", "") + fil("Fotoelectrones por segundo (∝ intensidad)", fmt(corr, 0) + " (unidades relativas)", "")
          : fil("Resultado", "E del fotón (" + fmt(Ef, 2) + " eV) < W (" + fmt(W, 1) + " eV): NO se arranca ningún electrón, por intensa que sea la luz", "red ancho"));
      pie.innerHTML = "Un fotón entrega <b>toda</b> su energía hν a <b>un</b> electrón. Si hν &lt; W no sale ninguno (da igual la intensidad); si hν &gt; W, el sobrante es energía cinética. La recta Ec = hν − W tiene <b>pendiente h</b> y corta el eje de frecuencias en el <b>umbral ν₀</b>. Más intensidad = más fotones = más electrones, pero <b>la misma Ec</b>.";
    }
    U.fichas(cuerpo.querySelector("[data-met]"), Object.keys(METALES).map(function (k) { return { k: k, t: k + " (W = " + fmt(METALES[k][1], 1) + " eV)" }; }), st.m, function (k) { st.m = k; pinta(); });
    pinta();
  };

  // ============================================================
  // QQ2_BROGLIE: dualidad onda-corpúsculo e incertidumbre
  // ============================================================
  var OBJ = {
    e: { t: "Electrón", m: K.me, v0: 6.0 }, p: { t: "Protón", m: K.mp, v0: 5.0 },
    b: { t: "Pelota de tenis (57 g)", m: 0.057, v0: 1.7 }, h: { t: "Persona (70 kg)", m: 70, v0: 0.2 }
  };
  B.w.qq2_broglie = function (host) {
    var cuerpo = B.caja(host, "Simulador", "De Broglie e incertidumbre: ¿cuándo importa lo ondulatorio?");
    cuerpo.innerHTML = '<div data-obj class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { o: "e", lv: 6.0, dv: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g, slv;
    slv = U.slider(ctl, { et: "Velocidad v (escala logarítmica)", min: 0, max: 7.5, step: 0.05, val: st.lv, on: function (v) { st.lv = v; pinta(); }, fmt: function (v) { return U.cient(Math.pow(10, v), 2) + " m/s"; } });
    U.slider(ctl, { et: "Incertidumbre en v (Δv)", min: 0.1, max: 10, step: 0.1, val: st.dv, on: function (v) { st.dv = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " % de v"; } });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 7.5, ymin: -40, ymax: 0, w: 600, h: 300, etx: "log₁₀ v (m/s)", ety: "log₁₀ λ (m)", etiqueta: "Longitud de onda de De Broglie frente a velocidad" });
    function pinta() {
      var o = OBJ[st.o], v = Math.pow(10, st.lv), lam = K.h / (o.m * v), dx = K.h / (4 * Math.PI * o.m * v * st.dv / 100), ll = Math.log10(lam);
      g.limpiar();
      Object.keys(OBJ).forEach(function (k) {
        var m = OBJ[k].m, a = Math.log10(K.h / m), pts = [[0, a], [7.5, a - 7.5]];
        g.polilinea(pts, { clase: k === st.o ? "c-pen" : "c-faint" }).setAttribute("stroke-width", k === st.o ? 3 : 1.6);
        g.texto(0.15, a, OBJ[k].t.replace(/ \(.*/, ""), { dy: -7, clase: k === st.o ? "pen" : "faint" });
      });
      g.segmento(0, -10, 7.5, -10, { clase: "c-red", dash: "5 4" }); g.texto(0.15, -10, "tamaño de un átomo (10⁻¹⁰ m)", { dy: 15, clase: "red" });
      g.punto(st.lv, Math.max(-40, ll), { clase: "c-ok", r: 6 });
      var rel = lam / 1e-10;
      lectura.innerHTML =
        fil("Longitud de onda λ = h/(m·v)", U.cient(lam, 3) + " m", "pen ancho") +
        fil("λ frente a un átomo (10⁻¹⁰ m)", rel >= 0.1 ? "λ ≈ " + fmt(rel, 2) + " veces el átomo: efectos ondulatorios importantes" : "λ es " + U.cient(1 / rel, 2) + " veces menor que un átomo: no se nota", rel >= 0.1 ? "ok ancho" : "red ancho") +
        fil("Cantidad de movimiento p = m·v", U.cient(o.m * v, 3) + " kg·m/s", "") +
        fil("Δx mínima = h/(4π·m·Δv)", U.cient(dx, 3) + " m", "ancho") +
        fil("Δx frente a un átomo", dx >= 1e-10 ? "Δx ≈ " + fmt(dx / 1e-10, 1) + " veces el átomo: no se puede hablar de «órbita»" : "Δx es mucho menor que un átomo (" + U.cient(dx / 1e-10, 2) + " veces): posición bien definida", dx >= 1e-10 ? "red ancho" : "ok ancho");
      pie.innerHTML = "Cada recta es λ = h/(mv): <b>baja una década cuando v sube otra</b> y también cuando sube la masa. Solo el electrón y el protón rápidos alcanzan longitudes de onda del tamaño de un átomo (o de una red cristalina: por eso hay difracción de electrones). Una pelota o una persona tienen λ ~ 10⁻³⁴ m: nunca se nota. La incertidumbre Δx·Δp ≥ h/4π impide trazar órbitas con v y posición exactas en el átomo.";
    }
    U.fichas(cuerpo.querySelector("[data-obj]"), Object.keys(OBJ).map(function (k) { return { k: k, t: OBJ[k].t }; }), st.o, function (k) { st.o = k; st.lv = OBJ[k].v0; slv.set(st.lv); pinta(); });
    pinta();
  };

  // ============================================================
  // QQ2_LLENAR: coloca los electrones tú mismo
  // ============================================================
  var SUBS = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1]];          // orden de llenado (Aufbau)
  var LET = ["s", "p", "d", "f"], PRE = [{ k: "7,0", t: "N" }, { k: "8,0", t: "O" }, { k: "17,-1", t: "Cl⁻" }, { k: "26,0", t: "Fe" }, { k: "26,3", t: "Fe³⁺" }, { k: "24,0", t: "Cr" }, { k: "29,1", t: "Cu⁺" }];
  B.w.qq2_llenar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Llénalo tú: Aufbau, Pauli y Hund");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="q2-llenar"></div><div class="ctl q2-acc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { Z: 7, q: 0, caj: null }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), zona = cuerpo.querySelector(".q2-llenar"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), slZ, slQ;
    function nuevo() { st.caj = SUBS.map(function (s) { var a = []; for (var i = 0; i < 2 * s[1] + 1; i++) a.push(0); return a; }); }   // cada caja: 0 vacía · 1 ↑ · 2 ↓ · 3 ↑↓
    function reinicia() { nuevo(); dibuja(null, false); }
    slZ = U.slider(ctl, { et: "Número atómico <i>Z</i>", min: 1, max: 36, step: 1, val: st.Z, on: function (v) { st.Z = v; reinicia(); }, fmt: function (v) { return v + " · " + Q.EL[v - 1].s; } });
    slQ = U.slider(ctl, { et: "Carga del ion", min: -3, max: 4, step: 1, val: st.q, on: function (v) { st.q = v; reinicia(); }, fmt: function (v) { return v === 0 ? "neutro" : (v > 0 ? "+" : "−") + Math.abs(v); } });
    function nE() { return st.Z - st.q; }
    function colocados() { return st.caj.reduce(function (a, s) { return a + s.reduce(function (b, c) { return b + (c === 3 ? 2 : c ? 1 : 0); }, 0); }, 0); }
    function dibuja(msgs, ok) {
      var html = SUBS.map(function (s, i) {
        return '<span class="q1-sub"><b>' + s[0] + LET[s[1]] + "</b>" + st.caj[i].map(function (c, j) {
          return '<button type="button" class="q1-orb q2-caja" data-i="' + i + '" data-j="' + j + '" aria-label="orbital ' + s[0] + LET[s[1]] + (j + 1) + '">' + ["", "↑", "↓", "↑↓"][c] + "</button>";
        }).join("") + "</span>";
      }).join("");
      zona.innerHTML = html;
      var puestos = colocados(), N = nE();
      lectura.innerHTML = fil("Electrones colocados / que hay", puestos + " / " + N, puestos === N ? "ok" : "pen") + (msgs ? fil("Comprobación", msgs, ok ? "ok ancho" : "red ancho") : "");
    }
    zona.addEventListener("click", function (e) {
      var b = e.target.closest(".q2-caja"); if (!b) return;
      var i = +b.getAttribute("data-i"), j = +b.getAttribute("data-j");
      st.caj[i][j] = (st.caj[i][j] + 1) % 4; dibuja(null, false);
    });
    function resuelve() {
      var cfg = Q.configIon(st.Z, st.q), N = nE(), msgs = [], pila = [];
      var cont = st.caj.map(function (s) { return s.reduce(function (b, c) { return b + (c === 3 ? 2 : c ? 1 : 0); }, 0); });
      if (N < 1) return ["Carga imposible: no quedan electrones"];
      var tot = cont.reduce(function (a, b) { return a + b; }, 0);
      if (tot !== N) msgs.push("Hay que colocar exactamente " + N + " electrones y has puesto " + tot);
      // Hund dentro de cada subnivel
      SUBS.forEach(function (s, i) {
        var c = st.caj[i], k = cont[i]; if (!k) return;
        var vac = c.filter(function (x) { return x === 0; }).length, par = c.filter(function (x) { return x === 3; }).length;
        var sim = c.filter(function (x) { return x === 1; }).length, aba = c.filter(function (x) { return x === 2; }).length;
        if (par > 0 && vac > 0) msgs.push("Hund en " + s[0] + LET[s[1]] + ": hay un orbital con dos electrones y otro vacío; primero un electrón en cada orbital");
        else if (sim > 0 && aba > 0) msgs.push("Hund en " + s[0] + LET[s[1]] + ": los electrones desapareados deben tener el mismo espín (todos ↑)");
        else if (aba > 0 && par === 0 && vac === 0) { /* todo ↓ simple: válido por simetría, se acepta */ }
      });
      // Aufbau: cada subnivel debe tener el número de electrones de la configuración correcta
      cfg.forEach(function (s) {
        var i = SUBS.findIndex(function (x) { return x[0] === s.n && x[1] === s.l; });
        if (i >= 0 && cont[i] !== s.e && tot === N) pila.push(s.n + LET[s.l] + ": tienes " + cont[i] + " y debería haber " + s.e);
      });
      SUBS.forEach(function (s, i) { if (cont[i] && !cfg.some(function (x) { return x.n === s[0] && x.l === s[1]; }) && tot === N) pila.push(s[0] + LET[s[1]] + " no debería tener electrones"); });
      if (pila.length && !msgs.length) msgs.push("Aufbau (orden de energía 1s 2s 2p 3s 3p 4s 3d 4p, y las excepciones Cr y Cu): " + pila.join("; "));
      return msgs;
    }
    U.boton(cuerpo.querySelector(".q2-acc"), "Comprobar", function () {
      var m = resuelve();
      if (m.length) dibuja(m[0], false);
      else { var cfg = Q.configIon(st.Z, st.q); dibuja("✓ Correcto: " + Q.cfgTxt(cfg, false) + " · " + Q.desapareados(cfg) + " desapareado" + (Q.desapareados(cfg) === 1 ? "" : "s"), true); }
    }, "btn-comprobar");
    U.boton(cuerpo.querySelector(".q2-acc"), "Mostrar solución", function () {
      var cfg = Q.configIon(st.Z, st.q); nuevo();
      cfg.forEach(function (s) {
        var i = SUBS.findIndex(function (x) { return x[0] === s.n && x[1] === s.l; }); if (i < 0) return;
        var o = 2 * s.l + 1, j; for (j = 0; j < o; j++) st.caj[i][j] = j < s.e ? 1 : 0;
        for (j = 0; j < o && s.e > o + j; j++) st.caj[i][j] = 3;
      });
      dibuja("Solución: " + Q.cfgTxt(cfg, false) + " · " + Q.desapareados(cfg) + " desapareado" + (Q.desapareados(cfg) === 1 ? "" : "s"), true);
    });
    U.boton(cuerpo.querySelector(".q2-acc"), "Vaciar", reinicia);
    pie.innerHTML = "Pulsa una caja para recorrer <b>vacía → ↑ → ↓ → ↑↓</b>. <b>Aufbau</b>: llena de menor a mayor energía (1s 2s 2p 3s 3p 4s 3d 4p); <b>Pauli</b>: como máximo dos electrones por orbital, con espines opuestos; <b>Hund</b>: en orbitales de igual energía, uno en cada uno y con el mismo espín antes de emparejar. Con un ion, los electrones totales son Z − carga.";
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE, "7,0", function (k) {
      var p = k.split(","); st.Z = +p[0]; st.q = +p[1]; slZ.set(st.Z); slQ.set(st.q); reinicia();
    });
    reinicia();
  };

  var s = document.createElement("style"); s.textContent =
    ".q2-llenar{display:flex;flex-wrap:wrap;gap:10px 14px;margin:10px 0}.q2-caja{cursor:pointer;background:var(--sheet);padding:0 4px;min-width:30px;height:30px;font-size:17px}" +
    ".q2-caja:hover{border-color:var(--pen)}.q2-acc{margin:6px 0}@media(max-width:560px){.q2-llenar{gap:8px 8px}.q2-caja{min-width:26px}}";
  document.head.appendChild(s);
})(window);
