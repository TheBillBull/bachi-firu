/* ============================================================
   Biología II · ampliaciones · Tema 1 (parte B): Bioelementos y biomoléculas inorgánicas
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y las cifras las recalcula herramientas/verificar_bio2_t1.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Los <b>bioelementos</b> se dividen en primarios (C, H, O, N, P, S), secundarios (Ca, Na, K, Cl, Mg) y oligoelementos (Fe, I, F, Zn, Cu…); el carbono es la base de la vida por sus <b>cuatro enlaces</b>.",
    "El <b>agua</b> es polar y forma <b>puentes de hidrógeno</b>: de ahí su calor específico y de vaporización altos, la cohesión, la densidad máxima a 4 °C y su poder disolvente.",
    "Las <b>sales minerales</b> pueden ser precipitadas (huesos, conchas), disueltas (osmosis, impulso nervioso, tampón) o asociadas a moléculas (Fe en la hemoglobina).",
    "El <b>pH</b> (−log [H⁺]) se mantiene estable gracias a <b>tampones</b> como el bicarbonato; y la <b>ósmosis</b> mueve el agua hacia el medio con más soluto."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Bioelementos y biomoléculas inorgánicas",
    autores: [
      { n: "Qué estudia", f: "los componentes inorgánicos de la materia viva", l: "agua · sales · pH · ósmosis" },
      { n: "Nollet", f: "1748", l: "primera observación de la ósmosis" },
      { n: "Sørensen", f: "1909", l: "propone la escala de pH" }
    ],
    obras: ["Bioelementos", "Puente de hidrógeno", "Sales minerales", "pH y tampón", "Ósmosis"],
    bloques: [
      { t: "Bioelementos", frases: ["Primarios (≈ 96 % entre C, H, O, N): forman las biomoléculas orgánicas.", "El carbono forma <b>4 enlaces</b> y cadenas estables.", "Un oligoelemento es necesario aunque haga falta poco."],
        tabla: { cab: ["Grupo", "Ejemplos"], filas: [["Primarios", "C, H, O, N, P, S"], ["Secundarios", "Ca, Na, K, Cl, Mg"], ["Oligoelementos", "Fe, I, F, Zn, Cu"]] } },
      { t: "El agua", frases: ["Molécula <b>polar</b>; une moléculas con <b>puentes de H</b>.", "Es ≈ 60–70 % del cuerpo adulto.", "No disuelve lo apolar (grasas)."],
        tabla: { cab: ["Propiedad", "Utilidad"], filas: [["calor específico alto", "amortigua la temperatura"], ["calor de vaporización alto", "el sudor refrigera"], ["cohesión y adhesión", "ascenso de la savia"], ["hielo menos denso", "la vida bajo el hielo"]] } },
      { t: "Sales minerales", frases: ["<b>Precipitadas:</b> huesos, conchas (fosfato y carbonato cálcico).", "<b>Disueltas:</b> osmosis, impulso nervioso, pH.", "<b>Asociadas:</b> Fe en hemoglobina, Mg en clorofila."] },
      { t: "pH y tampón", frases: ["pH = −log [H⁺]; escala <b>logarítmica</b> (1 unidad = ×10).", "Sangre: pH 7,35–7,45.", "El tampón (HCO₃⁻ / H₂CO₃) amortigua los cambios."] },
      { t: "Ósmosis", frases: ["Pasa <b>agua</b> por una membrana semipermeable hacia el medio con <b>más soluto</b>.", "Se compara el <b>medio</b> con la <b>célula</b>.", "La pared evita que la célula vegetal estalle."],
        tabla: { cab: ["Medio", "Hematíe"], filas: [["hipotónico", "hemólisis"], ["isotónico", "forma normal"], ["hipertónico", "crenación"]] } },
      { t: "Cálculos", frases: ["% p/v = g por 100 mL; M = mol/L.", "Osmolaridad = M · partículas por fórmula (NaCl: 2).", "Dilución: C₁·V₁ = C₂·V₂."] }
    ],
    resumen: [
      "Todo nace de la <b>polaridad del agua</b> y de sus <b>puentes de hidrógeno</b>.",
      "Las <b>sales</b> dan estructura, regulan la ósmosis y participan en el impulso nervioso.",
      "El <b>pH</b> se estabiliza con tampones; la <b>ósmosis</b> depende de la concentración de partículas."
    ],
    conecta: [
      { con: "Biología T2–T5:", rel: "las biomoléculas orgánicas (glúcidos, lípidos, proteínas, ácidos nucleicos)." },
      { con: "Biología T6:", rel: "membrana y transporte pasivo de agua y solutos." },
      { con: "Química II T7:", rel: "pH, ácidos y bases, y disoluciones tampón." },
      { con: "Química II T1:", rel: "mol, molaridad y diluciones." }
    ],
    claves: [
      ["Bioelemento", "elemento químico presente en los seres vivos"],
      ["Oligoelemento", "bioelemento que representa menos del 0,1 % pero es imprescindible"],
      ["Puente de hidrógeno", "atracción débil entre un H unido a O o N y otro O o N"],
      ["Calor específico", "energía para subir 1 °C la temperatura de 1 g de sustancia"],
      ["Sal precipitada", "sal sólida e insoluble con función estructural"],
      ["pH", "−log [H⁺]; mide la acidez"],
      ["Tampón", "mezcla ácido débil y su base que amortigua el pH"],
      ["Ósmosis", "paso de disolvente por una membrana semipermeable hacia el medio más concentrado"],
      ["Medio hipotónico", "tiene menos soluto que la célula: el agua entra"],
      ["Turgencia / plasmólisis", "célula vegetal llena de agua / con la membrana separada de la pared"]
    ],
    cita: { txt: "El hielo flota: por eso los lagos se congelan de arriba abajo y la vida sigue viva debajo.", autor: "Dato para recordar", obra: "densidad del hielo 0,92 g/cm³; la del agua a 4 °C, 1,00 g/cm³" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    agua: {
      titulo: "Propiedad del agua y su consecuencia",
      consigna: "Une cada propiedad del agua con su importancia biológica.",
      pares: [
        ["Alto calor específico", "Amortigua los cambios de temperatura"],
        ["Alto calor de vaporización", "El sudor refrigera el cuerpo"],
        ["Cohesión", "Mantiene unida la columna de savia"],
        ["Hielo menos denso que el agua", "Los lagos no se congelan hasta el fondo"],
        ["Polaridad", "Disuelve sales y sustancias polares"]
      ]
    },
    grupos: {
      titulo: "¿Primario, secundario u oligoelemento?",
      consigna: "Clasifica cada bioelemento en su grupo.",
      categorias: ["Primario", "Secundario", "Oligoelemento"],
      items: [
        { t: "Carbono", c: 0 }, { t: "Nitrógeno", c: 0 }, { t: "Fósforo", c: 0 },
        { t: "Calcio", c: 1 }, { t: "Potasio", c: 1 }, { t: "Magnesio", c: 1 },
        { t: "Hierro", c: 2 }, { t: "Yodo", c: 2 }, { t: "Flúor", c: 2 }
      ]
    },
    biomol: {
      titulo: "Bioelemento o biomolécula",
      consigna: "Distingue el átomo, la biomolécula inorgánica y la biomolécula orgánica.",
      categorias: ["Bioelemento", "Biomolécula inorgánica", "Biomolécula orgánica"],
      items: [
        { t: "Calcio (Ca)", c: 0 }, { t: "Hierro (Fe)", c: 0 },
        { t: "Agua", c: 1 }, { t: "Fosfato cálcico", c: 1 }, { t: "Cloruro sódico", c: 1 },
        { t: "Glucosa", c: 2 }, { t: "Colesterol", c: 2 }, { t: "ADN", c: 2 }
      ]
    },
    medios: {
      titulo: "¿Hacia dónde va el agua?",
      consigna: "Mira cada caso y di si entra agua en la célula, no hay flujo neto, o sale agua.",
      categorias: ["Entra agua (medio hipotónico)", "Sin flujo neto (isotónico)", "Sale agua (medio hipertónico)"],
      items: [
        { t: "Hematíe en agua destilada", c: 0 },
        { t: "Hematíe en suero (NaCl 0,9 %)", c: 1 },
        { t: "Hematíe en NaCl al 3 %", c: 2 },
        { t: "Lechuga mustia en agua", c: 0 },
        { t: "Bacteria en salmuera", c: 2 },
        { t: "Babosa con sal encima", c: 2 }
      ]
    },
    ordenhemolisis: {
      titulo: "Un hematíe en agua destilada",
      consigna: "Ordena lo que ocurre, desde el principio.",
      items: [
        { t: "El medio tiene menos solutos que la célula (hipotónico)" },
        { t: "El agua entra por ósmosis" },
        { t: "El hematíe se hincha" },
        { t: "La membrana no resiste la presión" },
        { t: "Hemólisis: el hematíe estalla" }
      ]
    },
    quiz1: {
      titulo: "Test del tema 1",
      preguntas: [
        { q: "¿Por qué el carbono es el elemento base de las biomoléculas orgánicas?", op: ["Forma cuatro enlaces covalentes estables y cadenas largas", "Es el elemento más abundante en la corteza terrestre", "Forma enlaces iónicos con el hidrógeno", "Es muy soluble en agua"], ok: 0, porque: "La tetravalencia permite cadenas, ramificaciones y anillos." },
        { q: "El hierro es un…", op: ["oligoelemento", "bioelemento primario", "bioelemento secundario", "gas del aire"], ok: 0, porque: "Hay muy poco, pero es imprescindible (hemoglobina)." },
        { q: "La enorme cohesión del agua se debe a…", op: ["los puentes de hidrógeno", "los enlaces iónicos entre H y O", "su baja polaridad", "su alta densidad"], ok: 0, porque: "Cada molécula se une a otras por puentes de H." },
        { q: "El fosfato cálcico de los huesos es una sal…", op: ["precipitada", "disuelta", "asociada a una proteína", "orgánica"], ok: 0, porque: "Es sólida e insoluble: función estructural." },
        { q: "Si el pH baja de 6 a 4, la concentración de H⁺…", op: ["se multiplica por 100", "se multiplica por 2", "se divide por 100", "no cambia"], ok: 0, porque: "Cada unidad de pH es un factor 10; dos unidades, 100." },
        { q: "Un sistema tampón…", op: ["amortigua los cambios de pH", "impide totalmente que cambie el pH", "solo sube el pH", "sustituye a las enzimas"], ok: 0, porque: "Resiste el cambio, pero no lo evita del todo." },
        { q: "La ósmosis es el paso de…", op: ["agua por una membrana semipermeable hacia el medio más concentrado", "soluto por una membrana hacia el medio menos concentrado", "agua hacia el medio menos concentrado", "gases por una membrana, gastando ATP"], ok: 0, porque: "Pasa el disolvente hacia donde hay más soluto." },
        { q: "Una célula vegetal en agua destilada…", op: ["se vuelve turgente y no estalla", "estalla", "sufre plasmólisis", "se arruga"], ok: 0, porque: "La pared celular soporta la presión." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre el agua es FALSA?", op: ["El agua disuelve bien las grasas porque es polar", "El agua es una molécula polar", "El hielo es menos denso que el agua líquida", "El agua tiene un calor específico alto"], ok: 0, porque: "Las grasas son apolares: no se disuelven en agua." },
        { q: "¿Cuál de estas afirmaciones sobre los oligoelementos es FALSA?", op: ["Son poco importantes porque hay muy poco", "Su proporción es menor del 0,1 %", "El yodo es uno de ellos", "Su carencia puede causar enfermedad"], ok: 0, porque: "Hacen falta en poca cantidad, pero son imprescindibles." },
        { q: "¿Cuál de estas afirmaciones sobre el pH es FALSA?", op: ["Un pH 3 es el doble de ácido que un pH 6", "pH = −log [H⁺]", "Un pH de 7 es neutro a 25 °C", "La sangre tiene pH ≈ 7,4"], ok: 0, porque: "Es 1000 veces más ácido: escala logarítmica." },
        { q: "¿Cuál de estas afirmaciones sobre la ósmosis es FALSA?", op: ["Pasa soluto hacia el medio con menos concentración", "Pasa agua por una membrana semipermeable", "El agua se desplaza hacia el medio hipertónico", "No gasta energía de la célula"], ok: 0, porque: "Lo que se mueve es el agua, no el soluto." },
        { q: "¿Cuál de estas afirmaciones sobre el hematíe es FALSA?", op: ["En agua salada al 3 % se hincha y estalla", "En agua destilada sufre hemólisis", "En NaCl al 0,9 % mantiene su forma", "En un medio hipertónico sufre crenación"], ok: 0, porque: "En un medio hipertónico pierde agua y se arruga." },
        { q: "¿Cuál de estas afirmaciones sobre las sales minerales es FALSA?", op: ["Las sales disueltas forman los huesos", "El carbonato cálcico forma conchas", "El Fe²⁺ está asociado a la hemoglobina", "El Na⁺ y el K⁺ intervienen en el impulso nervioso"], ok: 0, porque: "Los huesos son de sales precipitadas, no disueltas." },
        { q: "¿Cuál de estas afirmaciones sobre los tampones es FALSA?", op: ["Un tampón impide por completo cualquier cambio de pH", "El bicarbonato es un tampón de la sangre", "Un tampón mezcla un ácido débil y su base", "Si sobran H⁺, el bicarbonato los capta"], ok: 0, porque: "Amortigua, no anula, y se puede agotar." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: bioelementos, agua y ósmosis",
      cartas: [
        { a: "Bioelementos primarios", b: "C, H, O, N, P, S. Forman las biomoléculas orgánicas." },
        { a: "Oligoelemento", b: "Menos del 0,1 %, pero imprescindible: Fe (hemoglobina), I (tiroides), F (esmalte)." },
        { a: "Puente de hidrógeno", b: "Atracción débil entre el H de una molécula y un O o N de otra. Muy numerosos en el agua." },
        { a: "Calor específico del agua", b: "1 cal/g·°C (4,18 J/g·°C): amortigua la temperatura." },
        { a: "Calor de vaporización del agua", b: "≈ 540 cal/g: por eso el sudor refrigera." },
        { a: "Disolución, coloide, suspensión", b: "Partículas muy pequeñas / intermedias (efecto Tyndall) / grandes que sedimentan." },
        { a: "Sustancia anfipática", b: "Con una parte hidrófila y otra hidrófoba (fosfolípidos)." },
        { a: "Sal precipitada, disuelta y asociada", b: "Sólida estructural / iones libres / unida a una molécula (Fe en hemoglobina)." },
        { a: "pH", b: "−log [H⁺]. pH + pOH = 14. Escala logarítmica." },
        { a: "Tampón", b: "Ácido débil + su base: amortigua el pH. Sangre: bicarbonato, pH 7,4." },
        { a: "Medio hipotónico", b: "Menos soluto que la célula: el agua entra." },
        { a: "Medio hipertónico", b: "Más soluto que la célula: el agua sale." },
        { a: "Hemólisis y crenación", b: "Hematíe que estalla (hipotónico) y que se arruga (hipertónico)." },
        { a: "Turgencia y plasmólisis", b: "Célula vegetal hinchada contra la pared (hipotónico) / con la membrana despegada (hipertónico)." },
        { a: "Osmolaridad", b: "Moles de partículas por litro. NaCl 0,9 % ≈ 308 mOsm/L." }
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
  O("b1", 1, "¿Cuál de estos grupos contiene solo bioelementos primarios?", ["C, H, O, N", "Ca, Na, K, Cl", "Fe, I, Cu, Zn", "C, Ca, Fe, I"], 0, ["Los primarios son C, H, O, N, P y S.", "Ca, Na, K y Cl son secundarios; Fe, I, Cu y Zn, oligoelementos."], "C, H, O, N");
  O("b2", 1, "El yodo es necesario para fabricar hormonas de la tiroides. Es un…", ["oligoelemento", "bioelemento primario", "bioelemento secundario", "biomolécula orgánica"], 0, ["Se necesita en cantidades muy pequeñas (< 0,1 %).", "Su falta causa bocio."], "Oligoelemento");
  O("b3", 1, "¿Qué característica del carbono explica que forme moléculas tan variadas?", ["Puede formar cuatro enlaces covalentes", "Forma iones C⁺", "Es un gas", "Es un metal"], 0, ["Con cuatro enlaces forma cadenas, ramas y anillos."], "Cuatro enlaces covalentes (tetravalencia)");
  O("b4", 1, "¿Qué enlace débil une unas moléculas de agua con otras?", ["Puente de hidrógeno", "Enlace iónico", "Enlace covalente", "Enlace metálico"], 0, ["El H (δ⁺) de una molécula atrae al O (δ⁻) de otra."], "Puente de hidrógeno");
  O("b5", 1, "El sudor refrigera el cuerpo gracias al…", ["alto calor de vaporización del agua", "alto calor específico del agua", "baja polaridad del agua", "hielo menos denso"], 0, ["Al evaporarse, cada gramo de agua se lleva ≈ 540 cal."], "Alto calor de vaporización");
  O("b6", 1, "El carbonato cálcico de la concha de un caracol es una sal…", ["precipitada", "disuelta", "asociada a una proteína", "apolar"], 0, ["Es sólida e insoluble y tiene función estructural."], "Sal precipitada");
  O("b7", 1, "Una disolución con pH 3 es…", ["ácida", "neutra", "básica", "un tampón"], 0, ["pH < 7 es ácido; 7, neutro; > 7, básico."], "Ácida");
  O("b8", 1, "¿Cómo se llama el estallido de un glóbulo rojo en agua destilada?", ["Hemólisis", "Crenación", "Plasmólisis", "Turgencia"], 0, ["Entra agua por ósmosis y la membrana no resiste."], "Hemólisis");
  V("b9", 1, "El agua es una molécula apolar.", false, ["El oxígeno atrae más a los electrones: queda δ⁻ y los H, δ⁺: es polar", "Tiene forma lineal y las cargas se anulan", "No forma puentes de hidrógeno", "Es un ion"], 0, ["Tiene forma de «V» (≈ 104,5°): las cargas parciales no se anulan."]);
  V("b10", 1, "El hielo flota sobre el agua líquida porque es menos denso.", true, ["Sus puentes de H forman una red abierta que ocupa más volumen", "Está formado por moléculas más ligeras", "Contiene aire", "Tiene sales disueltas"], 0, ["En el hielo, cada molécula forma 4 puentes de H en una red abierta."]);
  T("b11", 1, "El oligoelemento que forma parte de la hemoglobina y transporta el oxígeno es el…", "Elemento", ["hierro", "Fe"], ["Se encuentra en el grupo hemo de la hemoglobina."], "Hierro (Fe)");
  T("b12", 1, "Completa: si el medio tiene menos soluto que la célula, se llama…", "Medio", ["hipotónico", "hipotonico"], ["Hipo = por debajo; el agua entra en la célula."], "Hipotónico");
  O("b13", 1, "¿Por qué una célula vegetal en agua destilada no estalla?", ["Porque tiene pared celular", "Porque no tiene membrana", "Porque el agua no puede entrar", "Porque tiene mucha sal"], 0, ["La pared celular de celulosa resiste la presión (turgencia)."], "Por la pared celular");
  M("b14", 1, "Une cada elemento con su función.",
    [C("Calcio (Ca)", ["Huesos y contracción muscular", "Centro de la clorofila", "Hormonas tiroideas"], 0), C("Magnesio (Mg)", ["Centro de la clorofila", "Huesos y contracción muscular", "Hormonas tiroideas"], 0), C("Yodo (I)", ["Hormonas tiroideas", "Centro de la clorofila", "Huesos y contracción muscular"], 0)],
    ["El Ca es secundario (huesos, músculo); el Mg es secundario (clorofila); el I, oligoelemento (tiroxina)."], "Ca → huesos y músculo; Mg → clorofila; I → tiroides");
  O("b15", 1, "Un sistema tampón sirve para…", ["amortiguar los cambios de pH", "aumentar la temperatura", "transportar oxígeno", "producir energía"], 0, ["Mezcla un ácido débil y su base y resiste los cambios de pH."], "Amortiguar el pH");
  X("b16", 1, "Se disuelven 9 g de NaCl en agua hasta completar 1 litro de disolución. ¿Cuál es su concentración en % p/v?", "% p/v =", 0.9, "%", ["% p/v = g de soluto por 100 mL.", "9 g en 1000 mL son 0,9 g en 100 mL."], "0,9 % p/v (suero fisiológico)");

  // ---- nivel 2
  X("c1", 2, "¿Cuántos gramos de NaCl hacen falta para preparar 250 mL de suero fisiológico al 0,9 % p/v?", "m (g) =", 2.25, "g", ["0,9 g por cada 100 mL.", "250 mL → 0,9 · 250 / 100 = 2,25 g."], "2,25 g");
  X("c2", 2, "Calcula la molaridad de un suero de NaCl al 0,9 % p/v (M<sub>r</sub> = 58,44).", "M (mol/L) =", 0.154, "mol/L", ["9 g/L.", "n = 9 / 58,44 = 0,154 mol.", "M = 0,154 mol/L."], "0,154 M", 0.01);
  X("c3", 2, "¿Cuál es el pH de una disolución con [H⁺] = 1·10⁻³ mol/L?", "pH =", 3, "", ["pH = −log [H⁺] = −log 10⁻³ = 3."], "pH = 3");
  X("c4", 2, "La sangre tiene pH 7,4. ¿Cuánto vale [H⁺]?", "[H⁺] (·10⁻⁸ mol/L) =", 3.98, "·10⁻⁸ mol/L", ["[H⁺] = 10^(−7,4).", "= 3,98·10⁻⁸ mol/L."], "[H⁺] = 3,98·10⁻⁸ mol/L", 0.01);
  X("c5", 2, "¿Cuántas veces más H⁺ hay en una disolución de pH 3 que en una de pH 6?", "Factor =", 1000, "veces", ["Diferencia de 3 unidades de pH.", "Cada unidad es ×10: 10³ = 1000."], "1000 veces");
  X("c6", 2, "¿Qué volumen de una disolución al 20 % hay que tomar para preparar 250 mL al 4 %?", "V (mL) =", 50, "mL", ["C₁·V₁ = C₂·V₂.", "20 · V₁ = 4 · 250 → V₁ = 50 mL."], "50 mL y se completa con agua hasta 250 mL");
  X("c7", 2, "¿Cuál es el pH de una disolución de HCl 0,01 M (ácido fuerte, totalmente ionizado)?", "pH =", 2, "", ["[H⁺] = 0,01 = 10⁻² mol/L.", "pH = 2."], "pH = 2");
  X("c8", 2, "Una disolución tiene [OH⁻] = 1·10⁻⁴ mol/L. ¿Cuál es su pH?", "pH =", 10, "", ["pOH = −log 10⁻⁴ = 4.", "pH = 14 − 4 = 10."], "pH = 10");
  X("c9", 2, "Densidad del agua a 4 °C: 1,000 g/cm³; del hielo: 0,917 g/cm³. Si 1000 g de agua se congelan, ¿en qué porcentaje aumenta su volumen?", "Aumento (%) =", 9.05, "%", ["V(agua) = 1000 cm³.", "V(hielo) = 1000 / 0,917 = 1090,5 cm³.", "Aumento = 90,5 / 1000 = 9,05 %."], "≈ 9 %", 0.02);
  X("c10", 2, "El 65 % del peso de una persona de 70 kg es agua. ¿Cuántos kilos de agua contiene?", "m (kg) =", 45.5, "kg", ["70 · 65 / 100 = 45,5 kg."], "45,5 kg");
  X("c11", 2, "Modelo simplificado: el volumen de un hematíe cambia como V = 308 / (osmolaridad externa en mOsm/L). Si se pone en NaCl al 1,8 % (616 mOsm/L), ¿qué fracción de su volumen original tendrá?", "V / V₀ =", 0.5, "", ["V = 308 / 616 = 0,5.", "El hematíe se reduce a la mitad: crenación."], "Mitad del volumen original", 0.01);
  X("c12", 2, "Una disolución de glucosa al 5 % p/v (M<sub>r</sub> = 180,16) no se ioniza. ¿Cuál es su osmolaridad en mOsm/L?", "Osmolaridad (mOsm/L) =", 277.5, "mOsm/L", ["50 g/L / 180,16 = 0,2775 mol/L.", "Una partícula por molécula → 277,5 mOsm/L (≈ isotónica)."], "≈ 277,5 mOsm/L", 0.01);
  O("c13", 2, "Un hematíe se pone en NaCl al 0,3 % (≈ 103 mOsm/L; el interior es ≈ 308). ¿Qué ocurre?", ["Se hincha porque el medio es hipotónico", "Se arruga porque el medio es hipertónico", "No cambia, es isotónico", "Se disuelve la sal dentro de él"], 0, ["103 mOsm/L < 308 mOsm/L: el medio es hipotónico.", "El agua entra y el hematíe se hincha; si fuera mucho menor, estallaría."], "Se hincha (medio hipotónico)");
  V("c14", 2, "Una célula vegetal puesta en agua destilada estalla igual que un glóbulo rojo.", false, ["Su pared celular resiste la presión y queda turgente", "Las células vegetales no tienen membrana", "El agua no puede atravesar la pared", "Tienen menos agua dentro"], 0, ["Entra agua, pero la pared celular de celulosa impide la rotura."]);
  M("c15", 2, "Une cada situación con el fenómeno.",
    [C("Hematíe en agua destilada", ["Hemólisis", "Crenación", "Plasmólisis"], 0), C("Hematíe en NaCl al 3 %", ["Crenación", "Hemólisis", "Plasmólisis"], 0), C("Célula vegetal en agua muy salada", ["Plasmólisis", "Hemólisis", "Turgencia"], 0)],
    ["Hipotónico: entra agua y estalla.", "Hipertónico: sale agua y se arruga.", "En la vegetal sale agua y la membrana se despega de la pared."], "Hemólisis; crenación; plasmólisis");
  M("c16", 2, "Ordena lo que hace el tampón bicarbonato cuando entran H⁺ en la sangre.",
    [C("Primero", ["Sube la concentración de H⁺", "El HCO₃⁻ capta H⁺ y forma H₂CO₃", "El CO₂ se elimina por los pulmones"], 0), C("Después", ["El HCO₃⁻ capta H⁺ y forma H₂CO₃", "Sube la concentración de H⁺", "El CO₂ se elimina por los pulmones"], 0), C("Por último", ["El CO₂ se elimina por los pulmones", "Sube la concentración de H⁺", "El HCO₃⁻ capta H⁺ y forma H₂CO₃"], 0)],
    ["Entran H⁺.", "El bicarbonato los capta (H⁺ + HCO₃⁻ → H₂CO₃).", "El H₂CO₃ se convierte en CO₂ + H₂O y se exhala."], "H⁺ entran → HCO₃⁻ los capta → se exhala CO₂");

  // ---- nivel 3
  X("d1", 3, "Con un calor de vaporización de 540 cal/g, ¿cuánto calor retira el cuerpo al evaporarse 50 g de sudor?", "Q (cal) =", 27000, "cal", ["Q = m · L = 50 g · 540 cal/g.", "Q = 27 000 cal = 27 kcal."], "27 000 cal");
  X("d2", 3, "En una acidosis, el bicarbonato baja a 18 mmol/L y el CO₂ disuelto se mantiene en 1,2 mmol/L. Calcula el pH con pH = 6,1 + log([HCO₃⁻]/[CO₂]).", "pH =", 7.28, "", ["Cociente: 18 / 1,2 = 15.", "log 15 = 1,176.", "pH = 6,1 + 1,176 = 7,28 (por debajo de 7,35: acidosis)."], "pH ≈ 7,28", 0.002);
  X("d3", 3, "A la sangre (24 mmol/L de HCO₃⁻ y 1,2 mmol/L de CO₂, que los pulmones mantienen) se añaden 2 mmol/L de H⁺, que gastan 2 mmol/L de HCO₃⁻. Calcula el pH.", "pH =", 7.36, "", ["HCO₃⁻ restante: 24 − 2 = 22 mmol/L.", "Cociente: 22 / 1,2 = 18,33; log = 1,263.", "pH = 6,1 + 1,263 = 7,36."], "pH ≈ 7,36", 0.002);
  X("d4", 3, "A 1 L de agua pura (pH 7) se añaden 0,1 mmol de HCl. Considerando [H⁺] = 10⁻⁷ + 10⁻⁴ mol/L, ¿cuál es el pH?", "pH =", 4, "", ["10⁻⁴ mol/L (0,1 mmol/L) más 10⁻⁷ casi no cambia el total: [H⁺] ≈ 1,001·10⁻⁴.", "pH = −log (1,001·10⁻⁴) ≈ 4,00.", "Sin tampón, 0,1 mmol baja el pH 3 unidades; en la sangre apenas 0,004."], "pH ≈ 4,00", 0.01);
  X("d5", 3, "Cilindros de patata en sacarosa cambian de masa así: 0,0 M: +10 %; 0,1 M: +4 %; 0,2 M: −4 %; 0,3 M: −10 %. Estima por interpolación lineal la concentración isotónica.", "c isotónica (M) =", 0.15, "M", ["Masa sin cambio = punto isotónico.", "Entre 0,1 M (+4 %) y 0,2 M (−4 %).", "0,1 + 0,1 · 4 / 8 = 0,15 M."], "≈ 0,15 M", 0.01);
  X("d6", 3, "¿Cuál es la osmolaridad (mOsm/L) de una disolución de NaCl al 3 % p/v (M<sub>r</sub> = 58,44)? Considera que NaCl da 2 partículas.", "Osmolaridad (mOsm/L) =", 1027, "mOsm/L", ["30 g/L / 58,44 = 0,513 mol/L.", "× 2 = 1,027 Osm/L = 1027 mOsm/L."], "≈ 1027 mOsm/L (3,3 veces la de la célula)", 0.005);
  O("d7", 3, "Una disolución de KCl al 0,9 % p/v (M<sub>r</sub> = 74,55; da 2 partículas) se compara con el interior de un hematíe (308 mOsm/L). ¿Es isotónica?", ["No: unos 241 mOsm/L, es hipotónica", "Sí: 308 mOsm/L", "No: unos 616 mOsm/L, es hipertónica", "Sí, porque también es una sal"], 0, ["9 g/L / 74,55 = 0,1207 mol/L.", "× 2 = 241 mOsm/L, menor que 308: hipotónica.", "Mismo porcentaje no significa misma osmolaridad (el KCl pesa más)."], "No: 241 mOsm/L, hipotónica");
  R("d8", "Cita y explica tres propiedades del agua y su importancia biológica. (Pregunta tipo PAU)", [
    { t: "Polaridad y puentes de hidrógeno como origen de las propiedades", p: 0.4 },
    { t: "Alto calor específico: amortigua la temperatura", p: 0.5 },
    { t: "Alto calor de vaporización: refrigeración (sudor)", p: 0.5 },
    { t: "Poder disolvente / cohesión con su función (transporte, savia)", p: 0.5 },
    { t: "Lenguaje científico correcto y ejemplos", p: 0.1 }], ["Polaridad.", "Calor específico.", "Calor de vaporización.", "Disolvente o cohesión."], "Polaridad → puentes de H → calor específico, vaporización, disolvente");
  R("d9", "Explica las funciones de las sales minerales precipitadas y disueltas, con dos ejemplos de cada tipo. (Pregunta tipo PAU)", [
    { t: "Precipitadas: función estructural", p: 0.5 },
    { t: "Ejemplos de precipitadas: fosfato cálcico (huesos), carbonato cálcico (conchas)", p: 0.5 },
    { t: "Disueltas: presión osmótica, pH, impulso nervioso, contracción", p: 0.5 },
    { t: "Ejemplos de disueltas: Na⁺, K⁺, Ca²⁺, HCO₃⁻", p: 0.4 },
    { t: "Distingue las asociadas a moléculas (Fe, Mg)", p: 0.1 }], ["Estructurales.", "Ejemplos precipitadas.", "Funciones disueltas.", "Ejemplos disueltas."], "Precipitadas: estructura; disueltas: regulación");
  R("d10", "Define ósmosis y explica qué le ocurre a un glóbulo rojo y a una célula vegetal en agua destilada y en agua de mar. (Pregunta tipo PAU)", [
    { t: "Definición de ósmosis (agua, membrana semipermeable, hacia más soluto)", p: 0.5 },
    { t: "Hematíe en agua destilada: hipotónico, hemólisis", p: 0.4 },
    { t: "Hematíe en agua de mar: hipertónico, crenación", p: 0.4 },
    { t: "Célula vegetal en agua destilada: turgencia (pared celular)", p: 0.4 },
    { t: "Célula vegetal en agua de mar: plasmólisis", p: 0.3 }], ["Definición.", "Hematíe.", "Vegetal."], "Hemólisis / crenación / turgencia / plasmólisis");
  R("d11", "¿Qué es un sistema tampón? Explica cómo el bicarbonato mantiene el pH de la sangre. (Pregunta tipo PAU)", [
    { t: "Definición: ácido débil y su base conjugada que amortigua los cambios de pH", p: 0.5 },
    { t: "Reacción: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻", p: 0.5 },
    { t: "Si sobran H⁺ el HCO₃⁻ los capta; si faltan, el H₂CO₃ los cede", p: 0.5 },
    { t: "Papel de los pulmones y valor de pH de la sangre (≈ 7,4)", p: 0.3 },
    { t: "Aclara que amortigua pero no anula el cambio", p: 0.2 }], ["Definición.", "Reacción.", "Mecanismo.", "Pulmones y pH."], "Tampón de bicarbonato");
  R("d12", "Un experimento: cilindros de patata en agua destilada ganan masa y en agua muy salada la pierden. Interpreta los resultados y diseña un control. (Pregunta tipo PAU)", [
    { t: "En agua destilada: medio hipotónico, entra agua por ósmosis, la masa sube", p: 0.5 },
    { t: "En agua salada: hipertónico, sale agua, la masa baja", p: 0.5 },
    { t: "Punto isotónico: concentración donde no cambia la masa", p: 0.4 },
    { t: "Control: cilindros secados, mismo tamaño, repetición, un tubo sin cambio", p: 0.4 },
    { t: "Relaciona con plasmólisis / turgencia", p: 0.2 }], ["Hipotónico.", "Hipertónico.", "Isotónico.", "Control."], "Entra agua / sale agua; punto isotónico");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "El agua: propiedad y utilidad", ancha: true,
      tabla: { cab: ["Propiedad", "Utilidad"], filas: [
        ["calor específico alto", "amortigua la temperatura"],
        ["calor de vaporización alto", "el sudor refrigera"],
        ["cohesión y adhesión", "sube la savia"],
        ["hielo menos denso", "vida bajo el hielo"],
        ["polaridad", "disolvente de sales y polares"]
      ] } },
    { titulo: "Bioelementos", ancha: true,
      tabla: { cab: ["Grupo", "Ejemplos"], filas: [
        ["Primarios", "C, H, O, N, P, S"],
        ["Secundarios", "Ca, Na, K, Cl, Mg"],
        ["Oligoelementos", "Fe, I, F, Zn, Cu"]
      ] } },
    { titulo: "Ósmosis: medio y célula", ancha: true,
      tabla: { cab: ["Medio", "Animal", "Vegetal"], filas: [
        ["hipotónico", "hemólisis", "turgencia"],
        ["isotónico", "normal", "flácida"],
        ["hipertónico", "crenación", "plasmólisis"]
      ] } },
    { titulo: "Cómo actúa el tampón",
      pasos: ["Entran H⁺ (ácido).", "El HCO₃⁻ los capta y forma H₂CO₃.", "El H₂CO₃ da CO₂ + H₂O.", "Los pulmones exhalan el CO₂."],
      nota: "Sangre: pH 7,4 (7,35–7,45)." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El agua disuelve las grasas", bien: "Disuelve sustancias polares e iónicas", por: "Las grasas son apolares." },
        { mal: "pH 3 es el doble de ácido que pH 6", bien: "Es 1000 veces más ácido", por: "Escala logarítmica." },
        { mal: "En la ósmosis pasa el soluto", bien: "Pasa el agua hacia el medio con más soluto", por: "Membrana semipermeable." },
        { mal: "Un hematíe se hincha en agua salada", bien: "Se arruga (crenación)", por: "El medio es hipertónico." }
      ] }
  ];

  B.registrar("bio2", "t1", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio1a.secciones,
    nuevas: B.parte.bio1a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
