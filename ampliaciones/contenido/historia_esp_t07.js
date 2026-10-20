/* ============================================================
   Historia de España · ampliaciones
   Tema 7: La Restauración borbónica (1874-1902)
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var H = B.h, ojo = H.ojo;
  var NS = "http://www.w3.org/2000/svg";
  function w(nombre, ref) { return H.w(nombre, ref && "historia_esp/t7/" + ref); }
  function svg(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }

  // ============================================================
  // TEORÍA (se añade al final de cada sección existente)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Antes de Sagunto: por qué se «restaura» la monarquía</h5>" +
    "<p>Entre 1868 y 1874, en el <b>Sexenio Democrático</b>, España lo probó casi todo: la Revolución de 1868 destronó a Isabel II, hubo una monarquía democrática con Amadeo de Saboya (1871-1873) y después la Primera República (1873-1874), todo ello en medio de la tercera guerra carlista, de la insurrección cantonal y de la guerra de Cuba (iniciada en 1868). A los grandes propietarios, a la Iglesia y al ejército aquello les parecía puro caos. La Restauración nace para ofrecerles <b>orden y estabilidad</b>.</p>" +
    "<p>El plan de Cánovas era devolver el trono a los Borbones por una vía que <em>no</em> pareciera un simple golpe militar, sino la voluntad del país. En diciembre de 1874, Alfonso, hijo de Isabel II y con solo 17 años, firmó desde la academia militar británica de Sandhurst un manifiesto redactado por Cánovas, en el que se presentaba como un rey constitucional, católico y conciliador. Pocos días después, el <b>29 de diciembre</b>, el general Martínez Campos se pronunció en Sagunto y lo proclamó rey. Alfonso XII llegó a España en enero de 1875.</p>" +
    "<h5>El periodo de un vistazo</h5>" +
    "<p>Antes de entrar al detalle, recorre la línea del tiempo de 1874 a 1902. Toca cada hecho para ver qué pasó y por qué importa; los colores separan política, guerras, sociedad y nacionalismos.</p>" +
    w("linea", "linea1");

  secciones[1] =
    "<h5>La Constitución de 1876 en seis ideas</h5>" +
    "<ol><li><b>Soberanía compartida</b> entre el Rey y las Cortes (no la soberanía nacional de 1869).</li>" +
    "<li><b>Cortes bicamerales</b>: Congreso de los Diputados (elegido) y Senado (una parte por derecho propio o vitalicio, y otra electiva).</li>" +
    "<li><b>Amplios poderes de la Corona</b>: nombra y cesa a los ministros, puede disolver las Cortes y sanciona las leyes.</li>" +
    "<li><b>Confesionalidad católica</b> con tolerancia privada de otros cultos (art. 11).</li>" +
    "<li><b>Derechos reconocidos, pero desarrollados por leyes ordinarias</b>: el sufragio, por ejemplo, no queda fijado en la Constitución y cambia según quién gobierne.</li>" +
    "<li><b>Flexibilidad</b>: cabían conservadores y liberales sin tener que reformarla, y por eso duró 47 años, hasta 1923.</li></ol>" +
    "<div class='cita'><p>«La religión católica, apostólica, romana, es la del Estado. La Nación se obliga a mantener el culto y sus ministros. Nadie será molestado en territorio español por sus opiniones religiosas, ni por el ejercicio de su respectivo culto, salvo el respeto debido a la moral cristiana. No se permitirán, sin embargo, otras ceremonias ni manifestaciones públicas que las de la religión del Estado.»</p><cite>Constitución de 1876, artículo 11</cite></div>" +
    "<h5>Cómo se comenta una fuente como esta</h5>" +
    "<ol><li><b>Clasifica</b>: ¿qué tipo de texto es (jurídico, político, periodístico…)? ¿Primario o secundario? ¿Quién lo escribe, cuándo y con qué intención?</li>" +
    "<li><b>Idea principal y análisis</b>: ¿qué dice? Resúmelo con tus palabras y señala las ideas clave.</li>" +
    "<li><b>Contextualiza</b>: ¿en qué momento se escribe y qué lo explica?</li>" +
    "<li><b>Conclusión</b>: ¿qué importancia tuvo y qué consecuencias?</li></ol>" +
    "<p>Pon en práctica la guía con este mismo artículo en el ejercicio de <b>comentario guiado</b> (pestaña Ejercicios): te dará la lista de puntos que debería tener tu comentario.</p>";

  secciones[2] =
    "<h5>El turno en imagen</h5>" +
    "<p>Mira quién gobierna cada año. Fíjate en lo regular que es la alternancia: no hay ninguna crisis política que la explique, y eso es precisamente lo que revela que estaba <b>pactada</b>.</p>" +
    w("turno") +
    "<h5>Lo que dice la ley y lo que ocurría</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Soberanía compartida</td><td>El rey elegía al presidente del gobierno, y <em>después</em> se «hacían» las elecciones para darle mayoría.</td></tr>" +
    "<tr><td>Cortes representativas</td><td>Las mayorías estaban pactadas antes de votar.</td></tr>" +
    "<tr><td>Competencia entre partidos</td><td>Dos partidos de notables, con intereses sociales casi idénticos, que se turnaban.</td></tr>" +
    "<tr><td>Elecciones libres</td><td>Fraude sistemático, sobre todo en el campo.</td></tr>" +
    "</tbody></table>" +
    "<p>Hay un momento clave en el que el sistema estuvo a punto de romperse: la muerte prematura de Alfonso XII, el <b>25 de noviembre de 1885</b>, sin heredero varón (Alfonso XIII nacería meses después, en mayo de 1886). Cánovas y Sagasta firmaron entonces el <b>Pacto del Pardo</b>: Cánovas cedía el gobierno a Sagasta y ambos se comprometían a respetar la regencia de María Cristina y a seguir turnándose. Los liberales gobernaron hasta 1890 (el llamado <b>«Parlamento largo»</b>) y aprobaron reformas que ampliaban derechos: Ley de Asociaciones (1887), Ley del Jurado (1888), Código Civil (1889) y <b>sufragio universal masculino</b> (1890).</p>" +
    ojo("el sufragio universal masculino de 1890 no democratizó el sistema: el caciquismo seguía controlando el voto, así que hubo más electores, pero no más libertad al votar.");

  secciones[3] =
    "<h5>Una pirámide de favores</h5>" +
    "<p>El caciquismo no era un invento de unos cuantos corruptos: era una <b>estructura</b> que unía Madrid con cada pueblo. Toca cada piso de la pirámide:</p>" +
    w("piramide") +
    "<h5>Cómo se «fabricaba» una elección</h5>" +
    "<p>El proceso seguía siempre los mismos pasos. Ponlos en orden:</p>" +
    w("orden", "proceso") +
    "<h5>Vocabulario imprescindible</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Encasillado</td><td>Lista de candidatos que el Ministerio de la Gobernación asignaba a cada distrito antes de las elecciones.</td></tr>" +
    "<tr><td>Pucherazo</td><td>Manipulación de las actas o de los votos para dar el resultado previsto.</td></tr>" +
    "<tr><td>Cunero</td><td>Candidato sin ninguna relación con el distrito, impuesto desde Madrid.</td></tr>" +
    "<tr><td>Votos «de los muertos»</td><td>Votos emitidos a nombre de personas fallecidas.</td></tr>" +
    "<tr><td>Oligarquía y caciquismo</td><td>Expresión de Joaquín Costa (1901): los políticos de Madrid (oligarquía) y la red local que les daba los votos (caciquismo).</td></tr>" +
    "</tbody></table>";

  secciones[4] =
    "<h5>De Zanjón al Grito de Baire: cómo se llegó a la guerra</h5>" +
    "<p>La <b>Paz de Zanjón</b> (1878) puso fin a la guerra de los Diez Años, pero no resolvió los problemas de fondo de Cuba: la falta de autonomía política y la esclavitud, que no se abolió hasta 1886. En <b>febrero de 1895</b> estalló de nuevo la insurrección (el <b>Grito de Baire</b>), organizada por el Partido Revolucionario Cubano de José Martí, con Máximo Gómez y Antonio Maceo al mando de las fuerzas. España envió a Cuba al general <b>Weyler</b> (1896), que aplicó una dura estrategia de guerra, incluida la «reconcentración» de la población rural, y fue duramente criticado en el extranjero.</p>" +
    "<p>Estados Unidos, con grandes intereses económicos en la isla (azúcar y comercio) y con una prensa sensacionalista que atizaba la opinión pública, vigilaba el conflicto. El <b>15 de febrero de 1898</b> el acorazado estadounidense <em>Maine</em> explotó en el puerto de La Habana, con más de 250 marinos muertos. EE. UU. culpó a España y, en abril, declaró la guerra.</p>" +
    "<p>La guerra fue breve y desigual. El <b>1 de mayo</b> la escuadra española de Montojo fue destruida en <b>Cavite</b> (Filipinas) y el <b>3 de julio</b> la de Cervera, al salir de <b>Santiago de Cuba</b>. Por el <b>Tratado de París</b> (10 de diciembre de 1898), España renunció a Cuba y cedió a EE. UU. <b>Puerto Rico, Guam y Filipinas</b>. En 1899 vendió a Alemania las islas Carolinas, Marianas y Palaos.</p>" +
    "<h5>Consecuencias: más allá del mapa</h5>" +
    "<ul><li><b>Económicas</b>: pérdida de mercados coloniales protegidos y regreso de capitales desde las colonias, que animaron la inversión en la Península.</li>" +
    "<li><b>Políticas y militares</b>: el sistema de la Restauración sobrevivió, pero muy desprestigiado; creció el malestar del ejército hacia los políticos y la prensa.</li>" +
    "<li><b>Ideológicas y culturales</b>: <b>regeneracionismo</b> (Joaquín Costa: «escuela y despensa», «doble llave al sepulcro del Cid») y <b>Generación del 98</b> (Unamuno, Azorín, Baroja, Machado…).</li>" +
    "<li><b>Nacionalismos periféricos</b>: se refuerza la crítica al Estado central, sobre todo en Cataluña y el País Vasco.</li></ul>" +
    "<p>Ahora clasifica tú: ¿es una causa o una consecuencia del Desastre?</p>" +
    w("clasificar", "clas98");

  // ============================================================
  // SECCIONES NUEVAS
  // ============================================================
  var nuevas = [
    {
      h: "5. Los que quedaban fuera del sistema",
      html:
        "<p>El turnismo y el caciquismo dejaban sin voz real a todos los que no eran notables de alguno de los dos partidos dinásticos. Fuera del sistema quedaban:</p>" +
        "<ul><li><b>Republicanos</b>: divididos tras el fracaso de 1873-74 y poco representados por el fraude.</li>" +
        "<li><b>Carlistas</b>: derrotados en 1876, mantuvieron su base social, sobre todo en el norte.</li>" +
        "<li><b>Movimiento obrero</b>: el <b>PSOE</b> (Pablo Iglesias, 1879) y la <b>UGT</b> (1888) por la vía socialista; y el <b>anarquismo</b>, muy extendido entre jornaleros andaluces y obreros catalanes.</li>" +
        "<li><b>Nacionalismos periféricos</b>: en Cataluña, las <b>Bases de Manresa</b> (1892); en el País Vasco, el <b>PNV</b> (1895) de Sabino Arana.</li></ul>" +
        "<p>Pon a prueba tus asociaciones: une cada personaje con su papel.</p>" +
        w("emparejar", "emp1")
    },
    {
      h: "6. Esquema para un tema de desarrollo",
      html:
        "<p>Si te piden «La Restauración borbónica (1874-1902)» en un examen, no escribas todo lo que sabes: <b>organízalo</b>. Un esquema que funciona:</p>" +
        "<ol><li><b>Introducción</b> (2-3 líneas): el contexto del Sexenio, las fechas clave (1874-1902) y la idea central: un sistema de estabilidad para las élites.</li>" +
        "<li><b>Los inicios</b>: Sandhurst, Sagunto, Alfonso XII y Cánovas, y la Constitución de 1876.</li>" +
        "<li><b>El funcionamiento</b>: turnismo (Cánovas y Sagasta, Pacto del Pardo) y caciquismo (encasillado, pucherazo, pirámide).</li>" +
        "<li><b>Oposición al sistema</b>: republicanos, carlistas, movimiento obrero y nacionalismos.</li>" +
        "<li><b>La crisis del 98</b>: Cuba, guerra con EE. UU., Tratado de París y consecuencias.</li>" +
        "<li><b>Conclusión</b>: un sistema estable pero fraudulento, que sobrevivió al 98 pero llegó a 1902 con una gran crisis de legitimidad.</li></ol>" +
        "<p>Cuida estas tres cosas: <b>fechas</b> (da cada una con su hecho), <b>vocabulario</b> (turnismo, caciquismo, pucherazo, encasillado) y <b>relación causa-consecuencia</b> (no te quedes solo en describir). Repasa el vocabulario con las tarjetas:</p>" +
        w("tarjetas", "tj1")
    },
    {
      h: "7. ¿Qué falla aquí? Errores típicos de este tema",
      html: "<p>Cada pregunta enseña una frase con un fallo frecuente. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "8. Autocomprobación del tema",
      html: "<p>Ocho preguntas para saber si el tema está en su sitio y un reto de cronología para fijar las fechas clave.</p>" + w("quiz", "quiz1") + w("orden", "cronologia")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    linea1: {
      titulo: "La Restauración, año a año",
      desde: 1874, hasta: 1902,
      tipos: { pol: ["Política", "var(--pen)"], gue: ["Guerras y colonias", "var(--red)"], soc: ["Sociedad y movimiento obrero", "var(--ok)"], nac: ["Nacionalismos e ideas", "#B58AF0"] },
      eventos: [
        { a: 1874, f: 0.92, m: "dic", t: "Manifiesto de Sandhurst", tipo: "pol", d: "Alfonso, de 17 años, hijo de Isabel II, se presenta como rey constitucional. El texto lo redacta Cánovas: prepara el regreso de los Borbones como una restauración «legal» y no como un golpe de fuerza." },
        { a: 1874, f: 0.99, m: "29 dic", t: "Pronunciamiento de Sagunto", tipo: "pol", d: "El general Martínez Campos proclama rey a Alfonso XII. Pone fin al Sexenio Democrático y a la Primera República, y abre la Restauración. Cánovas dirige un ministerio-regencia hasta la llegada del rey." },
        { a: 1876, f: 0.1, m: "feb", t: "Fin de la tercera guerra carlista", tipo: "gue", d: "Carlos VII cruza la frontera francesa. Termina la guerra civil que duraba desde 1872 y el Estado liberal respira tras décadas de conflicto." },
        { a: 1876, f: 0.5, m: "30 jun", t: "Constitución de 1876", tipo: "pol", d: "Soberanía compartida entre Rey y Cortes, confesionalidad católica con tolerancia privada y flexibilidad para conservadores y liberales. Estará en vigor hasta 1923, la más duradera de la historia de España." },
        { a: 1878, f: 0.12, m: "feb", t: "Paz de Zanjón", tipo: "gue", d: "Cierra la guerra de los Diez Años en Cuba (iniciada en 1868). Promete reformas que no se cumplen del todo, lo que deja el conflicto latente." },
        { a: 1879, f: 0.35, m: "mayo", t: "Fundación del PSOE", tipo: "soc", d: "Pablo Iglesias funda el Partido Socialista Obrero Español, primera gran organización obrera de ámbito estatal." },
        { a: 1881, f: 0.1, m: "feb", t: "Primer turno: gobierno de Sagasta", tipo: "pol", d: "Alfonso XII encarga el gobierno a los liberales de Sagasta. Es el primer cambio pacífico de partido: el turnismo echa a andar." },
        { a: 1885, f: 0.9, m: "25 nov", t: "Muerte de Alfonso XII · Pacto del Pardo", tipo: "pol", d: "Muere sin heredero varón. Cánovas y Sagasta pactan respetar la regencia de María Cristina y seguir turnándose, salvando el sistema." },
        { a: 1886, f: 0.4, m: "mayo", t: "Nace Alfonso XIII", tipo: "pol", d: "Nace el hijo póstumo de Alfonso XII, que será rey desde su nacimiento. Su madre, María Cristina, ejercerá la regencia hasta 1902." },
        { a: 1888, f: 0.6, m: "ago", t: "Fundación de la UGT", tipo: "soc", d: "Se constituye en Barcelona la Unión General de Trabajadores, el sindicato vinculado al PSOE." },
        { a: 1890, f: 0.45, m: "jun", t: "Sufragio universal masculino", tipo: "pol", d: "El gobierno liberal de Sagasta aprueba el voto para todos los varones mayores de 25 años. Amplía el cuerpo electoral, pero el caciquismo sigue controlando los resultados." },
        { a: 1892, f: 0.2, m: "mar", t: "Bases de Manresa", tipo: "nac", d: "La Unió Catalanista aprueba un programa de autonomía política para Cataluña: es un hito del catalanismo político." },
        { a: 1895, f: 0.15, m: "24 feb", t: "Grito de Baire: guerra de Cuba", tipo: "gue", d: "Comienza la insurrección cubana definitiva, organizada por José Martí. España envía miles de soldados a la isla." },
        { a: 1895, f: 0.58, m: "jul", t: "Sabino Arana funda el PNV", tipo: "nac", d: "Nace el Partido Nacionalista Vasco, que defiende la identidad y los derechos del pueblo vasco." },
        { a: 1897, f: 0.6, m: "8 ago", t: "Asesinato de Cánovas", tipo: "pol", d: "El anarquista italiano Michele Angiolillo mata a Cánovas en el balneario de Santa Águeda (Guipúzcoa). El sistema pierde a su gran artífice." },
        { a: 1898, f: 0.13, m: "15 feb", t: "Hundimiento del Maine", tipo: "gue", d: "Explota el acorazado estadounidense Maine en La Habana. EE. UU. culpa a España y la prensa sensacionalista presiona a favor de la guerra." },
        { a: 1898, f: 0.5, m: "may-jul", t: "Cavite y Santiago de Cuba", tipo: "gue", d: "En pocas semanas son destruidas las escuadras españolas de Montojo (Filipinas, 1 mayo) y de Cervera (Cuba, 3 julio)." },
        { a: 1898, f: 0.93, m: "10 dic", t: "Tratado de París", tipo: "gue", d: "España renuncia a Cuba y cede Puerto Rico, Guam y Filipinas a EE. UU. Es el «Desastre del 98»." },
        { a: 1899, f: 0.5, m: "", t: "Venta de las Carolinas, Marianas y Palaos", tipo: "gue", d: "España vende a Alemania lo que le quedaba del Pacífico: acaba su imperio colonial." },
        { a: 1901, f: 0.5, m: "", t: "«Oligarquía y caciquismo», de Costa", tipo: "nac", d: "Joaquín Costa presenta su estudio sobre el sistema político de la Restauración: la voz más famosa del regeneracionismo." },
        { a: 1902, f: 0.4, m: "17 may", t: "Alfonso XIII jura la Constitución", tipo: "pol", d: "Alfonso XIII, con 16 años, asume el trono y termina la regencia de su madre. Marca el final de la etapa clásica de la Restauración." }
      ]
    },

    proceso: {
      titulo: "Cómo se fabricaba una elección",
      consigna: "Ordena los pasos, del primero al último, de un cambio de gobierno en la Restauración.",
      items: [
        { t: "El gobierno pierde apoyos o desgaste, y el rey encarga formar gobierno al jefe del otro partido dinástico", nota: "Primero: el turno lo decide la Corona, no las urnas." },
        { t: "El nuevo gobierno disuelve las Cortes y convoca elecciones", nota: "Segundo: ya está en el poder y quiere una mayoría." },
        { t: "El Ministerio de la Gobernación elabora el encasillado: quién será diputado en cada distrito", nota: "Tercero: el resultado se decide antes de votar." },
        { t: "Gobernadores civiles y caciques movilizan a sus clientelas en cada provincia", nota: "Cuarto: la red local entra en acción." },
        { t: "El día de las elecciones se compran votos y se amañan las actas (pucherazo)", nota: "Quinto: se fabrica el resultado pactado." },
        { t: "Se constituyen unas Cortes con amplia mayoría para el gobierno entrante", nota: "Sexto: el círculo se cierra hasta el siguiente turno." }
      ]
    },

    cronologia: {
      titulo: "Reto de cronología",
      consigna: "Ordena estos seis hitos, del más antiguo al más reciente.",
      items: [
        { t: "Pronunciamiento de Martínez Campos en Sagunto", nota: "29 de diciembre de 1874" },
        { t: "Promulgación de la Constitución de 1876", nota: "30 de junio de 1876" },
        { t: "Pacto del Pardo tras la muerte de Alfonso XII", nota: "Noviembre de 1885" },
        { t: "Sufragio universal masculino", nota: "1890" },
        { t: "Grito de Baire: comienza la guerra de Cuba", nota: "24 de febrero de 1895" },
        { t: "Tratado de París: se pierden Cuba, Puerto Rico y Filipinas", nota: "10 de diciembre de 1898" }
      ]
    },

    clas98: {
      titulo: "Desastre del 98: ¿causa o consecuencia?",
      consigna: "Toca un hecho y después la categoría. Cuidado: hay que distinguir lo que lleva al Desastre de lo que viene después.",
      categorias: ["Causas (antes del Tratado de París)", "Consecuencias (después)"],
      items: [
        { t: "Insurrección cubana de 1895 (Grito de Baire)", c: 0 },
        { t: "Intereses económicos de EE. UU. en Cuba", c: 0 },
        { t: "Hundimiento del Maine (1898)", c: 0 },
        { t: "Inferioridad de la escuadra española", c: 0 },
        { t: "Pérdida de Cuba, Puerto Rico y Filipinas", c: 1 },
        { t: "Regeneracionismo y Generación del 98", c: 1 },
        { t: "Regreso de capitales a la Península", c: 1 },
        { t: "Venta de las islas del Pacífico a Alemania (1899)", c: 1 }
      ]
    },

    emp1: {
      titulo: "¿Quién es quién?",
      consigna: "Toca un personaje de la izquierda y su papel a la derecha.",
      pares: [
        ["Antonio Cánovas del Castillo", "Arquitecto del sistema; líder conservador"],
        ["Práxedes Mateo Sagasta", "Líder liberal; sufragio universal masculino (1890)"],
        ["Arsenio Martínez Campos", "General del pronunciamiento de Sagunto (1874)"],
        ["Pablo Iglesias", "Fundador del PSOE (1879) y de la UGT (1888)"],
        ["Sabino Arana", "Fundador del PNV (1895)"],
        ["Joaquín Costa", "Regeneracionismo; «Oligarquía y caciquismo» (1901)"],
        ["María Cristina de Habsburgo-Lorena", "Regente durante la minoría de Alfonso XIII"]
      ]
    },

    tj1: {
      titulo: "Vocabulario de la Restauración",
      cartas: [
        { a: "Pronunciamiento de Sagunto", b: "29 de diciembre de 1874. El general Martínez Campos proclama rey a Alfonso XII y abre la Restauración." },
        { a: "Turnismo", b: "Alternancia pactada en el gobierno entre conservadores (Cánovas) y liberales (Sagasta), con elecciones manipuladas." },
        { a: "Caciquismo", b: "Red de notables locales (caciques) que controlaban el voto a cambio de favores del poder." },
        { a: "Encasillado", b: "Reparto de distritos y candidatos hecho desde el Ministerio de la Gobernación antes de las elecciones." },
        { a: "Pucherazo", b: "Manipulación de los resultados electorales: actas falsas, votos comprados o a nombre de muertos." },
        { a: "Pacto del Pardo", b: "Noviembre de 1885. Tras la muerte de Alfonso XII, Cánovas y Sagasta pactan apoyar la regencia y seguir turnándose." },
        { a: "Constitución de 1876", b: "Soberanía compartida Rey-Cortes, Estado católico con tolerancia privada. Estuvo vigente hasta 1923." },
        { a: "Desastre del 98", b: "Pérdida de Cuba, Puerto Rico y Filipinas (Tratado de París, 10 de diciembre de 1898) tras la guerra con EE. UU." },
        { a: "Regeneracionismo", b: "Movimiento que, tras el 98, pide reformas para modernizar España. Su figura clave es Joaquín Costa." },
        { a: "Soberanía compartida", b: "Principio de 1876: el poder lo comparten el Rey y las Cortes (frente a la soberanía nacional de 1869)." }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña una afirmación con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«El turnismo funcionaba porque las elecciones eran libres y los españoles votaban alternativamente a conservadores y liberales.»",
          op: ["Es correcto", "Falso: el turno estaba pactado de antemano y las elecciones se manipulaban para darle mayoría al gobierno entrante", "Falso: solo gobernaban los conservadores", "Falso: no había elecciones"], ok: 1,
          porque: "En la Restauración se «hacía» primero el gobierno (por decisión del rey) y después las elecciones. El fraude y el caciquismo garantizaban la mayoría del gobierno de turno." },
        { q: "«La Constitución de 1876 establecía la soberanía nacional, como la de 1869.»",
          op: ["Es correcto", "Falso: establecía una soberanía compartida entre el Rey y las Cortes", "Falso: establecía la soberanía del Rey en exclusiva", "Falso: no incluía ninguna declaración sobre soberanía"], ok: 1,
          porque: "Cánovas buscaba un punto medio entre la Constitución moderada de 1845 y la democrática de 1869: el poder lo compartían Rey y Cortes." },
        { q: "«Sagasta fue el líder del Partido Conservador y Cánovas el del Liberal.»",
          op: ["Es correcto", "Falso: es al revés. Cánovas dirigía a los conservadores y Sagasta a los liberales", "Falso: ambos eran conservadores", "Falso: eran republicanos"], ok: 1,
          porque: "Cánovas del Castillo: Partido Liberal-Conservador. Práxedes Mateo Sagasta: Partido Liberal-Fusionista." },
        { q: "«El sufragio universal masculino de 1890 lo aprobó Cánovas y acabó con el caciquismo.»",
          op: ["Es correcto", "Falso: lo aprobó el gobierno liberal de Sagasta, y el caciquismo siguió controlando el voto", "Falso: era sufragio femenino", "Falso: lo aprobó la Primera República"], ok: 1,
          porque: "Fue una ley liberal (1890). Amplió el censo electoral, pero la estructura de caciques mantuvo el control de los resultados." },
        { q: "«Con el Desastre del 98 cayó inmediatamente el sistema político de la Restauración.»",
          op: ["Es correcto", "Falso: el sistema sobrevivió, aunque muy desprestigiado, hasta 1923", "Falso: cayó en 1895", "Falso: lo reforzó por completo"], ok: 1,
          porque: "La crisis del 98 provocó un gran examen de conciencia (regeneracionismo), pero el turnismo y el caciquismo continuaron hasta el golpe de Primo de Rivera (1923)." },
        { q: "«Los caciques eran funcionarios del Estado nombrados por el rey.»",
          op: ["Es correcto", "Falso: eran notables locales (propietarios, abogados…) con influencia social, no cargos oficiales", "Falso: eran militares", "Falso: eran clérigos"], ok: 1,
          porque: "El cacique tenía poder por su riqueza, sus relaciones y su capacidad de dar o negar favores. Hacía de intermediario entre el gobierno y los electores." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Qué ocurrió el 29 de diciembre de 1874?",
          op: ["La proclamación de la Primera República", "El pronunciamiento de Sagunto, que proclama rey a Alfonso XII", "La promulgación de la Constitución de 1876", "La muerte de Alfonso XII"], ok: 1,
          porque: "El general Martínez Campos se pronunció en Sagunto y proclamó rey a Alfonso XII: así empezó la Restauración." },
        { q: "¿Quién fue el principal arquitecto político de la Restauración?",
          op: ["Sagasta", "Pablo Iglesias", "Cánovas del Castillo", "Martínez Campos"], ok: 2,
          porque: "Cánovas diseñó el sistema: manifiesto de Sandhurst, Constitución de 1876 y turnismo." },
        { q: "¿Qué tipo de soberanía establecía la Constitución de 1876?",
          op: ["Soberanía nacional", "Soberanía compartida entre el Rey y las Cortes", "Soberanía exclusiva del Rey", "Soberanía popular directa"], ok: 1,
          porque: "Un punto intermedio entre la Constitución moderada de 1845 y la democrática de 1869." },
        { q: "El «encasillado» consistía en…",
          op: ["Repartir los escaños de antemano, distrito a distrito, desde el Ministerio de la Gobernación", "Encerrar a los opositores", "Clasificar a los electores por su renta", "Fijar el censo de población"], ok: 0,
          porque: "Era el reparto previo de candidatos y distritos que garantizaba la mayoría al gobierno entrante." },
        { q: "El Pacto del Pardo (1885) sirvió para…",
          op: ["Reconocer la independencia de Cuba", "Garantizar la regencia de María Cristina y mantener el turno entre los dos partidos", "Aprobar el sufragio universal", "Terminar la tercera guerra carlista"], ok: 1,
          porque: "Tras la muerte de Alfonso XII, Cánovas y Sagasta pactaron salvar el sistema." },
        { q: "Por el Tratado de París de 1898, España…",
          op: ["Ganó Cuba, Puerto Rico y Filipinas", "Renunció a Cuba y cedió Puerto Rico, Guam y Filipinas a EE. UU.", "Perdió solo Filipinas", "Compró Florida a EE. UU."], ok: 1,
          porque: "Cuba pasó a la tutela de EE. UU. e inició su independencia; Puerto Rico, Guam y Filipinas fueron cedidas." },
        { q: "El regeneracionismo fue…",
          op: ["Un partido político dinástico", "Un movimiento intelectual que, tras el 98, pedía reformas para modernizar España", "Una insurrección armada", "Un sindicato obrero"], ok: 1,
          porque: "Joaquín Costa fue su figura más conocida: «escuela y despensa» y el análisis de la «oligarquía y caciquismo»." },
        { q: "¿Qué organización fundó Pablo Iglesias en 1879?",
          op: ["La UGT", "El PNV", "El PSOE", "El Partido Conservador"], ok: 2,
          porque: "Fundó el PSOE en 1879 y la UGT en 1888." }
      ]
    }
  };

  // ============================================================
  // WIDGETS PROPIOS DE ESTE TEMA (diagramas SVG)
  // ============================================================

  // El turno en imagen: gobiernos conservadores y liberales, año a año (años redondeados)
  var GOBIERNOS = [
    { a: 1875, b: 1881, p: "C", t: "Cánovas", d: "Gobiernos conservadores de Cánovas (con un breve gobierno de Martínez Campos en 1879). Se consolida la Restauración: Constitución de 1876, fin de la guerra carlista, Paz de Zanjón." },
    { a: 1881, b: 1884, p: "L", t: "Sagasta", d: "Primer turno pacífico (1881): el rey encarga el gobierno a Sagasta. Los liberales gobiernan hasta 1884, con un gobierno de Posada Herrera de la izquierda dinástica." },
    { a: 1884, b: 1885, p: "C", t: "", d: "Vuelve Cánovas hasta la muerte de Alfonso XII, en noviembre de 1885." },
    { a: 1885, b: 1890, p: "L", t: "Sagasta", d: "Pacto del Pardo y «Parlamento largo»: Ley de Asociaciones (1887), Ley del Jurado (1888), Código Civil (1889) y sufragio universal masculino (1890)." },
    { a: 1890, b: 1892, p: "C", t: "Cánovas", d: "Gobierno conservador de Cánovas, con el arancel proteccionista de 1891 (favorece a la industria textil catalana y al trigo castellano)." },
    { a: 1892, b: 1895, p: "L", t: "Sagasta", d: "Gobierno liberal. En febrero de 1895 estalla la insurrección cubana (Grito de Baire)." },
    { a: 1895, b: 1897, p: "C", t: "Cánovas", d: "Cánovas dirige la respuesta militar a Cuba (Weyler, 1896) y es asesinado por el anarquista Angiolillo en agosto de 1897." },
    { a: 1897, b: 1899, p: "L", t: "Sagasta", d: "Sagasta concede la autonomía a Cuba (1897), demasiado tarde. Guerra con EE. UU. y Desastre del 98." },
    { a: 1899, b: 1901, p: "C", t: "Silvela", d: "Gobiernos conservadores de Silvela y Azcárraga, en pleno clima regeneracionista." },
    { a: 1901, b: 1902, p: "L", t: "", d: "Sagasta, ya anciano, gobierna hasta finales de 1902. Ese año, Alfonso XIII jura la Constitución y termina la regencia de María Cristina." }
  ];

  B.w.turno = function (host) {
    var cuerpo = B.caja(host, "Mira", "El turno en imagen");
    cuerpo.innerHTML = '<div class="tn-leyenda"><span><i class="tn-c"></i>Gobiernos conservadores</span><span><i class="tn-l"></i>Gobiernos liberales</span></div><div class="tn-fig"></div><div class="tn-det" aria-live="polite"><p class="hint">toca un tramo para ver qué pasó</p></div><p class="w-pie">Fechas redondeadas al año. Fíjate en la regularidad de la alternancia.</p>';
    var cont = cuerpo.querySelector(".tn-fig"), det = cuerpo.querySelector(".tn-det");
    var W = 640, Hh = 150, x0 = 18, x1 = W - 18, A0 = 1875, A1 = 1902;
    function X(a) { return x0 + (a - A0) / (A1 - A0) * (x1 - x0); }
    var s = svg("svg", { viewBox: "0 0 " + W + " " + Hh, "class": "tn-svg", role: "img", "aria-label": "Barra con los gobiernos conservadores y liberales de 1875 a 1902" }, cont);
    for (var a = A0; a <= A1; a++) {
      var grande = a % 5 === 0 || a === A1;
      svg("line", { x1: X(a), x2: X(a), y1: 86, y2: grande ? 98 : 92, "class": "tn-marca" }, s);
      if (grande) { var t = svg("text", { x: X(a), y: 114, "text-anchor": "middle", "class": "tn-num" }, s); t.textContent = a; }
    }
    var hitos = [[1885, "Pacto del Pardo"], [1890, "Sufragio univ. masc."], [1898, "Desastre del 98"]];
    hitos.forEach(function (h, i) {
      svg("line", { x1: X(h[0]), x2: X(h[0]), y1: 24 + 14 * (i % 2), y2: 62, "class": "tn-hito" }, s);
      var tx = svg("text", { x: X(h[0]), y: 18 + 14 * (i % 2), "text-anchor": h[0] > 1895 ? "end" : "middle", "class": "tn-et" }, s);
      tx.textContent = h[1];
    });
    var previo = null;
    GOBIERNOS.forEach(function (g) {
      var r = svg("rect", { x: X(g.a) + 1, y: 62, width: X(g.b) - X(g.a) - 2, height: 24, rx: 4, "class": "tn-seg " + (g.p === "C" ? "tn-c" : "tn-l"), tabindex: 0, role: "button", "aria-label": (g.p === "C" ? "Conservadores " : "Liberales ") + g.a + " a " + g.b }, s);
      if (X(g.b) - X(g.a) > 44) { var l = svg("text", { x: (X(g.a) + X(g.b)) / 2, y: 78, "text-anchor": "middle", "class": "tn-ini" }, s); l.textContent = g.p === "C" ? "C" : "L"; }
      function elige() {
        if (previo) previo.classList.remove("sel");
        r.classList.add("sel"); previo = r;
        det.innerHTML = "<h5>" + (g.p === "C" ? "Conservadores" : "Liberales") + " · " + g.a + "–" + g.b + (g.t ? " · " + g.t : "") + "</h5><p>" + g.d + "</p>";
      }
      r.addEventListener("click", elige);
      r.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elige(); } });
    });
  };

  // La pirámide del caciquismo
  var NIVELES = [
    { t: "Gobierno de Madrid", d: "El gobierno de turno y su ministro de la Gobernación diseñan el resultado: reparten el encasillado y deciden quién será diputado. Dan empleos, obras públicas y favores a cambio de apoyo." },
    { t: "Gobernadores civiles", d: "Nombrados por el gobierno, transmiten sus órdenes a las provincias, destituyen ayuntamientos poco fiables y supervisan las elecciones. Son el eslabón entre Madrid y los caciques." },
    { t: "Caciques locales", d: "Notables de cada comarca (grandes propietarios, abogados, prestamistas…). Controlan el voto de su zona a cambio de favores: cargos, exenciones, obras, influencia ante la Administración." },
    { t: "Electores", d: "La mayoría de la población: dependiente del cacique por trabajo, deudas o favores, o coaccionada. Muchos no votaban o votaban lo que se les indicaba." }
  ];
  B.w.piramide = function (host) {
    var cuerpo = B.caja(host, "Diagrama", "La pirámide del caciquismo");
    cuerpo.innerHTML = '<div class="pi-fig"></div><div class="tn-det" aria-live="polite"><p class="hint">toca un piso de la pirámide</p></div>';
    var cont = cuerpo.querySelector(".pi-fig"), det = cuerpo.querySelector(".tn-det");
    var s = svg("svg", { viewBox: "0 0 640 330", "class": "pi-svg", role: "img", "aria-label": "Pirámide de cuatro pisos: gobierno, gobernadores civiles, caciques y electores, con flechas de favores hacia abajo y votos hacia arriba" }, cont);
    var defs = svg("defs", null, s);
    ["f", "v"].forEach(function (id) { var m = svg("marker", { id: "pi-fl-" + id, viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, defs); svg("path", { d: "M0 0 L10 5 L0 10 z", "class": "pi-punta " + id }, m); });
    var cx = 320, y = 14, h = 72, wTop = 196, paso = 52, previo = null;
    NIVELES.forEach(function (n, i) {
      var w1 = wTop + paso * i, w2 = wTop + paso * (i + 1), y1 = y + h * i, y2 = y1 + h - 4;
      var pol = svg("polygon", { points: (cx - w1 / 2) + "," + y1 + " " + (cx + w1 / 2) + "," + y1 + " " + (cx + w2 / 2) + "," + y2 + " " + (cx - w2 / 2) + "," + y2, "class": "pi-piso p" + i, tabindex: 0, role: "button", "aria-label": n.t }, s);
      var t = svg("text", { x: cx, y: y1 + h / 2 + 2, "text-anchor": "middle", "class": "pi-txt t" + i }, s); t.textContent = n.t;
      function elige() { if (previo) previo.classList.remove("sel"); pol.classList.add("sel"); previo = pol; det.innerHTML = "<h5>" + n.t + "</h5><p>" + n.d + "</p>"; }
      pol.addEventListener("click", elige); t.addEventListener("click", elige);
      pol.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elige(); } });
      t.style.cursor = "pointer";
    });
    svg("line", { x1: 74, y1: 28, x2: 74, y2: 270, "class": "pi-flecha f", "marker-end": "url(#pi-fl-f)" }, s);
    var tf = svg("text", { x: 14, y: 150, "class": "pi-et f", transform: "rotate(-90 14 150)", "text-anchor": "middle" }, s); tf.textContent = "favores: empleos, obras, exenciones";
    svg("line", { x1: 566, y1: 270, x2: 566, y2: 28, "class": "pi-flecha v", "marker-end": "url(#pi-fl-v)" }, s);
    var tv = svg("text", { x: 626, y: 150, "class": "pi-et v", transform: "rotate(90 626 150)", "text-anchor": "middle" }, s); tv.textContent = "votos y obediencia";
  };

  // ============================================================
  // EJERCICIOS NUEVOS (nivel 1 ★ · 2 ★★ · 3 ★★★ PAU) con comprobación o autoevaluación
  // ============================================================
  var ejercicios = [
    { id: "h1", nivel: 1,
      enunciado: "¿Cuándo se produjo el pronunciamiento del general Martínez Campos en Sagunto, que proclamó rey a Alfonso XII?",
      check: { tipo: "opcion", etiqueta: "Fecha", opciones: ["29 de diciembre de 1874", "3 de enero de 1874", "30 de junio de 1876", "25 de noviembre de 1885"], ok: 0 },
      pistas: ["Fue a finales del año 1874, justo antes de la llegada del rey a España en enero de 1875."],
      pasos: ["El pronunciamiento de Sagunto fue el <b>29 de diciembre de 1874</b>.", "El 3 de enero de 1874 fue el golpe del general Pavía contra la Primera República; el 30 de junio de 1876, la Constitución; el 25 de noviembre de 1885, la muerte de Alfonso XII."],
      resultado: "29 de diciembre de 1874" },
    { id: "h2", nivel: 1,
      enunciado: "Alfonso XIII nació en 1886, hijo póstumo de Alfonso XII, y juró la Constitución en 1902 al terminar la regencia de su madre. ¿Cuántos años tenía entonces?",
      check: { tipo: "num", etiqueta: "Edad =", valor: 16, unidad: "años" },
      pistas: ["Resta el año de nacimiento al año de la jura."],
      pasos: ["1902 − 1886 = 16", "Nació el 17 de mayo de 1886 y juró el 17 de mayo de 1902: justo 16 años."],
      resultado: "16 años" },
    { id: "h3", nivel: 2,
      enunciado: "Indica si cada afirmación sobre la Restauración es verdadera o falsa.",
      check: [
        { tipo: "opcion", etiqueta: "a) El turnismo se basaba en elecciones libres", opciones: ["Verdadero", "Falso"], ok: 1 },
        { tipo: "opcion", etiqueta: "b) Cánovas y Sagasta dirigían los dos partidos dinásticos", opciones: ["Verdadero", "Falso"], ok: 0 },
        { tipo: "opcion", etiqueta: "c) La Constitución de 1876 estuvo vigente hasta 1923", opciones: ["Verdadero", "Falso"], ok: 0 },
        { tipo: "opcion", etiqueta: "d) El sufragio universal masculino (1890) acabó con el fraude electoral", opciones: ["Verdadero", "Falso"], ok: 1 },
        { tipo: "opcion", etiqueta: "e) El Desastre del 98 provocó la caída inmediata de la monarquía", opciones: ["Verdadero", "Falso"], ok: 1 }
      ],
      pistas: ["Recuerda: el turno estaba pactado de antemano y el caciquismo seguía funcionando.", "El sistema sobrevivió al 98, aunque desprestigiado."],
      pasos: ["a) <b>Falso</b>: el turno estaba pactado y las elecciones se manipulaban.", "b) <b>Verdadero</b>: Cánovas (conservadores) y Sagasta (liberales).", "c) <b>Verdadero</b>: de 1876 a 1923.", "d) <b>Falso</b>: se amplió el censo, pero el caciquismo siguió controlando el voto.", "e) <b>Falso</b>: el sistema sobrevivió hasta 1923, aunque muy debilitado."],
      resultado: "a) F · b) V · c) V · d) F · e) F" },
    { id: "h4", nivel: 2,
      enunciado: "Define «turnismo» y «caciquismo» y explica cómo se relacionan entre sí. Responde con tus palabras, en 5-8 líneas.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Define el turnismo: alternancia pactada en el gobierno entre conservadores y liberales", p: 0.5 },
        { t: "Cita a los líderes de los dos partidos (Cánovas y Sagasta)", p: 0.5 },
        { t: "Define el caciquismo: red de notables locales que controlaban el voto", p: 0.5 },
        { t: "Relaciona ambos: el caciquismo y el pucherazo garantizaban el resultado que exigía el turno", p: 0.5 }
      ] },
      pasos: ["El <b>turnismo</b> era la alternancia pactada en el gobierno entre los dos partidos dinásticos, el Conservador de Cánovas y el Liberal de Sagasta.", "El <b>caciquismo</b> era la red de notables locales (caciques) que controlaban el voto en cada distrito mediante favores, presiones o fraude (pucherazo).", "<b>Relación</b>: para que el turno funcionara, el gobierno entrante necesitaba mayoría en las Cortes. El caciquismo fabricaba esas mayorías, así que sin él el turnismo no habría podido mantenerse."],
      resultado: "El turnismo (pacto de alternancia) necesitaba del caciquismo (fraude y control local del voto) para producir mayorías previsibles." },
    { id: "h5", nivel: 3,
      enunciado: "Comentario guiado. Comenta el siguiente texto siguiendo los cuatro pasos (clasificación, idea principal y análisis, contexto, conclusión).<div class='cita'><p>«La religión católica, apostólica, romana, es la del Estado. La Nación se obliga a mantener el culto y sus ministros. Nadie será molestado en territorio español por sus opiniones religiosas, ni por el ejercicio de su respectivo culto, salvo el respeto debido a la moral cristiana. No se permitirán, sin embargo, otras ceremonias ni manifestaciones públicas que las de la religión del Estado.»</p><cite>Constitución de 1876, art. 11</cite></div>",
      check: { tipo: "rubrica", etiqueta: "Tu comentario", filas: 9, items: [
        { t: "Clasifica: texto jurídico-político, fuente primaria, artículo 11 de la Constitución de 1876", p: 0.5 },
        { t: "Idea principal: Estado confesional católico con tolerancia solo en el ámbito privado", p: 0.5 },
        { t: "Análisis: el Estado mantiene el culto, no se molesta por las creencias, pero se prohíben manifestaciones públicas de otros cultos", p: 1 },
        { t: "Contexto: reacción frente a la libertad de cultos de 1869 y búsqueda del apoyo de la Iglesia y los conservadores en la Restauración", p: 0.5 },
        { t: "Conclusión: solución de compromiso entre confesionalidad y tolerancia, que contribuyó a la estabilidad del sistema", p: 0.5 }
      ] },
      pasos: ["<b>Clasificación</b>: texto jurídico-político, fuente primaria. Es el artículo 11 de la Constitución de 1876, redactado en el marco del sistema de Cánovas.", "<b>Idea principal y análisis</b>: se declara a la religión católica como la oficial del Estado, que se compromete a mantener el culto y sus ministros. Al mismo tiempo, nadie será molestado por sus creencias ni por practicar su culto, pero solo en privado: no se permiten ceremonias ni manifestaciones públicas de otros cultos.", "<b>Contexto</b>: el Sexenio Democrático (Constitución de 1869) había proclamado la libertad de cultos. La Restauración busca el apoyo de la Iglesia y de los sectores conservadores, así que recupera la confesionalidad, pero con un gesto de tolerancia hacia otras creencias para no romper con los liberales.", "<b>Conclusión</b>: es una fórmula de compromiso entre la confesionalidad y la tolerancia. Reconoce una libertad de conciencia limitada, y encaja con el espíritu conciliador del sistema canovista."],
      resultado: "Estado confesional católico con tolerancia privada: compromiso entre 1845 y 1869, típico del sistema canovista." },
    { id: "h6", nivel: 3,
      enunciado: "Explica las causas y las consecuencias del Desastre del 98. Redáctalo como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 9, items: [
        { t: "Causa: la insurrección cubana desde 1895 y el desgaste militar y económico de la guerra", p: 0.5 },
        { t: "Causa: los intereses de EE. UU. en Cuba y el incidente del Maine (1898) como detonante", p: 0.5 },
        { t: "Cita los hechos principales: Cavite, Santiago de Cuba y el Tratado de París (10 dic. 1898)", p: 0.5 },
        { t: "Consecuencia territorial: pérdida de Cuba, Puerto Rico, Filipinas (y venta de las islas del Pacífico en 1899)", p: 0.5 },
        { t: "Consecuencias políticas y militares: desprestigio del sistema y malestar del ejército", p: 0.5 },
        { t: "Consecuencias intelectuales: regeneracionismo y Generación del 98 (con un nombre)", p: 0.5 }
      ] },
      pasos: ["<b>Causas</b>: la insurrección cubana de 1895 desgastó al ejército y a la Hacienda españolas. EE. UU., con intereses económicos en Cuba, intervino tras la explosión del <em>Maine</em> (febrero de 1898) con el apoyo de una prensa belicista, y se encontró con una flota española anticuada.", "<b>Desarrollo</b>: destrucción de la escuadra de Montojo en Cavite (1 mayo) y de la de Cervera en Santiago de Cuba (3 julio). Tratado de París, 10 de diciembre de 1898.", "<b>Consecuencias territoriales</b>: España pierde Cuba, Puerto Rico y Filipinas; en 1899 vende el resto del Pacífico a Alemania.", "<b>Consecuencias políticas y económicas</b>: el sistema de la Restauración sobrevive, pero queda desacreditado; malestar en el ejército; regreso de capitales a la Península.", "<b>Consecuencias intelectuales</b>: el regeneracionismo de Joaquín Costa y la Generación del 98 (Unamuno, Baroja, Machado…) examinan las causas del atraso de España."],
      resultado: "Causas: guerra de Cuba, intereses de EE. UU., Maine. Consecuencias: pérdida del imperio, crisis del sistema, regeneracionismo." },
    { id: "h7", nivel: 3,
      enunciado: "Explica cómo funcionaba realmente el sistema político de la Restauración: qué decía la Constitución y qué ocurría en la práctica.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 8, items: [
        { t: "Constitución de 1876: soberanía compartida entre Rey y Cortes, con amplios poderes de la Corona", p: 0.5 },
        { t: "El rey encargaba el gobierno al jefe de un partido dinástico (turnismo)", p: 0.5 },
        { t: "Elecciones a posteriori: el nuevo gobierno disolvía las Cortes y organizaba el resultado (encasillado)", p: 0.5 },
        { t: "El caciquismo y el pucherazo aseguraban la mayoría", p: 0.5 },
        { t: "Concluye que el sistema era estable pero no democrático: dejaba fuera a republicanos, obreros y nacionalistas", p: 0.5 }
      ] },
      pasos: ["<b>Teoría</b>: la Constitución de 1876 establecía una soberanía compartida entre el Rey y las Cortes. El Rey nombraba y cesaba a los ministros y podía disolver las Cortes.", "<b>Práctica</b>: el Rey encargaba el gobierno al jefe de uno de los dos partidos dinásticos (turnismo). El nuevo gobierno disolvía las Cortes y convocaba elecciones, cuyo resultado se pactaba antes mediante el encasillado.", "<b>Mecanismo</b>: gobernadores civiles y caciques locales compraban o coaccionaban votos y falseaban actas (pucherazo), para dar la mayoría al gobierno entrante.", "<b>Valoración</b>: el sistema aportó estabilidad (se acabaron los pronunciamientos), pero a costa de falsear la voluntad popular y de excluir a republicanos, movimiento obrero y nacionalismos periféricos."],
      resultado: "Estabilidad conseguida con elecciones falseadas: un sistema formalmente constitucional, pero no democrático." }
  ];

  // ============================================================
  // LÁMINA RESUMEN
  // ============================================================
  var lamina = [
    { titulo: "Cronología de la Restauración", ancha: true,
      tabla: { cab: ["Año", "Hecho"], filas: [
        ["1874", "29 dic.: pronunciamiento de Sagunto. Manifiesto de Sandhurst (dic.)"],
        ["1876", "Fin de la guerra carlista (feb.) · Constitución (30 jun.)"],
        ["1878", "Paz de Zanjón: fin de la guerra de los Diez Años en Cuba"],
        ["1879 · 1888", "Fundación del PSOE (1879) y de la UGT (1888)"],
        ["1881", "Primer turno: gobierno de Sagasta"],
        ["1885", "Muerte de Alfonso XII (nov.) · Pacto del Pardo · regencia de María Cristina"],
        ["1890", "Sufragio universal masculino (Sagasta)"],
        ["1892 · 1895", "Bases de Manresa (1892) · Fundación del PNV (1895)"],
        ["1895", "Grito de Baire: guerra de Cuba"],
        ["1897", "Asesinato de Cánovas (Angiolillo)"],
        ["1898", "Maine (feb.) · Cavite y Santiago (may.-jul.) · Tratado de París (10 dic.)"],
        ["1901 · 1902", "Costa: «Oligarquía y caciquismo» (1901) · Alfonso XIII jura la Constitución (1902)"]
      ] } },
    { titulo: "Cómo funcionaba el sistema",
      pasos: ["El rey encarga el gobierno al otro partido dinástico.", "Se disuelven las Cortes y se convocan elecciones.", "Gobernación fija el <b>encasillado</b> (candidatos por distrito).", "Gobernadores y <b>caciques</b> movilizan el voto.", "<b>Pucherazo</b> y compra de votos.", "Cortes con mayoría para el nuevo gobierno."],
      nota: "Primero el gobierno, después las elecciones." },
    { titulo: "Constitución de 1876",
      pasos: ["<b>Soberanía compartida</b> Rey-Cortes.", "Cortes bicamerales (Congreso y Senado).", "Amplios poderes de la Corona.", "Estado católico con tolerancia privada (art. 11).", "Sufragio a cargo de leyes ordinarias.", "Flexible: vigente hasta 1923."] },
    { titulo: "Vocabulario clave", ancha: true,
      tabla: { cab: ["Término", "Significado"], filas: [
        ["Turnismo", "Alternancia pactada conservadores-liberales"],
        ["Caciquismo", "Red de notables locales que controlaban el voto"],
        ["Encasillado", "Reparto previo de distritos y candidatos"],
        ["Pucherazo", "Manipulación de actas y votos"],
        ["Cunero", "Candidato impuesto sin relación con el distrito"],
        ["Pacto del Pardo", "1885: salvar el sistema tras la muerte de Alfonso XII"],
        ["Regeneracionismo", "Movimiento del 98 que pide modernizar España"]
      ] } },
    { titulo: "Desastre del 98", ancha: true,
      tabla: { cab: ["Causas", "Consecuencias"], filas: [
        ["Insurrección cubana (1895) y desgaste", "Pérdida de Cuba, Puerto Rico, Guam y Filipinas"],
        ["Intereses de EE. UU. en la isla", "Venta de las islas del Pacífico a Alemania (1899)"],
        ["Hundimiento del Maine (1898)", "Regreso de capitales y crisis de mercados coloniales"],
        ["Flota española anticuada", "Desprestigio del sistema y malestar militar"],
        ["", "Regeneracionismo y Generación del 98"]
      ] } },
    { titulo: "Cómo comentar una fuente histórica",
      pasos: ["<b>Clasifica</b>: tipo de texto, autor, fecha, destinatario, intención.", "<b>Idea principal</b> y análisis de las ideas clave.", "<b>Contextualiza</b>: ¿qué momento histórico lo explica?", "<b>Conclusión</b>: importancia y consecuencias."],
      nota: "Sirve para cualquier texto histórico, no solo para este tema." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El turnismo se basaba en elecciones libres", bien: "El turno estaba pactado y las elecciones se manipulaban", por: "El gobierno se decidía antes que las urnas." },
        { mal: "Sagasta, líder conservador", bien: "Cánovas = conservadores · Sagasta = liberales", por: "Fácil de confundir: apréndelo en pareja." },
        { mal: "1876 = soberanía nacional", bien: "Soberanía compartida Rey-Cortes", por: "La soberanía nacional es de 1869." },
        { mal: "El 98 acabó con la Restauración", bien: "El sistema sobrevivió, desprestigiado, hasta 1923", por: "Hubo crisis, no derrumbe inmediato." }
      ] }
  ];

  B.registrar("historia_esp", "t7", { secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
