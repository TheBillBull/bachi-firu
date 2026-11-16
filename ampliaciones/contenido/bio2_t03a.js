/* ============================================================
   Biología II · ampliaciones · Tema 3: Lípidos
   (parte A: teoría. Parte B, bio2_t03b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widget nuevo en ampliaciones/lab_bio_t3.js (bio_acidograso). Cifras recalculadas en herramientas/verificar_bio2_t3.py.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Qué es un lípido y cómo se clasifican (saponificables / insaponificables) → sección 1 + clasificar.
   2. Ácido graso: saturado frente a insaturado, cis frente a trans, y por qué cambia el punto de fusión → sección 2 + widget bio_acidograso.
   3. Formación del triacilglicérido (esterificación: glicerina + 3 AG → grasa + 3 H₂O) y su función de reserva → sección 2 + orden.
   4. Saponificación: reacción, jabón y por qué limpia (anfipático, micela, emulsión) → sección 5 + sección 6 con cálculos.
   5. Fosfolípidos: estructura anfipática y bicapa; diferencia con triacilglicéridos → sección 3 + esquema.
   6. Membrana: fluidez, colesterol y temperatura; mosaico fluido; experimento de Gorter y Grendel → sección 3.
   7. Ceras, esteroides, terpenos y eicosanoides: ejemplos y función de cada uno → secciones 3 y 4.
   8. Colesterol: estructura, funciones y lipoproteínas LDL/HDL → sección 4.
   9. Interpretar un experimento (emulsión con jabón o bilis; tinción Sudán III) y datos de puntos de fusión → sección 7.
   10. Cálculos: masa molar, reactivos de la saponificación, hidrogenación, índices y energía → sección 6.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t3/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // esquema de una bicapa (SVG generado: cabezas, colas, agua a ambos lados)
  function bicapa() {
    var s = "<svg class='bio3-svg' viewBox='0 0 420 190' role='img' aria-label='Bicapa de fosfolípidos: cabezas hacia el agua, colas hacia dentro'><rect class='b3-marco' x='2' y='2' width='416' height='186' rx='12'/>", i, x;
    for (i = 0; i < 10; i++) {
      x = 30 + i * 40;
      s += "<circle class='b3-cab' cx='" + x + "' cy='58' r='11'/><path class='b3-cad' d='M" + (x - 4) + " 69 q-4 14 0 24 t0 24' /><path class='b3-cad' d='M" + (x + 4) + " 69 q4 14 0 24 t0 24' />";
      s += "<circle class='b3-cab' cx='" + x + "' cy='154' r='11'/><path class='b3-cad' d='M" + (x - 4) + " 143 q-4 -14 0 -24 t0 -24' /><path class='b3-cad' d='M" + (x + 4) + " 143 q4 -14 0 -24 t0 -24' />";
    }
    s += "<text x='12' y='24'>AGUA (medio externo)</text><text x='12' y='182'>AGUA (citoplasma)</text><text x='150' y='108'>colas apolares (sin agua)</text></svg>";
    return s;
  }

  // ---------------------------------------------------------------- 1. ¿Qué son los lípidos?
  secciones[0] = env(
    "<h5>Una familia definida por lo que NO hacen: no se disuelven en agua</h5>" +
    "<p>A diferencia de los glúcidos o las proteínas, los lípidos <b>no comparten una estructura</b>: una grasa, una cera, el colesterol y la vitamina A parecen moléculas sin relación. Lo que los une es una <b>propiedad física</b>: son <b>hidrofóbicos</b> (insolubles en agua) y <b>solubles en disolventes orgánicos</b> (éter, cloroformo, acetona, benceno). La razón es la que ya conoces: están formados casi solo por C e H, y los enlaces C–H son <b>apolares</b>; el agua es polar, así que no hay puentes de hidrógeno con los que «agarrarlos».</p>" +
    "<p>Por eso un lípido tiene <b>tacto untuoso</b>, <b>flota</b> en el agua (densidad menor que 1 g/cm³) y deja en el papel una <b>mancha translúcida que no se seca</b>: el agua se evapora, la grasa no.</p>" +
    "<h5>La clasificación que hay que saber</h5>" +
    tabla(["Grupo", "¿Tiene ácidos grasos?", "Ejemplos", "Idea clave"], [
      ["<b>Saponificables</b>", "Sí: se rompen con una base (NaOH) y dan jabón", "triacilglicéridos (grasas y aceites), ceras, fosfolípidos, glucolípidos", "tienen enlace <b>éster</b>"],
      ["<b>Insaponificables</b>", "No", "esteroides (colesterol, hormonas sexuales), terpenos (carotenos, vitaminas A, E, K), eicosanoides*", "derivan de unidades de 5 C (isopreno) o de ciclos"]
    ], "q3t") +
    "<p style='font-size:14px'>* Los eicosanoides (prostaglandinas, tromboxanos, leucotrienos) derivan de un ácido graso de 20 C, el araquidónico, pero no son saponificables: se suelen estudiar aparte.</p>" +
    w("clasificar", "familias") +
    "<h5>Funciones: no solo «grasa de reserva»</h5>" +
    tabla(["Función", "Ejemplo", "Lípido"], [
      ["<b>Energética</b> (reserva)", "tejido adiposo; semillas de girasol o de oliva", "triacilglicéridos"],
      ["<b>Estructural</b>", "membranas de todas las células", "fosfolípidos y colesterol"],
      ["<b>Protectora y aislante</b>", "grasa bajo la piel de la foca; amortigua el riñón; cutícula de las hojas", "triacilglicéridos y ceras"],
      ["<b>Hormonal</b>", "testosterona, estradiol, cortisol; prostaglandinas", "esteroides y eicosanoides"],
      ["<b>Vitamínica</b>", "A (visión), D (huesos), E (antioxidante), K (coagulación)", "terpenos y esteroides"],
      ["<b>Digestiva</b>", "las sales biliares emulsionan las grasas", "derivados del colesterol"]
    ], "q3t") +
    ojo("«Lípido» no es sinónimo de «grasa». La grasa (triacilglicérido) es solo un tipo de lípido; el colesterol, por ejemplo, <b>no</b> tiene ácidos grasos y no es una grasa.")
  );

  // ---------------------------------------------------------------- 2. Ácidos grasos y triacilglicéridos
  secciones[1] = env(
    "<h5>El ladrillo: el ácido graso</h5>" +
    "<p>Un <b>ácido graso</b> es una cadena larga de carbonos con un grupo <b>carboxilo (–COOH)</b> en un extremo: CH<sub>3</sub>–(CH<sub>2</sub>)<sub>n</sub>–COOH. Casi siempre tiene un número <b>par</b> de carbonos (entre 14 y 22), porque la célula los construye de dos en dos. El carboxilo es la «cabeza» polar (reacciona y se une a otras moléculas); la cadena es la «cola» apolar. Eso hace que sea una molécula <b>anfipática</b>, aunque con una cola tan larga domina lo apolar.</p>" +
    "<p>Se escriben con una notación corta: <b>C18:1 Δ9</b> significa «18 carbonos, 1 doble enlace, que empieza en el carbono 9 contando desde el carboxilo».</p>" +
    tabla(["Tipo", "Dobles enlaces", "Forma de la cadena", "A 20 °C", "Ejemplos"], [
      ["<b>Saturado</b>", "ninguno (todo enlaces sencillos)", "recta, encajan como lápices en un estuche", "sólido", "palmítico C16:0, esteárico C18:0"],
      ["<b>Monoinsaturado</b>", "uno C=C (cis)", "doblada", "líquido", "oleico C18:1 (aceite de oliva)"],
      ["<b>Poliinsaturado</b>", "dos o más", "muy doblada", "líquido", "linoleico C18:2, linolénico C18:3"]
    ], "q3t") +
    "<p>Fórmula general: un ácido graso saturado es C<sub>n</sub>H<sub>2n</sub>O<sub>2</sub>, y cada doble enlace quita <b>2 H</b>: el oleico es C<sub>18</sub>H<sub>34</sub>O<sub>2</sub>, el linoleico C<sub>18</sub>H<sub>32</sub>O<sub>2</sub> y el linolénico C<sub>18</sub>H<sub>30</sub>O<sub>2</sub>.</p>" +
    w("bio_acidograso") +
    "<h5>Por qué las grasas animales son sólidas y los aceites vegetales líquidos</h5>" +
    "<p>Es una cuestión de <b>empaquetamiento</b>. Las cadenas rectas de los ácidos saturados se pegan unas a otras con muchas fuerzas de Van der Waals: hace falta bastante calor para separarlas (el esteárico funde a 70 °C). Un doble enlace <b>cis</b> «rompe» la cadena con un codo de unos 30°; esas cadenas dobladas no encajan, se atraen menos y funden mucho antes (el oleico, a 13 °C; el linolénico, a −11 °C). Por eso la <b>manteca</b> y el <b>sebo</b> son sólidos y el <b>aceite de oliva</b> es líquido.</p>" +
    ojo("Si el doble enlace es <b>trans</b> la cadena queda casi recta y el ácido se comporta como un saturado. Las <b>grasas trans</b> aparecen cuando la industria <b>hidrogena parcialmente</b> un aceite para hacerlo sólido (margarinas, bollería): se pierden dobles enlaces cis y alguno se convierte en trans. Elevan el colesterol LDL y bajan el HDL, por lo que están muy limitadas en la alimentación.") +
    "<h5>Ácidos grasos esenciales</h5>" +
    "<p>Los animales sabemos fabricar saturados y monoinsaturados, pero <b>no</b> sabemos introducir dobles enlaces más allá del carbono 9. Por eso necesitamos tomar con la dieta el <b>linoleico (ω-6)</b> y el <b>α-linolénico (ω-3)</b>: son los <b>ácidos grasos esenciales</b>. «ω-3» significa que el primer doble enlace está a tres carbonos del extremo CH<sub>3</sub>. Se encuentran en el pescado azul, las nueces y las semillas de lino.</p>" +
    "<h5>El triacilglicérido: tres ácidos grasos atados a una glicerina</h5>" +
    "<p>La <b>glicerina</b> (propanotriol, C<sub>3</sub>H<sub>8</sub>O<sub>3</sub>) tiene tres grupos –OH. Cada uno reacciona con el –COOH de un ácido graso: es una <b>esterificación</b>, que forma un <b>enlace éster</b> y libera una molécula de agua. Para unir tres ácidos se liberan <b>3 H<sub>2</sub>O</b>.</p>" +
    "<div class='formula-wrap'><div class='formula'>glicerina + 3 ácidos grasos → triacilglicérido + 3 H<sub>2</sub>O</div></div>" +
    "<p>Los tres ácidos pueden ser iguales o distintos; en una grasa real hay mezcla. Si los tres son sólidos a temperatura ambiente hablamos de <b>grasa</b> (sebo, manteca); si predominan los insaturados, de <b>aceite</b> (oliva, girasol). El proceso inverso, con agua, es la <b>hidrólisis</b>; en el intestino la hacen las <b>lipasas</b>.</p>" +
    w("orden", "ordentg") +
    "<h5>Por qué la grasa es la reserva ideal</h5>" +
    "<ul><li><b>Más energía por gramo:</b> unas <b>9 kcal/g</b> frente a unas 4 kcal/g de glúcidos y proteínas. Tiene muchos enlaces C–H (muy «reducidos»), y al oxidarlos se libera más energía.</li>" +
    "<li><b>Se guarda «seca»:</b> es hidrofóbica y no arrastra agua. El glucógeno se almacena muy hidratado y ocupa mucho más volumen por kcal. Por eso las aves migratorias y los animales que hibernan acumulan grasa, no glucógeno.</li>" +
    "<li><b>Además aísla y protege:</b> la grasa subcutánea de focas y ballenas, el «cojín» que rodea los riñones.</li>" +
    "<li><b>Limitación:</b> se moviliza más despacio que la glucosa; el cerebro y los hematíes dependen sobre todo de glucosa.</li></ul>" +
    "<p>Con las cifras: para almacenar 2000 kcal hacen falta 2000/9 ≈ 222 g de grasa, pero 2000/4 = 500 g de glúcidos en seco (y bastante más con el agua asociada).</p>"
  );

  // ---------------------------------------------------------------- 3. Fosfolípidos y ceras
  secciones[2] = env(
    "<h5>El fosfolípido: dos colas y una cabeza</h5>" +
    "<p>El fosfolípido más habitual (<b>glicerofosfolípido</b>) sale de una glicerina con <b>dos</b> ácidos grasos (en los carbonos 1 y 2, uno suele ser saturado y otro insaturado) y, en el carbono 3, un <b>grupo fosfato</b> unido a un alcohol polar (colina, etanolamina, serina…). Resultado: una <b>cabeza polar e hidrofílica</b> (con carga) y <b>dos colas apolares e hidrofóbicas</b>. Es la molécula <b>anfipática</b> por excelencia. Otro grupo, los <b>esfingolípidos</b> (esfingomielina), usan esfingosina en lugar de glicerina y abundan en la vaina de mielina de las neuronas.</p>" +
    tabla(["", "Triacilglicérido", "Fosfolípido"], [
      ["Unidades", "glicerina + 3 ácidos grasos", "glicerina + 2 ácidos grasos + fosfato + alcohol"],
      ["Polaridad", "apolar (toda la molécula es hidrofóbica)", "<b>anfipático</b>: cabeza polar, colas apolares"],
      ["En agua", "forma gotas que flotan", "forma <b>micelas, bicapas o liposomas</b>"],
      ["Función", "reserva de energía, aislante", "estructura de las membranas"]
    ], "q3t") +
    "<h5>Qué pasa cuando un lípido anfipático se echa al agua</h5>" +
    "<p>Las colas no pueden hacer puentes de hidrógeno y el agua se ordena a su alrededor, lo que es energéticamente costoso. Para minimizarlo, las colas se esconden juntas y las cabezas se quedan en contacto con el agua. Se forma así <b>espontáneamente</b>, sin gastar ATP, una de estas estructuras:</p>" +
    tabla(["Estructura", "Quién la forma", "Cómo es"], [
      ["<b>Micela</b>", "lípidos con <b>una</b> cola (jabones, sales biliares)", "esfera con las colas dentro y las cabezas fuera; atrapa grasa en su centro"],
      ["<b>Bicapa</b>", "lípidos con <b>dos</b> colas (fosfolípidos)", "dos láminas enfrentadas por las colas; es la membrana"],
      ["<b>Liposoma</b>", "la bicapa cerrada sobre sí misma", "vesícula hueca con agua dentro; sirve para transportar fármacos"]
    ], "q3t") +
    bicapa() +
    "<p style='text-align:center;font-size:14px'>Bicapa en corte: las cabezas (círculos) miran al agua y las colas quedan dentro. Mide unos 5 nm de espesor.</p>" +
    "<h5>La membrana: una bicapa fluida</h5>" +
    "<p>Los fosfolípidos de una bicapa no están fijos: se mueven <b>lateralmente</b> con mucha rapidez (un fosfolípido recorre varios µm por segundo), giran sobre sí mismos y casi nunca saltan de una capa a la otra (<b>flip-flop</b>), un salto que necesita enzimas (<b>flipasas</b>) porque la cabeza polar tendría que atravesar la zona apolar. En 1972, <b>Singer y Nicolson</b> propusieron el <b>modelo del mosaico fluido</b>: una bicapa fluida con proteínas que flotan en ella (se estudia en el tema 6). Antes, en 1925, <b>Gorter y Grendel</b> habían sugerido que era una bicapa midiendo cuánta superficie cubrían los lípidos extraídos de los glóbulos rojos: el doble que la superficie de las células.</p>" +
    "<p>La <b>fluidez</b> depende de:</p>" +
    "<ul><li><b>La temperatura:</b> con frío la membrana se hace rígida; con calor, más fluida.</li>" +
    "<li><b>Las colas:</b> más ácidos insaturados (codos) → más fluida. Los organismos del frío (peces polares, plantas de invierno) incorporan más insaturados para no «congelar» su membrana.</li>" +
    "<li><b>El colesterol</b> (membranas animales): actúa de <b>amortiguador</b>; con calor la hace menos fluida (frena el movimiento) y con frío impide que se empaquete (la mantiene fluida). Por eso se dice que es un <b>regulador de la fluidez</b>.</li></ul>" +
    ojo("El colesterol no «endurece» siempre la membrana ni «ablanda» siempre: <b>modula</b> la fluidez según la temperatura. Y solo está en las membranas animales (las bacterias no tienen colesterol; las plantas tienen fitoesteroles).") +
    "<h5>Las ceras: lípidos para impermeabilizar</h5>" +
    "<p>Una <b>cera</b> es un <b>éster de un ácido graso de cadena larga y un alcohol de cadena larga</b> (un único enlace éster, sin glicerina). Son <b>muy hidrofóbicas</b> y duras. Ejemplos: la <b>cera de abeja</b> (panales), la cutícula de hojas y frutos (evita que pierdan agua), las plumas de las aves acuáticas (el aceite de la glándula uropigial), el <b>cerumen</b> del oído y la <b>lanolina</b> de la lana.</p>"
  );

  // ---------------------------------------------------------------- 4. Esteroides y terpenos
  secciones[3] = env(
    "<h5>Esteroides: cuatro anillos fusionados</h5>" +
    "<p>Los <b>esteroides</b> derivan del <b>esterano</b> (ciclopentanoperhidrofenantreno): tres anillos de seis carbonos y uno de cinco, fusionados. No tienen ácidos grasos, por eso son <b>insaponificables</b>. Se diferencian por los grupos que cuelgan de ese esqueleto.</p>" +
    tabla(["Esteroide", "Dónde y qué hace"], [
      ["<b>Colesterol</b> (C<sub>27</sub>H<sub>46</sub>O)", "membranas animales (regula la fluidez); precursor de todos los demás esteroides; se obtiene de la dieta y se fabrica en el hígado"],
      ["<b>Hormonas sexuales</b>", "testosterona (testículo), estradiol y progesterona (ovario): caracteres sexuales y ciclo"],
      ["<b>Corticoides</b>", "cortisol, aldosterona (corteza suprarrenal): estrés, inflamación, sal y agua"],
      ["<b>Vitamina D</b>", "se forma en la piel a partir de un derivado del colesterol con luz solar; absorción de calcio"],
      ["<b>Ácidos y sales biliares</b>", "hígado → vesícula; emulsionan las grasas en el intestino para que actúen las lipasas"]
    ], "q3t") +
    "<h5>Colesterol y salud: LDL frente a HDL</h5>" +
    "<p>Como el colesterol es insoluble, viaja por la sangre dentro de <b>lipoproteínas</b> (lípidos envueltos por fosfolípidos y proteínas). Las <b>LDL</b> llevan colesterol del hígado a los tejidos; si hay demasiadas, parte se deposita en las arterias (<b>aterosclerosis</b>): es el «colesterol malo». Las <b>HDL</b> recogen el sobrante y lo devuelven al hígado: el «bueno». El colesterol no es un veneno: sin él no hay membranas ni hormonas esteroideas; el problema es el exceso de LDL.</p>" +
    "<h5>Terpenos (isoprenoides)</h5>" +
    "<p>Se forman al unir unidades de <b>isopreno</b> (cinco carbonos). Según cuántas unidades tengan: <b>aceites esenciales</b> de las plantas (mentol, limoneno: aromas), <b>carotenoides</b> (pigmentos naranjas; el β-caroteno se transforma en vitamina A), las <b>vitaminas A, E y K</b>, la <b>cadena lateral de la clorofila</b> y el <b>caucho</b>.</p>" +
    "<h5>Eicosanoides</h5>" +
    "<p>Las <b>prostaglandinas</b>, tromboxanos y leucotrienos se forman a partir del <b>ácido araquidónico</b> (C20:4), liberado de los fosfolípidos de la membrana. Actúan <b>cerca de donde se forman</b> (no viajan lejos): dolor, fiebre, inflamación, coagulación y contracción del útero. La <b>aspirina</b> y el ibuprofeno funcionan bloqueando su síntesis.</p>" +
    "<h5>Vitaminas liposolubles: A, D, E, K</h5>" +
    "<p>Se disuelven en grasa, no en agua. Como se almacenan en el hígado y el tejido adiposo, un <b>exceso</b> (hipervitaminosis) puede ser tóxico; y con dietas muy bajas en grasa o problemas de absorción de grasas puede haber carencias.</p>" +
    ojo("Una pregunta típica: «¿es el colesterol un lípido saponificable?». <b>No</b>: no contiene ácidos grasos. (Los <i>ésteres de colesterol</i>, que sí tienen un ácido graso, sí se saponifican; pero el colesterol libre, no.)")
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Saponificación: del aceite al jabón", html: env(
    "<p>La <b>saponificación</b> es la <b>hidrólisis alcalina</b> (con una base fuerte, NaOH o KOH) de un lípido con enlaces éster. Con un triacilglicérido:</p>" +
    "<div class='formula-wrap'><div class='formula'>triacilglicérido + 3 NaOH → glicerina + 3 sales sódicas de ácido graso (<b>jabón</b>)</div></div>" +
    "<p>Con NaOH se obtienen <b>jabones duros</b> (sólidos); con KOH, <b>jabones blandos</b> (cremas, jabón líquido). Es la reacción que se usa desde hace milenios para fabricar jabón con grasa de oveja, aceite de oliva y ceniza (que aporta potasa).</p>" +
    "<h5>¿Por qué un jabón limpia?</h5>" +
    "<p>Una sal de ácido graso es una molécula <b>anfipática</b>: cabeza carboxilato (–COO<sup>−</sup> Na<sup>+</sup>, polar) y cola larga apolar. Cuando lavas un plato:</p>" +
    "<ol><li>las colas apolares se «clavan» en la gota de grasa;</li><li>las cabezas polares quedan hacia el agua;</li><li>la grasa queda rodeada de jabón formando <b>micelas</b> que se dispersan en el agua: una <b>emulsión</b>;</li><li>al aclarar, el agua arrastra las micelas.</li></ol>" +
    "<p><b>Emulsión no es lo mismo que disolución:</b> en una disolución las partículas son moléculas sueltas; en una emulsión hay gotitas de un líquido repartidas en otro con la ayuda de un <b>emulgente</b> (jabón, bilis, lecitina de la yema del huevo en la mayonesa).</p>" +
    "<h5>Otras reacciones de los lípidos</h5>" +
    tabla(["Reacción", "Qué ocurre", "Dónde la ves"], [
      ["<b>Esterificación</b>", "ácido graso + alcohol → éster + agua", "síntesis de grasas en el adipocito"],
      ["<b>Hidrólisis enzimática</b>", "lipasa + agua: grasa → glicerina + 3 ácidos grasos", "digestión en el intestino"],
      ["<b>Saponificación</b>", "grasa + base: glicerina + jabón", "fabricación de jabón"],
      ["<b>Hidrogenación</b>", "se añade H<sub>2</sub> a los C=C: insaturado → saturado", "margarinas (¡riesgo de grasas trans!)"],
      ["<b>Enranciamiento</b>", "el O<sub>2</sub> oxida los dobles enlaces y huele a «rancio»", "aceite viejo, frutos secos; lo frena la vitamina E"]
    ], "q3t") +
    "<p>Dos índices de laboratorio que aparecen en las etiquetas técnicas: el <b>índice de saponificación</b> (mg de KOH que gasta 1 g de grasa; cuanto más pequeñas sean las cadenas, más alto) y el <b>índice de yodo</b> (g de I<sub>2</sub> que se adicionan a 100 g de grasa; mide los dobles enlaces: más yodo, más insaturada).</p>" +
    w("emparejar", "reacciones")) });

  nuevas.push({ h: "6. Cálculos con lípidos", html: env(
    "<p>Masas atómicas usadas: C 12,011; H 1,008; O 15,999; Na 22,990; K 39,098; I 126,904. Redondeamos los resultados a 3–4 cifras.</p>" +
    ejemplo("Saponificación de la trioleína", "La <b>trioleína</b> (glicerina + 3 ácido oleico, C<sub>57</sub>H<sub>104</sub>O<sub>6</sub>) se saponifica con NaOH. Para 100 g de trioleína, calcula los gramos de NaOH necesarios, de jabón (oleato sódico, C<sub>18</sub>H<sub>33</sub>O<sub>2</sub>Na) y de glicerina obtenidos.", [
      "<b>Reacción:</b> C<sub>57</sub>H<sub>104</sub>O<sub>6</sub> + 3 NaOH → C<sub>3</sub>H<sub>8</sub>O<sub>3</sub> + 3 C<sub>18</sub>H<sub>33</sub>O<sub>2</sub>Na.",
      "<b>Masas molares:</b> trioleína 885,45 g/mol; NaOH 40,00; oleato sódico 304,45; glicerina 92,09.",
      "<b>Moles de trioleína:</b> 100 / 885,45 = 0,1129 mol.",
      "<b>NaOH:</b> 3 · 0,1129 = 0,3388 mol → 0,3388 · 40,00 = <b>13,55 g</b>.",
      "<b>Jabón:</b> 3 · 0,1129 · 304,45 = <b>103,2 g</b>.",
      "<b>Glicerina:</b> 0,1129 · 92,09 = <b>10,40 g</b>.",
      "<b>Comprobación (conservación de la masa):</b> 100 + 13,55 = 113,55 g de reactivos; 103,15 + 10,40 = 113,55 g de productos. ✓"
    ]) +
    ejemplo("Hidrogenación", "Se hidrogenan por completo 100 g de trioleína (cada molécula tiene 3 dobles enlaces C=C, uno por cada oleico). ¿Cuántos gramos de H<sub>2</sub> se consumen?", [
      "1 mol de trioleína necesita 3 mol de H<sub>2</sub>: da <b>triestearina</b>.",
      "Moles: 100 / 885,45 = 0,1129 mol → H<sub>2</sub> = 3 · 0,1129 = 0,3388 mol.",
      "Masa: 0,3388 · 2,016 = <b>0,683 g de H<sub>2</sub></b>."
    ]) +
    ejemplo("Índices de la trioleína", "Calcula su índice de saponificación (mg de KOH por g) y su índice de yodo (g de I<sub>2</sub> por 100 g).", [
      "<b>Saponificación:</b> 3 mol de KOH por mol de grasa; M(KOH) = 56,106 g/mol → 3 · 56,106 / 885,45 = 0,1901 g/g = <b>190,1 mg KOH/g</b> (el aceite de oliva real da 185–195).",
      "<b>Yodo:</b> 3 mol de I<sub>2</sub> (253,81 g/mol) por mol → 3 · 253,81 / 885,45 · 100 = <b>86,0 g de I<sub>2</sub> por 100 g</b> (aceite de oliva: 75–94)."
    ]) +
    ejemplo("Energía", "¿Cuántos gramos de grasa y de glúcidos se necesitan para almacenar 2000 kcal? Usa 9 y 4 kcal/g.", [
      "Grasa: 2000 / 9 = <b>222 g</b>. Glúcidos: 2000 / 4 = <b>500 g</b>.",
      "Diferencia: 500 − 222 = <b>278 g</b> (más del doble, y sin contar el agua que acompaña al glucógeno).",
      "Cociente de energías: 9/4 = 2,25, es decir «más del doble»."
    ]) +
    ojo("En el examen se acepta 9 kcal/g (a veces 9,3) para las grasas y 4 kcal/g (a veces 4,1) para los glúcidos. Lo que se valora es la idea: <b>más del doble</b>.") +
    "<h5>Contar átomos de un triacilglicérido</h5>" +
    "<p>Carbonos = 3 (glicerina) + suma de los carbonos de los tres ácidos. Con palmítico (16), oleico (18) y esteárico (18): 3 + 16 + 18 + 18 = <b>55 C</b>. Y siempre se liberan <b>3 H<sub>2</sub>O</b> al formarlo, porque hay tres ésteres.</p>") });

  nuevas.push({ h: "7. Ejemplo PAU resuelto: interpretar un experimento", html: env(
    ejemplo("Cuatro tubos con aceite", "En el laboratorio se pone una cucharadita de aceite en cada tubo, con 10 mL de: A) agua; B) agua con unas gotas de detergente; C) agua con bilis; D) etanol (alcohol). Se agita y se deja reposar. Resultado: en A el aceite se separa y flota; en B y C queda un líquido lechoso estable; en D no se ve el aceite. (a) Explica cada tubo. (b) ¿Qué diferencia hay entre B y D? (c) Si se añade Sudán III (un colorante rojo liposoluble), ¿dónde se colorea?", [
      "<b>Tubo A:</b> el aceite es apolar y el agua polar: no se mezclan, y flota porque su densidad es menor que 1 g/cm³.",
      "<b>Tubos B y C:</b> el detergente y la bilis son <b>emulgentes anfipáticos</b>: sus colas se clavan en el aceite y sus cabezas miran al agua; forman micelas y gotitas diminutas: una <b>emulsión</b> (lechosa porque las gotas dispersan la luz).",
      "<b>Tubo D:</b> el etanol es un disolvente orgánico (con parte apolar): el aceite se <b>disuelve</b> de verdad y no se ve.",
      "<b>(b) Diferencia:</b> en B hay una <b>emulsión</b> (gotitas de aceite repartidas y estabilizadas; con el tiempo puede separarse); en D hay una <b>disolución</b> (moléculas dispersas, transparente y estable).",
      "<b>(c) Sudán III:</b> el colorante es liposoluble: se concentra en el aceite (en A, la capa de arriba; en B y C, las gotitas). Es la prueba de laboratorio para <b>reconocer lípidos</b>.",
      "<b>Conclusión que puntúa:</b> la bilis hace en el intestino lo que el detergente hace en el plato: emulsiona las grasas y multiplica la superficie para que actúe la lipasa."
    ]) +
    ejemplo("Puntos de fusión y dobles enlaces", "Una gráfica muestra el punto de fusión de ácidos de 18 carbonos: 0 dobles enlaces, 70 °C; 1 doble enlace, 13 °C; 2, −5 °C; 3, −11 °C. (a) Describe la tendencia. (b) ¿Cuáles son líquidos a 20 °C y cuáles sólidos? (c) ¿Qué ocurriría con el esteárico y el oleico dentro de un frigorífico a 4 °C?", [
      "<b>(a)</b> Al aumentar los dobles enlaces, el punto de fusión <b>baja</b> (la caída más grande es del primer doble enlace: de 70 a 13 °C). Causa: los codos cis impiden el empaquetamiento.",
      "<b>(b)</b> A 20 °C el esteárico (70 °C) es sólido; el oleico (13 °C), el linoleico y el linolénico son líquidos.",
      "<b>(c)</b> A 4 °C el esteárico sigue sólido y el oleico (13 °C) <b>solidifica</b>; por eso el aceite de oliva se enturbia y se vuelve pastoso en la nevera, mientras que el de girasol (más linoleico, de punto de fusión más bajo) resiste más.",
      "<b>Detalle de examen:</b> no confundas el ácido puro con el aceite comercial: un aceite es una mezcla de triacilglicéridos con varios ácidos, y por eso funde en un intervalo de temperaturas."
    ])) });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar con la estructura → ejemplo → función</b>. Preguntas típicas con respuesta modelo:</p>" +
    ejemplo("Pregunta 1. Estructura y funciones de los triacilglicéridos", "Respuesta modelo:", [
      "<b>Estructura:</b> glicerina unida a <b>tres ácidos grasos</b> por <b>enlaces éster</b> (esterificación, se liberan 3 H<sub>2</sub>O). Son apolares.",
      "<b>Tipos:</b> grasas (saturados, sólidas) y aceites (insaturados, líquidos).",
      "<b>Funciones:</b> reserva de energía (9 kcal/g, sin agua asociada), aislante térmico y protección mecánica."
    ]) +
    ejemplo("Pregunta 2. Fosfolípidos: estructura, comportamiento en agua y función", "Respuesta modelo:", [
      "<b>Estructura:</b> glicerina + 2 ácidos grasos + fosfato + alcohol polar. Cabeza hidrofílica y dos colas hidrofóbicas: <b>anfipático</b>.",
      "<b>En agua:</b> las colas se esconden y las cabezas miran al agua: forma <b>bicapas</b>, micelas o liposomas, de manera espontánea.",
      "<b>Función:</b> forman la bicapa de todas las membranas celulares, que es fluida y actúa de barrera selectiva."
    ]) +
    ejemplo("Pregunta 3. Saponificación y acción del jabón", "Respuesta modelo:", [
      "<b>Saponificación:</b> hidrólisis alcalina (NaOH) de un triacilglicérido: glicerina + 3 sales de ácido graso (jabón).",
      "<b>Por qué limpia:</b> el jabón es anfipático; las colas rodean la grasa y forman micelas que quedan dispersas (emulsión) y se aclaran con agua.",
      "Solo se saponifican los lípidos con ácidos grasos (grasas, ceras, fosfolípidos); los esteroides y terpenos no."
    ]) +
    ejemplo("Pregunta 4. Colesterol", "Respuesta modelo:", [
      "<b>Es</b> un esteroide (4 anillos fusionados; C<sub>27</sub>H<sub>46</sub>O), lípido <b>insaponificable</b>.",
      "<b>Funciones:</b> regula la fluidez de las membranas animales; precursor de hormonas esteroideas, vitamina D y sales biliares.",
      "<b>Salud:</b> viaja en lipoproteínas; el exceso de LDL favorece la aterosclerosis; las HDL lo devuelven al hígado."
    ]) +
    "<p>Los ejercicios del final del tema incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio3a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
