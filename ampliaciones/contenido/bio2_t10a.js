/* ============================================================
   Biología II · ampliaciones · Tema 10: Genética mendeliana
   (parte A: teoría. Parte B, bio2_t10b.js: ficha, actividades, ejercicios, lámina y registro.)
   Widgets nuevos en ampliaciones/lab_bio_t10.js (bio_cruce, bio_abo, bio_xlig, bio_pedigri).
   Convenciones: dominancia completa A > a; alelos ABO I^A, I^B (codominantes) e i; daltonismo X^D / X^d; hemofilia X^H / X^h.
   Cada probabilidad la recalcula herramientas/verificar_bio2_t10.py con fracciones exactas.

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Vocabulario exacto: gen, alelo, locus, genotipo, fenotipo, homo/heterocigoto, línea pura → sección 1 + emparejar.
   2. Las tres leyes de Mendel con su enunciado y su proporción (todo Aa; 3:1; 9:3:3:1) → secciones 2–4 + widget bio_cruce.
   3. Cruce prueba (retrocruzamiento): para qué sirve y qué se espera (todos dominantes o 1:1) → sección 3 + ejercicios.
   4. Escribir bien gametos y cuadros de Punnett (dihíbrido de 16 casillas) → sección 4 + bio_cruce + orden.
   5. Probabilidades: regla del producto y de la suma, «hijo de padres portadores sano → 2/3 portador» → secciones 3 y 8.
   6. Dominancia intermedia frente a codominancia (y cómo distinguirlas por la proporción 1:2:1) → sección 5 + clasificar.
   7. Grupos sanguíneos ABO: genotipos, hijos posibles, imposibilidad de paternidad → sección 5 + widget bio_abo.
   8. Herencia ligada al X: daltonismo y hemofilia, portadoras, hijos e hijas → sección 5 + widget bio_xlig.
   9. Genes ligados y recombinación (Morgan): frecuencias de gametos y distancia en cM → sección nueva 6 + bio_cruce.
   10. Árboles genealógicos: deducir el tipo de herencia y los genotipos → sección nueva 7 + widget bio_pedigri.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t10/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Conceptos básicos
  secciones[0] = env(
    "<h5>Una analogía para empezar</h5>" +
    "<p>Piensa en un libro de recetas con dos ejemplares de cada receta: uno viene de tu madre y otro de tu padre. Cada <b>receta</b> es un <b>gen</b>; las dos copias pueden ser iguales o tener pequeñas diferencias (menos sal, más azúcar): esas versiones son los <b>alelos</b>. El plato que sale a la mesa es el <b>fenotipo</b>; la pareja de recetas que hay en el libro es el <b>genotipo</b>. Cuando las dos copias no coinciden, a veces manda una sola (alelo dominante) y a veces el resultado es una mezcla.</p>" +
    "<h5>Vocabulario que debes definir con exactitud</h5>" +
    tabla(["Término", "Definición", "Ejemplo"], [
      ["<b>Carácter</b>", "propiedad observable que se estudia", "color de la semilla"],
      ["<b>Gen</b>", "fragmento de ADN que lleva la información de un carácter", "gen del color de la semilla"],
      ["<b>Locus</b>", "posición del gen en el cromosoma", "el mismo locus en los dos homólogos"],
      ["<b>Alelo</b>", "cada una de las formas alternativas de un gen", "A (amarilla) y a (verde)"],
      ["<b>Genotipo</b>", "conjunto de alelos que tiene un individuo", "Aa"],
      ["<b>Fenotipo</b>", "manifestación del genotipo y del ambiente", "semilla amarilla"],
      ["<b>Homocigoto</b>", "dos alelos iguales", "AA (dominante) o aa (recesivo)"],
      ["<b>Heterocigoto</b>", "dos alelos distintos (híbrido)", "Aa"],
      ["<b>Línea pura</b>", "individuos homocigotos que, al cruzarse entre sí, solo dan hijos iguales", "AA × AA"],
      ["<b>Alelo dominante / recesivo</b>", "el dominante se expresa en heterocigosis; el recesivo, solo en homocigosis", "A domina sobre a"]
    ]) +
    "<h5>De dónde salen las dos copias</h5>" +
    "<p>Las células del cuerpo son <b>diploides</b> (2n): tienen parejas de <b>cromosomas homólogos</b>, uno de cada progenitor (Tema 7). Un gen ocupa el mismo lugar (locus) en los dos homólogos, y en cada uno puede haber un alelo distinto. Los gametos son <b>haploides</b> (n): llevan <b>un solo</b> cromosoma de cada pareja y, por tanto, un solo alelo de cada gen. Al unirse dos gametos en la fecundación se restablecen las dos copias. Esta es la clave de toda la genética mendeliana: <b>los alelos viajan en los cromosomas, y los cromosomas se reparten en la meiosis</b>.</p>" +
    "<h5>Cómo se escribe</h5>" +
    "<p>La letra mayúscula es el alelo dominante (A) y la minúscula el recesivo (a). Los genotipos se escriben con las dos letras juntas (AA, Aa, aa; en el heterocigoto, la mayúscula primero). Las generaciones se llaman <b>P</b> (parental), <b>F<sub>1</sub></b> (primera filial) y <b>F<sub>2</sub></b> (segunda filial). Los gametos se escriben solos (A, a), sin parejas.</p>" +
    ojo("<b>Fenotipo = genotipo + ambiente.</b> El genotipo marca las posibilidades, pero el ambiente influye: un mismo genotipo para la altura da personas más altas con mejor alimentación, y las hortensias cambian de color según la acidez del suelo. En los problemas de la PAU se supone que el ambiente no interviene.") +
    "<h5>Un poco de historia</h5>" +
    tabla(["Año", "Quién", "Qué aportó"], [
      ["1865–1866", "<b>Gregor Mendel</b> (1822–1884), monje agustino de Brno", "presenta y publica los cruzamientos con guisantes y deduce las leyes de la herencia, sin conocer los genes ni los cromosomas"],
      ["1900", "Correns, De Vries y Tschermak", "redescubren, cada uno por su lado, el trabajo de Mendel, que había pasado inadvertido 35 años"],
      ["1902–1903", "Sutton y Boveri", "proponen que los genes están en los cromosomas (teoría cromosómica de la herencia)"],
      ["1909", "Johannsen", "acuña las palabras «gen», «genotipo» y «fenotipo»"],
      ["1910–1913", "<b>Morgan</b> (1866–1945) y Sturtevant", "demuestran con la mosca <i>Drosophila</i> el ligamiento al sexo y la recombinación, y levantan el primer mapa genético"]
    ]) +
    "<p>Mendel eligió el <b>guisante</b> (<i>Pisum sativum</i>) por muy buenas razones: crece rápido, da muchas semillas, tiene razas puras fáciles de obtener, presenta caracteres con solo dos formas bien distintas (liso/rugoso, amarillo/verde, alto/enano…) y se puede <b>autofecundar</b> o cruzar a voluntad, quitando las anteras de unas flores y poniendo en ellas polen de otras. Contó los descendientes de más de 28.000 plantas durante ocho años; haber <b>contado</b> y haber sacado proporciones fue su gran novedad.</p>" +
    w("emparejar", "vocab"));

  // ---------------------------------------------------------------- 2. Primera ley
  secciones[1] = env(
    "<h5>El experimento y cómo se escribe</h5>" +
    "<p>Mendel cruzó una raza pura de semillas lisas con otra pura de semillas rugosas. Con dominancia completa (liso = A, rugoso = a), el cruce se escribe así:</p>" +
    "<div class='formula-wrap'><div class='formula'>P: AA × aa → gametos: A y a → F<sub>1</sub>: 100 % Aa (todas lisas)</div></div>" +
    "<p>Cada progenitor puro solo puede dar un tipo de gameto, así que el cuadro de Punnett tiene una única combinación: todos los hijos son <b>Aa</b>. El fenotipo del alelo recesivo (rugoso) <b>desaparece</b> en la F<sub>1</sub>, pero no se ha perdido: está «escondido» en los heterocigotos.</p>" +
    "<h5>El cuadro de Punnett, paso a paso</h5>" +
    "<p>(1) Escribe los genotipos de los progenitores. (2) Escribe los gametos que produce cada uno (un alelo de cada gen). (3) Pon los gametos de uno en las filas y los del otro en las columnas. (4) Cada casilla es un genotipo posible de hijo, y todas tienen la misma probabilidad si cada progenitor produce sus gametos en proporciones iguales. (5) Cuenta genotipos y fenotipos.</p>" +
    w("bio_cruce") +
    "<h5>Cruce recíproco</h5>" +
    "<p>Mendel comprobó que da igual qué raza pura aporta el polen y cuál los óvulos: los resultados son los mismos. Eso indica que el sexo del progenitor no importa para estos caracteres (están en cromosomas no sexuales, llamados <b>autosomas</b>). Cuando el resultado cambia según quién sea el padre y quién la madre, hay que sospechar de la herencia ligada al sexo (sección 5).</p>" +
    ejemplo("Semilla lisa × semilla rugosa", "En el guisante, la semilla lisa (A) domina sobre la rugosa (a). Se cruza una planta lisa de raza pura con una rugosa. ¿Cómo es la F<sub>1</sub>?", [
      "Genotipos de P: lisa pura = AA; rugosa = aa.",
      "Gametos: AA solo da A; aa solo da a.",
      "F<sub>1</sub>: todos Aa. Fenotipo: todos lisos (100 %). Uniformidad: todos iguales en genotipo y en fenotipo."
    ]) +
    ojo("<b>La primera ley solo es cierta para razas puras.</b> Si cruzas dos individuos que no son homocigotos, la descendencia no tiene por qué ser uniforme. Por eso en los problemas conviene comprobar primero si los progenitores son «de raza pura»."));

  // ---------------------------------------------------------------- 3. Segunda ley
  secciones[2] = env(
    "<h5>Los datos de Mendel</h5>" +
    "<p>Mendel dejó autofecundarse a las plantas Aa de la F<sub>1</sub>. En la F<sub>2</sub> contó <b>5.474 semillas lisas y 1.850 rugosas</b>: una proporción de 2,96 : 1, casi 3 : 1. El carácter recesivo, invisible en la F<sub>1</sub>, reaparecía en la cuarta parte de los nietos. Si los alelos se hubieran mezclado en la F<sub>1</sub> como un líquido, nunca habrían podido separarse de nuevo; la conclusión es que son <b>unidades que se conservan intactas</b> y se separan al formar los gametos.</p>" +
    "<h5>Por qué se separan: la meiosis</h5>" +
    "<p>En la meiosis, los cromosomas homólogos se separan en la anafase I (Tema 7), y cada gameto recibe uno de cada pareja. Un individuo Aa produce, por tanto, un 50 % de gametos A y un 50 % de gametos a. Mendel no conocía la meiosis, pero la <b>segunda ley</b> la describe: <b>los dos alelos de un gen se separan al formar los gametos, de modo que cada gameto lleva solo uno.</b></p>" +
    "<div class='formula-wrap'><div class='formula'>F<sub>1</sub>: Aa × Aa → gametos A, a × A, a → F<sub>2</sub>: ¼ AA : ½ Aa : ¼ aa (3 lisas : 1 rugosa)</div></div>" +
    "<p>Hay <b>dos</b> proporciones distintas en la F<sub>2</sub>, y hay que dar la que se pide: la <b>genotípica</b> (1 : 2 : 1) y la <b>fenotípica</b> (3 : 1). La confusión entre ellas es un clásico del examen.</p>" +
    "<h5>Cruce prueba o retrocruzamiento</h5>" +
    "<p>A simple vista, una planta lisa puede ser AA o Aa. Para averiguarlo se cruza con un <b>homocigoto recesivo (aa)</b>, que solo aporta gametos a y, por tanto, deja que se vea el alelo del otro progenitor:</p>" +
    tabla(["Planta lisa problema", "Cruce con aa", "Descendencia", "Conclusión"], [
      ["AA", "AA × aa", "100 % Aa (todas lisas)", "era homocigota"],
      ["Aa", "Aa × aa", "½ Aa (lisas) : ½ aa (rugosas)", "era heterocigota"]
    ]) +
    "<p>Basta con que aparezca <b>un solo</b> descendiente recesivo para saber que el problema era Aa. En cambio, para afirmar que es AA hace falta que no aparezca ninguno entre muchos descendientes.</p>" +
    "<p><i>Nota de vocabulario:</i> en sentido estricto, «retrocruzamiento» es cruzar un híbrido con uno de sus progenitores; el «cruce prueba» lo hace con el homocigoto recesivo. En los libros de 2.º de Bachillerato se usan como sinónimos para el cruce con aa, y así se usan en la PAU.</p>" +
    "<h5>Probabilidades: dos reglas y un cuidado</h5>" +
    tabla(["Regla", "Cuándo se usa", "Ejemplo (Aa × Aa)"], [
      ["<b>Producto</b>", "sucesos independientes que ocurren a la vez («y»)", "dos hijos seguidos aa: ¼ · ¼ = 1/16"],
      ["<b>Suma</b>", "sucesos que se excluyen entre sí («o»)", "hijo dominante: ¼ AA + ½ Aa = ¾"],
      ["<b>Complementario</b>", "«al menos uno»: 1 menos «ninguno»", "al menos un aa en 3 hijos: 1 − (¾)³ = 37/64"]
    ]) +
    ojo("<b>Los hijos no tienen memoria.</b> Aunque los tres primeros hijos de una pareja Aa × Aa hayan sido aa, la probabilidad de que el cuarto sea aa sigue siendo ¼. Cada fecundación es independiente: la proporción 3 : 1 solo se aprecia con muchos descendientes.") +
    "<h5>La probabilidad condicionada más típica</h5>" +
    "<p>Una persona sana cuyos padres son portadores (Aa × Aa) <b>no es Aa con probabilidad ½</b>: ya sabemos que no es aa, así que quedan 3 posibilidades (AA, Aa, Aa) y la probabilidad de ser portadora es <b>2/3</b>. Se razona siempre sobre las posibilidades que quedan. Esta idea reaparece en los árboles genealógicos (sección 7).</p>" +
    w("orden", "ordenmendel") +
    ejemplo("¿Qué fracción de las plantas lisas de la F<sub>2</sub> son heterocigotas?", "En una F<sub>2</sub> de guisantes hay 1200 plantas. ¿Cuántas son lisas y cuántas de ellas son heterocigotas?", [
      "Aa × Aa: ¾ lisas = 900; ¼ rugosas = 300.",
      "Entre las lisas, ¼ AA y ½ Aa del total: 300 AA y 600 Aa.",
      "Fracción de heterocigotas entre las lisas: 600 / 900 = <b>2/3</b>."
    ]));

  // ---------------------------------------------------------------- 4. Tercera ley
  secciones[3] = env(
    "<h5>El cruce dihíbrido</h5>" +
    "<p>Mendel cruzó razas puras que se diferenciaban en dos caracteres: semilla lisa y amarilla (AABB) con semilla rugosa y verde (aabb). La F<sub>1</sub> salió toda <b>AaBb</b> y toda lisa y amarilla (primera ley). Al autofecundarla obtuvo en la F<sub>2</sub>: <b>315 lisas amarillas, 108 lisas verdes, 101 rugosas amarillas y 32 rugosas verdes</b> (556 en total). Se parece muchísimo a 9 : 3 : 3 : 1, que daría 312,75 : 104,25 : 104,25 : 34,75.</p>" +
    "<p><b>Tercera ley:</b> los alelos de genes distintos se heredan de forma independiente, de modo que se combinan al azar en los gametos. Un AaBb produce cuatro gametos distintos, <b>AB, Ab, aB y ab, en igual proporción (¼ cada uno)</b>. El cuadro de Punnett tiene 4 × 4 = 16 casillas y da 9 : 3 : 3 : 1.</p>" +
    "<h5>Un atajo: multiplicar los monohíbridos</h5>" +
    "<p>Como los dos genes se heredan por separado, una probabilidad dihíbrida es el <b>producto</b> de las dos probabilidades monohíbridas. En AaBb × AaBb cada gen da ¾ de dominante y ¼ de recesivo:</p>" +
    tabla(["Fenotipo", "Cálculo", "Probabilidad"], [
      ["lisa amarilla (A_B_)", "¾ · ¾", "9/16"],
      ["lisa verde (A_bb)", "¾ · ¼", "3/16"],
      ["rugosa amarilla (aaB_)", "¼ · ¾", "3/16"],
      ["rugosa verde (aabb)", "¼ · ¼", "1/16"]
    ]) +
    "<p>Con genotipos pasa igual: P(AaBb) = ½ · ½ = ¼; P(AABB) = ¼ · ¼ = 1/16. Así no hace falta dibujar 16 casillas, y el atajo funciona con tres o más genes.</p>" +
    "<h5>Cuántos hay de cada cosa</h5>" +
    "<p>Si cruzas dos individuos heterocigotos para <b>n</b> genes independientes (por ejemplo AaBbCc × AaBbCc), con dominancia completa:</p>" +
    tabla(["n genes", "Gametos distintos", "Casillas del cuadro", "Genotipos distintos", "Fenotipos distintos"], [
      ["1 (Aa)", "2", "4", "3", "2"],
      ["2 (AaBb)", "4", "16", "9", "4"],
      ["3 (AaBbCc)", "8", "64", "27", "8"],
      ["n", "2ⁿ", "4ⁿ", "3ⁿ", "2ⁿ"]
    ]) +
    "<p>Para tres genes, la probabilidad de la clase completamente dominante es (¾)³ = 27/64 y la de la completamente recesiva, (¼)³ = 1/64.</p>" +
    "<h5>Cruce prueba del dihíbrido</h5>" +
    "<p>Si cruzas un AaBb con un doble recesivo <b>aabb</b>, este último solo aporta gametos ab, así que cada gameto del AaBb se «ve» directamente en el hijo: aparecen las cuatro clases en la proporción <b>1 : 1 : 1 : 1</b>. Si no sale esa proporción, los genes no son independientes (sección 6).</p>" +
    "<h5>La base cromosómica</h5>" +
    "<p>La tercera ley es una consecuencia de la meiosis: en la metafase I, cada pareja de homólogos se orienta al azar respecto al polo, <b>independientemente de las demás parejas</b> (orientación independiente). Pero solo es válida si los genes están en cromosomas distintos, o muy alejados en el mismo cromosoma.</p>" +
    ejemplo("¿Qué proporción de la F<sub>2</sub> de un dihíbrido es lisa y heterocigota para el color?", "En AaBb × AaBb, ¿qué probabilidad hay de que un hijo sea de semilla lisa (A_) y heterocigoto Bb?", [
      "Los genes son independientes: se multiplican.",
      "P(A_) = ¾. P(Bb) = ½.",
      "P = ¾ · ½ = <b>3/8</b> (6 de las 16 casillas)."
    ]) +
    ojo("<b>La pregunta decide la respuesta.</b> «¿Cuántos fenotipos distintos?» (4), «¿cuántos genotipos distintos?» (9) y «¿qué proporción fenotípica?» (9 : 3 : 3 : 1) son tres preguntas distintas sobre el mismo cuadro."));

  // ---------------------------------------------------------------- 5. Excepciones y extensiones
  secciones[4] = env(
    "<h5>Dominancia intermedia (incompleta)</h5>" +
    "<p>El heterocigoto tiene un fenotipo <b>intermedio</b> entre los dos homocigotos. Ejemplo clásico: el dondiego de noche (<i>Mirabilis jalapa</i>). Con C<sup>R</sup> (rojo) y C<sup>B</sup> (blanco):</p>" +
    "<div class='formula-wrap'><div class='formula'>P: C<sup>R</sup>C<sup>R</sup> (roja) × C<sup>B</sup>C<sup>B</sup> (blanca) → F<sub>1</sub>: todas C<sup>R</sup>C<sup>B</sup> (rosas) → F<sub>2</sub>: ¼ roja : ½ rosa : ¼ blanca</div></div>" +
    "<p>La F<sub>1</sub> sigue siendo uniforme (primera ley), pero en la F<sub>2</sub> la proporción fenotípica es <b>1 : 2 : 1</b>, igual que la genotípica: cada genotipo tiene su propio fenotipo. Esto es una pista muy útil en los problemas: <b>si en la descendencia salen tres fenotipos en proporción 1 : 2 : 1, hay dominancia intermedia o codominancia</b>.</p>" +
    "<p>No es que los alelos «se mezclen» para siempre: en el gameto vuelven a separarse, y de dos plantas rosas salen otra vez rojas y blancas.</p>" +
    "<h5>Codominancia</h5>" +
    "<p>En el heterocigoto se expresan <b>los dos alelos a la vez</b>, cada uno con su efecto, sin mezclarse. En el ganado, el alelo rojo (C<sup>R</sup>) y el blanco (C<sup>B</sup>) dan en el heterocigoto el «ruano»: pelos rojos <b>y</b> pelos blancos juntos, no un color intermedio. Otro ejemplo: el grupo sanguíneo AB, en el que en la misma célula hay los dos antígenos (A y B).</p>" +
    tabla(["", "Dominancia completa", "Dominancia intermedia", "Codominancia"], [
      ["<b>Heterocigoto</b>", "igual que el homocigoto dominante", "fenotipo intermedio (nuevo)", "los dos fenotipos a la vez"],
      ["<b>Ejemplo</b>", "guisante liso/rugoso", "dondiego rojo/blanco → rosa", "ganado ruano; grupo AB"],
      ["<b>F<sub>2</sub> (fenotipos)</b>", "3 : 1", "1 : 2 : 1", "1 : 2 : 1"]
    ]) +
    "<h5>Alelismo múltiple y grupos sanguíneos ABO</h5>" +
    "<p>Un gen puede tener <b>más de dos alelos en la población</b>, aunque cada persona solo tiene dos. El ejemplo más importante es el grupo sanguíneo ABO (descubierto por Landsteiner en 1901). El gen tiene tres alelos: <b>I<sup>A</sup></b> (fabrica el antígeno A en la superficie de los glóbulos rojos), <b>I<sup>B</sup></b> (antígeno B) e <b>i</b> (no fabrica ninguno). I<sup>A</sup> e I<sup>B</sup> son <b>codominantes</b> entre sí, y los dos dominan sobre i.</p>" +
    tabla(["Grupo", "Genotipos posibles", "Antígenos en los glóbulos rojos", "Anticuerpos en el plasma", "Puede recibir sangre de"], [
      ["<b>A</b>", "I<sup>A</sup>I<sup>A</sup>, I<sup>A</sup>i", "A", "anti-B", "A y O"],
      ["<b>B</b>", "I<sup>B</sup>I<sup>B</sup>, I<sup>B</sup>i", "B", "anti-A", "B y O"],
      ["<b>AB</b>", "I<sup>A</sup>I<sup>B</sup>", "A y B", "ninguno", "A, B, AB y O (receptor universal)"],
      ["<b>O</b>", "ii", "ninguno", "anti-A y anti-B", "solo O (donante universal)"]
    ]) +
    "<p>Si se transfunde sangre con un antígeno que el receptor no tiene, sus anticuerpos aglutinan los glóbulos rojos y puede haber una reacción grave. Por eso el grupo O (sin antígenos) es el donante universal y el AB (sin anticuerpos) el receptor universal.</p>" +
    w("bio_abo") +
    "<p>Dos reglas útiles: un hijo del grupo <b>O</b> (ii) ha recibido una i de cada progenitor, así que ambos tienen al menos una i; y una pareja <b>AB × O</b> solo puede tener hijos A o B, nunca AB ni O.</p>" +
    "<p><b>El factor Rh</b> es otro gen distinto: Rh<sup>+</sup> domina sobre Rh<sup>−</sup>. Si una madre Rh<sup>−</sup> tiene un hijo Rh<sup>+</sup>, puede fabricar anticuerpos anti-Rh que, en un embarazo posterior con otro hijo Rh<sup>+</sup>, atraviesan la placenta y destruyen sus glóbulos rojos (eritroblastosis fetal). Se previene con una inyección de anticuerpos a la madre.</p>" +
    "<h5>Alelos letales</h5>" +
    "<p>Algunos alelos, en homocigosis, causan la muerte antes del nacimiento. En el ratón, el color amarillo es dominante, pero el homocigoto amarillo no sobrevive: Aa × Aa da ¼ AA (muere) : ½ Aa (amarillos) : ¼ aa (grises), es decir, entre los nacidos <b>2 amarillos : 1 gris</b> en lugar de 3 : 1. Una proporción de 2 : 1 en la descendencia es la señal de un alelo letal.</p>" +
    "<h5>Herencia ligada al sexo</h5>" +
    "<p>En los humanos, las mujeres son XX y los varones XY. El cromosoma X es grande y lleva muchísimos genes; el Y es pequeño y casi no tiene los mismos genes. Los genes del X <b>sin equivalente en el Y</b> se llaman ligados al sexo (o al cromosoma X). Morgan (1910) los descubrió en <i>Drosophila</i>: el carácter «ojos blancos» se heredaba de forma distinta en machos y hembras. Como el varón tiene un solo X, <b>cualquier alelo de ese X se manifiesta</b>, sea dominante o recesivo; se dice que es <b>hemicigoto</b>.</p>" +
    tabla(["", "Mujer (XX)", "Varón (XY)"], [
      ["<b>Genotipos posibles (daltonismo)</b>", "X<sup>D</sup>X<sup>D</sup> (sana), X<sup>D</sup>X<sup>d</sup> (sana portadora), X<sup>d</sup>X<sup>d</sup> (daltónica)", "X<sup>D</sup>Y (sano), X<sup>d</sup>Y (daltónico)"],
      ["<b>Cuántos alelos tiene</b>", "dos", "uno (hemicigoto)"],
      ["<b>Transmite</b>", "uno de sus dos X a cada hijo, al azar", "su X a todas las hijas y su Y a todos los hijos"]
    ]) +
    "<p>Reglas que se derivan y que sirven para razonar sin hacer cuadros:</p>" +
    "<ul><li>Un <b>varón</b> recibe su X <b>de la madre</b> y la Y del padre; por eso nunca hereda este tipo de carácter de su padre.</li>" +
    "<li>Una <b>hija</b> recibe un X de cada progenitor; para ser afectada necesita un padre afectado y una madre afectada o portadora.</li>" +
    "<li>Un <b>varón afectado</b> transmite el alelo a <b>todas</b> sus hijas (que serán portadoras si la madre es sana) y a ninguno de sus hijos.</li>" +
    "<li>Una <b>mujer portadora</b> es fenotípicamente sana, pero transmite el alelo al 50 % de sus hijos (que, si son varones, estarán afectados).</li>" +
    "<li>Una <b>mujer afectada</b> (X<sup>d</sup>X<sup>d</sup>) tiene a <b>todos</b> sus hijos varones afectados.</li></ul>" +
    w("bio_xlig") +
    "<p>El <b>daltonismo</b> (confusión de rojo y verde) afecta a cerca del 8 % de los varones y a menos del 1 % de las mujeres; el <b>alelo</b> es recesivo y está en el X. La <b>hemofilia</b> (la sangre coagula mal por falta de un factor de coagulación) es también recesiva y ligada al X: muy rara en mujeres y más frecuente en varones. La reina Victoria de Inglaterra (1819–1901) fue portadora de hemofilia y la extendió a varias casas reales europeas; el zarévich ruso Alexis, hijo de Nicolás II, fue hemofílico.</p>" +
    ojo("<b>Si un problema dice «ligado al sexo», los varones se escriben X<sup>D</sup>Y o X<sup>d</sup>Y, nunca «Dd».</b> Y recuerda que en el cuadro de Punnett los gametos del padre son X<sup>?</sup> e Y, y que Y no lleva alelo del gen.") +
    "<p>Hay también genes en el cromosoma Y (herencia holándrica), como el que determina el desarrollo de los testículos: pasan de padre a todos sus hijos varones y a ninguna hija.</p>" +
    w("clasificar", "tipos"));

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "6. Genes ligados y recombinación", html: env(
    "<p>La tercera ley exige que los genes estén en cromosomas distintos. Pero el ser humano tiene unos 20.000 genes y solo 23 pares de cromosomas, así que muchísimos genes comparten cromosoma. Los genes que están en el <b>mismo cromosoma</b> se llaman <b>genes ligados</b>, y se heredan juntos, como un solo bloque, mientras no haya <b>entrecruzamiento</b>.</p>" +
    "<h5>Cis, trans y recombinación</h5>" +
    "<p>Un doble heterocigoto AaBb puede tener los alelos dispuestos de dos formas: en <b>cis</b> (AB / ab: los dos dominantes en el mismo cromosoma) o en <b>trans</b> (Ab / aB: uno dominante y uno recesivo en cada cromosoma). Los gametos con la combinación que ya tenían los cromosomas se llaman <b>parentales</b>; los nuevos, <b>recombinantes</b>. Los recombinantes aparecen por el <b>entrecruzamiento</b> (crossing-over) de la profase I (Tema 7): dos cromátidas de homólogos intercambian un trozo, y los alelos se reordenan. Cuanto más lejos están dos genes, más probable es que el entrecruzamiento ocurra entre ellos.</p>" +
    "<div class='formula-wrap'><div class='formula'>r = recombinantes / total de descendientes · 100</div></div>" +
    "<p>Si la frecuencia de recombinación es r, el doble heterocigoto en cis produce los gametos <b>AB y ab con frecuencia (100 − r)/2 % cada uno</b> (parentales) y <b>Ab y aB con r/2 % cada uno</b> (recombinantes). Con un cruce prueba con aabb, los hijos son directamente esas cuatro clases. El valor <b>máximo</b> de r es 50 %, que es lo mismo que si los genes fueran independientes: cuatro clases iguales (1 : 1 : 1 : 1).</p>" +
    w("bio_cruce") +
    "<h5>Mapas genéticos</h5>" +
    "<p>Sturtevant (1913), alumno de Morgan, tuvo la idea de que la frecuencia de recombinación mide la <b>distancia</b> entre genes: <b>1 % de recombinación = 1 centimorgan (cM)</b>. Con las distancias entre tres genes se deduce el orden: el gen del medio es el que está a menor distancia de los otros dos, y la distancia entre los extremos es la suma de las otras dos (si son pequeñas).</p>" +
    ejemplo("Datos de Morgan: color del cuerpo y forma de las alas de Drosophila", "Morgan cruzó hembras dobles heterocigotas (cuerpo gris y alas normales) con machos de cuerpo negro y alas vestigiales (doble recesivo), y obtuvo: 965 grises-normales, 944 negras-vestigiales, 206 grises-vestigiales y 185 negras-normales. Calcula la frecuencia de recombinación y la distancia.", [
      "Total = 965 + 944 + 206 + 185 = 2300 moscas.",
      "Las clases más abundantes (965 y 944) son las parentales: los genes están <b>ligados</b>, y la hembra era AB / ab (cis).",
      "Las recombinantes son 206 + 185 = 391 moscas.",
      "r = 391 / 2300 = 0,17 → <b>17 %</b>: los genes están a <b>17 cM</b>."
    ]) +
    ejemplo("Cruce prueba con ligamiento", "Un doble heterocigoto AB / ab con r = 20 % se cruza con aabb. Si nacen 1000 descendientes, ¿cuántos son de cada clase?", [
      "Parentales: (100 − 20)/2 = 40 % cada una → AB: 400 y ab: 400.",
      "Recombinantes: 20/2 = 10 % cada una → Ab: 100 y aB: 100.",
      "Comprobación: 400 + 400 + 100 + 100 = 1000."
    ]) +
    tabla(["", "Genes independientes", "Genes ligados"], [
      ["<b>Dónde están</b>", "cromosomas distintos (o muy lejos)", "mismo cromosoma, próximos"],
      ["<b>Gametos del AaBb</b>", "AB, Ab, aB, ab al 25 % cada uno", "parentales más abundantes que recombinantes"],
      ["<b>Cruce prueba</b>", "1 : 1 : 1 : 1", "dos clases grandes y dos pequeñas"],
      ["<b>r</b>", "50 %", "menor de 50 %"]
    ]) +
    ojo("<b>Los gametos, no los hijos, tienen las frecuencias.</b> Un cruce prueba es útil justo porque cada hijo refleja un solo gameto del doble heterocigoto. En un cruce AaBb × AaBb con genes ligados, las proporciones fenotípicas se obtienen multiplicando las frecuencias de los gametos de cada progenitor.")) });

  nuevas.push({ h: "7. Árboles genealógicos (pedigríes)", html: env(
    "<p>Un <b>árbol genealógico</b> o pedigrí representa a una familia a lo largo de varias generaciones y sirve para deducir cómo se hereda un carácter, sobre todo en humanos, donde no se pueden hacer cruces a voluntad.</p>" +
    tabla(["Símbolo", "Significa"], [
      ["□ cuadrado", "varón"],
      ["○ círculo", "mujer"],
      ["■ ● relleno", "individuo afectado (con el carácter que se estudia)"],
      ["línea horizontal entre dos símbolos", "pareja"],
      ["línea vertical hacia abajo", "hijos de esa pareja"],
      ["I, II, III… y 1, 2, 3…", "generación y número dentro de ella (II-3 = tercera persona de la segunda generación)"]
    ]) +
    "<h5>Cómo deducir el tipo de herencia</h5>" +
    tabla(["Pista en el árbol", "Conclusión"], [
      ["Dos progenitores <b>sanos</b> tienen un hijo <b>afectado</b>", "<b>recesivo</b> (los dos son portadores)"],
      ["Todo afectado tiene un progenitor afectado; no se salta generaciones", "<b>dominante</b>"],
      ["Dos progenitores afectados tienen un hijo sano", "<b>dominante</b> (los dos son Aa)"],
      ["Una <b>hija afectada</b> con padre sano", "<b>no</b> es recesivo ligado al X (sería necesario un padre afectado)"],
      ["Afecta casi solo a varones; los afectados son hijos de madres sanas; nunca pasa de padre a hijo varón", "<b>recesivo ligado al X</b>"],
      ["Un varón afectado tiene todas sus hijas portadoras o afectadas", "ligado al X"]
    ]) +
    "<p>Después de decidir el tipo de herencia, se asigna a cada persona su genotipo: los afectados de un recesivo son <b>aa</b> (o X<sup>d</sup>X<sup>d</sup> / X<sup>d</sup>Y); un sano con un hijo afectado, <b>portador</b>; y los sanos sin más información, «A_» (AA o Aa) con probabilidades 1/3 y 2/3 si sus padres eran portadores.</p>" +
    w("bio_pedigri") +
    w("clasificar", "herencias") +
    "<h5>Probabilidades en un árbol</h5>" +
    ejemplo("Dos personas sanas, hijas de portadores", "Una pareja está formada por dos personas sanas, cada una hija de una pareja Aa × Aa (con un carácter recesivo). ¿Qué probabilidad hay de que su primer hijo esté afectado?", [
      "Cada persona sana es Aa con probabilidad 2/3 (descartado aa).",
      "Para que el hijo sea aa, <b>ambas</b> deben ser Aa: 2/3 · 2/3 = 4/9.",
      "Si ambas son Aa, el hijo es aa con probabilidad 1/4.",
      "P = 4/9 · 1/4 = <b>1/9</b>."
    ]) +
    ojo("<b>Si ya tienen un hijo afectado, la historia cambia.</b> Entonces los dos progenitores son seguro Aa (el hijo aa recibió una a de cada uno), y la probabilidad de que el siguiente hijo sea aa pasa a ser ¼. No arrastres 2/3 cuando ya sabes que son portadores.")) });

  nuevas.push({ h: "8. Cómo resolver un problema de genética", html: env(
    "<p>Los problemas de genética aparecen casi todos los años en la PAU de Madrid, y son de los más fáciles de ganar con un método fijo. Estos son los pasos:</p>" +
    "<ol><li><b>Lee el enunciado y anota los caracteres</b> y quién es dominante, recesivo, intermedio o codominante. Si no lo dicen, se deduce de la proporción (3 : 1 → dominancia completa; 1 : 2 : 1 → intermedia o codominancia).</li>" +
    "<li><b>Asigna letras</b>: mayúscula al dominante, minúscula al recesivo; para ABO, I<sup>A</sup>, I<sup>B</sup>, i; para el sexo, X e Y.</li>" +
    "<li><b>Escribe los genotipos de los progenitores.</b> Un recesivo es siempre homocigoto; un dominante puede ser A_ (hasta que se demuestre lo contrario).</li>" +
    "<li><b>Escribe los gametos</b> de cada uno (2ⁿ si es heterocigoto para n genes).</li>" +
    "<li><b>Haz el cuadro de Punnett</b> (o multiplica probabilidades si hay más de dos genes).</li>" +
    "<li><b>Cuenta y responde exactamente lo que se pide</b>: proporción genotípica, fenotípica, probabilidad de un hijo concreto, número esperado de descendientes…</li>" +
    "<li><b>Comprueba</b> que las probabilidades suman 1.</li></ol>" +
    w("orden", "ordenmetodo") +
    "<h5>Problemas típicos y su respuesta</h5>" +
    tabla(["Si el problema dice…", "Piensa en…"], [
      ["«Raza pura» o «homocigoto»", "AA o aa: solo un tipo de gameto"],
      ["«Cruce prueba» o «con un homocigoto recesivo»", "el otro progenitor es aa; la descendencia revela sus gametos"],
      ["«Proporción 3 : 1»", "Aa × Aa con dominancia completa"],
      ["«Proporción 1 : 1»", "Aa × aa (o un cruce con un homocigoto distinto)"],
      ["«Proporción 1 : 2 : 1»", "intermedia o codominancia con Aa × Aa; o genotípica de Aa × Aa"],
      ["«Proporción 9 : 3 : 3 : 1»", "dihíbrido AaBb × AaBb, genes independientes"],
      ["«2 : 1» en la descendencia", "alelo letal en homocigosis"],
      ["«Hombre» y un carácter raro ligado al sexo", "X<sup>d</sup>Y: no tiene gen en el Y"],
      ["«Portadora»", "heterocigota sana (X<sup>D</sup>X<sup>d</sup>)"]
    ]) +
    "<h5>Cuántos de n hijos: el factor combinatorio</h5>" +
    "<p>Si quieres saber la probabilidad de que, de <b>n</b> hijos, exactamente <b>k</b> sean de un tipo con probabilidad p, el orden no importa: se multiplica por el número de formas de ordenarlos. Para Aa × Aa y 4 hijos, <b>exactamente uno aa</b>: hay 4 posiciones posibles, y cada una tiene probabilidad (¼)·(¾)³. P = 4 · ¼ · 27/64 = 108/256 = <b>27/64</b>.</p>" +
    "<p>Si en cambio se pide un orden concreto (el primero aa y los otros tres dominantes), no se multiplica por 4: P = ¼ · (¾)³ = 27/256.</p>" +
    ejemplo("Un dihíbrido con las preguntas más típicas", "Se cruzan dos plantas AaBb (A: lisa; B: amarilla; independientes). ¿Probabilidad de que un hijo sea (a) AABb, (b) rugoso y amarillo, (c) idéntico a sus padres en genotipo?", [
      "(a) P(AA) = ¼ y P(Bb) = ½ → ¼ · ½ = <b>1/8</b>.",
      "(b) rugoso (aa) ¼ y amarillo (B_) ¾ → ¼ · ¾ = <b>3/16</b>.",
      "(c) P(AaBb) = ½ · ½ = <b>1/4</b>."
    ]) +
    ejemplo("Dominancia intermedia", "En el dondiego de noche se cruzan dos plantas rosas. ¿Qué proporción de las hijas es roja, rosa y blanca? Si se cruzan una rosa y una blanca, ¿y entonces?", [
      "Rosa × rosa = C<sup>R</sup>C<sup>B</sup> × C<sup>R</sup>C<sup>B</sup> → ¼ roja : ½ rosa : ¼ blanca.",
      "Rosa × blanca = C<sup>R</sup>C<sup>B</sup> × C<sup>B</sup>C<sup>B</sup> → ½ rosa : ½ blanca (y ninguna roja)."
    ]) +
    "<h5>Errores que cuestan puntos</h5>" +
    "<ul><li>Escribir gametos con dos letras del mismo gen (AA) en lugar de una (A).</li>" +
    "<li>Dar la proporción genotípica cuando piden la fenotípica (1 : 2 : 1 en lugar de 3 : 1).</li>" +
    "<li>Pensar que un individuo de fenotipo dominante es AA «porque es de la F<sub>1</sub>»: puede ser Aa.</li>" +
    "<li>Olvidar que el cromosoma Y no lleva el gen cuando es ligado al X.</li>" +
    "<li>Sumar probabilidades de sucesos independientes que ocurren a la vez (hay que multiplicar).</li>" +
    "<li>Decir «el 25 % de los hijos» cuando la pregunta es «de los hijos varones» (cambia la base).</li></ul>") });

  nuevas.push({ h: "9. Ejemplos PAU resueltos", html: env(
    ejemplo("Grupos sanguíneos: ¿quién puede ser el padre?", "Una mujer del grupo A tiene un hijo del grupo O. (a) Indica el genotipo de la madre. (b) ¿Qué grupos puede tener el padre? (c) Si el padre es del grupo B heterocigoto, ¿qué probabilidad hay de que el siguiente hijo sea del grupo O?", [
      "<b>(a)</b> El hijo es ii: recibió una i de la madre. La madre es del grupo A, luego es <b>I<sup>A</sup>i</b>.",
      "<b>(b)</b> El padre también aportó una i, así que tiene al menos una i: puede ser <b>A (I<sup>A</sup>i), B (I<sup>B</sup>i) u O (ii)</b>. No puede ser AB ni I<sup>A</sup>I<sup>A</sup> ni I<sup>B</sup>I<sup>B</sup>.",
      "<b>(c)</b> I<sup>A</sup>i × I<sup>B</sup>i → ¼ I<sup>A</sup>I<sup>B</sup> (AB), ¼ I<sup>A</sup>i (A), ¼ I<sup>B</sup>i (B), ¼ ii (O). P(O) = <b>1/4</b>."
    ]) +
    ejemplo("Daltonismo", "Una mujer de visión normal cuyo padre era daltónico se casa con un hombre de visión normal. (a) Genotipos de la pareja. (b) Probabilidad de que tengan un hijo varón daltónico y (c) de que una hija sea daltónica.", [
      "<b>(a)</b> El padre de ella era X<sup>d</sup>Y y le dio su X<sup>d</sup>; ella es sana, luego es <b>X<sup>D</sup>X<sup>d</sup></b> (portadora). Él es <b>X<sup>D</sup>Y</b>.",
      "Cruce: X<sup>D</sup>X<sup>d</sup> × X<sup>D</sup>Y → ¼ X<sup>D</sup>X<sup>D</sup> (hija sana), ¼ X<sup>D</sup>X<sup>d</sup> (hija portadora), ¼ X<sup>D</sup>Y (hijo sano), ¼ X<sup>d</sup>Y (hijo daltónico).",
      "<b>(b)</b> Un hijo (de cualquier sexo) es varón y daltónico con probabilidad <b>1/4</b>; si se sabe que es varón, <b>1/2</b>.",
      "<b>(c)</b> Ninguna hija es daltónica: <b>0</b>, porque recibe un X<sup>D</sup> del padre. La mitad de las hijas serán portadoras."
    ]) +
    ejemplo("Descubrir un genotipo con un cruce prueba dihíbrido", "Una planta de flor roja y tallo alto se cruza con una de flor blanca y tallo enano (doble recesivo). Se obtienen 25 % rojas altas, 25 % rojas enanas, 25 % blancas altas y 25 % blancas enanas. ¿Qué genotipo tiene la planta de flores rojas y altas?", [
      "Los dos recesivos son aabb y solo dan gametos ab, así que los hijos muestran los gametos de la otra planta.",
      "Salen 4 gametos en proporción 1 : 1 : 1 : 1 (AB, Ab, aB y ab): la planta era un <b>doble heterocigoto AaBb</b> con los genes independientes.",
      "Si no hubiera salido 1 : 1 : 1 : 1, habría que pensar en ligamiento (sección 6)."
    ]) +
    ejemplo("Un árbol genealógico", "Un carácter recesivo aparece en la hija II-1 de dos personas sanas (I-1 e I-2). El hermano sano II-2 tiene una pareja portadora (Aa). (a) ¿Autosómico o ligado al X? (b) ¿Genotipo de I-1 e I-2? (c) ¿Probabilidad de que un hijo de II-2 y su pareja esté afectado?", [
      "<b>(a)</b> Dos padres sanos con una hija afectada: recesivo, y <b>autosómico</b> (si fuera ligado al X, un padre sano no podría tener una hija X<sup>d</sup>X<sup>d</sup>).",
      "<b>(b)</b> Los dos son <b>Aa</b> (cada uno dio una a a la hija).",
      "<b>(c)</b> II-2 es sano, hijo de Aa × Aa: es Aa con probabilidad 2/3. P(hijo aa) = 2/3 (II-2 es Aa) · 1 (la pareja es Aa) · ¼ = <b>1/6</b>."
    ]) +
    ejemplo("Ligamiento: ¿independientes o ligados?", "En un cruce prueba AaBb × aabb salen 450 AaBb, 460 aabb, 45 Aabb y 45 aaBb (1000 en total). ¿Son independientes los dos genes? ¿Cuánto distan?", [
      "Si fueran independientes saldría 1 : 1 : 1 : 1 (250 de cada). No es así: dos clases son mucho más abundantes.",
      "Los dos genes están <b>ligados</b>; los parentales son AaBb y aabb (cis).",
      "Recombinantes: 45 + 45 = 90 → r = 90/1000 = 9 % → <b>9 cM</b>."
    ])) });

  nuevas.push({ h: "10. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<p>La genética mendeliana se pregunta casi siempre en forma de <b>problema</b> con una pequeña parte de teoría. Algunas formas de enunciado muy frecuentes, y la respuesta con la que se puntúa:</p>" +
    ejemplo("Pregunta 1. Enuncia las leyes de Mendel", "Respuesta modelo:", [
      "<b>1.ª ley (uniformidad):</b> al cruzar dos razas puras que difieren en un carácter, toda la F<sub>1</sub> es igual (Aa).",
      "<b>2.ª ley (segregación):</b> los dos alelos de un gen se separan al formar los gametos; en la F<sub>2</sub> reaparece el recesivo (3 : 1).",
      "<b>3.ª ley (transmisión independiente):</b> los alelos de genes distintos se heredan de forma independiente; el dihíbrido da 9 : 3 : 3 : 1 (genes en cromosomas distintos).",
      "<b>Base:</b> los alelos están en cromosomas homólogos que se separan en la meiosis."
    ]) +
    ejemplo("Pregunta 2. Define y pon un ejemplo", "Define dominancia intermedia y codominancia.", [
      "<b>Dominancia intermedia:</b> el heterocigoto presenta un fenotipo intermedio entre los dos homocigotos. Ejemplo: dondiego rojo × blanco → rosa.",
      "<b>Codominancia:</b> el heterocigoto expresa a la vez los dos alelos. Ejemplo: grupo sanguíneo AB (I<sup>A</sup>I<sup>B</sup>)."
    ]) +
    ejemplo("Pregunta 3. Un problema con razonamiento", "Respuesta modelo con la plantilla de la sección 8:", [
      "Letras y genotipos de los progenitores (justificando los de los recesivos).",
      "Gametos de cada progenitor.",
      "Cuadro de Punnett (o multiplicación de probabilidades).",
      "Proporciones o probabilidades <b>con lo que pide el enunciado</b> (genotipo, fenotipo, sexo).",
      "Una frase de conclusión."
    ]) +
    ejemplo("Pregunta 4. Interpretar un árbol genealógico", "Respuesta modelo:", [
      "<b>Tipo de herencia</b>, con la pista del árbol que lo justifica (dos padres sanos con un hijo afectado, etc.).",
      "<b>Genotipos</b> de los afectados y de los portadores que se puedan deducir.",
      "<b>Probabilidad</b> pedida, con el razonamiento condicionado cuando haga falta (2/3 de ser portador)."
    ]) +
    "<p>Los ejercicios del final incluyen cinco preguntas abiertas con rúbrica para que veas qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")) });

  B.parte.bio10a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
