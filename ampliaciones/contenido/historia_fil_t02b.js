/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 2 (parte B)
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t2.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "En la Atenas democrática del siglo V a. C. la filosofía pasa de la naturaleza al <b>ser humano</b> (giro antropológico).",
    "Los <b>sofistas</b> enseñan retórica por dinero y defienden el relativismo: «el hombre es la medida de todas las cosas» (Protágoras).",
    "<b>Sócrates</b> (470–399 a. C.) sostiene que sí hay verdad moral, que se busca dialogando: <b>ironía</b> y <b>mayéutica</b>.",
    "Su ética es el <b>intelectualismo moral</b>: virtud es conocimiento. Murió por cicuta, coherente con lo que pensaba."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Sofistas y Sócrates · siglo V a. C.",
    autores: [
      { n: "Protágoras", f: "h. 490–420 a. C.", l: "Abdera (Tracia) → Atenas" },
      { n: "Gorgias", f: "h. 483–375 a. C.", l: "Leontinos (Sicilia) → Atenas" },
      { n: "Sócrates", f: "470–399 a. C.", l: "Atenas" }
    ],
    obras: ["Sobre el no-ser (Gorgias)", "Sócrates no escribió: lo conocemos por Platón (Apología, Critón, Fedón, Laques)"],
    bloques: [
      { t: "Contexto", frases: ["Atenas democrática: saber hablar da poder.", "<b>Giro antropológico</b>: de la naturaleza al ser humano.", "Guerra del Peloponeso (431–404 a. C.) y crisis de valores."] },
      { t: "Los sofistas", frases: ["Maestros itinerantes de retórica que cobran.", "Las leyes y la moral son <b>nomos</b> (convención), no <b>physis</b>."], tabla: { cab: ["Sofista", "Postura"], filas: [["Protágoras", "relativismo"], ["Gorgias", "escepticismo"], ["Trasímaco", "ley del más fuerte"]] } },
      { t: "Sócrates: el saber", frases: ["Hay verdad moral, pero nadie la posee ya.", "<b>Ignorancia docta</b>: sabe que no sabe.", "Busca definiciones universales («qué es X»)."] },
      { t: "El método", frases: ["Es dialógico: se hace conversando."], tabla: { cab: ["Ironía", "Mayéutica"], filas: [["finge no saber", "ayuda a «parir» la idea"], ["muestra contradicciones", "construye una definición"], ["acaba en aporía", "descubre el interlocutor"]] } },
      { t: "Ética", frases: ["<b>Intelectualismo moral</b>: virtud es conocimiento.", "Nadie hace el mal a sabiendas: el mal es ignorancia.", "La felicidad es cuidar el alma."] },
      { t: "Juicio y muerte", frases: ["Acusado de impiedad y de corromper a la juventud.", "Condenado y ejecutado con cicuta (399 a. C.).", "Rechaza huir (<i>Critón</i>): coherencia con sus ideas."] }
    ],
    resumen: [
      "La filosofía pasa de la <b>naturaleza</b> al <b>ser humano</b>.",
      "Los sofistas dicen que la verdad es <b>relativa</b>; Sócrates, que hay <b>verdad moral</b> y que se busca dialogando.",
      "Para Sócrates, <b>virtud es conocimiento</b> y el mal es ignorancia.",
      "Su legado pasa a <b>Platón</b> (tema 3) y a <b>Aristóteles</b> (tema 4)."
    ],
    conecta: [
      { con: "Presocráticos (T1):", rel: "estudiaban la naturaleza; ahora importa el ser humano." },
      { con: "Platón (T3):", rel: "discípulo de Sócrates; responde a los sofistas con las Ideas." },
      { con: "Aristóteles (T4):", rel: "critica el intelectualismo moral (akrasía)." },
      { con: "Helenismo:", rel: "cínicos y estoicos retoman la filosofía como forma de vida." }
    ],
    claves: [
      ["Giro antropológico", "paso de la naturaleza al ser humano como centro"],
      ["Retórica", "arte de hablar para persuadir"],
      ["Relativismo", "la verdad y la moral dependen de cada sujeto o cultura"],
      ["Physis / nomos", "naturaleza frente a convención"],
      ["Ignorancia docta", "saber que no se sabe"],
      ["Ironía", "fingir ignorancia para que el otro se examine"],
      ["Mayéutica", "arte de ayudar a «dar a luz» el saber"],
      ["Aporía", "callejón sin salida: reconocer que no se sabe"],
      ["Definición universal", "lo común a todos los casos de una virtud"],
      ["Intelectualismo moral", "virtud es conocimiento; el mal es ignorancia"]
    ],
    cita: { txt: "Una vida sin examen no merece ser vivida.", autor: "Sócrates", obra: "Platón, Apología, 38a" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    quien: {
      titulo: "¿Sofistas o Sócrates?",
      consigna: "Toca una frase y después la categoría a la que pertenece.",
      categorias: ["Sofistas", "Sócrates"],
      items: [
        { t: "Enseño retórica y cobro por mis clases", c: 0 },
        { t: "«Solo busco la verdad conversando; no cobro nada»", c: 1 },
        { t: "La verdad depende de cada persona", c: 0 },
        { t: "Existe una definición universal de la justicia, aunque aún no la sepamos", c: 1 },
        { t: "Las leyes son convenciones humanas (nomos)", c: 0 },
        { t: "Mi sabiduría es saber que no sé", c: 1 },
        { t: "Nadie obra mal a sabiendas", c: 1 },
        { t: "Lo importante es persuadir al auditorio", c: 0 }
      ]
    },
    conceptos: {
      titulo: "Autor y concepto",
      consigna: "Une cada autor con su idea.",
      pares: [["Protágoras", "El hombre, medida de todas las cosas"], ["Gorgias", "Nada existe; si existiera, no sería cognoscible"], ["Trasímaco", "Lo justo es lo que conviene al más fuerte"], ["Sócrates", "Ignorancia docta y mayéutica"], ["Aristóteles", "Crítica del intelectualismo moral (akrasía)"]]
    },
    dialogo: {
      titulo: "Un diálogo socrático",
      consigna: "Ordena los pasos del método.",
      items: [
        { t: "Sócrates finge ignorancia y pregunta: «¿qué es la valentía?»" },
        { t: "El interlocutor da una primera definición" },
        { t: "Sócrates la prueba con un contraejemplo" },
        { t: "El interlocutor reconoce que no sabía lo que creía saber (aporía)" },
        { t: "Con nuevas preguntas, busca junto a él una definición mejor (mayéutica)" }
      ]
    },
    juicio: {
      titulo: "Cronología del final de Sócrates",
      consigna: "Ordena de más antiguo a más reciente.",
      items: [
        { t: "431 a. C.: comienza la guerra del Peloponeso" },
        { t: "423 a. C.: Aristófanes estrena <i>Las nubes</i>" },
        { t: "404 a. C.: Atenas pierde la guerra; gobiernan los Treinta Tiranos" },
        { t: "403 a. C.: se restaura la democracia" },
        { t: "399 a. C.: juicio y muerte de Sócrates" }
      ]
    },
    quiz2: {
      titulo: "Test del tema 2",
      preguntas: [
        { q: "El giro antropológico consiste en…", op: ["pasar del estudio de la naturaleza al del ser humano", "negar que exista la naturaleza", "dejar de hacer filosofía", "volver al mito"], ok: 0, porque: "La pregunta central pasa de «¿de qué está hecho el mundo?» a «¿cómo debemos vivir?»." },
        { q: "Los sofistas eran…", op: ["maestros itinerantes que cobraban por enseñar retórica", "sacerdotes del oráculo de Delfos", "soldados espartanos", "discípulos de Platón"], ok: 0, porque: "Fueron los primeros profesores profesionales; enseñaban a persuadir." },
        { q: "«El hombre es la medida de todas las cosas» expresa…", op: ["el relativismo de Protágoras", "el escepticismo de Gorgias", "el intelectualismo moral de Sócrates", "la teoría de las Ideas"], ok: 0, porque: "Cada sujeto es el criterio de lo verdadero para sí." },
        { q: "Physis y nomos se oponen como…", op: ["naturaleza y convención", "cuerpo y alma", "ser y no-ser", "razón y sentidos"], ok: 0, porque: "Los sofistas dicen que las leyes y la moral son nomos." },
        { q: "La ironía socrática es…", op: ["fingir ignorancia para que el interlocutor se examine", "burlarse del interlocutor", "negar toda verdad", "dar una lección magistral"], ok: 0, porque: "Es la fase negativa del método." },
        { q: "La mayéutica pretende…", op: ["ayudar al interlocutor a descubrir por sí mismo la verdad", "transmitir una doctrina cerrada", "ganar el debate", "cobrar por enseñar"], ok: 0, porque: "El saber ya está en el alma y se ayuda a «dar a luz»." },
        { q: "«Virtud es conocimiento» significa que…", op: ["quien sabe de verdad qué es el bien lo practica", "las virtudes son innatas", "solo los sabios son felices en el Hades", "la virtud se compra"], ok: 0, porque: "Intelectualismo moral: el mal es ignorancia." },
        { q: "Sócrates fue condenado por…", op: ["no creer en los dioses de la ciudad y corromper a la juventud", "traición a Esparta", "robo", "enseñar retórica por dinero"], ok: 0, porque: "Acusación de Meleto, Anito y Licón (399 a. C.)." },
        { q: "En el Critón, Sócrates rechaza huir porque…", op: ["escapar sería quebrantar las leyes con las que ha vivido", "tiene miedo a morir", "cree que el juicio fue justo", "no hay lugar adonde ir"], ok: 0, porque: "No se devuelve injusticia con injusticia." },
        { q: "La principal fuente sobre Sócrates es…", op: ["Platón, su discípulo", "el propio Sócrates", "Protágoras", "Parménides"], ok: 0, porque: "Sócrates no escribió nada." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta contiene una afirmación típicamente mal entendida. Elige la que es FALSA.",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Sócrates cobraba por sus enseñanzas, como los sofistas", "Sócrates no dejó nada escrito", "Sócrates dialogaba en el ágora", "Sócrates bebió cicuta"], ok: 0, porque: "Una diferencia clave con los sofistas es que Sócrates no cobraba." },
        { q: "¿Cuál es FALSA?", op: ["Sócrates era escéptico: negaba que existiera verdad moral", "Sócrates reconocía su ignorancia", "Sócrates buscaba definiciones universales", "Sócrates creía que se puede conocer el bien"], ok: 0, porque: "No es escepticismo: cree que hay verdad y que se busca." },
        { q: "¿Cuál es FALSA?", op: ["La ironía socrática es burlarse del interlocutor", "La ironía finge ignorancia", "La ironía conduce a la aporía", "La mayéutica viene después de la ironía"], ok: 0, porque: "Ironía = fingir no saber, no sarcasmo." },
        { q: "¿Cuál es FALSA?", op: ["Todos los sofistas defendían la ley del más fuerte", "Protágoras defendía el relativismo", "Gorgias era escéptico", "Trasímaco decía que lo justo conviene al más fuerte"], ok: 0, porque: "Solo algunos (Trasímaco, Calicles); no hay doctrina común." },
        { q: "¿Cuál es FALSA?", op: ["Los presocráticos son posteriores a Sócrates", "Protágoras es anterior a Platón", "Sócrates es anterior a Aristóteles", "Platón fue discípulo de Sócrates"], ok: 0, porque: "Los presocráticos son anteriores (o ajenos) al giro de Sócrates." },
        { q: "¿Cuál es FALSA?", op: ["Para Sócrates se puede obrar mal sabiendo con certeza qué es el bien", "Para Sócrates el mal es ignorancia", "Para Sócrates la virtud es conocimiento", "Para Sócrates cometer injusticia es peor que sufrirla"], ok: 0, porque: "Nadie obra mal a sabiendas; Aristóteles objetará con la akrasía." }
      ]
    },
    tarjetas2: {
      titulo: "Tarjetas del tema 2",
      cartas: [
        { a: "Giro antropológico", b: "Paso de la pregunta por la naturaleza a la pregunta por el ser humano (Atenas, s. V a. C.)" },
        { a: "Sofistas", b: "Maestros itinerantes de retórica que cobran; relativismo" },
        { a: "Retórica", b: "Arte de hablar y persuadir; poder en la democracia ateniense" },
        { a: "Physis / nomos", b: "Naturaleza frente a convención; leyes y moral son nomos" },
        { a: "Protágoras", b: "«El hombre es la medida de todas las cosas»: relativismo (h. 490–420 a. C.)" },
        { a: "Gorgias", b: "Sobre el no-ser: nada existe, no sería cognoscible ni comunicable (escepticismo)" },
        { a: "Trasímaco", b: "En la República: lo justo es lo que conviene al más fuerte" },
        { a: "Sócrates", b: "470–399 a. C.; no escribió; dialoga; ignorancia docta; intelectualismo moral" },
        { a: "Ignorancia docta", b: "Saber que no se sabe: punto de partida de la búsqueda" },
        { a: "Ironía", b: "Fase negativa: fingir ignorancia y mostrar contradicciones" },
        { a: "Mayéutica", b: "Fase positiva: ayudar a «dar a luz» la definición" },
        { a: "Aporía", b: "Callejón sin salida: el interlocutor reconoce que no sabe" },
        { a: "Intelectualismo moral", b: "Virtud es conocimiento; el mal es ignorancia" },
        { a: "Akrasía", b: "Debilidad de la voluntad: Aristóteles la opone a Sócrates" },
        { a: "Juicio de Sócrates (399 a. C.)", b: "Acusado de impiedad y de corromper a la juventud; cicuta" },
        { a: "Critón", b: "Diálogo donde Sócrates rechaza huir: no se responde a la injusticia con injusticia" }
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
      check: [C("¿Verdadero o falso?", VF, ver ? 0 : 1), C("Justificación", justif, ok)], pasos: pasos, resultado: res });
  }
  function T(id, nv, enun, et, valores, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "texto", etiqueta: et, valores: valores }, pasos: pasos, resultado: res });
  }
  function R(id, enun, filas, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("hs1", 1, "El «giro antropológico» consiste en…",
    ["pasar de preguntarse por la naturaleza a preguntarse por el ser humano", "dejar de usar la razón", "volver al mito", "estudiar solo los astros"], 0,
    ["Los presocráticos preguntaban por el arché; sofistas y Sócrates, por el conocimiento, la moral y la política."]);
  O("hs2", 1, "¿Dónde y cuándo tiene lugar el giro antropológico?",
    ["En Atenas, en el siglo V a. C.", "En Mileto, en el siglo VI a. C.", "En Roma, en el siglo I a. C.", "En Alejandría, en el siglo III a. C."], 0,
    ["La Atenas democrática del siglo V a. C. es el escenario."]);
  O("hs3", 1, "¿Qué enseñaban sobre todo los sofistas?",
    ["Retórica y argumentación", "Astronomía", "Teología", "Escultura"], 0,
    ["Enseñaban a hablar y persuadir, útil en la asamblea y los tribunales."]);
  O("hs4", 1, "¿Quién dijo que «el hombre es la medida de todas las cosas»?",
    ["Protágoras", "Sócrates", "Gorgias", "Parménides"], 0,
    ["Frase de Protágoras de Abdera, recogida por Platón en el Teeteto."]);
  M("hs5", 1, "Empareja cada autor con su postura.", [
    C("Protágoras", ["Relativismo", "Escepticismo", "Ley del más fuerte", "Ignorancia docta"], 0),
    C("Gorgias", ["Relativismo", "Escepticismo", "Ley del más fuerte", "Ignorancia docta"], 1),
    C("Trasímaco", ["Relativismo", "Escepticismo", "Ley del más fuerte", "Ignorancia docta"], 2),
    C("Sócrates", ["Relativismo", "Escepticismo", "Ley del más fuerte", "Ignorancia docta"], 3)],
    ["Protágoras: relativismo · Gorgias: escepticismo · Trasímaco: ley del más fuerte · Sócrates: ignorancia docta."],
    "Protágoras–relativismo, Gorgias–escepticismo, Trasímaco–ley del más fuerte, Sócrates–ignorancia docta");
  T("hs6", 1, "Completa: los sofistas decían que las leyes son convención, en griego ______ (frente a physis). Escribe el término.", "Término =", ["nomos"],
    ["Nomos = convención, ley hecha por los humanos; physis = naturaleza."], "nomos");
  T("hs7", 1, "Completa: el método de Sócrates para ayudar a «dar a luz» el conocimiento se llama ______. Escribe el término.", "Término =", ["mayéutica", "mayeutica"],
    ["Mayéutica (arte de partear), por el oficio de su madre."], "mayéutica");
  O("hs8", 1, "¿Qué sabemos sobre los escritos de Sócrates?",
    ["No escribió nada; lo conocemos sobre todo por Platón", "Escribió la República", "Escribió el Teeteto", "Dejó su obra completa en Delfos"], 0,
    ["Sócrates solo dialogaba; la fuente principal es Platón."]);
  O("hs9", 1, "¿Cómo murió Sócrates?",
    ["Bebiendo cicuta, condenado por un tribunal ateniense", "En la guerra del Peloponeso", "Desterrado en Esparta", "De viejo, en su casa"], 0,
    ["Fue ejecutado con cicuta en el 399 a. C."]);
  O("hs10", 1, "La retórica es…",
    ["el arte de hablar y persuadir", "una rama de la geometría", "una religión", "un tipo de poesía"], 0,
    ["Era la técnica estrella de los sofistas."]);
  O("hs11", 1, "La ironía socrática consiste en…",
    ["fingir ignorancia para que el interlocutor se examine", "reírse del otro", "negar la verdad", "contar un mito"], 0,
    ["No es sarcasmo: es una táctica para que el otro cuestione sus certezas."]);
  O("hs12", 1, "¿Qué orden cronológico (por nacimiento) es el correcto?",
    ["Protágoras → Sócrates → Platón → Aristóteles", "Sócrates → Protágoras → Aristóteles → Platón", "Platón → Sócrates → Protágoras → Aristóteles", "Aristóteles → Platón → Sócrates → Protágoras"], 0,
    ["Protágoras (h. 490), Sócrates (470), Platón (427), Aristóteles (384 a. C.)."]);
  T("hs13", 1, "Completa: Sócrates nació y murió en la ciudad de ______.", "Ciudad =", ["Atenas"],
    ["Sócrates vivió siempre en Atenas (470–399 a. C.)."], "Atenas");
  O("hs14", 1, "«Physis» significa…", ["naturaleza", "ley", "retórica", "alma"], 0,
    ["Physis = naturaleza; nomos = convención."]);

  // ---- nivel 2
  V("hs15", 2, "«Para Protágoras existe una verdad objetiva independiente de quien la juzga.»", false, [
    "Al contrario: lo verdadero depende de cada sujeto, que es la medida de las cosas",
    "Porque solo existe el agua",
    "Porque Protágoras negaba la retórica",
    "Porque coincide con Sócrates"], 0,
    ["Es la posición de Sócrates, no la de Protágoras.", "Protágoras es relativista."], "Falso: para Protágoras la verdad es relativa");
  V("hs16", 2, "«Sócrates, como los sofistas, cobraba por enseñar.»", false, [
    "Sócrates no cobraba y vivía con poco; los sofistas sí eran profesores de pago",
    "Porque Sócrates era muy rico",
    "Porque no sabía hablar",
    "Porque Sócrates era extranjero"], 0,
    ["Una diferencia clave entre ambos."], "Falso: Sócrates no cobraba");
  V("hs17", 2, "«Para Sócrates nadie hace el mal a sabiendas.»", true, [
    "Quien obra mal lo hace por ignorancia: cree que eso le conviene",
    "Porque el mal no existe",
    "Porque todos son virtuosos por naturaleza",
    "Porque los dioses lo impiden"], 0,
    ["Es el núcleo del intelectualismo moral."], "Verdadero: el mal es ignorancia");
  V("hs18", 2, "«Sócrates era escéptico: sostenía que no hay verdad moral que buscar.»", false, [
    "Cree que hay verdades morales universales y que se buscan dialogando",
    "Porque solo creía en el agua",
    "Porque nunca dudaba",
    "Porque era sofista"], 0,
    ["Reconocer la ignorancia no es negar la verdad: es el punto de partida de la búsqueda."], "Falso: no es escéptico");
  O("hs19", 2, "¿Cuál de estas cosas es nomos y no physis?",
    ["La norma de circular por la derecha", "La caída de los cuerpos", "El ciclo de las estaciones", "Que el fuego queme"], 0,
    ["Las normas sociales son convenciones humanas; lo demás es naturaleza."]);
  O("hs20", 2, "La tesis de Gorgias en <em>Sobre el no-ser</em> es…",
    ["nada existe; si existiera, no sería cognoscible; y si lo fuera, no sería comunicable", "el hombre es la medida de todas las cosas", "lo justo es lo que conviene al más fuerte", "virtud es conocimiento"], 0,
    ["Es una forma radical de escepticismo."]);
  O("hs21", 2, "¿Qué es la «ignorancia docta»?",
    ["Saber que no se sabe, punto de partida para buscar", "No querer aprender", "Un conocimiento secreto", "Ignorar las leyes"], 0,
    ["Sócrates es más sabio que otros solo en que no cree saber lo que no sabe."]);
  O("hs22", 2, "La mayéutica supone que…",
    ["el conocimiento está latente en cada persona y se ayuda a sacarlo con preguntas", "el maestro vierte su saber en el alumno", "la verdad no existe", "se aprende solo memorizando"], 0,
    ["Como el oficio de partera: no da el hijo, ayuda a nacer."]);
  M("hs23", 2, "¿Ironía o mayéutica?", [
    C("Fingir ignorancia y mostrar contradicciones", ["Ironía", "Mayéutica"], 0),
    C("Ayudar a dar a luz una definición mejor", ["Ironía", "Mayéutica"], 1),
    C("Provocar la aporía", ["Ironía", "Mayéutica"], 0)],
    ["La ironía destruye falsas certezas; la mayéutica construye."], "Ironía · Mayéutica · Ironía");
  O("hs24", 2, "Trasímaco sostiene en la <em>República</em> I que…",
    ["la justicia es lo que conviene al más fuerte", "la justicia es conocimiento", "la justicia no existe en Atenas", "la justicia es obra de los dioses"], 0,
    ["Es la tesis de la ley del más fuerte."]);
  O("hs25", 2, "Una «aporía» es…",
    ["un callejón sin salida en el que se reconoce que no se sabe", "una definición perfecta", "un tipo de ley", "una fiesta ateniense"], 0,
    ["Es el resultado de la ironía socrática."]);
  O("hs26", 2, "¿Por qué se niega Sócrates a huir de la cárcel (<em>Critón</em>)?",
    ["Porque escapar sería quebrantar las leyes con las que ha vivido", "Porque cree que la sentencia es justa", "Porque no tiene amigos", "Porque teme a la muerte"], 0,
    ["Considera la sentencia injusta, pero no se responde a una injusticia con otra."]);
  O("hs27", 2, "«Virtud es conocimiento» implica que…",
    ["quien sabe de verdad qué es el bien lo practica", "la virtud es un don divino", "el conocimiento hace malos a los hombres", "la virtud es cuestión de suerte"], 0,
    ["Conocer el bien es suficiente para obrar bien."]);
  M("hs28", 2, "¿De quién es cada idea o frase?", [
    C("«El hombre es la medida de todas las cosas.»", ["Protágoras", "Gorgias", "Sócrates", "Trasímaco"], 0),
    C("«Nada existe.»", ["Protágoras", "Gorgias", "Sócrates", "Trasímaco"], 1),
    C("«Una vida sin examen no merece ser vivida.»", ["Protágoras", "Gorgias", "Sócrates", "Trasímaco"], 2),
    C("«Lo justo es lo que conviene al más fuerte.»", ["Protágoras", "Gorgias", "Sócrates", "Trasímaco"], 3)],
    ["Cada frase resume la tesis de su autor."], "Protágoras, Gorgias, Sócrates, Trasímaco");
  O("hs29", 2, "¿De qué fue acusado Sócrates?",
    ["De no creer en los dioses de la ciudad y de corromper a la juventud", "De traición a Esparta", "De robar un templo", "De enseñar retórica por dinero"], 0,
    ["Acusación de Meleto, Anito y Licón."]);

  // ---- nivel 3
  O("hs30", 3, "Texto: «El hombre es la medida de todas las cosas: de las que son, en cuanto que son; de las que no son, en cuanto que no son» (Protágoras). Su idea principal es…",
    ["que cada sujeto es el criterio de verdad, de modo que la verdad es relativa", "que existe una verdad objetiva que debemos descubrir", "que todo es agua", "que nada existe"], 0,
    ["Idea principal: relativismo (subjetivismo)."]);
  O("hs31", 3, "Texto: «Yo, así como no sé, tampoco creo saber» (Platón, <em>Apología</em>, 21d). Su idea principal es…",
    ["que la sabiduría de Sócrates es reconocer su ignorancia, a diferencia de quien cree saber sin saber", "que Sócrates lo sabe todo", "que nadie puede conocer nada", "que los dioses saben menos que él"], 0,
    ["Ignorancia docta, punto de partida de la búsqueda."]);
  O("hs32", 3, "Texto: «No se debe cometer injusticia ni devolver injusticia por injusticia» (idea del <em>Critón</em>). ¿Cómo se relaciona con el pensamiento de Sócrates?",
    ["Es coherente con su tesis de que la injusticia daña el alma, que es lo más valioso", "Contradice su ética del conocimiento", "Muestra que defendía la ley del más fuerte", "Muestra que era relativista"], 0,
    ["Cometer injusticia es peor que sufrirla: daña el alma."]);
  O("hs33", 3, "¿Qué objeta Aristóteles al intelectualismo moral?",
    ["Que existe la akrasía: se puede saber lo que es bueno y obrar mal por debilidad de la voluntad", "Que el mal no existe", "Que Sócrates no escribió", "Que la virtud es innata"], 0,
    ["Aristóteles (Ética a Nicómaco VII) matiza que no basta con saber."]);
  O("hs34", 3, "¿Cómo responde Platón a los sofistas, siguiendo a Sócrates?",
    ["Defendiendo una verdad objetiva (las Ideas) accesible a la razón", "Aceptando el relativismo", "Negando toda filosofía", "Enseñando retórica por dinero"], 0,
    ["Teoría de las Ideas (tema 3): verdad universal."]);
  O("hs35", 3, "¿Por qué la mayéutica es incompatible con el relativismo de Protágoras?",
    ["Porque la mayéutica supone que hay una verdad que se puede descubrir, y el relativismo la niega", "Porque la mayéutica es retórica", "Porque Protágoras no hablaba", "No es incompatible"], 0,
    ["Dar a luz una definición implica que unas definiciones son mejores que otras."]);
  O("hs36", 3, "Encuentra el error. ¿Cuál es FALSA?",
    ["Gorgias fue discípulo de Sócrates", "Gorgias escribió Sobre el no-ser", "Gorgias fue un maestro de la retórica", "Gorgias nació en Sicilia"], 0,
    ["Gorgias fue sofista, no discípulo de Sócrates."]);
  O("hs37", 3, "Encuentra el error. ¿Cuál es FALSA?",
    ["Sócrates defendía el relativismo moral", "Sócrates buscaba definiciones universales", "Sócrates practicaba la ironía", "Sócrates identificaba virtud y conocimiento"], 0,
    ["Defendía una moral universal."]);
  O("hs38", 3, "Encuentra el error. ¿Cuál es FALSA?",
    ["Sócrates fue condenado por un tribunal espartano", "Fue acusado por Meleto, Anito y Licón", "Fue condenado en el 399 a. C.", "Bebió cicuta"], 0,
    ["Lo juzgó un tribunal ateniense."]);
  O("hs39", 3, "¿Qué comparten sofistas y Sócrates?",
    ["Ambos hacen del ser humano y del diálogo el centro de su reflexión", "Ambos cobran", "Ambos son relativistas", "Ambos escribieron tratados"], 0,
    ["Comparten el giro antropológico; difieren en la verdad y la finalidad."]);
  O("hs40", 3, "¿Por qué prosperaron los sofistas en Atenas en el siglo V a. C.?",
    ["Porque en la democracia saber hablar daba poder político", "Porque Atenas era una monarquía", "Porque no había leyes", "Porque Esparta lo exigió"], 0,
    ["La asamblea y los tribunales exigían persuadir."]);
  O("hs41", 3, "¿Qué ocurrió antes: los Treinta Tiranos o el juicio de Sócrates?",
    ["Los Treinta Tiranos (404–403 a. C.), antes del juicio (399 a. C.)", "El juicio, antes que los Treinta Tiranos", "Ocurrieron el mismo año", "Los Treinta Tiranos fueron posteriores"], 0,
    ["404–403 a. C. frente a 399 a. C."]);

  R("hs42", "Compara a los sofistas y a Sócrates: verdad, método y finalidad. (Pregunta tipo PAU)", 9, [
    { t: "Explica el giro antropológico y el contexto (Atenas, democracia)", p: 0.3 },
    { t: "Sofistas: retórica, cobran, relativismo (Protágoras), escepticismo (Gorgias)", p: 0.5 },
    { t: "Sócrates: verdad moral universal, ignorancia docta, definiciones", p: 0.5 },
    { t: "Contrapone finalidad: persuadir/triunfar frente a mejorar el alma", p: 0.4 },
    { t: "Señala qué comparten (el ser humano y el diálogo) y conecta con Platón", p: 0.3 }],
    ["Contexto.", "Sofistas.", "Sócrates.", "Contraste.", "Cierre: Platón."], "Los sofistas son relativistas y persuaden; Sócrates busca la verdad moral dialogando");
  R("hs43", "Explica el método socrático: ironía y mayéutica, con un ejemplo. (Pregunta tipo PAU)", 8, [
    { t: "Define el método como dialógico y distingue las dos fases", p: 0.4 },
    { t: "Ironía: fingir ignorancia, mostrar contradicciones, llegar a la aporía", p: 0.5 },
    { t: "Mayéutica: ayudar a dar a luz una definición; el saber está latente", p: 0.5 },
    { t: "Pone un ejemplo (p. ej., ¿qué es la valentía?)", p: 0.4 },
    { t: "Relaciona con la ignorancia docta o con Platón", p: 0.2 }],
    ["Dos fases.", "Ironía.", "Mayéutica.", "Ejemplo.", "Relación."], "Ironía para vaciar falsas certezas; mayéutica para construir la definición");
  R("hs44", "Explica el intelectualismo moral de Sócrates y la crítica de Aristóteles. (Pregunta tipo PAU)", 8, [
    { t: "Virtud es conocimiento; el mal es ignorancia", p: 0.5 },
    { t: "Nadie obra mal a sabiendas; saber el bien basta para practicarlo", p: 0.5 },
    { t: "Felicidad y cuidado del alma", p: 0.3 },
    { t: "Crítica de Aristóteles: la akrasía", p: 0.5 },
    { t: "Valoración personal o ejemplo cotidiano", p: 0.2 }],
    ["Tesis.", "Consecuencias.", "Felicidad.", "Crítica.", "Valoración."], "Virtud es conocimiento; Aristóteles objeta con la akrasía");
  R("hs45", "Comenta este texto: «El hombre es la medida de todas las cosas: de las que son, en cuanto que son; de las que no son, en cuanto que no son» (Protágoras, en Platón, <em>Teeteto</em> 152a). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: la verdad y el sujeto (relativismo)", p: 0.3 },
    { t: "Idea principal: cada sujeto es criterio de lo verdadero", p: 0.4 },
    { t: "Relaciona con el autor y con los sofistas: nomos, retórica, utilidad", p: 0.5 },
    { t: "Compara con Sócrates (verdad universal) o Platón (Ideas)", p: 0.5 },
    { t: "Contexto o valoración (democracia ateniense; relativismo actual)", p: 0.3 }],
    ["Tema → idea → autor → comparación → valoración."], "Comentario de Protágoras, Teeteto 152a");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Sofistas frente a Sócrates", ancha: true,
      tabla: { cab: ["", "Sofistas", "Sócrates"], filas: [
        ["Verdad", "relativa o inalcanzable", "existe y se busca"],
        ["Fin del diálogo", "persuadir y triunfar", "mejorar el alma"],
        ["Enseñan", "técnicas (retórica); cobran", "nada; ayudan a descubrir; no cobra"],
        ["Moral", "convención (nomos)", "universal; virtud es conocimiento"]
      ] } },
    { titulo: "Método socrático", ancha: true,
      tabla: { cab: ["Ironía", "Mayéutica"], filas: [
        ["finge no saber", "ayuda a «dar a luz»"],
        ["muestra contradicciones", "construye una definición"],
        ["acaba en aporía", "descubre el interlocutor"]
      ] } },
    { titulo: "Intelectualismo moral",
      pasos: ["La virtud es conocimiento del bien.", "Quien conoce el bien lo practica.", "Nadie hace el mal a sabiendas.", "El mal es fruto de la ignorancia.", "Cuidar el alma es buscar el saber."],
      nota: "Aristóteles objeta: la akrasía." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Sócrates era escéptico", bien: "Cree en la verdad moral y la busca", por: "La ignorancia docta es punto de partida." },
        { mal: "Todos los sofistas defendían la ley del más fuerte", bien: "Protágoras, relativista; Gorgias, escéptico; Trasímaco, ley del más fuerte", por: "No hay doctrina común." },
        { mal: "La ironía socrática es burlarse", bien: "Es fingir ignorancia para que el otro se examine", por: "No es sarcasmo." }
      ] }
  ];

  B.registrar("historia_fil", "t2", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf2a.secciones,
    nuevas: B.parte.hf2a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
