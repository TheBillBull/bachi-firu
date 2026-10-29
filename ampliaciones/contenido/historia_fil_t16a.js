/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 16: Ortega y Gasset y la filosofía española
   (parte A: teoría. Parte B, historia_fil_t16b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. «Yo soy yo y mi circunstancia»: la circunstancia no es «el paisaje», es todo lo que me rodea y me constituye → sección 2 + comentario resuelto.
   2. Perspectivismo: cada punto de vista capta una parte de la verdad; NO es relativismo → sección 2 + clasificar «racionalismo / relativismo / perspectivismo».
   3. Raciovitalismo: ni razón pura (Descartes) ni vida sin razón (vitalismo irracional) → sección 2 + tabla comparativa.
   4. La vida humana como realidad radical (donde aparece todo lo demás), quehacer y proyecto → sección 2.
   5. Ideas y creencias: en las creencias se está, las ideas se tienen → sección 2 + clasificar «idea o creencia».
   6. Razón vital y razón histórica: «el hombre no tiene naturaleza, tiene historia», y la generación → sección 3.
   7. Rebelión de las masas: hombre-masa y minoría selecta son actitudes, no clases → sección 4.
   8. Crítica a Descartes/racionalismo y relación con Nietzsche y Husserl (comparación típica de la PAU) → sección 2 y 7.
   9. Contexto: Unamuno, 98 y Novecentismo, «europeizar» frente a «españolizar Europa» → secciones 1 y 5.
   10. Zambrano (razón poética) y Zubiri (inteligencia sentiente): una línea clara de cada uno, sin confundirlos → sección 5 + emparejar.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t16/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Ortega entre el 98 y el Novecentismo
  secciones[0] =
    "<h5>La vida de Ortega (1883–1955) paso a paso</h5>" +
    "<p>José Ortega y Gasset nació en <b>Madrid en 1883</b> en una familia ligada al periodismo: su padre dirigía un periódico y su madre era hija del fundador de otro. Crecer entre redacciones explica algo muy suyo: Ortega fue un filósofo que escribía <b>para el público</b>, en periódicos y revistas, y no solo para especialistas. Su vida, en cuatro tiempos:</p>" +
    "<ul><li><b>Formación (1905–1911).</b> Estudia Filosofía en Madrid y viaja a Alemania, sobre todo a <b>Marburgo</b>, donde conoce el neokantismo. Vuelve convencido de que España necesita «ponerse a la altura de Europa». En 1910 obtiene la cátedra de Metafísica de la Universidad de Madrid.</li>" +
    "<li><b>Madurez y fama (1914–1936).</b> Publica <i>Meditaciones del Quijote</i> (1914), <i>España invertebrada</i> (1921), <i>El tema de nuestro tiempo</i> (1923), <i>La deshumanización del arte</i> (1925) y <i>La rebelión de las masas</i> (1930). En 1923 funda la <b>Revista de Occidente</b>, que traduce y difunde a los grandes pensadores europeos en español. Durante la Segunda República (1931) es diputado.</li>" +
    "<li><b>Exilio (1936–1945).</b> La Guerra Civil lo obliga a salir de España; vive en Francia, Argentina y Portugal. En esos años escribe <i>Ideas y creencias</i> (1940) e <i>Historia como sistema</i> (en español, 1941).</li>" +
    "<li><b>Regreso (1945–1955).</b> Vuelve a España, funda el Instituto de Humanidades (1948) y muere en <b>Madrid en 1955</b>. Algunas obras importantes (<i>¿Qué es filosofía?</i>, <i>El hombre y la gente</i>) se publican después de su muerte, a partir de sus cursos.</li></ul>" +
    "<h5>Tres etapas de su pensamiento</h5>" +
    "<p>Los manuales suelen ordenar su filosofía en tres etapas. Las fechas son orientativas, porque las ideas se solapan, pero el esquema ayuda a no mezclar cosas:</p>" +
    tabla(["Etapa", "Fechas aprox.", "Idea central", "Obra típica"], [
      ["<b>Objetivismo</b>", "hasta 1914", "La verdad es objetiva y universal; la cultura europea es la salvación de España (influencia neokantiana).", "Ensayos de juventud"],
      ["<b>Perspectivismo</b>", "1914–1923", "Cada persona ve la realidad desde su punto de vista; «yo soy yo y mi circunstancia».", "<i>Meditaciones del Quijote</i>; <i>El tema de nuestro tiempo</i>"],
      ["<b>Raciovitalismo</b>", "desde 1923", "La razón es un órgano de la vida (razón vital) que se hace histórica; la vida es la realidad radical.", "<i>Ideas y creencias</i>; <i>Historia como sistema</i>"]
    ]) +
    ojo("En la PAU casi nunca se pide memorizar las etapas con fechas, pero sí saber que <b>perspectivismo</b> y <b>raciovitalismo</b> son la misma filosofía vista de dos maneras: el perspectivismo habla del <i>conocimiento</i> (cada punto de vista capta una parte de la verdad) y el raciovitalismo de la <i>razón y la vida</i> (la razón vive dentro de la vida).") +
    "<h5>El contexto: de 1898 a la «generación de Ortega»</h5>" +
    "<p>En 1898 España pierde sus últimas colonias (Cuba, Puerto Rico y Filipinas) y se instala una sensación de crisis nacional. Los escritores y pensadores del llamado <b>Desastre del 98</b> (Unamuno, Baroja, Azorín, Machado…) reaccionan con angustia y con una pregunta: «¿qué le pasa a España?». Ortega, nacido 19 años después que Unamuno, pertenece a la generación siguiente (el <b>Novecentismo</b>, o «generación del 14»). La diferencia de tono es clara:</p>" +
    tabla(["", "Generación del 98 (Unamuno)", "Novecentismo (Ortega)"], [
      ["Actitud ante España", "Dolor, angustia, introspección: «me duele España»", "Análisis frío y proyecto de reforma: la «regeneración» desde la ciencia y la cultura"],
      ["Mirada a Europa", "Desconfía: quiere «españolizar Europa»", "Admira: España es el problema y Europa la solución (fórmula con que se resume su postura)"],
      ["Estilo", "Apasionado, paradójico, personal", "Ensayo claro, brillante, pensado para un público amplio"],
      ["Cómo se piensa", "Desde el sentimiento y la fe", "Desde la razón, pero una razón unida a la vida"]
    ]) +
    "<p>Importante: no son enemigos. Comparten la preocupación por España y por el ser humano concreto; discrepan en el método y en el tono. Unamuno aparece más abajo, en la sección del panorama de la filosofía española.</p>";

  // ---------------------------------------------------------------- 2. Yo soy yo y mi circunstancia: raciovitalismo
  secciones[1] =
    "<h5>La frase, desmontada palabra a palabra</h5>" +
    "<p>«Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo» aparece en las <i>Meditaciones del Quijote</i> (1914). La frase tiene dos mitades:</p>" +
    "<ul><li><b>«Yo soy yo y mi circunstancia».</b> No existo como una mente aislada que luego mira el mundo. Mi vida consiste en estar <b>con</b> las cosas, las personas, la época, el país, el cuerpo y las ideas de mi tiempo. La <b>circunstancia</b> (lo que está «alrededor», <i>circum-stare</i>) <b>no es un decorado</b>: forma parte de lo que soy. Un yo sin circunstancia sería como un nadador sin agua.</li>" +
    "<li><b>«Si no la salvo a ella no me salvo yo».</b> «Salvar» significa aquí <b>comprender, dar sentido, hacerse cargo</b>. No puedo realizarme dejando de lado mi circunstancia ni quejándome de ella: tengo que entenderla y actuar dentro de ella. Por eso la filosofía de Ortega es tan comprometida con el momento histórico y con España.</li></ul>" +
    ejemplo("Dos personas ante la misma pregunta", "Dos jóvenes se preguntan qué estudiar. Una vive en un pueblo sin universidad; el otro, en una gran ciudad con familia que puede pagarle los estudios.", [
      "Los dos tienen la misma libertad de elegir, pero <b>no las mismas posibilidades</b>: su circunstancia es distinta.",
      "Ninguno puede «elegir como si no tuviera circunstancia»: aun si se marcha del pueblo, esa salida es una decisión tomada <i>desde</i> su circunstancia.",
      "«Salvar la circunstancia» sería, para la primera, comprender su situación y trabajar con ella (becas, traslado…), no ignorarla ni resignarse."
    ]) +
    "<h5>El perspectivismo: cada punto de vista capta una parte de la verdad</h5>" +
    "<p>Si yo soy siempre «yo y mi circunstancia», entonces <b>miro el mundo desde un lugar concreto</b>. Ortega lo llama <b>perspectiva</b>. Imagina un paisaje de montaña: desde el valle ves unas cosas, desde la cima otras, y nadie ve todo a la vez. Lo decisivo es esto:</p>" +
    "<ul><li><b>La perspectiva no falsea la realidad, la revela.</b> La realidad es tan rica que no cabe en un solo punto de vista; cada uno capta un aspecto verdadero de ella.</li>" +
    "<li><b>La verdad completa se alcanza sumando perspectivas</b>: la de cada persona, cada época, cada cultura. Quien se queda con la suya y desprecia las demás se equivoca; quien las integra se acerca más a la verdad.</li>" +
    "<li><b>Nadie tiene «la» perspectiva</b>: ni Dios (que sería todas a la vez) ni una razón pura sin lugar. Cada ser humano tiene la suya, insustituible, y tiene el deber de ejercerla con rigor.</li></ul>" +
    ojo("<b>Perspectivismo no es relativismo.</b> El relativismo dice que no hay verdad (o que cada cual tiene la suya y todas valen lo mismo, como defendían los sofistas, tema 2). Ortega dice lo contrario: la verdad <b>existe y es una</b>, pero se capta desde perspectivas distintas y todas son verdaderas <i>en parte</i>. Lo falso es la pretensión de que la mía lo abarca todo. Ortega critica por igual el <b>racionalismo</b> (una verdad universal sin perspectiva) y el <b>relativismo</b> (muchas verdades sin verdad).") +
    tabla(["", "Racionalismo", "Relativismo", "Perspectivismo (Ortega)"], [
      ["¿Hay verdad?", "Sí, una, universal", "No, o cada cual la suya", "Sí, una, vista desde muchos lugares"],
      ["¿Importa el punto de vista?", "No: la razón pura está fuera del tiempo y del lugar", "Sí, pero todo vale igual", "Sí: cada uno ve una parte verdadera"],
      ["Ejemplo de autor", "Descartes", "Sofistas (Protágoras)", "Ortega"]
    ]) +
    "<h5>Crítica al racionalismo y al vitalismo: el raciovitalismo</h5>" +
    "<p>Ortega sitúa su filosofía entre dos extremos que considera insuficientes. Esta es la clave del nombre <b>raciovitalismo</b> (razón + vida):</p>" +
    tabla(["", "Racionalismo (Descartes)", "Vitalismo irracional (Nietzsche, en su versión más radical)", "Raciovitalismo (Ortega)"], [
      ["Qué pone primero", "La razón pura, el «pienso»", "La vida, los instintos, la voluntad", "La vida humana, que incluye la razón como instrumento"],
      ["Su error", "Olvida que el que piensa vive en una circunstancia y en un tiempo", "Desprecia la razón y no puede dar cuenta de sí misma", "—"],
      ["La razón es…", "Un juez eterno e independiente de la vida", "Un estorbo o un disfraz de los instintos", "Un órgano de la vida, para orientarse en ella"]
    ]) +
    "<p>Fíjate en la crítica a <b>Descartes</b> (tema 9). Descartes concluía «pienso, luego existo» y trataba el yo como una sustancia pensante, separada del mundo. Para Ortega eso es una abstracción: <b>antes de pensar, estoy viviendo</b>; el «yo» ya está en el mundo, haciendo cosas con las cosas. El punto de partida no es el pensamiento, sino la vida. Lo mismo vale frente al «yo trascendental» de la fenomenología (tema 15) y frente al idealismo en general: el sujeto no está solo, <b>coexiste con las cosas</b>.</p>" +
    "<p>Y frente a <b>Nietzsche</b> (tema 14): coincide en que la vida es lo primero y en que la razón pura es una ficción, pero no acepta renunciar a la razón. Por eso el término no es «vitalismo» a secas, sino raciovitalismo: <b>la razón no se tira, se pone al servicio de la vida</b>.</p>" +
    "<h5>La vida humana como realidad radical</h5>" +
    "<p>Para Ortega, la <b>realidad radical</b> (la que está en la raíz, aquella en la que aparecen todas las demás) es <b>mi vida</b>: la coexistencia de un yo con sus circunstancias. Dios, la materia, las ideas o la ciencia me aparecen siempre <i>dentro</i> de mi vida; no puedo salir de ella para comprobarlas desde fuera. Esta vida no es la vida biológica (animal), sino la <b>vida humana biográfica</b>, y tiene rasgos que Ortega repite:</p>" +
    "<ul><li><b>Es quehacer.</b> No nos viene dada hecha: tenemos que hacerla. Un objeto «es» y ya está; una persona tiene que decidir qué va a ser.</li>" +
    "<li><b>Es proyecto y vocación.</b> Elegimos entre posibilidades; cada elección cierra unas y abre otras. Por eso somos <b>libres «a la fuerza»</b>: no podemos no decidir.</li>" +
    "<li><b>Es siempre circunstancial e histórica.</b> Vivimos en un mundo, en un tiempo, en un cuerpo, con unas posibilidades concretas.</li>" +
    "<li><b>Es drama:</b> una lucha por ser auténticos con las cosas que nos limitan.</li></ul>" +
    "<h5>Ideas y creencias</h5>" +
    "<p>En <i>Ideas y creencias</i> (1940) Ortega distingue dos modos de tener algo en la cabeza, y es una de las distinciones que más se preguntan:</p>" +
    tabla(["", "Ideas", "Creencias"], [
      ["Fórmula habitual", "Las ideas <b>se tienen</b>", "En las creencias <b>se está</b>"],
      ["Qué son", "Pensamientos que se nos ocurren, que discutimos, aceptamos o rechazamos", "Lo que damos por supuesto, el terreno sobre el que vivimos; ni siquiera notamos que lo pensamos"],
      ["Ejemplo", "Una teoría científica, una opinión política, un argumento", "Que el suelo me sostendrá, que mañana habrá clase, la fe de una época en la ciencia o en Dios"],
      ["Papel en la vida", "Son «cosas» que manejamos", "Nos sostienen y orientan; cuando se tambalea una creencia, se siente como un naufragio"]
    ]) +
    "<p>Las creencias son el <b>suelo</b> de la vida; las ideas, lo que construimos encima. Cuando una creencia deja de ser evidente (por ejemplo, la fe medieval en un orden divino del mundo), la época entra en <b>crisis</b>, y hay que sustituirla por otra. Y atención: una idea puede convertirse con el tiempo en creencia (hoy damos por supuesto, sin discutirlo, que la Tierra gira alrededor del Sol). Las dos citas literales de esta tabla son fórmulas habituales de Ortega que se suelen citar así; en un examen basta con expresarlas con tus palabras.</p>" +
    w("clasificar", "ideacreencia");

  // ---------------------------------------------------------------- 3. Razón vital y razón histórica
  secciones[2] =
    "<h5>Qué es la razón vital</h5>" +
    "<p>La <b>razón vital</b> es la razón que sirve para vivir. Para Ortega, pensar no es un lujo de especialistas: es la manera de orientarnos en nuestra circunstancia cuando tenemos que decidir qué hacer. Por eso no busca verdades eternas separadas de la vida, sino <b>«salvar»</b> las circunstancias, hacerlas comprensibles. Tiene dos rasgos:</p>" +
    "<ul><li><b>Es vital:</b> nace de la vida y vuelve a ella. Si una idea no ayuda a vivir mejor o a entender lo que nos pasa, para Ortega no sirve de gran cosa.</li>" +
    "<li><b>Es razón:</b> no es capricho ni instinto. Hay que argumentar, comprobar, buscar el rigor. Frente a Nietzsche, el raciovitalismo no renuncia a la razón.</li></ul>" +
    "<h5>De razón vital a razón histórica</h5>" +
    "<p>Aquí está el paso más importante de la última etapa. Si la vida humana es siempre circunstancial, no podemos entenderla con conceptos fijos como los de la física, porque <b>cambia</b>. Ortega lo dice en una de sus frases más conocidas: el ser humano <b>no tiene naturaleza, tiene historia</b> (<i>Historia como sistema</i>). Esto quiere decir:</p>" +
    "<ul><li>Una piedra tiene naturaleza: cae siempre igual hoy y hace mil años. El ser humano <b>no es algo fijo</b>: lo que somos depende de lo que hemos hecho y de lo que hemos sido antes.</li>" +
    "<li>Para saber qué es una persona (o una sociedad) no basta describirla: hay que <b>contar su historia</b>, cómo ha llegado hasta aquí y qué ha ido eligiendo. Por eso la razón vital es también <b>razón histórica</b>: entender es narrar cómo se ha formado algo.</li>" +
    "<li>No es que no haya nada estable: lo estable no está en una esencia eterna, sino en que <b>siempre tenemos que hacernos</b>.</li></ul>" +
    ojo("«No tiene naturaleza» <b>no</b> significa que el ser humano no sea nada ni que valga todo. Significa que su manera de ser <b>no está dada de antemano</b>: es una tarea que se va haciendo históricamente. La frase se combina con «tiene historia»; no se debe citar solo la primera mitad.") +
    ejemplo("Entender una creencia, no solo describirla", "¿Por qué una persona del siglo XIII creía que el orden del mundo era querido por Dios, y una persona de hoy no lo da por supuesto?", [
      "Con razón <b>pura</b> diríamos: «esa creencia es verdadera o falsa» y ya está.",
      "Con razón <b>histórica</b> preguntamos: ¿en qué circunstancia vivían?, ¿qué problemas tenían?, ¿qué creencias compartía su época? Así la entendemos.",
      "Entender no es aprobar: es ver por qué tenía sentido <i>en su vida</i>."
    ]) +
    "<h5>Las generaciones como método</h5>" +
    "<p>Para estudiar la historia Ortega propone el concepto de <b>generación</b>: el conjunto de personas de edad parecida que comparten una sensibilidad, unas creencias y un «espíritu de época». Su idea es que cada generación recibe una herencia y tiene que decidir qué hace con ella: <b>mantenerla, adaptarla o romper</b>. Los cambios históricos no los hace un genio aislado, sino el relevo de generaciones. Ortega habla de unos <b>quince años</b> como duración aproximada de cada una, y de que en cada momento conviven varias generaciones con distinto «nivel» de los tiempos. En <i>El tema de nuestro tiempo</i> (1923) lo aplica a su propia generación: la tarea del siglo XX es superar la oposición entre razón y vida, entre <b>cultura</b> y <b>espontaneidad</b>.</p>" +
    "<h5>En qué se diferencia la razón histórica de la ciencia natural</h5>" +
    tabla(["", "Razón físico-matemática (ciencias naturales)", "Razón vital e histórica"], [
      ["Objeto", "Cosas con naturaleza fija: leyes que siempre se cumplen", "La vida humana, que es cambio y proyecto"],
      ["Método", "Medir y deducir leyes generales", "Narrar y comprender cómo se ha formado algo"],
      ["Pregunta", "¿Cómo funciona?", "¿Cómo hemos llegado a ser así y qué podemos hacer?"],
      ["Límite", "No sirve para entender qué hacer con la vida", "No pretende dar leyes eternas"]
    ]) +
    "<p>Ortega no menosprecia la ciencia natural (era un gran admirador de Galileo). Lo que dice es que <b>no basta</b> para entender la vida humana: hace falta otra forma de razón, la histórica. Compara con Dilthey (que ya distinguía «explicar» la naturaleza y «comprender» la vida humana) y con Marx (tema 13), que también pensaba que el ser humano se hace históricamente, aunque Ortega rechaza que la clase o la economía lo expliquen todo.</p>";

  // ---------------------------------------------------------------- 4. La rebelión de las masas
  secciones[3] =
    "<h5>Qué dice el libro y en qué contexto</h5>" +
    "<p><i>La rebelión de las masas</i> (1930) nació como artículos en el diario <i>El Sol</i> y es la obra de Ortega que más se tradujo. Escrito entre las dos guerras mundiales, con el auge de los totalitarismos (comunismo, fascismo) a la vista, describe un hecho social nuevo: <b>las masas han llegado al poder social</b>. Antes, la vida pública la dirigían grupos reducidos; ahora todo está «lleno»: ciudades, cines, playas, política. Ortega no se alegra ni se lamenta sin más: lo <b>diagnostica</b> como un fenómeno que trae oportunidades (más gente con derechos y medios) y un riesgo grave.</p>" +
    "<h5>Masa y minoría: actitudes, no clases</h5>" +
    "<p>Aquí está la idea que más se malinterpreta, y la que más se pregunta:</p>" +
    "<ul><li><b>La masa</b> es «el hombre medio» que no se exige nada especial, se siente igual a todos y está contento así. No distingue lo mejor de lo peor, y <b>no reconoce autoridad ajena</b> en nada, ni siquiera en lo que no entiende.</li>" +
    "<li><b>La minoría selecta</b> no es «los ricos» ni «los nobles», sino quienes <b>se exigen más a sí mismos</b>: esfuerzo, disciplina y servicio a algo superior (la ciencia, el arte, el bien común).</li>" +
    "<li>Por tanto: <b>no es una distinción de clase social ni de dinero</b>. Un obrero puede ser «minoría» y un catedrático puede comportarse como «hombre-masa» (Ortega pone el ejemplo del <b>especialista</b>, que sabe mucho de poco y opina con aire de autoridad de todo lo demás).</li></ul>" +
    "<h5>El hombre-masa: rasgos</h5>" +
    tabla(["Rasgo", "Qué significa", "Ejemplo actual"], [
      ["<b>Satisfecho de sí</b>", "Cree que es perfecto tal como está y no siente necesidad de mejorar", "«Yo soy así y punto»"],
      ["<b>Señorito satisfecho</b>", "Disfruta de comodidades que no ha creado y las da por supuestas, como si fueran naturales", "Usar la tecnología sin pensar en cuánto saber hay detrás"],
      ["<b>Impone su opinión</b>", "Quiere imponer sus gustos y su vulgaridad como si fueran lo normal", "Descalificar al experto porque «mi opinión vale lo mismo»"],
      ["<b>No dialoga</b>", "Prefiere la fuerza o la acción directa a la razón y a la discusión", "Insultar en vez de argumentar"]
    ]) +
    ojo("Ortega no dice que el pueblo sea malo ni defiende un gobierno de ricos: critica una <b>actitud</b>. Tampoco dice que las minorías deban mandar por la fuerza: dice que deben <b>dirigir con ejemplo</b> y que el resto debe reconocer su competencia donde la tienen. Esta es una de las críticas más fuertes que se le hacen: su tono puede parecer elitista. Un comentario con buena nota lo reconoce y lo valora.") +
    "<h5>Consecuencias políticas y Europa</h5>" +
    "<ul><li><b>Hiperdemocracia y Estado.</b> Cuando la masa domina, quiere que el Estado lo resuelva todo; así crece un Estado omnipotente que anula la iniciativa individual. Ortega ve en el fascismo y el bolchevismo la forma extrema de ese riesgo.</li>" +
    "<li><b>Crisis de Europa.</b> Europa, que había dirigido el mundo, pierde su liderazgo por falta de minorías ejemplares y por una cultura que ya no cree en nada. Su remedio es la <b>unidad europea</b>: un proyecto común para recuperar la creencia en algo grande.</li>" +
    "<li><b>Antecedente: <i>España invertebrada</i> (1921).</b> Ya había dicho que un país se desarticula cuando las minorías dejan de dirigir y las masas se rebelan contra ellas; en ese libro aplica la tesis a España.</li></ul>" +
    ejemplo("¿Masa o minoría? Un caso cotidiano", "Dos personas leen en redes sociales un dato científico sobre vacunas que no conocen.", [
      "<b>Actitud de masa:</b> «Eso es mentira, yo sé más que los médicos», y lo dice sin informarse ni preguntarse si tiene competencia.",
      "<b>Actitud de minoría:</b> reconoce que no es su campo, busca fuentes fiables, pregunta a quien sabe y, si discrepa, lo hace con razones.",
      "Observa que el dinero, los estudios o la clase social <b>no deciden</b> quién es quién: decide la actitud."
    ]) +
    "<h5>Valoración crítica (para el final de una respuesta)</h5>" +
    "<p>A favor: describe con lucidez los riesgos de la sociedad de masas, la manipulación y el populismo, anticipándose a fenómenos de hoy (opinión sin competencia, polarización). En contra: algunos lo ven <b>elitista</b>; la historia muestra que las élites también se equivocan o se corrompen; y el modelo de «minoría selecta» sin control democrático es discutible. Es útil contrastarlo con Marx (tema 13), que pone la clave en las clases y la economía, no en la actitud.</p>";

  // ---------------------------------------------------------------- 5. Panorama de la filosofía española
  secciones[4] =
    "<h5>Por qué se estudia a estos autores juntos</h5>" +
    "<p>El tema se llama «Ortega y la filosofía española» porque en el siglo XX hay una constelación de pensadores españoles con intereses cruzados. Unamuno es el precedente; Zambrano y Zubiri son discípulos que siguen caminos muy distintos entre sí. Conviene tener de cada uno <b>una idea principal y una obra</b>.</p>" +
    "<h5>Miguel de Unamuno (1864–1936): el precedente</h5>" +
    "<p>Nacido en Bilbao, fue catedrático de griego y rector de la Universidad de Salamanca. Su obra central es <i>Del sentimiento trágico de la vida</i> (1912). Para él, la filosofía no nace de la razón fría sino del <b>hombre de carne y hueso</b> que sufre, ama y teme morir. Lo que de verdad le importa es la <b>inmortalidad personal</b> (el «hambre de inmortalidad»), y descubre una lucha insoluble: la <b>razón</b> no puede demostrar que seamos inmortales y la <b>fe</b> (o el deseo) no puede prescindir de ello. Esa tensión, que él llama <b>agonía</b>, es el «sentimiento trágico». Ortega comparte con él el interés por la vida concreta, pero responde con una razón vital, no con el sentimiento. Unamuno también publicó la novela <i>Niebla</i> (1914), donde filosofía y literatura se confunden.</p>" +
    "<h5>María Zambrano (1904–1991): la razón poética</h5>" +
    "<p>Nacida en Vélez-Málaga, discípula de Ortega (aunque con camino propio), vivió más de cuarenta años de <b>exilio</b> tras la Guerra Civil (1939), en América y Europa, y volvió a España en 1984. Obras: <i>Filosofía y poesía</i> (1939), <i>El hombre y lo divino</i> (1955). Su idea central es la <b>razón poética</b>: una forma de conocer que no renuncia a la razón, pero la une con la <b>sensibilidad, la intuición y la palabra poética</b>, para llegar a zonas de la vida que la razón puramente lógica no alcanza (lo sagrado, la esperanza, el dolor). Reflexiona sobre el exilio como experiencia que obliga a repensar qué es ser persona sin patria. La idea resumida: la poesía y la filosofía se separaron en Grecia, y ella quiere reunirlas.</p>" +
    "<h5>Xavier Zubiri (1898–1983): la inteligencia sentiente</h5>" +
    "<p>Nacido en San Sebastián, filósofo y teólogo, formado con Ortega y luego con Husserl y Heidegger. Obras: <i>Sobre la esencia</i> (1962) y la trilogía <i>Inteligencia sentiente</i> (1980–1983). Su tesis central es que <b>sentir e inteligir no son dos actos separados</b> (como decía la tradición, que distinguía sentidos y razón): son <b>un solo acto</b>, la <i>inteligencia sentiente</i>. Cuando veo una mesa, no recibo primero sensaciones y luego las interpreto: capto ya «algo real» con sentido. Esto le permite escapar tanto del idealismo (todo es pensamiento) como del empirismo (todo son sensaciones).</p>" +
    tabla(["Autor", "Idea clave", "Qué une", "Obra"], [
      ["<b>Unamuno</b>", "Sentimiento trágico de la vida", "Razón y fe en lucha; hombre de carne y hueso", "<i>Del sentimiento trágico de la vida</i> (1912)"],
      ["<b>Ortega</b>", "Raciovitalismo / razón vital e histórica", "Razón y vida", "<i>Meditaciones del Quijote</i> (1914); <i>La rebelión de las masas</i> (1930)"],
      ["<b>Zambrano</b>", "Razón poética", "Razón, poesía y sensibilidad", "<i>Filosofía y poesía</i> (1939)"],
      ["<b>Zubiri</b>", "Inteligencia sentiente", "Sentir e inteligir en un solo acto", "<i>Inteligencia sentiente</i> (1980–1983)"]
    ]) +
    ojo("No confundas: <b>razón poética</b> es de Zambrano; <b>razón vital</b>, de Ortega; <b>inteligencia sentiente</b>, de Zubiri. Una regla útil: Zambrano = poesía, Ortega = vida, Zubiri = sentir.") +
    "<p>Con estas figuras la filosofía española recupera, tras siglos de menor presencia internacional desde la escolástica medieval (tema 7), un lugar propio en el panorama europeo. Ortega es el eje: introduce a Europa en España (con la <i>Revista de Occidente</i>) y forma a una generación de pensadores. Conecta la última parte de la asignatura: Ortega responde a Descartes (tema 9), mira a Nietzsche (tema 14), dialoga con la fenomenología (tema 15) y su pensamiento sobre la sociedad se puede comparar con el de Marx (tema 13).</p>" +
    w("emparejar", "autores");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Comentario de texto resuelto: «yo soy yo y mi circunstancia»", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso con la frase más famosa de Ortega.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Ortega y Gasset, <em>Meditaciones del Quijote</em>, 1914):<br><em>«Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Ortega y Gasset (1883–1955), <i>Meditaciones del Quijote</i> (1914), su primera obra importante. Pertenece a la etapa del perspectivismo y prepara el raciovitalismo. Contexto: España tras 1898, y un Ortega joven que vuelve de Alemania y quiere renovar la cultura española.</li>" +
    "<li><b>2. Tema.</b> La relación inseparable entre el yo y su circunstancia, y la tarea de comprenderla.</li>" +
    "<li><b>3. Idea principal.</b> El yo no existe aislado: es siempre «yo y mi circunstancia». Realizarse exige hacerse cargo de la circunstancia, comprenderla y darle sentido; ignorarla o rechazarla equivale a perderse a uno mismo.</li>" +
    "<li><b>4. Ideas secundarias y términos.</b> (a) «Circunstancia»: todo lo que me rodea y me constituye (cuerpo, tiempo, país, sociedad, cultura), no un decorado. (b) «Salvar»: comprender, dar sentido y actuar sobre ella. (c) Implicación: no hay verdad sin punto de vista (perspectivismo). (d) Implicación ética: responsabilidad con el propio momento histórico.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es el centro del <b>raciovitalismo</b>: la vida humana (yo + circunstancia) es la realidad radical; la razón es vital e histórica, y sirve para orientarse en la circunstancia. Enlaza con el perspectivismo, con «el hombre no tiene naturaleza, tiene historia» y con la crítica al racionalismo y al relativismo.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con <b>Descartes</b> (tema 9): este parte de un «yo pienso» aislado, sin mundo; Ortega parte del yo <i>con</i> las cosas. Con <b>Nietzsche</b> (tema 14): ambos ponen la vida antes que la razón pura, pero Ortega no renuncia a la razón. Con <b>Husserl</b> y los existencialistas (tema 15): coincide en que la conciencia siempre está dirigida a un mundo, pero insiste en la dimensión histórica y colectiva.</li>" +
    "<li><b>7. Valora y concluye.</b> Aporta una visión realista de la libertad (siempre situada) y un compromiso con el propio tiempo. Límite: si se absolutiza la circunstancia, parece justificar el conformismo; Ortega responde que hay que <i>salvarla</i>, es decir, actuar sobre ella.</li></ol>" +
    ojo("Errores típicos: (1) entender «circunstancia» como «paisaje» o «entorno físico»; (2) decir que Ortega es relativista; (3) olvidar que la frase se completa con «si no la salvo a ella no me salvo yo»; (4) comparar con Descartes sin decir <i>en qué</i> se diferencian.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "7. Mapa del tema: Ortega y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y <b>comparar con otro</b>. Con Ortega, estas son las comparaciones más rentables:</p>" +
    tabla(["Autor", "Coincidencia", "Diferencia"], [
      ["<b>Sofistas (T2)</b>", "Hablan del punto de vista de cada uno", "Los sofistas son relativistas; Ortega defiende que hay <b>una</b> verdad vista desde varias perspectivas"],
      ["<b>Platón (T3)</b>", "Ambos se preocupan por la ciudad y por una minoría que dirija", "Platón: filósofo-rey y verdades eternas; Ortega: minoría por <b>actitud</b> y razón histórica"],
      ["<b>Descartes (T9)</b>", "Confianza en la razón", "Descartes: sujeto aislado y razón pura; Ortega: yo + circunstancia, razón vital"],
      ["<b>Kant (T12)</b>", "Lo que conocemos depende del sujeto", "Kant: formas universales a priori; Ortega: perspectivas históricas y vitales"],
      ["<b>Marx (T13)</b>", "El ser humano se hace históricamente", "Marx: clase y economía; Ortega: actitud, generaciones, creencias"],
      ["<b>Nietzsche (T14)</b>", "La vida es lo primero; crítica a la razón pura", "Nietzsche tiende a lo irracional; Ortega mantiene la razón (vital)"],
      ["<b>Husserl, Heidegger (T15)</b>", "El yo siempre está en un mundo; la vida como punto de partida", "Ortega: dimensión histórica y social; fue de los primeros en difundirlos en España"],
      ["<b>Unamuno</b>", "Interés por el hombre concreto y por España", "Unamuno: sentimiento y fe; Ortega: razón vital"]
    ]) +
    "<p>Una regla para elegir comparación: <b>si el texto habla de razón y vida</b>, compara con Descartes o Nietzsche; <b>si habla de punto de vista o verdad</b>, con los sofistas, Platón o Kant; <b>si habla de masas, minorías o sociedad</b>, con Platón, Marx o Rousseau (tema 11).</p>" +
    w("orden", "ordenobras") });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El examen de Historia de la Filosofía tiene dos tipos de ejercicio y Ortega aparece en los dos:</p>" +
    "<ul><li><b>Preguntas teóricas</b> (explica «yo soy yo y mi circunstancia»; razón vital e histórica; ideas y creencias; hombre-masa; relación con otro autor).</li>" +
    "<li><b>Comentario de texto</b> (un fragmento de Ortega: tema, ideas, relación con el autor y comparación).</li></ul>" +
    "<h5>Plantilla para una pregunta de desarrollo</h5>" +
    "<ol class='lam-pasos'><li><b>Contexto breve:</b> Ortega (1883–1955), pensador del Novecentismo, formado en Alemania, fundador de la <i>Revista de Occidente</i>.</li>" +
    "<li><b>Definición clara</b> del concepto con una frase tuya.</li>" +
    "<li><b>Desarrollo</b> con los términos del autor: circunstancia, perspectiva, razón vital e histórica, vida como realidad radical…</li>" +
    "<li><b>Contraste</b> con lo que critica: racionalismo (Descartes), relativismo, vitalismo irracional.</li>" +
    "<li><b>Conexión</b> con otra parte de su obra (masas, historia) o con otro autor.</li>" +
    "<li><b>Valoración</b> breve y razonada.</li></ol>" +
    "<h5>Errores que bajan la nota</h5>" +
    "<ul><li>Llamar a Ortega <b>relativista</b> o <b>vitalista irracional</b>.</li>" +
    "<li>Decir que «circunstancia» es el paisaje.</li>" +
    "<li>Decir que masa y minoría son <b>clases sociales</b>.</li>" +
    "<li>Mezclar a Zambrano (razón poética) con Zubiri (inteligencia sentiente).</li>" +
    "<li>Inventar una cita «literal». Si no recuerdas la frase, di «Ortega viene a decir que…».</li></ul>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf16a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
