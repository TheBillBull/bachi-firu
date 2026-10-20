/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 8: cinemática II)
   f8_parabolico · f8_frenado · f8_ecuaciones · f8_unidades · f8_leerxt
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, M = B.lab.mec1, lec = M.lec, f2 = M.f;
  var R = Math.PI / 180;

  // ============================================================
  // F8_PARABOLICO: tiro horizontal y oblicuo
  // ============================================================
  var GG = { tierra: ["Tierra", 9.8], luna: ["Luna", 1.62], marte: ["Marte", 3.71] };
  B.w.f8_parabolico = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Tiro horizontal y oblicuo: dos movimientos independientes");
    cuerpo.innerHTML = '<div data-astro class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { astro: "tierra", v0: 25, ang: 40, h0: 0, comp: false, t: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 70, ymin: -2, ymax: 30, w: 660, h: 340, etx: "x (m)", ety: "y (m)", etiqueta: "Trayectoria del proyectil" });
    var sv = U.slider(ctl, { et: "Velocidad inicial v₀ (m/s)", min: 5, max: 50, step: 1, val: st.v0, on: function (v) { st.v0 = v; reinicia(); }, fmt: function (v) { return f2(v, 0); } });
    var sa = U.slider(ctl, { et: "Ángulo θ (°)", min: -60, max: 90, step: 1, val: st.ang, on: function (v) { st.ang = v; reinicia(); }, fmt: function (v) { return f2(v, 0) + "°"; } });
    var sh = U.slider(ctl, { et: "Altura inicial h₀ (m)", min: 0, max: 50, step: 1, val: st.h0, on: function (v) { st.h0 = v; reinicia(); }, fmt: function (v) { return f2(v, 0); } });
    var stt = U.slider(ctl, { et: "Instante t (s)", min: 0, max: 10, step: 0.02, val: 0, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return f2(v, 2); } });
    var bc = U.boton(ctl, "Mostrar el ángulo complementario", function () { st.comp = !st.comp; bc.classList.toggle("on", st.comp); pinta(); });
    function reinicia() { st.t = 0; stt.set(0); pinta(); }
    U.animar(ctl, function (t, dt, reinicio) { if (reinicio) { reinicia(); return; } if (dt) { var q = M.tiro(st.v0, st.ang, st.h0, GG[st.astro][1]); st.t += dt * 0.6; if (st.t >= q.tv) { st.t = q.tv; stt.set(Math.min(st.t, +stt.input.max)); pinta(); return false; } stt.set(Math.min(st.t, +stt.input.max)); pinta(); } }, { auto: false });
    function traza(v0, ang, h0, gr, tmax, n) { var out = [], i; for (i = 0; i <= n; i++) { var s = tmax * i / n, th = ang * R; out.push([v0 * Math.cos(th) * s, Math.max(0, h0 + v0 * Math.sin(th) * s - 0.5 * gr * s * s)]); } return out; }
    function pinta() {
      var gr = GG[st.astro][1], q = M.tiro(st.v0, st.ang, st.h0, gr), t = Math.min(st.t, q.tv), th = st.ang * R, i;
      stt.input.max = Math.max(0.5, Math.ceil(q.tv * 50) / 50);
      var qc = M.tiro(st.v0, 90 - st.ang, st.h0, gr), xmax = Math.max(q.alcance, st.comp && st.h0 === 0 ? qc.alcance : 0, 5) * 1.08 + 2, ymax = Math.max(q.hmax, st.comp && st.h0 === 0 ? qc.hmax : 0, st.h0, 3) * 1.15 + 1;
      var asp = 2.05, semi = Math.max((ymax + 2) / 2, (xmax + 2) / 2 / asp);
      g.rangoIso((xmax - 2) / 2, (ymax - 2) / 2, semi); g.limpiar();
      g.segmento(-1000, 0, 1000, 0, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      if (st.h0 > 0) g.segmento(0, 0, 0, st.h0, { clase: "c-faint" }).setAttribute("stroke-width", 6);
      g.polilinea(traza(st.v0, st.ang, st.h0, gr, q.tv, 120), { clase: "c-faint", dash: "5 5" });
      if (st.comp && st.h0 === 0 && Math.abs(st.ang) < 90) { var qq = M.tiro(st.v0, 90 - st.ang, 0, gr); g.polilinea(traza(st.v0, 90 - st.ang, 0, gr, qq.tv, 120), { clase: "c-red", dash: "3 4" }); }
      var tr = traza(st.v0, st.ang, st.h0, gr, t, 80); g.polilinea(tr, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      var x = st.v0 * Math.cos(th) * t, y = Math.max(0, st.h0 + st.v0 * Math.sin(th) * t - 0.5 * gr * t * t), vx = q.vx, vy = q.vy0 - gr * t, k = semi * 0.05;
      g.punto(x, y, { r: 8, clase: "c-red" });
      U.flecha(g, x, y, x + vx * k, y, { clase: "c-pen" }); U.flecha(g, x, y, x, y + vy * k, { clase: "c-ok" }); U.flecha(g, x, y, x + vx * k, y + vy * k, { clase: "c-red", grosor: 2 });
      if (q.hmax > st.h0 + 0.01 || q.hmax > 0.01) g.punto(st.v0 * Math.cos(th) * q.tsub, q.hmax, { r: 4, clase: "c-ok" });
      g.punto(q.alcance, 0, { r: 5, clase: "c-ink" });
      lectura.innerHTML = lec("Componentes iniciales", "vₓ = " + f2(q.vx, 2) + " m/s · v<sub>y0</sub> = " + f2(q.vy0, 2) + " m/s", "pen") + lec("Tiempo de vuelo", f2(q.tv, 2) + " s", "red") + lec("Alcance", f2(q.alcance, 2) + " m", "ok") + lec("Altura máxima", f2(q.hmax, 2) + " m" + (q.tsub > 0 ? " (a los " + f2(q.tsub, 2) + " s)" : ""), "") +
        lec("Impacto", "v = " + f2(q.vf, 2) + " m/s · ángulo " + f2(Math.abs(q.angf), 1) + "° " + (q.angf < 0 ? "bajo la horizontal" : ""), "ancho") +
        lec("En t = " + f2(t, 2) + " s", "x = " + f2(x, 2) + " m · y = " + f2(y, 2) + " m · vₓ = " + f2(vx, 2) + " · v<sub>y</sub> = " + f2(vy, 2) + " m/s · |v| = " + f2(Math.hypot(vx, vy), 2) + " m/s", "ancho");
      pie.innerHTML = "Se componen <b>dos movimientos independientes</b>: horizontal con velocidad constante (MRU, flecha azul fija) y vertical con aceleración −g (MRUA, flecha verde). La flecha roja es la velocidad total, siempre <b>tangente</b> a la trayectoria. Sin rozamiento y desde el suelo, ángulos <b>complementarios</b> (θ y 90° − θ) dan el <b>mismo alcance</b>; el máximo es a 45°.";
    }
    U.fichas(cuerpo.querySelector("[data-astro]"), Object.keys(GG).map(function (k) { return { k: k, t: GG[k][0] + " (g = " + f2(GG[k][1], 2) + ")" }; }), "tierra", function (k) { st.astro = k; reinicia(); });
    pinta();
  };

  // ============================================================
  // F8_FRENADO: distancia de reacción + distancia de frenado
  // ============================================================
  var SUELOS = { seco: ["Asfalto seco", 7], mojado: ["Mojado", 4], nieve: ["Nieve", 2], hielo: ["Hielo", 1] };
  var REAC = { atento: ["Atento (0,75 s)", 0.75], cansado: ["Cansado (1,25 s)", 1.25], movil: ["Mirando el móvil (2,5 s)", 2.5] };
  B.w.f8_frenado = function (host) {
    var cuerpo = B.caja(host, "Problema", "Distancia de detención: reacción + frenado");
    cuerpo.innerHTML = '<div data-suelo class="chips"></div><div data-reac class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { suelo: "seco", reac: "atento", kmh: 90, d: 60 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 160, ymin: -1.2, ymax: 3.2, w: 660, h: 200, limpio: true, etiqueta: "Distancia de detención" });
    U.slider(ctl, { et: "Velocidad (km/h)", min: 20, max: 140, step: 5, val: st.kmh, on: function (v) { st.kmh = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " km/h"; } });
    U.slider(ctl, { et: "Obstáculo a (m)", min: 10, max: 150, step: 5, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " m"; } });
    function pinta() {
      var a = SUELOS[st.suelo][1], tr = REAC[st.reac][1], v = st.kmh / 3.6, q = M.frenado(v, tr, a), d = st.d, X = Math.max(q.total * 1.1, d * 1.1, 60), i;
      g.rango(-3, X, -1.2, 3.2); g.limpiar(); M.pista(g, -3, X);
      g.rect(0, 0.25, q.dr, 0.9, { clase: "z-hl" }); g.rect(q.dr, 0.25, q.total, 0.9, { clase: "z-red" });
      g.texto(q.dr / 2, 1.3, "reacción " + f2(q.dr, 1) + " m", { ancla: "middle", clase: "faint" }); g.texto(q.dr + q.df / 2, 1.3, "frenado " + f2(q.df, 1) + " m", { ancla: "middle", clase: "red" });
      M.coche(g, 0, -3, X, "pen", "");
      // obstáculo
      g.rect(d, 0, d + X * 0.012, 1.8, { clase: "z-pen" }); g.texto(d, 2.1, "obstáculo", { ancla: "middle", clase: "pen" });
      var choca = d < q.total - 1e-9, vi = d <= q.dr ? v : Math.sqrt(Math.max(0, v * v - 2 * a * (d - q.dr)));
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Velocidad</th><th>reacción</th><th>frenado</th><th>total</th></tr></thead><tbody>" + [30, 50, 90, 120].map(function (k) { var r = M.frenado(k / 3.6, tr, a); return "<tr><th>" + k + " km/h</th><td>" + f2(r.dr, 1) + " m</td><td class='red'>" + f2(r.df, 1) + " m</td><td class='pen'>" + f2(r.total, 1) + " m</td></tr>"; }).join("") + "</tbody></table>";
      lectura.innerHTML = lec("Velocidad", f2(st.kmh, 0) + " km/h = " + f2(v, 2) + " m/s", "") + lec("Deceleración · tiempo de reacción", f2(a, 1) + " m/s² · " + f2(tr, 2) + " s", "") + lec("Distancia de reacción", "d<sub>r</sub> = v·t<sub>r</sub> = " + f2(q.dr, 2) + " m (MRU)", "") +
        lec("Distancia de frenado", "d<sub>f</sub> = v²/(2a) = " + f2(q.df, 2) + " m (MRUA)", "red") + lec("Distancia de detención", f2(q.total, 2) + " m", "pen") + lec("Tiempo de frenado", f2(q.tf, 2) + " s", "") +
        lec("Obstáculo a " + f2(d, 0) + " m", choca ? "¡CHOQUE! Impacto a " + f2(vi, 1) + " m/s = " + f2(vi * 3.6, 0) + " km/h" : "Se detiene a " + f2(d - q.total, 1) + " m del obstáculo", choca ? "red ancho" : "ok ancho");
      pie.innerHTML = "Durante el <b>tiempo de reacción</b> el coche sigue con la velocidad inicial (MRU); después frena con aceleración constante (MRUA). La distancia de frenado crece con el <b>cuadrado</b> de la velocidad: al doblar la velocidad se cuadruplica. Aunque frenes con ABS, mojado o nieve multiplican la distancia.";
    }
    U.fichas(cuerpo.querySelector("[data-suelo]"), Object.keys(SUELOS).map(function (k) { return { k: k, t: SUELOS[k][0] + " (a = " + SUELOS[k][1] + " m/s²)" }; }), "seco", function (k) { st.suelo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-reac]"), Object.keys(REAC).map(function (k) { return { k: k, t: REAC[k][0] }; }), "atento", function (k) { st.reac = k; pinta(); });
    pinta();
  };

  // ============================================================
  // F8_ECUACIONES: elige tres datos del MRUA y resuelve el resto
  // ============================================================
  var VARS = [["x", "Δx", "m"], ["v0", "v₀", "m/s"], ["v", "v", "m/s"], ["a", "a", "m/s²"], ["t", "t", "s"]];
  // Devuelve una lista de soluciones { x, v0, v, a, t, eq: [...] } para los tres datos dados (clave → valor)
  M.mrua3 = function (K) {
    var c = Object.keys(K).sort().join(","), x = K.x, v0 = K.v0, v = K.v, a = K.a, t = K.t, out = [], S = Math.sqrt;
    function add(o, eq) { o.eq = eq; out.push(o); }
    if (c === "a,t,v0") add({ x: v0 * t + 0.5 * a * t * t, v0: v0, v: v0 + a * t, a: a, t: t }, ["v = v₀ + a·t", "Δx = v₀·t + ½·a·t²"]);
    else if (c === "t,v,v0") { if (t !== 0) add({ x: (v0 + v) / 2 * t, v0: v0, v: v, a: (v - v0) / t, t: t }, ["a = (v − v₀)/t", "Δx = ½·(v₀ + v)·t"]); }
    else if (c === "a,v,v0") { if (a !== 0 && (v - v0) / a >= 0) add({ x: (v * v - v0 * v0) / (2 * a), v0: v0, v: v, a: a, t: (v - v0) / a }, ["t = (v − v₀)/a", "v² = v₀² + 2a·Δx"]); }
    else if (c === "t,v0,x") { if (t !== 0) { var a1 = 2 * (x - v0 * t) / (t * t); add({ x: x, v0: v0, v: v0 + a1 * t, a: a1, t: t }, ["Δx = v₀·t + ½·a·t²  → a", "v = v₀ + a·t"]); } }
    else if (c === "a,v0,x") { var D = v0 * v0 + 2 * a * x; if (D >= 0 && a !== 0) [S(D), -S(D)].forEach(function (vv, i) { var tt = (vv - v0) / a; if (tt >= -1e-12 && (i === 0 || D > 0)) add({ x: x, v0: v0, v: vv, a: a, t: Math.max(0, tt) }, ["v² = v₀² + 2a·Δx  → v (±)", "t = (v − v₀)/a"]); }); }
    else if (c === "v,v0,x") { if (v0 + v !== 0) { var tt2 = 2 * x / (v0 + v); if (tt2 >= 0) add({ x: x, v0: v0, v: v, a: tt2 === 0 ? 0 : (v - v0) / tt2, t: tt2 }, ["Δx = ½·(v₀ + v)·t  → t", "a = (v − v₀)/t"]); } }
    else if (c === "a,t,v") add({ x: v * t - 0.5 * a * t * t, v0: v - a * t, v: v, a: a, t: t }, ["v₀ = v − a·t", "Δx = v·t − ½·a·t²"]);
    else if (c === "a,v,x") { var D2 = v * v - 2 * a * x; if (D2 >= 0 && a !== 0) [S(D2), -S(D2)].forEach(function (vv, i) { var tt = (v - vv) / a; if (tt >= -1e-12 && (i === 0 || D2 > 0)) add({ x: x, v0: vv, v: v, a: a, t: Math.max(0, tt) }, ["v₀² = v² − 2a·Δx  → v₀ (±)", "t = (v − v₀)/a"]); }); }
    else if (c === "t,v,x") { if (t !== 0) { var v01 = 2 * x / t - v; add({ x: x, v0: v01, v: v, a: (v - v01) / t, t: t }, ["Δx = ½·(v₀ + v)·t  → v₀", "a = (v − v₀)/t"]); } }
    else if (c === "a,t,x") { if (t !== 0) { var v02 = (x - 0.5 * a * t * t) / t; add({ x: x, v0: v02, v: v02 + a * t, a: a, t: t }, ["Δx = v₀·t + ½·a·t²  → v₀", "v = v₀ + a·t"]); } }
    return out;
  };
  B.w.f8_ecuaciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Resolvedor de MRUA: elige tres datos y calcula las otras dos magnitudes");
    cuerpo.innerHTML = '<div class="f8-ec"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var cont = cuerpo.querySelector(".f8-ec"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var st = { dato: { v0: true, a: true, t: true }, val: { x: "", v0: "0", v: "", a: "2", t: "5" } };
    cont.innerHTML = VARS.map(function (V) { return '<div class="f8-ec-f" data-k="' + V[0] + '"><button type="button" class="chip-btn" data-tog aria-pressed="false">' + V[1] + ' (' + V[2] + ')</button><input type="text" inputmode="decimal" autocomplete="off" aria-label="' + V[1] + '"></div>'; }).join("");
    function lee(s) { var v = B.Mate.numero(s); return v; }
    function pinta() {
      var K = {}, n = 0;
      VARS.forEach(function (V) {
        var fila = cont.querySelector('[data-k="' + V[0] + '"]'), b = fila.querySelector("[data-tog]"), inp = fila.querySelector("input"), es = !!st.dato[V[0]];
        b.classList.toggle("on", es); b.setAttribute("aria-pressed", es); inp.disabled = !es; inp.style.opacity = es ? 1 : 0.35; if (es) { if (inp.value !== st.val[V[0]]) inp.value = st.val[V[0]]; var x = lee(st.val[V[0]]); if (!isNaN(x)) { K[V[0]] = x; n++; } } else if (document.activeElement !== inp) inp.value = "";
      });
      var marcados = VARS.filter(function (V) { return st.dato[V[0]]; }).length;
      if (marcados !== 3) { lectura.innerHTML = lec("Elige exactamente tres datos", "ahora tienes " + marcados + " marcados: pulsa en los botones para elegir cuáles conoces", "red ancho"); return; }
      if (n !== 3) { lectura.innerHTML = lec("Escribe un número en cada dato marcado", "puedes usar coma decimal o fracciones", "red ancho"); return; }
      var sol = M.mrua3(K);
      if (!sol.length) { lectura.innerHTML = lec("Sin solución", "con esos datos no hay un movimiento posible (tiempo negativo, división por cero o raíz de un número negativo)", "red ancho"); return; }
      lectura.innerHTML = sol.map(function (s, i) {
        var inc = VARS.filter(function (V) { return !st.dato[V[0]]; }), enc = "Ecuaciones usadas: " + s.eq.join("  ;  ");
        return lec((sol.length > 1 ? "Solución " + (i + 1) + ": " : "") + "incógnitas", inc.map(function (V) { return V[1] + " = " + f2(s[V[0]], 3) + " " + V[2]; }).join("  ·  "), "ok ancho") + lec("Cómo se obtiene", enc, "ancho");
      }).join("") + lec("Comprobación", sol.map(function (s) { return "v² − v₀² = " + f2(s.v * s.v - s.v0 * s.v0, 3) + " y 2aΔx = " + f2(2 * s.a * s.x, 3); }).join("  ·  "), "ancho");
      pie.innerHTML = "Cada ecuación del MRUA <b>no contiene una de las cinco magnitudes</b> (Δx, v₀, v, a, t). Con tres datos conocidos siempre se puede resolver en dos pasos: primero la ecuación que sólo contiene datos y <i>una</i> incógnita, después la otra. Si sale una raíz cuadrada, hay dos signos posibles: elige el que tenga sentido físico (tiempo ≥ 0).";
    }
    cont.addEventListener("click", function (e) { var b = e.target.closest("[data-tog]"); if (!b) return; var k = b.parentNode.getAttribute("data-k"); st.dato[k] = !st.dato[k]; pinta(); });
    cont.addEventListener("input", function (e) { var inp = e.target.closest("input"); if (!inp) return; st.val[inp.parentNode.getAttribute("data-k")] = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // F8_UNIDADES: km/h ↔ m/s y órdenes de magnitud
  // ============================================================
  var REF = [["Persona andando", 5], ["Ciclista", 20], ["Coche en ciudad", 50], ["Coche en autovía", 120], ["Guepardo (récord)", 110], ["Tren AVE", 300], ["Avión de pasajeros", 900], ["Sonido en el aire", 1235]];
  B.w.f8_unidades = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "km/h ↔ m/s y órdenes de magnitud de velocidades");
    cuerpo.innerHTML = '<div data-ctl></div><div class="lectura anch"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var st = { kmh: 72 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0.3, xmax: 3.3, ymin: 0, ymax: 1, w: 640, h: 90, sinY: true, etx: "", etiqueta: "Escala logarítmica de velocidades" });
    var sl = U.slider(ctl, { et: "Velocidad (km/h)", min: 1, max: 1300, step: 1, val: st.kmh, on: function (v) { st.kmh = v; pinta(); }, fmt: function (v) { return f2(v, 0) + " km/h"; } });
    function pinta() {
      var kmh = st.kmh, ms = kmh / 3.6, cercano = REF.slice().sort(function (a, b) { return Math.abs(Math.log(a[1] / kmh)) - Math.abs(Math.log(b[1] / kmh)); })[0];
      g.limpiar(); g.limpiar();
      [10, 100, 1000].forEach(function (v) { g.segmento(Math.log10(v), 0, Math.log10(v), 1, { clase: "c-faint", dash: "3 4" }); g.texto(Math.log10(v), 0.12, v + " km/h", { ancla: "middle", clase: "faint" }); });
      REF.forEach(function (r) { g.punto(Math.log10(r[1]), 0.62, { r: 4, clase: "c-pen" }); });
      g.punto(Math.log10(kmh), 0.62, { r: 8, clase: "c-red" });
      lectura.innerHTML = lec("km/h → m/s (÷ 3,6)", f2(kmh, 1) + " km/h = " + f2(ms, 2) + " m/s", "pen") + lec("m/s → km/h (× 3,6)", f2(ms, 2) + " m/s = " + f2(kmh, 1) + " km/h", "ok") + lec("En millas por hora", f2(kmh / 1.609344, 1) + " mph", "") +
        lec("Lo más parecido", cercano[0] + " (" + cercano[1] + " km/h = " + f2(cercano[1] / 3.6, 1) + " m/s)", "ancho") + lec("Para recorrer 1 km", f2(1000 / ms, 1) + " s", "") + lec("En 1 hora recorre", f2(kmh, 1) + " km", "");
      pie.innerHTML = "<b>1 m/s = 3,6 km/h</b> porque 1 m/s = (1/1000 km)/(1/3600 h) = 3,6 km/h. Conversión rápida: para pasar de km/h a m/s se divide entre 3,6; de m/s a km/h se multiplica por 3,6. Puntos azules: velocidades típicas (escala logarítmica).";
    }
    pinta();
  };

  // ============================================================
  // F8_LEERXT: leer gráficas posición-tiempo
  // ============================================================
  var GXT = [
    { k: "A", t: "Gráfica A", tmax: 10, rg: [0, 80], pts: [[0, 20], [10, 70]], preguntas: [
      { q: "¿Cuál es la posición inicial?", op: ["20 m", "0 m", "70 m", "5 m"], ok: 0, por: "En t = 0 la gráfica corta al eje x en 20 m." },
      { q: "¿Cuál es la velocidad?", op: ["5 m/s", "7 m/s", "50 m/s", "20 m/s"], ok: 0, por: "Pendiente = (70 − 20)/(10 − 0) = 5 m/s." },
      { q: "¿Qué movimiento es?", op: ["MRU hacia la derecha (v &gt; 0)", "MRU hacia la izquierda", "MRUA", "Reposo"], ok: 0, por: "Es una recta creciente: velocidad constante y positiva." },
      { q: "¿En qué posición está a los 6 s?", op: ["50 m", "36 m", "30 m", "56 m"], ok: 0, por: "x = 20 + 5·6 = 50 m." } ] },
    { k: "B", t: "Gráfica B", tmax: 10, rg: [-5, 45], pts: [[0, 40], [10, 0]], preguntas: [
      { q: "¿Cuál es la velocidad?", op: ["−4 m/s", "4 m/s", "−40 m/s", "0"], ok: 0, por: "Pendiente = (0 − 40)/10 = −4 m/s: se mueve en sentido contrario al eje." },
      { q: "¿En qué instante pasa por el origen (x = 0)?", op: ["10 s", "4 s", "40 s", "5 s"], ok: 0, por: "x = 40 − 4t = 0 → t = 10 s." },
      { q: "¿Qué distancia recorre en los 10 s?", op: ["40 m", "0 m", "−40 m", "4 m"], ok: 0, por: "Va de 40 m a 0 m: recorre 40 m (la distancia nunca es negativa; el desplazamiento sí: −40 m)." } ] },
    { k: "C", t: "Gráfica C", tmax: 13, rg: [-5, 50], pts: [[0, 0], [4, 40], [8, 40], [13, 0]], preguntas: [
      { q: "¿Cuál es la velocidad en el tramo de 0 a 4 s?", op: ["10 m/s", "40 m/s", "0", "−8 m/s"], ok: 0, por: "Pendiente = 40/4 = 10 m/s." },
      { q: "¿Qué hace entre 4 s y 8 s?", op: ["Está parado a 40 m", "Retrocede", "Acelera", "Vuelve al origen"], ok: 0, por: "Tramo horizontal: la posición no cambia, v = 0." },
      { q: "¿Cuál es la velocidad en el último tramo (8 a 13 s)?", op: ["−8 m/s", "8 m/s", "−40 m/s", "0"], ok: 0, por: "Pendiente = (0 − 40)/(13 − 8) = −8 m/s: regresa." },
      { q: "En total, ¿qué desplazamiento y qué distancia ha recorrido?", op: ["0 m y 80 m", "80 m y 0 m", "0 m y 0 m", "40 m y 40 m"], ok: 0, por: "Termina donde empezó (desplazamiento 0), pero ha ido 40 m y vuelto 40 m (distancia 80 m)." } ] },
    { k: "D", t: "Gráfica D (curva)", tmax: 8, rg: [-5, 140], curva: function (t) { return 2 * t * t; }, pts: [[0, 0], [0, 0]], preguntas: [
      { q: "La gráfica es una parábola: ¿qué movimiento es?", op: ["MRUA (acelerado)", "MRU", "Reposo", "MRUA frenando"], ok: 0, por: "x = 2t² es x = ½·a·t² con a = 4 m/s²: parte del reposo y acelera." },
      { q: "¿Cuál es la velocidad media entre t = 0 y t = 4 s?", op: ["8 m/s", "16 m/s", "32 m/s", "4 m/s"], ok: 0, por: "x(4) = 32 m, luego v media = 32/4 = 8 m/s." },
      { q: "La velocidad instantánea a los 3 s (pendiente de la tangente) es…", op: ["12 m/s", "6 m/s", "18 m/s", "8 m/s"], ok: 0, por: "v = a·t = 4·3 = 12 m/s (derivada de 2t²: 4t)." },
      { q: "A medida que pasa el tiempo, la pendiente de la curva…", op: ["aumenta (la velocidad crece)", "disminuye", "es constante", "se hace negativa"], ok: 0, por: "La curva se va empinando: la velocidad aumenta." } ] }
  ];
  B.w.f8_leerxt = function (host) { M.lector(host, "Entrenamiento", "Lee la gráfica posición–tiempo", GXT, "t (s)", "x (m)"); };
})(window);
