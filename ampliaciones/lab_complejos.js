/* ============================================================
   Bachi para Firu · laboratorio de números complejos (Matemáticas I, tema 6)
   motor B.lab.cx + potenciasi · operaciones · plano · conversor
   raices · lugar · mandelbrot
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var C = B.lab.cx = {};
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }

  // ------------------------------------------------------------
  // Aritmética: z = { a, b } (a + bi)
  // ------------------------------------------------------------
  function z(a, b) { return { a: a, b: b }; }
  C.z = z;
  C.suma = function (p, q) { return z(p.a + q.a, p.b + q.b); };
  C.resta = function (p, q) { return z(p.a - q.a, p.b - q.b); };
  C.mul = function (p, q) { return z(p.a * q.a - p.b * q.b, p.a * q.b + p.b * q.a); };
  C.conj = function (p) { return z(p.a, -p.b); };
  C.div = function (p, q) { var d = q.a * q.a + q.b * q.b; return z((p.a * q.a + p.b * q.b) / d, (p.b * q.a - p.a * q.b) / d); };
  C.mod = function (p) { return Math.hypot(p.a, p.b); };
  C.arg = function (p) { var t = Math.atan2(cero(p.b), cero(p.a)) / R; t = ((t % 360) + 360) % 360; return Math.abs(t - 360) < 1e-9 ? 0 : t; };
  C.polar = function (r, tDeg) { return z(cero(r * Math.cos(tDeg * R)), cero(r * Math.sin(tDeg * R))); };
  C.pot = function (p, n) { var r = Math.pow(C.mod(p), n), t = C.arg(p) * n; return C.polar(r, t); };
  C.raices = function (r, tDeg, n) {
    var out = [], m = Math.pow(r, 1 / n);
    for (var k = 0; k < n; k++) out.push({ r: m, t: ((tDeg + 360 * k) / n) % 360 });
    return out;
  };

  // Escritura bonita de un complejo en forma binómica
  C.txt = function (p, d) {
    d = d == null ? 3 : d;
    var a = cero(Math.round(p.a * Math.pow(10, d)) / Math.pow(10, d)), b = cero(Math.round(p.b * Math.pow(10, d)) / Math.pow(10, d));
    if (b === 0) return fmt(a, d);
    var bs = Math.abs(b) === 1 ? "" : fmt(Math.abs(b), d);
    if (a === 0) return (b < 0 ? "−" : "") + bs + "i";
    return fmt(a, d) + (b < 0 ? " − " : " + ") + bs + "i";
  };
  C.txtPolar = function (p, d) { d = d == null ? 3 : d; return fmt(C.mod(p), d) + "<sub>" + fmt(C.arg(p), 2) + "°</sub>"; };

  // Lectura de un complejo escrito por el usuario: "3-2i", "-i", "2i", "1/2+sqrt(3)/2 i", "(1+i)"
  C.leer = function (src) {
    var s = String(src).replace(/\s+/g, "").replace(/[−–—]/g, "-").replace(/,/g, ".").replace(/√/g, "sqrt").replace(/[()]/g, function (c) { return c; });
    if (!s) return null;
    s = s.replace(/^\((.*)\)$/, "$1");
    var im = /i$/.test(s), cuerpo = im ? s.slice(0, -1) : s, corte = -1, nivel = 0;
    for (var k = cuerpo.length - 1; k > 0; k--) {
      var ch = cuerpo.charAt(k);
      if (ch === ")") nivel++; else if (ch === "(") nivel--;
      if (nivel === 0 && (ch === "+" || ch === "-") && !/[eE*\/^(]/.test(cuerpo.charAt(k - 1))) { corte = k; break; }
    }
    function num(t, defecto) {
      if (t === "" || t === "+") return defecto;
      if (t === "-") return -defecto;
      var v = B.Mate.numero(t.replace(/\*$/, ""));
      return v;
    }
    var a, b;
    if (!im) { a = num(cuerpo, NaN); b = 0; }
    else if (corte < 0) { a = 0; b = num(cuerpo, 1); }
    else { a = num(cuerpo.slice(0, corte), NaN); b = num(cuerpo.slice(corte), 1); }
    if (isNaN(a) || isNaN(b)) return null;
    return z(a, b);
  };

  function campo(host, et, val, ancho, aria) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 120) + 'px" value="' + val + '" aria-label="' + (aria || et.replace(/<[^>]+>/g, "")) + '">';
    host.appendChild(l); return l.querySelector("input");
  }

  // ============================================================
  // POTENCIASI: las potencias de i dan vueltas de 90° en el plano
  // ============================================================
  B.w.potenciasi = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las potencias de i: un ciclo de cuatro");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { n: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Exponente <i>n</i>", min: 0, max: 40, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    var VAL = ["1", "i", "−1", "−i"], PTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    var an = U.animar(ctl, function (t, dt) { if (dt) { st.t = (st.t || 0) + dt; if (st.t > 0.7) { st.t = 0; st.n = (st.n + 1) % 41; sl.set(st.n); pinta(); } } }, { auto: false });
    function pinta() {
      var n = st.n, r = n % 4;
      g.limpiar();
      for (var k = 0; k <= Math.min(n, 40); k++) {
        var p = PTS[k % 4], rad = 0.78 + 0.04 * Math.floor(k / 4);
        if (k === n) g.punto(p[0], p[1], { r: 9, clase: "c-red" }); else g.punto(p[0] * 1, p[1] * 1, { r: 3, clase: "c-faint" });
      }
      g.segmento(0, 0, PTS[r][0], PTS[r][1], { clase: "c-red" }).setAttribute("stroke-width", 3);
      g.arco(0, 0, 0.35, 0, 90 * n, { clase: "c-hl" });
      g.texto(PTS[r][0] * 1.2, PTS[r][1] * 1.2, "i" + U.sup(n) + " = " + VAL[r], { ancla: "middle", dy: 5, clase: "red" });
      lectura.innerHTML = U.lec("n", n) + U.lec("Resto de n entre 4", r, "pen") + U.lec("i" + U.sup(n), VAL[r], "red") + U.lec("Ángulo girado", (90 * n) + "° = " + (n % 4 === 0 ? "" : "") + Math.floor(n / 4) + " vueltas y " + (90 * r) + "°");
      pie.innerHTML = "Multiplicar por i es <b>girar 90°</b>: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, i⁴ = 1 y vuelta a empezar. Por eso, para calcular iⁿ, se divide n entre 4 y se mira el <b>resto</b>: resto 0 → 1; 1 → i; 2 → −1; 3 → −i.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 360, h: 340, limpio: true, etiqueta: "Las potencias de i en el plano complejo" });
    g.rangoIso(0, 0, 1.55);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo", dash: "3 5" });
    g.segmento(-1.45, 0, 1.45, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.45, 0, 1.45, { clase: "c-ink", capa: "fijo" });
    g.texto(1.4, 0, "Re", { dy: -6, ancla: "end", clase: "faint", capa: "fijo" }); g.texto(0, 1.4, "Im", { dx: 8, dy: 4, clase: "faint", capa: "fijo" });
    pinta();
  };

  // ============================================================
  // OPERACIONES: calculadora con pasos
  // ============================================================
  B.w.operaciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora de complejos con los pasos");
    cuerpo.innerHTML = '<div data-op class="chips"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot rd-circ"></div>';
    var st = { op: "mul", p: "3+2i", q: "1-4i", n: 3 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var iP = campo(ctl, "z₁ =", st.p, 130), iQ = campo(ctl, "z₂ =", st.q, 130), iN = campo(ctl, "n =", "3", 50);
    var PRES = [["3+2i", "1-4i"], ["3+2i", "1-i"], ["1+i", "1-i"], ["2-3i", "-1+i"], ["i", "i"]];
    var lblQ = iQ.closest("label"), lblN = iN.closest("label");
    function T(p) { return "(" + C.txt(p) + ")"; }
    function pinta() {
      var p = C.leer(st.p), q = C.leer(st.q), n = Math.round(parseFloat(String(iN.value).replace(",", ".")));
      lblQ.style.display = st.op === "pot" || st.op === "conj" ? "none" : ""; lblN.style.display = st.op === "pot" ? "" : "none";
      if (!p || (!q && st.op !== "pot" && st.op !== "conj")) { lectura.innerHTML = U.lec("Revisa lo que has escrito", "usa la forma a + bi, por ejemplo 3-2i, 5i, −1 o 1/2+i", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
      var res, h = "<ol class='w-ol'>", sig = st.op === "res" ? -1 : 1;
      if (st.op === "suma" || st.op === "res") {
        res = sig > 0 ? C.suma(p, q) : C.resta(p, q);
        h += "<li>Se operan por separado las partes reales y las imaginarias: " + T(p) + (sig > 0 ? " + " : " − ") + T(q) + " = (" + fmt(p.a, 3) + (sig > 0 ? " + " : " − ") + (q.a < 0 ? "(" + fmt(q.a, 3) + ")" : fmt(q.a, 3)) + ") + (" + fmt(p.b, 3) + (sig > 0 ? " + " : " − ") + (q.b < 0 ? "(" + fmt(q.b, 3) + ")" : fmt(q.b, 3)) + ")i.</li><li>Resultado: <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "mul") {
        res = C.mul(p, q);
        h += "<li>Distributiva: (a + bi)(c + di) = ac + adi + bci + bdi².</li><li>Con a = " + fmt(p.a, 3) + ", b = " + fmt(p.b, 3) + ", c = " + fmt(q.a, 3) + ", d = " + fmt(q.b, 3) + ": parte real = ac − bd = " + fmt(p.a * q.a, 3) + " − (" + fmt(p.b * q.b, 3) + ") = " + fmt(p.a * q.a - p.b * q.b, 3) + " (se usó i² = −1) y parte imaginaria = ad + bc = " + fmt(p.a * q.b, 3) + " + " + fmt(p.b * q.a, 3) + " = " + fmt(p.a * q.b + p.b * q.a, 3) + ".</li><li>Resultado: <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "div") {
        if (q.a === 0 && q.b === 0) { lectura.innerHTML = U.lec("Error", "no se puede dividir entre 0", "red"); pasos.innerHTML = ""; return; }
        res = C.div(p, q); var d = q.a * q.a + q.b * q.b, num = C.mul(p, C.conj(q));
        h += "<li>Se multiplica numerador y denominador por el <b>conjugado</b> del denominador, " + T(C.conj(q)) + ".</li><li>Denominador: " + T(q) + T(C.conj(q)) + " = c² + d² = " + fmt(q.a * q.a, 3) + " + " + fmt(q.b * q.b, 3) + " = <b>" + fmt(d, 3) + "</b> (¡un número real!).</li><li>Numerador: " + T(p) + T(C.conj(q)) + " = " + C.txt(num) + ".</li><li>Resultado: (" + C.txt(num) + ")/" + fmt(d, 3) + " = <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "conj") {
        res = C.conj(p);
        h += "<li>El conjugado cambia el signo de la parte imaginaria: <b>" + C.txt(res) + "</b>.</li><li>Además z·z̄ = a² + b² = " + fmt(p.a * p.a + p.b * p.b, 3) + " = |z|² y z + z̄ = 2a = " + fmt(2 * p.a, 3) + ".</li>";
      } else {
        if (!(n >= 0 && n <= 8)) { lectura.innerHTML = U.lec("Revisa", "usa un exponente entero entre 0 y 8", "red"); pasos.innerHTML = ""; return; }
        res = z(1, 0); var cur = z(1, 0), tr = [C.txt(cur)];
        for (var k = 0; k < n; k++) { cur = C.mul(cur, p); tr.push(C.txt(cur)); }
        res = cur;
        h += "<li>Se multiplica z por sí mismo " + n + " veces (o se usa la forma polar con De Moivre, que es más rápido): " + tr.map(function (t, i) { return "z" + U.sup(i) + " = " + t; }).join("; ") + ".</li><li>Resultado: <b>z" + U.sup(n) + " = " + C.txt(res) + "</b>.</li>";
      }
      h += "</ol>";
      pasos.innerHTML = h;
      lectura.innerHTML = U.lec("Resultado (binómica)", C.txt(res), "ok") + U.lec("Resultado (polar)", C.txtPolar(res), "pen") + U.lec("Módulo", fmt(C.mod(res), 4)) + U.lec("Argumento", fmt(C.arg(res), 2) + "°");
      g.limpiar();
      var m = Math.max(3, Math.abs(p.a), Math.abs(p.b), Math.abs(res.a), Math.abs(res.b), q ? Math.abs(q.a) : 0, q ? Math.abs(q.b) : 0) * 1.25;
      g.rangoIso(0, 0, m);
      function vec(w, cl, et) { U.flecha(g, 0, 0, w.a, w.b, { clase: cl }); g.texto(w.a, w.b, et, { dx: 6, dy: -6, clase: cl === "c-pen" ? "pen" : cl === "c-red" ? "red" : "ok" }); }
      vec(p, "c-pen", "z₁"); if (q && st.op !== "pot" && st.op !== "conj") vec(q, "c-red", "z₂"); vec(res, "c-ok", "resultado");
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 420, h: 360, etx: "Re", ety: "Im", etiqueta: "Los números y el resultado en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-op]"), [{ k: "suma", t: "z₁ + z₂" }, { k: "res", t: "z₁ − z₂" }, { k: "mul", t: "z₁ · z₂" }, { k: "div", t: "z₁ / z₂" }, { k: "conj", t: "conjugado" }, { k: "pot", t: "potencia zⁿ" }], st.op, function (k) { st.op = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRES.map(function (p, i) { return { k: String(i), t: p[0].replace("-", "−") + " y " + p[1].replace("-", "−") }; }), "", function (k) { st.p = PRES[+k][0]; st.q = PRES[+k][1]; iP.value = st.p; iQ.value = st.q; pinta(); });
    iP.addEventListener("input", function () { st.p = iP.value; pinta(); }); iQ.addEventListener("input", function () { st.q = iQ.value; pinta(); }); iN.addEventListener("input", pinta);
    pinta();
  };

  // ============================================================
  // PLANO: arrastra dos números y mira suma, producto y cociente
  // ============================================================
  B.w.plano = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Plano complejo: arrastra z₁ y z₂");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "mul", p: z(2, 1), q: z(1, 2) }, g, h1, h2, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function ajusta(v) { return Math.round(v * 10) / 10; }
    function pinta() {
      var p = st.p, q = st.q, m = st.modo, res;
      if (m === "suma") res = C.suma(p, q); else if (m === "mul") res = C.mul(p, q); else if (m === "div") res = C.mod(q) < 1e-9 ? z(0, 0) : C.div(p, q); else res = C.conj(p);
      var grande = Math.max(Math.abs(res.a), Math.abs(res.b), Math.abs(p.a), Math.abs(p.b), Math.abs(q.a), Math.abs(q.b));
      g.rangoIso(0, 0, Math.max(4.4, Math.ceil(grande * 1.25 / 2) * 2));
      g.limpiar();
      g.mover(h1, p.a, p.b); g.mover(h2, q.a, q.b);
      // vectores desde el origen
      U.flecha(g, 0, 0, p.a, p.b, { clase: "c-pen" });
      if (m !== "conj") U.flecha(g, 0, 0, q.a, q.b, { clase: "c-red" });
      if (m === "suma") { g.segmento(p.a, p.b, res.a, res.b, { clase: "c-red", dash: "4 4" }); g.segmento(q.a, q.b, res.a, res.b, { clase: "c-pen", dash: "4 4" }); }
      U.flecha(g, 0, 0, res.a, res.b, { clase: "c-ok" });
      g.texto(res.a, res.b, m === "suma" ? "z₁+z₂" : m === "mul" ? "z₁·z₂" : m === "div" ? "z₁/z₂" : "z̄₁", { dx: 8, dy: -8, clase: "ok" });
      if (m === "mul" || m === "div") { g.arco(0, 0, 0.7, 0, C.arg(p), { clase: "c-pen" }); g.arco(0, 0, 0.9, 0, C.arg(q), { clase: "c-red" }); g.arco(0, 0, 1.1, 0, C.arg(res), { clase: "c-ok" }); }
      lectura.innerHTML = U.lec("z₁", C.txt(p, 2) + "  =  " + C.txtPolar(p, 2), "pen") + (m !== "conj" ? U.lec("z₂", C.txt(q, 2) + "  =  " + C.txtPolar(q, 2), "red") : "") +
        U.lec(m === "suma" ? "z₁ + z₂" : m === "mul" ? "z₁ · z₂" : m === "div" ? "z₁ / z₂" : "conjugado de z₁", C.txt(res, 2) + "  =  " + C.txtPolar(res, 2), "ok") +
        (m === "mul" ? U.lec("Comprobación", "|z₁|·|z₂| = " + fmt(C.mod(p) * C.mod(q), 2) + " · θ₁ + θ₂ = " + fmt((C.arg(p) + C.arg(q)) % 360, 1) + "°") : m === "div" ? U.lec("Comprobación", "|z₁|/|z₂| = " + fmt(C.mod(p) / C.mod(q), 2) + " · θ₁ − θ₂ = " + fmt(((C.arg(p) - C.arg(q)) % 360 + 360) % 360, 1) + "°") : "");
      pie.innerHTML = m === "suma" ? "La suma es la <b>diagonal del paralelogramo</b> que forman z₁ y z₂ (como la suma de vectores)." : m === "mul" ? "Al multiplicar, <b>los módulos se multiplican y los argumentos se suman</b>: z₁·z₂ es z₁ girado el ángulo de z₂ y estirado |z₂| veces. Mira cómo el arco verde (resultado) es la suma de los arcos azul y rojo." : m === "div" ? "Al dividir, <b>los módulos se dividen y los argumentos se restan</b>: z₁/z₂ es z₁ girado hacia atrás el ángulo de z₂ y encogido |z₂| veces." : "El conjugado es el <b>reflejo respecto del eje real</b>: mismo módulo, argumento opuesto.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 640, h: 380, etx: "Re", ety: "Im", etiqueta: "Plano complejo con z₁ y z₂ arrastrables" });
    g.rangoIso(0, 0, 4.4);
    h1 = g.punto(0, 0, { capa: "top", r: 9, clase: "c-pen" }); h2 = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
    g.arrastrar(h1, function (x, y, tecla) { if (tecla) return; st.p = z(ajusta(Math.max(-8, Math.min(8, x))), ajusta(Math.max(-8, Math.min(8, y)))); pinta(); }, { get: function () { return st.p.a; }, paso: 0.5, etiqueta: "Número z₁" });
    g.arrastrar(h2, function (x, y, tecla) { if (tecla) return; st.q = z(ajusta(Math.max(-8, Math.min(8, x))), ajusta(Math.max(-8, Math.min(8, y)))); pinta(); }, { get: function () { return st.q.a; }, paso: 0.5, etiqueta: "Número z₂" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "Suma" }, { k: "mul", t: "Producto" }, { k: "div", t: "Cociente" }, { k: "conj", t: "Conjugado" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // CONVERSOR: binómica ⇄ polar con el razonamiento del cuadrante
  // ============================================================
  B.w.conversor = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Conversor binómica ⇄ polar");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot rd-circ"></div>';
    var st = { modo: "bp" }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var iZ = campo(ctl, "z =", "-1+i", 150), iR = campo(ctl, "módulo r =", "2", 70), iT = campo(ctl, "ángulo θ (°) =", "150", 70);
    var lz = iZ.closest("label"), lr = iR.closest("label"), lt = iT.closest("label");
    var PRE = { bp: ["-1+i", "-sqrt(3)-i", "-2i", "3", "1+i", "3-4i", "4-4sqrt(3)i"], pb: [["2", "30"], ["4", "60"], ["3", "150"], ["1", "225"], ["5", "300"], ["2", "90"]] };
    function pinta() {
      lz.style.display = st.modo === "bp" ? "" : "none"; lr.style.display = lt.style.display = st.modo === "pb" ? "" : "none";
      var p, h = "<ol class='w-ol'>";
      if (st.modo === "bp") {
        p = C.leer(iZ.value);
        if (!p || (p.a === 0 && p.b === 0)) { lectura.innerHTML = U.lec("Revisa", "escribe un complejo distinto de 0, por ejemplo -1+i", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
        var r = C.mod(p), t = C.arg(p), ref = Math.atan(Math.abs(p.b) / Math.abs(p.a || 1e-12)) / R;
        var cu = p.a > 0 && p.b > 0 ? 1 : p.a < 0 && p.b > 0 ? 2 : p.a < 0 && p.b < 0 ? 3 : p.a > 0 && p.b < 0 ? 4 : 0;
        h += "<li>Módulo: |z| = √(a² + b²) = √(" + fmt(p.a * p.a, 3) + " + " + fmt(p.b * p.b, 3) + ") = √" + fmt(p.a * p.a + p.b * p.b, 3) + " = <b>" + fmt(r, 4) + "</b>.</li>";
        if (cu) h += "<li>El afijo (" + fmt(p.a, 3) + ", " + fmt(p.b, 3) + ") está en el <b>" + cu + ".º cuadrante</b>. El ángulo de referencia es arctan(|b|/|a|) = arctan(" + fmt(Math.abs(p.b / p.a), 4) + ") = " + fmt(ref, 2) + "°.</li><li>Argumento: " + ({ 1: "θ = " + fmt(ref, 2) + "°", 2: "θ = 180° − " + fmt(ref, 2) + "° = " + fmt(180 - ref, 2) + "°", 3: "θ = 180° + " + fmt(ref, 2) + "° = " + fmt(180 + ref, 2) + "°", 4: "θ = 360° − " + fmt(ref, 2) + "° = " + fmt(360 - ref, 2) + "°" }[cu]) + ".</li>";
        else h += "<li>El afijo está sobre un eje: el argumento se lee directamente (0° en el eje real positivo, 90° en el imaginario positivo, 180° en el real negativo, 270° en el imaginario negativo): <b>" + fmt(t, 2) + "°</b>.</li>";
        h += "<li>Forma polar: <b>z = " + fmt(r, 3) + "<sub>" + fmt(t, 2) + "°</sub></b> = " + fmt(r, 3) + "·(cos " + fmt(t, 2) + "° + i·sen " + fmt(t, 2) + "°).</li>";
        lectura.innerHTML = U.lec("Módulo", fmt(r, 4), "pen") + U.lec("Argumento", fmt(t, 3) + "°", "red") + U.lec("Forma polar", C.txtPolar(p, 3), "ok");
      } else {
        var rr = B.Mate.numero(iR.value), tt = B.Mate.numero(iT.value);
        if (isNaN(rr) || isNaN(tt) || rr < 0) { lectura.innerHTML = U.lec("Revisa", "el módulo debe ser ≥ 0 y el ángulo un número", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
        p = C.polar(rr, tt);
        h += "<li>Parte real: a = r·cos θ = " + fmt(rr, 3) + "·cos " + fmt(tt, 3) + "° = " + fmt(rr, 3) + "·" + fmt(Math.cos(tt * R), 4) + " = <b>" + fmt(p.a, 4) + "</b>.</li><li>Parte imaginaria: b = r·sen θ = " + fmt(rr, 3) + "·sen " + fmt(tt, 3) + "° = " + fmt(rr, 3) + "·" + fmt(Math.sin(tt * R), 4) + " = <b>" + fmt(p.b, 4) + "</b>.</li><li>Forma binómica: <b>z = " + C.txt(p, 4) + "</b>.</li>";
        lectura.innerHTML = U.lec("Parte real", fmt(p.a, 4), "pen") + U.lec("Parte imaginaria", fmt(p.b, 4), "red") + U.lec("Forma binómica", C.txt(p, 4), "ok");
      }
      pasos.innerHTML = h + "</ol>";
      g.limpiar();
      var m = Math.max(1.5, Math.abs(p.a), Math.abs(p.b)) * 1.3; g.rangoIso(0, 0, m);
      g.arco(0, 0, C.mod(p), 0, 360, { clase: "c-faint", dash: "3 5" });
      g.segmento(p.a, 0, p.a, p.b, { clase: "c-red", dash: "4 3" }); g.segmento(0, p.b, p.a, p.b, { clase: "c-pen", dash: "4 3" });
      U.flecha(g, 0, 0, p.a, p.b, { clase: "c-ok" }); g.punto(p.a, p.b, { r: 6, clase: "c-ok" });
      g.arco(0, 0, Math.min(0.4 * C.mod(p), 0.8), 0, C.arg(p), { clase: "c-hl" });
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, w: 420, h: 360, etx: "Re", ety: "Im", etiqueta: "El afijo en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "bp", t: "binómica → polar" }, { k: "pb", t: "polar → binómica" }], st.modo, function (k) { st.modo = k; armaPre(); pinta(); });
    function armaPre() {
      var arr = PRE[st.modo];
      U.fichas(cuerpo.querySelector("[data-pre]"), arr.map(function (v, i) { return { k: String(i), t: st.modo === "bp" ? v.replace("sqrt(3)", "√3").replace("-", "−") : v[0] + "_" + v[1] + "°" }; }), "", function (k) {
        if (st.modo === "bp") iZ.value = arr[+k]; else { iR.value = arr[+k][0]; iT.value = arr[+k][1]; } pinta();
      });
    }
    iZ.addEventListener("input", pinta); iR.addEventListener("input", pinta); iT.addEventListener("input", pinta);
    armaPre(); pinta();
  };

  // ============================================================
  // RAICES: raíces n-ésimas, un polígono regular
  // ============================================================
  B.w.raices = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Raíces n-ésimas de un complejo");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div>';
    var st = { n: 3, r: 8, t: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var sN = U.slider(ctl, { et: "Índice <i>n</i>", min: 2, max: 12, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    var sR = U.slider(ctl, { et: "Módulo de <i>w</i>", min: 1, max: 32, step: 1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: String });
    var sT = U.slider(ctl, { et: "Argumento de <i>w</i>", min: 0, max: 359, step: 1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var n = st.n, rs = C.raices(st.r, st.t, n), rad = rs[0].r, w = C.polar(st.r, st.t);
      g.limpiar();
      var m = Math.max(rad, 1) * 1.45; g.rangoIso(0, 0, m);
      g.arco(0, 0, rad, 0, 360, { clase: "c-faint", dash: "3 5" });
      var pts = rs.map(function (q) { var c = C.polar(q.r, q.t); return [c.a, c.b]; });
      g.poligono(pts, { clase: "z-pen", borde: "var(--pen)" });
      pts.forEach(function (c, k) { g.segmento(0, 0, c[0], c[1], { clase: "c-faint", dash: "2 4" }); g.punto(c[0], c[1], { r: 6, clase: "c-red" }); if (n <= 8) g.texto(c[0], c[1], "z" + U.sub(k), { dx: 8, dy: -6, clase: "red" }); });
      var wm = Math.min(C.mod(w), m * 0.97), wk = wm / (C.mod(w) || 1); g.punto(w.a * wk, w.b * wk, { r: 6, clase: "c-ok" }); g.texto(w.a * wk, w.b * wk, "w", { dx: 8, dy: -6, clase: "ok" });
      var lado = 2 * rad * Math.sin(Math.PI / n);
      lectura.innerHTML = U.lec("Número w", fmt(st.r, 0) + "<sub>" + st.t + "°</sub>", "ok") + U.lec("Módulo de las raíces ⁿ√r", fmt(rad, 4), "pen") + U.lec("Separación entre raíces", fmt(360 / n, 2) + "°", "red") + U.lec("Lado del polígono", fmt(lado, 4));
      pasos.innerHTML = "<ol class='w-ol'><li>Las <b>" + n + " raíces " + n + "-ésimas</b> de w = " + st.r + "<sub>" + st.t + "°</sub> tienen módulo ⁿ√r = " + fmt(rad, 4) + " y argumentos (θ + 360°·k)/n, para k = 0, 1, …, " + (n - 1) + ".</li><li>" + rs.slice(0, 8).map(function (q, k) { var c = C.polar(q.r, q.t); return "k = " + k + ": " + fmt(q.r, 3) + "<sub>" + fmt(q.t, 2) + "°</sub> = " + C.txt(c, 3); }).join("<br>") + (n > 8 ? "<br>…" : "") + "</li><li>Están sobre una circunferencia y forman un <b>polígono regular de " + n + " lados</b>: cada raíz es la anterior girada " + fmt(360 / n, 2) + "°.</li></ol>";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Las raíces n-ésimas forman un polígono regular" });
    var PRE = [[3, 8, 0, "∛8"], [2, 4, 180, "√(−4)"], [4, 16, 180, "⁴√(−16)"], [6, 1, 0, "⁶√1"], [5, 1, 0, "⁵√1"], [3, 27, 90, "∛(27i)"]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[3] }; }), "", function (k) { var p = PRE[+k]; st.n = p[0]; st.r = p[1]; st.t = p[2]; sN.set(p[0]); sR.set(p[1]); sT.set(p[2]); pinta(); });
    pinta();
  };

  // ============================================================
  // LUGAR: curvas y regiones del plano descritas con complejos
  // ============================================================
  B.w.lugar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Lugares geométricos con números complejos");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "circ", cx: 1, cy: 2, r: 2, k: 2, al: 45, ax: -2, ay: 0, bx: 2, by: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var S = {};
    function sl(k, et, mn, mx, stp) { S[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    sl("cx", "Centro (Re)", -4, 4, 0.5); sl("cy", "Centro (Im)", -4, 4, 0.5); sl("r", "Radio", 0.5, 5, 0.5); sl("k", "Valor k", -4, 4, 0.5); sl("al", "Ángulo α", 0, 360, 15);
    sl("ax", "a (Re)", -4, 4, 0.5); sl("ay", "a (Im)", -4, 4, 0.5); sl("bx", "b (Re)", -4, 4, 0.5); sl("by", "b (Im)", -4, 4, 0.5);
    var MOSTRAR = { circ: ["cx", "cy", "r"], re: ["k"], im: ["k"], arg: ["al"], med: ["ax", "ay", "bx", "by"] };
    function pinta() {
      Object.keys(S).forEach(function (k) { S[k].el.style.display = MOSTRAR[st.modo].indexOf(k) >= 0 ? "" : "none"; });
      g.limpiar();
      var txt, cart, desc;
      if (st.modo === "circ") {
        g.arco(st.cx, st.cy, st.r, 0, 360, { clase: "c-red" }).setAttribute("stroke-width", 3); g.punto(st.cx, st.cy, { r: 5, clase: "c-pen" }); g.texto(st.cx, st.cy, "c", { dx: 7, dy: -7, clase: "pen" });
        txt = "|z − (" + C.txt(z(st.cx, st.cy), 1) + ")| = " + fmt(st.r, 1); cart = "(x " + (st.cx > 0 ? "− " + fmt(st.cx, 1) : st.cx < 0 ? "+ " + fmt(-st.cx, 1) : "") + ")² + (y " + (st.cy > 0 ? "− " + fmt(st.cy, 1) : st.cy < 0 ? "+ " + fmt(-st.cy, 1) : "") + ")² = " + fmt(st.r * st.r, 2); desc = "Circunferencia de centro c y radio r: los puntos a distancia r de c.";
      } else if (st.modo === "re") { g.segmento(st.k, -8, st.k, 8, { clase: "c-red" }).setAttribute("stroke-width", 3); txt = "Re(z) = " + fmt(st.k, 1); cart = "x = " + fmt(st.k, 1); desc = "Recta vertical: todos los complejos con la misma parte real."; }
      else if (st.modo === "im") { g.segmento(-8, st.k, 8, st.k, { clase: "c-red" }).setAttribute("stroke-width", 3); txt = "Im(z) = " + fmt(st.k, 1); cart = "y = " + fmt(st.k, 1); desc = "Recta horizontal: todos los complejos con la misma parte imaginaria."; }
      else if (st.modo === "arg") { var a = st.al * R; g.segmento(0, 0, 9 * Math.cos(a), 9 * Math.sin(a), { clase: "c-red" }).setAttribute("stroke-width", 3); g.arco(0, 0, 0.9, 0, st.al, { clase: "c-hl" }); txt = "arg(z) = " + st.al + "°"; cart = Math.abs(Math.cos(a)) < 1e-9 ? "x = 0, y > 0 o y < 0 según α" : "y = " + fmt(Math.tan(a), 3) + "·x  (con x " + (Math.cos(a) > 0 ? "> 0" : "< 0") + ")"; desc = "Semirrecta que sale del origen con el ángulo α (el origen no cuenta: su argumento no está definido)."; }
      else {
        var A = z(st.ax, st.ay), Bq = z(st.bx, st.by), mx = (A.a + Bq.a) / 2, my = (A.b + Bq.b) / 2, dx = Bq.a - A.a, dy = Bq.b - A.b;
        if (dx === 0 && dy === 0) { lectura.innerHTML = U.lec("Los dos puntos coinciden", "elige a ≠ b", "red"); return; }
        g.punto(A.a, A.b, { r: 6, clase: "c-pen" }); g.texto(A.a, A.b, "a", { dx: 7, dy: -7, clase: "pen" }); g.punto(Bq.a, Bq.b, { r: 6, clase: "c-pen" }); g.texto(Bq.a, Bq.b, "b", { dx: 7, dy: -7, clase: "pen" });
        g.segmento(A.a, A.b, Bq.a, Bq.b, { clase: "c-faint", dash: "3 4" }); g.punto(mx, my, { r: 4, clase: "c-ok" });
        g.segmento(mx - 9 * dy, my + 9 * dx, mx + 9 * dy, my - 9 * dx, { clase: "c-red" }).setAttribute("stroke-width", 3);
        txt = "|z − a| = |z − b|"; cart = fmt(2 * dx, 1) + "·x + " + fmt(2 * dy, 1) + "·y = " + fmt(Bq.a * Bq.a + Bq.b * Bq.b - A.a * A.a - A.b * A.b, 1); desc = "Mediatriz del segmento ab: los puntos que equidistan de a y de b.";
      }
      var m = 5.5; g.rangoIso(0, 0, m);
      lectura.innerHTML = U.lec("Condición", txt, "ok") + U.lec("En coordenadas (z = x + yi)", cart, "pen") + U.lec("Qué dibuja", desc);
      pie.innerHTML = "Una condición sobre el módulo, la parte real, la parte imaginaria o el argumento de z describe una figura del plano. Escribiendo z = x + yi y operando, se obtiene su ecuación cartesiana.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Lugar geométrico en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "circ", t: "|z − c| = r" }, { k: "re", t: "Re z = k" }, { k: "im", t: "Im z = k" }, { k: "arg", t: "arg z = α" }, { k: "med", t: "|z − a| = |z − b|" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // MANDELBROT: z → z² + c, un fractal con complejos
  // ============================================================
  B.w.mandelbrot = function (host) {
    var cuerpo = B.caja(host, "Curiosidad", "El conjunto de Mandelbrot: z → z² + c");
    cuerpo.innerHTML = '<div class="mb-fila"><canvas class="mb-cv" width="360" height="270" role="img" aria-label="Conjunto de Mandelbrot: toca un punto para ver su órbita"></canvas><div class="w-plot mb-orb"></div></div><div class="lectura"></div><p class="w-pie"></p>';
    var cv = cuerpo.querySelector("canvas"), ctx = cv.getContext && cv.getContext("2d"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var X0 = -2.2, X1 = 0.8, Y0 = -1.125, Y1 = 1.125, MAXI = 60, st = { c: z(-0.2, 0.5) }, g;
    function iter(c, max) { var zz = z(0, 0), i = 0; while (i < max && zz.a * zz.a + zz.b * zz.b <= 4) { zz = z(zz.a * zz.a - zz.b * zz.b + c.a, 2 * zz.a * zz.b + c.b); i++; } return i; }
    function dibuja() {
      if (!ctx) return;
      var w = cv.width, h = cv.height, img = ctx.createImageData(w, h);
      for (var py = 0; py < h; py++) for (var px = 0; px < w; px++) {
        var c = z(X0 + (X1 - X0) * px / w, Y1 - (Y1 - Y0) * py / h), n = iter(c, MAXI), o = (py * w + px) * 4;
        if (n >= MAXI) { img.data[o] = 20; img.data[o + 1] = 24; img.data[o + 2] = 50; } else { var t = n / MAXI; img.data[o] = 240 * Math.min(1, t * 4); img.data[o + 1] = 200 * Math.min(1, t * 3); img.data[o + 2] = 120 + 135 * (1 - t); }
        img.data[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
    function marca() {
      if (!ctx) return;
      var px = (st.c.a - X0) / (X1 - X0) * cv.width, py = (Y1 - st.c.b) / (Y1 - Y0) * cv.height;
      ctx.beginPath(); ctx.arc(px, py, 6, 0, 2 * Math.PI); ctx.fillStyle = "#e0245e"; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    }
    function pinta() {
      dibuja(); marca();
      var zz = z(0, 0), orb = [zz], i = 0;
      while (i < 40 && zz.a * zz.a + zz.b * zz.b <= 100) { zz = z(zz.a * zz.a - zz.b * zz.b + st.c.a, 2 * zz.a * zz.b + st.c.b); orb.push(zz); i++; }
      var escapa = zz.a * zz.a + zz.b * zz.b > 4;
      g.limpiar();
      var m = 2.2; g.rangoIso(0, 0, m);
      var pts = orb.map(function (q) { return [Math.max(-9, Math.min(9, q.a)), Math.max(-9, Math.min(9, q.b))]; });
      g.polilinea(pts, { clase: "c-faint" });
      pts.forEach(function (q, k) { g.punto(q[0], q[1], { r: k === 0 ? 5 : 3.5, clase: k === 0 ? "c-ok" : escapa ? "c-red" : "c-pen" }); });
      lectura.innerHTML = U.lec("c elegido", C.txt(st.c, 3), "red") + U.lec("¿La órbita escapa?", escapa ? "sí: tras " + orb.length + " pasos |z| &gt; 2" : "no: se queda cerca del origen (c ∈ conjunto)", escapa ? "red" : "ok") + U.lec("z₁ · z₂ · z₃", orb.slice(1, 4).map(function (q) { return C.txt(q, 2); }).join(" ; "));
      pie.innerHTML = "Se parte de z₀ = 0 y se repite z → z² + c con el complejo c que tocas. Si los valores se mantienen acotados, c pertenece al <b>conjunto de Mandelbrot</b> (la zona oscura); si se escapan hacia infinito, se colorea según la rapidez con que lo hacen. Toda esa belleza sale de multiplicar y sumar números complejos.";
    }
    cv.addEventListener("pointerdown", function (e) {
      var rc = cv.getBoundingClientRect(), px = (e.clientX - rc.left) / rc.width, py = (e.clientY - rc.top) / rc.height;
      st.c = z(Math.round((X0 + (X1 - X0) * px) * 1000) / 1000, Math.round((Y1 - (Y1 - Y0) * py) * 1000) / 1000); pinta();
    });
    g = new B.Plot(cuerpo.querySelector(".mb-orb"), { xmin: -2.5, xmax: 2.5, ymin: -2.2, ymax: 2.2, w: 360, h: 270, etx: "Re", ety: "Im", etiqueta: "Órbita de 0 con la regla z → z² + c" });
    pinta();
  };
})(window);
