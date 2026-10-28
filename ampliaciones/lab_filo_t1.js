/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 1
   filo_parmenides: el argumento de Parménides paso a paso, y el punto exacto en que los atomistas
   se separan de él (el vacío «es» aunque sea no-ser). Se avanza paso a paso y se alterna de vista.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft1-estilos")) return;
    var s = document.createElement("style"); s.id = "ft1-estilos";
    s.textContent =
      ".ft1-pasos{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:7px}" +
      ".ft1-p{display:flex;gap:10px;align-items:flex-start;padding:9px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);opacity:.38;transition:opacity .15s,border-color .15s}" +
      ".ft1-p.vis{opacity:1}" +
      ".ft1-p.act{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft1-p.rompe{border-color:var(--red);background:var(--red-soft)}" +
      ".ft1-p i{flex:none;width:24px;height:24px;border-radius:50%;background:var(--pen);color:var(--on-pen);display:grid;place-content:center;font:700 13px/1 var(--body);font-style:normal}" +
      ".ft1-p.rompe i{background:var(--red);color:var(--on-pen)}" +
      ".ft1-p span{font-size:15px;line-height:1.45;color:var(--ink)}" +
      ".ft1-p small{display:block;margin-top:3px;font-size:13.5px;line-height:1.4;color:var(--red)}" +
      ".ft1-acc{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}" +
      ".ft1-acc .cnt{font-size:13px;color:var(--ink-faint)}" +
      ".cita-fil{margin:10px 0;padding:8px 14px;border-left:4px solid var(--hl);background:var(--sheet-2);border-radius:0 8px 8px 0;font-size:15.5px;line-height:1.5}";
    document.head.appendChild(s);
  })();

  var PASOS = [
    { t: "Solo hay dos posibilidades: una cosa <b>es</b> o <b>no es</b>." },
    { t: "Lo que <b>no es</b> no se puede pensar ni decir: sería pensar «nada».", a: "El atomista no está de acuerdo: el <b>vacío</b> es un «no-ser» del que sí hablamos, y le da <b>lugar</b> a las cosas." },
    { t: "Por tanto, todo lo que pensamos y decimos <b>es</b>: pensar y ser coinciden." },
    { t: "Cambiar o moverse sería que algo pase del <b>no-ser al ser</b> (nacer) o del <b>ser al no-ser</b> (morir)." },
    { t: "Pero no hay «no-ser» de donde salir ni adonde ir: <b>el cambio es imposible</b>.", a: "Con vacío sí hay adónde ir: los átomos <b>se mueven</b> por él sin nacer ni morir." },
    { t: "Conclusión: el ser es <b>único, eterno, inmóvil y completo</b>; lo que ven los ojos (cambio, pluralidad) es <b>apariencia</b>." }
  ];
  var FIN_ATOMISTA = "Conclusión atomista: hay <b>muchos</b> seres (átomos) <b>eternos e inmutables</b>, como pedía Parménides, pero <b>se mueven en el vacío</b>; el cambio es solo combinarse y separarse.";

  B.w.filo_parmenides = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El argumento de Parménides, paso a paso");
    cuerpo.innerHTML = '<p class="w-intro">Avanza con «Siguiente paso». Cambia a la vista atomista y mira qué paso rechaza Demócrito.</p>' +
      '<div data-ctl></div><ol class="ft1-pasos"></ol><div class="ft1-acc"><button type="button" class="chip-btn" data-ant>← Anterior</button><button type="button" class="chip-btn on" data-sig>Siguiente paso →</button><span class="cnt"></span></div>';
    var vista = "parm", n = 1;
    var lista = cuerpo.querySelector(".ft1-pasos"), cnt = cuerpo.querySelector(".cnt");
    U.fichas(cuerpo.querySelector("[data-ctl]"), [{ k: "parm", t: "Vista de Parménides" }, { k: "atom", t: "Vista atomista (Demócrito)" }], vista, function (k) { vista = k; pinta(); });
    function pinta() {
      var atom = vista === "atom";
      lista.innerHTML = PASOS.map(function (p, i) {
        var vis = i < n, rompe = atom && p.a && vis;
        var t = (i === PASOS.length - 1 && atom) ? FIN_ATOMISTA : p.t;
        return '<li class="ft1-p' + (vis ? " vis" : "") + (i === n - 1 ? " act" : "") + (rompe ? " rompe" : "") + '"><i>' + (i + 1) + "</i><span>" + t + (rompe ? "<small>" + p.a + "</small>" : "") + "</span></li>";
      }).join("");
      cnt.textContent = "Paso " + n + " de " + PASOS.length;
    }
    cuerpo.querySelector("[data-sig]").addEventListener("click", function () { if (n < PASOS.length) n++; pinta(); });
    cuerpo.querySelector("[data-ant]").addEventListener("click", function () { if (n > 1) n--; pinta(); });
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
