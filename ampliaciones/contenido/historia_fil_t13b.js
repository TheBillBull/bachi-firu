/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 13 (parte B): Marx
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t13.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Marx (1818–1883) quiere <b>transformar</b> el mundo, no solo interpretarlo: su filosofía nace de la miseria obrera de la revolución industrial.",
    "El <b>materialismo histórico</b> explica la historia por el modo de producción: la <b>infraestructura</b> económica condiciona la <b>superestructura</b> (derecho, Estado, ideas).",
    "La historia es <b>lucha de clases</b>; en el capitalismo, la burguesía obtiene la <b>plusvalía</b> del trabajo del proletariado, que sufre <b>alienación</b>.",
    "La <b>revolución</b> proletaria llevaría, tras una etapa de transición, a una sociedad <b>comunista</b> sin clases."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Marx · 1818–1883",
    autores: [{ n: "Karl Marx", f: "1818–1883", l: "Tréveris; exiliado en París, Bruselas y Londres" }],
    obras: ["Manuscritos económico-filosóficos (1844)", "Tesis sobre Feuerbach (1845)", "La ideología alemana (1845–1846)", "Manifiesto del Partido Comunista (1848, con Engels)", "Prefacio a la Contribución a la crítica de la economía política (1859)", "El capital, libro I (1867)"],
    bloques: [
      { t: "Contexto y punto de partida", frases: ["Revolución industrial: obreros miserables, fábricas y burguesía enriquecida.", "Parte de <b>Hegel</b> (dialéctica) y de <b>Feuerbach</b> (materialismo, crítica de la religión).", "Tesis XI: de lo que se trata es de <b>transformar</b> el mundo."],
        tabla: { cab: ["Hegel", "Feuerbach"], filas: [["idealista: el Espíritu mueve la historia", "materialista, pero contemplativo"], ["Estado como razón universal", "esencia humana abstracta"]] } },
      { t: "Materialismo histórico", frases: ["La vida material (producción) explica la historia, no las ideas.", "<b>Fuerzas productivas</b> y <b>relaciones de producción</b> forman el modo de producción.", "Su choque provoca revoluciones: esclavismo, feudalismo, capitalismo."] },
      { t: "Infraestructura y superestructura", frases: ["La base económica condiciona el derecho, el Estado y las ideas.", "<b>Ideología</b>: ideas que ocultan los intereses de la clase dominante.", "La religión es «opio del pueblo»: consuela sin transformar."],
        tabla: { cab: ["Infraestructura", "Superestructura"], filas: [["fuerzas y relaciones de producción", "derecho, Estado, religión, moral, arte"], ["propiedad de los medios de producción", "legitima el orden existente"]] } },
      { t: "Lucha de clases", frases: ["Clase = lugar respecto a los medios de producción.", "<b>Burguesía</b> (posee) frente a <b>proletariado</b> (solo fuerza de trabajo).", "El proletariado, al liberarse, libera a toda la sociedad."] },
      { t: "Alienación y plusvalía", frases: ["Alienación: el obrero se vuelve extraño a su trabajo.", "Plusvalía = valor creado por el trabajo − salario.", "El beneficio capitalista nace del trabajo no pagado."],
        tabla: { cab: ["Alienación respecto a…", "Significa"], filas: [["el producto", "no le pertenece"], ["la actividad", "trabajo forzado"], ["el ser genérico", "pierde su esencia creativa"], ["los otros", "competencia y enfrentamiento"]] } },
      { t: "Comunismo y valoración", frases: ["Revolución, dictadura del proletariado y comunismo sin clases.", "Se supera la alienación al abolir la propiedad privada de los medios.", "Límites: determinismo y aplicaciones del siglo XX."] }
    ],
    resumen: [
      "El <b>modo de producción</b> condiciona toda la vida social: «el ser social determina la conciencia».",
      "La historia avanza por <b>lucha de clases</b> y contradicciones entre fuerzas y relaciones de producción.",
      "El capitalismo se basa en la <b>plusvalía</b> y produce <b>alienación</b>.",
      "La meta es una sociedad <b>sin clases</b>, donde el trabajo vuelve a ser libre."
    ],
    conecta: [
      { con: "Hegel y Feuerbach:", rel: "Marx toma la dialéctica y la crítica de la religión, pero las invierte." },
      { con: "Platón y Aristóteles (T3–T4):", rel: "frente al idealismo platónico, Marx parte de la vida material." },
      { con: "Rousseau (T11):", rel: "comparten la crítica a la propiedad privada y la desigualdad." },
      { con: "Kant (T12):", rel: "frente a la moral autónoma, Marx ve la moral condicionada por la clase." },
      { con: "Nietzsche (T14):", rel: "ambos sospechan de la moral y la religión dominantes." }
    ],
    claves: [
      ["Materialismo histórico", "la historia se explica por las condiciones materiales de producción"],
      ["Praxis", "actividad práctica que une pensamiento y transformación del mundo"],
      ["Fuerzas productivas", "medios de producción, fuerza de trabajo y técnica"],
      ["Relaciones de producción", "relaciones entre personas según la propiedad de los medios"],
      ["Infraestructura / superestructura", "base económica frente a derecho, Estado e ideas"],
      ["Ideología", "ideas que presentan los intereses de una clase como universales"],
      ["Lucha de clases", "enfrentamiento entre quienes poseen los medios y quienes no"],
      ["Alienación", "el trabajador se vuelve ajeno a su trabajo, producto y esencia"],
      ["Plusvalía", "diferencia entre el valor que crea el trabajo y el salario"],
      ["Comunismo", "sociedad sin clases ni propiedad privada de los medios de producción"]
    ],
    cita: { txt: "Los filósofos no han hecho más que interpretar el mundo de diversas maneras; de lo que se trata es de transformarlo.", autor: "Marx", obra: "Tesis sobre Feuerbach, XI (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    infraestructura: {
      titulo: "¿Infraestructura o superestructura?",
      consigna: "Toca cada elemento y después el nivel del «edificio» social al que pertenece, según Marx.",
      categorias: ["Infraestructura", "Superestructura"],
      items: [
        { t: "Una fábrica con sus máquinas", c: 0 },
        { t: "La Constitución del país", c: 1 },
        { t: "El contrato de trabajo asalariado", c: 0 },
        { t: "La religión dominante", c: 1 },
        { t: "Quién posee la tierra", c: 0 },
        { t: "La moral de la época", c: 1 },
        { t: "Los conocimientos técnicos para producir", c: 0 },
        { t: "La ley que protege la propiedad privada", c: 1 },
        { t: "El sistema educativo y sus ideas", c: 1 },
        { t: "La fuerza de trabajo de los obreros", c: 0 }
      ]
    },
    quien: {
      titulo: "¿Hegel, Feuerbach o Marx?",
      consigna: "Toca cada idea y después el autor al que corresponde.",
      categorias: ["Hegel", "Feuerbach", "Marx"],
      items: [
        { t: "La historia es el despliegue del Espíritu", c: 0 },
        { t: "El Estado representa el interés universal", c: 0 },
        { t: "Su dialéctica es idealista", c: 0 },
        { t: "Dios es una proyección de la esencia humana", c: 1 },
        { t: "Su materialismo es contemplativo", c: 1 },
        { t: "Su «hombre» es un individuo abstracto", c: 1 },
        { t: "El ser social determina la conciencia", c: 2 },
        { t: "De lo que se trata es de transformar el mundo", c: 2 },
        { t: "La historia se explica por el modo de producción", c: 2 }
      ]
    },
    alienacion: {
      titulo: "Los cuatro aspectos de la alienación",
      consigna: "Une cada aspecto con su descripción.",
      pares: [["Respecto al producto", "Lo que fabrica no le pertenece"], ["Respecto a la actividad", "El trabajo es forzado: solo un medio para sobrevivir"], ["Respecto al ser genérico", "Pierde su capacidad de trabajar libre y creativamente"], ["Respecto a los otros", "Los trabajadores compiten y se enfrentan a quien los emplea"]]
    },
    modos: {
      titulo: "Los modos de producción",
      consigna: "Ordena las etapas de la historia según Marx, de la más antigua a la futura.",
      items: [
        { t: "Comunismo primitivo: propiedad común, sin clases" },
        { t: "Esclavista: amos y esclavos" },
        { t: "Feudal: señores y siervos" },
        { t: "Capitalista: burguesía y proletariado" },
        { t: "Sociedad comunista: sin clases" }
      ]
    },
    caminocomunismo: {
      titulo: "Del capitalismo al comunismo",
      consigna: "Ordena los pasos del camino que sugiere Marx.",
      items: [
        { t: "Contradicciones y crisis del capitalismo" },
        { t: "Revolución del proletariado" },
        { t: "Dictadura del proletariado (transición)" },
        { t: "Fase inferior del comunismo: a cada cual según su trabajo" },
        { t: "Fase superior: a cada cual según sus necesidades" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 13",
      preguntas: [
        { q: "Marx nació en…", op: ["Tréveris", "Londres", "París", "Berlín"], ok: 0, porque: "Nació en Tréveris (Renania) en 1818 y murió en Londres en 1883." },
        { q: "La tesis XI sobre Feuerbach dice que los filósofos…", op: ["han interpretado el mundo y de lo que se trata es de transformarlo", "deben dedicarse a la contemplación", "ya han transformado el mundo", "no deben ocuparse de la política"], ok: 0, porque: "Es la unión de teoría y praxis." },
        { q: "El Manifiesto del Partido Comunista (1848) lo firmó Marx junto con…", op: ["Engels", "Hegel", "Feuerbach", "Rousseau"], ok: 0, porque: "Friedrich Engels (1820–1895) fue su colaborador de toda la vida." },
        { q: "La infraestructura es…", op: ["la base económica: fuerzas y relaciones de producción", "el derecho y el Estado", "la religión y la moral", "las ideas de la clase dominante"], ok: 0, porque: "Lo demás es superestructura." },
        { q: "Según Marx, la ideología…", op: ["presenta los intereses de una clase como universales", "es una ciencia neutral", "es solo la religión", "no depende de la clase social"], ok: 0, porque: "Oculta la explotación y legitima el orden existente." },
        { q: "El proletariado es la clase que…", op: ["solo posee su fuerza de trabajo", "posee las fábricas", "posee la tierra", "gobierna siempre"], ok: 0, porque: "Para vivir debe vender su fuerza de trabajo por un salario." },
        { q: "La plusvalía es…", op: ["la diferencia entre el valor creado por el trabajo y el salario", "el salario mínimo", "un impuesto del Estado", "el precio de la maquinaria"], ok: 0, porque: "Es el trabajo no pagado que se queda el capitalista." },
        { q: "Marx critica a Hegel porque su filosofía es…", op: ["idealista", "materialista", "empirista", "escéptica"], ok: 0, porque: "Pone las ideas (el Espíritu) como motor de la historia." },
        { q: "Marx critica a Feuerbach porque su materialismo es…", op: ["contemplativo y no ve la práctica social", "demasiado histórico", "demasiado religioso", "dialéctico"], ok: 0, porque: "Su «hombre» es abstracto y no ve las relaciones sociales." },
        { q: "El objetivo final del proceso histórico según Marx es…", op: ["una sociedad sin clases", "el triunfo de la burguesía", "un Estado absoluto", "la vuelta al feudalismo"], ok: 0, porque: "El comunismo acaba con las clases y con la alienación." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Marx es FALSA?", op: ["Para Marx las ideas no influyen nunca en la historia", "Para Marx la base económica condiciona las ideas", "Marx pidió unir teoría y praxis", "Marx escribió El capital"], ok: 0, porque: "Marx no niega la influencia de las ideas; dice que no explican la historia por sí solas (y Engels lo matizó)." },
        { q: "¿Cuál de estas afirmaciones sobre la superestructura es FALSA?", op: ["Incluye las relaciones de producción", "Incluye el derecho y el Estado", "Incluye la religión", "Se levanta sobre la infraestructura"], ok: 0, porque: "Las relaciones de producción son infraestructura." },
        { q: "¿Cuál de estas afirmaciones sobre la plusvalía es FALSA?", op: ["Es un robo ilegal que el capitalista comete", "Nace del trabajo no pagado", "Es la fuente del beneficio capitalista", "Es compatible con que el obrero cobre lo pactado"], ok: 0, porque: "Marx muestra que existe incluso con un intercambio «justo» según el mercado." },
        { q: "¿Cuál de estas afirmaciones sobre la dialéctica es FALSA?", op: ["Marx basa su teoría en la fórmula tesis–antítesis–síntesis", "Marx habla de contradicciones entre fuerzas y relaciones de producción", "Marx toma la dialéctica de Hegel", "Marx dice que Hegel la tiene «cabeza abajo»"], ok: 0, porque: "La fórmula tesis–antítesis–síntesis no es de Marx ni de Hegel." },
        { q: "¿Cuál de estas afirmaciones sobre la alienación es FALSA?", op: ["La causa es la naturaleza humana, que es egoísta", "Se da respecto al producto, la actividad, el ser genérico y los otros", "Su raíz es la propiedad privada de los medios de producción", "Se supera en una sociedad sin clases"], ok: 0, porque: "Para Marx la causa es social y económica, no una naturaleza egoísta." },
        { q: "¿Cuál de estas afirmaciones sobre la religión es FALSA?", op: ["Para Marx la religión es la base económica de la sociedad", "Es «el opio del pueblo» en su sentido de consuelo", "Es «el suspiro de la criatura oprimida»", "Forma parte de la superestructura"], ok: 0, porque: "La religión es superestructura, no base." },
        { q: "¿Cuál de estas afirmaciones sobre el comunismo es FALSA?", op: ["Marx lo identificaba con el régimen de la URSS", "Es una sociedad sin clases", "Prevé una etapa de transición", "Busca superar la alienación"], ok: 0, porque: "La URSS fue una aplicación política del siglo XX, no la teoría de Marx." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Marx nació antes que Hegel", "Hegel murió en 1831", "Feuerbach publicó La esencia del cristianismo en 1841", "Marx murió en 1883"], ok: 0, porque: "Hegel (1770–1831) nació antes que Marx (1818–1883)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Marx",
      cartas: [
        { a: "Materialismo histórico", b: "La historia se explica por las condiciones materiales de producción, no por las ideas." },
        { a: "Praxis", b: "Actividad práctica que une pensamiento y transformación de la realidad." },
        { a: "Fuerzas productivas", b: "Medios de producción, fuerza de trabajo y conocimientos técnicos." },
        { a: "Relaciones de producción", b: "Relaciones entre las personas al producir; sobre todo, quién posee los medios." },
        { a: "Modo de producción", b: "Combinación de fuerzas y relaciones de producción propia de cada época." },
        { a: "Infraestructura", b: "Base económica de la sociedad: fuerzas y relaciones de producción." },
        { a: "Superestructura", b: "Derecho, Estado, religión, moral, arte y filosofía, sobre la base económica." },
        { a: "Ideología", b: "Ideas que presentan los intereses de la clase dominante como universales." },
        { a: "Burguesía", b: "Clase propietaria de los medios de producción en el capitalismo." },
        { a: "Proletariado", b: "Clase que solo posee su fuerza de trabajo y la vende por un salario." },
        { a: "Lucha de clases", b: "Motor de la historia: enfrentamiento entre clases con intereses opuestos." },
        { a: "Alienación", b: "El trabajador se vuelve extraño a su producto, su actividad, su esencia y los demás." },
        { a: "Plusvalía", b: "Valor creado por el trabajo que excede al salario; se lo queda el capitalista." },
        { a: "Dictadura del proletariado", b: "Etapa de transición: dominio de la clase obrera antes del comunismo." },
        { a: "Comunismo", b: "Sociedad sin clases ni propiedad privada de los medios de producción." },
        { a: "Tesis XI", b: "«De lo que se trata es de transformar el mundo» (Tesis sobre Feuerbach, 1845)." }
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
  O("ma1", 1, "¿Dónde nació Marx?", ["Tréveris", "Londres", "París", "Königsberg"],
    ["Nació en Tréveris (Renania) en 1818 y murió en Londres en 1883."]);
  O("ma2", 1, "¿En qué año se publicó el <i>Manifiesto del Partido Comunista</i>?", ["1848", "1844", "1859", "1867"],
    ["Es de 1848, escrito con Engels, el año de las revoluciones europeas."]);
  O("ma3", 1, "¿Con quién escribió Marx el <i>Manifiesto</i>?", ["Friedrich Engels", "Hegel", "Feuerbach", "Rousseau"],
    ["Engels (1820–1895) fue su amigo y colaborador de toda la vida."]);
  T("ma4", 1, "Completa: la base económica de la sociedad se llama ______.", "Término =", ["infraestructura"],
    ["Sobre ella se levanta la superestructura."], "infraestructura");
  O("ma5", 1, "La tesis XI sobre Feuerbach dice que de lo que se trata es de…", ["transformar el mundo", "interpretar el mundo", "contemplar el mundo", "huir del mundo"],
    ["Une teoría y praxis."]);
  M("ma6", 1, "Empareja cada obra con su año.", [
    C("Manuscritos económico-filosóficos", ["1844", "1848", "1859", "1867"], 0),
    C("Manifiesto del Partido Comunista", ["1844", "1848", "1859", "1867"], 1),
    C("Prefacio a la Contribución a la crítica de la economía política", ["1844", "1848", "1859", "1867"], 2),
    C("El capital, libro I", ["1844", "1848", "1859", "1867"], 3)],
    ["Manuscritos: 1844; Manifiesto: 1848; Prefacio: 1859; El capital I: 1867."], "1844, 1848, 1859, 1867");
  O("ma7", 1, "¿Cuáles son las dos clases enfrentadas en el capitalismo?", ["Burguesía y proletariado", "Señores y siervos", "Amos y esclavos", "Nobles y clero"],
    ["Señores y siervos eran del feudalismo; amos y esclavos, de la Antigüedad."]);
  T("ma8", 1, "Completa: «alienación» viene del latín <i>alienus</i>, que significa ______.", "Término =", ["ajeno", "extraño"],
    ["El trabajador se vuelve ajeno a su trabajo y a su producto."], "ajeno");
  O("ma9", 1, "¿Qué es la plusvalía?", ["La diferencia entre el valor creado por el trabajo y el salario", "El sueldo del obrero", "El impuesto de la burguesía", "El precio de las máquinas"],
    ["Es trabajo no pagado que se queda el capitalista."]);
  O("ma10", 1, "¿Cuál de estas es superestructura?", ["El derecho", "Las fábricas", "Las máquinas", "La fuerza de trabajo"],
    ["Derecho, Estado, religión, moral, arte y filosofía son superestructura."]);
  O("ma11", 1, "¿Cuál es la obra económica principal de Marx?", ["El capital", "El Manifiesto", "Las Tesis sobre Feuerbach", "La ideología alemana"],
    ["El libro I se publicó en 1867."]);
  M("ma12", 1, "Empareja cada concepto con su definición.", [
    C("Fuerzas productivas", ["Medios de producción, fuerza de trabajo y técnica", "Relaciones entre personas según la propiedad de los medios", "Combinación de ambas en una época"], 0),
    C("Relaciones de producción", ["Medios de producción, fuerza de trabajo y técnica", "Relaciones entre personas según la propiedad de los medios", "Combinación de ambas en una época"], 1),
    C("Modo de producción", ["Medios de producción, fuerza de trabajo y técnica", "Relaciones entre personas según la propiedad de los medios", "Combinación de ambas en una época"], 2)],
    ["El modo de producción junta fuerzas y relaciones de producción."], "fuerzas, relaciones, modo");
  O("ma13", 1, "¿Qué sostiene Feuerbach sobre la religión?", ["Que Dios es una proyección de la esencia humana", "Que Dios creó al ser humano", "Que la religión es la base de la economía", "Que la religión es una ciencia"],
    ["<i>La esencia del cristianismo</i> (1841)."]);
  O("ma14", 1, "El resultado final del proceso histórico según Marx es…", ["una sociedad comunista sin clases", "una monarquía absoluta", "el triunfo definitivo de la burguesía", "una sociedad feudal"],
    ["Sin clases y sin propiedad privada de los medios de producción."]);

  // ---- nivel 2
  V("ma15", 2, "«Para Marx las ideas no influyen nunca en la historia.»", false, [
    "Es falso: dice que la base económica condiciona las ideas, no que carezcan de efecto", "Es falso: Marx pensaba que solo las ideas importan", "Es verdad: por eso es materialista", "Es verdad: Engels lo defendió siempre"],
    ["Engels aclaró que la superestructura influye de vuelta sobre la base."]);
  V("ma16", 2, "«El derecho y el Estado forman parte de la superestructura.»", true, [
    "Es verdad: se levantan sobre la base económica y suelen legitimarla", "Es verdad: porque son la base de la producción", "Es verdad: porque son fuerzas productivas", "Es verdad: porque no dependen de la economía"],
    ["La superestructura incluye derecho, Estado y formas de conciencia."]);
  V("ma17", 2, "«El proletariado es la clase que posee los medios de producción.»", false, [
    "Es falso: solo posee su fuerza de trabajo, que vende por un salario", "Es falso: no existe en el capitalismo", "Es verdad: posee las fábricas", "Es verdad: posee la tierra"],
    ["Los medios de producción son de la burguesía."]);
  V("ma18", 2, "«Marx considera que la plusvalía es un robo ilegal.»", false, [
    "Es falso: existe incluso cuando el obrero cobra lo pactado", "Es falso: Marx niega que exista plusvalía", "Es verdad: el capitalista incumple siempre la ley", "Es verdad: el obrero no recibe nada"],
    ["La explotación se produce dentro de las reglas del mercado."]);
  V("ma19", 2, "«Marx critica a Hegel por ser idealista.»", true, [
    "Es verdad: para Hegel el Espíritu mueve la historia; Marx pone la vida material", "Es verdad: porque Hegel era empirista", "Es verdad: porque Hegel negaba la dialéctica", "Es verdad: porque Hegel era materialista"],
    ["Marx conserva la dialéctica, pero «la pone sobre sus pies»."]);
  V("ma20", 2, "«Para Marx, la esencia humana es algo abstracto que posee cada individuo aislado.»", false, [
    "Es falso: es el conjunto de las relaciones sociales", "Es falso: no existe esencia humana de ningún tipo", "Es verdad: lo dice la tesis VI", "Es verdad: coincide con Feuerbach"],
    ["Tesis VI sobre Feuerbach (paráfrasis)."]);
  V("ma21", 2, "«Para Marx la raíz de la alienación económica es la propiedad privada de los medios de producción.»", true, [
    "Es verdad: por eso solo se supera aboliendo esa propiedad", "Es verdad: porque el ser humano es egoísta por naturaleza", "Es verdad: porque la técnica es mala", "Es verdad: porque el trabajo es siempre un castigo"],
    ["No basta con cambiar de actitud."]);
  O("ma22", 2, "¿Qué modo de producción sigue al feudal en la secuencia clásica?", ["El capitalista", "El esclavista", "El comunismo primitivo", "El comunismo"],
    ["Orden: primitivo, esclavista, feudal, capitalista y, en el futuro, comunista."]);
  O("ma23", 2, "La alienación respecto al producto consiste en que…", ["lo que fabrica el obrero no le pertenece", "el trabajo es forzado", "pierde su capacidad creativa", "compite con sus compañeros"],
    ["Las otras opciones son la alienación respecto a la actividad, al ser genérico y a los otros."]);
  O("ma24", 2, "¿Qué crítica hace Marx al materialismo de Feuerbach?", ["Que es contemplativo y no considera la práctica social", "Que es demasiado dialéctico", "Que es idealista", "Que es demasiado histórico"],
    ["Tesis sobre Feuerbach (1845)."]);
  O("ma25", 2, "La religión como «opio del pueblo» significa que…", ["consuela de una miseria real y la hace soportable sin cambiarla", "es una droga que prohíbe el Estado", "es la causa de la pobreza", "es la base económica"],
    ["El opio de la época calmaba el dolor."]);
  O("ma26", 2, "¿Cuál es la afirmación correcta sobre la fórmula «tesis–antítesis–síntesis»?", ["No es una fórmula de Marx", "Es la fórmula central de El capital", "Está en las Tesis sobre Feuerbach", "La inventó Engels en 1848"],
    ["Marx habla de contradicciones reales (entre clases, entre fuerzas y relaciones de producción)."]);
  O("ma27", 2, "Según Marx, ¿qué provoca el paso de un modo de producción a otro?", ["La contradicción entre fuerzas productivas y relaciones de producción", "El cambio de ideas de los filósofos", "La voluntad de un gran personaje", "La religión"],
    ["Prefacio de 1859."]);
  O("ma28", 2, "La ideología es…", ["un conjunto de ideas que presentan los intereses de una clase como universales", "una ciencia neutral", "la base económica", "el conjunto de las fábricas"],
    ["Oculta la explotación y legitima el orden existente."]);
  O("ma29", 2, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Hegel → Feuerbach → Marx", "Feuerbach → Hegel → Marx", "Marx → Hegel → Feuerbach", "Hegel → Marx → Feuerbach"],
    ["Hegel (1770), Feuerbach (1804), Marx (1818)."], "Hegel → Feuerbach → Marx");
  O("ma30", 2, "«Dictadura del proletariado» significa…", ["dominio transitorio de la clase obrera antes del comunismo", "gobierno de un solo dictador", "dominio permanente de la burguesía", "ausencia de Estado desde el primer día"],
    ["«Dictadura» se refiere al dominio de una clase, no al régimen de una persona."]);
  T("ma31", 2, "Completa: lo que vende el obrero al capitalista es su ______ de trabajo.", "Término =", ["fuerza"],
    ["Es una mercancía especial: al usarla crea más valor del que cuesta."], "fuerza");

  // ---- nivel 3
  O("ma32", 3, "Texto: «Los filósofos no han hecho más que interpretar el mundo de diversas maneras; de lo que se trata es de transformarlo» (<i>Tesis sobre Feuerbach</i>, XI; traducción habitual). Su idea principal es…",
    ["que la filosofía debe unirse a la práctica para cambiar la realidad", "que la filosofía es inútil", "que hay que dejar de pensar", "que el mundo ya está transformado"],
    ["Es la tesis de la praxis."]);
  O("ma33", 3, "Texto: «No es la conciencia del hombre la que determina su ser, sino, por el contrario, el ser social es el que determina su conciencia» (<i>Prefacio</i>, 1859; traducción habitual). Su idea principal es…",
    ["que las condiciones materiales y sociales condicionan las ideas", "que las ideas crean la realidad social", "que cada individuo decide su conciencia", "que el ser social no existe"],
    ["Inversión del idealismo."]);
  O("ma34", 3, "Texto: «La historia de todas las sociedades hasta nuestros días es la historia de la lucha de clases» (<i>Manifiesto</i>, 1848; traducción habitual). Su idea principal es…",
    ["que el conflicto entre clases es el motor de la historia", "que la historia la hacen los grandes personajes", "que la historia carece de sentido", "que las clases nunca se enfrentan"],
    ["Amos y esclavos, señores y siervos, burguesía y proletariado."]);
  O("ma35", 3, "Una alumna afirma: «para Marx, el Estado es un árbitro neutral entre las clases». ¿Qué matiz es el correcto?",
    ["Para Marx el Estado suele ser instrumento de la clase dominante", "Tiene razón: lo dice el Manifiesto", "Para Marx el Estado no existe", "Para Marx el Estado es la base económica"],
    ["Es parte de la superestructura y protege los intereses de quien posee los medios de producción."]);
  M("ma36", 3, "Empareja cada aspecto de la alienación con su descripción.", [
    C("Respecto al producto", ["Lo fabricado pertenece al capitalista", "El trabajo es forzado y solo un medio de vida", "Se pierde la capacidad de trabajar libre y creativamente", "Los trabajadores compiten entre sí"], 0),
    C("Respecto a la actividad", ["Lo fabricado pertenece al capitalista", "El trabajo es forzado y solo un medio de vida", "Se pierde la capacidad de trabajar libre y creativamente", "Los trabajadores compiten entre sí"], 1),
    C("Respecto al ser genérico", ["Lo fabricado pertenece al capitalista", "El trabajo es forzado y solo un medio de vida", "Se pierde la capacidad de trabajar libre y creativamente", "Los trabajadores compiten entre sí"], 2),
    C("Respecto a los otros", ["Lo fabricado pertenece al capitalista", "El trabajo es forzado y solo un medio de vida", "Se pierde la capacidad de trabajar libre y creativamente", "Los trabajadores compiten entre sí"], 3)],
    ["Los cuatro aspectos de los <i>Manuscritos</i> de 1844."], "producto, actividad, ser genérico, otros");
  var ops37 = ["El Espíritu mueve la historia", "Dios es proyección de la esencia humana", "El ser social determina la conciencia", "La propiedad privada origina la desigualdad", "La razón se da a sí misma la ley moral"];
  M("ma37", 3, "Empareja cada autor con su idea.", [
    C("Hegel", ops37, 0), C("Feuerbach", ops37, 1), C("Marx", ops37, 2), C("Rousseau", ops37, 3), C("Kant", ops37, 4)],
    ["Cada autor, una idea distinta."], "Hegel, Feuerbach, Marx, Rousseau, Kant");
  O("ma38", 3, "Una jornada dura 10 horas y cada hora de trabajo crea 12 € de valor. El salario diario es de 48 €. ¿Cuál es la plusvalía diaria?",
    ["72 €", "48 €", "120 €", "60 €"],
    ["Valor creado: 10 × 12 = 120 €.", "Plusvalía = 120 − 48 = 72 €; tasa de plusvalía = 72/48 = 150 %."], "72 €");
  O("ma39", 3, "En el caso anterior (10 horas, 12 € por hora, salario de 48 €), ¿cuántas horas trabaja gratis el obrero?",
    ["6 horas", "4 horas", "5 horas", "10 horas"],
    ["Trabajo necesario: 48/12 = 4 horas.", "Plustrabajo: 10 − 4 = 6 horas."], "6 horas");
  O("ma40", 3, "¿En qué se diferencia Marx de Rousseau al criticar la propiedad privada?",
    ["Rousseau la critica en clave moral y política; Marx la analiza con la economía y la lucha de clases", "Rousseau la defiende y Marx la critica", "Marx la defiende como derecho natural", "No hay ninguna diferencia"],
    ["Ambos critican la propiedad como origen de la desigualdad, pero con métodos distintos."]);
  O("ma41", 3, "¿Qué matiz añadió Engels al materialismo histórico?",
    ["Que la economía es determinante «en última instancia» y la superestructura influye de vuelta", "Que la economía no importa", "Que solo cuentan las ideas", "Que la historia no tiene leyes"],
    ["Cartas de 1890 (paráfrasis)."]);
  R("ma42", "Explica el materialismo histórico de Marx: fuerzas y relaciones de producción, infraestructura y superestructura. Valóralo críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Define el materialismo histórico (la historia se explica por la producción material, no por las ideas)", p: 0.4 },
    { t: "Distingue fuerzas productivas, relaciones de producción y modo de producción", p: 0.4 },
    { t: "Explica infraestructura y superestructura y su relación (condiciona)", p: 0.4 },
    { t: "Explica el cambio histórico: contradicciones, revoluciones y modos de producción", p: 0.4 },
    { t: "Relaciona con la crítica a Hegel y Feuerbach", p: 0.2 },
    { t: "Valora (determinismo, matiz de Engels)", p: 0.2 }],
    ["Definición.", "Fuerzas, relaciones y modo.", "Infra y superestructura.", "Cambio histórico.", "Relación con Hegel y Feuerbach.", "Valoración."], "La vida material explica la historia");
  R("ma43", "Explica la alienación en Marx: sus cuatro aspectos, su causa y su superación. Relaciónala con Hegel y Feuerbach. (Pregunta tipo PAU)", 9, [
    { t: "Define la alienación (el trabajador se vuelve ajeno a su trabajo)", p: 0.4 },
    { t: "Explica los cuatro aspectos: producto, actividad, ser genérico y otros", p: 0.6 },
    { t: "Explica la causa: propiedad privada y división del trabajo", p: 0.4 },
    { t: "Explica la superación: sociedad sin clases", p: 0.3 },
    { t: "Relaciona con Hegel y Feuerbach (alienación religiosa y económica)", p: 0.3 }],
    ["Definición.", "Cuatro aspectos.", "Causa.", "Superación.", "Relación con Hegel y Feuerbach."], "Alienación económica: producto, actividad, ser genérico y otros");
  R("ma44", "Explica el concepto marxista de ideología y la religión como «opio del pueblo», situándolos en la relación entre infraestructura y superestructura. (Pregunta tipo PAU)", 8, [
    { t: "Define la ideología (ideas que ocultan intereses de clase y se presentan como universales)", p: 0.5 },
    { t: "Sitúa ideología y religión en la superestructura", p: 0.4 },
    { t: "Explica «las ideas dominantes son las de la clase dominante»", p: 0.4 },
    { t: "Explica el matiz del «opio»: consuelo que hace soportable la miseria sin cambiarla", p: 0.4 },
    { t: "Valora (matiz de Engels, relación con la praxis)", p: 0.3 }],
    ["Definición.", "Superestructura.", "Ideas dominantes.", "Opio del pueblo.", "Valoración."], "La ideología oculta intereses de clase");
  R("ma45", "Explica la lucha de clases, la plusvalía y el camino hacia la sociedad sin clases en Marx. Valora críticamente su propuesta. (Pregunta tipo PAU)", 10, [
    { t: "Define burguesía y proletariado según su relación con los medios de producción", p: 0.4 },
    { t: "Explica la plusvalía (valor creado menos salario) con claridad", p: 0.5 },
    { t: "Explica las contradicciones del capitalismo y la revolución", p: 0.3 },
    { t: "Explica la dictadura del proletariado y el comunismo", p: 0.4 },
    { t: "Distingue la teoría de Marx de las aplicaciones políticas del siglo XX", p: 0.2 },
    { t: "Valora (determinismo, predicciones no cumplidas, vigencia del análisis)", p: 0.2 }],
    ["Clases.", "Plusvalía.", "Revolución.", "Comunismo.", "Teoría y aplicaciones.", "Valoración."], "Lucha de clases, plusvalía y comunismo");
  R("ma46", "Comenta este texto: «El modo de producción de la vida material condiciona el proceso de la vida social, política y espiritual en general. No es la conciencia del hombre la que determina su ser, sino, por el contrario, el ser social es el que determina su conciencia» (Marx, <i>Prefacio a la Contribución a la crítica de la economía política</i>, 1859; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro. (Pregunta tipo PAU)", 12, [
    { t: "Tema: relación entre la vida material y la conciencia", p: 0.3 },
    { t: "Idea principal: las condiciones materiales y sociales condicionan las ideas", p: 0.4 },
    { t: "Aclara términos: modo de producción, ser social, conciencia, condiciona", p: 0.4 },
    { t: "Relaciona con el autor: materialismo histórico, infraestructura y superestructura, ideología", p: 0.5 },
    { t: "Compara con otro autor (Hegel, Platón o Kant) con diferencias precisas", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario del Prefacio de 1859");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "El edificio social", ancha: true,
      tabla: { cab: ["Infraestructura", "Superestructura"], filas: [
        ["fuerzas productivas", "derecho y Estado"],
        ["relaciones de producción", "religión, moral, arte, filosofía"],
        ["la base", "reflejan y legitiman la base"]
      ] } },
    { titulo: "Modos de producción", ancha: true,
      tabla: { cab: ["Modo", "Clases enfrentadas"], filas: [
        ["Esclavista", "amos y esclavos"],
        ["Feudal", "señores y siervos"],
        ["Capitalista", "burguesía y proletariado"]
      ] } },
    { titulo: "La plusvalía", ancha: true,
      tabla: { cab: ["Concepto", "Ejemplo (8 h, 20 €/h, salario 80 €)"], filas: [
        ["Valor creado", "160 €"],
        ["Salario", "80 €"],
        ["Plusvalía", "80 €"]
      ] } },
    { titulo: "Del capitalismo al comunismo",
      pasos: ["Crisis del capitalismo.", "Revolución proletaria.", "Dictadura del proletariado.", "Fase inferior (según su trabajo).", "Fase superior (según necesidades)."],
      nota: "Meta: sociedad sin clases." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Marx dice que las ideas no importan", bien: "Dice que no explican la historia por sí solas", por: "Condiciona no es lo mismo que anula." },
        { mal: "Las relaciones de producción son superestructura", bien: "Son infraestructura", por: "La superestructura es derecho, Estado e ideas." },
        { mal: "La plusvalía es un robo ilegal", bien: "Existe aunque el obrero cobre lo pactado", por: "Es trabajo no pagado, no un engaño." },
        { mal: "Marx es lo mismo que la URSS", bien: "La URSS fue una aplicación política del siglo XX", por: "Separa teoría y aplicación." }
      ] }
  ];

  B.registrar("historia_fil", "t13", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf13a.secciones,
    nuevas: B.parte.hf13a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
