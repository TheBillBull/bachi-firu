/* ============================================================
   Bachi para Firu · Biología II, tema 3 (Lípidos)
   bio_acidograso: cinco ácidos grasos de 16–18 carbonos; dibujo de la cadena (los dobles enlaces cis «doblan» la cadena),
   datos (fórmula, masa molar, punto de fusión) y estado sólido/líquido a la temperatura que elijas.
   Estilos inyectados desde aquí. Los datos los recalcula herramientas/verificar_bio2_t3.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio3-estilos")) return;
    var s = document.createElement("style"); s.id = "bio3-estilos";
    s.textContent =
      ".bio3-svg{display:block;width:100%;max-width:560px;height:auto;margin:6px auto}" +
      ".bio3-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio3-svg .b3-cad{fill:none;stroke:var(--pen);stroke-width:3;stroke-linejoin:round;stroke-linecap:round}" +
      ".bio3-svg .b3-dob{fill:none;stroke:var(--red);stroke-width:3;stroke-linecap:round}" +
      ".bio3-svg .b3-cab{fill:var(--red-soft);stroke:var(--red);stroke-width:2}" +
      ".bio3-svg .b3-marco{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio3-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio3-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio3-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio3-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio3-veredicto.liq{border-color:var(--ok);background:var(--ok-soft)}" +
      "@media(max-width:520px){.bio3-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // clave, nombre, notación, nº de C, carbonos donde empieza cada doble enlace, fórmula, Mr, punto de fusión (°C), dónde está
  var ACIDOS = [
    { k: "pal", t: "Palmítico", nt: "C16:0", c: 16, d: [], f: "C₁₆H₃₂O₂", mr: 256.43, tf: 63, en: "aceite de palma, grasa animal" },
    { k: "est", t: "Esteárico", nt: "C18:0", c: 18, d: [], f: "C₁₈H₃₆O₂", mr: 284.48, tf: 70, en: "sebo, manteca de cacao" },
    { k: "ole", t: "Oleico", nt: "C18:1 Δ9", c: 18, d: [9], f: "C₁₈H₃₄O₂", mr: 282.47, tf: 13, en: "aceite de oliva" },
    { k: "lin", t: "Linoleico", nt: "C18:2 Δ9,12", c: 18, d: [9, 12], f: "C₁₈H₃₂O₂", mr: 280.45, tf: -5, en: "girasol (esencial, ω-6)" },
    { k: "lnc", t: "α-Linolénico", nt: "C18:3 Δ9,12,15", c: 18, d: [9, 12, 15], f: "C₁₈H₃₀O₂", mr: 278.44, tf: -11, en: "lino, nueces (esencial, ω-3)" }
  ];
  B.lab = B.lab || {};
  B.lab.acidosGrasos = ACIDOS;

  B.w.bio_acidograso = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ácidos grasos: forma, fórmula y estado");
    cuerpo.innerHTML = '<p class="w-intro">Elige un ácido graso y una temperatura. Cada doble enlace cis (en rojo) dobla la cadena: así se empaquetan peor y funden antes.</p>' +
      '<div data-ac></div><div data-ctl></div><div class="bio3-dibujo"></div><div class="bio3-dato"></div><div class="bio3-veredicto"></div>' +
      '<p class="w-pie">Puntos de fusión de tablas habituales (varían 1–2 °C según la fuente). Nº de H = 2·C − 2·(dobles enlaces).</p>';
    var cur = ACIDOS[2], temp = 20;
    U.fichas(cuerpo.querySelector("[data-ac]"), ACIDOS.map(function (a) { return { k: a.k, t: a.t }; }), cur.k, function (k) {
      cur = ACIDOS.filter(function (a) { return a.k === k; })[0]; pinta();
    });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Temperatura", min: -20, max: 80, step: 1, val: temp, fmt: function (v) { return Math.round(v) + " °C"; }, on: function (v) { temp = v; pinta(); } });
    var dib = cuerpo.querySelector(".bio3-dibujo"), dat = cuerpo.querySelector(".bio3-dato"), ver = cuerpo.querySelector(".bio3-veredicto");

    function pinta() {
      var n = cur.c, paso = 22, off = 0, pts = [], dob = "", i;
      for (i = 1; i <= n; i++) {
        if (i > 1 && cur.d.indexOf(i - 1) >= 0) off = off ? 0 : 1;      // tras un doble enlace cis la cadena se desvía
        pts.push([30 + (i - 1) * paso, 40 + (i % 2 ? 0 : 14) + off * 30]);
      }
      for (i = 1; i < n; i++) {
        if (cur.d.indexOf(i) >= 0) dob += '<line class="b3-dob" x1="' + pts[i - 1][0] + '" y1="' + (pts[i - 1][1] + 6) + '" x2="' + pts[i][0] + '" y2="' + (pts[i][1] + 6) + '"/>';
      }
      var ancho = 30 + (n - 1) * paso + 36;
      dib.innerHTML = '<svg class="bio3-svg" viewBox="0 0 ' + ancho + ' 120" role="img" aria-label="Cadena de ácido ' + cur.t + '"><rect class="b3-marco" x="2" y="2" width="' + (ancho - 4) + '" height="116" rx="12"/>' +
        '<polyline class="b3-cad" points="' + pts.map(function (p) { return p[0] + "," + p[1]; }).join(" ") + '"/>' + dob +
        '<circle class="b3-cab" cx="' + pts[0][0] + '" cy="' + pts[0][1] + '" r="9"/>' +
        '<text x="22" y="22">COOH</text>' +
        '<text x="' + (pts[n - 1][0] - 8) + '" y="' + (pts[n - 1][1] + 28) + '">CH₃</text></svg>';
      var liquido = temp >= cur.tf, nd = cur.d.length;
      dat.innerHTML = "<div><b>Notación</b>" + cur.nt + "</div><div><b>Fórmula</b>" + cur.f + "</div>" +
        "<div><b>Masa molar</b>" + B.fmt(cur.mr, 2) + " g/mol</div><div><b>Dobles enlaces</b>" + nd + (nd ? " (insaturado)" : " (saturado)") + "</div>" +
        "<div><b>Punto de fusión</b>" + cur.tf + " °C</div><div><b>Dónde está</b>" + cur.en + "</div>";
      ver.className = "bio3-veredicto" + (liquido ? " liq" : "");
      ver.textContent = "A " + Math.round(temp) + " °C el ácido " + cur.t.toLowerCase() + " es " + (liquido ? "LÍQUIDO" : "SÓLIDO") + " (funde a " + cur.tf + " °C). " +
        (nd === 0 ? "Su cadena es recta y encaja con las vecinas: hace falta mucha temperatura para separarlas."
          : "Con " + nd + (nd > 1 ? " dobles enlaces cis" : " doble enlace cis") + " la cadena está doblada y se empaqueta mal: funde antes.");
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
