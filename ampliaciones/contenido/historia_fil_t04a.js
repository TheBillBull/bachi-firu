/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 4: Aristóteles
   (parte A: teoría. Parte B, historia_fil_t04b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Hilemorfismo: la forma NO es «la figura exterior»; es la esencia que organiza la materia → sección 3 + emparejar.
   2. Potencia y acto: el cambio no es ni nada ni ilusión, sino actualizar lo que ya era posible → sección 3 + tabla de cambios.
   3. Las cuatro causas (y que «causa» significa «por qué», no solo «lo que empuja») → sección 4 + widget filo_causas.
   4. Causa final / teleología: la bellota no «piensa»; el fin es la tendencia natural → sección 4 (ojo).
   5. Crítica a las Ideas (duplicación, tercer hombre, no explican el cambio) y qué conserva de Platón → sección 2.
   6. Conocimiento: de la sensación a la ciencia, abstracción y silogismo → sección nueva 6 + orden.
   7. Alma como forma del cuerpo (no dualismo) y Primer motor inmóvil (no es un Dios creador) → sección nueva 7.
   8. Ética: felicidad = actividad racional virtuosa; término medio relativo a nosotros, no media aritmética → sección 5 + widget filo_medio + clasificar.
   9. Política: animal político, constituciones rectas y desviadas, politeia, crítica a Platón → sección nueva 8 + emparejar.
   10. Comentario de texto: el término medio (Ética a Nicómaco II, 6) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t4/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Vida, obra y clasificación de los saberes
  secciones[0] =
    "<h5>La vida de Aristóteles (384–322 a. C.) paso a paso</h5>" +
    "<p>Aristóteles no nació en Atenas, sino en <b>Estagira</b>, una pequeña ciudad del norte de Grecia, en 384 a. C. Su padre, Nicómaco, era médico del rey de Macedonia. Crecer entre médicos explica una cosa importante: Aristóteles se fija mucho en <b>cómo son realmente los seres vivos</b> y en lo que se puede observar. Su vida cabe en cinco etapas:</p>" +
    "<ul><li><b>367 a. C. (17 años): llega a la Academia de Platón</b> y se queda unos <b>veinte años</b>, hasta la muerte de su maestro en 347 a. C. Aprende, pero también discute: por eso se le llama el discípulo que superó (y contradijo) al maestro.</li>" +
    "<li><b>347–343 a. C.: años de viaje</b> (Asos, en Asia Menor, y la isla de Lesbos), donde estudia animales y plantas.</li>" +
    "<li><b>343 a. C.: preceptor de Alejandro</b>, el hijo del rey Filipo de Macedonia, que tenía 13 años. Ese joven será Alejandro Magno (356–323 a. C.).</li>" +
    "<li><b>335 a. C.: funda el Liceo</b> en Atenas. Se le llama escuela <b>peripatética</b> («del paseo»), porque se enseñaba paseando.</li>" +
    "<li><b>323–322 a. C.</b>: muere Alejandro y en Atenas estalla la hostilidad contra Macedonia. Aristóteles se retira a Calcis, en la isla de Eubea, y muere allí en 322 a. C.</li></ul>" +
    "<h5>Qué escribió</h5>" +
    "<p>Escribió diálogos para el gran público (casi todos perdidos) y, sobre todo, <b>tratados</b> que eran sus apuntes de clase, que sí se conservan. Los que más caen en la PAU son: la <i>Metafísica</i> (sustancia, causas, Dios), la <i>Física</i> (movimiento y cambio), <i>Acerca del alma</i>, la <i>Ética a Nicómaco</i> y la <i>Política</i>. Su lógica está reunida en el <i>Organon</i> (el «instrumento»). Curiosidad útil: el título «Metafísica» no lo puso él, sino un editor posterior; significa «lo que viene después de la <i>Física</i>» en la ordenación de sus libros.</p>" +
    "<h5>Cómo ordena el saber</h5>" +
    "<p>Para Aristóteles la filosofía no es una sola cosa, sino un conjunto de saberes con distinto fin. Esta clasificación sirve para ver dónde cae cada tema:</p>" +
    tabla(["Tipo de saber", "Para qué sirve", "Ejemplos"], [
      ["<b>Teórico</b>", "Conocer por conocer, la verdad", "Metafísica (o «filosofía primera»), física, matemáticas"],
      ["<b>Práctico</b>", "Saber cómo actuar bien", "Ética (conducta personal) y política (vida en la ciudad)"],
      ["<b>Productivo</b>", "Fabricar o crear algo", "Técnica, poética, retórica"]
    ]) +
    ojo("La lógica no está en ninguno de los tres: es el «instrumento» (<i>órganon</i>) que sirve para todos, porque enseña a razonar bien. Por eso se llama <i>Organon</i>.");

  // ---------------------------------------------------------------- 2. Crítica a las Ideas
  secciones[1] =
    "<h5>Los cuatro reproches concretos</h5>" +
    "<p>Aristóteles no se limita a decir «no estoy de acuerdo». Da razones, y la PAU las pide. Las más importantes son estas:</p>" +
    "<ul><li><b>Duplicación inútil.</b> Platón quiere explicar el mundo sensible y para ello inventa un segundo mundo igual de complicado. Es como quien, para contar mejor sus cosas, empieza por duplicarlas: ahora hay más que explicar, no menos.</li>" +
    "<li><b>Las Ideas no explican el cambio.</b> Las Ideas son eternas e inmóviles; si no se mueven y están «en otro lugar», ¿cómo van a causar que un caballo nazca o crezca? Una Idea inmóvil y separada no puede ser el origen de nada que se mueve.</li>" +
    "<li><b>Participar e imitar son metáforas.</b> Decir que las cosas «participan» de las Ideas o las «imitan» suena bien, pero no explica <i>cómo</i> ocurre. Son imágenes poéticas, no una explicación.</li>" +
    "<li><b>El «tercer hombre».</b> Si lo que hace hombre a Sócrates es su parecido con la Idea de Hombre, entonces Sócrates y la Idea se parecen en algo (ser «hombres»), y hará falta una tercera realidad que explique ese parecido, y luego una cuarta… El argumento no tiene fin.</li></ul>" +
    "<h5>Qué se queda Aristóteles de Platón</h5>" +
    "<p>Es importante no exagerar la ruptura. Aristóteles <b>sigue pensando</b> que la ciencia versa sobre lo universal y necesario (no sobre «este caballo concreto», sino sobre lo que es un caballo). La diferencia es <b>dónde</b> está ese universal: Platón lo coloca en un mundo aparte; Aristóteles, <b>dentro de las cosas</b>, y nosotros lo extraemos al pensar (lo veremos en el apartado del conocimiento). En su Ética, Aristóteles dice con respeto que, siendo amigos ambos, la verdad es lo primero: es la famosa idea de preferir la verdad incluso a un maestro querido.</p>" +
    tabla(["", "Platón", "Aristóteles"], [
      ["¿Dónde está la esencia?", "En las Ideas, en un mundo aparte", "Dentro de cada cosa (la forma)"],
      ["Mundos", "Dos (sensible e inteligible)", "Uno solo"],
      ["Punto de partida del conocimiento", "El alma ya conoció las Ideas (recordar)", "Los sentidos (la experiencia)"],
      ["El cambio", "Se explica por la participación de las Ideas", "Se explica por potencia y acto"],
      ["Ser humano", "Alma inmortal y separada del cuerpo", "Alma = forma del cuerpo"]
    ]) +
    ojo("«Aristóteles es empirista» es una simplificación. Parte de los sentidos, pero llega a <b>ciencia</b> de lo universal mediante la razón. No es lo mismo que el empirismo moderno (Locke, Hume).");

  // ---------------------------------------------------------------- 3. Sustancia, materia y forma, potencia y acto
  secciones[2] =
    "<h5>La pregunta de fondo: ¿qué existe de verdad?</h5>" +
    "<p>Para Aristóteles, lo que existe de verdad son las <b>sustancias</b> (<i>ousía</i>): seres individuales y concretos, que existen por sí mismos. Este caballo, tú, este roble, esta mesa. Todo lo demás son <b>accidentes</b>: cosas que solo existen <i>en</i> una sustancia, como «blanco», «alto», «cansado», «en Madrid». No existe «lo blanco» flotando solo: siempre es algo blanco.</p>" +
    "<p>Por eso Aristóteles ordena el mundo con las <b>categorías</b>, los modos más generales de decir lo que algo es: la sustancia y nueve tipos de accidentes (cantidad, cualidad, relación, lugar, tiempo, posición, posesión, acción y pasión). Cuando preguntas «¿cómo es Marta?» estás preguntando por cualidades; «¿dónde está?», por el lugar; y así.</p>" +
    "<h5>Hilemorfismo: toda sustancia natural es materia y forma</h5>" +
    "<p>La palabra viene del griego <i>hýle</i> (materia) y <i>morfé</i> (forma). La idea es que cada sustancia es un compuesto de dos principios que no se pueden separar en la realidad (solo en el pensamiento):</p>" +
    tabla(["Principio", "Qué es", "Ejemplo: una estatua de bronce", "Ejemplo: una persona"], [
      ["<b>Materia</b>", "Aquello de lo que está hecha; lo que puede recibir una forma", "El bronce", "El cuerpo (carne, huesos…)"],
      ["<b>Forma</b>", "Lo que organiza la materia y la hace ser <i>esto</i>: su esencia", "Ser la figura de Hermes", "El alma (lo que hace que ese cuerpo viva, sienta y piense)"]
    ]) +
    "<p>La materia sin forma no es nada concreto (nadie ve «materia pura»); la forma sin materia, en las cosas naturales, tampoco existe: no hay «caballidad» sin caballos. Lo que existe es el <b>compuesto</b>. Un detalle que ayuda: <b>lo que es materia para una cosa es forma de otra</b>. El ladrillo es la materia de la pared, pero él mismo es arcilla con una forma.</p>" +
    ojo("La «forma» aristotélica <b>no es la figura exterior</b>. Es la esencia: lo que hace que algo sea lo que es y funcione como tal. La forma de un ojo no es su aspecto, sino su capacidad de ver; si no ve, solo es un ojo «de nombre», como el de una estatua.") +
    "<h5>Potencia y acto: cómo se explica el cambio</h5>" +
    "<p>Recuerda el problema (tema 1): Parménides decía que el cambio es imposible porque exigiría pasar del ser al no-ser, y de la nada no sale nada. Aristóteles responde con una distinción: hay dos maneras de «ser».</p>" +
    "<ul><li><b>Ser en acto</b>: lo que algo es ya, realmente ahora.</li>" +
    "<li><b>Ser en potencia</b>: lo que algo <i>puede llegar a ser</i>; no es nada, es una posibilidad real de esa cosa.</li></ul>" +
    "<p>La semilla no es un árbol <b>en acto</b>, pero sí lo es <b>en potencia</b>: tiene dentro la posibilidad de serlo. Por eso el cambio no pasa «de la nada»: pasa de una cosa que puede ser X a esa misma cosa siendo X. Una persona que estudia Medicina es médica <i>en potencia</i>; al graduarse, lo es <i>en acto</i>. Y una cosa puede estar en acto respecto a una propiedad y en potencia respecto a otra: el agua fría es agua en acto, pero caliente solo en potencia.</p>" +
    "<p>Hay cuatro tipos de cambio. Merece la pena saber distinguirlos porque aparecen en ejemplos de examen:</p>" +
    tabla(["Tipo de cambio", "Qué cambia", "Ejemplo"], [
      ["<b>Sustancial</b> (generación y corrupción)", "La sustancia entera: algo nuevo aparece o desaparece", "Una semilla se hace árbol; la madera se quema"],
      ["<b>Cualitativo</b> (alteración)", "Una cualidad", "El agua se calienta; la hoja se pone amarilla"],
      ["<b>Cuantitativo</b>", "El tamaño", "El niño crece"],
      ["<b>Local</b>", "El lugar", "La piedra cae; el coche avanza"]
    ]) +
    "<p>Fíjate en cómo cambia el esquema: ya no hay un mundo que cambia y otro que no, hay <b>un solo mundo</b> en el que las cosas pasan, de manera racional, de lo que pueden ser a lo que son. En el cambio intervienen tres elementos: la <b>materia</b> (lo que permanece), la <b>forma</b> nueva que se adquiere y la <b>privación</b> (la ausencia de esa forma al principio: el mármol aún sin figura).</p>";

  // ---------------------------------------------------------------- 4. Cuatro causas
  secciones[3] =
    "<h5>«Causa» significa «por qué»</h5>" +
    "<p>En griego, <i>aitía</i> es más bien «explicación». Cuando Aristóteles dice que hay cuatro causas, no dice que haya cuatro cosas que «empujan». Dice que, para <b>explicar del todo</b> algo, hay que responder a cuatro «por qué» distintos. Si te falta uno, te falta parte de la respuesta. Aplicadas a ejemplos diversos:</p>" +
    tabla(["Causa", "Pregunta", "Estatua de Hermes", "Mesa de madera", "Roble"], [
      ["<b>Material</b>", "¿De qué está hecho?", "Mármol", "Madera", "El agua y los minerales que absorbe"],
      ["<b>Formal</b>", "¿Qué es? ¿Qué forma tiene?", "La figura de Hermes", "La forma de mesa", "Su esencia de roble"],
      ["<b>Eficiente</b>", "¿Quién o qué lo produjo?", "El escultor", "El carpintero", "La bellota de otro roble"],
      ["<b>Final</b>", "¿Para qué existe?", "Adornar el templo", "Comer o trabajar encima", "Llegar a ser un roble adulto"]
    ]) +
    "<h5>Lo que cambia entre lo artificial y lo natural</h5>" +
    "<p>Fíjate en una diferencia que Aristóteles subraya. En una <b>estatua o una mesa</b> (cosas artificiales), el principio del cambio viene de <i>fuera</i>: lo pone el artesano. En un <b>ser natural</b> (un roble, un gato, tú), el principio está <i>dentro</i>: la semilla tiene en sí misma la tendencia a crecer. Eso es lo que Aristóteles llama <b>naturaleza</b> (<i>physis</i>): el principio interno del movimiento y del reposo.</p>" +
    "<h5>La causa final y la teleología</h5>" +
    "<p>Para Aristóteles todo ser natural tiende a un <b>fin</b> (<i>télos</i>) que le es propio. Esta forma de ver el mundo se llama <b>teleología</b> (de <i>télos</i>, «fin»). Es la causa final la que da sentido a las demás: la forma de un ojo, su materia y su origen se entienden mejor si sabes que el ojo existe <i>para ver</i>. Por eso Aristóteles dice que «la naturaleza no hace nada en vano».</p>" +
    ojo("La causa final <b>no implica que la bellota «piense»</b> ni que alguien lo planee. Significa que su desarrollo está orientado de manera natural hacia un resultado (un roble, no un pino). Tampoco es lo mismo que la física moderna: Galileo y Descartes (temas 8 y 9) eliminarán las causas finales y explicarán la naturaleza solo con causas eficientes y matemáticas. Para la PAU: <b>Aristóteles es finalista; la ciencia moderna, no</b>.") +
    ejemplo("Aplica las cuatro causas a una casa", "Una casa que construye un albañil para que viva una familia.", [
      "<b>Material</b>: los ladrillos, el cemento y la madera.",
      "<b>Formal</b>: el plano, la forma de «casa» (lo que hace que ese montón de materiales sea una casa).",
      "<b>Eficiente</b>: el albañil y su cuadrilla.",
      "<b>Final</b>: dar cobijo a una familia."
    ]) +
    w("filo_causas");

  // ---------------------------------------------------------------- 5. Ética
  secciones[4] =
    "<h5>De dónde sale la felicidad: el argumento paso a paso</h5>" +
    "<p>La ética de Aristóteles empieza con una observación casi cotidiana: «toda arte y toda investigación, y lo mismo toda acción y elección, parecen tender a algún bien» (<i>Ética a Nicómaco</i>, I, 1). Estudias para aprobar, apruebas para entrar en la carrera que quieres, quieres esa carrera para ejercer… Cada fin sirve para otro fin. ¿Hay un último? Aristóteles dice que sí, y que debe cumplir dos condiciones: <b>buscarse por sí mismo</b> (no como medio) y ser <b>autosuficiente</b> (no faltarle nada). Ese fin es la <b>felicidad</b> (<i>eudaimonía</i>).</p>" +
    "<p>¿En qué consiste? Aristóteles razona con la <b>función propia</b> (<i>érgon</i>): la función de un ojo es ver, la de un cuchillo cortar; y un ojo o un cuchillo son «buenos» cuando la cumplen bien. ¿Y la función propia del ser humano? No es vivir (lo comparte con las plantas) ni sentir (lo comparte con los animales), sino la <b>actividad racional</b>. Luego la felicidad es <b>actuar según la razón de la mejor manera posible, a lo largo de una vida completa</b>: «una golondrina no hace verano». No es un momento de placer, es un logro de toda la vida.</p>" +
    ojo("No confundas eudaimonía con «pasárselo bien». Es «vida lograda» o «florecer». Aristóteles no desprecia los placeres ni los bienes materiales (salud, amigos, algo de dinero ayudan), pero son condiciones, no el fin.") +
    "<h5>Dos clases de virtudes</h5>" +
    tabla(["", "Virtudes éticas (del carácter)", "Virtudes dianoéticas (del entendimiento)"], [
      ["Parte del alma", "Se ocupa de los deseos y pasiones, que obedecen a la razón", "La parte racional"],
      ["Cómo se logran", "<b>Por costumbre y práctica</b> (<i>éthos</i> = hábito)", "Por la enseñanza y la experiencia"],
      ["Ejemplos", "Valentía, templanza, generosidad, justicia", "Sabiduría (<i>sophía</i>), <b>prudencia</b> (<i>phrónesis</i>), ciencia, arte, intuición"]
    ]) +
    "<p>Las virtudes éticas no se tienen al nacer ni se aprenden de memoria: «nos hacemos justos realizando acciones justas». Como se aprende a tocar la guitarra tocándola, se aprende a ser valiente actuando con valentía. Un hábito bueno es lo que llamamos virtud; uno malo, vicio.</p>" +
    "<h5>El término medio, bien entendido</h5>" +
    "<p>La virtud ética es un hábito que consiste en un <b>término medio</b> entre dos vicios: uno <b>por exceso</b> y otro <b>por defecto</b>. Con ejemplos:</p>" +
    tabla(["Defecto", "Término medio (virtud)", "Exceso"], [
      ["Cobardía", "<b>Valentía</b>", "Temeridad"],
      ["Insensibilidad (no disfrutar nada)", "<b>Templanza</b>", "Desenfreno (disfrutar sin medida)"],
      ["Avaricia (tacañería)", "<b>Generosidad</b>", "Derroche (prodigalidad)"],
      ["Falsa modestia", "<b>Veracidad</b> (decir lo que uno es)", "Jactancia (presumir)"]
    ]) +
    "<p>Dos precisiones que se preguntan mucho:</p>" +
    "<ul><li><b>No es una media aritmética.</b> El término medio es «relativo a nosotros». Aristóteles lo explica con un ejemplo: si para un atleta como Milón diez minas de comida son poco y para un principiante son mucho, el maestro no prescribe seis para todos. Igual con la valentía: lo que es valiente para un bombero no es lo mismo que para ti.</li>" +
    "<li><b>No todo tiene término medio.</b> Hay acciones malas siempre, como el robo, el asesinato o el adulterio: no existe un «punto medio» de asesinar.</li></ul>" +
    "<p>¿Quién decide cuál es el punto justo? La <b>prudencia</b>: la virtud intelectual de saber, en cada situación concreta, qué hay que hacer. El prudente es el modelo. Por eso la definición completa dice que la virtud es «un hábito selectivo que consiste en un término medio relativo a nosotros, determinado por la razón y por aquella por la cual decidiría el hombre prudente».</p>" +
    "<h5>Diferencia con Sócrates y Platón</h5>" +
    "<p>Para Sócrates y Platón, saber el bien lleva a hacerlo (intelectualismo moral): quien obra mal es porque no sabe. Aristóteles dice que <b>saber no basta</b>: hay que habituarse, y existe la <b>incontinencia</b> (<i>akrasía</i>): conocer lo bueno y, aun así, no hacerlo por debilidad. Además, la acción virtuosa debe ser <b>voluntaria y elegida</b> con conocimiento. Por eso la virtud es sobre todo carácter.</p>" +
    "<h5>La felicidad más alta: la contemplación</h5>" +
    "<p>Al final de la <i>Ética a Nicómaco</i> (libro X), Aristóteles distingue dos vidas felices: la <b>vida política</b> (practicar las virtudes éticas con los demás) y la <b>vida contemplativa</b>, que sería la más perfecta, porque ejerce lo mejor que tenemos, la razón teórica (<i>sophía</i>). Y añade algo muy humano: nadie quiere vivir sin amigos, aunque tenga todos los demás bienes. La <b>amistad</b> (<i>philía</i>) es necesaria para ser feliz.</p>" +
    "<p>Resumen de esta ética: es una ética <b>teleológica</b> (se orienta por un fin), <b>eudemonista</b> (el fin es la felicidad) y <b>de virtudes</b> (lo importante es el carácter). Kant (tema 12) la criticará por ser material: para él lo moral no depende del fin, sino del deber.</p>" +
    w("filo_medio") +
    w("clasificar", "medio");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. El conocimiento: de la sensación a la ciencia", html:
    "<p>La obra <i>Metafísica</i> empieza con una frase famosa: «todos los hombres desean por naturaleza saber». Y Aristóteles explica cómo se llega a saber, escalón a escalón, <b>partiendo de los sentidos</b> (a diferencia de Platón, que partía del recuerdo de las Ideas):</p>" +
    tabla(["Escalón", "Qué es", "Ejemplo del médico"], [
      ["1. <b>Sensación</b> (<i>aísthesis</i>)", "Captar lo individual con los sentidos", "Ves que a este enfermo le sienta bien una medicina"],
      ["2. <b>Memoria</b>", "Conservar lo sentido", "Recuerdas que a otros les fue igual"],
      ["3. <b>Experiencia</b> (<i>empeiría</i>)", "Muchos recuerdos del mismo tipo forman una experiencia", "Sabes que «suele funcionar»"],
      ["4. <b>Arte o técnica</b> y <b>ciencia</b>", "Se saben las causas y se capta lo universal", "Sabes <i>por qué</i> funciona en todos los casos de esa enfermedad"],
      ["5. <b>Sabiduría</b> (<i>sophía</i>)", "Conocer las primeras causas y principios", "Filosofía primera: el saber más alto"]
    ]) +
    "<h5>Cómo se llega a lo universal: la abstracción</h5>" +
    "<p>Si las Ideas no están en otro mundo, ¿de dónde sacamos lo universal («caballo», «triángulo»)? Respuesta de Aristóteles: lo <b>abstraemos</b>. Con los sentidos captamos caballos concretos, cada uno distinto; el entendimiento deja a un lado lo que es particular (el color, el tamaño) y se queda con lo que todos tienen en común: la forma «caballo». Así lo universal existe <b>en las cosas</b> (como forma) y <b>en la mente</b> (como concepto), pero no en un mundo aparte. Los comentaristas hablan de un «entendimiento agente», que sería la capacidad de extraer lo inteligible de lo sensible.</p>" +
    ojo("Sin imágenes de los sentidos no se piensa, dice Aristóteles. Es lo contrario de Platón: para él, si un alma sin cuerpo pudiese pensar, sería recordando las Ideas. Para Aristóteles, <b>la sensación es indispensable</b>.") +
    "<h5>La lógica: el instrumento del razonamiento</h5>" +
    "<p>Aristóteles fue el primero en estudiar de forma sistemática cómo se razona. Su pieza central es el <b>silogismo</b>: un razonamiento de tres enunciados en el que, aceptadas las dos primeras (premisas), la tercera (conclusión) se sigue necesariamente.</p>" +
    ejemplo("Un silogismo clásico", "Todos los seres humanos son mortales. Aristóteles es un ser humano. ¿Qué se sigue?", [
      "<b>Premisa mayor</b>: todos los seres humanos son mortales (el universal).",
      "<b>Premisa menor</b>: Aristóteles es un ser humano (el caso).",
      "<b>Conclusión</b>: Aristóteles es mortal."
    ]) +
    "<p>Tres principios, que la tradición atribuye a su lógica, sostienen el razonamiento: el <b>principio de no contradicción</b> (algo no puede ser y no ser lo mismo a la vez y en el mismo sentido), el de <b>identidad</b> y el del <b>tercero excluido</b> (o es A o no es A). La lógica de Aristóteles fue la lógica oficial durante casi dos mil años.</p>" +
    "<p>Ordénalo tú mismo:</p>" +
    w("orden", "ordenconoc") });

  nuevas.push({ h: "7. El alma y el Primer motor inmóvil", html:
    "<h5>El alma como forma del cuerpo</h5>" +
    "<p>Aristóteles aplica el hilemorfismo a los seres vivos: el <b>cuerpo es la materia</b> y el <b>alma es la forma</b>. El alma no es un «fantasma» metido en el cuerpo (como pensaba Platón), sino el principio que organiza el cuerpo y lo hace vivir. Su ejemplo: si un hacha fuese un ser vivo, su alma sería «cortar». Y un ojo sin la capacidad de ver ya no es un ojo. Por eso alma y cuerpo no se separan, igual que no se separan la forma y la materia de una estatua.</p>" +
    tabla(["Tipo de alma", "Funciones", "Quién la tiene"], [
      ["<b>Vegetativa</b>", "Nutrirse, crecer, reproducirse", "Plantas, animales y personas"],
      ["<b>Sensitiva</b>", "Sentir, desear, moverse", "Animales y personas"],
      ["<b>Racional</b>", "Pensar, razonar, elegir", "Solo las personas"]
    ]) +
    "<p>El ser humano tiene las tres, pero la que le define es la racional. Esta diferencia con Platón es fundamental: <b>Platón es dualista</b> (alma inmortal, cuerpo mortal, separables) y <b>Aristóteles es hilemorfista</b> (alma y cuerpo unidos, como forma y materia). Su posición sobre la inmortalidad es discutida: parece reservar un papel separable solo al entendimiento activo.</p>" +
    "<h5>De cada cambio al Primer motor inmóvil</h5>" +
    "<p>En la <i>Física</i> y la <i>Metafísica</i>, Aristóteles razona así:</p>" +
    "<ol><li>Todo lo que se mueve (cambia) es movido por <b>otra cosa</b>: la piedra, por la mano; la mano, por el brazo…</li>" +
    "<li>Esa cadena de motores no puede ser infinita, porque entonces nada empezaría a moverse.</li>" +
    "<li>Hay que llegar a un <b>primer motor</b> que mueve <b>sin ser movido</b>: el <b>Primer motor inmóvil</b>.</li></ol>" +
    "<p>¿Qué tiene de especial? Es <b>acto puro</b>: sin materia y sin ninguna potencia pendiente, porque lo que tiene algo por realizar aún se movería. Es eterno. Y mueve <b>como causa final</b>, no empujando: «como lo amado mueve al amante». Las cosas se mueven porque tienden hacia su perfección, y la perfección máxima las atrae. Su actividad es pensar, y como lo mejor que existe solo puede pensar en lo mejor, «es pensamiento que se piensa a sí mismo».</p>" +
    ojo("El Primer motor <b>no es el Dios cristiano</b>: no crea el mundo (la materia es eterna), no tiene providencia, no se ocupa de nosotros y no responde a nuestras oraciones. Tomás de Aquino (tema 7) reelaborará esta idea, en sus «vías», para argumentar la existencia del Dios cristiano.") +
    "<h5>El cosmos aristotélico</h5>" +
    "<p>Aristóteles imagina un universo finito y <b>geocéntrico</b>: la Tierra, inmóvil, está en el centro, y alrededor giran esferas concéntricas con los astros. Distingue el mundo <b>sublunar</b> (bajo la Luna), donde todo cambia, nace y muere, del <b>supralunar</b> (el cielo), hecho de un elemento incorruptible, el éter, con movimiento circular perfecto. Esta visión dominó hasta Copérnico y Galileo (tema 8).</p>" });

  nuevas.push({ h: "8. Política: el animal que vive en ciudad", html:
    "<p>En la <i>Política</i> Aristóteles aplica sus ideas a la vida colectiva. Tres afirmaciones centrales:</p>" +
    "<ul><li><b>El ser humano es un animal político</b> (<i>zôon politikón</i>). No es una elección: por naturaleza necesitamos vivir en comunidad, y tenemos <b>lenguaje</b> (<i>lógos</i>) para discutir lo justo y lo injusto, algo que los demás animales no hacen.</li>" +
    "<li><b>La ciudad (<i>pólis</i>) precede al individuo.</b> Es el todo, y el todo es anterior a las partes: una mano separada del cuerpo ya no es una mano. Fuera de la polis, el ser humano no puede realizarse.</li>" +
    "<li><b>La polis existe para vivir bien</b>, no solo para vivir: su fin es la felicidad y la virtud de sus ciudadanos. La política es la continuación natural de la ética.</li></ul>" +
    "<p>El orden de formación de la ciudad también es natural: primero la <b>familia</b> (<i>oikía</i>), después la <b>aldea</b> (varias familias) y, por último, la <b>polis</b>, que es autosuficiente.</p>" +
    "<h5>Las constituciones</h5>" +
    "<p>Aristóteles clasifica los regímenes con dos criterios: <b>cuántos gobiernan</b> (uno, pocos o muchos) y <b>en interés de quién</b> (el común o el propio de los gobernantes). Resultan seis:</p>" +
    tabla(["Gobiernan…", "Forma recta (interés común)", "Forma desviada (interés propio)"], [
      ["Uno", "<b>Monarquía</b>", "<b>Tiranía</b>"],
      ["Pocos", "<b>Aristocracia</b>", "<b>Oligarquía</b> (gobierno de los ricos)"],
      ["Muchos", "<b>Politeia</b> (o república)", "<b>Democracia</b> (gobierno de los pobres en su beneficio)"]
    ]) +
    ojo("La «democracia» de Aristóteles <b>no es la nuestra</b>: para él es la forma <i>desviada</i> del gobierno de muchos, el que gobierna solo en interés de los pobres. La forma buena del gobierno de muchos se llama <i>politeia</i>.") +
    "<p>¿Cuál es la mejor? En teoría, la monarquía o la aristocracia de los mejores. Pero Aristóteles es realista: en la práctica recomienda la <b>politeia</b>, un gobierno mixto con una <b>clase media numerosa</b> que evite que dominen los muy ricos o los muy pobres, y en el que se respeten las leyes.</p>" +
    "<h5>Crítica a Platón</h5>" +
    "<p>Aristóteles rechaza el Estado ideal de la <i>República</i>: (1) pedir a los guardianes comunidad de bienes, mujeres e hijos es un error, porque «lo que es de muchos es cuidado por nadie»; (2) querer una ciudad con una unidad absoluta la destruye: una polis necesita variedad; (3) la política es un saber práctico, que busca lo mejor posible, no un plano perfecto derivado de las Ideas.</p>" +
    "<p>Una parte hoy inaceptable: Aristóteles defendió la <b>esclavitud «natural»</b> y la subordinación de las mujeres. Lo correcto, en un comentario, es exponerlo y valorarlo críticamente: era una opinión extendida en su época, pero su razonamiento no es defendible, y muestra los límites de su concepto de «naturaleza».</p>" +
    w("emparejar", "constituciones") });

  nuevas.push({ h: "9. Mapa del tema: Aristóteles y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y comparar con otro. Con Aristóteles, estas son las relaciones más rentables:</p>" +
    tabla(["Autor", "Relación con Aristóteles"], [
      ["Parménides y Heráclito (T1)", "Aristóteles explica el cambio con potencia y acto: no hace falta negarlo (Parménides) ni que todo fluya sin ser (Heráclito)."],
      ["Sócrates (T2)", "Recoge la búsqueda de definiciones universales, pero rechaza que saber el bien baste para hacerlo."],
      ["Platón (T3)", "Su maestro. Rechaza las Ideas separadas: la forma está en la cosa. De «dos mundos» a «un mundo»."],
      ["Helenismo (T5)", "Mantienen la felicidad como meta, pero sin la polis ni la contemplación como centro."],
      ["Tomás de Aquino (T7)", "Asume a Aristóteles en el cristianismo: hilemorfismo, potencia/acto, causas, ley natural y ética de las virtudes."],
      ["Renacimiento (T8)", "Galileo derriba su física y su cosmos geocéntrico."],
      ["Descartes (T9)", "Elimina las causas finales y sustituye el hilemorfismo por el dualismo alma–cuerpo."],
      ["Kant (T12)", "Ética formal del deber frente a ética material de la felicidad y las virtudes."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Aristóteles</h5>" +
    tabla(["Ámbito", "Tesis de Aristóteles"], [
      ["Realidad", "Un solo mundo de sustancias, compuestas de materia y forma (hilemorfismo); el cambio es paso de potencia a acto; cuatro causas; Primer motor inmóvil."],
      ["Conocimiento", "Parte de los sentidos; abstracción de lo universal; ciencia = conocer las causas; silogismo."],
      ["Ser humano", "Alma = forma del cuerpo; tres almas; animal racional y político."],
      ["Ética", "Eudaimonía = actividad racional virtuosa; virtud como término medio, guiado por la prudencia."],
      ["Política", "Animal político; polis anterior al individuo; seis constituciones; mejor en práctica la politeia."]
    ]) });

  nuevas.push({ h: "10. Comentario de texto resuelto: el término medio", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Aristóteles, <em>Ética a Nicómaco</em>, libro II, cap. 6; traducción española habitual, que varía levemente según la edición):<br><em>«La virtud es, pues, un hábito selectivo que consiste en un término medio relativo a nosotros, determinado por la razón y por aquella por la cual decidiría el hombre prudente.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Aristóteles (384–322 a. C.), <i>Ética a Nicómaco</i>, obra de madurez que reúne sus lecciones en el Liceo. Contexto: se trata de la definición de la virtud ética tras haber explicado que la felicidad es actividad virtuosa.</li>" +
    "<li><b>2. Tema.</b> La definición de la virtud ética como término medio.</li>" +
    "<li><b>3. Idea principal.</b> La virtud es un hábito (se adquiere con la práctica) que elige el punto justo entre un exceso y un defecto; ese punto no es igual para todos y lo fija la razón del prudente.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Hábito selectivo»: disposición adquirida por repetición; «selectivo» porque implica elegir. (b) «Término medio relativo a nosotros»: no es una media aritmética, depende de la persona y la situación (ejemplo de Milón). (c) «Razón»: la regla la pone la razón, no el impulso. (d) «Hombre prudente»: el modelo vivo, quien posee <i>phrónesis</i>.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la pieza central de su ética: la felicidad (<i>eudaimonía</i>) exige practicar virtudes; las virtudes éticas son hábitos; la prudencia es la virtud intelectual que guía a las éticas. Enlaza con su teleología: cada ser tiene una función propia y la persona la cumple actuando según la razón.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Platón: este vinculaba virtud y conocimiento del Bien (intelectualismo moral); Aristóteles añade el hábito y la prudencia: no basta saber. Con Kant (tema 12): para Aristóteles la moral busca la felicidad y se aprende en la vida; para Kant, la moral es deber universal con independencia del fin.</li>" +
    "<li><b>7. Valora y concluye.</b> La ética de las virtudes tiene una gran vigencia: la moral como carácter y práctica, no solo normas. Su límite: da poca guía cuando dos virtudes chocan y ofrece un criterio («lo que haría el prudente») algo circular.</li></ol>" +
    ojo("Errores típicos: (1) decir que el término medio es la <b>mitad aritmética</b>; (2) olvidar que se refiere a la virtud <b>ética</b> y a que hay acciones sin término medio; (3) no nombrar la <b>prudencia</b>; (4) comparar con Platón sin explicar que la diferencia es el papel del hábito.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica el hilemorfismo y la pareja potencia–acto", "Respuesta modelo:", [
      "<b>Definición.</b> Toda sustancia natural es un compuesto de materia (sustrato) y forma (esencia que organiza).",
      "<b>Ejemplo.</b> Estatua de mármol; en un ser vivo, el cuerpo es la materia y el alma la forma.",
      "<b>Potencia y acto.</b> Potencia = capacidad de llegar a ser; acto = su realización. La semilla es árbol en potencia.",
      "<b>Función.</b> Explican el cambio como paso de potencia a acto; Parménides negaba el cambio.",
      "<b>Relación.</b> Rechaza las Ideas separadas de Platón: la forma está en la cosa."
    ]) +
    ejemplo("Pregunta 2. Explica las cuatro causas", "Respuesta modelo:", [
      "<b>Idea general.</b> Causa = respuesta a un «por qué».",
      "<b>Cuatro causas con ejemplo.</b> Material, formal, eficiente y final (mesa o estatua).",
      "<b>Causa final.</b> Todo ser natural tiende a un fin (<i>télos</i>): teleología.",
      "<b>Valoración.</b> La ciencia moderna eliminó las causas finales."
    ]) +
    ejemplo("Pregunta 3. Ética de Aristóteles", "Respuesta modelo:", [
      "<b>Fin último.</b> La felicidad (<i>eudaimonía</i>), buscada por sí misma.",
      "<b>Función propia.</b> La actividad racional, practicando la virtud.",
      "<b>Virtudes.</b> Éticas (hábito, término medio) y dianoéticas (prudencia).",
      "<b>Ejemplo.</b> Valentía entre cobardía y temeridad; relativa a cada persona.",
      "<b>Comparación.</b> Con Sócrates/Platón (el saber no basta) o con Kant (deber)."
    ]) +
    ejemplo("Pregunta 4. Política de Aristóteles", "Respuesta modelo:", [
      "<b>Animal político.</b> El ser humano necesita la polis y tiene lenguaje.",
      "<b>Polis anterior al individuo; fin: vivir bien.</b>",
      "<b>Constituciones.</b> Seis, tres rectas y tres desviadas; la mejor en la práctica, la politeia.",
      "<b>Crítica a Platón.</b> Rechaza la comunidad de bienes y mujeres."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf4a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
