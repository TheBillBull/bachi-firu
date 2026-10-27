/* ============================================================
   Bachi para Firu · laboratorio de sucesiones II (Matemáticas I, tema 2)
   recurrencia · serie · anualidad · koch
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  B.lab = B.lab || {};
  var S2 = B.lab.suc2 = {};
  var fil = F.fil, pto = F.pto, campo = F.campo;

  function lista(f, a1, n) { var v = [a1], i; for (i = 1; i < n; i++) v.push(f(v[i - 1])); return v; }
  S2.lista = lista;
  // Clasificación numérica de una sucesión generada
  S2.clasifica = function (v) {
    var n = v.length, d = [], q = [], i;
    for (i = 1; i < n; i++) { d.push(v[i] - v[i - 1]); q.push(v[i - 1] !== 0 ? v[i] / v[i - 1] : NaN); }
    var tol = function (x, y) { return Math.abs(x - y) < 1e-9 * Math.max(1, Math.abs(x), Math.abs(y)); };
    if (d.every(function (x) { return tol(x, d[0]); })) return { tipo: "aritmética", d: d[0] };
    if (q.every(function (x) { return !isNaN(x) && tol(x, q[0]); })) return { tipo: "geométrica", r: q[0] };
    return { tipo: "otra" };
  };
  // Límite por iteración: 400 pasos y comprobación de estabilidad
  S2.limite = function (f, a1) {
    var x = a1, i, ant;
    for (i = 0; i < 2000; i++) { ant = x; x = f(x); if (!isFinite(x) || Math.abs(x) > 1e12) return { tipo: "diverge" }; }
    if (Math.abs(x - ant) < 1e-9) return { tipo: "converge", L: x };
    var a = x, b = f(a), c = f(b), e = f(c);
    if (Math.abs(a - c) < 1e-7 && Math.abs(b - e) < 1e-7) return { tipo: "periodica", per: [a, b] };
    return { tipo: "oscila" };
  };

  // ============================================================
  // RECURRENCIA: a₍ₙ₊₁₎ = f(aₙ)
  // ============================================================
  var PR = [
    { f: "x+3", a: 2, t: "aₙ + 3 (a₁ = 2)" }, { f: "2x", a: 1, t: "2·aₙ (a₁ = 1)" }, { f: "(x+2)/2", a: 10, t: "(aₙ + 2)/2 (a₁ = 10)" },
    { f: "(x+2/x)/2", a: 1, t: "Herón: (aₙ + 2/aₙ)/2 (a₁ = 1)" }, { f: "2x-1", a: 3, t: "2aₙ − 1 (a₁ = 3)" }, { f: "-x", a: 3, t: "−aₙ (a₁ = 3)" },
    { f: "1+1/x", a: 1, t: "1 + 1/aₙ (a₁ = 1)" }, { f: "2.8x(1-x)", a: 0.2, t: "2,8·aₙ(1 − aₙ) (a₁ = 0,2)" }, { f: "3.9x(1-x)", a: 0.2, t: "3,9·aₙ(1 − aₙ) (a₁ = 0,2)" }
  ];
  B.w.recurrencia = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Sucesiones recurrentes: a₍ₙ₊₁₎ = f(aₙ)");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: PR[2].f, a: PR[2].a, n: 20 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    var iF = campo(ctl, "aₙ₊₁ =", st.f, 190), iA = campo(ctl, "a₁ =", String(st.a), 70);
    U.slider(ctl, { et: "Términos", min: 6, max: 40, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      var r = F.leer(st.f), a1 = B.Mate.numero(st.a); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error + " (escribe aₙ como x)", "red"); tabla.innerHTML = ""; return; }
      if (isNaN(a1)) { lectura.innerHTML = fil("Revisa a₁", "escribe un número", "red"); tabla.innerHTML = ""; return; }
      var f = r.g, v = lista(f, a1, st.n), cl = S2.clasifica(v.slice(0, 12)), L = S2.limite(f, a1);
      var fin = v.filter(function (z) { return isFinite(z); }), lo = Math.min.apply(null, fin), hi = Math.max.apply(null, fin), pad = (hi - lo) * 0.15 || 1;
      g.rango(0, st.n + 1, Math.max(lo - pad, -1e6), Math.min(hi + pad, 1e6)); g.limpiar();
      if (L.tipo === "converge") g.horizontal(L.L, { clase: "c-ok", dash: "6 5" });
      g.polilinea(v.map(function (z, i) { return [i + 1, isFinite(z) ? Math.max(-1e6, Math.min(1e6, z)) : 0]; }), { clase: "c-pen" });
      v.forEach(function (z, i) { if (isFinite(z)) pto(g, i + 1, z, "c-pen", false, 4); });
      var filas = v.slice(0, 12).map(function (z, i) { return "<td>" + fmt(z, 5) + "</td>"; }).join("");
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>n</th>" + v.slice(0, 12).map(function (_, i) { return "<th>" + (i + 1) + "</th>"; }).join("") + "</tr></thead><tbody><tr><th>aₙ</th>" + filas + "</tr></tbody></table>";
      var tipo = cl.tipo === "aritmética" ? "aritmética con d = " + fmt(cl.d, 4) : cl.tipo === "geométrica" ? "geométrica con r = " + fmt(cl.r, 4) : "ni aritmética ni geométrica";
      var comp = L.tipo === "converge" ? "se acerca a <b>" + fmt(L.L, 6) + "</b>: es el valor que cumple L = f(L) (punto fijo)" : L.tipo === "diverge" ? "<b>diverge</b> (crece sin límite)" : L.tipo === "periodica" ? "se repite en ciclo entre " + fmt(L.per[0], 4) + " y " + fmt(L.per[1], 4) : "no se estabiliza (oscila de forma irregular)";
      lectura.innerHTML = fil("Primeros términos", v.slice(0, 6).map(function (z) { return fmt(z, 4); }).join(", ") + ", …", "pen ancho") + fil("Tipo", tipo, "") + fil("Comportamiento a largo plazo", comp, "ok ancho");
      pie.innerHTML = "En una sucesión <b>recurrente</b> cada término se obtiene del anterior con una regla f. Si la sucesión converge a L, ese L tiene que cumplir <b>L = f(L)</b> (el «punto fijo»): por ejemplo, con (aₙ + 2)/2 se resuelve L = (L + 2)/2 y sale L = 2. Con la regla de Herón (aₙ + 2/aₙ)/2 la sucesión se acerca a √2: es un método antiguo para calcular raíces.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 21, ymin: 0, ymax: 12, w: 600, h: 300, etx: "n", ety: "aₙ", etiqueta: "Términos de la sucesión" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PR.map(function (p, i) { return { k: String(i), t: p.t }; }), "2", function (k) { var P = PR[+k]; st.f = P.f; st.a = P.a; iF.value = P.f; iA.value = String(P.a); pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); }); iA.addEventListener("input", function () { st.a = iA.value; pinta(); });
    pinta();
  };

  // ============================================================
  // SERIE: sumas parciales de una progresión geométrica
  // ============================================================
  B.w.serie = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Sumar infinitos términos: sumas parciales de una serie geométrica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { a: 1, r: 0.5, n: 12 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sa, sr, sn;
    sa = U.slider(ctl, { et: "Primer término <i>a</i>", min: -4, max: 4, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    sr = U.slider(ctl, { et: "Razón <i>r</i>", min: -1.5, max: 1.5, step: 0.05, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sn = U.slider(ctl, { et: "Términos <i>n</i>", min: 1, max: 30, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var PS = [{ t: "Zenón: 1/2 + 1/4 + 1/8 + …", a: 0.5, r: 0.5 }, { t: "0,(9) = 0,9 + 0,09 + …", a: 0.9, r: 0.1 }, { t: "1 − 1 + 1 − …", a: 1, r: -1 }, { t: "2 + 4 + 8 + …", a: 2, r: 2 }, { t: "1 − 1/2 + 1/4 − …", a: 1, r: -0.5 }];
    function pinta() {
      var a = st.a, r = st.r, n = st.n, i, s = 0, ps = [];
      for (i = 1; i <= n; i++) { s += a * Math.pow(r, i - 1); ps.push([i, s]); }
      var conv = Math.abs(r) < 1, Lm = conv ? a / (1 - r) : null, vals = ps.map(function (p) { return p[1]; }).concat(conv ? [Lm] : []);
      var lo = Math.min.apply(null, vals.concat([0])), hi = Math.max.apply(null, vals.concat([0])), pad = (hi - lo) * 0.15 || 1; g.rango(0, n + 1, lo - pad, hi + pad); g.limpiar();
      if (conv) g.horizontal(Lm, { clase: "c-ok", dash: "6 5" });
      g.polilinea([[0, 0]].concat(ps), { clase: "c-pen" }); ps.forEach(function (p) { pto(g, p[0], p[1], "c-pen", false, 4); });
      var cierre = Math.abs(r - 1) < 1e-9 ? "S = a·n" : fmt(a * (1 - Math.pow(r, n)) / (1 - r), 6);
      lectura.innerHTML = fil("Suma de los " + n + " primeros", "Sₙ = a(1 − rⁿ)/(1 − r) = " + fmt(s, 6), "pen") + fil("Suma de todos (n → ∞)", conv ? "S = a/(1 − r) = " + fmt(Lm, 6) : "no existe: |r| ≥ 1 y las sumas no se estabilizan", conv ? "ok" : "red") +
        fil("¿Cuánto falta?", conv ? fmt(Lm - s, 6) + "  (cada término extra reduce lo que falta en un factor r)" : "—", "");
      pie.innerHTML = "Una <b>serie geométrica</b> de razón r suma a + ar + ar² + …: si <b>|r| &lt; 1</b>, los términos son cada vez más pequeños y las sumas parciales se acercan a <b>S = a/(1 − r)</b>; si |r| ≥ 1, no. Así 0,999… = 0,9/(1 − 0,1) = 1, y se resuelve la paradoja de Zenón (1/2 + 1/4 + 1/8 + … = 1).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 13, ymin: -1, ymax: 3, w: 600, h: 300, etx: "n", ety: "Sₙ", etiqueta: "Sumas parciales" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PS.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { var P = PS[+k]; st.a = P.a; st.r = P.r; sa.set(P.a); sr.set(P.r); pinta(); });
    st.a = 0.5; st.r = 0.5; sa.set(0.5); sr.set(0.5);
    pinta();
  };

  // ============================================================
  // ANUALIDAD: ahorro periódico y préstamo
  // ============================================================
  B.w.anualidad = function (host) {
    var cuerpo = B.caja(host, "Problema", "Interés compuesto con pagos periódicos: ahorro y préstamo");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "ah", c: 200, r: 3, a: 10, C: 10000 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), S = {};
    S.c = U.slider(ctl, { et: "Aportación mensual (€)", min: 25, max: 1000, step: 25, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " €"; } });
    S.C = U.slider(ctl, { et: "Capital prestado (€)", min: 1000, max: 100000, step: 1000, val: st.C, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " €"; } });
    S.r = U.slider(ctl, { et: "Tipo anual (%)", min: 0.5, max: 12, step: 0.5, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " %"; } });
    S.a = U.slider(ctl, { et: "Años", min: 1, max: 30, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      var ah = st.modo === "ah", i = st.r / 1200, n = st.a * 12, f = Math.pow(1 + i, n);
      S.c.el.style.display = ah ? "" : "none"; S.C.el.style.display = ah ? "none" : "";
      g.limpiar();
      if (ah) {
        var cap = st.c * (f - 1) / i, aport = st.c * n, pts = [], k;
        for (k = 0; k <= n; k++) pts.push([k / 12, st.c * (Math.pow(1 + i, k) - 1) / i]);
        g.rango(0, st.a, 0, cap * 1.1); g.limpiar(); g.polilinea(pts, { clase: "c-pen" }).setAttribute("stroke-width", 3);
        g.polilinea([[0, 0], [st.a, aport]], { clase: "c-faint", dash: "6 5" });
        lectura.innerHTML = fil("Capital final", "C = c·((1 + i)ⁿ − 1)/i = " + fmt(cap, 2) + " €", "ok") + fil("Aportado", fmt(aport, 0) + " €", "") + fil("Intereses ganados", fmt(cap - aport, 2) + " €", "pen") + fil("Datos", "i = " + fmt(i * 100, 4) + " % mensual · n = " + n + " pagos", "");
        pie.innerHTML = "Cada aportación mensual c (al final de cada mes) genera interés compuesto durante el tiempo que queda: el capital es la suma de una <b>progresión geométrica</b> de razón (1 + i): c(1 + i)ⁿ⁻¹ + … + c(1 + i) + c, es decir, <b>c·((1 + i)ⁿ − 1)/i</b>. La recta de trazos son los ahorros sin intereses.";
      } else {
        var cuota = i > 0 ? st.C * i / (1 - Math.pow(1 + i, -n)) : st.C / n, tot = cuota * n, sal = [], s = st.C, k2;
        for (k2 = 0; k2 <= n; k2++) { sal.push([k2 / 12, Math.max(0, s)]); s = s * (1 + i) - cuota; }
        g.rango(0, st.a, 0, st.C * 1.05); g.limpiar(); g.polilinea(sal, { clase: "c-red" }).setAttribute("stroke-width", 3);
        lectura.innerHTML = fil("Cuota mensual", "a = C·i/(1 − (1 + i)⁻ⁿ) = " + fmt(cuota, 2) + " €", "ok") + fil("Total pagado", fmt(tot, 2) + " €", "") + fil("Intereses pagados", fmt(tot - st.C, 2) + " €", "red") + fil("Datos", "i = " + fmt(i * 100, 4) + " % mensual · n = " + n + " cuotas", "");
        pie.innerHTML = "En un préstamo, el valor actual de todas las cuotas debe igualar el capital: C = a/(1 + i) + a/(1 + i)² + … + a/(1 + i)ⁿ, otra progresión geométrica de la que se despeja la <b>cuota a = C·i/(1 − (1 + i)⁻ⁿ)</b>. La curva muestra la deuda pendiente: baja despacio al principio (se pagan sobre todo intereses).";
      }
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 0, ymax: 30000, w: 600, h: 300, etx: "años", ety: "€", etiqueta: "Evolución del capital" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "ah", t: "Ahorro mensual" }, { k: "pr", t: "Préstamo (cuota mensual)" }], "ah", function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // KOCH: copo de nieve y sucesiones de perímetros y áreas
  // ============================================================
  function koch(pts) {
    var out = [], i;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], dx = (b[0] - a[0]) / 3, dy = (b[1] - a[1]) / 3, p1 = [a[0] + dx, a[1] + dy], p3 = [a[0] + 2 * dx, a[1] + 2 * dy];
      var p2 = [p1[0] + dx * 0.5 - dy * Math.sqrt(3) / 2, p1[1] + dy * 0.5 + dx * Math.sqrt(3) / 2];
      out.push(a, p1, p2, p3);
    }
    out.push(pts[pts.length - 1]); return out;
  }
  B.w.koch = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El copo de nieve de Koch: perímetro infinito, área finita");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 3 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    U.slider(ctl, { et: "Iteración <i>n</i>", min: 0, max: 5, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      var n = st.n, h = Math.sqrt(3) / 2, p = [[0, 0], [1, 0], [0.5, h], [0, 0]], k;
      // el triángulo se recorre en sentido horario para que las puntas salgan hacia fuera
      p = [[0, 0], [0.5, h], [1, 0], [0, 0]];
      for (k = 0; k < n; k++) p = koch(p);
      g.limpiar(); g.polilinea(p, { clase: "c-pen" }).setAttribute("stroke-width", n > 3 ? 1.4 : 2.2);
      var A0 = Math.sqrt(3) / 4, A = A0, i;
      for (i = 1; i <= n; i++) A += 3 * Math.pow(4, i - 1) * A0 / Math.pow(9, i);
      var filas = [0, 1, 2, 3, 4, 5].map(function (j) { var Aj = A0, q; for (q = 1; q <= j; q++) Aj += 3 * Math.pow(4, q - 1) * A0 / Math.pow(9, q); return "<tr" + (j === n ? " class='izq'" : "") + "><th>" + j + "</th><td>" + (3 * Math.pow(4, j)) + "</td><td>" + fmt(Math.pow(1 / 3, j), 5) + "</td><td>" + fmt(3 * Math.pow(4 / 3, j), 4) + "</td><td>" + fmt(Aj, 5) + "</td></tr>"; }).join("");
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>n</th><th>lados</th><th>lado</th><th>perímetro</th><th>área</th></tr></thead><tbody>" + filas + "</tbody></table>";
      lectura.innerHTML = fil("Lados", "3·4ⁿ = " + (3 * Math.pow(4, n)), "pen") + fil("Perímetro", "3·(4/3)ⁿ = " + fmt(3 * Math.pow(4 / 3, n), 4) + "  → +∞", "red") + fil("Área", fmt(A, 5) + "  → 2√3/5 ≈ " + fmt(2 * Math.sqrt(3) / 5, 5), "ok");
      pie.innerHTML = "Cada paso sustituye el tercio central de cada lado por dos lados iguales: el número de lados se multiplica por 4 (<b>progresión geométrica de razón 4</b>) y la longitud de cada uno se divide entre 3 (razón 1/3), así que el perímetro se multiplica por 4/3 (<b>razón 4/3 &gt; 1: crece sin límite</b>). El área añadida en cada paso forma una serie geométrica de razón 4/9 &lt; 1, que <b>suma un valor finito</b> (8/5 del triángulo inicial).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -0.2, xmax: 1.2, ymin: -0.2, ymax: 1.2, w: 520, h: 420, sinEjes: true, limpio: true, etiqueta: "Copo de Koch" });
    g.rangoIso(0.5, 0.29, 0.68);
    pinta();
  };

  // ============================================================
  // ε–N: definición de límite de una sucesión
  // ============================================================
  var PE = [
    { f: "1/n", L: 0, t: "1/n → 0" }, { f: "(2n+1)/(n+1)", L: 2, t: "(2n + 1)/(n + 1) → 2" }, { f: "(-1)^n/n", L: 0, t: "(−1)ⁿ/n → 0" },
    { f: "n/(n^2+1)", L: 0, t: "n/(n² + 1) → 0" }, { f: "0.9^n", L: 0, t: "0,9ⁿ → 0" }, { f: "(1+1/n)^n", L: Math.E, t: "(1 + 1/n)ⁿ → e (lenta)" }
  ];
  B.w.epsn = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Definición de límite: elige ε y encuentra N");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: PE[1].f, L: PE[1].L, k: 10 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iF = campo(ctl, "aₙ =", st.f, 190);
    U.slider(ctl, { et: "Tolerancia ε", min: 0, max: 30, step: 1, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(Math.pow(10, -v / 10), 4); } });
    function valor(f, n) { return f(n); }
    function pinta() {
      var r = F.leer(st.f); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error + " (usa la letra n)", "red"); return; }
      var f = r.g, eps = Math.pow(10, -st.k / 10), L = st.L, i, TOPE = 200000, N = 1, fuera = 0;
      if (L === null) { var u = f(1e6), w = f(2e6); L = Math.abs(u - w) < 1e-4 ? w : NaN; }
      if (isNaN(L)) { lectura.innerHTML = fil("Sin límite claro", "esta sucesión no parece acercarse a un único valor", "red"); return; }
      for (i = 1; i <= TOPE; i++) { var z = valor(f, i); if (!isFinite(z) || Math.abs(z - L) >= eps) fuera = i; }
      N = fuera + 1;
      var xmax = Math.max(10, Math.min(N + Math.ceil(N * 0.25) + 2, 120)), pts = [], hi = L + eps, lo = L - eps, ymin = lo, ymax = hi;
      for (i = 1; i <= xmax; i++) { var q = valor(f, i); pts.push([i, q]); if (isFinite(q)) { ymin = Math.min(ymin, q); ymax = Math.max(ymax, q); } }
      var pad = (ymax - ymin) * 0.12 || 1; g.rango(0, xmax, ymin - pad, ymax + pad); g.limpiar();
      g.rect(0, lo, xmax, hi, { clase: "z-ok" });
      g.horizontal(L, { clase: "c-ok", dash: "6 5" });
      if (N <= 120) { g.segmento(N - 0.5, ymin - pad, N - 0.5, ymax + pad, { clase: "c-red", dash: "4 4" }); }
      g.polilinea(pts, { clase: "c-faint" });
      pts.forEach(function (p) { if (isFinite(p[1])) pto(g, p[0], p[1], p[0] >= N ? "c-ok" : "c-red", false, xmax > 60 ? 2.5 : 4); });
      lectura.innerHTML = fil("Límite", "L = " + fmt(L, 5), "ok") + fil("Banda", "L − ε &lt; aₙ &lt; L + ε → (" + fmt(lo, 5) + "; " + fmt(hi, 5) + ")", "") +
        fil("A partir de qué término", N > TOPE ? "más allá de n = " + TOPE : "N = " + N + ": desde n ≥ " + N + " todos los términos entran en la banda (los rojos están fuera)", "pen ancho");
      pie.innerHTML = "<b>an → L</b> significa: <b>para cualquier ε &gt; 0, por pequeña que sea, existe un N tal que a partir de él (n ≥ N) todos los términos cumplen |aₙ − L| &lt; ε</b>. Es la idea del entorno (Tema 1) aplicada a una sucesión: al achicar ε hay que ir más lejos (N crece), pero siempre se encuentra. En una sucesión que no converge (como (−1)ⁿ) esto no se cumple para ε pequeños.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 20, ymin: 0, ymax: 3, w: 600, h: 300, etx: "n", ety: "aₙ", etiqueta: "Términos y banda de tolerancia" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PE.map(function (p, i) { return { k: String(i), t: p.t }; }), "1", function (k) { var P = PE[+k]; st.f = P.f; st.L = P.L; iF.value = P.f; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; st.L = null; pinta(); });
    pinta();
  };

  // ============================================================
  // CAPITALIZACIÓN: de los periodos al número e
  // ============================================================
  B.w.capitaliza = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Capitalizar más a menudo: del interés anual al número e");
    cuerpo.innerHTML = '<div data-ctl></div><div class="w-plot"></div><div class="ac-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { C: 1000, r: 5, t: 10 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), tabla = cuerpo.querySelector(".ac-tabla");
    U.slider(ctl, { et: "Capital (€)", min: 100, max: 10000, step: 100, val: st.C, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " €"; } });
    U.slider(ctl, { et: "Tipo anual (%)", min: 1, max: 100, step: 1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " %"; } });
    U.slider(ctl, { et: "Años", min: 1, max: 30, step: 1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var MODOS = [["anual", 1], ["semestral", 2], ["trimestral", 4], ["mensual", 12], ["diaria", 365]];
    function pinta() {
      var C = st.C, r = st.r / 100, t = st.t, cont = C * Math.exp(r * t), k;
      var filas = MODOS.map(function (m) { var v = C * Math.pow(1 + r / m[1], m[1] * t); return "<tr><th>" + m[0] + " (" + m[1] + ")</th><td>" + fmt(v, 2) + " €</td><td>" + fmt(v - C, 2) + " €</td></tr>"; }).join("") +
        "<tr class='izq'><th>continua (e<sup>rt</sup>)</th><td>" + fmt(cont, 2) + " €</td><td>" + fmt(cont - C, 2) + " €</td></tr>";
      tabla.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Abonos (al año)</th><th>capital final</th><th>intereses</th></tr></thead><tbody>" + filas + "</tbody></table>";
      var base = C * Math.pow(1 + r, t), pts = [], j;
      g.rango(0, 31, base - (cont - base) * 0.15, cont + (cont - base) * 0.2); g.limpiar();
      g.horizontal(cont, { clase: "c-ok", dash: "6 5" });
      for (j = 1; j <= 30; j++) pts.push([j, C * Math.pow(1 + r / j, j * t)]);
      g.polilinea(pts, { clase: "c-pen" }); pts.forEach(function (q) { pto(g, q[0], q[1], "c-pen", false, 3.5); });
      g.texto(30.5, cont, "límite " + fmt(cont, 2) + " €", { ancla: "end", dy: -8, clase: "t-ok" });
      var e1 = Math.pow(1 + 1 / 1000000, 1000000);
      lectura.innerHTML = fil("Anual → continua", fmt(C * Math.pow(1 + r, t), 2) + " € → " + fmt(cont, 2) + " €", "pen") + fil("Con r = 100 %, t = 1 año", "el capital se multiplica por (1 + 1/k)ᵏ → e ≈ " + fmt(Math.E, 5), "ok") + fil("Comprobación", "(1 + 1/10⁶)^(10⁶) = " + fmt(e1, 6), "");
      pie.innerHTML = "Si el tipo anual r se reparte en k abonos al año, el factor de un año es (1 + r/k)ᵏ. Cuanto más a menudo se capitaliza, más sube, pero <b>no sin límite</b>: se acerca a e<sup>r</sup>. Con r = 100 % sale (1 + 1/k)ᵏ → <b>e</b> (Jakob Bernoulli, 1683). En la gráfica, cada punto es el capital final con k abonos al año; la línea verde es el límite e<sup>rt</sup>.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 10, ymin: 1000, ymax: 1700, w: 600, h: 280, etx: "k (abonos al año)", ety: "€", etiqueta: "Capital final según los abonos al año" });
    pinta();
  };

})(window);
