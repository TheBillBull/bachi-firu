/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 8 (parte B): El Renacimiento y el nacimiento de la ciencia moderna
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t8.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>Renacimiento</b> pasa del teocentrismo al <b>antropocentrismo</b>: el ser humano, su razón y su dignidad ganan protagonismo.",
    "<b>Copérnico</b> (1543) y <b>Galileo</b> (1610–1633) sustituyen el geocentrismo por el <b>heliocentrismo</b>.",
    "La revolución es de <b>método</b>: matemáticas + experimentación controlada.",
    "<b>Maquiavelo</b> (1513) estudia el poder tal como es: la política se separa de la moral.",
    "Sin la autoridad como garantía, nace la pregunta moderna: ¿cómo conocemos con seguridad?"
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Renacimiento y ciencia moderna · siglos XV–XVII",
    autores: [
      { n: "Nicolás Copérnico", f: "1473–1543", l: "Polonia" },
      { n: "Nicolás Maquiavelo", f: "1469–1527", l: "Florencia" },
      { n: "Galileo Galilei", f: "1564–1642", l: "Pisa, Padua, Florencia" }
    ],
    obras: ["Sobre las revoluciones de las esferas celestes", "El Príncipe", "El mensajero sideral", "El Ensayador", "Diálogo sobre los dos máximos sistemas del mundo"],
    bloques: [
      { t: "Contexto", frases: ["Imprenta (hacia 1450), Constantinopla (1453), América (1492), Reforma (1517).", "Se tambalean las verdades heredadas de la Edad Media."] },
      { t: "Mentalidad: humanismo", frases: ["Recuperación de los clásicos grecolatinos.", "El ser humano y su dignidad pasan al centro.", "No se abandona a Dios: cambia el acento."],
        tabla: { cab: ["Edad Media", "Renacimiento"], filas: [["teocentrismo", "antropocentrismo"], ["Biblia y escolástica", "clásicos grecolatinos"]] } },
      { t: "Revolución astronómica", frases: ["Copérnico (1543): el Sol en el centro.", "Galileo: telescopio (1610) y defensa del heliocentrismo.", "Condena en 1633; arresto domiciliario hasta 1642."],
        tabla: { cab: ["Geocentrismo", "Heliocentrismo"], filas: [["Tierra inmóvil en el centro", "Sol en el centro"], ["Aristóteles y Ptolomeo", "Copérnico y Galileo"]] } },
      { t: "Nuevo método científico", frases: ["Matemáticas para expresar las leyes con precisión.", "Experimentación controlada para contrastar hipótesis.", "El libro de la naturaleza está escrito en lenguaje matemático."] },
      { t: "Política: Maquiavelo", frases: ["<i>El Príncipe</i> (1513): el poder tal como es.", "Virtù y fortuna; el zorro y el león.", "La política es autónoma respecto de la moral."],
        tabla: { cab: ["Política medieval", "Maquiavelo"], filas: [["subordinada a la moral", "técnica autónoma"], ["cómo debe ser", "cómo funciona"]] } },
      { t: "El ser humano y el cosmos", frases: ["Pierde el centro físico del universo.", "Gana protagonismo como sujeto que conoce.", "Prepara la pregunta de Descartes sobre el conocimiento."] }
    ],
    resumen: [
      "Del <b>teocentrismo</b> al <b>antropocentrismo</b>; humanismo y vuelta a los clásicos.",
      "<b>Heliocentrismo</b>: Copérnico lo propone y Galileo lo defiende como verdadero.",
      "La ciencia moderna es <b>matemática y experimental</b>.",
      "<b>Maquiavelo</b>: realismo político, política autónoma de la moral.",
      "Nace el problema del <b>conocimiento</b>: Descartes, empiristas, Kant."
    ],
    conecta: [
      { con: "Aristóteles (T4):", rel: "su física y su geocentrismo quedan superados." },
      { con: "Agustín y Tomás (T6–T7):", rel: "la síntesis medieval de fe y razón deja de ser el punto de partida." },
      { con: "Descartes (T9):", rel: "recoge el ideal matemático y se pregunta cómo conocer con seguridad." },
      { con: "Locke y Hume (T10), Kant (T12):", rel: "siguen el camino de la experiencia y su unión con la razón." }
    ],
    claves: [
      ["Antropocentrismo", "el ser humano y su razón en el centro del interés"],
      ["Humanismo", "recuperación de los clásicos grecolatinos y de la dignidad humana"],
      ["Geocentrismo", "la Tierra inmóvil en el centro del universo"],
      ["Heliocentrismo", "el Sol en el centro, la Tierra como planeta más"],
      ["Método experimental", "contrastar hipótesis con experimentos controlados"],
      ["Lenguaje matemático", "la naturaleza se describe con números y geometría"],
      ["Hipótesis", "explicación provisional cuyas consecuencias se contrastan"],
      ["Verdad efectiva", "la realidad del poder tal como funciona (Maquiavelo)"],
      ["Virtù y fortuna", "capacidad del gobernante y circunstancias que no controla"],
      ["Autonomía de la política", "tiene su propia lógica, separada de la moral y la religión"]
    ],
    cita: { txt: "Está escrito en lengua matemática, y sus caracteres son triángulos, círculos y otras figuras geométricas.", autor: "Galileo Galilei", obra: "El Ensayador, 1623 (traducción habitual, abreviada)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    mentalidad: {
      titulo: "¿Edad Media o Renacimiento?",
      consigna: "Toca cada rasgo y después la época a la que corresponde.",
      categorias: ["Edad Media", "Renacimiento"],
      items: [
        { t: "Dios como centro del pensamiento", c: 0 },
        { t: "El ser humano y su dignidad en el centro", c: 1 },
        { t: "Modelo: la Biblia y los Padres de la Iglesia", c: 0 },
        { t: "Modelo: los clásicos grecolatinos", c: 1 },
        { t: "Política subordinada a la ley natural", c: 0 },
        { t: "Política como técnica autónoma", c: 1 }
      ]
    },
    autores: {
      titulo: "Autor e idea",
      consigna: "Une cada autor con su idea.",
      pares: [["Copérnico", "Heliocentrismo"], ["Galileo", "Libro de la naturaleza"], ["Maquiavelo", "Verdad efectiva"], ["Pico della Mirandola", "Dignidad del hombre"]]
    },
    camino: {
      titulo: "Del Renacimiento a la ciencia moderna",
      consigna: "Ordena de más antiguo a más reciente.",
      items: [
        { t: "1453: los turcos toman Constantinopla" },
        { t: "1492: Colón llega a América" },
        { t: "1543: Copérnico publica su obra" },
        { t: "1610: Galileo publica El mensajero sideral" },
        { t: "1633: Galileo se retracta ante el Santo Oficio" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 8",
      preguntas: [
        { q: "El teocentrismo medieval sitúa en el centro…", op: ["a Dios", "al ser humano", "al Sol", "al Estado"], ok: 0, porque: "El antropocentrismo renacentista desplaza el acento al ser humano." },
        { q: "El humanismo renacentista se caracteriza por…", op: ["recuperar a los clásicos grecolatinos", "rechazar toda religión", "defender el geocentrismo", "negar la razón"], ok: 0, porque: "Vuelve a los textos clásicos en su lengua original." },
        { q: "Copérnico publicó su obra en…", op: ["1543", "1492", "1610", "1633"], ok: 0, porque: "Es el año de su muerte y de <i>Sobre las revoluciones de las esferas celestes</i>." },
        { q: "El heliocentrismo sostiene que…", op: ["el Sol está en el centro", "la Tierra está inmóvil en el centro", "todo gira alrededor de la Luna", "el universo es infinito"], ok: 0, porque: "La Tierra es un planeta más." },
        { q: "Galileo apoyó el heliocentrismo con…", op: ["observaciones con el telescopio", "un pasaje bíblico", "la física de Aristóteles", "un viaje a América"], ok: 0, porque: "Montañas lunares, lunas de Júpiter, fases de Venus." },
        { q: "Las dos herramientas del método científico moderno son…", op: ["matemáticas y experimentación", "fe y tradición", "intuición y revelación", "lógica y retórica"], ok: 0, porque: "Leyes cuantitativas contrastadas con experimentos." },
        { q: "Según Galileo, el libro de la naturaleza está escrito en…", op: ["lenguaje matemático", "latín", "lenguaje simbólico religioso", "griego antiguo"], ok: 0, porque: "Sus caracteres son figuras geométricas." },
        { q: "<i>El Príncipe</i> fue escrito por…", op: ["Maquiavelo", "Pico della Mirandola", "Erasmo", "Tomás Moro"], ok: 0, porque: "Hacia 1513; se publicó en 1532." },
        { q: "Para Maquiavelo, la política…", op: ["tiene una lógica propia, autónoma de la moral", "debe subordinarse a la ley natural", "es imposible de estudiar", "es siempre injusta por naturaleza"], ok: 0, porque: "Parte de la «verdad efectiva de la cosa»." },
        { q: "La pregunta que deja abierta el Renacimiento es…", op: ["cómo puede la razón alcanzar un conocimiento seguro", "si existe el mundo exterior", "dónde está el paraíso", "cuál es el mejor régimen político"], ok: 0, porque: "Es la pregunta de Descartes (tema 9)." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre el Renacimiento es FALSA?", op: ["Los humanistas abandonaron la fe en Dios", "Recuperó a los clásicos grecolatinos", "Valoró la dignidad del ser humano", "Fue posible en parte gracias a la imprenta"], ok: 0, porque: "Casi todos los humanistas eran creyentes: cambia el acento, no se niega a Dios." },
        { q: "¿Cuál de estas afirmaciones sobre Galileo es FALSA?", op: ["Inventó el telescopio", "Perfeccionó el telescopio en 1609", "Fue condenado en 1633", "Publicó <i>El mensajero sideral</i> en 1610"], ok: 0, porque: "El telescopio ya se fabricaba en Holanda; Galileo lo mejoró y lo usó para observar el cielo." },
        { q: "¿Cuál de estas afirmaciones sobre el caso Galileo es FALSA?", op: ["Fue quemado vivo", "Se retractó en 1633", "Cumplió arresto domiciliario", "Murió en 1642"], ok: 0, porque: "No fue quemado: eso le ocurrió a Giordano Bruno en 1600." },
        { q: "¿Cuál de estas afirmaciones sobre Copérnico es FALSA?", op: ["Fue condenado por la Inquisición durante su vida", "Publicó su obra en 1543", "Propuso el heliocentrismo", "Conservó órbitas circulares"], ok: 0, porque: "Murió en 1543; su libro se suspendió «hasta ser corregido» en 1616." },
        { q: "¿Cuál de estas afirmaciones sobre el método científico es FALSA?", op: ["Basta con observar sin intervenir", "Usa las matemáticas", "Contrasta hipótesis con experimentos", "Repite y mide los fenómenos"], ok: 0, porque: "Experimentar es provocar el fenómeno en condiciones controladas." },
        { q: "¿Cuál de estas afirmaciones sobre Maquiavelo es FALSA?", op: ["Escribió literalmente «el fin justifica los medios»", "Escribió <i>El Príncipe</i> hacia 1513", "Parte de la «verdad efectiva de la cosa»", "Separa la política de la moral"], ok: 0, porque: "Es una simplificación posterior de su pensamiento." },
        { q: "¿Cuál de estas afirmaciones sobre virtù y fortuna es FALSA?", op: ["La virtù es la virtud moral cristiana", "La virtù es capacidad y habilidad políticas", "La fortuna son las circunstancias", "Ambas determinan el éxito del gobernante"], ok: 0, porque: "Para Maquiavelo la virtù es eficacia, no virtud moral." },
        { q: "¿Cuál de estas afirmaciones sobre la nueva ciencia es FALSA?", op: ["Se apoya sobre todo en la autoridad de Aristóteles", "Usa leyes matemáticas", "Acepta el contraste con la experiencia como árbitro", "Aplica las mismas leyes al cielo y a la Tierra"], ok: 0, porque: "La nueva ciencia sustituye la autoridad por el contraste con la experiencia." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Renacimiento y ciencia moderna",
      cartas: [
        { a: "Teocentrismo", b: "Dios como centro de todo el pensamiento y la vida (Edad Media)." },
        { a: "Antropocentrismo", b: "El ser humano y su razón en el centro (Renacimiento)." },
        { a: "Humanismo", b: "Recuperación de los clásicos grecolatinos y de la dignidad humana." },
        { a: "Pico della Mirandola", b: "1463–1494. Discurso sobre la dignidad del hombre: el ser humano se hace a sí mismo." },
        { a: "Geocentrismo", b: "La Tierra inmóvil en el centro del universo (Aristóteles, Ptolomeo)." },
        { a: "Heliocentrismo", b: "El Sol en el centro; la Tierra es un planeta más (Copérnico)." },
        { a: "Copérnico", b: "1473–1543. Sobre las revoluciones de las esferas celestes (1543)." },
        { a: "Galileo", b: "1564–1642. Telescopio, método matemático-experimental, condena de 1633." },
        { a: "Método científico moderno", b: "Matemáticas + experimentación controlada." },
        { a: "Plano inclinado", b: "Experimento de Galileo: la distancia recorrida es proporcional al cuadrado del tiempo." },
        { a: "Maquiavelo", b: "1469–1527. El Príncipe (hacia 1513): realismo político." },
        { a: "Virtù y fortuna", b: "Capacidad del gobernante y circunstancias que no controla." },
        { a: "Autonomía de la política", b: "La política tiene su propia lógica, separada de la moral y la religión." }
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
  O("re1", 1, "El teocentrismo medieval es la mentalidad que sitúa en el centro…", ["a Dios", "al ser humano", "al Sol", "al Estado"], 0,
    ["Teo- = Dios. Frente a él, antropo- = ser humano."]);
  O("re2", 1, "¿Cómo se llama el movimiento cultural que recupera los textos y el ideal clásico grecolatino?", ["Humanismo", "Patrística", "Escolástica", "Sofística"], 0,
    ["Estudia las «humanidades» leyendo a los clásicos directamente."]);
  O("re3", 1, "Copérnico propuso un modelo del universo llamado…", ["heliocéntrico", "geocéntrico", "atomista", "idealista"], 0,
    ["Helios = Sol: el Sol en el centro."]);
  O("re4", 1, "¿En qué año se publicó <i>Sobre las revoluciones de las esferas celestes</i> de Copérnico?", ["1543", "1492", "1610", "1633"], 0,
    ["1543, el año de su muerte. 1492 es América; 1610, <i>El mensajero sideral</i>; 1633, la condena de Galileo."]);
  O("re5", 1, "¿Qué instrumento perfeccionó Galileo y dirigió al cielo en 1609?", ["El telescopio", "El microscopio", "El reloj de péndulo", "La brújula"], 0,
    ["Con el telescopio vio las montañas de la Luna y las lunas de Júpiter."]);
  T("re6", 1, "Completa: el modelo que sitúa a la Tierra inmóvil en el centro del universo se llama ______céntrico.", "Prefijo =", ["geo", "geocentrico", "geocéntrico", "geocentrismo"],
    ["Geo = Tierra: geocentrismo."], "geo (geocentrismo)");
  M("re7", 1, "Empareja cada obra con su autor.", [
    C("El Príncipe", ["Maquiavelo", "Copérnico", "Galileo"], 0),
    C("Sobre las revoluciones de las esferas celestes", ["Maquiavelo", "Copérnico", "Galileo"], 1),
    C("Diálogo sobre los dos máximos sistemas del mundo", ["Maquiavelo", "Copérnico", "Galileo"], 2)],
    ["<i>El Príncipe</i> (hacia 1513), Maquiavelo; la obra de 1543, Copérnico; el <i>Diálogo</i> (1632), Galileo."], "El Príncipe–Maquiavelo, Revoluciones–Copérnico, Diálogo–Galileo");
  O("re8", 1, "Las dos herramientas del método científico moderno son…", ["las matemáticas y la experimentación", "la fe y la tradición", "la intuición y la revelación", "la retórica y la lógica"], 0,
    ["Leyes cuantitativas y experimentos controlados."]);
  O("re9", 1, "¿De qué ciudad era Maquiavelo?", ["Florencia", "Roma", "Atenas", "Milán"], 0,
    ["Fue funcionario de la república de Florencia."]);
  T("re10", 1, "Completa: Galileo afirma que el libro de la naturaleza está escrito en lenguaje ______.", "Término =", ["matemático", "matemáticas", "matematico", "matematicas"],
    ["Sus caracteres son triángulos, círculos y otras figuras geométricas."], "matemático");
  O("re11", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Maquiavelo → Copérnico → Galileo", "Copérnico → Maquiavelo → Galileo", "Galileo → Copérnico → Maquiavelo", "Maquiavelo → Galileo → Copérnico"], 0,
    ["Maquiavelo (1469), Copérnico (1473), Galileo (1564)."], "Maquiavelo → Copérnico → Galileo");
  O("re12", 1, "¿Quién fue obligado a retractarse ante el Santo Oficio en 1633?", ["Galileo", "Copérnico", "Maquiavelo", "Pico della Mirandola"], 0,
    ["Galileo, con 69 años; Copérnico había muerto en 1543."]);
  O("re13", 1, "¿En qué año llegó Colón a América?", ["1492", "1453", "1517", "1543"], 0,
    ["1492. 1453 es la toma de Constantinopla; 1517, la Reforma."]);
  O("re14", 1, "Maquiavelo escribió <i>El Príncipe</i> hacia…", ["1513", "1543", "1610", "1633"], 0,
    ["Hacia 1513; se publicó en 1532, tras su muerte."]);

  // ---- nivel 2
  V("re15", 2, "«El antropocentrismo renacentista supone abandonar la fe en Dios.»", false, [
    "Es falso: cambia el acento hacia el ser humano, pero casi todos los humanistas eran creyentes", "Es falso: porque el Renacimiento fue un movimiento puramente científico", "Es verdad: porque el humanismo rechaza toda religión", "Es verdad: porque la Reforma suprimió el cristianismo"], 0,
    ["El antropocentrismo es un cambio de acento, no ateísmo."]);
  V("re16", 2, "«Para Galileo, el heliocentrismo era una descripción verdadera del universo y no solo un recurso de cálculo.»", true, [
    "Es verdad: lo defendió con observaciones del telescopio", "Es verdad: porque la Iglesia lo apoyaba", "Es falso: solo lo consideró un truco de cálculo", "Es falso: defendió el geocentrismo"], 0,
    ["Frente a la lectura instrumental inicial de Copérnico, Galileo lo sostiene como verdadero."]);
  V("re17", 2, "«Galileo inventó el telescopio.»", false, [
    "Es falso: el telescopio ya se fabricaba; Galileo lo perfeccionó y lo usó para observar el cielo", "Es falso: Galileo nunca usó telescopio", "Es verdad: nadie lo había construido antes", "Es verdad: lo inventó en 1633"], 0,
    ["Su mérito fue mejorarlo y apuntarlo al cielo en 1609."]);
  V("re18", 2, "«Galileo fue quemado vivo por la Inquisición.»", false, [
    "Es falso: se retractó en 1633 y cumplió arresto domiciliario hasta su muerte en 1642", "Es falso: nunca tuvo problemas con la Iglesia", "Es verdad: murió en la hoguera en 1633", "Es verdad: fue ejecutado en 1616"], 0,
    ["La hoguera fue la suerte de Giordano Bruno (1600), no de Galileo."]);
  V("re19", 2, "«La ciencia moderna combina matemáticas y experimentación controlada.»", true, [
    "Es verdad: expresa leyes con precisión y las contrasta con experimentos", "Es verdad: porque se basa solo en la autoridad de los antiguos", "Es falso: solo usa la observación pasiva", "Es falso: rechaza las matemáticas"], 0,
    ["Es la gran novedad de método."]);
  V("re20", 2, "«Maquiavelo escribió literalmente en <i>El Príncipe</i> la frase “el fin justifica los medios”.»", false, [
    "Es falso: es una simplificación posterior de su pensamiento", "Es falso: Maquiavelo nunca habló de política", "Es verdad: aparece en el capítulo XV", "Es verdad: es el título de un capítulo"], 0,
    ["Resume el espíritu de su obra, pero no es una cita literal."]);
  V("re21", 2, "«Para Maquiavelo la política tiene una lógica propia, separada de la moral y la religión.»", true, [
    "Es verdad: analiza el poder como es, no como debería ser", "Es verdad: porque la política es siempre inmoral", "Es falso: la subordina a la ley natural", "Es falso: la identifica con la teología"], 0,
    ["Autonomía de la política."]);
  O("re22", 2, "¿Por qué la revolución astronómica fue también un desafío filosófico?",
    ["Porque cuestionó la física de Aristóteles y el lugar central del ser humano en el cosmos", "Porque demostró que Dios no existe", "Porque prohibió las matemáticas", "Porque inventó la imprenta"], 0,
    ["Tocó la física, la lectura de la Biblia y la autoimagen humana."]);
  O("re23", 2, "¿Qué añade la experimentación a la simple observación?",
    ["Provoca el fenómeno en condiciones controladas para contrastar una hipótesis", "Solo describe lo que ocurre sin intervenir", "Sustituye a las matemáticas", "Se apoya en la autoridad de un sabio"], 0,
    ["Observar es mirar; experimentar es preguntar a la naturaleza con una prueba preparada."]);
  O("re24", 2, "En Maquiavelo, la «virtù» es…",
    ["la capacidad y habilidad del gobernante para actuar con eficacia", "la virtud moral cristiana", "la ayuda de Dios al príncipe", "la suerte"], 0,
    ["No es virtud moral: es energía y habilidad políticas."]);
  O("re25", 2, "En Maquiavelo, la «fortuna» designa…",
    ["las circunstancias y el azar, que el gobernante no controla del todo", "la riqueza del príncipe", "la voluntad de Dios", "la ley natural"], 0,
    ["Se compara con un río que se desborda: con diques se reducen los daños."]);
  O("re26", 2, "¿Qué diferencia a Galileo de Copérnico respecto al heliocentrismo?",
    ["Copérnico lo planteó al principio como hipótesis matemática; Galileo lo defendió como descripción verdadera", "Copérnico usó el telescopio y Galileo no", "Galileo defendía el geocentrismo", "No hay ninguna diferencia"], 0,
    ["Copérnico (1543) no tenía telescopio; Galileo (1610) sí."]);
  O("re27", 2, "Según Pico della Mirandola, la dignidad humana consiste en…",
    ["poder hacerse a sí mismo con su libertad", "ocupar un lugar fijo en el orden del mundo", "obedecer sin pensar", "estar libre de toda religión"], 0,
    ["El ser humano no tiene naturaleza fija: elige qué ser."]);
  O("re28", 2, "En el plano inclinado, un cuerpo parte del reposo y recorre 2 m en el primer segundo con aceleración constante. ¿Cuánto ha recorrido en total tras 3 segundos?",
    ["18 m", "6 m", "12 m", "9 m"], 0,
    ["La distancia es proporcional a t²: 2 · 3² = 18 m. (6 m sería suponer velocidad constante.)"], "18 m");
  O("re29", 2, "Con los mismos datos (2 m en el primer segundo), ¿cuánto recorre solo durante el tercer segundo?",
    ["10 m", "18 m", "6 m", "8 m"], 0,
    ["Total en 3 s: 18 m; total en 2 s: 2 · 4 = 8 m; el tercer segundo: 18 − 8 = 10 m. Es la regla de los impares: 2, 6, 10."], "10 m");
  O("re30", 2, "Ante un desacuerdo entre una teoría y un experimento bien hecho, la ciencia de Galileo…",
    ["da la razón al experimento y revisa la teoría", "conserva la teoría porque la defendió un sabio antiguo", "ignora el experimento", "recurre a la autoridad de la Iglesia"], 0,
    ["El contraste con la experiencia sustituye a la autoridad."]);

  // ---- nivel 3
  O("re31", 3, "Texto: «Está escrito en lengua matemática, y sus caracteres son triángulos, círculos y otras figuras geométricas» (Galileo, <i>El Ensayador</i>; traducción habitual, abreviada). Su idea principal es…",
    ["que la naturaleza es inteligible y su orden es matemático", "que las matemáticas son un invento humano sin relación con la realidad", "que la Biblia basta para conocer la naturaleza", "que los sentidos son siempre engañosos"], 0,
    ["Tema: el lenguaje de la naturaleza. Idea: hay que aprender matemáticas para entenderla."]);
  O("re32", 3, "Texto: «Me ha parecido más conveniente ir directamente a la verdad efectiva de la cosa que a la imaginación de ella» (Maquiavelo, <i>El Príncipe</i>, XV; traducción habitual). Su idea principal es…",
    ["que hay que estudiar el poder tal como funciona y no como debería ser", "que el príncipe debe imitar a un santo", "que la política es imposible", "que la moral no existe"], 0,
    ["Realismo político frente a los modelos ideales."]);
  O("re33", 3, "¿Qué diferencia a Maquiavelo de Santo Tomás (tema 7) en política?",
    ["Maquiavelo analiza el poder con lógica propia; Tomás subordina la ley humana a la ley natural", "Los dos subordinan la política a la moral", "Maquiavelo defiende la ley natural", "Tomás niega que exista el poder"], 0,
    ["Autonomía de la política frente a política subordinada."]);
  O("re34", 3, "Una alumna escribe: «Copérnico fue condenado por la Inquisición por defender el heliocentrismo». ¿Qué matiz es correcto?",
    ["Murió en 1543 sin ser condenado; su libro se suspendió «hasta ser corregido» en 1616", "Tiene razón: fue quemado en 1543", "Fue Galileo quien lo escribió", "El libro nunca se prohibió"], 0,
    ["La condena afectó a Galileo en 1633; a Copérnico, solo a su libro en 1616."]);
  O("re35", 3, "Una alumna escribe: «Para Maquiavelo todo vale en política». ¿Qué matiz es correcto?",
    ["Su criterio es mantener el Estado; aconseja evitar el odio y la crueldad inútil", "Tiene razón: no pone ningún límite", "Maquiavelo era partidario de la ley natural", "Maquiavelo rechaza el poder"], 0,
    ["Es la caricatura de «el fin justifica los medios»."]);
  O("re36", 3, "¿Por qué el Renacimiento prepara la pregunta de Descartes sobre el conocimiento?",
    ["Porque, sin la autoridad medieval como garantía de la verdad, hay que justificar con la razón cómo conocemos", "Porque la ciencia moderna demostró que no se puede conocer nada", "Porque Descartes fue discípulo de Copérnico", "Porque la Reforma suprimió la filosofía"], 0,
    ["Se tambalea la autoridad y se necesita un fundamento propio."]);
  M("re37", 3, "Empareja cada autor con su idea central.", [
    C("Pico della Mirandola", ["Dignidad humana: el ser humano se hace a sí mismo", "La verdad efectiva de la cosa", "El libro de la naturaleza en lenguaje matemático"], 0),
    C("Maquiavelo", ["Dignidad humana: el ser humano se hace a sí mismo", "La verdad efectiva de la cosa", "El libro de la naturaleza en lenguaje matemático"], 1),
    C("Galileo", ["Dignidad humana: el ser humano se hace a sí mismo", "La verdad efectiva de la cosa", "El libro de la naturaleza en lenguaje matemático"], 2)],
    ["Pico: dignidad; Maquiavelo: realismo; Galileo: matemáticas."], "Pico–dignidad, Maquiavelo–verdad efectiva, Galileo–lenguaje matemático");
  M("re38", 3, "Empareja cada concepto de Maquiavelo con su significado.", [
    C("Virtù", ["Capacidad y habilidad políticas", "Circunstancias y azar", "Actuar contra la moral corriente cuando el Estado lo exige"], 0),
    C("Fortuna", ["Capacidad y habilidad políticas", "Circunstancias y azar", "Actuar contra la moral corriente cuando el Estado lo exige"], 1),
    C("Razón de Estado", ["Capacidad y habilidad políticas", "Circunstancias y azar", "Actuar contra la moral corriente cuando el Estado lo exige"], 2)],
    ["Virtù: eficacia; fortuna: azar; razón de Estado: la supervivencia del Estado manda."], "Virtù–capacidad, fortuna–azar, razón de Estado–supervivencia del Estado");
  O("re39", 3, "¿Qué ejemplo muestra mejor el método moderno frente al aristotélico?",
    ["Medir con un plano inclinado cuánto recorre una bola en tiempos iguales y deducir una ley matemática", "Afirmar que los cuerpos pesados caen más deprisa porque tienden a su lugar natural", "Citar a un autor antiguo para zanjar una discusión", "Deducir la forma del universo solo por razonamiento lógico"], 0,
    ["Medición + experimento + ley matemática."]);
  O("re40", 3, "Hipótesis de Galileo: la distancia recorrida desde el reposo es proporcional a t². ¿Qué consecuencia medible se deduce para tiempos iguales sucesivos?",
    ["Los trozos recorridos están en la proporción 1 : 3 : 5 : 7", "Los trozos recorridos son iguales", "Los trozos están en la proporción 1 : 2 : 3 : 4", "Los trozos disminuyen"], 0,
    ["t² da 1, 4, 9, 16; las diferencias son 1, 3, 5, 7."]);
  O("re41", 3, "¿Cuál de estos hechos es anterior al nacimiento de Galileo (1564)?",
    ["La publicación de la obra de Copérnico (1543)", "<i>El mensajero sideral</i> (1610)", "El <i>Diálogo</i> (1632)", "La retractación (1633)"], 0,
    ["Solo 1543 es anterior a 1564."]);
  R("re42", "Explica el paso del teocentrismo al antropocentrismo y el papel del humanismo. Valora su alcance. (Pregunta tipo PAU)", 9, [
    { t: "Define teocentrismo y antropocentrismo", p: 0.4 },
    { t: "Contextualiza: imprenta, Constantinopla (1453), América (1492)", p: 0.3 },
    { t: "Explica el humanismo: vuelta a los clásicos y dignidad humana (Pico della Mirandola)", p: 0.5 },
    { t: "Aclara que no es ateísmo: cambio de acento", p: 0.3 },
    { t: "Relaciona con la ciencia o con la síntesis medieval (Agustín, Tomás)", p: 0.3 },
    { t: "Valoración o conclusión", p: 0.2 }],
    ["Definiciones.", "Contexto.", "Humanismo.", "Aclaración.", "Relación.", "Conclusión."], "Del Dios en el centro al ser humano que se hace a sí mismo");
  R("re43", "Explica la revolución astronómica de Copérnico a Galileo y por qué fue también un desafío filosófico. (Pregunta tipo PAU)", 9, [
    { t: "Geocentrismo (Aristóteles, Ptolomeo) frente a heliocentrismo", p: 0.4 },
    { t: "Copérnico (1543): modelo y carácter de hipótesis matemática", p: 0.4 },
    { t: "Galileo: telescopio (1610) y defensa del heliocentrismo como verdadero", p: 0.4 },
    { t: "Caso Galileo: retractación en 1633 (sin quemado)", p: 0.3 },
    { t: "Alcance filosófico: física aristotélica y lugar del ser humano", p: 0.4 },
    { t: "Conexión con el problema del conocimiento o valoración", p: 0.1 }],
    ["Modelos.", "Copérnico.", "Galileo.", "Caso Galileo.", "Alcance.", "Conclusión."], "El Sol en el centro: nueva astronomía y nueva imagen del ser humano");
  R("re44", "Explica el método científico moderno y comenta la frase de Galileo sobre el libro de la naturaleza. Compáralo con Aristóteles. (Pregunta tipo PAU)", 9, [
    { t: "Define el método: matemáticas + experimentación controlada", p: 0.4 },
    { t: "Ilustra con un ejemplo (plano inclinado, ley de t²)", p: 0.4 },
    { t: "Comenta la frase: naturaleza inteligible y lenguaje matemático", p: 0.5 },
    { t: "Compara con la física aristotélica (cualitativa, sin experimentos)", p: 0.4 },
    { t: "Consecuencia: el experimento sustituye a la autoridad", p: 0.2 },
    { t: "Valoración o relación con Descartes", p: 0.1 }],
    ["Método.", "Ejemplo.", "Frase.", "Comparación.", "Consecuencia.", "Valoración."], "Matemáticas y experimento: la naturaleza se pregunta con números");
  R("re45", "Explica el pensamiento político de Maquiavelo y su ruptura con la tradición medieval. Valora críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Contexto: Florencia, <i>El Príncipe</i> (hacia 1513)", p: 0.3 },
    { t: "Realismo: la «verdad efectiva de la cosa»", p: 0.4 },
    { t: "Virtù y fortuna", p: 0.4 },
    { t: "Autonomía de la política frente a moral y religión", p: 0.4 },
    { t: "Ruptura con la ley natural de Tomás (tema 7)", p: 0.3 },
    { t: "Valoración crítica (riesgo de justificar el abuso; matiz sobre «el fin justifica los medios»)", p: 0.2 }],
    ["Contexto.", "Realismo.", "Virtù y fortuna.", "Autonomía.", "Ruptura.", "Valoración."], "Realismo político y política autónoma");
  R("re46", "Comenta este texto: «Me ha parecido más conveniente ir directamente a la verdad efectiva de la cosa que a la imaginación de ella. [...] Hay tanta distancia de cómo se vive a cómo se debería vivir, que quien deja lo que se hace por lo que se debería hacer aprende más bien su ruina que su preservación» (Maquiavelo, <i>El Príncipe</i>, cap. XV; traducción habitual, abreviada). Indica tema, ideas, relación con el autor y comparación con otro autor.", 10, [
    { t: "Tema: el método de la reflexión política", p: 0.3 },
    { t: "Idea principal: estudiar el poder tal como es", p: 0.4 },
    { t: "Aclara términos: verdad efectiva, imaginación, ruina y preservación", p: 0.4 },
    { t: "Relaciona con el autor: virtù, fortuna, autonomía de la política", p: 0.4 },
    { t: "Compara con Platón o con Tomás de Aquino", p: 0.3 },
    { t: "Valoración o contexto renacentista", p: 0.2 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de la verdad efectiva");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Edad Media y Renacimiento", ancha: true,
      tabla: { cab: ["", "Edad Media", "Renacimiento"], filas: [
        ["Centro", "Dios (teocentrismo)", "El ser humano (antropocentrismo)"],
        ["Modelo", "Biblia y escolástica", "Clásicos grecolatinos"],
        ["Política", "Subordinada a la moral", "Autónoma (Maquiavelo)"]
      ] } },
    { titulo: "Geocentrismo y heliocentrismo", ancha: true,
      tabla: { cab: ["", "Geocentrismo", "Heliocentrismo"], filas: [
        ["Centro", "La Tierra inmóvil", "El Sol"],
        ["Autores", "Aristóteles, Ptolomeo", "Copérnico (1543), Galileo"],
        ["Argumento", "Lo que vemos y la física aristotélica", "Orden matemático y telescopio (1610)"]
      ] } },
    { titulo: "El método de Galileo",
      pasos: ["Problema y observación.", "Hipótesis matemática.", "Deducción de consecuencias medibles.", "Experimento (plano inclinado).", "Contraste y conclusión."],
      nota: "Distancia ∝ t²: en tiempos iguales, 1 : 3 : 5 : 7." },
    { titulo: "Maquiavelo en cuatro ideas", ancha: true,
      tabla: { cab: ["Idea", "Significado"], filas: [
        ["Verdad efectiva", "El poder tal como funciona"],
        ["Virtù", "Capacidad y habilidad del gobernante"],
        ["Fortuna", "Circunstancias y azar"],
        ["Autonomía de la política", "Lógica propia, separada de la moral"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Renacimiento = abandonar la religión", bien: "Cambia el acento hacia el ser humano", por: "Casi todos los humanistas eran creyentes." },
        { mal: "Galileo inventó el telescopio y fue quemado", bien: "Lo perfeccionó; se retractó en 1633 y cumplió arresto domiciliario", por: "La hoguera fue la de Giordano Bruno (1600)." },
        { mal: "Copérnico fue condenado por la Inquisición", bien: "Murió en 1543; su libro se suspendió en 1616", por: "La condena personal fue la de Galileo." },
        { mal: "Maquiavelo dice que todo vale", bien: "Analiza el poder para mantener el Estado", por: "«El fin justifica los medios» es una simplificación." }
      ] }
  ];

  B.registrar("historia_fil", "t8", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf8a.secciones,
    nuevas: B.parte.hf8a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
