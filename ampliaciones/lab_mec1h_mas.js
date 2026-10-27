/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 13: movimiento armónico simple)
   motor B.lab.mas + f13_mas · f13_fase · f13_fasor · f13_energia · f13_hooke · f13_leer
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, M = B.lab.mec1;
  B.lab = B.lab || {};
  var S = B.lab.mas = {};
  var PI = Math.PI, R = PI / 180, g0 = 9.8;
  S.g = g0;

  // ------------------------------------------------------------
  // Motor: MAS, péndulo, amortiguamiento y resonancia
  // ------------------------------------------------------------
  S.omega = function (k, m) { return Math.sqrt(k / m); };
  S.x = function (A, w, ph, t) { return A * Math.cos(w * t + ph); };
  S.v = function (A, w, ph, t) { return -A * w * Math.sin(w * t + ph); };
  S.a = function (A, w, ph, t) { return -A * w * w * Math.cos(w * t + ph); };
  S.agm = function (a, b) { var i, t; for (i = 0; i < 30; i++) { t = (a + b) / 2; b = Math.sqrt(a * b); a = t; if (Math.abs(a - b) < 1e-15) break; } return a; };
  S.Tpend = function (l, g, th0Grados) { return 2 * PI * Math.sqrt(l / g) / S.agm(1, Math.cos(th0Grados * R / 2)); };      // periodo exacto del péndulo simple
  S.pendulo = function (l, g, th0Grados, tmax, n) {                    // θ(t) por Runge–Kutta 4: devuelve { t:[], th:[] } en radianes
    var th = th0Grados * R, om = 0, dt = tmax / n, t = [0], y = [th], i, f = function (q, w) { return [w, -(g / l) * Math.sin(q)]; }, k1, k2, k3, k4;
    for (i = 0; i < n; i++) {
      k1 = f(th, om); k2 = f(th + dt / 2 * k1[0], om + dt / 2 * k1[1]); k3 = f(th + dt / 2 * k2[0], om + dt / 2 * k2[1]); k4 = f(th + dt * k3[0], om + dt * k3[1]);
      th += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); om += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      t.push((i + 1) * dt); y.push(th);
    }
    return { t: t, th: y };
  };
  S.amort = function (w0, gam, t) {                                   // x(0) = 1, v(0) = 0
    if (Math.abs(gam - w0) < 1e-9) return (1 + gam * t) * Math.exp(-gam * t);
    if (gam < w0) { var wd = Math.sqrt(w0 * w0 - gam * gam); return Math.exp(-gam * t) * (Math.cos(wd * t) + gam / wd * Math.sin(wd * t)); }
    var s = Math.sqrt(gam * gam - w0 * w0), r1 = -gam + s, r2 = -gam - s; return (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  };
  S.resp = function (w0, gam, w) { return w0 * w0 / Math.sqrt(Math.pow(w0 * w0 - w * w, 2) + Math.pow(2 * gam * w, 2)); };   // amplitud / amplitud estática
  S.fase = function (w0, gam, w) { return Math.atan2(2 * gam * w, w0 * w0 - w * w); };                                     // retraso de la respuesta (0 … π)

  // ------------------------------------------------------------
  // Auxiliares de interfaz
  // ------------------------------------------------------------
  function lec(r, v, c) { return U.lec(r, v, c); }
  function f2(x, d) { return fmt(x, d == null ? 2 : d); }
  function cs(x) { var a = Math.abs(x); return a !== 0 && (a < 0.01 || a >= 1e4) ? U.cient(x, 3) : a >= 100 ? fmt(x, 1) : a >= 10 ? fmt(x, 2) : fmt(x, 3); }
  S.cs = cs;
  function muelleH(g, xa, xb, y, n, amp) {            // muelle horizontal (zigzag) entre xa y xb
    var pts = [[xa, y]], i, dx = (xb - xa) / n;
    for (i = 0; i < n; i++) pts.push([xa + dx * (i + 0.5), y + (i % 2 ? -amp : amp)]);
    pts.push([xb, y]);
    return g.polilinea(pts, { clase: "c-ink" });
  }
  function muelleV(g, x, ya, yb, n, amp) {            // muelle vertical entre ya y yb
    var pts = [[x, ya]], i, dy = (yb - ya) / n;
    for (i = 0; i < n; i++) pts.push([x + (i % 2 ? -amp : amp), ya + dy * (i + 0.5)]);
    pts.push([x, yb]);
    return g.polilinea(pts, { clase: "c-ink" });
  }
  S.muelleH = muelleH; S.muelleV = muelleV;
  function rect(g, cx, cy, w, h, clase, borde) { return g.poligono([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], { clase: clase || "z-hl", borde: borde || "var(--ink)", grosor: 1.8 }); }
  S.rect = rect;
  function flecha(g, x0, y0, x1, y1, clase, rotulo, o) {
    o = o || {};
    if (Math.hypot(x1 - x0, y1 - y0) < 1e-9) return;
    U.flecha(g, x0, y0, x1, y1, { clase: clase, grosor: o.grosor || 3, punta: o.punta });
    if (rotulo) g.texto(x1, y1, rotulo, { dx: o.dx == null ? 6 : o.dx, dy: o.dy == null ? -6 : o.dy, clase: clase.replace("c-", ""), ancla: o.ancla });
  }
  S.flecha = flecha;
  function bucle(st, dt, T2, kvel) { st.t = (st.t + dt * kvel) % T2; }

  // ============================================================
  // F13_MAS: masa unida a un muelle horizontal y sus tres gráficas
  // ============================================================
  B.w.f13_mas = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Masa y muelle: el MAS y sus gráficas x–t, v–t y a–t");
    cuerpo.innerHTML = '<div class="f8-escena"></div><div class="f8-trio"><div></div><div></div><div></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { A: 0.3, k: 40, m: 1, ph: 0, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gE = new B.Plot(cuerpo.querySelector(".f8-escena"), { xmin: -0.95, xmax: 0.75, ymin: -0.4, ymax: 0.45, w: 640, h: 190, limpio: true, etiqueta: "Masa unida a un muelle sobre una mesa sin rozamiento" });
    var T3 = Array.prototype.slice.call(cuerpo.querySelectorAll(".f8-trio > div")), gx = M.plotT(T3[0], "t", "x", "Elongación frente al tiempo"), gv = M.plotT(T3[1], "t", "v", "Velocidad frente al tiempo"), ga = M.plotT(T3[2], "t", "a", "Aceleración frente al tiempo");
    sl.A = U.slider(ctl, { et: "Amplitud A", min: 0.05, max: 0.5, step: 0.01, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " m"; } });
    sl.k = U.slider(ctl, { et: "Constante k", min: 10, max: 200, step: 5, val: st.k, on: function (v) { st.k = v; ajusta(); }, fmt: function (v) { return f2(v, 0) + " N/m"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.1, max: 5, step: 0.1, val: st.m, on: function (v) { st.m = v; ajusta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.ph = U.slider(ctl, { et: "Fase inicial φ₀", min: -180, max: 180, step: 15, val: st.ph, on: function (v) { st.ph = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    sl.t = U.slider(ctl, { et: "Tiempo t", min: 0, max: 2, step: 0.01, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " s"; } });
    function per() { return 2 * PI / S.omega(st.k, st.m); }
    function ajusta() { var T2 = 2 * per(); sl.t.input.max = T2; sl.t.input.step = T2 / 200; st.t = Math.min(st.t, T2); sl.t.set(st.t); pinta(); }
    var an = U.animar(ctl, function (t, dt, reinicio) {
      var T = per(), kv = Math.min(1, T / 1.6);
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { bucle(st, dt, 2 * T, kv); sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var w = S.omega(st.k, st.m), T = 2 * PI / w, ph = st.ph * R, A = st.A, t = st.t, x = S.x(A, w, ph, t), v = S.v(A, w, ph, t), a = S.a(A, w, ph, t), i, n = 160, T2 = 2 * T;
      gE.limpiar(); gE.segmento(-0.95, -0.1, 0.75, -0.1, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      gE.segmento(-0.8, -0.1, -0.8, 0.3, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      gE.segmento(-A, -0.12, -A, -0.2, { clase: "c-faint", dash: "3 3" }); gE.segmento(A, -0.12, A, -0.2, { clase: "c-faint", dash: "3 3" }); gE.segmento(0, -0.12, 0, -0.2, { clase: "c-red" });
      gE.texto(-A, -0.2, "−A", { ancla: "middle", dy: 14, clase: "faint" }); gE.texto(A, -0.2, "+A", { ancla: "middle", dy: 14, clase: "faint" }); gE.texto(0, -0.2, "0", { ancla: "middle", dy: 14, clase: "red" });
      muelleH(gE, -0.8, x - 0.07, 0.07, 14, 0.05); rect(gE, x, 0.0, 0.14, 0.14, "z-pen", "var(--pen)"); gE.punto(x - 0.04, -0.09, { r: 4, clase: "c-ink" }); gE.punto(x + 0.04, -0.09, { r: 4, clase: "c-ink" });
      var Fx = -st.k * x, kf = 0.45 / (st.k * 0.5);
      if (Math.abs(Fx) > 1e-6) flecha(gE, x, 0.2, x + Fx * kf, 0.2, "c-red", "F", { dy: -8 });
      var xs = [], vs = [], as = [], ts = [];
      for (i = 0; i <= n; i++) { var ti = T2 * i / n; xs.push([ti, S.x(A, w, ph, ti)]); vs.push([ti, S.v(A, w, ph, ti)]); as.push([ti, S.a(A, w, ph, ti)]); }
      var vm = A * w, am = A * w * w;
      gx.rango(0, T2, -A * 1.2, A * 1.2); gx.limpiar(); gx.polilinea(xs, { clase: "c-pen" }).setAttribute("stroke-width", 3); gx.segmento(t, 0, t, x, { clase: "c-faint", dash: "3 4" }); gx.punto(t, x, { r: 6, clase: "c-red" });
      gv.rango(0, T2, -vm * 1.2, vm * 1.2); gv.limpiar(); gv.polilinea(vs, { clase: "c-ok" }).setAttribute("stroke-width", 3); gv.segmento(t, 0, t, v, { clase: "c-faint", dash: "3 4" }); gv.punto(t, v, { r: 6, clase: "c-red" });
      ga.rango(0, T2, -am * 1.2, am * 1.2); ga.limpiar(); ga.polilinea(as, { clase: "c-red" }).setAttribute("stroke-width", 3); ga.segmento(t, 0, t, a, { clase: "c-faint", dash: "3 4" }); ga.punto(t, a, { r: 6, clase: "c-red" });
      lectura.innerHTML = lec("Frecuencia angular  ω = √(k/m)", f2(w, 3) + " rad/s", "pen") + lec("Periodo  T = 2π/ω = 2π√(m/k)", f2(T, 3) + " s", "pen") + lec("Frecuencia  f = 1/T", f2(1 / T, 3) + " Hz", "pen") +
        lec("Velocidad máxima  A·ω", f2(vm, 3) + " m/s", "ok") + lec("Aceleración máxima  A·ω²", f2(am, 3) + " m/s²", "red") + lec("Fuerza máxima  k·A", f2(st.k * A, 2) + " N", "") +
        lec("Elongación x(t)", f2(x, 3) + " m", "pen") + lec("Velocidad v(t)", f2(v, 3) + " m/s", "ok") + lec("Aceleración a(t) = −ω²·x", f2(a, 3) + " m/s²", "red");
      pie.innerHTML = "La masa oscila entre −A y +A. La fuerza del muelle F = −k·x apunta siempre al centro (flecha roja). <b>El periodo sólo depende de k y m</b>: cambia la amplitud y verás que T no varía. Cambiando la fase φ₀ se desplazan las tres curvas. La velocidad es máxima al pasar por x = 0 y nula en los extremos; la aceleración es máxima en los extremos y nula en el centro. " + (T < 1.6 ? "El movimiento se reproduce a cámara lenta (el periodo real es de " + f2(T, 2) + " s)." : "");
    }
    ajusta();
  };

  // ============================================================
  // F13_FASE: x = A·cos(ω·t + φ₀)
  // ============================================================
  var PF = [
    { k: "0", t: "φ₀ = 0: parte de +A", ph: 0 },
    { k: "m90", t: "φ₀ = −90°: parte de 0 hacia +", ph: -90 },
    { k: "p90", t: "φ₀ = +90°: parte de 0 hacia −", ph: 90 },
    { k: "180", t: "φ₀ = 180°: parte de −A", ph: 180 },
    { k: "60", t: "φ₀ = 60°: caso general", ph: 60 }
  ];
  B.w.f13_fase = function (host) {
    var cuerpo = B.caja(host, "Simulador", "La ecuación x = A·cos(ω·t + φ₀): amplitud, frecuencia y fase");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { A: 2, w: 2, ph: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 6, ymin: -3.4, ymax: 3.4, w: 600, h: 300, etx: "t (s)", ety: "x", etiqueta: "Elongación frente al tiempo" });
    sl.A = U.slider(ctl, { et: "Amplitud A", min: 0.5, max: 3, step: 0.1, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " m"; } });
    sl.w = U.slider(ctl, { et: "Frecuencia angular ω", min: 0.5, max: 6, step: 0.1, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " rad/s"; } });
    sl.ph = U.slider(ctl, { et: "Fase inicial φ₀", min: -180, max: 180, step: 5, val: st.ph, on: function (v) { st.ph = v; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    function pinta() {
      var A = st.A, w = st.w, ph = st.ph * R, T = 2 * PI / w, tmax = Math.max(2 * T, 4), x0 = S.x(A, w, ph, 0), v0 = S.v(A, w, ph, 0), tm = ((-ph / w) % T + T) % T;
      g.rango(0, tmax, -3.4, 3.4); g.limpiar();
      g.curva(function (t) { return Math.cos(w * t); }, { clase: "c-faint", dash: "5 4", n: 300 });
      g.horizontal(A, { clase: "c-ok", dash: "4 4" }); g.horizontal(-A, { clase: "c-ok", dash: "4 4" });
      g.curva(function (t) { return S.x(A, w, ph, t); }, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      g.punto(0, x0, { r: 6, clase: "c-red" }); g.punto(tm, A, { r: 5, clase: "c-ok" });
      g.texto(tmax, A, "+A", { dx: -4, dy: -6, ancla: "end", clase: "ok" });
      g.segmento(tm, 0, tm + T, 0, { clase: "c-red" }).setAttribute("stroke-width", 2.5); g.texto(tm + T / 2, 0, "T", { ancla: "middle", dy: 15, clase: "red" });
      lectura.innerHTML = lec("Periodo  T = 2π/ω", f2(T, 3) + " s", "pen") + lec("Frecuencia  f = ω/2π", f2(w / (2 * PI), 3) + " Hz", "pen") + lec("Elongación inicial  x(0) = A·cos φ₀", f2(x0, 3) + " m", "red") +
        lec("Velocidad inicial  v(0) = −A·ω·sen φ₀", f2(v0, 3) + " m/s" + (Math.abs(v0) < 1e-9 ? " (parte del reposo)" : v0 > 0 ? " (hacia +)" : " (hacia −)"), "ok") + lec("Primer máximo en  t = −φ₀/ω", f2(tm, 3) + " s", "") +
        lec("En forma seno", "x = A·sen(ω·t + " + f2(st.ph + 90, 0) + "°)", "ancho");
      pie.innerHTML = "La curva azul es x(t); la discontinua gris es la de referencia x = cos(ω·t) (φ₀ = 0). Un <b>φ₀ positivo adelanta</b> la curva (el movimiento ya va «avanzado» en t = 0, el máximo llega antes de lo normal) y uno negativo la retrasa. La amplitud A estira la curva en vertical y ω la comprime en horizontal (T = 2π/ω). La fase inicial se calcula con las condiciones iniciales (x₀ y v₀).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PF.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { var p = PF.filter(function (z) { return z.k === k; })[0]; st.ph = p.ph; sl.ph.set(p.ph); pinta(); });
    pinta();
  };

  // ============================================================
  // F13_FASOR: el MAS como proyección de un vector giratorio (x, v y a)
  // ============================================================
  B.w.f13_fasor = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Fasores: posición, velocidad y aceleración desfasadas");
    cuerpo.innerHTML = '<div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { A: 0.5, w: 4, th: 0.6 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var gC = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -1.3, xmax: 1.3, ymin: -1.3, ymax: 1.3, w: 320, h: 320, limpio: true, etiqueta: "Vectores giratorios" });
    var gW = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 2 * PI, ymin: -3.9, ymax: 3.9, w: 320, h: 320, etx: "θ (rad)", ety: "", sinY: true, etiqueta: "x, v y a frente al ángulo" });
    B.lab.din.iso(gC, -1.3, 1.3, -1.3, 1.3);
    sl.A = U.slider(ctl, { et: "Amplitud A", min: 0.1, max: 1, step: 0.05, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " m"; } });
    sl.w = U.slider(ctl, { et: "Frecuencia angular ω", min: 1, max: 10, step: 0.5, val: st.w, on: function (v) { st.w = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " rad/s"; } });
    sl.th = U.slider(ctl, { et: "Ángulo θ = ω·t", min: 0, max: 360, step: 1, val: 34, on: function (v) { st.th = v * R; pinta(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.th = 0; sl.th.set(0); pinta(); return; }
      if (dt) { st.th = (st.th + dt * 1.4) % (2 * PI); sl.th.set(st.th / R); pinta(); }
    }, { auto: false });
    function pinta() {
      var A = st.A, w = st.w, th = st.th, x = A * Math.cos(th), v = -A * w * Math.sin(th), a = -A * w * w * Math.cos(th), nx = Math.cos(th), nv = -Math.sin(th), na = -Math.cos(th);
      gC.limpiar(); gC.arco(0, 0, 1, 0, 360, { clase: "c-faint" }); gC.horizontal(0, { clase: "c-faint", dash: "2 4" }); gC.vertical(0, { clase: "c-faint", dash: "2 4" });
      flecha(gC, 0, 0, Math.cos(th), Math.sin(th), "c-pen", "x", { dx: 8, dy: -6 });
      flecha(gC, 0, 0, Math.cos(th + PI / 2), Math.sin(th + PI / 2), "c-ok", "v", { dx: 8, dy: -6 });
      flecha(gC, 0, 0, Math.cos(th + PI), Math.sin(th + PI), "c-red", "a", { dx: 8, dy: -6 });
      gC.segmento(nx, 0, nx, Math.sin(th), { clase: "c-pen", dash: "3 3" }); gC.punto(nx, 0, { r: 5, clase: "c-pen" });
      gC.segmento(nv, 0, nv, Math.sin(th + PI / 2), { clase: "c-ok", dash: "3 3" }); gC.punto(nv, 0, { r: 4, clase: "c-ok" });
      gC.arco(0, 0, 0.3, th / R, th / R + 90, { clase: "c-ok" });
      // ondas: tres curvas separadas verticalmente (normalizadas)
      gW.limpiar();
      [[2.6, "c-pen", function (q) { return Math.cos(q); }, "x"], [0, "c-ok", function (q) { return -Math.sin(q); }, "v"], [-2.6, "c-red", function (q) { return -Math.cos(q); }, "a"]].forEach(function (c) {
        gW.segmento(0, c[0], 2 * PI, c[0], { clase: "c-faint", dash: "2 4" });
        gW.curva(function (q) { return c[0] + c[2](q); }, { clase: c[1], n: 160 }).setAttribute("stroke-width", 2.8);
        gW.punto(th, c[0] + c[2](th), { r: 6, clase: c[1] === "c-ok" ? "c-ok" : c[1] === "c-red" ? "c-red" : "c-pen" }); gW.texto(0, c[0] + 0.1, c[3], { dx: 4, dy: -12, clase: c[1].replace("c-", "") });
      });
      gW.segmento(th, -3.8, th, 3.8, { clase: "c-faint", dash: "3 4" });
      lectura.innerHTML = lec("Elongación  x = A·cos θ", f2(x, 3) + " m", "pen") + lec("Velocidad  v = −A·ω·sen θ", f2(v, 3) + " m/s", "ok") + lec("Aceleración  a = −A·ω²·cos θ", f2(a, 3) + " m/s²", "red") +
        lec("Relación a = −ω²·x", f2(-w * w * x, 3) + " m/s² (= a)", "") + lec("Con x = " + f2(x, 3) + " m: v = ±ω√(A² − x²)", "±" + f2(w * Math.sqrt(Math.max(0, A * A - x * x)), 3) + " m/s", "");
      pie.innerHTML = "Cada magnitud es la <b>proyección sobre el eje horizontal</b> de un vector que gira: el vector de la velocidad (verde) va <b>90° por delante</b> del de la posición (azul), y el de la aceleración (rojo) va <b>180° por delante</b>, es decir, en sentido opuesto. Por eso, cuando x es máximo, v es cero; cuando x es cero, |v| es máxima; y a siempre tiene el signo contrario de x. Las tres gráficas de la derecha están normalizadas.";
    }
    pinta();
  };

  // ============================================================
  // F13_ENERGIA: energía cinética, potencial y mecánica
  // ============================================================
  var PEN = [
    { k: "0", t: "x = 0 (centro)", f: 0 },
    { k: "h", t: "x = A/2", f: 0.5 },
    { k: "ig", t: "E<sub>c</sub> = E<sub>p</sub> (x = A/√2)", f: Math.SQRT1_2 },
    { k: "A", t: "x = A (extremo)", f: 1 }
  ];
  B.w.f13_energia = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Energía en el MAS: cinética, potencial y mecánica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { A: 0.2, k: 50, m: 0.5, t: 0, xf: 0.5 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    var g1 = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -1, xmax: 1, ymin: 0, ymax: 1, w: 320, h: 300, etx: "x/A", ety: "E (J)", etiqueta: "Energías frente a la elongación" });
    var g2 = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 1, ymin: 0, ymax: 1, w: 320, h: 300, etx: "t/T", ety: "E (J)", etiqueta: "Energías frente al tiempo" });
    sl.A = U.slider(ctl, { et: "Amplitud A", min: 0.05, max: 0.5, step: 0.01, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " m"; } });
    sl.k = U.slider(ctl, { et: "Constante k", min: 10, max: 200, step: 5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " N/m"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.1, max: 2, step: 0.1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 1) + " kg"; } });
    sl.t = U.slider(ctl, { et: "Instante t/T", min: 0, max: 1, step: 0.005, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 3) + " T"; } });
    U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.t = 0; sl.t.set(0); pinta(); return; }
      if (dt) { st.t = (st.t + dt * 0.25) % 1; sl.t.set(st.t); pinta(); }
    }, { auto: false });
    function pinta() {
      var A = st.A, k = st.k, m = st.m, Em = 0.5 * k * A * A, w = S.omega(k, m), q = st.t, th = 2 * PI * q, x = A * Math.cos(th), Ep = 0.5 * k * x * x, Ec = Em - Ep, v = -A * w * Math.sin(th);
      g1.rango(-1, 1, 0, Em * 1.15); g1.limpiar();
      g1.curva(function (u) { return Em * u * u; }, { clase: "c-pen", n: 160 }).setAttribute("stroke-width", 3); g1.curva(function (u) { return Em * (1 - u * u); }, { clase: "c-ok", n: 160 }).setAttribute("stroke-width", 3);
      g1.horizontal(Em, { clase: "c-ink" }).setAttribute("stroke-width", 2.5);
      g1.texto(-0.6, Em, "Em", { dy: -6, ancla: "middle" }); g1.segmento(x / A, 0, x / A, Em, { clase: "c-faint", dash: "3 4" }); g1.punto(x / A, Ep, { r: 6, clase: "c-pen" }); g1.punto(x / A, Ec, { r: 6, clase: "c-ok" });
      g2.rango(0, 1, 0, Em * 1.15); g2.limpiar();
      g2.curva(function (u) { return Em * Math.pow(Math.cos(2 * PI * u), 2); }, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3); g2.curva(function (u) { return Em * Math.pow(Math.sin(2 * PI * u), 2); }, { clase: "c-ok", n: 200 }).setAttribute("stroke-width", 3);
      g2.horizontal(Em, { clase: "c-ink" }).setAttribute("stroke-width", 2.5); g2.segmento(q, 0, q, Em, { clase: "c-faint", dash: "3 4" }); g2.punto(q, Ep, { r: 6, clase: "c-pen" }); g2.punto(q, Ec, { r: 6, clase: "c-ok" });
      lectura.innerHTML = lec("Elongación x = A·cos(2π·t/T)", f2(x, 3) + " m", "") + lec("Energía mecánica  ½·k·A²", f2(Em, 4) + " J", "") + lec("Energía potencial  ½·k·x²", f2(Ep, 4) + " J  (" + f2(Ep / Em * 100, 0) + " %)", "pen") +
        lec("Energía cinética  ½·m·v²", f2(Ec, 4) + " J  (" + f2(Ec / Em * 100, 0) + " %)", "ok") + lec("Velocidad v = ±ω√(A² − x²)", f2(Math.abs(v), 3) + " m/s", "") + lec("Comprobación  E<sub>c</sub> + E<sub>p</sub>", f2(Ec + Ep, 4) + " J = E<sub>m</sub>", "ok");
      pie.innerHTML = "La energía mecánica <b>E<sub>m</sub> = ½·k·A²</b> se mantiene constante (línea negra). La potencial (azul) es una parábola en x, máxima en los extremos y nula en el centro; la cinética (verde) es la parábola invertida: E<sub>c</sub> = ½·k·(A² − x²). A la derecha se ve que, en el tiempo, <b>la energía oscila con frecuencia doble</b> que la del movimiento (dos máximos de cada una por periodo). Se igualan en x = ±A/√2.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PEN.map(function (p) { return { k: p.k, t: p.t }; }), "", function (k) { var p = PEN.filter(function (z) { return z.k === k; })[0], q = Math.acos(p.f) / (2 * PI); st.t = q; sl.t.set(q); pinta(); });
    pinta();
  };

  // ============================================================
  // F13_HOOKE: laboratorio virtual para medir la constante de un muelle
  // ============================================================
  var MU = [{ k: "bl", t: "Muelle blando", K: 20 }, { k: "me", t: "Muelle medio", K: 50 }, { k: "du", t: "Muelle duro", K: 120 }];
  var RUIDO = [0.002, -0.003, 0.001, -0.002, 0.003, -0.001, 0.002, -0.002, 0.001, -0.003];
  B.w.f13_hooke = function (host) {
    var cuerpo = B.caja(host, "Laboratorio", "Ley de Hooke: mide la constante k de un muelle");
    cuerpo.innerHTML = '<div data-mu class="chips"></div><div class="f8-dos"><div data-g1></div><div data-g2></div></div><div data-ctl></div><div data-bt class="chips"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { K: 50, m: 0.5, pts: [] }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, FL = 10;
    var gE = new B.Plot(cuerpo.querySelector("[data-g1]"), { xmin: -2.4, xmax: 2.4, ymin: -4.6, ymax: 1, w: 300, h: 330, limpio: true, etiqueta: "Muelle con una masa colgada" });
    var gF = new B.Plot(cuerpo.querySelector("[data-g2]"), { xmin: 0, xmax: 0.6, ymin: 0, ymax: 16, w: 330, h: 330, etx: "x (m)", ety: "F (N)", etiqueta: "Fuerza frente a alargamiento" });
    sl.m = U.slider(ctl, { et: "Masa colgada", min: 0, max: 1.5, step: 0.05, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return f2(v, 2) + " kg"; } });
    function est(m) {                                  // alargamiento: lineal hasta el límite elástico (F = 10 N) y más blando después
      var F = m * g0, xl = FL / st.K;
      return F <= FL ? F / st.K : xl + (F - FL) / (st.K / 4);
    }
    var bt = cuerpo.querySelector("[data-bt]");
    U.boton(bt, "＋ Anotar medida", function () { var i = st.pts.length; if (i >= 12) return; var F = st.m * g0, x = est(st.m) + RUIDO[i % RUIDO.length]; st.pts.push([x, F]); pinta(); });
    U.boton(bt, "Borrar medidas", function () { st.pts = []; pinta(); });
    function ajuste() {
      var n = st.pts.length; if (n < 2) return null;
      var sx = 0, sy = 0, sxx = 0, sxy = 0, i;
      for (i = 0; i < n; i++) { sx += st.pts[i][0]; sy += st.pts[i][1]; sxx += st.pts[i][0] * st.pts[i][0]; sxy += st.pts[i][0] * st.pts[i][1]; }
      var den = n * sxx - sx * sx; if (Math.abs(den) < 1e-12) return null;
      var m_ = (n * sxy - sx * sy) / den; return { k: m_, b: (sy - m_ * sx) / n };
    }
    S.ajuste = function (pts) { var s = st.pts; st.pts = pts; var r = ajuste(); st.pts = s; return r; };
    function pinta() {
      var m = st.m, x = est(m), F = m * g0, xl = FL / st.K, enLimite = F > FL + 1e-9, i, aj = ajuste(), xmax = est(1.5) * 1.08;
      gE.limpiar(); gE.segmento(-1.6, 0.6, 1.6, 0.6, { clase: "c-ink" }).setAttribute("stroke-width", 5);
      var L0 = 1.2, yb = 0.6 - L0 - x * (2.2 / xmax);       // el alargamiento se dibuja ampliado
      muelleV(gE, 0, 0.6, yb, 14, 0.28);
      rect(gE, 0, yb - 0.45, 0.9, 0.9, m > 0 ? "z-pen" : "z-hl", "var(--pen)"); if (m > 0) gE.texto(0, yb - 0.45, f2(m, 2) + " kg", { ancla: "middle", dy: 4 });
      gE.segmento(0.6, 0.6 - L0, 1.5, 0.6 - L0, { clase: "c-faint", dash: "3 3" }); gE.texto(-1.2, 0.6 - L0, "L₀", { dy: 4, clase: "faint" });
      if (x > 0.001) { gE.segmento(0.9, 0.6 - L0, 0.9, yb, { clase: "c-red" }).setAttribute("stroke-width", 3); gE.texto(1.0, (0.6 - L0 + yb) / 2, f2(x * 100, 1) + " cm", { clase: "red", dy: 4 }); }
      gF.rango(0, xmax, 0, 16); gF.limpiar();
      gF.segmento(0, 0, xl, FL, { clase: "c-faint" }).setAttribute("stroke-width", 2); gF.polilinea([[xl, FL], [xmax, FL + (xmax - xl) * st.K / 4]], { clase: "c-faint", dash: "4 4" });
      gF.texto(xl, FL, "límite elástico", { dx: 6, dy: 14, clase: "faint" });
      if (aj) { gF.segmento(0, aj.b, xmax, aj.b + aj.k * xmax, { clase: "c-ok" }).setAttribute("stroke-width", 2.5); }
      for (i = 0; i < st.pts.length; i++) gF.punto(st.pts[i][0], st.pts[i][1], { r: 5, clase: "c-pen" });
      gF.punto(x, F, { r: 7, clase: enLimite ? "c-red" : "c-ok" });
      lectura.innerHTML = lec("Fuerza (peso)  F = m·g", f2(F, 2) + " N", "") + lec("Alargamiento medido  x", f2(x * 100, 1) + " cm", "pen") + lec("Cociente F/x ahora", x > 0 ? f2(F / x, 1) + " N/m" : "—", enLimite ? "red" : "ok") +
        lec("Medidas anotadas", String(st.pts.length) + " (hacen falta ≥ 2)", "") + lec("k estimada (pendiente del ajuste)", aj ? f2(aj.k, 1) + " N/m" : "—", "ok") + lec("k real del muelle (para comparar)", f2(st.K, 0) + " N/m", "") +
        (enLimite ? lec("¡Cuidado!", "has superado el límite elástico: el muelle se deforma y deja de cumplir F = k·x", "ancho red") : "");
      pie.innerHTML = "Cuelga masas distintas, <b>anota</b> cada pareja (F, x) y mira cómo los puntos azules se alinean: <b>la pendiente de la recta F–x es la constante k</b> del muelle (F = k·x). Cada medida lleva un pequeño error de ± 3 mm, por eso los puntos no caen exactamente en la recta. Si la masa es excesiva, se supera el <b>límite elástico</b>: la gráfica se curva y el muelle ya no vuelve a su longitud inicial. Dibujo con el alargamiento ampliado.";
    }
    U.fichas(cuerpo.querySelector("[data-mu]"), MU.map(function (p) { return { k: p.k, t: p.t + " (k oculta)" }; }), "me", function (k) { st.K = MU.filter(function (z) { return z.k === k; })[0].K; st.pts = []; pinta(); });
    pinta();
  };

  // ============================================================
  // F13_LEER: entrenamiento con gráficas x–t
  // ============================================================
  var GXT = [
    { k: "A", t: "Gráfica A", tmax: 4, rg: [-0.3, 0.3], pts: [], curva: function (t) { return 0.2 * Math.cos(PI * t); }, preguntas: [
      { q: "¿Cuál es la amplitud?", op: ["0,2 m", "0,4 m", "0,1 m", "π m"], ok: 0, por: "La elongación máxima es 0,2 m (la curva sube a +0,2 y baja a −0,2)." },
      { q: "¿Cuál es el periodo?", op: ["2 s", "1 s", "4 s", "0,5 s"], ok: 0, por: "Entre dos máximos consecutivos (t = 0 y t = 2 s) pasan 2 s." },
      { q: "¿Y la frecuencia angular ω?", op: ["π rad/s", "2π rad/s", "π/2 rad/s", "2 rad/s"], ok: 0, por: "ω = 2π/T = 2π/2 = π rad/s." },
      { q: "¿Cuánto vale la fase inicial φ₀ si x = A·cos(ωt + φ₀)?", op: ["0", "π/2", "π", "−π/2"], ok: 0, por: "En t = 0 está en el máximo +A: cos φ₀ = 1, φ₀ = 0." } ] },
    { k: "B", t: "Gráfica B", tmax: 4, rg: [-0.3, 0.3], pts: [], curva: function (t) { return 0.25 * Math.sin(2 * PI * t / 2); }, preguntas: [
      { q: "¿Cuál es el periodo?", op: ["2 s", "4 s", "1 s", "0,25 s"], ok: 0, por: "La curva repite su forma cada 2 s (por ejemplo, vuelve a pasar por 0 hacia arriba en t = 2 s)." },
      { q: "¿Qué hace en t = 0?", op: ["Pasa por x = 0 moviéndose hacia valores positivos", "Está en +A", "Pasa por x = 0 hacia valores negativos", "Está en −A"], ok: 0, por: "x(0) = 0 y la curva sube: v(0) &gt; 0 (es un seno: φ₀ = −π/2 en forma coseno)." },
      { q: "¿En qué instante la velocidad es máxima y positiva (primera vez)?", op: ["t = 0", "t = 0,5 s", "t = 1 s", "t = 1,5 s"], ok: 0, por: "La velocidad es máxima al pasar por el centro: en t = 0 sube por x = 0 (v = +Aω)." },
      { q: "¿En qué instante la aceleración es mínima (la más negativa)?", op: ["t = 0,5 s", "t = 0", "t = 1 s", "t = 1,5 s"], ok: 0, por: "a = −ω²x: es la más negativa donde x es máxima (+A), en t = T/4 = 0,5 s." } ] },
    { k: "C", t: "Gráfica C", tmax: 3, rg: [-3.6, 3.6], pts: [], curva: function (t) { return 3 * Math.cos(2 * PI * t / 1.2 + PI); }, preguntas: [
      { q: "¿Cuál es la amplitud?", op: ["3 cm", "6 cm", "1,2 cm", "0"], ok: 0, por: "Oscila entre −3 y +3: A = 3 cm." },
      { q: "¿Cuál es la frecuencia?", op: ["0,83 Hz", "1,2 Hz", "5,2 Hz", "2 Hz"], ok: 0, por: "T = 1,2 s → f = 1/1,2 = 0,83 Hz." },
      { q: "¿Qué posición tiene en t = 0?", op: ["−A (extremo negativo)", "+A", "0", "A/2"], ok: 0, por: "Comienza en el valle: x(0) = −3 cm; la fase inicial es π (cos π = −1)." },
      { q: "¿Cuántas oscilaciones completas hace en 3 s?", op: ["2,5", "3", "1,2", "5"], ok: 0, por: "3 s / 1,2 s = 2,5 oscilaciones." } ] }
  ];
  B.w.f13_leer = function (host) { M.lector(host, "Entrenamiento", "Lee la gráfica elongación–tiempo de un MAS", GXT, "t (s)", "x", "Lee amplitud, periodo y fase directamente de la gráfica. Elige una respuesta en cada apartado."); };
})(window);
