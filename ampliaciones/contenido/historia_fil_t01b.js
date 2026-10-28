/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 1 (parte B)
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t1.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "La filosofía nace en Jonia (s. VI a. C.) al pasar <b>del mito al logos</b>: explicar el mundo con razones y no con relatos de dioses.",
    "Los presocráticos buscan el <b>arché</b>: agua (Tales), ápeiron (Anaximandro), aire (Anaxímenes), número (Pitágoras).",
    "<b>Heráclito</b>: todo cambia, regido por el logos. <b>Parménides</b>: el ser es uno e inmóvil; el cambio es apariencia.",
    "<b>Demócrito</b> los concilia con <b>átomos y vacío</b>: el cambio es combinación de átomos eternos."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Presocráticos · siglos VI–IV a. C.",
    autores: [
      { n: "Tales, Anaximandro, Anaxímenes", f: "h. 624–525 a. C.", l: "Mileto (Jonia)" },
      { n: "Pitágoras", f: "h. 570–495 a. C.", l: "Samos → Crotona (Italia)" },
      { n: "Heráclito", f: "h. 540–480 a. C.", l: "Éfeso (Jonia)" },
      { n: "Parménides", f: "h. 515–450 a. C.", l: "Elea (Italia)" },
      { n: "Demócrito (y Leucipo)", f: "h. 460–370 a. C.", l: "Abdera (Tracia)" }
    ],
    obras: ["Sobre la naturaleza (varios autores, solo fragmentos)", "Poema de Parménides (vía de la verdad y vía de la opinión)"],
    bloques: [
      { t: "Contexto", frases: ["Jonia, siglo VI a. C.: comercio, polis y escritura.", "Se pasa <b>del mito al logos</b>: explicar con razones.", "Se conservan solo <b>fragmentos</b> (citas de otros)."] },
      { t: "El arché", frases: ["Principio del que todo procede y al que todo vuelve.", "Aristóteles: buscan la <b>causa material</b>."], tabla: { cab: ["Autor", "Arché"], filas: [["Tales", "agua"], ["Anaximandro", "ápeiron"], ["Anaxímenes", "aire"], ["Pitágoras", "número"]] } },
      { t: "El cambio", frases: ["Es <b>el</b> problema del tema."], tabla: { cab: ["Heráclito", "Parménides"], filas: [["Todo fluye (devenir)", "El ser es inmóvil"], ["Cambio = realidad", "Cambio = apariencia"], ["Ley: logos", "Argumento: el no-ser no es"]] } },
      { t: "Conocimiento", frases: ["Los sentidos muestran cambio y multiplicidad.", "Parménides: engañan; manda la razón (<b>racionalismo</b>).", "Demócrito: color y sabor son convención; lo real, átomos y vacío."] },
      { t: "Átomos y vacío", frases: ["Átomos: eternos, indivisibles, distintos en forma, orden y posición.", "El <b>vacío</b> permite el movimiento.", "Mecanicismo, materialismo y determinismo."] },
      { t: "Ser humano y ética", frases: ["Pitágoras: alma que se reencarna; vida purificada.", "Heráclito: despertar y escuchar al logos.", "Demócrito: <i>euthymía</i>, serenidad del ánimo."] }
    ],
    resumen: [
      "La filosofía nace al buscar el <b>arché</b> con razones, no con mitos.",
      "<b>Heráclito</b> y <b>Parménides</b> son polos opuestos: devenir frente a ser inmóvil.",
      "El <b>atomismo</b> los concilia: átomos eternos que se mueven en el vacío.",
      "El problema ser–cambio pasa a <b>Platón</b> (tema 3) y a <b>Aristóteles</b> (tema 4)."
    ],
    conecta: [
      { con: "Sócrates y sofistas (T2):", rel: "pasan de la naturaleza al ser humano." },
      { con: "Platón (T3):", rel: "une lo cambiante (Heráclito) y lo inmutable (Parménides)." },
      { con: "Aristóteles (T4):", rel: "arché = causa material; critica a los atomistas." },
      { con: "Epicuro:", rel: "retoma el atomismo." }
    ],
    claves: [
      ["Mito", "relato de dioses, tradicional y sin argumentos"],
      ["Logos", "razón; explicación argumentada y discutible"],
      ["Arché", "principio y origen de todo"],
      ["Ápeiron", "lo ilimitado e indeterminado (Anaximandro)"],
      ["Devenir", "cambio continuo de la realidad (Heráclito)"],
      ["Unidad de opuestos", "los contrarios son caras de una misma cosa"],
      ["Ser / no-ser", "Parménides: el ser es, el no-ser no es"],
      ["Dóxa", "opinión engañosa de los sentidos"],
      ["Átomo", "partícula eterna e indivisible (Demócrito)"],
      ["Mecanicismo", "todo se explica por choques de materia, sin fines"]
    ],
    cita: { txt: "En los mismos ríos entramos y no entramos; somos y no somos.", autor: "Heráclito", obra: "fr. DK 22 B49a" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    mitologos: {
      titulo: "¿Mito o logos?",
      consigna: "Toca una frase y después la categoría a la que pertenece.",
      categorias: ["Mito", "Logos"],
      items: [
        { t: "Las tormentas son la ira de Zeus", c: 0 },
        { t: "El agua es el origen de todo, porque está en sólido, líquido y gas", c: 1 },
        { t: "«Siempre se ha contado así, no hay que preguntar»", c: 0 },
        { t: "Aire enrarecido forma fuego; aire condensado forma agua", c: 1 },
        { t: "El mundo salió de Caos, según Hesíodo", c: 0 },
        { t: "«Mi explicación puede ser refutada si aparece otra mejor»", c: 1 }
      ]
    },
    arche: {
      titulo: "Autor y arché",
      consigna: "Une cada autor con su principio.",
      pares: [["Tales", "El agua"], ["Anaximandro", "El ápeiron"], ["Anaxímenes", "El aire"], ["Pitágoras", "El número"], ["Heráclito", "El fuego"], ["Demócrito", "Átomos y vacío"]]
    },
    ordenatomo: {
      titulo: "De Parménides al átomo",
      consigna: "Ordena el razonamiento.",
      items: [
        { t: "Parménides: el no-ser no es, luego el cambio es imposible" },
        { t: "Los sentidos, sin embargo, muestran cambio y movimiento" },
        { t: "Demócrito: el ser verdadero (los átomos) es eterno e inmutable" },
        { t: "Pero existe el vacío, y en él los átomos se mueven" },
        { t: "Conclusión: el cambio es solo combinación de átomos" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 1",
      preguntas: [
        { q: "Aristóteles dice que los primeros filósofos buscaban sobre todo…", op: ["la causa material (de qué está hecho todo)", "la causa final (para qué existe todo)", "el bien moral", "la mejor forma de gobierno"], ok: 0, porque: "Para los presocráticos el arché es el material del que todo procede." },
        { q: "¿Qué característica distingue al logos del mito?", op: ["Que se puede discutir y justificar con razones", "Que no menciona nunca a los dioses", "Que es más breve", "Que se transmite por escrito"], ok: 0, porque: "La diferencia es el método (razones abiertas a crítica), no la ausencia total de lo divino." },
        { q: "Anaximandro propone el ápeiron porque…", op: ["un principio con cualidades concretas favorecería a un contrario", "no le gustaba el agua", "no conocía el aire", "quería un dios personal"], ok: 0, porque: "Si el principio fuera «frío», no daría lugar al «calor»; hace falta algo indeterminado." },
        { q: "La novedad de Anaxímenes es…", op: ["explicar el cambio con rarefacción y condensación", "afirmar que el arché es el fuego", "negar el cambio", "decir que todo es número"], ok: 0, porque: "El aire, más o menos apretado, da cosas distintas." },
        { q: "«Todo es número» significa que…", op: ["la realidad tiene estructura matemática y proporciones", "las cosas están hechas de cifras escritas", "solo existen los números pares", "hay que calcular para vivir"], ok: 0, porque: "El ejemplo clave es la armonía musical (1:2, 2:3, 3:4)." },
        { q: "Para Heráclito, el logos es…", op: ["la ley racional que ordena el cambio", "un dios con forma humana", "una ilusión de los sentidos", "otro nombre del agua"], ok: 0, porque: "El cambio no es caos: está regido por el logos." },
        { q: "Según Parménides, el cambio es imposible porque…", op: ["supondría pasar del no-ser al ser (o al revés), y el no-ser no es", "los átomos no se mueven", "los dioses lo impiden", "el mundo es agua"], ok: 0, porque: "Es el argumento central: sin no-ser no hay nacer ni morir." },
        { q: "El vacío en Demócrito…", op: ["existe y permite el movimiento de los átomos", "es una ilusión", "es un átomo muy pequeño", "es un dios"], ok: 0, porque: "Esta tesis es la ruptura con Parménides." },
        { q: "El atomismo es una síntesis porque…", op: ["conserva el ser eterno de Parménides y admite el cambio de Heráclito", "niega a ambos", "solo acepta a Heráclito", "solo acepta a Parménides"], ok: 0, porque: "Átomos inmutables (Parménides) que se combinan y mueven (Heráclito)." },
        { q: "La palabra «presocrático» indica que el autor…", op: ["es anterior a Sócrates en el tiempo o en el enfoque", "fue maestro de Sócrates", "vivió en Atenas", "negaba la razón"], ok: 0, porque: "Es una etiqueta cronológica (y de enfoque: la naturaleza, no el ser humano)." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta contiene una afirmación típicamente mal entendida. Elige la que es FALSA.",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Heráclito defendía que todo es caos sin ley alguna", "Heráclito habla de un logos que ordena el cambio", "El arché de Heráclito es el fuego", "Para Heráclito los opuestos forman una unidad"], ok: 0, porque: "El cambio de Heráclito está regido por el logos: no es caos." },
        { q: "¿Cuál es FALSA?", op: ["Parménides sostenía que los sentidos nos muestran la verdad del ser", "Parménides distinguía la vía de la verdad y la de la opinión", "Para Parménides el ser es inmóvil", "Parménides argumenta con el principio «el no-ser no es»"], ok: 0, porque: "Para él los sentidos dan opinión (dóxa), no verdad." },
        { q: "¿Cuál es FALSA?", op: ["Los atomistas pensaban que los átomos nacen y mueren", "Los átomos son eternos e indivisibles", "Hay vacío entre los átomos", "El alma, para Demócrito, está hecha de átomos"], ok: 0, porque: "Si nacieran y murieran romperían la exigencia de Parménides." },
        { q: "¿Cuál es FALSA?", op: ["El mito se distingue del logos porque los presocráticos negaron todo lo divino", "El logos busca explicaciones argumentadas", "Los milesios explicaban el mundo por causas naturales", "El mito se acepta sin pedir razones"], ok: 0, porque: "Siguieron hablando de lo divino; cambió el método." },
        { q: "¿Cuál es FALSA?", op: ["Tales es posterior a Parménides", "Tales es anterior a Heráclito", "Demócrito es posterior a Heráclito", "Anaximandro es posterior a Tales"], ok: 0, porque: "Tales (h. 624–546 a. C.) es mucho anterior a Parménides (h. 515–450 a. C.)." },
        { q: "¿Cuál es FALSA?", op: ["El ápeiron de Anaximandro es un elemento concreto, el agua", "El ápeiron es ilimitado e indeterminado", "Anaximandro razona que el origen no puede ser un contrario", "El ápeiron es un avance en abstracción"], ok: 0, porque: "El ápeiron es justo lo contrario de un elemento concreto." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas del tema 1",
      cartas: [
        { a: "Mito", b: "Relato tradicional de dioses que explica el mundo sin razones" },
        { a: "Logos", b: "Razón; explicación argumentada, abierta a crítica" },
        { a: "Arché", b: "Principio y origen de todo; lo que permanece bajo el cambio" },
        { a: "Tales", b: "Arché: el agua (Mileto, h. 624–546 a. C.)" },
        { a: "Anaximandro", b: "Arché: el ápeiron (lo indefinido); salto de abstracción" },
        { a: "Anaxímenes", b: "Arché: el aire; rarefacción y condensación" },
        { a: "Pitágoras", b: "«Todo es número»: la realidad tiene estructura matemática" },
        { a: "Heráclito", b: "Todo fluye; unidad de opuestos; logos; arché: fuego" },
        { a: "Parménides", b: "El ser es, el no-ser no es; cambio = apariencia" },
        { a: "Vía de la verdad / de la opinión", b: "Razón (ser inmóvil) frente a sentidos (cambio y multiplicidad)" },
        { a: "Zenón de Elea", b: "Discípulo de Parménides; paradojas contra el movimiento" },
        { a: "Empédocles", b: "Cuatro raíces y dos fuerzas: Amor y Odio" },
        { a: "Anaxágoras", b: "Semillas de todo en todo; el Nous ordena" },
        { a: "Demócrito", b: "Átomos y vacío; mecanicismo; conocimiento sensible = convención" }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  var N = [];     // lista
  function O(id, nv, enun, ops, ok, pasos, res, et) {
    N.push({ id: id, nivel: nv, enunciado: enun, check: { tipo: "opcion", etiqueta: et || "Tu respuesta", opciones: ops, ok: ok }, pasos: pasos, resultado: res || ops[ok] });
  }
  function M(id, nv, enun, campos, pasos, res) {   // varios campos de opción
    N.push({ id: id, nivel: nv, enunciado: enun, check: campos, pasos: pasos, resultado: res });
  }
  function C(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var VF = ["Verdadero", "Falso"];
  function V(id, nv, enun, ver, justif, ok, pasos, res) {   // verdadero/falso con justificación
    N.push({ id: id, nivel: nv, enunciado: enun,
      check: [C("¿Verdadero o falso?", VF, ver ? 0 : 1), C("Justificación", justif, ok)], pasos: pasos, resultado: res });
  }
  function R(id, enun, filas, items, pasos, res) {   // pregunta abierta con rúbrica
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("hf1", 1, "En el paso «del mito al logos», ¿qué significa <em>logos</em>?",
    ["Razón, palabra razonada", "Dios del trueno", "Relato sagrado heredado", "Número"], 0,
    ["Logos = razón, discurso razonado. Es lo que se opone al mito, que se acepta sin pedir razones."]);
  O("hf2", 1, "¿Cuál es el arché según Tales de Mileto?", ["El agua", "El aire", "El ápeiron", "El número"], 0,
    ["Tales: el agua (sólido, líquido, gas; condición de la vida)."]);
  M("hf3", 1, "Empareja cada autor con su principio.", [
    C("Anaximandro", ["Agua", "Ápeiron", "Aire", "Número"], 1),
    C("Anaxímenes", ["Agua", "Ápeiron", "Aire", "Número"], 2),
    C("Pitágoras", ["Agua", "Ápeiron", "Aire", "Número"], 3),
    C("Tales", ["Agua", "Ápeiron", "Aire", "Número"], 0)],
    ["Tales: agua · Anaximandro: ápeiron · Anaxímenes: aire · Pitágoras: número."], "Tales–agua, Anaximandro–ápeiron, Anaxímenes–aire, Pitágoras–número");
  O("hf4", 1, "¿Cuál es el arché de Heráclito?", ["El fuego", "El agua", "La tierra", "Los átomos"], 0,
    ["Heráclito: el fuego, símbolo de un proceso ordenado, no de una cosa fija."]);
  N.push({ id: "hf5", nivel: 1, enunciado: "Completa: Anaximandro propuso que el arché es el ______ (lo indefinido, lo ilimitado). Escribe el término griego.",
    check: { tipo: "texto", etiqueta: "Término =", valores: ["ápeiron", "apeiron"] },
    pasos: ["El término es «ápeiron»: lo sin límites, lo indeterminado."], resultado: "ápeiron" });
  N.push({ id: "hf6", nivel: 1, enunciado: "Completa: Parménides era de la ciudad de ______, en el sur de Italia.",
    check: { tipo: "texto", etiqueta: "Ciudad =", valores: ["Elea"] },
    pasos: ["Parménides de Elea; de ahí «eleatas» (Parménides, Zenón)."], resultado: "Elea" });
  O("hf7", 1, "¿Qué orden cronológico (de más antiguo a más moderno) es el correcto?",
    ["Tales → Heráclito → Parménides → Demócrito", "Demócrito → Tales → Heráclito → Parménides", "Heráclito → Tales → Demócrito → Parménides", "Parménides → Heráclito → Tales → Demócrito"], 0,
    ["Tales (h. 624–546), Heráclito (h. 540–480), Parménides (h. 515–450), Demócrito (h. 460–370)."], "Tales → Heráclito → Parménides → Demócrito");
  O("hf8", 1, "¿Cuál describe mejor un mito?",
    ["Relato tradicional protagonizado por dioses que se acepta sin pedir razones", "Explicación basada en observaciones y argumentos", "Una ley matemática", "Un tipo de poema sin dioses"], 0,
    ["El mito explica con relatos de dioses, sin argumentar: se acepta o se rechaza entero."]);
  O("hf9", 1, "La palabra «átomo» significa literalmente…", ["lo que no se puede dividir", "lo muy pequeño", "lo que nunca se mueve", "el origen de todo"], 0,
    ["a-tomos: sin corte, indivisible."]);
  O("hf10", 1, "¿Quién sostuvo que «el ser es y el no-ser no es»?", ["Parménides", "Heráclito", "Tales", "Anaxímenes"], 0,
    ["Es el principio del poema de Parménides."]);
  O("hf11", 1, "Los presocráticos son…", ["anteriores a Sócrates (o ajenos a su giro hacia el ser humano)", "discípulos directos de Sócrates", "posteriores a Platón", "autores de la Biblia"], 0,
    ["«Pre-socráticos»: antes de Sócrates (tema 2)."]);
  O("hf12", 1, "¿Dónde nace la filosofía griega, según la tradición?", ["En Jonia, en la costa de Asia Menor", "En Esparta", "En Roma", "En Egipto"], 0,
    ["Mileto y Éfeso, ciudades de Jonia, siglo VI a. C."]);
  O("hf13", 1, "Se asocia la expresión «todo fluye» a…", ["Heráclito", "Parménides", "Demócrito", "Pitágoras"], 0,
    ["Heráclito y el devenir (la fórmula «panta rhei» es de la tradición posterior)."]);
  O("hf14", 1, "¿Cuáles son los dos principios de la realidad para Demócrito?", ["Átomos y vacío", "Tierra y agua", "Amor y Odio", "Ser y no-ser sin materia"], 0,
    ["Átomos (lo lleno) y vacío (lo que permite el movimiento)."]);

  // ---- nivel 2
  V("hf15", 2, "«Para Heráclito el cambio es una apariencia de los sentidos.»", false, [
    "Al contrario: el cambio es la realidad más profunda y está regido por el logos",
    "Porque solo existe el agua",
    "Porque Heráclito niega la razón",
    "Porque coincide con Parménides"], 0,
    ["Es lo que defiende Parménides, no Heráclito.", "Heráclito: el devenir es lo real."], "Falso: el cambio es lo real para Heráclito");
  V("hf16", 2, "«Para Parménides los sentidos nos muestran la verdad sobre el ser.»", false, [
    "Los sentidos muestran cambio y multiplicidad, que son apariencia; la verdad la alcanza la razón",
    "Los sentidos nunca se equivocan",
    "Parménides solo confiaba en los dioses",
    "Porque el ser cambia"], 0,
    ["Para Parménides los sentidos dan opinión (dóxa)."], "Falso: engañan; manda la razón");
  V("hf17", 2, "«Los átomos de Demócrito nacen y mueren al combinarse.»", false, [
    "Son eternos e inmutables: lo que cambia son las combinaciones",
    "Son infinitamente divisibles",
    "Nacen del vacío",
    "Son dioses menores"], 0,
    ["Si nacieran de la nada, romperían la exigencia de Parménides."], "Falso: son eternos e indivisibles");
  V("hf18", 2, "«El ápeiron de Anaximandro es ilimitado e indeterminado.»", true, [
    "Así puede dar origen a todos los contrarios sin favorecer a ninguno",
    "Porque es una sustancia concreta como el agua",
    "Porque es el fuego, que lo consume todo",
    "Porque Anaximandro rechazaba toda explicación natural"], 0,
    ["Es justo su rasgo principal: ni frío ni caliente, ni húmedo ni seco."], "Verdadero: es indeterminado para originar todos los contrarios");
  O("hf19", 2, "¿Por qué la propuesta de Anaximandro es más abstracta que la de Tales?",
    ["Porque el principio no es una sustancia concreta, sino algo indeterminado del que salen todos los contrarios",
      "Porque usa más palabras", "Porque no habla del agua", "Porque cree en dioses distintos"], 0,
    ["Tales elige algo observable (agua).", "Anaximandro razona que un principio concreto favorecería a un contrario; elige lo indeterminado."]);
  O("hf20", 2, "«El camino hacia arriba y hacia abajo es uno y el mismo» ilustra…",
    ["la unidad de los opuestos", "la inmovilidad del ser", "los átomos y el vacío", "la mezcla de raíces de Empédocles"], 0,
    ["Los contrarios (arriba/abajo) son aspectos de lo mismo: tema de Heráclito."]);
  O("hf21", 2, "¿Por qué, para Parménides, es imposible el cambio?",
    ["Porque cambiar sería pasar del ser al no-ser o del no-ser al ser, y el no-ser no existe", "Porque los sentidos lo prohíben", "Porque los dioses no quieren", "Porque el vacío es infinito"], 0,
    ["Cambiar implica pasar por el no-ser, y del no-ser no se puede salir ni entrar."]);
  O("hf22", 2, "En el atomismo, ¿qué elemento permite explicar el movimiento (la parte de Heráclito)?",
    ["El vacío, donde los átomos se mueven", "El fuego", "El Nous", "El ápeiron"], 0,
    ["Sin vacío no habría lugar donde moverse."]);
  M("hf23", 2, "¿De quién es cada frase?", [
    C("«No te bañas dos veces en el mismo río.»", ["Heráclito", "Parménides", "Tales", "Demócrito"], 0),
    C("«Lo que es, es; y la nada no es.»", ["Heráclito", "Parménides", "Tales", "Demócrito"], 1),
    C("«El principio de todas las cosas es el agua.»", ["Heráclito", "Parménides", "Tales", "Demócrito"], 2),
    C("«En realidad, átomos y vacío.»", ["Heráclito", "Parménides", "Tales", "Demócrito"], 3)],
    ["Cada frase resume la tesis central de su autor."], "Heráclito, Parménides, Tales, Demócrito");
  M("hf24", 2, "¿Qué autor defiende cada posición?", [
    C("El cambio es la realidad más profunda", ["Heráclito", "Parménides", "Demócrito"], 0),
    C("El ser es uno, eterno e inmóvil", ["Heráclito", "Parménides", "Demócrito"], 1),
    C("Hay muchos seres eternos que se mueven en el vacío", ["Heráclito", "Parménides", "Demócrito"], 2)],
    ["Son las tres posiciones del problema ser–cambio."], "Heráclito · Parménides · Demócrito");
  O("hf25", 2, "¿Cómo explica Anaxímenes que de un mismo principio (el aire) salgan cosas distintas?",
    ["Por rarefacción y condensación", "Porque el aire es un dios", "Por el Amor y el Odio", "Por el vacío"], 0,
    ["Aire enrarecido: fuego. Aire condensado: viento, nubes, agua, tierra, piedra."]);
  O("hf26", 2, "«El arché es el número» (Pitágoras) significa sobre todo que…",
    ["la realidad tiene una estructura de proporciones matemáticas, como en la armonía musical", "las cosas son cifras escritas", "solo importan los números pares", "hay que contar para vivir"], 0,
    ["Cuerda: octava 1:2, quinta 2:3. El orden (cosmos) es numérico."]);
  O("hf27", 2, "En Empédocles, ¿qué explican el Amor y el Odio?",
    ["La unión y la separación de las cuatro raíces", "El origen de los dioses", "La verdad y la opinión", "El número y la forma"], 0,
    ["Amor une, Odio separa: así hay cambio sin que nada nazca de la nada."]);
  O("hf28", 2, "En Anaxágoras, ¿qué es el Nous?",
    ["Una inteligencia que ordena el caos inicial", "Un átomo", "El fuego", "Un nombre del vacío"], 0,
    ["Nous = mente, inteligencia ordenadora."]);
  O("hf29", 2, "¿Por qué Empédocles y Anaxágoras admiten varios elementos eternos?",
    ["Para explicar el cambio como mezcla y separación sin que nada surja de la nada", "Para negar toda explicación natural", "Para volver al mito", "Para defender el vacío"], 0,
    ["Respuesta intermedia tras Parménides: se acepta que el ser no nace, pero se salva el cambio con mezclas."]);

  // ---- nivel 3
  O("hf30", 3, "Un mecanicista explica un fenómeno diciendo que…",
    ["se produce por el choque y la combinación de materia según leyes necesarias, sin fines", "lo quiere un dios", "persigue un fin", "es una ilusión"], 0,
    ["Mecanicismo: causas materiales y necesarias, no finalidad."], null, "Tu respuesta");
  O("hf31", 3, "Texto: «Para los que entran en los mismos ríos, aguas distintas y distintas fluyen sobre ellos» (Heráclito). Su idea principal es…",
    ["que la realidad cambia continuamente, pero el río conserva una identidad (su ley, el logos)", "que el cambio es una ilusión", "que el agua es el arché", "que los ríos son dioses"], 0,
    ["Idea principal: devenir con identidad regida por el logos."]);
  O("hf32", 3, "Texto: «Lo mismo es pensar y ser» (Parménides, fr. 3). Su idea principal es…",
    ["que solo se puede pensar lo que existe, de modo que la razón accede al ser", "que los sentidos nos muestran el ser", "que todo fluye", "que el vacío existe"], 0,
    ["Racionalismo: pensamiento y ser coinciden; lo que no es, no se puede pensar."]);
  O("hf33", 3, "Texto: «Por convención el color, por convención lo dulce, por convención lo amargo; en realidad, átomos y vacío» (Demócrito). Su idea principal es…",
    ["que las cualidades sensibles son convención y lo real son átomos y vacío", "que todo es agua", "que los sentidos son la fuente de verdad", "que el ser es inmóvil"], 0,
    ["Dos planos de conocimiento: sentidos (convención) y razón (átomos y vacío)."]);
  O("hf34", 3, "¿Qué comparación entre Heráclito y Parménides es correcta?",
    ["Ambos dan a la razón la última palabra sobre la realidad, pero concluyen cosas opuestas sobre el cambio", "Ambos defienden que el cambio es una ilusión", "Ambos eligen el agua como arché", "Ambos fundan el atomismo"], 0,
    ["Coinciden en el método, difieren en la conclusión."]);
  O("hf35", 3, "¿Cómo reaparece la oposición Heráclito–Parménides en Platón (tema 3)?",
    ["El mundo sensible cambia (Heráclito) y el mundo de las Ideas es inmutable (Parménides)", "Platón es atomista", "Platón niega las Ideas", "Platón elige el fuego como arché"], 0,
    ["Platón concilia ambas posturas repartiendo la realidad en dos planos."]);
  O("hf36", 3, "Según Aristóteles, los presocráticos se interesaron sobre todo por…",
    ["la causa material", "la causa final", "la política", "la ética"], 0,
    ["Metafísica I: de qué están hechas las cosas."]);
  O("hf37", 3, "Encuentra el error (tema 1). ¿Cuál es FALSA?",
    ["Demócrito acepta de Parménides que los átomos, el ser verdadero, pueden nacer y morir", "Demócrito introduce el vacío", "Demócrito defiende átomos eternos", "Demócrito es materialista"], 0,
    ["Los átomos son eternos e inmutables; el movimiento está en las combinaciones en el vacío."]);
  O("hf38", 3, "Encuentra el error. ¿Cuál es FALSA?",
    ["Anaxímenes elige el aire por ser más abstracto que el ápeiron", "Anaxímenes explica el cambio por rarefacción y condensación", "Anaxímenes pertenece a la escuela de Mileto", "Anaxímenes es posterior a Anaximandro"], 0,
    ["El ápeiron es más abstracto que el aire, no al revés."]);
  O("hf39", 3, "Encuentra el error. ¿Cuál es FALSA?",
    ["Pitágoras escribió el poema de las dos vías", "Pitágoras fundó una comunidad en Crotona", "Los pitagóricos creían en la transmigración del alma", "Los pitagóricos vieron una estructura matemática en la música"], 0,
    ["El poema de las dos vías es de Parménides."]);

  R("hf40", "Explica el paso del mito al logos y por qué se considera el nacimiento de la filosofía. (Pregunta tipo PAU)", 8, [
    { t: "Define mito (relato tradicional de dioses, sin razones)", p: 0.4 },
    { t: "Define logos (explicación racional, argumentada, discutible)", p: 0.4 },
    { t: "Sitúa el cambio: Jonia, siglo VI a. C. (y alguna causa: comercio, polis, escritura)", p: 0.4 },
    { t: "Pone un ejemplo (Tales y el agua frente a Poseidón, u otro)", p: 0.4 },
    { t: "Explica que lo decisivo es el método (pedir razones), no la respuesta concreta", p: 0.4 }],
    ["Define los dos términos.", "Contexto: Jonia, polis, escritura, contacto con otras culturas.", "Ejemplo: Tales y el agua.", "Conclusión: nacimiento de la filosofía por el método."], "El paso del mito al logos sustituye el relato por la explicación argumentada");
  R("hf41", "Compara las posturas de Heráclito y Parménides sobre el cambio y explica el argumento de Parménides. (Pregunta tipo PAU)", 9, [
    { t: "Expone el devenir de Heráclito (todo fluye) y el logos como ley", p: 0.4 },
    { t: "Expone la tesis de Parménides (ser inmóvil; cambio = apariencia)", p: 0.4 },
    { t: "Explica el argumento: el no-ser no es → cambiar sería pasar por el no-ser → imposible", p: 0.5 },
    { t: "Contrapone el papel de los sentidos y de la razón (dóxa frente a alétheia)", p: 0.4 },
    { t: "Señala qué comparten (la razón por encima de la apariencia)", p: 0.3 }],
    ["Heráclito: devenir + logos.", "Parménides: ser inmóvil, argumento del no-ser.", "Sentidos y razón.", "Coincidencia: la razón manda."], "Heráclito, devenir; Parménides, ser inmóvil por el argumento del no-ser");
  R("hf42", "Explica por qué el atomismo de Demócrito se considera una síntesis de Heráclito y Parménides. (Pregunta tipo PAU)", 8, [
    { t: "Átomos eternos, indivisibles e inmutables (lo que pedía Parménides)", p: 0.5 },
    { t: "Admite el vacío como «no-ser» que existe y permite el movimiento", p: 0.5 },
    { t: "El cambio como combinación y separación de átomos (lo que pedía Heráclito)", p: 0.5 },
    { t: "Menciona mecanicismo / materialismo / determinismo", p: 0.25 },
    { t: "Distingue conocimiento sensible (convención) y racional (átomos y vacío)", p: 0.25 }],
    ["Qué conserva de Parménides.", "Qué cambia: el vacío.", "Qué conserva de Heráclito.", "Consecuencias."], "Átomos eternos + vacío: se conserva el ser y se explica el cambio");
  R("hf43", "Compara las respuestas de Tales, Anaximandro y Anaxímenes a la pregunta por el arché y explica el avance de cada una. (Pregunta tipo PAU)", 8, [
    { t: "Explica qué es el arché (principio y origen que permanece)", p: 0.4 },
    { t: "Tales: agua, con una razón observable; primera explicación natural", p: 0.4 },
    { t: "Anaximandro: ápeiron; un principio concreto favorecería a un contrario; más abstracto", p: 0.5 },
    { t: "Anaxímenes: aire; rarefacción y condensación como mecanismo", p: 0.5 },
    { t: "Concluye: de la sustancia concreta a la abstracta y al mecanismo", p: 0.2 }],
    ["Define arché.", "Tales → Anaximandro → Anaxímenes.", "Cada avance."], "Agua → ápeiron → aire con mecanismo");
  R("hf44", "Comenta este texto: «Es necesario decir y pensar que lo que es, es; pues es posible ser, y la nada no es» (Parménides, fr. 6). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el ser y el no-ser (la lógica del ser)", p: 0.3 },
    { t: "Idea principal: solo el ser es pensable y real; la nada no es", p: 0.4 },
    { t: "Relaciona con el autor: vía de la verdad, ser inmóvil, cambio = apariencia", p: 0.5 },
    { t: "Explica la consecuencia para los sentidos (dóxa) y la razón", p: 0.3 },
    { t: "Compara con Heráclito (devenir) o con Demócrito (vacío)", p: 0.4 },
    { t: "Contexto o valoración: primer racionalista; influencia en Platón", p: 0.1 }],
    ["Tema → idea principal → relación con el autor → comparación → valoración."], "Comentario de Parménides, fr. 6");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "El arché de cada autor", ancha: true,
      tabla: { cab: ["Autor", "Arché", "Clave"], filas: [
        ["Tales (h. 624–546)", "agua", "primera explicación natural"],
        ["Anaximandro (h. 610–546)", "ápeiron", "lo indefinido; salto de abstracción"],
        ["Anaxímenes (h. 585–525)", "aire", "rarefacción y condensación"],
        ["Pitágoras (h. 570–495)", "número", "estructura matemática; armonía"],
        ["Heráclito (h. 540–480)", "fuego", "devenir regido por el logos"],
        ["Parménides (h. 515–450)", "el ser", "uno, eterno, inmóvil"],
        ["Demócrito (h. 460–370)", "átomos y vacío", "mecanicismo"]
      ] } },
    { titulo: "Heráclito frente a Parménides", ancha: true,
      tabla: { cab: ["", "Heráclito", "Parménides"], filas: [
        ["Realidad", "devenir", "ser inmóvil"],
        ["Cambio", "lo real", "apariencia"],
        ["Sentidos", "muestran el cambio", "engañan"],
        ["Razón", "descubre el logos", "descubre el ser"]
      ] } },
    { titulo: "Argumento de Parménides",
      pasos: ["El ser es; el no-ser no es.", "No se puede pensar lo que no es.", "Cambiar es pasar por el no-ser.", "Luego el cambio es imposible.", "El ser es uno, eterno e inmóvil."],
      nota: "El atomista rompe en el paso 2: el vacío (no-ser) existe." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Heráclito: todo es caos", bien: "Todo cambia según el logos", por: "Hay una ley." },
        { mal: "Los átomos nacen y mueren", bien: "Son eternos; cambian las combinaciones", por: "Condición de Parménides." },
        { mal: "Los presocráticos negaron lo divino", bien: "Cambió el método, no desapareció lo divino", por: "Heráclito y Pitágoras hablan de lo divino." }
      ] }
  ];

  B.registrar("historia_fil", "t1", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf1a.secciones,
    nuevas: B.parte.hf1a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
