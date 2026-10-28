/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 6 (parte B): San Agustín y la patrística
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t6.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Los <b>Padres de la Iglesia</b> (siglos II–VIII) usan la filosofía griega para defender y explicar el cristianismo; el más importante es <b>Agustín de Hipona</b> (354–430).",
    "Contra el escepticismo, <i>si fallor, sum</i>; fe y razón se necesitan: «entiende para creer, cree para entender».",
    "El <b>mal</b> no es una sustancia, sino <b>privación de bien</b>; el mal moral procede del <b>libre albedrío</b>.",
    "En <i>La Ciudad de Dios</i>, dos amores forman dos ciudades y la historia es <b>lineal</b>, con sentido."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "San Agustín · 354–430",
    autores: [{ n: "Agustín de Hipona", f: "354–430", l: "Tagaste (África); Cartago, Roma, Milán; obispo de Hipona" }],
    obras: ["Confesiones", "Sobre el libre albedrío", "La Trinidad", "La Ciudad de Dios"],
    bloques: [
      { t: "Contexto: la patrística", frases: ["Padres de la Iglesia, siglos II–VIII: defienden el cristianismo con filosofía.", "Agustín vive el paso del cristianismo a religión oficial (380).", "Roma es saqueada en <b>410</b>: escribe <i>La Ciudad de Dios</i>."],
        tabla: { cab: ["Postura ante la filosofía", "Ejemplo"], filas: [["rechazo", "Tertuliano"], ["aprovechamiento", "Justino"], ["síntesis", "Agustín"]] } },
      { t: "Conocimiento: de la duda a la verdad", frases: ["Etapa escéptica; la supera con <i>si fallor, sum</i>.", "Las Ideas de Platón pasan a la <b>mente de Dios</b>.", "Conocemos las verdades eternas por <b>iluminación</b> divina."] },
      { t: "Fe y razón", frases: ["«Entiende para creer, cree para entender».", "La fe es punto de partida; la razón profundiza.", "No son enemigas: son etapas de un mismo camino."] },
      { t: "El mal y la libertad", frases: ["El mal no es una cosa: es <b>privación de bien</b>.", "El mal moral nace del <b>libre albedrío</b> mal usado.", "Contra Pelagio, necesita la <b>gracia</b>."],
        tabla: { cab: ["Contra los maniqueos", "Contra Pelagio"], filas: [["defiende la libertad", "defiende la gracia"], ["el mal no es sustancia", "el pecado hiere la voluntad"]] } },
      { t: "El tiempo", frases: ["Pasado, presente y futuro se viven en el alma.", "Memoria, atención y espera (<i>distentio animi</i>).", "Dios crea el tiempo con el mundo y vive en la eternidad."] },
      { t: "Historia y sociedad", frases: ["Dos ciudades según el <b>amor</b>: a Dios o a sí mismo.", "Historia <b>lineal</b>: Creación, Encarnación, Juicio Final.", "El Estado sin justicia es un bandidaje."],
        tabla: { cab: ["Ciudad de Dios", "Ciudad terrena"], filas: [["amor a Dios", "amor a sí mismo"], ["paz eterna", "poder y gloria"]] } }
    ],
    resumen: [
      "La <b>verdad</b> se halla en el interior y viene de Dios: platonismo cristiano.",
      "<b>Fe y razón</b> se necesitan: la fe orienta, la razón comprende.",
      "El <b>mal</b> es falta de bien; el mal moral viene de la <b>voluntad libre</b>.",
      "La historia es <b>lineal</b> y la mueve el <b>amor</b>: dos ciudades."
    ],
    conecta: [
      { con: "Platón (T3):", rel: "su fuente; las Ideas pasan a la mente de Dios." },
      { con: "Escepticismo (T5):", rel: "lo supera con <i>si fallor, sum</i>." },
      { con: "Tomás de Aquino (T7):", rel: "le sigue; cambia a Platón por Aristóteles." },
      { con: "Descartes (T9):", rel: "precedente de la certeza del yo pensante." }
    ],
    claves: [
      ["Patrística", "pensamiento de los Padres de la Iglesia (siglos II–VIII)"],
      ["Si fallor, sum", "«si me equivoco, existo»: la duda prueba la existencia"],
      ["Iluminación", "Dios ilumina la mente para conocer verdades eternas"],
      ["Cree para entender", "la fe es punto de partida de la razón"],
      ["Privación de bien", "el mal no es una cosa, sino falta de bien"],
      ["Libre albedrío", "capacidad de elegir entre el bien y el mal"],
      ["Gracia", "ayuda gratuita de Dios a la voluntad herida"],
      ["Dos ciudades", "ciudad de Dios y ciudad terrena, separadas por el amor"],
      ["Historia lineal", "tiene principio, sentido y fin, no se repite"],
      ["Distentio animi", "el tiempo se vive en el alma: memoria, atención y espera"]
    ],
    cita: { txt: "Nos hiciste para ti, y nuestro corazón está inquieto hasta que descanse en ti.", autor: "Agustín de Hipona", obra: "Confesiones, I, 1 (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    ciudades: {
      titulo: "¿Ciudad de Dios o ciudad terrena?",
      consigna: "Toca cada rasgo y después la ciudad a la que corresponde.",
      categorias: ["Ciudad de Dios", "Ciudad terrena"],
      items: [
        { t: "Amor a Dios hasta el desprecio de sí", c: 0 },
        { t: "Amor a sí mismo hasta el desprecio de Dios", c: 1 },
        { t: "Busca la paz y los bienes eternos", c: 0 },
        { t: "Busca el poder y la gloria", c: 1 },
        { t: "Vive según Dios", c: 0 },
        { t: "Vive según sí mismo", c: 1 }
      ]
    },
    posturas: {
      titulo: "Ante la filosofía griega",
      consigna: "Une cada autor con su actitud ante la filosofía pagana.",
      pares: [["Tertuliano", "Rechazo"], ["Justino", "Aprovechamiento"], ["Agustín", "Síntesis con el platonismo"]]
    },
    camino: {
      titulo: "El camino de Agustín",
      consigna: "Ordena de más antiguo a más reciente.",
      items: [
        { t: "354: nace en Tagaste" },
        { t: "386: se convierte en Milán" },
        { t: "410: los visigodos saquean Roma" },
        { t: "413–426: escribe La Ciudad de Dios" },
        { t: "430: muere en Hipona" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 6",
      preguntas: [
        { q: "La patrística es el pensamiento de…", op: ["los Padres de la Iglesia", "los sofistas", "los escolásticos del siglo XIII", "los humanistas"], ok: 0, porque: "Del latín <i>pater</i>: los Padres de la Iglesia, siglos II–VIII." },
        { q: "San Agustín fue obispo de…", op: ["Hipona", "Milán", "Roma", "Atenas"], ok: 0, porque: "Hipona, en el norte de África." },
        { q: "«Si fallor, sum» significa…", op: ["si me equivoco, existo", "creo para entender", "el mal es una privación", "pienso, luego dudo"], ok: 0, porque: "Para engañarse hay que existir." },
        { q: "Para Agustín, las Ideas de Platón están…", op: ["en la mente de Dios", "en un mundo aparte", "en la materia", "solo en el lenguaje"], ok: 0, porque: "Son los modelos eternos según los que Dios crea." },
        { q: "La iluminación divina explica…", op: ["cómo conocemos verdades eternas", "el origen del mal", "la caída de Roma", "el paso del tiempo"], ok: 0, porque: "Dios ilumina la mente, como el sol los objetos." },
        { q: "Para Agustín, el mal es…", op: ["privación de bien", "una sustancia creada por Dios", "un principio eterno rival de Dios", "una ilusión"], ok: 0, porque: "Es ausencia de un bien debido, como la ceguera." },
        { q: "El mal moral procede…", op: ["del uso del libre albedrío", "de la materia", "de Dios", "del cuerpo"], ok: 0, porque: "La voluntad prefiere un bien inferior." },
        { q: "Contra Pelagio, Agustín defiende…", op: ["la necesidad de la gracia", "que el pecado no daña a nadie", "el escepticismo", "el maniqueísmo"], ok: 0, porque: "La voluntad herida necesita la ayuda de Dios." },
        { q: "Las dos ciudades se distinguen por…", op: ["el amor", "la raza", "la riqueza", "el territorio"], ok: 0, porque: "Amor a Dios o amor a sí mismo." },
        { q: "La visión de la historia de Agustín es…", op: ["lineal, con sentido", "cíclica", "sin sentido", "regresiva sin fin"], ok: 0, porque: "Creación, desarrollo, Juicio Final." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Agustín es FALSA?", op: ["Fue discípulo directo de Platón", "Vivió entre 354 y 430", "Fue obispo de Hipona", "Escribió las Confesiones"], ok: 0, porque: "Platón murió en 347 a. C.; Agustín nació más de setecientos años después." },
        { q: "¿Cuál de estas afirmaciones sobre «cree para entender» es FALSA?", op: ["Significa que hay que creer sin pensar", "La fe es punto de partida", "La razón profundiza la fe", "Fe y razón se complementan"], ok: 0, porque: "La fe pide pensar: es un método, no una renuncia a la razón." },
        { q: "¿Cuál de estas afirmaciones sobre el mal es FALSA?", op: ["Dios creó el mal como una sustancia", "El mal es privación de bien", "El mal moral viene del libre albedrío", "Todo lo que existe es bueno en cuanto existe"], ok: 0, porque: "Para Agustín el mal no es una sustancia ni lo crea Dios." },
        { q: "¿Cuál de estas afirmaciones sobre las dos ciudades es FALSA?", op: ["La Ciudad de Dios es la Iglesia y la terrena el Estado", "Se distinguen por el amor", "Se mezclan en la historia", "Se separarán al final"], ok: 0, porque: "No coinciden con instituciones: las separa el amor." },
        { q: "¿Cuál de estas afirmaciones sobre el tiempo es FALSA?", op: ["Antes de la Creación ya pasaba el tiempo", "Dios está fuera del tiempo", "El tiempo se vive en el alma", "La historia no se repite"], ok: 0, porque: "Dios crea el tiempo con el mundo: no hay un «antes»." },
        { q: "¿Cuál de estas afirmaciones sobre «si fallor, sum» es FALSA?", op: ["Es idéntico al cogito de Descartes en su uso", "Es una respuesta al escepticismo", "Precede al «pienso, luego existo»", "Para engañarse hay que existir"], ok: 0, porque: "Es un precedente, pero Agustín lo usa contra el escepticismo y para llegar a Dios." },
        { q: "¿Cuál de estas afirmaciones sobre las Ideas es FALSA?", op: ["Para Agustín viven en un mundo aparte", "Para Platón viven en el mundo inteligible", "Para Agustín están en la mente de Dios", "Para Agustín se conocen por iluminación"], ok: 0, porque: "Las coloca en la mente de Dios." },
        { q: "¿Cuál de estas afirmaciones sobre la gracia es FALSA?", op: ["Agustín niega la libertad humana", "Contra Pelagio, la voluntad necesita ayuda", "La gracia es un don gratuito", "Contra los maniqueos defiende el libre albedrío"], ok: 0, porque: "No la niega: dice que está herida y necesita la gracia." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: San Agustín",
      cartas: [
        { a: "Patrística", b: "Pensamiento de los Padres de la Iglesia (siglos II–VIII)." },
        { a: "Confesiones", b: "Autobiografía filosófica de Agustín (hacia 400)." },
        { a: "Maniqueísmo", b: "Doctrina de dos principios eternos, el bien y el mal. Agustín la siguió y la abandonó." },
        { a: "Si fallor, sum", b: "«Si me equivoco, existo»: respuesta al escepticismo." },
        { a: "Iluminación", b: "Dios ilumina la mente para conocer las verdades eternas." },
        { a: "Cree para entender", b: "La fe es punto de partida; la razón profundiza." },
        { a: "Privación de bien", b: "El mal no es una cosa, sino la falta de un bien debido." },
        { a: "Libre albedrío", b: "Capacidad de elegir; es un bien aunque pueda usarse mal." },
        { a: "Gracia", b: "Ayuda gratuita de Dios a la voluntad herida (contra Pelagio)." },
        { a: "La Ciudad de Dios", b: "Obra escrita entre 413 y 426 tras el saqueo de Roma (410)." },
        { a: "Dos ciudades", b: "Ciudad de Dios y ciudad terrena, según el amor que las mueve." },
        { a: "Historia lineal", b: "Creación, Encarnación y Juicio Final: la historia no se repite." },
        { a: "Distentio animi", b: "El tiempo se vive en el alma: memoria, atención y espera." }
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
  O("pa1", 1, "¿Dónde nació San Agustín?", ["Tagaste", "Hipona", "Milán", "Atenas"], 0,
    ["Nació en 354 en Tagaste, en el norte de África. Hipona fue la ciudad de la que fue obispo."]);
  O("pa2", 1, "¿Cómo se llama la obra en la que Agustín cuenta su propia vida y su búsqueda?", ["Confesiones", "La Ciudad de Dios", "República", "Ética a Nicómaco"], 0,
    ["Las <i>Confesiones</i> (hacia 400) son su autobiografía filosófica."]);
  O("pa3", 1, "¿En qué año saquearon Roma los visigodos, hecho que motivó <i>La Ciudad de Dios</i>?", ["410", "313", "476", "1274"], 0,
    ["410. El 313 es el Edicto de Milán; el 476, la caída del Imperio de Occidente."]);
  O("pa4", 1, "La palabra «patrística» viene del latín <i>pater</i>, que significa…", ["padre", "ciudad", "razón", "tiempo"], 0,
    ["Padres de la Iglesia."]);
  O("pa5", 1, "¿De qué ciudad fue obispo San Agustín?", ["Hipona", "Roma", "Cartago", "Alejandría"], 0,
    ["Fue obispo de Hipona hacia el 395 y murió allí en 430."]);
  T("pa6", 1, "Completa: «si fallor, ______» («si me equivoco, existo»).", "Palabra latina =", ["sum"],
    ["<i>Sum</i> = «existo»."], "sum");
  M("pa7", 1, "Empareja cada obra con su tema principal.", [
    C("Confesiones", ["Autobiografía y búsqueda de la verdad", "Filosofía de la historia", "Lógica"], 0),
    C("La Ciudad de Dios", ["Autobiografía y búsqueda de la verdad", "Filosofía de la historia", "Lógica"], 1)],
    ["<i>Confesiones</i>: su vida; <i>La Ciudad de Dios</i>: el sentido de la historia."], "Confesiones–autobiografía, Ciudad de Dios–historia");
  O("pa8", 1, "El maniqueísmo, doctrina que Agustín siguió y abandonó, defendía…", ["dos principios eternos, el bien y el mal", "un solo Dios creador", "que no existe el mal", "que todo es agua"], 0,
    ["Explicaba el mundo como una lucha de dos principios."]);
  T("pa9", 1, "Completa: para Agustín, el mal es una ______ de bien.", "Término =", ["privación", "privacion"],
    ["<i>Privatio boni</i>."], "privación");
  O("pa10", 1, "La visión de la historia que introduce el cristianismo es…", ["lineal", "cíclica", "eterna repetición", "sin sentido"], 0,
    ["Tiene principio, desarrollo y final."]);
  O("pa11", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Platón → Agustín → Tomás de Aquino", "Agustín → Platón → Tomás de Aquino", "Tomás de Aquino → Agustín → Platón", "Platón → Tomás de Aquino → Agustín"], 0,
    ["Platón (427–347 a. C.), Agustín (354–430), Tomás de Aquino (1225–1274)."], "Platón → Agustín → Tomás de Aquino");
  O("pa12", 1, "¿Qué filósofo griego es la principal influencia de Agustín?", ["Platón", "Epicuro", "Demócrito", "Diógenes"], 0,
    ["Platón y los neoplatónicos."]);
  O("pa13", 1, "¿Qué obispo de Milán influyó en la conversión de Agustín?", ["Ambrosio", "Pelagio", "Justino", "Tertuliano"], 0,
    ["Ambrosio de Milán."]);
  O("pa14", 1, "La fórmula «entiende para creer, cree para entender» trata de…", ["la relación entre fe y razón", "el problema del mal", "el tiempo", "la política"], 0,
    ["Fe y razón se necesitan."]);

  // ---- nivel 2
  V("pa15", 2, "«Para Agustín, el mal es una sustancia creada por Dios.»", false, [
    "Es falso: el mal es privación de bien, no una sustancia", "Es falso: el mal no existe de ningún modo", "Es verdad: Dios crea todo, también el mal", "Es verdad: porque Dios es todopoderoso"], 0,
    ["Todo lo que existe es bueno; el mal es falta."]);
  V("pa16", 2, "«Para Agustín, fe y razón se complementan.»", true, [
    "Es verdad: la fe orienta y la razón profundiza", "Es verdad: porque la razón es superflua", "Es verdad: porque la fe es inútil", "Es verdad: porque son enemigas"], 0,
    ["«Entiende para creer, cree para entender»."]);
  V("pa17", 2, "«El «si fallor, sum» de Agustín es exactamente igual, en su uso, al «pienso, luego existo» de Descartes.»", false, [
    "Es falso: es un precedente, pero Agustín lo usa contra el escepticismo y para llegar a Dios", "Es falso: Agustín no habló de la duda", "Es verdad: Descartes lo copió palabra por palabra", "Es verdad: ambos construyen un método geométrico"], 0,
    ["Parecido en la certeza del pensante; distinta finalidad."]);
  V("pa18", 2, "«Para Agustín, las dos ciudades se distinguen por el amor.»", true, [
    "Es verdad: amor a Dios frente a amor a sí mismo", "Es verdad: porque se distinguen por la riqueza", "Es verdad: porque una es Roma", "Es verdad: porque una es pagana por su territorio"], 0,
    ["Dos amores fundaron dos ciudades."]);
  V("pa19", 2, "«La Ciudad de Dios es la Iglesia y la ciudad terrena es el Estado.»", false, [
    "Es falso: se distinguen por el amor, no por instituciones", "Es falso: Agustín no habla de ciudades", "Es verdad: así lo dice Agustín", "Es verdad: la Iglesia es el único poder"], 0,
    ["En ambas instituciones hay personas de las dos ciudades."]);
  V("pa20", 2, "«Para Agustín el libre albedrío es un bien, aunque pueda usarse mal.»", true, [
    "Es verdad: es un don valioso que hace posible amar libremente", "Es verdad: porque no puede usarse mal", "Es verdad: porque el mal es una sustancia", "Es verdad: porque Dios no es libre"], 0,
    ["El mal moral es un mal uso de un bien."]);
  V("pa21", 2, "«Agustín defiende una visión cíclica del tiempo, como los griegos.»", false, [
    "Es falso: defiende una historia lineal, con principio y fin", "Es falso: niega el tiempo", "Es verdad: todo se repite eternamente", "Es verdad: por influencia de Heráclito"], 0,
    ["Creación, Encarnación y Juicio Final."]);
  O("pa22", 2, "¿Qué cambia Agustín respecto a las Ideas de Platón?", ["Las sitúa en la mente de Dios", "Niega que existan verdades eternas", "Las identifica con la materia", "Las reduce a nombres"], 0,
    ["Conserva las verdades eternas, pero las hace depender de Dios."]);
  O("pa23", 2, "La «iluminación divina» sirve para explicar…", ["cómo conocemos verdades eternas", "el origen del mal", "por qué cae Roma", "cómo se mide la distancia"], 0,
    ["Dios ilumina la mente, igual que el sol ilumina los objetos."]);
  O("pa24", 2, "¿Qué consecuencia tuvo para Agustín abandonar el maniqueísmo?", ["Defender que el mal no es una sustancia", "Negar la libertad", "Aceptar dos principios", "Rechazar la filosofía"], 0,
    ["El maniqueísmo veía el mal como principio real; Agustín lo ve como falta."]);
  O("pa25", 2, "Según Agustín, el mal moral se hace posible por…", ["el uso del libre albedrío", "la materia", "la voluntad de Dios", "el destino ciego"], 0,
    ["La voluntad elige un bien inferior."]);
  O("pa26", 2, "¿Dónde se «mide» el tiempo, según las <i>Confesiones</i>?", ["En el alma (memoria, atención, espera)", "En los astros", "En la materia", "Solo en el reloj"], 0,
    ["<i>Distentio animi</i>."]);
  O("pa27", 2, "¿Contra quiénes escribe <i>La Ciudad de Dios</i> en primer lugar?", ["Los paganos que culpaban al cristianismo de la caída de Roma", "Los escépticos", "Los sofistas", "Los epicúreos"], 0,
    ["Tras el saqueo de 410."]);
  O("pa28", 2, "En la polémica con Pelagio, Agustín defiende…", ["la necesidad de la gracia", "que la voluntad basta siempre", "que no hay pecado original", "el escepticismo"], 0,
    ["La voluntad herida necesita la gracia."]);
  O("pa29", 2, "Tertuliano (¿qué tiene que ver Atenas con Jerusalén?) representa la actitud de…", ["rechazo de la filosofía pagana", "síntesis con el platonismo", "aprovechamiento del Logos", "escepticismo"], 0,
    ["Frente a la síntesis de Agustín."]);
  O("pa30", 2, "¿Cuál es el sentido de que Dios cree el tiempo con el mundo?", ["Que antes de la Creación no hay un «antes»", "Que el tiempo no existe", "Que el mundo es eterno", "Que el tiempo es circular"], 0,
    ["Dios vive en la eternidad, sin sucesión."]);

  // ---- nivel 3
  O("pa31", 3, "Texto: «Nos hiciste para ti, y nuestro corazón está inquieto hasta que descanse en ti» (<i>Confesiones</i>, I, 1). Su idea principal es…",
    ["que el ser humano está hecho para Dios y no encuentra reposo sin él", "que el corazón humano es feliz con los placeres", "que Dios no existe", "que el tiempo es circular"], 0,
    ["Tema: la búsqueda de Dios como sentido de la vida."]);
  O("pa32", 3, "Texto: «Si me engaño, existo» (<i>La Ciudad de Dios</i>, XI, 26). Su idea principal es…",
    ["que la propia existencia es una certeza que ni el escéptico puede negar", "que todo es dudoso", "que el cuerpo es malo", "que Dios no existe"], 0,
    ["Respuesta al escepticismo."]);
  O("pa33", 3, "¿Por qué el «si fallor, sum» no es exactamente el «cogito» cartesiano?",
    ["Porque Agustín lo usa contra el escepticismo para ascender a Dios, y Descartes como punto de partida de un método", "Porque Descartes lo escribió antes", "Porque Agustín no hablaba de la duda", "Porque son idénticos"], 0,
    ["Mismo descubrimiento, distinta finalidad."]);
  O("pa34", 3, "Una alumna escribe: «Para Agustín Dios creó el mal para poner a prueba a los hombres». ¿Qué matiz es correcto?",
    ["El mal no es creado: es privación de bien, y el mal moral viene de la voluntad libre", "Tiene razón", "El mal lo crea la materia", "El mal es una ilusión"], 0,
    ["Dios no crea el mal."]);
  O("pa35", 3, "¿Qué diferencia a Agustín de Tertuliano ante la filosofía griega?",
    ["Agustín la aprovecha y la reinterpreta (platonismo); Tertuliano la rechaza", "Agustín la rechaza", "Los dos son iguales", "Tertuliano es neoplatónico"], 0,
    ["Síntesis frente a rechazo."]);
  O("pa36", 3, "¿Por qué es novedosa la visión lineal del tiempo de Agustín frente a la griega?",
    ["Porque da a la historia un principio, un sentido y un final", "Porque niega la historia", "Porque repite los ciclos", "Porque elimina a Dios"], 0,
    ["Los griegos solían pensar en ciclos."]);
  O("pa37", 3, "Frente a la reminiscencia platónica, Agustín explica el conocimiento de las verdades eternas mediante…",
    ["la iluminación divina", "la experiencia sensible", "el azar", "la herencia"], 0,
    ["Dios es el Maestro interior."]);
  M("pa38", 3, "Empareja cada tiempo con su forma de vivirse en el alma.", [
    C("Pasado", ["Memoria", "Atención", "Espera"], 0),
    C("Presente", ["Memoria", "Atención", "Espera"], 1),
    C("Futuro", ["Memoria", "Atención", "Espera"], 2)],
    ["Memoria, atención y espera."], "Pasado–memoria, presente–atención, futuro–espera");
  M("pa39", 3, "Empareja cada autor con su idea.", [
    C("Platón", ["Ideas en un mundo aparte", "Ideas en la mente de Dios", "Certeza del yo como punto de partida del método"], 0),
    C("Agustín", ["Ideas en un mundo aparte", "Ideas en la mente de Dios", "Certeza del yo como punto de partida del método"], 1),
    C("Descartes", ["Ideas en un mundo aparte", "Ideas en la mente de Dios", "Certeza del yo como punto de partida del método"], 2)],
    ["Platón: Ideas separadas; Agustín: en Dios; Descartes: cogito como fundamento."], "Platón–mundo aparte, Agustín–mente de Dios, Descartes–método");
  O("pa40", 3, "¿Qué sostienen Agustín y Pelagio sobre el pecado original?",
    ["Agustín: debilita la voluntad de todos; Pelagio: no daña la naturaleza humana", "Los dos lo niegan", "Pelagio: lo hereda todo el mundo; Agustín: no existe", "No tratan de ello"], 0,
    ["De ahí la discusión sobre la gracia."]);
  R("pa41", "Explica el problema del mal en San Agustín y su solución. Valórala críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Plantea el problema: Dios bueno y todopoderoso frente al mal", p: 0.3 },
    { t: "Explica el mal como privación de bien, no como sustancia (contra el maniqueísmo)", p: 0.5 },
    { t: "Explica el mal moral como mal uso del libre albedrío", p: 0.5 },
    { t: "Menciona el valor de la libertad y la gracia (Pelagio)", p: 0.3 },
    { t: "Valoración crítica (¿explica el mal físico?)", p: 0.4 }],
    ["Planteamiento.", "Privación de bien.", "Libre albedrío.", "Libertad y gracia.", "Valoración."], "El mal es falta de bien; el mal moral nace del libre albedrío");
  R("pa42", "Explica la relación entre fe y razón según San Agustín y sitúa su postura ante la filosofía griega. (Pregunta tipo PAU)", 8, [
    { t: "Cita la fórmula «entiende para creer, cree para entender»", p: 0.4 },
    { t: "Explica que la fe es punto de partida y la razón profundiza", p: 0.5 },
    { t: "Aclara que no significa «creer sin pensar»", p: 0.3 },
    { t: "Sitúa a Agustín entre el rechazo (Tertuliano) y la síntesis (platonismo cristiano)", p: 0.5 },
    { t: "Relaciona con Platón o con Tomás de Aquino", p: 0.3 }],
    ["Fórmula.", "Fe y razón.", "Aclaración.", "Posturas.", "Relación."], "La fe orienta, la razón comprende");
  R("pa43", "Explica la teoría de las dos ciudades y la concepción de la historia de San Agustín. (Pregunta tipo PAU)", 8, [
    { t: "Contexto: saqueo de Roma (410) y fin de la obra", p: 0.4 },
    { t: "Dos ciudades definidas por el amor, no por instituciones", p: 0.5 },
    { t: "Historia lineal frente a visión cíclica griega", p: 0.5 },
    { t: "Papel del Estado: paz terrena y justicia", p: 0.3 },
    { t: "Valoración o influencia posterior", p: 0.3 }],
    ["Contexto.", "Dos ciudades.", "Historia lineal.", "Estado.", "Valoración."], "Dos amores, dos ciudades, una historia con sentido");
  R("pa44", "Comenta este texto: «Dos amores fundaron, pues, dos ciudades: el amor propio hasta el desprecio de Dios, la terrena; el amor de Dios hasta el desprecio de sí, la celestial» (San Agustín, <i>La Ciudad de Dios</i>, XIV, 28; traducción habitual, abreviada). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el origen de las dos ciudades", p: 0.3 },
    { t: "Idea principal: el amor es el criterio que las distingue", p: 0.4 },
    { t: "Aclara términos: amor, desprecio, ciudad (no son Iglesia y Estado)", p: 0.4 },
    { t: "Relaciona con el autor: historia lineal, libre albedrío, amor ordenado", p: 0.5 },
    { t: "Compara con Platón o Aristóteles", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de los dos amores");
  R("pa45", "Explica la respuesta de Agustín al escepticismo y su teoría del conocimiento (verdad interior e iluminación), y compárala con Platón o con Descartes. (Pregunta tipo PAU)", 8, [
    { t: "Expone el escepticismo previo y el «si fallor, sum»", p: 0.5 },
    { t: "Explica las certezas: ser, vivir, entender", p: 0.2 },
    { t: "Explica las Ideas en la mente de Dios y la iluminación", p: 0.5 },
    { t: "Compara con Platón (reminiscencia) o con Descartes (cogito)", p: 0.5 },
    { t: "Valoración", p: 0.3 }],
    ["Escepticismo.", "Certezas.", "Iluminación.", "Comparación.", "Valoración."], "La duda prueba la existencia; la verdad está en el interior y viene de Dios");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Posturas ante la filosofía griega", ancha: true,
      tabla: { cab: ["Autor", "Postura"], filas: [
        ["Tertuliano", "rechazo"],
        ["Justino", "aprovechamiento (semilla del Logos)"],
        ["Agustín", "síntesis con el platonismo"]
      ] } },
    { titulo: "Platón y Agustín", ancha: true,
      tabla: { cab: ["", "Platón", "Agustín"], filas: [
        ["Las Ideas", "mundo inteligible aparte", "en la mente de Dios"],
        ["Conocer", "recordar (reminiscencia)", "iluminación divina"],
        ["Meta", "contemplar el Bien", "descansar en Dios"]
      ] } },
    { titulo: "El mal según Agustín", ancha: true,
      tabla: { cab: ["Tipo", "Origen"], filas: [
        ["Mal metafísico", "limitación de lo creado"],
        ["Mal moral", "mal uso del libre albedrío"],
        ["Mal en sí", "no es sustancia: privación de bien"]
      ] } },
    { titulo: "El tiempo en el alma",
      pasos: ["Pasado: memoria.", "Presente: atención.", "Futuro: espera."],
      nota: "Dios crea el tiempo con el mundo y vive en la eternidad." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "«Cree para entender» es creer sin pensar", bien: "La fe es punto de partida y pide pensar", por: "Fe y razón se complementan." },
        { mal: "Dios creó el mal", bien: "El mal es privación de bien", por: "El mal moral viene del libre albedrío." },
        { mal: "Ciudad de Dios = Iglesia", bien: "Se distinguen por el amor", por: "Hay personas de ambas ciudades en todas partes." },
        { mal: "Si fallor, sum es igual al cogito", bien: "Es un precedente con otro uso", por: "Agustín va hacia Dios; Descartes, al método." }
      ] }
  ];

  B.registrar("historia_fil", "t6", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf6a.secciones,
    nuevas: B.parte.hf6a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
