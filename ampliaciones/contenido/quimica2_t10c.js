/* ============================================================
   Química II · ampliaciones · Tema 10: Reactividad de los compuestos del carbono
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Tipos</b>: sustitución (cambia un átomo/grupo), adición (se rompe un π y se añaden dos grupos), eliminación (se pierden dos grupos y aparece un π), condensación (dos moléculas se unen y sueltan H₂O u otra pequeña), oxidación-reducción y combustión. Ruptura homolítica → radicales; heterolítica → iones (carbocationes, carbaniones).",
    "<b>Sustitución</b>: alcanos + X₂ con luz UV (radicalaria, mezcla de productos); R−X + OH⁻(aq) → alcohol; benceno + X₂/FeX₃ o HNO₃/H₂SO₄ (sustituye, no adiciona).",
    "<b>Adición</b> a C=C y C≡C: H₂ (Pt/Ni), X₂, HX, H₂O/H⁺. <b>Markovnikov</b>: el H al carbono con más H (el carbocatión más estable: terciario &gt; secundario &gt; primario). El Br₂ se decolora.",
    "<b>Eliminación</b>: alcohol + H₂SO₄ conc. caliente, o R−X + KOH/etanol. <b>Saytzeff</b>: el alqueno mayoritario es el más sustituido (el H sale del carbono vecino con menos H).",
    "<b>Condensación</b>: ácido + alcohol ⇌ éster + H₂O (K ≈ 4; mejora con exceso o quitando agua); hidrólisis ácida (reversible) y básica o saponificación (irreversible, da sal); ácido + amina → amida + H₂O.",
    "<b>Oxidación de alcoholes</b> con K₂Cr₂O₇/H⁺: primario → aldehído → ácido; secundario → cetona; terciario no reacciona. Reducción: C=O + H₂ → alcohol. <b>Combustión</b>: C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + y/2 H₂O.",
    "<b>Efectos</b>: inductivo (−I atrae: Cl, OH, NO₂; +I cede: alquilo; por enlaces σ, se atenúa con la distancia) y mesómero (+M/−M por enlaces π o pares libres). Nucleófilo = cede un par (OH⁻, NH₃, CN⁻); electrófilo = busca un par (H⁺, NO₂⁺, carbocationes)."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«Propeno + HBr → 1-bromopropano, porque el Br se une al carbono con más hidrógenos.» ¿Qué falla?",
          op: ["Nada", "Markovnikov: el H va al carbono con más H y el Br al que tiene menos; el principal es el 2-bromopropano", "El producto es 3-bromopropano", "No hay adición"], ok: 1,
          porque: "El H se une al carbono con más H (C1, con 2 H); el Br queda en el C2 (carbocatión secundario, más estable). El 1-bromopropano es el minoritario." },
        { q: "«La deshidratación del butan-2-ol da sobre todo but-1-eno, porque el OH está cerca del C1.» ¿Qué falla?",
          op: ["Nada", "Saytzeff: domina el alqueno más sustituido, el but-2-eno", "No se forma ningún alqueno", "Se forma un éter siempre"], ok: 1,
          porque: "El alqueno más estable (doble enlace con más grupos alquilo) es el but-2-eno; el H sale del carbono vecino con menos H (el C3)." },
        { q: "«El 2-metilpropan-2-ol se oxida con dicromato a una cetona.» ¿Qué falla?",
          op: ["Nada", "Es un alcohol terciario: el C−OH no tiene H y no se oxida", "Se oxida a aldehído", "Se oxida a ácido"], ok: 1,
          porque: "Para oxidarse hace falta al menos un H en el carbono del −OH. El terciario no tiene ninguno, así que no reacciona en condiciones suaves." },
        { q: "«El etanol y el ácido etanoico dan etanoato de etilo con un rendimiento del 100 % si se calienta bastante.» ¿Qué falla?",
          op: ["Nada", "Es un equilibrio (K ≈ 4): con cantidades iguales el máximo es el 67 %; calentar no lo cambia", "La reacción es irreversible", "El catalizador la completa"], ok: 1,
          porque: "El catalizador y la temperatura aceleran, pero el rendimiento lo fija K. Para pasar del 67 % hay que poner exceso de un reactivo o quitar el agua." },
        { q: "«La saponificación es reversible, como la esterificación.» ¿Qué falla?",
          op: ["Nada", "En medio básico el ácido se transforma en su sal (carboxilato) y no vuelve a reaccionar: es irreversible", "Solo es reversible con KOH", "Es una oxidación"], ok: 1,
          porque: "La hidrólisis ácida es el camino inverso de Fischer (equilibrio). La básica consume la base y forma RCOO⁻, que no se esterifica: avanza hasta el final." },
        { q: "«El benceno + Br₂ con FeBr₃ da 1,2-dibromociclohexa-3,5-dieno (adición).» ¿Qué falla?",
          op: ["Nada", "El benceno sustituye (da bromobenceno + HBr) para conservar la estabilidad aromática", "Es una eliminación", "Se obtiene hexabromociclohexano"], ok: 1,
          porque: "Una adición rompería la deslocalización de los electrones π. El benceno reacciona con electrófilos por sustitución." },
        { q: "«2 C₂H₆ + 5 O₂ → 4 CO₂ + 6 H₂O» ¿Qué falla?",
          op: ["Nada", "Faltan oxígenos: son 7 O₂ (8 + 6 = 14 átomos de O)", "Sobran los CO₂", "Debe ser 3 H₂O"], ok: 1,
          porque: "Productos: 4 CO₂ (8 O) + 6 H₂O (6 O) = 14 O → 7 O₂. La ecuación correcta es 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O." },
        { q: "«El CH₃CH₂Br con NaOH acuoso y calor da eteno.» ¿Qué falla?",
          op: ["Nada", "NaOH en agua sustituye (da etanol); la eliminación necesita KOH disuelto en etanol", "Da etano", "Da ácido etanoico"], ok: 1,
          porque: "En agua el OH⁻ actúa de nucleófilo (sustitución → etanol). En etanol, con calor, actúa de base y arranca un H (eliminación → eteno)." },
        { q: "«El ácido tricloroetanoico es más débil que el etanoico porque los Cl ocupan sitio.» ¿Qué falla?",
          op: ["Nada", "Es más fuerte: los Cl (−I) atraen electrones, estabilizan el carboxilato y aumentan la acidez", "Los Cl tienen efecto +I", "No cambia la acidez"], ok: 1,
          porque: "pKa 0,66 frente a 4,76: unas 12 000 veces más fuerte. El efecto inductivo −I estabiliza el anión." },
        { q: "«El alcohol primario siempre se oxida a aldehído y nada más.» ¿Qué falla?",
          op: ["Nada", "Con exceso de oxidante el aldehído sigue oxidándose a ácido carboxílico", "Se oxida a cetona", "No se oxida"], ok: 1,
          porque: "Primario → aldehído → ácido. Solo se aísla el aldehído si se destila a medida que se forma." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La reacción CH₂=CH₂ + H₂O → CH₃CH₂OH (H⁺) es de…", op: ["adición", "sustitución", "eliminación", "condensación"], ok: 0, porque: "Se rompe el enlace π y se añaden H y OH." },
        { q: "El producto mayoritario de CH₃−CH=CH₂ + HCl es…", op: ["2-cloropropano", "1-cloropropano", "1,2-dicloropropano", "propano"], ok: 0, porque: "Markovnikov: el H al C1 (más H), el Cl al C2." },
        { q: "El producto mayoritario de la deshidratación del pentan-2-ol es…", op: ["pent-2-eno", "pent-1-eno", "pentano", "pentanal"], ok: 0, porque: "Saytzeff: el alqueno más sustituido." },
        { q: "El propan-2-ol oxidado con K₂Cr₂O₇/H⁺ da…", op: ["propanona", "propanal", "ácido propanoico", "propeno"], ok: 0, porque: "Alcohol secundario → cetona." },
        { q: "¿Qué reacción libera agua como subproducto?", op: ["esterificación", "adición de HBr", "hidrogenación", "saponificación"], ok: 0, porque: "En la condensación ácido + alcohol sale H₂O." },
        { q: "Un reactivo nucleófilo es…", op: ["una especie con un par de electrones que ceder", "una especie con déficit de electrones", "un catalizador", "un radical"], ok: 0, porque: "Nucleófilo = busca el núcleo (carga +)." },
        { q: "Un grupo con efecto inductivo −I…", op: ["atrae electrones por los enlaces σ", "cede electrones por los σ", "atrae por los π", "no se transmite"], ok: 0, porque: "−I: electronegativo, atrae." },
        { q: "La sustitución radicalaria de alcanos necesita…", op: ["luz ultravioleta", "KOH en etanol", "H₂SO₄ concentrado", "K₂Cr₂O₇"], ok: 0, porque: "La luz rompe el X₂ en radicales." },
        { q: "¿Cuántos mol de O₂ consume 1 mol de etanol en su combustión completa?", op: ["3", "2", "3,5", "1"], ok: 0, porque: "x + y/4 − z/2 = 2 + 1,5 − 0,5 = 3." },
        { q: "El benceno reacciona con Br₂/FeBr₃ por…", op: ["sustitución", "adición", "eliminación", "polimerización"], ok: 0, porque: "Conserva el anillo aromático." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: reactividad orgánica",
      cartas: [
        { a: "Sustitución, adición, eliminación", b: "Sustitución: cambia un grupo. Adición: se rompe un π y se añade. Eliminación: se pierde un grupo en cada C vecino y aparece un π." },
        { a: "Regla de Markovnikov", b: "En HX + alqueno asimétrico, el H va al carbono con más H; X al que tiene menos. Razón: carbocatión más estable (terciario &gt; secundario &gt; primario)." },
        { a: "Regla de Saytzeff", b: "En la eliminación domina el alqueno más sustituido: el H sale del carbono vecino con menos H." },
        { a: "Oxidación de alcoholes", b: "Primario → aldehído → ácido. Secundario → cetona. Terciario: no reacciona. Dicromato: naranja → verde (Cr³⁺)." },
        { a: "Esterificación", b: "Ácido + alcohol ⇌ éster + H₂O (H₂SO₄, calor). K ≈ 4: 67 % con cantidades iguales. Más rendimiento: exceso de reactivo o quitar agua." },
        { a: "Hidrólisis del éster", b: "Ácida: reversible, vuelve a ácido + alcohol. Básica (saponificación): irreversible, da sal + alcohol." },
        { a: "Combustión completa", b: "C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + y/2 H₂O. Orden de ajuste: C, H, O." },
        { a: "Nucleófilo y electrófilo", b: "Nucleófilo cede un par (OH⁻, NH₃, CN⁻) y ataca δ⁺. Electrófilo busca un par (H⁺, NO₂⁺, carbocatión) y ataca zonas ricas en e⁻." },
        { a: "Efecto inductivo", b: "Por enlaces σ, se atenúa con la distancia. −I (Cl, OH, NO₂) atrae; +I (alquilo) cede. Explica acidez y estabilidad de carbocationes." },
        { a: "Efecto mesómero", b: "Deslocalización por π o pares libres. +M: −OH, −NH₂. −M: C=O, −NO₂. Explica el carboxilato, el fenol y la anilina." },
        { a: "Benceno", b: "Sustituye (no adiciona) para conservar el anillo aromático: halogenación (X₂/FeX₃), nitración (HNO₃/H₂SO₄)." },
        { a: "Sustitución o eliminación", b: "R−X + NaOH acuoso → alcohol (sustitución). R−X + KOH en etanol, calor → alqueno (eliminación)." }
      ]
    },
    emp1: {
      titulo: "Empareja reactivo y producto",
      consigna: "Une cada reacción con su producto principal.",
      pares: [["Propeno + HBr", "2-bromopropano"], ["Etanol + H₂SO₄ conc., 170 °C", "eteno"], ["Propan-2-ol + K₂Cr₂O₇/H⁺", "propanona"], ["Etanol + exceso de K₂Cr₂O₇/H⁺", "ácido etanoico"],
        ["Etanoato de etilo + NaOH", "etanoato de sodio + etanol"], ["Eteno + Br₂", "1,2-dibromoetano"], ["Benceno + HNO₃/H₂SO₄", "nitrobenceno"], ["Bromoetano + NaOH(aq)", "etanol"]]
    },
    clas1: {
      titulo: "¿Qué tipo de reacción es?",
      consigna: "Toca cada reacción y después su tipo.",
      categorias: ["Sustitución", "Adición", "Eliminación", "Condensación", "Combustión"],
      items: [
        { t: "CH₄ + Cl₂ → CH₃Cl + HCl (UV)", c: 0 }, { t: "CH₃CH₂Br + NaOH(aq) → CH₃CH₂OH + NaBr", c: 0 }, { t: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O", c: 0 },
        { t: "CH₂=CH₂ + H₂ → CH₃CH₃", c: 1 }, { t: "CH₃CH=CH₂ + HBr → CH₃CHBrCH₃", c: 1 }, { t: "CH≡CH + 2 Br₂ → CHBr₂CHBr₂", c: 1 },
        { t: "CH₃CH₂OH → CH₂=CH₂ + H₂O", c: 2 }, { t: "CH₃CHBrCH₃ + KOH(etanol) → CH₃CH=CH₂ + KBr + H₂O", c: 2 },
        { t: "CH₃COOH + CH₃OH → CH₃COOCH₃ + H₂O", c: 3 }, { t: "CH₃COOH + CH₃NH₂ → CH₃CONHCH₃ + H₂O", c: 3 },
        { t: "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O", c: 4 }, { t: "2 C₂H₂ + 5 O₂ → 4 CO₂ + 2 H₂O", c: 4 }
      ]
    },
    clas2: {
      titulo: "Nucleófilo o electrófilo",
      consigna: "Clasifica cada especie.",
      categorias: ["Nucleófilo", "Electrófilo"],
      items: [
        { t: "HO⁻", c: 0 }, { t: "NH₃", c: 0 }, { t: "CN⁻", c: 0 }, { t: "H₂O", c: 0 }, { t: "CH₃−O⁻", c: 0 },
        { t: "H⁺", c: 1 }, { t: "NO₂⁺", c: 1 }, { t: "AlCl₃", c: 1 }, { t: "(CH₃)₃C⁺", c: 1 }, { t: "Br⁺ (del Br₂ polarizado)", c: 1 }
      ]
    },
    orden2: {
      titulo: "Ordena un problema de estequiometría orgánica",
      consigna: "Pon los pasos de un problema con rendimiento en el orden correcto.",
      items: [
        { t: "Escribir y ajustar la reacción", nota: "con los coeficientes enteros" },
        { t: "Pasar las masas dadas a moles", nota: "n = m/M" },
        { t: "Identificar el reactivo limitante", nota: "moles / coeficiente: el menor" },
        { t: "Usar la relación molar para hallar los moles teóricos del producto", nota: "coeficientes de la ecuación" },
        { t: "Aplicar el rendimiento", nota: "real = teórico · η" },
        { t: "Convertir a la unidad pedida", nota: "masa = n·M; volumen = nRT/p" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function tx(id, nivel, enun, etq, vals, pistas, pasos, res, f) { var c = { tipo: "texto", etiqueta: etq, valores: vals }; if (f) c.formula = true; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  var DAT = "Datos: C = 12; H = 1; O = 16; Br = 80; Na = 23; R = 0,082 atm·L/(mol·K). ";

  // ---------------- ★
  op("c1", 1, "Clasifica la reacción CH₃CH₂Br + NaOH(aq) → CH₃CH₂OH + NaBr.", "Tipo", ["sustitución", "adición", "eliminación", "condensación"], 0,
    ["¿Se pierde o se gana un enlace π? ¿Cambia un grupo por otro?"], ["El OH⁻ reemplaza al Br⁻ en el mismo carbono.", "No hay enlaces múltiples antes ni después: sustitución."], "Sustitución");
  op("c2", 1, "Clasifica la reacción CH₃−CH=CH₂ + H₂ → CH₃−CH₂−CH₃.", "Tipo", ["adición", "sustitución", "eliminación", "combustión"], 0,
    ["Desaparece un enlace π."], ["El doble enlace se rompe y se añaden dos H.", "Es una adición (hidrogenación)."], "Adición");
  tx("c3", 1, "Escribe el nombre del producto principal de la reacción de propeno con HCl.", "Producto principal", ["2-cloropropano"],
    ["Markovnikov: el H va al carbono con más H."], ["C1 (=CH₂) tiene 2 H; C2 (=CH−) tiene 1 H.", "El H se une al C1 y el Cl al C2: CH₃−CHCl−CH₃."], "2-cloropropano");
  op("c4", 1, "¿Qué condiciones deshidratan un alcohol a alqueno?", "Reactivo", ["H₂SO₄ concentrado y calor", "NaOH acuoso", "K₂Cr₂O₇ / H⁺", "Cl₂ y luz UV"], 0,
    ["Se pierde agua: hace falta un deshidratante ácido."], ["El H₂SO₄ concentrado protona el −OH y favorece la salida de H₂O.", "Con calor se forma el alqueno."], "H₂SO₄ conc. y calor");
  tx("c5", 1, "El etanol se oxida con exceso de K₂Cr₂O₇ en medio ácido. Escribe el nombre del producto final.", "Producto", ["ácido etanoico", "ácido acético", "acido etanoico", "acido acetico"],
    ["Primario → aldehído → ácido."], ["CH₃CH₂OH → CH₃CHO (etanal).", "Con exceso de oxidante: CH₃COOH."], "Ácido etanoico");
  op("c6", 1, "¿Qué ocurre al tratar el 2-metilpropan-2-ol con K₂Cr₂O₇/H⁺?", "Resultado", ["no se oxida", "da una cetona", "da un aldehído", "da un ácido"], 0,
    ["Mira cuántos H hay en el carbono del −OH."], ["Es un alcohol terciario: el C−OH no tiene H.", "No hay oxidación en condiciones suaves."], "No reacciona");
  op("c7", 1, "En la esterificación ácido + alcohol, ¿qué molécula pequeña se libera?", "Subproducto", ["agua", "CO₂", "HCl", "H₂"], 0,
    ["Es una condensación."], ["El OH del ácido y el H del alcohol forman H₂O."], "Agua");
  tx("c8", 1, "Nombra el éster que se forma al hacer reaccionar ácido etanoico con metanol.", "Éster", ["etanoato de metilo", "acetato de metilo"],
    ["Ácido → «-oato»; alcohol → «-ilo»."], ["CH₃COOH + CH₃OH ⇌ CH₃COOCH₃ + H₂O.", "Etanoato de metilo."], "Etanoato de metilo");
  nu("c9", 1, "¿Cuántos moles de O₂ se consumen en la combustión completa de 1 mol de metano?", "n(O₂) (mol) =", 2,
    ["CH₄ + ? O₂ → CO₂ + 2 H₂O."], ["CH₄ + 2 O₂ → CO₂ + 2 H₂O.", "2 mol de O₂."], "2 mol");
  nu("c10", 1, "Ajusta la combustión de etano: 2 C₂H₆ + x O₂ → 4 CO₂ + 6 H₂O. ¿Cuánto vale x?", "x =", 7,
    ["Cuenta los átomos de O de los productos."], ["O: 4·2 + 6 = 14.", "x = 14/2 = 7."], "7");
  op("c11", 1, "CH₂=CH₂ + Cl₂ → CH₂Cl−CH₂Cl es una reacción de…", "Tipo", ["adición", "sustitución", "eliminación", "combustión"], 0,
    ["Hay un π en el reactivo y no en el producto."], ["Se rompe el π y se añaden dos Cl."], "Adición");
  op("c12", 1, "¿Cuál de estas especies es un reactivo nucleófilo?", "Nucleófilo", ["HO⁻", "H⁺", "NO₂⁺", "AlCl₃"], 0,
    ["Nucleófilo = tiene un par de electrones que ceder."], ["El HO⁻ tiene pares libres y carga negativa.", "Los otros tres buscan electrones."], "HO⁻");
  op("c13", 1, "¿Cuál de estos grupos tiene efecto inductivo −I?", "Grupo", ["−Cl", "−CH₃", "−CH₂CH₃", "−C(CH₃)₃"], 0,
    ["−I atrae electrones."], ["El Cl es muy electronegativo y atrae.", "Los alquilo son +I."], "−Cl");
  op("c14", 1, "El benceno reacciona con Br₂ en presencia de FeBr₃ mediante…", "Tipo", ["sustitución", "adición", "eliminación", "polimerización"], 0,
    ["Hay que conservar el sistema aromático."], ["Se sustituye un H por Br: C₆H₅Br + HBr."], "Sustitución");
  nu("c15", 1, "El pKa del ácido cloroetanoico es 2,87. Calcula su Ka (da el resultado en unidades de 10⁻³).", "Ka (·10⁻³) =", 1.35,
    ["Ka = 10^(−pKa)."], ["Ka = 10^(−2,87) = 1,35·10⁻³."], "1,35·10⁻³", 0.01);

  // ---------------- ★★
  tx("m1", 2, "Escribe el nombre del alqueno que se forma mayoritariamente al deshidratar el butan-2-ol.", "Alqueno", ["but-2-eno", "2-buteno"],
    ["Regla de Saytzeff."], ["Vecinos del C2: C1 (3 H) y C3 (2 H).", "Sale el H del C3 (menos H): CH₃−CH=CH−CH₃."], "But-2-eno");
  tx("m2", 2, "Escribe el nombre del producto principal de 2-metilbut-2-eno + HBr.", "Producto", ["2-bromo-2-metilbutano"],
    ["Mira qué carbono del doble enlace tiene H."], ["(CH₃)₂C=CH−CH₃: el C3 tiene 1 H y el C2 ninguno.", "H al C3, Br al C2: carbocatión terciario.", "(CH₃)₂CBr−CH₂−CH₃: 2-bromo-2-metilbutano."], "2-bromo-2-metilbutano");
  nu("m3", 2, "Se hacen reaccionar 5,0 g de propeno con HBr en exceso. Calcula la masa de 2-bromopropano obtenida con un rendimiento del 80 %. " + DAT, "m (g) =", 11.7,
    ["M(C₃H₆) = 42; M(C₃H₇Br) = 123."], ["n = 5,0/42 = 0,119 mol → 0,119 mol teóricos.", "m teórica = 0,119 · 123 = 14,6 g.", "m real = 14,6 · 0,80 = 11,7 g."], "11,7 g", 0.01);
  nu("m4", 2, "Calcula el volumen de CO₂ (25 °C, 1 atm) que se desprende al quemar 10,0 g de propano. " + DAT, "V (L) =", 16.7,
    ["C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O."], ["n(C₃H₈) = 10,0/44 = 0,227 mol.", "n(CO₂) = 0,682 mol.", "V = 0,682 · 0,082 · 298 = 16,7 L."], "16,7 L", 0.01);
  nu("m5", 2, "Calcula los moles de O₂ que consumen 10,0 g de propano en su combustión completa. " + DAT, "n(O₂) (mol) =", 1.14,
    ["Relación 1 : 5."], ["n(C₃H₈) = 0,227 mol.", "n(O₂) = 5 · 0,227 = 1,14 mol."], "1,14 mol", 0.01);
  nu("m6", 2, "Se mezclan 12,0 g de ácido etanoico (M = 60) y 9,2 g de etanol (M = 46). Si K = 4 para la esterificación, ¿cuántos gramos de etanoato de etilo (M = 88) hay en el equilibrio?", "m (g) =", 11.7,
    ["Plantea K = x²/((0,2 − x)²)."], ["n(ácido) = n(alcohol) = 0,200 mol.", "x/(0,200 − x) = 2 → x = 0,133 mol.", "m = 0,133 · 88 = 11,7 g."], "11,7 g", 0.01);
  nu("m7", 2, "Se deshidratan 23,0 g de etanol (M = 46) con un rendimiento del 90 %. ¿Qué volumen de eteno se recoge a 25 °C y 1 atm?", "V (L) =", 11.0,
    ["1 mol de alcohol → 1 mol de alqueno."], ["n(etanol) = 0,500 mol; real: 0,450 mol.", "V = 0,450 · 0,082 · 298 = 11,0 L."], "11,0 L", 0.01);
  tx("m8", 2, "Escribe el nombre del alqueno mayoritario que resulta de calentar 2-bromobutano con KOH disuelto en etanol.", "Alqueno", ["but-2-eno", "2-buteno"],
    ["Eliminación de HBr + Saytzeff."], ["Vecinos del C2: C1 (CH₃) y C3 (CH₂).", "Sale el H del C3 (menos H): CH₃−CH=CH−CH₃."], "But-2-eno");
  nu("m9", 2, "El etanol se oxida a ácido etanoico: 3 CH₃CH₂OH + 2 Cr₂O₇²⁻ + 16 H⁺ → 3 CH₃COOH + 4 Cr³⁺ + 11 H₂O. ¿Qué volumen (mL) de K₂Cr₂O₇ 0,10 mol/L oxida 4,6 g de etanol (M = 46)?", "V (mL) =", 667,
    ["Relación 3 etanol : 2 dicromato."], ["n(etanol) = 0,10 mol.", "n(Cr₂O₇²⁻) = 0,10·2/3 = 0,0667 mol.", "V = 0,0667/0,10 = 0,667 L = 667 mL."], "667 mL", 0.01);
  nu("m10", 2, "Calcula la entalpía de combustión del etanol líquido (kJ/mol). ΔH°f: C₂H₅OH(l) = −277,7; CO₂(g) = −393,5; H₂O(l) = −285,8 kJ/mol.", "ΔHc (kJ/mol) =", -1366.7,
    ["C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O."], ["ΔH = 2(−393,5) + 3(−285,8) − (−277,7).", "= −787,0 − 857,4 + 277,7 = −1 366,7 kJ/mol."], "−1 366,7 kJ/mol", 0.005);
  nu("m11", 2, "¿Qué energía (kJ) se libera al quemar 100 g de etanol (M = 46) si ΔHc = −1 366,7 kJ/mol?", "E (kJ) =", 2971,
    ["n = m/M."], ["n = 100/46 = 2,17 mol.", "E = 2,17 · 1 366,7 = 2 971 kJ."], "2 971 kJ", 0.005);
  nu("m12", 2, "La combustión de 1,50 g de un compuesto de C, H y O produce 2,20 g de CO₂ y 0,90 g de H₂O. Calcula los gramos de oxígeno de la muestra. " + DAT, "m(O) (g) =", 0.8,
    ["C y H salen del CO₂ y del H₂O; el O es lo que falta."], ["m(C) = 2,20·12/44 = 0,600 g.", "m(H) = 0,90·2/18 = 0,100 g.", "m(O) = 1,50 − 0,700 = 0,800 g."], "0,800 g", 0.01);
  nu("m13", 2, "Con los datos anteriores (M = 60 g/mol), ¿cuántos átomos de hidrógeno tiene la fórmula molecular? ", "n.º de H =", 4,
    ["Calcula la fórmula empírica C : H : O."], ["n(C) = 0,05; n(H) = 0,10; n(O) = 0,05 → CH₂O (M = 30).", "60/30 = 2 → C₂H₄O₂."], "4 (C₂H₄O₂)", 0.01);
  nu("m14", 2, "2,1 g de un hidrocarburo de M = 42 g/mol decoloran 8,0 g de Br₂ (M = 160). ¿Cuántos enlaces π (C=C) tiene cada molécula?", "n.º de C=C =", 1,
    ["Compara los moles de hidrocarburo y de Br₂."], ["n(HC) = 0,050 mol; n(Br₂) = 0,050 mol.", "Relación 1 : 1 → un enlace π."], "1", 0.01);
  nu("m15", 2, "¿Qué volumen de H₂ (condiciones normales) hidrogena totalmente 5,2 g de etino (M = 26) a etano?", "V (L) =", 8.96,
    ["Cada mol de etino necesita 2 mol de H₂."], ["n(etino) = 0,20 mol → n(H₂) = 0,40 mol.", "V = 0,40 · 22,4 = 8,96 L."], "8,96 L", 0.01);
  nu("m16", 2, "¿Cuántos monoclorados constitucionales distintos da el propano con Cl₂ y luz UV?", "n.º de productos =", 2,
    ["Cuenta los tipos de H."], ["H primarios (C1 y C3) y H secundarios (C2).", "1-cloropropano y 2-cloropropano."], "2", 0.01);
  nu("m17", 2, "En la monocloración del propano, un H secundario es 3,8 veces más reactivo que uno primario. ¿Qué porcentaje del producto es 2-cloropropano?", "% =", 55.9,
    ["6 H primarios y 2 H secundarios."], ["Peso 1-cloro: 6·1 = 6. Peso 2-cloro: 2·3,8 = 7,6.", "% = 7,6/13,6 = 55,9 %."], "55,9 %", 0.01);
  nu("m18", 2, "Se hidrolizan con NaOH 8,8 g de etanoato de etilo (M = 88). Calcula la masa de etanoato de sodio (M = 82) obtenida. ", "m (g) =", 8.2,
    ["Relación 1 : 1."], ["n(éster) = 0,100 mol.", "m = 0,100 · 82 = 8,2 g."], "8,2 g", 0.01);
  nu("m19", 2, "¿Qué volumen (mL) de NaOH 0,50 mol/L hace falta para saponificar exactamente 8,8 g de etanoato de etilo (M = 88)?", "V (mL) =", 200,
    ["n(NaOH) = n(éster)."], ["n = 0,100 mol.", "V = 0,100/0,50 = 0,20 L = 200 mL."], "200 mL", 0.01);
  nu("m20", 2, "¿Cuántas veces es más fuerte el ácido cloroetanoico (pKa = 2,87) que el etanoico (pKa = 4,76)?", "Ka₂/Ka₁ =", 77.6,
    ["Razón = 10^(ΔpKa)."], ["10^(4,76 − 2,87) = 10^1,89 = 77,6."], "77,6", 0.01);
  nu("m21", 2, "Se nitran 7,8 g de benceno (M = 78) con rendimiento del 80 %. ¿Qué masa de nitrobenceno (M = 123) se obtiene?", "m (g) =", 9.84,
    ["C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O."], ["n = 0,10 mol; teórico 12,3 g.", "Real = 12,3 · 0,80 = 9,84 g."], "9,84 g", 0.01);

  // ---------------- ★★★ (EvAU)
  ge("d1", 3, "(EvAU) El propeno reacciona con HBr. (a) Clasifica la reacción. (b) Nombra el producto mayoritario. (c) Calcula los gramos que se obtienen a partir de 5,0 g de propeno con un rendimiento del 80 %. " + DAT,
    [{ tipo: "opcion", etiqueta: "(a) Tipo", opciones: ["adición", "sustitución", "eliminación", "condensación"], ok: 0 },
     { tipo: "texto", etiqueta: "(b) Producto", valores: ["2-bromopropano"] },
     { tipo: "num", etiqueta: "(c) m (g) =", valor: 11.7, tol: 0.01 }],
    ["Markovnikov; M(C₃H₇Br) = 123."], ["(a) Se rompe el π y se añaden H y Br: adición.", "(b) H al C1 (2 H), Br al C2: 2-bromopropano.", "(c) 5,0/42 = 0,119 mol → 14,6 g teóricos → 11,7 g."], "(a) adición; (b) 2-bromopropano; (c) 11,7 g");
  ge("d2", 3, "(EvAU) Para el propan-2-ol: (a) escribe el nombre del compuesto que resulta de su deshidratación con H₂SO₄ concentrado y calor; (b) escribe el nombre del que resulta de su oxidación con K₂Cr₂O₇/H⁺.",
    [{ tipo: "texto", etiqueta: "(a) Deshidratación", valores: ["propeno"] }, { tipo: "texto", etiqueta: "(b) Oxidación", valores: ["propanona", "acetona"] }],
    ["Secundario: da cetona."], ["(a) CH₃CH(OH)CH₃ → CH₃CH=CH₂ + H₂O (eliminación).", "(b) CH₃CH(OH)CH₃ → CH₃COCH₃ (cetona)."], "(a) propeno; (b) propanona");
  nu("d3", 3, "(EvAU) La deshidrohalogenación del 2-bromobutano con KOH/etanol puede dar tres alquenos (contando los estereoisómeros). ¿Cuántos son exactamente?", "n.º de alquenos =", 3,
    ["But-1-eno y but-2-eno; este tiene isomería geométrica."], ["But-1-eno.", "<i>cis</i>-but-2-eno y <i>trans</i>-but-2-eno.", "Total 3 (el mayoritario es el <i>trans</i>)."], "3", 0.01);
  nu("d4", 3, "En el equilibrio CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O (K = 4) se parte de 1 mol de ácido y 10 mol de etanol. ¿Qué rendimiento (%, respecto al ácido) se alcanza?", "η (%) =", 97.4,
    ["(K − 1)x² − K(a + b)x + K·a·b = 0."], ["x² = 4(1 − x)(10 − x) → 3x² − 44x + 40 = 0.", "x = (44 − √(1936 − 480))/6 = 0,974 mol.", "η = 97,4 %."], "97,4 %", 0.005);
  nu("d5", 3, "¿Qué volumen de aire (21 % en volumen de O₂), en condiciones normales (22,4 L/mol), se necesita para quemar 1,00 kg de butano (M = 58)?", "V (L) =", 11954,
    ["C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O."], ["n(butano) = 1 000/58 = 17,24 mol.", "n(O₂) = 6,5 · 17,24 = 112,1 mol → 2 510 L.", "Aire = 2 510/0,21 = 11 954 L."], "≈ 11 950 L", 0.005);
  nu("d6", 3, "Se hacen reaccionar 10,0 g de eteno (M = 28) con 10,0 g de Br₂ (M = 160). ¿Qué masa de 1,2-dibromoetano (M = 188) se forma?", "m (g) =", 11.75,
    ["Reactivo limitante."], ["n(eteno) = 0,357; n(Br₂) = 0,0625 → limitante Br₂.", "m = 0,0625 · 188 = 11,75 g."], "11,75 g", 0.01);
  nu("d7", 3, "Para la reacción 3 CH₃CH(OH)CH₃ + Cr₂O₇²⁻ + 8 H⁺ → 3 CH₃COCH₃ + 2 Cr³⁺ + 7 H₂O, ¿qué volumen (mL) de K₂Cr₂O₇ 0,200 mol/L oxida 6,0 g de propan-2-ol (M = 60)?", "V (mL) =", 166.7,
    ["Relación 3 : 1."], ["n(alcohol) = 0,100 mol.", "n(dicromato) = 0,0333 mol.", "V = 0,0333/0,200 = 0,167 L."], "166,7 mL", 0.01);
  nu("d8", 3, "Calcula la entalpía de hidrogenación del eteno (C₂H₄ + H₂ → C₂H₆) con ΔHc (kJ/mol): C₂H₄ = −1 411; H₂ = −286; C₂H₆ = −1 560.", "ΔH (kJ/mol) =", -137,
    ["Con combustiones: reactivos − productos."], ["ΔH = (−1 411) + (−286) − (−1 560).", "= −137 kJ/mol."], "−137 kJ/mol", 0.01);
  nu("d9", 3, "¿Qué pH tiene una disolución 0,10 mol/L de ácido cloroetanoico (pKa = 2,87)? Resuelve la ecuación de segundo grado.", "pH =", 1.96,
    ["Ka = 10^(−2,87) = 1,35·10⁻³."], ["x² + Ka·x − 0,10·Ka = 0.", "x = 1,10·10⁻² mol/L.", "pH = −log x = 1,96."], "1,96", 0.01);
  ge("d10", 3, "(EvAU) Dadas las reacciones: (i) CH₃CH₂CH₂Br + NaOH(aq); (ii) CH₃CHBrCH₃ + KOH/etanol, calor. Escribe el nombre del producto orgánico de cada una.",
    [{ tipo: "texto", etiqueta: "(i)", valores: ["propan-1-ol", "1-propanol"] }, { tipo: "texto", etiqueta: "(ii)", valores: ["propeno"] }],
    ["NaOH acuoso sustituye; KOH/etanol elimina."], ["(i) Sustitución: CH₃CH₂CH₂OH.", "(ii) Eliminación: CH₃CH=CH₂ + KBr + H₂O."], "(i) propan-1-ol; (ii) propeno");
  op("d11", 3, "El fenol (pKa ≈ 10) es más ácido que el etanol (pKa ≈ 16). La causa principal es que…", "Causa", ["el anión fenóxido reparte su carga negativa por el anillo (resonancia)", "el fenol tiene más átomos de C", "el etanol tiene efecto −I", "el fenol es un ácido carboxílico"], 0,
    ["Piensa en la estabilidad del anión que queda."], ["Al perder H⁺ queda un anión.", "En el fenóxido la carga se deslocaliza (efecto mesómero): anión más estable → ácido más fuerte."], "Resonancia del anión");
  op("d12", 3, "Entre CH₃COOH (4,76), ClCH₂COOH (2,87) y CH₃CH₂COOH (4,87), ¿cuál es el orden de acidez creciente?", "Orden", ["propanoico &lt; etanoico &lt; cloroetanoico", "cloroetanoico &lt; etanoico &lt; propanoico", "etanoico &lt; propanoico &lt; cloroetanoico", "propanoico &lt; cloroetanoico &lt; etanoico"], 0,
    ["Mayor pKa = más débil."], ["pKa: propanoico 4,87 &gt; etanoico 4,76 &gt; cloroetanoico 2,87.", "Acidez creciente: propanoico &lt; etanoico &lt; cloroetanoico."], "propanoico < etanoico < cloroetanoico");
  op("d13", 3, "En la reacción CH₃Br + OH⁻ → CH₃OH + Br⁻, ¿cuál es el nucleófilo y cuál el electrófilo?", "Papel", ["OH⁻ nucleófilo; el C del CH₃Br electrófilo", "Br⁻ nucleófilo; OH⁻ electrófilo", "CH₃Br nucleófilo; OH⁻ electrófilo", "ambos son electrófilos"], 0,
    ["El C−Br está polarizado."], ["El Br atrae electrones (−I): el C es δ⁺ (electrófilo).", "El OH⁻ ataca con su par de electrones (nucleófilo); el Br⁻ sale."], "OH⁻ nucleófilo; C electrófilo");
  op("d14", 3, "¿Cuál de las siguientes reacciones NO es una oxidación orgánica?", "Reacción", ["CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃", "CH₃CH₂OH → CH₃CHO", "CH₃CHO → CH₃COOH", "CH₃CH₂OH + 3 O₂ → 2 CO₂ + 3 H₂O"], 0,
    ["Oxidar = ganar O o perder H."], ["La primera gana H: es una reducción.", "Las otras ganan O o pierden H."], "La hidrogenación de la cetona");
  nu("d15", 3, "Un compuesto contiene 40,0 % de C, 6,7 % de H y 53,3 % de O en masa y su M es 180 g/mol. ¿Cuántos átomos de carbono tiene su fórmula molecular? (C = 12; H = 1; O = 16)", "n.º de C =", 6,
    ["Empírica con los porcentajes como gramos de 100 g."], ["C: 40,0/12 = 3,33; H: 6,7/1 = 6,7; O: 53,3/16 = 3,33.", "Relación 1 : 2 : 1 → CH₂O (30).", "180/30 = 6 → C₆H₁₂O₆."], "6 (C₆H₁₂O₆)", 0.01);

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Reacciones orgánicas de un vistazo", ancha: true,
      tabla: { cab: ["Tipo", "Reactivo y condiciones", "Resultado"], filas: [
        ["Sustitución radicalaria", "alcano + X₂, luz UV", "R−X + HX (mezcla)"],
        ["Sustitución nucleófila", "R−X + NaOH(aq)", "R−OH + NaX"],
        ["Sustitución en benceno", "X₂/FeX₃; HNO₃/H₂SO₄", "Ar−X; Ar−NO₂"],
        ["Adición", "C=C + H₂ (Ni); X₂; HX; H₂O/H⁺", "alcano; dihalogenuro; Markovnikov"],
        ["Eliminación", "alcohol + H₂SO₄ conc.; R−X + KOH/etanol", "alqueno (Saytzeff)"],
        ["Condensación", "ácido + alcohol (H₂SO₄); ácido + amina", "éster + H₂O; amida + H₂O"],
        ["Hidrólisis", "éster + H₂O/H⁺; éster + NaOH", "ácido + alcohol; sal + alcohol"],
        ["Oxidación", "alcohol + K₂Cr₂O₇/H⁺", "aldehído → ácido; cetona; terciario no"],
        ["Combustión", "compuesto + O₂", "CO₂ + H₂O"]
      ] },
      nota: "Lee siempre las condiciones: NaOH(aq) sustituye; KOH/etanol elimina." },
    { titulo: "Markovnikov y Saytzeff", ancha: true,
      tabla: { cab: ["Regla", "Se aplica a", "Qué dice", "Ejemplo"], filas: [
        ["Markovnikov", "adición de HX o H₂O a un alqueno asimétrico", "el H al C con más H (carbocatión más estable)", "propeno + HBr → 2-bromopropano"],
        ["Saytzeff", "eliminación de H₂O o HX", "domina el alqueno más sustituido (H del C vecino con menos H)", "butan-2-ol → but-2-eno"]
      ] },
      nota: "Estabilidad de carbocationes: terciario &gt; secundario &gt; primario (efecto inductivo +I de los alquilo)." },
    { titulo: "Fórmulas y datos del tema",
      items: [
        { label: "Combustión", formula: "C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + (y/2) H₂O", cuando: "Completa.", ejemplo: "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.", ojo: "Si sale fracción, multiplica por 2." },
        { label: "Rendimiento", formula: "η = real / teórico · 100", cuando: "El teórico se calcula con el limitante.", ejemplo: "14,6 g teóricos · 0,80 = 11,7 g." },
        { label: "Esterificación", formula: "K = [éster][H₂O] / ([ácido][alcohol]) ≈ 4", cuando: "Equilibrio con etanol y ácido etanoico.", ejemplo: "1 : 1 → 67 %; 1 : 10 → 97 %." },
        { label: "Acidez", formula: "Ka = 10^(−pKa)", cuando: "Comparar ácidos.", ejemplo: "pKa 2,87 frente a 4,76 → 78 veces." },
        { label: "Hess", formula: "ΔH = Σ ΔHf(prod) − Σ ΔHf(reac)", cuando: "Con entalpías de formación (con combustión: reac − prod).", ejemplo: "Etanol: −1 366,7 kJ/mol." }
      ],
      nota: "Gases: pV = nRT, o 22,4 L/mol en condiciones normales." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "Propeno + HBr → 1-bromopropano", bien: "2-bromopropano", por: "Markovnikov." },
        { mal: "Butan-2-ol → but-1-eno (principal)", bien: "but-2-eno", por: "Saytzeff." },
        { mal: "Alcohol terciario → cetona", bien: "No se oxida", por: "No tiene H en el C−OH." },
        { mal: "Esterificación al 100 %", bien: "Equilibrio: K ≈ 4 (67 %)", por: "Es reversible." },
        { mal: "NaOH(aq) + R−X → alqueno", bien: "alcohol (sustitución); KOH/etanol elimina", por: "Disolvente." },
        { mal: "Benceno + Br₂ → adición", bien: "sustitución (C₆H₅Br + HBr)", por: "Conserva el anillo." },
        { mal: "Ajustar la combustión sin contar el O de los productos", bien: "C → H → O (y × 2 si hay fracción)", por: "Átomos de O de CO₂ y H₂O." }
      ] }
  ];

  B.registrar("quimica2", "t10", { resumen: resumen, secciones: B.parte.q2t10a.secciones, nuevas: B.parte.q2t10b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
