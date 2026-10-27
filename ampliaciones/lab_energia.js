/* ============================================================
   Bachi para Firu · laboratorio de energía (Física y Química I, tema 12)
   datos B.lab.ener · f12_trabajo · f12_fx · f12_rampa · f12_montana · f12_pendulo
   f12_lanzamiento · f12_potencia · f12_sankey · f12_unidades
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var En = B.lab.ener = {};
  var PI = Math.PI, g0 = 9.8;
  En.g = g0;

  function cient(x, d) { return U.cient(x, d == null ? 3 : d); }
  function lec(r, v, c) { return U.lec(r, v, c); }
  function rad(a) { return a * PI / 180; }
  function cs(x) { var a = Math.abs(x); return a >= 1e6 || a < 1e-2 ? cient(x, 3) : a >= 100 ? fmt(x, 0) : a >= 10 ? fmt(x, 1) : fmt(x, 2); }
  function p10(x) { return Math.log(x) / Math.LN10; }
  // lienzo con la misma escala en ambos ejes que contiene el rectángulo [x0, x1] × [y0, y1]
  function iso(g, x0, x1, y0, y1) {
    var c = g.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj, s = Math.max((y1 - y0) / 2, (x1 - x0) / 2 * ph / pw);
    g.rangoIso((x0 + x1) / 2, (y0 + y1) / 2, s);
  }
  function plotDe(cuerpo, sel, o) { return new B.Plot(cuerpo.querySelector(sel), o); }
  function joules(E) {
    var a = Math.abs(E);
    return a >= 1e5 ? cient(E, 3) + " J" : a >= 100 ? fmt(E, 0) + " J" : a >= 1 ? fmt(E, 1) + " J" : fmt(E, 2) + " J";
  }
  En.joules = joules;

  // ============================================================
  // F12_TRABAJO: W = F·d·cos α
  // ============================================================
  var PT = [
    { t: "Tirar de un carrito (30°)", F: 40, a: 30, d: 6 },
    { t: "Empujar en horizontal (0°)", F: 40, a: 0, d: 6 },
    { t: "Llevar una maleta (90°)", F: 60, a: 90, d: 10 },
    { t: "Rozamiento que frena (180°)", F: 25, a: 180, d: 8 },
    { t: "Cuerda muy inclinada (60°)", F: 40, a: 60, d: 6 }
  ];
  B.w.f12_trabajo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El trabajo de una fuerza: W = F·d·cos α");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot" data-esc></div><div data-ctl></div><div class="w-plot" data-cur></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { F: 40, a: 30, d: 6 }, gE, gC, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    sl.F = U.slider(ctl, { et: "Fuerza F", min: 0, max: 100, step: 1, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " N"; } });
    sl.a = U.slider(ctl, { et: "Ángulo α", min: 0, max: 180, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + "°"; } });
    sl.d = U.slider(ctl, { et: "Desplazamiento d", min: 0, max: 20, step: 0.5, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " m"; } });
    function pinta() {
      var ar = rad(st.a), ca = Math.cos(ar), Fx = st.F * ca, W = Fx * st.d, k = 5 / 100, bw = 2.4, bh = 1.4, x0 = 2.5, x1 = 2.5 + st.d, yc = bh / 2;
      var cuadro = function (xc) { return [[xc - bw / 2, 0], [xc + bw / 2, 0], [xc + bw / 2, bh], [xc - bw / 2, bh]]; };
      iso(gE, -3.2, 24, -2.3, 6.6); gE.limpiar();
      gE.segmento(-3.2, 0, 24, 0, { clase: "c-ink" });
      var ini = cuadro(x0); ini.push(ini[0]); gE.polilinea(ini, { clase: "c-faint", dash: "4 3" });
      gE.poligono(cuadro(x1), { clase: "z-pen", borde: "var(--pen)", grosor: 1.6 });
      if (st.d > 0.4) { U.flecha(gE, x0, -0.9, x1, -0.9, { clase: "c-pen" }); gE.texto((x0 + x1) / 2, -0.9, "d = " + fmt(st.d, 1) + " m", { dy: 17, ancla: "middle", clase: "pen" }); }
      if (st.F > 1) {
        var tx = x0 + st.F * k * ca, ty = yc + st.F * k * Math.sin(ar);
        if (Math.abs(st.F * k * Math.sin(ar)) > 0.05) gE.segmento(tx, yc, tx, ty, { clase: "c-faint", dash: "3 3" });
        if (Math.abs(st.F * k * ca) > 0.05) { var l = gE.segmento(x0, yc, tx, yc, { clase: Fx >= 0 ? "c-ok" : "c-red", dash: "5 3" }); l.setAttribute("stroke-width", 4); }
        U.flecha(gE, x0, yc, tx, ty, { clase: "c-red", grosor: 3 });
        gE.texto(tx, ty, "F = " + fmt(st.F, 0) + " N", { dx: 6, dy: -8, clase: "red", ancla: tx > 14 ? "end" : "start" });
      }
      var mw = Math.max(st.F * st.d, 10) * 1.15, f = function (a) { return st.F * st.d * Math.cos(rad(a)); };
      gC.rango(0, 180, -mw, mw); gC.limpiar();
      gC.zona(f, 0, 90, { clase: "z-ok" }); gC.zona(f, 90, 180, { clase: "z-red" });
      gC.curva(f, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      gC.segmento(st.a, 0, st.a, W, { clase: "c-faint", dash: "4 3" });
      gC.punto(st.a, W, { r: 7, clase: W >= 0 ? "c-ok" : "c-red" });
      var signo = Math.abs(st.a - 90) < 0.5 ? "nulo: la fuerza es perpendicular al desplazamiento" : st.a < 90 ? "positivo: la fuerza ayuda al movimiento" : "negativo: la fuerza se opone al movimiento";
      lectura.innerHTML = lec("Componente a lo largo del desplazamiento F·cos α", fmt(Fx, 1) + " N", "pen") + lec("Trabajo W = F·d·cos α", joules(W), W >= 0 ? "ok" : "red") +
        lec("Signo del trabajo", signo, "ancho " + (W >= 0 ? "ok" : "red")) + lec("Máximo posible (α = 0°)  F·d", joules(st.F * st.d)) +
        lec("Fracción aprovechada  cos α", fmt(ca, 3), "pen");
      pie.innerHTML = "Arriba: el bloque se desplaza <b>d</b> hacia la derecha mientras tiras de él con una fuerza <b>F</b> inclinada un ángulo α. Sólo cuenta la parte de F que va <b>a lo largo del desplazamiento</b> (segmento discontinuo): F·cos α. Abajo: el trabajo W(α) es una cosinusoide: máximo a 0°, <b>nulo a 90°</b> (por eso la normal y el peso en un suelo horizontal no hacen trabajo) y <b>mínimo a 180°</b> (rozamiento: quita energía).";
    }
    gE = plotDe(cuerpo, "[data-esc]", { xmin: -3, xmax: 24, ymin: -2.4, ymax: 7.6, w: 600, h: 200, limpio: true, etiqueta: "Bloque arrastrado por una fuerza inclinada" });
    gC = plotDe(cuerpo, "[data-cur]", { xmin: 0, xmax: 180, ymin: -300, ymax: 300, w: 600, h: 230, etx: "α (°)", ety: "W (J)", etiqueta: "Trabajo en función del ángulo" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PT.map(function (p, i) { return { k: String(i), t: p.t }; }), "", function (k) { var p = PT[+k]; st.F = p.F; st.a = p.a; st.d = p.d; sl.F.set(p.F); sl.a.set(p.a); sl.d.set(p.d); pinta(); });
    pinta();
  };

  // ============================================================
  // F12_FX: el trabajo es el área bajo la curva F–x
  // ============================================================
  var PERFIL = {
    cte: { t: "Fuerza constante", f: function () { return 20; }, W: function (X) { return 20 * X; }, nota: "F = 20 N: el área es un rectángulo, W = F·x." },
    lin: { t: "Muelle F = 4·x", f: function (x) { return 4 * x; }, W: function (X) { return 2 * X * X; }, nota: "F = 4x (muelle de k = 4 N/m): el área es un triángulo, W = ½·k·x²." },
    dec: { t: "Fuerza que decrece", f: function (x) { return 40 - 3 * x; }, W: function (X) { return 40 * X - 1.5 * X * X; }, nota: "F = 40 − 3x: área de un trapecio, W = 40x − 1,5x²." },
    tro: { t: "Fuerza a trozos", f: function (x) { return x < 4 ? 30 : x < 7 ? 10 : -10; }, W: function (X) { return 30 * Math.min(X, 4) + 10 * Math.max(0, Math.min(X, 7) - 4) - 10 * Math.max(0, X - 7); }, nota: "30 N hasta 4 m, 10 N hasta 7 m y −10 N después: se suman las áreas de tres rectángulos (la última cuenta negativa)." },
    sen: { t: "Pulso senoidal", f: function (x) { return 30 * Math.sin(PI * x / 10); }, W: function (X) { return 300 / PI * (1 - Math.cos(PI * X / 10)); }, nota: "F = 30·sen(πx/10): no hay fórmula elemental de geometría; el área se calcula integrando." }
  };
  B.w.f12_fx = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El trabajo es el área bajo la gráfica fuerza–posición");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { p: "lin", X: 6, m: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Posición final x", min: 0.5, max: 10, step: 0.1, val: st.X, on: function (v) { st.X = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " m"; } });
    U.slider(ctl, { et: "Masa m", min: 1, max: 50, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    function pinta() {
      var P = PERFIL[st.p], W = P.W(st.X), f = P.f;
      g.limpiar();
      g.zona(function (x) { return Math.max(f(x), 0); }, 0, st.X, { clase: "z-ok" });
      g.zona(function (x) { return Math.min(f(x), 0); }, 0, st.X, { clase: "z-red" });
      g.curva(f, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3);
      g.segmento(st.X, -20, st.X, 45, { clase: "c-faint", dash: "4 4" });
      g.punto(st.X, f(st.X), { r: 6, clase: "c-red" });
      var v = W > 0 ? Math.sqrt(2 * W / st.m) : 0;
      lectura.innerHTML = lec("Trabajo W = área bajo la curva (de 0 a " + fmt(st.X, 1) + " m)", joules(W), W >= 0 ? "ok" : "red") + lec("Fuerza media  W/x", fmt(W / st.X, 2) + " N", "pen") +
        lec("Teorema W = ΔE<sub>c</sub> (parte del reposo)", W > 0 ? "v = √(2W/m) = " + fmt(v, 2) + " m/s" : W === 0 ? "no gana velocidad" : "W &lt; 0: tendría que llevar velocidad inicial", "ancho red") + lec("Cómo se obtiene", P.nota, "ancho");
      pie.innerHTML = "Cuando la fuerza <b>no es constante</b> no sirve W = F·d: el trabajo es el <b>área</b> encerrada entre la curva F(x) y el eje x. Verde: área que suma energía (F positiva); rojo: área que resta (F negativa). El punto rojo señala la posición final; mueve el deslizador y mira cómo crece el área.";
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: 0, xmax: 10, ymin: -20, ymax: 45, w: 600, h: 300, etx: "x (m)", ety: "F (N)", etiqueta: "Fuerza frente a posición" });
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(PERFIL).map(function (k) { return { k: k, t: PERFIL[k].t }; }), "lin", function (k) { st.p = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F12_RAMPA: plano inclinado con rozamiento (trabajos y energías)
  // ============================================================
  B.w.f12_rampa = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Plano inclinado: trabajo de cada fuerza y balance de energía");
    cuerpo.innerHTML = '<div class="f12-duo"><div class="w-plot" data-esc></div><div class="w-plot" data-bar></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var L = 6, st = { th: 30, mu: 0.2, m: 5, s: 3.6 }, gE, gB, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an, listo = false;
    sl.th = U.slider(ctl, { et: "Ángulo θ", min: 5, max: 60, step: 1, val: st.th, on: function (v) { st.th = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + "°"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 0.6, step: 0.01, val: st.mu, on: function (v) { st.mu = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 50, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    sl.s = U.slider(ctl, { et: "Recorrido s", min: 0, max: L, step: 0.05, val: st.s, on: function (v) { st.s = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " m"; } });
    function calc() {
      var th = rad(st.th), sn = Math.sin(th), cs = Math.cos(th), a = g0 * (sn - st.mu * cs), mueve = a > 1e-9, s = mueve ? st.s : 0;
      return { th: th, sn: sn, cs: cs, a: a, mueve: mueve, s: s, Wp: st.m * g0 * sn * s, Wf: -st.mu * st.m * g0 * cs * s, E0: st.m * g0 * L * sn };
    }
    function pinta() {
      var c = calc(), m = st.m, H = L * c.sn, Ec = c.mueve ? m * c.a * c.s : 0, Q = -c.Wf, Ep = m * g0 * (L - c.s) * c.sn, Wn = c.Wp + c.Wf;
      iso(gE, -1, 7.5, -1.6, 6.4); gE.limpiar();
      gE.poligono([[0, 0], [L * c.cs, 0], [0, H]], { clase: "z-pen", borde: "var(--ink-soft)", grosor: 1.6 });
      var ux = c.cs, uy = -c.sn, nx = c.sn, ny = c.cs, px = c.s * c.cs, py = H - c.s * c.sn, b = 0.75;
      gE.poligono([[px - b / 2 * ux, py - b / 2 * uy], [px + b / 2 * ux, py + b / 2 * uy], [px + b / 2 * ux + b * nx, py + b / 2 * uy + b * ny], [px - b / 2 * ux + b * nx, py - b / 2 * uy + b * ny]], { clase: "z-hl", borde: "var(--ink)", grosor: 1.6 });
      var cx = px + b / 2 * nx, cy = py + b / 2 * ny, esc = 1.6;
      U.flecha(gE, cx, cy, cx, cy - esc, { clase: "c-ink", grosor: 3 }); gE.texto(cx, cy - esc, "P", { dx: 6, dy: 14 });
      U.flecha(gE, cx, cy, cx + esc * c.cs * nx, cy + esc * c.cs * ny, { clase: "c-ok", grosor: 3 }); gE.texto(cx + esc * c.cs * nx, cy + esc * c.cs * ny, "N", { dx: 6, dy: -4, clase: "ok" });
      if (st.mu > 0.005 && c.mueve) { U.flecha(gE, cx, cy, cx - esc * st.mu * c.cs * ux, cy - esc * st.mu * c.cs * uy, { clase: "c-red", grosor: 3 }); gE.texto(cx - esc * st.mu * c.cs * ux, cy - esc * st.mu * c.cs * uy, "Fr", { dx: -4, dy: -6, clase: "red", ancla: "end" }); }
      gE.texto(L * c.cs * 0.62, 0.0, "θ = " + fmt(st.th, 0) + "°", { dy: -8, clase: "faint", ancla: "middle" });
      // barras
      var E0 = c.E0, top = Math.max(E0, 1) * 1.18;
      gB.rango(0, 4, -top * 0.14, top); gB.limpiar();
      var cols = [["E<sub>p</sub>", Ep, "z-pen", "var(--pen)"], ["E<sub>c</sub>", Ec, "z-ok", "var(--ok)"], ["Calor Q", Q, "z-red", "var(--red)"]];
      var nombres = ["Ep", "Ec", "Q (calor)"];
      cols.forEach(function (cc, i) {
        gB.rect(i + 0.18, 0, i + 0.82, cc[1], { clase: cc[2], borde: cc[3] }); gB.texto(i + 0.5, -top * 0.075, nombres[i], { ancla: "middle", clase: "faint" });
        gB.texto(i + 0.5, cc[1], joules(cc[1]), { dy: -5, ancla: "middle", clase: "faint" });
      });
      gB.rect(3.18, 0, 3.82, Ep, { clase: "z-pen", borde: "var(--pen)" }); gB.rect(3.18, Ep, 3.82, Ep + Ec, { clase: "z-ok", borde: "var(--ok)" }); gB.rect(3.18, Ep + Ec, 3.82, Ep + Ec + Q, { clase: "z-red", borde: "var(--red)" });
      gB.texto(3.5, -top * 0.075, "Total", { ancla: "middle", clase: "faint" }); gB.horizontal(E0, { clase: "c-faint", dash: "5 4" });
      var vf = c.mueve ? Math.sqrt(2 * c.a * L) : 0, v = c.mueve ? Math.sqrt(2 * c.a * c.s) : 0;
      lectura.innerHTML = (c.mueve ? "" : lec("¡No desliza!", "μ = " + fmt(st.mu, 2) + " ≥ tan θ = " + fmt(Math.tan(c.th), 2) + ": el rozamiento estático sujeta el bloque", "ancho red")) +
        lec("Trabajo del peso W<sub>P</sub> = m·g·s·sen θ", joules(c.Wp), "pen") + lec("Trabajo de la normal W<sub>N</sub>", "0 J (⊥ al desplazamiento)", "ok") + lec("Trabajo del rozamiento W<sub>Fr</sub> = −μ·m·g·cos θ·s", joules(c.Wf), "red") +
        lec("Trabajo neto = ΔE<sub>c</sub>", joules(Wn), Wn >= 0 ? "ok" : "red") + lec("Velocidad en este punto", fmt(v, 2) + " m/s") + lec("Velocidad al llegar abajo  √(2gL(sen θ − μ cos θ))", c.mueve ? fmt(vf, 2) + " m/s" : "—", "ok") +
        lec("Comprobación  E<sub>p</sub> + E<sub>c</sub> + Q", joules(Ep + Ec + Q) + " = m·g·h<sub>0</sub> = " + joules(E0), "ancho ok");
      pie.innerHTML = "El bloque baja por un plano de 6 m. <b>Peso</b> (negro): trabajo positivo al bajar. <b>Normal</b> (verde): perpendicular al plano ⇒ trabajo nulo. <b>Rozamiento</b> (rojo): siempre contra el movimiento ⇒ trabajo negativo, que se convierte en <b>calor</b>. La energía potencial inicial se reparte en E<sub>c</sub> y calor; la suma no cambia (barra «Total»). Mueve «Recorrido s» o pulsa «Reproducir».";
    }
    gE = plotDe(cuerpo, "[data-esc]", { xmin: -1, xmax: 7, ymin: -1, ymax: 6, w: 420, h: 330, limpio: true, etiqueta: "Bloque deslizando por un plano inclinado" });
    gB = plotDe(cuerpo, "[data-bar]", { xmin: 0, xmax: 4, ymin: 0, ymax: 100, w: 420, h: 330, sinX: true, etx: "", ety: "E (J)", etiqueta: "Balance de energía" });
    an = U.animar(cuerpo, function (t, dt, reinicio) {
      if (reinicio) { if (listo) { st.s = 0; sl.s.set(0); } pinta(); return; }
      var c = calc(); if (!c.mueve) return false;
      var v = Math.sqrt(2 * c.a * st.s); v += c.a * dt; st.s = Math.min(L, st.s + v * dt); sl.s.set(st.s); pinta();
      if (st.s >= L) return false;
    }, { auto: false });
    listo = true;
    pinta();
  };

  // ============================================================
  // F12_MONTANA: conservación de la energía en un perfil
  // ============================================================
  var PERF = {
    valle: { t: "Valle", y: function (x) { return 0.16 * (x - 5) * (x - 5); }, dy: function (x) { return 0.32 * (x - 5); }, x0: 1, v0: 0 },
    ondas: { t: "Valles y colinas", y: function (x) { return 3 + 2 * Math.cos(2 * PI * x / 5); }, dy: function (x) { return -2 * (2 * PI / 5) * Math.sin(2 * PI * x / 5); }, x0: 0.6, v0: 0 },
    colina: { t: "Una colina", y: function (x) { return 4 * Math.exp(-Math.pow((x - 6) / 1.6, 2)); }, dy: function (x) { return 4 * Math.exp(-Math.pow((x - 6) / 1.6, 2)) * (-2 * (x - 6) / 2.56); }, x0: 1, v0: 7 }
  };
  En.PERF = PERF;
  B.w.f12_montana = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Conservación de la energía en una montaña rusa");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { p: "valle", x0: 1, v0: 0, mu: 0, m: 2 }, sim, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an, listo = false, ymax = 5;
    sl.x0 = U.slider(ctl, { et: "Posición inicial", min: 0.5, max: 9.5, step: 0.1, val: st.x0, on: function (v) { st.x0 = v; reinicia(); }, fmt: function (v) { return fmt(v, 1) + " m"; } });
    sl.v0 = U.slider(ctl, { et: "Velocidad inicial", min: 0, max: 12, step: 0.5, val: st.v0, on: function (v) { st.v0 = v; reinicia(); }, fmt: function (v) { return fmt(v, 1) + " m/s"; } });
    sl.mu = U.slider(ctl, { et: "Rozamiento μ", min: 0, max: 0.2, step: 0.01, val: st.mu, on: function (v) { st.mu = v; reinicia(); }, fmt: function (v) { return fmt(v, 2); } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 1, max: 10, step: 1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    function perfil() { return PERF[st.p]; }
    function reinicia() {
      var P = perfil(), th = Math.atan(P.dy(st.x0));
      sim = { x: st.x0, u: st.v0, Q: 0, quieto: false };
      var H0 = P.y(st.x0) + st.v0 * st.v0 / (2 * g0), top = 0, x;
      for (x = 0; x <= 10; x += 0.1) top = Math.max(top, P.y(x));
      ymax = Math.max(top, H0) + 1;
      pinta();
    }
    function avanza(dt) {
      var P = perfil(), n = Math.max(1, Math.ceil(dt / 0.001)), h = dt / n, i;
      for (i = 0; i < n; i++) {
        var th = Math.atan(P.dy(sim.x)), sn = Math.sin(th), cs = Math.cos(th), at = -g0 * sn, fr = st.mu * g0 * cs, u = sim.u, a;
        if (u === 0) { if (Math.abs(at) <= fr) { sim.quieto = true; return; } a = at - (at > 0 ? 1 : -1) * fr; }
        else a = at - (u > 0 ? 1 : -1) * fr;
        var u1 = u + a * h;
        if (u !== 0 && u * u1 < 0 && Math.abs(at) <= fr) u1 = 0;
        sim.u = u1; sim.quieto = false;
        sim.x += u1 * cs * h; sim.Q += st.m * fr * Math.abs(u1) * h;
        if (sim.x < 0) { sim.x = 0; sim.u = -sim.u; } else if (sim.x > 10) { sim.x = 10; sim.u = -sim.u; }
      }
    }
    function pinta() {
      var P = perfil(), y = P.y(sim.x), m = st.m, Ec = 0.5 * m * sim.u * sim.u, Ep = m * g0 * y, E0 = 0.5 * m * st.v0 * st.v0 + m * g0 * P.y(st.x0), Em = Ec + Ep, hE = Em / (m * g0), h0 = E0 / (m * g0);
      g.rango(0, 10, -0.4, ymax); g.limpiar();
      var pts = [], x; for (x = 0; x <= 10.0001; x += 0.1) pts.push([x, P.y(x)]); pts.push([10, -0.4]); pts.push([0, -0.4]);
      g.poligono(pts, { clase: "z-pen", borde: "var(--pen)", grosor: 2 });
      g.horizontal(h0, { clase: "c-faint", dash: "5 4" });
      g.texto(9.85, h0, "energía inicial", { dy: -6, clase: "faint", ancla: "end" });
      g.horizontal(hE, { clase: "c-red", dash: "7 4" });
      var l1 = g.segmento(sim.x, 0, sim.x, y, { clase: "c-pen" }); l1.setAttribute("stroke-width", 7);
      var l2 = g.segmento(sim.x, y, sim.x, hE, { clase: "c-ok" }); l2.setAttribute("stroke-width", 7);
      if (h0 - hE > 1e-3) { var l3 = g.segmento(sim.x, hE, sim.x, h0, { clase: "c-red" }); l3.setAttribute("stroke-width", 7); }
      g.punto(sim.x, y, { r: 9, clase: "c-hl" });
      lectura.innerHTML = lec("Altura  y", fmt(y, 2) + " m", "pen") + lec("Velocidad", fmt(Math.abs(sim.u), 2) + " m/s") +
        lec("Energía cinética E<sub>c</sub> = ½·m·v² (verde)", joules(Ec), "ok") + lec("Energía potencial E<sub>p</sub> = m·g·y (azul)", joules(Ep), "pen") +
        lec("Mecánica E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> (línea roja)", joules(Em), "red") + lec("Calor disipado por el rozamiento (rojo, arriba)", joules(sim.Q), st.mu > 0 ? "red" : "") +
        lec("Comprobación  E<sub>m</sub> + Q", joules(Em + sim.Q) + " (inicial: " + joules(E0) + ")", "ancho ok") + lec("Altura máxima que podría alcanzar", fmt(h0, 2) + " m  (E<sub>m</sub>/m·g, sin rozamiento)", "ancho");
      pie.innerHTML = "La bola solo puede estar donde su energía mecánica (línea roja) <b>supera</b> a la potencial (la pista): en cada punto, lo que sobra por encima de la pista es E<sub>c</sub>. Sin rozamiento la línea roja es horizontal: la energía <b>se conserva</b>, la bola sube hasta la altura inicial y vuelve. Con rozamiento la línea baja poco a poco y el tramo rojo de la barra crece (calor). La <b>masa no influye</b> en la altura ni en la velocidad.";
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: 0, xmax: 10, ymin: -0.4, ymax: 6, w: 600, h: 310, etx: "x (m)", ety: "y (m)", etiqueta: "Perfil de la montaña rusa" });
    reinicia();
    an = U.animar(cuerpo, function (t, dt, reinicio) {
      if (reinicio) { if (listo) { reinicia(); } else pinta(); return; }
      if (sim.quieto) return false;
      avanza(dt); pinta();
      if (sim.quieto) return false;
    }, { auto: false });
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(PERF).map(function (k) { return { k: k, t: PERF[k].t }; }), "valle", function (k) { st.p = k; st.x0 = PERF[k].x0; st.v0 = PERF[k].v0; sl.x0.set(st.x0); sl.v0.set(st.v0); reinicia(); });
    listo = true;
  };

  // ============================================================
  // F12_PENDULO: intercambio de Ec y Ep en el péndulo (RK4)
  // ============================================================
  B.w.f12_pendulo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El péndulo: la energía pasa de potencial a cinética y vuelta");
    cuerpo.innerHTML = '<div class="f12-duo"><div class="w-plot" data-esc></div><div class="w-plot" data-en></div></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { L: 2, th0: 60, m: 1 }, sim = { th: rad(60), om: 0 }, gE, gG, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), an, listo = false;
    U.slider(ctl, { et: "Longitud L", min: 0.5, max: 3, step: 0.1, val: st.L, on: function (v) { st.L = v; reinicia(); }, fmt: function (v) { return fmt(v, 1) + " m"; } });
    U.slider(ctl, { et: "Ángulo inicial", min: 5, max: 85, step: 1, val: st.th0, on: function (v) { st.th0 = v; reinicia(); }, fmt: function (v) { return fmt(v, 0) + "°"; } });
    U.slider(ctl, { et: "Masa m", min: 0.1, max: 5, step: 0.1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " kg"; } });
    function reinicia() { sim.th = rad(st.th0); sim.om = 0; pinta(); }
    function acel(th) { return -g0 / st.L * Math.sin(th); }
    function rk4(h) {
      var k1t = sim.om, k1o = acel(sim.th), k2t = sim.om + h / 2 * k1o, k2o = acel(sim.th + h / 2 * k1t), k3t = sim.om + h / 2 * k2o, k3o = acel(sim.th + h / 2 * k2t), k4t = sim.om + h * k3o, k4o = acel(sim.th + h * k3t);
      sim.th += h / 6 * (k1t + 2 * k2t + 2 * k3t + k4t); sim.om += h / 6 * (k1o + 2 * k2o + 2 * k3o + k4o);
    }
    function pinta() {
      var L = st.L, m = st.m, th = sim.th, v = Math.abs(sim.om) * L, h = L * (1 - Math.cos(th)), Ec = 0.5 * m * v * v, Ep = m * g0 * h, Em = m * g0 * L * (1 - Math.cos(rad(st.th0)));
      iso(gE, -3.3, 3.3, -3.4, 0.4); gE.limpiar();
      var bx = L * Math.sin(th), by = -L * Math.cos(th);
      gE.segmento(-1, 0, 1, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4);
      gE.segmento(-3.2, -L, 3.2, -L, { clase: "c-faint", dash: "5 4" }); gE.texto(3.2, -L, "nivel de referencia (Ep = 0)", { dy: 15, ancla: "end", clase: "faint" });
      gE.segmento(0, 0, bx, by, { clase: "c-ink" });
      if (h > 0.01) { gE.segmento(bx, -L, bx, by, { clase: "c-pen", dash: "3 3" }).setAttribute("stroke-width", 3); gE.texto(bx, (by - L) / 2, "h", { dx: bx >= 0 ? 8 : -8, ancla: bx >= 0 ? "start" : "end", clase: "pen" }); }
      gE.punto(bx, by, { r: 4 + 6 * Math.sqrt(m / 5) + 3, clase: "c-hl" });
      var Emx = Math.max(Em, 0.5) * 1.15;
      var f = function (a) { return m * g0 * L * (1 - Math.cos(rad(a))); };
      var a0 = Math.max(st.th0, 10) * 1.1;
      gG.rango(-a0, a0, 0, Emx); gG.limpiar();
      gG.curva(f, { clase: "c-pen", n: 200 }).setAttribute("stroke-width", 3);
      gG.curva(function (a) { return Math.max(0, Em - f(a)); }, { clase: "c-ok", n: 200, x0: -st.th0, x1: st.th0 }).setAttribute("stroke-width", 3);
      gG.horizontal(Em, { clase: "c-red", dash: "6 4" });
      var tdeg = th * 180 / PI; gG.segmento(tdeg, 0, tdeg, Em, { clase: "c-faint", dash: "3 3" }); gG.punto(tdeg, Ep, { r: 6, clase: "c-pen" }); gG.punto(tdeg, Em - Ep > 0 ? Em - Ep : 0, { r: 6, clase: "c-ok" });
      gG.texto(a0, Em, "Em", { dy: -6, ancla: "end", clase: "red" });
      var vmax = Math.sqrt(2 * g0 * L * (1 - Math.cos(rad(st.th0))));
      lectura.innerHTML = lec("Ángulo θ", fmt(th * 180 / PI, 1) + "°") + lec("Altura sobre el punto más bajo  h = L(1 − cos θ)", fmt(h, 3) + " m", "pen") + lec("Velocidad v", fmt(v, 3) + " m/s", "ok") +
        lec("E<sub>p</sub> = m·g·h (azul)", joules(Ep), "pen") + lec("E<sub>c</sub> = ½·m·v² (verde)", joules(Ec), "ok") + lec("E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> (rojo)", joules(Ec + Ep), "red") +
        lec("Velocidad máxima  √(2gL(1 − cos θ₀))", fmt(vmax, 3) + " m/s (en el punto más bajo)", "ancho");
      pie.innerHTML = "La tensión de la cuerda es siempre perpendicular al movimiento: <b>no hace trabajo</b>. Solo trabaja el peso, que es conservativo, así que E<sub>c</sub> + E<sub>p</sub> es constante. Abajo: la energía potencial (parábola azul), la mecánica (línea roja) y la cinética (verde = lo que falta hasta la línea roja). En los extremos toda la energía es potencial; en el punto más bajo, toda cinética. La masa no cambia la velocidad.";
    }
    gE = plotDe(cuerpo, "[data-esc]", { xmin: -3, xmax: 3, ymin: -3.4, ymax: 0.4, w: 420, h: 330, limpio: true, etiqueta: "Péndulo simple" });
    gG = plotDe(cuerpo, "[data-en]", { xmin: -60, xmax: 60, ymin: 0, ymax: 10, w: 420, h: 330, etx: "θ (°)", ety: "E (J)", etiqueta: "Energías del péndulo según el ángulo" });
    an = U.animar(cuerpo, function (t, dt, reinicio) {
      if (reinicio) { if (listo) reinicia(); else pinta(); return; }
      var n = Math.max(1, Math.ceil(dt / 0.002)), i; for (i = 0; i < n; i++) rk4(dt / n); pinta();
    }, { auto: false });
    listo = true; reinicia();
  };

  // ============================================================
  // F12_LANZAMIENTO: lanzamiento vertical, Ec y Ep según la altura
  // ============================================================
  var MUNDOS = { Tierra: 9.8, Luna: 1.62, Marte: 3.71, "Júpiter": 24.8 };
  B.w.f12_lanzamiento = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Lanzamiento vertical: E<sub>c</sub> y E<sub>p</sub> según la altura");
    cuerpo.innerHTML = '<div data-pl class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: "Tierra", v0: 14, m: 0.5, f: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an, listo = false;
    sl.v0 = U.slider(ctl, { et: "Velocidad v₀", min: 1, max: 30, step: 0.5, val: st.v0, on: function (v) { st.v0 = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " m/s"; } });
    sl.m = U.slider(ctl, { et: "Masa m", min: 0.1, max: 10, step: 0.1, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " kg"; } });
    sl.f = U.slider(ctl, { et: "Altura (de h<sub>máx</sub>)", min: 0, max: 1, step: 0.01, val: st.f, on: function (v) { st.f = v; pinta(); }, fmt: function (v) { return fmt(100 * v, 0) + " %"; } });
    function pinta() {
      var gr = MUNDOS[st.n], m = st.m, v0 = st.v0, hm = v0 * v0 / (2 * gr), h = st.f * hm, E = 0.5 * m * v0 * v0, Ep = m * gr * h, Ec = E - Ep, v = Math.sqrt(Math.max(0, v0 * v0 - 2 * gr * h));
      g.rango(0, hm * 1.05, -E * 0.04, E * 1.12); g.limpiar();
      g.zona(function (x) { return m * gr * x; }, 0, hm, { clase: "z-pen" });
      g.curva(function (x) { return m * gr * x; }, { clase: "c-pen", n: 2, x0: 0, x1: hm }).setAttribute("stroke-width", 3);
      g.curva(function (x) { return E - m * gr * x; }, { clase: "c-ok", n: 2, x0: 0, x1: hm }).setAttribute("stroke-width", 3);
      g.horizontal(E, { clase: "c-red", dash: "6 4" });
      g.segmento(h, 0, h, E, { clase: "c-faint", dash: "3 3" });
      g.punto(h, Ep, { r: 7, clase: "c-pen" }); g.punto(h, Ec, { r: 7, clase: "c-ok" });
      g.texto(hm * 1.03, E, "Em", { dy: -6, ancla: "end", clase: "red" }); g.texto(hm * 0.98, m * gr * hm * 0.95, "Ep", { dy: 16, ancla: "end", clase: "pen" }); g.texto(hm * 0.02, E * 0.9, "Ec", { dy: 14, clase: "ok" });
      lectura.innerHTML = lec("g en " + st.n, fmt(gr, 2) + " m/s²") + lec("Altura máxima  h<sub>máx</sub> = v₀²/2g", fmt(hm, 2) + " m", "red") + lec("Altura actual  h", fmt(h, 2) + " m") + lec("Velocidad a esa altura", fmt(v, 2) + " m/s", "ok") +
        lec("E<sub>c</sub> = ½·m·v² (verde)", joules(Ec), "ok") + lec("E<sub>p</sub> = m·g·h (azul)", joules(Ep), "pen") + lec("E<sub>m</sub> = ½·m·v₀² (rojo, constante)", joules(E), "red") +
        lec("Tiempo de vuelo 2·v₀/g", fmt(2 * v0 / gr, 2) + " s");
      pie.innerHTML = "Al subir, E<sub>c</sub> baja en línea recta y E<sub>p</sub> sube en línea recta, y su suma es siempre la misma (línea roja): E<sub>m</sub> = ½·m·v₀². A la <b>mitad de la altura máxima</b> las dos valen lo mismo. La masa solo cambia las alturas de las líneas, no h<sub>máx</sub>. En la Luna (g menor) la misma velocidad inicial lleva mucho más arriba.";
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: 0, xmax: 10, ymin: 0, ymax: 100, w: 600, h: 290, etx: "h (m)", ety: "E (J)", etiqueta: "Energías en función de la altura" });
    an = U.animar(cuerpo, function (t, dt, reinicio) {
      var gr = MUNDOS[st.n], hm = st.v0 * st.v0 / (2 * gr), T = 2 * st.v0 / gr;
      if (reinicio) { if (listo) { st.f = 0; sl.f.set(0); } pinta(); return; }
      var tt = t % T, hh = st.v0 * tt - 0.5 * gr * tt * tt; st.f = Math.min(1, Math.max(0, hh / hm)); sl.f.set(st.f); pinta();
    }, { auto: false });
    listo = true;
    U.fichas(cuerpo.querySelector("[data-pl]"), Object.keys(MUNDOS).map(function (k) { return { k: k, t: k }; }), "Tierra", function (k) { st.n = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F12_POTENCIA: P = W/t, P = F·v y la factura de la luz
  // ============================================================
  var APARATOS = [["LED 9 W", 9, 5], ["Televisor 100 W", 100, 4], ["Nevera 150 W", 150, 8], ["Microondas 1200 W", 1200, 0.5], ["Radiador 2000 W", 2000, 4]];
  B.w.f12_potencia = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Potencia: trabajo por unidad de tiempo, P = F·v y la factura");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "grua", m: 500, h: 20, t: 25, F: 600, v: 25, P: 150, hd: 8, dias: 30, pr: 0.15 }, g, ctls = {}, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), host2 = cuerpo.querySelector("[data-ctl]"), sl = {};
    ["grua", "coche", "factura"].forEach(function (k) { ctls[k] = U.ctl(host2); });
    sl.m = U.slider(ctls.grua, { et: "Masa m", min: 50, max: 2000, step: 10, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    sl.h = U.slider(ctls.grua, { et: "Altura h", min: 1, max: 60, step: 1, val: st.h, on: function (v) { st.h = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " m"; } });
    sl.t = U.slider(ctls.grua, { et: "Tiempo t", min: 1, max: 120, step: 1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " s"; } });
    sl.F = U.slider(ctls.coche, { et: "Fuerza motriz F", min: 100, max: 5000, step: 50, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " N"; } });
    sl.v = U.slider(ctls.coche, { et: "Velocidad v", min: 1, max: 60, step: 1, val: st.v, on: function (v) { st.v = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " m/s (" + fmt(v * 3.6, 0) + " km/h)"; } });
    sl.P = U.slider(ctls.factura, { et: "Potencia P", min: 5, max: 3000, step: 5, val: st.P, on: function (v) { st.P = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " W"; } });
    sl.hd = U.slider(ctls.factura, { et: "Horas al día", min: 0.5, max: 24, step: 0.5, val: st.hd, on: function (v) { st.hd = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " h"; } });
    sl.dias = U.slider(ctls.factura, { et: "Días", min: 1, max: 60, step: 1, val: st.dias, on: function (v) { st.dias = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " días"; } });
    sl.pr = U.slider(ctls.factura, { et: "Precio", min: 0.05, max: 0.5, step: 0.01, val: st.pr, on: function (v) { st.pr = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " €/kWh"; } });
    function pinta() {
      var k;
      for (k in ctls) ctls[k].style.display = k === st.modo ? "" : "none";
      cuerpo.querySelector("[data-pre]").style.display = st.modo === "factura" || st.modo === "coche" ? "" : "none";
      g.limpiar();
      if (st.modo === "grua") {
        var W = st.m * g0 * st.h, P = W / st.t;
        g.rango(0, 120, 0, Math.max(P * 3, 10)); g.limpiar();
        g.curva(function (t) { return W / Math.max(t, 0.3); }, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3);
        g.segmento(st.t, 0, st.t, P, { clase: "c-faint", dash: "4 3" }); g.punto(st.t, P, { r: 7, clase: "c-red" });
        lectura.innerHTML = lec("Trabajo para subirla  W = m·g·h", joules(W), "pen") + lec("Potencia  P = W/t", cient(P, 3) + " W  (" + fmt(P / 1000, 3) + " kW)", "red") + lec("En caballos de vapor  (1 CV = 735,5 W)", fmt(P / 735.5, 2) + " CV", "ok") +
          lec("Equivale a bombillas de 60 W", fmt(P / 60, 1) + " bombillas", "") + lec("Si tardara la mitad del tiempo", "P = " + cient(2 * P, 3) + " W (el mismo trabajo, doble potencia)", "ancho");
        pie.innerHTML = "El <b>trabajo</b> es el mismo tardes lo que tardes (W = m·g·h); lo que cambia es la <b>potencia</b> necesaria: P = W/t. La curva es una hipérbola: dividir el tiempo entre 2 duplica la potencia. El punto rojo marca tu elección.";
      } else if (st.modo === "coche") {
        var Pc = st.F * st.v;
        g.rango(0, 60, 0, st.F * 60 * 1.05 / 1000); g.limpiar();
        g.recta(st.F / 1000, 0, 0, { clase: "c-pen" }).setAttribute("stroke-width", 3); g.recta(st.F / 2000, 0, 0, { clase: "c-faint", dash: "5 4" }); g.texto(58, st.F * 58 / 2000, "F/2", { dy: -6, ancla: "end", clase: "faint" });
        g.segmento(st.v, 0, st.v, Pc / 1000, { clase: "c-faint", dash: "4 3" }); g.segmento(0, Pc / 1000, st.v, Pc / 1000, { clase: "c-faint", dash: "4 3" }); g.punto(st.v, Pc / 1000, { r: 7, clase: "c-red" });
        lectura.innerHTML = lec("Potencia  P = F·v", cient(Pc, 3) + " W  (" + fmt(Pc / 1000, 2) + " kW)", "red") + lec("En caballos de vapor", fmt(Pc / 735.5, 1) + " CV", "ok") + lec("Velocidad", fmt(st.v * 3.6, 0) + " km/h", "pen") +
          lec("Energía que entrega cada segundo", fmt(Pc, 0) + " J/s", "") + lec("A doble velocidad, misma fuerza", "P = " + fmt(2 * Pc / 1000, 2) + " kW (el doble)", "ancho");
        pie.innerHTML = "Con velocidad constante la fuerza motriz iguala a la resistencia (rozamiento + aire) y la <b>potencia</b> es P = F·v. Con F fija, P crece en línea recta con v. El rozamiento del aire crece como v², así que mantener velocidades altas exige potencias enormes: P ∝ v³.";
      } else {
        var E = st.P * st.hd * st.dias / 1000, cs = E * st.pr;
        var ym = E * st.pr / st.dias;
        g.rango(0, 60, 0, Math.max(ym * 60 * 1.05, 0.5)); g.limpiar();
        g.recta(ym, 0, 0, { clase: "c-pen" }).setAttribute("stroke-width", 3);
        g.segmento(st.dias, 0, st.dias, cs, { clase: "c-faint", dash: "4 3" }); g.punto(st.dias, cs, { r: 7, clase: "c-red" });
        lectura.innerHTML = lec("Energía consumida  E = P·t", fmt(E, 2) + " kWh", "pen") + lec("En julios (1 kWh = 3,6 MJ)", cient(E * 3.6e6, 3) + " J", "") + lec("Coste a " + fmt(st.pr, 2) + " €/kWh", fmt(cs, 2) + " €", "red") +
          lec("Coste por día", fmt(cs / st.dias, 3) + " €", "ok") + lec("Atención", "el kWh es una unidad de ENERGÍA (potencia × tiempo), no de potencia", "ancho");
        pie.innerHTML = "La compañía eléctrica no cobra «potencia», cobra <b>energía</b>: E = P·t en kWh. Un aparato de 1000 W encendido durante 1 h consume 1 kWh (= 3,6·10⁶ J). Prueba con el radiador y con el LED: lo que importa es P × horas. La gráfica muestra el coste acumulado en el tiempo (en €).";
      }
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: 0, xmax: 120, ymin: 0, ymax: 100, w: 600, h: 260, etx: "t", ety: "", etiqueta: "Potencia y coste" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "grua", t: "Grúa: P = W/t" }, { k: "coche", t: "Coche: P = F·v" }, { k: "factura", t: "Factura de la luz" }], "grua", function (k) {
      st.modo = k;
      if (k === "coche") U.fichas(cuerpo.querySelector("[data-pre]"), [{ k: "a", t: "Urbano 50 km/h" }, { k: "b", t: "Autovía 120 km/h" }, { k: "c", t: "Camión 90 km/h" }], "", function (q) { var d = { a: [400, 13.9], b: [600, 33.3], c: [2500, 25] }[q]; st.F = d[0]; st.v = d[1]; sl.F.set(d[0]); sl.v.set(d[1]); pinta(); });
      else if (k === "factura") U.fichas(cuerpo.querySelector("[data-pre]"), APARATOS.map(function (a, i) { return { k: String(i), t: a[0] }; }), "", function (q) { var a = APARATOS[+q]; st.P = a[1]; st.hd = a[2]; sl.P.set(a[1]); sl.hd.set(a[2]); pinta(); });
      var xl = k === "grua" ? "t (s)" : k === "coche" ? "v (m/s)" : "días";
      g.c.etx = xl; g.c.ety = k === "grua" ? "P (W)" : k === "coche" ? "P (kW)" : "coste (€)";
      pinta();
    });
    g.c.etx = "t (s)"; g.c.ety = "P (W)";
    pinta();
  };

  // ============================================================
  // F12_SANKEY: rendimiento de una cadena de conversiones
  // ============================================================
  var CADENAS = {
    central: { t: "Central térmica", n: ["Caldera y turbina", "Alternador", "Red eléctrica"], e: [38, 97, 92] },
    coche: { t: "Coche de gasolina", n: ["Motor térmico", "Caja de cambios", "Rozamientos"], e: [30, 90, 95] },
    ev: { t: "Coche eléctrico", n: ["Batería", "Inversor", "Motor"], e: [90, 95, 92] },
    solar: { t: "Panel fotovoltaico", n: ["Célula solar", "Inversor", "Cableado"], e: [20, 96, 98] }
  };
  B.w.f12_sankey = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Rendimiento: lo que se aprovecha y lo que se pierde en cada etapa");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "central", e: [38, 97, 92], E: 100 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = [];
    [0, 1, 2].forEach(function (i) { sl[i] = U.slider(ctl, { et: "Rendimiento " + (i + 1), min: 5, max: 100, step: 1, val: st.e[i], on: function (v) { st.e[i] = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } }); });
    U.slider(ctl, { et: "Energía entrante", min: 10, max: 1000, step: 10, val: st.E, on: function (v) { st.E = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " MJ"; } });
    function pinta() {
      var C = CADENAS[st.k], E = st.E, e = st.e.map(function (x) { return x / 100; }), r1 = E * e[0], r2 = r1 * e[1], r3 = r2 * e[2], eta = e[0] * e[1] * e[2];
      g.rango(0, 5, -E * 0.14, E * 1.18); g.limpiar();
      var tramos = [[0, E, "z-pen", "var(--pen)", "Entrada"], [E, r1, "z-red", "var(--red)", "Pérd. 1"], [r1, r2, "z-red", "var(--red)", "Pérd. 2"], [r2, r3, "z-red", "var(--red)", "Pérd. 3"], [0, r3, "z-ok", "var(--ok)", "Útil"]];
      tramos.forEach(function (t, i) {
        g.rect(i + 0.15, t[0], i + 0.85, t[1], { clase: t[2], borde: t[3] }); g.texto(i + 0.5, -E * 0.07, t[4], { ancla: "middle", clase: "faint" });
        g.texto(i + 0.5, Math.max(t[0], t[1]), fmt(Math.abs(t[1] - t[0]), Math.abs(t[1] - t[0]) < 10 ? 1 : 0), { dy: -5, ancla: "middle", clase: "faint" });
      });
      [E, r1, r2, r3].forEach(function (y, i) { g.segmento(i + 0.85, y, i + 1.15, y, { clase: "c-faint", dash: "3 3" }); });
      g.segmento(3.85, r3, 4.15, r3, { clase: "c-faint", dash: "3 3" });
      lectura.innerHTML = lec("Etapa 1: " + C.n[0], fmt(st.e[0], 0) + " % → se pierden " + fmt(E - r1, 1) + " MJ", "red") + lec("Etapa 2: " + C.n[1], fmt(st.e[1], 0) + " % → se pierden " + fmt(r1 - r2, 1) + " MJ", "red") + lec("Etapa 3: " + C.n[2], fmt(st.e[2], 0) + " % → se pierden " + fmt(r2 - r3, 1) + " MJ", "red") +
        lec("Rendimiento total  η = η₁·η₂·η₃", fmt(100 * eta, 1) + " %", "ok") + lec("Energía útil · perdida (calor)", fmt(r3, 1) + " MJ · " + fmt(E - r3, 1) + " MJ", "pen") +
        lec("Para obtener 100 MJ útiles hay que aportar", fmt(100 / eta, 0) + " MJ", "ancho");
      pie.innerHTML = "En una <b>cadena</b> de transformaciones los rendimientos <b>se multiplican</b>: η = η₁·η₂·η₃. Aunque cada etapa parezca buena, el resultado final es peor que el de la peor etapa. Las barras rojas son energía «perdida»: no desaparece, se disipa como calor al ambiente (la energía total se conserva; se degrada). Aquí «MJ» es megajulio (10⁶ J); 1 kWh = 3,6 MJ.";
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: 0, xmax: 5, ymin: 0, ymax: 100, w: 600, h: 300, sinX: true, etx: "", ety: "E (MJ)", etiqueta: "Balance de energía de la cadena" });
    U.fichas(cuerpo.querySelector("[data-pre]"), Object.keys(CADENAS).map(function (k) { return { k: k, t: CADENAS[k].t }; }), "central", function (k) { st.k = k; st.e = CADENAS[k].e.slice(); st.e.forEach(function (x, i) { sl[i].set(x); }); pinta(); });
    pinta();
  };

  // ============================================================
  // F12_UNIDADES: conversor de unidades de energía y potencia
  // ============================================================
  var UE = [["J", 1], ["kJ", 1e3], ["MJ", 1e6], ["kWh", 3.6e6], ["cal", 4.184], ["kcal", 4184], ["eV", 1.602177e-19]];
  var UP = [["W", 1], ["kW", 1e3], ["MW", 1e6], ["CV", 735.5]];
  var HE = [["1 eV", 1.602177e-19, "start"], ["manzana, 1 m", 1, "middle"], ["saque de tenis", 88, "middle"], ["1 kcal", 4184, "middle"], ["1 kWh", 3.6e6, "middle"], ["1 L gasolina", 3.4e7, "middle"], ["Hiroshima", 6.3e13, "middle"], ["mundo en 1 año", 6e20, "end"]];
  var HP = [["LED", 9, "start"], ["persona", 80, "middle"], ["microondas", 1200, "middle"], ["coche", 1e5, "middle"], ["central nuclear", 1e9, "middle"], ["consumo mundial", 2e13, "middle"], ["luz solar", 1.7e17, "end"]];
  B.w.f12_unidades = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Conversor de unidades de energía y potencia");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-uni class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "E", u: 3, x: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    sl = U.slider(ctl, { et: "Valor", min: -3, max: 9, step: 0.05, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return cient(Math.pow(10, v), 2) + " " + lista()[st.u][0]; } });
    function lista() { return st.modo === "E" ? UE : UP; }
    function pinta() {
      var L = lista(), val = Math.pow(10, st.x), SI = val * L[st.u][1], hit = st.modo === "E" ? HE : HP, lo = st.modo === "E" ? -20 : -3, hi = st.modo === "E" ? 22 : 18, lx = p10(SI);
      g.rango(lo, hi, 0, 5); g.limpiar();
      g.segmento(lo, 0.4, hi, 0.4, { clase: "c-ink" });
      hit.forEach(function (h, i) { var xx = p10(h[1]), yy = 1.0 + (i % 4) * 0.75; g.punto(xx, 0.4, { r: 4, clase: "c-faint" }); g.segmento(xx, 0.4, xx, yy - 0.05, { clase: "c-faint", dash: "2 3" }); g.texto(xx, yy, h[0], { ancla: h[2], clase: "faint", dy: -2 }); });
      if (lx >= lo && lx <= hi) { g.segmento(lx, 0.4, lx, 4.7, { clase: "c-red" }); g.punto(lx, 0.4, { r: 7, clase: "c-red" }); g.texto(lx, 4.7, "tu valor", { ancla: lx > (lo + hi) / 2 ? "end" : "start", dx: lx > (lo + hi) / 2 ? -6 : 6, dy: 12, clase: "red" }); }
      var out = L.map(function (u, i) { return lec(u[0], cs(SI / u[1]), i === st.u ? "pen" : ""); }).join("");
      var eq = st.modo === "E" ?
        lec("Equivale a subir una persona de 70 kg", cs(SI / (70 * g0)) + " m", "ok") + lec("Bombilla de 60 W encendida", SI / 60 >= 3600 ? fmt(SI / 60 / 3600, 2) + " h" : fmt(SI / 60, 2) + " s", "ok") :
        lec("Bombillas de 60 W", cs(SI / 60), "ok") + lec("Energía en 1 hora (en kWh)", cs(SI * 3600 / 3.6e6) + " kWh", "ok");
      lectura.innerHTML = out + eq;
      pie.innerHTML = "Eje: <b>log₁₀</b> del valor en unidades del SI (" + (st.modo === "E" ? "J" : "W") + "), de lo más pequeño a lo más grande. Punto rojo: tu valor. Datos de referencia: 1 kWh = 3,6·10⁶ J; 1 cal = 4,184 J; 1 eV = 1,602·10⁻¹⁹ J; 1 CV = 735,5 W. El kWh es energía (P·t), el kW es potencia: no son lo mismo.";
    }
    g = plotDe(cuerpo, ".w-plot", { xmin: -20, xmax: 22, ymin: 0, ymax: 5, w: 600, h: 270, sinX: true, sinY: true, etx: "", etiqueta: "Escala logarítmica de energías" });
    function fichasU() { U.fichas(cuerpo.querySelector("[data-uni]"), lista().map(function (u, i) { return { k: String(i), t: u[0] }; }), String(st.u), function (k) { st.u = +k; sl.set(st.x); pinta(); }); }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "E", t: "Energía" }, { k: "P", t: "Potencia" }], "E", function (k) { st.modo = k; st.u = k === "E" ? 3 : 1; st.x = 0; sl.set(0); fichasU(); pinta(); });
    fichasU();
    pinta();
  };
})(window);
