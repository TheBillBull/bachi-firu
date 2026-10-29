/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 11 (parte B): Rousseau y la Ilustración
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t11.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Rousseau (1712–1778) comparte la fe ilustrada en la razón crítica, pero duda de que el <b>progreso</b> haya hecho mejores a las personas.",
    "En el <b>estado de naturaleza</b> (hipótesis) el ser humano es libre y de buen natural; la sociedad crea el <b>amor propio</b>, la propiedad y la desigualdad.",
    "El <b>contrato social</b> cede los derechos a la comunidad entera y funda la <b>voluntad general</b> (bien común, distinta de la voluntad de todos) y la soberanía popular.",
    "El <i>Emilio</i> propone una <b>educación natural</b> que respete las etapas del desarrollo infantil."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Rousseau · 1712–1778 · y la Ilustración",
    autores: [{ n: "Jean-Jacques Rousseau", f: "1712–1778", l: "Ginebra; vivió sobre todo en Francia" }],
    obras: ["Discurso sobre las ciencias y las artes (1750)", "Discurso sobre el origen de la desigualdad (1755)", "Del contrato social (1762)", "Emilio (1762)"],
    bloques: [
      { t: "Contexto: la Ilustración", frases: ["Siglo XVIII, «siglo de las luces»: confianza en la <b>razón crítica</b> y el progreso.", "Lema de Kant: <b>sapere aude</b> («atrévete a saber»).", "Rousseau colabora en la <i>Enciclopedia</i> y luego discrepa de los ilustrados."] },
      { t: "Estado de naturaleza", frases: ["Es una <b>hipótesis</b>, no una época histórica.", "El ser humano natural es libre, aislado y <b>amoral</b>, con piedad.", "Es <b>perfectible</b>: puede mejorar (y empeorar)."],
        tabla: { cab: ["Amor de sí", "Amor propio"], filas: [["natural: conservarse", "social: compararse"], ["sano", "origen de envidia y vanidad"]] } },
      { t: "Crítica a la civilización", frases: ["Las ciencias y las artes no mejoran las costumbres (1750).", "La <b>propiedad privada</b> funda la sociedad civil desigual (1755).", "El pacto de los ricos consolida sus privilegios."] },
      { t: "Contrato social", frases: ["Problema: vivir con otros y seguir <b>libre</b>.", "Cada uno se entrega a la <b>comunidad entera</b>, no a un rey.", "Libertad civil y moral: obedecer la ley que uno se da."] },
      { t: "Voluntad general y soberanía", frases: ["<b>Soberanía popular</b>: inalienable e indivisible.", "Critica la representación; el gobierno es comisionado del pueblo."],
        tabla: { cab: ["Voluntad de todos", "Voluntad general"], filas: [["suma de intereses particulares", "bien común"], ["puede ser injusta", "siempre recta"]] } },
      { t: "Educación y religión", frases: ["<i>Emilio</i>: educación <b>negativa</b>, que respeta las etapas.", "Se aprende por experiencia y consecuencias.", "Religión natural: la conciencia como guía."] }
    ],
    resumen: [
      "El mal viene de la <b>sociedad</b> (amor propio, propiedad, desigualdad), no de una naturaleza perversa.",
      "No hay vuelta atrás: la solución es una sociedad justa, el <b>contrato social</b>.",
      "La ley legítima expresa la <b>voluntad general</b> y el pueblo es <b>soberano</b>.",
      "Educar es proteger y respetar el desarrollo natural del niño."
    ],
    conecta: [
      { con: "Platón y Aristóteles (T3–T4):", rel: "también buscan la comunidad justa y el bien común." },
      { con: "Descartes (T9):", rel: "heredan la confianza en la razón; Rousseau añade el sentimiento." },
      { con: "Hobbes y Locke (T10):", rel: "otros contractualistas: soberano absoluto o gobierno limitado." },
      { con: "Kant (T12):", rel: "toma la autonomía (darse la ley) y resume la Ilustración." },
      { con: "Marx (T13):", rel: "continúa la crítica a la propiedad y la desigualdad." }
    ],
    claves: [
      ["Ilustración", "movimiento del siglo XVIII que confía en la razón crítica y el progreso"],
      ["Sapere aude", "«atrévete a saber»: lema ilustrado en la versión de Kant"],
      ["Estado de naturaleza", "hipótesis del ser humano antes de la sociedad: libre, aislado y amoral"],
      ["Amor de sí / amor propio", "conservarse (natural) frente a compararse con los demás (social)"],
      ["Perfectibilidad", "capacidad humana de mejorar, que saca al ser humano de la naturaleza"],
      ["Propiedad privada", "origen de la sociedad civil desigual"],
      ["Contrato social", "pacto por el que cada uno se entrega a la comunidad entera"],
      ["Voluntad general", "la que busca el bien común; distinta de la voluntad de todos"],
      ["Soberanía popular", "el poder pertenece al pueblo, inalienable e indivisible"],
      ["Educación negativa", "proteger al niño de lo que lo desvía y respetar sus etapas"]
    ],
    cita: { txt: "El hombre ha nacido libre, y sin embargo, en todas partes se encuentra encadenado.", autor: "Rousseau", obra: "Del contrato social, I, 1 (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    naturaleza: {
      titulo: "¿Amor de sí o amor propio?",
      consigna: "Toca cada situación y después el tipo de amor que corresponde, según Rousseau.",
      categorias: ["Amor de sí (natural)", "Amor propio (social)"],
      items: [
        { t: "Comer cuando tengo hambre", c: 0 },
        { t: "Querer tener más que mi vecina", c: 1 },
        { t: "Protegerme del peligro", c: 0 },
        { t: "Envidiar el éxito de otro", c: 1 },
        { t: "Dormir cuando tengo sueño", c: 0 },
        { t: "Presumir para que me admiren", c: 1 },
        { t: "Compararme con los demás para sentirme superior", c: 1 },
        { t: "Buscar refugio contra el frío", c: 0 }
      ]
    },
    ordendesigualdad: {
      titulo: "La historia de la desigualdad",
      consigna: "Ordena los pasos del Discurso sobre la desigualdad, del principio al final.",
      items: [
        { t: "Estado de naturaleza: libres, aislados, con amor de sí y piedad" },
        { t: "Primeras sociedades: aparece la comparación y la división del trabajo" },
        { t: "Propiedad privada: «esto es mío»" },
        { t: "Pacto engañoso de los ricos: leyes que consolidan sus privilegios" },
        { t: "Despotismo: todos iguales, pero esclavos del déspota" }
      ]
    },
    voluntades: {
      titulo: "Las tres voluntades",
      consigna: "Une cada voluntad con su definición.",
      pares: [["Voluntad particular", "Lo que le conviene a cada individuo"], ["Voluntad de todos", "La suma de los intereses particulares"], ["Voluntad general", "Lo que busca el bien común"]]
    },
    etapasemilio: {
      titulo: "Las etapas del Emilio",
      consigna: "Ordena las etapas de la educación de Emilio, de la más temprana a la última.",
      items: [
        { t: "Primera infancia (hasta 2 años): cuerpo y primeras sensaciones" },
        { t: "Infancia (2–12 años): sentidos y experiencia" },
        { t: "Preadolescencia (12–15 años): razón y curiosidad" },
        { t: "Adolescencia (15–20 años): sentimientos, moral y religión" },
        { t: "Edad adulta: ciudadano" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 11",
      preguntas: [
        { q: "El lema «sapere aude» significa…", op: ["atrévete a saber", "conócete a ti mismo", "pienso, luego existo", "solo sé que no sé nada"], ok: 0, porque: "Es de Horacio, hecho famoso por Kant en 1784." },
        { q: "Rousseau nació en…", op: ["Ginebra", "París", "Londres", "Berlín"], ok: 0, porque: "Nació en Ginebra en 1712." },
        { q: "En el Discurso de 1750, Rousseau sostiene que las ciencias y las artes…", op: ["no han mejorado las costumbres", "han hecho a la gente más virtuosa", "deben prohibirse", "solo sirven a la Iglesia"], ok: 0, porque: "Su tesis: el progreso material no es progreso moral." },
        { q: "El estado de naturaleza de Rousseau es…", op: ["una hipótesis para entender al ser humano", "una época histórica comprobada", "una guerra de todos contra todos", "un reino gobernado por un rey"], ok: 0, porque: "Él mismo advierte que quizá nunca existió; la guerra de todos es de Hobbes." },
        { q: "El amor propio (amour-propre) es…", op: ["el afán de compararse y estar por encima de los demás", "el instinto de conservación", "la compasión natural", "el amor a la patria"], ok: 0, porque: "Nace en sociedad; el instinto de conservación es el amor de sí." },
        { q: "Según el Discurso de 1755, la sociedad civil nace con…", op: ["la propiedad privada", "el contrato social", "la Enciclopedia", "la religión natural"], ok: 0, porque: "«Esto es mío»: el cercado del terreno." },
        { q: "En el contrato social, cada uno cede sus derechos a…", op: ["la comunidad entera", "un rey absoluto", "los ricos", "la Iglesia"], ok: 0, porque: "Ceder a un soberano absoluto es la solución de Hobbes." },
        { q: "La voluntad general es…", op: ["la que busca el bien común", "la suma de los deseos de cada uno", "la voluntad del monarca", "la de la mayoría, sea cual sea"], ok: 0, porque: "La suma de intereses es la voluntad de todos." },
        { q: "Para Rousseau la soberanía es…", op: ["del pueblo, inalienable e indivisible", "del rey por derecho divino", "repartida entre tres poderes", "de los filósofos"], ok: 0, porque: "El pueblo no puede transferirla ni dividirla." },
        { q: "El Emilio propone una educación…", op: ["natural, que respeta las etapas del desarrollo", "basada en la memoria y el castigo", "sin ninguna guía del adulto", "exclusivamente religiosa"], ok: 0, porque: "Educación negativa: proteger y respetar el ritmo del niño." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Rousseau es FALSA?", op: ["Rousseau rechaza la razón y el saber en todos los casos", "Rousseau colaboró en la Enciclopedia", "Rousseau cuestiona que el progreso mejore la moral", "Rousseau escribió el Emilio"], ok: 0, porque: "Usa la razón crítica; lo que cuestiona es el progreso moral." },
        { q: "¿Cuál de estas afirmaciones sobre el estado de naturaleza es FALSA?", op: ["Fue una época histórica comprobada que Rousseau documentó", "Es una hipótesis para pensar", "En él el ser humano es amoral", "El ser humano tiene amor de sí y piedad"], ok: 0, porque: "Rousseau advierte que quizá nunca existió." },
        { q: "¿Cuál de estas afirmaciones sobre el amor propio es FALSA?", op: ["Es natural y existe antes de toda sociedad", "Nace al compararse con los demás", "Alimenta la envidia y la vanidad", "Se distingue del amor de sí"], ok: 0, porque: "El natural es el amor de sí; el amor propio es social." },
        { q: "¿Cuál de estas afirmaciones sobre la voluntad general es FALSA?", op: ["Es la suma de las voluntades particulares", "Busca el bien común", "Se expresa en la ley", "Se distingue de la voluntad de todos"], ok: 0, porque: "Esa suma es la voluntad de todos." },
        { q: "¿Cuál de estas afirmaciones sobre el contrato social es FALSA?", op: ["Cada uno cede sus derechos a un monarca absoluto", "Cada uno se entrega a la comunidad entera", "Busca conservar la libertad", "Funda la soberanía popular"], ok: 0, porque: "Ceder el poder a un soberano absoluto es la propuesta de Hobbes." },
        { q: "¿Cuál de estas afirmaciones sobre la Ilustración es FALSA?", op: ["Todos los ilustrados defendían la democracia", "Su lema, según Kant, es «sapere aude»", "La Enciclopedia fue un proyecto de divulgación", "Hubo defensores del despotismo ilustrado"], ok: 0, porque: "Muchos ilustrados defendían monarcas reformistas." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Rousseau nació antes que Locke", "Locke nació en 1632", "Rousseau murió en 1778", "Kant nació en 1724"], ok: 0, porque: "Locke (1632–1704) es anterior a Rousseau (1712–1778)." },
        { q: "¿Cuál de estas afirmaciones sobre el Emilio es FALSA?", op: ["Propone dejar al niño hacer siempre lo que quiera", "Propone respetar las etapas del desarrollo", "Es una novela pedagógica", "Defiende aprender por la experiencia"], ok: 0, porque: "Pide guía sin imposición, no ausencia de guía." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Rousseau y la Ilustración",
      cartas: [
        { a: "Ilustración", b: "Movimiento del siglo XVIII basado en la razón crítica, el progreso y la tolerancia." },
        { a: "Sapere aude", b: "«Atrévete a saber». Lema de la Ilustración según Kant." },
        { a: "Enciclopedia", b: "Obra dirigida por Diderot y D'Alembert (1751–1772) para divulgar el saber." },
        { a: "Despotismo ilustrado", b: "«Todo para el pueblo, pero sin el pueblo»: reformas desde una monarquía absoluta." },
        { a: "Estado de naturaleza (Rousseau)", b: "Hipótesis del ser humano antes de la sociedad: libre, aislado y amoral." },
        { a: "Amor de sí", b: "Impulso natural de conservarse; sano." },
        { a: "Amor propio", b: "Afán social de compararse y estar por encima de los demás; origen del mal." },
        { a: "Piedad", b: "Rechazo natural a ver sufrir a otro." },
        { a: "Perfectibilidad", b: "Capacidad humana de mejorar, que saca al ser humano del estado de naturaleza." },
        { a: "Propiedad privada", b: "Para Rousseau, origen de la sociedad civil desigual (Discurso de 1755)." },
        { a: "Contrato social", b: "Pacto por el que cada uno se entrega a la comunidad entera para ser libre bajo leyes." },
        { a: "Voluntad general", b: "La que busca el bien común; se expresa en la ley." },
        { a: "Voluntad de todos", b: "La suma de intereses particulares; no es la voluntad general." },
        { a: "Soberanía popular", b: "El poder pertenece al pueblo; es inalienable e indivisible." },
        { a: "Educación negativa", b: "Proteger al niño de lo que lo desvía y respetar sus etapas (Emilio)." }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  var N = [];
  var cuenta = 0;
  // En las opciones, la primera es la correcta; se rota para que no sea siempre la misma posición.
  function rotar(ops) {
    var k = (cuenta++) % ops.length;
    return { ops: ops.slice(k).concat(ops.slice(0, k)), ok: (ops.length - k) % ops.length };
  }
  function O(id, nv, enun, ops, pasos, res, et) {
    var r = rotar(ops);
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "opcion", etiqueta: et || "Tu respuesta", opciones: r.ops, ok: r.ok }, pasos: pasos, resultado: res || ops[0] });
  }
  function M(id, nv, enun, campos, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: campos, pasos: pasos, resultado: res });
  }
  function C(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var VF = ["Verdadero", "Falso"];
  function V(id, nv, enun, ver, justif, pasos) {
    var r = rotar(justif);
    N.push({ id: id, nivel: nv, enunciado: enun,
      check: [C("¿Verdadero o falso?", VF, ver ? 0 : 1), C("Justificación", r.ops, r.ok)], pasos: pasos, resultado: (ver ? "Verdadero: " : "Falso: ") + justif[0] });
  }
  function T(id, nv, enun, et, valores, pasos, res) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "texto", etiqueta: et, valores: valores }, pasos: pasos, resultado: res });
  }
  function R(id, enun, filas, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("ro1", 1, "¿Dónde nació Rousseau?", ["Ginebra", "París", "Roma", "Königsberg"],
    ["Nació en Ginebra en 1712 y murió en 1778."]);
  O("ro2", 1, "¿En qué año se publicaron <i>Del contrato social</i> y el <i>Emilio</i>?", ["1762", "1750", "1789", "1651"],
    ["Ambos son de 1762 y fueron condenados ese mismo año."]);
  O("ro3", 1, "El lema ilustrado «sapere aude» significa…", ["atrévete a saber", "conócete a ti mismo", "pienso, luego existo", "todo fluye"],
    ["Lo popularizó Kant en <i>¿Qué es la Ilustración?</i> (1784)."]);
  T("ro4", 1, "Completa: Rousseau distingue la voluntad de todos de la voluntad ______.", "Término =", ["general"],
    ["La voluntad general busca el bien común."], "general");
  O("ro5", 1, "¿Cuál es la obra pedagógica de Rousseau?", ["Emilio", "Del contrato social", "El espíritu de las leyes", "Leviatán"],
    ["<i>Emilio, o De la educación</i> (1762)."]);
  M("ro6", 1, "Empareja cada obra con su año.", [
    C("Discurso sobre las ciencias y las artes", ["1750", "1755", "1762"], 0),
    C("Discurso sobre el origen de la desigualdad", ["1750", "1755", "1762"], 1),
    C("Del contrato social", ["1750", "1755", "1762"], 2),
    C("Emilio", ["1750", "1755", "1762"], 2)],
    ["Primer Discurso: 1750; segundo: 1755; Contrato y Emilio: 1762."], "1750, 1755, 1762, 1762");
  O("ro7", 1, "¿Quiénes dirigieron la <i>Enciclopedia</i>?", ["Diderot y D'Alembert", "Voltaire y Rousseau", "Locke y Hume", "Kant y Hegel"],
    ["Se publicó entre 1751 y 1772."]);
  M("ro8", 1, "Clasifica cada situación como amor de sí, amor propio o piedad.", [
    C("Comer porque tengo hambre", ["Amor de sí", "Amor propio", "Piedad"], 0),
    C("Querer tener más que los demás", ["Amor de sí", "Amor propio", "Piedad"], 1),
    C("Me duele ver sufrir a otro", ["Amor de sí", "Amor propio", "Piedad"], 2)],
    ["Amor de sí = conservarse; amor propio = compararse; piedad = compasión natural."], "Amor de sí, amor propio, piedad");
  T("ro9", 1, "Completa: la capacidad humana de mejorar, que saca al ser humano del estado de naturaleza, es la ______.", "Término =", ["perfectibilidad"],
    ["Puede llevar al progreso y también a la corrupción."], "perfectibilidad");
  O("ro10", 1, "¿Quién defendió la separación de poderes en <i>El espíritu de las leyes</i> (1748)?", ["Montesquieu", "Rousseau", "Voltaire", "Hobbes"],
    ["Rousseau, en cambio, defiende una soberanía indivisible."]);
  O("ro11", 1, "Para Rousseau, el soberano es…", ["el pueblo", "el rey", "el Parlamento", "los filósofos"],
    ["Soberanía popular, inalienable e indivisible."]);
  O("ro12", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Locke → Rousseau → Kant", "Rousseau → Locke → Kant", "Kant → Rousseau → Locke", "Locke → Kant → Rousseau"],
    ["Locke (1632), Rousseau (1712), Kant (1724)."], "Locke → Rousseau → Kant");
  O("ro13", 1, "¿Con qué obra ganó Rousseau el premio de la Academia de Dijon?", ["Discurso sobre las ciencias y las artes", "Del contrato social", "Emilio", "Confesiones"],
    ["Fue en 1750 y lo hizo famoso."]);
  T("ro14", 1, "Completa: en el contrato social, cada uno cede sus derechos a la ______ entera.", "Término =", ["comunidad"],
    ["No a un rey, sino a la comunidad de la que forma parte."], "comunidad");

  // ---- nivel 2
  V("ro15", 2, "«Rousseau presenta el estado de naturaleza como una época histórica comprobada.»", false, [
    "Es falso: es una hipótesis para pensar, que quizá nunca existió", "Es falso: no existe estado de naturaleza en ningún sentido", "Es verdad: lo documentó con textos antiguos", "Es verdad: coincide con la Edad Media"],
    ["Experimento mental para separar lo natural de lo social."]);
  V("ro16", 2, "«El ser humano natural de Rousseau es amoral: ni bueno ni malo en sentido moral.»", true, [
    "Es verdad: no tiene motivos para el mal, pero la virtud aparece con la sociedad y la razón", "Es verdad: porque es perverso por naturaleza", "Es verdad: porque ya conoce el deber", "Es verdad: porque vive en guerra permanente"],
    ["Bueno por ausencia de maldad, no por elegir el bien."]);
  V("ro17", 2, "«El amor propio es un impulso natural que existe antes de toda sociedad.»", false, [
    "Es falso: nace en sociedad, al compararse con los demás", "Es falso: no tiene nada que ver con la comparación", "Es verdad: es el instinto de conservación", "Es verdad: aparece en el estado de naturaleza"],
    ["El natural es el amor de sí."]);
  V("ro18", 2, "«Para Rousseau, la propiedad privada está en el origen de la sociedad civil desigual.»", true, [
    "Es verdad: el primero que cercó un terreno y dijo «esto es mío» fundó la sociedad civil", "Es verdad: porque la propiedad es un derecho natural intocable", "Es verdad: porque elimina la rivalidad", "Es verdad: porque la inventó el Estado de naturaleza"],
    ["Discurso sobre la desigualdad, segunda parte."]);
  V("ro19", 2, "«La voluntad general es la suma de las voluntades particulares de todos los ciudadanos.»", false, [
    "Es falso: esa suma es la voluntad de todos; la general busca el bien común", "Es falso: la voluntad general es la del rey", "Es verdad: se calcula sumando los votos", "Es verdad: coincide con la voluntad de la mayoría"],
    ["No se calcula por suma de intereses."]);
  V("ro20", 2, "«Rousseau defiende repartir la soberanía entre varios poderes independientes.»", false, [
    "Es falso: la soberanía popular es indivisible", "Es falso: no cree en la soberanía", "Es verdad: igual que Montesquieu", "Es verdad: ese es el mensaje del Emilio"],
    ["La división de poderes es de Montesquieu y Locke."]);
  V("ro21", 2, "«El Emilio propone respetar el ritmo natural del desarrollo infantil.»", true, [
    "Es verdad: es una educación natural, que protege y no impone", "Es verdad: porque el niño debe aprender solo a memorizar", "Es verdad: porque se suprime toda guía del adulto", "Es verdad: porque se educa para ser rey"],
    ["Educación negativa: evitar lo que corrompe."]);
  O("ro22", 2, "¿A quién ceden sus derechos los individuos en el pacto de Rousseau?",
    ["A la comunidad entera, de la que ellos mismos forman parte", "A un soberano absoluto", "A un parlamento con poder limitado", "A la Iglesia"],
    ["Hobbes cede a un soberano; Locke a un gobierno limitado."]);
  O("ro23", 2, "¿En qué se diferencia Rousseau de Hobbes?",
    ["En que el poder no se cede a un soberano, sino a la comunidad, y se conserva la libertad", "En que Rousseau cree en la guerra de todos contra todos", "En que Hobbes defiende la soberanía popular", "En que no hay diferencia"],
    ["Hobbes: soberano absoluto por seguridad; Rousseau: soberanía del pueblo."]);
  O("ro24", 2, "¿Qué opina Rousseau de la representación política?",
    ["Que el pueblo solo es libre al elegir y luego deja de serlo", "Que es la mejor forma de democracia", "Que garantiza la voluntad general", "Que debe ser vitalicia"],
    ["Prefiere la democracia directa en Estados pequeños."]);
  O("ro25", 2, "¿Qué respondió Rousseau en 1750 a la pregunta de la Academia de Dijon?",
    ["Que el progreso de las ciencias y las artes no ha mejorado las costumbres", "Que las ha depurado por completo", "Que hay que quemar los libros", "Que no sabe contestar"],
    ["Era una respuesta inesperada."]);
  O("ro26", 2, "La libertad civil es…",
    ["vivir bajo leyes que protegen a todos por igual", "hacer lo que uno puede sin límite", "obedecer a un rey sabio", "no tener ninguna ley"],
    ["La libertad natural se pierde; se gana la civil y la moral."]);
  O("ro27", 2, "El lema del despotismo ilustrado «todo para el pueblo, pero sin el pueblo» significa…",
    ["reformas desde el poder, sin dar participación al pueblo", "soberanía popular directa", "revolución contra el rey", "vuelta a la naturaleza"],
    ["Rousseau va más lejos: el pueblo es soberano."]);
  O("ro28", 2, "¿Con qué otro gran ilustrado coincide Rousseau en el año de su muerte (1778)?",
    ["Voltaire", "Diderot", "Locke", "Kant"],
    ["Voltaire (1694–1778) y Rousseau murieron el mismo año."]);
  O("ro29", 2, "Para Kant, la «minoría de edad» que supera la Ilustración es…",
    ["la incapacidad de usar el propio entendimiento sin la guía de otro", "tener menos de dieciocho años", "no tener estudios", "no ser rico"],
    ["Su causa es la falta de decisión y valor, no de inteligencia."]);
  O("ro30", 2, "¿Cuál de estas es una desigualdad natural o física, según Rousseau?",
    ["La diferencia de edad o de fuerza", "La diferencia de riqueza", "Los honores", "El poder político"],
    ["Las desigualdades de riqueza, honores y poder son morales o políticas: dependen de convenciones."]);
  O("ro31", 2, "La «educación negativa» del Emilio consiste en…",
    ["proteger al niño de lo que lo desvía en lugar de llenarlo de ideas ajenas", "prohibirle todo", "castigarlo siempre", "no educarlo"],
    ["Educación negativa no es ausencia de educación."]);

  // ---- nivel 3
  O("ro32", 3, "Texto: «El hombre ha nacido libre, y sin embargo, en todas partes se encuentra encadenado» (<i>Del contrato social</i>, I, 1; traducción habitual). Su idea principal es…",
    ["que la libertad natural contrasta con la falta de libertad en las sociedades reales", "que el ser humano es esclavo por naturaleza", "que debemos volver al bosque", "que las cadenas son físicas"],
    ["Plantea el problema que el contrato quiere resolver."]);
  O("ro33", 3, "Texto: «El primero a quien, habiendo cercado un terreno, se le ocurrió decir <i>esto es mío</i>… fue el verdadero fundador de la sociedad civil» (<i>Discurso sobre la desigualdad</i>; traducción habitual). Su idea principal es…",
    ["que la propiedad privada está en el origen de la sociedad civil desigual", "que la propiedad es un derecho natural sagrado", "que la sociedad nace del amor", "que el cercado protege a los débiles"],
    ["Crítica a la propiedad como origen de la desigualdad moral y política."]);
  O("ro34", 3, "Una alumna afirma: «la voluntad general es lo que vota la mayoría». ¿Qué matiz es el correcto?",
    ["La mayoría puede votar por intereses particulares; la voluntad general mira al bien común", "Tiene razón: son lo mismo", "La voluntad general es la del monarca", "La mayoría nunca puede equivocarse"],
    ["Voluntad de todos ≠ voluntad general."]);
  O("ro35", 3, "¿Qué significa «forzado a ser libre»?",
    ["Que obedecer la ley que expresa la voluntad general es obedecerse a sí mismo como ciudadano", "Que el Estado puede obligar a cualquiera a lo que sea", "Que la libertad es una ilusión", "Que hay que obedecer al rey"],
    ["Idea de autonomía; el riesgo está en quién interpreta la voluntad general."]);
  O("ro36", 3, "¿Qué idea de Rousseau recoge Kant en su ética?",
    ["La autonomía: darse uno mismo la ley", "El estado de naturaleza", "El buen salvaje", "La educación negativa"],
    ["Obedecer la ley que uno se ha dado es libertad."]);
  var ops37 = ["Soberano absoluto por seguridad", "Gobierno limitado y derechos naturales", "Soberanía popular inalienable", "Separación de poderes", "Tolerancia y crítica del fanatismo"];
  M("ro37", 3, "Empareja cada autor con su idea.", [
    C("Hobbes", ops37, 0), C("Locke", ops37, 1), C("Rousseau", ops37, 2), C("Montesquieu", ops37, 3), C("Voltaire", ops37, 4)],
    ["Cada autor, una idea política distinta."], "Hobbes, Locke, Rousseau, Montesquieu, Voltaire");
  var ops38 = ["Hacer lo que uno puede, con el único límite de su fuerza", "Vivir bajo leyes que protegen a todos por igual", "Obedecer la ley que uno mismo se ha dado"];
  M("ro38", 3, "Empareja cada tipo de libertad con su definición.", [
    C("Libertad natural", ops38, 0), C("Libertad civil", ops38, 1), C("Libertad moral", ops38, 2)],
    ["La natural se pierde con el pacto; la civil y la moral se ganan."], "natural, civil, moral");
  O("ro39", 3, "¿En qué discrepa Rousseau del resto de ilustrados como Voltaire?",
    ["En que duda de que el progreso de la civilización haya mejorado moralmente a las personas", "En que rechaza la razón", "En que defiende el despotismo ilustrado", "En que apoya la Enciclopedia sin matices"],
    ["Comparte los ideales de razón y libertad, pero critica el progreso."]);
  R("ro40", "Explica la crítica de Rousseau a la civilización: estado de naturaleza, amor de sí y amor propio, y origen de la desigualdad. Valórala críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Presenta el estado de naturaleza como hipótesis: ser humano libre, amoral, con amor de sí y piedad", p: 0.5 },
    { t: "Distingue amor de sí y amor propio, y dice dónde nace el mal", p: 0.4 },
    { t: "Explica el origen de la desigualdad: propiedad privada y pacto engañoso de los ricos", p: 0.4 },
    { t: "Menciona el Discurso de 1750 y su tesis sobre el progreso moral", p: 0.3 },
    { t: "Valora (no propone volver a la naturaleza; paradoja del ilustrado)", p: 0.4 }],
    ["Estado de naturaleza.", "Amor de sí y amor propio.", "Propiedad y desigualdad.", "Discurso de 1750.", "Valoración."], "La sociedad, no la naturaleza, produce el mal");
  R("ro41", "Explica el contrato social y la voluntad general en Rousseau, y compáralos con Hobbes o Locke. (Pregunta tipo PAU)", 9, [
    { t: "Plantea el problema: vivir en sociedad sin perder la libertad", p: 0.3 },
    { t: "Explica el pacto: cesión a la comunidad entera, no a un gobernante", p: 0.4 },
    { t: "Define voluntad general y la distingue de la voluntad de todos", p: 0.5 },
    { t: "Soberanía popular inalienable e indivisible; crítica a la representación", p: 0.4 },
    { t: "Compara con Hobbes o Locke con diferencias precisas", p: 0.4 }],
    ["Problema.", "Pacto.", "Voluntad general.", "Soberanía.", "Comparación."], "Pacto con la comunidad; voluntad general = bien común");
  R("ro42", "Explica la propuesta pedagógica del <i>Emilio</i> y relaciónala con la idea de ser humano de Rousseau. (Pregunta tipo PAU)", 8, [
    { t: "Relaciona la educación con la bondad natural y la corrupción social", p: 0.5 },
    { t: "Explica la educación negativa y el respeto de las etapas", p: 0.5 },
    { t: "Aprender por experiencia y consecuencias (ejemplo)", p: 0.3 },
    { t: "Religión natural y conciencia (vicario saboyano)", p: 0.3 },
    { t: "Valora su influencia y sus límites (visión de la mujer)", p: 0.4 }],
    ["Bondad natural.", "Educación negativa.", "Experiencia.", "Religión natural.", "Valoración."], "Educación natural y negativa");
  R("ro43", "Explica qué es la Ilustración y sitúa en ella a Rousseau: coincidencias y diferencias con otros ilustrados. (Pregunta tipo PAU)", 8, [
    { t: "Define la Ilustración: razón crítica, progreso, tolerancia (siglo XVIII)", p: 0.5 },
    { t: "Explica «sapere aude» y la minoría de edad (Kant, 1784)", p: 0.4 },
    { t: "Menciona la Enciclopedia y autores (Diderot, Voltaire, Montesquieu)", p: 0.3 },
    { t: "Señala la paradoja de Rousseau: confianza en la razón crítica pero crítica al progreso", p: 0.5 },
    { t: "Concluye con su herencia (Revolución Francesa, Kant)", p: 0.3 }],
    ["Definición.", "Sapere aude.", "Enciclopedia.", "Paradoja.", "Herencia."], "Razón crítica y progreso; Rousseau cuestiona el progreso moral");
  R("ro44", "Comenta este texto: «Encontrar una forma de asociación que defienda y proteja con toda la fuerza común la persona y los bienes de cada asociado, y por la cual cada uno, uniéndose a todos, no obedezca sin embargo sino a sí mismo y permanezca tan libre como antes» (Rousseau, <i>Del contrato social</i>, I, 6; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el problema fundamental de la política (sociedad y libertad)", p: 0.3 },
    { t: "Idea principal: asociación que protege y deja a cada uno libre porque solo se obedece a sí mismo", p: 0.4 },
    { t: "Aclara términos: asociación, fuerza común, uniéndose a todos, voluntad general", p: 0.4 },
    { t: "Relaciona con el autor: crítica a la civilización, contrato, soberanía popular", p: 0.5 },
    { t: "Compara con Hobbes, Locke o Kant", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario del problema del contrato");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Hobbes, Locke y Rousseau", ancha: true,
      tabla: { cab: ["", "Hobbes", "Locke", "Rousseau"], filas: [
        ["Estado de naturaleza", "guerra de todos", "libre e igual, inseguro", "libre y pacífico"],
        ["Pacto", "al soberano absoluto", "al gobierno limitado", "a la comunidad"],
        ["Soberano", "el monarca", "Parlamento / pueblo", "el pueblo"]
      ] } },
    { titulo: "Amor de sí y amor propio", ancha: true,
      tabla: { cab: ["Amor de sí", "Amor propio"], filas: [
        ["natural", "social"],
        ["conservarse", "compararse"],
        ["sano", "envidia y vanidad"]
      ] } },
    { titulo: "Las tres voluntades", ancha: true,
      tabla: { cab: ["Voluntad", "Qué busca"], filas: [
        ["particular", "lo que conviene a uno"],
        ["de todos", "suma de intereses"],
        ["general", "el bien común"]
      ] } },
    { titulo: "Historia de la desigualdad",
      pasos: ["Estado de naturaleza.", "Primeras sociedades.", "Propiedad privada.", "Pacto engañoso de los ricos.", "Despotismo."],
      nota: "El contrato social propone una sociedad justa." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Rousseau propone volver a la naturaleza", bien: "Propone una sociedad justa (contrato) y una educación natural", por: "El estado de naturaleza es una hipótesis." },
        { mal: "La voluntad general es la suma de los deseos de todos", bien: "Es lo que busca el bien común", por: "La suma es la voluntad de todos." },
        { mal: "El pacto cede el poder a un rey", bien: "Se cede a la comunidad entera", por: "Eso es Hobbes." },
        { mal: "Rousseau rechaza la razón", bien: "Usa la razón crítica y cuestiona el progreso moral", por: "Es un ilustrado paradójico." }
      ] }
  ];

  B.registrar("historia_fil", "t11", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf11a.secciones,
    nuevas: B.parte.hf11a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
