/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 9 (parte B): El racionalismo: Descartes
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t9.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Descartes (1596–1650) busca un <b>fundamento indudable</b> para el saber con un método de cuatro reglas inspirado en las matemáticas.",
    "La <b>duda metódica</b> (sentidos, sueño, genio maligno) deja una sola verdad: <b>pienso, luego existo</b>.",
    "Lo <b>claro y distinto</b> es verdadero, pero solo un <b>Dios veraz</b>, cuya existencia prueba, lo garantiza.",
    "Hay <b>tres sustancias</b>: pensante, extensa e infinita. Mente y cuerpo son distintos (dualismo) y la materia es mecánica."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Descartes · 1596–1650",
    autores: [{ n: "René Descartes", f: "1596–1650", l: "La Haye (Francia); Países Bajos; muere en Estocolmo" }],
    obras: ["Reglas para la dirección del espíritu", "Discurso del método", "Meditaciones metafísicas", "Principios de la filosofía", "Las pasiones del alma"],
    bloques: [
      { t: "Contexto", frases: ["Siglo XVII: Revolución científica y crisis de las certezas heredadas.", "Estudia con los jesuitas en <b>La Flèche</b>; ama las matemáticas.", "Retira <i>El mundo</i> tras la condena de Galileo (1633)."] },
      { t: "Método y duda", frases: ["Cuatro reglas: <b>evidencia, análisis, síntesis y enumeración</b>.", "Duda <b>metódica</b>, provisional, universal e hiperbólica.", "No es escepticismo: duda para llegar a una certeza."],
        tabla: { cab: ["Nivel de duda", "Motivo"], filas: [["Sentidos", "a veces me engañan"], ["Sueño", "no distingo sueño y vigilia"], ["Genio maligno", "podría engañarme hasta en matemáticas"]] } },
      { t: "Cogito y criterio", frases: ["<b>Pienso, luego existo</b>: resiste incluso al genio maligno.", "Es una <b>intuición</b>, no un silogismo; prueba el yo como cosa pensante.", "Criterio de verdad: la <b>evidencia</b>, lo claro y distinto."] },
      { t: "Dios", frases: ["Tres pruebas: idea de infinito, mi imperfección y la ontológica.", "Dios es perfecto, luego <b>veraz</b>: garantiza la evidencia.", "El error nace de la voluntad que afirma sin ver claro."] },
      { t: "Realidad: tres sustancias", frases: ["Tres sustancias: pensante, extensa e infinita (Dios).", "El mundo material es una <b>máquina</b>: mecanicismo.", "Los animales son autómatas sin alma racional."],
        tabla: { cab: ["Res cogitans", "Res extensa"], filas: [["alma, mente, «yo»", "cuerpo y materia"], ["atributo: pensamiento", "atributo: extensión"], ["indivisible", "divisible"]] } },
      { t: "Ser humano y moral", frases: ["Dualismo: mente y cuerpo son sustancias distintas.", "Problema de la interacción: la glándula pineal no lo resuelve.", "Moral provisional (tres máximas) y <b>generosidad</b>."] }
    ],
    resumen: [
      "El saber necesita un <b>fundamento</b>: el sujeto que piensa (<b>cogito</b>).",
      "La <b>razón</b>, con ideas innatas, es la fuente del conocimiento: racionalismo.",
      "<b>Dios veraz</b> garantiza que lo claro y distinto es verdadero.",
      "Dos mundos de sustancias: <b>pensante y extensa</b>; el cuerpo, una máquina."
    ],
    conecta: [
      { con: "Platón (T3):", rel: "comparte el innatismo y la desconfianza en los sentidos." },
      { con: "Aristóteles (T4):", rel: "rechaza su hilemorfismo y las causas finales." },
      { con: "San Agustín (T6):", rel: "su <i>si fallor, sum</i> es un precedente del cogito." },
      { con: "Tomás de Aquino (T7):", rel: "prueba a Dios desde la idea, no desde el mundo." },
      { con: "Galileo (T8):", rel: "comparte la naturaleza matemática y mecánica." },
      { con: "Hume (T10):", rel: "niega las ideas innatas y el yo como sustancia." },
      { con: "Kant (T12):", rel: "critica la prueba ontológica y el uso de la razón sin experiencia." }
    ],
    claves: [
      ["Duda metódica", "duda provisional y universal para hallar una certeza"],
      ["Genio maligno", "hipótesis de un ser que me engaña hasta en las matemáticas"],
      ["Cogito", "«pienso, luego existo»: primera verdad indudable"],
      ["Claridad y distinción", "criterio de evidencia: lo que no admite duda es verdadero"],
      ["Ideas innatas", "ideas que la razón posee sin la experiencia (Dios, yo, infinito)"],
      ["Dios veraz", "ser perfecto que no engaña y garantiza la evidencia"],
      ["Res cogitans", "sustancia pensante: alma o mente"],
      ["Res extensa", "sustancia extensa: materia y cuerpo"],
      ["Dualismo", "mente y cuerpo son sustancias distintas"],
      ["Mecanicismo", "la naturaleza es una máquina explicada por movimiento"]
    ],
    cita: { txt: "Pienso, luego existo.", autor: "Descartes", obra: "Discurso del método, IV (traducción habitual de «je pense, donc je suis»)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    reglas: {
      titulo: "Las cuatro reglas del método",
      consigna: "Ordena las reglas del método en el orden en que las enuncia Descartes en el Discurso.",
      items: [
        { t: "Evidencia: no admitir nada como verdadero si no se ve clara y distintamente" },
        { t: "Análisis: dividir cada dificultad en tantas partes como sea posible" },
        { t: "Síntesis: ir ordenadamente de lo simple a lo complejo" },
        { t: "Enumeración: hacer recuentos y revisiones tan completos que no se omita nada" }
      ]
    },
    pruebas: {
      titulo: "Las pruebas de la existencia de Dios",
      consigna: "Une cada prueba con su idea central.",
      pares: [
        ["Idea de infinito", "La causa de la idea debe tener al menos tanta realidad como ella"],
        ["Mi imperfección", "Yo, ser finito, no me he dado ni me conservo la existencia"],
        ["Argumento ontológico", "La existencia es una perfección y Dios es el ser perfecto"]
      ]
    },
    sustancias: {
      titulo: "Tres sustancias",
      consigna: "Toca cada término y después la sustancia a la que corresponde.",
      categorias: ["Res cogitans", "Res extensa", "Res infinita (Dios)"],
      items: [
        { t: "Dudar", c: 0 },
        { t: "Querer", c: 0 },
        { t: "Imaginar", c: 0 },
        { t: "Ocupar espacio", c: 1 },
        { t: "Tener figura", c: 1 },
        { t: "Moverse", c: 1 },
        { t: "Infinito", c: 2 },
        { t: "Perfecto", c: 2 },
        { t: "Garante de la verdad", c: 2 }
      ]
    },
    ideas: {
      titulo: "Innatas, adventicias y facticias",
      consigna: "Clasifica cada idea según su origen para Descartes.",
      categorias: ["Innata", "Adventicia", "Facticia"],
      items: [
        { t: "La idea de Dios", c: 0 },
        { t: "La idea de número", c: 0 },
        { t: "La idea de infinito", c: 0 },
        { t: "El calor del fuego", c: 1 },
        { t: "El ruido de un trueno", c: 1 },
        { t: "El sabor de una naranja", c: 1 },
        { t: "Una sirena", c: 2 },
        { t: "Un centauro", c: 2 },
        { t: "Un caballo alado", c: 2 }
      ]
    },
    quiz1: {
      titulo: "Test del tema 9",
      preguntas: [
        { q: "La duda metódica de Descartes es…", op: ["provisional: un método para hallar una certeza", "un escepticismo definitivo", "una duda solo sobre la religión", "una duda práctica para la vida diaria"], ok: 0, porque: "Duda para llegar a una verdad indudable; no se queda en la duda." },
        { q: "El orden de la escalada de la duda es…", op: ["sentidos, sueño y genio maligno", "genio maligno, sueño y sentidos", "sueño, sentidos y Dios", "razón, sentidos y sueño"], ok: 0, porque: "De la menos radical (los sentidos) a la más radical (el genio maligno)." },
        { q: "El cogito resiste al genio maligno porque…", op: ["para ser engañado tengo que existir pensando", "las matemáticas son siempre verdaderas", "Dios no engaña", "los sentidos son fiables"], ok: 0, porque: "Aunque me engañe en todo, no puede hacer que no exista mientras pienso." },
        { q: "Lo que prueba el cogito es que existo como…", op: ["cosa que piensa", "cuerpo extenso", "parte de la naturaleza", "criatura sin alma"], ok: 0, porque: "El cuerpo sigue en duda; solo es indudable el yo que piensa." },
        { q: "El criterio de verdad de Descartes es…", op: ["la claridad y distinción de las ideas", "el consenso de los sabios", "la experiencia sensible", "la autoridad de Aristóteles"], ok: 0, porque: "Es verdadero lo que concibo clara y distintamente." },
        { q: "Una idea que fabrica la imaginación, como la de una sirena, es…", op: ["facticia", "innata", "adventicia", "evidente"], ok: 0, porque: "Combina ideas anteriores; no viene de fuera ni es innata." },
        { q: "El argumento ontológico sostiene que…", op: ["Dios existe porque la existencia es una perfección", "Dios existe porque el mundo es causado", "Dios existe porque lo dice la Biblia", "Dios no puede probarse"], ok: 0, porque: "Un ser sumamente perfecto no puede carecer de existencia." },
        { q: "Dios garantiza la verdad de las ideas claras y distintas porque…", op: ["es perfecto y por tanto no puede ser engañador", "creó las matemáticas", "lo revela la Iglesia", "es una idea innata"], ok: 0, porque: "El engaño es una imperfección." },
        { q: "El atributo esencial de la res extensa es…", op: ["la extensión", "el pensamiento", "la perfección infinita", "la voluntad"], ok: 0, porque: "La materia es lo que ocupa espacio." },
        { q: "El problema más grave del dualismo cartesiano es…", op: ["explicar la interacción entre alma y cuerpo", "demostrar que existe el cuerpo", "probar el cogito", "explicar los sueños"], ok: 0, porque: "Sustancias tan distintas, sin nada en común, ¿cómo se influyen?" }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la duda de Descartes es FALSA?", op: ["Es un escepticismo definitivo que niega la posibilidad de conocer", "Es provisional", "Es universal e hiperbólica", "Su fin es hallar una certeza"], ok: 0, porque: "Es un método; el escéptico duda para quedarse dudando." },
        { q: "¿Cuál de estas afirmaciones sobre el cogito es FALSA?", op: ["Prueba que existe el mundo exterior", "Es una intuición", "Prueba que existo como cosa que piensa", "Resiste a la hipótesis del genio maligno"], ok: 0, porque: "El mundo exterior solo se recupera después, gracias a un Dios veraz." },
        { q: "¿Cuál de estas afirmaciones sobre el genio maligno es FALSA?", op: ["Descartes afirma que existe de verdad", "Es una hipótesis para dudar", "Puede engañar incluso en las matemáticas", "Es el nivel más radical de la duda"], ok: 0, porque: "Es una hipótesis: basta con que sea posible." },
        { q: "¿Cuál de estas afirmaciones sobre Dios en Descartes es FALSA?", op: ["Descartes parte del mundo sensible para probarlo, como Tomás de Aquino", "Dios garantiza la verdad de la evidencia", "Una prueba parte de la idea de infinito", "Dios es perfecto y no engaña"], ok: 0, porque: "Sus pruebas parten de las ideas de la mente, no del mundo." },
        { q: "¿Cuál de estas afirmaciones sobre el dualismo es FALSA?", op: ["La mente es extensa y divisible, como el cuerpo", "La mente es la res cogitans", "El cuerpo es la res extensa", "Descartes no resolvió bien la interacción"], ok: 0, porque: "La mente es indivisible y no extensa; el cuerpo es divisible." },
        { q: "¿Cuál de estas afirmaciones sobre el error es FALSA?", op: ["Dios es el culpable de nuestros errores", "El error nace de la voluntad que afirma más de lo que el entendimiento ve", "El remedio es suspender el juicio", "La voluntad es más amplia que el entendimiento"], ok: 0, porque: "Dios es veraz; el error es un mal uso de la libertad." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Descartes es anterior a San Agustín", "Descartes nació en 1596", "El Discurso del método es de 1637", "Descartes murió en 1650"], ok: 0, porque: "Agustín (354–430) es muy anterior a Descartes (1596–1650)." },
        { q: "¿Cuál de estas afirmaciones sobre los animales es FALSA?", op: ["Tienen alma pensante igual que las personas", "Son máquinas o autómatas complejos", "Solo el ser humano une máquina y alma racional", "Su cuerpo se explica mecánicamente"], ok: 0, porque: "Para Descartes los animales no tienen alma pensante." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Descartes",
      cartas: [
        { a: "Duda metódica", b: "Duda provisional, universal e hiperbólica, usada como método para hallar una verdad indudable." },
        { a: "Genio maligno", b: "Hipótesis de un ser poderoso que me engaña hasta en las matemáticas; es el nivel más radical de la duda." },
        { a: "Cogito", b: "«Pienso, luego existo»: primera verdad, intuición que resiste a toda duda." },
        { a: "Evidencia", b: "Primera regla del método: solo admito como verdadero lo que veo clara y distintamente." },
        { a: "Clara y distinta", b: "Clara: presente y manifiesta a la mente. Distinta: separada de todas las demás y sin nada confuso." },
        { a: "Idea innata", b: "Idea que la razón posee por sí misma, sin la experiencia (Dios, yo, infinito, matemáticas)." },
        { a: "Idea adventicia", b: "Idea que parece venir de fuera, por los sentidos (el calor, el ruido)." },
        { a: "Idea facticia", b: "Idea fabricada por la imaginación combinando otras (la sirena)." },
        { a: "Argumento ontológico", b: "Dios es el ser sumamente perfecto; la existencia es una perfección; luego Dios existe." },
        { a: "Dios veraz", b: "Dios, perfecto, no puede engañar: garantiza que lo claro y distinto es verdadero." },
        { a: "Res cogitans", b: "Sustancia pensante: el alma o mente. Atributo esencial: el pensamiento." },
        { a: "Res extensa", b: "Sustancia extensa: la materia y el cuerpo. Atributo esencial: la extensión." },
        { a: "Mecanicismo", b: "La naturaleza es una máquina que se explica por movimiento y sin causas finales." },
        { a: "Glándula pineal", b: "Lugar del cerebro donde Descartes sitúa la unión de alma y cuerpo (<i>Las pasiones del alma</i>, 1649)." },
        { a: "Círculo cartesiano", b: "Crítica: usa la evidencia para probar a Dios y a Dios para garantizar la evidencia." }
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
  O("hd1", 1, "¿En qué ciudad murió Descartes?", ["Estocolmo", "París", "Ámsterdam", "La Flèche"], 0,
    ["Había aceptado la invitación de la reina Cristina de Suecia y murió allí de pulmonía en 1650."]);
  O("hd2", 1, "¿En qué año se publicó el <i>Discurso del método</i>?", ["1637", "1641", "1644", "1649"], 0,
    ["1637. Las <i>Meditaciones</i> son de 1641; los <i>Principios</i>, de 1644; <i>Las pasiones del alma</i>, de 1649."]);
  O("hd3", 1, "¿Qué obra de Descartes se publicó en 1641?", ["Meditaciones metafísicas", "Discurso del método", "Las pasiones del alma", "Principios de la filosofía"], 0,
    ["Las <i>Meditaciones metafísicas</i> (1641), escritas en latín."]);
  O("hd4", 1, "¿En qué lengua escribió Descartes el <i>Discurso del método</i>?", ["En francés", "En latín", "En griego", "En alemán"], 0,
    ["Lo escribió en francés para que lo entendiera quien usara bien su razón, no solo los sabios."]);
  T("hd5", 1, "Completa: la primera verdad que resiste incluso a la hipótesis del genio maligno se llama ______ (<i>ergo sum</i>).", "Término =", ["cogito", "el cogito", "cogito ergo sum"],
    ["Del latín <i>cogito, ergo sum</i>: «pienso, luego existo»."], "cogito");
  M("hd6", 1, "Empareja cada regla del método con su idea.", [
    C("Evidencia", ["No admitir como verdadero lo que no se vea clara y distintamente", "Dividir cada dificultad en partes", "Ir de lo simple a lo complejo", "Hacer revisiones completas"], 0),
    C("Análisis", ["No admitir como verdadero lo que no se vea clara y distintamente", "Dividir cada dificultad en partes", "Ir de lo simple a lo complejo", "Hacer revisiones completas"], 1),
    C("Síntesis", ["No admitir como verdadero lo que no se vea clara y distintamente", "Dividir cada dificultad en partes", "Ir de lo simple a lo complejo", "Hacer revisiones completas"], 2),
    C("Enumeración", ["No admitir como verdadero lo que no se vea clara y distintamente", "Dividir cada dificultad en partes", "Ir de lo simple a lo complejo", "Hacer revisiones completas"], 3)],
    ["Las cuatro reglas de la segunda parte del <i>Discurso</i>."], "Evidencia, análisis, síntesis y enumeración");
  O("hd7", 1, "¿Cuál es el primer nivel de la duda de Descartes?", ["Los sentidos", "El sueño", "El genio maligno", "La existencia de Dios"], 0,
    ["Primero duda de los sentidos, después del sueño y por último del genio maligno."]);
  O("hd8", 1, "¿Cuál es el nivel más radical de la duda?", ["El genio maligno", "Los sentidos", "El sueño", "La memoria"], 0,
    ["Con el genio maligno cae incluso lo matemático."]);
  O("hd9", 1, "La duda cartesiana es…", ["metódica y provisional", "definitiva", "solo práctica", "solo religiosa"], 0,
    ["Es un método para hallar una certeza; no un fin."]);
  M("hd10", 1, "Empareja cada sustancia con su atributo esencial.", [
    C("Res cogitans", ["El pensamiento", "La extensión", "La perfección infinita"], 0),
    C("Res extensa", ["El pensamiento", "La extensión", "La perfección infinita"], 1),
    C("Res infinita (Dios)", ["El pensamiento", "La extensión", "La perfección infinita"], 2)],
    ["El alma piensa; la materia ocupa espacio; Dios es perfecto e infinito."], "Cogitans–pensamiento, extensa–extensión, infinita–perfección");
  O("hd11", 1, "¿Cuál de estas es una idea facticia?", ["Una sirena", "La idea de Dios", "El calor del fuego", "La idea de número"], 0,
    ["La fabrica la imaginación combinando otras (mujer y pez)."]);
  T("hd12", 1, "Completa: la sustancia cuyo atributo es el pensamiento se llama <i>res</i> ______.", "Término =", ["cogitans"],
    ["<i>Res cogitans</i> = «cosa pensante»."], "cogitans");
  O("hd13", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Aristóteles → San Agustín → Tomás de Aquino → Descartes", "San Agustín → Aristóteles → Tomás de Aquino → Descartes", "Aristóteles → Tomás de Aquino → San Agustín → Descartes", "Descartes → Tomás de Aquino → San Agustín → Aristóteles"], 0,
    ["Aristóteles (384–322 a. C.), Agustín (354–430), Tomás (1225–1274) y Descartes (1596–1650)."], "Aristóteles → San Agustín → Tomás de Aquino → Descartes");
  O("hd14", 1, "¿Qué filósofo anticipó el cogito con su «si me equivoco, existo»?", ["San Agustín", "Platón", "Hume", "Kant"], 0,
    ["Agustín: <i>si fallor, sum</i>, unos once siglos antes."]);

  // ---- nivel 2
  V("hd15", 2, "«La duda metódica de Descartes es un escepticismo: concluye que nada puede conocerse.»", false, [
    "Es falso: es un método provisional para llegar a una certeza", "Es falso: Descartes no duda de nada", "Es verdad: Descartes duda siempre", "Es verdad: por el genio maligno"], 0,
    ["El escéptico duda para quedarse dudando; Descartes, para salir de la duda."]);
  V("hd16", 2, "«El cogito es una intuición inmediata, no un silogismo.»", true, [
    "Es verdad: se ve de golpe que pensar y existir van unidos", "Es verdad: porque se deduce de la existencia de Dios", "Es verdad: porque viene de los sentidos", "Es verdad: porque es una idea facticia"], 0,
    ["Descartes lo presenta como evidencia directa, sin premisas intermedias."]);
  V("hd17", 2, "«Tras el cogito, Descartes sabe ya que el mundo exterior existe.»", false, [
    "Es falso: el mundo exterior solo se recupera después, con la ayuda de un Dios veraz", "Es falso: el mundo no existe", "Es verdad: el cogito prueba el cuerpo", "Es verdad: los sentidos lo prueban"], 0,
    ["El cogito solo prueba el yo como cosa pensante."]);
  V("hd18", 2, "«Para Descartes, Dios garantiza que lo claro y distinto es verdadero.»", true, [
    "Es verdad: un Dios perfecto no puede ser engañador", "Es verdad: porque Dios es una idea adventicia", "Es verdad: porque Dios no existe", "Es verdad: porque los sentidos lo dicen"], 0,
    ["Dios veraz descarta que el genio maligno exista de verdad."]);
  V("hd19", 2, "«Para Descartes, los animales tienen alma racional como las personas.»", false, [
    "Es falso: son máquinas o autómatas sin alma pensante", "Es falso: los animales no existen", "Es verdad: todos los seres tienen res cogitans", "Es verdad: por el hilemorfismo"], 0,
    ["Solo el ser humano une máquina corporal y alma racional."]);
  V("hd20", 2, "«Para Descartes, el cuerpo es divisible y la mente indivisible.»", true, [
    "Es verdad: el cuerpo puede dividirse en partes; no hay «medio pensamiento»", "Es verdad: porque la mente ocupa espacio", "Es verdad: porque ambos son extensos", "Es verdad: porque el cuerpo piensa"], 0,
    ["Es un argumento para distinguir realmente mente y cuerpo."]);
  V("hd21", 2, "«El argumento ontológico de Descartes parte del mundo sensible, como las vías de Tomás.»", false, [
    "Es falso: parte de la idea de Dios como ser perfecto que hay en la mente", "Es falso: no tiene argumentos", "Es verdad: parte del movimiento", "Es verdad: parte de los sentidos"], 0,
    ["Las vías de Tomás son pruebas <i>a posteriori</i>; la ontológica es <i>a priori</i>."]);
  O("hd22", 2, "El criterio de verdad de Descartes es…", ["la claridad y distinción", "el consenso", "la experiencia", "la autoridad"], 0,
    ["Evidencia: lo que no admite duda alguna."]);
  O("hd23", 2, "Para Descartes, el error nace…", ["de la voluntad, que afirma más de lo que el entendimiento ve", "de Dios", "del entendimiento infinito", "de los sueños"], 0,
    ["La voluntad es infinita; el entendimiento, limitado. Remedio: suspender el juicio."]);
  O("hd24", 2, "¿Para qué necesita Descartes la hipótesis del genio maligno?", ["Para poner en duda incluso las verdades matemáticas", "Para probar a Dios", "Para explicar el sueño", "Para criticar a los sentidos"], 0,
    ["Los sentidos y el sueño no bastan para dudar de lo matemático."]);
  O("hd25", 2, "Se llama «círculo cartesiano» a la crítica de que…",
    ["la evidencia prueba a Dios y Dios garantiza la evidencia", "el yo es una ilusión", "el cuerpo no existe", "el método no tiene reglas"], 0,
    ["Parece que se presupone lo que se quiere probar."]);
  O("hd26", 2, "Con el ejemplo de la cera, Descartes muestra que la esencia de los cuerpos…", ["la capta el entendimiento, no los sentidos", "la captan los sentidos", "es el olor", "es el color"], 0,
    ["Todas las cualidades sensibles cambian, pero la cera sigue siendo la misma."]);
  O("hd27", 2, "Los racionalistas defienden que…", ["la razón posee ideas innatas", "toda idea viene de los sentidos", "no hay ideas", "la mente es papel en blanco"], 0,
    ["Frente al empirismo."]);
  O("hd28", 2, "Para explicar la naturaleza, Descartes recurre a…", ["causas mecánicas (movimiento)", "causas finales", "las cuatro causas", "la reminiscencia"], 0,
    ["Mecanicismo: la naturaleza como máquina, sin finalidad."]);
  O("hd29", 2, "¿Quién interrogó a Descartes en 1643 sobre cómo el alma mueve al cuerpo?", ["La princesa Elisabeth de Bohemia", "La reina Cristina", "Galileo", "Hume"], 0,
    ["Es el origen del famoso problema de la interacción."]);
  O("hd30", 2, "La regla del método que manda dividir cada dificultad en partes es la del…", ["análisis", "la evidencia", "la síntesis", "la enumeración"], 0,
    ["Segunda regla."]);

  // ---- nivel 3
  O("hd31", 3, "Texto: «Pienso, luego existo» (<i>Discurso del método</i>, IV; traducción habitual). Su idea principal es…",
    ["que el yo que piensa existe, con una certeza que ninguna duda puede derribar", "que el cuerpo es lo primero que existe", "que Dios crea el mundo", "que no se puede conocer nada"], 0,
    ["Tema: primera verdad indudable que resiste incluso al genio maligno."]);
  O("hd32", 3, "Idea del <i>Discurso</i>, I (paráfrasis): el buen sentido o razón es lo mejor repartido del mundo, pues todos creen tener suficiente. Significa que…",
    ["la razón es igual en todos, y lo que cambia es cómo se usa", "unos nacen sin razón", "la razón se aprende en la escuela", "el buen sentido no existe"], 0,
    ["Universalismo de la razón; lo que importa es el método."]);
  O("hd33", 3, "Una alumna dice: «según Descartes, el genio maligno existe de verdad». ¿Qué matiz es el correcto?",
    ["Es solo una hipótesis para dudar; no afirma que exista", "Tiene razón: lo afirma", "Es Dios quien engaña", "Es el cuerpo"], 0,
    ["Basta con que sea posible; luego Dios veraz lo descarta."]);
  O("hd34", 3, "¿En qué argumento (<i>Meditación VI</i>) se apoya Descartes para decir que mente y cuerpo son realmente distintos?",
    ["Puede concebirlos clara y distintamente por separado, y lo que se concibe así puede existir así", "Los ve con los ojos", "Los sueños lo prueban", "Lo dice la Biblia"], 0,
    ["Mente: cosa pensante no extensa. Cuerpo: cosa extensa no pensante."]);
  O("hd35", 3, "¿En qué se diferencian Descartes y Aristóteles sobre el alma?",
    ["Descartes la concibe como sustancia pensante distinta del cuerpo; Aristóteles, como su forma", "No se diferencian", "Aristóteles defiende el dualismo de sustancias", "Descartes niega el alma"], 0,
    ["Dualismo de sustancias frente a hilemorfismo."]);
  O("hd36", 3, "¿En qué se diferencian Tomás de Aquino y Descartes al probar a Dios?",
    ["Tomás parte del mundo sensible; Descartes, de la idea de Dios que tiene en la mente", "Ambos parten del movimiento", "Descartes usa cinco vías", "Tomás usa el cogito"], 0,
    ["Pruebas <i>a posteriori</i> (Tomás) y <i>a priori</i> (la ontológica)."]);
  O("hd37", 3, "¿Cuál es la crítica empirista (Hume) a Descartes?",
    ["No hay ideas innatas ni un yo sustancial: todo viene de la experiencia", "Que dude demasiado poco", "Que prueba a Dios sin razón", "Que defiende el empirismo"], 0,
    ["Para Hume, el yo es un haz de percepciones."]);
  M("hd38", 3, "Empareja cada nivel de duda con su razón.", [
    C("Los sentidos", ["A veces me engañan", "No hay indicios seguros para distinguir sueño y vigilia", "Podría engañarme incluso en las matemáticas"], 0),
    C("El sueño", ["A veces me engañan", "No hay indicios seguros para distinguir sueño y vigilia", "Podría engañarme incluso en las matemáticas"], 1),
    C("El genio maligno", ["A veces me engañan", "No hay indicios seguros para distinguir sueño y vigilia", "Podría engañarme incluso en las matemáticas"], 2)],
    ["Cada nivel amplía lo que cae."], "Sentidos–engañan; sueño–sin indicios; genio–incluso matemáticas");
  M("hd39", 3, "Empareja cada pensador o hecho con su relación con Descartes.", [
    C("San Agustín", ["Precedente del cogito (<i>si fallor, sum</i>)", "Condena de 1633 que le hace retirar <i>El mundo</i>", "Niega las ideas innatas y el yo sustancial", "Precedente del argumento ontológico"], 0),
    C("Galileo", ["Precedente del cogito (<i>si fallor, sum</i>)", "Condena de 1633 que le hace retirar <i>El mundo</i>", "Niega las ideas innatas y el yo sustancial", "Precedente del argumento ontológico"], 1),
    C("Hume", ["Precedente del cogito (<i>si fallor, sum</i>)", "Condena de 1633 que le hace retirar <i>El mundo</i>", "Niega las ideas innatas y el yo sustancial", "Precedente del argumento ontológico"], 2),
    C("San Anselmo", ["Precedente del cogito (<i>si fallor, sum</i>)", "Condena de 1633 que le hace retirar <i>El mundo</i>", "Niega las ideas innatas y el yo sustancial", "Precedente del argumento ontológico"], 3)],
    ["Agustín 354–430; Galileo 1564–1642; Hume 1711–1776; Anselmo 1033–1109."], "Agustín–cogito, Galileo–condena, Hume–crítica, Anselmo–ontológico");
  R("hd40", "Explica la duda metódica de Descartes y el cogito. Compáralo con San Agustín. (Pregunta tipo PAU)", 9, [
    { t: "Caracteriza la duda: metódica, provisional, universal e hiperbólica (no escepticismo)", p: 0.4 },
    { t: "Expone los tres niveles: sentidos, sueño y genio maligno", p: 0.5 },
    { t: "Explica el cogito: resiste al genio maligno; es intuición; prueba el yo como cosa pensante", p: 0.5 },
    { t: "Enuncia el criterio de evidencia: claridad y distinción", p: 0.3 },
    { t: "Compara con Agustín (<i>si fallor, sum</i>): punto de partida del sistema frente a argumento puntual", p: 0.3 }],
    ["Duda.", "Tres niveles.", "Cogito.", "Evidencia.", "Agustín."], "Duda metódica → cogito → criterio de evidencia");
  R("hd41", "Explica el papel de Dios en el sistema de Descartes: las pruebas de su existencia, su veracidad y el origen del error. Valora críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Explica por qué necesita a Dios tras el cogito (genio maligno, criterio de evidencia)", p: 0.3 },
    { t: "Expone al menos dos pruebas: idea de infinito, mi imperfección, ontológica", p: 0.6 },
    { t: "Explica Dios veraz y garantía de la evidencia", p: 0.4 },
    { t: "Explica el origen del error: voluntad frente a entendimiento", p: 0.3 },
    { t: "Valora: círculo cartesiano, crítica de Hume o Kant", p: 0.4 }],
    ["Por qué Dios.", "Pruebas.", "Dios veraz.", "Error.", "Crítica."], "Dios veraz garantiza la evidencia; error = mal uso de la voluntad");
  R("hd42", "Explica las tres sustancias y el dualismo cartesiano, y su problema principal. Compáralo con Platón o Aristóteles. (Pregunta tipo PAU)", 8, [
    { t: "Define sustancia y las tres sustancias con su atributo (pensamiento, extensión, perfección)", p: 0.5 },
    { t: "Explica el dualismo y el argumento (clara y distintamente por separado; mente indivisible, cuerpo divisible)", p: 0.5 },
    { t: "Expone el mecanicismo y los animales-máquina", p: 0.3 },
    { t: "Plantea el problema de la interacción (Elisabeth de Bohemia, glándula pineal)", p: 0.4 },
    { t: "Compara con Platón o Aristóteles (hilemorfismo)", p: 0.3 }],
    ["Sustancias.", "Dualismo.", "Mecanicismo.", "Interacción.", "Comparación."], "Dualismo de sustancias: pensante y extensa");
  R("hd43", "Explica las cuatro reglas del método de Descartes y el criterio de evidencia, con un ejemplo. (Pregunta tipo PAU)", 8, [
    { t: "Enuncia las cuatro reglas: evidencia, análisis, síntesis y enumeración", p: 0.6 },
    { t: "Explica la evidencia: claro y distinto, sin precipitación ni prevención", p: 0.5 },
    { t: "Pone un ejemplo coherente (resolver un problema, estudiar un tema)", p: 0.3 },
    { t: "Relaciona con las matemáticas como modelo", p: 0.3 },
    { t: "Relaciona con el contexto: crisis de las certezas y ciencia moderna", p: 0.3 }],
    ["Cuatro reglas.", "Evidencia.", "Ejemplo.", "Matemáticas.", "Contexto."], "Método de cuatro reglas modelado en las matemáticas");
  R("hd44", "Comenta este texto: «Advertí que, mientras quería pensar de este modo que todo era falso, era necesario que yo, que lo pensaba, fuese algo. Y notando que esta verdad: pienso, luego existo, era tan firme y segura que las suposiciones más extravagantes de los escépticos no eran capaces de conmoverla, juzgué que podía admitirla sin escrúpulo como el primer principio de la filosofía que buscaba» (Descartes, <i>Discurso del método</i>, IV; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el cogito como primera verdad indudable", p: 0.3 },
    { t: "Idea principal: aunque todo sea falso, el que lo piensa existe; es el primer principio", p: 0.4 },
    { t: "Aclara términos: duda hiperbólica, intuición, escépticos, primer principio", p: 0.4 },
    { t: "Relaciona con el autor: criterio de evidencia, res cogitans, Dios veraz, dualismo", p: 0.5 },
    { t: "Compara con Agustín, Hume o Kant", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario del cogito");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "La escalera de la duda",
      pasos: ["Los sentidos: a veces me engañan.", "El sueño: no distingo sueño de vigilia.", "El genio maligno: me engaña hasta en matemáticas.", "Lo que resiste: pienso, luego existo."],
      nota: "Duda metódica: provisional, universal e hiperbólica." },
    { titulo: "Las tres sustancias", ancha: true,
      tabla: { cab: ["Sustancia", "Qué es", "Atributo"], filas: [
        ["Res cogitans", "alma, mente", "pensamiento"],
        ["Res extensa", "materia, cuerpo", "extensión"],
        ["Res infinita", "Dios", "perfección infinita"]
      ] } },
    { titulo: "Racionalismo y empirismo", ancha: true,
      tabla: { cab: ["", "Descartes", "Hume"], filas: [
        ["Fuente del saber", "la razón", "la experiencia"],
        ["Ideas innatas", "sí", "no"],
        ["Modelo", "matemáticas", "observación"],
        ["Yo", "sustancia pensante", "haz de percepciones"]
      ] } },
    { titulo: "Tres pruebas de Dios", ancha: true,
      tabla: { cab: ["Prueba", "Idea central"], filas: [
        ["Idea de infinito", "la causa tiene tanta realidad como el efecto"],
        ["Mi imperfección", "no me doy ni me conservo la existencia"],
        ["Ontológica", "la existencia es una perfección"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Descartes es escéptico", bien: "La duda es un método provisional", por: "Duda para llegar a una certeza." },
        { mal: "El cogito es un silogismo", bien: "Es una intuición inmediata", por: "No hay premisas intermedias." },
        { mal: "El cogito prueba el mundo exterior", bien: "Prueba el yo como cosa pensante", por: "El mundo se recupera con Dios veraz." },
        { mal: "El genio maligno existe de verdad", bien: "Es una hipótesis para dudar", por: "Basta con que sea posible." }
      ] }
  ];

  B.registrar("historia_fil", "t9", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf9a.secciones,
    nuevas: B.parte.hf9a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
