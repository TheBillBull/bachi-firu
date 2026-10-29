/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 12 (Kant)
   filo_juicios:   «clasifica el juicio». Se elige un juicio, se responden dos preguntas (¿el predicado está ya en el sujeto?,
                   ¿hace falta la experiencia?) y se ve en qué casilla de la tabla 2×2 cae.
   filo_universal: «el test de la ley universal». Se elige una máxima, se universaliza y se ve si hay contradicción
                   (los cuatro ejemplos de la Fundamentación y uno cotidiano).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft12-estilos")) return;
    var s = document.createElement("style"); s.id = "ft12-estilos";
    s.textContent =
      "[data-w=filo_juicios] .chip-btn,[data-w=filo_universal] .chip-btn{white-space:normal;text-align:left;max-width:100%}" +
      ".ft12-q{margin:10px 0 2px;font-size:14.5px;font-weight:600;color:var(--ink)}" +
      ".ft12-m{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);gap:6px;margin:12px 0 6px;font-size:14px;line-height:1.35}" +
      ".ft12-m>div{min-width:0;overflow-wrap:anywhere;padding:8px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);color:var(--ink)}" +
      ".ft12-m>.h{background:transparent;border-color:transparent;font-size:12.5px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em;align-self:center}" +
      ".ft12-m>.on{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft12-m>.vacia{border-style:dashed;color:var(--ink-faint)}" +
      ".ft12-nota{margin-top:8px;padding:8px 10px;border-radius:10px;border:1.5px dashed var(--line);font-size:14.5px;line-height:1.45;color:var(--ink)}" +
      ".ft12-cad{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:12px 0 6px}" +
      ".ft12-p{padding:8px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;line-height:1.4;color:var(--ink)}" +
      ".ft12-p em{display:block;font-style:normal;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em;margin-bottom:2px}" +
      ".ft12-p.v{border-color:var(--pen);background:var(--pen-soft)}" +
      "@media(max-width:520px){.ft12-cad{grid-template-columns:1fr}.ft12-m{grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);font-size:12.5px;gap:4px}.ft12-m>div{padding:6px}}";
    document.head.appendChild(s);
  })();

  // an = analítico (1) / sintético (0); ap = a priori (1) / a posteriori (0)
  var JUICIOS = [
    { k: 1, t: "Todos los cuerpos son extensos", an: 1, ap: 1, nota: "Ejemplo de Kant. «Extenso» ya está en el concepto de cuerpo: basta analizarlo. No añade nada nuevo." },
    { k: 2, t: "Todos los cuerpos son pesados", an: 0, ap: 0, nota: "Ejemplo de Kant. El peso no forma parte del concepto de cuerpo: hay que pesarlos. Amplía lo que sabemos y depende de la experiencia." },
    { k: 3, t: "7 + 5 = 12", an: 0, ap: 1, nota: "Para Kant, «12» no está contenido en «7 + 5»: hay que construir la suma en la intuición (con los dedos, con puntos). Sin embargo, es necesario y universal, sin mirar el mundo." },
    { k: 4, t: "La línea recta es la más corta entre dos puntos", an: 0, ap: 1, nota: "Ejemplo de Kant: «recta» habla de cualidad, «más corta» de cantidad; la segunda no sale del concepto de la primera. Y vale siempre." },
    { k: 5, t: "Todo lo que sucede tiene una causa", an: 0, ap: 1, nota: "Es el principio de causalidad, el que Hume dejó sin base. Kant lo salva: es una categoría que la mente aporta, no algo que la experiencia enseñe." },
    { k: 6, t: "Los solteros no están casados", an: 1, ap: 1, nota: "Verdadero por definición: el predicado repite lo que ya dice el sujeto. No hace falta salir a la calle a comprobarlo." },
    { k: 7, t: "Hoy llueve en Madrid", an: 0, ap: 0, nota: "Solo se sabe mirando por la ventana (o consultando el tiempo), y puede ser falso mañana." },
    { k: 8, t: "El agua hierve a 100 °C al nivel del mar", an: 0, ap: 0, nota: "Es un hecho que se descubre con experimentos. Podría haber sido de otra manera." }
  ];
  var CELDAS = [
    ["Analítico + a priori", "Analítico + a posteriori"],
    ["Sintético + a priori", "Sintético + a posteriori"]
  ];
  var CAS = { "1,1": [0, 0], "1,0": [0, 1], "0,1": [1, 0], "0,0": [1, 1] };

  B.w.filo_juicios = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Clasifica el juicio");
    cuerpo.innerHTML = '<p class="w-intro">Elige un juicio y responde a las dos preguntas de Kant. Verás en qué casilla cae.</p>' +
      '<div data-j></div><div class="ft12-q">1. ¿El predicado ya está contenido en el concepto del sujeto?</div><div data-an></div>' +
      '<div class="ft12-q">2. ¿Hace falta la experiencia para saber que es verdadero?</div><div data-ap></div><div class="ft12-det"></div>';
    var det = cuerpo.querySelector(".ft12-det"), cur = 1, an = null, ap = null;
    U.fichas(cuerpo.querySelector("[data-j]"), JUICIOS.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; an = ap = null; reinicia(); });
    function reinicia() {
      U.fichas(cuerpo.querySelector("[data-an]"), [{ k: 1, t: "Sí (analítico)" }, { k: 0, t: "No (sintético)" }], null, function (k) { an = +k; pinta(); });
      U.fichas(cuerpo.querySelector("[data-ap]"), [{ k: 0, t: "Sí (a posteriori)" }, { k: 1, t: "No (a priori)" }], null, function (k) { ap = +k; pinta(); });
      pinta();
    }
    function pinta() {
      var o = JUICIOS[cur - 1], cas = CAS[o.an + "," + o.ap], hecho = an !== null && ap !== null;
      var h = '<div class="ft12-m"><div class="h"></div><div class="h">A priori</div><div class="h">A posteriori</div>';
      [0, 1].forEach(function (f) {
        h += '<div class="h">' + (f ? "Sintético" : "Analítico") + "</div>";
        [0, 1].forEach(function (c) {
          var vacia = f === 0 && c === 1, on = hecho && cas[0] === f && cas[1] === c;
          h += '<div class="' + (on ? "on" : vacia ? "vacia" : "") + '">' + (vacia ? "No existe" : f === 0 ? "Explica, no amplía" : c === 0 ? "Amplía y es universal" : "Amplía, es empírico") + "</div>";
        });
      });
      h += "</div>";
      if (hecho) {
        var bien = an === o.an && ap === o.ap;
        h += '<div class="ft12-nota"><b>' + (bien ? "Correcto: " : "Revisa, es: ") + CELDAS[cas[0]][cas[1]] + ".</b> " + o.nota + "</div>";
      } else h += '<div class="ft12-nota">Responde a las dos preguntas.</div>';
      det.innerHTML = h;
    }
    reinicia();
  };

  var MAXIMAS = [
    { k: 1, t: "Prometer sin intención de cumplir", max: "Cuando necesite dinero, prometeré devolverlo aunque sepa que no podré.", uni: "Todo el mundo hace promesas falsas cuando le conviene.", res: "Contradicción en el concepto", nota: "Si todos prometieran en falso, nadie se fiaría de ninguna promesa y prometer perdería su sentido. La máxima se destruye a sí misma. Es un deber perfecto (Kant, Fundamentación)." },
    { k: 2, t: "Quitarse la vida por desgracia", max: "Por amor a mí mismo, acabaré con mi vida si prolongarla me trae más males que alegrías.", uni: "Todo el mundo se quita la vida cuando sufre más de lo que disfruta.", res: "Contradicción en el concepto", nota: "Kant razona que el amor a sí mismo, cuyo fin es impulsar la vida, acabaría destruyéndola: una naturaleza así se contradeciría. Es otro deber perfecto (ejemplo de la Fundamentación)." },
    { k: 3, t: "Dejar los talentos sin cultivar", max: "Prefiero entregarme al placer que cultivar mis talentos.", uni: "Todo el mundo deja sin cultivar sus talentos.", res: "Contradicción en la voluntad", nota: "Se puede pensar un mundo así, pero no se puede querer: un ser racional quiere que se desarrollen sus facultades, que sirven para muchos fines. Es un deber imperfecto." },
    { k: 4, t: "No ayudar a quien lo necesita", max: "Que cada uno sea feliz como pueda o como Dios quiera: yo no daré nada a nadie.", uni: "Nadie ayuda nunca a nadie.", res: "Contradicción en la voluntad", nota: "Un mundo así es posible, pero yo no podría quererlo: algún día necesitaré ayuda y me quedaría sin ella. Es un deber imperfecto." },
    { k: 5, t: "Copiar en un examen", max: "Copiaré en los exámenes cuando no esté segura de aprobar.", uni: "Todo el mundo copia cuando no está segura.", res: "Contradicción en el concepto", nota: "Ejemplo nuestro, en el estilo de Kant: si todos copiaran, el examen dejaría de probar nada y copiar no serviría de nada. La máxima solo funciona porque los demás no la siguen: es una excepción para mí." }
  ];

  B.w.filo_universal = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El test de la ley universal");
    cuerpo.innerHTML = '<p class="w-intro">Imperativo categórico: ¿puedes querer que tu máxima sea ley para todos? Elige una máxima y pásala por el test.</p><div data-ctl></div><div class="ft12-det"></div>';
    var det = cuerpo.querySelector(".ft12-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), MAXIMAS.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = MAXIMAS[cur - 1];
      det.innerHTML = '<div class="ft12-cad"><div class="ft12-p"><em>1. Máxima</em>' + o.max + '</div><div class="ft12-p"><em>2. Universalizada</em>' + o.uni + '</div><div class="ft12-p v"><em>3. Resultado</em><b>' + o.res + '</b></div></div><div class="ft12-nota">' + o.nota + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
