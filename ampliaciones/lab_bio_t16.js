/* ============================================================
   Bachi para Firu · Biología II, tema 16 (Evolución)
   bio_hw: equilibrio de Hardy-Weinberg: eliges q (frecuencia del alelo a) y ves p², 2pq y q².
   bio_deriva: deriva genética y selección: 5 poblaciones simuladas (muestreo al azar de 2N alelos cada generación)
               frente a la curva sin azar (población infinita).
   Estilos inyectados desde aquí. Los números del modelo los recalcula herramientas/verificar_bio2_t16.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio16-estilos")) return;
    var s = document.createElement("style"); s.id = "bio16-estilos";
    s.textContent =
      ".bio16-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio16-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio16-dato b{display:block;font-size:12px;color:var(--ink-faint);letter-spacing:.03em}" +
      ".bio16-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio16-barras{margin:10px 0}" +
      ".bio16-fila{display:grid;grid-template-columns:104px 1fr 64px;gap:8px;align-items:center;margin:5px 0;font-size:14px;color:var(--ink)}" +
      ".bio16-pista{height:20px;border-radius:6px;background:var(--sheet-2);border:1.5px solid var(--line);overflow:hidden}" +
      ".bio16-pista i{display:block;height:100%;background:var(--pen)}" +
      ".bio16-pista i.het{background:var(--ok)}" +
      ".bio16-pista i.rec{background:var(--red)}" +
      ".bio16-fila span:last-child{text-align:right;font-variant-numeric:tabular-nums}" +
      ".bio16-svg{display:block;width:100%;max-width:520px;height:auto;margin:6px auto}" +
      ".bio16-svg text{font:600 11px var(--body,sans-serif);fill:var(--ink-faint)}" +
      ".bio16-svg .eje{stroke:var(--ink-faint);stroke-width:1.5;fill:none}" +
      ".bio16-svg .rej{stroke:var(--line);stroke-width:1;fill:none}" +
      ".bio16-svg .pob{fill:none;stroke-width:2;stroke-linejoin:round}" +
      ".bio16-svg .esp{fill:none;stroke:var(--ink);stroke-width:2.5;stroke-dasharray:6 4}" +
      ".bio16-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.bio16-chips .chip-btn,.bio16-gr+.bio16-dato{white-space:normal;max-width:100%}" +
      "@media(max-width:520px){.bio16-dato{grid-template-columns:1fr}.bio16-fila{grid-template-columns:86px 1fr 58px}}";
    document.head.appendChild(s);
  })();

  function pc(x, d) { return B.fmt(x * 100, d == null ? 2 : d) + " %"; }

  // ------------------------------------------------------------------ HARDY-WEINBERG
  B.w.bio_hw = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Hardy-Weinberg: de las frecuencias de los alelos a las de los genotipos");
    cuerpo.innerHTML = '<p class="w-intro">Un gen con dos alelos: <b>A</b> (dominante, frecuencia p) y <b>a</b> (recesivo, frecuencia q), con p + q = 1. Mueve q y mira qué proporción de la población tendrá cada genotipo si se cumple el equilibrio.</p>' +
      '<div class="bio16-chips" data-ch></div><div data-ctl></div><div class="bio16-barras"></div><div class="bio16-dato"></div><div class="bio16-veredicto"></div>' +
      '<p class="w-pie">Fórmulas: p² (AA) + 2pq (Aa) + q² (aa) = 1. Los portadores son los heterocigotos Aa, que no muestran la enfermedad recesiva.</p>';
    var q = 0.5;
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "q (alelo a)", min: 0, max: 1, step: 0.001, val: q, fmt: function (v) { return B.fmt(v, 3); }, on: function (v) { q = v; pinta(); } });
    var ch = cuerpo.querySelector("[data-ch]");
    [["q = 0,5", 0.5], ["Fibrosis quística (1/2500)", 0.02], ["Albinismo (≈ 1/20 000)", 0.007]].forEach(function (c) {
      var b = document.createElement("button"); b.type = "button"; b.className = "chip-btn"; b.textContent = c[0];
      b.addEventListener("click", function () { q = c[1]; sl.set(q); pinta(); });
      ch.appendChild(b);
    });
    var bar = cuerpo.querySelector(".bio16-barras"), dat = cuerpo.querySelector(".bio16-dato"), ver = cuerpo.querySelector(".bio16-veredicto");
    function pinta() {
      var p = 1 - q, f = [["AA", p * p, ""], ["Aa (portadores)", 2 * p * q, "het"], ["aa (enfermos)", q * q, "rec"]];
      bar.innerHTML = f.map(function (r) {
        return '<div class="bio16-fila"><span>' + r[0] + '</span><span class="bio16-pista"><i class="' + r[2] + '" style="width:' + (r[1] * 100).toFixed(2) + '%"></i></span><span>' + pc(r[1]) + "</span></div>";
      }).join("");
      var uno = q * q > 0 ? "1 de cada " + B.fmt(Math.round(1 / (q * q)), 0) : "ninguno";
      dat.innerHTML = "<div><b>p (alelo A)</b>" + B.fmt(p, 3) + "</div><div><b>q (alelo a)</b>" + B.fmt(q, 3) + "</div>" +
        "<div><b>Heterocigotos 2pq</b>" + pc(2 * p * q) + "</div><div><b>Personas aa</b>" + uno + "</div>";
      var msg;
      if (q < 0.001 || q > 0.999) msg = "Un alelo casi ha desaparecido: casi toda la población es del mismo genotipo.";
      else if (Math.abs(q - 0.5) < 0.0005) msg = "Con q = 0,5 hay el máximo de heterocigotos (50 %): la variabilidad es la mayor posible.";
      else if (q < 0.1) msg = "Con un alelo recesivo raro, casi todos los que lo llevan son portadores sanos: hay muchos más Aa que aa (2pq frente a q²).";
      else msg = "Mientras no actúen la selección, la deriva, la migración ni las mutaciones, estas proporciones se mantienen igual generación tras generación.";
      ver.textContent = msg;
    }
    pinta();
  };

  // ------------------------------------------------------------------ DERIVA Y SELECCIÓN
  var G = 40, NPOB = 5, Q0 = 0.5;
  function mulberry(sem) { var a = sem >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  // selección contra el genotipo aa (eficacia 1 - s): q' = q(1 - s q) / (1 - s q²)
  function paso(q, s) { return q * (1 - s * q) / (1 - s * q * q); }
  function curva(s) { var r = [Q0], q = Q0, i; for (i = 0; i < G; i++) { q = paso(q, s); r.push(q); } return r; }

  B.w.bio_deriva = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Deriva genética y selección natural");
    cuerpo.innerHTML = '<p class="w-intro">Cinco poblaciones empiezan con q = 0,5 para el alelo recesivo <b>a</b>. Cada generación se toman al azar 2N alelos de la anterior (deriva). La línea discontinua es lo que pasaría con una población enorme (sin azar). Con s &gt; 0, el genotipo aa tiene eficacia 1 − s (selección contra aa).</p>' +
      '<div data-ctl></div><div class="bio16-gr"></div><div class="bio16-dato"></div><div class="bio16-veredicto"></div><div data-bt></div>' +
      '<p class="w-pie">Modelo simplificado: población diploide de tamaño constante N, generaciones separadas, apareamiento al azar, 40 generaciones.</p>';
    var N = 20, s = 0, sem = 1;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    U.slider(ctl, { et: "Individuos N", min: 5, max: 1000, step: 5, val: N, fmt: function (v) { return B.fmt(v, 0); }, on: function (v) { N = v; pinta(); } });
    U.slider(ctl, { et: "Selección s", min: 0, max: 1, step: 0.05, val: s, fmt: function (v) { return B.fmt(v, 2); }, on: function (v) { s = v; pinta(); } });
    U.boton(cuerpo.querySelector("[data-bt]"), "Otra simulación", function () { sem++; pinta(); }, "chip-btn");
    var gr = cuerpo.querySelector(".bio16-gr"), dat = cuerpo.querySelector(".bio16-dato"), ver = cuerpo.querySelector(".bio16-veredicto");
    var COL = ["var(--pen)", "var(--red)", "var(--ok)", "#b8860b", "#8e44ad"];
    function pinta() {
      var rnd = mulberry(sem * 7919 + N * 31 + Math.round(s * 100)), X0 = 34, X1 = 308, Y0 = 160, Y1 = 12, i, g, k;
      function xs(t) { return (X0 + (X1 - X0) * t / G).toFixed(1); }
      function ys(v) { return (Y0 - (Y0 - Y1) * v).toFixed(1); }
      var svg = '<svg class="bio16-svg" viewBox="0 0 320 190" role="img" aria-label="Frecuencia del alelo a a lo largo de 40 generaciones en 5 poblaciones">';
      [0, 0.25, 0.5, 0.75, 1].forEach(function (v) { svg += '<line class="rej" x1="' + X0 + '" x2="' + X1 + '" y1="' + ys(v) + '" y2="' + ys(v) + '"/><text x="' + (X0 - 5) + '" y="' + (+ys(v) + 4) + '" text-anchor="end">' + B.fmt(v, v === 0 || v === 1 ? 0 : 2) + "</text>"; });
      [0, 10, 20, 30, 40].forEach(function (t) { svg += '<text x="' + xs(t) + '" y="176" text-anchor="middle">' + t + "</text>"; });
      svg += '<text x="' + ((X0 + X1) / 2) + '" y="188" text-anchor="middle">generaciones</text><path class="eje" d="M' + X0 + " " + Y1 + "V" + Y0 + "H" + X1 + '"/>';
      var fij = 0, per = 0, suma = 0;
      for (k = 0; k < NPOB; k++) {
        var q = Q0, pts = [xs(0) + "," + ys(q)];
        for (g = 1; g <= G; g++) {
          var qs = paso(q, s), c = 0;
          for (i = 0; i < 2 * N; i++) if (rnd() < qs) c++;
          q = c / (2 * N); pts.push(xs(g) + "," + ys(q));
        }
        if (q >= 1) fij++; else if (q <= 0) per++;
        suma += q;
        svg += '<polyline class="pob" style="stroke:' + COL[k] + '" points="' + pts.join(" ") + '"/>';
      }
      var det = curva(s), pd = det.map(function (v, t) { return xs(t) + "," + ys(v); }).join(" ");
      svg += '<polyline class="esp" points="' + pd + '"/></svg>';
      gr.innerHTML = svg;
      var qd = det[G];
      dat.innerHTML = "<div><b>Sin azar (N infinito), q en la generación 40</b>" + B.fmt(qd, 3) + "</div><div><b>q medio de las 5 poblaciones</b>" + B.fmt(suma / NPOB, 3) + "</div>" +
        "<div><b>Alelo a fijado (q = 1)</b>" + fij + " de " + NPOB + "</div><div><b>Alelo a perdido (q = 0)</b>" + per + " de " + NPOB + "</div>";
      var msg;
      if (s === 0 && N >= 500) msg = "Población grande y sin selección: las líneas se quedan cerca de 0,5. La deriva casi no se nota.";
      else if (s === 0) msg = "Sin selección, las frecuencias cambian solo por azar: cada población va a un sitio distinto y, en las pequeñas, un alelo acaba fijándose y el otro desapareciendo.";
      else if (N >= 500) msg = "Con selección en contra de aa y población grande, todas las líneas siguen la curva discontinua: q baja de forma previsible.";
      else msg = "Selección y deriva a la vez: la tendencia general es bajar, pero en poblaciones pequeñas el azar puede dominar y alguna se aparta de la curva.";
      ver.textContent = msg;
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
