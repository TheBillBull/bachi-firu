/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 12 (parte B): Kant
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t12.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Kant (1724–1804) sintetiza racionalismo y empirismo: el conocimiento exige <b>experiencia</b> (materia) y <b>estructuras de la mente</b> (forma). Es el <b>giro copernicano</b>.",
    "Los juicios <b>sintéticos a priori</b> fundamentan matemáticas y física; solo conocemos <b>fenómenos</b>, nunca el <b>noúmeno</b>.",
    "La metafísica (alma, mundo, Dios) no es ciencia; las ideas de la razón solo tienen uso <b>regulativo</b>.",
    "Su ética es formal y autónoma: <b>imperativo categórico</b>, deber y buena voluntad; la razón práctica postula <b>libertad, inmortalidad y Dios</b>.",
    "Defiende la <b>Ilustración</b> («<i>sapere aude</i>»), la república y la paz perpetua."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Kant · el idealismo trascendental",
    autores: [{ n: "Immanuel Kant", f: "1724–1804", l: "Königsberg (Prusia Oriental)" }],
    obras: ["Crítica de la razón pura", "Fundamentación de la metafísica de las costumbres", "Crítica de la razón práctica", "¿Qué es la Ilustración?", "Hacia la paz perpetua"],
    bloques: [
      { t: "Contexto", frases: ["Siglo de la <b>Ilustración</b> y de la física de Newton.", "Hume lo «despierta del sueño dogmático».", "Vive en la Prusia de Federico II."],
        tabla: { cab: ["Racionalismo", "Empirismo"], filas: [["ideas innatas", "todo de la experiencia"], ["aporta la forma (a priori)", "aporta la materia (experiencia)"]] } },
      { t: "Conocimiento", frases: ["<b>Giro copernicano</b>: el objeto se adapta al sujeto.", "Experiencia = materia; mente = forma (espacio, tiempo, categorías).", "Pregunta clave: ¿cómo son posibles los juicios <b>sintéticos a priori</b>?"],
        tabla: { cab: ["Analítico", "Sintético"], filas: [["explica", "amplía"], ["predicado en el sujeto", "predicado fuera del sujeto"]] } },
      { t: "Realidad", frases: ["Solo conocemos <b>fenómenos</b>, no la cosa en sí.", "El <b>noúmeno</b> es un concepto límite.", "Sensibilidad, entendimiento y razón."],
        tabla: { cab: ["Fenómeno", "Noúmeno"], filas: [["lo que aparece", "cosa en sí"], ["cognoscible", "no cognoscible"]] } },
      { t: "Metafísica", frases: ["La razón busca lo incondicionado: <b>alma, mundo y Dios</b>.", "Cae en paralogismos, antinomias e ideal.", "Las ideas tienen uso <b>regulativo</b>."] },
      { t: "Ética", frases: ["Buena voluntad y <b>deber</b>; ética formal y autónoma.", "Máxima que puedas querer como <b>ley universal</b>.", "Trata la humanidad como <b>fin</b>, no solo como medio."],
        tabla: { cab: ["Hipotético", "Categórico"], filas: [["«si quieres X, haz Y»", "«haz Y»"], ["condicionado", "incondicionado"]] } },
      { t: "Razón práctica y política", frases: ["<b>Postulados</b>: libertad, inmortalidad del alma y Dios.", "<b>Ilustración</b>: salir de la minoría de edad.", "<b>Paz perpetua</b>: repúblicas y federación de Estados."] }
    ],
    resumen: [
      "El conocimiento combina <b>experiencia</b> y <b>formas de la mente</b>; solo alcanza los <b>fenómenos</b>.",
      "La metafísica tradicional no es ciencia; la fe en Dios y el alma se apoya en la <b>razón práctica</b>.",
      "La moral es <b>deber</b> autónomo y universal, no cálculo de consecuencias.",
      "La Ilustración exige <b>pensar por uno mismo</b> con libertad de uso público de la razón."
    ],
    conecta: [
      { con: "Platón (T3):", rel: "fenómeno/noúmeno recuerda a sensible/inteligible, pero el noúmeno no se conoce." },
      { con: "Aristóteles (T4):", rel: "ética formal del deber frente a ética material de la felicidad." },
      { con: "Descartes (T9):", rel: "critica el yo como sustancia en los paralogismos." },
      { con: "Locke y Hume (T10):", rel: "Hume lo despierta; responde con las categorías." },
      { con: "Rousseau (T11):", rel: "libertad y voluntad general, que Kant formula como autonomía." }
    ],
    claves: [
      ["Giro copernicano", "el objeto, tal como se conoce, se adapta a las estructuras del sujeto"],
      ["Juicio sintético a priori", "amplía el conocimiento y es necesario y universal"],
      ["Fenómeno y noúmeno", "lo que aparece frente a la cosa en sí, incognoscible"],
      ["Categorías", "doce conceptos puros del entendimiento, como causa y sustancia"],
      ["Ideas de la razón", "alma, mundo y Dios; no dan conocimiento, orientan la investigación"],
      ["Imperativo categórico", "mandato incondicional: obra según una máxima universalizable"],
      ["Autonomía", "la voluntad se da a sí misma la ley moral"],
      ["Postulados", "libertad, inmortalidad y Dios: supuestos de la moral"],
      ["Bien supremo", "virtud más felicidad merecida"],
      ["Sapere aude", "«atrévete a pensar por ti mismo»"]
    ],
    cita: { txt: "Obra solo según aquella máxima por la cual puedas querer que al mismo tiempo se convierta en ley universal.", autor: "Kant", obra: "Fundamentación de la metafísica de las costumbres, II (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    facultades: {
      titulo: "¿Sensibilidad, entendimiento o razón?",
      consigna: "Une cada elemento con la facultad a la que pertenece en la Crítica de la razón pura.",
      categorias: ["Sensibilidad", "Entendimiento", "Razón"],
      items: [
        { t: "Espacio", c: 0 }, { t: "Tiempo", c: 0 }, { t: "Intuición", c: 0 },
        { t: "Causalidad", c: 1 }, { t: "Sustancia", c: 1 }, { t: "Categorías", c: 1 },
        { t: "Idea de Dios", c: 2 }, { t: "Idea de alma", c: 2 }, { t: "Antinomias", c: 2 }
      ]
    },
    imperativos: {
      titulo: "¿Hipotético o categórico?",
      consigna: "Clasifica cada mandato según la distinción de Kant.",
      categorias: ["Hipotético", "Categórico"],
      items: [
        { t: "Si quieres aprobar, estudia", c: 0 },
        { t: "No mientas", c: 1 },
        { t: "Si quieres adelgazar, come menos", c: 0 },
        { t: "Cumple tus promesas", c: 1 },
        { t: "Si quieres un buen trabajo, aprende inglés", c: 0 },
        { t: "Trata a la humanidad como fin y no solo como medio", c: 1 }
      ]
    },
    postulados: {
      titulo: "Los postulados de la razón práctica",
      consigna: "Une cada concepto con su función.",
      pares: [
        ["Libertad", "Condición del deber: «debes, luego puedes»"],
        ["Inmortalidad del alma", "Progreso infinito hacia la santidad"],
        ["Existencia de Dios", "Garantiza que virtud y felicidad coincidan"],
        ["Bien supremo", "Virtud unida a la felicidad merecida"],
        ["Autonomía", "La voluntad se da a sí misma la ley"]
      ]
    },
    obras: {
      titulo: "Las obras de Kant",
      consigna: "Ordena de la más antigua a la más reciente.",
      items: [
        { t: "Crítica de la razón pura (1781)" },
        { t: "¿Qué es la Ilustración? (1784)" },
        { t: "Fundamentación de la metafísica de las costumbres (1785)" },
        { t: "Crítica de la razón práctica (1788)" },
        { t: "Hacia la paz perpetua (1795)" }
      ]
    },
    prueba: {
      titulo: "El test de la ley universal",
      consigna: "Ordena los pasos para examinar una máxima.",
      items: [
        { t: "Formula la máxima de tu acción" },
        { t: "Imagina que todo el mundo actúa según ella" },
        { t: "Comprueba si hay contradicción al pensarla o al quererla" },
        { t: "Si hay contradicción, la acción es contraria al deber" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 12",
      preguntas: [
        { q: "El «giro copernicano» de Kant consiste en suponer que…", op: ["el objeto conocido se adapta a las estructuras del sujeto", "la mente copia pasivamente el mundo", "la Tierra gira alrededor del Sol", "el conocimiento es innato"], ok: 0, porque: "Como Copérnico cambió el punto de vista, Kant coloca en el sujeto las condiciones del conocimiento." },
        { q: "Un juicio analítico es aquel en el que…", op: ["el predicado está contenido en el sujeto", "el predicado añade información nueva", "hace falta la experiencia", "se refiere a la moral"], ok: 0, porque: "Analizar el concepto basta; no se amplía el conocimiento." },
        { q: "«7 + 5 = 12» es, para Kant, un juicio…", op: ["sintético a priori", "analítico a priori", "sintético a posteriori", "analítico a posteriori"], ok: 0, porque: "Amplía el conocimiento y es necesario y universal." },
        { q: "Las formas puras de la sensibilidad son…", op: ["el espacio y el tiempo", "las doce categorías", "alma, mundo y Dios", "el deber y la libertad"], ok: 0, porque: "Estética trascendental: espacio y tiempo." },
        { q: "El noúmeno es…", op: ["la cosa en sí, incognoscible", "la realidad que conocemos", "una idea innata", "un sentimiento moral"], ok: 0, porque: "Es un concepto límite del conocimiento." },
        { q: "La Dialéctica trascendental trata de…", op: ["las ideas de la razón: alma, mundo y Dios", "el espacio y el tiempo", "las categorías", "la moral"], ok: 0, porque: "La razón se extravía al tratar de conocer lo incondicionado." },
        { q: "Un imperativo categórico es…", op: ["un mandato incondicional", "un mandato condicionado a un deseo", "una ley física", "un consejo de prudencia"], ok: 0, porque: "«Haz Y», sin «si quieres X»." },
        { q: "Según Kant, tratar a las personas «solo como medio» es…", op: ["contrario al imperativo categórico", "obligatorio", "indiferente moralmente", "propio de la ética de Aristóteles"], ok: 0, porque: "Las personas son fines en sí mismas." },
        { q: "Los postulados de la razón práctica son…", op: ["libertad, inmortalidad del alma y Dios", "espacio, tiempo y causalidad", "deber, placer y utilidad", "alma, mundo y materia"], ok: 0, porque: "Son supuestos de la moral, no conocimientos." },
        { q: "El lema de la Ilustración según Kant es…", op: ["Sapere aude", "Cogito, ergo sum", "Conócete a ti mismo", "Pienso, luego existo"], ok: 0, porque: "«Atrévete a servirte de tu propio entendimiento»." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Kant es FALSA?", op: ["Es un empirista como Hume", "Responde a Hume con las categorías", "Habla de juicios sintéticos a priori", "Distingue fenómeno y noúmeno"], ok: 0, porque: "Acepta que el conocimiento comienza con la experiencia, pero no que proceda solo de ella." },
        { q: "¿Cuál de estas afirmaciones sobre los juicios es FALSA?", op: ["Los juicios analíticos amplían el conocimiento", "«Todos los cuerpos son extensos» es analítico", "«Todos los cuerpos son pesados» es sintético", "Los sintéticos a priori son la base de la física"], ok: 0, porque: "Los analíticos solo explican lo que ya está en el sujeto." },
        { q: "¿Cuál de estas afirmaciones sobre fenómeno y noúmeno es FALSA?", op: ["Podemos conocer el noúmeno con la ciencia", "El fenómeno es lo que aparece", "El noúmeno es un concepto límite", "Espacio y tiempo pertenecen al fenómeno"], ok: 0, porque: "El noúmeno es incognoscible." },
        { q: "¿Cuál de estas afirmaciones sobre la metafísica en Kant es FALSA?", op: ["Demuestra que Dios no existe", "Las ideas tienen uso regulativo", "Las antinomias muestran contradicciones de la razón", "La razón teórica no puede probar a Dios"], ok: 0, porque: "No lo demuestra ni lo refuta: lo deja fuera del saber teórico." },
        { q: "¿Cuál de estas afirmaciones sobre la ética kantiana es FALSA?", op: ["Se basa en las consecuencias de la acción", "Es deontológica", "Es formal", "Su criterio es la universalidad de la máxima"], ok: 0, porque: "Lo que cuenta es la intención por deber, no las consecuencias." },
        { q: "¿Cuál de estas afirmaciones sobre la autonomía es FALSA?", op: ["Es obedecer a una autoridad externa", "La voluntad se da a sí misma la ley", "Se opone a la heteronomía", "Es la base de la dignidad humana"], ok: 0, porque: "Obedecer lo externo es heteronomía." },
        { q: "¿Cuál de estas afirmaciones sobre la Ilustración es FALSA?", op: ["La minoría de edad es falta de inteligencia", "El lema es sapere aude", "Exige libertad de uso público de la razón", "La causa es la pereza y la cobardía"], ok: 0, porque: "Es falta de decisión y valor, no de inteligencia." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["La Crítica de la razón práctica es anterior a la Crítica de la razón pura", "La Crítica de la razón pura es de 1781", "Hume es anterior a Kant", "Hacia la paz perpetua es de 1795"], ok: 0, porque: "La razón pura (1781) precede a la práctica (1788)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Kant",
      cartas: [
        { a: "Giro copernicano", b: "El objeto, tal como se conoce, se adapta a las estructuras del sujeto." },
        { a: "Juicio analítico", b: "El predicado está contenido en el sujeto; explica, no amplía." },
        { a: "Juicio sintético", b: "El predicado añade algo nuevo al sujeto." },
        { a: "Juicio a priori", b: "Independiente de la experiencia; necesario y universal." },
        { a: "Juicio a posteriori", b: "Depende de la experiencia." },
        { a: "Sintético a priori", b: "Amplía el conocimiento y es necesario: matemáticas y física." },
        { a: "Estética trascendental", b: "Estudia la sensibilidad: espacio y tiempo." },
        { a: "Analítica trascendental", b: "Estudia el entendimiento y sus doce categorías." },
        { a: "Dialéctica trascendental", b: "Estudia la razón y la ilusión de la metafísica." },
        { a: "Categorías", b: "Conceptos puros del entendimiento, como causa y sustancia." },
        { a: "Fenómeno", b: "La realidad tal como se nos aparece." },
        { a: "Noúmeno", b: "La cosa en sí; concepto límite, incognoscible." },
        { a: "Ideas de la razón", b: "Alma, mundo y Dios; uso regulativo." },
        { a: "Buena voluntad", b: "Lo único bueno sin restricción: querer cumplir el deber." },
        { a: "Imperativo hipotético", b: "«Si quieres X, haz Y»: condicionado a un deseo." },
        { a: "Imperativo categórico", b: "Mandato incondicional de la razón." },
        { a: "Fórmula de la ley universal", b: "Obra según una máxima que puedas querer como ley universal." },
        { a: "Fórmula de la humanidad", b: "Trata a las personas como fin y nunca solo como medio." },
        { a: "Autonomía y heteronomía", b: "La voluntad se da a sí misma la ley / obedece algo externo." },
        { a: "Postulados de la razón práctica", b: "Libertad, inmortalidad del alma y Dios." },
        { a: "Bien supremo", b: "Virtud unida a la felicidad merecida." },
        { a: "Sapere aude", b: "Atrévete a servirte de tu propio entendimiento." },
        { a: "Uso público de la razón", b: "El del sabio ante el público lector; debe ser libre." },
        { a: "Hacia la paz perpetua", b: "Repúblicas, federación de Estados y derecho cosmopolita (1795)." }
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
  O("kt1", 1, "¿En qué año nació Immanuel Kant?", ["1724", "1596", "1711", "1632"], 0,
    ["Kant (1724–1804). Descartes nació en 1596, Locke en 1632 y Hume en 1711."]);
  O("kt2", 1, "¿En qué ciudad nació y vivió casi toda su vida?", ["Königsberg", "Berlín", "París", "Viena"], 0,
    ["Königsberg, en Prusia Oriental; apenas salió de allí."]);
  O("kt3", 1, "¿Qué filósofo «despertó a Kant de su sueño dogmático»?", ["Hume", "Descartes", "Locke", "Leibniz"], 0,
    ["Kant lo cuenta en los <i>Prolegómenos</i>: la crítica de Hume a la causalidad."]);
  O("kt4", 1, "¿Cuál es su obra de 1781?", ["Crítica de la razón pura", "Crítica de la razón práctica", "Fundamentación de la metafísica de las costumbres", "Hacia la paz perpetua"], 0,
    ["La <i>Crítica de la razón pura</i> es de 1781; la práctica, de 1788; la <i>Fundamentación</i>, de 1785; la <i>Paz perpetua</i>, de 1795."]);
  T("kt5", 1, "Completa: el cambio de punto de vista de Kant se llama revolución o giro ______ (por el astrónomo Copérnico).", "Término =", ["copernicana", "copernicano"],
    ["Como Copérnico cambió el centro, Kant cambia lo que gira alrededor de qué."], "copernicana");
  M("kt6", 1, "Clasifica cada juicio como analítico o sintético.", [
    C("Todos los cuerpos son extensos", ["Analítico", "Sintético"], 0),
    C("Todos los cuerpos son pesados", ["Analítico", "Sintético"], 1),
    C("Los solteros no están casados", ["Analítico", "Sintético"], 0),
    C("Hoy llueve en Madrid", ["Analítico", "Sintético"], 1)],
    ["Analítico si el predicado ya está en el sujeto."], "Analítico, sintético, analítico, sintético");
  M("kt7", 1, "Clasifica cada juicio como a priori o a posteriori.", [
    C("7 + 5 = 12", ["A priori", "A posteriori"], 0),
    C("El agua hierve a 100 °C al nivel del mar", ["A priori", "A posteriori"], 1),
    C("Todo suceso tiene una causa", ["A priori", "A posteriori"], 0),
    C("Hoy hace frío", ["A priori", "A posteriori"], 1)],
    ["A priori = no depende de la experiencia."], "A priori, a posteriori, a priori, a posteriori");
  O("kt8", 1, "Los juicios sobre los que Kant funda matemáticas y física son…", ["sintéticos a priori", "analíticos a priori", "sintéticos a posteriori", "analíticos a posteriori"], 0,
    ["Amplían el conocimiento y son necesarios y universales."]);
  O("kt9", 1, "El fenómeno es…", ["la realidad tal como se nos aparece", "la cosa en sí", "una idea innata", "un sentimiento"], 0,
    ["Es lo que aparece, organizado por nuestra mente."]);
  O("kt10", 1, "El noúmeno es…", ["la cosa en sí, que no podemos conocer", "la realidad que conocemos", "la forma del tiempo", "una categoría"], 0,
    ["Es un concepto límite: se piensa pero no se conoce."]);
  O("kt11", 1, "Las dos formas puras de la sensibilidad son…", ["espacio y tiempo", "causa y efecto", "alma y mundo", "deber y libertad"], 0,
    ["Se estudian en la Estética trascendental."]);
  O("kt12", 1, "¿Cuántas categorías distingue Kant?", ["12", "3", "4", "10"], 0,
    ["Doce, en cuatro grupos de tres: cantidad, cualidad, relación y modalidad."]);
  O("kt13", 1, "La ética de Kant es…", ["deontológica (basada en el deber)", "basada en las consecuencias", "hedonista", "basada en el sentimiento"], 0,
    ["Importa la intención de cumplir el deber, no el resultado."]);
  T("kt14", 1, "Completa: el mandato incondicional de la moral kantiana es el imperativo ______.", "Término =", ["categórico", "categorico"],
    ["Frente al hipotético, que depende de un deseo."], "categórico");
  O("kt15", 1, "«Sapere aude» significa…", ["Ten el valor de servirte de tu propio entendimiento", "Conócete a ti mismo", "Pienso, luego existo", "Obedece a la autoridad"], 0,
    ["Es el lema de la Ilustración, tomado de Horacio."]);

  // ---- nivel 2
  V("kt16", 2, "«Kant piensa, como Hume, que todo el conocimiento procede de la experiencia.»", false, [
    "Es falso: la experiencia da la materia, pero la forma la pone la mente", "Es falso: Kant niega la experiencia", "Es verdad: era empirista", "Es verdad: rechazaba las categorías"], 0,
    ["Empieza con la experiencia pero no procede solo de ella."]);
  V("kt17", 2, "«Un juicio analítico no amplía el conocimiento.»", true, [
    "Es verdad: el predicado ya está contenido en el sujeto", "Es verdad: porque depende de la experiencia", "Es verdad: porque es falso", "Es verdad: porque es moral"], 0,
    ["Solo explica el concepto."]);
  V("kt18", 2, "«Todos los juicios a priori son analíticos.»", false, [
    "Es falso: las matemáticas son sintéticas a priori", "Es falso: los a priori dependen de la experiencia", "Es verdad: los a priori nunca amplían", "Es verdad: Kant los consideraba lógicos"], 0,
    ["Los sintéticos a priori son el caso decisivo."]);
  V("kt19", 2, "«Para Kant, espacio y tiempo son formas puras de la sensibilidad.»", true, [
    "Es verdad: son el molde en que recibimos lo sensible", "Es verdad: son conceptos del entendimiento", "Es verdad: son cosas en sí", "Es verdad: se sacan de la experiencia"], 0,
    ["Son intuiciones puras, no conceptos."]);
  V("kt20", 2, "«El noúmeno es un mundo oculto que la ciencia acabará explorando.»", false, [
    "Es falso: es un concepto límite inaccesible al conocimiento", "Es falso: es el mundo que vemos", "Es verdad: Kant era platónico", "Es verdad: la física lo estudia"], 0,
    ["El conocimiento está limitado a la experiencia posible."]);
  V("kt21", 2, "«Kant demuestra que Dios no existe.»", false, [
    "Es falso: la razón teórica no puede probarlo ni refutarlo", "Es falso: demuestra que existe con la prueba ontológica", "Es verdad: critica las pruebas", "Es verdad: era ateo"], 0,
    ["Lo traslada a la razón práctica como postulado."]);
  V("kt22", 2, "«Para Kant, una acción tiene valor moral por la intención de cumplir el deber, no por sus consecuencias.»", true, [
    "Es verdad: su ética es deontológica", "Es verdad: lo que importa es la felicidad", "Es verdad: lo que importa es el placer", "Es verdad: lo decide el Estado"], 0,
    ["Ejemplo del tendero honesto."]);
  V("kt23", 2, "«El imperativo hipotético vale para todos los seres racionales con independencia de sus deseos.»", false, [
    "Es falso: vale solo para quien desea el fin; es el categórico el incondicional", "Es falso: es un mandato moral", "Es verdad: es la ley moral", "Es verdad: no depende de nada"], 0,
    ["«Si quieres X, haz Y» depende de X."]);
  M("kt24", 2, "Indica a qué facultad pertenece cada elemento.", [
    C("Espacio", ["Sensibilidad", "Entendimiento", "Razón"], 0),
    C("Causalidad", ["Sensibilidad", "Entendimiento", "Razón"], 1),
    C("Idea de Dios", ["Sensibilidad", "Entendimiento", "Razón"], 2),
    C("Tiempo", ["Sensibilidad", "Entendimiento", "Razón"], 0)],
    ["Sensibilidad: formas de la intuición; entendimiento: categorías; razón: ideas."], "Sensibilidad, entendimiento, razón, sensibilidad");
  M("kt25", 2, "Clasifica cada mandato.", [
    C("Si quieres ahorrar, evita los caprichos", ["Hipotético", "Categórico"], 0),
    C("Cumple tus promesas", ["Hipotético", "Categórico"], 1),
    C("Si quieres aprobar, estudia", ["Hipotético", "Categórico"], 0),
    C("Nunca trates a nadie solo como medio", ["Hipotético", "Categórico"], 1)],
    ["Hipotético = condicionado a un fin deseado."], "Hipotético, categórico, hipotético, categórico");
  M("kt26", 2, "Uso público o privado de la razón (¿Qué es la Ilustración?).", [
    C("Un sabio publica un escrito criticando un impuesto", ["Uso público", "Uso privado"], 0),
    C("Un oficial ejecuta la orden de su superior", ["Uso público", "Uso privado"], 1),
    C("Un profesor escribe un libro criticando el sistema educativo", ["Uso público", "Uso privado"], 0),
    C("Un clérigo enseña el catecismo desde su cargo", ["Uso público", "Uso privado"], 1)],
    ["Público = ante todo el público lector; privado = desde un cargo."], "Público, privado, público, privado");
  T("kt27", 2, "Completa: los postulados de la razón práctica son libertad, inmortalidad del alma y la existencia de ______.", "Término =", ["dios", "la existencia de dios"],
    ["Garantiza que virtud y felicidad coincidan."], "Dios");
  T("kt28", 2, "Completa: cuando la voluntad se da a sí misma la ley, hablamos de ______ (frente a heteronomía).", "Término =", ["autonomía", "autonomia"],
    ["Auto = uno mismo; nomos = ley."], "autonomía");
  O("kt29", 2, "Según Kant, la causa de la minoría de edad es…", ["la pereza y la cobardía", "la falta de inteligencia", "la tiranía exclusivamente", "la voluntad de Dios"], 0,
    ["No falta entendimiento, sino decisión y valor."]);
  O("kt30", 2, "¿Qué formulación del imperativo categórico prohíbe usar a otros solo como instrumento?", ["La de la humanidad como fin", "La de la ley universal", "La de la ley de la naturaleza", "El imperativo hipotético"], 0,
    ["La persona tiene dignidad, no precio."]);

  // ---- nivel 3
  O("kt31", 3, "¿Por qué «7 + 5 = 12» es sintético para Kant?", ["Porque 12 no está contenido en el concepto «7 + 5»; hay que construir la suma en la intuición", "Porque se aprende con la experiencia", "Porque es una contradicción", "Porque es una opinión"], 0,
    ["El concepto de 7 + 5 solo expresa la unión; el resultado exige la intuición."]);
  O("kt32", 3, "¿Cómo responde Kant a Hume sobre la causalidad?", ["Es una categoría que el entendimiento aporta y vale para toda experiencia", "La causalidad no existe", "Es solo un hábito, como dice Hume", "Es una idea innata de Dios"], 0,
    ["Fundamenta su validez universal."]);
  O("kt33", 3, "¿Por qué la metafísica tradicional no puede ser ciencia?", ["Porque sus ideas (alma, mundo, Dios) exceden la experiencia posible", "Porque es falsa", "Porque no usa la lógica", "Porque no tiene historia"], 0,
    ["Sin intuición sensible no hay conocimiento."]);
  O("kt34", 3, "¿Por qué la máxima «hacer una promesa falsa» no pasa el test?", ["Universalizada destruiría la práctica de prometer", "Porque produce malas consecuencias", "Porque no gusta a Dios", "Porque lo prohíbe la ley"], 0,
    ["Contradicción en el concepto."]);
  O("kt35", 3, "¿Qué diferencia una ética formal (Kant) de una material (Aristóteles)?", ["La formal fija cómo debe ser la máxima; la material señala un fin como la felicidad", "La formal depende de la religión", "La material no usa la razón", "No hay diferencia"], 0,
    ["Kant no dice qué hacer, sino cómo comprobarlo."]);
  O("kt36", 3, "El postulado de la libertad se resume en «debes, luego puedes». Significa que…", ["el deber presupone la libertad para cumplirlo", "la libertad es una ilusión", "el deber no existe", "la libertad es sinónimo de placer"], 0,
    ["Sin libertad, la obligación sería absurda."]);
  O("kt37", 3, "Un tendero no engaña a los niños para no perder clientes. Según Kant, su acción es…", ["conforme al deber, pero no por deber", "por deber y con valor moral", "inmoral", "un imperativo hipotético imposible"], 0,
    ["El motivo es el interés."]);
  O("kt38", 3, "¿Qué significa el uso regulativo de las ideas de la razón?", ["No amplían el conocimiento, pero orientan la investigación", "Dan conocimiento de Dios", "Son innatas", "Sustituyen a la experiencia"], 0,
    ["Funcionan como horizontes."]);
  O("kt39", 3, "¿Cuál es el orden cronológico de las tres Críticas?", ["Razón pura → razón práctica → juicio", "Razón práctica → razón pura → juicio", "Juicio → razón pura → razón práctica", "Razón pura → juicio → razón práctica"], 0,
    ["1781, 1788 y 1790."], "Razón pura → razón práctica → juicio");
  O("kt40", 3, "En ética, a diferencia de Hume, Kant funda la moral en…", ["la razón y el deber", "el sentimiento", "la utilidad", "la costumbre"], 0,
    ["Hume la basaba en el sentimiento."]);
  R("kt41", "Explica el giro copernicano de Kant y los juicios sintéticos a priori. (Pregunta tipo PAU)", 9, [
    { t: "Explica el giro copernicano (el objeto se adapta al sujeto)", p: 0.4 },
    { t: "Distingue materia (experiencia) y forma (espacio, tiempo, categorías)", p: 0.4 },
    { t: "Define analítico/sintético y a priori/a posteriori", p: 0.4 },
    { t: "Explica por qué matemáticas y física son sintéticas a priori", p: 0.4 },
    { t: "Relaciona con Hume (causalidad)", p: 0.4 }],
    ["Giro copernicano.", "Materia y forma.", "Tipos de juicios.", "Sintético a priori.", "Respuesta a Hume."], "El sujeto pone la forma; la ciencia es posible porque hay juicios sintéticos a priori");
  R("kt42", "Explica la distinción entre fenómeno y noúmeno y la crítica de Kant a la metafísica. (Pregunta tipo PAU)", 9, [
    { t: "Define fenómeno y noúmeno", p: 0.4 },
    { t: "Explica que el noúmeno es un concepto límite", p: 0.4 },
    { t: "Menciona las ideas: alma, mundo y Dios", p: 0.4 },
    { t: "Explica paralogismos, antinomias e ideal de la razón", p: 0.4 },
    { t: "Señala el uso regulativo y que no demuestra ni refuta a Dios", p: 0.4 }],
    ["Fenómeno y noúmeno.", "Concepto límite.", "Ideas de la razón.", "Errores de la razón.", "Uso regulativo."], "Solo hay conocimiento de fenómenos; la metafísica es ilusión necesaria");
  R("kt43", "Expón la ética kantiana (buena voluntad, imperativo categórico, formulaciones y autonomía) y compárala con la de Aristóteles. (Pregunta tipo PAU)", 9, [
    { t: "Explica la buena voluntad y el deber (ética deontológica)", p: 0.4 },
    { t: "Distingue imperativo hipotético y categórico", p: 0.4 },
    { t: "Expone al menos dos formulaciones del imperativo categórico", p: 0.4 },
    { t: "Explica autonomía frente a heteronomía y ética formal", p: 0.4 },
    { t: "Compara con Aristóteles (felicidad y virtud frente a deber)", p: 0.4 }],
    ["Buena voluntad.", "Imperativos.", "Formulaciones.", "Autonomía y formalismo.", "Comparación."], "Moral autónoma del deber frente a ética material de la felicidad");
  R("kt44", "Explica la Ilustración, el uso público de la razón y la propuesta política de la paz perpetua. (Pregunta tipo PAU)", 9, [
    { t: "Define la Ilustración como salida de la minoría de edad y el lema «sapere aude»", p: 0.4 },
    { t: "Explica las causas: pereza y cobardía", p: 0.4 },
    { t: "Distingue uso público y uso privado de la razón", p: 0.4 },
    { t: "Explica los tres artículos definitivos de la paz perpetua", p: 0.4 },
    { t: "Relaciona con la libertad y la autonomía", p: 0.4 }],
    ["Minoría de edad.", "Pereza y cobardía.", "Uso público y privado.", "Paz perpetua.", "Relación con la autonomía."], "Ilustración = pensar por uno mismo con libertad pública");
  R("kt45", "Comenta este texto: «Obra de tal modo que uses la humanidad, tanto en tu persona como en la persona de cualquier otro, siempre como un fin al mismo tiempo y nunca solamente como un medio» (Kant, <i>Fundamentación de la metafísica de las costumbres</i>, sección II; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: una formulación del imperativo categórico (la humanidad como fin)", p: 0.3 },
    { t: "Idea principal: las personas tienen dignidad y no pueden ser solo instrumento", p: 0.4 },
    { t: "Aclara términos: fin y medio, humanidad, imperativo categórico", p: 0.4 },
    { t: "Relaciona con la ética formal, la autonomía y el reino de los fines", p: 0.5 },
    { t: "Compara con otro autor (Aristóteles, Hume o Rousseau)", p: 0.4 }],
    ["Tema.", "Idea principal.", "Términos.", "Relación con Kant.", "Comparación."], "Dignidad de la persona como fin en sí mismo");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Los cuatro tipos de juicios", ancha: true,
      tabla: { cab: ["", "A priori", "A posteriori"], filas: [
        ["Analítico", "todos los cuerpos son extensos", "no existe"],
        ["Sintético", "7 + 5 = 12; todo suceso tiene causa", "todos los cuerpos son pesados"]
      ] } },
    { titulo: "Las tres partes de la Crítica", ancha: true,
      tabla: { cab: ["Parte", "Facultad", "Objeto"], filas: [
        ["Estética", "sensibilidad", "espacio y tiempo"],
        ["Analítica", "entendimiento", "categorías"],
        ["Dialéctica", "razón", "alma, mundo, Dios"]
      ] } },
    { titulo: "Imperativos",
      tabla: { cab: ["Hipotético", "Categórico"], filas: [
        ["«si quieres X, haz Y»", "«haz Y»"],
        ["condicionado", "incondicionado"]
      ] } },
    { titulo: "Postulados de la razón práctica",
      pasos: ["Libertad: condición del deber.", "Inmortalidad: progreso infinito hacia la santidad.", "Dios: virtud y felicidad coinciden."],
      nota: "No son conocimientos: son supuestos de la moral." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Kant es empirista", bien: "Combina experiencia y estructuras a priori", por: "Materia y forma." },
        { mal: "El noúmeno es un mundo oculto explorable", bien: "Es un concepto límite incognoscible", por: "Solo hay fenómenos." },
        { mal: "Kant demuestra que Dios no existe", bien: "Ni lo prueba ni lo refuta en la razón teórica", por: "Lo postula la razón práctica." },
        { mal: "La minoría de edad es falta de inteligencia", bien: "Es falta de decisión y valor", por: "Pereza y cobardía." }
      ] }
  ];

  B.registrar("historia_fil", "t12", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf12a.secciones,
    nuevas: B.parte.hf12a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
