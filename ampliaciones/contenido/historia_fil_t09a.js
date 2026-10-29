/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 9: El racionalismo: Descartes
   (parte A: teoría. Parte B, historia_fil_t09b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. La duda metódica NO es escepticismo: es provisional, metódica, universal e hiperbólica → sección 2 + widget filo_duda.
   2. Las cuatro reglas del método (evidencia, análisis, síntesis, enumeración) con ejemplo cotidiano → sección 1 + ordenar.
   3. El cogito: qué prueba (existo como cosa pensante) y qué no (no es un silogismo, no prueba el cuerpo) → sección 3.
   4. El criterio de evidencia: idea clara y distinta; ideas innatas, adventicias y facticias → sección 3 + sección 6 + clasificar.
   5. Las tres pruebas de la existencia de Dios (idea de infinito, imperfección, ontológica) → sección 4 + emparejar.
   6. Dios como garante, el origen del error y el «círculo cartesiano» → sección 4.
   7. Las tres sustancias (pensante, extensa, infinita) y el dualismo; mecanicismo y animales-máquina → sección 5 + clasificar.
   8. El problema de la interacción (Elisabeth de Bohemia, glándula pineal) → sección 5.
   9. Comparaciones: Platón (innatismo), Aristóteles (hilemorfismo/causas finales), Agustín (si fallor), Hume y Kant → sección 8.
   10. Comentario de texto: el cogito (Discurso del método, IV) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t9/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Descartes: en busca de un fundamento seguro
  secciones[0] =
    "<h5>La vida de Descartes (1596–1650) paso a paso</h5>" +
    "<p>René Descartes nació en 1596 en La Haye, un pueblo de Francia (hoy se llama Descartes en su honor). Su vida cabe en cinco etapas:</p>" +
    "<ul><li><b>Estudios (c. 1607–1615):</b> pasa ocho años en el colegio de los jesuitas de <b>La Flèche</b>. Allí aprende lo que había: filosofía aristotélica y escolástica, y matemáticas. Las matemáticas le encantan por su <b>certeza</b>; la filosofía, en cambio, le parece un campo de discusiones sin fin, donde «no hay cosa alguna de que no se dispute».</li>" +
    "<li><b>Soldado y viajero (1618–1628):</b> se alista en el ejército holandés del príncipe Mauricio de Nassau y luego viaja por Europa. En <b>1619</b>, con 23 años, tiene una noche de sueños (el 10 de noviembre) que le convence de que debe buscar un método único para todas las ciencias.</li>" +
    "<li><b>Los Países Bajos (desde 1628):</b> se instala allí veinte años para trabajar en paz. Escribe <i>El mundo</i>, un tratado de física, pero en <b>1633</b> condenan a Galileo y Descartes, prudente, <b>retira la obra</b> sin publicarla.</li>" +
    "<li><b>Las grandes obras:</b> el <i>Discurso del método</i> (<b>1637</b>), las <i>Meditaciones metafísicas</i> (<b>1641</b>), los <i>Principios de la filosofía</i> (<b>1644</b>) y <i>Las pasiones del alma</i> (<b>1649</b>). Las <i>Reglas para la dirección del espíritu</i>, escritas hacia 1628, solo se publicaron después de su muerte.</li>" +
    "<li><b>Suecia (1649–1650):</b> la reina Cristina lo invita a Estocolmo. Obligado a madrugar para darle clases en pleno invierno, enferma de pulmonía y muere en <b>febrero de 1650</b>.</li></ul>" +
    ojo("El <i>Discurso del método</i> está escrito en <b>francés</b> (no en latín) para que lo entendiera cualquiera que usara bien su razón, no solo los sabios. Las <i>Meditaciones</i>, en cambio, son más técnicas y se escribieron en latín. Es un detalle que puede aparecer en preguntas de contexto: Descartes confía en que <b>la razón es universal</b>, igual en todos (el «buen sentido» es la cosa mejor repartida del mundo).") +
    "<h5>El contexto: un siglo de dudas, una ciencia nueva</h5>" +
    "<p>Descartes vive en el siglo XVII, entre la <b>Revolución científica</b> (Copérnico, Galileo; tema 8) y la Guerra de los Treinta Años (1618–1648). Todo lo que parecía firme se tambalea: la Tierra ya no es el centro del universo, la física de Aristóteles (tema 4) falla, la Reforma ha roto la unidad religiosa de Europa y los escépticos del Renacimiento recuperan los argumentos de Sexto Empírico (tema 5). Si los antiguos se equivocaron en tantas cosas, ¿en qué podemos apoyarnos? Descartes responde con una idea: hay que <b>reconstruir todo el saber desde cero</b>, con la seguridad de las matemáticas.</p>" +
    "<h5>El proyecto: un edificio sobre roca</h5>" +
    "<p>Descartes lo explica con imágenes. Un edificio construido sobre arena (opiniones heredadas) se cae; hay que cavar hasta encontrar la roca. Y quien sospecha que alguna manzana de la cesta está podrida, no se queda con las que parecen sanas: <b>vacía la cesta entera</b> y revisa una a una antes de volver a meter las buenas. Ese es el sentido de la duda que veremos: no es una manía, es una <b>revisión general</b> para encontrar un primer principio absolutamente seguro.</p>" +
    "<p>Y su filosofía completa tiene forma de <b>árbol</b> (así lo cuenta en la carta-prefacio de los <i>Principios</i>, en paráfrasis): las <b>raíces</b> son la metafísica (la duda, el cogito, Dios), el <b>tronco</b> es la física y las <b>ramas</b> son la medicina, la mecánica y la moral. Los frutos se recogen de las ramas, pero todo depende de las raíces.</p>" +
    "<h5>El método: cuatro reglas sencillas</h5>" +
    "<p>Descartes está harto de la lógica silogística escolástica, que sirve para ordenar lo que ya sabes, pero no para descubrir nada. Quiere un método <b>inspirado en las matemáticas</b>: pocas reglas, simples y que se cumplan siempre. En la segunda parte del <i>Discurso</i> las resume en cuatro:</p>" +
    tabla(["Regla", "Qué dice", "Ejemplo cotidiano"], [
      ["1. <b>Evidencia</b>", "No admitir nada como verdadero si no se ve con evidencia: evitar la precipitación y la prevención, y aceptar solo lo que se presenta tan <b>clara y distintamente</b> que no se pueda dudar.", "No creerte un rumor del grupo de clase hasta comprobar que es cierto."],
      ["2. <b>Análisis</b>", "Dividir cada dificultad en tantas partes como sea posible para resolverla mejor.", "Un problema largo de física: separar los datos, las incógnitas y las fórmulas."],
      ["3. <b>Síntesis</b> (orden)", "Conducir los pensamientos con orden, empezando por lo más simple y fácil de conocer, para subir poco a poco a lo más complejo.", "Estudiar primero el vocabulario y la gramática, después traducir un texto."],
      ["4. <b>Enumeración</b> (revisión)", "Hacer recuentos tan completos y revisiones tan generales que se esté seguro de no omitir nada.", "Repasar el examen antes de entregarlo, mirando cada pregunta."]
    ]) +
    ojo("La <b>regla de la evidencia</b> es la más importante y la que más cae. Una idea es <b>clara</b> cuando está presente y manifiesta a la mente atenta, y <b>distinta</b> cuando está tan separada de las demás que solo contiene lo que es claro. No es «lo que me convence» ni «lo que siento seguro»: es lo que se ve con la luz de la razón, sin posibilidad de duda.") +
    w("orden", "reglas") +
    "<p>Esas reglas son el método; pero para aplicarlas a la metafísica hay que empezar por el principio: una primera verdad. Para encontrarla, Descartes empieza a dudar.</p>";

  // ---------------------------------------------------------------- 2. La duda metódica
  secciones[1] =
    "<h5>Cuatro rasgos de la duda de Descartes</h5>" +
    "<p>Para no confundirla con otras posturas (tema 5, el escepticismo), recuerda que la duda cartesiana es:</p>" +
    "<ul><li><b>Metódica:</b> es un <i>instrumento</i> para encontrar la verdad, no un fin. El escéptico duda para quedarse dudando; Descartes duda para llegar a una certeza.</li>" +
    "<li><b>Universal:</b> se aplica a todo lo que se pueda dudar, sin dejar excepciones. Pero no se examinan las ideas una a una: basta con minar los <i>principios</i> en que se apoyan, igual que, si se hunde la base, cae el edificio.</li>" +
    "<li><b>Provisional:</b> dura solo hasta encontrar un principio indudable. Después se reconstruye lo que se pueda.</li>" +
    "<li><b>Hiperbólica</b> (exagerada a propósito): se considera <i>falso</i> todo lo que sea simplemente <i>dudoso</i>. Descartes sabe que no todo es falso; pero usa esa exageración como prueba de fuego.</li></ul>" +
    ojo("La duda es <b>teórica, no práctica</b>: Descartes no deja de comer, de pagar sus deudas ni de obedecer las leyes mientras duda. Para la vida diaria se da una «moral provisional» (sección 7). Tampoco duda de la fe revelada ni de la moral: su duda es una investigación metafísica.") +
    "<h5>Los tres motivos de duda, de menos a más radical</h5>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Los sentidos.</b> A veces me engañan: la torre que de lejos parece redonda es cuadrada; un palo metido en el agua parece quebrado. Si me han engañado alguna vez, no es prudente fiarme del todo. Pero esto solo afecta a cosas lejanas o poco claras. Que ahora estoy aquí, sentado, con este papel, parece indudable.</li>" +
    "<li><b>El sueño.</b> Muchas veces he soñado con total viveza que estaba aquí, sentado, y estaba en la cama. No hay <b>indicios seguros</b> que separen la vigilia del sueño. Cae así toda percepción de cosas corporales, incluido mi propio cuerpo. Pero las matemáticas resisten: tanto dormido como despierto, dos más tres son cinco y el cuadrado tiene cuatro lados.</li>" +
    "<li><b>El genio maligno</b> (o Dios engañador). Supongamos que no hay un Dios bueno, sino un genio maligno, astuto y poderosísimo, que emplea toda su industria en engañarme: incluso cuando sumo dos y tres, o cuento los lados de un cuadrado. No digo que exista; digo que <b>puede</b> existir, y con eso basta para tener una razón (aunque sea metafísica) de duda. Si hasta las matemáticas son dudosas, no queda nada que no se pueda poner en duda.</li></ol>" +
    w("filo_duda") +
    "<h5>Por qué las matemáticas tardan en caer</h5>" +
    "<p>Fíjate en la lógica de la escalada: el primer nivel solo toca a lo sensible; el segundo, a todo lo sensible (aunque no a lo matemático); el tercero, a <b>todo</b>. Las matemáticas hablan de realidades muy simples (números, figuras), que valen igual si hay mundo exterior o no, por eso aguantan hasta el último escalón. Descartes necesita el genio maligno justo para llegar a ese punto.</p>" +
    ejemplo("Un ejemplo para entender el genio maligno", "Imagina que alguien te hace creer que 7 × 8 = 54, con tanta habilidad que nunca lo notas. Cada vez que lo calculas, te sale 54 y te parece evidente. Desde dentro, ¿podrías saber que te engañan? No. De eso va la hipótesis: tu «evidencia» podría ser un engaño de fábrica. Para salir de ahí necesitas algo que ni el mejor engañador pueda tocar.", [
      "Conclusión de la duda: ya no tengo <b>ninguna</b> certeza por la vía de los sentidos ni por la de las matemáticas.",
      "Pregunta: ¿queda algo? Sí: la propia duda."
    ]);

  // ---------------------------------------------------------------- 3. El cogito
  secciones[2] =
    "<h5>El camino al cogito, paso a paso</h5>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Lo dudo todo.</b> Hasta lo más evidente puede ser un engaño del genio maligno.</li>" +
    "<li><b>Pero «dudar» es una forma de pensar.</b> Si dudo, pienso.</li>" +
    "<li><b>Para pensar hay que ser.</b> Si el genio maligno me engaña, es que hay alguien a quien engaña. Que me engañe cuanto pueda, jamás hará que yo no sea nada mientras piense que soy algo.</li>" +
    "<li><b>Luego, siempre que lo pienso o lo digo, es verdadero: «pienso, luego existo»</b> (<i>cogito, ergo sum</i>). Es la primera verdad, tan firme que ni las suposiciones más extravagantes de los escépticos pueden conmoverla. Descartes la acepta como el <b>primer principio</b> de su filosofía.</li></ol>" +
    ojo("El cogito <b>no es un silogismo</b> («todo lo que piensa existe; yo pienso; luego existo»), sino una <b>intuición</b>: se ve de un solo golpe, con evidencia inmediata, que pensar y existir van juntos. Y atención: lo que se prueba es que <b>existo como cosa que piensa</b>, no que tenga un cuerpo, ni un mundo a mi alrededor. Todo eso sigue en duda.") +
    "<h5>¿Qué soy, entonces? Una «cosa que piensa»</h5>" +
    "<p>Descartes se pregunta qué es ese «yo» cuya existencia acaba de descubrir. No es un cuerpo (el cuerpo sigue dudoso, porque puede ser un sueño o un engaño). Es solo <b>una cosa que piensa</b> (<i>res cogitans</i>), y «pensar» significa aquí cualquier acto consciente: dudar, entender, afirmar, negar, querer, imaginar y sentir. El «yo» es, por tanto, una <b>sustancia pensante</b> y su esencia es el pensamiento. Esto es crucial: el dualismo del apartado 5 nace aquí.</p>" +
    "<p>Para ver que el entendimiento conoce mejor que los sentidos, Descartes propone el <b>ejemplo de la cera</b> (<i>Meditación II</i>): un trozo de cera de abeja recién sacada de la colmena tiene sabor a miel, olor a flores, color, forma, dureza y sonido al golpearlo. Al acercarla al fuego, todo eso cambia: pierde el sabor, el olor, el color y la forma, ¡y sigue siendo la misma cera! Lo que permanece no lo captan los sentidos ni la imaginación (que no puede recorrer todas las formas posibles), sino <b>el entendimiento</b>: la cera es algo extenso, flexible y mudable. Conclusión: conocemos los cuerpos mejor con la razón que con los sentidos, y, de paso, nos conocemos mejor a nosotros mismos, que entendemos.</p>" +
    "<h5>Un precedente: Agustín</h5>" +
    "<p>San Agustín (354–430) ya había escrito algo parecido: «si me equivoco, existo» (<i>si fallor, sum</i>; tema 6). El parecido es real, pero Descartes lo usa de otra manera: en Agustín es un argumento contra los escépticos que lleva a Dios; en Descartes es el <b>punto de partida</b> de un sistema nuevo que se apoya en el sujeto pensante (la llamada «vuelta al sujeto» de la filosofía moderna).</p>" +
    "<h5>Del cogito al criterio de verdad</h5>" +
    "<p>Pregunta clave: ¿por qué estoy seguro de que «pienso, luego existo»? Porque lo veo <b>clara y distintamente</b>. Descartes extrae de ahí una regla general, el <b>criterio de evidencia</b>: «es verdadero todo aquello que concibo muy clara y distintamente». Es el criterio que formuló en la primera regla del método, y ahora lo ha encontrado funcionando en un caso. El problema es que aún no sabe si puede <b>fiarse</b> de este criterio en otros casos: el genio maligno podría estar engañándole incluso cuando algo le parece clarísimo. Por eso necesita a Dios.</p>";

  // ---------------------------------------------------------------- 4. Dios como garante de la verdad
  secciones[3] =
    "<h5>Tres tipos de ideas</h5>" +
    "<p>Para encontrar un puente entre «yo» y «el mundo», Descartes clasifica las ideas que encuentra en su mente según su origen:</p>" +
    tabla(["Tipo", "Origen", "Ejemplos"], [
      ["<b>Innatas</b>", "Nacen con la razón misma; las pone Dios en nuestra mente.", "El yo, Dios, el infinito, el número, la figura, los principios lógicos (todo lo que se ve claro y distinto)."],
      ["<b>Adventicias</b>", "Parecen venir de fuera, por los sentidos.", "El calor, el ruido, el color, el sol que veo."],
      ["<b>Facticias</b>", "Las fabrica la imaginación combinando otras.", "La sirena, el centauro, un caballo alado."]
    ]) +
    ojo("Las ideas innatas son la clave del <b>racionalismo</b>: la razón posee por sí misma ideas verdaderas, que no vienen de la experiencia. Esto separa a Descartes de Aristóteles y, después, de los empiristas (tema 10). Pero ojo: «innatas» no significa que el bebé ya piense en Dios, sino que la mente tiene <b>por naturaleza</b> la capacidad y los contenidos básicos para formar esas ideas.") +
    "<h5>La existencia de Dios: tres pruebas</h5>" +
    "<p>Tras el cogito Descartes está encerrado en su propia mente: sabe que existe como cosa pensante y tiene ideas, pero no sabe si le corresponde algo fuera. Necesita probar que existe un Dios <b>perfecto</b> que no puede engañarle. Lo hace con tres argumentos:</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>La idea de infinito (<i>Meditación III</i>).</b> Encuentro en mí la idea de un ser <b>infinito, perfecto, omnisciente y omnipotente</b>. Esa idea tiene más «realidad» que yo, que soy finito e imperfecto. Pero la causa de una idea debe tener al menos tanta realidad como la idea misma («de la nada, nada sale»). Yo no puedo ser la causa de una idea más perfecta que yo. Luego esa idea ha sido puesta en mí por un ser realmente infinito: <b>Dios existe</b>.</li>" +
    "<li><b>Mi existencia imperfecta (<i>Meditación III</i>).</b> Yo, que dudo y no lo sé todo, soy imperfecto. Si me hubiera hecho yo, me habría dado todas las perfecciones. Y no solo hay que explicar cómo comencé a existir, sino por qué <b>sigo</b> existiendo en cada instante (mi vida no se sostiene por inercia). Mi causa debe ser un ser perfecto que me conserva: <b>Dios</b>.</li>" +
    "<li><b>El argumento ontológico (<i>Meditación V</i>).</b> Dios es, por definición, el ser <b>sumamente perfecto</b>. La existencia es una perfección. Un Dios sin existencia no sería sumamente perfecto, luego no puedo concebir a Dios sin existencia, igual que no puedo concebir un triángulo cuyos ángulos no sumen dos rectos. Es una versión de la prueba de San Anselmo (1033–1109) del siglo XI.</li></ol>" +
    w("emparejar", "pruebas") +
    "<h5>Dios veraz: el puente hacia el mundo</h5>" +
    "<p>Una vez probado que Dios existe, Descartes razona: Dios es perfecto; el engaño es una imperfección (nace de un defecto o de malicia); luego <b>Dios no puede ser engañador</b>. Esto, por fin, resuelve el problema del genio maligno y <b>garantiza el criterio de evidencia</b>: lo que concibo clara y distintamente es verdadero, porque si no, mi razón (que Dios me dio) me llevaría siempre al error y Dios sería el culpable. Con esta garantía recupera todo lo que había puesto en duda: las matemáticas, la memoria, y, al final de la <i>Meditación VI</i>, la existencia del mundo corpóreo (porque Dios no me engañaría haciéndome creer con tanta fuerza en cuerpos que no existen).</p>" +
    "<h5>Si Dios no engaña, ¿por qué nos equivocamos?</h5>" +
    "<p>Descartes lo explica en la <i>Meditación IV</i>: el error no viene del entendimiento (que es finito pero no falla) ni de Dios, sino de un <b>mal uso de la libertad</b>. La <b>voluntad</b> es infinita (puedo afirmar o negar cualquier cosa), pero el <b>entendimiento</b> es limitado. El error aparece cuando mi voluntad afirma algo que mi entendimiento todavía no ve con claridad y distinción. El remedio es simple: <b>suspender el juicio</b> mientras la idea no sea evidente. Es la regla de la evidencia aplicada a la conducta.</p>" +
    ojo("La crítica clásica al sistema es el <b>círculo cartesiano</b>: Descartes usa la evidencia (clara y distinta) para probar que Dios existe, y luego usa a Dios para garantizar que la evidencia es fiable. Descartes responde que el cogito y las ideas claras son verdaderas <b>mientras se ven</b>; Dios sirve para sostener la verdad cuando ya no las estoy mirando (la memoria de demostraciones pasadas). Aun así, es un punto débil que mencionan muchos comentaristas, y es un buen argumento para la valoración crítica de una pregunta de la PAU.");

  // ---------------------------------------------------------------- 5. El dualismo: tres sustancias
  secciones[4] =
    "<h5>Qué es una sustancia</h5>" +
    "<p>Descartes define <b>sustancia</b> como una cosa que existe de tal manera que no necesita de ninguna otra para existir (<i>Principios</i>, I; fórmula parafraseada). En sentido estricto, solo Dios cumple esa definición; las otras dos dependen de Él para existir, pero no dependen entre sí. Por eso las llama «sustancias» en un sentido derivado. Hay <b>tres</b>:</p>" +
    tabla(["Sustancia", "Qué es", "Atributo esencial", "Es…"], [
      ["<b>Res cogitans</b> (cosa pensante)", "El alma, la mente, el «yo»", "El <b>pensamiento</b>", "Finita, creada"],
      ["<b>Res extensa</b> (cosa extensa)", "La materia y el cuerpo", "La <b>extensión</b> (longitud, anchura y profundidad)", "Finita, creada"],
      ["<b>Res infinita</b> (sustancia infinita)", "Dios", "La <b>perfección infinita</b>", "Infinita, increada"]
    ]) +
    "<p>Para cada sustancia hay un <b>atributo principal</b> que es su esencia: no se puede concebir el alma sin pensamiento ni el cuerpo sin extensión. Todo lo demás (imaginar, sentir; figura, movimiento) son <b>modos</b> de ese atributo.</p>" +
    w("clasificar", "sustancias") +
    "<h5>Por qué el alma y el cuerpo son distintos</h5>" +
    "<p>El argumento de Descartes (en la <i>Meditación VI</i>) es: puedo concebir clara y distintamente mi mente como una cosa pensante y <b>no extensa</b>, y mi cuerpo como una cosa extensa y <b>no pensante</b>. Lo que se puede concebir clara y distintamente por separado, Dios puede crearlo por separado; luego mente y cuerpo son realmente distintos. Además, el cuerpo es <b>divisible</b> (puede cortarse en partes), mientras que la mente es <b>indivisible</b> (no hay «medio pensamiento»). De ahí una consecuencia: el alma no se desintegra con el cuerpo y puede ser inmortal.</p>" +
    ojo("Compáralo con Platón y Aristóteles. Platón (tema 3) era dualista, pero el alma estaba en el cuerpo como en una cárcel. Aristóteles (tema 4) decía que el alma es la <b>forma</b> del cuerpo, no una sustancia separada. Descartes va más lejos que Platón: mente y cuerpo son dos sustancias completas, con esencias opuestas (pensar frente a ocupar espacio), y rechaza a Aristóteles. Este es el dualismo cartesiano o <b>dualismo de sustancias</b>.") +
    "<h5>Un mundo-máquina: el mecanicismo</h5>" +
    "<p>Si la materia es solo extensión, su física es la geometría: un cuerpo es lo que ocupa espacio, tiene figura y se mueve. Desaparecen las <b>causas finales</b> de Aristóteles («la piedra cae porque busca su lugar natural»): la naturaleza se explica por <b>causas mecánicas</b> (choques y movimientos), como el funcionamiento de un reloj. Los colores, olores y sabores no son propiedades de las cosas, sino sensaciones en el que percibe. Así, el universo es una gran máquina que se explica con leyes matemáticas; Dios la creó y la mantiene en movimiento.</p>" +
    "<p>Una consecuencia llamativa: el cuerpo humano, y los <b>animales</b>, son máquinas. Los animales no tienen alma pensante (para Descartes, no hablan ni razonan de forma flexible), son «autómatas» muy complejos. Solo el ser humano es máquina <b>más</b> alma racional.</p>" +
    "<h5>El problema de la interacción</h5>" +
    "<p>Si mente y cuerpo son tan distintos, ¿cómo se influyen? Decido levantar el brazo y el brazo se levanta; me pillo un dedo y siento dolor. En 1643 la princesa <b>Elisabeth de Bohemia</b> se lo preguntó por carta a Descartes, y él no logró una respuesta satisfactoria. En <i>Las pasiones del alma</i> (1649) propone que el alma se comunica con el cuerpo en la <b>glándula pineal</b> (en el cerebro), pero eso solo cambia la pregunta: ¿cómo una cosa sin extensión mueve a una extensa? Es la gran dificultad del dualismo, y sus sucesores (Spinoza, Leibniz, Malebranche) intentarán resolverla de maneras muy distintas.</p>" +
    ojo("En la PAU, cuando se pide una valoración crítica de Descartes, el problema de la interacción es el argumento más rentable: «si el alma es inextensa, no puede mover un cuerpo extenso, y sin embargo lo hace a diario». También se puede mencionar el círculo cartesiano (sección 4) y la crítica de Hume al yo (tema 10).");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Ideas y racionalismo: qué las distingue del empirismo", html:
    "<p>Con el cogito, la razón se convierte en la fuente del saber. Esa postura se llama <b>racionalismo</b>: la fuente principal del conocimiento verdadero es la razón, no la experiencia, y existen ideas innatas que no vienen de los sentidos. Sus grandes nombres del siglo XVII son Descartes, Spinoza (1632–1677) y Leibniz (1646–1716). Enfrente estarán los empiristas (Locke 1632–1704 y Hume 1711–1776; tema 10), para quienes todo el conocimiento viene de la experiencia.</p>" +
    tabla(["", "Racionalismo (Descartes)", "Empirismo (Locke, Hume)"], [
      ["Fuente del saber", "La <b>razón</b> (intuición y deducción)", "La <b>experiencia</b> (sentidos)"],
      ["Ideas innatas", "Sí: yo, Dios, el infinito, las matemáticas", "No: la mente es «papel en blanco»"],
      ["Modelo de ciencia", "Matemáticas (deducción)", "Ciencias de la naturaleza (observación)"],
      ["Papel de los sentidos", "Engañosos o confusos", "Origen de todas las ideas"],
      ["Método", "Deductivo: de principios evidentes a consecuencias", "Inductivo: de casos a generalizaciones"]
    ]) +
    "<h5>Intuición y deducción</h5>" +
    "<p>En las <i>Reglas</i> Descartes distingue dos operaciones de la razón que dan certeza: la <b>intuición</b> (ver de golpe una verdad simple, como el cogito) y la <b>deducción</b> (encadenar intuiciones, de modo que cada paso sea evidente). Todo el saber es una cadena de intuiciones, como una demostración geométrica. Los sentidos y la imaginación no dan certeza.</p>" +
    w("clasificar", "ideas") +
    ojo("Distingue <b>racionalismo</b> de <b>idealismo</b> o de «ser racional». El racionalismo es una teoría sobre el <i>origen</i> del conocimiento. No dice que los racionalistas sean más «lógicos»; Hume también razona muy bien.") });

  nuevas.push({ h: "7. La moral provisional y las pasiones", html:
    "<p>Mientras duda, Descartes necesita vivir. En la tercera parte del <i>Discurso</i> se da una <b>moral provisional</b>, para no quedarse paralizado como quien derriba su casa sin tener donde alojarse. Sus máximas son:</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Obedecer las leyes y costumbres de su país</b>, mantener su religión y seguir las opiniones más moderadas.</li>" +
    "<li><b>Ser firme y resuelto en sus acciones</b>: igual que el viajero perdido en un bosque debe caminar siempre en línea recta y no dar vueltas, aunque la dirección no sea la mejor.</li>" +
    "<li><b>Vencerse a sí mismo antes que a la fortuna</b>: cambiar los propios deseos antes que el orden del mundo. Solo nuestros pensamientos están totalmente en nuestro poder.</li></ol>" +
    "<p>Es una moral de prudencia y serenidad, de aire estoico (tema 5). Su moral «definitiva», que nunca desarrolló por completo, sería el fruto del árbol del saber: la más alta y perfecta, que supone el conocimiento completo de las demás ciencias.</p>" +
    "<h5>Las pasiones del alma (1649)</h5>" +
    "<p>Aquí Descartes aplica su dualismo a las emociones. Las <b>pasiones</b> (admiración, amor, odio, deseo, alegría, tristeza) son estados del alma causados por el movimiento de los «espíritus animales» (partículas finas de la sangre) en el cuerpo. Son útiles: nos empujan a buscar lo conveniente. Pero hay que gobernarlas. La virtud principal es la <b>generosidad</b>: reconocer que lo único realmente nuestro es el buen uso del libre albedrío y estar resueltos a usarlo bien. En esto, Descartes se separa de Spinoza, que niega el libre albedrío.</p>" });

  nuevas.push({ h: "8. Mapa del tema: Descartes y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y comparar con otro. Estas son las relaciones más rentables:</p>" +
    tabla(["Autor", "Relación con Descartes"], [
      ["Platón (T3)", "Comparten el innatismo y la desconfianza hacia los sentidos; pero Platón explica las ideas por la reminiscencia y Descartes las pone en la mente por Dios."],
      ["Aristóteles (T4)", "Descartes rechaza su física (causas finales, hilemorfismo) y su empirismo; sustituye el alma-forma por el dualismo."],
      ["Escepticismo (T5)", "Usa la duda de los escépticos, pero como método, para vencerlos."],
      ["San Agustín (T6)", "El <i>si fallor, sum</i> es un precedente del cogito, pero Agustín lo integra en la fe y Descartes lo convierte en inicio del sistema."],
      ["Tomás de Aquino (T7)", "Ambos prueban a Dios, pero Tomás parte del mundo sensible (cinco vías); Descartes parte de la idea de Dios en la mente. Descartes admite el argumento ontológico que Tomás rechazaba."],
      ["Galileo (T8)", "Comparte el ideal de una naturaleza matemática; por prudencia no publica <i>El mundo</i> tras 1633."],
      ["Locke y Hume (T10)", "Rechazan las ideas innatas; Hume critica el yo como sustancia (solo hay un haz de percepciones)."],
      ["Kant (T12)", "Intenta superar racionalismo y empirismo; critica las pruebas de Dios (la existencia no es una perfección ni un predicado) y el uso de la razón más allá de la experiencia."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Descartes</h5>" +
    tabla(["Ámbito", "Tesis de Descartes"], [
      ["Método", "Cuatro reglas: evidencia, análisis, síntesis y enumeración; modelo matemático."],
      ["Conocimiento", "Duda metódica (sentidos, sueño, genio maligno); cogito como primera verdad; criterio de claridad y distinción; ideas innatas."],
      ["Dios", "Tres pruebas (idea de infinito, mi imperfección, ontológica); Dios veraz garantiza la evidencia."],
      ["Realidad", "Tres sustancias (pensante, extensa, infinita); mecanicismo; animales-máquina."],
      ["Ser humano", "Dualismo mente–cuerpo; unión por la glándula pineal; libre albedrío."],
      ["Moral", "Moral provisional (tres máximas) y generosidad."]
    ]) });

  nuevas.push({ h: "9. Comentario de texto resuelto: el cogito", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Descartes, <em>Discurso del método</em>, cuarta parte; traducción española habitual, que varía levemente según la edición):<br><em>«Advertí que, mientras quería pensar de este modo que todo era falso, era necesario que yo, que lo pensaba, fuese algo. Y notando que esta verdad: pienso, luego existo, era tan firme y segura que las suposiciones más extravagantes de los escépticos no eran capaces de conmoverla, juzgué que podía admitirla sin escrúpulo como el primer principio de la filosofía que buscaba.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> René Descartes (1596–1650), <i>Discurso del método</i> (1637), cuarta parte, donde expone las bases de su metafísica tras haber dudado de todo. Es el momento clave del racionalismo moderno.</li>" +
    "<li><b>2. Tema.</b> El descubrimiento del cogito como primera verdad indudable, que resiste incluso a la duda más radical.</li>" +
    "<li><b>3. Idea principal.</b> Si lo pienso todo falso, necesito ser algo que piensa; por tanto «pienso, luego existo» es tan firme que ninguna duda escéptica la derriba, y sirve como primer principio de la filosofía.</li>" +
    "<li><b>4. Términos e ideas secundarias.</b> (a) «Todo era falso»: es la duda hiperbólica (sentidos, sueño, genio maligno). (b) «Pienso, luego existo»: intuición, no silogismo; prueba la existencia del yo como cosa pensante. (c) «Escépticos»: Descartes usa la duda de ellos, pero para vencerlos. (d) «Primer principio»: el cimiento de todo el edificio del saber.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la raíz de su metafísica. Del cogito saca el criterio de evidencia (lo claro y distinto es verdadero) y la naturaleza del yo (<i>res cogitans</i>), que lleva al dualismo. Pero el criterio solo queda garantizado después, cuando prueba a Dios veraz (ideas de infinito, ontológico). Enlaza con la regla de la evidencia del <i>Discurso</i>.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con San Agustín: su <i>si fallor, sum</i> es parecido, pero se integra en la fe y no funda un sistema. Con Hume (tema 10): rechaza que haya un «yo» sustancial; solo percibe un haz de percepciones. Con Kant (tema 12): critica que se pase de «pienso» a «existo como sustancia pensante» sin intuición empírica.</li>" +
    "<li><b>7. Valora y concluye.</b> El cogito inauguró la filosofía moderna centrada en el sujeto y la conciencia. Su límite: de la certeza del pensar no se sigue sin más que el yo sea una sustancia distinta del cuerpo, y la reconstrucción posterior depende de Dios (círculo cartesiano).</li></ol>" +
    ojo("Errores típicos: (1) decir que Descartes <b>es escéptico</b> (la duda es un método); (2) presentar el cogito como silogismo; (3) concluir del cogito que existe el cuerpo o el mundo (todavía no); (4) olvidar a Dios como garante; (5) confundir la duda con la hipótesis del genio maligno, que es solo su nivel máximo.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica la duda metódica y el cogito", "Respuesta modelo:", [
      "<b>Objetivo.</b> Buscar un fundamento absolutamente seguro para la ciencia; modelo: las matemáticas.",
      "<b>Duda metódica.</b> Provisional, universal e hiperbólica; no es escepticismo. Tres niveles: sentidos, sueño, genio maligno.",
      "<b>Cogito.</b> Pienso, luego existo: resiste al genio maligno; es una intuición y prueba el yo como cosa pensante.",
      "<b>Criterio.</b> Lo claro y distinto es verdadero.",
      "<b>Relación.</b> Precedente: Agustín. Valoración: el yo como sustancia (Hume, Kant)."
    ]) +
    ejemplo("Pregunta 2. Explica el papel de Dios en el sistema cartesiano", "Respuesta modelo:", [
      "<b>Problema.</b> Tras el cogito, solo sé que existo; el genio maligno podría falsear lo demás.",
      "<b>Pruebas.</b> Idea de infinito, mi imperfección y argumento ontológico.",
      "<b>Dios veraz.</b> No es engañador, luego garantiza el criterio de evidencia y permite recuperar el mundo.",
      "<b>Error.</b> Viene del mal uso de la voluntad, que afirma lo que el entendimiento no ve.",
      "<b>Crítica.</b> Círculo cartesiano; Kant rechaza la prueba ontológica."
    ]) +
    ejemplo("Pregunta 3. Dualismo y sustancias", "Respuesta modelo:", [
      "<b>Sustancia.</b> Lo que existe sin necesitar otra cosa (en sentido estricto, Dios).",
      "<b>Tres sustancias.</b> Pensante (pensamiento), extensa (extensión), infinita (Dios).",
      "<b>Dualismo.</b> Mente y cuerpo, distintos: divisible el cuerpo, indivisible la mente.",
      "<b>Consecuencias.</b> Mecanicismo y animales-máquina.",
      "<b>Problema.</b> Interacción (Elisabeth de Bohemia; glándula pineal). Comparación con Platón y Aristóteles."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf9a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
