/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 10: dinámica)
   motor B.lab.din + f10_resultante · f10_segunda · f10_accion · f10_rozamiento
   f10_ascensor · f10_equilibrio
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var D = B.lab.din = {};
  var R = Math.PI / 180;
  D.g = 9.8;

  // ------------------------------------------------------------
  // Motor: suma de fuerzas, rozamiento, plano inclinado, poleas, choques
  // ------------------------------------------------------------
  D.comp = function (F, angGrados) { return [F * Math.cos(angGrados * R), F * Math.sin(angGrados * R)]; };
  D.suma = function (lista) {                              // lista = [{ F, a }] (módulo y ángulo en grados)
    var x = 0, y = 0;
    lista.forEach(function (f) { var c = D.comp(f.F, f.a); x += c[0]; y += c[1]; });
    if (Math.abs(x) < 1e-9) x = 0; if (Math.abs(y) < 1e-9) y = 0;
    return { x: x, y: y, R: Math.hypot(x, y), ang: Math.atan2(y, x) / R };
  };
  // Cuerpo en un plano (ángulo th sobre la horizontal) con una fuerza F paralela al plano (+ hacia arriba).
  // Eje s positivo plano abajo. mu = coeficiente (estático = cinético). Fr = fuerza de rozamiento sobre el bloque (con signo, + plano abajo).
  D.plano = function (m, thGrados, mu, F) {
    var th = thGrados * R, g = D.g, Pp = m * g * Math.sin(th), N = m * g * Math.cos(th), Fn = Pp - (F || 0), Frmax = mu * N, e, a, Fr;
    if (Math.abs(Fn) <= Frmax + 1e-12) { e = "reposo"; a = 0; Fr = -Fn; }               // rozamiento estático: compensa exactamente la fuerza neta
    else { e = Fn > 0 ? "baja" : "sube"; Fr = Fn > 0 ? -Frmax : Frmax; a = (Fn + Fr) / m; }
    return { Pp: Pp, N: N, Pn: N, Fn: Fn, Frmax: Frmax, estado: e, a: a, Fr: Fr };
  };
  D.horizontal = function (m, F, mu) {                       // F horizontal, positiva a la derecha
    var N = m * D.g, Frmax = mu * N, a, e;
    if (Math.abs(F) <= Frmax + 1e-12) { a = 0; e = "reposo"; } else { a = (F - (F > 0 ? Frmax : -Frmax)) / m; e = "mueve"; }
    return { N: N, Frmax: Frmax, a: a, estado: e, Fr: e === "reposo" ? F : (F > 0 ? Frmax : -Frmax) };
  };
  D.atwood = function (m1, m2) { var a = (m2 - m1) * D.g / (m1 + m2), T = 2 * m1 * m2 * D.g / (m1 + m2); return { a: a, T: T }; };   // a > 0: baja m2
  D.choque = function (m1, v1, m2, v2, e) {
    var M = m1 + m2;
    return { v1: ((m1 - e * m2) * v1 + (1 + e) * m2 * v2) / M, v2: ((m2 - e * m1) * v2 + (1 + e) * m1 * v1) / M };
  };
  D.balanza = function (m, a) { return m * (D.g + a); };       // lectura de una báscula en un ascensor (a > 0 hacia arriba)

  // ------------------------------------------------------------
  // Auxiliares de interfaz
  // ------------------------------------------------------------
  function lec(r, v, c) { return U.lec(r, v, c); }
  function f2(x, d) { return fmt(x, d == null ? 2 : d); }
  function iso(g, x0, x1, y0, y1) {
    var c = g.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj, s = Math.max((y1 - y0) / 2, (x1 - x0) / 2 * ph / pw);
    g.rangoIso((x0 + x1) / 2, (y0 + y1) / 2, s);
  }
  D.iso = iso;
  // Rectángulo (bloque) con la base centrada en (cx, cy)
  function caja(g, cx, cy, w, h, clase, borde) {
    return g.poligono([[cx - w / 2, cy], [cx + w / 2, cy], [cx + w / 2, cy + h], [cx - w / 2, cy + h]], { clase: clase || "z-hl", borde: borde || "var(--ink)", grosor: 1.8 });
  }
  D.caja = caja;
  // Flecha con rótulo al final
  function vec(g, x0, y0, x1, y1, clase, rotulo, o) {
    o = o || {};
    if (Math.hypot(x1 - x0, y1 - y0) < 1e-6) return;
    U.flecha(g, x0, y0, x1, y1, { clase: clase, grosor: o.grosor || 3, punta: o.punta });
    if (rotulo) g.texto(x1, y1, rotulo, { dx: o.dx == null ? 7 : o.dx, dy: o.dy == null ? -6 : o.dy, clase: (clase || "c-pen").replace("c-", ""), ancla: o.ancla });
  }
  D.vec = vec;
  function ruedas(g, cx, cy, w, r) { g.punto(cx - w * 0.3, cy, { r: r, clase: "c-ink" }); g.punto(cx + w * 0.3, cy, { r: r, clase: "c-ink" }); }
  function nice(x) { var p = Math.pow(10, Math.floor(Math.log10(x))), m = x / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }

  // ============================================================
  // F10_RESULTANTE: suma vectorial de fuerzas
  // ============================================================
  var PRE_R = {
    perp: { t: "Perpendiculares (3 N y 4 N)", n: 2, f: [[3, 0], [4, 90], [4, 0]] },
    misma: { t: "Misma dirección y sentido", n: 2, f: [[6, 0], [4, 0], [4, 0]] },
    opuesta: { t: "Sentidos opuestos", n: 2, f: [[6, 0], [4, 180], [4, 0]] },
    ang: { t: "Ángulo cualquiera (60°)", n: 2, f: [[6, 0], [6, 60], [4, 0]] },
    tres: { t: "Tres fuerzas", n: 3, f: [[6, 0], [5, 100], [4, 220]] },
    equil: { t: "Equilibrio (3 × 10 N a 120°)", n: 3, f: [[10, 0], [10, 120], [10, 240]] }
  };
  B.w.f10_resultante = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Suma de fuerzas: la resultante y sus componentes");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 2, F: [3, 4, 4], A: [0, 90, 0], m: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = [], sa = [], sm;
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -12, xmax: 12, ymin: -12, ymax: 12, w: 560, h: 360, limpio: true, etiqueta: "Fuerzas y su resultante" });
    var cl = ["c-pen", "c-ok", "c-ink"], nm = ["F₁", "F₂", "F₃"];
    [0, 1, 2].forEach(function (i) {
      sl[i] = U.slider(ctl, { et: nm[i] + " módulo", min: 0, max: 12, step: 0.5, val: st.F[i], on: function (v) { st.F[i] = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " N"; } });
      sa[i] = U.slider(ctl, { et: nm[i] + " ángulo", min: -180, max: 180, step: 5, val: st.A[i], on: function (v) { st.A[i] = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    });
    sm = U.slider(ctl, { et: "Masa m", min: 1, max: 10, step: 0.5, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    function pinta() {
      var lista = [], i, R_, tx = 0, ty = 0;
      for (i = 0; i < st.n; i++) lista.push({ F: st.F[i], a: st.A[i] });
      R_ = D.suma(lista);
      sl[2].el.style.display = sa[2].el.style.display = st.n === 3 ? "" : "none";
      var ext = Math.max(4, Math.abs(R_.x), Math.abs(R_.y)), px = 0, py = 0;
      for (i = 0; i < st.n; i++) { var cc = D.comp(st.F[i], st.A[i]); px += cc[0]; py += cc[1]; ext = Math.max(ext, Math.abs(px), Math.abs(py), st.F[i]); }
      ext = Math.ceil(ext * 1.25);
      iso(g, -ext, ext, -ext, ext); g.limpiar();
      g.horizontal(0, { clase: "c-faint", dash: "2 5" }); g.vertical(0, { clase: "c-faint", dash: "2 5" });
      for (i = 0; i < st.n; i++) {          // polígono: cada fuerza a continuación de la anterior (discontinuo)
        var c = D.comp(st.F[i], st.A[i]);
        if (i > 0 && st.F[i] > 0) { g.segmento(tx, ty, tx + c[0], ty + c[1], { clase: cl[i], dash: "5 4" }); }
        tx += c[0]; ty += c[1];
      }
      for (i = 0; i < st.n; i++) { var d = D.comp(st.F[i], st.A[i]); if (st.F[i] > 0) vec(g, 0, 0, d[0], d[1], cl[i], nm[i], { dx: 6, dy: -6 }); }
      if (R_.R > 1e-6) {
        g.segmento(R_.x, 0, R_.x, R_.y, { clase: "c-red", dash: "3 4" }); g.segmento(0, R_.y, R_.x, R_.y, { clase: "c-red", dash: "3 4" });
        vec(g, 0, 0, R_.x, R_.y, "c-red", "ΣF", { grosor: 4.5, dx: 8, dy: -8 });
      } else g.punto(0, 0, { r: 7, clase: "c-red" });
      g.punto(0, 0, { r: 4, clase: "c-ink" });
      var Fx = R_.x, Fy = R_.y, eq = R_.R < 1e-6;
      lectura.innerHTML = lec("ΣF<sub>x</sub> = ΣF·cos θ", f2(Fx, 2) + " N", "pen") + lec("ΣF<sub>y</sub> = ΣF·sen θ", f2(Fy, 2) + " N", "ok") +
        lec("Módulo de la resultante", eq ? "0 N: equilibrio" : f2(R_.R, 2) + " N", "red") + lec("Dirección", eq ? "—" : f2(R_.ang, 1) + "° (desde el eje +x)") +
        lec("Aceleración a = ΣF/m", eq ? "0 m/s² (reposo o MRU)" : f2(R_.R / st.m, 2) + " m/s²", "ok") + lec("Suma de los módulos", f2(lista.reduce(function (s, f) { return s + f.F; }, 0), 2) + " N (≥ |ΣF|)");
      pie.innerHTML = "Las fuerzas son <b>vectores</b>: no se suman los números. Cada una se descompone en F·cos θ y F·sen θ; se suman las componentes por separado y el módulo es √(ΣF<sub>x</sub>² + ΣF<sub>y</sub>²). Las líneas discontinuas dibujan el <b>método del polígono</b>: la resultante cierra el camino. La aceleración apunta en la dirección de ΣF.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(PRE_R).map(function (k) { return { k: k, t: PRE_R[k].t }; }), "perp", function (k) {
      var p = PRE_R[k]; st.n = p.n; for (var i = 0; i < 3; i++) { st.F[i] = p.f[i][0]; st.A[i] = p.f[i][1]; sl[i].set(st.F[i]); sa[i].set(st.A[i]); } pinta();
    });
    pinta();
  };

  // ============================================================
  // F10_SEGUNDA: ΣF = m·a con el carro
  // ============================================================
  B.w.f10_segunda = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Segunda ley de Newton: empuja un carro");
    cuerpo.innerHTML = '<div class="f8-escena"></div><div data-ctl></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 10, st = { F: 20, m: 5, mu: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -6, xmax: 6, ymin: -1, ymax: 3, w: 640, h: 190, limpio: true, etiqueta: "Carro sobre una pista horizontal" });
    var g1 = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -50, xmax: 50, ymin: -10, ymax: 10, w: 320, h: 240, etx: "F (N)", ety: "a", etiqueta: "Aceleración frente a la fuerza" });
    var g2 = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 20, ymin: 0, ymax: 10, w: 320, h: 240, etx: "m (kg)", ety: "a", etiqueta: "Aceleración frente a la masa" });
    sl.F = U.slider(ctl, { et: "Fuerza aplicada F", min: -50, max: 50, step: 1, val: st.F, on: function (v) { st.F = v; st.t = 0; sl.t.set(0); pinta(); }, fmt: function (v) { return f2(v, 0) + " N"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 20, step: 0.5, val: st.m, on: function (v) { st.m = v; st.t = 0; sl.t.set(0); pinta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 0.5, step: 0.01, val: st.mu, on: function (v) { st.mu = v; st.t = 0; sl.t.set(0); pinta(); }, fmt: function (v) { return f2(v, 2); } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.1, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " s"; } });
    var an = U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var c = D.horizontal(st.m, st.F, st.mu), a = c.a, t = st.t, v = a * t, x = 0.5 * a * t * t, i;
      // escena: la cámara sigue al carro; el suelo se desplaza
      gE.limpiar(); gE.segmento(-6, 0, 6, 0, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      var off = ((x % 2) + 2) % 2;
      for (i = -4; i <= 4; i++) { var xm = i * 2 - off; if (xm > -6 && xm < 6) { gE.segmento(xm, 0, xm, -0.25, { clase: "c-ink" }); } }
      var w = 2.6 + Math.min(st.m, 20) * 0.04, h = 1.0;
      caja(gE, 0, 0.18, w, h, "z-pen", "var(--pen)"); ruedas(gE, 0, 0.18, w, 0.18);
      gE.texto(0, 0.18 + h / 2, f2(st.m, 1) + " kg", { ancla: "middle", dy: 4 });
      var k = 4.2 / 50;                    // 50 N → 4,2 unidades
      if (Math.abs(st.F) > 0.01) vec(gE, st.F > 0 ? w / 2 : -w / 2, 0.18 + h / 2, (st.F > 0 ? w / 2 : -w / 2) + st.F * k, 0.18 + h / 2, "c-ok", "F", { dy: -8 });
      if (Math.abs(c.Fr) > 0.01) { var x0f = c.Fr > 0 ? -w / 2 : w / 2; vec(gE, x0f, 0.18 + h * 0.2, x0f - c.Fr * k, 0.18 + h * 0.2, "c-red", "Fr", { dy: 16, ancla: c.Fr > 0 ? "end" : "start" }); }
      if (Math.abs(a) > 1e-6) vec(gE, 0, 2.0, Math.max(-5, Math.min(5, a * 0.5)), 2.0, "c-pen", "a", { dy: -8 });
      gE.texto(-5.9, 2.6, "velocidad: " + f2(Math.abs(v), 2) + " m/s", { clase: "faint" });
      // a–F con m fijo
      var Fm = c.Frmax, am = Math.max(1, (50 - Fm) / st.m) * 1.1;
      g1.rango(-50, 50, -am, am); g1.limpiar();
      if (Fm > 0.01) { g1.zona(function () { return am; }, -Math.min(Fm, 50), Math.min(Fm, 50), { g: function () { return -am; }, clase: "z-red" }); }
      g1.curva(function (F) { return D.horizontal(st.m, F, st.mu).a; }, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      g1.punto(st.F, a, { r: 6, clase: "c-red" });
      // a–m con F fija
      g2.rango(0, 20, 0, Math.max(2, Math.abs(st.F) * 1.1)); g2.limpiar();
      g2.curva(function (m) { return Math.abs(D.horizontal(m, st.F, st.mu).a); }, { clase: "c-ok", x0: 1, x1: 20, n: 200 }).setAttribute("stroke-width", 3);
      g2.punto(st.m, Math.abs(a), { r: 6, clase: "c-red" });
      lectura.innerHTML = lec("Fuerza neta ΣF", f2(c.estado === "reposo" ? 0 : st.F - c.Fr, 2) + " N", "ok") + lec("Aceleración a = ΣF/m", f2(a, 3) + " m/s²", "red") +
        lec("Velocidad v = a·t", f2(v, 2) + " m/s", "pen") + lec("Posición x = ½·a·t²", f2(x, 2) + " m") +
        lec("Rozamiento máximo μ·m·g", f2(c.Frmax, 1) + " N") + (c.estado === "reposo" && st.F !== 0 ? lec("Estado", "no se mueve: |F| ≤ μ·m·g (rozamiento estático)", "ancho red") : "");
      pie.innerHTML = "<b>Izquierda (a–F):</b> con la masa fija, la aceleración es <b>proporcional</b> a la fuerza (recta de pendiente 1/m; la banda roja es la zona donde el rozamiento impide el movimiento). <b>Derecha (a–m):</b> con la fuerza fija, la aceleración es <b>inversamente proporcional</b> a la masa (hipérbola): a doble masa, mitad de aceleración. Pulsa «Reproducir» para ver el carro (la pista se desplaza para que sigas viéndolo).";
    }
    pinta();
  };

  // ============================================================
  // F10_ACCION: dos patinadores se empujan (3.ª ley)
  // ============================================================
  B.w.f10_accion = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Acción y reacción: dos patinadores se empujan");
    cuerpo.innerHTML = '<div class="f8-escena"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var TM = 4, DT = 0.4, st = { m1: 40, m2: 80, F: 150, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -12, xmax: 12, ymin: -1, ymax: 5, w: 640, h: 250, limpio: true, etiqueta: "Dos patinadores sobre hielo" });
    sl.m1 = U.slider(ctl, { et: "Masa A (azul)", min: 40, max: 120, step: 5, val: st.m1, on: function (v) { st.m1 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.m2 = U.slider(ctl, { et: "Masa B (verde)", min: 40, max: 120, step: 5, val: st.m2, on: function (v) { st.m2 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.F = U.slider(ctl, { et: "Fuerza del empujón", min: 50, max: 300, step: 10, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " N"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: TM, step: 0.05, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    var an = U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t += dt; if (st.t >= TM) { st.t = TM; sl.t.set(TM); pinta(); return false; } sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function posic(m, sgn, t) {            // sgn = -1 para A (izquierda), +1 para B
      var a = st.F / m, x0 = sgn * 0.5;
      if (t <= DT) return { x: x0 + sgn * 0.5 * a * t * t, v: sgn * a * t };
      return { x: x0 + sgn * (0.5 * a * DT * DT + a * DT * (t - DT)), v: sgn * a * DT };
    }
    function pinta() {
      var A = posic(st.m1, -1, st.t), Bq = posic(st.m2, 1, st.t), contacto = st.t < DT, i;
      gE.limpiar(); gE.segmento(-12, 0, 12, 0, { clase: "c-faint" }).setAttribute("stroke-width", 3);
      function persona(x, m, clase, borde, et, lado) {
        var h = 1.9 + m / 120 * 0.9, w = 0.8 + m / 120 * 0.6;
        caja(gE, x, 0, w, h, clase, borde); gE.punto(x, h + 0.4, { r: 8, clase: clase === "z-pen" ? "c-pen" : "c-ok" });
        gE.texto(x + lado * (w / 2 + 0.2), h * 0.45, et, { ancla: lado < 0 ? "end" : "start", clase: clase === "z-pen" ? "pen" : "ok" });
      }
      persona(A.x, st.m1, "z-pen", "var(--pen)", "A · " + f2(st.m1, 0) + " kg", -1); persona(Bq.x, st.m2, "z-ok", "var(--ok)", "B · " + f2(st.m2, 0) + " kg", 1);
      if (contacto) {
        var k = 3.5 / 300;
        vec(gE, Bq.x, 3.5, Bq.x + st.F * k, 3.5, "c-ok", "F", { dy: -8 });
        vec(gE, A.x, 3.5, A.x - st.F * k, 3.5, "c-pen", "F", { dy: -8, ancla: "end" });
      }
      lectura.innerHTML = lec("Fuerza de A sobre B  y  de B sobre A", f2(st.F, 0) + " N  y  " + f2(st.F, 0) + " N (iguales, sentido opuesto)", "ancho red") +
        lec("Aceleración de A: a = F/m<sub>A</sub>", f2(st.F / st.m1, 2) + " m/s²", "pen") + lec("Aceleración de B: a = F/m<sub>B</sub>", f2(st.F / st.m2, 2) + " m/s²", "ok") +
        lec("Velocidad de A (t = " + f2(st.t, 2) + " s)", f2(A.v, 2) + " m/s", "pen") + lec("Velocidad de B", f2(Bq.v, 2) + " m/s", "ok") +
        lec("Cociente |v<sub>A</sub>| / |v<sub>B</sub>|", st.t > 0 ? f2(Math.abs(A.v / Bq.v), 2) + "  (= m<sub>B</sub>/m<sub>A</sub> = " + f2(st.m2 / st.m1, 2) + ")" : "—") +
        lec("Cantidad de movimiento total  m<sub>A</sub>v<sub>A</sub> + m<sub>B</sub>v<sub>B</sub>", f2(st.m1 * A.v + st.m2 * Bq.v, 2) + " kg·m/s", "ok");
      pie.innerHTML = "Las dos fuerzas son <b>iguales y opuestas</b> (3.ª ley) y actúan sobre cuerpos <b>distintos</b>: por eso no se anulan. Las aceleraciones, en cambio, <b>no son iguales</b>: el más ligero acelera más (a = F/m) y sale más deprisa. El empujón dura " + f2(DT, 1) + " s; después los dos patinadores se mueven con velocidad constante (1.ª ley, sin rozamiento). La cantidad de movimiento total sigue siendo 0.";
    }
    pinta();
  };

  // ============================================================
  // F10_ROZAMIENTO: estático y cinético
  // ============================================================
  var MAT = {
    mm: { t: "Madera sobre madera", me: 0.5, mc: 0.3 },
    gh: { t: "Goma sobre asfalto seco", me: 0.9, mc: 0.8 },
    ah: { t: "Acero sobre hielo", me: 0.1, mc: 0.03 },
    ac: { t: "Acero sobre acero", me: 0.74, mc: 0.57 },
    tf: { t: "Teflón sobre acero", me: 0.04, mc: 0.04 }
  };
  B.w.f10_rozamiento = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Rozamiento estático y rozamiento cinético");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-escena"></div><div data-ctl></div><div class="w-plot" data-g></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: 10, me: 0.5, mc: 0.3, F: 20 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -6, xmax: 6, ymin: -1, ymax: 3, w: 640, h: 170, limpio: true, etiqueta: "Bloque arrastrado sobre una superficie" });
    var gG = new B.Plot(cuerpo.querySelector("[data-g]"), { xmin: 0, xmax: 100, ymin: 0, ymax: 80, w: 600, h: 300, etx: "F aplicada (N)", ety: "Rozamiento (N)", etiqueta: "Fuerza de rozamiento frente a la fuerza aplicada" });
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 30, step: 1, val: st.m, on: function (v) { st.m = v; ajusta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.me = U.slider(ctl, { et: "μ estático (μe)", min: 0.02, max: 1, step: 0.01, val: st.me, on: function (v) { st.me = v; if (st.mc > v) { st.mc = v; sl.mc.set(v); } ajusta(); }, fmt: function (v) { return f2(v, 2); } });
    sl.mc = U.slider(ctl, { et: "μ cinético (μc)", min: 0.02, max: 1, step: 0.01, val: st.mc, on: function (v) { st.mc = Math.min(v, st.me); if (v > st.me) sl.mc.set(st.mc); ajusta(); }, fmt: function (v) { return f2(v, 2); } });
    sl.F = U.slider(ctl, { et: "Fuerza aplicada F", min: 0, max: 100, step: 0.5, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " N"; } });
    function ajusta() {
      var N = st.m * D.g, top = Math.max(100, Math.ceil(1.6 * st.me * N / 10) * 10);
      sl.F.input.max = top; if (st.F > top) { st.F = top; sl.F.set(top); }
      gG.rango(0, top, 0, Math.max(10, Math.ceil(1.35 * st.me * N / 10) * 10)); pinta();
    }
    function pinta() {
      var N = st.m * D.g, Fe = st.me * N, Fc = st.mc * N, F = st.F, mueve = F > Fe + 1e-9, Fr = mueve ? Fc : F, a = mueve ? (F - Fc) / st.m : 0, top = gG.c.xmax, ymax = gG.c.ymax;
      gE.limpiar(); gE.segmento(-6, 0, 6, 0, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      var w = 2.4, h = 1.2, x = mueve ? 0.9 : 0;
      caja(gE, x, 0, w, h, "z-hl", "var(--ink)"); gE.texto(x, h / 2, f2(st.m, 0) + " kg", { ancla: "middle", dy: 4 });
      var k = 4 / Math.max(top, 40);
      vec(gE, x + w / 2, h * 0.6, x + w / 2 + F * k, h * 0.6, "c-ok", "F", { dy: -8 });
      if (Fr > 0.05) vec(gE, x - w / 2, h * 0.25, x - w / 2 - Fr * k, h * 0.25, "c-red", "Fr", { dy: 16, ancla: "end" });
      gE.texto(-5.9, 2.7, mueve ? "DESLIZA (rozamiento cinético)" : (Math.abs(F - Fe) < 1e-9 && F > 0 ? "A punto de deslizar" : "EN REPOSO (rozamiento estático)"), { clase: mueve ? "red" : "ok" });
      // gráfica Froz–F
      gG.limpiar();
      gG.polilinea([[0, 0], [Fe, Fe]], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      gG.polilinea([[Fe, Fe], [Fe, Fc], [top, Fc]], { clase: "c-red" }).setAttribute("stroke-width", 3);
      gG.segmento(0, Fe, Fe, Fe, { clase: "c-faint", dash: "4 4" }); gG.segmento(0, Fc, top, Fc, { clase: "c-faint", dash: "4 4" });
      gG.texto(0, Fe, "μe·N = " + f2(Fe, 1) + " N", { dx: 6, dy: -6, clase: "pen" }); gG.texto(top, Fc, "μc·N = " + f2(Fc, 1) + " N", { dx: -6, dy: 16, clase: "red", ancla: "end" });
      gG.segmento(F, 0, F, Fr, { clase: "c-faint", dash: "3 4" }); gG.punto(F, Fr, { r: 6.5, clase: mueve ? "c-red" : "c-ok" });
      lectura.innerHTML = lec("Normal N = m·g", f2(N, 1) + " N") + lec("Rozamiento estático máximo μ<sub>e</sub>·N", f2(Fe, 1) + " N", "pen") + lec("Rozamiento cinético μ<sub>c</sub>·N", f2(Fc, 1) + " N", "red") +
        lec("Rozamiento que actúa ahora", f2(Fr, 1) + " N" + (mueve ? " (cinético)" : " (= F, estático)"), mueve ? "red" : "ok") +
        lec("Fuerza neta ΣF", f2(F - Fr, 1) + " N") + lec("Aceleración", f2(a, 2) + " m/s²", "ok");
      pie.innerHTML = "Mientras F no supera el máximo estático, el bloque <b>no se mueve</b> y el rozamiento vale exactamente lo mismo que F (se adapta: recta de 45°). Cuando F supera μ<sub>e</sub>·N, el bloque empieza a deslizar y el rozamiento <b>baja</b> al valor cinético μ<sub>c</sub>·N, que ya no depende de F ni de la velocidad. Por eso arrancar cuesta más que mantener el movimiento. Valores de μ orientativos.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(MAT).map(function (k) { return { k: k, t: MAT[k].t }; }), "mm", function (k) { st.me = MAT[k].me; st.mc = MAT[k].mc; sl.me.set(st.me); sl.mc.set(st.mc); ajusta(); });
    ajusta();
  };

  // ============================================================
  // F10_ASCENSOR: peso aparente
  // ============================================================
  var PA = [
    { k: "r", t: "Parado o a velocidad constante", a: 0 },
    { k: "su", t: "Arranca hacia arriba (a = +2)", a: 2 },
    { k: "fr", t: "Frena subiendo (a = −2)", a: -2 },
    { k: "ba", t: "Arranca hacia abajo (a = −2)", a: -2 },
    { k: "li", t: "Cable roto (caída libre)", a: -9.8 }
  ];
  B.w.f10_ascensor = function (host) {
    var cuerpo = B.caja(host, "Simulador", "El ascensor y la báscula: peso aparente");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: 70, a: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -5, xmax: 5, ymin: -1, ymax: 7, w: 300, h: 330, limpio: true, etiqueta: "Persona sobre una báscula en un ascensor" });
    var gN = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: -10, xmax: 10, ymin: 0, ymax: 1500, w: 300, h: 330, etx: "a", ety: "N", etiqueta: "Lectura de la báscula frente a la aceleración" });
    sl.m = U.slider(ctl, { et: "Masa de la persona", min: 40, max: 100, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.a = U.slider(ctl, { et: "Aceleración a (↑ positiva)", min: -10, max: 10, step: 0.1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " m/s²"; } });
    function pinta() {
      var m = st.m, a = st.a, N = Math.max(0, D.balanza(m, a)), P = m * D.g, kg = N / D.g, escala = 3.2 / 1500;
      gE.limpiar();
      gE.poligono([[-3.6, -0.6], [3.6, -0.6], [3.6, 6.6], [-3.6, 6.6]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 2 });
      caja(gE, 0, 0, 2.6, 0.3, "z-hl", "var(--ink)");                              // báscula
      caja(gE, 0, 0.3, 1.0, 2.4, "z-ok", "var(--ok)"); gE.punto(0, 3.2, { r: 11, clase: "c-ok" });          // persona
      gE.texto(-1.45, 0.15, f2(kg, 1) + " kg", { ancla: "end", dy: 4 });
      vec(gE, 0, 1.4, 0, 1.4 - P * escala, "c-ink", "P", { dx: 8, dy: 12 });
      vec(gE, 1.3, 0.3, 1.3, 0.3 + N * escala, "c-ok", "N", { dx: 8, dy: 4 });
      if (Math.abs(a) > 0.05) vec(gE, -2.6, 3.5, -2.6, 3.5 + Math.max(-2.2, Math.min(2.2, a * 0.35)), "c-red", "a", { dx: 8, dy: 4 });
      gN.rango(-10, 10, 0, Math.ceil(2 * m * D.g / 100) * 100 * 1.0 + 100); gN.limpiar();
      gN.polilinea([[-10, 0], [-D.g, 0], [10, m * (D.g + 10)]], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      gN.segmento(-10, P, 10, P, { clase: "c-faint", dash: "4 4" }); gN.texto(10, P, "P = m·g", { dx: -4, dy: -6, ancla: "end", clase: "faint" });
      gN.punto(a, N, { r: 7, clase: "c-red" });
      var estado = Math.abs(a) < 0.05 ? "lectura normal: N = m·g" : a >= D.g - 0.05 ? "te notas el doble de pesado o más (N ≥ 2P)" : a < -D.g - 0.05 ? "el ascensor cae más deprisa que tú: te quedas pegado al techo (N = 0)" : a <= -D.g + 0.05 ? "caída libre: ingravidez aparente (N = 0)" : a > 0 ? "te notas más pesado (N &gt; P)" : "te notas más ligero (N &lt; P)";
      lectura.innerHTML = lec("Peso real  P = m·g", f2(P, 1) + " N", "") + lec("Lectura de la báscula  N = m(g + a)", f2(N, 1) + " N", "ok") + lec("En «kilos» aparentes  N/g", f2(kg, 1) + " kg", "pen") + lec("Sensación", estado, "ancho red") + lec("Fuerza neta  N − P = m·a", f2(N - P, 1) + " N", "");
      pie.innerHTML = "La báscula mide la <b>normal</b> N, no el peso. La 2.ª ley en vertical (eje ↑): N − m·g = m·a, luego <b>N = m(g + a)</b>. Si a es hacia arriba, N &gt; P; si es hacia abajo, N &lt; P; si a = −g (caída libre), N = 0: eso es la ingravidez de los astronautas. Fíjate en que la velocidad no importa, sólo la aceleración.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PA.map(function (p) { return { k: p.k, t: p.t }; }), "r", function (k) { var p = PA.filter(function (z) { return z.k === k; })[0]; st.a = p.a; sl.a.set(p.a); pinta(); });
    pinta();
  };

  // ============================================================
  // F10_EQUILIBRIO: un objeto colgado de dos cables
  // ============================================================
  B.w.f10_equilibrio = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Equilibrio: un objeto colgado de dos cables");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: 20, a1: 40, a2: 40 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 560, h: 340, limpio: true, etiqueta: "Objeto colgado de dos cables" });
    iso(g, -6, 6, -5, 5);
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 50, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " kg"; } });
    sl.a1 = U.slider(ctl, { et: "Ángulo cable izq. α₁", min: 5, max: 85, step: 1, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.a2 = U.slider(ctl, { et: "Ángulo cable dcho. α₂", min: 5, max: 85, step: 1, val: st.a2, on: function (v) { st.a2 = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    function pinta() {
      var P = st.m * D.g, a1 = st.a1 * R, a2 = st.a2 * R, s = Math.sin(a1 + a2), T1 = P * Math.cos(a2) / s, T2 = P * Math.cos(a1) / s, mx = Math.max(T1, T2, P), k = 3.4 / mx;
      g.limpiar();
      g.segmento(0, 0, -4.4 * Math.cos(a1), 4.4 * Math.sin(a1), { clase: "c-ink" }).setAttribute("stroke-width", 2.5);
      g.segmento(0, 0, 4.4 * Math.cos(a2), 4.4 * Math.sin(a2), { clase: "c-ink" }).setAttribute("stroke-width", 2.5);
      g.punto(-4.4 * Math.cos(a1), 4.4 * Math.sin(a1), { r: 5, clase: "c-faint" }); g.punto(4.4 * Math.cos(a2), 4.4 * Math.sin(a2), { r: 5, clase: "c-faint" });
      g.segmento(0, 0, 0, -0.5, { clase: "c-ink" }); caja(g, 0, -1.5, 1.0 + st.m / 50 * 0.6, 1.0, "z-hl", "var(--ink)"); g.texto(0, -1.0, f2(st.m, 0) + " kg", { ancla: "middle", dy: 4 });
      vec(g, 0, 0, -T1 * k * Math.cos(a1), T1 * k * Math.sin(a1), "c-pen", "T₁", { dx: -8, ancla: "end" });
      vec(g, 0, 0, T2 * k * Math.cos(a2), T2 * k * Math.sin(a2), "c-ok", "T₂", { dx: 8 });
      vec(g, 0, -1.0, 0, -1.0 - P * k, "c-red", "P", { dx: 8, dy: 14 });
      g.punto(0, 0, { r: 4, clase: "c-ink" });
      var Fx = -T1 * Math.cos(a1) + T2 * Math.cos(a2), Fy = T1 * Math.sin(a1) + T2 * Math.sin(a2) - P;
      lectura.innerHTML = lec("Peso  P = m·g", f2(P, 1) + " N", "red") + lec("Tensión T₁ = P·cos α₂ / sen(α₁+α₂)", f2(T1, 1) + " N", "pen") + lec("Tensión T₂ = P·cos α₁ / sen(α₁+α₂)", f2(T2, 1) + " N", "ok") +
        lec("ΣF<sub>x</sub> = T₂cos α₂ − T₁cos α₁", f2(Math.abs(Fx) < 1e-6 ? 0 : Fx, 2) + " N") + lec("ΣF<sub>y</sub> = T₁sen α₁ + T₂sen α₂ − P", f2(Math.abs(Fy) < 1e-6 ? 0 : Fy, 2) + " N") +
        lec("Comparación con el peso", T1 > P || T2 > P ? "una tensión es MAYOR que el peso: cuanto más abiertos los cables, más se tensan" : "las dos tensiones son menores que el peso", "ancho " + (T1 > P || T2 > P ? "red" : "ok"));
      pie.innerHTML = "El objeto está en <b>equilibrio</b>: ΣF = 0. Horizontalmente, T₁cos α₁ = T₂cos α₂ (los cables más tumbados soportan más); verticalmente, T₁sen α₁ + T₂sen α₂ = m·g. Si los dos ángulos son iguales, T₁ = T₂ = m·g/(2 sen α). Prueba a acercar α a 0°: la tensión se dispara, y por eso <b>un cable nunca puede quedar perfectamente horizontal</b> aguantando un peso.";
    }
    pinta();
  };
})(window);
