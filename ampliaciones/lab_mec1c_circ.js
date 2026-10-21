/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 9: movimiento circular)
   f9_mcu · f9_unidades · f9_arco · f9_vectores · f9_mcua
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, M = B.lab.mec1, lec = M.lec, f2 = M.f;
  var TAU = 2 * Math.PI, R = Math.PI / 180;

  // Utilidades del movimiento circular (rad, s, m)
  var C = M.circ = {};
  C.omega = function (T) { return TAU / T; };
  C.deRpm = function (rpm) { return rpm * TAU / 60; };
  C.aRpm = function (w) { return w * 60 / TAU; };
  C.v = function (w, r) { return w * r; };
  C.ac = function (w, r) { return w * w * r; };
  C.grados = function (rad) { return rad / R; };
  function piT(deg) { return B.lab.trig && B.lab.trig.piTxt ? B.lab.trig.piTxt(Math.round(deg * 1000) / 1000) : f2(deg * R, 3) + " rad"; }
  C.piT = piT;
  function ci(x, d) { return U.cient(x, d == null ? 3 : d); }
  C.ci = ci;
  function disco(host, semi, w, h) { var g = new B.Plot(host, { xmin: -1, xmax: 1, ymin: -1, ymax: 1, w: w || 420, h: h || 360, limpio: true, etiqueta: "Movimiento circular" }); g.rangoIso(0, 0, semi); return g; }
  C.disco = disco;
  function circ(g, r, clase) { return g.arco(0, 0, r, 0, 360, { clase: clase || "c-faint" }); }
  C.circ = circ;
  function ejes(g, s) { g.segmento(-s, 0, s, 0, { clase: "c-faint", dash: "3 4" }); g.segmento(0, -s, 0, s, { clase: "c-faint", dash: "3 4" }); }
  C.ejes = ejes;

  // ============================================================
  // F9_MCU: el MCU con todas sus magnitudes
  // ============================================================
  B.w.f9_mcu = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Movimiento circular uniforme: ω, v, T, f y a<sub>c</sub> en una sola imagen");
    cuerpo.innerHTML = '<div class="f9-dos"><div class="f9-disco"></div><div class="f9-graf"></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 10, st = { r: 1, w: 2, th0: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = disco(cuerpo.querySelector(".f9-disco"), 2.6), gt = new B.Plot(cuerpo.querySelector(".f9-graf"), { xmin: 0, xmax: TM, ymin: 0, ymax: 10, w: 420, h: 360, etx: "t (s)", ety: "θ (rad)", etiqueta: "Ángulo recorrido frente al tiempo" });
    var sr = U.slider(ctl, { et: "Radio r (m)", min: 0.5, max: 2, step: 0.1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " m"; } });
    var sw = U.slider(ctl, { et: "Velocidad angular ω (rad/s)", min: -6, max: 6, step: 0.25, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    var s0 = U.slider(ctl, { et: "Ángulo inicial θ₀ (°)", min: 0, max: 360, step: 15, val: 0, on: function (v) { st.th0 = v * R; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; stt.set(0); pinta(); return; } if (dt) { st.t += dt; if (st.t >= TM) st.t -= TM; stt.set(st.t); pinta(); } }, { auto: false });
    function pinta() {
      var r = st.r, w = st.w, t = st.t, th = st.th0 + w * t, v = w * r, ac = w * w * r, T = w === 0 ? Infinity : TAU / Math.abs(w), x = r * Math.cos(th), y = r * Math.sin(th);
      g.limpiar(); ejes(g, 2.5); circ(g, r, "c-ink").setAttribute("stroke-width", 2);
      g.segmento(0, 0, x, y, { clase: "c-faint" }); g.punto(0, 0, { r: 4, clase: "c-ink" });
      g.arco(0, 0, r * 0.3, st.th0 / R, th / R, { clase: "c-pen" }).setAttribute("stroke-width", 2.5);
      if (Math.abs(v) > 1e-9) U.flecha(g, x, y, x - Math.sin(th) * Math.sign(w) * Math.abs(v) * 0.17, y + Math.cos(th) * Math.sign(w) * Math.abs(v) * 0.17, { clase: "c-ok" });
      if (ac > 1e-9) { var L = Math.min(1.2, ac * 0.05 + 0.15); U.flecha(g, x, y, x - Math.cos(th) * L, y - Math.sin(th) * L, { clase: "c-red" }); }
      g.punto(x, y, { r: 8, clase: "c-pen" });
      // θ–t
      var thf = st.th0 + w * TM, lo = Math.min(st.th0, thf, 0), hi = Math.max(st.th0, thf, 1); gt.rango(0, TM, lo - 0.5, hi + 0.5); gt.limpiar();
      gt.segmento(0, st.th0, TM, thf, { clase: "c-pen" }).setAttribute("stroke-width", 3); gt.segmento(t, lo - 0.5, t, th, { clase: "c-faint", dash: "3 4" }); gt.punto(t, th, { r: 6, clase: "c-red" });
      lectura.innerHTML = lec("Periodo T = 2π/ω", T === Infinity ? "—" : f2(T, 3) + " s", "pen") + lec("Frecuencia f = 1/T", T === Infinity ? "0 Hz" : f2(1 / T, 3) + " Hz = " + f2(60 / T, 1) + " rpm", "pen") +
        lec("Velocidad lineal v = ω·r", f2(Math.abs(v), 3) + " m/s = " + f2(Math.abs(v) * 3.6, 2) + " km/h", "ok") + lec("Aceleración centrípeta a<sub>c</sub> = ω²·r = v²/r", f2(ac, 3) + " m/s²", "red") +
        lec("Ángulo recorrido θ − θ₀ = ω·t", f2(w * t, 3) + " rad = " + f2(w * t / R, 1) + "°  (" + f2(Math.abs(w * t) / TAU, 2) + " vueltas)", "ancho") + lec("Longitud de arco s = θ·r", f2(Math.abs(w * t) * r, 3) + " m", "") + lec("Sentido", w > 0 ? "antihorario (ω &gt; 0)" : w < 0 ? "horario (ω &lt; 0)" : "parado", "");
      pie.innerHTML = "La velocidad lineal (<b style='color:var(--ok)'>verde</b>) es siempre <b>tangente</b> a la circunferencia y su módulo es constante, pero su dirección cambia: por eso hay aceleración, la <b>centrípeta</b> (<b style='color:var(--red)'>roja</b>), dirigida hacia el centro. Dobla ω y la aceleración se multiplica por 4 (ac = ω²r). Con ω &lt; 0 el giro es horario.";
    }
    pinta();
  };

  // ============================================================
  // F9_UNIDADES: conversor de magnitudes angulares
  // ============================================================
  var UN = { rpm: ["rpm (vueltas/min)", function (v) { return v * TAU / 60; }, function (w) { return w * 60 / TAU; }], hz: ["Hz (vueltas/s)", function (v) { return v * TAU; }, function (w) { return w / TAU; }], rads: ["rad/s", function (v) { return v; }, function (w) { return w; }], grs: ["°/s", function (v) { return v * R; }, function (w) { return w / R; }], T: ["periodo T (s)", function (v) { return TAU / v; }, function (w) { return TAU / w; }] };
  B.w.f9_unidades = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Conversor de velocidad angular: rpm, Hz, rad/s, °/s y periodo");
    cuerpo.innerHTML = '<div data-un class="chips"></div><div data-ctl></div><div class="f9-dos"><div class="f9-disco"></div><div class="lectura"></div></div><p class="w-pie"></p>';
    var st = { u: "rpm", v: 300, th: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = disco(cuerpo.querySelector(".f9-disco"), 1.4, 340, 300);
    var l = document.createElement("label"); l.className = "bx-campo"; l.innerHTML = '<span class="bx-et">Valor:</span><input type="text" inputmode="decimal" autocomplete="off" value="300" style="width:120px" aria-label="Valor">'; ctl.appendChild(l);
    var inp = l.querySelector("input");
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.th = 0; pinta(); return; } if (dt) { var w = valor(); var vis = isFinite(w) ? Math.max(-TAU * 1.2, Math.min(TAU * 1.2, w)) : 0; st.th += vis * dt; pinta(true); } }, { auto: true });
    function valor() { var v = B.Mate.numero(inp.value); if (isNaN(v) || v === 0 && st.u === "T") return NaN; return UN[st.u][1](v); }
    function pinta(solo) {
      var w = valor();
      g.limpiar(); ejes(g, 1.3); circ(g, 1, "c-ink").setAttribute("stroke-width", 2); g.segmento(0, 0, Math.cos(st.th), Math.sin(st.th), { clase: "c-pen" }).setAttribute("stroke-width", 4); g.punto(Math.cos(st.th), Math.sin(st.th), { r: 7, clase: "c-red" });
      if (solo === true) return;
      if (isNaN(w)) { lectura.innerHTML = lec("Escribe un número", "con coma decimal si hace falta (el periodo no puede ser 0)", "red ancho"); return; }
      lectura.innerHTML = lec("ω en rad/s", f2(w, 4), "pen") + lec("Frecuencia f", f2(w / TAU, 4) + " Hz", "") + lec("Revoluciones por minuto", f2(w * 60 / TAU, 3) + " rpm", "ok") + lec("En grados por segundo", f2(w / R, 2) + " °/s", "") + lec("Periodo T", w === 0 ? "—" : f2(TAU / Math.abs(w), 4) + " s", "red");
      pie.innerHTML = "La manecilla azul gira (en cámara lenta si ω es muy grande: el ojo no distingue más de 1-2 vueltas por segundo). <b>Para convertir:</b> rpm → rad/s multiplica por 2π/60 (≈ 0,1047); rad/s → rpm multiplica por 60/2π (≈ 9,549); Hz → rad/s multiplica por 2π; T = 1/f = 2π/ω.";
    }
    inp.addEventListener("input", function () { pinta(); });
    U.fichas(cuerpo.querySelector("[data-un]"), Object.keys(UN).map(function (k) { return { k: k, t: "Escribo " + UN[k][0] }; }), "rpm", function (k) { st.u = k; inp.value = { rpm: "300", hz: "5", rads: "10", grs: "360", T: "2" }[k]; pinta(); });
    pinta();
  };

  // ============================================================
  // F9_ARCO: el radián y s = θ·r
  // ============================================================
  B.w.f9_arco = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El radián: cuando el arco mide lo mismo que el radio");
    cuerpo.innerHTML = '<div class="f9-disco"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { th: 90, r: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = disco(cuerpo.querySelector(".f9-disco"), 3.2, 560, 330);
    U.slider(ctl, { et: "Ángulo θ (°)", min: 0, max: 360, step: 1, val: st.th, on: function (v) { st.th = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    U.slider(ctl, { et: "Radio r (m)", min: 0.5, max: 3, step: 0.1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " m"; } });
    function pinta() {
      var th = st.th * R, r = st.r; g.limpiar(); ejes(g, 3.1); circ(g, r, "c-ink").setAttribute("stroke-width", 1.5);
      g.polilinea([[0, 0], [r, 0]], { clase: "c-pen" }).setAttribute("stroke-width", 3); g.polilinea([[0, 0], [r * Math.cos(th), r * Math.sin(th)]], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.arco(0, 0, r, 0, st.th, { clase: "c-red" }).setAttribute("stroke-width", 5);
      // marcas de «un radio de arco»
      for (var k = 1; k * 1 <= th; k++) { g.punto(r * Math.cos(k), r * Math.sin(k), { r: 4, clase: "c-ok" }); }
      g.arco(0, 0, r * 0.25, 0, st.th, { clase: "c-pen" });
      g.texto(r / 2, 0, "r", { clase: "pen", dy: 16, ancla: "middle" });
      lectura.innerHTML = lec("Ángulo en radianes", f2(th, 4) + " rad  (= " + C.piT(st.th) + ")", "pen") + lec("Longitud del arco s = θ·r", f2(th * r, 3) + " m", "red") + lec("¿Cuántos radios caben en el arco?", f2(th, 3) + " (marcas verdes = 1 radián cada una)", "ok") +
        lec("Fracción de vuelta", f2(st.th / 360, 4) + " vueltas", "") + lec("Circunferencia completa", "2π·r = " + f2(TAU * r, 3) + " m", "");
      pie.innerHTML = "Un <b>radián</b> es el ángulo cuyo arco mide igual que el radio: s = θ·r con θ = 1 rad da s = r. Como la circunferencia mide 2π·r, una vuelta son 2π rad ≈ 6,283 rad (= 360°). Cada marca <b style='color:var(--ok)'>verde</b> señala un radián recorrido sobre el arco; verás que la vuelta completa tiene algo más de 6 marcas. Con θ en radianes, s = θ·r <i>sin factores extra</i>: por eso la física usa radianes.";
    }
    pinta();
  };

  // ============================================================
  // F9_VECTORES: de dónde sale a_c = v²/r
  // ============================================================
  B.w.f9_vectores = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿De dónde sale la aceleración centrípeta? El triángulo de Δv");
    cuerpo.innerHTML = '<div class="f9-dos"><div class="f9-disco"></div><div class="f9-graf"></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { dth: 60, r: 2, w: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = disco(cuerpo.querySelector(".f9-disco"), 3, 380, 340), g2 = new B.Plot(cuerpo.querySelector(".f9-graf"), { xmin: -5, xmax: 5, ymin: -2, ymax: 5, w: 380, h: 340, limpio: true, etiqueta: "Triángulo de velocidades" });
    U.slider(ctl, { et: "Ángulo recorrido Δθ (°)", min: 5, max: 150, step: 5, val: st.dth, on: function (v) { st.dth = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    U.slider(ctl, { et: "Velocidad angular ω (rad/s)", min: 0.5, max: 4, step: 0.25, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    function pinta() {
      var r = st.r, w = st.w, v = w * r, d = st.dth * R, t1 = Math.PI / 2 - d / 2, t2 = Math.PI / 2 + d / 2, dt = d / w;
      var v1 = [v * Math.cos(t1 + Math.PI / 2), v * Math.sin(t1 + Math.PI / 2)], v2 = [v * Math.cos(t2 + Math.PI / 2), v * Math.sin(t2 + Math.PI / 2)], dv = [v2[0] - v1[0], v2[1] - v1[1]];
      g.limpiar(); ejes(g, 2.9); circ(g, r, "c-ink"); g.arco(0, 0, r, t1 / R, t2 / R, { clase: "c-red" }).setAttribute("stroke-width", 4);
      var p1 = [r * Math.cos(t1), r * Math.sin(t1)], p2 = [r * Math.cos(t2), r * Math.sin(t2)];
      g.punto(p1[0], p1[1], { r: 6, clase: "c-pen" }); g.punto(p2[0], p2[1], { r: 6, clase: "c-pen" });
      var k = 0.5; U.flecha(g, p1[0], p1[1], p1[0] + v1[0] * k, p1[1] + v1[1] * k, { clase: "c-ok" }); U.flecha(g, p2[0], p2[1], p2[0] + v2[0] * k, p2[1] + v2[1] * k, { clase: "c-ok" });
      g.texto(p1[0], p1[1], "v₁", { clase: "ok", dx: 8, dy: -8 }); g.texto(p2[0], p2[1], "v₂", { clase: "ok", dx: -22, dy: -8 });
      g.segmento(0, 0, p1[0], p1[1], { clase: "c-faint", dash: "3 4" }); g.segmento(0, 0, p2[0], p2[1], { clase: "c-faint", dash: "3 4" });
      // triángulo con las dos velocidades en el mismo origen
      var s = 0.55 * 4 / Math.max(v, 1), o = [0, -0.6]; g2.limpiar();
      U.flecha(g2, o[0], o[1], o[0] + v1[0] * s, o[1] + v1[1] * s, { clase: "c-ok" }); U.flecha(g2, o[0], o[1], o[0] + v2[0] * s, o[1] + v2[1] * s, { clase: "c-ok" });
      U.flecha(g2, o[0] + v1[0] * s, o[1] + v1[1] * s, o[0] + v2[0] * s, o[1] + v2[1] * s, { clase: "c-red", grosor: 4 });
      g2.texto(o[0] + v1[0] * s, o[1] + v1[1] * s, "v₁", { clase: "ok", dx: -26, dy: -6 }); g2.texto(o[0] + v2[0] * s, o[1] + v2[1] * s, "v₂", { clase: "ok", dx: 6, dy: -6 });
      g2.texto((v1[0] + v2[0]) * s / 2 + o[0], (v1[1] + v2[1]) * s / 2 + o[1], "Δv", { clase: "red", dy: -10, ancla: "middle" });
      var dvm = Math.hypot(dv[0], dv[1]), acm = dvm / dt, ac = v * v / r;
      lectura.innerHTML = lec("Velocidad lineal v = ω·r", f2(v, 3) + " m/s (el módulo no cambia)", "ok") + lec("|Δv| exacto = 2v·sen(Δθ/2)", f2(dvm, 4) + " m/s", "red") + lec("Aproximación |Δv| ≈ v·Δθ (Δθ en rad)", f2(v * d, 4) + " m/s", "") +
        lec("Intervalo Δt = Δθ/ω", f2(dt, 4) + " s", "") + lec("Aceleración media |Δv|/Δt", f2(acm, 4) + " m/s²", "pen") + lec("Aceleración centrípeta v²/r", f2(ac, 4) + " m/s²  (a<sub>media</sub>/a<sub>c</sub> = " + f2(acm / ac, 4) + ")", "ancho");
      pie.innerHTML = "La velocidad cambia de <b>dirección</b> aunque no de módulo. El triángulo isósceles de v₁, v₂ y Δv tiene el mismo ángulo Δθ que los radios, así que |Δv| = 2v·sen(Δθ/2) ≈ v·Δθ. Dividiendo entre Δt = Δθ/ω resulta |Δv|/Δt → v·ω = v²/r. <b>Reduce Δθ</b>: el cociente de la última fila se acerca a 1. Y Δv apunta <b>hacia el centro</b>: de ahí el nombre «centrípeta».";
    }
    pinta();
  };

  // ============================================================
  // F9_MCUA: aceleración angular, tangencial y normal
  // ============================================================
  B.w.f9_mcua = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Movimiento circular uniformemente acelerado: ω crece (o decrece) con α");
    cuerpo.innerHTML = '<div class="f9-dos"><div class="f9-disco"></div><div class="f9-graf"></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 8, st = { r: 1.5, w0: 1, al: 0.75, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = disco(cuerpo.querySelector(".f9-disco"), 2.6), gw = new B.Plot(cuerpo.querySelector(".f9-graf"), { xmin: 0, xmax: TM, ymin: -1, ymax: 10, w: 420, h: 340, etx: "t (s)", ety: "ω (rad/s)", etiqueta: "Velocidad angular frente al tiempo" });
    U.slider(ctl, { et: "Radio r (m)", min: 0.5, max: 2, step: 0.1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    U.slider(ctl, { et: "ω₀ (rad/s)", min: -4, max: 6, step: 0.5, val: st.w0, on: function (v) { st.w0 = v; pinta(); }, fmt: function (v) { return f2(v, 1); } });
    U.slider(ctl, { et: "Acel. angular α (rad/s²)", min: -2, max: 2, step: 0.25, val: st.al, on: function (v) { st.al = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { st.t = 0; stt.set(0); pinta(); return; } if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; stt.set(TM); pinta(); return false; } stt.set(st.t); pinta(); } }, { auto: false });
    function pinta() {
      var r = st.r, w0 = st.w0, al = st.al, t = st.t, th = w0 * t + 0.5 * al * t * t, w = w0 + al * t, at = al * r, an = w * w * r, x = r * Math.cos(th), y = r * Math.sin(th), ws = [];
      g.limpiar(); ejes(g, 2.5); circ(g, r, "c-ink").setAttribute("stroke-width", 2); g.segmento(0, 0, x, y, { clase: "c-faint" });
      var tx = -Math.sin(th), ty = Math.cos(th);   // tangente (sentido antihorario)
      if (Math.abs(at) > 1e-9) U.flecha(g, x, y, x + tx * at * 0.5, y + ty * at * 0.5, { clase: "c-ok" });
      if (an > 1e-9) U.flecha(g, x, y, x - Math.cos(th) * Math.min(1.5, an * 0.12), y - Math.sin(th) * Math.min(1.5, an * 0.12), { clase: "c-red" });
      if (Math.abs(w) > 1e-9) U.flecha(g, x, y, x + tx * Math.sign(w) * Math.min(1.6, Math.abs(w * r) * 0.3), y + ty * Math.sign(w) * Math.min(1.6, Math.abs(w * r) * 0.3), { clase: "c-pen", grosor: 2 });
      g.punto(x, y, { r: 8, clase: "c-pen" });
      var i; for (i = 0; i <= 100; i++) ws.push(w0 + al * TM * i / 100); var lo = Math.min.apply(null, ws.concat([0])), hi = Math.max.apply(null, ws.concat([0])); gw.rango(0, TM, lo - 0.5, hi + 0.5); gw.limpiar();
      gw.segmento(0, w0, TM, w0 + al * TM, { clase: "c-pen" }).setAttribute("stroke-width", 3); if (t > 0.01) gw.zona(function (s) { return w0 + al * s; }, 0, t, { clase: "z-ok" }); gw.segmento(t, 0, t, w, { clase: "c-faint", dash: "3 4" }); gw.punto(t, w, { r: 6, clase: "c-red" });
      var atot = Math.hypot(at, an);
      lectura.innerHTML = lec("Velocidad angular ω = ω₀ + α·t", f2(w, 3) + " rad/s  (" + f2(C.aRpm(w), 1) + " rpm)", "pen") + lec("Ángulo θ = ω₀t + ½αt²", f2(th, 3) + " rad (" + f2(Math.abs(th) / TAU, 2) + " vueltas)", "pen") +
        lec("Aceleración tangencial a<sub>t</sub> = α·r", f2(at, 3) + " m/s² (cambia el módulo de v)", "ok") + lec("Aceleración normal a<sub>n</sub> = ω²·r", f2(an, 3) + " m/s² (cambia la dirección de v)", "red") + lec("Aceleración total |a| = √(a<sub>t</sub>² + a<sub>n</sub>²)", f2(atot, 3) + " m/s²", "ancho") +
        lec("Velocidad lineal v = ω·r", f2(w * r, 3) + " m/s", "");
      pie.innerHTML = "Con α ≠ 0 aparecen <b>dos</b> aceleraciones: la <b>tangencial</b> (verde, a<sub>t</sub> = α·r) cambia el módulo de la velocidad; la <b>normal o centrípeta</b> (roja, a<sub>n</sub> = ω²·r) cambia su dirección. Las ecuaciones angulares son las del MRUA con x→θ, v→ω y a→α. El área bajo ω–t es el ángulo recorrido.";
    }
    pinta();
  };
})(window);
