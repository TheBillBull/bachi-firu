/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 10 (Locke y Hume)
   filo_hume: «rastrea la idea». Se elige una idea y se sigue hasta su impresión de origen (principio de copia de Hume);
   el veredicto dice si la idea es legítima, es una combinación o no tiene impresión externa que la respalde.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft10-estilos")) return;
    var s = document.createElement("style"); s.id = "ft10-estilos";
    s.textContent =
      ".ft10-cad{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:12px 0 6px}" +
      ".ft10-p{padding:8px 8px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;line-height:1.4;color:var(--ink)}" +
      ".ft10-p em{display:block;font-style:normal;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em;margin-bottom:2px}" +
      ".ft10-p.v{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft10-nota{margin-top:8px;padding:8px 10px;border-radius:10px;border:1.5px dashed var(--line);font-size:14.5px;line-height:1.45;color:var(--ink)}" +
      "@media(max-width:520px){.ft10-cad{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  var IDEAS = [
    { k: 1, t: "Rojo", imp: "Ver algo rojo: una impresión de sensación, directa y viva.", ver: "Idea simple legítima", nota: "Es la copia pálida de una impresión que tuviste. Sin haber visto nunca el rojo, no tendrías esta idea." },
    { k: 2, t: "Montaña de oro", imp: "Impresión de «montaña» y de «oro», vistas por separado.", ver: "Idea compleja legítima", nota: "Nunca has visto una, pero la imaginación junta dos ideas que sí vienen de impresiones. Imaginar es combinar, no inventar de la nada." },
    { k: 3, t: "Unicornio", imp: "Impresión de un caballo y de un cuerno, por separado.", ver: "Idea compleja legítima", nota: "Ficción hecha de piezas reales: cada pieza se rastrea hasta una impresión. El principio de copia no prohíbe imaginar." },
    { k: 4, t: "Conexión necesaria", imp: "Solo se ve que A va seguido de B. La «necesidad» no se ve ni se toca. Lo único que hay es una impresión interna: la expectativa que la costumbre crea en nosotros.", ver: "Sin impresión externa", nota: "Para Hume, la causalidad no está en las cosas sino en el hábito de la mente, que proyecta su expectativa sobre el mundo." },
    { k: 5, t: "Yo (sustancia)", imp: "Al mirar dentro solo se encuentran percepciones sueltas: calor, alegría, un recuerdo. Nunca un «yo» aparte de ellas.", ver: "Sin impresión", nota: "Hume concluye que el yo no es una sustancia fija sino un haz de percepciones en continuo cambio." }
  ];
  B.w.filo_hume = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Rastrea la idea hasta su impresión");
    cuerpo.innerHTML = '<p class="w-intro">Hume exige que toda idea tenga una impresión de origen. Elige una idea y síguela hasta ella.</p><div data-ctl></div><div class="ft10-det"></div>';
    var det = cuerpo.querySelector(".ft10-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), IDEAS.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = IDEAS[cur - 1];
      det.innerHTML = '<div class="ft10-cad"><div class="ft10-p"><em>Idea</em>' + o.t + '</div><div class="ft10-p"><em>¿De qué impresión viene?</em>' + o.imp + '</div><div class="ft10-p v"><em>Veredicto</em><b>' + o.ver + '</b></div></div><div class="ft10-nota">' + o.nota + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
