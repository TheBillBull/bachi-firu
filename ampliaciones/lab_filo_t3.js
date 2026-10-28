/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 3 (Platón)
   filo_caverna: el mito de la caverna paso a paso, con lo que simboliza cada etapa y el nivel de la
   línea dividida (eikasía, pístis, diánoia, nóesis) al que corresponde. Se elige la etapa pulsando.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft3-estilos")) return;
    var s = document.createElement("style"); s.id = "ft3-estilos";
    s.textContent =
      ".ft3-linea{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:12px 0 4px}" +
      ".ft3-n{padding:8px 4px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);text-align:center;font-size:13px;line-height:1.3;color:var(--ink-faint);opacity:.6}" +
      ".ft3-n b{display:block;font-size:14px;color:var(--ink)}" +
      ".ft3-n.on{opacity:1;border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft3-grp{display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12.5px;color:var(--ink-faint);text-align:center;margin-top:10px}" +
      ".ft3-fila{display:flex;gap:10px;padding:7px 0;border-top:1px solid var(--line);font-size:15px;line-height:1.45;color:var(--ink)}" +
      ".ft3-fila em{flex:none;width:112px;font-style:normal;font-weight:700;color:var(--ink-faint);font-size:13.5px}" +
      "@media(max-width:520px){.ft3-linea{grid-template-columns:1fr 1fr}.ft3-grp{display:none}.ft3-fila{flex-direction:column;gap:2px}.ft3-fila em{width:auto}.ft3-n{font-size:12px}}";
    document.head.appendChild(s);
  })();

  var ETAPAS = [
    { k: 1, t: "1 Sombras", nivel: 0, titulo: "Encadenados mirando las sombras",
      mito: "Los prisioneros, de espaldas a la hoguera, solo ven las sombras de la pared del fondo.",
      mundo: "Mundo sensible (lo más bajo)", obj: "Imágenes, sombras, apariencias", sab: "Imaginación (eikasía): tomar las imágenes por la realidad.",
      hoy: "Creer algo porque «lo dice todo el mundo» o porque sale en una red social.", sient: "Comodidad: no sabes que ignoras." },
    { k: 2, t: "2 Giro", nivel: 1, titulo: "Liberado: se gira y ve la hoguera y las figuras",
      mito: "Un prisionero es liberado, se gira y descubre los objetos y el fuego. La luz le duele y duda.",
      mundo: "Mundo sensible", obj: "Cosas concretas y seres vivos", sab: "Creencia (pístis): confiar en lo que se ve y se toca.",
      hoy: "Darte cuenta de que lo de las redes eran copias y mirar las cosas reales.", sient: "Dolor y confusión: aprender cuesta." },
    { k: 3, t: "3 Reflejos", nivel: 2, titulo: "Sale al exterior: sombras y reflejos",
      mito: "Arrastrado hacia fuera, al principio solo soporta ver sombras y reflejos en el agua.",
      mundo: "Mundo inteligible (entrada)", obj: "Objetos matemáticos, apoyados en figuras", sab: "Razonamiento (diánoia): parte de hipótesis y usa imágenes.",
      hoy: "Demostrar un teorema con un triángulo dibujado, pensando en el triángulo ideal.", sient: "Empiezas a ver, pero aún con ayudas." },
    { k: 4, t: "4 Seres reales", nivel: 3, titulo: "Ve los seres verdaderos",
      mito: "Poco a poco mira las cosas mismas, de noche y luego de día.",
      mundo: "Mundo inteligible", obj: "Las Ideas (Justicia, Belleza, Igualdad…)", sab: "Inteligencia (nóesis): conocimiento directo de las Ideas por la dialéctica.",
      hoy: "Entender qué es la justicia en sí, no solo casos de justicia.", sient: "Comprensión plena, sin hipótesis." },
    { k: 5, t: "5 Sol", nivel: 3, titulo: "Contempla el Sol",
      mito: "Al fin puede mirar el Sol: causa de la luz, de la vida y de que se vean las cosas.",
      mundo: "Cima del mundo inteligible", obj: "La Idea de Bien", sab: "Nóesis en su grado más alto: el Bien da ser y verdad a las demás Ideas.",
      hoy: "Comprender para qué y por qué es bueno todo lo demás.", sient: "Felicidad: sabe cuál es la meta." },
    { k: 6, t: "6 Regreso", nivel: -1, titulo: "Vuelve a la cueva",
      mito: "Baja a liberar a los demás. Con la vista deslumbrada, torpe entre sombras, se burlan de él y pueden matarlo.",
      mundo: "De nuevo el sensible, con otra mirada", obj: "Los prisioneros", sab: "El que sabe tiene el deber de educar y gobernar.",
      hoy: "Sócrates ejecutado en 399 a. C.: el sabio que quiere educar a quien no lo desea.", sient: "Incomprensión; pero es un deber, no una opción." }
  ];
  var NIVELES = [["Imaginación", "eikasía"], ["Creencia", "pístis"], ["Razonamiento", "diánoia"], ["Inteligencia", "nóesis"]];

  B.w.filo_caverna = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El ascenso de la caverna, etapa a etapa");
    cuerpo.innerHTML = '<p class="w-intro">Pulsa cada etapa del mito y mira qué simboliza y a qué nivel de la línea dividida corresponde.</p>' +
      '<div data-ctl></div><div class="ft3-linea"></div><div class="ft3-grp"><span>Opinión (dóxa): mundo sensible</span><span>Ciencia (epistéme): mundo inteligible</span></div>' +
      '<div class="ft3-det"></div>';
    var linea = cuerpo.querySelector(".ft3-linea"), det = cuerpo.querySelector(".ft3-det");
    var cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), ETAPAS.map(function (e) { return { k: e.k, t: e.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var e = ETAPAS[cur - 1];
      linea.innerHTML = NIVELES.map(function (n, i) { return '<div class="ft3-n' + (i === e.nivel ? " on" : "") + '"><b>' + n[0] + "</b>" + n[1] + "</div>"; }).join("");
      det.innerHTML = '<h5 style="margin:10px 0 4px">' + e.titulo + "</h5>" +
        [["En el mito", e.mito], ["Mundo", e.mundo], ["Qué se conoce", e.obj], ["Nivel de saber", e.sab], ["Hoy sería…", e.hoy], ["Qué se siente", e.sient]].map(function (f) {
          return '<div class="ft3-fila"><em>' + f[0] + "</em><span>" + f[1] + "</span></div>";
        }).join("");
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
