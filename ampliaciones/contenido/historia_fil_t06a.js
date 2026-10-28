/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 6: San Agustín y la patrística
   (parte A: teoría. Parte B, historia_fil_t06b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Qué es la patrística y por qué nace (apologética, Padres, siglos II–VIII) → sección 1 + tabla de posturas ante la filosofía.
   2. Platonismo cristiano: Agustín «bautiza» a Platón (Ideas = ideas en la mente de Dios) → sección nueva 6 + mapa.
   3. «Si fallor, sum»: no es el cogito de Descartes (Agustín sigue hacia Dios, Descartes hacia el método) → sección 2 (ojo).
   4. «Cree para entender»: la fe no sustituye a la razón; no es «cree sin pensar» → sección 3 + errores.
   5. El mal como privación, no como cosa; mal moral frente a mal físico; libre albedrío → sección 4 + clasificar.
   6. Gracia y libertad: la polémica con Pelagio → sección nueva 8.
   7. Dos ciudades y la historia lineal (cíclica griega frente a lineal cristiana); no son «Iglesia» y «Estado» → sección 5 + clasificar.
   8. El tiempo en las Confesiones (distentio animi) y la iluminación → secciones nuevas 6 y 7.
   9. Comparaciones rentables: Platón, Descartes, Tomás de Aquino → sección nueva 9.
   10. Comentario de texto: los dos amores (Ciudad de Dios XIV, 28) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t6/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. La patrística
  secciones[0] =
    "<h5>Por qué nace la patrística</h5>" +
    "<p>Hasta ahora (temas 1 a 5) la filosofía es griega y pagana. Pero en los primeros siglos de nuestra era una religión nueva, el <b>cristianismo</b>, se extiende por todo el Imperio romano. Los cristianos se encuentran con dos problemas muy prácticos: (1) tienen que <b>defenderse</b> ante las acusaciones de los paganos y ante las autoridades, y (2) tienen que <b>explicar</b> a gente culta, educada en la filosofía griega, qué creen. Para las dos cosas necesitan argumentos, y los argumentos los tenía la filosofía. De ahí nace la <b>patrística</b>: el pensamiento de los <b>Padres de la Iglesia</b>, los autores cristianos de los primeros siglos cuya autoridad reconoció la Iglesia.</p>" +
    "<h5>Cronología mínima para situarse</h5>" +
    "<ul><li><b>313:</b> el Edicto de Milán permite practicar el cristianismo en el Imperio. <b>380:</b> el emperador Teodosio lo convierte en religión oficial.</li>" +
    "<li><b>354–430:</b> vida de San Agustín, justo en el momento en que el cristianismo pasa de religión perseguida a religión dominante.</li>" +
    "<li><b>410:</b> los visigodos de Alarico saquean Roma. <b>476:</b> cae el Imperio romano de Occidente (para muchos autores, el comienzo de la Edad Media).</li>" +
    "<li><b>Siglo XIII:</b> Tomás de Aquino (1225–1274) cierra el gran periodo escolástico (tema 7).</li></ul>" +
    "<h5>Tres actitudes ante la filosofía griega</h5>" +
    "<p>No todos los Padres pensaron igual sobre la filosofía pagana. Conviene distinguir tres posturas, porque el comentario de la PAU suele pedir que se sitúe a Agustín entre ellas:</p>" +
    tabla(["Postura", "Qué dice", "Ejemplo"], [
      ["<b>Rechazo</b>", "La fe basta; la filosofía pagana solo trae errores.", "Tertuliano (hacia 160–220): «¿Qué tiene que ver Atenas con Jerusalén?» (fórmula habitual)"],
      ["<b>Aprovechamiento</b>", "Lo verdadero de la filosofía griega ya pertenecía a la verdad cristiana; hay que usarlo.", "Justino (siglo II): los filósofos conocieron una semilla del Logos."],
      ["<b>Síntesis</b>", "Se construye una filosofía cristiana, sobre todo con el platonismo.", "<b>San Agustín</b> (354–430)"]
    ]) +
    ojo("«Patrística» no es el nombre de una doctrina, sino de un <b>periodo</b> (siglos II–VIII) y de un tipo de autores (los Padres). Dentro de él hay Padres griegos (Clemente de Alejandría, Orígenes) y Padres latinos (Ambrosio, Jerónimo, Agustín). Agustín es el más influyente de todos.");

  // ---------------------------------------------------------------- 2. De la duda a la fe
  secciones[1] =
    "<h5>El camino de Agustín, paso a paso</h5>" +
    "<p>Agustín cuenta su propia vida en las <i>Confesiones</i> (hacia 400), la primera gran autobiografía filosófica de Occidente. No es solo un relato: es un ejemplo de cómo se busca la verdad.</p>" +
    "<ul><li><b>354: nace en Tagaste</b> (norte de África, hoy Argelia). Su madre, Mónica, era cristiana; su padre, Patricio, pagano.</li>" +
    "<li><b>Joven retórico en Cartago.</b> Lee el <i>Hortensio</i> de Cicerón y se despierta en él el amor a la sabiduría.</li>" +
    "<li><b>Unos nueve años maniqueo.</b> El maniqueísmo explicaba el mundo como lucha de dos principios, el bien y el mal. Lo abandona decepcionado.</li>" +
    "<li><b>Escepticismo.</b> Duda de que se pueda alcanzar alguna verdad segura (recuerda el escepticismo del tema 5).</li>" +
    "<li><b>Milán:</b> escucha al obispo Ambrosio y lee a los <b>neoplatónicos</b>; entiende que Dios puede ser espiritual y no un cuerpo.</li>" +
    "<li><b>386: conversión; 387: bautismo.</b> Vuelve a África, es ordenado sacerdote y hacia el 395 es <b>obispo de Hipona</b>. Muere en 430, con la ciudad asediada por los vándalos.</li></ul>" +
    "<h5>Cómo vence a la duda</h5>" +
    "<p>Los escépticos decían: «quizá te engañas siempre». Agustín contesta con un razonamiento muy sencillo: <b>para engañarse hay que existir</b>. Por eso <i>si fallor, sum</i> («si me equivoco, existo»). Es una verdad que ni siquiera el escéptico puede discutir: si dudas, piensas; si piensas, existes. Y además de que existo, sé que vivo y que entiendo; son tres certezas inmediatas (<b>ser, vivir, entender</b>).</p>" +
    ojo("Se parece al «pienso, luego existo» de Descartes, pero <b>no es lo mismo</b>. Descartes usa la certeza del yo como <b>punto de partida del método</b> para reconstruir todo el saber. Agustín la usa para <b>vencer al escepticismo</b> y, a partir de ella, ascender hacia <b>Dios</b>, que es la Verdad. En un examen, di «es un precedente» y explica la diferencia.");

  // ---------------------------------------------------------------- 3. Fe y razón
  secciones[2] =
    "<h5>Dos mitades de una misma fórmula</h5>" +
    "<p>Agustín repite una fórmula de dos partes: <i>«intellege ut credas, crede ut intelligas»</i>, es decir, «entiende para creer, cree para entender» (paráfrasis habitual). Las dos mitades son necesarias:</p>" +
    "<ul><li><b>Entiende para creer:</b> la razón prepara el camino. Uno no cree en lo que no sabe ni lo que significa; se necesita razonar para comprender de qué se habla y qué se acepta.</li>" +
    "<li><b>Cree para entender:</b> la fe abre el camino. Hay verdades (Dios, el alma, el sentido de la vida) a las que la razón sola llega mal y tarde, y aceptarlas por fe ilumina y orienta la búsqueda.</li></ul>" +
    ejemplo("Una comparación cotidiana", "Confías para comprender", [
      "Cuando empiezas a estudiar una asignatura difícil, aceptas al principio lo que dice la profesora (confías), y solo después, trabajando, <b>comprendes por qué</b> es cierto.",
      "Sin esa confianza inicial no avanzarías; pero la confianza no te dispensa de pensar: el objetivo es entender.",
      "Algo parecido propone Agustín con la fe: <b>punto de partida</b>, no sustituto de la razón."
    ]) +
    "<h5>Qué consecuencias tiene</h5>" +
    "<p>(1) Defiende que la filosofía <b>sirve</b> al cristiano: la razón explica y defiende la fe. (2) Pero fija una <b>jerarquía</b>: si hay conflicto aparente, la fe tiene la última palabra, porque su fuente es Dios mismo. Tomás de Aquino (tema 7) será más optimista con la razón natural; Agustín subraya su necesidad de ayuda.</p>" +
    ojo("«Cree para entender» <b>no</b> significa «cree y no pienses». Significa que la fe pide pensar. Y tampoco es una prueba: es un <b>método</b>. Una frase típica de examen: «la fe precede y la razón profundiza».");

  // ---------------------------------------------------------------- 4. El mal
  secciones[3] =
    "<h5>Tres tipos de mal</h5>" +
    "<p>Para entender la respuesta de Agustín conviene distinguir de qué mal se habla:</p>" +
    tabla(["Tipo", "Qué es", "Ejemplo"], [
      ["<b>Mal físico</b>", "Sufrimiento o daño natural", "Una enfermedad, un terremoto"],
      ["<b>Mal moral</b>", "Daño causado por una elección libre", "Mentir, robar, hacer daño a alguien"],
      ["<b>Mal metafísico</b>", "Imperfección por ser criatura y no Dios", "Las cosas finitas se acaban"]
    ]) +
    "<h5>Por qué el mal no es «una cosa»</h5>" +
    "<p>Agustín venía del maniqueísmo, donde el mal era una sustancia, un principio tan real como el bien. Al convertirse, defiende lo contrario: <b>todo lo que existe, en cuanto existe, es bueno</b>, porque lo ha creado un Dios bueno. El mal no es una cosa, sino una <b>privación</b> (<i>privatio boni</i>): como un agujero en un queso, no existe por sí mismo, sino por faltar algo que debería estar. La ceguera no es «algo» en el ojo, es la falta de vista.</p>" +
    "<h5>El mal moral viene de la voluntad</h5>" +
    "<p>Si el mal es falta de bien, ¿de dónde sale el mal moral? Del uso que hacemos de la <b>libertad</b>. Dios nos da el libre albedrío para que podamos amarle de verdad, y el libre albedrío es un bien, aunque se pueda <b>usar mal</b>. Cuando la voluntad prefiere un bien menor (el placer, el poder) a un bien mayor (Dios), aparece el pecado: no se elige «el mal» como tal, se elige <b>un bien inferior</b> en lugar de otro superior. En cuanto al mal físico, Agustín lo relaciona con el pecado original y con el orden del conjunto.</p>" +
    ojo("Error típico: decir que «Dios crea el mal» o que «Agustín niega que el mal exista». Ni lo uno ni lo otro: el mal <b>existe como falta</b>, y el mal moral procede de la voluntad libre de las criaturas, no de Dios.");

  // ---------------------------------------------------------------- 5. La Ciudad de Dios
  secciones[4] =
    "<h5>Por qué escribe el libro</h5>" +
    "<p>Tras el saqueo de Roma (410), los paganos dijeron: «Roma cayó por abandonar a sus dioses». Agustín contesta con <i>La Ciudad de Dios</i> (escrita entre 413 y 426), una obra enorme en 22 libros. Primero rebate a los paganos (Roma ya había sufrido desgracias antes de Cristo), y después explica el <b>sentido de toda la historia</b>.</p>" +
    "<h5>Las dos ciudades</h5>" +
    "<p>Agustín no habla de dos Estados, sino de dos formas de vida, que se mezclan en esta vida y solo se separarán al final. Lo que las distingue es el <b>amor</b>:</p>" +
    tabla(["", "Ciudad de Dios", "Ciudad terrena"], [
      ["¿Qué ama?", "A Dios, hasta olvidarse de sí", "A sí misma, hasta despreciar a Dios"],
      ["¿Qué busca?", "Paz y bienes eternos", "Poder, gloria y bienes materiales"],
      ["¿Quiénes la forman?", "Los que viven según Dios", "Los que viven según sí mismos"]
    ]) +
    ojo("Las dos ciudades <b>no son</b> «la Iglesia» y «el Estado romano». Dentro de la Iglesia puede haber ciudadanos de la ciudad terrena, y fuera de ella personas buenas. La frontera la marca el amor, y solo Dios la ve del todo.") +
    "<h5>Una historia con dirección</h5>" +
    "<p>Para los griegos el tiempo solía ser un <b>círculo</b>: todo se repite. Para Agustín (y para el cristianismo) la historia es una <b>línea</b>: empieza con la Creación, tiene un momento central (la Encarnación) y termina en el Juicio Final. Cada acontecimiento ocurre una vez y tiene sentido dentro del plan de Dios. Esta idea de <b>progreso con sentido</b> influirá después en la filosofía de la historia occidental.</p>" +
    "<p>Sobre la política, Agustín no desprecia al Estado: lo considera necesario para mantener la paz terrena, pero sin el valor absoluto que le daba la polis griega. Un Estado sin justicia, dice, se parece a una banda de ladrones a gran escala.</p>";

  // ---------------------------------------------------------------- Secciones nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Verdad, Ideas e iluminación: el platonismo cristiano", html:
    "<p>Agustín no inventó una filosofía desde cero: tomó la de Platón y los neoplatónicos y la <b>reinterpretó</b>. Hay dos cambios importantes:</p>" +
    "<ul><li><b>Las Ideas están en la mente de Dios.</b> Para Platón existían en un mundo aparte (tema 3). Para Agustín son los <b>modelos eternos</b> según los cuales Dios crea el mundo. Así se evita tener «dos mundos» independientes: las Ideas dependen de Dios.</li>" +
    "<li><b>La iluminación divina.</b> ¿Cómo conocemos verdades eternas (2 + 2 = 4, lo justo) si somos limitados y cambiantes? Porque Dios <b>ilumina</b> la mente, igual que el sol ilumina las cosas para que las veamos. El maestro humano solo ayuda desde fuera; el verdadero Maestro es interior.</li></ul>" +
    ejemplo("Comparación Platón – Agustín", "Qué se conserva y qué cambia", [
      "<b>Se conserva:</b> hay verdades eternas y necesarias, por encima del mundo cambiante.",
      "<b>Cambia el lugar:</b> en vez de un mundo de Ideas independiente, las Ideas están en Dios.",
      "<b>Cambia el modo de conocer:</b> en vez de recordar (reminiscencia), la mente es iluminada por Dios.",
      "<b>Consecuencia:</b> buscar la verdad es, al final, buscar a Dios."
    ]) +
    "<p>Por eso Agustín propone un camino <b>hacia dentro</b>: «no salgas fuera; vuelve a ti mismo; en el interior del hombre habita la verdad» (<i>De vera religione</i>; paráfrasis de la traducción habitual). Y su frase más famosa, al comienzo de las <i>Confesiones</i>, resume el sentido de esa búsqueda: «nos hiciste para ti, y nuestro corazón está inquieto hasta que descanse en ti» (traducción habitual).</p>" +
    ojo("El alma, para Agustín, es de naturaleza espiritual y superior al cuerpo, a la manera platónica. Pero Agustín defiende, contra algunos neoplatónicos, que el cuerpo es <b>bueno</b> y que habrá resurrección. No es un dualismo que desprecie el cuerpo.") });

  nuevas.push({ h: "7. El tiempo: «si nadie me lo pregunta, lo sé»", html:
    "<p>En el libro XI de las <i>Confesiones</i>, Agustín pregunta qué es el tiempo. Su respuesta más conocida es una confesión de perplejidad (paráfrasis habitual): si nadie me lo pregunta, lo sé; si quiero explicárselo al que me lo pregunta, no lo sé.</p>" +
    "<h5>El problema</h5>" +
    "<p>El pasado ya no existe, el futuro todavía no existe y el presente, si fuera una raya sin duración, se desvanecería. Entonces, ¿cómo mide el tiempo?</p>" +
    "<h5>Su solución: el tiempo está en el alma</h5>" +
    "<p>Agustín responde que el tiempo se vive en la mente (<i>distentio animi</i>, el «estiramiento» del alma): hay un <b>presente de las cosas pasadas</b> (la memoria), un <b>presente de las cosas presentes</b> (la atención) y un <b>presente de las cosas futuras</b> (la espera). Por eso podemos medir el tiempo.</p>" +
    tabla(["Tiempo", "Cómo está en el alma"], [
      ["Pasado", "Memoria"], ["Presente", "Atención"], ["Futuro", "Espera (expectación)"]]) +
    "<p>Además, Dios está fuera del tiempo: lo ha creado con el mundo. Antes de la Creación no había un «antes». Dios vive en una <b>eternidad</b>, un presente sin sucesión.</p>" +
    ojo("No digas que Agustín «niega el tiempo». Dice que el tiempo es real pero es una realidad que se experimenta en el alma, y que no existía antes de la Creación.") });

  nuevas.push({ h: "8. Gracia y libertad: la polémica con Pelagio", html:
    "<p>Hacia el año 411 Agustín se enfrenta a Pelagio, un monje de origen británico. La discusión es importante porque obliga a aclarar cuánto puede la libertad humana.</p>" +
    tabla(["", "Pelagio", "Agustín"], [
      ["El pecado original", "No daña la naturaleza humana", "Debilita la voluntad de todos los hombres"],
      ["Salvarse", "Depende sobre todo del esfuerzo propio", "Necesita la <b>gracia</b> de Dios"],
      ["La libertad", "Basta para elegir el bien", "Es libre, pero herida y necesitada de ayuda"]
    ]) +
    "<p>Agustín no niega la libertad (había defendido el libre albedrío contra los maniqueos). Lo que afirma es que, después del pecado original, la voluntad humana sola no basta para hacer el bien de manera constante; la <b>gracia</b> es un don gratuito que la sana y la ayuda. Sus ideas sobre la gracia y la predestinación serán después muy discutidas (por ejemplo, en la Reforma).</p>" +
    ojo("Mensaje de síntesis para el examen: contra los maniqueos, Agustín defiende la <b>libertad</b>; contra Pelagio, la necesidad de la <b>gracia</b>. No son contradictorias: la libertad humana existe, pero necesita ayuda.") });

  nuevas.push({ h: "9. Mapa del tema: Agustín y los demás autores", html:
    "<p>En la PAU se pide relacionar al autor con otros. Las comparaciones más rentables con Agustín son estas:</p>" +
    tabla(["Autor", "Relación con Agustín"], [
      ["Platón (T3)", "Su gran fuente. Agustín conserva las verdades eternas, pero pone las Ideas en la mente de Dios y sustituye la reminiscencia por la iluminación."],
      ["Aristóteles (T4)", "Lo conoce poco directamente; será Tomás de Aquino quien lo cristianice."],
      ["Escepticismo (T5)", "Agustín pasó por esa etapa y la supera con «si fallor, sum»."],
      ["Tomás de Aquino (T7)", "Le sigue: Agustín es platónico e insiste en la iluminación; Tomás parte de Aristóteles y de los sentidos."],
      ["Descartes (T9)", "Precedente en la certeza del yo pensante; pero Agustín va hacia Dios y Descartes construye un método."],
      ["Kant (T12)", "Distinto marco: Kant limita la razón para dejar sitio a la fe, mientras Agustín quiere que la fe oriente la razón."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Agustín</h5>" +
    tabla(["Ámbito", "Tesis de Agustín"], [
      ["Conocimiento", "Contra el escepticismo, «si fallor, sum»; la verdad se encuentra en el interior, con iluminación divina."],
      ["Fe y razón", "«Entiende para creer, cree para entender»: se necesitan."],
      ["Realidad", "Dios crea de la nada; las Ideas son ideas de Dios; todo lo creado es bueno."],
      ["Mal y libertad", "El mal es privación de bien; el mal moral viene del libre albedrío; la gracia ayuda a la voluntad herida."],
      ["Historia y sociedad", "Dos ciudades según el amor; historia lineal con sentido; el Estado sin justicia es un bandidaje."]
    ]) });

  nuevas.push({ h: "10. Comentario de texto resuelto: los dos amores", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (San Agustín, <em>La Ciudad de Dios</em>, libro XIV, cap. 28; traducción española habitual, abreviada, que varía según la edición):<br><em>«Dos amores fundaron, pues, dos ciudades: el amor propio hasta el desprecio de Dios, la terrena; el amor de Dios hasta el desprecio de sí, la celestial.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Agustín de Hipona (354–430), <i>La Ciudad de Dios</i> (413–426), escrita tras el saqueo de Roma (410) para responder a quienes culpaban al cristianismo.</li>" +
    "<li><b>2. Tema.</b> El origen de las dos ciudades que forman la historia humana.</li>" +
    "<li><b>3. Idea principal.</b> Lo que distingue a las dos ciudades no es la raza ni el Estado, sino el <b>amor</b> que orienta la vida: amor a sí mismo (ciudad terrena) o amor a Dios (Ciudad de Dios).</li>" +
    "<li><b>4. Términos e ideas secundarias.</b> (a) «Amor»: lo que ordena la voluntad hacia algún bien. (b) «Desprecio de Dios / de sí»: orientaciones extremas, no sentimientos pasajeros. (c) «Ciudades»: comunidades de personas unidas por lo que aman; se mezclan en la historia y se separarán en el Juicio Final.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Enlaza con su idea de la historia lineal con sentido, con el libre albedrío (el amor depende de la voluntad) y con su ética del amor ordenado: amar cada cosa según su valor, a Dios sobre todas.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Platón (T3): también ordena la ciudad según el bien del alma, pero Agustín no cree que ninguna ciudad terrena pueda realizar la ciudad ideal. Con Aristóteles (T4): la polis tiene como fin el bien vivir; para Agustín, el fin último está más allá de la polis.</li>" +
    "<li><b>7. Valora y concluye.</b> Aporta una mirada crítica al poder: ningún Estado es la meta. Pero puede interpretarse de modos muy distintos (política y religión); su peligro es identificar ciudad terrena con los «otros».</li></ol>" +
    ojo("Errores típicos: (1) decir que la Ciudad de Dios es la Iglesia y la ciudad terrena el Estado; (2) olvidar que el criterio es el <b>amor</b>; (3) no mencionar la historia lineal; (4) comparar con Platón sin explicar qué cambia.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. El problema del mal en San Agustín", "Respuesta modelo:", [
      "<b>Planteamiento.</b> Si Dios es bueno y todopoderoso, ¿de dónde viene el mal?",
      "<b>Mal como privación.</b> No es una sustancia, sino falta de bien (<i>privatio boni</i>); todo lo que existe es bueno.",
      "<b>Mal moral y libre albedrío.</b> Procede de la voluntad que prefiere un bien inferior; la libertad es un bien.",
      "<b>Relación.</b> Contra los maniqueos; luego, contra Pelagio, la gracia.",
      "<b>Conclusión.</b> Dios no es responsable del mal moral."
    ]) +
    ejemplo("Pregunta 2. Fe y razón", "Respuesta modelo:", [
      "<b>Fórmula.</b> «Entiende para creer, cree para entender».",
      "<b>Explicación.</b> La fe es punto de partida y la razón profundiza, explica y defiende.",
      "<b>Relación.</b> Platonismo cristiano; después Tomás de Aquino distinguirá más ambos campos."
    ]) +
    ejemplo("Pregunta 3. La Ciudad de Dios", "Respuesta modelo:", [
      "<b>Contexto.</b> Saqueo de Roma (410); responde a los paganos.",
      "<b>Dos ciudades.</b> Distintas por el amor: a Dios o a sí mismo.",
      "<b>Historia.</b> Lineal: Creación, Encarnación, Juicio Final; frente a la visión cíclica griega.",
      "<b>Valoración.</b> Influencia en la filosofía de la historia; el Estado como instrumento de paz."
    ]) +
    ejemplo("Pregunta 4. Comparación con Descartes", "Respuesta modelo:", [
      "<b>Parecido.</b> «Si fallor, sum» y «pienso, luego existo»: la duda prueba la existencia del pensante.",
      "<b>Diferencia.</b> Agustín lo usa contra el escepticismo y para llegar a Dios; Descartes lo usa como fundamento de un método."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Une, clasifica y ordena</h5>" +
    w("clasificar", "ciudades") + w("emparejar", "posturas") + w("orden", "camino") +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf6a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
