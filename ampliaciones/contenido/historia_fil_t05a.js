/* ============================================================
   Historia de la Filosofía · ampliaciones · Tema 5: El helenismo (estoicismo, epicureísmo y escepticismo)
   (parte A: teoría. Parte B, historia_fil_t05b.js: ejercicios, actividades, ficha de un vistazo y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Por qué la filosofía se vuelve «terapia»: de la polis a los reinos helenísticos → sección 1 + pregunta PAU.
   2. Estoicismo: lo que depende y lo que no depende de nosotros (Epicteto), logos y destino → sección 2 + fragmento comentado.
   3. Apatía estoica ≠ insensibilidad; vivir conforme a la naturaleza y la razón → sección 2 (ojo) + encuentra el error.
   4. Epicureísmo: placer ≠ desenfreno; clasificación de los deseos → sección 3 + clasificar.
   5. Ataraxia y aponía; el argumento sobre la muerte → sección 3 + comentario resuelto de la Carta a Meneceo + ordenar.
   6. Escepticismo: epojé, afasia y ataraxia; Pirrón y Sexto Empírico; no es «no creer en nada» → sección 4.
   7. Comparación de las tres escuelas (camino y meta) y rasgo común → secciones 5 y 6 + emparejar.
   8. Atomismo de Epicuro (Demócrito) frente al providencialismo estoico → secciones 3 y 6.
   9. Ecos posteriores: Séneca y Marco Aurelio, Lucrecio, Sexto Empírico, Montaigne/Hume → secciones 2, 3, 4 y 6.
   10. Comentario de texto: cómo se comenta un fragmento helenístico → comentario resuelto y rúbricas.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "historia_fil/t5/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Del mundo de la polis al mundo helenístico
  secciones[0] =
    "<h5>Qué es el «helenismo» y cuándo ocurre</h5>" +
    "<p>Alejandro Magno (356–323 a. C.) conquistó en pocos años desde Grecia hasta Egipto y la India. Cuando murió, en 323 a. C., su imperio se repartió entre sus generales y nacieron grandes reinos: el de los Ptolomeos en Egipto (con capital en Alejandría), el de los Seléucidas en Asia y el de los Antigónidas en Macedonia. A esa época, en que la cultura griega se extiende por todo el Mediterráneo oriental, se le llama <b>época helenística</b>. Suele darse como final la batalla de Accio (31 a. C.), cuando Roma domina ya todo el Mediterráneo. Aristóteles (384–322 a. C.) murió un año después que Alejandro: por eso el tema 4 cierra la filosofía «clásica» y este tema abre la helenística.</p>" +
    "<h5>Qué cambia para una persona normal</h5>" +
    "<p>Imagina que has crecido en una ciudad pequeña donde conoces a todos y tu voto cuenta en la asamblea. De pronto la ciudad pasa a formar parte de un reino enorme: las leyes, la guerra y los impuestos se deciden lejos, por un rey y su ejército, y tú no pintas nada. Es lo que le pasó al ciudadano griego. Antes, Platón y Aristóteles pensaban sobre <em>cómo debe organizarse la comunidad</em> (el Estado ideal, la política de la polis). Ahora esa pregunta casi no tiene sentido: no puedes cambiar el Estado. Queda otra pregunta mucho más personal: <b>¿cómo puedo vivir bien yo, aunque el mundo vaya mal y no dependa de mí?</b></p>" +
    "<p>Además, el mundo se hace <b>cosmopolita</b>: se mezclan griegos, egipcios, persas y judíos en ciudades enormes como Alejandría. Ya no basta con ser «ciudadano de Atenas»; empieza a abrirse paso la idea de ser ciudadano del mundo (<i>kosmopolítes</i>), que usarán sobre todo los estoicos.</p>" +
    "<h5>Las escuelas y dónde se enseñaba</h5>" +
    "<p>La Academia (Platón) y el Liceo (Aristóteles) siguen funcionando, pero aparecen tres corrientes nuevas, que son las que se estudian aquí. Dos de ellas tenían su lugar en Atenas, y de ahí vienen sus nombres:</p>" +
    tabla(["Escuela", "Fundador", "Lugar (nombre popular)", "Fechas del fundador"], [
      ["Estoicismo", "Zenón de Citio (Chipre)", "<i>Stoa poikíle</i>, el «Pórtico pintado» (de ahí «estoicos»), hacia 301 a. C.", "h. 334–262 a. C."],
      ["Epicureísmo", "Epicuro (nacido en Samos)", "El <b>Jardín</b>, una casa con huerto, hacia 306 a. C.", "341–270 a. C."],
      ["Escepticismo", "Pirrón de Elis", "No tuvo una escuela estable en Atenas; sus ideas las recogió su discípulo Timón y, siglos después, Sexto Empírico", "h. 365–275 a. C."]
    ]) +
    ojo("Cuidado con el orden: Pirrón (h. 365–275) es de la generación de Zenón y Epicuro, no posterior. Lo que sí es posterior es la <b>sistematización</b> del escepticismo: Sexto Empírico (hacia el siglo II d. C.) es quien nos dejó las obras que conservamos.") +
    "<p>Una anécdota muy repetida (tradición, no dato seguro) lo resume: Alejandro visitó a Diógenes el Cínico, que vivía en un tonel, y le preguntó qué quería; Diógenes le contestó: «Apártate, que me tapas el sol». El filósofo helenístico ya no pide nada al poderoso: busca su libertad interior.</p>";

  // ---------------------------------------------------------------- 2. Estoicismo
  secciones[1] =
    "<h5>Tres partes de la filosofía estoica</h5>" +
    "<p>Los estoicos dividían la filosofía en <b>lógica</b>, <b>física</b> y <b>ética</b>, y comparaban el conjunto con un huerto: la lógica es la valla, la física el árbol y la ética el fruto. Lo que interesa en la PAU es sobre todo cómo la física sostiene la ética.</p>" +
    "<h5>La física: un cosmos racional y providente</h5>" +
    "<p>Para los estoicos el universo es <b>un único ser vivo y racional</b>. Todo está penetrado por el <b>logos</b> (razón), que también llaman Dios, <i>Providencia</i>, <i>Destino</i> o <i>Naturaleza</i>. Es un panteísmo materialista: no hay un Dios fuera del mundo; el logos es un soplo cálido (<i>pneuma</i>) que lo impregna todo. De Heráclito (tema 1) toman el <i>logos</i> y el fuego como principio. Y como todo lo gobierna la razón, todo lo que ocurre <b>ocurre por necesidad</b>, y de la mejor manera posible: es el <b>determinismo</b> o fatalismo estoico. Los acontecimientos están encadenados por causas y nada es fruto del azar.</p>" +
    "<p>Esto parece dejar sin sitio a la libertad. Crisipo (h. 280–206 a. C.) responde con una imagen: si empujas un cilindro, rueda por su forma, no solo por tu empujón. El destino «empuja», pero <b>cómo reacciono yo ante lo que pasa</b> depende de mi carácter y mis juicios, y ahí está mi libertad.</p>" +
    "<h5>La ética: lo que depende y lo que no depende de nosotros</h5>" +
    "<p>Aquí está la idea que más te servirá en un comentario. Epicteto, un esclavo liberado que acabó enseñando filosofía (h. 50–135 d. C.), la formula al comienzo de su <i>Manual</i> (<i>Enquiridión</i>): unas cosas <b>dependen de nosotros</b> y otras <b>no dependen de nosotros</b>.</p>" +
    tabla(["Depende de nosotros", "No depende de nosotros"], [
      ["Mis juicios y opiniones, mis deseos, mis decisiones, cómo reacciono", "El cuerpo, la salud, la riqueza, la fama, lo que piensen o hagan los demás, la muerte"],
      ["Es mío: nadie me lo puede quitar", "Es «ajeno»: la fortuna o el destino lo dan y lo quitan"],
      ["Aquí pongo mi esfuerzo", "Aquí practico la aceptación"]
    ]) +
    ejemplo("Ejemplo cotidiano: el examen", "Estás a punto de hacer un examen importante.", [
      "<b>Depende de ti:</b> cuánto has estudiado, cómo duermes la noche anterior, cómo respondes con calma durante la prueba.",
      "<b>No depende de ti:</b> qué preguntas ponen, cómo corrige el profesor, si alguien tose durante la prueba.",
      "<b>Actitud estoica:</b> prepararte a fondo en lo primero y no angustiarte por lo segundo. Si sale mal por algo ajeno a ti, lo aceptas sin hundirte."
    ]) +
    "<p>La <b>virtud</b> (sabiduría, valentía, justicia y templanza, como en Platón) es el <b>único bien</b>, y consiste en vivir <b>conforme a la naturaleza y a la razón</b>: aceptar el orden del cosmos y actuar bien dentro de él. La salud, la riqueza o la fama son «indiferentes»: no son ni buenas ni malas por sí mismas; se pueden preferir, pero la felicidad no depende de ellas. Por eso el sabio estoico es <b>autosuficiente</b>: su felicidad no puede quitársela nadie. Tiene incluso una consecuencia política: si todos participamos del mismo logos, todos somos ciudadanos de una sola ciudad, el cosmos (<b>cosmopolitismo</b>), y hay una ley natural común a todos.</p>" +
    "<h5>Las pasiones y la apatía</h5>" +
    "<p>Para los estoicos las pasiones (<i>páthe</i>: miedo, deseo, dolor, placer desmedido) no son sentimientos que «nos ocurren» sin más, sino <b>juicios erróneos</b>: damos valor a algo que no depende de nosotros y por eso sufrimos. Si juzgas que perder tu móvil es una catástrofe, sufres; si juzgas que es una cosa externa, molesta pero soportable, no te hundes. La meta es la <b>apatía</b> (<i>apátheia</i>): no tener pasiones que nos perturben y vivir con serenidad.</p>" +
    ojo("Error muy común: traducir «apatía» como indiferencia, pasotismo o falta de sentimientos. El sabio estoico sí siente (ama a su familia, ayuda a los demás); lo que no tiene son pasiones <b>descontroladas</b> que le arrastran. Es serenidad, no frialdad. Segundo error: creer que «aceptar» significa quedarse parado. Hay que actuar mucho en lo que depende de nosotros.") +
    "<h5>Fragmento comentado: Epicteto</h5>" +
    "<blockquote class='cita-fil'><em>«De las cosas que existen, unas dependen de nosotros y otras no dependen de nosotros.»</em><br>— Epicteto, <i>Manual</i>, 1 (traducción española habitual; varía levemente según la edición)</blockquote>" +
    "<p><b>Tema:</b> la distinción entre lo que podemos controlar y lo que no. <b>Idea clave:</b> hay que dirigir la voluntad solo a lo primero. <b>Relación con la escuela:</b> es la aplicación práctica del logos y del destino (si lo demás está ya determinado, preocuparse es inútil). <b>Comparación:</b> los epicúreos también buscan la calma, pero la logran reduciendo deseos, no aceptando el destino.</p>" +
    "<h5>La escuela después: el estoicismo romano</h5>" +
    "<p>El estoicismo duró más de cinco siglos y se divide en etapas: antiguo (Zenón, Cleantes, Crisipo), medio y <b>romano</b>, con Séneca (h. 4 a. C.–65 d. C.), Epicteto (h. 50–135) y el emperador Marco Aurelio (121–180), autor de las <i>Meditaciones</i>. Muestra algo notable: la misma filosofía vale para un senador, un esclavo y un emperador, porque lo que enseña es a vivir, no a gobernar.</p>";

  // ---------------------------------------------------------------- 3. Epicureísmo
  secciones[2] =
    "<h5>La base: física atomista</h5>" +
    "<p>Epicuro parte de la física de Demócrito (tema 1): todo está hecho de <b>átomos y vacío</b>. Los dioses existen, pero viven en una paz perfecta y no se ocupan de los humanos. Para explicar que no todo esté determinado (si los átomos solo cayeran en línea recta, nada se combinaría ni habría libertad), añade que a veces se desvían un poco (<i>clinamen</i>, concepto que recoge el poeta romano Lucrecio, 99–55 a. C., en <i>De la naturaleza de las cosas</i>). El alma también es material (átomos finos) y <b>se disuelve al morir</b>. Esta física no es un adorno: quita de raíz los dos miedos mayores, a los dioses y a la muerte.</p>" +
    "<p>Por eso es casi lo contrario del estoicismo: no hay un logos que lo planee todo ni una providencia. El universo no tiene finalidad, y la felicidad no consiste en aceptar un plan, sino en organizar bien la propia vida.</p>" +
    "<h5>Un hedonismo muy poco desenfrenado</h5>" +
    "<p>Epicuro afirma que el <b>placer</b> es principio y fin de la vida feliz: es el hedonismo. Pero lo entiende de otro modo al de la fama popular. En su <i>Carta a Meneceo</i> aclara que no se refiere a los placeres de los libertinos, sino a <b>no sufrir en el cuerpo (<i>aponía</i>) ni estar perturbado en el alma (<i>ataraxia</i>)</b>. Distingue dos clases de placer:</p>" +
    tabla(["Placer en movimiento (cinético)", "Placer estable (catastemático)"], [
      ["Mientras se satisface un deseo: beber cuando se tiene sed", "Cuando ya no hay dolor ni inquietud: estar saciado y tranquilo"],
      ["Dura poco y deja el deseo de repetir", "Es el verdadero fin: la calma del cuerpo y del alma"]
    ]) +
    "<p>Los mejores placeres, para Epicuro, son los del espíritu: la conversación, la amistad (la tiene por lo más valioso que da la sabiduría para vivir feliz) y el conocimiento de la naturaleza. De ahí su lema <i>láthe biósas</i>: «vive oculto», lejos de la política y de las ambiciones.</p>" +
    "<h5>La clasificación de los deseos: un método para ser feliz</h5>" +
    "<p>Epicuro no manda reprimir todos los deseos: manda <b>distinguirlos</b>. Son tres tipos, y se entienden bien con ejemplos:</p>" +
    tabla(["Tipo de deseo", "Ejemplos", "Qué hacer", "Por qué"], [
      ["<b>Naturales y necesarios</b>", "Beber cuando hay sed, comer lo básico, tener techo y abrigo, tener amigos", "Satisfacerlos", "Son fáciles de cubrir y su falta produce dolor"],
      ["<b>Naturales pero no necesarios</b>", "Comida refinada, una casa lujosa, un viaje de ensueño", "Satisfacerlos con moderación, sin obsesión", "Varían el placer pero no lo aumentan; si faltan, no duele"],
      ["<b>Ni naturales ni necesarios</b>", "Fama, poder, riqueza excesiva", "Evitarlos", "Son infinitos y no se calman nunca; producen ansiedad"]
    ]) +
    ejemplo("Aplicación cotidiana", "Tienes hambre y te gusta un restaurante caro.", [
      "Comer algo es <b>natural y necesario</b>: no hay discusión.",
      "Que sea un menú de lujo es <b>natural pero no necesario</b>: una vez al año, bien; vivir pendiente de ello, no.",
      "Querer que todos vean en redes que has ido es <b>ni natural ni necesario</b>: genera una ansiedad que no tiene fin. Epicuro diría que te la ahorres."
    ]) +
    ojo("Error muy común: pensar que el epicureísmo defiende «darse todos los gustos». Es lo contrario: busca el placer que no trae sufrimiento después, y por eso manda limitar los deseos. Dicho en una frase: <b>el placer de Epicuro es la tranquilidad, no la juerga</b>.") +
    w("clasificar", "deseos") +
    "<h5>Liberarse del miedo a los dioses y a la muerte: el «tetrafármaco»</h5>" +
    "<p>La tradición epicúrea resume el remedio en cuatro frases, llamadas <b>cuádruple remedio</b> (<i>tetrafármaco</i>): (1) a los dioses no hay que temerlos, (2) a la muerte no hay que temerla, (3) el bien es fácil de conseguir, (4) el mal es fácil de soportar. El argumento sobre la muerte es el más célebre y el que más cae: <b>«mientras nosotros existimos, la muerte no está presente; cuando la muerte está presente, nosotros ya no existimos»</b>. Como todo bien y todo mal residen en la sensación y la muerte es la privación de toda sensación, no puede afectarnos. Lo tienes paso a paso en el comentario resuelto de más abajo.</p>" +
    "<p>Los criterios de verdad del epicureísmo (su «canónica») son las <b>sensaciones</b>, las <i>anticipaciones</i> (ideas generales formadas por repetición) y los afectos (placer y dolor). Es, por tanto, una filosofía <b>empirista</b>, al contrario que Platón.</p>";

  // ---------------------------------------------------------------- 4. Escepticismo
  secciones[3] =
    "<h5>De dónde sale el escepticismo</h5>" +
    "<p>Pirrón de Elis (h. 365–275 a. C.) acompañó a Alejandro hasta la India y allí conoció a sabios que vivían con enorme serenidad. Volvió convencido de que las escuelas filosóficas se contradicen unas a otras sin parar, y de que lo prudente es no decidir. No escribió nada: lo que sabemos viene de su discípulo Timón de Fliunte y, sobre todo, de <b>Sexto Empírico</b> (hacia el siglo II d. C.), cuyas <i>Hipotiposis pirrónicas</i> son la mejor exposición antigua. Además, la propia Academia de Platón pasó por una etapa escéptica (Arcesilao y Carnéades) en los siglos III–II a. C.</p>" +
    "<p>«Escéptico» viene de <i>sképtomai</i>, «examinar»: el escéptico es el que sigue investigando y no da nada por cerrado.</p>" +
    "<h5>Los tres pasos: equipolencia, epojé, ataraxia</h5>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Equipolencia.</b> Para cada argumento hay otro igual de fuerte en sentido contrario. Los escépticos reunían <b>tropos</b> (modos) para mostrarlo: lo que perciben los animales distinto de lo que percibimos nosotros, lo que cambia con la costumbre de cada pueblo, lo que sabe distinto según el estado de la persona…</li>" +
    "<li><b>Epojé.</b> Ante ese empate no se afirma ni se niega: se «suspende el juicio». Se dice «no más esto que aquello», o «me parece» en vez de «es».</li>" +
    "<li><b>Ataraxia.</b> Y la calma llega «como la sombra sigue al cuerpo»: quien ya no necesita encontrar la verdad deja de angustiarse por ella.</li></ol>" +
    ejemplo("Un ejemplo cotidiano", "Dos amigos discuten si una película es buena.", [
      "Cada uno tiene argumentos y ninguno convence al otro.",
      "El dogmático se enfada y quiere que el otro admita que se equivoca.",
      "El escéptico dice: «Me parece buena; a ti te parece mala; no necesito decidir quién tiene razón» y se queda tranquilo."
    ]) +
    ojo("Error muy común: decir que el escéptico «no cree en nada» o que «niega que exista la verdad». Eso sería otro dogma (afirmar que no se puede saber nada). El escéptico <b>no afirma ni niega</b>: suspende el juicio y sigue investigando. Además, sí actúa y vive: se guía por las apariencias, las costumbres y las necesidades naturales, sin afirmar que sean verdad absoluta.") +
    "<p>Un matiz de vocabulario: en la tradición escéptica el resultado práctico de la epojé se llama <i>afasia</i> (no pronunciarse). Y su <b>ataraxia</b> es la misma palabra que usan los epicúreos, pero se alcanza por un camino opuesto: ellos limitan los deseos; el escéptico limita las pretensiones de saber.</p>" +
    "<p><b>Legado:</b> el escepticismo reaparece en el Renacimiento (Montaigne) y en la modernidad (Descartes lo usa como método, pero para vencerlo; Hume lo toma muy en serio al hablar de la causalidad).</p>";

  // ---------------------------------------------------------------- 5. Rasgo común
  secciones[4] =
    "<h5>La filosofía como medicina del alma</h5>" +
    "<p>Epicuro lo dijo con claridad en un pensamiento que la tradición le atribuye: vana es la palabra del filósofo que no cura ningún sufrimiento humano; igual que la medicina no sirve si no expulsa las enfermedades del cuerpo, tampoco la filosofía si no expulsa el sufrimiento del alma. Las tres corrientes coinciden en <b>tres rasgos</b>:</p>" +
    "<ul><li><b>Meta práctica:</b> la felicidad como tranquilidad (<i>ataraxia</i>, <i>apatía</i>), no el saber por el saber.</li>" +
    "<li><b>Individualismo:</b> el sabio se basta a sí mismo; la política pasa a un segundo plano.</li>" +
    "<li><b>Método de vida:</b> ejercicios y hábitos (examinar los propios juicios, limitar deseos, suspender opiniones), no solo teorías.</li></ul>" +
    "<p>Y comparten el <b>enemigo</b>: la angustia por lo que no controlamos. Cambia el camino. Al estoico le dices «acepta el orden del cosmos»; al epicúreo, «reduce tus deseos y no temas ni a los dioses ni a la muerte»; al escéptico, «deja de buscar certezas absolutas». Hay un cuadro comparativo completo en el apartado siguiente.</p>";

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Cuadro comparativo y mapa del tema", html:
    "<p>La pregunta más frecuente en este tema es comparar escuelas, o una escuela con otro autor del temario. Memoriza este cuadro: sale más de lo que parece.</p>" +
    tabla(["", "Estoicismo", "Epicureísmo", "Escepticismo"], [
      ["Fundador", "Zenón de Citio (h. 334–262 a. C.)", "Epicuro (341–270 a. C.)", "Pirrón de Elis (h. 365–275 a. C.)"],
      ["Lugar", "Pórtico (<i>Stoa</i>)", "Jardín", "Sin escuela estable"],
      ["Idea del mundo", "Cosmos racional, <i>logos</i>, providencia y destino", "Átomos y vacío; sin providencia", "No podemos conocer cómo es"],
      ["Idea del alma", "Material, parte del logos divino", "Material, de átomos; muere con el cuerpo", "No se pronuncia"],
      ["Felicidad", "Vivir conforme a la naturaleza y a la razón (virtud)", "Placer estable: ausencia de dolor y de inquietud", "Tranquilidad por la suspensión del juicio"],
      ["Camino", "Aceptar lo que no depende de nosotros; dominar las pasiones", "Limitar los deseos a los naturales y necesarios; amistad", "<i>Epojé</i>: ni afirmar ni negar"],
      ["Meta", "Apatía (serenidad)", "Ataraxia y aponía", "Ataraxia"],
      ["Muerte", "Parte del orden natural: se acepta", "No es nada para nosotros", "No afirma nada sobre ella"],
      ["Política", "Cosmopolitismo; el sabio puede participar (Séneca, Marco Aurelio)", "Vive oculto: «láthe biósas»", "Sigue las costumbres sin creer en ellas"]
    ]) +
    "<h5>Relaciones con otros autores</h5>" +
    tabla(["Autor", "Relación con el helenismo"], [
      ["Heráclito (T1)", "Los estoicos recuperan su <i>logos</i> y el fuego."],
      ["Demócrito (T1)", "Epicuro adopta su atomismo, pero introduce el <i>clinamen</i> para salvar la libertad."],
      ["Sócrates y Platón (T2-T3)", "Los estoicos retoman la virtud como conocimiento; el sabio es libre y autosuficiente. Los escépticos de la Academia recuperan la ignorancia socrática."],
      ["Aristóteles (T4)", "Los helenísticos dejan atrás la política de la polis y la teoría pura; Aristóteles pensaba en la comunidad, ellos en el individuo."],
      ["Agustín de Hipona (T6)", "Hereda ideas estoicas y platónicas (ley natural, providencia) y combate el escepticismo."],
      ["Descartes (T9) y Hume", "Descartes usa la duda escéptica pero para vencerla; Hume la toma muy en serio."],
      ["Kant (T12)", "Su ética del deber y de la razón recuerda al estoicismo (obrar conforme a la razón, no a las inclinaciones)."],
      ["Nietzsche (T14)", "Critica la moral de la resignación; aprecia en Epicuro que no teme a la vida."]
    ]) +
    "<p>Los números de tema son los de la ruta de este curso: lo importante es la idea de cada relación." +
    " Fórmula para recordarlo: <b>estoico = acepta</b>, <b>epicúreo = limita</b>, <b>escéptico = suspende</b>.</p>" +
    w("emparejar", "escuelas") });

  nuevas.push({ h: "7. Comentario de texto resuelto: Epicuro y la muerte", html:
    "<p>En la PAU se pide comentar un fragmento breve: <b>tema, ideas, relación con el autor y comparación con otro</b>. Aquí tienes uno resuelto paso a paso.</p>" +
    "<blockquote class='cita-fil'><b>Texto</b> (Epicuro, <em>Carta a Meneceo</em>; traducción española habitual, que varía levemente según la edición):<br><em>«Acostúmbrate a pensar que la muerte no es nada para nosotros, puesto que todo bien y todo mal residen en la sensación, y la muerte es privación de sensación. [...] Mientras nosotros existimos, la muerte no está presente, y cuando la muerte está presente, entonces nosotros ya no existimos.»</em></blockquote>" +
    "<ol class='lam-pasos'>" +
    "<li><b>1. Localiza el texto.</b> Epicuro (341–270 a. C.), fundador del Jardín en Atenas. La <i>Carta a Meneceo</i> es una carta de enseñanza práctica sobre cómo vivir feliz, y es la mejor fuente de su ética.</li>" +
    "<li><b>2. Tema.</b> La inutilidad del miedo a la muerte.</li>" +
    "<li><b>3. Idea principal.</b> La muerte no puede afectarnos, porque cuando ella está presente nosotros no estamos, y mientras estamos, ella no está.</li>" +
    "<li><b>4. Estructura del argumento.</b> (a) Todo bien y todo mal están en la sensación. (b) La muerte es la ausencia de sensación. (c) Luego la muerte no es ni un bien ni un mal para nosotros. (d) Nunca coinciden el que sufre y la muerte. (e) Por tanto, temerla no tiene sentido.</li>" +
    "<li><b>5. Relaciona con el autor.</b> Encaja con su atomismo (el alma es material y se disuelve), con su empirismo (lo bueno y lo malo se sienten) y con su meta, la ataraxia: quitarse el miedo a la muerte es una de las dos grandes liberaciones del tetrafármaco, junto a la de los dioses.</li>" +
    "<li><b>6. Compara con otro autor.</b> Con Platón (T3): para Platón el alma es inmortal y filosofar es «prepararse para morir»; Epicuro niega la inmortalidad y por eso la muerte no asusta. Con los estoicos: ellos aceptan la muerte como parte del logos; Epicuro la considera simplemente nada.</li>" +
    "<li><b>7. Valora y concluye.</b> Es un consuelo racional, con aplicación actual (la serenidad ante el final). Objeción clásica: la muerte puede ser un mal por privarnos de los bienes que habríamos tenido; el argumento de Epicuro no habla de morir, sino de «estar muerto».</li></ol>" +
    ojo("Errores típicos al comentar: (1) decir que Epicuro «niega la muerte» (no la niega: dice que no hay que temerla); (2) olvidar que el argumento se apoya en que el alma es material; (3) confundir «ataraxia» con «apatía» (la primera es epicúrea y escéptica, la segunda estoica); (4) comparar sin decir en qué difieren.") +
    w("orden", "muerte") });

  nuevas.push({ h: "8. Cómo se pregunta en la PAU y cómo responder", html:
    "<p>Preguntas típicas y respuesta modelo en forma de esquema. El orden de una buena respuesta es siempre: <b>definir → explicar → relacionar → concluir</b>.</p>" +
    ejemplo("Pregunta 1. Explica por qué la filosofía helenística se centra en la felicidad individual", "Respuesta modelo, en cuatro movimientos:", [
      "<b>Contexto.</b> Tras Alejandro (323 a. C.) las polis pierden autonomía; el individuo ya no controla el Estado.",
      "<b>Giro.</b> De la teoría del cosmos y del Estado (Platón, Aristóteles) a la pregunta práctica: ¿cómo vivir en paz?",
      "<b>Tres respuestas.</b> Aceptación (estoicos), placer sereno (epicúreos), suspensión del juicio (escépticos).",
      "<b>Rasgo común.</b> Filosofía como terapia del alma: la meta es la tranquilidad."
    ]) +
    ejemplo("Pregunta 2. Compara el estoicismo y el epicureísmo", "Respuesta modelo:", [
      "<b>Coinciden:</b> felicidad como serenidad (apatía/ataraxia), autosuficiencia del sabio, filosofía práctica.",
      "<b>Mundo:</b> logos y providencia frente a átomos y vacío.",
      "<b>Camino:</b> aceptar lo que no depende de nosotros frente a limitar deseos y buscar placer estable.",
      "<b>Muerte:</b> parte del orden natural frente a «no es nada para nosotros».",
      "<b>Valoración:</b> uno exige fortaleza ante el destino; el otro, prudencia en los deseos."
    ]) +
    ejemplo("Pregunta 3. Explica la clasificación de los deseos y la ataraxia en Epicuro", "Respuesta modelo:", [
      "Tres tipos: naturales y necesarios, naturales no necesarios, ni naturales ni necesarios.",
      "Qué hacer con cada uno: satisfacer, moderar, evitar. Con un ejemplo de cada.",
      "Ataraxia y aponía: placer estable, ausencia de dolor y de inquietud.",
      "Tetrafármaco: miedo a los dioses y a la muerte.",
      "Matiz: el hedonismo epicúreo no es desenfreno."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1") });

  B.parte.hf5a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
