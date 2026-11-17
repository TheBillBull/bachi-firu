/* ============================================================
   Biología II · ampliaciones · Tema 6 (parte B): La célula
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t6.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "La <b>teoría celular</b> (Schleiden 1838, Schwann 1839, Virchow 1855): la célula es la unidad estructural y funcional, y toda célula procede de otra.",
    "La célula <b>procariota</b> no tiene núcleo ni orgánulos con membrana (ADN circular en el nucleoide, ribosomas 70S); la <b>eucariota</b> sí. La vegetal añade pared, cloroplastos y vacuola central.",
    "La membrana es un <b>mosaico fluido</b> (Singer y Nicolson, 1972): bicapa de fosfolípidos con colesterol y proteínas móviles; el transporte puede ser <b>pasivo</b> (a favor del gradiente) o <b>activo</b> (en contra, con ATP), o en masa (vesículas).",
    "El <b>sistema de endomembranas</b> (RER → Golgi → vesículas) fabrica y reparte proteínas; <b>mitocondrias y cloroplastos</b> tienen doble membrana, ADN y ribosomas 70S, y proceden de bacterias (<b>endosimbiosis</b>, Margulis)."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "La célula",
    autores: [
      { n: "Qué estudia", f: "la unidad de los seres vivos y sus orgánulos", l: "membrana · transporte · orgánulos" },
      { n: "Hooke", f: "1665", l: "llama «células» a las celdillas del corcho" },
      { n: "Schleiden y Schwann", f: "1838–1839", l: "teoría celular (plantas y animales)" },
      { n: "Virchow", f: "1855", l: "toda célula procede de otra célula" },
      { n: "Singer y Nicolson", f: "1972", l: "mosaico fluido" },
      { n: "Margulis", f: "1967", l: "teoría endosimbiótica" }
    ],
    obras: ["Teoría celular", "Mosaico fluido", "Transporte", "Endomembranas", "Endosimbiosis"],
    bloques: [
      { t: "Teoría celular", frases: ["La célula es la <b>unidad estructural y funcional</b>.", "Toda célula procede de otra célula.", "Contiene el material hereditario."],
        tabla: { cab: ["Procariota", "Eucariota"], filas: [["ADN circular, nucleoide", "ADN lineal, en el núcleo"], ["sin orgánulos con membrana", "con orgánulos"], ["ribosomas 70S", "ribosomas 80S"]] } },
      { t: "Animal y vegetal", frases: ["La vegetal tiene <b>pared, cloroplastos y vacuola central</b>.", "La animal tiene <b>centriolos</b> y lisosomas."],
        tabla: { cab: ["Animal", "Vegetal"], filas: [["heterótrofa", "autótrofa"], ["reserva: glucógeno", "reserva: almidón"], ["sin pared", "pared de celulosa"]] } },
      { t: "Membrana", frases: ["<b>Mosaico fluido</b>: bicapa de fosfolípidos + proteínas móviles.", "El <b>colesterol</b> regula la fluidez.", "Azúcares solo en la cara externa (glucocálix)."] },
      { t: "Transporte", frases: ["Pasivo: <b>a favor</b> del gradiente, sin ATP.", "Activo: <b>en contra</b>, con ATP (bomba 3 Na⁺ / 2 K⁺).", "En masa: endocitosis y exocitosis."],
        tabla: { cab: ["Tipo", "Ejemplo"], filas: [["difusión simple", "O₂, CO₂"], ["difusión facilitada", "glucosa (permeasa)"], ["activo", "bomba Na⁺/K⁺"]] } },
      { t: "Orgánulos", frases: ["Ruta de secreción: <b>RER → Golgi → vesícula → exocitosis</b>.", "Lisosomas digieren; REL fabrica lípidos.", "Citoesqueleto: actina, intermedios y microtúbulos."],
        tabla: { cab: ["Nº de membranas", "Orgánulos"], filas: [["ninguna", "ribosomas, centriolos"], ["una", "RER, REL, Golgi, lisosomas, vacuolas"], ["dos", "núcleo, mitocondria, cloroplasto"]] } },
      { t: "Endosimbiosis", frases: ["Mitocondria y cloroplasto fueron <b>bacterias</b> englobadas.", "Pruebas: doble membrana, ADN circular, ribosomas 70S."] }
    ],
    resumen: [
      "Todo ser vivo está hecho de <b>células</b>; la diferencia de fondo está en el <b>ADN</b>: libre (procariota) o en un núcleo (eucariota).",
      "La membrana es <b>selectiva</b>: el tipo de transporte depende del <b>gradiente</b> y de la <b>energía</b>.",
      "Las proteínas viajan <b>RER → Golgi → destino</b> y la energía se obtiene en <b>mitocondrias y cloroplastos</b>, de origen bacteriano."
    ],
    conecta: [
      { con: "Biología T1:", rel: "ósmosis y agua, que explican el transporte pasivo." },
      { con: "Biología T3 y T4:", rel: "fosfolípidos de la membrana y proteínas (canales, bombas, enzimas)." },
      { con: "Biología T5 y T12:", rel: "ADN, ARN y síntesis de proteínas en los ribosomas." },
      { con: "Biología T8 y T9:", rel: "respiración en la mitocondria y fotosíntesis en el cloroplasto." },
      { con: "Química II T7:", rel: "pH ácido del lisosoma y gradientes de H⁺." }
    ],
    claves: [
      ["Teoría celular", "la célula es la unidad estructural y funcional; toda célula procede de otra"],
      ["Mosaico fluido", "membrana de bicapa lipídica con proteínas móviles"],
      ["Glucocálix", "cubierta de azúcares de la cara externa de la membrana"],
      ["Difusión facilitada", "paso a favor del gradiente a través de una proteína, sin ATP"],
      ["Transporte activo", "paso en contra del gradiente, con gasto de ATP"],
      ["Bomba Na⁺/K⁺", "saca 3 Na⁺ y mete 2 K⁺ por cada ATP"],
      ["RER", "retículo con ribosomas: sintetiza proteínas de secreción"],
      ["Aparato de Golgi", "modifica, clasifica y empaqueta proteínas en vesículas"],
      ["Lisosoma", "vesícula con hidrolasas ácidas: digestión celular"],
      ["Teoría endosimbiótica", "mitocondrias y cloroplastos proceden de bacterias englobadas"]
    ],
    cita: { txt: "Dentro de ti hay bacterias domesticadas: tus mitocondrias conservan ADN propio, de tipo bacteriano.", autor: "Dato para recordar", obra: "ADN mitocondrial humano: 16 569 pb y 37 genes" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    celulas: {
      titulo: "¿De qué célula es?",
      consigna: "Clasifica cada rasgo según el tipo de célula al que caracteriza.",
      categorias: ["Procariota", "Eucariota animal", "Eucariota vegetal"],
      items: [
        { t: "Nucleoide con ADN circular", c: 0 }, { t: "Pared de peptidoglucano", c: 0 }, { t: "Ribosomas 70S como único «orgánulo»", c: 0 },
        { t: "Centriolos", c: 1 }, { t: "Lisosomas abundantes", c: 1 }, { t: "Reserva de glucógeno", c: 1 },
        { t: "Cloroplastos", c: 2 }, { t: "Pared de celulosa", c: 2 }, { t: "Vacuola central grande", c: 2 }
      ]
    },
    membranas: {
      titulo: "¿Cuántas membranas tiene?",
      consigna: "Clasifica cada estructura según esté rodeada de ninguna, una o dos membranas.",
      categorias: ["Sin membrana", "Una membrana", "Doble membrana"],
      items: [
        { t: "Ribosoma", c: 0 }, { t: "Centriolo", c: 0 }, { t: "Citoesqueleto", c: 0 },
        { t: "Retículo endoplasmático", c: 1 }, { t: "Aparato de Golgi", c: 1 }, { t: "Lisosoma", c: 1 }, { t: "Vacuola central", c: 1 },
        { t: "Mitocondria", c: 2 }, { t: "Cloroplasto", c: 2 }, { t: "Núcleo", c: 2 }
      ]
    },
    transportes: {
      titulo: "¿Qué tipo de transporte es?",
      consigna: "Clasifica cada caso.",
      categorias: ["Difusión simple", "Difusión facilitada", "Transporte activo", "Transporte en masa"],
      items: [
        { t: "El O₂ entra en un hematíe", c: 0 }, { t: "El CO₂ sale de una célula muscular", c: 0 },
        { t: "La glucosa entra por GLUT sin gastar ATP", c: 1 }, { t: "Los iones pasan por un canal abierto a favor de gradiente", c: 1 },
        { t: "Bomba que saca 3 Na⁺ y mete 2 K⁺", c: 2 }, { t: "Una célula mete glucosa contra gradiente con ayuda del Na⁺", c: 2 },
        { t: "Un macrófago engloba una bacteria", c: 3 }, { t: "Una célula del páncreas libera insulina en vesículas", c: 3 }
      ]
    },
    orgfun: {
      titulo: "Orgánulo y función",
      consigna: "Une cada orgánulo con su función principal.",
      pares: [
        ["Ribosoma", "Traduce el ARNm y fabrica proteínas"],
        ["Retículo liso", "Sintetiza lípidos y detoxifica"],
        ["Aparato de Golgi", "Modifica y empaqueta proteínas en vesículas"],
        ["Lisosoma", "Digiere con hidrolasas ácidas"],
        ["Mitocondria", "Respiración celular: ATP"],
        ["Cloroplasto", "Fotosíntesis"],
        ["Nucleolo", "Forma las subunidades de los ribosomas"],
        ["Peroxisoma", "Descompone el H₂O₂ con catalasa"]
      ]
    },
    cientificos: {
      titulo: "Científicos e hitos",
      consigna: "Une cada nombre con su aportación.",
      pares: [
        ["Hooke (1665)", "Llamó «células» a las celdillas del corcho"],
        ["Schleiden y Schwann (1838–39)", "Todos los seres vivos están formados por células"],
        ["Virchow (1855)", "Toda célula procede de otra célula"],
        ["Gorter y Grendel (1925)", "La membrana es una bicapa de lípidos"],
        ["Singer y Nicolson (1972)", "Modelo del mosaico fluido"],
        ["Margulis (1967)", "Teoría endosimbiótica"],
        ["Palade", "Ruta RER → Golgi → secreción con proteínas marcadas"]
      ]
    },
    ordensec: {
      titulo: "La ruta de una proteína de secreción",
      consigna: "Ordena los pasos, desde el principio.",
      items: [
        { t: "El ARNm sale del núcleo por un poro" },
        { t: "El ribosoma se acopla al RER y la proteína entra en su luz" },
        { t: "Una vesícula de transporte brota del RER" },
        { t: "La proteína madura en el aparato de Golgi (cis → trans)" },
        { t: "Sale en una vesícula de secreción" },
        { t: "Exocitosis: se libera fuera de la célula" }
      ]
    },
    ordenteoria: {
      titulo: "Cronología de la teoría celular",
      consigna: "Ordena de más antiguo a más reciente.",
      items: [
        { t: "Hooke observa las «células» del corcho", nota: "1665" },
        { t: "Brown describe el núcleo", nota: "1831" },
        { t: "Schleiden y Schwann: teoría celular", nota: "1838–1839" },
        { t: "Virchow: «omnis cellula e cellula»", nota: "1855" },
        { t: "Singer y Nicolson: mosaico fluido", nota: "1972" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 6",
      preguntas: [
        { q: "¿Qué enuncia Virchow en 1855?", op: ["Toda célula procede de otra célula", "Todas las plantas están formadas por células", "La célula es la unidad funcional de los animales", "El núcleo contiene el ADN"], ok: 0, porque: "«Omnis cellula e cellula»: descarta la generación espontánea." },
        { q: "Una célula sin núcleo ni orgánulos con membrana, con ADN circular, es…", op: ["procariota", "eucariota animal", "eucariota vegetal", "un virus"], ok: 0, porque: "El ADN está libre en el nucleoide." },
        { q: "El colesterol de la membrana…", op: ["regula la fluidez", "forma canales", "es la proteína de transporte", "da color a la célula"], ok: 0, porque: "Modera la rigidez y la fluidez de la bicapa." },
        { q: "El O₂ atraviesa la membrana por…", op: ["difusión simple", "difusión facilitada", "transporte activo", "endocitosis"], ok: 0, porque: "Es pequeño y apolar: cruza la bicapa a favor de gradiente." },
        { q: "La bomba Na⁺/K⁺ por cada ATP…", op: ["saca 3 Na⁺ y mete 2 K⁺", "saca 2 Na⁺ y mete 3 K⁺", "saca 3 K⁺ y mete 2 Na⁺", "mete 3 Na⁺ y saca 2 K⁺"], ok: 0, porque: "Es transporte activo, en contra del gradiente de los dos iones." },
        { q: "Una proteína de secreción sigue la ruta…", op: ["RER → Golgi → vesícula de secreción → exocitosis", "Golgi → RER → lisosoma → membrana", "REL → Golgi → núcleo", "Mitocondria → Golgi → membrana"], ok: 0, porque: "Es el orden demostrado por Palade con proteínas marcadas." },
        { q: "El orgánulo con enzimas hidrolíticas que digiere material es…", op: ["el lisosoma", "el peroxisoma", "el nucleolo", "el RER"], ok: 0, porque: "Sus enzimas funcionan a pH ≈ 5." },
        { q: "Mitocondria y cloroplasto se parecen en que ambos…", op: ["tienen doble membrana, ADN circular y ribosomas 70S", "tienen una sola membrana", "carecen de ADN", "fabrican proteínas con ribosomas 80S"], ok: 0, porque: "Son pruebas de su origen bacteriano." },
        { q: "Un cilio o flagelo eucariota tiene un esqueleto de…", op: ["9 dobletes periféricos + 2 microtúbulos centrales", "9 tripletes sin centro", "microfilamentos de actina", "filamentos intermedios"], ok: 0, porque: "El «9 + 2» se mueve gracias a la dineína." },
        { q: "La pared de una célula vegetal está hecha de…", op: ["celulosa", "peptidoglucano", "quitina", "colágeno"], ok: 0, porque: "Peptidoglucano: bacterias; quitina: hongos." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre procariotas es FALSA?", op: ["No tienen ribosomas", "Tienen el ADN circular", "Se dividen por fisión binaria", "Muchas tienen pared de peptidoglucano"], ok: 0, porque: "Tienen ribosomas 70S: sin ellos no podrían fabricar proteínas." },
        { q: "¿Cuál de estas afirmaciones sobre la membrana es FALSA?", op: ["Las proteínas están fijas y no se pueden mover", "Los azúcares están solo en la cara externa", "Tiene fosfolípidos con cabezas polares", "El colesterol aparece en las animales"], ok: 0, porque: "En el mosaico fluido las proteínas y los lípidos se mueven lateralmente." },
        { q: "¿Cuál de estas afirmaciones sobre el transporte es FALSA?", op: ["La difusión facilitada gasta ATP", "La difusión simple no necesita proteínas", "El transporte activo va contra gradiente", "La endocitosis usa vesículas"], ok: 0, porque: "La facilitada es pasiva: usa proteínas pero no ATP." },
        { q: "¿Cuál de estas afirmaciones sobre los orgánulos es FALSA?", op: ["El REL tiene ribosomas", "El RER tiene ribosomas", "El Golgi tiene caras cis y trans", "Los lisosomas tienen hidrolasas ácidas"], ok: 0, porque: "«Liso» significa sin ribosomas." },
        { q: "¿Cuál de estas afirmaciones sobre la mitocondria es FALSA?", op: ["Tiene una sola membrana", "Su membrana interna forma crestas", "Tiene ADN circular", "Realiza la respiración celular"], ok: 0, porque: "Tiene doble membrana." },
        { q: "¿Cuál de estas afirmaciones sobre la endosimbiosis es FALSA?", op: ["El núcleo procede de una bacteria englobada", "Los cloroplastos proceden de cianobacterias", "Las mitocondrias tienen ribosomas 70S", "Fue propuesta por Margulis (1967)"], ok: 0, porque: "La teoría explica mitocondrias y cloroplastos, no el núcleo." },
        { q: "¿Cuál de estas afirmaciones sobre las células animales y vegetales es FALSA?", op: ["La célula animal tiene pared celular", "La vegetal tiene cloroplastos", "La vegetal tiene vacuola central", "La animal almacena glucógeno"], ok: 0, porque: "La pared de celulosa es propia de la célula vegetal." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: la célula",
      cartas: [
        { a: "Teoría celular", b: "Unidad estructural y funcional; toda célula procede de otra; contiene el material hereditario." },
        { a: "Procariota", b: "Sin núcleo ni orgánulos con membrana. ADN circular (nucleoide), ribosomas 70S." },
        { a: "Eucariota", b: "Núcleo con envoltura y orgánulos con membrana. Ribosomas 80S." },
        { a: "Célula vegetal", b: "Pared de celulosa, cloroplastos y vacuola central; sin centriolos (plantas con flor)." },
        { a: "Mosaico fluido", b: "Bicapa de fosfolípidos con proteínas móviles. Singer y Nicolson, 1972." },
        { a: "Colesterol de la membrana", b: "Regula la fluidez (la hace menos fluida con calor y menos rígida con frío)." },
        { a: "Glucocálix", b: "Azúcares de glucolípidos y glucoproteínas en la cara externa: reconocimiento celular." },
        { a: "Difusión simple", b: "A favor del gradiente, sin proteína ni ATP: O₂, CO₂." },
        { a: "Difusión facilitada", b: "A favor del gradiente, con canal o permeasa, sin ATP. Se satura." },
        { a: "Transporte activo", b: "En contra del gradiente, con ATP. Bomba Na⁺/K⁺: 3 Na⁺ fuera, 2 K⁺ dentro." },
        { a: "Endocitosis y exocitosis", b: "Entrada y salida con vesículas: fagocitosis, pinocitosis, mediada por receptor." },
        { a: "RER y REL", b: "Rugoso: proteínas de secreción. Liso: lípidos, detoxificación, Ca²⁺." },
        { a: "Aparato de Golgi", b: "Cara cis (entrada) y trans (salida): modifica, clasifica y empaqueta." },
        { a: "Lisosoma", b: "Hidrolasas ácidas (pH ≈ 5): heterofagia y autofagia." },
        { a: "Mitocondria", b: "Doble membrana, crestas, matriz con ADN circular y ribosomas 70S: respiración." },
        { a: "Cloroplasto", b: "Doble membrana, tilacoides en grana, estroma: fotosíntesis." },
        { a: "Citoesqueleto", b: "Microfilamentos (actina, 7 nm), intermedios (≈ 10 nm), microtúbulos (tubulina, 25 nm)." },
        { a: "Cilios y flagelos", b: "Esqueleto 9 + 2 de microtúbulos; el centriolo es 9 × 3." },
        { a: "Teoría endosimbiótica", b: "Mitocondrias (bacterias aerobias) y cloroplastos (cianobacterias) fueron englobados. Margulis, 1967." }
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
  O("b1", 1, "¿Cuál de estas ideas NO forma parte de la teoría celular?", ["Los virus son las unidades de vida más pequeñas", "La célula es la unidad estructural de los seres vivos", "Toda célula procede de otra célula", "En la célula se realizan las funciones vitales"], 0, ["Los tres postulados clásicos hablan de la célula como unidad estructural, funcional y de origen.", "Los virus no son células y no entran en la teoría."], "Los virus son las unidades de vida más pequeñas");
  O("b2", 1, "¿Quién dio nombre a las «células» al observar corcho al microscopio?", ["Robert Hooke", "Rudolf Virchow", "Theodor Schwann", "Robert Brown"], 0, ["Fue en 1665, con un microscopio óptico simple.", "Observó las paredes de células muertas."], "Robert Hooke (1665)");
  O("b3", 1, "Lo que distingue a una célula procariota de una eucariota es que la procariota…", ["no tiene núcleo con envoltura ni orgánulos con membrana", "no tiene ribosomas", "no tiene membrana plasmática", "no tiene ADN"], 0, ["Tiene ADN, ribosomas (70S) y membrana plasmática.", "Su ADN está libre en el nucleoide."], "No tiene núcleo ni orgánulos con membrana");
  V("b4", 1, "Las bacterias tienen mitocondrias.", false, ["Son procariotas: no tienen orgánulos con membrana; la respiración se hace en su membrana plasmática", "Las tienen, pero muy pequeñas", "Las tienen solo las que viven con oxígeno", "Las mitocondrias son la pared bacteriana"], 0, ["Las mitocondrias son orgánulos eucariotas (y proceden de antiguas bacterias)."]);
  O("b5", 1, "En la bicapa de la membrana, las cabezas polares de los fosfolípidos…", ["miran hacia el agua, a ambos lados", "miran hacia el interior de la bicapa", "forman el centro de la membrana", "están unidas al colesterol"], 0, ["Son hidrófilas: se orientan hacia el medio acuoso.", "Las colas apolares quedan protegidas en el centro."], "Hacia el agua, fuera y dentro de la célula");
  O("b6", 1, "El paso de oxígeno desde el exterior (más concentrado) al interior de la célula es…", ["difusión simple", "difusión facilitada", "transporte activo", "exocitosis"], 0, ["A favor del gradiente, sin proteína ni ATP."], "Difusión simple");
  O("b7", 1, "La bomba Na⁺/K⁺ realiza…", ["transporte activo", "difusión simple", "difusión facilitada", "ósmosis"], 0, ["Mueve iones en contra de su gradiente y gasta ATP."], "Transporte activo");
  O("b8", 1, "Una proteína de secreción sigue el orden…", ["RER → Golgi → membrana plasmática", "Golgi → RER → membrana plasmática", "REL → núcleo → Golgi", "Lisosoma → Golgi → RER"], 0, ["Se sintetiza en el RER, madura en el Golgi y sale por exocitosis."], "RER → Golgi → membrana plasmática");
  O("b9", 1, "La función principal de los lisosomas es…", ["digerir material con enzimas hidrolíticas", "fabricar ATP", "hacer la fotosíntesis", "guardar el ADN"], 0, ["Contienen hidrolasas ácidas (pH ≈ 5)."], "Digestión celular");
  O("b10", 1, "El orgánulo donde se produce la mayor parte del ATP en una célula animal es…", ["la mitocondria", "el lisosoma", "el aparato de Golgi", "el REL"], 0, ["La respiración celular tiene lugar en la mitocondria (Tema 8)."], "La mitocondria");
  T("b11", 1, "El orgánulo con clorofila donde se realiza la fotosíntesis es el…", "Orgánulo", ["cloroplasto", "cloroplastos"], ["La clorofila está en los tilacoides del cloroplasto."], "Cloroplasto");
  T("b12", 1, "La proteína que forma los microtúbulos es la…", "Proteína", ["tubulina", "tubulinas"], ["Los microfilamentos son de actina; los microtúbulos, de tubulina α y β."], "Tubulina");
  V("b13", 1, "Los ribosomas están rodeados de una doble membrana.", false, ["No tienen membrana: son complejos de ARNr y proteínas", "Están rodeados por una sola membrana", "Su membrana es la del RER", "Solo los de las bacterias la tienen"], 0, ["Son orgánulos sin membrana, en procariotas y eucariotas."]);
  M("b14", 1, "Une cada orgánulo con su función.",
    [C("Aparato de Golgi", ["Modifica y empaqueta proteínas", "Fabrica lípidos", "Produce ATP"], 0), C("Retículo liso", ["Fabrica lípidos", "Modifica y empaqueta proteínas", "Produce ATP"], 0), C("Mitocondria", ["Produce ATP", "Fabrica lípidos", "Modifica y empaqueta proteínas"], 0)],
    ["El Golgi clasifica y empaqueta; el REL sintetiza lípidos; la mitocondria hace la respiración celular."], "Golgi → empaqueta; REL → lípidos; mitocondria → ATP");
  O("b15", 1, "¿De qué está hecha la pared de una célula vegetal?", ["celulosa", "peptidoglucano", "quitina", "colesterol"], 0, ["Peptidoglucano: bacterias. Quitina: hongos."], "Celulosa");
  X("b16", 1, "En una micrografía, una célula de 15 µm mide 3 cm. ¿A cuántos aumentos está hecha la imagen?", "Aumentos (×) =", 2000, "×", ["Aumentos = tamaño de la imagen / tamaño real.", "3 cm = 30 000 µm; 30 000 / 15 = 2000."], "×2000");

  // ---- nivel 2
  X("c1", 2, "Una célula cúbica tiene 10 µm de lado. ¿Cuál es su relación superficie/volumen?", "S/V (µm⁻¹) =", 0.6, "µm⁻¹", ["Superficie = 6 · 10² = 600 µm². Volumen = 10³ = 1000 µm³.", "S/V = 600 / 1000 = 0,6 µm⁻¹."], "0,6 µm⁻¹");
  X("c2", 2, "Un cubo de 1 µm de lado y otro de 10 µm: ¿cuántas veces es mayor la relación S/V del pequeño?", "Veces =", 10, "veces", ["S/V = 6/L: el pequeño tiene 6 y el grande, 0,6.", "6 / 0,6 = 10."], "10 veces");
  X("c3", 2, "Una mitocondria mide 4 cm en una micrografía de ×20 000. ¿Cuál es su longitud real?", "Longitud real (µm) =", 2, "µm", ["4 cm = 40 000 µm.", "Tamaño real = 40 000 / 20 000 = 2 µm."], "2 µm");
  X("c4", 2, "Una bomba Na⁺/K⁺ hace 100 ciclos. ¿Cuántos iones Na⁺ expulsa?", "Na⁺ expulsados =", 300, "iones", ["Cada ciclo (1 ATP) saca 3 Na⁺.", "100 · 3 = 300."], "300 Na⁺");
  X("c5", 2, "¿Cuántas moléculas de ATP se gastan para expulsar 1200 iones Na⁺?", "ATP =", 400, "ATP", ["Cada ATP expulsa 3 Na⁺.", "1200 / 3 = 400."], "400 ATP");
  X("c6", 2, "El pH del lisosoma es 5 y el del citosol 7,2. ¿Cuántas veces mayor es la [H⁺] en el lisosoma?", "Veces =", 158.5, "veces", ["Diferencia de pH: 7,2 − 5 = 2,2.", "Cada unidad es ×10: 10<sup>2,2</sup> ≈ 158."], "≈ 158 veces");
  X("c7", 2, "Calcula la osmolaridad de una disolución de NaCl al 0,3 % p/v (M<sub>r</sub> = 58,44) y di si es hipotónica para un hematíe (308 mOsm/L).", "Osmolaridad (mOsm/L) =", 102.7, "mOsm/L", ["3 g/L / 58,44 = 0,0513 mol/L.", "×2 partículas = 102,7 mOsm/L: menos que 308, así que es hipotónica (el hematíe se hincha)."], "102,7 mOsm/L: hipotónica", 0.01);
  X("c8", 2, "Gorter y Grendel (1925) extendieron los lípidos de unos glóbulos rojos y obtuvieron un área de 0,60 m²; la superficie de las células era de 0,30 m². ¿Cuántas veces es mayor el área de los lípidos?", "Cociente =", 2, "veces", ["0,60 / 0,30 = 2.", "Los lípidos cubrirían dos veces la célula: hay dos capas, es decir, una bicapa."], "2 → bicapa");
  V("c9", 2, "Si se rompe un lisosoma, sus enzimas digieren enseguida toda la célula.", false, ["Sus hidrolasas casi no funcionan al pH del citosol (≈ 7,2), así que una pequeña fuga no es letal", "Sus enzimas funcionan igual a cualquier pH", "El citosol tiene también pH 5", "Las hidrolasas no son enzimas"], 0, ["Las hidrolasas ácidas necesitan pH ácido.", "Solo una rotura masiva de muchos lisosomas provoca autolisis."]);
  M("c10", 2, "Indica el tipo de transporte de cada caso.",
    [C("Entrada de glucosa por una permeasa (a favor de gradiente)", ["Difusión facilitada", "Difusión simple", "Transporte activo"], 0), C("Salida de 3 Na⁺ por una ATPasa", ["Transporte activo", "Difusión facilitada", "Difusión simple"], 0), C("Entrada de O₂", ["Difusión simple", "Transporte activo", "Difusión facilitada"], 0)],
    ["Proteína sin ATP y a favor: facilitada.", "ATPasa en contra: activo.", "O₂ apolar y pequeño: simple."], "Facilitada · activo · simple");
  O("c11", 2, "¿Cuál de estas características es común a mitocondrias y cloroplastos?", ["Tener ADN circular y ribosomas 70S", "Tener tilacoides", "Tener crestas", "Estar rodeados por una sola membrana"], 0, ["Los tilacoides son solo del cloroplasto y las crestas, de la mitocondria.", "Ambos tienen doble membrana, ADN circular y ribosomas 70S."], "ADN circular y ribosomas 70S");
  X("c12", 2, "El esqueleto de un flagelo eucariota tiene 9 dobletes periféricos más 2 microtúbulos centrales. ¿Cuántos microtúbulos son en total?", "Microtúbulos =", 20, "microtúbulos", ["9 dobletes · 2 = 18.", "18 + 2 centrales = 20."], "20 microtúbulos");
  X("c13", 2, "Un centriolo tiene 9 tripletes de microtúbulos. ¿Cuántos microtúbulos hay en un diplosoma (dos centriolos)?", "Microtúbulos =", 54, "microtúbulos", ["Un centriolo: 9 · 3 = 27.", "Dos: 2 · 27 = 54."], "54 microtúbulos");
  O("c14", 2, "Ordena los filamentos del citoesqueleto de menor a mayor diámetro.", ["Microfilamentos de actina, intermedios, microtúbulos", "Microtúbulos, intermedios, microfilamentos", "Intermedios, microtúbulos, microfilamentos", "Microtúbulos, microfilamentos, intermedios"], 0, ["Actina ≈ 7 nm; intermedios 8–12 nm; microtúbulos 25 nm."], "Actina (7 nm) < intermedios (≈ 10 nm) < microtúbulos (25 nm)");
  X("c15", 2, "El ADN mitocondrial humano tiene 37 genes: 13 de proteínas, 2 de ARN ribosómico y el resto de ARN de transferencia. ¿Cuántos genes de ARNt son?", "Genes de ARNt =", 22, "genes", ["37 − 13 − 2 = 22."], "22 genes");
  O("c16", 2, "Los ribosomas eucariotas son 80S y están formados por una subunidad grande de 60S y una pequeña de…", ["40S", "20S", "80S", "30S"], 0, ["La S (Svedberg) mide sedimentación, no es aditiva.", "60S + 40S forman el ribosoma 80S."], "40S (60 + 40 ≠ 80)");
  V("c17", 2, "La difusión facilitada necesita gasto de ATP porque usa una proteína.", false, ["Es transporte pasivo: usa proteína pero va a favor de gradiente y no gasta ATP", "Usa ATP para abrir el canal", "Va contra gradiente", "Solo se da con iones"], 0, ["El criterio de «pasivo» es el gradiente y la energía, no la proteína."]);
  X("c18", 2, "Un transportador sigue v = 100·[S]/(2 + [S]) (u. a., [S] en mM). ¿Cuánto vale v con [S] = 6 mM?", "v (u. a.) =", 75, "u. a.", ["v = 100 · 6 / (2 + 6) = 600 / 8 = 75."], "75 u. a.");

  // ---- nivel 3
  M("d1", 3, "Gráfica de transporte. Se mide la velocidad de entrada de tres sustancias al variar su concentración exterior. <b>A</b>: v = 3, 6, 15, 30 para [S] = 1, 2, 5, 10 mM. <b>B</b>: 33,3; 50; 71,4; 83,3 para esos valores. <b>C</b>: se acumula 5 veces dentro; el cianuro la detiene (no afecta a A ni a B). Identifica cada una.",
    [C("Sustancia A", ["Difusión simple", "Difusión facilitada", "Transporte activo"], 0), C("Sustancia B", ["Difusión facilitada", "Difusión simple", "Transporte activo"], 0), C("Sustancia C", ["Transporte activo", "Difusión facilitada", "Difusión simple"], 0)],
    ["A: v/[S] = 3 constante → proporcional, sin saturación → difusión simple.", "B: se satura y no depende de ATP → difusión facilitada.", "C: contra gradiente y dependiente de ATP → transporte activo."], "A simple · B facilitada · C activo");
  O("d2", 3, "Frye y Edidin fusionan una célula humana (proteínas marcadas de rojo) con una de ratón (verde). A 37 °C, en 40 minutos los colores se mezclan por toda la membrana; a 1 °C casi no. Esto demuestra que…", ["las proteínas de membrana se desplazan lateralmente, y la fluidez depende de la temperatura", "las proteínas atraviesan la bicapa de una cara a otra", "el movimiento necesita ATP", "la membrana tiene dos capas de proteínas continuas"], 0, ["Es una prueba de la fluidez del mosaico.", "El enfriamiento vuelve más rígida la bicapa y frena la difusión lateral."], "Las proteínas se mueven lateralmente (membrana fluida)");
  O("d3", 3, "En un experimento de pulso y caza con células pancreáticas, ¿en qué orden aparece la radiactividad en los orgánulos?", ["RER → Golgi → vesículas de secreción", "Golgi → RER → vesículas de secreción", "Vesículas → Golgi → RER", "Mitocondria → RER → Golgi"], 0, ["Primero donde se sintetiza (RER); luego donde madura (Golgi); por último donde se empaqueta."], "RER → Golgi → vesículas de secreción");
  O("d4", 3, "¿Cuál de estos datos NO apoya la teoría endosimbiótica?", ["Las mitocondrias tienen una sola membrana y ribosomas 80S", "Tienen ADN circular sin histonas", "Se reproducen por fisión binaria", "Sus ribosomas son 70S y sensibles a antibióticos bacterianos"], 0, ["Tienen doble membrana y ribosomas 70S.", "Los otros tres datos son pruebas clásicas."], "Es falso que tengan una sola membrana y ribosomas 80S");
  X("d5", 3, "Difusión simple: v = 3·[S]. Facilitada: v = 100·[S]/(2 + [S]). ¿A qué concentración [S] (mM) tendrían la misma velocidad?", "[S] (mM) =", 31.33, "mM", ["3 · (2 + S) = 100 → 2 + S = 33,33.", "S = 31,33 mM. Por debajo, gana la facilitada; por encima, la simple (que no se satura)."], "31,3 mM", 0.01);
  M("d6", 3, "Una célula cúbica duplica su lado (de L a 2L). Indica por cuánto se multiplica su superficie, su volumen y su relación S/V.",
    [{ tipo: "num", etiqueta: "Superficie ×", valor: 4, unidad: "" }, { tipo: "num", etiqueta: "Volumen ×", valor: 8, unidad: "" }, { tipo: "num", etiqueta: "S/V ×", valor: 0.5, unidad: "" }],
    ["Superficie 6L²: (2L)² = 4L², ×4.", "Volumen L³: (2L)³ = 8L³, ×8.", "S/V se multiplica por 4/8 = 0,5."], "×4 · ×8 · ×0,5");
  X("d7", 3, "Una bomba Na⁺/K⁺ hace 150 ciclos por segundo. ¿Cuántos iones Na⁺ expulsa en 1 minuto?", "Na⁺ en 1 min =", 27000, "iones", ["150 ciclos/s · 60 s = 9000 ciclos.", "Cada ciclo expulsa 3 Na⁺: 27 000."], "27 000 Na⁺ (y se meten 18 000 K⁺)");
  R("d8", "Describe la estructura de la membrana plasmática según el modelo de mosaico fluido y explica de qué depende su fluidez. (Pregunta tipo PAU)", [
    { t: "Bicapa de fosfolípidos: cabezas polares fuera, colas apolares dentro", p: 0.5 },
    { t: "Proteínas integrales y periféricas incrustadas o adosadas: el «mosaico»", p: 0.5 },
    { t: "Colesterol (animales) y glucolípidos/glucoproteínas en la cara externa (glucocálix)", p: 0.4 },
    { t: "Fluidez: movimiento lateral; depende de la temperatura, de los ácidos grasos insaturados y del colesterol", p: 0.4 },
    { t: "Autores y fecha (Singer y Nicolson, 1972) o prueba (Frye–Edidin)", p: 0.2 }], ["Bicapa.", "Proteínas.", "Colesterol y glucocálix.", "Fluidez.", "Autores."], "Bicapa + mosaico de proteínas + fluidez");
  R("d9", "Compara una célula procariota, una eucariota animal y una eucariota vegetal con cuatro diferencias. (Pregunta tipo PAU)", [
    { t: "ADN: circular en el nucleoide (procariota) frente a lineal dentro de un núcleo (eucariotas)", p: 0.5 },
    { t: "Orgánulos con membrana: solo en eucariotas; ribosomas 70S frente a 80S", p: 0.5 },
    { t: "Pared: peptidoglucano (bacterias), celulosa (vegetal), ausente en la animal", p: 0.4 },
    { t: "Cloroplastos y vacuola central solo en la vegetal; centriolos y lisosomas en la animal", p: 0.4 },
    { t: "Ejemplos de cada una", p: 0.2 }], ["ADN.", "Orgánulos y ribosomas.", "Pared.", "Rasgos exclusivos."], "ADN, orgánulos, pared, cloroplastos/vacuola");
  R("d10", "Explica la ruta que sigue una proteína de secreción desde su síntesis hasta salir de la célula. (Pregunta tipo PAU)", [
    { t: "Síntesis en un ribosoma unido al RER; entra en la luz del retículo", p: 0.4 },
    { t: "Vesícula de transporte hacia la cara cis del Golgi", p: 0.4 },
    { t: "En el Golgi se modifica (glicosilación), se clasifica y se empaqueta", p: 0.4 },
    { t: "Sale por la cara trans en una vesícula de secreción", p: 0.4 },
    { t: "Exocitosis: fusión con la membrana plasmática y liberación al exterior", p: 0.4 }], ["RER.", "Vesícula.", "Golgi.", "Vesícula de secreción.", "Exocitosis."], "RER → Golgi → vesícula → exocitosis");
  R("d11", "Explica las diferencias entre transporte pasivo, transporte activo y transporte en masa, con un ejemplo de cada uno. (Pregunta tipo PAU)", [
    { t: "Pasivo: a favor del gradiente, sin ATP (difusión simple, facilitada, ósmosis)", p: 0.5 },
    { t: "Activo: en contra del gradiente, con ATP y proteína (bomba Na⁺/K⁺: 3 Na⁺ fuera, 2 K⁺ dentro)", p: 0.5 },
    { t: "En masa: vesículas (endocitosis y exocitosis) para partículas o macromoléculas", p: 0.4 },
    { t: "Distingue la facilitada (proteína, sin ATP) de la simple, y que la facilitada se satura", p: 0.4 },
    { t: "Ejemplos correctos de cada tipo", p: 0.2 }], ["Pasivo.", "Activo.", "En masa.", "Facilitada.", "Ejemplos."], "Pasivo a favor y sin ATP; activo en contra con ATP; masa con vesículas");
  R("d12", "Enuncia la teoría endosimbiótica y cita tres pruebas que la apoyan. (Pregunta tipo PAU)", [
    { t: "Mitocondrias y cloroplastos proceden de bacterias englobadas por una célula mayor (Margulis, 1967)", p: 0.5 },
    { t: "Mitocondria de una bacteria aerobia; cloroplasto de una cianobacteria", p: 0.4 },
    { t: "Tres pruebas: doble membrana, ADN circular propio, ribosomas 70S, fisión binaria", p: 0.8 },
    { t: "Muchos genes pasaron al núcleo: ya no viven solos", p: 0.3 }], ["Enunciado.", "Orígenes.", "Pruebas.", "Genes al núcleo."], "Bacterias englobadas: doble membrana, ADN circular, ribosomas 70S");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Procariota frente a eucariota", ancha: true,
      tabla: { cab: ["", "Procariota", "Eucariota"], filas: [
        ["ADN", "circular, nucleoide", "lineal, en el núcleo"],
        ["Orgánulos con membrana", "no", "sí"],
        ["Ribosomas", "70S", "80S"],
        ["División", "fisión binaria", "mitosis / meiosis"]
      ] } },
    { titulo: "Animal frente a vegetal", ancha: true,
      tabla: { cab: ["", "Animal", "Vegetal"], filas: [
        ["Pared", "no", "celulosa"],
        ["Cloroplastos", "no", "sí"],
        ["Vacuola", "pequeñas", "central grande"],
        ["Centriolos", "sí", "no (plantas con flor)"]
      ] } },
    { titulo: "Tipos de transporte", ancha: true,
      tabla: { cab: ["Tipo", "Gradiente", "Proteína", "ATP"], filas: [
        ["difusión simple", "a favor", "no", "no"],
        ["difusión facilitada", "a favor", "sí", "no"],
        ["transporte activo", "en contra", "sí", "sí"],
        ["en masa", "—", "vesículas", "sí"]
      ] } },
    { titulo: "Ruta de una proteína de secreción",
      pasos: ["Se sintetiza en el RER.", "Vesícula de transporte → Golgi (cis).", "Maduración y empaquetado.", "Vesícula de secreción (trans).", "Exocitosis."],
      nota: "Palade (Nobel 1974): pulso y caza con aminoácidos radiactivos." },
    { titulo: "Citoesqueleto", ancha: true,
      tabla: { cab: ["Filamento", "Proteína", "Diámetro"], filas: [
        ["microfilamentos", "actina", "≈ 7 nm"],
        ["intermedios", "queratina…", "≈ 10 nm"],
        ["microtúbulos", "tubulina", "25 nm"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Las bacterias no tienen ribosomas", bien: "Tienen ribosomas 70S", por: "Sin ribosomas no fabricarían proteínas." },
        { mal: "La difusión facilitada gasta ATP", bien: "Es pasiva: usa proteína, sin ATP", por: "Va a favor del gradiente." },
        { mal: "La membrana es rígida y las proteínas no se mueven", bien: "Es fluida (mosaico fluido)", por: "Se mueven lateralmente (Frye–Edidin)." },
        { mal: "El núcleo procede de una endosimbiosis", bien: "Solo mitocondrias y cloroplastos", por: "Tienen doble membrana, ADN y ribosomas 70S." }
      ] }
  ];

  B.registrar("bio2", "t6", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio6a.secciones,
    nuevas: B.parte.bio6a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
