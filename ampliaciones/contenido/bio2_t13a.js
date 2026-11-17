/* ============================================================
   Biología II · ampliaciones · Tema 13: Mutaciones e ingeniería genética
   (parte A: teoría de mutaciones y de ADN recombinante. Parte B, bio2_t13b.js: PCR, clonación, transgénicos, CRISPR,
   terapia génica, bioética y PAU. Parte C, bio2_t13c.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t13.js (bio_mutacion, bio_restriccion, bio_pcr).

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Clasificar mutaciones: génica / cromosómica / genómica y, dentro de cada una, el subtipo exacto → secciones 1-4 + ejercicios.
   2. Efecto de una sustitución sobre la proteína (silenciosa, cambio de sentido, sin sentido) con la tabla del código → sección 2 + widget bio_mutacion.
   3. Inserción/deleción y desplazamiento del marco: cuándo es grave y cuándo no (múltiplos de 3) → sección 2 + widget bio_mutacion.
   4. Aneuploidías y poliploidías: cariotipo, no disyunción y cuentas de cromosomas (2n ± 1, 3n) → sección 4.
   5. Agentes mutágenos físicos, químicos y biológicos y su mecanismo (dímeros de timina, análogos, intercalantes) → sección 6.
   6. Mutación, evolución y cáncer (oncogenes, genes supresores, acumulación de mutaciones) → sección 7.
   7. Enzimas de restricción: palíndromos, extremos cohesivos/romos y fragmentos de un gel → sección 8 + widget bio_restriccion.
   8. ADN recombinante, vectores y selección de recombinantes (resistencia a antibiótico, azul/blanco) → sección 9.
   9. PCR: etapas, componentes, cálculo de copias (2ⁿ) y usos → sección 10 + widget bio_pcr.
   10. CRISPR-Cas9, terapia génica, transgénicos y clonación, con ventajas, riesgos y bioética → secciones 11-12.
   Convenciones declaradas: tasa de mutación tras corrección y reparación ≈ 10⁻⁹ por base y replicación (la de T11);
   genoma humano diploide ≈ 6,4·10⁹ pb; sitios de restricción al azar cada 4ⁿ pb (n = longitud del sitio, bases equiprobables);
   PCR ideal duplica en cada ciclo (el producto del tamaño exacto es 2ⁿ − 2n); ciclo de PCR de 2 min (30 s + 30 s + 60 s);
   ADN de ejemplo de 6000 pb con sitios EcoRI en 1000 y 3000, BamHI en 2200 y HindIII en 4800.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t13/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Concepto de mutación
  secciones[0] = env(
    "<h5>Para qué sirve este tema</h5>" +
    "<p>Este tema junta dos ideas que parecen opuestas y son la misma: <b>el ADN puede cambiar</b> (mutaciones) y <b>nosotros podemos cambiarlo a propósito</b> (ingeniería genética). Para entender cualquiera de las dos tienes que dominar lo que viste antes: la <b>estructura del ADN</b> (T5), su <b>copia</b> y sus errores (T11) y el <b>código genético</b> con el paso ADN → ARN → proteína (T12).</p>" +
    "<h5>Mutación frente a error y frente a recombinación</h5>" +
    "<p>Tres palabras que no son lo mismo y que el examen suele mezclar:</p>" +
    tabla(["Concepto", "Qué es", "¿Se hereda?"], [
      ["<b>Error de replicación</b>", "una base mal puesta al copiar el ADN (T11); casi todos los corrige la polimerasa o los sistemas de reparación", "no, si se corrige"],
      ["<b>Mutación</b>", "cambio en el material genético que <b>no se ha corregido</b> y queda fijado", "sí, a las células hijas (y a la descendencia si es en gametos)"],
      ["<b>Recombinación</b>", "barajado de genes ya existentes (entrecruzamiento en meiosis, T7): no crea alelos nuevos", "sí"]
    ], "q3t") +
    "<p>La diferencia clave: la recombinación <b>mezcla</b> alelos que ya existen; solo la mutación <b>fabrica alelos nuevos</b>. Por eso la mutación es la <b>materia prima de la evolución</b> (T16).</p>" +
    "<h5>Frecuencia y efectos</h5>" +
    "<p>Gracias a la corrección de pruebas y a la reparación, la célula comete en la práctica una equivocación por cada unas 10<sup>9</sup> bases copiadas. Parece poco, pero el genoma diploide humano tiene unas 6,4·10<sup>9</sup> pares de bases: salen del orden de 6 errores nuevos por cada replicación completa de una célula (≈ 6,4 con esa tasa). En la práctica, estudios de genomas de padres e hijos cuentan unas <b>60-80 mutaciones nuevas</b> por persona respecto a sus progenitores; casi todas caen en ADN sin función conocida y no se notan.</p>" +
    "<p>Según el efecto sobre el individuo, una mutación puede ser:</p>" +
    "<ul><li><b>Perjudicial</b> (la mayoría de las que tienen efecto): rompen un gen que funcionaba. Algunas son letales.</li>" +
    "<li><b>Neutra</b>: no cambia nada apreciable (por ejemplo, una mutación silenciosa o en una zona sin función).</li>" +
    "<li><b>Beneficiosa</b>: muy raras, pero son las que la selección natural puede favorecer (por ejemplo, la persistencia de la lactasa en adultos).</li></ul>" +
    "<p>Esto depende del <b>ambiente</b>: la mutación de la anemia falciforme es perjudicial en un lugar sin malaria y ventajosa (en heterocigosis) donde la malaria es frecuente. Lo veremos en la sección 7.</p>" +
    "<h5>Mutaciones somáticas y germinales; espontáneas e inducidas</h5>" +
    tabla(["Criterio", "Tipos", "Qué significa"], [
      ["<b>Dónde ocurren</b>", "somática / germinal", "las somáticas afectan a una célula del cuerpo y a sus descendientes celulares (pueden causar cáncer) pero <b>no pasan a los hijos</b>; las germinales ocurren en las células que dan gametos y <b>sí se heredan</b>"],
      ["<b>Cómo ocurren</b>", "espontánea / inducida", "las espontáneas son errores naturales (replicación, cambios químicos de las bases); las inducidas las provoca un <b>agente mutágeno</b> (sección 6)"]
    ], "q3t") +
    "<p>Un ejemplo para fijarlo: una mancha de nacimiento que sale por una mutación en una célula de la piel es <b>somática</b> (no se hereda); un hijo con la mutación de la fibrosis quística en <b>todas</b> sus células tiene una mutación <b>germinal</b> que viene de un óvulo o un espermatozoide.</p>" +
    "<h5>Tres niveles</h5>" +
    "<p>Las mutaciones se clasifican según el <b>tamaño del cambio</b>: <b>génicas</b> (un gen, hasta unas pocas bases), <b>cromosómicas</b> (la estructura de un cromosoma) y <b>genómicas</b> (el número de cromosomas). Las tres secciones siguientes las desarrollan una a una.</p>" +
    tabla(["Tipo", "Qué cambia", "Ejemplo"], [
      ["<b>Génica</b>", "la secuencia de bases de un gen", "anemia falciforme (GAG → GUG)"],
      ["<b>Cromosómica</b>", "la estructura de un cromosoma", "síndrome del maullido de gato (deleción)"],
      ["<b>Genómica</b>", "el número de cromosomas", "síndrome de Down (trisomía 21)"]
    ], "q3t")
  );

  // ---------------------------------------------------------------- 2. Mutaciones génicas
  secciones[1] = env(
    "<h5>Tipos de cambio en el ADN</h5>" +
    "<p>Una mutación génica es un cambio en la <b>secuencia de nucleótidos</b> de un gen. Hay dos grandes familias:</p>" +
    "<ul><li><b>Sustitución</b>: una base se cambia por otra. Si una purina (A, G) se cambia por otra purina, o una pirimidina (C, T) por otra pirimidina, se llama <b>transición</b>; si se cambia una purina por una pirimidina o al revés, <b>transversión</b>. Las transiciones son más frecuentes.</li>" +
    "<li><b>Inserción o deleción</b> (a veces «indel»): se añaden o se pierden bases.</li></ul>" +
    "<h5>Efecto de una sustitución sobre la proteína</h5>" +
    "<p>El código genético es <b>degenerado</b> (T12): hay 61 codones con sentido para 20 aminoácidos y 3 de parada. Por eso una sustitución puede tener tres resultados. Verás los tres con el codón <b>GAG</b> (ácido glutámico, Glu), el que está en la posición 6 de la β-globina madura:</p>" +
    tabla(["Tipo", "Qué ocurre", "Ejemplo con GAG"], [
      ["<b>Silenciosa</b> (sinónima)", "el codón nuevo codifica el <b>mismo</b> aminoácido", "GAG → GAA (sigue siendo Glu)"],
      ["<b>Cambio de sentido</b> (<i>missense</i>)", "el codón nuevo codifica <b>otro</b> aminoácido", "GAG → GUG (Val): <b>anemia falciforme</b>"],
      ["<b>Sin sentido</b> (<i>nonsense</i>)", "el codón nuevo es de <b>parada</b>: la proteína se corta antes de tiempo", "GAG → UAG (parada)"]
    ], "q3t") +
    "<p>Fíjate en que hablamos de codones del <b>ARNm</b> (con U). En el ADN el cambio equivalente es A → T en la hebra codificante: GAG → GTG. Para una proteína, lo que cuenta es qué aminoácido sale.</p>" +
    "<h5>¿Cuáles son más graves?</h5>" +
    "<p>Si recorres todos los cambios posibles de una sola base en los 61 codones con sentido hay <b>549</b> sustituciones: unas <b>134 (24 %) silenciosas</b>, <b>392 (71 %) de cambio de sentido</b> y <b>23 (4 %) sin sentido</b>. Las silenciosas se concentran en la <b>tercera base</b> del codón (por eso la llamamos «base oscilante»): por ejemplo, los cuatro codones CU<i>N</i> codifican Leu, así que cambiar la tercera base casi nunca altera el aminoácido. Una sustitución sin sentido suele ser <b>más grave</b> que una de cambio de sentido: la proteína queda truncada. Un cambio de sentido depende de <b>qué aminoácido</b> cambia y de <b>dónde</b>: cambiar Glu por Asp (ambos ácidos) casi no se nota; cambiar Glu (polar, con carga) por Val (apolar) en la superficie de la hemoglobina hace que las moléculas se peguen entre sí.</p>" +
    ejemplo("Un caso real: la anemia falciforme", "En el gen de la β-globina, el codón 6 (contando sin la Met inicial) pasa de GAG a GUG en el ARNm. ¿Qué tipo de mutación es y qué consecuencia tiene?", [
      "Un solo nucleótido cambia (A → U en el ARNm; A → T en el ADN): es una <b>mutación génica por sustitución</b> (una transversión, de purina a pirimidina).",
      "GAG codifica Glu y GUG codifica Val: el aminoácido cambia, así que es de <b>cambio de sentido</b>.",
      "La hemoglobina S (con Val) tiene una zona apolar en la superficie y, sin oxígeno, las moléculas se agrupan en fibras que deforman el glóbulo rojo en <b>forma de hoz</b>: se atascan en los capilares y se destruyen (anemia).",
      "Es una enfermedad <b>recesiva</b>: la sufren los homocigotos (HbS/HbS). Pauling la llamó «enfermedad molecular» en 1949; Ingram (1956) demostró que la diferencia era <b>un solo aminoácido</b>."
    ]) +
    w("bio_mutacion") +
    "<h5>Inserciones y deleciones: el marco de lectura</h5>" +
    "<p>El ARNm se lee de tres en tres bases, sin separaciones (T12). Si se inserta o se pierde un número de bases que <b>no es múltiplo de 3</b> (1, 2, 4, 5…), todos los tripletes siguientes cambian: es una mutación por <b>desplazamiento del marco de lectura</b> (<i>frameshift</i>). La proteína resultante suele ser distinta desde ese punto en adelante y a menudo se corta pronto, porque en un marco cambiado aparece enseguida un codón de parada por casualidad (hay 3 de 64).</p>" +
    "<p>Si se inserta o se pierde un <b>múltiplo de 3</b> (3, 6, 9 bases), el marco se conserva: la proteína gana o pierde aminoácidos enteros pero el resto se lee bien. Por eso la deleción de 3 pb de la fibrosis quística (ΔF508) quita solo una fenilalanina y, aun así, la proteína no funciona bien.</p>" +
    ejemplo("Del desplazamiento del marco, paso a paso", "En el Tema 12 tradujiste el ARNm 5′-AUG UUU GGC UAA-3′ (Met–Phe–Gly–parada). Si se inserta una G justo tras la tercera base, ¿cómo queda la proteína?", [
      "La secuencia nueva es AUG<b>G</b>UUUGGCUAA (se ha colado una G entre la G del AUG y la primera U).",
      "Se vuelve a leer de tres en tres desde el AUG: AUG · GUU · UGG · CUA · A…",
      "GUU = Val, UGG = Trp, CUA = Leu: la proteína empieza Met–Val–Trp–Leu… y <b>el UAA original ya no se lee como parada</b> (quedó partido entre dos tripletes).",
      "Resultado: dos aminoácidos cambiados desde el punto de inserción y la proteína, si la secuencia sigue, ya no termina donde debía. Es una mutación por <b>inserción con cambio de marco</b>."
    ]) +
    ojo("Una sustitución cambia <b>un</b> codón como mucho; una inserción o deleción de 1 base cambia <b>todos</b> los codones que vienen después. Por eso, aunque las dos sean «cambios de una base», el desplazamiento del marco suele ser mucho más grave.") +
    "<h5>Otros ejemplos reales (para citar en un examen)</h5>" +
    tabla(["Enfermedad", "Gen", "Mutación"], [
      ["<b>Anemia falciforme</b>", "β-globina (<i>HBB</i>)", "sustitución GAG → GUG (Glu → Val)"],
      ["<b>β-talasemia</b> (un tipo común en el Mediterráneo)", "β-globina (<i>HBB</i>)", "sin sentido en el codón 39 (CAG → UAG): proteína truncada"],
      ["<b>Fibrosis quística</b> (ΔF508)", "<i>CFTR</i>", "deleción de 3 pb (se pierde una Phe, el marco se conserva)"],
      ["<b>Fenilcetonuria</b>", "<i>PAH</i>", "sustituciones de cambio de sentido que inactivan la enzima"],
      ["<b>Distrofia muscular de Duchenne</b>", "<i>DMD</i> (cromosoma X)", "deleciones grandes que desplazan el marco: sin distrofina funcional"]
    ], "q3t") +
    "<h5>Mutaciones de pérdida y de ganancia de función</h5>" +
    "<p>Desde el punto de vista de la proteína, una mutación génica puede <b>apagar</b> el gen (pérdida de función: casi siempre recesiva, porque el alelo normal compensa) o <b>activarlo en exceso o en el sitio equivocado</b> (ganancia de función: suele ser dominante). Esta idea es la clave del cáncer (sección 7). Por último, algunas zonas del ADN son <b>puntos calientes</b>: por ejemplo, la citosina metilada (5-metilcitosina) se desamina espontáneamente y se convierte en timina, una base que la célula no detecta como error, así que esos sitios mutan con más frecuencia.</p>"
  );

  // ---------------------------------------------------------------- 3. Mutaciones cromosómicas
  secciones[2] = env(
    "<h5>Cuatro tipos y cómo se dibujan</h5>" +
    "<p>Imagina un cromosoma como una tira con tramos señalados con letras: <b>A B C D E F</b>. Las mutaciones cromosómicas reorganizan esos tramos sin cambiar el número de cromosomas:</p>" +
    tabla(["Tipo", "Qué ocurre", "Antes → después"], [
      ["<b>Deleción</b>", "se pierde un fragmento", "A B C D E F → A B <b>·</b> D E F (falta C)"],
      ["<b>Duplicación</b>", "un fragmento se repite", "A B C D E F → A B C <b>C</b> D E F"],
      ["<b>Inversión</b>", "un fragmento gira 180° y se vuelve a unir", "A B C D E F → A <b>D C B</b> E F"],
      ["<b>Translocación</b>", "un fragmento pasa a otro cromosoma (no homólogo)", "A B C D E F y M N O P → A B C D <b>O P</b> y M N <b>E F</b> (recíproca)"]
    ], "q3t") +
    "<p>Dos precisiones que se preguntan: en la <b>deleción</b> y la <b>duplicación</b> la <b>cantidad</b> de ADN cambia (se pierde o se gana material); en la <b>inversión</b> y la <b>translocación recíproca equilibrada</b> la cantidad total de ADN es la misma, solo cambia su posición. Por eso estas últimas a menudo no dan síntomas en el portador… pero sí pueden dar problemas en sus hijos, porque en la meiosis se reparten mal (gametos con fragmentos de más o de menos).</p>" +
    "<h5>Consecuencias</h5>" +
    "<p>Las deleciones grandes suelen ser graves porque se pierden muchos genes a la vez. Las duplicaciones aportan genes de más (a veces perjudiciales por exceso de producto, pero también son una vía de <b>evolución</b>: una copia extra puede cambiar y adquirir una función nueva mientras la otra sigue haciendo su trabajo). Algunas translocaciones <b>activan genes</b> al juntar un gen con una región que lo regula con fuerza (cáncer).</p>" +
    tabla(["Ejemplo", "Tipo", "Qué pasa"], [
      ["<b>Síndrome del maullido de gato</b> (<i>cri du chat</i>, Lejeune 1963)", "deleción", "se pierde el brazo corto del cromosoma 5 (5p−): llanto agudo de bebé, discapacidad intelectual"],
      ["<b>Cromosoma Filadelfia</b> (leucemia mieloide crónica)", "translocación recíproca t(9;22)", "el gen <i>ABL</i> (cromosoma 9) se une a <i>BCR</i> (cromosoma 22): la proteína híbrida BCR-ABL hace que la célula se divida sin control"],
      ["<b>Síndrome de Down familiar</b>", "translocación (robertsoniana)", "un cromosoma 21 está pegado al 14: el portador es sano, pero puede tener hijos con trisomía 21"]
    ], "q3t") +
    ojo("«Translocación» no es «deleción»: en la translocación el fragmento <b>no se pierde</b>, <b>cambia de lugar</b>. En un examen, si pone «un fragmento se ha pasado a otro cromosoma», es translocación.")
  );

  // ---------------------------------------------------------------- 4. Mutaciones genómicas
  secciones[3] = env(
    "<h5>Lo que cuenta es el número</h5>" +
    "<p>Las mutaciones genómicas cambian el <b>número de cromosomas</b>. Se estudian con el <b>cariotipo</b>: los cromosomas de una célula en metafase, fotografiados y ordenados por tamaño. En la especie humana la célula somática es diploide, <b>2n = 46</b> (22 pares de autosomas y un par sexual, XX o XY); un gameto es haploide, <b>n = 23</b>.</p>" +
    "<h5>Aneuploidías: faltan o sobran cromosomas sueltos</h5>" +
    "<p>Se escriben con el nombre «2n + 1» (trisomía: tres copias de un cromosoma en lugar de dos) o «2n − 1» (monosomía: una sola copia). Su causa habitual es la <b>no disyunción</b>: en la meiosis (T7) dos cromosomas homólogos (meiosis I) o dos cromatidas hermanas (meiosis II) no se separan y van al mismo gameto. Ese gameto tiene n + 1 cromosomas y el otro n − 1; al unirse con un gameto normal salen un cigoto 2n + 1 o 2n − 1.</p>" +
    tabla(["Síndrome", "Cariotipo", "Rasgos principales"], [
      ["<b>Down</b> (Lejeune, 1959)", "47, XX o XY, +21 (trisomía 21)", "discapacidad intelectual leve-moderada, rasgos faciales característicos, a veces cardiopatía; la probabilidad aumenta con la edad materna"],
      ["<b>Edwards</b>", "47, +18", "malformaciones graves; la mayoría no sobrevive el primer año"],
      ["<b>Patau</b>", "47, +13", "malformaciones graves; supervivencia muy corta"],
      ["<b>Turner</b>", "45, X (monosomía del X)", "mujer de baja estatura, esterilidad por fallo de los ovarios; el único caso de monosomía que se tolera en humanos"],
      ["<b>Klinefelter</b>", "47, XXY", "varón con testículos pequeños, esterilidad y a veces ginecomastia"]
    ], "q3t") +
    "<p>En humanos, casi todas las monosomías y trisomías de autosomas son <b>letales en el desarrollo embrionario</b>; solo sobreviven las de los cromosomas más pequeños (21, 18, 13) y las de los cromosomas sexuales, porque tienen pocos genes y el cromosoma X sobrante se inactiva (T7).</p>" +
    ejemplo("Dónde falla la meiosis", "Una mujer produce óvulos por meiosis. Si el par 21 no se separa, ¿cuántos óvulos anormales hay entre los 4 productos de una meiosis? ¿Cambia si el fallo es en la meiosis I o en la II?", [
      "<b>Meiosis I</b> (no se separan los dos cromosomas 21 homólogos): los dos productos de una célula hija tienen 2 cromosomas 21 y los dos de la otra, ninguno. Los <b>4 gametos son anormales</b> (2 con n + 1 y 2 con n − 1).",
      "<b>Meiosis II</b> (no se separan las cromátidas hermanas de un solo cromosoma 21): solo falla una de las dos células de la segunda división. Salen <b>2 gametos normales</b>, 1 con n + 1 y 1 con n − 1: <b>2 anormales</b>.",
      "Si un gameto con 2 cromosomas 21 se une a un espermatozoide normal (1 cromosoma 21): trisomía, 47 cromosomas, síndrome de Down. Si el gameto sin cromosoma 21 se une: monosomía 21, que no es viable."
    ]) +
    "<h5>Euploidías y poliploidías: juegos completos de más</h5>" +
    "<p>Si se multiplica el <b>juego completo</b> de cromosomas se habla de <b>poliploidía</b>: 3n (triploide), 4n (tetraploide)… En animales casi nunca se tolera, pero en <b>plantas</b> es frecuente y muy útil: las poliploides suelen ser más grandes y vigorosas. Ocurre por un fallo en la meiosis (gametos con 2n) o por una división celular en la que se duplican los cromosomas pero no se reparte el citoplasma (se provoca en el laboratorio con <b>colchicina</b>, que impide formar el huso mitótico).</p>" +
    tabla(["Planta", "Dotación", "Dato"], [
      ["<b>Trigo harinero</b>", "6n = 42 (hexaploide, n = 7 en cada genoma de origen)", "nació por cruzamientos entre especies silvestres y duplicación (alopoliploidía)"],
      ["<b>Sandía sin semillas</b>", "3n = 33", "se cruza una planta 4n = 44 con otra 2n = 22: el híbrido es 3n, no puede hacer gametos viables y no forma semillas"],
      ["<b>Plátano comercial (Cavendish)</b>", "3n = 33", "estéril: se reproduce por esquejes, no por semillas"]
    ], "q3t") +
    ojo("<b>Aneuploidía</b> (falta o sobra un cromosoma: 47, 45…) y <b>poliploidía</b> (juegos completos de más: 69, 92…) son las dos mutaciones genómicas. No las confundas con las cromosómicas: aquí <b>no cambia la estructura</b> de ningún cromosoma, cambia cuántos hay.")
  );

  // ---------------------------------------------------------------- 5. Ingeniería genética (introducción)
  secciones[4] = env(
    "<h5>Cómo se llegó hasta aquí</h5>" +
    "<p>La ingeniería genética consiste en <b>aislar, modificar y transferir genes</b> de un organismo a otro. Se hizo posible en los años 70, cuando se descubrieron tres cosas: unas «tijeras» que cortan el ADN por sitios concretos (<b>enzimas de restricción</b>), un «pegamento» que lo une (<b>ADN ligasa</b>, T11) y vehículos que lo llevan al interior de una célula (<b>vectores</b>). En 1973 Cohen y Boyer unieron un trozo de ADN de rana a un plásmido bacteriano y lo introdujeron en <i>E. coli</i>: el primer ADN recombinante funcional. Esa idea, con la <b>PCR</b> (1983) y el <b>CRISPR</b> (2012), es la caja de herramientas actual.</p>" +
    "<p>El truco que lo hace posible es que <b>el código genético es universal</b> (T12): una bacteria lee un gen humano con el mismo diccionario, así que puede fabricar una proteína humana. El esquema general de casi todos los experimentos es siempre el mismo:</p>" +
    "<ol><li><b>Obtener</b> el gen de interés (cortándolo con enzimas de restricción, copiándolo por PCR o sintetizándolo).</li>" +
    "<li><b>Cortar</b> el vector con la misma enzima y <b>unir</b> gen y vector con ligasa (ADN recombinante).</li>" +
    "<li><b>Introducir</b> el ADN recombinante en una célula hospedadora (transformación).</li>" +
    "<li><b>Seleccionar</b> las células que lo han recibido y <b>expresarlo</b> (que fabrique la proteína).</li></ol>" +
    "<p>Las secciones 8 a 12 siguen este orden. Antes, vamos con lo que provoca las mutaciones y con su papel en la evolución y el cáncer.</p>"
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Agentes mutágenos", html: env(
    "<p>Un <b>agente mutágeno</b> es cualquier factor que aumenta la frecuencia de mutaciones. Se clasifican en físicos, químicos y biológicos, y es importante saber <b>cómo</b> actúan, no solo nombrarlos.</p>" +
    tabla(["Tipo", "Ejemplos", "Mecanismo y efecto"], [
      ["<b>Físicos: radiaciones no ionizantes</b>", "luz ultravioleta (UV-B del sol, camas solares)", "dos timinas contiguas se unen y forman un <b>dímero de timina</b>: la hélice se deforma y la polimerasa se equivoca al copiar; si no se repara (NER, T11) hay mutación y, con el tiempo, cáncer de piel"],
      ["<b>Físicos: radiaciones ionizantes</b>", "rayos X, rayos γ, partículas α y β, radiactividad (uranio, radón)", "tienen energía para <b>romper</b> enlaces: roturas de una o de las dos hebras, bases dañadas; provocan deleciones y translocaciones (mutaciones cromosómicas)"],
      ["<b>Químicos: análogos de bases</b>", "5-bromouracilo (parecido a la timina)", "se incorpora al ADN en lugar de la base normal y se aparea mal: provoca sustituciones al replicar"],
      ["<b>Químicos: modifican las bases</b>", "ácido nitroso, agentes alquilantes (gas mostaza, EMS)", "el ácido nitroso <b>desamina</b> la citosina en uracilo; los alquilantes añaden grupos metilo o etilo y la base se aparea mal: sustituciones"],
      ["<b>Químicos: intercalantes</b>", "bromuro de etidio, acridinas", "se meten entre los pares de bases y al replicar provocan <b>inserciones o deleciones</b>: cambio del marco de lectura"],
      ["<b>Químicos: de la vida diaria</b>", "benzopireno del humo del tabaco, aflatoxinas (hongos del cacahuete mal almacenado), nitrosaminas", "se transforman en el hígado en moléculas que se pegan a las bases del ADN: son <b>cancerígenos</b>"],
      ["<b>Biológicos</b>", "virus oncogénicos (VPH, hepatitis B), transposones («genes saltarines»)", "los virus pueden insertar su ADN en el del hospedador (alterando un gen) o producir proteínas que inactivan frenos del ciclo celular; los transposones, al saltar, pueden interrumpir genes"]
    ], "q3t") +
    "<p><b>Un dato histórico para recordar:</b> Hermann Muller demostró en 1927, con moscas <i>Drosophila</i>, que los <b>rayos X</b> aumentan mucho la tasa de mutación (premio Nobel de 1946). Y el <b>test de Ames</b> (años 70) usa bacterias <i>Salmonella</i> incapaces de fabricar el aminoácido histidina: se mira cuántas «reviven» (mutan de vuelta) al ponerlas con una sustancia; como casi todo cancerígeno es también mutágeno, sirve para detectar con rapidez posibles cancerígenos sin experimentar con animales.</p>" +
    "<h5>Mutación espontánea y reparación</h5>" +
    "<p>Aunque no haya agentes externos, el ADN cambia por sí solo: errores de replicación que escapan a la corrección, <b>tautomería</b> de las bases (una base cambia momentáneamente de forma y se aparea mal), <b>desaminación</b> de la citosina y <b>pérdida de bases</b> (depurinación). La célula dispone de los sistemas de <b>reparación</b> que estudiaste en el T11 (reparación de apareamientos, BER, NER…): cuando fallan, se acumulan mutaciones. Un ejemplo claro es el <b>xeroderma pigmentoso</b>, una enfermedad hereditaria en la que falla la reparación por escisión de nucleótidos: las personas afectadas tienen un riesgo enorme de cáncer de piel con muy poca luz solar.</p>" +
    ojo("La radiación <b>UV</b> (poca energía) forma dímeros de timina; la radiación <b>ionizante</b> (mucha energía) rompe el ADN. No es lo mismo ni produce las mismas mutaciones.")
  ) });

  nuevas.push({ h: "7. Mutación, evolución y cáncer", html: env(
    "<h5>Las mutaciones y la evolución</h5>" +
    "<p>La selección natural necesita variabilidad sobre la que actuar y la <b>mutación es su fuente última</b>: crea alelos nuevos (la recombinación solo los baraja). Casi todas las mutaciones son perjudiciales o neutras, pero de vez en cuando una resulta <b>ventajosa en un ambiente concreto</b> y se extiende en la población porque quienes la tienen dejan más descendientes. Tres ejemplos:</p>" +
    "<ul><li><b>Resistencia de las bacterias a los antibióticos</b>: una mutación al azar hace a una bacteria resistente; si hay antibiótico en el ambiente, solo sobreviven las resistentes y su descendencia lo hereda. El antibiótico <b>no provoca</b> la mutación: <b>selecciona</b> la que ya existía.</li>" +
    "<li><b>Anemia falciforme y malaria</b>: el heterocigoto (HbA/HbS) casi no tiene síntomas y es <b>más resistente a la malaria</b>. En zonas con mucha malaria el alelo HbS se mantiene en frecuencias altas a pesar de que el homocigoto HbS/HbS enferma gravemente (ventaja del heterocigoto).</li>" +
    "<li><b>Persistencia de la lactasa</b>: en la mayoría de los mamíferos la lactasa (que digiere la lactosa) se apaga tras el destete; en poblaciones humanas con tradición ganadera, mutaciones cerca del gen mantienen la lactasa activa en adultos.</li></ul>" +
    "<p>También las <b>duplicaciones</b> de genes y las <b>poliploidías</b> son motores evolutivos: una copia extra queda libre para cambiar sin dañar a la original. El tema 16 desarrolla la evolución; aquí quédate con la idea: <b>mutación → variabilidad → selección natural</b>.</p>" +
    "<h5>Las mutaciones y el cáncer</h5>" +
    "<p>El cáncer es una enfermedad de las <b>células somáticas</b> en la que una célula se divide sin control y acaba invadiendo otros tejidos (metástasis). Casi siempre es consecuencia de la <b>acumulación de varias mutaciones</b> (en muchos tumores, de 4 a 7 en genes clave) que desajustan el ciclo celular (T7). Dos clases de genes son los protagonistas:</p>" +
    tabla(["", "Protooncogenes → oncogenes", "Genes supresores de tumores"], [
      ["<b>Función normal</b>", "estimulan la división celular (el «acelerador»)", "frenan la división, reparan el ADN o provocan la muerte celular (el «freno»)"],
      ["<b>Mutación</b>", "<b>ganancia de función</b>: queda siempre activado (por ejemplo <i>RAS</i>, o BCR-ABL en el cromosoma Filadelfia)", "<b>pérdida de función</b>: el freno se rompe (por ejemplo <i>p53</i>, <i>BRCA1</i>, <i>BRCA2</i>, <i>RB</i>)"],
      ["<b>Alelos que hacen falta</b>", "basta <b>uno</b> mutado (efecto dominante)", "suelen hacer falta <b>los dos</b> mutados (efecto recesivo; hipótesis de los «dos golpes» de Knudson, 1971)"]
    ], "q3t") +
    "<p>La proteína <b>p53</b>, la «guardiana del genoma», detiene el ciclo si detecta ADN dañado y, si el daño no se puede reparar, provoca la muerte celular programada. Está mutada en más de la mitad de los tumores humanos. Heredar un alelo defectuoso de un gen supresor (como <i>BRCA1</i>) no es tener cáncer, pero deja a la persona «con un golpe ya dado» y le basta una mutación somática más para perder el segundo alelo: por eso hay formas <b>hereditarias</b> de cáncer. Con todo, la mayoría de los cánceres se deben a mutaciones <b>somáticas</b> que se acumulan con la edad y con la exposición a mutágenos (tabaco, UV, radiación): son <b>no hereditarios</b>.</p>" +
    ojo("Una mutación en una célula somática <b>no se hereda</b>, aunque cause un cáncer. Solo las mutaciones <b>germinales</b> pasan a la descendencia. Por eso la mayoría de los cánceres no son hereditarios.")
  ) });

  nuevas.push({ h: "8. Enzimas de restricción y ADN recombinante", html: env(
    "<h5>Las tijeras moleculares</h5>" +
    "<p>Las <b>enzimas de restricción</b> (o endonucleasas de restricción) cortan el ADN por <b>secuencias cortas y concretas</b> (sitios de restricción) de 4 a 8 pares de bases. Las bacterias las usan como <b>defensa</b>: cortan el ADN de los virus que las infectan (bacteriófagos), y protegen su propio ADN metilándolo en esos sitios. Werner Arber, Daniel Nathans y Hamilton Smith recibieron el Nobel en 1978 por descubrirlas y usarlas. Se nombran con la primera letra del género y dos de la especie: <b>EcoRI</b> viene de <i>Escherichia coli</i> RY13 (I = la primera enzima de esa cepa).</p>" +
    "<h5>Palíndromos y extremos</h5>" +
    "<p>Casi todos los sitios son <b>palíndromos</b> de ADN: la secuencia leída de 5′ a 3′ en una hebra es <b>idéntica</b> a la de la otra hebra leída también de 5′ a 3′. Por ejemplo, EcoRI reconoce:</p>" +
    "<div class='formula-wrap'><div class='formula'>5′-G↓A A T T C-3′<br>3′-C T T A A↑G-5′</div></div>" +
    "<p>Corta cada hebra entre G y A (↓). Como los cortes de las dos hebras están <b>desplazados</b>, quedan en los extremos unas «colas» de una hebra, de 4 nucleótidos (AATT), que pueden volver a aparearse con cualquier otro extremo cortado con la misma enzima: son <b>extremos cohesivos</b> («pegajosos»). Otras enzimas, como SmaI (CCC↓GGG), cortan las dos hebras en el mismo punto y dejan <b>extremos romos</b> (sin colas), que se unen peor.</p>" +
    tabla(["Enzima", "Sitio de corte", "Extremos", "Origen"], [
      ["<b>EcoRI</b>", "G↓AATTC", "cohesivos (5′, AATT)", "<i>Escherichia coli</i>"],
      ["<b>BamHI</b>", "G↓GATCC", "cohesivos (5′, GATC)", "<i>Bacillus amyloliquefaciens</i>"],
      ["<b>HindIII</b>", "A↓AGCTT", "cohesivos (5′, AGCT)", "<i>Haemophilus influenzae</i>"],
      ["<b>SmaI</b>", "CCC↓GGG", "romos", "<i>Serratia marcescens</i>"],
      ["<b>EcoRV</b>", "GAT↓ATC", "romos", "<i>Escherichia coli</i>"]
    ], "q3t") +
    "<p><b>¿Cada cuánto aparece un sitio?</b> Si las cuatro bases fueran igual de frecuentes y estuvieran repartidas al azar, un sitio de <i>n</i> pares de bases aparecería una vez cada 4<sup><i>n</i></sup> pares de bases: cada <b>256 pb</b> para una enzima de 4 pb, cada <b>4096 pb</b> para una de 6 pb (EcoRI) y cada <b>65 536 pb</b> para una de 8 pb. En un plásmido de 5000 pb esperarás, por tanto, pocos sitios de una enzima de 6 pb: justo lo que interesa para clonar.</p>" +
    "<h5>ADN recombinante</h5>" +
    "<p>Si cortas dos moléculas de ADN diferentes con <b>la misma enzima</b>, quedan extremos cohesivos complementarios: se aparean por puentes de hidrógeno y la <b>ADN ligasa</b> sella el enlace fosfodiéster. El resultado es una molécula nueva que mezcla ADN de dos orígenes: <b>ADN recombinante</b>.</p>" +
    "<ol><li>Cortar el ADN que contiene el gen y el vector con la misma enzima (por ejemplo, EcoRI).</li>" +
    "<li>Mezclar los dos: los extremos cohesivos se aparean.</li>" +
    "<li>Añadir ADN ligasa para sellar.</li></ol>" +
    ojo("Si cortas con <b>dos enzimas distintas</b> cuyos extremos no coinciden, los fragmentos no se pueden unir por los extremos cohesivos. Y la <b>ligasa no corta</b>: solo une. Las tijeras son las enzimas de restricción.") +
    "<h5>Electroforesis en gel: leer las bandas</h5>" +
    "<p>Para ver los fragmentos se usa la <b>electroforesis en gel de agarosa</b>: se ponen las muestras de ADN en unos pocillos de un gel, se aplica un campo eléctrico y, como el ADN tiene <b>carga negativa</b> (por los fosfatos), migra hacia el polo <b>positivo</b>. El gel actúa como una malla: los fragmentos <b>pequeños avanzan más</b> y los grandes se quedan cerca del pocillo. Se ve el ADN con un colorante fluorescente (bromuro de etidio o similares) y se compara con un <b>marcador de tamaños</b> (mezcla de fragmentos conocidos). Con ello se obtiene el tamaño de cada fragmento.</p>" +
    "<p>Las reglas para interpretar el gel, que se preguntan una y otra vez:</p>" +
    "<ul><li>Una molécula <b>lineal</b> con <i>n</i> sitios de corte da <b><i>n</i> + 1</b> fragmentos.</li>" +
    "<li>Una molécula <b>circular</b> (un plásmido) con <i>n</i> sitios da <b><i>n</i></b> fragmentos (con 1 solo corte se linealiza).</li>" +
    "<li>La <b>suma</b> de los tamaños de los fragmentos es igual al tamaño de la molécula entera.</li>" +
    "<li>Dos fragmentos del mismo tamaño forman <b>una sola banda</b>, más intensa.</li>" +
    "<li>Para localizar un sitio, se digiere con cada enzima por separado y con las dos a la vez, y se compara.</li></ul>" +
    w("bio_restriccion") +
    ejemplo("Cuántos fragmentos y de qué tamaño", "Un ADN lineal de 6000 pb tiene dos sitios EcoRI (cortes en las posiciones 1000 y 3000) y un sitio BamHI (corte en 2200). ¿Qué fragmentos salen con cada enzima por separado y con las dos?", [
      "<b>EcoRI</b> (cortes 1000 y 3000): 3 fragmentos: 1000 − 0 = <b>1000</b>; 3000 − 1000 = <b>2000</b>; 6000 − 3000 = <b>3000</b>. (Suma 6000.)",
      "<b>BamHI</b> (corte 2200): 2 fragmentos: <b>2200</b> y 6000 − 2200 = <b>3800</b>.",
      "<b>Las dos a la vez</b> (cortes 1000, 2200 y 3000): 4 fragmentos: <b>1000</b>, 2200 − 1000 = <b>1200</b>, 3000 − 2200 = <b>800</b> y <b>3000</b>. Suma 6000. El BamHI ha partido en 1200 + 800 el fragmento de 2000 de EcoRI.",
      "Si fuera <b>circular</b> y EcoRI cortara igual: 2 fragmentos, de 2000 (entre los dos cortes) y de 4000 (el resto, que pasa por el punto de unión)."
    ])
  ) });

  nuevas.push({ h: "9. Vectores, transformación y selección de recombinantes", html: env(
    "<h5>Vectores: los vehículos del ADN</h5>" +
    "<p>Un <b>vector de clonación</b> es una molécula de ADN capaz de <b>entrar</b> en una célula hospedadora y <b>replicarse</b> allí, a la que se puede pegar un gen. Un buen vector necesita:</p>" +
    "<ul><li>Un <b>origen de replicación</b> (<i>ori</i>) para copiarse dentro de la célula.</li>" +
    "<li>Un <b>sitio de clonaje múltiple</b> (polilinker): una zona con muchos sitios de restricción juntos, donde se inserta el gen.</li>" +
    "<li>Un <b>marcador de selección</b> (por ejemplo, un gen de resistencia a un antibiótico) para saber qué células lo han recibido.</li></ul>" +
    tabla(["Vector", "Qué es", "Para qué se usa"], [
      ["<b>Plásmido</b>", "ADN circular pequeño y extracromosómico de bacterias, con su propio <i>ori</i> y a menudo genes de resistencia", "el más usado; admite fragmentos de hasta ~10 kb (10 000 pb)"],
      ["<b>Bacteriófago λ</b>", "virus de bacterias modificado", "fragmentos de unas 15-20 kb; infecta con mucha eficacia"],
      ["<b>Cromosomas artificiales</b> (BAC, YAC)", "cromosomas bacterianos o de levadura modificados", "fragmentos enormes (100 kb a 1 Mb): proyecto Genoma Humano"],
      ["<b>Virus modificados</b> (retrovirus, adenovirus, AAV)", "virus «desarmados» sin los genes que enferman, con el gen terapéutico dentro", "<b>terapia génica</b> en células humanas"],
      ["<b>Plásmido Ti</b> de <i>Agrobacterium tumefaciens</i>", "una bacteria que de forma natural pasa parte de su ADN a las células vegetales", "obtener <b>plantas transgénicas</b>"]
    ], "q3t") +
    "<h5>Transformación: meter el ADN dentro</h5>" +
    "<p>Para que una bacteria acepte un plásmido hay que volverla «competente»: se tratan con calcio y se da un <b>choque térmico</b> (de 0 °C a 42 °C unos segundos), o se aplica un pulso eléctrico (<b>electroporación</b>). Solo una pequeña fracción de las bacterias capta un plásmido, y de esas, solo algunas llevan un plásmido <b>recombinante</b> (con el gen) y otras uno <b>recircularizado vacío</b>. Hay que <b>seleccionar</b> en dos pasos.</p>" +
    "<h5>Seleccionar: ampicilina y azul/blanco</h5>" +
    "<ol><li><b>Paso 1: ¿ha entrado un plásmido?</b> Se siembran las bacterias en una placa con <b>ampicilina</b>. El plásmido lleva un gen de resistencia a ampicilina (<i>amp<sup>R</sup></i>): solo crecen (y forman colonias) las bacterias que tienen un plásmido, recombinante o no.</li>" +
    "<li><b>Paso 2: ¿lleva el gen?</b> Muchos plásmidos (como pUC19) tienen el polilinker <b>dentro del gen <i>lacZ</i></b>, que fabrica β-galactosidasa. En una placa con el sustrato <b>X-gal</b>, la enzima lo rompe y produce un color <b>azul</b>. Si el gen se inserta en el polilinker, <b>interrumpe <i>lacZ</i></b>: no hay enzima y la colonia queda <b>blanca</b>. Así: <b>colonia azul = plásmido sin insertar; colonia blanca = recombinante</b>.</li></ol>" +
    "<p>Una vez hecho esto, las colonias blancas se cultivan en grandes cantidades: cada bacteria es un «clon» que lleva el gen y lo multiplica con cada división. Esa es la <b>clonación molecular</b> de un gen (otra cosa distinta de clonar un organismo entero, que verás en la sección 11).</p>" +
    ojo("Ampicilina: <b>selecciona las bacterias que tienen plásmido</b>. X-gal: distingue <b>dentro de esas</b> las que tienen el gen insertado (blancas) de las que no (azules). Es un error típico decir que las colonias azules son las recombinantes.") +
    "<h5>Genes de eucariotas en bacterias: ADNc</h5>" +
    "<p>Hay un problema: un gen de un eucariota tiene <b>intrones</b> (T12) y la bacteria <b>no sabe cortarlos</b>. Para que una bacteria fabrique una proteína humana, se parte del <b>ARNm maduro</b> (sin intrones) y se copia a ADN con la enzima <b>retrotranscriptasa</b> (transcriptasa inversa, que usan algunos virus como el VIH): se obtiene el <b>ADN complementario o ADNc</b>, que sí lleva solo los exones. Se puede clonar ese ADNc, o bien sintetizar el gen en el laboratorio.</p>" +
    "<h5>El ejemplo estrella: la insulina</h5>" +
    "<p>La insulina era antes extraída del páncreas de cerdos y vacas, con riesgos de alergia y poca cantidad. En 1978 se logró en <i>E. coli</i> el primer ADN recombinante comercializable: se insertan en un plásmido los genes de las cadenas A y B de la insulina humana, la bacteria las produce, se purifican y se unen. Hoy toda la insulina que se usa es recombinante, igual que la hormona de crecimiento, el factor VIII de la coagulación (hemofilia) o la vacuna de la hepatitis B (producida en levaduras).</p>"
  ) });

  B.parte.bio13a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
