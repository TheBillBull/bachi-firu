/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 6 (Problemas métricos)
   met_3d  (vista 3D girable: proyección y simétrico de un punto sobre un plano o una recta; perpendicular común de dos rectas que se cruzan)
   met_calc (calculadora paso a paso: ángulos y distancias)
   La geometría de B.lab.met se verifica aparte con sympy (herramientas/verificar_mates2_t6.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var G = B.lab.met = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("mt6-estilos")) return;
    var s = document.createElement("style"); s.id = "mt6-estilos";
    s.textContent =
      ".mt6-vec{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:6px 0}" +
      ".mt6-vec .mt6-nom{font:700 16px var(--math);min-width:2.2em}" +
      ".mt6-vec input[type=number]{width:62px;padding:5px 6px;font:15px var(--math);border:1px solid var(--line,rgba(128,128,128,.4));border-radius:8px;background:var(--sheet-2);color:var(--ink)}" +
      ".mt6-pasos{margin:8px 0 0;padding:0;list-style:none;font-size:14.5px;line-height:1.55}" +
      ".mt6-pasos li{padding:5px 0;border-top:1px solid var(--line,rgba(128,128,128,.25))}" +
      ".mt6-pasos li>b:first-child{display:block;font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".mt6-ok{color:var(--ok);font-weight:700}.mt6-mal{color:var(--red);font-weight:700}" +
      ".mt6-svg{touch-action:pan-y;cursor:grab}" +
      "@media(max-width:520px){.mt6-vec input[type=number]{width:52px}.mt6-pasos{font-size:13.5px}}";
    document.head.appendChild(s);
  })();

  // ---------- álgebra ----------
  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 2).replace(/,00$/, "").replace(/(,\d)0$/, "$1"); }
  function par(n) { return n < 0 ? "(−" + n2(-n) + ")" : n2(n); }
  var sub = G.sub = function (a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; };
  var add = G.add = function (a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; };
  var esc = G.esc = function (k, a) { return [k * a[0], k * a[1], k * a[2]]; };
  var dot = G.dot = function (a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
  var cruz = G.cruz = function (a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; };
  var mod = G.mod = function (a) { return Math.sqrt(dot(a, a)); };
  function vtxt(a) { return "(" + a.map(n2).join(", ") + ")"; }
  function aDeg(r) { return r * 180 / Math.PI; }
  // √n con n entero: a√b simplificado
  function raiz(n) {
    if (Math.abs(n - Math.round(n)) > 1e-9) return "√" + n2(n);
    n = Math.round(n); if (n === 0) return "0";
    var a = 1, b = n;
    for (var f = 2; f * f <= b; f++) while (b % (f * f) === 0) { b /= f * f; a *= f; }
    if (b === 1) return String(a);
    return (a === 1 ? "" : a) + "√" + b;
  }
  function paralelos(a, b) { var c = cruz(a, b); return dot(c, c) < 1e-9 * Math.max(1, dot(a, a) * dot(b, b)); }

  // ángulos (en grados): entre rectas y entre planos (coseno), entre recta y plano (seno)
  G.angRectas = function (u, v) { return aDeg(Math.acos(Math.min(1, Math.abs(dot(u, v)) / (mod(u) * mod(v))))); };
  G.angRectaPlano = function (v, n) { return aDeg(Math.asin(Math.min(1, Math.abs(dot(v, n)) / (mod(v) * mod(n))))); };
  G.angPlanos = G.angRectas;
  // plano: n = [A, B, C], D  (Ax + By + Cz + D = 0)
  G.valPlano = function (P, n, D) { return dot(n, P) + D; };
  G.distPuntoPlano = function (P, n, D) { return Math.abs(G.valPlano(P, n, D)) / mod(n); };
  G.proyPlano = function (P, n, D) { return sub(P, esc(G.valPlano(P, n, D) / dot(n, n), n)); };
  G.simPlano = function (P, n, D) { return sub(P, esc(2 * G.valPlano(P, n, D) / dot(n, n), n)); };
  // recta: punto Q y director v
  G.proyRecta = function (P, Q, v) { return add(Q, esc(dot(sub(P, Q), v) / dot(v, v), v)); };
  G.simRecta = function (P, Q, v) { var F = G.proyRecta(P, Q, v); return sub(esc(2, F), P); };
  G.distPuntoRecta = function (P, Q, v) { return mod(cruz(sub(P, Q), v)) / mod(v); };
  // rectas que se cruzan: pies de la perpendicular común y distancia
  G.cruzadas = function (Q1, u, Q2, v) {
    var w = cruz(u, v);
    if (dot(w, w) < 1e-9 * Math.max(1, dot(u, u) * dot(v, v))) return { par: true, d: G.distPuntoRecta(Q2, Q1, u) };
    var d = sub(Q2, Q1), a = dot(u, u), b = dot(u, v), c = dot(v, v), det = b * b - a * c;
    var t = (-c * dot(d, u) + b * dot(d, v)) / det, s = (a * dot(d, v) - b * dot(d, u)) / det;
    var A = add(Q1, esc(t, u)), Bq = add(Q2, esc(s, v));
    return { par: false, t: t, s: s, A: A, B: Bq, d: mod(sub(Bq, A)), dm: Math.abs(dot(d, w)) / mod(w), w: w };
  };

  // ============================================================
  // VISTA 3D GIRABLE
  // ============================================================
  var PLANOS = [
    { k: "0", t: "x + 2y − 2z − 6 = 0", n: [1, 2, -2], D: -6, P: [3, -1, 2] },
    { k: "1", t: "z = 0", n: [0, 0, 1], D: 0, P: [2, 1, 3] },
    { k: "2", t: "x + y + z − 3 = 0", n: [1, 1, 1], D: -3, P: [3, 2, 1] },
    { k: "3", t: "2x − y + 2z − 3 = 0", n: [2, -1, 2], D: -3, P: [3, 0, 3] }
  ];
  var RECTAS = [
    { k: "0", t: "r: (0, 1, 0) + t(1, 1, 2)", Q: [0, 1, 0], v: [1, 1, 2], P: [2, 1, 2] },
    { k: "1", t: "r: eje Z", Q: [0, 0, 0], v: [0, 0, 1], P: [3, 1, 2] },
    { k: "2", t: "r: (1, 0, 0) + t(0, 1, 1)", Q: [1, 0, 0], v: [0, 1, 1], P: [1, 2, 0] }
  ];
  var CRUZ = [
    { k: "0", t: "Ejemplo", Q1: [-1, 1, 0], u: [2, 1, 0], Q2: [2, -1, 1], v: [0, 1, 1] },
    { k: "1", t: "Perpendiculares", Q1: [0, 0, 0], u: [1, 0, 0], Q2: [0, 0, 2], v: [0, 1, 0] },
    { k: "2", t: "Se cortan (no se cruzan)", Q1: [0, 0, 0], u: [1, 1, 0], Q2: [2, 0, 0], v: [-1, 1, 0] },
    { k: "3", t: "Paralelas", Q1: [0, 0, 0], u: [1, 1, 0], Q2: [0, 0, 3], v: [1, 1, 0] }
  ];
  G.PRE3D = { plano: PLANOS, recta: RECTAS, cruz: CRUZ };

  B.w.met_3d = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Distancias y proyecciones en 3D: gira la vista con el ratón o los deslizadores");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div class="w-plot"></div><div data-ctl></div><div data-ctl2></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var ref = host.getAttribute("data-ref") || "";
    var modo0 = /recta$/.test(ref) ? "recta" : /cruz$/.test(ref) ? "cruz" : "plano";
    var st = { modo: modo0, plano: PLANOS[0], recta: RECTAS[0], P: PLANOS[0].P.slice(), cr: JSON.parse(JSON.stringify(CRUZ[0])), h: 0, az: 35, el: 22 };
    if (modo0 === "recta") st.P = RECTAS[0].P.slice();
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), plotEl = cuerpo.querySelector(".w-plot");
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ctl2 = U.ctl(cuerpo.querySelector("[data-ctl2]"));
    var g, sls = [], azS, elS;
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "plano", t: "Punto y plano" }, { k: "recta", t: "Punto y recta" }, { k: "cruz", t: "Dos rectas que se cruzan" }], st.modo, function (k) {
      st.modo = k; if (k === "plano") st.P = st.plano.P.slice(); if (k === "recta") st.P = st.recta.P.slice();
      armaPre(); armaSl(); pinta();
    });
    function armaPre() {
      var lista = st.modo === "plano" ? PLANOS : st.modo === "recta" ? RECTAS : CRUZ;
      U.fichas(cuerpo.querySelector("[data-pre]"), lista.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) {
        var p = lista[+k];
        if (st.modo === "plano") { st.plano = p; st.P = p.P.slice(); }
        else if (st.modo === "recta") { st.recta = p; st.P = p.P.slice(); }
        else { st.cr = JSON.parse(JSON.stringify(p)); st.h = 0; }
        sync(); pinta();
      });
    }
    function sync() {
      sls.forEach(function (o) { o.s.set(o.get()); });
    }
    function armaSl() {
      ctl.innerHTML = ""; sls = [];
      function nuevo(et, etq, min, max, get, set) {
        var o = { get: get }; o.s = U.slider(ctl, { et: et, etq: etq, min: min, max: max, step: 1, val: get(), on: function (x) { set(x); pinta(); }, fmt: function (x) { return fmt(x, 0); } }); sls.push(o);
      }
      if (st.modo === "cruz") {
        [0, 1, 2].forEach(function (i) { nuevo("s<sub>" + "xyz"[i] + "</sub>", "Componente " + "xyz"[i] + " del director de s", -3, 3, function () { return st.cr.v[i]; }, function (x) { st.cr.v[i] = x; }); });
        nuevo("Altura s", "Altura de la recta s", -4, 4, function () { return st.h; }, function (x) { st.h = x; });
      } else {
        [0, 1, 2].forEach(function (i) { nuevo("P<sub>" + "xyz"[i] + "</sub>", "Coordenada " + "xyz"[i] + " del punto P", -5, 5, function () { return st.P[i]; }, function (x) { st.P[i] = x; }); });
      }
    }
    azS = U.slider(ctl2, { et: "Giro", etq: "Giro horizontal de la vista", min: -180, max: 180, step: 5, val: st.az, on: function (x) { st.az = x; pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
    elS = U.slider(ctl2, { et: "Altura", etq: "Altura de la vista", min: -80, max: 80, step: 5, val: st.el, on: function (x) { st.el = x; pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
    U.boton(ctl2, "Vista inicial", function () { st.az = 35; st.el = 22; azS.set(35); elS.set(22); pinta(); });
    g = new B.Plot(plotEl, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 600, h: 400, limpio: true, etx: "", ety: "", etiqueta: "Vista tridimensional de puntos, rectas y planos" });
    g.svg.classList.add("mt6-svg");
    (function () {
      var d = null;
      g.svg.addEventListener("pointerdown", function (ev) { d = { x: ev.clientX, y: ev.clientY, az: st.az, el: st.el, t: ev.pointerType }; try { g.svg.setPointerCapture(ev.pointerId); } catch (e) {} });
      g.svg.addEventListener("pointermove", function (ev) {
        if (!d) return;
        st.az = Math.round(Math.max(-180, Math.min(180, d.az + (ev.clientX - d.x) * 0.6)) / 5) * 5; azS.set(st.az);
        if (d.t !== "touch") { st.el = Math.round(Math.max(-80, Math.min(80, d.el + (ev.clientY - d.y) * 0.4)) / 5) * 5; elS.set(st.el); }
        pinta();
      });
      var fin = function () { d = null; };
      g.svg.addEventListener("pointerup", fin); g.svg.addEventListener("pointercancel", fin);
    })();

    function proy(p) {
      var a = st.az * Math.PI / 180, e = st.el * Math.PI / 180;
      var xr = p[0] * Math.cos(a) - p[1] * Math.sin(a), yr = p[0] * Math.sin(a) + p[1] * Math.cos(a);
      return [xr, p[2] * Math.cos(e) - yr * Math.sin(e), yr * Math.cos(e) + p[2] * Math.sin(e)];
    }
    function P2(p) { var q = proy(p); return [q[0], q[1]]; }
    function seg(a, b, clase, dash) { var A = P2(a), Bq = P2(b); var s = g.segmento(A[0], A[1], Bq[0], Bq[1], { clase: clase || "c-faint" }); if (dash) s.setAttribute("stroke-dasharray", dash); return s; }
    function pt(p, clase, nombre, dx, dy) { var q = P2(p); g.punto(q[0], q[1], { clase: clase, r: 5 }); if (nombre) g.texto(q[0], q[1], nombre, { dx: dx === undefined ? 8 : dx, dy: dy === undefined ? -8 : dy, clase: clase.replace("c-", "") }); }
    function ejes() {
      [[[3.5, 0, 0], "x"], [[0, 3.5, 0], "y"], [[0, 0, 3.5], "z"]].forEach(function (e) {
        seg([0, 0, 0], e[0], "c-faint"); var q = P2(e[0]); g.texto(q[0], q[1], e[1], { dx: 5, dy: -4, clase: "faint" });
      });
    }
    function ajusta(puntos) {
      var m = 3.8;
      puntos.forEach(function (p) { var q = P2(p); m = Math.max(m, Math.abs(q[1]) * 1.2, Math.abs(q[0]) * 1.2 * 400 / 600); });
      g.rangoIso(0, 0, Math.ceil(m * 2) / 2);
    }
    // parche del plano alrededor de C
    function parche(C, n, L, clase) {
      var a = Math.abs(n[0]) <= Math.abs(n[1]) && Math.abs(n[0]) <= Math.abs(n[2]) ? [1, 0, 0] : Math.abs(n[1]) <= Math.abs(n[2]) ? [0, 1, 0] : [0, 0, 1];
      var e1 = cruz(n, a); e1 = esc(L / mod(e1), e1); var e2 = cruz(n, e1); e2 = esc(L / mod(e2), e2);
      var q = [add(add(C, e1), e2), sub(add(C, e2), e1), sub(sub(C, e1), e2), sub(add(C, e1), e2)];
      g.poligono(q.map(P2), { clase: clase || "z-pen", borde: "var(--ink-faint)" });
    }
    function pinta() {
      var lec = "", nota = "", P = st.P, O = [0, 0, 0];
      if (st.modo === "plano") {
        var pl = st.plano, n = pl.n, F = G.proyPlano(P, n, pl.D), S = G.simPlano(P, n, pl.D), d = G.distPuntoPlano(P, n, pl.D), val = G.valPlano(P, n, pl.D);
        ajusta([P, F, S, [3.5, 0, 0], [0, 3.5, 0], [0, 0, 3.5]]);
        g.limpiar(); ejes(); parche(F, n, 3.4);
        seg(P, S, "c-ok", "5 4"); pt(P, "c-pen", "P"); pt(F, "c-ok", "P′", 8, 14); pt(S, "c-red", "P″");
        lec = U.lec("Valor Ax + By + Cz + D en P", n2(val), val === 0 ? "ok" : "") + U.lec("Distancia d(P, π)", d < 1e-9 ? "0" : n2(Math.abs(val)) + " / " + raiz(dot(n, n)) + " ≈ " + n2(d)) +
          U.lec("Proyección P′", vtxt(F), "ok") + U.lec("Simétrico P″", vtxt(S)) + U.lec("Normal n", vtxt(n));
        nota = d < 1e-9 ? "P está <b>en el plano</b>: la distancia es 0 y P′ = P″ = P." :
          "P′ (verde) es el pie de la perpendicular desde P: P′ = P − (valor/|n|²)·n. El simétrico P″ (rojo) está al otro lado a la <b>misma distancia</b>: P″ = 2P′ − P. El segmento P–P″ es paralelo a la normal.";
      } else if (st.modo === "recta") {
        var rr = st.recta, Q = rr.Q, v = rr.v, Fr = G.proyRecta(P, Q, v), Sr = G.simRecta(P, Q, v), dr = G.distPuntoRecta(P, Q, v), c = cruz(sub(P, Q), v);
        ajusta([P, Fr, Sr, add(Q, esc(-3, esc(3.2 / mod(v), v))), add(Q, esc(3.2 / mod(v), esc(3, v))), [3.5, 0, 0], [0, 3.5, 0], [0, 0, 3.5]]);
        g.limpiar(); ejes();
        var k = 3.4 / mod(v); seg(add(Q, esc(-k, v)), add(Q, esc(k, v)), "c-pen");
        seg(P, Sr, "c-ok", "5 4"); pt(P, "c-pen", "P"); pt(Fr, "c-ok", "P′", 8, 14); pt(Sr, "c-red", "P″"); pt(Q, "c-faint", "Q", 8, 14);
        lec = U.lec("|QP × v|", dr < 1e-9 ? "0" : raiz(dot(c, c)) + " ≈ " + n2(mod(c))) + U.lec("|v|", raiz(dot(v, v)) + " ≈ " + n2(mod(v))) +
          U.lec("Distancia d(P, r)", n2(dr), dr < 1e-9 ? "ok" : "") + U.lec("Proyección P′", vtxt(Fr), "ok") + U.lec("Simétrico P″", vtxt(Sr)) + U.lec("PP′ · v (debe ser 0)", n2(dot(sub(Fr, P), v)));
        nota = dr < 1e-9 ? "P está <b>en la recta</b>: distancia 0 y P′ = P″ = P." : "P′ es el punto de la recta más cercano a P: PP′ es perpendicular a v (la última lectura vale 0). La distancia sale de |QP × v|/|v| (área del paralelogramo entre la base |v|).";
      } else {
        var c0 = st.cr, v2 = add(c0.v, [0, 0, 0]), Q2 = add(c0.Q2, [0, 0, st.h]);
        var R = G.cruzadas(c0.Q1, c0.u, Q2, v2), ku = 3.2 / mod(c0.u), kv = mod(v2) > 0 ? 3.2 / mod(v2) : 0;
        var pts = [add(c0.Q1, esc(ku, c0.u)), sub(c0.Q1, esc(ku, c0.u)), add(Q2, esc(kv, v2)), sub(Q2, esc(kv, v2)), [3.5, 0, 0], [0, 3.5, 0], [0, 0, 3.5]];
        if (!R.par) pts.push(R.A, R.B);
        ajusta(pts);
        g.limpiar(); ejes();
        seg(sub(c0.Q1, esc(ku, c0.u)), add(c0.Q1, esc(ku, c0.u)), "c-pen");
        if (mod(v2) > 0) seg(sub(Q2, esc(kv, v2)), add(Q2, esc(kv, v2)), "c-red");
        var q1 = P2(add(c0.Q1, esc(ku, c0.u))), q2 = P2(add(Q2, esc(kv, v2)));
        g.texto(q1[0], q1[1], "r", { dx: 8, dy: -6, clase: "pen" }); g.texto(q2[0], q2[1], "s", { dx: 8, dy: -6, clase: "red" });
        var w = cruz(c0.u, v2);
        if (mod(v2) === 0) { lec = U.lec("Director de s", "(0, 0, 0)", "mal"); nota = "El director de s no puede ser el vector nulo: sube algún deslizador."; }
        else if (R.par) {
          lec = U.lec("u × v", "(0, 0, 0)", "mal") + U.lec("¿Se cruzan?", "no: son paralelas") + U.lec("Distancia entre las rectas", n2(R.d));
          nota = "u y v son proporcionales: las rectas son <b>paralelas</b> (o coincidentes). La fórmula con el producto mixto no sirve (u × v = 0); la distancia es la de un punto de s a la recta r.";
        } else {
          seg(R.A, R.B, "c-ok"); pt(R.A, "c-ok", "A", 8, 14); pt(R.B, "c-ok", "B", 8, 14);
          var mixto = dot(sub(Q2, c0.Q1), w);
          lec = U.lec("u × v", vtxt(w)) + U.lec("[Q₁Q₂, u, v]", n2(mixto), Math.abs(mixto) < 1e-9 ? "mal" : "ok") + U.lec("d = |[Q₁Q₂, u, v]| / |u × v|", n2(R.dm), Math.abs(mixto) < 1e-9 ? "mal" : "ok") +
            U.lec("Pie A en r", vtxt(R.A)) + U.lec("Pie B en s", vtxt(R.B)) + U.lec("|AB| (debe coincidir)", n2(R.d));
          nota = Math.abs(mixto) < 1e-9 ? "El producto mixto vale 0: las rectas son <b>coplanarias</b> (se cortan) y la distancia es 0. No se cruzan."
            : "El segmento verde AB es la <b>perpendicular común</b>: perpendicular a u y a v, y su longitud es la distancia mínima. Es paralelo a u × v. Mueve la altura de s y mira cómo cambia el volumen del producto mixto.";
        }
      }
      lectura.innerHTML = lec; pie.innerHTML = nota;
    }
    armaPre(); armaSl(); pinta();
  };

  // ============================================================
  // CALCULADORA DE ÁNGULOS Y DISTANCIAS, paso a paso
  // ============================================================
  var MODOS = [
    { k: "rr", t: "Ángulo entre rectas", campos: [["u", 3], ["v", 3]], pres: [[[1, 1, 0], [0, 1, 1]], [[2, -1, 2], [1, 2, 2]]] },
    { k: "rp", t: "Ángulo recta-plano", campos: [["v", 3], ["n", 3]], pres: [[[1, 0, 1], [1, 1, 0]], [[1, -2, 2], [2, 3, 6]]] },
    { k: "pp", t: "Ángulo entre planos", campos: [["n₁", 3], ["n₂", 3]], pres: [[[1, 2, -2], [0, 3, 4]], [[1, 1, 1], [1, -1, 0]]] },
    { k: "pP", t: "Punto a plano", campos: [["P", 3], ["π", 4]], pres: [[[3, -1, 2], [1, 2, -2, -6]], [[1, 1, 1], [2, 2, 1, -3]]] },
    { k: "Pr", t: "Punto a recta", campos: [["P", 3], ["Q", 3], ["v", 3]], pres: [[[2, 1, 2], [0, 1, 0], [1, 1, 2]], [[1, 2, -1], [0, 1, 0], [1, 1, 2]]] },
    { k: "rs", t: "Entre dos rectas", campos: [["Q₁", 3], ["u", 3], ["Q₂", 3], ["v", 3]], pres: [[[-1, 1, 0], [2, 1, 0], [2, -1, 1], [0, 1, 1]], [[0, 0, 0], [1, 1, 0], [0, 0, 3], [1, 1, 0]]] }
  ];
  G.MODOS = MODOS;

  // Calcula los pasos y las lecturas de un modo (se usa también desde la verificación)
  G.calcula = function (k, a) {
    var L = [], lec = [], res = {};
    function paso(t, h) { L.push("<li><b>" + t + "</b>" + h + "</li>"); }
    function eq(n) { var r = raiz(n); return Math.abs(n - Math.round(n)) < 1e-9 && r !== "√" + Math.round(n) ? " = " + r : ""; }
    if (k === "rr" || k === "pp") {
      var u = a[0], v = a[1], nm = k === "rr" ? ["u", "v"] : ["n₁", "n₂"], d = dot(u, v);
      paso("Producto escalar", nm[0] + "·" + nm[1] + " = " + [0, 1, 2].map(function (i) { return par(u[i]) + "·" + par(v[i]); }).join(" + ") + " = <b>" + n2(d) + "</b>");
      paso("Módulos", "|" + nm[0] + "| = √" + n2(dot(u, u)) + eq(dot(u, u)) + " · |" + nm[1] + "| = √" + n2(dot(v, v)) + eq(dot(v, v)));
      if (mod(u) > 0 && mod(v) > 0) {
        var c = Math.abs(d) / (mod(u) * mod(v)), al = G.angRectas(u, v);
        paso("Coseno (con valor absoluto)", "cos α = |" + n2(d) + "| / (" + n2(mod(u)) + "·" + n2(mod(v)) + ") ≈ " + n2(c));
        paso("Ángulo", "α = arccos(" + n2(c) + ") ≈ <b>" + n2(al) + "°</b>" + (Math.abs(d) < 1e-9 ? ' <span class="mt6-ok">(perpendiculares)</span>' : paralelos(u, v) ? ' <span class="mt6-ok">(paralelos)</span>' : ""));
        res.ang = al; lec.push(U.lec("cos α", n2(c)), U.lec("α", n2(al) + "°", Math.abs(d) < 1e-9 ? "ok" : ""));
      } else paso("Aviso", '<span class="mt6-mal">hay un vector nulo</span>');
    } else if (k === "rp") {
      var v1 = a[0], n1 = a[1], d1 = dot(v1, n1);
      paso("Producto escalar", "v·n = " + [0, 1, 2].map(function (i) { return par(v1[i]) + "·" + par(n1[i]); }).join(" + ") + " = <b>" + n2(d1) + "</b>");
      paso("Módulos", "|v| = √" + n2(dot(v1, v1)) + eq(dot(v1, v1)) + " · |n| = √" + n2(dot(n1, n1)) + eq(dot(n1, n1)));
      if (mod(v1) > 0 && mod(n1) > 0) {
        var s = Math.abs(d1) / (mod(v1) * mod(n1)), al1 = G.angRectaPlano(v1, n1);
        paso("SENO (no coseno)", "sen α = |" + n2(d1) + "| / (" + n2(mod(v1)) + "·" + n2(mod(n1)) + ") ≈ " + n2(s));
        paso("Ángulo", "α = arcsen(" + n2(s) + ") ≈ <b>" + n2(al1) + "°</b>" + (Math.abs(d1) < 1e-9 ? ' <span class="mt6-ok">(recta paralela al plano)</span>' : paralelos(v1, n1) ? ' <span class="mt6-ok">(recta perpendicular al plano)</span>' : ""));
        res.ang = al1; lec.push(U.lec("sen α", n2(s)), U.lec("α", n2(al1) + "°", Math.abs(d1) < 1e-9 ? "ok" : ""));
      } else paso("Aviso", '<span class="mt6-mal">hay un vector nulo</span>');
    } else if (k === "pP") {
      var P = a[0], pl = a[1], nn = pl.slice(0, 3), D = pl[3], val = G.valPlano(P, nn, D);
      paso("Numerador", "A·p₁ + B·p₂ + C·p₃ + D = " + [0, 1, 2].map(function (i) { return par(nn[i]) + "·" + par(P[i]); }).join(" + ") + " + " + par(D) + " = <b>" + n2(val) + "</b>");
      paso("Denominador", "√(A² + B² + C²) = √" + n2(dot(nn, nn)) + eq(dot(nn, nn)) + " ≈ " + n2(mod(nn)));
      if (mod(nn) > 0) {
        var dd = G.distPuntoPlano(P, nn, D);
        paso("Distancia", "d(P, π) = |" + n2(val) + "| / " + n2(mod(nn)) + " = <b>" + n2(dd) + "</b>" + (dd < 1e-9 ? ' <span class="mt6-ok">(P está en el plano)</span>' : ""));
        var F = G.proyPlano(P, nn, D), S = G.simPlano(P, nn, D);
        paso("Proyección y simétrico", "P′ = P − (valor/|n|²)·n = " + vtxt(F) + " · P″ = 2P′ − P = " + vtxt(S));
        res.d = dd; lec.push(U.lec("Distancia", n2(dd), dd < 1e-9 ? "ok" : ""), U.lec("Proyección P′", vtxt(F)), U.lec("Simétrico P″", vtxt(S)));
      } else paso("Aviso", '<span class="mt6-mal">(A, B, C) = (0, 0, 0) no es un plano</span>');
    } else if (k === "Pr") {
      var P2_ = a[0], Q = a[1], vv = a[2], QP = sub(P2_, Q), cc = cruz(QP, vv);
      paso("Vector QP", "QP = P − Q = " + vtxt(QP));
      paso("Producto vectorial", "QP × v = " + vtxt(cc) + " · |QP × v| = √" + n2(dot(cc, cc)) + eq(dot(cc, cc)) + " ≈ " + n2(mod(cc)));
      if (mod(vv) > 0) {
        var dr = G.distPuntoRecta(P2_, Q, vv);
        paso("Distancia", "d(P, r) = |QP × v| / |v| = " + n2(mod(cc)) + " / " + n2(mod(vv)) + " = <b>" + n2(dr) + "</b>" + (dr < 1e-9 ? ' <span class="mt6-ok">(P está en la recta)</span>' : ""));
        var Fr = G.proyRecta(P2_, Q, vv), Sr = G.simRecta(P2_, Q, vv);
        paso("Proyección y simétrico", "P′ = Q + (QP·v/|v|²)·v = " + vtxt(Fr) + " · P″ = 2P′ − P = " + vtxt(Sr));
        res.d = dr; lec.push(U.lec("Distancia", n2(dr), dr < 1e-9 ? "ok" : ""), U.lec("Proyección P′", vtxt(Fr)), U.lec("Simétrico P″", vtxt(Sr)));
      } else paso("Aviso", '<span class="mt6-mal">el director es nulo</span>');
    } else {
      var Q1 = a[0], uu = a[1], Q2 = a[2], vw = a[3], w = cruz(uu, vw), Q1Q2 = sub(Q2, Q1);
      paso("Vector entre los puntos", "Q₁Q₂ = " + vtxt(Q1Q2));
      paso("Producto vectorial", "u × v = " + vtxt(w) + " · |u × v| = " + (dot(w, w) < 1e-9 ? "0" : raiz(dot(w, w)) + " ≈ " + n2(mod(w))));
      if (dot(w, w) < 1e-9 * Math.max(1, dot(uu, uu) * dot(vw, vw))) {
        var dp = G.distPuntoRecta(Q2, Q1, uu);
        paso("Son paralelas", "u y v son proporcionales: la fórmula del producto mixto no vale. Distancia = d(Q₂, r) = |Q₁Q₂ × u|/|u| = <b>" + n2(dp) + "</b>" + (dp < 1e-9 ? ' <span class="mt6-ok">(coincidentes)</span>' : ""));
        res.d = dp; res.tipo = "paralelas"; lec.push(U.lec("Posición", dp < 1e-9 ? "coincidentes" : "paralelas"), U.lec("Distancia", n2(dp)));
      } else {
        var mx = dot(Q1Q2, w);
        paso("Producto mixto", "[Q₁Q₂, u, v] = Q₁Q₂·(u × v) = <b>" + n2(mx) + "</b>" + (Math.abs(mx) < 1e-9 ? ' <span class="mt6-mal">= 0: las rectas se cortan (coplanarias)</span>' : ' <span class="mt6-ok">≠ 0: se cruzan</span>'));
        var R = G.cruzadas(Q1, uu, Q2, vw);
        paso("Distancia", "d = |" + n2(mx) + "| / " + n2(mod(w)) + " = <b>" + n2(R.dm) + "</b>");
        paso("Perpendicular común", "pies A = Q₁ + t·u = " + vtxt(R.A) + " (t = " + n2(R.t) + ") y B = Q₂ + s·v = " + vtxt(R.B) + " (s = " + n2(R.s) + "); |AB| = " + n2(R.d));
        res.d = R.dm; res.tipo = Math.abs(mx) < 1e-9 ? "secantes" : "cruzan"; lec.push(U.lec("Posición", Math.abs(mx) < 1e-9 ? "se cortan" : "se cruzan", Math.abs(mx) < 1e-9 ? "mal" : "ok"), U.lec("Distancia", n2(R.dm)), U.lec("Pie A", vtxt(R.A)), U.lec("Pie B", vtxt(R.B)));
      }
    }
    return { pasos: L.join(""), lec: lec.join(""), res: res };
  };

  B.w.met_calc = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora: ángulos y distancias paso a paso");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div data-campos></div><div class="lectura anch"></div><ul class="mt6-pasos"></ul><p class="w-pie"></p>';
    var st = { k: "rr", vals: [], pre: 0 };
    var camposEl = cuerpo.querySelector("[data-campos]"), lec = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".mt6-pasos"), pie = cuerpo.querySelector(".w-pie");
    function modo() { return MODOS.filter(function (m) { return m.k === st.k; })[0]; }
    function carga(i) { st.pre = i; st.vals = modo().pres[i].map(function (v) { return v.slice(); }); armaCampos(); pinta(); }
    function armaCampos() {
      var m = modo();
      camposEl.innerHTML = m.campos.map(function (c, j) {
        return '<div class="mt6-vec"><span class="mt6-nom">' + c[0] + ' =</span>' + (function () { var s = ""; for (var i = 0; i < c[1]; i++) s += '<input type="number" step="any" data-j="' + j + '" data-i="' + i + '" value="' + st.vals[j][i] + '" aria-label="Componente ' + (i + 1) + ' de ' + c[0] + '">'; return s; })() +
          (c[1] === 4 ? '<span class="mt6-nom">= 0</span>' : "") + "</div>";
      }).join("");
      Array.prototype.forEach.call(camposEl.querySelectorAll("input"), function (inp) {
        inp.addEventListener("input", function () { var x = parseFloat(String(inp.value).replace(",", ".")); st.vals[+inp.getAttribute("data-j")][+inp.getAttribute("data-i")] = isFinite(x) ? x : 0; pinta(); });
      });
      U.fichas(cuerpo.querySelector("[data-pre]"), m.pres.map(function (p, i) { return { k: String(i), t: "Ejemplo " + (i + 1) }; }), String(st.pre), function (k) { carga(+k); });
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), MODOS.map(function (m) { return { k: m.k, t: m.t }; }), st.k, function (k) { st.k = k; carga(0); });
    function pinta() {
      var r = G.calcula(st.k, st.vals);
      pasos.innerHTML = r.pasos; lec.innerHTML = r.lec;
      pie.innerHTML = st.k === "rp" ? "Recuerda: con recta y plano se usa el <b>seno</b>; con rectas entre sí o planos entre sí, el coseno. Siempre con valor absoluto." :
        st.k === "pP" ? "El plano se escribe como Ax + By + Cz + D = 0: la cuarta casilla es D." : "Escribe tus propios datos (admite decimales) y compara con tu resolución a mano.";
    }
    carga(0);
  };
})(window);
