/* ============================================================
   Física y Química I · ampliaciones · Tema 5: Estequiometría de las reacciones químicas
   (parte A: ampliación de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t5/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Ajustar una ecuación química
  secciones[0] =
    "<h5>Qué es una reacción química y cómo se escribe</h5>" +
    "<p>En una <b>reacción química</b> unas sustancias (los <b>reactivos</b>) se transforman en otras distintas (los <b>productos</b>): se rompen unos enlaces y se forman otros, de modo que los mismos átomos quedan colocados de otra manera. Se nota porque aparece algo nuevo: un gas que burbujea, un sólido que se forma en el fondo del tubo (un <b>precipitado</b>), un cambio de color o de olor, o un desprendimiento de calor o de luz. Para describirla se usa una <b>ecuación química</b>: los reactivos a la izquierda, los productos a la derecha y una flecha que significa «se transforman en».</p>" +
    "<p>Muchas ecuaciones llevan además, detrás de cada fórmula, una pequeña letra entre paréntesis con el <b>estado físico</b>: <b>(s)</b> sólido, <b>(l)</b> líquido, <b>(g)</b> gas y <b>(aq)</b> disuelto en agua («acuoso»). Y sobre la flecha pueden ir las condiciones: un triángulo Δ si hay que calentar, o el nombre de un <b>catalizador</b>. Por ejemplo, la ecuación de la formación del amoníaco se escribe N₂(g) + H₂(g) → NH₃(g). Pero todavía no está terminada: le falta ajustarse.</p>" +
    "<h5>Por qué hay que ajustar</h5>" +
    "<p>La ley de Lavoisier (Tema 4) dice que en una reacción no aparecen ni desaparecen átomos: <b>los de los reactivos son exactamente los mismos que los de los productos</b>, sólo reorganizados. Una ecuación sin ajustar, como N₂ + H₂ → NH₃, incumple esa ley: a la izquierda hay 2 átomos de N y a la derecha sólo 1; a la izquierda hay 2 de H y a la derecha 3. Es como una receta de cocina sin cantidades. <b>Ajustar</b> es poner unos números delante de cada fórmula, los <b>coeficientes estequiométricos</b>, de modo que haya el <b>mismo número de átomos de cada elemento a los dos lados</b>.</p>" +
    "<h5>Las reglas que no se pueden saltar</h5>" +
    "<ul>" +
    "<li><b>Sólo se tocan los coeficientes</b> (los números grandes de delante), <b>nunca los subíndices</b>. Cambiar un subíndice cambia la sustancia: H₂O es agua y H₂O₂ es agua oxigenada, que se comporta como un compuesto muy distinto. Si para «cuadrar» el oxígeno escribes H₂O₂ en vez de H₂O, has inventado una reacción diferente.</li>" +
    "<li><b>El coeficiente multiplica toda la fórmula</b>, incluido lo que hay dentro de un paréntesis. 3 Ca(OH)₂ significa 3 átomos de Ca, <b>6</b> de O y <b>6</b> de H (3 · 2 en cada caso).</li>" +
    "<li>El coeficiente 1 <b>no se escribe</b>.</li>" +
    "<li>Los coeficientes finales deben ser <b>enteros</b> y lo más <b>pequeños</b> posible: 2 H₂ + O₂ → 2 H₂O es correcta; 4 H₂ + 2 O₂ → 4 H₂O también está ajustada, pero no es la forma reducida (se pueden dividir todos entre 2).</li>" +
    "<li>Las <b>fórmulas deben estar bien escritas antes de empezar</b> (el oxígeno es O₂, el nitrógeno N₂, el cloro Cl₂…). Si una fórmula está mal, no hay coeficientes que arreglen la ecuación.</li>" +
    "</ul>" +
    "<h5>Cómo contar átomos sin equivocarse</h5>" +
    "<p>El recuento es el corazón del ajuste, y casi todos los errores vienen de contar mal. La regla es: <b>átomos de un elemento = coeficiente × subíndice × (multiplicador del paréntesis, si lo hay)</b>.</p>" +
    tabla(["Fórmula con coeficiente", "Qué átomos hay", "Cuenta"], [
      ["2 H₂O", "4 H y 2 O", "2 · 2 = 4 de H; 2 · 1 = 2 de O"],
      ["3 Ca(OH)₂", "3 Ca, 6 O y 6 H", "el paréntesis multiplica: 3 · (1 O) · 2 = 6"],
      ["2 Al₂(SO₄)₃", "4 Al, 6 S y 24 O", "2 · 2 = 4; 2 · 1 · 3 = 6; 2 · 4 · 3 = 24"],
      ["2 (NH₄)₂SO₄", "4 N, 16 H, 2 S y 8 O", "2 · 1 · 2 = 4 N; 2 · 4 · 2 = 16 H"],
      ["5 O₂", "10 O", "5 · 2 = 10"]
    ]) +
    "<h5>El método de tanteo, paso a paso</h5>" +
    "<ol>" +
    "<li><b>Escribe las fórmulas correctas</b> de todas las sustancias y la flecha.</li>" +
    "<li><b>Haz una lista de los átomos</b> de cada elemento a la izquierda y a la derecha.</li>" +
    "<li>Empieza por el elemento que <b>aparece en una sola sustancia de cada lado</b> y deja para el final los que aparecen en varias. Como regla práctica: primero los <b>metales</b> y el <b>carbono</b>, luego los demás no metales, después el <b>hidrógeno</b> y, por último, el <b>oxígeno</b> (que suele estar en muchas sustancias y, si hay O₂ libre, se ajusta el último).</li>" +
    "<li><b>Cuadra un elemento cada vez</b> poniendo un coeficiente donde haga falta.</li>" +
    "<li><b>Vuelve a contar todo</b> después de cada cambio: cambiar un coeficiente altera los demás elementos de esa fórmula.</li>" +
    "<li><b>Reduce</b> si todos los coeficientes tienen un divisor común y comprueba una última vez.</li>" +
    "</ol>" +
    ejemplo("Un ejemplo sencillo: el amoníaco", "Ajusta N₂ + H₂ → NH₃.", [
      "Contamos: izquierda N = 2, H = 2; derecha N = 1, H = 3.",
      "Empezamos por el N (aparece en una sola sustancia de cada lado): ponemos un 2 delante del NH₃: N₂ + H₂ → 2 NH₃. Ahora a la derecha N = 2 ✓, H = 6.",
      "Para el H necesitamos 6 a la izquierda: 3 H₂ (3 · 2 = 6): N₂ + 3 H₂ → 2 NH₃.",
      "Recuento final: N (2 = 2 ✓) y H (6 = 6 ✓). <b>Ajustada</b>."
    ]) +
    ejemplo("Combustión del propano (el gas de las bombonas)", "Ajusta C₃H₈ + O₂ → CO₂ + H₂O.", [
      "Empezamos por el C (sólo está en el C₃H₈ y en el CO₂): 3 átomos a la izquierda → 3 CO₂.",
      "Seguimos por el H (sólo en el C₃H₈ y en el H₂O): 8 átomos a la izquierda → 4 H₂O (4 · 2 = 8).",
      "Dejamos el O para el final. A la derecha: 3 · 2 + 4 · 1 = 6 + 4 = 10 átomos de O → hacen falta 5 O₂ (5 · 2 = 10).",
      "<b>C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O</b>. Recuento: C 3 = 3, H 8 = 8, O 10 = 10 ✓."
    ]) +
    ejemplo("Cuando sale un número impar de oxígenos: usar fracciones y multiplicar", "Ajusta la combustión del octano (gasolina): C₈H₁₈ + O₂ → CO₂ + H₂O.", [
      "C: 8 → 8 CO₂. H: 18 → 9 H₂O (9 · 2 = 18).",
      "O a la derecha: 8 · 2 + 9 = 16 + 9 = 25. Con O₂ a la izquierda necesitaríamos 25/2 = 12,5 moléculas: C₈H₁₈ + <sup>25</sup>⁄<sub>2</sub> O₂ → 8 CO₂ + 9 H₂O.",
      "Para eliminar la fracción multiplicamos <b>toda</b> la ecuación por 2: <b>2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O</b>.",
      "Recuento: C 16 = 16; H 36 = 36; O 50 = 32 + 18 = 50 ✓."
    ]) +
    ejemplo("Un óxido de hierro: ajustar con números pares e impares", "Ajusta Fe + O₂ → Fe₂O₃.", [
      "O: en el O₂ hay un número par (2, 4, 6…) y en el Fe₂O₃ un múltiplo de 3 (3, 6, 9…). El mínimo común múltiplo de 2 y 3 es 6: hacen falta 6 átomos de O a cada lado → 3 O₂ y 2 Fe₂O₃.",
      "Ahora el Fe a la derecha es 2 · 2 = 4 → 4 Fe a la izquierda.",
      "<b>4 Fe + 3 O₂ → 2 Fe₂O₃</b>. Recuento: Fe 4 = 4; O 6 = 6 ✓."
    ]) +
    ejemplo("Un metal con un ácido", "Ajusta Al + HCl → AlCl₃ + H₂.", [
      "Al: 1 = 1. Cl: 1 a la izquierda y 3 a la derecha → 3 HCl: Al + 3 HCl → AlCl₃ + H₂.",
      "H: 3 a la izquierda; a la derecha el H₂ viene de 2 en 2. Para que sea un número par usamos el mínimo común múltiplo de 3 y 2: 6. Entonces 6 HCl y 3 H₂; y, para conservar el Cl, 2 AlCl₃, con lo que hacen falta 2 Al.",
      "<b>2 Al + 6 HCl → 2 AlCl₃ + 3 H₂</b>. Recuento: Al 2 = 2; H 6 = 6; Cl 6 = 6 ✓."
    ]) +
    "<h5>Los grupos de átomos que se mantienen unidos: tratarlos como un bloque</h5>" +
    "<p>En muchas reacciones (ácido + base, sales…) un grupo de átomos como el <b>sulfato SO₄</b>, el <b>hidróxido OH</b>, el <b>nitrato NO₃</b> o el <b>fosfato PO₄</b> pasa intacto de un lado a otro de la ecuación. En esos casos se pueden contar <b>como un solo bloque</b> y el ajuste es mucho más rápido.</p>" +
    ejemplo("Un ácido con un hidróxido", "Ajusta Ca(OH)₂ + H₃PO₄ → Ca₃(PO₄)₂ + H₂O.", [
      "Calcio: a la derecha 3 → 3 Ca(OH)₂. Fosfato (bloque PO₄): a la derecha 2 → 2 H₃PO₄. Ahora: 3 Ca(OH)₂ + 2 H₃PO₄ → Ca₃(PO₄)₂ + H₂O.",
      "H: a la izquierda 3 · 2 + 2 · 3 = 12; a la derecha cada H₂O aporta 2 → 6 H₂O. Comprobamos el O: izquierda 3 · 2 + 2 · 4 = 14; derecha 8 + 6 = 14 ✓.",
      "<b>3 Ca(OH)₂ + 2 H₃PO₄ → Ca₃(PO₄)₂ + 6 H₂O</b>."
    ]) +
    "<h5>El método algebraico, para las ecuaciones difíciles</h5>" +
    "<p>Si el tanteo se enreda, se puede usar el álgebra: se ponen <b>letras</b> como coeficientes (a, b, c, d…), se escribe una <b>ecuación por cada elemento</b> (átomos a la izquierda = átomos a la derecha), se da el valor 1 a una letra y se resuelve el sistema. Es el método que usan los programas de ordenador, y funciona siempre que la ecuación se pueda ajustar.</p>" +
    ejemplo("Ajuste algebraico", "Ajusta a Al₂(SO₄)₃ + b NaOH → c Al(OH)₃ + d Na₂SO₄.", [
      "Al: 2a = c · S: 3a = d · Na: b = 2d · O: 12a + b = 3c + 4d · H: b = 3c.",
      "Damos a = 1. Entonces c = 2 y d = 3 (de Al y S). De Na: b = 2 · 3 = 6.",
      "Comprobamos con H: b = 3c → 6 = 3 · 2 ✓. Y con O: 12 + 6 = 18 y 3 · 2 + 4 · 3 = 6 + 12 = 18 ✓.",
      "<b>Al₂(SO₄)₃ + 6 NaOH → 2 Al(OH)₃ + 3 Na₂SO₄</b>."
    ]) +
    "<p>Prueba tú mismo con el ajustador: elige una ecuación, usa los botones − y + para cambiar los coeficientes y mira cómo cambia, elemento a elemento, el recuento de átomos. Cuando lo tengas, comprueba tu respuesta con «Ajustar automáticamente».</p>" +
    w("q5_ajuste") +
    "<h5>Lista de comprobación final</h5>" +
    "<ul>" +
    "<li>¿Hay el <b>mismo número de átomos de cada elemento</b> a los dos lados? (Cuéntalos de nuevo, uno por uno.)</li>" +
    "<li>¿Son los coeficientes <b>enteros</b> y <b>los más pequeños posibles</b>?</li>" +
    "<li>¿He respetado los <b>subíndices</b> de todas las fórmulas?</li>" +
    "<li>¿Tengo claro qué sustancia es reactivo y cuál producto, y en qué estado está cada una?</li>" +
    "</ul>" +
    ojo("Tres errores que se repiten una y otra vez: (1) <b>cambiar un subíndice</b> para que cuadre (escribir H₂O₂ en vez de H₂O); (2) <b>olvidar que el coeficiente multiplica el paréntesis</b> (3 Ca(OH)₂ tiene 6 O, no 2); (3) <b>dar por buena la ecuación sin recontar</b> después del último cambio. La solución de los tres es la misma: recuento completo al final.");

  // ---------------------------------------------------------------- 2. Qué significan los coeficientes
  secciones[1] =
    "<h5>Los coeficientes cuentan partículas, no gramos</h5>" +
    "<p>Una vez ajustada, la ecuación se convierte en una <b>receta con proporciones exactas</b>. Pero hay que leerla bien: los coeficientes dicen <b>cuántas partículas</b> (átomos, moléculas, unidades fórmula) reaccionan y se forman, <b>en proporción</b>. En 2 H₂ + O₂ → 2 H₂O, dos moléculas de hidrógeno reaccionan con una molécula de oxígeno para dar dos moléculas de agua. Como un mol es simplemente un número muy grande de partículas (6,022·10²³), la misma frase vale multiplicando por el número de Avogadro: <b>2 mol de H₂ reaccionan con 1 mol de O₂ para dar 2 mol de H₂O</b>. Por eso se dice que los coeficientes son <b>moles</b>.</p>" +
    "<p>Nunca se leen en gramos: «2 g de H₂ con 1 g de O₂ dan 2 g de agua» es un error muy frecuente. Los gramos son de otra naturaleza, porque cada partícula tiene su propia masa. Para saber las masas hay que multiplicar los moles por las masas molares.</p>" +
    "<h5>Una misma ecuación, varias lecturas</h5>" +
    tabla(["", "2 H₂", "O₂", "2 H₂O"], [
      ["Moléculas", "2", "1", "2"],
      ["Moles", "2 mol", "1 mol", "2 mol"],
      ["Masa (H = 1; O = 16)", "2 · 2 = 4 g", "1 · 32 = 32 g", "2 · 18 = 36 g"],
      ["Volumen (gases, misma P y T)", "2 volúmenes", "1 volumen", "2 volúmenes (si es vapor)"],
      ["Volumen en CN (gases)", "44,8 L", "22,4 L", "—  (a 0 °C el agua es líquida)"]
    ]) +
    "<p>Fíjate en la fila de las masas: 4 g + 32 g = 36 g. <b>La masa total se conserva</b> (Lavoisier), aunque las masas de cada sustancia no tengan nada que ver con los coeficientes. Y ahora la fila de los moles: 2 + 1 = 3 mol de reactivos y sólo 2 mol de productos. <b>Los moles totales no se conservan</b>, ni tampoco el número de moléculas ni los volúmenes de los gases: lo único que se conserva es el número de átomos de cada elemento y, por tanto, la masa.</p>" +
    ejemplo("Cuatro lecturas de la síntesis del amoníaco", "Lee N₂ + 3 H₂ → 2 NH₃ en moléculas, moles, masa y volumen en CN. (N = 14; H = 1)", [
      "Moléculas: 1 de N₂ con 3 de H₂ dan 2 de NH₃.",
      "Moles: 1 mol de N₂ + 3 mol de H₂ → 2 mol de NH₃.",
      "Masas: 1 · 28 = 28 g de N₂; 3 · 2 = 6 g de H₂; 2 · 17 = 34 g de NH₃. Comprobación: 28 + 6 = 34 g ✓ (se conserva la masa).",
      "Volúmenes de gas en CN (22,4 L/mol): 22,4 L + 67,2 L → 44,8 L. Los volúmenes (1 + 3 = 4 → 2) <b>no</b> se conservan."
    ]) +
    "<h5>La razón estequiométrica: tu factor de conversión</h5>" +
    "<p>La información más útil de una ecuación ajustada son los <b>cocientes entre coeficientes</b>. En N₂ + 3 H₂ → 2 NH₃ se cumple que por cada mol de N₂ que reacciona lo hacen 3 mol de H₂ y se forman 2 mol de NH₃. Esas razones se pueden escribir de muchas maneras: 1 mol N₂ / 3 mol H₂, 3 mol H₂ / 2 mol NH₃, 2 mol NH₃ / 1 mol N₂… Cada una es un <b>factor de conversión</b> que permite pasar de los moles de una sustancia a los moles de cualquier otra.</p>" +
    tabla(["Sustancias", "Razón (coeficiente / coeficiente)", "Significado"], [
      ["N₂ : H₂", "1 : 3", "por cada mol de N₂ se consumen 3 mol de H₂"],
      ["N₂ : NH₃", "1 : 2", "por cada mol de N₂ se forman 2 mol de NH₃"],
      ["H₂ : NH₃", "3 : 2", "por cada 3 mol de H₂ se forman 2 mol de NH₃"]
    ]) +
    "<h5>El «avance» de la reacción: cuántas veces ocurre</h5>" +
    "<p>Una forma muy cómoda de pensar es contar <b>cuántas veces ocurre la reacción tal como está escrita</b>. Llamémoslo ξ («avance»). Si la reacción ocurre ξ veces, se consumen c × ξ moles de cada reactivo y se forman c × ξ moles de cada producto, siendo c el coeficiente. Para N₂ + 3 H₂ → 2 NH₃ y ξ = 2 : se consumen 2 mol de N₂, 6 mol de H₂ y se forman 4 mol de NH₃. Este número ξ, que es igual a <b>moles ÷ coeficiente</b> de cualquier sustancia que participe, será la clave del reactivo limitante.</p>" +
    "<h5>Estado físico y condiciones</h5>" +
    "<p>Los símbolos (s), (l), (g) y (aq) no afectan a los coeficientes, pero sí a lo que se puede calcular después: sólo se puede hablar del <b>volumen de un gas</b> (g) o de la <b>concentración de una disolución</b> (aq). Un detalle: el agua de una reacción puede ser líquida (a temperatura ambiente) o vapor (si se produce en una llama o a más de 100 °C); eso cambia si se puede contar o no como un volumen de gas.</p>" +
    ojo("Mucha gente aprende «los coeficientes son moles» pero sigue razonando en gramos al calcular. Si te sorprendes escribiendo «2 g de H₂ + 1 g de O₂», para: la ecuación ajustada sólo compara <b>moles</b> (y, en los gases, volúmenes a igual P y T). Cualquier cálculo con masas pasa por la masa molar.");

  // ---------------------------------------------------------------- 3. Cálculos mol-mol
  secciones[2] =
    "<h5>La idea: una regla de tres con los coeficientes</h5>" +
    "<p>Con la ecuación ajustada, calcular la cantidad de una sustancia a partir de la de otra es una <b>proporción directa</b>: si la reacción dobla la cantidad de uno, dobla la de todos. Hay dos maneras equivalentes de hacerlo:</p>" +
    "<ul>" +
    "<li><b>Regla de tres:</b> «si 1 mol de N₂ produce 2 mol de NH₃, 3 mol de N₂ producirán x».</li>" +
    "<li><b>Factor de conversión:</b> n(buscada) = n(dato) × <b>coeficiente de la buscada / coeficiente del dato</b>.</li>" +
    "</ul>" +
    H.formula("n(B) = n(A) · " + fr("coef. de B", "coef. de A")) +
    "<p>El factor de conversión tiene la ventaja de que se ve el análisis dimensional: «mol de A» se cancela y queda «mol de B». Escrito con unidades: 4 <i>mol H₂</i> × <span class='frac'><span class='num'>1 mol O₂</span><span class='den'>2 <i>mol H₂</i></span></span> = 2 mol O₂.</p>" +
    ejemplo("Moles de reactivos y productos", "Con 2 H₂ + O₂ → 2 H₂O, si reaccionan 4 mol de H₂, ¿cuántos moles de O₂ se necesitan y cuántos de H₂O se forman?", [
      "n(O₂) = 4 mol H₂ · 1 mol O₂ / 2 mol H₂ = <b>2 mol de O₂</b>.",
      "n(H₂O) = 4 mol H₂ · 2 mol H₂O / 2 mol H₂ = <b>4 mol de H₂O</b>.",
      "Comprobación: 4 + 2 = 6 mol de reactivos y 4 mol de productos; no se conserva el número de moles, pero sí los átomos: 8 H y 4 O a cada lado."
    ]) +
    ejemplo("Combustión del propano", "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. ¿Cuántos moles de O₂ se consumen y cuántos de CO₂ y H₂O se forman al quemar 2,5 mol de propano?", [
      "Avance de la reacción: ξ = 2,5 / 1 = 2,5.",
      "O₂: 5 · 2,5 = <b>12,5 mol</b>. CO₂: 3 · 2,5 = <b>7,5 mol</b>. H₂O: 4 · 2,5 = <b>10 mol</b>."
    ]) +
    ejemplo("Al revés: de qué parto para obtener algo", "En la síntesis N₂ + 3 H₂ → 2 NH₃, ¿cuántos moles de H₂ hacen falta para obtener 10 mol de NH₃?", [
      "n(H₂) = 10 mol NH₃ · 3 mol H₂ / 2 mol NH₃ = <b>15 mol de H₂</b>.",
      "Y de N₂: 10 · 1/2 = 5 mol."
    ]) +
    "<h5>Plan de ataque en tres líneas</h5>" +
    "<ol>" +
    "<li><b>Ajusta</b> la ecuación (si no lo está).</li>" +
    "<li><b>Subraya</b> la sustancia del dato y la de la incógnita y anota sus coeficientes.</li>" +
    "<li><b>Multiplica</b> los moles del dato por (coeficiente de la incógnita / coeficiente del dato).</li>" +
    "</ol>" +
    "<h5>Cuando intervienen varias sustancias a la vez</h5>" +
    "<p>Todas las razones salen de la misma ecuación, así que si conoces una cantidad puedes calcular <b>todas las demás de una vez</b>. Por ejemplo, en el alto horno Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂, con 4 mol de Fe₂O₃: se consumen 12 mol de CO y se obtienen 8 mol de Fe y 12 mol de CO₂.</p>" +
    ejemplo("El alto horno", "Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. ¿Cuántos moles de Fe se obtienen con 4 mol de Fe₂O₃, y cuántos moles de CO se consumen?", [
      "Fe: 4 · 2/1 = <b>8 mol</b>.",
      "CO: 4 · 3/1 = <b>12 mol</b>. (Y 12 mol de CO₂.)"
    ]) +
    "<h5>Con cantidades que no son enteras</h5>" +
    "<p>Los números no tienen por qué ser «redondos». Si reaccionan 0,35 mol de Zn con HCl (Zn + 2 HCl → ZnCl₂ + H₂), se necesitan 0,70 mol de HCl y se desprenden 0,35 mol de H₂. La proporción funciona igual con decimales y fracciones.</p>" +
    "<h5>Cuidado con la ecuación sin ajustar</h5>" +
    "<p>La proporción es la de la ecuación <b>ajustada</b>. Si calculas con los coeficientes de «N₂ + H₂ → NH₃» (todos 1) obtendrías que 1 mol de N₂ da 1 mol de NH₃, cuando en realidad da 2. Es el error de partida más caro: <b>cualquier problema de estequiometría empieza por comprobar que la ecuación está bien ajustada</b>.</p>" +
    ojo("Nunca compares <b>moles de una sustancia con gramos de otra</b>, ni uses coeficientes con gramos. Si los datos están en gramos, pásalos primero a moles (siguiente apartado).");

  // ---------------------------------------------------------------- 4. Cálculos masa-masa
  secciones[3] =
    "<h5>La cadena de tres eslabones</h5>" +
    "<p>En el laboratorio (y en los problemas) se pesa en gramos. Como la proporción de la ecuación sólo vale en moles, hay que pasar por ellos. El camino siempre es el mismo:</p>" +
    H.formula("masa de A &nbsp;→&nbsp; moles de A &nbsp;→&nbsp; moles de B &nbsp;→&nbsp; masa de B") +
    tabla(["Paso", "Qué hago", "Cómo"], [
      ["1", "gramos de A → moles de A", "n(A) = m(A) / M(A)"],
      ["2", "moles de A → moles de B", "n(B) = n(A) · coef(B)/coef(A)"],
      ["3", "moles de B → gramos de B", "m(B) = n(B) · M(B)"]
    ]) +
    "<p>Los tres eslabones se pueden escribir en una sola línea con factores de conversión, y con las unidades se ve que todo cuadra: g A × (1 mol A / M<sub>A</sub> g A) × (coef B mol B / coef A mol A) × (M<sub>B</sub> g B / 1 mol B) = g B.</p>" +
    "<h5>Otras entradas y salidas de la cadena</h5>" +
    "<p>El primer y el último eslabón cambian según los datos: lo que no cambia es que <b>todo pasa por el mol</b>.</p>" +
    tabla(["Dato o resultado", "→ moles", "moles →"], [
      ["masa (g)", "÷ masa molar", "× masa molar"],
      ["volumen de gas en CN (L)", "÷ 22,4", "× 22,4"],
      ["volumen de gas (L) a P y T", "n = PV / (RT)", "V = nRT / P"],
      ["partículas (átomos, moléculas)", "÷ 6,022·10²³", "× 6,022·10²³"],
      ["disolución de molaridad M", "n = M · V (L)", "V = n / M"]
    ]) +
    ejemplo("La descomposición de la caliza (ejemplo guiado)", "CaCO₃ → CaO + CO₂. ¿Cuántos gramos de CaO se obtienen a partir de 50 g de CaCO₃? (Ca = 40; C = 12; O = 16)", [
      "Masas molares: M(CaCO₃) = 40 + 12 + 48 = 100 g/mol; M(CaO) = 56 g/mol; M(CO₂) = 44 g/mol.",
      "Paso 1: n(CaCO₃) = 50 / 100 = 0,5 mol.",
      "Paso 2: la proporción es 1 : 1, así que n(CaO) = 0,5 mol (y también 0,5 mol de CO₂).",
      "Paso 3: m(CaO) = 0,5 · 56 = <b>28 g</b>. (Y m(CO₂) = 0,5 · 44 = 22 g.)",
      "Comprobación de Lavoisier: 28 + 22 = 50 g ✓."
    ]) +
    ejemplo("Magnesio y oxígeno", "2 Mg + O₂ → 2 MgO. ¿Cuántos gramos de oxígeno hacen falta para quemar 12 g de magnesio y cuántos gramos de MgO se forman? (Mg = 24; O = 16)", [
      "n(Mg) = 12 / 24 = 0,5 mol.",
      "n(O₂) = 0,5 · 1/2 = 0,25 mol → m(O₂) = 0,25 · 32 = <b>8 g</b>.",
      "n(MgO) = 0,5 · 2/2 = 0,5 mol → m(MgO) = 0,5 · 40 = <b>20 g</b>.",
      "Comprobación: 12 g + 8 g = 20 g ✓."
    ]) +
    ejemplo("Más de dos pasos de ida y vuelta: la respiración", "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O. Si «quemamos» 90 g de glucosa, ¿cuántos gramos de O₂ se consumen y cuántos de CO₂ y de H₂O se forman? (C = 12; H = 1; O = 16)", [
      "M(glucosa) = 6·12 + 12 + 6·16 = 180 g/mol → n = 90 / 180 = 0,5 mol.",
      "O₂: 0,5 · 6 = 3 mol → 3 · 32 = <b>96 g</b>.",
      "CO₂: 0,5 · 6 = 3 mol → 3 · 44 = <b>132 g</b>. H₂O: 0,5 · 6 = 3 mol → 3 · 18 = <b>54 g</b>.",
      "Comprobación de la masa: 90 + 96 = 186 g y 132 + 54 = 186 g ✓."
    ]) +
    ejemplo("Un dato en gramos y la respuesta en moléculas", "En N₂ + 3 H₂ → 2 NH₃ se hacen reaccionar 56 g de N₂. ¿Cuántas moléculas de NH₃ se forman? ¿Y cuántos gramos de H₂ se consumen? (N = 14; H = 1)", [
      "n(N₂) = 56 / 28 = 2 mol → n(NH₃) = 2 · 2/1 = 4 mol; n(H₂) = 2 · 3/1 = 6 mol.",
      "Moléculas de NH₃: 4 · 6,022·10²³ = <b>2,41·10²⁴</b>.",
      "Masa de H₂: 6 · 2 = <b>12 g</b>. (Masa de NH₃: 4 · 17 = 68 g = 56 + 12 ✓.)"
    ]) +
    "<h5>Un atajo para no mezclar unidades: el factor gravimétrico</h5>" +
    "<p>Cuando haces muchos cálculos del mismo tipo conviene saber que la cadena completa equivale a una sola proporción entre masas:</p>" +
    H.formula("m(B) = m(A) · " + fr("coef(B) · M(B)", "coef(A) · M(A)")) +
    "<p>Por ejemplo, en CaCO₃ → CaO + CO₂: m(CaO) = 50 · (1 · 56)/(1 · 100) = 28 g. Pero este atajo <b>sólo es correcto si pones los coeficientes <i>junto a las masas molares</i></b>: es decir, la razón de masas no es la razón de coeficientes, sino coef × M. La razón de masas de H₂ y O₂ en 2 H₂ + O₂ → 2 H₂O es 4 : 32 = 1 : 8, no 2 : 1.</p>" +
    "<h5>Escalas de laboratorio y de industria</h5>" +
    "<p>La estequiometría no depende de la escala: si 100 g de CaCO₃ dan 56 g de CaO, entonces 100 kg dan 56 kg y 100 toneladas dan 56 toneladas. Las proporciones en masa son las mismas siempre que las dos cantidades estén en la misma unidad. Es lo que permite que una fábrica de cal viva calcule cuánta caliza necesita para producir una tonelada: 1 000 kg de CaCO₃ dan 560 kg de CaO y 440 kg de CO₂.</p>" +
    "<h5>Cifras significativas y redondeos</h5>" +
    "<p>Conserva todos los decimales de la calculadora durante los pasos intermedios y redondea <b>sólo el resultado final</b> (a tantas cifras significativas como el dato con menos). Si redondeas los moles en medio de la cadena, el error puede crecer. Pon siempre la unidad (g, mol, L).</p>" +
    "<p>Para practicar sin hacer las cuentas a mano, este simulador te da la tabla completa a partir de un único dato: pasa los datos a moles, divide entre el coeficiente y multiplica por el de cada sustancia. Puedes empezar desde gramos, moles, litros de gas en CN o número de partículas.</p>" +
    w("q5_tabla") +
    ojo("«Masa → masa» no es un salto directo: <b>nunca se aplican los coeficientes a los gramos</b>. Si el resultado de un problema sale con la masa de un producto mayor que la masa total de reactivos, hay un error (se rompería Lavoisier).");

  // ---------------------------------------------------------------- 5. Reactivo limitante
  secciones[4] =
    "<h5>Una analogía: fabricar bicicletas</h5>" +
    "<p>Una bicicleta necesita 1 cuadro y 2 ruedas: «1 cuadro + 2 ruedas → 1 bicicleta». Si en el almacén hay 10 cuadros y 14 ruedas, ¿cuántas bicicletas se pueden montar? Las ruedas dan para 14/2 = 7; los cuadros para 10. Se montan <b>7</b>, y entonces las ruedas se han acabado: son el factor <b>limitante</b>. Quedan 3 cuadros sin usar: son el <b>exceso</b>. Una reacción química funciona exactamente igual, con moles.</p>" +
    "<h5>Qué es el reactivo limitante</h5>" +
    "<p>En la práctica, casi nunca se mezclan los reactivos en la proporción exacta que pide la ecuación. El <b>reactivo limitante</b> es el que se agota primero: cuando se acaba, la reacción se detiene aunque quede cantidad del otro. Éste, el <b>reactivo en exceso</b>, sobra (sigue en la mezcla final). <b>La cantidad de producto que se forma depende sólo del limitante</b>: todos los cálculos de productos se hacen con él, nunca con el reactivo en exceso.</p>" +
    "<h5>Dos métodos para encontrarlo</h5>" +
    "<p><b>Método 1: moles ÷ coeficiente.</b> Para cada reactivo calcula n/coef (es el número de veces que la reacción podría ocurrir con esa cantidad: el avance). El <b>menor</b> cociente corresponde al limitante.</p>" +
    "<p><b>Método 2: comparar lo necesario con lo disponible.</b> Se elige un reactivo, se calcula cuánto del otro haría falta para consumirlo entero y se compara con lo que hay. Si hay menos de lo necesario, ese otro es el limitante.</p>" +
    ejemplo("El ejemplo del temario, por los dos métodos", "2 H₂ + O₂ → 2 H₂O. Se mezclan 3 mol de H₂ con 1 mol de O₂. ¿Cuál es el limitante y cuánta agua se forma?", [
      "Método 1: H₂: 3/2 = 1,5 · O₂: 1/1 = 1. El menor es el del O₂ → <b>O₂ limitante</b>.",
      "Método 2: para 1 mol de O₂ harían falta 2 mol de H₂ y hay 3: sobra H₂. Confirma que el O₂ se acaba primero.",
      "Producto: ξ = 1 → n(H₂O) = 2 · 1 = <b>2 mol</b>. Se han gastado 2 mol de H₂, luego <b>sobra 1 mol de H₂</b> (3 − 2)."
    ]) +
    ejemplo("Con masas: amoníaco", "N₂ + 3 H₂ → 2 NH₃. Se mezclan 28 g de N₂ con 10 g de H₂. Determina el limitante, la masa de NH₃ y la masa que sobra del otro reactivo. (N = 14; H = 1)", [
      "n(N₂) = 28/28 = 1 mol · n(H₂) = 10/2 = 5 mol.",
      "Moles ÷ coeficiente: N₂: 1/1 = 1 · H₂: 5/3 = 1,67. El menor es N₂ → <b>N₂ limitante</b>.",
      "NH₃: 1 · 2 = 2 mol → 2 · 17 = <b>34 g</b>.",
      "H₂ consumido: 3 · 1 = 3 mol; sobra 5 − 3 = 2 mol = <b>4 g de H₂</b>.",
      "Comprobación: antes 28 + 10 = 38 g; después 34 + 4 = 38 g ✓."
    ]) +
    ejemplo("Hierro y azufre", "Fe + S → FeS. Se calientan 14 g de Fe con 10 g de S. ¿Qué cantidad de FeS se forma y qué sobra? (Fe = 56; S = 32)", [
      "n(Fe) = 14/56 = 0,25 mol · n(S) = 10/32 = 0,3125 mol; la ecuación es 1 : 1.",
      "Cocientes: 0,25 y 0,3125 → <b>Fe limitante</b>.",
      "FeS: 0,25 mol · 88 g/mol = <b>22 g</b>. Sobra S: 0,3125 − 0,25 = 0,0625 mol = <b>2 g</b>.",
      "Comprobación: 14 + 10 = 24 g = 22 + 2 ✓."
    ]) +
    "<h5>Un error muy frecuente: mirar los moles o los gramos sueltos</h5>" +
    "<p>El limitante <b>no</b> es el reactivo del que hay menos gramos, ni el que tiene menos moles: depende de los <b>coeficientes</b>. Por ejemplo, en 2 H₂ + O₂ → 2 H₂O con 2,5 mol de H₂ y 2 mol de O₂: hay <i>más</i> moles de H₂ que de O₂ y, sin embargo, el limitante es el H₂ (2,5/2 = 1,25 frente a 2/1 = 2). Si hubieras elegido «el que tiene menos moles» habrías fallado. La razón es que el H₂ se gasta al doble de velocidad que el O₂: se necesitan 2 mol de H₂ por cada mol de O₂.</p>" +
    "<h5>Cuánto sobra y qué es el «porcentaje de exceso»</h5>" +
    "<p>Una vez conocido el limitante, la cantidad que reacciona del otro reactivo es la que pide la estequiometría, y el resto es el exceso. Se puede expresar como un porcentaje sobre lo necesario:</p>" +
    H.formula("% exceso = " + fr("cantidad disponible − cantidad necesaria", "cantidad necesaria") + " · 100") +
    "<p>En el ejemplo del amoníaco (5 mol de H₂ disponibles frente a 3 necesarios): (5 − 3)/3 · 100 = 66,7 % de exceso de H₂. En la industria y en los motores se usa <b>a propósito un exceso del reactivo barato</b> (aire en las combustiones, por ejemplo) para asegurarse de que se consume por completo el reactivo valioso.</p>" +
    "<h5>Procedimiento general, paso a paso</h5>" +
    "<ol>" +
    "<li>Ajusta la ecuación.</li>" +
    "<li>Pasa <b>todos</b> los reactivos a moles (si te dan gramos, n = m/M; si son litros de gas en CN, n = V/22,4…).</li>" +
    "<li>Divide los moles de cada reactivo entre su coeficiente: el menor valor marca el limitante.</li>" +
    "<li>Calcula los productos con el <b>limitante</b> (n × coef).</li>" +
    "<li>Calcula el exceso: lo que había menos lo que ha reaccionado.</li>" +
    "<li>Comprueba la masa total: antes = después.</li>" +
    "</ol>" +
    "<p>Prueba con el simulador: cambia las cantidades con los deslizadores (en moles o en gramos) y mira cómo cambia el gráfico «al empezar / al acabar». Verás que cuando el reactivo limitante cambia, cambia también quién sobra, pero la <b>masa total</b> sigue siendo la misma.</p>" +
    w("q5_limitante") +
    ojo("Si el enunciado da la cantidad de <b>un solo</b> reactivo y dice que el otro está «en exceso» o «en cantidad suficiente», el limitante ya está dado: haz el cálculo con el que tiene dato. Sólo hay que buscar el limitante cuando dan cantidades de <b>dos o más</b> reactivos.");

  // ---------------------------------------------------------------- 6. Rendimiento y pureza
  secciones[5] =
    "<h5>Por qué casi nunca sale el 100 %</h5>" +
    "<p>Los cálculos estequiométricos dicen cuánto producto <i>podría</i> obtenerse si todo funcionara perfectamente. En la realidad hay <b>pérdidas</b>: parte del producto se queda pegado al recipiente o en el filtro; hay <b>reacciones secundarias</b> que consumen reactivo para dar otras sustancias; algunas reacciones son <b>reversibles</b> y no se completan (lo verás en Química de 2.º); el producto puede salir impuro o húmedo. Por eso hay que distinguir tres cantidades:</p>" +
    "<ul>" +
    "<li><b>Cantidad teórica</b>: lo que predice la estequiometría (con rendimiento del 100 %).</li>" +
    "<li><b>Cantidad real</b>: lo que se obtiene de verdad y se mide.</li>" +
    "<li><b>Rendimiento</b>: el cociente entre ambas.</li>" +
    "</ul>" +
    H.formula("Rendimiento (%) = " + fr("cantidad real obtenida", "cantidad teórica") + " · 100") +
    "<p>Las dos cantidades deben estar <b>en la misma unidad</b> (gramos con gramos, moles con moles, litros con litros). El rendimiento nunca puede ser mayor que el 100 % (si te sale más, hay un error o el producto no está seco ni puro).</p>" +
    ejemplo("Calcular el rendimiento", "Al calentar 500 g de CaCO₃ puro se obtienen 220 g de CaO. ¿Cuál es el rendimiento? (Ca = 40; C = 12; O = 16)", [
      "n(CaCO₃) = 500/100 = 5 mol → n(CaO) teórico = 5 mol → m teórica = 5 · 56 = 280 g.",
      "Rendimiento = 220/280 · 100 = <b>78,6 %</b>."
    ]) +
    ejemplo("Calcular cuánto se obtiene realmente", "Si el rendimiento de una síntesis es del 80 %, y la masa teórica de producto es de 25 g, ¿qué masa se obtendrá?", [
      "m real = m teórica · rendimiento/100 = 25 · 0,80 = <b>20 g</b>."
    ]) +
    "<h5>Calcular cuánto reactivo hay que usar para obtener una cantidad dada</h5>" +
    "<p>El rendimiento se aplica al <b>producto</b>, no al reactivo. Si necesitas obtener una masa dada y sabes que el proceso rinde menos del 100 %, tienes que calcular la teórica correspondiente (real ÷ rendimiento) y de ella, hacia atrás, el reactivo.</p>" +
    ejemplo("Hacia atrás", "En un proceso con un rendimiento del 85 % se quieren obtener 1 000 kg de CaO a partir de CaCO₃ puro. ¿Cuántos kg de CaCO₃ hacen falta? (Ca = 40; C = 12; O = 16)", [
      "Masa teórica necesaria: 1 000/0,85 = 1 176,5 kg de CaO.",
      "Moles de CaO: 1 176 500 g / 56 = 21 008 mol → misma cantidad de CaCO₃ (1 : 1).",
      "Masa de CaCO₃: 21 008 · 100 = 2 100 800 g = <b>2 100,8 kg</b>."
    ]) +
    "<h5>La pureza o riqueza de un reactivo</h5>" +
    "<p>Los reactivos de la naturaleza o de la industria no suelen ser sustancias puras: una caliza no es sólo CaCO₃, un mineral de hierro no es sólo Fe₂O₃, un cinc comercial lleva otros metales. <b>La pureza (o riqueza)</b> es el porcentaje en masa de la sustancia que reacciona en la muestra; el resto son <b>impurezas inertes</b> (que no participan en la reacción).</p>" +
    H.formula("m(sustancia pura) = m(muestra) · " + fr("% de pureza", "100")) +
    "<p>Antes de hacer cualquier cálculo estequiométrico hay que <b>quedarse sólo con la parte pura</b>. Una disolución también se expresa así: «HCl del 37 %» significa que de cada 100 g de disolución, 37 g son HCl (lo viste en el Tema 4).</p>" +
    ejemplo("Pureza", "¿Cuántos gramos de Zn puro hay en 200 g de un cinc del 80 % de riqueza?", [
      "m(Zn) = 200 · 0,80 = <b>160 g</b> (los otros 40 g son impurezas)."
    ]) +
    "<h5>Pureza y rendimiento juntos: el orden importa</h5>" +
    "<p>En un mismo problema pueden aparecer las dos cosas. El orden correcto sigue el camino real de los átomos: <b>pureza → estequiometría → rendimiento</b>. La pureza se aplica al principio (a la masa de la muestra del reactivo), y el rendimiento al final (a la cantidad teórica de producto).</p>" +
    ejemplo("Un problema completo", "Se calientan 500 g de una caliza del 90 % de riqueza en CaCO₃. Si el rendimiento de la descomposición es del 80 %, ¿cuántos gramos de CaO se obtienen y qué volumen de CO₂ en CN se desprende? (Ca = 40; C = 12; O = 16)", [
      "Pureza: m(CaCO₃ puro) = 500 · 0,90 = 450 g → n = 450/100 = 4,5 mol.",
      "Estequiometría (1 : 1 : 1): teóricos 4,5 mol de CaO y 4,5 mol de CO₂.",
      "Masa teórica de CaO: 4,5 · 56 = 252 g → real = 252 · 0,80 = <b>201,6 g</b>.",
      "CO₂: real = 4,5 · 0,80 = 3,6 mol → V = 3,6 · 22,4 = <b>80,6 L</b> en CN."
    ]) +
    "<h5>En la industria el rendimiento es dinero</h5>" +
    "<p>Subir un punto de rendimiento ahorra reactivos, energía y residuos. El caso más famoso es la síntesis del amoníaco (Haber-Bosch): en cada paso por el reactor sólo se transforma alrededor del 15 % de la mezcla de N₂ y H₂; lo que no ha reaccionado se separa y se <b>recircula</b>, y así el proceso global aprovecha casi todo. Otras veces se aumenta el rendimiento retirando un producto a medida que se forma o usando un catalizador (que acelera la reacción sin gastarse).</p>" +
    "<p>Prueba con el simulador: elige una reacción, cambia la pureza y mira cómo se reduce la cantidad de reactivo útil; cambia el rendimiento y mira cómo se reduce la cantidad de producto real. Puedes calcular el rendimiento (dando la masa obtenida) o la masa obtenida (dando el rendimiento).</p>" +
    w("q5_rendimiento") +
    ojo("Los errores típicos: (1) <b>aplicar el rendimiento al reactivo</b> en lugar de al producto; (2) <b>olvidar la pureza</b> y usar la masa de la muestra como si fuera todo reactivo; (3) <b>dividir al revés</b> (teórico/real); (4) mezclar unidades (gramos reales con moles teóricos). Y si el rendimiento sale mayor que el 100 %, hay un fallo en el planteamiento.");

  B.parte.t5a = { secciones: secciones };
})(window);
