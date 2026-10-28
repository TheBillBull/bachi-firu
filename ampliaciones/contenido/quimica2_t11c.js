/* ============================================================
   Química II · ampliaciones · Tema 11: Polímeros y macromoléculas
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Vocabulario</b>: monómero (molécula de partida), unidad repetida (la que se repite), grado de polimerización <i>n</i>. <b>M(polímero) = n · M(unidad repetida)</b>, siempre una masa media.",
    "<b>Adición</b>: el monómero tiene C=C; el enlace π se abre, no se pierde ningún átomo y la unidad repetida es igual al monómero. n CH₂=CHX → −[CH₂−CHX]<sub>n</sub>−. PE, PP, PVC, PS, PTFE, PMMA.",
    "<b>Condensación</b>: monómeros con dos grupos reactivos; cada enlace nuevo libera una molécula pequeña (H₂O). Amida (nailon, proteínas), éster (PET, PLA), glucosídico (almidón). Con <i>n</i> monómeros en una cadena se liberan <i>n</i> − 1 H₂O.",
    "<b>Identificar el monómero</b>: adición, dos C de la cadena + doble enlace; condensación, rompe la amida o el éster y devuelve el agua (−COOH y −NH₂ o −OH).",
    "<b>Biopolímeros</b>: polisacáridos (glucosa, enlace glucosídico), proteínas (α-aminoácidos, enlace peptídico), ácidos nucleicos (nucleótidos, enlace fosfodiéster).",
    "<b>Estructura y propiedades</b>: termoplástico (cadenas sueltas, se funde y se recicla), termoestable (red, no se funde), elastómero (pocos puentes, se estira y recupera). Vulcanización: puentes de azufre.",
    "<b>Cálculos</b>: condensación, M(unidad) = M(monómeros) − agua que sale. Masa de polímero + masa de agua = masa de monómeros. Combustión: (CH₂)<sub>n</sub> da 3,14 kg de CO₂ por kg; el PVC libera HCl.",
    "<b>Medio ambiente</b>: los enlaces C−C son muy estables y los plásticos persisten siglos (microplásticos). 3R: reducir, reutilizar, reciclar. Reciclado mecánico (solo termoplásticos), químico (despolimerización) y energético."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«El polipropileno es −[CH₂=CH−CH₃]<sub>n</sub>−, así que el doble enlace se mantiene en el polímero.» ¿Qué falla?",
          op: ["Nada", "En la polimerización por adición el doble enlace se abre: el polímero es −[CH₂−CH(CH₃)]<sub>n</sub>−, solo con enlaces simples", "El propeno no se puede polimerizar", "Es una condensación"], ok: 1,
          porque: "El enlace π del C=C se usa para unir un monómero con el siguiente. La cadena queda con enlaces simples C−C." },
        { q: "«En el nailon 6,6, la masa del polímero es igual a la suma de las masas del diácido y la diamina que reaccionan.» ¿Qué falla?",
          op: ["Nada", "Se desprende agua en cada enlace: m(polímero) = m(monómeros) − m(agua liberada)", "La masa del polímero es mayor", "El nailon no libera nada"], ok: 1,
          porque: "La condensación expulsa una molécula de agua en cada enlace amida. La masa total se conserva, pero parte de ella sale como agua." },
        { q: "«Un tripéptido tiene tres enlaces peptídicos y libera tres moléculas de agua.» ¿Qué falla?",
          op: ["Nada", "Tres aminoácidos forman 2 enlaces peptídicos y liberan 2 H₂O", "Libera cuatro", "No libera agua"], ok: 1,
          porque: "En una cadena lineal de n unidades hay n − 1 uniones, cada una con una molécula de agua." },
        { q: "«La baquelita es un termoplástico porque es un plástico duro, y se recicla fundiéndola.» ¿Qué falla?",
          op: ["Nada", "Es un termoestable: red entrecruzada que no se funde, solo se descompone al calentar", "Es un elastómero", "Se recicla disolviéndola"], ok: 1,
          porque: "Termoplástico y termoestable se distinguen por poder o no volver a fundirse, no por la dureza." },
        { q: "«El monómero de −[CH₂−CHCl]<sub>n</sub>− es CH₃−CH₂Cl (cloroetano).» ¿Qué falla?",
          op: ["Nada", "El monómero tiene doble enlace: CH₂=CHCl, cloroeteno", "El monómero es el diclorometano", "El monómero es el etino"], ok: 1,
          porque: "En una adición se parte de un alqueno: se vuelve a poner el C=C entre los dos carbonos de la unidad repetida." },
        { q: "«El almidón y la celulosa son polímeros distintos porque están hechos de monómeros distintos.» ¿Qué falla?",
          op: ["Nada", "Los dos son polímeros de glucosa; cambia la orientación (α o β) del enlace glucosídico", "Uno es de aminoácidos", "Uno es un ácido nucleico"], ok: 1,
          porque: "El almidón (α) y la celulosa (β) tienen la misma unidad C₆H₁₀O₅, pero las enzimas humanas solo rompen el enlace α." },
        { q: "«Si 10,0 g de monómero polimerizan por adición con un rendimiento del 100 %, se forman menos de 10,0 g de polímero porque se pierde agua.» ¿Qué falla?",
          op: ["Nada", "En la adición no se libera nada: se forman 10,0 g de polímero", "Se forman más de 10,0 g", "Se forma el doble"], ok: 1,
          porque: "La adición conserva todos los átomos, sin producto secundario." },
        { q: "«Los plásticos de adición se degradan rápido porque los microorganismos rompen los enlaces C−C.» ¿Qué falla?",
          op: ["Nada", "Los enlaces C−C son muy estables y apolares: casi no se degradan, por eso persisten siglos", "Se degradan con el agua", "Solo se degradan en el mar"], ok: 1,
          porque: "La resistencia de la cadena carbonada explica tanto su utilidad como su persistencia." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El polietileno se obtiene por polimerización de…", op: ["adición del eteno", "condensación del etanol", "adición del etano", "condensación del etino"], ok: 0, porque: "El eteno tiene un doble enlace que se abre." },
        { q: "La polimerización por condensación se caracteriza por…", op: ["liberar una molécula pequeña en cada unión", "abrir un doble enlace", "no cambiar la fórmula", "necesitar un solo monómero con C=C"], ok: 0, porque: "Casi siempre es agua." },
        { q: "El enlace que une los aminoácidos en una proteína es…", op: ["peptídico (amida)", "glucosídico", "fosfodiéster", "éster"], ok: 0, porque: "−CO−NH−." },
        { q: "El monómero de la celulosa y del almidón es…", op: ["glucosa", "fructosa", "un aminoácido", "un nucleótido"], ok: 0, porque: "Los dos son polisacáridos de glucosa." },
        { q: "Un polímero que no se funde al calentar y se descompone es…", op: ["termoestable", "termoplástico", "elastómero siempre", "un copolímero"], ok: 0, porque: "Red entrecruzada." },
        { q: "La vulcanización del caucho consiste en…", op: ["crear puentes de azufre entre cadenas", "añadir agua", "romper las cadenas", "oxidar el carbono"], ok: 0, porque: "El azufre une las cadenas por los dobles enlaces." },
        { q: "El PVC procede del monómero…", op: ["CH₂=CHCl", "CH₃−CH₂Cl", "CH₂=CF₂", "CHCl=CHCl solo"], ok: 0, porque: "Cloroeteno (cloruro de vinilo)." },
        { q: "Dos monómeros de diácido y diamina dan…", op: ["una poliamida (nailon)", "un poliéster", "un polisacárido", "una poliolefina"], ok: 0, porque: "Se forma el enlace amida." },
        { q: "El número 1 del triángulo de reciclado corresponde a…", op: ["PET", "PVC", "PS", "PP"], ok: 0, porque: "Código 1 = PET." },
        { q: "Un copolímero es un polímero formado por…", op: ["dos o más monómeros distintos", "un solo monómero", "monómeros naturales", "cadenas entrecruzadas siempre"], ok: 0, porque: "SBR, ABS." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: polímeros",
      cartas: [
        { a: "Monómero y unidad repetida", b: "Monómero: molécula pequeña de partida. Unidad repetida: el trozo que se repite en la cadena, −[ ]<sub>n</sub>−." },
        { a: "M(polímero)", b: "M = n · M(unidad repetida). Siempre una masa media." },
        { a: "Polimerización por adición", b: "Monómero con C=C; el enlace π se abre. No se libera nada: unidad repetida = monómero." },
        { a: "Polimerización por condensación", b: "Monómeros con dos grupos reactivos; cada enlace libera una molécula pequeña (H₂O). La unidad pesa menos que los monómeros." },
        { a: "Enlace peptídico", b: "−CO−NH− (amida) entre el −COOH de un aminoácido y el −NH₂ de otro. n aminoácidos → n − 1 enlaces y n − 1 H₂O." },
        { a: "Almidón y celulosa", b: "Polímeros de glucosa (C₆H₁₀O₅). Enlace glucosídico α (almidón) o β (celulosa)." },
        { a: "Nucleótido", b: "Azúcar + fosfato + base. Se unen por enlaces fosfodiéster. ADN: desoxirribosa; ARN: ribosa." },
        { a: "Termoplástico, termoestable, elastómero", b: "Se funde y se recicla (PE, PET) · red, no se funde (baquelita) · pocos puentes, se estira y recupera (caucho vulcanizado)." },
        { a: "Vulcanización", b: "Calentar caucho con azufre: puentes de S entre cadenas. Pocos: elastómero. Muchos: ebonita." },
        { a: "Impacto ambiental de los plásticos", b: "Enlaces C−C estables: persisten siglos y forman microplásticos. 3R, reciclado mecánico y químico; quemar PVC libera HCl." }
      ]
    },
    emp1: {
      titulo: "Empareja polímero y monómero",
      consigna: "Une cada unidad repetida con el monómero de partida.",
      pares: [["−[CH₂−CH₂]−", "CH₂=CH₂ (eteno)"], ["−[CH₂−CHCl]−", "CH₂=CHCl (cloroeteno)"], ["−[CH₂−CH(C₆H₅)]−", "estireno"], ["−[CF₂−CF₂]−", "CF₂=CF₂"],
        ["−[CH₂−CH(CH₃)]−", "propeno"], ["−[CH₂−CH(CN)]−", "acrilonitrilo"], ["−[NH−CH₂−CO]− (proteína)", "glicina (aminoácido)"], ["−[C₆H₁₀O₅]− (almidón)", "glucosa"]]
    },
    emp2: {
      titulo: "Códigos de reciclado",
      consigna: "Une el código con el plástico.",
      pares: [["1", "PET"], ["2", "HDPE"], ["3", "PVC"], ["4", "LDPE"], ["5", "PP"], ["6", "PS"]]
    },
    orden1: {
      titulo: "Ordena: monómeros de un polímero de condensación",
      consigna: "Pon los pasos en el orden correcto.",
      items: [
        { t: "Localizar los enlaces amida o éster de la cadena", nota: "−CO−NH− o −CO−O−" },
        { t: "Aislar una unidad repetida", nota: "de un enlace al siguiente" },
        { t: "Romper cada enlace por el C−N o el C−O", nota: "separa los trozos" },
        { t: "Devolver el agua: −OH al C=O y H al otro trozo", nota: "queda −COOH y −NH₂ o −OH" },
        { t: "Nombrar los monómeros", nota: "diácido + diamina, diácido + diol o aminoácido" }
      ]
    },
    clas1: {
      titulo: "Adición o condensación",
      consigna: "Toca cada polímero y luego su tipo de polimerización.",
      categorias: ["Adición", "Condensación"],
      items: [
        { t: "Polietileno", c: 0 }, { t: "PVC", c: 0 }, { t: "Poliestireno", c: 0 }, { t: "PTFE (teflón)", c: 0 }, { t: "Polipropileno", c: 0 },
        { t: "Nailon 6,6", c: 1 }, { t: "PET", c: 1 }, { t: "Proteína", c: 1 }, { t: "Almidón", c: 1 }, { t: "PLA", c: 1 }
      ]
    },
    clas2: {
      titulo: "Termoplástico, termoestable o elastómero",
      consigna: "Clasifica cada material.",
      categorias: ["Termoplástico", "Termoestable", "Elastómero"],
      items: [
        { t: "Polietileno", c: 0 }, { t: "PVC", c: 0 }, { t: "PET", c: 0 }, { t: "Nailon", c: 0 },
        { t: "Baquelita", c: 1 }, { t: "Melamina (mangos)", c: 1 }, { t: "Resina epoxi", c: 1 },
        { t: "Caucho vulcanizado", c: 2 }, { t: "Neopreno", c: 2 }, { t: "Silicona (juntas)", c: 2 }
      ]
    },
    clas3: {
      titulo: "¿Qué vía de tratamiento es?",
      consigna: "Clasifica cada situación.",
      categorias: ["Reciclado mecánico", "Reciclado químico", "Valorización energética"],
      items: [
        { t: "Triturar botellas de PE, fundirlas y moldear cubos", c: 0 }, { t: "Fundir plástico PP triturado para fabricar nuevos tapones", c: 0 },
        { t: "Calentar PET con metanol para recuperar el diol y el diéster", c: 1 }, { t: "Hidrolizar nailon para recuperar sus monómeros", c: 1 },
        { t: "Quemar plástico no reciclable para producir electricidad", c: 2 }, { t: "Usar neumáticos triturados como combustible en cementeras", c: 2 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function n2(id, nivel, enun, c1, c2, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: [{ tipo: "num", etiqueta: c1[0], valor: c1[1] }, { tipo: "num", etiqueta: c2[0], valor: c2[1] }], pistas: pistas, pasos: pasos, resultado: res }); }

  // ---------------- ★
  op("a1", 1, "El PVC se forma a partir del cloroeteno, CH₂=CHCl, sin que se pierda ningún átomo. ¿Qué tipo de polimerización es?", "Tipo", ["Adición", "Condensación", "Hidrólisis", "Combustión"], 0,
    ["¿Hay doble enlace en el monómero? ¿Se libera algo?"], ["Monómero con C=C y sin pérdida de átomos: adición."], "Adición");
  op("a2", 1, "En la formación del nailon 6,6 a partir del diácido y la diamina, ¿qué molécula pequeña se libera en cada enlace?", "Molécula liberada", ["Agua", "Dióxido de carbono", "Hidrógeno", "Cloruro de hidrógeno"], 0,
    ["Se forma una amida a partir de ácido y amina."], ["Ácido + amina → amida + H₂O."], "Agua");
  op("a3", 1, "¿Cuál es el monómero del polipropileno?", "Monómero", ["Propeno", "Propano", "Propino", "Propan-1-ol"], 0,
    ["Se parte de un alqueno de tres carbonos."], ["El polipropileno procede de CH₂=CH−CH₃."], "Propeno");
  nu("a4", 1, "El poliestireno tiene n = 1 500 unidades de estireno (C₈H₈). Calcula su masa molar. (C = 12; H = 1)", "M (g/mol)", 156000,
    ["M(unidad) = M(monómero) en una adición."], ["M(C₈H₈) = 8·12 + 8 = 104 g/mol.", "M = 1 500 · 104 = 156 000 g/mol."], "156 000 g/mol");
  nu("a5", 1, "Un polietileno tiene una masa molar de 84 000 g/mol. ¿Cuántas unidades de eteno (M = 28) tiene? (C = 12; H = 1)", "n", 3000,
    ["n = M(polímero)/M(unidad)."], ["n = 84 000/28 = 3 000."], "3 000 unidades");
  op("a6", 1, "¿Cuál de estos materiales es un polímero natural?", "Natural", ["Almidón", "PVC", "Nailon", "Teflón"], 0,
    ["Piensa en lo que fabrican las plantas."], ["El almidón lo fabrican las plantas; los demás son sintéticos."], "Almidón");
  op("a7", 1, "¿Qué tipo de enlace une los aminoácidos de una proteína?", "Enlace", ["Peptídico", "Glucosídico", "Fosfodiéster", "Iónico"], 0,
    ["Es una amida."], ["−CO−NH−: enlace peptídico."], "Peptídico");
  op("a8", 1, "El monómero de la celulosa es…", "Monómero", ["Glucosa", "Fructosa", "Un aminoácido", "Eteno"], 0,
    ["El mismo que el del almidón."], ["Celulosa y almidón están hechos de glucosa."], "Glucosa");
  nu("a9", 1, "El teflón (PTFE) tiene n = 500 unidades de CF₂−CF₂. Calcula su masa molar. (C = 12; F = 19)", "M (g/mol)", 50000,
    ["M(C₂F₄) = 100."], ["M(C₂F₄) = 2·12 + 4·19 = 100 g/mol.", "M = 500 · 100 = 50 000 g/mol."], "50 000 g/mol");
  op("a10", 1, "¿Cuál de estos polímeros se puede fundir y moldear de nuevo?", "Se puede refundir", ["Un termoplástico", "Un termoestable", "Una red muy entrecruzada", "La ebonita"], 0,
    ["No tiene enlaces covalentes entre cadenas."], ["Los termoplásticos solo tienen fuerzas intermoleculares entre cadenas."], "Un termoplástico");
  op("a11", 1, "¿Qué plástico lleva el código de reciclado 1?", "Código 1", ["PET", "PVC", "PP", "PS"], 0,
    ["Botellas de agua."], ["Código 1 = PET."], "PET");
  nu("a12", 1, "Calcula la masa molar de la unidad repetida del PET sabiendo que se forma con ácido tereftálico (M = 166) y etano-1,2-diol (M = 62), con pérdida de 2 H₂O. (H₂O = 18)", "M unidad (g/mol)", 192,
    ["Suma de monómeros menos el agua."], ["166 + 62 = 228.", "228 − 2·18 = 192 g/mol."], "192 g/mol");
  op("a13", 1, "Un copolímero es un polímero…", "Copolímero", ["con dos o más monómeros distintos", "de un solo monómero", "siempre natural", "que no se puede reciclar"], 0,
    ["«Co-» significa «junto»."], ["Se forma con más de un tipo de monómero, como el SBR."], "Con dos o más monómeros distintos");
  op("a14", 1, "¿Qué debe tener un monómero para polimerizar por adición?", "Requisito", ["Un doble enlace C=C", "Un grupo −OH y un −COOH", "Un anillo aromático", "Un halógeno"], 0,
    ["El enlace que se abre."], ["El C=C se abre y une los monómeros."], "Un doble enlace C=C");
  nu("a15", 1, "Calcula la masa molar del dipéptido Gly-Gly. Glicina: M = 75. (H₂O = 18)", "M (g/mol)", 132,
    ["Dos aminoácidos y un enlace."], ["2·75 = 150.", "Se libera 1 H₂O: 150 − 18 = 132 g/mol."], "132 g/mol");

  // ---------------- ★★
  n2("b1", 2, "(Tipo EvAU) Se hacen reaccionar 29,2 g de ácido hexanodioico (M = 146) con 23,2 g de hexano-1,6-diamina (M = 116) para formar nailon 6,6 con rendimiento del 100 %. Calcula la masa de nailon formada y la masa de agua liberada. (H₂O = 18)",
    ["m nailon (g)", 45.2], ["m agua (g)", 7.2],
    ["Cada unidad usa 1 ácido y 1 diamina y libera 2 H₂O.", "La masa se conserva."],
    ["n(ácido) = 29,2/146 = 0,200 mol; n(diamina) = 23,2/116 = 0,200 mol.", "Agua: 0,400 mol · 18 = 7,2 g.", "Nailon = 29,2 + 23,2 − 7,2 = 45,2 g."], "45,2 g de nailon y 7,2 g de agua");
  nu("b3", 2, "Se polimerizan 500 kg de propeno con un rendimiento del 90 %. ¿Qué masa de polipropileno se obtiene, en kg?", "m PP (kg)", 450,
    ["En una adición no se libera nada."], ["La masa del polímero máxima es la del monómero: 500 kg.", "500 · 0,90 = 450 kg."], "450 kg");
  nu("b4", 2, "Un PVC tiene una masa molar media de 87 500 g/mol. ¿Cuántas unidades de cloroeteno contiene? (C = 12; H = 1; Cl = 35,5)", "n", 1400,
    ["M(CH₂=CHCl) = 62,5."], ["M(C₂H₃Cl) = 24 + 3 + 35,5 = 62,5 g/mol.", "n = 87 500/62,5 = 1 400."], "1 400 unidades");
  nu("b5", 2, "Calcula la masa molar del tripéptido Ala-Ala-Ala. Alanina: M = 89. (H₂O = 18)", "M (g/mol)", 231,
    ["Tres aminoácidos, dos enlaces peptídicos."], ["3·89 = 267.", "2 H₂O: 267 − 36 = 231 g/mol."], "231 g/mol");
  nu("b6", 2, "Se hidrolizan por completo 32,4 g de almidón. ¿Cuántos gramos de glucosa se obtienen? (C = 12; H = 1; O = 16)", "m glucosa (g)", 36.0,
    ["Cada unidad C₆H₁₀O₅ recupera una molécula de agua."], ["M(unidad) = 162 → 32,4 g = 0,200 mol de unidades.", "Se consumen 0,200 mol de H₂O = 3,6 g.", "Glucosa = 32,4 + 3,6 = 36,0 g."], "36,0 g");
  nu("b7", 2, "Se queman 5,00 kg de polipropileno, (C₃H₆)<sub>n</sub>. ¿Cuántos kg de CO₂ se emiten? (C = 12; H = 1; O = 16)", "m CO₂ (kg)", 15.7,
    ["La unidad C₃H₆ da 3 CO₂."], ["M(C₃H₆) = 42; n = 5 000/42 = 119,05 mol de unidades.", "CO₂ = 3 · 119,05 = 357,14 mol.", "m = 357,14 · 44 = 15 714 g = 15,7 kg."], "15,7 kg", 0.01);
  nu("b8", 2, "Se queman 250 g de PVC. ¿Qué masa de HCl se libera? (C = 12; H = 1; Cl = 35,5)", "m HCl (g)", 146,
    ["Cada unidad C₂H₃Cl libera 1 HCl."], ["M(unidad) = 62,5; n = 250/62,5 = 4,00 mol.", "m(HCl) = 4,00 · 36,5 = 146 g."], "146 g");
  op("b9", 2, "El monómero del polímero −[CH₂−CHF]<sub>n</sub>− es…", "Monómero", ["CH₂=CHF", "CH₃−CH₂F", "CHF=CHF", "CH₂F−CH₂F"], 0,
    ["Vuelve a poner el doble enlace entre los dos carbonos."], ["Los dos carbonos de la cadena son CH₂ y CHF.", "Se restablece el C=C: CH₂=CHF."], "CH₂=CHF");
  op("b10", 2, "Un poliéster tiene unidad repetida −[O−CH₂−CH₂−O−CO−(CH₂)₄−CO]<sub>n</sub>−. ¿De qué monómeros procede?", "Monómeros", ["Etano-1,2-diol y ácido hexanodioico", "Etanol y ácido etanoico", "Etano-1,2-diamina y ácido hexanodioico", "Eteno y hexano"], 0,
    ["Rompe los enlaces éster y devuelve el agua."], ["−O−CH₂−CH₂−O− viene del diol HO−CH₂−CH₂−OH.", "−CO−(CH₂)₄−CO− viene del ácido HOOC−(CH₂)₄−COOH (hexanodioico)."], "Etano-1,2-diol y ácido hexanodioico");
  nu("b11", 2, "Un caucho SBR tiene 2 unidades de butadieno (C₄H₆, M = 54) por cada una de estireno (C₈H₈, M = 104). ¿Qué % en masa es estireno?", "% estireno", 49.1,
    ["Masa del bloque: 2 butadieno + 1 estireno."], ["2·54 + 104 = 212 g.", "104/212 · 100 = 49,1 %."], "49,1 %");
  nu("b12", 2, "Una cadena de PET tiene M = 38 400 g/mol (unidad repetida: 192 g/mol). ¿Cuántas unidades repetidas contiene?", "n", 200,
    ["n = M/M(unidad)."], ["38 400/192 = 200."], "200 unidades");
  op("b13", 2, "¿Cuál de estas sustancias NO puede dar un polímero por adición?", "No polimeriza por adición", ["Etano", "Eteno", "Cloroeteno", "Estireno"], 0,
    ["Necesita C=C."], ["El etano solo tiene enlaces simples: no hay enlace π que abrir."], "Etano");
  nu("b14", 2, "Se polimerizan 3,20 mol de cloroeteno por adición. ¿Cuántos gramos de PVC se obtienen si el rendimiento es del 100 %? (C = 12; H = 1; Cl = 35,5)", "m PVC (g)", 200,
    ["M(monómero) = M(unidad)."], ["M(C₂H₃Cl) = 62,5.", "3,20 · 62,5 = 200 g."], "200 g");
  n2("b15", 2, "Se polimerizan 180 g de ácido láctico (C₃H₆O₃, M = 90) para dar PLA (unidad C₃H₄O₂, M = 72) con rendimiento del 100 %. Calcula la masa de PLA y la de agua liberada. (H₂O = 18)",
    ["m PLA (g)", 144], ["m agua (g)", 36],
    ["Cada molécula de ácido pierde una de agua."],
    ["n(ácido) = 180/90 = 2,00 mol → 2,00 mol de unidades.", "PLA = 2,00 · 72 = 144 g.", "Agua = 2,00 · 18 = 36 g. Comprobación: 144 + 36 = 180 g."], "144 g de PLA y 36 g de agua");
  op("b16", 2, "En la vulcanización del caucho, ¿qué se forma entre las cadenas?", "Puentes", ["Puentes de azufre", "Enlaces de hidrógeno solo", "Enlaces iónicos", "Dobles enlaces nuevos"], 0,
    ["Se calienta con azufre."], ["El azufre reacciona con los dobles enlaces y une las cadenas."], "Puentes de azufre");
  nu("b17", 2, "Una muestra contiene 30 cadenas de 20 000 g/mol y 70 cadenas de 40 000 g/mol. ¿Cuál es su masa molar media por número de cadenas, en g/mol?", "M media (g/mol)", 34000,
    ["Media ponderada por el número de cadenas."], ["(30·20 000 + 70·40 000)/100 = (600 000 + 2 800 000)/100 = 34 000 g/mol."], "34 000 g/mol");

  // ---------------- ★★★
  nu("c1", 3, "(Tipo EvAU) Se parten de 100 kg de ácido tereftálico (M = 166) y exceso de etano-1,2-diol (M = 62) para obtener PET (unidad repetida M = 192). Con un rendimiento del 85 %, calcula los kg de PET.", "m PET (kg)", 98.3,
    ["El ácido es el limitante: 1 mol de ácido da 1 mol de unidad."], ["n(ácido) = 100 000/166 = 602,4 mol.", "Teórico = 602,4 · 192 = 115 663 g = 115,7 kg.", "Real = 115,7 · 0,85 = 98,3 kg."], "98,3 kg");
  nu("c2", 3, "Una cadena de nailon 6,6 tiene M = 22 600 g/mol. La unidad repetida (M = 226) se forma con un diácido (M = 146) y una diamina (M = 116). ¿Cuántas unidades repetidas tiene?", "n", 100,
    ["226 = 146 + 116 − 36."], ["n = 22 600/226 = 100 unidades repetidas."], "100 unidades");
  nu("c3", 3, "Una proteína tiene una masa molar de 55 000 g/mol y la masa media de un residuo de aminoácido (aminoácido menos H₂O) es 110 g/mol. ¿Cuántos enlaces peptídicos tiene, aproximadamente?", "Enlaces", 499,
    ["Residuos ≈ M/110; los enlaces son uno menos."], ["n = 55 000/110 = 500 residuos (aprox.).", "Enlaces peptídicos = n − 1 = 499."], "≈ 499", 0.02);
  nu("c4", 3, "Calcula el porcentaje en masa de flúor del PTFE. (C = 12; F = 19)", "% F", 76,
    ["Usa la unidad repetida C₂F₄."], ["M(C₂F₄) = 100.", "4·19/100 · 100 = 76 %."], "76 %");
  nu("c5", 3, "Se queman 10,0 g de poliestireno, (C₈H₈)<sub>n</sub>. Calcula el volumen de CO₂ a 25 °C y 1 atm. (C = 12; H = 1; R = 0,082 atm·L/(mol·K))", "V (L)", 18.8,
    ["Cada unidad da 8 CO₂."], ["n(unidad) = 10,0/104 = 0,09615 mol.", "n(CO₂) = 8 · 0,09615 = 0,7692 mol.", "V = nRT/p = 0,7692 · 0,082 · 298 / 1 = 18,8 L."], "18,8 L");
  nu("c6", 3, "Un copolímero de cloroeteno (C₂H₃Cl, M = 62,5) y eteno (C₂H₄, M = 28) contiene un 40,0 % en masa de cloro. ¿Qué porcentaje de sus unidades son de cloroeteno (en moles)? (Cl = 35,5)", "% unidades de cloroeteno", 51.6,
    ["Sea x las unidades de cloroeteno e y las de eteno."], ["35,5x = 0,400(62,5x + 28y) → 35,5x − 25x = 11,2y → 10,5x = 11,2y.", "x/y = 1,0667.", "Fracción = x/(x+y) = 1,0667/2,0667 = 0,516 → 51,6 %."], "51,6 %");
  nu("c7", 3, "En un caucho vulcanizado hay 4 átomos de azufre por cada 100 unidades de isopreno (C₅H₈, M = 68). ¿Qué % en masa de azufre contiene? (S = 32)", "% S", 1.85,
    ["Masa total = 100·68 + 4·32."], ["Isopreno: 100 · 68 = 6 800 g. Azufre: 4 · 32 = 128 g.", "% S = 128/(6 800 + 128) · 100 = 1,85 %."], "1,85 %");
  op("c8", 3, "El nailon 6 tiene unidad repetida −[NH−(CH₂)₅−CO]<sub>n</sub>−. ¿Cuál es su monómero?", "Monómero", ["H₂N−(CH₂)₅−COOH", "HOOC−(CH₂)₄−COOH", "H₂N−(CH₂)₆−NH₂", "HO−(CH₂)₅−COOH"], 0,
    ["Hay un solo tipo de enlace amida por unidad."], ["Se rompe la amida y se devuelve el agua: −NH₂ en un extremo y −COOH en el otro: ácido 6-aminohexanoico."], "H₂N−(CH₂)₅−COOH");
  nu("c9", 3, "¿Cuántos kg de glucosa hacen falta para obtener 81,0 kg de almidón por condensación completa? (unidad C₆H₁₀O₅, M = 162; glucosa, M = 180)", "m glucosa (kg)", 90,
    ["Cada unidad de almidón viene de una glucosa menos una H₂O."], ["81,0 kg / 162 = 0,500 kmol de unidades.", "Glucosa = 0,500 · 180 = 90,0 kg (y se liberan 9,0 kg de agua)."], "90,0 kg");
  nu("c10", 3, "Un decapéptido se forma con 10 aminoácidos de masa molar media 128 g/mol. ¿Cuál es su masa molar? (H₂O = 18)", "M (g/mol)", 1118,
    ["Nueve enlaces peptídicos."], ["10 · 128 = 1 280 g/mol.", "Se liberan 9 H₂O: 1 280 − 9 · 18 = 1 118 g/mol."], "1 118 g/mol");
  nu("c11", 3, "Una cadena de ADN de 1 000 nucleótidos (M media de un nucleótido: 330 g/mol) se forma liberando una molécula de agua por cada enlace fosfodiéster. Calcula su masa molar, en g/mol.", "M (g/mol)", 312018,
    ["Mil nucleótidos, 999 enlaces."], ["1 000 · 330 = 330 000 g/mol.", "Se liberan 999 H₂O: 999 · 18 = 17 982 g/mol.", "M = 330 000 − 17 982 = 312 018 g/mol."], "≈ 3,12·10⁵ g/mol", 0.01);
  nu("c12", 3, "El ácido 6-aminohexanoico (M = 131) polimeriza a nailon 6. Una cadena de 200 monómeros, ¿qué masa molar tiene? (H₂O = 18)", "M (g/mol)", 22618,
    ["200 monómeros, 199 enlaces."], ["200 · 131 = 26 200 g/mol.", "199 · 18 = 3 582 g/mol.", "M = 26 200 − 3 582 = 22 618 g/mol."], "22 618 g/mol", 0.01);
  op("c13", 3, "El enlace que une los nucleótidos en una cadena de ADN es…", "Enlace", ["Fosfodiéster", "Peptídico", "Glucosídico", "De hidrógeno"], 0,
    ["Une un fosfato con un azúcar."], ["El fosfato de un nucleótido se une al azúcar del siguiente por dos enlaces éster (fosfodiéster). Los enlaces de hidrógeno unen las dos cadenas entre sí, no los nucleótidos de una misma cadena."], "Fosfodiéster");
  op("c14", 3, "¿Qué ventaja de los poliésteres y poliamidas frente al polietileno explica que puedan reciclarse químicamente?", "Ventaja", ["Tienen enlaces éster o amida que se pueden hidrolizar", "Tienen dobles enlaces C=C", "Son termoestables", "No contienen carbono"], 0,
    ["Piensa en la reacción inversa a la condensación."], ["La hidrólisis rompe la amida o el éster y devuelve los monómeros; los enlaces C−C del polietileno no se rompen con agua."], "Tienen enlaces éster o amida que se pueden hidrolizar");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Adición frente a condensación", ancha: true,
      tabla: { cab: ["", "Adición", "Condensación"], filas: [
        ["Monómero", "con C=C", "con dos grupos reactivos (−COOH, −NH₂, −OH)"],
        ["Qué ocurre", "se abre el enlace π", "se forma un enlace y sale una molécula pequeña"],
        ["Se libera", "nada", "H₂O (casi siempre)"],
        ["Unidad repetida", "= monómero", "&lt; suma de monómeros"],
        ["Cadena principal", "solo C−C", "con −CO−NH−, −CO−O−…"],
        ["Ejemplos", "PE, PP, PVC, PS, PTFE", "nailon, PET, proteínas, almidón"]
      ] },
      nota: "Pregunta al polímero: ¿hay amidas o ésteres en la cadena? Entonces es de condensación." },
    { titulo: "Polímeros sintéticos", ancha: true,
      tabla: { cab: ["Polímero", "Monómero", "Usos"], filas: [
        ["PE", "CH₂=CH₂", "bolsas, botellas"],
        ["PP", "CH₂=CH−CH₃", "envases, tapones"],
        ["PVC", "CH₂=CHCl", "tuberías, ventanas"],
        ["PS", "CH₂=CH−C₆H₅", "bandejas, aislante"],
        ["PTFE", "CF₂=CF₂", "antiadherente"],
        ["Nailon 6,6", "diácido + diamina", "fibras, cuerdas"],
        ["PET", "diácido + diol", "botellas, fibras"]
      ] },
      nota: "Los cuatro primeros solo cambian el sustituyente X de CH₂=CHX." },
    { titulo: "Biopolímeros", ancha: true,
      tabla: { cab: ["Biopolímero", "Monómero", "Enlace"], filas: [
        ["Polisacárido", "glucosa", "glucosídico (C−O−C)"],
        ["Proteína", "α-aminoácido", "peptídico (−CO−NH−)"],
        ["Ácido nucleico", "nucleótido", "fosfodiéster"]
      ] },
      nota: "n unidades → n − 1 enlaces → n − 1 H₂O." },
    { titulo: "Fórmulas del tema",
      items: [
        { label: "Masa molar", formula: "M = n · M(unidad)", cuando: "Cualquier polímero.", ejemplo: "n = 2 000 y 28 g/mol: 56 000 g/mol.", ojo: "Usa la unidad repetida, no el monómero, en condensación." },
        { label: "Unidad (condensación)", formula: "M(unidad) = ΣM(monómeros) − k·18", cuando: "k = H₂O por unidad (2 en nailon y PET, 1 en péptido).", ejemplo: "146 + 116 − 36 = 226.", ojo: "Los extremos añaden 18, despreciable." },
        { label: "Agua liberada", formula: "n − 1 (aminoácidos), 2n − 1 (diácido + diamina)", cuando: "Cadena lineal de n unidades.", ejemplo: "Tripéptido: 2 H₂O." },
        { label: "Combustión", formula: "(CH₂)<sub>n</sub> + 3n/2 O₂ → n CO₂ + n H₂O", cuando: "Polietileno.", ejemplo: "1 kg PE: 3,14 kg CO₂." }
      ],
      nota: "Siempre masa media, porque las cadenas no son todas iguales." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "Dibujar el doble enlace en el polímero de adición", bien: "−[CH₂−CHX]<sub>n</sub>− solo con enlaces simples", por: "El C=C se ha abierto." },
        { mal: "Olvidar el agua en la condensación", bien: "Escribir (2n − 1) H₂O o n − 1 H₂O", por: "Cada enlace libera una molécula." },
        { mal: "Tripéptido = 3 enlaces peptídicos", bien: "2 enlaces", por: "n − 1." },
        { mal: "Masa del polímero de condensación = suma de monómeros", bien: "menos el agua", por: "Se conserva la masa total, no la del polímero." },
        { mal: "Termoestable = plástico duro", bien: "red que no se refunde", por: "Se define por el calor." },
        { mal: "Almidón y celulosa tienen monómeros distintos", bien: "los dos son de glucosa (α o β)", por: "Cambia la orientación del enlace." }
      ] }
  ];

  B.registrar("quimica2", "t11", { resumen: resumen, secciones: B.parte.q2t11a.secciones, nuevas: B.parte.q2t11b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
