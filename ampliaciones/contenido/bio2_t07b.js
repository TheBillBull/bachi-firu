/* ============================================================
   Biología II · ampliaciones · Tema 7 (parte B): El núcleo y el ciclo celular
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t7.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>núcleo</b> tiene envoltura de <b>dos membranas</b> con poros, nucleoplasma, nucléolo (ARNr y ribosomas) y <b>cromatina</b> (ADN + histonas), que se condensa en <b>cromosomas</b> al dividirse. Cada cromosoma duplicado tiene 2 cromátidas unidas por el centrómero.",
    "El <b>ciclo celular</b> = interfase (G1, S, G2) + fase M. En S el ADN pasa de 2c a 4c sin cambiar el número de cromosomas. Lo controlan puntos de control, ciclinas y CDK; si falla (oncogenes, p53), hay cáncer.",
    "<b>Mitosis</b>: profase, metafase, anafase, telofase → 2 células idénticas (2n). Citocinesis animal por estrangulamiento; vegetal por placa celular y fragmoplasto.",
    "<b>Meiosis</b>: 1 replicación y 2 divisiones → 4 células haploides. Meiosis I separa homólogos (crossing-over en la profase I); la II separa cromátidas. Variabilidad por crossing-over, segregación al azar (2<sup>n</sup>) y fecundación."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "El núcleo y el ciclo celular",
    autores: [
      { n: "Qué estudia", f: "cómo se guarda el ADN en el núcleo y cómo se reparte al dividirse la célula", l: "cromatina · ciclo · mitosis · meiosis" },
      { n: "Flemming", f: "1882", l: "describe la mitosis y da nombre a la cromatina" },
      { n: "Hartwell, Nurse y Hunt", f: "2001", l: "Nobel por las ciclinas y las CDK que gobiernan el ciclo" }
    ],
    obras: ["Envoltura nuclear", "Cromosoma", "Interfase", "Mitosis", "Meiosis"],
    bloques: [
      { t: "El núcleo", frases: ["Envoltura de <b>2 membranas</b> con poros; continua con el RER.", "<b>Nucléolo</b>: fabrica ARNr y ribosomas.", "Cromatina en interfase; cromosomas al dividirse."],
        tabla: { cab: ["Cromatina", "Cromosoma"], filas: [["interfase, difusa", "división, compacto"], ["activa", "inactivo"], ["mismo ADN", "mismo ADN"]] } },
      { t: "El cromosoma", frases: ["2 <b>cromátidas</b> hermanas unidas por el <b>centrómero</b>.", "En el centrómero está el <b>cinetocoro</b> (une el huso).", "<b>Telómeros</b> en los extremos; 2n = 46 en la especie humana."] },
      { t: "El ciclo celular", frases: ["<b>Interfase</b> = G1 + S + G2; luego fase M.", "<b>S</b>: el ADN pasa de 2c a 4c; los cromosomas no cambian.", "Control: puntos G1/S, G2/M y del huso; ciclinas y CDK."],
        tabla: { cab: ["Fase", "Evento"], filas: [["G1", "crece"], ["S", "replica el ADN"], ["G2", "se prepara"], ["M", "se divide"]] } },
      { t: "La mitosis", frases: ["Profase, metafase, anafase y telofase.", "Anafase: se separan <b>cromátidas</b>; telofase: dos núcleos.", "Resultado: 2 células 2n idénticas; sirve para crecer y reparar."],
        tabla: { cab: ["Animal", "Vegetal"], filas: [["anillo contráctil", "placa celular"], ["con centriolos", "sin centriolos"]] } },
      { t: "La meiosis", frases: ["1 replicación + 2 divisiones → <b>4 células n</b>.", "<b>I</b> separa homólogos (reduccional); <b>II</b> separa cromátidas.", "Profase I: sinapsis, bivalentes, <b>crossing-over</b> y quiasmas."] },
      { t: "Variabilidad y errores", frases: ["Crossing-over + segregación al azar (2<sup>n</sup>) + fecundación.", "Humanos: 2<sup>23</sup> = 8 388 608 gametos distintos.", "No disyunción: Down (47, trisomía 21), Turner (45, X), Klinefelter (47, XXY)."] }
    ],
    resumen: [
      "Cromatina y cromosoma son <b>el mismo ADN</b> con distinta compactación; la fase S duplica el ADN, no los cromosomas.",
      "<b>Mitosis</b>: 2 hijas idénticas (2n). <b>Meiosis</b>: 4 hijas haploides y distintas (n).",
      "La meiosis <b>mantiene el número de cromosomas</b> y genera variabilidad."
    ],
    conecta: [
      { con: "Biología T5:", rel: "cromatina, nucleosomas y empaquetamiento del ADN." },
      { con: "Biología T6:", rel: "ribosomas, nucléolo, retículo y citoesqueleto (huso)." },
      { con: "Biología T11:", rel: "replicación del ADN en la fase S y mutaciones." },
      { con: "Biología T10 en adelante:", rel: "genética mendeliana: segregación y recombinación." },
      { con: "Química II:", rel: "enzimas y cinética: ciclinas y CDK actúan como enzimas." }
    ],
    claves: [
      ["Cromátida", "cada una de las dos copias idénticas (una molécula de ADN) de un cromosoma duplicado"],
      ["Centrómero", "región que une las cromátidas hermanas y donde se forma el cinetocoro"],
      ["Interfase", "G1 + S + G2: etapa de crecimiento y replicación del ADN, no de reposo"],
      ["Punto de control", "momento del ciclo en que la célula verifica que puede continuar"],
      ["Huso acromático", "estructura de microtúbulos que reparte los cromosomas en la división"],
      ["Citocinesis", "división del citoplasma al final de la mitosis o la meiosis"],
      ["Cromosomas homólogos", "par con los mismos genes, uno de cada progenitor"],
      ["Crossing-over", "intercambio de fragmentos entre cromátidas no hermanas en la profase I"],
      ["Haploide y diploide", "n = un juego de cromosomas; 2n = dos juegos"],
      ["No disyunción", "fallo en la separación de cromosomas o cromátidas que da gametos con cromosomas de más o de menos"]
    ],
    cita: { txt: "Cada día se dividen miles de millones de células de tu cuerpo, y cada una copia 6 400 millones de pares de bases casi sin errores.", autor: "Dato para recordar", obra: "ciclo celular humano ≈ 24 h" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    mitmei: {
      titulo: "Mitosis, meiosis o las dos",
      consigna: "Asigna cada rasgo al proceso que lo tiene.",
      categorias: ["Solo mitosis", "Solo meiosis", "Ambas"],
      items: [
        { t: "Dos células hijas", c: 0 }, { t: "Cuatro células hijas", c: 1 }, { t: "Crossing-over", c: 1 },
        { t: "Reproducción asexual", c: 0 }, { t: "Se forma un huso acromático", c: 2 }, { t: "Una sola replicación del ADN", c: 2 },
        { t: "Separación de cromosomas homólogos", c: 1 }, { t: "Hijas con la misma dotación que la madre", c: 0 }, { t: "Separación de cromátidas hermanas", c: 2 }
      ]
    },
    fases: {
      titulo: "Fases y acontecimientos",
      consigna: "Une cada fase con lo que ocurre en ella.",
      pares: [
        ["G1", "la célula crece y trabaja; ADN sin duplicar (2c)"],
        ["S", "se replica el ADN (de 2c a 4c)"],
        ["Metafase", "cromosomas alineados en la placa ecuatorial"],
        ["Anafase", "las cromátidas hermanas se separan hacia los polos"],
        ["Telofase", "se reforman los núcleos y desaparece el huso"],
        ["Profase I", "sinapsis y crossing-over entre homólogos"]
      ]
    },
    ordenmit: {
      titulo: "Ordena la mitosis",
      consigna: "Pon estos acontecimientos en el orden en que ocurren.",
      items: [
        { t: "Se condensa la cromatina y se forma el huso (profase)" },
        { t: "Se rompe la envoltura nuclear y el huso se une a los cinetocoros (prometafase)" },
        { t: "Los cromosomas se alinean en el ecuador (metafase)" },
        { t: "Las cromátidas hermanas se separan hacia polos opuestos (anafase)" },
        { t: "Se reforman los núcleos y los cromosomas se descondensan (telofase)" },
        { t: "El citoplasma se divide (citocinesis)" }
      ]
    },
    ordenmei: {
      titulo: "Ordena la meiosis",
      consigna: "Pon estos acontecimientos en el orden correcto.",
      items: [
        { t: "Replicación del ADN (fase S)" },
        { t: "Los homólogos se emparejan y se produce el crossing-over (profase I)" },
        { t: "Los bivalentes se alinean en el ecuador (metafase I)" },
        { t: "Se separan los cromosomas homólogos (anafase I)" },
        { t: "Dos células haploides con cromosomas de dos cromátidas (telofase I)" },
        { t: "Se separan las cromátidas hermanas (anafase II)" },
        { t: "Cuatro células haploides (telofase II)" }
      ]
    },
    quizmit: {
      titulo: "Mini-test de la mitosis",
      preguntas: [
        { q: "En la anafase de la mitosis se separan…", op: ["las cromátidas hermanas", "los cromosomas homólogos", "los centriolos solamente", "las dos membranas de la envoltura"], ok: 0, porque: "El centrómero se divide y cada cromátida pasa a ser un cromosoma." },
        { q: "La citocinesis de una célula vegetal se realiza mediante…", op: ["una placa celular", "un anillo de actina y miosina", "un surco de segmentación", "la rotura de la pared celular"], ok: 0, porque: "Vesículas del Golgi forman la placa celular de dentro a fuera." },
        { q: "En la metafase de una célula con 2n = 8, ¿cuántas cromátidas hay?", op: ["16", "8", "4", "32"], ok: 0, porque: "8 cromosomas de 2 cromátidas = 16." },
        { q: "El huso acromático está formado por…", op: ["microtúbulos", "microfilamentos de actina", "filamentos intermedios", "fibras de colágeno"], ok: 0, porque: "Son microtúbulos de tubulina." },
        { q: "Después de la mitosis de una célula 2n, las dos hijas son…", op: ["2n e idénticas entre sí", "n e idénticas entre sí", "2n y distintas entre sí", "n y distintas entre sí"], ok: 0, porque: "La mitosis mantiene la dotación y produce clones." }
      ]
    },
    quiz1: {
      titulo: "Test del tema 7",
      preguntas: [
        { q: "La envoltura nuclear está formada por…", op: ["dos membranas con poros nucleares", "una membrana sin poros", "una pared de celulosa", "una sola membrana con ribosomas"], ok: 0, porque: "Dos membranas, continuas con el RER, perforadas por poros." },
        { q: "El nucléolo es la zona del núcleo donde…", op: ["se forman las subunidades de los ribosomas", "se replica el ADN", "se sintetizan los lípidos", "se degrada el ARNm"], ok: 0, porque: "Allí se transcribe el ARNr y se ensamblan las subunidades ribosómicas." },
        { q: "En la fase S se duplica…", op: ["el ADN, pero no el número de cromosomas", "el número de cromosomas y el de cromátidas", "solo el nucléolo", "solo las proteínas del huso"], ok: 0, porque: "Cada cromosoma pasa de 1 a 2 cromátidas." },
        { q: "El complejo ciclina–CDK…", op: ["fosforila proteínas y permite pasar de fase", "replica el ADN", "forma el huso", "destruye la envoltura nuclear por sí solo"], ok: 0, porque: "La CDK solo es activa unida a la ciclina." },
        { q: "El gen supresor de tumores p53 frena el ciclo celular en…", op: ["G1, si hay daño en el ADN", "S, siempre", "la anafase", "la citocinesis"], ok: 0, porque: "Detiene G1, activa la reparación o la apoptosis." },
        { q: "Un bivalente está formado por…", op: ["dos cromosomas homólogos apareados (4 cromátidas)", "dos cromátidas hermanas", "un cromosoma y su ADN", "dos centrómeros de células distintas"], ok: 0, porque: "Es una pareja de homólogos con sinapsis: una tétrada." },
        { q: "¿Qué ocurre en la anafase I de la meiosis?", op: ["Se separan los cromosomas homólogos", "Se separan las cromátidas hermanas", "Se duplica el ADN", "Se forman cuatro células"], ok: 0, porque: "La anafase I es reduccional: separa homólogos." },
        { q: "Una célula humana (2n = 46) en la metafase II de la meiosis tiene…", op: ["23 cromosomas y 46 cromátidas", "46 cromosomas y 92 cromátidas", "23 cromosomas y 23 cromátidas", "46 cromosomas y 46 cromátidas"], ok: 0, porque: "Es haploide (23) pero con cromosomas aún duplicados." },
        { q: "¿Cuál de estos procesos aumenta la variabilidad genética?", op: ["El crossing-over en la profase I", "La mitosis", "La fase S", "La citocinesis"], ok: 0, porque: "También la segregación al azar de homólogos y la fecundación." },
        { q: "El síndrome de Down se debe a…", op: ["tres cromosomas 21 (47 cromosomas)", "un solo cromosoma X", "dos cromosomas X y un Y", "una falta del cromosoma 21"], ok: 0, porque: "Trisomía 21 por no disyunción." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre el núcleo es FALSA?", op: ["La envoltura nuclear es una única membrana", "Los poros nucleares regulan el paso de moléculas", "El nucléolo participa en la formación de ribosomas", "La cromatina es ADN unido a proteínas"], ok: 0, porque: "La envoltura nuclear tiene dos membranas." },
        { q: "¿Cuál de estas afirmaciones sobre el ciclo celular es FALSA?", op: ["La interfase es una fase de reposo", "En la fase S se replica el ADN", "G1 y G2 son fases de crecimiento", "Existen puntos de control"], ok: 0, porque: "La interfase es la fase de máxima actividad: crecimiento y replicación." },
        { q: "¿Cuál de estas afirmaciones sobre la mitosis es FALSA?", op: ["En la anafase se separan los cromosomas homólogos", "En la metafase los cromosomas se alinean en el ecuador", "En la telofase se reforma la envoltura nuclear", "Produce dos células idénticas a la madre"], ok: 0, porque: "En la mitosis se separan las cromátidas hermanas; los homólogos se separan en la anafase I de la meiosis." },
        { q: "¿Cuál de estas afirmaciones sobre la meiosis es FALSA?", op: ["Hay dos replicaciones del ADN, una antes de cada división", "Produce cuatro células haploides", "El crossing-over ocurre en la profase I", "La anafase II separa cromátidas"], ok: 0, porque: "Solo hay una replicación del ADN, antes de la meiosis I." },
        { q: "¿Cuál de estas afirmaciones sobre la citocinesis es FALSA?", op: ["En las células vegetales se forma un surco que estrangula la célula", "En las células animales interviene un anillo de actina y miosina", "En las vegetales aparece una placa celular", "Reparte el citoplasma entre las dos células hijas"], ok: 0, porque: "El surco de estrangulamiento es propio de las células animales." },
        { q: "¿Cuál de estas afirmaciones sobre cromosomas y cromátidas es FALSA?", op: ["Tras la fase S, el número de cromosomas se duplica", "Cada cromátida contiene una molécula de ADN", "Las cromátidas hermanas están unidas por el centrómero", "El cinetocoro es el sitio de unión del huso"], ok: 0, porque: "Tras la fase S se duplica el ADN, no el número de cromosomas: cada cromosoma tiene dos cromátidas." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas del tema 7",
      cartas: [
        { a: "Envoltura nuclear", b: "Dos membranas con espacio perinuclear, poros nucleares, continua con el RER. Se rompe en la profase y se reforma en la telofase." },
        { a: "Nucléolo", b: "Zona sin membrana donde se sintetiza el ARNr y se ensamblan las subunidades de los ribosomas." },
        { a: "Cromatina frente a cromosoma", b: "El mismo ADN + histonas: difuso en interfase (cromatina), compacto en división (cromosoma)." },
        { a: "Eucromatina y heterocromatina", b: "Eucromatina: laxa y con genes activos. Heterocromatina: compacta y silenciada." },
        { a: "Partes de un cromosoma", b: "Dos cromátidas hermanas, centrómero (con cinetocoro), brazos p y q, telómeros." },
        { a: "Cariotipo", b: "Conjunto de cromosomas de una célula en metafase, ordenados por pares y tamaño." },
        { a: "Fases del ciclo", b: "Interfase (G1 crece, S replica el ADN, G2 se prepara) y fase M (mitosis y citocinesis). G0: fuera del ciclo." },
        { a: "Puntos de control", b: "G1/S (el más importante), G2/M y metafase–anafase (huso)." },
        { a: "Ciclinas y CDK", b: "La CDK es una quinasa que solo funciona unida a su ciclina, cuya cantidad sube y baja en el ciclo." },
        { a: "p53", b: "Gen supresor de tumores: frena el ciclo en G1 si hay daño y activa reparación o apoptosis." },
        { a: "Fases de la mitosis", b: "Profase, metafase, anafase (se separan cromátidas), telofase. Resultado: 2 células 2n idénticas." },
        { a: "Citocinesis animal y vegetal", b: "Animal: anillo contráctil de actina y miosina (estrangulamiento). Vegetal: fragmoplasto y placa celular." },
        { a: "Meiosis I y II", b: "I reduccional: separa homólogos (2n → n). II ecuacional: separa cromátidas. 4 células haploides." },
        { a: "Profase I", b: "Leptoteno, zigoteno (sinapsis, bivalentes), paquiteno (crossing-over), diploteno (quiasmas), diacinesis." },
        { a: "Variabilidad genética", b: "Crossing-over, segregación independiente de homólogos (2^n) y fecundación al azar." },
        { a: "No disyunción", b: "Fallo en la separación: gametos n+1 y n−1. Down (47, +21), Turner (45, X), Klinefelter (47, XXY)." }
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
  function X(id, nv, enun, et, valor, unidad, pasos, res, tol) {
    var c = { tipo: "num", etiqueta: et, valor: valor, unidad: unidad };
    if (tol) c.tol = tol;
    N.push({ id: id, nivel: nv, enunciado: enun, check: c, pasos: pasos, resultado: res });
  }
  function R(id, enun, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 8, items: items }, pasos: pasos, resultado: res });
  }

  // ---- nivel 1
  O("a1", 1, "¿Cuántas membranas tiene la envoltura nuclear?", ["Dos, con espacio perinuclear entre ellas", "Una", "Tres", "Ninguna: es una pared de celulosa"], 0, ["Es una doble membrana, perforada por poros nucleares."], "Dos membranas");
  O("a2", 1, "¿Por dónde pasan el ARNm y las subunidades ribosómicas del núcleo al citoplasma?", ["Por los poros nucleares", "Atravesando la bicapa lipídica", "Por el nucléolo", "Por los centriolos"], 0, ["Los poros nucleares son complejos proteicos que regulan el tráfico núcleo–citoplasma."], "Por los poros nucleares");
  V("a3", 1, "El nucléolo está rodeado por una membrana propia.", false, ["No tiene membrana: es una zona densa del núcleo", "Tiene una doble membrana como el núcleo", "Tiene una sola membrana como los lisosomas", "Solo la tiene durante la mitosis"], 0, ["El nucléolo es una región del núcleo sin membrana donde se fabrican los ribosomas."]);
  O("a4", 1, "¿En qué fase de la interfase se replica el ADN?", ["En la fase S", "En la fase G1", "En la fase G2", "En la profase"], 0, ["S = síntesis de ADN.", "G1 y G2 son fases de crecimiento (gap)."], "En la fase S");
  O("a5", 1, "¿Cuándo se ven los cromosomas al microscopio óptico?", ["Durante la división celular, cuando la cromatina se condensa", "Siempre, en cualquier fase", "Solo en la fase S", "Solo en G1"], 0, ["En interfase la cromatina está difusa; en la división se condensa en cromosomas."], "Durante la división");
  T("a6", 1, "El complejo proteico del centrómero al que se unen los microtúbulos del huso se llama…", "Estructura", ["cinetocoro"], ["Se forma en el centrómero de cada cromátida."], "Cinetocoro");
  O("a7", 1, "¿Cuál es la fase de la mitosis que sigue a la metafase?", ["Anafase", "Profase", "Telofase", "Interfase"], 0, ["Orden: profase → metafase → anafase → telofase."], "Anafase");
  V("a8", 1, "La meiosis produce cuatro células haploides a partir de una célula diploide.", true, ["Son dos divisiones seguidas tras una sola replicación del ADN", "Produce dos células diploides", "Produce cuatro células diploides idénticas", "Produce una sola célula haploide siempre"], 0, ["Una célula 2n → 4 células n."]);
  X("a9", 1, "Una célula somática humana (2n = 46) se divide por mitosis. ¿Cuántos cromosomas tiene cada célula hija?", "Cromosomas", 46, "", ["La mitosis mantiene la dotación: las hijas son 2n = 46."], "46 cromosomas");
  O("a10", 1, "En una célula vegetal, la citocinesis se produce por…", ["una placa celular formada por vesículas del Golgi", "un anillo contráctil de actina y miosina", "estrangulamiento de la membrana", "digestión de la pared celular"], 0, ["La placa celular crece de dentro hacia fuera y da la nueva pared; el anillo es de células animales."], "Placa celular");
  O("a11", 1, "El crossing-over ocurre durante…", ["la profase I de la meiosis", "la anafase de la mitosis", "la fase S", "la telofase II"], 0, ["Entre cromátidas no hermanas de cromosomas homólogos apareados (paquiteno)."], "Profase I");
  T("a12", 1, "Los dos cromosomas del mismo par, uno de cada progenitor, se llaman cromosomas…", "Término", ["homologos", "homólogos"], ["Tienen los mismos genes (no necesariamente las mismas versiones)."], "Homólogos");
  X("a13", 1, "¿Cuántos cromosomas tiene un gameto humano?", "Cromosomas", 23, "", ["Gameto = haploide: n = 46 / 2."], "23 cromosomas");
  V("a14", 1, "La interfase es una fase de reposo en la que la célula no hace nada.", false, ["Es la fase de mayor actividad: crece y replica el ADN", "Es cuando se separan las cromátidas", "Es la fase en que se forman los gametos", "Dura menos que la mitosis"], 0, ["G1 crece, S replica el ADN, G2 se prepara."]);
  O("a15", 1, "El síndrome de Down se debe a…", ["una trisomía del cromosoma 21 (47 cromosomas)", "la monosomía del cromosoma X", "una trisomía de los cromosomas sexuales (XXY)", "una mutación en la mitocondria"], 0, ["Por no disyunción en la meiosis."], "Trisomía 21");

  // ---- nivel 2
  X("b1", 2, "Una célula con 2n = 8 está en metafase mitótica. ¿Cuántas cromátidas tiene?", "Cromátidas", 16, "", ["8 cromosomas duplicados, de 2 cromátidas cada uno."], "16 cromátidas");
  X("b2", 2, "Una célula humana (2n = 46) está en la anafase de una mitosis. ¿Cuántos cromosomas tiene en total, contando los de ambos polos?", "Cromosomas", 92, "", ["Se separan las 92 cromátidas, que ahora son cromosomas.", "46 hacia cada polo."], "92 cromosomas");
  X("b3", 2, "Una célula con 2n = 14 está en la profase I de la meiosis. ¿Cuántos bivalentes se forman?", "Bivalentes", 7, "", ["Cada bivalente es una pareja de homólogos: 14 / 2 = 7."], "7 bivalentes");
  M("b4", 2, "Una célula con 2n = 12 está en la metafase II de la meiosis. Calcula, para UNA célula, los cromosomas y las cromátidas.", [
    { tipo: "num", etiqueta: "Cromosomas", valor: 6, unidad: "" }, { tipo: "num", etiqueta: "Cromátidas", valor: 12, unidad: "" }],
    ["Tras la meiosis I la célula es haploide: n = 6 cromosomas.", "Todavía están duplicados: 2 cromátidas cada uno → 12."], "6 cromosomas y 12 cromátidas");
  M("b5", 2, "Una célula diploide en G1 tiene 6 pg de ADN. ¿Cuánto ADN tiene en G2 y cuánto tendrá cada gameto que produzca?", [
    { tipo: "num", etiqueta: "ADN en G2", valor: 12, unidad: "pg" }, { tipo: "num", etiqueta: "ADN de un gameto", valor: 3, unidad: "pg" }],
    ["La fase S duplica el ADN: 6 × 2 = 12 pg.", "El gameto es haploide y tiene la mitad que la célula en G1: 3 pg."], "12 pg en G2 y 3 pg en el gameto");
  X("b6", 2, "Un animal tiene 2n = 8. Sin contar el crossing-over, ¿cuántos tipos de gametos distintos puede producir por segregación independiente?", "Gametos distintos", 16, "", ["n = 4 pares de homólogos.", "2^4 = 16."], "16 gametos distintos");
  X("b7", 2, "Una célula se divide por mitosis cada 8 horas. Partiendo de una célula, ¿cuántas hay después de 48 horas?", "Células", 64, "", ["48 / 8 = 6 ciclos.", "2^6 = 64."], "64 células");
  M("b8", 2, "En una gónada, 50 espermatocitos primarios y 50 ovocitos primarios entran en meiosis. ¿Cuántos espermatozoides y cuántos óvulos se obtienen?", [
    { tipo: "num", etiqueta: "Espermatozoides", valor: 200, unidad: "" }, { tipo: "num", etiqueta: "Óvulos", valor: 50, unidad: "" }],
    ["Cada espermatocito da 4 espermatozoides: 50 × 4 = 200.", "Cada ovocito da 1 óvulo (y corpúsculos polares): 50."], "200 espermatozoides y 50 óvulos");
  O("b9", 2, "En una gráfica de ADN por célula de una mitosis, ¿qué acontecimiento hace caer el ADN de 4c a 2c?", ["La telofase y citocinesis, al partirse la célula", "La anafase, al separarse las cromátidas", "La metafase, al alinearse los cromosomas", "La fase G2, al revisar el ADN"], 0, ["En la anafase el ADN de la célula aún es 4c (todo está en una sola célula).", "Solo cae al repartirse entre dos células."], "Telofase y citocinesis");
  V("b10", 2, "En la anafase I de la meiosis se separan las cromátidas hermanas.", false, ["Se separan los cromosomas homólogos; las cromátidas hermanas lo hacen en la anafase II", "Se separan las cromátidas, igual que en la mitosis", "No se separa nada hasta la telofase", "Se separan los centriolos y nada más"], 0, ["Meiosis I: separa homólogos (reduccional).", "Meiosis II: separa cromátidas (ecuacional)."]);
  O("b11", 2, "Una CDK (quinasa dependiente de ciclina) solo es activa cuando…", ["está unida a su ciclina", "está sola en el núcleo", "la célula está en G0", "se ha destruido la envoltura nuclear"], 0, ["La CDK está siempre presente; la ciclina sube y baja y marca cuándo actúa."], "Unida a su ciclina");
  O("b12", 2, "Si el ADN de una célula está dañado, la proteína p53…", ["detiene el ciclo en G1 y activa la reparación o la apoptosis", "acelera la mitosis para eliminar al error", "destruye el huso", "inactiva la telomerasa y mata la célula en G2"], 0, ["p53 es un supresor de tumores («guardián del genoma»)."], "Detiene G1 y activa reparación o apoptosis");
  X("b13", 2, "En un cultivo asíncrono con un ciclo de 16 h, el 25 % de las células está en fase S. ¿Cuánto dura la fase S?", "Duración de S", 4, "h", ["El porcentaje de células en una fase es proporcional a su duración.", "0,25 · 16 = 4 h."], "4 h");
  X("b14", 2, "Dos progenitores con 2n = 6 (3 pares de homólogos) tienen un hijo. Sin contar el crossing-over, ¿cuántos cigotos distintos pueden formar entre los dos?", "Cigotos distintos", 64, "", ["Cada uno produce 2^3 = 8 gametos distintos.", "8 × 8 = 64."], "64 cigotos distintos");
  O("b15", 2, "En las células animales, la citocinesis se debe a…", ["un anillo contráctil de actina y miosina que estrangula la célula", "la formación de una placa celular", "el fragmoplasto", "la degradación de la membrana plasmática"], 0, ["El surco de segmentación avanza de fuera hacia dentro."], "Anillo contráctil de actina y miosina");
  V("b16", 2, "Una célula en G1 y otra en G2 de la misma especie tienen el mismo número de cromosomas.", true, ["Lo que cambia es el número de cromátidas y el ADN, no el de cromosomas", "La de G2 tiene el doble de cromosomas", "La de G1 tiene la mitad de cromosomas", "Solo coinciden en la mitosis"], 0, ["Ambas son 2n. G1: 2c; G2: 4c."]);
  O("b17", 2, "¿Cuál de estos rasgos es exclusivo de la meiosis?", ["Sinapsis de cromosomas homólogos", "Formación del huso acromático", "Condensación de la cromatina", "Separación de cromátidas hermanas"], 0, ["En la profase I los homólogos se emparejan (sinapsis) y forman bivalentes."], "Sinapsis de homólogos");

  // ---- nivel 3
  X("c1", 3, "Un histograma de citometría de flujo (cuantifica el ADN de miles de células) de un cultivo asíncrono muestra: el 55 % de las células con 2c, el 30 % con 4c y el 15 % con valores intermedios. El ciclo dura 20 h. ¿Cuánto dura la fase S?", "Duración de S", 3, "h", ["Las células con valores entre 2c y 4c están copiando su ADN: están en S.", "15 % de 20 h = 3 h."], "3 h");
  O("c2", 3, "Una gráfica de ADN por célula parte de 2c, sube a 4c, cae a 2c y vuelve a caer a 1c. Se trata de…", ["una meiosis", "una mitosis", "una fase S sin división", "una célula en G0"], 0, ["Dos caídas con una sola subida: dos divisiones tras una replicación.", "La última cantidad, 1c, es la de un gameto."], "Meiosis");
  M("c3", 3, "Una célula con 2n = 10 está en la anafase I de la meiosis. Calcula, para esa célula, los cromosomas y las cromátidas totales.", [
    { tipo: "num", etiqueta: "Cromosomas", valor: 10, unidad: "" }, { tipo: "num", etiqueta: "Cromátidas", valor: 20, unidad: "" }],
    ["En la anafase I solo se separan homólogos: el centrómero no se parte.", "Siguen siendo 10 cromosomas (5 hacia cada polo), cada uno con 2 cromátidas: 20."], "10 cromosomas y 20 cromátidas");
  O("c4", 3, "Se observa una célula con 3 cromosomas, cada uno con dos cromátidas, alineados uno a uno en el ecuador; la especie tiene 2n = 6. ¿En qué fase está?", ["Metafase II de la meiosis", "Metafase de la mitosis", "Metafase I de la meiosis", "Profase I de la meiosis"], 0, ["Tiene n = 3, no 2n = 6: no es mitosis.", "No hay bivalentes (cromosomas emparejados): no es la metafase I.", "Cromosomas dobles, solos, en el ecuador de una célula haploide: metafase II."], "Metafase II");
  X("c5", 3, "Sin contar el crossing-over, ¿qué probabilidad tiene un gameto humano de llevar los 23 cromosomas de origen materno? Responde «1 entre…».", "1 entre", 8388608, "", ["Cada par se reparte al azar: probabilidad 1/2 por par.", "(1/2)^23 = 1 / 8 388 608."], "1 entre 8 388 608 (≈ 1,2 · 10^-7)");
  V("c6", 3, "Si los homólogos no se separan en la anafase I de un ovocito humano, el óvulo resultante puede tener 24 cromosomas.", true, ["Un gameto recibe ambos homólogos (n + 1 = 24) y el otro ninguno (n − 1 = 22)", "El óvulo siempre tendrá 23 cromosomas", "Tendrá 46 cromosomas siempre", "El fallo no afecta al número de cromosomas"], 0, ["Esa no disyunción produce gametos n + 1 y n − 1.", "n + 1 fecundado da 47 cromosomas: por ejemplo, el síndrome de Down."]);
  X("c7", 3, "Una no disyunción afecta solo a una de las dos células que entran en meiosis II (meiosis I normal). De los cuatro gametos finales, ¿cuántos son anómalos?", "Gametos anómalos", 2, "", ["La célula afectada produce un gameto n + 1 y otro n − 1.", "La otra célula produce 2 gametos normales."], "2 de 4");
  M("c8", 3, "Una célula con 2n = 18 está en la profase I. ¿Cuántos bivalentes y cuántas cromátidas totales tiene?", [
    { tipo: "num", etiqueta: "Bivalentes", valor: 9, unidad: "" }, { tipo: "num", etiqueta: "Cromátidas", valor: 36, unidad: "" }],
    ["18 / 2 = 9 bivalentes.", "18 cromosomas duplicados = 36 cromátidas (4 por bivalente)."], "9 bivalentes y 36 cromátidas");
  X("c9", 3, "El genoma haploide humano tiene unos 3,2 · 10^9 pares de bases y cada par mide 0,34 nm. Una célula humana en G2 (4c) ¿cuántos metros de ADN contiene?", "Longitud de ADN", 4.352, "m", ["4c = 4 genomas haploides = 12,8 · 10^9 pb.", "12,8 · 10^9 · 0,34 nm = 4,352 · 10^9 nm = 4,352 m."], "≈ 4,35 m", 0.01);

  // ---- preguntas abiertas con rúbrica (2 puntos cada una)
  R("d1", "Describe la estructura del núcleo interfásico y la función de cada componente. (Pregunta tipo PAU)", [
    { t: "Envoltura de doble membrana con poros nucleares y continuidad con el RER", p: 0.5 },
    { t: "Poros: regulan el paso de ARN, ribosomas y proteínas", p: 0.4 },
    { t: "Nucléolo: síntesis de ARNr y ensamblaje de los ribosomas", p: 0.4 },
    { t: "Cromatina: ADN + histonas; eucromatina y heterocromatina", p: 0.4 },
    { t: "Nucleoplasma y relación cromatina–cromosoma", p: 0.3 }], ["Envoltura.", "Poros.", "Nucléolo.", "Cromatina.", "Nucleoplasma."], "Doble membrana con poros; nucléolo = ribosomas; cromatina = ADN + proteínas");
  R("d2", "Explica las fases del ciclo celular y cómo se controla. ¿Qué ocurre si el control falla? (Pregunta tipo PAU)", [
    { t: "Interfase (G1, S, G2) y fase M; qué ocurre en cada una", p: 0.5 },
    { t: "Fase S: replicación del ADN (2c → 4c)", p: 0.3 },
    { t: "Puntos de control (G1/S, G2/M, huso)", p: 0.4 },
    { t: "Ciclinas y CDK como reguladores", p: 0.4 },
    { t: "Fallo del control: oncogenes, supresores (p53) y cáncer", p: 0.4 }], ["Fases.", "Fase S.", "Puntos de control.", "Ciclinas y CDK.", "Cáncer."], "G1, S, G2, M; puntos de control; ciclinas–CDK; cáncer");
  R("d3", "Describe las fases de la mitosis y la citocinesis en una célula animal y en una vegetal. (Pregunta tipo PAU)", [
    { t: "Profase y prometafase: condensación, huso, rotura de la envoltura", p: 0.4 },
    { t: "Metafase: placa ecuatorial", p: 0.3 },
    { t: "Anafase: separación de cromátidas hermanas", p: 0.4 },
    { t: "Telofase: reforma de núcleos", p: 0.3 },
    { t: "Citocinesis animal: anillo contráctil", p: 0.3 },
    { t: "Citocinesis vegetal: fragmoplasto y placa celular", p: 0.3 }], ["Profase.", "Metafase.", "Anafase.", "Telofase.", "Animal.", "Vegetal."], "Profase → metafase → anafase → telofase; animal: estrangulamiento; vegetal: placa celular");
  R("d4", "Explica la meiosis y su importancia biológica. Indica cómo genera variabilidad. (Pregunta tipo PAU)", [
    { t: "Una replicación y dos divisiones: de 2n a n, 4 células", p: 0.4 },
    { t: "Meiosis I separa homólogos; II separa cromátidas", p: 0.4 },
    { t: "Profase I: sinapsis y crossing-over", p: 0.4 },
    { t: "Segregación independiente y fecundación al azar", p: 0.4 },
    { t: "Mantiene el número de cromosomas y favorece la evolución", p: 0.4 }], ["Esquema de la meiosis.", "I y II.", "Profase I.", "Variabilidad.", "Importancia."], "Reduce 2n → n; crossing-over, segregación al azar y fecundación");
  R("d5", "Compara la mitosis y la meiosis en al menos cuatro aspectos. (Pregunta tipo PAU)", [
    { t: "Número de divisiones y de células resultantes (1 y 2; 2 y 4)", p: 0.5 },
    { t: "Dotación de las hijas (2n frente a n)", p: 0.4 },
    { t: "Variabilidad: clones frente a distintas (crossing-over)", p: 0.4 },
    { t: "Qué se separa en la anafase (cromátidas frente a homólogos en la I)", p: 0.4 },
    { t: "Función: crecimiento y reparación frente a gametos", p: 0.3 }], ["Divisiones.", "Dotación.", "Variabilidad.", "Anafase.", "Función."], "Mitosis: 2 células 2n idénticas; meiosis: 4 células n distintas");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Cromatina frente a cromosoma", ancha: true,
      tabla: { cab: ["", "Cromatina", "Cromosoma"], filas: [
        ["cuándo", "interfase", "división"],
        ["aspecto", "difuso", "compacto"],
        ["material", "ADN + histonas", "el mismo, superempaquetado"]
      ] } },
    { titulo: "El ciclo celular",
      pasos: ["G1: la célula crece (2c).", "S: se replica el ADN (2c → 4c).", "G2: preparación y control.", "M: mitosis o meiosis y citocinesis."],
      nota: "Interfase = G1 + S + G2. G0 = fuera del ciclo." },
    { titulo: "Fases de la mitosis",
      pasos: ["Profase: cromosomas visibles, huso.", "Metafase: placa ecuatorial.", "Anafase: se separan cromátidas.", "Telofase: dos núcleos."],
      nota: "Resultado: 2 células 2n idénticas." },
    { titulo: "Mitosis frente a meiosis", ancha: true,
      tabla: { cab: ["", "Mitosis", "Meiosis"], filas: [
        ["divisiones", "1", "2"],
        ["células", "2", "4"],
        ["dotación", "2n", "n"],
        ["parecido", "idénticas", "distintas"],
        ["crossing-over", "no", "profase I"]
      ] } },
    { titulo: "Cromosomas y ADN por fase (2n = d)", ancha: true,
      tabla: { cab: ["Fase", "Cromosomas", "Cromátidas", "ADN"], filas: [
        ["G1", "d", "d", "2c"],
        ["G2 a metafase", "d", "2d", "4c"],
        ["Anafase mitótica", "2d", "2d", "4c"],
        ["Fin de la mitosis", "d", "d", "2c"],
        ["Telofase I a metafase II", "d/2", "d", "2c"],
        ["Gameto", "d/2", "d/2", "1c"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "La interfase es un reposo", bien: "Es la fase de mayor actividad", por: "G1 crece, S replica, G2 prepara." },
        { mal: "La fase S duplica los cromosomas", bien: "Duplica el ADN: cada cromosoma tiene 2 cromátidas", por: "El número de cromosomas es el de centrómeros." },
        { mal: "En la anafase I se separan cromátidas", bien: "Se separan los homólogos", por: "Las cromátidas se separan en la anafase II." },
        { mal: "En la meiosis el ADN se replica dos veces", bien: "Solo una vez, antes de la meiosis I", por: "Por eso salen células haploides." },
        { mal: "En las vegetales la citocinesis es un estrangulamiento", bien: "Es una placa celular", por: "El anillo de actina y miosina es animal." }
      ] }
  ];

  B.registrar("bio2", "t7", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio7a.secciones,
    nuevas: B.parte.bio7a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
