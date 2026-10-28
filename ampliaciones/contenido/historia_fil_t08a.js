/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 8: El Renacimiento y el nacimiento de la ciencia moderna
   (parte A: teoría. Parte B, historia_fil_t08b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Teocentrismo frente a antropocentrismo: no es «ateísmo», es otro centro de atención → sección 1 + humanismo (nueva 6) + tabla.
   2. Geocentrismo frente a heliocentrismo: quién propuso qué y por qué importó (no solo astronomía) → sección 2 + tabla.
   3. Copérnico (hipótesis matemática, 1543) frente a Galileo (descripción verdadera, con telescopio) → sección 2 + ojo.
   4. El caso Galileo (1616, 1633): qué pasó de verdad; no fue quemado ni torturado → nueva 8.
   5. Qué es el método científico moderno: matemáticas + experimentación; hipótesis, deducción y contraste → sección 3 + nueva 7 (con cifras).
   6. «El libro de la naturaleza está escrito en lenguaje matemático» (Galileo, El Ensayador) → sección 3 + comentario.
   7. Maquiavelo: la «verdad efectiva de la cosa» y la autonomía de la política; «el fin justifica los medios» como caricatura → sección 4 + nueva 9.
   8. Virtù y fortuna; el zorro y el león; mejor ser temido que amado (si hay que elegir) → nueva 9.
   9. Cómo cambia la imagen del ser humano y por qué se pasa a la pregunta del conocimiento (Descartes, T9) → sección 5 + mapa.
   10. Comentario de texto: Maquiavelo, El Príncipe, cap. XV (la verdad efectiva) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t8/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. El Renacimiento
  secciones[0] =
    "<h5>Qué cambió en el mundo entre 1450 y 1550</h5>" +
    "<p>Una mentalidad no cambia por capricho: cambia cuando cambia la vida. En la segunda mitad del siglo XV y la primera del XVI ocurren, casi a la vez, varias cosas que sacuden Europa. Conviene saberlas porque en el comentario de texto <b>sitúan al autor</b>.</p>" +
    "<ul><li><b>Hacia 1450:</b> Gutenberg perfecciona la <b>imprenta</b> de tipos móviles. Los libros dejan de ser un lujo copiado a mano y las ideas circulan con una rapidez nueva.</li>" +
    "<li><b>1453:</b> los turcos toman <b>Constantinopla</b>. Muchos sabios bizantinos huyen a Italia con manuscritos griegos: se recupera a Platón y a otros autores en su lengua original.</li>" +
    "<li><b>1492:</b> Colón llega a <b>América</b>. El mundo conocido se agranda y las ideas antiguas sobre la geografía quedan en entredicho.</li>" +
    "<li><b>1517:</b> Lutero inicia la <b>Reforma protestante</b>: la unidad religiosa de la Europa occidental se rompe.</li>" +
    "<li><b>1543:</b> se publican <i>Sobre las revoluciones de las esferas celestes</i> (Copérnico) y <i>Sobre la estructura del cuerpo humano</i> (Vesalio, anatomía basada en la disección).</li></ul>" +
    "<p>Fíjate en el patrón: <b>nuevos textos</b> (imprenta, manuscritos griegos), <b>nuevas tierras</b> (América), <b>nuevas creencias</b> (Reforma) y <b>nuevos instrumentos</b> (telescopio, disección). Cuando tantas «verdades» heredadas se tambalean, es lógico que la gente empiece a fiarse más de su propia razón y de su propia experiencia.</p>" +
    "<h5>Teocentrismo y antropocentrismo: una diferencia de acento</h5>" +
    tabla(["", "Mentalidad medieval (T6–T7)", "Mentalidad renacentista"], [
      ["Centro del interés", "Dios (teocentrismo)", "El ser humano y su dignidad (antropocentrismo)"],
      ["Modelo de sabiduría", "La Biblia y los Padres de la Iglesia; la escolástica", "Los clásicos grecolatinos, leídos directamente (humanismo)"],
      ["Idea de esta vida", "Camino hacia la vida eterna", "Vale por sí misma: se puede ser feliz y creador aquí"],
      ["Lugar de la razón", "Colabora con la fe (Agustín, Tomás)", "Se aprecia por su capacidad de investigar y crear"],
      ["Ideal de persona", "El santo, el monje, el teólogo", "El hombre «universal»: artista, sabio y hombre de acción (Leonardo)"]
    ]) +
    ojo("Antropocentrismo <b>no</b> significa ateísmo. Casi todos los humanistas eran creyentes. Lo que cambia es el <b>acento</b>: sin negar a Dios, se valora más al ser humano, su libertad y su capacidad de conocer y transformar el mundo. Es un error muy típico escribir «en el Renacimiento se abandona la religión».");

  // ---------------------------------------------------------------- 2. Revolución astronómica
  secciones[1] =
    "<h5>El universo que se heredaba</h5>" +
    "<p>La imagen del cielo que se daba por buena venía de Aristóteles (tema 4) y de <b>Ptolomeo</b> (siglo II d. C., autor del <i>Almagesto</i>). Era un universo ordenado en capas: en el centro, la <b>Tierra inmóvil</b>; alrededor, esferas de cristal que arrastraban la Luna, el Sol, los planetas y las estrellas. Tenía dos ventajas: coincidía con lo que <b>vemos</b> (nadie siente moverse la Tierra y el Sol parece cruzar el cielo) y encajaba con la idea de que el ser humano ocupaba un lugar privilegiado. Su inconveniente: para explicar que los planetas a veces «retroceden» en el cielo hacía falta añadir círculos sobre círculos (los epiciclos), con cálculos cada vez más enrevesados.</p>" +
    "<h5>Copérnico: poner el Sol en el centro</h5>" +
    "<p><b>Nicolás Copérnico</b> (1473–1543, Polonia) propuso en <i>Sobre las revoluciones de las esferas celestes</i> (1543) que el <b>Sol</b> está en el centro y que la Tierra es un planeta más, con dos movimientos: gira sobre sí misma cada día (por eso parece que el Sol se mueve) y da una vuelta al Sol cada año. Con ello las trayectorias «hacia atrás» de los planetas se explican con facilidad: es como cuando adelantas a otro coche en la autopista y el que adelantas parece ir hacia atrás.</p>" +
    ojo("Copérnico <b>no</b> inventó la idea desde cero: Aristarco de Samos (siglo III a. C.) ya la había propuesto, pero fue olvidada. Y el sistema de Copérnico todavía conservaba <b>órbitas circulares</b> perfectas y una esfera de estrellas fijas; las órbitas <b>elípticas</b> las formulará Kepler (1571–1630) en 1609. Tampoco fue Copérnico quien chocó con la Inquisición: murió en 1543 y su libro se suspendió «hasta ser corregido» en 1616.") +
    "<h5>Galileo: mirar por el telescopio y atreverse a decirlo</h5>" +
    "<p><b>Galileo Galilei</b> (1564–1642) no inventó el telescopio (se fabricaba ya en Holanda), pero en 1609 construyó uno mejor y lo apuntó al cielo. En 1610 publicó <i>El mensajero sideral</i> con lo que había visto: montañas y cráteres en la <b>Luna</b> (el cielo no es perfecto ni liso), cuatro <b>lunas de Júpiter</b> (no todo gira alrededor de la Tierra), las fases de Venus (que encajan con un Venus que gira alrededor del Sol) y muchas más estrellas de las que se veían a simple vista.</p>" +
    tabla(["", "Copérnico (1473–1543)", "Galileo (1564–1642)"], [
      ["Cuándo", "Obra de 1543", "Observaciones de 1609–1610; <i>Diálogo</i> de 1632"],
      ["Con qué argumenta", "Sencillez y orden matemático del modelo", "Observaciones con telescopio y razonamiento físico"],
      ["Cómo ve el heliocentrismo", "Hipótesis matemática útil para calcular (al principio)", "Descripción <b>verdadera</b> del universo"],
      ["Consecuencia", "Libro suspendido «hasta ser corregido» en 1616", "Proceso y retractación en 1633"]
    ]) +
    "<h5>Por qué fue también un problema filosófico</h5>" +
    "<p>Si la Tierra es un planeta más, tres cosas se tambalean a la vez: (1) la <b>física de Aristóteles</b>, que distinguía un mundo terrestre cambiante de un cielo perfecto e inmutable; (2) la lectura <b>literal</b> de pasajes bíblicos (como el de Josué deteniendo el Sol), y (3) la sensación de que el ser humano vive en el <b>centro</b> del universo. De ahí que no fuera solo un debate de astrónomos.</p>";

  // ---------------------------------------------------------------- 3. Método
  secciones[2] =
    "<h5>Qué es un método y por qué fue la verdadera revolución</h5>" +
    "<p>Un <b>método</b> es un camino ordenado para llegar a conocimientos fiables. Los griegos habían observado mucho y razonado muy bien, pero la ciencia moderna añade dos cosas que casi no se habían hecho de forma sistemática. Piensa en cómo averiguarías si un coche gasta más con las ventanillas abiertas: el método antiguo sería «razonar» sobre ello; el moderno, <b>hacer la prueba dos veces, cambiando solo esa condición, y medir los litros</b>.</p>" +
    ejemplo("Los dos ingredientes", "Qué aporta cada uno", [
      "<b>Matemáticas:</b> las leyes se escriben con números y fórmulas, así que se pueden <b>medir, predecir y comprobar</b>. «Los cuerpos pesados caen más deprisa» es una idea vaga; «la distancia es proporcional al cuadrado del tiempo» es una ley que se puede contrastar.",
      "<b>Experimentación:</b> no basta con mirar; se <b>provoca</b> el fenómeno en condiciones controladas, variando una cosa cada vez. Si la hipótesis predice un resultado y no sale, se descarta.",
      "<b>Resultado:</b> un conocimiento que cualquiera puede repetir y que no depende de la autoridad de nadie, ni siquiera de Aristóteles."
    ]) +
    "<h5>La frase de Galileo, comentada</h5>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Galileo, <em>El Ensayador</em>, 1623; traducción española habitual, abreviada, que varía según la edición):<br><em>«La filosofía está escrita en ese grandísimo libro que tenemos abierto ante los ojos, quiero decir, el universo; pero no se puede entender si antes no se aprende su lengua y se conocen los caracteres en que está escrito. Está escrito en lengua matemática, y sus caracteres son triángulos, círculos y otras figuras geométricas.»</em></blockquote>" +
    "<p>Tres ideas: (1) la naturaleza es <b>inteligible</b>, tiene un orden que se puede descifrar; (2) ese orden es <b>matemático</b>; (3) por tanto, quien quiera entender la naturaleza debe aprender matemáticas, no solo leer a los antiguos. Galileo distingue además entre lo que se puede <b>medir</b> (tamaño, figura, movimiento) y lo que depende de quien lo percibe (sabores, olores, colores); la ciencia se ocupará de lo primero. Esa distinción reaparecerá en Descartes (tema 9) y en Locke (tema 10).</p>" +
    ojo("«Observar» y «experimentar» no son sinónimos. Aristóteles observaba muy bien (por ejemplo, animales), pero casi nunca <b>manipulaba</b> las condiciones. Experimentar es preguntar a la naturaleza con una situación preparada y esperar su respuesta medible.");

  // ---------------------------------------------------------------- 4. Maquiavelo
  secciones[3] =
    "<h5>Quién fue Maquiavelo y por qué escribe</h5>" +
    "<p><b>Nicolás Maquiavelo</b> (1469–1527) fue un funcionario de la república de <b>Florencia</b>: durante años negoció con reyes, papas y mercenarios. Cuando los Médici recuperaron el poder (1512) lo apartaron, lo encarcelaron un tiempo y se retiró al campo. Allí escribió, hacia <b>1513</b>, <i>El Príncipe</i>, que no se publicó hasta 1532, cinco años después de su muerte. Italia estaba dividida en ciudades-Estado débiles, invadidas por Francia y España; a Maquiavelo le preocupaba cómo <b>conseguir y conservar un Estado fuerte</b>.</p>" +
    "<h5>El método de Maquiavelo: partir de la realidad</h5>" +
    "<p>El capítulo XV de <i>El Príncipe</i> lo dice con claridad: prefiere ir a «la verdad efectiva de la cosa» antes que a «la imaginación de ella». Los autores anteriores (Platón en la <i>República</i>, Agustín en <i>La Ciudad de Dios</i>, Tomás con su ley natural) describían cómo <b>debería</b> ser un buen gobierno. Maquiavelo describe cómo <b>funciona</b> el poder en la práctica, igual que otros estaban describiendo cómo funciona la naturaleza. Por eso se le considera un fundador de la <b>política moderna</b>.</p>" +
    tabla(["", "Política medieval", "Maquiavelo"], [
      ["Punto de partida", "Un ideal moral y religioso (ley natural, bien común)", "La experiencia: historia y trato con los hombres"],
      ["Pregunta", "¿Cómo debe gobernar un príncipe justo?", "¿Cómo se consigue y se conserva el poder?"],
      ["Relación con la moral", "La política está subordinada a la moral", "La política tiene su propia lógica, autónoma"],
      ["Criterio de éxito", "Cumplir la ley de Dios y el bien común", "Mantener el Estado estable y seguro"]
    ]) +
    ojo("«El fin justifica los medios» no aparece así en <i>El Príncipe</i>. Resume una idea suya (en los asuntos de Estado se juzga por el resultado), pero Maquiavelo <b>no</b> dice que todo valga: aconseja evitar ser odiado y desaconseja la crueldad inútil. Y tampoco dice que la moral sea falsa; dice que el príncipe que quiera ser siempre bueno entre malos «se arruinará».");

  // ---------------------------------------------------------------- 5. Nuevo lugar del ser humano
  secciones[4] =
    "<h5>De la síntesis medieval a la pregunta moderna</h5>" +
    "<p>Pon juntos los cuatro cambios: (1) el ser humano ocupa el <b>centro del interés</b> (humanismo); (2) la Tierra deja de ser el centro del universo (Copérnico, Galileo); (3) la naturaleza se estudia con <b>matemáticas y experimentos</b>, no solo con citas de autoridades; (4) el poder político se explica por <b>causas humanas</b> y no por un orden divino (Maquiavelo). Es paradójico: el ser humano gana importancia como sujeto que conoce y decide, y a la vez pierde el centro físico del cosmos.</p>" +
    "<p>La síntesis de fe y razón de Agustín y Tomás (temas 6 y 7) ya no basta como punto de partida. Surge una pregunta nueva, que organiza los temas 9 a 12: <b>si la autoridad ya no garantiza la verdad, ¿cómo puede la razón, por sí sola, llegar a un conocimiento seguro?</b> Dos respuestas competirán: el <b>racionalismo</b> (Descartes, tema 9: la razón y las ideas innatas) y el <b>empirismo</b> (Locke y Hume, tema 10: la experiencia), y entre medias Rousseau (tema 11) piensa la sociedad desde el ser humano; hasta que Kant (tema 12) intente unir razón y experiencia.</p>" +
    ejemplo("Un esquema para recordarlo", "De la Edad Media a la Edad Moderna", [
      "<b>Antes:</b> Dios en el centro → la verdad se apoya en la autoridad (Biblia, Aristóteles, la Iglesia).",
      "<b>Después:</b> el ser humano investiga → la verdad se busca con la razón y la experiencia.",
      "<b>Pregunta resultante:</b> ¿cómo conocemos con seguridad? (Descartes, Locke, Hume, Kant)."
    ]);

  // ---------------------------------------------------------------- Secciones nuevas
  var nuevas = [];

  nuevas.push({ h: "6. El humanismo: la dignidad del ser humano", html:
    "<p>El <b>humanismo</b> fue un movimiento cultural que defendía estudiar las «humanidades» (gramática, retórica, historia, poesía y filosofía moral) leyendo a los clásicos en su lengua original y sin filtro medieval. Algunas figuras que conviene reconocer:</p>" +
    tabla(["Autor", "Fechas", "Obra y aportación"], [
      ["Petrarca", "1304–1374", "Considerado el «padre» del humanismo; recupera a los clásicos latinos."],
      ["Pico della Mirandola", "1463–1494", "<i>Discurso sobre la dignidad del hombre</i> (1486): el ser humano no tiene naturaleza fija y se hace a sí mismo."],
      ["Erasmo de Róterdam", "1466–1536", "<i>Elogio de la locura</i> (1511): sátira de la ignorancia y los abusos; defensa de un cristianismo más interior."],
      ["Tomás Moro", "1478–1535", "<i>Utopía</i> (1516): una sociedad imaginaria que critica la injusticia de la Europa de su tiempo."],
      ["Leonardo da Vinci", "1452–1519", "Pintor, ingeniero y científico: el ideal del hombre «universal»."]
    ]) +
    "<p>La idea más famosa del humanismo es la de Pico. Parafraseando su texto: Dios coloca a Adán en el mundo sin darle un lugar, un rostro ni una función fijos, y le dice que será él mismo quien, con su libertad, elija ser algo inferior (como un animal) o elevarse hasta lo divino. Así, la <b>dignidad</b> humana consiste en poder <b>hacerse a sí mismo</b>. Compara: en la visión medieval cada uno ocupa un lugar en el orden querido por Dios; aquí cada uno lo construye.</p>" +
    ojo("Pico no está contra la religión: su ser humano libre sigue siendo criatura de Dios. Y el humanismo no inventa la razón: la <b>reorienta</b> hacia el mundo y hacia el ser humano.") });

  nuevas.push({ h: "7. El método de Galileo paso a paso, con un experimento", html:
    "<p>El método de Galileo se suele resumir como <b>hipotético-deductivo</b>: se parte de una observación, se formula una hipótesis, se deducen sus consecuencias medibles y se contrastan con un experimento. Veámoslo con su problema más famoso: la <b>caída de los cuerpos</b>.</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Problema.</b> Aristóteles sostenía que los cuerpos pesados caen más deprisa. ¿Es cierto?</li>" +
    "<li><b>Idea simplificadora.</b> Galileo razona que, si se elimina la resistencia del aire, todos los cuerpos caerían igual. Pero caer es demasiado rápido para medirlo con los relojes de la época.</li>" +
    "<li><b>Experimento.</b> Hace rodar bolas por un <b>plano inclinado</b>, que «frena» la caída y permite medirla (con un reloj de agua). Mide cuánto recorre la bola en tiempos iguales.</li>" +
    "<li><b>Hipótesis matemática.</b> Si el movimiento es uniformemente acelerado, la distancia recorrida es proporcional al <b>cuadrado del tiempo</b>.</li>" +
    "<li><b>Deducción comprobable.</b> En tiempos iguales sucesivos, los trozos recorridos están en la proporción de los <b>números impares</b>: 1 : 3 : 5 : 7…</li>" +
    "<li><b>Contraste.</b> Los resultados medidos coinciden con la predicción: la hipótesis se mantiene (de momento).</li></ol>" +
    ejemplo("Compruébalo con números", "Si desde el reposo la distancia total es proporcional a t²", [
      "En 1, 2, 3 y 4 unidades de tiempo, la distancia total es proporcional a 1, 4, 9 y 16.",
      "El trozo recorrido en cada unidad de tiempo es la diferencia: 1, 3, 5 y 7.",
      "Esos son los números impares consecutivos: la <b>regla de los impares</b> de Galileo. Una consecuencia medible que confirma la hipótesis."
    ]) +
    "<p>Fíjate en lo importante: la ley (distancia ∝ tiempo²) <b>no depende del peso</b> del cuerpo, lo que contradice a Aristóteles. Y la ciencia ha ganado una forma de decidir quién tiene razón: no el prestigio, sino el <b>experimento</b>.</p>" +
    ojo("Es una leyenda que Galileo dejara caer bolas desde la Torre de Pisa (no hay prueba de ello). Sus experimentos reales fueron con el plano inclinado. Tampoco ocurrió que la ciencia «naciera de golpe» con Galileo: hubo precedentes (Leonardo, Copérnico, Kepler) y después vendrán Bacon (inducción, <i>Novum Organum</i>, 1620), Descartes (deducción) y Newton.") +
    tabla(["", "Física aristotélica", "Ciencia de Galileo"], [
      ["Cómo se conoce", "Observación cualitativa y razonamiento", "Medición y experimento"],
      ["Lenguaje", "Conceptos y causas finales", "Matemáticas y leyes"],
      ["Cielo y Tierra", "Dos mundos distintos", "Mismas leyes en todo el universo"],
      ["Árbitro final", "La autoridad de los antiguos", "El contraste con la experiencia"]
    ]) });

  nuevas.push({ h: "8. Ciencia e Iglesia: el caso Galileo", html:
    "<p>Para entender el caso Galileo hay que evitar dos simplificaciones: «la Iglesia odiaba la ciencia» y «Galileo era un mártir quemado». La realidad es más precisa.</p>" +
    "<ul><li><b>1610:</b> Galileo publica sus observaciones. Astrónomos jesuitas las confirman; también tiene detractores académicos.</li>" +
    "<li><b>1616:</b> la Iglesia declara que el heliocentrismo, como descripción verdadera del mundo, es contrario a la Escritura; el libro de Copérnico se suspende «hasta ser corregido». Se pide a Galileo que no lo defienda como verdad.</li>" +
    "<li><b>1632:</b> Galileo publica el <i>Diálogo sobre los dos máximos sistemas del mundo</i> (el ptolemaico y el copernicano), donde el defensor del sistema antiguo queda en ridículo.</li>" +
    "<li><b>1633:</b> el Santo Oficio le juzga; con 69 años, se <b>retracta</b> y es condenado a arresto domiciliario, que cumple hasta su muerte en <b>1642</b>.</li>" +
    "<li><b>1638:</b> aun así consigue publicar en Holanda sus <i>Discursos sobre dos nuevas ciencias</i>, con su física del movimiento.</li></ul>" +
    ojo("Galileo <b>no</b> fue quemado (eso le pasó a Giordano Bruno en 1600, por razones teológicas más amplias) ni encarcelado en una mazmorra. La frase «<i>Eppur si muove</i>» («y sin embargo se mueve») es una tradición posterior, no un hecho comprobado.") +
    "<p>Lo importante para la filosofía: el choque no fue «ciencia contra fe» en abstracto, sino sobre <b>quién decide</b> lo que se sabe de la naturaleza. Galileo defendía que la Biblia enseña cómo se va al cielo, no cómo va el cielo; es decir, que fe y ciencia tienen ámbitos distintos. Esa separación será una de las bases de la modernidad.</p>" });

  nuevas.push({ h: "9. Maquiavelo con más detalle: virtù, fortuna y razón de Estado", html:
    "<p>Para comentar <i>El Príncipe</i> basta con dominar unas pocas ideas, bien explicadas.</p>" +
    "<ul><li><b>Realismo político.</b> Parte de cómo son los hombres: según Maquiavelo, en general son ingratos, volubles e interesados. Un gobernante que confíe en su bondad se arruina.</li>" +
    "<li><b>Virtù.</b> No es «virtud moral» cristiana, sino la <b>capacidad, energía y habilidad</b> del gobernante para actuar con eficacia, aprovechar las ocasiones y mantener el poder.</li>" +
    "<li><b>Fortuna.</b> El azar y las circunstancias. Maquiavelo la compara con un río que se desborda: no se puede impedir, pero con diques construidos a tiempo se reducen los daños. La fortuna decide quizá la mitad de lo que ocurre; la otra mitad depende de la <b>virtù</b>.</li>" +
    "<li><b>El zorro y el león.</b> El príncipe debe saber ser como el zorro (para reconocer las trampas) y como el león (para espantar a los lobos): astucia y fuerza.</li>" +
    "<li><b>¿Amado o temido?</b> Lo ideal sería ser ambas cosas; como es difícil, aconseja ser temido, pero no odiado. Respeta los bienes y las mujeres de los súbditos, porque nada provoca más odio.</li>" +
    "<li><b>Razón de Estado.</b> Cuando está en juego la supervivencia del Estado, el gobernante puede verse obligado a actuar contra la moral corriente (engañar, usar la fuerza). Se juzga por los <b>resultados</b>.</li></ul>" +
    tabla(["Concepto", "Significado en Maquiavelo", "Error típico"], [
      ["Virtù", "Capacidad y habilidad políticas", "Confundirla con la virtud moral cristiana"],
      ["Fortuna", "Circunstancias y azar", "Pensar que no se puede hacer nada frente a ella"],
      ["Verità effettuale", "La realidad tal como funciona", "Creer que niega toda moral"],
      ["Autonomía de la política", "Tiene su propia lógica", "Decir que «la política no tiene reglas»"]
    ]) +
    "<p><b>Otra obra importante:</b> los <i>Discursos sobre la primera década de Tito Livio</i> (compuestos hacia 1513–1519), donde Maquiavelo admira la <b>república</b> romana y defiende que el conflicto entre grupos puede, bien encauzado, fortalecer la libertad. No fue, por tanto, un simple defensor del tirano: fue un republicano que escribió para un príncipe.</p>" });

  nuevas.push({ h: "10. Mapa del tema: relaciones con otros autores", html:
    "<p>En la PAU se pide relacionar y comparar. Estas son las comparaciones más rentables:</p>" +
    tabla(["Autor / tema", "Relación"], [
      ["Aristóteles (T4)", "Su física y su geocentrismo son el blanco de la nueva ciencia; en la política, Aristóteles hacía del bien común el fin de la polis, mientras Maquiavelo parte del poder real."],
      ["Platón (T3)", "Platón proponía la ciudad ideal gobernada por filósofos; Maquiavelo critica a quienes se imaginan «repúblicas que nunca se han visto». Los humanistas, además, redescubren a Platón en su lengua original."],
      ["Agustín (T6)", "Historia lineal bajo el plan de Dios; en Maquiavelo, el poder se explica por causas humanas (virtù y fortuna)."],
      ["Tomás de Aquino (T7)", "Política sometida a la ley natural; Maquiavelo separa política y moral. Tomás integraba a Aristóteles en la fe; la nueva ciencia rompe con la física aristotélica."],
      ["Descartes (T9)", "Continúa la reflexión sobre el método, ahora desde la razón (deducción y matemáticas); Bacon (1561–1626) había propuesto partir de la experiencia (inducción)."],
      ["Locke y Hume (T10)", "Desarrollan el camino de la experiencia que abre la nueva ciencia."],
      ["Rousseau (T11)", "Piensa la sociedad y el poder desde el ser humano, no desde un orden divino: un camino que abre Maquiavelo."]
    ]) +
    "<h5>Cuadro-resumen: lo que hay que saber</h5>" +
    tabla(["Ámbito", "Idea clave"], [
      ["Mentalidad", "Del teocentrismo al antropocentrismo; humanismo: vuelta a los clásicos y dignidad del ser humano."],
      ["Astronomía", "Copérnico (1543): heliocentrismo; Galileo: lo defiende como verdadero con el telescopio (1610) y es condenado en 1633."],
      ["Método", "Matemáticas + experimentación controlada; el libro de la naturaleza está escrito en lenguaje matemático."],
      ["Política", "Maquiavelo (<i>El Príncipe</i>, 1513): realismo; la política como técnica autónoma, separada de la moral."],
      ["Consecuencia", "El ser humano pierde el centro del cosmos y gana protagonismo como sujeto que conoce: nace el problema del conocimiento (Descartes)."]
    ]) });

  nuevas.push({ h: "11. Comentario de texto resuelto: la verdad efectiva de la cosa", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Maquiavelo, <em>El Príncipe</em>, cap. XV; traducción española habitual, abreviada, que varía según la edición):<br><em>«Siendo mi intención escribir algo útil para quien lo entienda, me ha parecido más conveniente ir directamente a la verdad efectiva de la cosa que a la imaginación de ella. Muchos se han imaginado repúblicas y principados que jamás se han visto ni se ha sabido que existieran de verdad; porque hay tanta distancia de cómo se vive a cómo se debería vivir, que quien deja lo que se hace por lo que se debería hacer aprende más bien su ruina que su preservación.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Nicolás Maquiavelo (1469–1527), <i>El Príncipe</i>, escrito hacia 1513 y publicado en 1532, en la Florencia del Renacimiento, dividida en ciudades-Estado débiles.</li>" +
    "<li><b>2. Tema.</b> El método que debe seguir quien reflexiona sobre la política: partir de lo real, no de lo ideal.</li>" +
    "<li><b>3. Idea principal.</b> Hay que estudiar el poder como es («verdad efectiva»), porque quien actúa según cómo «debería» ser el mundo en vez de cómo es, se arruina.</li>" +
    "<li><b>4. Términos e ideas secundarias.</b> (a) «Verdad efectiva de la cosa»: la realidad tal como funciona. (b) «Imaginación»: los modelos ideales, como la ciudad de Platón o la Ciudad de Dios. (c) «Distancia entre cómo se vive y cómo se debería vivir»: el problema de la política. (d) «Ruina / preservación»: el criterio de acierto es conservar el Estado.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Con su idea de virtù (actuar con eficacia), con la fortuna, con la autonomía de la política respecto de la moral y con su consejo de ser «zorro y león». Todo parte del mismo realismo.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Platón (T3): para Platón la política debe imitar el Bien y gobiernan los filósofos; para Maquiavelo importa lo que funciona. Con Tomás (T7): la ley humana debe ajustarse a la ley natural; Maquiavelo no subordina el poder a la moral religiosa. Con Galileo: el mismo giro hacia la realidad medida y observada frente al ideal heredado.</li>" +
    "<li><b>7. Valora y concluye.</b> Aporta una descripción lúcida del poder y funda la ciencia política; pero se le critica que, si el éxito es el único criterio, se justifique cualquier abuso. Su influencia llega a la teoría moderna del Estado.</li></ol>" +
    ojo("Errores típicos: (1) decir que Maquiavelo defiende «todo vale»; (2) no explicar qué es la «verdad efectiva»; (3) olvidar situarlo en la Florencia renacentista; (4) comparar con Platón sin decir en qué difieren.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema. Otro comentario habitual es el de Galileo sobre el libro de la naturaleza (sección 3): tema, tres ideas (inteligibilidad, lenguaje matemático, necesidad de aprenderlo), relación con el método y comparación con Aristóteles.</p>" });

  nuevas.push({ h: "12. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Del teocentrismo al antropocentrismo", "Respuesta modelo:", [
      "<b>Definir.</b> Teocentrismo: Dios como centro del pensamiento y de la vida (Edad Media). Antropocentrismo: el ser humano, su razón y su creatividad, en el centro (Renacimiento).",
      "<b>Explicar.</b> Humanismo: recuperación de los clásicos grecolatinos; la dignidad humana (Pico della Mirandola). Se valora la vida terrena. No se niega a Dios.",
      "<b>Relacionar.</b> Con la síntesis de Agustín y Tomás y con la ciencia de Galileo.",
      "<b>Concluir.</b> Prepara la pregunta moderna sobre el conocimiento."
    ]) +
    ejemplo("Pregunta 2. El método científico moderno", "Respuesta modelo:", [
      "<b>Definir.</b> Combina matemáticas y experimentación controlada.",
      "<b>Explicar.</b> Ley matemática, hipótesis, deducción de consecuencias medibles, experimento (plano inclinado). Frase del libro de la naturaleza.",
      "<b>Relacionar.</b> Frente a la física de Aristóteles (cualitativa y sin experimentos).",
      "<b>Concluir.</b> La autoridad es sustituida por el contraste con la experiencia."
    ]) +
    ejemplo("Pregunta 3. Copérnico y Galileo", "Respuesta modelo:", [
      "<b>Contexto.</b> Geocentrismo de Ptolomeo y Aristóteles frente al heliocentrismo de Copérnico (1543).",
      "<b>Diferencia.</b> Copérnico lo propone como hipótesis matemática; Galileo lo defiende como verdadero con el telescopio (1610) y es obligado a retractarse (1633).",
      "<b>Alcance filosófico.</b> Cuestiona la física aristotélica y el lugar privilegiado del ser humano."
    ]) +
    ejemplo("Pregunta 4. Maquiavelo y la política", "Respuesta modelo:", [
      "<b>Idea.</b> Realismo: analiza el poder tal como es, no como debería ser.",
      "<b>Aportación.</b> La política es una técnica autónoma, separada de la moral y la religión; conceptos de virtù y fortuna.",
      "<b>Relación y crítica.</b> Frente a Tomás (ley natural); riesgo de justificar cualquier abuso; fundamento de la ciencia política moderna."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Une, clasifica y ordena</h5>" +
    w("clasificar", "mentalidad") + w("emparejar", "autores") + w("orden", "camino") +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf8a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
