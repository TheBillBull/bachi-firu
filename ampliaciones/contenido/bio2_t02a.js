/* ============================================================
   Biología (2.º Bach.) · ampliaciones · Tema 2: Glúcidos
   (parte A: teoría, se añade al final de las cuatro secciones originales y en secciones nuevas.
    Parte B, bio2_t02b.js: ficha de un vistazo, actividades, ejercicios, lámina y registro.)

   IDEAS QUE MÁS CUESTAN / MÁS CAEN EN LA PAU DE MADRID EN ESTE TEMA, Y QUÉ SE HIZO CON CADA UNA
   1. Definición exacta de glúcido (polihidroxialdehídos / polihidroxicetonas) y aldosa frente a cetosa → sección 1 + clasificar.
   2. Isomería: estereoisomería D/L, enantiómeros, epímeros, anómeros α/β, isómeros de función; D/L no es dextro/levo → sección 2 + bio2_azucar + emparejar.
   3. Dibujar e interpretar la ciclación (Fischer → Haworth): hemiacetal, piranosa/furanosa, carbono anomérico → sección 2 + bio2_azucar + orden.
   4. Enlace O-glucosídico: condensación, α/β, monocarbonílico y dicarbonílico → sección 3 + bio2_disac.
   5. Poder reductor: por qué la maltosa y la lactosa sí y la sacarosa no → sección 3 y 6 + bio2_lab.
   6. Los cuatro disacáridos (maltosa, celobiosa, lactosa, sacarosa) con sus monómeros y su enlace → tabla + emparejar.
   7. Almidón (amilosa y amilopectina), glucógeno y celulosa: misma glucosa, distinto enlace y forma → sección 4 + bio2_poli + clasificar.
   8. Experimentos Fehling y Lugol: interpretar los tubos, incluida la sacarosa antes y después de hidrolizar → sección 6 + bio2_lab + ejemplo PAU.
   9. Funciones: energética, reserva, estructural, y glúcidos en ARN/ADN, ATP y glucoconjugados → sección 5.
   10. Problemas sencillos de masa, moles, agua liberada en la condensación y número de enlaces → ejemplos resueltos y ejercicios numéricos.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "bio2/t2/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }   // evita que el resaltador de variables tiña las fórmulas
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. ¿Qué son los glúcidos?
  secciones[0] = env(
    "<h5>La definición que piden en el examen</h5>" +
    "<p>Los <b>glúcidos</b> (también llamados <b>hidratos de carbono</b>, <b>carbohidratos</b> o, de forma coloquial, azúcares) son biomoléculas formadas por <b>carbono, hidrógeno y oxígeno</b>. Más exactamente, son <b>polihidroxialdehídos</b> y <b>polihidroxicetonas</b>, o sustancias que dan estos compuestos al hidrolizarse. Cada palabra tiene un sentido:</p>" +
    "<ul><li><b>poli-hidroxi</b>: tienen <b>varios grupos hidroxilo</b> (–OH), uno en casi cada carbono;</li>" +
    "<li><b>aldehído</b> (–CHO, en un extremo de la cadena) o <b>cetona</b> (C=O, en un carbono interior): un solo grupo <b>carbonilo</b> por molécula.</li></ul>" +
    "<p>Fíjate en que no es una lista de nombres para memorizar: con esos dos grupos funcionales (que ya conoces de Química II (T9)) se entiende casi todo el tema. Los –OH hacen que los azúcares sean <b>solubles en agua</b> y den puentes de hidrógeno; el carbonilo les da el <b>poder reductor</b> y permite que la molécula se cierre en anillo.</p>" +
    "<h5>¿Por qué «hidratos de carbono»?</h5>" +
    "<p>Los monosacáridos sencillos cumplen la fórmula general <b>C<sub>n</sub>(H<sub>2</sub>O)<sub>n</sub></b>: la glucosa es C<sub>6</sub>(H<sub>2</sub>O)<sub>6</sub> = C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>. Parecen «carbono con agua», de ahí el nombre antiguo. Pero no hay agua dentro: es solo una coincidencia de la fórmula. Y la regla tiene excepciones: la desoxirribosa es C<sub>5</sub>H<sub>10</sub>O<sub>4</sub>, con un oxígeno menos.</p>" +
    ojo("«Hidrato de carbono» <b>no</b> significa que la molécula contenga agua unida. Es un nombre histórico por la proporción de H y O (2 : 1, como en el agua).") +
    "<h5>Aldosas y cetosas</h5>" +
    "<p>Según dónde esté el carbonilo, un monosacárido es una <b>aldosa</b> (aldehído en C1; ejemplos: glucosa, galactosa, ribosa) o una <b>cetosa</b> (cetona, normalmente en C2; ejemplos: fructosa, dihidroxiacetona). Si además indicas el número de carbonos se forman los nombres que verás en los exámenes: <b>aldohexosa</b> (glucosa), <b>cetohexosa</b> (fructosa), <b>aldopentosa</b> (ribosa), <b>aldotriosa</b> (gliceraldehído), <b>cetotriosa</b> (dihidroxiacetona).</p>" +
    "<h5>La familia de los glúcidos</h5>" +
    tabla(["Grupo", "Qué son", "Ejemplos"], [
      ["Osas (monosacáridos)", "una sola unidad; no se hidrolizan", "glucosa, fructosa, galactosa, ribosa"],
      ["Ósidos: oligosacáridos", "de 2 a 10 monosacáridos unidos (los más importantes, los disacáridos)", "sacarosa, lactosa, maltosa"],
      ["Ósidos: polisacáridos", "decenas, cientos o miles de unidades", "almidón, glucógeno, celulosa, quitina"],
      ["Ósidos: heterósidos", "glúcido unido a una parte no glucídica", "glucoproteínas, glucolípidos"]
    ], "q3t") +
    "<p>Los <b>holósidos</b> están formados solo por monosacáridos (disacáridos y polisacáridos de arriba). Los <b>heterósidos</b> llevan, además, otro tipo de molécula (una proteína, un lípido…).</p>" +
    "<h5>Para qué sirven: el mapa de las funciones</h5>" +
    "<p>Aunque ya los conoces, vale la pena tener las funciones ordenadas antes de entrar en detalle (las desarrollamos en la sección 5):</p>" +
    "<ul><li><b>Energética</b>: la glucosa es el combustible inmediato de las células. 1 g de glúcido libera unas <b>4 kcal</b> (≈ 17 kJ). Los lípidos dan unas 9 kcal/g, pero se movilizan más despacio: los glúcidos son la energía «de la caja registradora», los lípidos la «del banco».</li>" +
    "<li><b>Reserva</b>: almidón (plantas) y glucógeno (animales y hongos).</li>" +
    "<li><b>Estructural</b>: celulosa (pared vegetal), quitina (artrópodos y hongos), peptidoglucano (bacterias).</li>" +
    "<li><b>Otras</b>: ribosa y desoxirribosa en el ARN y el ADN; reconocimiento celular con glucoproteínas y glucolípidos de la membrana.</li></ul>" +
    ejemplo("En la etiqueta de un yogur", "Una etiqueta dice: «Hidratos de carbono: 12 g, de los cuales azúcares: 11 g». ¿Qué significa?", [
      "«Hidratos de carbono» es el total de glúcidos que se pueden digerir (azúcares simples + almidón).",
      "«Azúcares» son los monosacáridos y disacáridos (en un yogur, la lactosa de la leche y el azúcar añadido).",
      "Los otros 1 g serían polisacáridos, como el almidón de un cereal o una fruta añadida.",
      "Energía de esos 12 g: 12 · 4 = <b>48 kcal</b> (aproximadamente)."
    ])
  );

  // ---------------------------------------------------------------- 2. Monosacáridos
  secciones[1] = env(
    "<h5>Cómo se ordenan: por carbonos y por grupo carbonilo</h5>" +
    tabla(["Nº de C", "Nombre", "Ejemplos (¿aldosa o cetosa?)", "Importancia"], [
      ["3", "triosas", "gliceraldehído (aldosa), dihidroxiacetona (cetosa)", "intermediarios de la glucólisis (T8)"],
      ["5", "pentosas", "ribosa y desoxirribosa (aldosas), ribulosa (cetosa)", "ARN, ADN, ATP; ribulosa en la fotosíntesis (T9)"],
      ["6", "hexosas", "glucosa y galactosa (aldosas), fructosa (cetosa)", "energía, leche, fruta"]
    ], "q3t") +
    "<p>La <b>glucosa</b> es la molécula más importante de la biología: casi todas las células la usan para obtener energía (T8), las plantas la fabrican en la fotosíntesis (T9) y es el monómero de los polisacáridos que verás más abajo. En la sangre humana hay aproximadamente <b>1 g/L</b> (la «glucemia»). La <b>fructosa</b> está en la fruta y la miel; la <b>galactosa</b> casi nunca se encuentra libre: forma parte de la lactosa.</p>" +
    "<h5>Isomería: misma fórmula, moléculas distintas</h5>" +
    "<p>Muchos monosacáridos tienen la <b>misma fórmula molecular</b> (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) y, sin embargo, son sustancias diferentes con propiedades distintas. Son <b>isómeros</b>. Hay que distinguir bien los tipos:</p>" +
    tabla(["Tipo de isomería", "En qué se diferencian", "Ejemplo"], [
      ["De función", "tienen distinto grupo funcional (aldehído / cetona)", "glucosa (aldosa) y fructosa (cetosa)"],
      ["Estereoisomería: enantiómeros", "imágenes especulares: cambian <b>todos</b> los OH de lado", "D-glucosa y L-glucosa"],
      ["Estereoisomería: epímeros", "se diferencian en <b>un solo</b> carbono asimétrico", "glucosa y galactosa (C4); glucosa y manosa (C2)"],
      ["Estereoisomería: anómeros", "se diferencian solo en el carbono <b>anomérico</b> de la forma cíclica (α/β)", "α-D-glucosa y β-D-glucosa"]
    ], "q3t") +
    "<p>Todos los estereoisómeros salen de los <b>carbonos asimétricos</b> (los que tienen cuatro sustituyentes distintos). Con <b>n</b> carbonos asimétricos hay <b>2<sup>n</sup></b> estereoisómeros posibles. La D-glucosa en cadena abierta tiene 4 (C2, C3, C4 y C5): <b>2<sup>4</sup> = 16</b> estereoisómeros, 8 de la serie D y 8 de la serie L.</p>" +
    "<h5>Serie D y serie L</h5>" +
    "<p>Se mira el carbono asimétrico <b>más alejado del carbonilo</b> (en la glucosa, el C5). Si en la <b>proyección de Fischer</b> (cadena vertical con el carbonilo arriba) su –OH está a la <b>derecha</b>, es de la serie <b>D</b>; si está a la izquierda, <b>L</b>. Casi todos los azúcares de los seres vivos son de la serie D.</p>" +
    ojo("<b>D/L no es lo mismo que (+)/(−).</b> D y L describen la <b>forma de la molécula</b> (de qué lado está un OH). (+) dextrógiro y (−) levógiro describen <b>hacia dónde gira el plano de la luz polarizada</b>, y se mide en el laboratorio. La D-glucosa es dextrógira (+); la D-fructosa, de la serie D, es <b>levógira</b> (−).") +
    "<h5>De la cadena abierta al anillo</h5>" +
    "<p>En disolución, las pentosas y hexosas casi no existen como cadena abierta: el grupo carbonilo reacciona con un –OH de la propia molécula y la cadena se <b>cierra en anillo</b>.</p>" +
    "<ul><li>En una <b>aldosa</b> (glucosa) el aldehído reacciona con el –OH del C5: se forma un <b>hemiacetal</b>, un anillo de seis lados con un oxígeno, llamado <b>piranosa</b>.</li>" +
    "<li>En una <b>cetosa</b> (fructosa) la cetona del C2 reacciona con el –OH del C5: se forma un <b>hemicetal</b> de cinco lados, una <b>furanosa</b>. La ribosa y la desoxirribosa también forman furanosas.</li>" +
    "<li>El carbono del antiguo carbonilo (C1 de la glucosa, C2 de la fructosa) se vuelve <b>asimétrico</b> y se llama <b>carbono anomérico</b>. Su –OH puede quedar <b>hacia abajo (α)</b> o <b>hacia arriba (β)</b> del plano del anillo. Son los dos <b>anómeros</b>.</li></ul>" +
    "<p>Esta forma de dibujar el anillo, plano y en perspectiva, es la <b>fórmula de Haworth</b>. Lo que en Fischer está a la derecha, en Haworth queda <b>abajo</b>; lo que está a la izquierda, <b>arriba</b>. Así se traduce de una a otra sin memorizar nada. Pruébalo con el interactivo: elige cada azúcar, mira la cadena abierta y después cierra el anillo α o β.</p>" +
    w("bio2_azucar") +
    "<p>En el interactivo observa tres cosas: (1) la <b>galactosa</b> solo difiere de la glucosa en el OH del C4; (2) la <b>fructosa</b> tiene un carbono asimétrico menos y cierra un anillo de cinco lados; (3) al ciclar, el contador de carbonos asimétricos <b>sube en uno</b>, porque el carbono anomérico se hace asimétrico.</p>" +
    ejemplo("Ejemplo resuelto: contar estereoisómeros", "¿Cuántos estereoisómeros tiene la glucosa en cadena abierta, y cuántos tiene la forma cíclica (piranosa)? ¿Y la fructosa en cadena abierta?", [
      "Se buscan los carbonos asimétricos de la glucosa abierta: C2, C3, C4 y C5 (C1 es aldehído y C6 tiene dos H). Son <b>4</b> → 2<sup>4</sup> = <b>16</b> estereoisómeros (8 D + 8 L).",
      "Al ciclar, el C1 también es asimétrico: 5 carbonos asimétricos → 2<sup>5</sup> = <b>32</b> (los 16 se desdoblan en α y β).",
      "Fructosa abierta: C1 (CH<sub>2</sub>OH) y C2 (cetona) no son asimétricos; sí lo son C3, C4 y C5 → 3 → 2<sup>3</sup> = <b>8</b> estereoisómeros."
    ]) +
    "<h5>Mutarrotación: por qué cambia el giro de una disolución de azúcar</h5>" +
    "<p>Si disuelves α-D-glucosa pura, su poder rotatorio (+112°) va bajando poco a poco; si disuelves β-D-glucosa pura, sube (+19°) desde el otro lado. Los dos acaban en <b>+52,7°</b>. El motivo: en agua, el anillo se abre un instante y se vuelve a cerrar, pasando de α a β, hasta llegar a un equilibrio con unas <b>⅓ de α, ⅔ de β</b> y menos del 0,1 % de forma abierta. Ese fenómeno se llama <b>mutarrotación</b>.</p>" +
    "<h5>Propiedades de los monosacáridos</h5>" +
    "<ul><li>Sólidos cristalinos, blancos y dulces (la fructosa es la más dulce).</li>" +
    "<li><b>Muy solubles en agua</b>, por los –OH.</li>" +
    "<li><b>Reductores</b>: tienen un carbonilo libre (o un OH anomérico que puede volver a ser carbonilo) y reducen otras sustancias, como el Cu<sup>2+</sup> del reactivo de Fehling (sección 6).</li></ul>" +
    "<h5>Derivados que conviene reconocer</h5>" +
    "<ul><li><b>Desoxiazúcares</b>: pierden un O. La desoxirribosa es la pentosa del ADN.</li>" +
    "<li><b>Aminoazúcares</b>: un –OH se cambia por –NH<sub>2</sub> (o su forma acetilada). La <b>N-acetilglucosamina</b> forma la quitina.</li>" +
    "<li><b>Ácidos urónicos</b> (con un grupo ácido en el C6), presentes en pectinas.</li>" +
    "<li><b>Azúcares fosforilados</b>, como la glucosa-6-fosfato, de la glucólisis (T8).</li></ul>" +
    "<p>Para comprobar que dominas el paso de abierta a cerrada, ordena las etapas de la ciclación de la glucosa:</p>" +
    w("orden", "ciclacion") +
    "<p>Y para repasar los tipos de isomería, empareja cada uno con su ejemplo:</p>" +
    w("emparejar", "isomeria")
  );

  // ---------------------------------------------------------------- 3. Disacáridos
  secciones[2] = env(
    "<h5>El enlace O-glucosídico paso a paso</h5>" +
    "<p>Dos monosacáridos se unen cuando el <b>–OH del carbono anomérico</b> de uno reacciona con un <b>–OH</b> del otro. Se pierde una molécula de agua (<b>condensación</b>) y queda un puente de oxígeno entre los dos carbonos: el <b>enlace O-glucosídico</b>. El proceso inverso, que rompe el enlace gastando agua, es la <b>hidrólisis</b> y la hacen las enzimas digestivas.</p>" +
    "<p>El enlace se nombra con el tipo de anómero que lo forma (<b>α</b> o <b>β</b>) y con los números de los carbonos que se unen: por ejemplo, <b>α(1→4)</b> significa que el C1 de un azúcar, en forma α, se une al C4 del siguiente. Ya te lo anticipaba el tema 11 de Química II: es el mismo tipo de reacción de condensación que forma un polímero, aplicada a azúcares.</p>" +
    ojo("La masa del disacárido <b>no</b> es la suma de las masas de los dos monosacáridos: se pierde el agua. Dos glucosas (2 · 180 = 360 g/mol) dan una maltosa de 360 − 18 = <b>342 g/mol</b>. Su fórmula es C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>, no C<sub>12</sub>H<sub>24</sub>O<sub>12</sub>.") +
    "<h5>Monocarbonílico o dicarbonílico</h5>" +
    "<p>La clave para saber si un disacárido es <b>reductor</b> está en cuántos carbonos anoméricos quedan libres:</p>" +
    "<ul><li><b>Enlace monocarbonílico</b>: solo participa un carbono anomérico (por ejemplo, el C1 de uno con el C4 del otro). El segundo azúcar conserva su OH anomérico libre y puede abrirse a aldehído → el disacárido <b>sí es reductor</b>. Es el caso de la maltosa, la celobiosa y la lactosa.</li>" +
    "<li><b>Enlace dicarbonílico</b>: se unen los <b>dos</b> carbonos anoméricos. No queda ningún carbonilo libre → <b>no reduce</b>. Es el caso de la <b>sacarosa</b> (y de la trehalosa).</li></ul>" +
    "<h5>Los cuatro disacáridos que hay que conocer</h5>" +
    tabla(["Disacárido", "Formado por", "Enlace", "¿Reductor?", "Dónde está"], [
      ["Maltosa", "glucosa + glucosa", "α(1→4), monocarbonílico", "sí", "cebada germinada; sale al digerir el almidón"],
      ["Celobiosa", "glucosa + glucosa", "β(1→4), monocarbonílico", "sí", "unidad que se repite en la celulosa"],
      ["Lactosa", "galactosa + glucosa", "β(1→4), monocarbonílico", "sí", "leche de los mamíferos"],
      ["Sacarosa", "glucosa + fructosa", "α(1→β2), dicarbonílico", "<b>no</b>", "caña de azúcar, remolacha; «el azúcar de mesa»"]
    ], "q3t") +
    "<p>Construye tú los cuatro (y alguno que no existe) con el interactivo: elige el primer azúcar y el segundo, pulsa <b>Unir</b> y mira el nombre, la masa y si reduce.</p>" +
    w("bio2_disac") +
    ejemplo("Ejemplo resuelto: de la sacarosa a la glucosa y la fructosa", "Se hidrolizan 171 g de sacarosa (C = 12; H = 1; O = 16). Calcula la masa de agua que se consume y las masas de glucosa y de fructosa que se obtienen.", [
      "Masa molar de la sacarosa, C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>: 12 · 12 + 22 · 1 + 11 · 16 = <b>342 g/mol</b>.",
      "Moles: n = 171 / 342 = <b>0,50 mol</b>.",
      "Reacción: sacarosa + H<sub>2</sub>O → glucosa + fructosa, relación 1 : 1 : 1 : 1. Agua consumida: 0,50 mol · 18 = <b>9 g</b>.",
      "Glucosa: 0,50 · 180 = <b>90 g</b>. Fructosa: 0,50 · 180 = <b>90 g</b>.",
      "Comprobación (la masa se conserva): 171 + 9 = 180 = 90 + 90 ✔."
    ]) +
    "<h5>Azúcar invertido</h5>" +
    "<p>La sacarosa es <b>dextrógira</b> (+66,5°). Al hidrolizarla se obtiene una mezcla de glucosa (+) y fructosa (−), y como la fructosa gira más hacia la izquierda (−92°) que la glucosa hacia la derecha (+52,7°), la mezcla acaba siendo <b>levógira</b>: el signo del giro se «invierte», de ahí el nombre. La miel es, en buena parte, azúcar invertido.</p>" +
    "<h5>Lactosa y lactasa</h5>" +
    "<p>La lactosa se digiere en el intestino delgado con la enzima <b>lactasa</b>, que rompe su enlace β(1→4). Muchos adultos dejan de producir lactasa: es la <b>intolerancia a la lactosa</b>. La lactosa sin digerir pasa al intestino grueso, donde las bacterias la fermentan y producen gases y diarrea. No es una alergia (no interviene el sistema inmunitario): es un problema <b>enzimático</b>.</p>" +
    "<p>Compruébalo con un emparejamiento: cada disacárido con sus monosacáridos y su enlace.</p>" +
    w("emparejar", "disacaridos")
  );

  // ---------------------------------------------------------------- 4. Polisacáridos
  secciones[3] = env(
    "<h5>Cadenas de glucosas: mismo monómero, distintas moléculas</h5>" +
    "<p>Los <b>polisacáridos</b> son polímeros de monosacáridos unidos por enlaces O-glucosídicos. Si todas las unidades son iguales son <b>homopolisacáridos</b> (almidón, glucógeno, celulosa y quitina); si hay unidades distintas, <b>heteropolisacáridos</b>. No tienen sabor dulce, no son muy solubles y <b>no reducen</b> el Fehling (apenas tienen un extremo reductor libre en cadenas de miles de unidades).</p>" +
    "<p>Lo importante es que el <b>tipo de enlace</b> (α o β) y la <b>ramificación</b> cambian la forma de la molécula y, con ella, la función. Con el interactivo puedes ver los cuatro principales uno a uno:</p>" +
    w("bio2_poli") +
    "<h5>Almidón: la reserva de las plantas</h5>" +
    "<p>Se almacena en los <b>amiloplastos</b> (semillas, tubérculos, cereales: patata, arroz, trigo). Es una mezcla de dos polímeros de α-glucosa:</p>" +
    tabla(["", "Amilosa (20–30 %)", "Amilopectina (70–80 %)"], [
      ["Enlaces", "α(1→4)", "α(1→4) y, en las ramas, α(1→6)"],
      ["Forma", "cadena sin ramificar, enrollada en <b>hélice</b> (≈ 6 glucosas por vuelta)", "cadena <b>ramificada</b> (una rama cada 12–30 glucosas)"],
      ["Lugol", "azul intenso (el yodo entra en la hélice)", "violeta rojizo"]
    ], "q3t") +
    "<h5>Glucógeno: la reserva de los animales</h5>" +
    "<p>Es parecido a la amilopectina pero <b>más ramificado</b> (una rama α(1→6) cada 8–12 glucosas). Se acumula como gránulos en el <b>hígado</b> (hasta cerca del 10 % de su masa) y en el <b>músculo</b>. Las muchas ramas son una ventaja: las enzimas que lo degradan actúan sobre <b>muchos extremos a la vez</b> y liberan glucosa muy deprisa. El glucógeno del hígado mantiene estable la glucemia entre comidas; el del músculo es solo para el propio músculo.</p>" +
    "<h5>Celulosa: la armadura de las plantas</h5>" +
    "<p>Polímero lineal de <b>β-glucosa</b> unidas por enlaces <b>β(1→4)</b>. En el enlace β cada glucosa queda <b>girada 180°</b> respecto a la vecina, y la cadena sale <b>recta y plana</b> (no en hélice). Las cadenas se alinean en paralelo y se unen con muchos <b>puentes de hidrógeno</b> formando <b>microfibrillas</b>, muy resistentes: son la pared celular vegetal (madera, algodón, papel).</p>" +
    "<p>Los humanos no tenemos <b>celulasa</b> y no podemos romper el enlace β: la celulosa es la <b>fibra</b>, que no nos nutre pero ayuda al tránsito intestinal. Los <b>rumiantes</b> (vaca, oveja) y las <b>termitas</b> sí la aprovechan, gracias a microorganismos simbiontes de su tubo digestivo que producen celulasa.</p>" +
    "<h5>Otros polisacáridos que debes poder nombrar</h5>" +
    "<ul><li><b>Quitina</b>: polímero de <b>N-acetilglucosamina</b> con enlaces β(1→4). Exoesqueleto de artrópodos (insectos, crustáceos) y pared de los hongos.</li>" +
    "<li><b>Peptidoglucano</b> (murreína): pared de las <b>bacterias</b>; formado por dos azúcares alternos (N-acetilglucosamina y ácido N-acetilmurámico) unidos a péptidos. Es el blanco de la penicilina (T14).</li>" +
    "<li><b>Pectina</b>, <b>hemicelulosa</b>: junto a la celulosa en la pared vegetal. <b>Agar</b>: de algas rojas, gelificante (cultivos microbianos).</li>" +
    "<li><b>Inulina</b>: reserva de fructosa en la alcachofa y la achicoria.</li>" +
    "<li><b>Ácido hialurónico</b> y <b>heparina</b>: heteropolisacáridos en el tejido conjuntivo y la sangre (anticoagulante).</li></ul>" +
    ejemplo("Ejemplo resuelto: contar enlaces y aguas en una cadena", "Una molécula de amilopectina tiene 3000 residuos de glucosa y una ramificación cada 20 residuos. ¿Cuántas moléculas de agua se liberaron al formarla y cuántos enlaces α(1→6) y α(1→4) tiene?", [
      "Para unir <b>n</b> residuos en una sola molécula (aunque esté ramificada) hacen falta <b>n − 1</b> enlaces: se liberaron 3000 − 1 = <b>2999 H<sub>2</sub>O</b>.",
      "Ramas: una cada 20 residuos → 3000 / 20 = <b>150 enlaces α(1→6)</b>.",
      "El resto son enlaces α(1→4): 2999 − 150 = <b>2849</b>.",
      "Masa aproximada: cada residuo aporta 162 g/mol (glucosa 180 menos el agua 18) → 3000 · 162 ≈ 4,9·10<sup>5</sup> g/mol."
    ]) +
    "<p>Resumen de funciones: clasifica cada polisacárido en el grupo correcto.</p>" +
    w("clasificar", "funciones") +
    ojo("Almidón y celulosa son <b>polímeros de glucosa</b> los dos; la diferencia está en el <b>enlace</b> (α o β), no en el monómero. Por eso un humano digiere el pan y no digiere el algodón.") +
    "<p>Y ahora, la digestión del almidón en el orden en el que ocurre:</p>" +
    w("orden", "almidon")
  );

  // ---------------------------------------------------------------- nuevas
  var nuevas = [];

  nuevas.push({ h: "5. Funciones de los glúcidos y glucoconjugados", html: env(
    "<p>Después de ver la química, repasa para qué sirve cada glúcido en un ser vivo. Las funciones se agrupan en cuatro:</p>" +
    tabla(["Función", "Molécula", "Dónde", "Idea clave"], [
      ["Energética", "glucosa", "todas las células", "oxidación en la respiración (T8): ≈ 4 kcal/g"],
      ["Reserva", "almidón; glucógeno", "plantas; animales y hongos", "polímeros compactos y osmóticamente poco activos"],
      ["Estructural", "celulosa; quitina; peptidoglucano", "pared vegetal; artrópodos y hongos; bacterias", "enlace β, cadenas rectas con puentes de H"],
      ["Información y señal", "ribosa, desoxirribosa; glucoconjugados", "ARN, ADN, ATP; membrana", "forman parte de otras biomoléculas"]
    ], "q3t") +
    "<h5>¿Por qué se almacena como polímero y no como glucosa libre?</h5>" +
    "<p>Si una célula guardase miles de moléculas de glucosa sueltas, aumentaría la concentración de solutos y entraría agua por <b>ósmosis</b> hasta hacerla reventar. Un polisacárido, aunque contenga miles de glucosas, es <b>una sola molécula</b> para la ósmosis. Por eso el almidón y el glucógeno son reservas «compactas».</p>" +
    "<h5>Ribosa, desoxirribosa y ATP</h5>" +
    "<p>La <b>ribosa</b> es el azúcar del ARN y del ATP; la <b>desoxirribosa</b>, el del ADN. En los nucleótidos (T5) el azúcar une la base nitrogenada (en el C1) y el fosfato (en el C5). La única diferencia entre ARN y ADN en el azúcar es el O del C2.</p>" +
    "<h5>Glucoconjugados: azúcares con otra molécula</h5>" +
    "<p>Muchos glúcidos están unidos a proteínas o lípidos. Son <b>heterósidos</b>:</p>" +
    "<ul><li><b>Glucoproteínas</b> (glúcido + proteína): hormonas como la FSH y la LH, anticuerpos, y las del <b>glucocálix</b>.</li>" +
    "<li><b>Glucolípidos</b> (glúcido + lípido): en la cara externa de la membrana plasmática (T6), como los gangliósidos y los cerebrósidos.</li>" +
    "<li>El <b>glucocálix</b> es la «capa de azúcares» que recubre el exterior de la membrana: protege, permite el <b>reconocimiento entre células</b> y sirve de antena para virus y bacterias. Los <b>grupos sanguíneos</b> A, B y 0 dependen de los azúcares del glucocálix de los glóbulos rojos.</li></ul>" +
    ejemplo("Pregunta típica: ¿por qué la sangre de tipo 0 se considera «donante universal»?", "Pista sobre glúcidos.", [
      "Los glóbulos rojos del grupo A llevan un azúcar extra (N-acetilgalactosamina) en su glucocálix; los del B, otro (galactosa); los del grupo 0 no llevan ninguno de los dos.",
      "El sistema inmunitario del receptor ataca los azúcares que no reconoce como propios. Como el grupo 0 no los tiene, no hay nada que atacar (en los glóbulos rojos).",
      "Por eso se dice que el 0 es donante universal en cuanto a los glóbulos rojos."
    ])
  ) });

  nuevas.push({ h: "6. Reconocer glúcidos en el laboratorio: Fehling y Lugol", html: env(
    "<p>Hay dos pruebas que se repiten mucho en los exámenes de la PAU. Una detecta <b>azúcares reductores</b> y otra detecta <b>almidón</b>.</p>" +
    "<h5>Reactivo de Fehling (o de Benedict)</h5>" +
    "<p>Es una disolución <b>azul</b> de sulfato de cobre (Cu<sup>2+</sup>) en medio básico. Se mezcla con la muestra y se <b>calienta</b>. Si hay un azúcar reductor, su carbonilo se oxida (el aldehído pasa a ácido) y reduce el Cu<sup>2+</sup> a Cu<sup>+</sup>, que precipita como óxido de cobre(I), Cu<sub>2</sub>O, de color <b>rojo ladrillo</b>. Sin azúcar reductor, la disolución sigue azul.</p>" +
    tabla(["Muestra", "Fehling", "Por qué"], [
      ["Glucosa, fructosa", "positivo", "monosacáridos: carbonilo libre (la cetosa se isomeriza en medio básico)"],
      ["Maltosa, lactosa, celobiosa", "positivo", "enlace monocarbonílico: queda un OH anomérico libre"],
      ["Sacarosa", "<b>negativo</b>", "enlace dicarbonílico: no hay carbonilo libre"],
      ["Almidón, glucógeno, celulosa", "negativo", "polisacáridos: casi sin extremos reductores"],
      ["Sacarosa hidrolizada con HCl y neutralizada", "positivo", "se ha roto el enlace: glucosa + fructosa"]
    ], "q3t") +
    ojo("La sacarosa da Fehling <b>negativo</b>, pero si antes la hierves con un ácido (HCl) para hidrolizarla, <b>sí da positivo</b>. Es una pregunta clásica. (El ácido se debe neutralizar antes, porque el Fehling funciona en medio básico.)") +
    "<h5>Reactivo de Lugol</h5>" +
    "<p>Disolución de yodo y yoduro potásico, de color <b>ámbar</b>. Con el <b>almidón</b> se vuelve <b>azul-violeta</b>: el yodo se coloca dentro de la hélice de la amilosa. Con el glucógeno da un tono pardo rojizo, y con la celulosa y los azúcares sencillos no cambia. Si se calienta, el color desaparece, porque la hélice se desordena, y vuelve al enfriarse.</p>" +
    "<p>Prueba tú: elige una muestra y un reactivo y mira si cambia el color.</p>" +
    w("bio2_lab") +
    ejemplo("Pregunta tipo PAU con experimento", "A cuatro tubos de ensayo se añade una muestra distinta: (A) glucosa, (B) sacarosa, (C) almidón, (D) sacarosa previamente hervida con HCl y neutralizada. A todos se les añade reactivo de Fehling y se calientan. Después, a otra serie de tubos con las mismas muestras se les añade Lugol. a) ¿Qué tubos de la primera serie se ponen rojo ladrillo? b) ¿Qué tubo de la segunda se pone azul-violeta? c) Explica por qué B y D dan resultados distintos.", [
      "<b>a)</b> A y D. La glucosa es un azúcar reductor. En D, el ácido hidrolizó el enlace dicarbonílico de la sacarosa y liberó glucosa + fructosa, ambas reductoras. B (sacarosa intacta) y C (almidón) no reducen el Fehling y quedan azules.",
      "<b>b)</b> Solo C: el yodo se aloja en la hélice de la amilosa del almidón. Los otros tubos conservan el color ámbar del Lugol.",
      "<b>c)</b> B y D tienen el mismo azúcar de partida. En B los dos carbonos anoméricos están unidos entre sí en el enlace O-glucosídico y no hay carbonilo libre. En D la hidrólisis los libera: glucosa (aldosa) y fructosa (cetosa que se isomeriza a aldosa en medio básico) reducen el Cu<sup>2+</sup> a Cu<sup>+</sup> (precipitado de Cu<sub>2</sub>O rojo)."
    ])
  ) });

  nuevas.push({ h: "7. Cómo se pregunta en la PAU y cómo responder", html: env(
    "<h5>Las diferencias típicas que hay que saber contar</h5>" +
    tabla(["Comparación", "Qué decir"], [
      ["Almidón y celulosa", "los dos son polímeros de glucosa; almidón: α(1→4) y α(1→6), hélice y ramas, reserva vegetal, digerible; celulosa: β(1→4), cadenas rectas con puentes de H, estructural, no digerible por humanos"],
      ["Almidón y glucógeno", "los dos son reservas de α-glucosa; el glucógeno es más ramificado (rama cada 8–12) y es animal; el almidón (amilosa + amilopectina) es vegetal"],
      ["Maltosa y sacarosa", "maltosa: glucosa + glucosa, α(1→4), reductora; sacarosa: glucosa + fructosa, α(1→β2), no reductora"],
      ["α-glucosa y β-glucosa", "anómeros: solo cambia el OH del C1 (abajo α, arriba β); de α sale almidón y glucógeno, de β sale celulosa"],
      ["Glucosa y fructosa", "isómeros de función: aldohexosa y cetohexosa; ambas C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>"],
      ["Ribosa y desoxirribosa", "pentosas del ARN y del ADN; la desoxirribosa no tiene el O del C2"]
    ], "q3t") +
    ejemplo("Pregunta tipo PAU resuelta paso a paso", "La figura muestra la fórmula de Haworth de un disacárido formado por una α-D-glucopiranosa unida, por su C1, al C2 de una β-D-fructofuranosa a través de un átomo de oxígeno. a) Identifica el disacárido y el tipo de enlace. b) Explica cómo se ha formado y calcula su masa molar. c) ¿Es un azúcar reductor? Razona la respuesta. d) Si se hidroliza, ¿qué se obtiene? (C = 12; H = 1; O = 16)", [
      "<b>a)</b> Es la <b>sacarosa</b>. El enlace es <b>O-glucosídico α(1→β2)</b>, <b>dicarbonílico</b>: implica los dos carbonos anoméricos (el C1 de la glucosa y el C2 de la fructosa).",
      "<b>b)</b> Por <b>condensación</b>: el OH del C1 de la glucosa reacciona con el OH del C2 de la fructosa y se libera una molécula de H<sub>2</sub>O. Masa molar: 180 + 180 − 18 = <b>342 g/mol</b> (C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>).",
      "<b>c)</b> <b>No</b> es reductora, porque los dos grupos carbonilo potenciales (los OH anoméricos) están ocupados en el enlace y no pueden abrirse a aldehído/cetona ni reducir el Cu<sup>2+</sup> del Fehling.",
      "<b>d)</b> La <b>hidrólisis</b> (con ácido o con la enzima sacarasa/invertasa) consume una molécula de agua y da <b>glucosa + fructosa</b> (azúcar invertido), que sí son reductoras."
    ]) +
    "<h5>Cómo estructurar una respuesta de desarrollo</h5>" +
    ejemplo("Pregunta 1. Compara los polisacáridos de reserva y los estructurales", "Respuesta modelo:", [
      "<b>Definición.</b> Polisacáridos: polímeros de monosacáridos unidos por enlaces O-glucosídicos.",
      "<b>Reserva.</b> Almidón (plantas; amilosa y amilopectina) y glucógeno (animales y hongos). Enlaces α(1→4) y ramas α(1→6); forma de hélice y ramificada.",
      "<b>Estructurales.</b> Celulosa (pared vegetal) y quitina (artrópodos y hongos). Enlaces β(1→4); cadenas rectas y puentes de hidrógeno.",
      "<b>Idea clave.</b> Mismo monómero (glucosa en el almidón, el glucógeno y la celulosa) pero distinto enlace: de ahí la diferente forma, función y digestibilidad."
    ]) +
    ejemplo("Pregunta 2. Isomería de los monosacáridos", "Respuesta modelo:", [
      "<b>Definición.</b> Isómeros: misma fórmula molecular, distinta estructura.",
      "<b>Tipos.</b> De función (glucosa/fructosa); estereoisómeros: enantiómeros (D/L), epímeros (glucosa/galactosa) y anómeros (α/β).",
      "<b>Ejemplo con números.</b> Glucosa: 4 carbonos asimétricos → 2<sup>4</sup> = 16 estereoisómeros.",
      "<b>Ciclación.</b> El carbonilo reacciona con el OH del C5 (hemiacetal) y se forma una piranosa; el C1 pasa a ser anomérico (α/β)."
    ]) +
    "<p>Para practicar, resuelve los ejercicios del final del tema: los de nivel ★★★ traen una rúbrica con la que ver qué nota te pondrías.</p>" +
    "<h5>Comprueba lo aprendido</h5>" +
    w("clasificar", "tipos") + w("quiz", "quiz1") + w("quiz", "errores") + w("tarjetas", "tarjetas1")
  ) });

  nuevas.push({ h: "8. Mapa del tema: conexiones con otros temas", html: env(
    "<ul><li><b>Química II, T9–T11 (compuestos del carbono y polímeros), T8 (redox) y T4 (enlace de hidrógeno)</b>: aldehído, cetona y alcohol; el poder reductor del Fehling es una reacción redox; la condensación que une monosacáridos es la misma que la de los polímeros; la hidrólisis es el proceso inverso.</li>" +
    "<li><b>Biología T1</b>: los puentes de hidrógeno del agua y de los –OH explican la solubilidad de los azúcares y la fuerza de la celulosa.</li>" +
    "<li><b>Biología T3 (lípidos)</b>: los lípidos son la reserva a largo plazo; los glúcidos, la energía inmediata. Glucolípidos en la membrana.</li>" +
    "<li><b>Biología T4 (proteínas y enzimas)</b>: amilasa, lactasa, celulasa y sacarasa son enzimas específicas de cada enlace (α o β); glucoproteínas.</li>" +
    "<li><b>Biología T5 (ácidos nucleicos)</b>: ribosa y desoxirribosa en el ARN y en el ADN.</li>" +
    "<li><b>Biología T6 (la célula)</b>: pared celular de plantas, hongos y bacterias; glucocálix.</li>" +
    "<li><b>Biología T8 y T9</b>: la glucosa es el combustible de la glucólisis y la respiración; se fabrica en la fotosíntesis; y se almacena como almidón o glucógeno.</li>" +
    "<li><b>Biología T14 (microbiología)</b>: el peptidoglucano de la pared bacteriana y los antibióticos.</li></ul>" +
    "<p>Si solo tienes tiempo de repasar una cosa de este tema, que sea la frase: <b>«mismo monómero (glucosa), distinto enlace (α o β), distinta forma y distinta función»</b>.</p>"
  ) });

  B.parte.bio2t2a = { secciones: secciones, nuevas: nuevas };
})(typeof window !== "undefined" ? window : this);
