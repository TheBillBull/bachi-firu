/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 3 (parte B): Platón
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio de opción tiene UNA respuesta correcta (lo comprueba herramientas/verificar_historia_fil_t3.py).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Platón (427–347 a. C.) responde a Heráclito y Parménides con <b>dos mundos</b>: el sensible (copia, cambiante) y el inteligible (<b>Ideas</b>, eternas).",
    "Conocer es <b>ascender</b> (línea dividida, caverna) hasta la Idea de Bien, y es <b>recordar</b> (anámnesis) lo que el alma ya vio.",
    "El <b>alma</b> tiene tres partes (razón, ánimo, deseo) con tres virtudes; la <b>justicia</b> es su armonía.",
    "El <b>Estado</b> ideal copia el alma: gobiernan los filósofos, defienden los guardianes y producen los artesanos."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Platón · 427–347 a. C.",
    autores: [{ n: "Platón", f: "427–347 a. C.", l: "Atenas (fundó la Academia, 387 a. C.)" }],
    obras: ["Apología de Sócrates", "Menón", "Fedón", "Banquete", "República", "Fedro", "Parménides", "Leyes"],
    bloques: [
      { t: "Contexto", frases: ["Discípulo de Sócrates; su condena (399 a. C.) le marca.", "Escribe <b>diálogos</b>; funda la <b>Academia</b> (387 a. C.).", "Une lo que dijeron Heráclito y Parménides."] },
      { t: "Realidad: las Ideas", frases: ["Las Ideas son <b>objetivas</b>, eternas y modelo de las cosas.", "Las cosas <b>participan</b> de ellas o las imitan.", "La <b>Idea de Bien</b> las preside, como el Sol."],
        tabla: { cab: ["Mundo sensible", "Mundo inteligible"], filas: [["cambia, múltiple", "eterno, único"], ["copia", "modelo"], ["opinión (<i>dóxa</i>)", "ciencia (<i>epistéme</i>)"]] } },
      { t: "Conocimiento", frases: ["Línea dividida: imaginación, creencia, razonamiento, inteligencia.", "Caverna: ascenso doloroso y <b>regreso</b> del sabio.", "Conocer es <b>recordar</b> (<i>anámnesis</i>); innatismo."] },
      { t: "Ser humano y ética", frases: ["<b>Dualismo</b>: alma inmortal, cuerpo mortal.", "Tres partes del alma, cada una con su virtud.", "Se obra mal por ignorancia del Bien (intelectualismo moral)."],
        tabla: { cab: ["Parte del alma", "Virtud · clase"], filas: [["racional", "sabiduría · gobernantes"], ["irascible", "valentía · guardianes"], ["concupiscible", "templanza · productores"]] } },
      { t: "Política", frases: ["La <b>justicia</b>: cada parte y cada clase hace lo suyo.", "Los <b>filósofos</b> gobiernan: solo ellos conocen el Bien.", "Critica la democracia; propone educación estatal."] },
      { t: "Valoración", frases: ["Primer gran sistema idealista y racionalista.", "Críticas: Aristóteles (formas separadas) y Popper (elitismo).", "Influye en el cristianismo (Agustín)."] }
    ],
    resumen: [
      "Hay <b>dos mundos</b>: el sensible es copia del inteligible, donde viven las Ideas.",
      "Conocer es ascender hacia el <b>Bien</b> y recordar lo que el alma ya contempló.",
      "El <b>alma</b> tripartita fundamenta el <b>Estado</b> ideal: justicia = armonía.",
      "El que sabe tiene el <b>deber</b> de volver a la caverna y gobernar."
    ],
    conecta: [
      { con: "Heráclito y Parménides (T1):", rel: "Platón concilia cambio e inmutabilidad en dos mundos." },
      { con: "Sócrates (T2):", rel: "convierte sus definiciones en Ideas; se opone a los sofistas." },
      { con: "Aristóteles (T4):", rel: "critica las Ideas separadas y parte de la experiencia." },
      { con: "Agustín (T6):", rel: "cristianiza el platonismo." }
    ],
    claves: [
      ["Idea", "realidad objetiva, eterna y perfecta, modelo de las cosas"],
      ["Participación", "las cosas sensibles tienen parte de la Idea (<i>méthexis</i>)"],
      ["Idea de Bien", "la Idea suprema: causa de ser y de verdad, como el Sol"],
      ["Dóxa / epistéme", "opinión (sensible) frente a ciencia (inteligible)"],
      ["Línea dividida", "cuatro grados: eikasía, pístis, diánoia, nóesis"],
      ["Anámnesis", "conocer es recordar lo que el alma contempló antes"],
      ["Dualismo", "el alma (inmortal) y el cuerpo (mortal) son distintos"],
      ["Alma tripartita", "racional, irascible y concupiscible"],
      ["Justicia", "armonía: cada parte y cada clase cumple su función"],
      ["Filósofo-rey", "solo quien conoce el Bien debe gobernar"]
    ],
    cita: { txt: "No cesarán los males de las ciudades hasta que los filósofos gobiernen o los gobernantes filosofen.", autor: "Platón", obra: "República, libro V (473c-d)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    sensinteligible: {
      titulo: "¿Sensible o inteligible?",
      consigna: "Toca una frase y después el mundo al que pertenece.",
      categorias: ["Mundo sensible", "Mundo inteligible"],
      items: [
        { t: "Este círculo dibujado en la pizarra", c: 0 },
        { t: "El Círculo perfecto del que trata la geometría", c: 1 },
        { t: "Un atardecer hermoso", c: 0 },
        { t: "La Belleza en sí, eterna y única", c: 1 },
        { t: "Una acción justa concreta que vemos", c: 0 },
        { t: "La Idea de Bien", c: 1 },
        { t: "Lo que se conoce con los sentidos y da opinión", c: 0 },
        { t: "Lo que solo se conoce con la razón y da ciencia", c: 1 }
      ]
    },
    alma: {
      titulo: "Alma, virtud y clase",
      consigna: "Une cada parte del alma con su virtud.",
      pares: [["Alma racional", "Sabiduría"], ["Alma irascible", "Valentía"], ["Alma concupiscible", "Templanza"]]
    },
    linea: {
      titulo: "La línea dividida",
      consigna: "Une cada grado de conocimiento con su objeto.",
      pares: [["Imaginación (eikasía)", "Imágenes y sombras"], ["Creencia (pístis)", "Cosas y seres concretos"], ["Razonamiento (diánoia)", "Objetos matemáticos"], ["Inteligencia (nóesis)", "Las Ideas"]]
    },
    ordenasc: {
      titulo: "La formación del gobernante",
      consigna: "Ordena el camino del futuro filósofo-rey, de lo más básico a lo más alto.",
      items: [
        { t: "Música y gimnasia: formar el carácter" },
        { t: "Selección de los mejor dotados" },
        { t: "Matemáticas: preparar la mente para lo inteligible" },
        { t: "Dialéctica: ascenso a las Ideas y al Bien" },
        { t: "Regreso a la «caverna»: gobernar la ciudad" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 3",
      preguntas: [
        { q: "Para Platón, las Ideas son…", op: ["realidades objetivas, eternas e inmutables", "pensamientos de cada persona", "palabras convencionales", "cosas que vemos con los ojos"], ok: 0, porque: "No están en nuestra mente: existen por sí mismas, en el mundo inteligible." },
        { q: "¿Qué simboliza el Sol en el mito de la caverna?", op: ["La Idea de Bien", "La opinión", "El cuerpo", "La democracia"], ok: 0, porque: "Es la causa de la luz y de la vida, como el Bien lo es del ser y del conocer." },
        { q: "Según la teoría de la reminiscencia, aprender es…", op: ["recordar lo que el alma contempló antes", "recibir datos de los sentidos", "repetir lo que dice el maestro", "una ilusión"], ok: 0, porque: "El alma preexiste y ya vio las Ideas; la experiencia solo despierta el recuerdo." },
        { q: "En la línea dividida, las matemáticas corresponden a…", op: ["diánoia (razonamiento)", "eikasía (imaginación)", "nóesis (inteligencia)", "pístis (creencia)"], ok: 0, porque: "Parten de hipótesis y usan figuras: son el escalón previo a la dialéctica." },
        { q: "La virtud propia del alma irascible es…", op: ["la valentía", "la sabiduría", "la templanza", "la justicia"], ok: 0, porque: "El alma irascible se asocia con los guardianes y la valentía." },
        { q: "¿Qué es la justicia para Platón?", op: ["Que cada parte (del alma y del Estado) cumpla su función sin invadir las demás", "Que todos tengan lo mismo", "Obedecer las leyes de cualquier ciudad", "El interés del más fuerte"], ok: 0, porque: "Es armonía. El «interés del más fuerte» lo defiende el sofista Trasímaco, al que Platón rebate." },
        { q: "¿Por qué deben gobernar los filósofos?", op: ["Porque solo ellos conocen el Bien", "Porque son los más ricos", "Porque lo decide el voto popular", "Porque son los más fuertes"], ok: 0, porque: "Gobernar es un saber; solo quien ha contemplado el Bien puede hacerlo bien." },
        { q: "Platón fundó…", op: ["la Academia, en Atenas", "el Liceo", "el Jardín", "la escuela de Elea"], ok: 0, porque: "El Liceo fue de Aristóteles y el Jardín, de Epicuro." },
        { q: "Respecto a Heráclito y Parménides, Platón…", op: ["concilia ambos con dos mundos", "da la razón solo a Heráclito", "da la razón solo a Parménides", "los ignora"], ok: 0, porque: "El sensible cambia (Heráclito); el inteligible es inmutable (Parménides)." },
        { q: "El mundo sensible es, para Platón…", op: ["una copia imperfecta del inteligible", "una nada absoluta", "más real que las Ideas", "creado por el alma"], ok: 0, porque: "Existe, pero participa de las Ideas y es menos real." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Platón es FALSA?", op: ["Para Platón el mundo sensible no existe en absoluto", "Las cosas sensibles participan de las Ideas", "El mundo sensible es copia del inteligible", "La opinión es el conocimiento del mundo sensible"], ok: 0, porque: "Existe, pero es menos real: está «entre» el ser y el no ser." },
        { q: "¿Cuál de estas afirmaciones sobre las Ideas es FALSA?", op: ["Están en la mente de cada persona y varían con ella", "Son eternas", "Son objeto de la razón", "Son modelo de las cosas"], ok: 0, porque: "Son objetivas, no subjetivas." },
        { q: "¿Cuál de estas afirmaciones sobre el mito de la caverna es FALSA?", op: ["El prisionero liberado se queda arriba y se olvida de los demás", "Las sombras son las apariencias", "El Sol simboliza el Bien", "El liberado es mal recibido al regresar"], ok: 0, porque: "Platón insiste en que el sabio debe volver para educar." },
        { q: "¿Cuál de estas afirmaciones sobre el alma es FALSA?", op: ["El alma es mortal y nace con el cuerpo", "Tiene tres partes", "Existía antes del cuerpo", "El alma racional debe gobernar"], ok: 0, porque: "Es inmortal y preexistente." },
        { q: "¿Cuál de estas afirmaciones cronológicas es FALSA?", op: ["Platón nació antes de la muerte de Sócrates", "Platón murió en 347 a. C.", "Aristóteles fue discípulo de Platón", "Platón es anterior a Sócrates"], ok: 3, porque: "Platón (427–347) es posterior a Sócrates (470–399), que fue su maestro." },
        { q: "¿Cuál de estas afirmaciones sobre la política de Platón es FALSA?", op: ["Los gobernantes se eligen por herencia", "Los gobernantes deben ser filósofos", "La justicia es que cada clase haga lo suyo", "Critica la democracia"], ok: 0, porque: "Se eligen por aptitud y educación, no por herencia." },
        { q: "¿Cuál de estas afirmaciones sobre la línea dividida es FALSA?", op: ["La matemática (diánoia) es el grado más alto", "La nóesis es el grado más alto", "La imaginación es el más bajo", "Distingue opinión y ciencia"], ok: 0, porque: "La matemática es el escalón previo a la nóesis." },
        { q: "¿Cuál de estas afirmaciones sobre el conocimiento es FALSA?", op: ["Los sentidos nos dan el conocimiento verdadero", "Conocer es recordar", "El conocimiento verdadero versa sobre las Ideas", "El método socrático ayuda a recordar"], ok: 0, porque: "Los sentidos dan opinión; solo la razón da ciencia." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Platón",
      cartas: [
        { a: "Idea", b: "Realidad objetiva, eterna, inmutable y perfecta; modelo de las cosas sensibles." },
        { a: "Participación (méthexis)", b: "Relación por la que las cosas sensibles tienen parte de la Idea." },
        { a: "Idea de Bien", b: "La Idea suprema, comparada con el Sol: da ser y verdad a las demás." },
        { a: "Dóxa", b: "Opinión: conocimiento del mundo sensible." },
        { a: "Epistéme", b: "Ciencia: conocimiento verdadero del mundo inteligible." },
        { a: "Eikasía", b: "Imaginación: primer grado; conoce imágenes y sombras." },
        { a: "Pístis", b: "Creencia: conoce las cosas sensibles concretas." },
        { a: "Diánoia", b: "Razonamiento: matemático, con hipótesis y figuras." },
        { a: "Nóesis", b: "Inteligencia: conocimiento directo de las Ideas por la dialéctica." },
        { a: "Anámnesis", b: "Reminiscencia: conocer es recordar lo que el alma ya contempló." },
        { a: "Alma tripartita", b: "Racional (sabiduría), irascible (valentía), concupiscible (templanza)." },
        { a: "Justicia", b: "Armonía: cada parte del alma y del Estado hace su función." },
        { a: "Filósofo-rey", b: "Gobernante que conoce el Bien y por eso debe gobernar." },
        { a: "Academia", b: "Escuela fundada por Platón en Atenas (h. 387 a. C.)." }
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
  O("hp1", 1, "¿Quién fue el maestro de Platón?", ["Sócrates", "Aristóteles", "Heráclito", "Protágoras"], 0,
    ["Platón fue discípulo de Sócrates; Aristóteles fue discípulo de Platón."]);
  O("hp2", 1, "¿Cómo se llama la escuela que fundó Platón en Atenas?", ["La Academia", "El Liceo", "El Jardín", "El Pórtico"], 0,
    ["Academia (h. 387 a. C.). Liceo = Aristóteles; Jardín = Epicuro; Pórtico = estoicos."]);
  O("hp3", 1, "Los escritos de Platón tienen forma de…", ["diálogos", "poemas épicos", "tratados sistemáticos", "cartas a sus discípulos"], 0,
    ["Son diálogos, con Sócrates como protagonista casi siempre."]);
  O("hp4", 1, "¿En qué obra aparece el mito de la caverna?", ["República", "Fedón", "Apología de Sócrates", "Leyes"], 0,
    ["Libro VII de la <i>República</i>."]);
  O("hp5", 1, "¿Qué simbolizan las sombras de la pared de la caverna?", ["Las apariencias y las meras opiniones", "Las Ideas", "El alma", "Los gobernantes"], 0,
    ["Las sombras son lo más alejado de la verdad: imágenes de imágenes."]);
  O("hp6", 1, "¿Qué simboliza el Sol en el mito?", ["La Idea de Bien", "La Belleza", "El mundo sensible", "La muerte"], 0,
    ["El Sol da luz y vida; el Bien da verdad y ser."]);
  T("hp7", 1, "Completa: para Platón, conocer es ______ (en griego, anámnesis).", "Término =", ["recordar", "reminiscencia", "recuerdo"],
    ["Anámnesis = reminiscencia: conocer es recordar lo que el alma contempló."], "recordar");
  M("hp8", 1, "Empareja cada parte del alma con su virtud.", [
    C("Alma racional", ["Sabiduría", "Valentía", "Templanza"], 0),
    C("Alma irascible", ["Sabiduría", "Valentía", "Templanza"], 1),
    C("Alma concupiscible", ["Sabiduría", "Valentía", "Templanza"], 2)],
    ["Racional: sabiduría · irascible: valentía · concupiscible: templanza."], "Racional–sabiduría, irascible–valentía, concupiscible–templanza");
  M("hp9", 1, "Empareja cada parte del alma con su clase social en el Estado ideal.", [
    C("Alma racional", ["Gobernantes", "Guardianes", "Productores"], 0),
    C("Alma irascible", ["Gobernantes", "Guardianes", "Productores"], 1),
    C("Alma concupiscible", ["Gobernantes", "Guardianes", "Productores"], 2)],
    ["El Estado es el alma «en grande»."], "Racional–gobernantes, irascible–guardianes, concupiscible–productores");
  O("hp10", 1, "¿A qué se llama «mundo inteligible»?", ["Al mundo de las Ideas, accesible a la razón", "Al mundo que vemos", "Al mundo de los sueños", "Al mundo de los dioses del Olimpo"], 0,
    ["Inteligible = que se conoce con la inteligencia, no con los sentidos."]);
  O("hp11", 1, "¿Qué orden cronológico (de más antiguo a más moderno por nacimiento) es correcto?",
    ["Sócrates → Platón → Aristóteles", "Platón → Sócrates → Aristóteles", "Aristóteles → Platón → Sócrates", "Sócrates → Aristóteles → Platón"], 0,
    ["Sócrates (470–399), Platón (427–347), Aristóteles (384–322)."], "Sócrates → Platón → Aristóteles");
  O("hp12", 1, "El conocimiento del mundo sensible se llama, en Platón…", ["dóxa (opinión)", "epistéme (ciencia)", "nóesis", "anámnesis"], 0,
    ["Dóxa = opinión. Epistéme = ciencia, del mundo inteligible."]);
  T("hp13", 1, "Completa: la Idea suprema, que preside a todas las demás, es la Idea de ______.", "Término =", ["Bien", "el Bien"],
    ["La Idea de Bien, comparada con el Sol."], "Bien");
  O("hp14", 1, "¿Quién debe gobernar el Estado ideal?", ["Los filósofos", "Los guerreros", "Los comerciantes", "El pueblo reunido"], 0,
    ["Solo quien conoce el Bien puede gobernar con sabiduría."]);

  // ---- nivel 2
  V("hp15", 2, "«Para Platón, las Ideas existen solo en la mente de quien piensa en ellas.»", false, [
    "Es falso: son realidades objetivas, independientes de nuestro pensamiento", "Es falso: las Ideas no existen", "Es falso: solo existen los gobernantes", "Es verdad por definición"], 0,
    ["Las Ideas son objetivas y eternas, como las verdades matemáticas."]);
  V("hp16", 2, "«El mundo sensible es, para Platón, una copia imperfecta del mundo inteligible.»", true, [
    "Es verdad: sus cosas participan de las Ideas y las imitan sin igualarlas", "Es verdad: porque las cosas sensibles no existen", "Es verdad: porque las Ideas dependen de las cosas", "Es verdad: por la doctrina de Heráclito"], 0,
    ["Participación e imitación: el mundo sensible depende de las Ideas."]);
  V("hp17", 2, "«En el mito de la caverna, el prisionero liberado debe volver a bajar a ayudar a los demás.»", true, [
    "Es verdad: el sabio tiene el deber de educar y gobernar", "Es verdad: porque se aburre arriba", "Es verdad: porque las sombras son más reales", "Es verdad: porque el Sol se apaga"], 0,
    ["El regreso conecta el mito con el filósofo-rey y con Sócrates."]);
  V("hp18", 2, "«Las matemáticas pertenecen al grado más alto del conocimiento (nóesis).»", false, [
    "Es falso: son diánoia, el escalón previo, porque parten de hipótesis y usan figuras", "Es falso: pertenecen a la imaginación", "Es falso: no son conocimiento", "Es falso: pertenecen a la pístis"], 0,
    ["Línea: eikasía, pístis (sensible); diánoia, nóesis (inteligible)."]);
  V("hp19", 2, "«Platón sostiene que el alma es mortal y desaparece con el cuerpo.»", false, [
    "Es falso: es inmortal y preexiste al cuerpo", "Es falso: no tiene partes", "Es falso: solo el alma racional existe", "Es falso: el cuerpo es inmortal"], 0,
    ["Dualismo: alma inmortal, cuerpo mortal."]);
  V("hp20", 2, "«Para Platón, los gobernantes deben elegirse por herencia familiar.»", false, [
    "Es falso: se eligen por aptitud y educación", "Es falso: los elige el pueblo", "Es falso: los elige el rey de Esparta", "Es falso: no hay gobernantes"], 0,
    ["La clase se asigna por aptitudes, no se hereda."]);
  O("hp21", 2, "¿Cómo explica Platón que Heráclito y Parménides tengan, cada uno, parte de razón?",
    ["Heráclito describe el mundo sensible (cambiante) y Parménides, el inteligible (inmutable)", "Porque ambos creen en los átomos", "Porque ninguno distingue razón y sentidos", "Porque ambos niegan el cambio"], 0,
    ["Dos mundos: lo que cambia y lo que permanece."]);
  O("hp22", 2, "En la línea dividida, el grado más bajo (eikasía) conoce…", ["imágenes, sombras y reflejos", "las Ideas", "los objetos matemáticos", "las cosas concretas"], 0,
    ["Eikasía = imaginación: imágenes. Pístis = cosas concretas."]);
  O("hp23", 2, "¿Qué papel tiene el esclavo del <i>Menón</i> en la argumentación de Platón?",
    ["Muestra que se puede «sacar» un saber geométrico sin enseñárselo, luego ya estaba en su alma", "Demuestra que los esclavos no pueden aprender", "Prueba que el conocimiento viene de los sentidos", "Ilustra la democracia ateniense"], 0,
    ["Con preguntas, el esclavo descubre cómo duplicar un cuadrado: reminiscencia."]);
  O("hp24", 2, "¿Qué relación hay entre Platón y Sócrates respecto a las definiciones?",
    ["Platón da un objeto real (la Idea) a lo que Sócrates buscaba definir", "Platón rechaza buscar definiciones", "Platón cree que no hay definiciones posibles", "No hay relación"], 0,
    ["De «¿qué es la justicia?» a «la Idea de Justicia existe»."]);
  O("hp25", 2, "Para el intelectualismo moral, se obra mal por…", ["ignorancia del Bien", "mala suerte", "voluntad perversa", "un castigo divino"], 0,
    ["Nadie hace el mal voluntariamente; falta conocer el Bien."]);
  O("hp26", 2, "¿Por qué Platón desconfía de la democracia?",
    ["Porque gobernar exige un saber y la democracia condenó a Sócrates", "Porque quiere una monarquía hereditaria", "Porque rechaza toda ley", "Porque defiende la tiranía"], 0,
    ["Gobernar es un saber, como el del piloto; la mayoría no lo tiene."]);
  O("hp27", 2, "Según la <i>República</i>, ¿cuál es la forma de gobierno más degradada?", ["La tiranía", "La aristocracia", "La timocracia", "La oligarquía"], 0,
    ["Aristocracia → timocracia → oligarquía → democracia → tiranía."]);
  O("hp28", 2, "¿Qué significa que el cuerpo sea una «cárcel» (<i>sêma</i>) del alma?",
    ["Que el alma está atada a lo sensible y debe liberarse para contemplar las Ideas", "Que el cuerpo es malo y debe destruirse", "Que el alma no existe", "Que el alma se crea con el cuerpo"], 0,
    ["No es odio al cuerpo, sino que el alma debe mandar sobre él."]);
  O("hp29", 2, "En el Estado ideal, la virtud de los guardianes es…", ["la valentía", "la templanza", "la sabiduría", "la justicia"], 0,
    ["Guardianes ↔ alma irascible ↔ valentía."]);
  O("hp30", 2, "La Idea de Bien es comparada con el Sol porque…",
    ["da a las Ideas su verdad y ser, como el Sol da luz y vida a las cosas", "se parece físicamente al Sol", "está en el cielo", "es adorada por los atenienses"], 0,
    ["Causa del ser y del conocer."]);

  // ---- nivel 3
  O("hp31", 3, "Texto: «Lo que proporciona la verdad a las cosas cognoscibles y otorga al que conoce el poder de conocer, es la Idea del Bien» (<i>República</i>). Su idea principal es…",
    ["que el Bien es el principio de la verdad y del conocimiento", "que el Sol es un dios", "que el conocimiento viene de los sentidos", "que el Bien es relativo"], 0,
    ["Tema: la Idea de Bien como principio supremo (el Sol del mundo inteligible)."], null, "Tu respuesta");
  O("hp32", 3, "Texto: «No cesarán los males de las ciudades hasta que los filósofos gobiernen o los gobernantes filosofen» (<i>República</i>, V). Su idea principal es…",
    ["que el buen gobierno exige unir el poder político y el saber filosófico", "que los filósofos deben evitar la política", "que los gobernantes deben ser guerreros", "que la democracia es el mejor sistema"], 0,
    ["Tesis del filósofo-rey: solo quien conoce el Bien puede gobernar bien."]);
  O("hp33", 3, "Un alumno afirma: «según Platón, lo que percibimos con los sentidos no existe». ¿Qué matiz es el correcto?",
    ["Existe, pero es menos real: copia que participa de las Ideas", "Tiene razón: es una ilusión total", "Es más real que las Ideas", "Es creado por el alma"], 0,
    ["Entre el ser y el no ser: existe como copia."]);
  O("hp34", 3, "¿Qué diferencia hay entre diánoia y nóesis?",
    ["La primera parte de hipótesis y usa figuras; la segunda asciende por la dialéctica sin imágenes hasta el Bien", "La primera es del mundo sensible y la segunda del inteligible", "No hay diferencia", "La primera usa los sentidos y la segunda la fe"], 0,
    ["Ambas son epistéme (mundo inteligible), pero con distinto método."]);
  O("hp35", 3, "¿Por qué la reminiscencia exige que el alma sea inmortal y preexistente?",
    ["Porque, si recordamos lo que contemplamos, el alma tuvo que existir y ver las Ideas antes de unirse al cuerpo", "Porque el cuerpo es eterno", "Porque no necesitamos ver las Ideas", "Porque el alma nace con el cuerpo y aprende por los sentidos"], 0,
    ["Recordar supone haber conocido antes: la teoría presupone la preexistencia."]);
  O("hp36", 3, "¿Cuál es la crítica principal de Aristóteles a la teoría de las Ideas?",
    ["Que las Ideas separadas duplican el mundo sin explicarlo: la forma está en las cosas", "Que las Ideas no son eternas", "Que no hay conocimiento", "Que el alma no existe"], 0,
    ["Aristóteles (tema 4) sitúa la forma dentro de la sustancia concreta."]);
  O("hp37", 3, "Platón y Descartes coinciden en…", ["el innatismo y el dualismo alma–cuerpo", "el empirismo", "el materialismo", "la negación del alma"], 0,
    ["Ambos creen que hay ideas ya presentes en el alma y que alma y cuerpo son distintos."]);
  M("hp38", 3, "Empareja cada elemento del mito con su símbolo.", [
    C("Las sombras", ["Apariencias", "Ideas", "Bien", "Mundo inteligible"], 0),
    C("El exterior", ["Apariencias", "Ideas", "Bien", "Mundo inteligible"], 3),
    C("El Sol", ["Apariencias", "Ideas", "Bien", "Mundo inteligible"], 2),
    C("Los seres reales", ["Apariencias", "Ideas", "Bien", "Mundo inteligible"], 1)],
    ["Sombras = apariencias · exterior = mundo inteligible · Sol = Bien · seres reales = Ideas."], "Sombras–apariencias, exterior–inteligible, Sol–Bien, seres reales–Ideas");
  M("hp39", 3, "Empareja cada grado de la línea dividida con su objeto.", [
    C("Eikasía", ["Imágenes", "Cosas concretas", "Objetos matemáticos", "Ideas"], 0),
    C("Pístis", ["Imágenes", "Cosas concretas", "Objetos matemáticos", "Ideas"], 1),
    C("Diánoia", ["Imágenes", "Cosas concretas", "Objetos matemáticos", "Ideas"], 2),
    C("Nóesis", ["Imágenes", "Cosas concretas", "Objetos matemáticos", "Ideas"], 3)],
    ["De abajo arriba: imágenes → cosas → matemáticas → Ideas."], "Eikasía–imágenes, pístis–cosas, diánoia–matemáticas, nóesis–Ideas");
  R("hp40", "Explica la teoría de las Ideas de Platón y cómo resuelve el problema planteado por Heráclito y Parménides. (Pregunta tipo PAU)", 9, [
    { t: "Define las Ideas: realidades objetivas, eternas, inmutables y modelo de las cosas", p: 0.5 },
    { t: "Distingue mundo sensible (cambiante, copia, opinión) y mundo inteligible (Ideas, ciencia)", p: 0.5 },
    { t: "Explica la participación o imitación entre ambos mundos", p: 0.3 },
    { t: "Menciona la Idea de Bien y su comparación con el Sol", p: 0.3 },
    { t: "Relaciona con Heráclito (cambio en lo sensible) y Parménides (ser inmutable en lo inteligible)", p: 0.4 }],
    ["Define Idea.", "Dos mundos.", "Participación.", "Bien.", "Heráclito y Parménides."], "Dos mundos: sensible (Heráclito) e inteligible (Parménides)");
  R("hp41", "Explica el mito de la caverna y su relación con la línea dividida. (Pregunta tipo PAU)", 8, [
    { t: "Resume el relato: prisioneros, sombras, liberación, ascenso, Sol, regreso", p: 0.5 },
    { t: "Identifica los símbolos: caverna = sensible, exterior = inteligible, Sol = Bien", p: 0.5 },
    { t: "Relaciona con la línea: eikasía, pístis, diánoia y nóesis", p: 0.4 },
    { t: "Explica el mensaje: educación como giro del alma y deber de regresar", p: 0.4 },
    { t: "Conecta con Sócrates o con el filósofo-rey", p: 0.2 }],
    ["Relato.", "Símbolos.", "Línea.", "Mensaje.", "Conexión."], "Ascenso de las sombras al Bien y regreso del sabio");
  R("hp42", "Explica la teoría platónica del alma, el conocimiento como reminiscencia y su relación con la ética. (Pregunta tipo PAU)", 8, [
    { t: "Dualismo: alma inmortal y preexistente, cuerpo mortal", p: 0.4 },
    { t: "Reminiscencia: conocer es recordar lo que el alma contempló (ejemplo: Menón)", p: 0.5 },
    { t: "Tres partes del alma con sus virtudes (sabiduría, valentía, templanza)", p: 0.5 },
    { t: "Justicia como armonía de las partes", p: 0.3 },
    { t: "Intelectualismo moral: se obra mal por ignorancia del Bien", p: 0.3 }],
    ["Alma.", "Reminiscencia.", "Tripartición.", "Justicia.", "Ética."], "Alma inmortal, conocer es recordar y virtud como armonía");
  R("hp43", "Explica el Estado ideal de Platón y su relación con la teoría del alma. Valóralo críticamente. (Pregunta tipo PAU)", 9, [
    { t: "Tres clases (gobernantes, guardianes, productores) y su correspondencia con las partes del alma", p: 0.5 },
    { t: "Justicia como cada clase cumpliendo su función", p: 0.4 },
    { t: "Filósofo-rey: gobierna quien conoce el Bien (regreso a la caverna)", p: 0.4 },
    { t: "Educación y selección por aptitud; medidas para guardianes (sin propiedad ni familia)", p: 0.3 },
    { t: "Valoración equilibrada: crítica a la democracia, elitismo (Popper) y su sentido de la política como saber", p: 0.4 }],
    ["Clases y alma.", "Justicia.", "Filósofo-rey.", "Educación.", "Valoración."], "Estado como alma «en grande», gobernado por filósofos");
  R("hp44", "Comenta este texto: «Lo que proporciona la verdad a las cosas cognoscibles y otorga al que conoce el poder de conocer, es la Idea del Bien» (Platón, <i>República</i>). Indica tema, ideas, relación con el autor y comparación con otro pensador.", 9, [
    { t: "Tema: la Idea de Bien como principio de verdad y conocimiento", p: 0.3 },
    { t: "Idea principal: el Bien hace conocibles y verdaderas las demás Ideas y da al sujeto el poder de conocer", p: 0.4 },
    { t: "Relaciona con el autor: Sol, dos mundos, línea y caverna", p: 0.5 },
    { t: "Relaciona con la ética y la política (el filósofo-rey conoce el Bien)", p: 0.3 },
    { t: "Compara con Aristóteles u otro autor (Bien inmanente frente a Bien separado)", p: 0.4 },
    { t: "Valoración o contexto", p: 0.1 }],
    ["Tema → idea principal → relación con el autor → comparación → valoración."], "Comentario del Bien en la República");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Los dos mundos de Platón", ancha: true,
      tabla: { cab: ["", "Mundo sensible", "Mundo inteligible"], filas: [
        ["Contiene", "cosas concretas", "Ideas (Bien en la cima)"],
        ["Rasgos", "cambia, múltiple, copia", "eterno, único, modelo"],
        ["Se conoce con", "sentidos", "razón"],
        ["Saber", "dóxa (opinión)", "epistéme (ciencia)"],
        ["Heráclito / Parménides", "Heráclito", "Parménides"]
      ] } },
    { titulo: "Línea dividida y caverna", ancha: true,
      tabla: { cab: ["Grado", "Objeto", "En la caverna"], filas: [
        ["Eikasía", "imágenes", "sombras en la pared"],
        ["Pístis", "cosas concretas", "objetos y fuego"],
        ["Diánoia", "matemáticas", "reflejos fuera"],
        ["Nóesis", "Ideas", "seres reales; el Sol = Bien"]
      ] } },
    { titulo: "Alma, virtud y Estado", ancha: true,
      tabla: { cab: ["Alma", "Virtud", "Clase"], filas: [
        ["Racional", "sabiduría", "gobernantes"],
        ["Irascible", "valentía", "guardianes"],
        ["Concupiscible", "templanza", "productores"],
        ["Armonía de todas", "justicia", "Estado justo"]
      ] } },
    { titulo: "Camino del conocimiento",
      pasos: ["Se vive entre sombras (opinión).", "Un giro del alma: se sale de la caverna.", "Ascenso por las matemáticas y la dialéctica.", "Contemplación del Bien.", "Regreso: gobernar y educar."],
      nota: "El sabio no se queda arriba: su deber es volver." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El mundo sensible no existe", bien: "Existe, pero es copia y menos real", por: "Participa de las Ideas." },
        { mal: "Las Ideas están en la cabeza", bien: "Son objetivas y eternas", por: "Existen aunque nadie piense en ellas." },
        { mal: "Las matemáticas son el saber más alto", bien: "Son diánoia, el escalón previo a la nóesis", por: "Parten de hipótesis y figuras." },
        { mal: "El liberado se queda arriba", bien: "Debe regresar a educar", por: "Deber del filósofo-rey." }
      ] }
  ];

  B.registrar("historia_fil", "t3", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.hf3a.secciones,
    nuevas: B.parte.hf3a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
