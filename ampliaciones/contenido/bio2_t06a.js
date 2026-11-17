/* ============================================================
   Biología II · ampliaciones · Tema 6: La célula (teoría celular, membrana, transporte y orgánulos)
   (parte A: teoría. Parte B, bio2_t06b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t6.js (bio_celula, bio_transporte, bio_secrecion); se reutiliza bio_osmosis (T1).
   Estilo copiado del tema 1 de Biología II.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Procariota frente a eucariota, y animal frente a vegetal (tablas y esquema que hay que saber rotular) → secciones 1 y 6 + widget bio_celula + clasificar.
   2. Modelo del mosaico fluido: componentes, asimetría, fluidez y experimento de Frye–Edidin → sección 2 + ejemplo resuelto.
   3. Tipos de transporte: pasivo/activo, difusión simple/facilitada, bomba Na⁺/K⁺ y transporte en masa → sección 3 + widget bio_transporte.
   4. Ósmosis en células animales y vegetales → sección 3 (se reutiliza el widget del tema 1).
   5. Ruta de una proteína de secreción: RER → Golgi → exocitosis (Palade) → sección 7 + widget bio_secrecion.
   6. Funciones de cada orgánulo y número de membranas (sin membrana / simple / doble) → secciones 4 y 5 + clasificar.
   7. Mitocondria y cloroplasto: estructura comparada y teoría endosimbiótica con sus pruebas → secciones 5 y 8.
   8. Citoesqueleto (tres filamentos), cilios, flagelos y centriolos (9 + 2 y 9 × 3) → sección 5.
   9. Cálculos: aumentos y tamaño real de una micrografía, relación superficie/volumen → secciones 1 y 9.
   10. Interpretar gráficas de velocidad de transporte y experimentos (cianuro, Frye–Edidin, pulso y caza) → sección 9.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t6/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. La teoría celular
  secciones[0] = env(
    "<h5>Cómo se llegó a la teoría celular</h5>" +
    "<p>La teoría celular no la «descubrió» una sola persona: se fue armando a medida que mejoraban los microscopios. Estas fechas se preguntan y conviene tenerlas ordenadas:</p>" +
    tabla(["Año", "Quién", "Qué aportó"], [
      ["1665", "<b>Robert Hooke</b>", "Observa corcho al microscopio y llama «células» (celdillas) a sus huecos: eran paredes de células muertas."],
      ["1674–1683", "<b>Antonie van Leeuwenhoek</b>", "Describe por primera vez protozoos y bacterias: los primeros seres unicelulares vistos."],
      ["1831", "<b>Robert Brown</b>", "Describe el núcleo en células vegetales."],
      ["1838", "<b>Matthias Schleiden</b>", "Todas las plantas están formadas por células."],
      ["1839", "<b>Theodor Schwann</b>", "Lo extiende a los animales: la célula es la unidad de todos los seres vivos."],
      ["1855", "<b>Rudolf Virchow</b>", "«<i>Omnis cellula e cellula</i>»: toda célula procede de otra célula."],
      ["1888–1906", "<b>Santiago Ramón y Cajal</b>", "Doctrina neuronal: el tejido nervioso también está formado por células (neuronas) independientes. Nobel en 1906, compartido con Camillo Golgi."]
    ], "q3t") +
    "<p>De esas ideas salen los <b>postulados de la teoría celular</b> (tal como se piden en la PAU): (1) la célula es la <b>unidad estructural</b> de todo ser vivo; (2) es la <b>unidad funcional</b>: en ella se realizan las funciones vitales (nutrición, relación y reproducción); (3) toda célula procede de otra célula, y (4) la célula contiene el <b>material hereditario</b>, que pasa a las células hijas. El cuarto postulado se añadió después, con la genética.</p>" +
    "<h5>Cómo se ve una célula: aumentos y poder de resolución</h5>" +
    "<p>Un microscopio se describe con dos números distintos. Los <b>aumentos</b> dicen cuántas veces se agranda la imagen; el <b>poder de resolución</b> dice cuál es la distancia mínima a la que dos puntos se ven separados. Sin resolución, más aumentos solo dan una imagen más grande y más borrosa.</p>" +
    tabla(["", "Ojo humano", "Microscopio óptico", "Microscopio electrónico"], [
      ["Resolución aproximada", "≈ 0,1 mm", "≈ 0,2 µm", "≈ 0,2 nm"],
      ["Usa", "luz", "luz y lentes de vidrio", "haz de electrones e imanes"],
      ["Muestra viva", "sí", "sí (con colorantes vitales)", "no (vacío y fijación)"],
      ["Ve", "tejidos, huevos", "células, núcleo, cloroplastos", "membranas, ribosomas, virus"]
    ], "q3t") +
    ejemplo("Calcular aumentos y tamaño real", "En una micrografía una célula de 15 µm mide 3 cm en el papel. (a) ¿A cuántos aumentos está hecha? (b) Con esos mismos aumentos, un orgánulo mide 4 mm en la foto: ¿qué tamaño real tiene?", [
      "<b>Fórmula:</b> aumentos = tamaño de la imagen / tamaño real. Hay que usar la <b>misma unidad</b> en los dos.",
      "<b>(a)</b> 3 cm = 30 000 µm. Aumentos = 30 000 / 15 = <b>2000</b> (×2000).",
      "<b>(b)</b> 4 mm = 4000 µm. Tamaño real = 4000 / 2000 = <b>2 µm</b> (el tamaño de una mitocondria típica)."
    ]) +
    ojo("1 cm = 10 000 µm; 1 mm = 1000 µm; 1 µm = 1000 nm. Casi todos los fallos de este cálculo son de unidades.") +
    "<h5>Por qué las células son pequeñas: la relación superficie/volumen</h5>" +
    "<p>Los intercambios (nutrientes, O<sub>2</sub>, desechos) ocurren a través de la <b>superficie</b>, pero las necesidades dependen del <b>volumen</b>. Si una célula crece, su volumen aumenta más deprisa que su superficie, y llega un momento en que no puede alimentarse a sí misma. Un cubo de lado L tiene superficie 6L² y volumen L³, así que S/V = 6/L:</p>" +
    tabla(["Lado L", "Superficie", "Volumen", "S/V"], [
      ["1 µm", "6 µm²", "1 µm³", "<b>6</b> µm⁻¹"],
      ["10 µm", "600 µm²", "1000 µm³", "<b>0,6</b> µm⁻¹"],
      ["100 µm", "60 000 µm²", "1 000 000 µm³", "<b>0,06</b> µm⁻¹"]
    ], "q3t") +
    "<p>Multiplicar el lado por 10 hace que la relación baje 10 veces. Por eso las células son microscópicas y por eso las que deben intercambiar mucho tienen <b>superficies plegadas</b> (vellosidades del intestino, crestas de la mitocondria, retículo).</p>" +
    "<h5>Niveles de organización</h5>" +
    "<p>Un ser vivo puede ser <b>unicelular</b> (bacterias, levaduras, <i>Paramecium</i>), formar una <b>colonia</b> de células parecidas (<i>Volvox</i>) o ser <b>pluricelular</b>, con células especializadas que forman tejidos, órganos y aparatos. En un organismo pluricelular todas las células proceden de un cigoto, tienen los mismos genes y se diferencian porque <b>expresan genes distintos</b>.</p>" +
    "<h5>Dos tipos de organización celular</h5>" +
    "<p>Hay dos modelos de célula, que se distinguen sobre todo por el <b>ADN</b>: en la <b>procariota</b> (bacterias y arqueas) está libre en el citoplasma, en el nucleoide; en la <b>eucariota</b> (protistas, hongos, plantas y animales) está dentro de un núcleo con envoltura. La comparación completa está en la sección 6, junto con un esquema interactivo.</p>");

  // ---------------------------------------------------------------- 2. La membrana plasmática
  secciones[1] = env(
    "<h5>De dónde sale el modelo: tres experimentos y una idea</h5>" +
    "<ul>" +
    "<li><b>Gorter y Grendel (1925)</b> extrajeron los lípidos de los glóbulos rojos y los extendieron en una capa de una molécula de grosor: el área era <b>el doble</b> que la superficie de las células. Conclusión: la membrana tiene <b>dos capas</b> de lípidos (bicapa).</li>" +
    "<li><b>Danielli y Davson (1935)</b> propusieron un «sándwich»: bicapa lipídica recubierta por dos capas continuas de proteínas. No explicaba que las proteínas fueran tan variadas ni que algunas atravesaran la membrana.</li>" +
    "<li><b>Robertson (1959–60)</b> vio con el microscopio electrónico que toda membrana celular tiene el aspecto de «<b>tres capas</b>» (dos líneas oscuras y una clara, de 7–10 nm): la <b>unidad de membrana</b>.</li>" +
    "<li><b>Singer y Nicolson (1972)</b> propusieron el <b>modelo del mosaico fluido</b>, que es el actual: las proteínas no forman capas continuas, sino que están <b>incrustadas o adosadas</b> a una bicapa fluida y se pueden mover.</li></ul>" +
    "<h5>Componentes de la membrana</h5>" +
    tabla(["Componente", "Cómo es", "Qué hace"], [
      ["<b>Fosfolípidos</b>", "anfipáticos: cabeza polar (fosfato) hacia el agua; dos colas apolares hacia dentro", "forman la bicapa y la barrera para lo polar y lo iónico"],
      ["<b>Colesterol</b> (solo animal)", "lípido rígido intercalado entre las colas", "da estabilidad y evita que sea demasiado rígida o demasiado fluida"],
      ["<b>Proteínas integrales</b> (transmembrana)", "atraviesan la bicapa; tienen zonas apolares", "canales, transportadores, bombas, receptores, enzimas"],
      ["<b>Proteínas periféricas</b>", "unidas a la superficie, sin entrar en la bicapa", "enlazan con el citoesqueleto, enzimas, señalización"],
      ["<b>Glucolípidos y glucoproteínas</b>", "llevan cadenas de azúcares y están solo en la cara externa", "forman el <b>glucocálix</b>: reconocimiento celular, grupos sanguíneos, defensa"]
    ], "q3t") +
    "<h5>Tres ideas clave del modelo</h5>" +
    "<p><b>Fluidez.</b> Los lípidos y muchas proteínas se desplazan <b>lateralmente</b> en su propia capa con mucha facilidad; saltar de una capa a otra («flip-flop») es raro. La fluidez aumenta con la temperatura y con los ácidos grasos <b>insaturados</b> (sus codos impiden que las colas se compacten), y el colesterol la modera. Una bacteria o una planta que crece en frío fabrica más lípidos insaturados para no «congelar» su membrana.</p>" +
    "<p><b>Asimetría.</b> Las dos caras no son iguales: los azúcares están solo fuera, y cada capa tiene lípidos y proteínas distintos. Cuando una vesícula se fusiona con la membrana, su interior pasa a ser exterior (sección 7).</p>" +
    "<p><b>Mosaico.</b> Las proteínas son tan importantes como los lípidos: en una membrana de neurona la mitad de la masa puede ser proteína, y en la de la mitocondria más del 70 %.</p>" +
    "<h5>Funciones de la membrana plasmática</h5>" +
    "<ul><li><b>Barrera selectiva</b> (permeabilidad selectiva): controla lo que entra y sale.</li><li><b>Comunicación:</b> receptores para hormonas y neurotransmisores.</li><li><b>Reconocimiento</b> (glucocálix) y adhesión a otras células.</li><li><b>Compartimentación</b> y localización de enzimas (en la mitocondria, la cadena respiratoria).</li><li>Mantener un <b>gradiente</b> de concentración y eléctrico (potencial de membrana).</li></ul>" +
    "<p>Otra característica clave: las membranas se <b>forman a partir de otras membranas</b> (por vesículas), no desde cero. Es otra manifestación de que «toda célula procede de otra célula».</p>" +
    ojo("Mosaico fluido no quiere decir que las proteínas floten libremente por todas partes: algunas están ancladas al citoesqueleto o a la matriz y se mueven poco. Y los fosfolípidos no son la «puerta» de las moléculas polares: precisamente las frenan."));

  // ---------------------------------------------------------------- 3. Transporte
  secciones[2] = env(
    "<h5>Por qué hay que transportar: el gradiente</h5>" +
    "<p>Si hay más soluto en un lado que en otro, existe un <b>gradiente de concentración</b>. En una membrana cargada hay además un gradiente <b>eléctrico</b>; los dos juntos forman el <b>gradiente electroquímico</b>. Lo que cruce <b>a favor</b> de ese gradiente no cuesta energía; lo que cruce <b>en contra</b> exige gastarla.</p>" +
    "<p>La bicapa deja pasar con facilidad <b>moléculas pequeñas y apolares</b> (O<sub>2</sub>, CO<sub>2</sub>, N<sub>2</sub>, lípidos y hormonas esteroideas), con dificultad las <b>polares sin carga</b> (urea, glicerina, y el agua, que sí atraviesa por su pequeño tamaño y por acuaporinas) y casi nada los <b>iones</b> y las moléculas grandes (glucosa, aminoácidos).</p>" +
    "<h5>Clasificación completa del transporte</h5>" +
    tabla(["Tipo", "¿A favor del gradiente?", "¿Proteína?", "¿ATP?", "Ejemplos"], [
      ["<b>Difusión simple</b>", "sí", "no", "no", "O<sub>2</sub>, CO<sub>2</sub>, esteroides"],
      ["<b>Difusión facilitada</b>", "sí", "sí: canal o permeasa", "no", "glucosa (GLUT), iones por canales, agua por acuaporinas"],
      ["<b>Transporte activo</b>", "<b>no</b> (en contra)", "sí: bomba o transportador", "<b>sí</b>", "bomba Na<sup>+</sup>/K<sup>+</sup>, bomba de protones"],
      ["<b>Transporte en masa</b>", "—", "vesículas", "sí", "fagocitosis, pinocitosis, exocitosis"]
    ], "q3t") +
    "<p>Las dos primeras filas forman el <b>transporte pasivo</b>; las dos últimas, el activo en sentido amplio. Y dentro del pasivo, la <b>ósmosis</b> es el caso especial del agua. Aquí está la comparación en movimiento:</p>" +
    w("bio_transporte") +
    "<h5>Cómo se distingue una difusión simple de una facilitada</h5>" +
    "<p>Si dibujas la velocidad de entrada frente a la concentración exterior, la <b>difusión simple</b> da una <b>recta</b>: cuanto mayor es el gradiente, más rápido, sin tope. La <b>facilitada</b> (y el transporte activo) da una curva que <b>se satura</b>: hay un número limitado de proteínas y, cuando todas están ocupadas, la velocidad llega a un máximo (V<sub>max</sub>). Es el mismo razonamiento que ya viste en la cinética enzimática del Tema 4. Y para distinguir la facilitada de la activa se quita la energía (cianuro, falta de O<sub>2</sub>): la facilitada sigue igual, la activa se para.</p>" +
    "<h5>La bomba de sodio y potasio</h5>" +
    "<p>Es la proteína de membrana más famosa de la PAU. Una ATPasa que, por <b>cada ATP</b> que hidroliza, <b>saca 3 Na<sup>+</sup></b> y <b>mete 2 K<sup>+</sup></b>, los dos <b>en contra</b> de su gradiente. Consecuencias: dentro hay mucho K<sup>+</sup> y poco Na<sup>+</sup>; el interior queda <b>negativo</b> (sale una carga positiva neta por ciclo); y el gradiente de Na<sup>+</sup> se aprovecha como energía para meter glucosa y aminoácidos (<b>transporte activo secundario</b>: el Na<sup>+</sup> entra a favor de su gradiente y arrastra a la glucosa en contra del suyo). Una parte muy grande del gasto de energía de una neurona se va en esta bomba.</p>" +
    "<h5>Transporte en masa: endocitosis y exocitosis</h5>" +
    "<ul><li><b>Fagocitosis</b>: la célula (macrófago, ameba) engloba <b>partículas grandes</b> con seudópodos y forma un fagosoma, que se une a un lisosoma.</li>" +
    "<li><b>Pinocitosis</b>: ingiere <b>líquido y moléculas disueltas</b> en pequeñas vesículas.</li>" +
    "<li><b>Endocitosis mediada por receptor</b>: la carga (p. ej. colesterol en forma de LDL) se une antes a receptores de la membrana, y solo entonces se forma la vesícula.</li>" +
    "<li><b>Exocitosis</b>: una vesícula del Golgi se funde con la membrana y vierte su contenido fuera (insulina, neurotransmisores, enzimas digestivas). Aporta además membrana nueva a la célula.</li></ul>" +
    "<h5>Ósmosis y células (recordatorio del Tema 1)</h5>" +
    "<p>El agua cruza la membrana por ósmosis hacia el medio con más soluto. Un hematíe en medio <b>hipotónico</b> estalla (hemólisis) y en <b>hipertónico</b> se arruga (crenación); una célula vegetal en hipotónico se pone <b>turgente</b> (la pared la protege) y en hipertónico sufre <b>plasmólisis</b>. Pruébalo de nuevo aquí:</p>" +
    w("bio_osmosis") +
    ojo("Pasivo ≠ «sin proteínas»: la difusión facilitada es pasiva y usa proteínas. Y activo ≠ «con proteínas»: lo que lo define es ir <b>en contra del gradiente gastando energía</b>."));

  // ---------------------------------------------------------------- 4. Endomembranas
  secciones[3] = env(
    "<h5>Qué es el sistema de endomembranas</h5>" +
    "<p>Las células eucariotas están divididas en <b>compartimentos</b> rodeados de membrana, de modo que cada reacción química ocurre en un ambiente propio (pH, enzimas). El <b>sistema de endomembranas</b> agrupa los compartimentos que están conectados, directamente o por vesículas: <b>envoltura nuclear, retículo endoplasmático, aparato de Golgi, lisosomas y vacuolas</b> (y la membrana plasmática, con la que se funden las vesículas). Mitocondrias y cloroplastos <b>no</b> forman parte de él.</p>" +
    w("clasificar", "membranas") +
    "<h5>Núcleo</h5>" +
    "<p>Está limitado por una <b>envoltura nuclear</b> de dos membranas, con <b>poros</b> que permiten el paso de ARN hacia el citoplasma y de proteínas hacia dentro. La membrana externa es continua con el retículo rugoso. Dentro están la <b>cromatina</b> (ADN con proteínas, que se condensa en cromosomas al dividirse) y el <b>nucleolo</b>, donde se forma el ARN ribosómico y se montan las subunidades de los ribosomas.</p>" +
    "<h5>Retículo endoplasmático</h5>" +
    "<ul><li><b>RER</b> (rugoso): sacos aplanados con ribosomas. Abunda en células que secretan mucha proteína (células del páncreas que fabrican insulina, plasmocitos que fabrican anticuerpos). Las proteínas entran en la luz del retículo mientras se sintetizan, se pliegan y se <b>glicosilan</b>.</li>" +
    "<li><b>REL</b> (liso): red de tubos sin ribosomas. Sintetiza <b>lípidos</b> (fosfolípidos, esteroides), <b>detoxifica</b> fármacos y alcohol (hepatocitos) y <b>almacena Ca<sup>2+</sup></b> (retículo sarcoplásmico del músculo).</li></ul>" +
    "<h5>Aparato de Golgi</h5>" +
    "<p>Es una pila de sacos aplanados (dictiosoma), con una cara <b>cis</b> (de entrada, orientada al retículo) y una cara <b>trans</b> (de salida). Recibe las vesículas del retículo, <b>modifica</b> las proteínas (añade o cambia azúcares), las <b>clasifica</b> y las <b>empaqueta</b> en vesículas con destino a la membrana, al exterior o a los lisosomas. En las células vegetales, además, fabrica polisacáridos de la pared (hemicelulosa, pectina). Lo describió <b>Camillo Golgi en 1898</b>.</p>" +
    "<h5>Lisosomas, vacuolas y peroxisomas</h5>" +
    "<ul><li><b>Lisosomas</b>: vesículas con unas 50 enzimas <b>hidrolasas ácidas</b> que funcionan a pH ≈ 5 (el citosol tiene ≈ 7,2). Esa diferencia protege a la célula: si un lisosoma se rompe, sus enzimas apenas actúan en el citosol. <b>Heterofagia</b>: digieren lo que entra por endocitosis. <b>Autofagia</b>: digieren orgánulos viejos. En las <b>enfermedades de depósito</b> (p. ej. Tay-Sachs) falta una hidrolasa y se acumula material sin digerir.</li>" +
    "<li><b>Vacuolas</b>: vesículas de almacenamiento. En la célula vegetal hay una <b>vacuola central</b> enorme, rodeada del tonoplasto, que guarda agua, iones y pigmentos y mantiene la turgencia. En la animal son pequeñas (digestivas, contráctiles en protozoos).</li>" +
    "<li><b>Peroxisomas</b>: vesículas con oxidasas y <b>catalasa</b>, que descompone el agua oxigenada tóxica que producen: 2 H<sub>2</sub>O<sub>2</sub> → 2 H<sub>2</sub>O + O<sub>2</sub>. Degradan ácidos grasos y desintoxican (hígado y riñón).</li></ul>" +
    "<h5>Ribosomas</h5>" +
    "<p>No tienen membrana, así que no son endomembranas: son complejos de <b>ARN ribosómico y proteínas</b> con dos subunidades que se juntan para traducir el ARNm. Los de eucariotas son <b>80S</b> (subunidades 60S y 40S) y los de procariotas, mitocondrias y cloroplastos, <b>70S</b> (50S y 30S). La «S» (Svedberg) mide la velocidad de sedimentación, no el tamaño, por eso <b>60 + 40 no suman 80</b>. Los <b>libres</b> fabrican proteínas para el citosol; los del <b>RER</b>, las de secreción, membrana y lisosomas.</p>" +
    ojo("Los lisosomas no se «inventan» en el Golgi: sus enzimas se sintetizan en el RER, se marcan en el Golgi y salen empaquetadas en vesículas de su cara trans."));

  // ---------------------------------------------------------------- 5. Mitocondrias y otros
  secciones[4] = env(
    "<h5>La mitocondria</h5>" +
    "<p>Es el orgánulo de la <b>respiración celular</b>. Tiene <b>doble membrana</b>: la externa, lisa y permeable; la <b>interna</b>, muy plegada en <b>crestas</b> (más superficie para la cadena respiratoria y la ATP sintasa). Entre ellas, el <b>espacio intermembrana</b>; dentro, la <b>matriz</b>, con enzimas del ciclo de Krebs, <b>ADN circular</b> y <b>ribosomas 70S</b>. Mide ≈ 1–2 µm de ancho y 2–5 de largo, y abunda en las células que gastan mucha energía (músculo, hígado). En el ser humano su ADN tiene 16 569 pares de bases y 37 genes (13 de proteínas, 22 de ARNt y 2 de ARNr); casi todas sus proteínas, sin embargo, las codifica el ADN del núcleo. Verás la química de la respiración en el Tema 8.</p>" +
    "<h5>El cloroplasto</h5>" +
    "<p>Es el orgánulo de la <b>fotosíntesis</b>, exclusivo de algas y plantas. También tiene <b>doble membrana</b>, pero dentro hay un tercer sistema: sacos aplanados, los <b>tilacoides</b>, apilados en <b>grana</b>, con la <b>clorofila</b> y la cadena de transporte de electrones. El líquido que los rodea es el <b>estroma</b>, con enzimas del ciclo de Calvin, ADN circular y ribosomas 70S. Pertenece a la familia de los <b>plastos</b> (cromoplastos con pigmentos, amiloplastos que guardan almidón).</p>" +
    tabla(["", "Mitocondria", "Cloroplasto"], [
      ["Membranas", "dos; la interna forma crestas", "dos; dentro, tilacoides (tercera membrana)"],
      ["Compartimentos", "espacio intermembrana y matriz", "espacio intermembrana, estroma y luz del tilacoide"],
      ["Proceso", "respiración: oxida materia orgánica y produce ATP", "fotosíntesis: usa luz y fabrica materia orgánica"],
      ["Está en", "casi todos los eucariotas", "algas y plantas"],
      ["ADN y ribosomas", "ADN circular; ribosomas 70S", "ADN circular; ribosomas 70S"]
    ], "q3t") +
    "<h5>Citoesqueleto</h5>" +
    "<p>Es una red de <b>filamentos proteicos</b> en el citoplasma que da forma a la célula, ancla los orgánulos, permite que se muevan las vesículas y es la base del movimiento celular y de la división. Tiene tres tipos:</p>" +
    tabla(["Filamento", "Proteína", "Diámetro", "Funciones"], [
      ["<b>Microfilamentos</b>", "actina", "≈ 7 nm", "forma, seudópodos, contracción muscular (con miosina), citocinesis"],
      ["<b>Filamentos intermedios</b>", "queratina, lamininas, otras", "8–12 nm", "resistencia mecánica, anclaje del núcleo"],
      ["<b>Microtúbulos</b>", "tubulina α y β", "25 nm (huecos)", "vías de transporte, huso mitótico, cilios, flagelos y centriolos"]
    ], "q3t") +
    "<p><b>Centriolos y centrosoma.</b> Los dos centriolos del centrosoma (perpendiculares) están formados por <b>9 tripletes</b> de microtúbulos (9 × 3 = 27 microtúbulos cada uno). Organizan el huso de la división. <b>Cilios y flagelos</b> son prolongaciones móviles con un esqueleto de <b>9 dobletes periféricos + 2 microtúbulos centrales</b> («9 + 2»: 20 microtúbulos en total), que se deslizan gracias a la dineína; nacen de un <b>corpúsculo basal</b> con estructura de centriolo (9 × 3). Los cilios son cortos y numerosos (epitelio de la tráquea); el flagelo, largo y único (espermatozoide). Ojo: el flagelo de una bacteria es otra cosa, un filamento de flagelina sin microtúbulos.</p>" +
    "<h5>Pared celular y matriz extracelular</h5>" +
    "<p>La <b>pared vegetal</b> es una cubierta externa rígida de <b>celulosa</b> (microfibrillas en una matriz de hemicelulosa, pectinas y proteínas). Da forma, evita que la célula estalle en medios hipotónicos y está atravesada por conexiones citoplásmicas, los <b>plasmodesmos</b>. Las <b>bacterias</b> tienen pared de <b>peptidoglucano</b> (mureína), y los <b>hongos</b>, de <b>quitina</b>. Las células animales carecen de pared, pero se rodean de una <b>matriz extracelular</b> (colágeno, proteoglucanos) y se unen entre sí con <b>uniones</b> estrechas, desmosomas y comunicantes (en hendidura).</p>");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Comparar células: procariota, animal y vegetal", html: env(
    "<p>Esta es la comparación más preguntada del tema. Primero, las dos grandes categorías:</p>" +
    tabla(["", "Procariota", "Eucariota"], [
      ["ADN", "una molécula <b>circular</b>, en el <b>nucleoide</b> (sin envoltura); plásmidos", "varias moléculas <b>lineales</b> con histonas, en el <b>núcleo</b>"],
      ["Tamaño", "1–10 µm", "10–100 µm"],
      ["Orgánulos con membrana", "<b>ninguno</b>", "muchos: núcleo, mitocondrias, retículo, Golgi…"],
      ["Ribosomas", "70S", "80S (más 70S en mitocondrias y cloroplastos)"],
      ["Pared", "peptidoglucano (bacterias)", "celulosa (plantas), quitina (hongos) o ninguna (animales)"],
      ["Citoesqueleto", "muy simple", "complejo"],
      ["División", "fisión binaria", "mitosis o meiosis"],
      ["Respiración / fotosíntesis", "en la membrana plasmática y sus pliegues", "en mitocondrias y cloroplastos"],
      ["Ejemplos", "<i>Escherichia coli</i>, cianobacterias, arqueas", "levadura, amiba, encina, persona"]
    ], "q3t") +
    "<p>Y dentro de las eucariotas, la <b>célula animal frente a la vegetal</b>:</p>" +
    tabla(["", "Animal", "Vegetal"], [
      ["Pared celular", "no", "sí (celulosa)"],
      ["Cloroplastos", "no: es heterótrofa", "sí: es autótrofa"],
      ["Vacuola", "pequeñas y varias", "una <b>central</b> grande (tonoplasto)"],
      ["Centriolos", "sí", "no en plantas con flor"],
      ["Lisosomas", "sí, abundantes", "la vacuola hace parte de su trabajo"],
      ["Forma", "variable, redondeada", "poligonal, fija por la pared"],
      ["Reserva", "glucógeno", "almidón"],
      ["Citocinesis", "estrangulamiento", "tabique (fragmoplasto)"]
    ], "q3t") +
    "<p>Con el siguiente esquema practica lo que se pide en el examen: reconocer cada orgánulo en el dibujo y decir <b>cómo es, qué hace y en qué células aparece</b>.</p>" +
    w("bio_celula") +
    ojo("Las bacterias <b>sí</b> tienen pared (peptidoglucano), ribosomas (70S) y membrana plasmática; lo que no tienen es núcleo ni orgánulos con membrana. Y el «mesosoma» que aparece en libros antiguos resultó ser un artefacto de la preparación de las muestras.")) });

  nuevas.push({ h: "7. La ruta de una proteína por la célula", html: env(
    "<p>Una proteína de secreción recorre el sistema de endomembranas siempre en el mismo orden. Se entiende mejor si sigues a una (por ejemplo, la insulina) desde el gen hasta el exterior:</p>" +
    w("bio_secrecion") +
    "<h5>Cómo se descubrió: el experimento de Palade</h5>" +
    "<p>George Palade (premio Nobel de Medicina en 1974, junto con Albert Claude y Christian de Duve) usó células del páncreas, que fabrican enzimas digestivas. En el experimento de <b>pulso y caza</b>: (1) durante pocos minutos (el <b>pulso</b>) las células recibieron un aminoácido <b>radiactivo</b>, de modo que solo las proteínas fabricadas en ese momento quedaron marcadas; (2) después se les dio el mismo aminoácido sin marcar (la <b>caza</b>) y se tomaron muestras cada cierto tiempo. Con autorradiografía y microscopía electrónica se vio dónde estaba la radiactividad en cada momento.</p>" +
    tabla(["Tiempo", "¿Dónde está la proteína marcada?"], [
      ["≈ 3 min", "retículo endoplasmático rugoso"],
      ["≈ 17 min", "aparato de Golgi"],
      ["≈ 37 min", "vacuolas de condensación (salida del Golgi)"],
      ["≈ 117 min", "gránulos de secreción, que liberan su contenido al exterior"]
    ], "q3t") +
    "<p>(Tiempos aproximados de los experimentos originales.) La marca se desplaza de un compartimento al siguiente: <b>RER → Golgi → vesículas de secreción → exterior</b>. Es la prueba de que son pasos consecutivos de una misma ruta.</p>" +
    "<h5>Tres destinos posibles</h5>" +
    "<ul><li><b>Secreción</b> (la vía regulada o constitutiva): exocitosis de proteínas al medio externo.</li><li><b>Lisosomas</b>: las enzimas digestivas se quedan dentro de vesículas.</li><li><b>Membrana plasmática</b>: una proteína de membrana viaja anclada en la vesícula; al fundirse, su parte que daba a la luz queda en la cara externa.</li></ul>" +
    "<p>Los lípidos de la membrana siguen el mismo camino: se sintetizan en el REL y llegan a la membrana plasmática en vesículas, por eso las membranas se renuevan sin parar.</p>" +
    "<h5>Cuestiones que suelen preguntar</h5>" +
    "<ul><li>¿Por qué una célula pancreática tiene mucho RER y Golgi, y una célula de la corteza suprarrenal (esteroides) mucho REL? Porque cada una fabrica lo que necesita: proteína o lípido.</li><li>¿Qué se encuentra en una vesícula de secreción? Una proteína ya madura, rodeada de membrana procedente del Golgi.</li><li>¿Qué orgánulo falla en una enfermedad de depósito? El lisosoma: falta una enzima.</li></ul>") });

  nuevas.push({ h: "8. Origen de la célula eucariota: teoría endosimbiótica", html: env(
    "<p>¿Cómo pasó la vida de células sin orgánulos a células con ellos? La teoría aceptada es la <b>endosimbiótica</b>, que formuló con firmeza <b>Lynn Margulis en 1967</b> a partir de ideas anteriores del siglo XX. Dice que <b>mitocondrias y cloroplastos eran bacterias de vida libre</b> que fueron englobadas por una célula mayor y acabaron conviviendo con ella:</p>" +
    "<ol><li>Una célula <b>anaerobia</b> (una arquea o un ancestro suyo) engloba, por fagocitosis, a una bacteria <b>aerobia</b> y no la digiere.</li><li>La relación se hace <b>mutuamente beneficiosa</b> (simbiosis): el huésped aporta alimento y protección; la bacteria, mucho ATP gracias al oxígeno. Esa bacteria es el origen de la <b>mitocondria</b>.</li><li>Más tarde, una de estas células eucariotas engloba a una <b>cianobacteria</b> fotosintética: es el origen del <b>cloroplasto</b>, y de ahí las algas y las plantas.</li></ol>" +
    "<p>La envoltura nuclear y el sistema de endomembranas habrían surgido <b>antes</b>, por plegamiento de la membrana plasmática (invaginación), y no por endosimbiosis.</p>" +
    "<h5>Pruebas a favor</h5>" +
    tabla(["Prueba", "Qué se observa"], [
      ["<b>Doble membrana</b>", "la interna sería la de la bacteria original; la externa, la de la vesícula de fagocitosis"],
      ["<b>ADN propio y circular</b>, sin histonas", "igual que el de una bacteria; no es el ADN lineal del núcleo"],
      ["<b>Ribosomas 70S</b>", "iguales a los bacterianos y distintos de los 80S del citosol"],
      ["<b>Reproducción por fisión binaria</b>", "se dividen solos, sin depender de la mitosis"],
      ["<b>Tamaño</b>", "similar al de una bacteria (1–5 µm)"],
      ["<b>Sensibilidad a antibióticos</b>", "p. ej. el cloranfenicol inhibe los ribosomas bacterianos y también los mitocondriales"],
      ["<b>Comparación de genes</b>", "el ADN mitocondrial se parece al de las alfaproteobacterias; el del cloroplasto, al de las cianobacterias"]
    ], "q3t") +
    "<p><b>Contra la autonomía total:</b> con el tiempo, muchos genes de esos «huéspedes» pasaron al núcleo; por eso mitocondrias y cloroplastos ya no pueden vivir fuera de la célula (en el ser humano, solo 37 genes siguen en el ADN mitocondrial).</p>" +
    ojo("La endosimbiosis explica el origen de <b>mitocondrias y cloroplastos</b>, no del núcleo, del retículo ni del Golgi. Y no digas que el cloroplasto es «más antiguo» que la mitocondria: según la teoría, la mitocondria apareció <b>antes</b> (todas las eucariotas la tienen o la tuvieron).")) });

  nuevas.push({ h: "9. Ejemplos PAU resueltos: gráficas y experimentos", html: env(
    ejemplo("¿Qué tipo de transporte es? Gráfica y cianuro", "Se mide la velocidad de entrada de tres sustancias en una célula al variar su concentración exterior. <b>A</b>: v = 3, 6, 15 y 30 (u. a.) para [S] = 1, 2, 5 y 10 mM. <b>B</b>: v = 33,3; 50; 71,4 y 83,3 para las mismas concentraciones. <b>C</b>: se acumula dentro hasta una concentración 5 veces mayor que la de fuera. Al añadir cianuro (que bloquea la producción de ATP), A y B no cambian y C se detiene. (a) Identifica el transporte de A, B y C. (b) Explica por qué B se satura y A no.", [
      "<b>A:</b> el cociente v/[S] es siempre 3 (3/1, 6/2, 15/5, 30/10): la velocidad es <b>proporcional</b>, sin saturación → <b>difusión simple</b>.",
      "<b>B:</b> la velocidad sube cada vez menos y tiende a un máximo (con la fórmula v = 100·S/(2 + S): 33,3; 50; 71,4; 83,3). Aun así no depende del ATP → <b>difusión facilitada</b>, a favor del gradiente y con proteína.",
      "<b>C:</b> se acumula <b>contra su gradiente</b> (5 veces más dentro) y el cianuro la para, por tanto necesita ATP → <b>transporte activo</b>.",
      "<b>(b)</b> B usa un número limitado de proteínas transportadoras, que se ocupan todas a concentraciones altas; A atraviesa directamente la bicapa y no depende de proteínas.",
      "<b>Detalle que puntúa:</b> citar los dos criterios a la vez: <b>gradiente</b> (a favor o en contra) y <b>energía</b> (ATP sí o no)."
    ]) +
    ejemplo("Frye y Edidin (1970): ¿se mueven las proteínas de la membrana?", "Se fusionan células humanas y de ratón con un virus. Las proteínas de membrana de las humanas se marcan con un anticuerpo fluorescente rojo y las de ratón con otro verde. Al principio, la mitad de la célula fusionada es roja y la otra mitad, verde. A 37 °C, a los 40 minutos los colores están mezclados por toda la membrana; a 1 °C casi no se mezclan. (a) ¿Qué demuestra? (b) ¿Por qué influye la temperatura?", [
      "<b>(a)</b> Las proteínas de la membrana se desplazan <b>lateralmente</b> por la bicapa: la membrana es <b>fluida</b>. Es una de las pruebas principales del modelo de mosaico fluido (y contra el «sándwich» de Danielli y Davson).",
      "<b>(b)</b> La fluidez de la bicapa depende de la temperatura: en frío los lípidos se compactan y la membrana se vuelve rígida, y las proteínas apenas se mueven.",
      "<b>Detalle que puntúa:</b> que el experimento <b>no</b> demuestra que las proteínas atraviesen la bicapa ni que el movimiento necesite ATP: a 37 °C también ocurre con ATP bloqueado."
    ]) +
    ejemplo("Interpretar un esquema de célula", "Un esquema muestra una célula con pared gruesa, una vacuola grande, orgánulos verdes con membranas apiladas y ausencia de centriolos. (a) ¿Qué tipo de célula es? (b) ¿Qué proceso ocurre en los orgánulos verdes y qué prueba hay de que antes eran bacterias?", [
      "<b>(a)</b> Pared + vacuola central + cloroplastos + sin centriolos = <b>célula eucariota vegetal</b>.",
      "<b>(b)</b> En los cloroplastos ocurre la <b>fotosíntesis</b> (en los tilacoides, la fase luminosa; en el estroma, el ciclo de Calvin).",
      "<b>Pruebas endosimbióticas:</b> doble membrana, ADN circular propio, ribosomas 70S y división por fisión binaria; su ADN se parece al de las cianobacterias."
    ]) +
    "<p>Ahora tú: en los ejercicios hay gráficas, aumentos de micrografías y problemas de la bomba Na<sup>+</sup>/K<sup>+</sup>.</p>") });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar con el mecanismo → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema, con una respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Enuncia la teoría celular", "Respuesta modelo:", [
      "La <b>célula es la unidad estructural</b> de los seres vivos (todos están formados por una o más células).",
      "La <b>célula es la unidad funcional</b>: en ella se realizan las funciones vitales.",
      "<b>Toda célula procede de otra célula</b> (Virchow, 1855, <i>omnis cellula e cellula</i>).",
      "La célula contiene el <b>material hereditario</b>, que se transmite a las células hijas.",
      "Citar a Schleiden (plantas, 1838) y Schwann (animales, 1839)."
    ]) +
    ejemplo("Pregunta 2. Diferencias entre célula procariota y eucariota", "Respuesta modelo:", [
      "<b>ADN:</b> procariota, circular y en el nucleoide; eucariota, lineal y dentro del núcleo.",
      "<b>Orgánulos con membrana:</b> los procariotas no tienen; los eucariotas sí.",
      "<b>Ribosomas:</b> 70S frente a 80S.",
      "<b>Tamaño y división:</b> procariota más pequeña, por fisión binaria; eucariota con mitosis o meiosis.",
      "Terminar con un ejemplo de cada una."
    ]) +
    ejemplo("Pregunta 3. Describe la estructura de la membrana según el modelo de mosaico fluido", "Respuesta modelo:", [
      "Una <b>bicapa de fosfolípidos</b> con las cabezas polares hacia el agua y las colas apolares hacia dentro.",
      "<b>Colesterol</b> entre las colas (en animales), que regula la fluidez.",
      "<b>Proteínas integrales y periféricas</b>, que forman un mosaico y se pueden mover (fluidez).",
      "<b>Glucolípidos y glucoproteínas</b> solo en la cara externa (glucocálix).",
      "Mencionar que fue propuesto por Singer y Nicolson (1972)."
    ]) +
    ejemplo("Pregunta 4. Distingue transporte pasivo y activo", "Respuesta modelo:", [
      "<b>Pasivo:</b> a favor del gradiente, sin ATP. Incluye la difusión simple (O<sub>2</sub>), la facilitada (glucosa por permeasas) y la ósmosis.",
      "<b>Activo:</b> en contra del gradiente, con gasto de ATP y proteínas específicas (bomba Na<sup>+</sup>/K<sup>+</sup>).",
      "Añadir el transporte en masa (endocitosis y exocitosis) como tercera vía para partículas grandes."
    ]) +
    ejemplo("Pregunta 5. Ruta de una proteína de secreción", "Respuesta modelo:", [
      "Se sintetiza en un ribosoma del <b>RER</b> y entra en su luz.",
      "Una vesícula de transporte la lleva a la cara cis del <b>aparato de Golgi</b>, donde se modifica y empaqueta.",
      "Sale por la cara trans en una <b>vesícula de secreción</b>.",
      "Se funde con la membrana plasmática y la libera por <b>exocitosis</b>."
    ]) +
    ejemplo("Pregunta 6. Teoría endosimbiótica", "Respuesta modelo:", [
      "<b>Enunciado:</b> mitocondrias y cloroplastos proceden de bacterias englobadas por una célula mayor (Margulis).",
      "<b>Pruebas:</b> doble membrana, ADN circular, ribosomas 70S, división por fisión binaria.",
      "Mitocondria de una bacteria aerobia; cloroplasto de una cianobacteria."
    ]) +
    "<p>Los ejercicios del final de este tema incluyen preguntas abiertas con rúbrica, para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio6a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
