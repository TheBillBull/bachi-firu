/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 14 (parte B): Nietzsche
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t14.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Nietzsche (1844–1900) critica toda la cultura occidental: la <b>metafísica</b> de los dos mundos, la <b>moral</b> de esclavos, la <b>religión</b> y la fe ciega en la verdad.",
    "«<b>Dios ha muerto</b>»: la fe en un fundamento absoluto se ha perdido; la consecuencia es el <b>nihilismo</b>, que puede ser pasivo o activo.",
    "La respuesta es la <b>transvaloración</b> de los valores: el <b>superhombre</b> crea valores propios y el <b>eterno retorno</b> pone a prueba si afirmamos la vida entera.",
    "No hay verdad absoluta: conocemos desde <b>perspectivas</b>, y la vida es <b>voluntad de poder</b> (impulso de crecer y superarse)."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Nietzsche · 1844–1900",
    autores: [{ n: "Friedrich Nietzsche", f: "1844–1900", l: "Röcken (Sajonia); Basilea; Weimar" }],
    obras: ["El nacimiento de la tragedia", "Sobre verdad y mentira en sentido extramoral", "La gaya ciencia", "Así habló Zaratustra", "Más allá del bien y del mal", "La genealogía de la moral", "El crepúsculo de los ídolos"],
    bloques: [
      { t: "Contexto", frases: ["Filólogo clásico; catedrático en Basilea a los 24 años (1869).", "Influido por Schopenhauer y Wagner; rompe con ambos.", "Escribe en aforismos; enferma y se derrumba en Turín (1889)."] },
      { t: "Arte y cultura", frases: ["La tragedia griega une lo <b>apolíneo</b> y lo <b>dionisíaco</b>.", "Sócrates y la razón matan la tragedia.", "<i>El nacimiento de la tragedia</i> (1872)."],
        tabla: { cab: ["Apolíneo", "Dionisíaco"], filas: [["orden, forma, medida", "instinto, embriaguez"], ["sueño, escultura", "música, danza, fiesta"]] } },
      { t: "Verdad y conocimiento", frases: ["La verdad es un <b>ejército de metáforas</b> olvidadas.", "No hay hechos, sino interpretaciones: <b>perspectivismo</b>.", "Más perspectivas, más objetividad; no «todo vale»."] },
      { t: "Crítica de la moral", frases: ["Genealogía: ¿de dónde viene el «bien»?", "El resentimiento invierte los valores.", "El cristianismo universaliza la moral de esclavos."],
        tabla: { cab: ["Moral de señores", "Moral de esclavos"], filas: [["bueno / malo", "bueno / malvado"], ["fuerza, orgullo", "humildad, compasión"], ["afirma la vida", "nace del resentimiento"]] } },
      { t: "Dios ha muerto y nihilismo", frases: ["Es un diagnóstico cultural, no una demostración.", "Sin fundamento absoluto llega el <b>nihilismo</b>.", "Pasivo (último hombre) o activo (crear valores)."] },
      { t: "Superhombre, retorno y voluntad de poder", frases: ["<b>Superhombre</b>: crea valores propios, fiel a la tierra.", "<b>Eterno retorno</b>: ¿querrías repetir tu vida? (<i>amor fati</i>).", "<b>Voluntad de poder</b>: la vida es impulso de crecer y superarse."] }
    ],
    resumen: [
      "La cultura occidental inventó un <b>mundo verdadero</b> (Platón, cristianismo) para consolarse: Nietzsche lo desmonta.",
      "Muerto Dios, hay que elegir entre el <b>nihilismo pasivo</b> y la <b>creación de valores</b> nuevos (superhombre).",
      "Los valores se juzgan por si <b>afirman la vida</b>: la moral de esclavos la niega.",
      "El conocimiento es <b>interpretación</b> desde perspectivas, no espejo de la realidad."
    ],
    conecta: [
      { con: "Sócrates y Platón (T2–T3):", rel: "los acusa de matar la tragedia y de inventar el mundo verdadero." },
      { con: "Kant (T12):", rel: "su moral del deber le parece moral de esclavos." },
      { con: "Marx (T13):", rel: "también critica la religión, pero la explica por el resentimiento y no por la economía." },
      { con: "Existencialismo (T15):", rel: "sin Dios, el ser humano debe crear sus valores." },
      { con: "Ortega (T16):", rel: "otro perspectivismo, que busca la verdad sumando perspectivas." }
    ],
    claves: [
      ["Apolíneo", "orden, medida, forma y razón individualizadora"],
      ["Dionisíaco", "instinto, embriaguez y fusión colectiva"],
      ["Muerte de Dios", "la fe en un fundamento absoluto se ha perdido en Europa"],
      ["Nihilismo", "pérdida de valor y de sentido; pasivo o activo"],
      ["Moral de señores", "valora la fuerza y afirma la vida (bueno/malo)"],
      ["Moral de esclavos", "nace del resentimiento y convierte la debilidad en virtud"],
      ["Voluntad de poder", "impulso de crecer y superarse; esencia de la vida"],
      ["Superhombre", "quien crea valores propios, fiel a la tierra"],
      ["Eterno retorno", "prueba de afirmación: desear repetir esta vida para siempre"],
      ["Perspectivismo", "todo conocimiento se hace desde una perspectiva"]
    ],
    cita: { txt: "Yo os enseño el superhombre. El hombre es algo que debe ser superado.", autor: "Nietzsche", obra: "Así habló Zaratustra, Prólogo (traducción habitual)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    apodio: {
      titulo: "¿Apolíneo o dionisíaco?",
      consigna: "Toca cada palabra y después el impulso al que pertenece.",
      categorias: ["Apolíneo", "Dionisíaco"],
      items: [
        { t: "Escultura", c: 0 },
        { t: "Música y danza", c: 1 },
        { t: "Medida y orden", c: 0 },
        { t: "Embriaguez", c: 1 },
        { t: "Sueño de imágenes bellas", c: 0 },
        { t: "Fusión con la multitud", c: 1 },
        { t: "Razón que separa y distingue", c: 0 },
        { t: "Instinto y desmesura", c: 1 },
        { t: "Forma clara y límites", c: 0 },
        { t: "Fiesta del dios del vino", c: 1 }
      ]
    },
    morales: {
      titulo: "¿Moral de señores o de esclavos?",
      consigna: "Toca cada rasgo y después la moral a la que corresponde, según Nietzsche.",
      categorias: ["Moral de señores", "Moral de esclavos"],
      items: [
        { t: "Orgullo", c: 0 },
        { t: "Humildad", c: 1 },
        { t: "Afirmación de uno mismo", c: 0 },
        { t: "Resentimiento", c: 1 },
        { t: "Bueno = noble y fuerte", c: 0 },
        { t: "Compasión convertida en virtud", c: 1 },
        { t: "Valentía y creatividad", c: 0 },
        { t: "Resignación", c: 1 },
        { t: "Malvado = el fuerte que oprime", c: 1 },
        { t: "Fuerza y nobleza", c: 0 }
      ]
    },
    metamorfosis: {
      titulo: "Las tres metamorfosis del espíritu",
      consigna: "Ordena las tres etapas que describe Zaratustra, de la primera a la última.",
      items: [
        { t: "Camello: carga con el «tú debes»" },
        { t: "León: dice «yo quiero» y se rebela" },
        { t: "Niño: inocencia y juego; crea valores («sí»)" }
      ]
    },
    obras: {
      titulo: "Obras e ideas",
      consigna: "Une cada obra de Nietzsche con la idea que más se asocia a ella.",
      pares: [["El nacimiento de la tragedia", "Apolíneo y dionisíaco"], ["La gaya ciencia", "«Dios ha muerto»"], ["La genealogía de la moral", "Moral de señores y de esclavos"], ["Así habló Zaratustra", "El superhombre"], ["Sobre verdad y mentira", "La verdad como metáforas gastadas"]]
    },
    cronologia: {
      titulo: "Cronología de obras",
      consigna: "Ordena estas obras de Nietzsche por su fecha, de la más antigua a la más reciente.",
      items: [
        { t: "El nacimiento de la tragedia (1872)" },
        { t: "Humano, demasiado humano (1878)" },
        { t: "La gaya ciencia (1882)" },
        { t: "Así habló Zaratustra (1883–1885)" },
        { t: "La genealogía de la moral (1887)" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 14",
      preguntas: [
        { q: "En «El nacimiento de la tragedia», la tragedia griega es…", op: ["la unión de lo apolíneo y lo dionisíaco", "puro dionisismo sin forma", "puro racionalismo", "un invento de Sócrates"], ok: 0, porque: "Une el orden de Apolo con la embriaguez de Dioniso." },
        { q: "¿Quién mata la tragedia, según Nietzsche?", op: ["Sócrates y la razón", "Los dioses", "Los poetas", "Los sofistas por dinero"], ok: 0, porque: "El socratismo impone un exceso de razón apolínea." },
        { q: "«Dios ha muerto» es, sobre todo…", op: ["un diagnóstico cultural", "una demostración lógica", "una burla personal", "una oración"], ok: 0, porque: "Describe la pérdida de fe real en un fundamento absoluto." },
        { q: "El nihilismo consiste en…", op: ["la pérdida de valor y de sentido", "la fe en la ciencia", "creer en dos mundos", "la fiesta dionisíaca"], ok: 0, porque: "De <i>nihil</i>, «nada»." },
        { q: "La moral de esclavos nace…", op: ["del resentimiento de los débiles", "de la fuerza de los nobles", "de la razón pura", "del arte griego"], ok: 0, porque: "Invierte los valores: convierte la debilidad en virtud." },
        { q: "El superhombre es…", op: ["quien crea valores propios, fiel a la tierra", "una raza superior", "un dictador", "un santo"], ok: 0, porque: "Es un ideal de superación personal." },
        { q: "El eterno retorno plantea…", op: ["si desearías repetir tu vida exactamente igual", "la reencarnación premiada", "un ciclo cósmico demostrado", "un castigo"], ok: 0, porque: "Es una prueba de afirmación de la vida (<i>amor fati</i>)." },
        { q: "La voluntad de poder es…", op: ["el impulso de crecer y superarse", "el deseo de dominar siempre a otros", "la voluntad de vivir de Schopenhauer", "un deber moral"], ok: 0, porque: "No es solo dominar a otros: es la esencia de la vida." },
        { q: "El perspectivismo sostiene que…", op: ["todo conocimiento se hace desde una perspectiva", "todas las opiniones valen igual", "hay una verdad absoluta", "no se puede conocer nada"], ok: 0, porque: "Sumar perspectivas aumenta la objetividad." },
        { q: "Según «Sobre verdad y mentira», las verdades son…", op: ["metáforas olvidadas como tales", "copias exactas de las cosas", "ideas innatas", "mandatos divinos"], ok: 0, porque: "Monedas gastadas que ya no parecen monedas." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre «Dios ha muerto» es FALSA?", op: ["Nietzsche demuestra con argumentos que Dios no existe", "Describe la pérdida cultural de fe en un fundamento absoluto", "Aparece en La gaya ciencia", "Conduce al problema del nihilismo"], ok: 0, porque: "Es un diagnóstico cultural, no una demostración." },
        { q: "¿Cuál de estas afirmaciones sobre el superhombre es FALSA?", op: ["Es una raza superior", "Crea valores propios", "Es un ideal de superación", "Aparece en Así habló Zaratustra"], ok: 0, porque: "No es raza ni dictador: es superación personal." },
        { q: "¿Cuál de estas afirmaciones sobre la voluntad de poder es FALSA?", op: ["Es el deseo de mandar sobre los demás", "Es impulso de crecer y superarse", "Corrige la voluntad de vivir de Schopenhauer", "Es criterio para valorar"], ok: 0, porque: "No se reduce a dominar a otros." },
        { q: "¿Cuál de estas afirmaciones sobre lo apolíneo y lo dionisíaco es FALSA?", op: ["Nietzsche considera dionisíaco lo malo y apolíneo lo bueno", "Se complementan en la tragedia", "Apolo representa la forma y la medida", "Dioniso representa la embriaguez y el instinto"], ok: 0, porque: "No son bueno y malo: se necesitan juntos." },
        { q: "¿Cuál de estas afirmaciones sobre el perspectivismo es FALSA?", op: ["Significa que todo vale por igual", "Todo conocimiento se hace desde una perspectiva", "Sumar perspectivas aumenta la objetividad", "Rechaza una única mirada absoluta"], ok: 0, porque: "No es relativismo vulgar." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Nietzsche es anterior a Kant", "Kant nació en 1724", "Marx nació en 1818", "Nietzsche murió en 1900"], ok: 0, porque: "Kant (1724–1804) es anterior a Nietzsche (1844–1900)." },
        { q: "¿Cuál de estas afirmaciones sobre el eterno retorno es FALSA?", op: ["Es una promesa de premio tras la muerte", "Es una prueba de afirmación de la vida", "Se expone en La gaya ciencia, aforismo 341", "Se relaciona con el amor fati"], ok: 0, porque: "No hay premio ni castigo: se trata de aceptar esta vida." },
        { q: "¿Cuál de estas afirmaciones sobre La voluntad de poder es FALSA?", op: ["La publicó el propio Nietzsche como su gran sistema", "La editaron su hermana y Peter Gast tras su muerte", "Recoge apuntes inéditos", "Hay que usarla con cautela"], ok: 0, porque: "Es una recopilación póstuma de apuntes." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Nietzsche",
      cartas: [
        { a: "Apolíneo", b: "Impulso de orden, medida, forma clara y razón individualizadora (Apolo)." },
        { a: "Dionisíaco", b: "Impulso de instinto, embriaguez y fusión colectiva (Dioniso)." },
        { a: "Tragedia griega", b: "Unión de lo apolíneo y lo dionisíaco; muere con Sócrates y Eurípides." },
        { a: "Genealogía", b: "Método que pregunta por el origen histórico y el interés de los valores." },
        { a: "Moral de señores", b: "Valora la fuerza y la afirmación de uno mismo (bueno/malo)." },
        { a: "Moral de esclavos", b: "Nace del resentimiento; convierte la debilidad en virtud (bueno/malvado)." },
        { a: "Resentimiento", b: "Venganza imaginaria del débil, que invierte los valores." },
        { a: "Muerte de Dios", b: "Diagnóstico: la fe en un fundamento absoluto ha desaparecido de Europa." },
        { a: "Nihilismo", b: "Pérdida de valor y de sentido; pasivo (desánimo) o activo (crear valores)." },
        { a: "Transvaloración", b: "Crear una nueva escala de valores que afirme la vida." },
        { a: "Superhombre", b: "Quien supera la moral heredada y crea valores propios, fiel a la tierra." },
        { a: "Eterno retorno", b: "Prueba: ¿querrías repetir esta vida exactamente igual, eternamente?" },
        { a: "Voluntad de poder", b: "Impulso de crecer y superarse; esencia de la vida." },
        { a: "Perspectivismo", b: "Todo conocimiento se hace desde una perspectiva; no hay hechos puros." },
        { a: "Amor fati", b: "Amor al destino: aceptar y querer la propia vida entera." }
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
  O("ni1", 1, "¿En qué localidad nació Nietzsche en 1844?", ["Röcken", "Basilea", "Weimar", "Turín"], 0,
    ["Nació en Röcken (Sajonia). Basilea fue su cátedra; Turín, su colapso; Weimar, el lugar de su muerte."]);
  O("ni2", 1, "¿A qué edad fue nombrado catedrático en Basilea (1869)?", ["24 años", "34 años", "44 años", "18 años"], 0,
    ["Nació en octubre de 1844 y fue nombrado en la primavera de 1869: tenía 24 años."]);
  O("ni3", 1, "¿Cuál es la primera obra importante de Nietzsche?", ["El nacimiento de la tragedia", "Así habló Zaratustra", "La genealogía de la moral", "La gaya ciencia"], 0,
    ["Se publicó en 1872. Las otras son posteriores."]);
  O("ni4", 1, "¿En qué obra aparece la famosa sentencia «Dios ha muerto» (aforismo 125)?", ["La gaya ciencia", "El nacimiento de la tragedia", "La genealogía de la moral", "Ecce homo"], 0,
    ["En <i>La gaya ciencia</i> (1882); se repite en <i>Zaratustra</i>."]);
  O("ni5", 1, "¿En qué obra aparece sobre todo la figura del superhombre?", ["Así habló Zaratustra", "El nacimiento de la tragedia", "La gaya ciencia", "Aurora"], 0,
    ["Lo anuncia Zaratustra al bajar de la montaña."]);
  T("ni6", 1, "Completa: el impulso del orden, la medida y la forma clara, simbolizado por Apolo, se llama ______.", "Término =", ["apolíneo", "apolínea", "lo apolíneo"],
    ["Apolo → apolíneo; Dioniso → dionisíaco."], "apolíneo");
  M("ni7", 1, "Clasifica cada rasgo como apolíneo o dionisíaco.", [
    C("Escultura de formas claras", ["Apolíneo", "Dionisíaco"], 0),
    C("Embriaguez de la fiesta", ["Apolíneo", "Dionisíaco"], 1),
    C("Medida y orden", ["Apolíneo", "Dionisíaco"], 0),
    C("Música y danza colectiva", ["Apolíneo", "Dionisíaco"], 1)],
    ["Apolo = forma y límite; Dioniso = éxtasis y fusión."], "Escultura–apolíneo, embriaguez–dionisíaco, medida–apolíneo, música–dionisíaco");
  O("ni8", 1, "¿Qué moral nace del resentimiento de los débiles, según Nietzsche?", ["La moral de esclavos", "La moral de señores", "La moral kantiana pura", "La moral de la tragedia griega"], 0,
    ["Invierte los valores y convierte la debilidad en virtud."]);
  T("ni9", 1, "Completa: <i>nihilismo</i> viene del latín <i>nihil</i>, que significa ______.", "Término =", ["nada"],
    ["Nihil = nada."], "nada");
  O("ni10", 1, "En «Así habló Zaratustra», ¿qué figura simboliza la tercera metamorfosis del espíritu?", ["El niño", "El camello", "El león", "El dragón"], 0,
    ["Camello → león → niño. El dragón es el «tú debes» que combate el león."]);
  O("ni11", 1, "¿Qué filósofo fue el primer maestro de Nietzsche, antes de que se distanciara de él?", ["Schopenhauer", "Marx", "Descartes", "Hume"], 0,
    ["Descubrió a Schopenhauer en su juventud y luego corrigió su «voluntad de vivir» con la voluntad de poder."]);
  O("ni12", 1, "¿Qué orden cronológico (por nacimiento) es correcto?",
    ["Kant → Marx → Nietzsche", "Marx → Kant → Nietzsche", "Nietzsche → Kant → Marx", "Kant → Nietzsche → Marx"], 0,
    ["Kant (1724), Marx (1818), Nietzsche (1844)."], "Kant → Marx → Nietzsche");
  M("ni13", 1, "Empareja cada obra con su idea.", [
    C("El nacimiento de la tragedia", ["Apolíneo y dionisíaco", "«Dios ha muerto»", "Moral de señores y de esclavos", "El superhombre"], 0),
    C("La gaya ciencia", ["Apolíneo y dionisíaco", "«Dios ha muerto»", "Moral de señores y de esclavos", "El superhombre"], 1),
    C("La genealogía de la moral", ["Apolíneo y dionisíaco", "«Dios ha muerto»", "Moral de señores y de esclavos", "El superhombre"], 2),
    C("Así habló Zaratustra", ["Apolíneo y dionisíaco", "«Dios ha muerto»", "Moral de señores y de esclavos", "El superhombre"], 3)],
    ["Piensa en la etapa de cada obra."], "Tragedia–apolíneo/dionisíaco, Gaya ciencia–Dios ha muerto, Genealogía–señores/esclavos, Zaratustra–superhombre");
  O("ni14", 1, "El eterno retorno es…", ["una prueba: ¿desearías repetir tu vida exactamente igual?", "la promesa de otra vida mejor", "la reencarnación de las almas", "un castigo por los pecados"], 0,
    ["Experimento mental de afirmación de la vida (<i>amor fati</i>)."]);

  // ---- nivel 2
  V("ni15", 2, "«Con la frase “Dios ha muerto”, Nietzsche demuestra que Dios no existe.»", false, [
    "Es falso: es un diagnóstico cultural, no una demostración", "Es falso: Nietzsche era creyente", "Es verdad: lo demuestra con la ciencia", "Es verdad: la frase es un silogismo"], 0,
    ["Describe que la fe en un fundamento absoluto ha perdido vigencia en Europa."]);
  V("ni16", 2, "«Según Nietzsche, la tragedia griega equilibraba lo apolíneo y lo dionisíaco.»", true, [
    "Es verdad: el coro dionisíaco y las imágenes apolíneas se unían", "Es verdad: porque era solo dionisíaca", "Es verdad: porque era solo racional", "Es verdad: porque no había música"], 0,
    ["Su equilibrio es lo que la hace grande; la razón socrática lo rompe."]);
  V("ni17", 2, "«La voluntad de poder de Nietzsche es el deseo de dominar a los demás.»", false, [
    "Es falso: es impulso de crecer y superarse, no solo mandar", "Es falso: no existe tal idea en Nietzsche", "Es verdad: porque todos buscan mandar", "Es verdad: porque lo dice Schopenhauer"], 0,
    ["Poder = capacidad de crecer y expandirse; es la esencia de la vida."]);
  V("ni18", 2, "«El superhombre es una raza superior que debe dominar a las demás.»", false, [
    "Es falso: es un ideal de superación y creación de valores", "Es falso: es un santo cristiano", "Es verdad: lo defendió el nazismo con razón", "Es verdad: lo explica en La gaya ciencia"], 0,
    ["Nietzsche despreciaba el nacionalismo y el antisemitismo."]);
  V("ni19", 2, "«Para Nietzsche, la ciencia moderna sigue creyendo que la verdad tiene un valor absoluto.»", true, [
    "Es verdad: esa fe es heredera del ideal ascético", "Es verdad: porque la ciencia no usa lenguaje", "Es verdad: porque Nietzsche era científico", "Es verdad: porque la ciencia cree en Dios"], 0,
    ["La ciencia no es para él la salida de la metafísica sino su último refugio."]);
  V("ni20", 2, "«El perspectivismo de Nietzsche significa que cualquier opinión vale igual que otra.»", false, [
    "Es falso: sumar perspectivas aumenta la objetividad", "Es falso: Nietzsche defiende una verdad absoluta", "Es verdad: no hay criterios", "Es verdad: nadie puede conocer nada"], 0,
    ["No es relativismo vulgar: hay perspectivas más ricas que otras."]);
  V("ni21", 2, "«Nietzsche publicó él mismo “La voluntad de poder” como culminación de su sistema.»", false, [
    "Es falso: es una recopilación póstuma de apuntes", "Es falso: nunca habló de la voluntad de poder", "Es verdad: se publicó en 1888", "Es verdad: fue su obra sistemática"], 0,
    ["La editaron Elisabeth Förster-Nietzsche y Peter Gast (1901, ampliada en 1906)."]);
  O("ni22", 2, "¿Qué es el nihilismo activo?", ["Destruir los valores muertos para crear otros nuevos", "Desanimarse y pensar que nada importa", "Creer en un mundo verdadero", "Aceptar la moral de esclavos"], 0,
    ["El pasivo es cansancio (último hombre); el activo es fuerza creadora."]);
  O("ni23", 2, "¿Cómo se llama la actitud de aceptar y querer la propia vida entera, incluso el dolor?", ["Amor fati", "Resentimiento", "Mala conciencia", "Ideal ascético"], 0,
    ["Es la respuesta afirmativa al eterno retorno."]);
  O("ni24", 2, "¿Cuál de estos es el mejor ejemplo de resentimiento?", ["Decir que las uvas están verdes porque no llegas a ellas", "Alegrarse del éxito propio", "Crear una obra nueva", "Aceptar el destino con alegría"], 0,
    ["Se inventa un valor para consolar la impotencia."]);
  M("ni25", 2, "Relaciona cada fase de las tres metamorfosis con su lema.", [
    C("«Tú debes»", ["Camello", "León", "Niño"], 0),
    C("«Yo quiero»", ["Camello", "León", "Niño"], 1),
    C("«Sí» (inocencia y juego)", ["Camello", "León", "Niño"], 2)],
    ["Cargar → rebelarse → crear."], "Camello–tú debes, león–yo quiero, niño–sí");
  M("ni26", 2, "Completa las parejas de valores de las dos morales.", [
    C("Moral de señores", ["Bueno / malo", "Bueno / malvado", "Verdadero / falso"], 0),
    C("Moral de esclavos", ["Bueno / malo", "Bueno / malvado", "Verdadero / falso"], 1)],
    ["Señor: bueno = noble, malo = vulgar. Esclavo: malvado = fuerte que oprime, bueno = inofensivo."], "Señores: bueno/malo · Esclavos: bueno/malvado");
  O("ni27", 2, "Texto: «¿Qué es entonces la verdad? Un ejército móvil de metáforas […]». ¿Qué tesis expresa?", ["La verdad es una construcción del lenguaje, olvidada como tal", "La verdad se descubre con la razón pura", "La verdad es una Idea eterna", "La verdad está en los mandatos de Dios"], 0,
    ["Procede de <i>Sobre verdad y mentira en sentido extramoral</i>."]);
  O("ni28", 2, "Texto: un loco con linterna en pleno día grita «¡Busco a Dios!». ¿Qué ilustra?", ["El anuncio de la muerte de Dios como hecho cultural", "La demostración de la existencia de Dios", "La moral de señores", "El eterno retorno"], 0,
    ["<i>La gaya ciencia</i>, aforismo 125."]);
  O("ni29", 2, "Texto: «¿Querrías vivir esta vida otra vez, con cada detalle, innumerables veces?». ¿Qué idea plantea?", ["El eterno retorno", "El nihilismo pasivo", "El perspectivismo", "La mala conciencia"], 0,
    ["<i>La gaya ciencia</i>, 341, «El peso más grande»."]);
  O("ni30", 2, "¿A qué filósofo acusa Nietzsche de iniciar la metafísica de los dos mundos?", ["Platón", "Heráclito", "Hume", "Marx"], 0,
    ["Mundo sensible (apariencia) y mundo de las Ideas (verdadero)."]);
  O("ni31", 2, "¿Cómo critica Nietzsche la moral kantiana del deber?", ["La ve como heredera de la moral de esclavos, que niega la vida", "La considera un modelo de moral de señores", "La acepta como fundamento de su ética", "Le parece prueba de la existencia de Dios"], 0,
    ["Kant (T12) sigue la lógica de renuncia y deber que Nietzsche critica."]);
  O("ni32", 2, "¿Cuál es una diferencia entre Marx y Nietzsche ante la religión?", ["Marx la explica por condiciones sociales; Nietzsche, por resentimiento y debilidad", "Marx la defiende y Nietzsche la ataca", "Nietzsche la explica por la economía", "Los dos la consideran necesaria"], 0,
    ["Los dos la critican, con causas distintas."]);
  O("ni33", 2, "¿Qué resume mejor el método genealógico de Nietzsche?", ["Preguntarse de dónde vienen los valores y a quién favorecen", "Deducir la moral de la razón pura", "Imitar la moral cristiana", "Buscar el bien en las Ideas"], 0,
    ["Genealogía = historia del origen; método de sospecha."]);

  // ---- nivel 3
  O("ni34", 3, "En el aforismo 125, el loco dice haber llegado «demasiado pronto». ¿Por qué?", ["La gente aún no comprende lo que ha ocurrido ni sus consecuencias", "Dios todavía vivía", "Nadie creía en Dios", "Había llegado antes de la fiesta"], 0,
    ["El hecho ya ha sucedido, pero su significado todavía no ha llegado a la conciencia colectiva."]);
  O("ni35", 3, "¿Qué figura encarna el peligro del nihilismo pasivo?", ["El último hombre, que busca comodidad sin esfuerzo", "El superhombre", "El niño de las tres metamorfosis", "El loco de la linterna"], 0,
    ["Quiere seguridad y no se arriesga a crear."]);
  O("ni36", 3, "¿Qué relación hay entre el eterno retorno y el superhombre?", ["El superhombre es quien podría desear que su vida se repitiera para siempre", "Son ideas opuestas", "El retorno prueba que existe el alma inmortal", "El superhombre solo vive una vez, sin retorno"], 0,
    ["El retorno es la prueba de afirmación que el superhombre supera."]);
  O("ni37", 3, "Al final de la historia del «mundo verdadero» en «El crepúsculo de los ídolos», ¿qué queda?", ["Un único mundo, sin “verdadero” ni “aparente”", "Solo el mundo aparente", "Solo el mundo de las Ideas", "El mundo de Kant"], 0,
    ["Suprimido el mundo verdadero, desaparece también el aparente."]);
  M("ni38", 3, "Relaciona cada ámbito con la crítica que le dirige Nietzsche.", [
    C("Metafísica", ["Inventa un mundo verdadero para despreciar este", "Nace del resentimiento de los débiles", "Cree sin pruebas que la verdad vale más que nada", "Es platonismo para el pueblo"], 0),
    C("Moral tradicional", ["Inventa un mundo verdadero para despreciar este", "Nace del resentimiento de los débiles", "Cree sin pruebas que la verdad vale más que nada", "Es platonismo para el pueblo"], 1),
    C("Ciencia", ["Inventa un mundo verdadero para despreciar este", "Nace del resentimiento de los débiles", "Cree sin pruebas que la verdad vale más que nada", "Es platonismo para el pueblo"], 2),
    C("Cristianismo", ["Inventa un mundo verdadero para despreciar este", "Nace del resentimiento de los débiles", "Cree sin pruebas que la verdad vale más que nada", "Es platonismo para el pueblo"], 3)],
    ["Cuatro críticas, cuatro ámbitos."], "Metafísica–mundo verdadero; moral–resentimiento; ciencia–fe en la verdad; cristianismo–platonismo para el pueblo");
  O("ni39", 3, "¿En qué corrige Nietzsche a Schopenhauer?", ["Frente a una voluntad que conviene negar, defiende afirmar la vida como voluntad de poder", "Rechaza la idea de voluntad", "Aprueba la renuncia ascética", "Defiende la compasión como esencia de la moral"], 0,
    ["Schopenhauer niega la voluntad de vivir; Nietzsche la afirma y la convierte en voluntad de poder."]);

  R("ni40", "Explica lo apolíneo y lo dionisíaco en «El nacimiento de la tragedia» y la acusación de Nietzsche a Sócrates. (Pregunta tipo PAU)", 9, [
    { t: "Define lo apolíneo (orden, medida, forma, razón) y lo dionisíaco (instinto, embriaguez, fusión)", p: 0.6 },
    { t: "Pone ejemplos o símbolos (escultura/sueño; música/danza)", p: 0.3 },
    { t: "Explica que la tragedia griega equilibraba ambos impulsos", p: 0.4 },
    { t: "Explica la crítica a Sócrates y a la razón (socratismo) como muerte de la tragedia", p: 0.5 },
    { t: "Relaciona con la crítica posterior a la metafísica y a la moral", p: 0.2 }],
    ["Define ambos impulsos.", "Ejemplos.", "Equilibrio en la tragedia.", "Crítica a Sócrates.", "Relación con el resto."], "Tragedia = unión de Apolo y Dioniso; Sócrates la mata con exceso de razón");
  R("ni41", "Explica el sentido de «Dios ha muerto» y el nihilismo, y la respuesta de Nietzsche. (Pregunta tipo PAU)", 9, [
    { t: "Cita la obra (La gaya ciencia, aforismo 125) y la escena del loco con la linterna", p: 0.3 },
    { t: "Explica que es un diagnóstico cultural, no una demostración ni un ateísmo declarativo", p: 0.5 },
    { t: "Explica qué se pierde (fundamento de valores, sentido, verdad) y quién “mata” a Dios (ciencia y razón)", p: 0.4 },
    { t: "Define el nihilismo y distingue pasivo y activo (último hombre)", p: 0.5 },
    { t: "Expone la salida: transvaloración, superhombre", p: 0.3 }],
    ["Obra y escena.", "Diagnóstico cultural.", "Qué se pierde.", "Nihilismo.", "Respuesta."], "Dios ha muerto = pérdida cultural de fundamento → nihilismo → transvaloración");
  R("ni42", "Explica la moral de señores y la moral de esclavos y la crítica de Nietzsche al cristianismo. (Pregunta tipo PAU)", 9, [
    { t: "Presenta la genealogía de la moral como método (La genealogía de la moral, 1887)", p: 0.3 },
    { t: "Caracteriza la moral de señores (bueno/malo; afirmación)", p: 0.4 },
    { t: "Caracteriza la moral de esclavos (bueno/malvado; resentimiento; humildad, compasión)", p: 0.5 },
    { t: "Explica la inversión de valores y la mala conciencia o el ideal ascético", p: 0.4 },
    { t: "Relaciona con el cristianismo y valora críticamente (no es apología de la violencia)", p: 0.4 }],
    ["Genealogía.", "Señores.", "Esclavos.", "Inversión y culpa.", "Cristianismo y valoración."], "Señores afirman; esclavos, por resentimiento, invierten los valores; el cristianismo la universaliza");
  R("ni43", "Explica el superhombre y el eterno retorno como respuesta al nihilismo. (Pregunta tipo PAU)", 8, [
    { t: "Presenta Así habló Zaratustra y define el superhombre (no raza; crea valores; fiel a la tierra)", p: 0.5 },
    { t: "Explica las tres metamorfosis (camello, león, niño)", p: 0.4 },
    { t: "Explica el eterno retorno como prueba de afirmación y el amor fati", p: 0.5 },
    { t: "Distingue el superhombre del último hombre", p: 0.2 },
    { t: "Relaciona ambas ideas con la muerte de Dios y la voluntad de poder", p: 0.4 }],
    ["Superhombre.", "Metamorfosis.", "Eterno retorno.", "Último hombre.", "Relación."], "Superhombre = crea valores y afirma la vida; el retorno es su prueba");
  R("ni44", "Comenta este texto: «¿Qué es entonces la verdad? Un ejército móvil de metáforas, metonimias, antropomorfismos […]. Las verdades son ilusiones de las que se ha olvidado que lo son» (Nietzsche, <i>Sobre verdad y mentira en sentido extramoral</i>; traducción habitual). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: el origen del lenguaje y la verdad como construcción", p: 0.3 },
    { t: "Idea principal: la verdad son metáforas gastadas cuyo origen se ha olvidado", p: 0.4 },
    { t: "Aclara términos: metáfora, concepto que iguala lo desigual, moneda sin troquelado", p: 0.4 },
    { t: "Relaciona con el autor: perspectivismo, crítica a la metafísica y a la ciencia, voluntad de poder", p: 0.5 },
    { t: "Compara con otro autor (Platón, Descartes o Kant) o con Ortega", p: 0.3 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → términos → relación → comparación → valoración."], "Comentario de «Sobre verdad y mentira»");
  R("ni45", "Explica la voluntad de poder y el perspectivismo y compara a Nietzsche con Platón. (Pregunta tipo PAU)", 8, [
    { t: "Define la voluntad de poder (impulso de crecer y superarse; no dominar a otros)", p: 0.5 },
    { t: "Explica que corrige la voluntad de vivir de Schopenhauer o sirve de criterio de valor", p: 0.3 },
    { t: "Define el perspectivismo (no hay hechos puros; sumar perspectivas) y lo distingue del “todo vale”", p: 0.5 },
    { t: "Explica la crítica a la verdad absoluta y a la metafísica de los dos mundos", p: 0.3 },
    { t: "Compara con Platón: dos mundos y desprecio del cuerpo frente a fidelidad a la tierra", p: 0.4 }],
    ["Voluntad de poder.", "Schopenhauer.", "Perspectivismo.", "Crítica a la metafísica.", "Platón."], "Vida = voluntad de poder; conocimiento = perspectiva; Platón inventa el mundo verdadero");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Apolíneo y dionisíaco", ancha: true,
      tabla: { cab: ["", "Apolíneo", "Dionisíaco"], filas: [
        ["Dios", "Apolo", "Dioniso"],
        ["Imagen", "sueño, escultura", "embriaguez, música"],
        ["Valores", "orden, medida, razón", "instinto, desmesura"],
        ["Individuo", "límites claros", "fusión colectiva"]
      ] } },
    { titulo: "Moral de señores y de esclavos", ancha: true,
      tabla: { cab: ["", "Señores", "Esclavos"], filas: [
        ["Pareja de valores", "bueno / malo", "bueno / malvado"],
        ["Origen", "afirmación", "resentimiento"],
        ["Virtudes", "fuerza, orgullo", "humildad, compasión"],
        ["Vida", "la afirma", "la niega"]
      ] } },
    { titulo: "Las tres metamorfosis",
      pasos: ["Camello: carga con el «tú debes».", "León: dice «yo quiero» y se rebela.", "Niño: crea valores y dice «sí»."],
      nota: "No basta rebelarse: hay que crear." },
    { titulo: "De la muerte de Dios al superhombre",
      pasos: ["Dios ha muerto (diagnóstico).", "Nihilismo: pasivo o activo.", "Transvaloración de los valores.", "Superhombre y eterno retorno."],
      nota: "La salida es crear valores que afirmen la vida." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Nietzsche demuestra que Dios no existe", bien: "Diagnostica la pérdida cultural de fe", por: "«Dios ha muerto» es un hecho cultural." },
        { mal: "El superhombre es una raza superior", bien: "Es un ideal de superación y creación de valores", por: "Nietzsche despreciaba el nacionalismo." },
        { mal: "Voluntad de poder = dominar a otros", bien: "Es impulso de crecer y superarse", por: "Esencia de la vida, no solo política." },
        { mal: "Perspectivismo = todo vale", bien: "Sumar perspectivas aumenta la objetividad", por: "No es relativismo vulgar." }
      ] }
  ];

  B.registrar("historia_fil", "t14", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf14a.secciones,
    nuevas: B.parte.hf14a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
