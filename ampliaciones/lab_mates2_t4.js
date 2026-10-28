/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 4 (Vectores en el espacio)
   vec_3d (vista 3D girable) · vec_calc (calculadora paso a paso) · vec_param (vectores con parámetro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var V = B.lab.vec = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("vc-estilos")) return;
    var s = document.createElement("style"); s.id = "vc-estilos";
    s.textContent =
      ".vc-vec{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin:6px 0}" +
      ".vc-vec .vc-nom{font:700 16px var(--math);min-width:1.6em}" +
      ".vc-vec input[type=number]{width:64px;padding:5px 6px;font:15px var(--math);border:1px solid var(--line,rgba(128,128,128,.4));border-radius:8px;background:var(--sheet-2);color:var(--ink)}" +
      ".vc-pasos{margin:8px 0 0;padding:0;list-style:none;font-size:14.5px;line-height:1.55}" +
      ".vc-pasos li{padding:5px 0;border-top:1px solid var(--line,rgba(128,128,128,.25))}" +
      ".vc-pasos li>b:first-child{display:block;font-size:12px;color:var(--ink-faint);font-weight:600;text-transform:none}" +
      ".vc-ok{color:var(--ok);font-weight:700}.vc-mal{color:var(--red);font-weight:700}" +
      ".vc-svg{touch-action:pan-y;cursor:grab}" +
      "@media(max-width:520px){.vc-vec input[type=number]{width:54px}.vc-pasos{font-size:13.5px}}";
    document.head.appendChild(s);
  })();

  // ---------- álgebra de vectores ----------
  function sg(n) { return n < 0 ? "−" + (-n) : String(n); }
  function par(n) { return n < 0 ? "(−" + (-n) + ")" : String(n); }
  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 2).replace(/,00$/, "").replace(/(,\d)0$/, "$1"); }
  V.suma = function (a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; };
  V.esc = function (k, a) { return [k * a[0], k * a[1], k * a[2]]; };
  V.dot = function (a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
  V.cruz = function (a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; };
  V.mixto = function (a, b, c) { return V.dot(a, V.cruz(b, c)); };
  V.mod = function (a) { return Math.sqrt(V.dot(a, a)); };
  V.ang = function (a, b) { return Math.acos(Math.max(-1, Math.min(1, V.dot(a, b) / (V.mod(a) * V.mod(b))))) * 180 / Math.PI; };
  V.vtxt = function (a) { return "(" + a.map(function (x) { return n2(x); }).join(", ") + ")"; };
  // √n con n entero: a√b simplificado, en HTML
  V.raiz = function (n) {
    if (Math.abs(n - Math.round(n)) > 1e-9) return "√" + n2(n);
    n = Math.round(n);
    if (n === 0) return "0";
    var a = 1, b = n;
    for (var f = 2; f * f <= b; f++) while (b % (f * f) === 0) { b /= f * f; a *= f; }
    if (b === 1) return String(a);
    return (a === 1 ? "" : a) + "√" + b;
  };
  // rango de una lista de vectores (numérico)
  V.rango = function (vs) {
    var M = vs.map(function (f) { return f.slice(); }), r = 0, esc = 1;
    M.forEach(function (f) { f.forEach(function (x) { esc = Math.max(esc, Math.abs(x)); }); });
    for (var c = 0; c < 3 && r < M.length; c++) {
      var p = r;
      for (var i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
      if (Math.abs(M[p][c]) <= 1e-9 * esc) continue;
      var t = M[p]; M[p] = M[r]; M[r] = t;
      for (var k = r + 1; k < M.length; k++) { var q = M[k][c] / M[r][c]; for (var l = c; l < 3; l++) M[k][l] -= q * M[r][l]; }
      r++;
    }
    return r;
  };

  // ============================================================
  // VISTA 3D GIRABLE: u × v, producto escalar y producto mixto
  // ============================================================
  var PRE = {
    cruz: [
      { k: "0", t: "Ejemplo", u: [2, 1, 0], v: [0, 2, 1] }, { k: "1", t: "Perpendiculares", u: [2, 0, 0], v: [0, 3, 0] },
      { k: "2", t: "Paralelos", u: [1, 2, 1], v: [2, 4, 2] }, { k: "3", t: "Intercambio v × u", u: [0, 2, 1], v: [2, 1, 0] }
    ],
    esc: [
      { k: "0", t: "Ejemplo", u: [3, 1, 0], v: [2, 2, 1] }, { k: "1", t: "Perpendiculares", u: [1, 2, 0], v: [2, -1, 3] },
      { k: "2", t: "Paralelos", u: [1, 2, 1], v: [2, 4, 2] }, { k: "3", t: "Obtuso", u: [2, 1, 0], v: [-2, 1, 1] }
    ],
    mixto: [
      { k: "0", t: "Ejemplo", u: [2, 0, 0], v: [1, 2, 0], w: [0, 1, 2] }, { k: "1", t: "Caja", u: [2, 0, 0], v: [0, 3, 0], w: [0, 0, 2] },
      { k: "2", t: "Coplanarios (w = u + v)", u: [2, 0, 0], v: [1, 2, 0], w: [3, 2, 0] }, { k: "3", t: "Orientación inversa", u: [2, 0, 0], v: [1, 2, 0], w: [0, 1, -2] }
    ]
  };
  V.PRE3D = PRE;

  B.w.vec_3d = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Vectores en 3D: gira la vista con el ratón o los deslizadores");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div class="w-plot"></div><div data-ctl></div><div data-ctl2></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var ref = host.getAttribute("data-ref") || "";
    var modo0 = /escalar$/.test(ref) ? "esc" : /mixto$/.test(ref) ? "mixto" : "cruz";
    var st = { modo: modo0, u: PRE[modo0][0].u.slice(), v: PRE[modo0][0].v.slice(), w: (PRE.mixto[0].w).slice(), az: 35, el: 22 };
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), plotEl = cuerpo.querySelector(".w-plot");
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ctl2 = U.ctl(cuerpo.querySelector("[data-ctl2]"));
    var g, sls = {}, azS, elS;
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "cruz", t: "u × v" }, { k: "esc", t: "u · v" }, { k: "mixto", t: "[u, v, w]" }], st.modo, function (k) {
      st.modo = k; var p = PRE[k][0]; st.u = p.u.slice(); st.v = p.v.slice(); if (p.w) st.w = p.w.slice(); armaPre(); armaSl(); pinta();
    });
    function armaPre() {
      U.fichas(cuerpo.querySelector("[data-pre]"), PRE[st.modo].map(function (p) { return { k: p.k, t: p.t }; }), "-", function (k) {
        var p = PRE[st.modo][+k]; st.u = p.u.slice(); st.v = p.v.slice(); if (p.w) st.w = p.w.slice(); sync(); pinta();
      });
    }
    function sync() { ["u", "v", "w"].forEach(function (n) { if (sls[n]) sls[n].forEach(function (s, i) { s.set(st[n][i]); }); }); }
    function armaSl() {
      ctl.innerHTML = ""; sls = {};
      (st.modo === "mixto" ? ["u", "v", "w"] : ["u", "v"]).forEach(function (n) {
        sls[n] = [0, 1, 2].map(function (i) {
          return U.slider(ctl, { et: n + "<sub>" + "xyz"[i] + "</sub>", etq: "Componente " + "xyz"[i] + " de " + n, min: -3, max: 3, step: 1, val: st[n][i], on: function (x) { st[n][i] = x; pinta(); }, fmt: function (x) { return fmt(x, 0); } });
        });
      });
    }
    azS = U.slider(ctl2, { et: "Giro", etq: "Giro horizontal de la vista", min: -180, max: 180, step: 5, val: st.az, on: function (x) { st.az = x; pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
    elS = U.slider(ctl2, { et: "Altura", etq: "Altura de la vista", min: -80, max: 80, step: 5, val: st.el, on: function (x) { st.el = x; pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
    U.boton(ctl2, "Vista inicial", function () { st.az = 35; st.el = 22; azS.set(35); elS.set(22); pinta(); });
    g = new B.Plot(plotEl, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 600, h: 400, limpio: true, etx: "", ety: "", etiqueta: "Vista tridimensional de los vectores u, v y w" });
    g.svg.classList.add("vc-svg");
    // arrastrar para girar
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

    // proyección: z hacia arriba, y hacia dentro de la pantalla
    function proy(p) {
      var a = st.az * Math.PI / 180, e = st.el * Math.PI / 180;
      var xr = p[0] * Math.cos(a) - p[1] * Math.sin(a), yr = p[0] * Math.sin(a) + p[1] * Math.cos(a);
      return [xr, p[2] * Math.cos(e) - yr * Math.sin(e), yr * Math.cos(e) + p[2] * Math.sin(e)];
    }
    function P2(p) { var q = proy(p); return [q[0], q[1]]; }
    function flecha(a, b, clase, nombre, dx, dy) {
      var A = P2(a), Bq = P2(b);
      if (Math.abs(A[0] - Bq[0]) + Math.abs(A[1] - Bq[1]) < 1e-9) return;
      U.flecha(g, A[0], A[1], Bq[0], Bq[1], { clase: clase, punta: 9 });
      if (nombre) g.texto(Bq[0], Bq[1], nombre, { dx: dx || 8, dy: dy || -8, clase: clase.replace("c-", "") });
    }
    function seg(a, b, clase, dash) { var A = P2(a), Bq = P2(b); var s = g.segmento(A[0], A[1], Bq[0], Bq[1], { clase: clase || "c-faint" }); if (dash) s.setAttribute("stroke-dasharray", dash); return s; }
    function ejes() {
      [[[3.5, 0, 0], "x"], [[0, 3.5, 0], "y"], [[0, 0, 3.5], "z"]].forEach(function (e) {
        seg([0, 0, 0], e[0], "c-faint"); var q = P2(e[0]); g.texto(q[0], q[1], e[1], { dx: 5, dy: -4, clase: "faint" });
      });
    }
    function ajusta(puntos) {
      var m = 3.8;
      puntos.forEach(function (p) { var q = P2(p); m = Math.max(m, Math.abs(q[1]) * 1.18, Math.abs(q[0]) * 1.18 * 400 / 600 * 1.0); });
      g.rangoIso(0, 0, Math.ceil(m * 2) / 2);
    }
    function pinta() {
      var u = st.u, v = st.v, w = st.w, O = [0, 0, 0], lec = "", nota = "";
      if (st.modo === "cruz") {
        var c = V.cruz(u, v), mc = V.mod(c), uv = V.suma(u, v), cd = mc > 0 ? V.esc(3.2 / mc, c) : O;
        ajusta([u, v, uv, cd, [3.5, 0, 0], [0, 3.5, 0], [0, 0, 3.5]]);
        g.limpiar(); ejes();
        var pts = [O, u, uv, v].map(P2);
        g.poligono(pts, { clase: mc > 0 ? "z-pen" : "z-red", borde: "var(--ink-faint)" });
        flecha(O, u, "c-pen", "u"); flecha(O, v, "c-red", "v");
        if (mc > 0) { flecha(O, cd, "c-ok", "u × v"); }
        lec = U.lec("u × v", V.vtxt(c), mc > 0 ? "ok" : "mal") + U.lec("|u × v| = área del paralelogramo", mc > 0 ? V.raiz(V.dot(c, c)).replace(/^0$/, "0") + " ≈ " + n2(mc) : "0") +
          U.lec("Área del triángulo", mc > 0 ? n2(mc / 2) : "0") + U.lec("u · (u × v)", n2(V.dot(u, c))) + U.lec("v · (u × v)", n2(V.dot(v, c)));
        nota = mc > 0 ? "<b>u × v</b> (verde) es perpendicular al plano de u y v: sus dos productos escalares valen 0. Su sentido sale de la regla de la mano derecha (de u hacia v); pulsa «Intercambio» y verás que se invierte. Se dibuja con longitud fija; su módulo real está arriba y es el <b>área del paralelogramo</b> (azul)."
          : "u y v son <b>paralelos</b> (o alguno es nulo): el paralelogramo se aplasta, su área es 0 y u × v = 0.";
      } else if (st.modo === "esc") {
        var dp = V.dot(u, v), mu = V.mod(u), mv = V.mod(v), proj = mv > 0 ? V.esc(dp / (mv * mv), v) : O, ok0 = mu > 0 && mv > 0;
        ajusta([u, v, [3.5, 0, 0], [0, 3.5, 0], [0, 0, 3.5]]);
        g.limpiar(); ejes();
        flecha(O, v, "c-red", "v"); flecha(O, u, "c-pen", "u");
        if (ok0) { flecha(O, proj, "c-ok", ""); seg(u, proj, "c-faint", "4 4"); var pp = P2(proj); g.texto(pp[0], pp[1], "proy", { dx: 6, dy: 14, clase: "ok" }); }
        var al = ok0 ? V.ang(u, v) : 0;
        lec = U.lec("u · v", n2(dp), dp === 0 ? "ok" : "") + U.lec("|u| · |v|", ok0 ? V.raiz(V.dot(u, u)) + " · " + V.raiz(V.dot(v, v)) : "—") +
          U.lec("Ángulo", ok0 ? n2(al) + "°" : "—", ok0 && Math.abs(al - 90) < 1e-9 ? "ok" : "") +
          U.lec("Proyección de u sobre v", ok0 ? V.vtxt(proj) : "—") + U.lec("Longitud con signo", ok0 ? n2(dp / mv) : "—");
        nota = ok0 ? (dp === 0 ? "u · v = 0: son <b>perpendiculares</b>; la proyección de u sobre v se reduce a un punto." : dp > 0 ? "u · v &gt; 0: ángulo <b>agudo</b>. La proyección (verde) de u sobre v tiene el mismo sentido que v." : "u · v &lt; 0: ángulo <b>obtuso</b>. La proyección de u sobre v apunta en sentido contrario a v.") +
          " Fíjate en el segmento discontinuo: es la perpendicular desde la punta de u hasta la recta de v." : "Hay un vector nulo: no hay ángulo.";
      } else {
        var d = V.mixto(u, v, w), uv2 = V.suma(u, v), uw = V.suma(u, w), vw = V.suma(v, w), uvw = V.suma(uv2, w);
        ajusta([u, v, w, uvw]);
        g.limpiar(); ejes();
        var cl = d > 0 ? "z-ok" : d < 0 ? "z-red" : "z-pen";
        var V8 = { O: O, u: u, v: v, w: w, uv: uv2, uw: uw, vw: vw, uvw: uvw };
        var caras = [["O", "u", "uv", "v"], ["w", "uw", "uvw", "vw"], ["O", "u", "uw", "w"], ["v", "uv", "uvw", "vw"], ["O", "v", "vw", "w"], ["u", "uv", "uvw", "uw"]];
        caras.map(function (f) {
          var dep = 0; f.forEach(function (n) { dep += proy(V8[n])[2]; });
          return { f: f, dep: dep / 4 };
        }).sort(function (a, b) { return b.dep - a.dep; }).forEach(function (o) {
          g.poligono(o.f.map(function (n) { return P2(V8[n]); }), { clase: cl, borde: "var(--ink-faint)" });
        });
        flecha(O, u, "c-pen", "u"); flecha(O, v, "c-red", "v"); flecha(O, w, "c-ok", "w");
        var mb = V.mod(V.cruz(u, v));
        lec = U.lec("[u, v, w]", n2(d), d === 0 ? "mal" : "ok") + U.lec("Volumen del paralelepípedo", n2(Math.abs(d))) + U.lec("Volumen del tetraedro", n2(Math.abs(d) / 6)) +
          U.lec("Orientación", d > 0 ? "directa (+)" : d < 0 ? "inversa (−)" : "coplanarios (0)", d > 0 ? "ok" : d < 0 ? "mal" : "") +
          U.lec("Área de la base |u × v|", mb > 0 ? V.raiz(V.dot(V.cruz(u, v), V.cruz(u, v))) : "0");
        nota = d === 0 ? "[u, v, w] = 0: los tres vectores son <b>coplanarios</b>. El paralelepípedo se aplana y su volumen es 0 (cámbiale la altura al girar la vista y lo verás de canto)."
          : "El volumen es <b>área de la base × altura</b>: |u × v| por la altura de w sobre ese plano, y eso es justo |u · (v × w)|. El color indica la orientación: verde si [u, v, w] &gt; 0 (u, v, w forman un triedro «de mano derecha»), rojo si &lt; 0.";
      }
      lectura.innerHTML = lec; pie.innerHTML = nota;
    }
    armaPre(); armaSl(); pinta();
  };

  // ============================================================
  // CALCULADORA DE OPERACIONES CON VECTORES, paso a paso
  // ============================================================
  B.w.vec_calc = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora: todas las operaciones paso a paso");
    cuerpo.innerHTML = '<div data-pre></div><div class="vc-vec" data-vu></div><div class="vc-vec" data-vv></div><div class="vc-vec" data-vw></div><div class="lectura anch"></div><ul class="vc-pasos"></ul><p class="w-pie"></p>';
    var st = { u: [1, 2, 3], v: [4, -1, 2], w: [0, 1, 1] };
    var pasos = cuerpo.querySelector(".vc-pasos"), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var PREC = [
      { k: "0", t: "Ejemplo", u: [1, 2, 3], v: [4, -1, 2], w: [0, 1, 1] }, { k: "1", t: "Perpendiculares", u: [1, 1, 0], v: [1, -1, 5], w: [0, 0, 1] },
      { k: "2", t: "Coplanarios", u: [1, 0, 2], v: [0, 1, 1], w: [2, 3, 7] }, { k: "3", t: "Caja", u: [2, 0, 0], v: [0, 3, 0], w: [0, 0, 4] }
    ];
    var campos = {};
    ["u", "v", "w"].forEach(function (n) {
      var el = cuerpo.querySelector("[data-v" + n + "]");
      el.innerHTML = '<span class="vc-nom">' + n + ' =</span>' + [0, 1, 2].map(function (i) {
        return '<input type="number" step="any" data-n="' + n + '" data-i="' + i + '" value="' + st[n][i] + '" aria-label="Componente ' + "xyz"[i] + ' de ' + n + '">';
      }).join("");
      campos[n] = el.querySelectorAll("input");
      Array.prototype.forEach.call(campos[n], function (inp, i) {
        inp.addEventListener("input", function () { var x = parseFloat(String(inp.value).replace(",", ".")); st[n][i] = isFinite(x) ? x : 0; pinta(); });
      });
    });
    U.fichas(cuerpo.querySelector("[data-pre]"), PREC.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) {
      var p = PREC[+k]; ["u", "v", "w"].forEach(function (n) { st[n] = p[n].slice(); Array.prototype.forEach.call(campos[n], function (inp, i) { inp.value = st[n][i]; }); }); pinta();
    });
    function pinta() {
      var u = st.u, v = st.v, w = st.w, L = [];
      function paso(t, h) { L.push("<li><b>" + t + "</b>" + h + "</li>"); }
      function eqr(n) { var r = V.raiz(n); return Math.abs(n - Math.round(n)) < 1e-9 && r !== "√" + Math.round(n) ? " = " + r : ""; }
      var a = u.map(par), b = v.map(par), c3 = w.map(par);
      paso("Suma y diferencia", "u + v = " + V.vtxt(V.suma(u, v)) + " · u − v = " + V.vtxt(V.suma(u, V.esc(-1, v))));
      var dp = V.dot(u, v), mu2 = V.dot(u, u), mv2 = V.dot(v, v);
      paso("Módulos", "|u| = √(" + u.map(function (x) { return par(x) + "²"; }).join(" + ") + ") = √" + n2(mu2) + eqr(mu2) + " ≈ " + n2(Math.sqrt(mu2)) +
        " · |v| = √" + n2(mv2) + eqr(mv2) + " ≈ " + n2(Math.sqrt(mv2)));
      paso("Producto escalar", "u·v = " + [0, 1, 2].map(function (i) { return a[i] + "·" + b[i]; }).join(" + ") + " = <b>" + n2(dp) + "</b>");
      var ang = "";
      if (mu2 > 0 && mv2 > 0) {
        var al = V.ang(u, v);
        ang = "cos α = " + n2(dp) + " / (" + n2(Math.sqrt(mu2)) + " · " + n2(Math.sqrt(mv2)) + ") ≈ " + n2(dp / Math.sqrt(mu2 * mv2)) + " ⟹ α ≈ <b>" + n2(al) + "°</b>" + (Math.abs(dp) < 1e-9 ? ' <span class="vc-ok">(perpendiculares)</span>' : "");
      } else ang = "hay un vector nulo";
      paso("Ángulo", ang);
      var cr = V.cruz(u, v), mc2 = V.dot(cr, cr);
      paso("Producto vectorial", "u×v = (" + n2(u[1]) + "·" + b[2] + " − " + a[2] + "·" + b[1] + ", " + n2(u[2]) + "·" + b[0] + " − " + a[0] + "·" + b[2] + ", " + n2(u[0]) + "·" + b[1] + " − " + a[1] + "·" + b[0] + ") = <b>" + V.vtxt(cr) + "</b>");
      paso("Área", "|u×v| = √" + n2(mc2) + eqr(mc2) + " ≈ " + n2(Math.sqrt(mc2)) + " (paralelogramo) · mitad ≈ " + n2(Math.sqrt(mc2) / 2) + " (triángulo)" +
        (mc2 < 1e-12 ? ' <span class="vc-mal">u y v paralelos</span>' : ""));
      var mx = V.mixto(u, v, w);
      paso("Producto mixto", "[u,v,w] = w·(u×v) = " + [0, 1, 2].map(function (i) { return c3[i] + "·" + par(cr[i]); }).join(" + ") + " = <b>" + n2(mx) + "</b>");
      paso("Volumen", "paralelepípedo = " + n2(Math.abs(mx)) + " · tetraedro = " + n2(Math.abs(mx) / 6) + (Math.abs(mx) < 1e-9 ? ' · <span class="vc-mal">u, v, w coplanarios</span>' : ' · <span class="vc-ok">forman una base de ℝ³</span>'));
      pasos.innerHTML = L.join("");
      var r = V.rango([u, v, w]);
      lec.innerHTML = U.lec("u · v", n2(dp)) + U.lec("u × v", V.vtxt(cr)) + U.lec("[u, v, w]", n2(mx), Math.abs(mx) < 1e-9 ? "mal" : "ok") + U.lec("Rango de {u, v, w}", String(r), r === 3 ? "ok" : "mal") +
        U.lec("¿Independientes?", r === 3 ? "sí: base de ℝ³" : "no: dependientes");
      pie.innerHTML = "Escribe tus propios vectores (admite decimales) y compara con tu resolución a mano. El orden importa en u × v: cambia u y v de sitio y el resultado cambia de signo.";
    }
    pinta();
  };

  // ============================================================
  // VECTORES CON PARÁMETRO
  // ============================================================
  var PRE_PAR = [
    { k: "0", t: "Coplanarios", nom: "[u, v, w] = 0",
      f: function (m) { return [[1, 1, 1], [1, m, m * m], [1, 2, 4]]; },
      txt: ["u = (1, 1, 1)", "v = (1, m, m²)", "w = (1, 2, 4)"],
      val: function (a) { return V.mixto(a[0], a[1], a[2]); }, raices: [1, 2], rn: ["1", "2"], ymin: -8, ymax: 8, sig: "los tres vectores son coplanarios (dependientes)", no: "forman base de ℝ³" },
    { k: "1", t: "Perpendiculares", nom: "u · v = 0",
      f: function (m) { return [[m, 2, 0], [m, -2, 5]]; },
      txt: ["u = (m, 2, 0)", "v = (m, −2, 5)"],
      val: function (a) { return V.dot(a[0], a[1]); }, raices: [-2, 2], rn: ["−2", "2"], ymin: -8, ymax: 12, sig: "u y v son perpendiculares", no: "no son perpendiculares" },
    { k: "2", t: "Base de ℝ³", nom: "[u, v, w] ≠ 0",
      f: function (m) { return [[m, 1, 0], [1, m, 1], [0, 1, m]]; },
      txt: ["u = (m, 1, 0)", "v = (1, m, 1)", "w = (0, 1, m)"],
      val: function (a) { return V.mixto(a[0], a[1], a[2]); }, raices: [-Math.SQRT2, 0, Math.SQRT2], rn: ["−√2", "0", "√2"], ymin: -6, ymax: 6, sig: "dependientes: NO forman base", no: "forman base de ℝ³" },
    { k: "3", t: "Área del paralelogramo", nom: "|u × v|²",
      f: function (m) { return [[1, m, 0], [0, 1, m]]; },
      txt: ["u = (1, m, 0)", "v = (0, 1, m)"],
      val: function (a) { var c = V.cruz(a[0], a[1]); return V.dot(c, c); }, raices: [], rn: [], ymin: -1, ymax: 40, sig: "", no: "no hay m con área 0" }
  ];
  V.PRE_PAR = PRE_PAR;
  B.w.vec_param = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Vectores con parámetro: ¿para qué m ocurre?");
    cuerpo.innerHTML = '<div data-pre></div><div data-raiz class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, m: 0.5 }, g, pm, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sk = U.slider(ctl, { et: "Parámetro <i>m</i>", min: -4, max: 4, step: 0.05, val: 0.5, on: function (x) { st.m = Math.round(x * 1000) / 1000; pinta(); }, fmt: function (x) { return fmt(x, 2); } });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_PAR.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { st.i = +k; arma(); });
    function arma() {
      var p = PRE_PAR[st.i], el = cuerpo.querySelector(".w-plot");
      el.innerHTML = "";
      g = new B.Plot(el, { xmin: -4, xmax: 4, ymin: p.ymin, ymax: p.ymax, w: 560, h: 280, etx: "m", ety: p.nom.indexOf("|") === 0 && p.nom.indexOf("×") > 0 ? "área²" : "valor", etiqueta: "Valor de la condición según m" });
      pm = g.punto(0, 0, { capa: "top", r: 7, clase: "c-pen" });
      var o = p.raices.map(function (r, j) { return { k: String(j), t: "m = " + p.rn[j] }; });
      cuerpo.querySelector("[data-raiz]").style.display = o.length ? "" : "none";
      U.fichas(cuerpo.querySelector("[data-raiz]"), o, "-", function (k) { st.m = p.raices[+k]; sk.set(Math.round(st.m * 1000) / 1000); pinta(); });
      pinta();
    }
    function pinta() {
      var p = PRE_PAR[st.i], a = p.f(st.m), d = p.val(a), esRaiz = p.raices.some(function (r) { return Math.abs(r - st.m) < 0.026; });
      if (esRaiz) { var rr = p.raices.filter(function (r) { return Math.abs(r - st.m) < 0.026; })[0]; a = p.f(rr); d = p.val(a); if (Math.abs(d) < 1e-9) d = 0; }
      g.limpiar();
      g.horizontal(0, { clase: "c-faint" });
      g.curva(function (m) { return p.val(p.f(m)); }, { clase: "c-pen" });
      p.raices.forEach(function (r, j) { g.punto(r, 0, { clase: "c-red", r: 6 }); g.texto(r, 0, p.rn[j], { dx: 6, dy: -9, clase: "red" }); });
      g.mover(pm, st.m, Math.max(p.ymin, Math.min(p.ymax, d)));
      var vecs = a.map(function (vv, i) { return "<b>" + "uvw"[i] + "</b> = " + V.vtxt(vv.map(function (x) { return Math.round(x * 1000) / 1000; })); }).join(" · ");
      var cero = Math.abs(d) < 1e-9;
      var r = a.length === 3 ? V.rango(a) : null;
      lec.innerHTML = U.lec(p.nom.replace(/^\[u, v, w\] ≠ 0$/, "[u, v, w]"), n2(d), cero && p.raices.length ? "mal" : "") + U.lec("Vectores con m = " + n2(esRaiz ? p.raices.filter(function (r0) { return Math.abs(r0 - st.m) < 0.026; })[0] : st.m), vecs) +
        (r != null ? U.lec("Rango de {u, v, w}", String(r), r === 3 ? "ok" : "mal") : "") +
        U.lec("Conclusión", p.raices.length ? (cero ? p.sig : p.no) : p.no);
      pie.innerHTML = p.raices.length ? "Desliza <i>m</i>. Donde la curva corta el eje (puntos rojos) se cumple la condición (" + p.nom + "). Es el mismo método de siempre: calcula la expresión en función de m, iguala a 0 y resuelve." : "Aquí la expresión es siempre positiva: |u × v|² = m⁴ + m² + 1 nunca se anula, así que u y v no son paralelos para ningún valor de m.";
    }
    arma();
  };
})(window);
