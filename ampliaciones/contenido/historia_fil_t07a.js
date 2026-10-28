/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 7: Santo Tomás y la escolástica
   (parte A: teoría. Parte B, historia_fil_t07b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Fe y razón: armonía sin contradicción; verdades solo reveladas (misterios) y verdades que la razón también alcanza → sección 3 + clasificar.
   2. Las cinco vías: estructura común (hecho → no regreso infinito → primer término) → sección 4 + widget filo_vias + ordenar.
   3. Distinguir las cinco vías entre sí (la 3.ª y la 4.ª se confunden) y qué conclusión tiene cada una → sección 4 + emparejar.
   4. Por qué las vías son «a posteriori» y Tomás rechaza el argumento ontológico de Anselmo → sección 4 (ojo).
   5. La cadena no puede ser infinita: se habla de orden de causas, no de «lo primero en el tiempo» → sección 4.
   6. Ley natural: ni ley física ni ley religiosa; primer precepto, preceptos derivados y los cuatro tipos de ley → sección 5 + emparejar.
   7. Esencia y existencia; Dios creador (frente al Primer motor de Aristóteles) y analogía → sección nueva 6.
   8. Ser humano y conocimiento: alma forma del cuerpo e inmortal; abstracción; frente a Agustín y a Averroes → sección nueva 7.
   9. Ética y política: felicidad como bienaventuranza, virtudes cardinales y teologales, ley injusta → sección nueva 8.
   10. Comentario de texto (vía del movimiento) y comparación con Agustín, Aristóteles, Hume y Kant → comentario resuelto + mapa.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t7/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. La escolástica
  secciones[0] =
    "<h5>Quién fue Tomás de Aquino (hacia 1224/25–1274)</h5>" +
    "<p>Tomás nació hacia 1224 o 1225 en <b>Roccasecca</b>, cerca de Aquino (Italia), en una familia noble. Con unos 19 años entró en la <b>orden de los dominicos</b>, una orden de frailes dedicados a predicar y estudiar, y su familia intentó impedírselo. Estudió en Nápoles, en París y en Colonia, donde tuvo como maestro a <b>Alberto Magno</b>. Enseñó sobre todo en la <b>Universidad de París</b>, el gran centro intelectual de la época. Murió en 1274 en el monasterio de <b>Fossanova</b>, de camino al Concilio de Lyon, con unos 50 años. Fue canonizado en 1323.</p>" +
    "<p>Escribió muchísimo. Las dos obras que hay que conocer son:</p>" +
    "<ul><li><b><i>Suma contra los gentiles</i></b> (hacia 1259–1265): defiende la fe cristiana ante quienes no la comparten (judíos, musulmanes) usando sobre todo argumentos de la razón.</li>" +
    "<li><b><i>Suma teológica</i></b> (hacia 1265–1273, inacabada): su gran obra. Una «suma» es un resumen ordenado de todo el saber sobre un tema. De ella salen casi todos los textos de la PAU: las cinco vías (primera parte, cuestión 2, artículo 3) y la ley natural (primera parte de la segunda parte, cuestiones 90 a 97).</li></ul>" +
    "<p>También escribió comentarios a Aristóteles y opúsculos como <i>El ente y la esencia</i>.</p>" +
    "<h5>Dónde se hace la escolástica: la universidad</h5>" +
    "<p>La palabra «escolástica» viene de <i>schola</i>. Es la filosofía hecha en las <b>escuelas</b> y, sobre todo, en las <b>universidades</b> que nacen en los siglos XII y XIII (París, Oxford, Bolonia). Allí enseñan dos tipos de frailes, los <b>dominicos</b> (Alberto Magno, Tomás) y los <b>franciscanos</b>. Un estudiante universitario de entonces no aprendía de memoria: <b>leía</b> un libro de autoridad (la Biblia, Aristóteles), <b>planteaba cuestiones</b> sobre él y las <b>discutía</b> en público.</p>" +
    "<h5>El método: así se escribe un artículo de la <i>Suma</i></h5>" +
    "<p>Cada tema de la <i>Suma teológica</i> se divide en cuestiones, y cada cuestión en <b>artículos</b>, que siguen siempre el mismo esquema. Si lo conoces, puedes leer cualquier texto de Tomás sin perderte:</p>" +
    tabla(["Parte del artículo", "Qué hace", "Ejemplo (¿Existe Dios?)"], [
      ["<b>Planteamiento</b>", "Una pregunta con respuesta «sí» o «no»", "¿Existe Dios?"],
      ["<b>«Parece que no…»</b>", "Objeciones: los argumentos de quienes piensan lo contrario", "El mal en el mundo; la naturaleza se explica sin Dios"],
      ["<b><i>Sed contra</i></b> («en cambio…»)", "Una autoridad que apunta a la respuesta de Tomás", "Una frase de la Biblia: «Yo soy el que soy»"],
      ["<b>«Respondo diciendo que…»</b>", "Su solución razonada (aquí están las cinco vías)", "Hay cinco caminos para probarlo"],
      ["<b>Respuestas a las objeciones</b>", "Una a una, desmonta cada objeción", "El mal solo se explica si existe un bien que falta"]
    ]) +
    ojo("La escolástica no «copia» a las autoridades: las <b>discute</b>. Por eso el método es una forma de pensar con razones, y por eso se parece mucho a un comentario de texto: tesis, objeciones, respuesta. Si en la PAU te piden la <b>diferencia con la patrística</b>: la patrística (Agustín) defiende y fundamenta la fe frente al mundo pagano; la escolástica la <b>sistematiza</b> con método y con Aristóteles.");

  // ---------------------------------------------------------------- 2. La recuperación de Aristóteles
  secciones[1] =
    "<h5>Cómo llegó Aristóteles a Europa</h5>" +
    "<p>Durante siglos Europa occidental solo conoció de Aristóteles algunos escritos de lógica. Su obra completa (la <i>Física</i>, la <i>Metafísica</i>, <i>Acerca del alma</i>, la <i>Ética</i>…) llegó entre los siglos XII y XIII por dos vías: a través del <b>mundo árabe y judío</b> (traducciones del árabe al latín, sobre todo en <b>Toledo</b>) y mediante traducciones directas del griego. Los comentaristas más influyentes fueron <b>Avicena</b> (980–1037), <b>Averroes</b> (1126–1198, de Córdoba, «el Comentador») y el judío <b>Maimónides</b> (1138–1204, también de Córdoba).</p>" +
    "<p>Para un universitario de París era un descubrimiento enorme: un sistema completo para explicar la naturaleza, el movimiento, el alma y la ética <b>partiendo solo de la razón</b>, escrito por un pagano. Esto producía un problema: ¿cómo encajaba con la fe cristiana?</p>" +
    "<h5>Tres reacciones ante Aristóteles</h5>" +
    tabla(["Postura", "Quién", "Qué piensa"], [
      ["<b>Rechazo / desconfianza</b>", "Sectores de la teología tradicional (agustinismo)", "Aristóteles es pagano y puede alejar de la fe. Condenas de ciertas tesis aristotélicas en París."],
      ["<b>Averroísmo latino</b>", "Siger de Brabante y otros profesores de artes", "Siguen a Averroes casi al pie de la letra (por ejemplo, un único intelecto para todos). Se les acusaba de defender una «doble verdad»: verdadero para la razón, aunque falso para la fe."],
      ["<b>Síntesis tomista</b>", "Alberto Magno y, sobre todo, Tomás", "Aristóteles tiene mucho de verdadero, y lo verdadero no puede contradecir la fe. Se acepta y se corrige donde choca con ella."]
    ]) +
    "<p>En 1277 el obispo de París condenó una lista de tesis, entre ellas muchas averroístas y algunas cercanas a Tomás. Pero con el tiempo el pensamiento de Tomás se convirtió en el gran modelo de la teología católica.</p>" +
    "<h5>Qué toma Tomás de Aristóteles (y qué cambia)</h5>" +
    tabla(["Tema", "Aristóteles (T4)", "Tomás de Aquino"], [
      ["Realidad", "Hilemorfismo: sustancia = materia + forma", "Lo acepta y lo aplica también al ser humano"],
      ["Conocimiento", "Se parte de los sentidos y se abstrae", "Lo acepta («nada hay en el entendimiento que antes no estuviera en los sentidos»)"],
      ["Dios", "Primer motor inmóvil, acto puro; no crea el mundo", "Dios creador libre de todo de la nada; tiene providencia"],
      ["Ética", "Felicidad = actividad racional virtuosa", "Felicidad plena = ver a Dios (bienaventuranza)"],
      ["Alma", "Forma del cuerpo", "Forma del cuerpo, pero además inmortal"]
    ]) +
    ojo("Tomás no es un «aristotélico a secas»: <b>cristianiza</b> a Aristóteles. Cuando en la PAU te pidan la relación con Aristóteles, di siempre qué conserva (los conceptos: forma y materia, causas, potencia y acto, virtudes) y qué cambia (Dios creador y providente, alma inmortal, felicidad completa tras la muerte).");

  // ---------------------------------------------------------------- 3. Fe y razón
  secciones[2] =
    "<h5>El problema: dos fuentes de verdad</h5>" +
    "<p>Un cristiano medieval tiene dos fuentes de conocimiento: la <b>fe</b>, que acepta lo que Dios ha revelado (la Biblia y la tradición), y la <b>razón</b>, la capacidad natural de pensar y de partir de la experiencia. La pregunta es: ¿qué pasa si se contradicen? ¿Cuál manda?</p>" +
    "<h5>La respuesta de Tomás, en cuatro ideas</h5>" +
    "<ol><li><b>Hay verdades que solo se conocen por revelación</b>, porque la razón no puede alcanzarlas: los <b>misterios</b>, como la Trinidad (un Dios en tres personas), la Encarnación o la resurrección.</li>" +
    "<li><b>Hay verdades que la razón puede alcanzar</b> y que además Dios ha revelado: la existencia de Dios, su unidad, el alma inmortal. Tomás las llama <b>preámbulos de la fe</b>, porque la fe se apoya en ellas. Se revelan también porque la razón es lenta y muchos no tendrían tiempo ni capacidad de llegar a ellas con claridad.</li>" +
    "<li><b>No puede haber contradicción</b>: la fe y la razón vienen del mismo Dios, que es la Verdad. Si parece que se contradicen, o la razón se ha equivocado en algún paso, o se ha entendido mal la revelación.</li>" +
    "<li><b>Cada una tiene su método</b>: la filosofía parte de la razón natural y de la experiencia; la teología (la «doctrina sagrada») parte de lo revelado. La teología puede usar la filosofía como instrumento, como se suele decir con la imagen tradicional de la filosofía «al servicio» de la teología.</li></ol>" +
    tabla(["", "Verdades de razón", "Verdades de fe (misterios)"], [
      ["<b>Cómo se conocen</b>", "Con la razón natural, desde la experiencia", "Solo por la revelación, aceptadas por la fe"],
      ["<b>Ejemplos</b>", "Dios existe, es uno; el alma es inmortal (preámbulos)", "La Trinidad, la Encarnación, la resurrección de los muertos"],
      ["<b>Con la razón</b>", "Se pueden demostrar", "Se pueden aclarar o defender, pero no demostrar"]
    ]) +
    "<h5>Tomás frente a Agustín y frente a los averroístas</h5>" +
    tabla(["", "San Agustín (T6)", "Santo Tomás", "Averroístas latinos"], [
      ["<b>Fe y razón</b>", "«Cree para entender»: la fe va delante y guía la razón", "Dos caminos distintos y armónicos hacia la misma verdad", "Parecen separarlas hasta contradecirse (la «doble verdad»)"],
      ["<b>Filosofía de base</b>", "Platón / neoplatonismo", "Aristóteles", "Aristóteles según Averroes"],
      ["<b>Conocimiento</b>", "Iluminación divina", "Abstracción desde los sentidos", "Abstracción, con intelecto único"]
    ]) +
    ojo("Cuidado con dos errores clásicos: (1) decir que para Tomás la razón <b>sustituye</b> a la fe: no, los misterios solo se aceptan por fe; (2) decir que son caminos «opuestos»: son <b>distintos y armónicos</b>. En un examen, la fórmula buena es: «ambos son caminos hacia la misma verdad, con ámbitos propios, y nunca pueden contradecirse».") +
    w("clasificar", "fe_razon");

  // ---------------------------------------------------------------- 4. Las cinco vías
  secciones[3] =
    "<h5>¿Qué es probar la existencia de Dios para Tomás?</h5>" +
    "<p>Para Tomás, la existencia de Dios <b>no es evidente para nosotros</b>: no la vemos de golpe, como que dos más dos son cuatro. Pero sí se puede <b>demostrar</b>, y se hace <b>desde los efectos</b>: partimos de cosas que sí vemos en el mundo y razonamos hacia su causa. A este modo de razonar (de los efectos a la causa, desde la experiencia) se le llama <b>a posteriori</b>. Es el método aristotélico: todo conocimiento empieza en los sentidos.</p>" +
    ojo("Tomás <b>rechaza el argumento ontológico</b> de San Anselmo (1033–1109), que decía: «Dios es aquello mayor que lo cual nada puede pensarse; si solo existiera en la mente, se podría pensar algo mayor, uno que además existiera; luego existe». Tomás responde que de una idea no se pasa a una existencia real, y que nosotros no conocemos la esencia de Dios. Por eso necesita partir del mundo observable.") +
    "<h5>La estructura común: tres pasos</h5>" +
    "<ol><li><b>Un hecho observable</b> del mundo (algo se mueve, hay causas, hay cosas que nacen y mueren, hay grados, hay orden).</li>" +
    "<li><b>No se puede seguir hacia atrás sin fin.</b> Si cada cosa dependiera de otra y esa de otra, y así siempre, no habría explicación de nada.</li>" +
    "<li><b>Hay un primer término</b>: una realidad que no depende de otra para ser, moverse o ser causa. «Y a esto todos llaman Dios» (así termina cada vía, en traducción habitual).</li></ol>" +
    w("filo_vias") +
    "<h5>Las cinco vías, en resumen</h5>" +
    tabla(["Vía", "Se parte de…", "Principio clave", "Se llega a…"], [
      ["<b>1. Movimiento</b>", "Las cosas se mueven (cambian)", "Todo lo movido lo mueve otro", "Primer motor inmóvil"],
      ["<b>2. Causa eficiente</b>", "Hay causas y efectos ordenados", "Nada es causa de sí mismo", "Primera causa incausada"],
      ["<b>3. Contingencia</b>", "Hay seres que pueden ser o no ser", "Si todo fuera contingente, no habría nada ahora", "Ser necesario por sí mismo"],
      ["<b>4. Grados de perfección</b>", "Hay cosas más y menos buenas, verdaderas…", "El «más» se mide por un máximo", "Ser máximamente perfecto"],
      ["<b>5. Orden y finalidad</b>", "Lo que no conoce obra para un fin", "Lo que no conoce necesita ser dirigido", "Inteligencia ordenadora"]
    ]) +
    "<h5>Cómo distinguirlas entre sí</h5>" +
    "<ul><li><b>Movimiento</b> trata del <b>cambio</b> (de potencia a acto) y su motor. <b>Causa eficiente</b> trata de la <b>producción</b> (quién hace que algo exista). Suenan parecido; la clave es: una pregunta por quién <i>mueve</i>, la otra por quién <i>produce</i>.</li>" +
    "<li><b>Contingencia</b> habla de seres que podrían <i>no existir</i> (nacen y mueren). Es la única que acaba en un ser <b>necesario</b>.</li>" +
    "<li><b>Grados</b> es la única que parte de <b>valores</b> (bueno, verdadero) y no de cosas que se mueven o se causan. Suele ser la más difícil de recordar porque suena «platónica».</li>" +
    "<li><b>Finalidad</b> es la que usa el <i>orden</i> de la naturaleza: se parece a lo que hoy se llama «argumento del diseño».</li></ul>" +
    "<h5>«Una cadena no puede ser infinita»: qué quiere decir exactamente</h5>" +
    "<p>Tomás <b>no</b> habla de una cadena de acontecimientos del pasado (tus padres, tus abuelos…). Habla de causas que dependen unas de otras <b>a la vez</b>, como en este ejemplo: la mano mueve el bastón, el bastón mueve la piedra. El bastón solo mueve mientras la mano lo mueve; si quitamos la primera causa, desaparecen todas. Un bastón que se mueve solo «porque lo mueve otro bastón que lo mueve otro…» sin que ninguno tenga la fuerza propia no explica nada. Por eso exige un primero. De hecho, Tomás pensaba que la razón <b>no puede probar</b> que el mundo tuviera un comienzo en el tiempo: eso se sabe por la fe.</p>" +
    ejemplo("Un esquema para escribir una vía en la PAU", "Ejemplo con la vía del movimiento:", [
      "<b>Hecho.</b> Vemos que hay cosas que se mueven (cambian).",
      "<b>Principio.</b> Todo lo que se mueve es movido por otro: nada pasa de potencia a acto sin algo que ya esté en acto.",
      "<b>No hay regreso infinito.</b> Si todos los motores fueran movidos, sin primero no habría ninguno que moviera a los demás.",
      "<b>Conclusión.</b> Hay un primer motor inmóvil, que mueve sin ser movido: «a esto todos llaman Dios».",
      "<b>Relación.</b> Usa la potencia y el acto de Aristóteles (T4)."
    ]) +
    "<h5>Críticas posteriores (para valorar)</h5>" +
    "<ul><li><b>Hume</b> (T10): no percibimos la causalidad, solo sucesiones de hechos; no podemos apoyar un argumento en ella.</li>" +
    "<li><b>Kant</b> (T12): las categorías, como la causalidad, solo valen para la experiencia posible; usarlas para llegar a Dios es ir más allá. Además, según él, la vía de la contingencia depende en el fondo del argumento ontológico.</li>" +
    "<li><b>Física moderna</b> (Galileo, T8): con la inercia, un cuerpo no necesita un motor continuo para seguir moviéndose, así que el «movimiento» de la primera vía no es el de la física moderna.</li>" +
    "<li><b>Lo que no demuestran</b>: aunque se aceptase que hay un primer motor, no queda probado que sea el Dios personal del cristianismo. Tomás intenta deducirlo después, estudiando sus atributos.</li></ul>" +
    w("emparejar", "vias") + w("orden", "ordenvia");

  // ---------------------------------------------------------------- 5. La ley natural
  secciones[4] =
    "<h5>Cuatro clases de ley</h5>" +
    "<p>Para Tomás, una ley es «una ordenación de la razón dirigida al bien común, promulgada por quien tiene el cuidado de la comunidad». No toda norma es lo mismo, y distingue cuatro niveles:</p>" +
    tabla(["Ley", "Qué es", "Ejemplo"], [
      ["<b>Ley eterna</b>", "El plan racional con el que Dios gobierna todo lo creado", "El orden de la naturaleza y del bien"],
      ["<b>Ley natural</b>", "La parte de la ley eterna que el ser humano descubre con su razón", "«Hay que hacer el bien», «no hay que matar al inocente»"],
      ["<b>Ley humana</b>", "Las leyes que dicta cada sociedad para aplicar la ley natural", "El código de circulación, el Código Penal"],
      ["<b>Ley divina</b>", "Lo que Dios ha revelado y la razón no alcanza por sí sola", "Los mandamientos, el Evangelio"]
    ]) +
    "<h5>El primer principio y las inclinaciones naturales</h5>" +
    "<p>El primer principio de la razón práctica (<i>Suma teológica</i>, I-II, q. 94, a. 2) es: <b>«el bien debe hacerse y buscarse, y el mal debe evitarse»</b>. Es tan básico que nadie lo discute: incluso quien hace el mal lo hace porque cree que le conviene. Para saber qué es «bien» para el ser humano, Tomás mira sus <b>inclinaciones naturales</b>, que ordena de menos a más específicas:</p>" +
    "<ul><li>Como todo ser, el humano tiende a <b>conservar su vida</b>.</li>" +
    "<li>Como los animales, tiende a la <b>unión de los sexos y a la crianza de los hijos</b>.</li>" +
    "<li>Como ser racional, tiende a <b>conocer la verdad</b> (también sobre Dios) y a <b>vivir en sociedad</b>.</li></ul>" +
    "<p>Lo que favorece estas inclinaciones es bueno; lo que las daña, malo. Por eso la ley natural se descubre con la razón, mirando <i>qué somos</i>, y no con una revelación.</p>" +
    "<h5>De los principios a las normas concretas</h5>" +
    tabla(["Manera de derivar", "Qué es", "Ejemplo"], [
      ["<b>Por conclusión</b>", "Se deduce de un principio, como una conclusión", "No hay que matar al inocente (deriva de no hacer daño)"],
      ["<b>Por determinación</b>", "El principio es general y cada sociedad lo concreta", "Debe haber una pena para el robo (cuál, lo fija cada ley); conducir por la derecha"]
    ]) +
    "<p>Los primeros principios son <b>universales e iguales para todos</b>. Cuanto más concreta es la norma, más puede variar o fallar en casos particulares (devolver un depósito es lo justo, pero no devolverle un arma a quien la reclama para matar).</p>" +
    "<h5>¿Y si la ley humana es injusta?</h5>" +
    "<p>Si una ley humana contradice la ley natural, para Tomás <b>no es verdadera ley, sino corrupción de la ley</b>. No obliga en conciencia (salvo para evitar un mal mayor, como un desorden grave). Es la conexión con la tradición de <i>Antígona</i> y con el debate sofista entre <i>physis</i> y <i>nomos</i> (T2): hay un derecho por encima de lo que dicen los gobernantes. De ahí parten, siglos después, ideas como los <b>derechos humanos</b> universales.</p>" +
    ojo("La ley natural <b>no</b> es una ley física (como la gravedad) ni una ley «religiosa» que solo valga para creyentes. Es la ley <b>moral</b> que la razón humana puede descubrir en la naturaleza humana. Su base última es Dios (ley eterna), pero su <b>conocimiento</b> es racional. Y no confundas «natural» con «instintivo»: lo natural en el humano es lo racional.") +
    w("emparejar", "leyes");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Dios, esencia y existencia: la metafísica de Tomás", html:
    "<p>Después de probar que Dios existe, Tomás quiere saber <b>cómo es</b>. Y aquí aparece lo más original de su metafísica: la distinción entre <b>esencia</b> y <b>existencia</b>.</p>" +
    "<h5>Esencia y existencia</h5>" +
    "<ul><li><b>Esencia</b>: lo que una cosa es (qué es un delfín, un triángulo, un fénix).</li>" +
    "<li><b>Existencia</b>: el hecho de que algo exista, el «es».</li></ul>" +
    "<p>Puedes saber perfectamente qué es un fénix, una criatura de la mitología, sin saber si existe. Eso muestra que, en las criaturas, <b>saber lo que son no implica que existan</b>: la existencia se les «da» desde fuera. En cambio, en Dios la esencia es existir: no depende de nada, es el «ser mismo subsistente». Por eso Dios es <b>necesario</b> y todas las demás cosas son <b>contingentes</b>.</p>" +
    tabla(["", "Criaturas", "Dios"], [
      ["<b>Esencia y existencia</b>", "Distintas (reciben la existencia)", "Idénticas (es el mismo ser)"],
      ["<b>Tipo de ser</b>", "Contingente: podría no existir", "Necesario: no puede no existir"],
      ["<b>Hilemorfismo</b>", "Materia y forma (salvo los ángeles)", "Sin materia: acto puro"]
    ]) +
    "<h5>Dios creador (la gran diferencia con Aristóteles)</h5>" +
    "<p>El Primer motor de Aristóteles mueve el mundo como un fin deseado, pero no lo ha creado, y el mundo es eterno. Para Tomás, Dios <b>crea libremente</b> todo lo que existe <b>de la nada</b> (creación <i>ex nihilo</i>) y lo sostiene en el ser. «Crear» no significa solo «dar un empujón al principio»: es dar y mantener el ser en cada momento. Tomás considera que la razón no puede demostrar si el mundo tuvo comienzo en el tiempo; que fue creado en el tiempo lo sabemos por la fe.</p>" +
    "<h5>Cómo hablar de Dios: la analogía</h5>" +
    "<p>Si decimos «Dios es bueno» y «Pedro es bueno», ¿usamos «bueno» en el mismo sentido? No exactamente (sería hablar de Dios como de una persona más), pero tampoco con un sentido totalmente distinto (no sabríamos nada de Él). Tomás propone el <b>lenguaje analógico</b>: el término se aplica con un significado en parte semejante y en parte distinto. Además, conocemos mejor lo que Dios <b>no</b> es (no es material, no cambia, no tiene límites) que lo que es: la «vía negativa».</p>" +
    ojo("Esencia y existencia es un punto donde Tomás va más allá de Aristóteles. Si te piden la diferencia entre el Primer motor de Aristóteles y el Dios de Tomás, tres cosas: Dios es <b>creador</b>, tiene <b>providencia</b> (cuida de lo creado) y es <b>el mismo ser</b> (esencia = existencia).") });

  nuevas.push({ h: "7. El ser humano y el conocimiento", html:
    "<h5>Alma y cuerpo: hilemorfismo con alma inmortal</h5>" +
    "<p>Como Aristóteles, Tomás piensa que el ser humano es una <b>sola sustancia</b>: el cuerpo es la materia y el alma racional es su <b>forma</b>. No somos un alma metida en un cuerpo (Platón, Agustín); somos un compuesto. Pero, a diferencia de Aristóteles, Tomás defiende que el alma racional es <b>espiritual y subsistente</b>: como realiza actividades (pensar) que no dependen de ningún órgano, puede existir sin el cuerpo y, por tanto, es <b>inmortal</b>. Eso sí, la persona completa es alma y cuerpo, por lo que cree en la resurrección (verdad de fe).</p>" +
    tabla(["", "Platón (T3) / Agustín (T6)", "Tomás de Aquino"], [
      ["<b>Ser humano</b>", "Alma que usa el cuerpo (dualismo)", "Compuesto de cuerpo (materia) y alma (forma)"],
      ["<b>Inmortalidad</b>", "El alma es inmortal", "El alma racional es inmortal; la persona es alma y cuerpo"],
      ["<b>Conocimiento</b>", "Recuerdo de Ideas / iluminación", "Abstracción desde los sentidos"]
    ]) +
    "<h5>Cómo conocemos: empirismo moderado</h5>" +
    "<p>Tomás sigue a Aristóteles: <b>todo conocimiento empieza en los sentidos</b> (se resume en la fórmula escolástica «nada hay en el entendimiento que antes no haya estado en los sentidos»). Los sentidos nos dan lo individual (este perro); el <b>entendimiento agente</b> abstrae de lo individual lo universal (la esencia «perro»), y el entendimiento recibe ese universal. Es un empirismo <b>moderado</b> porque la razón no es pasiva: elabora los conceptos. No hay ideas innatas.</p>" +
    ojo("No lo confundas con el empirismo de Hume (T10): para Tomás se conoce con certeza la <b>esencia</b> de las cosas y se pueden demostrar verdades sobre Dios, mientras que Hume niega que se pueda ir más allá de las impresiones.") +
    "<h5>El problema de los universales</h5>" +
    "<p>¿Qué son los conceptos generales («perro», «justicia»)? Era la <b>querella de los universales</b>. Hay tres posturas clásicas: el <b>realismo</b> extremo (los universales existen en sí, como Ideas platónicas), el <b>nominalismo</b> (solo existen los individuos; los universales son meros nombres, como defenderá Ockham, c. 1287–1347) y el <b>realismo moderado</b> de Tomás: los universales existen <b>en las cosas</b> como esencia común, <b>en la mente de Dios</b> como modelo y <b>en nuestra mente</b> como concepto obtenido por abstracción.</p>" +
    "<h5>Voluntad y libertad</h5>" +
    "<p>Tomás defiende el <b>libre albedrío</b>: el ser humano elige, porque su voluntad sigue lo que la razón presenta como bueno, pero no está obligada por un bien concreto (solo la felicidad total la atrae de forma necesaria). Si no hubiera libertad, no tendrían sentido ni las leyes ni la responsabilidad moral.</p>" });

  nuevas.push({ h: "8. Ética y política: felicidad, virtudes y sociedad", html:
    "<h5>El fin último: la felicidad</h5>" +
    "<p>Como Aristóteles, Tomás cree que todos los actos tienden a un fin y que el fin último es la <b>felicidad</b>. Pero la cristianiza: la felicidad completa (<b>bienaventuranza</b>) consiste en <b>ver a Dios</b> (la «visión beatífica»), algo que la razón sola no alcanza ni en esta vida. En esta vida solo es posible una felicidad <b>imperfecta</b>: la vida virtuosa, la amistad, la contemplación de la verdad. Su ética es <b>teleológica y eudemonista</b> (busca un fin: la felicidad), como la de Aristóteles, y se opone a la ética kantiana del deber (T12).</p>" +
    "<h5>Las virtudes</h5>" +
    tabla(["Tipo", "Cuáles", "Cómo se adquieren"], [
      ["<b>Intelectuales</b>", "Sabiduría, ciencia, prudencia…", "Estudiando y pensando"],
      ["<b>Morales (cardinales)</b>", "<b>Prudencia, justicia, fortaleza y templanza</b>", "Con el hábito, practicándolas (como en Aristóteles)"],
      ["<b>Teologales</b>", "<b>Fe, esperanza y caridad (amor)</b>", "Las regala Dios por la gracia; la razón sola no las da"]
    ]) +
    "<p>«Cardinal» viene de <i>cardo</i>, «gozne»: son los ejes sobre los que gira la vida moral. Las virtudes teologales son lo que añade Tomás respecto a Aristóteles: la ética cristiana no se queda en la vida buena en la ciudad, sino que apunta a Dios.</p>" +
    "<h5>La política</h5>" +
    "<p>Siguiendo a Aristóteles, el ser humano es <b>naturalmente social y político</b>: necesita vivir con otros para satisfacer sus necesidades y para vivir bien. El poder político es <b>natural</b> y su fin es el <b>bien común</b>. El gobernante debe respetar la ley natural; si manda cosas contrarias a ella, esas leyes son injustas (sección 5) y la tiranía es la peor de las formas de gobierno. Tomás prefiere el gobierno de uno, la monarquía, aunque con un régimen mixto que permita la participación de todos. Respecto a la relación entre la Iglesia y el poder civil, defiende que ambos tienen su ámbito propio; el poder espiritual es superior en lo que toca a la salvación.</p>" +
    ojo("En política, la clave de la PAU es esta: el poder tiene límites porque hay una <b>ley natural</b> superior a la ley humana. Una ley injusta «no es ley». Es la idea germen de los derechos humanos, aunque Tomás no habló de ellos con ese nombre.") });

  nuevas.push({ h: "9. Mapa del tema: Tomás y los demás autores", html:
    "<p>Una buena respuesta de PAU relaciona a Tomás con otros autores. Este cuadro resume con quién compararlo y en qué:</p>" +
    tabla(["Autor", "Relación con Tomás", "Idea clave para comparar"], [
      ["<b>Aristóteles (T4)</b>", "Su gran maestro filosófico", "Hilemorfismo, potencia/acto, causas, virtudes; pero Tomás añade creación, providencia y alma inmortal"],
      ["<b>San Agustín (T6)</b>", "Antecesor de la tradición cristiana", "Fe antes que razón («cree para entender»); iluminación. Tomás: fe y razón armónicas; abstracción"],
      ["<b>Averroes</b>", "Comentador árabe de Aristóteles", "Intelecto único para todos; Tomás: cada persona tiene el suyo. «Doble verdad»: Tomás la rechaza"],
      ["<b>Platón (T3)</b>", "Fondo de la tradición agustiniana", "Dualismo y Ideas separadas; Tomás: realismo moderado, alma forma del cuerpo"],
      ["<b>Descartes (T9)</b>", "Parte de la duda, no de los sentidos", "Ideas innatas y cogito; Tomás: empirismo moderado. Ambos prueban a Dios, pero por caminos distintos"],
      ["<b>Hume (T10)</b>", "Crítico de la causalidad", "La causalidad no se percibe; la base de las vías"],
      ["<b>Kant (T12)</b>", "Crítico de la metafísica y de las pruebas de Dios", "Razón limitada a la experiencia; ética del deber frente a la ética de la felicidad"]
    ]) +
    "<h5>Después de Tomás</h5>" +
    "<p>La síntesis tomista no fue la última palabra de la Edad Media. <b>Duns Escoto</b> (c. 1266–1308) subrayó la libertad de Dios y de la voluntad, y <b>Guillermo de Ockham</b> (c. 1287–1347) defendió el nominalismo y separó más la fe de la razón. Con ellos empieza a resquebrajarse el equilibrio de Tomás, y la filosofía moderna (T8 en adelante) irá por otros caminos.</p>" });

  nuevas.push({ h: "10. Comentario de texto resuelto: la vía del movimiento", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Tomás de Aquino, <em>Suma teológica</em>, I, q. 2, a. 3; paráfrasis fiel y condensada de la traducción española habitual: las frases pueden variar según la edición, y los puntos suspensivos entre corchetes unen pasajes del artículo):<br><em>«Es cierto, y consta por los sentidos, que en este mundo hay cosas que se mueven. Ahora bien, todo lo que se mueve es movido por otro. […] Pero no se puede seguir hasta el infinito, porque entonces no habría un primer motor y, por consiguiente, ningún otro motor. […] Por tanto, es necesario llegar a un primer motor que no sea movido por nada, y éste es el que todos entienden por Dios.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Tomás de Aquino (hacia 1224/25–1274), <i>Suma teológica</i>, primera parte, cuestión 2 (si Dios existe), artículo 3: la primera de las cinco vías. Pertenece a su obra de madurez y responde a la pregunta «¿existe Dios?».</li>" +
    "<li><b>2. Tema.</b> Una demostración racional de la existencia de Dios a partir del movimiento.</li>" +
    "<li><b>3. Idea principal.</b> Como en el mundo hay cosas que se mueven y todo lo movido es movido por otro, y esa serie no puede ser infinita, existe un primer motor inmóvil: Dios.</li>" +
    "<li><b>4. Ideas secundarias y términos.</b> (a) «Consta por los sentidos»: el punto de partida es la experiencia (método a posteriori). (b) «Movimiento»: en sentido aristotélico, todo cambio, el paso de la potencia al acto. (c) «No se puede seguir hasta el infinito»: sin un primero no habría motores segundos (orden de causas). (d) «Primer motor… el que todos entienden por Dios»: se identifica con Dios, cuyos atributos se estudian después.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la primera de las cinco vías, todas con la misma estructura. Depende de Aristóteles (potencia, acto, Primer motor) y se integra en la armonía entre fe y razón: la existencia de Dios es una verdad que la razón alcanza (preámbulo de la fe). Conecta con el rechazo del argumento ontológico de Anselmo y con su distinción entre Dios (acto puro) y las criaturas.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Aristóteles: su Primer motor mueve como fin, sin crear ni cuidar del mundo; el de Tomás es el Dios creador. Con Hume (T10) o Kant (T12): critican que la causalidad sirva para pasar de la experiencia a una causa fuera del mundo.</li>" +
    "<li><b>7. Valora y concluye.</b> El argumento es un hito en la historia de la teología natural y muestra la confianza medieval en la razón. Sus límites: la física moderna (inercia) cambia el sentido de «movimiento»; y aunque se aceptase, no probaría que ese primer motor sea el Dios personal cristiano.</li></ol>" +
    ojo("Errores típicos: (1) decir que Tomás «cree por fe» en las vías, cuando las presenta como <b>demostración racional</b>; (2) entender «primer» como primero en el <b>tiempo</b> (es primero en el <b>orden</b> de dependencia); (3) no nombrar a Aristóteles ni la potencia y el acto; (4) olvidar que las cinco vías comparten la misma estructura.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Fe y razón en Santo Tomás", "Respuesta modelo:", [
      "<b>Contexto.</b> Recuperación de Aristóteles en las universidades del siglo XIII; hay que integrar razón natural y fe.",
      "<b>Tesis.</b> Fe y razón son caminos distintos y armónicos hacia la misma verdad; no pueden contradecirse porque ambas vienen de Dios.",
      "<b>Dos tipos de verdades.</b> Preámbulos de la fe (existencia de Dios, alma inmortal: la razón puede alcanzarlos) y misterios (Trinidad: solo por revelación).",
      "<b>Comparación.</b> Con Agustín («cree para entender»: la fe guía a la razón) y con los averroístas (doble verdad).",
      "<b>Valoración.</b> Es una síntesis muy influyente, pero presupone que la razón puede llegar a Dios."
    ]) +
    ejemplo("Pregunta 2. Las cinco vías", "Respuesta modelo:", [
      "<b>Idea general.</b> Demostración a posteriori de la existencia de Dios, desde hechos del mundo.",
      "<b>Estructura común.</b> Hecho observable → no hay regreso infinito → primer término (Dios).",
      "<b>Dos vías con detalle.</b> Movimiento (primer motor inmóvil) y causa eficiente (primera causa incausada); luego contingencia, grados de perfección y orden del mundo.",
      "<b>Relación.</b> Usa la física de Aristóteles; rechaza el argumento ontológico de Anselmo.",
      "<b>Crítica.</b> Hume y Kant: la causalidad no puede llevarnos fuera de la experiencia."
    ]) +
    ejemplo("Pregunta 3. La ley natural", "Respuesta modelo:", [
      "<b>Definición.</b> Principios morales que la razón humana descubre en la naturaleza humana; participación de la ley eterna.",
      "<b>Primer principio.</b> «Hay que hacer el bien y evitar el mal»; inclinaciones naturales (vida, familia, verdad y sociedad).",
      "<b>Cuatro leyes.</b> Eterna, natural, humana y divina.",
      "<b>Consecuencia.</b> Una ley humana injusta no es verdadera ley.",
      "<b>Valoración.</b> Base de los derechos humanos; el reto es qué es «natural» en una sociedad plural."
    ]) +
    ejemplo("Pregunta 4. Relación con Aristóteles y Agustín", "Respuesta modelo:", [
      "<b>Con Aristóteles.</b> Toma el hilemorfismo, la potencia y el acto, las causas, el empirismo moderado y las virtudes; añade Dios creador y alma inmortal.",
      "<b>Con Agustín.</b> Frente a la fe que guía a la razón y la iluminación, la razón tiene autonomía y el conocimiento viene de los sentidos.",
      "<b>Conclusión.</b> Tomás es la gran síntesis de razón griega y fe cristiana."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf7a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
