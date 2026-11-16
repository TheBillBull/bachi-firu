/* ============================================================
   Bachi para Firu · Biología II, tema 1 (Bioelementos y biomoléculas inorgánicas)
   bio_osmosis: una célula (animal o vegetal) en una disolución de NaCl que tú eliges.
   bio_ph: escala de pH (logarítmica) + comparación agua pura frente a sangre (sistema tampón) al añadir ácido.
   Estilos inyectados desde aquí. Los números del modelo los recalcula herramientas/verificar_bio2_t1.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio1-estilos")) return;
    var s = document.createElement("style"); s.id = "bio1-estilos";
    s.textContent =
      ".bio1-svg{display:block;width:100%;max-width:420px;height:auto;margin:6px auto}" +
      ".bio1-svg text{font:600 12px var(--body,sans-serif);fill:var(--ink)}" +
      ".bio1-svg .b1-cel{fill:var(--pen-soft);stroke:var(--pen);stroke-width:3}" +
      ".bio1-svg .b1-mal{fill:var(--red-soft);stroke:var(--red);stroke-width:3;stroke-dasharray:6 4}" +
      ".bio1-svg .b1-pared{fill:none;stroke:var(--ink-faint);stroke-width:7}" +
      ".bio1-svg .b1-agua{fill:none;stroke:var(--pen);stroke-width:2.5}" +
      ".bio1-svg .b1-med{fill:var(--sheet-2);stroke:var(--line);stroke-width:1.5}" +
      ".bio1-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio1-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio1-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio1-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio1-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio1-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio1-escala{position:relative;height:26px;border-radius:13px;margin:14px 4px 22px;border:1.5px solid var(--line);" +
      "background:linear-gradient(90deg,#d6453d 0%,#e8903c 22%,#e9d54a 40%,#6dbf67 50%,#3f9fc9 65%,#3b5bb5 85%,#5a3a9e 100%)}" +
      ".bio1-escala i{position:absolute;top:-8px;width:4px;height:40px;background:var(--ink);border-radius:2px;transform:translateX(-2px)}" +
      ".bio1-escala span{position:absolute;top:30px;font-size:11px;color:var(--ink-faint);transform:translateX(-50%)}" +
      "@media(max-width:520px){.bio1-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // ------------------------------------------------------------------ ÓSMOSIS
  var MR_NACL = 58.44;          // g/mol (Na 22,99 + Cl 35,45)
  var OSM_CELULA = 308;         // mOsm/L: lo que hay dentro (equivale a NaCl al 0,9 %)
  function osmNaCl(pc) { return pc * 10 / MR_NACL * 2 * 1000; }   // % p/v → mOsm/L (i = 2: Na⁺ y Cl⁻)

  B.w.bio_osmosis = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Una célula en una disolución de sal");
    cuerpo.innerHTML = '<p class="w-intro">Elige el tipo de célula y mueve la concentración de NaCl del exterior. Dentro de la célula hay lo equivalente a NaCl al 0,9 %.</p>' +
      '<div data-tipo></div><div data-ctl></div><div class="bio1-dibujo"></div><div class="bio1-dato"></div><div class="bio1-veredicto"></div><p class="w-pie">Modelo simplificado: el volumen cambia hasta igualar concentraciones (V = 308 / concentración exterior).</p>';
    var tipo = "animal", pc = 0.9;
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "animal", t: "Glóbulo rojo (animal)" }, { k: "vegetal", t: "Célula vegetal" }], tipo, function (k) { tipo = k; pinta(); });
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "NaCl fuera", min: 0, max: 3, step: 0.05, val: pc, fmt: function (v) { return B.fmt(v, 2) + "%"; }, on: function (v) { pc = v; pinta(); } });
    var dib = cuerpo.querySelector(".bio1-dibujo"), dat = cuerpo.querySelector(".bio1-dato"), ver = cuerpo.querySelector(".bio1-veredicto");

    function estrella(cx, cy, r) {
      var p = [], i;
      for (i = 0; i < 24; i++) { var a = i * Math.PI / 12, rr = i % 2 ? r * 0.82 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1)); }
      return '<polygon class="b1-cel" points="' + p.join(" ") + '"/>';
    }
    function pinta() {
      var osm = osmNaCl(pc), rel = osm / OSM_CELULA, medio, v = pc < 0.01 ? 99 : OSM_CELULA / osm, flecha = "", svg = "", msg, cls = "";
      if (rel < 0.95) medio = "hipotónico"; else if (rel > 1.05) medio = "hipertónico"; else medio = "isotónico";
      var base = '<svg class="bio1-svg" viewBox="0 0 300 180" role="img" aria-label="Célula en disolución"><rect class="b1-med" x="4" y="4" width="292" height="172" rx="14"/>';
      if (tipo === "animal") {
        if (medio === "hipotónico") flecha = "El agua ENTRA en la célula.";
        else if (medio === "hipertónico") flecha = "El agua SALE de la célula.";
        else flecha = "Entra y sale la misma cantidad de agua.";
        if (v >= 1.6) {
          svg = '<circle class="b1-mal" cx="150" cy="90" r="74"/><text x="150" y="86" text-anchor="middle">¡se rompe!</text><text x="150" y="104" text-anchor="middle">(hemólisis)</text>';
          msg = "Hemólisis: entra tanta agua que la membrana no aguanta y el glóbulo estalla."; cls = " mal";
        } else {
          var r = Math.min(74, 48 * Math.sqrt(v));
          svg = v < 0.85 ? estrella(150, 90, r) : '<circle class="b1-cel" cx="150" cy="90" r="' + r.toFixed(1) + '"/>';
          if (v < 0.85) { msg = "Crenación: la célula pierde agua, se arruga y se encoge (aspecto «de erizo»)."; cls = " mal"; }
          else if (medio === "isotónico") { msg = "Medio isotónico: el glóbulo conserva su forma y su volumen. Por eso el suero fisiológico es NaCl al 0,9 %."; cls = " ok"; }
          else if (medio === "hipotónico") msg = "Medio hipotónico: la célula se hincha porque entra agua. Aún aguanta, pero un poco más de agua y estallaría.";
          else msg = "Medio hipertónico: sale agua y la célula se encoge.";
        }
      } else {
        var s = Math.min(1, v), w = 120, h = 96, pw = w * Math.sqrt(s), ph = h * Math.sqrt(s);
        svg = '<rect class="b1-pared" x="' + (150 - w / 2 - 4) + '" y="' + (90 - h / 2 - 4) + '" width="' + (w + 8) + '" height="' + (h + 8) + '" rx="6"/>' +
          '<rect class="b1-cel" x="' + (150 - pw / 2).toFixed(1) + '" y="' + (90 - ph / 2).toFixed(1) + '" width="' + pw.toFixed(1) + '" height="' + ph.toFixed(1) + '" rx="10"/>';
        if (medio === "hipotónico") { flecha = "El agua ENTRA en la célula."; msg = "Turgencia: la vacuola se llena y el protoplasto empuja contra la pared celular, que no deja que estalle. Así se mantiene firme la planta."; cls = " ok"; }
        else if (medio === "hipertónico") { flecha = "El agua SALE de la célula."; msg = "Plasmólisis: el protoplasto se encoge y se separa de la pared celular. La planta se marchita."; cls = " mal"; }
        else { flecha = "Entra y sale la misma cantidad de agua."; msg = "Medio isotónico: célula flácida, sin presión contra la pared (la planta pierde firmeza)."; }
      }
      dib.innerHTML = base + svg + "</svg>";
      dat.innerHTML = '<div><b>Concentración exterior</b>' + B.fmt(osm, 0) + " mOsm/L</div><div><b>Interior de la célula</b>" + OSM_CELULA + " mOsm/L</div><div><b>El exterior es</b>" + medio + "</div><div><b>Flujo neto de agua</b>" + flecha + "</div>";
      ver.className = "bio1-veredicto" + cls;
      ver.textContent = msg;
    }
    pinta();
  };

  // ------------------------------------------------------------------ pH Y TAMPÓN
  function f2(x) { return x.toFixed(2).replace(".", ","); }
  function sup(n) { var m = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" }; return String(n).split("").map(function (c) { return m[c]; }).join(""); }
  function sci(x) {
    var e = Math.floor(Math.log(x) / Math.LN10 + 1e-12), m = x / Math.pow(10, e);
    if (m >= 9.995) { m = 1; e++; }
    return f2(m) + " · 10" + sup(e) + " mol/L";
  }
  var EJEMPLOS = [[0.5, "ácido de batería"], [1.5, "jugo gástrico"], [2.5, "zumo de limón"], [4.5, "tomate"], [5, "café"], [6.5, "saliva"], [7, "agua pura"], [7.4, "sangre"], [8.3, "bicarbonato"], [10.5, "amoníaco doméstico"], [12.5, "lejía"]];
  function cercano(ph) { var mejor = EJEMPLOS[0]; EJEMPLOS.forEach(function (e) { if (Math.abs(e[0] - ph) < Math.abs(mejor[0] - ph)) mejor = e; }); return mejor; }
  // tampón bicarbonato: pH = 6,1 + log([HCO3-] / [CO2 disuelto]); 24 mmol/L y 1,2 mmol/L (pulmones mantienen el CO2)
  function phTampon(x) { return 6.1 + Math.log((24 - x) / 1.2) / Math.LN10; }
  function phAgua(x) { return -Math.log(1e-7 + x * 1e-3) / Math.LN10; }

  B.w.bio_ph = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La escala de pH y el sistema tampón");
    cuerpo.innerHTML = '<p class="w-intro">Mueve el pH y mira cuántos iones H⁺ hay. Cada unidad de pH es multiplicar o dividir por 10.</p>' +
      '<div data-ctl></div><div class="bio1-escala"></div><div class="bio1-dato" data-a></div>' +
      '<h5 style="margin:14px 0 4px">¿Qué pasa si añades ácido?</h5><p class="w-intro">Echamos HCl (mM = mmol por litro) en agua pura y en sangre, que lleva un tampón bicarbonato (24 mmol/L de HCO₃⁻ y 1,2 mmol/L de CO₂ disuelto).</p>' +
      '<div data-ctl2></div><div class="bio1-dato" data-b></div><div class="bio1-veredicto"></div>';
    var ph = 7.4, x = 0.5;
    var esc = cuerpo.querySelector(".bio1-escala"), da = cuerpo.querySelector("[data-a]"), db = cuerpo.querySelector("[data-b]"), ver = cuerpo.querySelector(".bio1-veredicto");
    esc.innerHTML = '<i></i>' + [0, 7, 14].map(function (n) { return '<span style="left:' + (n / 14 * 100) + '%">' + n + "</span>"; }).join("");
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "pH", min: 0, max: 14, step: 0.1, val: ph, fmt: function (v) { return B.fmt(v, 1); }, on: function (v) { ph = v; pintaA(); } });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl2]")), { et: "HCl", min: 0, max: 5, step: 0.1, val: x, fmt: function (v) { return B.fmt(v, 1) + " mM"; }, on: function (v) { x = v; pintaB(); } });
    function pintaA() {
      esc.querySelector("i").style.left = (ph / 14 * 100) + "%";
      var tipo = ph < 6.95 ? "ácido" : (ph > 7.05 ? "básico" : "neutro"), e = cercano(ph);
      da.innerHTML = "<div><b>[H⁺]</b>" + sci(Math.pow(10, -ph)) + "</div><div><b>[OH⁻]</b>" + sci(Math.pow(10, -(14 - ph))) + "</div><div><b>La disolución es</b>" + tipo + "</div><div><b>Se parece a</b>" + e[1] + " (pH " + B.fmt(e[0], 1) + ")</div>";
    }
    function pintaB() {
      var a = phAgua(x), t = phTampon(x);
      db.innerHTML = "<div><b>Agua pura</b>pH " + f2(a) + "</div><div><b>Sangre (tampón)</b>pH " + f2(t) + "</div>";
      ver.className = "bio1-veredicto" + (t < 7.35 ? " mal" : " ok");
      ver.textContent = x === 0 ? "Sin ácido: el agua tiene pH 7 y la sangre 7,40."
        : "El agua cambia " + f2(7 - a) + " unidades de pH; la sangre solo " + f2(7.4 - t) + ". El bicarbonato capta los H⁺ que sobran: eso es un tampón.";
    }
    pintaA(); pintaB();
  };
})(typeof window !== "undefined" ? window : this);
