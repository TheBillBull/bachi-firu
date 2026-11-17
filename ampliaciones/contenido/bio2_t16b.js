/* ============================================================
   Biología II · ampliaciones · Tema 16 (parte B): Evolución
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t16.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "El <b>fijismo</b> defendía especies inmutables; <b>Lamarck</b> propuso uso y desuso con herencia de caracteres adquiridos (incorrecto) y <b>Darwin y Wallace</b>, la <b>selección natural</b>.",
    "La selección natural actúa sobre la <b>variabilidad</b> que aportan la <b>mutación</b> (alelos nuevos, al azar) y la <b>recombinación</b> (combinaciones nuevas).",
    "La <b>teoría sintética</b> define la evolución como el cambio de frecuencias alélicas de una <b>población</b>, por selección, deriva, flujo génico y mutación.",
    "Las pruebas (fósiles, anatomía, embriología, moleculares) coinciden: <b>homólogos</b> indican antepasado común y <b>análogos</b>, evolución convergente.",
    "<b>Hardy-Weinberg</b> (p² + 2pq + q² = 1) es el modelo sin evolución; las <b>especies</b> nuevas surgen con barreras reproductivas, y su ritmo puede ser gradual o puntuado."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Evolución",
    autores: [
      { n: "Qué estudia", f: "cómo cambian las poblaciones y surgen las especies", l: "selección · deriva · especiación" },
      { n: "Lamarck", f: "1809", l: "Filosofía zoológica" },
      { n: "Darwin y Wallace", f: "1858–1859", l: "selección natural; El origen de las especies" },
      { n: "Hardy y Weinberg", f: "1908", l: "equilibrio genético" },
      { n: "Dobzhansky", f: "1937", l: "teoría sintética" },
      { n: "Eldredge y Gould", f: "1972", l: "equilibrio puntuado" }
    ],
    obras: ["Filosofía zoológica", "El origen de las especies", "Genética y origen de las especies"],
    bloques: [
      { t: "Antes de Darwin", frases: ["<b>Fijismo:</b> las especies no cambian.", "<b>Lamarck:</b> uso y desuso y herencia de lo adquirido.", "Falla: los cambios del cuerpo no modifican el ADN de los gametos."],
        tabla: { cab: ["Lamarck", "Darwin"], filas: [["el individuo cambia", "la población cambia"], ["variación por uso", "variación ya existente"], ["se hereda lo adquirido", "se selecciona lo ya heredable"]] } },
      { t: "Selección natural", frases: ["Variabilidad, exceso de descendientes y herencia.", "Más éxito reproductivo para las variantes ventajosas.", "Evolucionan las <b>poblaciones</b>, no los individuos."] },
      { t: "Teoría sintética", frases: ["Evolución = cambio de frecuencias alélicas.", "Variabilidad: mutación (alelos nuevos) y recombinación."],
        tabla: { cab: ["Mecanismo", "Efecto"], filas: [["selección natural", "adaptación"], ["deriva genética", "azar; fuerte si N es pequeño"], ["flujo génico", "migración; iguala poblaciones"], ["mutación", "alelos nuevos"]] } },
      { t: "Pruebas", frases: ["Fósiles, biogeografía, embriología y moléculas.", "El código genético es casi universal."],
        tabla: { cab: ["Homólogos", "Análogos"], filas: [["mismo origen", "misma función"], ["distinta función", "distinto origen"], ["evolución divergente", "evolución convergente"]] } },
      { t: "Hardy-Weinberg", frases: ["p + q = 1 y p² + 2pq + q² = 1.", "Sin selección, mutación, migración ni deriva, y con apareamiento al azar.", "Sirve para calcular portadores y detectar evolución."] },
      { t: "Especiación", frases: ["Barreras reproductivas prezigóticas y postzigóticas.", "<b>Alopátrica:</b> separación geográfica; <b>simpátrica:</b> sin barrera, p. ej. poliploidía."],
        tabla: { cab: ["Gradualismo", "Equilibrio puntuado"], filas: [["cambio lento y continuo", "estasis y saltos rápidos"], ["muchas formas intermedias", "pocas formas intermedias"]] } }
    ],
    resumen: [
      "Evolucionan las <b>poblaciones</b>: cambian las frecuencias de los alelos por selección, deriva, flujo génico y mutación.",
      "La <b>selección natural</b> es la única fuerza que explica las adaptaciones; <b>Hardy-Weinberg</b> es el modelo sin evolución."
    ],
    conecta: [
      { con: "Biología T7:", rel: "meiosis y recombinación: fuente de variabilidad." },
      { con: "Biología T10–T11:", rel: "genética mendeliana y base molecular de la herencia." },
      { con: "Biología T12–T13:", rel: "código genético universal y mutaciones." },
      { con: "Biología T14–T15:", rel: "resistencia a antibióticos y evolución de microbios." },
      { con: "Química II T1:", rel: "proporciones y probabilidades (cálculos con fracciones)." }
    ],
    claves: [
      ["Fijismo", "idea de que las especies no cambian"],
      ["Selección natural", "éxito reproductivo diferencial de las variantes heredables ventajosas"],
      ["Teoría sintética", "unión de la selección natural con la genética de poblaciones"],
      ["Deriva genética", "cambio de frecuencias alélicas por azar, sobre todo en poblaciones pequeñas"],
      ["Flujo génico", "intercambio de alelos por migración entre poblaciones"],
      ["Órganos homólogos", "mismo origen evolutivo, aunque la función sea distinta"],
      ["Hardy-Weinberg", "p² + 2pq + q² = 1: frecuencias estables sin factores evolutivos"],
      ["Especiación alopátrica", "formación de especies tras una separación geográfica"],
      ["Equilibrio puntuado", "estasis larga interrumpida por cambios rápidos (Eldredge y Gould)"],
      ["Cuello de botella", "reducción brusca de la población que pierde variabilidad al azar"]
    ],
    cita: { txt: "Evolucionan las poblaciones, no los individuos.", autor: "Dato para recordar", obra: "evolución = cambio de frecuencias alélicas a lo largo de las generaciones" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    cientificos: {
      titulo: "Científico y aportación",
      consigna: "Une cada científico con su aportación.",
      pares: [
        ["Lamarck", "Uso y desuso y herencia de caracteres adquiridos"],
        ["Darwin y Wallace", "Selección natural"],
        ["Weismann", "Cortó la cola a ratones durante generaciones: no se heredan los caracteres adquiridos"],
        ["Hardy y Weinberg", "Frecuencias constantes en una población sin factores evolutivos"],
        ["Eldredge y Gould", "Equilibrio puntuado"]
      ]
    },
    ordenseleccion: {
      titulo: "La selección natural, paso a paso",
      consigna: "Ordena el razonamiento de Darwin, desde el principio.",
      items: [
        { t: "Los individuos de la población varían entre sí" },
        { t: "Nacen más descendientes de los que pueden sobrevivir" },
        { t: "Parte de la variación se hereda" },
        { t: "Los individuos con variantes ventajosas dejan más descendientes" },
        { t: "Esas variantes se hacen más frecuentes en la población" }
      ]
    },
    mecanismos: {
      titulo: "¿Qué mecanismo actúa?",
      consigna: "Clasifica cada situación según el mecanismo evolutivo que explica.",
      categorias: ["Selección natural", "Deriva genética", "Flujo génico"],
      items: [
        { t: "Polillas oscuras que pasan a ser mayoría en troncos con hollín", c: 0 },
        { t: "Bacterias resistentes que sobreviven a un antibiótico", c: 0 },
        { t: "Una epidemia deja pocos supervivientes y cambian las frecuencias al azar", c: 1 },
        { t: "Unos pocos colonos fundan una isla con los alelos que llevaban", c: 1 },
        { t: "Individuos de una población migran y se reproducen en otra", c: 2 },
        { t: "Polen de plantas de una zona llega a otra y fecunda", c: 2 }
      ]
    },
    homologia: {
      titulo: "Homólogo, análogo o vestigial",
      consigna: "Clasifica cada caso.",
      categorias: ["Órganos homólogos", "Órganos análogos", "Órgano vestigial"],
      items: [
        { t: "Brazo humano y ala de murciélago", c: 0 },
        { t: "Aleta de ballena y pata de caballo", c: 0 },
        { t: "Ala de ave y ala de insecto", c: 1 },
        { t: "Aleta de tiburón y aleta de delfín", c: 1 },
        { t: "Apéndice del ser humano", c: 2 },
        { t: "Huesos de la pelvis de una ballena", c: 2 }
      ]
    },
    quiz1: {
      titulo: "Test del tema 16",
      preguntas: [
        { q: "Según Lamarck, ¿por qué las jirafas tienen el cuello largo?", op: ["Por el uso y la herencia de lo adquirido", "Por selección natural sobre variación preexistente", "Por deriva genética", "Porque las especies no cambian"], ok: 0, porque: "Es la explicación lamarckista, hoy descartada." },
        { q: "En la selección natural de Darwin, la variación…", op: ["ya existe en la población antes de la selección", "aparece porque el individuo la necesita", "se debe al uso de los órganos", "solo la causa el ambiente"], ok: 0, porque: "El ambiente selecciona entre variantes ya presentes." },
        { q: "La mutación se diferencia de la recombinación en que…", op: ["crea alelos nuevos", "mezcla alelos existentes", "ocurre solo en la meiosis", "siempre es ventajosa"], ok: 0, porque: "La recombinación reordena alelos que ya estaban; la mutación los crea." },
        { q: "Si la frecuencia del alelo recesivo es q = 0,1, en equilibrio la frecuencia de aa es…", op: ["0,01", "0,1", "0,18", "0,81"], ok: 0, porque: "q² = 0,01 (0,18 es 2pq y 0,81, p²)." },
        { q: "¿Qué mecanismo es el único que produce adaptaciones?", op: ["La selección natural", "La deriva genética", "El flujo génico", "El azar"], ok: 0, porque: "Solo la selección favorece lo que es ventajoso; la deriva actúa al azar." },
        { q: "Un alelo se pierde o se fija por azar con más facilidad en…", op: ["una población pequeña", "una población muy grande", "una población con selección fuerte", "una población con mucha migración"], ok: 0, porque: "La deriva es más fuerte cuanto menor es N." },
        { q: "El ala de un ave y el ala de un insecto son órganos…", op: ["análogos", "homólogos", "vestigiales", "idénticos"], ok: 0, porque: "Misma función con origen distinto." },
        { q: "En la especiación alopátrica, el primer paso es…", op: ["el aislamiento geográfico", "la poliploidía", "la mutación letal", "el cruce de dos especies"], ok: 0, porque: "La barrera geográfica corta el flujo génico." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Darwin explicó el cuello largo de la jirafa por el uso y la herencia de lo adquirido", "Darwin propuso la selección natural", "Lamarck propuso el uso y desuso", "Wallace llegó a la selección natural por su cuenta"], ok: 0, porque: "Esa es la explicación de Lamarck. Darwin habló de variación y éxito reproductivo diferencial." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Las mutaciones aparecen como respuesta a las necesidades del ambiente", "Las mutaciones ocurren al azar", "La recombinación combina alelos que ya existen", "La mutación crea alelos nuevos"], ok: 0, porque: "Son al azar: el ambiente solo selecciona después." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Los órganos análogos prueban un antepasado común reciente", "Los homólogos tienen el mismo origen evolutivo", "Los análogos tienen la misma función", "Los vestigiales perdieron su función"], ok: 0, porque: "Los análogos proceden de evolución convergente; los homólogos son los que prueban parentesco." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["En Hardy-Weinberg las frecuencias alélicas cambian cada generación", "La condición exige apareamiento al azar", "Exige que no haya selección natural", "Se cumple mejor en poblaciones grandes"], ok: 0, porque: "Si se cumplen las condiciones, las frecuencias se mantienen." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["Tras un cuello de botella la población recupera enseguida toda su variabilidad", "El cuello de botella es un caso de deriva", "Reduce la variabilidad genética", "Ocurre tras una catástrofe"], ok: 0, porque: "Se pierde variabilidad al azar y tarda mucho en recuperarse (solo con mutaciones nuevas y migración)." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["La mula es una especie porque es fértil", "La mula es un híbrido de yegua y burro", "La mula es estéril", "Su esterilidad es una barrera postzigótica"], ok: 0, porque: "Es estéril, por eso no forma una especie." },
        { q: "¿Cuál de estas afirmaciones es FALSA?", op: ["El equilibrio puntuado propone que las especies cambian de un día para otro", "Propone periodos de estasis", "Los cambios rápidos duran miles de años", "Fue propuesto por Eldredge y Gould"], ok: 0, porque: "«Rápido» son miles de años, un instante en tiempo geológico." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: evolución",
      cartas: [
        { a: "Fijismo", b: "Las especies no cambian y cada una tiene su propio origen." },
        { a: "Lamarck (1809)", b: "Uso y desuso + herencia de los caracteres adquiridos. Incorrecto: el cuerpo no cambia el ADN de los gametos." },
        { a: "Selección natural", b: "Variabilidad + exceso de descendientes + herencia → éxito reproductivo diferencial." },
        { a: "Fuentes de variabilidad", b: "Mutación (alelos nuevos, al azar) y recombinación (combinaciones nuevas)." },
        { a: "Teoría sintética", b: "Selección natural + genética: la evolución es el cambio de frecuencias alélicas de una población." },
        { a: "Deriva genética", b: "Cambio al azar de frecuencias, más fuerte si N es pequeño: cuello de botella y efecto fundador." },
        { a: "Flujo génico", b: "Migración de alelos entre poblaciones." },
        { a: "Órganos homólogos", b: "Mismo origen y estructura, distinta función (brazo humano, ala de murciélago): evolución divergente." },
        { a: "Órganos análogos", b: "Misma función, distinto origen (ala de ave y de insecto): evolución convergente." },
        { a: "Órgano vestigial", b: "Reducido y sin función aparente (apéndice, huesos pélvicos de la ballena)." },
        { a: "Hardy-Weinberg", b: "p + q = 1; p² + 2pq + q² = 1. Equilibrio sin selección, mutación, migración ni deriva y con apareamiento al azar." },
        { a: "Portadores", b: "Heterocigotos Aa = 2pq. A partir de q² (la frecuencia de la enfermedad) se obtiene q." },
        { a: "Tipos de selección", b: "Direccional (un extremo), estabilizadora (intermedios), disruptiva (ambos extremos)." },
        { a: "Especiación alopátrica y simpátrica", b: "Con barrera geográfica / sin barrera (p. ej. poliploidía en plantas)." },
        { a: "Gradualismo y equilibrio puntuado", b: "Cambio lento y continuo / estasis larga con cambios rápidos (Eldredge y Gould, 1972)." }
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
  O("b1", 1, "¿Qué propuso Lamarck para explicar el cambio de las especies?", ["Uso y desuso y herencia de los caracteres adquiridos", "Selección natural sobre la variación existente", "Que las especies nunca cambian", "Que los cambios son solo por azar"], 0, ["Es su teoría de 1809.", "La selección natural es de Darwin y Wallace."], "Uso y desuso con herencia de lo adquirido");
  O("b2", 1, "¿Quién propuso, junto con Darwin, la selección natural?", ["Wallace", "Lamarck", "Mendel", "Weismann"], 0, ["Alfred Russel Wallace llegó a la misma idea de forma independiente.", "Presentaron juntos la teoría en 1858."], "Wallace");
  O("b3", 1, "El fijismo defendía que…", ["las especies no cambian con el tiempo", "las especies descienden unas de otras", "el ambiente selecciona a los más aptos", "la variación aparece por uso"], 0, ["Fijismo = especies inmutables.", "Las otras son ideas evolucionistas."], "Las especies son inmutables");
  V("b4", 1, "Según Darwin, las jirafas alargaron el cuello al estirarlo y ese cuello más largo se heredó.", false, ["Es la explicación de Lamarck; Darwin explicó el cuello por selección de la variación existente", "Es la explicación correcta", "Darwin no explicó el cuello de las jirafas", "El cuello largo no es heredable"], 0, ["Darwin: las jirafas con cuello algo más largo dejaron más descendientes."]);
  O("b5", 1, "¿Qué unidad evoluciona?", ["La población", "El individuo", "La célula", "El órgano"], 0, ["Un individuo no cambia su genotipo en la evolución.", "Cambian las frecuencias de los alelos de la población."], "La población");
  O("b6", 1, "¿Qué proceso crea alelos nuevos?", ["La mutación", "La recombinación", "La segregación independiente", "El entrecruzamiento"], 0, ["La mutación cambia el ADN y crea alelos nuevos.", "Recombinación y segregación reordenan alelos que ya existen."], "La mutación");
  O("b7", 1, "El brazo humano y el ala de un murciélago son órganos…", ["homólogos", "análogos", "vestigiales", "convergentes"], 0, ["Mismo origen y mismo esqueleto, con funciones distintas."], "Homólogos");
  O("b8", 1, "El ala de un ave y el ala de una mariposa son órganos…", ["análogos", "homólogos", "vestigiales", "con el mismo origen"], 0, ["Misma función (volar) pero origen y estructura distintos."], "Análogos");
  T("b9", 1, "Completa: el cambio de frecuencias alélicas por azar, más notable en poblaciones pequeñas, se llama…", "Mecanismo", ["deriva genética", "deriva genetica", "deriva"], ["Es el azar el que cambia las frecuencias, no la utilidad del alelo."], "Deriva genética");
  V("b10", 1, "Las mutaciones aparecen porque el organismo las necesita para adaptarse.", false, ["Aparecen al azar; el ambiente solo selecciona después", "Aparecen siempre como respuesta al ambiente", "Solo aparecen en la meiosis", "Siempre son ventajosas"], 0, ["Si fuera así, volveríamos a Lamarck.", "El antibiótico no provoca la resistencia: elimina a las bacterias sensibles."]);
  O("b11", 1, "Los huesos de la pelvis de una ballena son un ejemplo de órgano…", ["vestigial", "análogo", "homólogo de un ala", "funcional de nado"], 0, ["Son restos reducidos, sin función aparente, de antepasados con patas."], "Vestigial");
  X("b12", 1, "En una población de 100 individuos hay 36 AA, 48 Aa y 16 aa. ¿Cuál es la frecuencia del alelo a (q)?", "q =", 0.4, "", ["Hay 200 alelos.", "Alelos a = 2 · 16 + 48 = 80.", "q = 80 / 200 = 0,4."], "q = 0,4");
  X("b13", 1, "Si la frecuencia del alelo a es q = 0,3 (dos alelos), ¿cuál es la del alelo A (p)?", "p =", 0.7, "", ["p + q = 1.", "p = 1 − 0,3 = 0,7."], "p = 0,7");
  M("b14", 1, "Une cada científico con su aportación.",
    [C("Lamarck", ["Uso y desuso", "Selección natural", "Equilibrio puntuado"], 0), C("Darwin", ["Selección natural", "Uso y desuso", "Equilibrio puntuado"], 0), C("Eldredge y Gould", ["Equilibrio puntuado", "Uso y desuso", "Selección natural"], 0)],
    ["Lamarck: uso y desuso; Darwin (y Wallace): selección natural; Eldredge y Gould: equilibrio puntuado."], "Lamarck → uso y desuso; Darwin → selección natural; Eldredge y Gould → equilibrio puntuado");
  O("b15", 1, "¿Cuál de estos mecanismos es el único que explica las adaptaciones?", ["La selección natural", "La deriva genética", "El flujo génico", "La recombinación"], 0, ["La selección favorece lo ventajoso.", "La deriva actúa al azar y el flujo génico mueve alelos entre poblaciones."], "La selección natural");
  O("b16", 1, "Que el código genético sea casi universal se considera una prueba…", ["molecular de un antepasado común", "paleontológica", "de la herencia de los caracteres adquiridos", "de la ley de Hardy-Weinberg"], 0, ["Todos los seres vivos usan casi el mismo código: descienden de un antepasado común."], "Molecular");

  // ---- nivel 2
  X("c1", 2, "En una población en equilibrio de Hardy-Weinberg, q = 0,2. ¿Qué frecuencia tiene el genotipo aa?", "q² =", 0.04, "", ["f(aa) = q².", "q² = 0,2 · 0,2 = 0,04."], "0,04 (un 4 %)");
  X("c2", 2, "Con q = 0,2 (y p = 0,8), ¿qué frecuencia tienen los heterocigotos Aa?", "2pq =", 0.32, "", ["2pq = 2 · 0,8 · 0,2.", "= 0,32."], "0,32 (32 %)");
  X("c3", 2, "Una enfermedad recesiva afecta a 1 de cada 10 000 personas (equilibrio de H-W). ¿Cuánto vale q?", "q =", 0.01, "", ["q² = 1/10 000 = 0,0001.", "q = √0,0001 = 0,01."], "q = 0,01");
  X("c4", 2, "Con una incidencia de 1 de cada 2500 (fibrosis quística), calcula el porcentaje de portadores (2pq).", "Portadores (%) =", 3.92, "%", ["q² = 1/2500 = 0,0004; q = 0,02; p = 0,98.", "2pq = 2 · 0,98 · 0,02 = 0,0392."], "3,92 % (≈ 1 de cada 25 o 26 personas)", 0.01);
  X("c5", 2, "En una población de 1000 personas en equilibrio, q = 0,1. ¿Cuántos heterocigotos Aa se esperan?", "Aa esperados =", 180, "personas", ["p = 0,9.", "2pq = 2 · 0,9 · 0,1 = 0,18.", "0,18 · 1000 = 180."], "180");
  X("c6", 2, "El albinismo afecta a unas 1 de cada 20 000 personas. Calcula q (da el valor multiplicado por 1000).", "q · 1000 =", 7.07, "", ["q² = 1/20 000 = 0,00005.", "q = √0,00005 = 0,00707.", "q · 1000 = 7,07."], "q ≈ 0,00707", 0.01);
  O("c7", 2, "¿Cuál de estas condiciones NO es necesaria para que se cumpla el equilibrio de Hardy-Weinberg?", ["Que actúe la selección natural", "Que la población sea muy grande", "Que el apareamiento sea al azar", "Que no haya migración"], 0, ["Es al revés: no debe haber selección."], "Que actúe la selección natural");
  V("c8", 2, "En una población en equilibrio de Hardy-Weinberg las frecuencias de los alelos cambian en cada generación.", false, ["Si se cumplen las condiciones, se mantienen constantes", "Cambian porque hay mutaciones", "Cambian porque hay selección", "Cambian en las poblaciones grandes"], 0, ["El equilibrio significa que no hay cambio."]);
  X("c9", 2, "En una población de 200 individuos en equilibrio, q = 0,5. ¿Cuántos individuos aa se esperan?", "aa esperados =", 50, "individuos", ["q² = 0,25.", "0,25 · 200 = 50."], "50");
  O("c10", 2, "Una epidemia deja vivos a 20 individuos de una población de 10 000, y los supervivientes tienen menos variabilidad que la población original. Es un ejemplo de…", ["cuello de botella (deriva)", "selección direccional", "flujo génico", "especiación simpátrica"], 0, ["Reducción brusca de la población y pérdida de variabilidad al azar."], "Cuello de botella");
  M("c11", 2, "Une cada tipo de selección con su ejemplo.",
    [C("Direccional", ["Bacterias resistentes a un antibiótico", "Peso al nacer en humanos", "Pinzones de pico muy grande o muy pequeño"], 0), C("Estabilizadora", ["Peso al nacer en humanos", "Bacterias resistentes a un antibiótico", "Pinzones de pico muy grande o muy pequeño"], 0), C("Disruptiva", ["Pinzones de pico muy grande o muy pequeño", "Bacterias resistentes a un antibiótico", "Peso al nacer en humanos"], 0)],
    ["Direccional: favorece un extremo.", "Estabilizadora: favorece los intermedios.", "Disruptiva: favorece los dos extremos."], "Direccional → resistencia; estabilizadora → peso al nacer; disruptiva → picos extremos");
  O("c12", 2, "En la especiación alopátrica, lo primero que ocurre es…", ["una barrera geográfica separa dos poblaciones", "una duplicación del número de cromosomas", "un cruce con otra especie", "una selección estabilizadora"], 0, ["La separación geográfica corta el flujo génico.", "La duplicación de cromosomas es la poliploidía (simpátrica)."], "Una barrera geográfica");
  V("c13", 2, "La mula es una especie porque nace del cruce de una yegua y un burro y es fértil.", false, ["Es un híbrido estéril, por lo que no forma una especie", "Es fértil y forma una especie", "Es una especie por tener 64 cromosomas", "Es una subespecie del burro"], 0, ["Un híbrido estéril no deja descendencia: barrera postzigótica."]);
  O("c14", 2, "Unos pocos individuos colonizan una isla y sus alelos, que no eran representativos de la población de origen, se hacen muy frecuentes. Es el…", ["efecto fundador", "cuello de botella por catástrofe", "flujo génico", "equilibrio puntuado"], 0, ["Pocos fundadores, en un sitio nuevo: efecto fundador (un tipo de deriva)."], "Efecto fundador");
  X("c15", 2, "Selección en contra del recesivo letal aa (s = 1): q' = q / (1 + q). Con q = 0,5, ¿cuánto vale q' en la siguiente generación?", "q' =", 0.333, "", ["q' = 0,5 / 1,5.", "q' = 0,333."], "q' = 0,333", 0.005);
  X("c16", 2, "Un organismo tiene 4 pares de cromosomas homólogos. Sin contar el crossing-over, ¿cuántos gametos distintos puede producir?", "Gametos =", 16, "", ["Cada par aporta 2 opciones.", "2⁴ = 16."], "16");

  // ---- nivel 3
  X("d1", 3, "En una población en equilibrio, el 9 % de las personas muestra un carácter recesivo. ¿Qué porcentaje es heterocigoto (2pq)?", "2pq (%) =", 42, "%", ["q² = 0,09, por tanto q = 0,3 y p = 0,7.", "2pq = 2 · 0,7 · 0,3 = 0,42."], "42 %");
  X("d2", 3, "En 100 individuos hay 40 AA, 20 Aa y 40 aa. Calcula p y q y di cuántos Aa se esperarían en equilibrio de Hardy-Weinberg.", "Aa esperados =", 50, "individuos", ["Alelos A: 2 · 40 + 20 = 100; p = 0,5, q = 0,5.", "Aa esperados = 2pq · 100 = 0,5 · 100 = 50.", "Hay 20 observados: la población no está en equilibrio."], "50 (frente a 20 observados)");
  X("d3", 3, "Con selección total contra aa, q<sub>n</sub> = q<sub>0</sub> / (1 + n · q<sub>0</sub>). Si q<sub>0</sub> = 0,2, ¿cuánto vale q tras 2 generaciones?", "q₂ =", 0.143, "", ["q₂ = 0,2 / (1 + 2 · 0,2).", "= 0,2 / 1,4 = 0,1429."], "q₂ ≈ 0,143");
  X("d4", 3, "Una población diploide de N = 50 individuos tiene un alelo nuevo neutro en una sola copia. ¿Qué probabilidad tiene de acabar fijado por deriva (en %)?", "Probabilidad (%) =", 1, "%", ["Hay 2N = 100 alelos.", "Probabilidad = 1/100 = 0,01.", "= 1 %."], "1 %");
  X("d5", 3, "Una población con q = 0,2 recibe una fracción m = 0,1 de individuos de otra con q = 0,6. ¿Cuál es el nuevo valor de q?", "q' =", 0.24, "", ["q' = (1 − m) · 0,2 + m · 0,6.", "= 0,9 · 0,2 + 0,1 · 0,6 = 0,18 + 0,06 = 0,24."], "q' = 0,24");
  X("d6", 3, "Se liberan 50 polillas claras y 80 oscuras en un bosque de troncos oscuros y se recapturan 10 claras y 48 oscuras. ¿Cuántas veces mayor es la supervivencia de las oscuras que la de las claras (cociente entre los porcentajes de recaptura)?", "Cociente =", 3, "veces", ["Claras: 10/50 = 20 %.", "Oscuras: 48/80 = 60 %.", "60 / 20 = 3."], "3 veces: selección a favor del color oscuro");
  O("d7", 3, "Las aletas de un tiburón (pez) y de un delfín (mamífero) se parecen mucho. Su parecido se debe a…", ["evolución convergente: son órganos análogos", "evolución divergente: son órganos homólogos", "que ambos descienden de un tiburón", "que el delfín heredó la aleta del tiburón"], 0, ["Misma función (nadar) y origen distinto: análogos.", "Ambientes parecidos dieron soluciones parecidas."], "Evolución convergente");
  R("d8", "Explica la evolución del cuello de la jirafa según Lamarck y según Darwin. ¿Por qué la explicación de Lamarck no es válida? (Pregunta tipo PAU)", [
    { t: "Lamarck: uso y desuso con herencia de caracteres adquiridos", p: 0.5 },
    { t: "Darwin: variabilidad previa, exceso de descendientes y herencia", p: 0.5 },
    { t: "Darwin: éxito reproductivo diferencial y cambio de frecuencias en la población", p: 0.5 },
    { t: "Por qué falla Lamarck: el ADN de los gametos no cambia por el uso", p: 0.4 },
    { t: "Lenguaje científico correcto", p: 0.1 }], ["Lamarck.", "Darwin.", "Éxito diferencial.", "Crítica."], "Lamarck: uso y herencia de lo adquirido; Darwin: selección natural");
  R("d9", "Explica qué son la deriva genética, el flujo génico y la selección natural, y en qué se diferencian. (Pregunta tipo PAU)", [
    { t: "Deriva: cambio de frecuencias por azar, más fuerte en poblaciones pequeñas", p: 0.5 },
    { t: "Ejemplo de deriva: cuello de botella o efecto fundador", p: 0.3 },
    { t: "Flujo génico: migración de alelos entre poblaciones", p: 0.4 },
    { t: "Selección natural: éxito reproductivo diferencial; única que produce adaptación", p: 0.5 },
    { t: "Distinción azar / movimiento / ventaja", p: 0.3 }], ["Deriva.", "Flujo génico.", "Selección.", "Diferencias."], "Deriva = azar; flujo = migración; selección = ventaja");
  R("d10", "Cita y explica tres pruebas de la evolución. (Pregunta tipo PAU)", [
    { t: "Primera prueba bien explicada (p. ej. fósiles y formas intermedias)", p: 0.5 },
    { t: "Segunda prueba bien explicada (p. ej. homología y analogía)", p: 0.5 },
    { t: "Tercera prueba bien explicada (p. ej. código genético universal o embriología)", p: 0.5 },
    { t: "Ejemplos concretos (Archaeopteryx, brazo-ala-aleta, citocromo c)", p: 0.4 },
    { t: "Conclusión: apuntan a un antepasado común", p: 0.1 }], ["Prueba 1.", "Prueba 2.", "Prueba 3.", "Ejemplos."], "Paleontológicas, anatomía comparada, moleculares…");
  R("d11", "Enuncia la ley de Hardy-Weinberg y explica sus condiciones y su utilidad. Una enfermedad recesiva afecta a 1 de cada 10 000: calcula q y los portadores. (Pregunta tipo PAU)", [
    { t: "Enunciado: frecuencias alélicas constantes y genotípicas p², 2pq, q²", p: 0.4 },
    { t: "Condiciones: población grande, apareamiento al azar, sin selección, mutación ni migración", p: 0.5 },
    { t: "Utilidad: modelo de referencia para calcular portadores o detectar evolución", p: 0.3 },
    { t: "q = 0,01 (de q² = 0,0001)", p: 0.4 },
    { t: "Portadores 2pq = 0,0198 (≈ 2 %)", p: 0.4 }], ["Enunciado.", "Condiciones.", "Utilidad.", "q = 0,01.", "2pq = 0,0198."], "q = 0,01; portadores ≈ 2 %");
  R("d12", "Explica cómo se forma una especie nueva por especiación alopátrica y compara el gradualismo con el equilibrio puntuado. (Pregunta tipo PAU)", [
    { t: "Barrera geográfica que separa la población y corta el flujo génico", p: 0.4 },
    { t: "Acumulan mutaciones, deriva y selección distintas", p: 0.4 },
    { t: "Barreras reproductivas: ya no pueden cruzarse o la descendencia es estéril", p: 0.4 },
    { t: "Gradualismo: cambio lento y continuo", p: 0.4 },
    { t: "Equilibrio puntuado: estasis y cambios rápidos (Eldredge y Gould)", p: 0.4 }], ["Barrera.", "Divergencia.", "Aislamiento reproductivo.", "Gradualismo.", "Puntuado."], "Barrera → divergencia → aislamiento reproductivo");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Lamarck frente a Darwin", ancha: true,
      tabla: { cab: ["", "Lamarck", "Darwin"], filas: [
        ["variación", "por uso y desuso", "ya existe"],
        ["herencia", "de lo adquirido", "de lo heredable"],
        ["qué cambia", "el individuo", "la población"],
        ["jirafa", "estira el cuello", "gana la de cuello largo"]
      ] } },
    { titulo: "Mecanismos de la evolución", ancha: true,
      tabla: { cab: ["Mecanismo", "Efecto"], filas: [
        ["mutación", "alelos nuevos"],
        ["recombinación", "combinaciones nuevas"],
        ["selección natural", "adaptación"],
        ["deriva genética", "cambio por azar"],
        ["flujo génico", "migración de alelos"]
      ] } },
    { titulo: "Hardy-Weinberg: cómo calcular",
      pasos: ["Frecuencia de la enfermedad = q².", "q = raíz de q²; p = 1 − q.", "Portadores = 2pq.", "Número esperado = frecuencia · tamaño de la población."],
      nota: "1/10 000 → q = 0,01; 2pq = 0,0198." },
    { titulo: "Homólogos y análogos", ancha: true,
      tabla: { cab: ["", "Homólogos", "Análogos"], filas: [
        ["origen", "el mismo", "distinto"],
        ["función", "puede ser distinta", "la misma"],
        ["evolución", "divergente", "convergente"],
        ["ejemplo", "brazo y ala de murciélago", "ala de ave y de insecto"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El individuo evoluciona", bien: "Evoluciona la población", por: "Cambian las frecuencias de los alelos." },
        { mal: "Las mutaciones aparecen porque se necesitan", bien: "Aparecen al azar", por: "El ambiente solo selecciona." },
        { mal: "q² es la frecuencia de portadores", bien: "Los portadores son 2pq", por: "q² es la de los aa." },
        { mal: "El equilibrio puntuado es un cambio repentino", bien: "Son miles de años", por: "Rápido en tiempo geológico." }
      ] }
  ];

  B.registrar("bio2", "t16", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio16a.secciones,
    nuevas: B.parte.bio16a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
