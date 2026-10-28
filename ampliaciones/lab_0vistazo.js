/* ============================================================
   Componente común «ficha de un vistazo» (B.vistazo)
   Datos declarativos: cada tema pasa un objeto `vistazo` a B.registrar(asig, tema, {…, vistazo: {…}}).
   Se pinta una sola vez, aquí, justo después de «En 1 minuto» (envuelve B.cabecera).
   Plegable (<details>), 2–3 columnas en escritorio y 1 en móvil, modo claro/oscuro con los
   tokens de la página, e imprimible (botón «Imprimir ficha» o Ctrl+P). API en herramientas/GUIA_TEMA.md.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  if (!B) return;

  var CSS = [
    ".vz { margin: 0 0 24px; border: 1.5px solid var(--line); border-radius: 14px; background: var(--sheet); box-shadow: var(--shadow); overflow: hidden; }",
    ".vz > summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 12px 16px; font: 700 11.5px/1 var(--body); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft); background: var(--sheet-2); }",
    ".vz > summary::-webkit-details-marker { display: none; }",
    ".vz > summary::before { content: '▸'; font-size: 14px; color: var(--pen); transition: transform .15s; }",
    ".vz[open] > summary::before { transform: rotate(90deg); }",
    ".vz > summary:focus-visible { outline: 2.5px solid var(--pen); outline-offset: -3px; }",
    ".vz-sub { margin-left: auto; font: 500 12px/1.2 var(--body); letter-spacing: 0; text-transform: none; color: var(--ink-faint); }",
    ".vz-cuerpo { padding: 16px 18px 18px; }",
    ".vz-cab { display: grid; gap: 12px 24px; grid-template-columns: 1.4fr 1fr; padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1.5px dashed var(--line); }",
    ".vz-autores { display: flex; flex-wrap: wrap; gap: 8px 22px; }",
    ".vz-aut b { display: block; font: 700 17px/1.25 var(--body); color: var(--ink); }",
    ".vz-aut span { display: block; font-size: 13px; line-height: 1.4; color: var(--ink-soft); }",
    ".vz-obras { font-size: 13.5px; line-height: 1.5; color: var(--ink-soft); }",
    ".vz-obras b { display: block; font: 700 11px/1 var(--body); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 5px; }",
    ".vz-obras i { color: var(--ink); }",
    ".vz-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }",
    ".vz-bl { border: 1.5px solid var(--line); border-radius: 12px; padding: 11px 13px 12px; background: var(--sheet); break-inside: avoid; }",
    ".vz-bl h4 { display: flex; align-items: center; gap: 9px; margin: 0 0 8px; font: 700 15px/1.25 var(--body); color: var(--ink); }",
    ".vz-bl h4 i { flex: none; width: 24px; height: 24px; border-radius: 50%; background: var(--pen); color: var(--on-pen); display: grid; place-content: center; font: 700 13px/1 var(--body); font-style: normal; }",
    ".vz-bl ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }",
    ".vz-bl li { position: relative; margin: 0; padding-left: 14px; font-size: 14px; line-height: 1.45; color: var(--ink); }",
    ".vz-bl li::before { content: ''; position: absolute; left: 1px; top: .6em; width: 6px; height: 6px; border-radius: 50%; background: var(--pen); }",
    ".vz-tb { width: 100%; margin: 9px 0 0; border-collapse: collapse; font-size: 13px; line-height: 1.35; }",
    ".vz-tb th { text-align: left; font: 700 11px/1.2 var(--body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-faint); padding: 3px 7px; }",
    ".vz-tb td { padding: 5px 7px; border-top: 1px solid var(--line); vertical-align: top; width: 50%; color: var(--ink); }",
    ".vz-tb td:first-child { font-weight: 600; background: var(--sheet-2); }",
    ".vz-res { margin: 14px 0 0; padding: 13px 16px; border: 2px solid var(--pen); border-radius: 12px; background: var(--pen-soft); break-inside: avoid; }",
    ".vz-res h4 { margin: 0 0 7px; font: 700 12px/1 var(--body); letter-spacing: .1em; text-transform: uppercase; color: var(--pen); }",
    ".vz-res ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }",
    ".vz-res li { position: relative; margin: 0; padding-left: 20px; font-size: 14.5px; line-height: 1.45; font-weight: 500; color: var(--ink); }",
    ".vz-res li::before { content: '✓'; position: absolute; left: 0; top: 0; color: var(--ok); font-weight: 700; }",
    ".vz-2 { display: grid; grid-template-columns: 1fr 1.4fr; gap: 12px; margin-top: 12px; }",
    ".vz-co, .vz-kw { border: 1.5px solid var(--line); border-radius: 12px; padding: 11px 13px 12px; break-inside: avoid; }",
    ".vz-co h4, .vz-kw h4 { margin: 0 0 8px; font: 700 12px/1 var(--body); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft); }",
    ".vz-co ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }",
    ".vz-co li { margin: 0; font-size: 13.5px; line-height: 1.4; color: var(--ink); }",
    ".vz-co li b { color: var(--pen); }",
    ".vz-kw dl { margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 5px 18px; }",
    ".vz-kw dl > div { font-size: 13.5px; line-height: 1.4; color: var(--ink); }",
    ".vz-kw dt { display: inline; margin: 0; font-weight: 700; color: var(--pen); }",
    ".vz-kw dt::after { content: ' — '; font-weight: 400; color: var(--ink-faint); }",
    ".vz-kw dd { display: inline; margin: 0; color: var(--ink-soft); }",
    ".vz-cita { margin: 12px 0 0; padding: 4px 0 4px 14px; border-left: 4px solid var(--hl); font-family: var(--math); font-size: 17px; line-height: 1.45; font-style: italic; color: var(--ink); break-inside: avoid; }",
    ".vz-cita cite { display: block; margin-top: 3px; font: 500 12.5px/1.3 var(--body); font-style: normal; color: var(--ink-faint); }",
    ".vz-pie { display: flex; align-items: center; gap: 12px; margin-top: 12px; }",
    "@media (max-width: 760px) { .vz-cab, .vz-2 { grid-template-columns: 1fr; } .vz-cuerpo { padding: 14px 14px 16px; } .vz-sub { display: none; } }",
    "@media print {",
    "  body.vz-solo * { visibility: hidden !important; }",
    "  body.vz-solo .vz, body.vz-solo .vz * { visibility: visible !important; }",
    "  body.vz-solo .vz { position: absolute; left: 0; top: 0; width: 100%; }",
    "  .vz { box-shadow: none; border: 1px solid #999; border-radius: 0; margin: 0; }",
    "  .vz > summary { background: #fff; border-bottom: 1px solid #999; }",
    "  .vz > summary::before, .vz-sub, .vz-pie { display: none !important; }",
    "  .vz-cuerpo { padding: 8px 10px; }",
    "  .vz-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }",
    "  .vz-cab { grid-template-columns: 1.4fr 1fr; padding-bottom: 8px; margin-bottom: 8px; }",
    "  .vz-2 { grid-template-columns: 1fr 1.4fr; gap: 8px; margin-top: 8px; }",
    "  .vz-bl, .vz-co, .vz-kw, .vz-res { border-color: #888; border-radius: 6px; padding: 6px 8px; }",
    "  .vz-bl li, .vz-tb, .vz-co li, .vz-kw dl > div, .vz-res li, .vz-obras, .vz-aut span { font-size: 9.5pt; line-height: 1.3; }",
    "  .vz-bl h4 { font-size: 10.5pt; margin-bottom: 4px; } .vz-bl h4 i { width: 18px; height: 18px; font-size: 9pt; }",
    "  .vz-aut b { font-size: 12pt; } .vz-cita { font-size: 11pt; margin-top: 8px; }",
    "  .vz-res { margin-top: 8px; background: #EEF1FF; }",
    "}"
  ].join("\n");

  function inyectarCss() {
    try {
      if (document.getElementById("vz-css")) return;
      var s = document.createElement("style");
      s.id = "vz-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    } catch (e) { /* entorno sin DOM (volcado de datos) */ }
  }
  inyectarCss();

  function lista(arr) { return "<ul>" + arr.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>"; }

  // d = { titulo?, autores:[{n, f?, l?}], obras:[…], bloques:[{t, frases:[…], tabla?:{cab?:[a,b], filas:[[a,b],…]}}],
  //       resumen:[…], conecta:[{con, rel}], claves:[[término, definición],…], cita:{txt, autor?, obra?} }
  B.vistazo = function (d) {
    if (!d) return "";
    var h = '<details class="vz" open><summary>Ficha de un vistazo<span class="vz-sub">' + (d.titulo || "repaso en 2–3 minutos") + "</span></summary><div class=\"vz-cuerpo\">";
    h += '<div class="vz-cab"><div class="vz-autores">' + (d.autores || []).map(function (a) {
      return '<div class="vz-aut"><b>' + a.n + "</b>" + (a.f ? "<span>" + a.f + "</span>" : "") + (a.l ? "<span>" + a.l + "</span>" : "") + "</div>";
    }).join("") + "</div>" +
      (d.obras && d.obras.length ? '<div class="vz-obras"><b>Obras</b>' + d.obras.map(function (o) { return "<i>" + o + "</i>"; }).join(" · ") + "</div>" : "") + "</div>";
    h += '<div class="vz-grid">' + (d.bloques || []).map(function (b, i) {
      var t = "";
      if (b.tabla) {
        t = '<table class="vz-tb">' + (b.tabla.cab ? "<thead><tr><th>" + b.tabla.cab[0] + "</th><th>" + b.tabla.cab[1] + "</th></tr></thead>" : "") +
          "<tbody>" + b.tabla.filas.map(function (f) { return "<tr><td>" + f[0] + "</td><td>" + f[1] + "</td></tr>"; }).join("") + "</tbody></table>";
      }
      return '<section class="vz-bl"><h4><i>' + (i + 1) + "</i>" + b.t + "</h4>" + lista(b.frases || []) + t + "</section>";
    }).join("") + "</div>";
    if (d.resumen) h += '<div class="vz-res"><h4>En resumen · conclusiones</h4>' + lista(d.resumen) + "</div>";
    if (d.conecta || d.claves) {
      h += '<div class="vz-2">' + (d.conecta ? '<div class="vz-co"><h4>Conecta con</h4><ul>' + d.conecta.map(function (c) { return "<li><b>" + c.con + "</b> " + c.rel + "</li>"; }).join("") + "</ul></div>" : "<div></div>") +
        (d.claves ? '<div class="vz-kw"><h4>Palabras clave para la PAU</h4><dl>' + d.claves.map(function (k) { return "<div><dt>" + k[0] + "</dt><dd>" + k[1] + "</dd></div>"; }).join("") + "</dl></div>" : "") + "</div>";
    }
    if (d.cita) h += '<blockquote class="vz-cita">«' + d.cita.txt + "»" + (d.cita.autor ? "<cite>" + d.cita.autor + (d.cita.obra ? ", <i>" + d.cita.obra + "</i>" : "") + "</cite>" : "") + "</blockquote>";
    // dentro de claude.ai el visor bloquea window.print(): el botón solo se ofrece en la web publicada
    if (!(global.claude && global.claude.use)) h += '<div class="vz-pie no-print"><button type="button" class="chip-btn" data-vz-print>🖨 Imprimir esta ficha</button><span class="hand-note">cabe en una hoja: llévatela de chuleta</span></div>';
    return h + "</div></details>";
  };

  // Se muestra tras «En 1 minuto» (la cabecera de cada tema ampliado)
  var cabeceraBase = B.cabecera;
  B.cabecera = function (asig, tema) {
    var base = cabeceraBase ? cabeceraBase(asig, tema) : "";
    var def = B.ampl && B.ampl[asig] && B.ampl[asig][tema];
    return base + (def && def.vistazo ? B.vistazo(def.vistazo) : "");
  };

  // Impresión: botón (solo la ficha) y Ctrl+P (la ficha se despliega para que salga entera)
  try {
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest("[data-vz-print]")) return;
      var ficha = e.target.closest(".vz");
      if (ficha) ficha.open = true;
      document.body.classList.add("vz-solo");
      window.print();
      document.body.classList.remove("vz-solo");
    });
    if (typeof window.addEventListener === "function") {
      var abiertas = [];
      window.addEventListener("beforeprint", function () {
        abiertas = [];
        Array.prototype.forEach.call(document.querySelectorAll("details.vz"), function (el) { abiertas.push([el, el.open]); el.open = true; });
      });
      window.addEventListener("afterprint", function () {
        abiertas.forEach(function (p) { p[0].open = p[1]; });
        document.body.classList.remove("vz-solo");
      });
    }
  } catch (e) { /* sin DOM */ }
})(typeof window !== "undefined" ? window : this);
