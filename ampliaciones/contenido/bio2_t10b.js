/* ============================================================
   Biología II · ampliaciones · Tema 10 (parte B): Genética mendeliana
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t10.py con fracciones exactas.
   Convención: dominancia completa A > a salvo que se diga otra cosa; ABO con I^A, I^B (codominantes) e i; daltonismo X^D/X^d.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Un <b>gen</b> tiene versiones llamadas <b>alelos</b>; cada individuo tiene dos (<b>genotipo</b>) y su manifestación es el <b>fenotipo</b>. El dominante se expresa en el heterocigoto; el recesivo, solo en homocigosis.",
    "<b>Leyes de Mendel:</b> 1.ª uniformidad (AA × aa → todo Aa); 2.ª segregación (Aa × Aa → 3 : 1, genotipos 1 : 2 : 1); 3.ª transmisión independiente (AaBb × AaBb → 9 : 3 : 3 : 1). El cruce prueba con aa distingue AA de Aa.",
    "Excepciones: <b>dominancia intermedia</b> (1 : 2 : 1, el heterocigoto es intermedio), <b>codominancia</b> (se expresan los dos alelos), <b>alelos múltiples</b> (ABO) y <b>alelos letales</b> (2 : 1).",
    "<b>Ligada al X:</b> el varón (XY) tiene un solo alelo, por eso el daltonismo y la hemofilia afectan más a varones; la mujer portadora (X<sup>D</sup>X<sup>d</sup>) transmite el alelo a la mitad de sus hijos.",
    "<b>Genes ligados</b> (mismo cromosoma) no siguen la 3.ª ley: dan más gametos parentales que recombinantes; r (%) = distancia en cM. Los <b>árboles genealógicos</b> permiten deducir el tipo de herencia y calcular probabilidades."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Genética mendeliana",
    autores: [
      { n: "Qué estudia", f: "cómo se heredan los caracteres a través de los alelos", l: "leyes de Mendel · ABO · ligada al X · ligamiento" },
      { n: "Mendel", f: "1865–1866", l: "enuncia las leyes con guisantes (redescubiertas en 1900)" },
      { n: "Morgan", f: "1910", l: "herencia ligada al sexo y recombinación en Drosophila" },
      { n: "Sturtevant", f: "1913", l: "primer mapa genético (1 % de recombinación = 1 cM)" }
    ],
    obras: ["Gen y alelo", "Genotipo y fenotipo", "Cuadro de Punnett", "Cruce prueba", "Grupos ABO", "Ligamiento al X"],
    bloques: [
      { t: "Vocabulario", frases: ["Gen: fragmento de ADN; alelo: cada versión del gen.", "Genotipo: alelos que tiene (Aa); fenotipo: lo que se ve.", "Homocigoto: AA o aa; heterocigoto: Aa."],
        tabla: { cab: ["Genotipo", "Nombre"], filas: [["AA", "homocigoto dominante"], ["Aa", "heterocigoto"], ["aa", "homocigoto recesivo"]] } },
      { t: "Leyes de Mendel", frases: ["1.ª uniformidad: AA × aa → toda la F₁ Aa.", "2.ª segregación: Aa × Aa → 3 : 1 (genotipos 1 : 2 : 1).", "3.ª independencia: AaBb × AaBb → 9 : 3 : 3 : 1."],
        tabla: { cab: ["Cruce", "Descendencia"], filas: [["Aa × Aa", "¾ dominante · ¼ recesivo"], ["Aa × aa", "½ · ½ (cruce prueba)"], ["AaBb × aabb", "1 : 1 : 1 : 1"]] } },
      { t: "Más allá de la dominancia", frases: ["Intermedia: el heterocigoto es intermedio (rosa).", "Codominancia: se ven los dos alelos (ruano, grupo AB).", "Letal: Aa × Aa da 2 : 1."],
        tabla: { cab: ["Tipo", "F₂"], filas: [["completa", "3 : 1"], ["intermedia", "1 : 2 : 1"], ["codominancia", "1 : 2 : 1"]] } },
      { t: "Grupos sanguíneos ABO", frases: ["Tres alelos: I<sup>A</sup>, I<sup>B</sup> (codominantes) e i.", "A: I<sup>A</sup>I<sup>A</sup> o I<sup>A</sup>i; B: I<sup>B</sup>I<sup>B</sup> o I<sup>B</sup>i.", "AB: I<sup>A</sup>I<sup>B</sup>; O: ii (donante universal)."] },
      { t: "Ligada al X", frases: ["Mujer XX, varón XY (un solo alelo).", "El varón recibe el X de su madre.", "Portadora X<sup>D</sup>X<sup>d</sup>: la mitad de sus hijos varones, afectados."],
        tabla: { cab: ["Mujer", "Varón"], filas: [["X<sup>D</sup>X<sup>D</sup> · X<sup>D</sup>X<sup>d</sup> · X<sup>d</sup>X<sup>d</sup>", "X<sup>D</sup>Y · X<sup>d</sup>Y"]] } },
      { t: "Ligamiento y árboles", frases: ["Genes ligados: mismo cromosoma; r % = cM.", "Dos padres sanos y un hijo afectado → recesivo.", "Sano de padres portadores: portador con prob. 2/3."] }
    ],
    resumen: [
      "Cada gameto lleva <b>un solo alelo</b> de cada gen porque los homólogos se separan en la meiosis.",
      "Los problemas se resuelven con un método fijo: <b>letras, genotipos, gametos, Punnett, respuesta exacta</b>.",
      "Si los genes están en el mismo cromosoma, la 3.ª ley no se cumple: hay <b>ligamiento</b> y <b>recombinación</b>."
    ],
    conecta: [
      { con: "Biología T7:", rel: "la meiosis explica la segregación y la recombinación (crossing-over)." },
      { con: "Biología T5:", rel: "los genes son fragmentos de ADN; los alelos son versiones de su secuencia." },
      { con: "Biología T11–T13:", rel: "cómo se copia y expresa el ADN y por qué mutan los alelos." },
      { con: "Química II T1:", rel: "razonar con proporciones y fracciones exactas, igual que en los balances." }
    ],
    claves: [
      ["Gen", "fragmento de ADN que codifica un carácter"],
      ["Alelo", "cada una de las formas alternativas de un gen"],
      ["Genotipo", "conjunto de alelos de un individuo (Aa)"],
      ["Fenotipo", "manifestación del genotipo y del ambiente"],
      ["Heterocigoto", "individuo con dos alelos distintos para un gen"],
      ["Cruce prueba", "cruce con un homocigoto recesivo para averiguar el genotipo"],
      ["Codominancia", "se expresan a la vez los dos alelos del heterocigoto"],
      ["Portadora", "mujer heterocigota (sana) para un alelo recesivo ligado al X"],
      ["Genes ligados", "genes del mismo cromosoma, que se heredan juntos"],
      ["Recombinación", "intercambio de trozos entre homólogos (crossing-over) que da gametos nuevos"]
    ],
    cita: { txt: "Con n genes heterocigotos independientes: 2ⁿ gametos, 3ⁿ genotipos y 2ⁿ fenotipos.", autor: "Dato para recordar", obra: "AaBb: 4 gametos, 9 genotipos, 4 fenotipos" }
  };

  var datos = {
    vocab: {
      titulo: "Vocabulario de genética",
      consigna: "Une cada término con su definición.",
      pares: [
        ["Gen", "Fragmento de ADN que lleva la información de un carácter"],
        ["Alelo", "Cada una de las formas alternativas de un gen"],
        ["Genotipo", "Conjunto de alelos que tiene un individuo"],
        ["Fenotipo", "Manifestación del genotipo y del ambiente"],
        ["Homocigoto", "Individuo con los dos alelos iguales"],
        ["Cruce prueba", "Cruce con un homocigoto recesivo para averiguar un genotipo"]
      ]
    },
    tipos: {
      titulo: "¿Completa, intermedia o codominancia?",
      consigna: "Clasifica cada situación.",
      categorias: ["Dominancia completa", "Dominancia intermedia", "Codominancia"],
      items: [
        { t: "El guisante liso domina sobre el rugoso", c: 0 }, { t: "La F₂ da 3 : 1", c: 0 }, { t: "Aa se parece a AA", c: 0 },
        { t: "Dondiego rojo × blanco da hijos rosas", c: 1 }, { t: "El heterocigoto tiene un fenotipo intermedio", c: 1 },
        { t: "Grupo sanguíneo AB", c: 2 }, { t: "Ganado ruano: pelos rojos y blancos a la vez", c: 2 }, { t: "Se expresan los dos alelos a la vez", c: 2 }
      ]
    },
    herencias: {
      titulo: "¿Qué tipo de herencia sugiere cada pista?",
      consigna: "Clasifica la pista del árbol genealógico.",
      categorias: ["Autosómico recesivo", "Autosómico dominante", "Recesivo ligado al X"],
      items: [
        { t: "Dos padres sanos con un hijo afectado (y una hija afectada)", c: 0 }, { t: "Hija afectada de padre sano", c: 0 },
        { t: "Todo afectado tiene un progenitor afectado", c: 1 }, { t: "Dos padres afectados con un hijo sano", c: 1 },
        { t: "Afecta casi solo a varones", c: 2 }, { t: "Un afectado varón tiene todas las hijas portadoras", c: 2 }, { t: "Nunca pasa de padre a hijo varón", c: 2 }
      ]
    },
    ordenmetodo: {
      titulo: "Cómo resolver un problema de genética",
      consigna: "Ordena los pasos del método.",
      items: [
        { t: "Identificar los caracteres y qué alelo es dominante" },
        { t: "Asignar letras (A / a, I^A / I^B / i, X^D / X^d)" },
        { t: "Escribir los genotipos de los progenitores" },
        { t: "Escribir los gametos de cada progenitor" },
        { t: "Hacer el cuadro de Punnett" },
        { t: "Contar y responder exactamente lo que se pide" }
      ]
    },
    ordenmendel: {
      titulo: "El experimento de Mendel con una raza pura",
      consigna: "Ordena el experimento de un carácter.",
      items: [
        { t: "Se cruzan dos razas puras (P): AA × aa" },
        { t: "Se obtiene una F₁ uniforme: todos Aa" },
        { t: "Se deja autofecundar la F₁: Aa × Aa" },
        { t: "En la F₂ reaparece el recesivo" },
        { t: "Se cuenta y sale 3 : 1" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 10",
      preguntas: [
        { q: "Un individuo heterocigoto para un gen es…", op: ["Aa", "AA", "aa", "A"], ok: 0, porque: "Tiene dos alelos distintos del mismo gen." },
        { q: "La F₂ de un monohíbrido con dominancia completa da la proporción fenotípica…", op: ["3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1"], ok: 0, porque: "Aa × Aa → ¾ dominante y ¼ recesivo." },
        { q: "El cruce de un individuo de fenotipo dominante con un homocigoto recesivo sirve para…", op: ["averiguar su genotipo", "obtener razas puras", "producir mutaciones", "calcular r"], ok: 0, porque: "Si sale algún recesivo, era heterocigoto." },
        { q: "Un cruce AaBb × AaBb (genes independientes) da el cuadro de…", op: ["16 casillas y proporción 9 : 3 : 3 : 1", "4 casillas y 3 : 1", "9 casillas y 1 : 1 : 1 : 1", "8 casillas y 1 : 1"], ok: 0, porque: "Cada progenitor da 4 gametos: 4 × 4 = 16." },
        { q: "Una mujer del grupo AB y un hombre del grupo O pueden tener hijos del grupo…", op: ["A o B", "AB u O", "Solo O", "Solo AB"], ok: 0, porque: "I^A I^B × ii → I^A i (A) o I^B i (B)." },
        { q: "El daltonismo es más frecuente en varones porque…", op: ["el varón tiene un solo cromosoma X", "el cromosoma Y lleva el alelo", "es dominante", "las mujeres no lo heredan"], ok: 0, porque: "Con un solo X, el alelo recesivo siempre se manifiesta." },
        { q: "En un cruce prueba de un doble heterocigoto con genes independientes se obtiene…", op: ["1 : 1 : 1 : 1", "9 : 3 : 3 : 1", "3 : 1", "1 : 2 : 1"], ok: 0, porque: "Cada gameto se ve directamente: cuatro clases iguales." },
        { q: "Dos progenitores sanos tienen un hijo afectado: el carácter es…", op: ["recesivo", "dominante", "codominante", "letal"], ok: 0, porque: "Los dos son portadores (Aa) y el hijo aa." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la primera ley es FALSA?", op: ["Se cumple siempre, aunque los progenitores sean heterocigotos", "Habla de razas puras", "La F₁ es uniforme", "La F₁ de AA × aa es Aa"], ok: 0, porque: "Solo es cierta si los progenitores son de razas puras." },
        { q: "¿Cuál de estas afirmaciones sobre la F₂ de un monohíbrido es FALSA?", op: ["La proporción genotípica es 3 : 1", "La proporción fenotípica es 3 : 1", "La proporción genotípica es 1 : 2 : 1", "El alelo recesivo reaparece"], ok: 0, porque: "Los genotipos están en la proporción 1 : 2 : 1; 3 : 1 es la fenotípica." },
        { q: "¿Cuál de estas afirmaciones sobre la tercera ley es FALSA?", op: ["Se cumple siempre, estén los genes donde estén", "Da 9 : 3 : 3 : 1 en el dihíbrido", "Exige genes en cromosomas distintos", "Se debe a la orientación independiente de los homólogos"], ok: 0, porque: "No se cumple con genes ligados." },
        { q: "¿Cuál de estas afirmaciones sobre los grupos sanguíneos es FALSA?", op: ["El grupo O es I^A I^B", "El grupo AB es codominancia", "El grupo O es ii", "Un hijo O recibe una i de cada progenitor"], ok: 0, porque: "El grupo O es ii; I^A I^B es el AB." },
        { q: "¿Cuál de estas afirmaciones sobre la herencia ligada al X es FALSA?", op: ["Un varón hereda el X de su padre", "El varón tiene un solo alelo", "La mujer portadora es sana", "Una mujer afectada tiene a todos sus hijos varones afectados"], ok: 0, porque: "El varón recibe el X de su madre y la Y de su padre." },
        { q: "¿Cuál de estas afirmaciones sobre la dominancia intermedia es FALSA?", op: ["La F₂ da 3 : 1", "La F₁ es uniforme", "El heterocigoto tiene fenotipo intermedio", "La F₂ da 1 : 2 : 1"], ok: 0, porque: "La proporción fenotípica es 1 : 2 : 1, igual que la genotípica." },
        { q: "¿Cuál de estas afirmaciones sobre el ligamiento es FALSA?", op: ["Los recombinantes son los más abundantes", "r máximo es 50 %", "1 % de recombinación = 1 cM", "Los parentales son los más abundantes"], ok: 0, porque: "Los parentales son más abundantes que los recombinantes cuando hay ligamiento." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: genética mendeliana",
      cartas: [
        { a: "Gen y alelo", b: "Gen: fragmento de ADN que lleva la información de un carácter. Alelo: cada una de las versiones del gen." },
        { a: "Genotipo y fenotipo", b: "Genotipo: alelos que tiene un individuo (Aa). Fenotipo: manifestación del genotipo y del ambiente." },
        { a: "Homocigoto y heterocigoto", b: "Homocigoto: dos alelos iguales (AA, aa). Heterocigoto: dos alelos distintos (Aa)." },
        { a: "1.ª ley de Mendel", b: "Uniformidad: AA × aa → toda la F₁ Aa, fenotipo dominante." },
        { a: "2.ª ley de Mendel", b: "Segregación: Aa × Aa → ¼ AA : ½ Aa : ¼ aa; fenotipos 3 : 1." },
        { a: "3.ª ley de Mendel", b: "Independencia: AaBb × AaBb → 9 : 3 : 3 : 1 (genes en cromosomas distintos)." },
        { a: "Cruce prueba", b: "Con aa. Si toda la descendencia es dominante, era AA; si sale la mitad recesiva, era Aa." },
        { a: "Dominancia intermedia", b: "El heterocigoto es intermedio (dondiego rosa). F₂: ¼ roja : ½ rosa : ¼ blanca." },
        { a: "Codominancia", b: "Se expresan los dos alelos a la vez (ganado ruano; grupo AB)." },
        { a: "Alelos ABO", b: "I^A e I^B codominantes; i recesivo. A: AA o Ai; B: BB o Bi; AB; O: ii." },
        { a: "Alelo letal", b: "Aa × Aa → 2 : 1 entre los nacidos (el homocigoto muere), como el ratón amarillo." },
        { a: "Ligada al X", b: "El varón (XY) tiene un solo alelo; recibe el X de su madre. Ej.: daltonismo, hemofilia." },
        { a: "Portadora", b: "Mujer X^D X^d: sana, pero transmite el alelo al 50 % de sus hijos." },
        { a: "Genes ligados", b: "Mismo cromosoma: se heredan juntos. Parentales > recombinantes. 1 % de recombinación = 1 cM." },
        { a: "2ⁿ, 3ⁿ, 2ⁿ", b: "Con n genes heterocigotos independientes: 2ⁿ gametos, 3ⁿ genotipos y 2ⁿ fenotipos." },
        { a: "Hijo de padres portadores y sano", b: "Es portador con probabilidad 2/3 (descartado aa; quedan AA, Aa, Aa)." }
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
  O("b1", 1, "Un alelo es…", ["cada una de las formas alternativas de un gen", "un fragmento de cromosoma sin función", "el conjunto de caracteres visibles", "un cromosoma sexual"], 0, ["Un gen puede existir en varias versiones: los alelos."], "Cada una de las formas alternativas de un gen");
  O("b2", 1, "Un individuo de genotipo Aa es…", ["heterocigoto", "homocigoto dominante", "homocigoto recesivo", "hemicigoto"], 0, ["Tiene dos alelos distintos del mismo gen."], "Heterocigoto");
  V("b3", 1, "El fenotipo recesivo solo aparece en individuos homocigotos recesivos (aa).", true, ["En el heterocigoto el alelo dominante enmascara al recesivo", "El recesivo siempre se manifiesta", "Solo ocurre en los varones", "No depende del genotipo"], 0, ["Con Aa se ve el fenotipo dominante."], "Verdadero: el dominante lo enmascara en el heterocigoto");
  X("b4", 1, "Se cruzan dos razas puras AA × aa. ¿Qué porcentaje de la F₁ es heterocigoto?", "Heterocigotos =", 100, "%", ["AA solo da A y aa solo da a.", "Todos los hijos son Aa: 100 %."], "100 %");
  X("b5", 1, "En Aa × Aa (dominancia completa), ¿qué porcentaje de la descendencia es aa?", "aa =", 25, "%", ["Gametos A y a (½ y ½) en cada progenitor.", "P(aa) = ½ · ½ = ¼ = 25 %."], "25 %");
  X("b6", 1, "En Aa × Aa (dominancia completa), ¿qué porcentaje tiene el fenotipo dominante?", "Fenotipo dominante =", 75, "%", ["AA (25 %) + Aa (50 %) = 75 %."], "75 %");
  O("b7", 1, "La proporción fenotípica 9 : 3 : 3 : 1 aparece en la descendencia de un cruce…", ["AaBb × AaBb (genes independientes)", "Aa × Aa", "AaBb × aabb", "AA × aa"], 0, ["Es el dihíbrido de la tercera ley."], "AaBb × AaBb");
  O("b8", 1, "El grupo sanguíneo AB es un ejemplo de…", ["codominancia", "dominancia intermedia", "herencia ligada al sexo", "alelo letal"], 0, ["Los alelos A y B se expresan a la vez y no se mezclan."], "Codominancia");
  X("b9", 1, "En el cruce prueba Aa × aa, ¿qué porcentaje de la descendencia muestra el fenotipo recesivo?", "Recesivos =", 50, "%", ["Gametos de Aa: A y a; de aa: solo a.", "Aa (50 %) y aa (50 %)."], "50 %");
  T("b10", 1, "¿Cómo se llama el cruce de un individuo de fenotipo dominante con un homocigoto recesivo para saber su genotipo?", "Nombre", ["cruce prueba", "cruzamiento prueba", "retrocruzamiento", "cruce de prueba", "test cross"], ["Se usa un aa porque solo aporta gametos a."], "Cruce prueba");
  X("b11", 1, "¿Cuántos tipos distintos de gametos produce un individuo AaBb?", "Gametos =", 4, "", ["AB, Ab, aB y ab: 2 · 2 = 4."], "4 gametos distintos");
  V("b12", 1, "El daltonismo es más frecuente en mujeres que en varones.", false, ["El varón tiene un solo X, y le basta un alelo recesivo para manifestarlo", "La mujer tiene un solo X", "El daltonismo es dominante", "El alelo está en el cromosoma Y"], 0, ["En la mujer hacen falta dos alelos recesivos."], "Falso: el varón, con un solo X, lo manifiesta con un solo alelo");
  O("b13", 1, "En el dondiego de noche, con dominancia intermedia, la F₁ de roja × blanca es…", ["toda rosa", "toda roja", "mitad roja y mitad blanca", "toda blanca"], 0, ["C^R C^R × C^B C^B → todo C^R C^B, fenotipo intermedio."], "Toda rosa");
  M("b14", 1, "Une cada genotipo con su nombre.",
    [C("AA", ["Homocigoto dominante", "Heterocigoto", "Homocigoto recesivo"], 0), C("Aa", ["Heterocigoto", "Homocigoto dominante", "Homocigoto recesivo"], 0), C("aa", ["Homocigoto recesivo", "Heterocigoto", "Homocigoto dominante"], 0)],
    ["Los dos alelos iguales son homocigoto.", "Los dos distintos, heterocigoto."], "AA → homocigoto dominante; Aa → heterocigoto; aa → homocigoto recesivo");
  X("b15", 1, "Se cruzan dos plantas Aa y se obtienen 1200 descendientes. ¿Cuántos se espera que sean aa?", "aa =", 300, "plantas", ["P(aa) = ¼.", "1200 · ¼ = 300."], "300 plantas");
  O("b16", 1, "Un varón recibe su cromosoma X de…", ["su madre", "su padre", "ambos", "ninguno de los dos"], 0, ["Del padre recibe la Y; el X viene siempre de la madre."], "De su madre");

  // ---- nivel 2
  X("c1", 2, "Se cruzan dos dondiegos rosas (dominancia intermedia). ¿Qué porcentaje de la descendencia es blanca?", "Blancas =", 25, "%", ["C^R C^B × C^R C^B → ¼ C^R C^R : ½ C^R C^B : ¼ C^B C^B.", "Blanca = C^B C^B = 25 %."], "25 %");
  X("c2", 2, "Una pareja Aa × Aa tiene tres hijos. ¿Qué probabilidad hay de que los tres sean aa?", "Probabilidad =", 1.5625, "%", ["Cada hijo es aa con probabilidad ¼ y son independientes.", "(¼)³ = 1/64 = 1,5625 %."], "1/64 = 1,5625 %");
  X("c3", 2, "Una pareja Aa × Aa tiene tres hijos. ¿Qué probabilidad hay de que al menos uno sea aa?", "Probabilidad =", 57.8125, "%", ["Suceso contrario: ninguno aa = (¾)³ = 27/64.", "1 − 27/64 = 37/64 = 57,8125 %."], "37/64 = 57,8125 %");
  X("c4", 2, "En la F₂ de un monohíbrido, ¿con qué probabilidad es Aa una planta de fenotipo dominante?", "Probabilidad =", 66.67, "%", ["Entre los dominantes hay ¼ AA y ½ Aa.", "P(Aa | dominante) = ½ / ¾ = 2/3 = 66,67 %."], "2/3 = 66,67 %");
  X("c5", 2, "En AaBb × AaBb (independientes), ¿qué porcentaje de la descendencia es A_B_ (dominante en los dos)?", "A_B_ =", 56.25, "%", ["¾ · ¾ = 9/16.", "9/16 = 56,25 %."], "9/16 = 56,25 %");
  X("c6", 2, "En AaBb × AaBb (independientes), ¿qué porcentaje es aabb?", "aabb =", 6.25, "%", ["¼ · ¼ = 1/16 = 6,25 %."], "1/16 = 6,25 %");
  X("c7", 2, "En AaBb × AaBb (independientes), ¿qué porcentaje de la descendencia es doble heterocigoto AaBb?", "AaBb =", 25, "%", ["P(Aa) = ½ y P(Bb) = ½.", "½ · ½ = ¼ = 25 %."], "25 %");
  X("c8", 2, "En el cruce prueba AaBb × aabb (independientes), ¿qué porcentaje de la descendencia es aabb?", "aabb =", 25, "%", ["El doble heterocigoto da ab con probabilidad ¼.", "El homocigoto solo da ab: ¼ = 25 %."], "25 %");
  X("c9", 2, "En AABb × aaBb (independientes), ¿qué porcentaje de la descendencia es A_B_?", "A_B_ =", 75, "%", ["AA × aa: toda Aa, luego A_ = 100 %.", "Bb × Bb: B_ = ¾.", "100 % · ¾ = 75 %."], "75 %");
  X("c10", 2, "¿Cuántos tipos distintos de gametos produce un individuo AaBbCc con genes independientes?", "Gametos =", 8, "", ["2 · 2 · 2 = 8."], "8 gametos");
  X("c11", 2, "En el cruce AaBbCc × AaBbCc (independientes), ¿cuántos genotipos distintos puede haber en la descendencia?", "Genotipos =", 27, "", ["3 genotipos por gen (AA, Aa, aa).", "3 · 3 · 3 = 27."], "27 genotipos");
  X("c12", 2, "En AaBbCc × AaBbCc (independientes), ¿qué porcentaje de la descendencia es A_B_C_?", "A_B_C_ =", 42.1875, "%", ["(¾)³ = 27/64.", "27/64 = 42,1875 %."], "27/64 = 42,1875 %");
  M("c13", 2, "Une cada grupo sanguíneo con sus genotipos posibles (I^A, I^B e i).",
    [C("Grupo AB", ["I^A I^B", "I^A I^A o I^A i", "ii", "I^B I^B o I^B i"], 0), C("Grupo O", ["ii", "I^A I^B", "I^A I^A o I^A i", "I^B I^B o I^B i"], 0), C("Grupo B", ["I^B I^B o I^B i", "ii", "I^A I^B", "I^A I^A o I^A i"], 0)],
    ["AB es el único con los dos alelos codominantes.", "O es homocigoto recesivo ii.", "B puede ser homocigoto o llevar i."], "AB → I^A I^B; O → ii; B → I^B I^B o I^B i");
  O("c14", 2, "Una mujer del grupo A tiene un hijo del grupo O. El genotipo de la madre es…", ["I^A i", "I^A I^A", "I^A I^B", "ii"], 0, ["El hijo es ii: recibió una i de la madre.", "La madre es del grupo A y lleva i: I^A i."], "I^A i");
  O("c15", 2, "Un hombre del grupo AB y una mujer del grupo O tienen hijos. ¿Qué grupos pueden tener?", ["Solo A o B, a partes iguales", "Solo AB", "A, B, AB u O", "Solo O"], 0, ["I^A I^B × ii → ½ I^A i (A) y ½ I^B i (B).", "Nunca AB ni O."], "Solo A o B, a partes iguales");
  X("c16", 2, "Un hombre del grupo B (I^B i) y una mujer del grupo A (I^A i) tienen un hijo. ¿Qué porcentaje de probabilidad hay de que sea del grupo O?", "Grupo O =", 25, "%", ["I^B i × I^A i → ¼ I^A I^B, ¼ I^A i, ¼ I^B i, ¼ ii.", "Grupo O = ii = ¼ = 25 %."], "25 %");
  X("c17", 2, "Una mujer portadora de daltonismo se casa con un hombre de visión normal. ¿Qué porcentaje de sus hijos (de cualquier sexo) será un varón daltónico?", "Varón daltónico =", 25, "%", ["X^D X^d × X^D Y → ¼ X^D X^D, ¼ X^D X^d, ¼ X^D Y, ¼ X^d Y.", "Varón daltónico = X^d Y = ¼ = 25 %."], "25 %");
  X("c18", 2, "Una mujer portadora de daltonismo se casa con un hombre de visión normal. Entre sus hijos varones, ¿qué porcentaje es daltónico?", "Daltónicos =", 50, "%", ["Los hijos varones son X^D Y o X^d Y.", "Reciben el X de la madre, al azar: la mitad X^d Y = 50 %."], "50 %");
  X("c19", 2, "Una mujer daltónica (X^d X^d) se casa con un hombre de visión normal. ¿Qué porcentaje de sus hijos varones es daltónico?", "Daltónicos =", 100, "%", ["Todos reciben un X^d de la madre y la Y del padre.", "Todos son X^d Y: 100 %."], "100 %");
  V("c20", 2, "Un hombre daltónico y una mujer de visión normal homocigota (X^D X^D) pueden tener un hijo varón daltónico.", false, ["El hijo recibe el X de la madre, que solo lleva X^D", "El hijo recibe el X del padre", "El daltonismo es dominante", "El cromosoma Y lleva el alelo"], 0, ["X^d Y × X^D X^D → X^D X^d (hijas portadoras) y X^D Y (hijos sanos)."], "Falso: sus hijos varones son todos sanos");
  X("c21", 2, "Se cruza un dondiego rosa con uno blanco. ¿Qué porcentaje de la descendencia es rosa?", "Rosas =", 50, "%", ["C^R C^B × C^B C^B → ½ C^R C^B (rosa) y ½ C^B C^B (blanca)."], "50 %");
  O("c22", 2, "En el cruce de dos ratones amarillos salen 2 amarillos por cada 1 gris. Esto indica…", ["un alelo letal en homocigosis dominante", "dominancia intermedia", "codominancia", "herencia ligada al sexo"], 0, ["Esperaríamos 3 : 1.", "El homocigoto AA no sobrevive: quedan ½ Aa y ¼ aa = 2 : 1."], "Un alelo letal");

  // ---- nivel 3
  X("d1", 3, "En un cruce prueba de Drosophila se obtienen 965 grises-normales, 944 negras-vestigiales, 206 grises-vestigiales y 185 negras-normales. Calcula la frecuencia de recombinación.", "r =", 17, "%", ["Total: 965 + 944 + 206 + 185 = 2300.", "Recombinantes: 206 + 185 = 391.", "r = 391 / 2300 = 0,17 = 17 % (17 cM)."], "17 % (17 cM)");
  X("d2", 3, "Un doble heterocigoto AB / ab con r = 20 % se cruza con aabb y se obtienen 500 descendientes. ¿Cuántos se espera que sean Aabb?", "Aabb =", 50, "", ["Recombinantes: 20 % del total, mitad Ab y mitad aB.", "Ab: 10 % de 500 = 50."], "50 descendientes");
  O("d3", 3, "Para tres genes ligados las frecuencias de recombinación son: A–B 4 %, B–C 6 %, A–C 10 %. ¿Cuál está en medio?", ["B", "A", "C", "No se puede saber"], 0, ["La distancia entre los extremos es la suma de las otras dos: 4 + 6 = 10.", "El orden es A–B–C: B está en medio."], "B");
  X("d4", 3, "Una pareja de dos personas sanas, cada una hija de una pareja Aa × Aa (carácter recesivo), espera un hijo. ¿Qué porcentaje de probabilidad hay de que esté afectado?", "Probabilidad =", 11.11, "%", ["Cada persona sana es Aa con probabilidad 2/3.", "Los dos Aa: 2/3 · 2/3 = 4/9.", "Hijo aa: ¼ → 4/9 · ¼ = 1/9 = 11,11 %."], "1/9 = 11,11 %");
  X("d5", 3, "II-2 es un varón sano hijo de Aa × Aa y se casa con una mujer portadora (Aa) de un carácter recesivo. ¿Qué porcentaje de probabilidad hay de que su primer hijo esté afectado?", "Probabilidad =", 16.67, "%", ["II-2 es Aa con probabilidad 2/3.", "Si Aa × Aa, hijo aa con probabilidad ¼.", "2/3 · ¼ = 1/6 = 16,67 %."], "1/6 = 16,67 %");
  X("d6", 3, "Una pareja Aa × Aa tiene 4 hijos. ¿Qué porcentaje de probabilidad hay de que exactamente uno sea aa (en cualquier orden)?", "Probabilidad =", 42.1875, "%", ["Una ordenación concreta: ¼ · (¾)³ = 27/256.", "Hay 4 ordenaciones posibles: 4 · 27/256 = 27/64 = 42,1875 %."], "27/64 = 42,1875 %");
  X("d7", 3, "Una mujer portadora de daltonismo (X^D X^d) y un hombre daltónico (X^d Y) tienen un hijo. ¿Qué porcentaje de probabilidad hay de que sea una niña daltónica?", "Niña daltónica =", 25, "%", ["Cruce: ¼ X^D X^d, ¼ X^d X^d, ¼ X^D Y, ¼ X^d Y.", "Niña daltónica = X^d X^d = ¼ = 25 %."], "25 %");
  X("d8", 3, "Una madre portadora de hemofilia y un padre sano tienen dos hijos. ¿Qué porcentaje de probabilidad hay de que los dos sean varones hemofílicos?", "Probabilidad =", 6.25, "%", ["Cada hijo es varón hemofílico (X^h Y) con probabilidad ¼.", "(¼)² = 1/16 = 6,25 %."], "1/16 = 6,25 %");
  O("d9", 3, "Un hijo del grupo O es hijo de un padre del grupo A y de una madre del grupo B. ¿Qué genotipos tienen?", ["Padre I^A i y madre I^B i", "Padre I^A I^A y madre I^B i", "Padre I^A i y madre I^B I^B", "Padre I^A I^B y madre ii"], 0, ["El hijo es ii: cada progenitor dio una i.", "Por tanto, ambos son heterocigotos con i."], "Padre I^A i y madre I^B i");
  X("d10", 3, "De un cruce AaBb × AaBb (independientes) se obtienen 800 descendientes. ¿Cuántos se espera que sean aabb?", "aabb =", 50, "", ["P(aabb) = 1/16.", "800 / 16 = 50."], "50 descendientes");
  X("d11", 3, "Al cruzar ratones amarillos (Aa) entre sí se obtienen 90 crías vivas. ¿Cuántas se espera que sean grises, sabiendo que el genotipo amarillo homocigoto es letal?", "Grises =", 30, "", ["Entre los que nacen: 2 amarillos : 1 gris.", "90 / 3 = 30 grises."], "30 crías grises");
  X("d12", 3, "De un cruce AaBb × AaBb (independientes) se obtienen 640 descendientes. ¿Cuántos se espera que sean A_bb?", "A_bb =", 120, "", ["P(A_bb) = ¾ · ¼ = 3/16.", "640 · 3/16 = 120."], "120 descendientes");
  X("d13", 3, "En AaBbCc × AaBbCc (independientes), ¿qué porcentaje de la descendencia es A_B_cc?", "A_B_cc =", 14.0625, "%", ["¾ · ¾ · ¼ = 9/64.", "9/64 = 14,0625 %."], "9/64 = 14,0625 %");
  R("d14", "Enuncia las tres leyes de Mendel e indica en qué proceso celular se basan. (Pregunta tipo PAU)", [
    { t: "1.ª ley (uniformidad): dos razas puras que difieren en un carácter dan una F₁ uniforme", p: 0.5 },
    { t: "2.ª ley (segregación): los dos alelos de un gen se separan al formar los gametos; reaparece el recesivo (3 : 1)", p: 0.5 },
    { t: "3.ª ley (independencia): los alelos de genes distintos se heredan de forma independiente (9 : 3 : 3 : 1)", p: 0.5 },
    { t: "Condición de la 3.ª ley: genes en cromosomas distintos", p: 0.2 },
    { t: "Base: separación de homólogos y orientación independiente en la meiosis", p: 0.3 }], ["1.ª.", "2.ª.", "3.ª.", "Meiosis."], "Uniformidad, segregación e independencia; base en la meiosis");
  R("d15", "Explica los grupos sanguíneos ABO: alelos, genotipos, fenotipos y por qué el grupo O es donante universal. (Pregunta tipo PAU)", [
    { t: "Tres alelos: I^A, I^B (codominantes) e i (recesivo)", p: 0.5 },
    { t: "Genotipos y fenotipos: A (I^A I^A, I^A i), B (I^B I^B, I^B i), AB (I^A I^B), O (ii)", p: 0.6 },
    { t: "Antígenos de los glóbulos rojos y anticuerpos del plasma de cada grupo", p: 0.4 },
    { t: "El grupo O no tiene antígenos: no provoca aglutinación (donante universal)", p: 0.3 },
    { t: "Ejemplo de alelismo múltiple y de codominancia", p: 0.2 }], ["Alelos.", "Genotipos.", "Antígenos.", "Donante universal."], "I^A, I^B, i; el O (ii) no tiene antígenos");
  R("d16", "Explica la herencia ligada al sexo con el ejemplo del daltonismo: genotipos y por qué es más frecuente en varones. (Pregunta tipo PAU)", [
    { t: "El gen está en el cromosoma X y el Y no lleva el alelo", p: 0.4 },
    { t: "Genotipos de la mujer (X^D X^D, X^D X^d, X^d X^d) y del varón (X^D Y, X^d Y)", p: 0.5 },
    { t: "El varón tiene un solo alelo: le basta uno recesivo para manifestarlo", p: 0.5 },
    { t: "La mujer portadora es sana y transmite el alelo al 50 % de sus hijos", p: 0.4 },
    { t: "Un varón afectado no transmite el carácter a sus hijos, pero sí a todas sus hijas como portadoras", p: 0.2 }], ["Gen en X.", "Genotipos.", "Un alelo.", "Portadora."], "Gen en X; el varón es hemicigoto");
  R("d17", "Explica qué son los genes ligados y la recombinación, y cómo se calcula la distancia entre dos genes. (Pregunta tipo PAU)", [
    { t: "Genes ligados: en el mismo cromosoma, se heredan juntos", p: 0.4 },
    { t: "Entrecruzamiento en la profase I: intercambio entre cromátidas de homólogos", p: 0.5 },
    { t: "Gametos parentales (más abundantes) y recombinantes", p: 0.5 },
    { t: "r = recombinantes / total · 100; 1 % = 1 cM; máximo 50 %", p: 0.4 },
    { t: "Un cruce prueba da dos clases grandes y dos pequeñas, no 1 : 1 : 1 : 1", p: 0.2 }], ["Ligados.", "Crossing-over.", "Parentales.", "r."], "r = recombinantes / total; 1 % = 1 cM");
  R("d18", "En un árbol genealógico, dos personas sanas tienen una hija afectada. Deduce el tipo de herencia, los genotipos y calcula la probabilidad de que el siguiente hijo esté afectado. (Pregunta tipo PAU)", [
    { t: "Padres sanos con una hija afectada: carácter recesivo", p: 0.5 },
    { t: "Autosómico: una hija afectada de padre sano descarta el ligamiento al X", p: 0.5 },
    { t: "Genotipos: los padres Aa y la hija aa", p: 0.4 },
    { t: "Probabilidad del siguiente hijo afectado: ¼ (los dos son portadores)", p: 0.4 },
    { t: "Probabilidad de que un hijo sano sea portador: 2/3", p: 0.2 }], ["Recesivo.", "Autosómico.", "Genotipos.", "¼."], "Autosómico recesivo; padres Aa; ¼");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Las tres leyes de Mendel", ancha: true,
      tabla: { cab: ["Ley", "Cruce", "Resultado"], filas: [
        ["1.ª uniformidad", "AA × aa", "F₁: todos Aa"],
        ["2.ª segregación", "Aa × Aa", "3 : 1 (genotipos 1 : 2 : 1)"],
        ["3.ª independencia", "AaBb × AaBb", "9 : 3 : 3 : 1"]
      ] } },
    { titulo: "Cruces más usados", ancha: true,
      tabla: { cab: ["Cruce", "Descendencia"], filas: [
        ["Aa × aa", "½ dominante : ½ recesivo"],
        ["AaBb × aabb", "1 : 1 : 1 : 1"],
        ["rosa × rosa (intermedia)", "¼ roja : ½ rosa : ¼ blanca"],
        ["Aa × Aa con alelo letal", "2 : 1"]
      ] } },
    { titulo: "Grupos sanguíneos ABO", ancha: true,
      tabla: { cab: ["Grupo", "Genotipos", "Anticuerpos"], filas: [
        ["A", "I^A I^A, I^A i", "anti-B"],
        ["B", "I^B I^B, I^B i", "anti-A"],
        ["AB", "I^A I^B", "ninguno"],
        ["O", "ii", "anti-A y anti-B"]
      ] } },
    { titulo: "Ligada al X (daltonismo)",
      items: ["El varón (XY) tiene un solo alelo.", "El varón recibe el X de su madre.", "La portadora X^D X^d es sana y pasa el alelo al 50 % de sus hijos.", "Un padre afectado: todas las hijas portadoras."],
      nota: "Hijo varón afectado: casi siempre madre portadora." },
    { titulo: "Pistas en un árbol genealógico", ancha: true,
      tabla: { cab: ["Pista", "Herencia"], filas: [
        ["Padres sanos, hijo afectado", "recesivo"],
        ["Todo afectado con padre o madre afectado", "dominante"],
        ["Casi solo varones; no pasa de padre a hijo", "recesivo ligado al X"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "En la F₂ de un monohíbrido la proporción genotípica es 3 : 1", bien: "Genotípica 1 : 2 : 1; fenotípica 3 : 1", por: "Hay dos proporciones distintas." },
        { mal: "Los gametos de AaBb son AA, Aa, aa…", bien: "Los gametos llevan un solo alelo de cada gen: AB, Ab, aB, ab", por: "Cada gameto es haploide." },
        { mal: "Un varón hereda el X de su padre", bien: "El varón recibe el X de su madre y la Y de su padre", por: "El padre da a su hijo la Y." },
        { mal: "Si los tres primeros hijos son aa, el cuarto tiene menos probabilidad", bien: "Sigue siendo ¼", por: "Los hijos son independientes." }
      ] }
  ];

  B.registrar("bio2", "t10", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio10a.secciones,
    nuevas: B.parte.bio10a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
