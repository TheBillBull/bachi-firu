/* ============================================================
   Química II · ampliaciones · Tema 8: Oxidación-reducción
   (parte A: se añade al final de las secciones originales 1 a 4)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t8/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Número de oxidación
  secciones[0] = env(
    "<h5>Qué es (y qué no es) el número de oxidación</h5>" +
    "<p>El número de oxidación (n.º ox.) es una <b>contabilidad</b>: la carga que tendría un átomo si todos los electrones de cada enlace se asignaran al átomo más electronegativo. No es la carga real (en el H₂SO₄ no hay ningún S⁶⁺ suelto), pero sirve para <b>seguir los electrones</b> en una reacción: si el n.º ox. de un átomo cambia, ese átomo ha ganado o perdido electrones (en un enlace covalente, los ha acercado o alejado).</p>" +
    "<h5>Reglas, por orden de prioridad</h5>" +
    tabla(["Regla", "Valor", "Ejemplos"], [
      ["Elemento libre (solo átomos iguales)", "0", "Fe, O₂, H₂, S₈, Cl₂, P₄"],
      ["Ion monoatómico", "su carga", "Na⁺ = +1, Al³⁺ = +3, Cl⁻ = −1, S²⁻ = −2"],
      ["Flúor en cualquier compuesto", "−1", "HF, OF₂, SF₆"],
      ["Metales alcalinos y alcalinotérreos; Al", "+1, +2, +3", "NaCl, CaSO₄, Al₂O₃"],
      ["Hidrógeno", "+1 (−1 en hidruros metálicos)", "H₂O: +1 · NaH, CaH₂: −1"],
      ["Oxígeno", "−2 (−1 en peróxidos; +2 en OF₂)", "CO₂: −2 · H₂O₂, Na₂O₂: −1"],
      ["Suma en una molécula neutra", "0", "H₂SO₄: 2(+1) + x + 4(−2) = 0"],
      ["Suma en un ion poliatómico", "la carga del ion", "SO₄²⁻: x + 4(−2) = −2"]
    ], "q3t") +
    "<p>Se aplican en este orden: primero lo que es seguro (F, metales, luego H y O) y al final se despeja el átomo que queda. El elemento «raro» (Mn, Cr, S, N, Cl…) es el que tiene el n.º ox. que buscas.</p>" +
    ejemplo("Ejemplo resuelto: tres números de oxidación de examen", "Calcula el n.º ox. de (a) Mn en KMnO₄, (b) Cr en Cr₂O₇²⁻, (c) N en NH₄⁺.", [
      "<b>(a)</b> K = +1, O = −2: (+1) + x + 4(−2) = 0 → x = <b>+7</b>.",
      "<b>(b)</b> Hay dos Cr, así que 2x + 7(−2) = −2 → 2x = +12 → x = <b>+6</b>. (Cuidado: no es +12; es el valor <b>por átomo</b> de Cr.)",
      "<b>(c)</b> H = +1 y la suma debe ser la carga del ion, +1: x + 4(+1) = +1 → x = <b>−3</b>."
    ]) +
    "<h5>Cuando las reglas «fallan»: las excepciones que sí caen</h5>" +
    "<ul>" +
    "<li><b>Peróxidos</b> (H₂O₂, Na₂O₂, BaO₂): contienen el grupo O–O y el O vale −1. En el H₂O₂, 2(+1) + 2x = 0 → x = −1.</li>" +
    "<li><b>Hidruros metálicos</b> (NaH, CaH₂, LiAlH₄): el H es más electronegativo que el metal y vale −1.</li>" +
    "<li><b>OF₂</b>: el flúor manda y el oxígeno vale +2.</li>" +
    "<li><b>Valores fraccionarios</b>: en el Fe₃O₄, 3x + 4(−2) = 0 → x = +8/3. No es un error: es la media de dos Fe³⁺ y un Fe²⁺ (FeO·Fe₂O₃).</li>" +
    "<li><b>Compuestos con azufre</b>: en el S₂O₃²⁻ (tiosulfato), 2x + 3(−2) = −2 → x = +2 (media de dos S distintos).</li>" +
    "<li><b>Compuestos orgánicos</b>: el C no tiene un valor fijo; en CH₄ vale −4, en CH₃OH −2, en HCHO 0, en HCOOH +2 y en CO₂ +4. Oxidar es ir de −4 hacia +4 (más O, menos H).</li>" +
    "</ul>" +
    tabla(["Elemento", "Estados de oxidación frecuentes en problemas"], [
      ["Mn", "+7 (MnO₄⁻), +6 (MnO₄²⁻), +4 (MnO₂), +2 (Mn²⁺)"],
      ["Cr", "+6 (Cr₂O₇²⁻, CrO₄²⁻), +3 (Cr³⁺), 0"],
      ["N", "+5 (NO₃⁻), +4 (NO₂), +2 (NO), +1 (N₂O), 0 (N₂), −3 (NH₃, NH₄⁺)"],
      ["S", "+6 (SO₄²⁻, H₂SO₄), +4 (SO₂, SO₃²⁻), 0 (S), −2 (H₂S, S²⁻)"],
      ["Cl", "+7 (ClO₄⁻), +5 (ClO₃⁻), +1 (ClO⁻), 0 (Cl₂), −1 (Cl⁻)"],
      ["Fe", "+3 (Fe³⁺), +2 (Fe²⁺), 0"],
      ["C", "+4 (CO₂, CO₃²⁻), +2 (CO), 0, −4 (CH₄)"]
    ], "q3t") +
    ojo("El n.º ox. se escribe con el signo delante (<b>+6</b>), la carga de un ion con el signo detrás (<b>6+</b> o Cr⁶⁺). Un átomo con n.º ox. +6 <b>no tiene por qué existir como ion</b> Cr⁶⁺: en el Cr₂O₇²⁻ la carga real del Cr es mucho menor, pero la contabilidad vale igual.")
  );

  // ---------------------------------------------------------------- 2. Oxidación y reducción
  secciones[1] = env(
    "<h5>Reducción y oxidación: una pareja inseparable</h5>" +
    "<p>Los electrones no pueden quedarse flotando: los que pierde una sustancia los gana otra. Por eso es imposible una oxidación sin reducción, y por eso el número total de electrones perdidos siempre es igual al de ganados. Una forma fácil de recordarlo (y de no confundir oxidante con reductor):</p>" +
    tabla(["", "Qué le pasa", "n.º ox.", "Papel en la reacción"], [
      ["<b>Oxidación</b>", "pierde e⁻", "sube", "es el <b>reductor</b> (reduce a otro)"],
      ["<b>Reducción</b>", "gana e⁻", "baja", "es el <b>oxidante</b> (oxida a otro)"]
    ]) +
    "<p>El oxidante «oxida» a otra sustancia <b>quitándole</b> electrones, y por eso él mismo se reduce. Al revés con el reductor. Una sustancia no es oxidante o reductora «en sí»: lo es <b>frente a otra</b> (la tabla de potenciales lo ordena).</p>" +
    "<h5>Semirreacciones y pares redox</h5>" +
    "<p>Cada proceso se escribe como una <b>semirreacción</b>, con los electrones visibles: Zn → Zn²⁺ + 2 e⁻ (oxidación) y Cu²⁺ + 2 e⁻ → Cu (reducción). La forma oxidada y la reducida de una misma especie forman un <b>par redox</b> (Zn²⁺/Zn, Cu²⁺/Cu). En cada par, <b>la forma oxidada es el oxidante</b> y <b>la reducida es el reductor</b>: el Cu²⁺ oxida y el Zn reduce.</p>" +
    ejemplo("Ejemplo resuelto: identificar quién es quién", "En la reacción 2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu, indica semirreacciones, oxidante, reductor y electrones intercambiados.", [
      "El Al pasa de 0 a +3: <b>se oxida</b> (pierde 3 e⁻): Al → Al³⁺ + 3 e⁻. Es el <b>reductor</b>.",
      "El Cu pasa de +2 a 0: <b>se reduce</b> (gana 2 e⁻): Cu²⁺ + 2 e⁻ → Cu. El Cu²⁺ es el <b>oxidante</b>.",
      "Para igualar los electrones: 2·(Al → Al³⁺ + 3 e⁻) y 3·(Cu²⁺ + 2 e⁻ → Cu): en total <b>6 e⁻</b> que salen del aluminio y entran al cobre."
    ]) +
    "<h5>Oxidantes y reductores habituales</h5>" +
    tabla(["Oxidantes (se reducen)", "Producto típico", "Reductores (se oxidan)", "Producto típico"], [
      ["MnO₄⁻ (medio ácido)", "Mn²⁺", "Fe²⁺", "Fe³⁺"],
      ["MnO₄⁻ (medio básico)", "MnO₂", "I⁻", "I₂"],
      ["Cr₂O₇²⁻ (medio ácido)", "Cr³⁺", "C₂O₄²⁻ (oxalato)", "CO₂"],
      ["HNO₃ diluido", "NO", "metales (Cu, Zn…)", "su catión"],
      ["HNO₃ concentrado", "NO₂", "H₂O₂ (frente a oxidantes fuertes)", "O₂"],
      ["Cl₂, Br₂, O₂", "Cl⁻, Br⁻, H₂O u OH⁻", "SO₂, SO₃²⁻", "SO₄²⁻"],
      ["H₂O₂ (frente a reductores)", "H₂O", "H₂, C, CO", "H₂O, CO₂"]
    ], "q3t") +
    "<h5>Sustancias que pueden hacer de las dos cosas</h5>" +
    "<p>Un átomo en un estado de oxidación <b>intermedio</b> puede subir o bajar: el Fe²⁺ (entre Fe y Fe³⁺), el SO₂ (entre S y SO₄²⁻) o el H₂O₂ (O = −1, entre −2 y 0). Frente a un oxidante fuerte se comportan como reductores; frente a un reductor fuerte, como oxidantes. En cambio el estado más alto (MnO₄⁻, Mn +7) <b>solo puede reducirse</b> y el más bajo (I⁻, −1) <b>solo oxidarse</b>.</p>" +
    "<h5>Dismutación y comproporción</h5>" +
    "<p>En una <b>dismutación</b>, una misma especie se oxida y se reduce a la vez: Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O (el Cl pasa de 0 a −1 y de 0 a +1). Es la reacción de la lejía. La <b>comproporción</b> es la inversa: dos especies del mismo elemento en estados distintos dan una sola (IO₃⁻ + 5 I⁻ + 6 H⁺ → 3 I₂ + 3 H₂O: I +5 e I −1 acaban en 0).</p>" +
    ojo("«Se oxida» no siempre significa «se combina con oxígeno». Ese es el origen histórico de la palabra, pero la definición válida es <b>perder electrones</b> (subir el n.º ox.). El Zn se oxida en Zn + Cu²⁺ aunque no haya oxígeno por ningún lado.")
  );

  // ---------------------------------------------------------------- 3. Ajuste por ion-electrón
  secciones[2] = env(
    "<h5>El método, con más detalle</h5>" +
    "<p>Se trabaja con <b>iones tal como existen en disolución</b> (MnO₄⁻, Fe²⁺, Cr₂O₇²⁻…), sin los iones espectadores (K⁺, SO₄²⁻, Cl⁻ que no cambian). El orden importa; si lo cambias, los errores se acumulan:</p>" +
    "<ol>" +
    "<li><b>Números de oxidación</b>: encuentra qué dos especies cambian y escribe cada semirreacción con ellas (reducción y oxidación).</li>" +
    "<li><b>Átomo que cambia</b>: ajústalo (Cr₂O₇²⁻ → 2 Cr³⁺; 2 I⁻ → I₂).</li>" +
    "<li><b>Oxígeno</b>: añade H₂O al lado donde falte.</li>" +
    "<li><b>Hidrógeno</b>: añade H⁺ al lado donde falte.</li>" +
    "<li><b>Carga</b>: añade e⁻ al lado más positivo (los electrones tienen carga −1). Si has hecho bien los pasos, queda <b>la reducción con e⁻ a la izquierda y la oxidación con e⁻ a la derecha</b>.</li>" +
    "<li><b>Medio básico</b> (solo si el enunciado lo dice): por cada H⁺ añade un OH⁻ en <b>los dos lados</b>; H⁺ + OH⁻ forman H₂O; simplifica el agua que quede repetida.</li>" +
    "<li><b>Multiplica</b> cada semirreacción para igualar los electrones, <b>suma</b> y simplifica (e⁻ y especies repetidas).</li>" +
    "<li><b>Comprueba</b> átomos y carga a cada lado.</li>" +
    "</ol>" +
    w("q8_ajusta") +
    ejemplo("Ejemplo resuelto: dicromato y hierro(II) en medio ácido", "Ajusta Cr₂O₇²⁻ + Fe²⁺ → Cr³⁺ + Fe³⁺ (medio ácido).", [
      "<b>N.º ox.</b>: Cr +6 → +3 (se reduce, 3 e⁻ por átomo); Fe +2 → +3 (se oxida, 1 e⁻).",
      "<b>Reducción</b>: Cr₂O₇²⁻ → 2 Cr³⁺. O: 7 a la izquierda → 7 H₂O a la derecha. H: 14 a la derecha → 14 H⁺ a la izquierda. Carga: izquierda (−2 + 14) = +12; derecha +6 → 6 e⁻ a la izquierda: <b>Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O</b>.",
      "<b>Oxidación</b>: <b>Fe²⁺ → Fe³⁺ + e⁻</b>.",
      "Igualar electrones: la oxidación ×6. Suma: <b>Cr₂O₇²⁻ + 14 H⁺ + 6 Fe²⁺ → 2 Cr³⁺ + 6 Fe³⁺ + 7 H₂O</b>.",
      "Comprueba: carga izquierda −2 + 14 + 12 = +24; derecha 6 + 18 = +24. ✔."
    ]) +
    ejemplo("Ejemplo resuelto: permanganato y oxalato, y por qué salen coeficientes 2 y 5", "Ajusta MnO₄⁻ + C₂O₄²⁻ → Mn²⁺ + CO₂ (medio ácido).", [
      "<b>Reducción</b> (Mn +7 → +2): MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O.",
      "<b>Oxidación</b> (C +3 → +4, dos C): C₂O₄²⁻ → 2 CO₂ + 2 e⁻ (el oxígeno ya está ajustado: 4 = 4).",
      "Mínimo común múltiplo de 5 y 2 = 10: reducción ×2 y oxidación ×5.",
      "Suma: <b>2 MnO₄⁻ + 16 H⁺ + 5 C₂O₄²⁻ → 2 Mn²⁺ + 8 H₂O + 10 CO₂</b>. Carga: −2 + 16 − 10 = +4 a la izquierda; +4 a la derecha ✔."
    ]) +
    ejemplo("Ejemplo resuelto: medio básico (permanganato y yoduro)", "Ajusta MnO₄⁻ + I⁻ → MnO₂ + I₂ en medio básico.", [
      "Primero se ajusta <b>como si fuera ácido</b>. Reducción: MnO₄⁻ + 4 H⁺ + 3 e⁻ → MnO₂ + 2 H₂O. Oxidación: 2 I⁻ → I₂ + 2 e⁻.",
      "Para pasar a medio básico sumo <b>4 OH⁻ a cada lado</b> de la reducción: los 4 H⁺ + 4 OH⁻ de la izquierda se convierten en 4 H₂O, y la derecha gana 4 OH⁻: MnO₄⁻ + 4 H₂O + 3 e⁻ → MnO₂ + 2 H₂O + 4 OH⁻. Simplifico el agua: <b>MnO₄⁻ + 2 H₂O + 3 e⁻ → MnO₂ + 4 OH⁻</b>.",
      "MCM de 3 y 2 = 6: reducción ×2, oxidación ×3. Suma: <b>2 MnO₄⁻ + 4 H₂O + 6 I⁻ → 2 MnO₂ + 3 I₂ + 8 OH⁻</b>.",
      "Comprueba: O: 8 + 4 = 12 = 4 + 8 ✔; H: 8 = 8 ✔; carga: −2 − 6 = −8 = −8 ✔."
    ]) +
    "<h5>De la ecuación iónica a la molecular</h5>" +
    "<p>Cuando el enunciado da la reacción con sales (<b>KMnO₄ + FeSO₄ + H₂SO₄ → MnSO₄ + Fe₂(SO₄)₃ + K₂SO₄ + H₂O</b>), se ajusta la parte iónica y después se «reponen» los iones espectadores: los coeficientes que ya tienes pasan a las sales y, para el resto de iones, se ajusta <b>por tanteo</b> en este orden: metales, no metales (S, Cl…), H y O.</p>" +
    ejemplo("Ejemplo resuelto: ecuación molecular", "Ajusta KMnO₄ + FeSO₄ + H₂SO₄ → MnSO₄ + Fe₂(SO₄)₃ + K₂SO₄ + H₂O.", [
      "Ecuación iónica (medio ácido): MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O.",
      "Para tener Fe₂(SO₄)₃ hacen falta un número <b>par</b> de Fe: duplicamos todo → 2 MnO₄⁻ + 10 Fe²⁺ + 16 H⁺ → 2 Mn²⁺ + 10 Fe³⁺ + 8 H₂O.",
      "Reponemos los espectadores: 2 KMnO₄ + 10 FeSO₄ + 8 H₂SO₄ → 2 MnSO₄ + 5 Fe₂(SO₄)₃ + K₂SO₄ + 8 H₂O. Los 2 K⁺ aparecen como 1 K₂SO₄.",
      "Comprueba los sulfatos: izquierda 10 + 8 = 18; derecha 2 + 15 + 1 = 18 ✔. Y el oxígeno: 8 + 40 + 32 = 80 = 8 + 60 + 4 + 8 ✔."
    ]) +
    ejemplo("Ejemplo resuelto: el cobre y el ácido nítrico diluido", "Ajusta Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O.", [
      "Reducción: NO₃⁻ + 4 H⁺ + 3 e⁻ → NO + 2 H₂O. Oxidación: Cu → Cu²⁺ + 2 e⁻.",
      "MCM de 3 y 2 = 6: reducción ×2 y oxidación ×3 → 2 NO₃⁻ + 8 H⁺ + 3 Cu → 2 NO + 4 H₂O + 3 Cu²⁺.",
      "Molecular: los 3 Cu²⁺ necesitan 6 NO₃⁻ de acompañamiento (no cambian). Total de HNO₃: 8 (los 8 H⁺) → <b>3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O</b>.",
      "Se comprueba el nitrógeno: 8 = 6 + 2 ✔. De los 8 HNO₃, solo 2 actúan de oxidante; los otros 6 hacen de «ácido» (aportan los nitratos de la sal)."
    ]) +
    ojo("Tres errores que cuestan puntos: (1) poner e⁻ en el lado equivocado — comprueba que la reducción tiene los e⁻ a la izquierda; (2) multiplicar una semirreacción pero olvidarse de multiplicar <b>también los H⁺ y el H₂O</b>; (3) en medio básico, dejar H⁺ en la ecuación final. Si hay H⁺, no es básico.")
  );

  // ---------------------------------------------------------------- 4. Pilas
  secciones[3] = env(
    "<h5>La pila Daniell: qué ocurre en cada vaso</h5>" +
    "<p>Si metes una barra de Zn en una disolución de CuSO₄, el Zn se disuelve y el cobre se deposita: hay reacción, pero toda la energía se pierde en calor. Una <b>pila</b> hace lo mismo <b>separando las dos semirreacciones</b> en dos vasos: los electrones, obligados a viajar por un cable, hacen trabajo eléctrico. En la pila Daniell, el vaso de la izquierda contiene una barra de Zn en ZnSO₄ 1 M, y el de la derecha una barra de Cu en CuSO₄ 1 M.</p>" +
    "<ul>" +
    "<li><b>Ánodo (−)</b>: Zn → Zn²⁺ + 2 e⁻. La barra se va disolviendo y pierde masa; la disolución se enriquece en cationes Zn²⁺.</li>" +
    "<li><b>Cátodo (+)</b>: Cu²⁺ + 2 e⁻ → Cu. El cobre se deposita sobre la barra, que gana masa; la disolución se empobrece en cationes Cu²⁺.</li>" +
    "<li><b>Cable</b>: los electrones van del ánodo al cátodo. La corriente convencional, al revés.</li>" +
    "<li><b>Puente salino</b> (tubo en U con KNO₃, KCl o Na₂SO₄ en gel): compensa la carga. Sin él, el vaso del ánodo se carga positivamente y el del cátodo negativamente, y la pila se para casi al instante. Los <b>aniones</b> del puente van hacia el <b>ánodo</b> y los <b>cationes</b> hacia el <b>cátodo</b>.</li>" +
    "</ul>" +
    w("q8_pila") +
    "<h5>Cómo se escribe una pila: notación abreviada</h5>" +
    "<p>Una barra vertical | separa fases distintas (sólido | disolución) y una doble barra ‖ representa el puente salino. Por convención, el <b>ánodo (oxidación) se escribe a la izquierda</b> y el cátodo (reducción) a la derecha:</p>" +
    "<div class='formula-wrap'><div class='formula'>Zn(s) | Zn²⁺(1 M) ‖ Cu²⁺(1 M) | Cu(s)</div></div>" +
    "<p>Cuando una semicelda no tiene un metal que sirva de electrodo (H⁺/H₂, Fe³⁺/Fe²⁺, MnO₄⁻/Mn²⁺), se usa un electrodo <b>inerte</b> de Pt: <b>Pt | H₂(1 atm) | H⁺(1 M) ‖ Cu²⁺(1 M) | Cu(s)</b>. El platino no participa; solo recoge o cede los electrones.</p>" +
    ejemplo("Ejemplo resuelto: una pila completa", "Se monta una pila con un electrodo de Al en Al³⁺ 1 M y otro de Ag en Ag⁺ 1 M. Escribe las semirreacciones, la reacción global, la notación y la fem (E°(Al³⁺/Al) = −1,66 V; E°(Ag⁺/Ag) = +0,80 V).", [
      "El de potencial mayor (Ag⁺/Ag, +0,80 V) se reduce: es el <b>cátodo</b>. El otro (Al) se oxida: <b>ánodo</b>.",
      "Ánodo (oxidación): Al → Al³⁺ + 3 e⁻. Cátodo (reducción): Ag⁺ + e⁻ → Ag.",
      "Igualo electrones: la plata ×3. Global: <b>Al + 3 Ag⁺ → Al³⁺ + 3 Ag</b> (3 e⁻ intercambiados).",
      "Notación: <b>Al(s) | Al³⁺(1 M) ‖ Ag⁺(1 M) | Ag(s)</b>.",
      "fem = E°cátodo − E°ánodo = 0,80 − (−1,66) = <b>2,46 V</b>. Nota: el potencial de la plata <b>no se multiplica por 3</b> al ajustar: los potenciales son intensivos."
    ]) +
    "<p>Recuerda dos pistas para no equivocarte con los polos: <b>ánodo y oxidación empiezan por vocal</b>, cátodo y reducción por consonante; y en una pila el ánodo es el polo negativo (de él salen los electrones) mientras que el cátodo es el positivo.</p>" +
    ojo("Los signos del ánodo y el cátodo <b>se invierten en una cuba electrolítica</b> (ánodo +, cátodo −), pero lo que se oxida sigue siendo el ánodo y lo que se reduce el cátodo. Lo veremos en el apartado de electrólisis.")
  );

  B.parte.q2t8a = { secciones: secciones };
})(window);
