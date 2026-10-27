/* ============================================================
   Matemáticas I · ampliaciones · Tema 3: Álgebra
   (polinomios, ecuaciones y sistemas)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t3/" + ref); }

  var resumen = [
    "Un <b>polinomio</b> se suma, resta y multiplica término a término; se divide con la división larga o, si el divisor es x − a, con <b>Ruffini</b>.",
    "<b>Teorema del resto</b>: el resto de dividir P(x) entre (x − a) es P(a). <b>Teorema del factor</b>: (x − a) es factor de P ⇔ P(a) = 0.",
    "Para <b>factorizar</b>: factor común → identidad notable → Ruffini con las raíces candidatas (divisores de a₀) → ecuación de 2.º grado.",
    "ax² + bx + c = 0 se resuelve con la fórmula; el <b>discriminante</b> Δ = b² − 4ac dice cuántas soluciones reales hay. Las bicuadradas se resuelven con t = x².",
    "Con raíces, denominadores o logaritmos hay que <b>comprobar siempre</b> las soluciones: pueden aparecer soluciones falsas.",
    "Las inecuaciones se resuelven con una <b>tabla de signos</b>: ceros del numerador, ceros del denominador (que nunca entran) y un valor de prueba en cada intervalo."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Polinomios
  secciones[0] =
    "<h5>El vocabulario que hay que dominar</h5>" +
    "<p>Antes de operar conviene tener claras las palabras, porque los enunciados las usan sin explicarlas:</p>" +
    tabla(["Palabra", "Qué es", "En P(x) = 4x³ − x² + 7"], [
      ["Monomio", "un número por una potencia de x: a·xⁿ", "4x³, −x² y 7 son monomios"],
      ["Coeficiente", "el número que acompaña a cada potencia de x", "4, −1 y 7 (el de x² es −1, aunque no se escriba el 1)"],
      ["Grado", "el exponente más alto con coeficiente distinto de 0", "grado 3"],
      ["Coeficiente principal", "el coeficiente del término de mayor grado", "4"],
      ["Término independiente", "el que no lleva x (es P(0))", "7"],
      ["Polinomio mónico", "su coeficiente principal es 1", "x² − 5x + 6 sí lo es; P no"],
      ["Polinomio completo", "tiene todas las potencias, de la mayor a x⁰", "P no lo es (falta el término en x)"]
    ]) +
    "<p>Dos polinomios son <b>iguales</b> cuando tienen el mismo grado y los mismos coeficientes en cada potencia. Esa idea sirve para resolver problemas del tipo «halla a y b para que x² + ax + b = (x − 1)(x + 4)»: se desarrolla el segundo miembro (x² + 3x − 4) y se comparan coeficientes: a = 3 y b = −4.</p>" +
    "<h5>Operar con polinomios, sin errores</h5>" +
    ejemplo("Suma y resta", "Dados P(x) = 3x³ − 2x² + 5x − 1 y Q(x) = −x³ + 4x² − x + 7, calcula P + Q y P − Q.", [
      "Se colocan los términos del mismo grado en columnas y se opera columna a columna.",
      "<b>P + Q</b>: x³: 3 + (−1) = 2 · x²: −2 + 4 = 2 · x: 5 + (−1) = 4 · independiente: −1 + 7 = 6. Resultado: <b>2x³ + 2x² + 4x + 6</b>.",
      "<b>P − Q</b>: se restan los coeficientes, es decir, se <i>cambia el signo de todo Q</i> y se suma: x³: 3 − (−1) = 4 · x²: −2 − 4 = −6 · x: 5 − (−1) = 6 · independiente: −1 − 7 = −8. Resultado: <b>4x³ − 6x² + 6x − 8</b>."
    ]) +
    ojo("al restar, el signo «−» afecta a <b>todos</b> los términos del segundo polinomio. Escribir P − Q como 3x³ − 2x² + 5x − 1 − x³ + 4x² − x + 7 es un error muy típico: hay que poner paréntesis, −(−x³ + 4x² − x + 7) = x³ − 4x² + x − 7.") +
    ejemplo("Producto", "Calcula (2x² − 3x + 1)·(x² + 4x − 2).", [
      "Cada término del primero se multiplica por cada término del segundo (6 productos en total) y se suman los exponentes de x:",
      "2x²·(x² + 4x − 2) = 2x⁴ + 8x³ − 4x²",
      "−3x·(x² + 4x − 2) = −3x³ − 12x² + 6x",
      "1·(x² + 4x − 2) = x² + 4x − 2",
      "Sumando los términos semejantes: 2x⁴ + (8 − 3)x³ + (−4 − 12 + 1)x² + (6 + 4)x − 2 = <b>2x⁴ + 5x³ − 15x² + 10x − 2</b>.",
      "Comprobación rápida: el grado es 2 + 2 = 4 ✓ y, con x = 1, (2 − 3 + 1)·(1 + 4 − 2) = 0·3 = 0 y 2 + 5 − 15 + 10 − 2 = 0 ✓."
    ]) +
    "<p><b>Truco de comprobación</b>: sustituir x = 1 en una operación entre polinomios es muy rápido, porque P(1) es la suma de todos los coeficientes. Si tu resultado no cumple (P·Q)(1) = P(1)·Q(1), te has equivocado.</p>" +
    "<h5>La división de polinomios</h5>" +
    "<p>Dividir polinomios es igual que dividir números enteros: dado un dividendo P y un divisor Q (con grado de Q ≤ grado de P) existen un único <b>cociente C</b> y un único <b>resto R</b> tales que</p>" +
    H.formula("P(x) = Q(x) · C(x) + R(x)     con grado de R &lt; grado de Q") +
    "<p>Si R = 0, la división es <b>exacta</b> y Q es un factor de P. Se hace con el mismo algoritmo que la división larga de números: (1) divides el término de mayor grado del dividendo entre el de mayor grado del divisor; (2) multiplicas ese resultado por todo el divisor; (3) restas; (4) repites con lo que queda hasta que su grado sea menor que el del divisor.</p>" +
    ejemplo("División exacta", "Divide P(x) = x³ − 2x² − 5x + 6 entre Q(x) = x² + x − 2.", [
      "x³ ÷ x² = <b>x</b>. Multiplicamos x·(x² + x − 2) = x³ + x² − 2x y lo restamos: (x³ − 2x² − 5x + 6) − (x³ + x² − 2x) = −3x² − 3x + 6.",
      "−3x² ÷ x² = <b>−3</b>. Multiplicamos −3·(x² + x − 2) = −3x² − 3x + 6 y restamos: (−3x² − 3x + 6) − (−3x² − 3x + 6) = 0.",
      "Cociente <b>C = x − 3</b>, resto <b>R = 0</b>: la división es exacta. Es decir, x³ − 2x² − 5x + 6 = (x² + x − 2)(x − 3)."
    ]) +
    ejemplo("División con resto", "Divide P(x) = 2x³ − x² + 3x − 4 entre Q(x) = x² + 1.", [
      "2x³ ÷ x² = <b>2x</b>. 2x·(x² + 1) = 2x³ + 2x. Resta: (2x³ − x² + 3x − 4) − (2x³ + 2x) = −x² + x − 4.",
      "−x² ÷ x² = <b>−1</b>. −1·(x² + 1) = −x² − 1. Resta: (−x² + x − 4) − (−x² − 1) = x − 3.",
      "El resto x − 3 tiene grado 1, menor que el grado 2 del divisor: hemos terminado. <b>C = 2x − 1</b> y <b>R = x − 3</b>.",
      "Prueba de la división: Q·C + R = (x² + 1)(2x − 1) + (x − 3) = 2x³ − x² + 2x − 1 + x − 3 = 2x³ − x² + 3x − 4 = P ✓."
    ]) +
    "<p>Si dejas que la calculadora de abajo haga las operaciones, fíjate en lo que cambia con el grado: <b>grado(P·Q) = grado P + grado Q</b>, y en una división <b>grado(C) = grado P − grado Q</b>, mientras que el resto es siempre de grado menor que el divisor.</p>" +
    w("polinomios");

  // ---------------------------------------------------------------- 2. Identidades notables
  secciones[1] =
    "<h5>Por qué (a + b)² no es a² + b²: míralo como un área</h5>" +
    "<p>Un cuadrado de lado a + b tiene área (a + b)². Pero si lo cortas, aparecen cuatro piezas: un cuadrado a², un cuadrado b² y <b>dos rectángulos ab</b>. Esos dos rectángulos son justo el «término del medio» 2ab que tanta gente olvida. Cambia los valores de a y b y comprueba que las piezas siempre encajan:</p>" +
    w("notable") +
    "<h5>La familia completa de identidades notables</h5>" +
    tabla(["Nombre", "Identidad", "Cómo se reconoce al factorizar"], [
      ["Cuadrado de una suma", "(a + b)² = a² + 2ab + b²", "dos extremos cuadrados y el central con signo + y doble producto"],
      ["Cuadrado de una diferencia", "(a − b)² = a² − 2ab + b²", "igual, pero con el central negativo"],
      ["Suma por diferencia", "(a + b)(a − b) = a² − b²", "una <b>resta</b> de dos cuadrados"],
      ["Cubo de una suma", "(a + b)³ = a³ + 3a²b + 3ab² + b³", "cuatro términos con coeficientes 1, 3, 3, 1"],
      ["Cubo de una diferencia", "(a − b)³ = a³ − 3a²b + 3ab² − b³", "los signos alternan: + − + −"],
      ["Suma de cubos", "a³ + b³ = (a + b)(a² − ab + b²)", "suma de dos cubos"],
      ["Diferencia de cubos", "a³ − b³ = (a − b)(a² + ab + b²)", "resta de dos cubos"]
    ]) +
    "<p>Los coeficientes 1, 3, 3, 1 del cubo y 1, 2, 1 del cuadrado forman las filas del <b>triángulo de Pascal</b>: cada número es la suma de los dos que tiene encima (1 · 1 1 · 1 2 1 · 1 3 3 1 · 1 4 6 4 1…). La fila n da los coeficientes de (a + b)ⁿ: por ejemplo (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.</p>" +
    "<h5>Cómo se usan</h5>" +
    ejemplo("Desarrollar con una identidad", "Desarrolla (3x − 5)² y (x − 2)³.", [
      "(3x − 5)² = (3x)² − 2·(3x)·5 + 5² = <b>9x² − 30x + 25</b>. Ojo: el primer término se eleva <i>entero</i>: (3x)² = 9x², no 3x².",
      "(x − 2)³ = x³ − 3·x²·2 + 3·x·2² − 2³ = <b>x³ − 6x² + 12x − 8</b>."
    ]) +
    ejemplo("Cálculo mental con identidades", "Calcula sin calculadora 99², 101·99 y 1002².", [
      "99² = (100 − 1)² = 10.000 − 200 + 1 = <b>9.801</b>.",
      "101·99 = (100 + 1)(100 − 1) = 100² − 1² = <b>9.999</b>.",
      "1002² = (1000 + 2)² = 1.000.000 + 4.000 + 4 = <b>1.004.004</b>."
    ]) +
    ejemplo("Reconocer un trinomio cuadrado perfecto", "Factoriza x² + 10x + 25, 4x² − 12x + 9 y 9x² + 6xy + y².", [
      "x² + 10x + 25: los extremos son x² y 5²; el doble producto es 2·x·5 = 10x ✓. Es <b>(x + 5)²</b>.",
      "4x² − 12x + 9: extremos (2x)² y 3²; el doble producto 2·2x·3 = 12x, y el central es negativo. Es <b>(2x − 3)²</b>.",
      "9x² + 6xy + y²: extremos (3x)² e y²; 2·3x·y = 6xy ✓. Es <b>(3x + y)²</b>.",
      "Si el término central <i>no</i> coincide con el doble producto (por ejemplo x² + 8x + 25), no es un cuadrado perfecto."
    ]) +
    ejemplo("Combinar factor común y notable", "Factoriza 3x³ − 12x y x⁴ − 16.", [
      "3x³ − 12x: factor común 3x → 3x(x² − 4) = <b>3x(x − 2)(x + 2)</b> (la diferencia de cuadrados se factoriza otra vez).",
      "x⁴ − 16 = (x²)² − 4² = (x² − 4)(x² + 4) = <b>(x − 2)(x + 2)(x² + 4)</b>. El factor x² + 4 es una <i>suma</i> de cuadrados: ya no se puede descomponer con números reales."
    ]) +
    ejemplo("Sumas y diferencias de cubos", "Factoriza x³ + 8 y 8x³ − 27.", [
      "x³ + 8 = x³ + 2³ = (x + 2)(x² − 2x + 4).",
      "8x³ − 27 = (2x)³ − 3³ = (2x − 3)((2x)² + 2x·3 + 3²) = <b>(2x − 3)(4x² + 6x + 9)</b>.",
      "Para recordar los signos: en el primer paréntesis va el mismo signo que hay en el problema, y en el segundo «+ − +» si es suma y «+ + +» si es resta."
    ]) +
    "<h5>Dos aplicaciones que ya usarás en otros temas</h5>" +
    "<ul><li><b>Racionalizar</b>: multiplicar por el conjugado usa (a + b)(a − b) = a² − b². Por ejemplo, 1/(√5 − 2) = (√5 + 2)/((√5 − 2)(√5 + 2)) = (√5 + 2)/(5 − 4) = √5 + 2.</li>" +
    "<li><b>Completar el cuadrado</b>: x² + 6x + 5 = (x² + 6x + 9) − 9 + 5 = (x + 3)² − 4. Es el primer paso para deducir la fórmula de la ecuación de segundo grado (sección 5) y para encontrar el vértice de una parábola (Tema 9).</li></ul>" +
    ojo("(a + b)² ≠ a² + b² y (a − b)³ ≠ a³ − b³. Y cuidado con los signos: (x − 3)² = x² − 6x + 9, no x² − 6x − 9; el último término siempre es positivo porque (−3)² = +9.");

  // ---------------------------------------------------------------- 3. Ruffini
  secciones[2] =
    "<h5>Por qué funciona Ruffini</h5>" +
    "<p>Ruffini no es magia: es la división larga con el divisor x − a, pero sin escribir las x. Cuando divides entre x − a, en cada paso multiplicas el coeficiente que acabas de obtener por <b>a</b> y se lo sumas al siguiente coeficiente. Esa operación es exactamente lo que hace la tabla. Solo sirve cuando el divisor es de la forma <b>x − a</b> (grado 1 y coeficiente principal 1); para otros divisores hay que usar la división larga.</p>" +
    w("ruffini") +
    "<h5>Los casos que hay que saber manejar</h5>" +
    ejemplo("Faltan términos y el divisor es x + a", "Divide x³ + 2x² − 5x − 6 entre (x + 3).", [
      "x + 3 = x − (−3): hay que usar <b>a = −3</b>. Es el error más frecuente: el valor de a es el que anula el divisor.",
      "Coeficientes: 1, 2, −5, −6. Bajamos el 1. 1·(−3) = −3 → 2 + (−3) = −1. −1·(−3) = 3 → −5 + 3 = −2. −2·(−3) = 6 → −6 + 6 = 0.",
      "Cociente <b>x² − x − 2</b>, resto <b>0</b>. Entonces x³ + 2x² − 5x − 6 = (x + 3)(x² − x − 2) y, como x² − x − 2 = (x − 2)(x + 1), queda (x + 3)(x − 2)(x + 1)."
    ]) +
    ejemplo("Cuando falta un término hay que escribir un 0", "Divide 2x⁴ − 3x² + x − 6 entre (x − 2).", [
      "Falta el término en x³. Los coeficientes en orden de grado son <b>2, 0, −3, 1, −6</b>: el 0 ocupa el lugar del x³ que no aparece (si lo olvidas, toda la tabla sale mal).",
      "Bajamos 2. 2·2 = 4 → 0 + 4 = 4. 4·2 = 8 → −3 + 8 = 5. 5·2 = 10 → 1 + 10 = 11. 11·2 = 22 → −6 + 22 = 16.",
      "Cociente <b>2x³ + 4x² + 5x + 11</b> y resto <b>16</b>. Comprobación con el teorema del resto: P(2) = 2·16 − 3·4 + 2 − 6 = 32 − 12 + 2 − 6 = 16 ✓."
    ]) +
    ejemplo("Un divisor de la forma (ax − b)", "Divide 2x³ + 3x² + 4x − 3 entre (2x − 1).", [
      "2x − 1 = 2(x − 1/2). Dividimos primero entre x − 1/2 con Ruffini (a = 1/2): coeficientes 2, 3, 4, −3.",
      "Bajamos 2. 2·½ = 1 → 3 + 1 = 4. 4·½ = 2 → 4 + 2 = 6. 6·½ = 3 → −3 + 3 = 0. Cociente provisional 2x² + 4x + 6, resto 0.",
      "Como el divisor real es 2·(x − 1/2), el cociente se divide entre 2: <b>C = x² + 2x + 3</b>. (El resto no cambia; aquí es 0.)",
      "Comprobación: (2x − 1)(x² + 2x + 3) = 2x³ + 4x² + 6x − x² − 2x − 3 = 2x³ + 3x² + 4x − 3 ✓."
    ]) +
    "<h5>Teorema del resto y teorema del factor</h5>" +
    "<p>Si dividimos P(x) entre (x − a), por la prueba de la división se cumple P(x) = (x − a)·C(x) + R, con R un número (porque su grado es menor que 1). Sustituyendo x = a, el sumando (x − a)·C(x) se anula y queda <b>P(a) = R</b>. Eso es el <b>teorema del resto</b>: el resto de dividir entre x − a es P(a), y no hace falta dividir para saberlo. Su consecuencia inmediata es el <b>teorema del factor</b>: (x − a) divide exactamente a P ⇔ R = 0 ⇔ P(a) = 0.</p>" +
    "<p>Además, Ruffini es la forma más rápida de <b>evaluar un polinomio</b>: el último número de la tabla es P(a), con muchas menos multiplicaciones que calcular las potencias a mano (es el método de Horner).</p>" +
    ejemplo("Hallar un parámetro", "¿Para qué valor de k es divisible P(x) = x³ + kx² − 4x + 4 por x − 2?", [
      "Que sea divisible por x − 2 significa que el resto es 0, es decir, P(2) = 0.",
      "P(2) = 8 + 4k − 8 + 4 = 4k + 4 = 0 → <b>k = −1</b>.",
      "Comprobación: con k = −1, P(x) = x³ − x² − 4x + 4 = x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4) = (x − 1)(x − 2)(x + 2). ✓"
    ]) +
    ejemplo("Dos parámetros", "Halla a y b para que P(x) = x³ + ax² + bx + 6 sea divisible por (x − 1) y por (x + 2).", [
      "Divisible por x − 1 → P(1) = 0 → 1 + a + b + 6 = 0 → a + b = −7.",
      "Divisible por x + 2 → P(−2) = 0 → −8 + 4a − 2b + 6 = 0 → 4a − 2b = 2 → 2a − b = 1.",
      "Sumando las dos ecuaciones: 3a = −6 → a = −2, y b = −7 − a = −5.",
      "<b>a = −2 y b = −5</b>. El polinomio es x³ − 2x² − 5x + 6 = (x − 1)(x + 2)(x − 3)."
    ]) +
    ejemplo("Resto sin dividir", "Calcula el resto de dividir x⁴ − 3x² + 2x + 5 entre (x + 2).", [
      "x + 2 = x − (−2). Por el teorema del resto, el resto es P(−2) = 16 − 12 − 4 + 5 = <b>5</b>."
    ]) +
    ojo("el teorema del resto habla de dividir entre <b>x − a</b>, y el número que se sustituye es <b>a</b>. Para el divisor x + 3 hay que evaluar P(−3), no P(3). Y para un divisor como 2x − 1, se evalúa en x = 1/2.");

  // ---------------------------------------------------------------- 4. Factorización
  secciones[3] =
    "<h5>Un método que siempre funciona (con los números de los exámenes)</h5>" +
    "<p>Factorizar «al tun tun» es perder el tiempo. Sigue este orden; en cada paso, si ya has terminado, paras:</p>" +
    "<ol><li><b>Factor común</b>: ¿hay un número o una potencia de x que se repite en todos los términos? Si el término independiente es 0, sale al menos un factor x.</li>" +
    "<li><b>Identidad notable</b>: ¿es una diferencia de cuadrados, un cuadrado perfecto, una suma o resta de cubos?</li>" +
    "<li><b>Ruffini</b>: busca raíces enteras entre los divisores del término independiente y, si el coeficiente principal no es 1, también fracciones. Cada vez que el resto sea 0 has sacado un factor (x − a); vuelve a probar con el cociente (¡puede repetirse la misma raíz!).</li>" +
    "<li><b>Ecuación de 2.º grado</b>: cuando el cociente sea de grado 2, resuélvelo con la fórmula. Si Δ &lt; 0, ese factor es <i>irreducible</i> y ahí te quedas.</li></ol>" +
    "<h5>El teorema de las raíces racionales: no pruebes al azar</h5>" +
    "<p>Si un polinomio de <b>coeficientes enteros</b> tiene una raíz racional p/q (fracción irreducible), entonces <b>p divide al término independiente a₀</b> y <b>q divide al coeficiente principal aₙ</b>. Con raíces enteras (q = 1) basta con probar los divisores de a₀, con signo + y con signo −.</p>" +
    ejemplo("Lista de candidatos", "Busca las raíces racionales posibles de 2x³ − 3x² − 3x + 2.", [
      "a₀ = 2 → p ∈ {1, 2}. aₙ = 2 → q ∈ {1, 2}.",
      "Candidatos p/q: ±1, ±2, ±1/2 (±2/2 = ±1 ya está en la lista).",
      "P(1) = 2 − 3 − 3 + 2 = −2 ≠ 0. P(−1) = −2 − 3 + 3 + 2 = 0 ✓. Primera raíz: x = −1.",
      "Ruffini con a = −1: 2, −3, −3, 2 → bajar 2; 2·(−1) = −2 → −3 − 2 = −5; −5·(−1) = 5 → −3 + 5 = 2; 2·(−1) = −2 → 2 − 2 = 0. Cociente 2x² − 5x + 2.",
      "2x² − 5x + 2 = 0 → x = (5 ± √(25 − 16))/4 = (5 ± 3)/4 → x = 2 o x = 1/2.",
      "<b>2x³ − 3x² − 3x + 2 = 2(x + 1)(x − 2)(x − 1/2) = (x + 1)(x − 2)(2x − 1)</b>."
    ]) +
    w("factorizar") +
    "<h5>Raíces múltiples: cuando una raíz se repite</h5>" +
    "<p>A veces la misma raíz sale varias veces. Se dice que es una raíz de <b>multiplicidad</b> 2, 3… Por ejemplo, x³ − 3x² + 4 = (x + 1)(x − 2)²: la raíz x = 2 es doble. En la gráfica se nota: en una raíz de multiplicidad par la curva <b>toca el eje sin atravesarlo</b> (rebota), y en una de multiplicidad impar lo atraviesa. Para detectarlo, tras sacar una raíz con Ruffini, <i>vuelve a probar con el mismo valor</i> en el cociente.</p>" +
    ejemplo("Raíz doble", "Factoriza x³ − 3x² + 4.", [
      "a₀ = 4 → candidatos ±1, ±2, ±4. P(−1) = −1 − 3 + 4 = 0 ✓.",
      "Ruffini con −1: 1, −3, 0, 4 → 1; −1 → −4; 4 → 4; −4 → 0. Cociente x² − 4x + 4.",
      "x² − 4x + 4 es un cuadrado perfecto: (x − 2)². Por tanto <b>x³ − 3x² + 4 = (x + 1)(x − 2)²</b>, con la raíz 2 doble.",
      "Comprobación: la gráfica corta el eje en −1 y toca el eje en 2 sin atravesarlo."
    ]) +
    "<h5>Polinomios con las raíces dadas, y relaciones de Cardano–Vieta</h5>" +
    "<p>Al revés también se puede: un polinomio con raíces r₁, r₂, r₃ es k·(x − r₁)(x − r₂)(x − r₃). Por ejemplo, con raíces 1, 2 y −3 se obtiene (x − 1)(x − 2)(x + 3) = x³ − 7x + 6 (con k = 1). Observa que el coeficiente de x² es 0 = −(1 + 2 − 3), el de x es −7 = 1·2 + 1·(−3) + 2·(−3) y el término independiente es 6 = −(1·2·(−3)). Son las <b>relaciones de Cardano–Vieta</b>: en un polinomio de grado n, la suma de las raíces es −aₙ₋₁/aₙ y el producto es (−1)ⁿ·a₀/aₙ. En el grado 2 son las conocidas «suma = −b/a y producto = c/a» de la sección siguiente.</p>" +
    ejemplo("Descomponer un polinomio de grado 4", "Factoriza P(x) = x⁴ − 2x³ − 7x² + 8x + 12.", [
      "a₀ = 12: candidatos ±1, ±2, ±3, ±4, ±6, ±12. P(−1) = 1 + 2 − 7 − 8 + 12 = 0 ✓.",
      "Ruffini con a = −1 y coeficientes 1, −2, −7, 8, 12: bajamos 1; 1·(−1) = −1 → −2 − 1 = −3; −3·(−1) = 3 → −7 + 3 = −4; −4·(−1) = 4 → 8 + 4 = 12; 12·(−1) = −12 → 12 − 12 = 0. Cociente x³ − 3x² − 4x + 12.",
      "En el cociente: x³ − 3x² − 4x + 12 = x²(x − 3) − 4(x − 3) = (x − 3)(x² − 4) = (x − 3)(x − 2)(x + 2) (sacando factor común por grupos).",
      "<b>P(x) = (x + 1)(x − 3)(x − 2)(x + 2)</b>. Las raíces son −2, −1, 2 y 3; su suma es 2 = −(−2)/1 ✓ y su producto es 12 = a₀ ✓."
    ]) +
    ojo("«factorizar» no es «encontrar las raíces»: debe escribirse el producto de factores, y además no olvides el coeficiente principal. 2x² − 5x + 2 = 2(x − 2)(x − 1/2) = (x − 2)(2x − 1), pero no (x − 2)(x − 1/2), que es la mitad.");

  // ---------------------------------------------------------------- 5. Segundo grado
  secciones[4] =
    "<h5>De dónde sale la fórmula (completando el cuadrado)</h5>" +
    "<p>Saber demostrar la fórmula ayuda a recordarla bien. Partimos de ax² + bx + c = 0 con a ≠ 0.</p>" +
    "<ol><li>Dividimos entre a: x² + (b/a)x + c/a = 0.</li>" +
    "<li>Pasamos el término independiente: x² + (b/a)x = −c/a.</li>" +
    "<li>Para completar el cuadrado, sumamos a los dos lados (b/2a)²: x² + (b/a)x + b²/4a² = b²/4a² − c/a.</li>" +
    "<li>El primer miembro es (x + b/2a)² (cuadrado de una suma), y el segundo, con denominador común 4a², es (b² − 4ac)/4a².</li>" +
    "<li>Hacemos la raíz cuadrada de los dos lados: x + b/2a = ±√(b² − 4ac)/2a.</li>" +
    "<li>Despejamos: <b>x = (−b ± √(b² − 4ac))/2a</b>. El «±» aparece porque un número positivo tiene dos raíces cuadradas.</li></ol>" +
    "<p>Fíjate en lo que muestra el paso 5: si b² − 4ac &lt; 0 no se puede hacer la raíz y no hay solución real; si vale 0, el «±» no cambia nada y hay una sola solución. Mueve los coeficientes y comprueba cómo la gráfica y la fórmula cuentan lo mismo:</p>" +
    w("parabola") +
    "<h5>Ecuaciones incompletas: no hace falta la fórmula</h5>" +
    ejemplo("Las tres formas incompletas", "Resuelve 5x² − 20x = 0, 3x² − 27 = 0 y x² + 4 = 0.", [
      "<b>Falta c</b> (ax² + bx = 0): factor común. 5x(x − 4) = 0 → x = 0 o x = 4. Una solución es siempre 0.",
      "<b>Falta b</b> (ax² + c = 0): se despeja. 3x² = 27 → x² = 9 → x = ±3.",
      "x² + 4 = 0 → x² = −4: no hay solución real (un cuadrado nunca es negativo)."
    ]) +
    ojo("en 5x² − 20x = 0 <b>no se puede dividir entre x</b> para simplificar: perderías la solución x = 0. Siempre se saca factor común y se iguala a cero cada factor.") +
    "<h5>Las ecuaciones que no vienen en forma general</h5>" +
    "<p>Muchos enunciados traen la ecuación disfrazada. Lo primero siempre es pasar todo a un lado hasta tener ax² + bx + c = 0, quitando paréntesis y denominadores.</p>" +
    ejemplo("Desarrollar y ordenar", "Resuelve x(x + 5) = 3(x + 4).", [
      "Quitamos paréntesis: x² + 5x = 3x + 12. Pasamos todo al primer miembro: x² + 2x − 12 = 0.",
      "Δ = 4 + 48 = 52 → √52 = 2√13. x = (−2 ± 2√13)/2 = <b>−1 ± √13</b> (≈ 2,606 y −4,606)."
    ]) +
    "<h5>Suma y producto de las soluciones</h5>" +
    "<p>Si x₁ y x₂ son las soluciones de ax² + bx + c = 0, entonces ax² + bx + c = a(x − x₁)(x − x₂), y al desarrollar y comparar coeficientes se obtiene:</p>" +
    H.formula("x₁ + x₂ = " + fr("−b", "a") + "         x₁ · x₂ = " + fr("c", "a")) +
    "<p>Sirve para tres cosas: <b>(1)</b> comprobar tus soluciones sin sustituir; <b>(2)</b> factorizar: ax² + bx + c = a(x − x₁)(x − x₂); y <b>(3)</b> construir una ecuación con soluciones dadas: x² − (suma)x + (producto) = 0. Con soluciones 3 y −5: suma −2, producto −15 → x² + 2x − 15 = 0.</p>" +
    ejemplo("Discriminante con parámetro", "Halla k para que x² + kx + 9 = 0 tenga una solución doble, y para que x² − 4x + k = 0 no tenga soluciones reales.", [
      "Solución doble ⇔ Δ = 0: k² − 36 = 0 → <b>k = 6 o k = −6</b> (con k = 6 la ecuación es (x + 3)² = 0).",
      "Sin soluciones reales ⇔ Δ &lt; 0: 16 − 4k &lt; 0 → 4k &gt; 16 → <b>k &gt; 4</b>."
    ]) +
    ejemplo("Un problema geométrico", "Un rectángulo tiene perímetro 30 m y área 56 m². Calcula sus lados.", [
      "Si un lado mide x, el otro mide 15 − x (semiperímetro 15). Área: x(15 − x) = 56.",
      "15x − x² = 56 → x² − 15x + 56 = 0 → x = (15 ± √(225 − 224))/2 = (15 ± 1)/2 → x = 8 o x = 7.",
      "Las dos soluciones dan el mismo rectángulo: <b>7 m × 8 m</b> (comprobación: 2·(7 + 8) = 30 ✓ y 7·8 = 56 ✓)."
    ]) +
    "<h5>Ecuaciones bicuadradas y otros cambios de variable</h5>" +
    "<p>La bicuadrada ax⁴ + bx² + c = 0 puede tener <b>4, 3, 2, 1 o 0</b> soluciones reales: depende de cuántos valores de t = x² salgan y de que sean positivos. Con t &gt; 0 hay dos x (±√t); con t = 0, una; con t &lt; 0, ninguna. Prueba con las plantillas:</p>" +
    w("bicuadrada") +
    ejemplo("Dos soluciones de t, una descartada", "Resuelve x⁴ + x² − 6 = 0.", [
      "t = x²: t² + t − 6 = 0 → t = (−1 ± √25)/2 → t = 2 o t = −3.",
      "t = 2 → x = ±√2. t = −3 → ningún x real (x² no puede ser negativo): se descarta.",
      "<b>x = √2 y x = −√2</b> (solo dos soluciones)."
    ]) +
    ejemplo("Cambios de variable similares", "Resuelve x⁶ − 7x³ − 8 = 0 y x − 5√x + 6 = 0.", [
      "x⁶ − 7x³ − 8 = 0: ahora t = x³ → t² − 7t − 8 = 0 → t = 8 o t = −1 → x = ∛8 = 2 y x = ∛(−1) = −1. Una raíz cúbica de un negativo sí existe: <b>x = 2 y x = −1</b>.",
      "x − 5√x + 6 = 0: t = √x (t ≥ 0) → t² − 5t + 6 = 0 → t = 2 o t = 3 → x = t² = 4 o 9. Comprobación: 4 − 10 + 6 = 0 ✓ y 9 − 15 + 6 = 0 ✓. <b>x = 4 y x = 9</b>."
    ]);

  // ---------------------------------------------------------------- 6. Sistemas
  secciones[5] =
    "<h5>Cada ecuación es una recta: el sistema como corte de gráficas</h5>" +
    "<p>La ecuación lineal a x + b y = c representa una <b>recta</b> en el plano. Resolver un sistema de dos ecuaciones es buscar los puntos que están a la vez en las dos rectas. Hay tres posibilidades:</p>" +
    tabla(["Posición de las rectas", "Soluciones", "Nombre", "Cómo se nota al resolver"], [
      ["Se cortan en un punto", "exactamente una", "Compatible determinado (SCD)", "sale x = …, y = …"],
      ["Coinciden", "infinitas", "Compatible indeterminado (SCI)", "queda 0 = 0"],
      ["Son paralelas", "ninguna", "Incompatible (SI)", "queda algo imposible como 0 = 5"]
    ]) +
    w("sistema2x2") +
    "<h5>El mismo sistema con los tres métodos</h5>" +
    "<p>Resolvemos x + 2y = 7, 3x − y = 7 de tres formas distintas para ver que todas llevan a la misma solución, x = 3 e y = 2.</p>" +
    ejemplo("Sustitución", "Despeja una incógnita y sustitúyela en la otra ecuación.", [
      "De la 1.ª: x = 7 − 2y.",
      "En la 2.ª: 3(7 − 2y) − y = 7 → 21 − 6y − y = 7 → −7y = −14 → <b>y = 2</b>.",
      "x = 7 − 2·2 = <b>3</b>."
    ]) +
    ejemplo("Igualación", "Despeja la misma incógnita en las dos y iguala.", [
      "De la 1.ª: x = 7 − 2y. De la 2.ª: 3x = 7 + y → x = (7 + y)/3.",
      "Igualamos: 7 − 2y = (7 + y)/3 → 21 − 6y = 7 + y → 14 = 7y → <b>y = 2</b> y x = 7 − 4 = <b>3</b>."
    ]) +
    ejemplo("Reducción", "Multiplica para que una incógnita tenga coeficientes opuestos y suma.", [
      "Multiplicamos la 2.ª por 2: 6x − 2y = 14. La 1.ª es x + 2y = 7.",
      "Sumando: 7x = 21 → <b>x = 3</b>. Sustituyendo en la 1.ª: 3 + 2y = 7 → <b>y = 2</b>.",
      "Se elige este método cuando los coeficientes se pueden igualar con facilidad; sustitución cuando una incógnita tiene coeficiente 1."
    ]) +
    ejemplo("Un parámetro", "¿Para qué valores de k el sistema x + 2y = 4, 2x + 4y = k es compatible indeterminado? ¿Y incompatible?", [
      "Las dos ecuaciones tienen los mismos coeficientes de x e y salvo por el factor 2: la 2.ª es 2·(x + 2y) = k.",
      "Si k = 8, la 2.ª equivale a x + 2y = 4, que es la 1.ª: <b>infinitas soluciones</b> (SCI).",
      "Si k ≠ 8, la 2.ª pide x + 2y = k/2 mientras la 1.ª pide x + 2y = 4: contradicción, <b>sin solución</b> (incompatible)."
    ]) +
    "<h5>Cuando una de las ecuaciones no es lineal</h5>" +
    "<p>Se resuelve casi siempre por <b>sustitución</b>: despeja en la ecuación lineal y sustituye en la otra, que se convierte en una ecuación de segundo grado. Habrá, como mucho, dos soluciones (recta y parábola o circunferencia se cortan como mucho en dos puntos).</p>" +
    ejemplo("Suma y producto", "Resuelve x + y = 5, x·y = 6.", [
      "y = 5 − x. En la 2.ª: x(5 − x) = 6 → x² − 5x + 6 = 0 → x = 2 o x = 3.",
      "Si x = 2, y = 3. Si x = 3, y = 2. <b>Soluciones: (2, 3) y (3, 2)</b>."
    ]) +
    ejemplo("Recta y circunferencia", "Resuelve x² + y² = 25, x − y = 1.", [
      "De la lineal: x = y + 1. En la otra: (y + 1)² + y² = 25 → 2y² + 2y − 24 = 0 → y² + y − 12 = 0 → y = 3 o y = −4.",
      "y = 3 → x = 4. y = −4 → x = −3. <b>Soluciones: (4, 3) y (−3, −4)</b>.",
      "Comprobación: 16 + 9 = 25 ✓ y 9 + 16 = 25 ✓."
    ]) +
    "<h5>Tres ecuaciones con tres incógnitas: el método de Gauss</h5>" +
    "<p>La idea es la de la reducción, pero repetida con orden para obtener un sistema <b>escalonado</b> (triangular): se elimina x de la 2.ª y 3.ª ecuación, después se elimina y de la 3.ª, y se resuelve de abajo hacia arriba.</p>" +
    ejemplo("Gauss paso a paso", "Resuelve x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2.", [
      "<b>E₂ ← E₂ − 2·E₁</b>: (2x − y + z) − 2(x + y + z) = 3 − 12 → −3y − z = −9.",
      "<b>E₃ ← E₃ − E₁</b>: (x + 2y − z) − (x + y + z) = 2 − 6 → y − 2z = −4.",
      "Ahora eliminamos y de la tercera: <b>E₃ ← 3·E₃ + E₂</b>: (3y − 6z) + (−3y − z) = −12 − 9 → −7z = −21 → <b>z = 3</b>.",
      "De E₂: −3y − 3 = −9 → <b>y = 2</b>. De E₁: x + 2 + 3 = 6 → <b>x = 1</b>.",
      "Comprobación en la E₂ original: 2·1 − 2 + 3 = 3 ✓. Solución: <b>(x, y, z) = (1, 2, 3)</b>. Si en el proceso aparece 0 = 0 hay infinitas soluciones; si aparece 0 = k ≠ 0, el sistema es incompatible."
    ]);


  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "7. Fracciones algebraicas",
      html:
        "<p>Una <b>fracción algebraica</b> es un cociente de dos polinomios, como (x² − 9)/(x² + x − 6). Se manejan igual que las fracciones numéricas, con una diferencia importante: el denominador no puede valer 0, así que cada fracción lleva asociada una lista de valores <b>prohibidos</b> para x (las raíces del denominador).</p>" +
        "<h5>Simplificar: factoriza arriba y abajo</h5>" +
        "<p>Sólo se pueden tachar <b>factores</b> (cosas que multiplican), nunca sumandos. Por eso lo primero es factorizar numerador y denominador con lo que sabes de las secciones 2–4.</p>" +
        ejemplo("Simplificar", "Simplifica (x² − 9)/(x² + x − 6) e indica los valores prohibidos.", [
          "Numerador: x² − 9 = (x − 3)(x + 3) (diferencia de cuadrados).",
          "Denominador: x² + x − 6 = 0 → x = (−1 ± 5)/2 = 2 o −3 → x² + x − 6 = (x − 2)(x + 3).",
          "La fracción es (x − 3)(x + 3)/[(x − 2)(x + 3)]. Tachamos el factor común (x + 3): <b>(x − 3)/(x − 2)</b>.",
          "Valores prohibidos de la fracción original: los que anulan el denominador, <b>x = 2 y x = −3</b>. Ojo: aunque (x + 3) desaparezca al simplificar, x = −3 sigue estando prohibido en la fracción original."
        ]) +
        w("fracalg") +
        "<h5>Operar con fracciones algebraicas</h5>" +
        "<ul><li><b>Producto</b>: se multiplican numeradores y denominadores (conviene simplificar antes).</li>" +
        "<li><b>Cociente</b>: se multiplica la primera por la inversa de la segunda.</li>" +
        "<li><b>Suma y resta</b>: hace falta un denominador común. Lo mejor es factorizar los denominadores y tomar el <b>mínimo común múltiplo</b>: cada factor, con su mayor exponente.</li></ul>" +
        ejemplo("Suma con denominadores distintos", "Calcula 1/(x − 1) + 2/(x + 1).", [
          "Los denominadores son (x − 1) y (x + 1): el mcm es (x − 1)(x + 1) = x² − 1.",
          "1/(x − 1) = (x + 1)/[(x − 1)(x + 1)] y 2/(x + 1) = 2(x − 1)/[(x − 1)(x + 1)].",
          "Sumamos numeradores: (x + 1) + 2(x − 1) = 3x − 1. Resultado: <b>(3x − 1)/(x² − 1)</b>, con x ≠ ±1."
        ]) +
        ejemplo("Resta con un denominador que se puede factorizar", "Calcula x/(x − 2) − 2/(x² − 2x).", [
          "x² − 2x = x(x − 2): el mcm de (x − 2) y x(x − 2) es x(x − 2).",
          "x/(x − 2) = x·x/[x(x − 2)] = x²/[x(x − 2)]. El segundo sumando ya está bien.",
          "Restamos: (x² − 2)/[x(x − 2)]. <b>Resultado: (x² − 2)/(x(x − 2))</b>, con x ≠ 0, 2."
        ]) +
        ejemplo("Producto y cociente", "Calcula (x² − 4)/(x + 1) · (x + 1)/(x − 2) y después x/(x + 2) ÷ (x − 1)/(x + 2)².", [
          "Producto: (x − 2)(x + 2)/(x + 1) · (x + 1)/(x − 2) = x + 2 (tachamos x + 1 y x − 2), con x ≠ −1 y x ≠ 2.",
          "Cociente: x/(x + 2) · (x + 2)²/(x − 1) = x(x + 2)/(x − 1), con x ≠ −2 y x ≠ 1."
        ]) +
        ojo("(x + 3)/x <b>no</b> se simplifica a 3, ni (x² + 1)/(x² − 1) a «−1». Sólo se tachan factores. Compruébalo con x = 1: (1 + 3)/1 = 4, que no es 3.")
    },
    {
      h: "8. Ecuaciones racionales e irracionales",
      html:
        "<p>Una ecuación <b>racional</b> tiene la incógnita en un denominador; una <b>irracional</b>, bajo una raíz. En las dos, el método de resolución puede <b>inventar</b> soluciones que no son de la ecuación original. Por eso la comprobación forma parte de la solución, no es un adorno.</p>" +
        "<h5>Racionales: multiplica por el mcm de los denominadores</h5>" +
        "<ol><li>Factoriza los denominadores y busca el mcm (indica los valores que lo anulan, que están prohibidos).</li><li>Multiplica <i>todos</i> los términos por el mcm: los denominadores desaparecen.</li><li>Resuelve la ecuación polinómica resultante.</li><li>Descarta las soluciones prohibidas y comprueba las demás.</li></ol>" +
        ejemplo("Sin soluciones falsas", "Resuelve 1/x + 1/(x + 2) = 3/4.", [
          "Prohibidos: x = 0 y x = −2. El mcm de x, x + 2 y 4 es 4x(x + 2).",
          "Multiplicamos todo: 4(x + 2) + 4x = 3x(x + 2) → 8x + 8 = 3x² + 6x → 3x² − 2x − 8 = 0.",
          "Δ = 4 + 96 = 100 → x = (2 ± 10)/6 → <b>x = 2 o x = −4/3</b>. Ninguno es 0 ni −2: las dos valen.",
          "Comprobación con x = 2: 1/2 + 1/4 = 3/4 ✓."
        ]) +
        ejemplo("Con una solución falsa", "Resuelve x/(x − 1) − 2/(x + 1) = 2/(x² − 1).", [
          "Prohibidos: x = 1 y x = −1 (porque x² − 1 = (x − 1)(x + 1)). El mcm es x² − 1.",
          "Multiplicamos: x(x + 1) − 2(x − 1) = 2 → x² + x − 2x + 2 = 2 → x² − x = 0 → x(x − 1) = 0.",
          "Salen x = 0 y x = 1. Pero <b>x = 1 está prohibido</b> (anula un denominador): se descarta.",
          "<b>Solución: x = 0</b>. Comprobación: 0/(−1) − 2/1 = −2 y 2/(−1) = −2 ✓."
        ]) +
        "<h5>Irracionales: aísla la raíz, eleva al cuadrado y comprueba</h5>" +
        "<ol><li>Deja una raíz sola en un miembro.</li><li>Eleva al cuadrado los <b>dos miembros</b> (si el otro miembro es una suma, usa la identidad notable).</li><li>Si queda otra raíz, repite desde el paso 1.</li><li>Resuelve y <b>comprueba</b> las soluciones en la ecuación original: al elevar al cuadrado se pueden colar soluciones que hacen la raíz «negativa».</li></ol>" +
        ejemplo("Una raíz", "Resuelve √(x + 6) = x.", [
          "Elevamos al cuadrado: x + 6 = x² → x² − x − 6 = 0 → x = 3 o x = −2.",
          "Comprobamos: x = 3 → √9 = 3 ✓. x = −2 → √4 = 2, pero el segundo miembro vale −2 ≠ 2 ✗.",
          "<b>Solución: x = 3</b>. La falsa x = −2 aparece porque (−2)² = 2², es decir, elevar al cuadrado no distingue el signo."
        ]) +
        ejemplo("Dos raíces", "Resuelve √(x + 7) − √(x − 2) = 1.", [
          "Aislamos una raíz: √(x + 7) = 1 + √(x − 2).",
          "Elevamos al cuadrado (el segundo miembro es una suma, ¡desarrolla con la identidad!): x + 7 = 1 + 2√(x − 2) + (x − 2) → 8 = 2√(x − 2) → √(x − 2) = 4.",
          "Elevamos otra vez: x − 2 = 16 → <b>x = 18</b>.",
          "Comprobación: √25 − √16 = 5 − 4 = 1 ✓."
        ]) +
        "<p>Mira la ecuación como dos funciones: las soluciones verdaderas son los cortes de las dos gráficas. Una solución falsa del álgebra simplemente no aparece en el dibujo. Prueba con √(x+6) = x, y con las demás:</p>" +
        w("igualar") +
        ojo("después de elevar al cuadrado el signo se «pierde», así que es obligatorio comprobar. También en las racionales: una solución que anula un denominador original <b>nunca</b> vale.")
    },
    {
      h: "9. Ecuaciones exponenciales y logarítmicas",
      html:
        "<h5>Lo imprescindible sobre logaritmos</h5>" +
        "<p>El logaritmo en base b de un número N es el exponente al que hay que elevar b para obtener N:</p>" +
        H.formula("log<sub>b</sub> N = y  ⇔  bʸ = N     (b &gt; 0, b ≠ 1, N &gt; 0)") +
        "<p>Ejemplos: log₂ 8 = 3 (porque 2³ = 8), log₁₀ 0,001 = −3, log₃ 81 = 4, log₂ 1 = 0 y log_b b = 1. Con la base 10 se escribe log y con la base e ≈ 2,718 se escribe ln. <b>El logaritmo sólo existe para números positivos</b>: eso es la fuente de las soluciones falsas.</p>" +
        tabla(["Propiedad", "Fórmula", "Ejemplo"], [
          ["Producto", "log(A·B) = log A + log B", "log 6 = log 2 + log 3"],
          ["Cociente", "log(A/B) = log A − log B", "log 5 = log 10 − log 2"],
          ["Potencia", "log(Aᵏ) = k·log A", "log 8 = 3 log 2"],
          ["Cambio de base", "log_b N = log N / log b", "log₂ 5 = log 5 / log 2 ≈ 2,3219"],
          ["Inversas", "b^(log_b N) = N  y  log_b(bˣ) = x", "ln(e²) = 2"]
        ]) +
        w("logaritmos") +
        "<h5>Exponenciales: tres técnicas</h5>" +
        ejemplo("Igualar bases", "Resuelve 3ˣ⁻¹ = 27.", [
          "Escribimos 27 = 3³. Como la función exponencial es inyectiva, los exponentes tienen que coincidir: x − 1 = 3 → <b>x = 4</b>."
        ]) +
        ejemplo("Sacar factor común", "Resuelve 2ˣ⁺¹ + 2ˣ = 12.", [
          "2ˣ⁺¹ = 2·2ˣ. Sacamos factor común 2ˣ: 2ˣ(2 + 1) = 12 → 2ˣ = 4 = 2² → <b>x = 2</b>."
        ]) +
        ejemplo("Cambio de variable", "Resuelve 4ˣ − 3·2ˣ − 4 = 0.", [
          "4ˣ = (2²)ˣ = (2ˣ)². Llamamos t = 2ˣ (siempre t &gt; 0): t² − 3t − 4 = 0 → t = 4 o t = −1.",
          "t = −1 no vale (2ˣ nunca es negativo). t = 4 → 2ˣ = 4 → <b>x = 2</b>."
        ]) +
        ejemplo("Cuando no se pueden igualar bases", "Resuelve 5ˣ = 7.", [
          "Tomamos logaritmos: x·log 5 = log 7 → x = log 7 / log 5 = 0,8451/0,6990 ≈ <b>1,209</b>.",
          "Comprobación: 5^1,209 ≈ 7 ✓."
        ]) +
        "<h5>Logarítmicas: reduce a un solo logaritmo y comprueba el dominio</h5>" +
        ejemplo("Suma de logaritmos", "Resuelve log₂(x + 3) + log₂(x − 3) = 4.", [
          "Dominio: x + 3 &gt; 0 y x − 3 &gt; 0, es decir, x &gt; 3.",
          "log₂[(x + 3)(x − 3)] = 4 → x² − 9 = 2⁴ = 16 → x² = 25 → x = ±5.",
          "x = −5 no está en el dominio (daría logaritmos de números negativos). <b>Solución: x = 5</b>. Comprobación: log₂ 8 + log₂ 2 = 3 + 1 = 4 ✓."
        ]) +
        ejemplo("Igualando logaritmos", "Resuelve 2·log x = log(x + 6).", [
          "2·log x = log x² (propiedad de la potencia). La ecuación es log x² = log(x + 6) → x² = x + 6 → x = 3 o x = −2.",
          "x = −2 no está en el dominio de log x. <b>Solución: x = 3</b>."
        ]) +
        ejemplo("Definición", "Resuelve log₃(2x − 1) = 2.", [
          "Por definición, 2x − 1 = 3² = 9 → 2x = 10 → <b>x = 5</b>. Dominio: 2·5 − 1 = 9 &gt; 0 ✓."
        ]) +
        ojo("log(A + B) <b>no</b> es log A + log B; log(A·B) sí lo es. Y al resolver una ecuación logarítmica, calcula siempre el dominio antes (o comprueba al final): las soluciones que anulan o vuelven negativos los argumentos se descartan.")
    },
    {
      h: "10. Inecuaciones",
      html:
        "<p>Una inecuación es como una ecuación pero con &lt;, &gt;, ≤ o ≥. Su solución no es un número sino un <b>intervalo</b> (o unión de intervalos), y se escribe con la notación del Tema 1.</p>" +
        "<h5>Primer grado: las mismas reglas que las ecuaciones, con una excepción</h5>" +
        "<p>Puedes sumar o restar lo mismo a los dos lados, y multiplicar o dividir por un número <b>positivo</b>. Pero si multiplicas o divides por un número <b>negativo</b>, la desigualdad se <b>invierte</b>: −2x ≥ −6 → x ≤ 3.</p>" +
        ejemplo("Primer grado", "Resuelve 3x − 7 &lt; 2x + 5 y −2x + 6 ≥ 0.", [
          "3x − 7 &lt; 2x + 5 → 3x − 2x &lt; 5 + 7 → <b>x &lt; 12</b> → (−∞, 12).",
          "−2x + 6 ≥ 0 → −2x ≥ −6 → (dividimos entre −2 e invertimos) <b>x ≤ 3</b> → (−∞, 3]."
        ]) +
        "<h5>Segundo grado, polinómicas y racionales: la tabla de signos</h5>" +
        "<p>Para cualquier inecuación P(x) &gt; 0 (o &lt;, ≥, ≤) el método es el mismo, y funciona también con fracciones:</p>" +
        "<ol><li>Pasa todo a un miembro, para que el otro sea 0.</li><li>Factoriza, y calcula los <b>ceros del numerador</b> y los <b>ceros del denominador</b>.</li><li>Dibuja una recta con esos valores: quedan varios intervalos. En cada uno, el signo de la expresión no cambia, así que <b>basta probar un valor</b> de cada intervalo.</li><li>Elige los intervalos con el signo pedido.</li><li>Decide los extremos: los ceros del numerador entran si la desigualdad es ≤ o ≥; los del denominador <b>nunca</b> entran.</li></ol>" +
        ejemplo("Segundo grado", "Resuelve x² − 3x − 4 ≥ 0.", [
          "x² − 3x − 4 = 0 → x = 4 o x = −1, así que x² − 3x − 4 = (x − 4)(x + 1).",
          "Intervalos: (−∞, −1), (−1, 4), (4, +∞). Probamos x = −2: (−6)(−1) = + · x = 0: (−4)(1) = − · x = 5: (1)(6) = +.",
          "Queremos ≥ 0, es decir, signo + o cero: <b>(−∞, −1] ∪ [4, +∞)</b>. Es lo que la gráfica de la parábola muestra: está por encima del eje X fuera de las raíces."
        ]) +
        ejemplo("Racional", "Resuelve (x − 1)/(x + 2) &gt; 0.", [
          "Cero del numerador: x = 1. Cero del denominador: x = −2 (prohibido).",
          "Intervalos: (−∞, −2): x = −3 → (−4)/(−1) = + · (−2, 1): x = 0 → (−1)/2 = − · (1, +∞): x = 2 → 1/4 = +.",
          "&gt; 0 pide signo +: <b>(−∞, −2) ∪ (1, +∞)</b>. El 1 no entra (la desigualdad es estricta) y el −2 tampoco (es un hueco)."
        ]) +
        ejemplo("Racional con ≤", "Resuelve (x² − 4)/(x² − 1) ≤ 0.", [
          "Numerador: x² − 4 = (x − 2)(x + 2), ceros ±2. Denominador: x² − 1 = (x − 1)(x + 1), ceros ±1 (prohibidos).",
          "Valores críticos ordenados: −2, −1, 1, 2. Signos en los cinco intervalos: (−∞, −2) +, (−2, −1) −, (−1, 1) +, (1, 2) −, (2, +∞) +.",
          "≤ 0 pide signo − o cero: <b>[−2, −1) ∪ (1, 2]</b>. Los extremos ±2 son ceros del numerador y entran; ±1 son huecos y no."
        ]) +
        w("signos") +
        "<h5>Sistemas de inecuaciones</h5>" +
        "<p>Se resuelve cada inecuación por separado y se hace la <b>intersección</b> de las soluciones (los x que cumplen todas a la vez).</p>" +
        ejemplo("Dos condiciones", "Resuelve el sistema 2x − 1 &gt; 3 y x² &lt; 25.", [
          "2x − 1 &gt; 3 → 2x &gt; 4 → x &gt; 2 → (2, +∞).",
          "x² &lt; 25 → (x − 5)(x + 5) &lt; 0 → −5 &lt; x &lt; 5 → (−5, 5).",
          "Intersección: <b>(2, 5)</b>."
        ]) +
        ojo("no elimines un factor que contiene la incógnita «dividiendo» en una inecuación: no sabes si es positivo o negativo y podrías invertir mal el sentido (o perder soluciones). Pasa todo al mismo lado y usa la tabla de signos.")
    },
    {
      h: "11. Problemas: de la frase a la ecuación",
      html:
        "<p>Casi todos los problemas de álgebra se resuelven con el mismo protocolo. Lo que cuesta no es resolver, sino <b>plantear</b>:</p>" +
        "<ol><li><b>Lee y subraya</b> qué se pregunta. Esa es la incógnita (o las incógnitas).</li><li><b>Pon nombre</b> a la incógnita («sea x = …») y expresa lo demás con ella.</li><li><b>Busca la igualdad</b>: ¿dos cosas que valen lo mismo? ¿Un total? ¿Un perímetro, una velocidad por un tiempo?</li><li><b>Resuelve</b>.</li><li><b>Comprueba en el enunciado</b>, no en tu ecuación (así detectas errores de planteamiento) y <b>contesta con una frase y unidades</b>.</li></ol>" +
        ejemplo("Números consecutivos", "Tres números impares consecutivos suman 111. ¿Cuáles son?", [
          "Sea x el menor; los siguientes impares son x + 2 y x + 4.",
          "x + (x + 2) + (x + 4) = 111 → 3x + 6 = 111 → x = 35.",
          "Los números son <b>35, 37 y 39</b> (35 + 37 + 39 = 111 ✓)."
        ]) +
        ejemplo("Edades", "Una madre tiene el triple de edad que su hija. Dentro de 10 años tendrá el doble. ¿Qué edades tienen ahora?", [
          "Hija: x. Madre: 3x. Dentro de 10 años: x + 10 y 3x + 10.",
          "3x + 10 = 2(x + 10) → 3x + 10 = 2x + 20 → x = 10.",
          "<b>La hija tiene 10 años y la madre 30</b>. Dentro de 10 años: 20 y 40 ✓."
        ]) +
        ejemplo("Mezclas (sistema)", "Se mezclan dos aceites, uno de 4 €/L y otro de 6 €/L, para obtener 20 L de mezcla a 5,20 €/L. ¿Cuántos litros hay de cada uno?", [
          "x = litros del barato, y = litros del caro. Volumen: x + y = 20. Dinero: 4x + 6y = 5,2·20 = 104.",
          "Con y = 20 − x: 4x + 6(20 − x) = 104 → 120 − 2x = 104 → x = 8.",
          "<b>8 L de 4 €/L y 12 L de 6 €/L</b> (8·4 + 12·6 = 32 + 72 = 104 ✓)."
        ]) +
        ejemplo("Móviles: alcance", "Un coche sale a 60 km/h. Dos horas después sale tras él otro a 90 km/h. ¿Cuándo lo alcanza y a qué distancia?", [
          "Sea t las horas que viaja el segundo. El primero lleva t + 2 horas. Se encuentran cuando ambos han recorrido lo mismo: 60(t + 2) = 90t.",
          "120 = 30t → t = 4. Lo alcanza <b>4 horas después de salir</b> y a 90·4 = <b>360 km</b> (el primero: 60·6 = 360 ✓)."
        ]) +
        ejemplo("Trabajo en común", "Un grifo llena un depósito en 6 h y otro en 3 h. ¿Cuánto tardan si se abren los dos a la vez?", [
          "Cada grifo llena una fracción del depósito por hora: 1/6 y 1/3.",
          "Juntos: 1/6 + 1/3 = 1/2 del depósito por hora → lo llenan en <b>2 horas</b>."
        ]) +
        ejemplo("Trabajo con desagüe", "Un grifo llena un depósito en 4 h, pero hay un desagüe que lo vaciaría en 12 h. Si se abren los dos a la vez, ¿cuánto tarda en llenarse?", [
          "El grifo llena 1/4 del depósito por hora y el desagüe vacía 1/12 por hora (resta, no suma).",
          "Cada hora se gana 1/4 − 1/12 = 3/12 − 1/12 = 1/6 del depósito → tarda <b>6 horas</b>."
        ]) +
        ejemplo("Dibujo geométrico", "El largo de un rectángulo mide 3 m más que el ancho y su área es 40 m². Halla las dimensiones.", [
          "Ancho x, largo x + 3. Área: x(x + 3) = 40 → x² + 3x − 40 = 0 → x = (−3 ± 13)/2 → x = 5 o x = −8.",
          "Una longitud no puede ser negativa: <b>5 m de ancho y 8 m de largo</b> (5·8 = 40 ✓)."
        ]) +
        ejemplo("Dos incógnitas", "En un concierto se vendieron 120 entradas, de adulto a 8 € y de niño a 5 €, y se recaudaron 810 €. ¿Cuántas de cada tipo?", [
          "a = adultos, n = niños. a + n = 120 y 8a + 5n = 810. Sustituimos n = 120 − a: 8a + 600 − 5a = 810 → 3a = 210 → a = 70.",
          "<b>70 entradas de adulto y 50 de niño</b> (8·70 + 5·50 = 560 + 250 = 810 ✓)."
        ])
    },
    {
      h: "12. ¿Qué método uso? Mapa de decisiones",
      html:
        "<p>En un examen la dificultad suele ser decidir <i>qué herramienta</i> tocar, no hacer la cuenta. Practica ese reflejo: relaciona cada problema con el primer paso que harías.</p>" +
        w("emparejar", "metodos") +
        "<p>Y ahora, clasifica estas ecuaciones por su tipo para ver cuáles necesitan una comprobación final:</p>" +
        w("clasificar", "tipos")
    },
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "14. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas para memorizar las fórmulas y los criterios del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe (x + 5)² = x² + 25. ¿Qué falla?",
          op: ["Nada, es correcto", "Falta el doble producto: (x + 5)² = x² + 10x + 25", "Debía ser x² − 25", "Debía ser x² + 5x + 25"], ok: 1,
          porque: "(a + b)² = a² + 2ab + b². Con a = x y b = 5 el término central es 2·x·5 = 10x. Pruébalo con x = 1: (1 + 5)² = 36, mientras que 1 + 25 = 26." },
        { q: "Para dividir x³ + 2x² − 5x − 6 entre (x + 3) por Ruffini, un alumno usa a = 3. ¿Qué falla?",
          op: ["Nada", "Debe usar a = −3, porque x + 3 = x − (−3)", "Debe usar a = 6", "Ruffini no se puede aplicar a x + 3"], ok: 1,
          porque: "Ruffini divide entre x − a. El divisor x + 3 se anula en x = −3, así que a = −3. Con a = 3 se estaría dividiendo entre x − 3." },
        { q: "En 5x² = 20x, un alumno divide entre x y obtiene 5x = 20, es decir, x = 4. ¿Qué ha perdido?",
          op: ["Nada: 4 es la única solución", "La solución x = 0, al dividir entre una incógnita que puede valer 0", "La solución x = −4", "El signo del resultado"], ok: 1,
          porque: "Correcto es pasar todo a un lado y sacar factor común: 5x² − 20x = 5x(x − 4) = 0 → x = 0 o x = 4. Dividir entre x supone x ≠ 0 y elimina una solución." },
        { q: "Resolviendo √(x + 6) = x, un alumno obtiene x = 3 y x = −2 y da las dos como solución. ¿Qué falla?",
          op: ["Nada", "No ha comprobado: x = −2 da √4 = 2, que no es −2. Es una solución falsa", "Debía obtener solo x = −2", "Debía obtener x = 6"], ok: 1,
          porque: "Elevar al cuadrado no distingue el signo, por lo que se pueden colar soluciones falsas. Hay que sustituir en la ecuación original: √9 = 3 ✓ pero √4 = 2 ≠ −2." },
        { q: "Un alumno resuelve −2x &gt; 6 y escribe x &gt; −3. ¿Qué falla?",
          op: ["Nada", "Al dividir entre un número negativo hay que invertir la desigualdad: x &lt; −3", "Debía salir x &gt; 3", "Debía salir x &lt; 3"], ok: 1,
          porque: "−2x &gt; 6 → x &lt; 6/(−2) = −3. Compruébalo con x = −4: −2·(−4) = 8 &gt; 6 ✓ mientras que x = 0 (que cumple x &gt; −3) da 0 &gt; 6 falso." },
        { q: "Un alumno escribe log(x + 3) = log x + log 3. ¿Qué falla?",
          op: ["Nada, es la propiedad de la suma", "log(A·B) = log A + log B, pero log(A + B) no se descompone así", "Debía ser log x · log 3", "Debía ser log(x − 3)"], ok: 1,
          porque: "La propiedad es sobre productos: log(3x) = log 3 + log x. Para una suma dentro del logaritmo no hay ninguna propiedad. Con x = 7: log 10 = 1, pero log 7 + log 3 = log 21 ≈ 1,32." },
        { q: "Un alumno «simplifica» (x² + 1)/(x² − 1) = −1 tachando los x² y los 1. ¿Qué falla?",
          op: ["Nada", "Solo se tachan factores, no sumandos: esa fracción no se puede simplificar", "Debía salir 1", "Debía salir 0"], ok: 1,
          porque: "En x² + 1 el x² y el 1 están sumando, no multiplicando. Con x = 3: (9 + 1)/(9 − 1) = 10/8, no −1." },
        { q: "Un alumno resuelve x² − 4x + 5 = 0: Δ = 16 − 20 = −4 y escribe x = (4 ± √−4)/2 = 2 ± 2. ¿Qué falla?",
          op: ["Nada", "Con Δ &lt; 0 no existe √Δ entre los reales: no hay solución real", "Δ está mal calculado", "Las soluciones son 2 y 0"], ok: 1,
          porque: "No existe √(−4) como número real. La parábola y = x² − 4x + 5 tiene su vértice en (2, 1), por encima del eje X, y nunca vale 0." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El resto de dividir x³ − 2x + 1 entre (x − 1) es…",
          op: ["0", "1", "−1", "2"], ok: 0,
          porque: "Teorema del resto: P(1) = 1 − 2 + 1 = 0. Por eso x − 1 es factor de P." },
        { q: "¿Cuál es la factorización de x³ − 2x² − 5x + 6?",
          op: ["(x − 1)(x − 3)(x + 2)", "(x + 1)(x + 3)(x − 2)", "(x − 1)(x + 3)(x + 2)", "(x − 6)(x + 1)"], ok: 0,
          porque: "Las raíces son 1, 3 y −2 (P(1) = 0, P(3) = 27 − 18 − 15 + 6 = 0, P(−2) = −8 − 8 + 10 + 6 = 0)." },
        { q: "El discriminante de x² − 4x + 4 = 0 vale…",
          op: ["0 (una solución doble)", "8", "−16", "16"], ok: 0,
          porque: "Δ = 16 − 16 = 0: la ecuación tiene la solución doble x = 2, pues x² − 4x + 4 = (x − 2)²." },
        { q: "¿Cuántas soluciones reales tiene x⁴ + 4 = 0?",
          op: ["Ninguna", "Dos", "Cuatro", "Una"], ok: 0,
          porque: "x⁴ = −4 es imposible: una potencia par de un número real nunca es negativa." },
        { q: "El sistema x + 2y = 4, 2x + 4y = 9 es…",
          op: ["Incompatible", "Compatible determinado", "Compatible indeterminado", "Imposible de clasificar"], ok: 0,
          porque: "La 2.ª ecuación equivale a x + 2y = 4,5, que contradice a la 1.ª: las rectas son paralelas y no se cortan." },
        { q: "Para resolver 4ˣ − 3·2ˣ − 4 = 0 conviene el cambio…",
          op: ["t = 2ˣ", "t = x²", "t = 4ˣ + 2ˣ", "No hay cambio posible"], ok: 0,
          porque: "4ˣ = (2ˣ)², así que con t = 2ˣ queda t² − 3t − 4 = 0, de la que solo vale la solución t &gt; 0." },
        { q: "log₂ 32 vale…",
          op: ["5", "16", "6", "4"], ok: 0,
          porque: "2⁵ = 32, así que el exponente buscado es 5." },
        { q: "La solución de (x − 1)/(x + 2) &gt; 0 es…",
          op: ["(−∞, −2) ∪ (1, +∞)", "(−2, 1)", "(1, +∞)", "[−2, 1]"], ok: 0,
          porque: "Los ceros son 1 (numerador) y −2 (denominador). El signo es + en (−∞, −2), − en (−2, 1) y + en (1, +∞)." },
        { q: "Si las soluciones de una ecuación de segundo grado son 3 y −5, la ecuación (con a = 1) es…",
          op: ["x² + 2x − 15 = 0", "x² − 2x − 15 = 0", "x² + 2x + 15 = 0", "x² − 8x − 15 = 0"], ok: 0,
          porque: "x² − (suma)x + (producto): suma = −2, producto = −15 → x² + 2x − 15 = 0." },
        { q: "¿Qué valor de k hace que x³ + kx² − 4x + 4 sea divisible por (x − 2)?",
          op: ["k = −1", "k = 1", "k = 2", "k = −2"], ok: 0,
          porque: "P(2) = 8 + 4k − 8 + 4 = 4k + 4 = 0 → k = −1." }
      ]
    },
    tj1: {
      titulo: "Fórmulas y criterios de álgebra",
      cartas: [
        { a: "Teorema del resto", b: "El resto de dividir P(x) entre (x − a) es P(a)." },
        { a: "Teorema del factor", b: "(x − a) es factor de P(x) ⇔ P(a) = 0 ⇔ a es una raíz de P." },
        { a: "Raíces racionales posibles de un polinomio de coeficientes enteros", b: "Fracciones p/q con p divisor del término independiente a₀ y q divisor del coeficiente principal aₙ (con signo + y −)." },
        { a: "Prueba de la división de polinomios", b: "P = Q·C + R, con grado de R &lt; grado de Q." },
        { a: "Fórmula de la ecuación de 2.º grado", b: "x = (−b ± √(b² − 4ac)) / 2a" },
        { a: "Discriminante y número de soluciones", b: "Δ = b² − 4ac. Δ &gt; 0: dos soluciones. Δ = 0: una doble. Δ &lt; 0: ninguna real." },
        { a: "Suma y producto de las soluciones de ax² + bx + c = 0", b: "x₁ + x₂ = −b/a y x₁·x₂ = c/a. La ecuación con soluciones dadas es x² − (suma)x + (producto) = 0." },
        { a: "Cómo se resuelve ax⁴ + bx² + c = 0", b: "Cambio t = x²: at² + bt + c = 0. Cada t &gt; 0 da x = ±√t; t = 0 da x = 0; t &lt; 0 no da solución." },
        { a: "Las tres clases de sistemas lineales", b: "Compatible determinado (una solución, rectas que se cortan), compatible indeterminado (infinitas, rectas coincidentes) e incompatible (ninguna, rectas paralelas)." },
        { a: "Cómo se simplifica una fracción algebraica", b: "Factorizando numerador y denominador y tachando los factores comunes. Los valores que anulan el denominador original siguen prohibidos." },
        { a: "Ecuación irracional: protocolo", b: "Aislar la raíz → elevar al cuadrado los dos miembros → resolver → comprobar todas las soluciones en la ecuación original." },
        { a: "Propiedades de los logaritmos", b: "log(AB) = log A + log B · log(A/B) = log A − log B · log(Aᵏ) = k·log A · log_b N = log N / log b" },
        { a: "Dominio de log_b(f(x))", b: "f(x) &gt; 0. Las soluciones que hagan f(x) ≤ 0 se descartan." },
        { a: "Pasos para resolver una inecuación de grado mayor que 1", b: "Pasar todo a un lado → ceros del numerador y del denominador → recta con intervalos → signo de un valor de prueba en cada uno → elegir y decidir extremos (los ceros del denominador nunca entran)." },
        { a: "¿Cuándo se invierte una desigualdad?", b: "Al multiplicar o dividir los dos miembros por un número negativo: −2x &gt; 6 ⇒ x &lt; −3." }
      ]
    },
    metodos: {
      titulo: "¿Con qué empiezo?",
      consigna: "Une cada problema con el primer paso que darías.",
      pares: [
        ["x³ − 7x + 6 = 0 (busca raíces enteras)", "Probar con Ruffini los divisores de 6"],
        ["x⁴ − 10x² + 9 = 0", "Cambio t = x² (bicuadrada)"],
        ["√(x + 6) = x", "Aislar la raíz, elevar al cuadrado y comprobar"],
        ["1/x + 1/(x + 2) = 3/4", "Multiplicar por el mcm y descartar valores prohibidos"],
        ["4ˣ − 3·2ˣ − 4 = 0", "Cambio t = 2ˣ"],
        ["log(x + 3) + log(x − 3) = 1", "Juntar en un solo logaritmo y comprobar el dominio"],
        ["(x − 1)/(x + 2) &gt; 0", "Tabla de signos"],
        ["5x² − 20x = 0", "Sacar factor común (no dividir entre x)"],
        ["x + y = 5 y x·y = 6", "Despejar en la lineal y sustituir"]
      ]
    },
    tipos: {
      titulo: "¿Hay que comprobar?",
      consigna: "Toca una ecuación y después el grupo al que pertenece según la comprobación que exige.",
      categorias: ["Polinómica o exponencial sencilla: no suele haber soluciones falsas", "Con raíces o denominadores: comprobar siempre", "Con logaritmos: comprobar el dominio"],
      items: [
        { t: "x² − 5x + 6 = 0", c: 0 }, { t: "x⁴ − 5x² + 4 = 0", c: 0 }, { t: "2ˣ⁺¹ = 16", c: 0 }, { t: "5x³ − 10x² = 0", c: 0 },
        { t: "√(2x + 1) = x − 1", c: 1 }, { t: "3/(x − 1) = 2/(x + 1)", c: 1 }, { t: "x/(x − 3) = 2", c: 1 }, { t: "√x + 3 = 8", c: 1 },
        { t: "ln x + ln(x − 1) = ln 6", c: 2 }, { t: "log₂(x − 5) = 3", c: 2 }, { t: "2·log x = log(x + 6)", c: 2 }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "e1", nivel: 1,
      enunciado: "Calcula el valor numérico de P(x) = 3x⁴ − 2x + 5 para x = −1.",
      check: { tipo: "num", etiqueta: "P(−1) =", valor: 10 },
      pistas: ["Sustituye x por −1 con paréntesis: (−1)⁴ = 1."],
      pasos: ["P(−1) = 3·(−1)⁴ − 2·(−1) + 5 = 3·1 + 2 + 5 = 10."],
      resultado: "P(−1) = 10",
      ojo: "(−1)⁴ = +1; si escribes −1⁴ te sale −1." },
    { id: "e2", nivel: 1,
      enunciado: "Dados P(x) = 2x² − 3x + 1 y Q(x) = x² + 5x − 4, calcula P(x) − Q(x). Indica sus tres coeficientes.",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 1 }, { tipo: "num", etiqueta: "coef. de x =", valor: -8 }, { tipo: "num", etiqueta: "término independiente =", valor: 5 }],
      pistas: ["Al restar, cambia el signo de todos los términos de Q."],
      pasos: ["P − Q = (2x² − 3x + 1) − (x² + 5x − 4) = 2x² − 3x + 1 − x² − 5x + 4.", "x²: 2 − 1 = 1 · x: −3 − 5 = −8 · independiente: 1 + 4 = 5.", "P − Q = x² − 8x + 5."],
      resultado: "x² − 8x + 5" },
    { id: "e3", nivel: 1,
      enunciado: "Desarrolla (x + 4)² y escribe los coeficientes de x y del término independiente.",
      check: [{ tipo: "num", etiqueta: "coef. de x =", valor: 8 }, { tipo: "num", etiqueta: "término independiente =", valor: 16 }],
      pistas: ["(a + b)² = a² + 2ab + b²."],
      pasos: ["(x + 4)² = x² + 2·x·4 + 4² = x² + 8x + 16."],
      resultado: "x² + 8x + 16" },
    { id: "e4", nivel: 1,
      enunciado: "¿Cuál es la factorización de x² − 49?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["(x − 7)(x + 7)", "(x − 7)²", "(x + 7)²", "No se puede factorizar"], ok: 0 },
      pistas: ["Es una diferencia de cuadrados: a² − b² = (a + b)(a − b)."],
      pasos: ["x² − 49 = x² − 7² = (x + 7)(x − 7)."],
      resultado: "(x − 7)(x + 7)" },
    { id: "e5", nivel: 1,
      enunciado: "Divide x³ − 4x² + x + 6 entre (x − 2) con la regla de Ruffini. ¿Cuánto vale el resto?",
      check: { tipo: "num", etiqueta: "Resto =", valor: 0 },
      pistas: ["Coeficientes 1, −4, 1, 6 y a = 2.", "También vale el teorema del resto: P(2)."],
      pasos: ["Ruffini con a = 2: bajar 1 · 1·2 = 2 → −4 + 2 = −2 · −2·2 = −4 → 1 − 4 = −3 · −3·2 = −6 → 6 − 6 = 0.", "Cociente x² − 2x − 3, resto 0. Con el teorema del resto: P(2) = 8 − 16 + 2 + 6 = 0 ✓."],
      resultado: "Resto 0 (cociente x² − 2x − 3)" },
    { id: "e6", nivel: 1,
      enunciado: "Resuelve la ecuación x² − 5x + 6 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [2, 3], ph: "dos valores separados por comas" },
      pistas: ["Δ = 25 − 24 = 1.", "O bien busca dos números que sumen 5 y multipliquen 6."],
      pasos: ["x = (5 ± √(25 − 24))/2 = (5 ± 1)/2 → x = 3 o x = 2.", "Comprobación con Vieta: 3 + 2 = 5 ✓ y 3·2 = 6 ✓."],
      resultado: "x = 2 y x = 3" },
    { id: "e7", nivel: 1,
      enunciado: "Resuelve 3x² − 12 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2] },
      pistas: ["Falta el término en x: despeja x²."],
      pasos: ["3x² = 12 → x² = 4 → x = ±2."],
      resultado: "x = 2 y x = −2" },
    { id: "e8", nivel: 1,
      enunciado: "Resuelve el sistema x + y = 10, x − y = 2.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 6 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["Suma las dos ecuaciones: se cancela y."],
      pasos: ["Sumando: 2x = 12 → x = 6.", "y = 10 − 6 = 4. Comprobación: 6 − 4 = 2 ✓."],
      resultado: "x = 6, y = 4" },
    { id: "e9", nivel: 1,
      enunciado: "Resuelve la inecuación 2x − 3 &gt; 7.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(5, +∞)", "[5, +∞)", "(−∞, 5)", "(−∞, 2)"], ok: 0 },
      pistas: ["Pasa el −3 sumando y divide entre 2 (positivo: no se invierte)."],
      pasos: ["2x &gt; 10 → x &gt; 5. El 5 no entra, porque la desigualdad es estricta: (5, +∞)."],
      resultado: "(5, +∞)" },
    { id: "e10", nivel: 1,
      enunciado: "Calcula log₂ 32 y resuelve 2ˣ = 16.",
      check: [{ tipo: "num", etiqueta: "log₂ 32 =", valor: 5 }, { tipo: "num", etiqueta: "x =", valor: 4 }],
      pistas: ["log₂ 32 es el exponente al que hay que elevar 2 para obtener 32."],
      pasos: ["2⁵ = 32 → log₂ 32 = 5.", "16 = 2⁴ → 2ˣ = 2⁴ → x = 4."],
      resultado: "log₂ 32 = 5 y x = 4" },
    // ================= ★★ medio =================
    { id: "e11", nivel: 2,
      enunciado: "Desarrolla (x − 2)(x² + 2x + 4). Escribe los coeficientes de x², de x y el término independiente (¡sale una identidad notable!).",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 0 }, { tipo: "num", etiqueta: "coef. de x =", valor: 0 }, { tipo: "num", etiqueta: "término independiente =", valor: -8 }],
      pistas: ["x·(x² + 2x + 4) − 2·(x² + 2x + 4)."],
      pasos: ["(x − 2)(x² + 2x + 4) = x³ + 2x² + 4x − 2x² − 4x − 8 = x³ − 8.", "Es la diferencia de cubos al revés: a³ − b³ = (a − b)(a² + ab + b²)."],
      resultado: "x³ − 8" },
    { id: "e12", nivel: 2,
      enunciado: "Divide 2x³ + x² − 5x + 2 entre x² + x − 2. Escribe el cociente (ax + b) y el resto.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 2 }, { tipo: "num", etiqueta: "b =", valor: -1 }, { tipo: "num", etiqueta: "resto =", valor: 0 }],
      pistas: ["2x³ ÷ x² = 2x. Multiplica 2x por todo el divisor y resta."],
      pasos: ["2x·(x² + x − 2) = 2x³ + 2x² − 4x. Resta: (2x³ + x² − 5x + 2) − (2x³ + 2x² − 4x) = −x² − x + 2.", "−x² ÷ x² = −1. (−1)(x² + x − 2) = −x² − x + 2. Resta: 0.", "Cociente 2x − 1, resto 0."],
      resultado: "Cociente 2x − 1, resto 0" },
    { id: "e13", nivel: 2,
      enunciado: "Halla las raíces de P(x) = x³ − 6x² + 11x − 6.",
      check: { tipo: "lista", etiqueta: "Raíces:", valores: [1, 2, 3] },
      pistas: ["Prueba los divisores de 6: ±1, ±2, ±3, ±6.", "P(1) = 0."],
      pasos: ["P(1) = 1 − 6 + 11 − 6 = 0. Ruffini con 1: 1, −5, 6, resto 0.", "x² − 5x + 6 = 0 → x = 2 o x = 3.", "P(x) = (x − 1)(x − 2)(x − 3)."],
      resultado: "x = 1, 2 y 3" },
    { id: "e14", nivel: 2,
      enunciado: "Factoriza x³ − x² − 4x + 4 y escribe sus raíces.",
      check: { tipo: "lista", etiqueta: "Raíces:", valores: [-2, 1, 2] },
      pistas: ["Prueba sacar factor común por grupos: x²(x − 1) − 4(x − 1)."],
      pasos: ["x³ − x² − 4x + 4 = x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4) = (x − 1)(x − 2)(x + 2).", "Raíces: 1, 2 y −2."],
      resultado: "(x − 1)(x − 2)(x + 2)" },
    { id: "e15", nivel: 2,
      enunciado: "Halla k para que P(x) = x³ + 3x² + kx − 6 sea divisible por (x + 3).",
      check: { tipo: "num", etiqueta: "k =", valor: -2 },
      pistas: ["Divisible por x + 3 significa P(−3) = 0."],
      pasos: ["P(−3) = −27 + 27 − 3k − 6 = −3k − 6 = 0 → k = −2.", "Con k = −2: x³ + 3x² − 2x − 6 = x²(x + 3) − 2(x + 3) = (x + 3)(x² − 2)."],
      resultado: "k = −2" },
    { id: "e16", nivel: 2,
      enunciado: "Calcula, sin dividir, el resto de dividir x⁵ − 2x³ + x − 7 entre (x + 1).",
      check: { tipo: "num", etiqueta: "Resto =", valor: -7 },
      pistas: ["Teorema del resto con a = −1."],
      pasos: ["P(−1) = (−1)⁵ − 2(−1)³ + (−1) − 7 = −1 + 2 − 1 − 7 = −7."],
      resultado: "Resto −7" },
    { id: "e17", nivel: 2,
      enunciado: "Resuelve 2x² − 7x + 3 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [3, 0.5], ph: "por ejemplo 3, 1/2" },
      pistas: ["Δ = 49 − 24."],
      pasos: ["Δ = 49 − 24 = 25. x = (7 ± 5)/4 → x = 3 o x = 1/2.", "Comprobación: 3 + 1/2 = 7/2 = −b/a ✓ y 3·1/2 = 3/2 = c/a ✓."],
      resultado: "x = 3 y x = 1/2" },
    { id: "e18", nivel: 2,
      enunciado: "¿Para qué valor de k la ecuación x² − 6x + k = 0 tiene una solución doble?",
      check: { tipo: "num", etiqueta: "k =", valor: 9 },
      pistas: ["Solución doble ⇔ Δ = 0."],
      pasos: ["Δ = 36 − 4k = 0 → k = 9. La ecuación es (x − 3)² = 0."],
      resultado: "k = 9" },
    { id: "e19", nivel: 2,
      enunciado: "Resuelve la ecuación bicuadrada x⁴ − 13x² + 36 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-3, -2, 2, 3] },
      pistas: ["Cambio t = x²: t² − 13t + 36 = 0."],
      pasos: ["t = (13 ± √(169 − 144))/2 = (13 ± 5)/2 → t = 9 o t = 4.", "x = ±3 y x = ±2."],
      resultado: "x = −3, −2, 2 y 3" },
    { id: "e20", nivel: 2,
      enunciado: "Resuelve el sistema 2x + 3y = 13, 3x − y = 3.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["En la segunda, y = 3x − 3: sustituye."],
      pasos: ["2x + 3(3x − 3) = 13 → 11x − 9 = 13 → x = 2.", "y = 3·2 − 3 = 3. Comprobación en la 1.ª: 4 + 9 = 13 ✓."],
      resultado: "x = 2, y = 3" },
    { id: "e21", nivel: 2,
      enunciado: "Resuelve 1/x + 1/(x + 2) = 3/4. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [2, -4 / 3], ph: "por ejemplo 2, -4/3" },
      pistas: ["Multiplica por el mcm 4x(x + 2).", "Termina en 3x² − 2x − 8 = 0."],
      pasos: ["4(x + 2) + 4x = 3x(x + 2) → 8x + 8 = 3x² + 6x → 3x² − 2x − 8 = 0.", "x = (2 ± 10)/6 → x = 2 o x = −4/3. Ninguna anula un denominador."],
      resultado: "x = 2 y x = −4/3" },
    { id: "e22", nivel: 2,
      enunciado: "Resuelve √(2x − 1) + 2 = x. Da la solución válida.",
      check: { tipo: "num", etiqueta: "x =", valor: 5 },
      pistas: ["Aísla la raíz: √(2x − 1) = x − 2.", "Comprueba las dos soluciones obtenidas."],
      pasos: ["Elevamos al cuadrado: 2x − 1 = x² − 4x + 4 → x² − 6x + 5 = 0 → x = 5 o x = 1.", "x = 5: √9 + 2 = 5 ✓. x = 1: √1 + 2 = 3 ≠ 1 ✗.", "Solución: x = 5."],
      resultado: "x = 5",
      ojo: "x = 1 es una solución falsa: aparece al elevar al cuadrado, pero no cumple la ecuación." },
    { id: "e23", nivel: 2,
      enunciado: "Resuelve 2²ˣ − 5·2ˣ + 4 = 0. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 2] },
      pistas: ["2²ˣ = (2ˣ)². Cambio t = 2ˣ."],
      pasos: ["t² − 5t + 4 = 0 → t = 1 o t = 4.", "2ˣ = 1 → x = 0. 2ˣ = 4 → x = 2."],
      resultado: "x = 0 y x = 2" },
    { id: "e24", nivel: 2,
      enunciado: "Resuelve log₃(x + 2) + log₃(x − 4) = 3. Da la solución válida.",
      check: { tipo: "num", etiqueta: "x =", valor: 7 },
      pistas: ["Junta los logaritmos: log₃[(x + 2)(x − 4)] = 3.", "Dominio: x &gt; 4."],
      pasos: ["(x + 2)(x − 4) = 3³ = 27 → x² − 2x − 8 = 27 → x² − 2x − 35 = 0 → x = 7 o x = −5.", "x = −5 no está en el dominio (x &gt; 4). Solución x = 7: log₃ 9 + log₃ 3 = 2 + 1 = 3 ✓."],
      resultado: "x = 7" },
    { id: "e25", nivel: 2,
      enunciado: "Resuelve la inecuación x² − x − 6 &lt; 0.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−2, 3)", "(−∞, −2) ∪ (3, +∞)", "[−2, 3]", "(−3, 2)"], ok: 0 },
      pistas: ["Raíces: x² − x − 6 = (x − 3)(x + 2).", "Una parábola con a &gt; 0 es negativa entre sus raíces."],
      pasos: ["Raíces: −2 y 3. Probamos x = 0: −6 &lt; 0 ✓ (el intervalo central es solución).", "La desigualdad es estricta: (−2, 3)."],
      resultado: "(−2, 3)" },
    { id: "e26", nivel: 2,
      enunciado: "La suma de un número y su inverso es 10/3. ¿Cuáles son los dos números posibles?",
      check: { tipo: "lista", etiqueta: "x =", valores: [3, 1 / 3], ph: "por ejemplo 3, 1/3" },
      pistas: ["x + 1/x = 10/3. Multiplica por 3x."],
      pasos: ["3x² + 3 = 10x → 3x² − 10x + 3 = 0 → x = (10 ± 8)/6 → x = 3 o x = 1/3.", "Cada uno es el inverso del otro, así que son la misma pareja: 3 y 1/3."],
      resultado: "3 y 1/3" },
    // ================= ★★★ nivel PAU =================
    { id: "e27", nivel: 3,
      enunciado: "Halla a y b para que P(x) = x³ + ax² + bx − 6 sea divisible por (x − 1) y por (x + 3).",
      check: [{ tipo: "num", etiqueta: "a =", valor: 4 }, { tipo: "num", etiqueta: "b =", valor: 1 }],
      pistas: ["P(1) = 0 y P(−3) = 0: dos ecuaciones con a y b."],
      pasos: ["P(1) = 1 + a + b − 6 = 0 → a + b = 5.", "P(−3) = −27 + 9a − 3b − 6 = 0 → 9a − 3b = 33 → 3a − b = 11.", "Sumando: 4a = 16 → a = 4, b = 1.", "P(x) = x³ + 4x² + x − 6 = (x − 1)(x + 2)(x + 3)."],
      resultado: "a = 4 y b = 1" },
    { id: "e28", nivel: 3,
      enunciado: "Factoriza P(x) = x⁴ − 3x³ − 3x² + 11x − 6. Indica sus raíces distintas y la raíz doble.",
      check: [{ tipo: "lista", etiqueta: "Raíces distintas:", valores: [-2, 1, 3] }, { tipo: "num", etiqueta: "Raíz doble =", valor: 1 }],
      pistas: ["P(1) = 0. Después de dividir, vuelve a probar con x = 1."],
      pasos: ["P(1) = 1 − 3 − 3 + 11 − 6 = 0. Ruffini con 1: 1, −2, −5, 6 y resto 0 → x³ − 2x² − 5x + 6.", "Otra vez P(1) = 1 − 2 − 5 + 6 = 0: Ruffini con 1 → 1, −1, −6 → x² − x − 6 = (x − 3)(x + 2).", "P(x) = (x − 1)²(x − 3)(x + 2). Raíces: 1 (doble), 3 y −2."],
      resultado: "P(x) = (x − 1)²(x − 3)(x + 2)" },
    { id: "e29", nivel: 3,
      enunciado: "Simplifica (x³ − x)/(x² − 2x + 1).",
      check: { tipo: "opcion", etiqueta: "Resultado", opciones: ["x(x + 1)/(x − 1)", "x/(x − 1)", "(x + 1)/(x − 1)", "x(x − 1)/(x + 1)"], ok: 0 },
      pistas: ["Factoriza: x³ − x = x(x² − 1) y x² − 2x + 1 = (x − 1)²."],
      pasos: ["x³ − x = x(x − 1)(x + 1). x² − 2x + 1 = (x − 1)².", "Tachando un factor (x − 1): x(x + 1)/(x − 1), con x ≠ 1."],
      resultado: "x(x + 1)/(x − 1)  (x ≠ 1)" },
    { id: "e30", nivel: 3,
      enunciado: "Resuelve x + 3/(x − 3) = 3 + 3/(x − 3).",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["x = 3", "x = 0", "x = −3", "No tiene solución"], ok: 3 },
      pistas: ["Prohibido: x = 3. Multiplica por x − 3."],
      pasos: ["Multiplicando por (x − 3): x(x − 3) + 3 = 3(x − 3) + 3 → x² − 3x = 3x − 9 → x² − 6x + 9 = 0 → x = 3.", "Pero x = 3 anula el denominador: es una solución falsa.", "La ecuación no tiene solución."],
      resultado: "No tiene solución (la única candidata, x = 3, está prohibida)" },
    { id: "e31", nivel: 3,
      enunciado: "Resuelve √(2x + 3) − √(x + 1) = 1. Escribe las soluciones válidas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-1, 3] },
      pistas: ["Aísla una raíz: √(2x + 3) = 1 + √(x + 1).", "Tras elevar al cuadrado queda x + 1 = 2√(x + 1). Llama s = √(x + 1)."],
      pasos: ["Elevamos: 2x + 3 = 1 + 2√(x + 1) + x + 1 → x + 1 = 2√(x + 1).", "Con s = √(x + 1) ≥ 0: s² = 2s → s = 0 o s = 2 → x = −1 o x = 3.", "Comprobación: x = −1 → √1 − √0 = 1 ✓. x = 3 → √9 − √4 = 3 − 2 = 1 ✓."],
      resultado: "x = −1 y x = 3" },
    { id: "e32", nivel: 3,
      enunciado: "Resuelve 2ˣ + 2¹⁻ˣ = 3. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 1] },
      pistas: ["2¹⁻ˣ = 2/2ˣ. Cambio t = 2ˣ y multiplica por t."],
      pasos: ["t + 2/t = 3 → t² − 3t + 2 = 0 → t = 1 o t = 2.", "2ˣ = 1 → x = 0. 2ˣ = 2 → x = 1."],
      resultado: "x = 0 y x = 1" },
    { id: "e33", nivel: 3,
      enunciado: "Resuelve log(x² − 4) − log(x + 2) = 1 (logaritmos decimales).",
      check: { tipo: "num", etiqueta: "x =", valor: 12 },
      pistas: ["x² − 4 = (x − 2)(x + 2). Dominio: x &gt; 2.", "log A − log B = log(A/B)."],
      pasos: ["log[(x² − 4)/(x + 2)] = 1 → log(x − 2) = 1 (con x ≠ −2) → x − 2 = 10 → x = 12.", "Dominio x &gt; 2 ✓. Comprobación: log 140 − log 14 = log 10 = 1 ✓."],
      resultado: "x = 12" },
    { id: "e34", nivel: 3,
      enunciado: "Resuelve (x² − x − 6)/(x − 1) ≤ 0.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−∞, −2] ∪ (1, 3]", "[−2, 1) ∪ [3, +∞)", "(−∞, −2) ∪ (1, 3)", "[−2, 3]"], ok: 0 },
      pistas: ["Numerador: (x − 3)(x + 2). Denominador: x − 1 (prohibido).", "Signos en (−∞,−2), (−2,1), (1,3), (3,+∞)."],
      pasos: ["Ceros: −2 y 3 (numerador, entran porque es ≤) y 1 (denominador, no entra).", "Signos: (−∞, −2): (+)/(−) = − · (−2, 1): (−)/(−) = + · (1, 3): (−)/(+) = − · (3, +∞): +.", "≤ 0: (−∞, −2] ∪ (1, 3]."],
      resultado: "(−∞, −2] ∪ (1, 3]" },
    { id: "e35", nivel: 3,
      enunciado: "Resuelve x² + y² = 34, x − y = 2. Escribe los valores de x y los de y.",
      check: [{ tipo: "lista", etiqueta: "valores de x:", valores: [5, -3] }, { tipo: "lista", etiqueta: "valores de y:", valores: [3, -5] }],
      pistas: ["De la lineal: x = y + 2.", "Sustituye y obtendrás una ecuación de segundo grado en y."],
      pasos: ["(y + 2)² + y² = 34 → 2y² + 4y − 30 = 0 → y² + 2y − 15 = 0 → y = 3 o y = −5.", "y = 3 → x = 5. y = −5 → x = −3.", "Soluciones: (5, 3) y (−3, −5)."],
      resultado: "(5, 3) y (−3, −5)" },
    { id: "e36", nivel: 3,
      enunciado: "Dos grifos llenan juntos un depósito en 6 horas. Si el primero lo llenara solo, tardaría 5 horas menos que el segundo solo. ¿Cuánto tarda el segundo solo?",
      check: { tipo: "num", etiqueta: "Segundo grifo:", valor: 15, unidad: "h" },
      pistas: ["Sea x lo que tarda el segundo. El primero tarda x − 5.", "Cada hora llenan 1/x + 1/(x − 5) = 1/6 del depósito."],
      pasos: ["1/x + 1/(x − 5) = 1/6 → 6(x − 5) + 6x = x(x − 5) → 12x − 30 = x² − 5x → x² − 17x + 30 = 0.", "x = (17 ± 13)/2 → x = 15 o x = 2.", "Con x = 2, el primero tardaría −3 h: absurdo. Por tanto x = 15 h (y el primero, 10 h: 1/15 + 1/10 = 1/6 ✓)."],
      resultado: "15 horas" },
    { id: "e37", nivel: 3,
      enunciado: "¿Para qué valores de m la ecuación x² + mx + 4 = 0 tiene dos soluciones reales distintas?",
      check: { tipo: "opcion", etiqueta: "m ∈", opciones: ["(−∞, −4) ∪ (4, +∞)", "(−4, 4)", "[−4, 4]", "{−4, 4}"], ok: 0 },
      pistas: ["Δ &gt; 0.", "m² − 16 &gt; 0 es una inecuación de segundo grado."],
      pasos: ["Δ = m² − 16 &gt; 0 → (m − 4)(m + 4) &gt; 0.", "La parábola en m es positiva fuera de sus raíces: m &lt; −4 o m &gt; 4.", "En m = ±4 hay solución doble (Δ = 0) y entre −4 y 4 no hay soluciones reales."],
      resultado: "m &lt; −4 o m &gt; 4" },
    { id: "e38", nivel: 3,
      enunciado: "Resuelve por el método de Gauss: x + y + z = 6, 2x − y + z = 6, x + 2y − z = 1.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 1 }, { tipo: "num", etiqueta: "z =", valor: 3 }],
      pistas: ["E₂ − 2E₁ elimina x de la 2.ª; E₃ − E₁ lo elimina de la 3.ª."],
      pasos: ["E₂ ← E₂ − 2E₁: −3y − z = −6. E₃ ← E₃ − E₁: y − 2z = −5.", "Eliminamos y: 3E₃ + E₂ → (3y − 6z) + (−3y − z) = −15 − 6 → −7z = −21 → z = 3.", "De y − 2z = −5: y = 1. De la 1.ª: x = 6 − 1 − 3 = 2.", "Comprobación en la 2.ª: 4 − 1 + 3 = 6 ✓."],
      resultado: "(x, y, z) = (2, 1, 3)" },
    { id: "e39", nivel: 3,
      enunciado: "Demuestra que si x₁ y x₂ son las soluciones de ax² + bx + c = 0, entonces x₁ + x₂ = −b/a y x₁·x₂ = c/a.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe las soluciones de la fórmula: x₁ = (−b + √Δ)/2a y x₂ = (−b − √Δ)/2a", p: 0.5 },
        { t: "Suma: los términos con √Δ se cancelan y queda −2b/2a = −b/a", p: 0.5 },
        { t: "Multiplica: (−b)² − (√Δ)² = b² − Δ en el numerador, sobre 4a²", p: 0.5 },
        { t: "Sustituye Δ = b² − 4ac: (b² − b² + 4ac)/4a² = c/a", p: 0.5 }
      ] },
      pasos: ["x₁ = (−b + √Δ)/(2a) y x₂ = (−b − √Δ)/(2a) con Δ = b² − 4ac.", "Suma: x₁ + x₂ = (−b + √Δ − b − √Δ)/(2a) = −2b/(2a) = −b/a.", "Producto: x₁x₂ = [(−b)² − (√Δ)²]/(4a²) = (b² − Δ)/(4a²) = (b² − b² + 4ac)/(4a²) = c/a."],
      resultado: "x₁ + x₂ = −b/a y x₁·x₂ = c/a" },
    { id: "e40", nivel: 3,
      enunciado: "Halla un polinomio de tercer grado con coeficiente principal 2 y raíces 1, −2 y 1/2. Escribe sus coeficientes de x², x y el término independiente.",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 1 }, { tipo: "num", etiqueta: "coef. de x =", valor: -5 }, { tipo: "num", etiqueta: "término independiente =", valor: 2 }],
      pistas: ["P(x) = 2(x − 1)(x + 2)(x − 1/2) = (x − 1)(x + 2)(2x − 1)."],
      pasos: ["(x − 1)(x + 2) = x² + x − 2.", "(x² + x − 2)(2x − 1) = 2x³ − x² + 2x² − x − 4x + 2 = 2x³ + x² − 5x + 2.", "Comprobación con Cardano–Vieta: suma de las raíces = 1 − 2 + 1/2 = −1/2 y −b/a = −1/2 ✓; producto = 1·(−2)·(1/2) = −1 y −a₀/a₃ = −2/2 = −1 ✓."],
      resultado: "2x³ + x² − 5x + 2" }
  ];

  var lamina = [
    { titulo: "Polinomios: operar y dividir",
      items: [
        { label: "Valor numérico y suma de coeficientes", formula: "P(a)  ·  P(1) = suma de los coeficientes", cuando: "Para comprobar cualquier operación entre polinomios.", ejemplo: "P(x) = x³ − 2x² − 5x + 6 → P(1) = 1 − 2 − 5 + 6 = 0" },
        { label: "Grados", formula: "gr(P·Q) = gr P + gr Q  ·  gr(P ± Q) ≤ máx", ojo: "gr(C) = gr P − gr Q en una división, y gr(R) &lt; gr(Q)." },
        { label: "Prueba de la división", formula: "P = Q·C + R", cuando: "Siempre que dividas: comprueba que sale." }
      ],
      pasos: ["Divide el término de mayor grado entre el de mayor grado del divisor.", "Multiplica ese resultado por todo el divisor y réstalo (cambia todos los signos).", "Repite hasta que el grado del resto sea menor que el del divisor."],
      nota: "Los polinomios incompletos se completan con coeficientes 0 antes de dividir." },
    { titulo: "Identidades notables", ancha: true,
      tabla: { cab: ["Identidad", "Para factorizar, mira si es…"], filas: [
        ["(a + b)² = a² + 2ab + b²", "trinomio con dos cuadrados y el doble producto"],
        ["(a − b)² = a² − 2ab + b²", "igual con el central negativo"],
        ["(a + b)(a − b) = a² − b²", "una <b>resta</b> de cuadrados"],
        ["(a + b)³ = a³ + 3a²b + 3ab² + b³", "cuatro términos 1-3-3-1"],
        ["a³ + b³ = (a + b)(a² − ab + b²)", "suma de cubos"],
        ["a³ − b³ = (a − b)(a² + ab + b²)", "resta de cubos"]
      ] },
      nota: "La suma de cuadrados a² + b² NO se factoriza con números reales." },
    { titulo: "Ruffini y teoremas",
      items: [
        { label: "Teorema del resto", formula: "resto de P ÷ (x − a) = P(a)", ejemplo: "resto de x⁴ − 3x² + 2x + 5 ÷ (x + 2) = P(−2) = 5" },
        { label: "Teorema del factor", formula: "(x − a) es factor ⇔ P(a) = 0", ejemplo: "P(x) = x³ + kx² − 4x + 4 divisible por x − 2 → P(2) = 0 → k = −1" },
        { label: "Raíces racionales", formula: "p/q con p | a₀ y q | aₙ", cuando: "Para elegir qué valores probar.", ojo: "Prueba cada divisor con signo + y con signo −." }
      ],
      pasos: ["Escribe los coeficientes de mayor a menor grado, con 0 donde falte un término.", "Baja el primero. Multiplica por a y suma al siguiente. Repite.", "El último número es el resto; los demás, el cociente."],
      nota: "Para dividir entre x + 3 usa a = −3. Para (ax − b), usa a = b/a y divide el cociente entre a." },
    { titulo: "Cómo factorizar (en este orden)",
      pasos: ["Factor común (número y/o potencia de x).", "Identidad notable (diferencia de cuadrados, cuadrado perfecto, cubos).", "Ruffini con los divisores de a₀ (y fracciones p/q si aₙ ≠ 1). Repite con la misma raíz por si es múltiple.", "Cuando quede grado 2, resuelve con la fórmula. Δ &lt; 0 ⇒ factor irreducible.", "Comprueba: suma de raíces = −aₙ₋₁/aₙ y producto = (−1)ⁿ a₀/aₙ."],
      nota: "No olvides el coeficiente principal: 2x² − 5x + 2 = (x − 2)(2x − 1)." },
    { titulo: "Ecuación de segundo grado",
      items: [
        { label: "Fórmula general", formula: "x = " + fr("−b ± " + raiz("b² − 4ac"), "2a"), ejemplo: "2x² − 3x − 2 = 0 → x = (3 ± 5)/4 → x = 2 y x = −1/2" },
        { label: "Discriminante", formula: "Δ = b² − 4ac", cuando: "Δ &gt; 0: dos soluciones · Δ = 0: una doble · Δ &lt; 0: ninguna real." },
        { label: "Suma y producto", formula: "x₁ + x₂ = −b/a  ·  x₁x₂ = c/a", ejemplo: "soluciones 3 y −5 → x² + 2x − 15 = 0" },
        { label: "Incompletas", formula: "ax² + bx = 0 → x(ax + b) = 0  ·  ax² + c = 0 → x = ±√(−c/a)", ojo: "No dividas entre x: pierdes la solución x = 0." }
      ] },
    { titulo: "Bicuadradas y cambios de variable", ancha: true,
      tabla: { cab: ["Ecuación", "Cambio", "Después"], filas: [
        ["ax⁴ + bx² + c = 0", "t = x²", "cada t &gt; 0 → x = ±√t; t &lt; 0 se descarta"],
        ["ax⁶ + bx³ + c = 0", "t = x³", "x = ∛t (acepta t negativos)"],
        ["x − 5√x + 6 = 0", "t = √x ≥ 0", "x = t²"],
        ["4ˣ − 3·2ˣ − 4 = 0", "t = 2ˣ &gt; 0", "x = log₂ t"]
      ] },
      nota: "Una bicuadrada tiene 4, 3, 2, 1 o 0 soluciones reales." },
    { titulo: "Sistemas de ecuaciones",
      tabla: { cab: ["Rectas", "Soluciones", "Al resolver"], filas: [["se cortan", "una (SCD)", "x = …, y = …"], ["coinciden", "infinitas (SCI)", "0 = 0"], ["paralelas", "ninguna (SI)", "0 = k ≠ 0"]] },
      pasos: ["Lineal con lineal: reducción (coeficientes opuestos) o sustitución.", "Lineal con no lineal: despeja en la lineal y sustituye.", "Tres ecuaciones: Gauss (escalonar y resolver de abajo arriba).", "Comprueba en las dos ecuaciones originales."] },
    { titulo: "Fracciones algebraicas y ecuaciones con raíces o denominadores", ancha: true,
      pasos: ["Simplificar: factoriza numerador y denominador y tacha factores (nunca sumandos).", "Sumar: mcm de los denominadores (cada factor con su mayor exponente).", "Ecuación racional: multiplica todo por el mcm, resuelve, descarta las soluciones que anulen un denominador.", "Ecuación irracional: aísla la raíz, eleva al cuadrado, resuelve y comprueba SIEMPRE."],
      nota: "Una solución falsa aparece cuando elevar al cuadrado (o multiplicar por algo que puede ser 0) añade soluciones nuevas." },
    { titulo: "Exponenciales y logaritmos",
      items: [
        { label: "Definición", formula: "log<sub>b</sub> N = y ⇔ bʸ = N", cuando: "N &gt; 0 siempre.", ejemplo: "log₂ 8 = 3 porque 2³ = 8" },
        { label: "Propiedades", formula: "log AB = log A + log B · log A/B = log A − log B · log Aᵏ = k log A", ojo: "log(A + B) no se descompone." },
        { label: "Cambio de base", formula: "log<sub>b</sub> N = " + fr("log N", "log b"), ejemplo: "log₂ 5 = log 5 / log 2 ≈ 2,32" }
      ],
      pasos: ["Exponencial: iguala bases, saca factor común o cambia t = aˣ.", "Si no se pueden igualar bases, toma logaritmos: x = log N / log b.", "Logarítmica: junta en un solo logaritmo, quita el log y comprueba el dominio."] },
    { titulo: "Inecuaciones", ancha: true,
      pasos: ["Pasa todo a un miembro (el otro es 0) y factoriza.", "Ceros del numerador y del denominador → recta con intervalos.", "Prueba un valor de cada intervalo para el signo.", "Elige los intervalos con el signo pedido.", "Extremos: ceros del numerador entran con ≤ o ≥; ceros del denominador nunca entran."],
      nota: "Al multiplicar o dividir por un número negativo, la desigualdad se invierte. Un sistema de inecuaciones es la intersección de las soluciones." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(x + 5)² = x² + 25", bien: "(x + 5)² = x² + 10x + 25", por: "Falta el doble producto 2ab." },
        { mal: "Dividir entre x + 3 con a = 3", bien: "a = −3", por: "x + 3 = x − (−3)." },
        { mal: "5x² = 20x → 5x = 20 → x = 4", bien: "5x(x − 4) = 0 → x = 0 y x = 4", por: "Dividir entre x pierde la solución 0." },
        { mal: "√(x + 6) = x → x = 3 y x = −2", bien: "Solo x = 3", por: "x = −2 es solución falsa: hay que comprobar." },
        { mal: "−2x &gt; 6 → x &gt; −3", bien: "x &lt; −3", por: "Al dividir por un negativo se invierte la desigualdad." },
        { mal: "log(x + 3) = log x + log 3", bien: "log(3x) = log 3 + log x", por: "La propiedad es para productos." },
        { mal: "(x² + 1)/(x² − 1) = −1", bien: "No se puede simplificar", por: "Solo se tachan factores." }
      ] }
  ];

  B.registrar("mates1", "t3", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
