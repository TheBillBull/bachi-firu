/* ============================================================
   Biología II · ampliaciones · Tema 8 (parte B): Catabolismo: la respiración celular
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t8.py.
   Criterio principal: 30/32 ATP (2,5 por NADH, 1,5 por FADH₂); se acepta y se explica 36/38 (3 y 2).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>catabolismo</b> libera energía rompiendo moléculas; la guarda en <b>ATP</b>, y los electrones los llevan <b>NAD⁺ y FAD</b> (que se reducen a NADH y FADH₂).",
    "La glucosa pasa por <b>glucólisis</b> (citoplasma, 2 ATP netos y 2 NADH), <b>descarboxilación oxidativa</b> y <b>ciclo de Krebs</b> (matriz) y <b>cadena respiratoria</b> (membrana interna).",
    "La cadena bombea H⁺ y crea un gradiente; la <b>ATP sintasa</b> lo aprovecha (<b>quimiosmosis</b>). El <b>O₂</b> es el aceptor final de electrones.",
    "Balance: <b>30–32 ATP</b> por glucosa (criterio actual) o <b>36–38</b> (criterio clásico); la fermentación solo da <b>2 ATP</b>; el palmitato da <b>106</b> (o 129)."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Catabolismo: la respiración celular",
    autores: [
      { n: "Qué estudia", f: "cómo la célula obtiene ATP al oxidar la glucosa y otros nutrientes", l: "glucólisis · Krebs · cadena · fermentación" },
      { n: "Pasteur", f: "1857", l: "la fermentación láctica la hacen microorganismos" },
      { n: "Krebs", f: "1937", l: "describe el ciclo del ácido cítrico" },
      { n: "Mitchell", f: "1961", l: "propone la teoría quimiosmótica" }
    ],
    obras: ["ATP", "NAD⁺ y FAD", "Glucólisis", "Ciclo de Krebs", "Cadena respiratoria", "Fermentación"],
    bloques: [
      { t: "Metabolismo y ATP", frases: ["Catabolismo: rompe y libera energía; anabolismo: construye y consume.", "ATP + H₂O ⇌ ADP + Pᵢ + energía (≈ 30,5 kJ/mol).", "NAD⁺ y FAD transportan electrones e hidrógenos."],
        tabla: { cab: ["Catabolismo", "Anabolismo"], filas: [["rompe, libera energía", "construye, gasta energía"], ["respiración, fermentación", "fotosíntesis, síntesis de proteínas"]] } },
      { t: "Glucólisis", frases: ["En el <b>citoplasma</b>, sin O₂.", "1 glucosa (6 C) → 2 piruvato (3 C).", "Gasta 2 ATP, forma 4: <b>+2 ATP netos y 2 NADH</b>."] },
      { t: "Mitocondria: matriz", frases: ["Descarboxilación oxidativa: piruvato → acetil-CoA + CO₂ + NADH.", "Krebs, por vuelta: 3 NADH, 1 FADH₂, 1 ATP y 2 CO₂.", "Por glucosa: 6 CO₂ en total (2 + 4)."],
        tabla: { cab: ["Por glucosa", "Cantidad"], filas: [["NADH", "10"], ["FADH₂", "2"], ["ATP directos", "4"], ["CO₂", "6"]] } },
      { t: "Cadena y quimiosmosis", frases: ["Complejos I–IV en la membrana interna bombean H⁺.", "El <b>O₂</b> acepta los electrones y forma H₂O.", "Los H⁺ vuelven por la <b>ATP sintasa</b> y se forma ATP."] },
      { t: "Balance energético", frases: ["NADH ≈ 2,5 ATP y FADH₂ ≈ 1,5 (criterio actual).", "Los libros clásicos usan 3 y 2.", "Cadena y ATP sintasa dan la mayor parte del ATP."],
        tabla: { cab: ["Criterio", "ATP por glucosa"], filas: [["actual (2,5 y 1,5)", "30–32"], ["clásico (3 y 2)", "36–38"], ["fermentación", "2"]] } },
      { t: "Sin O₂ y con grasas", frases: ["Fermentación: regenera NAD⁺; solo 2 ATP.", "Láctica: lactato; alcohólica: etanol + CO₂.", "β-oxidación: cada vuelta quita 2 C (acetil-CoA), 1 NADH y 1 FADH₂."] }
    ],
    resumen: [
      "La glucosa se <b>oxida por completo</b> a 6 CO₂ y el O₂ recoge los electrones al final.",
      "El grueso del ATP sale de la <b>fosforilación oxidativa</b> (cadena + ATP sintasa).",
      "Sin O₂ solo queda la glucólisis y la <b>fermentación</b> para regenerar NAD⁺."
    ],
    conecta: [
      { con: "Biología T6:", rel: "la mitocondria (matriz, crestas) y el transporte activo, que gasta ATP." },
      { con: "Biología T9:", rel: "la fotosíntesis es la ruta anabólica opuesta: fabrica glucosa y O₂." },
      { con: "Biología T3 y T4:", rel: "grasas (β-oxidación) y enzimas (cada paso lleva su enzima)." },
      { con: "Química II T8:", rel: "oxidación-reducción: el NAD⁺ se reduce, la glucosa se oxida." }
    ],
    claves: [
      ["ATP", "nucleótido de adenina, ribosa y 3 fosfatos; moneda de energía de la célula"],
      ["NAD⁺ / FAD", "coenzimas que transportan electrones e hidrógenos al reducirse"],
      ["Glucólisis", "glucosa → 2 piruvato en el citoplasma; +2 ATP y 2 NADH"],
      ["Acetil-CoA", "unidad de 2 C que entra en el ciclo de Krebs"],
      ["Ciclo de Krebs", "ruta cíclica de la matriz que libera CO₂ y carga NADH y FADH₂"],
      ["Cadena respiratoria", "complejos de la membrana interna que pasan electrones al O₂"],
      ["Quimiosmosis", "síntesis de ATP gracias al gradiente de H⁺ (Mitchell, 1961)"],
      ["ATP sintasa", "complejo por el que vuelven los H⁺ y que une ADP y Pᵢ"],
      ["Fermentación", "oxidación incompleta sin O₂ que regenera NAD⁺; 2 ATP por glucosa"],
      ["β-oxidación", "degradación del ácido graso en acetil-CoA, NADH y FADH₂"]
    ],
    cita: { txt: "Con oxígeno, la misma glucosa da unas 16 veces más ATP que sin él.", autor: "Dato para recordar", obra: "32 ATP frente a 2 ATP por glucosa (criterio 30/32)" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    coenzimas: {
      titulo: "Coenzimas y moléculas energéticas",
      consigna: "Une cada molécula con su papel.",
      pares: [
        ["ATP", "Moneda de energía de la célula"],
        ["NAD⁺", "Recoge electrones e hidrógenos en la glucólisis y en Krebs"],
        ["FAD", "Se reduce a FADH₂ en un paso de Krebs y en la β-oxidación"],
        ["Coenzima A", "Transporta el grupo acetilo (acetil-CoA)"],
        ["Oxígeno", "Aceptor final de electrones"]
      ]
    },
    fermentaciones: {
      titulo: "¿Láctica, alcohólica o ambas?",
      consigna: "Clasifica cada afirmación.",
      categorias: ["Fermentación láctica", "Fermentación alcohólica", "Las dos"],
      items: [
        { t: "Produce lactato", c: 0 }, { t: "Se hace en el músculo con poco O₂", c: 0 }, { t: "Se usa para el yogur", c: 0 },
        { t: "Produce etanol y CO₂", c: 1 }, { t: "La hacen las levaduras", c: 1 }, { t: "Hace subir la masa del pan", c: 1 },
        { t: "Rinde 2 ATP por glucosa", c: 2 }, { t: "Regenera NAD⁺", c: 2 }, { t: "Ocurre en el citoplasma", c: 2 }
      ]
    },
    fuentes: {
      titulo: "¿Dónde entra cada combustible?",
      consigna: "Indica en qué punto de la respiración entra cada sustancia.",
      categorias: ["Glucólisis", "Acetil-CoA", "Ciclo de Krebs"],
      items: [
        { t: "Glucosa", c: 0 }, { t: "Fructosa (tras fosforilarse)", c: 0 },
        { t: "Ácido graso (tras la β-oxidación)", c: 1 }, { t: "Piruvato (tras descarboxilarse)", c: 1 },
        { t: "Oxalacetato", c: 2 }, { t: "Aminoácidos desaminados (algunos esqueletos)", c: 2 }
      ]
    },
    ordenglucolisis: {
      titulo: "La glucólisis, en orden",
      consigna: "Ordena los pasos principales desde la glucosa hasta el piruvato.",
      items: [
        { t: "La glucosa recibe un fosfato (gasta 1 ATP)" },
        { t: "Se forma fructosa-1,6-bisfosfato (gasta 1 ATP más)" },
        { t: "Se rompe en dos moléculas de 3 C (G3P)" },
        { t: "Cada G3P se oxida: se forma NADH" },
        { t: "Se forman 4 ATP en total" },
        { t: "Se obtienen 2 piruvato" }
      ]
    },
    ordencadena: {
      titulo: "El camino de los electrones",
      consigna: "Ordena el recorrido de los electrones del NADH hasta el oxígeno.",
      items: [
        { t: "NADH cede electrones al complejo I" },
        { t: "Ubiquinona (coenzima Q)" },
        { t: "Complejo III" },
        { t: "Citocromo c" },
        { t: "Complejo IV" },
        { t: "Oxígeno: se forma agua" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 8",
      preguntas: [
        { q: "¿Dónde ocurre la glucólisis?", op: ["En el citoplasma", "En la matriz mitocondrial", "En las crestas mitocondriales", "En el núcleo"], ok: 0, porque: "Es la única etapa que no necesita orgánulos." },
        { q: "El balance neto de la glucólisis es…", op: ["2 ATP y 2 NADH", "4 ATP y 2 NADH", "2 ATP y 10 NADH", "36 ATP"], ok: 0, porque: "Gasta 2 ATP y forma 4: la ganancia neta es de 2." },
        { q: "La descarboxilación oxidativa del piruvato produce…", op: ["acetil-CoA, CO₂ y NADH", "lactato y NAD⁺", "citrato y FADH₂", "ATP y agua"], ok: 0, porque: "El piruvato (3 C) pierde un C como CO₂ y queda un acetilo de 2 C." },
        { q: "En una vuelta del ciclo de Krebs se forman…", op: ["3 NADH, 1 FADH₂, 1 ATP y 2 CO₂", "1 NADH, 3 FADH₂ y 2 ATP", "2 NADH, 2 FADH₂ y 4 CO₂", "6 NADH y 2 FADH₂"], ok: 0, porque: "Por glucosa hay dos vueltas: 6 NADH, 2 FADH₂, 2 ATP y 4 CO₂." },
        { q: "El oxígeno en la respiración celular…", op: ["es el aceptor final de electrones", "se une a la glucosa en la glucólisis", "forma CO₂ en el ciclo de Krebs", "es el donante de electrones"], ok: 0, porque: "En el complejo IV recoge los electrones y forma agua." },
        { q: "La ATP sintasa fabrica ATP gracias a…", op: ["el flujo de H⁺ a favor del gradiente", "la hidrólisis del NADH", "el CO₂ del ciclo de Krebs", "la luz"], ok: 0, porque: "Es la quimiosmosis de Mitchell." },
        { q: "La fermentación sirve sobre todo para…", op: ["regenerar NAD⁺ y que siga la glucólisis", "producir mucho ATP", "consumir oxígeno", "oxidar el piruvato hasta CO₂"], ok: 0, porque: "Solo da los 2 ATP de la glucólisis." },
        { q: "La β-oxidación de un ácido graso produce en cada vuelta…", op: ["1 acetil-CoA, 1 NADH y 1 FADH₂", "1 glucosa", "2 ATP directos", "1 piruvato"], ok: 0, porque: "Cada vuelta recorta 2 C y da un acetil-CoA." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la glucólisis es FALSA?", op: ["Necesita oxígeno y ocurre en la mitocondria", "Ocurre en el citoplasma", "Tiene un balance neto de 2 ATP", "Forma 2 piruvato por glucosa"], ok: 0, porque: "No necesita oxígeno y ocurre en el citoplasma." },
        { q: "¿Cuál de estas afirmaciones sobre el ciclo de Krebs es FALSA?", op: ["Consume directamente el oxígeno y forma agua", "Ocurre en la matriz mitocondrial", "Libera CO₂", "Forma NADH y FADH₂"], ok: 0, porque: "El oxígeno solo interviene al final de la cadena respiratoria." },
        { q: "¿Cuál de estas afirmaciones sobre la cadena respiratoria es FALSA?", op: ["El complejo II bombea tantos H⁺ como el I", "El oxígeno es el aceptor final", "Está en la membrana mitocondrial interna", "Crea un gradiente de H⁺"], ok: 0, porque: "El complejo II no bombea H⁺." },
        { q: "¿Cuál de estas afirmaciones sobre la fermentación es FALSA?", op: ["Produce mucho más ATP que la respiración", "Regenera NAD⁺", "Ocurre en el citoplasma", "La alcohólica libera CO₂"], ok: 0, porque: "Solo da 2 ATP por glucosa." },
        { q: "¿Cuál de estas afirmaciones sobre la fermentación láctica es FALSA?", op: ["Libera CO₂", "Produce lactato", "La hace el músculo con poco O₂", "Se usa para elaborar yogur"], ok: 0, porque: "La láctica no libera CO₂; la alcohólica sí." },
        { q: "¿Cuál de estas afirmaciones sobre el balance energético es FALSA?", op: ["Cada glucosa produce siempre exactamente 38 ATP", "Hay dos criterios: 30/32 y 36/38", "La lanzadera glicerol-fosfato da 2 ATP menos", "La mayor parte del ATP sale de la fosforilación oxidativa"], ok: 0, porque: "Depende del criterio y de la lanzadera." },
        { q: "¿Cuál de estas afirmaciones sobre los coenzimas es FALSA?", op: ["El NADH es la forma oxidada", "El NAD⁺ se reduce a NADH", "El FAD se reduce a FADH₂", "Transportan electrones e hidrógenos"], ok: 0, porque: "El NADH es la forma reducida; el NAD⁺, la oxidada." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: respiración celular",
      cartas: [
        { a: "Catabolismo y anabolismo", b: "Catabolismo: rompe y libera energía. Anabolismo: construye y consume energía." },
        { a: "ATP", b: "Adenina + ribosa + 3 fosfatos. ATP + H₂O ⇌ ADP + Pᵢ + energía (≈ 30,5 kJ/mol)." },
        { a: "NAD⁺ y FAD", b: "Coenzimas que transportan electrones e hidrógenos: NAD⁺ → NADH y FAD → FADH₂." },
        { a: "Glucólisis", b: "Citoplasma, sin O₂. Glucosa → 2 piruvato. Gasta 2 ATP, forma 4 (neto 2) y 2 NADH." },
        { a: "Descarboxilación oxidativa", b: "Matriz. Piruvato + NAD⁺ + CoA → acetil-CoA + CO₂ + NADH." },
        { a: "Ciclo de Krebs (por vuelta)", b: "Matriz. 3 NADH, 1 FADH₂, 1 ATP (GTP) y 2 CO₂. Dos vueltas por glucosa." },
        { a: "Totales antes de la cadena", b: "Por glucosa: 10 NADH, 2 FADH₂, 4 ATP y 6 CO₂." },
        { a: "Cadena respiratoria", b: "Membrana mitocondrial interna. Electrones al O₂ (agua) y bombeo de H⁺." },
        { a: "Quimiosmosis", b: "Mitchell, 1961: el gradiente de H⁺ mueve la ATP sintasa y forma ATP." },
        { a: "H⁺ y ATP por coenzima", b: "NADH: 10 H⁺ → 2,5 ATP. FADH₂: 6 H⁺ → 1,5 ATP (4 H⁺ por ATP)." },
        { a: "Balance de ATP por glucosa", b: "30–32 (criterio actual) o 36–38 (clásico); depende de la lanzadera." },
        { a: "Fermentación láctica", b: "Piruvato + NADH → lactato + NAD⁺. Bacterias lácticas y músculo. 2 ATP." },
        { a: "Fermentación alcohólica", b: "Piruvato → etanol + CO₂. Levaduras (vino, cerveza, pan). 2 ATP." },
        { a: "β-oxidación", b: "Matriz. Cada vuelta: −2 C (acetil-CoA), 1 NADH y 1 FADH₂. Activación: −2 ATP." },
        { a: "Palmitato (16 C)", b: "8 acetil-CoA, 7 vueltas, 31 NADH, 15 FADH₂ y 8 ATP: 106 ATP (129 con 3 y 2)." },
        { a: "Desacoplante", b: "Disipa el gradiente de H⁺: más O₂, nada de ATP y calor (grasa parda)." }
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
  O("b1", 1, "¿Dónde ocurre la glucólisis?", ["En el citoplasma", "En la matriz mitocondrial", "En la membrana mitocondrial interna", "En el núcleo"], 0, ["Es la etapa que no necesita orgánulos."], "En el citoplasma");
  O("b2", 1, "¿Qué papel tiene el oxígeno en la respiración aerobia?", ["Aceptor final de electrones", "Donante de electrones", "Sustrato de la glucólisis", "Coenzima de Krebs"], 0, ["En el complejo IV recoge los electrones y forma agua."], "Aceptor final de electrones");
  O("b3", 1, "¿Cuál de estas moléculas es un coenzima que transporta electrones e hidrógenos?", ["NAD⁺", "Piruvato", "ATP sintasa", "Glucosa"], 0, ["El NAD⁺ se reduce a NADH al recoger electrones e hidrógenos."], "NAD⁺");
  V("b4", 1, "El catabolismo consume energía y construye moléculas complejas.", false, ["Libera energía al romper moléculas complejas; el que construye es el anabolismo", "Es el proceso de la fotosíntesis", "Solo ocurre en plantas", "No necesita enzimas"], 0, ["Catabolismo: rompe y libera energía."]);
  O("b5", 1, "El ciclo de Krebs ocurre en…", ["la matriz mitocondrial", "el citoplasma", "el retículo endoplasmático", "los cloroplastos"], 0, ["Es una ruta de la matriz de la mitocondria."], "La matriz mitocondrial");
  O("b6", 1, "La cadena respiratoria está en…", ["la membrana mitocondrial interna", "la membrana externa", "el citoplasma", "el lisosoma"], 0, ["Las crestas contienen los complejos y la ATP sintasa."], "La membrana mitocondrial interna");
  T("b7", 1, "Al final de la glucólisis, la glucosa se ha convertido en dos moléculas de…", "Molécula", ["piruvato", "ácido pirúvico"], ["Cada glucosa (6 C) da 2 piruvato (3 C)."], "Piruvato");
  X("b8", 1, "¿Cuántos ATP netos gana la célula en la glucólisis de una molécula de glucosa?", "ATP netos =", 2, "ATP", ["Se gastan 2 y se forman 4.", "Ganancia neta: 4 − 2 = 2."], "2 ATP");
  X("b9", 1, "¿Cuántas moléculas de NADH se forman en la glucólisis de una glucosa?", "NADH =", 2, "NADH", ["Una por cada gliceraldehído-3-fosfato, y hay dos."], "2 NADH");
  O("b10", 1, "¿Qué organismos realizan la fermentación láctica?", ["Bacterias lácticas y células musculares con poco O₂", "Levaduras", "Plantas con luz", "Virus"], 0, ["Producen lactato a partir del piruvato."], "Bacterias lácticas y músculo");
  T("b11", 1, "Las levaduras, al fermentar, producen CO₂ y…", "Producto", ["etanol", "alcohol", "alcohol etilico", "alcohol etílico"], ["La fermentación alcohólica da etanol y CO₂."], "Etanol");
  V("b12", 1, "El ciclo de Krebs consume oxígeno directamente.", false, ["El oxígeno solo interviene al final de la cadena respiratoria", "El oxígeno es el sustrato del ciclo", "El ciclo forma agua a partir del oxígeno", "El ciclo ocurre en el citoplasma"], 0, ["Krebs libera CO₂ y carga NADH y FADH₂; el O₂ se usa en el complejo IV."]);
  X("b13", 1, "Una glucosa se oxida por completo en la respiración aerobia. ¿Cuántas moléculas de CO₂ se liberan?", "CO₂ =", 6, "CO₂", ["2 en la descarboxilación oxidativa (1 por piruvato).", "4 en el ciclo de Krebs (2 por vuelta).", "En total 6, uno por cada carbono."], "6 CO₂");
  M("b14", 1, "Une cada etapa con su lugar.",
    [C("Glucólisis", ["Citoplasma", "Matriz mitocondrial", "Membrana mitocondrial interna"], 0), C("Ciclo de Krebs", ["Matriz mitocondrial", "Citoplasma", "Membrana mitocondrial interna"], 0), C("Cadena respiratoria", ["Membrana mitocondrial interna", "Citoplasma", "Matriz mitocondrial"], 0)],
    ["La glucólisis es citoplasmática.", "Krebs, en la matriz.", "La cadena, en las crestas (membrana interna)."], "Citoplasma; matriz; membrana interna");
  O("b15", 1, "¿Qué complejo forma ATP al pasar los H⁺ a favor del gradiente?", ["ATP sintasa", "Complejo IV", "Piruvato deshidrogenasa", "Ubiquinona"], 0, ["El giro de la ATP sintasa une ADP y Pᵢ."], "ATP sintasa");
  X("b16", 1, "¿Cuántos acetil-CoA se obtienen de una molécula de glucosa?", "Acetil-CoA =", 2, "", ["La glucosa da 2 piruvato.", "Cada piruvato da 1 acetil-CoA."], "2 acetil-CoA");

  // ---- nivel 2
  X("c1", 2, "¿Cuántos ATP se forman por fosforilación a nivel de sustrato en la respiración completa de una glucosa (glucólisis + Krebs)?", "ATP directos =", 4, "ATP", ["Glucólisis: 4 formados − 2 gastados = 2 netos.", "Krebs: 1 por vuelta × 2 = 2.", "Total: 2 + 2 = 4."], "4 ATP");
  X("c2", 2, "¿Cuántos NADH se forman en total por glucosa hasta el final del ciclo de Krebs?", "NADH =", 10, "NADH", ["Glucólisis: 2.", "Descarboxilación oxidativa: 2.", "Krebs: 3 × 2 = 6.", "Total: 10."], "10 NADH");
  X("c3", 2, "Calcula los ATP totales de una glucosa con el criterio 30/32 (2,5 por NADH, 1,5 por FADH₂) y lanzadera malato-aspartato.", "ATP totales =", 32, "ATP", ["Directos: 4. NADH: 10 × 2,5 = 25. FADH₂: 2 × 1,5 = 3.", "Total: 4 + 25 + 3 = 32."], "32 ATP");
  X("c4", 2, "Calcula los ATP totales de una glucosa con el criterio clásico (3 por NADH, 2 por FADH₂) y lanzadera malato-aspartato.", "ATP totales =", 38, "ATP", ["Directos: 4. NADH: 10 × 3 = 30. FADH₂: 2 × 2 = 4.", "Total: 4 + 30 + 4 = 38."], "38 ATP");
  X("c5", 2, "En el músculo, los 2 NADH de la glucólisis entran por la lanzadera glicerol-fosfato y cuentan como FADH₂. ¿Cuántos ATP da una glucosa con el criterio 2,5 y 1,5?", "ATP totales =", 30, "ATP", ["Directos: 4. NADH mitocondriales: 8 × 2,5 = 20.", "FADH₂: 2 + 2 = 4 × 1,5 = 6.", "Total: 4 + 20 + 6 = 30."], "30 ATP");
  X("c6", 2, "Si se bombean 10 H⁺ por cada NADH y hacen falta 4 H⁺ por ATP, ¿cuántos ATP da un NADH?", "ATP por NADH =", 2.5, "ATP", ["10 / 4 = 2,5."], "2,5 ATP");
  X("c7", 2, "Si se bombean 6 H⁺ por cada FADH₂ y hacen falta 4 H⁺ por ATP, ¿cuántos ATP da un FADH₂?", "ATP por FADH₂ =", 1.5, "ATP", ["6 / 4 = 1,5."], "1,5 ATP");
  X("c8", 2, "La oxidación de 1 mol de glucosa libera 2870 kJ y cada mol de ATP guarda 30,5 kJ. ¿Qué porcentaje de la energía se guarda si se forman 32 ATP?", "Rendimiento (%) =", 34, "%", ["32 · 30,5 = 976 kJ.", "976 / 2870 = 0,340 → 34 %."], "≈ 34 %", 0.01);
  X("c9", 2, "Una levadura fermenta 3 mol de glucosa en ausencia de O₂. ¿Cuántos mol de ATP forma?", "ATP =", 6, "mol", ["2 ATP por mol de glucosa.", "3 · 2 = 6."], "6 mol de ATP");
  X("c10", 2, "¿Cuántas veces más ATP da una glucosa en respiración aerobia (32) que en fermentación (2)?", "Factor =", 16, "veces", ["32 / 2 = 16."], "16 veces");
  X("c11", 2, "En la fermentación alcohólica de 5 mol de glucosa, ¿cuántos mol de CO₂ se liberan?", "CO₂ =", 10, "mol", ["2 CO₂ por cada glucosa.", "5 · 2 = 10."], "10 mol de CO₂");
  V("c12", 2, "En la fermentación láctica se libera CO₂.", false, ["La láctica no libera CO₂: el piruvato se reduce a lactato (3 C)", "La láctica produce etanol", "La láctica necesita oxígeno", "La láctica ocurre en la mitocondria"], 0, ["El CO₂ aparece en la fermentación alcohólica (descarboxilación del piruvato)."]);
  M("c13", 2, "Une cada sustancia con su efecto en la mitocondria.",
    [C("Rotenona", ["Bloquea el complejo I", "Bloquea la ATP sintasa", "Disipa el gradiente de H⁺", "Bloquea el complejo IV"], 0), C("Cianuro", ["Bloquea el complejo IV", "Bloquea el complejo I", "Disipa el gradiente de H⁺", "Bloquea la ATP sintasa"], 0), C("Oligomicina", ["Bloquea la ATP sintasa", "Bloquea el complejo IV", "Bloquea el complejo I", "Disipa el gradiente de H⁺"], 0), C("DNP (desacoplante)", ["Disipa el gradiente de H⁺", "Bloquea la ATP sintasa", "Bloquea el complejo I", "Bloquea el complejo IV"], 0)],
    ["La rotenona actúa en I; el cianuro, en IV; la oligomicina, en la ATP sintasa; el DNP hace pasar H⁺ sin ATP sintasa."], "Rotenona → I; cianuro → IV; oligomicina → ATP sintasa; DNP → disipa el gradiente");
  O("c14", 2, "A unas mitocondrias aisladas que respiran con ADP se les añade un desacoplante. ¿Qué se observa?", ["Más consumo de O₂ y casi nada de ATP", "Menos consumo de O₂ y más ATP", "Se para el consumo de O₂", "El gradiente de H⁺ aumenta"], 0, ["El gradiente se disipa y ya no frena la cadena: se consume más O₂.", "Los H⁺ no pasan por la ATP sintasa, así que no se forma ATP; la energía sale como calor."], "Más O₂ y casi nada de ATP");
  X("c15", 2, "Una célula respira por completo 3 mol de glucosa. ¿Cuántos mol de O₂ consume?", "O₂ =", 18, "mol", ["C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O.", "3 · 6 = 18 mol."], "18 mol de O₂");
  M("c16", 2, "Une cada proceso con la etapa en que ocurre.",
    [C("Se forma agua con el O₂", ["Cadena respiratoria", "Ciclo de Krebs", "Glucólisis"], 0), C("Se forma acetil-CoA y sale CO₂ (sin ciclo)", ["Descarboxilación oxidativa", "Cadena respiratoria", "Glucólisis"], 0), C("Se forma FADH₂ en la matriz", ["Ciclo de Krebs", "Cadena respiratoria", "Glucólisis"], 0)],
    ["El agua se forma en el complejo IV.", "La piruvato deshidrogenasa descarboxila y forma acetil-CoA.", "El succinato pasa a fumarato con FAD en Krebs."], "Cadena; descarboxilación oxidativa; Krebs");

  // ---- nivel 3
  X("d1", 3, "Calcula los ATP que da la oxidación completa de una molécula de ácido palmítico (16 C) con el criterio 30/32 (2,5 y 1,5), restando la activación (2 ATP).", "ATP totales =", 106, "ATP", ["Acetil-CoA: 8; vueltas: 7.", "NADH: 7 + 8 · 3 = 31. FADH₂: 7 + 8 = 15. ATP directos: 8.", "31 · 2,5 + 15 · 1,5 + 8 − 2 = 77,5 + 22,5 + 8 − 2 = 106."], "106 ATP");
  X("d2", 3, "Calcula los ATP del ácido palmítico con el criterio clásico (3 por NADH, 2 por FADH₂), restando 2 de la activación.", "ATP totales =", 129, "ATP", ["31 · 3 + 15 · 2 + 8 − 2 = 93 + 30 + 8 − 2 = 129."], "129 ATP");
  X("d3", 3, "Calcula los ATP del ácido esteárico (18 C) con el criterio 30/32 (2,5 y 1,5), restando la activación.", "ATP totales =", 120, "ATP", ["Acetil-CoA: 9; vueltas: 8.", "NADH: 8 + 27 = 35. FADH₂: 8 + 9 = 17. ATP directos: 9.", "35 · 2,5 + 17 · 1,5 + 9 − 2 = 87,5 + 25,5 + 9 − 2 = 120."], "120 ATP");
  X("d4", 3, "¿Cuántas vueltas de β-oxidación necesita un ácido graso saturado de 12 C (ácido láurico)?", "Vueltas =", 5, "", ["Acetil-CoA: 12 / 2 = 6.", "Vueltas: 6 − 1 = 5 (la última rompe 4 C en 2 acetil-CoA)."], "5 vueltas");
  X("d5", 3, "¿Cuántas moléculas de NADH + FADH₂ se forman solo en las vueltas de β-oxidación de un ácido graso de 14 C (sin contar Krebs)?", "NADH + FADH₂ =", 12, "", ["Vueltas: 14 / 2 − 1 = 6.", "Cada vuelta da 1 NADH y 1 FADH₂: 2 · 6 = 12."], "12 coenzimas reducidos");
  X("d6", 3, "Calcula el cociente respiratorio (CO₂ producido / O₂ consumido) del ácido palmítico: C₁₆H₃₂O₂ + 23 O₂ → 16 CO₂ + 16 H₂O.", "CR =", 0.70, "", ["16 / 23 = 0,696."], "CR ≈ 0,70", 0.01);
  O("d7", 3, "Comparando por átomo de carbono: ácido palmítico (106 ATP, 16 C) y glucosa (32 ATP, 6 C) con el criterio 30/32…", ["La grasa rinde más ATP por carbono (≈ 6,6 frente a ≈ 5,3)", "La glucosa rinde más ATP por carbono", "Rinden lo mismo por carbono", "La grasa no da ATP"], 0, ["106 / 16 = 6,6 ATP por C.", "32 / 6 = 5,3 ATP por C.", "La grasa está más reducida (más H por C)."], "La grasa rinde más por carbono");
  R("d8", "Explica la glucólisis: dónde ocurre, sus fases y su balance. (Pregunta tipo PAU)", [
    { t: "Localización: citoplasma, sin O₂", p: 0.4 },
    { t: "Fase de inversión: gasta 2 ATP y rompe la glucosa en 2 moléculas de 3 C", p: 0.5 },
    { t: "Fase de obtención: se forman 4 ATP y 2 NADH", p: 0.5 },
    { t: "Balance neto: 2 piruvato, 2 ATP y 2 NADH", p: 0.5 },
    { t: "Destino del piruvato con y sin O₂", p: 0.1 }], ["Citoplasma.", "Dos fases.", "Balance."], "Citoplasma: 1 glucosa → 2 piruvato, +2 ATP, +2 NADH");
  R("d9", "Describe la descarboxilación oxidativa y el ciclo de Krebs: lugar, qué entra, qué sale y balance por glucosa. (Pregunta tipo PAU)", [
    { t: "Matriz mitocondrial", p: 0.3 },
    { t: "Descarboxilación oxidativa: piruvato → acetil-CoA + CO₂ + NADH", p: 0.5 },
    { t: "Krebs: acetil-CoA + oxalacetato → citrato; se regenera el oxalacetato", p: 0.5 },
    { t: "Por vuelta: 3 NADH, 1 FADH₂, 1 ATP y 2 CO₂", p: 0.5 },
    { t: "Por glucosa (2 vueltas): 6 CO₂ en total con la descarboxilación", p: 0.2 }], ["Matriz.", "Descarboxilación.", "Krebs.", "Balance."], "Matriz: 6 NADH, 2 FADH₂, 2 ATP, 4 CO₂ en Krebs");
  R("d10", "Explica la cadena respiratoria y la fosforilación oxidativa (quimiosmosis). (Pregunta tipo PAU)", [
    { t: "Membrana mitocondrial interna; complejos y transportadores", p: 0.4 },
    { t: "Electrones del NADH y FADH₂ pasan hasta el O₂ (aceptor final, forma agua)", p: 0.5 },
    { t: "Bombeo de H⁺ y gradiente electroquímico", p: 0.5 },
    { t: "Los H⁺ vuelven por la ATP sintasa y se forma ATP (Mitchell)", p: 0.5 },
    { t: "Cuántos ATP por NADH y FADH₂ (2,5 y 1,5 o 3 y 2)", p: 0.1 }], ["Lugar.", "Electrones.", "Gradiente.", "ATP sintasa."], "Cadena → gradiente de H⁺ → ATP sintasa");
  R("d11", "Compara la respiración aerobia con la fermentación (láctica y alcohólica): aceptor final, productos y rendimiento. (Pregunta tipo PAU)", [
    { t: "Aceptor final: O₂ frente a una molécula orgánica", p: 0.4 },
    { t: "Productos: CO₂ y H₂O frente a lactato o etanol + CO₂", p: 0.5 },
    { t: "Rendimiento: 30–38 ATP frente a 2 ATP", p: 0.5 },
    { t: "Papel de la fermentación: regenerar NAD⁺ para la glucólisis", p: 0.4 },
    { t: "Ejemplos: músculo, yogur, vino, pan", p: 0.2 }], ["Aceptor.", "Productos.", "ATP.", "NAD⁺."], "Aerobia: 30–38 ATP; fermentación: 2 ATP");
  R("d12", "A mitocondrias aisladas con piruvato + malato se les añade rotenona y el consumo de O₂ cae; si luego se añade succinato, vuelve a subir. Interpreta el experimento y di qué haría el cianuro. (Pregunta tipo PAU)", [
    { t: "Piruvato + malato dan NADH que entra por el complejo I", p: 0.4 },
    { t: "La rotenona bloquea el complejo I y cae el consumo de O₂", p: 0.5 },
    { t: "El succinato (FADH₂) entra por el complejo II y se salta el bloqueo", p: 0.5 },
    { t: "El cianuro bloquea el complejo IV: el consumo de O₂ cae a cero en cualquier caso", p: 0.4 },
    { t: "Relaciona consumo de O₂ con el paso de electrones al aceptor final", p: 0.2 }], ["Complejo I.", "Rotenona.", "Succinato.", "Cianuro."], "I bloqueado; II lo evita; IV bloqueado lo detiene todo");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Las cuatro etapas de la respiración", ancha: true,
      tabla: { cab: ["Etapa", "Lugar", "Resultado por glucosa"], filas: [
        ["Glucólisis", "citoplasma", "2 piruvato, +2 ATP, 2 NADH"],
        ["Descarboxilación oxidativa", "matriz", "2 acetil-CoA, 2 CO₂, 2 NADH"],
        ["Ciclo de Krebs", "matriz", "4 CO₂, 6 NADH, 2 FADH₂, 2 ATP"],
        ["Cadena respiratoria", "membrana interna", "H₂O y la mayor parte del ATP"]
      ] } },
    { titulo: "Balance de ATP por glucosa", ancha: true,
      tabla: { cab: ["Criterio", "Lanzadera malato", "Lanzadera glicerol"], filas: [
        ["actual (2,5 y 1,5)", "32", "30"],
        ["clásico (3 y 2)", "38", "36"],
        ["fermentación", "2", "2"]
      ] } },
    { titulo: "Camino de los electrones",
      pasos: ["NADH cede electrones al complejo I.", "Ubiquinona y complejo III.", "Citocromo c y complejo IV.", "El O₂ forma agua; los H⁺ vuelven por la ATP sintasa."],
      nota: "Los complejos I, III y IV bombean H⁺." },
    { titulo: "Fermentación: láctica y alcohólica", ancha: true,
      tabla: { cab: ["", "Láctica", "Alcohólica"], filas: [
        ["producto", "lactato", "etanol + CO₂"],
        ["la hacen", "bacterias lácticas, músculo", "levaduras"],
        ["ATP por glucosa", "2", "2"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "La glucólisis ocurre en la mitocondria", bien: "Ocurre en el citoplasma", por: "No necesita O₂." },
        { mal: "Krebs consume O₂ y forma agua", bien: "El O₂ solo actúa al final de la cadena", por: "Krebs forma CO₂, NADH y FADH₂." },
        { mal: "La glucólisis da 4 ATP netos", bien: "Gana 2 ATP netos (forma 4, gasta 2)", por: "Se invierten 2 ATP al inicio." },
        { mal: "La fermentación genera mucho ATP", bien: "Solo da los 2 ATP de la glucólisis", por: "Su función es regenerar NAD⁺." }
      ] }
  ];

  B.registrar("bio2", "t8", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio8a.secciones,
    nuevas: B.parte.bio8a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
