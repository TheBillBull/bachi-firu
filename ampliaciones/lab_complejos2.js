/* ============================================================
   Bachi para Firu · laboratorio de números complejos II (Matemáticas I, tema 6)
   euler · transformaciones · julia
   Usa el motor B.lab.cx de lab_complejos.js (se consulta al montar el widget,
   así que no importa el orden de carga de los archivos lab_*.js).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var R = Math.PI / 180;
  function z(a, b) { return { a: a, b: b }; }
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }
  function mul(p, q) { return z(p.a * q.a - p.b * q.b, p.a * q.b + p.b * q.a); }

  // ============================================================
  // EULER: e^{iθ} = cos θ + i·sen θ, y la serie de potencias que lo explica
  // ============================================================
  B.w.euler = function (host) {
    var C = B.lab.cx;
    var cuerpo = B.caja(host, "Pruébalo", "La fórmula de Euler: e<sup>iθ</sup> = cos θ + i·sen θ");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { t: 90, n: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sT = U.slider(ctl, { et: "Ángulo <i>θ</i>", min: -180, max: 180, step: 15, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return v + "° = " + fmt(v * R, 3) + " rad"; } });
    var sN = U.slider(ctl, { et: "Términos de la serie", min: 0, max: 14, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    function pinta() {
      var th = st.t * R, e = z(cero(Math.cos(th)), cero(Math.sin(th)));
      var term = z(1, 0), sum = z(1, 0), pts = [[1, 0]], mx = 1, k;
      for (k = 1; k <= st.n; k++) {
        term = mul(term, z(0, th)); term = z(term.a / k, term.b / k);
        sum = z(sum.a + term.a, sum.b + term.b); pts.push([sum.a, sum.b]); mx = Math.max(mx, Math.hypot(sum.a, sum.b));
      }
      var m = Math.max(1.6, mx * 1.2);
      g.limpiar(); g.rangoIso(0, 0, m);
      g.arco(0, 0, 1, 0, 360, { clase: "c-faint", dash: "3 5" });
      if (st.t !== 0) g.arco(0, 0, 0.3, 0, st.t, { clase: "c-hl" }).setAttribute("stroke-width", 3);
      g.segmento(0, 0, e.a, 0, { clase: "c-pen" }).setAttribute("stroke-width", 5);
      g.segmento(e.a, 0, e.a, e.b, { clase: "c-red" }).setAttribute("stroke-width", 5);
      g.polilinea(pts, { clase: "c-faint", dash: "2 3" });
      pts.forEach(function (q, i) { if (i < pts.length - 1) g.punto(q[0], q[1], { r: 3.5, clase: "c-faint" }); });
      var S = pts[pts.length - 1];
      g.punto(S[0], S[1], { r: 6, clase: "c-ink" }); g.texto(S[0], S[1], "S" + U.sub(st.n), { dx: 8, dy: 14, clase: "faint" });
      U.flecha(g, 0, 0, e.a, e.b, { clase: "c-ok" }); g.punto(e.a, e.b, { r: 6, clase: "c-ok" }); g.texto(e.a, e.b, "e^(iθ)", { dx: 8, dy: -8, clase: "ok" });
      var err = Math.hypot(sum.a - e.a, sum.b - e.b);
      lectura.innerHTML = U.lec("cos θ (azul)", fmt(e.a, 4), "pen") + U.lec("sen θ (rojo)", fmt(e.b, 4), "red") +
        U.lec("e<sup>iθ</sup> = cos θ + i·sen θ", C.txt(e, 3), "ok") +
        U.lec("Suma de " + (st.n + 1) + " términos", C.txt(z(sum.a, sum.b), 4)) +
        U.lec("Error |S − e<sup>iθ</sup>|", err < 1e-9 ? "0" : U.cient(err, 2), err < 0.01 ? "ok" : "red");
      var especial = "";
      if (st.t === 180 || st.t === -180) especial = " <b>Con θ = π: e<sup>iπ</sup> = −1</b>, es decir, e<sup>iπ</sup> + 1 = 0.";
      else if (st.t === 90) especial = " Con θ = π/2: e<sup>iπ/2</sup> = i.";
      else if (st.t === -90) especial = " Con θ = −π/2: e<sup>−iπ/2</sup> = −i.";
      pie.innerHTML = "El punto verde <b>e<sup>iθ</sup></b> recorre la circunferencia unidad: su abscisa es cos θ y su ordenada sen θ. Los puntos grises son las sumas parciales de la serie 1 + (iθ) + (iθ)²/2! + (iθ)³/3! + …, que se acercan al punto verde al añadir términos." + especial;
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Fórmula de Euler en la circunferencia unidad" });
    var PRE = [[90, "θ = π/2"], [180, "θ = π"], [-90, "θ = −π/2"], [60, "θ = π/3"], [45, "θ = π/4"], [0, "θ = 0"]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[1] }; }), "", function (k) { var p = PRE[+k]; st.t = p[0]; sT.set(p[0]); pinta(); });
    pinta();
  };

  // ============================================================
  // TRANSFORMACIONES: qué hace con una figura z ↦ f(z)
  // ============================================================
  var EFE = [[1, 1], [1.6, 1], [1.6, 2], [2.4, 2], [2.4, 2.5], [1.6, 2.5], [1.6, 3], [2.8, 3], [2.8, 3.5], [1, 3.5]];
  B.w.transformaciones = function (host) {
    var C = B.lab.cx;
    var cuerpo = B.caja(host, "Pruébalo", "Transformaciones del plano con complejos");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "giro", ca: 2, cb: 1, r: 1.5, al: 90, t: 1, pa: 1, pb: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var S = {};
    function sl(k, et, mn, mx, stp, f) { S[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: f || function (v) { return fmt(v, 2); } }); }
    sl("ca", "Re del vector", -4, 4, 0.5, function (v) { return fmt(v, 1); }); sl("cb", "Im del vector", -4, 4, 0.5, function (v) { return fmt(v, 1); });
    sl("pa", "Centro (Re)", -4, 4, 0.5, function (v) { return fmt(v, 1); }); sl("pb", "Centro (Im)", -4, 4, 0.5, function (v) { return fmt(v, 1); });
    sl("r", "Razón <i>k</i>", -2, 2, 0.25); sl("al", "Ángulo α", -180, 180, 15, function (v) { return v + "°"; });
    sl("t", "De z a f(z)", 0, 1, 0.05, function (v) { return Math.round(v * 100) + " %"; });
    var MOSTRAR = { trasl: ["ca", "cb"], homot: ["r"], giro: ["al"], conj: [], conjn: [], bis: [], semej: ["pa", "pb", "r", "al"] };
    var TEXTO = {
      trasl: function () { return "f(z) = z + (" + C.txt(z(st.ca, st.cb), 1) + ")"; },
      homot: function () { return "f(z) = " + fmt(st.r, 2) + "·z"; },
      giro: function () { return "f(z) = e<sup>i·" + st.al + "°</sup>·z = 1<sub>" + st.al + "°</sub>·z"; },
      conj: function () { return "f(z) = z̄"; },
      conjn: function () { return "f(z) = −z̄"; },
      bis: function () { return "f(z) = i·z̄"; },
      semej: function () { return "f(z) = c + " + fmt(st.r, 2) + "·1<sub>" + st.al + "°</sub>·(z − c), c = " + C.txt(z(st.pa, st.pb), 1); }
    };
    function f(p) {
      var q = z(p[0], p[1]), o;
      if (st.modo === "trasl") o = z(q.a + st.ca, q.b + st.cb);
      else if (st.modo === "homot") o = z(st.r * q.a, st.r * q.b);
      else if (st.modo === "giro") o = mul(z(Math.cos(st.al * R), Math.sin(st.al * R)), q);
      else if (st.modo === "conj") o = z(q.a, -q.b);
      else if (st.modo === "conjn") o = z(-q.a, -q.b);
      else if (st.modo === "bis") o = z(q.b, q.a);
      else { var c = z(st.pa, st.pb), d = mul(z(st.r * Math.cos(st.al * R), st.r * Math.sin(st.al * R)), z(q.a - c.a, q.b - c.b)); o = z(c.a + d.a, c.b + d.b); }
      return [o.a, o.b];
    }
    var TIPO = {
      trasl: ["Traslación", "sí", "sí", "Todos los puntos se desplazan el mismo vector: sumar un complejo."],
      homot: ["Homotecia de centro 0 y razón k", "se multiplican por |k|", "sí si k &gt; 0 · no si k &lt; 0 (gira 180°)", "Multiplicar por un real k estira (|k| &gt; 1) o encoge (|k| &lt; 1) la figura; si k es negativo además la gira 180°."],
      giro: ["Giro de centro 0 y ángulo α", "sí", "sí", "Multiplicar por 1<sub>α</sub> suma α al argumento de todos los puntos y deja intacto el módulo."],
      conj: ["Simetría respecto del eje real", "sí", "no: invierte", "Conjugar cambia el signo de la parte imaginaria: cada punto pasa a su simétrico respecto del eje real. La F se ve «de espaldas»."],
      conjn: ["Simetría respecto del eje imaginario", "sí", "no: invierte", "−z̄ = −a + bi: cambia el signo de la parte real. Es conjugar y después girar 180°."],
      bis: ["Simetría respecto de la recta y = x", "sí", "no: invierte", "i·z̄ = i(a − bi) = b + ai: intercambia la parte real y la imaginaria, es decir, refleja respecto de la bisectriz del primer cuadrante."],
      semej: ["Semejanza: giro y homotecia de centro c", "se multiplican por |k|", "sí si k &gt; 0", "Se lleva c al origen (z − c), se gira y se estira (· k·1<sub>α</sub>) y se devuelve a su sitio (+ c). El punto c queda fijo."]
    };
    function pinta() {
      Object.keys(S).forEach(function (k) { S[k].el.style.display = k === "t" || MOSTRAR[st.modo].indexOf(k) >= 0 ? "" : "none"; });
      if (st.modo === "trasl") { S.ca.el.querySelector(".sl-et").innerHTML = "Re de c"; S.cb.el.querySelector(".sl-et").innerHTML = "Im de c"; }
      var t = st.t, img = EFE.map(function (p) { var q = f(p); return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; });
      var mx = 5; EFE.concat(img).forEach(function (p) { mx = Math.max(mx, Math.abs(p[0]), Math.abs(p[1])); });
      var m = Math.ceil(mx * 1.15);
      g.limpiar(); g.rangoIso(0, 0, m);
      if (st.modo === "conj") g.segmento(-3 * m, 0, 3 * m, 0, { clase: "c-hl", dash: "6 4" }).setAttribute("stroke-width", 2.5);
      if (st.modo === "conjn") g.segmento(0, -3 * m, 0, 3 * m, { clase: "c-hl", dash: "6 4" }).setAttribute("stroke-width", 2.5);
      if (st.modo === "bis") g.segmento(-3 * m, -3 * m, 3 * m, 3 * m, { clase: "c-hl", dash: "6 4" }).setAttribute("stroke-width", 2.5);
      g.poligono(EFE, { clase: "z-pen", borde: "var(--pen)" });
      g.poligono(img, { clase: "z-red", borde: "var(--red)" });
      var z0 = EFE[0], w0 = f(z0), p0 = img[0];
      g.segmento(z0[0], z0[1], p0[0], p0[1], { clase: "c-faint", dash: "3 4" });
      g.punto(z0[0], z0[1], { r: 5, clase: "c-pen" }); g.texto(z0[0], z0[1], "z", { dx: -14, dy: 14, clase: "pen" });
      g.punto(p0[0], p0[1], { r: 5, clase: "c-red" }); g.texto(p0[0], p0[1], "f(z)", { dx: 7, dy: -7, clase: "red" });
      if (st.modo === "semej") { g.punto(st.pa, st.pb, { r: 5, clase: "c-ok" }); g.texto(st.pa, st.pb, "c", { dx: 7, dy: 14, clase: "ok" }); }
      if (st.modo === "giro" || st.modo === "homot") { g.punto(0, 0, { r: 4, clase: "c-ok" }); }
      var tp = TIPO[st.modo];
      lectura.innerHTML = U.lec("Transformación", TEXTO[st.modo](), "red") + U.lec("z = 1 + i", "f(z) = " + C.txt(z(w0[0], w0[1]), 3), "pen") + U.lec("Tipo", tp[0]) + U.lec("¿Conserva distancias?", tp[1], tp[1] === "sí" ? "ok" : "") + U.lec("¿Conserva la orientación?", tp[2]);
      pie.innerHTML = tp[3] + " Azul: la figura original. Rojo: su imagen (mueve «De z a f(z)» para ver el recorrido).";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -6, xmax: 6, ymin: -6, ymax: 6, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Una figura y su imagen por una transformación compleja" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "trasl", t: "z + c" }, { k: "homot", t: "k·z" }, { k: "giro", t: "e<sup>iα</sup>·z" }, { k: "conj", t: "z̄" }, { k: "conjn", t: "−z̄" }, { k: "bis", t: "i·z̄" }, { k: "semej", t: "giro de centro c" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // JULIA: cada punto c del plano tiene su conjunto de Julia
  // ============================================================
  B.w.julia = function (host) {
    var C = B.lab.cx;
    var cuerpo = B.caja(host, "Curiosidad", "Conjuntos de Julia: z → z² + c");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="mb-fila"><canvas class="mb-cv" data-m width="300" height="225" role="img" aria-label="Conjunto de Mandelbrot: arrastra para elegir el parámetro c"></canvas><canvas class="mb-cv" data-j width="300" height="225" role="img" aria-label="Conjunto de Julia del parámetro c elegido" style="cursor:default"></canvas></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var cm = cuerpo.querySelector("[data-m]"), cj = cuerpo.querySelector("[data-j]"), mctx = cm.getContext && cm.getContext("2d"), jctx = cj.getContext && cj.getContext("2d");
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var st = { a: -0.12, b: 0.74 }, MAXI = 50, base = null;
    var MX0 = -2.2, MX1 = 0.8, MY0 = -1.125, MY1 = 1.125, JX0 = -1.8, JX1 = 1.8, JY0 = -1.35, JY1 = 1.35;
    var sA = U.slider(ctl, { et: "Re(c)", min: -1.5, max: 1.5, step: 0.01, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    var sB = U.slider(ctl, { et: "Im(c)", min: -1.5, max: 1.5, step: 0.01, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function color(img, o, n) {
      if (n >= MAXI) { img.data[o] = 18; img.data[o + 1] = 22; img.data[o + 2] = 48; }
      else { var t = n / MAXI; img.data[o] = 240 * Math.min(1, t * 4); img.data[o + 1] = 200 * Math.min(1, t * 3); img.data[o + 2] = 120 + 135 * (1 - t); }
      img.data[o + 3] = 255;
    }
    function dibujaM() {
      if (!mctx) return;
      var w = cm.width, h = cm.height, img = mctx.createImageData(w, h);
      for (var py = 0; py < h; py++) for (var px = 0; px < w; px++) {
        var ca = MX0 + (MX1 - MX0) * px / w, cb = MY1 - (MY1 - MY0) * py / h, za = 0, zb = 0, n = 0;
        while (n < MAXI && za * za + zb * zb <= 4) { var t = za * za - zb * zb + ca; zb = 2 * za * zb + cb; za = t; n++; }
        color(img, (py * w + px) * 4, n);
      }
      base = img;
    }
    function pintaM() {
      if (!mctx) return;
      if (!base) dibujaM();
      mctx.putImageData(base, 0, 0);
      var px = (st.a - MX0) / (MX1 - MX0) * cm.width, py = (MY1 - st.b) / (MY1 - MY0) * cm.height;
      mctx.beginPath(); mctx.arc(px, py, 6, 0, 2 * Math.PI); mctx.fillStyle = "#e0245e"; mctx.fill(); mctx.strokeStyle = "#fff"; mctx.lineWidth = 2; mctx.stroke();
    }
    function pintaJ() {
      if (!jctx) return 0;
      var w = cj.width, h = cj.height, img = jctx.createImageData(w, h), dentro = 0;
      for (var py = 0; py < h; py++) for (var px = 0; px < w; px++) {
        var za = JX0 + (JX1 - JX0) * px / w, zb = JY1 - (JY1 - JY0) * py / h, n = 0;
        while (n < MAXI && za * za + zb * zb <= 4) { var t = za * za - zb * zb + st.a; zb = 2 * za * zb + st.b; za = t; n++; }
        if (n >= MAXI) dentro++;
        color(img, (py * w + px) * 4, n);
      }
      jctx.putImageData(img, 0, 0);
      return dentro / (w * h);
    }
    function enM(c) { var za = 0, zb = 0, n = 0; while (n < 300 && za * za + zb * zb <= 4) { var t = za * za - zb * zb + c.a; zb = 2 * za * zb + c.b; za = t; n++; } return n >= 300; }
    function pinta() {
      pintaM();
      var frac = pintaJ(), dentro = enM(z(st.a, st.b));
      lectura.innerHTML = U.lec("Parámetro c", C.txt(z(st.a, st.b), 2), "red") +
        U.lec("¿c está en el conjunto de Mandelbrot?", dentro ? "sí" : "no", dentro ? "ok" : "red") +
        U.lec("Conjunto de Julia", dentro ? "conexo: una sola pieza" : "disperso: polvo de puntos", dentro ? "ok" : "red") +
        U.lec("Puntos que no escapan", fmt(frac * 100, 1) + " %");
      pie.innerHTML = "A la izquierda, el conjunto de Mandelbrot (arrastra el punto rojo para elegir <b>c</b>). A la derecha, el <b>conjunto de Julia de c</b>: los puntos z₀ cuya órbita z → z² + c no escapa al infinito (zona oscura); el color indica lo rápido que escapan los demás. Si c está dentro de Mandelbrot, el conjunto de Julia es de una sola pieza; si está fuera, se rompe en polvo.";
    }
    function elige(e) {
      var rc = cm.getBoundingClientRect(), px = (e.clientX - rc.left) / rc.width, py = (e.clientY - rc.top) / rc.height;
      st.a = Math.max(-1.5, Math.min(1.5, Math.round((MX0 + (MX1 - MX0) * px) * 100) / 100)); st.b = Math.max(-1.5, Math.min(1.5, Math.round((MY1 - (MY1 - MY0) * py) * 100) / 100));
      sA.set(st.a); sB.set(st.b); pinta();
    }
    var down = false;
    cm.addEventListener("pointerdown", function (e) { down = true; try { cm.setPointerCapture(e.pointerId); } catch (x) {} elige(e); });
    cm.addEventListener("pointermove", function (e) { if (down) elige(e); });
    cm.addEventListener("pointerup", function () { down = false; });
    cm.addEventListener("pointercancel", function () { down = false; });
    var PRE = [[-0.12, 0.74, "Conejo de Douady"], [0, 0, "Círculo (c = 0)"], [0, 1, "Dendrita (c = i)"], [-0.8, 0.16, "Dragón"], [-0.4, 0.6, "Galaxia"], [0.5, 0.55, "Polvo (c fuera)"]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "0", function (k) { var p = PRE[+k]; st.a = p[0]; st.b = p[1]; sA.set(p[0]); sB.set(p[1]); pinta(); });
    pinta();
  };
})(window);
