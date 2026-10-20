/* ============================================================
   Bachi para Firu · laboratorio de funciones (Matemáticas I, tema 9)
   motor B.lab.fun (dominio, raíces, monotonía, extremos, asíntotas, simetría)
   + dominio · analisis · galeria · leergrafica
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Mate = B.Mate;
  B.lab = B.lab || {};
  var F = B.lab.fun = {};
  var INF = Infinity;

  // ------------------------------------------------------------
  // Lectura de expresiones: añade |x|, log_2(x) y log2(x) al evaluador
  // ------------------------------------------------------------
  function cierra(s, i) { var d = 0; for (var k = i; k < s.length; k++) { if (s.charAt(k) === "(") d++; else if (s.charAt(k) === ")") { d--; if (d === 0) return k; } } return -1; }
  function logBase(s) {
    var re = /log_?\{?(\d+(?:[.,]\d+)?)\}?\s*\(/i, m, guard = 0;
    while ((m = re.exec(s)) && guard++ < 10) {
      var ap = m.index + m[0].length - 1, cl = cierra(s, ap);
      if (cl < 0) break;
      s = s.slice(0, m.index) + "(ln(" + s.slice(ap + 1, cl) + ")/ln(" + m[1].replace(",", ".") + "))" + s.slice(cl + 1);
    }
    return s;
  }
  F.leer = function (txt) {
    var s = String(txt == null ? "" : txt).replace(/\|([^|]+)\|/g, "abs($1)");
    s = logBase(s);
    var r = Mate.compilar(s);
    if (r.ok) {
      var f = r.f;
      r.g = function (x) { var v; try { v = f(x); } catch (e) { return NaN; } return typeof v === "number" && isFinite(v) ? v : NaN; };
      r.gi = function (x) { var v; try { v = f(x); } catch (e) { return NaN; } return typeof v === "number" ? v : NaN; };   // conserva ±∞ (desbordamientos y polos)
      r.g.gi = r.gi;
    }
    return r;
  };

  function redond(x) { var r = Math.round(x * 1e6) / 1e6; return Math.abs(x - r) < 5e-7 ? r : x; }
  F.redond = redond;
  F.num = function (x, d) { return x === INF ? "+∞" : x === -INF ? "−∞" : fmt(x, d == null ? 4 : d); };
  var num = F.num;

  // ------------------------------------------------------------
  // Dominio: lista de intervalos { lo, hi, loC, hiC } (C = extremo incluido)
  // ------------------------------------------------------------
  function bisecta(g, sin, con) { for (var i = 0; i < 60; i++) { var m = (sin + con) / 2; if (isNaN(g(m))) sin = m; else con = m; } return (sin + con) / 2; }
  var PASO = 1 / 16;
  F.dominio = function (g, A, Bm) {
    A = A == null ? -100 : A; Bm = Bm == null ? 100 : Bm;
    var n = Math.round((Bm - A) / PASO), def = [], v = [], polo = [], i;
    for (i = 0; i <= n; i++) { v.push(g(A + i * PASO)); def.push(!isNaN(v[i])); }
    // polos: la función cambia de signo con valores grandes sin pasar por cero
    for (i = 0; i < n; i++) {
      if (def[i] && def[i + 1] && v[i] * v[i + 1] < 0 && Math.abs(v[i]) > 1 && Math.abs(v[i + 1]) > 1) {
        var a = A + i * PASO, b = a + PASO, fa = v[i];
        for (var it = 0; it < 70; it++) { var m = (a + b) / 2, fm = g(m); if (isNaN(fm)) break; if (fa * fm <= 0) b = m; else { a = m; fa = fm; } }
        var p = (a + b) / 2;
        if (isNaN(g(p)) || Math.abs(g(p)) > 1e3) polo[i] = redond(p);
      }
    }
    var out = [];
    i = 0;
    while (i <= n) {
      if (!def[i]) { i++; continue; }
      var j = i; while (j < n && def[j + 1] && polo[j] === undefined) j++;
      var I = { lo: -INF, hi: INF, loC: false, hiC: false };
      if (i > 0) {
        if (polo[i - 1] !== undefined) { I.lo = polo[i - 1]; I.loC = false; }
        else { I.lo = redond(bisecta(g, A + (i - 1) * PASO, A + i * PASO)); I.loC = !isNaN(g(I.lo)); }
      }
      if (j < n) {
        if (polo[j] !== undefined) { I.hi = polo[j]; I.hiC = false; }
        else { I.hi = redond(bisecta(g, A + (j + 1) * PASO, A + j * PASO)); I.hiC = !isNaN(g(I.hi)); }
      }
      out.push(I); i = j + 1;
    }
    return out;
  };

  // Texto del dominio: ℝ − {3}, (−∞, 3) ∪ (3, +∞), [2, +∞)…
  F.txtIntervalos = function (D) {
    if (!D.length) return "∅";
    var primero = D[0], ultimo = D[D.length - 1];
    if (primero.lo === -INF && ultimo.hi === INF) {
      var huecos = [], ok = true;
      for (var k = 0; k < D.length - 1; k++) { if (D[k].hi === D[k + 1].lo && !D[k].hiC && !D[k + 1].loC) huecos.push(D[k].hi); else ok = false; }
      if (ok) return huecos.length ? "ℝ − {" + huecos.map(function (h) { return num(h); }).join(", ") + "}" : "ℝ";
    }
    return D.map(function (I) {
      if (I.lo === I.hi) return "{" + num(I.lo) + "}";
      return (I.loC ? "[" : "(") + num(I.lo) + ", " + num(I.hi) + (I.hiC ? "]" : ")");
    }).join(" ∪ ");
  };
  F.enDominio = function (D, x) { return D.some(function (I) { return (x > I.lo || (I.loC && x === I.lo)) && (x < I.hi || (I.hiC && x === I.hi)); }); };

  // ------------------------------------------------------------
  // Raíces (incluidas las dobles, donde la gráfica toca el eje)
  // ------------------------------------------------------------
  F.raices = function (g, A, Bm) {
    var N = 3200, h = (Bm - A) / N, xs = [], vs = [], r = [], i;
    for (i = 0; i <= N; i++) { xs.push(A + i * h); vs.push(g(xs[i])); }
    function pon(x) { x = redond(x); for (var k = 0; k < r.length; k++) if (Math.abs(r[k] - x) < 1e-5) return; r.push(x); }
    for (i = 0; i <= N; i++) {
      var v = vs[i]; if (isNaN(v)) continue;
      if (Math.abs(v) < 1e-12) { pon(xs[i]); continue; }
      if (i < N && !isNaN(vs[i + 1]) && v * vs[i + 1] < 0) {
        var a = xs[i], b = xs[i + 1], fa = v, malo = false;
        for (var it = 0; it < 70; it++) { var m = (a + b) / 2, fm = g(m); if (isNaN(fm)) { malo = true; break; } if (fa * fm <= 0) b = m; else { a = m; fa = fm; } }
        if (!malo) { var x0 = (a + b) / 2; if (Math.abs(g(x0)) < 1e-4 * Math.max(1, Math.abs(v))) pon(x0); }
      }
    }
    for (i = 1; i < N; i++) {
      var a0 = Math.abs(vs[i - 1]), b0 = Math.abs(vs[i]), c0 = Math.abs(vs[i + 1]);
      if (isNaN(a0 + b0 + c0) || !(b0 <= a0 && b0 <= c0 && b0 < 0.5) || vs[i - 1] * vs[i + 1] < 0) continue;
      var lo = xs[i - 1], hi = xs[i + 1];
      for (var q = 0; q < 80; q++) { var m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (Math.abs(g(m1)) < Math.abs(g(m2))) hi = m2; else lo = m1; }
      var xm = (lo + hi) / 2; if (Math.abs(g(xm)) < 1e-7) pon(xm);
    }
    return r.sort(function (p, q) { return p - q; });
  };

  // ------------------------------------------------------------
  // Monotonía y extremos relativos (derivada numérica: sólo para dibujar y leer)
  // ------------------------------------------------------------
  function dsig(g, x, lo, hi) {
    var h = 1e-5 * Math.max(1, Math.abs(x)), a = Math.max(lo, x - h), b = Math.min(hi, x + h), ga = g(a), gb = g(b);
    if (isNaN(ga) || isNaN(gb) || b - a <= 0) return 0;
    var d = (gb - ga) / (b - a);
    return d > 1e-6 ? 1 : d < -1e-6 ? -1 : 0;
  }
  F.monotonia = function (g, D, A, Bm) {
    var tramos = [], crit = [];
    D.forEach(function (I) {
      var lo = Math.max(I.lo, A), hi = Math.min(I.hi, Bm);
      if (hi - lo < 1e-9) return;
      var N = 1200, s = [], xs = [], k;
      for (k = 0; k < N; k++) { var x = lo + (k + 0.5) * (hi - lo) / N; xs.push(x); s.push(dsig(g, x, lo, hi)); }
      var cortes = [lo], tipos = [];
      var ult = -1;
      for (k = 0; k < N; k++) {
        if (s[k] === 0) continue;
        if (ult >= 0 && s[ult] !== s[k]) {
          var a = xs[ult], b = xs[k], sa = s[ult], z = null;
          for (var it = 0; it < 60; it++) { var m = (a + b) / 2, sm = dsig(g, m, lo, hi); if (sm === 0) { z = m; break; } if (sm === sa) a = m; else b = m; }
          if (z === null) z = (a + b) / 2;
          z = redond(z);
          cortes.push(z); tipos.push(sa > 0 ? "máximo" : "mínimo");
          crit.push({ x: z, y: g(z), tipo: sa > 0 ? "máximo" : "mínimo" });
        }
        ult = k;
      }
      cortes.push(hi);
      for (k = 0; k < cortes.length - 1; k++) {
        var tot = 0, cnt = 0;
        for (var q = 0; q < N; q++) if (xs[q] > cortes[k] && xs[q] < cortes[k + 1]) { tot += s[q]; cnt++; }
        tramos.push({ lo: cortes[k], hi: cortes[k + 1], s: cnt && tot > 0 ? 1 : cnt && tot < 0 ? -1 : 0, loDom: k === 0 ? I.lo : null, hiDom: k === cortes.length - 2 ? I.hi : null });
      }
    });
    return { tramos: tramos, crit: crit };
  };

  // ------------------------------------------------------------
  // Simetría
  // ------------------------------------------------------------
  F.paridad = function (g) {
    var pts = [0.5, 1, 1.7, 2.3, 3.1, 4.6], par = true, imp = true, n = 0;
    pts.forEach(function (t) {
      var a = g(t), b = g(-t);
      if (isNaN(a) || isNaN(b)) return;
      n++;
      if (Math.abs(a - b) > 1e-9 * Math.max(1, Math.abs(a))) par = false;
      if (Math.abs(a + b) > 1e-9 * Math.max(1, Math.abs(a))) imp = false;
    });
    if (n < 2) return "no se puede decidir (el dominio no es simétrico)";
    if (par && imp) return "par e impar (es la función 0)";
    return par ? "par: simétrica respecto al eje Y" : imp ? "impar: simétrica respecto al origen" : "ni par ni impar";
  };

  // ------------------------------------------------------------
  // Comportamiento para x → ±∞
  // ------------------------------------------------------------
  F.infinito = function (g, signo) {
    var ts = [1e2, 1e3, 1e4, 1e5, 1e6, 1e7], v = ts.map(function (t) { return g(signo * t); }), i;
    if (v.some(isNaN) && g.gi) {
      // desbordamiento (por ejemplo eˣ para x enorme): vale ±∞ de verdad
      var w = ts.map(function (t) { return g.gi(signo * t); });
      if (!w.some(isNaN) && w.some(function (t) { return !isFinite(t); })) return { tipo: "inf", signo: Math.sign(w.filter(function (t) { return !isFinite(t); })[0]) };
    }
    if (v.some(isNaN)) return { tipo: "indef" };
    var L = v[5], escala = Math.max(1, Math.abs(L));
    if (Math.abs(v[5] - v[4]) <= 1e-4 * escala && Math.abs(v[4] - v[3]) <= 1e-3 * escala) {
      L = Math.abs(L) < 1e-6 ? 0 : Math.round(L * 1e5) / 1e5;
      return { tipo: "lim", L: L };
    }
    var crec = true, dec = true;
    for (i = 1; i < 6; i++) { if (!(v[i] > v[i - 1])) crec = false; if (!(v[i] < v[i - 1])) dec = false; }
    if (crec && Math.abs(v[5] - v[4]) > 0.5) return { tipo: "inf", signo: 1 };
    if (dec && Math.abs(v[5] - v[4]) > 0.5) return { tipo: "inf", signo: -1 };
    return { tipo: "osc" };
  };
  F.txtInfinito = function (r) {
    return r.tipo === "lim" ? "tiende a " + fmt(r.L, 4) : r.tipo === "inf" ? "tiende a " + (r.signo > 0 ? "+∞" : "−∞") : r.tipo === "osc" ? "oscila (no se acerca a nada)" : "no definida";
  };

  // ------------------------------------------------------------
  // Asíntotas verticales y huecos
  // ------------------------------------------------------------
  F.vertical = function (g, D) {
    var as = [], huecos = [];
    function crece(c, dir) {
      var v = [1e-3, 1e-6, 1e-9].map(function (d) { return Math.abs(g(c + dir * d * Math.max(1, Math.abs(c)))); });
      if (v.some(isNaN)) return false;
      return v[0] < v[1] && v[1] < v[2] && v[2] - v[0] > 5 && v[2] > 10;
    }
    D.forEach(function (I) {
      if (isFinite(I.lo) && !I.loC && crece(I.lo, 1) && as.indexOf(I.lo) < 0) as.push(I.lo);
      if (isFinite(I.hi) && !I.hiC && crece(I.hi, -1) && as.indexOf(I.hi) < 0) as.push(I.hi);
    });
    for (var k = 0; k < D.length - 1; k++) {
      if (D[k].hi === D[k + 1].lo && !D[k].hiC && !D[k + 1].loC) {
        var c = D[k].hi, a = g(c - 1e-7), b = g(c + 1e-7);
        if (!isNaN(a) && !isNaN(b) && Math.abs(a - b) < 1e-4 * Math.max(1, Math.abs(a)) && Math.abs(a) < 1e5) huecos.push([c, (a + b) / 2]);
      }
    }
    return { as: as.sort(function (p, q) { return p - q; }), huecos: huecos };
  };

  // Rango vertical razonable para dibujar g en [A, B]
  F.rangoY = function (g, A, Bm) {
    var ys = [], N = 600, i;
    for (i = 0; i <= N; i++) { var y = g(A + (Bm - A) * i / N); if (!isNaN(y) && Math.abs(y) < 1e6) ys.push(y); }
    if (ys.length < 5) return [-5, 5];
    ys.sort(function (p, q) { return p - q; });
    var lo = ys[Math.floor(ys.length * 0.03)], hi = ys[Math.floor(ys.length * 0.97)], d = hi - lo;
    if (d < 1e-6) { lo -= 1; hi += 1; d = 2; }
    lo -= d * 0.12; hi += d * 0.12; d = hi - lo;
    if (lo > 0 && lo < d * 1.0) lo = -d * 0.08;
    if (hi < 0 && -hi < d * 1.0) hi = d * 0.08;
    return [lo, hi];
  };

  // Análisis completo de una función en la ventana [A, B] (se analiza en [−60, 60])
  F.analizar = function (g, A, Bm) {
    var D = F.dominio(g, -60, 60), res = { D: D };
    res.f0 = g(0);
    res.raices = F.raices(g, -60, 60);
    res.paridad = F.paridad(g);
    res.mon = F.monotonia(g, D, -60, 60);
    res.vert = F.vertical(g, D);
    res.inf = F.infinito(g, 1); res.menosinf = F.infinito(g, -1);
    return res;
  };

  // ------------------------------------------------------------
  // Utilidades de interfaz
  // ------------------------------------------------------------
  function campo(host, et, val, ancho) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 180) + 'px" value="' + val + '" aria-label="' + et.replace(/<[^>]+>/g, "") + '">';
    host.appendChild(l); return l.querySelector("input");
  }
  F.campo = campo;
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  F.fil = fil;
  function marco(host, etq, w, h) {
    return new B.Plot(host, { xmin: -8, xmax: 8, ymin: -6, ymax: 6, w: w || 600, h: h || 340, etx: "x", ety: "y", etiqueta: etq });
  }
  F.marco = marco;
  // Punto relleno o hueco
  function pto(g, x, y, clase, hueco, r) {
    var p = g.punto(x, y, { r: r || 5, clase: clase });
    if (hueco) p.classList.add("hueco");
    return p;
  }
  F.pto = pto;
  function etq(g, x, y, t, clase, dx, dy, ancla) { g.texto(x, y, t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase, ancla: ancla }); }
  F.etq = etq;
  // Intervalos de texto: "(a, b)" con ±∞ en los bordes del análisis
  function tramoTxt(lo, hi, loInf, hiInf, loC, hiC) {
    return (loInf ? "(−∞" : (loC ? "[" : "(") + num(lo, 3)) + ", " + (hiInf ? "+∞)" : num(hi, 3) + (hiC ? "]" : ")"));
  }
  F.tramoTxt = tramoTxt;

  function ajustaVentana(g, f, X, auto) {
    var y = auto || F.rangoY(f, -X, X);
    g.rango(-X, X, y[0], y[1]);
  }

  // ============================================================
  // DOMINIO: escribe una función y se marca en el eje X dónde existe
  // ============================================================
  B.w.dominio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Dónde existe la función? Calcula su dominio");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = ["1/(x-3)", "sqrt(x-2)", "ln(x+1)", "sqrt(4-x^2)", "(x+1)/(x^2-4)", "1/sqrt(x-1)", "x^2-3x+5", "sqrt(x)/(x-4)", "sqrt(x+2)+sqrt(3-x)", "ln(x^2-1)"];
    var st = { txt: PRE[0] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var inp = campo(ctl, "f(x) =", st.txt, 260);
    function pistas(t) {
      var p = [];
      if (/\//.test(t)) p.push("hay una fracción: <b>el denominador no puede valer 0</b>");
      if (/sqrt|raiz|√/i.test(t)) p.push("hay una raíz de índice par: <b>el radicando debe ser ≥ 0</b>");
      if (/ln|log/i.test(t)) p.push("hay un logaritmo: <b>el argumento debe ser &gt; 0</b>");
      if (/tan|tg/i.test(t)) p.push("la tangente no existe en π/2 + kπ");
      return p.length ? p.join("; ") : "no hay fracciones, raíces ni logaritmos: nada que vigilar";
    }
    function pinta() {
      var r = F.leer(st.txt); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); return; }
      var f = r.g, D = F.dominio(f, -100, 100), y = F.rangoY(f, -8, 8);
      g.rango(-8, 8, y[0], y[1]);
      g.curva(f, { clase: "c-pen", n: 640 }).setAttribute("stroke-width", 2.6);
      var yb = y[0] + (y[1] - y[0]) * 0.06;
      // zonas sin función
      for (var k = 0; k <= D.length; k++) {
        var a = k === 0 ? -9 : D[k - 1].hi, b = k === D.length ? 9 : D[k].lo;
        if (D.length === 0) { a = -9; b = 9; }
        if (b > a + 1e-9 && a < 8.5 && b > -8.5) g.rect(Math.max(a, -8), y[0], Math.min(b, 8), y[1], { clase: "z-red" });
      }
      D.forEach(function (I) {
        var a = Math.max(I.lo, -8), b = Math.min(I.hi, 8);
        g.segmento(a, yb, b, yb, { clase: "c-ok" }).setAttribute("stroke-width", 6);
        if (I.lo > -8) pto(g, I.lo, yb, "c-ok", !I.loC, 5); if (I.hi < 8) pto(g, I.hi, yb, "c-ok", !I.hiC, 5);
      });
      var V = F.vertical(f, D);
      V.as.forEach(function (c) { if (c > -8 && c < 8) g.segmento(c, y[0], c, y[1], { clase: "c-red", dash: "6 5" }); });
      V.huecos.forEach(function (h) { if (Math.abs(h[0]) < 8) pto(g, h[0], h[1], "c-pen", true, 5); });
      var excl = [];
      for (var q = 0; q < D.length - 1; q++) if (D[q].hi === D[q + 1].lo && !D[q].hiC && !D[q + 1].loC) excl.push(D[q].hi);
      lectura.innerHTML = fil("Dominio", F.txtIntervalos(D), "ok") + fil("Lo que hay que vigilar", pistas(st.txt), "ancho") +
        (excl.length ? fil("Valores de x que no puedes usar", excl.map(function (e) { return "x = " + num(e); }).join(", "), "red") : "") +
        (V.as.length ? fil("Asíntotas verticales", V.as.map(function (e) { return "x = " + num(e); }).join(", "), "red") : "") +
        (V.huecos.length ? fil("Hueco (punto que falta)", V.huecos.map(function (h) { return "(" + num(h[0]) + ", " + num(h[1]) + ")"; }).join(", ")) : "");
      pie.innerHTML = "La <b>barra verde</b> sobre el eje X es el dominio: las x donde la función existe (círculo hueco = ese valor no entra; relleno = sí entra). La <b>zona roja</b> son las x prohibidas. Escribe tu propia función con <b>sqrt( )</b>, <b>ln( )</b>, <b>abs( )</b> o <b>|x|</b>.";
    }
    g = marco(cuerpo.querySelector(".w-plot"), "Dominio sobre el eje X", 640, 330);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p }; }), "0", function (k) { st.txt = PRE[+k]; inp.value = st.txt; pinta(); });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // ANALISIS: «ficha» completa de cualquier función
  // ============================================================
  B.w.analisis = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ficha de una función: dominio, cortes, crecimiento, extremos, simetría y asíntotas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-zoom class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var PRE = ["x^3-3x", "x^2-4x+3", "1/(x-2)", "e^x", "ln(x)", "sqrt(x)", "abs(x-1)", "sen(x)", "(x^2-1)/(x^2+1)", "x/(x^2+1)", "(x^2-1)/(x-1)", "x^4-4x^2"];
    var st = { txt: PRE[0], X: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var inp = campo(ctl, "f(x) =", st.txt, 260);
    function pinta() {
      var r = F.leer(st.txt); g.limpiar();
      if (!r.ok) { lectura.innerHTML = fil("Revisa lo que has escrito", r.error, "red"); return; }
      var f = r.g, X = st.X, an = F.analizar(f, -X, X), y = F.rangoY(f, -X, X);
      // si hay extremos, el encuadre se centra en lo interesante (la curva puede salirse por arriba o por abajo)
      var ys = an.mon.crit.filter(function (c) { return Math.abs(c.x) <= X; }).map(function (c) { return c.y; });
      if (ys.length) {
        an.raices.forEach(function (z) { if (Math.abs(z) <= X) ys.push(0); });
        if (!isNaN(an.f0) && Math.abs(an.f0) < 1e4) ys.push(an.f0);
        [an.inf, an.menosinf].forEach(function (z) { if (z.tipo === "lim") ys.push(z.L); });
        var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), sp = Math.max(hi - lo, 1e-6 * Math.max(1, Math.abs(hi)), 0.5);
        y = [Math.max(lo - sp * 0.9, y[0] - (y[1] - y[0])), Math.min(hi + sp * 0.9, y[1] + (y[1] - y[0]))];
      }
      g.rango(-X, X, y[0], y[1]);
      // asíntotas
      an.vert.as.forEach(function (c) { if (Math.abs(c) < X) g.segmento(c, y[0], c, y[1], { clase: "c-red", dash: "6 5" }); });
      [an.inf, an.menosinf].forEach(function (z) { if (z.tipo === "lim") g.horizontal(z.L, { clase: "c-ok", dash: "6 5" }); });
      g.curva(f, { clase: "c-pen", n: 800 }).setAttribute("stroke-width", 2.8);
      an.vert.huecos.forEach(function (h) { if (Math.abs(h[0]) < X) pto(g, h[0], h[1], "c-pen", true, 5); });
      var raices = an.raices.filter(function (z) { return Math.abs(z) <= X; });
      raices.forEach(function (z) { pto(g, z, 0, "c-ok", false, 5); });
      if (!isNaN(an.f0) && Math.abs(an.f0) < 1e4) pto(g, 0, an.f0, "c-red", false, 5);
      an.mon.crit.forEach(function (c) { if (Math.abs(c.x) <= X) { pto(g, c.x, c.y, "c-red", false, 6); etq(g, c.x, c.y, c.tipo === "máximo" ? "máx" : "mín", "red", 0, c.tipo === "máximo" ? -10 : 18, "middle"); } });
      // lectura
      var crece = [], dec = [], cte = [];
      an.mon.tramos.forEach(function (t) {
        if (t.hi < -X || t.lo > X) return;
        var tx = tramoTxt(t.lo, t.hi, t.lo <= -59.99, t.hi >= 59.99, false, false);
        (t.s > 0 ? crece : t.s < 0 ? dec : cte).push(tx);
      });
      function lim(l) { return l.length > 6 ? l.slice(0, 6).join(" ∪ ") + " ∪ …" : l.join(" ∪ "); }
      var crit = an.mon.crit.filter(function (c) { return Math.abs(c.x) <= X; });
      var mx = crit.filter(function (c) { return c.tipo === "máximo"; }), mn = crit.filter(function (c) { return c.tipo === "mínimo"; });
      function pts(l) { return l.length ? l.slice(0, 6).map(function (c) { return "(" + num(c.x, 3) + ", " + num(c.y, 3) + ")"; }).join(" · ") + (l.length > 6 ? " · …" : "") : "ninguno"; }
      var asin = [];
      an.vert.as.forEach(function (c) { asin.push("vertical x = " + num(c)); });
      [[an.menosinf, "−∞"], [an.inf, "+∞"]].forEach(function (z) { if (z[0].tipo === "lim") asin.push("horizontal y = " + num(z[0].L) + " (cuando x → " + z[1] + ")"); });
      lectura.innerHTML =
        fil("Dominio", F.txtIntervalos(an.D), "ok") +
        fil("Corte con el eje Y", isNaN(an.f0) ? "no corta (x = 0 no está en el dominio)" : "(0, " + num(an.f0, 4) + ")", "red") +
        fil("Cortes con el eje X (ceros)", raices.length ? lim(raices.map(function (z) { return "x = " + num(z, 4); })) : "no corta al eje X en la ventana", "ok") +
        fil("Simetría", an.paridad) +
        fil("Crece en", crece.length ? lim(crece) : "—", "ok") + fil("Decrece en", dec.length ? lim(dec) : "—", "red") + (cte.length ? fil("Constante en", lim(cte)) : "") +
        fil("Máximos relativos", pts(mx), "red") + fil("Mínimos relativos", pts(mn), "red") +
        fil("Asíntotas", asin.length ? asin.join(" · ") : "ninguna") +
        fil("Cuando x → −∞", F.txtInfinito(an.menosinf)) + fil("Cuando x → +∞", F.txtInfinito(an.inf));
      pie.innerHTML = "Puntos <b style='color:var(--ok)'>verdes</b>: cortes con el eje X. Punto <b style='color:var(--red)'>rojo</b> sobre el eje Y: f(0). Puntos rojos <i>máx / mín</i>: extremos relativos. Líneas discontinuas: asíntotas. Los resultados se calculan numéricamente: sirven para comprobar tu estudio hecho a mano.";
    }
    g = marco(cuerpo.querySelector(".w-plot"), "Gráfica de la función", 640, 340);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p }; }), "0", function (k) { st.txt = PRE[+k]; inp.value = st.txt; pinta(); });
    U.fichas(cuerpo.querySelector("[data-zoom]"), [{ k: "2.5", t: "Zoom ±2,5" }, { k: "5", t: "±5" }, { k: "10", t: "±10" }, { k: "25", t: "±25" }], "5", function (k) { st.X = parseFloat(k); pinta(); });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // GALERIA: catálogo de las funciones elementales
  // ============================================================
  var GAL = [
    { k: "afin", t: "Afín", f: function (x) { return 0.5 * x + 1; }, eq: "f(x) = mx + n", rg: [-6, 6, -4, 5], dom: "ℝ", rec: "ℝ (si m ≠ 0)", cre: "crece si m &gt; 0, decrece si m &lt; 0", sim: "impar si n = 0", cor: "(0, n) y (−n/m, 0)", asi: "ninguna", nota: "Una recta. La pendiente m es lo que sube y por cada unidad que avanzas." },
    { k: "cuad", t: "Cuadrática", f: function (x) { return 0.5 * x * x - 2; }, eq: "f(x) = ax² + bx + c", rg: [-5, 5, -3, 8], dom: "ℝ", rec: "[k, +∞) si a &gt; 0 · (−∞, k] si a &lt; 0 (k = y del vértice)", cre: "cambia en el vértice x = −b/2a", sim: "simétrica respecto a la recta x = −b/2a", cor: "(0, c) y las soluciones de ax² + bx + c = 0", asi: "ninguna", nota: "Una parábola. Si a &gt; 0 abre hacia arriba (mínimo en el vértice); si a &lt; 0, hacia abajo (máximo)." },
    { k: "cub", t: "Cúbica x³", f: function (x) { return x * x * x / 4; }, eq: "f(x) = x³", rg: [-4, 4, -6, 6], dom: "ℝ", rec: "ℝ", cre: "siempre creciente", sim: "impar (origen)", cor: "(0, 0)", asi: "ninguna", nota: "Pasa por el origen y se «aplana» un instante allí; no tiene extremos." },
    { k: "raiz", t: "Raíz √x", f: function (x) { return Math.sqrt(x); }, eq: "f(x) = √x", rg: [-1, 9, -2, 4], dom: "[0, +∞)", rec: "[0, +∞)", cre: "siempre creciente", sim: "ninguna", cor: "(0, 0)", asi: "ninguna", nota: "Es la mitad de una parábola «tumbada»: la inversa de x² para x ≥ 0." },
    { k: "abs", t: "Valor absoluto |x|", f: Math.abs, eq: "f(x) = |x|", rg: [-5, 5, -1, 5], dom: "ℝ", rec: "[0, +∞)", cre: "decrece en (−∞, 0), crece en (0, +∞)", sim: "par (eje Y)", cor: "(0, 0)", asi: "ninguna", nota: "Una «V» con el vértice en el origen. Es una función a trozos: −x si x &lt; 0 y x si x ≥ 0." },
    { k: "inv", t: "Inversa 1/x", f: function (x) { return 1 / x; }, eq: "f(x) = k/x", rg: [-6, 6, -6, 6], dom: "ℝ − {0}", rec: "ℝ − {0}", cre: "decrece en cada rama (si k &gt; 0)", sim: "impar (origen)", cor: "no corta a ningún eje", asi: "x = 0 (vertical) · y = 0 (horizontal)", nota: "La hipérbola: dos ramas que se acercan a los ejes sin tocarlos nunca." },
    { k: "exp2", t: "Exponencial 2ˣ", f: function (x) { return Math.pow(2, x); }, eq: "f(x) = aˣ  (a &gt; 1)", rg: [-4, 4, -1, 9], dom: "ℝ", rec: "(0, +∞)", cre: "siempre creciente", sim: "ninguna", cor: "(0, 1)", asi: "y = 0 (horizontal, a la izquierda)", nota: "Siempre positiva y pasa por (0, 1). Crece cada vez más deprisa." },
    { k: "exp05", t: "Exponencial (½)ˣ", f: function (x) { return Math.pow(0.5, x); }, eq: "f(x) = aˣ  (0 &lt; a &lt; 1)", rg: [-4, 4, -1, 9], dom: "ℝ", rec: "(0, +∞)", cre: "siempre decreciente", sim: "ninguna", cor: "(0, 1)", asi: "y = 0 (horizontal, a la derecha)", nota: "Decaimiento exponencial: es el reflejo de 2ˣ respecto al eje Y." },
    { k: "log", t: "Logaritmo log₂ x", f: function (x) { return Math.log(x) / Math.log(2); }, eq: "f(x) = logₐ x", rg: [-1, 9, -4, 4], dom: "(0, +∞)", rec: "ℝ", cre: "creciente si a &gt; 1", sim: "ninguna", cor: "(1, 0)", asi: "x = 0 (vertical)", nota: "La inversa de la exponencial: su gráfica es el reflejo respecto a y = x." },
    { k: "sen", t: "Seno", f: Math.sin, eq: "f(x) = sen x", rg: [-7, 7, -2, 2], dom: "ℝ", rec: "[−1, 1]", cre: "alterna cada π; periodo 2π", sim: "impar (origen)", cor: "x = kπ", asi: "ninguna", nota: "Periódica, acotada entre −1 y 1. Amplitud 1, periodo 2π." },
    { k: "cos", t: "Coseno", f: Math.cos, eq: "f(x) = cos x", rg: [-7, 7, -2, 2], dom: "ℝ", rec: "[−1, 1]", cre: "alterna cada π; periodo 2π", sim: "par (eje Y)", cor: "(0, 1) y x = π/2 + kπ", asi: "ninguna", nota: "Es el seno adelantado π/2: cos x = sen(x + π/2)." },
    { k: "tan", t: "Tangente", f: Math.tan, eq: "f(x) = tan x", rg: [-4.7, 4.7, -6, 6], dom: "ℝ − {π/2 + kπ}", rec: "ℝ", cre: "creciente en cada rama; periodo π", sim: "impar (origen)", cor: "x = kπ", asi: "x = π/2 + kπ (verticales)", nota: "Periodo π (no 2π). Tiene infinitas asíntotas verticales." }
  ];
  B.w.galeria = function (host) {
    var cuerpo = B.caja(host, "Catálogo", "Las funciones elementales de un vistazo");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "afin" }, g, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var G = GAL.filter(function (z) { return z.k === st.k; })[0];
      g.rango(G.rg[0], G.rg[1], G.rg[2], G.rg[3]); g.limpiar();
      if (G.k === "tan") { for (var q = -1; q <= 1; q++) g.segmento(Math.PI / 2 + q * Math.PI, G.rg[2], Math.PI / 2 + q * Math.PI, G.rg[3], { clase: "c-red", dash: "6 5" }); }
      if (G.k === "inv") { g.vertical(0, { clase: "c-red", dash: "6 5" }); g.horizontal(0, { clase: "c-red", dash: "6 5" }); }
      if (G.k === "log") g.vertical(0, { clase: "c-red", dash: "6 5" });
      if (G.k === "exp2" || G.k === "exp05") g.horizontal(0, { clase: "c-red", dash: "6 5" });
      g.curva(G.f, { clase: "c-pen", n: 700 }).setAttribute("stroke-width", 3);
      lectura.innerHTML = fil("Ecuación", G.eq, "pen") + fil("Dominio", G.dom, "ok") + fil("Recorrido", G.rec, "ok") + fil("Crecimiento", G.cre) + fil("Simetría", G.sim) + fil("Cortes con los ejes", G.cor) + fil("Asíntotas", G.asi, "red");
      pie.innerHTML = G.nota;
    }
    g = marco(cuerpo.querySelector(".w-plot"), "Gráfica de la función elegida", 600, 320);
    U.fichas(cuerpo.querySelector("[data-sel]"), GAL.map(function (z) { return { k: z.k, t: z.t }; }), "afin", function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // LEERGRAFICA: lee propiedades en una gráfica y comprueba
  // ============================================================
  var GRAFS = [
    { k: "A", t: "Gráfica A (parábola recortada)", rg: [-3.5, 5.5, -6, 5], tr: [{ f: function (x) { return -(x - 1) * (x - 1) + 4; }, a: -2, b: 4, ca: true, cb: true }],
      pts: [[-2, -5, 0], [4, -5, 0]],
      preguntas: [
        { q: "Dominio", op: ["[−2, 4]", "(−2, 4)", "ℝ", "[−5, 4]"], ok: 0, por: "La curva empieza en x = −2 y acaba en x = 4, con los dos extremos incluidos (puntos rellenos)." },
        { q: "Recorrido (valores de y que alcanza)", op: ["[−5, 4]", "[−2, 4]", "(−∞, 4]", "[−5, 0]"], ok: 0, por: "El punto más bajo es y = −5 (en los extremos) y el más alto es y = 4 (el vértice)." },
        { q: "¿Dónde crece?", op: ["(−2, 1)", "(1, 4)", "(−2, 4)", "(0, 4)"], ok: 0, por: "Sube de izquierda a derecha hasta el vértice en x = 1; después baja." },
        { q: "Máximo relativo", op: ["(1, 4)", "(4, −5)", "(−2, −5)", "(0, 3)"], ok: 0, por: "Es el vértice de la parábola: pasa de crecer a decrecer." },
        { q: "Cortes con el eje X", op: ["x = −1 y x = 3", "x = −2 y x = 4", "x = 1", "no corta"], ok: 0, por: "f(x) = 0 → −(x − 1)² + 4 = 0 → x − 1 = ±2 → x = −1 y x = 3." },
        { q: "Corte con el eje Y", op: ["(0, 3)", "(0, 4)", "(0, 0)", "(0, 1)"], ok: 0, por: "f(0) = −(0 − 1)² + 4 = 3." }
      ] },
    { k: "B", t: "Gráfica B (hipérbola desplazada)", rg: [-5, 7, -6, 8], asv: 1, ash: 2, tr: [{ f: function (x) { return 1 / (x - 1) + 2; }, a: -INF, b: 1, ca: false, cb: false }, { f: function (x) { return 1 / (x - 1) + 2; }, a: 1, b: INF, ca: false, cb: false }],
      pts: [],
      preguntas: [
        { q: "Dominio", op: ["ℝ − {1}", "ℝ − {2}", "ℝ", "(1, +∞)"], ok: 0, por: "La gráfica no existe en x = 1: ahí está la asíntota vertical." },
        { q: "Recorrido", op: ["ℝ − {2}", "ℝ − {1}", "ℝ", "(2, +∞)"], ok: 0, por: "La curva se acerca a y = 2 sin tocarla nunca: ese valor no se alcanza." },
        { q: "Asíntotas", op: ["x = 1 e y = 2", "x = 2 e y = 1", "x = 0 e y = 0", "sólo x = 1"], ok: 0, por: "Las líneas discontinuas a las que se pega la curva: vertical x = 1 y horizontal y = 2." },
        { q: "Crecimiento", op: ["decrece en (−∞, 1) y en (1, +∞)", "crece en todo su dominio", "decrece en ℝ", "crece en (−∞, 1)"], ok: 0, por: "En cada rama la gráfica baja al ir de izquierda a derecha. Pero no es decreciente en todo ℝ, porque la función salta en x = 1." },
        { q: "Corte con el eje Y", op: ["(0, 1)", "(0, 2)", "(0, −1)", "no corta"], ok: 0, por: "f(0) = 1/(0 − 1) + 2 = −1 + 2 = 1." },
        { q: "Corte con el eje X", op: ["x = 1/2", "x = −1", "x = 3", "no corta"], ok: 0, por: "1/(x − 1) + 2 = 0 → x − 1 = −1/2 → x = 1/2." }
      ] },
    { k: "C", t: "Gráfica C (a trozos continua)", rg: [-4, 4, -2, 6], tr: [{ f: function (x) { return -x - 1; }, a: -4, b: 0, ca: true, cb: true }, { f: function (x) { return x * x - 1; }, a: 0, b: INF, ca: true, cb: false }],
      pts: [],
      preguntas: [
        { q: "Dominio", op: ["ℝ", "ℝ − {0}", "[−1, +∞)", "(−∞, 0]"], ok: 0, por: "La gráfica no tiene huecos ni saltos: está definida para todo x." },
        { q: "Recorrido", op: ["[−1, +∞)", "ℝ", "(−1, +∞)", "[0, +∞)"], ok: 0, por: "El punto más bajo es (0, −1), que sí se alcanza; desde ahí la gráfica sube sin límite por ambos lados." },
        { q: "Mínimo (absoluto)", op: ["(0, −1)", "(−1, 0)", "(1, 0)", "no tiene"], ok: 0, por: "En x = 0 la función pasa de decrecer a crecer y es el punto más bajo de toda la gráfica." },
        { q: "Crecimiento", op: ["decrece en (−∞, 0) y crece en (0, +∞)", "crece en (−∞, 0) y decrece en (0, +∞)", "siempre crece", "siempre decrece"], ok: 0, por: "A la izquierda de 0 la recta baja; a la derecha la parábola sube." },
        { q: "Cortes con el eje X", op: ["x = −1 y x = 1", "x = −1", "x = 1", "x = 0"], ok: 0, por: "Izquierda: −x − 1 = 0 → x = −1. Derecha: x² − 1 = 0 → x = 1 (la solución x = −1 no vale: no está en ese trozo)." },
        { q: "¿Es continua en x = 0?", op: ["Sí: los dos trozos se unen en (0, −1)", "No: hay un salto", "No: hay un hueco", "No se puede saber"], ok: 0, por: "Por la izquierda f vale −0 − 1 = −1 y por la derecha 0² − 1 = −1: coinciden con f(0) = −1." }
      ] }
  ];
  // Lector genérico: una gráfica a la vez, con preguntas de opción múltiple corregidas al instante
  F.lector = function (host, etiqueta, titulo, GR, pie) {
    var cuerpo = B.caja(host, etiqueta, titulo);
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="lg-pregs"></div><p class="w-pie">' + (pie || "Elige una respuesta en cada apartado: se corrige al momento y te explica por qué.") + '</p>';
    var st = { k: GR[0].k }, g, pregs = cuerpo.querySelector(".lg-pregs");
    function dibuja() {
      var G = GR.filter(function (z) { return z.k === st.k; })[0];
      g.rango(G.rg[0], G.rg[1], G.rg[2], G.rg[3]); g.limpiar();
      [].concat(G.asv == null ? [] : G.asv).forEach(function (c) { g.vertical(c, { clase: "c-red", dash: "6 5" }); });
      [].concat(G.ash == null ? [] : G.ash).forEach(function (c) { g.horizontal(c, { clase: "c-red", dash: "6 5" }); });
      G.tr.forEach(function (t) {
        var a = Math.max(t.a, G.rg[0]), b = Math.min(t.b, G.rg[1]);
        g.curva(t.f, { clase: "c-pen", x0: a, x1: b, n: 500 }).setAttribute("stroke-width", 3);
        if (isFinite(t.a) && isFinite(t.f(t.a))) pto(g, t.a, t.f(t.a), "c-pen", !t.ca, 5);
        if (isFinite(t.b) && t.b < G.rg[1] && isFinite(t.f(t.b))) pto(g, t.b, t.f(t.b), "c-pen", !t.cb, 5);
      });
      (G.pts || []).forEach(function (q) { pto(g, q[0], q[1], "c-pen", !!q[2], 5); });
      pregs.innerHTML = G.preguntas.map(function (p, i) {
        return '<div class="lg-p" data-i="' + i + '"><b>' + (i + 1) + '. ' + p.q + '</b><div class="chips">' + p.op.map(function (o, j) { return '<button type="button" class="chip-btn" data-j="' + j + '">' + o + "</button>"; }).join("") + '</div><p class="lg-r"></p></div>';
      }).join("");
    }
    pregs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-j]"); if (!b) return;
      var cont = b.closest(".lg-p"), G = GR.filter(function (z) { return z.k === st.k; })[0], p = G.preguntas[+cont.getAttribute("data-i")], j = +b.getAttribute("data-j");
      Array.prototype.forEach.call(cont.querySelectorAll(".chip-btn"), function (x) { x.classList.remove("on", "bien", "mal"); });
      b.classList.add(j === p.ok ? "bien" : "mal");
      var r = cont.querySelector(".lg-r");
      r.className = "lg-r " + (j === p.ok ? "ok" : "mal");
      r.innerHTML = j === p.ok ? "<b>✓ Correcto.</b> " + p.por : "<b>Todavía no.</b> Mira otra vez la gráfica e inténtalo de nuevo.";
    });
    g = marco(cuerpo.querySelector(".w-plot"), "Gráfica para leer", 600, 320);
    U.fichas(cuerpo.querySelector("[data-sel]"), GR.map(function (z) { return { k: z.k, t: z.t }; }), GR[0].k, function (k) { st.k = k; dibuja(); });
    dibuja();
  };
  B.w.leergrafica = function (host) { F.lector(host, "Entrenamiento", "Lee la gráfica y rellena la ficha", GRAFS); };
})(window);
