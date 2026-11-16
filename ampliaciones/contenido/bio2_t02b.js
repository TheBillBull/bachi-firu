/* ============================================================
   Biología (2.º Bach.) · ampliaciones · Tema 2 (parte B): Glúcidos
   Ficha de un vistazo, datos de actividades, ejercicios, lámina y registro.
   Cada ejercicio tiene UNA respuesta correcta y cada cifra se recalcula en herramientas/verificar_bio2_t2.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "Los <b>glúcidos</b> son polihidroxialdehídos o polihidroxicetonas (C, H, O): <b>aldosas</b> con –CHO y <b>cetosas</b> con C=O; su función es energética (≈ 4 kcal/g), de reserva y estructural.",
    "Los monosacáridos tienen <b>isómeros</b> (función, D/L, epímeros, anómeros); la forma cíclica (piranosa o furanosa) crea el <b>carbono anomérico</b> (α o β).",
    "El <b>enlace O-glucosídico</b> une dos monosacáridos y libera agua; si deja libre un carbono anomérico el disacárido es <b>reductor</b> (maltosa, lactosa) y si no, no lo es (<b>sacarosa</b>).",
    "<b>Mismo monómero, distinto enlace</b>: almidón y glucógeno (α, reserva, digeribles) frente a celulosa y quitina (β, estructurales); Fehling detecta azúcares reductores y Lugol, almidón."
  ];

  // ---------------------------------------------------------------- ficha de un vistazo
  var vistazo = {
    titulo: "Glúcidos · de la glucosa a la celulosa",
    autores: [
      { n: "Emil Fischer", f: "1852–1919", l: "Euskirchen; Berlín (Nobel de Química 1902: estructura y síntesis de azúcares)" },
      { n: "Walter Haworth", f: "1883–1950", l: "Chorley; Birmingham (fórmula de anillo, Nobel 1937)" },
      { n: "Claude Bernard", f: "1813–1878", l: "París (descubre el glucógeno hepático, 1857)" }
    ],
    bloques: [
      { t: "Qué son", frases: ["Polihidroxialdehídos y polihidroxicetonas: C, H y O.", "Monosacáridos sencillos: C<sub>n</sub>(H<sub>2</sub>O)<sub>n</sub>.", "Funciones: energía (≈ 4 kcal/g), reserva y estructura."],
        tabla: { cab: ["Aldosa (–CHO)", "Cetosa (C=O)"], filas: [["glucosa, galactosa", "fructosa"], ["ribosa, desoxirribosa", "dihidroxiacetona"]] } },
      { t: "Monosacáridos y anillo", frases: ["Triosas (3 C), pentosas (5 C) y hexosas (6 C).", "El carbonilo reacciona con el OH del C5 y forma un anillo.", "Piranosa (6 lados) y furanosa (5 lados); aparece el C anomérico."],
        tabla: { cab: ["Anómero α", "Anómero β"], filas: [["OH del C1 hacia abajo", "OH del C1 hacia arriba"], ["origina almidón y glucógeno", "origina celulosa"]] } },
      { t: "Isomería", frases: ["De función: glucosa y fructosa (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>).", "Estereoisómeros: 2<sup>n</sup> con n carbonos asimétricos.", "D o L según el OH del carbono más alejado del carbonilo."],
        tabla: { cab: ["Enantiómeros", "Epímeros"], filas: [["D-glucosa y L-glucosa", "glucosa y galactosa (C4)"], ["cambian todos los OH", "cambia solo un OH"]] } },
      { t: "Enlace O-glucosídico", frases: ["Condensación: se pierde una molécula de H<sub>2</sub>O.", "Se escribe α(1→4), β(1→4), α(1→β2).", "Monocarbonílico: reductor. Dicarbonílico: no reductor."],
        tabla: { cab: ["Disacárido", "Unidades y enlace"], filas: [["maltosa", "glucosa + glucosa, α(1→4)"], ["lactosa", "galactosa + glucosa, β(1→4)"], ["sacarosa", "glucosa + fructosa, α(1→β2)"]] } },
      { t: "Polisacáridos", frases: ["Almidón (amilosa y amilopectina): reserva vegetal.", "Glucógeno: reserva animal, más ramificado.", "Celulosa: pared vegetal; quitina: artrópodos y hongos."],
        tabla: { cab: ["Almidón y glucógeno", "Celulosa"], filas: [["enlace α", "enlace β"], ["hélice y ramas", "cadenas rectas"], ["digeribles", "fibra"]] } },
      { t: "En el laboratorio", frases: ["Fehling (azul → rojo ladrillo): azúcares reductores.", "Sacarosa: negativo, salvo tras hidrolizarla con ácido.", "Lugol (ámbar → azul-violeta): almidón."] }
    ],
    resumen: [
      "Glúcidos: <b>carbonilo + muchos OH</b>; energía, reserva y estructura.",
      "Isómeros y anillo: el <b>carbono anomérico</b> da α y β.",
      "Enlace O-glucosídico = <b>condensación</b>; sacarosa es la que no reduce.",
      "<b>Mismo monómero, distinto enlace, distinta función</b>."
    ],
    conecta: [
      { con: "Bioelementos y biomoléculas inorgánicas (T1):", rel: "puentes de hidrógeno del agua y de los OH." },
      { con: "Lípidos (T3):", rel: "reserva a largo plazo frente a energía inmediata; glucolípidos." },
      { con: "Proteínas y enzimas (T4):", rel: "amilasa, lactasa y celulasa son específicas del enlace." },
      { con: "Ácidos nucleicos (T5):", rel: "ribosa y desoxirribosa; ATP." },
      { con: "Catabolismo y fotosíntesis (T8–T9):", rel: "la glucosa se oxida y se fabrica." },
      { con: "Química II (T9–T11):", rel: "grupos funcionales, redox del Fehling y polímeros de condensación." }
    ],
    claves: [
      ["Glúcido", "polihidroxialdehído o polihidroxicetona, o derivado"],
      ["Aldosa / cetosa", "monosacárido con –CHO / con C=O"],
      ["Carbono anomérico", "el del carbonilo antes de ciclar; da α y β"],
      ["Piranosa / furanosa", "anillo de seis / de cinco lados"],
      ["Epímeros", "se diferencian en un solo carbono asimétrico"],
      ["Enlace O-glucosídico", "une monosacáridos con pérdida de agua"],
      ["Azúcar reductor", "con carbonilo libre; reduce el Cu<sup>2+</sup> de Fehling"],
      ["Amilosa / amilopectina", "α(1→4) en hélice / con ramas α(1→6)"],
      ["Glucógeno", "reserva animal, ramas cada 8–12 glucosas"],
      ["Celulosa", "β(1→4), microfibrillas; no digerible por humanos"]
    ],
    cita: { txt: "Mismo monómero (glucosa), distinto enlace (α o β): distinta forma y distinta función.", autor: "Idea para recordar" }
  };

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    tipos: {
      titulo: "¿Monosacárido, disacárido o polisacárido?",
      consigna: "Toca cada glúcido y después el grupo al que pertenece.",
      categorias: ["Monosacárido", "Disacárido", "Polisacárido"],
      items: [
        { t: "Glucosa", c: 0 }, { t: "Fructosa", c: 0 }, { t: "Ribosa", c: 0 }, { t: "Galactosa", c: 0 },
        { t: "Sacarosa", c: 1 }, { t: "Lactosa", c: 1 }, { t: "Maltosa", c: 1 },
        { t: "Almidón", c: 2 }, { t: "Glucógeno", c: 2 }, { t: "Celulosa", c: 2 }, { t: "Quitina", c: 2 }
      ]
    },
    funciones: {
      titulo: "Función de cada polisacárido",
      consigna: "Clasifica cada polisacárido según su función principal.",
      categorias: ["Reserva vegetal", "Reserva animal", "Estructural"],
      items: [
        { t: "Almidón", c: 0 }, { t: "Inulina", c: 0 },
        { t: "Glucógeno", c: 1 },
        { t: "Celulosa", c: 2 }, { t: "Quitina", c: 2 }, { t: "Peptidoglucano (pared bacteriana)", c: 2 }
      ]
    },
    ciclacion: {
      titulo: "La ciclación de la glucosa",
      consigna: "Ordena las etapas por las que la glucosa pasa de cadena abierta a anillo.",
      items: [
        { t: "La glucosa está en forma de cadena abierta, con el aldehído en el C1." },
        { t: "La cadena se pliega y el OH del C5 se acerca al carbono del aldehído." },
        { t: "El oxígeno del C5 ataca al carbonilo y se forma un hemiacetal: anillo de seis lados (piranosa)." },
        { t: "El C1 es ahora asimétrico y recibe el nombre de carbono anomérico." },
        { t: "El OH del C1 queda hacia abajo (anómero α) o hacia arriba (anómero β)." }
      ]
    },
    almidon: {
      titulo: "La digestión del almidón",
      consigna: "Ordena los pasos de la digestión del almidón de un trozo de pan.",
      items: [
        { t: "En la boca, la amilasa salival empieza a romper enlaces α(1→4)." },
        { t: "En el estómago, el ácido detiene la amilasa salival." },
        { t: "En el intestino delgado, la amilasa pancreática sigue y produce maltosa y dextrinas." },
        { t: "Las enzimas del borde del intestino (maltasa) rompen la maltosa en glucosa." },
        { t: "La glucosa se absorbe y pasa a la sangre." }
      ]
    },
    isomeria: {
      titulo: "Tipos de isomería",
      consigna: "Une cada tipo de isomería con su ejemplo.",
      pares: [["Enantiómeros", "D-glucosa y L-glucosa"], ["Epímeros", "Glucosa y galactosa"], ["Isómeros de función", "Glucosa y fructosa"], ["Anómeros", "α-glucosa y β-glucosa"]]
    },
    disacaridos: {
      titulo: "Disacáridos",
      consigna: "Une cada disacárido con sus monosacáridos y su enlace.",
      pares: [["Maltosa", "Glucosa + glucosa, α(1→4)"], ["Celobiosa", "Glucosa + glucosa, β(1→4)"], ["Lactosa", "Galactosa + glucosa, β(1→4)"], ["Sacarosa", "Glucosa + fructosa, α(1→β2)"]]
    },
    quiz1: {
      titulo: "Test del tema 2",
      preguntas: [
        { q: "Un monosacárido con el grupo carbonilo en el carbono 1 es una…", op: ["aldosa", "cetosa", "triosa", "pentosa"], ok: 0, porque: "Aldehído en C1 = aldosa. Cetona en un carbono interior = cetosa. Triosa y pentosa hablan del número de carbonos." },
        { q: "¿Cuál de estos monosacáridos es isómero de función de la glucosa?", op: ["La fructosa", "La galactosa", "La manosa", "La ribosa"], ok: 0, porque: "La fructosa es cetohexosa y la glucosa aldohexosa, con la misma fórmula C₆H₁₂O₆. Galactosa y manosa son epímeros (también aldohexosas); la ribosa tiene cinco carbonos." },
        { q: "La glucosa y la galactosa se diferencian solo en el C4: son…", op: ["epímeros", "enantiómeros", "anómeros", "isómeros de función"], ok: 0, porque: "Un solo carbono asimétrico con configuración distinta = epímeros." },
        { q: "El carbono anomérico de la glucosa cíclica es el…", op: ["C1", "C2", "C5", "C6"], ok: 0, porque: "Es el del antiguo aldehído. En la fructosa es el C2 (el de la cetona)." },
        { q: "El enlace que une las unidades de glucosa de la celulosa es…", op: ["β(1→4)", "α(1→4)", "α(1→6)", "α(1→β2)"], ok: 0, porque: "En el almidón es α(1→4) con ramas α(1→6); α(1→β2) es el de la sacarosa." },
        { q: "El polisacárido de reserva de los animales es…", op: ["el glucógeno", "el almidón", "la celulosa", "la quitina"], ok: 0, porque: "Glucógeno: hígado y músculo. El almidón es la reserva vegetal." },
        { q: "¿Qué disacárido NO es reductor?", op: ["La sacarosa", "La maltosa", "La lactosa", "La celobiosa"], ok: 0, porque: "En la sacarosa los dos carbonos anoméricos están en el enlace (dicarbonílico). Los otros tres son monocarbonílicos." },
        { q: "Al formar un enlace O-glucosídico se libera…", op: ["una molécula de agua", "una molécula de CO₂", "una molécula de O₂", "energía en forma de luz"], ok: 0, porque: "Es una condensación: se pierde H₂O. La reacción inversa es la hidrólisis." },
        { q: "El Lugol se vuelve azul-violeta en presencia de…", op: ["almidón", "glucosa", "sacarosa", "celulosa"], ok: 0, porque: "El yodo se aloja en la hélice de la amilosa. La celulosa no tiene hélice." },
        { q: "La fórmula molecular de un disacárido formado por dos hexosas es…", op: ["C₁₂H₂₂O₁₁", "C₁₂H₂₄O₁₂", "C₆H₁₂O₆", "C₁₂H₂₂O₁₂"], ok: 0, porque: "2 C₆H₁₂O₆ − H₂O = C₁₂H₂₂O₁₁ (342 g/mol)." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      preguntas: [
        { q: "¿Cuál de estas afirmaciones sobre los glúcidos es FALSA?", op: ["Los hidratos de carbono contienen moléculas de agua unidas", "Son compuestos de C, H y O", "Los monosacáridos no se hidrolizan", "Los polisacáridos no tienen sabor dulce"], ok: 0, porque: "El nombre es histórico: la proporción de H y O es 2 : 1, como en el agua, pero no hay agua unida." },
        { q: "¿Cuál de estas afirmaciones sobre la isomería es FALSA?", op: ["D y L indican hacia dónde gira la luz polarizada", "D y L dependen del OH del carbono asimétrico más alejado del carbonilo", "La fructosa es levógira", "Enantiómeros: todos los OH cambian de lado"], ok: 0, porque: "Eso lo indican (+) y (−). D y L son configuración de la molécula, no el sentido del giro." },
        { q: "¿Cuál de estas afirmaciones sobre la ciclación es FALSA?", op: ["La glucosa forma una furanosa de cinco lados", "La glucosa forma una piranosa de seis lados", "El carbono anomérico es el del antiguo carbonilo", "Los anómeros se llaman α y β"], ok: 0, porque: "La glucosa forma piranosa (6 lados). La fructosa, la ribosa y la desoxirribosa forman furanosas." },
        { q: "¿Cuál de estas afirmaciones sobre el enlace O-glucosídico es FALSA?", op: ["Se forma por hidrólisis", "Se forma por condensación", "Libera una molécula de agua", "Une un carbono anomérico con un OH"], ok: 0, porque: "La hidrólisis lo rompe. Su formación es una condensación." },
        { q: "¿Cuál de estas afirmaciones sobre la sacarosa es FALSA?", op: ["Es un azúcar reductor", "Está formada por glucosa y fructosa", "Su enlace es dicarbonílico", "Da Fehling positivo tras hidrolizarla con ácido"], ok: 0, porque: "No reduce el Fehling porque los dos carbonos anoméricos están ocupados." },
        { q: "¿Cuál de estas afirmaciones sobre los polisacáridos es FALSA?", op: ["El almidón y la celulosa se diferencian en que están formados por monómeros distintos", "El glucógeno está más ramificado que la amilopectina", "La celulosa tiene enlaces β(1→4)", "La quitina es un polímero de N-acetilglucosamina"], ok: 0, porque: "Los dos son polímeros de glucosa; la diferencia está en el enlace (α o β)." },
        { q: "¿Cuál de estas afirmaciones sobre la digestión es FALSA?", op: ["Los humanos digerimos la celulosa con la enzima celulasa", "La amilasa rompe enlaces α del almidón", "La lactasa rompe la lactosa", "La intolerancia a la lactosa es una carencia enzimática"], ok: 0, porque: "No tenemos celulasa; la celulosa es fibra. Los rumiantes la digieren gracias a microorganismos." },
        { q: "¿Cuál de estas afirmaciones sobre el laboratorio es FALSA?", op: ["El almidón da Fehling positivo", "La glucosa da Fehling positivo", "El almidón da Lugol azul-violeta", "El precipitado del Fehling positivo es Cu₂O"], ok: 0, porque: "El almidón es un polisacárido, no reduce el Fehling (da positivo con Lugol)." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: Glúcidos",
      cartas: [
        { a: "Glúcido", b: "Polihidroxialdehído o polihidroxicetona (o derivado). Contiene C, H y O." },
        { a: "Aldosa / cetosa", b: "Monosacárido con el carbonilo en C1 (aldehído) o en un carbono interior (cetona)." },
        { a: "Carbono anomérico", b: "El del carbonilo antes de ciclar; en el anillo se hace asimétrico y da α y β." },
        { a: "Piranosa / furanosa", b: "Anillo de seis lados (glucosa) / de cinco lados (fructosa, ribosa)." },
        { a: "Epímeros", b: "Dos azúcares que solo se diferencian en un carbono asimétrico (glucosa y galactosa)." },
        { a: "Enantiómeros", b: "Imágenes especulares (D y L): todos los OH están al revés." },
        { a: "Enlace O-glucosídico", b: "Enlace que une monosacáridos tras una condensación (−H₂O)." },
        { a: "Azúcar reductor", b: "Tiene carbonilo libre; reduce el Cu²⁺ de Fehling. Todos los monosacáridos; maltosa, lactosa y celobiosa; no la sacarosa." },
        { a: "Sacarosa", b: "Glucosa + fructosa, α(1→β2), dicarbonílico, no reductora." },
        { a: "Almidón", b: "Reserva vegetal: amilosa (hélice, α(1→4)) y amilopectina (ramas α(1→6))." },
        { a: "Glucógeno", b: "Reserva animal: hígado y músculo, ramas α(1→6) cada 8–12 glucosas." },
        { a: "Celulosa", b: "Pared vegetal: β(1→4), microfibrillas con puentes de H; no digerible por humanos." }
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
  function X(id, nv, enun, et, valor, unidad, pasos, res, pistas) {
    var e = { id: id, nivel: nv, enunciado: enun, check: { tipo: "num", etiqueta: et, valor: valor, unidad: unidad }, pasos: pasos, resultado: res };
    if (pistas) e.pistas = pistas;
    N.push(e);
  }
  function R(id, enun, filas, items, pasos, res) {
    N.push({ id: id, nivel: 3, enunciado: enun, check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: filas, items: items }, pasos: pasos, resultado: res });
  }
  var TIPO = ["Triosa", "Pentosa", "Hexosa"];
  var PN = ["Positivo (rojo ladrillo)", "Negativo (sigue azul)"];

  // ---- nivel 1
  O("b1", 1, "La fórmula general de un monosacárido sencillo es…", ["Cₙ(H₂O)ₙ", "CₙH₂O", "C₂ₙHₙOₙ", "(CO₂)ₙ"], 0,
    ["La glucosa es C<sub>6</sub>(H<sub>2</sub>O)<sub>6</sub> = C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>: la proporción de H y O es 2 : 1, como en el agua."]);
  O("b2", 1, "¿Cuál de estos monosacáridos es una aldosa?", ["Glucosa", "Fructosa", "Dihidroxiacetona", "Ninguno de los tres"], 0,
    ["Glucosa: aldehído en C1 (aldohexosa). Fructosa y dihidroxiacetona tienen cetona (cetosas)."]);
  T("b3", 1, "Completa: el enlace que une dos monosacáridos se llama enlace ______.", "Término =", ["glucosídico", "o-glucosídico", "o glucosídico"],
    ["Es el enlace O-glucosídico: se forma por condensación, con pérdida de una molécula de agua."], "O-glucosídico");
  M("b4", 1, "Clasifica cada monosacárido según su número de carbonos.", [
    C("Ribosa", TIPO, 1), C("Glucosa", TIPO, 2), C("Gliceraldehído", TIPO, 0), C("Fructosa", TIPO, 2)],
    ["Tres C: triosa. Cinco C: pentosa. Seis C: hexosa."], "Ribosa–pentosa, glucosa–hexosa, gliceraldehído–triosa, fructosa–hexosa");
  O("b5", 1, "Cuando una glucosa y una fructosa forman sacarosa se libera…", ["una molécula de agua", "una molécula de dióxido de carbono", "una molécula de oxígeno", "ninguna molécula"], 0,
    ["Es una condensación: 2 C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → C<sub>12</sub>H<sub>22</sub>O<sub>11</sub> + H<sub>2</sub>O."]);
  O("b6", 1, "El polisacárido de reserva de los animales es…", ["el glucógeno", "el almidón", "la celulosa", "la quitina"], 0,
    ["El glucógeno se almacena en el hígado y el músculo."]);
  O("b7", 1, "La función principal de la celulosa es…", ["estructural", "energética inmediata", "de reserva", "transportadora"], 0,
    ["Forma la pared celular vegetal: da resistencia mecánica."]);
  V("b8", 1, "La glucosa y la fructosa tienen la misma fórmula molecular, C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>.", true,
    ["Son isómeros: mismos átomos, distinta estructura (aldosa y cetosa)", "Son el mismo compuesto", "Tienen distinto número de carbonos", "La fructosa es un polisacárido"], 0,
    ["Misma fórmula molecular, distinto grupo carbonilo: son isómeros de función."]);
  O("b9", 1, "El azúcar de la leche es…", ["la lactosa", "la sacarosa", "la maltosa", "la fructosa"], 0,
    ["Lactosa = galactosa + glucosa."]);
  T("b10", 1, "Completa: la pentosa que forma parte del ADN es la ______.", "Término =", ["desoxirribosa", "2-desoxirribosa"],
    ["En el ARN es la ribosa; en el ADN, la desoxirribosa (sin el O del C2)."], "desoxirribosa");
  O("b11", 1, "Para detectar almidón se usa el reactivo de…", ["Lugol", "Fehling", "Biuret", "Sudán"], 0,
    ["Lugol (yodo): azul-violeta con almidón. Fehling detecta azúcares reductores."]);
  O("b12", 1, "¿Qué glúcido no puede digerir el ser humano?", ["La celulosa", "El almidón", "La lactosa (con lactasa)", "La sacarosa"], 0,
    ["Falta la celulasa para romper el enlace β(1→4): la celulosa es fibra."]);
  X("b13", 1, "Calcula la masa molar de la glucosa, C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>. (C = 12; H = 1; O = 16)", "M (g/mol) =", 180, "g/mol",
    ["6 · 12 + 12 · 1 + 6 · 16 = 72 + 12 + 96 = 180 g/mol."], "180 g/mol");
  X("b14", 1, "¿Cuántos moles son 90 g de glucosa? (M = 180 g/mol)", "n (mol) =", 0.5, "mol",
    ["n = m / M = 90 / 180 = 0,50 mol."], "0,50 mol");

  // ---- nivel 2
  X("c1", 2, "Calcula la masa molar de la sacarosa (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>) y comprueba que coincide con 2 · 180 − 18. (C = 12; H = 1; O = 16)", "M (g/mol) =", 342, "g/mol",
    ["12 · 12 + 22 · 1 + 11 · 16 = 144 + 22 + 176 = 342 g/mol.", "Por otro lado, 2 · 180 − 18 = 342 ✔: se pierde una molécula de agua al formar el enlace."], "342 g/mol");
  X("c2", 2, "Se hidrolizan completamente 171 g de sacarosa. ¿Qué masa de glucosa se obtiene? (M(sacarosa) = 342 g/mol; M(glucosa) = 180 g/mol)", "m (g) =", 90, "g",
    ["n(sacarosa) = 171 / 342 = 0,50 mol.", "La hidrólisis da 1 glucosa + 1 fructosa por sacarosa: 0,50 mol de glucosa.", "m = 0,50 · 180 = 90 g (y otros 90 g de fructosa)."], "90 g de glucosa");
  X("c3", 2, "¿Cuántos carbonos asimétricos tiene la glucosa en cadena abierta?", "Nº de C* =", 4, "",
    ["C1 es aldehído y C6 tiene dos H; son asimétricos C2, C3, C4 y C5."], "4");
  X("c4", 2, "¿Cuántos estereoisómeros posibles tiene la glucosa en cadena abierta?", "Nº =", 16, "",
    ["2<sup>n</sup> con n = 4: 2<sup>4</sup> = 16 (8 de la serie D y 8 de la L)."], "16");
  X("c5", 2, "¿Cuántos estereoisómeros posibles tiene la fructosa en cadena abierta (3 carbonos asimétricos)?", "Nº =", 8, "",
    ["2<sup>3</sup> = 8 estereoisómeros (4 D + 4 L)."], "8");
  X("c6", 2, "Una cadena lineal de 500 unidades de glucosa se forma por condensación. ¿Cuántas moléculas de agua se liberan?", "Nº de H₂O =", 499, "",
    ["Para unir n unidades en cadena hacen falta n − 1 enlaces, y cada uno libera una molécula de agua: 500 − 1 = 499."], "499 moléculas de agua");
  X("c7", 2, "Calcula la masa molar de una cadena lineal de 100 glucosas (M(glucosa) = 180; M(agua) = 18).", "M (g/mol) =", 16218, "g/mol",
    ["100 · 180 = 18 000 g/mol si estuvieran sueltas.", "Se pierden 99 H<sub>2</sub>O al formar 99 enlaces: 99 · 18 = 1782.", "M = 18 000 − 1782 = 16 218 g/mol."], "16 218 g/mol");
  V("c8", 2, "La sacarosa es un azúcar reductor.", false,
    ["Sus dos carbonos anoméricos están ocupados en el enlace, así que no queda carbonilo libre", "Es un monosacárido", "No tiene enlace glucosídico", "Es un polisacárido"], 0,
    ["Dicarbonílico: no reduce el Fehling (salvo tras hidrolizarla)."]);
  V("c9", 2, "La lactosa da positivo en el ensayo de Fehling.", true,
    ["El OH anomérico de su glucosa queda libre: el enlace es monocarbonílico", "Tiene dos carbonos anoméricos unidos", "Es un polisacárido", "Contiene fructosa"], 0,
    ["Lactosa = galactosa + glucosa, β(1→4): reductora."]);
  O("c10", 2, "La glucosa y la galactosa se diferencian solo en la posición del OH del C4. Son…", ["epímeros", "enantiómeros", "anómeros", "isómeros de función"], 0,
    ["Epímeros: un único carbono asimétrico con distinta configuración."]);
  O("c11", 2, "La α-D-glucosa y la β-D-glucosa se diferencian en el OH del C1. Son…", ["anómeros", "epímeros", "enantiómeros", "isómeros de función"], 0,
    ["Anómeros: se distinguen solo en el carbono anomérico del anillo."]);
  O("c12", 2, "Un tubo con sacarosa y Fehling no cambia de color; si antes se hierve con HCl y se neutraliza, se pone rojo ladrillo. ¿Por qué?", ["El ácido hidroliza el enlace y libera glucosa y fructosa, que son reductoras", "El ácido oxida la sacarosa a ácido", "La sacarosa se convierte en almidón", "El calor polimeriza la sacarosa"], 0,
    ["Sacarosa intacta: dicarbonílica, no reduce.", "Con HCl y calor se hidroliza: glucosa + fructosa, con carbonilo libre, reducen el Cu<sup>2+</sup>."]);
  M("c13", 2, "Une cada polisacárido con su función.", [
    C("Almidón", ["Reserva vegetal", "Reserva animal", "Estructural vegetal", "Estructural en artrópodos"], 0),
    C("Glucógeno", ["Reserva vegetal", "Reserva animal", "Estructural vegetal", "Estructural en artrópodos"], 1),
    C("Celulosa", ["Reserva vegetal", "Reserva animal", "Estructural vegetal", "Estructural en artrópodos"], 2),
    C("Quitina", ["Reserva vegetal", "Reserva animal", "Estructural vegetal", "Estructural en artrópodos"], 3)],
    ["Almidón: plantas. Glucógeno: hígado y músculo. Celulosa: pared vegetal. Quitina: exoesqueleto de insectos y crustáceos."], "Almidón–reserva vegetal, glucógeno–reserva animal, celulosa–estructural vegetal, quitina–estructural en artrópodos");
  X("c14", 2, "Un vaso de refresco contiene 25 g de azúcar. ¿Cuánta energía aportan aproximadamente? (1 g de glúcido ≈ 4 kcal)", "E (kcal) =", 100, "kcal",
    ["25 g · 4 kcal/g = 100 kcal."], "≈ 100 kcal");
  O("c15", 2, "Una persona con intolerancia a la lactosa no produce suficiente…", ["lactasa", "amilasa", "celulasa", "maltasa"], 0,
    ["La lactasa hidroliza la lactosa en galactosa y glucosa."]);
  O("c16", 2, "El carbono anomérico de la fructosa cíclica (furanosa) es el…", ["C2", "C1", "C5", "C6"], 0,
    ["Es el del carbonilo (cetona) antes de ciclar: el C2."]);

  // ---- nivel 3
  M("d1", 3, "Una molécula de amilopectina tiene 3000 residuos de glucosa y una ramificación cada 20 residuos. Calcula cuántos enlaces α(1→6) y cuántos α(1→4) tiene.", [
    { tipo: "num", etiqueta: "Enlaces α(1→6) =", valor: 150 },
    { tipo: "num", etiqueta: "Enlaces α(1→4) =", valor: 2849 }],
    ["Enlaces totales: n − 1 = 2999.", "Ramas: 3000 / 20 = 150 enlaces α(1→6).", "α(1→4) = 2999 − 150 = 2849."], "150 enlaces α(1→6) y 2849 α(1→4)");
  M("d2", 3, "Una molécula de glucógeno tiene 12 000 residuos de glucosa y una ramificación cada 10 residuos. ¿Cuántas ramas tiene y cuántas moléculas de agua se liberaron al formarla?", [
    { tipo: "num", etiqueta: "Nº de ramas =", valor: 1200 },
    { tipo: "num", etiqueta: "Nº de H₂O liberadas =", valor: 11999 }],
    ["Ramas: 12 000 / 10 = 1200.", "Enlaces (y aguas liberadas) en una única molécula: n − 1 = 11 999."], "1200 ramas y 11 999 H₂O");
  X("d3", 3, "Se hidrolizan completamente 3,24 g de almidón, (C<sub>6</sub>H<sub>10</sub>O<sub>5</sub>)<sub>n</sub> con n muy grande. ¿Qué masa de glucosa se obtiene? (C = 12; H = 1; O = 16)", "m (g) =", 3.6, "g",
    ["Cada residuo del polímero tiene masa 162 g/mol (C<sub>6</sub>H<sub>10</sub>O<sub>5</sub>): n = 3,24 / 162 = 0,020 mol de residuos.", "Cada residuo da 1 glucosa al hidrolizarse: 0,020 · 180 = 3,6 g.", "Comprobación: se han consumido 3,6 − 3,24 = 0,36 g de agua = 0,020 mol ✔."], "3,6 g de glucosa");
  M("d4", 3, "Se hidrolizan 3,42 g de maltosa (M = 342 g/mol) en glucosa. Calcula el agua consumida y la masa de glucosa obtenida. (M(glucosa) = 180; M(H₂O) = 18)", [
    { tipo: "num", etiqueta: "Agua consumida (g) =", valor: 0.18 },
    { tipo: "num", etiqueta: "Glucosa obtenida (g) =", valor: 3.6 }],
    ["n(maltosa) = 3,42 / 342 = 0,010 mol.", "Maltosa + H<sub>2</sub>O → 2 glucosa: agua = 0,010 · 18 = 0,18 g; glucosa = 0,020 · 180 = 3,6 g.", "Comprobación: 3,42 + 0,18 = 3,60 ✔."], "0,18 g de agua y 3,6 g de glucosa");
  M("d5", 3, "Se hace el ensayo de Fehling (con calor) a cuatro tubos: A glucosa, B sacarosa, C almidón, D sacarosa hervida con HCl y neutralizada. Indica el resultado de cada tubo.", [
    C("Tubo A (glucosa)", PN, 0), C("Tubo B (sacarosa)", PN, 1), C("Tubo C (almidón)", PN, 1), C("Tubo D (sacarosa hidrolizada)", PN, 0)],
    ["A: monosacárido reductor, positivo.", "B: sacarosa intacta, dicarbonílica, negativo.", "C: polisacárido, negativo.", "D: la hidrólisis libera glucosa y fructosa, positivo."], "A positivo, B negativo, C negativo, D positivo");
  V("d6", 3, "Almidón y celulosa se diferencian en que están formados por monosacáridos distintos.", false,
    ["Los dos son polímeros de glucosa; cambia el enlace (α o β)", "El almidón es de fructosa", "La celulosa es de galactosa", "Se diferencian en el número de carbonos del monómero"], 0,
    ["Mismo monómero, distinto enlace: el enlace β(1→4) da cadenas rectas y estructurales; el α da hélices y ramas de reserva."]);
  O("d7", 3, "Una disolución recién preparada de α-D-glucosa pura cambia poco a poco su poder rotatorio hasta un valor estable. Este fenómeno se llama…", ["mutarrotación", "hidrólisis", "condensación", "isomerización de función"], 0,
    ["Mutarrotación: el anillo se abre y cierra y los anómeros α y β llegan a un equilibrio (≈ 1/3 α y 2/3 β)."]);
  X("d8", 3, "¿Cuántos carbonos asimétricos tiene la glucosa en su forma cíclica (piranosa)?", "Nº de C* =", 5, "",
    ["Los cuatro de la cadena abierta (C2 a C5) y además el C1, que pasa a ser anomérico: 4 + 1 = 5."], "5");
  O("d9", 3, "¿Qué diferencia molecular explica que el algodón (celulosa) no se digiera y el pan (almidón) sí?", ["El enlace es β en la celulosa y α en el almidón", "La celulosa tiene fructosa", "El almidón tiene más carbonos", "La celulosa es un monosacárido"], 0,
    ["Las amilasas rompen enlaces α(1→4); el ser humano no tiene celulasa para el β(1→4)."]);
  O("d10", 3, "Una persona toma un helado con lactosa y no tolera la lactosa. ¿Qué ocurre con la lactosa que no se digiere?", ["Pasa al intestino grueso, donde las bacterias la fermentan y producen gases", "Se convierte en glucógeno en el estómago", "Se absorbe entera como disacárido", "Se hidroliza con celulasa"], 0,
    ["Sin lactasa no se rompe el enlace β(1→4): la lactosa llega al colon y las bacterias la fermentan."]);
  R("d11", "Compara el almidón, el glucógeno y la celulosa en cuanto a composición, tipo de enlace, estructura, localización y función. (Pregunta tipo PAU)", 9, [
    { t: "Los tres son polímeros de glucosa (homopolisacáridos)", p: 0.3 },
    { t: "Almidón: α(1→4) y α(1→6); amilosa (hélice) y amilopectina (ramificada); reserva vegetal en amiloplastos", p: 0.5 },
    { t: "Glucógeno: α(1→4) y α(1→6) con más ramas; reserva animal en hígado y músculo", p: 0.4 },
    { t: "Celulosa: β(1→4); cadenas rectas con puentes de H; pared vegetal; estructural", p: 0.5 },
    { t: "Relaciona el tipo de enlace con la forma, la función y la digestibilidad (enzimas)", p: 0.3 }],
    ["Composición.", "Almidón.", "Glucógeno.", "Celulosa.", "Enlace → forma → función."], "Mismo monómero; distinto enlace y ramificación");
  R("d12", "Explica qué es la isomería en los monosacáridos y pon un ejemplo de cada tipo. ¿Cuántos estereoisómeros tiene la glucosa en cadena abierta? (Pregunta tipo PAU)", 8, [
    { t: "Define isómeros: misma fórmula molecular, distinta estructura", p: 0.3 },
    { t: "Isomería de función con ejemplo (glucosa y fructosa)", p: 0.3 },
    { t: "Estereoisomería: D/L (enantiómeros), epímeros y anómeros con ejemplos", p: 0.6 },
    { t: "Carbonos asimétricos y número 2<sup>n</sup>: glucosa abierta 2<sup>4</sup> = 16", p: 0.4 },
    { t: "Menciona la ciclación y el carbono anomérico", p: 0.4 }],
    ["Definición.", "Función.", "Estereoisomería.", "Cuenta.", "Ciclación."], "16 estereoisómeros; isomería de función y estereoisomería");
  R("d13", "Describe el enlace O-glucosídico: cómo se forma, cómo se nombra y cuándo un disacárido es reductor. Pon dos ejemplos. (Pregunta tipo PAU)", 8, [
    { t: "Condensación entre el OH anomérico de un monosacárido y un OH de otro, con pérdida de H<sub>2</sub>O", p: 0.5 },
    { t: "Se nombra con α/β y los carbonos: α(1→4), β(1→4), α(1→β2)", p: 0.3 },
    { t: "Monocarbonílico: queda un OH anomérico libre y es reductor (maltosa, lactosa)", p: 0.5 },
    { t: "Dicarbonílico: no queda carbonilo libre y no reduce (sacarosa)", p: 0.4 },
    { t: "La hidrólisis lo rompe (enzimas, ácido) y libera los monosacáridos", p: 0.3 }],
    ["Formación.", "Nomenclatura.", "Monocarbonílico.", "Dicarbonílico.", "Hidrólisis."], "Condensación; α/β(1→n); monocarbonílico reductor, dicarbonílico no");
  R("d14", "Se dispone de cuatro tubos con glucosa, sacarosa, almidón y celulosa (sin etiquetar). Diseña un procedimiento con Fehling y Lugol para identificar cada uno y explica los resultados. (Pregunta tipo PAU)", 8, [
    { t: "Fehling con calor: positivo (rojo ladrillo) solo en la glucosa, por azúcar reductor", p: 0.5 },
    { t: "Sacarosa, almidón y celulosa: Fehling negativo (sacarosa dicarbonílica; polisacáridos sin extremos reductores libres)", p: 0.4 },
    { t: "Lugol: azul-violeta solo con el almidón (hélice de amilosa)", p: 0.4 },
    { t: "Distinguir sacarosa de celulosa: hidrolizar con HCl, neutralizar y repetir el Fehling (positivo la sacarosa)", p: 0.5 },
    { t: "Orden lógico del procedimiento y uso de controles", p: 0.2 }],
    ["Fehling.", "Negativos.", "Lugol.", "Hidrólisis.", "Procedimiento."], "Fehling → glucosa; Lugol → almidón; HCl + Fehling → sacarosa; el que queda, celulosa");
  R("d15", "Explica las funciones biológicas de los glúcidos con ejemplos de cada una. ¿Por qué se almacena la energía como polisacárido y no como glucosa libre? (Pregunta tipo PAU)", 8, [
    { t: "Energética: la glucosa se oxida; ≈ 4 kcal/g", p: 0.4 },
    { t: "Reserva: almidón (plantas) y glucógeno (animales, hongos)", p: 0.4 },
    { t: "Estructural: celulosa, quitina, peptidoglucano", p: 0.4 },
    { t: "Otras: ribosa y desoxirribosa en ARN, ADN y ATP; glucoproteínas y glucolípidos (reconocimiento)", p: 0.4 },
    { t: "Un polímero es una sola molécula para la ósmosis: no provoca entrada de agua en la célula", p: 0.4 }],
    ["Energética.", "Reserva.", "Estructural.", "Otras.", "Ósmosis."], "Energía, reserva, estructura, información; polímero = poca presión osmótica");

  // ---------------------------------------------------------------- lámina
  var lamina = [
    { titulo: "Aldosa y cetosa", ancha: true,
      tabla: { cab: ["", "Aldosa", "Cetosa"], filas: [
        ["Grupo", "aldehído, –CHO (C1)", "cetona, C=O (C2)"],
        ["Hexosa", "glucosa, galactosa", "fructosa"],
        ["Pentosa", "ribosa, desoxirribosa", "ribulosa"],
        ["Triosa", "gliceraldehído", "dihidroxiacetona"],
        ["Anillo", "piranosa (glucosa)", "furanosa (fructosa)"]
      ] } },
    { titulo: "Tipos de isomería", ancha: true,
      tabla: { cab: ["Tipo", "Qué cambia", "Ejemplo"], filas: [
        ["De función", "aldosa / cetosa", "glucosa – fructosa"],
        ["Enantiómeros", "todos los OH", "D-glucosa – L-glucosa"],
        ["Epímeros", "un solo C*", "glucosa – galactosa"],
        ["Anómeros", "OH del C anomérico", "α-glucosa – β-glucosa"]
      ] } },
    { titulo: "Disacáridos", ancha: true,
      tabla: { cab: ["Disacárido", "Unidades", "Enlace", "Reductor"], filas: [
        ["Maltosa", "Glc + Glc", "α(1→4)", "sí"],
        ["Celobiosa", "Glc + Glc", "β(1→4)", "sí"],
        ["Lactosa", "Gal + Glc", "β(1→4)", "sí"],
        ["Sacarosa", "Glc + Fru", "α(1→β2)", "no"]
      ] } },
    { titulo: "Polisacáridos", ancha: true,
      tabla: { cab: ["", "Almidón", "Glucógeno", "Celulosa"], filas: [
        ["Enlace", "α(1→4), α(1→6)", "α(1→4), α(1→6)", "β(1→4)"],
        ["Forma", "hélice y ramas", "muy ramificado", "cadenas rectas"],
        ["Dónde", "plantas", "hígado, músculo", "pared vegetal"],
        ["Función", "reserva", "reserva", "estructural"],
        ["Lugol", "azul-violeta", "pardo rojizo", "no reacciona"]
      ] } },
    { titulo: "Pasos de la ciclación",
      pasos: ["Cadena abierta con carbonilo.", "El OH del C5 ataca al carbonilo.", "Se forma el hemiacetal: piranosa.", "El C1 es ahora anomérico.", "OH abajo = α; OH arriba = β."],
      nota: "Fischer a Haworth: derecha = abajo, izquierda = arriba." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Los hidratos de carbono contienen agua", bien: "Solo tienen H y O en proporción 2 : 1", por: "El nombre es histórico." },
        { mal: "D y L indican el giro de la luz", bien: "D/L es la configuración; (+)/(−) el giro", por: "La D-fructosa es levógira." },
        { mal: "La masa de la sacarosa es 180 + 180", bien: "Es 180 + 180 − 18 = 342", por: "Se pierde un H₂O." },
        { mal: "La sacarosa reduce el Fehling", bien: "No reduce (dicarbonílica), salvo hidrolizada", por: "Sus dos C anoméricos están en el enlace." },
        { mal: "Almidón y celulosa tienen monómeros distintos", bien: "Los dos son de glucosa; cambia el enlace", por: "α frente a β." }
      ] }
  ];

  B.registrar("bio2", "t2", {
    resumen: resumen,
    vistazo: vistazo,
    secciones: B.parte.bio2t2a.secciones,
    nuevas: B.parte.bio2t2a.nuevas,
    datos: datos,
    ejercicios: N,
    lamina: lamina
  });
})(typeof window !== "undefined" ? window : this);
