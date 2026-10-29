/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 16 (parte B): Ortega y Gasset y la filosofía española
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t16.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Ortega (1883–1955) parte de «<b>yo soy yo y mi circunstancia</b>»: no hay yo sin circunstancia, y hay que «salvarla» comprendiéndola.",
    "<b>Perspectivismo</b>: cada punto de vista capta una parte de la única verdad; no es relativismo.",
    "<b>Raciovitalismo</b>: la razón es <b>vital</b> (al servicio de la vida) e <b>histórica</b>: el ser humano no tiene naturaleza, tiene historia.",
    "La vida es la <b>realidad radical</b>; en las <b>creencias</b> se está, las <b>ideas</b> se tienen.",
    "<i>La rebelión de las masas</i> (1930): el <b>hombre-masa</b> es una actitud, no una clase social. Contexto: Unamuno, Zambrano (razón poética) y Zubiri (inteligencia sentiente)."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Ortega y Gasset · 1883–1955",
    autores: [{ n: "José Ortega y Gasset", f: "1883–1955", l: "Madrid; formado en Alemania (Marburgo); exilio 1936–1945" }],
    obras: ["Meditaciones del Quijote", "España invertebrada", "El tema de nuestro tiempo", "La deshumanización del arte", "La rebelión de las masas", "Ideas y creencias", "Historia como sistema"],
    bloques: [
      { t: "Contexto", frases: ["España tras el desastre de 1898: Unamuno y el 98.", "Ortega es del <b>Novecentismo</b>: razón, Europa, reforma.", "Funda la <i>Revista de Occidente</i> (1923)."] },
      { t: "Circunstancia y perspectiva", frases: ["«Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.»", "<b>Perspectivismo</b>: cada punto de vista capta una parte de la verdad.", "No es relativismo: la verdad es una."],
        tabla: { cab: ["Racionalismo", "Perspectivismo"], filas: [["verdad sin punto de vista", "verdad vista desde un lugar"], ["Descartes, yo aislado", "yo + circunstancia"]] } },
      { t: "Raciovitalismo", frases: ["Ni razón pura (racionalismo) ni vida sin razón (vitalismo irracional).", "<b>Razón vital</b>: la razón es un órgano de la vida.", "<b>Razón histórica</b>: el ser humano no tiene naturaleza, tiene historia."] },
      { t: "La vida, realidad radical", frases: ["Mi vida (yo + circunstancia) es la realidad en la que aparece todo.", "La vida es <b>quehacer</b>, proyecto y vocación.", "En las <b>creencias</b> se está; las <b>ideas</b> se tienen."],
        tabla: { cab: ["Ideas", "Creencias"], filas: [["se tienen, se discuten", "se está en ellas, nos sostienen"], ["teoría científica", "que el suelo me sostiene"]] } },
      { t: "Sociedad: la rebelión de las masas", frases: ["<b>Hombre-masa</b>: satisfecho de sí, no se exige nada, impone su opinión.", "Masa y minoría son <b>actitudes</b>, no clases sociales.", "Riesgo: Estado omnipotente y crisis de Europa."] },
      { t: "La filosofía española", frases: ["<b>Unamuno</b>: sentimiento trágico de la vida (1912).", "<b>Zambrano</b>: razón poética; exilio desde 1939.", "<b>Zubiri</b>: inteligencia sentiente."] }
    ],
    resumen: [
      "El yo y la circunstancia son inseparables: <b>salvar</b> la circunstancia es comprenderla y actuar en ella.",
      "<b>Perspectivismo</b> sí, <b>relativismo</b> no: una verdad, muchas perspectivas.",
      "La razón es <b>vital e histórica</b>, al servicio de la vida; la vida es la <b>realidad radical</b>.",
      "<b>Hombre-masa</b> = actitud de conformismo y vulgaridad, no clase social."
    ],
    conecta: [
      { con: "Sofistas (T2):", rel: "ellos son relativistas; Ortega defiende una verdad con muchas perspectivas." },
      { con: "Descartes (T9):", rel: "critica el yo aislado y la razón pura; parte de la vida." },
      { con: "Kant (T12):", rel: "el sujeto condiciona el conocimiento, pero Ortega lo hace histórico y vital." },
      { con: "Marx (T13):", rel: "el ser humano se hace en la historia, pero por actitud y creencias, no por clase." },
      { con: "Nietzsche (T14):", rel: "la vida es lo primero, pero sin renunciar a la razón." },
      { con: "Husserl y existencialismo (T15):", rel: "el yo siempre está en un mundo; Ortega añade la historia." }
    ],
    claves: [
      ["Circunstancia", "todo lo que me rodea y me constituye (cuerpo, época, país)"],
      ["Perspectivismo", "cada punto de vista capta una parte verdadera de la realidad"],
      ["Raciovitalismo", "la razón es un órgano de la vida y no existe sin ella"],
      ["Razón vital", "razón al servicio de la vida concreta de cada uno"],
      ["Razón histórica", "entender al ser humano contando cómo se ha hecho: tiene historia, no naturaleza"],
      ["Realidad radical", "mi vida, donde aparece todo lo demás"],
      ["Creencias e ideas", "en las creencias se está; las ideas se tienen"],
      ["Generación", "personas de edad parecida con una sensibilidad común ante el mundo"],
      ["Hombre-masa", "actitud satisfecha y mediocre que impone su opinión; no es una clase"],
      ["Razón poética", "Zambrano: razón unida a la sensibilidad y la poesía"]
    ],
    cita: { txt: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.", autor: "Ortega y Gasset", obra: "Meditaciones del Quijote (1914)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    ideacreencia: {
      titulo: "¿Idea o creencia?",
      consigna: "Toca cada afirmación y después decide si, en el sentido de Ortega, es una idea (se tiene, se discute) o una creencia (se está en ella, se da por supuesta).",
      categorias: ["Idea", "Creencia"],
      items: [
        { t: "Una teoría científica que acabas de estudiar y aún discutes", c: 0 },
        { t: "Que el suelo me sostendrá cuando salga de casa", c: 1 },
        { t: "Un argumento nuevo sobre política que te cuenta un amigo", c: 0 },
        { t: "Que mañana habrá clase y el mundo seguirá igual", c: 1 },
        { t: "Una hipótesis que formulas para un trabajo", c: 0 },
        { t: "Que las cosas siguen existiendo cuando dejo de mirarlas", c: 1 }
      ]
    },
    autores: {
      titulo: "Autor y concepto",
      consigna: "Une cada autor con su idea característica.",
      pares: [["Ortega", "Razón vital e histórica"], ["Zambrano", "Razón poética"], ["Zubiri", "Inteligencia sentiente"], ["Unamuno", "Sentimiento trágico de la vida"]]
    },
    ordenobras: {
      titulo: "Obras de Ortega en orden",
      consigna: "Ordena de más antigua a más reciente estas obras de Ortega.",
      items: [
        { t: "Meditaciones del Quijote (1914)" },
        { t: "España invertebrada (1921)" },
        { t: "La deshumanización del arte (1925)" },
        { t: "La rebelión de las masas (1930)" },
        { t: "Ideas y creencias (1940)" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 16",
      preguntas: [
        { q: "«Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo» aparece en…", op: ["Meditaciones del Quijote", "La rebelión de las masas", "Ideas y creencias", "Del sentimiento trágico de la vida"], ok: 0, porque: "Es de 1914. <i>La rebelión de las masas</i> es de 1930; la obra de Unamuno es de otro autor." },
        { q: "La filosofía de Ortega se llama…", op: ["raciovitalismo", "racionalismo puro", "vitalismo irracional", "fenomenología"], ok: 0, porque: "Razón (racio) + vida (vitalismo): la razón es un órgano de la vida." },
        { q: "Para Ortega, la «circunstancia» es…", op: ["todo lo que rodea al yo y lo constituye", "solo el paisaje", "un obstáculo que hay que eliminar", "la sociedad de masas"], ok: 0, porque: "Incluye cuerpo, época, país y cultura; el yo no existe sin ella." },
        { q: "El perspectivismo afirma que…", op: ["cada punto de vista capta una parte de la verdad", "no existe la verdad", "solo vale la perspectiva de la razón pura", "todas las opiniones valen igual"], ok: 0, porque: "La verdad es una; las perspectivas son verdaderas «en parte»." },
        { q: "«El ser humano no tiene naturaleza, tiene…»", op: ["historia", "razón", "instintos", "fe"], ok: 0, porque: "De ahí la razón histórica: para entender al ser humano hay que contar su historia." },
        { q: "La realidad radical es…", op: ["mi vida, yo con mi circunstancia", "la materia", "Dios", "la razón pura"], ok: 0, porque: "En la vida aparece todo lo demás; no podemos salir de ella." },
        { q: "Según Ortega, las creencias…", op: ["son el terreno en el que se vive, no se discuten", "son ideas que se discuten", "son errores", "son lo mismo que opiniones"], ok: 0, porque: "En las creencias se está; las ideas se tienen." },
        { q: "El hombre-masa es…", op: ["una actitud de conformismo y vulgaridad, no una clase", "el obrero", "el rico", "el político"], ok: 0, porque: "Cualquiera, sea cual sea su origen, puede ser masa o minoría." },
        { q: "Ortega fundó en 1923…", op: ["la Revista de Occidente", "el Liceo", "la Institución Libre de Enseñanza", "la Academia"], ok: 0, porque: "Difundió en español la filosofía europea." },
        { q: "La razón poética es el concepto de…", op: ["María Zambrano", "Ortega", "Zubiri", "Unamuno"], ok: 0, porque: "Ortega: razón vital; Zubiri: inteligencia sentiente; Unamuno: sentimiento trágico." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Ortega es FALSA?", op: ["Ortega es relativista: niega que haya verdad", "Ortega defiende el perspectivismo", "Ortega critica el racionalismo", "Ortega fundó la Revista de Occidente"], ok: 0, porque: "El perspectivismo no es relativismo: hay una verdad, vista desde varias perspectivas." },
        { q: "¿Cuál de estas afirmaciones sobre la circunstancia es FALSA?", op: ["Es solo el paisaje que rodea al yo", "El yo y la circunstancia son inseparables", "Hay que comprenderla para «salvarla»", "Incluye la época y la sociedad"], ok: 0, porque: "La circunstancia es todo lo que me rodea y me constituye, no solo el paisaje." },
        { q: "¿Cuál de estas afirmaciones sobre el raciovitalismo es FALSA?", op: ["Rechaza la razón y exalta solo los instintos", "La razón es un órgano de la vida", "Critica al racionalismo", "Combina razón y vida"], ok: 0, porque: "Eso sería vitalismo irracional; Ortega mantiene la razón, unida a la vida." },
        { q: "¿Cuál de estas afirmaciones sobre el hombre-masa es FALSA?", op: ["Es el obrero, la clase social baja", "Es una actitud de satisfacción y mediocridad", "Puede darse en cualquier clase social", "Impone su opinión a las minorías"], ok: 0, porque: "No es una distinción de clase ni de dinero, sino de actitud." },
        { q: "¿Cuál de estas afirmaciones sobre ideas y creencias es FALSA?", op: ["Las creencias se discuten como las ideas", "En las creencias se está", "Las ideas se tienen", "Una crisis de creencias produce un naufragio"], ok: 0, porque: "Las creencias no se discuten: se dan por supuestas, son el suelo de la vida." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Ortega es anterior a Unamuno", "Unamuno nació en 1864", "Ortega nació en 1883", "Ortega murió en 1955"], ok: 0, porque: "Unamuno (1864–1936) nació antes que Ortega (1883–1955)." },
        { q: "¿Cuál de estas afirmaciones sobre los discípulos es FALSA?", op: ["Zubiri propone la razón poética", "Zambrano propone la razón poética", "Zubiri propone la inteligencia sentiente", "Zambrano vivió en el exilio"], ok: 0, porque: "La razón poética es de Zambrano; la inteligencia sentiente, de Zubiri." },
        { q: "¿Cuál de estas afirmaciones sobre Descartes y Ortega es FALSA?", op: ["Ortega acepta el «yo pienso» como punto de partida", "Ortega parte de la vida, no del pensamiento", "Ortega critica el yo aislado de Descartes", "Para Ortega el yo coexiste con las cosas"], ok: 0, porque: "Ortega parte de la vida: antes de pensar, ya estoy viviendo." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Ortega y la filosofía española",
      cartas: [
        { a: "Circunstancia", b: "Todo lo que rodea al yo y lo constituye: cuerpo, época, país, cultura. No es un decorado." },
        { a: "Salvar la circunstancia", b: "Comprenderla y darle sentido actuando en ella; no ignorarla ni resignarse." },
        { a: "Perspectivismo", b: "Cada punto de vista capta una parte verdadera de una única realidad. No es relativismo." },
        { a: "Raciovitalismo", b: "Filosofía de Ortega: la razón es un órgano de la vida, ni razón pura ni vida sin razón." },
        { a: "Razón vital", b: "Razón al servicio de la vida concreta de cada uno, para orientarse en su circunstancia." },
        { a: "Razón histórica", b: "El ser humano no tiene naturaleza, tiene historia: se entiende contando cómo se ha hecho." },
        { a: "Realidad radical", b: "Mi vida, el yo con su circunstancia: la realidad en la que aparece todo lo demás." },
        { a: "Quehacer", b: "La vida no viene hecha: hay que decidir qué vamos a ser. Somos libres «a la fuerza»." },
        { a: "Ideas y creencias", b: "Las ideas se tienen y se discuten; en las creencias se está y sostienen la vida." },
        { a: "Generación", b: "Personas de edad parecida con una sensibilidad común; relevo que mueve la historia." },
        { a: "Hombre-masa", b: "Actitud satisfecha, mediocre, que impone su opinión; no es una clase social." },
        { a: "Minoría selecta", b: "Quienes se exigen esfuerzo y superación; no son los ricos ni los nobles." },
        { a: "Unamuno", b: "Sentimiento trágico de la vida (1912): hombre de carne y hueso, razón y fe en conflicto." },
        { a: "María Zambrano", b: "Razón poética: razón unida a la sensibilidad y la poesía. Exilio desde 1939." },
        { a: "Xavier Zubiri", b: "Inteligencia sentiente: sentir e inteligir son un solo acto." }
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
  O("or1", 1, "¿En qué año nació Ortega y Gasset?", ["1883", "1864", "1898", "1904"], 0,
    ["Ortega: 1883–1955. Unamuno nació en 1864, Zubiri en 1898 y Zambrano en 1904."]);
  O("or2", 1, "¿En qué obra aparece la frase «yo soy yo y mi circunstancia»?", ["Meditaciones del Quijote", "La rebelión de las masas", "Historia como sistema", "Del sentimiento trágico de la vida"], 0,
    ["Es de 1914. La obra de Unamuno es de otro autor."]);
  O("or3", 1, "¿Qué revista fundó Ortega en 1923?", ["Revista de Occidente", "El Sol", "La Gaceta", "Revista de Filosofía de Madrid"], 0,
    ["Difundió el pensamiento europeo en español."]);
  O("or4", 1, "¿En qué año se publicó <i>La rebelión de las masas</i>?", ["1930", "1914", "1921", "1940"], 0,
    ["1914: <i>Meditaciones del Quijote</i>; 1921: <i>España invertebrada</i>; 1940: <i>Ideas y creencias</i>."]);
  T("or5", 1, "Completa: «Yo soy yo y mi ______, y si no la salvo a ella no me salvo yo».", "Término =", ["circunstancia"],
    ["Es la palabra clave de toda la filosofía de Ortega."], "circunstancia");
  T("or6", 1, "Completa: la filosofía de Ortega, que une razón y vida, se llama ______.", "Término =", ["raciovitalismo"],
    ["Racio (razón) + vitalismo (vida)."], "raciovitalismo");
  M("or7", 1, "Une cada autor con su concepto.", [
    C("Ortega", ["Razón vital e histórica", "Razón poética", "Inteligencia sentiente", "Sentimiento trágico de la vida"], 0),
    C("Zambrano", ["Razón vital e histórica", "Razón poética", "Inteligencia sentiente", "Sentimiento trágico de la vida"], 1),
    C("Zubiri", ["Razón vital e histórica", "Razón poética", "Inteligencia sentiente", "Sentimiento trágico de la vida"], 2),
    C("Unamuno", ["Razón vital e histórica", "Razón poética", "Inteligencia sentiente", "Sentimiento trágico de la vida"], 3)],
    ["Zambrano = poesía; Zubiri = sentir; Unamuno = tragedia; Ortega = vida."], "Ortega–razón vital; Zambrano–razón poética; Zubiri–inteligencia sentiente; Unamuno–sentimiento trágico");
  M("or8", 1, "Completa la fórmula de Ortega sobre ideas y creencias.", [
    C("Las ideas…", ["se tienen", "se está en ellas"], 0),
    C("En las creencias…", ["se tienen", "se está"], 1)],
    ["Ideas: las manejamos y discutimos. Creencias: son el suelo en el que vivimos."], "Las ideas se tienen; en las creencias se está");
  O("or9", 1, "Según Ortega, la diferencia entre «masa» y «minoría selecta» es de…", ["actitud vital", "clase social", "riqueza", "nacimiento noble"], 0,
    ["Cualquiera puede pertenecer a la minoría si se exige a sí mismo."]);
  T("or10", 1, "Completa: el ser humano «no tiene naturaleza, tiene ______».", "Término =", ["historia"],
    ["Fórmula de <i>Historia como sistema</i>."], "historia");
  O("or11", 1, "Ortega pertenece, por edad y estilo, al…", ["Novecentismo", "Generación del 98", "Generación del 27", "Romanticismo"], 0,
    ["Nació en 1883, una generación después del 98."]);
  O("or12", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Descartes → Nietzsche → Ortega", "Nietzsche → Descartes → Ortega", "Ortega → Descartes → Nietzsche", "Descartes → Ortega → Nietzsche"], 0,
    ["Descartes (1596–1650), Nietzsche (1844–1900), Ortega (1883–1955)."], "Descartes → Nietzsche → Ortega");
  O("or13", 1, "María Zambrano tuvo que exiliarse tras…", ["la Guerra Civil", "la Revolución Francesa", "la Primera Guerra Mundial", "el Desastre del 98"], 0,
    ["Se exilió en 1939 y volvió a España en 1984."]);
  O("or14", 1, "Para Ortega, la realidad radical es…", ["mi vida: el yo con su circunstancia", "la materia", "Dios", "la razón pura"], 0,
    ["Es la realidad en la que aparece todo lo demás."]);

  // ---- nivel 2
  V("or15", 2, "«Ortega es relativista: para él no existe la verdad.»", false, [
    "Es falso: hay una verdad, vista desde muchas perspectivas", "Es falso: porque Ortega niega toda perspectiva", "Es verdad: cada cual tiene la suya", "Es verdad: por el perspectivismo"], 0,
    ["Critica por igual el racionalismo y el relativismo."]);
  V("or16", 2, "«Según el perspectivismo, cada punto de vista capta una parte verdadera de la realidad.»", true, [
    "Es verdad: la verdad completa se acerca sumando perspectivas", "Es verdad: porque solo la perspectiva científica es válida", "Es verdad: porque todas las opiniones son iguales", "Es verdad: porque la realidad no existe"], 0,
    ["La perspectiva revela la realidad, no la falsea."]);
  V("or17", 2, "«La circunstancia es solo el entorno físico, el paisaje que rodea al yo.»", false, [
    "Es falso: es todo lo que rodea al yo y lo constituye, incluida la época y la sociedad", "Es falso: no existe circunstancia", "Es verdad: coincide con la naturaleza", "Es verdad: porque el yo es independiente"], 0,
    ["Circunstancia = cuerpo, tiempo, país, cultura…"]);
  V("or18", 2, "«La razón vital es la razón al servicio de la vida concreta de cada persona.»", true, [
    "Es verdad: ayuda a orientarse en la circunstancia", "Es verdad: porque la vida es biológica solamente", "Es verdad: porque rechaza el rigor", "Es verdad: porque busca verdades eternas"], 0,
    ["Razón, sí, pero como órgano de la vida."]);
  V("or19", 2, "«Para Ortega el hombre-masa es el obrero y las clases pobres.»", false, [
    "Es falso: es una actitud que puede darse en cualquier clase social", "Es falso: es solo el burgués", "Es verdad: porque no tienen estudios", "Es verdad: porque son mayoría"], 0,
    ["Hasta un especialista con título puede ser hombre-masa."]);
  V("or20", 2, "«Para entender al ser humano, la razón histórica propone contar cómo ha llegado a ser lo que es.»", true, [
    "Es verdad: porque el ser humano no tiene naturaleza, tiene historia", "Es verdad: porque la historia es una ley física", "Es verdad: porque la esencia humana es eterna", "Es verdad: porque no hay cambio"], 0,
    ["Entender es narrar el proceso."]);
  V("or21", 2, "«Zubiri es el autor de la razón poética.»", false, [
    "Es falso: es de Zambrano; Zubiri defiende la inteligencia sentiente", "Es falso: es de Ortega", "Es verdad: era discípulo de Ortega", "Es verdad: escribió Filosofía y poesía"], 0,
    ["Zambrano = poesía; Zubiri = sentir."]);
  O("or22", 2, "¿Qué critica Ortega al racionalismo de Descartes?",
    ["Que parte de un yo pensante aislado, olvidando que antes de pensar ya se vive en una circunstancia", "Que usa la razón", "Que no cree en Dios", "Que defiende la experiencia"], 0,
    ["El punto de partida es la vida, no el «pienso»."]);
  O("or23", 2, "¿En qué se diferencia el perspectivismo del relativismo?",
    ["En que el perspectivismo defiende una única verdad vista desde varios lugares", "En que niega las perspectivas", "En que acepta que todo valga", "En que solo valora la razón pura"], 0,
    ["El relativismo renuncia a la verdad; el perspectivismo la busca sumando perspectivas."]);
  O("or24", 2, "La razón histórica explica al ser humano…", ["narrando cómo se ha formado", "buscando su esencia eterna", "midiéndolo con leyes físicas", "negando su pasado"], 0,
    ["Entender = contar el proceso histórico."]);
  O("or25", 2, "Una «generación» para Ortega es…", ["un grupo de edad parecida con una sensibilidad común", "una familia", "una clase social", "un partido político"], 0,
    ["El relevo de generaciones mueve la historia."]);
  O("or26", 2, "¿Qué separa a Unamuno de Ortega?",
    ["Unamuno parte del sentimiento y la fe; Ortega, de una razón unida a la vida", "Unamuno es racionalista", "Ortega defiende la fe frente a la razón", "Ninguna diferencia"], 0,
    ["Los dos ponen el ser humano concreto en el centro, con métodos distintos."]);
  O("or27", 2, "El «especialista» que opina con autoridad de todo es, para Ortega, un ejemplo de…", ["hombre-masa", "minoría selecta", "intelectual comprometido", "prudente"], 0,
    ["Sabe mucho de poco y se cree competente en lo demás."]);
  O("or28", 2, "Cuando una creencia deja de ser evidente, según Ortega…", ["la época entra en crisis", "nada cambia", "se convierte en una idea sin importancia", "desaparece la historia"], 0,
    ["Es como un naufragio: hay que sustituirla por otra."]);
  O("or29", 2, "«Salvar la circunstancia» significa…", ["comprenderla y actuar en ella", "huir de ella", "obedecerla sin más", "ignorarla"], 0,
    ["Hacerse cargo de la propia situación."]);
  O("or30", 2, "La inteligencia sentiente de Zubiri sostiene que…", ["sentir e inteligir son un solo acto", "solo existen sensaciones", "solo existe el pensamiento", "la inteligencia es innata"], 0,
    ["Frente a la tradición que los separaba."]);

  // ---- nivel 3
  O("or31", 3, "Texto (paráfrasis de <i>Meditaciones del Quijote</i>): el yo no puede entenderse sin las cosas que lo rodean. Su idea principal es…",
    ["que el yo y su circunstancia forman una unidad inseparable", "que el yo es una sustancia pensante aislada", "que la circunstancia es un estorbo", "que no hay yo"], 0,
    ["Tema: relación yo–circunstancia; opone esta idea al yo aislado."]);
  O("or32", 3, "Texto (paráfrasis de <i>La rebelión de las masas</i>): el hombre-masa se cree perfecto y quiere imponer su opinión. Su idea principal es…",
    ["que una actitud de satisfacción mediocre amenaza a la sociedad", "que los pobres no deben votar", "que la clase obrera es inferior", "que las minorías deben imponerse por la fuerza"], 0,
    ["Es un diagnóstico de actitud, no de clase."]);
  O("or33", 3, "Una alumna escribe: «para Ortega, ideas y creencias son lo mismo». ¿Qué corrección es la acertada?",
    ["Las ideas se tienen y se discuten; en las creencias se está y no se discuten", "Tiene razón: son sinónimos", "Las creencias son siempre falsas", "Las ideas no existen"], 0,
    ["Las creencias son el suelo; las ideas, la construcción encima."]);
  O("or34", 3, "Ortega y Nietzsche coinciden en…", ["situar la vida antes que la razón pura", "negar toda razón", "defender la moral cristiana", "defender el racionalismo"], 0,
    ["Ortega no renuncia a la razón: la hace vital."]);
  O("or35", 3, "Ortega y Marx coinciden en que…", ["el ser humano se hace en la historia", "la clase social lo explica todo", "no hay historia", "la razón es pura"], 0,
    ["Diferencia: Ortega pone el acento en la actitud, las creencias y las generaciones, no en la clase."]);
  O("or36", 3, "¿Por qué el raciovitalismo no es un vitalismo irracional?",
    ["Porque mantiene la razón como órgano de la vida", "Porque defiende los instintos", "Porque rechaza la vida", "Porque no habla de razón"], 0,
    ["Razón y vida unidas."]);
  O("or37", 3, "Frente a Descartes, Ortega sostiene que el punto de partida de la filosofía es…", ["la vida: el yo con las cosas", "el pensamiento puro", "las ideas innatas", "Dios"], 0,
    ["«Antes de pensar, vivo»."]);
  M("or38", 3, "Elige la comparación más rentable para cada pregunta.", [
    C("Texto sobre razón y vida", ["Descartes o Nietzsche", "Sofistas o Kant", "Platón o Marx"], 0),
    C("Texto sobre verdad y puntos de vista", ["Descartes o Nietzsche", "Sofistas o Kant", "Platón o Marx"], 1),
    C("Texto sobre masas y minorías", ["Descartes o Nietzsche", "Sofistas o Kant", "Platón o Marx"], 2)],
    ["Razón–vida; punto de vista–verdad; masas–sociedad."], "Razón/vida: Descartes o Nietzsche; verdad/perspectiva: sofistas o Kant; masas: Platón o Marx");
  R("or39", "Explica la frase «yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo» y el perspectivismo de Ortega. (Pregunta tipo PAU)", 9, [
    { t: "Contextualiza la frase (Meditaciones del Quijote, 1914) y define circunstancia", p: 0.4 },
    { t: "Explica que el yo y la circunstancia son inseparables y qué es «salvarla»", p: 0.5 },
    { t: "Define perspectivismo: cada punto de vista capta una parte de la verdad", p: 0.4 },
    { t: "Distingue perspectivismo y relativismo", p: 0.4 },
    { t: "Compara con Descartes u otro autor", p: 0.3 }],
    ["Circunstancia.", "Yo + circunstancia y salvar.", "Perspectivismo.", "No relativismo.", "Comparación."], "Yo y circunstancia inseparables; perspectivismo no es relativismo");
  R("or40", "Explica el raciovitalismo: razón vital y razón histórica. Compáralo con el racionalismo de Descartes y el vitalismo de Nietzsche. (Pregunta tipo PAU)", 9, [
    { t: "Define raciovitalismo (razón al servicio de la vida)", p: 0.4 },
    { t: "Explica la razón vital", p: 0.4 },
    { t: "Explica la razón histórica: el ser humano no tiene naturaleza, tiene historia", p: 0.5 },
    { t: "Critica al racionalismo de Descartes (el yo aislado)", p: 0.4 },
    { t: "Distingue de Nietzsche: mantiene la razón", p: 0.3 }],
    ["Raciovitalismo.", "Razón vital.", "Razón histórica.", "Descartes.", "Nietzsche."], "La razón como órgano de la vida, histórica");
  R("or41", "Explica la vida humana como realidad radical y la distinción entre ideas y creencias. (Pregunta tipo PAU)", 8, [
    { t: "Define realidad radical: mi vida, el yo con su circunstancia", p: 0.4 },
    { t: "Explica que la vida es quehacer, proyecto y vocación", p: 0.4 },
    { t: "Distingue ideas (se tienen) y creencias (se está)", p: 0.5 },
    { t: "Pone ejemplos coherentes de ambas", p: 0.3 },
    { t: "Relaciona con las crisis históricas", p: 0.4 }],
    ["Realidad radical.", "Quehacer.", "Ideas y creencias.", "Ejemplos.", "Crisis."], "La vida es la realidad radical; las creencias son su suelo");
  R("or42", "Explica la teoría del hombre-masa de <i>La rebelión de las masas</i> y valórala críticamente. (Pregunta tipo PAU)", 8, [
    { t: "Contexto: sociedad de masas, entreguerras, 1930", p: 0.3 },
    { t: "Define hombre-masa y minoría selecta como actitudes", p: 0.5 },
    { t: "Aclara que no es una distinción de clase social", p: 0.4 },
    { t: "Consecuencias: Estado omnipotente, crisis de Europa", p: 0.4 },
    { t: "Valoración crítica (lucidez frente a elitismo)", p: 0.4 }],
    ["Contexto.", "Masa y minoría.", "No es clase.", "Consecuencias.", "Valoración."], "Masa = actitud; riesgo para la sociedad");
  R("or43", "Compara a Unamuno, Zambrano y Zubiri con Ortega en una frase cada uno y señala qué los une. (Pregunta tipo PAU)", 8, [
    { t: "Unamuno: sentimiento trágico de la vida (razón y fe)", p: 0.4 },
    { t: "Zambrano: razón poética y exilio", p: 0.4 },
    { t: "Zubiri: inteligencia sentiente (sentir e inteligir)", p: 0.4 },
    { t: "Ortega: razón vital como eje", p: 0.4 },
    { t: "Señala el vínculo: el ser humano concreto frente a la razón abstracta", p: 0.4 }],
    ["Unamuno.", "Zambrano.", "Zubiri.", "Ortega.", "Lo que los une."], "Cuatro respuestas al ser humano concreto");
  R("or44", "Comenta este texto: «Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo» (Ortega, <i>Meditaciones del Quijote</i>). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: relación inseparable entre el yo y su circunstancia", p: 0.3 },
    { t: "Idea principal: realizarse exige comprender y hacerse cargo de la circunstancia", p: 0.4 },
    { t: "Aclara términos: circunstancia (no solo paisaje) y salvar", p: 0.4 },
    { t: "Relaciona con el autor: perspectivismo, raciovitalismo, razón vital e histórica", p: 0.5 },
    { t: "Compara con Descartes o Nietzsche", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de la frase de Ortega");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Racionalismo, relativismo y perspectivismo", ancha: true,
      tabla: { cab: ["", "Racionalismo", "Relativismo", "Perspectivismo"], filas: [
        ["¿Hay verdad?", "sí, universal", "no / cada cual la suya", "sí, una, desde varios lugares"],
        ["Punto de vista", "no importa", "todo vale igual", "cada uno ve una parte"],
        ["Autor", "Descartes", "Sofistas", "Ortega"]
      ] } },
    { titulo: "Ideas y creencias", ancha: true,
      tabla: { cab: ["", "Ideas", "Creencias"], filas: [
        ["Fórmula", "se tienen", "se está en ellas"],
        ["Función", "las discutimos", "nos sostienen"],
        ["Ejemplo", "una teoría científica", "que el suelo me sostiene"]
      ] } },
    { titulo: "Ortega y la filosofía española", ancha: true,
      tabla: { cab: ["Autor", "Idea clave", "Obra"], filas: [
        ["Unamuno (1864–1936)", "sentimiento trágico", "Del sentimiento trágico de la vida (1912)"],
        ["Ortega (1883–1955)", "razón vital e histórica", "Meditaciones del Quijote (1914)"],
        ["Zubiri (1898–1983)", "inteligencia sentiente", "Inteligencia sentiente (1980–83)"],
        ["Zambrano (1904–1991)", "razón poética", "Filosofía y poesía (1939)"]
      ] } },
    { titulo: "Las ideas de Ortega en orden",
      pasos: ["Yo y mi circunstancia.", "Perspectivismo: cada punto de vista, una parte de la verdad.", "Razón vital: la razón sirve a la vida.", "Razón histórica: no tiene naturaleza, tiene historia.", "Rebelión de las masas: actitud, no clase."],
      nota: "Todo parte de la vida como realidad radical." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Ortega es relativista", bien: "Es perspectivista: una verdad, muchas perspectivas", por: "El relativismo niega la verdad." },
        { mal: "La circunstancia es el paisaje", bien: "Es todo lo que rodea y constituye al yo", por: "Incluye época, sociedad y cultura." },
        { mal: "El hombre-masa es el obrero", bien: "Es una actitud, no una clase", por: "Cualquiera puede serlo." },
        { mal: "Zubiri defiende la razón poética", bien: "La razón poética es de Zambrano", por: "Zubiri: inteligencia sentiente." }
      ] }
  ];

  B.registrar("historia_fil", "t16", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf16a.secciones,
    nuevas: B.parte.hf16a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
