/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 2: Los sofistas y Sócrates
   (parte A: teoría. Parte B, historia_fil_t02b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. «Giro antropológico»: no es que los presocráticos no hablaran de personas, es que cambia la pregunta central → tabla + ejemplo.
   2. Relativismo de Protágoras (el hombre medida) y por qué NO es «todo vale» → ejemplo del viento + recuadro.
   3. Sofistas ≠ un bloque: Protágoras (relativismo), Gorgias (escepticismo), Trasímaco/Calicles (ley del más fuerte) → tabla.
   4. Physis frente a nomos (naturaleza frente a convención) y su efecto en la ética y la política → texto y ejemplo cotidiano.
   5. Ironía y mayéutica: qué hace cada una y que son DOS fases → mini-diálogo resuelto + widget de ordenar.
   6. «Solo sé que no sé nada»: la frase no es literal, y no es escepticismo; es ignorancia docta → comentario resuelto de Apología 21d.
   7. Intelectualismo moral: «virtud es conocimiento», «nadie hace el mal a sabiendas» y la crítica de Aristóteles (akrasía).
   8. La búsqueda de definiciones universales (qué es X): lo que Sócrates aporta al método (y lo que recoge Platón).
   9. Juicio y muerte: acusaciones, contexto político (guerra y Treinta Tiranos), Critón y la coherencia → cronología ordenable.
   10. Comparación sofistas–Sócrates (y puente a Platón) → tabla de oposiciones + pregunta abierta con rúbrica.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t2/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Giro antropológico
  secciones[0] =
    "<h5>Qué cambia y por qué cambia en Atenas</h5>" +
    "<p>Los presocráticos (tema 1) preguntaban <em>«¿de qué está hecho el mundo?»</em>. Sofistas y Sócrates preguntan <em>«¿cómo debemos vivir?, ¿qué podemos saber?, ¿qué es lo justo?»</em>. No es que los primeros no se ocuparan de las personas ni que los segundos ignoraran la naturaleza, sino que <b>la pregunta central</b> pasa del cosmos al ser humano. Eso se llama <b>giro antropológico</b> (de <em>ánthropos</em>, «ser humano»).</p>" +
    "<p>¿Por qué precisamente ahora y en Atenas? Porque la ciudad de la segunda mitad del siglo V a. C. es otra:</p>" +
    "<ul><li><b>Democracia.</b> Con Pericles (h. 495–429 a. C.) los ciudadanos varones votan en la asamblea y pueden ser jueces. Para ganar un debate o un juicio hay que hablar bien: de pronto <b>saber argumentar da poder</b>.</li>" +
    "<li><b>Imperio y comercio.</b> Tras las guerras médicas (490–479 a. C.) Atenas lidera una alianza de ciudades y atrae a visitantes de todo el Mediterráneo. Se conocen costumbres y leyes distintas.</li>" +
    "<li><b>Crisis.</b> La guerra del Peloponeso contra Esparta (431–404 a. C.) acabará con la derrota ateniense. En tiempos de crisis se discute si las leyes y los valores son justos… o solo costumbres.</li></ul>" +
    tabla(["", "Presocráticos (tema 1)", "Sofistas y Sócrates (tema 2)"], [
      ["Pregunta central", "¿De qué está hecho el mundo? (arché)", "¿Qué es el ser humano, la virtud, la justicia?"],
      ["Lugar", "Jonia e Italia (siglos VI–V a. C.)", "Atenas (siglo V a. C.)"],
      ["Para qué se piensa", "Entender la naturaleza (physis)", "Saber vivir y convivir en la polis"],
      ["Método", "Observar y razonar sobre el cosmos", "Debatir con otros: retórica y diálogo"]
    ]) +
    ejemplo("Un ejemplo para sentir el cambio", "Imagina que tu clase discute si es justo que el profesor castigue a todos por lo que hizo uno. ¿Qué tipo de pregunta es?", [
      "No se resuelve mirando de qué está hecho el universo ni con un experimento.",
      "Es una pregunta sobre <b>justicia</b>, y se resuelve dando razones y escuchando las del otro.",
      "Ese es el terreno de los sofistas y de Sócrates: preguntas humanas que se deciden hablando."
    ]) +
    ojo("Error típico: decir que Sócrates «es el primer filósofo» o que antes «nadie se preguntaba por el ser humano». Lo correcto: los presocráticos ya eran filósofos (tema 1); con sofistas y Sócrates cambia el <b>objeto de estudio</b>, y por eso se habla de «periodo antropológico». Y Sócrates no es un sofista aunque conviva con ellos (se verá enseguida).");

  // ---------------------------------------------------------------- 2. Sofistas
  secciones[1] =
    "<h5>Quiénes eran y qué vendían</h5>" +
    "<p><em>Sophistés</em> significaba al principio «sabio, experto». Los sofistas eran <b>maestros itinerantes</b>, casi todos extranjeros (Protágoras era de Abdera, Gorgias de Leontinos, en Sicilia), que cobraban por enseñar a los jóvenes ricos de Atenas lo que más les convenía para triunfar en política: <b>retórica</b> (hablar bien y persuadir), argumentación, cultura general y «virtud política» (<em>areté</em>: saber gobernar la propia casa y la ciudad). Fueron los <b>primeros profesores profesionales</b>. No son un bloque homogéneo: no tenían una doctrina común, sino un oficio y una actitud.</p>" +
    "<p>Un dato de contexto: la palabra «sofista» se hizo despectiva (sofisma = argumento engañoso) sobre todo por <b>Platón y Aristóteles</b>, que los criticaron. Lo que sabemos de ellos viene en gran parte de sus adversarios; conviene recordarlo al valorarlos.</p>" +
    "<h5>Physis y nomos: naturaleza frente a convención</h5>" +
    "<p>Su idea de fondo es una distinción entre <b>physis</b> (lo que es así por naturaleza, igual en todas partes: que el fuego queme) y <b>nomos</b> (lo que es así por <em>convención</em>: leyes, costumbres, normas). Los sofistas sostienen que <b>las leyes y la moral son nomos</b>, es decir, obra humana, que cambia de una ciudad a otra y por tanto puede discutirse y reformarse. Ejemplo cotidiano: en España se conduce por la derecha y en el Reino Unido por la izquierda; ninguna es «más verdadera», es una convención útil. Los sofistas extienden esta idea a lo justo y lo injusto.</p>" +
    "<h5>Protágoras: «el hombre es la medida de todas las cosas»</h5>" +
    "<p>Protágoras de Abdera (h. 490–420 a. C.) resume su postura en la frase que Platón recoge en el <em>Teeteto</em> (152a): <em>«El hombre es la medida de todas las cosas: de las que son, en cuanto que son; de las que no son, en cuanto que no son.»</em> Significa que <b>no hay una verdad independiente de quien juzga</b>: lo que a cada uno le parece verdadero, <em>es</em> verdadero para él. Esta postura se llama <b>relativismo</b> (y, aplicada al conocimiento, <b>subjetivismo</b>). Platón pone el ejemplo del viento: al mismo viento uno lo siente frío y otro templado; no se puede decir que uno se equivoque, el viento «es frío para quien lo siente frío».</p>" +
    ejemplo("¿Relativismo es «todo vale»?", "Protágoras no dice que todas las opiniones sean igual de buenas. ¿Qué dice entonces?", [
      "Dice que cada opinión es verdadera <b>para quien la tiene</b>; no existe un árbitro externo que decida quién acierta.",
      "Pero según Platón añade que unas opiniones son <b>mejores</b> que otras: el médico no hace que lo que el enfermo siente sea «falso», sino que lo cambia a algo mejor.",
      "Por eso el sofista no enseña «la verdad»: enseña a lograr que lo mejor sea aceptado como mejor (persuasión).",
      "Conclusión: relativismo no es «todo es igual»; es «no hay verdad absoluta, solo perspectivas, y lo que cuenta es la utilidad y el acuerdo»."
    ]) +
    "<h5>Otros sofistas y tres posturas distintas</h5>" +
    tabla(["Sofista", "Idea que debes recordar", "Nombre de la postura"], [
      ["Protágoras (h. 490–420 a. C.)", "«El hombre es la medida de todas las cosas»: la verdad depende de cada sujeto.", "Relativismo (subjetivismo)"],
      ["Gorgias (h. 483–375 a. C.)", "Su obra <em>Sobre el no-ser</em>: nada existe; si algo existiera no podríamos conocerlo; si pudiéramos conocerlo no podríamos comunicarlo. Maestro de la retórica.", "Escepticismo"],
      ["Trasímaco y Calicles", "Lo justo es lo que conviene al más fuerte (Trasímaco, en la <em>República</em> I de Platón); las leyes las hacen los débiles para frenar a los fuertes (Calicles, en el <em>Gorgias</em>).", "Inmoralismo: la ley del más fuerte"]
    ]) +
    "<p>Trasímaco y Calicles aparecen como personajes en los diálogos de Platón: sus palabras exactas son de Platón, aunque reflejan posturas reales de la época.</p>" +
    ojo("Error típico: meter a todos los sofistas en el mismo saco («los sofistas negaban la verdad y defendían la ley del más fuerte»). Protágoras es relativista; Gorgias, escéptico; solo algunos (Trasímaco, Calicles) defienden el derecho del fuerte. En un comentario, nombra al sofista concreto.") +
    "<h5>Lo que aportaron, a pesar de las críticas</h5>" +
    "<ul><li>Pusieron el <b>lenguaje y la argumentación</b> en el centro de la reflexión: nace la retórica y empieza la reflexión sobre el lenguaje.</li>" +
    "<li>Plantearon la <b>crítica de las costumbres</b>: si las leyes son convenciones, se pueden mejorar. Es una semilla de ideas democráticas.</li>" +
    "<li>Obligaron a la filosofía a responder una pregunta incómoda: <em>si no hay verdad, ¿qué distingue convencer con razones de manipular?</em> Esa pregunta mueve a Sócrates.</li></ul>" +
    "<p>Prueba tú: clasifica estas frases según pertenezcan a los sofistas o a Sócrates.</p>" +
    w("clasificar", "quien");

  // ---------------------------------------------------------------- 3. Sócrates
  secciones[2] =
    "<h5>Una vida que es filosofía</h5>" +
    "<p>Sócrates nació en Atenas en el 470 a. C. y murió en el 399 a. C. (470–399 a. C.). Hijo de un escultor (Sofronisco) y de una comadrona (Fenáreta), fue soldado en varias campañas de la guerra del Peloponeso y apenas ocupó cargos. No fundó escuela, no cobraba y <b>no escribió nada</b>: conversaba en el <em>ágora</em>, el gimnasio o los banquetes con quien quisiera. Para él filosofar era <em>una forma de vida</em>, no una asignatura.</p>" +
    "<h5>El problema de las fuentes (el «problema socrático»)</h5>" +
    "<p>Como no dejó escritos, solo lo conocemos por otros, y cada uno lo cuenta a su manera:</p>" +
    tabla(["Fuente", "Cómo presenta a Sócrates"], [
      ["Platón (427–347 a. C.), discípulo", "Diálogos de juventud (<em>Apología</em>, <em>Critón</em>, <em>Laques</em>…) cercanos al Sócrates histórico; después usa a Sócrates como portavoz de sus propias ideas."],
      ["Jenofonte, discípulo", "<em>Recuerdos de Sócrates</em>: un hombre práctico, moralista y sensato."],
      ["Aristófanes, comediógrafo", "<em>Las nubes</em> (423 a. C.): lo caricaturiza como un sofista que enseña a engañar."],
      ["Aristóteles, discípulo de Platón", "Le atribuye dos aportaciones: los razonamientos inductivos y la definición universal."]
    ]) +
    "<p>Para la PAU: el Sócrates que interesa es el de los diálogos de juventud de Platón. Cuando haya duda, di «según Platón».</p>" +
    "<h5>«Solo sé que no sé nada»: ignorancia docta</h5>" +
    "<p>Según cuenta Platón en la <em>Apología</em> (21a–23b), un amigo de Sócrates, Querefonte, preguntó al oráculo de Delfos si había alguien más sabio que Sócrates, y la respuesta fue que no. Sócrates, extrañado (¡él sabía que no sabía nada importante!), fue interrogando a políticos, poetas y artesanos para refutar al oráculo. Descubrió que todos <b>creían saber lo que no sabían</b>, mientras que él, al menos, <b>sabía que no sabía</b>. Esa es su sabiduría: la <b>ignorancia docta</b> (reconocer la propia ignorancia). Es la versión socrática del lema de Delfos <em>«conócete a ti mismo»</em>: empezar por saber qué sabes y qué no.</p>" +
    ojo("Dos matices de examen: (1) la fórmula «solo sé que no sé nada» <b>no aparece literal</b> en Platón; en la <em>Apología</em> 21d dice que, como no sabe, tampoco cree saber. (2) No es <b>escepticismo</b>: Sócrates sí cree que existen verdades morales (qué es lo justo o lo bueno) y que se pueden buscar. Lo que niega es que ya las tengamos.") +
    "<h5>Sócrates frente a los sofistas</h5>" +
    "<p>Ambos hablan de justicia, virtud y política y ambos usan el diálogo, así que desde fuera se parecen (por eso Aristófanes los confunde). Pero hay diferencias fundamentales:</p>" +
    tabla(["", "Sofistas", "Sócrates"], [
      ["¿Hay verdad moral?", "No hay verdad absoluta (relativismo, escepticismo)", "Sí hay verdad moral universal, que hay que buscar"],
      ["¿Para qué se discute?", "Para persuadir y triunfar", "Para encontrar la verdad y mejorar el alma"],
      ["¿Cobran?", "Sí, son profesores profesionales", "No; vive pobre y sin cobrar"],
      ["¿Qué enseñan?", "Técnicas (retórica, argumentación)", "Nada: ayuda a otros a descubrir"],
      ["Actitud ante el saber", "Se presentan como expertos", "Reconoce su ignorancia"]
    ]) +
    "<h5>La búsqueda de la definición universal</h5>" +
    "<p>Cuando Sócrates pregunta <em>«¿qué es la valentía?»</em> no le sirve una lista de ejemplos («el soldado que no huye»): quiere <b>lo que todos los casos de valentía tienen en común</b>, una <b>definición universal</b>. Esto es lo que Aristóteles le reconoce y lo que Platón convertirá en teoría de las Ideas (tema 3). Para Sócrates la definición es lo que permite distinguir de verdad lo justo de lo injusto, frente a la mera opinión de cada uno.</p>" +
    "<p>Une ahora a cada autor con su idea.</p>" +
    w("emparejar", "conceptos");

  // ---------------------------------------------------------------- 4. Método
  secciones[3] =
    "<h5>Un método para buscar entre dos</h5>" +
    "<p>El método socrático es <b>dialógico</b> (se hace hablando con otro) y tiene <b>dos momentos</b> que no hay que confundir. A veces se les llama «parte negativa» (que destruye falsas certezas) y «parte positiva» (que ayuda a construir):</p>" +
    tabla(["", "Ironía (parte negativa)", "Mayéutica (parte positiva)"], [
      ["Qué hace", "Pregunta fingiendo no saber y muestra las contradicciones del interlocutor", "Con nuevas preguntas, ayuda a «dar a luz» una definición mejor"],
      ["Resultado", "Aporía: el interlocutor reconoce que no sabe lo que creía saber", "Una comprensión más verdadera descubierta por el propio interlocutor"],
      ["Tomado de…", "Fingir ignorancia (<em>eironeía</em>: disimular)", "El oficio de su madre: partera (<em>maieutiké</em>)"],
      ["Idea de fondo", "Primero hay que liberarse de falsas certezas", "El saber ya está en el alma; no se «mete» desde fuera"]
    ]) +
    "<p>Por eso Sócrates dice que él no enseña: <b>no transmite doctrina</b>, ayuda a que cada uno encuentre la verdad. La mayéutica supone que todos tenemos la capacidad de razonar y de llegar a ideas verdaderas con la ayuda adecuada. (Platón lo desarrollará en la teoría de la reminiscencia, tema 3.)</p>" +
    "<h5>Un mini-diálogo para verlo en marcha</h5>" +
    "<p>Diálogo inventado, al estilo de los diálogos de juventud de Platón (<em>Laques</em>), con una alumna llamada Lucía:</p>" +
    "<blockquote class='cita-fil'><b>Sócrates:</b> Lucía, tú que eres tan valiente: ¿qué es la valentía?<br><b>Lucía:</b> Es no huir cuando hay peligro.<br><b>Sócrates:</b> ¿Y un soldado que retrocede a propósito para atraer al enemigo a una trampa? ¿Es un cobarde?<br><b>Lucía:</b> No… eso es astucia. Entonces valentía es aguantar el miedo y seguir firme.<br><b>Sócrates:</b> ¿Y quien aguanta firme en una apuesta absurda y lo pierde todo por cabezonería? ¿Es valiente o temerario?<br><b>Lucía:</b> Temerario. Valentía es aguantar el miedo <em>cuando tiene sentido hacerlo</em>.<br><b>Sócrates:</b> Y saber cuándo tiene sentido, ¿no es una forma de conocimiento?<br><b>Lucía:</b> Pues… sí. La valentía parece que necesita saber qué es peligroso de verdad.</blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Ironía.</b> Sócrates finge no saber y pide una definición. Con los contraejemplos (la retirada táctica, la apuesta absurda), la primera definición de Lucía se cae.</li>" +
    "<li><b>Mayéutica.</b> Con preguntas ordenadas, Lucía va construyendo una definición mejor, que Sócrates nunca le dicta.</li>" +
    "<li><b>Resultado.</b> Se enlaza con su ética: la valentía depende del <em>conocimiento</em> (intelectualismo moral, siguiente sección).</li></ol>" +
    ojo("Error típico: llamar «ironía» al hecho de burlarse. En Sócrates la ironía es <b>fingir ignorancia</b> para que el otro se examine; no es sarcasmo. Y otro error: pensar que la mayéutica enseña contenidos; lo que hace es ayudar a descubrirlos.") +
    "<p>Ahora ordena los pasos de un diálogo socrático.</p>" +
    w("orden", "dialogo");

  // ---------------------------------------------------------------- 5. Ética y muerte
  secciones[4] =
    "<h5>Una ética del conocimiento: el intelectualismo moral</h5>" +
    "<p>Para Sócrates lo más importante es <b>cuidar el alma</b> (<em>psyché</em>: la razón y la conciencia moral de cada uno), no la riqueza ni el prestigio. Una persona vive bien cuando su alma está bien, y eso da la <b>felicidad</b> (<em>eudaimonía</em>). De ahí su doctrina más conocida, el <b>intelectualismo moral</b>:</p>" +
    "<ol><li><b>La virtud es conocimiento.</b> Ser justo o valiente consiste en saber qué es lo bueno.</li>" +
    "<li><b>Nadie hace el mal a sabiendas.</b> Quien actúa mal lo hace por <b>ignorancia</b>, porque cree que eso le conviene.</li>" +
    "<li><b>Conocer el bien basta para practicarlo.</b> Si de verdad lo supiéramos, actuaríamos en consecuencia.</li>" +
    "<li><b>Cometer injusticia es peor que sufrirla</b> (Platón, <em>Gorgias</em>): porque daña el alma, que es lo más valioso.</li></ol>" +
    tabla(["Pregunta", "Respuesta socrática"], [
      ["¿Por qué alguien actúa mal?", "Por ignorancia: confunde lo que le parece bueno con lo que lo es."],
      ["¿Cómo se hace uno mejor?", "Examinándose y buscando el saber («una vida sin examen no merece ser vivida», <em>Apología</em> 38a)."],
      ["¿Qué es la felicidad?", "Tener el alma virtuosa: saber y vivir conforme al bien."]
    ]) +
    ejemplo("¿Y si alguien sabe lo que está bien y hace lo contrario?", "Piensa en alguien que sabe que fumar es malo y fuma. ¿Contradice a Sócrates?", [
      "Para Sócrates, no lo sabe <em>de verdad</em>: tiene un saber superficial (lo ha oído), pero no está convencido de que le perjudique.",
      "Si lo comprendiera plenamente, no lo haría: nadie elige a sabiendas lo que le daña.",
      "<b>Crítica de Aristóteles</b>: eso ignora la <em>akrasía</em> (debilidad de la voluntad): a veces se sabe lo que es bueno y aun así las pasiones vencen. Es la objeción clásica."
    ]) +
    "<h5>El juicio y la muerte (399 a. C.)</h5>" +
    "<p>Las razones fueron en parte políticas. Atenas, tras perder la guerra del Peloponeso (404 a. C.), sufrió el gobierno oligárquico de los Treinta Tiranos (404–403 a. C.); Critias, uno de ellos, había frecuentado a Sócrates, igual que Alcibíades, político polémico. Al restaurarse la democracia en 403 a. C., Sócrates era sospechoso para mucha gente. Además, su método había incomodado a políticos y poetas. Fue acusado por Meleto, Anito y Licón de <b>no creer en los dioses de la ciudad</b>, de <b>introducir nuevos dioses</b> (su «daimonion», una voz interior que le advertía) y de <b>corromper a la juventud</b>.</p>" +
    "<p>Platón narra en la <em>Apología</em> su defensa. Un jurado de ciudadanos lo condenó a muerte; Sócrates no suplicó ni se retractó. Fue ejecutado bebiendo <b>cicuta</b> (399 a. C.). En el <em>Critón</em>, su amigo le ofrece una fuga: Sócrates se niega, porque ha vivido bajo las leyes de Atenas, y escapar sería romper el acuerdo con ellas. En el <em>Fedón</em> se narra su muerte serena, hablando de la inmortalidad del alma.</p>" +
    ojo("Cuidado al comentar el <em>Critón</em>: Sócrates no dice que el veredicto fuera justo (lo considera injusto), sino que <b>no se responde a una injusticia con otra</b>: huir sería quebrantar las leyes. La coherencia entre lo que piensa y lo que hace es lo que convierte su muerte en el gran ejemplo moral de la filosofía antigua.") +
    "<p>Por último, sitúa en el tiempo los hechos clave de esta historia.</p>" +
    w("orden", "juicio");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Mapa del tema: sofistas, Sócrates y lo que viene después", html:
    "<p>Aprende el tema como una conversación: los sofistas plantean un problema y Sócrates responde.</p>" +
    "<ol><li><b>Atenas democrática</b> necesita saber hablar: llegan los sofistas.</li>" +
    "<li><b>Sofistas</b>: la verdad y la moral son convención (nomos); lo que cuenta es persuadir. Relativismo (Protágoras), escepticismo (Gorgias), ley del más fuerte (Trasímaco).</li>" +
    "<li><b>Sócrates</b>: sí hay verdad moral, y se busca dialogando. Ironía + mayéutica; definiciones universales.</li>" +
    "<li><b>Ética</b>: virtud es conocimiento; nadie hace el mal a sabiendas.</li>" +
    "<li><b>Muerte</b>: coherencia entre pensamiento y vida. Platón recogerá su legado.</li></ol>" +
    tabla(["Tema", "Sofistas", "Sócrates"], [
      ["Verdad", "Relativa (Protágoras) o inalcanzable (Gorgias)", "Existe y se busca; nadie la posee ya"],
      ["Moral", "Convención; útil o del más fuerte", "Universal: el bien se puede conocer"],
      ["Saber", "Técnica que se enseña y se cobra", "Se descubre dialogando (mayéutica)"],
      ["Finalidad", "Triunfar y persuadir", "Cuidar el alma y ser feliz"]
    ]) +
    "<h5>Conexiones con el resto de la asignatura</h5>" +
    tabla(["Idea de este tema", "Reaparece en…"], [
      ["Definición universal («qué es X»)", "Platón (tema 3): las Ideas como esencias universales de lo justo, lo bello, lo bueno"],
      ["Mayéutica y conocimiento «latente»", "Platón: reminiscencia. También Descartes (ideas innatas)"],
      ["Intelectualismo moral y crítica de la akrasía", "Aristóteles (tema 4): la virtud también es hábito y voluntad, no solo saber"],
      ["Relativismo de Protágoras", "Debates actuales sobre relativismo cultural y moral; Nietzsche (perspectivismo)"],
      ["Coherencia entre vida y pensamiento", "Cínicos y estoicos (helenismo): la filosofía como forma de vida"],
      ["Giro antropológico", "Toda la ética y la política posteriores (Platón, Aristóteles, Kant…)"]
    ]) +
    "<p>(El tema 3 sigue el hilo: Platón, discípulo de Sócrates, responde también a los sofistas con una teoría de las Ideas que asegura una verdad objetiva.)</p>" });

  nuevas.push({ h: "7. Comentario de texto resuelto: Sócrates y la ignorancia (Apología, 21d)", html:
    "<p>Texto muy breve para ejercitar el método de comentario (tema, ideas, relación con el autor, comparación y valoración).</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Platón, <em>Apología de Sócrates</em>, 21d; traducción española habitual, que varía levemente según la edición):<br><em>«Al marcharme, pensaba para mí: soy más sabio que este hombre; es posible que ninguno de los dos sepamos nada bello y bueno, pero este cree saber algo sin saberlo, mientras que yo, así como no sé, tampoco creo saber.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Platón, <em>Apología de Sócrates</em>: su versión de la defensa de Sócrates en el juicio de 399 a. C. Sócrates cuenta cómo, tras la respuesta del oráculo, examinó a un político con fama de sabio.</li>" +
    "<li><b>2. Enuncia el tema.</b> La naturaleza del saber y de la ignorancia; la sabiduría como conciencia de la propia ignorancia.</li>" +
    "<li><b>3. Idea principal.</b> Sócrates es más sabio que el político <b>en un solo punto</b>: no cree saber lo que no sabe, mientras que el otro sí.</li>" +
    "<li><b>4. Ideas secundarias.</b> (a) Ninguno de los dos sabe lo «bello y bueno» (los valores). (b) La peor ignorancia es creer saber. (c) Sócrates no se presenta como poseedor de la verdad, sino como buscador.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la ignorancia docta, base de su método: la ironía parte de que el interlocutor cree saber, y le obliga a examinarse. Conecta con «conócete a ti mismo» y con el intelectualismo moral (si el mal viene de la ignorancia, el primer paso es reconocerla).</li>" +
    "<li><b>6. Compara con otro autor.</b> Frente a los sofistas, que se presentan como expertos y niegan la verdad objetiva, Sócrates cree que hay verdad pero reconoce no tenerla: ni relativista ni dogmático. Frente a Gorgias (nada es cognoscible), no es escéptico. Y puede compararse con Descartes (la duda como punto de partida).</li>" +
    "<li><b>7. Valora y concluye.</b> El texto resume el espíritu de la filosofía: preguntar antes que afirmar. Su vigencia es grande: la humildad intelectual sigue siendo condición del pensamiento crítico.</li></ol>" +
    ojo("Errores típicos al comentar: (1) decir que Sócrates «no sabe nada y ya está» (no es escepticismo: busca la verdad); (2) olvidar que el pasaje se enmarca en la historia del oráculo de Delfos; (3) no relacionarlo con la ironía y la mayéutica; (4) citar «solo sé que no sé nada» como si fuera literal: es un resumen tradicional.") +
    "<p>Para practicar, en los ejercicios tienes otro texto, el de Protágoras, con rúbrica para autoevaluarte.</p>" });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>Preguntas típicas y respuesta modelo en forma de esquema. Orden recomendado: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica el giro antropológico y el papel de los sofistas", "Respuesta modelo:", [
      "<b>Definición.</b> Giro antropológico: la filosofía pasa de preguntarse por la naturaleza (presocráticos) a preguntarse por el ser humano, el conocimiento y la moral (siglo V a. C., Atenas).",
      "<b>Sofistas.</b> Maestros itinerantes de retórica que cobran; relativismo (Protágoras: «el hombre, medida de todas las cosas»), escepticismo (Gorgias), ley del más fuerte (Trasímaco).",
      "<b>Contexto.</b> Democracia ateniense: saber hablar da poder.",
      "<b>Valoración.</b> Descubren el valor del lenguaje y de la crítica de las normas, pero se les reprocha vaciar de contenido la verdad y la moral."
    ]) +
    ejemplo("Pregunta 2. Compara a los sofistas y a Sócrates", "Respuesta modelo:", [
      "<b>Coinciden</b> en que el centro de la filosofía es el ser humano y en que usan el diálogo.",
      "<b>Difieren</b> en la verdad (relativa frente a universal), en la finalidad (persuadir frente a mejorar el alma) y en el saber (técnica que se vende frente a búsqueda compartida).",
      "<b>Cierre.</b> Platón sistematizará la respuesta de Sócrates: las Ideas garantizan una verdad objetiva."
    ]) +
    ejemplo("Pregunta 3. Explica el método socrático y el intelectualismo moral", "Respuesta modelo:", [
      "Método: diálogo; ironía (fingir ignorancia y mostrar contradicciones, hasta la aporía) y mayéutica (ayudar a dar a luz la definición).",
      "Ética: virtud es conocimiento, nadie hace el mal a sabiendas; felicidad = alma virtuosa.",
      "Relación: si el mal es ignorancia, el método (examinar creencias) es el camino de la virtud.",
      "Crítica: Aristóteles y la akrasía."
    ]) +
    "<p>Para practicar, los ejercicios de nivel ★★★ traen una rúbrica con la que ver la nota que te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz2") + w("quiz", "errores") + w("tarjetas", "tarjetas2") });

  B.parte.hf2a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
