/* ============================================================
   Biología II · ampliaciones · Tema 12: Expresión génica
   (parte A: teoría. Parte B, bio2_t12b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t12.js (bio_maduracion, bio_traductor, bio_operon).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Dogma central y sus excepciones (retrotranscriptasa, replicación de ARN, priones) → sección 1.
   2. Transcripción: hebra molde frente a hebra codificante, sentidos 5'→3', promotor; y comparación con la replicación → sección 2.
   3. Maduración del ARNm (caperuza, poli-A, splicing) y por qué solo en eucariotas; splicing alternativo → sección 3 + widget bio_maduracion.
   4. Características del código genético y uso de la tabla de codones → sección 4 (tabla completa).
   5. Traducción: ARNt, sitios A–P–E, iniciación, elongación, terminación → sección 5 + ordenar etapas.
   6. Procariotas frente a eucariotas en transcripción y traducción (acoplamiento, 70S/80S, Shine-Dalgarno) → secciones 2 y 5 (tablas).
   7. Operón lac (inducible, con glucosa y CAP) y operón trp (reprimible) → sección nueva 6 + widget bio_operon.
   8. Problemas de transcribir y traducir: de la hebra molde al péptido, y cuántos nucleótidos/aminoácidos → sección nueva 7 + widget bio_traductor.
   9. Interpretar experimentos con mutantes del operón lac → sección nueva 8 (ejemplo PAU resuelto).
   10. Mutaciones silenciosas, de cambio de sentido y de parada (efecto sobre la proteína) → secciones 4 y 7.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t12/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // tabla completa del código genético, generada con el mismo diccionario que usa el widget
  function tablaCodigo() {
    var L = B.lab && B.lab.bio12; if (!L) return "";
    var b = "UCAG", h = "<table class='lamina-table q3t' style='text-align:center'><thead><tr><th>1.ª base</th><th>2.ª base U</th><th>2.ª base C</th><th>2.ª base A</th><th>2.ª base G</th></tr></thead><tbody>";
    for (var i = 0; i < 4; i++) {
      h += "<tr><th>" + b[i] + "</th>";
      for (var j = 0; j < 4; j++) {
        h += "<td style='font-size:13px;line-height:1.5'>";
        for (var k = 0; k < 4; k++) { var c = b[i] + b[j] + b[k], a = L.AA[L.aaDe(c)][0]; h += c + " <b>" + a + "</b>" + (k < 3 ? "<br>" : ""); }
        h += "</td>";
      }
      h += "</tr>";
    }
    return h + "</tbody></table>";
  }

  // ---------------------------------------------------------------- 1. Dogma central
  secciones[0] = env(
    "<h5>Qué dice el dogma y qué NO dice</h5>" +
    "<p>Francis Crick formuló el dogma central en <b>1958</b> y lo precisó en 1970: la información genética pasa de los ácidos nucleicos a las proteínas, pero <b>no puede volver de una proteína a un ácido nucleico</b>. Lo que se prohíbe es «proteína → ADN o ARN». Fíjate en que el dogma <b>nunca dijo</b> que el ARN no pudiera copiarse en ADN: eso se descubrió después.</p>" +
    "<p>Una imagen cotidiana: el ADN es el <b>libro de recetas guardado en la biblioteca</b> (el núcleo, y no sale de allí); el ARNm es la <b>fotocopia de una receta</b> que se lleva a la cocina; el ribosoma es el <b>cocinero</b> que lee la fotocopia y prepara el plato (la proteína). Así el original no se estropea ni se pierde.</p>" +
    "<h5>Las excepciones y ampliaciones que debes conocer</h5>" +
    tabla(["Fenómeno", "Qué ocurre", "Dónde / quién"], [
      ["<b>Transcripción inversa</b> (ARN → ADN)", "La enzima transcriptasa inversa (retrotranscriptasa) fabrica ADN a partir de un molde de ARN. Se descubrió en 1970 (Temin y Baltimore).", "Retrovirus como el VIH; también los retrotransposones. En el laboratorio se usa para obtener ADN a partir de ARN (RT-PCR)."],
      ["<b>Replicación de ARN</b> (ARN → ARN)", "Una ARN replicasa copia el ARN en ARN, sin pasar por ADN.", "Muchos virus de ARN, como los coronavirus o el de la gripe."],
      ["<b>Priones</b> (proteína → proteína)", "Una proteína mal plegada obliga a otras iguales a plegarse mal. Se propaga la <b>conformación</b>, no una secuencia de ácido nucleico (Prusiner, 1982).", "«Vacas locas», enfermedad de Creutzfeldt-Jakob."],
      ["<b>ARN con función propia</b>", "No todo ARN acaba en proteína: ARNr y ARNt son ARN funcionales, y los <b>ribozimas</b> actúan como enzimas.", "Ribosomas, ARNt, maduración del ARN."]
    ], "q3t") +
    ojo("Los priones <b>no</b> contradicen que la información se guarde en los ácidos nucleicos: transmiten una forma, no una secuencia. Y la transcriptasa inversa <b>no rompe</b> el dogma tal como lo formuló Crick, porque va de ácido nucleico a ácido nucleico. En el examen, nombra la enzima y el ejemplo (VIH).") +
    "<h5>Las tres clases de ARN que intervienen</h5>" +
    tabla(["ARN", "Función", "Rasgo para recordar"], [
      ["<b>ARNm</b> (mensajero)", "Lleva la información de un gen al ribosoma.", "Copia lineal de un gen. Su vida es corta: se degrada y la célula regula así cuánta proteína hay."],
      ["<b>ARNt</b> (transferencia)", "Lleva un aminoácido al ribosoma y lo coloca según el codón.", "Forma de «hoja de trébol» (≈ 75–90 nt): un extremo 3' con el aminoácido y el brazo del <b>anticodón</b>."],
      ["<b>ARNr</b> (ribosómico)", "Forma, con proteínas, las subunidades del ribosoma.", "Es el ARN más abundante de la célula; el propio ARNr cataliza el enlace peptídico."]
    ], "q3t") +
    w("emparejar", "arn"));

  // ---------------------------------------------------------------- 2. Transcripción
  secciones[1] = env(
    "<h5>Las reglas de la transcripción, en una lista</h5>" +
    "<ul><li>La <b>ARN polimerasa</b> lee la <b>hebra molde</b> en sentido 3'→5' y sintetiza ARN en sentido <b>5'→3'</b>, por complementariedad: A→U, T→A, G→C, C→G.</li>" +
    "<li>Usa <b>ribonucleótidos trifosfato</b> (ATP, UTP, GTP, CTP): la «T» se sustituye por <b>U (uracilo)</b>.</li>" +
    "<li><b>No necesita cebador</b>: a diferencia de la ADN polimerasa, puede empezar una cadena desde cero.</li>" +
    "<li>Se copia <b>solo un gen o un operón</b> (no todo el cromosoma) y <b>una sola hebra</b>. El ARN no queda unido al ADN: se separa y la doble hélice se cierra.</li>" +
    "<li>Hay tres fases: <b>iniciación</b> (la polimerasa se une al promotor), <b>elongación</b> (avanza y alarga el ARN) y <b>terminación</b> (señal de final y se libera el ARN).</li></ul>" +
    "<p>Hay un detalle que confunde: la <b>hebra codificante</b> (o con sentido) tiene la misma secuencia que el ARNm, con T en vez de U; la <b>hebra molde</b> (antisentido) es la que se lee. Un truco: «el ARNm es una copia de la codificante y una complementaria de la molde».</p>" +
    "<h5>Transcripción frente a replicación (pregunta clásica de la PAU)</h5>" +
    tabla(["", "Replicación (T11)", "Transcripción"], [
      ["Qué se copia", "Todo el genoma, una vez por ciclo", "Un gen u operón, muchas veces"],
      ["Hebras molde", "Las dos", "Una (la molde)"],
      ["Producto", "ADN (dos moléculas hijas)", "ARN (una cadena sencilla)"],
      ["Enzima", "ADN polimerasa", "ARN polimerasa"],
      ["Cebador", "Sí (ARN)", "No"],
      ["Nucleótidos", "dNTP (A, T, G, C)", "NTP (A, U, G, C)"],
      ["Corrección de errores", "Sí, muy eficaz", "Mucho menos (el ARN es temporal)"]
    ], "q3t") +
    "<h5>Procariotas y eucariotas</h5>" +
    tabla(["", "Procariotas", "Eucariotas"], [
      ["ARN polimerasa", "Una sola; el <b>factor sigma</b> reconoce el promotor", "Tres (I: ARNr; II: ARNm; III: ARNt) y <b>factores de transcripción</b>"],
      ["Promotor", "Cajas –35 y –10 (caja de Pribnow)", "Caja TATA y otras secuencias, con factores de transcripción"],
      ["Dónde", "Citoplasma (en el nucleoide)", "Núcleo"],
      ["ARNm recién hecho", "Ya maduro y <b>policistrónico</b> (varios genes: un operón)", "Pre-ARNm que hay que <b>madurar</b>; monocistrónico"],
      ["Relación con la traducción", "<b>Acopladas</b>: se traduce mientras se transcribe", "Separadas en el espacio y el tiempo"]
    ], "q3t") +
    ojo("«Eucariota» no significa «con más genes por ARNm»: un ARNm eucariota suele llevar <b>un solo gen</b>, mientras que el de procariotas puede llevar <b>varios genes</b> (policistrónico), como el del operón lac."));

  // ---------------------------------------------------------------- 3. Maduración
  secciones[2] = env(
    "<h5>Por qué hace falta madurar</h5>" +
    "<p>El pre-ARNm eucariota es como una película en bruto, con escenas de relleno. La <b>caperuza</b> es la etiqueta de la entrada, la <b>cola poli-A</b> la de salida y el <b>splicing</b> es el montaje: se cortan los intrones y se pegan los exones.</p>" +
    tabla(["Proceso", "Dónde", "Qué hace", "Para qué sirve"], [
      ["<b>Caperuza</b>", "extremo 5'", "Se añade un nucleótido de guanina modificado (7-metilguanosina), unido de forma especial", "Protege de las nucleasas y es la señal que reconoce el ribosoma"],
      ["<b>Cola poli-A</b>", "extremo 3'", "Se añaden unos 100–250 adeninas (≈ 200)", "Estabiliza el ARNm y facilita su salida del núcleo"],
      ["<b>Splicing</b>", "interior", "Se eliminan los <b>intrones</b> y se unen los <b>exones</b> (lo hacen el espliceosoma, ARN y proteínas)", "Deja solo la secuencia que codifica la proteína"]
    ], "q3t") +
    w("bio_maduracion") +
    "<h5>Splicing alternativo: un gen, varias proteínas</h5>" +
    "<p>El mismo pre-ARNm puede empalmarse de formas distintas, por ejemplo <b>saltándose un exón</b>. Cada combinación da un ARNm diferente y por tanto una proteína distinta. Así, unos 20 000 genes humanos producen muchas más proteínas distintas. Un ejemplo es la tropomiosina, que tiene variantes específicas de músculo liso, músculo esquelético y otros tejidos.</p>" +
    "<h5>Las palabras que hay que distinguir</h5>" +
    "<ul><li><b>Gen</b>: tramo de ADN que se transcribe a un ARN (en eucariotas, con exones e intrones).</li>" +
    "<li><b>Exón</b>: parte que <b>sale</b> en el ARNm maduro (<b>ex</b>presada).</li>" +
    "<li><b>Intrón</b>: parte que queda <b>in</b>tercalada y se elimina.</li></ul>" +
    ojo("Los intrones <b>se transcriben</b> (están en el pre-ARNm) pero <b>no se traducen</b> (no están en el ARNm maduro). No es correcto decir que «no se transcriben». Y la maduración ocurre en el <b>núcleo</b>, antes de que el ARNm salga al citoplasma.") +
    w("clasificar", "proeuc"));

  // ---------------------------------------------------------------- 4. Código genético
  secciones[3] = env(
    "<h5>Cómo se descubrió que son tripletes</h5>" +
    "<p>Con 4 bases, si cada <b>una</b> codificara un aminoácido, solo habría 4 «palabras»; con <b>pares</b>, 4² = 16, todavía menos que los 20 aminoácidos; con <b>tripletes</b>, 4³ = 64, suficiente. Crick, Brenner y colaboradores demostraron en 1961 que se lee de 3 en 3. Ese mismo año, <b>Nirenberg y Matthaei</b> sintetizaron un ARN con solo uracilos (poli-U) y lo pusieron en un extracto celular: la proteína resultante era de <b>fenilalanina</b>, con lo que UUU = Phe. Después, Nirenberg, Khorana y Holley descifraron el resto (Premio Nobel de 1968).</p>" +
    "<h5>Las características del código</h5>" +
    tabla(["Característica", "Qué significa", "Consecuencia"], [
      ["<b>Triplete</b>", "Cada aminoácido lo determina un codón de 3 bases", "64 codones posibles"],
      ["<b>Degenerado</b> (redundante)", "Varios codones para un mismo aminoácido; Leu, Ser y Arg tienen 6, Met y Trp solo 1", "Muchos cambios en la 3.ª base son <b>silenciosos</b>"],
      ["<b>No ambiguo</b>", "Un codón nunca codifica dos aminoácidos distintos", "El mensaje es siempre el mismo"],
      ["<b>Sin solapamiento y sin comas</b>", "Se lee de 3 en 3, sin saltarse bases ni compartirlas", "Existe un <b>marco de lectura</b>"],
      ["<b>Universal</b>", "Casi igual en todos los seres vivos", "Prueba del origen común; permite la ingeniería genética (insulina humana en bacterias)"],
      ["<b>Con señales</b>", "AUG inicia (y codifica Met); UAA, UAG y UGA paran", "61 codones con sentido y 3 de parada"]
    ], "q3t") +
    "<p>La universalidad tiene excepciones pequeñas: por ejemplo, en las mitocondrias humanas UGA codifica triptófano y no parada. Para la PAU, la regla es «universal» y, si se pide, esta salvedad.</p>" +
    "<h5>La tabla del código genético, completa</h5>" +
    "<p>Se lee así: elige la <b>primera base</b> en la columna de la izquierda, la <b>segunda</b> en la fila de arriba y la <b>tercera</b> entre las cuatro opciones de cada casilla. Está escrita para el <b>ARNm</b> (5'→3'). Observa que los codones de un mismo aminoácido suelen compartir las dos primeras bases: por eso la <b>tercera base</b> tolera cambios.</p>" +
    tablaCodigo() +
    "<p>Total: 61 codones con sentido (de ellos, AUG es el de inicio) y 3 de parada (UAA, UAG, UGA). En el examen te darán esta tabla; lo importante es leerla bien y no confundir ARNm con ADN.</p>" +
    "<h5>Mutaciones puntuales: qué le pasa a la proteína</h5>" +
    "<p>Un cambio de una sola base (se verá en el Tema 13) puede tener cuatro resultados, que se entienden con la tabla:</p>" +
    tabla(["Tipo", "Ejemplo en el ARNm", "Efecto"], [
      ["<b>Silenciosa</b>", "GAA → GAG (Glu → Glu)", "Misma proteína (por la degeneración)"],
      ["<b>Cambio de sentido</b>", "GAA → GUA (Glu → Val)", "Un aminoácido distinto; puede alterar la función"],
      ["<b>Sin sentido</b>", "CAA → UAA (Gln → parada)", "Proteína más corta, casi siempre inservible"],
      ["<b>Cambio de fase</b> (inserción o pérdida de 1–2 bases)", "AUG GAA CCC → AUG AAC CC…", "Se desplaza todo el marco: cambian todos los aminoácidos siguientes"]
    ], "q3t") +
    ojo("«Degenerado» no significa «defectuoso». Significa que <b>hay más de un codón por aminoácido</b>, no que un codón dé varios aminoácidos (eso sería ambiguo y el código no lo es).") +
    w("emparejar", "codigo"));

  // ---------------------------------------------------------------- 5. Traducción
  secciones[4] = env(
    "<h5>Los participantes</h5>" +
    "<ul><li><b>ARNm</b>: el mensaje, leído de 3 en 3 en sentido 5'→3'.</li>" +
    "<li><b>Ribosoma</b>: dos subunidades (procariotas: 30S + 50S = <b>70S</b>; eucariotas: 40S + 60S = <b>80S</b>), con tres sitios: <b>A</b> (aminoacil), <b>P</b> (peptidil) y <b>E</b> (salida, <i>exit</i>).</li>" +
    "<li><b>ARNt cargados</b>: una enzima, la <b>aminoacil-ARNt sintetasa</b>, une cada aminoácido a su ARNt (gasta ATP). Hay una para cada aminoácido y de su exactitud depende que el código se cumpla.</li>" +
    "<li><b>Factores</b> de iniciación, elongación y terminación, y energía de <b>GTP</b>.</li></ul>" +
    "<p>La proteína se sintetiza del extremo <b>amino (N)</b> al <b>carboxilo (C)</b>. Y el ribosoma lee el ARNm en sentido 5'→3'.</p>" +
    "<h5>Las tres fases con más detalle</h5>" +
    tabla(["Fase", "Qué ocurre", "Detalle que puntúa"], [
      ["<b>Iniciación</b>", "La subunidad pequeña se une al ARNm, se coloca el ARNt iniciador sobre el AUG y se une la subunidad grande.", "Procariotas: la subunidad 30S se une a la secuencia de Shine-Dalgarno y el primer aa es <b>formilmetionina</b>. Eucariotas: la 40S reconoce la <b>caperuza</b> y recorre hasta el AUG; primer aa: metionina."],
      ["<b>Elongación</b>", "(1) Entra el ARNt con el anticodón complementario al codón del sitio A. (2) La peptidil transferasa (el ARNr 28S/23S) forma el <b>enlace peptídico</b>: la cadena pasa del sitio P al A. (3) <b>Translocación</b>: el ribosoma avanza 3 nt; el ARNt vacío sale por E.", "Se repite una vez por codón. Cada vuelta alarga la cadena en <b>un</b> aminoácido y gasta GTP."],
      ["<b>Terminación</b>", "El ribosoma llega a UAA, UAG o UGA. Un <b>factor de liberación</b> (no un ARNt) entra en el sitio A, se suelta la cadena y las subunidades se separan.", "No hay ARNt para los codones de parada: no codifican aminoácido."]
    ], "q3t") +
    "<p>Algunas cifras de orden de magnitud: un ribosoma de bacteria añade unos <b>15–20 aminoácidos por segundo</b>, y varios ribosomas leen a la vez el mismo ARNm, formando un <b>polirribosoma</b> (o polisoma). Así, de un solo ARNm salen muchas copias de la proteína.</p>" +
    "<h5>El anticodón y la «oscilación»</h5>" +
    "<p>El anticodón del ARNt es <b>complementario y antiparalelo</b> al codón: al codón 5'-AUG-3' le corresponde el anticodón 3'-UAC-5'. Como hay 61 codones con sentido pero menos de 61 ARNt distintos, la tercera base permite emparejamientos «flexibles» (<b>hipótesis de la oscilación</b> de Crick): un mismo ARNt puede leer varios codones sinónimos.</p>" +
    ojo("Un ARNt <b>no reconoce el codón de parada</b>; lo reconoce un factor de liberación. Y el enlace peptídico lo forma el propio ribosoma (el ARNr actúa como ribozima), no una enzima aparte que «ayude» al ARNt.") +
    w("orden", "ordentrad") +
    "<h5>Procariotas frente a eucariotas en la traducción</h5>" +
    tabla(["", "Procariotas", "Eucariotas"], [
      ["Ribosoma", "70S (30S + 50S)", "80S (40S + 60S)"],
      ["Primer aminoácido", "Formilmetionina", "Metionina"],
      ["Reconocimiento del inicio", "Secuencia de Shine-Dalgarno", "Caperuza 5' y búsqueda del AUG"],
      ["Relación con la transcripción", "Simultánea (en el mismo compartimento)", "Después, en el citoplasma (o en el RER)"],
      ["Proteína secretada", "—", "Se traduce en ribosomas del RER y entra en su luz (T6)"]
    ], "q3t") +
    "<p>Lo anterior explica por qué algunos <b>antibióticos</b> (estreptomicina, tetraciclina, eritromicina) bloquean los ribosomas 70S de las bacterias sin afectar a los 80S de nuestras células.</p>");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Regulación de la expresión: los operones lac y trp", html: env(
    "<p>No todos los genes se expresan siempre: sería un derroche. Una bacteria como <i>E. coli</i> activa los genes que necesita según el ambiente. Un <b>operón</b> es un conjunto de <b>genes estructurales</b> con un <b>promotor</b> y un <b>operador</b> comunes, que se transcriben juntos en un único ARNm. Lo descubrieron <b>Jacob y Monod</b> (1961; Premio Nobel de 1965).</p>" +
    "<h5>Piezas de un operón</h5>" +
    tabla(["Pieza", "Qué es", "En el operón lac"], [
      ["<b>Gen regulador</b>", "Fabrica el represor (se transcribe aparte, siempre)", "<i>lacI</i>"],
      ["<b>Promotor</b>", "Donde se une la ARN polimerasa", "región «P»"],
      ["<b>Operador</b>", "Donde se une el represor y bloquea a la polimerasa", "región «O»"],
      ["<b>Genes estructurales</b>", "Codifican las enzimas", "<i>lacZ</i> (β-galactosidasa, rompe la lactosa en glucosa + galactosa), <i>lacY</i> (permeasa, mete lactosa) y <i>lacA</i> (transacetilasa)"]
    ], "q3t") +
    "<h5>Operón lac: inducible por lactosa y con control por glucosa</h5>" +
    "<ul><li><b>Sin lactosa</b>: el <b>represor</b> se une al operador y la ARN polimerasa no puede transcribir. No se hacen enzimas inútiles.</li>" +
    "<li><b>Con lactosa</b>: una forma de la lactosa, la <b>alolactosa</b> (inductor), se une al represor y lo <b>inactiva</b>; se suelta del operador y se transcriben los genes. Por eso se llama <b>inducible</b>.</li>" +
    "<li><b>Glucosa</b>: si hay glucosa, la bacteria la prefiere. Con glucosa, el AMPc es bajo: la proteína activadora <b>CAP</b> no se une al ADN y la transcripción es débil aunque haya lactosa. Sin glucosa, el AMPc sube, se forma CAP-AMPc, se une cerca del promotor y <b>activa</b> la transcripción (control positivo).</li></ul>" +
    tabla(["Glucosa", "Lactosa", "Represor", "CAP-AMPc", "Transcripción de lacZYA"], [
      ["con", "sin", "unido al operador", "no actúa", "ninguna (basal mínima)"],
      ["con", "con", "inactivado (suelto)", "no actúa", "<b>baja</b>"],
      ["sin", "sin", "unido al operador", "actúa", "ninguna (basal mínima)"],
      ["sin", "con", "inactivado (suelto)", "actúa", "<b>alta</b>"]
    ], "q3t") +
    "<p>Ejemplo cotidiano: el represor es el <b>candado</b> que cierra el interruptor; la lactosa es la <b>llave</b> que lo abre; la glucosa regula el <b>acelerador</b> (CAP). Solo con el candado abierto <b>y</b> el acelerador pisado la transcripción es máxima.</p>" +
    "<h5>Operón trp: reprimible por triptófano</h5>" +
    "<p>El operón trp tiene 5 genes (<i>trpE</i>, <i>trpD</i>, <i>trpC</i>, <i>trpB</i> y <i>trpA</i>) que fabrican las enzimas de la ruta que sintetiza <b>triptófano</b>. Funciona al revés que el lac: el represor <b>por sí solo es inactivo</b>. Si <b>falta triptófano</b>, el represor no se une al operador y el operón se transcribe (la bacteria fabrica su aminoácido). Si <b>hay triptófano</b>, este actúa como <b>correpresor</b>: activa al represor, que se une al operador y apaga el operón. Es el control típico de las rutas de síntesis (<b>reprimible</b>), frente al de las rutas de degradación como la de la lactosa (<b>inducible</b>).</p>" +
    tabla(["", "Operón lac", "Operón trp"], [
      ["Ruta", "Degradación (catabólica)", "Síntesis (anabólica)"],
      ["Estado sin la molécula", "Apagado", "Encendido"],
      ["Molécula clave", "Lactosa (alolactosa): inductor", "Triptófano: correpresor"],
      ["Represor solo", "Activo (se une al operador)", "Inactivo"],
      ["Efecto de la molécula sobre el represor", "Lo <b>inactiva</b>", "Lo <b>activa</b>"],
      ["Tipo de control", "Inducible", "Reprimible"]
    ], "q3t") +
    w("bio_operon") +
    "<h5>Mutantes del operón lac</h5>" +
    tabla(["Mutación", "Qué falla", "Resultado sin lactosa"], [
      ["<b>lacI⁻</b>", "No hay represor funcional", "Operón <b>siempre encendido</b> (constitutivo)"],
      ["<b>lacOᶜ</b>", "El operador no reconoce al represor", "Operón <b>siempre encendido</b>"],
      ["<b>lacZ⁻</b>", "β-galactosidasa defectuosa", "Se regula, pero nunca hay enzima activa"],
      ["<b>lacI<sup>s</sup></b> (superrepresor)", "El represor no se separa de la alolactosa", "Siempre apagado, haya lactosa o no"]
    ], "q3t") +
    "<p>Una diferencia clave: el represor es una proteína <b>difusible</b> (actúa en <b>trans</b>; sirve para cualquier operador de la célula) y el operador es una secuencia de ADN que solo afecta a los genes pegados a ella (<b>cis</b>). Por eso en una bacteria con dos copias del operón, una con <i>lacI</i><sup>+</sup> y otra con <i>lacI</i><sup>−</sup>, la regulación sigue siendo normal: el represor de una copia sirve a las dos.</p>" +
    "<h5>¿Y en eucariotas?</h5>" +
    "<p>En eucariotas no hay operones, pero la idea es la misma: genes que se encienden o apagan según la situación. Intervienen <b>factores de transcripción</b> que se unen a secuencias reguladoras (promotores y <b>potenciadores</b>, a veces muy lejos del gen), y el <b>empaquetamiento del ADN</b>: la cromatina muy compacta (heterocromatina, con ADN metilado) silencia los genes. Así, todas las células de un organismo tienen el mismo ADN pero se especializan, porque expresan <b>genes distintos</b>: una neurona y una célula del hígado.</p>" +
    ojo("Los dos operones <b>no son lo mismo con signo cambiado</b>: en el lac, el represor está activo y la lactosa lo apaga; en el trp, el represor está inactivo y el triptófano lo enciende. Y la glucosa no actúa sobre el represor, sino sobre CAP.") +
    w("clasificar", "operones")) });

  nuevas.push({ h: "7. Problemas de transcribir y traducir: el método", html: env(
    "<p>Estos problemas se resuelven siempre igual. El error más común es mezclar los sentidos 5'→3' y 3'→5', o los alfabetos (T en ADN, U en ARN). Prueba con el traductor y comprueba tus respuestas a mano.</p>" +
    "<h5>Método en cinco pasos</h5>" +
    "<ol><li><b>Identifica qué te dan</b>: ¿la hebra molde (se lee) o la codificante? ¿Con qué sentido está escrita?</li>" +
    "<li><b>Escribe el ARNm</b>: si te dan la <b>codificante</b>, copia cambiando T por U. Si te dan la <b>molde</b>, escribe la complementaria cambiando T por U <b>y</b> acuérdate de que será antiparalela.</li>" +
    "<li><b>Ordénalo 5'→3'</b> (si lo escribiste del revés, dale la vuelta).</li>" +
    "<li><b>Busca el primer AUG</b> y reparte en tripletes desde ahí hasta un codón de parada.</li>" +
    "<li><b>Usa la tabla</b> y escribe los aminoácidos.</li></ol>" +
    ejemplo("De la hebra molde al péptido", "La hebra molde de un gen es 3'-TACAAACCGTTTATT-5'. (a) Escribe el ARNm. (b) Escribe el péptido. (c) Si la molécula mutada tiene la hebra molde 3'-TACAAACCGTTTACT-5', ¿cuál es el nuevo péptido?", [
      "<b>(a)</b> Cada base de la molde se empareja con su complementaria (A→U, T→A, G→C, C→G): T A C A A A C C G T T T A T T → <b>A U G U U U G G C A A A U A A</b>. Escrito de 5' a 3': 5'-AUGUUUGGCAAAUAA-3' (aquí coincide porque la molde está escrita de 3' a 5').",
      "<b>(b)</b> Primer AUG en el primer triplete: <b>AUG – UUU – GGC – AAA – UAA</b>. Con la tabla: Met – Phe – Gly – Lys – parada. El péptido es <b>Met-Phe-Gly-Lys</b> (4 aminoácidos).",
      "<b>(c)</b> Cambia la penúltima base de la molde, de T a C: el ARNm pasa de ...AAA UAA a ...AAA <b>UGA</b>. UGA es también un codón de parada: el péptido sigue siendo <b>Met-Phe-Gly-Lys</b>. Es una mutación <b>silenciosa en cuanto a la proteína</b> (cambia un codón de parada por otro).",
      "<b>Comprobación de longitudes:</b> 15 nt en el ARNm = 5 codones = 4 aminoácidos + 1 de parada."
    ]) +
    "<h5>Longitudes: cuántos nucleótidos y cuántos aminoácidos</h5>" +
    "<p>Cada aminoácido necesita un codón de 3 nt. Para un péptido de <b>n</b> aminoácidos, la zona del ARNm desde el AUG hasta la parada tiene <b>3(n + 1)</b> nucleótidos (n codones con aminoácido más el de parada). Sin contar la parada son 3n.</p>" +
    ejemplo("Una proteína de 150 aminoácidos", "Una proteína de 150 aminoácidos viene de un gen eucariota con 4 exones y 3 intrones de 2000 nt en total. (a) ¿Cuántos nucleótidos tiene la parte codificante del ARNm (con el codón de parada)? (b) ¿Y el pre-ARNm, si no contamos zonas sin traducir?", [
      "<b>(a)</b> 150 codones con aminoácido + 1 de parada = 151 codones × 3 = <b>453 nt</b>.",
      "<b>(b)</b> El pre-ARNm contiene exones e intrones: 453 + 2000 = <b>2453 nt</b>.",
      "<b>Idea que puntúa:</b> el gen es mucho más largo que la región codificante en eucariotas; en procariotas, no (no tienen intrones)."
    ]) +
    "<h5>Cuatro trampas de examen</h5>" +
    "<ul><li><b>Sentido de escritura</b>: si la molde viene escrita 5'→3', hay que dar la vuelta antes de emparejar.</li>" +
    "<li><b>El AUG puede no estar al principio</b>: busca el primer AUG; lo anterior no se traduce.</li>" +
    "<li><b>Si hay parada antes de acabar</b>, el resto de la secuencia no se traduce.</li>" +
    "<li><b>Anticodón</b>: complementario del codón y antiparalelo (codón 5'-GGC-3' → anticodón 3'-CCG-5').</li></ul>" +
    w("bio_traductor")) });

  nuevas.push({ h: "8. Ejemplo PAU resuelto: interpretar un experimento con mutantes", html: env(
    ejemplo("Cuatro cepas de E. coli y la β-galactosidasa", "Se cultivan cuatro cepas de <i>E. coli</i> en un medio sin glucosa, con y sin lactosa, y se mide si hay β-galactosidasa activa (+) o no (–). Cepa A (normal): sin lactosa –, con lactosa +. Cepa B: sin lactosa +, con lactosa +. Cepa C: sin lactosa –, con lactosa –. Cepa D: sin lactosa +, con lactosa +. (a) ¿Qué cepa es la normal y qué hace? (b) Propón una mutación para cada una de las otras. (c) ¿Cómo distinguirías la B de la D con una bacteria que tenga las dos copias del operón?", [
      "<b>(a)</b> La cepa A es la normal (silvestre): el operón lac es <b>inducible</b>. Sin lactosa, el represor bloquea el operador y no hay enzima. Con lactosa, la alolactosa inactiva al represor y se produce β-galactosidasa.",
      "<b>(b)</b> <b>Cepa B y D</b>: producen la enzima aunque no haya lactosa: expresión constitutiva. Pueden ser <i>lacI</i><sup>−</sup> (no hay represor funcional) o <i>lacO</i><sup>c</sup> (el operador no reconoce al represor). <b>Cepa C</b>: nunca hay enzima activa, ni con lactosa: el gen <i>lacZ</i> está mutado (<i>lacZ</i><sup>−</sup>), o bien hay un superrepresor (<i>lacI</i><sup>s</sup>), que nunca se separa del operador. La pregunta, tal como está, admite las dos; con más datos se decide. Por ejemplo, con lactosa un <i>lacZ</i><sup>−</sup> sigue transcribiendo y, por tanto, fabricando permeasa; el superrepresor no.",
      "<b>(c)</b> Se introduce en cada una una segunda copia normal del operón. Si la mutación es <i>lacI</i><sup>−</sup> (B), la copia normal aporta un represor <b>difusible</b>: se vuelve a regular y la cepa pasa a ser normal. Si es <i>lacO</i><sup>c</sup> (D), el operador mutante sigue sin unir al represor, y ese operón <b>sigue encendido</b>: <b>solo afecta a sus propios genes (cis)</b>.",
      "<b>Conclusión que puntúa:</b> el gen regulador actúa en trans y el operador, en cis; y siempre hay que decir si el operón está encendido o apagado con y sin inductor."
    ]) +
    ejemplo("Poli-U y el primer triplete descifrado", "En 1961 Nirenberg y Matthaei añadieron un ARN formado solo por uracilos (poli-U) a un extracto de <i>E. coli</i> con ribosomas, ARNt, aminoácidos y enzimas. Solo se formó un polipéptido de fenilalanina. (a) ¿Qué concluyen? (b) ¿Cómo se habría comprobado que el código se lee de 3 en 3?", [
      "<b>(a)</b> Un ARNm de UUUUUU... se lee en codones UUU: todos iguales y todos para el mismo aminoácido. Como el polipéptido es solo fenilalanina, <b>UUU codifica fenilalanina</b>.",
      "<b>(b)</b> Con poli-A saldría solo lisina; con poli-C, prolina, y con mezclas de dos bases se obtienen proporciones de aminoácidos que dependen de las probabilidades de cada triplete. Además, la ausencia de «comas» y de solapamiento se prueba con las <b>mutaciones de cambio de fase</b>: una inserción o pérdida de 1 o 2 bases destruye la proteína, pero tres inserciones seguidas la recuperan.",
      "<b>Detalle de examen:</b> el experimento usa un <b>ARN sintético</b> (no una célula entera) para controlar el mensaje."
    ]) +
    "<p>Ahora tú: en los ejercicios hay tablas de resultados con mutantes y secuencias para traducir.</p>") });

  nuevas.push({ h: "9. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar el mecanismo → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema.</p>" +
    ejemplo("Pregunta 1. Define transcripción y traducción e indica dónde ocurren", "Respuesta modelo:", [
      "<b>Transcripción:</b> síntesis de un ARN a partir de una hebra molde de ADN, por la ARN polimerasa. En eucariotas ocurre en el núcleo.",
      "<b>Traducción:</b> síntesis de una proteína a partir de la secuencia de codones del ARNm, en los ribosomas del citoplasma, con ayuda de los ARNt.",
      "<b>Relación:</b> el dogma central (ADN → ARN → proteína) las enlaza; en procariotas ocurren a la vez."
    ]) +
    ejemplo("Pregunta 2. Maduración del ARNm eucariota", "Respuesta modelo:", [
      "<b>Dónde y cuándo:</b> en el núcleo, antes de la salida al citoplasma.",
      "<b>Tres procesos:</b> caperuza en 5' (protección y reconocimiento por el ribosoma), cola poli-A en 3' (estabilidad y salida del núcleo) y splicing (se eliminan los intrones y se unen los exones).",
      "<b>Ejemplo:</b> splicing alternativo: un gen da varias proteínas."
    ]) +
    ejemplo("Pregunta 3. Características del código genético", "Respuesta modelo:", [
      "Es de <b>tripletes</b> (codones), <b>degenerado</b> (64 codones, 20 aminoácidos), <b>no ambiguo</b>, <b>sin solapamiento ni comas</b> y <b>universal</b> (con pequeñas excepciones).",
      "Hay <b>un codón de inicio</b> (AUG, Met) y <b>tres de parada</b> (UAA, UAG, UGA).",
      "Consecuencia: ciertas mutaciones son silenciosas; y la universalidad permite fabricar proteínas humanas en bacterias."
    ]) +
    ejemplo("Pregunta 4. Regulación del operón lac", "Respuesta modelo:", [
      "<b>Estructura:</b> promotor, operador y tres genes estructurales (lacZ, lacY y lacA); el gen regulador lacI codifica el represor.",
      "<b>Sin lactosa:</b> el represor se une al operador y la ARN polimerasa no transcribe. <b>Con lactosa:</b> la alolactosa inactiva al represor y se transcribe.",
      "<b>Glucosa:</b> si hay glucosa, CAP-AMPc no actúa y la transcripción es baja; sin glucosa, CAP-AMPc la activa."
    ]) +
    ejemplo("Pregunta 5. Pasos de la traducción", "Respuesta modelo:", [
      "<b>Iniciación:</b> subunidad menor + ARNm + ARNt iniciador (Met) en el AUG; se une la subunidad mayor.",
      "<b>Elongación:</b> entra el ARNt con el anticodón complementario (sitio A), se forma el enlace peptídico y el ribosoma avanza un codón (translocación).",
      "<b>Terminación:</b> un codón de parada no tiene ARNt; los factores de liberación sueltan la proteína."
    ]) +
    "<p>Los ejercicios del final del tema incluyen preguntas abiertas con rúbrica.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio12a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
