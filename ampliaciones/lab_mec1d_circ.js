/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 9: movimiento circular II)
   f9_engranajes · f9_aplic · f9_proyeccion · f9_coincidencia · f9_leergraf
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, M = B.lab.mec1, C = M.circ, lec = M.lec, f2 = M.f, ci = C.ci;
  var TAU = 2 * Math.PI, R = Math.PI / 180;

  // Contorno de una rueda dentada con N dientes y radio primitivo r, girada th
  function dientes(N, r, th, d) {
    var pts = [], k, step = TAU / N, rin = r - d, rout = r + d;
    for (k = 0; k < N; k++) {
      var a = th + k * step;
      pts.push([rin * Math.cos(a), rin * Math.sin(a)], [rout * Math.cos(a + 0.18 * step), rout * Math.sin(a + 0.18 * step)], [rout * Math.cos(a + 0.5 * step), rout * Math.sin(a + 0.5 * step)], [rin * Math.cos(a + 0.68 * step), rin * Math.sin(a + 0.68 * step)]);
    }
    return pts;
  }
  function trasl(pts, cx, cy) { return pts.map(function (p) { return [p[0] + cx, p[1] + cy]; }); }

  // ============================================================
  // F9_ENGRANAJES: engranajes, poleas con correa y cambio de marchas de una bici
  // ============================================================
  B.w.f9_engranajes = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Engranajes, poleas y bicicleta: ¿quién gira más deprisa?");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "eng", rpm: 60, N1: 20, N2: 30, r1: 0.8, r2: 1.4, plato: 44, pinon: 16, cad: 70, th: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -4, xmax: 4, ymin: -2, ymax: 2, w: 620, h: 300, limpio: true, etiqueta: "Transmisión de movimiento circular" });
    function slid(k, et, mn, mx, stp, fm) { sl[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: fm || function (v) { return f2(v, 0); } }); }
    slid("rpm", "Rueda motriz (rpm)", 10, 300, 5); slid("N1", "Dientes de la rueda 1", 8, 40, 1); slid("N2", "Dientes de la rueda 2", 8, 40, 1);
    slid("r1", "Radio de la polea 1 (m)", 0.4, 1.6, 0.1, function (v) { return f2(v, 1); }); slid("r2", "Radio de la polea 2 (m)", 0.4, 1.6, 0.1, function (v) { return f2(v, 1); });
    slid("plato", "Dientes del plato", 28, 56, 1); slid("pinon", "Dientes del piñón", 11, 32, 1); slid("cad", "Cadencia de pedaleo (rpm)", 30, 120, 5);
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.th = 0; pinta(); return; } if (dt) { st.th += dt * 3; pinta(true); } }, { auto: true });
    function dib(pts, cx, cy, clase) { var p = g.poligono(trasl(pts, cx, cy), { clase: clase || "z-pen", borde: "var(--pen)", grosor: 1.5 }); return p; }
    function pinta(solo) {
      var m = st.modo, w1 = st.rpm * TAU / 60, w2, v, filas = [], th1, th2;
      ["N1", "N2"].forEach(function (k) { sl[k].el.style.display = m === "eng" ? "" : "none"; }); ["r1", "r2"].forEach(function (k) { sl[k].el.style.display = m === "cor" ? "" : "none"; }); ["plato", "pinon", "cad"].forEach(function (k) { sl[k].el.style.display = m === "bici" ? "" : "none"; }); sl.rpm.el.style.display = m === "bici" ? "none" : "";
      g.limpiar();
      var vis = Math.min(1, 40 / Math.max(st.rpm, 40));   // velocidad visual acotada
      if (m === "eng") {
        var r1 = st.N1 * 0.055, r2 = st.N2 * 0.055, d = r1 + r2, x1 = -d / 2, x2 = d / 2; w2 = w1 * st.N1 / st.N2; v = w1 * r1;
        th1 = st.th * vis; th2 = -th1 * st.N1 / st.N2 + Math.PI / st.N2;
        dib(dientes(st.N1, r1, th1, 0.07), x1, 0, "z-pen"); dib(dientes(st.N2, r2, th2, 0.07), x2, 0, "z-red");
        g.polilinea([[x1, 0], [x1 + r1 * 0.9 * Math.cos(th1), r1 * 0.9 * Math.sin(th1)]], { clase: "c-ink" }).setAttribute("stroke-width", 3); g.polilinea([[x2, 0], [x2 + r2 * 0.9 * Math.cos(th2), r2 * 0.9 * Math.sin(th2)]], { clase: "c-ink" }).setAttribute("stroke-width", 3);
        g.punto(x1, 0, { r: 4, clase: "c-ink" }); g.punto(x2, 0, { r: 4, clase: "c-ink" });
        filas = [lec("Rueda 1 (motriz)", st.N1 + " dientes · " + f2(st.rpm, 0) + " rpm · " + f2(w1, 2) + " rad/s", "pen"), lec("Rueda 2", st.N2 + " dientes · " + f2(w2 * 60 / TAU, 1) + " rpm · " + f2(w2, 2) + " rad/s (sentido contrario)", "red"), lec("Relación de transmisión", "ω₂/ω₁ = N₁/N₂ = " + f2(st.N1 / st.N2, 3), "ok"), lec("Velocidad lineal en el contacto", "v = ω₁r₁ = ω₂r₂ (igual para las dos)", "")];
        pie.innerHTML = "En el punto de contacto de dos <b>engranajes</b> los dientes se empujan, así que las dos ruedas tienen la <b>misma velocidad lineal</b> en el borde: ω₁r₁ = ω₂r₂. Como el radio es proporcional al número de dientes, <b>ω₁·N₁ = ω₂·N₂</b>: la rueda con más dientes gira más despacio y en <b>sentido contrario</b>.";
      } else if (m === "cor") {
        var a = st.r1, b = st.r2, dd = 3.2, xa = -dd / 2, xb = dd / 2; w2 = w1 * a / b; v = w1 * a; th1 = st.th * vis; th2 = th1 * a / b;
        var sf = (a - b) / dd, cf = Math.sqrt(1 - sf * sf);
        g.circulo = null; g.arco(xa, 0, a, 0, 360, { clase: "c-pen" }).setAttribute("stroke-width", 3); g.arco(xb, 0, b, 0, 360, { clase: "c-red" }).setAttribute("stroke-width", 3);
        g.segmento(xa + a * sf, a * cf, xb + b * sf, b * cf, { clase: "c-ink" }).setAttribute("stroke-width", 2.5); g.segmento(xa + a * sf, -a * cf, xb + b * sf, -b * cf, { clase: "c-ink" }).setAttribute("stroke-width", 2.5);
        g.polilinea([[xa, 0], [xa + a * 0.9 * Math.cos(th1), a * 0.9 * Math.sin(th1)]], { clase: "c-pen" }).setAttribute("stroke-width", 3); g.polilinea([[xb, 0], [xb + b * 0.9 * Math.cos(th2), b * 0.9 * Math.sin(th2)]], { clase: "c-red" }).setAttribute("stroke-width", 3);
        filas = [lec("Polea 1 (motriz)", "r₁ = " + f2(a, 1) + " m · " + f2(st.rpm, 0) + " rpm · " + f2(w1, 2) + " rad/s", "pen"), lec("Polea 2", "r₂ = " + f2(b, 1) + " m · " + f2(w2 * 60 / TAU, 1) + " rpm · " + f2(w2, 2) + " rad/s (mismo sentido)", "red"), lec("Relación", "ω₂/ω₁ = r₁/r₂ = " + f2(a / b, 3), "ok"), lec("Velocidad de la correa", "v = ω₁r₁ = ω₂r₂ = " + f2(v, 3) + " m/s", "")];
        pie.innerHTML = "Con una <b>correa</b> (o cadena) las dos poleas giran en el <b>mismo sentido</b> y los puntos del borde tienen la <b>misma velocidad lineal</b> que la correa: ω₁r₁ = ω₂r₂. La polea pequeña gira más deprisa.";
      } else {
        var Rp = st.plato * 0.045, Rs = st.pinon * 0.045, Rw = 1.5, dd2 = 2.0, xp = -2.4, xs = xp + dd2 + 0.6; w1 = st.cad * TAU / 60; w2 = w1 * st.plato / st.pinon; v = w2 * 0.34;
        th1 = st.th * vis * 0.6; th2 = th1 * st.plato / st.pinon; var sf2 = (Rp - Rs) / (xs - xp), cf2 = Math.sqrt(1 - sf2 * sf2);
        dib(dientes(st.plato, Rp, th1, 0.06), xp, 0, "z-pen"); dib(dientes(st.pinon, Rs, th2, 0.06), xs, 0, "z-red");
        g.segmento(xp + Rp * sf2, Rp * cf2, xs + Rs * sf2, Rs * cf2, { clase: "c-ink" }); g.segmento(xp + Rp * sf2, -Rp * cf2, xs + Rs * sf2, -Rs * cf2, { clase: "c-ink" });
        g.arco(xs, 0, Rw, 0, 360, { clase: "c-ok" }).setAttribute("stroke-width", 3); for (var q = 0; q < 6; q++) g.polilinea([[xs, 0], [xs + Rw * Math.cos(th2 + q * Math.PI / 3), Rw * Math.sin(th2 + q * Math.PI / 3)]], { clase: "c-ok" });
        g.polilinea([[xp, 0], [xp + Rp * 0.9 * Math.cos(th1), Rp * 0.9 * Math.sin(th1)]], { clase: "c-ink" }).setAttribute("stroke-width", 4);
        filas = [lec("Plato · piñón", st.plato + " dientes · " + st.pinon + " dientes → relación " + f2(st.plato / st.pinon, 2), "pen"), lec("Pedales (plato)", f2(st.cad, 0) + " rpm = " + f2(w1, 2) + " rad/s", "pen"), lec("Rueda trasera (con el piñón)", f2(w2 * 60 / TAU, 1) + " rpm = " + f2(w2, 2) + " rad/s", "red"), lec("Velocidad de la bici (r = 0,34 m)", f2(v, 2) + " m/s = " + f2(v * 3.6, 1) + " km/h", "ok"), lec("Avance por pedalada", f2(TAU * 0.34 * st.plato / st.pinon, 2) + " m", "")];
        pie.innerHTML = "La cadena obliga a que plato y piñón tengan la misma velocidad lineal en el borde: ω<sub>plato</sub>·r<sub>plato</sub> = ω<sub>piñón</sub>·r<sub>piñón</sub>, es decir, ω<sub>piñón</sub> = ω<sub>plato</sub>·(dientes plato / dientes piñón). La rueda trasera gira con el piñón y su velocidad lineal es v = ω·R<sub>rueda</sub>. Un plato grande y un piñón pequeño dan <b>marchas largas</b>: más km/h por pedalada, pero más esfuerzo.";
      }
      if (solo !== true) lectura.innerHTML = filas.join("");
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "eng", t: "Dos engranajes" }, { k: "cor", t: "Poleas con correa" }, { k: "bici", t: "Bicicleta (plato y piñón)" }], "eng", function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F9_APLIC: ejemplos reales con números
  // ============================================================
  var AP = [
    { t: "Rotación de la Tierra (ecuador)", r: 6.371e6, T: 86164, nota: "Un punto del ecuador da una vuelta en un día sidéreo (23 h 56 min)." },
    { t: "Traslación de la Tierra", r: 1.496e11, T: 3.15576e7, nota: "La Tierra recorre una órbita casi circular alrededor del Sol en 365,25 días." },
    { t: "La Luna alrededor de la Tierra", r: 3.844e8, T: 2.3606e6, nota: "27,32 días por vuelta (mes sidéreo)." },
    { t: "Rueda de bicicleta a 20 km/h", r: 0.34, v: 20 / 3.6, nota: "El borde de la rueda tiene una a<sub>c</sub> de unos 9 g (pero se compensa: sólo sientes la de tu cuerpo)." },
    { t: "Disco compacto a 500 rpm", r: 0.06, rpm: 500, nota: "Un CD gira entre 200 y 500 rpm según la zona que lee el láser." },
    { t: "Centrifugado de una lavadora", r: 0.25, rpm: 1200, nota: "A 1 200 rpm la aceleración en el tambor es de 400 g: el agua sale despedida por los agujeros." },
    { t: "Noria (London Eye)", r: 60, T: 1800, nota: "Una vuelta en 30 minutos: tan lenta que casi no se nota la aceleración." },
    { t: "Coche en una curva a 72 km/h", r: 100, v: 20, nota: "La aceleración centrípeta (4 m/s²) la proporciona el rozamiento de las ruedas con el suelo (Tema 10)." }
  ];
  B.w.f9_aplic = function (host) {
    var cuerpo = B.caja(host, "Aplicaciones", "Movimientos circulares reales: calcula ω, v y a<sub>c</sub>");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0 }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P = AP[st.i], r = P.r, w, T, dato;
      if (P.T) { T = P.T; w = TAU / T; dato = "T = " + ci(T, 4) + " s"; } else if (P.rpm) { w = P.rpm * TAU / 60; T = TAU / w; dato = P.rpm + " rpm"; } else { w = P.v / r; T = TAU / w; dato = "v = " + f2(P.v, 2) + " m/s"; }
      var v = w * r, ac = w * w * r;
      lectura.innerHTML = lec("Datos", "r = " + ci(r, 4) + " m · " + dato, "") + lec("ω = 2π/T", ci(w, 4) + " rad/s", "pen") + lec("Periodo · frecuencia", ci(T, 4) + " s · " + ci(1 / T, 4) + " Hz (" + ci(60 / T, 4) + " rpm)", "") +
        lec("v = ω·r", ci(v, 4) + " m/s = " + ci(v * 3.6, 4) + " km/h", "ok") + lec("a<sub>c</sub> = ω²·r = v²/r", ci(ac, 4) + " m/s²", "red") + lec("En múltiplos de g (9,8 m/s²)", f2(ac / 9.8, 4) + " g", "");
      pie.innerHTML = P.nota;
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), AP.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // F9_PROYECCION: el MCU y el MAS (adelanto del tema 13)
  // ============================================================
  B.w.f9_proyeccion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La sombra de un movimiento circular es un movimiento oscilatorio");
    cuerpo.innerHTML = '<div class="f9-dos"><div class="f9-disco"></div><div class="f9-graf"></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 10, st = { A: 1.5, w: 1.5, ph: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = C.disco(cuerpo.querySelector(".f9-disco"), 2.2, 380, 340), gx = new B.Plot(cuerpo.querySelector(".f9-graf"), { xmin: 0, xmax: TM, ymin: -2, ymax: 2, w: 420, h: 340, etx: "t (s)", ety: "x (m)", etiqueta: "Posición de la sombra frente al tiempo" });
    U.slider(ctl, { et: "Radio A (m)", min: 0.5, max: 2, step: 0.1, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    U.slider(ctl, { et: "ω (rad/s)", min: 0.5, max: 4, step: 0.25, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    U.slider(ctl, { et: "Fase inicial φ (°)", min: 0, max: 360, step: 15, val: 0, on: function (v) { st.ph = v * R; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; stt.set(0); pinta(); return; } if (dt) { st.t += dt; if (st.t >= TM) st.t -= TM; stt.set(st.t); pinta(); } }, { auto: false });
    function pinta() {
      var A = st.A, w = st.w, t = st.t, th = w * t + st.ph, x = A * Math.cos(th), y = A * Math.sin(th);
      g.limpiar(); C.ejes(g, 2.1); C.circ(g, A, "c-ink"); g.segmento(0, 0, x, y, { clase: "c-faint" }); g.segmento(x, y, x, 0, { clase: "c-red", dash: "4 4" }); g.punto(x, y, { r: 8, clase: "c-pen" }); g.punto(x, 0, { r: 7, clase: "c-red" });
      gx.limpiar(); gx.curva(function (s) { return A * Math.cos(w * s + st.ph); }, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3); gx.segmento(t, -2, t, x, { clase: "c-faint", dash: "3 4" }); gx.punto(t, x, { r: 6, clase: "c-red" });
      lectura.innerHTML = lec("Posición de la sombra x = A·cos(ωt + φ)", f2(x, 3) + " m", "red") + lec("Velocidad de la sombra v = −Aω·sen(ωt + φ)", f2(-A * w * Math.sin(th), 3) + " m/s", "ok") + lec("Aceleración a = −ω²·x", f2(-w * w * x, 3) + " m/s²", "pen") + lec("Periodo T = 2π/ω", f2(TAU / w, 3) + " s", "") + lec("Elongación máxima · velocidad máxima", "A = " + f2(A, 2) + " m · Aω = " + f2(A * w, 2) + " m/s", "ancho");
      pie.innerHTML = "La proyección del punto que gira (MCU) sobre un diámetro es un movimiento de vaivén: un <b>movimiento armónico simple</b> (Tema 13). Fíjate en que la aceleración de la sombra es siempre <b>proporcional a −x</b> (a = −ω²x): es la componente de la aceleración centrípeta sobre el eje.";
    }
    pinta();
  };

  // ============================================================
  // F9_COINCIDENCIA: ¿cuándo coinciden dos móviles en una pista circular?
  // ============================================================
  var PC = [
    { t: "Manecillas del reloj", TA: 60, TB: 720, u: "min", mismo: true, nota: "El minutero (T = 60 min) alcanza al horario (T = 720 min) cada 65,45 min = 12/11 h: 11 veces en 12 horas." },
    { t: "Dos corredores (mismo sentido)", TA: 40, TB: 50, u: "s", mismo: true, nota: "El más rápido da una vuelta más que el otro cada 200 s." },
    { t: "Dos corredores (sentidos opuestos)", TA: 40, TB: 50, u: "s", mismo: false, nota: "En sentidos opuestos se encuentran más a menudo: las velocidades angulares se suman." },
    { t: "Tierra y Marte (alineación)", TA: 365.25, TB: 687, u: "días", mismo: true, nota: "La Tierra adelanta a Marte cada 780 días ≈ 2,14 años (periodo sinódico): cada ventana de lanzamiento a Marte." }
  ];
  B.w.f9_coincidencia = function (host) {
    var cuerpo = B.caja(host, "Problema", "Dos móviles en una pista circular: ¿cuándo se encuentran?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, TA: 60, TB: 720, mismo: true, t: 0, u: "min", escala: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 1, ymin: -1, ymax: 1, w: 460, h: 340, limpio: true, etiqueta: "Pista circular" }); g.rangoIso(0, 0, 1.6);
    sl.TA = U.slider(ctl, { et: "Periodo de A", min: 10, max: 800, step: 5, val: st.TA, on: function (v) { st.TA = v; st.t = 0; pinta(); }, fmt: function (v) { return f2(v, 0) + " " + st.u; } });
    sl.TB = U.slider(ctl, { et: "Periodo de B", min: 10, max: 800, step: 5, val: st.TB, on: function (v) { st.TB = v; st.t = 0; pinta(); }, fmt: function (v) { return f2(v, 0) + " " + st.u; } });
    var bs = U.boton(ctl, "Mismo sentido", function () { st.mismo = !st.mismo; st.t = 0; pinta(); });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; pinta(); return; } if (dt) { st.t += dt * Math.min(st.TA, st.TB) / 6; pinta(); } }, { auto: false });
    function pinta() {
      var TA = st.TA, TB = st.TB, wA = TAU / TA, wB = (st.mismo ? 1 : -1) * TAU / TB, t = st.t, dif = Math.abs(wA - wB), te = TAU / dif, thA = wA * t, thB = wB * t;
      bs.textContent = st.mismo ? "Mismo sentido (pulsa para invertir B)" : "Sentidos opuestos (pulsa para invertir B)";
      g.limpiar(); C.circ(g, 1, "c-faint"); C.circ(g, 1.3, "c-faint"); g.segmento(0, 0, 1.45, 0, { clase: "c-faint", dash: "3 4" });
      g.segmento(0, 0, Math.cos(thA), Math.sin(thA), { clase: "c-pen", dash: "3 4" }); g.punto(Math.cos(thA), Math.sin(thA), { r: 9, clase: "c-pen" }); g.texto(Math.cos(thA), Math.sin(thA), "A", { clase: "pen", dx: 10, dy: -8 });
      g.punto(1.3 * Math.cos(thB), 1.3 * Math.sin(thB), { r: 9, clase: "c-red" }); g.texto(1.3 * Math.cos(thB), 1.3 * Math.sin(thB), "B", { clase: "red", dx: 10, dy: -8 });
      var k = Math.floor(t / te + 1e-9);
      lectura.innerHTML = lec("ω de A y de B", f2(wA, 4) + " y " + f2(wB, 4) + " rad/" + st.u, "") + lec("Se encuentran cada Δt = 2π/|ω<sub>A</sub> − ω<sub>B</sub>|", f2(te, 3) + " " + st.u + (st.u === "min" ? " = " + Math.floor(te / 60) + " h " + f2(te % 60, 2) + " min" : ""), "ok") +
        lec("Vueltas de A y de B en ese tiempo", f2(te / TA, 3) + " y " + f2(te / TB, 3), "") + lec("Instante actual", f2(t, 2) + " " + st.u + " · encuentros hasta ahora: " + k, "red") +
        lec("Fórmula", st.mismo ? "t = T<sub>A</sub>·T<sub>B</sub>/|T<sub>B</sub> − T<sub>A</sub>|  (mismo sentido)" : "t = T<sub>A</sub>·T<sub>B</sub>/(T<sub>A</sub> + T<sub>B</sub>)  (sentidos opuestos)", "ancho");
      pie.innerHTML = (PC[st.i] && PC[st.i].nota ? PC[st.i].nota + " " : "") + "Se encuentran cuando el <b>ángulo relativo</b> ha avanzado una vuelta completa: |ω<sub>A</sub> − ω<sub>B</sub>|·t = 2π (mismo sentido) o (ω<sub>A</sub> + ω<sub>B</sub>)·t = 2π (sentidos opuestos).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PC.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var P = PC[+k]; st.i = +k; st.TA = P.TA; st.TB = P.TB; st.mismo = P.mismo; st.u = P.u; st.t = 0; sl.TA.set(P.TA); sl.TB.set(P.TB); sl.TA.input.max = Math.max(800, P.TA, P.TB); sl.TB.input.max = Math.max(800, P.TA, P.TB); pinta(); });
    pinta();
  };

  // ============================================================
  // F9_LEERGRAF: leer gráficas ω–t
  // ============================================================
  var GW = [
    { k: "A", t: "Gráfica A", tmax: 6, rg: [0, 8], pts: [[0, 5], [6, 5]], preguntas: [
      { q: "¿Qué movimiento es?", op: ["MCU (ω constante)", "MCUA acelerado", "MCUA frenando", "Reposo"], ok: 0, por: "ω no cambia: α = 0, movimiento circular uniforme." },
      { q: "¿Qué ángulo recorre en 6 s?", op: ["30 rad", "5 rad", "11 rad", "60 rad"], ok: 0, por: "θ = ω·t = 5·6 = 30 rad (el área del rectángulo bajo la gráfica)." },
      { q: "¿Cuántas vueltas da en 6 s?", op: ["4,77", "30", "9,55", "2"], ok: 0, por: "30 rad / 2π = 4,77 vueltas." },
      { q: "¿Cuánto vale el periodo?", op: ["1,26 s", "5 s", "0,8 s", "2π s"], ok: 0, por: "T = 2π/ω = 6,283/5 = 1,26 s." } ] },
    { k: "B", t: "Gráfica B", tmax: 6, rg: [0, 14], pts: [[0, 0], [6, 12]], preguntas: [
      { q: "¿Cuánto vale la aceleración angular?", op: ["2 rad/s²", "12 rad/s²", "6 rad/s²", "0"], ok: 0, por: "α = Δω/Δt = 12/6 = 2 rad/s² (pendiente)." },
      { q: "¿Cuánto vale ω a los 3 s?", op: ["6 rad/s", "3 rad/s", "12 rad/s", "9 rad/s"], ok: 0, por: "ω = α·t = 2·3 = 6 rad/s." },
      { q: "¿Qué ángulo ha girado en los 6 s?", op: ["36 rad", "72 rad", "12 rad", "18 rad"], ok: 0, por: "Área del triángulo: ½·6·12 = 36 rad (o θ = ½αt² = ½·2·36)." } ] },
    { k: "C", t: "Gráfica C", tmax: 6, rg: [-1, 12], pts: [[0, 10], [5, 0], [6, 0]], preguntas: [
      { q: "¿Cuánto vale α entre 0 y 5 s?", op: ["−2 rad/s²", "2 rad/s²", "10 rad/s²", "−10 rad/s²"], ok: 0, por: "α = (0 − 10)/5 = −2 rad/s²: el disco frena." },
      { q: "¿En qué instante se detiene?", op: ["5 s", "10 s", "2 s", "no se detiene"], ok: 0, por: "ω = 0 en t = 5 s." },
      { q: "¿Qué ángulo recorre hasta pararse?", op: ["25 rad", "50 rad", "10 rad", "5 rad"], ok: 0, por: "Área del triángulo: ½·5·10 = 25 rad (≈ 3,98 vueltas)." } ] },
    { k: "D", t: "Gráfica D", tmax: 12, rg: [0, 10], pts: [[0, 0], [4, 8], [10, 8], [12, 0]], preguntas: [
      { q: "¿Qué ángulo total recorre en los 12 s?", op: ["72 rad", "96 rad", "48 rad", "8 rad"], ok: 0, por: "Áreas: ½·4·8 = 16, 6·8 = 48 y ½·2·8 = 8 → 72 rad." },
      { q: "¿Cuánto vale α en el último tramo (10 a 12 s)?", op: ["−4 rad/s²", "4 rad/s²", "−8 rad/s²", "0"], ok: 0, por: "α = (0 − 8)/2 = −4 rad/s²." },
      { q: "En el tramo horizontal (4 a 10 s) el movimiento es…", op: ["MCU", "MCUA acelerado", "MCUA frenando", "reposo"], ok: 0, por: "ω constante: MCU." } ] }
  ];
  B.w.f9_leergraf = function (host) { M.lector(host, "Entrenamiento", "Lee la gráfica velocidad angular–tiempo", GW, "t (s)", "ω (rad/s)"); };
})(window);
