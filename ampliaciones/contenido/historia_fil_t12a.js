/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 12: Kant
   (parte A: teoría. Parte B, historia_fil_t12b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. La Ilustración: «minoría de edad», «sapere aude», uso público y privado de la razón → sección nueva 8 + comentario.
   2. Juicios analíticos/sintéticos y a priori/a posteriori; el sintético a priori → sección 3 + widget filo_juicios.
   3. Giro copernicano: la mente aporta la forma, la experiencia la materia → sección 2.
   4. Estética, Analítica y Dialéctica: qué hace cada facultad (sensibilidad, entendimiento, razón) → sección nueva 6.
   5. Fenómeno y noúmeno: el noúmeno es concepto límite, no un «mundo oculto» → sección 4.
   6. Imperativo hipotético y categórico y sus formulaciones; autonomía frente a heteronomía → sección 5 + widget filo_universal.
   7. Postulados de la razón práctica (libertad, inmortalidad, Dios) y bien supremo → sección nueva 7.
   8. Paz perpetua, república y derecho cosmopolita → sección nueva 8.
   9. Relación con Hume, Descartes, Platón, Aristóteles y Rousseau → sección nueva 9.
   10. Comentario de texto: «¿Qué es la Ilustración?» → comentario resuelto (sección 10).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t12/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Kant: vida, obra y plan
  secciones[0] =
    "<h5>La vida de Kant (1724–1804) paso a paso</h5>" +
    "<p>Immanuel Kant nació el 22 de abril de 1724 en <b>Königsberg</b> (Prusia Oriental), en una familia modesta y de religiosidad <b>pietista</b>, y murió en la misma ciudad el 12 de febrero de 1804. Casi no salió de ella: toda su aventura fue intelectual. Su vida cabe en cuatro etapas:</p>" +
    "<ul><li><b>1740: entra en la universidad de Königsberg</b>, donde estudia filosofía, física y matemáticas (Newton le fascina).</li>" +
    "<li><b>Años de preceptor y profesor sin cátedra</b> (hasta 1770): escribe sobre ciencia natural y metafísica. Es la etapa <b>precrítica</b>, todavía bastante racionalista (influido por Leibniz y Wolff).</li>" +
    "<li><b>1770: catedrático de lógica y metafísica</b>. Sigue entonces un largo «silencio» de unos once años en el que prepara su gran obra.</li>" +
    "<li><b>1781: <i>Crítica de la razón pura</i></b>, con 57 años. Empieza la etapa <b>crítica</b>: en veinte años escribe casi todo lo que le hará célebre.</li></ul>" +
    "<p>Vivió en la <b>Prusia de Federico II el Grande</b> (rey de 1740 a 1786), un «déspota ilustrado» que toleraba la libertad de pensar. Tras su muerte, el nuevo rey endureció la censura: en 1794 Kant recibió una reprimenda por sus escritos sobre religión.</p>" +
    tabla(["Año", "Obra", "De qué trata"], [
      ["1781 (2.ª ed. 1787)", "<i>Crítica de la razón pura</i>", "Qué podemos conocer y qué no (razón teórica)"],
      ["1783", "<i>Prolegómenos a toda metafísica futura</i>", "Resumen más claro de la Crítica"],
      ["1784", "<i>¿Qué es la Ilustración?</i> e <i>Idea de una historia universal</i>", "Ilustración e historia"],
      ["1785", "<i>Fundamentación de la metafísica de las costumbres</i>", "Fundamento de la moral"],
      ["1788", "<i>Crítica de la razón práctica</i>", "Moral, libertad y postulados"],
      ["1790", "<i>Crítica del juicio</i>", "Belleza y finalidad"],
      ["1793", "<i>La religión dentro de los límites de la mera razón</i>", "Religión racional"],
      ["1795", "<i>Hacia la paz perpetua</i>", "Política y relaciones internacionales"]
    ]) +
    "<h5>Las cuatro preguntas</h5>" +
    "<p>Kant resume su proyecto en cuatro preguntas: <b>¿Qué puedo saber?</b> (metafísica y conocimiento), <b>¿qué debo hacer?</b> (moral), <b>¿qué me cabe esperar?</b> (religión) y <b>¿qué es el ser humano?</b> (antropología, a la que las otras remiten). Las tres primeras ordenan este tema.</p>" +
    "<p>Ordena tú sus obras principales:</p>" + w("orden", "obras") +
    ojo("Kant no es «un empirista» ni «un racionalista». Acepta del empirismo que <b>sin experiencia no hay conocimiento</b> y del racionalismo que <b>la razón aporta principios propios</b>. Esa es la síntesis.");

  // ---------------------------------------------------------------- 2. Giro copernicano
  secciones[1] =
    "<h5>La imagen de las gafas</h5>" +
    "<p>Imagina que llevas <b>gafas de color verde</b> pegadas a la cara desde que naciste. Todo lo que ves es verde, y no por eso el mundo es verde: el color lo pone el modo en que miras. Kant dice algo parecido (con una diferencia: tus «gafas» no se pueden quitar). Para conocer algo, la <b>experiencia</b> te da el contenido (<b>materia</b>) y tu mente lo ordena con sus propias estructuras (<b>forma</b>): espacio, tiempo y categorías.</p>" +
    tabla(["", "Antes (racionalistas y empiristas)", "Kant"], [
      ["Papel de la mente", "Copia lo que hay fuera", "Pone la forma del conocimiento"],
      ["Se adapta…", "el sujeto al objeto", "el objeto (como lo conocemos) al sujeto"],
      ["¿Conocemos la cosa en sí?", "Se suponía que sí", "No: solo el fenómeno"]
    ]) +
    "<p>Fíjate en la analogía con Copérnico: él dejó de suponer que el Sol giraba alrededor de nosotros y probó lo contrario; Kant deja de suponer que la mente gira alrededor de los objetos y prueba a ver qué pasa si <b>los objetos, tal como los conocemos, giran alrededor de las condiciones de la mente</b>. Y gracias a ello explica por qué hay conocimiento necesario y universal.</p>" +
    "<p>Su frase más citada sobre esto (traducción habitual): «los pensamientos sin contenido son vacíos; las intuiciones sin conceptos son ciegas». Sin sentidos no hay nada que pensar; sin conceptos, lo que sentimos no se entiende.</p>" +
    ojo("«Giro copernicano» <b>no</b> significa que Kant crea que todo es subjetivo o inventado. Las estructuras son las mismas en todos los seres humanos, y por eso la ciencia es objetiva.");

  // ---------------------------------------------------------------- 3. Juicios
  secciones[2] =
    "<h5>Un test de dos preguntas</h5>" +
    "<p>Para clasificar cualquier juicio, hazte dos preguntas independientes:</p>" +
    "<ol><li><b>¿El predicado ya está dentro del sujeto?</b> Si sí, es <b>analítico</b> (explica); si no, es <b>sintético</b> (amplía).</li>" +
    "<li><b>¿Hace falta la experiencia para saber que es verdadero?</b> Si no, es <b>a priori</b> (necesario y universal); si sí, <b>a posteriori</b>.</li></ol>" +
    tabla(["", "A priori", "A posteriori"], [
      ["<b>Analítico</b>", "«Todos los cuerpos son extensos»", "No existe"],
      ["<b>Sintético</b>", "«7 + 5 = 12»; «todo suceso tiene causa»", "«Todos los cuerpos son pesados»; «hoy llueve»"]
    ]) +
    "<p>El empirismo de Hume dejaba solo dos opciones: o analítico a priori (verdad lógica, sin novedad) o sintético a posteriori (hecho, sin necesidad). Pero <b>matemáticas y física newtoniana</b> parecen dar conocimiento nuevo <i>y</i> necesario. Por eso la pregunta de la <i>Crítica</i> es: <b>¿cómo son posibles los juicios sintéticos a priori?</b> Se despliega en tres: ¿en matemáticas? (Estética), ¿en física? (Analítica), ¿en metafísica? (Dialéctica). Respuesta: sí en las dos primeras; en la tercera, no.</p>" +
    ojo("Un error frecuente: decir que «a priori» significa «anterior en el tiempo» o «innato». Significa <b>independiente de la experiencia particular</b> en su justificación. Tampoco hay juicios analíticos a posteriori.") +
    "<p>Pruébalo tú:</p>" + w("filo_juicios");

  // ---------------------------------------------------------------- 4. Fenómeno y noúmeno
  secciones[3] =
    "<h5>Dos palabras, un límite</h5>" +
    "<p><b>Fenómeno</b> (del griego <i>phainómenon</i>, «lo que aparece») es la realidad tal como la conocemos, ya organizada por espacio, tiempo y categorías. <b>Noúmeno</b> («lo pensado») o <b>cosa en sí</b> es la realidad independiente de nuestra manera de conocer. No es un segundo mundo escondido, como las Ideas de Platón: es un <b>concepto límite</b> que recuerda que nuestro conocimiento tiene fronteras.</p>" +
    ejemplo("Un ejemplo con tu móvil", "¿Cómo lo aplica Kant?", [
      "Ves el móvil con forma, color y lugar: eso es <b>fenómeno</b>.",
      "Lo ves en el espacio, durante un tiempo y como causa del sonido: eso lo pone tu mente.",
      "Cómo es el móvil «por sí mismo», sin ser percibido: el <b>noúmeno</b>. De eso no podemos saber nada."
    ]) +
    "<p>Consecuencia: la ciencia es válida, pero <b>solo dentro de la experiencia posible</b>. La metafísica tradicional (Dios, alma, mundo como totalidad) no puede ser ciencia. Kant lo resume (traducción habitual): «tuve que suprimir el saber para dejar sitio a la fe». Es decir: se limita el saber para dejar espacio a la moral.</p>";

  // ---------------------------------------------------------------- 5. Ética
  secciones[4] =
    "<h5>Buena voluntad y deber</h5>" +
    "<p>La <i>Fundamentación</i> empieza así (traducción habitual): «ni en el mundo ni fuera de él es posible pensar nada que pueda considerarse bueno sin restricción, excepto una <b>buena voluntad</b>». La inteligencia, el valor o la riqueza pueden usarse mal; la voluntad buena es buena por <b>querer cumplir el deber</b>, no por lo que consiga.</p>" +
    ejemplo("El tendero honesto", "Un tendero no cobra de más a un niño que no sabe contar. ¿Es una acción moral?", [
      "Si lo hace porque así conserva clientes, actúa <b>conforme al deber</b>, pero por interés: no tiene valor moral.",
      "Si lo hace porque es lo debido, actúa <b>por deber</b>: solo esa acción tiene valor moral.",
      "Por eso la moral de Kant se llama <b>deontológica</b>: lo importante es la intención, no las consecuencias."
    ]) +
    "<h5>Imperativos: hipotético y categórico</h5>" +
    tabla(["", "Hipotético", "Categórico"], [
      ["Forma", "«Si quieres X, haz Y»", "«Haz Y» (sin condición)"],
      ["Ejemplo", "«Si quieres aprobar, estudia»", "«No mientas»"],
      ["Vale…", "solo para quien quiere ese fin", "para todo ser racional"],
      ["Pertenece a…", "técnica y prudencia", "moral"]
    ]) +
    w("clasificar", "imperativos") +
    "<h5>Las formulaciones del imperativo categórico</h5>" +
    "<ul><li><b>Ley universal</b>: «obra solo según aquella máxima por la cual puedas querer que al mismo tiempo se convierta en ley universal» (traducción habitual).</li>" +
    "<li><b>Ley de la naturaleza</b>: obra como si tu máxima fuera a convertirse en ley universal de la naturaleza.</li>" +
    "<li><b>Humanidad como fin</b>: trata a la humanidad, en ti y en los demás, siempre como un fin y nunca solamente como un medio.</li>" +
    "<li><b>Autonomía</b>: considera tu voluntad como legisladora universal; así formamos un «reino de los fines».</li></ul>" +
    "<p>Una <b>máxima</b> es el principio subjetivo por el que actúas («yo miento cuando me conviene»). El imperativo categórico no te dice qué hacer, sino <b>cómo comprobar</b> tu máxima: por eso la ética kantiana es <b>formal</b>, frente a las éticas <b>materiales</b> (como la de Aristóteles) que indican un fin como la felicidad.</p>" +
    ojo("<b>Autonomía</b>: la voluntad se da a sí misma la ley (la razón). <b>Heteronomía</b>: la voluntad obedece algo externo (deseos, castigos, premios, autoridad). Solo la autonomía es moral.") +
    "<p>Prueba el test con los ejemplos de Kant:</p>" + w("filo_universal") + "<p>Y ordena los pasos del test:</p>" + w("orden", "prueba") +
    "<p>Kant distingue <b>deberes perfectos</b> (no admiten excepción: no mentir, no suicidarse) e <b>imperfectos</b> (dejan margen: ayudar a otros, cultivar talentos). Críticas habituales: es demasiado <b>rigorista</b> (¿ni siquiera mentir al asesino?) y <b>formalista</b>, y no resuelve bien los conflictos de deberes.</p>";

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Las tres partes de la Crítica: sensibilidad, entendimiento y razón", html:
    "<p>La <i>Crítica de la razón pura</i> examina tres facultades y cada una tiene su parte:</p>" +
    tabla(["Parte", "Facultad", "Qué hace", "Resultado"], [
      ["<b>Estética trascendental</b>", "Sensibilidad", "Recibe las impresiones y las ordena en <b>espacio</b> (sentido externo) y <b>tiempo</b> (sentido interno)", "Fundamenta matemáticas y geometría"],
      ["<b>Analítica trascendental</b>", "Entendimiento", "Piensa con <b>categorías</b>", "Fundamenta la física: conocimiento válido de fenómenos"],
      ["<b>Dialéctica trascendental</b>", "Razón", "Busca lo incondicionado: <b>ideas</b> de alma, mundo y Dios", "Ilusión: no hay conocimiento"]
    ]) +
    w("clasificar", "facultades") +
    "<h5>Estética: espacio y tiempo</h5>" +
    "<p>Espacio y tiempo no son cosas ni conceptos sacados de la experiencia: son las <b>formas puras de la intuición</b>, el «molde» en el que recibimos lo sensible. Por eso la geometría (espacio) y la aritmética (tiempo, sucesión) valen necesariamente para todo lo que experimentemos.</p>" +
    "<h5>Analítica: las doce categorías</h5>" +
    tabla(["Grupo", "Categorías"], [
      ["Cantidad", "unidad, pluralidad, totalidad"],
      ["Cualidad", "realidad, negación, limitación"],
      ["Relación", "sustancia–accidente, causa–efecto, acción recíproca"],
      ["Modalidad", "posibilidad, existencia, necesidad"]
    ]) +
    "<p>La causalidad no la <i>vemos</i> (como decía Hume): la <b>ponemos</b> nosotros al ordenar la experiencia, y por eso toda experiencia la cumple necesariamente. Así Kant responde a Hume. Todas las categorías se unifican en el «yo pienso» (<b>apercepción trascendental</b>): la unidad de la conciencia que acompaña todas mis representaciones.</p>" +
    "<h5>Dialéctica: la ilusión de la metafísica</h5>" +
    "<p>La razón quiere ir más allá de la experiencia y completar el conocimiento con tres <b>ideas</b>. Al tratarlas como si fueran objetos de conocimiento cae en errores:</p>" +
    tabla(["Idea", "Disciplina tradicional", "Error de la razón"], [
      ["<b>Alma</b>", "Psicología racional", "<b>Paralogismos</b>: del «yo pienso» se deduce falsamente un alma-sustancia (crítica a Descartes)"],
      ["<b>Mundo</b>", "Cosmología racional", "<b>Antinomias</b>: se pueden «demostrar» tesis opuestas (mundo finito o infinito, libertad o determinismo)"],
      ["<b>Dios</b>", "Teología racional", "Las pruebas (ontológica, cosmológica, físico-teológica) no prueban nada"]
    ]) +
    "<p>Sobre la prueba ontológica, Kant dice que «existir» no es una propiedad que añadamos a un concepto: cien táleros reales no contienen ni una moneda más que cien táleros pensados (paráfrasis). Pero las ideas sirven de <b>uso regulativo</b>: no amplían el conocimiento, pero orientan la investigación hacia una unidad cada vez mayor.</p>" +
    ojo("Kant <b>no demuestra que Dios no exista</b>: dice que la razón teórica no puede ni probarlo ni refutarlo. La esperanza se recupera en la razón práctica.") });

  nuevas.push({ h: "7. Razón práctica: libertad, postulados y bien supremo", html:
    "<p>Si en la razón teórica no podemos conocer lo que está más allá de la experiencia, ¿qué pasa con la libertad, el alma y Dios? En la <i>Crítica de la razón práctica</i> (1788) Kant los recupera como <b>postulados</b>: no son conocimientos, sino <b>supuestos necesarios para que la moral tenga sentido</b>.</p>" +
    tabla(["Postulado", "Por qué hace falta"], [
      ["<b>Libertad</b>", "Si debo, puedo («debes, luego puedes»): sin libertad el deber carece de sentido. En el mundo fenoménico todo está causado; como ser racional (noúmeno) soy libre."],
      ["<b>Inmortalidad del alma</b>", "La santidad (adecuación total de la voluntad a la ley) exige un progreso infinito que no cabe en una vida."],
      ["<b>Existencia de Dios</b>", "Garantiza que al final virtud y felicidad coincidan (el <b>bien supremo</b>)."]
    ]) +
    "<p>El <b>bien supremo</b> es la virtud unida a la felicidad merecida. Importante: <b>no actuamos moralmente para ser felices</b> (eso sería heteronomía), sino que esperamos ser dignos de la felicidad. Esa esperanza es una <b>fe racional</b> o moral.</p>" +
    ojo("Los postulados no son pruebas. Para Kant sigue siendo imposible <i>demostrar</i> a Dios con la razón teórica; lo que hace es mostrar que la moral lo <i>presupone</i>. Cierra el famoso pasaje de la <i>Crítica de la razón práctica</i> (traducción habitual): «el cielo estrellado sobre mí y la ley moral en mí».") +
    w("emparejar", "postulados") });

  nuevas.push({ h: "8. Ilustración, historia y política", html:
    "<h5>¿Qué es la Ilustración? (1784)</h5>" +
    "<p>Kant respondió en diciembre de 1784, en la revista <i>Berlinische Monatsschrift</i>, a la pregunta de qué es la Ilustración. Su respuesta (traducción habitual, que varía según la edición): la Ilustración es la salida del ser humano de su <b>minoría de edad</b>, de la que él mismo es culpable. La minoría de edad es la incapacidad de servirse del propio entendimiento sin la guía de otro. Es culpable porque la causa no es falta de inteligencia, sino de <b>decisión y valor</b>. De ahí el lema <b>«<i>Sapere aude</i>»</b>: «¡Ten el valor de servirte de tu propio entendimiento!» (expresión tomada de Horacio).</p>" +
    "<ul><li><b>Causas</b>: la <b>pereza</b> y la <b>cobardía</b>; es cómodo que otros (el tutor, el médico, el pastor) piensen por mí.</li>" +
    "<li><b>Condición</b>: la <b>libertad</b>, en concreto la de hacer <b>uso público de la razón</b>.</li></ul>" +
    tabla(["", "Uso público", "Uso privado"], [
      ["Quién", "El sabio que escribe ante todo el público lector", "La persona en su puesto o función civil"],
      ["Ejemplo", "Criticar un impuesto en un escrito", "Un oficial que ejecuta las órdenes; un cura que enseña el catecismo"],
      ["Libertad", "Debe ser <b>ilimitada</b>", "Puede restringirse (obediencia)"]
    ]) +
    "<p>La paráfrasis que resume: «razonad cuanto queráis y sobre lo que queráis, pero obedeced». Kant añade que vivía <b>en una época de Ilustración, no en una época ilustrada</b>: el proceso está en marcha, pero sin terminar.</p>" +
    ojo("«Uso privado» no es lo que haces en casa. Es el que haces <b>desde un cargo</b>; el «público» es el de cualquier ciudadano que habla ante el público como sabio.") +
    "<h5>Historia y política</h5>" +
    "<p>En la <i>Idea de una historia universal</i> (1784), Kant habla de la <b>insociable sociabilidad</b>: los humanos necesitan vivir juntos pero compiten entre sí, y ese conflicto empuja al progreso hasta una sociedad regida por el derecho. En <i>Hacia la paz perpetua</i> (1795) propone tres condiciones:</p>" +
    tabla(["Artículo definitivo", "Contenido"], [
      ["1.º", "La constitución de cada Estado debe ser <b>republicana</b> (libertad, igualdad ante la ley, separación de poderes y representación)"],
      ["2.º", "El derecho de gentes se funda en una <b>federación de Estados libres</b>"],
      ["3.º", "El derecho cosmopolita se limita a la <b>hospitalidad universal</b>"]
    ]) +
    "<p>Una república no es lo mismo que una democracia directa: para Kant, el poder ejecutivo y el legislativo deben estar separados. Estas ideas inspiraron la Sociedad de Naciones y la ONU.</p>" });

  nuevas.push({ h: "9. Mapa del tema: Kant y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar y comparar. Las relaciones más rentables de Kant:</p>" +
    tabla(["Autor", "Relación con Kant"], [
      ["Platón (T3)", "Fenómeno/noúmeno recuerda a sensible/inteligible, pero Kant niega que podamos conocer el noúmeno."],
      ["Aristóteles (T4)", "Ética material de la felicidad y las virtudes frente a ética formal del deber."],
      ["Descartes (T9)", "Critica el cogito como sustancia (paralogismos): el «yo pienso» es forma, no una cosa conocida."],
      ["Locke y Hume (T10)", "Acepta que todo conocimiento empieza con la experiencia, pero no que todo proceda de ella. Hume le «despertó del sueño dogmático»."],
      ["Rousseau (T11)", "Admira su idea de libertad y de voluntad general; Kant la formula como autonomía moral."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Kant</h5>" +
    tabla(["Ámbito", "Tesis de Kant"], [
      ["Conocimiento", "Experiencia (materia) + estructuras de la mente (forma); juicios sintéticos a priori; giro copernicano."],
      ["Realidad", "Solo conocemos fenómenos; el noúmeno es concepto límite."],
      ["Metafísica", "Alma, mundo y Dios: ideas de la razón con uso regulativo; no hay conocimiento."],
      ["Moral", "Buena voluntad, deber, imperativo categórico, autonomía; postulados de la razón práctica."],
      ["Sociedad", "Ilustración, república, federación de Estados y paz perpetua."]
    ]) });

  nuevas.push({ h: "10. Comentario de texto resuelto: ¿Qué es la Ilustración?", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Kant, <em>¿Qué es la Ilustración?</em>, 1784; fragmento en traducción española habitual, que varía según la edición):<br><em>«La Ilustración es la salida del hombre de su minoría de edad. Él mismo es culpable de ella. La minoría de edad es la incapacidad de servirse de su propio entendimiento sin la guía de otro. [...] ¡Sapere aude! ¡Ten el valor de servirte de tu propio entendimiento! He aquí el lema de la Ilustración.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Kant (1724–1804), artículo de 1784 en la <i>Berlinische Monatsschrift</i>, en la etapa crítica, entre la <i>Crítica de la razón pura</i> (1781) y la <i>Fundamentación</i> (1785).</li>" +
    "<li><b>2. Tema.</b> La definición de la Ilustración como salida de la minoría de edad.</li>" +
    "<li><b>3. Idea principal.</b> La Ilustración consiste en atreverse a pensar por uno mismo; la minoría de edad es culpable porque falta valor, no inteligencia.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Minoría de edad»: dependencia de un tutor. (b) «Culpable»: se debe a pereza y cobardía. (c) «<i>Sapere aude</i>»: lema que invita a la autonomía intelectual.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la versión social de su <b>autonomía</b> moral (la razón se da su propia ley) y del giro copernicano (la razón como sujeto activo). Enlaza con la libertad de uso público de la razón y con su idea de progreso hacia la república.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con <b>Descartes</b>: ambos defienden la razón propia frente a la autoridad, pero Kant la limita con la crítica. Con <b>Rousseau</b>: ambos valoran la libertad, pero Kant confía en el progreso por la educación y el uso público de la razón.</li>" +
    "<li><b>7. Valora y concluye.</b> Sigue vigente: pensar por uno mismo frente a la propaganda y la desinformación. Límite: la Ilustración puede ser difícil si no hay educación ni libertad reales.</li></ol>" +
    ojo("Errores típicos: (1) decir que la minoría de edad es falta de inteligencia (es falta de <b>valor</b>); (2) confundir uso público y privado; (3) olvidar la <b>libertad</b> como condición; (4) no citar la obra ni el año.") });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica el giro copernicano y los juicios sintéticos a priori", "Respuesta modelo:", [
      "<b>Giro.</b> El sujeto pone la forma (espacio, tiempo, categorías) y la experiencia la materia.",
      "<b>Juicios.</b> Analítico = predicado contenido en el sujeto; sintético = amplía; a priori = independiente de la experiencia.",
      "<b>Pregunta.</b> ¿Cómo son posibles los sintéticos a priori (matemáticas y física)?",
      "<b>Relación.</b> Responde a Hume; solo conocemos fenómenos."
    ]) +
    ejemplo("Pregunta 2. Fenómeno y noúmeno", "Respuesta modelo:", [
      "<b>Fenómeno</b>: realidad conocida; <b>noúmeno</b>: cosa en sí, inaccesible.",
      "<b>Consecuencia</b>: la metafísica tradicional no es ciencia (alma, mundo, Dios).",
      "<b>Valoración</b>: limita el saber para dejar sitio a la fe moral."
    ]) +
    ejemplo("Pregunta 3. Ética kantiana", "Respuesta modelo:", [
      "<b>Buena voluntad y deber</b>: ética formal y deontológica.",
      "<b>Imperativos</b>: hipotético frente a categórico, con sus formulaciones.",
      "<b>Autonomía</b> y postulados de la razón práctica.",
      "<b>Comparación</b>: con Aristóteles (felicidad) o Hume (sentimiento)."
    ]) +
    ejemplo("Pregunta 4. Ilustración y política", "Respuesta modelo:", [
      "<b>Minoría de edad</b>, <i>sapere aude</i>, uso público de la razón.",
      "<b>Política</b>: república, federación de Estados, paz perpetua."
    ]) +
    "<p>Los ejercicios de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf12a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
