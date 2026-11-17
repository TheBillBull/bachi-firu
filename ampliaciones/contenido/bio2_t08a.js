/* ============================================================
   Biología II · ampliaciones · Tema 8: Catabolismo: la respiración celular
   (parte A: teoría. Parte B, bio2_t08b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t8.js (bio_ruta, bio_atp, bio_cadena).
   Convención declarada: balance principal 30/32 ATP (2,5 por NADH y 1,5 por FADH₂); se explica también 36/38 (3 y 2).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Qué es el ATP y cómo se «gasta» (ATP ⇌ ADP + Pi) y para qué sirven NAD⁺ y FAD → sección 1 + emparejar.
   2. Glucólisis: dónde ocurre, fases, balance (2 ATP netos y 2 NADH), sin oxígeno → sección 2 + orden.
   3. Descarboxilación oxidativa y ciclo de Krebs: qué entra, qué sale, cuántos CO₂ → sección 3 + widget bio_ruta.
   4. Cadena respiratoria: complejos, O₂ como aceptor final, bombeo de H⁺ → sección 4 + widget bio_cadena.
   5. Quimiosmosis (Mitchell): gradiente de H⁺ y ATP sintasa; qué hacen los desacoplantes → sección 4 + bio_cadena.
   6. Balance energético: 30/32 frente a 36/38 y por qué → sección nueva 6 + widget bio_atp.
   7. Fermentación láctica y alcohólica: para qué sirven (regenerar NAD⁺), dónde, rendimiento → sección 5 + clasificar.
   8. Respiración aerobia frente a fermentación (tabla de comparación) → secciones 5 y 6.
   9. β-oxidación: acetil-CoA, vueltas, balance del palmitato → sección nueva 7.
   10. Interpretar experimentos (respirómetro, inhibidores, levaduras con CO₂) → sección 8 (ejemplos PAU resueltos).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t8/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Metabolismo, ATP y coenzimas
  secciones[0] = env(
    "<h5>Dos palabras que debes saber definir</h5>" +
    tabla(["", "Catabolismo", "Anabolismo"], [
      ["<b>Qué hace</b>", "rompe moléculas complejas en otras simples", "construye moléculas complejas a partir de simples"],
      ["<b>Energía</b>", "la libera (reacciones exergónicas)", "la consume (reacciones endergónicas)"],
      ["<b>Tipo de reacciones</b>", "oxidaciones: se pierden electrones e hidrógenos", "reducciones: se ganan electrones e hidrógenos"],
      ["<b>Ejemplos</b>", "respiración celular, fermentación, digestión de la glucosa", "fotosíntesis, síntesis de proteínas, síntesis de glucógeno"]
    ], "q3t") +
    "<p>Las dos rutas no son independientes: lo que una libera, la otra lo aprovecha. El «puente» entre ambas es el <b>ATP</b>.</p>" +
    "<h5>El ATP: la moneda de energía</h5>" +
    "<p>El <b>ATP</b> (adenosín trifosfato) es un nucleótido formado por <b>adenina</b>, <b>ribosa</b> y <b>tres grupos fosfato</b> (Tema 5). Los enlaces entre fosfatos son de tipo <b>fosfoanhídrido</b>: hay cargas negativas muy juntas que se repelen, y por eso al romperse se libera energía. Una reacción vale para todo el tema:</p>" +
    "<p style='text-align:center'><b>ATP + H<sub>2</sub>O ⇌ ADP + P<sub>i</sub> + energía</b> (≈ 30,5 kJ/mol, unos 7,3 kcal/mol en condiciones estándar)</p>" +
    "<p>Cuando la célula necesita energía (contraer un músculo, bombear iones, sintetizar una proteína), hidroliza ATP; cuando el catabolismo libera energía, la usa para volver a unir ADP y fosfato. Es un ciclo continuo: el cuerpo tiene a la vez solo unos <b>50–100 g de ATP</b>, pero regenera cada día una cantidad del orden de su propio peso. El ATP no se almacena: se gasta y se rehace sin parar.</p>" +
    "<p>Hay dos maneras de fabricar ATP, y conviene distinguirlas desde ya:</p>" +
    tabla(["", "Fosforilación a nivel de sustrato", "Fosforilación oxidativa"], [
      ["<b>Cómo</b>", "una enzima pasa un fosfato de un sustrato al ADP", "la energía de los electrones crea un gradiente de H⁺ que mueve la ATP sintasa"],
      ["<b>Dónde</b>", "glucólisis (citoplasma) y ciclo de Krebs (matriz)", "membrana mitocondrial interna"],
      ["<b>Necesita O<sub>2</sub></b>", "no directamente", "sí, como aceptor final de electrones"],
      ["<b>Cuánto ATP</b>", "poco (4 por glucosa)", "la mayor parte (≈ 26–34 por glucosa)"]
    ], "q3t") +
    "<h5>Coenzimas: los «taxis» de electrones</h5>" +
    "<p>En el catabolismo, la glucosa se <b>oxida</b>: pierde electrones e hidrógenos (deshidrogenaciones). Alguien tiene que recogerlos: los coenzimas <b>NAD<sup>+</sup></b> (nicotinamida adenín dinucleótido, derivado de la vitamina B<sub>3</sub>) y <b>FAD</b> (flavín adenín dinucleótido, de la vitamina B<sub>2</sub>). Son <b>transportadores de electrones e hidrógenos</b>: se cargan en las etapas iniciales y se descargan en la cadena respiratoria.</p>" +
    tabla(["Forma oxidada", "Recibe", "Forma reducida", "Entrega"], [
      ["NAD<sup>+</sup>", "2 e⁻ y 1 H⁺ (además del H⁺ del medio)", "NADH + H<sup>+</sup>", "en el complejo I de la cadena"],
      ["FAD", "2 e⁻ y 2 H⁺", "FADH<sub>2</sub>", "en el complejo II de la cadena"]
    ], "q3t") +
    ojo("«Oxidado» y «reducido» se refieren al coenzima, no a la glucosa: cuando la glucosa se <b>oxida</b>, el NAD<sup>+</sup> se <b>reduce</b> a NADH. Truco: el NADH es «el cargado»; el NAD<sup>+</sup>, «el vacío», y la glucólisis necesita tener siempre NAD<sup>+</sup> vacíos disponibles (por eso existe la fermentación).") +
    w("emparejar", "coenzimas") +
    "<h5>La reacción global</h5>" +
    "<p style='text-align:center'><b>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> → 6 CO<sub>2</sub> + 6 H<sub>2</sub>O + energía</b> (≈ 2870 kJ/mol; parte se guarda como ATP y el resto sale como calor)</p>" +
    "<p>Aunque se escriba en una línea, ocurre en <b>muchos pasos pequeños</b>, cada uno con su enzima. Así la energía se libera poco a poco y se puede aprovechar, en lugar de salir de golpe como en una llama. Cada molécula de glucosa pasa por <b>cuatro etapas</b>: glucólisis, descarboxilación oxidativa, ciclo de Krebs y cadena respiratoria.</p>");

  // ---------------------------------------------------------------- 2. Glucólisis
  secciones[1] = env(
    "<h5>Diez reacciones en dos fases</h5>" +
    "<p>La <b>glucólisis</b> (del griego «romper glucosa») ocurre en el <b>citoplasma</b> de casi todas las células, con o sin oxígeno. Es una vía de <b>10 reacciones</b> (la describieron Embden, Meyerhof y Parnas en la década de 1930) que se puede resumir en dos fases:</p>" +
    tabla(["Fase", "Qué ocurre", "Balance"], [
      ["<b>Inversión de energía</b> (reacciones 1–5)", "La glucosa (6 C) recibe dos fosfatos y se rompe en dos moléculas de 3 C: <b>gliceraldehído-3-fosfato</b> (G3P).", "Se <b>gastan 2 ATP</b>"],
      ["<b>Obtención de energía</b> (reacciones 6–10)", "Cada G3P se oxida (se forma NADH) y se transforma en <b>piruvato</b>, formando ATP en dos pasos.", "Se <b>forman 4 ATP</b> y <b>2 NADH</b>"]
    ], "q3t") +
    "<p>Si recorres la ruta, los compuestos son: glucosa → glucosa-6-fosfato → fructosa-6-fosfato → fructosa-1,6-bisfosfato → (dihidroxiacetona-fosfato ⇌ <b>gliceraldehído-3-fosfato</b>) → 1,3-bisfosfoglicerato → 3-fosfoglicerato → 2-fosfoglicerato → fosfoenolpiruvato → <b>piruvato</b>. No hace falta memorizarlos todos, pero sí saber <b>dónde se gasta ATP</b> (glucosa → glucosa-6-fosfato y fructosa-6-fosfato → fructosa-1,6-bisfosfato) y <b>dónde se forman NADH y ATP</b> (la segunda mitad).</p>" +
    "<h5>El balance, por molécula de glucosa</h5>" +
    tabla(["", "Gasta", "Produce", "Neto"], [
      ["<b>ATP</b>", "2", "4 (fosforilación a nivel de sustrato)", "<b>+2 ATP</b>"],
      ["<b>NADH</b>", "0", "2", "<b>+2 NADH</b>"],
      ["<b>Carbono</b>", "1 glucosa (6 C)", "2 piruvato (3 C cada uno)", "los 6 C siguen, pero repartidos"]
    ], "q3t") +
    "<p style='text-align:center'><b>Glucosa + 2 NAD<sup>+</sup> + 2 ADP + 2 P<sub>i</sub> → 2 piruvato + 2 NADH + 2 ATP + 2 H<sub>2</sub>O</b></p>" +
    ojo("La glucólisis <b>produce</b> 4 ATP, pero <b>gana 2</b> (porque gasta 2). En un examen, escribe siempre «2 ATP netos». Y no consume oxígeno: es la única etapa de la respiración que puede hacerse sin él, y por eso es la base de la fermentación.") +
    "<h5>Por qué es una ruta tan antigua</h5>" +
    "<p>Casi todos los seres vivos hacen glucólisis, desde bacterias a humanos. Es probable que apareciera cuando la atmósfera aún no tenía oxígeno. Sus enzimas están en el citoplasma y no hace falta ningún orgánulo, lo que la hace compatible con las células procariotas. El oxígeno llegó después, gracias a la fotosíntesis (Tema 9), y con él, la respiración aerobia, que saca mucho más rendimiento de la misma glucosa.</p>" +
    w("orden", "ordenglucolisis"));

  // ---------------------------------------------------------------- 3. Descarboxilación oxidativa y Krebs
  secciones[2] = env(
    "<h5>Entrar en la mitocondria: la descarboxilación oxidativa</h5>" +
    "<p>El piruvato formado en el citoplasma atraviesa las dos membranas de la mitocondria (Tema 6) y llega a la <b>matriz</b>. Allí, un complejo enzimático (la <b>piruvato deshidrogenasa</b>) hace tres cosas a la vez:</p>" +
    "<ul><li><b>Descarboxila:</b> le quita un carbono en forma de <b>CO<sub>2</sub></b> (el piruvato pasa de 3 C a 2 C).</li>" +
    "<li><b>Oxida:</b> le quita electrones e hidrógenos que recoge el <b>NAD<sup>+</sup></b>, que pasa a NADH.</li>" +
    "<li><b>Une el resto de 2 C al coenzima A</b> (CoA) y forma <b>acetil-CoA</b>.</li></ul>" +
    "<p style='text-align:center'><b>Piruvato + NAD<sup>+</sup> + CoA → acetil-CoA + CO<sub>2</sub> + NADH + H<sup>+</sup></b></p>" +
    "<p>Como cada glucosa dio <b>dos</b> piruvatos, esta etapa se cuenta dos veces: 2 CO<sub>2</sub>, 2 NADH y 2 acetil-CoA por glucosa. Es una reacción prácticamente irreversible: una vez que el piruvato se convierte en acetil-CoA, los animales no pueden volver a hacer glucosa con él.</p>" +
    "<h5>El ciclo de Krebs (o del ácido cítrico)</h5>" +
    "<p>Lo describió <b>Hans Krebs</b> en <b>1937</b> (Premio Nobel en 1953). Se llama «ciclo» porque la última molécula, el <b>oxalacetato</b> (4 C), es la misma que hace falta para empezar: se regenera en cada vuelta. Ocurre en la <b>matriz mitocondrial</b>.</p>" +
    tabla(["Paso", "Qué pasa", "Se forma"], [
      ["<b>1. Entrada</b>", "El acetil-CoA (2 C) cede su acetilo al oxalacetato (4 C)", "<b>citrato</b> (6 C)"],
      ["<b>2. Citrato → α-cetoglutarato</b>", "Pierde un carbono (primera descarboxilación) y se oxida", "<b>CO<sub>2</sub></b> + <b>NADH</b> (queda de 5 C)"],
      ["<b>3. α-cetoglutarato → succinil-CoA</b>", "Pierde otro carbono (segunda descarboxilación) y se oxida", "<b>CO<sub>2</sub></b> + <b>NADH</b> (queda de 4 C)"],
      ["<b>4. Succinil-CoA → succinato</b>", "La energía del enlace se usa para formar un enlace de fosfato", "<b>1 ATP</b> (o GTP)"],
      ["<b>5. Succinato → fumarato</b>", "Oxidación con FAD (la enzima está en la membrana interna: es el complejo II)", "<b>FADH<sub>2</sub></b>"],
      ["<b>6. Fumarato → malato → oxalacetato</b>", "Se hidrata y se oxida: se regenera el oxalacetato", "<b>NADH</b> (cierra el ciclo)"]
    ], "q3t") +
    "<p><b>Por cada vuelta</b> del ciclo (es decir, por cada acetil-CoA): <b>3 NADH, 1 FADH<sub>2</sub>, 1 ATP (o GTP) y 2 CO<sub>2</sub></b>. Y por cada glucosa hay dos vueltas, así que se duplica todo: <b>6 NADH, 2 FADH<sub>2</sub>, 2 ATP y 4 CO<sub>2</sub></b>.</p>" +
    "<p>Así sale el CO<sub>2</sub> que exhalas: los 6 átomos de carbono de la glucosa acaban como <b>6 CO<sub>2</sub></b> (2 en la descarboxilación oxidativa y 4 en Krebs). Todos los carbonos de la glucosa han salido: la glucosa se ha <b>oxidado por completo</b>.</p>" +
    "<h5>Lo que llevas hasta ahora, por glucosa</h5>" +
    tabla(["Etapa", "Lugar", "NADH", "FADH<sub>2</sub>", "ATP directos", "CO<sub>2</sub>"], [
      ["Glucólisis", "citoplasma", "2", "0", "2", "0"],
      ["Descarboxilación oxidativa", "matriz", "2", "0", "0", "2"],
      ["Ciclo de Krebs (2 vueltas)", "matriz", "6", "2", "2", "4"],
      ["<b>Total</b>", "", "<b>10</b>", "<b>2</b>", "<b>4</b>", "<b>6</b>"]
    ], "q3t") +
    "<p>Fíjate: hasta aquí solo se han formado <b>4 ATP</b>, pero se han cargado <b>10 NADH y 2 FADH<sub>2</sub></b>. Ese es el verdadero tesoro, que se «cobrará» en la cadena respiratoria.</p>" +
    ojo("El ciclo de Krebs <b>no usa oxígeno directamente</b> ni forma agua. El O<sub>2</sub> solo interviene al final de la cadena respiratoria. Pero sin O<sub>2</sub> la cadena se detiene, no se regeneran NAD<sup>+</sup> ni FAD, y el ciclo también se para: por eso toda la ruta se llama aerobia.") +
    w("bio_ruta"));

  // ---------------------------------------------------------------- 4. Cadena respiratoria
  secciones[3] = env(
    "<h5>Un camino de electrones en la membrana interna</h5>" +
    "<p>La <b>membrana mitocondrial interna</b> (las crestas) contiene cuatro grandes complejos proteicos y dos transportadores móviles. Los electrones del NADH y del FADH<sub>2</sub> bajan por ellos como en una cascada, desde un nivel de mucha energía hasta el oxígeno.</p>" +
    tabla(["Pieza", "Qué hace"], [
      ["<b>Complejo I</b> (NADH deshidrogenasa)", "recibe los electrones del <b>NADH</b>; <b>bombea H⁺</b> a la cámara intermembranosa"],
      ["<b>Complejo II</b> (succinato deshidrogenasa)", "recibe los electrones del <b>FADH<sub>2</sub></b>; <b>no bombea H⁺</b> (es la enzima del ciclo de Krebs)"],
      ["<b>Ubiquinona</b> (coenzima Q)", "transportador móvil dentro de la membrana: lleva los electrones de I o II al III"],
      ["<b>Complejo III</b> (citocromo bc<sub>1</sub>)", "pasa los electrones al citocromo c; <b>bombea H⁺</b>"],
      ["<b>Citocromo c</b>", "transportador móvil en el lado externo: lleva los electrones al IV"],
      ["<b>Complejo IV</b> (citocromo c oxidasa)", "entrega los electrones al <b>O<sub>2</sub></b> y se forma <b>agua</b>; <b>bombea H⁺</b>"]
    ], "q3t") +
    "<p style='text-align:center'><b>O<sub>2</sub> + 4 e⁻ + 4 H<sup>+</sup> → 2 H<sub>2</sub>O</b></p>" +
    "<p>Ese es el <b>papel del oxígeno</b>: ser el <b>aceptor final de electrones</b>. Sin él, los electrones no tienen adónde ir, la cadena se atasca y el NADH no se vuelve a convertir en NAD<sup>+</sup>.</p>" +
    "<h5>Quimiosmosis: del gradiente al ATP</h5>" +
    "<p>La energía que pierden los electrones al bajar se usa para <b>bombear protones (H⁺)</b> desde la matriz hasta el espacio intermembranoso. Como la membrana interna es casi impermeable a los H⁺, se forma un <b>gradiente electroquímico</b>: más H⁺ fuera que dentro. Este gradiente es como el agua acumulada detrás de una presa.</p>" +
    "<p>Los protones solo pueden volver a la matriz por un canal especial, la <b>ATP sintasa</b> (complejo V). Al pasar, hacen girar una parte de la proteína, y ese giro une ADP y P<sub>i</sub>: se forma <b>ATP</b>. Esta idea, la <b>teoría quimiosmótica</b>, la propuso <b>Peter Mitchell en 1961</b> (Premio Nobel de Química en 1978). Por eso la fosforilación oxidativa no es una reacción química directa, sino un acoplamiento a través de un gradiente.</p>" +
    "<h5>¿Cuántos ATP por cada coenzima?</h5>" +
    "<p>Se bombean unos <b>10 H⁺</b> por cada NADH (complejos I, III y IV) y unos <b>6 H⁺</b> por cada FADH<sub>2</sub> (solo III y IV, porque entra por el II). Y para fabricar un ATP hacen falta unos <b>4 H⁺</b> (3 pasan por la ATP sintasa y 1 se usa para meter el fosfato en la matriz). Así:</p>" +
    "<p style='text-align:center'>NADH → 10 / 4 = <b>2,5 ATP</b> · FADH<sub>2</sub> → 6 / 4 = <b>1,5 ATP</b></p>" +
    "<p>Los libros más antiguos daban 3 y 2 ATP. En la sección 6 verás cómo cambia el balance total según el criterio.</p>" +
    "<h5>Para interpretar experimentos: inhibidores y desacoplantes</h5>" +
    tabla(["Sustancia", "Dónde actúa", "Efecto en la mitocondria"], [
      ["<b>Rotenona</b>", "complejo I", "bloquea los electrones del NADH; los del FADH<sub>2</sub> (succinato) siguen pasando"],
      ["<b>Antimicina A</b>", "complejo III", "bloquea toda la cadena, venga de donde venga el electrón"],
      ["<b>Cianuro, CO</b>", "complejo IV", "impiden entregar electrones al O<sub>2</sub>: la cadena se para; es un veneno mortal"],
      ["<b>Oligomicina</b>", "ATP sintasa", "los H⁺ no pueden volver: el gradiente sube y la cadena se frena; no hay ATP"],
      ["<b>Desacoplante (DNP)</b>", "membrana interna", "los H⁺ vuelven sin pasar por la ATP sintasa: más consumo de O<sub>2</sub>, casi nada de ATP, la energía sale como calor"]
    ], "q3t") +
    "<p>Hay un desacoplante natural muy útil: en la <b>grasa parda</b> de los recién nacidos y de los animales que hibernan, una proteína (la <b>termogenina</b>) deja pasar los H⁺ y toda la energía se convierte en calor, no en ATP. Así se calientan sin tiritar.</p>" +
    ojo("«La cadena respiratoria fabrica ATP» es una simplificación: lo que fabrica es el <b>gradiente de H⁺</b>; el ATP lo hace la <b>ATP sintasa</b> aprovechando ese gradiente. Y el oxígeno no «produce energía»: solo recoge los electrones al final.") +
    w("bio_cadena") +
    w("orden", "ordencadena"));

  // ---------------------------------------------------------------- 5. Fermentación
  secciones[4] = env(
    "<h5>Para qué sirve fermentar</h5>" +
    "<p>Cuando falta oxígeno (o no hay mitocondrias), la cadena respiratoria se para y el NADH no se vuelve a oxidar. Pero la glucólisis necesita NAD<sup>+</sup> para seguir funcionando. La <b>fermentación</b> resuelve este problema: el piruvato (o un derivado) <b>recibe los electrones del NADH</b>, que se regenera como NAD<sup>+</sup>. El único ATP que se gana es el de la glucólisis: <b>2 ATP por glucosa</b>.</p>" +
    "<p>Fermentar <b>no genera energía extra</b>: en los pasos de fermentación no se produce ATP. Su único objetivo es <b>regenerar el NAD<sup>+</sup></b> para que la glucólisis siga.</p>" +
    tabla(["", "Fermentación láctica", "Fermentación alcohólica"], [
      ["<b>Quién la hace</b>", "bacterias lácticas (<i>Lactobacillus</i>) y células musculares con poco O<sub>2</sub>", "levaduras (<i>Saccharomyces</i>) y algunas bacterias"],
      ["<b>Producto final</b>", "<b>ácido láctico</b> (lactato), 3 C", "<b>etanol</b> (2 C) y <b>CO<sub>2</sub></b>"],
      ["<b>Pasos desde el piruvato</b>", "piruvato + NADH → lactato + NAD<sup>+</sup>", "piruvato → acetaldehído + CO<sub>2</sub>; acetaldehído + NADH → etanol + NAD<sup>+</sup>"],
      ["<b>¿Sale CO<sub>2</sub>?</b>", "no", "sí, 2 por glucosa"],
      ["<b>Rendimiento</b>", "2 ATP por glucosa", "2 ATP por glucosa"],
      ["<b>Usos</b>", "yogur, queso, chucrut, encurtidos; el músculo en ejercicio intenso", "vino, cerveza, sidra; la masa del pan sube por el CO<sub>2</sub>"]
    ], "q3t") +
    "<p style='text-align:center'><b>Láctica:</b> C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → 2 CH<sub>3</sub>–CHOH–COOH + 2 ATP<br><b>Alcohólica:</b> C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → 2 CH<sub>3</sub>CH<sub>2</sub>OH + 2 CO<sub>2</sub> + 2 ATP</p>" +
    "<h5>Tres ideas que se suelen mezclar</h5>" +
    "<ul><li><b>Las agujetas</b> no se deben al ácido láctico acumulado: son pequeñas roturas de fibras musculares. El lactato sí se acumula en el esfuerzo intenso (sensación de quemazón), pero el hígado lo recicla en poco tiempo.</li>" +
    "<li><b>El pan sube por el CO<sub>2</sub></b> de las levaduras; el alcohol se evapora en el horno.</li>" +
    "<li><b>Pasteur</b> demostró en <b>1857</b> que la fermentación láctica la hacen microorganismos, y observó que las levaduras fermentan menos si hay oxígeno (el «efecto Pasteur»). <b>Buchner</b> (1897) vio que un extracto de levadura sin células también fermenta: lo que actúa son enzimas.</li></ul>" +
    "<h5>Respiración aerobia frente a fermentación</h5>" +
    tabla(["", "Respiración aerobia", "Fermentación"], [
      ["<b>Aceptor final de electrones</b>", "oxígeno", "una molécula orgánica (piruvato o acetaldehído)"],
      ["<b>Oxidación de la glucosa</b>", "completa (6 CO<sub>2</sub>)", "incompleta (lactato o etanol aún guardan energía)"],
      ["<b>Lugar</b>", "citoplasma y mitocondria", "solo citoplasma"],
      ["<b>ATP por glucosa</b>", "30–38", "2"]
    ], "q3t") +
    w("clasificar", "fermentaciones"));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Balance energético: 36/38 frente a 30/32", html: env(
    "<h5>Contar los coenzimas</h5>" +
    "<p>Por molécula de glucosa, las etapas anteriores dejan <b>4 ATP</b> directos, <b>10 NADH</b> y <b>2 FADH<sub>2</sub></b>. Falta «cobrar» los coenzimas en la cadena. El total depende de cuántos ATP se atribuyan a cada uno, y por eso los libros no coinciden.</p>" +
    tabla(["Criterio", "Valor de un NADH", "Valor de un FADH<sub>2</sub>", "Total por glucosa"], [
      ["<b>Clásico</b> (libros antiguos)", "3 ATP", "2 ATP", "<b>36–38</b> ATP"],
      ["<b>Actual</b> (relación H⁺/ATP medida)", "2,5 ATP", "1,5 ATP", "<b>30–32</b> ATP"]
    ], "q3t") +
    "<p>Para saber qué criterio pide tu profesor, mira tu libro de clase o el enunciado. <b>En la PAU, escribe siempre el criterio que usas</b> (por ejemplo, «30–32 ATP, con 2,5 y 1,5 ATP por NADH y FADH₂»); si el enunciado da los valores, usa esos.</p>" +
    "<h5>Por qué hay dos cifras en cada criterio: las lanzaderas</h5>" +
    "<p>Los 2 NADH de la <b>glucólisis</b> se forman en el <b>citoplasma</b>, y el NADH no puede cruzar la membrana mitocondrial interna. Para meter sus electrones hay dos «lanzaderas»:</p>" +
    tabla(["Lanzadera", "Dónde", "Qué pasa con los electrones", "ATP por glucosa (actual · clásico)"], [
      ["<b>Malato-aspartato</b>", "hígado, riñón, corazón", "entran como NADH (valen igual)", "<b>32</b> · <b>38</b>"],
      ["<b>Glicerol-fosfato</b>", "músculo esquelético, cerebro", "entran como FADH<sub>2</sub> (valen menos)", "<b>30</b> · <b>36</b>"]
    ], "q3t") +
    "<p>Con la lanzadera del glicerol-fosfato, cada NADH del citoplasma cuenta como un FADH<sub>2</sub>: se pierde 1 ATP por cada uno (2,5 → 1,5 en el criterio actual; 3 → 2 en el clásico), y como son dos NADH, <b>2 ATP menos</b> en total.</p>" +
    ejemplo("Calcula el rendimiento con ambos criterios", "Una glucosa se oxida por completo en el hígado (lanzadera malato-aspartato).", [
      "Directos: 2 (glucólisis) + 2 (Krebs) = <b>4 ATP</b>.",
      "<b>Criterio actual:</b> 10 NADH × 2,5 = 25; 2 FADH<sub>2</sub> × 1,5 = 3; total = 4 + 25 + 3 = <b>32 ATP</b>.",
      "<b>Criterio clásico:</b> 10 NADH × 3 = 30; 2 FADH<sub>2</sub> × 2 = 4; total = 4 + 30 + 4 = <b>38 ATP</b>.",
      "Con la lanzadera del glicerol-fosfato (músculo) los 2 NADH del citoplasma cuentan como FADH<sub>2</sub>: <b>30</b> (actual) o <b>36</b> (clásico)."
    ]) +
    "<h5>Rendimiento energético</h5>" +
    "<p>La oxidación completa de 1 mol de glucosa libera ≈ <b>2870 kJ</b>. Si se forman 32 mol de ATP a 30,5 kJ/mol, se guardan 976 kJ: un <b>34 %</b> aproximadamente. El resto (≈ 66 %) sale como calor, que mantiene la temperatura corporal. En la fermentación, 2 ATP son 61 kJ: solo ≈ <b>2 %</b>. Por eso la respiración aerobia rinde unas 16 veces más ATP que la fermentación (32 frente a 2).</p>" +
    "<h5>Comparador</h5>" +
    "<p>Prueba el criterio, la lanzadera y la fermentación en el balance interactivo; verás cómo cambia el total y de dónde sale cada ATP:</p>" +
    w("bio_atp")) });

  nuevas.push({ h: "7. β-oxidación de los ácidos grasos", html: env(
    "<h5>La grasa también se quema en la mitocondria</h5>" +
    "<p>Cuando la glucosa escasea (ayuno, ejercicio prolongado), el cuerpo usa los <b>ácidos grasos</b> de los triglicéridos (Tema 3). Su degradación es la <b>β-oxidación</b> (se llama «beta» porque se oxida el carbono β, el tercero desde el grupo ácido). Se hace en la <b>matriz mitocondrial</b>.</p>" +
    "<ul><li><b>Activación</b> (en el citoplasma): el ácido graso se une al coenzima A y forma <b>acil-CoA</b>, gastando el equivalente a <b>2 ATP</b> (ATP → AMP + PP<sub>i</sub>).</li>" +
    "<li><b>Transporte:</b> el acil-CoA entra en la mitocondria con ayuda de la carnitina.</li>" +
    "<li><b>Cada vuelta</b> de la β-oxidación recorta <b>2 carbonos</b> en forma de <b>acetil-CoA</b> y produce <b>1 FADH<sub>2</sub></b> y <b>1 NADH</b>.</li>" +
    "<li>El acetil-CoA entra en el <b>ciclo de Krebs</b>, igual que el de la glucosa (3 NADH, 1 FADH<sub>2</sub> y 1 ATP cada uno).</li></ul>" +
    "<p>Un ácido graso de <b>n carbonos</b> (n par, saturado) da <b>n/2 acetil-CoA</b> y necesita <b>n/2 − 1 vueltas</b> (la última vuelta rompe 4 C en 2 acetil-CoA).</p>" +
    tabla(["", "Fórmula", "Palmítico (n = 16)"], [
      ["Acetil-CoA", "n / 2", "8"],
      ["Vueltas", "n / 2 − 1", "7"],
      ["NADH", "(n / 2 − 1) + 3 · n / 2", "7 + 24 = 31"],
      ["FADH<sub>2</sub>", "(n / 2 − 1) + n / 2", "7 + 8 = 15"],
      ["ATP directos (Krebs)", "n / 2", "8"],
      ["Activación", "−2", "−2"]
    ], "q3t") +
    ejemplo("Balance del ácido palmítico (16 C)", "Calcula los ATP que da la oxidación completa de una molécula de ácido palmítico (criterio 30/32).", [
      "NADH: 31 × 2,5 = 77,5. FADH<sub>2</sub>: 15 × 1,5 = 22,5. ATP directos: 8.",
      "Suma: 77,5 + 22,5 + 8 = 108. Restamos la activación: 108 − 2 = <b>106 ATP</b>.",
      "<b>Criterio clásico (3 y 2):</b> 31 × 3 + 15 × 2 + 8 − 2 = 93 + 30 + 8 − 2 = <b>129 ATP</b>.",
      "<b>Comparación:</b> 106 / 16 = 6,6 ATP por carbono frente a 32 / 6 = 5,3 de la glucosa. La grasa da más porque está <b>más reducida</b> (tiene más H por carbono) y, además, aporta unos 9 kcal/g frente a unos 4 kcal/g de los glúcidos."
    ]) +
    "<p>Otras fuentes: las <b>proteínas</b> pierden el grupo amino (desaminación; el nitrógeno se elimina como urea) y los esqueletos carbonados entran en la glucólisis o en el ciclo de Krebs. Por eso el acetil-CoA es el <b>nudo central</b> del catabolismo: glúcidos, grasas y proteínas confluyen en él o en el ciclo.</p>" +
    ojo("Los animales <b>no pueden convertir los ácidos grasos en glucosa</b> (el acetil-CoA no vuelve a piruvato). Por eso, en un ayuno largo, el hígado transforma el exceso de acetil-CoA en «cuerpos cetónicos», que el cerebro puede usar como combustible alternativo.") +
    w("clasificar", "fuentes")) });

  nuevas.push({ h: "8. Ejemplos PAU resueltos: interpretar experimentos", html: env(
    ejemplo("Mitocondrias aisladas y un respirómetro", "Se tienen mitocondrias aisladas en un medio con O<sub>2</sub>, que se mide con un electrodo. Se añaden en orden: (1) piruvato + malato y ADP: el consumo de O<sub>2</sub> sube mucho. (2) Rotenona: el consumo de O<sub>2</sub> cae casi a cero. (3) Succinato: el consumo de O<sub>2</sub> se recupera. (4) Cianuro: el consumo de O<sub>2</sub> cae a cero. (a) Explica cada paso. (b) ¿Por qué se recupera con el succinato? (c) ¿Qué pasaría si en (3) se añade además un desacoplante?", [
      "<b>(1)</b> Piruvato y malato producen NADH en la matriz; el NADH entrega electrones al complejo I y la cadena funciona; el ADP permite que la ATP sintasa gaste el gradiente y la cadena vaya rápido. Se consume O<sub>2</sub> (aceptor final).",
      "<b>(2)</b> La rotenona bloquea el complejo I: los electrones del NADH no entran en la cadena y el consumo de O<sub>2</sub> baja.",
      "<b>(3)</b> El succinato lo oxida el complejo II (FADH<sub>2</sub>), que cede los electrones a la ubiquinona <b>saltándose el complejo I</b>. La cadena sigue desde el III y el consumo de O<sub>2</sub> se recupera.",
      "<b>(4)</b> El cianuro bloquea el complejo IV, y sin él los electrones no llegan al O<sub>2</sub>: no hay consumo.",
      "<b>(c)</b> Con el desacoplante el consumo de O<sub>2</sub> sería <b>aún mayor</b> (no hay gradiente que frene la cadena), pero casi no se fabricaría ATP y la energía se liberaría como calor."
    ]) +
    ejemplo("Levaduras en un matraz", "Se preparan tres matraces con levaduras en agua, cada uno cerrado con un globo: A) con aire y con glucosa; B) sin aire y sin glucosa; C) sin aire y con glucosa. En C el globo se hincha y se nota olor a alcohol. (a) Explica por qué. (b) ¿Qué proceso ocurre y cuál es su rendimiento? (c) Si 1 mol de glucosa se fermenta del todo, ¿cuántos moles de etanol y de CO<sub>2</sub> salen, y cuántos ATP?", [
      "<b>(a)</b> En C no hay oxígeno: las levaduras hacen <b>fermentación alcohólica</b>. El globo se infla por el <b>CO<sub>2</sub></b> y el olor es del <b>etanol</b>. En B no hay sustrato y no ocurre nada; en A, con aire, hay respiración aerobia: se consume 1 O<sub>2</sub> por cada CO<sub>2</sub> que sale y el volumen apenas cambia.",
      "<b>(b)</b> Glucólisis (2 ATP, 2 NADH) y reducción del piruvato a etanol con liberación de CO<sub>2</sub>; el NADH se oxida a NAD<sup>+</sup>. <b>Rinde 2 ATP por glucosa</b>, frente a 30–32 en la respiración.",
      "<b>(c)</b> C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> → 2 C<sub>2</sub>H<sub>5</sub>OH + 2 CO<sub>2</sub>: <b>2 mol de etanol, 2 mol de CO<sub>2</sub> y 2 mol de ATP</b>. Se comprueba el carbono: 6 = 2·2 + 2."
    ]) +
    ejemplo("Cociente respiratorio", "El cociente respiratorio (CR) es CO<sub>2</sub> producido / O<sub>2</sub> consumido. Calcúlalo para la glucosa y para el ácido palmítico.", [
      "<b>Glucosa:</b> C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub> → 6 CO<sub>2</sub> + 6 H<sub>2</sub>O. CR = 6 / 6 = <b>1</b>.",
      "<b>Palmítico:</b> C<sub>16</sub>H<sub>32</sub>O<sub>2</sub> + 23 O<sub>2</sub> → 16 CO<sub>2</sub> + 16 H<sub>2</sub>O (se comprueba el oxígeno: 2 + 46 = 32 + 16). CR = 16 / 23 = <b>0,70</b>.",
      "Un CR cercano a 1 indica que se queman sobre todo glúcidos; cerca de 0,7, sobre todo grasas."
    ])) });

  nuevas.push({ h: "9. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>Orden de una buena respuesta: <b>definir → explicar el mecanismo con lugar y balance → dar ejemplo → relacionar</b>. Estas son las preguntas más típicas del tema, con una respuesta modelo.</p>" +
    ejemplo("Pregunta 1. Glucólisis: localización, fases y balance", "Respuesta modelo:", [
      "<b>Dónde:</b> en el citoplasma; no necesita O<sub>2</sub>.",
      "<b>Qué hace:</b> convierte 1 glucosa (6 C) en 2 piruvato (3 C).",
      "<b>Balance:</b> gasta 2 ATP y forma 4 (neto +2 ATP) y 2 NADH.",
      "<b>Destino:</b> con O<sub>2</sub>, el piruvato entra en la mitocondria; sin él, fermenta."
    ]) +
    ejemplo("Pregunta 2. Ciclo de Krebs", "Respuesta modelo:", [
      "<b>Dónde:</b> en la matriz mitocondrial.",
      "<b>Entra:</b> acetil-CoA (2 C), que se une al oxalacetato (4 C) y forma citrato (6 C).",
      "<b>Por vuelta:</b> 2 CO<sub>2</sub>, 3 NADH, 1 FADH<sub>2</sub> y 1 ATP (GTP); se regenera el oxalacetato.",
      "<b>Por glucosa</b> (2 vueltas): 4 CO<sub>2</sub>, 6 NADH, 2 FADH<sub>2</sub> y 2 ATP."
    ]) +
    ejemplo("Pregunta 3. Cadena respiratoria y fosforilación oxidativa", "Respuesta modelo:", [
      "<b>Dónde:</b> membrana mitocondrial interna (crestas).",
      "Los electrones del NADH y del FADH<sub>2</sub> pasan por los complejos; la energía se usa para <b>bombear H⁺</b> y crear un gradiente.",
      "El <b>O<sub>2</sub></b> es el aceptor final: se forma agua.",
      "Los H⁺ vuelven por la <b>ATP sintasa</b> y se forma ATP (quimiosmosis, Mitchell, 1961)."
    ]) +
    ejemplo("Pregunta 4. Fermentación láctica y alcohólica", "Respuesta modelo:", [
      "<b>Condición:</b> sin O<sub>2</sub>; solo se hace la glucólisis.",
      "<b>Para qué:</b> regenerar el NAD<sup>+</sup> que gasta la glucólisis.",
      "<b>Láctica:</b> piruvato → lactato (bacterias lácticas, músculo); <b>alcohólica:</b> piruvato → etanol + CO<sub>2</sub> (levaduras).",
      "<b>Rendimiento:</b> 2 ATP por glucosa, frente a 30–38 en la respiración."
    ]) +
    "<p>Los ejercicios del final incluyen cinco preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio8a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
