/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 7 (Santo Tomás y la escolástica)
   filo_vias: las cinco vías una a una (hecho de partida, razonamiento, conclusión y ejemplo cotidiano),
   para ver que comparten la misma estructura.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft7-estilos")) return;
    var s = document.createElement("style"); s.id = "ft7-estilos";
    s.textContent =
      ".ft7-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:12px 0 4px}" +
      ".ft7-c{padding:8px 8px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;line-height:1.4;color:var(--ink)}" +
      ".ft7-c b.t{display:block;font-size:12.5px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em;margin-bottom:2px}" +
      ".ft7-c.f{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft7-ej{margin-top:8px;padding:8px 10px;border-radius:10px;border:1.5px dashed var(--line);font-size:14.5px;color:var(--ink)}" +
      "@media(max-width:560px){.ft7-grid{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  var VIAS = [
    { k: 1, t: "1. Movimiento", hecho: "En el mundo hay cosas que se mueven, es decir, que cambian (pasan de potencia a acto).",
      paso: "Nada pasa de potencia a acto si no lo mueve algo que ya está en acto. Esa cadena de motores no puede ser infinita: sin un primer motor no habría segundos.",
      fin: "Un <b>primer motor inmóvil</b> (mueve sin ser movido): eso es Dios.",
      ej: "Un vagón se mueve porque lo arrastra otro; si ninguno tuviera locomotora, ninguno se movería." },
    { k: 2, t: "2. Causa eficiente", hecho: "Hay un orden de causas eficientes: cada cosa se produce por otra.",
      paso: "Nada es causa de sí mismo (sería anterior a sí). Y una cadena ordenada de causas sin una primera no tendría causas intermedias ni efecto final.",
      fin: "Una <b>primera causa eficiente</b> (incausada): eso es Dios.",
      ej: "Existes por tus padres, ellos por los suyos… Si no hubiera una causa primera, nada habría empezado a producir nada." },
    { k: 3, t: "3. Contingencia", hecho: "Hay cosas contingentes: pueden ser o no ser, porque nacen y mueren.",
      paso: "Si todo fuese contingente, alguna vez no habría habido nada; y de la nada no sale nada, así que ahora no habría nada. Pero sí hay cosas.",
      fin: "Un <b>ser necesario</b> por sí mismo, origen de los demás seres: eso es Dios.",
      ej: "Una vela se enciende y se apaga: podría no haber existido. Debe haber alguien que es sin poder no ser." },
    { k: 4, t: "4. Grados de perfección", hecho: "En las cosas hay grados: unas son más buenas, más verdaderas, más nobles que otras.",
      paso: "Un «más» solo se entiende por comparación con un máximo. Y lo máximo en un género es causa de todo lo que hay en ese género.",
      fin: "Un <b>ser máximamente perfecto</b>, causa de la bondad, la verdad y el ser de todo: eso es Dios.",
      ej: "Decimos «más caliente» respecto de lo máximo en calor (el fuego, en el ejemplo antiguo): el máximo es la medida y la causa." },
    { k: 5, t: "5. Orden y finalidad", hecho: "Cosas sin conocimiento (un girasol, una piedra que cae) obran siempre de forma parecida y para un fin.",
      paso: "Lo que no conoce no puede dirigirse a un fin por sí mismo: necesita ser dirigido, como la flecha por el arquero.",
      fin: "Una <b>inteligencia ordenadora</b> que dirige todas las cosas a su fin: eso es Dios.",
      ej: "Un girasol gira hacia la luz sin saber astronomía: alguien (según Tomás) puso ese orden en su naturaleza." }
  ];

  B.w.filo_vias = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las cinco vías, una a una");
    cuerpo.innerHTML = '<p class="w-intro">Elige una vía. Fíjate en que siempre hay tres pasos: un <b>hecho</b> del mundo, la <b>imposibilidad de seguir sin fin</b> y un <b>primer término</b> al que se llama Dios.</p><div data-ctl></div><div class="ft7-det"></div>';
    var det = cuerpo.querySelector(".ft7-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), VIAS.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = VIAS[cur - 1];
      det.innerHTML = '<div class="ft7-grid">' +
        [["1 · Hecho observable", o.hecho, ""], ["2 · No hay regreso infinito", o.paso, ""], ["3 · Primer término", o.fin, " f"]].map(function (c) {
          return '<div class="ft7-c' + c[2] + '"><b class="t">' + c[0] + "</b>" + c[1] + "</div>";
        }).join("") + '</div><div class="ft7-ej"><b>Ejemplo:</b> ' + o.ej + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
