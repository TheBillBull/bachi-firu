/* ============================================================
   Biología II · ampliaciones · Tema 9 (parte B): Anabolismo: la fotosíntesis
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t9.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "La <b>fotosíntesis</b> convierte la energía de la luz en energía química: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂. El <b>O₂ procede del agua</b> (fotólisis), no del CO₂.",
    "La <b>fase luminosa</b> (membrana del tilacoide) usa los fotosistemas II y I y la cadena de electrones; produce <b>ATP, NADPH y O₂</b>. El flujo <b>cíclico</b> (solo PSI) produce solo ATP.",
    "El <b>ciclo de Calvin</b> (estroma) fija el CO₂ con la <b>RuBisCO</b>, lo reduce con ATP y NADPH y regenera la RuBP: por glucosa gasta <b>18 ATP y 12 NADPH</b>.",
    "La velocidad la limita el <b>factor limitante</b> (luz, CO₂, temperatura). La <b>fotorrespiración</b> (RuBisCO + O₂) desperdicia carbono; las plantas <b>C4</b> (espacio) y <b>CAM</b> (tiempo) la evitan.",
    "La <b>quimiosíntesis</b> fija CO₂ con la energía de oxidar compuestos inorgánicos (nitrificantes, sulfobacterias); la materia se recicla entre fotosíntesis y respiración, la energía no."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Anabolismo: la fotosíntesis",
    autores: [
      { n: "Qué estudia", f: "cómo se fabrica glucosa a partir de CO₂, agua y luz", l: "cloroplasto · fase luminosa · Calvin" },
      { n: "Ruben y Kamen", f: "1941", l: "el O₂ viene del agua (¹⁸O)" },
      { n: "Calvin", f: "1950s · Nobel 1961", l: "ciclo de fijación del CO₂" }
    ],
    obras: ["Cloroplasto", "Esquema en Z", "Ciclo de Calvin", "RuBisCO", "C4 y CAM"],
    bloques: [
      { t: "Visión general", frases: ["6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂.", "El CO₂ se <b>reduce</b>; el agua se <b>oxida</b>.", "El O₂ sale del <b>agua</b> (Hill 1937; Ruben y Kamen 1941)."] },
      { t: "Cloroplasto y pigmentos", frases: ["Doble membrana, <b>estroma</b>, <b>tilacoides</b> (grana) y <b>lumen</b>.", "Clorofila <i>a</i> (violeta-azul y rojo); carotenoides (azul).", "Fotosistema = antena + centro de reacción (P680, P700)."],
        tabla: { cab: ["Zona", "Proceso"], filas: [["tilacoide", "fase luminosa"], ["lumen", "se acumulan H⁺"], ["estroma", "ciclo de Calvin"]] } },
      { t: "Fase luminosa", frases: ["PSII → fotólisis → PQ → b₆f → PC → PSI → Fd → NADPH.", "El b₆f bombea H⁺ al lumen; la ATP sintasa fabrica ATP.", "El flujo cíclico solo usa el PSI."],
        tabla: { cab: ["Flujo", "Produce"], filas: [["acíclico", "ATP + NADPH + O₂"], ["cíclico", "solo ATP"]] } },
      { t: "Ciclo de Calvin", frases: ["<b>Carboxilación</b> (RuBisCO), <b>reducción</b> y <b>regeneración</b> de la RuBP.", "Por CO₂: 3 ATP y 2 NADPH.", "Por glucosa: 6 CO₂, <b>18 ATP y 12 NADPH</b>."] },
      { t: "Factores y C4/CAM", frases: ["Luz, CO₂ y temperatura: manda el <b>factor limitante</b>.", "Fotorrespiración: RuBisCO fija O₂ y se pierde CO₂.", "C4: espacio (mesófilo y vaina). CAM: tiempo (noche y día)."],
        tabla: { cab: ["Planta", "Ejemplo"], filas: [["C3", "trigo, arroz"], ["C4", "maíz, caña de azúcar"], ["CAM", "cactus, piña"]] } },
      { t: "Quimiosíntesis y respiración", frases: ["Quimiosíntesis: energía de oxidar inorgánicos (NH₄⁺, H₂S, Fe²⁺).", "Fotosíntesis y respiración: la <b>materia se recicla</b>, la energía no.", "Cloroplasto: H⁺ en el lumen; mitocondria: en el espacio intermembrana."] }
    ],
    resumen: [
      "La luz impulsa electrones del <b>agua</b> al <b>NADPH</b> y produce <b>ATP</b> y <b>O₂</b>.",
      "ATP y NADPH alimentan el <b>ciclo de Calvin</b>, que fija el CO₂ y fabrica glúcidos.",
      "Velocidad: manda el <b>factor limitante</b>; C4 y CAM evitan la fotorrespiración."
    ],
    conecta: [
      { con: "Biología T8:", rel: "el catabolismo (respiración): es el proceso inverso y complementario." },
      { con: "Biología T6:", rel: "el cloroplasto es un orgánulo con ADN propio (endosimbiosis)." },
      { con: "Biología T4:", rel: "las enzimas (RuBisCO) y los factores que las afectan." },
      { con: "Química II T7:", rel: "pH y gradientes de H⁺; reacciones redox (T8)." }
    ],
    claves: [
      ["Fotólisis", "ruptura del agua por la luz: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻"],
      ["Fotosistema", "antena de pigmentos + centro de reacción (PSII: P680; PSI: P700)"],
      ["Fotofosforilación", "síntesis de ATP por la ATP sintasa con el gradiente de H⁺ creado por la luz"],
      ["Flujo cíclico", "solo el PSI; el electrón vuelve al P700; solo se produce ATP"],
      ["RuBisCO", "enzima que fija el CO₂ sobre la ribulosa-1,5-bisfosfato"],
      ["Ciclo de Calvin", "carboxilación, reducción y regeneración de la RuBP, en el estroma"],
      ["Factor limitante", "el factor más escaso, que marca la velocidad del proceso"],
      ["Fotorrespiración", "la RuBisCO fija O₂ en vez de CO₂ y se libera CO₂"],
      ["Planta C4 y CAM", "separan la fijación del CO₂ y el Calvin en el espacio y en el tiempo"],
      ["Quimiosíntesis", "fijar CO₂ con la energía de oxidar sustancias inorgánicas"]
    ],
    cita: { txt: "El oxígeno que respiras sale del agua que rompen las hojas: cada molécula de O₂ gasta dos de H₂O.", autor: "Dato para recordar", obra: "6 CO₂ + 12 H₂O → glucosa + 6 O₂ + 6 H₂O; 12 NADPH = 24 e⁻ = 12 H₂O" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    relacion: {
      titulo: "Fotosíntesis, respiración o las dos",
      consigna: "Clasifica cada característica.",
      categorias: ["Fotosíntesis", "Respiración celular", "Las dos"],
      items: [
        { t: "Cloroplasto", c: 0 }, { t: "NADPH", c: 0 }, { t: "Libera O₂", c: 0 }, { t: "Produce glucosa", c: 0 },
        { t: "Mitocondria", c: 1 }, { t: "NADH y FADH₂", c: 1 }, { t: "Consume O₂", c: 1 }, { t: "Degrada glucosa", c: 1 },
        { t: "Quimiosmosis (ATP sintasa)", c: 2 }, { t: "Cadena de transporte de electrones", c: 2 }, { t: "Gradiente de H⁺", c: 2 }
      ]
    },
    fases: {
      titulo: "¿Fase luminosa o ciclo de Calvin?",
      consigna: "Coloca cada proceso en su fase.",
      categorias: ["Fase luminosa (tilacoides)", "Ciclo de Calvin (estroma)"],
      items: [
        { t: "Fotólisis del agua", c: 0 }, { t: "Fotosistemas I y II", c: 0 }, { t: "Formación de NADPH", c: 0 }, { t: "Liberación de O₂", c: 0 }, { t: "ATP sintasa (CF₁)", c: 0 },
        { t: "Carboxilación con RuBisCO", c: 1 }, { t: "Regeneración de la RuBP", c: 1 }, { t: "Reducción del 3-PGA a G3P", c: 1 }, { t: "Fijación del CO₂", c: 1 }, { t: "Síntesis de almidón", c: 1 }
      ]
    },
    pigmentos: {
      titulo: "Pigmentos y estructuras",
      consigna: "Une cada término con su descripción.",
      pares: [
        ["Clorofila a", "Pigmento principal: absorbe violeta-azul y rojo"],
        ["Carotenoides", "Absorben azul-verdoso y protegen de exceso de luz"],
        ["Antena", "Pigmentos que captan fotones y pasan la energía al centro de reacción"],
        ["P680", "Centro de reacción del fotosistema II"],
        ["Lumen", "Interior del tilacoide, donde se acumulan H⁺"],
        ["Grana", "Pilas de tilacoides"]
      ]
    },
    c3c4cam: {
      titulo: "C3, C4 o CAM",
      consigna: "Clasifica cada dato o planta.",
      categorias: ["C3", "C4", "CAM"],
      items: [
        { t: "Trigo", c: 0 }, { t: "Primer producto: 3-PGA", c: 0 }, { t: "Fotorrespiración alta con calor", c: 0 },
        { t: "Maíz", c: 1 }, { t: "Células de la vaina", c: 1 }, { t: "Separación en el espacio", c: 1 },
        { t: "Cactus", c: 2 }, { t: "Estomas abiertos de noche", c: 2 }, { t: "Separación en el tiempo", c: 2 }
      ]
    },
    quimio: {
      titulo: "Bacterias quimiosintéticas",
      consigna: "Une cada grupo con la transformación que realiza.",
      pares: [
        ["Nitrosomonas", "NH₄⁺ → NO₂⁻"],
        ["Nitrobacter", "NO₂⁻ → NO₃⁻"],
        ["Sulfobacterias", "H₂S → S → SO₄²⁻"],
        ["Ferrobacterias", "Fe²⁺ → Fe³⁺"],
        ["Bacterias del hidrógeno", "H₂ + O₂ → H₂O"]
      ]
    },
    ordenz: {
      titulo: "El camino del electrón (flujo acíclico)",
      consigna: "Ordena el recorrido desde el principio.",
      items: [
        { t: "La luz excita el fotosistema II (P680)" },
        { t: "Fotólisis del agua: P680⁺ recupera electrones y sale O₂" },
        { t: "El electrón baja por plastoquinona y citocromo b₆f (se bombean H⁺)" },
        { t: "La plastocianina lo lleva al fotosistema I" },
        { t: "La luz excita el fotosistema I (P700) y pasa a la ferredoxina" },
        { t: "La NADP⁺ reductasa forma NADPH" }
      ]
    },
    ordencalvin: {
      titulo: "El ciclo de Calvin",
      consigna: "Ordena las etapas del ciclo.",
      items: [
        { t: "La RuBisCO une el CO₂ a la RuBP (5 C)" },
        { t: "Se forman dos moléculas de 3-PGA (3 C)" },
        { t: "El 3-PGA se fosforila con ATP y se reduce con NADPH" },
        { t: "Se obtiene G3P (triosa); 1 de cada 6 sale del ciclo" },
        { t: "Los otros 5 G3P regeneran la RuBP, con ATP" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 9",
      preguntas: [
        { q: "El oxígeno que libera la fotosíntesis procede…", op: ["del agua", "del CO₂", "de la glucosa", "del NADPH"], ok: 0, porque: "Fotólisis del agua (Ruben y Kamen, con ¹⁸O)." },
        { q: "La fase luminosa ocurre en…", op: ["la membrana de los tilacoides", "el estroma", "la membrana externa del cloroplasto", "la matriz mitocondrial"], ok: 0, porque: "Allí están los fotosistemas y la ATP sintasa." },
        { q: "La enzima que fija el CO₂ en el ciclo de Calvin es…", op: ["la RuBisCO", "la ATP sintasa", "la PEP carboxilasa", "la NADP⁺ reductasa"], ok: 0, porque: "RuBisCO: ribulosa-1,5-bisfosfato carboxilasa/oxigenasa." },
        { q: "El flujo cíclico de electrones produce…", op: ["solo ATP", "ATP y NADPH", "NADPH y O₂", "solo O₂"], ok: 0, porque: "Solo actúa el PSI: no hay fotólisis ni se reduce el NADP⁺." },
        { q: "Para fabricar una glucosa, el ciclo de Calvin gasta…", op: ["18 ATP y 12 NADPH", "12 ATP y 18 NADPH", "6 ATP y 6 NADPH", "36 ATP y 24 NADPH"], ok: 0, porque: "3 ATP y 2 NADPH por CO₂, por 6 CO₂." },
        { q: "Una planta CAM abre los estomas…", op: ["de noche", "de día", "solo al mediodía", "nunca"], ok: 0, porque: "Fija el CO₂ de noche y lo guarda como malato." },
        { q: "El factor limitante es…", op: ["el factor más escaso, que marca la velocidad", "el factor más abundante", "siempre la luz", "siempre el CO₂"], ok: 0, porque: "Regla de Blackman." },
        { q: "Las bacterias nitrificantes obtienen energía…", op: ["oxidando amonio o nitrito", "con la luz", "oxidando glucosa", "reduciendo CO₂ con O₂"], ok: 0, porque: "Son quimiosintéticas: energía de oxidar inorgánicos." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre la fotosíntesis es FALSA?", op: ["El O₂ liberado procede del CO₂", "El CO₂ se reduce", "El agua se oxida", "El ciclo de Calvin ocurre en el estroma"], ok: 0, porque: "El O₂ procede del agua (fotólisis)." },
        { q: "¿Cuál de estas afirmaciones sobre la fase oscura es FALSA?", op: ["Ocurre solo de noche", "Ocurre en el estroma", "Usa ATP y NADPH", "Fija el CO₂"], ok: 0, porque: "«Oscura» solo significa que no necesita luz directamente; funciona con luz." },
        { q: "¿Cuál de estas afirmaciones sobre el flujo cíclico es FALSA?", op: ["Produce NADPH y O₂", "Solo usa el fotosistema I", "Fabrica ATP", "El electrón vuelve al P700"], ok: 0, porque: "No hay fotólisis ni NADPH: solo ATP." },
        { q: "¿Cuál de estas afirmaciones sobre la fotofosforilación es FALSA?", op: ["Los H⁺ se acumulan en el estroma", "Los H⁺ se acumulan en el lumen", "Interviene la ATP sintasa", "El gradiente lo crean la luz y la cadena de electrones"], ok: 0, porque: "Los H⁺ se acumulan en el lumen y vuelven al estroma." },
        { q: "¿Cuál de estas afirmaciones sobre las plantas C4 y CAM es FALSA?", op: ["Las plantas CAM abren los estomas de día", "Las C4 separan las fases en el espacio", "Las CAM las separan en el tiempo", "Las C4 usan PEP carboxilasa en el mesófilo"], ok: 0, porque: "Las CAM abren los estomas de noche." },
        { q: "¿Cuál de estas afirmaciones sobre los pigmentos es FALSA?", op: ["Las hojas son verdes porque absorben la luz verde", "La clorofila a absorbe en violeta-azul y rojo", "Los carotenoides son pigmentos accesorios", "El espectro de acción se parece al de absorción"], ok: 0, porque: "Son verdes porque reflejan el verde." },
        { q: "¿Cuál de estas afirmaciones sobre plantas y respiración es FALSA?", op: ["Las plantas solo respiran de noche", "Las plantas respiran siempre", "De día el balance suele liberar O₂", "El cloroplasto no hace la respiración"], ok: 0, porque: "Las plantas respiran de día y de noche." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: fotosíntesis",
      cartas: [
        { a: "Ecuación de la fotosíntesis", b: "6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂. El O₂ viene del agua." },
        { a: "Fotólisis del agua", b: "2 H₂O → O₂ + 4 H⁺ + 4 e⁻, en el fotosistema II (lumen)." },
        { a: "Fotosistema", b: "Antena de pigmentos + centro de reacción. PSII: P680; PSI: P700." },
        { a: "Esquema en Z", b: "H₂O → PSII → PQ → b₆f → PC → PSI → Fd → NADPH." },
        { a: "Flujo acíclico", b: "PSII y PSI, produce ATP, NADPH y O₂." },
        { a: "Flujo cíclico", b: "Solo PSI; el electrón vuelve al P700; produce solo ATP." },
        { a: "Fotofosforilación", b: "ATP sintasa con el gradiente de H⁺ del lumen al estroma." },
        { a: "Fase oscura", b: "Ciclo de Calvin, en el estroma. No necesita luz directamente, pero sí ATP y NADPH." },
        { a: "RuBisCO", b: "Fija el CO₂ sobre la RuBP (5 C) y da 2 3-PGA (3 C). También puede fijar O₂." },
        { a: "Etapas del ciclo de Calvin", b: "Carboxilación, reducción (ATP y NADPH) y regeneración de la RuBP (ATP)." },
        { a: "Balance por glucosa", b: "6 CO₂, 18 ATP y 12 NADPH (3 ATP y 2 NADPH por CO₂)." },
        { a: "Factor limitante", b: "El factor más escaso, que marca la velocidad (Blackman)." },
        { a: "Punto de compensación", b: "Intensidad de luz con fotosíntesis neta = 0. Bruta = neta + respiración." },
        { a: "Fotorrespiración", b: "RuBisCO fija O₂: se libera CO₂ y se gasta ATP. Sube con calor y sequía." },
        { a: "Plantas C4 y CAM", b: "C4: separan en el espacio (mesófilo y vaina). CAM: en el tiempo (estomas abiertos de noche)." },
        { a: "Quimiosíntesis", b: "Fija CO₂ con la energía de oxidar inorgánicos: NH₄⁺, NO₂⁻, H₂S, Fe²⁺. Importante en el ciclo del N." }
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
  O("b1", 1, "¿En qué parte del cloroplasto ocurre la fase luminosa?", ["En la membrana de los tilacoides", "En el estroma", "En la membrana externa", "En el citosol"], 0, ["Allí están los fotosistemas, la cadena de electrones y la ATP sintasa."], "Membrana de los tilacoides");
  O("b2", 1, "¿Dónde ocurre el ciclo de Calvin?", ["En el estroma", "En el lumen", "En la matriz mitocondrial", "En el núcleo"], 0, ["El estroma contiene la RuBisCO y las enzimas del ciclo."], "Estroma");
  O("b3", 1, "El oxígeno que libera la fotosíntesis procede…", ["de la ruptura del agua", "del CO₂", "de la glucosa", "del ATP"], 0, ["Fotólisis del agua: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻.", "Lo demostraron Ruben y Kamen con agua marcada con ¹⁸O."], "Del agua");
  O("b4", 1, "El pigmento fotosintético principal es…", ["la clorofila a", "el caroteno", "la hemoglobina", "la melanina"], 0, ["La clorofila a forma el centro de reacción de los fotosistemas."], "Clorofila a");
  O("b5", 1, "¿Qué dos productos de la fase luminosa necesita el ciclo de Calvin?", ["ATP y NADPH", "O₂ y glucosa", "CO₂ y H₂O", "ADP y NADP⁺"], 0, ["El Calvin gasta ATP y NADPH y devuelve ADP y NADP⁺."], "ATP y NADPH");
  V("b6", 1, "La fase oscura solo ocurre de noche.", false, ["Solo significa que no necesita luz directamente, y funciona de día con ATP y NADPH", "Necesita oscuridad total", "Ocurre en los tilacoides", "No existe"], 0, ["Sin luz no se renuevan el ATP ni el NADPH: de noche se detiene."]);
  V("b7", 1, "El O₂ que se libera en la fotosíntesis procede del CO₂.", false, ["Procede del agua: los átomos de O del CO₂ van a la glucosa y al agua formada", "Procede de la clorofila", "Procede del NADPH", "Procede del almidón"], 0, ["Con H₂¹⁸O el O₂ sale marcado; con C¹⁸O₂, no."]);
  T("b8", 1, "Completa: la enzima que fija el CO₂ en el ciclo de Calvin se llama…", "Enzima", ["RuBisCO", "rubisco"], ["Es la ribulosa-1,5-bisfosfato carboxilasa/oxigenasa."], "RuBisCO");
  T("b9", 1, "El aceptor de CO₂ de 5 carbonos del ciclo de Calvin se abrevia…", "Aceptor", ["RuBP", "rubp"], ["Ribulosa-1,5-bisfosfato (5 C): se regenera en cada vuelta."], "RuBP");
  M("b10", 1, "Une cada proceso con su lugar.",
    [C("Fotólisis del agua", ["Lumen / membrana del tilacoide", "Estroma", "Mitocondria"], 0), C("Fijación del CO₂", ["Estroma", "Lumen / membrana del tilacoide", "Mitocondria"], 0), C("Gradiente de H⁺", ["Lumen del tilacoide", "Estroma", "Citosol"], 0)],
    ["La fotólisis ocurre en el PSII, hacia el lumen.", "El Calvin ocurre en el estroma.", "Los H⁺ se acumulan en el lumen."], "Fotólisis → tilacoide; Calvin → estroma; H⁺ → lumen");
  O("b11", 1, "¿Qué gas se desprende en la fotólisis del agua?", ["O₂", "CO₂", "H₂", "N₂"], 0, ["2 H₂O → O₂ + 4 H⁺ + 4 e⁻."], "O₂");
  O("b12", 1, "En la quimiosíntesis, la energía procede de…", ["la oxidación de compuestos inorgánicos", "la luz", "la oxidación de glucosa", "la fotólisis"], 0, ["Es la diferencia con la fotosíntesis: la fuente de energía."], "Oxidar sustancias inorgánicas");
  O("b13", 1, "¿Cuál de estas plantas es de tipo C4?", ["Maíz", "Trigo", "Arroz", "Cactus"], 0, ["Maíz, caña de azúcar y sorgo son C4; el cactus es CAM; trigo y arroz son C3."], "Maíz");
  V("b14", 1, "Las plantas solo respiran de noche.", false, ["Respiran siempre; de día, la fotosíntesis supera a la respiración", "Respiran solo de día", "No respiran", "La respiración ocurre en los cloroplastos"], 0, ["Las mitocondrias funcionan día y noche."]);
  X("b15", 1, "En el ciclo de Calvin, ¿cuántos ATP se gastan por cada CO₂ fijado (planta C3)?", "ATP =", 3, "", ["2 ATP en la reducción del 3-PGA.", "1 ATP en la regeneración de la RuBP.", "Total: 3."], "3 ATP");
  X("b16", 1, "¿Cuántos NADPH se gastan en el ciclo de Calvin por cada CO₂ fijado?", "NADPH =", 2, "", ["Se forman 2 3-PGA por CO₂.", "Cada 3-PGA se reduce con 1 NADPH."], "2 NADPH");
  O("b17", 1, "Las hojas se ven verdes porque la clorofila…", ["refleja la luz verde", "absorbe la luz verde", "emite luz verde", "transforma la luz verde en roja"], 0, ["Absorbe sobre todo violeta-azul y rojo; el verde (≈ 500–570 nm) se refleja."], "Refleja el verde");

  // ---- nivel 2
  X("c1", 2, "¿Cuántos ATP se gastan para fijar 12 CO₂ en una planta C3?", "ATP =", 36, "", ["3 ATP por CO₂.", "12 · 3 = 36."], "36 ATP");
  X("c2", 2, "¿Cuántos NADPH se gastan para fijar 12 CO₂?", "NADPH =", 24, "", ["2 NADPH por CO₂.", "12 · 2 = 24."], "24 NADPH");
  X("c3", 2, "¿Cuántas moléculas de glucosa se fabrican con 18 CO₂?", "Glucosas =", 3, "", ["Una glucosa necesita 6 CO₂.", "18 / 6 = 3."], "3 glucosas");
  X("c4", 2, "¿Cuántas vueltas del ciclo de Calvin hacen falta para fabricar 2 glucosas?", "Vueltas =", 12, "", ["Cada vuelta fija 1 CO₂.", "2 glucosas = 12 C = 12 CO₂."], "12 vueltas");
  X("c5", 2, "¿Cuántas moléculas de agua hay que romper en la fase luminosa para obtener los NADPH de una glucosa?", "H₂O =", 12, "", ["Una glucosa gasta 12 NADPH = 24 e⁻.", "Cada H₂O aporta 2 e⁻: 12 H₂O."], "12 H₂O");
  X("c6", 2, "¿Cuántas moléculas de O₂ se liberan al fabricar 3 glucosas?", "O₂ =", 18, "", ["Una glucosa: 6 O₂ (24 e⁻ / 4 e⁻ por O₂).", "3 · 6 = 18."], "18 O₂");
  X("c7", 2, "Con luz, el pH del lumen es ≈ 5 y el del estroma ≈ 8. ¿Cuántas veces mayor es la [H⁺] del lumen?", "Factor =", 1000, "veces", ["Diferencia de 3 unidades de pH.", "Cada unidad es ×10: 10³ = 1000."], "1000 veces");
  X("c8", 2, "Con E = 119 627 / λ (E en kJ por mol de fotones y λ en nm), ¿cuánta energía tiene un mol de fotones de 680 nm?", "E (kJ/mol) =", 175.9, "kJ/mol", ["E = 119 627 / 680.", "E = 175,9 kJ/mol."], "≈ 175,9 kJ/mol", 0.005);
  X("c9", 2, "En oscuridad, una hoja consume 3 µL de O₂/h. Con luz, libera 5 µL de O₂/h (neto). ¿Cuál es la fotosíntesis bruta?", "Bruta (µL/h) =", 8, "µL/h", ["Respiración = 3 µL/h.", "Bruta = neta + respiración = 5 + 3 = 8."], "8 µL/h");
  X("c10", 2, "O₂ neto de una hoja: −1,5 µL/h a 40 µmol de luz y +0,5 µL/h a 80 µmol (entre los dos puntos la curva es una recta). ¿Cuál es el punto de compensación (µmol)?", "Luz (µmol) =", 70, "µmol", ["Pasa de −1,5 a +0,5: 2 unidades en 40 µmol.", "Para llegar a 0 hacen falta 1,5 / 2 · 40 = 30 µmol más.", "40 + 30 = 70 µmol."], "70 µmol");
  V("c11", 2, "En el flujo cíclico de electrones se forma NADPH.", false, ["No: el electrón vuelve al P700 y el NADP⁺ no se reduce", "Sí: la ferredoxina reduce el NADP⁺", "Sí, y también O₂", "Sí, porque actúa el PSII"], 0, ["Solo actúa el PSI y el electrón da vueltas: se forma ATP."]);
  M("c12", 2, "Une cada producto con el flujo de electrones que lo forma.",
    [C("O₂", ["Solo flujo acíclico", "Solo flujo cíclico", "Ambos"], 0), C("NADPH", ["Solo flujo acíclico", "Solo flujo cíclico", "Ambos"], 0), C("ATP", ["Ambos", "Solo flujo acíclico", "Solo flujo cíclico"], 0)],
    ["El O₂ sale de la fotólisis, que solo ocurre en el acíclico.", "El NADPH se forma al final del acíclico.", "Los dos bombean H⁺ y fabrican ATP."], "O₂ y NADPH → acíclico; ATP → ambos");
  O("c13", 2, "En una curva de luz, la meseta (zona plana) indica que…", ["la luz ya no limita: lo hace otro factor", "la planta ha muerto", "no hay fotosíntesis", "la respiración es nula"], 0, ["Es la saturación luminosa: limita el CO₂ o la temperatura."], "La luz ya no limita");
  O("c14", 2, "Una planta CAM abre los estomas…", ["de noche", "de día", "al mediodía", "solo cuando llueve"], 0, ["Así pierde menos agua; guarda el CO₂ como malato."], "De noche");
  M("c15", 2, "Ordena las etapas del ciclo de Calvin.",
    [C("Primero", ["Carboxilación", "Reducción", "Regeneración"], 0), C("Después", ["Reducción", "Carboxilación", "Regeneración"], 0), C("Por último", ["Regeneración", "Carboxilación", "Reducción"], 0)],
    ["El CO₂ se une a la RuBP.", "El 3-PGA se reduce a G3P con ATP y NADPH.", "5 de cada 6 G3P regeneran la RuBP."], "Carboxilación → reducción → regeneración");
  X("c16", 2, "¿Qué cociente ATP/NADPH necesita el ciclo de Calvin (18 ATP y 12 NADPH por glucosa)?", "ATP/NADPH =", 1.5, "", ["18 / 12 = 1,5.", "El flujo acíclico por sí solo da ≈ 1,3–1,5, según el número de H⁺ por ATP: el cíclico corrige el déficit."], "1,5");
  V("c17", 2, "Las plantas C4 separan el uso de la PEP carboxilasa y de la RuBisCO en el espacio.", true, ["La PEP carboxilasa actúa en el mesófilo y la RuBisCO, en la vaina", "La PEP carboxilasa actúa de noche y la RuBisCO de día", "Solo usan la PEP carboxilasa", "Las dos enzimas actúan en la misma célula"], 0, ["Mesófilo: oxalacetato y malato. Vaina: se libera CO₂ y entra al ciclo de Calvin."]);
  O("c18", 2, "En el cloroplasto, los H⁺ se acumulan…", ["en el lumen del tilacoide", "en el estroma", "en el espacio intermembrana mitocondrial", "en el citosol"], 0, ["Y vuelven al estroma por la ATP sintasa."], "En el lumen");
  X("c19", 2, "En una planta C4 se gastan unos 5 ATP por CO₂. ¿Cuántos ATP se gastan para fabricar 1 glucosa?", "ATP =", 30, "", ["6 CO₂ · 5 ATP = 30 ATP.", "Son 12 más que en una C3 (18 ATP)."], "30 ATP (frente a 18 en C3)");
  X("c20", 2, "¿Cuántos G3P salen netos del ciclo de Calvin al fijar 9 CO₂?", "G3P =", 3, "", ["Cada 3 CO₂ producen 1 G3P neto.", "9 / 3 = 3."], "3 G3P");

  // ---- nivel 3
  X("d1", 3, "Una glucosa almacena 2870 kJ/mol y hacen falta como mínimo 48 mol de fotones de 680 nm (175,9 kJ/mol cada uno). ¿Cuál es el rendimiento máximo teórico en %?", "Rendimiento (%) =", 34, "%", ["Energía luminosa: 48 · 175,9 = 8443 kJ.", "2870 / 8443 = 0,34.", "≈ 34 %."], "≈ 34 %", 0.01);
  X("d2", 3, "Cada electrón que va del agua al NADPH recibe dos fotones (uno en cada fotosistema). ¿Cuántos fotones se necesitan, como mínimo, para fabricar 1 glucosa (12 NADPH)?", "Fotones =", 48, "", ["12 NADPH = 24 e⁻.", "24 · 2 = 48 fotones."], "48 fotones");
  X("d3", 3, "En 3 vueltas del ciclo de Calvin se gastan 9 ATP y se obtiene 1 G3P (que contiene un fosfato). ¿Cuántos P<sub>i</sub> libres se forman?", "Pi libres =", 8, "", ["9 ATP → 9 ADP + 9 P<sub>i</sub>.", "Un fosfato queda en el G3P: 9 − 1 = 8."], "8 P<sub>i</sub>");
  X("d4", 3, "Se alimenta una planta con 6 moléculas de CO₂ con todos sus oxígenos marcados con ¹⁸O (12 átomos). Si la glucosa conserva 6 átomos de O, ¿cuántos átomos de ¹⁸O acaban en el agua que se forma en el Calvin?", "Átomos de ¹⁸O =", 6, "", ["12 átomos de O entran con el CO₂.", "6 quedan en la glucosa.", "Los otros 6 salen en 6 H₂O."], "6 átomos (y ninguno en el O₂)");
  X("d5", 3, "Una hoja a 1200 µmol libera 6,0 µL de O₂/h (neto) y gasta 2,0 µL/h respirando. ¿Qué porcentaje de la fotosíntesis bruta consume la respiración?", "Porcentaje (%) =", 25, "%", ["Bruta = 6,0 + 2,0 = 8,0.", "2,0 / 8,0 = 0,25."], "25 %");
  X("d6", 3, "Modelo del simulador: planta C3, con luz = 500 µmol/m²s, CO₂ = 400 ppm y 25 °C. Luz: min(100, 100·I/1000); CO₂: min(100, C/6); temperatura: 100·exp(−((T−30)/15)²). La velocidad es la menor de las tres. ¿Cuánto vale (%)?", "Velocidad (%) =", 50, "%", ["Luz: 50 %.", "CO₂: 400 / 6 = 66,7 %.", "Temperatura: 100·exp(−(5/15)²) = 89,5 %.", "La menor es 50 %: limita la luz."], "50 % (limita la luz)", 0.01);
  X("d7", 3, "Con el mismo modelo, planta C3 a 1500 µmol, 400 ppm y 30 °C. ¿Cuánto vale la velocidad (%)?", "Velocidad (%) =", 66.7, "%", ["Luz: 100 %.", "CO₂: 400 / 6 = 66,7 %.", "Temperatura: 100 % (30 °C es el óptimo).", "Limita el CO₂: 66,7 %."], "66,7 % (limita el CO₂)", 0.005);
  X("d8", 3, "Con el mismo modelo, planta C3 a 1500 µmol, 800 ppm y 10 °C. ¿Cuánto vale la velocidad (%)?", "Velocidad (%) =", 16.9, "%", ["Luz: 100 %.", "CO₂: min(100, 800/6) = 100 %.", "Temperatura: 100·exp(−(20/15)²) = 16,9 %.", "Limita la temperatura."], "16,9 % (limita la temperatura)", 0.01);
  X("d9", 3, "Planta C4 (luz: min(100, 100·I/1500); CO₂: min(100, C/2); temperatura: 100·exp(−((T−35)/15)²)), con 750 µmol, 400 ppm y 35 °C. ¿Cuánto vale la velocidad (%)?", "Velocidad (%) =", 50, "%", ["Luz: 100·750/1500 = 50 %.", "CO₂: min(100, 200) = 100 %.", "Temperatura: 100 % (35 °C es su óptimo).", "Limita la luz: 50 %."], "50 % (limita la luz)", 0.01);
  O("d10", 3, "Una planta con calor y sequía fotosintetiza menos y su fotorrespiración sube. ¿Cuál es la explicación correcta?", ["Cierra los estomas: baja el CO₂ y sube el O₂ en la hoja, y la RuBisCO fija más O₂", "La RuBisCO deja de existir con calor", "Entra demasiado CO₂", "Se cierran los estomas y la fase luminosa no ocurre"], 0, ["Los estomas cerrados dejan entrar poco CO₂ y se acumula el O₂ de la fotólisis.", "La RuBisCO (carboxilasa/oxigenasa) compite entre CO₂ y O₂."], "Estomas cerrados → baja CO₂/O₂ alto → fotorrespiración");
  R("d11", "Describe la fase luminosa de la fotosíntesis: lugar, fotosistemas, flujo acíclico y cíclico y productos. (Pregunta tipo PAU)", [
    { t: "Lugar: membrana de los tilacoides; necesita luz", p: 0.3 },
    { t: "Fotosistemas II y I (antena y centro de reacción) y fotólisis del agua con liberación de O₂", p: 0.5 },
    { t: "Cadena de transporte hasta el NADP⁺ y bombeo de H⁺ al lumen (b₆f)", p: 0.4 },
    { t: "Fotofosforilación: ATP sintasa con el gradiente de H⁺", p: 0.4 },
    { t: "Flujo cíclico (solo PSI, solo ATP) frente al acíclico (ATP, NADPH y O₂)", p: 0.4 }], ["Lugar.", "Fotosistemas y fotólisis.", "Cadena y H⁺.", "ATP sintasa.", "Cíclico frente a acíclico."], "Luminosa: tilacoide, ATP + NADPH + O₂");
  R("d12", "Explica el ciclo de Calvin: etapas, enzima clave y balance por molécula de glucosa. (Pregunta tipo PAU)", [
    { t: "Lugar: estroma; no necesita luz directa pero sí ATP y NADPH", p: 0.3 },
    { t: "Carboxilación: RuBisCO, RuBP (5 C) + CO₂ → 2 3-PGA", p: 0.5 },
    { t: "Reducción del 3-PGA a G3P con ATP y NADPH", p: 0.4 },
    { t: "Regeneración de la RuBP (con ATP); 1 de cada 6 G3P sale", p: 0.4 },
    { t: "Balance: 6 CO₂, 18 ATP y 12 NADPH por glucosa", p: 0.4 }], ["Lugar.", "Carboxilación.", "Reducción.", "Regeneración.", "Balance."], "Calvin: fija CO₂, gasta 18 ATP + 12 NADPH por glucosa");
  R("d13", "¿Qué es la fotorrespiración? Explica cómo la evitan las plantas C4 y CAM. (Pregunta tipo PAU)", [
    { t: "Definición: la RuBisCO fija O₂ y se libera CO₂ con gasto de ATP", p: 0.5 },
    { t: "Cuándo ocurre: calor y sequía, estomas cerrados, O₂/CO₂ alto", p: 0.4 },
    { t: "C4: PEP carboxilasa en el mesófilo, malato y CO₂ concentrado en la vaina (espacio)", p: 0.5 },
    { t: "CAM: estomas abiertos de noche, malato en la vacuola; Calvin de día (tiempo)", p: 0.5 },
    { t: "Ejemplos de plantas", p: 0.1 }], ["Definición.", "Cuándo.", "C4.", "CAM."], "C4: espacio; CAM: tiempo");
  R("d14", "En un experimento se miden el O₂ neto y la luz en un alga: a oscuridad −2 µL/h, punto de compensación a 100 µmol y meseta de +6 µL/h desde 800 µmol. Interpreta la curva y propón cómo averiguar qué factor limita en la meseta. (Pregunta tipo PAU)", [
    { t: "Oscuridad: solo respira, O₂ neto negativo (−2)", p: 0.4 },
    { t: "Punto de compensación: fotosíntesis = respiración, neta 0", p: 0.5 },
    { t: "Fotosíntesis bruta = neta + respiración (en la meseta: 6 + 2 = 8)", p: 0.4 },
    { t: "Meseta: la luz ya no limita (saturación luminosa)", p: 0.4 },
    { t: "Experimento: subir CO₂ o temperatura por separado; si sube, ese factor limitaba", p: 0.3 }], ["Oscuridad.", "Compensación.", "Bruta.", "Meseta.", "Experimento."], "Neta + respiración = bruta; meseta = limita otro factor");
  R("d15", "Define quimiosíntesis, pon dos ejemplos con las transformaciones que realizan y explica su importancia ecológica. (Pregunta tipo PAU)", [
    { t: "Definición: fijar CO₂ con la energía de oxidar compuestos inorgánicos, sin luz", p: 0.5 },
    { t: "Dos fases: obtención de energía (ATP, poder reductor) y fijación del CO₂ (Calvin)", p: 0.4 },
    { t: "Ejemplo nitrificantes: NH₄⁺ → NO₂⁻ (Nitrosomonas) y NO₂⁻ → NO₃⁻ (Nitrobacter)", p: 0.4 },
    { t: "Otro ejemplo: sulfobacterias (H₂S → S) o ferrobacterias (Fe²⁺ → Fe³⁺)", p: 0.3 },
    { t: "Importancia: ciclo del N y ecosistemas de fuentes hidrotermales", p: 0.4 }], ["Definición.", "Fases.", "Nitrificantes.", "Otros.", "Importancia."], "Quimiosíntesis: energía inorgánica, CO₂ → materia orgánica");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Fase luminosa y fase oscura", ancha: true,
      tabla: { cab: ["", "Luminosa", "Oscura (Calvin)"], filas: [
        ["lugar", "tilacoides", "estroma"],
        ["necesita", "luz y agua", "ATP, NADPH y CO₂"],
        ["productos", "ATP, NADPH, O₂", "glúcidos (G3P)"]
      ] } },
    { titulo: "Flujo acíclico y cíclico", ancha: true,
      tabla: { cab: ["", "Acíclico", "Cíclico"], filas: [
        ["fotosistemas", "II y I", "solo I"],
        ["O₂ y NADPH", "sí", "no"],
        ["ATP", "sí", "sí"]
      ] } },
    { titulo: "El ciclo de Calvin",
      pasos: ["Carboxilación: CO₂ + RuBP → 2 3-PGA (RuBisCO).", "Reducción: 3-PGA → G3P (ATP y NADPH).", "Regeneración de la RuBP (ATP)."],
      nota: "Por glucosa: 6 CO₂, 18 ATP y 12 NADPH." },
    { titulo: "C3, C4 y CAM", ancha: true,
      tabla: { cab: ["", "C3", "C4", "CAM"], filas: [
        ["ejemplo", "trigo", "maíz", "cactus"],
        ["estomas", "de día", "de día", "de noche"],
        ["separación", "no", "espacio", "tiempo"]
      ] } },
    { titulo: "Fotosíntesis y respiración", ancha: true,
      tabla: { cab: ["", "Fotosíntesis", "Respiración"], filas: [
        ["orgánulo", "cloroplasto", "mitocondria"],
        ["coenzima", "NADPH", "NADH"],
        ["O₂", "se libera", "se consume"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El O₂ sale del CO₂", bien: "Sale del agua (fotólisis)", por: "Ruben y Kamen, con ¹⁸O." },
        { mal: "La fase oscura es de noche", bien: "No necesita luz directa, pero sí ATP y NADPH", por: "Funciona con luz." },
        { mal: "El flujo cíclico fabrica NADPH", bien: "Solo fabrica ATP", por: "Solo actúa el PSI." },
        { mal: "Las CAM abren los estomas de día", bien: "De noche", por: "Para perder menos agua." }
      ] }
  ];

  B.registrar("bio2", "t9", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio9a.secciones,
    nuevas: B.parte.bio9a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
