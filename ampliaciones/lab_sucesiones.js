/* ============================================================
   Bachi para Firu · laboratorio de sucesiones (Matemáticas I, tema 2)
   sucesion · aritmetica · geometrica · rebote · fibonacci
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Mate = B.Mate;
  B.lab = B.lab || {};

  // Evalúa los n primeros términos de una sucesión definida por una expresión de n
  function terminos(f, n) { var t = []; for (var i = 1; i <= n; i++) { var v = f(i); t.push(isFinite(v) ? v : NaN); } return t; }
  function monotonia(t) {
    var cre = true, dec = true, eps = 1e-12;
    for (var i = 1; i < t.length; i++) { if (isNaN(t[i]) || isNaN(t[i - 1])) return "no definida"; if (t[i] < t[i - 1] - eps) cre = false; if (t[i] > t[i - 1] + eps) dec = false; }
    return cre && dec ? "constante" : cre ? "creciente" : dec ? "decreciente" : "no monótona";
  }
  B.lab.sucesiones = { terminos: terminos, monotonia: monotonia };

  // ============================================================
  // SUCESION: explorador general
  // ============================================================
  B.w.sucesion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Explora una sucesión");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var PRE = [["2n+1", "2n + 1"], ["n^2", "n²"], ["(-1)^n", "(−1)ⁿ"], ["n/(n+1)", "n/(n+1)"], ["1/n", "1/n"], ["(2n-1)/(n+1)", "(2n−1)/(n+1)"], ["2^n", "2ⁿ"], ["(1+1/n)^n", "(1 + 1/n)ⁿ"], ["n*(-1)^n", "n·(−1)ⁿ"]];
    var st = { modo: "general", expr: "n/(n+1)", N: 15, a1: 2, p: 1, q: 3 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var campoExpr = document.createElement("label"); campoExpr.className = "bx-campo";
    campoExpr.innerHTML = '<span class="bx-et">aₙ =</span><input type="text" autocomplete="off" spellcheck="false" style="width:210px" value="' + st.expr + '" aria-label="Término general aₙ">';
    ctl.appendChild(campoExpr);
    var inp = campoExpr.querySelector("input");
    var sN = U.slider(ctl, { et: "Términos <i>N</i>", min: 5, max: 30, step: 1, val: st.N, on: function (v) { st.N = v; pinta(); }, fmt: function (v) { return String(v); } });
    var sA = U.slider(ctl, { et: "a₁", min: -5, max: 5, step: 0.5, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sP = U.slider(ctl, { et: "p", min: -2, max: 2, step: 0.1, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sQ = U.slider(ctl, { et: "q", min: -5, max: 5, step: 0.5, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });

    function serie(n) {
      if (st.modo === "general") { var r = Mate.compilar(st.expr); if (!r.ok) return { error: r.error }; return { t: terminos(r.f, n) }; }
      var t = [], a = st.a1;
      if (st.modo === "fib") { t = [1, 1]; for (var i = 2; i < n; i++) t.push(t[i - 1] + t[i - 2]); return { t: t.slice(0, n) }; }
      for (var k = 0; k < n; k++) { t.push(a); a = st.p * a + st.q; }
      return { t: t };
    }
    function pinta() {
      campoExpr.style.display = st.modo === "general" ? "" : "none"; cuerpo.querySelector("[data-pre]").style.display = st.modo === "general" ? "" : "none";
      [sA, sP, sQ].forEach(function (s) { s.el.style.display = st.modo === "rec" ? "" : "none"; });
      sN.el.style.display = "";
      var res = serie(st.N);
      if (res.error) { lectura.innerHTML = U.lec("Error", res.error, "red"); return; }
      var t = res.t, largo = serie(400).t, vals = t.filter(isFinite);
      var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), pad = (mx - mn || 1) * 0.15;
      g.rango(0, st.N + 1, Math.min(mn, 0) - pad, Math.max(mx, 0) + pad);
      g.limpiar();
      t.forEach(function (v, i) { if (isFinite(v)) g.punto(i + 1, v, { r: 5, clase: "c-pen" }); });
      var m = monotonia(largo.slice(0, 60)), lv = largo.filter(isFinite), nfin = lv.length === largo.length;
      var max100 = Math.max.apply(null, largo.slice(0, 100).filter(isFinite).map(Math.abs)), max400 = Math.max.apply(null, lv.map(Math.abs));
      var acot = nfin && max400 <= 2 * max100 + 1e-9, cmax = Math.max.apply(null, lv), cmin = Math.min.apply(null, lv);
      var l4 = largo[399], l3 = largo[398], l2 = largo[199], conv = nfin && Math.abs(l4 - l3) < 1e-2 * Math.max(1, Math.abs(l4)) && Math.abs(l4 - l2) < 1e-2 * Math.max(1, Math.abs(l4));
      var l8 = serie(800).t[799];
      var diverge = !conv && (!nfin || (Math.abs(l4) > 100 && Math.abs(l4) > 1.5 * Math.abs(l2)));
      if (conv) g.horizontal(l8, { clase: "c-red", dash: "5 4" });
      lectura.innerHTML = U.lec("Primeros términos", t.slice(0, 6).map(function (v) { return fmt(v, 3); }).join(", ") + "…") + U.lec("Monotonía", m, m.indexOf("no") === 0 ? "red" : "ok") +
        U.lec("¿Acotada?", acot ? "parece que sí: entre " + fmt(cmin, 2) + " y " + fmt(cmax, 2) : "no (crece sin límite)", acot ? "pen" : "red") + U.lec("Tendencia", conv ? "converge a ≈ " + fmt(l8, 2) : (diverge ? "diverge (no se aquieta)" : "no converge (oscila)"), conv ? "ok" : "red");
      pie.innerHTML = st.modo === "rec" ? "Cada término sale del anterior: <b>aₙ₊₁ = p·aₙ + q</b>. Con p = 1 es una progresión aritmética (d = q); con q = 0 es geométrica (r = p)." : st.modo === "fib" ? "Fibonacci: cada término es la suma de los dos anteriores (1, 1, 2, 3, 5, 8, …)." : "Escribe cualquier expresión con <b>n</b>, por ejemplo <code>2n+1</code> o <code>(-1)^n</code>. Monotonía, cotas y tendencia se estiman con los primeros 400 términos: son una pista, no una demostración.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "general", t: "Término general aₙ" }, { k: "rec", t: "Por recurrencia" }, { k: "fib", t: "Fibonacci" }], st.modo, function (k) { st.modo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p) { return { k: p[0], t: p[1] }; }), st.expr, function (k) { st.expr = k; inp.value = k; pinta(); });
    inp.addEventListener("input", function () { st.expr = inp.value; pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 16, ymin: -1, ymax: 2, w: 640, h: 300, etx: "n", ety: "aₙ", etiqueta: "Términos de la sucesión" });
    pinta();
  };

  // ============================================================
  // ARITMETICA: la demostración visual de Gauss
  // ============================================================
  B.w.aritmetica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La suma de una progresión aritmética (el truco de Gauss)");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a1: 2, d: 2, n: 8 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Primer término <i>a₁</i>", min: 1, max: 10, step: 1, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Diferencia <i>d</i>", min: 0, max: 4, step: 1, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Términos <i>n</i>", min: 2, max: 16, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    function pinta() {
      var a1 = st.a1, d = st.d, n = st.n, an = a1 + (n - 1) * d, tope = a1 + an, S = n * tope / 2;
      g.rango(0, n + 1, 0, tope * 1.12);
      g.limpiar();
      for (var i = 1; i <= n; i++) {
        var ai = a1 + (i - 1) * d, bi = a1 + (n - i) * d;     // término i y el que lo completa (el de la posición n+1−i)
        g.rect(i - 0.42, 0, i + 0.42, ai, { clase: "z-pen", borde: "var(--pen)" });
        g.rect(i - 0.42, ai, i + 0.42, ai + bi, { clase: "z-red", borde: "var(--red)" });
      }
      g.horizontal(tope, { clase: "c-ok", dash: "5 4" });
      g.texto(n + 0.4, tope, "a₁ + aₙ = " + tope, { dx: -4, dy: -8, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("aₙ = a₁ + (n−1)·d", an, "pen") + U.lec("Cada columna (azul + rojo)", tope, "ok") + U.lec("Dos copias = n·(a₁+aₙ)", n + " × " + tope + " = " + (n * tope)) + U.lec("Sₙ = n·(a₁+aₙ)/2", S, "red");
      pie.innerHTML = "Las barras <b style='color:var(--pen)'>azules</b> son los términos. Pegándoles encima la misma lista <b style='color:var(--red)'>al revés</b>, todas las columnas miden lo mismo (a₁ + aₙ), y sale un rectángulo de <b>n × (a₁+aₙ)</b>. Como ese rectángulo contiene la suma <em>dos veces</em>, Sₙ es su mitad.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 9, ymin: 0, ymax: 10, w: 640, h: 300, etx: "n", ety: "", etiqueta: "Barras de una progresión aritmética y su copia invertida" });
    pinta();
  };

  // ============================================================
  // GEOMETRICA: términos y sumas parciales
  // ============================================================
  B.w.geometrica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Progresión geométrica: términos y suma");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a1: 4, r: 0.5, n: 12 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Primer término <i>a₁</i>", min: -8, max: 8, step: 1, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Razón <i>r</i>", min: -1.5, max: 1.5, step: 0.1, val: st.r, on: function (v) { st.r = Math.round(v * 10) / 10; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Términos <i>n</i>", min: 3, max: 25, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    function pinta() {
      var a1 = st.a1, r = st.r, n = st.n, t = [], S = [], s = 0, i;
      for (i = 0; i < n; i++) { var a = a1 * Math.pow(r, i); t.push(a); s += a; S.push(s); }
      var vals = t.concat(S), mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), inf = Math.abs(r) < 1 ? a1 / (1 - r) : null;
      if (inf !== null) { mn = Math.min(mn, inf); mx = Math.max(mx, inf); }
      var pad = (mx - mn || 1) * 0.15;
      g.rango(0, n + 1, Math.min(mn, 0) - pad, Math.max(mx, 0) + pad);
      g.limpiar();
      if (inf !== null) { g.horizontal(inf, { clase: "c-ok", dash: "6 4" }); g.texto(n + 0.5, inf, "S∞ = " + fmt(inf, 3), { dy: -8, ancla: "end", clase: "ok" }); }
      g.polilinea(S.map(function (v, k) { return [k + 1, v]; }), { clase: "c-red" });
      t.forEach(function (v, k) { g.punto(k + 1, v, { r: 5, clase: "c-pen" }); g.punto(k + 1, S[k], { r: 3.5, clase: "c-red" }); });
      var Sn = r === 1 ? a1 * n : a1 * (Math.pow(r, n) - 1) / (r - 1);
      lectura.innerHTML = U.lec("aₙ = a₁·rⁿ⁻¹", U.cient(t[n - 1], 4), "pen") + U.lec("Sₙ = a₁(rⁿ−1)/(r−1)", U.cient(Sn, 4), "red") +
        U.lec("Suma de infinitos términos", inf === null ? "no existe (|r| ≥ 1)" : "a₁/(1−r) = " + fmt(inf, 4), inf === null ? "" : "ok");
      pie.innerHTML = inf === null ? "Con |r| ≥ 1 los términos no se hacen pequeños y la suma no se estabiliza." : "Con |r| &lt; 1 los puntos <b style='color:var(--pen)'>azules</b> (términos) se acercan a 0 y la línea <b style='color:var(--red)'>roja</b> (suma parcial) se aprieta contra su límite <b style='color:var(--ok)'>S∞</b>." + (r < 0 ? " Con r negativa los términos alternan de signo y la suma oscila antes de asentarse." : "");
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 13, ymin: -1, ymax: 10, w: 640, h: 300, etx: "n", etiqueta: "Términos y sumas parciales de una progresión geométrica" });
    pinta();
  };

  // ============================================================
  // REBOTE: la pelota que rebota (serie geométrica)
  // ============================================================
  B.w.rebote = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La pelota que rebota");
    cuerpo.innerHTML = '<div class="reb-fila"><div class="w-plot reb-pelota"></div><div class="w-plot reb-alturas"></div></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { h0: 10, e: 0.6 }, G = 9.8, gP, gA, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Altura inicial <i>h₀</i> (m)", min: 2, max: 20, step: 1, val: st.h0, on: function (v) { st.h0 = v; pintaAlturas(); anim.t = 0; frame(0, 0, true); }, fmt: String });
    U.slider(ctl, { et: "Fracción que sube <i>e</i>", min: 0.2, max: 0.9, step: 0.05, val: st.e, on: function (v) { st.e = v; pintaAlturas(); anim.t = 0; frame(0, 0, true); }, fmt: function (v) { return fmt(v, 2); } });
    var bola;
    function tramos() {            // [tInicio, tFin, alturaMáx, esCaida]
      var t = 0, out = [], h = st.h0, k = 0;
      out.push([0, Math.sqrt(2 * h / G), h, true]); t = Math.sqrt(2 * h / G);
      for (k = 1; k <= 14; k++) { h *= st.e; var d = 2 * Math.sqrt(2 * h / G); out.push([t, t + d, h, false]); t += d; }
      return out;
    }
    function alturaEn(t) {
      var tr = tramos();
      for (var i = 0; i < tr.length; i++) {
        if (t <= tr[i][1]) {
          var T = tr[i][1] - tr[i][0], s = t - tr[i][0];
          return tr[i][3] ? st.h0 - 0.5 * G * s * s : tr[i][2] - 0.5 * G * Math.pow(s - T / 2, 2);
        }
      }
      return 0;
    }
    function recorrido(k) { var d = st.h0; for (var i = 1; i <= k; i++) d += 2 * st.h0 * Math.pow(st.e, i); return d; }
    function pintaAlturas() {
      var N = 12, pts = [], D = st.h0 * (1 + st.e) / (1 - st.e), i;
      gA.rango(0, N + 1, 0, D * 1.15); gA.limpiar();
      gA.horizontal(D, { clase: "c-ok", dash: "6 4" }); gA.texto(N + 0.5, D, "límite = " + fmt(D, 2) + " m", { dy: -8, ancla: "end", clase: "ok" });
      for (i = 0; i <= N; i++) { pts.push([i, recorrido(i)]); gA.rect(i - 0.3, 0, i + 0.3, st.h0 * Math.pow(st.e, i), { clase: "z-pen", borde: "var(--pen)" }); }
      gA.polilinea(pts, { clase: "c-red" }); pts.forEach(function (p) { gA.punto(p[0], p[1], { r: 3.5, clase: "c-red" }); });
      lectura.innerHTML = U.lec("Altura tras k rebotes", "h₀·eᵏ", "pen") + U.lec("Distancia total tras k rebotes", "h₀ + 2h₀(e + … + eᵏ)", "red") + U.lec("Distancia total (infinitos rebotes)", "h₀·(1+e)/(1−e) = " + fmt(D, 2) + " m", "ok");
      pie.innerHTML = "Después del primer golpe, cada rebote sube y baja <b>2·h₀·eᵏ</b>: esas distancias forman una progresión geométrica de razón e, que se puede sumar entera. Total = h₀ + 2·h₀·e/(1−e) = <b>h₀(1+e)/(1−e)</b>. Con h₀ = 10 y e = 0,6 sale 40 m.";
    }
    var anim, caidas = 0;
    function frame(t, dt, reinicio) {
      if (reinicio) caidas = 0;
      var h = alturaEn(t);
      gP.limpiar(); gP.punto(0.5, h, { r: 9, clase: "c-red" }); gP.segmento(0.1, 0, 0.9, 0, { clase: "c-ink" });
      var fin = t > tramos()[tramos().length - 1][1];
      return fin ? false : undefined;
    }
    var elP = cuerpo.querySelector(".reb-pelota"), elA = cuerpo.querySelector(".reb-alturas");
    gP = new B.Plot(elP, { xmin: 0, xmax: 1, ymin: -0.5, ymax: 21, w: 200, h: 300, sinEjes: true, sinX: true, etiqueta: "Pelota botando" });
    gA = new B.Plot(elA, { xmin: 0, xmax: 13, ymin: 0, ymax: 45, w: 440, h: 300, etx: "rebote k", etiqueta: "Altura de cada rebote y distancia total recorrida" });
    gP.rango(0, 1, -0.5, st.h0 + 1);
    pintaAlturas();
    anim = U.animar(cuerpo, function (t, dt, reinicio) { gP.rango(0, 1, -0.5, st.h0 + 1); return frame(t, dt, reinicio); }, { auto: false });
    anim.reproducir();
  };

  // ============================================================
  // FIBONACCI y la razón áurea
  // ============================================================
  B.w.fibonacci = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Fibonacci y la razón áurea");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var N0 = 14, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var PHI = (1 + Math.sqrt(5)) / 2;
    U.slider(ctl, { et: "Términos <i>N</i>", min: 5, max: 25, step: 1, val: N0, on: function (v) { pinta(v); }, fmt: String });
    function pinta(N) {
      var F = [1, 1], i; for (i = 2; i <= N + 1; i++) F.push(F[i - 1] + F[i - 2]);
      var razones = []; for (i = 0; i < N; i++) razones.push(F[i + 1] / F[i]);
      g.rango(0, N + 1, 0.9, 2.1); g.limpiar();
      g.horizontal(PHI, { clase: "c-ok", dash: "6 4" }); g.texto(N + 0.5, PHI, "φ = " + fmt(PHI, 6), { dy: -8, ancla: "end", clase: "ok" });
      g.polilinea(razones.map(function (r, k) { return [k + 1, r]; }), { clase: "c-faint" });
      razones.forEach(function (r, k) { g.punto(k + 1, r, { r: 4.5, clase: "c-pen" }); });
      lectura.innerHTML = U.lec("Términos", F.slice(0, 10).join(", ") + (N > 10 ? "…" : "")) + U.lec("aₙ₊₁ / aₙ (último)", fmt(razones[N - 1], 6), "pen") + U.lec("φ = (1+√5)/2", fmt(PHI, 6), "ok") + U.lec("Diferencia", fmt(Math.abs(razones[N - 1] - PHI), 8), "red");
      pie.innerHTML = "El cociente de dos términos consecutivos <b>se acerca a φ ≈ 1,618</b> (el número áureo) aunque la sucesión de partida no es geométrica. Es una de las sucesiones más famosas: aparece en las espirales de las piñas, los girasoles y las conchas.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 15, ymin: 0.9, ymax: 2.1, w: 640, h: 270, etx: "n", ety: "aₙ₊₁/aₙ", etiqueta: "Cociente de términos consecutivos de Fibonacci" });
    pinta(N0);
  };

  // ============================================================
  // INTERES: interés compuesto con aportaciones (progresión geométrica)
  // ============================================================
  B.w.interes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Interés compuesto: tu dinero como progresión geométrica");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { c0: 1000, r: 5, n: 10, a: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Capital inicial", min: 0, max: 5000, step: 100, val: st.c0, on: function (v) { st.c0 = v; pinta(); }, fmt: function (v) { return B.fmt(v, 0) + " €"; } });
    U.slider(ctl, { et: "Interés anual", min: 0, max: 10, step: 0.5, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " %"; } });
    U.slider(ctl, { et: "Años", min: 1, max: 40, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Aportación al empezar cada año", min: 0, max: 2000, step: 100, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return B.fmt(v, 0) + " €"; } });
    function pinta() {
      var q = 1 + st.r / 100, cap = [st.c0], aport = [st.c0], i;
      for (i = 1; i <= st.n; i++) { cap.push((cap[i - 1] + st.a) * q); aport.push(aport[i - 1] + st.a); }
      var fin = cap[st.n], mx = Math.max(fin, 1) * 1.1;
      g.rango(0, st.n + 1, 0, mx); g.limpiar();
      g.polilinea(aport.map(function (v, k) { return [k, v]; }), { clase: "c-faint", dash: "5 4" });
      g.polilinea(cap.map(function (v, k) { return [k, v]; }), { clase: "c-ok" });
      cap.forEach(function (v, k) { if (st.n <= 20 || k % 5 === 0) g.punto(k, v, { r: 3.5, clase: "c-ok" }); });
      g.texto(st.n, fin, B.fmt(fin, 0) + " €", { dx: -6, dy: -10, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("Capital final", B.fmt(fin, 2) + " €", "ok") + U.lec("Dinero puesto por ti", B.fmt(aport[st.n], 2) + " €") + U.lec("Intereses ganados", B.fmt(fin - aport[st.n], 2) + " €", "pen") + U.lec("Factor por año", fmt(q, 4));
      pie.innerHTML = st.a === 0 ? "Sin aportaciones: <b>C·(1 + r/100)ⁿ</b>. Cada año el capital se multiplica por " + fmt(q, 4) + " (razón de una progresión geométrica). La línea discontinua es lo que habrías puesto tú." : "Con aportaciones al <em>inicio</em> de cada año, el capital es una suma de progresiones geométricas: <b>C·qⁿ + a·q·(qⁿ−1)/(q−1)</b>, con q = " + fmt(q, 4) + ".";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 11, ymin: 0, ymax: 2000, w: 640, h: 280, etx: "años", ety: "€", etiqueta: "Evolución del capital con interés compuesto" });
    pinta();
  };

})(window);
