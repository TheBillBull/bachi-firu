/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 5 (parte B): El helenismo
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t5.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Tras Alejandro (323 a. C.) la polis pierde peso y la filosofía se hace <b>terapia</b>: ¿cómo vivir en paz en un mundo que no controlo?",
    "<b>Estoicismo</b> (Zenón): vivir conforme al logos; aceptar lo que no depende de nosotros. Meta: <b>apatía</b>.",
    "<b>Epicureísmo</b> (Epicuro): placer estable, deseos limitados y sin miedo a los dioses ni a la muerte. Meta: <b>ataraxia</b>.",
    "<b>Escepticismo</b> (Pirrón): ante argumentos iguales, <b>epojé</b>. Meta: también la ataraxia."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "El helenismo · 323–31 a. C.",
    autores: [
      { n: "Zenón de Citio", f: "h. 334–262 a. C.", l: "Chipre; enseña en el Pórtico (Atenas)" },
      { n: "Epicuro", f: "341–270 a. C.", l: "Samos; el Jardín (Atenas)" },
      { n: "Pirrón de Elis", f: "h. 365–275 a. C.", l: "Élide; viaja con Alejandro" }
    ],
    obras: ["Manual (Epicteto)", "Meditaciones (Marco Aurelio)", "Carta a Meneceo (Epicuro)", "De la naturaleza de las cosas (Lucrecio)", "Hipotiposis pirrónicas (Sexto Empírico)"],
    bloques: [
      { t: "Contexto", frases: ["Alejandro muere en 323 a. C.; nacen grandes reinos.", "El individuo ya no decide en la polis.", "La filosofía pasa a ser <b>terapia del alma</b>."] },
      { t: "Estoicismo", frases: ["El cosmos es racional: <b>logos</b>, providencia y destino.", "Hay que vivir conforme a la naturaleza y a la razón.", "Unas cosas dependen de nosotros y otras no."],
        tabla: { cab: ["Depende de nosotros", "No depende de nosotros"], filas: [["juicios, deseos, decisiones", "salud, fama, riqueza, muerte"]] } },
      { t: "Epicureísmo", frases: ["Átomos y vacío; sin providencia; el alma muere.", "El placer es el fin: ausencia de dolor y de inquietud.", "Se rechaza el miedo a los dioses y a la muerte."],
        tabla: { cab: ["Deseo", "Qué hacer"], filas: [["natural y necesario", "satisfacerlo"], ["natural pero no necesario", "moderarlo"], ["ni natural ni necesario", "evitarlo"]] } },
      { t: "Escepticismo", frases: ["Cada argumento tiene otro igual en contra.", "<b>Epojé</b>: suspender el juicio, sin afirmar ni negar.", "Llega así la <b>ataraxia</b>."] },
      { t: "Lo que comparten", frases: ["La meta es la tranquilidad del alma.", "El sabio se basta a sí mismo.", "Filosofía como medicina y modo de vida."] },
      { t: "Cómo distinguirlas", frases: ["Cada escuela, un camino distinto a la serenidad."],
        tabla: { cab: ["Escuela", "Camino → meta"], filas: [["Estoicismo", "aceptar → apatía"], ["Epicureísmo", "limitar deseos → ataraxia"], ["Escepticismo", "suspender juicio → ataraxia"]] } }
    ],
    resumen: [
      "Tras Alejandro, <b>de la polis al individuo</b>: la filosofía busca la serenidad.",
      "Estoicos: <b>aceptar</b> el logos. Epicúreos: <b>limitar</b> los deseos. Escépticos: <b>suspender</b> el juicio.",
      "<b>Apatía</b> (estoica) no es insensibilidad; el <b>placer</b> epicúreo no es desenfreno."
    ],
    conecta: [
      { con: "Heráclito y Demócrito (T1):", rel: "logos y átomos, base de estoicos y epicúreos." },
      { con: "Platón (T3):", rel: "alma inmortal; Epicuro la niega." },
      { con: "Aristóteles (T4):", rel: "de la política de la polis a la ética individual." },
      { con: "Agustín (T6):", rel: "hereda ideas estoicas y combate el escepticismo." }
    ],
    claves: [
      ["Helenismo", "Época posterior a Alejandro (323 a. C.) hasta Roma (31 a. C.)."],
      ["Logos", "Razón universal que gobierna el cosmos (estoicos)."],
      ["Apatía", "Ausencia de pasiones que perturban (estoicos)."],
      ["Ataraxia", "Calma del alma: meta de epicúreos y escépticos."],
      ["Aponía", "Ausencia de dolor en el cuerpo (Epicuro)."],
      ["Epojé", "Suspensión del juicio (escépticos)."],
      ["Hedonismo", "Doctrina que identifica la felicidad con el placer (Epicuro)."],
      ["Tetrafármaco", "Cuádruple remedio epicúreo: dioses, muerte, bien, mal."],
      ["Cosmopolitismo", "Todos somos ciudadanos del cosmos (estoicos)."],
      ["Clinamen", "Pequeña desviación de los átomos (epicúreos)."]
    ],
    cita: { txt: "De las cosas que existen, unas dependen de nosotros y otras no dependen de nosotros.", autor: "Epicteto", obra: "Manual, 1" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    deseos: {
      titulo: "¿Qué tipo de deseo es?",
      consigna: "Toca un deseo y después su tipo según Epicuro.",
      categorias: ["Natural y necesario", "Natural pero no necesario", "Ni natural ni necesario"],
      items: [
        { t: "Beber agua cuando se tiene sed", c: 0 },
        { t: "Tener un techo y abrigo", c: 0 },
        { t: "Tener amigos", c: 0 },
        { t: "Un menú de lujo en un restaurante caro", c: 1 },
        { t: "Una casa muy espaciosa y decorada", c: 1 },
        { t: "Un viaje de ensueño", c: 1 },
        { t: "Ser famoso", c: 2 },
        { t: "Tener poder sobre los demás", c: 2 },
        { t: "Acumular riquezas sin límite", c: 2 }
      ]
    },
    escuelas: {
      titulo: "Autor y obra o lugar",
      consigna: "Une cada autor o escuela con su obra o lugar.",
      pares: [["Zenón de Citio", "El Pórtico (Stoa)"], ["Epicuro", "El Jardín"], ["Lucrecio", "De la naturaleza de las cosas"], ["Marco Aurelio", "Meditaciones"], ["Sexto Empírico", "Hipotiposis pirrónicas"], ["Epicteto", "Manual (Enquiridión)"]]
    },
    muerte: {
      titulo: "El argumento de Epicuro sobre la muerte",
      consigna: "Ordena los pasos del razonamiento.",
      items: [
        { t: "Todo bien y todo mal residen en la sensación" },
        { t: "La muerte es privación de sensación" },
        { t: "Mientras existimos, la muerte no está presente" },
        { t: "Cuando la muerte llega, ya no existimos" },
        { t: "Luego temer a la muerte no tiene sentido" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 5",
      preguntas: [
        { q: "¿Qué hecho histórico marca el inicio de la época helenística?", op: ["La muerte de Alejandro Magno (323 a. C.)", "La condena de Sócrates", "La fundación de la Academia", "La batalla de Salamina"], ok: 0, porque: "Su imperio se reparte en reinos y las polis pierden peso político." },
        { q: "¿Qué busca, sobre todo, la filosofía helenística?", op: ["La tranquilidad del alma", "El Estado ideal", "La explicación del cosmos", "El poder político"], ok: 0, porque: "Es una terapia práctica para la felicidad individual." },
        { q: "Para los estoicos, la felicidad consiste en…", op: ["vivir conforme a la naturaleza y a la razón", "buscar el máximo placer", "suspender el juicio", "alcanzar el poder"], ok: 0, porque: "Aceptar el logos y actuar según la virtud." },
        { q: "La «apatía» estoica significa…", op: ["ausencia de pasiones perturbadoras", "indiferencia ante todo", "falta de sentimientos hacia la familia", "pereza"], ok: 0, porque: "No es insensibilidad: es serenidad frente a las pasiones." },
        { q: "Según Epicuro, ¿qué deseos hay que evitar?", op: ["Los que no son ni naturales ni necesarios", "Los naturales y necesarios", "Todos los deseos", "Los de comer y beber"], ok: 0, porque: "Fama, poder y riqueza excesiva generan ansiedad infinita." },
        { q: "La ataraxia es…", op: ["la ausencia de perturbación del alma", "la suspensión del juicio", "el miedo a la muerte", "el deber de gobernar"], ok: 0, porque: "Es la meta de epicúreos y escépticos, aunque por caminos distintos." },
        { q: "Para Epicuro, la muerte…", op: ["no es nada para nosotros", "es un castigo de los dioses", "es el mayor mal", "es el paso a otra vida"], ok: 0, porque: "Si no hay sensación, no hay mal: nunca coincidimos con ella." },
        { q: "¿Qué es la epojé?", op: ["Suspender el juicio", "Aceptar el destino", "Limitar los deseos", "Contemplar las Ideas"], ok: 0, porque: "Es la actitud escéptica ante argumentos de igual fuerza." },
        { q: "Pirrón de Elis acompañó a…", op: ["Alejandro Magno hasta la India", "Platón a Siracusa", "Sócrates a su juicio", "Epicuro al Jardín"], ok: 0, porque: "Allí conoció sabios que vivían en serenidad." },
        { q: "¿Qué tienen en común estoicismo, epicureísmo y escepticismo?", op: ["Entienden la filosofía como terapia del alma", "Defienden la teoría de las Ideas", "Niegan que exista el cosmos", "Defienden la democracia ateniense"], ok: 0, porque: "Cada uno ofrece un camino a la serenidad interior." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre el estoicismo es FALSA?", op: ["El sabio estoico no siente nada por nadie", "El cosmos está regido por el logos", "La virtud es el único bien", "Hay que aceptar lo que no depende de nosotros"], ok: 0, porque: "Apatía es serenidad ante las pasiones, no frialdad." },
        { q: "¿Cuál de estas afirmaciones sobre Epicuro es FALSA?", op: ["Recomienda darse todos los placeres sin límite", "Busca la ausencia de dolor y de inquietud", "Distingue tres tipos de deseos", "Dice que la muerte no es nada para nosotros"], ok: 0, porque: "Su placer es sereno y moderado; manda limitar los deseos." },
        { q: "¿Cuál de estas afirmaciones sobre el escepticismo es FALSA?", op: ["El escéptico afirma que la verdad no existe", "El escéptico suspende el juicio", "Busca la ataraxia", "Se guía por las apariencias y la costumbre"], ok: 0, porque: "Afirmar que no hay verdad sería otro dogma; el escéptico suspende el juicio." },
        { q: "¿Cuál de estas afirmaciones sobre el contexto es FALSA?", op: ["Las polis ganan independencia tras Alejandro", "Alejandro muere en 323 a. C.", "Surgen grandes reinos helenísticos", "Alejandría es una gran ciudad cosmopolita"], ok: 0, porque: "Las polis pierden autonomía política dentro de reinos más grandes." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Epicuro nació antes que Aristóteles", "Aristóteles murió en 322 a. C.", "Zenón de Citio fue contemporáneo de Epicuro", "Alejandro murió en 323 a. C."], ok: 0, porque: "Aristóteles (384–322) nació antes que Epicuro (341–270)." },
        { q: "¿Cuál de estas afirmaciones sobre el alma es FALSA?", op: ["Para Epicuro el alma es inmortal", "Para Epicuro el alma es material", "Para los estoicos el alma forma parte del logos", "Para Platón el alma es inmortal"], ok: 0, porque: "Epicuro la considera de átomos finos: se disuelve al morir." },
        { q: "¿Cuál de estas afirmaciones sobre la ataraxia es FALSA?", op: ["Es un término exclusivo de los estoicos", "Es la meta de los epicúreos", "Es la meta de los escépticos", "Significa ausencia de perturbación del alma"], ok: 0, porque: "La apatía es lo estoico; la ataraxia, de epicúreos y escépticos." },
        { q: "¿Cuál de estas afirmaciones sobre los dioses en Epicuro es FALSA?", op: ["Los dioses controlan el destino humano y castigan", "Los dioses existen pero no se ocupan de los humanos", "No hay que temerles", "El miedo a los dioses es una fuente de angustia"], ok: 0, porque: "Viven en paz y no intervienen; por eso no se les teme." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: el helenismo",
      cartas: [
        { a: "Época helenística", b: "Tras la muerte de Alejandro (323 a. C.) hasta la dominación romana (31 a. C.)." },
        { a: "Logos", b: "Razón universal que gobierna el cosmos según los estoicos." },
        { a: "Lo que depende de nosotros", b: "Juicios, deseos y decisiones. Lo demás hay que aceptarlo." },
        { a: "Apatía", b: "Estoicos: ausencia de pasiones que perturban; no es insensibilidad." },
        { a: "Cosmopolitismo", b: "Estoicos: todos somos ciudadanos del cosmos." },
        { a: "Hedonismo epicúreo", b: "El placer es el fin, entendido como ausencia de dolor y de inquietud." },
        { a: "Deseos naturales y necesarios", b: "Comer, beber, abrigo, amigos: hay que satisfacerlos." },
        { a: "Deseos ni naturales ni necesarios", b: "Fama, poder, riqueza excesiva: hay que evitarlos." },
        { a: "Aponía", b: "Ausencia de dolor en el cuerpo." },
        { a: "Ataraxia", b: "Ausencia de perturbación del alma; meta de epicúreos y escépticos." },
        { a: "Tetrafármaco", b: "Cuádruple remedio: no temer a dioses ni a la muerte; el bien es fácil; el mal es soportable." },
        { a: "Clinamen", b: "Desviación mínima de los átomos que salva la libertad (Epicuro)." },
        { a: "Epojé", b: "Suspensión del juicio ante argumentos de igual fuerza (escépticos)." },
        { a: "Sexto Empírico", b: "Hacia el s. II d. C.; sistematizó el escepticismo en las Hipotiposis pirrónicas." }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  var N = [];
  function O(id, nv, enun, ops, ok, pasos, res, et) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "opcion", etiqueta: et || "Tu respuesta", opciones: ops, ok: ok }, pasos: pasos, resultado: res || ops[ok] });
  }
  function M(id, nv, enun, campos, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: campos, pasos: pasos, resultado: res });
  }
  function C(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var VF = ["Verdadero", "Falso"];
  function V(id, nv, enun, ver, justif, ok, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun,
      check: [C("¿Verdadero o falso?", VF, ver ? 0 : 1), C("Justificación", justif, ok)], pasos: pasos, resultado: res || ((ver ? "Verdadero: " : "Falso: ") + justif[ok]) });
  }
  function T(id, nv, enun, et, valores, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "texto", etiqueta: et, valores: valores }, pasos: pasos, resultado: res });
  }
  function R(id, enun, filas, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("he1", 1, "¿Quién fundó el estoicismo?", ["Zenón de Citio", "Epicuro", "Pirrón de Elis", "Aristóteles"], 0,
    ["Zenón de Citio (h. 334–262 a. C.) enseñaba en el Pórtico (<i>Stoa</i>), de ahí «estoicos»."]);
  O("he2", 1, "¿Cómo se llamaba la escuela de Epicuro en Atenas?", ["El Jardín", "La Academia", "El Liceo", "El Pórtico"], 0,
    ["El Jardín. Academia = Platón; Liceo = Aristóteles; Pórtico = estoicos."]);
  O("he3", 1, "¿Qué significa «ataraxia»?", ["Ausencia de perturbación del alma", "Suspensión del juicio", "Placer en movimiento", "Aceptación del destino"], 0,
    ["Calma serena del alma; meta de epicúreos y escépticos."]);
  O("he4", 1, "La actitud escéptica ante un tema discutible se llama…", ["epojé", "apatía", "aponía", "anámnesis"], 0,
    ["Epojé = suspensión del juicio."]);
  T("he5", 1, "Completa: la meta del sabio estoico es la ______ (serenidad ante las pasiones).", "Término =", ["apatía", "apátheia"],
    ["Apatía estoica: sin pasiones que perturben; no es insensibilidad."], "apatía");
  O("he6", 1, "¿Con quién viajó Pirrón de Elis hasta la India?", ["Con Alejandro Magno", "Con Platón", "Con Epicuro", "Con Zenón"], 0,
    ["Acompañó al ejército de Alejandro."]);
  M("he7", 1, "Empareja cada escuela con su fundador.", [
    C("Estoicismo", ["Zenón de Citio", "Epicuro", "Pirrón de Elis"], 0),
    C("Epicureísmo", ["Zenón de Citio", "Epicuro", "Pirrón de Elis"], 1),
    C("Escepticismo", ["Zenón de Citio", "Epicuro", "Pirrón de Elis"], 2)],
    ["Pórtico: Zenón · Jardín: Epicuro · escepticismo: Pirrón."], "Estoicismo–Zenón, epicureísmo–Epicuro, escepticismo–Pirrón");
  M("he8", 1, "Empareja cada escuela con su camino hacia la serenidad.", [
    C("Estoicismo", ["Aceptar lo que no depende de nosotros", "Limitar los deseos", "Suspender el juicio"], 0),
    C("Epicureísmo", ["Aceptar lo que no depende de nosotros", "Limitar los deseos", "Suspender el juicio"], 1),
    C("Escepticismo", ["Aceptar lo que no depende de nosotros", "Limitar los deseos", "Suspender el juicio"], 2)],
    ["Estoico = acepta · epicúreo = limita · escéptico = suspende."], "Estoicismo–aceptar, epicureísmo–limitar deseos, escepticismo–suspender el juicio");
  O("he9", 1, "Para los estoicos, el logos es…", ["la razón que gobierna el universo", "un átomo", "una pasión", "un placer"], 0,
    ["Razón universal; también Dios, Providencia o Naturaleza."]);
  O("he10", 1, "Según Epicuro, los deseos de fama y poder son…", ["ni naturales ni necesarios", "naturales y necesarios", "naturales pero no necesarios", "obligatorios"], 0,
    ["Hay que evitarlos: producen ansiedad infinita."]);
  O("he11", 1, "¿Qué orden cronológico (por nacimiento, de más antiguo a más moderno) es correcto?",
    ["Aristóteles → Pirrón → Epicuro → Zenón", "Pirrón → Aristóteles → Zenón → Epicuro", "Zenón → Epicuro → Pirrón → Aristóteles", "Epicuro → Zenón → Aristóteles → Pirrón"], 0,
    ["Aristóteles (384), Pirrón (h. 365), Epicuro (341), Zenón (h. 334)."], "Aristóteles → Pirrón → Epicuro → Zenón");
  O("he12", 1, "¿Qué suceso suele marcar el inicio de la época helenística?", ["La muerte de Alejandro Magno (323 a. C.)", "La guerra de Troya", "La condena de Sócrates", "La batalla de Accio"], 0,
    ["Accio (31 a. C.) suele darse como el final."]);
  T("he13", 1, "Completa: la epojé consiste en suspender el ______.", "Término =", ["juicio", "el juicio"],
    ["No afirmar ni negar: suspender el juicio."], "juicio");
  O("he14", 1, "¿Qué autor sistematizó el escepticismo en las <i>Hipotiposis pirrónicas</i>?", ["Sexto Empírico", "Epicteto", "Lucrecio", "Séneca"], 0,
    ["Sexto Empírico (hacia el siglo II d. C.)."]);

  // ---- nivel 2
  V("he15", 2, "«Para los estoicos, el sabio no siente nada por nadie.»", false, [
    "Es falso: apatía es serenidad ante las pasiones descontroladas, no frialdad", "Es falso: los estoicos defienden el placer", "Es falso: el sabio estoico es escéptico", "Es verdad por definición"], 0,
    ["Apatía ≠ insensibilidad."]);
  V("he16", 2, "«Epicuro defiende satisfacer todos los deseos sin límite.»", false, [
    "Es falso: manda limitar los deseos a los naturales y necesarios", "Es falso: niega que existan deseos", "Es falso: solo permite el dolor", "Es verdad porque defiende el hedonismo"], 0,
    ["Su placer es sereno y moderado."]);
  V("he17", 2, "«Para los escépticos, la verdad no existe.»", false, [
    "Es falso: suspenden el juicio, ni afirman ni niegan", "Es falso: afirman que todo es verdad", "Es falso: creen en las Ideas", "Es verdad: eso es el escepticismo"], 0,
    ["Afirmar que no hay verdad sería dogmatismo."]);
  V("he18", 2, "«Estoicos y epicúreos buscan la felicidad como tranquilidad del alma.»", true, [
    "Es verdad: aunque por caminos distintos, buscan serenidad", "Es verdad: los dos defienden la teoría de las Ideas", "Es verdad: los dos niegan el placer", "Es verdad: los dos creen en la inmortalidad del alma"], 0,
    ["Apatía y ataraxia: dos nombres de la serenidad."]);
  V("he19", 2, "«Para Epicuro el alma es inmortal.»", false, [
    "Es falso: es material, de átomos, y se disuelve al morir", "Es falso: no existe el alma", "Es falso: el alma es una Idea", "Es verdad: igual que en Platón"], 0,
    ["Por eso la muerte no es nada para nosotros."]);
  V("he20", 2, "«Los estoicos creen que todo ocurre por necesidad, según el logos.»", true, [
    "Es verdad: el cosmos está regido por la razón y el destino", "Es verdad: porque todo es azar", "Es verdad: porque los átomos se desvían", "Es verdad: porque el sabio decide el cosmos"], 0,
    ["Determinismo estoico: nada es casual."]);
  O("he21", 2, "¿Por qué la filosofía helenística se centra en la felicidad individual?",
    ["Porque, tras Alejandro, el individuo ya no puede influir en la política como en la polis", "Porque los filósofos ya no tenían escuelas", "Porque Platón lo ordenó", "Porque desaparecieron los dioses"], 0,
    ["El contexto político empuja a buscar la paz interior."]);
  O("he22", 2, "¿Qué diferencia hay entre «apatía» y «ataraxia»?",
    ["La apatía es estoica; la ataraxia es epicúrea y escéptica", "La apatía es escéptica y la ataraxia estoica", "No hay diferencia", "La apatía es un placer y la ataraxia un deber"], 0,
    ["Ambas son serenidad, pero cada término pertenece a escuelas distintas."]);
  O("he23", 2, "El argumento de Epicuro sobre la muerte concluye que…",
    ["no hay que temerla, porque nunca coincidimos con ella", "hay que desearla", "es un castigo de los dioses", "es el comienzo de otra vida"], 0,
    ["Mientras estamos, ella no está; cuando llega, ya no estamos."]);
  O("he24", 2, "¿Qué es lo que depende de nosotros, según Epicteto?",
    ["Nuestros juicios, deseos y decisiones", "La salud", "La riqueza", "La fama"], 0,
    ["Lo demás no depende de nosotros y hay que aceptarlo."]);
  O("he25", 2, "¿Qué tipo de deseo es comer algo cuando se tiene hambre?",
    ["Natural y necesario", "Natural pero no necesario", "Ni natural ni necesario", "Una pasión"], 0,
    ["Hay que satisfacerlo: es fácil y su falta produce dolor."]);
  O("he26", 2, "¿Qué es el «placer estable» (catastemático) para Epicuro?",
    ["El estado de ausencia de dolor y de inquietud", "El placer de comer en un banquete", "Una pasión violenta", "La euforia"], 0,
    ["El verdadero fin: aponía y ataraxia."]);
  O("he27", 2, "¿Para qué sirven los «tropos» escépticos?",
    ["Para mostrar que a cada argumento se le opone otro igual de fuerte", "Para demostrar las Ideas", "Para calcular el placer", "Para aceptar el destino"], 0,
    ["Equipolencia: argumentos de igual peso."]);
  O("he28", 2, "El lema epicúreo «láthe biósas» significa…", ["vive oculto", "vive conforme a la naturaleza", "suspende el juicio", "conócete a ti mismo"], 0,
    ["Alejarse de la política y de la ambición."]);
  O("he29", 2, "¿Qué estoico fue emperador de Roma?", ["Marco Aurelio", "Epicteto", "Séneca", "Zenón"], 0,
    ["Marco Aurelio (121–180 d. C.) escribió las <i>Meditaciones</i>. Epicteto fue esclavo liberado."]);
  O("he30", 2, "¿Qué pensador antiguo toma Epicuro como base de su física?", ["Demócrito", "Heráclito", "Parménides", "Sócrates"], 0,
    ["Átomos y vacío, con el <i>clinamen</i> añadido."]);

  // ---- nivel 3
  O("he31", 3, "Texto: «De las cosas que existen, unas dependen de nosotros y otras no dependen de nosotros» (Epicteto, <i>Manual</i>, 1). Su idea principal es…",
    ["que hay que dirigir la voluntad solo a lo que podemos controlar", "que todo depende de nosotros", "que nada depende de nosotros", "que hay que buscar el máximo placer"], 0,
    ["Es la base de la ética estoica práctica."]);
  O("he32", 3, "Texto: «Cuando decimos que el placer es el fin, no nos referimos a los placeres de los disolutos, sino a no sufrir dolor en el cuerpo ni estar perturbados en el alma» (Epicuro, <i>Carta a Meneceo</i>). Su idea principal es…",
    ["que el placer epicúreo consiste en aponía y ataraxia", "que hay que buscar los placeres del banquete", "que hay que suspender el juicio", "que el cosmos es racional"], 0,
    ["Aclara que su hedonismo no es desenfreno."]);
  O("he33", 3, "Una alumna escribe: «Epicuro propone el desenfreno». ¿Qué matiz es el correcto?",
    ["Su placer es la ausencia de dolor y de inquietud, con deseos limitados", "Tiene razón: el placer es todo", "Rechaza el placer por completo", "Propone vivir en la política"], 0,
    ["Placer = tranquilidad, no juerga."]);
  O("he34", 3, "¿En qué se diferencia el camino de Epicuro del de Pirrón hacia la ataraxia?",
    ["Epicuro limita los deseos y Pirrón suspende el juicio", "Epicuro suspende el juicio y Pirrón limita los deseos", "No hay diferencia", "Epicuro rechaza la ataraxia"], 0,
    ["Misma meta, distinto camino."]);
  O("he35", 3, "¿Qué diferencia hay entre Platón y Epicuro acerca del alma?",
    ["Platón la considera inmortal e inmaterial; Epicuro, material y mortal", "Ambos la consideran material", "Epicuro la considera una Idea", "Platón la considera de átomos"], 0,
    ["Por eso Epicuro puede decir que la muerte no es nada para nosotros."]);
  M("he36", 3, "Clasifica cada deseo según Epicuro.", [
    C("Tener un techo", ["Natural y necesario", "Natural pero no necesario", "Ni natural ni necesario"], 0),
    C("Un banquete de lujo", ["Natural y necesario", "Natural pero no necesario", "Ni natural ni necesario"], 1),
    C("Ser famoso", ["Natural y necesario", "Natural pero no necesario", "Ni natural ni necesario"], 2)],
    ["Satisfacer · moderar · evitar."], "Techo: necesario; banquete: no necesario; fama: ni natural ni necesario");
  M("he37", 3, "Empareja cada término con su significado.", [
    C("Apatía", ["Ausencia de pasiones perturbadoras", "Ausencia de dolor en el cuerpo", "Suspensión del juicio", "Calma del alma"], 0),
    C("Aponía", ["Ausencia de pasiones perturbadoras", "Ausencia de dolor en el cuerpo", "Suspensión del juicio", "Calma del alma"], 1),
    C("Epojé", ["Ausencia de pasiones perturbadoras", "Ausencia de dolor en el cuerpo", "Suspensión del juicio", "Calma del alma"], 2),
    C("Ataraxia", ["Ausencia de pasiones perturbadoras", "Ausencia de dolor en el cuerpo", "Suspensión del juicio", "Calma del alma"], 3)],
    ["Apatía (estoica), aponía (cuerpo), epojé (escéptica), ataraxia (alma)."], "Apatía–sin pasiones, aponía–sin dolor, epojé–suspender, ataraxia–calma");
  R("he38", "Explica por qué la filosofía helenística se centra en la felicidad individual y qué rasgo común tienen estoicos, epicúreos y escépticos. (Pregunta tipo PAU)", 9, [
    { t: "Contexto: muerte de Alejandro (323 a. C.), fin de la autonomía de la polis, grandes reinos", p: 0.5 },
    { t: "Giro: de la teoría del cosmos y del Estado (Platón, Aristóteles) a la vida personal", p: 0.4 },
    { t: "Las tres respuestas: aceptar el destino, limitar los deseos, suspender el juicio", p: 0.4 },
    { t: "Rasgo común: filosofía como terapia del alma, meta de tranquilidad (apatía o ataraxia)", p: 0.5 },
    { t: "Cierre o valoración (por ejemplo, el sabio autosuficiente)", p: 0.2 }],
    ["Contexto.", "Giro.", "Tres caminos.", "Terapia.", "Cierre."], "Del ciudadano de la polis al individuo en busca de serenidad");
  R("he39", "Explica la ética estoica: lo que depende de nosotros, la virtud, el logos y la apatía. (Pregunta tipo PAU)", 9, [
    { t: "Cosmos racional: logos, providencia y destino (determinismo)", p: 0.4 },
    { t: "Distinción entre lo que depende y lo que no depende de nosotros (Epicteto)", p: 0.5 },
    { t: "Vivir conforme a la naturaleza y a la razón; la virtud como único bien", p: 0.4 },
    { t: "Pasiones como juicios erróneos; apatía como serenidad (no insensibilidad)", p: 0.5 },
    { t: "Cosmopolitismo o valoración crítica (fatalismo y libertad)", p: 0.2 }],
    ["Logos.", "Depende o no.", "Virtud.", "Apatía.", "Cierre."], "Aceptar el orden del cosmos y dominar las pasiones");
  R("he40", "Explica el epicureísmo: el placer, la clasificación de los deseos, la ataraxia y el miedo a la muerte. (Pregunta tipo PAU)", 9, [
    { t: "Atomismo: átomos y vacío, sin providencia; el alma se disuelve", p: 0.4 },
    { t: "Hedonismo moderado: placer estable como aponía y ataraxia", p: 0.4 },
    { t: "Clasificación de los deseos con un ejemplo de cada tipo", p: 0.5 },
    { t: "Argumento sobre la muerte y el tetrafármaco", p: 0.5 },
    { t: "Matiz: no es desenfreno; vida sencilla y amistad", p: 0.2 }],
    ["Física.", "Placer.", "Deseos.", "Muerte.", "Matiz."], "Placer sereno y deseos limitados, sin miedo a los dioses ni a la muerte");
  R("he41", "Explica el escepticismo de Pirrón (epojé y ataraxia) y compáralo con el epicureísmo. (Pregunta tipo PAU)", 8, [
    { t: "Pirrón de Elis y Sexto Empírico; equipolencia y tropos", p: 0.5 },
    { t: "Epojé: suspender el juicio, ni afirmar ni negar", p: 0.5 },
    { t: "Ataraxia como resultado de la epojé", p: 0.3 },
    { t: "Matiz: no es negar la verdad ni dejar de vivir (se guía por las apariencias y la costumbre)", p: 0.3 },
    { t: "Comparación: misma meta (ataraxia), distinto camino (suspender el juicio frente a limitar deseos)", p: 0.4 }],
    ["Equipolencia.", "Epojé.", "Ataraxia.", "Matiz.", "Comparación."], "Misma serenidad, distinto camino");
  R("he42", "Comenta este texto: «Mientras nosotros existimos, la muerte no está presente, y cuando la muerte está presente, entonces nosotros ya no existimos» (Epicuro, <i>Carta a Meneceo</i>). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el miedo a la muerte es infundado", p: 0.3 },
    { t: "Idea principal: nunca coincidimos con la muerte, luego no puede afectarnos", p: 0.4 },
    { t: "Relaciona con el autor: atomismo, alma material, sensación como criterio, tetrafármaco, ataraxia", p: 0.5 },
    { t: "Compara con Platón (alma inmortal) o con los estoicos (aceptar la muerte como parte del logos)", p: 0.5 },
    { t: "Valoración o contexto (objeción: la muerte priva de bienes)", p: 0.3 }],
    ["Tema → idea principal → relación con el autor → comparación → valoración."], "Comentario del argumento de Epicuro sobre la muerte");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Tres escuelas, un mismo destino", ancha: true,
      tabla: { cab: ["", "Estoicismo", "Epicureísmo", "Escepticismo"], filas: [
        ["Fundador", "Zenón de Citio", "Epicuro", "Pirrón de Elis"],
        ["Mundo", "Logos y destino", "Átomos y vacío", "No se sabe"],
        ["Camino", "Aceptar lo que no depende de nosotros", "Limitar los deseos", "Epojé"],
        ["Meta", "Apatía", "Ataraxia", "Ataraxia"]
      ] } },
    { titulo: "Los deseos según Epicuro", ancha: true,
      tabla: { cab: ["Tipo", "Ejemplo", "Qué hacer"], filas: [
        ["Natural y necesario", "beber, abrigo, amigos", "satisfacerlo"],
        ["Natural no necesario", "comida refinada", "moderarlo"],
        ["Ni natural ni necesario", "fama, poder, riqueza excesiva", "evitarlo"]
      ] } },
    { titulo: "Argumento de Epicuro sobre la muerte",
      pasos: ["Todo bien y todo mal están en la sensación.", "La muerte es privación de sensación.", "Mientras existimos, ella no está.", "Cuando llega, ya no existimos.", "Luego no hay que temerla."],
      nota: "Se apoya en que el alma es material y se disuelve." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Apatía = insensibilidad", bien: "Serenidad ante las pasiones descontroladas", por: "El sabio estoico sí siente afecto." },
        { mal: "Epicuro defiende el desenfreno", bien: "Placer estable: ausencia de dolor y de inquietud", por: "Manda limitar los deseos." },
        { mal: "El escéptico niega la verdad", bien: "Suspende el juicio", por: "Negar sería otro dogma." },
        { mal: "Ataraxia es estoica", bien: "Es de epicúreos y escépticos", por: "Lo estoico es la apatía." }
      ] }
  ];

  B.registrar("historia_fil", "t5", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf5a.secciones,
    nuevas: B.parte.hf5a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
