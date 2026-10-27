/* ============================================================
   Bachi para Firu · laboratorio de fórmulas trigonométricas (Matemáticas I, tema 5)
   formulas · identidad · ecuaciontrig · amplitud
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, T = B.lab.trig;
  var R = Math.PI / 180;
  function rad(d) { return d * R; }
  function sen(d) { return Math.sin(rad(d)); }
  function cos(d) { return Math.cos(rad(d)); }
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }
  function mod360(d) { return ((d % 360) + 360) % 360; }

  // ============================================================
  // FORMULAS: las fórmulas de suma, diferencia, doble y mitad con números
  // ============================================================
  B.w.formulas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Comprueba las fórmulas con números");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="fo-fila"><div class="w-plot fo-circ"></div><div class="fo-tabla"></div></div><div data-ctl></div><p class="w-pie"></p>';
    var st = { modo: "suma", a: 50, b: 30 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".fo-tabla"), pie = cuerpo.querySelector(".w-pie");
    var sa = U.slider(ctl, { et: "Ángulo <i>a</i>", min: 0, max: 360, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    var sb = U.slider(ctl, { et: "Ángulo <i>b</i>", min: 0, max: 360, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function fila(etq, v, clase, nota) { return "<tr class='" + (clase || "") + "'><th>" + etq + "</th><td>" + fmt(v, 4) + "</td><td>" + (nota || "") + "</td></tr>"; }
    function par(etq1, v1, etq2, v2, malo) {
      var iguales = Math.abs(v1 - v2) < 1e-9;
      return fila(etq1, v1, "izq") + fila(etq2, v2, iguales ? "ok" : "mal", iguales ? "✓ igual" : "≠");
    }
    function punto(ang, clase, etq, rad_) {
      var r = rad_ || 1;
      g.segmento(0, 0, r * cos(ang), r * sen(ang), { clase: clase }).setAttribute("stroke-width", 2.5);
      g.punto(r * cos(ang), r * sen(ang), { r: 5, clase: clase });
      g.texto(1.12 * cos(ang), 1.12 * sen(ang), etq, { ancla: "middle", dy: 4, clase: clase === "c-pen" ? "pen" : clase === "c-red" ? "red" : "ok" });
    }
    function pinta() {
      var a = st.a, b = st.b, m = st.modo, h = "<table class='fo-t'><tbody>";
      sb.el.style.display = (m === "suma" || m === "resta") ? "" : "none";
      g.limpiar();
      if (m === "suma" || m === "resta") {
        var sg = m === "suma" ? 1 : -1, ab = a + sg * b;
        g.arco(0, 0, 0.3, 0, a, { clase: "c-pen" }); g.arco(0, 0, 0.42, a, ab, { clase: "c-red" });
        punto(a, "c-pen", "a"); punto(sg * b + a, "c-ok", "a" + (sg > 0 ? "+" : "−") + "b");
        h += par("sen(a " + (sg > 0 ? "+" : "−") + " b)", sen(ab), "sen a·cos b " + (sg > 0 ? "+" : "−") + " cos a·sen b", sen(a) * cos(b) + sg * cos(a) * sen(b));
        h += par("cos(a " + (sg > 0 ? "+" : "−") + " b)", cos(ab), "cos a·cos b " + (sg > 0 ? "−" : "+") + " sen a·sen b", cos(a) * cos(b) - sg * sen(a) * sen(b));
        if (Math.abs(cos(a) * cos(b)) > 1e-9 && Math.abs(cos(ab)) > 1e-9) {
          var ta = sen(a) / cos(a), tb = sen(b) / cos(b);
          h += par("tan(a " + (sg > 0 ? "+" : "−") + " b)", sen(ab) / cos(ab), "(tan a " + (sg > 0 ? "+" : "−") + " tan b)/(1 " + (sg > 0 ? "−" : "+") + " tan a·tan b)", (ta + sg * tb) / (1 - sg * ta * tb));
        }
        h += fila("Error típico: sen a " + (sg > 0 ? "+" : "−") + " sen b", sen(a) + sg * sen(b), Math.abs(sen(a) + sg * sen(b) - sen(ab)) < 1e-9 ? "ok" : "mal", Math.abs(sen(a) + sg * sen(b) - sen(ab)) < 1e-9 ? "(coincide por casualidad)" : "✗ no vale");
        pie.innerHTML = "Las fórmulas se cumplen para <b>cualquier</b> par de ángulos (muévelos). En cambio, «sen(a + b) = sen a + sen b» <b>casi nunca</b> es cierto: sólo coincide por casualidad en algunos valores sueltos.";
      } else if (m === "doble") {
        g.arco(0, 0, 0.3, 0, a, { clase: "c-pen" }); g.arco(0, 0, 0.42, 0, 2 * a, { clase: "c-red" });
        punto(a, "c-pen", "a"); punto(2 * a, "c-ok", "2a");
        h += par("sen 2a", sen(2 * a), "2·sen a·cos a", 2 * sen(a) * cos(a));
        h += par("cos 2a", cos(2 * a), "cos²a − sen²a", cos(a) * cos(a) - sen(a) * sen(a));
        h += par("cos 2a", cos(2 * a), "2·cos²a − 1", 2 * cos(a) * cos(a) - 1);
        h += par("cos 2a", cos(2 * a), "1 − 2·sen²a", 1 - 2 * sen(a) * sen(a));
        if (Math.abs(cos(2 * a)) > 1e-9 && Math.abs(cos(a)) > 1e-9) h += par("tan 2a", sen(2 * a) / cos(2 * a), "2·tan a/(1 − tan²a)", 2 * (sen(a) / cos(a)) / (1 - Math.pow(sen(a) / cos(a), 2)));
        h += fila("Error típico: 2·sen a", 2 * sen(a), Math.abs(2 * sen(a) - sen(2 * a)) < 1e-9 ? "ok" : "mal", Math.abs(2 * sen(a) - sen(2 * a)) < 1e-9 ? "(casualidad)" : "✗ no vale");
        pie.innerHTML = "Las tres formas de cos 2a son <b>la misma</b> expresión escrita de tres maneras (se pasa de una a otra con sen²a + cos²a = 1). Elige la que use el dato que te dan.";
      } else {
        var cu = Math.floor(mod360(a / 2) / 90) + 1, sS = mod360(a / 2) < 180 ? 1 : -1, sC = (mod360(a / 2) < 90 || mod360(a / 2) > 270) ? 1 : -1;
        g.arco(0, 0, 0.3, 0, a / 2, { clase: "c-pen" }); g.arco(0, 0, 0.42, 0, a, { clase: "c-red" });
        punto(a / 2, "c-pen", "a/2"); punto(a, "c-ok", "a");
        h += par("sen(a/2)", sen(a / 2), (sS > 0 ? "+" : "−") + "√((1 − cos a)/2)", sS * Math.sqrt((1 - cos(a)) / 2));
        h += par("cos(a/2)", cos(a / 2), (sC > 0 ? "+" : "−") + "√((1 + cos a)/2)", sC * Math.sqrt((1 + cos(a)) / 2));
        h += fila("Signo elegido", 0, "izq", "a/2 está en el " + (cu > 4 ? 4 : cu) + ".º cuadrante: sen " + (sS > 0 ? "+" : "−") + ", cos " + (sC > 0 ? "+" : "−"));
        h += fila("Error típico: sen a / 2", sen(a) / 2, Math.abs(sen(a) / 2 - sen(a / 2)) < 1e-9 ? "ok" : "mal", Math.abs(sen(a) / 2 - sen(a / 2)) < 1e-9 ? "(casualidad)" : "✗ no vale");
        pie.innerHTML = "En las fórmulas del ángulo mitad el signo ± <b>no se elige a capricho</b>: lo decide el cuadrante en el que cae <b>a/2</b>. Con a entre 0° y 360°, a/2 está siempre entre 0° y 180°, así que sen(a/2) es siempre positivo y cos(a/2) cambia de signo en a = 180°.";
      }
      tabla.innerHTML = h + "</tbody></table>";
    }
    g = new B.Plot(cuerpo.querySelector(".fo-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 340, h: 340, limpio: true, etiqueta: "Los ángulos sobre la circunferencia" });
    g.rangoIso(0, 0, 1.45);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo" });
    g.segmento(-1.4, 0, 1.4, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.4, 0, 1.4, { clase: "c-ink", capa: "fijo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "Suma a + b" }, { k: "resta", t: "Diferencia a − b" }, { k: "doble", t: "Ángulo doble" }, { k: "mitad", t: "Ángulo mitad" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // IDENTIDAD: ¿son iguales dos expresiones? (con gráficas)
  // ============================================================
  B.w.identidad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Identidad o ecuación? Compara dos expresiones");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["sen(2x)", "2 sen(x) cos(x)", "sen 2x = 2 sen x cos x"], ["cos(2x)", "2cos(x)^2-1", "cos 2x = 2cos²x − 1"], ["sen(x+pi/2)", "cos(x)", "sen(x + 90°) = cos x"], ["tan(x)+1/tan(x)", "2/sen(2x)", "tan x + cotan x = 2/sen 2x"], ["sen(x)/(1+cos(x))", "(1-cos(x))/sen(x)", "sen x/(1+cos x) = (1−cos x)/sen x"], ["sen(2x)", "2 sen(x)", "sen 2x = 2 sen x (¡falso!)"], ["sen(x+pi/3)", "sen(x)+sen(pi/3)", "sen(x + 60°) = sen x + sen 60° (¡falso!)"], ["sen(x)", "cos(x)", "sen x = cos x (sólo una ecuación)"]];
    var st = { f: PRE[0][0], g: PRE[0][1] }, grf;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function campo(et, val, ancho) {
      var l = document.createElement("label"); l.className = "bx-campo";
      l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + ancho + 'px" value="' + val + '" aria-label="' + et + '">'; ctl.appendChild(l); return l.querySelector("input");
    }
    var iF = campo("Izquierda", st.f, 190), iG = campo("Derecha", st.g, 190);
    function pinta() {
      var f = B.Mate.compilar(st.f), gg = B.Mate.compilar(st.g);
      if (!f.ok || !gg.ok) { lectura.innerHTML = U.lec("Revisa lo que has escrito", f.ok ? gg.error : f.error, "red"); grf.limpiar(); return; }
      var N = 720, iguales = 0, total = 0, maxd = 0, pts = [], vals = [];
      for (var i = 1; i < N; i++) {
        var x = 2 * Math.PI * i / N, a, b;
        try { a = f.f(x); b = gg.f(x); } catch (e) { continue; }
        if (!isFinite(a) || !isFinite(b) || Math.abs(a) > 1e6 || Math.abs(b) > 1e6) continue;
        total++;
        var d = Math.abs(a - b), esc = Math.max(1, Math.abs(a), Math.abs(b));
        if (d / esc < 1e-8) { iguales++; if (pts.length < 8 && (!pts.length || Math.abs(pts[pts.length - 1] - x) > 0.3)) pts.push(x); }
        maxd = Math.max(maxd, d / esc);
        if (Math.abs(a) < 6) vals.push(a); if (Math.abs(b) < 6) vals.push(b);
      }
      var veredicto, cl;
      if (total < 10) { veredicto = "no hay puntos para comparar"; cl = "red"; }
      else if (iguales === total) { veredicto = "coinciden en los " + total + " puntos probados: parece una <b>identidad</b>"; cl = "ok"; }
      else if (iguales === 0) { veredicto = "no coinciden en ningún punto"; cl = "red"; }
      else { veredicto = "coinciden en " + iguales + " de " + total + " puntos: es una <b>ecuación</b> (sólo se cumple para algunos x)"; cl = "pen"; }
      lectura.innerHTML = U.lec("Resultado de la prueba", veredicto, cl) + U.lec("Mayor diferencia observada", fmt(maxd, 6)) + U.lec("Valores de x donde coinciden (ejemplos, en rad)", iguales && iguales < total ? pts.map(function (p) { return fmt(p, 3); }).join(", ") : iguales === total ? "todos" : "ninguno");
      var mn = Math.min.apply(null, vals.concat([-1])), mx = Math.max.apply(null, vals.concat([1])), pad = (mx - mn) * 0.12;
      grf.rango(0, 2 * Math.PI, mn - pad, mx + pad);
      grf.limpiar();
      [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI].forEach(function (a2, k) { grf.texto(a2, 0, ["0", "π/2", "π", "3π/2", "2π"][k], { dy: 16, dx: k === 4 ? -14 : k === 0 ? 10 : 0, ancla: "middle", clase: "faint" }); });
      grf.curva(f.f, { clase: "c-pen", n: 600 });
      grf.curva(gg.f, { clase: "c-red", dash: "7 5", n: 600 });
      pie.innerHTML = "Curva <b style='color:var(--pen)'>azul</b> = lado izquierdo, <b style='color:var(--red)'>roja discontinua</b> = lado derecho. Si se superponen siempre, es una identidad. <b>Ojo:</b> esta prueba es sólo una <i>comprobación numérica</i>; en un examen hay que <b>demostrar</b> la igualdad con álgebra.";
    }
    grf = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 6.28, ymin: -2, ymax: 2, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "Los dos lados de la igualdad" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.f = PRE[+k][0]; st.g = PRE[+k][1]; iF.value = st.f; iG.value = st.g; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    iG.addEventListener("input", function () { st.g = iG.value; pinta(); });
    pinta();
  };

  // ============================================================
  // ECUACIONTRIG: sen(m·x) = k, cos(m·x) = k, tan(m·x) = k en [0°, 360°)
  // ============================================================
  T.soluciones = function (fn, m, k) {
    var base = [], res = [], n, a;
    if (fn === "sen") { if (Math.abs(k) > 1 + 1e-12) return { base: [], x: [] }; a = Math.asin(Math.max(-1, Math.min(1, k))) / R; base = [a, 180 - a]; }
    else if (fn === "cos") { if (Math.abs(k) > 1 + 1e-12) return { base: [], x: [] }; a = Math.acos(Math.max(-1, Math.min(1, k))) / R; base = [a, -a]; }
    else { a = Math.atan(k) / R; base = [a]; }
    var per = fn === "tan" ? 180 : 360;
    base.forEach(function (b) { for (n = -2 * m - 2; n <= 2 * m + 2; n++) { var x = (b + per * n) / m; x = Math.round(x * 1e8) / 1e8; if (x >= -1e-9 && x < 360 - 1e-9) res.push(Math.abs(x) < 1e-9 ? 0 : x); } });
    res.sort(function (p, q) { return p - q; });
    var u = []; res.forEach(function (x) { if (!u.length || Math.abs(x - u[u.length - 1]) > 1e-6) u.push(x); });
    return { base: base, x: u };
  };

  B.w.ecuaciontrig = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Resuelve sen(m·x) = k, cos(m·x) = k o tan(m·x) = k");
    cuerpo.innerHTML = '<div data-fn class="chips"></div><div data-m class="chips"></div><div data-kk class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { fn: "sen", m: 1, k: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Valor <i>k</i>", min: -1.2, max: 1.2, step: 0.01, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    var NOTK = { sen: [[-1, "−1"], [-Math.sqrt(3) / 2, "−√3/2"], [-Math.sqrt(2) / 2, "−√2/2"], [-0.5, "−1/2"], [0, "0"], [0.5, "1/2"], [Math.sqrt(2) / 2, "√2/2"], [Math.sqrt(3) / 2, "√3/2"], [1, "1"]], tan: [[-Math.sqrt(3), "−√3"], [-1, "−1"], [-Math.sqrt(3) / 3, "−√3/3"], [0, "0"], [Math.sqrt(3) / 3, "√3/3"], [1, "1"], [Math.sqrt(3), "√3"]] };
    NOTK.cos = NOTK.sen;
    function eligeK() {
      var arr = NOTK[st.fn];
      U.fichas(cuerpo.querySelector("[data-kk]"), arr.map(function (p, i) { return { k: String(i), t: "k = " + p[1] }; }), "", function (i) { st.k = arr[+i][0]; sl.set(Math.round(st.k * 100) / 100); pinta(); });
      var lim = st.fn === "tan" ? 4 : 1.2; sl.input.min = -lim; sl.input.max = lim;
      if (Math.abs(st.k) > lim) st.k = Math.max(-lim, Math.min(lim, st.k)); sl.set(Math.round(st.k * 100) / 100);
    }
    function f(x) { var a = st.m * x; return st.fn === "sen" ? sen(a) : st.fn === "cos" ? cos(a) : Math.tan(rad(a)); }
    function pinta() {
      var sol = T.soluciones(st.fn, st.m, st.k), tit = st.fn + " " + (st.m === 1 ? "x" : st.m + "x");
      var lim = st.fn === "tan" ? 4 : 1.5;
      g.rango(0, 360, -lim, lim);
      g.limpiar();
      [0, 90, 180, 270, 360].forEach(function (a) { g.segmento(a, -lim, a, lim, { clase: "c-faint", dash: "2 5" }); g.texto(a, 0, a + "°", { dy: 15, dx: a === 360 ? -14 : a === 0 ? 14 : 0, ancla: "middle", clase: "faint" }); });
      g.curva(f, { clase: "c-pen", n: 720 });
      g.horizontal(st.k, { clase: "c-red", dash: "6 4" });
      sol.x.forEach(function (x) { g.punto(x, st.k, { r: 6, clase: "c-ok" }); g.segmento(x, 0, x, st.k, { clase: "c-ok", dash: "3 3" }); });
      var gen;
      if (!sol.base.length) gen = "no tiene solución (|k| &gt; 1)";
      else {
        var ar = st.m === 1 ? "x" : st.m + "x";
        gen = st.fn === "sen" ? ar + " = " + fmt(sol.base[0], 2) + "° + 360°n  ó  " + ar + " = " + fmt(sol.base[1], 2) + "° + 360°n" : st.fn === "cos" ? ar + " = ±" + fmt(sol.base[0], 2) + "° + 360°n" : ar + " = " + fmt(sol.base[0], 2) + "° + 180°n";
        if (st.m > 1) gen += "  ⇒  x = (…)/" + st.m;
      }
      lectura.innerHTML = U.lec("Ecuación", tit + " = " + fmt(st.k, 2)) + U.lec("Soluciones generales", gen, "pen") + U.lec("En [0°, 360°)", sol.x.length ? sol.x.map(function (x) { return fmt(x, 2) + "°"; }).join(" · ") : "ninguna", sol.x.length ? "ok" : "red") + U.lec("Número de soluciones", sol.x.length);
      pie.innerHTML = "Las soluciones son los cortes de la curva con la recta horizontal y = k. Con <b>m = " + st.m + "</b> la curva se repite " + st.m + " vez" + (st.m === 1 ? "" : "es") + " en una vuelta, así que " + (st.fn === "tan" ? "hay " + st.m + " soluciones" : "hay hasta " + 2 * st.m + " soluciones") + ". Para despejar x hay que <b>dividir entre m <i>todo</i></b>, incluido el «+360°n».";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "La curva y la recta y = k" });
    U.fichas(cuerpo.querySelector("[data-fn]"), [{ k: "sen", t: "seno" }, { k: "cos", t: "coseno" }, { k: "tan", t: "tangente" }], st.fn, function (k) { st.fn = k; st.k = k === "tan" ? 1 : 0.5; eligeK(); pinta(); });
    U.fichas(cuerpo.querySelector("[data-m]"), [{ k: "1", t: "ángulo x" }, { k: "2", t: "ángulo 2x" }, { k: "3", t: "ángulo 3x" }], "1", function (k) { st.m = +k; pinta(); });
    eligeK(); pinta();
  };

  // ============================================================
  // AMPLITUD: a·sen x + b·cos x = R·sen(x + φ)
  // ============================================================
  B.w.amplitud = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "a·sen x + b·cos x = R·sen(x + φ)");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 3, b: 4 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Coeficiente <i>a</i> (de sen x)", min: -5, max: 5, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Coeficiente <i>b</i> (de cos x)", min: -5, max: 5, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var a = st.a, b = st.b, Rr = Math.hypot(a, b), ph = Math.atan2(b, a) / R;
      g.limpiar();
      g.curva(function (x) { return a * sen(x) + b * cos(x); }, { clase: "c-pen", n: 360 });
      if (Rr > 1e-9) g.curva(function (x) { return Rr * sen(x + ph); }, { clase: "c-red", dash: "7 5", n: 360 });
      g.horizontal(Rr, { clase: "c-ok", dash: "3 4" }); g.horizontal(-Rr, { clase: "c-ok", dash: "3 4" });
      g.texto(355, Rr, "R = " + fmt(Rr, 3), { dy: -6, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("Amplitud R = √(a² + b²)", fmt(Rr, 4), "ok") + U.lec("Desfase φ (tan φ = b/a)", fmt(ph, 2) + "°", "red") + U.lec("a·sen x + b·cos x =", Rr < 1e-9 ? "0" : fmt(Rr, 3) + "·sen(x " + (ph < 0 ? "−" : "+") + " " + fmt(Math.abs(ph), 2) + "°)", "pen") + U.lec("Valor máximo · mínimo", fmt(Rr, 3) + " · " + fmt(-Rr, 3));
      pie.innerHTML = "La suma de un seno y un coseno <b>del mismo ángulo</b> es siempre otra onda senoidal: la curva azul (suma) y la roja discontinua (R·sen(x + φ)) coinciden. Se obtiene con sen(x + φ) = sen x·cos φ + cos x·sen φ comparando coeficientes: R·cos φ = a y R·sen φ = b. Útil para resolver «a·sen x + b·cos x = c» y para hallar máximos.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 360, ymin: -7.5, ymax: 7.5, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "Suma de seno y coseno" });
    [0, 90, 180, 270, 360].forEach(function (a) { g.segmento(a, -7.5, a, 7.5, { clase: "c-faint", dash: "2 5", capa: "fijo" }); g.texto(a, 0, a + "°", { dy: 15, dx: a === 360 ? -14 : a === 0 ? 14 : 0, ancla: "middle", clase: "faint", capa: "fijo" }); });
    pinta();
  };
})(window);
