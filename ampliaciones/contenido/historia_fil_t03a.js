/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 3: Platón
   (parte A: teoría. Parte B, historia_fil_t03b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Las Ideas no son «ideas en la cabeza»: son realidades objetivas, eternas y fuera de nosotros → sección 2 + clasificar.
   2. El mundo sensible no es «falso» ni «inexistente»: es copia, participa de las Ideas → sección 2 (ojo) + encuentra el error.
   3. La línea dividida: cuatro niveles (eikasía, pístis, diánoia, nóesis) y su paralelo con la caverna → sección nueva 6 + widget filo_caverna.
   4. El mito de la caverna: qué simboliza cada elemento y por qué el liberado DEBE volver → sección 3 + widget + comentario resuelto.
   5. La Idea de Bien y el Sol: causa de ser y de conocer → secciones 2 y 3.
   6. Reminiscencia e inmortalidad del alma (el esclavo del Menón, el Fedón) → sección 4.
   7. El alma tripartita ↔ virtudes ↔ clases, y la justicia como armonía → sección 4 y 5 + emparejar + orden.
   8. Política: filósofo-rey, educación, crítica de la democracia, y su valoración → sección 5.
   9. Comparación con Sócrates (de la definición a la Idea), con Heráclito/Parménides y con Aristóteles (T4) → mapa del tema.
   10. Comentario de texto: cómo se comenta un fragmento de la República → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t3/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Platón: vida, obra y problema
  secciones[0] =
    "<h5>La vida de Platón (427–347 a. C.) y por qué importa para entender su filosofía</h5>" +
    "<p>Platón nació en Atenas (427 a. C.) en una familia aristocrática. Lo normal habría sido dedicarse a la política, y de joven quiso hacerlo. Pero tres golpes se lo impidieron:</p>" +
    "<ul><li><b>La derrota de Atenas</b> frente a Esparta (guerra del Peloponeso, que acabó en 404 a. C.). Había visto una democracia que cometía errores graves y una ciudad humillada.</li>" +
    "<li><b>Los Treinta Tiranos</b> (404 a. C.), un gobierno oligárquico que incluía a familiares suyos y que resultó brutal. Su primera ilusión se rompió.</li>" +
    "<li><b>La condena a muerte de Sócrates</b> (470–399 a. C.), en 399 a. C., por la democracia restaurada. Para Platón el mejor y más justo de los hombres había sido ejecutado legalmente. Conclusión: <em>ninguna ciudad se arregla si no la gobiernan quienes saben qué es lo justo</em>. De ahí su famosa idea de que filosofía y poder deben unirse.</li></ul>" +
    "<p>Después de la muerte de Sócrates viajó (Megara, Egipto, el sur de Italia, Sicilia). En Siracusa trató al tirano Dionisio I (hacia 388–387 a. C.). De vuelta en Atenas fundó la <b>Academia</b> (hacia 387 a. C.), una escuela en los jardines dedicados al héroe Academo, que duró siglos. Allí se estudiaban matemáticas, astronomía, dialéctica y política; se cuenta (es una tradición, no un dato seguro) que en la entrada ponía algo así como «que no entre quien no sepa geometría». Volvió a Siracusa dos veces más (367 y 361 a. C.) para intentar educar al joven Dionisio II como gobernante-filósofo, y fracasó. En la Academia estudió <b>Aristóteles</b> (384–322 a. C.), que entró hacia 367 a. C. con unos diecisiete años y se quedó unos veinte, hasta la muerte de su maestro (347 a. C.).</p>" +
    "<h5>Cómo escribe: el diálogo</h5>" +
    "<p>Platón no escribió tratados, sino <b>diálogos</b>: conversaciones inventadas (sobre bases reales) en las que casi siempre el protagonista es Sócrates. Hay una razón profunda: para Platón la filosofía no es repetir una doctrina, sino <em>pensar con otros, probar, corregir</em>. Por eso termina en preguntas abiertas con frecuencia. Los diálogos suelen dividirse (con matices entre los especialistas) en tres etapas:</p>" +
    tabla(["Etapa", "Obras que debes conocer", "Rasgo principal"], [
      ["Juventud (socrática)", "<i>Apología de Sócrates</i>, <i>Critón</i>, <i>Eutifrón</i>", "Retrata al Sócrates histórico: busca definiciones y no las encuentra."],
      ["Madurez", "<i>Menón</i>, <i>Fedón</i>, <i>Banquete</i>, <i>República</i>, <i>Fedro</i>", "Expone la teoría de las Ideas, del alma y el Estado ideal. <b>La parte que cae en la PAU.</b>"],
      ["Vejez", "<i>Parménides</i>, <i>Teeteto</i>, <i>Sofista</i>, <i>Político</i>, <i>Timeo</i>, <i>Leyes</i>", "Revisa críticamente sus propias teorías; política más realista (<i>Leyes</i>)."]
    ]) +
    "<p>Importa distinguir: en los primeros diálogos habla el <b>Sócrates histórico</b> (tema 2); en los de madurez, el personaje «Sócrates» es ya <b>portavoz de Platón</b>. Esa es la diferencia clave entre los dos maestros: Sócrates preguntaba qué es la justicia y reconocía no saberlo; Platón responde que existe una <b>Idea de Justicia</b> que la razón puede conocer.</p>" +
    "<h5>El problema del que parte</h5>" +
    "<p>Platón recibe dos herencias que parecen incompatibles. De los presocráticos (tema 1): Heráclito dice que todo cambia (y entonces no hay nada estable que conocer), Parménides dice que el verdadero ser es inmutable. De Sócrates (tema 2): hay que buscar definiciones universales (qué es la virtud, la justicia), frente a los sofistas, que decían que todo depende de cada persona. Platón quiere salvar a la vez <b>tres cosas</b>: (1) que existe un conocimiento verdadero y universal (contra los sofistas); (2) que ese conocimiento versa sobre algo estable (Parménides); (3) que el mundo que vemos sí cambia (Heráclito). Su solución: <b>dos mundos</b>.</p>";

  // ---------------------------------------------------------------- 2. Teoría de las Ideas
  secciones[1] =
    "<h5>De dónde sale la idea: el argumento de lo universal</h5>" +
    "<p>Piensa en un círculo dibujado en una pizarra: nunca es un círculo perfecto, y con la tiza ni siquiera es redondo del todo. Y sin embargo la geometría demuestra cosas exactas sobre «el círculo», con un círculo que nadie ha visto jamás. ¿De qué trata entonces la geometría? Platón responde: de la <b>Idea de Círculo</b>, perfecta, que los círculos dibujados imitan mal.</p>" +
    "<p>Lo mismo pasa con la belleza o la justicia. Ves mil cosas bellas, distintas entre sí (un paisaje, una canción, un gesto), y sin embargo llamas «bello» a todas. ¿Qué tienen en común? No es algo que se vea: es la <b>Belleza en sí</b>. Si no existiera, no podríamos juzgar que esto es más bello que aquello (¿más cerca de qué?). Es el argumento de lo universal, y es la continuación natural de la pregunta de Sócrates «¿qué es X?»: <em>Sócrates buscaba la definición; Platón le da una existencia propia a lo definido.</em></p>" +
    "<h5>Qué es una Idea (y qué no)</h5>" +
    "<p>La palabra «idea» engaña, porque hoy solemos decir «idea» a lo que pensamos. Para Platón una <b>Idea (eîdos, ideá)</b> no está en nuestra mente: es una <b>realidad objetiva</b> que existe por sí misma, tanto si alguien piensa en ella como si no (como los números: el 7 no desaparece cuando dejas de pensar en él). Sus características:</p>" +
    "<ul><li><b>Eterna e inmutable:</b> no nace ni muere ni cambia (lo que pedía Parménides).</li>" +
    "<li><b>Una frente a lo múltiple:</b> hay muchas cosas bellas, una sola Belleza.</li>" +
    "<li><b>Perfecta y modelo:</b> es el patrón de que las cosas son copias imperfectas.</li>" +
    "<li><b>Inteligible:</b> solo se conoce con la razón, no con los sentidos.</li>" +
    "<li><b>Más real</b> que las cosas: de ella depende que las cosas sean lo que son.</li></ul>" +
    "<h5>Relación entre los dos mundos: participación e imitación</h5>" +
    "<p>Las cosas sensibles no son «nada», sino <b>copias</b> de las Ideas. Platón usa dos palabras para describirlo, y conviene conocer ambas: las cosas <b>participan</b> de la Idea (<em>méthexis</em>: tienen una parte de ella, son bellas porque participan de la Belleza) o <b>imitan</b> la Idea (<em>mímesis</em>: la copian, como un dibujo copia un modelo). Y las Ideas se pueden entender también como la <b>causa</b> de que algo sea lo que es. Las cosas sensibles están «a medio camino entre el ser y el no ser»: no son la nada (existen), pero tampoco son el ser pleno (cambian, nacen, mueren, son bellas desde un punto de vista y feas desde otro).</p>" +
    tabla(["", "Mundo sensible", "Mundo inteligible"], [
      ["Qué lo forma", "Cosas concretas: este caballo, esta acción justa", "Ideas: Caballo, Justicia, Belleza, Igualdad, Bien"],
      ["Cómo es", "Cambiante, múltiple, imperfecto, corruptible", "Eterno, único, perfecto, inmutable"],
      ["Cómo se accede", "Sentidos (da <b>opinión</b>, <i>dóxa</i>)", "Razón (da <b>ciencia</b>, <i>epistéme</i>)"],
      ["Relación", "<b>Copia</b>: participa de las Ideas", "<b>Modelo</b>: causa de que las cosas sean"],
      ["Presocrático que se parece", "Heráclito (todo fluye)", "Parménides (el ser es inmutable)"]
    ]) +
    ojo("Error muy común: decir que para Platón el mundo sensible «no existe» o es «una ilusión». No es cierto: existe, pero es <b>menos real</b>, es copia. Otro error: pensar que las Ideas están «dentro de nuestra cabeza»; son objetivas. Tercer error: poner un solo «mundo de las Ideas» sin jerarquía; las Ideas están ordenadas y presididas por la Idea de Bien.") +
    "<h5>La jerarquía de las Ideas y la Idea de Bien</h5>" +
    "<p>Las Ideas no son un montón: tienen un orden. Hay Ideas de objetos (Caballo), de valores morales y estéticos (Justicia, Belleza), de relaciones matemáticas (Igualdad, Número). Y por encima de todas, la <b>Idea de Bien</b>. En la <em>República</em> (libro VI) Platón la compara con el <b>Sol</b>: el Sol hace que veamos las cosas (da luz) y que las cosas existan y crezcan (da vida); igualmente, el Bien hace que las Ideas sean <b>conocibles</b> (da verdad) y que <b>sean</b> lo que son (da ser). Por eso, conocer el Bien es el fin más alto de la filosofía y condición para gobernar bien. Cuidado: «Bien» no es solo «bondad moral»; es el principio de orden, perfección y finalidad de todo.</p>" +
    "<h5>Tres problemas que te pueden preguntar</h5>" +
    "<ul><li><b>¿Cómo conecta con Heráclito y Parménides?</b> Da la razón a Heráclito sobre el mundo sensible (cambia) y a Parménides sobre el inteligible (inmutable).</li>" +
    "<li><b>¿Cómo conecta con Sócrates?</b> Las definiciones universales que buscaba Sócrates tienen un objeto real: las Ideas.</li>" +
    "<li><b>¿Qué crítica recibirá?</b> Aristóteles (tema 4) dirá que las Ideas «duplican» el mundo sin explicarlo, y que la forma de las cosas está <em>en</em> las cosas, no separada. El propio Platón, en el <i>Parménides</i>, ya se planteó objeciones (el llamado «tercer hombre»).</li></ul>" +
    w("clasificar", "sensinteligible");

  // ---------------------------------------------------------------- 3. Caverna
  secciones[2] =
    "<h5>Qué simboliza cada elemento del mito</h5>" +
    "<p>El mito de la caverna es una <b>alegoría</b>: casi cada detalle es un símbolo. Para la PAU conviene saber la tabla de símbolos de memoria, porque es lo que se pide en cuanto sale el texto:</p>" +
    tabla(["En el mito", "Simboliza", "Nivel"], [
      ["La caverna, el interior", "El mundo sensible", "Dóxa (opinión)"],
      ["Las cadenas, el estar de espaldas", "Las ataduras del cuerpo, los sentidos y los prejuicios", "Ignorancia"],
      ["Las sombras en la pared", "Las apariencias, las imágenes, lo que «se dice»", "Eikasía (imaginación)"],
      ["Los objetos que pasan tras el muro y el fuego", "Las cosas sensibles y su origen aparente", "Pístis (creencia)"],
      ["El camino empinado hacia fuera", "El esfuerzo y el dolor de la educación; la dialéctica", "Ascenso"],
      ["El exterior", "El mundo inteligible", "Epistéme (ciencia)"],
      ["Los reflejos y sombras al aire libre", "Los objetos matemáticos", "Diánoia (razonamiento)"],
      ["Los seres reales", "Las Ideas", "Nóesis (inteligencia)"],
      ["El Sol", "La Idea de Bien", "Cima del saber"],
      ["El regreso a la cueva", "El deber del filósofo de educar y gobernar", "Ética y política"]
    ]) +
    "<h5>Lo que enseña el mito, en cuatro ideas</h5>" +
    "<ol><li><b>Vivimos tomando por real lo que es copia</b>, y no lo sabemos. Hoy sería parecido a creer que lo que sale en una pantalla es la vida entera.</li>" +
    "<li><b>Educar no es «meter» conocimiento en la cabeza</b>, sino <em>girar el alma</em> hacia donde está la verdad (Platón dice que el alma ya tiene la capacidad de ver; hay que orientarla). Fíjate: al prisionero no se le pide permiso: se le obliga a salir.</li>" +
    "<li><b>El conocimiento es un camino difícil y gradual.</b> La luz duele al principio. Quien sale de golpe, se deslumbra. Por eso la educación platónica es larga y escalonada.</li>" +
    "<li><b>El sabio tiene un deber político.</b> No puede quedarse arriba disfrutando de la contemplación: debe bajar. Esto conecta directamente con el filósofo-rey.</li></ol>" +
    "<h5>La conexión con Sócrates</h5>" +
    "<p>Platón escribe de forma que el lector piense en Sócrates: el prisionero liberado que baja a ayudar y es ridiculizado (e incluso amenazado de muerte) es el mismo destino de su maestro. El mito es también una defensa de la filosofía ante una ciudad que mató al filósofo.</p>" +
    ojo("En la PAU, no cuentes el mito como un cuento: <b>cada paso se explica con su símbolo</b>. Y no olvides el final (el regreso), que es lo que lo conecta con la política.") +
    w("filo_caverna");

  // ---------------------------------------------------------------- 4. Alma, conocimiento, ética
  secciones[3] =
    "<h5>Dualismo: el alma frente al cuerpo</h5>" +
    "<p>Platón sostiene un <b>dualismo antropológico</b>: el ser humano está formado por dos realidades distintas. El <b>alma</b> es de la naturaleza de las Ideas (inmortal, invisible, racional) y el <b>cuerpo</b> es de la naturaleza del mundo sensible (mortal, cambiante). Juega con un juego de palabras en griego: el cuerpo (<em>sôma</em>) sería la tumba o cárcel (<em>sêma</em>) del alma. Para Platón, el alma se encuentra en el cuerpo como un exiliado: por eso el filósofo «se prepara para morir», es decir, aprende a vivir liberándose de las pasiones del cuerpo para contemplar mejor la verdad. No significa que odie el cuerpo, sino que quiere que el alma mande.</p>" +
    "<h5>Argumentos de la inmortalidad (Fedón)</h5>" +
    "<p>En el <i>Fedón</i> (que narra la última conversación de Sócrates antes de beber la cicuta) Platón da varios argumentos. Basta con que conozcas dos ideas: (1) <b>Afinidad</b>: el alma conoce las Ideas, que son eternas e invisibles; solo algo de su misma naturaleza puede conocerlas. Luego el alma es afín a lo eterno. (2) <b>Reminiscencia</b>: si sabemos cosas que no hemos aprendido en esta vida, el alma existía antes.</p>" +
    "<h5>La reminiscencia, con el ejemplo del <i>Menón</i></h5>" +
    "<p>Platón da un ejemplo que se hizo famoso. En el <i>Menón</i>, Sócrates interroga a un esclavo sin estudios y, solo con preguntas y un dibujo en la arena, hace que el esclavo llegue a descubrir cómo duplicar el área de un cuadrado. Sócrates no le dice nada: el esclavo «lo saca de sí». Platón concluye: ese saber estaba ya en su alma, olvidado. Aprender es <b>recordar</b> (<em>anámnesis</em>). Es una teoría del <b>innatismo</b>: el conocimiento verdadero no viene de los sentidos, sino que ya está en el alma. La experiencia sirve solo como <em>ocasión</em>: al ver cosas iguales (dos palos casi iguales) recordamos la Idea de Igualdad, que nunca hemos visto. Fíjate cómo sostiene el mismo esquema: <b>las Ideas → alma las contempló → olvida al unirse al cuerpo → los sentidos despiertan el recuerdo</b>.</p>" +
    ejemplo("Un ejemplo cotidiano de reminiscencia", "Ves dos baldosas «iguales», pero si las mides con precisión, nunca son exactamente iguales. ¿De dónde sacas la idea de «igualdad perfecta» con la que las comparas?", [
      "Los sentidos solo te dieron cosas casi iguales, nunca la igualdad perfecta.",
      "Sin embargo, juzgas que «no son del todo iguales»: usas un patrón.",
      "Platón: ese patrón es la Idea de Igualdad, que el alma conoció antes de nacer; las baldosas te la <b>recuerdan</b>."
    ]) +
    "<h5>Las tres partes del alma (el carro alado)</h5>" +
    "<p>En el <i>Fedro</i>, Platón compara el alma con un <b>carro tirado por dos caballos</b> y guiado por un auriga. Es la mejor imagen para entender la teoría de las tres partes:</p>" +
    tabla(["Parte del alma", "Imagen (Fedro)", "Dónde reside", "Función", "Virtud", "Clase social"], [
      ["Racional (<i>logistikón</i>)", "El auriga", "Cabeza", "Pensar, conocer, decidir", "Sabiduría (<i>sophía</i>, prudencia)", "Gobernantes-filósofos"],
      ["Irascible (<i>thymoeidés</i>)", "El caballo noble", "Pecho", "Voluntad, valor, ira noble", "Valentía (<i>andreía</i>, fortaleza)", "Guardianes (guerreros)"],
      ["Concupiscible (<i>epithymetikón</i>)", "El caballo rebelde", "Vientre", "Deseos de placer, comida, dinero", "Templanza (<i>sophrosýne</i>)", "Productores (artesanos, labradores)"]
    ], "q3t") +
    "<p>Hay que entender bien lo que se pide: <b>cada parte tiene su virtud propia</b>, y la cuarta virtud, la <b>justicia</b>, no es de una parte, sino de la armonía de todas. Una persona es justa cuando la razón manda, la voluntad la obedece y los deseos se dejan guiar. Lo mismo ocurre con el Estado.</p>" +
    "<h5>Ética: intelectualismo y felicidad</h5>" +
    "<p>La ética de Platón es la continuación de la de Sócrates con una base metafísica: nadie hace el mal voluntariamente, porque nadie quiere lo malo para sí; se obra mal por <b>ignorancia del Bien</b> (intelectualismo moral). Pero Platón añade algo que Sócrates no tenía: como el alma tiene partes, se puede <em>saber lo bueno</em> y a pesar de ello dejarse arrastrar por el deseo (el caballo rebelde). Por eso, además de saber, hace falta <b>educar el carácter</b>. La vida buena (felicidad, <em>eudaimonía</em>) es la del alma ordenada, y el filósofo, que conoce el Bien, es el más feliz. Las cuatro <b>virtudes cardinales</b> (sabiduría, valentía, templanza, justicia) ordenan el alma y el Estado.</p>" +
    ojo("Cuidado con confundir: <b>templanza</b> no es solo «de los productores»; es la virtud de acuerdo y armonía entre las tres partes (sobre quién debe mandar). Aun así, en el esquema básico de la PAU se asocia al alma concupiscible y a los productores. Y no mezcles dos cosas distintas: la <i>reminiscencia</i> explica cómo conocemos; la <i>tripartición</i> explica cómo actuamos.") +
    w("emparejar", "alma");

  // ---------------------------------------------------------------- 5. Política
  secciones[4] =
    "<h5>Por qué hace falta un Estado ideal</h5>" +
    "<p>La política de Platón sale directamente de su ética: así como en el alma debe mandar la razón, en la ciudad deben mandar quienes saben. Una persona sola no es autosuficiente (necesita comida, casa, defensa), y por eso nace la ciudad; pero para que la ciudad funcione, cada uno debe hacer <b>lo que mejor sabe hacer</b>. De ahí la división en tres clases, que reproduce las tres partes del alma:</p>" +
    tabla(["Clase", "Parte del alma", "Virtud", "Tarea", "Educación"], [
      ["Gobernantes (filósofos)", "Racional", "Sabiduría", "Gobernar con conocimiento del Bien", "Larga: música, gimnasia, matemáticas, dialéctica hasta los 50 años"],
      ["Guardianes (guerreros)", "Irascible", "Valentía", "Defender la ciudad", "Música y gimnasia"],
      ["Productores", "Concupiscible", "Templanza", "Producir bienes (agricultura, oficios, comercio)", "La necesaria para su oficio"]
    ], "q3t") +
    "<h5>Cómo se selecciona y se educa</h5>" +
    "<p>Para Platón la clase no se hereda: se asigna según las <b>aptitudes</b>, de modo que un hijo de artesano con talento filosófico podría llegar a gobernar, y viceversa. Para ello propone un sistema educativo del Estado. Se parte de la gimnasia y la música (que incluye la literatura y forma el carácter), se selecciona a los mejor dotados y se les somete a las matemáticas y finalmente a la <b>dialéctica</b>, que lleva a conocer el Bien. El filósofo no gobierna a gusto: lo hace por deber (es el regreso a la caverna). De hecho, Platón dice que debe gobernar el que <em>menos desee</em> el poder.</p>" +
    "<h5>Medidas llamativas (y discutibles)</h5>" +
    "<ul><li>Para que los gobernantes y guardianes no se corrompan, <b>no tienen propiedad privada</b> ni familia propia: viven en común y comparten (lo que se llama «comunismo» de bienes y de familia, que no hay que confundir con el comunismo moderno).</li>" +
    "<li><b>Las mujeres</b> con aptitudes pueden ser guardianas y gobernantes: un rasgo muy avanzado para su época, aunque se justifica por la aptitud y no por la igualdad como derecho.</li>" +
    "<li><b>Control de la poesía y la música</b> que educan, porque los mitos que se cuentan a los niños forman el alma.</li></ul>" +
    "<h5>Justicia y degeneración de las formas de gobierno</h5>" +
    "<p>La justicia es el principio que ordena todo: <b>cada cual hace lo suyo</b>, sin invadir lo ajeno. En la <i>República</i> (libros VIII–IX) Platón describe cómo se degrada un Estado cuando se rompe ese orden. El Estado justo es la <b>aristocracia</b> (el gobierno de los mejores, los sabios). Se degrada en <b>timocracia</b> (gobierno de los guerreros, que aman el honor), luego en <b>oligarquía</b> (de los ricos), después en <b>democracia</b> (donde todos los deseos valen igual y manda la multitud) y, finalmente, en <b>tiranía</b>, la peor. A cada forma de Estado corresponde un tipo de alma: la tiranía es el alma dominada por el deseo desordenado.</p>" +
    "<h5>Cómo valorarlo</h5>" +
    "<p>Platón critica la democracia porque, para él, el gobierno debe ser un <b>saber</b> (como el del piloto de un barco o el del médico) y no una cuestión de votos; recuerda que la democracia mató a Sócrates. Críticos modernos como Popper lo consideran un precedente de los totalitarismos, por su control de la educación, la jerarquía rígida y la poca importancia de la libertad individual. Los defensores subrayan su idea de que el poder exige preparación y sentido del bien común, y que en sus últimas obras (<i>Político</i>, <i>Leyes</i>) propone un modelo «segundo mejor» sometido a leyes y con instituciones mixtas, mucho más realista. Una buena respuesta de PAU incluye una valoración equilibrada.</p>" +
    w("orden", "ordenasc");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. La línea dividida: grados del conocimiento", html:
    "<p>En el libro VI de la <i>República</i>, antes del mito de la caverna, Platón dibuja una imagen: una <b>línea</b> dividida en dos partes desiguales, y cada una a su vez en dos. Representa los <b>cuatro grados del conocimiento</b> y los cuatro tipos de objetos que conocemos con cada grado. El mito de la caverna dice lo mismo con una historia, por eso se estudian juntos.</p>" +
    tabla(["Mundo", "Grado de conocimiento", "Objeto", "Ejemplo"], [
      ["Sensible (<i>dóxa</i>, opinión)", "<b>Imaginación</b> (<i>eikasía</i>)", "Imágenes, sombras, reflejos, copias de las cosas", "Creer que el retrato es la persona"],
      ["Sensible (<i>dóxa</i>)", "<b>Creencia</b> (<i>pístis</i>)", "Cosas y seres vivos concretos", "Fiarte de lo que ves y tocas"],
      ["Inteligible (<i>epistéme</i>, ciencia)", "<b>Razonamiento</b> (<i>diánoia</i>)", "Objetos matemáticos, con hipótesis y figuras", "Demostrar con un triángulo dibujado"],
      ["Inteligible (<i>epistéme</i>)", "<b>Inteligencia</b> (<i>nóesis</i>)", "Las Ideas, hasta la Idea de Bien", "Entender qué es la justicia en sí"]
    ]) +
    "<h5>Cómo leerla sin confundirse</h5>" +
    "<ul><li><b>Opinión frente a ciencia.</b> Los dos primeros grados son opinión (<i>dóxa</i>): conocimiento probable y cambiante. Los dos últimos son ciencia (<i>epistéme</i>): conocimiento seguro de lo inmutable.</li>" +
    "<li><b>Diánoia frente a nóesis.</b> En el razonamiento (matemáticas) se parte de <em>hipótesis</em> (por ejemplo, «sea un triángulo…») y se baja hacia las conclusiones usando figuras visibles. En la inteligencia (dialéctica) se asciende a un principio que ya no es hipótesis, el Bien, y no hacen falta imágenes. Por eso la matemática es el puente: prepara la mente para la dialéctica.</li>" +
    "<li><b>La línea tiene proporciones.</b> Cada tramo es más pequeño que el siguiente en claridad y verdad: cuanto más arriba, más ser y más verdad.</li></ul>" +
    "<h5>Línea y caverna, juntas</h5>" +
    "<p>Una correspondencia que se maneja en los manuales (hay variantes de interpretación, y el propio Platón no la establece punto por punto) es la siguiente: las <b>sombras</b> de la pared son la imaginación; los <b>objetos</b> que las producen, la creencia; los <b>reflejos</b> al aire libre, el razonamiento; los <b>seres reales</b>, la inteligencia; el <b>Sol</b>, la Idea de Bien. Prueba el widget del apartado 3 y compáralo con esta tabla.</p>" +
    ojo("En la PAU, si hablas de la línea, dilo en orden de abajo arriba: <b>eikasía → pístis → diánoia → nóesis</b>, y di siempre qué mundo y qué objeto corresponde a cada uno. Un error muy frecuente es poner las matemáticas en la ciencia más alta: son <i>diánoia</i>, el escalón previo.") +
    w("emparejar", "linea") });

  nuevas.push({ h: "7. Mapa del tema: Platón y los demás autores", html:
    "<p>El comentario de texto de la PAU casi siempre pide <b>relacionar el texto con el pensamiento del autor</b> y <b>compararlo con otro autor</b>. Con Platón, estas son las relaciones que más se piden:</p>" +
    tabla(["Autor", "Relación con Platón"], [
      ["Heráclito y Parménides (T1)", "Platón los concilia: el mundo sensible cambia (Heráclito), el inteligible no (Parménides)."],
      ["Sócrates (T2)", "Platón hace objetivas las definiciones de Sócrates: el «qué es» tiene una Idea. Ambos son intelectualistas en ética."],
      ["Sofistas (T2)", "Platón los combate: hay una verdad y un bien universales, no relativos a cada persona."],
      ["Aristóteles (T4)", "Su discípulo le critica: las formas no están separadas de las cosas. Ambos son racionalistas y teleológicos, pero Aristóteles parte de la experiencia."],
      ["Agustín de Hipona (T6)", "Cristianiza el platonismo: las Ideas pasan a ser ideas en la mente de Dios; el alma es inmortal; el mundo sensible es inferior."],
      ["Descartes (T9)", "Comparte el innatismo (las ideas ya están en la mente) y el dualismo alma–cuerpo, aunque con otro método."],
      ["Kant (T12)", "También separa lo que aparece (fenómeno) y lo que es (cosa en sí), pero no cree que se pueda conocer el segundo."],
      ["Nietzsche (T14)", "Lo critica duramente: inventar un «otro mundo» devalúa la vida real; el platonismo sería «cristianismo para el pueblo»."]
    ]) +
    "<p>Estos números de tema son los de la ruta de este curso; lo importante es la idea de cada relación. Para recordarlo, piensa en tres palabras: <b>concilia</b> (a los presocráticos), <b>objetiva</b> (a Sócrates), <b>es criticado</b> (por Aristóteles).</p>" +
    "<h5>Cuadro-resumen: lo que sostiene Platón</h5>" +
    tabla(["Ámbito", "Tesis de Platón"], [
      ["Realidad (metafísica)", "Dos mundos: sensible (copia) e inteligible (Ideas), presididos por la Idea de Bien."],
      ["Conocimiento", "Cuatro grados (línea dividida); conocer es recordar (anámnesis); innatismo y racionalismo."],
      ["Ser humano", "Dualismo: alma inmortal y tripartita en un cuerpo mortal."],
      ["Ética", "Intelectualismo moral; virtud como armonía del alma; justicia = cada parte a lo suyo."],
      ["Política", "Estado en tres clases; filósofos-gobernantes; educación; crítica de la democracia."]
    ]) });

  nuevas.push({ h: "8. Comentario de texto resuelto: el Sol y el Bien", html:
    "<p>En la PAU se pide comentar un fragmento breve: <b>tema, ideas, relación con el autor y comparación con otro</b>. Aquí tienes uno resuelto paso a paso, con dos frases cortas de la <i>República</i>.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Platón, <em>República</em>, libros VI y VII; traducción española habitual, que varía levemente según la edición):<br><em>«Lo que proporciona la verdad a las cosas cognoscibles y otorga al que conoce el poder de conocer, es la Idea del Bien. [...] En los últimos límites de lo cognoscible está la Idea del Bien, que se percibe con dificultad.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Platón (427–347 a. C.), <i>República</i>, obra de madurez, de los libros VI y VII, donde aparecen el Sol, la línea y la caverna. Contexto: la educación del filósofo que debe gobernar.</li>" +
    "<li><b>2. Tema.</b> La Idea de Bien como principio supremo de la verdad y del conocimiento.</li>" +
    "<li><b>3. Idea principal.</b> El Bien es la causa de que las demás Ideas sean verdaderas (cognoscibles) y de que el sujeto pueda conocerlas; es lo último que se alcanza, y con esfuerzo.</li>" +
    "<li><b>4. Ideas secundarias y términos.</b> (a) «Verdad a lo cognoscible» y «poder de conocer»: como el Sol da luz al objeto visto y vista al ojo. (b) «Últimos límites»: se llega al final de un ascenso (dialéctica, línea, caverna). (c) «Con dificultad»: el conocimiento exige esfuerzo, y deslumbra al principio.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es el centro de su sistema: dos mundos, el inteligible presidido por el Bien (como el Sol en el sensible); conocimiento como ascenso (línea, caverna) y educación como giro del alma; la ética y la política dependen de conocer el Bien: solo quien lo conoce puede gobernar (filósofo-rey) y ser justo (armonía del alma).</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Aristóteles (tema 4): también el Bien es el fin de todo, pero para él es inmanente (el fin propio de cada ser), no una Idea separada; critica que un Bien único y separado no explique los bienes concretos. Con Sócrates: este buscaba el bien por la definición y la ignorancia; Platón le da un objeto real.</li>" +
    "<li><b>7. Valora y concluye.</b> El texto muestra el carácter racionalista, idealista y ético de Platón: el conocimiento más alto no es técnico, sino moral. Su influencia es inmensa: el platonismo cristiano (Agustín) hace del Bien a Dios.</li></ol>" +
    ojo("Errores típicos al comentar: (1) <b>contar</b> el texto en vez de explicar las ideas; (2) quedarse solo con el Sol sin relacionarlo con las Ideas ni con la política; (3) olvidar que el Bien es la última y más difícil Idea; (4) comparar sin decir en qué difieren (Aristóteles y el bien inmanente).") +
    "<p>Practica ahora con los comentarios de texto con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "9. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>Preguntas típicas y respuesta modelo en forma de esquema. El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica la teoría de las Ideas", "Respuesta modelo, en cinco movimientos:", [
      "<b>Definición.</b> Las Ideas son realidades objetivas, eternas, inmutables y perfectas, solo accesibles a la razón; son el modelo de las cosas.",
      "<b>Dos mundos.</b> Sensible (cambiante, copia, opinión) e inteligible (Ideas, ciencia).",
      "<b>Relación.</b> Participación e imitación; la Idea de Bien, como el Sol, ilumina todas las demás.",
      "<b>Origen.</b> Resuelve el dilema Heráclito–Parménides y da objeto a las definiciones de Sócrates.",
      "<b>Crítica.</b> Aristóteles la rechaza: las formas no están separadas de las cosas."
    ]) +
    ejemplo("Pregunta 2. Explica el mito de la caverna", "Respuesta modelo:", [
      "<b>Relato breve:</b> prisioneros, sombras, liberación, ascenso, Sol, regreso.",
      "<b>Símbolos:</b> caverna = mundo sensible; exterior = inteligible; Sol = Bien.",
      "<b>Línea dividida:</b> sombras, objetos, reflejos, seres reales.",
      "<b>Mensaje:</b> la educación es un giro del alma y el sabio debe volver.",
      "<b>Conexión:</b> Sócrates; filósofo-rey."
    ]) +
    ejemplo("Pregunta 3. Alma y Estado en Platón", "Respuesta modelo:", [
      "Tres partes del alma: racional, irascible, concupiscible.",
      "Tres virtudes: sabiduría, valentía, templanza; la justicia es la armonía.",
      "Tres clases: gobernantes, guardianes, productores.",
      "El Estado es el alma «en grande»: gobierna quien tiene la razón.",
      "Valoración: elitismo y crítica a la democracia frente a la idea de que gobernar exige saber."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf3a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
