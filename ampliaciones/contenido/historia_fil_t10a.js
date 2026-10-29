/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 10: El empirismo (Locke y Hume)
   (parte A: teoría. Parte B, historia_fil_t10b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Empirismo frente a racionalismo: no hay ideas innatas; la mente parte «en blanco» → secciones 1 y 2 + tabla.
   2. Sensación y reflexión (Locke), e ideas simples/complejas; la reflexión también depende de la sensación → sección 2 y 3.
   3. Cualidades primarias y secundarias (qué está en el objeto y qué depende de nosotros) → sección 3 + clasificar.
   4. Impresiones e ideas (Hume): la diferencia es de intensidad; principio de copia y matiz de azul → sección 4 + widget filo_hume.
   5. Relaciones de ideas frente a cuestiones de hecho (el «tenedor» de Hume) → sección 4 + emparejar.
   6. Crítica a la causalidad: nunca vemos la «conexión necesaria»; es hábito → sección 5 (bolas de billar) + widget.
   7. El problema de la inducción: el futuro no está garantizado por el pasado → sección 5 + ejercicios.
   8. Crítica al yo y a la sustancia (haz de percepciones) frente al cogito de Descartes → sección nueva 7.
   9. Emotivismo/sentimentalismo moral: la razón no mueve a actuar; ley de Hume (de «es» a «debe») → sección nueva 8.
   10. Locke político: derechos naturales, propiedad por el trabajo, contrato, poder limitado y resistencia, tolerancia → sección nueva 6.
   11. Comentario de texto: Hume sobre el yo (Tratado I, iv, 6) → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t10/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Racionalismo frente a empirismo
  secciones[0] =
    "<h5>Dos respuestas a la misma pregunta</h5>" +
    "<p>En el siglo XVII los filósofos se preguntan: <b>¿de dónde sale lo que sabemos?</b> Descartes (1596–1650, tema 9) responde: de la <b>razón</b>, que posee ideas innatas (el yo, Dios, las verdades matemáticas) y puede construir la ciencia casi sin salir de su cabeza. En Inglaterra, al otro lado del Canal, <b>Locke</b> (1632–1704) y <b>Hume</b> (1711–1776) responden lo contrario: <b>de la experiencia</b>. Nadie nace sabiendo nada; todo lo que pensamos ha entrado antes por los sentidos o por la observación de nuestra propia mente.</p>" +
    tabla(["", "Racionalismo (Descartes)", "Empirismo (Locke, Hume)"], [
      ["Origen del conocimiento", "La razón", "La experiencia"],
      ["Ideas innatas", "Sí (yo, Dios, extensión)", "No: la mente nace «en blanco»"],
      ["Modelo de ciencia", "Las matemáticas: deducir", "La observación: inducir"],
      ["Confianza en la razón", "Muy alta", "Moderada (en Hume, muy limitada)"],
      ["Método", "Deducción desde ideas evidentes", "Observación y generalización"]
    ]) +
    "<p>Una imagen cotidiana: el racionalista es como quien cree que dentro de su cabeza ya viene instalado un programa de fábrica; el empirista, como quien piensa que el móvil sale vacío y todo lo que contiene lo ha ido descargando él después.</p>" +
    ojo("«Empirismo» no significa «solo vale lo que se ve». Significa que <b>todo material del pensamiento viene de la experiencia</b>. Los empiristas también razonan; lo que discuten es de dónde sacan sus ideas las razones.") +
    "<h5>Contexto histórico</h5>" +
    "<p>Es la Inglaterra de la <b>revolución científica</b> (Newton, 1643–1727, trabajaba por esas décadas) y de las <b>revoluciones políticas</b>: la Revolución Gloriosa de 1688 limita el poder del rey y da el poder al Parlamento. Los empiristas quieren una filosofía modesta, que sirva a la ciencia y que respete la libertad de las personas.</p>";

  // ---------------------------------------------------------------- 2. Locke: la mente como tabula rasa
  secciones[1] =
    "<h5>Quién fue John Locke</h5>" +
    "<p>Nació en Wrington (Inglaterra) en 1632 y murió en Oates en 1704. Estudió en Oxford, se formó también como <b>médico</b> y fue secretario y consejero del político lord Shaftesbury. Por motivos políticos tuvo que exiliarse en Holanda (1683–1689) y volvió a Inglaterra tras la Revolución Gloriosa. Sus obras principales se publican ya en la madurez: la <i>Carta sobre la tolerancia</i> (1689), los <i>Dos tratados sobre el gobierno civil</i> (1689, fechados en 1690) y el <i>Ensayo sobre el entendimiento humano</i> (1690).</p>" +
    "<h5>Contra las ideas innatas: los argumentos de Locke</h5>" +
    "<p>El Libro I del <i>Ensayo</i> ataca la idea de que traemos principios grabados desde el nacimiento. Sus razones son fáciles de recordar:</p>" +
    "<ul><li><b>No hay consenso universal.</b> Si ciertos principios fueran innatos, todo el mundo los conocería. Pero los niños pequeños y las personas sin formación no saben enunciar «lo que es, es», ni «es imposible que algo sea y no sea a la vez».</li>" +
    "<li><b>Las ideas morales y religiosas varían</b> de un pueblo a otro. Lo que unos consideran un deber otros lo consideran un crimen; la idea de Dios tampoco es igual en todas partes.</li>" +
    "<li><b>Lo innato no se aprende:</b> si estuviera en la mente desde siempre, no haría falta descubrirlo con esfuerzo, y sin embargo lo descubrimos al crecer.</li></ul>" +
    "<p>Para Locke, la mente al nacer es un <b>«papel en blanco»</b> (<i>tabula rasa</i>, «tabla rasa»: una tablilla de cera sin escritura). La experiencia es lo que escribe en ella.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (John Locke, <em>Ensayo sobre el entendimiento humano</em>, libro II, cap. 1; traducción habitual, que varía según la edición):<br><em>«Supongamos, pues, que la mente es, como se dice, un papel en blanco, vacío de todo carácter, sin ninguna idea. ¿Cómo llega a tenerlas? [...] A esto respondo con una sola palabra: de la experiencia.»</em></blockquote>" +
    "<h5>Las dos fuentes de la experiencia</h5>" +
    tabla(["Fuente", "Qué es", "Ejemplo"], [
      ["<b>Sensación</b>", "La experiencia del mundo exterior a través de los sentidos", "Ver el rojo de una manzana; notar el frío de la nieve"],
      ["<b>Reflexión</b>", "La observación de las operaciones de nuestra propia mente", "Darte cuenta de que dudas, recuerdas o quieres algo"]
    ]) +
    "<p>Ojo con la reflexión: <b>no es una fuente independiente</b>. Para poder reflexionar sobre «dudar» o «recordar», antes tiene que haber habido sensaciones sobre las que dudar o que recordar. Por eso Locke sigue siendo empirista sin ninguna ambigüedad.</p>" +
    ejemplo("¿Y la idea de «Dios»? ¿No será innata?", "Locke responde que tampoco: la formamos nosotros a partir de experiencias.", [
      "Partimos de ideas simples de la reflexión: existencia, conocimiento, poder.",
      "Las <b>ampliamos sin límite</b> en la imaginación: un poder infinito, un saber infinito.",
      "Resultado: una idea compleja de «Dios», construida a partir de la experiencia, no recibida de fábrica."
    ]);

  // ---------------------------------------------------------------- 3. Ideas simples y complejas, cualidades
  secciones[2] =
    "<h5>La mente recibe y la mente construye</h5>" +
    "<p>Locke distingue dos momentos. Ante las <b>ideas simples</b> la mente es <b>pasiva</b>: no puede inventarlas ni destruirlas, solo recibirlas (no puedes decidir ver «rojo» cuando miras algo rojo). Con ellas, sin embargo, trabaja <b>activamente</b> para formar las <b>ideas complejas</b> mediante tres operaciones: <b>combinar</b>, <b>comparar</b> (para obtener ideas de relaciones) y <b>abstraer</b> (separar lo común para formar ideas generales).</p>" +
    tabla(["Tipo de idea compleja", "Qué es", "Ejemplo"], [
      ["<b>Modos</b>", "Combinaciones que no existen por sí mismas", "Belleza, gratitud, un «tres»"],
      ["<b>Sustancias</b>", "Conjuntos de ideas simples que suponemos que van juntas en una cosa", "Oro, hombre, manzana"],
      ["<b>Relaciones</b>", "Lo que resulta de comparar dos ideas", "Causa y efecto, mayor que, padre de"]
    ]) +
    "<h5>La sustancia: «algo, no sé qué»</h5>" +
    "<p>Cuando percibimos una manzana percibimos color, forma, sabor y textura, pero no «la manzana en sí». Suponemos que debe existir <b>algo que sostiene</b> esas cualidades. Locke lo llama <b>sustancia</b>, y reconoce honestamente que su idea es muy oscura: es «un no sé qué» que imaginamos debajo de las cualidades. Aquí deja abierta una grieta que Hume ensanchará.</p>" +
    "<h5>Cualidades primarias y secundarias</h5>" +
    "<p>Locke adopta el modelo de la nueva ciencia (Galileo, Boyle, Newton): el mundo físico es materia en movimiento. Así que separa dos clases de cualidades:</p>" +
    tabla(["", "Cualidades primarias", "Cualidades secundarias"], [
      ["Ejemplos", "Extensión, figura, solidez, número, movimiento o reposo", "Color, sonido, sabor, olor, calor percibido"],
      ["¿Están en el objeto?", "Sí, tal como las percibimos", "No tal como las percibimos: son <i>poderes</i> del objeto para producir sensaciones en nosotros"],
      ["¿Dependen del observador?", "No", "En parte sí (de nuestros sentidos)"],
      ["Se parecen al objeto", "La idea se parece a la cualidad", "La idea no se parece a lo que la produce"]
    ]) +
    "<p>Un ejemplo de Locke: si metes una mano muy fría y otra muy caliente en el mismo agua tibia, el agua te parece caliente a una y fría a la otra. El calor percibido depende de quien lo siente; en cambio, que el agua ocupe un volumen no cambia según quién la toque.</p>" +
    ojo("«Secundaria» <b>no</b> significa «falsa» ni «de menos importancia». Significa que la sensación de color está producida por el objeto <i>y</i> por nuestros órganos. Un daltónico y tú ven colores distintos del mismo objeto; los dos medís lo mismo con un metro.") +
    w("clasificar", "cualidades");

  // ---------------------------------------------------------------- 4. Hume: impresiones e ideas
  secciones[3] =
    "<h5>Quién fue David Hume</h5>" +
    "<p>Nació en Edimburgo (Escocia) en 1711 y murió allí en 1776. Estudió derecho sin ganas y se dedicó a la filosofía. Entre 1735 y 1737 vivió en <b>La Flèche</b> (Francia), en la misma ciudad donde estudió Descartes, y allí escribió su <i>Tratado de la naturaleza humana</i> (1739–1740) con apenas 28 años. El libro pasó sin pena ni gloria (él mismo dijo que «salió muerto de la imprenta»), así que lo reescribió, más corto y claro, en la <i>Investigación sobre el entendimiento humano</i> (1748) y la <i>Investigación sobre los principios de la moral</i> (1751). Fue también historiador (<i>Historia de Inglaterra</i>) y ensayista, y sus <i>Diálogos sobre la religión natural</i> se publicaron tras su muerte, en 1779.</p>" +
    "<h5>Todo lo que hay en la mente son percepciones</h5>" +
    "<p>Hume llama <b>percepciones</b> a todo lo que está presente en la mente, y las divide en dos clases según su <b>intensidad</b> (fuerza y viveza):</p>" +
    tabla(["", "Impresiones", "Ideas"], [
      ["Qué son", "Percepciones vivas y directas: sentir, ver, amar, odiar", "Copias débiles de impresiones: recordar o imaginar"],
      ["Intensidad", "Fuerte", "Débil"],
      ["Ejemplo", "Quemarte la mano con la sartén", "Recordar mañana esa quemadura"],
      ["Subtipos", "De sensación (externas) y de reflexión (pasiones, emociones)", "Simples y complejas"]
    ]) +
    "<p>Fíjate en la diferencia con Locke: Locke llamaba «idea» a todo contenido de la mente; Hume reserva «idea» para el pensamiento débil, y llama «impresión» a lo vivo. La diferencia entre las dos es <b>solo de grado</b>: la idea de dolor no duele como el dolor.</p>" +
    "<h5>El principio de copia</h5>" +
    "<p>La tesis central: <b>toda idea simple procede de una impresión previa y se parece a ella</b>. Es un test para detectar palabras vacías: ante una idea sospechosa, hay que preguntarse <b>«¿de qué impresión viene?»</b>. Si no se encuentra ninguna, la idea es una palabra sin contenido. Es una especie de «control de aduana» para los conceptos.</p>" +
    ejemplo("¿Y si nunca hemos visto un color?", "Hume propone un caso curioso: el «matiz de azul que falta».", [
      "Imagina a alguien que ha visto todos los tonos de azul menos uno, y se le muestran en orden.",
      "Hume piensa que esa persona <b>podría</b> imaginar el tono ausente, rellenando el hueco entre sus vecinos.",
      "Él mismo admite que es una <b>excepción</b> y que no basta para derribar la regla general: casi todas las ideas siguen viniendo de impresiones."
    ]) +
    "<h5>Cómo se enlazan las ideas: la asociación</h5>" +
    "<p>La imaginación puede combinar ideas libremente (un unicornio), pero normalmente las enlaza siguiendo tres principios de asociación: <b>semejanza</b> (un retrato nos recuerda a la persona), <b>contigüidad</b> en el espacio o el tiempo (pensar en una casa nos lleva a pensar en su vecina) y <b>causa y efecto</b>. Hume compara estos principios con la <i>gravedad</i> de la mente: son la fuerza que une unas ideas con otras.</p>" +
    "<h5>Relaciones de ideas y cuestiones de hecho</h5>" +
    "<p>En la <i>Investigación</i>, Hume reparte todo el conocimiento en dos grandes cajones (a veces llamados su «tenedor»):</p>" +
    tabla(["", "Relaciones de ideas", "Cuestiones de hecho"], [
      ["Ejemplos", "«2 + 2 = 4»; «un triángulo tiene tres lados»", "«El sol saldrá mañana»; «hoy llueve en Madrid»"],
      ["Cómo se conocen", "Solo pensando (a priori)", "Por experiencia (a posteriori)"],
      ["Su contrario", "Es una contradicción", "Es posible, no contradice nada"],
      ["Certeza", "Necesaria y segura", "Probable, nunca absolutamente segura"],
      ["Ciencias", "Matemáticas, lógica", "Física, historia, vida diaria"]
    ]) +
    "<p>¿Cómo comprobar en qué cajón está una frase? Intenta negarla. «Dos más dos no son cuatro» se contradice a sí misma. «Mañana no saldrá el sol» es falsa, seguramente, pero <b>no es una contradicción</b>: puedo imaginarlo sin absurdo. Por eso las cuestiones de hecho nunca son necesarias.</p>" +
    w("filo_hume");

  // ---------------------------------------------------------------- 5. La causalidad
  secciones[4] =
    "<h5>La mejor ilustración: dos bolas de billar</h5>" +
    "<p>Hume usa un caso muy cotidiano. Una bola blanca avanza y choca con una bola roja, y la roja sale despedida. Todos decimos: «la blanca <i>causó</i> el movimiento de la roja». Pero ¿qué hemos <b>visto</b> en realidad?</p>" +
    "<ol class='lam-pasos'><li><b>Contigüidad:</b> la blanca toca a la roja (están juntas en el espacio y en el tiempo).</li>" +
    "<li><b>Prioridad temporal:</b> el movimiento de la blanca viene antes que el de la roja.</li>" +
    "<li><b>Conjunción constante:</b> siempre que hemos visto un choque así, ha pasado lo mismo.</li></ol>" +
    "<p>Eso es todo lo que vemos. Lo que <b>no</b> vemos, aunque lo afirmemos, es la «fuerza» o «conexión necesaria» que obligaría a la roja a moverse. Por mucho que mires, nunca ves el «tiene que». Y si el origen de toda idea es una impresión, la idea de «conexión necesaria» no puede venir de lo que los sentidos nos muestran en las bolas.</p>" +
    "<h5>Entonces, ¿de dónde sale la idea de causa?</h5>" +
    "<p>De nosotros mismos. Tras ver muchas veces que a un suceso A sigue un suceso B, la imaginación se <b>acostumbra</b>: cuando aparece A, nuestra mente espera B. Esa expectativa es una impresión interna (una especie de sentimiento), y la <b>proyectamos</b> sobre las cosas como si fuera una necesidad del mundo. La conexión necesaria no está en las bolas: está en la <b>costumbre o hábito</b> de quien las mira.</p>" +
    ejemplo("Un ejemplo de tu vida", "Cada día pulsas el interruptor y se enciende la luz.", [
      "Observas contigüidad (la luz se enciende al pulsar), prioridad (primero pulsas) y conjunción constante (siempre).",
      "Nunca observas el «tiene que encenderse»; lo que tienes es una <b>expectativa fuerte</b> creada por la repetición.",
      "El día que salta el fusible, no te contradices con nada que hayas visto: solo se rompe una expectativa."
    ]) +
    "<h5>El problema de la inducción</h5>" +
    "<p>La <b>inducción</b> es el razonamiento que generaliza desde casos observados («todos los cuervos que he visto son negros») a casos no observados («todos los cuervos lo son»; «mañana saldrá el sol»). Es la base de toda la ciencia experimental. Hume pregunta: <b>¿qué la justifica?</b></p>" +
    "<ul><li>No puede justificarla la <b>lógica</b>: lo contrario del futuro no es una contradicción (es una cuestión de hecho).</li>" +
    "<li>Tampoco la <b>experiencia</b>: decir «la naturaleza ha sido uniforme hasta ahora, así que lo seguirá siendo» usa la inducción para justificar la inducción. Es un <b>círculo</b>.</li></ul>" +
    "<p>Conclusión de Hume: lo que nos hace creer que el futuro se parecerá al pasado no es una razón, sino el <b>hábito</b>. No es un motivo para dejar de hacer ciencia ni para dejar de comer por miedo a no vivir mañana: Hume era un hombre muy práctico. Es un aviso de que nuestro conocimiento de los hechos es <b>probable</b>, nunca absolutamente cierto. La filosofía de la ciencia sigue discutiendo este problema hoy.</p>" +
    ojo("Hume <b>no niega</b> que existan causas ni que la ciencia funcione. Lo que niega es que podamos <b>demostrar</b> racionalmente o <b>ver</b> la necesidad que unimos a ellas. Es una crítica sobre el <i>origen y la justificación</i> de la idea, no una negación del mundo.");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Locke: conocimiento, política y tolerancia", html:
    "<h5>Los grados del conocimiento</h5>" +
    "<p>Para Locke, conocer es percibir el <b>acuerdo o desacuerdo entre ideas</b>. Hay tres grados, de más a menos seguro:</p>" +
    tabla(["Grado", "Cómo se conoce", "Ejemplo"], [
      ["<b>Intuitivo</b>", "De golpe, sin pruebas", "Que existo yo; que blanco no es negro"],
      ["<b>Demostrativo</b>", "Con una cadena de razonamientos", "Que Dios existe (según Locke)"],
      ["<b>Sensitivo</b>", "Con los sentidos, para las cosas presentes", "Que hay un árbol delante de mí"]
    ]) +
    "<p>Fuera de estos límites solo hay <b>probabilidad</b> y creencia razonable. Locke es modesto: la mente humana no puede conocerlo todo, y hay que contentarse con saber lo suficiente para vivir y actuar.</p>" +
    "<h5>El estado de naturaleza y los derechos naturales</h5>" +
    "<p>En los <i>Dos tratados sobre el gobierno civil</i>, el primero refuta a Filmer, que defendía que el rey recibe su poder de Adán, y el segundo expone su propia teoría. Locke imagina cómo viviríamos <b>sin gobierno</b>, en el <b>estado de naturaleza</b>. A diferencia de Hobbes (1588–1679), que lo pintaba como una guerra de todos contra todos, para Locke es un estado de <b>libertad e igualdad</b> regido por una <b>ley natural</b>, que la razón descubre y que dice que nadie debe dañar a otro en su <b>vida, libertad y bienes</b>. Estos son los <b>derechos naturales</b>: no los concede nadie, se tienen por ser persona.</p>" +
    "<h5>La propiedad: el trabajo</h5>" +
    "<p>Si la tierra es de todos, ¿cómo se hace algo mío? Respuesta de Locke: <b>con el trabajo</b>. Cada uno es dueño de su propio cuerpo y, por tanto, de su trabajo; al mezclar tu trabajo con algo (recoger bellotas, cultivar un campo), lo incorporas a lo tuyo. Pero impone dos <b>límites</b>:</p>" +
    "<ul><li>No se puede acumular más de lo que se puede <b>usar antes de que se estropee</b>.</li>" +
    "<li>Debe quedar <b>suficiente y de igual calidad</b> para los demás.</li></ul>" +
    "<p>La invención del <b>dinero</b>, que no se estropea, permite acumular sin desperdicio, y por eso aparecen las grandes desigualdades. Locke admite este paso como consentido por la gente.</p>" +
    ejemplo("La manzana de Locke", "Un grupo recoge manzanas de árboles que no son de nadie.", [
      "La manzana que <b>recoges</b> con tu esfuerzo pasa a ser tuya: has puesto tu trabajo en ella.",
      "Si recoges tantas que se pudren sin que las puedas comer ni dar, <b>has cogido de más</b>: sobra e incumples el primer límite.",
      "Y si dejas el huerto pelado, incumples el segundo: ya no queda «suficiente y tan bueno» para los demás."
    ]) +
    "<h5>El contrato social y el gobierno limitado</h5>" +
    "<p>El estado de naturaleza tiene un inconveniente: <b>falta un juez imparcial</b>. Cada cual juzga y castiga su propio caso, y eso produce conflictos. Por eso las personas, libremente, firman un <b>pacto o contrato</b> mediante el cual crean la sociedad civil y un gobierno, que sirva para <b>proteger los derechos naturales</b> (sobre todo la propiedad en sentido amplio). Rasgos clave:</p>" +
    "<ul><li><b>Consentimiento</b>: el poder político es legítimo solo si descansa en el acuerdo de los gobernados. Las decisiones se toman por <b>mayoría</b>.</li>" +
    "<li><b>El gobierno es una confianza</b> (en inglés <i>trust</i>): recibe un encargo del pueblo, no es dueño de él.</li>" +
    "<li><b>División de poderes</b>: legislativo (el supremo, representa al pueblo), ejecutivo (aplica las leyes) y federativo (relaciones exteriores). Esta idea influirá en Montesquieu.</li>" +
    "<li><b>Derecho de resistencia</b>: si el gobierno viola los derechos que debía proteger, deja de ser legítimo y el pueblo puede resistirse y cambiarlo.</li></ul>" +
    tabla(["", "Hobbes (1588–1679)", "Locke (1632–1704)"], [
      ["Estado de naturaleza", "Guerra de todos contra todos", "Libertad e igualdad con ley natural, pero sin juez"],
      ["Para qué se hace el pacto", "Salvar la vida y tener paz", "Proteger los derechos naturales"],
      ["Poder del gobierno", "Absoluto", "Limitado, revocable"],
      ["Resistencia", "No", "Sí, si el gobierno abusa"]
    ]) +
    "<h5>La tolerancia</h5>" +
    "<p>En la <i>Carta sobre la tolerancia</i>, Locke defiende la <b>separación entre Iglesia y Estado</b>: la tarea del Estado es proteger los bienes civiles, y la fe no se puede imponer por la fuerza (nadie cree solo porque le obliguen). Por eso las distintas confesiones deben ser toleradas. Él mismo pone límites que hoy nos sorprenden: excluye a los ateos (porque, según él, no se puede fiar de sus promesas) y a quienes obedecen a un poder extranjero. Es un buen recordatorio de que los clásicos hay que valorarlos con ojo crítico.</p>" +
    ojo("Locke da a los <b>derechos naturales</b> un papel que Hobbes no les da: son <b>anteriores al Estado</b> y le ponen un límite. Por eso Locke es el gran punto de partida del <b>liberalismo</b>, y sus ideas aparecen en la Declaración de Independencia de Estados Unidos (1776)." ) +
    w("emparejar", "contrato") });

  nuevas.push({ h: "7. Hume: el yo y la sustancia", html:
    "<p>Si la idea de causa no sale de una impresión, ¿qué pasa con la idea de «yo»? Descartes (tema 9) estaba seguro: «pienso, luego existo», y lo que existe es una <b>sustancia pensante</b>. Hume aplica su test: <b>¿de qué impresión viene la idea de un yo?</b></p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (David Hume, <em>Tratado de la naturaleza humana</em>, libro I, parte IV, sección 6; paráfrasis cercana a la traducción habitual):<br><em>«Cuando penetro más íntimamente en lo que llamo mi yo, tropiezo siempre con una percepción particular u otra, de calor o frío, de luz o sombra, de amor u odio, de dolor o placer. Nunca puedo atraparme a mí mismo sin una percepción, y nunca puedo observar nada más que la percepción.»</em></blockquote>" +
    "<h5>Qué concluye</h5>" +
    "<ul><li>Introspección: miro dentro y solo encuentro <b>percepciones sueltas</b>, nunca un «yo» aparte de ellas.</li>" +
    "<li>Una impresión de un yo fijo tendría que ser <b>constante</b> durante toda la vida, y no hay ninguna impresión constante: todas pasan.</li>" +
    "<li>Así que la idea de un yo-sustancia no tiene impresión de origen. El yo es un <b>haz o colección de percepciones</b> que se suceden con enorme rapidez y están en perpetuo flujo.</li></ul>" +
    "<p>Hume ofrece una comparación: la mente se parece a un teatro donde las percepciones aparecen, pasan y se mezclan. Pero añade que la comparación puede engañar, porque no hay «un lugar» ni un escenario permanente: solo las escenas.</p>" +
    "<h5>¿Y por qué creemos que somos el mismo?</h5>" +
    "<p>Porque la <b>imaginación</b> enlaza las percepciones por semejanza y causalidad, y la <b>memoria</b> nos las muestra encadenadas. Tu yo es como un río o una república: algo que mantiene un nombre y una continuidad aunque todas sus partes cambien. La identidad personal es una <b>ficción útil</b> de la imaginación, no una sustancia que descubramos.</p>" +
    tabla(["", "Descartes (tema 9)", "Hume"], [
      ["¿Qué es el yo?", "Sustancia pensante, evidente", "Haz de percepciones"],
      ["Conocimiento del yo", "Intuición clara y distinta", "No hay impresión del yo"],
      ["Identidad personal", "Un yo permanente", "Ficción de la imaginación y la memoria"]
    ]) +
    "<h5>Sustancia, Dios y milagros</h5>" +
    "<p>La misma crítica vale para la <b>sustancia material</b>: de una manzana solo percibimos cualidades; la idea de un soporte detrás es otra palabra sin impresión. De ahí un <b>escepticismo moderado</b>: Hume no duda de todo, pero no admite pretensiones de saber que superen la experiencia. En el último capítulo de la <i>Investigación</i> propone una prueba radical: de un libro de metafísica hay que preguntar si contiene razonamientos sobre cantidad o número (relaciones de ideas) o razonamientos sobre hechos basados en la experiencia; si no contiene ninguno de los dos, «arrójese a las llamas», porque solo puede contener sofistería e ilusión. Y en la sección sobre los <b>milagros</b> sostiene que el testimonio humano nunca basta para creer algo que contradice la experiencia constante.</p>" +
    ojo("Hume <b>no dice</b> que el yo no exista ni que no haya personas. Dice que no tenemos una <b>impresión</b> de un yo fijo, y que lo que existe es una sucesión de percepciones enlazadas. Es una crítica a la <i>sustancia</i>, no a la vida diaria.") });

  nuevas.push({ h: "8. Hume: la moral y la política", html:
    "<h5>La razón no mueve a actuar</h5>" +
    "<p>Hume sostiene en el <i>Tratado</i> que la razón por sí sola no mueve a nadie a actuar: solo compara ideas o comprueba hechos. Lo que nos pone en marcha son las <b>pasiones</b> (deseos, emociones). La frase famosa (traducción habitual) dice que la razón «es, y debe ser, solo la esclava de las pasiones». Quiere decir que la razón dice <i>cómo</i> alcanzar un fin, pero el fin lo pone un sentimiento.</p>" +
    "<h5>El origen de la moral: el sentimiento</h5>" +
    "<p>Por tanto, distinguir el bien del mal no puede ser obra de la razón. Piensa en una acción mala, el asesinato. Si examinas el hecho (quién, cuándo, con qué arma) no encuentras ahí una propiedad llamada «maldad»; lo que encuentras, mirando dentro de ti, es un <b>sentimiento de desaprobación</b>. Así que «esto es malo» expresa una reacción de nuestra sensibilidad, no una verdad descubierta por la razón. Esta postura se suele llamar <b>sentimentalismo moral</b>, y en el siglo XX, <b>emotivismo</b>.</p>" +
    tabla(["", "Racionalismo moral", "Hume"], [
      ["Fuente del juicio moral", "La razón", "El sentimiento de aprobación o rechazo"],
      ["«Esto es bueno» dice…", "Una verdad objetiva", "Una reacción de nuestra sensibilidad"],
      ["Motivo para actuar", "La razón", "La pasión"]
    ]) +
    "<p>¿Y por qué compartimos juicios morales, si cada uno tiene sus sentimientos? Por la <b>simpatía</b>: tendemos a sentir con los demás y a ponernos en su lugar, y eso hace que aprobemos lo que es <b>útil o agradable</b> para nosotros mismos y para los demás. Las virtudes son las cualidades que tienen estas ventajas.</p>" +
    "<h5>La «ley de Hume»: de «es» a «debe»</h5>" +
    "<p>En una página muy citada del <i>Tratado</i> (libro III, parte I, sección 1), Hume observa que muchos autores empiezan hablando con «es» y «no es» y, de repente, pasan a «debe» y «no debe» sin explicar cómo. Una conclusión sobre <b>lo que debe ser</b> no puede salir solo de premisas sobre <b>lo que es</b>. Es una advertencia lógica que se llama a veces la <b>ley de Hume</b> o «guillotina de Hume».</p>" +
    ejemplo("¿Qué hay de malo en este razonamiento?", "«Los humanos siempre han hecho la guerra; por tanto, debemos hacer la guerra.»", [
      "Premisa: un <b>hecho</b> (lo que es: siempre se ha hecho).",
      "Conclusión: un <b>deber</b> (lo que debe ser).",
      "Falta una premisa moral («lo que siempre se hizo se debe hacer») que no sale de ningún hecho: ese es el salto que Hume señala."
    ]) +
    "<h5>Política: sin contrato, por utilidad</h5>" +
    "<p>En su ensayo «Del contrato original», Hume critica a Locke: nadie ha firmado nunca ningún pacto; los gobiernos han nacido de la <b>fuerza y de la costumbre</b>, y si les obedecemos es porque el orden social nos resulta <b>útil</b>, no porque hayamos consentido. Con esto lleva su empirismo también a la política. Su respuesta a la pregunta «¿por qué obedecer?» es la <b>utilidad</b>, no el contrato.</p>" +
    ojo("No confundas: Locke defiende que la autoridad nace de un <b>pacto</b>; Hume piensa que el pacto es una <b>ficción</b> y que lo que mantiene el orden es el hábito y la utilidad. Y recuerda: es Locke quien hace que el poder político sea revocable.") });

  nuevas.push({ h: "9. Mapa del tema: Locke, Hume y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y comparar con otro. Con Locke y Hume, estas son las relaciones más rentables:</p>" +
    tabla(["Con…", "Locke", "Hume"], [
      ["<b>Descartes</b> (1596–1650)", "Sin ideas innatas; mente en blanco", "Sin yo-sustancia; el cogito no prueba una sustancia; la razón es limitada"],
      ["<b>Platón</b>", "Rechaza el innatismo y la anamnesis", "Las ideas son copias de impresiones, no recuerdos de Ideas"],
      ["<b>Aristóteles</b>", "Comparte el origen sensible del conocimiento (la máxima escolástica de tradición aristotélica: «nada hay en el entendimiento que no haya estado antes en los sentidos»)", "Critica las causas y la sustancia"],
      ["<b>Hobbes</b>", "Contrato con derechos naturales y poder limitado", "Sustituye el contrato por la utilidad"],
      ["<b>Kant</b> (1724–1804, tema 12)", "El entendimiento no es «papel en blanco»: pone formas", "Despertó a Kant de su «sueño dogmático»; Kant intenta salvar la causalidad como categoría"],
      ["<b>Rousseau</b> (tema 11)", "Contrato y consentimiento, con gobierno limitado", "Ambos dan peso al sentimiento en la moral; Rousseau lo une a la soberanía popular"]
    ]) +
    "<p>Una frase para recordar la herencia: <b>Locke</b> abre el camino del empirismo y del liberalismo político; <b>Hume</b> lo lleva al límite (no hay causalidad demostrable, ni yo sustancial, ni moral racional) y despierta a Kant.</p>" +
    "<h5>Mapa mental en una línea</h5>" +
    "<ol class='lam-pasos'><li><b>Experiencia</b> como fuente (Locke: sensación y reflexión).</li>" +
    "<li><b>Ideas</b> simples y complejas (Locke) o impresiones e ideas (Hume).</li>" +
    "<li><b>Límites</b>: sustancia oscura (Locke) → crítica de causa, yo y Dios (Hume).</li>" +
    "<li><b>Ser humano y sociedad</b>: derechos y contrato (Locke) → sentimiento y utilidad (Hume).</li></ol>" });

  nuevas.push({ h: "10. Comentario de texto resuelto: Hume y el yo", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (David Hume, <em>Tratado de la naturaleza humana</em>, I, IV, 6; paráfrasis cercana a la traducción habitual):<br><em>«Por mi parte, cuando penetro más íntimamente en lo que llamo mi yo, siempre tropiezo con una percepción particular u otra, de calor o frío, de luz o sombra, de amor u odio, de dolor o placer. Nunca puedo atraparme a mí mismo sin una percepción, y nunca puedo observar nada más que la percepción.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> David Hume (1711–1776), filósofo empirista escocés; <i>Tratado de la naturaleza humana</i> (1739–1740), su primera obra, escrita con unos 28 años. Contexto: tras reducir el conocimiento a impresiones e ideas, examina si hay una impresión del yo.</li>" +
    "<li><b>2. Tema.</b> La negación de que tengamos una idea de un yo sustancial distinto de nuestras percepciones.</li>" +
    "<li><b>3. Idea principal.</b> Al mirar en su interior, Hume no encuentra un «yo» sino solo percepciones particulares (sensaciones, emociones); por tanto, el yo no es una sustancia fija sino un haz de percepciones.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Percepción»: todo contenido de la mente (impresiones e ideas). (b) «Penetrar íntimamente»: es la introspección, el método empirista aplicado a la mente. (c) «Nunca puedo atraparme sin una percepción»: no hay impresión del yo aparte de las otras percepciones.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Aplica el <b>principio de copia</b>: toda idea viene de una impresión; si no hay impresión, no hay idea legítima. Es el mismo método que usa con la causalidad (tampoco hay impresión de la conexión necesaria) y se prolonga en su moral (sentimentalismo) y en su escepticismo moderado. La identidad personal es una ficción de la imaginación y la memoria.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con <b>Descartes</b> (1596–1650): este deducía, desde el cogito, una sustancia pensante; Hume sostiene que solo se encuentran pensamientos, no un sujeto aparte. Con <b>Locke</b>: este admitía la sustancia aunque la consideraba oscura, y consideraba la identidad personal ligada a la conciencia y la memoria; Hume rechaza la sustancia sin más. Con <b>Kant</b> (tema 12): este responderá que el «yo pienso» es la unidad necesaria que acompaña a toda experiencia, aunque no sea una sustancia conocible.</li>" +
    "<li><b>7. Valora y concluye.</b> Hume obliga a justificar nuestras ideas con la experiencia, y anticipa debates actuales sobre la identidad y el cerebro. Límite: si el yo es un haz, no explica quién percibe ni por qué tengo la sensación de unidad; el propio Hume admitió cierta insatisfacción con su explicación.</li></ol>" +
    ojo("Errores típicos: (1) decir que Hume niega que existas (niega la <b>sustancia</b> fija, no tu vida diaria); (2) no mencionar el <b>principio de copia</b>; (3) confundir «impresión» con «idea»; (4) comparar con Descartes sin nombrar el cogito.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. El empirismo de Locke", "Respuesta modelo:", [
      "<b>Contexto.</b> Frente al racionalismo de Descartes, el empirismo afirma que el conocimiento procede de la experiencia.",
      "<b>Tabula rasa.</b> No hay ideas innatas; la mente es un papel en blanco. Argumentos: no hay consenso universal ni entre niños ni entre culturas.",
      "<b>Fuentes.</b> Sensación y reflexión; la reflexión depende de la sensación.",
      "<b>Ideas.</b> Simples (recibidas pasivamente) y complejas (construidas por la mente); cualidades primarias y secundarias.",
      "<b>Valoración.</b> Dio un impulso a la ciencia, pero su noción de sustancia es oscura y Hume la criticará."
    ]) +
    ejemplo("Pregunta 2. La crítica de Hume a la causalidad", "Respuesta modelo:", [
      "<b>Principio de copia.</b> Toda idea viene de una impresión.",
      "<b>Análisis.</b> En la causalidad solo vemos contigüidad, sucesión y conjunción constante; nunca la conexión necesaria.",
      "<b>Origen.</b> La idea de necesidad nace del hábito: la expectativa tras la repetición.",
      "<b>Consecuencia.</b> El problema de la inducción: nada garantiza que el futuro se parezca al pasado.",
      "<b>Valoración.</b> Despertó a Kant; la ciencia es probable, no segura."
    ]) +
    ejemplo("Pregunta 3. El yo en Hume", "Respuesta modelo:", [
      "<b>Planteamiento.</b> Aplica el principio de copia a la idea de yo.",
      "<b>Introspección.</b> Solo encuentra percepciones, nunca un yo.",
      "<b>Conclusión.</b> El yo es un haz de percepciones; la identidad es una ficción de imaginación y memoria.",
      "<b>Comparación.</b> Frente al cogito de Descartes."
    ]) +
    ejemplo("Pregunta 4. Política de Locke", "Respuesta modelo:", [
      "<b>Estado de naturaleza.</b> Libertad e igualdad con ley natural y derechos naturales (vida, libertad, bienes).",
      "<b>Propiedad.</b> Nace del trabajo, con límites.",
      "<b>Contrato.</b> Se crea el gobierno con consentimiento para proteger los derechos; poder limitado y división de poderes.",
      "<b>Resistencia y tolerancia.</b> Si el gobierno abusa, se puede resistir; separación Iglesia–Estado.",
      "<b>Comparación.</b> Con Hobbes o con Rousseau."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf10a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
