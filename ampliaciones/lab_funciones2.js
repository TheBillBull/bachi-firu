/* ============================================================
   Bachi para Firu · laboratorio de funciones II (Matemáticas I, tema 9)
   afin · tarifa · cuadratica · transformar · trozos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var INF = Infinity, fil = F.fil, pto = F.pto, etq = F.etq, num = F.num;

  function signo(v, d) { return (v < 0 ? "− " : "+ ") + fmt(Math.abs(v), d == null ? 2 : d); }
  function coef(v, t) { return v === 1 ? t : v === -1 ? "−" + t : fmt(v, 3) + t; }

  // ============================================================
  // AFIN: pendiente y ordenada en el origen
  // ============================================================
  B.w.afin = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Pendiente y ordenada en el origen: f(x) = mx + n");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { m: 2, n: -1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Pendiente <i>m</i>", min: -4, max: 4, step: 0.5, val: st.m, on: function (v) { st.m = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ordenada <i>n</i>", min: -5, max: 5, step: 0.5, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var m = st.m, n = st.n; g.limpiar();
      g.recta(m, 0, n, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      pto(g, 0, n, "c-red", false, 6); etq(g, 0, n, "(0, " + fmt(n, 1) + ")", "red", 10, -10);
      if (m !== 0) { var xc = -n / m; if (Math.abs(xc) <= 6.5) { pto(g, xc, 0, "c-ok", false, 6); etq(g, xc, 0, "(" + fmt(xc, 2) + ", 0)", "ok", 8, -10); } }
      // triángulo de pendiente: avanzas 1, subes m
      g.segmento(0, n, 1, n, { clase: "c-faint", dash: "4 4" }); g.segmento(1, n, 1, n + m, { clase: "c-red", dash: "4 4" });
      etq(g, 0.5, n, "1", "faint", 0, 14, "middle"); if (m !== 0) etq(g, 1, n + m / 2, fmt(m, 1), "red", 8, 4);
      var crec = m > 0 ? "creciente (sube)" : m < 0 ? "decreciente (baja)" : "constante";
      lectura.innerHTML = fil("Ecuación", U.recta(m, n), "pen") + fil("Es", crec, m > 0 ? "ok" : m < 0 ? "red" : "") +
        fil("Corte con el eje Y", "(0, " + fmt(n, 2) + ")", "red") + fil("Corte con el eje X", m === 0 ? (n === 0 ? "toda la recta (es el eje X)" : "no corta") : "(" + fmt(-n / m, 3) + ", 0)", "ok") +
        fil("Ángulo con el eje X", fmt(Math.atan(m) * 180 / Math.PI, 2) + "°") + fil("f(0) · f(1) · f(2) · f(3)", [0, 1, 2, 3].map(function (x) { return fmt(m * x + n, 2); }).join(" · "));
      pie.innerHTML = "Cada vez que <b>x aumenta 1</b>, la <b>y varía m</b> (triángulo rojo): por eso f(0), f(1), f(2), f(3) forman una progresión aritmética de diferencia m. Con m = 0 la recta es horizontal; con n = 0 pasa por el origen (<b>proporcionalidad directa</b>).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -6, ymax: 6, w: 560, h: 340, etiqueta: "Recta y = mx + n" });
    pinta();
  };

  // ============================================================
  // TARIFA: dos modelos afines, ¿cuál conviene?
  // ============================================================
  B.w.tarifa = function (host) {
    var cuerpo = B.caja(host, "Problema", "Dos tarifas, dos funciones afines: ¿cuál conviene?");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: 5, p: 2, b: 15, q: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Cuota fija A (€)", min: 0, max: 30, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " €"; } });
    U.slider(ctl, { et: "Precio por GB, A", min: 0, max: 5, step: 0.25, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " €"; } });
    U.slider(ctl, { et: "Cuota fija B (€)", min: 0, max: 30, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " €"; } });
    U.slider(ctl, { et: "Precio por GB, B", min: 0, max: 5, step: 0.25, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return fmt(v, 2) + " €"; } });
    function pinta() {
      var a = st.a, p = st.p, b = st.b, q = st.q, X = 20, fa = function (x) { return a + p * x; }, fb = function (x) { return b + q * x; };
      var top = Math.max(fa(X), fb(X), a, b, 10) * 1.1; g.rango(0, X, 0, top); g.limpiar();
      g.curva(fa, { clase: "c-pen", n: 2 }).setAttribute("stroke-width", 3); g.curva(fb, { clase: "c-red", n: 2 }).setAttribute("stroke-width", 3);
      var txt, cl = "";
      if (p === q) { txt = a === b ? "las dos tarifas son iguales" : "las rectas son paralelas: " + (a < b ? "A" : "B") + " siempre es más barata (no se cruzan)"; }
      else {
        var xs = (b - a) / (p - q), ys = fa(xs);
        if (xs > 0 && xs <= X) { g.segmento(xs, 0, xs, ys, { clase: "c-ok", dash: "4 4" }); pto(g, xs, ys, "c-ok", false, 7); etq(g, xs, ys, "(" + fmt(xs, 2) + " GB, " + fmt(ys, 2) + " €)", "ok", 8, -10); }
        var pre = xs <= 0 ? "no se cruzan para consumos positivos: " + (fa(1) < fb(1) ? "A" : "B") + " es siempre más barata" : xs > X ? "se cruzan en x = " + fmt(xs, 2) + " GB (fuera de la gráfica)" : "se cruzan en x = " + fmt(xs, 2) + " GB, con un coste de " + fmt(ys, 2) + " €; para menos GB conviene " + (fa(xs / 2) < fb(xs / 2) ? "A" : "B") + " y para más, " + (fa(xs / 2) < fb(xs / 2) ? "B" : "A");
        txt = pre;
      }
      lectura.innerHTML = fil("Tarifa A", "C<sub>A</sub>(x) = " + fmt(a, 0) + " " + (p ? "+ " + fmt(p, 2) + "x" : ""), "pen") + fil("Tarifa B", "C<sub>B</sub>(x) = " + fmt(b, 0) + " " + (q ? "+ " + fmt(q, 2) + "x" : ""), "red") + fil("Cuándo se igualan", txt, "ok") +
        fil("A 10 GB", "A: " + fmt(fa(10), 2) + " € · B: " + fmt(fb(10), 2) + " €");
      pie.innerHTML = "La <b>cuota fija</b> es la ordenada en el origen n (lo que pagas aunque no consumas) y el <b>precio por GB</b> es la pendiente m. Resolver «¿cuándo cuestan lo mismo?» es resolver <b>mx + n = m′x + n′</b>: el punto de corte de las dos rectas.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 20, ymin: 0, ymax: 40, w: 600, h: 320, etx: "GB", ety: "€", etiqueta: "Coste de dos tarifas" });
    pinta();
  };

  // ============================================================
  // CUADRATICA: tres formas de la misma parábola
  // ============================================================
  B.w.cuadratica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La misma parábola en tres formas: canónica, general y factorizada");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: 1, h: 2, k: -1 }, g, hv, sa, sh, sk, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    sa = U.slider(ctl, { et: "<i>a</i> (abertura)", min: -3, max: 3, step: 0.25, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sh = U.slider(ctl, { et: "<i>h</i> (x del vértice)", min: -5, max: 5, step: 0.5, val: st.h, on: function (v) { st.h = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sk = U.slider(ctl, { et: "<i>k</i> (y del vértice)", min: -6, max: 6, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var a = st.a, h = st.h, k = st.k; g.limpiar(); g.mover(hv, h, k);
      if (a === 0) { lectura.innerHTML = fil("a = 0", "ya no es una parábola: es la recta y = " + fmt(k, 1), "red"); g.horizontal(k, { clase: "c-pen" }); return; }
      var b = -2 * a * h, c = a * h * h + k, D = b * b - 4 * a * c;
      g.vertical(h, { clase: "c-faint", dash: "5 5" });
      g.curva(function (x) { return a * (x - h) * (x - h) + k; }, { clase: "c-pen", n: 420 }).setAttribute("stroke-width", 3);
      pto(g, 0, c, "c-red", false, 5);
      var raices = [];
      if (D > 1e-9) { var s = Math.sqrt(-k / a); raices = [h - s, h + s]; } else if (Math.abs(D) <= 1e-9) raices = [h];
      raices.forEach(function (r) { if (Math.abs(r) < 9) pto(g, r, 0, "c-ok", false, 6); });
      etq(g, h, k, "V(" + fmt(h, 1) + ", " + fmt(k, 1) + ")", "red", 10, a > 0 ? 18 : -10);
      var canon = "f(x) = " + (a === 1 ? "" : a === -1 ? "−" : fmt(a, 2)) + "(x " + (h < 0 ? "+ " : "− ") + fmt(Math.abs(h), 1) + ")²" + (k ? " " + signo(k, 1) : "");
      if (h === 0) canon = "f(x) = " + coef(a, "x²") + (k ? " " + signo(k, 1) : "");
      var gen = "f(x) = " + coef(a, "x²") + (b ? " " + signo(b, 2) + "x" : "") + (c ? " " + signo(c, 2) : "");
      var fac = D > 1e-9 ? "f(x) = " + (a === 1 ? "" : a === -1 ? "−" : fmt(a, 2)) + "(x " + signo(-raices[0], 3).replace("+ ", "+ ").replace("− ", "− ") + ")(x " + signo(-raices[1], 3) + ")" : Math.abs(D) <= 1e-9 ? "f(x) = " + (a === 1 ? "" : fmt(a, 2)) + "(x " + signo(-h, 2) + ")²" : "no se puede factorizar en ℝ (Δ &lt; 0)";
      lectura.innerHTML = fil("Forma canónica", canon, "pen") + fil("Forma general", gen, "pen") + fil("Forma factorizada", fac, "ok") +
        fil("Discriminante Δ = b² − 4ac", fmt(D, 3) + (D > 1e-9 ? "  (dos cortes con el eje X)" : Math.abs(D) <= 1e-9 ? "  (toca el eje X en un punto)" : "  (no corta al eje X)"), "red") +
        fil("Vértice · eje de simetría", "(" + fmt(h, 1) + ", " + fmt(k, 1) + ") · x = " + fmt(h, 1)) + fil("Abre hacia", a > 0 ? "arriba (mínimo en el vértice)" : "abajo (máximo en el vértice)") +
        fil("Corte con el eje Y", "(0, " + fmt(c, 3) + ")") + fil("Recorrido", a > 0 ? "[" + fmt(k, 1) + ", +∞)" : "(−∞, " + fmt(k, 1) + "]");
      pie.innerHTML = "Arrastra el <b style='color:var(--red)'>vértice</b> o mueve los deslizadores. La forma canónica a(x − h)² + k «enseña» el vértice (h, k); la general ax² + bx + c enseña el corte con el eje Y (0, c); la factorizada a(x − x₁)(x − x₂) enseña los cortes con el eje X. Se pasa de una a otra con el desarrollo (de canónica a general: b = −2ah, c = ah² + k).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -8, xmax: 8, ymin: -8, ymax: 8, w: 560, h: 340, etiqueta: "Parábola" });
    hv = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
    g.arrastrar(hv, function (x, y, tecla) {
      var nh = Math.max(-5, Math.min(5, Math.round(x * 2) / 2));
      if (tecla) { sh.set(nh); st.h = nh; pinta(); return; }
      var nk = Math.max(-6, Math.min(6, Math.round(y * 2) / 2));
      st.h = nh; st.k = nk; sh.set(nh); sk.set(nk); pinta();
    }, { get: function () { return st.h; }, paso: 0.5, etiqueta: "Vértice de la parábola" });
    pinta();
  };

  // ============================================================
  // TRANSFORMAR: y = a·f(b(x − h)) + k
  // ============================================================
  var BASES = {
    cuad: { t: "x²", f: function (x) { return x * x; }, tx: function (u) { return "(" + u + ")²"; }, rg: [-8, 8, -5, 9] },
    abs: { t: "|x|", f: Math.abs, tx: function (u) { return "|" + u + "|"; }, rg: [-8, 8, -5, 9] },
    raiz: { t: "√x", f: Math.sqrt, tx: function (u) { return "√(" + u + ")"; }, rg: [-8, 8, -5, 9] },
    inv: { t: "1/x", f: function (x) { return 1 / x; }, tx: function (u) { return "1/(" + u + ")"; }, rg: [-8, 8, -6, 6] },
    cub: { t: "x³", f: function (x) { return x * x * x; }, tx: function (u) { return "(" + u + ")³"; }, rg: [-8, 8, -6, 8] },
    sen: { t: "sen x", f: Math.sin, tx: function (u) { return "sen(" + u + ")"; }, rg: [-8, 8, -5, 5] },
    exp: { t: "2ˣ", f: function (x) { return Math.pow(2, x); }, tx: function (u) { return "2^(" + u + ")"; }, rg: [-8, 8, -3, 9] },
    ln: { t: "ln x", f: Math.log, tx: function (u) { return "ln(" + u + ")"; }, rg: [-8, 8, -5, 5] }
  };
  B.w.transformar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Transforma una gráfica: y = a·f(b(x − h)) + k");
    cuerpo.innerHTML = '<div data-base class="chips"></div><div data-mod class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { base: "cuad", mod: "ning", a: 1, b: 1, h: 2, k: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = {};
    function slid(clave, et, mn, mx) { sl[clave] = U.slider(ctl, { et: et, min: mn, max: mx, step: 0.5, val: st[clave], on: function (v) { st[clave] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    slid("a", "<i>a</i> (estira/refleja ↕)", -3, 3); slid("b", "<i>b</i> (comprime/refleja ↔)", -3, 3); slid("h", "<i>h</i> (desplaza →)", -5, 5); slid("k", "<i>k</i> (desplaza ↑)", -5, 5);
    function arg(b, h) {
      var s = "x"; if (h) s = "x " + (h > 0 ? "− " : "+ ") + fmt(Math.abs(h), 1);
      if (b !== 1) s = (b === -1 ? "−" : fmt(b, 1)) + (h ? "(" + s + ")" : "x");
      return s;
    }
    function pinta() {
      var Bs = BASES[st.base], a = st.a, b = st.b, h = st.h, k = st.k, mod = st.mod;
      g.rango(Bs.rg[0], Bs.rg[1], Bs.rg[2], Bs.rg[3]); g.limpiar();
      var f = Bs.f, T = function (x) { var xx = mod === "absx" ? Math.abs(x) : x, v = a * f(b * (xx - h)) + k; return mod === "absf" ? Math.abs(v) : v; };
      g.curva(f, { clase: "c-faint", dash: "7 5", n: 600 });
      g.curva(T, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      // punto clave: (1, f(1)) → imagen
      var y1 = f(1);
      if (isFinite(y1) && b !== 0 && mod === "ning") {
        var xi = h + 1 / b, yi = a * y1 + k;
        pto(g, 1, y1, "c-faint", true, 5);
        if (Math.abs(xi) < 8 && yi > Bs.rg[2] && yi < Bs.rg[3]) { pto(g, xi, yi, "c-red", false, 6); U.flecha(g, 1, y1, xi, yi, { clase: "c-red", grosor: 2 }); }
      }
      var u = arg(b, h), t = Bs.tx(mod === "absx" ? u.replace(/x/g, "|x|") : u), formula = "y = " + (a === 1 ? "" : a === -1 ? "−" : fmt(a, 1) + "·") + t + (k ? " " + signo(k, 1) : "");
      if (mod === "absf") formula = "y = |" + formula.slice(4) + "|";
      var efectos = [];
      if (h) efectos.push("h = " + fmt(h, 1) + ": se desplaza " + fmt(Math.abs(h), 1) + " a la " + (h > 0 ? "derecha" : "izquierda"));
      if (k) efectos.push("k = " + fmt(k, 1) + ": se desplaza " + fmt(Math.abs(k), 1) + " " + (k > 0 ? "hacia arriba" : "hacia abajo"));
      if (Math.abs(a) !== 1 && a !== 0) efectos.push("|a| = " + fmt(Math.abs(a), 1) + ": se " + (Math.abs(a) > 1 ? "estira" : "aplasta") + " verticalmente");
      if (a < 0) efectos.push("a &lt; 0: se refleja respecto al eje X (de arriba a abajo)");
      if (b === 0) efectos.push("b = 0: la función queda constante (todos los x dan lo mismo)");
      else { if (Math.abs(b) !== 1) efectos.push("|b| = " + fmt(Math.abs(b), 1) + ": se " + (Math.abs(b) > 1 ? "comprime" : "ensancha") + " horizontalmente (factor 1/|b|)"); if (b < 0) efectos.push("b &lt; 0: se refleja respecto al eje Y (de izquierda a derecha)"); }
      if (mod === "absf") efectos.push("|f|: lo que queda por debajo del eje X se refleja hacia arriba");
      if (mod === "absx") efectos.push("f(|x|): se borra la parte izquierda y se copia la derecha reflejada en el eje Y (queda par)");
      lectura.innerHTML = fil("Función base · transformada", "f(x) = " + Bs.t + "  →  " + formula, "pen") + fil("Qué ha cambiado", efectos.length ? "<ul class='lec-ul'>" + efectos.map(function (e) { return "<li>" + e + "</li>"; }).join("") + "</ul>" : "nada: es la función base");
      pie.innerHTML = "La gráfica <b>gris discontinua</b> es la función base f(x); la <b>azul</b> es la transformada. El punto clave (1, f(1)) de la base viaja hasta su imagen (flecha roja): primero se aplican b y h al valor de <i>x</i> (dentro del paréntesis: actúan «al revés») y luego a y k al valor de <i>y</i> (fuera: actúan «al derecho»).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -8, xmax: 8, ymin: -5, ymax: 9, w: 600, h: 340, etiqueta: "Función base y transformada" });
    U.fichas(cuerpo.querySelector("[data-base]"), Object.keys(BASES).map(function (k) { return { k: k, t: "f(x) = " + BASES[k].t }; }), "cuad", function (k) { st.base = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-mod]"), [{ k: "ning", t: "Sin valor absoluto" }, { k: "absf", t: "|f(x)|" }, { k: "absx", t: "f(|x|)" }], "ning", function (k) { st.mod = k; pinta(); });
    pinta();
  };

  // ============================================================
  // TROZOS: funciones definidas a trozos, evaluación y continuidad
  // ============================================================
  function escalones() {
    var tr = [];
    for (var n = -3; n < 4; n++) (function (n) { tr.push({ f: function () { return n; }, txt: String(n), a: n, b: n + 1, ca: true, cb: false }); })(n);
    return tr;
  }
  var TR = {
    abs: { t: "|x|", rg: [-5, 5, -1, 5], x0: -2, tr: [{ f: function (x) { return -x; }, txt: "−x", a: -INF, b: 0, ca: false, cb: false }, { f: function (x) { return x; }, txt: "x", a: 0, b: INF, ca: true, cb: false }], nota: "El valor absoluto es la función a trozos más famosa: «−x si x &lt; 0, x si x ≥ 0». Se junta sin saltos en (0, 0): es continua." },
    salto: { t: "Con salto", rg: [-4, 4, -2, 6], x0: -2, tr: [{ f: function (x) { return x + 1; }, txt: "x + 1", a: -INF, b: 0, ca: false, cb: false }, { f: function (x) { return x * x; }, txt: "x²", a: 0, b: INF, ca: true, cb: false }], nota: "Por la izquierda la gráfica se acerca a 1, pero en x = 0 la función vale 0: hay un <b>salto</b>. El círculo hueco marca el valor que NO se alcanza." },
    cont: { t: "Parámetro k", rg: [-3, 6, -4, 10], x0: 0, param: { et: "<i>k</i>", min: -1, max: 5, step: 0.5, val: 1 }, tr: [{ f: function (x) { return x + 1; }, txt: "x + 1", a: -INF, b: 2, ca: false, cb: false }, { f: function (x, k) { return k * x - 1; }, txt: function (k) { return fmt(k, 1) + "x − 1"; }, a: 2, b: INF, ca: true, cb: false }], nota: "Mueve <b>k</b>: la función se vuelve continua en x = 2 cuando los dos trozos valen lo mismo allí: 2 + 1 = 2k − 1 → <b>k = 2</b>." },
    evit: { t: "Hueco", rg: [-3, 5, -2, 6], x0: 0, tr: [{ f: function (x) { return x + 1; }, txt: "x + 1", a: -INF, b: 1, ca: false, cb: false }, { f: function () { return 3; }, txt: "3", a: 1, b: 1, ca: true, cb: true }, { f: function (x) { return x + 1; }, txt: "x + 1", a: 1, b: INF, ca: false, cb: false }], nota: "Los dos trozos llevan a (1, 2) pero la función vale 3 en x = 1: un punto «fuera de sitio» (discontinuidad evitable). Si definiéramos f(1) = 2 desaparecería el problema." },
    elec: { t: "Factura eléctrica", rg: [0, 500, 0, 100], x0: 150, paso: 10, tr: [{ f: function (x) { return 0.1 * x; }, txt: "0,1x", a: 0, b: 100, ca: true, cb: true }, { f: function (x) { return 10 + 0.15 * (x - 100); }, txt: "10 + 0,15(x − 100)", a: 100, b: 300, ca: false, cb: true }, { f: function (x) { return 40 + 0.2 * (x - 300); }, txt: "40 + 0,2(x − 300)", a: 300, b: INF, ca: false, cb: false }], nota: "Tres tramos de consumo (kWh) con precios distintos: cada trozo es una recta con su pendiente y la función es <b>continua</b> porque cada tramo empieza donde acaba el anterior." },
    ent: { t: "Parte entera", rg: [-3.5, 4.5, -4, 5], x0: 1.5, paso: 0.25, tr: escalones(), nota: "La parte entera ⌊x⌋ da el mayor entero que no supera a x. Tiene un salto en cada entero: el círculo relleno (incluido) está a la izquierda del trozo y el hueco en el extremo derecho." }
  };
  B.w.trozos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Funciones definidas a trozos: evalúa y estudia la continuidad");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "abs", x0: -2, p: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), slx, slp;
    function contiene(t, x) { return (x > t.a && x < t.b) || (x === t.a && t.ca) || (x === t.b && t.cb); }
    function ev(T, x, p) { for (var i = 0; i < T.tr.length; i++) if (contiene(T.tr[i], x)) return { i: i, v: T.tr[i].f(x, p) }; return null; }
    function texto(t, p) { return typeof t.txt === "function" ? t.txt(p) : t.txt; }
    function cond(t) {
      if (t.a === t.b) return "x = " + num(t.a);
      var s = [];
      if (isFinite(t.a)) s.push(num(t.a) + (t.ca ? " ≤ " : " &lt; ") + "x");
      if (isFinite(t.b)) s.push((isFinite(t.a) ? "" : "x") + (t.cb ? " ≤ " : " &lt; ") + num(t.b));
      return isFinite(t.a) && isFinite(t.b) ? num(t.a) + (t.ca ? " ≤ " : " &lt; ") + "x" + (t.cb ? " ≤ " : " &lt; ") + num(t.b) : isFinite(t.a) ? "x " + (t.ca ? "≥" : "&gt;") + " " + num(t.a) : "x " + (t.cb ? "≤" : "&lt;") + " " + num(t.b);
    }
    function actualiza() {
      var T = TR[st.k]; slx.input.min = T.rg[0] + (T.rg[1] - T.rg[0]) * 0.02; slx.input.max = T.rg[1] - (T.rg[1] - T.rg[0]) * 0.02; slx.input.step = T.paso || 0.25; slx.set(st.x0);
      slp.el.style.display = T.param ? "" : "none";
      if (T.param) { slp.input.min = T.param.min; slp.input.max = T.param.max; slp.input.step = T.param.step; slp.set(st.p); }
    }
    function pinta() {
      var T = TR[st.k], p = st.p, x0 = st.x0, R = T.rg; g.rango(R[0], R[1], R[2], R[3]); g.limpiar();
      T.tr.forEach(function (t) {
        var a = Math.max(t.a, R[0] - 1), b = Math.min(t.b, R[1] + 1);
        if (t.a === t.b) { pto(g, t.a, t.f(t.a, p), "c-pen", false, 5); return; }
        g.curva(function (x) { return t.f(x, p); }, { clase: "c-pen", x0: a, x1: b, n: 400 }).setAttribute("stroke-width", 3);
        if (isFinite(t.a)) pto(g, t.a, t.f(t.a, p), "c-pen", !t.ca, 5);
        if (isFinite(t.b)) pto(g, t.b, t.f(t.b, p), "c-pen", !t.cb, 5);
      });
      var r = ev(T, x0, p);
      g.segmento(x0, R[2], x0, R[3], { clase: "c-faint", dash: "4 5" });
      if (r) { pto(g, x0, r.v, "c-red", false, 6); }
      // continuidad en cada punto de ruptura
      var cs = []; T.tr.forEach(function (t) { [t.a, t.b].forEach(function (c) { if (isFinite(c) && cs.indexOf(c) < 0) cs.push(c); }); }); cs.sort(function (u, v) { return u - v; });
      var inf = cs.filter(function (c) { return c >= R[0] - 1e-9 && c <= R[1] + 1e-9; }).map(function (c) {
        var izq = null, der = null, en = null;
        T.tr.forEach(function (t, i) { if (t.b === c && t.a < c) izq = t.f(c, p); if (t.a === c && t.b > c) der = t.f(c, p); if (contiene(t, c)) en = t.f(c, p); });
        var L = izq == null ? null : izq, Rr = der == null ? null : der, igual = function (u, v) { return Math.abs(u - v) < 1e-9; };
        var s = "En <b>x = " + num(c) + "</b>: por la izquierda se acerca a " + (L == null ? "—" : fmt(L, 3)) + ", por la derecha a " + (Rr == null ? "—" : fmt(Rr, 3)) + " y vale " + (en == null ? "—" : fmt(en, 3)) + " → ";
        if (L != null && Rr != null && en != null && igual(L, Rr) && igual(L, en)) return s + "<b style='color:var(--ok)'>continua</b>";
        if (L != null && Rr != null && igual(L, Rr)) return s + "<b style='color:var(--red)'>discontinuidad evitable</b> (hay un hueco o un punto fuera de sitio)";
        return s + "<b style='color:var(--red)'>salto</b> de " + fmt(Math.abs((Rr == null ? en : Rr) - (L == null ? en : L)), 3);
      });
      var fx = r ? "x = " + fmt(x0, 2) + " cumple " + cond(T.tr[r.i]) + " → se usa <b>" + texto(T.tr[r.i], p) + "</b> → f(" + fmt(x0, 2) + ") = <b>" + fmt(r.v, 3) + "</b>" : "f no está definida en x = " + fmt(x0, 2);
      lectura.innerHTML = fil("Trozos", "<ul class='lec-ul'>" + T.tr.map(function (t) { return "<li>" + texto(t, p) + "  si  " + cond(t) + "</li>"; }).join("") + "</ul>", "pen") + fil("Evaluación", fx, "red ancho") + fil("Continuidad", "<ul class='lec-ul'>" + (inf.length ? inf.map(function (z) { return "<li>" + z + "</li>"; }).join("") : "<li>sin puntos de ruptura en la ventana</li>") + "</ul>", "ok ancho");
      pie.innerHTML = T.nota;
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 5, ymin: -1, ymax: 5, w: 600, h: 340, etiqueta: "Función a trozos" });
    slx = U.slider(ctl, { et: "Valor de <i>x</i>", min: -5, max: 5, step: 0.25, val: st.x0, on: function (v) { st.x0 = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    slp = U.slider(ctl, { et: "Parámetro <i>k</i>", min: -1, max: 5, step: 0.5, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(TR).map(function (k) { return { k: k, t: TR[k].t }; }), "abs", function (k) { st.k = k; st.x0 = TR[k].x0; if (TR[k].param) st.p = TR[k].param.val; actualiza(); pinta(); });
    actualiza(); pinta();
  };
})(window);
