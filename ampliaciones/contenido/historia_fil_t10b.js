/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 10 (parte B): Locke y Hume
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t10.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>empirismo</b> (Locke, 1632–1704; Hume, 1711–1776) sostiene que todo conocimiento procede de la <b>experiencia</b>: la mente nace como una <b>tabula rasa</b>, sin ideas innatas.",
    "Locke: experiencia = <b>sensación</b> y <b>reflexión</b>; ideas simples y complejas; cualidades <b>primarias</b> y <b>secundarias</b>.",
    "Hume: <b>impresiones</b> e <b>ideas</b> (copias débiles). La <b>causalidad</b> es solo hábito, y de ello se sigue el <b>problema de la inducción</b>; el yo es un <b>haz de percepciones</b>; la moral nace del <b>sentimiento</b>.",
    "Locke político: <b>derechos naturales</b> (vida, libertad, bienes), <b>propiedad</b> por el trabajo, <b>contrato</b> con consentimiento, poder limitado y <b>derecho de resistencia</b>."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Locke y Hume · el empirismo",
    autores: [
      { n: "John Locke", f: "1632–1704", l: "Wrington; Oxford; exilio en Holanda; Oates" },
      { n: "David Hume", f: "1711–1776", l: "Edimburgo; La Flèche (Francia); Edimburgo" }
    ],
    obras: ["Ensayo sobre el entendimiento humano", "Dos tratados sobre el gobierno civil", "Carta sobre la tolerancia", "Tratado de la naturaleza humana", "Investigación sobre el entendimiento humano", "Investigación sobre los principios de la moral"],
    bloques: [
      { t: "Contexto", frases: ["Revolución científica (Newton) y Revolución Gloriosa (1688).", "Frente al racionalismo de Descartes: <b>todo viene de la experiencia</b>.", "Hume escribe su <i>Tratado</i> con unos 28 años."],
        tabla: { cab: ["Racionalismo", "Empirismo"], filas: [["ideas innatas", "mente «en blanco»"], ["razón y deducción", "experiencia e inducción"]] } },
      { t: "Locke: origen de las ideas", frases: ["Mente al nacer = <b>tabula rasa</b>: no hay ideas innatas.", "Fuentes: <b>sensación</b> (exterior) y <b>reflexión</b> (interior).", "Ideas <b>simples</b> (recibidas) y <b>complejas</b> (construidas)."],
        tabla: { cab: ["Primarias", "Secundarias"], filas: [["extensión, figura, movimiento", "color, sabor, olor"], ["están en el objeto", "dependen del sujeto"]] } },
      { t: "Hume: ideas y causalidad", frases: ["<b>Impresión</b> (viva) e <b>idea</b> (copia débil); principio de copia.", "De la causa solo vemos contigüidad, sucesión y repetición.", "La «conexión necesaria» es <b>hábito</b>; sin garantía para el futuro (<b>inducción</b>)."] },
      { t: "Hume: el yo", frases: ["Introspección: solo hay percepciones, nunca un «yo» aparte.", "El yo es un <b>haz de percepciones</b>, no una sustancia.", "Critica el cogito sustancial de Descartes."] },
      { t: "Hume: moral", frases: ["La razón no mueve a actuar: lo hacen las <b>pasiones</b>.", "Juzgar «bueno» o «malo» es expresar <b>sentimiento</b> (emotivismo).", "<b>Ley de Hume</b>: del «es» no se deduce el «debe»."] },
      { t: "Locke: política", frases: ["Estado de naturaleza con ley natural; <b>derechos naturales</b>: vida, libertad, bienes.", "La <b>propiedad</b> nace del trabajo, con límites.", "<b>Contrato</b> con consentimiento; poder limitado; <b>derecho de resistencia</b>; tolerancia."],
        tabla: { cab: ["Hobbes", "Locke"], filas: [["poder absoluto", "poder limitado"], ["sin resistencia", "resistencia si hay abuso"]] } }
    ],
    resumen: [
      "Todo conocimiento nace de la <b>experiencia</b>; no hay ideas innatas.",
      "Locke funda el empirismo y el <b>liberalismo político</b>: derechos naturales y gobierno por consentimiento.",
      "Hume lo lleva al límite: causa, yo y moral dependen de <b>hábito y sentimiento</b>, no de la razón.",
      "El resultado es un conocimiento <b>probable</b>, no absoluto; Kant intentará responder a Hume."
    ],
    conecta: [
      { con: "Descartes (T9):", rel: "el racionalismo al que responden; Hume critica el yo como sustancia." },
      { con: "Aristóteles (T4):", rel: "comparten el origen sensible del conocimiento; Hume critica sustancia y causas." },
      { con: "Hobbes:", rel: "Locke cambia su poder absoluto por un contrato con derechos." },
      { con: "Rousseau (T11):", rel: "retoma el contrato social, con soberanía popular." },
      { con: "Kant (T12):", rel: "Hume lo «despertó del sueño dogmático»; Kant responde con las categorías." }
    ],
    claves: [
      ["Tabula rasa", "la mente al nacer es un papel en blanco; no hay ideas innatas"],
      ["Sensación y reflexión", "las dos fuentes de experiencia (Locke): mundo exterior y mente propia"],
      ["Cualidades primarias y secundarias", "las que están en el objeto frente a las que dependen del sujeto"],
      ["Impresión e idea", "percepción viva frente a su copia débil (Hume)"],
      ["Principio de copia", "toda idea procede de una impresión"],
      ["Conexión necesaria", "lo que no se percibe en la causalidad; es hábito"],
      ["Problema de la inducción", "no hay garantía lógica de que el futuro repita el pasado"],
      ["Haz de percepciones", "el yo según Hume, no una sustancia"],
      ["Emotivismo moral", "los juicios morales expresan sentimientos, no verdades de la razón"],
      ["Contrato y derechos naturales", "el gobierno nace del consentimiento para proteger vida, libertad y bienes (Locke)"]
    ],
    cita: { txt: "Supongamos, pues, que la mente es, como se dice, un papel en blanco, vacío de todo carácter [...]. A esto respondo con una sola palabra: de la experiencia.", autor: "Locke", obra: "Ensayo sobre el entendimiento humano, II, 1 (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    cualidades: {
      titulo: "¿Cualidad primaria o secundaria?",
      consigna: "Según Locke, ¿cada característica es una cualidad primaria o secundaria?",
      categorias: ["Primaria", "Secundaria"],
      items: [
        { t: "Extensión", c: 0 },
        { t: "Figura (forma)", c: 0 },
        { t: "Solidez", c: 0 },
        { t: "Movimiento o reposo", c: 0 },
        { t: "Color", c: 1 },
        { t: "Sabor", c: 1 },
        { t: "Olor", c: 1 },
        { t: "Sonido", c: 1 }
      ]
    },
    contrato: {
      titulo: "El pensamiento político de Locke",
      consigna: "Une cada concepto con su idea.",
      pares: [
        ["Derechos naturales", "Vida, libertad y bienes"],
        ["Propiedad", "Nace del trabajo, con límites"],
        ["Contrato social", "Consentimiento para proteger los derechos"],
        ["Poder legislativo", "El supremo; representa al pueblo"],
        ["Derecho de resistencia", "Si el gobierno abusa, deja de ser legítimo"]
      ]
    },
    quiz1: {
      titulo: "Test del tema 10",
      preguntas: [
        { q: "Para Locke, la mente al nacer es…", op: ["una tabula rasa", "un conjunto de ideas innatas", "una sustancia pensante", "un haz de impulsos"], ok: 0, porque: "Papel en blanco: la experiencia escribe en ella." },
        { q: "Las dos fuentes de la experiencia en Locke son…", op: ["sensación y reflexión", "razón e intuición", "memoria e imaginación", "fe y razón"], ok: 0, porque: "Sensación (mundo exterior) y reflexión (operaciones de la propia mente)." },
        { q: "El color es, según Locke, una cualidad…", op: ["secundaria", "primaria", "innata", "intuitiva"], ok: 0, porque: "Depende en parte de nuestros sentidos: es un poder del objeto para producir sensaciones." },
        { q: "Para Hume, la diferencia entre impresión e idea es…", op: ["de intensidad (viveza)", "de origen: unas son innatas", "de verdad o falsedad", "de lugar: unas externas y otras internas"], ok: 0, porque: "La idea es una copia más débil de la impresión." },
        { q: "El principio de copia de Hume dice que…", op: ["toda idea simple procede de una impresión", "toda impresión viene de una idea", "las ideas son innatas", "la razón crea las ideas"], ok: 0, porque: "Si no hay impresión de origen, la idea es una palabra vacía." },
        { q: "Según Hume, la «conexión necesaria» entre causa y efecto…", op: ["no se percibe: nace del hábito", "se percibe con la vista", "es una verdad lógica", "es una idea innata"], ok: 0, porque: "Solo vemos contigüidad, sucesión y repetición; la expectativa es nuestra." },
        { q: "El problema de la inducción plantea que…", op: ["no hay garantía lógica de que el futuro repita el pasado", "la ciencia es deductiva", "las matemáticas son falsas", "todo lo que existe es una impresión"], ok: 0, porque: "Justificarlo con la experiencia pasada sería un círculo." },
        { q: "Para Hume, el yo es…", op: ["un haz de percepciones", "una sustancia pensante", "un alma inmortal", "una idea innata"], ok: 0, porque: "Al mirar dentro solo encuentra percepciones sueltas." },
        { q: "La propiedad, según Locke, nace…", op: ["del trabajo", "de la herencia divina", "de la fuerza", "de la ley del soberano"], ok: 0, porque: "Mezclar el trabajo propio con algo lo hace nuestro, dentro de ciertos límites." },
        { q: "Los juicios morales, para Hume, expresan…", op: ["sentimientos de aprobación o rechazo", "verdades deducidas por la razón", "órdenes de Dios", "leyes del soberano"], ok: 0, porque: "La razón no mueve a actuar: lo hacen las pasiones." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Locke es FALSA?", op: ["Defiende que la mente tiene ideas innatas", "La mente nace como una tabula rasa", "Sus fuentes son sensación y reflexión", "Distingue cualidades primarias y secundarias"], ok: 0, porque: "Locke rechaza las ideas innatas." },
        { q: "¿Cuál de estas afirmaciones sobre las cualidades es FALSA?", op: ["Las secundarias son ilusorias y no tienen relación con el objeto", "Extensión y figura son primarias", "Color y sabor son secundarias", "Las secundarias son poderes del objeto para producir sensaciones"], ok: 0, porque: "No son ilusorias: son poderes del objeto que producen sensaciones en nosotros." },
        { q: "¿Cuál de estas afirmaciones sobre Hume es FALSA?", op: ["Las ideas son más vivas que las impresiones", "Las ideas son copias de impresiones", "La causalidad nace del hábito", "El yo es un haz de percepciones"], ok: 0, porque: "Las impresiones son más vivas; las ideas, copias más débiles." },
        { q: "¿Cuál de estas afirmaciones sobre la causalidad en Hume es FALSA?", op: ["Percibimos directamente la conexión necesaria entre causa y efecto", "Solo observamos contigüidad y sucesión", "La necesidad se proyecta desde la mente", "Hay conjunción constante"], ok: 0, porque: "La conexión necesaria nunca se percibe." },
        { q: "¿Cuál de estas afirmaciones sobre el yo en Hume es FALSA?", op: ["Es una sustancia simple y permanente que percibimos", "Es un haz de percepciones", "La memoria ayuda a crear la sensación de identidad", "No hay impresión de un yo fijo"], ok: 0, porque: "Hume rechaza el yo-sustancia." },
        { q: "¿Cuál de estas afirmaciones sobre la moral en Hume es FALSA?", op: ["La razón es la que mueve a actuar", "Las pasiones mueven a actuar", "De un «es» no se deduce un «debe»", "El juicio moral expresa un sentimiento"], ok: 0, porque: "Para Hume la razón es «esclava de las pasiones»." },
        { q: "¿Cuál de estas afirmaciones sobre Locke político es FALSA?", op: ["El poder del gobierno es absoluto y no se puede resistir", "Existen derechos naturales anteriores al Estado", "La propiedad nace del trabajo", "El gobierno se basa en el consentimiento"], ok: 0, porque: "Locke defiende un gobierno limitado y el derecho de resistencia." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Hume es anterior a Locke", "Locke nació en 1632", "Hume nació en 1711", "Descartes es anterior a Locke"], ok: 0, porque: "Locke (1632–1704) es anterior a Hume (1711–1776)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Locke y Hume",
      cartas: [
        { a: "Empirismo", b: "El conocimiento procede de la experiencia; no hay ideas innatas." },
        { a: "Tabula rasa", b: "La mente al nacer es un papel en blanco, sin ideas." },
        { a: "Sensación", b: "Experiencia del mundo exterior por los sentidos (Locke)." },
        { a: "Reflexión", b: "Experiencia de las operaciones de la propia mente (Locke); depende de la sensación." },
        { a: "Ideas simples y complejas", b: "Las simples se reciben; las complejas las construye la mente combinando, comparando y abstrayendo." },
        { a: "Cualidades primarias", b: "Extensión, figura, solidez, movimiento: están en el objeto." },
        { a: "Cualidades secundarias", b: "Color, sabor, olor, sonido: dependen en parte de nuestros sentidos." },
        { a: "Impresiones", b: "Percepciones vivas y directas (Hume)." },
        { a: "Ideas (Hume)", b: "Copias más débiles de las impresiones, en la memoria o imaginación." },
        { a: "Principio de copia", b: "Toda idea simple procede de una impresión previa." },
        { a: "Relaciones de ideas", b: "Matemáticas y lógica; su contrario es una contradicción." },
        { a: "Cuestiones de hecho", b: "Conocimiento por experiencia; su contrario es posible." },
        { a: "Conexión necesaria", b: "Lo que creemos ver entre causa y efecto; en realidad, un hábito de la mente." },
        { a: "Problema de la inducción", b: "Nada garantiza que el futuro se parezca al pasado." },
        { a: "Haz de percepciones", b: "El yo según Hume: percepciones en flujo, sin sustancia." },
        { a: "Emotivismo moral", b: "Los juicios morales expresan sentimientos de aprobación o rechazo." },
        { a: "Ley de Hume", b: "De lo que es no se deduce lo que debe ser." },
        { a: "Derechos naturales", b: "Vida, libertad y bienes; anteriores al Estado (Locke)." },
        { a: "Contrato social (Locke)", b: "Pacto de consentimiento para crear un gobierno limitado que proteja los derechos." },
        { a: "Derecho de resistencia", b: "Si el gobierno abusa, el pueblo puede resistirse y cambiarlo." }
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
  O("hl1", 1, "¿En qué año nació John Locke?", ["1632", "1596", "1711", "1724"], 0,
    ["Locke (1632–1704). Descartes nació en 1596, Hume en 1711 y Kant en 1724."]);
  O("hl2", 1, "¿Cuándo se publicó el <i>Tratado de la naturaleza humana</i> de Hume?", ["1739–1740", "1690", "1651", "1781"], 0,
    ["Hume lo escribió con unos 28 años. 1690 es el <i>Ensayo</i> de Locke."]);
  O("hl3", 1, "¿Quién escribió el <i>Ensayo sobre el entendimiento humano</i> (1690)?", ["Locke", "Hume", "Descartes", "Kant"], 0,
    ["Locke. Hume escribió una <i>Investigación</i> sobre el entendimiento humano en 1748."]);
  T("hl4", 1, "Completa: según Locke, la mente al nacer es una ______ (<i>tabula rasa</i>, «papel en blanco»).", "Término =", ["tabula rasa", "tabla rasa"],
    ["No hay ideas innatas: la experiencia escribe en ella."], "tabula rasa");
  M("hl5", 1, "Indica si cada ejemplo de experiencia es sensación o reflexión (Locke).", [
    C("Ver el rojo de una manzana", ["Sensación", "Reflexión"], 0),
    C("Darte cuenta de que dudas", ["Sensación", "Reflexión"], 1),
    C("Notar el frío de la nieve", ["Sensación", "Reflexión"], 0),
    C("Recordar lo que pensaste ayer", ["Sensación", "Reflexión"], 1)],
    ["Sensación = mundo exterior; reflexión = operaciones de la propia mente."], "Sensación, reflexión, sensación, reflexión");
  O("hl6", 1, "Para Hume, las percepciones vivas y directas se llaman…", ["impresiones", "ideas", "sustancias", "categorías"], 0,
    ["Las ideas son sus copias más débiles."]);
  O("hl7", 1, "Las copias más débiles de las impresiones se llaman…", ["ideas", "impresiones", "pasiones", "hábitos"], 0,
    ["En Hume, idea = copia débil de una impresión."]);
  O("hl8", 1, "Según Locke, ¿cuál es una cualidad primaria?", ["La extensión", "El color", "El sabor", "El olor"], 0,
    ["Extensión, figura, solidez y movimiento son primarias; color, sabor y olor, secundarias."]);
  T("hl9", 1, "Completa: para Hume, la «conexión necesaria» entre causa y efecto no se percibe: es un ______ de la mente (algo adquirido por repetición).", "Término =", ["hábito", "habito", "costumbre"],
    ["Tras ver muchas veces A y B juntos, la mente espera B cuando aparece A."], "hábito");
  O("hl10", 1, "Los derechos naturales de Locke son…", ["vida, libertad y bienes", "solo la propiedad", "igualdad y fraternidad", "obediencia y orden"], 0,
    ["Son anteriores al Estado y este debe protegerlos."]);
  O("hl11", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Descartes → Locke → Hume → Kant", "Locke → Descartes → Hume → Kant", "Hume → Locke → Descartes → Kant", "Descartes → Hume → Locke → Kant"], 0,
    ["Descartes (1596), Locke (1632), Hume (1711), Kant (1724)."], "Descartes → Locke → Hume → Kant");
  O("hl12", 1, "¿Cuál es la obra política principal de Locke?", ["Dos tratados sobre el gobierno civil", "Tratado de la naturaleza humana", "Leviatán", "Crítica de la razón pura"], 0,
    ["El <i>Leviatán</i> es de Hobbes; el <i>Tratado</i>, de Hume; la <i>Crítica</i>, de Kant."]);
  O("hl13", 1, "Para Hume, el yo es…", ["un haz de percepciones", "una sustancia pensante", "un alma inmortal", "una idea innata"], 0,
    ["Al mirar dentro solo encuentra percepciones sueltas."]);
  M("hl14", 1, "Clasifica cada frase como relación de ideas o cuestión de hecho (Hume).", [
    C("«2 + 2 = 4»", ["Relación de ideas", "Cuestión de hecho"], 0),
    C("«Mañana lloverá en Madrid»", ["Relación de ideas", "Cuestión de hecho"], 1),
    C("«Un triángulo tiene tres lados»", ["Relación de ideas", "Cuestión de hecho"], 0),
    C("«El agua hierve a 100 °C al nivel del mar»", ["Relación de ideas", "Cuestión de hecho"], 1)],
    ["Si negarla es una contradicción: relación de ideas. Si es posible imaginar lo contrario: cuestión de hecho."], "Relación, hecho, relación, hecho");

  // ---- nivel 2
  V("hl15", 2, "«Locke defiende, como Descartes, que la mente tiene ideas innatas.»", false, [
    "Es falso: para Locke la mente nace como un papel en blanco", "Es falso: Locke no cree en ninguna idea", "Es verdad: era racionalista", "Es verdad: aceptaba la idea de Dios como innata"], 0,
    ["Locke rechaza las ideas innatas (Libro I del <i>Ensayo</i>)."]);
  V("hl16", 2, "«Para Locke, la reflexión depende de que antes haya habido sensaciones.»", true, [
    "Es verdad: solo se puede reflexionar sobre ideas ya recibidas", "Es verdad: porque la reflexión es innata", "Es verdad: porque la reflexión sustituye a los sentidos", "Es verdad: porque sin sensación no hay razón"], 0,
    ["Nadie duda o recuerda en el vacío: hacen falta ideas previas."]);
  V("hl17", 2, "«Para Locke, las cualidades secundarias son ilusiones sin relación con el objeto.»", false, [
    "Es falso: son poderes del objeto que producen sensaciones, y dependen en parte del sujeto", "Es falso: son las únicas reales", "Es verdad: el color no existe", "Es verdad: el objeto no tiene ninguna cualidad"], 0,
    ["Las produce el objeto, pero el resultado depende de nuestros órganos."]);
  V("hl18", 2, "«Para Hume, la diferencia entre una impresión y una idea es solo de intensidad.»", true, [
    "Es verdad: la idea es una copia más débil de la impresión", "Es verdad: porque las ideas son innatas", "Es verdad: porque las impresiones son falsas", "Es verdad: porque las ideas son más vivas"], 0,
    ["La idea de dolor no duele como el dolor."]);
  V("hl19", 2, "«Hume niega que existan causas y que el sol vaya a salir mañana.»", false, [
    "Es falso: critica nuestra justificación de la causalidad, no su uso en la vida diaria", "Es falso: demuestra que el sol saldrá siempre", "Es verdad: era un escéptico total", "Es verdad: negaba el mundo exterior"], 0,
    ["Su crítica es al origen y la justificación de la idea, no una negación del mundo."]);
  V("hl20", 2, "«Para Hume, el yo es una sustancia simple que se percibe por introspección.»", false, [
    "Es falso: la introspección solo encuentra percepciones, no un yo", "Es falso: el yo es el cuerpo", "Es verdad: es el cogito de Descartes", "Es verdad: se percibe con la vista"], 0,
    ["Haz de percepciones, no sustancia."]);
  V("hl21", 2, "«Para Locke, el poder político es legítimo solo si se basa en el consentimiento de los gobernados.»", true, [
    "Es verdad: el gobierno nace de un pacto para proteger los derechos", "Es verdad: porque el rey recibe el poder de Dios", "Es verdad: porque la fuerza crea el derecho", "Es verdad: porque el pueblo no puede resistirse"], 0,
    ["Consentimiento y confianza (<i>trust</i>); si hay abuso, puede resistirse."]);
  O("hl22", 2, "Según el principio de copia, una idea es legítima si…", ["procede de una impresión", "es innata", "la deduce la razón", "la admite la mayoría"], 0,
    ["Si no se rastrea hasta una impresión, es una palabra vacía."]);
  O("hl23", 2, "Negar una relación de ideas, como «2 + 2 = 4», produce…", ["una contradicción", "una probabilidad", "una expectativa", "una impresión"], 0,
    ["Por eso son necesarias; las cuestiones de hecho no."]);
  O("hl24", 2, "Para Hume, la idea de necesidad causal nace de…", ["la costumbre de esperar B tras ver A", "una impresión de la fuerza oculta", "una idea innata", "la razón deductiva"], 0,
    ["La expectativa nace de la repetición y se proyecta sobre las cosas."]);
  O("hl25", 2, "El problema de la inducción consiste en que…", ["no hay garantía lógica de que el futuro se parezca al pasado", "la ciencia usa solo deducción", "la inducción siempre da conclusiones falsas", "no existen las matemáticas"], 0,
    ["La experiencia pasada no demuestra la futura sin círculo."]);
  O("hl26", 2, "Según Locke, ¿de dónde nace la propiedad?", ["Del trabajo", "De la herencia divina", "De la fuerza", "De la decisión del soberano"], 0,
    ["Al mezclar tu trabajo con algo, pasa a ser tuyo (con límites)."]);
  O("hl27", 2, "El emotivismo moral de Hume afirma que juzgar algo como bueno o malo es…", ["expresar un sentimiento de aprobación o rechazo", "descubrir una verdad con la razón", "obedecer a Dios", "cumplir la ley del soberano"], 0,
    ["La razón no mueve a actuar; lo hace la pasión."]);
  O("hl28", 2, "La «ley de Hume» advierte de que…", ["de lo que es no se deduce lo que debe ser", "todo lo que existe debe existir", "la razón decide la moral", "todo deber es un hecho"], 0,
    ["No se puede saltar de un «es» a un «debe» sin una premisa moral."]);
  O("hl29", 2, "¿En qué se diferencia el estado de naturaleza de Locke del de Hobbes?", ["En Locke hay ley natural y libertad; en Hobbes, guerra de todos contra todos", "En Locke es una guerra; en Hobbes, paz", "No se diferencian", "En Locke no hay derechos"], 0,
    ["Hobbes → poder absoluto; Locke → poder limitado."]);
  M("hl30", 2, "Según Hume, ¿se observa o no se observa esto en el choque de dos bolas de billar?", [
    C("El choque entre las bolas", ["Se observa", "No se observa"], 0),
    C("La «fuerza» que obliga a la segunda a moverse", ["Se observa", "No se observa"], 1),
    C("Que una se mueva después de la otra", ["Se observa", "No se observa"], 0),
    C("La conexión necesaria", ["Se observa", "No se observa"], 1)],
    ["Observamos contigüidad, sucesión y repetición; la necesidad la pone la mente."], "Se observa, no, se observa, no");
  T("hl31", 2, "Completa: para Hume, las matemáticas tratan de ______ de ideas.", "Término =", ["relaciones"],
    ["Relaciones de ideas (necesarias) frente a cuestiones de hecho."], "relaciones");

  // ---- nivel 3
  O("hl32", 3, "¿Por qué no se puede justificar la inducción diciendo «hasta ahora la naturaleza ha sido uniforme»?",
    ["Porque sería un círculo: usa la inducción para justificar la inducción", "Porque la naturaleza no es uniforme", "Porque la lógica ya la demuestra", "Porque Hume la considera una verdad matemática"], 0,
    ["Se supone lo que había que probar."]);
  O("hl33", 3, "Hume y Descartes se oponen sobre el yo porque…",
    ["Descartes lo considera una sustancia pensante evidente; Hume solo encuentra un haz de percepciones", "ambos lo consideran un haz de percepciones", "Hume lo deduce del cogito", "Descartes niega que exista"], 0,
    ["Cogito sustancial frente a identidad como ficción de la imaginación."]);
  O("hl34", 3, "Respecto a la sustancia, Locke y Hume se diferencian en que…",
    ["Locke la admite aunque la considera oscura («un no sé qué»), y Hume la rechaza por carecer de impresión", "ambos la aceptan sin dudas", "Hume la admite y Locke la rechaza", "ninguno habla de sustancia"], 0,
    ["Hume ensancha la grieta que Locke dejó."]);
  O("hl35", 3, "En el texto «Nunca puedo atraparme a mí mismo sin una percepción», Hume usa…",
    ["la introspección, el método empirista aplicado a la mente", "la deducción matemática", "la fe religiosa", "el argumento del sueño"], 0,
    ["Mira dentro y solo encuentra percepciones."]);
  O("hl36", 3, "El razonamiento «siempre se ha hecho así; por tanto, debe hacerse» comete el error que señala…",
    ["la ley de Hume (salto del «es» al «debe»)", "el principio de copia", "el problema de la inducción", "la crítica al yo"], 0,
    ["Pasa de un hecho a un deber sin premisa moral."]);
  O("hl37", 3, "Los límites de Locke a la propiedad son…",
    ["no acumular lo que se estropea y dejar suficiente y de igual calidad para los demás", "no tener más de una casa", "pagar impuestos al rey", "compartir todo con la comunidad"], 0,
    ["Dos límites: no desperdiciar y dejar bastante para otros."]);
  O("hl38", 3, "La crítica de Hume al contrato social de Locke sostiene que…",
    ["nadie firmó nunca ese pacto: obedecemos por costumbre y por utilidad", "el contrato es la única base posible", "el poder es de origen divino", "el pueblo no debe obedecer nunca"], 0,
    ["Aplica su empirismo a la política."]);
  M("hl39", 3, "Atribuye cada concepto a su autor (Locke o Hume).", [
    C("Tabula rasa", ["Locke", "Hume"], 0),
    C("Haz de percepciones", ["Locke", "Hume"], 1),
    C("Derecho de resistencia", ["Locke", "Hume"], 0),
    C("Ley «es–debe»", ["Locke", "Hume"], 1)],
    ["Locke: tabula rasa, derechos y contrato. Hume: haz de percepciones y ley es–debe."], "Locke, Hume, Locke, Hume");
  R("hl40", "Explica el empirismo de Locke: la tabula rasa, las fuentes de las ideas y las cualidades primarias y secundarias. (Pregunta tipo PAU)", 9, [
    { t: "Contrapone empirismo a racionalismo (Descartes) y niega las ideas innatas", p: 0.4 },
    { t: "Explica la tabula rasa y los argumentos contra el innatismo", p: 0.4 },
    { t: "Distingue sensación y reflexión (y que la segunda depende de la primera)", p: 0.4 },
    { t: "Explica ideas simples y complejas (la mente recibe y construye)", p: 0.4 },
    { t: "Distingue cualidades primarias y secundarias con ejemplos", p: 0.4 }],
    ["Empirismo frente a racionalismo.", "Tabula rasa.", "Sensación y reflexión.", "Ideas simples y complejas.", "Cualidades primarias y secundarias."], "Toda idea viene de la experiencia; la mente nace en blanco");
  R("hl41", "Explica la crítica de Hume a la causalidad y el problema de la inducción. (Pregunta tipo PAU)", 9, [
    { t: "Expone impresiones e ideas y el principio de copia", p: 0.4 },
    { t: "Explica qué se observa en la causalidad (contigüidad, sucesión, conjunción) y qué no (conexión necesaria)", p: 0.5 },
    { t: "Explica que la necesidad es un hábito proyectado por la mente", p: 0.4 },
    { t: "Expone el problema de la inducción y su carácter circular", p: 0.4 },
    { t: "Valora la influencia (Kant, filosofía de la ciencia)", p: 0.3 }],
    ["Impresiones e ideas.", "Qué se observa.", "Hábito.", "Inducción.", "Valoración."], "La causalidad es hábito; no hay garantía lógica para el futuro");
  R("hl42", "Explica la crítica de Hume al yo y su teoría moral (emotivismo). Compáralo con Descartes. (Pregunta tipo PAU)", 9, [
    { t: "Aplica el principio de copia al yo y concluye que no hay impresión de un yo fijo", p: 0.4 },
    { t: "Explica el yo como haz de percepciones y la identidad como ficción", p: 0.4 },
    { t: "Expone que la razón no mueve a actuar: las pasiones", p: 0.3 },
    { t: "Explica el juicio moral como sentimiento (emotivismo) y la ley de Hume", p: 0.5 },
    { t: "Compara con Descartes (cogito, sustancia pensante)", p: 0.4 }],
    ["Principio de copia aplicado al yo.", "Haz de percepciones.", "Razón y pasión.", "Emotivismo y ley de Hume.", "Comparación con Descartes."], "Yo = haz de percepciones; moral = sentimiento");
  R("hl43", "Explica el pensamiento político de Locke (estado de naturaleza, propiedad, contrato y tolerancia) y compáralo con Hobbes o con Hume. (Pregunta tipo PAU)", 9, [
    { t: "Describe el estado de naturaleza y los derechos naturales (vida, libertad, bienes)", p: 0.4 },
    { t: "Explica la propiedad como fruto del trabajo y sus límites", p: 0.4 },
    { t: "Explica el contrato, el consentimiento y el gobierno limitado con división de poderes", p: 0.4 },
    { t: "Explica el derecho de resistencia y la tolerancia", p: 0.4 },
    { t: "Compara con Hobbes (poder absoluto) o Hume (crítica al contrato)", p: 0.4 }],
    ["Estado de naturaleza.", "Propiedad.", "Contrato.", "Resistencia y tolerancia.", "Comparación."], "Gobierno limitado que protege derechos naturales");
  R("hl44", "Comenta este texto: «Supongamos, pues, que la mente es, como se dice, un papel en blanco, vacío de todo carácter, sin ninguna idea. ¿Cómo llega a tenerlas? [...] A esto respondo con una sola palabra: de la experiencia» (Locke, <i>Ensayo sobre el entendimiento humano</i>, II, 1; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el origen de las ideas en la experiencia", p: 0.3 },
    { t: "Idea principal: la mente es una tabula rasa y toda idea viene de la experiencia", p: 0.4 },
    { t: "Aclara términos: papel en blanco, experiencia (sensación y reflexión)", p: 0.4 },
    { t: "Relaciona con el autor: rechazo del innatismo, ideas simples y complejas, cualidades", p: 0.5 },
    { t: "Compara con Descartes (ideas innatas) o Hume (impresiones e ideas)", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de la tabula rasa");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Locke y Hume", ancha: true,
      tabla: { cab: ["", "Locke", "Hume"], filas: [
        ["Origen del conocimiento", "Experiencia: sensación y reflexión", "Impresiones; las ideas son copias"],
        ["Mente", "Tabula rasa", "Haz de percepciones"],
        ["Sustancia", "Admitida, pero «un no sé qué»", "Rechazada: sin impresión"],
        ["Causalidad", "Relación entre ideas", "Hábito; sin conexión necesaria"],
        ["Moral y política", "Derechos naturales y contrato", "Sentimiento y utilidad"]
      ] } },
    { titulo: "Impresiones e ideas (Hume)", ancha: true,
      tabla: { cab: ["Impresión", "Idea"], filas: [
        ["Percepción viva y directa", "Copia débil en memoria o imaginación"],
        ["Quemarte la mano", "Recordar la quemadura"],
        ["De sensación y de reflexión", "Simples y complejas"]
      ] } },
    { titulo: "La causalidad según Hume",
      pasos: ["Contigüidad: A y B están juntos.", "Prioridad: A viene antes que B.", "Conjunción constante: siempre pasa igual.", "No se ve la «conexión necesaria».", "La mente la proyecta por hábito."],
      nota: "De ahí, el problema de la inducción." },
    { titulo: "Locke político", ancha: true,
      tabla: { cab: ["Concepto", "Idea"], filas: [
        ["Derechos naturales", "Vida, libertad y bienes"],
        ["Propiedad", "Nace del trabajo; sin desperdicio y dejando bastante"],
        ["Contrato", "Consentimiento para proteger derechos"],
        ["Resistencia", "Si el gobierno abusa, se puede cambiar"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Las cualidades secundarias son ilusiones", bien: "Son poderes del objeto que producen sensaciones en nosotros", por: "Dependen en parte del sujeto, no son inventadas." },
        { mal: "Hume niega que existan causas", bien: "Niega que veamos o podamos demostrar la conexión necesaria", por: "Su crítica es sobre el origen de la idea." },
        { mal: "Para Hume el yo no existe", bien: "El yo es un haz de percepciones, no una sustancia", por: "Critica la sustancia, no la vida diaria." },
        { mal: "Locke defiende un poder absoluto", bien: "Defiende un gobierno limitado y el derecho de resistencia", por: "El absolutista es Hobbes." }
      ] }
  ];

  B.registrar("historia_fil", "t10", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf10a.secciones,
    nuevas: B.parte.hf10a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
