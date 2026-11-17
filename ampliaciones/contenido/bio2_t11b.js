/* ============================================================
   Biología II · ampliaciones · Tema 11 (parte B): Base molecular de la herencia
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t11.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>ADN es el material genético</b>: Griffith (1928) halló un principio transformante, Avery (1944) mostró que era ADN y Hershey y Chase (1952) vieron que en un virus <b>entra el ADN (³²P), no la proteína (³⁵S)</b>.",
    "La replicación es <b>semiconservativa</b> (Meselson y Stahl, 1958): cada molécula hija tiene una hebra vieja y una nueva. Con ¹⁵N y ¹⁴N: generación 1, banda intermedia; generación 2, intermedia y ligera.",
    "En la horquilla, la <b>helicasa</b> abre, la <b>primasa</b> hace el cebador de ARN y la <b>ADN polimerasa</b> alarga <b>solo de 5′ a 3′</b>: hebra <b>adelantada</b> continua y <b>retrasada</b> en <b>fragmentos de Okazaki</b>, unidos por la <b>ligasa</b>.",
    "Procariotas: un origen, horquilla rápida y fragmentos largos. Eucariotas: muchos orígenes, fase S, fragmentos cortos y <b>telómeros</b>.",
    "La polimerasa corrige errores (exonucleasa 3′→5′) y hay sistemas de <b>reparación</b>; los telómeros y la <b>telomerasa</b> resuelven el problema del extremo (activa en células madre y en cáncer)."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Base molecular de la herencia",
    autores: [
      { n: "Qué estudia", f: "cómo se demostró que el ADN es el material genético y cómo se copia", l: "ADN · replicación · reparación" },
      { n: "Hershey y Chase", f: "1952", l: "entra el ADN (³²P), no la proteína (³⁵S)" },
      { n: "Meselson y Stahl", f: "1958", l: "la replicación es semiconservativa" }
    ],
    obras: ["Griffith", "Meselson y Stahl", "Horquilla", "Okazaki", "Telomerasa"],
    bloques: [
      { t: "El ADN es el material genético", frases: ["Griffith 1928: principio transformante (cepas R y S).", "Avery 1944: es <b>ADN</b> (la ADNasa lo destruye).", "Hershey y Chase 1952: ³²P (ADN) dentro, ³⁵S (proteína) fuera."],
        tabla: { cab: ["Isótopo", "Marca"], filas: [["³²P", "ADN (fosfatos)"], ["³⁵S", "proteínas (S)"]] } },
      { t: "Tres modelos y Meselson-Stahl", frases: ["Medio con ¹⁵N (pesado) y luego ¹⁴N; CsCl.", "Gen. 1: <b>una banda intermedia</b> (descarta conservativo).", "Gen. 2: intermedia + ligera (descarta dispersivo)."],
        tabla: { cab: ["Generación", "Semiconservativo"], filas: [["1", "100 % intermedia"], ["2", "50 % + 50 % ligera"], ["3", "25 % + 75 % ligera"]] } },
      { t: "La horquilla de replicación", frases: ["Helicasa abre; SSB y topoisomerasa ayudan.", "Primasa: cebador de ARN. Polimerasa: <b>5′ → 3′</b>.", "Ligasa une los fragmentos."],
        tabla: { cab: ["Hebra", "Síntesis"], filas: [["adelantada", "continua"], ["retrasada", "fragmentos de Okazaki"]] } },
      { t: "Quién hace qué", frases: ["Polimerasa III copia y corrige; polimerasa I quita el cebador.", "Un cebador en la adelantada y uno por fragmento en la retrasada.", "Sin 3′-OH previo la polimerasa no empieza."] },
      { t: "Procariotas y eucariotas", frases: ["Procariota: ADN circular, 1 origen, ≈ 1000 nt/s.", "Eucariota: muchos orígenes, fase S, ≈ 50 nt/s.", "Okazaki: 1000-2000 nt frente a 100-200 nt."],
        tabla: { cab: ["Dato", "Procariota / Eucariota"], filas: [["orígenes", "1 / muchos"], ["extremos", "no / telómeros"]] } },
      { t: "Errores, reparación y telómeros", frases: ["Corrección de pruebas, reparación de apareamientos y BER/NER.", "Problema del extremo: se pierden ≈ 50-100 nt por división.", "Telomerasa (ARN + proteína): activa en células madre y cáncer."] }
    ],
    resumen: [
      "El <b>ADN</b> lleva la información; se copia de forma <b>semiconservativa</b>.",
      "La <b>polimerasa</b> solo va de 5′ a 3′: por eso hay <b>hebra adelantada</b> y <b>retrasada</b>.",
      "Los <b>telómeros</b> y la <b>telomerasa</b> resuelven el problema del extremo."
    ],
    conecta: [
      { con: "Biología T5:", rel: "la estructura del ADN (complementariedad, antiparalelismo)." },
      { con: "Biología T7:", rel: "el ciclo celular: la replicación ocurre en la fase S." },
      { con: "Biología T12 y T13:", rel: "la expresión del gen y las mutaciones (errores no reparados)." },
      { con: "Química II T4 y T7:", rel: "enlaces de hidrógeno, enlace fosfodiéster y energía (ATP)." }
    ],
    claves: [
      ["Principio transformante", "sustancia que pasa de bacterias S muertas a R vivas y las hace virulentas (ADN)"],
      ["Replicación semiconservativa", "cada molécula hija tiene una hebra original y una nueva"],
      ["Helicasa", "enzima que separa las hebras rompiendo puentes de hidrógeno"],
      ["Primasa y cebador", "primasa hace un cebador de ARN con 3′-OH para que empiece la polimerasa"],
      ["ADN polimerasa", "añade nucleótidos solo en sentido 5′ → 3′ y corrige errores"],
      ["Hebra adelantada", "se sintetiza de forma continua, siguiendo a la horquilla"],
      ["Fragmentos de Okazaki", "trozos de la hebra retrasada, cada uno con su cebador"],
      ["ADN ligasa", "une los fragmentos sellando el enlace fosfodiéster"],
      ["Origen de replicación", "punto donde empieza la replicación; bidireccional"],
      ["Telómero y telomerasa", "extremo repetido del cromosoma y enzima que lo alarga"]
    ],
    cita: { txt: "Una molécula de ADN, copiada tres veces, da 8 moléculas, pero solo 2 conservan una hebra de la original.", autor: "Dato para recordar", obra: "2ⁿ moléculas; 2 híbridas; hebras originales = 2 siempre" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    relacion: {
      titulo: "Procariotas, eucariotas o las dos",
      consigna: "Clasifica cada característica de la replicación.",
      categorias: ["Procariotas", "Eucariotas", "Las dos"],
      items: [
        { t: "Un único origen de replicación", c: 0 }, { t: "ADN circular", c: 0 }, { t: "Fragmentos de Okazaki de 1000-2000 nt", c: 0 }, { t: "ADN polimerasa III", c: 0 },
        { t: "Muchos orígenes de replicación", c: 1 }, { t: "Fase S del ciclo celular", c: 1 }, { t: "Telómeros y telomerasa", c: 1 }, { t: "Fragmentos de Okazaki de 100-200 nt", c: 1 },
        { t: "Replicación semiconservativa", c: 2 }, { t: "Síntesis solo en sentido 5′ → 3′", c: 2 }, { t: "Cebador de ARN", c: 2 }, { t: "Hebra adelantada y retrasada", c: 2 }
      ]
    },
    hebras: {
      titulo: "Hebra adelantada, retrasada o las dos",
      consigna: "Clasifica cada característica.",
      categorias: ["Hebra adelantada", "Hebra retrasada", "Las dos"],
      items: [
        { t: "Síntesis continua", c: 0 }, { t: "Un solo cebador en el origen", c: 0 }, { t: "Va en el mismo sentido que avanza la horquilla", c: 0 },
        { t: "Fragmentos de Okazaki", c: 1 }, { t: "Un cebador por fragmento", c: 1 }, { t: "Va en sentido contrario al avance de la horquilla", c: 1 },
        { t: "La polimerasa va de 5′ a 3′", c: 2 }, { t: "Es antiparalela a su molde", c: 2 }, { t: "Es complementaria al molde", c: 2 }
      ]
    },
    experimentos: {
      titulo: "Experimentos y científicos",
      consigna: "Une cada experimento con su resultado.",
      pares: [
        ["Griffith (1928)", "Bacterias R vivas + S muertas: el ratón muere (transformación)"],
        ["Avery, MacLeod y McCarty (1944)", "Solo la ADNasa impide la transformación"],
        ["Hershey y Chase (1952)", "El ³²P entra en la bacteria; el ³⁵S queda fuera"],
        ["Meselson y Stahl (1958)", "Gen. 1: banda intermedia; gen. 2: intermedia y ligera"],
        ["Chargaff (1950)", "En el ADN A = T y G = C"],
        ["Okazaki (1968)", "La hebra retrasada se sintetiza en fragmentos"]
      ]
    },
    enzimas: {
      titulo: "Enzimas de la replicación",
      consigna: "Une cada enzima o proteína con su función.",
      pares: [
        ["Helicasa", "Separa las dos hebras rompiendo puentes de hidrógeno"],
        ["Topoisomerasa", "Quita la tensión por delante de la horquilla"],
        ["SSB", "Mantiene separadas las hebras abiertas"],
        ["Primasa", "Fabrica el cebador de ARN"],
        ["ADN polimerasa III", "Alarga la cadena nueva en sentido 5′ → 3′"],
        ["ADN ligasa", "Une los fragmentos sellando el enlace fosfodiéster"]
      ]
    },
    ordenmes: {
      titulo: "El experimento de Meselson y Stahl",
      consigna: "Ordena el procedimiento.",
      items: [
        { t: "Cultivar <i>E. coli</i> muchas generaciones en medio con ¹⁵N" },
        { t: "Pasar las bacterias a un medio con ¹⁴N" },
        { t: "Extraer el ADN tras cada generación (cada ≈ 20 min)" },
        { t: "Ultracentrifugar el ADN en un gradiente de CsCl" },
        { t: "Comparar la posición y el grosor de las bandas con las predicciones" }
      ]
    },
    ordenhor: {
      titulo: "La horquilla de replicación",
      consigna: "Ordena los pasos.",
      items: [
        { t: "La helicasa abre la doble hélice en el origen" },
        { t: "Las proteínas SSB y la topoisomerasa estabilizan y relajan el ADN" },
        { t: "La primasa fabrica un cebador de ARN" },
        { t: "La ADN polimerasa alarga el cebador en sentido 5′ → 3′" },
        { t: "En la hebra retrasada se forman fragmentos de Okazaki, cada uno con su cebador" },
        { t: "Se eliminan los cebadores y se rellena el hueco con ADN" },
        { t: "La ligasa une los fragmentos" }
      ]
    },
    ordenhc: {
      titulo: "El experimento de Hershey y Chase",
      consigna: "Ordena los pasos.",
      items: [
        { t: "Marcar el ADN de un lote de fagos con ³²P y las proteínas de otro con ³⁵S" },
        { t: "Dejar que los fagos infecten bacterias" },
        { t: "Agitar en batidora para soltar las cáscaras de los virus" },
        { t: "Centrifugar: sobrenadante (cáscaras) y sedimento (bacterias)" },
        { t: "Medir la radiactividad de cada fracción" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 11",
      preguntas: [
        { q: "El experimento de Hershey y Chase demostró que…", op: ["el ADN entra en la bacteria y dirige la producción de virus", "las proteínas son el material genético", "la replicación es semiconservativa", "el ARN es el material genético"], ok: 0, porque: "El ³²P (ADN) entró en la bacteria; el ³⁵S (proteínas) se quedó fuera." },
        { q: "En el experimento de Meselson y Stahl, tras una generación en ¹⁴N se observó…", op: ["una sola banda de densidad intermedia", "una banda pesada y otra ligera", "una sola banda pesada", "dos bandas intermedias"], ok: 0, porque: "Todas las moléculas son híbridas: descarta el modelo conservativo." },
        { q: "La enzima que abre la doble hélice es…", op: ["la helicasa", "la ligasa", "la primasa", "la ADN polimerasa"], ok: 0, porque: "Rompe los puentes de hidrógeno entre bases." },
        { q: "La ADN polimerasa sintetiza…", op: ["solo en sentido 5′ → 3′", "solo en sentido 3′ → 5′", "en los dos sentidos", "sin necesidad de molde"], ok: 0, porque: "Añade nucleótidos al extremo 3′-OH." },
        { q: "Los fragmentos de Okazaki se forman en…", op: ["la hebra retrasada", "la hebra adelantada", "las dos por igual", "el ARN"], ok: 0, porque: "Porque su síntesis 5′ → 3′ es contraria al avance de la horquilla." },
        { q: "El cebador de ARN lo fabrica…", op: ["la primasa", "la ligasa", "la helicasa", "la topoisomerasa"], ok: 0, porque: "Aporta un extremo 3′-OH para que empiece la polimerasa." },
        { q: "Tras 3 replicaciones semiconservativas de una molécula, ¿cuántas moléculas conservan una hebra original?", op: ["2", "1", "4", "8"], ok: 0, porque: "Las dos hebras originales acaban en dos moléculas distintas." },
        { q: "La telomerasa…", op: ["alarga los telómeros con un molde de ARN", "une los fragmentos de Okazaki", "quita los cebadores", "abre la doble hélice"], ok: 0, porque: "Es una enzima con ARN y proteína; activa en células madre y cáncer." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre Hershey y Chase es FALSA?", op: ["Marcaron el ADN con azufre-35", "Marcaron las proteínas con azufre-35", "Marcaron el ADN con fósforo-32", "Usaron bacteriófagos"], ok: 0, porque: "El ADN se marcó con ³²P; el ³⁵S marca las proteínas." },
        { q: "¿Cuál de estas afirmaciones sobre Meselson y Stahl es FALSA?", op: ["En la generación 1 hay una banda pesada y otra ligera", "Usaron isótopos del nitrógeno", "Usaron ultracentrifugación en CsCl", "En la generación 2 hay banda intermedia y ligera"], ok: 0, porque: "En la generación 1 solo hay una banda intermedia." },
        { q: "¿Cuál de estas afirmaciones sobre la replicación es FALSA?", op: ["La ADN polimerasa puede empezar una cadena sin cebador", "La ADN polimerasa va de 5′ a 3′", "La helicasa separa las hebras", "La primasa fabrica un cebador de ARN"], ok: 0, porque: "Necesita un cebador con extremo 3′-OH." },
        { q: "¿Cuál de estas afirmaciones sobre las hebras es FALSA?", op: ["En la hebra retrasada la polimerasa trabaja de 3′ a 5′", "La hebra adelantada es continua", "La retrasada se hace en fragmentos de Okazaki", "Las dos hebras nuevas se sintetizan de 5′ a 3′"], ok: 0, porque: "La polimerasa siempre va de 5′ a 3′." },
        { q: "¿Cuál de estas afirmaciones sobre procariotas y eucariotas es FALSA?", op: ["Los eucariotas tienen un solo origen de replicación", "Los procariotas tienen un solo origen", "Los eucariotas replican en la fase S", "Los eucariotas tienen telómeros"], ok: 0, porque: "Los eucariotas tienen muchos orígenes." },
        { q: "¿Cuál de estas afirmaciones sobre la corrección de errores es FALSA?", op: ["La ligasa corrige los errores de copia", "La polimerasa tiene actividad exonucleasa 3′ → 5′", "Hay un sistema de reparación de apareamientos erróneos", "El xeroderma pigmentoso es un fallo de la reparación por escisión de nucleótidos"], ok: 0, porque: "La corrección la hace la propia polimerasa; la ligasa solo sella cortes." },
        { q: "¿Cuál de estas afirmaciones sobre los telómeros es FALSA?", op: ["Contienen genes esenciales", "Se acortan en cada división de las células somáticas", "La telomerasa los alarga", "Están en los extremos de los cromosomas"], ok: 0, porque: "Son secuencias repetidas sin genes." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: base molecular de la herencia",
      cartas: [
        { a: "Experimento de Griffith", b: "Cepa R viva + cepa S muerta por calor mata al ratón: hay un principio transformante (1928)." },
        { a: "Avery, MacLeod y McCarty", b: "El principio transformante es ADN: la ADNasa lo destruye, la proteasa y la ARNasa no (1944)." },
        { a: "Hershey y Chase", b: "Fago T2 con ³²P (ADN) o ³⁵S (proteína): entra el ADN en la bacteria (1952)." },
        { a: "Modelos de replicación", b: "Conservativo, semiconservativo y dispersivo." },
        { a: "Meselson y Stahl", b: "¹⁵N → ¹⁴N y CsCl: gen. 1 banda intermedia; gen. 2 intermedia + ligera → semiconservativo (1958)." },
        { a: "Moléculas tras n replicaciones", b: "2ⁿ moléculas; 2 contienen una hebra original; 2/2ⁿ híbridas." },
        { a: "Helicasa", b: "Rompe los puentes de hidrógeno y abre la doble hélice (gasta ATP)." },
        { a: "Topoisomerasa y SSB", b: "Topoisomerasa: quita la tensión. SSB: mantienen las hebras abiertas." },
        { a: "Primasa", b: "Fabrica el cebador de ARN (≈ 10 nt) con extremo 3′-OH." },
        { a: "ADN polimerasa", b: "Añade nucleótidos solo en sentido 5′ → 3′; III copia y corrige, I quita el cebador." },
        { a: "Hebra adelantada", b: "Se sintetiza de forma continua, con un solo cebador." },
        { a: "Hebra retrasada", b: "Se sintetiza en fragmentos de Okazaki, cada uno con su cebador." },
        { a: "ADN ligasa", b: "Une los fragmentos sellando el enlace fosfodiéster." },
        { a: "Procariotas frente a eucariotas", b: "1 origen y ≈ 1000 nt/s frente a muchos orígenes, fase S y ≈ 50 nt/s." },
        { a: "Corrección y reparación", b: "Exonucleasa 3′ → 5′ de la polimerasa, MMR, BER y NER (xeroderma pigmentoso)." },
        { a: "Telómeros y telomerasa", b: "Extremos repetidos (TTAGGG); la telomerasa los alarga; activa en células madre y cáncer." }
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
  O("b1", 1, "En el experimento de Hershey y Chase, ¿qué isótopo radiactivo marcó el ADN del virus?", ["Fósforo-32", "Azufre-35", "Carbono-14", "Nitrógeno-15"], 0, ["Cada nucleótido lleva un fosfato, así que el ADN contiene fósforo.", "El azufre está en las proteínas (cisteína, metionina), no en el ADN."], "Fósforo-32 (³²P)");
  O("b2", 1, "¿Qué enzima separa las dos hebras de la doble hélice al comienzo de la replicación?", ["Helicasa", "Ligasa", "Primasa", "ADN polimerasa"], 0, ["La helicasa rompe los puentes de hidrógeno entre las bases."], "Helicasa");
  O("b3", 1, "La ADN polimerasa añade nucleótidos a la cadena nueva en sentido…", ["5′ → 3′", "3′ → 5′", "en los dos sentidos", "al azar"], 0, ["Añade el nucleótido al extremo 3′-OH de la cadena.", "Nunca puede ir de 3′ a 5′."], "5′ → 3′");
  V("b4", 1, "En la replicación semiconservativa, cada molécula hija tiene una hebra original y una hebra nueva.", true, ["Cada hebra original sirve de molde y se queda en una molécula hija", "Las dos hebras de cada molécula hija son nuevas", "Las moléculas hijas mezclan trozos viejos y nuevos", "Una hija es toda vieja y la otra toda nueva"], 0, ["Eso es lo que significa «semi»: la mitad de cada molécula hija es vieja."]);
  T("b5", 1, "Completa: la enzima que une los fragmentos de Okazaki se llama ADN…", "Enzima", ["ligasa", "adn ligasa"], ["Sella el enlace fosfodiéster entre fragmentos contiguos."], "ligasa");
  O("b6", 1, "En el experimento de Griffith, ¿qué ocurrió al inyectar a un ratón bacterias R vivas junto con bacterias S muertas por calor?", ["El ratón murió y se aislaron bacterias S vivas", "El ratón sobrevivió", "El ratón murió y solo había bacterias R", "El ratón sobrevivió pero se volvió inmune"], 0, ["Las R se transformaron en S con algo de los restos de las S.", "Es el «principio transformante»."], "El ratón murió (transformación)");
  X("b7", 1, "Una molécula de ADN se replica 4 veces de forma semiconservativa. ¿Cuántas moléculas hay al final?", "Moléculas =", 16, "", ["Cada replicación duplica el número.", "2⁴ = 16."], "16 moléculas");
  X("b8", 1, "En un ADN, el 30 % de las bases son adenina. ¿Qué porcentaje es guanina?", "% de G =", 20, "%", ["A = T = 30 %, así que A + T = 60 %.", "G + C = 40 % y G = C: G = 20 %."], "20 %");
  T("b9", 1, "Completa: la enzima que fabrica el cebador de ARN se llama…", "Enzima", ["primasa"], ["Es una ARN polimerasa especializada que da el extremo 3′-OH inicial."], "primasa");
  M("b10", 1, "Une cada científico con su descubrimiento.",
    [C("Griffith", ["Transformación de bacterias (principio transformante)", "La ADNasa impide la transformación", "Fagos con ³²P y ³⁵S", "Isótopos ¹⁵N y ¹⁴N"], 0),
     C("Avery y colaboradores", ["La ADNasa impide la transformación", "Transformación de bacterias (principio transformante)", "Fagos con ³²P y ³⁵S", "Isótopos ¹⁵N y ¹⁴N"], 0),
     C("Hershey y Chase", ["Fagos con ³²P y ³⁵S", "Transformación de bacterias (principio transformante)", "La ADNasa impide la transformación", "Isótopos ¹⁵N y ¹⁴N"], 0),
     C("Meselson y Stahl", ["Isótopos ¹⁵N y ¹⁴N", "Transformación de bacterias (principio transformante)", "La ADNasa impide la transformación", "Fagos con ³²P y ³⁵S"], 0)],
    ["Griffith: transformación. Avery: ADNasa. Hershey y Chase: fagos marcados. Meselson y Stahl: nitrógeno pesado y ligero."], "Griffith → transformación; Avery → ADNasa; Hershey-Chase → ³²P/³⁵S; Meselson-Stahl → ¹⁵N/¹⁴N");
  O("b11", 1, "¿Cómo se llama la hebra nueva que se sintetiza de forma continua?", ["Hebra adelantada (conductora)", "Hebra retrasada", "Fragmento de Okazaki", "Cebador"], 0, ["Sigue a la helicasa en el mismo sentido de avance de la horquilla."], "Hebra adelantada");
  V("b12", 1, "La ADN polimerasa puede comenzar una cadena nueva sin ningún cebador.", false, ["Necesita un cebador con extremo 3′-OH libre", "Puede, porque tiene actividad primasa", "Puede, si hay suficientes nucleótidos", "No puede, porque falta ATP"], 0, ["Por eso la primasa fabrica antes un cebador de ARN."]);
  O("b13", 1, "En una célula eucariota, ¿dónde y cuándo se replica el ADN?", ["En el núcleo, durante la fase S", "En el citoplasma, durante la mitosis", "En el núcleo, durante la profase", "En las mitocondrias, durante la fase G1"], 0, ["La fase S (síntesis) del ciclo celular es la de duplicación del ADN."], "En el núcleo, en la fase S");
  T("b14", 1, "La hebra molde es 3′-TACGGATC-5′. Escribe la hebra nueva, de 5′ a 3′ (solo las bases, sin primas).", "Hebra nueva", ["ATGCCTAG", "5'-ATGCCTAG-3'", "5′-ATGCCTAG-3′"], ["Complementaria: T→A, A→T, C→G, G→C, G→C, A→T, T→A, C→G.", "Antiparalela: se lee de 5′ a 3′."], "5′-ATGCCTAG-3′");
  O("b15", 1, "Los fragmentos de Okazaki aparecen en…", ["la hebra retrasada", "la hebra adelantada", "las dos hebras", "ninguna: son del ARN"], 0, ["Su síntesis 5′ → 3′ es contraria al avance de la horquilla."], "La hebra retrasada");
  X("b16", 1, "Tras 5 replicaciones semiconservativas de una molécula, ¿cuántas hebras originales (de la molécula de partida) hay en total?", "Hebras originales =", 2, "", ["Las hebras originales nunca se destruyen ni se copian como tales.", "Siempre quedan las 2 de partida, cada una en una molécula distinta."], "2 hebras originales");

  // ---- nivel 2
  X("c1", 2, "Meselson y Stahl: tras 3 generaciones en ¹⁴N, ¿qué porcentaje del ADN es híbrido (banda intermedia) según el modelo semiconservativo?", "% intermedio =", 25, "%", ["3 generaciones → 8 moléculas.", "Solo 2 son híbridas: 2/8 = 0,25."], "25 %");
  X("c2", 2, "Tras 4 generaciones en ¹⁴N, ¿qué porcentaje del ADN es totalmente ligero (semiconservativo)?", "% ligero =", 87.5, "%", ["4 generaciones → 16 moléculas; 2 híbridas.", "Ligeras: 14/16 = 0,875."], "87,5 %", 0.001);
  O("c3", 2, "Si el modelo fuese conservativo, ¿qué se vería tras una generación en ¹⁴N?", ["Dos bandas: una pesada y otra ligera", "Una sola banda intermedia", "Una sola banda pesada", "Una sola banda ligera"], 0, ["La molécula original queda intacta (pesada) y la nueva es toda ligera.", "Mitad y mitad."], "Una banda pesada y otra ligera");
  O("c4", 2, "Si el modelo fuese dispersivo, en la generación 2 se vería…", ["una sola banda, más cerca de la ligera que en la generación 1", "dos bandas: intermedia y ligera", "una banda pesada y una ligera", "una banda pesada"], 0, ["Cada molécula mezcla viejo y nuevo: la proporción de ¹⁵N se reduce a la mitad en cada generación.", "Nunca aparece una banda totalmente ligera."], "Una banda intermedia desplazada hacia la ligera");
  V("c5", 2, "En la hebra retrasada, la ADN polimerasa trabaja de 3′ a 5′.", false, ["La polimerasa siempre trabaja de 5′ a 3′; en la retrasada lo hace alejándose de la horquilla", "Sí, por eso se hace en fragmentos", "Sí, porque es antiparalela", "No hay polimerasa en la retrasada"], 0, ["Esa dirección contraria al avance de la horquilla es la causa de los fragmentos."]);
  X("c6", 2, "En un eucariota, una hebra retrasada de 12 000 nt se sintetiza en fragmentos de Okazaki de 200 nt. ¿Cuántos fragmentos son?", "Fragmentos =", 60, "", ["12 000 / 200 = 60."], "60 fragmentos");
  X("c7", 2, "En esa misma horquilla (12 000 nt replicados, fragmentos de 200 nt), ¿cuántos cebadores de ARN se han usado en total (los dos moldes)?", "Cebadores =", 61, "", ["Hebra adelantada: 1 cebador.", "Hebra retrasada: 60 fragmentos → 60 cebadores.", "Total: 61."], "61 cebadores");
  O("c8", 2, "En procariotas, ¿qué hace la ADN polimerasa I?", ["Elimina los cebadores de ARN y rellena el hueco con ADN", "Abre la doble hélice", "Une los fragmentos con enlaces fosfodiéster", "Fabrica el cebador"], 0, ["La polimerasa III copia; la I limpia los cebadores y rellena.", "La ligasa sella la última unión."], "Quita el cebador y rellena con ADN");
  M("c9", 2, "Une cada proteína con su función.",
    [C("Helicasa", ["Abre la doble hélice", "Quita la tensión por delante de la horquilla", "Mantiene las hebras separadas", "Fabrica el cebador", "Une fragmentos"], 0),
     C("Topoisomerasa", ["Quita la tensión por delante de la horquilla", "Abre la doble hélice", "Mantiene las hebras separadas", "Fabrica el cebador", "Une fragmentos"], 0),
     C("SSB", ["Mantiene las hebras separadas", "Abre la doble hélice", "Quita la tensión por delante de la horquilla", "Fabrica el cebador", "Une fragmentos"], 0),
     C("Primasa", ["Fabrica el cebador", "Abre la doble hélice", "Quita la tensión por delante de la horquilla", "Mantiene las hebras separadas", "Une fragmentos"], 0),
     C("Ligasa", ["Une fragmentos", "Abre la doble hélice", "Quita la tensión por delante de la horquilla", "Mantiene las hebras separadas", "Fabrica el cebador"], 0)],
    ["Helicasa abre; topoisomerasa relaja; SSB estabiliza; primasa hace el cebador; ligasa pega."], "Helicasa → abre; topoisomerasa → tensión; SSB → hebras abiertas; primasa → cebador; ligasa → une");
  X("c10", 2, "Un ADN tiene un 22 % de citosina. ¿Qué porcentaje de adenina tiene?", "% de A =", 28, "%", ["C = G = 22 %: G + C = 44 %.", "A + T = 56 %, y A = T: A = 28 %."], "28 %");
  X("c11", 2, "El ADN de E. coli (4,6·10⁶ pares de bases) se replica desde un único origen con dos horquillas que avanzan a 1000 nt/s cada una. ¿Cuántos minutos tarda?", "Tiempo (min) =", 38.3, "min", ["Velocidad total: 2 · 1000 = 2000 nt/s.", "4,6·10⁶ / 2000 = 2300 s.", "2300 / 60 = 38,3 min."], "≈ 38,3 min", 0.005);
  O("c12", 2, "Se dice que la replicación es bidireccional porque…", ["de cada origen salen dos horquillas en sentidos opuestos", "se sintetiza en los dos sentidos 5′ → 3′ y 3′ → 5′", "ocurre en las dos hebras de un cromosoma a la vez en el mismo sentido", "las dos polimerasas van en el mismo sentido"], 0, ["Es la burbuja de replicación con una horquilla en cada extremo."], "Dos horquillas por origen en sentidos opuestos");
  V("c13", 2, "Las células eucariotas replican su ADN desde un único origen de replicación.", false, ["Tienen muchos orígenes; si no, tardarían semanas o meses", "Sí, igual que las bacterias", "Sí, pero con mayor velocidad", "No tienen orígenes"], 0, ["Una sola horquilla a 50 nt/s tardaría años en copiar un genoma humano."]);
  V("c14", 2, "Hershey y Chase usaron ³⁵S para marcar las proteínas porque las proteínas contienen azufre y el ADN no.", true, ["Cisteína y metionina llevan azufre; el ADN no lo tiene", "El azufre está en los fosfatos del ADN", "El ³⁵S solo se une al ARN", "El azufre se distingue por su densidad"], 0, ["Con ³²P para el ADN y ³⁵S para las proteínas se marcan por separado."]);

  // ---- nivel 3
  X("d1", 3, "Una bacteria con ADN pesado (¹⁵N) se cultiva 5 generaciones en ¹⁴N (modelo semiconservativo). ¿Cuántas de las moléculas resultantes tienen ADN totalmente ligero?", "Moléculas ligeras =", 30, "", ["2⁵ = 32 moléculas.", "Solo 2 son híbridas.", "Ligeras: 32 − 2 = 30."], "30 moléculas");
  X("d2", 3, "Un genoma diploide humano tiene 6,4·10⁹ pares de bases. Cada horquilla avanza a 50 nt/s, cada origen tiene 2 horquillas y la fase S dura 8 h (28 800 s). ¿Cuántos orígenes de replicación hacen falta como mínimo?", "Orígenes =", 2223, "", ["Cada origen copia 2 · 50 · 28 800 = 2 880 000 pb.", "6,4·10⁹ / 2,88·10⁶ = 2222,2.", "Hay que redondear al alza: 2 223."], "≈ 2 223 orígenes (como mínimo)", 0.005);
  X("d3", 3, "Un telómero mide 8 000 nt y pierde 80 nt por división. Si la célula entra en senescencia al llegar a 5 600 nt, ¿cuántas divisiones puede hacer?", "Divisiones =", 30, "", ["Pérdida permitida: 8 000 − 5 600 = 2 400 nt.", "2 400 / 80 = 30."], "30 divisiones");
  X("d4", 3, "El ADN de ¹⁵N tiene una densidad de 1,724 g/mL y el de ¹⁴N, 1,710 g/mL. ¿Qué densidad tendrá el ADN híbrido de la generación 1?", "Densidad (g/mL) =", 1.717, "g/mL", ["Una hebra pesada y una ligera: promedio.", "(1,724 + 1,710) / 2 = 1,717."], "1,717 g/mL", 0.001);
  X("d5", 3, "Tras 3 generaciones en ¹⁴N, ¿qué porcentaje de todas las hebras del tubo conserva ¹⁵N?", "% de hebras con ¹⁵N =", 12.5, "%", ["8 moléculas = 16 hebras.", "Solo 2 son las originales (con ¹⁵N): 2/16 = 0,125."], "12,5 %", 0.001);
  O("d6", 3, "Un cultivo en ¹⁵N pasa a ¹⁴N. A los 30 min hay una banda intermedia; a los 60 min, una intermedia y otra ligera de igual grosor. ¿Cuál es el tiempo de generación?", ["30 min", "60 min", "15 min", "90 min"], 0, ["Una banda solo intermedia = 1 generación (a los 30 min).", "Intermedia + ligera al 50 % = 2 generaciones (a los 60 min).", "60 / 2 = 30 min."], "30 min");
  O("d7", 3, "Si las proteínas (y no el ADN) fuesen el material genético, ¿qué habrían observado Hershey y Chase en el lote marcado con ³⁵S?", ["Gran parte del ³⁵S en el sedimento, dentro de las bacterias", "Casi todo el ³⁵S en el sobrenadante, como ocurrió", "El ³⁵S desapareció", "El ³²P en el sobrenadante"], 0, ["Si lo que entra es la proteína, la radiactividad de la proteína estaría en las bacterias.", "No ocurrió: el ³⁵S se quedó fuera."], "El ³⁵S dentro de las bacterias");
  X("d8", 3, "La tasa final de error es 10⁻⁹ por nucleótido copiado. ¿Cuántos errores cabe esperar al replicar 6,4·10⁹ pb?", "Errores =", 6.4, "", ["6,4·10⁹ · 10⁻⁹ = 6,4."], "≈ 6,4 errores por división", 0.001);
  X("d9", 3, "En E. coli, cada horquilla copia la mitad del genoma (2,3·10⁶ nt). Si los fragmentos de Okazaki miden 1 500 nt, ¿cuántos fragmentos tiene la hebra retrasada de una horquilla? (redondea al alza)", "Fragmentos =", 1534, "", ["2,3·10⁶ / 1 500 = 1 533,3.", "El último fragmento queda incompleto pero cuenta: 1 534."], "1 534 fragmentos", 0.005);
  X("d10", 3, "Un fragmento de ADN de 4 000 pares de bases tiene un 28 % de guanina. ¿Cuántos puentes de hidrógeno hay en total? (A-T: 2; G-C: 3)", "Puentes de H =", 10240, "", ["G = C = 28 % (1 120 pb G-C cada una), G-C = 56 % → 2 240 pares; A-T = 1 760 pares.", "A-T: 1 760 · 2 = 3 520. G-C: 2 240 · 3 = 6 720.", "Total: 10 240."], "10 240 puentes de hidrógeno");
  R("d11", "Describe el experimento de Meselson y Stahl: método, resultados en las generaciones 1 y 2 y conclusión. (Pregunta tipo PAU)", [
    { t: "Método: E. coli en ¹⁵N (ADN pesado) y luego en ¹⁴N; ADN extraído por generaciones y ultracentrifugado en CsCl", p: 0.4 },
    { t: "Generación 1: una sola banda de densidad intermedia", p: 0.4 },
    { t: "Generación 2: dos bandas, intermedia y ligera, a partes iguales", p: 0.4 },
    { t: "Se descartan el conservativo (gen. 1) y el dispersivo (gen. 2)", p: 0.4 },
    { t: "Conclusión: replicación semiconservativa", p: 0.4 }], ["Método.", "Generación 1.", "Generación 2.", "Descartes.", "Conclusión."], "Semiconservativo: cada hija = hebra vieja + nueva");
  R("d12", "Explica cómo se replica el ADN: enzimas, hebra adelantada y retrasada, y por qué hace falta un cebador. (Pregunta tipo PAU)", [
    { t: "Helicasa abre la hélice (origen, horquilla); SSB y topoisomerasa ayudan", p: 0.4 },
    { t: "La ADN polimerasa añade nucleótidos solo 5′ → 3′ sobre un molde, y necesita un cebador con 3′-OH", p: 0.5 },
    { t: "Primasa: cebador de ARN", p: 0.3 },
    { t: "Adelantada continua; retrasada en fragmentos de Okazaki por el antiparalelismo", p: 0.5 },
    { t: "Pol. I (o equivalente) cambia el cebador por ADN y la ligasa une los fragmentos", p: 0.3 }], ["Apertura.", "Polimerasa y cebador.", "Primasa.", "Hebras.", "Maduración."], "Helicasa → primasa → polimerasa → ligasa");
  R("d13", "¿Qué son los telómeros y la telomerasa? Relaciónalos con el envejecimiento celular y el cáncer. (Pregunta tipo PAU)", [
    { t: "Telómeros: secuencias repetidas (TTAGGG) en los extremos de los cromosomas, sin genes", p: 0.4 },
    { t: "Problema del extremo: al eliminar el último cebador se pierde un poco de ADN en cada replicación", p: 0.5 },
    { t: "Telomerasa: enzima con molde de ARN que alarga el telómero", p: 0.4 },
    { t: "Células somáticas: telomerasa casi inactiva, telómero se acorta, senescencia (límite de Hayflick)", p: 0.4 },
    { t: "Células madre y cancerosas: telomerasa activa; en el cáncer, división sin límite", p: 0.3 }], ["Telómeros.", "Problema del extremo.", "Telomerasa.", "Somáticas.", "Madre y cáncer."], "Telomerasa activa: células madre y cáncer");
  R("d14", "Compara el ADN de Avery con el de Hershey y Chase: ¿qué demostró cada experimento y qué diferencia metodológica tienen? (Pregunta tipo PAU)", [
    { t: "Avery: el principio transformante de Griffith es ADN (la ADNasa impide la transformación; proteasa y ARNasa no)", p: 0.5 },
    { t: "Hershey y Chase: en el virus, entra el ADN en la bacteria y dirige la fabricación de virus", p: 0.5 },
    { t: "Avery elimina una molécula cada vez; Hershey y Chase marcan ADN (³²P) y proteína (³⁵S) por separado", p: 0.4 },
    { t: "Organismos: bacterias (neumococo) frente a bacteriófago T2", p: 0.3 },
    { t: "Los dos concluyen que el material genético es el ADN", p: 0.3 }], ["Avery.", "Hershey y Chase.", "Método.", "Organismos.", "Conclusión común."], "Los dos apuntan al ADN, con métodos distintos");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Experimentos clave", ancha: true,
      tabla: { cab: ["Experimento", "Resultado"], filas: [
        ["Griffith 1928", "R viva + S muerta: ratón muere"],
        ["Avery 1944", "la ADNasa anula la transformación"],
        ["Hershey y Chase 1952", "³²P dentro; ³⁵S fuera"],
        ["Meselson y Stahl 1958", "semiconservativo"]
      ] } },
    { titulo: "Meselson y Stahl: bandas", ancha: true,
      tabla: { cab: ["Gen.", "Conservativo", "Semiconservativo", "Dispersivo"], filas: [
        ["1", "pesada + ligera", "intermedia", "intermedia"],
        ["2", "pesada + ligera", "intermedia + ligera", "intermedia (más ligera)"]
      ] } },
    { titulo: "La horquilla",
      pasos: ["Helicasa abre; SSB y topoisomerasa ayudan.", "Primasa: cebador de ARN.", "Polimerasa: solo 5′ → 3′ (adelantada continua; retrasada en fragmentos).", "Se quita el cebador y la ligasa une."],
      nota: "Cebadores = 1 + nº de fragmentos de Okazaki." },
    { titulo: "Procariotas y eucariotas", ancha: true,
      tabla: { cab: ["", "Procariotas", "Eucariotas"], filas: [
        ["orígenes", "1", "muchos"],
        ["horquilla", "≈ 1000 nt/s", "≈ 50 nt/s"],
        ["Okazaki", "1000-2000 nt", "100-200 nt"],
        ["extremos", "circular", "telómeros"]
      ] } },
    { titulo: "Hebra adelantada y retrasada", ancha: true,
      tabla: { cab: ["", "Adelantada", "Retrasada"], filas: [
        ["síntesis", "continua", "en fragmentos"],
        ["cebadores", "1", "1 por fragmento"],
        ["sentido", "con la horquilla", "contra la horquilla"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Hershey y Chase marcaron el ADN con azufre", bien: "Fósforo-32 para el ADN; azufre-35 para las proteínas", por: "Solo el ADN tiene fosfato; solo las proteínas, azufre." },
        { mal: "En la retrasada la polimerasa va de 3′ a 5′", bien: "Siempre de 5′ a 3′, alejándose de la horquilla", por: "Por eso hay fragmentos." },
        { mal: "La ligasa corrige los errores", bien: "Los corrige la propia polimerasa (exonucleasa 3′→5′)", por: "La ligasa solo sella cortes." },
        { mal: "Semiconservativo = se conserva la mitad del ADN", bien: "Se conserva una de las dos hebras en cada molécula hija", por: "Cada hija: 1 vieja + 1 nueva." }
      ] }
  ];

  B.registrar("bio2", "t11", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio11a.secciones,
    nuevas: B.parte.bio11a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
