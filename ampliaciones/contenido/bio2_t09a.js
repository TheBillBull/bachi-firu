/* ============================================================
   Biología II · ampliaciones · Tema 9: Anabolismo: la fotosíntesis
   (parte A: teoría. Parte B, bio2_t09b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t9.js (bio_esquemaz, bio_calvin, bio_fotofactores, bio_c3c4cam).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Ecuación global y origen del O₂ (del agua, no del CO₂): experimentos de Hill y de Ruben y Kamen → sección 1.
   2. El cloroplasto: membranas, estroma, tilacoides, grana, lumen; qué ocurre en cada sitio → secciones 1 y 5.
   3. Pigmentos, espectro de absorción y de acción; antena y centro de reacción (P680, P700) → sección 1.
   4. Fase luminosa: esquema en Z, fotólisis, flujo acíclico frente a cíclico (qué produce cada uno) → sección 2 + widget bio_esquemaz.
   5. Fotofosforilación: gradiente de H⁺ en el lumen y ATP sintasa; comparación con la mitocondria → sección 2.
   6. Ciclo de Calvin: carboxilación (RuBisCO), reducción, regeneración; balance de 18 ATP y 12 NADPH por glucosa → sección 3 + widget bio_calvin.
   7. Factores limitantes: interpretar gráficas de luz, CO₂ y temperatura; punto de compensación → sección 5 + widget bio_fotofactores.
   8. Fotorrespiración y plantas C4 y CAM: separación en el espacio y en el tiempo → sección 6 + widget bio_c3c4cam.
   9. Quimiosíntesis: fuente de energía inorgánica, ejemplos y papel en los ciclos del N y del S → sección 7.
   10. Fotosíntesis frente a respiración: mitocondria/cloroplasto, NADH/NADPH, ciclo de la materia y flujo de la energía → secciones 4 y 8.
   Convenciones declaradas: ≈ 4 H⁺ por ATP (algunos libros usan 4,67); fotosistemas y pigmentos con las longitudes de onda
   redondeadas; C4 con unos 5 ATP por CO₂ en los libros de texto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t9/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Visión general
  secciones[0] = env(
    "<h5>Anabolismo autótrofo: fabricar materia orgánica a partir de inorgánica</h5>" +
    "<p>El <b>anabolismo</b> reúne las rutas que construyen moléculas grandes a partir de otras pequeñas, y gastan energía (ATP) y poder reductor (NADPH, NADH) para ello. La fotosíntesis es el anabolismo más importante del planeta: parte de <b>CO<sub>2</sub> y agua</b> (inorgánicos) y obtiene <b>glucosa</b> (orgánica), usando como fuente de energía la <b>luz</b>. Los organismos que lo hacen son <b>autótrofos fotosintéticos</b>: plantas, algas y cianobacterias.</p>" +
    "<p>La ecuación simplificada es 6 CO<sub>2</sub> + 6 H<sub>2</sub>O + luz → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub>. Es una <b>reacción redox</b>: el CO<sub>2</sub> se <b>reduce</b> (gana electrones e hidrógenos y se convierte en glucosa) y el agua se <b>oxida</b> (pierde electrones y libera O<sub>2</sub>). Es lo contrario de la respiración, y por eso necesita energía: la luz aporta la energía que la respiración libera.</p>" +
    "<h5>De dónde sale el oxígeno: una historia de experimentos</h5>" +
    tabla(["Año", "Quién", "Qué descubrió"], [
      ["1771", "Priestley", "Una planta «renueva» el aire en el que se ha apagado una vela: libera oxígeno."],
      ["1779", "Ingenhousz", "Esa renovación solo ocurre con luz y en las partes verdes."],
      ["1882", "Engelmann", "Bacterias aerobias se acumulan en las zonas del alga que reciben luz violeta-azul y roja: ahí se libera más O<sub>2</sub> (espectro de acción)."],
      ["1930s", "Van Niel", "Bacterias sulfurosas fotosintéticas usan H<sub>2</sub>S y liberan azufre: el «oxígeno» sale del donador de hidrógeno, que en las plantas es el agua."],
      ["1937", "Hill", "Cloroplastos aislados, con luz y un aceptor de electrones, desprenden O<sub>2</sub> <b>sin CO<sub>2</sub></b>: la fase luminosa es independiente del CO<sub>2</sub>."],
      ["1941", "Ruben y Kamen", "Con agua marcada con <sup>18</sup>O, el O<sub>2</sub> liberado lleva <sup>18</sup>O; con CO<sub>2</sub> marcado, no. Prueba definitiva: <b>el O<sub>2</sub> viene del agua</b>."]
    ], "q3t") +
    ojo("«El O<sub>2</sub> sale del CO<sub>2</sub>» es el error más típico del tema. El oxígeno del O<sub>2</sub> procede del <b>H<sub>2</sub>O</b> (fotólisis). Los átomos de oxígeno del CO<sub>2</sub> acaban en la glucosa y en el agua que se forma en el ciclo de Calvin.") +
    "<p>Por eso la ecuación «honesta» lleva agua a los dos lados: <b>6 CO<sub>2</sub> + 12 H<sub>2</sub>O + luz → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> + 6 H<sub>2</sub>O</b>. Se consumen 12 H<sub>2</sub>O (fase luminosa) y se forman 6 (ciclo de Calvin); el balance neto es el de la ecuación simplificada. Se ve bien al contar los 6 O<sub>2</sub> = 12 átomos de O, que solo pueden venir de 12 H<sub>2</sub>O.</p>" +
    "<h5>Fotosíntesis oxigénica y anoxigénica</h5>" +
    "<p>La <b>oxigénica</b> (plantas, algas, cianobacterias) usa agua como donador de electrones y libera O<sub>2</sub>. La <b>anoxigénica</b> (bacterias purpúreas y verdes del azufre) usa otros donadores, como H<sub>2</sub>S, y no libera O<sub>2</sub>: CO<sub>2</sub> + 2 H<sub>2</sub>S + luz → (CH<sub>2</sub>O) + 2 S + H<sub>2</sub>O. Las cianobacterias, hace unos 2400 millones de años, empezaron a llenar de O<sub>2</sub> la atmósfera (la «Gran Oxidación»).</p>" +
    "<h5>El cloroplasto: dónde ocurre cada cosa</h5>" +
    "<p>El cloroplasto es un orgánulo con <b>doble membrana</b> (externa e interna) que rodea el <b>estroma</b>, un líquido denso con enzimas, ADN circular, ribosomas de tipo procariota (70S), gránulos de almidón y la enzima RuBisCO. Dentro del estroma hay una tercera membrana, la de los <b>tilacoides</b>: sacos aplastados que se apilan formando los <b>grana</b> (singular, <i>granum</i>), unidos por tilacoides alargados del estroma (lamelas). El espacio interior de un tilacoide se llama <b>lumen</b>.</p>" +
    tabla(["Zona", "Qué contiene", "Qué ocurre"], [
      ["<b>Membrana del tilacoide</b>", "pigmentos, fotosistemas I y II, cadena de transporte, ATP sintasa", "captación de luz, transporte de electrones, fotofosforilación"],
      ["<b>Lumen</b> (interior del tilacoide)", "agua y H<sup>+</sup> acumulados", "se libera O<sub>2</sub> y se acumulan H<sup>+</sup> (gradiente)"],
      ["<b>Estroma</b>", "enzimas del ciclo de Calvin, ADN, ribosomas, almidón", "fijación del CO<sub>2</sub> y síntesis de glúcidos"]
    ], "q3t") +
    "<p>Que el cloroplasto tenga ADN y ribosomas propios, y se divida por bipartición, es una de las pruebas de la <b>teoría endosimbiótica</b> (Margulis, 1967): proviene de una cianobacteria que fue «engullida» por una célula eucariota.</p>" +
    "<h5>Los pigmentos: clorofilas y carotenoides</h5>" +
    "<p>Los pigmentos fotosintéticos absorben ciertas longitudes de onda y reflejan el resto. Las <b>clorofilas</b> tienen un anillo con un átomo de <b>magnesio</b> (que ya viste en el Tema 1) y una larga cola hidrófoba que las ancla en la membrana. La <b>clorofila a</b> es la principal y absorbe sobre todo en el violeta-azul (≈ 430 nm) y en el rojo (≈ 660 nm); la <b>clorofila b</b> es accesoria (≈ 450 y ≈ 640 nm). Los <b>carotenoides</b> (carotenos y xantofilas) absorben en el azul-verdoso (≈ 450–500 nm) y dan los tonos naranjas y amarillos; protegen a la clorofila del exceso de luz. La zona verde (≈ 500–570 nm) se absorbe poco y se refleja: por eso las hojas son verdes. En otoño, al degradarse la clorofila, se ven los carotenoides: hojas amarillas.</p>" +
    tabla(["Curva", "Qué mide", "Cómo se obtiene"], [
      ["<b>Espectro de absorción</b>", "cuánta luz absorbe cada pigmento a cada longitud de onda", "espectrofotómetro con el extracto del pigmento"],
      ["<b>Espectro de acción</b>", "cuánta fotosíntesis se produce con cada longitud de onda", "midiendo O<sub>2</sub> o CO<sub>2</sub> con luz de cada color (Engelmann)"]
    ], "q3t") +
    "<p>Ambas curvas se parecen mucho, y esa coincidencia demuestra que los pigmentos que absorben la luz son los que hacen la fotosíntesis. Pero no son idénticas: el espectro de acción es algo más ancho porque los pigmentos accesorios también pasan su energía a la clorofila a.</p>" +
    "<h5>Fotosistemas: antena y centro de reacción</h5>" +
    "<p>Los pigmentos no actúan sueltos: se agrupan en los <b>fotosistemas</b>, de dos partes. La <b>antena</b> (cientos de clorofilas y carotenoides) capta fotones y se pasa la energía de una molécula a otra como un «teléfono» hasta el <b>centro de reacción</b>, un par especial de clorofila <i>a</i> que cede un electrón excitado a un aceptor. Hay dos tipos: el <b>fotosistema II</b> (centro de reacción <b>P680</b>) y el <b>fotosistema I</b> (<b>P700</b>). El número es la longitud de onda (en nm) de máxima absorción.</p>" +
    ojo("El fotosistema I se descubrió antes que el II, por eso lleva el número I, pero en la cadena de electrones <b>el II actúa primero</b>: el orden de funcionamiento es agua → PSII → PSI → NADP<sup>+</sup>.") +
    "<p>Una curiosidad de energía: un fotón de luz azul de 430 nm tiene más energía que uno rojo de 680 nm (≈ 278 frente a ≈ 176 kJ por mol de fotones). Pero el centro de reacción solo «gasta» la energía mínima de un fotón rojo: el exceso de la luz azul se pierde en forma de calor. Por eso, con la misma intensidad, el rojo es casi igual de eficaz que el azul.</p>");

  // ---------------------------------------------------------------- 2. Fase luminosa
  secciones[1] = env(
    "<h5>La fase luminosa es una «pila» de electrones</h5>" +
    "<p>Lo que ocurre en la membrana del tilacoide se entiende como una cadena de electrones que se pasan de un transportador a otro, igual que en la respiración mitocondrial, pero con una diferencia fundamental: aquí el electrón empieza <b>subiendo</b> de energía gracias a la luz. Sin luz, el electrón no tiene fuerza para recorrer el camino; con luz, un fotón lo impulsa al nivel más alto del esquema. A este esquema se le llama <b>esquema en Z</b>, por su forma cuando se dibuja con la energía en vertical.</p>" +
    "<h5>Flujo acíclico (el principal)</h5>" +
    "<ol>" +
    "<li><b>Fotosistema II.</b> La luz excita al centro de reacción P680. Pierde un electrón y queda con carga positiva (P680<sup>+</sup>), un oxidante tan potente que es capaz de arrancar electrones al agua.</li>" +
    "<li><b>Fotólisis del agua.</b> Un complejo con manganeso (el «complejo de desprendimiento de oxígeno») rompe el agua: 2 H<sub>2</sub>O → O<sub>2</sub> + 4 H<sup>+</sup> + 4 e<sup>−</sup>. Los electrones rellenan el hueco del P680, los H<sup>+</sup> se quedan en el lumen y el <b>O<sub>2</sub></b> se libera.</li>" +
    "<li><b>Cadena entre fotosistemas.</b> El electrón excitado pasa a la <b>plastoquinona</b> (PQ), después al <b>complejo citocromo b<sub>6</sub>f</b> y a la <b>plastocianina</b> (PC), una proteína con cobre. En este viaje pierde energía, y el complejo b<sub>6</sub>f la aprovecha para <b>bombear H<sup>+</sup> del estroma al lumen</b>.</li>" +
    "<li><b>Fotosistema I.</b> La plastocianina entrega el electrón a P700, que ha sido excitado por otro fotón y lo ha lanzado a un nivel altísimo de energía. De allí pasa a la <b>ferredoxina</b> (Fd).</li>" +
    "<li><b>NADP<sup>+</sup> reductasa.</b> La ferredoxina cede el electrón (dos veces, en total 2 e<sup>−</sup>) y, junto con un H<sup>+</sup> del estroma, reduce el NADP<sup>+</sup> a <b>NADPH</b>.</li>" +
    "</ol>" +
    "<p>Resultado del flujo acíclico: <b>O<sub>2</sub> + ATP + NADPH</b>. Los electrones van en línea recta desde el agua hasta el NADPH (por eso se llama «acíclico» o lineal).</p>" +
    w("bio_esquemaz") +
    "<h5>Flujo cíclico (el complemento)</h5>" +
    "<p>En el flujo cíclico solo interviene el fotosistema I. El electrón que sale de P700* no va al NADP<sup>+</sup>: la ferredoxina lo devuelve al complejo citocromo b<sub>6</sub>f, y de allí, por la plastocianina, vuelve a P700. Es un círculo. A cambio de dar vueltas, bombea H<sup>+</sup> y por tanto fabrica <b>ATP</b>, pero <b>ni O<sub>2</sub> ni NADPH</b>: no hay fotólisis (el PSII no actúa) y el electrón no sale del ciclo.</p>" +
    tabla(["", "Flujo acíclico", "Flujo cíclico"], [
      ["Fotosistemas", "II y I", "solo I"],
      ["Fotólisis del agua y O<sub>2</sub>", "sí", "no"],
      ["NADPH", "sí", "no"],
      ["ATP", "sí", "sí (sólo ATP)"],
      ["Destino del electrón", "NADP<sup>+</sup> (no vuelve)", "vuelve al P700"]
    ], "q3t") +
    "<p>¿Para qué sirve el cíclico? El ciclo de Calvin gasta ATP y NADPH en proporción <b>3 : 2</b> (1,5 ATP por NADPH). El flujo acíclico, por sí solo, produce un poco menos de ATP del que hace falta (con la convención de 4 H<sup>+</sup> por ATP daría exactamente 1,5, pero con 4,67 H<sup>+</sup> por ATP sale ≈ 1,3). El flujo cíclico <b>corrige el déficit de ATP</b>, y según lo que necesite la célula se reparte entre ambos.</p>" +
    ojo("Si un examen dice que una planta a la que se le impide el PSII (por ejemplo con el herbicida <b>DCMU</b>, que bloquea el paso de electrones desde el PSII a la plastoquinona) «no hace nada», es falso: sin PSII no hay O<sub>2</sub> ni NADPH, pero <b>el flujo cíclico, que solo usa el PSI, puede seguir fabricando ATP</b>.") +
    "<h5>Fotofosforilación: la quimiosmosis en el cloroplasto</h5>" +
    "<p>El ATP no se fabrica por un enlace «químico» directo, sino por <b>quimiosmosis</b>, la hipótesis de Mitchell (1961) que le valió el Nobel en 1978 y que ya viste en la mitocondria. Dos procesos acumulan H<sup>+</sup> en el <b>lumen</b>: la fotólisis del agua y el bombeo del complejo b<sub>6</sub>f; además, al formar NADPH el estroma gasta H<sup>+</sup> y se hace más básico. El resultado es un <b>gradiente</b>: con luz, el pH del lumen baja a ≈ 5 y el del estroma sube a ≈ 8, unas 3 unidades, es decir, [H<sup>+</sup>] unas <b>1000 veces</b> mayor dentro. Esos H<sup>+</sup> vuelven al estroma a través de la <b>ATP sintasa</b> (CF<sub>0</sub> es el canal, CF<sub>1</sub> es la cabeza que mira al estroma y fabrica el ATP: ADP + P<sub>i</sub> → ATP). A este proceso se le llama <b>fotofosforilación</b> porque la energía original es luminosa.</p>" +
    tabla(["", "Cloroplasto (fotofosforilación)", "Mitocondria (fosforilación oxidativa)"], [
      ["Dónde se acumulan los H<sup>+</sup>", "<b>lumen</b> del tilacoide", "<b>espacio intermembrana</b>"],
      ["Hacia dónde vuelven", "al estroma", "a la matriz"],
      ["Origen de la energía", "luz (fotones)", "oxidación de NADH y FADH<sub>2</sub>"],
      ["Último aceptor de electrones", "NADP<sup>+</sup>", "O<sub>2</sub>"],
      ["Fabrica", "ATP y NADPH (con O<sub>2</sub> por fotólisis)", "ATP (y gasta O<sub>2</sub>, y forma H<sub>2</sub>O)"]
    ], "q3t") +
    ejemplo("Cuentas por cada 2 electrones (convención de 4 H⁺ por ATP)", "Calcula cuánto ATP, NADPH y O₂ se forma en el flujo acíclico por cada 2 electrones, y compáralo con el cíclico.", [
      "<b>Acíclico:</b> 1 H<sub>2</sub>O → ½ O<sub>2</sub> + 2 H<sup>+</sup> + 2 e<sup>−</sup> (2 H<sup>+</sup> al lumen); el complejo b<sub>6</sub>f bombea 4 H<sup>+</sup> más: <b>6 H<sup>+</sup></b>.",
      "6 H<sup>+</sup> / 4 H<sup>+</sup> por ATP = <b>1,5 ATP</b>; los 2 e<sup>−</sup> reducen 1 NADP<sup>+</sup> a <b>1 NADPH</b>; y se libera <b>½ O<sub>2</sub></b>.",
      "<b>Cíclico:</b> solo bombea el complejo b<sub>6</sub>f: 4 H<sup>+</sup> / 4 = <b>1 ATP</b>, sin NADPH ni O<sub>2</sub>.",
      "<b>Lectura:</b> si el Calvin necesita 3 ATP por 2 NADPH (1,5 por 1), el acíclico justo lo cubre con esta convención; con 4,67 H<sup>+</sup> por ATP solo da 1,29, y el cíclico completa lo que falta."
    ]));

  // ---------------------------------------------------------------- 3. Fase oscura
  secciones[2] = env(
    "<h5>«Oscura» no significa «de noche»</h5>" +
    "<p>El nombre de <b>fase oscura</b> es engañoso. Lo único que quiere decir es que sus reacciones <b>no necesitan luz directamente</b>: usan el ATP y el NADPH que hizo la fase luminosa. Pero de noche no funciona, porque sin luz no hay ATP ni NADPH nuevos (y además la luz activa varias de sus enzimas). Por eso muchos libros la llaman <b>fase biosintética</b>. Transcurre en el <b>estroma</b> del cloroplasto.</p>" +
    "<h5>El ciclo de Calvin–Benson en tres etapas</h5>" +
    "<p>Lo descubrieron Melvin Calvin y sus colaboradores en los años 1950, usando CO<sub>2</sub> marcado con <sup>14</sup>C y viendo en qué moléculas aparecía primero el marcaje (Nobel de Química de Calvin, 1961). Es un ciclo que se puede contar por etapas:</p>" +
    tabla(["Etapa", "Qué pasa", "Gasta / produce"], [
      ["<b>1. Carboxilación (fijación)</b>", "La enzima <b>RuBisCO</b> une el CO<sub>2</sub> a la <b>ribulosa-1,5-bisfosfato (RuBP, 5 C)</b>; el compuesto de 6 C es inestable y se parte en dos moléculas de <b>3-fosfoglicerato (3-PGA, 3 C)</b>.", "no gasta ATP; 1 CO<sub>2</sub> + 1 RuBP → 2 3-PGA"],
      ["<b>2. Reducción</b>", "Cada 3-PGA se fosforila con ATP y se reduce con NADPH hasta <b>gliceraldehído-3-fosfato (G3P)</b>, una triosa.", "por cada CO<sub>2</sub>: 2 ATP y 2 NADPH"],
      ["<b>3. Regeneración de la RuBP</b>", "De cada 6 G3P, 1 sale del ciclo (es el producto neto) y los otros 5 (15 C) se reordenan para dar 3 RuBP (15 C).", "por cada CO<sub>2</sub>: 1 ATP"]
    ], "q3t") +
    "<p>La RuBisCO (ribulosa-1,5-bisfosfato carboxilasa/oxigenasa) es la enzima más abundante de la biosfera. Es lenta y poco precisa (puede también fijar O<sub>2</sub>, lo que causa la fotorrespiración, sección 6), de modo que la planta compensa con mucha cantidad: puede llegar a ser hasta la mitad de las proteínas solubles de una hoja.</p>" +
    ojo("El carbono se conserva: 1 C del CO<sub>2</sub> + 5 C de la RuBP = 6 C = 2 moléculas de 3-PGA (3 C cada una). Por eso hay que dar tres vueltas (3 CO<sub>2</sub>) para obtener <b>una triosa entera</b>, y seis vueltas para una glucosa. Es lo que comprobarás en el simulador.") +
    w("bio_calvin") +
    "<h5>El balance que hay que saber</h5>" +
    "<p>Para <b>3 CO<sub>2</sub></b> (3 vueltas): 3 CO<sub>2</sub> + 9 ATP + 6 NADPH → 1 G3P + 9 ADP + 8 P<sub>i</sub> + 6 NADP<sup>+</sup>. Para fabricar una molécula de <b>glucosa</b> hacen falta dos G3P, es decir, <b>6 CO<sub>2</sub>, 18 ATP y 12 NADPH</b>.</p>" +
    ejemplo("Balance de la fotosíntesis de una glucosa", "(a) ¿Cuántos ATP y NADPH gasta el ciclo de Calvin para fabricar 1 glucosa? (b) ¿Cuántas moléculas de agua hay que romper en la fase luminosa para obtener ese NADPH? (c) ¿Cuántos O₂ se liberan?", [
      "<b>(a)</b> Por cada CO<sub>2</sub>: 3 ATP (2 + 1) y 2 NADPH. Con 6 CO<sub>2</sub>: 6 · 3 = <b>18 ATP</b> y 6 · 2 = <b>12 NADPH</b>.",
      "<b>(b)</b> Cada NADPH recibe 2 e<sup>−</sup>; 12 NADPH son 24 e<sup>−</sup>. Cada H<sub>2</sub>O da 2 e<sup>−</sup>: hay que romper <b>12 H<sub>2</sub>O</b>.",
      "<b>(c)</b> 2 H<sub>2</sub>O → O<sub>2</sub> + 4 H<sup>+</sup> + 4 e<sup>−</sup>; con 24 e<sup>−</sup> salen 24 / 4 = <b>6 O<sub>2</sub></b>. Cuadra con la ecuación de la fotosíntesis."
    ]) +
    "<h5>Qué se hace con las triosas</h5>" +
    "<ul>" +
    "<li><b>Almidón</b>: reserva dentro del cloroplasto, que se acumula de día y se consume de noche.</li>" +
    "<li><b>Sacarosa</b>: las triosas salen al citosol y allí se forma sacarosa, que viaja por el floema hasta los órganos que no hacen fotosíntesis.</li>" +
    "<li><b>Celulosa</b>, lípidos, aminoácidos y otras moléculas, con ayuda de nitrógeno, azufre y fósforo tomados del suelo.</li>" +
    "</ul>" +
    "<p>La energía que transportaba la luz acaba almacenada en los enlaces de estas moléculas. Son las mismas moléculas que alimentan la respiración celular del Tema 8.</p>");

  // ---------------------------------------------------------------- 4. Importancia biológica
  secciones[3] = env(
    "<h5>La materia da vueltas, la energía va en una dirección</h5>" +
    "<p>Fotosíntesis y respiración se complementan, pero hay una diferencia esencial: <b>la materia se recicla</b> (el C, el H y el O dan vueltas entre CO<sub>2</sub>, H<sub>2</sub>O, O<sub>2</sub> y glucosa) mientras que <b>la energía circula en un solo sentido</b>: entra como luz, se almacena en la glucosa, se usa en forma de ATP y sale como calor. Por eso la vida necesita el Sol constantemente.</p>" +
    "<p>La fotosíntesis es también la fuente de casi todo el oxígeno atmosférico (≈ 21 % del aire) y, en el pasado, de los combustibles fósiles: carbón, petróleo y gas natural son luz solar fosilizada. Esto conecta con el efecto invernadero: quemarlos devuelve a la atmósfera un CO<sub>2</sub> que las plantas tardaron millones de años en retirar.</p>" +
    w("clasificar", "relacion"));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Factores que afectan a la fotosíntesis", html: env(
    "<h5>Tres factores y una idea: el factor limitante</h5>" +
    "<p>La velocidad de la fotosíntesis se mide por el O<sub>2</sub> que se libera, por el CO<sub>2</sub> que se consume o por la materia seca que se gana. Depende de varios factores, pero la regla de <b>Blackman</b> (1905) lo simplifica: cuando varios factores actúan a la vez, <b>la velocidad la limita el que está más escaso</b>, el <b>factor limitante</b>. Aumentar un factor que no limita no sirve de nada.</p>" +
    tabla(["Factor", "Qué ocurre al aumentarlo", "Por qué"], [
      ["<b>Luz</b>", "la velocidad sube casi en línea recta y luego se estabiliza (<b>saturación</b>)", "al principio faltan fotones; después los fotosistemas «no dan abasto» y limitan el CO<sub>2</sub> o la temperatura. Con luz excesiva hay fotodaño."],
      ["<b>CO<sub>2</sub></b>", "sube hasta una meseta", "la RuBisCO se satura. En el aire hay ≈ 0,04 % (≈ 400 ppm), poco para una planta C3: por eso a veces se enriquece el aire de los invernaderos."],
      ["<b>Temperatura</b>", "curva en campana con un <b>óptimo</b>", "el Calvin depende de enzimas: poca temperatura, reacciones lentas; demasiada, se desnaturalizan. Afecta a la fase oscura, no directamente a la luminosa."],
      ["<b>Agua</b>", "si falta, se cierran los estomas", "entra menos CO<sub>2</sub> y cae la fotosíntesis."],
      ["<b>Longitud de onda</b>", "mejor con rojo y azul", "coincide con los espectros de absorción y de acción."]
    ], "q3t") +
    w("bio_fotofactores") +
    "<h5>Cómo se lee una curva de luz</h5>" +
    "<ul>" +
    "<li>Medida como O<sub>2</sub> neto, a <b>oscuridad</b> la curva es <b>negativa</b>: la planta solo respira y gasta O<sub>2</sub>.</li>" +
    "<li>El <b>punto de compensación</b> es la intensidad en la que el O<sub>2</sub> que produce la fotosíntesis iguala al que gasta la respiración: <b>fotosíntesis neta = 0</b>. Por debajo, la planta pierde materia.</li>" +
    "<li>La <b>fotosíntesis bruta</b> es la neta más la respiración: <b>bruta = neta + respiración</b>.</li>" +
    "<li>La zona plana de la curva es la <b>saturación luminosa</b>: ahí limita otro factor (CO<sub>2</sub> o temperatura), no la luz.</li>" +
    "</ul>" +
    ejemplo("Interpretar una curva de luz", "Una hoja produce (O₂ neto, en µL por cm² y hora): 0 µmol de luz: −2,0; 100: 0; 200: +2,0; 400: +4,5; 800: +6,0; 1200: +6,0. (a) ¿Punto de compensación? (b) ¿Fotosíntesis bruta a 400 µmol? (c) ¿Qué limita a 1200?", [
      "<b>(a)</b> El O<sub>2</sub> neto vale 0 con <b>100 µmol</b>: ese es el punto de compensación.",
      "<b>(b)</b> La respiración consume 2,0 (lo que se mide a oscuridad). Bruta = neta + respiración = 4,5 + 2,0 = <b>6,5 µL/cm²·h</b>.",
      "<b>(c)</b> Entre 800 y 1200 µmol la curva está plana: la luz ya no es el factor limitante (saturación). Limita el <b>CO<sub>2</sub> o la temperatura</b>; si se sube el CO<sub>2</sub> y la meseta sube, el limitante era el CO<sub>2</sub>."
    ]) +
    ojo("Una gráfica de fotosíntesis frente a la <b>temperatura</b> no sigue la de la luz: es una campana (óptimo y caída por desnaturalización). Y atención: en las gráficas de «O<sub>2</sub> neto», el valor cero <b>no</b> significa que la planta no haga fotosíntesis, sino que la que hace compensa su respiración.")) });

  nuevas.push({ h: "6. Fotorrespiración, plantas C4 y CAM", html: env(
    "<h5>Cuando la RuBisCO se equivoca: la fotorrespiración</h5>" +
    "<p>La RuBisCO tiene dos «trabajos» (por eso se llama carboxilasa/oxigenasa): con <b>CO<sub>2</sub></b> hace fotosíntesis, pero con <b>O<sub>2</sub></b> oxida la RuBP y forma una molécula de 3-PGA y otra de 2 carbonos (fosfoglicolato) que la célula debe «reciclar» por una ruta que pasa por el peroxisoma y la mitocondria, gasta ATP y <b>libera CO<sub>2</sub></b>. Eso es la <b>fotorrespiración</b>: ocurre con luz, consume O<sub>2</sub>, libera CO<sub>2</sub> y <b>no produce ATP útil</b>. Es un derroche que puede quitar hasta una cuarta parte de lo fijado en una planta C3.</p>" +
    "<p>Se dispara cuando la <b>proporción O<sub>2</sub>/CO<sub>2</sub> dentro de la hoja es alta</b>: calor y sequía, porque la planta cierra los estomas para no perder agua, deja de entrar CO<sub>2</sub> y se acumula el O<sub>2</sub> de la fotólisis. Además, al subir la temperatura, la RuBisCO se vuelve menos selectiva.</p>" +
    "<h5>Plantas C4: separación en el espacio</h5>" +
    "<p>Las plantas <b>C4</b> (maíz, caña de azúcar, sorgo) viven en climas cálidos y evitan la fotorrespiración con una «bomba de CO<sub>2</sub>». Hay dos tipos de célula: en las del <b>mesófilo</b>, la <b>PEP carboxilasa</b> (que no confunde el CO<sub>2</sub> con el O<sub>2</sub>) une el CO<sub>2</sub> al fosfoenolpiruvato (3 C) y da <b>oxalacetato</b> (4 C, de ahí «C4»), que pasa a <b>malato</b>. El malato viaja a las células de la <b>vaina</b> que rodea los vasos conductores; allí se descarboxila y libera CO<sub>2</sub> <b>concentrado</b>, que entra al ciclo de Calvin con la RuBisCO. Esta bomba tiene un coste (en los libros, unos 2 ATP extra por CO<sub>2</sub>: 5 ATP y 2 NADPH por CO<sub>2</sub> frente a 3 y 2 de las C3), pero compensa con calor y luz fuertes.</p>" +
    "<h5>Plantas CAM: separación en el tiempo</h5>" +
    "<p>Las plantas <b>CAM</b> (cactus, piña, crasuláceas, el nombre viene de «metabolismo ácido de las crasuláceas») viven en desiertos. Para no perder agua, <b>abren los estomas de noche</b>, cuando hace fresco: la PEP carboxilasa fija el CO<sub>2</sub> y lo guarda como <b>malato en la vacuola</b> (por eso las hojas son más ácidas al amanecer). De día, con los estomas <b>cerrados</b>, el malato libera CO<sub>2</sub> que entra al ciclo de Calvin con la energía de la luz.</p>" +
    tabla(["", "C3 (trigo, arroz)", "C4 (maíz, caña)", "CAM (cactus, piña)"], [
      ["Primer producto estable", "3-PGA (3 C)", "oxalacetato (4 C)", "malato (4 C), de noche"],
      ["Enzima que capta el CO<sub>2</sub>", "RuBisCO", "PEP carboxilasa y después RuBisCO", "PEP carboxilasa (noche) y RuBisCO (día)"],
      ["Separa las fases…", "no", "en el <b>espacio</b> (mesófilo y vaina)", "en el <b>tiempo</b> (noche y día)"],
      ["Estomas", "abiertos de día", "abiertos de día", "abiertos de <b>noche</b>"],
      ["Fotorrespiración", "alta con calor y sequía", "muy baja", "muy baja"],
      ["Uso del agua", "gasta mucha", "eficiente", "muy eficiente"],
      ["Clima ideal", "templado", "cálido y luminoso", "desierto"]
    ], "q3t") +
    w("bio_c3c4cam") +
    "<p>En los tres casos, el ciclo de Calvin con la RuBisCO es el que acaba construyendo el azúcar. C4 y CAM solo añaden una «bomba» previa de CO<sub>2</sub> que protege a la RuBisCO del O<sub>2</sub>.</p>" +
    ojo("«C4» y «CAM» no son otra fotosíntesis, sino <b>una forma de entregar el CO<sub>2</sub></b> a la RuBisCO. Tampoco es cierto que las C4 no tengan ciclo de Calvin: lo tienen, en las células de la vaina.")) });

  nuevas.push({ h: "7. Quimiosíntesis", html: env(
    "<h5>Fabricar materia orgánica sin luz</h5>" +
    "<p>La <b>quimiosíntesis</b> es la síntesis de materia orgánica a partir de CO<sub>2</sub> usando como energía la que se libera al <b>oxidar sustancias inorgánicas</b>, en vez de la luz. La descubrió Winogradsky (1887) estudiando bacterias del azufre. Es un proceso exclusivo de ciertas <b>bacterias</b> y <b>arqueas</b>: son <b>quimiolitótrofas</b>.</p>" +
    "<p>Se desarrolla en <b>dos fases</b>, igual que la fotosíntesis, pero con la energía de otro origen:</p>" +
    "<ol>" +
    "<li><b>Fase de obtención de energía:</b> se oxida un compuesto inorgánico (con O<sub>2</sub> como aceptor) y la energía liberada se usa para fabricar <b>ATP</b> y poder reductor (NADH).</li>" +
    "<li><b>Fase de fijación del CO<sub>2</sub>:</b> el CO<sub>2</sub> se reduce a materia orgánica en un <b>ciclo de Calvin</b>, usando ese ATP y ese poder reductor.</li>" +
    "</ol>" +
    tabla(["Grupo", "Oxida…", "Reacción", "Dónde viven"], [
      ["<b>Bacterias nitrificantes</b> (<i>Nitrosomonas</i>)", "amonio", "2 NH<sub>4</sub><sup>+</sup> + 3 O<sub>2</sub> → 2 NO<sub>2</sub><sup>−</sup> + 4 H<sup>+</sup> + 2 H<sub>2</sub>O", "suelo y agua"],
      ["<b>Bacterias nitrificantes</b> (<i>Nitrobacter</i>)", "nitrito", "2 NO<sub>2</sub><sup>−</sup> + O<sub>2</sub> → 2 NO<sub>3</sub><sup>−</sup>", "suelo y agua"],
      ["<b>Sulfobacterias</b> (<i>Beggiatoa</i>, <i>Thiobacillus</i>)", "H<sub>2</sub>S o azufre", "2 H<sub>2</sub>S + O<sub>2</sub> → 2 S + 2 H<sub>2</sub>O ; 2 S + 3 O<sub>2</sub> + 2 H<sub>2</sub>O → 2 H<sub>2</sub>SO<sub>4</sub>", "aguas sulfurosas, fuentes hidrotermales"],
      ["<b>Ferrobacterias</b>", "hierro (II)", "4 Fe<sup>2+</sup> + O<sub>2</sub> + 4 H<sup>+</sup> → 4 Fe<sup>3+</sup> + 2 H<sub>2</sub>O", "aguas ácidas con hierro"],
      ["<b>Bacterias del hidrógeno</b>", "H<sub>2</sub>", "2 H<sub>2</sub> + O<sub>2</sub> → 2 H<sub>2</sub>O", "suelos, sedimentos"]
    ], "q3t") +
    "<h5>Por qué importa</h5>" +
    "<ul>" +
    "<li><b>Ciclo del nitrógeno:</b> las nitrificantes convierten el amonio (que viene de la descomposición) en <b>nitrato</b>, la forma que absorben las plantas.</li>" +
    "<li><b>Ciclo del azufre y del hierro:</b> convierten sulfuros y hierro (II) en sulfatos y óxidos asimilables.</li>" +
    "<li><b>Ecosistemas sin luz:</b> en las <b>fuentes hidrotermales</b> del fondo del océano (descubiertas en 1977 cerca de las Galápagos) hay comunidades enteras (gusanos tubícolas, almejas) que viven gracias a bacterias quimiosintéticas, a veces simbiontes en sus tejidos.</li>" +
    "</ul>" +
    tabla(["Tipo de nutrición", "Fuente de energía", "Fuente de carbono", "Ejemplos"], [
      ["Fotolitótrofa (fotosíntesis)", "luz", "CO<sub>2</sub>", "plantas, algas, cianobacterias"],
      ["Quimiolitótrofa (quimiosíntesis)", "oxidación de inorgánicos", "CO<sub>2</sub>", "nitrificantes, sulfobacterias"],
      ["Quimioorganótrofa", "oxidación de orgánicos", "materia orgánica", "animales, hongos, la mayoría de bacterias"]
    ], "q3t") +
    ojo("Plantas y bacterias quimiosintéticas son ambas <b>autótrofas</b> (fabrican su materia orgánica a partir de CO<sub>2</sub>); lo que cambia es la <b>fuente de energía</b>: luz frente a reacciones químicas inorgánicas. La quimiosíntesis <b>no necesita luz</b> pero sí suele necesitar O<sub>2</sub> (u otro aceptor).")) });

  nuevas.push({ h: "8. Fotosíntesis y respiración: dos caras de una moneda", html: env(
    tabla(["", "Fotosíntesis", "Respiración celular"], [
      ["<b>Tipo de ruta</b>", "anabólica (construye)", "catabólica (degrada)"],
      ["<b>Orgánulo</b>", "cloroplasto", "mitocondria (y citosol en la glucólisis)"],
      ["<b>Sustratos</b>", "CO<sub>2</sub> y H<sub>2</sub>O", "glucosa y O<sub>2</sub>"],
      ["<b>Productos</b>", "glucosa y O<sub>2</sub>", "CO<sub>2</sub> y H<sub>2</sub>O"],
      ["<b>Energía</b>", "luz → se almacena en la glucosa", "glucosa → ATP"],
      ["<b>Coenzima</b>", "NADPH (NADP<sup>+</sup>)", "NADH, FADH<sub>2</sub> (NAD<sup>+</sup>, FAD)"],
      ["<b>Redox</b>", "el CO<sub>2</sub> se reduce, el agua se oxida", "la glucosa se oxida, el O<sub>2</sub> se reduce"],
      ["<b>Síntesis de ATP</b>", "fotofosforilación (luz)", "fosforilación oxidativa y a nivel de sustrato"],
      ["<b>Quién la hace</b>", "plantas, algas, cianobacterias", "casi todos los seres vivos, también los vegetales (de noche y de día)"],
      ["<b>Cuándo</b>", "con luz", "siempre"]
    ], "q3t") +
    ojo("Las plantas <b>no</b> hacen «fotosíntesis de día y respiración de noche»: respiran <b>siempre</b> (de día, el O<sub>2</sub> de su fotosíntesis es mayor que el que gastan al respirar, así que el balance es de liberación de O<sub>2</sub>). Y los animales no hacen fotosíntesis; las algas, sí.") +
    "<h5>¿Cuánta energía se aprovecha?</h5>" +
    "<p>La formación de 1 mol de glucosa a partir de CO<sub>2</sub> y agua <b>almacena unos 2870 kJ</b> (la misma que libera quemarla). Por cada CO<sub>2</sub> fijado hacen falta como mínimo <b>8 fotones</b> (2 NADPH = 4 e<sup>−</sup>, y cada electrón recibe dos «golpes» de luz, uno en cada fotosistema): 48 fotones por glucosa. A 680 nm, 48 mol de fotones aportan 48 · 175,9 ≈ 8444 kJ.</p>" +
    ejemplo("Rendimiento máximo teórico de la fotosíntesis", "Con 48 fotones de 680 nm por glucosa y 2870 kJ almacenados por mol, ¿cuál es el rendimiento máximo teórico?", [
      "Energía de 1 mol de fotones de 680 nm: E = 119 627 / 680 ≈ <b>175,9 kJ</b> (con 119 627 kJ·nm/mol).",
      "Energía luminosa mínima: 48 · 175,9 ≈ <b>8444 kJ</b>.",
      "Rendimiento = 2870 / 8444 ≈ <b>0,34 → 34 %</b>.",
      "<b>Lectura:</b> la fotosíntesis real aprovecha, sobre la luz solar total que llega a la hoja, mucho menos (del orden de 1–6 %), porque se pierde luz que no se absorbe, hay fotorrespiración, respiración y cierres de estomas."
    ])) });

  nuevas.push({ h: "9. Ejemplo PAU resuelto: interpretar un experimento", html: env(
    ejemplo("Engelmann y el alga filamentosa (1882)", "Engelmann colocó un alga verde filamentosa en una gota de agua con bacterias aerobias, y la iluminó con la luz descompuesta de un prisma. Observó que las bacterias se acumulaban sobre todo alrededor de las zonas del alga iluminadas con luz violeta-azul y roja, y casi nada en la verde. (a) ¿Por qué se acumulan las bacterias? (b) ¿Qué curva construyó, en realidad? (c) ¿Qué pigmentos lo explican? (d) ¿Qué ocurriría con luz verde?", [
      "<b>(a)</b> Las bacterias son <b>aerobias</b>: se acercan donde hay más O<sub>2</sub>. Allí donde hay más O<sub>2</sub> es donde hay más fotosíntesis (fotólisis del agua).",
      "<b>(b)</b> Una aproximación al <b>espectro de acción</b>: fotosíntesis frente a la longitud de onda.",
      "<b>(c)</b> Las <b>clorofilas</b> (a y b), que absorben en violeta-azul y rojo, y los carotenoides, que absorben en azul. El espectro de acción coincide con el de absorción.",
      "<b>(d)</b> Con luz verde habría pocas bacterias: los pigmentos casi no la absorben (la reflejan), por eso las hojas se ven verdes."
    ]) +
    ejemplo("Herbicida y fase luminosa", "Se añade a cloroplastos aislados DCMU, que impide el paso de electrones desde el fotosistema II a la plastoquinona. Se miden luz, O₂ y ATP. (a) ¿Se libera O₂? (b) ¿Se forma NADPH? (c) ¿Puede haber algo de ATP? (d) ¿Funcionará el ciclo de Calvin?", [
      "<b>(a)</b> <b>No</b>: sin tránsito de electrones desde el PSII, el P680 no puede recuperar electrones del agua y se detiene la fotólisis.",
      "<b>(b)</b> <b>No</b>, o casi: no llegan electrones al PSI desde el PSII, y el NADP<sup>+</sup> no se reduce.",
      "<b>(c)</b> <b>Sí, algo</b>: el flujo cíclico solo usa el PSI (P700, ferredoxina y b<sub>6</sub>f) y fabrica ATP.",
      "<b>(d)</b> <b>No</b>: aunque haya ATP, falta NADPH, y la etapa de reducción del Calvin lo necesita."
    ]) +
    "<p>En los ejercicios del final hay otro experimento con discos de hoja y con marcaje isotópico.</p>") });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>En la PAU de Madrid la fotosíntesis aparece como pregunta de <b>definición o esquema</b> (cloroplasto, fases, balance) y como pregunta de <b>interpretación</b> (una gráfica de luz o un experimento). Estas son las más probables, con una respuesta modelo de nota máxima.</p>" +
    ejemplo("Pregunta 1. Fase luminosa y fase oscura: lugar, procesos y productos", "Respuesta modelo:", [
      "<b>Fase luminosa</b> (membrana de los tilacoides): fotosistemas I y II, fotólisis del agua, transporte de electrones y fotofosforilación. Necesita luz. <b>Productos: ATP, NADPH y O<sub>2</sub></b>.",
      "<b>Fase oscura o ciclo de Calvin</b> (estroma): fija el CO<sub>2</sub> con la RuBisCO, lo reduce con NADPH y ATP y regenera la RuBP. Usa el ATP y el NADPH. <b>Producto: glúcidos</b> (G3P).",
      "<b>Relación:</b> la luminosa suministra ATP y NADPH a la oscura, que devuelve ADP y NADP<sup>+</sup> a la luminosa."
    ]) +
    ejemplo("Pregunta 2. Describe el ciclo de Calvin y su balance", "Respuesta modelo:", [
      "<b>Carboxilación:</b> RuBisCO une CO<sub>2</sub> a la RuBP (5 C) y da 2 moléculas de 3-PGA.",
      "<b>Reducción:</b> el 3-PGA se reduce a G3P con ATP y NADPH.",
      "<b>Regeneración:</b> 5 de cada 6 G3P regeneran la RuBP, con ATP; 1 sale del ciclo.",
      "<b>Balance:</b> por glucosa, 6 CO<sub>2</sub>, 18 ATP y 12 NADPH."
    ]) +
    ejemplo("Pregunta 3. Flujo cíclico y acíclico: diferencias", "Respuesta modelo:", [
      "<b>Acíclico:</b> PSII y PSI; fotólisis; el electrón termina en el NADP<sup>+</sup>. Produce ATP, NADPH y O<sub>2</sub>.",
      "<b>Cíclico:</b> solo el PSI; el electrón vuelve al P700. Produce solo ATP.",
      "<b>Utilidad:</b> el cíclico completa el ATP que necesita el ciclo de Calvin."
    ]) +
    ejemplo("Pregunta 4. Plantas C4 y CAM frente a C3", "Respuesta modelo:", [
      "<b>Problema:</b> con calor y sequía los estomas se cierran, baja el CO<sub>2</sub>, la RuBisCO fija O<sub>2</sub> y hay fotorrespiración.",
      "<b>C4:</b> la PEP carboxilasa del mesófilo fija el CO<sub>2</sub> y forma oxalacetato y malato; en la vaina se libera CO<sub>2</sub> concentrado para el Calvin. Separación <b>en el espacio</b>.",
      "<b>CAM:</b> estomas abiertos de noche, CO<sub>2</sub> guardado como malato; de día, estomas cerrados y Calvin. Separación <b>en el tiempo</b>."
    ]) +
    ejemplo("Pregunta 5. ¿Qué es la quimiosíntesis? Un ejemplo", "Respuesta modelo:", [
      "<b>Definición:</b> síntesis de materia orgánica a partir de CO<sub>2</sub> con la energía de oxidar compuestos inorgánicos (sin luz).",
      "<b>Ejemplo:</b> <i>Nitrosomonas</i> (2 NH<sub>4</sub><sup>+</sup> + 3 O<sub>2</sub> → 2 NO<sub>2</sub><sup>−</sup> + 4 H<sup>+</sup> + 2 H<sub>2</sub>O) y <i>Nitrobacter</i> (NO<sub>2</sub><sup>−</sup> → NO<sub>3</sub><sup>−</sup>).",
      "<b>Importancia:</b> ciclo del nitrógeno y ecosistemas de las fuentes hidrotermales."
    ]) +
    "<p>Los ejercicios del final incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio9a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
