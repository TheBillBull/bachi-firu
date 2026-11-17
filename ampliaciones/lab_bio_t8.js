/* ============================================================
   Bachi para Firu · Biología II, tema 8 (Catabolismo: la respiración celular)
   bio_ruta: las cuatro etapas de la respiración de la glucosa, con el lugar de la célula y lo que se acumula.
   bio_atp: balance de ATP (glucosa o ácido graso), con el criterio 30/32 o 36/38, la lanzadera y la fermentación.
   bio_cadena: la cadena respiratoria con inhibidores (rotenona, antimicina, cianuro, oligomicina, DNP).
   Estilos inyectados desde aquí. Las cifras las recalcula herramientas/verificar_bio2_t8.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio8-estilos")) return;
    var s = document.createElement("style"); s.id = "bio8-estilos";
    s.textContent =
      ".bio8-zonas{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio8-zonas div{padding:8px 6px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:13px;color:var(--ink-faint);text-align:center;line-height:1.3}" +
      ".bio8-zonas div.on{border-color:var(--pen);background:var(--pen-soft);color:var(--ink);font-weight:600}" +
      ".bio8-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio8-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio8-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio8-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio8-veredicto.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".bio8-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio8-tab{width:100%;table-layout:fixed;overflow-wrap:anywhere;border-collapse:collapse;margin:8px 0;font-size:14px;color:var(--ink)}" +
      ".bio8-tab th,.bio8-tab td{border:1.5px solid var(--line);padding:5px 8px;text-align:center}" +
      ".bio8-tab th{background:var(--sheet-2);font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-faint)}" +
      ".bio8-tab td:first-child{text-align:left;width:34%}" +
      ".bio8-tab tr.tot td{font-weight:700;background:var(--pen-soft)}" +
      ".bio8-med{margin:6px 0}" +
      ".bio8-med span{display:block;font-size:13px;color:var(--ink-faint);margin-top:6px}" +
      ".bio8-bar{height:16px;border:1.5px solid var(--line);border-radius:8px;background:var(--sheet);overflow:hidden}" +
      ".bio8-bar i{display:block;height:100%;background:var(--pen)}" +
      "@media(max-width:520px){.bio8-tab{font-size:12px}.bio8-tab th,.bio8-tab td{padding:4px 3px}.bio8-tab th{font-size:10px;letter-spacing:0}.bio8-dato{grid-template-columns:1fr}.bio8-zonas{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function num(x) { return B.fmt(x, Math.abs(x - Math.round(x)) < 1e-9 ? 0 : 1); }

  // ------------------------------------------------------------------ RUTA: cuatro etapas
  // Acumulado por molécula de glucosa (aerobia): [NADH, FADH2, ATP directo, CO2]
  var ETAPAS = [
    { k: "glu", t: "1 · Glucólisis", zona: 0, lugar: "Citoplasma (hialoplasma)", entra: "1 glucosa (6 C), 2 ATP, 2 NAD⁺, 4 ADP",
      sale: "2 piruvato (3 C), 4 ATP (2 netos), 2 NADH", acum: [2, 0, 2, 0], o2: "No necesita O₂",
      nota: "Se gastan 2 ATP al principio y se forman 4 al final: ganancia neta de 2 ATP." },
    { k: "pdh", t: "2 · Descarboxilación oxidativa", zona: 1, lugar: "Matriz mitocondrial", entra: "2 piruvato, 2 CoA, 2 NAD⁺ (el piruvato entra desde el citoplasma)",
      sale: "2 acetil-CoA (2 C), 2 CO₂, 2 NADH", acum: [4, 0, 2, 2], o2: "No usa O₂ directamente, pero depende de él",
      nota: "Cada piruvato pierde un carbono como CO₂: de 3 C a 2 C." },
    { k: "kre", t: "3 · Ciclo de Krebs", zona: 1, lugar: "Matriz mitocondrial", entra: "2 acetil-CoA, 6 NAD⁺, 2 FAD, 2 ADP (dos vueltas)",
      sale: "4 CO₂, 6 NADH, 2 FADH₂, 2 ATP (o GTP)", acum: [10, 2, 4, 6], o2: "No usa O₂ directamente, pero depende de él",
      nota: "Con esta etapa la glucosa ya está oxidada del todo: sus 6 C han salido como 6 CO₂." },
    { k: "cad", t: "4 · Cadena respiratoria", zona: 2, lugar: "Membrana mitocondrial interna (crestas)", entra: "10 NADH, 2 FADH₂, 6 O₂, ADP + Pi",
      sale: "6 H₂O, NAD⁺ y FAD regenerados, ATP por fosforilación oxidativa", acum: [10, 2, 4, 6], o2: "Aquí se consume el O₂ (aceptor final)",
      nota: "Aquí se fabrica la mayor parte del ATP: 28 (criterio 30/32) o 34 (criterio 36/38) de los totales." }
  ];

  B.w.bio_ruta = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "De la glucosa al ATP, etapa a etapa");
    cuerpo.innerHTML = '<p class="w-intro">Pulsa cada etapa. Se muestran el lugar de la célula, lo que entra y sale, y lo que llevas acumulado <b>por cada molécula de glucosa</b>.</p>' +
      '<div data-fich></div><div class="bio8-zonas"><div>Citoplasma</div><div>Matriz mitocondrial</div><div>Membrana interna</div></div>' +
      '<div class="bio8-dato" data-d></div><div class="bio8-veredicto"></div><p class="w-pie">Cifras por glucosa, respiración aerobia completa. Los coenzimas reducidos (NADH, FADH₂) se «cobran» en la etapa 4.</p>';
    var zonas = cuerpo.querySelectorAll(".bio8-zonas div"), dat = cuerpo.querySelector("[data-d]"), ver = cuerpo.querySelector(".bio8-veredicto");
    function pinta(k) {
      var e = ETAPAS.filter(function (x) { return x.k === k; })[0];
      Array.prototype.forEach.call(zonas, function (z, i) { z.className = i === e.zona ? "on" : ""; });
      dat.innerHTML = "<div><b>Lugar</b>" + e.lugar + "</div><div><b>Oxígeno</b>" + e.o2 + "</div><div><b>Entra</b>" + e.entra + "</div><div><b>Sale</b>" + e.sale + "</div>" +
        "<div><b>Acumulado hasta aquí</b>NADH " + e.acum[0] + " · FADH₂ " + e.acum[1] + "</div><div><b>ATP directos y CO₂</b>ATP " + e.acum[2] + " · CO₂ " + e.acum[3] + "</div>";
      ver.textContent = e.nota;
    }
    U.fichas(cuerpo.querySelector("[data-fich]"), ETAPAS.map(function (e) { return { k: e.k, t: e.t }; }), "glu", pinta);
    pinta("glu");
  };

  // ------------------------------------------------------------------ BALANCE DE ATP
  var DG_GLUCOSA = 2870, DG_ATP = 30.5;      // kJ/mol (valores de referencia)
  function balance(o) {
    var vN = o.conv === "clas" ? 3 : 2.5, vF = o.conv === "clas" ? 2 : 1.5, r;
    if (o.sust === "glu") {
      if (o.dest === "lac") return { filas: [["Glucólisis", 2, 0, 2]], total: 2, co2: 0, o2: 0, c: 6, nota: "Sin O₂ el piruvato se reduce a lactato y regenera el NAD⁺ (los 2 NADH se gastan aquí): solo cuentan los 2 ATP de la glucólisis.", fer: true };
      if (o.dest === "alc") return { filas: [["Glucólisis", 2, 0, 2]], total: 2, co2: 2, o2: 0, c: 6, nota: "Sin O₂ el piruvato da etanol + CO₂ y regenera el NAD⁺ (los 2 NADH se gastan aquí): solo cuentan los 2 ATP de la glucólisis.", fer: true };
      var nc = o.lanz === "glic" ? vF : vN;
      var tot = 4 + 8 * vN + 2 * nc + 2 * vF;
      return { filas: [["Glucólisis", 2, 0, 2], ["Descarboxilación oxidativa", 2, 0, 0], ["Ciclo de Krebs", 6, 2, 2]], total: tot, co2: 6, o2: 6, c: 6,
        nota: o.lanz === "glic" ? "Lanzadera del glicerol-fosfato (músculo, cerebro): los 2 NADH del citoplasma entregan sus electrones a FAD y valen como FADH₂." : "Lanzadera malato-aspartato (hígado, corazón): los 2 NADH del citoplasma entran como NADH y valen igual que los demás.", fer: false };
    }
    var n = o.n, a = n / 2, c = a - 1;
    r = { filas: [["Activación", 0, 0, -2], ["β-oxid. (" + c + " vueltas)", c, c, 0], ["Krebs (" + a + " acetil)", 3 * a, a, a]], co2: n, o2: 3 * n / 2 - 1, c: n,
      nota: "Cada vuelta de la β-oxidación recorta 2 C (un acetil-CoA) y da 1 NADH y 1 FADH₂. La activación gasta el equivalente a 2 ATP." , fer: false };
    r.total = -2 + a + (c + 3 * a) * vN + (c + a) * vF;
    return r;
  }

  B.w.bio_atp = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Balance de ATP: elige combustible y criterio");
    cuerpo.innerHTML = '<p class="w-intro">Elige el combustible, el criterio de los libros y, en la glucosa, la lanzadera y si hay oxígeno. Las cifras salen de contar coenzimas.</p>' +
      '<div data-sust></div><div data-ctl></div><div data-dest></div><div data-conv></div><div data-lanz></div><div data-tabla></div><div class="bio8-dato" data-d></div><div class="bio8-veredicto"></div>' +
      '<p class="w-pie">Criterio 30/32: 2,5 ATP por NADH y 1,5 por FADH₂ (10 H⁺ y 6 H⁺ bombeados; 4 H⁺ por ATP). Criterio 36/38: 3 y 2. ΔG° de la glucosa ≈ −2870 kJ/mol; ATP ≈ 30,5 kJ/mol.</p>';
    var o = { sust: "glu", n: 16, conv: "mod", lanz: "mal", dest: "aer" };
    var sl = U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "Carbonos", min: 8, max: 24, step: 2, val: 16, fmt: function (v) { return B.fmt(v, 0) + " C"; }, on: function (v) { o.n = Math.round(v); pinta(); } });
    var ctlWrap = cuerpo.querySelector("[data-ctl]"), dest = cuerpo.querySelector("[data-dest]"), conv = cuerpo.querySelector("[data-conv]"), lanz = cuerpo.querySelector("[data-lanz]");
    U.fichas(cuerpo.querySelector("[data-sust]"), [{ k: "glu", t: "Glucosa" }, { k: "aci", t: "Ácido graso" }], "glu", function (k) { o.sust = k; pinta(); });
    U.fichas(dest, [{ k: "aer", t: "Con O₂ (respiración)" }, { k: "lac", t: "Fermentación láctica" }, { k: "alc", t: "Fermentación alcohólica" }], "aer", function (k) { o.dest = k; pinta(); });
    U.fichas(conv, [{ k: "mod", t: "Criterio 30/32" }, { k: "clas", t: "Criterio 36/38" }], "mod", function (k) { o.conv = k; pinta(); });
    U.fichas(lanz, [{ k: "mal", t: "Lanzadera malato-aspartato" }, { k: "glic", t: "Lanzadera glicerol-fosfato" }], "mal", function (k) { o.lanz = k; pinta(); });
    var tb = cuerpo.querySelector("[data-tabla]"), dat = cuerpo.querySelector("[data-d]"), ver = cuerpo.querySelector(".bio8-veredicto");
    function pinta() {
      var glu = o.sust === "glu", r = balance(o), h = '<table class="bio8-tab"><tr><th>Etapa</th><th>NADH</th><th>FADH₂</th><th>ATP directos</th></tr>';
      ctlWrap.style.display = glu ? "none" : "";
      dest.style.display = glu ? "" : "none";
      lanz.style.display = glu && o.dest === "aer" ? "" : "none";
      conv.style.display = r.fer ? "none" : "";
      r.filas.forEach(function (f) { h += "<tr><td>" + f[0] + "</td><td>" + f[1] + "</td><td>" + f[2] + "</td><td>" + f[3] + "</td></tr>"; });
      h += '<tr class="tot"><td>ATP totales por molécula</td><td colspan="3">' + num(r.total) + " ATP</td></tr></table>";
      tb.innerHTML = h;
      var d = "<div><b>ATP totales</b>" + num(r.total) + "</div><div><b>ATP por carbono</b>" + B.fmt(r.total / r.c, 2) + "</div><div><b>CO₂ liberado</b>" + r.co2 + "</div><div><b>O₂ consumido</b>" + num(r.o2) + "</div>";
      if (glu) d += "<div><b>Rendimiento energético</b>" + B.fmt(r.total * DG_ATP / DG_GLUCOSA * 100, 1) + " %</div>";
      dat.innerHTML = d;
      ver.className = "bio8-veredicto" + (r.fer ? " mal" : " ok");
      ver.textContent = r.nota;
    }
    pinta();
  };

  // ------------------------------------------------------------------ CADENA Y INHIBIDORES
  // [consumo de O2, gradiente de H+, síntesis de ATP], escala 0-100 (60 = normal)
  var INHIB = {
    ning: { t: "Sin inhibidor", o: [60, 60, 60], f: [60, 60, 60], msg: "Funcionamiento normal: los electrones llegan al O₂, se bombean H⁺ y la ATP sintasa trabaja." },
    rot: { t: "Rotenona (complejo I)", o: [3, 3, 3], f: [60, 60, 60], msg: { o: "Con NADH como sustrato todo se para: los electrones no pasan del complejo I.", f: "Con succinato (FADH₂) casi nada cambia: entra por el complejo II y se salta el bloqueo del I." } },
    ant: { t: "Antimicina A (complejo III)", o: [3, 3, 3], f: [3, 3, 3], msg: "El complejo III bloquea el paso de los electrones venga de donde venga: se detiene todo." },
    cian: { t: "Cianuro (complejo IV)", o: [3, 3, 3], f: [3, 3, 3], msg: "El complejo IV no cede electrones al O₂: la cadena se atasca y se para el ATP. Por eso el cianuro es un veneno." },
    oli: { t: "Oligomicina (ATP sintasa)", o: [15, 100, 0], f: [15, 100, 0], msg: "Los H⁺ no pueden volver por la ATP sintasa: el gradiente sube al máximo, frena la cadena y baja el consumo de O₂. No se fabrica ATP." },
    dnp: { t: "DNP (desacoplante)", o: [100, 5, 3], f: [100, 5, 3], msg: "El desacoplante deja pasar H⁺ por la membrana: se disipa el gradiente, la cadena funciona a tope (más O₂), casi no hay ATP y la energía sale como calor." }
  };

  B.w.bio_cadena = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cadena respiratoria: ¿qué pasa si la bloqueas?");
    cuerpo.innerHTML = '<p class="w-intro">Mitocondrias aisladas con un sustrato. Elige el sustrato y el inhibidor y mira consumo de O₂, gradiente de H⁺ y ATP.</p>' +
      '<div data-sust></div><div data-inh></div><div class="bio8-med" data-m></div><div class="bio8-veredicto"></div>' +
      '<p class="w-pie">Escala orientativa (60 = funcionamiento normal). Importa la tendencia, no el número exacto.</p>';
    var sust = "o", inh = "ning", med = cuerpo.querySelector("[data-m]"), ver = cuerpo.querySelector(".bio8-veredicto");
    U.fichas(cuerpo.querySelector("[data-sust]"), [{ k: "o", t: "Piruvato + malato (NADH)" }, { k: "f", t: "Succinato (FADH₂)" }], sust, function (k) { sust = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-inh]"), Object.keys(INHIB).map(function (k) { return { k: k, t: INHIB[k].t }; }), inh, function (k) { inh = k; pinta(); });
    function pinta() {
      var I = INHIB[inh], v = I[sust], m = typeof I.msg === "string" ? I.msg : I.msg[sust];
      med.innerHTML = [["Consumo de O₂", v[0]], ["Gradiente de H⁺", v[1]], ["Síntesis de ATP", v[2]]].map(function (x) {
        return "<span>" + x[0] + ": <b>" + x[1] + "</b></span>" + '<div class="bio8-bar"><i style="width:' + x[1] + '%"></i></div>';
      }).join("");
      ver.className = "bio8-veredicto" + (inh === "ning" ? " ok" : (v[2] > 30 ? "" : " mal"));
      ver.textContent = m;
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
