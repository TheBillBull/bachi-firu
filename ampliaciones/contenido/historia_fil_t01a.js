/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 1: Los orígenes: los presocráticos
   (parte A: teoría. Parte B, historia_fil_t01b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Mito frente a logos: no es «tontos frente a listos», es un cambio de método → tabla + clasificar mito/logos.
   2. El arché de cada autor y por qué el ápeiron es un salto de abstracción → tabla + emparejar + ejercicios.
   3. Heráclito: el cambio NO es caos, está regido por el logos y por la tensión de opuestos → sección propia + comentario resuelto.
   4. Parménides: el argumento (no-ser no es → cambio imposible) y las dos vías (verdad / opinión) → widget paso a paso filo_parmenides.
   5. Comparación Heráclito–Parménides (sentidos frente a razón) → tabla comparativa + pregunta abierta con rúbrica.
   6. El atomismo como síntesis: dónde discrepa de Parménides (el vacío) y qué conserva → mismo widget en «vista atomista».
   7. Pitagóricos: «todo es número» = estructura matemática (armonía), no «los números son cosas» → ejemplo de la cuerda.
   8. Pluralistas (Empédocles, Anaxágoras): puente entre Parménides y los atomistas → sección breve.
   9. Qué buscaban: la causa material (Aristóteles) y la conexión con Platón (tema 3) → tabla de conexiones.
   10. Comentario de texto: fragmentos breves y cómo se comentan → comentario resuelto de Heráclito paso a paso.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t1/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Del mito al logos
  secciones[0] =
    "<h5>En qué mundo nace esta idea</h5>" +
    "<p>La filosofía no cae del cielo: nace en un lugar y un momento concretos. Las ciudades griegas de <b>Jonia</b> (la costa de la actual Turquía), como <b>Mileto</b> y <b>Éfeso</b>, eran puertos ricos del siglo VI a. C. por los que pasaban barcos, mercaderes y noticias de Egipto, Babilonia y Fenicia. Allí se juntaron cuatro cosas:</p>" +
    "<ul><li><b>Contacto con otras culturas.</b> Si cada pueblo cuenta un origen del mundo distinto, ya no puedes creer que <em>el tuyo</em> sea el único. Surge la duda y, con la duda, la pregunta.</li>" +
    "<li><b>La polis.</b> Las decisiones se discuten en público (no las dicta un rey-sacerdote). La gente se acostumbra a dar razones y a que otros las rebatan.</li>" +
    "<li><b>Escritura alfabética.</b> Poner una idea por escrito permite examinarla, criticarla y mejorarla de generación en generación.</li>" +
    "<li><b>Una religión sin clero poderoso ni libro sagrado.</b> Los poemas de Homero y Hesíodo se recitaban, pero nadie tenía autoridad para impedir que se cuestionaran.</li></ul>" +
    "<h5>Mito y logos, lado a lado</h5>" +
    "<p>Fíjate en que el mito <em>sí</em> explica (por qué hay tormentas, de dónde viene el mundo). La diferencia no está en que el mito sea «tonto» y la razón «lista», sino en <b>cómo</b> se justifica la explicación:</p>" +
    tabla(["", "Mito", "Logos (filosofía)"], [
      ["¿Quién explica?", "Dioses y fuerzas con voluntad propia (Zeus lanza el rayo)", "Causas naturales que se pueden descubrir"],
      ["¿Cómo se justifica?", "Porque lo cuenta la tradición: «siempre se ha dicho»", "Con argumentos y observaciones que cualquiera puede examinar"],
      ["¿Se puede discutir?", "No: se acepta o se rechaza entero", "Sí: se critica, se corrige, se mejora"],
      ["Ejemplo (terremotos)", "Poseidón sacude la tierra, enfadado", "Tales: la tierra flota sobre el agua y se mece (según la tradición)"],
      ["¿Quién tiene la autoridad?", "El poeta o el sacerdote, inspirado por los dioses", "Quien da mejores razones"]
    ]) +
    ojo("Un fallo muy común en la PAU: decir que los presocráticos «ya no creían en los dioses» o que «el mito desaparece». No es así: muchos siguen hablando de lo divino (Heráclito, Pitágoras, Anaximandro). Lo que cambia es que la explicación del mundo ya no depende de la voluntad caprichosa de los dioses, sino de un orden natural que se puede entender.") +
    "<h5>Un ejemplo cotidiano para quedarte con la idea</h5>" +
    "<p>Imagina que un día se va la luz en tu calle. La explicación «mítica» sería: «es un castigo, alguien ha enfadado a la compañía eléctrica» (sin comprobar nada y sin poder discutirlo). La explicación «con logos» es: «se ha fundido un transformador; si es eso, la luz volverá cuando lo cambien, y si no vuelve, buscaremos otra causa». Esta segunda tiene tres rasgos filosóficos: propone una <b>causa natural</b>, se puede <b>comprobar</b> y está <b>abierta a corregirse</b>.</p>" +
    "<p>Prueba tú: clasifica estas frases en «mito» o «logos».</p>" +
    w("clasificar", "mitologos");

  // ---------------------------------------------------------------- 2. El arché
  secciones[1] =
    "<h5>Qué es (y qué no es) un arché</h5>" +
    "<p>La palabra <em>arché</em> significa a la vez <b>comienzo</b> y <b>principio que manda</b>. Para un presocrático es lo que cumple <b>tres condiciones</b>: (1) está al <b>principio</b> de todo, (2) <b>permanece</b> debajo de todos los cambios y (3) es de donde todo <b>procede</b> y adonde todo <b>vuelve</b>. Aristóteles (<em>Metafísica</em>, libro I) dirá más tarde que estos pensadores buscaban sobre todo la <b>causa material</b>: «¿de qué está hecho todo?». No preguntaban todavía por el fin ni por el sentido.</p>" +
    "<p>Se les llama también <em>físicos</em>: <em>physis</em> (naturaleza) es su gran tema, y según la tradición escribieron obras tituladas <em>Sobre la naturaleza</em>. De casi todos conservamos solo <b>fragmentos</b>, citados por autores posteriores; por eso los textos de este tema son siempre breves.</p>" +
    "<h5>La escuela de Mileto, uno por uno</h5>" +
    "<ul><li><b>Tales de Mileto</b> (h. 624–546 a. C.): el arché es el <b>agua</b>. Pudo apoyarse en observaciones: el agua es la única sustancia que vemos como sólido, líquido y vapor, y sin ella no hay vida. Se le atribuye también la frase «todo está lleno de dioses» (la materia está viva, tiene principio de movimiento) y haber predicho un eclipse. Según la tradición, no dejó nada escrito.</li>" +
    "<li><b>Anaximandro</b> (h. 610–546 a. C.): el arché es el <b>ápeiron</b> («lo ilimitado, lo indefinido»). Razonamiento: si el principio fuera «agua» (algo húmedo y frío), ¿cómo saldría de él el fuego (seco y caliente), su contrario? El principio no puede ser uno de los contrarios; tiene que ser algo sin cualidades concretas del que salgan todos. Es ilimitado, eterno y «lo que todo gobierna». Según las fuentes, escribió una obra en prosa.</li>" +
    "<li><b>Anaxímenes</b> (h. 585–525 a. C.): el arché es el <b>aire</b>, con una novedad importante: explica <em>cómo</em> del aire salen las demás cosas, por <b>rarefacción</b> (el aire se enrarece y forma fuego) y <b>condensación</b> (se condensa en viento, nubes, agua, tierra y piedra). Es el primer intento de explicar diferencias de calidad por diferencias de <em>cantidad</em> (más o menos apretado).</li></ul>" +
    ejemplo("Cómo se ve la rarefacción y la condensación", "Para Anaxímenes, un mismo principio explica cosas muy distintas. ¿Cómo lo ilustrarías con algo de casa?", [
      "Pon agua en una olla: si la calientas, se <b>enrarece</b> y se convierte en vapor (como el «aire»).",
      "Si ese vapor toca una tapa fría, se <b>condensa</b> y vuelve a ser agua líquida.",
      "Si el agua se enfría mucho, se condensa aún más y es hielo (sólido).",
      "Moraleja de Anaxímenes: una sola sustancia, <b>más o menos apretada</b>, da cosas distintas. Es un esbozo de explicación «con logos»."
    ]) +
    "<h5>Anaximandro: por qué el ápeiron es un salto</h5>" +
    "<p>Tales eligió una sustancia que se ve y se toca. Anaximandro se da cuenta de un problema lógico: <b>un principio con cualidades concretas favorece a un contrario frente a otro</b>. Su solución es abstracta: un principio <b>sin determinar</b> (ni frío ni caliente, ni húmedo ni seco) que no «prefiere» a ninguno y puede dar origen a todos. Es la primera vez que se razona que el origen de lo concreto tiene que ser <em>distinto</em> de lo concreto. También piensa el cosmos como un equilibrio: los contrarios «pagan la pena unos a otros por su injusticia», es decir, cuando el calor del verano se excede, el frío del invierno lo compensa.</p>" +
    "<h5>Pitágoras y los pitagóricos: el número</h5>" +
    "<p>Pitágoras (h. 570–495 a. C.), nacido en la isla de Samos, fundó en Crotona (sur de Italia) una comunidad a la vez <b>científica y religiosa</b>: creían en la transmigración de las almas (el alma se reencarna) y en que el estudio de la matemática purificaba. Del propio Pitágoras no se conservan escritos; sus ideas llegan a través de sus seguidores y de Aristóteles.</p>" +
    "<p>«Todo es número» no significa que las cosas estén hechas de cifras, sino que <b>la realidad tiene una estructura matemática</b>. La prueba estrella: en una cuerda tensa, si la pulsas entera suena una nota; si la sujetas por la <b>mitad</b>, suena la misma nota una octava más alta; a <b>dos tercios</b>, una quinta. Los sonidos agradables corresponden a <b>proporciones numéricas sencillas</b> (1:2, 2:3, 3:4). Si hasta la música, que parece pura sensación, obedece a números, quizá todo el universo (el <em>cosmos</em>, «orden») sea una armonía numérica.</p>" +
    tabla(["Autor", "Arché", "Lo nuevo que aporta"], [
      ["Tales", "agua", "Primera respuesta natural y no mítica"],
      ["Anaximandro", "ápeiron", "Principio abstracto, sin cualidades, ilimitado"],
      ["Anaxímenes", "aire", "Explica el <em>cómo</em>: rarefacción y condensación"],
      ["Pitágoras", "número", "La realidad es orden y proporción matemática"]
    ]) +
    "<p>Une cada autor con su arché:</p>" +
    w("emparejar", "arche");

  // ---------------------------------------------------------------- 3. Heráclito
  secciones[2] =
    "<h5>Quién es y cómo habla</h5>" +
    "<p>Heráclito de Éfeso (h. 540–480 a. C.) escribió un libro (se le suele llamar <em>Sobre la naturaleza</em>) en frases breves y enigmáticas, y por eso le apodaron «el Oscuro». Quería que sus lectores pensaran, no que repitieran. Se conservan unos 130 fragmentos. En la PAU lo que importa son <b>cuatro ideas</b> y cómo se relacionan entre sí.</p>" +
    "<h5>Las cuatro ideas de Heráclito</h5>" +
    "<ol><li><b>Todo cambia (devenir).</b> La fórmula «<em>panta rhei</em> (todo fluye)» se la atribuye la tradición posterior (Platón, <em>Crátilo</em>). Los fragmentos dicen, por ejemplo: «Para los que entran en los mismos ríos, aguas distintas y distintas fluyen sobre ellos». El río se parece a sí mismo porque <em>sigue fluyendo</em>, no porque el agua sea la misma.</li>" +
    "<li><b>Unidad de los opuestos.</b> Lo frío se vuelve caliente, el día es noche, la salud sólo se aprecia por la enfermedad. «El camino hacia arriba y hacia abajo es uno y el mismo.» Los contrarios no se destruyen: son <b>dos caras de una misma cosa</b> y se necesitan.</li>" +
    "<li><b>La lucha (pólemos) y la armonía.</b> «La guerra es padre de todas las cosas.» Del enfrentamiento de fuerzas surge el orden, como la tensión de la cuerda del arco o de la lira (la cuerda sólo suena si está tensa entre fuerzas opuestas).</li>" +
    "<li><b>El logos.</b> Detrás del cambio constante hay una <b>ley racional, común y universal</b> —el logos— que lo ordena y mide. Es lo único que no cambia: la ley del cambio. La mayoría de las personas vive «como dormida», sin escucharla.</li></ol>" +
    "<p>El arché de Heráclito es el <b>fuego</b>, y es una elección con intención: el fuego no es una cosa estable, sino <em>un proceso</em> que consume y transforma (se enciende «con medida» y se apaga «con medida»). Es el símbolo perfecto de una realidad que es movimiento ordenado.</p>" +
    ojo("Cuidado con el error más repetido: <b>Heráclito no dice que todo sea caos ni que nada se pueda conocer</b>. Dice que todo cambia <em>según una ley</em> (el logos). Por eso no es el «relativista» que a veces se cuenta: hay una verdad, y es esa ley.") +
    "<h5>Los sentidos, para Heráclito</h5>" +
    "<p>Ojos y oídos nos muestran el cambio, y eso está bien; el error está en quedarse en ellos sin <b>comprender</b> la ley que hay detrás. Para Heráclito el conocimiento verdadero consiste en <b>escuchar al logos</b>, no en fiarse de lo que cada uno cree ver. Se acerca así a Parménides en algo: ambos piensan que la razón tiene la última palabra. Lo que los separa es <em>qué</em> descubre la razón.</p>";

  // ---------------------------------------------------------------- 4. Parménides
  secciones[3] =
    "<h5>El poema de Parménides</h5>" +
    "<p>Parménides de Elea (h. 515–450 a. C.), en el sur de Italia, escribió un poema, también titulado <em>Sobre la naturaleza</em>, que ha llegado en gran parte. Es el primer texto filosófico que <b>argumenta paso a paso</b>. Lo cuenta como si una diosa le hubiera enseñado dos caminos:</p>" +
    "<ul><li><b>La vía de la verdad (<em>alétheia</em>):</b> «lo que es, es, y no puede no ser». Es el camino de la razón.</li>" +
    "<li><b>La vía de la opinión (<em>dóxa</em>):</b> lo que creen los mortales guiándose por los sentidos: que las cosas nacen, cambian, son muchas, se mueven. Para Parménides, un engaño sin base.</li></ul>" +
    "<p>Hay además un camino imposible, el de decir que algo «no es», que Parménides rechaza porque es impensable. Un fragmento muy citado resume la idea: «<b>lo mismo es pensar y ser</b>» (fr. 3): sólo se puede pensar lo que existe.</p>" +
    "<h5>El argumento, paso a paso</h5>" +
    "<p>Avanza tú mismo el razonamiento con el esquema. Fíjate en los pasos 2 y 5: son los dos puntos en los que más tarde los atomistas romperán con él.</p>" +
    w("filo_parmenides") +
    "<h5>Cómo es «el ser» de Parménides</h5>" +
    "<p>Si el no-ser es imposible, el ser tiene que tener unas características que el poema enumera. Aprende esta lista, que sale mucho:</p>" +
    tabla(["Característica", "Por qué (razonamiento)"], [
      ["Ingénito e imperecedero", "No puede nacer (vendría del no-ser) ni morir (iría al no-ser)"],
      ["Uno e indivisible", "Si hubiera dos seres, lo que los separa sería no-ser, y el no-ser no es"],
      ["Inmóvil e inmutable", "Moverse o cambiar es dejar de ser lo que se era, es decir, pasar al no-ser"],
      ["Completo y limitado (como una esfera)", "Lo que carece de algo sería «no-ser» en ese punto; tiene que ser perfecto"]
    ]) +
    "<h5>El primer gran racionalista</h5>" +
    "<p>Lo importante no es sólo la conclusión (que hoy nos extraña), sino el <b>método</b>: Parménides prefiere una conclusión que choca con los sentidos antes que renunciar a una cadena de razonamiento correcta. Por eso se le considera el primer <b>racionalista</b>: la razón manda sobre los sentidos. Su discípulo <b>Zenón de Elea</b> defendió esta tesis con paradojas; la más famosa: Aquiles nunca alcanzará a la tortuga si ésta sale con ventaja, porque cada vez que llegue adonde estaba ella, ya habrá avanzado un poco. Lo que se pide en la PAU no es resolverla, sino saber para qué sirve: mostrar que <b>el movimiento, pensado con rigor, parece contradictorio</b>.</p>" +
    "<h5>Heráclito frente a Parménides</h5>" +
    tabla(["", "Heráclito", "Parménides"], [
      ["Realidad", "Cambio constante (devenir)", "Ser único, inmóvil, eterno"],
      ["Cambio", "Es lo más real", "Es apariencia (dóxa)"],
      ["Opuestos", "Unidad en tensión", "No cabe el no-ser"],
      ["Papel de los sentidos", "Muestran el cambio, pero hay que comprenderlo (logos)", "Engañan: dan opinión"],
      ["Papel de la razón", "Descubre la ley (logos) del cambio", "Descubre el ser inmóvil con la lógica"],
      ["Arché", "Fuego (proceso ordenado)", "No busca un arché: el ser mismo"]
    ]) +
    "<p>Cuando vuelvas a esta tabla, recuerda el hilo común: los dos creen que <b>no basta con mirar</b>; hay que pensar. El problema que dejan abierto («¿cómo se concilian lo estable y lo cambiante?») lo recogen Demócrito ahora y Platón en el tema 3.</p>";

  // ---------------------------------------------------------------- 5. Atomismo (+ pluralistas)
  secciones[4] =
    "<h5>Antes de los átomos: los pluralistas</h5>" +
    "<p>Tras Parménides, había que salvar el cambio sin admitir que algo nazca de la nada. Dos soluciones intermedias:</p>" +
    "<ul><li><b>Empédocles de Agrigento</b> (h. 494–434 a. C.): hay <b>cuatro «raíces»</b> eternas (tierra, agua, aire y fuego) y dos fuerzas, el <b>Amor</b> (une) y el <b>Odio</b> (separa). Nada nace ni muere: las raíces se <em>mezclan y se separan</em>.</li>" +
    "<li><b>Anaxágoras de Clazómenas</b> (h. 500–428 a. C.): en todo hay «semillas» de todo, y una inteligencia, el <b>Nous</b>, pone orden en el caos inicial. Vivió en Atenas, y se le acusó de impiedad por decir que el Sol es una piedra incandescente.</li></ul>" +
    "<p>Idea común: <b>lo que cambia es la mezcla, no los ingredientes</b>. Es el camino que los atomistas llevarán hasta el final.</p>" +
    "<h5>Leucipo y Demócrito</h5>" +
    "<p>Leucipo (s. V a. C.) fundó el atomismo y su discípulo Demócrito de Abdera (h. 460–370 a. C.) lo desarrolló en una obra enorme (casi toda perdida). Su respuesta a Parménides es muy astuta:</p>" +
    "<ul><li>Parménides tiene razón en que el ser verdadero <b>no nace ni muere</b>: los átomos son <b>eternos, indivisibles y compactos</b>.</li>" +
    "<li>Pero se equivoca al decir que hay <em>un solo</em> ser inmóvil: hay <b>infinitos átomos</b>, y entre ellos hay <b>vacío</b>. Según Aristóteles, Demócrito sostenía que «lo que es no es más que lo que no es»: el vacío es un tipo de «no-ser» que sí existe.</li>" +
    "<li>Con vacío hay <b>dónde moverse</b>. Así se explica el cambio: no nace nada, sólo <b>se combinan y separan</b> átomos.</li></ul>" +
    ejemplo("Letras como átomos", "Aristóteles contó que los atomistas explicaban la diversidad con una analogía de letras. ¿Cómo funciona?", [
      "Los átomos se diferencian por la <b>forma</b>, como A y N.",
      "Por el <b>orden</b>: AN no es lo mismo que NA.",
      "Por la <b>posición</b>: la Z es una N «tumbada».",
      "Con unas pocas letras se escriben miles de palabras; con unas pocas formas de átomos, miles de cosas. La diferencia entre un trozo de hierro y un pedazo de pan es <b>cómo están dispuestos los átomos</b>, no de qué «sustancia» distinta están hechos."
    ]) +
    "<h5>Consecuencias</h5>" +
    "<ul><li><b>Mecanicismo y determinismo.</b> Todo ocurre por choques de átomos según leyes necesarias; sin dioses ni fines. «Nada ocurre al azar, sino todo por una razón y por necesidad» (Leucipo).</li>" +
    "<li><b>Materialismo.</b> También el alma está hecha de átomos (los más finos y móviles, según la tradición). Al morir, se dispersan.</li>" +
    "<li><b>Dos tipos de conocimiento.</b> Los sentidos nos dan color, sabor, calor: eso es «convención». Lo real son los átomos y el vacío: «Por convención hay dulce, por convención amargo, por convención color; en realidad, átomos y vacío.» Sólo la razón llega a lo real. Mantiene así la desconfianza de Parménides hacia los sentidos, aunque sin negar el cambio.</li>" +
    "<li><b>Ética de la serenidad (<em>euthymía</em>).</b> Una vida buena es el equilibrio del ánimo, sin excesos ni miedos, sin temer a los dioses ni a la muerte. Epicuro retomará más tarde el atomismo con esta idea.</li></ul>" +
    ojo("Los átomos de Demócrito no son los de la química moderna. No tienen partes (ni núcleo ni electrones) y se diferencian sólo por forma, orden y posición. La coincidencia es en la idea, no en los detalles. Aristóteles criticó al atomismo (no explica por qué se mueven los átomos ni el orden del mundo), y quedó casi olvidado hasta la ciencia moderna.") +
    "<p>Para cerrar: ordena la cadena de ideas que lleva de Parménides al átomo.</p>" +
    w("orden", "ordenatomo");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Mapa del tema: quién responde a quién", html:
    "<p>Los presocráticos no hablan cada uno por su lado: <b>se contestan unos a otros</b>. Aprender el hilo vale más que memorizar nombres sueltos.</p>" +
    "<ol><li><b>Mileto</b> (Tales, Anaximandro, Anaxímenes): ¿de qué está hecho todo? Respuesta: un principio (agua, ápeiron, aire).</li>" +
    "<li><b>Pitágoras</b> añade: lo importante no es sólo la materia, sino su <em>estructura</em> (número, proporción).</li>" +
    "<li><b>Heráclito</b>: lo que hay detrás es cambio ordenado por el logos.</li>" +
    "<li><b>Parménides</b> lo desmonta: pensado con lógica, el cambio es imposible; el ser es uno e inmóvil.</li>" +
    "<li><b>Empédocles y Anaxágoras</b>: para salvar el cambio, hay varios elementos eternos que se mezclan.</li>" +
    "<li><b>Demócrito</b>: átomos eternos y vacío; el cambio es movimiento y combinación. Cierra el círculo.</li></ol>" +
    tabla(["Pregunta que se hacen", "Respuestas del tema"], [
      ["¿De qué está hecho todo? (arché)", "Agua · ápeiron · aire · fuego · número · átomos y vacío"],
      ["¿Hay cambio real?", "Sí (Heráclito, Demócrito, Empédocles) · No (Parménides)"],
      ["¿En qué confiar: sentidos o razón?", "En la razón (Parménides; Demócrito para lo real); los sentidos dan apariencias o convenciones"],
      ["¿Hay un orden racional en el mundo?", "Sí: logos (Heráclito), número (Pitágoras), Nous (Anaxágoras), necesidad (atomistas)"]
    ]) +
    "<h5>Conexiones con el resto de la asignatura</h5>" +
    tabla(["Idea presocrática", "Reaparece en…"], [
      ["Cambio frente a ser (Heráclito–Parménides)", "Platón (tema 3): mundo sensible cambiante frente a mundo de las Ideas inmutable"],
      ["Arché como causa material", "Aristóteles (tema 4): una de sus cuatro causas; critica a los presocráticos por quedarse sólo en ella"],
      ["Mecanicismo atomista", "Epicuro (helenismo) y, mucho después, la ciencia moderna"],
      ["Sentidos engañosos / razón", "Racionalismo moderno (Descartes) frente al empirismo (Hume)"],
      ["Logos", "Estoicos (logos universal) y pensamiento cristiano posterior"]
    ]) +
    "<p>(El tema 2 traza la flecha siguiente: con Sócrates y los sofistas se pasa de preguntar «¿de qué está hecho el mundo?» a «¿cómo debo vivir?».)</p>" });

  nuevas.push({ h: "7. Comentario de texto resuelto: Heráclito y el río", html:
    "<p>En la PAU se pide comentar un fragmento breve: identificar el tema y las ideas, y <b>relacionarlo con el pensamiento del autor</b> y con otros autores. Aquí tienes un comentario resuelto, paso a paso, con un fragmento corto.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Heráclito, <em>Sobre la naturaleza</em>, fragmentos DK 22 B12 y B49a; traducción española habitual, que varía levemente según la edición):<br><em>«Para los que entran en los mismos ríos, aguas distintas y distintas fluyen sobre ellos. [...] En los mismos ríos entramos y no entramos; somos y no somos.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Heráclito de Éfeso, siglo VI–V a. C., filósofo presocrático de Jonia. Fragmentos de su libro <em>Sobre la naturaleza</em>, conservados en citas posteriores. Contexto: la búsqueda del arché y el debate sobre si la realidad cambia.</li>" +
    "<li><b>2. Enuncia el tema.</b> La naturaleza cambiante de la realidad (devenir) y, con ella, la identidad de las cosas y de las personas.</li>" +
    "<li><b>3. Idea principal.</b> Todo está en continuo cambio: ni el río ni nosotros somos «los mismos» de un instante a otro. Y a la vez el río <em>sigue siendo</em> «el río»: hay identidad en el cambio.</li>" +
    "<li><b>4. Ideas secundarias y términos.</b> (a) «Aguas distintas y distintas fluyen»: lo que fluye se renueva sin cesar. (b) «Entramos y no entramos; somos y no somos»: una misma realidad puede ser y no ser lo mismo según el momento: <b>unidad de los opuestos</b>. (c) El «nosotros» incluido: el cambio afecta también al ser humano, no sólo a la naturaleza.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la tesis central de Heráclito: devenir regido por el logos. Si el río se parece a sí mismo es porque una ley (logos) mide el fluir; su arché, el fuego, es proceso. Unidad de opuestos (camino arriba–abajo) y armonía por tensión (arco y lira).</li>" +
    "<li><b>6. Compara con otro autor.</b> Parménides sostiene lo opuesto: el cambio es apariencia y el ser es inmóvil; ambos usan la razón, pero llegan a conclusiones contrarias. Demócrito intentará conciliarlos con átomos eternos que se mueven en el vacío. Y Platón (tema 3) dará a cada uno su parte: lo sensible fluye (Heráclito), las Ideas permanecen (Parménides).</li>" +
    "<li><b>7. Valora y concluye.</b> El fragmento muestra el paso del mito al logos: no cuenta una historia, afirma una tesis sobre el mundo que puede discutirse. Su vigencia: que identidad y cambio convivan (¿eres la misma persona que hace diez años?) sigue siendo un problema filosófico actual.</li></ol>" +
    ojo("Errores típicos al comentar: (1) <b>parafrasear</b> el texto en vez de explicar las ideas; (2) decir que Heráclito «niega la realidad» (la afirma, y es cambiante); (3) olvidar el logos; (4) comparar sin decir en qué coinciden y en qué difieren.") +
    "<p>Practica ahora con tu propio texto: en los ejercicios de este tema tienes comentarios de fragmentos de Parménides y de Demócrito con rúbrica para autoevaluarte.</p>" });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>Preguntas típicas de este tema y una respuesta modelo en forma de esquema (amplíala con tu propio estilo). El orden de la respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica el paso del mito al logos", "Respuesta modelo, en cinco movimientos:", [
      "<b>Definición.</b> El mito es un relato tradicional de dioses que explica el mundo sin dar razones; el logos es la explicación racional, argumentada y discutible.",
      "<b>Contexto.</b> Jonia, siglo VI a. C.: comercio, polis, escritura.",
      "<b>Ejemplo.</b> Tales explica la tierra por el agua en vez de por Poseidón.",
      "<b>Importancia.</b> Es el nacimiento de la filosofía y de la ciencia, por el método más que por la respuesta.",
      "<b>Matiz.</b> El cambio es gradual y no elimina lo divino."
    ]) +
    ejemplo("Pregunta 2. Compara a Heráclito y Parménides", "Respuesta modelo:", [
      "<b>Coinciden</b> en que la razón debe superar la apariencia de los sentidos.",
      "<b>Difieren</b> en la conclusión: Heráclito, el devenir regido por el logos; Parménides, el ser único e inmóvil, porque el no-ser no es.",
      "<b>Cierre.</b> El puente hacia Demócrito y Platón."
    ]) +
    ejemplo("Pregunta 3. ¿Por qué el atomismo es una síntesis?", "Respuesta modelo:", [
      "Conserva de Parménides la eternidad e inmutabilidad del ser (los átomos).",
      "Acepta de Heráclito el cambio, como combinación y movimiento en el vacío.",
      "Lo logra admitiendo que el vacío, un no-ser, existe.",
      "Consecuencias: materialismo, mecanicismo y determinismo."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final de este tema: los de nivel ★★★ traen una rúbrica con la que ver la nota que te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf1a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
