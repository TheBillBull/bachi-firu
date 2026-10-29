/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 11: Rousseau y la Ilustración
   (parte A: teoría. Parte B, historia_fil_t11b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. El estado de naturaleza es una hipótesis para pensar, no una época histórica; «bueno» no es «virtuoso» → sección 2 + errores.
   2. Amor de sí frente a amor propio (de dónde sale el mal) y perfectibilidad → sección 2 + clasificar.
   3. Origen de la desigualdad: la propiedad privada y el falso pacto de los ricos → sección 2 + orden.
   4. La crítica a las ciencias y las artes: Rousseau no es un enemigo de la razón → sección 2 (ojo).
   5. El contrato social legítimo: cesión total a la comunidad y libertad civil → sección 3.
   6. Voluntad general ≠ voluntad de todos (la que más cae) → sección 3 + emparejar.
   7. Soberanía popular inalienable, rechazo de la representación, «forzado a ser libre» → sección 3.
   8. Comparación con Hobbes y Locke (otros contractualistas) → sección 3 y tabla del mapa.
   9. Emilio: educación negativa y etapas; la religión natural del vicario → sección 4.
   10. Contexto ilustrado: razón, progreso, Enciclopedia, despotismo ilustrado, Kant y «sapere aude» → secciones 1 y 5.
   11. Comentario de texto: el problema del contrato (Contrato social, I, 6) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t11/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. La Ilustración
  secciones[0] =
    "<h5>Qué cambia en Europa en el siglo XVIII</h5>" +
    "<p>Imagina que durante siglos te han dicho qué pensar: lo que dice la Iglesia, lo que ordena el rey, lo que «siempre se ha hecho». La Ilustración es el momento en que muchas personas deciden <b>preguntar «¿por qué?» a todo</b> y aceptar solo lo que se puede justificar con la razón y la experiencia. Venía preparada por los siglos anteriores: la ciencia de Galileo y Newton (tema 8), el racionalismo de Descartes (tema 9) y el empirismo de Locke y Hume (tema 10) habían enseñado que la razón humana, bien usada, entiende el mundo.</p>" +
    "<p>Se la llama «siglo de las luces» (en francés, <i>les Lumières</i>; en alemán, <i>Aufklärung</i>) porque la razón se imagina como una luz que disipa la oscuridad de la ignorancia y la superstición. Su centro fue <b>Francia</b>, con París y sus salones, pero llegó a toda Europa y a América.</p>" +
    "<h5>Quién es quién (con fechas, para no confundirse)</h5>" +
    tabla(["Pensador", "Fechas", "Aportación que conviene recordar"], [
      ["Locke", "1632–1704", "Gobierno limitado y derechos naturales (vida, libertad, propiedad); tolerancia."],
      ["Montesquieu", "1689–1755", "<i>El espíritu de las leyes</i> (1748): separación de poderes."],
      ["Voltaire", "1694–1778", "Tolerancia y crítica del fanatismo (<i>Tratado sobre la tolerancia</i>, 1763)."],
      ["Hume", "1711–1776", "Empirismo; la razón no basta para fundar la moral (tema 10)."],
      ["Rousseau", "1712–1778", "Crítica a la civilización y soberanía popular."],
      ["Diderot", "1713–1784", "Dirige la <i>Enciclopedia</i> (1751–1772) junto a D'Alembert (1717–1783)."],
      ["Kant", "1724–1804", "Resume la época: «¿Qué es la Ilustración?» (1784) y su lema «sapere aude» (tema 12)."]
    ]) +
    "<p>Fíjate en un dato curioso: <b>Voltaire y Rousseau murieron el mismo año, 1778</b>, y fueron grandes rivales. Voltaire admiraba el progreso y el lujo de la civilización; Rousseau desconfiaba de ellos. Ese contraste es el corazón del tema.</p>" +
    "<h5>El lema de Kant, paso a paso</h5>" +
    "<p><i>Sapere aude</i> es una expresión latina del poeta Horacio que Kant hizo famosa: «atrévete a saber». En su artículo <i>¿Qué es la Ilustración?</i> (1784) explica que la Ilustración es la salida del ser humano de su <b>minoría de edad</b>: es decir, de la incapacidad de usar el propio entendimiento sin la guía de otro. Y añade que la causa no es falta de inteligencia, sino de <b>decisión y valor</b>: es cómodo que otro piense por ti (el tutor, el cura, el médico). Pensar por uno mismo da un poco de vértigo, pero es la condición para ser libre.</p>" +
    ejemplo("Una alumna ilustrada y una que no lo es", "Dos amigas oyen en redes que «los gatos negros dan mala suerte».", [
      "La primera lo repite porque «lo dice todo el mundo»: acepta la autoridad sin examen.",
      "La segunda pregunta <b>en qué se apoya</b>, busca datos y, si no los hay, no lo cree. Eso es <i>sapere aude</i>.",
      "Ilustrar no significa creer en todo lo nuevo, sino <b>examinar</b> también lo viejo."
    ]) +
    ojo("La Ilustración <b>no es lo mismo que la Revolución Francesa</b> (1789), aunque la preparó en parte, ni tampoco rechaza toda religión: Voltaire y Rousseau creían en Dios; lo que critican es el fanatismo y la autoridad sin razones. Y no todos los ilustrados querían democracia: muchos defendían el <b>despotismo ilustrado</b> (monarcas absolutos que reforman «con luces»). Lema de ese despotismo: «<i>todo para el pueblo, pero sin el pueblo</i>». Rousseau, como verás, irá mucho más lejos.");

  // ---------------------------------------------------------------- 2. Rousseau: crítica a la civilización
  secciones[1] =
    "<h5>La vida de Rousseau en cuatro pinceladas</h5>" +
    "<ul><li><b>1712</b>: nace en <b>Ginebra</b>; su madre muere al darle a luz y su padre, relojero, lo deja pronto. Se educa casi solo, leyendo.</li>" +
    "<li><b>Años 1740</b>: llega a París; se mueve entre los ilustrados y colabora en la <i>Enciclopedia</i> (escribe sobre música).</li>" +
    "<li><b>1750</b>: su <i>Discurso sobre las ciencias y las artes</i> gana el premio de la Academia de Dijon y lo hace famoso de golpe.</li>" +
    "<li><b>1762</b>: publica <i>Del contrato social</i> y <i>Emilio</i>; ambos se condenan en París y en Ginebra, y Rousseau debe huir. Muere en <b>1778</b>.</li></ul>" +
    "<h5>La pregunta del Discurso de 1750</h5>" +
    "<p>La Academia de Dijon preguntó: «¿Ha contribuido el restablecimiento de las ciencias y las artes a depurar las costumbres?». Todo el mundo esperaba un «sí». Rousseau respondió <b>«no»</b>: el progreso del saber y del lujo ha producido gente más hábil y refinada, pero no más buena. Las apariencias educadas esconden egoísmo, y las artes sirven muchas veces para adornar la desigualdad y entretener a quien debería protestar.</p>" +
    ojo("Rousseau <b>no odia la razón ni el saber</b> (escribió filosofía, música y una novela de éxito). Su tesis es que el progreso <b>material y científico no garantiza el progreso moral</b>. Por eso es «paradójico» en la Ilustración: usa la razón crítica para criticar la fe ciega en el progreso.") +
    "<h5>El estado de naturaleza: una hipótesis, no un cuento de la historia</h5>" +
    "<p>En el <i>Discurso sobre el origen de la desigualdad entre los hombres</i> (1755), Rousseau se pregunta de dónde viene la desigualdad social y si es «natural». Para saberlo, quita con la imaginación todo lo que la sociedad ha añadido al ser humano y se pregunta cómo sería <b>el hombre natural</b>. Ese estado de naturaleza es un <b>experimento mental</b>; el propio Rousseau advierte en el prefacio que quizá no existió nunca. Lo que quiere es separar lo que viene de la naturaleza de lo que es obra de la sociedad.</p>" +
    "<p>¿Cómo es ese ser humano natural?</p>" +
    "<ul><li><b>Libre y autosuficiente</b>: vive aislado o en grupos pequeños, sin depender de otros.</li>" +
    "<li><b>Sin maldad</b>: no es bueno por haber elegido el bien, sino porque no tiene motivos para el mal. Es <b>amoral</b> (ni bueno ni malo en sentido moral), no virtuoso. La virtud aparece con la sociedad y la razón.</li>" +
    "<li><b>Con dos impulsos básicos</b>: el <b>amor de sí</b> (cuidar la propia conservación) y la <b>piedad</b> o compasión natural (rechazo a ver sufrir a otro).</li>" +
    "<li><b>Perfectible</b>: tiene la capacidad de mejorar y aprender; lo que le hará salir de la naturaleza, para bien y para mal.</li></ul>" +
    "<h5>De dónde sale el mal: amor de sí y amor propio</h5>" +
    "<p>Esta es una distinción clave. El <b>amor de sí</b> (<i>amour de soi</i>) es natural y sano: quiero comer, dormir y estar a salvo. El <b>amor propio</b> (<i>amour-propre</i>) nace solo en sociedad, cuando empiezo a <b>compararme</b>: ya no me basta con estar bien, quiero estar <b>mejor que los demás</b>. De ahí vienen la envidia, la vanidad, el afán de dominar y la desigualdad.</p>" +
    ejemplo("Amor de sí frente a amor propio", "Una chica compra unas zapatillas.", [
      "<b>Amor de sí</b>: las compra porque son cómodas y le hacen falta.",
      "<b>Amor propio</b>: las compra porque son las de moda y quiere que la vean con ellas, o porque su vecina no las tiene.",
      "La primera necesidad es natural; la segunda nace de <b>mirarse en los demás</b>."
    ]) +
    "<h5>La historia de la desigualdad según Rousseau</h5>" +
    "<p>Rousseau distingue dos desigualdades: la <b>natural o física</b> (edad, fuerza, salud: viene de la naturaleza y no es injusta) y la <b>moral o política</b> (riqueza, honores, poder: depende de convenciones humanas y es la que critica). Los pasos del cambio son, resumidos:</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Estado de naturaleza</b>: libres, aislados, con amor de sí y compasión.</li>" +
    "<li><b>Primeras sociedades</b>: aparece la comparación (amor propio), el agricultor y el herrero, la <b>división del trabajo</b>.</li>" +
    "<li><b>Propiedad privada</b>: «el primero a quien, habiendo cercado un terreno, se le ocurrió decir <i>esto es mío</i>, y encontró gentes bastante simples para creerle, fue el verdadero fundador de la sociedad civil» (traducción española habitual; varía según la edición). Con la propiedad llegan la riqueza desigual, la rivalidad y la guerra de todos contra todos.</li>" +
    "<li><b>Pacto engañoso</b>: los ricos, amenazados, proponen unas leyes «para todos» que, en realidad, <b>consolidan sus privilegios</b>. Los pobres, sin saberlo, aceptan sus cadenas.</li>" +
    "<li><b>Despotismo</b>: la desigualdad llega al extremo cuando todos son iguales de nuevo, pero en la esclavitud ante un déspota.</li></ol>" +
    ojo("Mucha gente resume a Rousseau con «<b>el hombre es bueno por naturaleza y la sociedad lo corrompe</b>» y el «buen salvaje». La frase vale como idea general, pero cuidado: (1) la expresión «buen salvaje» <b>no la usa Rousseau</b>; (2) <b>no propone volver al bosque</b>: dice que ya no se puede volver atrás; (3) su remedio no es abandonar la sociedad, sino <b>construir una sociedad justa</b> (el contrato social) y una educación adecuada (el <i>Emilio</i>). Un fragmento del <i>Emilio</i> lo resume: «Todo está bien al salir de las manos del Autor de las cosas; todo degenera entre las manos del hombre» (traducción habitual).") +
    w("clasificar", "naturaleza") +
    w("orden", "ordendesigualdad");

  // ---------------------------------------------------------------- 3. Contrato social y voluntad general
  secciones[2] =
    "<h5>El problema que quiere resolver, con sus propias palabras</h5>" +
    "<p>El <i>Contrato social</i> (1762) empieza con una frase que se ha hecho famosa: «El hombre ha nacido libre, y sin embargo, en todas partes se encuentra encadenado» (traducción habitual). El Discurso explicaba <b>cómo</b> llegamos a esas cadenas; el Contrato pregunta <b>cómo podrían hacerse legítimas</b>: ¿existe una forma de vivir bajo leyes sin perder la libertad? Rousseau lo plantea así (paráfrasis de <i>Contrato social</i>, I, 6): hay que encontrar una forma de asociación que proteja a cada miembro con la fuerza de todos y en la que cada uno, uniéndose a todos, <b>no obedezca sino a sí mismo</b> y siga tan libre como antes.</p>" +
    "<h5>El pacto y sus cláusulas</h5>" +
    "<p>La solución es el <b>contrato social</b>. Se reduce a una sola cláusula: <b>cada asociado se entrega por entero, con todos sus derechos, a la comunidad</b>. Y esto tiene tres consecuencias que conviene entender:</p>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Igualdad</b>: como todos se entregan por completo y en las mismas condiciones, nadie tiene interés en hacer las condiciones pesadas para los demás.</li>" +
    "<li><b>Sin superior ajeno</b>: no cedo mis derechos a un rey (Hobbes) ni a una élite, sino a la comunidad de la que yo mismo soy parte. Recibo de ella tanto como entrego.</li>" +
    "<li><b>Un nuevo cuerpo</b>: el pacto crea una persona pública, el <b>pueblo soberano</b> (el Estado cuando es pasivo, el soberano cuando es activo).</li></ol>" +
    "<h5>Tres tipos de libertad</h5>" +
    tabla(["Libertad", "Qué es", "Dónde está"], [
      ["Libertad natural", "Hacer lo que uno puede, limitado solo por su fuerza.", "Estado de naturaleza; se pierde con el pacto."],
      ["Libertad civil", "Vivir bajo leyes que protegen a todos por igual.", "Se gana con el pacto."],
      ["Libertad moral", "Obedecer la ley que uno mismo se ha dado, no el impulso.", "Se gana con el pacto: «la obediencia a la ley que se ha prescrito uno mismo es libertad»."]
    ]) +
    "<h5>La voluntad general, paso a paso</h5>" +
    "<p>Es la idea más difícil y la que más cae. Piensa en una clase que debe elegir el destino del viaje de fin de curso:</p>" +
    ejemplo("Voluntad particular, voluntad de todos y voluntad general", "La clase decide el viaje de fin de curso.", [
      "<b>Voluntad particular</b>: cada alumno piensa en lo que le conviene (uno quiere playa, otro fiesta, otro el más barato).",
      "<b>Voluntad de todos</b>: es la <b>suma</b> de esas preferencias personales; puede salir un viaje que nadie considera justo.",
      "<b>Voluntad general</b>: lo que quiere la clase <b>como grupo</b> pensando en el bien común: que pueda ir todo el mundo, que no deje fuera a nadie por dinero. Cada alumno participa pensando como miembro de la clase, no solo como individuo."
    ]) +
    "<p>Por tanto: la voluntad general <b>mira siempre al bien común</b> y es <b>siempre recta</b> (si se forma bien); no es la mayoría numérica ni un capricho del gobernante. Se expresa en la <b>ley</b>, y la ley, por ser general, debe valer igual para todos y nunca apuntar a una persona concreta. Para que se forme bien, Rousseau pide que los ciudadanos decidan informados, sin grupos de presión que arrastren la votación.</p>" +
    ojo("<b>Confundir voluntad general con voluntad de todos</b> es el error más habitual. La segunda es una suma de intereses privados; la primera es lo que cada uno quiere <b>en cuanto ciudadano</b>, pensando en lo común. También conviene no decir que es «la voluntad de la mayoría»: la mayoría puede equivocarse si vota guiada por intereses particulares.") +
    "<h5>Soberanía popular: dos características que explican su fama</h5>" +
    "<ul><li><b>Inalienable</b>: el pueblo no puede transferir su soberanía a nadie. Puede encargar tareas, pero no renunciar a mandar.</li>" +
    "<li><b>Indivisible</b>: la soberanía no se reparte entre poderes que se oponen (aquí discrepa de Montesquieu y de Locke).</li></ul>" +
    "<p>De ahí que critique la <b>representación</b>: el pueblo inglés, dice, solo es libre durante las elecciones; después vuelve a ser esclavo. Prefiere la democracia directa, adecuada a Estados pequeños (como las ciudades-república). Los gobernantes no son dueños, sino <b>comisionados</b> del pueblo y pueden ser sustituidos.</p>" +
    "<h5>«Forzado a ser libre» sin malentendidos</h5>" +
    "<p>Rousseau escribe que quien rehúse obedecer la voluntad general será «forzado a ser libre». Suena a amenaza, pero la idea es esta: si la ley expresa lo que yo mismo quiero como ciudadano, al obligarme a cumplirla me obligan a ser coherente con mi voluntad racional, no con mi impulso del momento. Críticos posteriores han señalado el <b>riesgo</b>: si alguien se arroga el derecho de decir cuál es la voluntad general, esta puede acabar justificando la presión sobre las minorías. Es un buen punto para una valoración crítica.</p>" +
    "<h5>Rousseau frente a Hobbes y Locke</h5>" +
    tabla(["", "Hobbes (1588–1679)", "Locke (1632–1704)", "Rousseau (1712–1778)"], [
      ["Estado de naturaleza", "guerra de todos contra todos", "libre e igual, con ley natural, pero inseguro", "libre, pacífico y aislado; el mal viene de la sociedad"],
      ["Pacto", "se cede el poder a un soberano absoluto", "se cede a un gobierno limitado para proteger derechos", "se cede a la comunidad entera"],
      ["Soberano", "el monarca", "el Parlamento / el pueblo, con confianza revocable", "el pueblo, inalienable e indivisible"],
      ["Libertad", "obedecer para estar seguro", "derechos individuales frente al poder", "obedecer la ley que uno mismo se ha dado"]
    ]) +
    w("emparejar", "voluntades");

  // ---------------------------------------------------------------- 4. Educación natural
  secciones[3] =
    "<h5>La idea de partida del <i>Emilio</i></h5>" +
    "<p>El <i>Emilio, o De la educación</i> (1762) es una novela pedagógica: sigue la educación de un niño imaginario desde el nacimiento hasta que se casa. Su idea central: si el ser humano es bueno al nacer y la sociedad lo corrompe, la educación debe <b>proteger al niño de los vicios sociales</b> el tiempo suficiente para que desarrolle sus facultades naturales. Por eso la llama <b>educación negativa</b>: no consiste en meter ideas ajenas, sino en <b>evitar que lo dañe</b> lo que lo desvía.</p>" +
    "<h5>Etapas, según el ritmo natural</h5>" +
    tabla(["Edad aprox.", "Qué se trabaja", "Cómo"], [
      ["Hasta 2 años", "Cuerpo y primeras sensaciones", "Libertad de movimiento, sin ataduras ni miedos."],
      ["2–12 años", "Los sentidos y la experiencia", "Aprender haciendo y tocando; que el niño no lea todavía por obligación ni se le razone moralmente."],
      ["12–15 años", "Razón y curiosidad", "Preguntas sobre el mundo, un oficio, cómo funcionan las cosas."],
      ["15–20 años", "Sentimientos, moral y religión", "Convivencia, compasión y la «religión natural»."],
      ["Edad adulta", "Ciudadano", "Elige pareja (Sofía) y se hace miembro de la comunidad."]
    ]) +
    ejemplo("Un ejemplo de método «natural»", "Rousseau prefiere que el niño que rompe una ventana pase una noche de frío, a sermonearlo.", [
      "El niño aprende de las <b>consecuencias</b> de sus actos, no de la autoridad del adulto.",
      "El adulto no castiga ni regaña: <b>prepara el entorno</b> para que aprenda.",
      "Idea de fondo: la libertad se aprende ejerciéndola, no obedeciendo órdenes."
    ]) +
    "<h5>La religión natural y el vicario saboyano</h5>" +
    "<p>En un pasaje famoso del libro IV, <i>Profesión de fe del vicario saboyano</i>, Rousseau defiende una <b>religión natural</b> sin dogmas ni intermediarios: creer en Dios y en la inmortalidad del alma, y encontrar la guía moral en la <b>conciencia</b>, a la que llama «instinto divino». Esto provocó la condena del libro por la Iglesia católica y por los calvinistas de Ginebra, aunque no era ateísmo.</p>" +
    ojo("El <i>Emilio</i> no pide «dejar al niño hacer lo que quiera». Pide <b>respetar el ritmo del desarrollo</b> y que el adulto guíe sin imponer. Y recuerda: Rousseau habla del niño varón; su visión de la educación de Sofía (la mujer) es <b>subordinada</b> y hoy no se defiende. En un comentario, valora lo vigente (respetar etapas, aprender por experiencia) y critica lo caduco.") +
    w("orden", "etapasemilio");

  // ---------------------------------------------------------------- 5. La Ilustración como proyecto
  secciones[4] =
    "<h5>Los grandes rasgos del proyecto ilustrado</h5>" +
    "<ul><li><b>Razón crítica</b>: nada queda a salvo del examen racional (religión, política, costumbres).</li>" +
    "<li><b>Progreso</b>: la historia avanza hacia lo mejor si se extiende el saber.</li>" +
    "<li><b>Tolerancia y libertad de pensamiento</b>: contra el fanatismo y la censura.</li>" +
    "<li><b>Naturaleza y derechos naturales</b>: todos nacemos iguales en dignidad y derechos.</li>" +
    "<li><b>Educación y divulgación</b>: la <i>Enciclopedia</i> (1751–1772) quiso reunir todo el saber para que lo pudiera usar cualquier persona instruida.</li></ul>" +
    "<h5>Cómo encaja Rousseau: acuerdos y desacuerdos</h5>" +
    tabla(["Tema", "Ilustración dominante (Voltaire, Diderot)", "Rousseau"], [
      ["Progreso", "Más saber y civilización, más felicidad.", "Progreso material, pero decadencia moral si no hay justicia."],
      ["Sentimiento y razón", "Prima la razón.", "Reivindica también el sentimiento y la conciencia."],
      ["Política", "Muchos aceptan monarcas ilustrados o una élite.", "Soberanía del pueblo; las leyes las hace la comunidad."],
      ["Religión", "Deísmo crítico o escepticismo.", "Religión natural y sentimiento religioso."],
      ["Base común", "Razón crítica, igualdad de derechos, libertad.", "Comparte los mismos ideales, pero los lleva más lejos."]
    ]) +
    "<h5>La herencia: de las ideas a los hechos</h5>" +
    "<p>La <b>Revolución Francesa de 1789</b> (once años después de su muerte) tomó muchas ideas de este periodo: la <b>Declaración de Derechos del Hombre y del Ciudadano</b> (1789) habla de soberanía nacional y de la ley como «expresión de la voluntad general». También lo recogió el <b>constitucionalismo</b> posterior. Las ideas de Rousseau influyeron en el pensamiento democrático y en Kant (la <b>autonomía</b> moral: darse uno mismo la ley), de quien trata el tema 12.</p>" +
    ojo("Cuidado con las atribuciones: la <b>separación de poderes</b> es de Montesquieu y Locke, no de Rousseau (que defiende una soberanía indivisible); la <b>tolerancia</b> se asocia sobre todo a Voltaire; y el <b>«sapere aude»</b> es de Kant (retomando a Horacio), no de Rousseau.");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Mapa del tema: Rousseau y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y comparar con otro. Con Rousseau, estas son las relaciones más rentables:</p>" +
    tabla(["Autor", "Relación con Rousseau"], [
      ["Platón (T3)", "Ambos buscan una comunidad justa guiada por el bien común; pero Platón confía en los filósofos-reyes y Rousseau en el pueblo soberano."],
      ["Aristóteles (T4)", "Ambos ven al ser humano como social; Aristóteles dice que es político por naturaleza, Rousseau que la sociedad lo transforma (y puede corromperlo)."],
      ["Descartes (T9)", "Confianza en la razón como guía; Rousseau añade el sentimiento y la conciencia como guía moral."],
      ["Locke y Hume (T10)", "Locke comparte el contractualismo pero con gobierno limitado y propiedad como derecho natural; Rousseau critica la propiedad como origen de la desigualdad."],
      ["Kant (T12)", "Toma de Rousseau la idea de autonomía: darse a uno mismo la ley. Resume la Ilustración con el «sapere aude»."],
      ["Marx (T13)", "Comparte la crítica a la propiedad privada y a la desigualdad; Marx la analiza con la economía y la lucha de clases."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Rousseau</h5>" +
    tabla(["Ámbito", "Tesis de Rousseau"], [
      ["Naturaleza humana", "El ser humano natural es libre, amoral, con amor de sí y piedad; es perfectible."],
      ["Crítica", "La civilización genera amor propio, propiedad y desigualdad; las ciencias y las artes no hacen mejores a las personas."],
      ["Política", "Contrato social: cesión a la comunidad; voluntad general, soberanía popular inalienable e indivisible."],
      ["Educación", "Educación negativa y natural, que respeta las etapas del desarrollo."],
      ["Religión", "Religión natural basada en la conciencia."]
    ]) });

  nuevas.push({ h: "7. Comentario de texto resuelto: el problema del contrato", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Rousseau, <em>Del contrato social</em>, libro I, cap. 6; traducción española habitual, que varía levemente según la edición):<br><em>«Encontrar una forma de asociación que defienda y proteja con toda la fuerza común la persona y los bienes de cada asociado, y por la cual cada uno, uniéndose a todos, no obedezca sin embargo sino a sí mismo y permanezca tan libre como antes.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Rousseau (1712–1778), <i>Del contrato social</i> (1762), obra central de su filosofía política. Contexto: Rousseau ha dicho antes que «el hombre ha nacido libre y en todas partes está encadenado», y aquí plantea el <b>problema</b> cuya solución es el contrato.</li>" +
    "<li><b>2. Tema.</b> El problema fundamental de la política: cómo vivir en sociedad, protegidos por la fuerza común, sin perder la libertad.</li>" +
    "<li><b>3. Idea principal.</b> Una asociación política legítima es la que protege a cada miembro y, al mismo tiempo, deja a cada uno tan libre como antes, porque solo obedece a sí mismo.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Forma de asociación»: el contrato social. (b) «Fuerza común»: la fuerza de la comunidad protege a cada uno. (c) «Uniéndose a todos»: el pacto es con la comunidad, no con un gobernante. (d) «No obedezca sino a sí mismo»: las leyes expresan la <b>voluntad general</b>, de la que cada ciudadano participa; así la obediencia es autonomía y se llama libertad civil y moral.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Este problema enlaza con su crítica a la civilización: el <i>Discurso sobre la desigualdad</i> mostró cómo la sociedad real encadena; el contrato propone la sociedad justa. Se apoya en la voluntad general, la soberanía del pueblo y la libertad civil, y se complementa con el <i>Emilio</i>, que forma ciudadanos libres.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Hobbes: para él el pacto cede todo el poder a un soberano absoluto para tener seguridad; para Rousseau se cede a la comunidad y se conserva la libertad. Con Locke: este defiende un gobierno limitado que protege derechos preexistentes; Rousseau pone la soberanía en el pueblo. Con Kant (tema 12): la idea de obedecer la ley que uno se da es la base de su <b>autonomía</b> moral.</li>" +
    "<li><b>7. Valora y concluye.</b> La idea de legitimidad democrática (el poder viene del pueblo) sigue vigente. Su límite: la voluntad general es difícil de determinar en sociedades grandes y plurales, y puede servir para justificar el poder sobre las minorías.</li></ol>" +
    ojo("Errores típicos: (1) decir que el pacto cede los derechos <b>a un rey</b> (eso es Hobbes); (2) confundir voluntad general con <b>mayoría</b> o con suma de intereses; (3) olvidar que el texto habla de <b>libertad</b>, no solo de seguridad; (4) comparar con Hobbes o Locke sin decir en qué se diferencian.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica la crítica de Rousseau a la civilización", "Respuesta modelo:", [
      "<b>Punto de partida.</b> Estado de naturaleza como hipótesis: ser humano libre, con amor de sí y piedad.",
      "<b>Crítica.</b> La sociedad produce amor propio, comparación, propiedad privada y desigualdad moral y política.",
      "<b>Discurso de 1750.</b> Las ciencias y las artes no mejoran las costumbres.",
      "<b>Matiz.</b> No propone volver a la naturaleza, sino una sociedad justa (el contrato).",
      "<b>Relación.</b> Es la paradoja de un ilustrado que critica el progreso."
    ]) +
    ejemplo("Pregunta 2. Explica el contrato social y la voluntad general", "Respuesta modelo:", [
      "<b>Problema.</b> Cómo vivir en sociedad sin perder la libertad.",
      "<b>Pacto.</b> Cada uno se entrega a la comunidad entera, no a un gobernante.",
      "<b>Voluntad general.</b> Lo que quiere la comunidad pensando en el bien común, distinta de la voluntad de todos (suma de intereses).",
      "<b>Soberanía.</b> Del pueblo; inalienable e indivisible.",
      "<b>Comparación.</b> Con Hobbes (soberano absoluto) o Locke (gobierno limitado)."
    ]) +
    ejemplo("Pregunta 3. El <i>Emilio</i> y la educación natural", "Respuesta modelo:", [
      "<b>Idea.</b> Si el niño nace bueno, hay que protegerlo de la corrupción social.",
      "<b>Educación negativa.</b> Respetar las etapas y el ritmo; aprender por la experiencia.",
      "<b>Religión natural.</b> Conciencia como guía moral.",
      "<b>Valoración.</b> Influencia en la pedagogía moderna; límites en su visión de la mujer."
    ]) +
    ejemplo("Pregunta 4. La Ilustración", "Respuesta modelo:", [
      "<b>Definición.</b> Siglo XVIII: confianza en la razón crítica y el progreso.",
      "<b>Lema.</b> «Sapere aude» (Kant, 1784): salir de la minoría de edad.",
      "<b>Proyecto.</b> Enciclopedia, tolerancia, derechos naturales, educación.",
      "<b>Rousseau.</b> Comparte los ideales pero cuestiona que el progreso mejore moralmente."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf11a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
