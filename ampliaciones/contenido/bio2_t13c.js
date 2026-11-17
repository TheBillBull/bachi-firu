/* ============================================================
   Biología II · ampliaciones · Tema 13 (parte C): Mutaciones e ingeniería genética
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t13.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h;
  function w(n, ref) { return H.w(n, ref && "bio2/t13/" + ref); }
  var A = B.parte.bio13a, Bb = B.parte.bio13b;

  // actividades repartidas por la teoría (se añaden al final de la sección correspondiente)
  A.secciones[1] += w("clasificar", "efecto");
  A.secciones[3] += w("clasificar", "tipos");
  A.nuevas[0].html += w("emparejar", "mutagenos");
  A.nuevas[2].html += w("emparejar", "tecnicas");
  A.nuevas[3].html += w("orden", "ordrec");
  Bb.nuevas[0].html += w("orden", "ordpcr");
  Bb.nuevas[1].html += w("orden", "orddolly");

  var resumen = [
    "Una <b>mutación</b> es un cambio heredable del material genético (no recombinación). Son <b>génicas</b> (secuencia de un gen), <b>cromosómicas</b> (estructura) y <b>genómicas</b> (número de cromosomas). Solo las <b>germinales</b> se heredan.",
    "En las génicas por sustitución: <b>silenciosa</b> (mismo aminoácido), de <b>cambio de sentido</b> (otro aminoácido, como GAG → GUG en la anemia falciforme) y <b>sin sentido</b> (codón de parada). Una inserción o deleción que no es múltiplo de 3 <b>desplaza el marco de lectura</b>.",
    "Cromosómicas: deleción, duplicación, inversión, translocación (cromosoma Filadelfia). Genómicas: aneuploidías (trisomía 21, Turner 45,X, Klinefelter 47,XXY) y poliploidías (3n, 4n, comunes en plantas).",
    "Mutágenos: <b>físicos</b> (UV: dímeros de timina; rayos X y γ: roturas), <b>químicos</b> (análogos de bases, ácido nitroso, intercalantes) y <b>biológicos</b> (virus, transposones). La mutación es la fuente de variabilidad de la evolución y, acumulada en oncogenes y genes supresores, origina el cáncer.",
    "Ingeniería genética: <b>enzimas de restricción</b> (cortan palíndromos, dejan extremos cohesivos) + <b>ligasa</b> + <b>vector</b> (plásmido) = ADN recombinante; se selecciona con antibiótico y azul/blanco. <b>PCR</b>: 95, 55 y 72 °C, Taq, 2<sup>n</sup> copias. Además: clonación (Dolly), transgénicos, <b>CRISPR-Cas9</b> (ARN guía + Cas9), terapia génica y bioética."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Mutaciones e ingeniería genética",
    autores: [
      { n: "Qué estudia", f: "cómo cambia el ADN y cómo lo manipulamos a propósito", l: "mutaciones · ADN recombinante · PCR · CRISPR" },
      { n: "Cohen y Boyer", f: "1973", l: "primer ADN recombinante" },
      { n: "Mullis", f: "1983", l: "inventa la PCR (Nobel 1993)" },
      { n: "Doudna y Charpentier", f: "2012", l: "CRISPR-Cas9 (Nobel 2020)" }
    ],
    obras: ["Mutación", "EcoRI", "Plásmido", "Taq", "CRISPR-Cas9"],
    bloques: [
      { t: "Qué es una mutación", frases: ["Cambio <b>heredable</b> en el ADN, no recombinación.", "Germinal se hereda; <b>somática</b> no.", "Fuente de variabilidad: base de la evolución."],
        tabla: { cab: ["Tipo", "Qué cambia"], filas: [["génica", "secuencia de un gen"], ["cromosómica", "estructura del cromosoma"], ["genómica", "número de cromosomas"]] } },
      { t: "Mutaciones génicas", frases: ["Sustitución: silenciosa, de sentido, sin sentido.", "Inserción o deleción: <b>frameshift</b> si no es múltiplo de 3.", "Ejemplo: GAG → GUG, anemia falciforme (Glu → Val)."],
        tabla: { cab: ["Sustitución", "Efecto"], filas: [["silenciosa", "mismo aminoácido"], ["cambio de sentido", "otro aminoácido"], ["sin sentido", "codón de parada"]] } },
      { t: "Cromosómicas y genómicas", frases: ["Deleción, duplicación, inversión, translocación.", "Aneuploidía: 2n ± 1 (Down +21, Turner 45,X).", "Poliploidía: 3n, 4n; frecuente en plantas."],
        tabla: { cab: ["Síndrome", "Cariotipo"], filas: [["Down", "47, +21"], ["Turner", "45, X"], ["Klinefelter", "47, XXY"]] } },
      { t: "Agentes mutágenos", frases: ["Físicos: UV (dímeros de T), rayos X y γ (roturas).", "Químicos: análogos de bases, intercalantes, nitroso.", "Biológicos: virus oncogénicos y transposones."] },
      { t: "ADN recombinante", frases: ["Enzima de restricción: corta un <b>palíndromo</b> (EcoRI, G↓AATTC).", "Extremos cohesivos + <b>ligasa</b> unen gen y vector.", "Selección: ampicilina y colonias <b>blancas</b> (azul/blanco)."],
        tabla: { cab: ["ADN cortado", "Fragmentos"], filas: [["lineal, n cortes", "n + 1"], ["circular, n cortes", "n"]] } },
      { t: "PCR, CRISPR y bioética", frases: ["PCR: <b>95 °C</b>, <b>55 °C</b>, <b>72 °C</b>; Taq; 2<sup>n</sup> copias.", "CRISPR: ARN guía lleva a Cas9, que corta el gen.", "Terapia génica somática sí; germinal, prohibida."],
        tabla: { cab: ["Técnica", "Idea"], filas: [["PCR", "copia un fragmento"], ["CRISPR", "edita un gen"], ["clonación", "copia un organismo"], ["transgénico", "gen de otra especie"]] } }
    ],
    resumen: [
      "Mutación = cambio <b>heredable</b>: génica, cromosómica o genómica.",
      "<b>Restricción + ligasa + vector</b> = ADN recombinante; se selecciona con antibiótico y azul/blanco.",
      "<b>PCR</b> copia (2<sup>n</sup>) y <b>CRISPR</b> edita: la ética importa en las dos."
    ],
    conecta: [
      { con: "Biología T5 y T11:", rel: "estructura del ADN, replicación y reparación (origen de las mutaciones)." },
      { con: "Biología T7:", rel: "meiosis y no disyunción (aneuploidías); ciclo celular y cáncer." },
      { con: "Biología T12:", rel: "código genético y traducción para interpretar el efecto de una mutación." },
      { con: "Biología T16 y Química II:", rel: "evolución (la mutación crea variabilidad); enlaces y energía en el ADN." }
    ],
    claves: [
      ["Mutación", "cambio heredable del material genético que no es recombinación"],
      ["Frameshift", "inserción o deleción que no es múltiplo de 3 y desplaza el marco de lectura"],
      ["Aneuploidía", "falta o sobra algún cromosoma (2n ± 1, trisomía 21)"],
      ["Mutágeno", "agente físico, químico o biológico que aumenta la tasa de mutación"],
      ["Enzima de restricción", "endonucleasa que corta el ADN por una secuencia palindrómica concreta"],
      ["Vector", "ADN (plásmido, virus) que lleva un gen al interior de una célula y se replica"],
      ["ADN recombinante", "molécula con ADN de dos orígenes unidos por ligasa"],
      ["PCR", "reacción en cadena de la polimerasa: copia un fragmento de ADN en ciclos"],
      ["CRISPR-Cas9", "ARN guía + nucleasa Cas9 que corta un gen concreto para editarlo"],
      ["Transgénico", "organismo con un gen (transgén) de otra especie"]
    ],
    cita: { txt: "Un plásmido circular con n sitios de corte da n fragmentos; un ADN lineal da n + 1. Tras n ciclos de PCR hay 2ⁿ copias.", autor: "Dato para recordar", obra: "circular: n; lineal: n + 1; PCR: 2ⁿ" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    tipos: {
      titulo: "¿Génica, cromosómica o genómica?",
      consigna: "Clasifica cada cambio genético.",
      categorias: ["Génica", "Cromosómica", "Genómica"],
      items: [
        { t: "GAG → GUG en la β-globina (anemia falciforme)", c: 0 }, { t: "Deleción de 3 pb en el gen CFTR", c: 0 }, { t: "Inserción de 1 base que cambia el marco", c: 0 },
        { t: "Cromosoma Filadelfia t(9;22)", c: 1 }, { t: "Síndrome del maullido de gato (falta el brazo corto del 5)", c: 1 }, { t: "Inversión de un fragmento de un cromosoma", c: 1 },
        { t: "Trisomía 21 (síndrome de Down)", c: 2 }, { t: "Síndrome de Turner (45, X)", c: 2 }, { t: "Sandía triploide (3n)", c: 2 }, { t: "Trigo hexaploide (6n)", c: 2 }
      ]
    },
    efecto: {
      titulo: "Efecto de la mutación génica",
      consigna: "Clasifica cada cambio según su efecto en la proteína.",
      categorias: ["Silenciosa", "Cambio de sentido", "Sin sentido", "Desplazamiento del marco"],
      items: [
        { t: "GAG → GAA (Glu → Glu)", c: 0 }, { t: "CUU → CUC (Leu → Leu)", c: 0 },
        { t: "GAG → GUG (Glu → Val)", c: 1 }, { t: "CCU → CAU (Pro → His)", c: 1 },
        { t: "GAG → UAG (Glu → parada)", c: 2 }, { t: "CAG → UAG (Gln → parada)", c: 2 },
        { t: "Inserción de 1 base en medio del gen", c: 3 }, { t: "Deleción de 2 bases en medio del gen", c: 3 }
      ]
    },
    mutagenos: {
      titulo: "Agentes mutágenos y su efecto",
      consigna: "Une cada mutágeno con lo que hace.",
      pares: [
        ["Luz ultravioleta", "Forma dímeros de timina"],
        ["Rayos X y rayos γ", "Rompen una o las dos hebras del ADN"],
        ["Bromuro de etidio (intercalante)", "Provoca inserciones o deleciones"],
        ["Ácido nitroso", "Desamina la citosina y la convierte en uracilo"],
        ["5-bromouracilo", "Análogo de base que se aparea mal"]
      ]
    },
    tecnicas: {
      titulo: "Herramientas de la ingeniería genética",
      consigna: "Une cada herramienta con su función.",
      pares: [
        ["EcoRI", "Corta el ADN por el palíndromo G↓AATTC"],
        ["ADN ligasa", "Sella el enlace fosfodiéster y une los fragmentos"],
        ["Taq polimerasa", "Sintetiza ADN en la PCR a 72 °C y resiste 95 °C"],
        ["Retrotranscriptasa", "Copia ARN a ADNc"],
        ["Cas9 con ARN guía", "Corta las dos hebras en una secuencia concreta"],
        ["X-gal", "Hace azules las colonias con lacZ intacto"]
      ]
    },
    ordrec: {
      titulo: "Construir un ADN recombinante",
      consigna: "Ordena los pasos para clonar un gen en un plásmido.",
      items: [
        { t: "Cortar el plásmido y el gen con la misma enzima de restricción" },
        { t: "Mezclar y unir con ADN ligasa" },
        { t: "Introducir el plásmido en bacterias (transformación)" },
        { t: "Sembrar en una placa con ampicilina y X-gal" },
        { t: "Escoger las colonias blancas y cultivarlas" }
      ]
    },
    ordpcr: {
      titulo: "Una PCR",
      consigna: "Ordena el procedimiento.",
      items: [
        { t: "Mezclar molde, cebadores, Taq, nucleótidos y tampón" },
        { t: "Desnaturalización: ≈ 95 °C, se separan las hebras" },
        { t: "Anillamiento: ≈ 55 °C, los cebadores se unen al molde" },
        { t: "Extensión: 72 °C, la Taq alarga los cebadores" },
        { t: "Repetir 25-35 ciclos y comprobar el producto por electroforesis" }
      ]
    },
    orddolly: {
      titulo: "Clonar una oveja como Dolly",
      consigna: "Ordena los pasos.",
      items: [
        { t: "Aislar el núcleo de una célula somática de la oveja que se copia" },
        { t: "Quitar el núcleo a un óvulo de otra oveja" },
        { t: "Introducir el núcleo somático en el óvulo y estimularlo" },
        { t: "El óvulo se divide y forma un embrión" },
        { t: "Implantar el embrión en el útero de una tercera oveja" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 13",
      preguntas: [
        { q: "Una mutación que cambia el codón GAG por GUG en el ARNm es…", op: ["de cambio de sentido", "silenciosa", "sin sentido", "un desplazamiento del marco"], ok: 0, porque: "GAG es Glu y GUG es Val: cambia el aminoácido." },
        { q: "¿Cuál de estas mutaciones se hereda a los hijos?", op: ["La que ocurre en una célula que formará gametos", "La de una célula de la piel", "La que causa un tumor de pulmón", "Ninguna, nunca"], ok: 0, porque: "Solo las mutaciones germinales pasan a la descendencia." },
        { q: "Un individuo con 47 cromosomas y tres copias del 21 tiene una mutación…", op: ["genómica (aneuploidía)", "génica", "cromosómica estructural", "silenciosa"], ok: 0, porque: "Cambia el número de cromosomas: trisomía 21." },
        { q: "La luz ultravioleta provoca principalmente…", op: ["dímeros de timina", "roturas de doble hebra", "desaminación de la citosina", "inserciones de bases"], ok: 0, porque: "Dos timinas contiguas se unen; los sistemas de reparación (NER) los arreglan." },
        { q: "Un plásmido circular se corta con una enzima que tiene 3 sitios. ¿Cuántos fragmentos salen?", op: ["3", "4", "2", "1"], ok: 0, porque: "En una molécula circular, n cortes dan n fragmentos." },
        { q: "¿Qué enzima se usa en la PCR y por qué?", op: ["Taq polimerasa, porque resiste altas temperaturas", "ADN ligasa, porque une fragmentos", "Helicasa, porque abre la hélice", "ARN polimerasa, porque copia el gen"], ok: 0, porque: "El calor (95 °C) abre la hélice; la Taq no se desnaturaliza." },
        { q: "Una colonia blanca en una placa con ampicilina y X-gal indica…", op: ["bacteria con plásmido recombinante", "bacteria sin plásmido", "bacteria con plásmido vacío", "bacteria muerta"], ok: 0, porque: "Sin ampicilina no crecería; blanca = lacZ interrumpido por el gen insertado." },
        { q: "En CRISPR-Cas9, el ARN guía sirve para…", op: ["dirigir Cas9 a la secuencia diana", "cortar el ADN", "unir los fragmentos", "copiar el gen"], ok: 0, porque: "El ARN guía es complementario a la diana; la que corta es Cas9." },
        { q: "La oveja Dolly se obtuvo por…", op: ["transferencia del núcleo de una célula somática a un óvulo sin núcleo", "fecundación in vitro", "inyección de un plásmido", "mutación de un embrión"], ok: 0, porque: "Es clonación por transferencia nuclear." },
        { q: "La terapia génica germinal es distinta de la somática porque…", op: ["modifica gametos o embriones y se hereda", "usa siempre virus", "no usa vectores", "solo se hace con CRISPR"], ok: 0, porque: "Es la que afecta a las generaciones futuras: por eso está prohibida en casi todos los países." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["La ligasa corta el ADN por secuencias palindrómicas", "EcoRI deja extremos cohesivos", "El ADN lineal con 2 cortes da 3 fragmentos", "El plásmido es un vector"], ok: 0, porque: "Las que cortan son las enzimas de restricción; la ligasa une." },
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["Una mutación silenciosa cambia el aminoácido", "La inserción de 1 base desplaza el marco", "La mutación sin sentido crea una parada", "Las mutaciones son la fuente de variabilidad"], ok: 0, porque: "Silenciosa significa que el aminoácido NO cambia." },
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["Las colonias azules son las que llevan el gen insertado", "La ampicilina selecciona bacterias con plásmido", "Colonia blanca = lacZ interrumpido", "X-gal da color azul con lacZ intacto"], ok: 0, porque: "Las azules NO tienen gen insertado; las recombinantes son blancas." },
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["La PCR necesita ARN polimerasa", "La PCR usa dos cebadores", "Cada ciclo duplica las copias en el caso ideal", "La Taq resiste 95 °C"], ok: 0, porque: "Se usa una ADN polimerasa termoestable (Taq), no una ARN polimerasa." },
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["Una mutación en una célula de la piel se transmite a los hijos", "Una translocación mueve un fragmento a otro cromosoma", "El síndrome de Turner es 45, X", "La poliploidía es frecuente en plantas"], ok: 0, porque: "Las mutaciones somáticas no se heredan." },
        { q: "¿Cuál de estas frases contiene un ERROR?", op: ["La luz ultravioleta es radiación ionizante que rompe el ADN", "Los rayos X son radiación ionizante", "El 5-bromouracilo es un análogo de base", "Los intercalantes provocan indels"], ok: 0, porque: "La UV no es ionizante: forma dímeros de timina; las ionizantes (X, γ) rompen el ADN." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: mutaciones e ingeniería genética",
      cartas: [
        { a: "Mutación", b: "Cambio heredable del material genético que no se debe a la recombinación. Solo las germinales se heredan." },
        { a: "Mutación silenciosa", b: "El codón nuevo codifica el mismo aminoácido (código degenerado)." },
        { a: "Mutación sin sentido", b: "El codón nuevo es de parada: la proteína queda truncada." },
        { a: "Frameshift", b: "Inserción o deleción que no es múltiplo de 3: desplaza el marco y cambia todos los aminoácidos siguientes." },
        { a: "Aneuploidía y poliploidía", b: "Aneuploidía: falta o sobra algún cromosoma (2n ± 1). Poliploidía: juegos completos de más (3n, 4n)." },
        { a: "Dímero de timina", b: "Lo forma la luz UV al unir dos timinas contiguas; se repara por NER (fallo: xeroderma pigmentoso)." },
        { a: "Enzima de restricción", b: "Corta el ADN por un palíndromo concreto (EcoRI: G↓AATTC) dejando, a menudo, extremos cohesivos." },
        { a: "Fragmentos en un gel", b: "Lineal: n cortes → n + 1 fragmentos. Circular: n cortes → n. La suma de tamaños es la del ADN entero." },
        { a: "Azul/blanco", b: "La ampicilina selecciona bacterias con plásmido; las colonias blancas (lacZ interrumpido) llevan el gen insertado." },
        { a: "PCR", b: "95 °C separa, 55 °C cebadores, 72 °C Taq alarga. Copias = N₀ · 2ⁿ." },
        { a: "CRISPR-Cas9", b: "ARN guía complementario + Cas9: corta las dos hebras; la reparación inactiva o corrige el gen (Doudna y Charpentier, 2012)." },
        { a: "Terapia génica somática y germinal", b: "Somática: células del cuerpo, no se hereda. Germinal: gametos o embrión, se hereda; prohibida en la mayoría de países." }
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
  O("a1", 1, "Una mutación es…", ["un cambio heredable en el material genético que no se debe a la recombinación", "cualquier error de la replicación, aunque se corrija", "el reparto de genes en la meiosis", "una enfermedad hereditaria"], 0, ["Si el error se corrige, no queda como mutación.", "La recombinación solo baraja alelos que ya existían."], "Un cambio heredable del material genético que no se debe a la recombinación");
  O("a2", 1, "El cambio de una sola base dentro de un gen es una mutación…", ["génica", "cromosómica", "genómica", "somática obligatoriamente"], 0, ["Afecta a la secuencia de un gen: nivel génico."], "Génica");
  V("a3", 1, "Todas las mutaciones son perjudiciales.", false, ["Muchas son neutras (silenciosas) y algunas son beneficiosas en un ambiente concreto", "Sí, porque cambian el ADN", "Sí, porque siempre cambian la proteína", "No, pero todas son neutras"], 0, ["Una mutación silenciosa no cambia el aminoácido.", "La del alelo HbS protege (en heterocigosis) de la malaria."]);
  O("a4", 1, "¿Qué tipo de mutación cambia el número de cromosomas?", ["genómica", "génica", "cromosómica estructural", "silenciosa"], 0, ["La cromosómica cambia la estructura; la genómica, el número."], "Genómica");
  T("a5", 1, "Completa: una mutación en la que un codón con sentido pasa a ser un codón de parada se llama mutación sin…", "Palabra", ["sentido"], ["Sin sentido (<i>nonsense</i>): se corta la proteína."], "sentido");
  X("a6", 1, "En una PCR ideal que parte de 1 molécula de ADN, ¿cuántas copias hay tras 5 ciclos?", "Copias =", 32, "", ["Cada ciclo duplica.", "2⁵ = 32."], "32 copias");
  O("a7", 1, "¿Qué enzima une el gen y el vector tras cortarlos con la misma enzima de restricción?", ["ADN ligasa", "Helicasa", "Taq polimerasa", "Primasa"], 0, ["Los extremos cohesivos se aparean, pero hace falta sellar el enlace fosfodiéster."], "ADN ligasa");
  O("a8", 1, "Las enzimas de restricción cortan el ADN…", ["por secuencias concretas, normalmente palindrómicas", "al azar", "solo por los extremos", "en cualquier sitio con A y T"], 0, ["Cada enzima reconoce su secuencia de 4-8 pb."], "Por secuencias concretas, normalmente palindrómicas");
  M("a9", 1, "Une cada mutación cromosómica con su descripción.",
    [C("Deleción", ["Se pierde un fragmento", "Un fragmento se repite", "Un fragmento gira 180°", "Un fragmento pasa a otro cromosoma"], 0),
     C("Duplicación", ["Un fragmento se repite", "Se pierde un fragmento", "Un fragmento gira 180°", "Un fragmento pasa a otro cromosoma"], 0),
     C("Inversión", ["Un fragmento gira 180°", "Se pierde un fragmento", "Un fragmento se repite", "Un fragmento pasa a otro cromosoma"], 0),
     C("Translocación", ["Un fragmento pasa a otro cromosoma", "Se pierde un fragmento", "Un fragmento se repite", "Un fragmento gira 180°"], 0)],
    ["Deleción: se pierde. Duplicación: se repite. Inversión: cambia de sentido. Translocación: cambia de cromosoma."], "Deleción → pérdida; duplicación → repetición; inversión → giro; translocación → otro cromosoma");
  X("a10", 1, "Una persona con síndrome de Down (trisomía 21) tiene en sus células somáticas…", "Cromosomas =", 47, "", ["Lo normal es 46 (2n).", "Un cromosoma 21 de más: 46 + 1 = 47."], "47 cromosomas");
  T("a11", 1, "Completa: la ADN polimerasa que se usa en la PCR, porque resiste las temperaturas altas, es la polimerasa…", "Nombre", ["taq", "taq polimerasa", "polimerasa taq", "adn polimerasa taq"], ["Procede de <i>Thermus aquaticus</i>, una bacteria de aguas termales."], "Taq");
  O("a12", 1, "En el sistema CRISPR-Cas9, la molécula que lleva a Cas9 hasta el gen que se quiere cortar es…", ["un ARN guía", "un plásmido", "la ligasa", "la helicasa"], 0, ["Es complementario a la secuencia diana."], "Un ARN guía");
  V("a13", 1, "Un plásmido es una molécula de ADN circular, pequeña y extracromosómica, que puede usarse como vector.", true, ["Tiene origen de replicación propio y admite insertos", "Es un cromosoma bacteriano completo", "Está formado por proteínas", "Solo existe en eucariotas"], 0, ["Las bacterias los tienen además de su cromosoma."]);
  O("a14", 1, "¿Qué lesión provoca en el ADN la luz ultravioleta?", ["Dímeros de timina", "Roturas de doble hebra", "Pérdida de un cromosoma", "Duplicación de genes"], 0, ["Dos timinas contiguas se unen en una hebra.", "Las roturas las provocan las radiaciones ionizantes (rayos X y γ)."], "Dímeros de timina");
  O("a15", 1, "El cariotipo del síndrome de Turner es…", ["45, X", "47, XXY", "47, +21", "46, XX"], 0, ["Falta un cromosoma sexual: monosomía del X."], "45, X");
  T("a16", 1, "Completa: el gen de otra especie que se introduce en un organismo transgénico se llama…", "Nombre", ["transgen", "transgén"], ["Trans- (de otra especie) + gen."], "transgén");
  V("a17", 1, "La enzima EcoRI deja siempre extremos romos.", false, ["Deja extremos cohesivos de 4 nucleótidos (AATT)", "Sí, como todas las enzimas de restricción", "Sí, porque corta las dos hebras en el mismo punto", "No corta, solo une"], 0, ["Corta G↓AATTC en cada hebra, con los cortes desplazados.", "SmaI es de las que dejan extremos romos."]);

  // ---- nivel 2
  X("b1", 2, "Tras 20 ciclos de una PCR ideal que parte de 1 molécula, ¿cuántas copias hay?", "Copias =", 1048576, "", ["Cada ciclo duplica: 2²⁰.", "2²⁰ = 1 048 576."], "1 048 576 copias");
  X("b2", 2, "Una PCR ideal parte de 50 moléculas de ADN. ¿Cuántas moléculas hay tras 10 ciclos?", "Moléculas =", 51200, "", ["N = N₀ · 2ⁿ.", "50 · 2¹⁰ = 50 · 1024 = 51 200."], "51 200 moléculas");
  X("b3", 2, "¿Cuántos ciclos de una PCR ideal que parte de 1 molécula hacen falta, como mínimo, para superar el millón (10⁶) de copias?", "Ciclos =", 20, "", ["2¹⁹ = 524 288 (no llega).", "2²⁰ = 1 048 576 > 10⁶."], "20 ciclos");
  X("b4", 2, "Cada ciclo de una PCR dura 2 minutos (30 s a 95 °C, 30 s a 55 °C y 60 s a 72 °C). ¿Cuántos minutos duran 30 ciclos?", "Minutos =", 60, "min", ["30 · 2 min = 60 min."], "60 minutos (1 hora)");
  O("b5", 2, "En una PCR ideal que parte de una sola molécula, ¿a partir de qué ciclo aparecen las primeras moléculas del tamaño exacto de la región?", ["Del ciclo 3", "Del ciclo 1", "Del ciclo 2", "Del ciclo 10"], 0, ["Ciclo 1 y 2: productos más largos que la región.", "Ciclo 3: 2³ − 2·3 = 2 moléculas exactas."], "Del ciclo 3");
  O("b6", 2, "El ARNm 5′-AUG CAU GGU UUU UAA-3′ da Met–His–Gly–Phe. Si se pierde la 5.ª base (la A de CAU), ¿qué proteína empieza a salir? (CUG = Leu, GUU = Val, UUU = Phe)", ["Met–Leu–Val–Phe… y se pierde la parada", "Met–His–Gly–Phe, igual que antes", "Met solo, porque aparece una parada", "Met–His–Val–Phe"], 0, ["Se forma AUG CUG GUU UUU AA.", "Se lee Met–Leu–Val–Phe y el UAA original queda partido: no se lee como parada."], "Met–Leu–Val–Phe…, sin la parada original");
  X("b7", 2, "De las 9 sustituciones posibles de una sola base en el codón GAG (Glu), ¿cuántas dan un codón de parada?", "Nº =", 1, "", ["Cambios en 1.ª base: AAG, CAG, UAG → solo UAG es parada.", "2.ª base: GCG, GGG, GUG → ninguna parada. 3.ª base: GAA, GAC, GAU → ninguna.", "Solo 1."], "1 (GAG → UAG)");
  X("b8", 2, "De las 9 sustituciones posibles de una sola base en el codón CUU (Leu), ¿cuántas son silenciosas?", "Nº =", 3, "", ["Las de la 3.ª base: CUA, CUC y CUG siguen siendo Leu.", "Las de la 1.ª y 2.ª base cambian el aminoácido (AUU Ile, GUU Val, UUU Phe, CCU Pro, CAU His, CGU Arg)."], "3 silenciosas");
  O("b9", 2, "La deleción de 3 pares de bases consecutivos que corresponden exactamente a un codón (como en la fibrosis quística, ΔF508) produce…", ["una proteína con un aminoácido menos, sin desplazar el marco", "un desplazamiento del marco de lectura", "un codón de parada inmediato", "ningún efecto, es silenciosa"], 0, ["3 es múltiplo de 3: el resto se lee igual.", "Pero perder un aminoácido clave puede inutilizar la proteína."], "Una proteína con un aminoácido menos");
  X("b10", 2, "Un ADN lineal de 6000 pb se corta con EcoRI en las posiciones 1000 y 3000. ¿Cuántos pb tiene el fragmento más largo?", "Tamaño =", 3000, "pb", ["Fragmentos: 1000, 3000 − 1000 = 2000 y 6000 − 3000 = 3000.", "El mayor: 3000."], "3000 pb");
  X("b11", 2, "Un plásmido circular de 5000 pb se corta con EcoRI en las posiciones 800 y 2800. ¿Cuántos pb tiene el fragmento más corto?", "Tamaño =", 2000, "pb", ["Un fragmento va de 800 a 2800: 2000 pb.", "El otro es el resto del círculo: 5000 − 2000 = 3000 pb."], "2000 pb");
  X("b12", 2, "El guisante tiene 2n = 14. ¿Cuántos cromosomas tiene un guisante triploide (3n)?", "Cromosomas =", 21, "", ["n = 7.", "3n = 21."], "21 cromosomas");
  O("b13", 2, "Si el par 21 no se separa en la <b>meiosis II</b> de una mujer, ¿cuántos de los 4 óvulos potenciales son anormales?", ["2", "4", "1", "0"], 0, ["Solo falla una de las dos células de la segunda división.", "Esa célula da un gameto n + 1 y otro n − 1; la otra da 2 normales."], "2 de los 4");
  V("b14", 2, "Una mutación que aparece en una célula de la piel de un adulto puede pasar a sus hijos.", false, ["Es somática: no llega a los gametos", "Sí, porque todas las células tienen el mismo ADN", "Sí, si causa un tumor", "Sí, si el hijo nace por cesárea"], 0, ["Solo las mutaciones de la línea germinal se heredan."]);
  O("b15", 2, "El cromosoma Filadelfia (leucemia mieloide crónica) es un ejemplo de…", ["translocación", "deleción", "trisomía", "mutación silenciosa"], 0, ["Es t(9;22): ABL pasa al cromosoma 22 y se une a BCR."], "Translocación");
  O("b16", 2, "Las pruebas PCR del COVID-19 incluyen un paso de retrotranscripción porque el SARS-CoV-2…", ["es un virus de ARN y hay que pasarlo a ADNc", "es una bacteria", "tiene ADN circular", "no tiene material genético"], 0, ["La Taq solo copia ADN: primero la retrotranscriptasa hace ADNc a partir del ARN viral."], "Es un virus de ARN: se pasa a ADNc con retrotranscriptasa");
  T("b17", 2, "Completa: los sitios que reconocen la mayoría de las enzimas de restricción son secuencias…", "Palabra", ["palindromica", "palindromicas", "palindromo", "palindromos"], ["Se leen igual de 5′ a 3′ en las dos hebras (G AATT C)."], "palindrómicas");
  O("b18", 2, "¿Por qué en una PCR hacen falta DOS cebadores distintos?", ["Uno para cada hebra: delimitan la región que se copia", "Uno sirve de molde y el otro de enzima", "Porque la Taq necesita dos extremos 5′", "Uno inicia y el otro termina la transcripción"], 0, ["Un cebador se une al extremo 3′ de cada hebra.", "La región amplificada queda entre los dos."], "Uno para cada hebra; delimitan la región");
  M("b19", 2, "Une cada etapa del ciclo de la PCR con lo que ocurre.",
    [C("Desnaturalización (≈ 95 °C)", ["Se separan las hebras", "Los cebadores se unen al molde", "La Taq alarga los cebadores"], 0),
     C("Anillamiento (≈ 55 °C)", ["Los cebadores se unen al molde", "Se separan las hebras", "La Taq alarga los cebadores"], 0),
     C("Extensión (72 °C)", ["La Taq alarga los cebadores", "Se separan las hebras", "Los cebadores se unen al molde"], 0)],
    ["Alta temperatura: separa. Temperatura intermedia: los cebadores se unen. 72 °C: es la óptima de la Taq."], "95 °C separa; 55 °C cebadores; 72 °C Taq alarga");
  O("b20", 2, "Tras sembrar bacterias transformadas en una placa con ampicilina y X-gal, ¿qué colonias llevan el gen insertado en el polilinker de lacZ?", ["Las blancas", "Las azules", "Las que no crecen", "Todas las que crecen"], 0, ["Crecer implica tener plásmido (resistencia).", "Blanca = lacZ interrumpido por el gen."], "Las colonias blancas");
  X("b21", 2, "En una placa aparecen 240 colonias y el 15 % son blancas. ¿Cuántas colonias son recombinantes?", "Colonias =", 36, "", ["Blanca = recombinante (con ampicilina ya se descartaron las sin plásmido).", "240 · 0,15 = 36."], "36 colonias");

  // ---- nivel 3
  M("c1", 3, "El ADN lineal de 6000 pb tiene dos sitios EcoRI (cortes en 1000 y 3000) y un sitio BamHI (corte en 2200). Se digiere con las dos enzimas a la vez. ¿Cuántos fragmentos salen y cuántos pb tiene el más pequeño?",
    [{ tipo: "num", etiqueta: "Fragmentos", valor: 4 }, { tipo: "num", etiqueta: "El más pequeño (pb)", valor: 800, unidad: "pb" }],
    ["Cortes: 1000, 2200 y 3000. Lineal: 3 cortes → 4 fragmentos.", "Fragmentos: 1000, 1200, 800 y 3000 (suma 6000)."], "4 fragmentos; el más pequeño, 800 pb");
  M("c2", 3, "Una PCR ideal parte de 1 molécula y hace 5 ciclos. Calcula cuántas moléculas hay en total y cuántas tienen exactamente el tamaño de la región (2ⁿ − 2n).",
    [{ tipo: "num", etiqueta: "Total", valor: 32 }, { tipo: "num", etiqueta: "Del tamaño exacto", valor: 22 }],
    ["Total: 2⁵ = 32.", "Exactas: 2⁵ − 2·5 = 32 − 10 = 22.", "Las otras 10 son productos más largos que la región."], "32 en total; 22 del tamaño exacto");
  X("c3", 3, "Una PCR parte de 1 molécula y tiene una eficiencia del 90 % por ciclo (N = N₀ · 1,9ⁿ). ¿Cuántas copias hay tras 10 ciclos?", "Copias =", 613.1, "", ["N = 1,9¹⁰.", "1,9¹⁰ ≈ 613,1.", "Con eficiencia 100 % serían 1024: se pierde casi el 40 %."], "≈ 613 copias", 0.005);
  O("c4", 3, "El ARNm 5′-AUG UUC AAA GGG UGA-3′ da Met–Phe–Lys–Gly. Se inserta una G entre la 6.ª y la 7.ª base. ¿Cómo empieza la proteína nueva? (GAA = Glu, AGG = Arg, GUG = Val)", ["Met–Phe–Glu–Arg–Val…", "Met–Phe–Lys–Gly–Gly", "Met–Phe–parada", "Met–Phe–Lys–Gly, igual que antes"], 0, ["Queda AUG UUC GAA AGG GUG A.", "Desde el punto de inserción todos los codones cambian, y la parada original (UGA) ya no se lee en su marco."], "Met–Phe–Glu–Arg–Val…");
  X("c5", 3, "La proteína CFTR normal tiene 1480 aminoácidos. La mutación ΔF508 elimina un codón completo (3 pb). ¿Cuántos aminoácidos tiene la proteína mutante?", "Aminoácidos =", 1479, "", ["Se pierde un aminoácido (Phe 508) y el marco no se desplaza.", "1480 − 1 = 1479."], "1479 aminoácidos");
  O("c6", 3, "El ADN lineal de 6000 pb da, con EcoRI, tres fragmentos que de izquierda a derecha miden 1000, 2000 y 3000 pb. Con BamHI se obtienen 2200 y 3800 pb. ¿En qué fragmento de EcoRI está el sitio BamHI?", ["En el de 2000 pb", "En el de 1000 pb", "En el de 3000 pb", "En ninguno"], 0, ["Los sitios EcoRI están en 1000 y 3000.", "BamHI corta en 2200, que está entre 1000 y 3000.", "Por tanto, parte el fragmento central de 2000 en 1200 + 800."], "En el de 2000 pb");
  X("c7", 3, "El ARN guía de CRISPR-Cas9 tiene 20 nt. ¿Cuántas secuencias distintas de 20 nucleótidos existen (4 bases)?", "Secuencias =", 1099511627776, "", ["Cada posición tiene 4 posibilidades.", "4²⁰ = 1 099 511 627 776 ≈ 1,1·10¹²."], "4²⁰ ≈ 1,1·10¹²", 0.005);
  X("c8", 3, "Si las bases fueran equiprobables y estuvieran al azar, ¿cuántos sitios de EcoRI (6 pb) se esperan en un genoma de 4,6·10⁶ pb? (Redondea a la unidad.)", "Sitios ≈", 1123, "", ["Un sitio de 6 pb aparece una vez cada 4⁶ = 4096 pb.", "4,6·10⁶ / 4096 ≈ 1123."], "≈ 1123 sitios", 0.005);
  X("c9", 3, "Con una tasa de 10⁻⁹ errores por base y replicación (tras corrección y reparación) y un genoma diploide de 6,4·10⁹ pb, ¿cuántas mutaciones nuevas aparecen, de media, al replicar todo el ADN de una célula?", "Mutaciones =", 6.4, "", ["6,4·10⁹ · 10⁻⁹ = 6,4."], "≈ 6,4 mutaciones", 0.005);
  O("c10", 3, "Para que <i>E. coli</i> fabrique una proteína humana se parte del ADNc y no del gen humano porque…", ["la bacteria no sabe eliminar los intrones", "la bacteria no tiene ribosomas", "el ADNc es más largo", "el código genético humano es distinto"], 0, ["El ADNc se obtiene del ARNm maduro con retrotranscriptasa: solo tiene exones.", "El código genético es universal (T12)."], "La bacteria no sabe eliminar los intrones");
  V("c11", 3, "Un plásmido circular con 3 sitios de corte para una enzima da 3 fragmentos.", true, ["En una molécula circular, n cortes dan n fragmentos", "Siempre da n + 1 fragmentos", "Da 2 fragmentos, sea cual sea n", "Depende del tamaño de los fragmentos"], 0, ["Cada corte separa un trozo del círculo; el último corte «cierra» el anillo."]);
  X("c12", 3, "Un ADNc de 1200 pb contiene la región codificante completa, incluido el codón de parada. ¿Cuántos aminoácidos tiene la proteína?", "Aminoácidos =", 399, "", ["1200 / 3 = 400 codones.", "Uno es el de parada y no codifica aminoácido: 399."], "399 aminoácidos");

  // ---- preguntas abiertas con rúbrica
  R("d1", "Explica los tipos de mutaciones génicas (sustitución e inserción o deleción) y sus efectos sobre la proteína, con un ejemplo real.",
    [{ t: "Sustitución: silenciosa, de cambio de sentido y sin sentido, con su efecto", p: 0.6 },
     { t: "Silenciosa por la degeneración del código", p: 0.3 },
     { t: "Inserción o deleción: desplazamiento del marco si no es múltiplo de 3", p: 0.5 },
     { t: "Efecto del frameshift: cambia todos los aminoácidos siguientes y suele truncar", p: 0.3 },
     { t: "Un ejemplo real (anemia falciforme GAG → GUG, fibrosis quística ΔF508…)", p: 0.3 }],
    ["Sustitución: silenciosa, sentido, sin sentido.", "Indels: marco.", "Efecto.", "Ejemplo."], "Sustituciones (3 tipos) e indels (frameshift si no múltiplo de 3) con ejemplo");
  R("d2", "Describe las etapas de una PCR, qué componentes necesita y para qué sirve.",
    [{ t: "Para qué: amplificar un fragmento concreto de ADN", p: 0.3 },
     { t: "Componentes: molde, dos cebadores, Taq, nucleótidos, tampón", p: 0.5 },
     { t: "Desnaturalización ≈ 95 °C", p: 0.3 },
     { t: "Anillamiento ≈ 55 °C de los cebadores", p: 0.3 },
     { t: "Extensión a 72 °C por la Taq y repetición de ciclos (2ⁿ copias)", p: 0.4 },
     { t: "Un uso (diagnóstico, huella genética, paternidad)", p: 0.2 }],
    ["Qué es.", "Componentes.", "Tres etapas con temperaturas.", "Ciclos y usos."], "Etapas y componentes de la PCR");
  R("d3", "Explica cómo se puede producir insulina humana en bacterias.",
    [{ t: "Obtener el gen (ADNc, sin intrones)", p: 0.4 },
     { t: "Cortar plásmido y gen con la misma enzima de restricción", p: 0.5 },
     { t: "Unir con ADN ligasa (ADN recombinante)", p: 0.4 },
     { t: "Introducir en la bacteria (transformación) y seleccionar (antibiótico, azul/blanco)", p: 0.4 },
     { t: "Cultivar y purificar; el código genético es universal", p: 0.3 }],
    ["Gen.", "Restricción y ligasa.", "Transformación.", "Selección.", "Producción."], "Gen → plásmido → bacteria → selección → cultivo");
  R("d4", "Explica cómo funciona CRISPR-Cas9 y comenta una ventaja, un riesgo y una cuestión ética de su uso.",
    [{ t: "ARN guía complementario a la secuencia diana", p: 0.4 },
     { t: "Cas9 corta las dos hebras en ese punto", p: 0.4 },
     { t: "La reparación celular inactiva o corrige el gen", p: 0.4 },
     { t: "Una ventaja (precisión, rapidez, bajo coste, tratar enfermedades)", p: 0.3 },
     { t: "Un riesgo (efectos fuera de diana)", p: 0.3 },
     { t: "Una cuestión ética (edición germinal, desigualdad, «bebés a la carta»)", p: 0.3 }],
    ["Mecanismo.", "Reparación.", "Ventaja.", "Riesgo.", "Ética."], "Mecanismo, ventaja, riesgo y debate ético");
  R("d5", "Explica la relación entre mutaciones y cáncer. Distingue protooncogenes y genes supresores y di si el cáncer es siempre hereditario.",
    [{ t: "El cáncer suele deberse a la acumulación de varias mutaciones en células somáticas", p: 0.4 },
     { t: "Protooncogén → oncogén: ganancia de función, basta un alelo", p: 0.5 },
     { t: "Gen supresor (p53, BRCA…): pérdida de función, hacen falta los dos alelos", p: 0.5 },
     { t: "La mayoría de los cánceres son somáticos y no se heredan; solo las mutaciones germinales", p: 0.4 },
     { t: "Mutágenos que aumentan el riesgo (tabaco, UV, radiación)", p: 0.2 }],
    ["Acumulación.", "Oncogenes.", "Supresores.", "Herencia.", "Mutágenos."], "Acumulación de mutaciones; oncogenes y supresores; casi siempre somático");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Tipos de mutaciones", ancha: true,
      tabla: { cab: ["Tipo", "Qué cambia", "Ejemplo"], filas: [
        ["génica", "secuencia de un gen", "GAG → GUG"],
        ["cromosómica", "estructura del cromosoma", "translocación 9;22"],
        ["genómica", "número de cromosomas", "trisomía 21"]
      ] } },
    { titulo: "Sustituciones génicas", ancha: true,
      tabla: { cab: ["Tipo", "Ejemplo con GAG (Glu)"], filas: [
        ["silenciosa", "GAA (Glu)"],
        ["cambio de sentido", "GUG (Val): falciforme"],
        ["sin sentido", "UAG (parada)"],
        ["frameshift", "indel no múltiplo de 3"]
      ] } },
    { titulo: "Construir un recombinante",
      pasos: ["Cortar plásmido y gen con la misma enzima.", "Unir con ligasa.", "Transformar bacterias.", "Ampicilina: tienen plásmido.", "Blancas: llevan el gen."],
      nota: "Lineal: n + 1 fragmentos. Circular: n." },
    { titulo: "Los tres pasos de la PCR", ancha: true,
      tabla: { cab: ["Paso", "Temperatura", "Qué ocurre"], filas: [
        ["desnaturalización", "≈ 95 °C", "se separan las hebras"],
        ["anillamiento", "≈ 55 °C", "se unen los cebadores"],
        ["extensión", "72 °C", "la Taq alarga"]
      ] }, nota: "Copias = N₀ · 2ⁿ." },
    { titulo: "Somática o germinal", ancha: true,
      tabla: { cab: ["", "Somática", "Germinal"], filas: [
        ["células", "del cuerpo", "gametos o embrión"],
        ["¿se hereda?", "no", "sí"],
        ["terapia génica", "aprobada", "prohibida"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Las colonias azules son las recombinantes", bien: "Las recombinantes son las blancas (lacZ interrumpido)", por: "La ampicilina selecciona las que tienen plásmido; X-gal distingue las que llevan el gen." },
        { mal: "La ligasa corta el ADN por palíndromos", bien: "Corta la enzima de restricción; la ligasa une", por: "Tijeras frente a pegamento." },
        { mal: "Una mutación silenciosa cambia el aminoácido", bien: "El aminoácido no cambia", por: "El código genético es degenerado." },
        { mal: "Una mutación en una célula de la piel se hereda", bien: "No: es somática", por: "Solo se heredan las germinales." },
        { mal: "En un plásmido circular, n cortes dan n + 1 fragmentos", bien: "Dan n fragmentos", por: "El n + 1 es para ADN lineal." }
      ] }
  ];

  B.registrar("bio2", "t13", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: A.secciones,
    nuevas: A.nuevas.concat(Bb.nuevas),
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
