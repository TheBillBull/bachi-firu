/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 15: Fenomenología y existencialismo
   (parte A: teoría. Parte B, historia_fil_t15b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Intencionalidad: no es «tener intención», sino que toda conciencia es conciencia DE algo → sección 1 + ejemplos.
   2. «Volver a las cosas mismas» y epojé: poner entre paréntesis, no negar el mundo → sección 1.
   3. Dasein y ser-en-el-mundo: el ser humano no es un sujeto aislado frente a objetos → sección 2.
   4. Ser-para-la-muerte y autenticidad (el «uno»): no es una obsesión morbosa → sección 2.
   5. «La existencia precede a la esencia»: cortapapeles frente a ser humano; no hay naturaleza humana previa → sección 3.
   6. «Condenado a ser libre»: libertad no es capricho; implica responsabilidad por todos → sección 4.
   7. Angustia (no es miedo) y mala fe (el camarero) → sección 4 + clasificar.
   8. Beauvoir: lo que se construye es el «género»; no se niega la biología → sección 5.
   9. Camus: el absurdo no lleva al suicidio sino a la rebeldía; Sísifo; no se decía existencialista → sección nueva 6.
   10. Comentario de texto (Sartre, «condenado a ser libre») y comparación con Kant, Nietzsche y Marx → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t15/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Husserl
  secciones[0] =
    "<h5>Por qué hacía falta una fenomenología</h5>" +
    "<p>A comienzos del siglo XX, la filosofía y la psicología discutían si el pensamiento era «solo» cerebro, o «solo» costumbre, o «solo» historia. <b>Edmund Husserl</b> (1859–1938; nació en Prossnitz, Moravia, y enseñó sobre todo en Gotinga y en Friburgo) piensa que antes de explicar la conciencia hay que <b>describirla bien</b>. Es como un médico que, antes de proponer una teoría de una enfermedad, mira con atención qué le pasa realmente al paciente. Su obra de arranque son las <i>Investigaciones lógicas</i> (1900–1901); después vienen <i>Ideas relativas a una fenomenología pura</i> (1913), las <i>Meditaciones cartesianas</i> (1931) y <i>La crisis de las ciencias europeas</i> (escrita en los años treinta).</p>" +
    "<h5>«Volver a las cosas mismas»</h5>" +
    "<p>Fenomenología significa «estudio de los fenómenos», es decir, de <b>lo que se nos aparece</b> tal como se nos aparece. El lema de Husserl es <b>«a las cosas mismas»</b> (<i>zu den Sachen selbst</i>): dejar de discutir sobre teorías heredadas y <b>describir la experiencia</b> tal cual es vivida. Ejemplo cotidiano: oyes una canción. Una teoría física te dirá que son ondas de aire; una teoría neurológica, que son impulsos eléctricos. La fenomenología no dice que eso sea falso, sino que empieza por preguntar: <i>¿qué es «oír una canción» tal como yo lo vivo?</i> (una melodía que fluye, con un antes y un después, que me emociona…).</p>" +
    "<h5>La epojé o «puesta entre paréntesis»</h5>" +
    "<p>Para describir sin prejuicios, Husserl propone la <b>reducción fenomenológica</b> o <b>epojé</b> (palabra griega que significa «suspensión»): <b>poner entre paréntesis</b> todas las teorías y creencias previas sobre lo que las cosas «realmente» son. Atención: <b>no se niega que el mundo exista</b>, simplemente se suspende el juicio para quedarse con lo que aparece en la conciencia y con su significado. Es como cuando, al ver una película, dejas de preguntarte si los decorados son de cartón para fijarte en lo que la película te muestra.</p>" +
    "<h5>La intencionalidad: toda conciencia es conciencia de algo</h5>" +
    "<p>Husserl toma de su maestro <b>Franz Brentano</b> la idea de <b>intencionalidad</b> y la desarrolla. «Intencional» <b>no significa «hecho con intención»</b> (querer hacer algo), sino «<b>dirigido hacia</b>»: toda conciencia <b>está siempre dirigida a un objeto</b>. No existe «pensar» a secas: se piensa <i>algo</i>; no existe «temer» a secas: se teme <i>algo</i>; no existe «desear» a secas: se desea <i>algo</i>.</p>" +
    ejemplo("Intencionalidad en la vida diaria", "Fíjate en tres actos de tu conciencia:", [
      "<b>Percibir</b>: ves el móvil sobre la mesa (el objeto es ese móvil).",
      "<b>Recordar</b>: piensas en la última vez que viste a una amiga (el objeto es ese recuerdo y esa amiga).",
      "<b>Desear</b>: te apetece un helado (el objeto es el helado).",
      "<b>Conclusión</b>: la conciencia no es una caja cerrada con ideas dentro; es una <b>apertura al mundo</b>. Por eso Husserl rompe con la idea cartesiana (tema 9) de un yo encerrado que tendría que «salir» hacia las cosas."
    ]) +
    "<h5>Mundo de la vida y crisis de las ciencias</h5>" +
    "<p>En su etapa final, Husserl habla del <b>mundo de la vida</b> (<i>Lebenswelt</i>): el mundo tal como lo vivimos antes de cualquier ciencia (el sol «sale» y «se pone», la mesa es «dura»). Según él, las ciencias modernas (Galileo, tema 8) se olvidaron de que parten de ese mundo vivido y convirtieron la naturaleza en puras fórmulas; de ahí la <b>crisis de las ciencias europeas</b>: los datos crecen, pero se pierde el <i>sentido</i> para la vida humana. La fenomenología quiere devolver a las ciencias su base en la experiencia.</p>" +
    tabla(["Idea de Husserl", "Qué significa en una línea", "Ejemplo"], [
      ["<b>Fenomenología</b>", "Describir los fenómenos tal como aparecen a la conciencia", "Describir cómo vives «oír una canción»"],
      ["<b>Epojé</b>", "Suspender las teorías previas sobre la realidad", "No partir de «el color es solo longitud de onda»"],
      ["<b>Intencionalidad</b>", "Toda conciencia es conciencia de algo", "No hay «temer» sin algo temido"],
      ["<b>Mundo de la vida</b>", "El mundo vivido, base de toda ciencia", "El sol «sale» aunque la Tierra gire"]
    ]) +
    ojo("Dos confusiones típicas en la PAU: (1) <b>«intencional» no es «voluntario»</b>: una conciencia que percibe o sueña también es intencional; (2) la epojé <b>no niega</b> el mundo ni es escepticismo: es un método para describir mejor.") +
    w("emparejar", "obras");

  // ---------------------------------------------------------------- 2. Heidegger
  secciones[1] =
    "<h5>De dónde viene Heidegger y qué pregunta se hace</h5>" +
    "<p><b>Martin Heidegger</b> (1889–1976; nació en Messkirch, Alemania, y fue profesor en Marburgo y en Friburgo) estudió con Husserl y fue su ayudante. Su libro más importante es <b><i>Ser y tiempo</i></b> (1927). Pero se aleja de su maestro: Husserl analiza la conciencia; Heidegger cree que antes hay que preguntarse por algo más básico, el <b>sentido del ser</b>: <i>¿qué quiere decir «es»?</i> Decimos «la mesa es», «Dios es», «el número tres es»… ¿qué tienen en común? Según Heidegger, la filosofía occidental, desde Platón, <b>olvidó esta pregunta</b> y se dedicó solo a estudiar cosas concretas (los <i>entes</i>) sin preguntarse por el <i>ser</i> en cuanto tal.</p>" +
    "<h5>Dasein: el ser humano como «ser-ahí»</h5>" +
    "<p>Para preguntar por el ser, hay que empezar por el único ente que <b>se pregunta por su propio ser</b>: el ser humano. Heidegger lo llama <b>Dasein</b> (palabra alemana que significa «ser-ahí», estar ahí en un mundo concreto). Fíjate en que evita decir «sujeto», «alma» o «conciencia»: no quiere repetir el esquema cartesiano de un yo aislado que luego se relaciona con el mundo.</p>" +
    "<ul><li><b>El Dasein es «ser-en-el-mundo»</b>: no existe primero un yo y luego el mundo; ya estamos siempre metidos en un mundo de cosas útiles, de personas y de significados. Un martillo no es primero «un objeto de madera y hierro» y luego «sirve para clavar»: lo primero que descubrimos es <i>que sirve</i>.</li>" +
    "<li><b>El Dasein «existe»</b>: su modo de ser no es una esencia fija (como la de una piedra), sino un <b>poder-ser</b>, un conjunto de posibilidades que tiene que realizar.</li>" +
    "<li><b>Arrojado</b> (<i>Geworfenheit</i>): nos encontramos en un mundo y una época que no hemos elegido (tu familia, tu país, tu lengua).</li>" +
    "<li><b>Cuidado</b> (<i>Sorge</i>): el modo básico de estar en el mundo es el de ocuparse y preocuparse, no el de contemplar con indiferencia.</li></ul>" +
    "<h5>El «uno» y la existencia inauténtica</h5>" +
    "<p>En la vida cotidiana, dice Heidegger, solemos vivir en el modo del <b>«uno»</b> (<i>das Man</i>): hacemos lo que «se» hace, pensamos lo que «se» piensa, nos vestimos como «se» viste. Nadie decide realmente; somos «uno cualquiera». Ese modo se llama existencia <b>inauténtica</b>. No es un reproche moral (es inevitable empezar así), sino un modo de ser en que <b>se diluye la propia responsabilidad</b>.</p>" +
    "<h5>Ser-para-la-muerte y existencia auténtica</h5>" +
    "<p>La muerte es la posibilidad más propia del Dasein: <b>nadie puede morir por mí</b>, es mía e intransferible, y es la posibilidad que cancela todas las demás. En la vida cotidiana la evitamos con frases como «uno se muere, pero ahora no». La <b>angustia</b> ante la nada de la muerte (distinta del miedo, que tiene un objeto concreto) nos arranca del «uno» y nos coloca ante nuestra finitud. Si la <b>asumimos</b> (Heidegger habla de «anticipación»), podemos decidir cómo vivir: eso es la existencia <b>auténtica</b>.</p>" +
    ojo("«Ser-para-la-muerte» <b>no</b> significa estar obsesionado con morir ni desear la muerte. Significa que la finitud es parte de lo que somos y que asumirla da <b>seriedad y sentido</b> a lo que hacemos con nuestro tiempo. Por eso el título de la obra es <i>Ser y tiempo</i>.") +
    tabla(["", "Existencia inauténtica", "Existencia auténtica"], [
      ["Quién decide", "«Uno» (lo que se hace, lo que se dice)", "Yo mismo, asumiendo mis posibilidades"],
      ["Ante la muerte", "La evita: «ahora no»", "La asume como posibilidad propia"],
      ["Tiempo", "Se dispersa en las ocupaciones", "Se vive como finito y con sentido"]
    ]) +
    "<p><b>Una nota de contexto:</b> Heidegger se adhirió al partido nazi en 1933, cuando fue rector de la Universidad de Friburgo, un hecho que sigue generando un debate muy vivo sobre la relación entre su vida y su obra. Años después, en la <i>Carta sobre el humanismo</i> (1947), rechazó que su filosofía fuera «existencialismo» en el sentido de Sartre.</p>";

  // ---------------------------------------------------------------- 3. Sartre
  secciones[2] =
    "<h5>Quién es Sartre y qué pretende</h5>" +
    "<p><b>Jean-Paul Sartre</b> (1905–1980; París) fue filósofo, novelista, dramaturgo y activista. Estudió en Francia y en Berlín, donde leyó a Husserl y a Heidegger. Vivió la ocupación alemana de Francia (1940–1944) y la posguerra, época en la que su pensamiento se hizo popular. Sus obras: la novela <i>La náusea</i> (1938), el tratado filosófico <b><i>El ser y la nada</i></b> (1943), la obra de teatro <i>A puerta cerrada</i> (1944) y la conferencia <b><i>El existencialismo es un humanismo</i></b> (pronunciada en 1945 y publicada en 1946), que es su exposición más sencilla. En 1964 se le concedió el Nobel de Literatura, que rechazó.</p>" +
    "<h5>«La existencia precede a la esencia»</h5>" +
    "<p>Es la frase clave del existencialismo de Sartre. Para entenderla, hay que saber qué es <b>esencia</b> (lo que algo <i>es</i>: su definición, su naturaleza o su función) y <b>existencia</b> (el hecho de que algo <i>está ahí</i>). En los objetos fabricados la esencia va primero.</p>" +
    ejemplo("El cortapapeles y el ser humano", "Sartre usa el ejemplo de un cortapapeles (como el del cuchillo):", [
      "<b>El artesano</b> que fabrica un cortapapeles tiene antes <b>en la cabeza</b> un concepto: para qué sirve y cómo se hace.",
      "Por tanto, en el objeto <b>la esencia (su función) precede a la existencia</b>: primero el plan, luego el objeto.",
      "En el ser humano, si no hay un Dios creador que lo haya diseñado (Sartre es ateo), <b>no hay ningún plan previo</b>: no hay una «naturaleza humana» fijada de antemano.",
      "Por tanto, <b>primero existe</b> (aparece en el mundo, sin que nadie se lo haya preguntado) y <b>luego se define</b> con lo que hace. De ahí su idea de que el ser humano no es otra cosa que lo que él se hace (paráfrasis de <i>El existencialismo es un humanismo</i>)."
    ]) +
    "<h5>Consecuencias de la tesis</h5>" +
    "<ul><li><b>No hay naturaleza humana previa.</b> Nadie «es cobarde» o «es héroe» por naturaleza: se llega a serlo con los actos. Frente al «así soy yo», Sartre dice «eres lo que haces».</li>" +
    "<li><b>Subjetividad, pero no capricho.</b> Partir de la subjetividad (de mi existencia concreta) no significa que todo valga: cuando elijo, elijo <b>al mismo tiempo cómo debería ser el ser humano</b>, y por eso mi elección compromete a todos.</li>" +
    "<li><b>Ateísmo y responsabilidad.</b> Si Dios no existe, no hay valores escritos «en el cielo» que me digan qué hacer. Los valores los crea la propia libertad.</li></ul>" +
    "<h5>Ser en sí y ser para sí</h5>" +
    "<p>En <i>El ser y la nada</i> Sartre distingue dos modos de ser. El <b>ser en sí</b> es el de las cosas: son lo que son, compactas, sin conciencia (una piedra, una mesa). El <b>ser para sí</b> es el de la conciencia humana: es lo que <i>no es</i> todavía, siempre abierta, con un hueco («la nada») entre lo que soy y lo que puedo ser. Por eso podemos preguntar, imaginar, dudar o proyectar: la nada hace posible la libertad.</p>" +
    tabla(["", "Ser en sí (cosas)", "Ser para sí (conciencia)"], [
      ["Modo de ser", "Es lo que es: lleno, cerrado", "No es lo que es: abierto, proyecto"],
      ["Esencia", "Ya la tiene (la piedra es piedra)", "Se la hace con sus actos"],
      ["Libertad", "No", "Sí: está obligado a elegir"]
    ]) +
    ojo("Frase de examen: «la existencia precede a la esencia» habla solo del <b>ser humano</b> y dice que <b>no tiene definición previa</b>. En los objetos fabricados, en cambio, la esencia va primero. No dice que las cosas existan antes que su diseño.") +
    w("clasificar", "esencia");

  // ---------------------------------------------------------------- 4. Libertad, angustia, mala fe
  secciones[3] =
    "<h5>«Condenado a ser libre»</h5>" +
    "<p>Si no hay naturaleza ni plan previo, hay una conclusión inevitable: <b>soy libre</b>. Pero Sartre añade una palabra amarga: el ser humano está <b>condenado a ser libre</b>. «Condenado», porque no ha elegido existir (nadie ha pedido nacer); «libre», porque, una vez arrojado al mundo, es responsable de todo lo que hace. <b>No puede dejar de elegir</b>: incluso quedarse quieto, esperar o «no decidir» es una decisión de la que sigue siendo responsable. Ejemplo cotidiano: si dejas pasar el plazo para elegir grado y no decides, eso también cuenta como decisión, aunque sea por omisión.</p>" +
    "<p><b>Matiz clave:</b> para Sartre ser libre <b>no significa poder todo</b> lo que uno quiera. Hay <b>situación</b> (nacer en un cuerpo, en un país, en una época). Lo que no cambia es que <i>yo decido qué hacer con esa situación</i>. Un prisionero no es libre de salir, pero sigue siendo libre de cómo vivir su cautiverio.</p>" +
    "<h5>La angustia</h5>" +
    "<p>Si todo depende de mí, no tengo ninguna excusa. Esa sensación de vértigo ante la libertad y la responsabilidad es la <b>angustia</b>. No es lo mismo que el miedo: el <b>miedo</b> tiene un objeto concreto (un perro que ladra); la <b>angustia</b> es ante uno mismo y ante lo que puede hacer con su vida (como quien, junto a un acantilado, siente vértigo no porque alguien le empuje, sino porque <i>podría</i> tirarse). Sartre dice que no se huye de ella: se vive con ella.</p>" +
    "<p>Además, al elegir <b>elijo para toda la humanidad</b> (qué es ser buen amigo, qué es ser buen ciudadano), así que soy responsable ante los demás. No hay ni Dios, ni naturaleza humana (la ética kantiana del tema 12), ni leyes de la historia (el materialismo histórico de Marx, tema 13) que me liberen de esa responsabilidad.</p>" +
    "<h5>La mala fe</h5>" +
    "<p>Como la libertad pesa, intentamos <b>escondernos de ella</b>. La <b>mala fe</b> (<i>mauvaise foi</i>) es el autoengaño por el que me hago creer a mí mismo que no soy libre, o que soy una cosa fija. Se reconoce por frases como «yo soy así», «no tenía otra opción», «es mi destino».</p>" +
    ejemplo("El camarero de café (Sartre, <i>El ser y la nada</i>)", "Sartre describe a un camarero demasiado perfecto:", [
      "Sus movimientos son exageradamente exactos y rápidos; <b>juega a ser camarero</b>, como si fuese una cosa (un objeto con función fija).",
      "Se identifica totalmente con su papel: «yo soy un camarero», como «la mesa es una mesa».",
      "Pero un ser humano <b>no es</b> camarero como una mesa es una mesa: <b>lo es eligiéndolo</b> cada día y podría dejar de serlo.",
      "<b>Mala fe</b>: negar esa libertad y esconderse tras el rol."
    ]) +
    "<p>La mala fe tiene un contrario: la <b>autenticidad</b>, que consiste en <b>asumir la libertad y la responsabilidad</b>, aunque produzcan angustia. No garantiza éxito ni felicidad, pero sí vivir <i>sin excusas</i>.</p>" +
    "<h5>Los otros</h5>" +
    "<p>En <i>A puerta cerrada</i> aparece la frase <b>«el infierno son los otros»</b>. No quiere decir que los demás sean malos, sino que <b>la mirada del otro</b> me convierte en objeto («me ve como una cosa») y que dependo de cómo me ven.</p>" +
    ojo("Tres errores que se pagan: (1) <b>libertad ≠ hacer lo que me dé la gana</b> (hay situación y hay responsabilidad); (2) <b>angustia ≠ miedo</b>; (3) <b>mala fe ≠ mentir a otro</b>: es mentirse a uno mismo.") +
    w("clasificar", "malafe");

  // ---------------------------------------------------------------- 5. Beauvoir
  secciones[4] =
    "<h5>Quién es Simone de Beauvoir</h5>" +
    "<p><b>Simone de Beauvoir</b> (1908–1986; París) fue filósofa, novelista y ensayista; compartió con Sartre su vida intelectual desde 1929 y desarrolló un pensamiento propio. Su obra principal es <b><i>El segundo sexo</i></b> (1949), una de las bases del feminismo del siglo XX. Otras obras: <i>La ética de la ambigüedad</i> (1947) y la novela <i>Los mandarines</i> (premio Goncourt, 1954).</p>" +
    "<h5>«No se nace mujer: se llega a serlo»</h5>" +
    "<p>La frase abre el segundo tomo de <i>El segundo sexo</i> (traducción habitual). Es la aplicación directa de «la existencia precede a la esencia»: no existe una <b>«esencia femenina»</b> dada de antemano, sino que lo que cada sociedad entiende por «ser mujer» (papeles, expectativas, educación) se va construyendo. Piensa en la educación: a las niñas se les regalan muñecas y se les enseña a agradar; a los niños se les anima a la acción.</p>" +
    "<ul><li><b>Mujer como «el Otro».</b> En una sociedad dominada por varones, el hombre se define como lo neutro y universal (el Sujeto) y la mujer como lo que se desvía de él (el Otro).</li>" +
    "<li><b>Biología y situación.</b> Beauvoir <b>no niega</b> las diferencias biológicas: dice que la biología <b>no determina</b> un destino y que su significado depende de la sociedad (la «situación»).</li>" +
    "<li><b>Libertad y responsabilidad.</b> La mujer puede aceptar el papel impuesto (una forma de mala fe) o asumir su libertad y trascender esa situación.</li></ul>" +
    "<h5>Por qué importa</h5>" +
    "<p>Si los papeles de género son construcciones históricas, <b>pueden cambiar</b>. Esa idea abre el camino al feminismo posterior y a la distinción entre <i>sexo</i> (biológico) y <i>género</i> (construcción social). Compáralo con Marx: él explica la desigualdad por la estructura económica; Beauvoir añade la estructura social del género.</p>" +
    ojo("Un fallo típico: decir que Beauvoir «niega la biología». No es así: afirma que <b>la biología no es destino</b>. Lo que se construye es el «ser mujer» social, no el cuerpo.");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Albert Camus y el absurdo", html:
    "<p><b>Albert Camus</b> (1913–1960; nació en Mondovi, Argelia, y murió en un accidente de coche en Francia) fue novelista, ensayista y periodista; recibió el Nobel de Literatura en 1957. Aunque muchos lo meten en el existencialismo, <b>él rechazaba esa etiqueta</b>. Sus obras: <i>El extranjero</i> (1942), el ensayo <b><i>El mito de Sísifo</i></b> (1942), <i>La peste</i> (1947) y <i>El hombre rebelde</i> (1951). En 1952 rompió con Sartre por motivos políticos.</p>" +
    "<h5>¿Qué es el absurdo?</h5>" +
    "<p>Para Camus, el absurdo <b>no está en el mundo ni en la persona</b>, sino en la <b>confrontación entre dos cosas</b>: (1) la <b>exigencia humana</b> de sentido, de claridad, de que todo tenga una razón; y (2) el <b>silencio irrazonable del mundo</b>, que no responde. Es como gritar una pregunta a una montaña y no recibir contestación. De ese choque nace la sensación de absurdo.</p>" +
    "<h5>Tres salidas, y la que Camus elige</h5>" +
    tabla(["Salida", "Qué hace", "Por qué la rechaza o la elige Camus"], [
      ["<b>Suicidio</b>", "Elimina uno de los dos términos (la persona)", "No resuelve el absurdo, lo huye. Camus abre <i>El mito de Sísifo</i> diciendo que el problema filosófico serio es si la vida merece ser vivida, y concluye que sí"],
      ["<b>Salto de fe</b> (suicidio «filosófico»)", "Inventa un sentido trascendente (Dios, la historia…)", "Es renunciar a la lucidez: el mundo sigue sin responder"],
      ["<b>Rebeldía</b> (la que elige)", "Vivir sin esperanza de sentido, con lucidez, libertad y pasión", "Mantiene la tensión: no la elimina, la acepta"]
    ]) +
    "<h5>Sísifo y la rebeldía</h5>" +
    "<p>Camus retoma el mito griego: los dioses condenaron a <b>Sísifo</b> a subir una roca hasta la cima de una montaña; al llegar arriba, la roca cae y debe empezar de nuevo, para siempre. Es la imagen del trabajo absurdo. Pero Camus no ve en Sísifo un derrotado: cuando <b>baja a por la piedra con lucidez</b>, es superior a su destino. Su conclusión final es que hay que imaginarse a Sísifo feliz (paráfrasis de la última frase del ensayo): el sentido no viene de fuera, sino de la propia rebeldía y del esfuerzo mismo.</p>" +
    "<p>En <i>El hombre rebelde</i> la idea pasa a la política: decir «no» a lo intolerable crea una <b>solidaridad</b> con los demás. Frente a las revoluciones que justifican la violencia con un futuro ideal, Camus defiende la <b>medida</b> y rechaza el asesinato como medio.</p>" +
    ojo("Camus <b>no</b> propone el suicidio ni el nihilismo: parte del absurdo para llegar a <b>vivir más intensamente</b>. Y no confundas absurdo con «sin sentido total»: es la <i>tensión</i> entre buscar sentido y no encontrarlo.") +
    "<h5>Diferencias con Sartre</h5>" +
    tabla(["", "Sartre", "Camus"], [
      ["Punto de partida", "La libertad radical sin esencia previa", "El absurdo: el choque entre exigencia de sentido y silencio del mundo"],
      ["Actitud", "Compromiso y responsabilidad (autenticidad)", "Rebeldía, lucidez y medida"],
      ["Etiqueta", "Se declara existencialista", "Rechaza ser llamado existencialista"]
    ]) });

  nuevas.push({ h: "7. Contexto: de dónde viene el existencialismo", html:
    "<p>Para situar el tema, conviene saber qué lo hace posible y qué une a estos autores a pesar de sus diferencias.</p>" +
    "<h5>Antecedentes</h5>" +
    "<ul><li><b>Søren Kierkegaard</b> (1813–1855, danés): defiende la existencia concreta e individual frente a los sistemas abstractos (Hegel). La angustia y la elección personal son temas suyos. Su pensamiento religioso influirá en el existencialismo posterior.</li>" +
    "<li><b>Nietzsche</b> (tema 14): la muerte de Dios deja al ser humano sin fundamento de valores y obligado a crearlos. Sartre llegará a una conclusión parecida desde el ateísmo.</li>" +
    "<li><b>Husserl</b>: el método fenomenológico, que Heidegger y Sartre aplican a la existencia humana.</li></ul>" +
    "<h5>El clima histórico</h5>" +
    "<p>Dos guerras mundiales (1914–1918 y 1939–1945), el Holocausto y las bombas atómicas destrozaron la confianza en el «progreso» y en la razón de la Ilustración (tema 11). Parecía que ni Dios ni la historia garantizaban el sentido. Ante ello, estos filósofos ponen en el centro <b>la existencia concreta, la libertad y la responsabilidad de cada individuo</b>. En España, Ortega y Gasset (tema 16) elaboró una filosofía de la vida con puntos de contacto (la «circunstancia» y la vida como proyecto).</p>" +
    "<h5>Qué comparten (y qué no)</h5>" +
    tabla(["Comparten", "Diferencian"], [
      ["Punto de partida en la existencia humana concreta", "Heidegger: pregunta por el ser; Sartre: libertad y compromiso"],
      ["Importancia de la libertad, la angustia y la finitud", "Existencialismo ateo (Sartre) frente a existencialismo religioso (Kierkegaard)"],
      ["Rechazo de una «naturaleza humana» cerrada", "Husserl es un método, no un existencialismo"]
    ]) +
    "<h5>Cronología para no confundirse</h5>" +
    tabla(["Autor", "Fechas", "Obra clave"], [
      ["Kierkegaard", "1813–1855", "<i>El concepto de la angustia</i> (1844)"],
      ["Husserl", "1859–1938", "<i>Investigaciones lógicas</i> (1900–1901)"],
      ["Heidegger", "1889–1976", "<i>Ser y tiempo</i> (1927)"],
      ["Sartre", "1905–1980", "<i>El ser y la nada</i> (1943)"],
      ["Beauvoir", "1908–1986", "<i>El segundo sexo</i> (1949)"],
      ["Camus", "1913–1960", "<i>El mito de Sísifo</i> (1942)"]
    ]) +
    "<p>Ordena tú mismo a los autores por fecha de nacimiento:</p>" +
    w("orden", "cronologia") });

  nuevas.push({ h: "8. Mapa del tema: comparaciones que se piden", html:
    "<p>En la PAU suelen pedir relacionar el texto con el resto del pensamiento del autor y <b>comparar con otro autor</b>. Estas son las comparaciones más rentables:</p>" +
    tabla(["Con…", "Relación"], [
      ["Platón (T3)", "Para Platón hay una esencia (la Idea) anterior a las cosas; para Sartre, en el ser humano no hay esencia previa."],
      ["Aristóteles (T4)", "Él defiende una función propia del ser humano (la razón); Sartre niega esa naturaleza previa."],
      ["Descartes (T9)", "El «yo pienso» cartesiano es una conciencia aislada; Husserl y Heidegger la ven abierta al mundo (intencionalidad, ser-en-el-mundo)."],
      ["Kant (T12)", "Kant fija una ley moral universal; Sartre dice que no hay ley dada, que la crea la libertad (aunque al elegir «elijo por todos»)."],
      ["Marx (T13)", "Marx cree en condiciones materiales que determinan la conciencia; Sartre pone el acento en la libertad."],
      ["Nietzsche (T14)", "Ambos parten de la «muerte de Dios» y de la tarea de crear valores; Sartre insiste en la responsabilidad ante todos."],
      ["Ortega (T16)", "«Yo soy yo y mi circunstancia»: la vida como proyecto en una situación, cercano a la «situación» sartreana."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene cada autor</h5>" +
    tabla(["Autor", "Tesis central"], [
      ["Husserl", "La filosofía debe describir los fenómenos tal como aparecen; la conciencia es intencional."],
      ["Heidegger", "Pregunta por el sentido del ser desde el Dasein; este es ser-en-el-mundo y ser-para-la-muerte; vida auténtica frente al «uno»."],
      ["Sartre", "La existencia precede a la esencia; el ser humano está condenado a ser libre; angustia y mala fe."],
      ["Beauvoir", "«No se nace mujer, se llega a serlo»: el género es una construcción social."],
      ["Camus", "El absurdo nace del choque entre la búsqueda de sentido y el silencio del mundo; salida: la rebeldía."]
    ]) });

  nuevas.push({ h: "9. Comentario de texto resuelto: «condenado a ser libre»", html:
    "<p>Resolvemos paso a paso un comentario con el esquema de la PAU: <b>tema, ideas, relación con el autor y comparación con otro</b>.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Jean-Paul Sartre, <em>El existencialismo es un humanismo</em>, 1946; traducción española habitual, que varía levemente según la edición):<br><em>«El hombre está condenado a ser libre. Condenado, porque no se ha creado a sí mismo; y sin embargo libre, porque, una vez arrojado al mundo, es responsable de todo lo que hace.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Sartre (1905–1980), conferencia de 1945 publicada en 1946, escrita para defender el existencialismo ante las críticas de la posguerra. Pertenece al existencialismo ateo.</li>" +
    "<li><b>2. Tema.</b> La libertad humana como condición ineludible y la responsabilidad que implica.</li>" +
    "<li><b>3. Idea principal.</b> El ser humano no ha elegido existir, pero una vez en el mundo no puede dejar de elegir y es responsable de todos sus actos.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Condenado»: no ha elegido ser libre ni se ha dado a sí mismo la existencia. (b) «Libre»: sin esencia ni naturaleza previa que lo determine. (c) «Arrojado al mundo»: expresión de origen heideggeriano (<i>Geworfenheit</i>) para la situación no elegida. (d) «Responsable de todo lo que hace»: sin excusas (de ahí la angustia y la mala fe).</li>" +
    "<li><b>5. Relaciona con el autor.</b> Se deduce de «la existencia precede a la esencia»: si no hay esencia previa, el ser humano se hace con sus decisiones. Conecta con la angustia, que es el vértigo de esta responsabilidad, y con la mala fe, que es el autoengaño con el que se escapa de ella. También con el compromiso: al elegir, elige «por todos».</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Kant (tema 12): ambos hacen al ser humano responsable de sus actos, pero Kant fundamenta la moral en una ley universal de la razón, mientras que Sartre dice que no hay ley dada: la libertad crea los valores. Con Marx (tema 13): él explica al ser humano por sus condiciones materiales; Sartre afirma que, aun dentro de unas condiciones, siempre se elige qué hacer con ellas. Con Camus: tampoco hay sentido dado, pero responde con rebeldía más que con compromiso.</li>" +
    "<li><b>7. Valora y concluye.</b> La tesis rescata la dignidad y la responsabilidad. Críticas habituales: exagera la libertad (el entorno y el inconsciente pesan) y deja sin criterio objetivo para elegir. Sartre responde que elegir implica comprometer a toda la humanidad.</li></ol>" +
    ojo("Errores típicos: (1) decir que libre es «hacer lo que me dé la gana»; (2) olvidar que «condenado» alude a que no elegimos existir; (3) no mencionar la <b>responsabilidad</b> y la <b>angustia</b>; (4) comparar con Kant sin decir que para Kant hay ley universal dada por la razón.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica la fenomenología de Husserl", "Respuesta modelo:", [
      "<b>Definición.</b> Método para describir los fenómenos tal como aparecen a la conciencia: «volver a las cosas mismas».",
      "<b>Epojé.</b> Se ponen entre paréntesis las teorías previas (sin negar el mundo).",
      "<b>Intencionalidad.</b> Toda conciencia es conciencia de algo; la conciencia es apertura al mundo.",
      "<b>Relación.</b> Rompe con el yo aislado de Descartes; prepara a Heidegger y Sartre."
    ]) +
    ejemplo("Pregunta 2. Explica el Dasein y el ser-para-la-muerte en Heidegger", "Respuesta modelo:", [
      "<b>Pregunta del ser.</b> Heidegger se pregunta por el sentido del ser y parte del ente que se lo pregunta: el Dasein (ser-ahí).",
      "<b>Rasgos.</b> Ser-en-el-mundo, arrojado, poder-ser; cotidianamente vive en el «uno» (inauténtico).",
      "<b>Muerte.</b> Posibilidad más propia e intransferible; asumirla (frente a evitarla) abre la existencia auténtica.",
      "<b>Relación.</b> Sartre toma de él el «arrojado» y la angustia."
    ]) +
    ejemplo("Pregunta 3. La existencia precede a la esencia en Sartre", "Respuesta modelo:", [
      "<b>Tesis.</b> En el ser humano no hay esencia previa: primero existe y luego se hace con sus actos.",
      "<b>Contraste.</b> En un objeto fabricado la esencia precede (cortapapeles).",
      "<b>Consecuencias.</b> Libertad radical («condenado a ser libre»), responsabilidad, angustia y mala fe.",
      "<b>Comparación.</b> Con Platón/Aristóteles (esencia previa) o Kant (ley universal)."
    ]) +
    ejemplo("Pregunta 4. Beauvoir y Camus", "Respuesta modelo:", [
      "<b>Beauvoir.</b> «No se nace mujer, se llega a serlo»: el género es construcción social, no destino biológico.",
      "<b>Camus.</b> El absurdo nace del choque entre la exigencia de sentido y el silencio del mundo; rechaza suicidio y salto de fe; propone la rebeldía (Sísifo feliz)."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf15a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
