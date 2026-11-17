/* ============================================================
   Biología II · ampliaciones · Tema 15: Inmunología
   (parte A: teoría. Parte B, bio2_t15b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t15.js (bio_respuesta, bio_anticuerpo, bio_transfusion).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Inmunidad innata frente a adaptativa (tabla de contrastes, ejemplos) → secciones 1–3 + clasificar.
   2. Inflamación, fagocitosis, complemento e interferón: pasos y papel de cada uno → sección 2 + ordenar.
   3. Estructura del anticuerpo (4 cadenas, regiones variable y constante, sitios) y clases de Ig → sección 4 + widget bio_anticuerpo.
   4. Reacción antígeno-anticuerpo: qué hace (neutraliza, aglutina, precipita, opsoniza, activa complemento) y que NO destruye por sí sola → sección 4.
   5. Respuesta humoral (B, Th, plasmáticas) frente a celular (Tc, MHC) y selección clonal → sección 3 + ordenar.
   6. Respuesta primaria y secundaria: interpretar la gráfica (latencia, pico, memoria) → sección 5 + widget bio_respuesta + ejemplo PAU.
   7. Natural/artificial y activa/pasiva; vacuna frente a suero → sección 7 + clasificar.
   8. Alergia, autoinmunidad e inmunodeficiencia: cuál es cuál y por qué → sección 8 + clasificar.
   9. SIDA: qué células ataca el VIH, por qué no hay vacuna, transmisión y ventana → sección 9.
   10. Trasplantes (auto/iso/alo/xeno), rechazo y grupos sanguíneos ABO y Rh (compatibilidad y herencia) → sección 10 + widget bio_transfusion.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t15/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Líneas de defensa
  secciones[0] = env(
    "<h5>Lo propio y lo extraño</h5>" +
    "<p>Para defenderse, el organismo tiene que distinguir <b>lo propio</b> (sus células y moléculas) de <b>lo extraño</b> (microorganismos, toxinas, células de otra persona). Lo que el sistema inmunitario reconoce como extraño y le hace reaccionar es un <b>antígeno</b>: casi siempre una proteína o un polisacárido de la superficie de un patógeno, de un polen, de un veneno o de una célula trasplantada. Cuando falla esta distinción, aparecen las enfermedades del apartado 8.</p>" +
    "<h5>Tres líneas de defensa</h5>" +
    tabla(["Línea", "Qué es", "Rapidez", "Ejemplos"], [
      ["<b>1.ª</b> Barreras externas", "Impiden la entrada", "permanentes", "piel, mucosas, lágrimas, jugo gástrico"],
      ["<b>2.ª</b> Inmunidad innata", "Respuesta inespecífica de células y proteínas", "minutos u horas", "inflamación, fagocitos, complemento, interferón, células NK, fiebre"],
      ["<b>3.ª</b> Inmunidad adaptativa", "Respuesta específica y con memoria", "días la primera vez", "linfocitos B (anticuerpos) y linfocitos T"]
    ], "q3t") +
    "<h5>Innata frente a adaptativa</h5>" +
    tabla(["Característica", "Innata (inespecífica)", "Adaptativa (específica)"], [
      ["Reconocimiento", "Patrones comunes a muchos patógenos", "Un antígeno concreto (epítopo)"],
      ["Rapidez", "Inmediata (minutos u horas)", "Lenta la 1.ª vez (días); rápida la 2.ª"],
      ["Memoria", "No", "Sí: células de memoria"],
      ["Células", "Fagocitos, NK, mastocitos", "Linfocitos B y T"],
      ["Moléculas", "Complemento, interferón, lisozima", "Anticuerpos, receptores de los linfocitos"]
    ], "q3t") +
    "<p>Las dos ramas <b>colaboran</b>: los macrófagos (innata) enseñan trozos del patógeno a los linfocitos T (adaptativa), y los anticuerpos (adaptativa) marcan a los patógenos para que los fagocitos (innata) los destruyan.</p>" +
    "<h5>Historia en tres hitos</h5>" +
    "<p><b>Elie Metchnikoff</b> describió la fagocitosis en 1882–1884 (Nobel en 1908, junto con Paul Ehrlich); <b>Emil von Behring y Shibasaburo Kitasato</b> demostraron en 1890 que el suero de un animal inmunizado protege a otro (los anticuerpos); <b>Macfarlane Burnet</b> formuló en 1957–1959 la teoría de la selección clonal.</p>" +
    w("clasificar", "defensas") +
    ojo("No confundas <b>antígeno</b> con <b>patógeno</b>. El patógeno es el microorganismo entero; el antígeno es una molécula suya (o de otra cosa) que dispara la respuesta. Un mismo virus tiene muchos antígenos distintos."));

  // ---------------------------------------------------------------- 2. Innata
  secciones[1] = env(
    "<h5>Barreras: la primera línea</h5>" +
    tabla(["Barrera", "Cómo protege"], [
      ["<b>Piel</b>", "Capa de queratina impermeable; pH ácido (≈ 5,5) y sudor con sales y lisozima"],
      ["<b>Mucosas</b> (respiratoria, digestiva)", "Moco que atrapa partículas y cilios que lo barren hacia fuera (tráquea)"],
      ["<b>Lágrimas, saliva</b>", "Lisozima: enzima que rompe la pared bacteriana"],
      ["<b>Jugo gástrico</b>", "pH ≈ 2: mata muchos microorganismos ingeridos"],
      ["<b>Flora normal</b>", "Bacterias propias que compiten con los patógenos por el espacio y los nutrientes"]
    ], "q3t") +
    "<h5>La inflamación, paso a paso</h5>" +
    "<p>Si un patógeno atraviesa la piel (una astilla, un corte), se pone en marcha una respuesta local:</p>" +
    "<ol><li>Los <b>mastocitos</b> y las células dañadas liberan señales químicas, entre ellas <b>histamina</b>.</li>" +
    "<li>Los capilares de la zona se <b>dilatan</b> (llega más sangre: <b>rojez y calor</b>) y se vuelven más <b>permeables</b> (sale plasma: <b>hinchazón</b>; el dolor viene de la presión y de las señales químicas).</li>" +
    "<li>Los fagocitos (primero <b>neutrófilos</b>, luego <b>monocitos</b>) atraviesan la pared del capilar (<b>diapédesis</b>) y se dirigen al foco atraídos por las señales (<b>quimiotaxis</b>).</li>" +
    "<li>Los fagocitos <b>engullen</b> a los microorganismos. Los neutrófilos muertos y el tejido destruido forman el <b>pus</b>.</li>" +
    "<li>Se repara el tejido. Si la infección se extiende, aparece <b>fiebre</b>, que ayuda a las defensas y frena a muchos patógenos.</li></ol>" +
    "<p>Los cuatro signos clásicos de la inflamación (descritos por Celso) son <b>rubor, calor, tumor (hinchazón) y dolor</b>. La inflamación es útil, salvo que se vuelva crónica o desproporcionada.</p>" +
    w("orden", "ordeninflamacion") +
    "<h5>Fagocitosis</h5>" +
    "<p>Es la ingestión de partículas grandes por una célula, con la membrana (Tema 6). Los fagocitos son los <b>neutrófilos</b> (los más abundantes de los glóbulos blancos, de vida corta), los <b>monocitos</b> y los <b>macrófagos</b> en los tejidos (derivan de los monocitos y viven mucho). Pasos:</p>" +
    "<ol><li><b>Reconocimiento y adhesión</b> al microorganismo (a veces marcado por anticuerpos o complemento: <b>opsonización</b>).</li>" +
    "<li><b>Englobamiento</b> con pseudópodos y formación de una vesícula, el <b>fagosoma</b>.</li>" +
    "<li><b>Digestión</b>: el fagosoma se fusiona con un <b>lisosoma</b> (Tema 6) y forma un <b>fagolisosoma</b>, donde las enzimas y los radicales de oxígeno destruyen al microorganismo.</li>" +
    "<li><b>Eliminación</b> de los restos por exocitosis. El macrófago puede conservar trozos del patógeno (antígenos) y mostrarlos a los linfocitos T.</li></ol>" +
    "<h5>Complemento e interferón: dos proteínas con misiones distintas</h5>" +
    tabla(["", "Complemento", "Interferón"], [
      ["Qué es", "≈ 30 proteínas del plasma que se activan en cascada", "Proteínas (citocinas) que liberan las células infectadas por virus"],
      ["Qué hace", "<b>Opsoniza</b> (marca), atrae fagocitos y <b>lisa</b> la célula con poros (complejo de ataque a membrana)", "Avisa a las células vecinas: estas bloquean la síntesis de proteínas víricas (estado antivírico)"],
      ["Frente a qué", "Bacterias sobre todo", "Virus"],
      ["Detalle clave", "Se activa también por complejos antígeno-anticuerpo", "No mata virus por sí mismo; no es específico de un virus (sí de especie)"]
    ], "q3t") +
    "<p>Las <b>células NK</b> (<i>natural killer</i>, linfocitos de la inmunidad innata) destruyen células tumorales y células infectadas que no muestran bien las moléculas MHC de clase I (apartado 3). Lo hacen con perforinas, sin necesitar un aprendizaje previo.</p>" +
    ojo("El interferón <b>no</b> protege a la célula que lo fabrica (ya está infectada) sino a las <b>vecinas</b>. Y el complemento no es una célula: es un conjunto de proteínas."));

  // ---------------------------------------------------------------- 3. Adaptativa
  secciones[2] = env(
    "<h5>Cuatro rasgos que la distinguen</h5>" +
    "<ul><li><b>Especificidad</b>: cada linfocito reconoce un epítopo concreto, mediante un receptor propio.</li>" +
    "<li><b>Diversidad</b>: el organismo tiene millones de linfocitos distintos, cada uno con un receptor diferente, fabricados <i>antes</i> de conocer ningún antígeno (por reordenamiento de genes: Tonegawa, Nobel 1987).</li>" +
    "<li><b>Memoria</b>: tras el primer contacto quedan células de memoria.</li>" +
    "<li><b>Tolerancia a lo propio</b>: los linfocitos que reconocen moléculas propias se eliminan o se frenan.</li></ul>" +
    "<h5>Antígenos: epítopos y haptenos</h5>" +
    "<p>Un antígeno suele ser grande y tiene varias zonas de reconocimiento, los <b>epítopos</b> o determinantes antigénicos; cada anticuerpo se une a un epítopo. Las moléculas pequeñas, como la penicilina, no provocan respuesta por sí solas: son <b>haptenos</b>, y solo actúan al unirse a una proteína del organismo (por eso la penicilina puede causar alergia).</p>" +
    "<h5>MHC (HLA): el «carné de identidad» de las células</h5>" +
    "<p>Las células llevan en la superficie proteínas del <b>complejo mayor de histocompatibilidad (MHC)</b>, llamadas <b>HLA</b> en la especie humana. Son distintas en cada persona (salvo gemelos idénticos), y sirven para <b>presentar</b> fragmentos de proteínas a los linfocitos T:</p>" +
    tabla(["", "MHC de clase I", "MHC de clase II"], [
      ["En qué células", "casi todas las células con núcleo", "células presentadoras de antígeno: macrófagos, células dendríticas, linfocitos B"],
      ["Qué presenta", "fragmentos de proteínas fabricadas dentro (virus, tumor)", "fragmentos de lo que han fagocitado o captado"],
      ["Linfocito T que lo reconoce", "T citotóxico (CD8)", "T colaborador (CD4)"]
    ], "q3t") +
    "<h5>Selección clonal (Burnet)</h5>" +
    "<p>Cada linfocito nace con un receptor único. Cuando entra un antígeno, <b>«selecciona»</b> a los pocos linfocitos cuyo receptor encaja con él: estos se activan y se dividen muchas veces (<b>expansión clonal</b>), y dan células efectoras (que actúan ya) y células de memoria (que esperan). Los demás linfocitos no se tocan.</p>" +
    "<h5>Respuesta humoral: anticuerpos en los líquidos del cuerpo</h5>" +
    "<ol><li>Un linfocito B reconoce al antígeno con su receptor (un anticuerpo en su superficie) y lo capta.</li>" +
    "<li>Muestra un fragmento sobre el MHC-II a un <b>linfocito T colaborador</b> que lo reconoce y libera <b>interleucinas</b>.</li>" +
    "<li>Con esa «ayuda», el linfocito B se divide (expansión clonal).</li>" +
    "<li>Se forman <b>células plasmáticas</b> (fábricas de anticuerpos: miles por segundo, de unos días de vida) y <b>linfocitos B de memoria</b>.</li></ol>" +
    w("orden", "ordenhumoral") +
    "<h5>Respuesta celular: destruir las células infectadas</h5>" +
    "<p>Un linfocito T citotóxico reconoce un antígeno unido al MHC-I de una célula infectada o tumoral, y (con la ayuda de los T colaboradores) se activa y se multiplica. Los clones se unen a las células diana y liberan <b>perforina</b> (abre poros) y <b>granzimas</b> (enzimas que entran y provocan la muerte por apoptosis). Esta respuesta es la clave frente a virus, células tumorales y trasplantes.</p>" +
    tabla(["Tipo de linfocito", "Función"], [
      ["<b>B</b>", "Reconoce antígenos libres; se transforma en célula plasmática (anticuerpos) o de memoria"],
      ["<b>T colaborador (Th, CD4)</b>", "Dirige la respuesta: activa B, Tc y macrófagos con interleucinas. Es la diana del VIH"],
      ["<b>T citotóxico (Tc, CD8)</b>", "Mata células infectadas o tumorales con perforina y granzimas"],
      ["<b>T reguladores (Treg)</b>", "Frenan la respuesta para evitar daños y autoinmunidad"],
      ["<b>NK</b>", "(Innata) mata células sin MHC-I normal, sin necesitar memoria"]
    ], "q3t") +
    ojo("En el examen se mezclan con frecuencia: <b>humoral = linfocitos B + anticuerpos (contra antígenos libres: bacterias, toxinas, virus fuera de la célula)</b>; <b>celular = linfocitos T citotóxicos (contra células infectadas, tumorales o trasplantadas)</b>. Los T colaboradores participan en las dos."));

  // ---------------------------------------------------------------- 4. Anticuerpos
  secciones[3] = env(
    "<h5>Estructura: cuatro cadenas en forma de Y</h5>" +
    "<p>Los anticuerpos o <b>inmunoglobulinas (Ig)</b> son proteínas globulares con estructura cuaternaria (Tema 4): <b>cuatro cadenas polipeptídicas</b> unidas por <b>puentes disulfuro</b>: <b>dos pesadas</b> (H, ≈ 50 kDa) y <b>dos ligeras</b> (L, ≈ 25 kDa). Un IgG pesa, por tanto, unos 2·50 + 2·25 = 150 kDa.</p>" +
    tabla(["Zona", "Qué es", "Función"], [
      ["<b>Región variable</b>", "Extremo de cada brazo (parte de una cadena H y una L); su secuencia cambia entre anticuerpos", "Forma el <b>sitio de unión</b> al antígeno: 2 por IgG"],
      ["<b>Región constante</b>", "Resto de las cadenas; igual en los anticuerpos de la misma clase", "Determina la <b>clase</b>; el fragmento <b>Fc</b> se une a fagocitos y activa el complemento"],
      ["<b>Región bisagra</b>", "Zona flexible entre brazos y tronco", "Permite abrir y cerrar la «Y»"]
    ], "q3t") +
    "<p>Se habla de <b>fragmentos Fab</b> (los dos brazos, «unión al antígeno») y <b>Fc</b> (el tronco, «cristalizable»).</p>" +
    w("bio_anticuerpo") +
    "<h5>Cinco clases de inmunoglobulinas</h5>" +
    tabla(["Clase", "Estructura", "Dónde y cuándo", "Papel principal"], [
      ["<b>IgG</b>", "monómero (2 sitios)", "sangre; ≈ 75–80 % del total; domina en la respuesta secundaria", "Neutraliza, opsoniza; <b>atraviesa la placenta</b> (protege al feto)"],
      ["<b>IgM</b>", "pentámero (10 sitios)", "sangre; es la <b>primera</b> en aparecer", "Aglutina y activa el complemento; los anticuerpos anti-A y anti-B son IgM"],
      ["<b>IgA</b>", "dímero (4 sitios)", "secreciones: saliva, lágrimas, leche, mucosas", "Defensa de las mucosas; pasa al lactante con la leche"],
      ["<b>IgE</b>", "monómero", "unida a mastocitos; muy poca en sangre", "Defensa frente a parásitos; <b>causa de las alergias</b>"],
      ["<b>IgD</b>", "monómero", "superficie de los linfocitos B", "Receptor del linfocito B"]
    ], "q3t") +
    "<h5>Reacción antígeno-anticuerpo</h5>" +
    "<p>La unión es <b>específica</b> (cada anticuerpo, un epítopo), <b>reversible</b> y <b>no covalente</b> (puentes de hidrógeno y otras fuerzas débiles que actúan gracias a la complementariedad de forma, Tema 4). El complejo antígeno-anticuerpo <b>no destruye</b> por sí solo al patógeno (salvo que lo neutralice): lo <b>marca o lo inmoviliza</b> para que otros lo eliminen. Efectos:</p>" +
    tabla(["Efecto", "Qué ocurre", "Ejemplo"], [
      ["<b>Neutralización</b>", "El anticuerpo tapa la zona del antígeno que usa el patógeno o la toxina", "Un virus no puede unirse a su célula; antitoxina tetánica"],
      ["<b>Aglutinación</b>", "Unión de antígenos de varias partículas en grumos", "Hematíes en una transfusión incompatible; pruebas de grupo sanguíneo"],
      ["<b>Precipitación</b>", "Antígenos solubles forman un precipitado", "Toxinas y proteínas disueltas"],
      ["<b>Opsonización</b>", "El anticuerpo (por el Fc) facilita la fagocitosis", "Bacterias recubiertas de IgG"],
      ["<b>Activación del complemento</b>", "El complejo Ag-Ac inicia la cascada del complemento", "Lisis de bacterias"]
    ], "q3t") +
    "<h5>Anticuerpos monoclonales</h5>" +
    "<p>Un <b>clon</b> de células plasmáticas fabrica anticuerpos idénticos, todos contra el mismo epítopo: son los <b>monoclonales</b>. Se obtienen fusionando un linfocito B con una célula tumoral inmortal (un <b>hibridoma</b>): <b>Köhler y Milstein, 1975</b> (Nobel 1984). Se usan en diagnóstico (test de embarazo, pruebas de covid) y en terapia (algunos cánceres, enfermedades autoinmunes).</p>" +
    w("emparejar", "ig") +
    ojo("Un anticuerpo <b>no es una célula</b> ni un enzima: es una proteína. Lo fabrican las <b>células plasmáticas</b> (procedentes de linfocitos B), no los linfocitos T. Y no «mata» al antígeno: lo neutraliza o lo marca."));

  // ---------------------------------------------------------------- 5. Memoria y vacunas
  secciones[4] = env(
    "<h5>Cómo se lee la gráfica de la respuesta inmunitaria</h5>" +
    "<p>La gráfica clásica representa la <b>concentración de anticuerpos</b> en sangre (eje Y) frente a los <b>días</b> (eje X) tras dos contactos con un antígeno. Hay que fijarse en cuatro cosas: la <b>latencia</b> (tiempo hasta que aparecen anticuerpos), la <b>altura del pico</b>, la <b>pendiente</b> y la <b>duración</b>.</p>" +
    tabla(["", "Respuesta primaria", "Respuesta secundaria"], [
      ["Contacto", "primero con ese antígeno", "segundo o posterior, con el <b>mismo</b> antígeno"],
      ["Latencia", "larga: 5–10 días", "corta: 1–3 días"],
      ["Cantidad de anticuerpos", "baja", "mucho mayor (≈ 10 veces o más)"],
      ["Clase predominante", "IgM primero, luego IgG", "sobre todo IgG (y de más afinidad)"],
      ["Duración", "corta", "larga (los niveles tardan en caer)"],
      ["Células", "se forman linfocitos de memoria", "actúan los linfocitos de <b>memoria</b>"]
    ], "q3t") +
    w("bio_respuesta") +
    "<p>Fíjate en el caso del <b>antígeno distinto</b>: la memoria es específica. Haber pasado el sarampión no ayuda frente a la gripe. Es otra respuesta primaria.</p>" +
    "<h5>Por qué funcionan las vacunas</h5>" +
    "<p>Una <b>vacuna</b> contiene el antígeno (el patógeno atenuado o muerto, partes de él, una toxina inactivada o el ARN para fabricarlo) sin causar la enfermedad. Provoca una respuesta primaria controlada y deja células de memoria. Cuando llega el patógeno de verdad, la respuesta es secundaria: rápida e intensa. Muchas vacunas necesitan <b>dosis de recuerdo</b>: la segunda dosis hace de «segundo contacto» y sube la memoria.</p>" +
    "<p>Una persona vacunada protege además a quien no puede vacunarse: es la <b>inmunidad de grupo</b>. Si el patógeno contagia, de media, a R<sub>0</sub> personas, hay que inmunizar a una fracción 1 − 1/R<sub>0</sub> de la población para frenarlo. Para el sarampión (R<sub>0</sub> ≈ 12–18), del orden del 92–94 %.</p>" +
    ojo("La memoria no está en los anticuerpos sino en las <b>células de memoria</b>: los anticuerpos se degradan en semanas o meses; los linfocitos de memoria duran años. Por eso un análisis puede no mostrar anticuerpos y haber inmunidad."));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Órganos y células del sistema inmunitario", html: env(
    "<p>Todas las células del sistema inmunitario proceden de <b>células madre hematopoyéticas de la médula ósea roja</b>. Se agrupan en dos linajes:</p>" +
    tabla(["Linaje", "Células", "Función resumida"], [
      ["<b>Mieloide</b>", "neutrófilos, eosinófilos, basófilos, monocitos → macrófagos, células dendríticas, mastocitos", "fagocitar, inflamación, alergia, presentar antígenos"],
      ["<b>Linfoide</b>", "linfocitos B, linfocitos T, células NK", "respuesta específica (B, T) y destrucción de células anómalas (NK)"]
    ], "q3t") +
    "<h5>Órganos linfoides</h5>" +
    tabla(["Tipo", "Órganos", "Qué ocurre ahí"], [
      ["<b>Primarios</b> (se forman y maduran las células)", "<b>médula ósea</b>; <b>timo</b>", "En la médula se fabrican todas las células y maduran los <b>B</b>; los precursores de los <b>T</b> viajan al timo y maduran allí (aprenden a no atacar lo propio)"],
      ["<b>Secundarios</b> (se encuentran los linfocitos con el antígeno)", "<b>ganglios linfáticos</b>, <b>bazo</b>, amígdalas, placas de Peyer, apéndice", "Los ganglios filtran la <b>linfa</b>; el bazo filtra la <b>sangre</b> y retira hematíes viejos; el tejido linfoide de las mucosas vigila las entradas"]
    ], "q3t") +
    "<p>Los ganglios se hinchan en una infección (las «anginas» o «paperas» del cuello) porque allí se multiplican los linfocitos activados. La B de «linfocito B» viene de la <i>bolsa de Fabricio</i> de las aves, donde se descubrió; en mamíferos madura en la médula ósea (<i>bone marrow</i>).</p>" +
    tabla(["Célula", "Qué hace"], [
      ["<b>Neutrófilo</b>", "Fagocito muy abundante; primero en llegar a una infección"],
      ["<b>Macrófago</b>", "Fagocito de los tejidos, vive mucho; presenta antígenos"],
      ["<b>Célula dendrítica</b>", "La mejor presentadora de antígenos: lleva el antígeno al ganglio"],
      ["<b>Mastocito</b> / <b>basófilo</b>", "Liberan histamina (inflamación y alergia)"],
      ["<b>Eosinófilo</b>", "Ataca parásitos grandes; participa en la alergia"],
      ["<b>Célula plasmática</b>", "Linfocito B diferenciado que fabrica anticuerpos"],
      ["<b>Célula de memoria</b>", "B o T de larga vida que permite la respuesta secundaria"]
    ], "q3t") +
    w("emparejar", "celulas") +
    ojo("Los linfocitos B y T se <b>ven igual</b> al microscopio; se distinguen por las proteínas de su superficie (CD4, CD8, receptores). Y el <b>timo</b> es solo de linfocitos <b>T</b> («T» de timo); es grande en el niño y se reduce con la edad.")) });

  nuevas.push({ h: "7. Tipos de inmunidad: natural y artificial, activa y pasiva", html: env(
    "<p>Se clasifica según <b>cómo se adquiere</b> (natural o artificial) y <b>quién fabrica los anticuerpos</b> (activa: el propio organismo; pasiva: se reciben ya hechos).</p>" +
    tabla(["", "Activa (fabrica el organismo)", "Pasiva (anticuerpos ya hechos)"], [
      ["<b>Natural</b>", "Pasar la enfermedad (infección)", "Anticuerpos de la madre al feto (IgG por la placenta) y al lactante (IgA en la leche)"],
      ["<b>Artificial</b>", "<b>Vacuna</b>", "<b>Suero</b> (inmunoglobulinas de otro individuo o animal)"]
    ], "q3t") +
    tabla(["", "Vacuna", "Suero"], [
      ["Contiene", "antígeno (o su instrucción)", "anticuerpos ya formados"],
      ["Inicio de la protección", "lento (días o semanas)", "inmediato"],
      ["Duración", "larga: hay memoria", "corta (semanas): no hay memoria"],
      ["Uso", "<b>preventivo</b> (antes de la exposición)", "<b>curativo</b> o de urgencia (veneno, tétanos, rabia, botulismo)"],
      ["Ejemplos", "sarampión, hepatitis B, tétanos, gripe, covid-19", "suero antiofídico, antitetánico, inmunoglobulina anti-D"]
    ], "q3t") +
    "<h5>Tipos de vacuna</h5>" +
    tabla(["Tipo", "Ejemplos", "Nota"], [
      ["<b>Atenuadas</b> (vivas, debilitadas)", "triple vírica (sarampión, rubeola, parotiditis), varicela, BCG", "respuesta fuerte; no para inmunodeprimidos"],
      ["<b>Inactivadas</b> (muertas)", "gripe, polio inyectable, hepatitis A", "más seguras; suelen pedir recuerdos"],
      ["<b>Toxoides</b> (toxina inactivada)", "tétanos, difteria", "protegen frente a la toxina, no a la bacteria"],
      ["<b>Subunidades / recombinantes</b>", "hepatitis B, VPH", "solo una proteína del patógeno"],
      ["<b>De ARNm</b>", "covid-19", "dan la instrucción para fabricar el antígeno"]
    ], "q3t") +
    "<p>Hitos: <b>Edward Jenner</b> inoculó en 1796 el virus de la viruela vacuna (de ahí «vacuna») y protegió de la viruela humana, enfermedad que la OMS declaró erradicada en 1980. <b>Louis Pasteur</b> desarrolló en 1885 la vacuna contra la rabia. <b>Behring y Kitasato</b> introdujeron los sueros en 1890.</p>" +
    w("clasificar", "inmunidad") +
    ojo("«Suero» en Medicina (anticuerpos, inmunidad pasiva) no es el «suero fisiológico» del Tema 1 (NaCl al 0,9 %). Y los antibióticos <b>no</b> actúan sobre virus ni son vacunas.")) });

  nuevas.push({ h: "8. Alteraciones del sistema inmunitario", html: env(
    "<p>El sistema inmunitario puede equivocarse de tres maneras: reaccionando <b>de más</b> frente a algo inofensivo (<b>alergia</b>), contra lo <b>propio</b> (<b>autoinmunidad</b>) o <b>de menos</b> (<b>inmunodeficiencia</b>).</p>" +
    tabla(["", "Alergia", "Autoinmunidad", "Inmunodeficiencia"], [
      ["Qué ocurre", "Respuesta exagerada a una sustancia inocua (alérgeno)", "Se ataca a moléculas o células propias", "Defensas insuficientes"],
      ["Causa", "IgE y mastocitos", "Pérdida de la tolerancia (T y B autorreactivos)", "Falta o fallo de linfocitos, anticuerpos o complemento"],
      ["Ejemplos", "rinitis por polen, asma alérgica, alergia a la penicilina o al cacahuete", "diabetes tipo 1, esclerosis múltiple, artritis reumatoide, lupus, celiaquía", "SIDA (adquirida); inmunodeficiencia combinada grave («niño burbuja», congénita)"]
    ], "q3t") +
    "<h5>Alergia: dos contactos</h5>" +
    "<ol><li><b>Sensibilización</b> (1.er contacto): el alérgeno estimula a los linfocitos B a fabricar <b>IgE</b>, que se une a los <b>mastocitos</b>. No hay síntomas.</li>" +
    "<li><b>Reacción</b> (2.º contacto): el alérgeno une dos IgE de un mastocito, que libera <b>histamina</b>: picor, estornudos, urticaria, broncoconstricción.</li></ol>" +
    "<p>El caso extremo es el <b>shock anafiláctico</b>: descenso grave de la presión y dificultad para respirar; se trata con <b>adrenalina</b>. Los <b>antihistamínicos</b> alivian los síntomas leves.</p>" +
    "<h5>Autoinmunidad: cuando falla la tolerancia</h5>" +
    "<p>Ejemplos: en la <b>diabetes de tipo 1</b>, los linfocitos T destruyen las células β del páncreas; en la <b>esclerosis múltiple</b>, atacan la mielina de las neuronas; en la <b>artritis reumatoide</b>, las articulaciones. Se tratan frenando el sistema inmunitario.</p>" +
    "<h5>Inmunodeficiencias</h5>" +
    "<p>Las <b>congénitas o primarias</b> se deben a defectos genéticos (por ejemplo, ausencia de linfocitos T o de anticuerpos). Las <b>adquiridas o secundarias</b> aparecen después, por infecciones (VIH), desnutrición, quimioterapia o fármacos inmunosupresores. Sus signos son infecciones repetidas, graves o por microorganismos que normalmente no enferman (<b>oportunistas</b>).</p>" +
    w("clasificar", "alteraciones") +
    ojo("Una alergia <b>no</b> es una infección ni una inmunodeficiencia: es un exceso de respuesta. Y una enfermedad autoinmune <b>no</b> se cura con vacunas ni con antibióticos.")) });

  nuevas.push({ h: "9. El SIDA y el VIH", html: env(
    "<p>El <b>SIDA</b> (síndrome de inmunodeficiencia adquirida) es la fase avanzada de la infección por el <b>VIH</b> (virus de la inmunodeficiencia humana), un <b>retrovirus</b> (Tema 14): su genoma es ARN monocatenario y la enzima <b>transcriptasa inversa</b> lo copia a ADN, que se integra en el ADN de la célula (provirus). El virus se aisló en 1983 (<b>Montagnier y Barré-Sinoussi</b>, Nobel 2008).</p>" +
    "<h5>Qué ataca y qué consecuencias tiene</h5>" +
    "<p>El VIH infecta sobre todo a los <b>linfocitos T colaboradores (CD4)</b> (también a macrófagos y células dendríticas), a los que destruye. Como los T colaboradores dirigen tanto la respuesta humoral como la celular, su pérdida paraliza al sistema: el recuento normal de CD4 es de ≈ 500–1500 por µL de sangre; con menos de 200 por µL, o ante ciertas infecciones oportunistas, se diagnostica SIDA. El paciente no muere del virus directamente, sino de infecciones oportunistas (neumonía por <i>Pneumocystis</i>, tuberculosis) y de ciertos tumores.</p>" +
    tabla(["Aspecto", "Datos"], [
      ["<b>Transmisión</b>", "Sangre (jeringuillas compartidas, transfusiones sin control), relaciones sexuales sin protección y de madre a hijo (embarazo, parto, lactancia)"],
      ["<b>No se transmite</b>", "Por besos, abrazos, saliva, piscinas, picaduras de mosquito o compartir vasos"],
      ["<b>Diagnóstico</b>", "Detección de anticuerpos anti-VIH (ELISA, confirmación) o del ARN vírico (PCR). Periodo ventana: semanas tras el contagio en las que la prueba de anticuerpos aún da negativo"],
      ["<b>Tratamiento</b>", "Terapia antirretroviral combinada: inhibidores de la transcriptasa inversa, de la proteasa y de la integrasa. Controla la infección pero no la cura"],
      ["<b>Prevención</b>", "Preservativo, no compartir agujas, control de la sangre, tratamiento a la madre gestante; profilaxis preexposición"]
    ], "q3t") +
    "<h5>¿Por qué no hay una vacuna eficaz?</h5>" +
    "<p>La transcriptasa inversa <b>comete muchos errores</b> y no los corrige, así que el virus <b>muta</b> muy rápido y cambia sus antígenos; además se esconde como provirus en las células y ataca al propio sistema que debería protegernos.</p>" +
    ojo("El SIDA <b>no</b> es el virus: es la <b>enfermedad</b> (el estado de inmunodeficiencia). Se puede ser seropositivo (VIH+) durante años sin tener SIDA, sobre todo si se trata.")) });

  nuevas.push({ h: "10. Trasplantes y grupos sanguíneos", html: env(
    "<h5>Tipos de trasplante</h5>" +
    tabla(["Tipo", "Donante y receptor", "Rechazo"], [
      ["<b>Autotrasplante</b>", "el mismo individuo (piel de una zona a otra, vena para un bypass)", "no hay"],
      ["<b>Isotrasplante</b>", "gemelos idénticos (mismo MHC)", "casi nunca"],
      ["<b>Alotrasplante</b>", "individuos distintos de la misma especie (riñón, corazón, hígado)", "sí, si no se previene"],
      ["<b>Xenotrasplante</b>", "especies distintas (válvulas cardiacas de cerdo)", "muy fuerte"]
    ], "q3t") +
    "<p>El <b>rechazo</b> ocurre porque los linfocitos T del receptor reconocen como extrañas las moléculas MHC (HLA) del órgano y lo atacan (respuesta celular). Para evitarlo se busca la mayor <b>compatibilidad HLA y de grupo sanguíneo</b>, y se toman de por vida <b>inmunosupresores</b> (ciclosporina, corticoides), con el riesgo de infecciones. En el trasplante de médula ósea puede ocurrir lo contrario: las células del donante atacan al receptor (enfermedad injerto contra huésped). El primer trasplante de riñón con éxito fue en 1954 (J. Murray, gemelos) y el primero de corazón en 1967 (C. Barnard).</p>" +
    "<h5>Grupos sanguíneos ABO</h5>" +
    "<p><b>Karl Landsteiner</b> los descubrió en 1901 (Nobel 1930). El grupo depende de los <b>antígenos</b> de la membrana de los hematíes; en el plasma hay <b>anticuerpos</b> (IgM) contra los antígenos que <b>no</b> se tienen.</p>" +
    tabla(["Grupo", "Antígenos en el hematíe", "Anticuerpos en el plasma", "Genotipos"], [
      ["<b>A</b>", "A", "anti-B", "I<sup>A</sup>I<sup>A</sup>, I<sup>A</sup>i"],
      ["<b>B</b>", "B", "anti-A", "I<sup>B</sup>I<sup>B</sup>, I<sup>B</sup>i"],
      ["<b>AB</b>", "A y B", "ninguno", "I<sup>A</sup>I<sup>B</sup>"],
      ["<b>O</b>", "ninguno", "anti-A y anti-B", "ii"]
    ], "q3t") +
    "<p>Es un caso de <b>alelos múltiples y codominancia</b> (Tema 10): I<sup>A</sup> e I<sup>B</sup> son codominantes y los dos dominan sobre <i>i</i>. El factor <b>Rh</b> (Landsteiner y Wiener, 1940) depende del antígeno D: Rh+ (DD o Dd) y Rh− (dd); el anti-D <b>no es natural</b>: solo lo forma una persona Rh− tras estar en contacto con sangre Rh+.</p>" +
    "<h5>Quién puede donar a quién</h5>" +
    "<p>Al transfundir hematíes, el problema son los anticuerpos del <b>receptor</b> contra los antígenos del <b>donante</b>. Regla práctica: el donante no puede tener ningún antígeno (A, B, D) que le falte al receptor. Así, <b>O−</b> es donante universal de hematíes (no tiene antígenos) y <b>AB+</b> receptor universal (no tiene anticuerpos). De las 8 × 8 = 64 combinaciones donante-receptor (ABO y Rh), 27 son compatibles.</p>" +
    w("bio_transfusion") +
    w("emparejar", "hitos") +
    "<h5>Genética de los grupos sanguíneos</h5>" +
    ejemplo("Hijos de A (heterocigoto) × B (heterocigoto)", "Un hombre de grupo A cuyo padre era del grupo O y una mujer de grupo B cuya madre era del grupo O tienen hijos. ¿Qué grupos y con qué probabilidad?", [
      "Si su padre era ii, el hombre es heterocigoto: <b>I<sup>A</sup>i</b>. Igualmente, la mujer: <b>I<sup>B</sup>i</b>.",
      "Gametos del padre: ½ I<sup>A</sup> y ½ i. De la madre: ½ I<sup>B</sup> y ½ i.",
      "Cuadro: I<sup>A</sup>I<sup>B</sup> (AB), I<sup>A</sup>i (A), I<sup>B</sup>i (B) e ii (O), cada uno con probabilidad <b>¼</b>.",
      "Es el único cruce que puede dar los cuatro grupos."
    ]) +
    ejemplo("Rh combinado con ABO", "Madre A Rh+ (I<sup>A</sup>i, Dd) y padre B Rh+ (I<sup>B</sup>i, Dd). ¿Probabilidad de un hijo O Rh−?", [
      "Los dos genes son independientes (cromosomas distintos).",
      "P(O) = P(ii) = ¼. P(Rh−) = P(dd) = ¼.",
      "P(O y Rh−) = ¼ · ¼ = <b>1/16</b> = 6,25 %."
    ]) +
    "<h5>Incompatibilidad materno-fetal Rh</h5>" +
    "<p>Si una madre <b>Rh−</b> espera un hijo <b>Rh+</b> (heredó el D del padre), durante el <b>parto</b> pueden pasar hematíes fetales a la sangre materna, que se <b>sensibiliza</b> y forma <b>anti-D (IgG)</b>. El primer hijo no sufre; en un <b>segundo</b> embarazo con feto Rh+, el anti-D atraviesa la placenta y destruye sus hematíes: <b>enfermedad hemolítica del recién nacido</b> (eritroblastosis fetal). Se previene inyectando a la madre <b>inmunoglobulina anti-D</b> tras el parto (inmunidad pasiva, que elimina los hematíes fetales antes de que se sensibilice).</p>" +
    ojo("En una transfusión importa lo que lleva el <b>donante</b> en los hematíes y lo que tiene el <b>plasma del receptor</b>. Un receptor AB+ puede recibir hematíes de cualquier grupo; un donante O− puede dar a cualquiera. Pero el <b>plasma</b> (si se transfunde) se rige al revés.")) });

  nuevas.push({ h: "11. Ejemplo PAU resuelto: interpretar una gráfica y un experimento", html: env(
    ejemplo("La gráfica de dos inoculaciones", "Un ratón recibe el día 0 el antígeno A. El día 30 recibe de nuevo A y, además, el antígeno B. Se mide el nivel de anticuerpos anti-A y anti-B. Resultados: anti-A: aparecen el día 6, pico de 1 unidad el día 14; tras la 2.ª inyección, aparecen el día 32 y alcanzan 10 unidades. Anti-B: aparecen el día 36 y alcanzan 1 unidad el día 44. a) ¿Qué tipo de respuesta es cada una? b) Explícalo. c) ¿Qué células intervienen en la anti-A del día 30?", [
      "<b>a)</b> Anti-A tras la 1.ª inyección: respuesta <b>primaria</b> (latencia de 6 días, pico bajo). Anti-A tras la 2.ª: <b>secundaria</b> (latencia de 2 días, 10 veces más alta). Anti-B: <b>primaria</b> (latencia de 6 días, pico de 1).",
      "<b>b)</b> A ya se conocía: hay linfocitos B y T de <b>memoria</b> específicos de A, que responden rápido y mucho. B es nuevo: no hay memoria, por lo que se repite una respuesta primaria. La memoria es <b>específica de antígeno</b>.",
      "<b>c)</b> Linfocitos B de memoria (que se dividen y dan células plasmáticas que secretan IgG) y linfocitos T colaboradores de memoria que los ayudan.",
      "<b>Comprobación numérica:</b> la latencia pasa de 6 a 2 días (3 veces menos) y el pico de 1 a 10 (10 veces más)."
    ]) +
    ejemplo("Un experimento con ratones timectomizados", "Se extirpa el timo a ratones recién nacidos. De mayores, tardan mucho en rechazar injertos de piel de otra cepa y tienen pocas respuestas contra virus, pero fabrican anticuerpos contra algunos antígenos simples. Interpreta.", [
      "Sin timo no maduran los linfocitos <b>T</b>: sin T citotóxicos no hay <b>rechazo</b> (respuesta celular) ni defensa frente a virus.",
      "Sin T colaboradores, la respuesta humoral a casi todos los antígenos es pobre, porque los B necesitan su ayuda; pero algunos antígenos sencillos activan a los B directamente (por eso conservan algo de anticuerpos).",
      "Conclusión: el <b>timo</b> es necesario para la <b>inmunidad celular</b> y para la humoral dependiente de T. Es un modelo de inmunodeficiencia."
    ])) });

  nuevas.push({ h: "12. Cómo se pregunta en la PAU y cómo responder", html: env(
    ejemplo("Pregunta 1. Diferencias entre inmunidad innata y adaptativa", "Respuesta modelo:", [
      "<b>Innata:</b> inespecífica, inmediata, sin memoria. Barreras, fagocitos, complemento, interferón, NK, inflamación.",
      "<b>Adaptativa:</b> específica (reconoce un antígeno concreto), lenta la primera vez y con <b>memoria</b>. Linfocitos B (humoral, anticuerpos) y T (celular).",
      "Colaboran: los fagocitos presentan antígenos a los T; los anticuerpos opsonizan."
    ]) +
    ejemplo("Pregunta 2. Estructura y función de los anticuerpos", "Respuesta modelo:", [
      "Proteínas (inmunoglobulinas) con <b>4 cadenas</b>: 2 pesadas y 2 ligeras, unidas por puentes disulfuro, en forma de Y.",
      "Región <b>variable</b> (extremos de los brazos): sitio de unión específico al antígeno. Región <b>constante</b>: determina la clase y las funciones (Fc).",
      "Los fabrican las células plasmáticas. Neutralizan, aglutinan, precipitan, opsonizan y activan el complemento."
    ]) +
    ejemplo("Pregunta 3. Vacuna y suero", "Respuesta modelo:", [
      "<b>Vacuna:</b> antígeno atenuado o inactivado; inmunidad <b>activa artificial</b>, duradera por la memoria, lenta; <b>preventiva</b>.",
      "<b>Suero:</b> anticuerpos ya formados; inmunidad <b>pasiva artificial</b>, inmediata, temporal y sin memoria; <b>curativa</b> o de urgencia.",
      "Ejemplo: vacuna del tétanos (prevenir) y suero antitetánico (tras una herida sin vacunar)."
    ]) +
    ejemplo("Pregunta 4. ¿Por qué el VIH debilita las defensas?", "Respuesta modelo:", [
      "Es un retrovirus que infecta a los linfocitos T colaboradores (CD4) y los destruye.",
      "Sin T colaboradores no se activan bien ni la respuesta humoral ni la celular.",
      "Aparecen infecciones oportunistas: es el SIDA."
    ]) +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio15a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
