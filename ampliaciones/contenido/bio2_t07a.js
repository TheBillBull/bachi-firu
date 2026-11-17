/* ============================================================
   Biología II · ampliaciones · Tema 7: El núcleo y el ciclo celular
   (parte A: teoría. Parte B, bio2_t07b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widget nuevo en ampliaciones/lab_bio_t7.js (bio_ciclo). Cifras recalculadas en herramientas/verificar_bio2_t7.py.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Estructura de la envoltura nuclear (doble membrana, poros, continuidad con el RE) y del cromosoma (cromátida, centrómero, telómero) → sección 1 + esquema.
   2. Cromatina frente a cromosoma: mismo ADN, distinto grado de condensación; eucromatina frente a heterocromatina → sección 1.
   3. Fases del ciclo celular y qué ocurre en cada una (G1, S, G2, M, G0) → sección 2 + gráfica de ADN.
   4. Control del ciclo: puntos de control, ciclinas y CDK, p53 y cáncer → sección 2.
   5. Fases de la mitosis, huso acromático y citocinesis animal frente a vegetal → sección 3.
   6. Meiosis: profase I (sinapsis, quiasmas, crossing-over) y por qué la anafase I separa homólogos y la II cromátidas → sección 4.
   7. Importancia de la meiosis y fuentes de variabilidad (crossing-over, segregación al azar, fecundación) → secciones 4 y 6.
   8. Tabla comparativa mitosis/meiosis y dibujos de células en cada fase → sección 5.
   9. Cálculos: cromosomas, cromátidas y ADN por fase; gráficas de ADN por célula; 2^n gametos → secciones 6 y 7 + widget bio_ciclo.
   10. No disyunción y alteraciones numéricas (Down, Turner, Klinefelter) → sección 4.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t7/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // esquema de un cromosoma metafásico (SVG generado)
  function cromosoma() {
    var s = "<svg class='bio7-svg' viewBox='0 0 440 250' role='img' aria-label='Esquema de un cromosoma metafásico con dos cromátidas, centrómero, cinetocoro, brazos corto y largo y telómeros'><rect class='b7-marco' x='2' y='2' width='436' height='246' rx='12'/>";
    // dos cromátidas: cápsulas verticales con estrechamiento en el centrómero (y = 95)
    s += "<path class='b7-cr' d='M92 30 Q92 22 100 22 Q108 22 108 30 L108 85 Q112 95 108 105 L108 205 Q108 214 100 214 Q92 214 92 205 L92 105 Q88 95 92 85 Z'/>";
    s += "<path class='b7-cr2' d='M132 30 Q132 22 140 22 Q148 22 148 30 L148 85 Q152 95 148 105 L148 205 Q148 214 140 214 Q132 214 132 205 L132 105 Q128 95 132 85 Z'/>";
    s += "<circle class='b7-pt' cx='120' cy='95' r='7'/>";
    s += "<ellipse class='b7-cr' cx='81' cy='95' rx='7' ry='11'/><ellipse class='b7-cr2' cx='159' cy='95' rx='7' ry='11'/>";
    // rótulos con línea de guía: [texto, x, y del punto señalado, y del texto]
    var R = [
      ["Telómero (extremo)", 148, 26, 28],
      ["Brazo corto (p)", 148, 55, 56],
      ["Centrómero", 127, 95, 84],
      ["Cinetocoro (une el huso)", 166, 95, 110],
      ["Brazo largo (q)", 148, 150, 140],
      ["Cromátida = 1 molécula de ADN", 148, 180, 170],
      ["Telómero", 148, 212, 214]
    ], i;
    for (i = 0; i < R.length; i++) {
      s += "<line class='b7-fl' x1='" + R[i][1] + "' y1='" + R[i][2] + "' x2='186' y2='" + R[i][3] + "'/><text x='192' y='" + (R[i][3] + 4) + "'>" + R[i][0] + "</text>";
    }
    s += "<text x='120' y='238' text-anchor='middle'>Cromosoma duplicado</text>";
    return s + "</svg>";
  }

  // gráfica de la cantidad de ADN por célula en mitosis y meiosis (SVG generado)
  function curvas() {
    var y = function (c) { return 160 - 28 * c; };
    var s = "<svg class='bio7-svg' viewBox='0 0 480 235' role='img' aria-label='Cantidad de ADN por célula a lo largo de la mitosis y de la meiosis'><rect class='b7-marco' x='2' y='2' width='476' height='231' rx='12'/>";
    s += "<text x='108' y='22' text-anchor='middle'>Mitosis</text><text x='352' y='22' text-anchor='middle'>Meiosis</text>";
    var c, X0 = [30, 250];
    for (c = 1; c <= 4; c++) {
      s += "<line class='b7-lin' x1='28' y1='" + y(c) + "' x2='462' y2='" + y(c) + "'/><text x='4' y='" + (y(c) + 4) + "'>" + c + "c</text>";
    }
    s += "<polyline class='b7-m' points='34," + y(2) + " 70," + y(2) + " 100," + y(4) + " 168," + y(4) + " 178," + y(2) + " 214," + y(2) + "'/>";
    s += "<polyline class='b7-me' points='254," + y(2) + " 280," + y(2) + " 306," + y(4) + " 354," + y(4) + " 364," + y(2) + " 404," + y(2) + " 414," + y(1) + " 456," + y(1) + "'/>";
    s += "<text x='52' y='186' text-anchor='middle'>G1</text><text x='85' y='186' text-anchor='middle'>S</text><text x='134' y='186' text-anchor='middle'>G2 a anafase</text><text x='196' y='186' text-anchor='middle'>T</text>";
    s += "<text x='267' y='186' text-anchor='middle'>G1</text><text x='293' y='186' text-anchor='middle'>S</text><text x='338' y='186' text-anchor='middle'>G2 a anafase I</text><text x='384' y='186' text-anchor='middle'>II</text><text x='436' y='186' text-anchor='middle'>gametos</text>";
    s += "<text x='108' y='215' text-anchor='middle' style='font-weight:400'>el ADN se parte en dos al dividirse la célula</text><text x='352' y='215' text-anchor='middle' style='font-weight:400'>dos caídas: reducción a 2c y luego a 1c</text>";
    return s + "</svg>";
  }

  // ---------------------------------------------------------------- 1. El núcleo
  secciones[0] = env(
    "<h5>El núcleo: la «sala de control» de la célula eucariota</h5>" +
    "<p>El núcleo es la estructura que da nombre a las células eucariotas (<i>eu</i> = verdadero, <i>karyon</i> = núcleo). Mide unos 5–10 µm, suele ser la estructura más voluminosa de la célula y contiene casi todo su ADN (la otra parte está en mitocondrias y cloroplastos). Tiene cuatro componentes que hay que saber nombrar y explicar: la <b>envoltura nuclear</b>, el <b>nucleoplasma</b>, el <b>nucléolo</b> y la <b>cromatina</b>.</p>" +
    "<h5>La envoltura nuclear</h5>" +
    "<p>Son <b>dos membranas</b> (como las de cualquier membrana celular, bicapas lipídicas con proteínas), separadas por un <b>espacio perinuclear</b> de unos 20–40 nm. La membrana externa es continua con el <b>retículo endoplasmático rugoso</b> y puede llevar ribosomas pegados: el núcleo está «conectado» con la fábrica de proteínas. Por dentro, la membrana interna se apoya en la <b>lámina nuclear</b>, una malla de proteínas (láminas, filamentos intermedios) que da forma y rigidez al núcleo y ancla la cromatina.</p>" +
    "<p>Pero el núcleo no está cerrado: la envoltura está perforada por miles de <b>poros nucleares</b>, complejos de proteínas (nucleoporinas) que actúan como puertas selectivas. Por ellos <b>salen</b> el ARNm, el ARNt y las subunidades de los ribosomas, y <b>entran</b> las histonas, las ADN y ARN polimerasas y los factores que regulan los genes. Las moléculas pequeñas pasan solas; las grandes necesitan una «señal de localización» y gastan energía (GTP).</p>" +
    ojo("Cuidado con «la envoltura nuclear es una membrana»: son <b>dos</b> membranas. Y no desaparece para siempre: se <b>rompe en la profase</b> (la fosforilación de las láminas desmonta la lámina nuclear) y se <b>reconstruye en la telofase</b>.") +
    "<h5>Nucleoplasma y nucléolo</h5>" +
    "<p>El <b>nucleoplasma</b> (o jugo nuclear) es el medio interno del núcleo: agua con sales, nucleótidos, enzimas y factores de transcripción. Dentro hay uno o varios <b>nucléolos</b>, zonas densas sin membrana donde se transcribe el ADN que codifica el <b>ARN ribosómico</b> y se ensamblan las subunidades de los ribosomas junto con las proteínas que llegan del citoplasma. Una célula que fabrica muchas proteínas (por ejemplo, la de una glándula) tiene nucléolos grandes. Durante la división el nucléolo se <b>desorganiza</b> y reaparece al final.</p>" +
    "<h5>Cromatina y cromosomas: el mismo ADN, dos aspectos</h5>" +
    "<p>La <b>cromatina</b> es el complejo de <b>ADN + histonas</b> (y otras proteínas) que se ve en el núcleo de una célula que no se está dividiendo, como una maraña difusa. Ya viste en el tema 5 cómo se empaqueta: nucleosomas, fibra de 30 nm, bucles. Cuando la célula se prepara para dividirse, esa cromatina se <b>condensa</b> al máximo y se hace visible al microscopio como <b>cromosomas</b>. No son dos sustancias distintas: <b>cromatina y cromosoma son el mismo material en dos estados de empaquetamiento</b>: disperso para trabajar (leer genes) y compacto para viajar (repartirlo sin que se rompa).</p>" +
    tabla(["", "Cromatina", "Cromosoma"], [
      ["<b>Cuándo</b>", "interfase", "durante la división (máximo en metafase)"],
      ["<b>Aspecto</b>", "filamentos largos y finos, difusos", "estructuras compactas, con forma definida"],
      ["<b>Actividad</b>", "se transcribe y se replica", "inactivo: solo se reparte"],
      ["<b>Material</b>", "ADN + histonas", "<b>el mismo</b>, superempaquetado"]
    ], "q3t") +
    "<p>Incluso en interfase hay dos tipos de cromatina: la <b>eucromatina</b>, más laxa y clara al microscopio, con genes activos, y la <b>heterocromatina</b>, muy compacta y oscura, con genes silenciados (secuencias repetidas, centrómeros, telómeros; un cromosoma X entero queda inactivado en las células de las mujeres, el «corpúsculo de Barr»).</p>" +
    "<h5>Anatomía de un cromosoma</h5>" +
    cromosoma() +
    "<p>Un cromosoma metafásico «duplicado» tiene <b>dos cromátidas hermanas</b> idénticas (cada una es <b>una molécula de ADN</b> muy empaquetada, resultado de la fase S) unidas por el <b>centrómero</b>. En el centrómero se forma el <b>cinetocoro</b>, un complejo de proteínas al que se pegan los microtúbulos del huso. El centrómero divide cada cromátida en dos <b>brazos</b>: el corto (<b>p</b>, de «petit») y el largo (<b>q</b>). Los extremos son los <b>telómeros</b>: secuencias repetidas (TTAGGG en humanos) que protegen el cromosoma de que se pegue a otro o se degrade. En cada división se acortan un poquito, salvo que actúe la enzima <b>telomerasa</b> (activa en células madre y en muchas células cancerosas): es una de las razones por las que las células normales solo pueden dividirse unas decenas de veces (≈ 50, límite de Hayflick).</p>" +
    ojo("<b>Cromosoma y cromátida no son lo mismo.</b> Un cromosoma sin duplicar (G1) tiene <b>1 cromátida</b>; uno duplicado (G2 hasta la anafase) tiene <b>2</b>. Un cromosoma sigue siendo «un cromosoma» aunque tenga dos cromátidas: lo que cuenta el número de cromosomas es el <b>centrómero</b>.") +
    "<h5>Tipos de cromosomas según el centrómero</h5>" +
    tabla(["Tipo", "Posición del centrómero", "Brazos"], [
      ["<b>Metacéntrico</b>", "en el centro", "iguales"],
      ["<b>Submetacéntrico</b>", "algo desplazado", "uno algo más largo"],
      ["<b>Acrocéntrico</b>", "cerca de un extremo", "uno muy corto"],
      ["<b>Telocéntrico</b>", "en el extremo", "un solo brazo (no hay en la especie humana)"]
    ], "q3t") +
    "<h5>Dotación cromosómica: n, 2n y cariotipo</h5>" +
    "<p>Cada especie tiene un número fijo de cromosomas. Los de una célula somática forman <b>pares de homólogos</b>: dos cromosomas del mismo tamaño y con los mismos genes (aunque no necesariamente las mismas versiones de ellos), uno heredado de cada progenitor. Esa célula es <b>diploide (2n)</b>; los gametos tienen un solo cromosoma de cada par y son <b>haploides (n)</b>. El <b>cariotipo</b> es el conjunto de cromosomas de una célula ordenados por pares y tamaño; se hace con células en <b>metafase</b>, detenidas con colchicina. Los humanos tenemos 2n = 46: 22 pares de <b>autosomas</b> y 1 par de <b>cromosomas sexuales</b> o gonosomas (XX en mujeres, XY en hombres). Más cromosomas no significa «más evolucionado»:</p>" +
    tabla(["Especie", "2n", "n"], [
      ["Mosca del vinagre (<i>Drosophila</i>)", "8", "4"],
      ["Guisante", "14", "7"],
      ["Cebolla", "16", "8"],
      ["Maíz", "20", "10"],
      ["Gato", "38", "19"],
      ["Ser humano", "46", "23"],
      ["Chimpancé", "48", "24"],
      ["Perro", "78", "39"]
    ], "q3t") +
    "<p>También importa la <b>cantidad de ADN</b>. Se mide en <b>unidades c</b>: <b>1c</b> es el ADN de un gameto haploide. Una célula diploide en G1 tiene <b>2c</b>; tras la fase S, <b>4c</b>. Fíjate en una cosa que se confunde mucho: la fase S <b>duplica el ADN pero no cambia el número de cromosomas</b> (cada uno acaba con dos cromátidas). Aprovecharás esto en la sección 6."
  );

  // ---------------------------------------------------------------- 2. Ciclo celular
  secciones[1] = env(
    "<h5>Un ciclo con fases de duración muy distinta</h5>" +
    "<p>Una célula humana cultivada en el laboratorio tarda unas <b>24 horas</b> en recorrer un ciclo completo, pero la <b>división</b> propiamente dicha (fase M) dura solo ≈ 1 h: casi todo el ciclo es <b>interfase</b>. Hay ciclos muy cortos (el embrión de rana, unos 30 minutos) y células que casi nunca se dividen (neuronas, células musculares). Una bacteria puede dividirse cada 20 minutos en condiciones ideales.</p>" +
    tabla(["Fase", "Qué ocurre", "Cromosomas / ADN (célula 2n)"], [
      ["<b>G1</b> (<i>gap</i> 1)", "la célula crece, fabrica proteínas y orgánulos y hace su trabajo; es la fase más variable en duración", "2n · 1 cromátida por cromosoma · 2c"],
      ["<b>S</b> (síntesis)", "se <b>replica el ADN</b> y se sintetizan histonas; se duplica el centrosoma", "el ADN pasa de 2c a 4c · mismos cromosomas"],
      ["<b>G2</b>", "se comprueba la copia, se fabrican las proteínas del huso, la célula crece", "2n · 2 cromátidas · 4c"],
      ["<b>M</b>", "mitosis (o meiosis) y citocinesis", "se reparte el ADN en dos células"],
      ["<b>G0</b>", "la célula sale del ciclo y no se divide (reposo); puede ser temporal (linfocitos, hepatocitos) o permanente (neuronas)", "2n · 2c"]
    ], "q3t") +
    "<p>G1, S y G2 forman la <b>interfase</b>. Un error frecuente: llamar a la interfase «fase de reposo». No lo es: es la fase en que la célula <b>más trabaja</b> (crece, replica el ADN, se prepara). La única fase de «descanso» es G0, y tampoco del todo.</p>" +
    "<h5>Cómo se ve el ciclo en una gráfica de ADN</h5>" +
    curvas() +
    "<p>Si mides el ADN por célula a lo largo de un ciclo de mitosis obtienes un «escalón»: <b>2c</b> en G1, rampa en S hasta <b>4c</b>, meseta de 4c durante G2 y casi toda la mitosis, y <b>caída brusca a 2c</b> al partirse la célula en la telofase y citocinesis. En la meiosis hay <b>dos caídas</b>: una a 2c (final de la meiosis I) y otra a 1c (final de la meiosis II), pero solo <b>una subida</b>. Saber leer esta gráfica da puntos seguros en el examen.</p>" +
    "<h5>El ciclo no avanza «porque sí»: puntos de control</h5>" +
    "<p>Una división equivocada puede ser mortal (o provocar un cáncer), así que la célula comprueba que todo va bien en <b>puntos de control</b> (<i>checkpoints</i>) y solo da el siguiente paso si la respuesta es sí:</p>" +
    tabla(["Punto de control", "Cuándo", "Qué comprueba"], [
      ["<b>G1/S</b> (punto de restricción)", "final de G1", "tamaño suficiente, nutrientes, señales de crecimiento y ADN sin daños. Es el más importante: si se pasa, la célula se divide casi seguro"],
      ["<b>G2/M</b>", "final de G2", "que el ADN se ha copiado entero y sin errores"],
      ["<b>Metafase/anafase</b> (del huso)", "metafase", "que todos los cromosomas están bien unidos al huso por sus cinetocoros; si no, no se separan las cromátidas"]
    ], "q3t") +
    "<h5>Los «motores»: ciclinas y CDK</h5>" +
    "<p>El ciclo lo mueven unas enzimas llamadas <b>quinasas dependientes de ciclinas (CDK)</b>. Una CDK está siempre presente pero <b>inactiva</b>; solo funciona cuando se une a su <b>ciclina</b>, una proteína cuya cantidad <b>sube y baja</b> a lo largo del ciclo (se fabrica y luego se degrada). La pareja ciclina–CDK <b>fosforila</b> otras proteínas y así da la orden de pasar de fase. Por ejemplo, el complejo <b>ciclina B–CDK1</b> (factor promotor de la mitosis) dispara la entrada en M: desmonta la envoltura nuclear y condensa los cromosomas. Al terminar la mitosis la ciclina B se destruye y la CDK vuelve a apagarse. Por este descubrimiento recibieron el premio Nobel en 2001 Leland Hartwell, Paul Nurse y Tim Hunt.</p>" +
    "<h5>Cuando el control falla: cáncer</h5>" +
    "<p>Las señales externas (los <b>factores de crecimiento</b>, como el PDGF) pisan el acelerador del ciclo; otros genes lo frenan. Hay dos tipos de genes implicados en el cáncer:</p>" +
    "<ul><li><b>Protooncogenes</b>: promueven la división. Mutados o en exceso se convierten en <b>oncogenes</b> («acelerador atascado»), como <i>RAS</i>.</li>" +
    "<li><b>Genes supresores de tumores</b>: frenan el ciclo o reparan el ADN. Si se inactivan, se pierde el freno. El más famoso es <b>p53</b>, el «guardián del genoma»: ante daño en el ADN <b>detiene el ciclo en G1</b>, activa la reparación y, si no puede repararlo, desencadena la <b>apoptosis</b> (muerte celular programada). Está mutado en más de la mitad de los cánceres humanos.</li></ul>" +
    "<p>Un <b>tumor</b> es una masa de células que se dividen sin control. Es <b>benigno</b> si permanece localizado y <b>maligno</b> (cáncer) si invade tejidos vecinos y produce <b>metástasis</b>. Casi todos los cánceres necesitan acumular varias mutaciones: por eso aumentan con la edad y con la exposición a mutágenos (tabaco, radiación UV, algunos virus como el del papiloma).</p>" +
    ojo("«Apoptosis» no es lo mismo que «necrosis»: la apoptosis es una muerte <b>ordenada y programada</b> (la célula se «autodesmonta» sin dañar a las vecinas, por ejemplo al separar los dedos del embrión); la necrosis es una muerte <b>accidental</b> por daño, con inflamación.")
  );

  // ---------------------------------------------------------------- 3. Mitosis
  secciones[2] = env(
    "<h5>Mitosis: copiar exactamente una célula</h5>" +
    "<p>La <b>mitosis</b> reparte las cromátidas hermanas entre dos núcleos hijos, que son <b>genéticamente idénticos</b> entre sí y a la célula madre (salvo mutaciones). Sirve para el <b>crecimiento</b> del organismo, la <b>renovación y reparación</b> de tejidos (piel, mucosa intestinal, sangre) y la <b>reproducción asexual</b> (levaduras, hidra, esquejes de plantas, clones). Se divide en <b>cariocinesis</b> (división del núcleo) y <b>citocinesis</b> (división del citoplasma). Nuestro ejemplo: una célula 2n = 4, para ver las cosas claras.</p>" +
    "<h5>El huso acromático</h5>" +
    "<p>El «reparto» lo hace el <b>huso acromático</b> (o mitótico), una estructura de <b>microtúbulos</b> (tubulina). Nace de los <b>centrosomas</b>, que en las células animales contienen un par de <b>centriolos</b> y se duplican en la fase S; en la profase se separan hacia polos opuestos. Hay tres clases de microtúbulos: <b>cinetocóricos</b> (se unen al cinetocoro de cada cromosoma), <b>polares</b> (se solapan en el centro y alargan el huso) y <b>del áster</b> (radiales, anclan el huso a la membrana). <b>Las plantas superiores no tienen centriolos</b> y forman el huso igualmente, sin áster: un detalle que se pregunta. La colchicina, un veneno de la planta cólquico, impide formar microtúbulos y detiene la mitosis en metafase (por eso se usa para hacer cariotipos y como fármaco contra el cáncer).</p>" +
    "<h5>Las fases, una por una</h5>" +
    tabla(["Fase", "Qué ocurre", "Cromosomas y cromátidas (2n = 4)"], [
      ["<b>Profase</b>", "la cromatina se condensa en cromosomas de dos cromátidas; el nucléolo desaparece; los centrosomas migran a los polos y empieza el huso", "4 cromosomas · 8 cromátidas"],
      ["<b>Prometafase</b>", "se rompe la envoltura nuclear; los microtúbulos se unen a los cinetocoros y los cromosomas se mueven", "4 · 8"],
      ["<b>Metafase</b>", "los cromosomas, al máximo de condensación, se alinean en la <b>placa ecuatorial</b>. Es la fase en que se ve mejor el cariotipo", "4 · 8"],
      ["<b>Anafase</b>", "se parte el centrómero y las <b>cromátidas hermanas</b> se separan hacia polos opuestos; cada una ya es un cromosoma. Los polos se alejan", "<b>8 cromosomas</b> (4 por polo) · 8 cromátidas"],
      ["<b>Telofase</b>", "llegan a los polos y se descondensan; el huso se desmonta; se reconstruyen la envoltura nuclear y el nucléolo", "2 núcleos de 4 cromosomas · 4 cromátidas cada uno"]
    ], "q3t") +
    ojo("En la <b>anafase mitótica</b> el número de cromosomas de la célula se duplica momentáneamente (2d = 8 en este ejemplo; 92 en una célula humana). Se separan <b>cromátidas</b>, no cromosomas: cada cromátida, al soltarse, ya cuenta como cromosoma.") +
    w("bio_ciclo") +
    w("orden", "ordenmit") +
    "<h5>Citocinesis: animal frente a vegetal</h5>" +
    "<p>La citocinesis suele empezar al final de la anafase y termina tras la telofase. Se hace de dos maneras muy diferentes:</p>" +
    tabla(["", "Célula animal", "Célula vegetal"], [
      ["<b>Mecanismo</b>", "<b>estrangulamiento</b>: un anillo contráctil de actina y miosina bajo la membrana forma un <b>surco de segmentación</b>", "<b>tabicación</b>: vesículas del aparato de Golgi cargadas de pectinas y celulosa se alinean en el ecuador y se fusionan"],
      ["<b>Estructura que aparece</b>", "dos membranas pellizcadas", "<b>fragmoplasto</b> (microtúbulos que guían las vesículas) y <b>placa celular</b>, que acaba como lámina media y nueva pared"],
      ["<b>Sentido</b>", "de fuera hacia dentro (centrípeta)", "de dentro hacia fuera (centrífuga)"],
      ["<b>Centriolos y áster</b>", "con centriolos y áster", "sin centriolos ni áster (huso anastral)"]
    ], "q3t") +
    "<p>Hay variantes: en muchos hongos y protistas la envoltura nuclear <b>no se rompe</b> (mitosis cerrada); y en algunos tejidos hay divisiones del núcleo sin citocinesis, que dan células con varios núcleos (fibras del músculo esquelético).</p>" +
    "<h5>Las bacterias no hacen mitosis</h5>" +
    "<p>Los procariotas se dividen por <b>fisión binaria</b>: replican su cromosoma circular desde un único punto de origen, los dos cromosomas se separan unidos a la membrana y una proteína parecida a la tubulina (<b>FtsZ</b>) forma un anillo que estrangula la célula en dos. Es más sencillo, sin huso ni cromosomas condensados.</p>" +
    w("quiz", "quizmit")
  );

  // ---------------------------------------------------------------- 4. Meiosis
  secciones[3] = env(
    "<h5>Meiosis: hacer gametos y barajar los genes</h5>" +
    "<p>La <b>meiosis</b> es la división de las células germinales que produce <b>cuatro células haploides</b> (gametos en los animales; esporas en las plantas) a partir de una célula diploide. Consta de <b>una sola replicación</b> del ADN (fase S, antes de empezar) y <b>dos divisiones seguidas</b>, sin nueva replicación en medio:</p>" +
    "<ul><li><b>Meiosis I (reduccional)</b>: se separan los <b>cromosomas homólogos</b>. Las células pasan de 2n a n (pero cada cromosoma sigue teniendo dos cromátidas).</li>" +
    "<li><b>Meiosis II (ecuacional)</b>: se separan las <b>cromátidas hermanas</b>, como en una mitosis, pero de una célula haploide.</li></ul>" +
    "<h5>Meiosis I, fase a fase</h5>" +
    "<p>La <b>profase I</b> es larguísima (en el ovocito humano dura décadas) y es la que marca la diferencia con la mitosis. Se divide en cinco subetapas:</p>" +
    tabla(["Subetapa", "Qué ocurre"], [
      ["<b>Leptoteno</b>", "los cromosomas (ya con dos cromátidas) empiezan a condensarse y se ven como hilos finos"],
      ["<b>Zigoteno</b>", "los homólogos se buscan y se emparejan gen a gen: <b>sinapsis</b>. Se forma el complejo sinaptonémico; cada pareja es un <b>bivalente</b> o <b>tétrada</b> (2 cromosomas, 4 cromátidas)"],
      ["<b>Paquiteno</b>", "cromosomas muy condensados; se produce el <b>crossing-over</b> (entrecruzamiento): cromátidas no hermanas de los homólogos intercambian fragmentos"],
      ["<b>Diploteno</b>", "los homólogos empiezan a separarse, pero siguen unidos en los <b>quiasmas</b>, los puntos donde hubo intercambio (lo que se ve del crossing-over)"],
      ["<b>Diacinesis</b>", "máxima condensación; los quiasmas se desplazan hacia los extremos; se rompe la envoltura nuclear y aparece el huso"]
    ], "q3t") +
    "<p><b>Metafase I</b>: los bivalentes se alinean en el ecuador, de modo que <b>cada homólogo mira a un polo</b>. La orientación de cada par (cuál del padre y cuál de la madre va a cada lado) es <b>al azar</b> e independiente de los demás pares. <b>Anafase I</b>: se separan los <b>homólogos enteros</b> (las cromátidas hermanas siguen unidas, porque el centrómero no se parte). <b>Telofase I</b> (y citocinesis): dos células haploides, con cromosomas de dos cromátidas. Entre las dos divisiones hay una interfase muy corta (la <b>intercinesis</b>) <b>sin fase S</b>: el ADN no se vuelve a copiar.</p>" +
    "<h5>Meiosis II</h5>" +
    "<p>Es una mitosis de cada una de las dos células haploides: en la <b>profase II</b> se reforma el huso; en la <b>metafase II</b> los cromosomas (de dos cromátidas) se alinean; en la <b>anafase II</b> se parte el centrómero y se separan las <b>cromátidas</b>; en la <b>telofase II</b> quedan <b>cuatro células haploides</b>, cada una con n cromosomas de una cromátida y <b>1c</b> de ADN. Y ojo: las cuatro son distintas entre sí (por el crossing-over, las cromátidas hermanas ya no son idénticas).</p>" +
    w("bio_ciclo") +
    w("orden", "ordenmei") +
    "<h5>Meiosis en la especie humana: espermatogénesis y ovogénesis</h5>" +
    tabla(["", "Espermatogénesis (testículo)", "Ovogénesis (ovario)"], [
      ["<b>Resultado de cada meiosis</b>", "<b>4 espermatozoides</b> funcionales", "<b>1 óvulo</b> + 2 o 3 <b>corpúsculos polares</b> (se degeneran)"],
      ["<b>Reparto del citoplasma</b>", "equitativo (luego se transforman)", "muy desigual: casi todo para el óvulo, para tener reservas"],
      ["<b>Cuándo</b>", "continua desde la pubertad (≈ 70 días por ciclo)", "empieza en el feto; el ovocito I queda detenido en <b>profase I</b> hasta la pubertad; se reanuda en cada ciclo y el ovocito II se detiene en <b>metafase II</b>: solo acaba si lo fecunda un espermatozoide"],
      ["<b>Número</b>", "millones por día", "≈ 400 se ovulan en toda la vida"]
    ], "q3t") +
    "<h5>¿Por qué es tan importante la meiosis?</h5>" +
    "<p><b>1. Mantiene el número de cromosomas.</b> Si los gametos fueran 2n, al fecundarse el cigoto tendría 4n, y así cada generación duplicaría su dotación (n + n = 2n gracias a la meiosis). <b>2. Genera variabilidad genética</b>, la materia prima de la evolución por selección natural, por tres mecanismos:</p>" +
    "<ul><li><b>Crossing-over</b> (profase I): recombina los genes de cada cromosoma; cada cromosoma de un gameto es un «mosaico» de los del abuelo y la abuela.</li>" +
    "<li><b>Segregación independiente</b> (metafase I y anafase I): cada par de homólogos se reparte al azar. Con <i>n</i> pares hay <b>2<sup>n</sup></b> gametos distintos (sin contar el crossing-over): en la especie humana, 2<sup>23</sup> = <b>8 388 608</b>.</li>" +
    "<li><b>Fecundación al azar</b>: cualquier espermatozoide con cualquier óvulo. Dos progenitores humanos pueden tener 2<sup>23</sup> × 2<sup>23</sup> = 2<sup>46</sup> ≈ <b>7 · 10<sup>13</sup></b> hijos distintos (¡70 billones!), sin contar crossing-over. Por eso dos hermanos (que no sean gemelos idénticos) no son iguales.</li></ul>" +
    "<p>Cuando la variabilidad es útil (el ambiente cambia), la reproducción sexual permite adaptarse; la mitosis, en cambio, produce clones, útiles en un ambiente estable. En el <b>ciclo biológico</b>, la meiosis ocurre en distinto momento: <b>gamética</b> (animales: da los gametos, el organismo es diploide), <b>cigótica</b> (hongos y algas: el organismo es haploide) y <b>espórica</b> (plantas: alternan una generación diploide y otra haploide).</p>" +
    "<h5>Cuando la meiosis falla: no disyunción</h5>" +
    "<p>Si en la anafase I (no se separan los homólogos) o en la II (no se separan las cromátidas) dos cromosomas se quedan juntos, se origina un gameto con un cromosoma de más (<b>n + 1</b>) y otro con uno de menos (<b>n − 1</b>). Al fecundarse con un gameto normal salen cigotos con <b>47</b> o <b>45</b> cromosomas (<b>aneuploidías</b>):</p>" +
    tabla(["Síndrome", "Cariotipo", "Qué pasa"], [
      ["<b>Down</b>", "47, trisomía del 21", "un cromosoma 21 de más"],
      ["<b>Turner</b>", "45, X0", "una mujer con un solo cromosoma X"],
      ["<b>Klinefelter</b>", "47, XXY", "un hombre con dos X y un Y"],
      ["<b>Edwards / Patau</b>", "trisomía del 18 / del 13", "trisomías más graves, rara supervivencia"]
    ], "q3t") +
    "<p>La probabilidad de no disyunción aumenta con la edad de la madre, porque sus ovocitos llevan décadas detenidos en profase I. Las <b>poliploidías</b> (3n, 4n…), imposibles en animales, son frecuentes y útiles en plantas (trigo, fresas, bananas sin semillas).</p>" +
    ojo("«Meiosis I y II separan lo mismo»: no. La <b>I separa homólogos</b> (reduce 2n → n) y la <b>II separa cromátidas</b> (como una mitosis). Confundirlo es el error más frecuente en los dibujos de la PAU.")
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Mitosis frente a meiosis", html: env(
    "<p>La comparación es pregunta casi segura. Aprende la tabla y, sobre todo, <b>el porqué</b> de cada diferencia:</p>" +
    tabla(["Rasgo", "Mitosis", "Meiosis"], [
      ["<b>Células que la hacen</b>", "somáticas (y germinales previas)", "germinales (línea que da gametos o esporas)"],
      ["<b>Divisiones y replicaciones del ADN</b>", "1 división tras 1 replicación", "2 divisiones tras <b>1</b> replicación"],
      ["<b>Células resultantes</b>", "2", "4"],
      ["<b>Dotación de las hijas</b>", "2n (igual que la madre)", "n (la mitad)"],
      ["<b>Parecido genético</b>", "idénticas entre sí y con la madre", "distintas entre sí y con la madre"],
      ["<b>Profase</b>", "corta, sin emparejar homólogos", "profase I larga: sinapsis y <b>crossing-over</b>"],
      ["<b>Metafase</b>", "<b>cromosomas</b> individuales en el ecuador", "I: <b>bivalentes</b> (pares de homólogos); II: cromosomas"],
      ["<b>Anafase</b>", "separa <b>cromátidas</b> hermanas", "I: separa <b>homólogos</b>; II: separa cromátidas"],
      ["<b>Función</b>", "crecimiento, reparación, reproducción asexual", "gametos/esporas: mantiene el número de cromosomas y da variabilidad"],
      ["<b>Variabilidad</b>", "ninguna (solo mutaciones)", "crossing-over + segregación al azar (+ fecundación)"]
    ], "q3t") +
    w("clasificar", "mitmei") +
    "<h5>Ciclo celular y fases, resumidos</h5>" +
    w("emparejar", "fases") +
    "<h5>Dibujar e interpretar células: la clave está en tres cosas</h5>" +
    "<p>Si en el examen te dan una célula dibujada y te preguntan qué fase es, mira siempre: <b>(1) ¿hay envoltura nuclear?</b> (sí: interfase o telofase; no: profase tardía a anafase); <b>(2) ¿cromosomas de una o dos cromátidas?</b>; <b>(3) ¿están en parejas de homólogos (bivalentes)?</b> (si es así, <b>meiosis I</b>) <b>¿o solos en el ecuador?</b> (metafase mitótica o metafase II). Y <b>cuenta el número de cromosomas y compáralo con el de la célula madre</b>: si cada polo tiene la mitad y los cromosomas siguen duplicados (dos cromátidas), es anafase I; si cada polo recibe cromosomas de una sola cromátida, es anafase de mitosis o de la meiosis II (en la II los polos tienen n; en la mitosis, 2n).</p>"
  ) });

  nuevas.push({ h: "6. Cálculos con cromosomas, cromátidas y ADN", html: env(
    "<p>Estos problemas son mecánicos si sigues el método. Sea <b>2n = d</b> el número de cromosomas de la célula y el ADN de un gameto, <b>1c</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>cromosomas ≡ centrómeros &nbsp;·&nbsp; cromátidas = cromosomas × (1 ó 2) &nbsp;·&nbsp; moléculas de ADN = cromátidas</div></div>" +
    "<ol><li><b>¿Qué fase es y cuántas células hay?</b> (1 hasta la telofase de la mitosis y de la meiosis I; 2 después; 4 al final de la meiosis II).</li>" +
    "<li><b>¿Está ya replicado el ADN?</b> Antes de S, cada cromosoma tiene <b>1 cromátida</b>; desde S hasta que se parte el centrómero, <b>2</b>.</li>" +
    "<li><b>¿Cuántos cromosomas?</b> Cuenta centrómeros. Cambia en: anafase de mitosis (×2), telofase I (÷2), anafase II (×2 en cada célula).</li>" +
    "<li><b>¿Cuánto ADN?</b> 2c en G1; 4c desde S completa; baja a la mitad cada vez que se parte la célula.</li></ol>" +
    "<h5>Tabla de referencia, <i>por célula</i></h5>" +
    tabla(["Fase", "Células", "Cromosomas", "Cromátidas", "ADN"], [
      ["Mitosis: G1", "1", "2n", "2n", "2c"],
      ["Mitosis: G2, profase, metafase", "1", "2n", "4n", "4c"],
      ["Mitosis: anafase", "1", "<b>4n</b> (2n por polo)", "4n", "4c"],
      ["Mitosis: telofase (fin)", "2", "2n", "2n", "2c"],
      ["Meiosis: profase I a anafase I", "1", "2n", "4n", "4c"],
      ["Meiosis: telofase I, profase II, metafase II", "2", "<b>n</b>", "2n", "2c"],
      ["Meiosis: anafase II", "2", "2n (n por polo)", "2n", "2c"],
      ["Meiosis: telofase II (gametos)", "4", "n", "n", "1c"]
    ], "q3t") +
    "<p>(Aquí «2n» y «4n» son el número de cromosomas y de cromátidas en función de n; con 2n = 46, 4n = 92.) Pruébalo tú con el simulador:</p>" +
    w("bio_ciclo") +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Ejemplo 1. Una célula humana por fases", "Una célula somática humana (2n = 46) entra en mitosis. ¿Cuántos cromosomas, cromátidas y qué cantidad de ADN (en c) tiene en G1, en la metafase y en la anafase?", [
      "<b>G1:</b> 46 cromosomas de 1 cromátida → <b>46 cromosomas, 46 cromátidas, 2c</b>.",
      "<b>Fase S:</b> se replica el ADN: 46 cromosomas, ahora de 2 cromátidas.",
      "<b>Metafase:</b> <b>46 cromosomas, 92 cromátidas, 4c</b>.",
      "<b>Anafase:</b> se separan las cromátidas: <b>92 cromosomas</b>, 92 cromátidas, 4c (46 hacia cada polo).",
      "<b>Telofase:</b> 2 células de 46 cromosomas, 46 cromátidas y 2c cada una."
    ]) +
    ejemplo("Ejemplo 2. Meiosis en el guisante", "Un guisante tiene 2n = 14. Calcula, por célula, los cromosomas y las cromátidas en la profase I, en la metafase II y en el gameto final, y cuántos gametos distintos puede producir (sin crossing-over).", [
      "<b>Profase I:</b> 14 cromosomas de 2 cromátidas → <b>14 cromosomas, 28 cromátidas</b> (7 bivalentes).",
      "<b>Metafase II</b> (cada una de las 2 células): <b>7 cromosomas, 14 cromátidas</b>.",
      "<b>Gameto:</b> <b>7 cromosomas, 7 cromátidas</b>, 1c.",
      "<b>Gametos distintos:</b> 2<sup>7</sup> = <b>128</b> combinaciones de cromosomas maternos y paternos."
    ]) +
    ejemplo("Ejemplo 3. ¿Cuánto dura cada fase?", "En un cultivo asíncrono (las células están repartidas en todas las fases) con un ciclo de 24 h, el 40 % de las células está en G1, el 30 % en S, el 20 % en G2 y el 10 % en M. ¿Cuánto dura cada fase?", [
      "En una población en equilibrio, <b>el porcentaje de células en cada fase es proporcional a su duración</b>.",
      "G1: 0,40 · 24 = <b>9,6 h</b>; S: 0,30 · 24 = <b>7,2 h</b>; G2: 0,20 · 24 = <b>4,8 h</b>; M: 0,10 · 24 = <b>2,4 h</b>.",
      "Comprobación: 9,6 + 7,2 + 4,8 + 2,4 = 24 h."
    ]) +
    ejemplo("Ejemplo 4. Cuántas células y cuántos gametos", "Una célula se divide por mitosis cada 12 h. ¿Cuántas células hay a los 3 días? Y 100 espermatocitos primarios y 100 ovocitos primarios, ¿cuántos gametos producen?", [
      "3 días = 72 h = 6 ciclos → 2<sup>6</sup> = <b>64 células</b> (una célula madre se duplica cada ciclo).",
      "100 espermatocitos × 4 = <b>400 espermatozoides</b>.",
      "100 ovocitos × 1 = <b>100 óvulos</b> (y 200–300 corpúsculos polares, que no son gametos funcionales)."
    ]) +
    "<h5>Variabilidad por segregación independiente y fecundación</h5>" +
    "<div class='formula-wrap'><div class='formula'>gametos distintos = 2<sup>n</sup> (n = nº de pares de homólogos, sin crossing-over) &nbsp;·&nbsp; cigotos distintos = 2<sup>n</sup> × 2<sup>n</sup> = 4<sup>n</sup></div></div>" +
    "<p>Con n = 23: 2<sup>23</sup> = 8 388 608 gametos y 4<sup>23</sup> = 70 368 744 177 664 ≈ 7,0 · 10<sup>13</sup> cigotos. Con crossing-over son prácticamente infinitos.</p>"
  ) });

  nuevas.push({ h: "7. Ejemplo PAU resuelto: interpretar una gráfica y un esquema", html: env(
    "<p>Pregunta tipo de Madrid: «La gráfica muestra la cantidad de ADN por célula de una línea celular a lo largo del tiempo. (a) Identifica cada tramo. (b) ¿Es mitosis o meiosis? Razona. (c) Si 2n = 12, ¿cuántos cromosomas y cromátidas hay en el punto de máxima cantidad de ADN?»</p>" +
    "<p><i>Descripción de la gráfica:</i> el ADN vale 2 unidades, sube linealmente hasta 4, se mantiene en 4 y cae bruscamente a 2. Después la curva termina.</p>" +
    ejemplo("Respuesta modelo (2 puntos)", "", [
      "<b>(a)</b> El tramo de 2c es <b>G1</b> (ADN sin duplicar). La subida es la <b>fase S</b> (replicación). La meseta de 4c abarca <b>G2 y casi toda la mitosis</b> (hasta la anafase incluida). La caída a 2c corresponde a la <b>telofase y citocinesis</b>, cuando la célula se parte en dos y cada hija recibe la mitad del ADN.",
      "<b>(b)</b> Es <b>mitosis</b>: hay <b>una sola subida y una sola caída</b>, de 4c a 2c, y la célula termina con la misma cantidad de ADN con que empezó (2c). En una meiosis habría una segunda caída hasta 1c.",
      "<b>(c)</b> En la meseta de 4c (por ejemplo, en la metafase) cada cromosoma tiene 2 cromátidas: <b>12 cromosomas y 24 cromátidas</b> (4c = 24 moléculas de ADN, una por cromátida). En la anafase habría 24 cromosomas de una cromátida.",
      "<b>Detalle que da puntos:</b> la cantidad de ADN <b>no cambia</b> en la anafase (se reparte, pero aún no se ha partido la célula)."
    ]) +
    "<p><b>Segunda pregunta clásica con esquema.</b> «Se muestra una célula con 2n = 4 en la que se ven dos grupos de 2 cromosomas, cada uno con una sola cromátida, a polos opuestos; la envoltura no existe. (a) ¿Qué fase es? (b) ¿Mitosis o meiosis?». Respuesta: cada polo recibe <b>2 cromosomas de una cromátida</b>. Si la célula madre tenía 4 y cada polo tiene 2, <b>no puede ser una anafase mitótica</b> (en la anafase de una mitosis habría 4 por polo). Por tanto es la <b>anafase II</b> de la meiosis: se separan cromátidas, cada polo recibe n = 2. (Si cada polo tuviera 4 cromosomas de una cromátida, sería una anafase mitótica.)</p>"
  ) });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar con las fases o la estructura → ejemplo o consecuencia</b>. Preguntas típicas con respuesta modelo:</p>" +
    ejemplo("Pregunta 1. Estructura del núcleo interfásico", "Respuesta modelo:", [
      "<b>Envoltura nuclear:</b> dos membranas con espacio perinuclear, continua con el RER, con <b>poros nucleares</b> que regulan el paso de ARN, ribosomas y proteínas.",
      "<b>Nucleoplasma:</b> medio interno con enzimas y nucleótidos. <b>Nucléolo:</b> sin membrana; sintetiza ARNr y ensambla subunidades ribosómicas.",
      "<b>Cromatina:</b> ADN + histonas, en forma de eucromatina (activa) y heterocromatina (compacta, inactiva); al dividirse se condensa en cromosomas."
    ]) +
    ejemplo("Pregunta 2. El ciclo celular y su control", "Respuesta modelo:", [
      "<b>Interfase</b> (G1, S, G2) y <b>fase M</b>. En G1 la célula crece; en S se replica el ADN (2c → 4c); en G2 se prepara; en M se divide.",
      "<b>Control:</b> puntos de control G1/S, G2/M y del huso; lo gobiernan <b>ciclinas y CDK</b>.",
      "<b>Fallos:</b> si se pierde el control (oncogenes, p53 inactivo) las células se dividen sin freno: <b>cáncer</b>."
    ]) +
    ejemplo("Pregunta 3. Fases de la mitosis y citocinesis", "Respuesta modelo:", [
      "<b>Profase:</b> condensación, huso. <b>Metafase:</b> cromosomas en la placa ecuatorial. <b>Anafase:</b> separación de cromátidas hermanas. <b>Telofase:</b> núcleos nuevos.",
      "<b>Citocinesis animal:</b> anillo contráctil de actina y miosina (estrangulamiento). <b>Vegetal:</b> fragmoplasto y placa celular (de dentro a fuera).",
      "<b>Resultado:</b> dos células idénticas con 2n cromosomas."
    ]) +
    ejemplo("Pregunta 4. Meiosis y variabilidad", "Respuesta modelo:", [
      "<b>Una replicación, dos divisiones:</b> meiosis I (homólogos) y II (cromátidas); de 2n a n y 4 células.",
      "<b>Profase I:</b> sinapsis y crossing-over en los bivalentes; se ven los quiasmas.",
      "<b>Variabilidad:</b> crossing-over, segregación independiente de homólogos (2<sup>n</sup> gametos) y fecundación al azar.",
      "<b>Importancia:</b> mantiene el número de cromosomas de la especie y es la base de la evolución."
    ]) +
    "<p>Los ejercicios del final del tema incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio7a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
