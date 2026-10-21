/* ============================================================
   Bachi para Firu · laboratorio de trigonometría, parte 3 (Matemáticas I, temas 4 y 5)
   Tema 4: inversas (arcsen, arccos, arctan) · navegacion (rumbos) · observador (alturas)
   Tema 5: rombo (de suma a producto) · batidos (pulsaciones) · cuadratica (2.º grado en sen/cos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var R = Math.PI / 180;
  function rad(d) { return d * R; }
  function deg(r) { return r / R; }
  function sen(d) { return Math.sin(rad(d)); }
  function cos(d) { return Math.cos(rad(d)); }
  function mod360(d) { var v = ((d % 360) + 360) % 360; v = Math.round(v * 1e9) / 1e9; return v === 360 ? 0 : v; }
  function gr(d, n) { return fmt(d, n == null ? 2 : n) + "°"; }
  function pad3(v) { v = Math.round(v); return (v < 10 ? "00" : v < 100 ? "0" : "") + v; }
  function signo(v, dec) { return (v < 0 ? "−" : "+") + " " + fmt(Math.abs(v), dec == null ? 1 : dec); }

  // Encaja en el lienzo (misma escala en los dos ejes) el rectángulo [minx, maxx] × [miny, maxy]
  function encaja(g, minx, maxx, miny, maxy, marg) {
    var c = g.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj, ratio = pw / ph;
    var semi = Math.max((maxy - miny) / 2, (maxx - minx) / 2 / ratio) * (marg || 1.2);
    if (!(semi > 1e-9)) semi = 1;
    g.rangoIso((minx + maxx) / 2, (miny + maxy) / 2, semi);
    return semi;
  }
  function grueso(el, w) { if (el) el.setAttribute("stroke-width", w); return el; }
  function tenue(el, w, o) { if (el) { el.setAttribute("stroke-width", w); el.setAttribute("stroke-opacity", o); el.setAttribute("stroke-linecap", "round"); } return el; }

  // ============================================================
  // INVERSAS: del valor al ángulo (arcsen, arccos, arctan) y su «otra» solución
  // ============================================================
  B.w.inversas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Del valor al ángulo: arcsen, arccos y arctan");
    cuerpo.innerHTML = '<div data-chips></div><div data-ctl></div><div class="w-plot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { f: "sen", k: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Valor <i>k</i>", min: -1, max: 1, step: 0.01, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    var NOM = { sen: "arcsen", cos: "arccos", tan: "arctan" };
    function sol(f, k) {
      if (f === "sen") { var a = deg(Math.asin(Math.max(-1, Math.min(1, k)))); return { a: a, otro: 180 - a }; }
      if (f === "cos") { var b = deg(Math.acos(Math.max(-1, Math.min(1, k)))); return { a: b, otro: -b }; }
      var c = deg(Math.atan(k)); return { a: c, otro: c + 180 };
    }
    function ajusta() {
      var tan = st.f === "tan";
      sl.input.min = tan ? -4 : -1; sl.input.max = tan ? 4 : 1; sl.input.step = tan ? 0.1 : 0.01;
      st.k = Math.max(+sl.input.min, Math.min(+sl.input.max, st.k)); sl.set(st.k);
    }
    function etiqueta(ang, texto, clase) {
      var x = cos(ang), y = sen(ang);
      g.texto(x * 1.2, y * 1.2, texto, { clase: clase, ancla: x >= -0.05 ? "start" : "end", dy: 4 });
    }
    function pinta() {
      var f = st.f, k = st.k, s = sol(f, k), a = s.a, s1 = mod360(a), s2 = mod360(s.otro), uno = Math.abs(s1 - s2) < 1e-6, nom = NOM[f];
      g.limpiar();
      g.segmento(-1.6, 0, 1.6, 0, { clase: "c-faint" }); g.segmento(0, -1.6, 0, 1.6, { clase: "c-faint" });
      tenue(f === "cos" ? g.arco(0, 0, 1, 0, 180, { clase: "c-pen" }) : g.arco(0, 0, 1, -90, 90, { clase: "c-pen" }), 12, 0.42);
      g.arco(0, 0, 1, 0, 360, { clase: "c-ink" });
      if (f === "sen") g.segmento(-1.6, k, 1.6, k, { clase: "c-ok", dash: "5 4" });
      else if (f === "cos") g.segmento(k, -1.6, k, 1.6, { clase: "c-ok", dash: "5 4" });
      else { g.segmento(1, -1.6, 1, 1.6, { clase: "c-faint", dash: "3 4" }); g.segmento(-1.6, -1.6 * k, 1.6, 1.6 * k, { clase: "c-ok", dash: "5 4" }); g.punto(1, k, { r: 5, clase: "c-ok" }); }
      grueso(g.arco(0, 0, 0.3, 0, a, { clase: "c-red" }), 3);
      if (!uno) grueso(g.arco(0, 0, 0.42, 0, s2, { clase: "c-ok" }), 2.4);
      g.punto(cos(a), sen(a), { r: 8, clase: "c-red" });
      etiqueta(a, fmt(a, 1) + "°", "red");
      if (!uno) { g.punto(cos(s2), sen(s2), { r: 8, clase: "c-ok hueco" }); etiqueta(s2, fmt(s2, 1) + "°", "ok"); }
      var lista = uno ? gr(s1) : (s1 < s2 ? gr(s1) + " y " + gr(s2) : gr(s2) + " y " + gr(s1));
      var fam = uno ? "x = " + fmt(s1, 2) + "° + 360°·n" : f === "tan" ? "x = " + fmt(s1, 2) + "° + 180°·n" : "x = " + fmt(s1, 2) + "° + 360°·n  ó  x = " + fmt(s2, 2) + "° + 360°·n";
      var rango = f === "cos" ? "0° a 180°" : "−90° a 90°";
      lectura.innerHTML = U.lec(nom + "(" + fmt(k, 2) + "), la calculadora", gr(a) + (a < 0 ? "  (≡ " + gr(mod360(a)) + ")" : ""), "red") +
        U.lec("Rango de " + nom, rango) +
        U.lec("Soluciones en [0°, 360°)", lista + (uno ? "  (solución única)" : ""), "ok") +
        U.lec("Todas las soluciones de " + f + " x = " + fmt(k, 2), fam, "ancho");
      pie.innerHTML = "La zona <b>gruesa</b> de la circunferencia es el único trozo en el que la calculadora busca (" + rango + "). Pero la ecuación <b>" + f + " x = k</b> tiene " + (f === "tan" ? "un ángulo cada media vuelta" : uno ? "aquí una sola solución" : "<b>dos</b> ángulos por vuelta") + ": el que ves en rojo (el de la calculadora) y el verde, que hay que añadir tú.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1.7, xmax: 1.7, ymin: -1.7, ymax: 1.7, w: 520, h: 330, limpio: true, etiqueta: "Circunferencia con los dos ángulos que tienen el mismo valor" });
    g.rangoIso(0, 0, 1.55);
    U.fichas(cuerpo.querySelector("[data-chips]"), [{ k: "sen", t: "sen x = k" }, { k: "cos", t: "cos x = k" }, { k: "tan", t: "tan x = k" }], st.f, function (k) { st.f = k; ajusta(); pinta(); });
    pinta();
  };

  // ============================================================
  // NAVEGACION: dos tramos con rumbos distintos y el regreso (teorema del coseno)
  // ============================================================
  B.w.navegacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Rumbos: dos tramos y el regreso a puerto");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { r1: 40, d1: 20, r2: 100, d2: 30 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function rum(v) { return pad3(v) + "°"; }
    U.slider(ctl, { et: "Rumbo 1.er tramo", min: 0, max: 359, step: 1, val: st.r1, on: function (v) { st.r1 = v; pinta(); }, fmt: rum });
    U.slider(ctl, { et: "Distancia 1.er tramo", min: 5, max: 50, step: 1, val: st.d1, on: function (v) { st.d1 = v; pinta(); }, fmt: function (v) { return v + " km"; } });
    U.slider(ctl, { et: "Rumbo 2.º tramo", min: 0, max: 359, step: 1, val: st.r2, on: function (v) { st.r2 = v; pinta(); }, fmt: rum });
    U.slider(ctl, { et: "Distancia 2.º tramo", min: 5, max: 50, step: 1, val: st.d2, on: function (v) { st.d2 = v; pinta(); }, fmt: function (v) { return v + " km"; } });
    function arcoRumbo(cx, cy, r, rumbo, clase) {
      if (rumbo < 1) return;
      grueso(g.arco(cx, cy, r, 90 - rumbo, 90, { clase: clase }), 2.4);
    }
    function pinta() {
      var x1 = st.d1 * sen(st.r1), y1 = st.d1 * cos(st.r1), x2 = x1 + st.d2 * sen(st.r2), y2 = y1 + st.d2 * cos(st.r2);
      var semi = encaja(g, Math.min(0, x1, x2), Math.max(0, x1, x2), Math.min(0, y1, y2), Math.max(0, y1, y2), 1.35);
      g.limpiar();
      var d = Math.hypot(x2, y2), rr = semi * 0.3, nl = semi * 0.62;
      // triángulo y norte de referencia
      if (Math.abs(x1 * y2 - x2 * y1) > 1e-6) g.poligono([[0, 0], [x1, y1], [x2, y2]], { clase: "z-ok" });
      g.segmento(0, 0, 0, nl, { clase: "c-faint", dash: "4 4" }); g.texto(0, nl, "N", { clase: "faint", ancla: "middle", dy: -4 });
      g.segmento(x1, y1, x1, y1 + nl, { clase: "c-faint", dash: "4 4" }); g.texto(x1, y1 + nl, "N", { clase: "faint", ancla: "middle", dy: -4 });
      arcoRumbo(0, 0, rr, st.r1, "c-pen"); arcoRumbo(x1, y1, rr, st.r2, "c-red");
      grueso(g.segmento(0, 0, x1, y1, { clase: "c-pen" }), 3.4);
      grueso(g.segmento(x1, y1, x2, y2, { clase: "c-red" }), 3.4);
      if (d > 1e-6) g.segmento(x2, y2, 0, 0, { clase: "c-ok", dash: "7 5" });
      g.punto(0, 0, { r: 7, clase: "c-ink" }); g.texto(0, 0, "Puerto", { dy: 18, dx: 8, clase: "" });
      g.punto(x1, y1, { r: 5, clase: "c-pen" }); g.punto(x2, y2, { r: 7, clase: "c-red" });
      g.texto(x1 / 2, y1 / 2, st.d1 + " km", { clase: "pen", dx: 6, dy: 14 });
      g.texto((x1 + x2) / 2, (y1 + y2) / 2, st.d2 + " km", { clase: "red", dx: 6, dy: -6 });
      if (d > 1e-6) g.texto(x2 / 2, y2 / 2, fmt(d, 1) + " km", { clase: "ok", ancla: "end", dx: -6, dy: 14 });
      // lecturas
      var ux = -x1, uy = -y1, vx = x2 - x1, vy = y2 - y1, nu = Math.hypot(ux, uy), nv = Math.hypot(vx, vy);
      var ang = deg(Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (nu * nv)))));
      var giro = ((st.r2 - st.r1 + 540) % 360) - 180;
      var regreso = mod360(deg(Math.atan2(-x2, -y2)));
      var cosd = Math.sqrt(Math.max(0, st.d1 * st.d1 + st.d2 * st.d2 - 2 * st.d1 * st.d2 * cos(ang)));
      lectura.innerHTML = U.lec("Cambio de rumbo", giro === 0 ? "ninguno" : Math.abs(giro) + "° a " + (giro > 0 ? "estribor (derecha)" : "babor (izquierda)")) +
        U.lec("Ángulo del triángulo en el giro", gr(ang) + "  (= 180° − " + Math.abs(giro) + "°)", "pen") +
        U.lec("d² = d₁² + d₂² − 2·d₁·d₂·cos θ", d < 1e-6 ? "vuelve al puerto" : "d = " + fmt(cosd, 2) + " km", "ok") +
        U.lec("Rumbo para volver", d < 1e-6 ? "—" : rum(regreso), "red");
      pie.innerHTML = "El <b>rumbo</b> se mide desde el norte, en el sentido de las agujas del reloj (090° = este, 180° = sur). El triángulo tiene como lados los dos tramos y el regreso; el ángulo entre los dos tramos <b>no es la diferencia de rumbos</b>, sino su suplementario: 180° − (cambio de rumbo).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -10, xmax: 60, ymin: -10, ymax: 40, w: 600, h: 330, limpio: true, etiqueta: "Mapa con dos tramos de navegación y el regreso" });
    pinta();
  };

  // ============================================================
  // OBSERVADOR: altura de un edificio con dos observaciones desde puntos alineados
  // ============================================================
  B.w.observador = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Altura de un edificio con dos observaciones");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 30, b: 45, d: 50 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sb;
    sa = U.slider(ctl, { et: "Elevación desde A (lejos) α", min: 10, max: 60, step: 1, val: st.a, on: function (v) { st.a = v; if (st.b < v + 2) { st.b = v + 2; sb.set(st.b); } pinta(); }, fmt: function (v) { return v + "°"; } });
    sb = U.slider(ctl, { et: "Elevación desde B (cerca) β", min: 12, max: 80, step: 1, val: st.b, on: function (v) { st.b = v; if (st.a > v - 2) { st.a = v - 2; sa.set(st.a); } pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Distancia AB", min: 10, max: 100, step: 5, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return v + " m"; } });
    function pinta() {
      var ta = Math.tan(rad(st.a)), tb = Math.tan(rad(st.b)), h = st.d * ta * tb / (tb - ta), x = h / tb, xa = x + st.d;
      var semi = encaja(g, -xa, xa * 0.22, -h * 0.12, h * 1.05, 1.18);
      g.limpiar();
      var bw = Math.max(xa * 0.07, 0.1 * h), ar = Math.min(xa, h) * 0.22;
      g.horizontal(0, { clase: "c-ink" });
      g.poligono([[0, 0], [bw, 0], [bw, h], [0, h]], { clase: "z-pen", borde: "var(--pen)" });
      g.segmento(-xa, 0, 0, h, { clase: "c-red" }); g.segmento(-x, 0, 0, h, { clase: "c-ok" });
      g.segmento(0, 0, 0, h, { clase: "c-faint", dash: "4 4" });
      grueso(g.arco(-xa, 0, ar, 0, st.a, { clase: "c-red" }), 2.6); grueso(g.arco(-x, 0, ar * 0.8, 0, st.b, { clase: "c-ok" }), 2.6);
      g.punto(-xa, 0, { r: 6, clase: "c-red" }); g.punto(-x, 0, { r: 6, clase: "c-ok" }); g.punto(0, h, { r: 4, clase: "c-ink" });
      g.texto(-xa, 0, "A", { dy: 20, ancla: "middle", clase: "red" }); g.texto(-x, 0, "B", { dy: 20, ancla: "middle", clase: "ok" });
      g.texto(-xa + ar * 1.1, ar * 0.25, "α", { clase: "red" }); g.texto(-x + ar * 0.95, ar * 0.45, "β", { clase: "ok", dy: -3 });
      g.texto(-(x + xa) / 2, 0, "d = " + st.d + " m", { dy: 30, ancla: "middle" });
      g.texto(0, h / 2, "h", { dx: -14, dy: 4, clase: "pen" });
      g.texto(-x / 2, 0, "x", { dy: 20, ancla: "middle", clase: "ok" });
      lectura.innerHTML = U.lec("tan α = h/(x + d)", fmt(ta, 4), "red") + U.lec("tan β = h/x", fmt(tb, 4), "ok") +
        U.lec("Altura h = d·tan α·tan β/(tan β − tan α)", fmt(h, 2) + " m", "pen") + U.lec("Distancia de B al pie, x = h/tan β", fmt(x, 2) + " m");
      pie.innerHTML = "Dos incógnitas (<i>h</i> y <i>x</i>) y dos ecuaciones: <b>tan β = h/x</b> y <b>tan α = h/(x + d)</b>. Restando las alturas despejadas, <i>d = h/tan α − h/tan β</i>, de donde sale <i>h</i>. No hace falta conocer la distancia al edificio.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -150, xmax: 50, ymin: -10, ymax: 70, w: 620, h: 310, limpio: true, etiqueta: "Un edificio visto desde dos puntos alineados" });
    pinta();
  };

  // ============================================================
  // ROMBO: sen A + sen B y cos A + cos B como suma de dos vectores unitarios
  // ============================================================
  B.w.rombo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "De suma a producto: el rombo de dos vectores unitarios");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { A: 70, B: 20 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Ángulo <i>A</i>", min: 0, max: 360, step: 1, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Ángulo <i>B</i>", min: 0, max: 360, step: 1, val: st.B, on: function (v) { st.B = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var A = st.A, Bb = st.B, ax = cos(A), ay = sen(A), bx = cos(Bb), by = sen(Bb), sx = ax + bx, sy = ay + by, m = (A + Bb) / 2, dm = (A - Bb) / 2;
      g.limpiar();
      g.segmento(-2.3, 0, 2.3, 0, { clase: "c-faint" }); g.segmento(0, -2.3, 0, 2.3, { clase: "c-faint" });
      g.arco(0, 0, 1, 0, 360, { clase: "c-faint", dash: "3 4" });
      g.segmento(-2.2 * cos(m), -2.2 * sen(m), 2.2 * cos(m), 2.2 * sen(m), { clase: "c-ink", dash: "6 4" });
      g.poligono([[0, 0], [ax, ay], [sx, sy], [bx, by]], { clase: "z-pen", borde: "var(--pen)", grosor: 1.2 });
      grueso(g.segmento(0, 0, ax, ay, { clase: "c-red" }), 3); grueso(g.segmento(0, 0, bx, by, { clase: "c-pen" }), 3);
      grueso(g.segmento(0, 0, sx, sy, { clase: "c-ok" }), 4.4);
      g.segmento(sx, 0, sx, sy, { clase: "c-ok", dash: "2 4" }); g.segmento(0, sy, sx, sy, { clase: "c-ok", dash: "2 4" });
      grueso(g.arco(0, 0, 0.3, 0, A, { clase: "c-red" }), 2); grueso(g.arco(0, 0, 0.45, 0, Bb, { clase: "c-pen" }), 2);
      g.punto(ax, ay, { r: 6, clase: "c-red" }); g.punto(bx, by, { r: 6, clase: "c-pen" }); g.punto(sx, sy, { r: 7, clase: "c-ok" });
      g.texto(ax * 1.12, ay * 1.12, "A", { clase: "red", ancla: ax >= 0 ? "start" : "end" }); g.texto(bx * 1.12, by * 1.12, "B", { clase: "pen", ancla: bx >= 0 ? "start" : "end", dy: 12 });
      g.texto(sx, sy, "suma", { clase: "ok", dx: sx >= 0 ? 10 : -10, ancla: sx >= 0 ? "start" : "end", dy: -8 });
      var ps = 2 * sen(m) * cos(dm), pc = 2 * cos(m) * cos(dm);
      lectura.innerHTML = U.lec("sen A + sen B (altura de la suma)", fmt(sy, 4) + "  =  2·sen((A+B)/2)·cos((A−B)/2) = " + fmt(ps, 4), "ok") +
        U.lec("cos A + cos B (abscisa de la suma)", fmt(sx, 4) + "  =  2·cos((A+B)/2)·cos((A−B)/2) = " + fmt(pc, 4), "ok") +
        U.lec("Dirección de la diagonal (A + B)/2", gr(m, 1)) + U.lec("Longitud de la diagonal 2·cos((A − B)/2)", fmt(2 * cos(dm), 4), "red");
      pie.innerHTML = "Las coordenadas de cada punto son <b>(cos, sen)</b>. Al sumar los dos vectores aparece un <b>rombo</b> (lados iguales a 1): su diagonal va por la bisectriz, en la dirección <b>(A + B)/2</b>, y mide <b>2·cos((A − B)/2)</b>. Sus componentes dan las fórmulas de suma a producto. Con A = B el rombo se aplana: la suma mide 2.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2.4, xmax: 2.4, ymin: -2.4, ymax: 2.4, w: 520, h: 360, limpio: true, etiqueta: "Suma de dos vectores unitarios: un rombo" });
    g.rangoIso(0, 0, 2.3);
    pinta();
  };

  // ============================================================
  // BATIDOS: dos ondas de frecuencias casi iguales
  // ============================================================
  B.w.batidos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Pulsaciones: sumar dos ondas casi iguales");
    cuerpo.innerHTML = '<div data-chips></div><div data-ctl></div><div class="w-plot bt-a"></div><div class="w-plot bt-b"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f1: 10, f2: 11 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), s1, s2;
    function hz(v) { return fmt(v, 1) + " Hz"; }
    s1 = U.slider(ctl, { et: "Frecuencia <i>f</i>₁", min: 6, max: 16, step: 0.5, val: st.f1, on: function (v) { st.f1 = v; pinta(); }, fmt: hz });
    s2 = U.slider(ctl, { et: "Frecuencia <i>f</i>₂", min: 6, max: 16, step: 0.5, val: st.f2, on: function (v) { st.f2 = v; pinta(); }, fmt: hz });
    function pinta() {
      var f1 = st.f1, f2 = st.f2, df = Math.abs(f1 - f2), fm = (f1 + f2) / 2, T = Math.PI * 2;
      g1.limpiar(); g2.limpiar();
      g1.curva(function (t) { return Math.sin(T * f1 * t); }, { clase: "c-pen", n: 900 });
      g1.curva(function (t) { return Math.sin(T * f2 * t); }, { clase: "c-ok", n: 900 });
      g2.curva(function (t) { return Math.sin(T * f1 * t) + Math.sin(T * f2 * t); }, { clase: "c-pen", n: 1200 });
      g2.curva(function (t) { return 2 * Math.cos(Math.PI * (f1 - f2) * t); }, { clase: "c-red", dash: "7 5", n: 400 });
      g2.curva(function (t) { return -2 * Math.cos(Math.PI * (f1 - f2) * t); }, { clase: "c-red", dash: "7 5", n: 400 });
      g2.texto(1.99, 2.45, "suma", { clase: "pen", ancla: "end" });
      lectura.innerHTML = U.lec("Frecuencia media (f₁ + f₂)/2", hz(fm), "pen") +
        U.lec("Frecuencia del batido |f₁ − f₂|", df < 1e-9 ? "0 (no hay batido)" : hz(df), "red") +
        U.lec("Periodo del batido", df < 1e-9 ? "—" : fmt(1 / df, 2) + " s") +
        U.lec("sen(2πf₁t) + sen(2πf₂t)", "2·cos(" + fmt(df / 2, 2) + "·2πt)·sen(" + fmt(fm, 2) + "·2πt)", "ancho");
      pie.innerHTML = "Arriba, las dos ondas (azul <i>f</i>₁, verde <i>f</i>₂). Abajo, la suma: una onda de frecuencia <b>media</b> cuya amplitud sube y baja siguiendo la <b>envolvente</b> roja 2·cos(π·(f₁ − f₂)·t). Es la fórmula sen A + sen B = 2·sen((A + B)/2)·cos((A − B)/2) con A = 2πf₁t y B = 2πf₂t. Con diapasones de 440 y 444 Hz se oye una «vibración» de 4 pulsaciones por segundo.";
    }
    g1 = new B.Plot(cuerpo.querySelector(".bt-a"), { xmin: 0, xmax: 2, ymin: -1.4, ymax: 1.4, w: 640, h: 150, sinY: true, etx: "t (s)", ety: "", etiqueta: "Las dos ondas por separado" });
    g2 = new B.Plot(cuerpo.querySelector(".bt-b"), { xmin: 0, xmax: 2, ymin: -2.7, ymax: 2.7, w: 640, h: 210, sinY: true, etx: "t (s)", ety: "", etiqueta: "La suma de las dos ondas y su envolvente" });
    U.fichas(cuerpo.querySelector("[data-chips]"), [{ k: "a", t: "Casi iguales (10 y 11)" }, { k: "b", t: "Más separadas (8 y 14)" }, { k: "c", t: "Iguales (12 y 12)" }], "a", function (k) {
      var p = { a: [10, 11], b: [8, 14], c: [12, 12] }[k]; st.f1 = p[0]; st.f2 = p[1]; s1.set(p[0]); s2.set(p[1]); pinta();
    });
    pinta();
  };

  // ============================================================
  // CUADRATICA: a·t² + b·t + c = 0 con t = sen x, cos x o tan x
  // ============================================================
  B.w.cuadratica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ecuaciones de 2.º grado en seno, coseno o tangente");
    cuerpo.innerHTML = '<div data-chips="f"></div><div data-chips="p"></div><div data-ctl></div><div class="w-plot cu-a"></div><div class="w-plot cu-b"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: "sen", a: 2, b: -1, c: -1 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sb, sc;
    var EXTRA = 1e-9;
    sa = U.slider(ctl, { et: "<i>a</i> (de <i>t</i>²)", min: 1, max: 4, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return String(v); } });
    sb = U.slider(ctl, { et: "<i>b</i> (de <i>t</i>)", min: -8, max: 8, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return v < 0 ? "−" + (-v) : String(v); } });
    sc = U.slider(ctl, { et: "<i>c</i> (término libre)", min: -8, max: 8, step: 1, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return v < 0 ? "−" + (-v) : String(v); } });
    function nom(f) { return f + " x"; }
    function ecu() {
      var f = st.f, s = "", a = st.a, b = st.b, c = st.c;
      s += (a === 1 ? "" : a) + f + "²x";
      if (b) s += (b < 0 ? " − " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + f + " x";
      if (c) s += (c < 0 ? " − " : " + ") + Math.abs(c);
      return s + " = 0";
    }
    function angulos(f, t) {
      var o;
      if (f === "sen") { if (Math.abs(t) > 1 + EXTRA) return []; var a = deg(Math.asin(Math.max(-1, Math.min(1, t)))); o = [mod360(a), mod360(180 - a)]; }
      else if (f === "cos") { if (Math.abs(t) > 1 + EXTRA) return []; var b = deg(Math.acos(Math.max(-1, Math.min(1, t)))); o = [mod360(b), mod360(-b)]; }
      else { var c = deg(Math.atan(t)); o = [mod360(c), mod360(c + 180)]; }
      o.sort(function (p, q) { return p - q; });
      return Math.abs(o[0] - o[1]) < 1e-6 ? [o[0]] : o;
    }
    function funcion(f) { return f === "sen" ? function (x) { return sen(x); } : f === "cos" ? function (x) { return cos(x); } : function (x) { return Math.tan(rad(x)); }; }
    function pinta() {
      var f = st.f, a = st.a, b = st.b, c = st.c, disc = b * b - 4 * a * c, tmax = f === "tan" ? 6 : 3, fn = funcion(f);
      var raices = disc < -1e-12 ? [] : disc < 1e-12 ? [-b / (2 * a)] : [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)];
      g1.rango(-tmax, tmax, -10, 10); g1.limpiar();
      if (f !== "tan") g1.rect(-1, -10, 1, 10, { clase: "z-ok" });
      g1.curva(function (t) { return a * t * t + b * t + c; }, { clase: "c-pen", n: 300 });
      var todas = [], valida = [];
      raices.forEach(function (t, i) {
        var ok = f === "tan" || Math.abs(t) <= 1 + EXTRA; valida.push(ok);
        g1.punto(t, 0, { r: 7, clase: ok ? "c-ok" : "c-red hueco" });
        g1.texto(t, 0, "t" + (raices.length === 1 ? "" : (i + 1 === 1 ? "₁" : "₂")), { dy: -12, ancla: "middle", clase: ok ? "ok" : "red" });
        if (ok) angulos(f, t).forEach(function (x) { todas.push(x); });
      });
      todas.sort(function (p, q) { return p - q; });
      var y0 = Infinity, y1 = -Infinity, k;
      if (f === "tan") { y0 = -10; y1 = 10; }
      else { for (k = 0; k <= 360; k += 2) { var sv = fn(k), yv = a * sv * sv + b * sv + c; y0 = Math.min(y0, yv); y1 = Math.max(y1, yv); } y0 = Math.max(-14, Math.min(y0, 0) - 1); y1 = Math.min(14, Math.max(y1, 0) + 1); }
      g2.rango(0, 360, y0, y1); g2.limpiar();
      [0, 90, 180, 270, 360].forEach(function (aa) { g2.texto(aa, y0, aa + "°", { dy: -4, dx: aa === 360 ? -14 : aa === 0 ? 14 : 0, ancla: "middle", clase: "faint" }); });
      g2.curva(function (x) { var s = fn(x); return a * s * s + b * s + c; }, { clase: "c-pen", n: 720 });
      todas.forEach(function (x) { g2.punto(x, 0, { r: 6, clase: "c-ok" }); g2.segmento(x, y0, x, y1, { clase: "c-ok", dash: "2 4" }); });
      function txt(t, i) { return "t" + (raices.length === 1 ? "" : i === 0 ? "₁" : "₂") + " = " + fmt(t, 3) + (valida[i] ? "  (vale)" : "  (no vale: |" + f + " x| ≤ 1)"); }
      lectura.innerHTML = U.lec("Ecuación (con t = " + nom(f) + ")", ecu(), "ancho") +
        U.lec("Discriminante b² − 4ac", fmt(disc, 0), disc < 0 ? "red" : "pen") +
        (raices.length ? raices.map(function (t, i) { return U.lec("Raíz en t", txt(t, i), valida[i] ? "ok" : "red"); }).join("") : U.lec("Raíces en t", "no hay (Δ &lt; 0)", "red")) +
        U.lec("Soluciones x en [0°, 360°)", todas.length ? todas.map(function (x) { return fmt(x, 2) + "°"; }).join(",  ") : "ninguna", "ok");
      pie.innerHTML = "Arriba, la parábola <i>a·t² + b·t + c</i>: sus cortes con el eje son las raíces en <i>t</i>." + (f === "tan" ? " Con la tangente valen <b>todas</b> las raíces." : " Como un " + f + " está entre −1 y 1, sólo valen las raíces de la <b>franja verde</b>.") + " Abajo, la misma expresión como función de x: sus ceros son las soluciones.";
    }
    var presets = [
      { k: "p1", t: "2sen²x − sen x − 1", f: "sen", a: 2, b: -1, c: -1 },
      { k: "p2", t: "2sen²x + 3sen x − 2", f: "sen", a: 2, b: 3, c: -2 },
      { k: "p3", t: "2cos²x − 3cos x + 1", f: "cos", a: 2, b: -3, c: 1 },
      { k: "p4", t: "tan²x − 4tan x + 3", f: "tan", a: 1, b: -4, c: 3 }
    ];
    function aplica(p) { st.f = p.f; st.a = p.a; st.b = p.b; st.c = p.c; sa.set(p.a); sb.set(p.b); sc.set(p.c); fichasF(); pinta(); }
    var hostF = cuerpo.querySelector('[data-chips="f"]'), hostP = cuerpo.querySelector('[data-chips="p"]');
    function fichasF() { U.fichas(hostF, [{ k: "sen", t: "t = sen x" }, { k: "cos", t: "t = cos x" }, { k: "tan", t: "t = tan x" }], st.f, function (k) { st.f = k; pinta(); }); }
    fichasF();
    U.fichas(hostP, presets.map(function (p) { return { k: p.k, t: p.t }; }), "p1", function (k) { presets.forEach(function (p) { if (p.k === k) aplica(p); }); });
    g1 = new B.Plot(cuerpo.querySelector(".cu-a"), { xmin: -3, xmax: 3, ymin: -10, ymax: 10, w: 620, h: 220, etx: "t", ety: "", etiqueta: "Parábola a·t² + b·t + c" });
    g2 = new B.Plot(cuerpo.querySelector(".cu-b"), { xmin: 0, xmax: 360, ymin: -10, ymax: 10, w: 620, h: 220, sinX: true, etx: "x", ety: "", etiqueta: "La misma expresión en función de x" });
    pinta();
  };
})(window);
