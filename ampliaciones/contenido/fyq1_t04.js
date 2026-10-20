/* ============================================================
   Física y Química I · ampliaciones · Tema 4: Leyes fundamentales de la química
   (parte A: ampliación de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t4/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Lavoisier
  secciones[0] =
    "<h5>El experimento que cambió la química</h5>" +
    "<p>Hasta el siglo XVIII muchos pensaban que al arder una sustancia «perdía» algo (el famoso flogisto) y que, sin embargo, los metales calentados engordaban. Antoine Lavoisier resolvió el misterio <b>pesando con cuidado</b>. En 1774 calentó estaño dentro de un recipiente de vidrio <b>cerrado</b>: el metal se transformaba en una cal blanca, pero la masa total del recipiente (vidrio + aire + metal) <b>no cambiaba</b>. Cuando abría el recipiente, entraba aire con un silbido y la masa aumentaba justo lo que había aumentado el metal. Conclusión: el estaño no ganaba materia de la nada, sino que <b>se combinaba con una parte del aire</b> (el oxígeno, que él bautizó en 1778). La frase que se le atribuye resume la idea: <i>«nada se pierde, nada se crea, todo se transforma»</i>.</p>" +
    "<h5>Enunciado preciso y qué quiere decir «sistema cerrado»</h5>" +
    "<p><b>Ley de conservación de la masa:</b> en una reacción química que tiene lugar en un <b>sistema cerrado</b> (que no intercambia materia con el exterior), la masa total de los reactivos es igual a la masa total de los productos. La palabra clave es <i>cerrado</i>: si algún gas entra o sale, la balanza parece decir otra cosa, aunque la ley siga cumpliéndose para el conjunto «recipiente + gas».</p>" +
    tabla(["Situación cotidiana", "¿Qué dice la balanza?", "Explicación"], [
      ["Una vela que arde", "pierde masa", "la cera se convierte en CO₂ y vapor de agua que escapan al aire (sistema abierto)"],
      ["Un trozo de lana de acero que se oxida", "gana masa", "el hierro se combina con el oxígeno del aire: Fe₂O₃ pesa más que el Fe"],
      ["Bicarbonato + vinagre en un vaso", "pierde masa", "se desprende CO₂ gas que sale del vaso"],
      ["Lo mismo, pero con un globo en la boca del frasco", "no cambia", "el CO₂ queda atrapado en el globo: sistema cerrado"],
      ["Magnesio ardiendo (el destello de las bengalas)", "la ceniza pesa más que el metal", "2 Mg + O₂ → 2 MgO: se suma la masa del oxígeno consumido"]
    ]) +
    "<h5>¿Por qué se conserva la masa? La explicación atómica</h5>" +
    "<p>Una reacción química <b>no crea ni destruye átomos</b>: sólo rompe unos enlaces y forma otros, reordenando los mismos átomos. Si hay los mismos átomos de cada elemento antes y después, la masa total (que es la suma de las masas de esos átomos) tiene que ser la misma. Por eso <b>ajustar una ecuación</b> (que haya el mismo número de átomos de cada elemento a ambos lados) es la forma matemática de exigir la ley de Lavoisier. (Hay una matización de nivel superior: la masa y la energía son equivalentes (E = mc²), pero en una reacción química la energía que se libera corresponde a una variación de masa de unas 10⁻¹⁰ veces la masa que reacciona, completamente imposible de medir: para la química, la masa se conserva.)</p>" +
    "<h5>Cómo se usa en los cálculos</h5>" +
    "<p>La ley permite calcular <b>una masa desconocida</b> si conocemos todas las demás: Σ masas de reactivos = Σ masas de productos.</p>" +
    ejemplo("Un producto que falta", "Se queman 12 g de magnesio con 8 g de oxígeno y se obtienen 20 g de óxido de magnesio. En otra experiencia se descompone el óxido: ¿qué masa de oxígeno se libera al descomponer 50 g de MgO si se obtienen 30 g de magnesio?", [
      "Primera experiencia: 12 g + 8 g = 20 g. La masa se conserva (sistema cerrado).",
      "Segunda: MgO → Mg + O₂. Masa de reactivo: 50 g. Masa de productos: 30 g (Mg) + m(O₂).",
      "Aplicando Lavoisier: 50 = 30 + m(O₂) → <b>m(O₂) = 20 g</b>."
    ]) +
    ejemplo("Una masa de gas «que desaparece»", "Se calientan 100 g de CaCO₃. El sólido que queda (CaO) pesa 56 g. ¿Qué ha pasado con el resto de la masa y cuánto vale?", [
      "CaCO₃ → CaO + CO₂. Reactivo: 100 g. Producto sólido: 56 g.",
      "La masa que falta se ha ido en forma del gas CO₂: 100 − 56 = <b>44 g de CO₂</b>.",
      "Comprobación con masas molares (C = 12, O = 16): M(CO₂) = 44 g/mol, y 1 mol de CaCO₃ (100 g) produce 1 mol de CO₂ (44 g) ✓."
    ]) +
    ejemplo("Dos reactivos y dos productos", "El metano arde: CH₄ + 2 O₂ → CO₂ + 2 H₂O. Si reaccionan 16 g de CH₄ con 64 g de O₂ y se forman 44 g de CO₂, ¿cuánta agua se forma?", [
      "Masa de reactivos: 16 + 64 = 80 g.",
      "Masa de productos: 44 + m(H₂O) = 80 → <b>m(H₂O) = 36 g</b>.",
      "Comprobación: 2 mol de H₂O son 2·18 = 36 g ✓."
    ]) +
    w("q4_lavoisier") +
    ojo("la ley habla de la <b>masa</b>, no del volumen ni del número de moléculas. En 2 H₂ + O₂ → 2 H₂O la masa se conserva (4 g + 32 g = 36 g), pero hay 3 moléculas a la izquierda y sólo 2 a la derecha, y el volumen de los gases también cambia.");

  // ---------------------------------------------------------------- 2. Proust
  secciones[1] =
    "<h5>Un debate histórico entre dos químicos</h5>" +
    "<p>A principios del siglo XIX, el químico francés Joseph Proust defendió que un compuesto <b>siempre tiene la misma composición</b>; su colega Claude Berthollet sostenía que la composición podía variar de forma continua. Proust analizó con paciencia carbonatos de cobre, sulfuros de hierro y óxidos de estaño, y demostró que los aparentes cambios se debían a mezclas de compuestos distintos o a impurezas. Ganó el debate y su resultado, la <b>ley de las proporciones definidas</b>, se convirtió en una de las primeras bases de la teoría atómica de Dalton (1803–1808).</p>" +
    "<h5>Cómo se aplica: la proporción como «receta»</h5>" +
    "<p>Si un compuesto tiene proporción fija entre sus elementos, esa proporción actúa como una <b>receta</b>. El agua tiene siempre 1 parte de hidrógeno por cada 8 de oxígeno en masa, de modo que 9 g de agua contienen 1 g de H y 8 g de O; 18 g de agua, 2 g de H y 16 g de O. Con una sencilla regla de tres se calculan masas de cada elemento:</p>" +
    tabla(["Compuesto", "Proporción en masa", "Elemento A : elemento B", "% en masa (aprox.)"], [
      ["Agua, H₂O", "1 : 8", "H : O", "11,1 % H · 88,9 % O"],
      ["Dióxido de carbono, CO₂", "3 : 8", "C : O", "27,3 % C · 72,7 % O"],
      ["Sulfuro de hierro(II), FeS", "7 : 4", "Fe : S", "63,6 % Fe · 36,4 % S"],
      ["Óxido de magnesio, MgO", "3 : 2", "Mg : O", "60 % Mg · 40 % O"],
      ["Amoníaco, NH₃", "14 : 3", "N : H", "82,4 % N · 17,6 % H"],
      ["Cloruro de sodio, NaCl", "23 : 35,5", "Na : Cl", "39,3 % Na · 60,7 % Cl"]
    ]) +
    "<p>(Masas atómicas de examen: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, S = 32, Cl = 35,5, Fe = 56.)</p>" +
    ejemplo("Masa de un elemento a partir de otro", "¿Cuántos gramos de oxígeno se combinan con 5 g de hidrógeno para formar agua? ¿Y cuánta agua se obtiene?", [
      "Proporción H : O = 1 : 8, es decir, 8 g de O por cada g de H.",
      "m(O) = 5 g · 8 = <b>40 g de oxígeno</b>.",
      "Masa de agua = 5 + 40 = <b>45 g</b> (también lo obliga Lavoisier)."
    ]) +
    ejemplo("Reactivo en exceso", "En el laboratorio se calientan 10 g de hierro con 8 g de azufre. La proporción de Fe : S en el FeS es 7 : 4. ¿Qué masa de FeS se forma y qué elemento sobra?", [
      "Para 10 g de Fe harían falta 10·(4/7) = 5,71 g de S. Hay 8 g, así que <b>sobran 8 − 5,71 = 2,29 g de azufre</b> y el hierro se consume todo.",
      "Masa de FeS = 10 + 5,71 = <b>15,71 g</b>.",
      "Comprobación: la proporción en el FeS formado sigue siendo 7 : 4 (10 : 5,71 = 1,75 ✓). El azufre sobrante no forma otro compuesto: queda sin reaccionar."
    ]) +
    ejemplo("¿Es el mismo compuesto?", "Dos muestras de un óxido de plomo dan: muestra A, 20,7 g de Pb y 1,6 g de O; muestra B, 41,4 g de Pb y 3,2 g de O. ¿Es el mismo compuesto?", [
      "Muestra A: Pb/O = 20,7/1,6 = 12,94. Muestra B: 41,4/3,2 = 12,94.",
      "La proporción es idéntica (la muestra B es el doble de la A): <b>sí, es el mismo compuesto</b>, y cumple la ley de Proust (que, de hecho, sería PbO: 207/16 = 12,94)."
    ]) +
    "<h5>La ley de las proporciones múltiples (Dalton)</h5>" +
    "<p>Dalton descubrió una segunda regularidad: cuando dos elementos forman <b>más de un compuesto</b>, las masas de uno de ellos que se combinan con una masa fija del otro están en una <b>relación de números enteros sencillos</b>. Ejemplo con el carbono y el oxígeno:</p>" +
    tabla(["Compuesto", "Masa de C", "Masa de O que se combina con 12 g de C", "Relación de masas de O"], [
      ["Monóxido de carbono, CO", "12 g", "16 g", "1"],
      ["Dióxido de carbono, CO₂", "12 g", "32 g", "2"]
    ]) +
    "<p>La razón 16 : 32 = 1 : 2 es una razón de enteros sencillos. Esto sólo tiene sentido si la materia está formada por átomos indivisibles que se agrupan en números enteros: en CO hay 1 átomo de O por cada átomo de C, y en CO₂ hay 2. Con los óxidos de nitrógeno la relación llega a 1 : 2 : 3 : 4 : 5 (N₂O, NO, N₂O₃, NO₂, N₂O₅), y el simulador de abajo te deja comprobarlo con seis familias de compuestos.</p>" +
    w("q4_proporciones") +
    ojo("«proporción definida» no significa que dos elementos sólo puedan formar un compuesto. Pueden formar varios (CO y CO₂), cada uno con <i>su</i> proporción fija. Si la proporción cambia, ya no es el mismo compuesto.");

  // ---------------------------------------------------------------- 3. El mol
  secciones[2] =
    "<h5>Por qué hace falta una unidad nueva</h5>" +
    "<p>Una gota de agua contiene unos 1,7·10²¹ moléculas; un grano de sal, unos 10¹⁸ iones. Contar átomos uno a uno es imposible y manejar esos exponentes de forma directa es incómodo. Los químicos resuelven el problema como lo hace una frutería: cuando compras huevos no pides «doce mil millones de huevos», pides «docenas». El <b>mol</b> es la «docena» de la química, sólo que mucho mayor.</p>" +
    tabla(["Unidad de recuento", "Cuántas unidades", "Se usa para contar…"], [
      ["par", "2", "zapatos, calcetines"],
      ["docena", "12", "huevos"],
      ["resma", "500", "folios"],
      ["<b>mol</b>", "<b>6,022·10²³</b>", "átomos, moléculas, iones, electrones…"]
    ]) +
    "<h5>Definición actual del mol (SI, desde 2019)</h5>" +
    "<p>La magnitud física se llama <b>cantidad de sustancia</b> (símbolo <i>n</i>) y su unidad es el <b>mol</b>. Un mol contiene exactamente 6,02214076·10²³ entidades elementales (átomos, moléculas, iones…): ese valor del <b>número de Avogadro</b> se ha fijado por definición. En los problemas de 1.º de Bachillerato se usa N<sub>A</sub> = 6,022·10²³ mol⁻¹. Históricamente, un mol era el número de átomos que hay en 12 g de carbono-12, y de ahí sale la conexión con la masa: <b>la masa en gramos de un mol de átomos coincide numéricamente con la masa atómica del elemento</b>.</p>" +
    "<h5>Para hacerse una idea de lo grande que es</h5>" +
    "<ul><li>Si repartieras un mol de segundos entre los 8 000 millones de personas del planeta, a cada una le tocarían unos 7,5·10¹³ segundos: <b>unos 2,4 millones de años</b>.</li>" +
    "<li>Un mol de moléculas de agua es una cantidad que cabe en una mano: <b>18 mL</b> de agua líquida, más o menos una cucharada grande.</li>" +
    "<li>En una gota de agua (0,05 mL) hay unos 1,7·10²¹ moléculas: un mol son unas 350 000 gotas.</li></ul>" +
    "<h5>Moles de moléculas y moles de átomos</h5>" +
    "<p>El mol puede contar cualquier cosa, y hay que decir <b>qué</b> se cuenta. Un mol de moléculas de H₂O son 6,022·10²³ moléculas; pero cada molécula tiene 2 átomos de H y 1 de O. Por tanto, <b>1 mol de H₂O contiene 2 mol de átomos de H y 1 mol de átomos de O</b> (3 mol de átomos en total):</p>" +
    tabla(["Cantidad", "Moléculas de H₂O", "Átomos de H", "Átomos de O", "Átomos totales"], [
      ["1 molécula", "1", "2", "1", "3"],
      ["1 mol", "6,022·10²³", "1,204·10²⁴", "6,022·10²³", "1,807·10²⁴"],
      ["0,5 mol", "3,011·10²³", "6,022·10²³", "3,011·10²³", "9,033·10²³"]
    ]) +
    "<h5>Las dos conversiones fundamentales</h5>" +
    H.formula("N = n · N<sub>A</sub>      (partículas = moles · número de Avogadro)") +
    ejemplo("Moléculas en 1 g de agua", "¿Cuántas moléculas de agua hay en 1 g de agua? (M = 18 g/mol)", [
      "n = m/M = 1/18 = 0,0556 mol.",
      "N = n·N<sub>A</sub> = 0,0556 · 6,022·10²³ = <b>3,35·10²² moléculas</b>.",
      "Una sola molécula pesa 18/6,022·10²³ = 2,99·10⁻²³ g."
    ]) +
    ejemplo("Átomos de un elemento dentro de una molécula", "¿Cuántos átomos de hidrógeno hay en 9 g de agua?", [
      "n(H₂O) = 9/18 = 0,5 mol de moléculas.",
      "Cada molécula tiene 2 átomos de H: 0,5·2 = 1 mol de átomos de H.",
      "N(H) = 1 · 6,022·10²³ = <b>6,022·10²³ átomos de H</b>."
    ]) +
    ejemplo("La masa de un átomo", "Calcula la masa en gramos de un átomo de cobre (M = 63,5 g/mol).", [
      "1 mol de átomos de Cu (6,022·10²³ átomos) pesa 63,5 g.",
      "Masa de un átomo = 63,5 / 6,022·10²³ = <b>1,05·10⁻²² g</b>."
    ]) +
    ejemplo("Átomos en una sal con varios elementos", "¿Cuántos moles de átomos hay en 1 mol de Al₂(SO₄)₃?", [
      "Átomos por unidad fórmula: 2 de Al + 3 de S + 3·4 = 12 de O = 17 átomos.",
      "1 mol de Al₂(SO₄)₃ contiene <b>17 mol de átomos</b> (2 mol de Al, 3 mol de S y 12 mol de O)."
    ]) +
    w("q4_mol") +
    ojo("«un mol de agua» son 6,022·10²³ <b>moléculas</b>, no 6,022·10²³ átomos. Y un mol de cualquier sustancia contiene el mismo <b>número</b> de partículas, pero no pesa lo mismo: 1 mol de H₂O pesa 18 g y 1 mol de CO₂, 44 g.");

  // ---------------------------------------------------------------- 4. Masas
  secciones[3] =
    "<h5>La unidad de masa atómica</h5>" +
    "<p>Las masas de los átomos son tan pequeñas que se miden en una unidad propia, la <b>unidad de masa atómica</b> (u), definida como la doceava parte de la masa de un átomo de carbono-12: <b>1 u = 1,66·10⁻²⁴ g</b>. Con ella, el átomo de hidrógeno pesa ≈ 1 u, el de carbono 12 u y el de oxígeno 16 u. Hay una coincidencia decisiva que justifica el mol: <b>1 g = 6,022·10²³ u</b>. Por eso, la masa atómica en «u» de un elemento coincide numéricamente con la masa en «gramos» de un mol de sus átomos.</p>" +
    "<h5>¿Por qué la masa atómica de la tabla no es un número entero?</h5>" +
    "<p>Porque la mayoría de los elementos tienen varios <b>isótopos</b> (átomos con el mismo número de protones y distinto número de neutrones, Tema 1), y la masa atómica de la tabla es la <b>media ponderada</b> de las masas de sus isótopos según su abundancia natural:</p>" +
    H.formula("M<sub>atómica</sub> = Σ (abundancia<sub>i</sub> · masa<sub>i</sub>) / 100") +
    ejemplo("Masa atómica del cloro", "El cloro natural es una mezcla de ³⁵Cl (masa 34,97 u, abundancia 75,77 %) y ³⁷Cl (masa 36,97 u, abundancia 24,23 %). Calcula su masa atómica media.", [
      "M = (75,77·34,97 + 24,23·36,97)/100",
      "= (2649,8 + 895,8)/100 = 3545,6/100 = <b>35,46 u</b> (el valor de la tabla es 35,45).",
      "Por eso el cloro de la tabla se redondea a 35,5 y no a 35 ni a 36."
    ]) +
    ejemplo("Masa media con porcentajes sencillos", "El cobre tiene dos isótopos estables: ⁶³Cu (69,2 %) y ⁶⁵Cu (30,8 %). Calcula la masa atómica media usando los números de masa.", [
      "M = (69,2·63 + 30,8·65)/100 = (4359,6 + 2002)/100 = <b>63,6 u</b> (tabla: 63,55)."
    ]) +
    "<h5>Masa atómica, molecular, fórmula y molar: no son lo mismo</h5>" +
    tabla(["Magnitud", "Qué es", "Unidad", "Ejemplo (agua)"], [
      ["Masa atómica relativa", "masa media de un átomo de un elemento", "u", "H: 1 u · O: 16 u"],
      ["Masa molecular", "suma de las masas atómicas de los átomos de una molécula", "u", "18 u (2·1 + 16)"],
      ["Masa fórmula", "ídem, para compuestos iónicos que no forman moléculas", "u", "NaCl: 58,5 u"],
      ["<b>Masa molar M</b>", "masa de un mol de partículas", "<b>g/mol</b>", "<b>18 g/mol</b>"]
    ]) +
    "<p>Numéricamente son iguales; lo que cambia es el significado y la unidad. En los cálculos de química se trabaja casi siempre con la <b>masa molar</b> en g/mol.</p>" +
    "<h5>Cómo se calcula una masa molar, paso a paso</h5>" +
    "<ol><li>Escribe la fórmula y cuenta cuántos átomos de cada elemento hay (cuidado con los paréntesis: el subíndice de fuera multiplica a todo lo de dentro).</li><li>Multiplica cada número de átomos por la masa atómica del elemento.</li><li>Suma.</li></ol>" +
    ejemplo("Cuatro masas molares", "Calcula M de Ca(OH)₂, Al₂(SO₄)₃, (NH₄)₂SO₄ y CuSO₄·5H₂O. (Ca = 40, O = 16, H = 1, Al = 27, S = 32, N = 14, Cu = 63,5)", [
      "Ca(OH)₂: 1·40 + 2·16 + 2·1 = 40 + 32 + 2 = <b>74 g/mol</b>.",
      "Al₂(SO₄)₃: 2·27 + 3·32 + 12·16 = 54 + 96 + 192 = <b>342 g/mol</b>.",
      "(NH₄)₂SO₄: 2·14 + 8·1 + 32 + 4·16 = 28 + 8 + 32 + 64 = <b>132 g/mol</b>.",
      "CuSO₄·5H₂O (sal hidratada: el «·5H₂O» se suma entero): 63,5 + 32 + 64 + 5·18 = 159,5 + 90 = <b>249,5 g/mol</b>."
    ]) +
    "<h5>Composición centesimal</h5>" +
    "<p>La <b>composición centesimal</b> (o porcentaje en masa) indica cuántos gramos de cada elemento hay en 100 g del compuesto. Se calcula con el aporte de cada elemento a la masa molar:</p>" +
    H.formula("% elemento = (nº de átomos · masa atómica / masa molar) · 100") +
    ejemplo("Composición centesimal del carbonato de calcio", "Calcula el % de Ca, C y O en CaCO₃ (M = 100 g/mol).", [
      "% Ca = 40/100·100 = <b>40 %</b>.",
      "% C = 12/100·100 = <b>12 %</b>.",
      "% O = 3·16/100·100 = <b>48 %</b>. Suma: 40 + 12 + 48 = 100 % ✓."
    ]) +
    ejemplo("¿Cuánto hierro hay en una mena?", "El óxido de hierro(III), Fe₂O₃, es la mena principal del hierro. ¿Cuántos kg de hierro se pueden extraer, como máximo, de 1 tonelada de Fe₂O₃ puro? (Fe = 56, O = 16)", [
      "M(Fe₂O₃) = 2·56 + 3·16 = 112 + 48 = 160 g/mol.",
      "% Fe = 112/160 = 70 %.",
      "En 1000 kg de Fe₂O₃ hay 0,70·1000 = <b>700 kg de hierro</b>."
    ]) +
    w("q4_masamolar");

  // ---------------------------------------------------------------- 5. Empírica y molecular
  secciones[4] =
    "<h5>Tres fórmulas que no son lo mismo</h5>" +
    tabla(["Tipo", "Qué indica", "Ejemplo: glucosa", "Ejemplo: peróxido de hidrógeno"], [
      ["Fórmula empírica", "la proporción <i>más sencilla</i> entre los átomos (enteros mínimos)", "CH₂O", "HO"],
      ["Fórmula molecular", "el número real de átomos de cada elemento en una molécula", "C₆H₁₂O₆", "H₂O₂"],
      ["Fórmula estructural", "cómo se enlazan los átomos", "(se dibuja en el Tema 7)", "H–O–O–H"]
    ]) +
    "<p>Compuestos muy distintos pueden compartir fórmula empírica. CH₂O es la empírica de la glucosa (C₆H₁₂O₆, M = 180), pero también del formaldehído (CH₂O, M = 30) y del ácido acético (C₂H₄O₂, M = 60): lo que los distingue es la <b>masa molar</b>.</p>" +
    "<h5>El método en cinco pasos</h5>" +
    "<ol><li><b>Datos en masa</b>: si el dato es un % supón 100 g de compuesto (el % pasa a ser gramos).</li>" +
    "<li><b>Pasa a moles</b>: n = m/M para cada elemento.</li>" +
    "<li><b>Divide todo entre el menor</b> número de moles.</li>" +
    "<li>Si no salen enteros, <b>multiplica por 2, 3, 4…</b> hasta que sí lo sean (1,5 → ×2; 1,33 → ×3; 1,25 → ×4; 1,2 → ×5).</li>" +
    "<li>Los enteros son los <b>subíndices</b> de la fórmula empírica. Para la molecular: <b>n = M / M<sub>empírica</sub></b> y se multiplican todos los subíndices por n.</li></ol>" +
    ejemplo("Del análisis a la fórmula (el ejemplo clásico)", "Un compuesto contiene 40,0 % de C, 6,7 % de H y 53,3 % de O. Su masa molar es 180 g/mol. Halla las fórmulas empírica y molecular.", [
      "En 100 g: 40,0 g de C, 6,7 g de H, 53,3 g de O.",
      "Moles: C: 40,0/12 = 3,33 · H: 6,7/1 = 6,7 · O: 53,3/16 = 3,33.",
      "Dividiendo entre 3,33: C = 1 · H = 2,01 ≈ 2 · O = 1. <b>Fórmula empírica: CH₂O</b> (M = 30).",
      "n = 180/30 = 6 → <b>fórmula molecular: C₆H₁₂O₆</b> (glucosa)."
    ]) +
    ejemplo("Cuando salen decimales: hay que multiplicar", "Un óxido de hierro tiene 69,9 % de Fe y 30,1 % de O. Halla su fórmula empírica.", [
      "Fe: 69,9/56 = 1,248 mol · O: 30,1/16 = 1,881 mol.",
      "Dividiendo entre 1,248: Fe = 1 · O = 1,507 ≈ 1,5.",
      "No son enteros: se multiplica por 2 → Fe = 2 · O = 3. <b>Fórmula empírica: Fe₂O₃</b>."
    ]) +
    ejemplo("Multiplicar por 3", "La vitamina C tiene 40,9 % de C, 4,5 % de H y 54,6 % de O, y M = 176 g/mol. Halla su fórmula molecular.", [
      "Moles: C: 40,9/12 = 3,408 · H: 4,5/1 = 4,5 · O: 54,6/16 = 3,413.",
      "Dividiendo entre 3,408: C = 1 · H = 1,32 · O = 1,001. El 1,32 es ≈ 4/3: se multiplica por 3 → C = 3 · H = 4 · O = 3.",
      "Empírica C₃H₄O₃ (M = 88). n = 176/88 = 2 → <b>C₆H₈O₆</b>."
    ]) +
    ejemplo("Dos elementos", "Un hidrocarburo contiene 92,3 % de C y 7,7 % de H, y su masa molar es 78 g/mol. Halla su fórmula molecular.", [
      "C: 92,3/12 = 7,69 mol · H: 7,7/1 = 7,7 mol → proporción 1 : 1. Empírica <b>CH</b> (M = 13).",
      "n = 78/13 = 6 → <b>C₆H₆</b> (benceno)."
    ]) +
    "<h5>Análisis por combustión: cuando el dato son gramos de CO₂ y de H₂O</h5>" +
    "<p>La forma real de analizar un compuesto orgánico es quemarlo y pesar el CO₂ y el H₂O que se producen. Todo el C de la muestra acaba en el CO₂ y todo el H en el H₂O: <b>m(C) = m(CO₂)·12/44</b> y <b>m(H) = m(H₂O)·2/18</b>. El oxígeno, si lo hay, se halla <b>por diferencia</b> con la masa de la muestra.</p>" +
    ejemplo("Combustión de un alcohol", "Al quemar 2,30 g de un compuesto que contiene C, H y O se obtienen 4,40 g de CO₂ y 2,70 g de H₂O. Halla su fórmula empírica.", [
      "m(C) = 4,40·12/44 = 1,20 g · m(H) = 2,70·2/18 = 0,30 g · m(O) = 2,30 − 1,20 − 0,30 = 0,80 g.",
      "Moles: C: 1,20/12 = 0,100 · H: 0,30/1 = 0,300 · O: 0,80/16 = 0,050.",
      "Dividiendo entre 0,050: C = 2 · H = 6 · O = 1. <b>C₂H₆O</b> (etanol, M = 46)."
    ]) +
    ejemplo("El agua de cristalización", "Se calientan 5,00 g de sulfato de cobre(II) hidratado, CuSO₄·xH₂O, hasta eliminar toda el agua y quedan 3,20 g de sal anhidra. Halla x. (Cu = 63,5; S = 32; O = 16; H = 1)", [
      "Masa de agua: 5,00 − 3,20 = 1,80 g → 1,80/18 = 0,100 mol de H₂O.",
      "Moles de CuSO₄ (M = 159,5): 3,20/159,5 = 0,0201 mol.",
      "Proporción: 0,100/0,0201 = 4,98 ≈ 5. <b>x = 5</b>: CuSO₄·5H₂O."
    ]) +
    w("q4_empirica") +
    ojo("los porcentajes de la empírica y de la molecular son <b>iguales</b> (CH₂O y C₆H₁₂O₆ tienen el mismo 40 % de C). Con los porcentajes no se puede distinguir una de otra: hace falta la masa molar.");

  // ---------------------------------------------------------------- 6. Molaridad
  secciones[5] =
    "<h5>Qué es una disolución y de qué consta</h5>" +
    "<p>Una <b>disolución</b> es una mezcla homogénea (una sola fase, sin partículas visibles) formada por un <b>disolvente</b> (el componente mayoritario, normalmente agua) y uno o varios <b>solutos</b>. Cuando el disolvente es agua se habla de <b>disolución acuosa</b>. La cantidad de soluto que se puede disolver en una cantidad dada de disolvente tiene un máximo (la <b>solubilidad</b>): al alcanzarlo, la disolución está <b>saturada</b> y el exceso de soluto queda sin disolver.</p>" +
    "<h5>La molaridad paso a paso</h5>" +
    H.formula("M = n<sub>soluto</sub> / V<sub>disolución (L)</sub>      (mol/L, también escrito «M»)") +
    "<p>Una disolución 0,5 M («0,5 molar») contiene 0,5 mol de soluto <b>en cada litro de disolución</b>. De la fórmula salen tres versiones útiles: M = n/V, n = M·V (moles que hay en un volumen) y V = n/M (volumen que contiene n moles).</p>" +
    ejemplo("Calcular la molaridad", "Se disuelven 20 g de NaOH hasta completar 500 mL de disolución. Calcula la molaridad. (Na = 23, O = 16, H = 1)", [
      "M(NaOH) = 23 + 16 + 1 = 40 g/mol → n = 20/40 = 0,5 mol.",
      "V = 500 mL = 0,500 L.",
      "<b>M = 0,5/0,500 = 1 mol/L</b>."
    ]) +
    ejemplo("Calcular la masa que hay que pesar", "¿Cuántos gramos de H₂SO₄ hay que pesar para preparar 250 mL de disolución 0,5 M? (M = 98 g/mol)", [
      "n = M·V = 0,5 mol/L · 0,250 L = 0,125 mol.",
      "m = n·M = 0,125 · 98 = <b>12,25 g de H₂SO₄</b>."
    ]) +
    ejemplo("Moles contenidos en un volumen", "¿Cuántos moles de HCl hay en 40 mL de una disolución 2,5 M?", [
      "n = M·V = 2,5 · 0,040 = <b>0,10 mol</b>.",
      "(Con volumen en mL se puede hacer directamente: mmol = M · mL = 2,5 · 40 = 100 mmol = 0,10 mol.)"
    ]) +
    "<h5>Las trampas de la molaridad</h5>" +
    "<ul>" +
    "<li><b>Volumen de disolución, no de disolvente.</b> Disolver 20 g de NaOH «en 500 mL de agua» no es lo mismo que obtener «500 mL de disolución»: el volumen total puede cambiar al mezclar. La molaridad usa el volumen final.</li>" +
    "<li><b>Litros, no mililitros.</b> 250 mL = 0,250 L. Es el fallo más común.</li>" +
    "<li><b>La molaridad depende de la temperatura</b> (el volumen del líquido se dilata); por eso existe la molalidad, que usa masas.</li>" +
    "<li><b>Compuestos iónicos:</b> la molaridad de la sal y la de cada ion no coinciden. Una disolución 0,1 M de Al₂(SO₄)₃ contiene 0,2 M de Al³⁺ y 0,3 M de SO₄²⁻, porque cada unidad fórmula se separa en 2 + 3 iones.</li>" +
    "</ul>" +
    ejemplo("Concentración de los iones", "Una disolución contiene 0,10 mol/L de Al₂(SO₄)₃ totalmente disuelto. ¿Cuál es la concentración de cada ion?", [
      "Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻ (cada unidad fórmula da 2 cationes y 3 aniones).",
      "[Al³⁺] = 2 · 0,10 = <b>0,20 M</b> · [SO₄²⁻] = 3 · 0,10 = <b>0,30 M</b>."
    ]) +
    "<p>En la parte final del tema verás <b>todas las demás formas de expresar la concentración</b> (porcentaje, g/L, molalidad, fracción molar, ppm), cómo pasar de unas a otras, cómo preparar una disolución en el laboratorio y cómo diluirla.</p>";

  B.parte.t4a = { secciones: secciones };
})(window);
