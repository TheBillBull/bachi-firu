/* ============================================================
   Bachi para Firu · laboratorio de análisis (Matemáticas)
   secante · tangente · f y f′ enlazadas · optimización · entrenador de derivadas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, Mate = B.Mate, fmt = B.fmt;
  B.lab = B.lab || {};

  // ---------- funciones de demostración ----------
  var FUN = {
    par: { t: "x² − 2x + 3", f: function (x) { return x * x - 2 * x + 3; }, df: function (x) { return 2 * x - 2; }, r: [-1.5, 5.5, -1.5, 12], a: 1, b: 4 },
    cub: { t: "x³ − 3x", f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, r: [-3, 3, -5, 5], a: -1.5, b: 1.5 },
    sen: { t: "sen x", f: Math.sin, df: Math.cos, r: [-4.5, 4.5, -2, 2], a: -1, b: 2 },
    exp: { t: "eˣ", f: Math.exp, df: Math.exp, r: [-3, 3, -1.5, 12], a: -1, b: 1.5 }
  };
  var ORDEN_FUN = ["par", "cub", "sen", "exp"];

  function fichas(host, opciones, actual, alElegir) {
    host.innerHTML = opciones.map(function (o) {
      return '<button type="button" class="chip-btn' + (o.k === actual ? " on" : "") + '" data-k="' + o.k + '" aria-pressed="' + (o.k === actual) + '">' + o.t + "</button>";
    }).join("");
    host.onclick = function (e) {
      var b = e.target.closest("[data-k]");
      if (!b) return;
      Array.prototype.forEach.call(host.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      alElegir(b.getAttribute("data-k"));
    };
  }

  function lec(rotulo, valor, clase) { return '<div class="lec ' + (clase || "") + '"><small>' + rotulo + "</small><b>" + valor + "</b></div>"; }

  function recta(m, n) {
    var mm = Math.abs(m) < 5e-3 ? 0 : m, nn = Math.abs(n) < 5e-3 ? 0 : n, s = "y = ";
    if (mm === 0) return s + fmt(nn, 2);
    s += (mm === 1 ? "" : mm === -1 ? "−" : fmt(mm, 2)) + "x";
    if (nn !== 0) s += (nn > 0 ? " + " : " − ") + fmt(Math.abs(nn), 2);
    return s;
  }

  function opcionesFun() { return ORDEN_FUN.map(function (k) { return { k: k, t: "f(x) = " + FUN[k].t }; }); }

  // ============================================================
  // SECANTE: arrastra A y B; la pendiente de la secante es la TVM
  // ============================================================
  B.w.secante = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Secante y tasa de variación media");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot"></div><div class="lectura"></div>' +
      '<p class="hint">Arrastra los puntos A y B por la curva (o usa las flechas del teclado). La pendiente de la secante es la TVM.</p>';
    var elPlot = cuerpo.querySelector(".w-plot"), elLec = cuerpo.querySelector(".lectura");
    var st = { k: "par", a: 1, b: 4 }, g, hA, hB;

    function limita(x) { var F = FUN[st.k]; return Math.max(F.r[0] + 0.1, Math.min(F.r[1] - 0.1, x)); }

    function pintar() {
      var F = FUN[st.k], a = st.a, b = st.b, fa = F.f(a), fb = F.f(b), dx = b - a, dy = fb - fa;
      g.limpiar();
      if (Math.abs(dx) > 1e-6) {
        g.recta(dy / dx, a, fa, { clase: "c-red" });
        g.segmento(a, fa, b, fa, { clase: "c-faint", dash: "5 4" });
        g.segmento(b, fa, b, fb, { clase: "c-faint", dash: "5 4" });
        g.texto((a + b) / 2, fa, "Δx = " + fmt(dx, 2), { dy: 17, ancla: "middle", clase: "faint" });
        g.texto(b, (fa + fb) / 2, "Δy = " + fmt(dy, 2), { dx: 8, clase: "faint" });
      }
      g.mover(hA, a, fa); g.mover(hB, b, fb);
      g.texto(a, fa, "A", { dx: -16, dy: -10, clase: "pen" });
      g.texto(b, fb, "B", { dx: 10, dy: -10, clase: "red" });
      elLec.innerHTML = lec("a → b", fmt(a, 2) + " → " + fmt(b, 2)) + lec("f(a) → f(b)", fmt(fa, 2) + " → " + fmt(fb, 2)) +
        lec("Δy ÷ Δx", Math.abs(dx) > 1e-6 ? fmt(dy, 2) + " ÷ " + fmt(dx, 2) : "—") +
        lec("TVM = pendiente", Math.abs(dx) > 1e-6 ? fmt(dy / dx, 3) : "A = B: sin secante", "red");
    }

    function montar() {
      var F = FUN[st.k];
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: F.r[0], xmax: F.r[1], ymin: F.r[2], ymax: F.r[3], w: 640, h: 340, etiqueta: "Gráfica de f(x) = " + F.t + " con una secante" });
      g.curva(F.f, { capa: "fijo" });
      hA = g.punto(0, 0, { capa: "top", r: 9, clase: "c-pen" });
      hB = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      var paso = (F.r[1] - F.r[0]) / 80;
      g.arrastrar(hA, function (x) { st.a = limita(x); pintar(); }, { get: function () { return st.a; }, paso: paso, etiqueta: "Punto A" });
      g.arrastrar(hB, function (x) { st.b = limita(x); pintar(); }, { get: function () { return st.b; }, paso: paso, etiqueta: "Punto B" });
      st.a = F.a; st.b = F.b;
      pintar();
    }
    fichas(cuerpo.querySelector(".chips"), opcionesFun(), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // TANGENTE: la derivada en un punto es la pendiente de la tangente
  // ============================================================
  B.w.tangente = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La derivada es la pendiente de la tangente");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot"></div>' +
      '<div class="ctl"><label>Punto <span class="mv">a</span> <input type="range" step="0.01" aria-label="Posición del punto a"> <span class="mv" data-av></span></label></div>' +
      '<div class="lectura"></div><p class="w-pie"></p>';
    var elPlot = cuerpo.querySelector(".w-plot"), elLec = cuerpo.querySelector(".lectura"), rng = cuerpo.querySelector("input"), av = cuerpo.querySelector("[data-av]"), pie = cuerpo.querySelector(".w-pie");
    var st = { k: "par", a: 2 }, g, h;

    function pintar() {
      var F = FUN[st.k], a = st.a, fa = F.f(a), m = F.df(a), n = fa - m * a;
      g.limpiar();
      g.recta(m, a, fa, { clase: m > 0.005 ? "c-ok" : m < -0.005 ? "c-red" : "c-ink" });
      g.mover(h, a, fa);
      g.texto(a, fa, "(" + fmt(a, 2) + ", " + fmt(fa, 2) + ")", { dx: 12, dy: -12, clase: "pen" });
      av.textContent = fmt(a, 2); rng.value = a;
      elLec.innerHTML = lec("f(a)", fmt(fa, 3)) + lec("f′(a) = pendiente", fmt(m, 3), m > 0.005 ? "ok" : m < -0.005 ? "red" : "") + lec("recta tangente", recta(m, n), "pen");
      pie.textContent = m > 0.005 ? "f′(a) > 0: la tangente sube, así que f crece en este punto." : m < -0.005 ? "f′(a) < 0: la tangente baja, así que f decrece en este punto." : "f′(a) = 0: la tangente es horizontal. Posible máximo o mínimo.";
    }

    function montar() {
      var F = FUN[st.k];
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: F.r[0], xmax: F.r[1], ymin: F.r[2], ymax: F.r[3], w: 640, h: 340, etiqueta: "Gráfica de f(x) = " + F.t + " con su tangente" });
      g.curva(F.f, { capa: "fijo" });
      h = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      g.arrastrar(h, function (x) { st.a = Math.max(F.r[0] + 0.05, Math.min(F.r[1] - 0.05, x)); pintar(); }, { get: function () { return st.a; }, paso: (F.r[1] - F.r[0]) / 100, etiqueta: "Punto de tangencia" });
      rng.min = F.r[0] + 0.05; rng.max = F.r[1] - 0.05;
      st.a = st.k === "par" ? 2 : st.k === "cub" ? 1.5 : st.k === "sen" ? 0.8 : 0.5;
      pintar();
    }
    rng.addEventListener("input", function () { st.a = parseFloat(rng.value); pintar(); });
    fichas(cuerpo.querySelector(".chips"), opcionesFun(), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // f y f′ ENLAZADAS: el signo de la derivada manda sobre la gráfica
  // ============================================================
  var PRE = {
    c3: { t: "x³ − 3x", f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, crit: [-1, 1], x: [-2.6, 2.6], yf: [-4.5, 4.5], yd: [-4, 8] },
    pa: { t: "x² − 4x + 3", f: function (x) { return x * x - 4 * x + 3; }, df: function (x) { return 2 * x - 4; }, crit: [2], x: [-1, 5], yf: [-2, 9], yd: [-7, 7] },
    c1: { t: "x³", f: function (x) { return x * x * x; }, df: function (x) { return 3 * x * x; }, crit: [0], x: [-2, 2], yf: [-8, 8], yd: [-2, 12] },
    c4: { t: "x⁴ − 2x²", f: function (x) { return Math.pow(x, 4) - 2 * x * x; }, df: function (x) { return 4 * x * x * x - 4 * x; }, crit: [-1, 0, 1], x: [-2, 2], yf: [-2, 8], yd: [-9, 9] },
    ex: { t: "x·e⁻ˣ", f: function (x) { return x * Math.exp(-x); }, df: function (x) { return (1 - x) * Math.exp(-x); }, crit: [1], x: [-1, 5], yf: [-3, 1], yd: [-1.5, 6] }
  };

  B.w.fprima = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mira f y f′ a la vez");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot top"></div><div class="w-plot bot"></div>' +
      '<div class="ctl"><label>Punto <span class="mv">x</span> <input type="range" step="0.01" aria-label="Posición de x"> <span class="mv" data-av></span></label></div>' +
      '<div class="lectura"></div><div class="fp-tabla"></div>';
    var pTop = cuerpo.querySelector(".w-plot.top"), pBot = cuerpo.querySelector(".w-plot.bot"), elLec = cuerpo.querySelector(".lectura"), tabla = cuerpo.querySelector(".fp-tabla");
    var rng = cuerpo.querySelector("input"), av = cuerpo.querySelector("[data-av]");
    var st = { k: "c3", x: 0.5 }, g1, g2, h1;

    function intervalos(P) {
      var lim = [P.x[0]].concat(P.crit, [P.x[1]]), it = [];
      for (var i = 0; i < lim.length - 1; i++) it.push({ a: lim[i], b: lim[i + 1], s: P.df((lim[i] + lim[i + 1]) / 2) > 0 ? 1 : -1 });
      return it;
    }
    function nombreInt(it, i, n) { return "(" + (i === 0 ? "−∞" : fmt(it.a, 2)) + ", " + (i === n - 1 ? "+∞" : fmt(it.b, 2)) + ")"; }

    function pintarTabla(P) {
      var it = intervalos(P), n = it.length, concl = [];
      var fila1 = it.map(function (v) { return "<td>" + (v.s > 0 ? "+" : "−") + "</td>"; }).join("");
      var fila2 = it.map(function (v) { return "<td>" + (v.s > 0 ? "↗ crece" : "↘ decrece") + "</td>"; }).join("");
      P.crit.forEach(function (c, i) {
        var antes = it[i].s, despues = it[i + 1].s;
        concl.push(antes > 0 && despues < 0 ? "<b>x = " + fmt(c, 2) + "</b>: f′ pasa de + a − → <b>máximo relativo</b>, f(" + fmt(c, 2) + ") = " + fmt(P.f(c), 3) + "." :
          antes < 0 && despues > 0 ? "<b>x = " + fmt(c, 2) + "</b>: f′ pasa de − a + → <b>mínimo relativo</b>, f(" + fmt(c, 2) + ") = " + fmt(P.f(c), 3) + "." :
          "<b>x = " + fmt(c, 2) + "</b>: f′ = 0 pero <b>no cambia de signo</b> → no hay máximo ni mínimo.");
      });
      tabla.innerHTML = '<table class="lam-tabla"><thead><tr><th></th>' + it.map(function (v, i) { return "<th>" + nombreInt(v, i, n) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        "<tr><td>signo de f′</td>" + fila1 + "</tr><tr><td>f</td>" + fila2 + "</tr></tbody></table><p class=\"w-pie\">" + concl.join("<br>") + "</p>";
    }

    function pintar() {
      var P = PRE[st.k], x = st.x, fx = P.f(x), dx = P.df(x);
      g1.limpiar(); g2.limpiar();
      var it = intervalos(P);
      it.forEach(function (v) {
        g1.curva(P.f, { x0: v.a, x1: v.b, clase: v.s > 0 ? "c-ok" : "c-red" });
        g2.zona(P.df, v.a, v.b, { clase: v.s > 0 ? "z-ok" : "z-red" });
      });
      g2.curva(P.df, { clase: "c-ink" });
      P.crit.forEach(function (c, i) {
        var antes = it[i].s, despues = it[i + 1].s, et = antes > 0 && despues < 0 ? "máx" : antes < 0 && despues > 0 ? "mín" : "sin extremo";
        g1.punto(c, P.f(c), { r: 6, clase: et === "sin extremo" ? "c-faint" : "c-pen" });
        g1.texto(c, P.f(c), et, { dy: antes > 0 && despues < 0 ? -12 : 20, ancla: "middle", clase: et === "sin extremo" ? "faint" : "pen" });
        g2.punto(c, 0, { r: 5, clase: "c-pen" });
      });
      var w = (P.x[1] - P.x[0]) * 0.07;
      g1.segmento(x - w, fx - dx * w, x + w, fx + dx * w, { clase: "c-ink" });
      g1.mover(h1, x, fx);
      g2.vertical(x, { clase: "c-faint", dash: "4 4" });
      g2.punto(x, dx, { r: 6, clase: dx > 0 ? "c-ok" : "c-red" });
      g2.texto(x, dx, "f′ = " + fmt(dx, 2), { dx: 10, dy: dx >= 0 ? -10 : 18, clase: dx > 0 ? "ok" : "red" });
      av.textContent = fmt(x, 2); rng.value = x;
      elLec.innerHTML = lec("x", fmt(x, 2)) + lec("f(x)", fmt(fx, 3)) + lec("f′(x)", fmt(dx, 3), dx > 0.005 ? "ok" : dx < -0.005 ? "red" : "") +
        lec("f en este punto", dx > 0.005 ? "crece ↗" : dx < -0.005 ? "decrece ↘" : "tangente horizontal");
    }

    function montar() {
      var P = PRE[st.k];
      pTop.innerHTML = ""; pBot.innerHTML = "";
      g1 = new B.Plot(pTop, { xmin: P.x[0], xmax: P.x[1], ymin: P.yf[0], ymax: P.yf[1], w: 640, h: 260, ety: "f", etiqueta: "Gráfica de f(x) = " + P.t });
      g2 = new B.Plot(pBot, { xmin: P.x[0], xmax: P.x[1], ymin: P.yd[0], ymax: P.yd[1], w: 640, h: 190, ety: "f′", etiqueta: "Gráfica de la derivada de f" });
      h1 = g1.punto(0, 0, { capa: "top", r: 8, clase: "c-red" });
      g1.arrastrar(h1, function (x) { st.x = Math.max(P.x[0] + 0.02, Math.min(P.x[1] - 0.02, x)); pintar(); }, { get: function () { return st.x; }, paso: (P.x[1] - P.x[0]) / 100, etiqueta: "Punto x" });
      rng.min = P.x[0] + 0.02; rng.max = P.x[1] - 0.02;
      st.x = P.x[0] + (P.x[1] - P.x[0]) * 0.3;
      pintarTabla(P); pintar();
    }
    rng.addEventListener("input", function () { st.x = parseFloat(rng.value); pintar(); });
    fichas(cuerpo.querySelector(".chips"), Object.keys(PRE).map(function (k) { return { k: k, t: "f(x) = " + PRE[k].t }; }), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // OPTIMIZACIÓN: encuentra el óptimo a mano y compruébalo con la derivada
  // ============================================================
  var PROB = {
    rect: {
      t: "Rectángulo de perímetro 20 m", obj: "Área", un: "m²", max: true, x: [0, 10], yr: [0, 30], opt: 5, xn: "base x (m)",
      g: function (x) { return x * (10 - x); },
      datos: function (x) { return [["base", fmt(x, 2) + " m"], ["altura", fmt(10 - x, 2) + " m"]]; },
      enun: "Entre todos los rectángulos de perímetro 20 m, ¿cuál tiene el área máxima?",
      dib: function (x) {
        var w = x * 17, hh = (10 - x) * 17;
        return '<rect class="dib-a" x="10" y="10" width="' + w + '" height="' + hh + '"/><text class="dib-t" x="' + (10 + w / 2) + '" y="' + (hh + 28) + '" text-anchor="middle">x</text><text class="dib-t" x="' + (w + 16) + '" y="' + (10 + hh / 2 + 4) + '">10 − x</text>';
      },
      sol: "A(x) = x(10 − x) = 10x − x² → A′(x) = 10 − 2x = 0 → x = 5. Base 5, altura 5: es un cuadrado de área 25 m². Como A′ pasa de + a −, es un máximo."
    },
    caja: {
      t: "Caja sin tapa a partir de una lámina de 30×30 cm", obj: "Volumen", un: "cm³", max: true, x: [0, 15], yr: [0, 2400], opt: 5, xn: "lado del recorte x (cm)",
      g: function (x) { return x * (30 - 2 * x) * (30 - 2 * x); },
      datos: function (x) { return [["recorte", fmt(x, 2) + " cm"], ["base", fmt(30 - 2 * x, 2) + " × " + fmt(30 - 2 * x, 2) + " cm"]]; },
      enun: "Se recorta un cuadrado de lado x en cada esquina de una lámina cuadrada de 30 cm y se doblan los lados para hacer una caja sin tapa. ¿Qué x da el mayor volumen?",
      dib: function (x) {
        var s = 150, c = x * 5;
        return '<rect class="dib-l" x="10" y="10" width="' + s + '" height="' + s + '"/>' +
          [[10, 10], [10 + s - c, 10], [10, 10 + s - c], [10 + s - c, 10 + s - c]].map(function (p) { return '<rect class="dib-b" x="' + p[0] + '" y="' + p[1] + '" width="' + c + '" height="' + c + '"/>'; }).join("") +
          '<text class="dib-t" x="' + (10 + c / 2) + '" y="' + (26 + c) + '" text-anchor="middle">x</text>';
      },
      sol: "V(x) = x(30 − 2x)² → V′(x) = (30 − 2x)² − 4x(30 − 2x) = (30 − 2x)(30 − 6x) = 0 → x = 15 (la lámina desaparece, V = 0) o x = 5. Con x = 5: V = 5·20² = 2000 cm³. V′ pasa de + a − en x = 5: máximo."
    },
    corral: {
      t: "Corral junto a una pared (200 m²)", obj: "Longitud de valla", un: "m", max: false, x: [3, 25], yr: [30, 90], opt: 10, xn: "lado perpendicular a la pared x (m)",
      g: function (x) { return 2 * x + 200 / x; },
      datos: function (x) { return [["x", fmt(x, 2) + " m"], ["y = 200/x", fmt(200 / x, 2) + " m"]]; },
      enun: "Quieres vallar un corral rectangular de 200 m² aprovechando una pared como uno de los lados (ese no se valla). ¿Qué dimensiones usan la menor cantidad de valla?",
      dib: function (x) {
        var w = Math.min(190, (200 / x) * 3), hh = x * 3;
        return '<line class="dib-pared" x1="4" y1="14" x2="196" y2="14"/><rect class="dib-a" x="10" y="14" width="' + w + '" height="' + hh + '"/>' +
          '<text class="dib-t" x="' + (10 + w / 2) + '" y="' + (14 + hh + 15) + '" text-anchor="middle">y</text><text class="dib-t" x="' + (w + 15) + '" y="' + (14 + hh / 2 + 4) + '">x</text><text class="dib-t" x="196" y="9" text-anchor="end">pared</text>';
      },
      sol: "Con x (los dos lados perpendiculares) e y (el paralelo a la pared): x·y = 200 → y = 200/x. Valla: L(x) = 2x + y = 2x + 200/x → L′(x) = 2 − 200/x² = 0 → x² = 100 → x = 10 (y = 20). L′ pasa de − a +: mínimo, L = 40 m."
    }
  };

  B.w.optimizar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Encuentra el óptimo");
    cuerpo.innerHTML = '<div class="chips"></div><p class="w-intro" data-enun></p><div class="op-fila"><svg class="dib" viewBox="0 0 200 170" role="img" aria-label="Dibujo del problema"></svg><div class="w-plot"></div></div>' +
      '<div class="ctl"><label><span class="mv">x</span> <input type="range" step="0.01" aria-label="Valor de x"> <span class="mv" data-xv></span></label></div>' +
      '<div class="lectura"></div><div class="ctl"><button type="button" class="btn-comprobar" data-rev>Comprobar con la derivada</button></div><div class="op-sol" hidden></div>';
    var enun = cuerpo.querySelector("[data-enun]"), dib = cuerpo.querySelector(".dib"), elPlot = cuerpo.querySelector(".w-plot"), rng = cuerpo.querySelector("input"), xv = cuerpo.querySelector("[data-xv]");
    var elLec = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".op-sol");
    var st = { k: "rect", x: 2, mejor: null, rev: false }, g, h;

    function pintar() {
      var P = PROB[st.k], x = st.x, v = P.g(x);
      if (st.mejor === null || (P.max ? v > st.mejor : v < st.mejor)) st.mejor = v;
      g.limpiar();
      if (st.rev) {
        g.vertical(P.opt, { clase: "c-ok", dash: "5 4" });
        g.punto(P.opt, P.g(P.opt), { r: 7, clase: "c-ok" });
        g.texto(P.opt, P.g(P.opt), (P.max ? "máximo " : "mínimo ") + fmt(P.g(P.opt), 2), { dy: P.max ? -14 : 24, ancla: "middle", clase: "ok" });
      }
      g.mover(h, x, v);
      g.texto(x, v, fmt(v, 2) + " " + P.un, { dx: 12, dy: -12, clase: "pen" });
      dib.innerHTML = P.dib(x);
      xv.textContent = fmt(x, 2); rng.value = x;
      elLec.innerHTML = P.datos(x).map(function (d) { return lec(d[0], d[1]); }).join("") + lec(P.obj, fmt(v, 2) + " " + P.un, "pen") + lec(P.max ? "El mayor que has visto" : "El menor que has visto", fmt(st.mejor, 2) + " " + P.un, "ok");
    }

    function montar() {
      var P = PROB[st.k];
      enun.innerHTML = P.enun + " <b>Mueve x</b> y busca el " + (P.max ? "máximo" : "mínimo") + " a ojo; luego compruébalo con la derivada.";
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: P.x[0], xmax: P.x[1], ymin: P.yr[0], ymax: P.yr[1], w: 460, h: 300, etx: "x", ety: P.obj.toLowerCase(), etiqueta: "Gráfica de la función a optimizar" });
      g.curva(P.g, { capa: "fijo" });
      h = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      g.arrastrar(h, function (x) { st.x = Math.max(P.x[0] + 0.02, Math.min(P.x[1] - 0.02, x)); pintar(); }, { get: function () { return st.x; }, paso: (P.x[1] - P.x[0]) / 100, etiqueta: "Valor de x" });
      rng.min = P.x[0] + 0.02; rng.max = P.x[1] - 0.02;
      st.x = P.x[0] + (P.x[1] - P.x[0]) * 0.2; st.mejor = null; st.rev = false;
      sol.hidden = true; sol.innerHTML = "";
      pintar();
    }
    rng.addEventListener("input", function () { st.x = parseFloat(rng.value); pintar(); });
    cuerpo.querySelector("[data-rev]").addEventListener("click", function () {
      st.rev = true; sol.hidden = false; sol.innerHTML = '<div class="result-box"><span class="result-label">Con la derivada</span>' + PROB[st.k].sol + "</div>";
      pintar();
    });
    fichas(cuerpo.querySelector(".chips"), Object.keys(PROB).map(function (k) { return { k: k, t: PROB[k].t }; }), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // ENTRENADOR DE DERIVADAS (por niveles, corrige expresiones libres)
  //   h: cómo se ve · e: derivada correcta · f: función original · p: pista
  // ============================================================
  var BANCO = {
    1: { nombre: "Potencias y sumas", items: [
      { h: "4x³ − 5x² + 2x − 7", f: "4x^3-5x^2+2x-7", e: "12x^2-10x+2", p: "Deriva cada sumando con (xⁿ)′ = n·xⁿ⁻¹. La constante desaparece." },
      { h: "3√x", f: "3sqrt(x)", e: "3/(2sqrt(x))", dom: [0.3, 5], p: "√x = x^(1/2). Baja el exponente: (1/2)·x^(−1/2) = 1/(2√x)." },
      { h: "6/x²", f: "6/x^2", e: "-12/x^3", p: "6/x² = 6·x⁻². Baja el −2 y resta 1 al exponente." },
      { h: "x⁵/5 − 2x", f: "x^5/5-2x", e: "x^4-2", p: "(x⁵/5)′ = 5x⁴/5 = x⁴." },
      { h: "7 − 2/x", f: "7-2/x", e: "2/x^2", p: "−2/x = −2·x⁻¹, y su derivada es +2·x⁻²." },
      { h: "(x³ + 4x)/2", f: "(x^3+4x)/2", e: "(3x^2+4)/2", p: "Dividir entre 2 es multiplicar por ½: el número sale fuera." }
    ] },
    2: { nombre: "Producto y cociente", items: [
      { h: "x²·eˣ", f: "x^2e^x", e: "(2x+x^2)e^x", p: "Producto: f′g + fg′ con f = x², g = eˣ." },
      { h: "(x + 1)(2x − 3)", f: "(x+1)(2x-3)", e: "4x-1", p: "Puedes usar producto o multiplicar antes: 2x² − x − 3." },
      { h: "x·ln x", f: "x ln(x)", e: "ln(x)+1", dom: [0.3, 4], p: "Producto: 1·ln x + x·(1/x)." },
      { h: "(x − 1)/(x + 2)", f: "(x-1)/(x+2)", e: "3/(x+2)^2", p: "Cociente: (f′g − fg′)/g². El numerador se simplifica mucho." },
      { h: "eˣ/x", f: "e^x/x", e: "e^x(x-1)/x^2", dom: [0.3, 4], p: "Cociente: (eˣ·x − eˣ·1)/x². Saca eˣ factor común." },
      { h: "sen x · cos x", f: "sen(x)cos(x)", e: "cos(x)^2-sen(x)^2", p: "Producto: cos x·cos x + sen x·(−sen x)." },
      { h: "x²/(x² + 1)", f: "x^2/(x^2+1)", e: "2x/(x^2+1)^2", p: "Cociente: (2x(x²+1) − x²·2x)/(x²+1)². Simplifica el numerador." }
    ] },
    3: { nombre: "Regla de la cadena", items: [
      { h: "(3x − 2)⁵", f: "(3x-2)^5", e: "15(3x-2)^4", p: "Fuera: (algo)⁵ → 5·(algo)⁴. Dentro: 3x − 2 → 3." },
      { h: "sen(5x)", f: "sen(5x)", e: "5cos(5x)", p: "Fuera: sen → cos. Dentro: 5x → 5." },
      { h: "e^(x²)", f: "e^(x^2)", e: "2x e^(x^2)", p: "Fuera: eᵘ → eᵘ. Dentro: x² → 2x." },
      { h: "ln(x² + 4)", f: "ln(x^2+4)", e: "2x/(x^2+4)", p: "(ln u)′ = u′/u con u = x² + 4." },
      { h: "√(x² + 1)", f: "sqrt(x^2+1)", e: "x/sqrt(x^2+1)", p: "(√u)′ = u′/(2√u) con u′ = 2x: el 2 se simplifica." },
      { h: "cos(2x + 1)", f: "cos(2x+1)", e: "-2sen(2x+1)", p: "Fuera: cos → −sen. Dentro: 2x + 1 → 2." },
      { h: "(x² + 1)³", f: "(x^2+1)^3", e: "6x(x^2+1)^2", p: "3·(x²+1)²·2x = 6x(x²+1)²." }
    ] },
    4: { nombre: "Mezcla (nivel examen)", items: [
      { h: "x²·sen(3x)", f: "x^2 sen(3x)", e: "2x sen(3x)+3x^2 cos(3x)", p: "Producto, y al derivar sen(3x) aparece la cadena (×3)." },
      { h: "e^(2x)/(x + 1)", f: "e^(2x)/(x+1)", e: "e^(2x)(2x+1)/(x+1)^2", p: "Cociente. Derivada de e^(2x) = 2e^(2x) (cadena). Saca e^(2x) factor común." },
      { h: "ln x / x²", f: "ln(x)/x^2", e: "(1-2ln(x))/x^3", dom: [0.3, 4], p: "Cociente: ((1/x)·x² − ln x·2x)/x⁴. Simplifica dividiendo por x." },
      { h: "x·√(x + 1)", f: "x sqrt(x+1)", e: "(3x+2)/(2sqrt(x+1))", dom: [-0.8, 4], p: "Producto y cadena: √(x+1) + x/(2√(x+1)). Común denominador 2√(x+1)." },
      { h: "(sen x)²", f: "sen(x)^2", e: "2sen(x)cos(x)", p: "Cadena: fuera ( )² → 2( ); dentro sen x → cos x." },
      { h: "(eˣ + e⁻ˣ)/2", f: "(e^x+e^(-x))/2", e: "(e^x-e^(-x))/2", p: "(e⁻ˣ)′ = −e⁻ˣ (cadena con u = −x)." }
    ] }
  };
  B.lab.banco = BANCO; // para verificación automática desde herramientas/

  B.w.derivador = function (host) {
    var cuerpo = B.caja(host, "Entrenador", "Deriva y te corrijo al momento");
    var clave = "derivador";
    var prog = B.ls.get(clave, {});
    cuerpo.innerHTML = '<p class="w-intro">Escribe la derivada como quieras: <code>12x^3-4x</code>, <code>2x e^(x^2)</code>, <code>(x^2+1)/(x-1)</code>, <code>sen(2x)</code>… Da igual la forma, mientras sea equivalente.</p>' +
      '<div class="chips"></div><div class="dv-enun"></div>' +
      '<form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">f′(x) =</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Tu derivada"><span class="bx-mk" aria-hidden="true"></span></label>' +
      '<button type="submit" class="btn-comprobar">Comprobar</button><button type="button" class="chip-btn" data-pista>💡 Pista</button><button type="button" class="chip-btn" data-ver>Ver solución</button></form>' +
      '<p class="dv-lee"></p><div class="bx-res" aria-live="polite"></div><p class="dv-pie"></p>';
    var enun = cuerpo.querySelector(".dv-enun"), form = cuerpo.querySelector(".dv-form"), inp = form.querySelector("input"), lee = cuerpo.querySelector(".dv-lee"), res = cuerpo.querySelector(".bx-res"), pie = cuerpo.querySelector(".dv-pie");
    var campo = form.querySelector(".bx-campo");
    var st = { n: "1", i: 0, racha: 0, resuelto: false };

    function hechos(n) { return prog[n] || []; }
    function siguiente() {
      var b = BANCO[st.n].items, pend = [], i;
      for (i = 0; i < b.length; i++) if (hechos(st.n).indexOf(i) < 0) pend.push(i);
      var pool = pend.length ? pend : b.map(function (_, k) { return k; });
      if (pool.length > 1) pool = pool.filter(function (k) { return k !== st.i; });
      st.i = pool[Math.floor(Math.random() * pool.length)];
      st.resuelto = false; st.pistas = false;
      inp.value = ""; inp.disabled = false; campo.classList.remove("ok", "mal"); lee.textContent = ""; res.className = "bx-res"; res.innerHTML = "";
      pintar();
    }
    function pintar() {
      var it = BANCO[st.n].items[st.i], hh = hechos(st.n).length, tot = BANCO[st.n].items.length;
      enun.innerHTML = '<span class="dv-lab">f(x) =</span> <span class="dv-f">' + it.h + "</span>";
      pie.textContent = "Racha: " + st.racha + " · Nivel «" + BANCO[st.n].nombre + "»: " + hh + " de " + tot + " superadas";
    }
    function evalua() {
      var it = BANCO[st.n].items[st.i], r = Mate.compilar(inp.value);
      if (!r.ok) { res.className = "bx-res mal"; res.textContent = r.error; return; }
      var ok = Mate.equivalente(r.f, Mate.compilar(it.e).f, it.dom);
      campo.classList.toggle("ok", ok); campo.classList.toggle("mal", !ok);
      if (ok) {
        st.racha++; st.resuelto = true; inp.disabled = true;
        var h = hechos(st.n); if (h.indexOf(st.i) < 0) { h = h.concat([st.i]); prog[st.n] = h; B.ls.set(clave, prog); }
        res.className = "bx-res ok"; res.innerHTML = '<b>✓ ¡Correcto!</b> <button type="button" class="btn-comprobar" data-sig>Siguiente →</button>';
        pintar();
      } else {
        st.racha = 0; res.className = "bx-res mal";
        res.innerHTML = "<b>Todavía no.</b> Revisa el método (pulsa «Pista» si quieres) y vuelve a probar."; pintar();
      }
    }
    inp.addEventListener("input", function () {
      campo.classList.remove("ok", "mal");
      var r = inp.value.trim() ? Mate.compilar(inp.value) : null;
      lee.textContent = r ? (r.ok ? "He leído: " + r.texto : "") : "";
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); if (!st.resuelto) evalua(); });
    cuerpo.addEventListener("click", function (e) {
      if (e.target.closest("[data-sig]")) { siguiente(); return; }
      var it = BANCO[st.n].items[st.i];
      if (e.target.closest("[data-pista]")) { res.className = "bx-res"; res.innerHTML = '<div class="bx-pista"><b>Pista:</b> ' + it.p + "</div>"; }
      if (e.target.closest("[data-ver]")) {
        var r = Mate.compilar(it.e);
        st.racha = 0; res.className = "bx-res";
        res.innerHTML = '<div class="bx-pista"><b>Método:</b> ' + it.p + "</div><div class=\"bx-pista\"><b>Solución:</b> f′(x) = " + r.texto + ' <button type="button" class="btn-comprobar" data-sig>Otra →</button></div>';
        pintar();
      }
    });
    fichas(cuerpo.querySelector(".chips"), Object.keys(BANCO).map(function (k) { return { k: k, t: k + ". " + BANCO[k].nombre }; }), st.n, function (k) { st.n = k; st.racha = 0; siguiente(); });
    siguiente();
  };

  // ============================================================
  // CLASE: de la secante a la tangente (f(x) = x² en a = 1)
  // ============================================================
  B.lab.claseSecante = function (host) {
    host.innerHTML = '<div class="w-plot"></div><div class="lectura"></div>' +
      '<div class="ctl"><label>h <input type="range" min="-2" max="3" step="0.01" value="2" aria-label="Distancia h entre los dos puntos"> <span class="mv" data-hv></span></label></div>';
    var f = function (x) { return x * x; }, a = 1;
    var g = new B.Plot(host.querySelector(".w-plot"), { xmin: -1, xmax: 4.4, ymin: -1.5, ymax: 12, w: 560, h: 340, etiqueta: "Gráfica de f(x) = x² con una secante que se acerca a la tangente" });
    g.curva(f, { capa: "fijo" });
    var elLec = host.querySelector(".lectura"), rng = host.querySelector("input"), hv = host.querySelector("[data-hv]");
    var st = { h: 2, tang: false }, parar = null;

    function pintar() {
      var h = st.h, xb = a + h, yb = f(xb);
      g.limpiar();
      if (st.tang) g.recta(2 * a, a, f(a), { clase: "c-ok", dash: "7 5" });
      if (Math.abs(h) > 0.004) g.recta(2 + h, a, f(a), { clase: "c-red" });
      g.punto(a, f(a), { r: 7, clase: "c-pen" });
      g.texto(a, f(a), "A(1, 1)", { dx: -8, dy: 20, ancla: "end", clase: "pen" });
      if (Math.abs(h) > 0.004) {
        g.punto(xb, yb, { r: 7, clase: "c-red" });
        g.texto(xb, yb, "B", { dx: 11, dy: -9, clase: "red" });
      }
      hv.textContent = fmt(h, 3); rng.value = h;
      elLec.innerHTML = lec("h = x_B − 1", fmt(h, 3)) + lec("TVM = (f(1+h) − 1) ÷ h", Math.abs(h) > 0.004 ? fmt(2 + h, 3) : "→ 2", "red") + lec("f′(1)", "2", st.tang ? "ok" : "");
    }
    rng.addEventListener("input", function () { if (parar) parar(); st.h = parseFloat(rng.value); pintar(); });
    pintar();
    return {
      set: function (e) {
        if (e.tang != null) st.tang = !!e.tang;
        if (e.h != null && e.h !== st.h) {
          if (parar) parar();
          var de = st.h;
          parar = B.anima(de, e.h, 800, function (v) { st.h = v; pintar(); });
        } else pintar();
      }
    };
  };

})(window);
