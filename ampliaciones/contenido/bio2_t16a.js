/* ============================================================
   Biología II · ampliaciones · Tema 16: Evolución
   (parte A: teoría. Parte B, bio2_t16b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t16.js (bio_hw, bio_deriva).
   El original no trae Hardy-Weinberg, especiación ni origen de la vida: se añaden como secciones nuevas.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Lamarck frente a Darwin con el ejemplo de la jirafa (qué se hereda y qué no) → secciones 1 y 2 + tabla comparativa.
   2. Los cuatro pasos del razonamiento de Darwin (variabilidad, exceso de descendencia, herencia, éxito diferencial) → sección 2 + ordenar.
   3. La población (no el individuo) es la unidad que evoluciona: evolución = cambio de frecuencias alélicas → sección 4.
   4. Fuentes de variabilidad: mutación (alelos nuevos, al azar) y recombinación (combinaciones nuevas) → sección 3.
   5. Homólogos frente a análogos, vestigiales y convergencia → sección 5 + clasificar.
   6. Hardy-Weinberg: enunciado, condiciones y cálculos (portadores de una enfermedad recesiva) → sección 6 + widget bio_hw.
   7. Deriva (cuello de botella, efecto fundador), flujo génico y selección (direccional, estabilizadora, disruptiva) → sección 7 + widget bio_deriva.
   8. Especiación: concepto de especie, barreras reproductivas, alopátrica y simpátrica; gradualismo frente a equilibrio puntuado → sección 8.
   9. Interpretar datos: recapturas de polillas (melanismo industrial) y cálculo de frecuencias → sección 10 (ejemplo PAU resuelto).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t16/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Fijismo y Lamarck
  secciones[0] = env(
    "<h5>Tres ideas sobre el cambio de las especies</h5>" +
    "<p>Antes del siglo XIX casi todo el mundo pensaba que las especies eran <b>inmutables</b>: tal como aparecieron, así seguían. Es el <b>fijismo</b>. Algunos fijistas, como Cuvier, admitían que había habido extinciones (catastrofismo), pero creían que después se «repoblaba» el mundo con especies nuevas, igual de fijas. Frente a esa idea apareció el <b>evolucionismo</b>: las especies actuales descienden de otras anteriores y cambian con el tiempo.</p>" +
    tabla(["Fijismo", "Evolucionismo"], [
      ["Las especies no cambian.", "Las especies cambian y unas dan origen a otras."],
      ["Cada especie tiene su propio origen.", "Todas las especies tienen antepasados comunes."],
      ["Los fósiles son restos de especies extinguidas (catastrofismo, Cuvier).", "Los fósiles muestran la historia de esa transformación."]
    ], "q3t") +
    "<h5>Lamarck (1809)</h5>" +
    "<p>Jean-Baptiste Lamarck, en su <i>Filosofía zoológica</i> (1809), fue el primero en proponer una teoría evolutiva completa. Se apoyaba en dos ideas:</p>" +
    "<ul><li><b>Uso y desuso:</b> los órganos que se usan mucho se desarrollan; los que no se usan se atrofian.</li>" +
    "<li><b>Herencia de los caracteres adquiridos:</b> los cambios que un individuo adquiere durante su vida pasarían a sus hijos.</li></ul>" +
    "<p>Su ejemplo famoso es el de la jirafa: al estirar el cuello para llegar a las hojas altas, cada generación habría heredado un cuello algo más largo que el de la anterior.</p>" +
    "<h5>Por qué la explicación de Lamarck es incorrecta</h5>" +
    "<p>Lo que se hereda es el <b>ADN de los gametos</b> (Tema 11), y estirar el cuello, hacer pesas o broncearse no modifica el ADN de las células reproductoras. Un culturista no tiene hijos con más músculo por haber entrenado. A finales del siglo XIX, <b>Weismann</b> cortó la cola a ratones durante más de veinte generaciones y las crías siguieron naciendo con cola de tamaño normal. Además, aunque el uso y el desuso son reales, solo cambian al individuo, no a sus descendientes.</p>" +
    ojo("Lamarck acertó en lo importante (las especies <b>sí</b> cambian y el ambiente influye), y se equivocó en el mecanismo. En el examen, no escribas «Lamarck estaba equivocado» sin más: explica qué defendía y por qué su mecanismo no funciona. Y no confundas «caracteres adquiridos» (un músculo, una cicatriz) con «caracteres heredados» (los que dependen de los genes).") +
    w("emparejar", "cientificos"));

  // ---------------------------------------------------------------- 2. Darwin
  secciones[1] = env(
    "<h5>El viaje del Beagle y la idea de Darwin</h5>" +
    "<p>Charles Darwin dio la vuelta al mundo en el <i>Beagle</i> (1831-1836). Le impresionaron los fósiles de Sudamérica y, sobre todo, la fauna de las islas Galápagos, donde cada isla tenía pinzones y tortugas algo distintos, pero parecidos a los del continente. Años después leyó a <b>Malthus</b>: las poblaciones tienden a crecer más deprisa que los recursos. En 1858, <b>Alfred Russel Wallace</b>, que había llegado de forma independiente a la misma idea, le escribió desde Asia. Ese año presentaron juntos la teoría en la Sociedad Linneana de Londres, y Darwin publicó en <b>1859</b> <i>El origen de las especies</i>.</p>" +
    "<h5>La selección natural, paso a paso</h5>" +
    "<ol><li><b>Variabilidad:</b> los individuos de una población no son idénticos.</li>" +
    "<li><b>Superproducción de descendientes:</b> nacen muchos más individuos de los que pueden sobrevivir con los recursos disponibles (lucha por la existencia).</li>" +
    "<li><b>Herencia:</b> parte de esa variación se hereda.</li>" +
    "<li><b>Éxito reproductivo diferencial:</b> los individuos con variantes más ventajosas en su ambiente sobreviven y se reproducen más, y dejan más descendientes.</li>" +
    "<li><b>Resultado:</b> con las generaciones, esas variantes son cada vez más frecuentes en la población.</li></ol>" +
    w("orden", "ordenseleccion") +
    tabla(["", "Lamarck", "Darwin y Wallace"], [
      ["<b>Origen de la variación</b>", "El individuo cambia por usar u olvidar un órgano.", "Ya existe antes, en cada individuo, de forma natural."],
      ["<b>Qué cambia</b>", "Cada individuo se transforma a lo largo de su vida.", "La proporción de variantes en la <b>población</b>."],
      ["<b>Papel del ambiente</b>", "Provoca el cambio.", "<b>Selecciona</b> entre variantes que ya existían."],
      ["<b>Cuello de la jirafa</b>", "Se alargó por estirarlo y se heredó.", "Las jirafas con cuello más largo dejaron más descendientes."]
    ], "q3t") +
    "<h5>Un ejemplo observable: la polilla del abedul</h5>" +
    "<p>En Inglaterra, la polilla <i>Biston betularia</i> era casi siempre clara, camuflada sobre los líquenes de los troncos. Con la Revolución Industrial el hollín ennegreció los troncos y las polillas <b>oscuras</b>, antes raras, pasaron a ser mayoría, porque las aves comían más las claras (más visibles). En los años 50, <b>Kettlewell</b> liberó polillas marcadas y comprobó que se recapturaban más oscuras en bosques contaminados y más claras en los limpios. Cuando se limpió el aire, las claras volvieron a aumentar. Nadie «creó» las polillas oscuras por necesidad: ya existían y el ambiente cambió quién tenía ventaja. Otro caso actual es la <b>resistencia de bacterias a antibióticos</b>: el antibiótico no provoca la mutación, solo elimina a las bacterias sensibles y deja a las que ya eran resistentes.</p>" +
    ojo("<b>No evoluciona un individuo, evoluciona una población.</b> Y la selección natural no «quiere» nada: no hay finalidad ni progreso hacia lo perfecto, solo individuos mejor adaptados <b>a su ambiente en ese momento</b>. «Supervivencia del más apto» significa el que deja más descendencia fértil, no el más fuerte.") );

  // ---------------------------------------------------------------- 3. Variabilidad
  secciones[2] = env(
    "<h5>De dónde sale la variación</h5>" +
    "<p>La selección natural elige entre variantes, así que necesita que existan. Hay dos fuentes principales, y conviene distinguirlas bien:</p>" +
    tabla(["", "Mutación", "Recombinación (meiosis)"], [
      ["<b>Qué hace</b>", "Cambia la secuencia del ADN: crea <b>alelos nuevos</b> (Tema 13).", "Mezcla alelos que <b>ya existen</b> en combinaciones nuevas (Tema 7)."],
      ["<b>Cómo</b>", "Errores de copia, radiación, mutágenos.", "Entrecruzamiento (crossing-over) y segregación independiente de los cromosomas."],
      ["<b>Velocidad</b>", "Muy lenta y poco frecuente.", "Muy rápida: cada hijo es una combinación distinta."],
      ["<b>Efecto</b>", "Casi siempre neutra o perjudicial, rara vez ventajosa.", "No cambia las frecuencias de los alelos por sí sola."]
    ], "q3t") +
    "<p>Un dato para hacerte una idea: una persona tiene 23 pares de cromosomas, así que por <b>segregación independiente</b> puede producir 2<sup>23</sup> = 8 388 608 gametos distintos <b>sin contar el crossing-over</b>. Por eso los hermanos, salvo gemelos idénticos, son todos distintos. La reproducción sexual multiplica la variabilidad, y por eso la mayoría de especies la practican.</p>" +
    ojo("Las mutaciones son <b>al azar</b>: no aparecen porque el organismo las necesite. El ambiente no las provoca con un fin; solo decide, después, si la variante resultante es ventajosa, neutra o perjudicial. Esa es la gran diferencia con Lamarck."));

  // ---------------------------------------------------------------- 4. Teoría sintética
  secciones[3] = env(
    "<h5>Darwin más genética</h5>" +
    "<p>Darwin no sabía cómo se heredaban los caracteres. Las leyes de Mendel (1866) pasaron desapercibidas hasta 1900. En las décadas de 1930 y 1940, científicos como <b>Fisher, Haldane y Wright</b> (genética de poblaciones), <b>Dobzhansky</b> (<i>Genética y origen de las especies</i>, 1937), <b>Mayr</b> (1942) y <b>Simpson</b> (paleontología, 1944) unieron todo en la <b>teoría sintética</b> o <b>neodarwinismo</b>. Su idea central:</p>" +
    "<p><b>La evolución es el cambio de las frecuencias alélicas de una población a lo largo de las generaciones.</b></p>" +
    "<h5>Los mecanismos que cambian las frecuencias</h5>" +
    tabla(["Mecanismo", "Qué es", "Efecto"], [
      ["<b>Mutación</b>", "Cambio en el ADN.", "Aporta alelos nuevos (la materia prima)."],
      ["<b>Recombinación</b>", "Nuevas combinaciones de alelos.", "Aporta variabilidad, sin cambiar la frecuencia de cada alelo."],
      ["<b>Selección natural</b>", "Éxito reproductivo diferencial.", "Aumenta los alelos ventajosos: <b>única fuerza que produce adaptación</b>."],
      ["<b>Deriva genética</b>", "Cambios de frecuencias por azar, notables en poblaciones pequeñas.", "Pierde o fija alelos sin relación con su utilidad."],
      ["<b>Flujo génico</b>", "Migración: entran o salen individuos y sus alelos.", "Hace parecidas a las poblaciones y añade o quita variación."]
    ], "q3t") +
    w("clasificar", "mecanismos") +
    "<p>La deriva tiene dos casos clásicos. En el <b>cuello de botella</b>, una catástrofe deja muy pocos supervivientes y la población nueva conserva solo una parte, al azar, de la variación (por ejemplo, el elefante marino del norte, casi extinguido por la caza en el siglo XIX, tiene hoy poca variabilidad genética). En el <b>efecto fundador</b>, unos pocos individuos fundan una población nueva en otro sitio y sus alelos, que no tienen por qué ser representativos, se vuelven muy frecuentes (por eso algunas enfermedades raras son comunes en poblaciones aisladas).</p>" +
    ojo("Tres confusiones típicas: (1) la <b>mutación</b> da alelos nuevos, la <b>recombinación</b> no; (2) la <b>deriva</b> actúa al azar y la <b>selección</b> no: solo la selección explica las adaptaciones; (3) el <b>flujo génico</b> necesita que los migrantes se reproduzcan en la población nueva, no basta con que lleguen."));

  // ---------------------------------------------------------------- 5. Pruebas
  secciones[4] = env(
    "<h5>Cinco familias de pruebas que coinciden entre sí</h5>" +
    tabla(["Tipo de prueba", "Qué muestra", "Ejemplo"], [
      ["<b>Paleontológicas</b>", "Sucesión de formas en el tiempo y formas intermedias.", "<i>Archaeopteryx</i> (reptil con plumas, hace unos 150 millones de años); <i>Tiktaalik</i> (pez con rasgos de anfibio); la serie fósil del caballo y de los cetáceos."],
      ["<b>Biogeográficas</b>", "Parecidos y diferencias según el aislamiento de las regiones.", "Los pinzones y las tortugas de las Galápagos; los marsupiales de Australia."],
      ["<b>Anatomía comparada</b>", "Estructuras homólogas, análogas y vestigiales.", "Miembro anterior de humano, murciélago y ballena; ala de ave y de insecto; apéndice y cóccix humanos."],
      ["<b>Embriológicas</b>", "Embriones de vertebrados parecidos al principio.", "Hendiduras branquiales y cola en el embrión humano."],
      ["<b>Moleculares</b>", "Parecido de ADN y proteínas proporcional al parentesco.", "Código genético casi universal; el citocromo c humano y el del chimpancé son idénticos, y el del humano y el de la levadura difieren bastante más."]
    ], "q3t") +
    "<h5>Homología, analogía y vestigiales</h5>" +
    "<ul><li><b>Órganos homólogos:</b> mismo origen evolutivo y misma estructura interna, aunque la función sea distinta (brazo humano, ala de murciélago, aleta de ballena). Prueban <b>antepasado común</b> y dan lugar a <b>evolución divergente</b>.</li>" +
    "<li><b>Órganos análogos:</b> misma función pero origen y estructura distintos (ala de ave y ala de insecto; aleta de tiburón y de delfín). Resultan de <b>evolución convergente</b>: ambientes parecidos, soluciones parecidas.</li>" +
    "<li><b>Órganos vestigiales:</b> estructuras reducidas y sin función aparente que sí eran útiles en antepasados (huesos de la cintura pélvica de las ballenas, muelas del juicio, cóccix, apéndice).</li></ul>" +
    w("clasificar", "homologia") +
    ojo("Si dos estructuras se parecen en la <b>función</b> pero no en el <b>origen</b>, son análogas y no prueban parentesco. Si se parecen en el <b>origen</b> aunque la función sea distinta, son homólogas y sí lo prueban. Y todas las pruebas apuntan a lo mismo: la pregunta de examen habitual es «cita y explica tres de ellas»."));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Genética de poblaciones y ley de Hardy-Weinberg", html: env(
    "<h5>Conceptos básicos</h5>" +
    "<ul><li><b>Población:</b> conjunto de individuos de la misma especie que viven en una zona y se reproducen entre sí.</li>" +
    "<li><b>Acervo genético (pool génico):</b> conjunto de todos los alelos de todos los individuos de la población.</li>" +
    "<li><b>Frecuencia alélica:</b> proporción de un alelo entre todos los alelos de ese gen.</li>" +
    "<li><b>Frecuencia genotípica:</b> proporción de individuos con un genotipo.</li></ul>" +
    "<p><b>Cómo se calcula la frecuencia de un alelo.</b> Se cuentan alelos, no personas (cada individuo diploide tiene 2 alelos por gen). Ejemplo: en 500 individuos hay 320 AA, 160 Aa y 20 aa. Hay 1000 alelos. Alelos A: 2 · 320 + 160 = 800, por tanto p = 800/1000 = <b>0,8</b>. Alelos a: 2 · 20 + 160 = 200, por tanto q = <b>0,2</b>. Con dos alelos, p + q = 1.</p>" +
    "<h5>La ley de Hardy-Weinberg (1908)</h5>" +
    "<p>Hardy y Weinberg demostraron, por separado, que en una población que cumple ciertas condiciones <b>las frecuencias alélicas no cambian de una generación a otra</b>, y que las frecuencias genotípicas se calculan a partir de ellas tras una sola generación de apareamiento al azar:</p>" +
    "<p style='text-align:center;font-size:1.1em'><b>p² + 2pq + q² = 1</b> &nbsp;(AA, Aa, aa)</p>" +
    "<p>Condiciones del equilibrio: población <b>muy grande</b> (sin deriva), apareamiento <b>al azar</b>, <b>sin selección</b>, <b>sin mutaciones</b> y <b>sin migración</b> (flujo génico). Casi nunca se cumplen del todo; su utilidad es otra: es el <b>modelo de referencia</b>. Si una población se aparta de él, es que está evolucionando, y se puede investigar cuál de las cinco condiciones falla.</p>" +
    w("bio_hw") +
    "<h5>Uso típico: calcular portadores</h5>" +
    "<p>Como un alelo recesivo solo se ve en los homocigotos aa, a partir de la frecuencia de la enfermedad se calcula q² y de ahí todo lo demás. Ejemplo con la fibrosis quística (la incidencia depende de la población; tomamos 1 de cada 2500 como dato): q² = 1/2500 = 0,0004; <b>q = 0,02</b>; p = 0,98. Los portadores son 2pq = 2 · 0,98 · 0,02 = <b>0,0392 (casi el 4 %, aproximadamente 1 de cada 25 o 26 personas)</b>. Es decir, hay unos 98 portadores sanos por cada enfermo (0,0392 / 0,0004 = 98).</p>" +
    ojo("(1) Del dato «1 de cada 2500 personas están enfermas» sale <b>q²</b>, no q: hay que hacer la raíz cuadrada. (2) <b>No</b> pueden restarse las frecuencias de los genotipos de los fenotipos dominantes: AA y Aa se ven igual, por eso 2pq no se mide directamente. (3) Si te dan los genotipos contados de una población, primero calcula p y q <b>contando alelos</b> y después compara los genotipos observados con los esperados p², 2pq y q²: si no coinciden, la población no está en equilibrio.")) });

  nuevas.push({ h: "7. La evolución en acción: deriva, flujo génico y selección", html: env(
    "<h5>Cómo cambian de verdad las frecuencias</h5>" +
    "<p>Cada condición de Hardy-Weinberg que se rompe corresponde a un mecanismo de la sección 4. El simulador te deja ver dos de ellos a la vez: cuando la población es pequeña, el <b>azar</b> (deriva) hace que cada población evolucione de forma distinta; cuando hay <b>selección</b> en contra de un genotipo, el alelo disminuye de forma previsible.</p>" +
    w("bio_deriva") +
    "<p><b>Lo que debes ver:</b> con N pequeño y s = 0, las líneas se separan y algunas llegan a 0 o a 1 (un alelo desaparece y el otro queda «fijado»), sin que ninguno sea mejor. Con N grande y s = 0, las líneas apenas se mueven. Con s &gt; 0, la línea discontinua baja siempre, y cuanto más grande es la población, más se parecen las líneas a ella.</p>" +
    "<h5>Cálculos con selección y con migración</h5>" +
    "<ul><li><b>Selección contra el homocigoto recesivo letal</b> (s = 1): q' = q / (1 + q). Con q = 0,2: q' = 0,2 / 1,2 = 0,167. Tras n generaciones, q<sub>n</sub> = q<sub>0</sub> / (1 + n · q<sub>0</sub>). Por eso un alelo recesivo letal <b>desaparece muy despacio</b>: los portadores Aa lo «esconden».</li>" +
    "<li><b>Flujo génico:</b> si una población con q = 0,2 recibe una fracción m = 0,1 de individuos de otra con q = 0,6, entonces q' = (1 − m) · 0,2 + m · 0,6 = 0,24.</li>" +
    "<li><b>Probabilidad de fijación por deriva:</b> un alelo nuevo (neutro) presente en una sola copia entre los 2N alelos de la población tiene probabilidad 1/(2N) de acabar fijado. Con N = 50: 1/100 = 1 %.</li></ul>" +
    "<h5>Tres tipos de selección natural</h5>" +
    tabla(["Tipo", "Favorece", "Efecto en la distribución", "Ejemplo"], [
      ["<b>Direccional</b>", "Un extremo.", "El valor medio se desplaza.", "Bacterias resistentes a un antibiótico; polillas oscuras."],
      ["<b>Estabilizadora</b>", "Los valores intermedios.", "Se reducen los extremos; el valor medio se mantiene.", "Peso al nacer en humanos: los bebés muy pequeños o muy grandes tienen más riesgo."],
      ["<b>Disruptiva</b>", "Los dos extremos.", "Se forman dos grupos; puede acabar separando especies.", "Pinzones con picos muy grandes o muy pequeños según las semillas disponibles."]
    ], "q3t") +
    ojo("«Selección natural» no es lo mismo que «evolución». La selección es solo uno de los mecanismos (el único que explica la adaptación). La deriva puede cambiar frecuencias sin que haya ventaja alguna. Y la selección actúa sobre el <b>fenotipo</b>, pero lo que cambia con las generaciones son las frecuencias de los <b>alelos</b>.")) });

  nuevas.push({ h: "8. Especiación y ritmo de la evolución", html: env(
    "<h5>¿Qué es una especie?</h5>" +
    "<p>Según el <b>concepto biológico de especie</b> (Mayr), una especie es un conjunto de poblaciones cuyos individuos pueden cruzarse entre sí en la naturaleza y dejar <b>descendencia fértil</b>, y que están aisladas reproductivamente de las demás. Por eso la mula (cruce de yegua y burro) es un híbrido estéril y no una especie. El concepto tiene límites (no sirve para organismos asexuales ni fósiles), pero es el que se pregunta en el examen.</p>" +
    "<h5>Barreras reproductivas</h5>" +
    tabla(["Prezigóticas (impiden la formación del cigoto)", "Postzigóticas (actúan cuando ya hay cigoto)"], [
      ["Aislamiento de hábitat, de comportamiento (cortejos distintos), de época de reproducción o mecánico.", "Inviabilidad del híbrido (muere pronto)."],
      ["Incompatibilidad de los gametos.", "Esterilidad del híbrido (la mula)."]
    ], "q3t") +
    "<h5>Cómo aparece una especie nueva</h5>" +
    "<ul><li><b>Alopátrica:</b> una barrera geográfica (un río, una cordillera, el mar) separa una población en dos. Sin flujo génico, cada una acumula mutaciones, deriva y selección distintas, hasta que, aunque se vuelvan a encontrar, ya no pueden cruzarse. Es la más frecuente. Ejemplo: los pinzones de las Galápagos, que se originaron en un antepasado llegado del continente (<b>radiación adaptativa</b>: de un antepasado salen muchas especies que ocupan nichos diferentes).</li>" +
    "<li><b>Simpátrica:</b> aparece en la misma zona, sin barrera geográfica. La vía clásica en plantas es la <b>poliploidía</b>: un error en la meiosis duplica el número de cromosomas y los descendientes ya no pueden cruzarse con la especie original (así surgió el trigo panadero).</li></ul>" +
    "<h5>Gradualismo y equilibrio puntuado</h5>" +
    tabla(["Gradualismo (Darwin)", "Equilibrio puntuado (Eldredge y Gould, 1972)"], [
      ["Los cambios se acumulan despacio y de forma continua.", "Largos periodos de estabilidad (estasis) interrumpidos por periodos cortos, en escala geológica, de cambios rápidos."],
      ["Predice muchas formas intermedias en el registro fósil.", "Explica por qué faltan formas intermedias: la especiación rápida deja pocos fósiles."]
    ], "q3t") +
    ojo("«Rápido» en el equilibrio puntuado significa miles de años, que en geología es un instante; no es un cambio de un día para otro. Y los dos modelos no se excluyen: ambos aceptan la selección natural, solo difieren en el ritmo.")) });

  nuevas.push({ h: "9. Origen de la vida y evolución humana (breve)", html: env(
    "<p>El original no trae estos dos asuntos, pero suelen aparecer en el examen en el contexto de la evolución, así que van en resumen.</p>" +
    "<h5>Origen de la vida</h5>" +
    "<ul><li><b>Oparin</b> (1924) y <b>Haldane</b> (1929) propusieron que la vida surgió en la Tierra primitiva por evolución química: en una atmósfera sin oxígeno libre, la energía de las descargas y de la radiación formó moléculas orgánicas sencillas que se acumularon en el agua («caldo primitivo»).</li>" +
    "<li><b>Miller y Urey</b> (1953) lo comprobaron en el laboratorio: con vapor de agua, metano, amoníaco e hidrógeno y descargas eléctricas obtuvieron aminoácidos.</li>" +
    "<li>Después se formarían polímeros (el <b>mundo de ARN</b>: el ARN almacena información y también cataliza) y protocélulas con membrana, hasta las primeras células, procariotas.</li>" +
    "<li><b>Teoría endosimbiótica</b> (Margulis, 1967): las mitocondrias y los cloroplastos descienden de bacterias que fueron incorporadas por una célula mayor y acabaron viviendo dentro (Tema 6: tienen ADN circular propio y ribosomas parecidos a los de bacterias).</li></ul>" +
    "<h5>Evolución humana</h5>" +
    "<ul><li>Los humanos y los chimpancés compartimos un <b>antepasado común</b> que vivió hace unos 6-7 millones de años; no descendemos de los chimpancés actuales.</li>" +
    "<li><b>Australopithecus afarensis</b> («Lucy», Etiopía, hace unos 3,2 millones de años): bípedo, cerebro pequeño. Después el género <b>Homo</b> (<i>H. habilis</i>, <i>H. erectus</i>…), con cerebro cada vez mayor y uso de herramientas y del fuego.</li>" +
    "<li>En <b>Atapuerca</b> (Burgos) se hallaron fósiles de <i>Homo antecessor</i> (unos 850 000 años) y de la Sima de los Huesos (unos 430 000 años). Nuestra especie, <i>Homo sapiens</i>, tiene unos 300 000 años y se originó en África.</li></ul>" +
    ojo("La evolución humana no es una línea recta de «mono» a «hombre»: es un arbusto ramificado en el que convivieron varias especies de homínidos. Y «hombre desciende del mono» es una simplificación errónea: compartimos antepasado, no descendemos de ninguna especie actual.")) });

  nuevas.push({ h: "10. Ejemplo PAU resuelto: interpretar datos de evolución", html: env(
    ejemplo("Polillas claras y oscuras (experimento de marcado y recaptura)", "Se liberaron polillas claras y oscuras marcadas en dos bosques y, tras unos días, se recapturaron. <b>Bosque contaminado (troncos oscuros):</b> claras, 64 liberadas y 16 recapturadas; oscuras, 154 liberadas y 82 recapturadas. <b>Bosque limpio (troncos claros):</b> claras, 393 liberadas y 54 recapturadas; oscuras, 406 liberadas y 19 recapturadas. (a) Calcula el porcentaje de recaptura en cada caso. (b) Interpreta los resultados con la teoría de la selección natural. (c) ¿Qué ocurriría con la frecuencia de polillas oscuras si se limpiara el aire? (d) ¿Se trata de selección direccional, estabilizadora o disruptiva?", [
      "<b>(a)</b> Contaminado: claras 16/64 = <b>25,0 %</b>; oscuras 82/154 = <b>53,2 %</b>. Limpio: claras 54/393 = <b>13,7 %</b>; oscuras 19/406 = <b>4,7 %</b>.",
      "<b>(b)</b> La recaptura mide la supervivencia: en el bosque contaminado sobreviven más las oscuras (camufladas en el tronco oscuro; las aves ven mejor a las claras) y en el limpio sobreviven más las claras. El mismo color es ventaja en un ambiente y desventaja en el otro: <b>no hay un fenotipo «mejor» en general</b>, sino mejor adaptado a su ambiente.",
      "Además la variación (polillas claras y oscuras) ya existía antes del hollín: el ambiente no «hizo» las oscuras, solo cambió cuáles dejaban más descendencia.",
      "<b>(c)</b> Si el aire se limpia, los troncos vuelven a ser claros, las oscuras se ven más y se comen más, las claras tendrían más descendencia y la frecuencia del alelo oscuro <b>bajaría</b> con las generaciones.",
      "<b>(d)</b> Es <b>selección direccional</b> (favorece un extremo y desplaza la media), y cambia de sentido cuando cambia el ambiente.",
      "<b>Detalle de examen:</b> la recaptura es una medida indirecta de supervivencia; para fiarse hay que liberar el mismo número de ambos tipos o, como aquí, comparar porcentajes (no números absolutos)."
    ]) +
    ejemplo("Hardy-Weinberg con una enfermedad recesiva", "En una población en equilibrio de Hardy-Weinberg, 1 de cada 10 000 personas nace con una enfermedad autosómica recesiva. (a) Calcula q y p. (b) Calcula la frecuencia de portadores. (c) En una ciudad de 500 000 habitantes, ¿cuántos portadores se esperan?", [
      "<b>(a)</b> q² = 1/10 000 = 0,0001, por tanto <b>q = 0,01</b> y <b>p = 1 − 0,01 = 0,99</b>.",
      "<b>(b)</b> Portadores = 2pq = 2 · 0,99 · 0,01 = <b>0,0198</b> (casi el 2 %, aproximadamente 1 de cada 50).",
      "<b>(c)</b> 0,0198 · 500 000 = <b>9900 portadores</b>. Y esperaríamos solo 0,0001 · 500 000 = 50 enfermos: hay unos 200 portadores por cada enfermo.",
      "<b>Conclusión que puntúa:</b> casi todos los alelos recesivos raros están en <b>heterocigotos</b> sanos, y por eso la selección apenas puede eliminarlos."
    ]) +
    ejemplo("Frecuencias a partir de los genotipos contados", "En una población de 100 individuos hay 40 AA, 20 Aa y 40 aa. (a) Calcula p y q. (b) ¿Cuántos Aa esperaríamos si estuviera en equilibrio de Hardy-Weinberg? (c) ¿Está en equilibrio?", [
      "<b>(a)</b> Alelos: 200. A = 2 · 40 + 20 = 100, por tanto <b>p = 0,5</b>. a = 2 · 40 + 20 = 100, por tanto <b>q = 0,5</b>.",
      "<b>(b)</b> Esperados: AA = 0,25 · 100 = 25, Aa = 2 · 0,5 · 0,5 · 100 = <b>50</b>, aa = 25.",
      "<b>(c)</b> Observados 40 / 20 / 40, frente a los esperados 25 / 50 / 25: <b>no está en equilibrio</b>. Faltan heterocigotos. Posibles causas: apareamiento no al azar (entre parecidos) o selección contra Aa.",
      "<b>Detalle de examen:</b> una población puede tener p = q = 0,5 y aun así no estar en equilibrio; el equilibrio se juzga mirando los genotipos, no solo los alelos."
    ])) });

  nuevas.push({ h: "11. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>En Biología el orden de una buena respuesta es: <b>definir → explicar con el mecanismo → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema, con una respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Explica la evolución del cuello de la jirafa según Lamarck y según Darwin", "Respuesta modelo:", [
      "<b>Lamarck:</b> uso y desuso más herencia de caracteres adquiridos: al estirar el cuello, cada generación lo alarga un poco y se lo transmite a los hijos.",
      "<b>Darwin:</b> había jirafas con cuello algo más largo y otras más corto (variabilidad); las de cuello largo llegaban a más alimento, sobrevivían y se reproducían más; el rasgo es heredable; con las generaciones se hizo más frecuente.",
      "<b>Por qué falla Lamarck:</b> lo que se hereda es el ADN de los gametos, no los cambios que adquiere el cuerpo."
    ]) +
    ejemplo("Pregunta 2. ¿Qué son órganos homólogos y análogos? Un ejemplo de cada uno", "Respuesta modelo:", [
      "<b>Homólogos:</b> mismo origen evolutivo y estructura, función distinta (brazo humano y ala de murciélago); indican antepasado común (evolución divergente).",
      "<b>Análogos:</b> misma función con origen y estructura distintos (ala de ave y de insecto); resultan de evolución convergente.",
      "Conclusión: solo los homólogos prueban parentesco."
    ]) +
    ejemplo("Pregunta 3. Enuncia la ley de Hardy-Weinberg y di para qué sirve", "Respuesta modelo:", [
      "<b>Enunciado:</b> en una población grande, con apareamiento al azar, sin selección, mutación ni migración, las frecuencias alélicas se mantienen constantes y las genotípicas son p², 2pq y q² (p² + 2pq + q² = 1).",
      "<b>Utilidad:</b> es el modelo de referencia; permite calcular frecuencias de portadores y detectar si una población está evolucionando.",
      "<b>Ejemplo:</b> si la enfermedad recesiva afecta a 1 de cada 10 000, q = 0,01 y los portadores son 2pq ≈ 2 %."
    ]) +
    ejemplo("Pregunta 4. Explica cómo se forma una especie nueva por especiación alopátrica", "Respuesta modelo:", [
      "Una barrera geográfica separa una población en dos y corta el flujo génico.",
      "Cada población acumula mutaciones distintas y es sometida a selección diferente (y a deriva).",
      "Con el tiempo aparecen barreras reproductivas: aunque se encuentren, no se cruzan o la descendencia es estéril, y ya son especies distintas.",
      "Ejemplo: pinzones de las Galápagos (radiación adaptativa)."
    ]) +
    "<p>Los ejercicios del final de este tema incluyen preguntas abiertas con rúbrica, para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio16a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
