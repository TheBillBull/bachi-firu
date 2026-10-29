/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 15 (parte B): Fenomenología y existencialismo
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t15.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Husserl (1859–1938) funda la <b>fenomenología</b>: describir los fenómenos tal como aparecen; la conciencia es <b>intencional</b> (siempre de algo).",
    "Heidegger (1889–1976) pregunta por el <b>sentido del ser</b> desde el <b>Dasein</b>, que es ser-en-el-mundo y <b>ser-para-la-muerte</b>.",
    "Sartre (1905–1980): <b>la existencia precede a la esencia</b>; estamos <b>condenados a ser libres</b>, con angustia y riesgo de mala fe.",
    "Beauvoir aplica esa idea a la mujer; Camus parte del <b>absurdo</b> y propone la <b>rebeldía</b>."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Fenomenología y existencialismo · siglo XX",
    autores: [
      { n: "Husserl", f: "1859–1938", l: "Prossnitz (Moravia); Friburgo" },
      { n: "Heidegger", f: "1889–1976", l: "Messkirch; Friburgo" },
      { n: "Sartre", f: "1905–1980", l: "París" },
      { n: "Beauvoir", f: "1908–1986", l: "París" },
      { n: "Camus", f: "1913–1960", l: "Mondovi (Argelia)" }
    ],
    obras: ["Investigaciones lógicas", "Ser y tiempo", "El ser y la nada", "El existencialismo es un humanismo", "El segundo sexo", "El mito de Sísifo"],
    bloques: [
      { t: "Contexto", frases: ["Dos guerras mundiales y el Holocausto rompen la fe en el progreso.", "Parten de la existencia concreta, no de sistemas abstractos.", "Precedentes: Kierkegaard (1813–1855) y Nietzsche."] },
      { t: "Husserl: fenomenología", frases: ["Lema: «volver a las cosas mismas».", "<b>Epojé</b>: poner entre paréntesis las teorías previas.", "<b>Intencionalidad</b>: toda conciencia es conciencia de algo."],
        tabla: { cab: ["Idea", "Qué dice"], filas: [["epojé", "suspender teorías, no negar el mundo"], ["intencionalidad", "la conciencia es apertura al mundo"]] } },
      { t: "Heidegger: Dasein", frases: ["Pregunta por el sentido del <b>ser</b> (<i>Ser y tiempo</i>, 1927).", "<b>Dasein</b> = ser-ahí: el ser humano, ser-en-el-mundo.", "<b>Ser-para-la-muerte</b>: asumir la finitud abre la vida auténtica."],
        tabla: { cab: ["Inauténtica", "Auténtica"], filas: [["vive en el «uno»", "asume sus posibilidades"], ["evita la muerte", "asume la finitud"]] } },
      { t: "Sartre: existencia y esencia", frases: ["<b>La existencia precede a la esencia</b>: no hay naturaleza humana previa.", "El cortapapeles tiene esencia antes; el ser humano se hace con sus actos.", "Ser en sí (cosas) frente a ser para sí (conciencia)."],
        tabla: { cab: ["Objeto fabricado", "Ser humano"], filas: [["esencia primero", "existencia primero"], ["función fija", "se hace con sus actos"]] } },
      { t: "Libertad, angustia y mala fe", frases: ["<b>Condenado a ser libre</b>: no puede dejar de elegir.", "<b>Angustia</b>: vértigo ante la propia responsabilidad (no es miedo).", "<b>Mala fe</b>: autoengaño para negar la libertad («yo soy así»)."] },
      { t: "Beauvoir y Camus", frases: ["Beauvoir: «no se nace mujer, se llega a serlo» (<i>El segundo sexo</i>, 1949).", "Camus: el <b>absurdo</b> es el choque entre exigencia de sentido y silencio del mundo.", "Su respuesta es la <b>rebeldía</b> lúcida: Sísifo feliz."] }
    ],
    resumen: [
      "Husserl da el <b>método</b>: describir la experiencia y su <b>intencionalidad</b>.",
      "Heidegger lo aplica al <b>Dasein</b>: finito, ser-en-el-mundo, auténtico o inauténtico.",
      "Sartre radicaliza: sin esencia previa somos <b>libres y responsables</b>; la mala fe es huir de ello.",
      "Beauvoir y Camus aplican la idea al <b>género</b> y al <b>absurdo</b>."
    ],
    conecta: [
      { con: "Descartes (T9):", rel: "frente a su yo aislado, la conciencia es intencional y está en el mundo." },
      { con: "Kant (T12):", rel: "Sartre rechaza una ley moral dada: la libertad crea los valores." },
      { con: "Marx (T13):", rel: "frente al peso de las condiciones materiales, Sartre subraya la libertad." },
      { con: "Nietzsche (T14):", rel: "comparte la «muerte de Dios» y la tarea de crear valores." },
      { con: "Ortega (T16):", rel: "la vida como proyecto en una circunstancia, cercano a la «situación»." }
    ],
    claves: [
      ["Fenomenología", "describir los fenómenos tal como aparecen a la conciencia"],
      ["Epojé", "poner entre paréntesis las teorías previas sobre la realidad"],
      ["Intencionalidad", "toda conciencia es conciencia de algo"],
      ["Dasein", "el ser humano como «ser-ahí»; ser-en-el-mundo"],
      ["Ser-para-la-muerte", "asumir la propia finitud permite la existencia auténtica"],
      ["Existencia precede a esencia", "el ser humano no tiene naturaleza previa: se hace con sus actos"],
      ["Libertad", "condenados a elegir y responsables de lo que hacemos"],
      ["Angustia", "vértigo ante la propia libertad y responsabilidad"],
      ["Mala fe", "autoengaño por el que negamos que somos libres"],
      ["Absurdo", "choque entre la exigencia de sentido y el silencio del mundo (Camus)"]
    ],
    cita: { txt: "El hombre está condenado a ser libre.", autor: "Sartre", obra: "El existencialismo es un humanismo (1946; traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    obras: {
      titulo: "Obra y autor",
      consigna: "Une cada obra con su autor o autora.",
      pares: [["Investigaciones lógicas", "Husserl"], ["Ser y tiempo", "Heidegger"], ["El ser y la nada", "Sartre"], ["El segundo sexo", "Beauvoir"], ["El mito de Sísifo", "Camus"]]
    },
    esencia: {
      titulo: "¿Qué va primero: esencia o existencia?",
      consigna: "Toca cada elemento y después el lugar que ocupa, según Sartre.",
      categorias: ["La esencia precede a la existencia", "La existencia precede a la esencia"],
      items: [
        { t: "Un cortapapeles", c: 0 },
        { t: "Un reloj de pulsera", c: 0 },
        { t: "Una mesa hecha por un carpintero", c: 0 },
        { t: "Un cuchillo de cocina", c: 0 },
        { t: "Una persona cualquiera", c: 1 },
        { t: "Alguien que se vuelve valiente con sus actos", c: 1 },
        { t: "Tú, que te defines por lo que eliges", c: 1 },
        { t: "Un ser humano arrojado al mundo", c: 1 }
      ]
    },
    malafe: {
      titulo: "¿Mala fe o autenticidad?",
      consigna: "Clasifica cada actitud según Sartre.",
      categorias: ["Mala fe (autoengaño)", "Autenticidad (asumir la libertad)"],
      items: [
        { t: "«Yo soy así, no puedo cambiar»", c: 0 },
        { t: "«No tenía otra opción»", c: 0 },
        { t: "«Es mi destino»", c: 0 },
        { t: "El camarero que cree ser «solo» camarero", c: 0 },
        { t: "«Lo he decidido yo y me hago responsable»", c: 1 },
        { t: "Reconocer que podría haber elegido otra cosa", c: 1 },
        { t: "Asumir las consecuencias de mis actos sin excusas", c: 1 },
        { t: "Aceptar la angustia de tener que elegir", c: 1 }
      ]
    },
    cronologia: {
      titulo: "Orden de nacimiento",
      consigna: "Ordena a los autores del más antiguo al más reciente según su año de nacimiento.",
      items: [
        { t: "Kierkegaard (1813)" },
        { t: "Husserl (1859)" },
        { t: "Heidegger (1889)" },
        { t: "Sartre (1905)" },
        { t: "Beauvoir (1908)" },
        { t: "Camus (1913)" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 15",
      preguntas: [
        { q: "Husserl funda…", op: ["la fenomenología", "el psicoanálisis", "el positivismo", "el empirismo"], ok: 0, porque: "Método para describir los fenómenos tal como aparecen a la conciencia." },
        { q: "La intencionalidad significa que…", op: ["toda conciencia es conciencia de algo", "todo acto se hace con una intención", "la conciencia crea el mundo", "pensar es hablar"], ok: 0, porque: "«Intencional» es «dirigido hacia», no «voluntario»." },
        { q: "La epojé consiste en…", op: ["poner entre paréntesis las teorías previas", "negar que el mundo exista", "dudar de todo como Descartes", "aceptar las teorías científicas"], ok: 0, porque: "Es un método de descripción, no una negación del mundo." },
        { q: "Dasein significa…", op: ["ser-ahí (el ser humano)", "Dios", "la materia", "el pensamiento puro"], ok: 0, porque: "Heidegger lo usa para el ente que se pregunta por su ser." },
        { q: "Para Heidegger, vivir de forma inauténtica es…", op: ["vivir diluido en el «uno»", "vivir mintiendo a todos", "no tener cuerpo", "no morir nunca"], ok: 0, porque: "Hacer y pensar lo que «se» hace y «se» piensa." },
        { q: "«La existencia precede a la esencia» significa que el ser humano…", op: ["primero existe y luego se hace con sus actos", "tiene una naturaleza fija desde el nacimiento", "es diseñado por Dios", "es solo materia"], ok: 0, porque: "No hay naturaleza humana previa." },
        { q: "¿Qué es la mala fe para Sartre?", op: ["autoengaño para negar la propia libertad", "mentir a los demás", "no creer en Dios", "una virtud"], ok: 0, porque: "Es mentirse a uno mismo («yo soy así»)." },
        { q: "La angustia, para Sartre, es…", op: ["el vértigo ante la propia libertad y responsabilidad", "miedo a un peligro concreto", "tristeza por la muerte", "una enfermedad"], ok: 0, porque: "El miedo tiene objeto; la angustia es ante uno mismo." },
        { q: "«No se nace mujer, se llega a serlo» es de…", op: ["Beauvoir", "Camus", "Sartre", "Husserl"], ok: 0, porque: "Abre el segundo tomo de <i>El segundo sexo</i> (1949)." },
        { q: "Para Camus, el absurdo nace…", op: ["del choque entre la búsqueda de sentido y el silencio del mundo", "de la maldad humana", "de la ciencia", "del trabajo"], ok: 0, porque: "No está solo en el mundo ni solo en la persona." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Husserl es FALSA?", op: ["La epojé consiste en negar que el mundo exista", "Su lema es volver a las cosas mismas", "La conciencia es intencional", "Fundó la fenomenología"], ok: 0, porque: "La epojé suspende teorías previas, no niega el mundo." },
        { q: "¿Cuál de estas afirmaciones sobre la intencionalidad es FALSA?", op: ["Significa que todo se hace con intención o voluntad", "Toda conciencia es conciencia de algo", "Percibir y recordar son actos intencionales", "Rompe con el yo aislado de Descartes"], ok: 0, porque: "«Intencional» es «dirigido a un objeto», no «voluntario»." },
        { q: "¿Cuál de estas afirmaciones sobre Heidegger es FALSA?", op: ["Ser-para-la-muerte significa desear morir", "El Dasein es ser-en-el-mundo", "Escribió Ser y tiempo", "La existencia inauténtica es la del «uno»"], ok: 0, porque: "Es asumir la finitud como parte de lo que somos." },
        { q: "¿Cuál de estas afirmaciones sobre Sartre es FALSA?", op: ["Ser libre es poder hacer cualquier cosa sin límites", "El ser humano está condenado a ser libre", "La existencia precede a la esencia", "Elegir compromete a toda la humanidad"], ok: 0, porque: "Hay situación; lo libre es qué hacer con ella." },
        { q: "¿Cuál de estas afirmaciones sobre la angustia es FALSA?", op: ["Es lo mismo que el miedo a un peligro concreto", "Es el vértigo ante la propia libertad", "Aparece porque no hay excusas", "Se vive, no se elimina"], ok: 0, porque: "El miedo tiene objeto; la angustia es ante uno mismo." },
        { q: "¿Cuál de estas afirmaciones sobre la mala fe es FALSA?", op: ["Es mentir a otra persona", "Es un autoengaño", "Una frase típica es «yo soy así»", "El camarero de café es un ejemplo"], ok: 0, porque: "La mala fe es mentirse a uno mismo." },
        { q: "¿Cuál de estas afirmaciones sobre Beauvoir es FALSA?", op: ["Niega que existan diferencias biológicas entre hombres y mujeres", "Escribió El segundo sexo", "El «ser mujer» social es en gran parte una construcción", "Aplica el existencialismo a la condición femenina"], ok: 0, porque: "Dice que la biología no es destino, no que no exista." },
        { q: "¿Cuál de estas afirmaciones sobre Camus es FALSA?", op: ["Propone el suicidio como respuesta al absurdo", "Escribió El mito de Sísifo", "Rechazaba la etiqueta de existencialista", "Propone la rebeldía lúcida"], ok: 0, porque: "Rechaza el suicidio y el salto de fe." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: fenomenología y existencialismo",
      cartas: [
        { a: "Fenomenología", b: "Método de Husserl: describir los fenómenos tal como aparecen a la conciencia («volver a las cosas mismas»)." },
        { a: "Epojé", b: "Poner entre paréntesis las teorías previas sobre la realidad, sin negar el mundo." },
        { a: "Intencionalidad", b: "Toda conciencia es conciencia de algo: está dirigida a un objeto." },
        { a: "Mundo de la vida", b: "El mundo vivido antes de cualquier ciencia (<i>Lebenswelt</i>)." },
        { a: "Dasein", b: "Heidegger: el ser humano como «ser-ahí», el ente que se pregunta por su ser." },
        { a: "Ser-en-el-mundo", b: "El Dasein siempre está ya en un mundo de cosas, personas y significados." },
        { a: "El «uno» (das Man)", b: "Modo anónimo de vivir: hacer y pensar lo que «se» hace y «se» piensa." },
        { a: "Ser-para-la-muerte", b: "La muerte es mi posibilidad más propia; asumirla abre la existencia auténtica." },
        { a: "Existencia precede a esencia", b: "Sartre: el ser humano no tiene naturaleza previa; se hace con sus actos." },
        { a: "Ser en sí / ser para sí", b: "En sí: las cosas, que son lo que son. Para sí: la conciencia, abierta y libre." },
        { a: "Condenado a ser libre", b: "No ha elegido existir y no puede dejar de elegir; es responsable de todo lo que hace." },
        { a: "Angustia", b: "Vértigo ante la propia libertad y responsabilidad (no es miedo)." },
        { a: "Mala fe", b: "Autoengaño por el que me hago creer que no soy libre («yo soy así»)." },
        { a: "Autenticidad", b: "Asumir la libertad y la responsabilidad sin excusas." },
        { a: "El género (Beauvoir)", b: "«No se nace mujer, se llega a serlo»: el ser mujer social es una construcción." },
        { a: "Absurdo (Camus)", b: "Choque entre la exigencia humana de sentido y el silencio del mundo; respuesta: rebeldía." }
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
  O("fe1", 1, "¿Quién fundó la fenomenología?", ["Husserl", "Heidegger", "Sartre", "Camus"], 0,
    ["Edmund Husserl (1859–1938) la funda con las <i>Investigaciones lógicas</i> (1900–1901)."]);
  O("fe2", 1, "El lema de la fenomenología es…", ["«volver a las cosas mismas»", "«pienso, luego existo»", "«conócete a ti mismo»", "«Dios ha muerto»"], 0,
    ["«A las cosas mismas»: describir la experiencia tal como se vive."]);
  T("fe3", 1, "Completa: el rasgo por el que toda conciencia es conciencia de algo se llama ______.", "Término =", ["intencionalidad"],
    ["Lo toma de Brentano y lo desarrolla Husserl."], "intencionalidad");
  O("fe4", 1, "¿Qué significa «Dasein» en Heidegger?", ["ser-ahí (el ser humano)", "Dios", "materia", "mundo de las Ideas"], 0,
    ["Es el ente que se pregunta por su propio ser."]);
  O("fe5", 1, "La obra principal de Heidegger es…", ["Ser y tiempo", "El ser y la nada", "El segundo sexo", "El mito de Sísifo"], 0,
    ["<i>Ser y tiempo</i> (1927). <i>El ser y la nada</i> es de Sartre (1943)."]);
  O("fe6", 1, "¿Quién sostiene que «la existencia precede a la esencia»?", ["Sartre", "Husserl", "Platón", "Aristóteles"], 0,
    ["Es la tesis central del existencialismo de Sartre."]);
  T("fe7", 1, "Completa: según Sartre, el ser humano está condenado a ser ______.", "Término =", ["libre"],
    ["Condenado porque no eligió existir; libre porque es responsable de lo que hace."], "libre");
  O("fe8", 1, "Al autoengaño con el que negamos nuestra libertad, Sartre lo llama…", ["mala fe", "angustia", "epojé", "absurdo"], 0,
    ["Mala fe (<i>mauvaise foi</i>): mentirse a uno mismo."]);
  M("fe9", 1, "Une cada obra con su autor o autora.", [
    C("El ser y la nada", ["Sartre", "Heidegger", "Beauvoir", "Camus"], 0),
    C("Ser y tiempo", ["Sartre", "Heidegger", "Beauvoir", "Camus"], 1),
    C("El segundo sexo", ["Sartre", "Heidegger", "Beauvoir", "Camus"], 2),
    C("El mito de Sísifo", ["Sartre", "Heidegger", "Beauvoir", "Camus"], 3)],
    ["Cada obra pertenece a un autor distinto del tema."], "Sartre, Heidegger, Beauvoir, Camus");
  O("fe10", 1, "¿Quién escribió <i>El segundo sexo</i> (1949)?", ["Simone de Beauvoir", "Hannah Arendt", "Simone Weil", "Virginia Woolf"], 0,
    ["Beauvoir (1908–1986) aplica el existencialismo a la condición femenina."]);
  O("fe11", 1, "¿Qué ensayo de Camus trata del absurdo y de Sísifo?", ["El mito de Sísifo", "La peste", "El extranjero", "El hombre rebelde"], 0,
    ["Se publicó en 1942. <i>La peste</i> y <i>El extranjero</i> son novelas."]);
  O("fe12", 1, "¿Qué orden de nacimiento es correcto?",
    ["Husserl → Heidegger → Sartre", "Sartre → Husserl → Heidegger", "Heidegger → Husserl → Sartre", "Husserl → Sartre → Heidegger"], 0,
    ["Husserl (1859), Heidegger (1889), Sartre (1905)."], "Husserl → Heidegger → Sartre");
  O("fe13", 1, "La epojé consiste en…", ["poner entre paréntesis las teorías previas sobre la realidad", "negar que el mundo exista", "dudar de todo", "aceptar las teorías científicas sin más"], 0,
    ["Es suspender el juicio para describir lo que aparece."]);
  M("fe14", 1, "Distingue miedo y angustia.", [
    C("Un perro que ladra y se acerca", ["Miedo", "Angustia"], 0),
    C("Vértigo ante la libertad de elegir mi vida", ["Miedo", "Angustia"], 1),
    C("El temor a un examen concreto de mañana", ["Miedo", "Angustia"], 0),
    C("Sentirme responsable de lo que hago de mí mismo", ["Miedo", "Angustia"], 1)],
    ["El miedo tiene un objeto concreto; la angustia es ante uno mismo y la libertad."], "Miedo, angustia, miedo, angustia");

  // ---- nivel 2
  V("fe15", 2, "«Para Husserl, que la conciencia sea intencional significa que todo acto se hace con una intención deliberada.»", false, [
    "Es falso: significa que toda conciencia está dirigida a un objeto", "Es falso: la conciencia no es intencional", "Es verdad: Husserl habla de voluntad", "Es verdad: toda acción busca un fin"], 0,
    ["«Intencional» es «dirigido hacia», no «voluntario»."]);
  V("fe16", 2, "«Para Husserl, la conciencia no es una caja cerrada, sino apertura al mundo.»", true, [
    "Es verdad: siempre es conciencia de algo", "Es verdad: porque el mundo no existe", "Es verdad: porque la conciencia es material", "Es verdad: porque Descartes tenía razón"], 0,
    ["Por eso rompe con el yo aislado cartesiano."]);
  V("fe17", 2, "«La epojé de Husserl consiste en negar que el mundo exista.»", false, [
    "Es falso: suspende las teorías previas, no niega el mundo", "Es falso: la epojé es una prueba de Dios", "Es verdad: es el escepticismo total", "Es verdad: el mundo es una ilusión"], 0,
    ["Es un método de descripción, no una tesis sobre la existencia."]);
  V("fe18", 2, "«Heidegger parte del ser humano porque es el ente que se pregunta por su propio ser.»", true, [
    "Es verdad: por eso el análisis del Dasein abre la pregunta por el ser", "Es verdad: porque el ser humano es Dios", "Es verdad: porque la materia no existe", "Es verdad: porque Husserl lo prohibió"], 0,
    ["El Dasein es el punto de partida de <i>Ser y tiempo</i>."]);
  V("fe19", 2, "«Ser-para-la-muerte significa desear morir.»", false, [
    "Es falso: es asumir la finitud como parte de lo que somos", "Es falso: Heidegger niega la muerte", "Es verdad: la vida carece de valor", "Es verdad: la angustia lo exige"], 0,
    ["Asumir la finitud da seriedad y sentido a lo que hacemos."]);
  V("fe20", 2, "«Para Sartre, ser libre significa poder hacer cualquier cosa sin ningún límite.»", false, [
    "Es falso: hay una situación no elegida y lo libre es qué hacer con ella", "Es falso: no somos libres", "Es verdad: no hay límites", "Es verdad: porque Dios nos libera"], 0,
    ["Un prisionero no es libre de salir, pero sí de cómo vivir su cautiverio."]);
  V("fe21", 2, "«La mala fe de Sartre es mentirse a uno mismo para no asumir la propia libertad.»", true, [
    "Es verdad: se esconde tras excusas como «yo soy así»", "Es verdad: es mentir a los demás", "Es verdad: es no creer en Dios", "Es verdad: es una virtud"], 0,
    ["Es autoengaño, no mentira dirigida a otros."]);
  O("fe22", 2, "En Heidegger, el «uno» (<i>das Man</i>) es…", ["el modo anónimo de vivir según lo que «se» hace y «se» piensa", "Dios", "el yo auténtico", "el número uno"], 0,
    ["Es el modo cotidiano de existencia inauténtica."]);
  O("fe23", 2, "¿Para qué sirve el ejemplo del cortapapeles en Sartre?",
    ["Para contrastar un objeto fabricado, con esencia previa, con el ser humano, que no la tiene", "Para demostrar que Dios existe", "Para explicar el absurdo", "Para definir la epojé"], 0,
    ["En el objeto la esencia (su función) precede a la existencia; en el ser humano no."]);
  O("fe24", 2, "¿Qué diferencia hay entre miedo y angustia en Sartre?",
    ["El miedo tiene un objeto concreto; la angustia es ante uno mismo y la libertad", "Ninguna", "La angustia tiene un objeto concreto; el miedo no", "El miedo es ante Dios; la angustia, ante la muerte"], 0,
    ["Miedo: un perro. Angustia: el vértigo de poder elegir."]);
  O("fe25", 2, "El camarero de café de Sartre es un ejemplo de…", ["mala fe", "epojé", "absurdo", "autenticidad"], 0,
    ["Se identifica con su rol como si fuera una cosa y niega que lo elige."]);
  O("fe26", 2, "«No se nace mujer, se llega a serlo» significa que…",
    ["el ser mujer social es en gran medida una construcción", "las mujeres no tienen cuerpo", "no hay diferencias biológicas", "la naturaleza decide todo"], 0,
    ["Aplica «la existencia precede a la esencia»: no hay esencia femenina previa."]);
  O("fe27", 2, "Para Camus, el absurdo surge…",
    ["del choque entre la exigencia de sentido y el silencio del mundo", "de la existencia de Dios", "de la política", "de la mala fe"], 0,
    ["No está solo en el mundo ni solo en la persona: surge de la confrontación."]);
  O("fe28", 2, "La respuesta de Camus al absurdo es…", ["la rebeldía lúcida", "el suicidio", "el salto de fe", "la indiferencia"], 0,
    ["Rechaza suicidio y salto de fe; acepta la tensión y vive con pasión (Sísifo feliz)."]);
  O("fe29", 2, "¿En qué se diferencian Husserl y Heidegger frente a Descartes?",
    ["Ambos ven la conciencia o el Dasein abiertos al mundo, no como un yo aislado", "Ambos defienden el cogito aislado", "Ambos defienden el dualismo", "Ambos niegan el mundo"], 0,
    ["Intencionalidad (Husserl) y ser-en-el-mundo (Heidegger)."]);
  O("fe30", 2, "El «mundo de la vida» (<i>Lebenswelt</i>) de Husserl es…", ["el mundo tal como lo vivimos antes de cualquier ciencia", "el mundo de las Ideas", "la materia en sí", "el mundo después de la muerte"], 0,
    ["La ciencia moderna se olvidó de que parte de él."]);

  // ---- nivel 3
  O("fe31", 3, "Texto: «El hombre no es otra cosa que lo que él se hace» (paráfrasis de Sartre, <i>El existencialismo es un humanismo</i>). Su idea principal es…",
    ["que no hay naturaleza humana previa: el ser humano se define por sus actos", "que Dios nos hace como somos", "que la biología determina a las personas", "que nadie es responsable"], 0,
    ["Tema: la existencia precede a la esencia."]);
  O("fe32", 3, "Texto: «No se nace mujer: se llega a serlo» (Beauvoir). ¿Con qué principio sartreano se relaciona?",
    ["Con «la existencia precede a la esencia»", "Con la epojé", "Con el ser-para-la-muerte", "Con el absurdo"], 0,
    ["No hay esencia femenina previa: el ser mujer social se construye."]);
  O("fe33", 3, "Una alumna afirma: «Como somos libres, para Sartre no hay angustia». ¿Qué matiz es el correcto?",
    ["Al contrario: la libertad total y la responsabilidad producen angustia", "Tiene razón: libertad es tranquilidad", "La angustia es miedo a Dios", "La angustia solo existe en Camus"], 0,
    ["Sin excusas ni esencia previa, el peso de elegir genera vértigo."]);
  O("fe34", 3, "¿Qué diferencia a Camus de Sartre?",
    ["Camus parte del absurdo y propone la rebeldía; Sartre, de la libertad radical y el compromiso", "Camus defiende la mala fe", "Sartre defiende el suicidio", "No hay diferencia"], 0,
    ["Camus rechazaba además la etiqueta de existencialista."]);
  M("fe35", 3, "Une cada concepto con su autor.", [
    C("Epojé", ["Husserl", "Heidegger", "Sartre", "Camus"], 0),
    C("Ser-para-la-muerte", ["Husserl", "Heidegger", "Sartre", "Camus"], 1),
    C("Mala fe", ["Husserl", "Heidegger", "Sartre", "Camus"], 2),
    C("Rebeldía ante el absurdo", ["Husserl", "Heidegger", "Sartre", "Camus"], 3)],
    ["Husserl: método; Heidegger: finitud; Sartre: autoengaño; Camus: absurdo."], "Husserl, Heidegger, Sartre, Camus");
  O("fe36", 3, "Sartre y Kant se diferencian en que…",
    ["Kant defiende una ley moral universal dada por la razón; Sartre dice que no hay ley dada y la libertad crea los valores", "Sartre defiende el imperativo categórico", "Kant niega la libertad", "No hay diferencias"], 0,
    ["Ética formal del deber frente a libertad que crea valores."]);
  R("fe37", "Explica la fenomenología de Husserl: el lema «volver a las cosas mismas», la epojé y la intencionalidad. Relaciónala con Descartes. (Pregunta tipo PAU)", 9, [
    { t: "Define la fenomenología y el lema «volver a las cosas mismas»", p: 0.5 },
    { t: "Explica la epojé sin decir que niega el mundo", p: 0.4 },
    { t: "Define intencionalidad (conciencia de algo) con ejemplo", p: 0.5 },
    { t: "Menciona el mundo de la vida o la crisis de las ciencias", p: 0.2 },
    { t: "Compara con el yo aislado de Descartes", p: 0.4 }],
    ["Fenomenología y lema.", "Epojé.", "Intencionalidad.", "Mundo de la vida.", "Descartes."], "Describir lo que aparece; la conciencia es siempre conciencia de algo");
  R("fe38", "Explica el Dasein y el ser-para-la-muerte en Heidegger, y la diferencia entre existencia auténtica e inauténtica. (Pregunta tipo PAU)", 9, [
    { t: "Pregunta por el sentido del ser y parte del ente que se pregunta por su ser", p: 0.4 },
    { t: "Define Dasein y ser-en-el-mundo", p: 0.5 },
    { t: "Explica el «uno» y la existencia inauténtica", p: 0.4 },
    { t: "Explica el ser-para-la-muerte como asumir la finitud", p: 0.5 },
    { t: "Relaciona con Husserl o con Sartre", p: 0.2 }],
    ["Pregunta del ser.", "Dasein.", "El «uno».", "Muerte.", "Relación."], "Dasein finito: auténtico si asume sus posibilidades");
  R("fe39", "Explica la tesis «la existencia precede a la esencia» de Sartre y sus consecuencias (libertad, angustia, mala fe). Compárala con Kant o Marx. (Pregunta tipo PAU)", 10, [
    { t: "Expone la tesis con el contraste del objeto fabricado (cortapapeles)", p: 0.5 },
    { t: "Explica «condenado a ser libre» y la responsabilidad", p: 0.4 },
    { t: "Distingue angustia y miedo", p: 0.3 },
    { t: "Explica la mala fe con ejemplo (camarero, «yo soy así»)", p: 0.4 },
    { t: "Compara con Kant (ley universal) o Marx (condiciones materiales)", p: 0.4 }],
    ["Tesis y contraste.", "Libertad.", "Angustia.", "Mala fe.", "Comparación."], "Sin esencia previa: libres, responsables, angustiados y tentados de mala fe");
  R("fe40", "Explica «no se nace mujer, se llega a serlo» (Beauvoir) y el absurdo y la rebeldía en Camus. (Pregunta tipo PAU)", 9, [
    { t: "Explica la frase de Beauvoir como aplicación de la existencia antes que la esencia", p: 0.5 },
    { t: "Aclara que no niega la biología: no es destino", p: 0.3 },
    { t: "Define el absurdo como choque entre sentido y silencio del mundo", p: 0.5 },
    { t: "Explica que rechaza suicidio y salto de fe y propone la rebeldía", p: 0.4 },
    { t: "Menciona a Sísifo", p: 0.3 }],
    ["Beauvoir.", "Biología.", "Absurdo.", "Rebeldía.", "Sísifo."], "Género construido; absurdo y rebeldía");
  R("fe41", "Comenta este texto: «El hombre está condenado a ser libre. Condenado, porque no se ha creado a sí mismo; y sin embargo libre, porque, una vez arrojado al mundo, es responsable de todo lo que hace» (Sartre, <i>El existencialismo es un humanismo</i>; traducción habitual). Indica tema, idea principal, relación con el autor y comparación con otro. (Pregunta tipo PAU)", 11, [
    { t: "Tema: libertad y responsabilidad", p: 0.3 },
    { t: "Idea principal: no eligió existir, pero no puede dejar de elegir y es responsable", p: 0.4 },
    { t: "Aclara «condenado», «arrojado» y «responsable»", p: 0.4 },
    { t: "Relaciona con la existencia antes que la esencia, la angustia y la mala fe", p: 0.5 },
    { t: "Compara con Kant, Marx o Camus", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de «condenado a ser libre»");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Los autores del tema", ancha: true,
      tabla: { cab: ["Autor", "Fechas", "Idea clave"], filas: [
        ["Husserl", "1859–1938", "fenomenología, intencionalidad"],
        ["Heidegger", "1889–1976", "Dasein, ser-para-la-muerte"],
        ["Sartre", "1905–1980", "existencia antes que esencia, libertad"],
        ["Beauvoir", "1908–1986", "el género se construye"],
        ["Camus", "1913–1960", "absurdo y rebeldía"]
      ] } },
    { titulo: "Objeto y ser humano (Sartre)", ancha: true,
      tabla: { cab: ["", "Objeto fabricado", "Ser humano"], filas: [
        ["Primero", "la esencia (el plan)", "la existencia"],
        ["Función", "fija de antemano", "se hace con sus actos"],
        ["Ejemplo", "cortapapeles", "tú"]
      ] } },
    { titulo: "De la libertad a la mala fe",
      pasos: ["Sin esencia previa, soy libre.", "No puedo dejar de elegir: condenado a ser libre.", "Responsabilidad total: angustia.", "Mala fe: me escondo tras excusas."],
      nota: "Autenticidad = asumir la libertad sin excusas." },
    { titulo: "Camus: tres salidas al absurdo", ancha: true,
      tabla: { cab: ["Salida", "Camus"], filas: [
        ["Suicidio", "la rechaza"],
        ["Salto de fe", "la rechaza"],
        ["Rebeldía lúcida", "la elige (Sísifo feliz)"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Intencional es hacer algo con intención", bien: "Es estar dirigido a un objeto", por: "Toda conciencia es conciencia de algo." },
        { mal: "Ser-para-la-muerte es desear morir", bien: "Es asumir la finitud", por: "Da seriedad a la vida." },
        { mal: "Libre es poder hacerlo todo", bien: "Es elegir qué hacer en una situación dada", por: "Hay situación y responsabilidad." },
        { mal: "Angustia es lo mismo que miedo", bien: "El miedo tiene objeto; la angustia es ante la libertad", por: "Vértigo ante uno mismo." },
        { mal: "Camus propone el suicidio", bien: "Propone la rebeldía lúcida", por: "Rechaza suicidio y salto de fe." }
      ] }
  ];

  B.registrar("historia_fil", "t15", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf15a.secciones,
    nuevas: B.parte.hf15a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
