/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 9 (Descartes)
   filo_duda: la escalera de la duda metódica (sentidos, sueño, genio maligno) y lo que resiste (el cogito):
   en cada escalón, qué cae y qué sigue en pie.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft9-estilos")) return;
    var s = document.createElement("style"); s.id = "ft9-estilos";
    s.textContent =
      ".ft9-cols{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0 4px}" +
      ".ft9-c{padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14.5px;line-height:1.45;color:var(--ink)}" +
      ".ft9-c>b:first-child{display:block;font-size:12.5px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em;margin-bottom:3px}" +
      ".ft9-c.q{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft9-why{margin-top:8px;padding:8px 10px;border-radius:10px;border:1.5px dashed var(--line);font-size:14.5px;line-height:1.45;color:var(--ink)}" +
      "@media(max-width:520px){.ft9-cols{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  var NIV = [
    { k: 1, t: "1. Los sentidos", why: "Los sentidos me han engañado alguna vez, y no es prudente fiarse del todo de quien nos ha engañado aunque sea una sola vez (idea de la <i>Meditación I</i>, en paráfrasis). Ejemplo: una torre cuadrada vista de lejos parece redonda.",
      cae: "Lo que percibo de lejos o con poca claridad.", queda: "Que estoy aquí, que tengo manos, que esto es un papel… parece indudable. Y las matemáticas." },
    { k: 2, t: "2. El sueño", why: "No hay indicios seguros para distinguir la vigilia del sueño: en sueños también «veo» mi cuerpo, mi cuarto, mis manos. Quizá ahora mismo estoy soñando.",
      cae: "Toda percepción sensible: la existencia del mundo exterior y de mi propio cuerpo.", queda: "Las verdades matemáticas: dormido o despierto, 2 + 3 = 5 y el cuadrado tiene cuatro lados." },
    { k: 3, t: "3. El genio maligno", why: "Hipótesis hiperbólica: un ser poderosísimo y astuto me engaña siempre, incluso cuando sumo 2 + 3. No hay que creer que exista; basta con que sea posible para tener motivo de duda.",
      cae: "Incluso las verdades matemáticas y todo lo que parecía evidente.", queda: "Parece que nada… pero, para ser engañado, tengo que existir." },
    { k: 4, t: "4. Lo que resiste", why: "Dudar es pensar, y para pensar hay que ser. Aunque el genio me engañe en todo, no puede hacer que yo no sea mientras pienso que soy: <b>pienso, luego existo</b>.",
      cae: "Nada: esta verdad no cae ni con la hipótesis más extrema.", queda: "Existo, en cuanto <b>cosa que piensa</b> (<i>res cogitans</i>): la primera certeza." }
  ];
  B.w.filo_duda = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La escalera de la duda");
    cuerpo.innerHTML = '<p class="w-intro">Sube escalón a escalón: en cada uno, mira qué cae y qué sigue en pie. En el último aparece lo que resiste.</p><div data-ctl></div><div class="ft9-det"></div>';
    var det = cuerpo.querySelector(".ft9-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), NIV.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = NIV[cur - 1];
      det.innerHTML = '<div class="ft9-cols"><div class="ft9-c"><b>Qué cae</b>' + o.cae + '</div><div class="ft9-c q"><b>Qué queda</b>' + o.queda + '</div></div><div class="ft9-why">' + o.why + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
