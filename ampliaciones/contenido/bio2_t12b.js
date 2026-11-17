/* ============================================================
   Biología II · ampliaciones · Tema 12 (parte B): Expresión génica
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras y traducciones las recalcula herramientas/verificar_bio2_t12.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>dogma central</b> (ADN → ARN → proteína) se resume en dos pasos: <b>transcripción</b> (ARN polimerasa, 5'→3', sobre la hebra molde) y <b>traducción</b> (ribosoma, codones de 3 bases). Excepciones: retrovirus (ARN → ADN), virus de ARN y priones.",
    "En eucariotas el pre-ARNm madura en el núcleo: <b>caperuza</b> en 5', <b>cola poli-A</b> en 3' y <b>splicing</b> (se quitan los intrones). El splicing alternativo da varias proteínas por gen.",
    "El <b>código genético</b> es de tripletes, degenerado, no ambiguo, sin solapamiento y casi universal: 64 codones (61 con sentido, AUG de inicio y UAA, UAG, UGA de parada) y 20 aminoácidos.",
    "La <b>traducción</b> tiene iniciación, elongación (sitios A, P y E; enlace peptídico y translocación) y terminación (factores de liberación). Los <b>operones lac</b> (inducible) y <b>trp</b> (reprimible) regulan la expresión en bacterias."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Expresión génica",
    autores: [
      { n: "Qué estudia", f: "cómo un gen se convierte en proteína y cómo se regula", l: "transcripción · traducción · operones" },
      { n: "Crick", f: "1958", l: "formula el dogma central" },
      { n: "Jacob y Monod", f: "1961", l: "descubren el operón lac" },
      { n: "Nirenberg y Matthaei", f: "1961", l: "UUU codifica fenilalanina (poli-U)" }
    ],
    obras: ["Dogma central", "ARN polimerasa", "Código genético", "Ribosoma y ARNt", "Operón"],
    bloques: [
      { t: "Dogma central", frases: ["ADN → ARN → proteína; la información no vuelve de proteína a ácido nucleico.", "Tres ARN: mensajero, de transferencia y ribosómico."],
        tabla: { cab: ["Proceso", "Resultado"], filas: [["Transcripción", "ADN → ARN"], ["Traducción", "ARNm → proteína"], ["Transcripción inversa", "ARN → ADN (VIH)"]] } },
      { t: "Transcripción", frases: ["La <b>ARN polimerasa</b> se une al <b>promotor</b>.", "Lee la hebra molde 3'→5' y sintetiza ARN 5'→3'.", "No necesita cebador; en el ARN la T pasa a <b>U</b>."] },
      { t: "Maduración (eucariotas)", frases: ["Ocurre en el núcleo, antes de salir al citoplasma.", "Splicing alternativo: un gen, varias proteínas."],
        tabla: { cab: ["Proceso", "Para qué"], filas: [["Caperuza 5'", "protege y señala inicio"], ["Poli-A en 3'", "estabiliza y exporta"], ["Splicing", "quita intrones"]] } },
      { t: "Código genético", frases: ["Tripletes: 4³ = 64 codones para 20 aminoácidos.", "Degenerado, no ambiguo, sin solapamiento y casi universal."],
        tabla: { cab: ["Codón", "Significado"], filas: [["AUG", "inicio y Met"], ["UAA, UAG, UGA", "parada"], ["UUU", "Phe"]] } },
      { t: "Traducción", frases: ["El ribosoma lee el ARNm 5'→3', codón a codón.", "ARNt: anticodón complementario y antiparalelo al codón.", "Iniciación, elongación (sitios A, P y E) y terminación."] },
      { t: "Regulación: operones", frases: ["Operón: promotor, operador y genes estructurales.", "El represor se une al operador y bloquea la transcripción."],
        tabla: { cab: ["Operón", "Se enciende cuando…"], filas: [["lac (inducible)", "hay lactosa y falta glucosa"], ["trp (reprimible)", "falta triptófano"]] } }
    ],
    resumen: [
      "Un gen se <b>transcribe</b> a ARN y el ARNm se <b>traduce</b> en el ribosoma; en eucariotas, el pre-ARNm antes <b>madura</b>.",
      "El <b>código genético</b> es degenerado y universal: AUG inicia y UAA, UAG, UGA paran.",
      "Los <b>operones</b> encienden o apagan grupos de genes según lo que hay en el ambiente."
    ],
    conecta: [
      { con: "Biología T11:", rel: "el ADN que se replica es el que se transcribe." },
      { con: "Biología T13:", rel: "mutaciones: cambios en la secuencia que alteran la proteína." },
      { con: "Biología T4 y T6:", rel: "proteínas, enlace peptídico, ribosomas y retículo." },
      { con: "Química II T1 y T7:", rel: "estructura de ácidos y bases, y energía de enlace." }
    ],
    claves: [
      ["Gen", "tramo de ADN que se transcribe a un ARN"],
      ["Promotor", "secuencia de ADN donde se une la ARN polimerasa"],
      ["Hebra molde", "la hebra de ADN que lee la ARN polimerasa"],
      ["Exón / intrón", "parte que queda en el ARNm / parte que se elimina"],
      ["Codón", "triplete de bases del ARNm que codifica un aminoácido"],
      ["Anticodón", "triplete del ARNt complementario del codón"],
      ["Código degenerado", "varios codones para un mismo aminoácido"],
      ["Operón", "genes con un promotor y un operador comunes"],
      ["Represor", "proteína que se une al operador y bloquea la transcripción"],
      ["Transcriptasa inversa", "enzima que fabrica ADN a partir de ARN (VIH)"]
    ],
    cita: { txt: "El ARNm es una copia de la hebra codificante, con U en lugar de T, y una complementaria de la molde.", autor: "Dato para recordar", obra: "64 codones: 61 con sentido y 3 de parada" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    arn: {
      titulo: "Moléculas y funciones",
      consigna: "Une cada molécula o enzima con su función.",
      pares: [
        ["ARN mensajero", "Lleva la información de un gen al ribosoma"],
        ["ARN de transferencia", "Transporta un aminoácido y tiene el anticodón"],
        ["ARN ribosómico", "Forma parte de las subunidades del ribosoma"],
        ["ARN polimerasa", "Sintetiza ARN a partir de una hebra molde de ADN"],
        ["Aminoacil-ARNt sintetasa", "Une cada aminoácido a su ARNt (gasta ATP)"],
        ["Transcriptasa inversa", "Fabrica ADN a partir de un molde de ARN"]
      ]
    },
    codigo: {
      titulo: "Características del código genético",
      consigna: "Une cada término con su significado.",
      pares: [
        ["Degenerado", "Varios codones codifican el mismo aminoácido"],
        ["No ambiguo", "Cada codón codifica un solo aminoácido"],
        ["Sin solapamiento", "Cada base pertenece a un solo codón"],
        ["Universal", "Es el mismo (casi) en todos los seres vivos"],
        ["AUG", "Codón de inicio, y codifica metionina"],
        ["UAA, UAG y UGA", "Codones de parada: no codifican aminoácido"]
      ]
    },
    proeuc: {
      titulo: "Procariotas o eucariotas",
      consigna: "Clasifica cada característica según la célula en la que ocurre.",
      categorias: ["Procariotas", "Eucariotas", "Ambos"],
      items: [
        { t: "Splicing de intrones", c: 1 }, { t: "ARNm policistrónico", c: 0 }, { t: "Ribosomas 70S", c: 0 },
        { t: "Ribosomas 80S", c: 1 }, { t: "Transcripción y traducción simultáneas", c: 0 }, { t: "Caperuza y cola poli-A", c: 1 },
        { t: "Primer aminoácido: formilmetionina", c: 0 }, { t: "Factores de transcripción generales", c: 1 },
        { t: "Código genético de tripletes", c: 2 }, { t: "Síntesis del ARN en sentido 5'→3'", c: 2 }
      ]
    },
    operones: {
      titulo: "Operón lac, operón trp o ambos",
      consigna: "Clasifica cada afirmación.",
      categorias: ["Operón lac", "Operón trp", "Ambos"],
      items: [
        { t: "Inducible", c: 0 }, { t: "Reprimible", c: 1 }, { t: "La alolactosa inactiva al represor", c: 0 },
        { t: "El triptófano activa al represor (correpresor)", c: 1 }, { t: "Regulación positiva por CAP-AMPc", c: 0 },
        { t: "Está encendido cuando falta el triptófano", c: 1 }, { t: "Tiene promotor, operador y genes estructurales", c: 2 },
        { t: "El represor se une al operador para apagarlo", c: 2 }, { t: "Controla una ruta de síntesis", c: 1 }, { t: "Controla una ruta de degradación", c: 0 }
      ]
    },
    ordentrad: {
      titulo: "Los pasos de la traducción",
      consigna: "Ordena lo que ocurre, desde el principio.",
      items: [
        { t: "La subunidad pequeña se une al ARNm y el ARNt iniciador reconoce el AUG" },
        { t: "Se une la subunidad grande: el ribosoma está completo" },
        { t: "Entra en el sitio A el ARNt con el anticodón complementario" },
        { t: "Se forma el enlace peptídico entre los dos aminoácidos" },
        { t: "El ribosoma avanza un codón (translocación)" },
        { t: "Llega un codón de parada y un factor de liberación suelta la proteína" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 12",
      preguntas: [
        { q: "¿Qué enzima sintetiza el ARNm?", op: ["ARN polimerasa", "ADN polimerasa", "Helicasa", "Ligasa"], ok: 0, porque: "Lee la hebra molde y construye ARN en sentido 5'→3'." },
        { q: "Si la hebra codificante es 5'-ATGGCA-3', el ARNm es…", op: ["5'-AUGGCA-3'", "5'-UACCGU-3'", "5'-TACCGT-3'", "5'-ACGGUA-3'"], ok: 0, porque: "El ARNm copia la codificante cambiando T por U." },
        { q: "El splicing consiste en…", op: ["eliminar los intrones y unir los exones", "añadir una caperuza en 5'", "traducir el ARNm", "copiar el ADN"], ok: 0, porque: "Deja solo la secuencia codificante." },
        { q: "El código genético es degenerado porque…", op: ["varios codones codifican el mismo aminoácido", "un codón codifica varios aminoácidos", "contiene errores", "solo vale en eucariotas"], ok: 0, porque: "64 codones para 20 aminoácidos." },
        { q: "El anticodón del ARNt para el codón 5'-AUG-3' es…", op: ["3'-UAC-5'", "3'-AUG-5'", "5'-UAC-3'", "3'-TAC-5'"], ok: 0, porque: "Es complementario y antiparalelo; el ARN usa U." },
        { q: "¿Qué ocurre cuando el ribosoma llega a UAA?", op: ["Un factor de liberación suelta la proteína", "Entra un ARNt que lleva un aminoácido de parada", "Se añade una metionina", "El ribosoma retrocede"], ok: 0, porque: "No hay ARNt para los codones de parada." },
        { q: "En ausencia de lactosa, el operón lac está apagado porque…", op: ["el represor se une al operador", "falta la ARN polimerasa", "hay glucosa", "se activa CAP"], ok: 0, porque: "El represor bloquea el paso de la polimerasa." },
        { q: "El virus VIH usa la transcriptasa inversa para…", op: ["fabricar ADN a partir de su ARN", "fabricar ARN a partir de proteínas", "replicar proteínas", "cortar intrones"], ok: 0, porque: "Es una excepción: ARN → ADN." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la transcripción es FALSA?", op: ["La ARN polimerasa necesita un cebador para empezar", "Usa una sola hebra como molde", "Sintetiza en sentido 5'→3'", "Incorpora uracilo en lugar de timina"], ok: 0, porque: "La ARN polimerasa empieza sin cebador." },
        { q: "¿Cuál de estas afirmaciones sobre la maduración del ARNm es FALSA?", op: ["Los intrones no se transcriben", "Ocurre en el núcleo", "La cola poli-A se añade en 3'", "La caperuza se añade en 5'"], ok: 0, porque: "Los intrones sí se transcriben; luego se eliminan." },
        { q: "¿Cuál de estas afirmaciones sobre el código genético es FALSA?", op: ["Un codón puede codificar varios aminoácidos", "Hay tres codones de parada", "AUG codifica metionina", "Es casi universal"], ok: 0, porque: "Es no ambiguo: cada codón, un solo aminoácido." },
        { q: "¿Cuál de estas afirmaciones sobre la traducción es FALSA?", op: ["Un ARNt reconoce el codón de parada", "El ribosoma lee el ARNm en sentido 5'→3'", "El anticodón es complementario del codón", "El enlace peptídico se forma en el ribosoma"], ok: 0, porque: "Los codones de parada los reconocen factores de liberación." },
        { q: "¿Cuál de estas afirmaciones sobre el operón lac es FALSA?", op: ["La glucosa inactiva al represor", "La alolactosa inactiva al represor", "CAP-AMPc activa la transcripción cuando falta glucosa", "lacZ codifica la β-galactosidasa"], ok: 0, porque: "La glucosa actúa sobre CAP, no sobre el represor." },
        { q: "¿Cuál de estas afirmaciones sobre procariotas y eucariotas es FALSA?", op: ["Los procariotas hacen splicing en un núcleo", "El ARNm procariota puede traducirse mientras se transcribe", "Los ribosomas procariotas son 70S", "Los eucariotas tienen caperuza y poli-A"], ok: 0, porque: "Los procariotas no tienen núcleo ni (en general) intrones." },
        { q: "¿Cuál de estas afirmaciones sobre el dogma central es FALSA?", op: ["Nunca puede pasar información de ARN a ADN", "Crick lo formuló en 1958", "La transcripción va de ADN a ARN", "La traducción va de ARNm a proteína"], ok: 0, porque: "La transcriptasa inversa lo hace (VIH)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: expresión génica",
      cartas: [
        { a: "Dogma central", b: "ADN → ARN → proteína. La información no vuelve de proteína a ácido nucleico." },
        { a: "Transcripción", b: "ARN polimerasa copia una hebra molde en ARN, 5'→3', sin cebador, con U en lugar de T." },
        { a: "Hebra molde y hebra codificante", b: "La molde se lee; la codificante tiene la secuencia del ARNm (con T)." },
        { a: "Promotor", b: "Secuencia de ADN donde se une la ARN polimerasa e inicia la transcripción." },
        { a: "Maduración del ARNm", b: "Caperuza (5'), cola poli-A (3') y splicing (quita intrones). Solo eucariotas." },
        { a: "Splicing alternativo", b: "Un mismo pre-ARNm se empalma de formas distintas y da varias proteínas." },
        { a: "Código genético", b: "Tripletes; 64 codones para 20 aminoácidos; degenerado, no ambiguo, sin solapamiento, casi universal." },
        { a: "Codón de inicio y de parada", b: "AUG (Met) inicia. UAA, UAG y UGA paran." },
        { a: "ARNt", b: "Hoja de trébol: lleva un aminoácido y un anticodón complementario al codón." },
        { a: "Ribosoma", b: "70S en procariotas (30S+50S), 80S en eucariotas (40S+60S). Sitios A, P y E." },
        { a: "Elongación", b: "Entra el ARNt (A), enlace peptídico, translocación y salida del ARNt (E)." },
        { a: "Terminación", b: "Codón de parada: factor de liberación suelta la proteína." },
        { a: "Operón lac", b: "Inducible: sin lactosa el represor bloquea; con lactosa (alolactosa) se enciende; CAP-AMPc activa sin glucosa." },
        { a: "Operón trp", b: "Reprimible: el triptófano activa el represor y apaga el operón." },
        { a: "Transcriptasa inversa", b: "Fabrica ADN a partir de ARN. Retrovirus como el VIH (Temin y Baltimore, 1970)." }
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
  O("b1", 1, "¿Qué orden sigue el flujo de la información genética según el dogma central?", ["ADN → ARN → proteína", "Proteína → ARN → ADN", "ARN → ADN → proteína", "ADN → proteína → ARN"], 0, ["La transcripción pasa del ADN al ARN.", "La traducción pasa del ARNm a la proteína."], "ADN → ARN → proteína");
  O("b2", 1, "¿Qué enzima sintetiza el ARN mensajero a partir de una hebra de ADN?", ["ARN polimerasa", "ADN polimerasa", "Ligasa", "Helicasa"], 0, ["La ARN polimerasa construye ARN con la hebra molde."], "ARN polimerasa");
  O("b3", 1, "¿Dónde se produce la traducción?", ["En los ribosomas", "En el núcleo, sobre el ADN", "En el nucleolo", "En la membrana nuclear"], 0, ["Los ribosomas leen el ARNm y fabrican la proteína."], "En los ribosomas");
  O("b4", 1, "¿Cuántos nucleótidos forman un codón?", ["3", "2", "4", "6"], 0, ["El código genético se lee de 3 en 3 bases."], "3 nucleótidos");
  O("b5", 1, "¿Cuál es el codón de inicio de la traducción?", ["AUG", "UAA", "UUU", "UGA"], 0, ["AUG marca el comienzo y codifica metionina."], "AUG");
  V("b6", 1, "El ARN contiene timina en lugar de uracilo.", false, ["En el ARN, la timina se sustituye por uracilo", "El ARN contiene desoxirribosa", "El ARN no tiene bases nitrogenadas", "El ARN tiene doble hélice"], 0, ["El ARN lleva A, U, G y C; la timina es del ADN."]);
  V("b7", 1, "El código genético es degenerado: un aminoácido puede estar codificado por varios codones.", true, ["Hay 64 codones y solo 20 aminoácidos", "Cada codón codifica varios aminoácidos", "Los codones de parada codifican aminoácidos", "Solo existe un codón por aminoácido"], 0, ["Por ejemplo, UUU y UUC codifican fenilalanina."]);
  T("b8", 1, "La hebra codificante de un gen es 5'-ATGGCA-3'. Escribe el ARNm (de 5' a 3').", "ARNm 5'→3' =", ["AUGGCA", "5'-AUGGCA-3'"], ["El ARNm copia la hebra codificante.", "Solo cambia T por U: AUGGCA."], "5'-AUGGCA-3'");
  T("b9", 1, "La hebra molde de un gen, escrita de 3' a 5', es 3'-TACAAACCG-5'. Escribe el ARNm (de 5' a 3').", "ARNm 5'→3' =", ["AUGUUUGGC", "5'-AUGUUUGGC-3'"], ["Se escribe la complementaria base a base: T→A, A→U, C→G, G→C.", "Como la molde está de 3' a 5', el ARNm sale de 5' a 3'."], "5'-AUGUUUGGC-3'");
  O("b10", 1, "¿Qué es el anticodón?", ["Un triplete del ARNt complementario de un codón", "Un triplete del ADN que no se transcribe", "El codón de parada", "El promotor del gen"], 0, ["El ARNt lleva el aminoácido y un anticodón que se empareja con el codón."], "Triplete del ARNt complementario del codón");
  O("b11", 1, "¿Qué se elimina durante el splicing?", ["Los intrones", "Los exones", "La caperuza", "El codón de inicio"], 0, ["Los exones se unen y los intrones se eliminan."], "Los intrones");
  O("b12", 1, "La cola de poli-A del ARNm eucariota se añade en el extremo…", ["3'", "5'", "interior", "los dos extremos"], 0, ["La caperuza va en 5' y la cola poli-A en 3'."], "3'");
  M("b13", 1, "Une cada elemento con su función en la expresión génica.",
    [C("ARN polimerasa", ["Transcripción", "Traducción", "Replicación"], 0), C("Ribosoma", ["Traducción", "Transcripción", "Splicing"], 0), C("ARNt", ["Transporta aminoácidos", "Elimina intrones", "Copia el ADN"], 0)],
    ["La ARN polimerasa transcribe.", "El ribosoma traduce.", "El ARNt lleva el aminoácido según el anticodón."], "ARN polimerasa → transcripción; ribosoma → traducción; ARNt → transporta aminoácidos");
  T("b14", 1, "Completa: el codón AUG codifica el aminoácido…", "Aminoácido", ["metionina", "Met", "metionina (Met)"], ["AUG es el codón de inicio y codifica metionina."], "Metionina");
  O("b15", 1, "En el operón lac, ¿qué molécula inactiva al represor?", ["La alolactosa (forma de la lactosa)", "La glucosa", "El triptófano", "El AMPc"], 0, ["El inductor se une al represor y lo suelta del operador."], "La alolactosa");
  X("b16", 1, "¿Cuántos codones distintos son posibles con 4 bases en tripletes?", "Codones =", 64, "", ["4 posibilidades en cada una de las 3 posiciones.", "4 · 4 · 4 = 64."], "64 codones");

  // ---- nivel 2
  X("c1", 2, "Una proteína tiene 100 aminoácidos. ¿Cuántos nucleótidos tiene la parte codificante del ARNm sin contar el codón de parada?", "Nucleótidos =", 300, "nt", ["Cada aminoácido necesita un codón de 3 nt.", "100 · 3 = 300 nt."], "300 nt");
  X("c2", 2, "Con la misma proteína de 100 aminoácidos, ¿cuántos nucleótidos tiene la región del ARNm desde el AUG hasta la parada incluida?", "Nucleótidos =", 303, "nt", ["100 codones con aminoácido y 1 codón de parada.", "101 · 3 = 303 nt."], "303 nt");
  O("c3", 2, "Traduce el ARNm 5'-AUGUUUGGCAAAUGA-3' con la tabla del código genético.", ["Met-Phe-Gly-Lys", "Met-Phe-Gly-Asn", "Phe-Gly-Lys", "Met-Leu-Gly-Lys"], 0, ["Tripletes: AUG UUU GGC AAA UGA.", "Met – Phe – Gly – Lys – parada (UGA)."], "Met-Phe-Gly-Lys");
  O("c4", 2, "La hebra molde de un gen, escrita de 3' a 5', es 3'-TACTTTCCGATT-5'. ¿Qué péptido se forma?", ["Met-Lys-Gly", "Tyr-Phe-Pro-Ile", "Ile-Gly-Lys-Met", "Met-Lys-Gly-Ile"], 0, ["ARNm: complementaria base a base: AUG AAA GGC UAA.", "AUG = Met, AAA = Lys, GGC = Gly, UAA = parada.", "Error típico: leer la molde como si fuera el ARNm (Tyr-Phe-Pro-Ile)."], "Met-Lys-Gly");
  T("c5", 2, "Escribe el anticodón (de 3' a 5') del ARNt que reconoce el codón 5'-GGC-3'.", "Anticodón 3'→5' =", ["CCG", "3'-CCG-5'"], ["Complementario y antiparalelo: G→C, G→C, C→G.", "3'-CCG-5'."], "3'-CCG-5'");
  V("c6", 2, "Si el codón GAA cambia a GAG, la proteína cambia de aminoácido.", false, ["Ambos codifican ácido glutámico: la mutación es silenciosa", "GAG es un codón de parada", "GAG codifica glicina", "Las mutaciones nunca afectan a la proteína"], 0, ["GAA = Glu y GAG = Glu.", "El código es degenerado: cambiar la tercera base suele ser silencioso."]);
  X("c7", 2, "Un gen eucariota tiene exones de 150, 210 y 90 nt, e intrones de 500 y 700 nt. ¿Cuánto mide el ARNm maduro, sin caperuza ni cola poli-A?", "Longitud (nt) =", 450, "nt", ["Solo quedan los exones.", "150 + 210 + 90 = 450 nt."], "450 nt");
  X("c8", 2, "En el mismo gen, ¿cuánto mide el pre-ARNm recién transcrito?", "Longitud (nt) =", 1650, "nt", ["Exones + intrones.", "450 + 500 + 700 = 1650 nt."], "1650 nt");
  X("c9", 2, "Si esos 450 nt del ARNm maduro van del AUG al codón de parada (sin zonas sin traducir), ¿cuántos aminoácidos tiene la proteína?", "Aminoácidos =", 149, "", ["450 / 3 = 150 codones.", "Uno es el de parada: 150 − 1 = 149 aminoácidos."], "149 aminoácidos");
  M("c10", 2, "Une cada proceso de la maduración con su función.",
    [C("Caperuza (5')", ["Protege el extremo y lo reconoce el ribosoma", "Elimina intrones", "Estabiliza el extremo 3'"], 0), C("Cola poli-A (3')", ["Estabiliza el ARNm y facilita su salida", "Elimina intrones", "Es la señal de parada"], 0), C("Splicing", ["Elimina intrones y une exones", "Añade adeninas", "Protege el extremo 5'"], 0)],
    ["La caperuza protege 5' y señala el inicio.", "La cola poli-A estabiliza 3'.", "El splicing deja solo los exones."], "Caperuza → protege 5'; poli-A → estabiliza 3'; splicing → quita intrones");
  O("c11", 2, "¿Qué afirmación es correcta para los procariotas?", ["La traducción puede empezar antes de que termine la transcripción", "El ARNm sufre splicing en el núcleo", "Tienen ribosomas 80S", "Su primer aminoácido es metionina"], 0, ["No tienen núcleo: transcripción y traducción están acopladas.", "Su primer aminoácido es formilmetionina y sus ribosomas, 70S."], "Transcripción y traducción acopladas");
  V("c12", 2, "Con glucosa y sin lactosa, el operón lac está activo.", false, ["Sin lactosa, el represor está unido al operador", "La glucosa activa el operón", "El represor solo se une con lactosa", "No hay operador en el operón lac"], 0, ["Sin lactosa el represor bloquea la transcripción.", "Además, con glucosa CAP-AMPc no actúa."]);
  O("c13", 2, "Una bacteria lacI⁻ (sin represor funcional) crece en un medio sin lactosa. ¿Qué ocurre con la β-galactosidasa?", ["Se fabrica aunque no haya lactosa", "No se fabrica nunca", "Solo se fabrica con lactosa", "Se fabrica solo con glucosa"], 0, ["Sin represor, el operador siempre está libre.", "Expresión constitutiva."], "Se fabrica siempre");
  M("c14", 2, "Une cada sitio del ribosoma con su función.",
    [C("Sitio A", ["Entra el ARNt con el aminoácido siguiente", "Mantiene la cadena en crecimiento", "Sale el ARNt vacío"], 0), C("Sitio P", ["Mantiene el ARNt con la cadena peptídica", "Entra el ARNt con el aminoácido siguiente", "Sale el ARNt vacío"], 0), C("Sitio E", ["Sale el ARNt ya sin aminoácido", "Entra el ARNt con el aminoácido siguiente", "Mantiene la cadena en crecimiento"], 0)],
    ["A = aminoacil: entra el ARNt cargado.", "P = peptidil: lleva la cadena.", "E = exit: sale el ARNt vacío."], "A: entrada; P: cadena; E: salida");
  O("c15", 2, "¿Qué ocurre durante la translocación?", ["El ribosoma avanza un codón sobre el ARNm", "Se forma el enlace peptídico", "Se une la subunidad grande", "Se libera la proteína"], 0, ["Tras formarse el enlace, el ribosoma se desplaza 3 nt.", "El ARNt vacío sale por el sitio E."], "El ribosoma avanza un codón");
  X("c16", 2, "Una ARN polimerasa bacteriana añade unos 40 nt por segundo. ¿Cuánto tarda en transcribir un ARNm de 1200 nt?", "Tiempo (s) =", 30, "s", ["t = 1200 nt / 40 nt/s.", "t = 30 s."], "30 s");

  // ---- nivel 3
  X("d1", 3, "Una proteína de 250 aminoácidos viene de un ARNm maduro con 80 nt antes del AUG y 220 nt después del codón de parada. ¿Cuántos nucleótidos tiene el ARNm maduro (sin caperuza ni cola poli-A)?", "Longitud (nt) =", 1053, "nt", ["Región codificante con la parada: (250 + 1) · 3 = 753 nt.", "Suma las zonas sin traducir: 80 + 753 + 220 = 1053 nt."], "1053 nt");
  X("d2", 3, "El gen anterior tiene 1900 nt de intrones en total. ¿Cuánto mide su pre-ARNm?", "Longitud (nt) =", 2953, "nt", ["Pre-ARNm = ARNm maduro + intrones.", "1053 + 1900 = 2953 nt."], "2953 nt");
  O("d3", 3, "Traduce el ARNm 5'-GCAUGGAACCCUAGUGA-3'.", ["Met-Glu-Pro", "Ala-Trp-Asn-Pro-Ser", "Met-Glu-Pro-Ser", "Glu-Pro"], 0, ["Busca el primer AUG: empieza en la posición 3 (los 2 nt anteriores no se traducen).", "AUG GAA CCC UAG: Met – Glu – Pro – parada.", "Error típico: leer desde el primer nucleótido (Ala-Trp-Asn-Pro-Ser)."], "Met-Glu-Pro");
  M("d4", 3, "El ARNm 5'-AUGGAACAAUUUUAA-3' sufre un cambio: la base 7 (C) pasa a U. ¿Qué péptido se forma y qué tipo de mutación es?",
    [C("Péptido", ["Met-Glu", "Met-Glu-Gln-Phe", "Met-Glu-Leu-Phe", "Met-Glu-Gln"], 0), C("Tipo de mutación", ["Sin sentido", "Silenciosa", "De cambio de sentido", "De cambio de fase"], 0)],
    ["Original: AUG GAA CAA UUU UAA = Met – Glu – Gln – Phe.", "Con el cambio: CAA → UAA, que es un codón de parada.", "Péptido: Met – Glu. La mutación es sin sentido (acorta la proteína)."], "Met-Glu; sin sentido");
  X("d5", 3, "Un péptido tiene 120 aminoácidos. ¿Cuántos enlaces peptídicos hay en la cadena?", "Enlaces =", 119, "", ["Cada enlace une dos aminoácidos consecutivos.", "120 − 1 = 119 enlaces."], "119 enlaces");
  X("d6", 3, "La hebra molde de un gen tiene 28 % de A, 22 % de C, 30 % de G y 20 % de T. ¿Qué porcentaje de uracilo tendrá el ARNm?", "% de U =", 28, "%", ["U del ARNm = complementaria de la A de la molde.", "La molde tiene un 28 % de A: el ARNm, un 28 % de U."], "28 %");
  O("d7", 3, "Una cepa de E. coli fabrica β-galactosidasa sin lactosa. Si se le añade un plásmido con una copia normal del operón (lacI⁺ lacO⁺ lacZ⁺), pasa a regularse normalmente. ¿Cuál era la mutación?", ["lacI⁻ (sin represor funcional)", "lacOᶜ (operador alterado)", "lacZ⁻ (enzima defectuosa)", "lacIˢ (superrepresor)"], 0, ["El represor es una proteína difusible (trans): el de la copia normal sirve para los dos operones.", "Con lacOᶜ el operón mutado seguiría encendido (cis).", "lacZ⁻ no fabrica enzima activa; lacIˢ apaga siempre el operón."], "lacI⁻");
  V("d8", 3, "En una bacteria con dos copias del operón lac, una lacI⁺ y otra lacI⁻, con operadores normales, el operón se regula con normalidad.", true, ["El represor de la copia lacI⁺ es difusible y actúa sobre los dos operadores", "El represor solo actúa sobre su propia copia (cis)", "Los dos operadores quedan siempre libres", "La copia mutante anula a la normal"], 0, ["lacI codifica una proteína que difunde (acción en trans)."]);
  R("d9", "Compara la replicación y la transcripción del ADN. (Pregunta tipo PAU)", [
    { t: "Replicación: copia todo el genoma, las dos hebras, ADN polimerasa, cebador", p: 0.5 },
    { t: "Transcripción: copia un gen, una hebra molde, ARN polimerasa, sin cebador", p: 0.5 },
    { t: "Producto: ADN (dos moléculas) frente a ARN (con U)", p: 0.4 },
    { t: "Mismo sentido de síntesis (5'→3') y complementariedad", p: 0.3 },
    { t: "Dónde y cuándo (una vez por ciclo frente a muchas veces)", p: 0.3 }], ["Qué se copia.", "Enzimas.", "Producto."], "Replicación: genoma, ADN pol; transcripción: gen, ARN pol");
  R("d10", "Explica cómo madura el ARNm en eucariotas y qué ventaja aporta el splicing alternativo. (Pregunta tipo PAU)", [
    { t: "Ocurre en el núcleo, antes de salir al citoplasma", p: 0.3 },
    { t: "Caperuza en 5': protege y señala el inicio", p: 0.4 },
    { t: "Cola poli-A en 3': estabiliza y facilita la salida", p: 0.4 },
    { t: "Splicing: se eliminan intrones y se unen exones", p: 0.5 },
    { t: "Splicing alternativo: un gen da varias proteínas", p: 0.4 }], ["Dónde.", "Los tres procesos.", "Splicing alternativo."], "Caperuza, poli-A y splicing");
  R("d11", "Enumera las características del código genético y explica una consecuencia de que sea degenerado. (Pregunta tipo PAU)", [
    { t: "Tripletes (codones) y 64 codones para 20 aminoácidos", p: 0.4 },
    { t: "Degenerado, no ambiguo y sin solapamiento", p: 0.5 },
    { t: "Universal (con pequeñas excepciones)", p: 0.3 },
    { t: "AUG de inicio y tres codones de parada", p: 0.4 },
    { t: "Consecuencia: mutaciones silenciosas", p: 0.4 }], ["Tripletes.", "Degenerado.", "Universal.", "Inicio y parada."], "Triplete, degenerado, no ambiguo, universal");
  R("d12", "Explica la regulación del operón lac según haya o no lactosa y glucosa. (Pregunta tipo PAU)", [
    { t: "Estructura: promotor, operador, genes lacZ, lacY y lacA, y gen regulador lacI", p: 0.4 },
    { t: "Sin lactosa: el represor se une al operador y bloquea", p: 0.5 },
    { t: "Con lactosa: la alolactosa inactiva al represor", p: 0.5 },
    { t: "Glucosa: baja el AMPc y CAP no activa", p: 0.4 },
    { t: "Sin glucosa y con lactosa: transcripción máxima", p: 0.2 }], ["Estructura.", "Sin lactosa.", "Con lactosa.", "Glucosa."], "Inducible por lactosa; CAP-AMPc cuando falta glucosa");
  R("d13", "Explica por qué el VIH es una excepción al dogma central e indica cómo se usa esa enzima en el laboratorio. (Pregunta tipo PAU)", [
    { t: "El VIH es un retrovirus con genoma de ARN", p: 0.4 },
    { t: "La transcriptasa inversa fabrica ADN a partir de ARN", p: 0.5 },
    { t: "Ese ADN se integra en el genoma de la célula huésped", p: 0.4 },
    { t: "Es una excepción por ir de ARN a ADN, no de proteína a ácido nucleico", p: 0.3 },
    { t: "Uso en el laboratorio: obtener ADN complementario (ADNc) a partir de ARNm", p: 0.4 }], ["Retrovirus.", "Enzima.", "Integración.", "Uso."], "Transcriptasa inversa: ARN → ADN");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "De ADN a proteína",
      pasos: ["ADN (hebra molde) en el núcleo.", "Transcripción: ARN polimerasa → pre-ARNm.", "Maduración: caperuza, poli-A y splicing.", "El ARNm sale al citoplasma.", "Traducción en el ribosoma, con ARNt.", "La cadena se pliega: proteína."],
      nota: "Procariotas: sin maduración; transcripción y traducción a la vez." },
    { titulo: "Codones que debes conocer", ancha: true,
      tabla: { cab: ["Codón", "Significado"], filas: [
        ["AUG", "inicio y metionina"],
        ["UAA, UAG, UGA", "parada"],
        ["UUU, UUC", "fenilalanina"],
        ["GGC", "glicina"],
        ["AAA", "lisina"]
      ] } },
    { titulo: "Operón lac según glucosa y lactosa", ancha: true,
      tabla: { cab: ["Glucosa", "Lactosa", "Transcripción"], filas: [
        ["con", "sin", "ninguna"],
        ["con", "con", "baja"],
        ["sin", "sin", "ninguna"],
        ["sin", "con", "alta"]
      ] } },
    { titulo: "Procariotas y eucariotas", ancha: true,
      tabla: { cab: ["", "Procariotas", "Eucariotas"], filas: [
        ["ribosoma", "70S", "80S"],
        ["ARNm", "policistrónico, sin splicing", "caperuza, poli-A, splicing"],
        ["traducción", "mientras se transcribe", "después, en el citoplasma"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Un ARNt reconoce el codón de parada", bien: "Lo reconoce un factor de liberación", por: "No existe ARNt para UAA, UAG ni UGA." },
        { mal: "Los intrones no se transcriben", bien: "Se transcriben y luego se eliminan", por: "Están en el pre-ARNm." },
        { mal: "Degenerado = un codón da varios aminoácidos", bien: "Varios codones dan un aminoácido", por: "El código no es ambiguo." },
        { mal: "La glucosa inactiva al represor del lac", bien: "La alolactosa inactiva al represor", por: "La glucosa actúa sobre CAP." }
      ] }
  ];

  B.registrar("bio2", "t12", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio12a.secciones,
    nuevas: B.parte.bio12a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
