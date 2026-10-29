/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 14: Nietzsche
   (parte A: teoría. Parte B, historia_fil_t14b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Apolíneo y dionisíaco: no son «bueno» y «malo»; la tragedia nace de su unión y Sócrates la mata → sección 2 + clasificar.
   2. Lenguaje y verdad («Sobre verdad y mentira»): la verdad como ejército de metáforas olvidadas → sección nueva 6 + comentario.
   3. Crítica a la metafísica: «mundo verdadero» de Platón que acaba en fábula; cristianismo = platonismo para el pueblo → sección nueva 7.
   4. Crítica a la ciencia y a Sócrates: la fe en la verdad como último ídolo → sección nueva 7.
   5. «Dios ha muerto»: diagnóstico cultural (no ateísmo de manual) y nihilismo (pasivo y activo) → sección 3 + comentario resuelto.
   6. Moral de señores y de esclavos: resentimiento, mala conciencia, ideal ascético; no es elogio de la violencia → sección 4 + clasificar.
   7. Voluntad de poder: no es «mandar sobre otros», es impulso de crecer y superarse → sección nueva 8.
   8. Superhombre (tres metamorfosis, último hombre) y eterno retorno (amor fati) → sección 5 + orden.
   9. Perspectivismo: no es «todo vale»; más perspectivas, mejor conocimiento → sección nueva 6.
   10. Comparaciones PAU (Platón, Kant, Marx, existencialismo) y malentendidos (nazismo, hermana) → sección nueva 9.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t14/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Vida, obra y estilo
  secciones[0] =
    "<h5>La vida de Nietzsche (1844–1900) paso a paso</h5>" +
    "<p>Nietzsche no es un filósofo de cátedra tranquilo: su vida es corta, solitaria y muy ligada a su obra. Conviene conocer cinco momentos, porque las preguntas de contexto de la PAU suelen salir de aquí.</p>" +
    "<ul><li><b>1844: nace en Röcken</b> (Sajonia, entonces Prusia), hijo y nieto de pastores luteranos. Su padre muere cuando él tiene 4 años. Crece, pues, rodeado de religión y de mujeres de su familia; después se enfrentará con toda esa herencia cristiana.</li>" +
    "<li><b>Estudios de filología clásica</b> en Bonn y Leipzig (la filología es el estudio de los textos antiguos: griego y latín). Descubre a <b>Schopenhauer</b>, que será su primer maestro, y conoce al compositor <b>Richard Wagner</b>.</li>" +
    "<li><b>1869: catedrático en Basilea</b> (Suiza) a los 24 años, algo casi inaudito. En 1872 publica su primer libro, <i>El nacimiento de la tragedia</i>, que escandaliza a los filólogos por mezclar filosofía, arte y polémica.</li>" +
    "<li><b>1879: deja la cátedra</b> por la mala salud (migrañas, problemas de vista). Hasta 1888 vive viajando (Suiza, Italia, Francia) en pensiones baratas y escribe casi todas sus obras mayores. Rompe con Wagner (hacia 1876–78) porque ve en él un artista que se acomoda al cristianismo y al nacionalismo.</li>" +
    "<li><b>1889: colapso en Turín</b> (según la anécdota, abrazado a un caballo maltratado por la calle). Pasa sus últimos años enfermo mental, cuidado por su madre y luego por su hermana Elisabeth; muere en <b>Weimar</b> en 1900.</li></ul>" +
    "<h5>Sus obras, ordenadas</h5>" +
    "<p>Se suelen distinguir tres etapas. No hace falta memorizar todos los títulos: sí saber a qué idea va unida cada obra, porque la PAU da un fragmento y pide reconocerlo.</p>" +
    tabla(["Etapa", "Obras", "Idea principal"], [
      ["<b>1.ª · Arte y cultura</b> (influencia de Schopenhauer y Wagner)", "<i>El nacimiento de la tragedia</i> (1872); <i>Sobre verdad y mentira en sentido extramoral</i> (escrito en 1873, publicado después de su muerte)", "Lo apolíneo y lo dionisíaco; la verdad como metáfora"],
      ["<b>2.ª · Crítica «ilustrada»</b>", "<i>Humano, demasiado humano</i> (1878); <i>Aurora</i> (1881); <i>La gaya ciencia</i> (1882)", "Sospecha de la metafísica y de la moral; «Dios ha muerto» (aforismo 125)"],
      ["<b>3.ª · Madurez</b>", "<i>Así habló Zaratustra</i> (1883–1885); <i>Más allá del bien y del mal</i> (1886); <i>La genealogía de la moral</i> (1887); <i>El crepúsculo de los ídolos</i> y <i>El anticristo</i> (escritos en 1888); <i>Ecce homo</i> (escrito en 1888)", "Superhombre, eterno retorno, voluntad de poder, moral de señores y esclavos"]
    ]) +
    w("orden", "cronologia") +
    "<h5>Cómo escribe y por qué importa</h5>" +
    "<p>Nietzsche escribe con <b>aforismos</b> (frases breves y contundentes), poemas, parábolas y gritos. No es descuido: cree que un sistema cerrado, como los de Platón o Kant, es una forma de <b>engañarse</b> con una falsa seguridad. Dice, más o menos, que desconfía de todos los que construyen sistemas. Además filosofa «a martillazos»: quiere comprobar si los ídolos (valores muy admirados) están huecos, golpeándolos y oyendo cómo suenan.</p>" +
    ojo("Una obra famosa, <i>La voluntad de poder</i>, <b>no la publicó Nietzsche</b>: es una recopilación de sus apuntes inéditos que montaron su hermana Elisabeth y su amigo Peter Gast tras su muerte (1901, ampliada en 1906). Por eso los especialistas la usan con cautela y la PAU se apoya sobre todo en las obras que él mismo publicó.");

  // ---------------------------------------------------------------- 2. Apolíneo y dionisíaco
  secciones[1] =
    "<h5>Dos dioses, dos formas de vivir</h5>" +
    "<p>Nietzsche toma dos dioses griegos como símbolos. <b>Apolo</b> es el dios de la luz, la medida, las formas bellas y los sueños. <b>Dioniso</b> es el dios del vino, la música, la fiesta y la embriaguez. Imagina la diferencia entre <b>ver una escultura perfecta</b> en un museo (todo claro, ordenado, cada cosa en su sitio) y <b>bailar en un concierto</b> con miles de personas, olvidándote de quién eres y fundiéndote con la multitud. Lo primero es apolíneo; lo segundo, dionisíaco.</p>" +
    tabla(["", "Apolíneo", "Dionisíaco"], [
      ["Símbolo", "El sueño: imágenes claras y bellas", "La embriaguez: el éxtasis y la fiesta"],
      ["Arte", "Escultura, pintura, poesía épica", "Música y danza"],
      ["Individuo", "Cada uno es distinto y tiene límites (<i>principio de individuación</i>)", "Los límites se disuelven; uno se funde con los demás y con la naturaleza"],
      ["Valores", "Medida, orden, forma, razón", "Instinto, desmesura, vida que brota, también dolor"],
      ["Peligro si falta el otro", "Frialdad y rigidez", "Caos y destrucción"]
    ]) +
    "<h5>La tragedia: la unión de los dos</h5>" +
    "<p>La <b>tragedia griega</b> (Esquilo, Sófocles) nació, según Nietzsche, del coro que cantaba y bailaba en honor de Dioniso (impulso dionisíaco) y de los actores que mostraban en escena imágenes claras de héroes y destinos (impulso apolíneo). El espectador veía el dolor de la vida, no lo escondía, pero la belleza de la forma le permitía <b>soportarlo y hasta celebrarlo</b>. Por eso los griegos, un pueblo muy sensible al sufrimiento, no se hundieron en el pesimismo: lo transformaron en arte.</p>" +
    "<h5>La muerte de la tragedia y la acusación a Sócrates</h5>" +
    "<p>La tesis polémica del libro es que la tragedia murió con <b>Eurípides</b> y, sobre todo, con <b>Sócrates</b> (Tema 2). El «socratismo» pretende que todo se puede entender, justificar y explicar con la razón («virtud = conocimiento», «solo es feliz el que sabe»). Para Nietzsche eso es un exceso apolíneo: la razón se convierte en <b>un tirano</b> que desprecia el instinto, la música y el cuerpo, y la cultura queda «anémica». Es el origen de lo que después criticará en Platón (Tema 3) y en el cristianismo: desconfiar de la vida real a favor de algo «más alto».</p>" +
    ejemplo("Aplica la idea: ¿dónde están hoy lo apolíneo y lo dionisíaco?", "Es un buen ejercicio de PAU explicar un concepto con un ejemplo propio:", [
      "<b>Apolíneo</b>: un examen bien preparado, un horario organizado, un museo de escultura.",
      "<b>Dionisíaco</b>: un festival de música, una fiesta de pueblo, el momento en que un grito colectivo en un estadio os une a todos.",
      "<b>Equilibrio</b>: un gran concierto bien organizado (orden en el escenario, éxtasis en el público): ambos impulsos a la vez, como en la tragedia.",
      "<b>Desequilibrio</b>: una vida de solo agendas (apolíneo) o de solo excesos (dionisíaco)."
    ]) +
    ojo("Apolíneo no es «bueno» ni dionisíaco «malo» (ni al revés). Nietzsche no los enfrenta: los necesita <b>juntos</b>. Lo que critica es que la cultura occidental, desde Sócrates, <b>sacrificó</b> el lado dionisíaco. Más adelante defenderá lo dionisíaco con fuerza, pero la idea de equilibrio de la tragedia está en su primera obra.") +
    w("clasificar", "apodio");

  // ---------------------------------------------------------------- 3. Dios ha muerto y nihilismo
  secciones[2] =
    "<h5>Quién dice «Dios ha muerto» y dónde</h5>" +
    "<p>La frase aparece en <i>La gaya ciencia</i> (1882, aforismo 125) y se repite en <i>Así habló Zaratustra</i>. La escena es famosa: <b>un loco</b> enciende una linterna a plena luz del día, corre por el mercado y grita «¡busco a Dios!». La gente, que no cree en Dios, se ríe de él. El loco responde que Dios ha muerto y que <b>lo hemos matado nosotros</b>. Pero, aclara, ha llegado «demasiado pronto»: la gente todavía no ha comprendido lo que ha hecho. La escena importa por una razón: <b>el que habla no es un creyente ni un ateo militante, sino un loco que describe un hecho cultural</b>.</p>" +
    "<h5>Qué significa exactamente</h5>" +
    "<ul><li><b>No es un argumento contra la existencia de Dios</b> (no demuestra nada). Es un <i>diagnóstico</i>: la fe en el Dios cristiano ya no sostiene de verdad la vida europea.</li>" +
    "<li><b>Lo que ha muerto es un fundamento</b>. Durante siglos, «Dios» garantizaba tres cosas: que hay un orden moral objetivo, que la vida tiene un sentido final, y que la verdad existe y es una. Sin esa garantía, ¿qué queda?</li>" +
    "<li><b>Quienes lo mataron</b> no son criminales: es la ciencia, la Ilustración, la crítica de la razón (Hume T10, Kant T12…), que fueron quitando a Dios el papel de explicarlo todo. Y lo siguen «matando» cada vez que obran sin contar con Él.</li></ul>" +
    "<h5>Nihilismo: la consecuencia</h5>" +
    "<p>Si no hay un fundamento absoluto, se abre el <b>nihilismo</b> (del latín <i>nihil</i>, «nada»): la sensación de que nada tiene valor ni sentido. Nietzsche distingue dos formas:</p>" +
    tabla(["", "Nihilismo pasivo", "Nihilismo activo"], [
      ["Actitud", "Cansancio y desánimo: «nada importa, todo da igual»", "Fuerza: «los viejos valores están muertos, los derribo para crear otros»"],
      ["Ejemplo", "El <b>último hombre</b> de Zaratustra: busca comodidad y seguridad, quiere vivir sin esfuerzo y «parpadea»", "El que rompe con la moral heredada y arriesga una nueva"],
      ["Valoración de Nietzsche", "Es el peligro real de la cultura moderna", "Es el paso necesario hacia la superación del nihilismo"]
    ]) +
    "<p>Nietzsche no es un nihilista que se alegre del vacío: se ve a sí mismo como el <b>médico de la cultura</b> que diagnostica la enfermedad (el nihilismo europeo) y propone una salida: la <b>transvaloración de todos los valores</b>, es decir, crear una escala de valores nueva que diga <i>sí</i> a la vida en vez de negarla.</p>" +
    ojo("«Dios ha muerto» <b>no significa</b> «Nietzsche demuestra que Dios no existe» ni «Nietzsche se alegra». Es el anuncio de un hecho cultural y, a la vez, un aviso: viene una época de nihilismo y hay que decidir si caeremos en él o crearemos algo nuevo.");

  // ---------------------------------------------------------------- 4. Moral de señores y de esclavos
  secciones[3] =
    "<h5>La genealogía: preguntar de dónde viene la moral</h5>" +
    "<p>La palabra <b>genealogía</b> significa «historia del origen» (como un árbol genealógico). Hasta Nietzsche, los filósofos discutían <i>qué</i> es bueno. Él pregunta otra cosa: <b>¿de dónde sale la idea misma de «bueno» y «malo»? ¿Quién la inventó y a quién le conviene?</b> Su método es sospechar: tras los valores más respetables puede haber intereses, miedos o resentimientos disfrazados. Por eso se le llama, junto a Marx y Freud, uno de los «maestros de la sospecha».</p>" +
    "<h5>Dos morales, dos formas de valorar</h5>" +
    tabla(["", "Moral de señores", "Moral de esclavos"], [
      ["Quién valora", "Los fuertes, nobles y sanos, desde su propia plenitud", "Los débiles y oprimidos, desde su impotencia"],
      ["Pareja de valores", "<b>Bueno / malo</b>: bueno = lo noble, fuerte y orgulloso; malo = lo vulgar y pobre", "<b>Bueno / malvado</b>: malvado = el fuerte que oprime; bueno = el que no hace daño"],
      ["Qué se valora", "Fuerza, orgullo, valentía, creatividad, afirmación de uno mismo", "Humildad, paciencia, compasión, obediencia, igualdad"],
      ["Origen del valor", "Se dice «sí» a uno mismo primero (valor activo)", "Se dice «no» al otro primero (valor reactivo, nacido del <b>resentimiento</b>)"]
    ]) +
    "<p>La clave es la palabra <b>resentimiento</b> (en alemán, <i>Ressentiment</i>). Imagina a alguien que no puede vengarse de quien le humilla: en lugar de actuar, <b>imagina una venganza moral</b>. Decide que lo que él no puede (ser fuerte) es «malo», y que su impotencia (ser inofensivo) es «virtud». Es la conocida fábula de la zorra y las uvas: «no es que no llegue, es que están verdes». El esclavo no dice «soy débil», dice «soy bueno». Así se invierten los valores.</p>" +
    "<h5>Del resentimiento a la culpa y al ideal ascético</h5>" +
    "<ul><li><b>Mala conciencia.</b> Cuando una sociedad ya no puede descargar sus instintos agresivos hacia fuera, los vuelve contra sí misma: aparece el sentimiento de culpa. Nietzsche observa que en alemán <i>Schuld</i> significa «culpa» y también «deuda»: la culpa nace de sentirse deudor.</li>" +
    "<li><b>Ideal ascético.</b> El sacerdote da sentido al sufrimiento diciendo «sufres por tus pecados, pero tu sufrimiento tiene premio en otra vida». No cura al enfermo: le da un motivo para seguir sufriendo. Para Nietzsche es la señal de que el ser humano prefiere querer <i>la nada</i> antes que no querer nada.</li>" +
    "<li><b>El cristianismo</b> es, para Nietzsche, la forma triunfante de la moral de esclavos: predica humildad, compasión, perdón y esperanza en otro mundo. Y la ética moderna del deber (Kant, Tema 12) y la compasión universal siguen, a su juicio, esa misma lógica.</li></ul>" +
    ojo("Nietzsche <b>no elogia la crueldad</b> ni el abuso del poderoso. Su «señor» es un tipo humano (el que se afirma y crea valores), no una clase social ni una raza. Y no pide volver a la antigüedad: pide una <i>nueva</i> moral de la afirmación. Es un error de lectura grave asociarlo al nazismo (ver sección 9).") +
    w("clasificar", "morales");

  // ---------------------------------------------------------------- 5. Superhombre y eterno retorno
  secciones[4] =
    "<h5>El superhombre (Übermensch)</h5>" +
    "<p>El superhombre aparece en <i>Así habló Zaratustra</i>, una obra mezcla de poema, parábola y evangelio invertido. Zaratustra baja de la montaña y dice a la gente: «Yo os enseño el superhombre. El hombre es algo que debe ser superado» (traducción habitual del Prólogo). Aclaraciones esenciales:</p>" +
    "<ul><li><b>No es un tipo físico, ni una raza, ni un dictador.</b> «Über» significa «por encima de» o «más allá de». Es el ser humano que <b>se supera a sí mismo</b>, que crea valores propios en lugar de repetir los heredados.</li>" +
    "<li><b>Es fiel «a la tierra»</b>: afirma esta vida, este cuerpo y este mundo, en vez de esperar otro mundo prometido. Es una respuesta directa a la muerte de Dios.</li>" +
    "<li><b>Es un ideal, un horizonte</b>, no un resultado ya alcanzado. El «último hombre» (cómodo, mediocre, sin ambición) es su contrario.</li></ul>" +
    "<h5>Las tres metamorfosis del espíritu</h5>" +
    "<p>En el primer discurso de <i>Zaratustra</i>, Nietzsche explica con una parábola cómo se llega a crear valores propios, en tres etapas:</p>" +
    tabla(["Etapa", "Símbolo", "Qué dice", "Qué significa"], [
      ["1.ª", "<b>Camello</b>", "«Tú debes»", "El espíritu carga con el deber y las normas heredadas; es obediente, resistente y respetuoso."],
      ["2.ª", "<b>León</b>", "«Yo quiero»", "Se rebela contra el «tú debes» y conquista la libertad; sabe decir «no», pero todavía no crea."],
      ["3.ª", "<b>Niño</b>", "«Sí»", "Inocencia y juego: empieza algo nuevo, crea valores propios y dice sí a la vida."]
    ]) +
    "<p>La idea es muy didáctica: <b>no basta con rebelarse</b> (el león); hace falta además <b>crear</b> (el niño). Un adolescente que se limita a llevar la contraria a todo sigue dependiendo de aquello que rechaza.</p>" +
    w("orden", "metamorfosis") +
    "<h5>El eterno retorno</h5>" +
    "<p>El pensamiento aparece en <i>La gaya ciencia</i> (aforismo 341, «El peso más grande») y reaparece en <i>Zaratustra</i>. Nietzsche propone un experimento mental: supón que un demonio te dijera que <b>esta misma vida, con cada alegría, cada dolor y cada detalle, tendrás que vivirla otra vez e innumerables veces más</b>, sin ningún cambio. ¿Te lanzarías al suelo rechinando los dientes y maldiciendo, o responderías «nunca oí nada más divino»?</p>" +
    "<ul><li><b>Es una prueba de afirmación</b>: quien deseara que su vida se repitiera exactamente así, la ha aceptado entera. Esa aceptación se llama <b><i>amor fati</i></b> («amor al destino»).</li>" +
    "<li><b>Es una brújula para decidir</b>: pregúntate, ante cada elección, «¿querría repetir esto eternamente?». Así convierte cada instante en algo decisivo, no en un trámite hacia el más allá.</li>" +
    "<li>Nietzsche lo formula también como idea sobre el mundo (un tiempo cíclico), pero la PAU insiste sobre todo en su función ética y existencial.</li></ul>" +
    ojo("El eterno retorno <b>no es</b> la reencarnación ni una promesa de premio: no hay jueces ni recompensa. Es la contraposición exacta de la vida cristiana, que vale por lo que ocurrirá <i>después</i>; aquí la vida vale por lo que es <i>ahora</i>.");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Lenguaje, verdad y perspectivismo", html:
    "<h5>«Sobre verdad y mentira en sentido extramoral» (1873)</h5>" +
    "<p>Es un texto breve, escrito en 1873 y publicado tras su muerte. Su pregunta: ¿de dónde sale la idea de «verdad»? Su respuesta, muy brusca: de una necesidad de <b>supervivencia</b>. El intelecto humano es débil (no tiene garras ni cuernos) y su arma es la <b>ficción</b>: formamos conceptos para entendernos y vivir en sociedad. La famosa frase (traducción habitual, varía según la edición):</p>" +
    "<blockquote class='cita-fil'><em>«¿Qué es entonces la verdad? Un ejército móvil de metáforas, metonimias, antropomorfismos […]. Las verdades son ilusiones de las que se ha olvidado que lo son; metáforas gastadas […], monedas que han perdido su troquelado y ya no se consideran monedas, sino metal.»</em></blockquote>" +
    "<p>Paso a paso:</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Una cosa y una palabra no son lo mismo.</b> Entre un estímulo (algo que vemos) y la palabra hay saltos: el nervio, la imagen, el sonido. Cada salto es una <i>metáfora</i> (una transposición).</li>" +
    "<li><b>Los conceptos olvidan las diferencias.</b> La palabra «hoja» sirve para millones de hojas distintas: ignora lo propio de cada una. Todo concepto nace de <i>igualar lo desigual</i>.</li>" +
    "<li><b>Se olvida el origen.</b> Tras mucho uso, una sociedad olvida que sus palabras fueron metáforas, y las toma por la realidad misma. Eso se llama «verdad». Como una moneda tan gastada que ya no se ve la efigie.</li>" +
    "<li><b>Resultado:</b> «verdad» es un acuerdo útil, no un espejo de lo real. Mentir sería romper el acuerdo, no traicionar a las cosas.</li></ol>" +
    ejemplo("Ejemplo cotidiano: la palabra «árbol»", "Para explicarlo con tus propias palabras:", [
      "Ves un pino, un roble, un almendro: no hay dos iguales.",
      "La palabra «árbol» los agrupa e ignora todo lo que los distingue: <b>iguala lo desigual</b>.",
      "Nadie recuerda ya el salto de la imagen a la palabra; parece que «árbol» es lo que las cosas son.",
      "Conclusión de Nietzsche: nuestro lenguaje no copia el mundo, lo <b>interpreta y simplifica</b>."
    ]) +
    "<h5>Perspectivismo</h5>" +
    "<p>De esa crítica sale el <b>perspectivismo</b>: no hay conocimiento «desde ninguna parte». Todo ser que conoce lo hace desde un cuerpo, una historia, un interés y un lenguaje, es decir, desde una <b>perspectiva</b>. Una frase suya muy citada (de sus apuntes póstumos): «no hay hechos, solo interpretaciones» (traducción habitual). Más matizado, en <i>La genealogía de la moral</i> (III, 12) dice, parafraseado: cuantos más ojos, distintos ojos, sepamos usar para mirar una cosa, más completo será nuestro concepto de ella y más «objetiva» nuestra visión.</p>" +
    ojo("El perspectivismo <b>no equivale a «todo vale»</b>. Nietzsche no dice que cualquier opinión sea tan buena como otra, sino que no existe una única mirada absoluta y que la objetividad se logra <i>sumando</i> perspectivas, no suprimiéndolas. Tampoco es lo mismo que el perspectivismo de Ortega (Tema 16), aunque ambos parten de que conocemos desde un punto de vista.") +
    "<h5>La gramática y los ídolos</h5>" +
    "<p>Nietzsche añade que el lenguaje nos engaña: la gramática nos hace ver «sujetos» que hacen cosas (el rayo «produce» la luz, yo «pienso»), cuando en realidad hay solo procesos. De ahí su sospecha del «yo pienso» cartesiano (Tema 9) y su frase, que parafraseamos, de que no nos libraremos de Dios mientras sigamos creyendo en la gramática." });

  nuevas.push({ h: "7. Crítica de la metafísica, la religión y la ciencia", html:
    "<h5>La metafísica: el «mundo verdadero» que acaba en fábula</h5>" +
    "<p>Para Nietzsche, toda la metafísica occidental repite un mismo gesto: <b>inventa un «mundo verdadero» y degrada el mundo real</b>. Es el esquema platónico (Tema 3): el mundo sensible es apariencia, el mundo de las Ideas es lo verdadero. En <i>El crepúsculo de los ídolos</i> resume esa historia en pasos (aquí en versión muy resumida):</p>" +
    tabla(["Paso", "El «mundo verdadero»…"], [
      ["Platón", "…es accesible al sabio y virtuoso (el filósofo vive en él)"],
      ["Cristianismo", "…se promete para después de la muerte, a quien lo merezca"],
      ["Kant", "…es inalcanzable e indemostrable, pero sigue siendo un deber creerlo"],
      ["Positivismo", "…es desconocido y, por tanto, ya no obliga ni consuela"],
      ["Final", "…es una idea inútil, ya refutada: queda eliminada. Pero con él <b>desaparece también el «mundo aparente»</b>: solo queda el mundo único, y hay que aprender a vivir en él"]
    ]) +
    "<p>La conclusión: hemos creído en un mundo ficticio porque <b>sufrir</b> en este mundo es duro y necesitamos un consuelo. Cambiar de metafísica no basta; hay que cambiar de actitud: <b>afirmar el único mundo que hay</b>.</p>" +
    "<h5>La religión: platonismo para el pueblo</h5>" +
    "<p>En el prólogo de <i>Más allá del bien y del mal</i> (1886), Nietzsche dice que el cristianismo es «platonismo para el pueblo»: la misma doctrina de los dos mundos, pero repartida en forma de promesa popular. Resumen para la PAU: <b>metafísica, religión y moral forman un solo sistema</b>: un mundo «verdadero» arriba, un deber abajo, y la vida real como lugar de paso. Si se cae uno, los demás se tambalean; por eso «Dios ha muerto» es también la muerte de la metafísica y de la moral tradicional.</p>" +
    "<h5>Sócrates, decadente</h5>" +
    "<p>En <i>El crepúsculo de los ídolos</i> («El problema de Sócrates») retoma la crítica de <i>El nacimiento de la tragedia</i>: Sócrates, feo y racionalista, es para Nietzsche un síntoma de <b>decadencia</b>. Su fórmula «razón = virtud = felicidad» trata el instinto como enemigo; es una enfermedad que se presenta como remedio. Se trata de una valoración muy polémica: la PAU pide exponerla, no necesariamente compartirla.</p>" +
    "<h5>La ciencia: no es el último refugio</h5>" +
    "<p>Alguien podría pensar que, muerto Dios, la ciencia ocupa su lugar. Nietzsche responde que <b>no</b>: la ciencia moderna sigue creyendo, sin demostrarlo, que <b>la verdad vale más que nada</b>. Esa fe es heredera del ideal ascético (preferir una verdad única a la vida). Por eso la ciencia es, para él, el último escondite de la creencia en el «mundo verdadero» y no una vía de salvación. Tampoco la desprecia: quiere una ciencia «gaya», alegre, que sepa que es una interpretación entre otras (perspectivismo).</p>" +
    "<h5>Qué critica y qué propone</h5>" +
    tabla(["Ámbito", "Qué critica", "Qué propone"], [
      ["Metafísica", "Dos mundos, uno «verdadero»", "Un solo mundo; fidelidad a la tierra"],
      ["Moral", "Moral de esclavos (humildad, compasión, culpa)", "Transvaloración: valores que afirman la vida"],
      ["Religión", "Platonismo para el pueblo; ideal ascético", "Asumir la muerte de Dios y crear valores"],
      ["Conocimiento y ciencia", "Verdad absoluta; fe en lo «objetivo»", "Perspectivismo; ciencia como interpretación"],
      ["Racionalismo", "Sócrates y Platón: exceso apolíneo", "Equilibrio con lo dionisíaco (el cuerpo, el arte)"]
    ]) });

  nuevas.push({ h: "8. La voluntad de poder", html:
    "<p>La <b>voluntad de poder</b> (<i>Wille zur Macht</i>) es la idea con la que Nietzsche intenta explicar <b>qué es la vida</b>. Se suele malinterpretar, así que atiende:</p>" +
    "<ul><li><b>No significa «querer mandar sobre los demás».</b> «Poder» (<i>Macht</i>) es más bien <i>capacidad de crecer, de expandirse y de superarse</i>. Un árbol que busca más luz, un deportista que mejora cada día, un artista que crea… todos expresan voluntad de poder.</li>" +
    "<li><b>Corrige a Schopenhauer</b> (su primer maestro). Schopenhauer decía que la esencia del mundo es una «voluntad de vivir» ciega que solo produce sufrimiento, y recomendaba negarla. Nietzsche responde que la vida no es mero deseo de conservarse, sino <b>impulso de más</b> y que hay que afirmarla, también con su dolor.</li>" +
    "<li><b>Es el criterio para valorar.</b> Un valor es bueno si <i>aumenta</i> la vitalidad y la capacidad de crear; es malo si la debilita. Así justifica su crítica a la moral de esclavos: niega la vida.</li>" +
    "<li><b>El cuerpo es la «gran razón».</b> En <i>Zaratustra</i> afirma (paráfrasis) que el cuerpo es más sabio que el alma y que «alma» es solo una palabra para algo del cuerpo. Esto es lo opuesto al dualismo de Platón (Tema 3) y de Descartes (Tema 9).</li>" +
    "<li><b>Se aplica al conocimiento.</b> Conocer es interpretar, y toda interpretación es una forma de dominar la realidad y hacerla manejable: por eso la verdad es «voluntad de poder» y no un espejo (enlaza con la sección 6).</li></ul>" +
    ejemplo("Conectar las ideas del autor", "Un buen comentario relaciona los conceptos. Mira cómo se enlazan:", [
      "<b>Voluntad de poder</b>: la vida es impulso de crecer y de superarse.",
      "<b>Moral de esclavos</b>: la niega, porque convierte la debilidad en virtud.",
      "<b>Muerte de Dios</b>: caen los viejos valores; vuelve a estar abierta la creación.",
      "<b>Superhombre</b>: es el que ejerce esa voluntad creando valores nuevos.",
      "<b>Eterno retorno</b>: la prueba de que se afirma la vida entera."
    ]) +
    ojo("Los nazis usaron de forma tramposa el nombre de Nietzsche. La edición de <i>La voluntad de poder</i> hecha por su hermana Elisabeth (casada con un antisemita) falseó el sentido de su obra. Nietzsche despreciaba el antisemitismo y el nacionalismo alemán; la versión «nazi» es una distorsión histórica.") });

  nuevas.push({ h: "9. Comparaciones, vigencia y malentendidos", html:
    "<p>En la PAU de Madrid, el comentario de texto pide a veces <b>comparar</b> al autor con otro. Estas son las comparaciones más rentables:</p>" +
    tabla(["Autor", "Punto de contacto", "Diferencia con Nietzsche"], [
      ["Platón (T3)", "Ambos hablan de dos mundos… para Nietzsche, un error", "Platón desprecia el cuerpo y lo sensible; Nietzsche los exalta (fidelidad a la tierra)"],
      ["Sócrates (T2)", "Ambos desconfían de las opiniones aceptadas", "Sócrates cree que el saber lleva a la virtud; Nietzsche lo ve como decadencia"],
      ["Kant (T12)", "Ambos critican los límites de la razón", "Kant fundamenta la moral en el deber universal; Nietzsche la ve como moral de esclavos; Kant conserva la cosa en sí, Nietzsche la elimina"],
      ["Marx (T13)", "Los dos critican la religión y sospechan de los valores establecidos", "Marx: la religión nace de condiciones materiales injustas y se cambia con la revolución colectiva; Nietzsche: nace del resentimiento y se supera con la creación individual de valores"],
      ["Sartre (T15)", "Sin Dios, el ser humano debe crear sus valores", "Sartre parte de la libertad radical; Nietzsche de la voluntad de poder y el eterno retorno"],
      ["Ortega (T16)", "Parten de la vida y de la perspectiva", "Ortega busca una razón vital y una verdad que suma perspectivas; Nietzsche es mucho más radical con la verdad"]
    ]) +
    "<h5>Vigencia</h5>" +
    "<p>Nietzsche inaugura la filosofía contemporánea de la <b>sospecha</b>: tras los grandes valores puede haber intereses. Influye en el existencialismo (T15), en Heidegger, en Foucault (poder y genealogía) y en buena parte de la filosofía y la literatura del siglo XX. Su defensa del cuerpo, del arte y de la creación sigue siendo un reto para quien cree que la razón basta.</p>" +
    "<h5>Cinco malentendidos frecuentes</h5>" +
    "<ol><li>«Nietzsche era nazi o antisemita». <b>Falso</b>: los despreciaba; la tergiversación vino de su hermana y de la propaganda posterior.</li>" +
    "<li>«El superhombre es una raza superior». <b>Falso</b>: es un ideal de superación personal y creación de valores.</li>" +
    "<li>«La voluntad de poder es querer dominar a otros». <b>Falso</b>: es impulso de crecimiento y superación.</li>" +
    "<li>«Dios ha muerto: Nietzsche lo celebra». <b>Falso</b>: lo diagnostica con preocupación y propone qué hacer.</li>" +
    "<li>«Perspectivismo = todo vale». <b>Falso</b>: más perspectivas, más conocimiento.</li></ol>" +
    "<h5>Valoración crítica</h5>" +
    "<p>Para una respuesta con matiz, puedes añadir una valoración personal: su diagnóstico de la crisis de valores y su crítica a la moral como instrumento de poder siguen siendo fecundos; pero su desprecio a la compasión, su elitismo y la dificultad de fundar valores solo en la voluntad individual son discutibles (¿qué impide a alguien crear «valores» que dañen a otros?). La PAU valora que expliques el pensamiento antes de criticarlo.</p>" +
    w("emparejar", "obras") });

  nuevas.push({ h: "10. Comentario de texto resuelto: «Dios ha muerto»", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Nietzsche, <em>La gaya ciencia</em>, aforismo 125; traducción habitual, que varía según la edición; se omiten pasajes con […]):<br><em>«¿No habéis oído hablar de aquel loco que en pleno día encendió una linterna y echó a correr por la plaza gritando sin cesar: ¡Busco a Dios! […] ¿Adónde se ha ido Dios? ¡Os lo voy a decir! Lo hemos matado: ¡vosotros y yo! […] Dios ha muerto. Dios sigue muerto. Y nosotros lo hemos matado.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Nietzsche (1844–1900), <i>La gaya ciencia</i> (1882, ampliada en 1887), obra de la etapa intermedia en la que sospecha de la metafísica y de la moral. Es la primera aparición de su célebre sentencia.</li>" +
    "<li><b>2. Tema.</b> El anuncio de la muerte de Dios como acontecimiento cultural de Europa.</li>" +
    "<li><b>3. Idea principal.</b> Dios, entendido como fundamento de valores y de sentido, ha dejado de ser creíble para la cultura moderna, y los propios europeos lo han «matado», aunque aún no lo sepan.</li>" +
    "<li><b>4. Ideas secundarias y términos.</b> (a) «Loco» con linterna a plena luz: quien ve lo que los demás aún no ven (los demás son creyentes de costumbre o ateos superficiales). (b) «Lo hemos matado»: la ciencia y la razón crítica, no un crimen puntual. (c) «Dios sigue muerto»: el hecho es irreversible. (d) En el resto del aforismo, la pregunta de cómo consolarnos: la muerte de Dios exige que seamos nosotros los que creemos valores.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es el punto de apoyo de su pensamiento posterior: desaparecidos Dios y el mundo verdadero, surge el <b>nihilismo</b>; la respuesta es la <b>transvaloración</b> de los valores, el <b>superhombre</b> (que crea valores) y el <b>eterno retorno</b> (que afirma la vida). Explica también su crítica a la metafísica y a la moral de esclavos, ligadas al Dios cristiano.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Marx (T13): ambos critican la religión, pero Marx la explica por las condiciones sociales («opio del pueblo») y Nietzsche por el resentimiento y la debilidad; el marxismo busca una solución colectiva; Nietzsche, individual. También con Kant (T12): Kant conserva a Dios como postulado de la razón práctica; Nietzsche considera esa operación el último disfraz del dios muerto.</li>" +
    "<li><b>7. Valora y concluye.</b> El texto describe bien una secularización que sigue en marcha. Su límite: no explica cómo fundar valores comunes sin Dios (¿basta la creación individual?). Es una pregunta abierta que recogerá el existencialismo.</li></ol>" +
    ojo("Errores típicos: (1) decir que Nietzsche «demuestra» que Dios no existe; (2) pensar que se alegra; (3) olvidar el nihilismo y la transvaloración; (4) no citar la obra ni el aforismo; (5) comparar sin precisar en qué coinciden y en qué se separan.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica lo apolíneo y lo dionisíaco", "Respuesta modelo:", [
      "<b>Contexto.</b> <i>El nacimiento de la tragedia</i> (1872), primera obra de Nietzsche.",
      "<b>Definiciones.</b> Apolíneo: orden, forma, medida, razón individualizadora; dionisíaco: instinto, embriaguez, fusión colectiva.",
      "<b>Tesis.</b> La tragedia griega los unía; Sócrates y la razón la mataron al imponer lo apolíneo.",
      "<b>Relación.</b> Anticipa la crítica a la metafísica y a la moral."
    ]) +
    ejemplo("Pregunta 2. «Dios ha muerto» y nihilismo", "Respuesta modelo:", [
      "<b>Frase.</b> <i>La gaya ciencia</i>, aforismo 125: diagnóstico cultural, no demostración.",
      "<b>Sentido.</b> La fe en Dios, garantía de valores y sentido, ha perdido fuerza en Europa por la ciencia y la razón.",
      "<b>Consecuencia.</b> Nihilismo: pasivo (desánimo, último hombre) o activo (crear valores).",
      "<b>Propuesta.</b> Transvaloración de todos los valores; superhombre."
    ]) +
    ejemplo("Pregunta 3. Moral de señores y de esclavos", "Respuesta modelo:", [
      "<b>Obra.</b> <i>La genealogía de la moral</i> (1887): método genealógico.",
      "<b>Señores.</b> Bueno/malo; fuerza, orgullo, afirmación.",
      "<b>Esclavos.</b> Bueno/malvado; resentimiento; humildad, compasión.",
      "<b>Crítica.</b> El cristianismo universaliza la moral de esclavos y genera mala conciencia.",
      "<b>Valoración.</b> Propone una moral de afirmación de la vida."
    ]) +
    ejemplo("Pregunta 4. Superhombre y eterno retorno", "Respuesta modelo:", [
      "<b>Obra.</b> <i>Así habló Zaratustra</i>.",
      "<b>Superhombre.</b> Quien crea valores propios, fiel a la tierra; tres metamorfosis: camello, león, niño.",
      "<b>Eterno retorno.</b> Prueba de afirmación de la vida; <i>amor fati</i>.",
      "<b>Relación.</b> Respuesta al nihilismo tras la muerte de Dios."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf14a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
