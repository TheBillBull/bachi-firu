/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 13: Marx
   (parte A: teoría. Parte B, historia_fil_t13b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Crítica a Hegel (idealismo, «cabeza abajo») y a Feuerbach (materialismo contemplativo, esencia abstracta) → sección 2 + clasificar.
   2. Fuerzas de producción, relaciones de producción y modo de producción (no son lo mismo) → sección 2 + tabla.
   3. Infraestructura y superestructura: «condiciona» no es «es idéntica a»; el derecho y el Estado son superestructura → sección 3 + clasificar.
   4. Ideología = conciencia que oculta intereses de clase; la religión como «opio» (matiz) → sección 3.
   5. Lucha de clases y por qué el proletariado es el sujeto de la revolución → sección 4.
   6. Los cuatro aspectos de la alienación (producto, actividad, ser genérico, otros) → sección 4 + emparejar.
   7. Plusvalía: de dónde sale el beneficio (ejemplo numérico verificado) → sección 4.
   8. Comunismo: dictadura del proletariado, dos fases, y que Marx no es la URSS → sección 5 + orden.
   9. Dialéctica de Marx ≠ «tesis-antítesis-síntesis» (esa fórmula no es de Marx) → sección 2 (ojo).
   10. Comentario de texto: el Prefacio de 1859 («no es la conciencia… sino el ser social») → comentario resuelto.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t13/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Marx: vida, obra y la tesis XI
  secciones[0] =
    "<h5>La vida de Marx (1818–1883) paso a paso</h5>" +
    "<ul><li><b>1818</b>: nace en <b>Tréveris</b> (Renania, entonces Prusia), en una familia de abogados de origen judío convertida al protestantismo.</li>" +
    "<li><b>Años 1830–1841</b>: estudia Derecho en Bonn y en Berlín, pero acaba en la filosofía. En Berlín se mueve entre los <b>jóvenes hegelianos</b>, que usan la filosofía de Hegel (1770–1831) para criticar la religión y el Estado prusiano. Se doctora en <b>1841</b> con una tesis sobre Demócrito y Epicuro.</li>" +
    "<li><b>1842–1843</b>: dirige la <i>Gaceta Renana</i>, un periódico que la censura acaba prohibiendo. Escribir sobre la miseria de los campesinos le hace ver que la filosofía sola no basta: hay que mirar la economía.</li>" +
    "<li><b>1843–1845</b>: exiliado en <b>París</b>. Escribe los <i>Manuscritos económico-filosóficos</i> (1844) y conoce a <b>Friedrich Engels</b> (1820–1895), su amigo y colaborador de por vida. En 1845 redacta las <i>Tesis sobre Feuerbach</i> y empieza <i>La ideología alemana</i> (1845–1846).</li>" +
    "<li><b>1848</b>: con Engels publica el <i>Manifiesto del Partido Comunista</i>, el año de las revoluciones europeas.</li>" +
    "<li><b>1849–1883</b>: exiliado en <b>Londres</b>, vive casi en la pobreza y estudia economía en la biblioteca del Museo Británico. Publica el <i>Prefacio</i> a la <i>Contribución a la crítica de la economía política</i> (1859) y el libro I de <i>El capital</i> (1867). Muere en Londres en <b>1883</b>; Engels edita los libros II y III de <i>El capital</i> (1885 y 1894).</li></ul>" +
    ojo("Dos de las obras más citadas de Marx, los <i>Manuscritos</i> de 1844 y <i>La ideología alemana</i>, <b>no se publicaron hasta 1932</b>: Marx las escribió para aclararse las ideas. Por eso a veces se habla del «joven Marx» (filosófico, centrado en la alienación) y del «Marx maduro» (economista, <i>El capital</i>); la mayoría de los estudiosos ve más continuidad que ruptura entre los dos.") +
    "<h5>El mundo que Marx tiene delante</h5>" +
    "<p>La <b>revolución industrial</b> ha llenado las ciudades de fábricas. Una persona que solo posee sus brazos trabaja 12 o 14 horas, a veces con sus hijos pequeños, por un salario que apenas le da para comer. Mientras, el dueño de la fábrica se hace rico. Marx se pregunta algo muy simple: <b>¿por qué unos viven de su trabajo y otros viven del trabajo de los demás?</b> Su filosofía es la respuesta, y por eso mezcla filosofía, economía, historia y política.</p>" +
    "<h5>La frase que lo resume: la tesis XI</h5>" +
    "<p>La última de las <i>Tesis sobre Feuerbach</i> (1845) dice, en la traducción habitual: <i>«Los filósofos no han hecho más que interpretar el mundo de diversas maneras; de lo que se trata es de transformarlo»</i>. No significa que Marx desprecie la teoría: significa que una teoría verdadera debe servir para <b>cambiar</b> la realidad. A esa unión de pensamiento y acción transformadora la llama <b>praxis</b>.</p>" +
    ejemplo("Interpretar frente a transformar", "Imagina que en tu instituto hay un problema de acoso.", [
      "<b>Interpretar</b> sería escribir un buen ensayo sobre por qué ocurre el acoso.",
      "<b>Transformar</b> sería, además, actuar para que deje de ocurrir.",
      "Marx no dice que el ensayo esté de más; dice que, si la filosofía se queda solo en el ensayo, se queda corta."
    ]);

  // ---------------------------------------------------------------- 2. Crítica a Hegel y Feuerbach; materialismo histórico
  secciones[1] =
    "<h5>Antes del materialismo histórico: a quién responde Marx</h5>" +
    "<p>Marx se forma entre dos filósofos alemanes: <b>Hegel</b> y <b>Feuerbach</b> (1804–1872). Toma algo de cada uno y critica algo de cada uno. Si dominas este cuadro, entiendes de dónde sale todo lo demás.</p>" +
    tabla(["Autor", "Qué aprovecha Marx", "Qué le critica"], [
      ["Hegel (1770–1831)", "La <b>dialéctica</b> (la historia avanza por contradicciones), la historia como proceso y la idea de alienación.", "Es <b>idealista</b>: para él la historia es el despliegue del Espíritu (ideas). Marx dice que su dialéctica «está cabeza abajo» y hay que ponerla sobre sus pies (paráfrasis del epílogo de <i>El capital</i>, 1873). Además, el Estado no es la razón hecha realidad: defiende los intereses de la clase propietaria."],
      ["Feuerbach (1804–1872)", "El <b>materialismo</b> y la crítica de la religión: Dios es una <b>proyección</b> de la esencia humana (<i>La esencia del cristianismo</i>, 1841).", "Su materialismo es <b>contemplativo</b>: no ve la práctica, la actividad real. Su «hombre» es <b>abstracto</b>, un individuo aislado; para Marx la esencia humana es «el conjunto de las relaciones sociales» (tesis VI, paráfrasis). Explica la religión, pero no por qué la gente necesita consuelo: eso es un problema social."]
    ]) +
    "<p>Fíjate en cómo se completan: Hegel tiene la <b>dialéctica</b> pero con ideas; Feuerbach tiene el <b>materialismo</b> pero sin historia ni dialéctica. Marx junta lo mejor de ambos: un materialismo <b>histórico</b> y <b>dialéctico</b>, centrado en la actividad práctica (la <b>praxis</b>) de los seres humanos reales.</p>" +
    ejemplo("«Cabeza abajo» sin misterio", "¿Qué determina qué? Una pregunta con dos respuestas.", [
      "<b>Hegel (idealismo)</b>: primero las ideas, y la realidad social las va realizando.",
      "<b>Marx (materialismo)</b>: primero la vida material (cómo trabajamos y producimos), y de ahí surgen las ideas.",
      "No dice que las ideas no importen, sino que <b>no explican la historia por sí solas</b>."
    ]) +
    w("clasificar", "quien") +
    ojo("La fórmula «tesis–antítesis–síntesis» <b>no es de Marx ni de Hegel</b>: es una simplificación posterior. Marx habla de <b>contradicciones</b> reales (entre clases, entre fuerzas y relaciones de producción) que empujan el cambio histórico. Y el nombre «materialismo dialéctico» lo popularizan después Engels y Plejánov; Marx habla de «concepción materialista de la historia». En la PAU basta con decir <b>materialismo histórico</b>.") +
    "<h5>Las tres piezas del materialismo histórico</h5>" +
    "<p>Para explicar la historia, Marx pone tres conceptos que hay que distinguir:</p>" +
    "<ul><li><b>Fuerzas productivas</b>: todo lo que permite producir. Los medios de producción (herramientas, máquinas, tierra, materias primas), la <b>fuerza de trabajo</b> de las personas y sus conocimientos técnicos.</li>" +
    "<li><b>Relaciones de producción</b>: las relaciones <b>entre personas</b> al producir; sobre todo, <b>quién es propietario</b> de los medios de producción y quién trabaja para quién (amo y esclavo, señor y siervo, capitalista y obrero).</li>" +
    "<li><b>Modo de producción</b>: la combinación de las dos anteriores en una época. Es lo que define cada etapa de la historia.</li></ul>" +
    "<p>La clave está en una tensión: las fuerzas productivas <b>crecen</b> (aparecen técnicas nuevas) pero las relaciones de producción, que protegen los intereses de los propietarios, tienden a quedarse fijas. Cuando las relaciones frenan a las fuerzas aparece una <b>contradicción</b> y llega, en palabras del Prefacio de 1859 (paráfrasis), «una época de revolución social». Así se pasa de un modo de producción a otro.</p>" +
    tabla(["Modo de producción", "Quién posee los medios", "Quién trabaja", "Clases enfrentadas"], [
      ["Comunismo primitivo", "La comunidad (propiedad común)", "Todos", "No hay clases"],
      ["Esclavista (Antigüedad)", "El amo, también dueño de las personas", "Los esclavos", "Amos y esclavos"],
      ["Feudal (Edad Media)", "El señor (la tierra)", "Los siervos, ligados a la tierra", "Señores y siervos"],
      ["Capitalista (burgués)", "La burguesía (fábricas, capital)", "Los proletarios, libres, que venden su fuerza de trabajo", "Burguesía y proletariado"]
    ]) +
    "<p>(En el Prefacio de 1859 Marx menciona también el modo de producción «asiático», pero en la PAU se trabaja la secuencia clásica de la tabla.) Mira el patrón: en cada etapa <b>cambia la forma de explotación</b>, pero siempre hay alguien que trabaja y otro que se queda con parte de lo producido, hasta que el comunismo acabe con esa división.</p>" +
    w("orden", "modos") +
    ejemplo("Por qué las fábricas «provocan» una revolución", "Un ejemplo histórico sencillo:", [
      "En el feudalismo, la riqueza es la tierra y el señor manda sobre los siervos.",
      "Crecen el comercio, las máquinas y las fábricas: una <b>fuerza productiva</b> nueva que no deja de crecer.",
      "Los burgueses, que la controlan, chocan con las leyes feudales (privilegios, gremios, servidumbre).",
      "Resultado: revoluciones burguesas (como la francesa de 1789) y un nuevo orden, el capitalista."
    ]);

  // ---------------------------------------------------------------- 3. Infraestructura, superestructura, ideología
  secciones[2] =
    "<h5>El edificio de la sociedad</h5>" +
    "<p>Marx usa la imagen de un <b>edificio</b>. En el piso de abajo, los cimientos: la <b>infraestructura</b> (o base), que es la estructura económica, es decir, las fuerzas productivas y las relaciones de producción. Encima se levanta la <b>superestructura</b>: el derecho y el Estado (superestructura jurídica y política) y las formas de conciencia (religión, moral, arte, filosofía, ciencia).</p>" +
    "<p>La frase clave, del <i>Prefacio</i> de 1859 (traducción habitual, que varía según la edición): <i>«El modo de producción de la vida material condiciona el proceso de la vida social, política y espiritual en general. No es la conciencia del hombre la que determina su ser, sino, por el contrario, el ser social es el que determina su conciencia»</i>.</p>" +
    ejemplo("¿Infra o super? Tres casos", "Aplica el criterio: ¿es una relación económica o una forma de pensar y organizar el poder?", [
      "Una <b>fábrica</b> y los contratos de trabajo → <b>infraestructura</b> (medios de producción y relaciones de producción).",
      "La <b>ley que protege la propiedad privada</b> → <b>superestructura</b> (derecho): refleja y defiende esa base.",
      "La <b>religión que enseña a aceptar la pobreza</b> como destino → <b>superestructura</b> (ideología)."
    ]) +
    w("clasificar", "infraestructura") +
    "<h5>Ideología: ideas que ocultan intereses</h5>" +
    "<p>Para Marx, la <b>ideología</b> es un conjunto de ideas que presentan los intereses de una clase como si fueran los intereses de <b>todos</b>, ocultando así la realidad de la explotación. Su frase de <i>La ideología alemana</i> (traducción habitual): <i>«las ideas de la clase dominante son, en cada época, las ideas dominantes»</i>. La clase que posee los medios de producción material controla también, en buena parte, los medios de producción de las ideas (escuela, prensa, iglesia, leyes).</p>" +
    "<p>Un ejemplo: si se repite que «quien no tiene trabajo es porque no se esfuerza», se hace creer que el paro depende solo de cada persona y se esconde que el sistema económico necesita cierto número de parados. Eso es ideología: <b>una explicación que protege a quien se beneficia de la situación</b>.</p>" +
    "<h5>La religión como «opio del pueblo»</h5>" +
    "<p>En la <i>Introducción a la crítica de la filosofía del derecho de Hegel</i> (1844) escribe, en la traducción habitual, que la religión es «el suspiro de la criatura oprimida, el corazón de un mundo sin corazón» y también «el opio del pueblo». Ten cuidado con el matiz: el opio de entonces <b>calmaba el dolor</b>. Marx no se burla de quien cree: dice que la religión consuela de una miseria real y, a la vez, <b>la hace soportable en lugar de cambiarla</b>. Cambiar esa miseria (praxis) haría innecesario el consuelo ilusorio.</p>" +
    "<h5>El Estado: ¿un árbitro neutral?</h5>" +
    "<p>Para Hegel, el Estado representa el interés universal. Para Marx es parte de la superestructura y, en las sociedades divididas en clases, funciona como <b>instrumento de la clase dominante</b>: sus leyes, su policía y sus tribunales protegen sobre todo la propiedad de los medios de producción. Por eso Marx no cree que baste con reformar la ley: hay que cambiar la base.</p>" +
    ojo("«Determina» o «condiciona» <b>no significa</b> que las ideas sean un simple reflejo mecánico ni que no tengan efecto. El propio Engels, en cartas de 1890, aclara que la economía es determinante «en última instancia» y que la superestructura también influye de vuelta sobre la base. Y no confundas: el <b>derecho y el Estado son superestructura</b>, aunque regulen la propiedad; la propiedad en sí (quién posee qué) es relación de producción, es decir, infraestructura.");

  // ---------------------------------------------------------------- 4. Lucha de clases, alienación, plusvalía
  secciones[3] =
    "<h5>La lucha de clases</h5>" +
    "<p>El <i>Manifiesto</i> (1848) empieza así, en la traducción habitual: <i>«La historia de todas las sociedades hasta nuestros días es la historia de la lucha de clases»</i> (en 1888 Engels añadió una nota para aclarar que se refería a la historia escrita). Una <b>clase social</b> no es lo mismo que «ser rico o pobre»: es el grupo que ocupa un mismo lugar en las relaciones de producción, es decir, <b>si posee o no medios de producción</b>.</p>" +
    "<ul><li>La <b>burguesía</b>: propietaria de fábricas, capital y tierras. Vive de la <b>plusvalía</b> que genera el trabajo ajeno.</li>" +
    "<li>El <b>proletariado</b>: no posee más que su <b>fuerza de trabajo</b> y debe venderla por un salario.</li></ul>" +
    "<p>¿Por qué elige Marx al proletariado como motor del cambio? Porque es la clase más numerosa en el capitalismo, está concentrada en las fábricas (lo que facilita organizarse) y no tiene propiedad que defender, de modo que su liberación solo puede ser la de <b>toda</b> la sociedad: al abolir la propiedad privada de los medios de producción acaba con las clases. Esa es la idea de «conciencia de clase»: pasar de ser una clase «en sí» (con una situación común) a una clase «para sí» (que sabe lo que es y se organiza).</p>" +
    "<h5>La alienación: cuatro maneras de sentirse extraño</h5>" +
    "<p>La <b>alienación</b> (o enajenación; del latín <i>alienus</i>, «ajeno») es el centro de los <i>Manuscritos</i> de 1844. Para Marx, trabajar es lo que hace humano al ser humano: transformando la naturaleza se expresa y se realiza. Pero en el capitalismo el trabajo se convierte en un castigo. Distingue cuatro aspectos:</p>" +
    tabla(["Aspecto", "En qué consiste", "Ejemplo cotidiano"], [
      ["1. Respecto al <b>producto</b>", "Lo que fabrica el obrero no es suyo, sino del capitalista; cuanto más produce, más poderoso se hace lo ajeno.", "Quien cose zapatillas de marca que no podría comprar."],
      ["2. Respecto a la <b>actividad</b>", "El trabajo es forzado y repetitivo; no se hace por gusto, sino para sobrevivir. Solo se siente libre fuera de él.", "Esperar el viernes porque el trabajo es solo un medio para cobrar."],
      ["3. Respecto al <b>ser genérico</b> (la esencia humana)", "Se pierde lo que nos distingue como especie: trabajar de forma libre, consciente y creativa. Se vive como un animal que solo sobrevive.", "Un trabajo tan mecánico que no deja pensar ni crear."],
      ["4. Respecto a los <b>otros seres humanos</b>", "Las personas se enfrentan: trabajador y capitalista tienen intereses opuestos, y los obreros compiten entre sí.", "Competir con tus compañeros por no ser el despedido."]
    ]) +
    w("emparejar", "alienacion") +
    "<p>La causa, para Marx, no es la técnica ni la naturaleza humana, sino la <b>propiedad privada de los medios de producción</b> y la división del trabajo. Por eso solo se supera aboliendo esa propiedad: no basta con cambiar de actitud. (Marx también habla de alienación religiosa, siguiendo a Feuerbach, y de alienación política, pero la económica es la raíz.)</p>" +
    "<h5>La plusvalía: de dónde sale el beneficio</h5>" +
    "<p>En <i>El capital</i> (1867) Marx explica cómo se gana dinero en el capitalismo. Parte de un caso en el que todo se intercambia por su valor, para demostrar que <b>aun así</b> hay explotación. Pasos:</p>" +
    "<ol><li>Una <b>mercancía</b> tiene <b>valor de uso</b> (para qué sirve) y <b>valor de cambio</b> (por cuánto se cambia). Su valor depende del <b>tiempo de trabajo socialmente necesario</b> para producirla.</li>" +
    "<li>El obrero vende su <b>fuerza de trabajo</b>, que también es una mercancía. Su valor es lo que cuesta mantener al obrero (comida, vivienda, ropa), y eso es el <b>salario</b>.</li>" +
    "<li>Pero la fuerza de trabajo es una mercancía especial: <b>al usarla crea más valor del que cuesta</b>. Esa diferencia es la <b>plusvalía</b>, que se queda el capitalista.</li></ol>" +
    ejemplo("La plusvalía con números", "Simplificamos: no contamos máquinas ni materias primas, solo el trabajo.", [
      "Jornada de <b>8 horas</b>. Cada hora de trabajo crea <b>20 €</b> de valor, así que el obrero crea <b>160 €</b> al día.",
      "El salario (lo que cuesta mantenerle) es <b>80 €</b> al día.",
      "El obrero tarda <b>4 horas</b> en crear esos 80 € (<b>trabajo necesario</b>). Las otras <b>4 horas</b> trabaja gratis (<b>plustrabajo</b>).",
      "<b>Plusvalía = 160 − 80 = 80 €</b>. Tasa de plusvalía = plusvalía / salario = 80/80 = <b>100 %</b>."
    ]) +
    "<p>El capitalista puede aumentar la plusvalía alargando la jornada (plusvalía <i>absoluta</i>) o haciendo más productivo el trabajo con máquinas, de modo que el obrero tarde menos en producir su salario (plusvalía <i>relativa</i>). La competencia empuja a invertir en máquinas, concentra el capital en pocas manos y provoca <b>crisis</b> periódicas de sobreproducción: para Marx, esas son las contradicciones internas que debilitan el sistema.</p>" +
    ojo("La plusvalía <b>no es un robo ilegal ni un engaño</b>: el obrero cobra lo pactado. Marx explica que la explotación es posible incluso con un intercambio «justo» según las reglas del mercado. Tampoco es sinónimo de «beneficio»: el beneficio es la forma en que el capitalista ve esa plusvalía, una vez descontados todos los costes.");

  // ---------------------------------------------------------------- 5. Comunismo y valoración
  secciones[4] =
    "<h5>Del capitalismo al comunismo, paso a paso</h5>" +
    "<p>Marx no escribió un «manual» del futuro: solo dio las líneas generales, sobre todo en el <i>Manifiesto</i> y en la <i>Crítica del programa de Gotha</i> (1875). El camino que sugiere es este:</p>" +
    "<ol><li><b>Contradicciones del capitalismo</b>: explotación, concentración del capital y crisis periódicas.</li>" +
    "<li><b>Revolución</b> del proletariado, que toma el poder político.</li>" +
    "<li><b>Dictadura del proletariado</b>: etapa de transición en la que el poder está en manos de la mayoría obrera para acabar con la resistencia de la burguesía y colectivizar los medios de producción. «Dictadura» aquí significa <b>dominio de una clase</b> (igual que se habla de «dictadura de la burguesía» en el capitalismo), no régimen de un solo hombre.</li>" +
    "<li><b>Fase inferior del comunismo</b> (lo que luego se llamó socialismo): se reparte «a cada cual según su trabajo».</li>" +
    "<li><b>Fase superior</b>: abundancia y desaparición de las clases y del Estado como instrumento de dominación. Su lema, en la traducción habitual: «de cada cual según su capacidad, a cada cual según sus necesidades».</li></ol>" +
    "<p>En esa sociedad se acaba la alienación: el trabajo vuelve a ser libre y creativo. El <i>Manifiesto</i> lo resume (traducción habitual) como una asociación en la que «el libre desarrollo de cada uno es la condición del libre desarrollo de todos».</p>" +
    w("orden", "caminocomunismo") +
    "<h5>Valoración crítica: lo que sigue vivo y lo que se discute</h5>" +
    tabla(["Aportaciones que se mantienen", "Críticas y límites"], [
      ["Mostró que las ideas, el derecho y el poder se relacionan con intereses económicos.", "Su <b>determinismo económico</b> reduce a veces la política, la cultura y la libertad individual a la economía."],
      ["Describió la alienación del trabajo, vigente hoy (precariedad, trabajo mecánico).", "Muchas predicciones no se cumplieron: la revolución no estalló en los países más industrializados y creció una amplia clase media."],
      ["Inspiró el análisis de la desigualdad, la historia económica y el sindicalismo.", "Los regímenes que se proclamaron marxistas en el siglo XX (URSS, etc.) suprimieron libertades."]
    ]) +
    ojo("Es un error muy frecuente decir «Marx fue como Stalin». Una cosa es la <b>teoría</b> de Marx (siglo XIX) y otra las <b>aplicaciones políticas</b> del siglo XX, a veces muy alejadas de lo que escribió. En la PAU, separa siempre ambas: explica a Marx y, en la valoración, puedes discutir cómo se aplicó, sin atribuirle a él lo que hicieron otros.");

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Mapa del tema: Marx y los demás autores", html:
    "<p>En el comentario de texto se pide relacionar con el autor y comparar con otro. Con Marx, las relaciones más rentables son:</p>" +
    tabla(["Autor", "Relación con Marx"], [
      ["Platón (T3)", "Para Platón, lo verdaderamente real es el mundo de las Ideas; Marx es materialista y parte de la vida material. Ambos piensan que la organización de la ciudad condiciona la vida de las personas."],
      ["Aristóteles (T4)", "Aristóteles considera natural la esclavitud; Marx la analiza como una relación de producción histórica, no natural. Ambos ven al ser humano como social."],
      ["Rousseau (T11)", "Comparten la crítica a la propiedad privada como origen de la desigualdad. Rousseau lo plantea en lo moral y político (voluntad general); Marx, con la economía y la lucha de clases."],
      ["Kant (T12)", "Kant defiende la autonomía y el deber como ley moral universal; Marx piensa que la moral es en parte ideología ligada a la clase. Los dos buscan un ser humano libre."],
      ["Hegel", "Marx hereda la dialéctica y la historia como proceso, pero invierte el idealismo: la base de la historia es material."],
      ["Nietzsche (T14)", "Ambos sospechan de la moral y la religión dominantes (para Marx, ideología de clase; para Nietzsche, moral de esclavos), pero Marx busca un cambio social colectivo y Nietzsche una transformación de los valores."]
    ]) +
    "<h5>Cuadro-resumen: lo que sostiene Marx</h5>" +
    tabla(["Ámbito", "Tesis de Marx"], [
      ["Método", "Materialismo histórico: la vida material (producción) explica la historia. Dialéctica de contradicciones."],
      ["Sociedad", "Infraestructura económica y superestructura (derecho, Estado, ideas). La ideología oculta intereses de clase."],
      ["Historia", "Modos de producción y lucha de clases. Las revoluciones surgen del choque entre fuerzas y relaciones de producción."],
      ["Economía", "Plusvalía: el beneficio nace del trabajo no pagado."],
      ["Ser humano", "Alienación en cuatro aspectos: producto, actividad, ser genérico y otros seres humanos."],
      ["Política", "Revolución proletaria, dictadura del proletariado y sociedad sin clases (comunismo)."]
    ]) });

  nuevas.push({ h: "7. Comentario de texto resuelto: el ser social determina la conciencia", html:
    "<p>El comentario de la PAU pide <b>tema, ideas, relación con el autor y comparación con otro</b>. Resolvemos uno paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Marx, <em>Prefacio a la Contribución a la crítica de la economía política</em>, 1859; traducción española habitual, que varía levemente según la edición):<br><em>«El modo de producción de la vida material condiciona el proceso de la vida social, política y espiritual en general. No es la conciencia del hombre la que determina su ser, sino, por el contrario, el ser social es el que determina su conciencia.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Marx (1818–1883), <i>Prefacio</i> de 1859, donde resume su concepción materialista de la historia. Contexto: justo antes explica que las relaciones de producción forman la «base real» sobre la que se levanta la superestructura jurídica y política.</li>" +
    "<li><b>2. Tema.</b> La relación entre la vida material (la producción) y la conciencia (las ideas): qué determina a qué.</li>" +
    "<li><b>3. Idea principal.</b> La forma en que una sociedad produce lo necesario para vivir condiciona toda su vida social, política y espiritual: no son las ideas las que moldean la realidad social, sino la realidad social la que moldea las ideas.</li>" +
    "<li><b>4. Términos y ideas secundarias.</b> (a) «Modo de producción de la vida material»: fuerzas y relaciones de producción, la infraestructura. (b) «Vida social, política y espiritual»: la superestructura (Estado, derecho, religión, moral, filosofía). (c) «Condiciona» y «determina»: relación de dependencia, no de identidad. (d) «Ser social» frente a «conciencia»: invierte el idealismo, que pone la conciencia primero.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Es la base del materialismo histórico y explica su crítica a Hegel (idealismo) y a Feuerbach (que no ve la práctica social). De aquí salen la ideología (ideas que reflejan intereses de la clase dominante), la lucha de clases y la tesis XI sobre transformar el mundo.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Hegel: para Hegel la historia es el despliegue del Espíritu y las ideas mueven la realidad; Marx invierte la relación. Con Platón: el mundo de las Ideas es lo verdaderamente real y causa del sensible; para Marx, las ideas son producto de condiciones materiales. Con Kant: la razón moral es autónoma; Marx la ve condicionada por la posición de clase.</li>" +
    "<li><b>7. Valora y concluye.</b> Fue muy fecundo para entender cómo los intereses económicos influyen en las ideas (ideología). Su límite: una lectura rígida (determinismo) olvida el papel de la libertad y de las ideas, como matizó Engels; y si toda idea dependiera solo de la economía, también la teoría de Marx estaría condicionada, lo que plantea un problema sobre su pretensión de verdad.</li></ol>" +
    ojo("Errores típicos: (1) decir que Marx niega que las ideas importen; (2) escribir «el ser humano determina su conciencia» (el texto habla del <b>ser social</b>, no del individuo); (3) confundir «condiciona» con «es lo mismo que»; (4) comparar con Hegel o Platón sin explicar <b>en qué</b> difieren.") +
    "<p>Practica con los comentarios con rúbrica de los ejercicios de este tema.</p>" });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica el materialismo histórico", "Respuesta modelo:", [
      "<b>Definición.</b> Teoría según la cual la historia se explica por las condiciones materiales de producción, no por las ideas.",
      "<b>Piezas.</b> Fuerzas productivas, relaciones de producción y modo de producción.",
      "<b>Edificio social.</b> Infraestructura económica y superestructura (derecho, Estado, ideas).",
      "<b>Cambio.</b> Las contradicciones entre fuerzas y relaciones de producción provocan revoluciones y nuevos modos (esclavista, feudal, capitalista).",
      "<b>Relación.</b> Invierte el idealismo de Hegel y supera el materialismo contemplativo de Feuerbach."
    ]) +
    ejemplo("Pregunta 2. La alienación en Marx", "Respuesta modelo:", [
      "<b>Definición.</b> El trabajador se vuelve extraño a su trabajo, a lo que produce y a sí mismo.",
      "<b>Cuatro aspectos.</b> Respecto al producto, a la actividad, al ser genérico y a los demás.",
      "<b>Causa.</b> Propiedad privada de los medios de producción y división del trabajo.",
      "<b>Superación.</b> Abolición de esa propiedad en una sociedad sin clases.",
      "<b>Relación.</b> Toma de Hegel y Feuerbach la idea de alienación, pero la ve económica, no religiosa."
    ]) +
    ejemplo("Pregunta 3. Ideología y superestructura", "Respuesta modelo:", [
      "<b>Superestructura.</b> Derecho, Estado, religión, moral, arte y filosofía, sobre la base económica.",
      "<b>Ideología.</b> Ideas que presentan los intereses de la clase dominante como universales.",
      "<b>Ejemplo.</b> Religión consoladora («opio del pueblo») que hace soportable la miseria sin cambiarla.",
      "<b>Matiz.</b> Engels: la base es determinante «en última instancia» y la superestructura influye de vuelta."
    ]) +
    ejemplo("Pregunta 4. Lucha de clases, plusvalía y sociedad sin clases", "Respuesta modelo:", [
      "<b>Clases.</b> Burguesía (posee medios de producción) y proletariado (solo fuerza de trabajo).",
      "<b>Plusvalía.</b> Diferencia entre el valor creado por el trabajo y el salario; fuente del beneficio.",
      "<b>Revolución.</b> Las contradicciones del capitalismo llevan a la revolución proletaria y a la dictadura del proletariado.",
      "<b>Meta.</b> Comunismo: sin clases, sin propiedad privada de los medios de producción, trabajo libre.",
      "<b>Valoración.</b> Vigencia del análisis de la desigualdad; límites: determinismo y aplicaciones del siglo XX."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf13a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
