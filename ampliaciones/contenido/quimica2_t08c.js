/* ============================================================
   Química II · ampliaciones · Tema 8: Oxidación-reducción
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>N.º ox.</b>: carga «contable»: elementos libres 0; F −1; H +1 (−1 en hidruros); O −2 (−1 en peróxidos); la suma es 0 en una molécula y la carga del ion en un ion. <b>Oxidación</b> = pierde e⁻ (n.º ox. sube; es el <b>reductor</b>). <b>Reducción</b> = gana e⁻ (baja; es el <b>oxidante</b>).",
    "<b>Ion-electrón</b>: semirreacciones → átomo que cambia → H₂O (O) → H⁺ (H) → e⁻ (carga) → (medio básico: +OH⁻ en los dos lados) → igualar e⁻ → sumar y simplificar → comprobar átomos y carga.",
    "<b>Pila</b>: reacción espontánea; <b>ánodo (−)</b> oxidación, <b>cátodo (+)</b> reducción; electrones por el cable del ánodo al cátodo; el puente salino lleva aniones al ánodo y cationes al cátodo. Notación: ánodo | ion ‖ ion | cátodo.",
    "<b>Potenciales</b>: E° de reducción; cátodo = el de mayor E°. <b>E°pila = E°cát − E°án</b>. Si E° &gt; 0 hay reacción. ΔG° = −n·F·E° (F = 96 500 C/mol); log K = n·E°/0,0592. E° no se multiplica por coeficientes. Un metal con E° &lt; 0 se disuelve en ácidos no oxidantes (H⁺); el Cu y la Ag necesitan HNO₃.",
    "<b>Valoración redox</b>: ecuación ajustada → n = C·V del valorante → moles del analito por la razón estequiométrica → [analito] = n/V (deshaciendo diluciones). El MnO₄⁻ (5 e⁻) es autoindicador.",
    "<b>Cuba electrolítica</b>: reacción forzada (E° &lt; 0); ánodo (+) oxidación, cátodo (−) reducción. En agua compiten el H₂O y los iones: en el cátodo se reduce el de mayor E°, en el ánodo se oxida el de menor E°.",
    "<b>Faraday</b>: Q = I·t (t en s); n(e⁻) = Q/F; <b>m = M·I·t/(n·F)</b>. En serie pasa la misma carga: m₁/m₂ = (M₁/n₁)/(M₂/n₂). Gases: pV = nRT. <b>Corrosión</b>: protege el metal de menor E° (Zn sí; Sn no)."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«En el H₂O₂, el oxígeno tiene n.º ox. −2, como siempre.» ¿Qué falla?",
          op: ["Nada", "En los peróxidos el O vale −1 (2(+1) + 2x = 0)", "Vale +2", "Vale 0"], ok: 1,
          porque: "El −2 es el valor habitual, pero en los peróxidos (grupo O–O) es −1. Por eso el H₂O₂ puede oxidarse (a O₂) o reducirse (a H₂O)." },
        { q: "«En Zn + Cu²⁺ → Zn²⁺ + Cu, el Cu²⁺ se oxida porque pasa de Cu²⁺ a Cu.» ¿Qué falla?",
          op: ["Nada", "Baja de +2 a 0: gana electrones, es una reducción (el Cu²⁺ es el oxidante)", "El Zn se reduce", "No es una reacción redox"], ok: 1,
          porque: "Reducción = ganar electrones = bajar el n.º ox. El Cu²⁺ se reduce y el Zn se oxida." },
        { q: "«Ajusto MnO₄⁻ → Mn²⁺ así: MnO₄⁻ + 8 H⁺ → Mn²⁺ + 4 H₂O, y ya está.» ¿Qué falla?",
          op: ["Nada", "Falta ajustar la carga: son necesarios 5 e⁻ a la izquierda (+7 frente a +2)", "Sobran los H⁺", "El O no está ajustado"], ok: 1,
          porque: "Átomos sí, pero la carga no: izquierda −1 + 8 = +7; derecha +2. Se añaden 5 e⁻ a la izquierda." },
        { q: "«En medio básico, la semirreacción lleva H⁺ y se deja así.» ¿Qué falla?",
          op: ["Nada", "En medio básico no puede haber H⁺: se convierten en H₂O sumando OH⁻ a los dos lados", "Hay que usar siempre H⁺", "Debe tener solo OH⁻ a la izquierda"], ok: 1,
          porque: "Se ajusta como si fuera ácido y luego se añaden tantos OH⁻ como H⁺ en ambos miembros (H⁺ + OH⁻ → H₂O)." },
        { q: "«En la pila Zn|Cu, el cátodo es el Zn porque es el polo negativo.» ¿Qué falla?",
          op: ["Nada", "El polo negativo es el ánodo, donde se oxida el Zn; el cátodo (reducción, +) es el Cu", "El cátodo es el que se oxida", "Los dos son iguales"], ok: 1,
          porque: "En una pila: ánodo = oxidación = polo negativo; cátodo = reducción = polo positivo." },
        { q: "«Para 2 Ag⁺ + Zn → 2 Ag + Zn²⁺, E° = 2·(0,80) − (−0,76) = 2,36 V.» ¿Qué falla?",
          op: ["Nada", "El potencial no se multiplica por los coeficientes: E° = 0,80 − (−0,76) = 1,56 V", "Se debe sumar siempre", "El Zn es el cátodo"], ok: 1,
          porque: "E° es una propiedad intensiva: no depende de cuántas veces ajustes la semirreacción. Lo que cambia con el ajuste es n (y por tanto ΔG°)." },
        { q: "«E° = −0,34 V para Cu + 2 H⁺ → Cu²⁺ + H₂, luego el Cu se disuelve y desprende H₂.» ¿Qué falla?",
          op: ["Nada", "E° negativo indica que NO es espontánea: el Cu no se disuelve en HCl", "El Cu sí reacciona porque está en medio ácido", "Falta un electrón"], ok: 1,
          porque: "E° &lt; 0 ⇒ ΔG° &gt; 0 ⇒ no es espontánea. El Cu solo se disuelve en ácidos oxidantes (HNO₃, H₂SO₄ concentrado)." },
        { q: "«En una electrólisis el ánodo es el polo negativo, como en la pila.» ¿Qué falla?",
          op: ["Nada", "En la cuba el ánodo es el polo positivo (aunque siga siendo donde ocurre la oxidación)", "El ánodo es siempre el polo negativo", "En la cuba no hay ánodo"], ok: 1,
          porque: "La definición (ánodo = oxidación) no cambia; lo que se invierte es la polaridad, impuesta por el generador." },
        { q: "«Con 2,0 A durante 30 min, Q = 2,0 · 30 = 60 C.» ¿Qué falla?",
          op: ["Nada", "El tiempo debe ir en segundos: Q = 2,0 · 1800 = 3600 C", "Q se mide en amperios", "Hay que dividir por 30"], ok: 1,
          porque: "Q = I·t con t en segundos (1 A = 1 C/s)." },
        { q: "«La lata de conserva (Sn) y el hierro galvanizado (Zn) protegen igual cuando se rayan.» ¿Qué falla?",
          op: ["Nada", "El Zn (E° menor que el Fe) sigue protegiendo; el Sn (E° mayor que el Fe) acelera la corrosión del hierro expuesto", "El Sn protege mejor", "Ninguno protege si se raya"], ok: 1,
          porque: "El metal con E° menor actúa de ánodo y se oxida en lugar del hierro (Zn: −0,76 &lt; Fe: −0,44). El Sn (−0,14) es más noble que el Fe: el Fe se oxida más rápido." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El n.º ox. del Cr en K₂Cr₂O₇ es…", op: ["+6", "+12", "+7", "+3"], ok: 0, porque: "2(+1) + 2x + 7(−2) = 0 → x = +6 por átomo de Cr." },
        { q: "En 2 Mg + O₂ → 2 MgO, el agente oxidante es…", op: ["O₂", "Mg", "MgO", "ninguno"], ok: 0, porque: "El O₂ se reduce (0 → −2) y por eso oxida al Mg." },
        { q: "En la semirreacción de reducción MnO₄⁻ → Mn²⁺ (ácido), los electrones…", op: ["están a la izquierda, 5 e⁻", "están a la derecha, 5 e⁻", "están a la izquierda, 7 e⁻", "no aparecen"], ok: 0, porque: "MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O: la reducción gana electrones." },
        { q: "En una pila, los electrones circulan por el cable…", op: ["del ánodo al cátodo", "del cátodo al ánodo", "del puente salino al ánodo", "no circulan"], ok: 0, porque: "En el ánodo se produce la oxidación y los electrones van hacia el cátodo, donde se reducen." },
        { q: "El puente salino sirve para…", op: ["cerrar el circuito iónico y compensar cargas", "que pasen los electrones", "aumentar la fem", "oxidar el cátodo"], ok: 0, porque: "Los aniones migran al ánodo y los cationes al cátodo: así se mantienen neutras las disoluciones." },
        { q: "La fem de una pila con E°(cátodo) = +0,34 V y E°(ánodo) = −0,13 V es…", op: ["0,47 V", "0,21 V", "−0,47 V", "0,13 V"], ok: 0, porque: "0,34 − (−0,13) = 0,47 V." },
        { q: "¿Cuál de los metales se disuelve en HCl diluido?", op: ["Fe (−0,44 V)", "Cu (+0,34 V)", "Ag (+0,80 V)", "Au (+1,50 V)"], ok: 0, porque: "Solo los de E° negativo (por debajo del H⁺/H₂) desplazan al hidrógeno." },
        { q: "Si E° de una reacción es positivo, entonces ΔG° es…", op: ["negativo", "positivo", "cero", "depende de la masa"], ok: 0, porque: "ΔG° = −nFE°: signo contrario a E°; la reacción es espontánea." },
        { q: "En una cuba electrolítica de NaCl fundido, en el cátodo se obtiene…", op: ["Na", "Cl₂", "H₂", "O₂"], ok: 0, porque: "Na⁺ + e⁻ → Na en el cátodo (−); el Cl⁻ se oxida a Cl₂ en el ánodo (+)." },
        { q: "Una corriente de 2 A durante 965 s transporta…", op: ["1930 C", "482,5 C", "965 C", "2 C"], ok: 0, porque: "Q = I·t = 2 · 965 = 1930 C = 0,02 mol de e⁻." },
        { q: "En dos cubas en serie, lo que es igual en las dos es…", op: ["la carga que las atraviesa", "la masa depositada", "el volumen de gas", "el nº de electrones por átomo"], ok: 0, porque: "La misma intensidad durante el mismo tiempo: misma carga. Las masas dependen de M/n." },
        { q: "Un recubrimiento de Zn protege al hierro aunque esté rayado porque…", op: ["el Zn tiene menor E° y se oxida antes (ánodo de sacrificio)", "el Zn es más caro", "el Zn tiene mayor E°", "forma un aislante"], ok: 0, porque: "E°(Zn²⁺/Zn) = −0,76 V &lt; E°(Fe²⁺/Fe) = −0,44 V: el Zn es el reductor más fuerte." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: oxidación-reducción",
      cartas: [
        { a: "Oxidación y reducción", b: "Oxidación: pierde e⁻ (n.º ox. sube). Reducción: gana e⁻ (baja). Siempre juntas y con los mismos e⁻ perdidos y ganados." },
        { a: "Oxidante y reductor", b: "Oxidante: se reduce (quita e⁻ al otro). Reductor: se oxida (cede e⁻). El oxidante es la forma oxidada del par; el reductor, la reducida." },
        { a: "Reglas del n.º de oxidación", b: "Libre 0; F −1; H +1 (−1 en hidruros); O −2 (−1 en peróxidos); suma = 0 (molécula) o la carga (ion)." },
        { a: "Ion-electrón (orden)", b: "Semirreacciones → H₂O (O) → H⁺ (H) → e⁻ (carga) → [OH⁻ si básico] → igualar e⁻ → sumar → comprobar." },
        { a: "Ánodo y cátodo", b: "Ánodo = oxidación; cátodo = reducción. Pila: ánodo −, cátodo +. Cuba: ánodo +, cátodo −. Los e⁻ van del ánodo al cátodo." },
        { a: "Puente salino", b: "Cierra el circuito: aniones hacia el ánodo, cationes hacia el cátodo. Sin él, la pila se para por acumulación de carga." },
        { a: "fem de una pila", b: "E°pila = E°cátodo − E°ánodo (los dos como reducción). El cátodo es el par con mayor E°. No se multiplica por coeficientes." },
        { a: "Espontaneidad y K", b: "ΔG° = −n·F·E° (F = 96 500 C/mol). log K = n·E°/0,0592. E° &gt; 0 ⇒ espontánea." },
        { a: "Leyes de Faraday", b: "Q = I·t; n(e⁻) = Q/F; m = M·I·t/(n·F). t en segundos. En serie, misma carga: m₁/m₂ = (M₁/n₁)/(M₂/n₂)." },
        { a: "Corrosión y protección", b: "El Fe se oxida (ánodo) y el O₂ se reduce (cátodo) en presencia de agua. Protege el metal de menor E° (Zn, Mg); el Sn solo es barrera." }
      ]
    },
    emp1: {
      titulo: "Empareja par redox y potencial",
      consigna: "Une cada par con su potencial estándar de reducción.",
      pares: [["Zn²⁺/Zn", "−0,76 V"], ["Fe²⁺/Fe", "−0,44 V"], ["H⁺/H₂", "0,00 V"], ["Cu²⁺/Cu", "+0,34 V"], ["Ag⁺/Ag", "+0,80 V"], ["Cl₂/Cl⁻", "+1,36 V"], ["MnO₄⁻/Mn²⁺", "+1,51 V"], ["Al³⁺/Al", "−1,66 V"]]
    },
    orden1: {
      titulo: "Ordena el ajuste ion-electrón",
      consigna: "Pon los pasos en el orden correcto.",
      items: [
        { t: "Calcular los n.º de oxidación y separar las dos semirreacciones", nota: "quién se oxida y quién se reduce" },
        { t: "Ajustar el átomo que cambia", nota: "p. ej. Cr₂O₇²⁻ → 2 Cr³⁺" },
        { t: "Ajustar el oxígeno con H₂O", nota: "donde falte" },
        { t: "Ajustar el hidrógeno con H⁺", nota: "donde falte" },
        { t: "Ajustar la carga con electrones", nota: "e⁻ a la izquierda en la reducción" },
        { t: "Igualar los electrones, sumar y simplificar", nota: "× el MCM" },
        { t: "Comprobar átomos y carga", nota: "a los dos lados" }
      ]
    },
    orden2: {
      titulo: "Ordena un problema de Faraday",
      consigna: "Pon los pasos de «masa depositada» en el orden correcto.",
      items: [
        { t: "Pasar el tiempo a segundos", nota: "1 h = 3600 s" },
        { t: "Calcular la carga Q = I·t", nota: "en culombios" },
        { t: "Moles de electrones = Q/F", nota: "F = 96 500 C/mol" },
        { t: "Moles de sustancia = moles de e⁻ / n", nota: "n de la semirreacción" },
        { t: "Masa = moles · M", nota: "o volumen del gas con pV = nRT" }
      ]
    },
    clas1: {
      titulo: "Oxidante o reductor fuerte",
      consigna: "Toca cada especie y después su carácter (por su posición en la tabla).",
      categorias: ["Oxidante fuerte (E° alto)", "Reductor fuerte (E° muy negativo)"],
      items: [
        { t: "MnO₄⁻ (ácido)", c: 0 }, { t: "Cl₂", c: 0 }, { t: "Cr₂O₇²⁻ (ácido)", c: 0 }, { t: "F₂", c: 0 },
        { t: "Li", c: 1 }, { t: "Na", c: 1 }, { t: "Mg", c: 1 }, { t: "Al", c: 1 }
      ]
    },
    clas2: {
      titulo: "¿Se disuelve en HCl 1 M?",
      consigna: "Con los potenciales de la tabla: toca cada metal y decide.",
      categorias: ["Se disuelve (desprende H₂)", "No reacciona"],
      items: [
        { t: "Zn", c: 0 }, { t: "Mg", c: 0 }, { t: "Fe", c: 0 }, { t: "Al", c: 0 }, { t: "Pb", c: 0 },
        { t: "Cu", c: 1 }, { t: "Ag", c: 1 }, { t: "Au", c: 1 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  var DAT = "Datos: F = 96 500 C/mol. ";
  var EP = "E°: Al³⁺/Al −1,66 V; Zn²⁺/Zn −0,76 V; Fe²⁺/Fe −0,44 V; H⁺/H₂ 0,00 V; Cu²⁺/Cu +0,34 V; Ag⁺/Ag +0,80 V. ";

  // ---------------- ★
  nu("c1", 1, "Calcula el número de oxidación del Mn en el K₂MnO₄.", "n.º ox. del Mn =", 6,
    ["K = +1, O = −2; la suma es 0."], ["2(+1) + x + 4(−2) = 0.", "x = 8 − 2 = +6."], "+6", 0.01);
  nu("c2", 1, "Calcula el número de oxidación del N en el HNO₃.", "n.º ox. del N =", 5,
    ["H = +1, O = −2."], ["(+1) + x + 3(−2) = 0.", "x = +5."], "+5", 0.01);
  nu("c3", 1, "Calcula el número de oxidación del C en el ion carbonato, CO₃²⁻.", "n.º ox. del C =", 4,
    ["La suma es la carga del ion, −2."], ["x + 3(−2) = −2.", "x = +4."], "+4", 0.01);
  op("c4", 1, "¿Cuál es el número de oxidación del oxígeno en el H₂O₂ (agua oxigenada)?", "n.º ox. del O", ["−1", "−2", "0", "+1"], 0,
    ["Es un peróxido: el grupo O–O."], ["H = +1: 2(+1) + 2x = 0.", "x = −1."], "−1");
  op("c5", 1, "En la reacción Zn + Cu²⁺ → Zn²⁺ + Cu, ¿cuál es el agente oxidante?", "Oxidante", ["Cu²⁺", "Zn", "Zn²⁺", "Cu"], 0,
    ["El oxidante es el que se reduce."], ["El Cu²⁺ pasa de +2 a 0: se reduce.", "Por eso oxida al Zn: es el agente oxidante."], "Cu²⁺");
  op("c6", 1, "En 2 Na + Cl₂ → 2 NaCl, ¿cuál es el agente reductor?", "Reductor", ["Na", "Cl₂", "NaCl", "Cl⁻"], 0,
    ["El reductor es el que se oxida."], ["El Na pasa de 0 a +1: pierde electrones, se oxida.", "Es el reductor."], "Na");
  nu("c7", 1, "¿Cuántos electrones pierde cada átomo de Al al pasar a Al³⁺?", "electrones =", 3,
    ["Mira la carga del ion."], ["Al → Al³⁺ + 3 e⁻."], "3", 0.01);
  nu("c8", 1, "En la semirreacción de reducción MnO₄⁻ → Mn²⁺ en medio ácido, ¿cuántos H⁺ hacen falta (coeficiente)?", "coef. de H⁺ =", 8,
    ["Para ajustar los 4 O del permanganato con 4 H₂O."], ["MnO₄⁻ → Mn²⁺ + 4 H₂O.", "4 H₂O contienen 8 H, que se aportan con 8 H⁺."], "8", 0.01);
  nu("c9", 1, "Calcula la fem de la pila Zn|Zn²⁺ ‖ Cu²⁺|Cu. " + EP, "fem (V) =", 1.10,
    ["fem = E°cátodo − E°ánodo; el cátodo es el de mayor E°."], ["Cátodo: Cu (+0,34). Ánodo: Zn (−0,76).", "0,34 − (−0,76) = 1,10 V."], "1,10 V", 0.01);
  op("c10", 1, "En una pila galvánica, el ánodo es…", "Ánodo", ["el polo negativo, donde ocurre la oxidación", "el polo positivo, donde ocurre la oxidación", "el polo negativo, donde ocurre la reducción", "el polo positivo, donde ocurre la reducción"], 0,
    ["Los electrones salen de él."], ["Ánodo = oxidación = los e⁻ se liberan allí → polo negativo."], "Polo negativo, oxidación");
  op("c11", 1, "¿Se disuelve el cobre (E° = +0,34 V) en HCl 1 M? (E°(H⁺/H₂) = 0,00 V)", "¿Se disuelve?", ["No: E° = 0,00 − 0,34 &lt; 0", "Sí: desprende H₂", "Sí: desprende Cl₂", "Solo si se calienta"], 0,
    ["Compara el E° del Cu con el del H⁺."], ["Cu + 2 H⁺ → Cu²⁺ + H₂: E° = 0,00 − 0,34 = −0,34 V.", "Negativo: no es espontánea."], "No reacciona");
  nu("c12", 1, "Calcula ΔG° (en kJ) para una reacción con n = 2 y E° = 1,10 V. " + DAT, "ΔG° (kJ) =", -212.3,
    ["ΔG° = −n·F·E°."], ["ΔG° = −2 · 96 500 · 1,10 = −212 300 J.", "= −212,3 kJ."], "−212,3 kJ", 0.01);
  nu("c13", 1, "Calcula la carga (en C) que pasa por un circuito con 2,0 A durante 10 min.", "Q (C) =", 1200,
    ["Pasa los minutos a segundos."], ["10 min = 600 s.", "Q = 2,0 · 600 = 1200 C."], "1200 C", 0.01);
  nu("c14", 1, "¿Cuántos moles de electrones transportan 4825 C? " + DAT, "n(e⁻) (mol) =", 0.05,
    ["n = Q/F."], ["n = 4825/96 500 = 0,0500 mol."], "0,0500 mol", 0.01);
  nu("c15", 1, "¿Qué masa de cobre se deposita (Cu²⁺ + 2 e⁻ → Cu) con 0,20 mol de electrones? (M(Cu) = 63,5)", "m (g) =", 6.35,
    ["Cada Cu necesita 2 e⁻."], ["Moles de Cu: 0,20/2 = 0,10 mol.", "m = 0,10 · 63,5 = 6,35 g."], "6,35 g", 0.01);
  op("c16", 1, "En una cuba electrolítica, el ánodo es…", "Ánodo en la cuba", ["el polo positivo, donde ocurre la oxidación", "el polo negativo, donde ocurre la oxidación", "el polo positivo, donde ocurre la reducción", "el polo negativo, donde ocurre la reducción"], 0,
    ["El generador impone la polaridad."], ["La definición no cambia: ánodo = oxidación.", "Pero ahora está conectado al polo + del generador."], "Polo positivo, oxidación");

  // ---------------- ★★
  nu("d1", 2, "Calcula el número de oxidación del S en el ion tiosulfato, S₂O₃²⁻.", "n.º ox. del S =", 2,
    ["Hay dos átomos de S."], ["2x + 3(−2) = −2.", "2x = 4 → x = +2."], "+2", 0.01);
  nu("d2", 2, "Calcula el número de oxidación del Fe en el Fe₃O₄ (puede ser fraccionario; escribe el decimal).", "n.º ox. del Fe =", 2.667,
    ["3x + 4(−2) = 0."], ["3x = 8.", "x = 8/3 = +2,67 (media de dos Fe³⁺ y un Fe²⁺)."], "+8/3 ≈ +2,67", 0.01);
  nu("d3", 2, "¿Cuántos electrones se ganan en la semirreacción Cr₂O₇²⁻ + 14 H⁺ + n e⁻ → 2 Cr³⁺ + 7 H₂O?", "n =", 6,
    ["Cada Cr baja de +6 a +3."], ["Cada Cr gana 3 e⁻; hay 2 Cr.", "Carga: izquierda −2 + 14 − n = +6 → n = 6."], "6", 0.01);
  nu("d4", 2, "Al ajustar MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O, ¿cuál es el coeficiente del Fe²⁺?", "coef. de Fe²⁺ =", 5,
    ["El Mn gana 5 e⁻ y cada Fe pierde 1."], ["Reducción: MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O.", "Oxidación ×5: 5 Fe²⁺ → 5 Fe³⁺ + 5 e⁻."], "5", 0.01);
  nu("d5", 2, "Calcula la fem de la pila Al|Al³⁺ ‖ Ag⁺|Ag. " + EP, "fem (V) =", 2.46,
    ["No multipliques los potenciales."], ["0,80 − (−1,66) = 2,46 V."], "2,46 V", 0.01);
  nu("d6", 2, "Calcula la fem de una pila Mg|Mg²⁺ ‖ Cu²⁺|Cu (E°(Mg²⁺/Mg) = −2,37 V; E°(Cu²⁺/Cu) = +0,34 V).", "fem (V) =", 2.71,
    ["fem = E°cátodo − E°ánodo."], ["0,34 − (−2,37) = 2,71 V."], "2,71 V", 0.01);
  op("d7", 2, "¿Puede el Fe³⁺ oxidar al I⁻ a I₂? (E°(Fe³⁺/Fe²⁺) = +0,77 V; E°(I₂/I⁻) = +0,54 V)", "¿Reacciona?", ["Sí: E° = 0,77 − 0,54 = +0,23 V", "No: E° = 0,54 − 0,77 &lt; 0", "Sí, pero solo en medio básico", "No, el yoduro no se oxida nunca"], 0,
    ["El oxidante es el Fe³⁺: ¿está por encima del I₂?"], ["2 Fe³⁺ + 2 I⁻ → 2 Fe²⁺ + I₂.", "E° = 0,77 − 0,54 = +0,23 V &gt; 0."], "Sí, espontánea (+0,23 V)");
  op("d8", 2, "Entre Al, Zn, Cu y Ag (en forma de metal), ¿cuál es el reductor más fuerte? " + EP, "Reductor más fuerte", ["Al", "Zn", "Cu", "Ag"], 0,
    ["El reductor más fuerte tiene el E° más negativo."], ["Al³⁺/Al: −1,66 V es el más bajo."], "Aluminio");
  nu("d9", 2, "Se hace pasar una corriente de 3,0 A durante 40 min por una disolución de CuSO₄. ¿Qué masa de Cu se deposita? " + DAT + "M(Cu) = 63,5.", "m (g) =", 2.37,
    ["Tiempo en segundos; n = 2."], ["Q = 3,0 · 2400 = 7200 C.", "m = 63,5 · 7200/(2 · 96 500) = 2,37 g."], "2,37 g", 0.01);
  nu("d10", 2, "¿Cuántos segundos hacen falta para depositar 5,00 g de Ag de AgNO₃ con una corriente de 2,50 A? " + DAT + "M(Ag) = 107,9.", "t (s) =", 1789,
    ["Ag⁺ + e⁻ → Ag: n = 1."], ["n(Ag) = 5,00/107,9 = 0,04634 mol = n(e⁻).", "Q = 0,04634 · 96 500 = 4472 C; t = 4472/2,50 = 1789 s."], "1789 s (29,8 min)", 0.01);
  nu("d11", 2, "Se valoran 25,0 mL de una disolución de Fe²⁺ con KMnO₄ 0,0100 mol/L en medio ácido y se gastan 20,0 mL. ¿Cuál es la [Fe²⁺] (mol/L)?", "[Fe²⁺] (mol/L) =", 0.04,
    ["MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O."], ["n(MnO₄⁻) = 0,0100 · 0,0200 = 2,00·10⁻⁴ mol.", "n(Fe²⁺) = 5 · 2,00·10⁻⁴ = 1,00·10⁻³ mol.", "[Fe²⁺] = 1,00·10⁻³/0,0250 = 0,0400 mol/L."], "0,0400 mol/L", 0.01);
  nu("d12", 2, "Calcula log K a 25 °C para Zn + Cu²⁺ → Zn²⁺ + Cu (E° = 1,10 V; n = 2).", "log K =", 37.16,
    ["log K = n·E°/0,0592."], ["log K = 2 · 1,10/0,0592 = 37,2."], "log K = 37,2 (K ≈ 10³⁷)", 0.01);
  nu("d13", 2, "Se electroliza agua con 5,0 A durante 30 min. ¿Qué volumen de H₂ (en L) se recoge a 25 °C y 1 atm? " + DAT + "R = 0,082 atm·L/(mol·K).", "V(H₂) (L) =", 1.14,
    ["2 H⁺ + 2 e⁻ → H₂."], ["Q = 5,0 · 1800 = 9000 C → n(e⁻) = 0,0933 mol → n(H₂) = 0,0466 mol.", "V = 0,0466 · 0,082 · 298 = 1,14 L."], "1,14 L", 0.01);
  op("d14", 2, "Se electroliza una disolución acuosa de NaCl con electrodos inertes. ¿Qué se desprende en el cátodo?", "Cátodo", ["H₂", "Na", "Cl₂", "O₂"], 0,
    ["El Na⁺ no se reduce en agua."], ["Cátodo (−): 2 H₂O + 2 e⁻ → H₂ + 2 OH⁻ (el agua se reduce antes que el Na⁺).", "En el ánodo sale Cl₂."], "H₂ (y OH⁻ en la disolución)");
  nu("d15", 2, "Calcula la fem de la pila Cu|Cu²⁺ ‖ Ag⁺|Ag. " + EP, "fem (V) =", 0.46,
    ["Cátodo: el de mayor E°."], ["0,80 − 0,34 = 0,46 V."], "0,46 V", 0.01);
  op("d16", 2, "Se electroliza una disolución acuosa de CuCl₂ con electrodos inertes. ¿Qué se obtiene en el ánodo?", "Ánodo", ["Cl₂", "Cu", "H₂", "Cl⁻ no cambia"], 0,
    ["En el ánodo se oxida el anión."], ["Ánodo (+): 2 Cl⁻ → Cl₂ + 2 e⁻.", "El Cu se deposita en el cátodo."], "Cl₂");
  nu("d17", 2, "Calcula ΔG° (kJ) de la pila Al|Al³⁺ ‖ Ag⁺|Ag (E° = 2,46 V). Reacción: Al + 3 Ag⁺ → Al³⁺ + 3 Ag. " + DAT, "ΔG° (kJ) =", -712.2,
    ["¿Cuántos electrones se intercambian en la reacción ajustada?"], ["n = 3.", "ΔG° = −3 · 96 500 · 2,46 = −712 170 J = −712 kJ."], "−712 kJ", 0.01);
  nu("d18", 2, "En la reacción Cr₂O₇²⁻ + 6 Fe²⁺ + x H⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O, ¿cuánto vale x?", "x =", 14,
    ["Cuenta los H de los 7 H₂O."], ["7 H₂O contienen 14 H; vienen de los H⁺.", "x = 14 (la carga también cuadra: −2 + 14 + 12 = +24 = 6 + 18)."], "14", 0.01);

  // ---------------- ★★★
  ge("e1", 3, "Se monta una pila con Zn en ZnSO₄ 1 M y Ag en AgNO₃ 1 M (E°(Zn²⁺/Zn) = −0,76 V; E°(Ag⁺/Ag) = +0,80 V; M(Zn) = 65,4; M(Ag) = 107,9). Calcula (a) la fem y (b) la masa de Ag que se deposita mientras se disuelven 0,50 g de Zn.",
    [{ tipo: "num", etiqueta: "fem (V) =", valor: 1.56 }, { tipo: "num", etiqueta: "m(Ag) (g) =", valor: 1.65 }],
    ["Zn + 2 Ag⁺ → Zn²⁺ + 2 Ag."], ["(a) 0,80 − (−0,76) = 1,56 V.", "(b) n(Zn) = 0,50/65,4 = 7,65·10⁻³ mol; n(Ag) = 2 · 7,65·10⁻³ = 1,53·10⁻² mol.", "m = 1,53·10⁻² · 107,9 = 1,65 g."], "1,56 V; 1,65 g");
  nu("e2", 3, "Se disuelven 0,2500 g de oxalato de sodio puro, Na₂C₂O₄ (M = 134,0 g/mol), en medio ácido y se valoran con KMnO₄, gastando 18,7 mL. Calcula la concentración (mol/L) del KMnO₄.", "[KMnO₄] (mol/L) =", 0.0399,
    ["2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺ → 2 Mn²⁺ + 10 CO₂ + 8 H₂O."], ["n(C₂O₄²⁻) = 0,2500/134,0 = 1,866·10⁻³ mol.", "n(MnO₄⁻) = (2/5) · 1,866·10⁻³ = 7,46·10⁻⁴ mol.", "C = 7,46·10⁻⁴/0,0187 = 0,0399 mol/L."], "0,0399 mol/L", 0.01);
  nu("e3", 3, "Una muestra de 0,5000 g de mineral de hierro se disuelve y todo el hierro pasa a Fe²⁺. Se valora con K₂Cr₂O₇ 0,0167 mol/L en medio ácido y se gastan 26,1 mL. ¿Qué porcentaje de hierro tiene el mineral? (M(Fe) = 55,85)", "% de Fe =", 29.2,
    ["Cr₂O₇²⁻ + 6 Fe²⁺ + 14 H⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O."], ["n(Cr₂O₇²⁻) = 0,0167 · 0,0261 = 4,36·10⁻⁴ mol.", "n(Fe) = 6 · 4,36·10⁻⁴ = 2,62·10⁻³ mol → 0,146 g.", "% = 0,146/0,5000 · 100 = 29,2 %."], "29,2 %", 0.01);
  nu("e4", 3, "Se diluyen 10,0 mL de agua oxigenada hasta 100 mL. De la disolución diluida se toman 25,0 mL y se valoran con KMnO₄ 0,0150 mol/L en medio ácido, gastando 21,6 mL. Calcula la concentración del agua oxigenada original en g/L (M(H₂O₂) = 34,01).", "[H₂O₂] (g/L) =", 11.0,
    ["2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O. No olvides la dilución."], ["n(MnO₄⁻) = 0,0150 · 0,0216 = 3,24·10⁻⁴ mol → n(H₂O₂) = 8,10·10⁻⁴ mol en 25 mL.", "0,0324 mol/L en la diluida; × 10 = 0,324 mol/L.", "0,324 · 34,01 = 11,0 g/L."], "11,0 g/L", 0.01);
  nu("e5", 3, "Dos cubas electrolíticas, una con CuSO₄ y otra con AgNO₃, están conectadas en serie. En la primera se depositan 1,00 g de Cu. ¿Cuántos gramos de Ag se depositan en la segunda? (M(Cu) = 63,5; M(Ag) = 107,9)", "m(Ag) (g) =", 3.40,
    ["Pasa la misma carga por las dos."], ["n(e⁻) = 2 · 1,00/63,5 = 0,0315 mol.", "n(Ag) = 0,0315 mol (n = 1).", "m = 0,0315 · 107,9 = 3,40 g."], "3,40 g", 0.01);
  nu("e6", 3, "¿Qué intensidad (en A) hace falta para depositar 10,0 g de Al de una sal de Al³⁺ en 2,00 horas? " + DAT + "M(Al) = 27,0.", "I (A) =", 14.9,
    ["Al³⁺ + 3 e⁻ → Al."], ["n(Al) = 0,3704 mol → n(e⁻) = 1,111 mol → Q = 107 200 C.", "t = 7200 s; I = 107 200/7200 = 14,9 A."], "14,9 A", 0.01);
  ge("e7", 3, "Se electroliza una disolución acuosa de NaCl con una corriente de 10,0 A durante 1,00 h. Calcula (a) los moles de electrones, y (b) el volumen de Cl₂ (L) a 25 °C y 1 atm. " + DAT + "R = 0,082 atm·L/(mol·K).",
    [{ tipo: "num", etiqueta: "n(e⁻) (mol) =", valor: 0.373 }, { tipo: "num", etiqueta: "V(Cl₂) (L) =", valor: 4.56 }],
    ["2 Cl⁻ → Cl₂ + 2 e⁻."], ["Q = 10,0 · 3600 = 36 000 C; n(e⁻) = 36 000/96 500 = 0,373 mol.", "n(Cl₂) = 0,373/2 = 0,1865 mol.", "V = 0,1865 · 0,082 · 298 = 4,56 L."], "0,373 mol; 4,56 L");
  nu("e8", 3, "El aluminio se obtiene por electrólisis de Al₂O₃ fundido. ¿Cuántos segundos hacen falta para obtener 1,00 kg de Al con una corriente de 50 000 A? " + DAT + "M(Al) = 27,0.", "t (s) =", 214.4,
    ["Al³⁺ + 3 e⁻ → Al; 1000 g."], ["n(Al) = 1000/27,0 = 37,04 mol → n(e⁻) = 111,1 mol.", "Q = 111,1 · 96 500 = 1,072·10⁷ C; t = Q/I = 214 s."], "214 s (3,6 min)", 0.01);
  ge("e9", 3, "Para Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag calcula (a) ΔG° (kJ) y (b) log K a 25 °C (E°(Ag⁺/Ag) = +0,80 V; E°(Cu²⁺/Cu) = +0,34 V). " + DAT,
    [{ tipo: "num", etiqueta: "ΔG° (kJ) =", valor: -88.8 }, { tipo: "num", etiqueta: "log K =", valor: 15.54 }],
    ["n = 2; E° = 0,46 V."], ["ΔG° = −2 · 96 500 · 0,46 = −88 780 J = −88,8 kJ.", "log K = 2 · 0,46/0,0592 = 15,5."], "−88,8 kJ; log K = 15,5");
  nu("e10", 3, "Una pila Pt|H₂(1 atm)|H⁺(1 M) ‖ Cu²⁺(1 M)|Cu funciona hasta consumirse 1,00 L de H₂ medido a 25 °C y 1 atm. ¿Qué masa de Cu se deposita? (M(Cu) = 63,5; R = 0,082 atm·L/(mol·K))", "m(Cu) (g) =", 2.60,
    ["H₂ + Cu²⁺ → 2 H⁺ + Cu: relación 1 : 1."], ["n(H₂) = pV/RT = 1,00/(0,082 · 298) = 0,0409 mol.", "n(Cu) = 0,0409 mol → m = 0,0409 · 63,5 = 2,60 g."], "2,60 g", 0.01);
  nu("e11", 3, "Se niquela una pieza de 50 cm² de superficie con una corriente de 3,0 A durante 20 min (Ni²⁺ + 2 e⁻ → Ni). Calcula el espesor de la capa en micrómetros (densidad del Ni = 8,9 g/cm³; M = 58,7). " + DAT, "espesor (μm) =", 24.6,
    ["Masa → volumen (m/d) → espesor = V/superficie."], ["m = 58,7 · 3,0 · 1200/(2 · 96 500) = 1,095 g.", "V = 1,095/8,9 = 0,1230 cm³.", "Espesor = 0,1230/50 = 2,46·10⁻³ cm = 24,6 μm."], "24,6 μm", 0.01);
  nu("e12", 3, "Una pila formada por un electrodo de Cu (E° = +0,34 V) y otro desconocido X (que actúa de ánodo) tiene una fem de 1,10 V. ¿Cuánto vale E°(X²⁺/X)?", "E°(X) (V) =", -0.76,
    ["fem = E°cátodo − E°ánodo."], ["1,10 = 0,34 − E°(X).", "E°(X) = 0,34 − 1,10 = −0,76 V (es el Zn)."], "−0,76 V", 0.01);
  ge("e13", 3, "Ajusta Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O. Escribe los coeficientes de Cu, HNO₃, Cu(NO₃)₂, NO y H₂O (en este orden).",
    { tipo: "lista", etiqueta: "Coeficientes:", valores: [3, 8, 3, 2, 4] },
    ["Reducción: NO₃⁻ + 4 H⁺ + 3 e⁻ → NO + 2 H₂O; oxidación: Cu → Cu²⁺ + 2 e⁻."], ["×2 y ×3: 2 NO₃⁻ + 8 H⁺ + 3 Cu → 2 NO + 4 H₂O + 3 Cu²⁺.", "Molecular: 3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O.", "N: 8 = 6 + 2 ✔."], "3, 8, 3, 2, 4");
  op("e14", 3, "Una lata de conserva (hierro recubierto de estaño) se raya y queda el hierro al descubierto. Con E°(Sn²⁺/Sn) = −0,14 V y E°(Fe²⁺/Fe) = −0,44 V, ¿qué ocurre?", "Corrosión", ["El Fe se oxida más rápido (actúa de ánodo)", "El Sn protege al Fe", "No pasa nada", "Se oxida el Sn"], 0,
    ["¿Quién tiene menor E°?"], ["El Fe (−0,44) es más reductor que el Sn (−0,14): se oxida el Fe.", "El estaño solo protege como barrera; rayado, acelera la corrosión."], "El Fe se corroe más deprisa");
  op("e15", 3, "Se electroliza una disolución acuosa con Cu²⁺ y Na⁺. ¿Qué se deposita primero en el cátodo? (E° Cu²⁺/Cu = +0,34 V; Na⁺/Na = −2,71 V)", "Cátodo", ["Cu", "Na", "H₂ y Na a la vez", "Ninguno"], 0,
    ["Se reduce primero lo de mayor E°."], ["0,34 &gt; −0,41 (agua) &gt; −2,71.", "Se deposita Cu; el Na⁺ ni se reduce."], "Cobre");
  nu("e16", 3, "Calcula la fem de la pila Pt|Fe²⁺, Fe³⁺ ‖ Cr₂O₇²⁻, H⁺, Cr³⁺|Pt (E°(Cr₂O₇²⁻/Cr³⁺) = +1,33 V; E°(Fe³⁺/Fe²⁺) = +0,77 V).", "fem (V) =", 0.56,
    ["Cátodo: el dicromato."], ["Cátodo: Cr₂O₇²⁻ (+1,33). Ánodo: Fe²⁺ → Fe³⁺ (+0,77).", "1,33 − 0,77 = 0,56 V."], "0,56 V", 0.01);
  nu("e17", 3, "¿Qué volumen (mL) de K₂Cr₂O₇ 0,100 mol/L, en medio ácido, oxida todo el Fe²⁺ de 25,0 mL de FeSO₄ 0,200 mol/L?", "V (mL) =", 8.33,
    ["Cr₂O₇²⁻ + 6 Fe²⁺ → 2 Cr³⁺ + 6 Fe³⁺ (en medio ácido)."], ["n(Fe²⁺) = 0,200 · 0,0250 = 5,00·10⁻³ mol.", "n(Cr₂O₇²⁻) = 5,00·10⁻³/6 = 8,33·10⁻⁴ mol.", "V = 8,33·10⁻⁴/0,100 = 8,33·10⁻³ L = 8,33 mL."], "8,33 mL", 0.01);
  nu("e18", 3, "La lejía se fabrica con la dismutación Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O. ¿Qué volumen de Cl₂ (L, a 25 °C y 1 atm) hace falta para obtener 100 mL de una disolución de NaClO 0,10 mol/L? (R = 0,082 atm·L/(mol·K))", "V(Cl₂) (L) =", 0.244,
    ["Relación Cl₂ : ClO⁻ = 1 : 1."], ["n(ClO⁻) = 0,10 · 0,100 = 0,0100 mol = n(Cl₂).", "V = 0,0100 · 0,082 · 298/1 = 0,244 L."], "0,244 L", 0.01);

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Redox: fórmulas del tema",
      items: [
        { label: "N.º de oxidación", formula: "Σ n.º ox. = carga total (0 en una molécula)", cuando: "H +1, O −2 (peróxidos −1), metales +, F −1.", ejemplo: "H₂SO₄: 2(+1) + x + 4(−2) = 0 → S = +6.", ojo: "En el Cr₂O₇²⁻ hay 2 Cr: 2x − 14 = −2." },
        { label: "fem y espontaneidad", formula: "E°pila = E°cátodo − E°ánodo", cuando: "Los dos E° son de reducción.", ejemplo: "Cu y Zn: 0,34 − (−0,76) = 1,10 V.", ojo: "No se multiplica por los coeficientes." },
        { label: "Energía libre y K", formula: "ΔG° = −n·F·E° · log K = n·E°/0,0592", cuando: "F = 96 500 C/mol; 25 °C.", ejemplo: "n = 2, E° = 1,10 V: ΔG° = −212 kJ." },
        { label: "Faraday", formula: "Q = I·t · m = M·I·t / (n·F)", cuando: "t en segundos.", ejemplo: "3 A, 40 min, Cu: 2,37 g.", ojo: "n = e⁻ por átomo depositado." },
        { label: "Valoración redox", formula: "C₁V₁ · (e⁻ del valorante) = C₂V₂ · (e⁻ del analito)", cuando: "Equivalencia: e⁻ cedidos = e⁻ ganados.", ejemplo: "MnO₄⁻ (5 e⁻) con Fe²⁺ (1 e⁻): razón 1 : 5." }
      ],
      nota: "Gases en la electrólisis: pV = nRT con n = moles de e⁻ / (e⁻ por molécula)." },
    { titulo: "¿Qué tipo de problema es?", ancha: true,
      tabla: { cab: ["Datos", "Método"], filas: [
        ["reactivos con cambios de n.º ox.", "ion-electrón: H₂O, H⁺, e⁻ (+ OH⁻)"],
        ["dos pares y E°", "cátodo = mayor E°; E° = cát − án; ΔG° = −nFE°"],
        ["«se disuelve en ácido» / «desplaza»", "E° &gt; 0 con H⁺ (o NO₃⁻)"],
        ["mL gastados, C del valorante", "n = C·V → razón → [analito]"],
        ["intensidad, tiempo, masa", "Q = I·t → n(e⁻) → m"],
        ["varias cubas", "misma Q: m ∝ M/n"],
        ["recubrimiento de hierro", "menor E° que el Fe: protege"]
      ] },
      nota: "Escribe siempre las semirreacciones; el signo de E° lo da la tabla, no la dirección." },
    { titulo: "Pila frente a cuba", ancha: true,
      tabla: { cab: ["", "Pila", "Cuba electrolítica"], filas: [
        ["reacción", "espontánea (E° &gt; 0)", "forzada (E° &lt; 0)"],
        ["ánodo", "oxidación, polo −", "oxidación, polo +"],
        ["cátodo", "reducción, polo +", "reducción, polo −"],
        ["energía", "química → eléctrica", "eléctrica → química"],
        ["electrones", "ánodo → cátodo", "ánodo → cátodo"]
      ] },
      nota: "Siempre: ánodo = oxidación, cátodo = reducción. Solo se invierten las polaridades." },
    { titulo: "Escala de potenciales (25 °C, 1 M)", ancha: true,
      tabla: { cab: ["Par", "E° (V)", "Par", "E° (V)"], filas: [
        ["Li⁺/Li", "−3,04", "Cu²⁺/Cu", "+0,34"],
        ["Na⁺/Na", "−2,71", "I₂/I⁻", "+0,54"],
        ["Mg²⁺/Mg", "−2,37", "Fe³⁺/Fe²⁺", "+0,77"],
        ["Al³⁺/Al", "−1,66", "Ag⁺/Ag", "+0,80"],
        ["Zn²⁺/Zn", "−0,76", "Br₂/Br⁻", "+1,07"],
        ["Fe²⁺/Fe", "−0,44", "Cr₂O₇²⁻/Cr³⁺", "+1,33"],
        ["Pb²⁺/Pb", "−0,13", "Cl₂/Cl⁻", "+1,36"],
        ["H⁺/H₂", "0,00", "MnO₄⁻/Mn²⁺", "+1,51"]
      ] },
      nota: "Arriba (E° alto): oxidantes fuertes. Abajo (E° muy negativo): reductores fuertes. Reacciona el oxidante con el reductor que está por debajo de él." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "H₂O₂: O = −2", bien: "O = −1 (peróxido)", por: "Hay un enlace O–O." },
        { mal: "Cr₂O₇²⁻: Cr = +12", bien: "Cr = +6 por átomo", por: "Se divide entre 2." },
        { mal: "Ajustar sin cargas", bien: "Añadir e⁻ para igualar la carga", por: "Átomos y carga." },
        { mal: "H⁺ en medio básico", bien: "OH⁻ en los dos lados y H⁺ + OH⁻ → H₂O", por: "Medio básico sin H⁺." },
        { mal: "E° = 2·E°(Ag) − E°(Zn)", bien: "E° = E°(Ag) − E°(Zn)", por: "Propiedad intensiva." },
        { mal: "Cátodo: polo − (también en la pila)", bien: "Pila: cátodo +; cuba: cátodo −", por: "Cambia la polaridad." },
        { mal: "Q = I · t(min)", bien: "Q = I · t(s)", por: "Culombios = A·s." }
      ] }
  ];

  B.registrar("quimica2", "t8", { resumen: resumen, secciones: B.parte.q2t8a.secciones, nuevas: B.parte.q2t8b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
