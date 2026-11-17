/* ============================================================
   Biología II · ampliaciones · Tema 13 (parte B): PCR, clonación, transgénicos, CRISPR, terapia génica, bioética y PAU.
   Las secciones 10 a 15 (continúan las de bio2_t13a.js).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t13/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var nuevas = [];

  nuevas.push({ h: "10. La PCR: fotocopiar un trozo de ADN", html: env(
    "<h5>Qué es y qué necesita</h5>" +
    "<p>La <b>PCR</b> (reacción en cadena de la polimerasa) es la replicación del T11 hecha en un tubo de ensayo: copia muchas veces <b>un fragmento concreto</b> de ADN, entre dos puntos que tú eliges. La inventó Kary Mullis en 1983 (premio Nobel de Química en 1993). Con unas pocas moléculas de partida se obtienen millones de copias en un par de horas, lo que permite analizar una gota de sangre, un pelo o un resto antiguo.</p>" +
    "<p>Lleva cinco ingredientes (los verás en cualquier pregunta):</p>" +
    tabla(["Componente", "Para qué sirve"], [
      ["<b>ADN molde</b>", "contiene la región que se quiere copiar (puede ser mínimo)"],
      ["<b>Dos cebadores</b> (oligonucleótidos de ≈ 18-25 nt)", "son complementarios a los extremos de la región; uno para cada hebra: <b>delimitan</b> la zona a copiar y dan el 3′-OH que la polimerasa necesita (T11)"],
      ["<b>ADN polimerasa termoestable (Taq)</b>", "sintetiza las hebras nuevas; viene de <i>Thermus aquaticus</i>, una bacteria de aguas termales, y <b>aguanta los 95 °C</b> sin destruirse"],
      ["<b>Nucleótidos</b> (dATP, dGTP, dCTP, dTTP)", "los ladrillos para las cadenas nuevas"],
      ["<b>Tampón con Mg²⁺</b>", "mantiene las condiciones químicas y el Mg²⁺ es cofactor de la polimerasa"]
    ], "q3t") +
    "<h5>Los tres pasos de cada ciclo</h5>" +
    "<p>Un <b>termociclador</b> cambia la temperatura del tubo siguiendo un programa. Cada ciclo repite tres pasos, y se hacen unos 25-35 ciclos:</p>" +
    tabla(["Paso", "Temperatura", "Qué ocurre"], [
      ["<b>1. Desnaturalización</b>", "94-96 °C", "el calor rompe los puentes de hidrógeno: la doble hélice se separa en dos hebras sencillas"],
      ["<b>2. Anillamiento (hibridación)</b>", "50-65 °C", "al enfriar, cada <b>cebador</b> se une a su secuencia complementaria en el molde"],
      ["<b>3. Extensión (elongación)</b>", "72 °C", "la <b>Taq polimerasa</b> alarga cada cebador en sentido 5′ → 3′, copiando el molde"]
    ], "q3t") +
    "<p>Al acabar un ciclo, <b>cada molécula de la región se ha convertido en dos</b>. Los productos del ciclo anterior sirven de molde del siguiente: por eso es una <b>reacción en cadena</b> y el crecimiento es <b>exponencial</b>.</p>" +
    "<h5>Cuántas copias: 2<sup>n</sup></h5>" +
    "<p>Si en cada ciclo todas las moléculas se duplican, partiendo de <i>N</i><sub>0</sub> moléculas, tras <i>n</i> ciclos hay <b><i>N</i><sub>0</sub> · 2<sup><i>n</i></sup></b> moléculas. Con 1 molécula: 10 ciclos → 1024; 20 ciclos → 1 048 576; 30 ciclos → más de mil millones (1,07·10<sup>9</sup>). Con una eficiencia menor (<i>e</i> en tanto por uno), <i>N</i> = <i>N</i><sub>0</sub> (1 + <i>e</i>)<sup><i>n</i></sup>: con <i>e</i> = 0,9 y 10 ciclos salen 613 copias en lugar de 1024, y la diferencia se dispara con los ciclos.</p>" +
    "<p>Un detalle fino que se pregunta poco pero entiende quien lo ha dibujado: en los dos primeros ciclos salen moléculas <b>más largas</b> que la región buscada (el cebador solo marca un extremo). Las moléculas del <b>tamaño exacto</b> aparecen a partir del ciclo 3, y su número tras <i>n</i> ciclos es 2<sup><i>n</i></sup> − 2<i>n</i> (partiendo de una molécula): 2 tras 3 ciclos, 8 tras 4, 22 tras 5, y enseguida casi todas.</p>" +
    w("bio_pcr") +
    ojo("La PCR <b>no necesita</b> helicasa ni ligasa (el calor abre la hélice y no hay fragmentos de Okazaki). Tampoco se usa una polimerasa normal: se destruiría a 95 °C. Y el <b>número de ciclos no es infinito</b>: pasados unos 30-35 se agotan reactivos y el crecimiento llega a una meseta.") +
    "<h5>Variantes y usos</h5>" +
    "<ul><li><b>RT-PCR</b> (con retrotranscriptasa): primero se pasa el <b>ARN</b> a ADNc y después se amplifica. Es la base de las pruebas de <b>COVID-19</b>, porque el SARS-CoV-2 es un virus de ARN.</li>" +
    "<li><b>PCR en tiempo real</b> (qPCR): mide la fluorescencia ciclo a ciclo y permite <b>cuantificar</b> cuánto ADN o ARN había al empezar (carga viral).</li>" +
    "<li><b>Diagnóstico</b>: detectar virus o bacterias, o mutaciones concretas (por ejemplo, la de la fibrosis quística).</li>" +
    "<li><b>Ciencia forense y paternidad</b>: se amplifican regiones con repeticiones cortas muy variables (STR). La combinación de varias es casi única de cada persona: la <b>huella genética</b> (Jeffreys, 1984-85).</li>" +
    "<li><b>Arqueología y evolución</b>: amplificar ADN antiguo (el de neandertales, por Svante Pääbo, Nobel 2022).</li>" +
    "<li><b>Clonar genes</b> para ligarlos a un vector.</li></ul>" +
    "<p>Limitaciones: hay que conocer la secuencia de los extremos para diseñar los cebadores; la <b>contaminación</b> con una sola molécula de ADN ajeno arruina el resultado; y la polimerasa comete algún error (muy pocos con las polimerasas de alta fidelidad).</p>"
  ) });

  nuevas.push({ h: "11. Clonación, transgénicos, CRISPR y terapia génica", html: env(
    "<h5>Clonación de organismos</h5>" +
    "<p>Hay que distinguir bien dos cosas: la <b>clonación molecular</b> (copiar un gen, secciones 8-9) y la <b>clonación de un organismo</b>: obtener un individuo genéticamente igual a otro. Un <b>clon</b> es un conjunto de individuos o células con el mismo ADN. La clonación natural existe (gemelos idénticos, esquejes de plantas, bacterias que se dividen).</p>" +
    "<p>La clonación artificial de mamíferos se hace por <b>transferencia nuclear de células somáticas</b>, el método de la oveja <b>Dolly</b> (Wilmut y Campbell, Instituto Roslin, nació en 1996 y se anunció en 1997):</p>" +
    "<ol><li>Se toma una <b>célula somática</b> de la oveja que se quiere copiar (en Dolly, de la glándula mamaria de una oveja adulta) y se aísla su <b>núcleo</b>.</li>" +
    "<li>Se toma un <b>óvulo</b> de otra oveja y se le <b>quita el núcleo</b> (óvulo enucleado).</li>" +
    "<li>Se introduce el núcleo de la célula somática en el óvulo (o se funden con una descarga eléctrica).</li>" +
    "<li>El óvulo, estimulado, se divide y forma un <b>embrión</b>.</li>" +
    "<li>El embrión se implanta en el útero de una <b>tercera oveja</b> («madre de alquiler»).</li>" +
    "<li>Nace un cordero con el ADN nuclear idéntico al de la oveja donante: Dolly era un <b>clon</b> de la oveja de la que se tomó la célula mamaria.</li></ol>" +
    "<p>Fue la prueba de que el núcleo de una célula adulta ya diferenciada puede <b>reprogramarse</b> (John Gurdon lo había logrado antes en ranas, en 1962). La eficiencia es muy baja (Dolly fue 1 de 277 intentos) y los clones pueden envejecer antes o tener problemas de salud (Dolly murió en 2003).</p>" +
    "<p>Se distinguen dos objetivos: <b>clonación reproductiva</b> (obtener un individuo entero; prohibida en humanos) y <b>clonación terapéutica</b> (obtener <b>células madre</b> de un embrión clónico para generar tejidos compatibles con el paciente, sin rechazo). Hoy se prefiere otra vía, las <b>células iPS</b> (Yamanaka, 2006; Nobel 2012 junto a Gurdon): se «reprograman» células adultas del paciente con cuatro genes, sin usar embriones.</p>" +
    "<h5>Organismos transgénicos</h5>" +
    "<p>Un <b>organismo transgénico</b> (OMG, organismo modificado genéticamente) lleva en su genoma un gen de <b>otra especie</b>, el <b>transgén</b>. Se obtiene con los pasos de las secciones 8 y 9 (vector, introducción, selección) aplicados a una célula que luego da el organismo completo. Ejemplos:</p>" +
    tabla(["Organismo", "Transgén", "Para qué"], [
      ["<b>Bacterias y levaduras</b>", "genes humanos (insulina, hormona del crecimiento)", "fábricas de proteínas terapéuticas"],
      ["<b>Maíz Bt</b>", "gen de la toxina de <i>Bacillus thuringiensis</i>", "resistente al taladro (una oruga plaga), con menos insecticida"],
      ["<b>Arroz dorado</b>", "genes para fabricar β-caroteno (precursor de la vitamina A)", "prevenir la ceguera por falta de vitamina A en poblaciones que comen arroz"],
      ["<b>Soja resistente a glifosato</b>", "gen de una bacteria", "poder echar herbicida sin matar el cultivo"],
      ["<b>Ratones «knock-out»</b>", "un gen concreto se inactiva", "estudiar para qué sirve ese gen y modelar enfermedades (Nobel 2007: Capecchi, Evans, Smithies)"],
      ["<b>Animales «biorreactor»</b>", "genes humanos en la leche (cabras, ovejas)", "obtener proteínas médicas de la leche"]
    ], "q3t") +
    "<h5>CRISPR-Cas9: editar el ADN con un «buscar y reemplazar»</h5>" +
    "<p>Las bacterias tienen un <b>sistema inmune adaptativo</b> contra los virus: guardan trozos de ADN del virus entre repeticiones (CRISPR) y los usan para reconocerlo y cortarlo con una nucleasa, la <b>Cas9</b>, si vuelve a infectarlas. En 2012, <b>Jennifer Doudna y Emmanuelle Charpentier</b> demostraron que se podía reprogramar como una herramienta de edición genética (Nobel de Química 2020). El sistema tiene dos piezas:</p>" +
    "<ol><li><b>El ARN guía</b>: una molécula de unos 20 nt que se diseña para ser <b>complementaria</b> a la secuencia del gen que se quiere cambiar. Es la «dirección».</li>" +
    "<li><b>La enzima Cas9</b>: la «tijera» que, guiada por el ARN, <b>corta las dos hebras</b> del ADN justo en esa secuencia (junto a una pequeña señal llamada PAM).</li></ol>" +
    "<p>Después actúa la propia <b>reparación del ADN</b> de la célula (T11), y de ahí salen dos usos:</p>" +
    tabla(["Cómo repara la célula", "Resultado", "Uso"], [
      ["<b>Unión de extremos</b> (NHEJ): pega los extremos a lo bruto", "pequeñas inserciones o deleciones que <b>desplazan el marco</b> y rompen el gen", "<b>inactivar</b> (knock-out) un gen"],
      ["<b>Reparación con molde</b> (HDR): copia una plantilla que se le añade", "el gen queda <b>corregido</b> o con un fragmento nuevo", "<b>corregir</b> una mutación o <b>insertar</b> una secuencia"]
    ], "q3t") +
    "<p>Frente a las técnicas anteriores, CRISPR es más <b>barato, rápido y fácil de redirigir</b> (basta cambiar los 20 nt del ARN guía). Sus limitaciones: puede cortar en sitios parecidos que no eran los previstos (<b>efectos fuera de diana</b>) y la reparación no siempre sale como se quiere. En 2018, el científico chino He Jiankui anunció haber editado embriones humanos con CRISPR que dieron lugar a dos niñas; fue condenado y la comunidad científica lo rechazó, porque la edición germinal en humanos no estaba justificada ni era segura.</p>" +
    "<h5>Terapia génica: curar introduciendo un gen sano</h5>" +
    "<p>Consiste en introducir en las células del paciente una <b>copia funcional de un gen</b> (o corregirlo) para tratar una enfermedad genética. Un vector (casi siempre un virus modificado) lleva el gen a las células.</p>" +
    tabla(["", "Terapia somática", "Terapia germinal"], [
      ["<b>Células que se modifican</b>", "células del cuerpo (médula ósea, retina, músculo)", "gametos, cigoto o embrión"],
      ["<b>¿Pasa a los hijos?</b>", "<b>no</b>", "<b>sí</b>: afecta a toda la descendencia"],
      ["<b>Situación</b>", "se usa y está aprobada en varias enfermedades", "<b>prohibida</b> en la mayoría de los países (en España, la ley no la permite y el Convenio de Oviedo de 1997 la prohíbe)"]
    ], "q3t") +
    "<p>Según dónde se hace, la terapia puede ser <b>ex vivo</b> (se sacan las células del paciente, se modifican en el laboratorio y se devuelven: por ejemplo, células de la médula) o <b>in vivo</b> (se inyecta el vector directamente en el tejido). Hitos y casos:</p>" +
    "<ul><li><b>1990</b>: primera terapia génica, una niña con inmunodeficiencia combinada grave (déficit de ADA, mutación en un gen de una enzima de los linfocitos): se le dieron linfocitos con el gen sano.</li>" +
    "<li><b>Problemas</b>: en 1999 un joven murió por una reacción inmune al vector; en el 2002 varios niños con otra inmunodeficiencia desarrollaron leucemia porque el retrovirus se insertó junto a un oncogén. Hoy los vectores son más seguros.</li>" +
    "<li><b>Éxitos recientes</b>: Luxturna (2017, ceguera hereditaria por mutaciones en <i>RPE65</i>, se inyecta en la retina), Zolgensma (2019, atrofia muscular espinal) y <b>Casgevy</b> (2023), la primera terapia con CRISPR aprobada: se editan las células de la médula del paciente para tratar la anemia falciforme y la β-talasemia.</li></ul>"
  ) });

  nuevas.push({ h: "12. Aplicaciones y bioética", html: env(
    "<h5>Para qué se usa la biotecnología</h5>" +
    tabla(["Campo", "Aplicaciones"], [
      ["<b>Salud</b>", "insulina, hormona del crecimiento, vacunas y anticuerpos recombinantes; diagnóstico genético (PCR, secuenciación); terapia génica y edición con CRISPR; cultivo de tejidos a partir de células madre"],
      ["<b>Agricultura y ganadería</b>", "plantas resistentes a plagas, herbicidas, sequía o con mejor valor nutritivo (arroz dorado); animales de más rendimiento"],
      ["<b>Medio ambiente</b>", "bacterias que degradan vertidos (biorremediación), biocombustibles, bioplásticos"],
      ["<b>Industria</b>", "enzimas para detergentes y alimentos, producción de fármacos, quesos y cerveza con microorganismos mejorados"],
      ["<b>Justicia y antropología</b>", "huella genética para identificar sospechosos y víctimas, pruebas de paternidad, estudios de poblaciones y de ADN antiguo"]
    ], "q3t") +
    "<h5>El debate: ventajas y riesgos</h5>" +
    tabla(["A favor", "Preocupaciones"], [
      ["curar o prevenir enfermedades hereditarias; medicamentos más seguros y baratos", "<b>seguridad</b>: efectos imprevistos (fuera de diana, reacciones al vector) a largo plazo"],
      ["alimentar a más gente con menos pesticidas y menos tierra", "<b>ambiente</b>: paso del transgén a especies silvestres (resistencias en malas hierbas), pérdida de biodiversidad"],
      ["más conocimiento científico (modelos animales de enfermedades)", "<b>sociedad</b>: patentes y acceso desigual; dependencia de pocas empresas; etiquetado y derecho a elegir"],
      ["pruebas diagnósticas rápidas y precisas", "<b>intimidad</b>: quién puede acceder a mis datos genéticos (seguros, empleo); riesgo de discriminación"],
      ["", "<b>límites éticos</b>: mejora de rasgos (¿terapia o «bebés a la carta»?), eugenesia, edición germinal, clonación humana"]
    ], "q3t") +
    "<p>En 1975, la conferencia de <b>Asilomar</b> (California) ya reunió a los propios científicos del ADN recombinante para pedir normas de seguridad. En Europa, los OMG están regulados y los alimentos que los contienen deben <b>etiquetarse</b>. La <b>bioética</b> usa cuatro principios para discutir estos casos: <b>autonomía</b> (decide la persona informada), <b>beneficencia</b> (hacer el bien), <b>no maleficencia</b> (no dañar) y <b>justicia</b> (reparto equitativo de beneficios y riesgos).</p>" +
    ojo("En un comentario de bioética en la PAU no se pide «tu opinión» sin más: se valoran <b>argumentos a favor y en contra</b> claros y ordenados, la distinción entre terapia somática y germinal, y la referencia a principios como la seguridad, la justicia y el respeto a la persona.")
  ) });

  nuevas.push({ h: "13. Ejemplo PAU resuelto: interpretar una digestión de restricción", html: env(
    "<p>Es de los más repetidos en las PAU de Madrid: te dan una tabla o un dibujo de un gel y te piden deducir cuántos sitios de corte hay, qué tipo de molécula es y cómo sería el recombinante.</p>" +
    "<p><b>Enunciado.</b> Un plásmido de 6000 pb se digiere con distintas enzimas de restricción y se separan los fragmentos por electroforesis. Se obtienen estos resultados:</p>" +
    tabla(["Muestra", "Fragmentos obtenidos (pb)"], [
      ["Plásmido sin digerir", "6000 (una banda)"],
      ["Digerido con EcoRI", "2000 y 4000"],
      ["Digerido con BamHI", "6000 (una banda)"],
      ["Digerido con EcoRI y BamHI a la vez", "800, 1200 y 4000"]
    ], "q3t") +
    "<p>(a) ¿Cuántos sitios de corte tiene cada enzima? (b) ¿Por qué BamHI da una sola banda de 6000 pb? (c) Explica la última fila. (d) Se quiere clonar un gen cortado con BamHI: ¿dónde se insertaría y para qué sirve poner en el plásmido un gen de resistencia a un antibiótico?</p>" +
    ejemplo("Resolución", "Paso a paso, como lo valora el corrector:", [
      "<b>Punto de partida:</b> un plásmido es una molécula <b>circular</b>. En una molécula circular, <b>n cortes dan n fragmentos</b> (en una lineal, n + 1). Además, la suma de los fragmentos debe dar 6000.",
      "<b>(a) EcoRI: 2 sitios</b>: da 2 fragmentos (2000 + 4000 = 6000) y en un círculo 2 fragmentos son 2 cortes. Con las dos enzimas a la vez salen 3 fragmentos (800 + 1200 + 4000 = 6000), es decir, 3 cortes en total: los 2 de EcoRI y <b>1 de BamHI</b>. <b>BamHI: 1 sitio</b>.",
      "<b>(b)</b> Un solo corte en un círculo lo <b>abre sin partirlo</b>: sale una única molécula lineal de 6000 pb, del mismo tamaño que el plásmido entero (1 corte = 1 fragmento). Por eso es una sola banda de 6000 pb.",
      "<b>(c)</b> El fragmento de 4000 pb de EcoRI no ha cambiado: no tiene sitio BamHI. El de 2000 pb ha desaparecido y han salido 800 y 1200 (800 + 1200 = 2000): el sitio BamHI está <b>dentro del fragmento de 2000 pb</b>, a 800 pb de un extremo y 1200 del otro.",
      "<b>(d)</b> Como BamHI tiene <b>un solo sitio</b>, abre el plásmido por un único punto, y el gen cortado con la misma enzima tiene extremos cohesivos compatibles: se inserta <b>en ese sitio</b> y la <b>ligasa</b> lo sella. Un solo sitio es justo lo que interesa en un vector (con dos sitios, el vector se rompería en dos trozos). El <b>gen de resistencia</b> sirve para <b>seleccionar</b>: solo crecen en la placa con el antibiótico las bacterias que han captado un plásmido."
    ]) +
    "<p>Otro modelo típico: <b>«interpreta una mutación»</b>. Te dan la secuencia del gen normal y la del mutante y debes decir (1) qué tipo de mutación es, (2) cómo queda la proteína con la tabla del código y (3) por qué esta mutación es más o menos grave. Los pasos: escribe el ARNm de cada una, divide en codones, traduce y compara. El widget de la sección 2 sirve para practicar esto.</p>"
  ) });

  nuevas.push({ h: "14. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Las preguntas de este tema siguen estos modelos. Aquí tienes cada uno con una respuesta modelo, con lo mínimo que se valora.</p>" +
    ejemplo("Pregunta 1. Define mutación y explica los tipos de mutaciones génicas según su efecto sobre la proteína", "Respuesta modelo:", [
      "<b>Definición:</b> una mutación es un cambio <b>heredable</b> en el material genético que no se debe a la recombinación. Si es germinal, pasa a la descendencia.",
      "<b>Por sustitución:</b> <b>silenciosa</b> (el codón nuevo codifica el mismo aminoácido, por la degeneración del código); de <b>cambio de sentido</b> (otro aminoácido; ejemplo: anemia falciforme, GAG → GUG, Glu → Val); <b>sin sentido</b> (aparece un codón de parada y la proteína se trunca).",
      "<b>Por inserción o deleción:</b> si no es un múltiplo de 3 desplaza el marco de lectura (<b>frameshift</b>) y cambia todos los aminoácidos siguientes; si es múltiplo de 3, solo añade o quita aminoácidos."
    ]) +
    ejemplo("Pregunta 2. Diferencias entre mutaciones génicas, cromosómicas y genómicas, con un ejemplo de cada una", "Respuesta modelo:", [
      "<b>Génica:</b> cambia la secuencia de bases de un gen (anemia falciforme).",
      "<b>Cromosómica:</b> cambia la estructura de un cromosoma, sin cambiar su número: deleción, duplicación, inversión, translocación (cromosoma Filadelfia).",
      "<b>Genómica:</b> cambia el número de cromosomas: aneuploidías (trisomía 21, síndrome de Down) y poliploidías (trigo 6n)."
    ]) +
    ejemplo("Pregunta 3. Describe las etapas de una PCR y para qué sirve", "Respuesta modelo:", [
      "<b>Para qué:</b> amplificar (copiar muchas veces) un fragmento concreto de ADN.",
      "<b>Componentes:</b> ADN molde, dos cebadores, Taq polimerasa (termoestable), nucleótidos y tampón.",
      "<b>Cada ciclo:</b> (1) <b>desnaturalización</b> a ≈ 95 °C: se separan las hebras; (2) <b>anillamiento</b> a ≈ 55 °C: los cebadores se unen; (3) <b>extensión</b> a 72 °C: la Taq sintetiza las hebras nuevas.",
      "<b>Resultado:</b> el número de copias se duplica en cada ciclo: 2<sup>n</sup>. <b>Usos:</b> diagnóstico (COVID-19), huella genética, paternidad, ADN antiguo."
    ]) +
    ejemplo("Pregunta 4. Explica cómo se obtiene insulina humana en bacterias", "Respuesta modelo:", [
      "<b>Gen:</b> se obtiene el gen de la insulina (como ADNc a partir de ARNm maduro, sin intrones, porque la bacteria no corta intrones).",
      "<b>Recombinante:</b> se corta el plásmido y el gen con la misma <b>enzima de restricción</b> (extremos cohesivos) y se unen con <b>ADN ligasa</b>.",
      "<b>Transformación:</b> se introduce el plásmido en <i>E. coli</i>; con ampicilina (y azul/blanco) se seleccionan las bacterias con el plásmido y el gen.",
      "<b>Producción:</b> se cultivan en grandes cantidades; cada bacteria expresa el gen (el código genético es universal) y se purifica la insulina."
    ]) +
    ejemplo("Pregunta 5. CRISPR-Cas9 y debate ético", "Respuesta modelo:", [
      "<b>Funcionamiento:</b> un <b>ARN guía</b> complementario a la secuencia diana lleva a la <b>nucleasa Cas9</b> hasta ese punto, donde corta las dos hebras; la célula repara y se inactiva el gen (unión de extremos) o se corrige (reparación con plantilla).",
      "<b>Ventajas:</b> barata, rápida y precisa; permite corregir enfermedades hereditarias (Casgevy). <b>Riesgos:</b> efectos fuera de diana y consecuencias a largo plazo desconocidas.",
      "<b>Ética:</b> terapia somática (aceptada) frente a edición germinal (afecta a las generaciones futuras; prohibida en la mayoría de países); riesgo de «bebés a la carta» y de desigualdad en el acceso."
    ]) +
    "<p>Los ejercicios del final incluyen preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio13b = { nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
