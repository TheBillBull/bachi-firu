/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 7 (parte B): Santo Tomás y la escolástica
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t7.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "La <b>escolástica</b> sistematiza el saber en las universidades con el método de la disputa; Tomás de Aquino (1224/25–1274) integra a <b>Aristóteles</b> en la fe cristiana.",
    "<b>Fe y razón</b> son caminos distintos y armónicos hacia la misma verdad; nunca pueden contradecirse.",
    "Las <b>cinco vías</b> prueban a posteriori que Dios existe: hecho del mundo, sin regreso infinito, primer término.",
    "La <b>ley natural</b> es la parte de la ley eterna que la razón descubre: «hay que hacer el bien y evitar el mal»."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Tomás de Aquino · 1224/25–1274",
    autores: [{ n: "Tomás de Aquino", f: "1224/25–1274", l: "Roccasecca (Italia); París; murió en Fossanova" }],
    obras: ["Suma contra los gentiles", "Suma teológica", "El ente y la esencia"],
    bloques: [
      { t: "Contexto", frases: ["Dominico y profesor en la <b>Universidad de París</b> (siglo XIII).", "Se recupera a <b>Aristóteles</b> por vía árabe y judía.", "Método escolástico: pregunta, objeciones, respuesta."] },
      { t: "Fe y razón", frases: ["Son caminos <b>distintos y armónicos</b> hacia la misma verdad.", "Los misterios (Trinidad) solo se conocen por <b>revelación</b>.", "Nunca hay contradicción real entre ambas."],
        tabla: { cab: ["Razón (preámbulos)", "Fe (misterios)"], filas: [["Dios existe", "Trinidad"], ["alma inmortal", "Encarnación"]] } },
      { t: "Dios: las cinco vías", frases: ["Prueba <b>a posteriori</b>: parte de hechos del mundo.", "Estructura común: hecho, no regreso infinito, primer término.", "Rechaza el argumento ontológico de Anselmo."],
        tabla: { cab: ["Vía", "Conclusión"], filas: [["movimiento", "primer motor inmóvil"], ["causa eficiente", "primera causa incausada"], ["contingencia", "ser necesario"], ["grados", "ser máximamente perfecto"], ["orden y finalidad", "inteligencia ordenadora"]] } },
      { t: "Ser y conocimiento", frases: ["En Dios la <b>esencia es existir</b>; las criaturas reciben el ser.", "Dios <b>crea</b> de la nada; el Primer motor de Aristóteles no.", "Conocemos por <b>abstracción</b> desde los sentidos."] },
      { t: "Ser humano y ética", frases: ["Alma <b>forma del cuerpo</b>, pero inmortal.", "Fin último: la <b>felicidad</b> como ver a Dios.", "Virtudes cardinales y <b>teologales</b>."] },
      { t: "Ley y política", frases: ["Ley eterna, <b>natural</b>, humana y divina.", "Primer precepto: hacer el bien y evitar el mal.", "Una ley injusta no es verdadera ley."],
        tabla: { cab: ["Ley", "Quién la conoce"], filas: [["natural", "la razón humana"], ["divina", "la revelación"]] } }
    ],
    resumen: [
      "<b>Fe y razón</b> armonizadas: la filosofía ayuda a la teología, sin contradicción.",
      "Las <b>cinco vías</b> prueban que Dios existe a partir del mundo observable.",
      "La <b>ley natural</b> funda la moral en la razón y limita al poder.",
      "<b>Aristóteles cristianizado</b>: Dios creador, alma inmortal, felicidad como visión de Dios."
    ],
    conecta: [
      { con: "Aristóteles (T4):", rel: "su gran fuente; lo corrige con la creación y el alma inmortal." },
      { con: "San Agustín (T6):", rel: "frente a «cree para entender», fe y razón armónicas." },
      { con: "Descartes (T9):", rel: "parte de la duda y de ideas innatas, no de los sentidos." },
      { con: "Hume (T10):", rel: "niega que percibamos la causalidad en que se apoyan las vías." },
      { con: "Kant (T12):", rel: "critica las pruebas de Dios y opone el deber a la felicidad." }
    ],
    claves: [
      ["Escolástica", "filosofía de las escuelas medievales; sistematiza el saber con disputa y razón"],
      ["Preámbulos de la fe", "verdades sobre Dios que la razón alcanza y la fe presupone"],
      ["Misterio", "verdad que solo se conoce por revelación (Trinidad)"],
      ["Cinco vías", "pruebas a posteriori de la existencia de Dios"],
      ["A posteriori", "razonar desde los efectos observables hasta su causa"],
      ["Ser necesario", "el que no puede no existir; Dios, esencia igual a existencia"],
      ["Creación", "Dios da el ser a todo de la nada y lo sostiene"],
      ["Ley natural", "principios morales que la razón descubre en la naturaleza humana"],
      ["Bienaventuranza", "felicidad plena: ver a Dios"],
      ["Virtudes teologales", "fe, esperanza y caridad, dones de la gracia"]
    ],
    cita: { txt: "El bien ha de hacerse y buscarse, y el mal ha de evitarse.", autor: "Tomás de Aquino", obra: "Suma teológica, I-II, q. 94, a. 2 (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    fe_razon: {
      titulo: "¿Razón, fe o las dos?",
      consigna: "Toca cada verdad y después la categoría en la que Tomás la coloca.",
      categorias: ["Solo por revelación (misterio)", "La razón puede alcanzarla (preámbulo)"],
      items: [
        { t: "Dios es uno", c: 1 },
        { t: "La Trinidad (un Dios en tres personas)", c: 0 },
        { t: "El alma racional es inmortal", c: 1 },
        { t: "La Encarnación", c: 0 },
        { t: "Dios existe", c: 1 },
        { t: "La resurrección de los muertos", c: 0 }
      ]
    },
    vias: {
      titulo: "Cada vía, su conclusión",
      consigna: "Une cada vía con el nombre al que llega.",
      pares: [["Movimiento", "Primer motor inmóvil"], ["Causa eficiente", "Primera causa incausada"], ["Contingencia", "Ser necesario por sí mismo"], ["Grados de perfección", "Ser máximamente perfecto"], ["Orden y finalidad", "Inteligencia ordenadora"]]
    },
    ordenvia: {
      titulo: "La vía del movimiento, paso a paso",
      consigna: "Ordena el razonamiento de la primera vía.",
      items: [
        { t: "Hecho: en el mundo hay cosas que se mueven" },
        { t: "Todo lo que se mueve es movido por otro" },
        { t: "La cadena de motores no puede ser infinita" },
        { t: "Existe un primer motor que no es movido" },
        { t: "A ese primer motor lo llamamos Dios" }
      ]
    },
    leyes: {
      titulo: "Los cuatro tipos de ley",
      consigna: "Une cada ley con su descripción.",
      pares: [["Ley eterna", "El plan racional con que Dios gobierna lo creado"], ["Ley natural", "La parte de la ley eterna que la razón humana descubre"], ["Ley humana", "Las normas que cada sociedad dicta para concretar la ley natural"], ["Ley divina", "Lo revelado que la razón por sí sola no alcanza"]]
    },
    quiz1: {
      titulo: "Test del tema 7",
      preguntas: [
        { q: "La escolástica se caracteriza por…", op: ["sistematizar el saber con el método de la disputa argumentada", "rechazar toda filosofía pagana", "defender la fe solo con la intuición", "negar el valor de la razón"], ok: 0, porque: "Sistematiza el saber en las universidades con preguntas, objeciones y respuestas." },
        { q: "Santo Tomás integra en la teología cristiana la filosofía de…", op: ["Aristóteles", "Platón", "Epicuro", "Descartes"], ok: 0, porque: "Es el gran proyecto de Tomás." },
        { q: "Para Santo Tomás, fe y razón son…", op: ["caminos distintos y armónicos hacia la misma verdad", "caminos opuestos", "un único camino idéntico", "irrelevantes entre sí"], ok: 0, porque: "Ambos proceden de Dios, por lo que no pueden contradecirse." },
        { q: "¿Cuál es una verdad solo accesible por revelación?", op: ["La Trinidad", "La existencia de Dios", "La inmortalidad del alma", "La unidad de Dios"], ok: 0, porque: "Es un misterio; los otros tres son preámbulos de la fe." },
        { q: "Las cinco vías son pruebas…", op: ["a posteriori, desde hechos del mundo", "a priori, desde el concepto de Dios", "basadas solo en la fe", "basadas en la intuición"], ok: 0, porque: "Parten de la experiencia, no de la idea de Dios." },
        { q: "La vía del movimiento concluye en…", op: ["un primer motor inmóvil", "una primera causa del orden moral", "un ser contingente", "una Idea separada"], ok: 0, porque: "Mueve sin ser movido." },
        { q: "La vía que parte de seres que pueden ser o no ser es la de…", op: ["la contingencia", "los grados de perfección", "el orden del mundo", "la causa eficiente"], ok: 0, porque: "Los seres contingentes nacen y mueren; la vía llega a un ser necesario." },
        { q: "La quinta vía compara el orden de la naturaleza con…", op: ["una flecha dirigida por un arquero", "un reloj que se rompe", "una cadena de dominó", "un ejército sin general"], ok: 0, porque: "Lo que no conoce necesita ser dirigido por una inteligencia." },
        { q: "El primer principio de la ley natural es…", op: ["hay que hacer el bien y evitar el mal", "obedece siempre al gobernante", "busca tu propio placer", "haz lo que te dicte la costumbre"], ok: 0, porque: "De este principio se derivan los demás." },
        { q: "Una ley humana contraria a la ley natural es, para Tomás…", op: ["una corrupción de la ley, no verdadera ley", "la ley más importante", "una ley divina", "una ley eterna"], ok: 0, porque: "Una ley injusta no obliga en conciencia." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre fe y razón en Tomás es FALSA?", op: ["La razón sustituye a la fe incluso en los misterios", "Fe y razón no pueden contradecirse", "La existencia de Dios es un preámbulo de la fe", "La Trinidad solo se conoce por revelación"], ok: 0, porque: "Los misterios solo se aceptan por fe; la razón no los demuestra." },
        { q: "¿Cuál de estas afirmaciones sobre las cinco vías es FALSA?", op: ["Parten de la idea de Dios, como el argumento de Anselmo", "Parten de hechos observables", "Rechazan un regreso infinito", "Concluyen en un primer término al que se llama Dios"], ok: 0, porque: "Tomás rechaza el argumento ontológico; sus vías son a posteriori." },
        { q: "¿Cuál de estas afirmaciones sobre «no puede haber cadena infinita» es FALSA?", op: ["Se refiere solo al primer acontecimiento del pasado en el tiempo", "Se refiere a causas que dependen unas de otras a la vez", "Sin primer motor no habría motores segundos", "Tomás cree que la razón no prueba que el mundo tuvo comienzo temporal"], ok: 0, porque: "Habla del orden de dependencia, no del tiempo." },
        { q: "¿Cuál de estas afirmaciones sobre el Dios de Tomás y el de Aristóteles es FALSA?", op: ["Ambos crean el mundo de la nada", "El de Tomás es creador libre", "El de Aristóteles es Primer motor inmóvil", "El de Tomás tiene providencia"], ok: 0, porque: "El Primer motor de Aristóteles no crea; el de Tomás sí." },
        { q: "¿Cuál de estas afirmaciones sobre la ley natural es FALSA?", op: ["Solo pueden conocerla los creyentes por revelación", "La descubre la razón humana", "Es la parte de la ley eterna accesible al ser humano", "Su primer principio es hacer el bien y evitar el mal"], ok: 0, porque: "La ley natural es accesible a la razón de cualquier persona." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Tomás de Aquino es anterior a San Agustín", "Agustín murió en 430", "Tomás murió en 1274", "Anselmo vivió antes que Tomás"], ok: 0, porque: "Agustín (354–430) es muy anterior a Tomás (1224/25–1274)." },
        { q: "¿Cuál de estas afirmaciones sobre el conocimiento en Tomás es FALSA?", op: ["Las ideas son innatas, como en Platón", "El conocimiento empieza en los sentidos", "El entendimiento abstrae lo universal", "No hay conocimiento sin experiencia previa"], ok: 0, porque: "Es un empirismo moderado: no hay ideas innatas." },
        { q: "¿Cuál de estas afirmaciones sobre el alma en Tomás es FALSA?", op: ["El alma es una sustancia distinta del cuerpo, que solo lo usa", "El alma racional es forma del cuerpo", "El alma racional es inmortal", "La persona es alma y cuerpo"], ok: 0, porque: "Eso es dualismo; Tomás la entiende como forma del cuerpo." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Santo Tomás",
      cartas: [
        { a: "Escolástica", b: "Filosofía de las escuelas y universidades medievales; sistematiza el saber con el método de la disputa." },
        { a: "Suma teológica", b: "Obra principal de Tomás (hacia 1265–1273, inacabada); contiene las cinco vías y la ley natural." },
        { a: "Preámbulos de la fe", b: "Verdades sobre Dios que la razón alcanza y que la fe presupone (existencia de Dios)." },
        { a: "Misterio", b: "Verdad solo conocida por revelación (Trinidad, Encarnación); la razón no la demuestra." },
        { a: "Prueba a posteriori", b: "Razonar desde los efectos observables hasta su causa. Son las cinco vías." },
        { a: "Vía del movimiento", b: "Todo lo movido lo mueve otro; no hay regreso infinito; hay un primer motor inmóvil." },
        { a: "Vía de la causa eficiente", b: "Nada es causa de sí mismo; debe haber una primera causa incausada." },
        { a: "Vía de la contingencia", b: "Hay seres que pueden no ser; debe haber un ser necesario por sí mismo." },
        { a: "Vía de los grados", b: "Hay más y menos perfección; esto exige un máximo, causa de todo lo perfecto." },
        { a: "Vía del orden", b: "Lo que no conoce obra para un fin; lo dirige una inteligencia ordenadora." },
        { a: "Esencia y existencia", b: "En las criaturas son distintas; en Dios coinciden: es el ser mismo." },
        { a: "Ley natural", b: "Principios morales que la razón descubre en la naturaleza humana; parte de la ley eterna." },
        { a: "Ley eterna", b: "El plan racional con que Dios gobierna todo lo creado." },
        { a: "Bienaventuranza", b: "Felicidad plena: la visión de Dios, que solo se alcanza del todo tras la muerte." },
        { a: "Virtudes cardinales", b: "Prudencia, justicia, fortaleza y templanza. Las teologales son fe, esperanza y caridad." }
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
  O("hs1", 1, "¿A qué orden religiosa perteneció Tomás de Aquino?", ["A los dominicos", "A los franciscanos", "A los benedictinos", "A los jesuitas"], 0,
    ["Entró en la orden dominica, dedicada a la predicación y al estudio. Los jesuitas son muy posteriores."]);
  O("hs2", 1, "¿Cómo se llama la gran obra de Tomás que contiene las cinco vías?", ["Suma teológica", "Confesiones", "Ética a Nicómaco", "Ciudad de Dios"], 0,
    ["Las cinco vías están en la <i>Suma teológica</i> (I, q. 2, a. 3). <i>Confesiones</i> y <i>Ciudad de Dios</i> son de Agustín."]);
  O("hs3", 1, "¿Qué filósofo griego es la gran fuente filosófica de Tomás?", ["Aristóteles", "Platón", "Epicuro", "Parménides"], 0,
    ["Integra la filosofía aristotélica en la teología cristiana."]);
  T("hs4", 1, "Completa: el periodo de la filosofía medieval hecho en las escuelas y universidades se llama ______.", "Término =", ["escolástica"],
    ["Del latín <i>schola</i>, «escuela»."], "escolástica");
  O("hs5", 1, "¿Cómo es la relación entre fe y razón para Tomás?", ["Distintas pero armónicas", "Opuestas", "La razón manda siempre", "La fe sustituye a la razón"], 0,
    ["Dos caminos hacia la misma verdad, sin contradicción posible."]);
  O("hs6", 1, "¿Cuál de estas verdades solo se conoce por revelación?", ["La Trinidad", "La existencia de Dios", "La unidad de Dios", "La inmortalidad del alma"], 0,
    ["La Trinidad es un misterio; las otras tres son preámbulos de la fe, alcanzables por la razón."]);
  M("hs7", 1, "Clasifica cada verdad como preámbulo de la fe o misterio.", [
    C("Dios existe", ["Preámbulo", "Misterio"], 0),
    C("La Encarnación", ["Preámbulo", "Misterio"], 1),
    C("El alma racional es inmortal", ["Preámbulo", "Misterio"], 0),
    C("La Trinidad", ["Preámbulo", "Misterio"], 1)],
    ["Preámbulo = la razón puede alcanzarlo; misterio = solo por revelación."], "Dios existe–preámbulo, Encarnación–misterio, alma inmortal–preámbulo, Trinidad–misterio");
  O("hs8", 1, "¿Cuántas son las vías con las que Tomás prueba la existencia de Dios?", ["Cinco", "Tres", "Cuatro", "Siete"], 0,
    ["Movimiento, causa eficiente, contingencia, grados de perfección y orden del mundo."]);
  O("hs9", 1, "La primera vía concluye en…", ["un primer motor inmóvil", "una Idea del Bien", "un ser contingente", "una causa final del universo"], 0,
    ["Mueve sin ser movido."]);
  M("hs10", 1, "Une cada vía con su punto de partida.", [
    C("Movimiento", ["Hay cosas que se mueven", "Hay seres que pueden ser o no ser", "Hay grados de perfección", "Lo que no conoce obra por un fin"], 0),
    C("Contingencia", ["Hay cosas que se mueven", "Hay seres que pueden ser o no ser", "Hay grados de perfección", "Lo que no conoce obra por un fin"], 1),
    C("Grados de perfección", ["Hay cosas que se mueven", "Hay seres que pueden ser o no ser", "Hay grados de perfección", "Lo que no conoce obra por un fin"], 2),
    C("Orden y finalidad", ["Hay cosas que se mueven", "Hay seres que pueden ser o no ser", "Hay grados de perfección", "Lo que no conoce obra por un fin"], 3)],
    ["Cada vía arranca de un hecho distinto del mundo."], "Movimiento–cosas que se mueven; contingencia–pueden ser o no ser; grados–más y menos perfecto; orden–obrar por un fin");
  T("hs11", 1, "Completa: el método de las cinco vías es a ______ (parte de los efectos observables).", "Término =", ["posteriori", "a posteriori"],
    ["De los efectos a la causa."], "a posteriori");
  O("hs12", 1, "El primer principio de la ley natural es…", ["hay que hacer el bien y evitar el mal", "obedece a la ley humana", "busca tu placer", "honra a tus padres"], 0,
    ["Los demás preceptos se derivan de él."]);
  O("hs13", 1, "La felicidad plena para Tomás consiste en…", ["ver a Dios", "acumular riqueza", "el placer", "el honor"], 0,
    ["La bienaventuranza es la visión de Dios."]);
  O("hs14", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Aristóteles → Agustín → Tomás de Aquino", "Agustín → Aristóteles → Tomás de Aquino", "Tomás de Aquino → Agustín → Aristóteles", "Aristóteles → Tomás de Aquino → Agustín"], 0,
    ["Aristóteles (384–322 a. C.), Agustín (354–430), Tomás de Aquino (1224/25–1274)."], "Aristóteles → Agustín → Tomás de Aquino");

  // ---- nivel 2
  V("hs15", 2, "«Para Tomás, la razón puede demostrar el misterio de la Trinidad.»", false, [
    "Es falso: los misterios solo se conocen por revelación", "Es falso: la razón no sirve para nada", "Es verdad: la razón lo demuestra con las cinco vías", "Es verdad: porque fe y razón son idénticas"], 0,
    ["La razón puede acercarse a ellos, pero no demostrarlos."]);
  V("hs16", 2, "«Las cinco vías parten de hechos observables del mundo.»", true, [
    "Es verdad: son pruebas a posteriori", "Es verdad: porque parten del concepto de Dios", "Es verdad: porque parten de la fe", "Es verdad: porque parten de ideas innatas"], 0,
    ["Siguen el método aristotélico: todo conocimiento empieza en la experiencia."]);
  V("hs17", 2, "«Tomás acepta el argumento ontológico de Anselmo.»", false, [
    "Es falso: de una idea no se pasa a una existencia real, y no conocemos la esencia de Dios", "Es falso: porque Anselmo vivió después", "Es verdad: porque era su maestro", "Es verdad: lo toma como la primera vía"], 0,
    ["Para él la existencia de Dios no es evidente para nosotros y hay que demostrarla desde el mundo."]);
  V("hs18", 2, "«Para Tomás, Dios crea el mundo de la nada, a diferencia del Primer motor de Aristóteles.»", true, [
    "Es verdad: el Dios cristiano es creador libre y providente", "Es verdad: porque el Primer motor también crea", "Es verdad: porque el mundo es eterno e increado", "Es verdad: porque Aristóteles era cristiano"], 0,
    ["Creación <i>ex nihilo</i> y providencia son aportaciones cristianas."]);
  V("hs19", 2, "«Según la ley natural de Tomás, solo los cristianos pueden conocer qué es moralmente bueno.»", false, [
    "Es falso: cualquiera puede descubrirla con su razón", "Es falso: porque no existe ley natural", "Es verdad: porque solo se conoce por revelación", "Es verdad: porque la razón no sirve en ética"], 0,
    ["La ley natural es accesible a la razón de todos, de ahí su influencia en los derechos humanos."]);
  V("hs20", 2, "«El alma racional, para Tomás, es forma del cuerpo y a la vez inmortal.»", true, [
    "Es verdad: no es un ser aparte, pero su actividad intelectual no depende de un órgano", "Es verdad: porque el alma es una Idea", "Es verdad: porque el cuerpo es inmortal", "Es verdad: porque niega el alma"], 0,
    ["Hilemorfismo con alma subsistente: una síntesis entre Aristóteles y la fe cristiana."]);
  V("hs21", 2, "«Una ley humana injusta es, para Tomás, verdadera ley que hay que obedecer siempre.»", false, [
    "Es falso: es corrupción de la ley y no obliga en conciencia, salvo para evitar un mal mayor", "Es falso: porque no hay leyes humanas", "Es verdad: porque la ley siempre obliga", "Es verdad: porque la ley humana es la divina"], 0,
    ["Una ley contraria a la ley natural pierde su carácter de ley."]);
  O("hs22", 2, "¿En qué se distingue Tomás de San Agustín en la relación entre fe y razón?",
    ["En que para Tomás son caminos armónicos con ámbitos propios, y Agustín pone la fe delante de la razón", "En que Tomás niega la fe", "En que Agustín niega la razón", "En que no hay diferencia"], 0,
    ["Agustín: «cree para entender». Tomás: dos caminos paralelos."]);
  O("hs23", 2, "El ejemplo de la flecha y el arquero ilustra la vía…", ["del orden y la finalidad", "del movimiento", "de la contingencia", "de los grados"], 0,
    ["Lo que no conoce necesita ser dirigido por quien conoce."]);
  O("hs24", 2, "¿Qué significa que una cadena de motores no pueda ser infinita?",
    ["Que sin un primer motor no habría motores segundos: es el orden de dependencia, no el tiempo", "Que el mundo tuvo comienzo en el tiempo, probado por la razón", "Que los motores se agotan", "Que Dios está en el pasado"], 0,
    ["Tomás habla de causas subordinadas a la vez, como la mano que mueve el bastón."]);
  O("hs25", 2, "En la vía de la contingencia, ¿qué ocurriría si todo fuese contingente?",
    ["Habría un tiempo en que nada existía y, por tanto, ahora no habría nada", "Todo sería necesario", "El mundo sería eterno", "Nada cambiaría"], 0,
    ["De la nada no sale nada; como hay cosas, debe existir un ser necesario."]);
  O("hs26", 2, "¿A qué tipo de ley pertenece «hay que hacer el bien y evitar el mal»?", ["Ley natural", "Ley humana", "Ley divina positiva", "Ley física"], 0,
    ["Es su primer principio, descubierto por la razón."]);
  O("hs27", 2, "Los preceptos como «debe haber una pena para el robo» se derivan de la ley natural…", ["por determinación", "por conclusión de un silogismo físico", "por revelación divina directa", "por tradición religiosa"], 0,
    ["La norma general la concreta cada sociedad: eso es determinación."]);
  O("hs28", 2, "¿Qué virtudes añade Tomás al esquema de Aristóteles?", ["Las teologales: fe, esperanza y caridad", "Las cardinales", "Las dianoéticas", "Ninguna"], 0,
    ["Las cardinales (prudencia, justicia, fortaleza, templanza) ya existían; las teologales son cristianas."]);
  O("hs29", 2, "En Tomás, la diferencia entre esencia y existencia en las criaturas significa que…",
    ["saber lo que son no implica que existan: reciben el ser", "no tienen esencia", "su existencia es necesaria", "son idénticas a Dios"], 0,
    ["Solo en Dios la esencia es existir."]);
  O("hs30", 2, "Para conocer, Tomás parte…", ["de los sentidos, y el entendimiento abstrae lo universal", "de ideas innatas", "de la iluminación directa de Dios", "de la duda"], 0,
    ["Empirismo moderado, frente a Platón, Agustín y Descartes."]);

  // ---- nivel 3
  O("hs31", 3, "Texto: «Es cierto, y consta por los sentidos, que en este mundo hay cosas que se mueven» (<i>Suma teológica</i>, I, q. 2, a. 3; traducción habitual). El inicio muestra que la prueba…",
    ["parte de la experiencia sensible, no de la fe ni de una idea", "parte de una revelación", "parte de ideas innatas", "parte de una intuición mística"], 0,
    ["«Consta por los sentidos» indica un punto de partida empírico: argumento a posteriori."]);
  O("hs32", 3, "Texto: «El bien ha de hacerse y buscarse, y el mal evitarse» (<i>Suma teológica</i>, I-II, q. 94, a. 2; traducción habitual). Su idea principal es…",
    ["el primer principio de la razón práctica, del que derivan los demás preceptos", "un mandamiento exclusivo de la Biblia", "una ley física", "una norma sin fundamento"], 0,
    ["Es el principio básico de la ley natural."]);
  O("hs33", 3, "Una alumna afirma: «las cinco vías prueban que Dios es el Dios de la Biblia». ¿Qué matiz es el correcto?",
    ["Prueban un primer término; sus atributos se estudian después", "Tiene razón: lo prueban todo", "No prueban nada", "Solo prueban que existe la materia"], 0,
    ["Concluyen «y a esto llamamos Dios»; Tomás desarrolla después los atributos."]);
  O("hs34", 3, "¿Qué crítica hace Hume a las vías?",
    ["Que no percibimos la causalidad, solo hechos que se suceden", "Que Dios no puede ser causa", "Que el movimiento no existe", "Que la fe es irracional"], 0,
    ["Cuestiona la base causal de las vías (T10)."]);
  O("hs35", 3, "¿Qué crítica hace Kant a las pruebas de Dios?",
    ["Que la razón no puede usar las categorías (causalidad) más allá de la experiencia", "Que Dios no puede existir", "Que no hay experiencia", "Que la fe es mejor que la razón"], 0,
    ["La razón teórica, para Kant (T12), no puede conocer lo que está fuera de la experiencia posible."]);
  O("hs36", 3, "¿Qué distingue el dualismo de Platón y Agustín del hilemorfismo de Tomás en el ser humano?",
    ["Para Tomás el ser humano es una sola sustancia: el alma es forma del cuerpo", "Para Tomás no hay alma", "Para Platón el alma es forma del cuerpo", "No hay diferencia"], 0,
    ["Dualismo = dos sustancias; hilemorfismo = una sola, compuesta."]);
  O("hs37", 3, "Tomás y Kant se diferencian en ética en que…",
    ["Tomás busca la felicidad como fin con las virtudes; Kant, el deber universal", "Kant defiende la bienaventuranza", "ambos defienden el deber", "Tomás rechaza la razón"], 0,
    ["Ética teleológica (fin: felicidad) frente a ética formal del deber."]);
  M("hs38", 3, "Empareja cada tipo de ley con su descripción.", [
    C("Ley eterna", ["Plan racional de Dios para lo creado", "Lo que la razón humana descubre del plan de Dios", "Norma dictada por una sociedad", "Lo revelado por Dios"], 0),
    C("Ley natural", ["Plan racional de Dios para lo creado", "Lo que la razón humana descubre del plan de Dios", "Norma dictada por una sociedad", "Lo revelado por Dios"], 1),
    C("Ley humana", ["Plan racional de Dios para lo creado", "Lo que la razón humana descubre del plan de Dios", "Norma dictada por una sociedad", "Lo revelado por Dios"], 2),
    C("Ley divina", ["Plan racional de Dios para lo creado", "Lo que la razón humana descubre del plan de Dios", "Norma dictada por una sociedad", "Lo revelado por Dios"], 3)],
    ["Eterna → natural (participación racional) → humana (concreción) y divina (revelación)."], "Eterna–plan de Dios; natural–lo que descubre la razón; humana–norma social; divina–revelada");
  M("hs39", 3, "Empareja cada vía con el nombre al que llega.", [
    C("Causa eficiente", ["Primera causa incausada", "Ser necesario por sí mismo", "Ser máximamente perfecto", "Inteligencia ordenadora"], 0),
    C("Contingencia", ["Primera causa incausada", "Ser necesario por sí mismo", "Ser máximamente perfecto", "Inteligencia ordenadora"], 1),
    C("Grados de perfección", ["Primera causa incausada", "Ser necesario por sí mismo", "Ser máximamente perfecto", "Inteligencia ordenadora"], 2),
    C("Orden y finalidad", ["Primera causa incausada", "Ser necesario por sí mismo", "Ser máximamente perfecto", "Inteligencia ordenadora"], 3)],
    ["Cada vía acaba en un primer término distinto, que Tomás identifica con Dios."], "Causa eficiente–primera causa; contingencia–ser necesario; grados–máximamente perfecto; orden–inteligencia ordenadora");
  R("hs40", "Explica la relación entre fe y razón según Santo Tomás y compárala con la de San Agustín. (Pregunta tipo PAU)", 9, [
    { t: "Contexto: recuperación de Aristóteles y universidades del siglo XIII", p: 0.3 },
    { t: "Tesis: fe y razón son caminos distintos y armónicos hacia la misma verdad; no hay contradicción posible", p: 0.5 },
    { t: "Distingue preámbulos de la fe (accesibles a la razón) y misterios (solo revelación), con ejemplos", p: 0.5 },
    { t: "Compara con Agustín («cree para entender»: la fe guía a la razón) y con los averroístas", p: 0.4 },
    { t: "Valoración o conclusión coherente", p: 0.3 }],
    ["Contexto.", "Tesis de armonía.", "Preámbulos y misterios.", "Comparación con Agustín.", "Valoración."], "Dos caminos armónicos hacia una sola verdad");
  R("hs41", "Explica las cinco vías de Santo Tomás: su estructura común y dos de ellas con detalle. (Pregunta tipo PAU)", 8, [
    { t: "Enuncia las cinco vías (movimiento, causa eficiente, contingencia, grados, finalidad)", p: 0.5 },
    { t: "Estructura común: hecho observable, imposibilidad de regreso infinito, primer término", p: 0.5 },
    { t: "Desarrolla correctamente dos vías con su conclusión", p: 0.5 },
    { t: "Explica el carácter a posteriori y el rechazo del argumento ontológico", p: 0.3 },
    { t: "Crítica o valoración (Hume, Kant o ciencia moderna)", p: 0.2 }],
    ["Las cinco vías.", "Estructura común.", "Dos vías.", "A posteriori.", "Crítica."], "Hecho → no regreso infinito → primer término");
  R("hs42", "Explica la ley natural en Santo Tomás y su relación con la ley eterna, humana y divina. (Pregunta tipo PAU)", 9, [
    { t: "Define la ley natural como lo que la razón descubre de la ley eterna", p: 0.5 },
    { t: "Primer principio (hacer el bien y evitar el mal) y las inclinaciones naturales", p: 0.5 },
    { t: "Distingue ley eterna, natural, humana y divina con ejemplos", p: 0.5 },
    { t: "Ley humana injusta: no es verdadera ley", p: 0.2 },
    { t: "Valoración: influencia en los derechos humanos, límites", p: 0.3 }],
    ["Definición.", "Primer principio.", "Cuatro leyes.", "Ley injusta.", "Valoración."], "La razón descubre la ley natural, participación de la ley eterna");
  R("hs43", "Compara a Santo Tomás con Aristóteles: qué conserva y qué añade. (Pregunta tipo PAU)", 8, [
    { t: "Qué conserva: hilemorfismo, potencia y acto, causas, empirismo moderado y virtudes", p: 0.5 },
    { t: "Dios creador libre frente al Primer motor que no crea", p: 0.5 },
    { t: "Alma forma del cuerpo y además inmortal", p: 0.3 },
    { t: "Felicidad: actividad virtuosa y, plenamente, ver a Dios", p: 0.3 },
    { t: "Conclusión: Aristóteles cristianizado", p: 0.4 }],
    ["Qué conserva.", "Dios creador.", "Alma inmortal.", "Felicidad.", "Conclusión."], "Tomás cristianiza a Aristóteles");
  R("hs44", "Comenta este texto: «Es cierto, y consta por los sentidos, que en este mundo hay cosas que se mueven. Ahora bien, todo lo que se mueve es movido por otro […]. Por tanto, es necesario llegar a un primer motor que no sea movido por nada, y éste es el que todos entienden por Dios» (Tomás de Aquino, <i>Suma teológica</i>, traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador. (Pregunta tipo PAU)", 9, [
    { t: "Tema: demostración de la existencia de Dios desde el movimiento (primera vía)", p: 0.3 },
    { t: "Idea principal: lo movido lo mueve otro; no hay regreso infinito; existe un primer motor inmóvil", p: 0.4 },
    { t: "Aclara términos: movimiento como paso de potencia a acto, a posteriori, orden de causas", p: 0.4 },
    { t: "Relaciona con el autor: las otras cuatro vías, fe y razón, Aristóteles", p: 0.5 },
    { t: "Compara con Aristóteles, Hume o Kant", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de la primera vía");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Tres respuestas sobre fe y razón", ancha: true,
      tabla: { cab: ["", "Agustín (T6)", "Tomás", "Averroístas"], filas: [
        ["Relación", "la fe guía a la razón", "caminos armónicos", "doble verdad"],
        ["Base filosófica", "Platón", "Aristóteles", "Aristóteles / Averroes"],
        ["Conocimiento", "iluminación", "abstracción", "abstracción"]
      ] } },
    { titulo: "Las cinco vías", ancha: true,
      tabla: { cab: ["Vía", "Parte de…", "Llega a…"], filas: [
        ["Movimiento", "lo que se mueve", "primer motor inmóvil"],
        ["Causa eficiente", "causas y efectos", "primera causa incausada"],
        ["Contingencia", "seres que pueden no ser", "ser necesario"],
        ["Grados", "más y menos perfecto", "ser perfectísimo"],
        ["Finalidad", "orden sin conocimiento", "inteligencia ordenadora"]
      ] } },
    { titulo: "Cuatro leyes", ancha: true,
      tabla: { cab: ["Ley", "Quién la conoce"], filas: [
        ["Eterna", "solo Dios en plenitud"],
        ["Natural", "la razón humana"],
        ["Humana", "cada sociedad la dicta"],
        ["Divina", "la revelación"]
      ] } },
    { titulo: "La vía del movimiento",
      pasos: ["Hay cosas que se mueven.", "Todo lo movido lo mueve otro.", "No puede haber regreso infinito.", "Hay un primer motor inmóvil: Dios."],
      nota: "Es un orden de dependencia, no de tiempo." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Para Tomás la razón sustituye a la fe", bien: "Fe y razón son caminos armónicos; los misterios son de fe", por: "No hay contradicción posible." },
        { mal: "Las vías parten de la idea de Dios", bien: "Parten de hechos observables (a posteriori)", por: "Tomás rechaza el argumento ontológico." },
        { mal: "La ley natural solo la conocen los creyentes", bien: "La descubre la razón de cualquiera", por: "Participación racional de la ley eterna." },
        { mal: "El Primer motor de Aristóteles y el Dios de Tomás son lo mismo", bien: "El de Tomás crea y tiene providencia", por: "Tomás cristianiza a Aristóteles." }
      ] }
  ];

  B.registrar("historia_fil", "t7", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf7a.secciones,
    nuevas: B.parte.hf7a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
