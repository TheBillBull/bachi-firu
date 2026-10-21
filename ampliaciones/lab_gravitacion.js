/* ============================================================
   Bachi para Firu · laboratorio de gravitación (Física y Química I, tema 11)
   datos B.lab.grav · f11_fuerza · f11_campo · f11_orbita · f11_kepler3
   f11_satelite · f11_escape · f11_neutro · f11_planetas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var Gr = B.lab.grav = {};
  var G = 6.674e-11, PI = Math.PI;
  Gr.G = G;

  // Datos (NASA, valores medios): masa M (kg), radio medio R (m), semieje mayor a (m), excentricidad e, periodo T (años)
  Gr.CUERPOS = {
    Mercurio: { M: 3.301e23, R: 2.4397e6, a: 5.791e10, e: 0.2056, T: 0.2408 },
    Venus: { M: 4.867e24, R: 6.0518e6, a: 1.0821e11, e: 0.0068, T: 0.6152 },
    Tierra: { M: 5.972e24, R: 6.371e6, a: 1.4960e11, e: 0.0167, T: 1.0000 },
    Marte: { M: 6.417e23, R: 3.3895e6, a: 2.2794e11, e: 0.0934, T: 1.8808 },
    "Júpiter": { M: 1.898e27, R: 6.9911e7, a: 7.7857e11, e: 0.0484, T: 11.862 },
    Saturno: { M: 5.683e26, R: 5.8232e7, a: 1.4335e12, e: 0.0542, T: 29.457 },
    Urano: { M: 8.681e25, R: 2.5362e7, a: 2.8707e12, e: 0.0472, T: 84.011 },
    Neptuno: { M: 1.024e26, R: 2.4622e7, a: 4.4984e12, e: 0.0086, T: 164.79 },
    Luna: { M: 7.342e22, R: 1.7374e6 },
    Sol: { M: 1.989e30, R: 6.957e8 }
  };
  Gr.PLANETAS = ["Mercurio", "Venus", "Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"];
  Gr.g = function (n, h) { var c = Gr.CUERPOS[n], r = c.R + (h || 0); return G * c.M / (r * r); };
  Gr.vOrb = function (n, h) { var c = Gr.CUERPOS[n]; return Math.sqrt(G * c.M / (c.R + (h || 0))); };
  Gr.vEsc = function (n) { var c = Gr.CUERPOS[n]; return Math.sqrt(2 * G * c.M / c.R); };
  Gr.periodo = function (M, r) { return 2 * PI * Math.sqrt(r * r * r / (G * M)); };
  Gr.kepler = function (Mn, e) { var E = Mn, i, d; for (i = 0; i < 60; i++) { d = (E - e * Math.sin(E) - Mn) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-13) break; } return E; };

  function cient(x, d) { return U.cient(x, d == null ? 3 : d); }
  function lec(r, v, c) { return U.lec(r, v, c); }
  function logmap(s, a, b) { return a * Math.pow(b / a, s / 100); }
  function circulo(g, cx, cy, r, clase, n) {
    var pts = [], i; n = n || 90;
    for (i = 0; i < n; i++) pts.push([cx + r * Math.cos(2 * PI * i / n), cy + r * Math.sin(2 * PI * i / n)]);
    return g.poligono(pts, { clase: clase || "z-pen", borde: "var(--ink-soft)", grosor: 1.2 });
  }
  function opciones(lista) { return lista.map(function (n) { return { k: n, t: n }; }); }
  function p10(x) { return Math.log(x) / Math.LN10; }

  // ============================================================
  // F11_FUERZA: ley de gravitación universal
  // ============================================================
  var PF = [
    { t: "Dos personas a 1 m", m1: 70, m2: 70, r: 1 },
    { t: "Dos camiones a 5 m", m1: 1e4, m2: 1e4, r: 5 },
    { t: "Tierra – persona", m1: 5.972e24, m2: 70, r: 6.371e6 },
    { t: "Tierra – Luna", m1: 5.972e24, m2: 7.342e22, r: 3.844e8 },
    { t: "Sol – Tierra", m1: 1.989e30, m2: 5.972e24, r: 1.496e11 }
  ];
  B.w.f11_fuerza = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La fuerza de atracción gravitatoria entre dos masas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: p10(70), b: p10(70), c: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {};
    sl.a = U.slider(ctl, { et: "Masa m₁", min: 0, max: 31, step: 0.05, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return cient(Math.pow(10, v), 2) + " kg"; } });
    sl.b = U.slider(ctl, { et: "Masa m₂", min: 0, max: 31, step: 0.05, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return cient(Math.pow(10, v), 2) + " kg"; } });
    sl.c = U.slider(ctl, { et: "Distancia r", min: -1, max: 12, step: 0.05, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return cient(Math.pow(10, v), 2) + " m"; } });
    function pinta() {
      var m1 = Math.pow(10, st.a), m2 = Math.pow(10, st.b), r = Math.pow(10, st.c), F = G * m1 * m2 / (r * r), peso = F / 9.81;
      g.limpiar();
      var lx0 = st.c - 3, lx1 = st.c + 3, f0 = p10(G * m1 * m2) - 2 * lx0, f1 = p10(G * m1 * m2) - 2 * lx1;
      g.rango(lx0, lx1, Math.min(f0, f1) - 0.3, Math.max(f0, f1) + 0.3); g.limpiar();
      g.segmento(lx0, f0, lx1, f1, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.segmento(st.c, g.c.ymin, st.c, p10(F), { clase: "c-faint", dash: "4 4" }); g.segmento(lx0, p10(F), st.c, p10(F), { clase: "c-faint", dash: "4 4" });
      g.punto(st.c, p10(F), { r: 7, clase: "c-red" });
      g.punto(st.c + 0.30103, p10(F) - 0.60206, { r: 5, clase: "c-ok" });
      g.texto(st.c + 0.30103, p10(F) - 0.60206, "r × 2 → F/4", { dx: 8, dy: 16, clase: "ok" });
      lectura.innerHTML = lec("Fuerza F = G·m₁·m₂/r²", cient(F, 3) + " N", "red") + lec("Masa 1 · masa 2", cient(m1, 2) + " kg · " + cient(m2, 2) + " kg") + lec("Distancia", cient(r, 2) + " m") +
        lec("Equivale al peso de…", F < 1e-9 ? "una masa de " + cient(peso, 2) + " kg: ¡diminuta!" : "una masa de " + cient(peso, 3) + " kg (F/9,81)", "ok") +
        lec("Si r se duplica…", "F pasa a " + cient(F / 4, 3) + " N (÷ 4)", "ok") + lec("Si una masa se duplica…", "F pasa a " + cient(2 * F, 3) + " N (× 2)");
      pie.innerHTML = "Eje horizontal: log<sub>10</sub> r; eje vertical: log<sub>10</sub> F (se usan logaritmos porque F cambia en decenas de órdenes de magnitud). En esta escala la fuerza es una <b>recta de pendiente −2</b>: F ∝ 1/r². El punto verde muestra el efecto de duplicar la distancia: la fuerza baja a la cuarta parte. Dos personas casi no se atraen (≈ 3·10⁻⁷ N); la Tierra sí atrae a una persona: eso es el peso.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 3, ymin: -10, ymax: 10, w: 600, h: 300, etx: "log r", ety: "log F", etiqueta: "Fuerza gravitatoria frente a la distancia" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PF.map(function (p, i) { return { k: String(i), t: p.t }; }), "", function (k) { var p = PF[+k]; st.a = p10(p.m1); st.b = p10(p.m2); st.c = p10(p.r); sl.a.set(st.a); sl.b.set(st.b); sl.c.set(st.c); pinta(); });
    pinta();
  };

  // ============================================================
  // F11_CAMPO: intensidad de campo g según la altura
  // ============================================================
  B.w.f11_campo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La intensidad del campo gravitatorio g y la altura");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: "Tierra", h: 0.5, m: 60 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Altura h (en R)", min: 0, max: 5, step: 0.05, val: st.h, on: function (v) { st.h = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " R"; } });
    U.slider(ctl, { et: "Masa persona", min: 10, max: 150, step: 5, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    function pinta() {
      var c = Gr.CUERPOS[st.n], R = c.R, h = st.h * R, g0 = Gr.g(st.n, 0), gh = Gr.g(st.n, h);
      g.limpiar(); g.rango(0, 5, 0, g0 * 1.1); g.limpiar();
      g.curva(function (x) { return G * c.M / Math.pow(R * (1 + x), 2); }, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3);
      g.horizontal(g0, { clase: "c-faint", dash: "5 5" });
      g.segmento(st.h, 0, st.h, gh, { clase: "c-faint", dash: "4 4" }); g.segmento(0, gh, st.h, gh, { clase: "c-faint", dash: "4 4" });
      g.punto(st.h, gh, { r: 7, clase: "c-red" });
      if (st.n === "Tierra") { var hi = 4.2e5 / R; g.punto(hi, Gr.g("Tierra", 4.2e5), { r: 4, clase: "c-ok" }); g.texto(hi, Gr.g("Tierra", 4.2e5), "ISS", { dx: 8, dy: -8, clase: "ok" }); }
      lectura.innerHTML = lec("Cuerpo", st.n + " (M = " + cient(c.M, 3) + " kg, R = " + cient(R, 4) + " m)", "ancho") + lec("g en la superficie = GM/R²", fmt(g0, 2) + " m/s²", "pen") +
        lec("g a la altura h = " + cient(h, 3) + " m", fmt(gh, 3) + " m/s²  (" + fmt(100 * gh / g0, 1) + " % de g₀)", "red") + lec("Peso de " + st.m + " kg en la superficie", fmt(st.m * g0, 1) + " N") + lec("Peso a esa altura", fmt(st.m * gh, 1) + " N", "ok") +
        lec("Masa a esa altura", st.m + " kg (la masa no cambia)", "ok");
      pie.innerHTML = "g = GM/(R + h)²: decrece con el cuadrado de la distancia al <b>centro</b> del cuerpo, no a la superficie. A h = R (el doble de distancia) vale g₀/4. La estación espacial (420 km) está tan cerca de la superficie que su g es el 89 % de g₀: <b>no flota por falta de gravedad</b>, sino porque está en caída libre.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 5, ymin: 0, ymax: 11, w: 600, h: 300, etx: "h/R", ety: "g (m/s²)", etiqueta: "Intensidad del campo en función de la altura" });
    U.fichas(cuerpo.querySelector("[data-pre]"), opciones(["Tierra", "Luna", "Marte", "Venus", "Júpiter", "Sol"]), "Tierra", function (k) { st.n = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F11_ORBITA: leyes de Kepler (elipse, áreas, velocidades)
  // ============================================================
  B.w.f11_orbita = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Órbita elíptica: las leyes de Kepler en acción");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: 1, e: 0.5, f: 0.12, dt: 0.1, areas: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an;
    sl.a = U.slider(ctl, { et: "Semieje a (UA)", min: 0.4, max: 5, step: 0.1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " UA"; } });
    sl.e = U.slider(ctl, { et: "Excentricidad e", min: 0, max: 0.9, step: 0.05, val: st.e, on: function (v) { st.e = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sl.f = U.slider(ctl, { et: "Posición (en T)", min: 0, max: 1, step: 0.01, val: st.f, on: function (v) { st.f = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " T"; } });
    sl.dt = U.slider(ctl, { et: "Intervalo Δt (en T)", min: 0.02, max: 0.25, step: 0.01, val: st.dt, on: function (v) { st.dt = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " T"; } });
    function pos(Mn, a, e) { var E = Gr.kepler(Mn, e), b = a * Math.sqrt(1 - e * e); return { x: a * (Math.cos(E) - e), y: b * Math.sin(E), r: a * (1 - e * Math.cos(E)), E: E }; }
    function sector(M0, dM, a, e, clase) {
      var pts = [[0, 0]], k, N = 40; for (k = 0; k <= N; k++) { var p = pos(M0 + dM * k / N, a, e); pts.push([p.x, p.y]); }
      g.poligono(pts, { clase: clase, borde: "var(--ink-soft)", grosor: 1 });
    }
    function pinta() {
      var a = st.a, e = st.e, b = a * Math.sqrt(1 - e * e), T = Math.pow(a, 1.5), Mn = 2 * PI * st.f, dM = 2 * PI * st.dt;
      var rp = a * (1 - e), ra = a * (1 + e), semi = a * (1 + e) * 1.25;
      g.rango(-semi - a * e * 0, semi, -semi * 0.8, semi * 0.8); g.rangoIso(-a * e, 0, a * 1.2); g.limpiar();
      var orb = [], k; for (k = 0; k <= 180; k++) { var q = pos(2 * PI * k / 180, a, e); orb.push([q.x, q.y]); }
      g.polilinea(orb, { clase: "c-faint" });
      if (st.areas) { sector(-dM / 2, dM, a, e, "z-ok"); sector(PI - dM / 2, dM, a, e, "z-red"); }
      var P = pos(Mn, a, e), dEdt = 2 * PI / T / (1 - e * Math.cos(P.E)), vx = -a * Math.sin(P.E) * dEdt, vy = b * Math.cos(P.E) * dEdt, vmod = Math.hypot(vx, vy);
      g.punto(0, 0, { r: 9, clase: "c-hl" });
      g.segmento(0, 0, P.x, P.y, { clase: "c-pen", dash: "4 3" });
      var esc = 0.25 * a / Math.max(vmod, 1e-9); U.flecha(g, P.x, P.y, P.x + vx * esc, P.y + vy * esc, { clase: "c-red", grosor: 3 });
      g.punto(P.x, P.y, { r: 6.5, clase: "c-pen" });
      g.texto(rp * 1, 0, "perihelio", { dy: 15, dx: 4, clase: "ok" }); g.texto(-ra, 0, "afelio", { dy: 15, dx: -4, clase: "ok", ancla: "end" });
      var kms = 4.74047, vp = Math.sqrt(4 * PI * PI * (2 / rp - 1 / a)) * kms, va = Math.sqrt(4 * PI * PI * (2 / ra - 1 / a)) * kms, Aa = PI * a * b * st.dt;
      lectura.innerHTML = lec("Periodo (3.ª ley: T² = a³)", fmt(T, 3) + " años", "pen") + lec("Distancia al Sol r", fmt(P.r, 3) + " UA", "") + lec("Velocidad v", fmt(vmod * kms, 2) + " km/s", "red") +
        lec("Perihelio · afelio", fmt(rp, 3) + " UA · " + fmt(ra, 3) + " UA") + lec("v en el perihelio · en el afelio", fmt(vp, 2) + " km/s · " + fmt(va, 2) + " km/s") +
        lec("Cociente v<sub>p</sub>/v<sub>a</sub> = (1 + e)/(1 − e)", fmt(vp / va, 3) + "  (= r<sub>a</sub>/r<sub>p</sub> = " + fmt(ra / rp, 3) + ")", "ok") + lec("Área de cada sector sombreado (iguales)", fmt(Aa, 3) + " UA²", "ok ancho");
      pie.innerHTML = "Las dos zonas sombreadas son lo que barre el radio vector en el <b>mismo intervalo de tiempo Δt</b>, una en el perihelio (verde) y otra en el afelio (roja): <b>tienen el mismo área</b> (2.ª ley). Cerca del Sol el arco es largo (el planeta va deprisa); lejos, corto. La flecha roja es la velocidad (siempre tangente a la órbita). El Sol está en un foco (punto amarillo).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 2, ymin: -1.6, ymax: 1.6, w: 600, h: 340, limpio: true, etiqueta: "Órbita elíptica con el Sol en un foco" });
    an = U.animar(cuerpo, function (t, dt) { if (dt) { st.f = (st.f + dt * 0.1) % 1; sl.f.set(st.f); pinta(); } }, { auto: false });
    pinta();
  };

  // ============================================================
  // F11_KEPLER3: T² / a³ constante
  // ============================================================
  var LUNAS = [["Ío", 4.217e8, 1.769], ["Europa", 6.710e8, 3.551], ["Ganímedes", 1.0704e9, 7.155], ["Calisto", 1.8827e9, 16.689]];
  B.w.f11_kepler3 = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Tercera ley de Kepler: T² es proporcional a a³");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="ac-tabla"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "sol", x: 2.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla"), slx;
    slx = U.slider(ctl, { et: "Semieje a (UA)", min: 0.3, max: 40, step: 0.1, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " UA"; } });
    function pinta() {
      g.limpiar(); var filas = "";
      if (st.k === "sol") {
        g.rango(-0.6, 1.8, -1, 2.8); g.limpiar();
        g.segmento(-0.6, -0.9, 1.8, 2.7, { clase: "c-ok", dash: "6 5" }); g.texto(0.95, 1.425, "pendiente 3/2", { clase: "ok", dx: 8, dy: 22 });
        Gr.PLANETAS.forEach(function (n) { var c = Gr.CUERPOS[n], a = c.a / 1.496e11; g.punto(p10(a), p10(c.T), { r: 5, clase: "c-pen" }); g.texto(p10(a), p10(c.T), n, { dx: 8, dy: -6, clase: "pen" }); filas += "<tr><th>" + n + "</th><td>" + fmt(a, 4) + "</td><td>" + fmt(c.T, 4) + "</td><td class='ok'>" + fmt(c.T * c.T / (a * a * a), 3) + "</td></tr>"; });
        var Tx = Math.pow(st.x, 1.5); g.punto(p10(st.x), p10(Tx), { r: 8, clase: "c-red" });
        tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th></th><th>a (UA)</th><th>T (años)</th><th>T²/a³</th></tr></thead><tbody>" + filas + "</tbody></table>";
        lectura.innerHTML = lec("Cuerpo imaginario", "a = " + fmt(st.x, 1) + " UA → T = a<sup>3/2</sup> = " + fmt(Tx, 2) + " años", "red") + lec("Constante de Kepler", "T²/a³ = 4π²/(GM☉) = 1 año²/UA³", "ok") + lec("En unidades del SI", cient(4 * PI * PI / (G * 1.989e30), 4) + " s²/m³", "pen");
        pie.innerHTML = "En <b>escala logarítmica</b> (log a, log T) todos los planetas quedan sobre una recta de pendiente <b>3/2</b>: T² = k·a³ con la <b>misma</b> k para todos. El punto rojo es un planeta imaginario a la distancia que tú elijas.";
      } else {
        g.rango(8.4, 9.6, -0.2, 1.5); g.limpiar();
        g.segmento(8.4, 1.5 * 8.4 - 12.69, 9.6, 1.5 * 9.6 - 12.69, { clase: "c-ok", dash: "6 5" });
        var MJ = Gr.CUERPOS["Júpiter"].M;
        LUNAS.forEach(function (l) { var a = l[1], T = l[2] * 86400, y = p10(l[2]), x = p10(a); g.punto(x, y, { r: 5, clase: "c-pen" }); g.texto(x, y, l[0], { dx: 8, dy: -6, clase: "pen" }); filas += "<tr><th>" + l[0] + "</th><td>" + cient(a, 4) + "</td><td>" + fmt(l[2], 3) + "</td><td class='ok'>" + cient(T * T / (a * a * a), 4) + "</td></tr>"; });
        tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th></th><th>a (m)</th><th>T (días)</th><th>T²/a³ (s²/m³)</th></tr></thead><tbody>" + filas + "</tbody></table>";
        lectura.innerHTML = lec("Constante de Kepler para Júpiter", "4π²/(GM<sub>J</sub>) = " + cient(4 * PI * PI / (G * MJ), 4) + " s²/m³", "ok") + lec("Qué permite", "pesar a Júpiter: M = 4π²a³/(G·T²)", "pen");
        pie.innerHTML = "Cada sistema (Sol, Júpiter, la Tierra…) tiene <b>su propia constante</b> k = 4π²/(GM), que depende sólo de la masa del cuerpo central. Medir a y T de una luna permite calcular la masa del planeta, sin pesarlo.";
      }
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -0.6, xmax: 1.8, ymin: -1, ymax: 2.8, w: 600, h: 320, etx: "log a", ety: "log T", etiqueta: "Tercera ley de Kepler en escala logarítmica" });
    U.fichas(cuerpo.querySelector("[data-sel]"), [{ k: "sol", t: "Planetas alrededor del Sol" }, { k: "jup", t: "Lunas de Júpiter" }], "sol", function (k) { st.k = k; slx.el.style.display = k === "sol" ? "" : "none"; pinta(); });
    pinta();
  };

  // ============================================================
  // F11_SATELITE: satélite en órbita circular
  // ============================================================
  B.w.f11_satelite = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Satélite en órbita circular: velocidad, periodo y energía");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-pl class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: "Tierra", s: 28, m: 1000, ang: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an;
    function hKm() { return 0.01 * Gr.CUERPOS[st.n].R * Math.pow(6000, st.s / 100) / 1000; }
    sl.s = U.slider(ctl, { et: "Altura sobre la superficie", min: 0, max: 100, step: 0.5, val: st.s, on: function (v) { st.s = v; pinta(); }, fmt: function (v) { var k = hKm(); return (k < 100 ? fmt(k, 1) : fmt(k, 0)) + " km"; } });
    sl.m = U.slider(ctl, { et: "Masa del satélite", min: 100, max: 10000, step: 100, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    function pinta() {
      var c = Gr.CUERPOS[st.n], R = c.R, h = hKm() * 1000, r = R + h, GM = G * c.M, v = Math.sqrt(GM / r), T = 2 * PI * r / v, w = v / r;
      g.rangoIso(0, 0, r * 1.2); g.limpiar();
      circulo(g, 0, 0, R, "z-pen"); g.arco(0, 0, r, 0, 360, { clase: "c-faint", dash: "5 5" });
      var th = st.ang; g.segmento(0, 0, r * Math.cos(th), r * Math.sin(th), { clase: "c-faint", dash: "2 4" });
      U.flecha(g, r * Math.cos(th), r * Math.sin(th), r * Math.cos(th) - 0.18 * r * Math.cos(th), r * Math.sin(th) - 0.18 * r * Math.sin(th), { clase: "c-ok", grosor: 3 });
      U.flecha(g, r * Math.cos(th), r * Math.sin(th), r * Math.cos(th) - 0.22 * r * Math.sin(th), r * Math.sin(th) + 0.22 * r * Math.cos(th), { clase: "c-red", grosor: 3 });
      g.punto(r * Math.cos(th), r * Math.sin(th), { r: 6, clase: "c-pen" });
      var Ec = GM * st.m / (2 * r), Ep = -GM * st.m / r, Em = -GM * st.m / (2 * r), gh = GM / (r * r);
      lectura.innerHTML = lec("Cuerpo central", st.n + " (R = " + cient(R, 4) + " m)") + lec("Radio de la órbita r = R + h", cient(r, 4) + " m", "pen") + lec("g a esa altura = GM/r²", fmt(gh, 3) + " m/s²") +
        lec("Velocidad orbital v = √(GM/r)", fmt(v, 0) + " m/s  (" + fmt(v / 1000, 3) + " km/s)", "red") + lec("Periodo T = 2πr/v", T < 7200 ? fmt(T / 60, 2) + " min" : T < 172800 ? fmt(T / 3600, 3) + " h" : fmt(T / 86400, 3) + " días", "red") +
        lec("Velocidad angular ω = v/r", cient(w, 3) + " rad/s") + lec("E<sub>c</sub> = GMm/2r", cient(Ec, 3) + " J", "ok") + lec("E<sub>p</sub> = −GMm/r", cient(Ep, 3) + " J", "ok") + lec("E<sub>m</sub> = −GMm/2r = E<sub>p</sub>/2", cient(Em, 3) + " J", "ok") +
        lec("Comparación", "v/v<sub>escape</sub> = " + fmt(v / Gr.vEsc(st.n), 3) + " (vale 1/√2 ≈ 0,707 en órbita rasante)");
      pie.innerHTML = "Flecha verde: fuerza gravitatoria (centrípeta, hacia el centro). Flecha roja: velocidad (tangente). Con la altura, la velocidad <b>disminuye</b> y el periodo <b>aumenta</b>. La energía mecánica es <b>negativa</b>: el satélite está ligado. La masa del satélite no influye en v ni en T (sólo en la energía). Pulsa «Reproducir» para ver la órbita (el movimiento está acelerado para que se vea).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 2, ymin: -2, ymax: 2, w: 480, h: 320, limpio: true, etiqueta: "Órbita circular" });
    an = U.animar(cuerpo, function (t, dt) { if (dt) { st.ang = (st.ang + dt * 1.2) % (2 * PI); pinta(); } }, { auto: false });
    U.fichas(cuerpo.querySelector("[data-pre]"), [{ k: "iss", t: "ISS (420 km)" }, { k: "gps", t: "GPS (20 200 km)" }, { k: "geo", t: "Geoestacionario (35 786 km)" }, { k: "luna", t: "Luna (384 400 km del centro)" }], "", function (k) {
      var R = Gr.CUERPOS.Tierra.R, hm = { iss: 4.2e5, gps: 2.02e7, geo: 3.5786e7, luna: 3.844e8 - R }[k]; st.n = "Tierra"; st.s = 100 * Math.log(hm / (0.01 * R)) / Math.log(6000); sl.s.set(st.s); pinta();
    });
    U.fichas(cuerpo.querySelector("[data-pl]"), opciones(["Tierra", "Marte", "Júpiter", "Luna", "Sol"]), "Tierra", function (k) { st.n = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F11_ESCAPE: pozo de potencial y velocidad de escape
  // ============================================================
  B.w.f11_escape = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Pozo de potencial gravitatorio y velocidad de escape");
    cuerpo.innerHTML = '<div data-pl class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: "Tierra", p: 80, r: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl = {}, an, sim = { r: 1, v: 0 };
    sl.p = U.slider(ctl, { et: "Velocidad (% de v<sub>e</sub>)", min: 10, max: 140, step: 1, val: st.p, on: function (v) { st.p = v; sim.r = 1; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } });
    function pinta() {
      var c = Gr.CUERPOS[st.n], R = c.R, GM = G * c.M, ve = Math.sqrt(2 * GM / R), v0 = ve * st.p / 100, E = 0.5 * v0 * v0 - GM / R;
      var Vmin = -GM / R * 1.1; g.rango(1, 8, Vmin / 1e6, -Vmin / 1e6 * 0.25); g.limpiar();
      g.horizontal(0, { clase: "c-faint" });
      g.curva(function (x) { return -GM / (R * x) / 1e6; }, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3);
      var Em = E / 1e6; g.horizontal(Em, { clase: "c-red", dash: "6 4" });
      var rmax = E < 0 ? -GM / E / R : null;
      if (rmax && rmax < 8) { g.segmento(rmax, Vmin / 1e6, rmax, Em, { clase: "c-red", dash: "3 4" }); g.punto(rmax, Em, { r: 6, clase: "c-red" }); g.texto(rmax, Em, "r máx", { dx: 8, dy: -8, clase: "red" }); }
      g.texto(7.6, -GM / (R * 7.6) / 1e6, "Ep(r)", { dx: 0, dy: -10, ancla: "end", clase: "pen" });
      var rr = Math.min(sim.r, 7.9), Epr = -GM / (R * rr) / 1e6; g.punto(rr, Epr, { r: 7, clase: "c-ok" });
      g.segmento(rr, Epr, rr, Em, { clase: "c-ok" });
      var tipo = E < -1e-6 * GM / R ? "ligado: sube hasta r<sub>máx</sub> y vuelve a caer" : Math.abs(E) <= 1e-6 * GM / R ? "justo la velocidad de escape: llega al infinito con v = 0 (trayectoria parabólica)" : "escapa: llega al infinito con velocidad (trayectoria hiperbólica)";
      lectura.innerHTML = lec("Velocidad de escape v<sub>e</sub> = √(2GM/R)", fmt(ve / 1000, 3) + " km/s", "pen") + lec("Velocidad de lanzamiento", fmt(v0 / 1000, 3) + " km/s (" + fmt(st.p, 0) + " %)", "red") +
        lec("Energía mecánica por kg  E = ½v₀² − GM/R", fmt(E / 1e6, 3) + " MJ/kg", E < 0 ? "pen" : "ok") + lec("Resultado", tipo, "ancho " + (E < 0 ? "red" : "ok")) +
        lec("Altura máxima alcanzada", rmax ? (rmax * R - R) > 0 ? cient(rmax * R - R, 3) + " m (r<sub>máx</sub> = " + fmt(rmax, 2) + " R)" : "—" : "sin límite (escapa)", "red");
      pie.innerHTML = "La curva azul es la energía potencial por unidad de masa, −GM/r: un <b>pozo</b>. La línea roja es la energía mecánica E (constante). El cuerpo sólo puede estar donde E ≥ E<sub>p</sub>: se detiene donde se cortan. Si E &lt; 0 queda atrapado en el pozo; si E ≥ 0, escapa. Con v = 100 % de v<sub>e</sub>, E = 0.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 1, xmax: 8, ymin: -80, ymax: 20, w: 600, h: 320, etx: "r/R", ety: "E (MJ/kg)", etiqueta: "Pozo de potencial" });
    an = U.animar(cuerpo, function (t, dt, reinicio) {
      var c = Gr.CUERPOS[st.n], R = c.R, GM = G * c.M, ve = Math.sqrt(2 * GM / R), E = 0.5 * Math.pow(ve * st.p / 100, 2) - GM / R;
      if (reinicio) { sim.r = 1; pinta(); return; }
      var rm = E < 0 ? -GM / E : Infinity, k = Math.max(0, E + GM / (sim.r * R)), v = Math.sqrt(2 * k);
      sim.r += (sim.sub ? -1 : 1) * v * dt * 600 / R;
      if (sim.r * R >= rm) sim.sub = true;
      if (sim.r < 1) { sim.r = 1; sim.sub = false; }
      pinta();
    }, { auto: false });
    U.fichas(cuerpo.querySelector("[data-pl]"), opciones(["Tierra", "Luna", "Marte", "Júpiter", "Sol"]), "Tierra", function (k) { st.n = k; sim.r = 1; pinta(); });
    pinta();
  };

  // ============================================================
  // F11_NEUTRO: campo de dos cuerpos y punto neutro
  // ============================================================
  var PN = [
    { t: "Tierra – Luna", n1: "Tierra", n2: "Luna", M1: 5.972e24, M2: 7.342e22, d: 3.844e8 },
    { t: "Sol – Tierra", n1: "Sol", n2: "Tierra", M1: 1.989e30, M2: 5.972e24, d: 1.496e11 },
    { t: "Sol – Júpiter", n1: "Sol", n2: "Júpiter", M1: 1.989e30, M2: 1.898e27, d: 7.7857e11 },
    { t: "Dos masas iguales", n1: "A", n2: "B", M1: 1e24, M2: 1e24, d: 1e8 }
  ];
  B.w.f11_neutro = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Campo gravitatorio de dos masas: el punto neutro");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, x: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Posición de P (de d)", min: 0.02, max: 0.98, step: 0.005, val: st.x, on: function (v) { st.x = v; pinta(); }, fmt: function (v) { return fmt(v, 3); } });
    function pinta() {
      var P = PN[st.i], d = P.d, x = st.x * d, g1 = G * P.M1 / (x * x), g2 = G * P.M2 / Math.pow(d - x, 2), xn = d / (1 + Math.sqrt(P.M2 / P.M1));
      g.limpiar();
      var lg1 = function (s) { return p10(G * P.M1 / Math.pow(s * d, 2)); }, lg2 = function (s) { return p10(G * P.M2 / Math.pow((1 - s) * d, 2)); };
      var lo = Math.min(lg1(0.98), lg2(0.02)) - 0.2, hi = Math.max(lg1(0.1), lg2(0.9)) + 0.6; g.rango(0, 1, lo, hi); g.limpiar();
      g.curva(lg1, { clase: "c-pen", n: 400 }).setAttribute("stroke-width", 3); g.curva(lg2, { clase: "c-red", n: 400 }).setAttribute("stroke-width", 3);
      g.segmento(xn / d, lo, xn / d, lg1(xn / d), { clase: "c-ok", dash: "5 4" }); g.punto(xn / d, lg1(xn / d), { r: 7, clase: "c-ok" }); g.texto(xn / d, lg1(xn / d), "punto neutro", { dx: -10, dy: -12, ancla: "end", clase: "ok" });
      g.segmento(st.x, lo, st.x, hi, { clase: "c-faint", dash: "3 4" });
      lectura.innerHTML = lec("Campo de " + P.n1 + " en P (hacia " + P.n1 + ")", cient(g1, 3) + " m/s²", "pen") + lec("Campo de " + P.n2 + " en P (hacia " + P.n2 + ")", cient(g2, 3) + " m/s²", "red") +
        lec("Campo resultante", cient(Math.abs(g1 - g2), 3) + " m/s² hacia " + (g1 > g2 ? P.n1 : P.n2), "ok") + lec("Punto neutro (campo nulo)", "a " + cient(xn, 4) + " m de " + P.n1 + "  (" + fmt(100 * xn / d, 2) + " % de la distancia)", "ok ancho") +
        lec("Cómo se calcula", "GM₁/x² = GM₂/(d − x)² ⇒ x = d/(1 + √(M₂/M₁))", "ancho");
      pie.innerHTML = "Eje vertical: log<sub>10</sub> g (campo creado por cada cuerpo en el punto P). Donde las dos curvas se <b>cruzan</b> los dos campos tienen el mismo módulo y sentido contrario: el campo total es nulo. Cuanto más pequeña es la masa de un cuerpo, más cerca de <i>él</i> queda el punto neutro. (Las curvas están en logaritmos: en los extremos suben muchísimo.)";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 1, ymin: -6, ymax: 2, w: 600, h: 300, etx: "x/d", ety: "log g", etiqueta: "Campos de dos cuerpos" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PN.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { st.i = +k; pinta(); });
    pinta();
  };

  // ============================================================
  // F11_PLANETAS: comparador del sistema solar
  // ============================================================
  B.w.f11_planetas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Comparador del sistema solar: g, velocidad de escape y más");
    cuerpo.innerHTML = '<div data-mag class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { q: "g", m: 60 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Masa persona", min: 40, max: 120, step: 5, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " kg"; } });
    var MAG = {
      g: { t: "g en la superficie", u: "m/s²", f: function (n) { return Gr.g(n, 0); } },
      peso: { t: "Peso de la persona", u: "N", f: function (n) { return st.m * Gr.g(n, 0); } },
      ve: { t: "Velocidad de escape", u: "km/s", f: function (n) { return Gr.vEsc(n) / 1000; } },
      vo: { t: "Velocidad orbital rasante", u: "km/s", f: function (n) { return Gr.vOrb(n, 0) / 1000; } },
      dens: { t: "Densidad media", u: "kg/m³", f: function (n) { var c = Gr.CUERPOS[n]; return c.M / (4 / 3 * PI * Math.pow(c.R, 3)); } }
    };
    function pinta() {
      var q = MAG[st.q], lista = Gr.PLANETAS.concat(["Luna"]), vals = lista.map(function (n) { return q.f(n); }), mx = Math.max.apply(null, vals);
      g.rango(0, lista.length, -mx * 0.1, mx * 1.12); g.limpiar();
      lista.forEach(function (n, i) { g.rect(i + 0.15, 0, i + 0.85, vals[i], { clase: n === "Tierra" ? "z-ok" : "z-pen", borde: n === "Tierra" ? "var(--ok)" : "var(--pen)" }); g.texto(i + 0.5, vals[i], fmt(vals[i], vals[i] >= 100 ? 0 : 2), { dy: -5, ancla: "middle", clase: "faint" }); g.texto(i + 0.5, -mx * 0.05, n.slice(0, 6), { dy: 4, ancla: "middle", clase: "faint" }); });
      var T = vals[2];
      lectura.innerHTML = lec("Magnitud", q.t + " (" + q.u + ")", "pen ancho") + lec("Tierra", fmt(T, 2) + " " + q.u, "ok") + lec("Júpiter respecto a la Tierra", "× " + fmt(vals[4] / T, 2), "red") + lec("Luna respecto a la Tierra", "× " + fmt(vals[8] / T, 3), "red") +
        lec("Un salto de 0,5 m en la Tierra, aquí", "g: Luna " + fmt(0.5 * Gr.g("Tierra") / Gr.g("Luna"), 1) + " m · Marte " + fmt(0.5 * Gr.g("Tierra") / Gr.g("Marte"), 1) + " m", "ok ancho");
      pie.innerHTML = "Barra verde: la Tierra. g = GM/R² depende de la masa <b>y del radio</b> (por eso Saturno, aunque es 95 veces más masivo que la Tierra, tiene casi la misma g: es mucho más grande). La velocidad de escape v<sub>e</sub> = √(2GM/R) es √2 veces la orbital rasante.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 9, ymin: 0, ymax: 30, w: 600, h: 300, sinX: true, ety: "", etiqueta: "Comparación de cuerpos del sistema solar" });
    U.fichas(cuerpo.querySelector("[data-mag]"), Object.keys(MAG).map(function (k) { return { k: k, t: MAG[k].t }; }), "g", function (k) { st.q = k; pinta(); });
    pinta();
  };
})(window);
