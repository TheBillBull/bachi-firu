/* ============================================================
   Matemáticas II · ampliaciones · Tema 3: Sistemas de ecuaciones lineales
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, T = B.lab.mt;
  function w(n, ref) { return H.w(n, ref && "mates2/t3/" + ref); }
  function M(rows, sep) { return T.m(rows, sep); }
  // matriz con parámetros (textos) y barra de ampliada opcional
  function MP(rows, sep) { return T.mhtml(rows, { sep: sep, celda: function (i, j, x) { return String(x).replace(/-/g, "−"); } }); }
  // sistema escrito en columna
  function sis(arr) { return "<div class='ms-eqs'>" + arr.join("<br>") + "</div>"; }

  var resumen = [
    "<b>Forma matricial:</b> A·X = B, con A la matriz de coeficientes, X la columna de incógnitas y B la de términos independientes. La <b>matriz ampliada</b> (A|B) es A con B pegada. Cada ecuación de tres incógnitas es un plano del espacio.",
    "<b>Gauss:</b> con operaciones por filas (intercambiar, multiplicar por k ≠ 0, sumar un múltiplo de otra) se llega a una matriz escalonada sin cambiar las soluciones. Una fila (0 0 0 | c) con c ≠ 0 delata un sistema incompatible; después, sustitución hacia atrás.",
    "<b>Rouché-Frobenius:</b> rg(A) ≠ rg(A|B) → incompatible (SI); rg(A) = rg(A|B) = n → compatible determinado (SCD); rg(A) = rg(A|B) < n → compatible indeterminado (SCI), con n − rg(A) parámetros libres. Con menos ecuaciones que incógnitas nunca hay SCD.",
    "<b>Homogéneos</b> (B = 0): siempre compatibles (solución trivial). Tienen solución distinta de la trivial si y solo si rg(A) &lt; n; en el caso cuadrado, si y solo si det(A) = 0.",
    "<b>Discusión con parámetro:</b> 1) det(A) en función de m (si A es cuadrada); 2) raíces = valores críticos; 3) para m distinto de los críticos, SCD; 4) cada valor crítico se estudia <b>aparte</b>, calculando rg(A) y rg(A|B) con los números ya sustituidos. Si m solo está en B, no hay det(A) que ayude: se orla.",
    "<b>Cramer</b> (n ecuaciones, n incógnitas, det(A) ≠ 0): xᵢ = det(Aᵢ)/det(A), con Aᵢ = A con la columna i cambiada por B. Para un SCI, se pasan las incógnitas libres al segundo miembro y se aplica Cramer al subsistema.",
    "<b>Solución general de un SCI:</b> se expresa con parámetros (λ, μ…). Una incógnita libre da una recta; dos, un plano. Siempre se comprueba sustituyendo en las ecuaciones originales.",
    "<b>Geometría:</b> tres planos: SCD = se cortan en un punto; SCI = una recta común (o coinciden); SI = prisma, dos paralelos y un secante, o paralelos/coincidentes sin punto común. Las ecuaciones de un sistema 2×2 son rectas del plano.",
    "<b>Problemas con enunciado:</b> define incógnitas con unidades, traduce cada dato a una ecuación, resuelve, <b>comprueba en el texto</b> y valora que la solución tenga sentido (no negativa, entera si cuenta objetos)."
  ];

  var secciones = {};
  var nuevas = [];

  // ---------------------------------------------------------------- 1. Forma matricial
  secciones[0] =
    "<h5>Qué es resolver un sistema</h5>" +
    "<p>Una <b>ecuación lineal</b> con n incógnitas es a₁x₁ + a₂x₂ + … + aₙxₙ = b: las incógnitas aparecen solo elevadas a 1 y sin multiplicarse entre sí. Una <b>solución</b> de un sistema es una lista de n números que cumple <b>todas</b> las ecuaciones a la vez; <b>resolver</b> el sistema es encontrar todas las soluciones (puede haber una, infinitas o ninguna). Con dos incógnitas cada ecuación es una recta del plano, y con tres es un plano del espacio, así que resolver un sistema es averiguar dónde se cortan esas rectas o esos planos (lo verás con dibujos en la sección 8).</p>" +
    "<p>Dos sistemas son <b>equivalentes</b> si tienen exactamente las mismas soluciones. Los métodos de resolución consisten en pasar de un sistema a otro equivalente más sencillo. Las operaciones que lo permiten son: intercambiar dos ecuaciones, multiplicar una ecuación por un número distinto de 0 y sumar a una ecuación un múltiplo de otra. En la matriz ampliada son justo las operaciones por filas del método de Gauss.</p>" +
    "<h5>De las ecuaciones a la matriz, y vuelta</h5>" +
    "<p>Para escribir A·X = B se ordenan las incógnitas siempre igual (x, y, z) y, si una incógnita no aparece en una ecuación, su coeficiente es <b>0</b>. Un descuido típico es saltarse ese 0 y desplazar toda la fila.</p>" +
    ejemplo("Escribir un sistema en forma matricial", "Escribe en forma A·X = B y comprueba que (x, y, z) = (2, 1, 0) es solución:" + sis(["2x − y + 3z = 3", "x + 2z = 2", "3y − z = 3"]), [
      "Coeficientes por filas. En la segunda ecuación falta la y: coeficiente 0. En la tercera falta la x: coeficiente 0.",
      "A = " + M([[2, -1, 3], [1, 0, 2], [0, 3, -1]]) + ", X = " + MP([["x"], ["y"], ["z"]]) + ", B = " + M([[3], [2], [3]]) + ". La ampliada es (A|B) = " + M([[2, -1, 3, 3], [1, 0, 2, 2], [0, 3, -1, 3]], 3) + ".",
      "Comprobación en <b>las tres</b> ecuaciones: 2·2 − 1 + 3·0 = 3 ✓; 2 + 2·0 = 2 ✓; 3·1 − 0 = 3 ✓. Basta que falle una para que no sea solución.",
      "Como det(A) = −4 ≠ 0, esa es la <b>única</b> solución (SCD)."
    ]) +
    "<h5>Si A es cuadrada e invertible, ya está: X = A⁻¹·B</h5>" +
    "<p>Si hay tantas ecuaciones como incógnitas y det(A) ≠ 0, la matriz A tiene inversa (Tema 1) y basta multiplicar por A⁻¹ <b>por la izquierda</b>: A⁻¹·A·X = A⁻¹·B, es decir, X = A⁻¹·B. Es el mismo método que las ecuaciones matriciales del Tema 1, y solo sirve para el caso SCD cuadrado.</p>" +
    ejemplo("Resolver con la inversa", "Resuelve " + sis(["2x + 3y = 12", "x − y = 1"]) + "con X = A⁻¹·B.", [
      "A = " + M([[2, 3], [1, -1]]) + " y det(A) = 2·(−1) − 3·1 = −5 ≠ 0.",
      "A⁻¹ = " + "<span class='mm-op'>(1/−5)</span>" + M([[-1, -3], [-1, 2]]) + " = " + M([["1/5", "3/5"], ["1/5", "-2/5"]]) + " (se intercambian los elementos de la diagonal principal y se cambia el signo de los otros dos).",
      "X = A⁻¹·B = " + M([["1/5", "3/5"], ["1/5", "-2/5"]]) + "·" + M([[12], [1]]) + " = " + M([[3], [2]]) + ". Es decir, x = 3, y = 2 (el mismo resultado que por reducción en Mates I)."
    ]) +
    ojo("La inversa solo resuelve sistemas con tantas ecuaciones como incógnitas y det(A) ≠ 0. Si A no es cuadrada o no es invertible, hace falta Gauss o Rouché-Frobenius. Y es <b>A⁻¹·B</b>, no B·A⁻¹ (el producto de matrices no conmuta).");

  // ---------------------------------------------------------------- 2. Gauss
  secciones[1] =
    "<h5>Cómo se lee una matriz escalonada</h5>" +
    "<p>Una matriz está escalonada cuando cada fila empieza con más ceros que la anterior y las filas de ceros están al final. El primer número no nulo de cada fila es el <b>pivote</b>. Al escalonar la ampliada pueden aparecer tres situaciones, y se reconocen a simple vista:</p>" +
    "<ul><li><b>Hay una fila (0 0 0 | c) con c ≠ 0.</b> Equivale a «0 = c», imposible: <b>sistema incompatible</b>.</li>" +
    "<li><b>Hay tantos pivotes como incógnitas.</b> Se despeja de abajo arriba: <b>solución única</b>.</li>" +
    "<li><b>Hay menos pivotes que incógnitas y no hay filas imposibles.</b> Las incógnitas sin pivote quedan <b>libres</b> y se toman como parámetros: infinitas soluciones.</li></ul>" +
    "<h5>Estrategia para escalonar sin fracciones</h5>" +
    "<p>Para hacer cero un elemento, en vez de dividir (y crear fracciones) se combinan las filas con números enteros: si el pivote de la fila F₁ es a y el elemento que quieres anular en la fila Fᵢ es b, se hace <b>Fᵢ ← a·Fᵢ − b·F₁</b>. Escribe siempre la operación que haces en cada fila (el corrector la busca) y, si un pivote vale 0, intercambia filas; conviene tener un pivote 1 arriba a la izquierda, así que a menudo compensa intercambiar la primera fila con otra.</p>" +
    ejemplo("Gauss con un intercambio de filas (SCD)", "Resuelve por Gauss:" + sis(["2x + y − z = −1", "x − 2y + z = 5", "3x + y + 2z = 6"]), [
      "Ampliada: " + M([[2, 1, -1, -1], [1, -2, 1, 5], [3, 1, 2, 6]], 3) + ". Intercambio F₁ ↔ F₂ para tener un pivote 1: " + M([[1, -2, 1, 5], [2, 1, -1, -1], [3, 1, 2, 6]], 3) + ".",
      "F₂ ← F₂ − 2F₁ y F₃ ← F₃ − 3F₁: " + M([[1, -2, 1, 5], [0, 5, -3, -11], [0, 7, -1, -9]], 3) + ".",
      "F₃ ← 5F₃ − 7F₂ (pivote de F₂ = 5, elemento a anular = 7): " + M([[1, -2, 1, 5], [0, 5, -3, -11], [0, 0, 16, 32]], 3) + ".",
      "Sustitución hacia atrás: 16z = 32 → z = 2; 5y − 3·2 = −11 → y = −1; x − 2·(−1) + 2 = 5 → x = 1.",
      "rg(A) = rg(A|B) = 3 = n: <b>SCD</b>, con (x, y, z) = (1, −1, 2). Comprobación en la 1.ª ecuación original: 2·1 + (−1) − 2 = −1 ✓."
    ]) +
    w("ms_gauss") +
    "<p>Prueba los seis sistemas: el tercero es incompatible (mira cómo la última fila se queda en «0 = 2»), el segundo y el sexto son compatibles indeterminados y en el cuarto sobran ecuaciones. También puedes escribir tu propio sistema en la matriz y ver cómo lo trata el método.</p>" +
    ejemplo("Gauss con infinitas soluciones (SCI)", "Resuelve:" + sis(["x − y + 2z = 3", "2x + y − z = 0", "3x + z = 3"]), [
      "Ampliada: " + M([[1, -1, 2, 3], [2, 1, -1, 0], [3, 0, 1, 3]], 3) + ". F₂ ← F₂ − 2F₁ y F₃ ← F₃ − 3F₁: " + M([[1, -1, 2, 3], [0, 3, -5, -6], [0, 3, -5, -6]], 3) + ".",
      "F₃ ← F₃ − F₂: " + M([[1, -1, 2, 3], [0, 3, -5, -6], [0, 0, 0, 0]], 3) + ". La última fila es de ceros: sobra una ecuación (era suma de las otras dos).",
      "rg(A) = rg(A|B) = 2 &lt; 3 = n → <b>SCI con 3 − 2 = 1 parámetro</b>. La incógnita sin pivote es z: la llamamos z = λ.",
      "De la segunda fila: 3y − 5λ = −6 → y = (5λ − 6)/3. De la primera: x = 3 + y − 2λ = 3 + (5λ − 6)/3 − 2λ = 1 − λ/3.",
      "Solución: (x, y, z) = (1 − λ/3, (5λ − 6)/3, λ), con λ ∈ ℝ. Para evitar fracciones se puede tomar z = 3t: (1 − t, 5t − 2, 3t). Con t = 1 sale (0, 3, 3), que cumple las tres ecuaciones."
    ]) +
    ejemplo("Gauss con un sistema incompatible (SI)", "Estudia y resuelve:" + sis(["x + y − z = 1", "2x − y + z = 2", "3x = 5"]), [
      "Ampliada: " + M([[1, 1, -1, 1], [2, -1, 1, 2], [3, 0, 0, 5]], 3) + ". F₂ ← F₂ − 2F₁ y F₃ ← F₃ − 3F₁: " + M([[1, 1, -1, 1], [0, -3, 3, 0], [0, -3, 3, 2]], 3) + ".",
      "F₃ ← F₃ − F₂: " + M([[1, 1, -1, 1], [0, -3, 3, 0], [0, 0, 0, 2]], 3) + ". La última fila dice 0·x + 0·y + 0·z = 2.",
      "rg(A) = 2 pero rg(A|B) = 3: <b>SI</b>, no hay solución. Fíjate en que la 3.ª ecuación tiene los coeficientes de la suma de las dos primeras (3, 0, 0), y esa suma vale 3, no 5."
    ]) +
    "<h5>Más ecuaciones que incógnitas, o menos</h5>" +
    "<p>Gauss no necesita que A sea cuadrada. Con <b>más ecuaciones que incógnitas</b> se escalona igual y las ecuaciones sobrantes se convierten en filas de ceros (si eran combinación de las otras) o en una fila imposible. Con <b>menos ecuaciones que incógnitas</b> el sistema nunca es SCD: como mucho hay m pivotes y quedan al menos n − m incógnitas libres, así que o es SCI o es incompatible.</p>" +
    ejemplo("Cuatro ecuaciones y tres incógnitas", "Resuelve:" + sis(["x + y + z = 4", "x − y + z = 2", "y − z = −1", "2x + 2z = 6"]), [
      "Restando las dos primeras: 2y = 2 → y = 1. Entonces x + z = 3 (de la primera) y 1 − z = −1 → z = 2, de donde x = 1.",
      "Por Gauss se ve igual: rg(A) = rg(A|B) = 3 = n. La cuarta ecuación no aporta nada nuevo: 2·1 + 2·2 = 6 ✓ (es F₁ + F₂, combinación de las demás).",
      "Solución única: (1, 1, 2). Si el 6 hubiera sido otro número, la cuarta ecuación habría contradicho a las demás y el sistema sería incompatible."
    ]) +
    ejemplo("Menos ecuaciones que incógnitas", "Resuelve " + sis(["x + 2y − z = 3", "2x − y + 3z = 1"]), [
      "Ampliada: " + M([[1, 2, -1, 3], [2, -1, 3, 1]], 3) + ". F₂ ← F₂ − 2F₁: " + M([[1, 2, -1, 3], [0, -5, 5, -5]], 3) + ".",
      "rg(A) = rg(A|B) = 2 &lt; 3: SCI con un parámetro. Tomo z = λ: −5y + 5λ = −5 → y = 1 + λ; x = 3 − 2y + λ = 3 − 2 − 2λ + λ = 1 − λ.",
      "Solución: (1 − λ, 1 + λ, λ). Es una <b>recta</b> del espacio: pasa por (1, 1, 0) con dirección (−1, 1, 1)."
    ]);

  // ---------------------------------------------------------------- 3. Rouché-Frobenius
  secciones[2] =
    "<h5>Cómo se aplica el teorema, paso a paso</h5>" +
    "<ol><li>Cuenta las incógnitas n.</li><li>Calcula rg(A) y rg(A|B) (por Gauss o con menores; en el Tema 2 viste cómo).</li><li>Compara y clasifica. Si el sistema es SCI, los <b>grados de libertad</b> (parámetros) son n − rg(A).</li></ol>" +
    tabla(["Rangos", "Tipo", "Soluciones", "Parámetros"], [
      ["rg(A) ≠ rg(A|B)", "Incompatible (SI)", "ninguna", "—"],
      ["rg(A) = rg(A|B) = n", "Compatible determinado (SCD)", "una", "0"],
      ["rg(A) = rg(A|B) = r &lt; n", "Compatible indeterminado (SCI)", "infinitas", "n − r"]
    ]) +
    "<p>Observaciones útiles: rg(A) ≤ rg(A|B) ≤ rg(A) + 1 (añadir una columna sube el rango como mucho 1); rg(A) ≤ número de ecuaciones y ≤ n. Por eso un sistema con <b>menos ecuaciones que incógnitas nunca es SCD</b>, y un sistema <b>cuadrado</b> con det(A) ≠ 0 es siempre SCD.</p>" +
    "<h5>Rangos con menores (cuando no quieres escalonar)</h5>" +
    "<p>Con matrices 3×3 o 3×4 es habitual calcular los rangos con determinantes: rg(A) es el orden del mayor menor no nulo de A. Para rg(A|B), si rg(A) = 2, se <b>orla</b> un menor no nulo de orden 2 con la columna B y con la fila que falta: si ese determinante de orden 3 es 0, rg(A|B) = 2 (compatible); si no, vale 3 (incompatible).</p>" +
    ejemplo("Un parámetro solo en los términos independientes", "Discute el sistema según b:" + sis(["x + 2y − z = 1", "2x + y + z = 2", "3x + 3y = b"]), [
      "A = " + M([[1, 2, -1], [2, 1, 1], [3, 3, 0]]) + ". Como F₃ = F₁ + F₂ en A, det(A) = 0 y rg(A) = 2 (el menor " + M([[1, 2], [2, 1]]) + " vale 1 − 4 = −3 ≠ 0). Esto no depende de b.",
      "Para rg(A|B) oriamos ese menor con la columna de B y con F₃: det " + MP([["1", "2", "1"], ["2", "1", "2"], ["3", "3", "b"]]) + " = 9 − 3b (se desarrolla por la última fila o por Sarrus).",
      "Si b = 3, ese determinante es 0 y rg(A|B) = 2 = rg(A) &lt; 3: <b>SCI</b> (1 parámetro). Si b ≠ 3, rg(A|B) = 3 ≠ 2: <b>SI</b>.",
      "Para b = 3: de las dos primeras, 2x + y + z = 2 y x + 2y − z = 1; sumando, 3x + 3y = 3 → x + y = 1. Con y = λ: x = 1 − λ, z = 2 − 2x − y = 2 − 2 + 2λ − λ = λ. Solución: (1 − λ, λ, λ)."
    ]) +
    "<p>Nota que en este ejemplo es inútil calcular det(A) para «discutir»: vale 0 para todo b. La discusión sale de comparar los rangos, no de un único determinante (más en la sección 5).</p>" +
    ojo("«rg(A) = rg(A|B)» no basta para decir SCD: hay que comparar también con el número de incógnitas n. Cuando rg(A) = rg(A|B) y el sistema tiene 4 incógnitas con rango 3, hay 1 parámetro, aunque el sistema tenga 3 ecuaciones «completas».");

  // ---------------------------------------------------------------- 4. Homogéneos
  secciones[3] =
    "<h5>Cuándo hay soluciones «no triviales»</h5>" +
    "<p>Como un sistema homogéneo siempre es compatible, la única pregunta es si la trivial (0, 0, 0) es la <b>única</b> solución. Por Rouché-Frobenius: solo trivial si rg(A) = n; infinitas soluciones si rg(A) &lt; n. Si el sistema es <b>cuadrado</b> (n ecuaciones, n incógnitas) la pregunta se contesta con un determinante:</p>" +
    "<ul><li>det(A) ≠ 0 → solo la solución trivial.</li><li>det(A) = 0 → SCI: hay soluciones no triviales.</li></ul>" +
    "<p>El conjunto de soluciones de un homogéneo es especial: si X₁ y X₂ son soluciones, también lo son X₁ + X₂ y k·X₁ (se comprueba con A(X₁ + X₂) = AX₁ + AX₂ = 0). Por eso las soluciones forman una recta o un plano que <b>pasa por el origen</b>.</p>" +
    ejemplo("Homogéneo sin parámetro", "Resuelve:" + sis(["x + y + z = 0", "2x − y + 3z = 0", "4x + y + 5z = 0"]), [
      "Observa que la tercera fila es 2·F₁ + F₂ (2 + 2 = 4, 2 − 1 = 1, 2 + 3 = 5), así que det(A) = 0 y rg(A) = 2 &lt; 3.",
      "Escalono: " + M([[1, 1, 1], [2, -1, 3], [4, 1, 5]]) + " → F₂ ← F₂ − 2F₁, F₃ ← F₃ − 4F₁ → " + M([[1, 1, 1], [0, -3, 1], [0, -3, 1]]) + " → la tercera fila se anula.",
      "Con z = λ: −3y + λ = 0 → y = λ/3; x = −y − z = −4λ/3. Solución: (−4λ/3, λ/3, λ) = t·(−4, 1, 3), con t = λ/3.",
      "Hay infinitas soluciones, todas múltiplos de (−4, 1, 3): una recta que pasa por el origen."
    ]) +
    ejemplo("Homogéneo con parámetro", "¿Para qué valores de m tiene el sistema soluciones distintas de la trivial? Resuélvelo en esos casos." + sis(["x + y + z = 0", "2x + my + z = 0", "x + y + mz = 0"]), [
      "Es homogéneo y cuadrado: hay soluciones no triviales ⇔ det(A) = 0. Desarrollando " + MP([["1", "1", "1"], ["2", "m", "1"], ["1", "1", "m"]]) + " se obtiene det(A) = (m − 1)(m − 2).",
      "Para m ≠ 1 y m ≠ 2 solo existe la solución trivial (0, 0, 0). Quedan dos casos.",
      "<b>m = 1:</b> x + y + z = 0, 2x + y + z = 0, x + y + z = 0. Restando la primera a la segunda: x = 0; entonces y = −z. Solución: (0, −λ, λ).",
      "<b>m = 2:</b> x + y + z = 0, 2x + 2y + z = 0, x + y + 2z = 0. Restando la primera a la tercera: z = 0; entonces x = −y. Solución: (λ, −λ, 0)."
    ]) +
    "<p>Fíjate en que en ambos casos rg(A) = 2 y por eso queda un solo parámetro. Si el rango hubiera sido 1 habría dos parámetros (un plano entero de soluciones).</p>";

  // ---------------------------------------------------------------- 5. Discusión
  secciones[4] =
    "<h5>El método completo, en cinco pasos</h5>" +
    "<ol><li><b>Matriz A y ampliada (A|B)</b> con el parámetro dentro.</li>" +
    "<li><b>Si A es cuadrada</b>, calcula det(A) y factorízalo (es un polinomio en m).</li>" +
    "<li><b>Valores críticos:</b> las raíces de det(A) = 0. Para <b>cualquier otro m</b>, det(A) ≠ 0, rg(A) = rg(A|B) = n y el sistema es <b>SCD</b>.</li>" +
    "<li><b>Cada valor crítico, por separado:</b> sustituye m, calcula rg(A) y rg(A|B) con números (por Gauss o con menores) y clasifica.</li>" +
    "<li><b>Resumen final</b> en una frase o una tabla con todos los casos, sin olvidar «m distinto de…».</li></ol>" +
    "<p>Si A <b>no es cuadrada</b> (por ejemplo 3 ecuaciones y 4 incógnitas) no hay det(A): se buscan los valores de m que bajan el rango con menores de orden 3, o directamente se escalona sin dividir entre expresiones que puedan ser 0. Si el parámetro está <b>solo en B</b>, det(A) no cambia con m y la discusión sale de orlar (ya lo viste en la sección 3).</p>" +
    ejemplo("El clásico de la EvAU: parámetro en la diagonal", "Discute según m y resuelve para m = 0:" + sis(["m·x + y + z = 1", "x + m·y + z = m", "x + y + m·z = m²"]), [
      "A = " + MP([["m", "1", "1"], ["1", "m", "1"], ["1", "1", "m"]]) + ". Desarrollando, det(A) = m³ − 3m + 2 = (m − 1)²(m + 2).",
      "Valores críticos: m = 1 (raíz doble) y m = −2. Para <b>m ≠ 1 y m ≠ −2</b>: det(A) ≠ 0, rg(A) = rg(A|B) = 3 → <b>SCD</b>.",
      "<b>m = 1:</b> " + M([[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], 3) + ". Las tres filas son iguales: rg(A) = rg(A|B) = 1 &lt; 3 → <b>SCI con 2 parámetros</b> (un plano de soluciones): x + y + z = 1.",
      "<b>m = −2:</b> " + M([[-2, 1, 1, 1], [1, -2, 1, -2], [1, 1, -2, 4]], 3) + ". Sumando las tres filas: 0 = 3. Como rg(A) = 2 (las dos primeras filas son independientes) y rg(A|B) = 3 → <b>SI</b>.",
      "<b>Resolución para m = 0</b> (SCD): y + z = 1; x + z = 0; x + y = 0. Sumando: 2(x + y + z) = 1, luego x + y + z = 1/2 y: x = 1/2 − 1 = −1/2, y = 1/2, z = 1/2. Comprobación: la 2.ª ecuación (x + z = 0): −1/2 + 1/2 = 0 ✓.",
      "En general, para m ≠ 1, −2 la solución es x = −(m + 1)/(m + 2), y = 1/(m + 2), z = (m + 1)²/(m + 2): con m = 0 da (−1/2, 1/2, 1/2)."
    ]) +
    w("ms_discusor") +
    "<p>Pulsa los botones «m = …» para saltar al valor crítico y observa en la gráfica que el tipo de sistema <b>solo cambia en esos puntos</b>: es la imagen de todo el método. En el sexto sistema (homogéneo) nunca aparece el tipo SI.</p>" +
    ejemplo("Un valor crítico SCI y otro SI (con menores)", "Discute según m:" + sis(["x + y − z = 1", "2x + 3y + m·z = 3", "x + m·y + 3z = 2"]), [
      "det" + MP([["1", "1", "−1"], ["2", "3", "m"], ["1", "m", "3"]]) + " = 1·(9 − m²) − 1·(6 − m) − 1·(2m − 3) = −m² − m + 6 = −(m − 2)(m + 3).",
      "Críticos: m = 2 y m = −3. Para m ≠ 2 y m ≠ −3: <b>SCD</b>.",
      "<b>m = 2:</b> rg(A) = 2 (el menor " + M([[1, 1], [2, 3]]) + " = 1 ≠ 0 y det(A) = 0). Orlo con B: det " + M([[1, 1, 1], [2, 3, 3], [1, 2, 2]]) + " = 0 → rg(A|B) = 2 → <b>SCI</b>.",
      "<b>m = −3:</b> rg(A) = 2 (mismo menor). Orlo con B: det " + M([[1, 1, 1], [2, 3, 3], [1, -3, 2]]) + " = 5 ≠ 0 → rg(A|B) = 3 → <b>SI</b>.",
      "Para m = 2 la solución: F₂ − 2F₁ da y + 4z = 1; con z = λ: y = 1 − 4λ, x = 1 − y + z = 5λ. Solución: (5λ, 1 − 4λ, λ)."
    ]) +
    ejemplo("Discusión 2×2 con rectas", "Discute según m:" + sis(["x + m·y = 1", "m·x + 4y = 2"]), [
      "det(A) = 4 − m² = (2 − m)(2 + m). Críticos m = 2 y m = −2; si m ≠ ±2, SCD.",
      "<b>m = 2:</b> " + M([[1, 2, 1], [2, 4, 2]], 2) + ": la segunda fila es el doble de la primera → rg(A) = rg(A|B) = 1 &lt; 2 → <b>SCI</b> (dos rectas coincidentes).",
      "<b>m = −2:</b> " + M([[1, -2, 1], [-2, 4, 2]], 2) + ": los coeficientes de la 2.ª fila son −2 por los de la 1.ª, pero el término independiente no (2 ≠ −2·1) → rg(A) = 1, rg(A|B) = 2 → <b>SI</b> (rectas paralelas).",
      "Para m ≠ ±2, por Cramer: x = 2/(m + 2), y = 1/(m + 2) (sección 6)."
    ]) +
    "<p>Cuando <b>el parámetro está en A y en B</b> a la vez (como en el siguiente ejemplo), el procedimiento no cambia: los valores críticos salen de det(A) y luego se comparan los rangos de cada caso.</p>" +
    ejemplo("Parámetro en A y en B", "Discute según m y resuelve en el caso SCI:" + sis(["x + y + z = 3", "m·x + 2y + z = 4", "x + y + m·z = m + 2"]), [
      "det(A) = −(m − 1)(m − 2). Para m ≠ 1, 2: <b>SCD</b>.",
      "<b>m = 1:</b> " + M([[1, 1, 1, 3], [1, 2, 1, 4], [1, 1, 1, 3]], 3) + ": la 3.ª fila repite la 1.ª → rg(A) = rg(A|B) = 2 &lt; 3 → <b>SCI</b>. De F₂ − F₁: y = 1 y x + z = 2. Solución: (2 − λ, 1, λ).",
      "<b>m = 2:</b> " + M([[1, 1, 1, 3], [2, 2, 1, 4], [1, 1, 2, 4]], 3) + ": rg(A) = 2 (F₁ y F₂ son independientes y det(A) = 0) y el determinante orlado (columnas 1, 3 y B) " + M([[1, 1, 3], [2, 1, 4], [1, 2, 4]]) + " = 1 ≠ 0, así que rg(A|B) = 3 → <b>SI</b>."
    ]) +
    ojo("Los tres errores que más cuestan en una discusión: (1) <b>dividir entre una expresión con m</b> sin estudiar aparte el caso en que vale 0; (2) estudiar solo los valores críticos y olvidar escribir «para m distinto de… es SCD»; (3) declarar SCI en un valor crítico sin comparar rg(A|B): puede ser SI.");

  // ---------------------------------------------------------------- 6. Cramer
  secciones[5] =
    "<h5>Cómo funciona y cuándo usarla</h5>" +
    "<p>La regla de Cramer es la fórmula de la solución en el caso SCD cuadrado: xᵢ = det(Aᵢ)/det(A). Es muy cómoda con <b>2 incógnitas</b>, con <b>3 incógnitas</b> si quieres una sola de ellas y, sobre todo, para dar <b>la solución en función de m</b> cuando discutes un sistema con parámetro. No sirve cuando det(A) = 0 (habría que dividir entre 0).</p>" +
    ejemplo("Cramer 3×3: solo una incógnita", "Calcula solo la z del sistema 2x + y − z = −1, x − 2y + z = 5, 3x + y + 2z = 6.", [
      "det(A) = " + M([[2, 1, -1], [1, -2, 1], [3, 1, 2]]) + " = 2(−4 − 1) − 1(2 − 3) + (−1)(1 + 6) = −10 + 1 − 7 = −16.",
      "Para z sustituyo la 3.ª columna por B: det(A_z) = " + M([[2, 1, -1], [1, -2, 5], [3, 1, 6]]) + " = 2(−12 − 5) − 1(6 − 15) + (−1)(1 + 6) = −34 + 9 − 7 = −32.",
      "z = det(A_z)/det(A) = −32/−16 = 2, igual que por Gauss. Con det(A_x) = −16 y det(A_y) = 16: x = 1, y = −1."
    ]) +
    w("ms_cramer") +
    ejemplo("Cramer con parámetro: la solución en función de m", "Para el sistema x + m·y = 1, m·x + 4y = 2 da la solución cuando sea única.", [
      "det(A) = 4 − m² = (2 − m)(2 + m) ≠ 0 si m ≠ ±2.",
      "det(A_x) = " + MP([["1", "m"], ["2", "4"]]) + " = 4 − 2m = 2(2 − m); det(A_y) = " + MP([["1", "1"], ["m", "2"]]) + " = 2 − m.",
      "x = 2(2 − m)/((2 − m)(2 + m)) = 2/(m + 2) y y = (2 − m)/((2 − m)(2 + m)) = 1/(m + 2). Simplificar (2 − m) es legítimo porque m ≠ 2.",
      "Con m = 0: (1, 1/2): comprueba 0 + 4·(1/2) = 2 ✓."
    ]) +
    ojo("Cramer pide <b>det(A) ≠ 0</b>. Para m = 2 en el ejemplo anterior, Cramer «da» 0/0 y no dice nada: hay que estudiar el caso con rangos (era SCI). Y si det(A) = 0 pero det(A_x) ≠ 0, no se concluye una solución: simplemente no hay SCD.");

  // ---------------------------------------------------------------- 7. SCI y solución general
  nuevas.push({
    h: "7. Solución general de un sistema compatible indeterminado",
    html:
      "<p>Cuando un sistema es SCI no basta con decir «tiene infinitas soluciones»: la EvAU pide <b>la solución general</b>, es decir, una expresión que dé todas las soluciones. Se obtiene así:</p>" +
      "<ol><li>Escalona y quédate con las ecuaciones independientes (rg(A) = r de ellas). Las demás son redundantes.</li>" +
      "<li>Elige <b>n − r incógnitas libres</b> (se llaman parámetros: λ, μ…). Conviene elegir las que no tienen pivote al escalonar, o aquellas cuyo coeficiente complica menos los cálculos.</li>" +
      "<li>Pasa las incógnitas libres al segundo miembro y resuelve el sistema r × r que queda (por Gauss o por Cramer).</li>" +
      "<li>Escribe la solución en forma (x, y, z) = (…, …, …) y <b>comprueba</b> con valores concretos del parámetro en las ecuaciones originales.</li></ol>" +
      ejemplo("Dos parámetros", "Resuelve la ecuación x + 2y − z = 4 (un sistema de una ecuación con tres incógnitas).", [
        "n = 3 y r = 1, así que hay 3 − 1 = 2 parámetros. Tomo y = λ y z = μ.",
        "x = 4 − 2λ + μ. Solución: (x, y, z) = (4 − 2λ + μ, λ, μ), con λ, μ ∈ ℝ: es un <b>plano</b> del espacio.",
        "Comprobación con λ = 1 y μ = 2: (4, 1, 2): 4 + 2 − 2 = 4 ✓."
      ]) +
      "<h5>Solución general = una particular + la del homogéneo</h5>" +
      "<p>Si X_p es una solución cualquiera de A·X = B y X_h es solución del sistema homogéneo A·X = 0, entonces X_p + X_h también resuelve A·X = B, porque A(X_p + X_h) = B + 0. Y todas las soluciones se obtienen así. Por eso la solución general de un SCI tiene la forma «punto + parámetros·dirección», que es la ecuación paramétrica de una recta o de un plano. En el ejemplo anterior, X_p = (4, 0, 0) y X_h = λ(−2, 1, 0) + μ(1, 0, 1).</p>" +
      ejemplo("Comparar con el homogéneo", "La solución del sistema x − y + 2z = 3, 2x + y − z = 0, 3x + z = 3 es (1 − t, 5t − 2, 3t). ¿Cuál es la del sistema homogéneo asociado?", [
        "Una solución particular (t = 0) es X_p = (1, −2, 0), y la solución general es X_p + t·(−1, 5, 3).",
        "La solución del homogéneo es la parte con el parámetro: t·(−1, 5, 3). Comprobación en x − y + 2z = 0: −1 − 5 + 6 = 0 ✓; en 2x + y − z = 0: −2 + 5 − 3 = 0 ✓; en 3x + z = 0: −3 + 3 = 0 ✓."
      ]) +
      "<h5>Resolver un SCI con Cramer</h5>" +
      "<p>Es un recurso muy usado cuando el sistema depende de un parámetro: en el caso SCI se eliminan las ecuaciones sobrantes, se pasa la incógnita libre al segundo miembro y se resuelve el subsistema con determinante no nulo con la regla de Cramer.</p>" +
      ejemplo("Subsistema con Cramer", "Para m = 1 el sistema x + y + z = 3, x + 2y + z = 4, x + y + z = 3 es SCI. Resuélvelo con Cramer.", [
        "La tercera ecuación repite la primera, así que quedan dos ecuaciones independientes y 3 − 2 = 1 parámetro. Tomo z = λ: " + sis(["x + y = 3 − λ", "x + 2y = 4 − λ"]),
        "El determinante del subsistema es " + M([[1, 1], [1, 2]]) + " = 1 ≠ 0. Cramer: x = det" + MP([["3 − λ", "1"], ["4 − λ", "2"]]) + "/1 = 2(3 − λ) − (4 − λ) = 2 − λ; y = det" + MP([["1", "3 − λ"], ["1", "4 − λ"]]) + "/1 = (4 − λ) − (3 − λ) = 1.",
        "Solución: (2 − λ, 1, λ). Coincide con la que sale por Gauss."
      ])
  });

  // ---------------------------------------------------------------- 8. Geometría
  nuevas.push({
    h: "8. Interpretación geométrica: rectas en el plano y planos en el espacio",
    html:
      "<h5>Dos ecuaciones con dos incógnitas: dos rectas</h5>" +
      "<p>Cada ecuación ax + by = c es una recta del plano y una solución del sistema es un punto común. Con rangos:</p>" +
      tabla(["Rangos", "Tipo", "Posición de las rectas"], [
        ["rg(A) = rg(A|B) = 2", "SCD", "se cortan en un punto (pendientes distintas)"],
        ["rg(A) = rg(A|B) = 1", "SCI", "coincidentes (una es múltiplo de la otra, también en el término independiente)"],
        ["rg(A) = 1, rg(A|B) = 2", "SI", "paralelas distintas (mismos coeficientes salvo un factor, distinto término independiente)"]
      ]) +
      "<p>Por ejemplo, x + y = 3 y 2x + 2y = 7 son paralelas (SI) porque 2x + 2y = 6 sería la misma recta; con 2x + 2y = 6 serían coincidentes (SCI).</p>" +
      "<h5>Tres ecuaciones con tres incógnitas: tres planos</h5>" +
      "<p>Cada ecuación ax + by + cz = d es un plano con vector normal (a, b, c). Con rangos, y con la ayuda de si los normales son proporcionales (planos paralelos o coincidentes), las posiciones son:</p>" +
      tabla(["rg(A)", "rg(A|B)", "Tipo", "Posición relativa de los tres planos"], [
        ["3", "3", "SCD", "se cortan en un <b>punto</b>"],
        ["2", "2", "SCI", "se cortan en una <b>recta</b>: o bien un haz de planos (tres planos distintos por una misma recta), o bien dos coincidentes y un tercero secante"],
        ["2", "3", "SI", "no hay punto común: o bien <b>prisma</b> (se cortan dos a dos en tres rectas paralelas, normales no proporcionales dos a dos), o bien dos planos paralelos y un tercero secante"],
        ["1", "1", "SCI", "los tres planos <b>coinciden</b>"],
        ["1", "2", "SI", "tres paralelos distintos, o dos coincidentes y un tercero paralelo a ellos"]
      ]) +
      w("ms_planos") +
      "<p>Prueba cada caso, gira el cubo y fíjate: en el <b>haz</b> las tres rectas de corte dos a dos son la misma (trazo grueso); en el <b>prisma</b> son tres rectas paralelas distintas, y por eso ninguna cumple las tres ecuaciones. Si cambias números en la matriz, la clasificación y el dibujo se actualizan al instante.</p>" +
      "<h5>Cómo distinguir los subcasos sin dibujar</h5>" +
      "<ul><li><b>rg(A) = 2 y rg(A|B) = 3:</b> mira si hay dos filas de A proporcionales. Si las hay (y los términos independientes no guardan la misma proporción), esos dos planos son paralelos; si no hay ninguna pareja proporcional, es un prisma.</li>" +
      "<li><b>rg(A) = 2 y rg(A|B) = 2:</b> si hay dos filas de (A|B) proporcionales (también en B), esos dos planos coinciden; si no, es un haz.</li></ul>" +
      ejemplo("Posición relativa de tres planos con parámetro", "Estudia la posición relativa de los planos x + y − z = 1, 2x + 3y + m·z = 3 y x + m·y + 3z = 2 según m.", [
        "Es el sistema que discutimos en la sección 5: para m ≠ 2 y m ≠ −3 es SCD → <b>los tres planos se cortan en un punto</b>.",
        "<b>m = 2</b> (SCI, rg 2): ¿hay filas proporcionales? (1, 1, −1), (2, 3, 2) y (1, 2, 3) no son proporcionales dos a dos → <b>haz de planos</b>: se cortan en la recta (5λ, 1 − 4λ, λ).",
        "<b>m = −3</b> (SI, rg(A) = 2): (1, 1, −1), (2, 3, −3) y (1, −3, 3) tampoco son proporcionales → <b>prisma</b>: se cortan dos a dos pero no hay ningún punto común."
      ]) +
      ojo("«Dos planos paralelos» exige que sean proporcionales los coeficientes de x, y, z (los vectores normales), no los de x, y e incluso los términos independientes. Si los coeficientes son proporcionales y el término independiente también, los planos <b>coinciden</b>, y eso cambia SI por SCI.")
  });

  // ---------------------------------------------------------------- 9. Problemas
  nuevas.push({
    h: "9. Problemas con enunciado: de la frase al sistema",
    html:
      "<p>En la EvAU, un problema de sistemas de ecuaciones se puntúa por tres cosas: <b>plantear</b> (la mitad de la nota), <b>resolver</b> y <b>interpretar</b>. El planteamiento tiene su método:</p>" +
      "<ol><li><b>Define las incógnitas con unidades</b> («x = precio del bocadillo, en €»). Si el enunciado dice «el triple de…», decide quién es la incógnita básica.</li>" +
      "<li><b>Una ecuación por cada dato</b>: subraya cada frase del enunciado y tradúcela. Busca las frases escondidas («en total», «dentro de 10 años», «recaudan», «es el doble que»).</li>" +
      "<li><b>Escribe el sistema en forma matricial</b> y clasifícalo por Rouché-Frobenius antes de resolver.</li>" +
      "<li><b>Resuelve</b> por Gauss (o por Cramer si es 2×2 o 3×3 sencillo).</li>" +
      "<li><b>Interpreta y comprueba en el texto</b>: ¿tiene sentido (no es negativo, es entero si cuenta personas o entradas)? ¿Cumple los datos <i>originales</i>?</li></ol>" +
      tabla(["Frase", "Ecuación"], [
        ["«la suma de tres números es 100»", "x + y + z = 100"],
        ["«el primero es el doble del segundo»", "x = 2y → x − 2y = 0"],
        ["«hace 5 años, el padre tenía el triple que el hijo»", "(x − 5) = 3(y − 5)"],
        ["«se recaudan 780 €: 8 € por entrada de adulto y 5 € por una infantil»", "8x + 5y = 780"],
        ["«una mezcla al 7,6 €/kg de 100 kg»", "6x + 8y + 10z = 7,6·100 = 760"],
        ["«un interés del 4 % sobre y»", "0,04·y"]
      ]) +
      ejemplo("Entradas de cine (SCD)", "En una sesión se venden 120 entradas y se recaudan 780 €. La entrada de adulto cuesta 8 €, la infantil 5 € y la de jubilado 4 €. Se vende el doble de entradas infantiles que de jubilados. ¿Cuántas de cada tipo?", [
        "Incógnitas: x = entradas de adulto, y = infantiles, z = de jubilado.",
        "Ecuaciones: x + y + z = 120; 8x + 5y + 4z = 780; y = 2z.",
        "Ampliada: " + M([[1, 1, 1, 120], [8, 5, 4, 780], [0, 1, -2, 0]], 3) + ". F₂ ← F₂ − 8F₁: " + M([[1, 1, 1, 120], [0, -3, -4, -180], [0, 1, -2, 0]], 3) + ". F₃ ← 3F₃ + F₂: " + M([[1, 1, 1, 120], [0, -3, -4, -180], [0, 0, -10, -180]], 3) + ".",
        "z = 18 (de −10z = −180), y = 36 (de −3y − 72 = −180) y x = 120 − 36 − 18 = 66. rg(A) = rg(A|B) = 3: SCD.",
        "Comprobación en el texto: 66 + 36 + 18 = 120 entradas ✓; 8·66 + 5·36 + 4·18 = 528 + 180 + 72 = 780 € ✓; 36 = 2·18 ✓. Son números enteros y positivos: tiene sentido."
      ]) +
      ejemplo("Edades (SCD 2×2)", "Un padre tiene hoy el triple de la edad de su hijo. Dentro de 10 años solo tendrá el doble. ¿Qué edades tienen?", [
        "x = edad del padre, y = edad del hijo. «El triple»: x = 3y. «Dentro de 10 años»: x + 10 = 2(y + 10) → x − 2y = 10.",
        "Restando: (x − 2y) − (x − 3y) = 10 − 0 → y = 10 y x = 30.",
        "Comprobación: hoy 30 = 3·10 ✓; en 10 años tendrán 40 y 20, y 40 = 2·20 ✓."
      ]) +
      w("ms_problema") +
      "<h5>Cuando el problema sale SCI o SI</h5>" +
      "<p>Un SCI en un problema significa que <b>faltan datos</b>: el enunciado no determina las cantidades, pero sí las relaciona. A veces la propia realidad ayuda a elegir (las cantidades deben ser no negativas y enteras), como en el último problema de la actividad anterior. Un SI significa que <b>los datos se contradicen</b>: hay que decirlo con claridad («el sistema es incompatible, luego no existe ninguna mezcla con esas condiciones»).</p>" +
      ejemplo("Un enunciado con datos incompatibles", "Se mezclan tres cafés de 6, 8 y 10 €/kg hasta obtener 100 kg que cuestan 8,2 €/kg, y la cantidad del primero supera en 20 kg a la del tercero. ¿Es posible?", [
        "x + y + z = 100; 6x + 8y + 10z = 820; x − z = 20.",
        "De la primera, 8x + 8y + 8z = 800; restando a la segunda: −2x + 2z = 20 → x − z = −10. Contradice x − z = 20.",
        "rg(A) = 2 y rg(A|B) = 3: <b>SI</b>. No existe tal mezcla: con esa diferencia entre A y C el precio medio sería de 7,6 €/kg."
      ])
  });

  // ---------------------------------------------------------------- 10. EvAU
  nuevas.push({
    h: "10. Cómo se pregunta en la EvAU de Madrid y cómo se contesta",
    html:
      "<p>Los sistemas aparecen en el bloque de Álgebra, a menudo en un problema de dos o tres apartados que combina discusión, resolución y, con frecuencia, un problema de planteamiento o una interpretación geométrica. Las preguntas se repiten por familias:</p>" +
      tabla(["Qué piden", "Qué hacer", "Dónde se pierden puntos"], [
        ["Discutir según m (A cuadrada)", "det(A) → raíces → rangos en cada valor crítico", "olvidar «m ≠ …, SCD»; dar SCI sin mirar rg(A|B)"],
        ["Discutir con m solo en B", "rg(A) fijo; orlar con B", "calcular det(A) y quedarse en «siempre SCD»"],
        ["Resolver para un valor de m", "sustituir y aplicar Gauss o Cramer", "resolver el sistema general en vez del caso pedido"],
        ["Resolver un SCI", "parámetros, subsistema y comprobación", "dejar las incógnitas dependientes unas de otras"],
        ["Homogéneo con parámetro", "det(A) = 0 ⇒ soluciones no triviales", "no resolver los casos críticos si lo piden"],
        ["Posición relativa de tres planos", "tipo de sistema + proporcionalidad de normales", "confundir paralelos con coincidentes"],
        ["Problema de planteamiento", "incógnitas con unidades, una ecuación por dato", "no comprobar en el enunciado; pasar por alto unidades"]
      ]) +
      "<p>Para redactar bien: <b>escribe cada operación entre filas</b> (F₂ ← F₂ − 2F₁); <b>nombra los rangos</b> («rg(A) = 2, rg(A|B) = 3, luego SI»); <b>cita el teorema</b> de Rouché-Frobenius; y cierra el apartado con una frase que responda a lo que se pidió (una solución concreta, una recta de soluciones, «no existe»).</p>" +
      ejemplo("Un ejercicio EvAU completo, redactado", "Se considera el sistema x + y + z = m + 1, m·x + y + z = 1, x + m·y + z = m. (a) Discútelo según m. (b) Resuélvelo para m = 0.", [
        "<b>(a)</b> A = " + MP([["1", "1", "1"], ["m", "1", "1"], ["1", "m", "1"]]) + ". det(A) = 1 + 1 + m² − 1 − m − m = m² − 2m + 1 = (m − 1)². Para m ≠ 1: rg(A) = rg(A|B) = 3 = n → <b>SCD</b>.",
        "Para m = 1: " + M([[1, 1, 1, 2], [1, 1, 1, 1], [1, 1, 1, 1]], 3) + ". rg(A) = 1 y rg(A|B) = 2 (la 1.ª y la 2.ª fila tienen los mismos coeficientes y términos distintos) → <b>SI</b>.",
        "<b>(b)</b> m = 0: x + y + z = 1, y + z = 1, x + z = 0. Restando las dos primeras: x = 0; de la tercera, z = 0 → y = 1. Solución: (0, 1, 0).",
        "Comprobación: 0 + 1 + 0 = 1 ✓; 1 + 0 = 1 ✓; 0 + 0 = 0 ✓."
      ])
  });

  nuevas.push({
    h: "11. ¿Qué falla aquí? Los errores que más puntos cuestan",
    html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
  });
  nuevas.push({
    h: "12. Autocomprobación",
    html:
      "<p>Test de doce preguntas, tarjetas con lo esencial, un juego para unir cada situación con su tipo de sistema, otro para clasificar sistemas por sus rangos y un ejercicio de ordenar los pasos de una discusión.</p>" +
      w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "tipos") + w("clasificar", "rangos") + w("orden", "discusion")
  });

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    errores: {
      titulo: "¿Qué falla aquí?",
      preguntas: [
        { q: "Para discutir según m, un alumno divide la 2.ª ecuación entre (m − 2) «para que quede más sencilla» y sigue sin más.",
          op: ["Es un buen método", "Falla: si m = 2 esa operación no existe y ese caso queda sin estudiar", "Falla: nunca se divide una ecuación", "Falla: el sistema no depende de m"], ok: 1,
          porque: "Dividir entre (m − 2) exige m ≠ 2. El valor m = 2 hay que estudiarlo aparte, y suele ser precisamente un valor crítico." },
        { q: "«det(A) = 0 para m = 3, luego para m = 3 el sistema es incompatible.»",
          op: ["Correcto: det(A) = 0 implica incompatible", "Incorrecto: con det(A) = 0 puede ser SCI o SI; hay que comparar rg(A) y rg(A|B)", "Incorrecto: con det(A) = 0 siempre es SCI", "Correcto salvo que el sistema sea homogéneo"], ok: 1,
          porque: "det(A) = 0 solo dice que rg(A) < n. Si rg(A|B) = rg(A) es SCI; si rg(A|B) > rg(A) es SI. Hay que calcular los dos rangos." },
        { q: "Al escalonar aparece una fila (0 0 0 | 0). El alumno concluye: «incompatible».",
          op: ["Es correcto", "Falla: esa fila es 0 = 0, una ecuación redundante; el sistema puede ser SCD o SCI", "Falla: la fila significa SCD siempre", "Falla: significa que hay error de cálculo"], ok: 1,
          porque: "La fila (0 0 0 | c) es incompatible solo si c ≠ 0. Con c = 0 es la ecuación 0 = 0, sin información: sobraba una ecuación." },
        { q: "«El sistema homogéneo tiene det(A) = 0, así que es incompatible.»",
          op: ["Es correcto", "Falla: un homogéneo siempre admite la solución trivial; con det(A) = 0 es SCI", "Falla: es SCD", "Falla: no se puede calcular det(A) en un homogéneo"], ok: 1,
          porque: "Con B = 0 siempre se cumple rg(A) = rg(A|B): nunca es incompatible. Con det(A) = 0 tiene infinitas soluciones." },
        { q: "Un alumno aplica Cramer y escribe z = det(A)/det(A_z).",
          op: ["Correcto", "Está invertido: z = det(A_z)/det(A)", "Debe ser z = det(A_z)·det(A)", "Debe ser z = det(A_z)/det(B)"], ok: 1,
          porque: "El denominador es siempre el determinante de la matriz de coeficientes A (el mismo para todas las incógnitas); el numerador es el de A con la columna sustituida." },
        { q: "Un sistema de 2 ecuaciones y 3 incógnitas tiene rg(A) = rg(A|B) = 2. El alumno escribe «rg = n.º de ecuaciones, luego SCD».",
          op: ["Es correcto", "Falla: SCD exige rg(A) = n.º de incógnitas (3); aquí rg = 2 &lt; 3, es SCI con 1 parámetro", "Falla: es SI", "Falla: es SCD solo si hay 3 ecuaciones iguales"], ok: 1,
          porque: "Lo que se compara es el rango con el número de INCÓGNITAS, no con el de ecuaciones. Con menos ecuaciones que incógnitas nunca hay SCD." },
        { q: "«Los planos x + y + z = 1 y 2x + 2y + 2z = 2 son paralelos distintos.»",
          op: ["Correcto", "Falla: la segunda ecuación es el doble de la primera: son el mismo plano (coincidentes)", "Falla: se cortan en una recta", "Falla: son perpendiculares"], ok: 1,
          porque: "Coeficientes proporcionales Y término independiente con la misma proporción = coincidentes. Paralelos distintos exigiría, por ejemplo, 2x + 2y + 2z = 5." },
        { q: "Un alumno resuelve un sistema 3×3 y comprueba la solución solo en la primera ecuación.",
          op: ["Basta: si cumple una, cumple todas", "Falla: la solución debe cumplir las tres ecuaciones; fallar una basta para estar mal", "Falla: no hay que comprobar en un sistema", "Basta con comprobar en la más sencilla"], ok: 1,
          porque: "Una solución del sistema es una lista que cumple TODAS las ecuaciones. Una solución falsa que cumple una puede no cumplir las demás (error de cálculo en Gauss)." },
        { q: "En un sistema con m solo en los términos independientes, det(A) = 0 siempre. El alumno dice: «luego es incompatible para todo m».",
          op: ["Es correcto", "Falla: det(A) = 0 solo dice rg(A) < 3; para algún valor de m puede ser rg(A|B) = rg(A) (SCI)", "Falla: es SCD para todo m", "Falla: no se puede discutir"], ok: 1,
          porque: "Hay que orlar con la columna B: para el valor de m que haga rg(A|B) = rg(A), el sistema es SCI; para los demás, SI. Un solo determinante no discute." }
      ]
    },
    quiz1: {
      titulo: "Test del tema 3",
      preguntas: [
        { q: "Un sistema de 3 ecuaciones y 3 incógnitas tiene rg(A) = 2 y rg(A|B) = 3. Es…",
          op: ["incompatible", "compatible determinado", "compatible indeterminado", "no se puede saber"], ok: 0,
          porque: "rg(A) ≠ rg(A|B): Rouché-Frobenius dice incompatible." },
        { q: "Un sistema con 2 ecuaciones y 3 incógnitas, si es compatible, es…",
          op: ["compatible indeterminado", "compatible determinado", "incompatible", "homogéneo"], ok: 0,
          porque: "rg(A) ≤ 2 &lt; 3 = n: si es compatible quedan al menos 3 − 2 = 1 parámetros." },
        { q: "Un sistema homogéneo es siempre…",
          op: ["compatible", "incompatible", "determinado", "indeterminado"], ok: 0,
          porque: "La solución trivial (0, …, 0) siempre lo cumple, luego nunca es incompatible." },
        { q: "Un sistema con 4 incógnitas tiene rg(A) = rg(A|B) = 2. ¿Cuántos parámetros tiene su solución general?",
          op: ["2", "1", "4", "3"], ok: 0,
          porque: "Parámetros = n − rg(A) = 4 − 2 = 2." },
        { q: "La regla de Cramer no se puede aplicar a un sistema cuadrado cuando…",
          op: ["det(A) = 0", "det(A_x) = 0", "los términos independientes son 0", "hay tres incógnitas"], ok: 0,
          porque: "Cramer divide entre det(A). Si es 0, hay que estudiar rangos." },
        { q: "Si det(A) = (m − 1)(m + 3), el sistema cuadrado es SCD para…",
          op: ["m ≠ 1 y m ≠ −3", "m = 1 y m = −3", "m ≠ 1", "todo m"], ok: 0,
          porque: "Con det(A) ≠ 0 el rango de A es máximo y el sistema es SCD. Los casos m = 1 y m = −3 se estudian aparte." },
        { q: "Un sistema homogéneo cuadrado tiene soluciones distintas de la trivial si y solo si…",
          op: ["det(A) = 0", "det(A) ≠ 0", "B ≠ 0", "rg(A) = n"], ok: 0,
          porque: "det(A) = 0 equivale a rg(A) &lt; n, y entonces el homogéneo es SCI." },
        { q: "¿Cuál NO es una operación permitida entre filas en Gauss?",
          op: ["Multiplicar una fila por 0", "Intercambiar dos filas", "Sumar a una fila un múltiplo de otra", "Multiplicar una fila por −2"], ok: 0,
          porque: "Multiplicar por 0 destruye la ecuación (la convierte en 0 = 0) y cambia el conjunto de soluciones." },
        { q: "Tres planos con rg(A) = rg(A|B) = 2 y ninguna pareja de planos proporcional. Se cortan en…",
          op: ["una recta (haz de planos)", "un punto", "ningún punto: prisma", "un plano"], ok: 0,
          porque: "Es SCI con un parámetro: solución es una recta. Es la recta común a los tres planos (haz de planos)." },
        { q: "En un problema con enunciado resulta un SCI. Significa que…",
          op: ["faltan datos para determinar las cantidades", "los datos se contradicen", "la solución es única", "se ha equivocado el enunciado siempre"], ok: 0,
          porque: "Un SCI deja relaciones sin fijar: el enunciado no da información suficiente." },
        { q: "Con rg(A) = 2 se orla un menor no nulo con la columna B y sale determinante 0. Entonces rg(A|B) =",
          op: ["2", "3", "1", "0"], ok: 0,
          porque: "Si ningún menor de orden 3 que incluya B es no nulo, rg(A|B) no sube: es 2 (compatible)." },
        { q: "Un sistema de 4 ecuaciones y 3 incógnitas con rg(A) = rg(A|B) = 3 es…",
          op: ["compatible determinado", "compatible indeterminado", "incompatible", "homogéneo"], ok: 0,
          porque: "rg(A) = rg(A|B) = n = 3: SCD; la cuarta ecuación era combinación de las demás." }
      ]
    },
    tj1: {
      titulo: "Lo esencial del tema 3",
      cartas: [
        { a: "Forma matricial de un sistema", b: "A·X = B. A = coeficientes, X = incógnitas, B = términos independientes. Ampliada (A|B)." },
        { a: "Operaciones permitidas en Gauss", b: "Intercambiar filas; multiplicar una fila por k ≠ 0; sumar a una fila un múltiplo de otra." },
        { a: "Fila (0 0 0 | c) con c ≠ 0", b: "Ecuación imposible 0 = c: sistema incompatible." },
        { a: "Rouché-Frobenius", b: "rg(A) ≠ rg(A|B): SI. rg(A) = rg(A|B) = n: SCD. rg(A) = rg(A|B) < n: SCI (n − rg(A) parámetros)." },
        { a: "Menos ecuaciones que incógnitas", b: "Nunca es SCD: es SCI o SI." },
        { a: "Sistema homogéneo", b: "B = 0. Siempre compatible (solución trivial). Solo trivial si rg(A) = n; si no, SCI." },
        { a: "Homogéneo cuadrado", b: "Solución no trivial ⇔ det(A) = 0." },
        { a: "Regla de Cramer", b: "xᵢ = det(Aᵢ)/det(A), con Aᵢ = A con la columna i cambiada por B; exige det(A) ≠ 0." },
        { a: "Discusión con parámetro m", b: "det(A) = 0 → críticos; resto SCD; cada crítico, rangos con números." },
        { a: "m solo en B", b: "rg(A) fijo; orla el menor no nulo con B para ver cuándo rg(A|B) = rg(A)." },
        { a: "Solución general de un SCI", b: "n − rg(A) parámetros; incógnitas libres al otro miembro; comprueba con valores." },
        { a: "Tres planos: SCD / SCI / SI", b: "Punto; recta (haz, o dos coincidentes + 1) o plano; prisma o paralelos sin punto común." },
        { a: "Planos paralelos o coincidentes", b: "Normales proporcionales. Coincidentes si también lo es el término independiente." },
        { a: "Problemas con enunciado", b: "Incógnitas con unidades; una ecuación por dato; resuelve; comprueba en el texto; valora si tiene sentido." }
      ]
    },
    tipos: {
      titulo: "Situación y rangos",
      consigna: "Une cada posición relativa con sus rangos.",
      pares: [
        ["Tres planos que se cortan en un punto", "rg(A) = rg(A|B) = 3"],
        ["Haz de planos (una recta común)", "rg(A) = rg(A|B) = 2 &lt; 3"],
        ["Prisma triangular", "rg(A) = 2, rg(A|B) = 3, sin planos paralelos"],
        ["Tres planos coincidentes", "rg(A) = rg(A|B) = 1"],
        ["Tres planos paralelos distintos", "rg(A) = 1, rg(A|B) = 2 y ninguno coincide"],
        ["Dos rectas secantes en el plano", "rg(A) = rg(A|B) = 2 con 2 incógnitas"]
      ]
    },
    rangos: {
      titulo: "¿Qué tipo de sistema es?",
      consigna: "Clasifica cada situación.",
      categorias: ["SCD", "SCI", "SI"],
      items: [
        { t: "3 incógnitas, rg(A) = 3 y rg(A|B) = 3", c: 0 },
        { t: "3 incógnitas, rg(A) = 2 y rg(A|B) = 3", c: 2 },
        { t: "3 incógnitas, rg(A) = 2 y rg(A|B) = 2", c: 1 },
        { t: "2 incógnitas y 3 ecuaciones con rg(A) = rg(A|B) = 2", c: 0 },
        { t: "2 incógnitas, rg(A) = 1 y rg(A|B) = 2", c: 2 },
        { t: "3 incógnitas y 2 ecuaciones independientes con rg(A) = rg(A|B) = 2", c: 1 },
        { t: "Al escalonar queda la fila (0 0 0 | 5)", c: 2 },
        { t: "Al escalonar quedan 3 pivotes en 3 incógnitas y ninguna fila imposible", c: 0 },
        { t: "Al escalonar quedan 2 pivotes en 4 incógnitas y una fila de ceros", c: 1 },
        { t: "Homogéneo 3×3 con det(A) ≠ 0", c: 0 },
        { t: "Homogéneo 3×3 con det(A) = 0", c: 1 }
      ]
    },
    discusion: {
      titulo: "Discutir un sistema con parámetro",
      consigna: "Ordena los pasos de una discusión según m (A cuadrada).",
      items: [
        { t: "Escribir la matriz de coeficientes A y la ampliada (A | B) con m dentro" },
        { t: "Calcular det(A) en función de m y factorizarlo" },
        { t: "Igualar a 0: las raíces son los valores críticos" },
        { t: "Para m distinto de los críticos: det(A) ≠ 0, rg(A) = rg(A|B) = n y el sistema es SCD" },
        { t: "Sustituir cada valor crítico y calcular rg(A) y rg(A|B) con números" },
        { t: "Aplicar Rouché-Frobenius en cada caso: SCD, SCI o SI" },
        { t: "Si piden resolver, hacerlo solo en los casos pedidos y comprobar" },
        { t: "Cerrar con una frase que resuma todos los casos" }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  function num(et, v, u) { var o = { tipo: "num", etiqueta: et, valor: v }; if (u) o.unidad = u; return o; }
  function op(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var TIPOS = ["SCD (solución única)", "SCI (infinitas soluciones)", "SI (sin solución)"];

  var ejercicios = [
    // ================= ★ básico =================
    { id: "b1", nivel: 1,
      enunciado: "Escribe en forma matricial el sistema" + sis(["x − 2y + 3z = 4", "2x + y = 5", "y − z = −1"]) + "Indica la dimensión de la ampliada (A|B), el elemento a₁₂ de A, el elemento a₂₃ de A y el elemento b₃ de B.",
      check: [op("Dimensión de (A|B)", ["3×4", "3×3", "4×3", "3×5"], 0), num("a₁₂ =", -2), num("a₂₃ =", 0), num("b₃ =", -1)],
      pistas: ["Las incógnitas van siempre en el orden x, y, z; el hueco de una incógnita ausente es un 0."],
      pasos: ["A = " + M([[1, -2, 3], [2, 1, 0], [0, 1, -1]]) + ", B = " + M([[4], [5], [-1]]) + ".", "(A|B) tiene 3 filas y 3 + 1 = 4 columnas: 3×4.", "a₁₂ = −2; a₂₃ = 0 (en la 2.ª ecuación no hay z); b₃ = −1."],
      resultado: "3×4 · a₁₂ = −2 · a₂₃ = 0 · b₃ = −1" },
    { id: "b2", nivel: 1,
      enunciado: "¿Es (x, y, z) = (1, 2, −1) solución del sistema" + sis(["x + y + z = 2", "2x − y = 0", "x − z = 2"]) + "?",
      check: op("¿Es solución?", ["Sí, cumple las tres", "No, falla la primera", "No, falla la segunda", "No, falla la tercera"], 0),
      pistas: ["Sustituye en cada ecuación; basta que falle una para que no sea solución."],
      pasos: ["1 + 2 + (−1) = 2 ✓.", "2·1 − 2 = 0 ✓.", "1 − (−1) = 2 ✓. Cumple las tres: es solución."],
      resultado: "Sí, es solución" },
    { id: "b3", nivel: 1,
      enunciado: "¿Es (1, 1, 1) solución de" + sis(["x + 2y − z = 2", "3x − y = 2", "x + y + z = 4"]) + "?",
      check: op("¿Es solución?", ["Sí, cumple las tres", "No, falla la primera", "No, falla la segunda", "No, falla la tercera"], 3),
      pistas: ["Comprueba las tres ecuaciones por separado."],
      pasos: ["1 + 2 − 1 = 2 ✓.", "3 − 1 = 2 ✓.", "1 + 1 + 1 = 3 ≠ 4 ✗. No es solución (falla la tercera)."],
      resultado: "No: falla la tercera ecuación" },
    { id: "b4", nivel: 1,
      enunciado: "Un sistema de 3 ecuaciones y 3 incógnitas tiene rg(A) = 2 y rg(A|B) = 3. ¿De qué tipo es?",
      check: op("Tipo de sistema", TIPOS, 2),
      pistas: ["Compara rg(A) con rg(A|B) antes que con n."],
      pasos: ["rg(A) = 2 ≠ 3 = rg(A|B): por Rouché-Frobenius, el sistema es incompatible."],
      resultado: "SI (incompatible)" },
    { id: "b5", nivel: 1,
      enunciado: "Un sistema de 3 ecuaciones y 4 incógnitas tiene rg(A) = rg(A|B) = 2. Clasifícalo y di cuántos parámetros tiene su solución general.",
      check: [op("Tipo", TIPOS, 1), num("Parámetros =", 2)],
      pistas: ["Parámetros = n − rg(A)."],
      pasos: ["rg(A) = rg(A|B) = 2 &lt; 4 = n: compatible indeterminado.", "Parámetros: 4 − 2 = 2."],
      resultado: "SCI con 2 parámetros" },
    { id: "b6", nivel: 1,
      enunciado: "Resuelve por Gauss " + sis(["3x + 2y = 7", "x − y = 4"]),
      check: [num("x =", 3), num("y =", -1)],
      pistas: ["Intercambia las filas para tener un pivote 1, y haz F₂ ← F₂ − 3F₁."],
      pasos: ["(A|B) = " + M([[3, 2, 7], [1, -1, 4]], 2) + " → F₁ ↔ F₂ → " + M([[1, -1, 4], [3, 2, 7]], 2) + " → F₂ ← F₂ − 3F₁ → " + M([[1, -1, 4], [0, 5, -5]], 2) + ".", "5y = −5 → y = −1; x = 4 + y = 3.", "Comprobación: 3·3 + 2·(−1) = 7 ✓."],
      resultado: "x = 3, y = −1" },
    { id: "b7", nivel: 1,
      enunciado: "Resuelve con la regla de Cramer " + sis(["2x + y = 5", "x + 3y = 5"]) + "Da det(A), x e y.",
      check: [num("det(A) =", 5), num("x =", 2), num("y =", 1)],
      pistas: ["det(A_x) cambia la 1.ª columna por (5, 5); det(A_y) cambia la 2.ª."],
      pasos: ["det(A) = 2·3 − 1·1 = 5.", "det(A_x) = " + M([[5, 1], [5, 3]]) + " = 15 − 5 = 10 → x = 10/5 = 2.", "det(A_y) = " + M([[2, 5], [1, 5]]) + " = 10 − 5 = 5 → y = 5/5 = 1."],
      resultado: "det(A) = 5 · x = 2 · y = 1" },
    { id: "b8", nivel: 1,
      enunciado: "Resuelve por Gauss " + sis(["x + y + z = 6", "x − y = −1", "y − z = −1"]),
      check: [num("x =", 1), num("y =", 2), num("z =", 3)],
      pistas: ["F₂ ← F₂ − F₁ elimina la x de la segunda ecuación."],
      pasos: ["(A|B) = " + M([[1, 1, 1, 6], [1, -1, 0, -1], [0, 1, -1, -1]], 3) + ". F₂ ← F₂ − F₁: " + M([[1, 1, 1, 6], [0, -2, -1, -7], [0, 1, -1, -1]], 3) + ".", "F₃ ← 2F₃ + F₂: " + M([[1, 1, 1, 6], [0, -2, -1, -7], [0, 0, -3, -9]], 3) + ".", "z = 3; −2y − 3 = −7 → y = 2; x = 6 − 2 − 3 = 1."],
      resultado: "(x, y, z) = (1, 2, 3)" },
    { id: "b9", nivel: 1,
      enunciado: "El sistema homogéneo x − 2y = 0, 3x − 6y = 0, ¿cuántas soluciones tiene? Si y = 3, ¿cuánto vale x?",
      check: [op("Número de soluciones", ["Solo la trivial", "Infinitas", "Ninguna", "Exactamente dos"], 1), num("x =", 6)],
      pistas: ["La 2.ª ecuación es el triple de la 1.ª."],
      pasos: ["rg(A) = 1 &lt; 2 = n: SCI, infinitas soluciones (todos los puntos de la recta x = 2y).", "Con y = 3: x = 6."],
      resultado: "Infinitas · x = 6" },
    { id: "b10", nivel: 1,
      enunciado: "¿Puede un sistema homogéneo ser incompatible?",
      check: op("Respuesta", ["No, siempre admite la solución trivial", "Sí, si det(A) = 0", "Sí, si hay más ecuaciones que incógnitas", "Depende del parámetro siempre"], 0),
      pistas: ["Prueba con todas las incógnitas valiendo 0."],
      pasos: ["Con todas las incógnitas iguales a 0 todas las ecuaciones valen 0 = 0, así que la solución trivial siempre existe. Equivale a rg(A) = rg(A|B) (añadir una columna de ceros no sube el rango)."],
      resultado: "No" },
    { id: "b11", nivel: 1,
      enunciado: "Resuelve " + sis(["2x + y = 3", "x + y = 2"]) + "con X = A⁻¹·B, sabiendo que A⁻¹ = " + M([[1, -1], [-1, 2]]) + ".",
      check: [num("x =", 1), num("y =", 1)],
      pistas: ["Multiplica A⁻¹ por la izquierda: A⁻¹ por B = (3, 2)."],
      pasos: ["X = " + M([[1, -1], [-1, 2]]) + "·" + M([[3], [2]]) + " = " + M([[1], [1]]) + ".", "Comprobación: 2 + 1 = 3 ✓ y 1 + 1 = 2 ✓."],
      resultado: "(x, y) = (1, 1)" },
    { id: "b12", nivel: 1,
      enunciado: "La suma de dos números es 25 y su diferencia es 7. ¿Cuáles son? (Da el mayor y el menor.)",
      check: [num("Mayor =", 16), num("Menor =", 9)],
      pistas: ["x + y = 25 y x − y = 7."],
      pasos: ["Sumando las ecuaciones: 2x = 32 → x = 16; y = 25 − 16 = 9.", "Comprobación: 16 + 9 = 25 ✓ y 16 − 9 = 7 ✓."],
      resultado: "16 y 9" },
    { id: "b13", nivel: 1,
      enunciado: "Las rectas x + y = 3 y 2x + 2y = 7 del plano, ¿cómo son?",
      check: op("Posición", ["Se cortan en un punto", "Coincidentes", "Paralelas distintas", "Perpendiculares"], 2),
      pistas: ["Compara los coeficientes y también los términos independientes."],
      pasos: ["Los coeficientes de la 2.ª son el doble de los de la 1.ª, pero 7 ≠ 2·3.", "rg(A) = 1 y rg(A|B) = 2: sistema incompatible, rectas paralelas distintas."],
      resultado: "Paralelas distintas (SI)" },
    { id: "b14", nivel: 1,
      enunciado: "Un sistema homogéneo 3×3 tiene det(A) = 5. ¿Qué soluciones tiene?",
      check: op("Soluciones", ["Solo la trivial (0, 0, 0)", "Infinitas", "Ninguna", "Depende de B"], 0),
      pistas: ["det(A) ≠ 0 significa rg(A) = 3 = n."],
      pasos: ["rg(A) = rg(A|B) = 3 = n: SCD, y la única solución del homogéneo es la trivial."],
      resultado: "Solo la trivial" },

    // ================= ★★ intermedio =================
    { id: "m1", nivel: 2,
      enunciado: "Resuelve por Gauss " + sis(["2x + y − z = −1", "x − 2y + z = 5", "3x + y + 2z = 6"]),
      check: [num("x =", 1), num("y =", -1), num("z =", 2)],
      pistas: ["Empieza con F₁ ↔ F₂ para tener un pivote 1.", "Después F₂ ← F₂ − 2F₁ y F₃ ← F₃ − 3F₁."],
      pasos: ["Tras F₁ ↔ F₂, F₂ ← F₂ − 2F₁ y F₃ ← F₃ − 3F₁: " + M([[1, -2, 1, 5], [0, 5, -3, -11], [0, 7, -1, -9]], 3) + ".", "F₃ ← 5F₃ − 7F₂: " + M([[1, -2, 1, 5], [0, 5, -3, -11], [0, 0, 16, 32]], 3) + ".", "z = 2, 5y − 6 = −11 → y = −1, x + 2 + 2 = 5 → x = 1."],
      resultado: "(1, −1, 2)" },
    { id: "m2", nivel: 2,
      enunciado: "Estudia y resuelve" + sis(["x − y + 2z = 3", "2x + y − z = 0", "3x + z = 3"]) + "Clasifícalo, di cuántos parámetros tiene y calcula x e y cuando z = 3.",
      check: [op("Tipo", TIPOS, 1), num("Parámetros =", 1), num("x (con z = 3) =", 0), num("y (con z = 3) =", 3)],
      pistas: ["La 3.ª ecuación es la suma de las dos primeras."],
      pasos: ["rg(A) = rg(A|B) = 2 &lt; 3: SCI con 1 parámetro.", "Solución con z = λ: (1 − λ/3, (5λ − 6)/3, λ).", "Con z = 3: x = 1 − 1 = 0, y = (15 − 6)/3 = 3."],
      resultado: "SCI · 1 parámetro · (x, y) = (0, 3)" },
    { id: "m3", nivel: 2,
      enunciado: "Estudia" + sis(["x + y − z = 1", "2x − y + z = 2", "3x = 5"]) + "Da rg(A), rg(A|B) y el tipo de sistema.",
      check: [num("rg(A) =", 2), num("rg(A|B) =", 3), op("Tipo", TIPOS, 2)],
      pistas: ["Suma las dos primeras ecuaciones y compárala con la tercera."],
      pasos: ["F₁ + F₂ da 3x = 3, pero la tercera dice 3x = 5.", "Tras Gauss queda una fila (0 0 0 | 2): rg(A) = 2, rg(A|B) = 3: SI."],
      resultado: "rg(A) = 2 · rg(A|B) = 3 · SI" },
    { id: "m4", nivel: 2,
      enunciado: "Resuelve el sistema de cuatro ecuaciones con tres incógnitas" + sis(["x + y + z = 4", "x − y + z = 2", "y − z = −1", "2x + 2z = 6"]),
      check: [num("x =", 1), num("y =", 1), num("z =", 2)],
      pistas: ["Resta las dos primeras ecuaciones. ¿Qué es la cuarta respecto a las otras?"],
      pasos: ["F₁ − F₂: 2y = 2 → y = 1; F₁ + F₂ da 2x + 2z = 6 (la cuarta, redundante).", "De y − z = −1: z = 2 y x = 1. rg(A) = rg(A|B) = 3: SCD."],
      resultado: "(1, 1, 2)" },
    { id: "m5", nivel: 2,
      enunciado: "Resuelve" + sis(["x + 2y − z = 3", "2x − y + 3z = 1"]) + "Clasifícalo y da x e y para z = 2.",
      check: [op("Tipo", TIPOS, 1), num("x (con z = 2) =", -1), num("y (con z = 2) =", 3)],
      pistas: ["F₂ ← F₂ − 2F₁. Toma z = λ."],
      pasos: ["" + M([[1, 2, -1, 3], [0, -5, 5, -5]], 3) + " → y = 1 + λ, x = 1 − λ.", "Con λ = 2: x = −1, y = 3. Comprobación: −1 + 6 − 2 = 3 ✓ y −2 − 3 + 6 = 1 ✓."],
      resultado: "SCI · (1 − λ, 1 + λ, λ) · con z = 2: (−1, 3)" },
    { id: "m6", nivel: 2,
      enunciado: "Resuelve con la regla de Cramer" + sis(["x + 2y + z = 5", "2x − y + 3z = 1", "x + y + 4z = 6"]) + "Da det(A), x, y y z.",
      check: [num("det(A) =", -14), num("x =", 0), num("y =", 2), num("z =", 1)],
      pistas: ["det(A) por Sarrus. Para cada incógnita se sustituye su columna por (5, 1, 6)."],
      pasos: ["det(A) = 1(−4 − 3) − 2(8 − 3) + 1(2 + 1) = −7 − 10 + 3 = −14.", "det(A_x) = 5(−7) − 2(4 − 18) + 1(1 + 6) = −35 + 28 + 7 = 0 → x = 0; det(A_y) = −28 → y = 2; det(A_z) = −14 → z = 1."],
      resultado: "det(A) = −14 · (x, y, z) = (0, 2, 1)" },
    { id: "m7", nivel: 2,
      enunciado: "Discute según m el sistema" + sis(["x + m·y = 1", "m·x + 4y = 2"]) + "Da los valores críticos de m y el tipo de sistema para m = 2 y para m = −2.",
      check: [{ tipo: "lista", etiqueta: "Valores críticos", valores: [2, -2] }, op("Tipo para m = 2", TIPOS, 1), op("Tipo para m = −2", TIPOS, 2)],
      pistas: ["det(A) = 4 − m². En cada caso crítico compara rg(A) y rg(A|B)."],
      pasos: ["det(A) = 4 − m² = 0 → m = ±2.", "m = 2: filas (1, 2 | 1) y (2, 4 | 2) proporcionales: rg(A) = rg(A|B) = 1 → SCI.", "m = −2: (1, −2 | 1) y (−2, 4 | 2): coeficientes proporcionales pero no el término independiente → rg(A) = 1, rg(A|B) = 2 → SI."],
      resultado: "m = ±2 · m = 2: SCI · m = −2: SI" },
    { id: "m8", nivel: 2,
      enunciado: "Discute según m" + sis(["x + y + z = 3", "m·x + 2y + z = 4", "x + y + m·z = m + 2"]) + "Da los valores críticos y el tipo para m = 1 y para m = 2.",
      check: [{ tipo: "lista", etiqueta: "Valores críticos", valores: [1, 2] }, op("Tipo para m = 1", TIPOS, 1), op("Tipo para m = 2", TIPOS, 2)],
      pistas: ["det(A) = −(m − 1)(m − 2)."],
      pasos: ["Críticos: m = 1 y m = 2; para el resto, SCD.", "m = 1: la 3.ª ecuación repite la 1.ª: rg(A) = rg(A|B) = 2 → SCI.", "m = 2: rg(A) = 2 y el determinante orlado vale 1 ≠ 0, luego rg(A|B) = 3 → SI."],
      resultado: "m = 1: SCI · m = 2: SI" },
    { id: "m9", nivel: 2,
      enunciado: "Considera el sistema homogéneo" + sis(["x + y + z = 0", "2x + m·y + z = 0", "x + y + m·z = 0"]) + "¿Para qué valores de m tiene soluciones distintas de la trivial? Resuélvelo para m = 1 y calcula y cuando z = 5; y para m = 2 calcula x cuando y = 3.",
      check: [{ tipo: "lista", etiqueta: "Valores de m", valores: [1, 2] }, num("y (m = 1, z = 5) =", -5), num("x (m = 2, y = 3) =", -3)],
      pistas: ["Homogéneo cuadrado: soluciones no triviales ⇔ det(A) = 0 = (m − 1)(m − 2)."],
      pasos: ["m = 1 y m = 2.", "m = 1: x = 0 y y = −z: con z = 5, y = −5.", "m = 2: z = 0 y x = −y: con y = 3, x = −3."],
      resultado: "m = 1, 2 · y = −5 · x = −3" },
    { id: "m10", nivel: 2,
      enunciado: "Un abuelo, su hijo y su nieto suman 120 años. El abuelo tiene 10 años menos que el doble de la edad del padre, y el padre tiene cuatro veces la edad del nieto. ¿Qué edades tienen?",
      check: [num("Abuelo =", 70, "años"), num("Padre =", 40, "años"), num("Nieto =", 10, "años")],
      pistas: ["a + p + n = 120; a = 2p − 10; p = 4n."],
      pasos: ["Sistema: a + p + n = 120; a − 2p = −10; p − 4n = 0.", "Sustituyendo p = 4n y a = 8n − 10: (8n − 10) + 4n + n = 120 → 13n = 130 → n = 10.", "p = 40, a = 70. Comprobación: 70 + 40 + 10 = 120 ✓; 2·40 − 10 = 70 ✓."],
      resultado: "70, 40 y 10 años" },
    { id: "m11", nivel: 2,
      enunciado: "Con 3 bolígrafos, 2 cuadernos y 1 carpeta se pagan 17 €; con 1 bolígrafo, 4 cuadernos y 2 carpetas, 24 €; y con 2 bolígrafos, 1 cuaderno y 3 carpetas, 22 €. ¿Cuánto cuesta cada cosa?",
      check: [num("Bolígrafo =", 2, "€"), num("Cuaderno =", 3, "€"), num("Carpeta =", 5, "€")],
      pistas: ["x = bolígrafo, y = cuaderno, z = carpeta. Gauss con las tres ecuaciones."],
      pasos: ["3x + 2y + z = 17; x + 4y + 2z = 24; 2x + y + 3z = 22.", "Por Gauss (o Cramer: det(A) = 25) se obtiene (2, 3, 5).", "Comprobación: 6 + 6 + 5 = 17 ✓; 2 + 12 + 10 = 24 ✓; 4 + 3 + 15 = 22 ✓."],
      resultado: "2 €, 3 € y 5 €" },
    { id: "m12", nivel: 2,
      enunciado: "Estudia la posición relativa de los planos x + y + z = 1, 2x + 2y + 2z = 5 y x − y = 0.",
      check: op("Posición", ["Se cortan en un punto", "Haz de planos (recta común)", "Prisma triangular", "Dos paralelos y uno secante", "Tres coincidentes"], 3),
      pistas: ["Mira rg(A), rg(A|B) y si hay normales proporcionales."],
      pasos: ["Las dos primeras tienen normales (1, 1, 1) y (2, 2, 2) proporcionales, pero 5 ≠ 2·1: paralelos distintos.", "rg(A) = 2, rg(A|B) = 3: SI. El tercero tiene normal (1, −1, 0) y corta a los otros dos."],
      resultado: "Dos paralelos distintos y un tercero secante" },
    { id: "m13", nivel: 2,
      enunciado: "Estudia los planos x − y + z = 2, 2x + y − z = 1 y 3x = 3. ¿Cómo se cortan? Si tienen puntos comunes, calcula y para z = 3, con x = 1.",
      check: [op("Posición", ["Un punto", "Una recta (haz de planos)", "Prisma triangular", "Sin puntos comunes por planos paralelos"], 1), num("y (con z = 3) =", 2)],
      pistas: ["La tercera ecuación es la suma de las dos primeras."],
      pasos: ["F₁ + F₂ = (3, 0, 0 | 3): es la tercera. rg(A) = rg(A|B) = 2 → SCI, recta. Ninguna pareja es proporcional: es un haz.", "x = 1; de la 1.ª: 1 − y + z = 2 → y = z − 1. Con z = 3: y = 2. Solución: (1, λ − 1, λ)."],
      resultado: "Recta (1, λ − 1, λ) · y = 2" },
    { id: "m14", nivel: 2,
      enunciado: "Discute según b el sistema" + sis(["x + 2y − z = 1", "2x + y + z = 2", "3x + 3y = b"]) + "¿Para qué valor de b es compatible? ¿Qué tipo es si b = 5?",
      check: [num("b =", 3), op("Tipo para b = 5", TIPOS, 2)],
      pistas: ["La 3.ª fila de A es la suma de las otras dos."],
      pasos: ["rg(A) = 2 para todo b. El determinante orlado vale 9 − 3b: rg(A|B) = 2 si b = 3 y 3 si no.", "b = 3: SCI. b = 5: SI."],
      resultado: "b = 3 · b = 5: SI" },
    { id: "m15", nivel: 2,
      enunciado: "Resuelve " + sis(["x + 2y = 1", "3x + 5y = 2"]) + "como X = A⁻¹·B. Da la inversa A⁻¹ como (a₁₁, a₁₂ / a₂₁, a₂₂) y la solución.",
      check: [num("a₁₁ =", -5), num("a₁₂ =", 2), num("a₂₁ =", 3), num("a₂₂ =", -1), num("x =", -1), num("y =", 1)],
      pistas: ["det(A) = 5 − 6 = −1."],
      pasos: ["A⁻¹ = (1/−1)·" + M([[5, -2], [-3, 1]]) + " = " + M([[-5, 2], [3, -1]]) + ".", "X = " + M([[-5, 2], [3, -1]]) + "·" + M([[1], [2]]) + " = " + M([[-1], [1]]) + "."],
      resultado: "A⁻¹ = [[−5, 2], [3, −1]] · (x, y) = (−1, 1)" },
    { id: "m16", nivel: 2,
      enunciado: "Halla el valor de a para que el sistema x + y = 2, 2x + a·y = 4 tenga infinitas soluciones. ¿Qué tipo es para a ≠ 2?",
      check: [num("a =", 2), op("Tipo para a ≠ 2", TIPOS, 0)],
      pistas: ["det(A) = a − 2."],
      pasos: ["det(A) = a − 2 = 0 → a = 2. Con a = 2 la 2.ª ecuación es el doble de la 1.ª: SCI.", "Para a ≠ 2: det(A) ≠ 0, SCD."],
      resultado: "a = 2 · a ≠ 2: SCD" },
    { id: "m17", nivel: 2,
      enunciado: "Resuelve la ecuación x − 2y + z = 4 como un sistema de una ecuación. ¿Cuántos parámetros tiene? Con y = 1 y z = 2, ¿cuánto vale x?",
      check: [num("Parámetros =", 2), num("x =", 4)],
      pistas: ["Toma y = λ y z = μ."],
      pasos: ["n − rg = 3 − 1 = 2 parámetros: (4 + 2λ − μ, λ, μ), un plano.", "Con λ = 1, μ = 2: x = 4 + 2 − 2 = 4."],
      resultado: "2 parámetros · x = 4" },

    // ================= ★★★ nivel EvAU =================
    { id: "d1", nivel: 3,
      enunciado: "Se considera el sistema" + sis(["m·x + (m + 1)·y + 2z = m", "y − z = 1", "−x + (m + 1)·y + 2z = m"]) + "(a) Discútelo según m: da los valores críticos y el tipo para cada uno. (b) Resuélvelo para m = 0.",
      check: [{ tipo: "lista", etiqueta: "Valores críticos", valores: [-1, -3] }, op("Tipo para m = −1", TIPOS, 1), op("Tipo para m = −3", TIPOS, 2), num("x (m = 0) =", 0), num("y (m = 0) =", 2 / 3), num("z (m = 0) =", -1 / 3)],
      pistas: ["det(A) = (m + 1)(m + 3).", "Para m = 0 puedes restar la 1.ª y la 3.ª ecuaciones."],
      pasos: ["det(A) = (m + 1)(m + 3): críticos m = −1 y m = −3; resto SCD.", "m = −1: rg(A) = rg(A|B) = 2 (SCI). m = −3: rg(A) = 2 y rg(A|B) = 3 (SI).", "m = 0: y − z = 1; −x + y + 2z = 0 y 0·x + y + 2z = 0 → y = −2z → −3z = 1 → z = −1/3, y = 2/3, x = 0."],
      resultado: "m = −1: SCI · m = −3: SI · m = 0: (0, 2/3, −1/3)" },
    { id: "d2", nivel: 3,
      enunciado: "Discute según m el sistema" + sis(["−x − y + m·z = m", "(m − 1)·x + 2y = −1", "−x − y + 2z = m"]) + "y resuélvelo para m = 0.",
      check: [{ tipo: "lista", etiqueta: "Valores críticos", valores: [2, 3] }, op("Tipo para m = 2", TIPOS, 1), op("Tipo para m = 3", TIPOS, 2), num("x (m = 0) =", 1 / 3), num("y (m = 0) =", -1 / 3), num("z (m = 0) =", 0)],
      pistas: ["det(A) = −(m − 2)(m − 3). Restar la 1.ª y la 3.ª ecuaciones da (m − 2)z = 0."],
      pasos: ["det(A) = −(m − 2)(m − 3). Críticos m = 2 y m = 3.", "m = 2: la 1.ª y la 3.ª coinciden (F₁ = F₃) → rg(A) = rg(A|B) = 2: SCI. m = 3: rg(A) = 2 y rg(A|B) = 3: SI.", "m = 0: z = 0 (de F₁ − F₃: −2z = 0); −x − y = 0 y −x + 2y = −1 → y = −1/3, x = 1/3."],
      resultado: "m = 2: SCI · m = 3: SI · m = 0: (1/3, −1/3, 0)" },
    { id: "d3", nivel: 3,
      enunciado: "Se considera el sistema" + sis(["m·x + y = 1", "m·y + z = 0", "x + m·z = 0"]) + "(a) ¿Para qué valor de m es incompatible? (b) Resuélvelo para m = 1.",
      check: [num("m (incompatible) =", -1), num("x (m = 1) =", 0.5), num("y (m = 1) =", 0.5), num("z (m = 1) =", -0.5)],
      pistas: ["det(A) = (m + 1)(m² − m + 1), y m² − m + 1 no tiene raíces reales."],
      pasos: ["Único valor crítico real: m = −1. Para m = −1: rg(A) = 2, rg(A|B) = 3 → SI. Para los demás: SCD.", "m = 1: x + y = 1 (con m = 1 la 1.ª), y + z = 0, x + z = 0 → x = y = 1/2 y z = −1/2."],
      resultado: "m = −1 · (1/2, 1/2, −1/2)" },
    { id: "d4", nivel: 3,
      enunciado: "Considera el sistema homogéneo" + sis(["a·x + y + z = 0", "x + a·y + z = 0", "x + y + a·z = 0"]) + "(a) Halla los valores de a con soluciones no triviales. (b) Para a = −2, ¿cuánto vale y si x = 4? (c) Para a = 1, ¿cuántos parámetros tiene la solución?",
      check: [{ tipo: "lista", etiqueta: "Valores de a", valores: [1, -2] }, num("y (a = −2, x = 4) =", 4), num("Parámetros (a = 1) =", 2)],
      pistas: ["det(A) = (a − 1)²(a + 2)."],
      pasos: ["a = 1 y a = −2.", "a = −2: −2x + y + z = 0, x − 2y + z = 0, x + y − 2z = 0 → x = y = z: (λ, λ, λ). Con x = 4, y = 4.", "a = 1: las tres ecuaciones son x + y + z = 0 → rg(A) = 1 y 3 − 1 = 2 parámetros."],
      resultado: "a = 1, −2 · y = 4 · 2 parámetros" },
    { id: "d5", nivel: 3,
      enunciado: "Discute según m el sistema" + sis(["x + y + z = 1", "x + 2y + 3z = 2", "x + 3y + 5z = m"]) + "¿Para qué valor de m es compatible? Para ese valor, calcula x e y cuando z = 2.",
      check: [num("m =", 3), num("x (z = 2) =", 2), num("y (z = 2) =", -3)],
      pistas: ["det(A) = 0 siempre: rg(A) = 2. Compara rg(A|B)."],
      pasos: ["F₃ − 2F₂ + F₁ da (0, 0, 0 | m − 3): compatible solo si m = 3.", "m = 3: y + 2z = 1 → y = 1 − 2λ y x = 1 − y − z = λ. Con λ = 2: (2, −3, 2)."],
      resultado: "m = 3 · (λ, 1 − 2λ, λ) · (x, y) = (2, −3)" },
    { id: "d6", nivel: 3,
      enunciado: "Una persona reparte 10.000 € entre tres depósitos que rinden un 1 %, un 3 % y un 5 % anual, y cobra 300 € de intereses en un año. (a) Plantea el sistema y clasifícalo. (b) ¿Cuánto puede poner como máximo en el depósito del 5 % si ninguna cantidad es negativa? (c) Si en el del 3 % pone el doble que en el del 1 %, ¿cuánto pone en cada uno?",
      check: [op("Tipo", TIPOS, 1), num("Máximo en el 5 % =", 5000, "€"), num("En el 1 % =", 2500, "€"), num("En el 3 % =", 5000, "€"), num("En el 5 % =", 2500, "€")],
      pistas: ["x + y + z = 10000; x + 3y + 5z = 30000. Resta las ecuaciones."],
      pasos: ["Las dos ecuaciones son independientes pero hay 3 incógnitas: SCI con un parámetro. Restando: 2y + 4z = 20000 → y = 10000 − 2z, y x = z.", "Solución: (λ, 10000 − 2λ, λ). Con y ≥ 0: λ ≤ 5000.", "y = 2x: 10000 − 2λ = 2λ → λ = 2500 → (2500, 5000, 2500). Comprobación: 25 + 150 + 125 = 300 ✓."],
      resultado: "SCI · máximo 5.000 € · (2.500, 5.000, 2.500)" },
    { id: "d7", nivel: 3,
      enunciado: "Estudia, según el valor de m, la posición relativa de los planos x + 2y + z = 1, 2x + 4y + 2z = m y x − y = 0.",
      check: [num("Valor crítico de m =", 2), op("Para m = 2", ["Tres planos coincidentes", "Dos coincidentes y el tercero los corta en una recta", "Dos paralelos y un secante", "Prisma triangular"], 1), op("Para m ≠ 2", ["Dos coincidentes y el tercero secante", "Dos paralelos distintos y un tercero secante", "Haz de planos", "Se cortan en un punto"], 1)],
      pistas: ["Los dos primeros tienen normales proporcionales: ¿coinciden o son paralelos?"],
      pasos: ["Normales (1, 2, 1) y (2, 4, 2) proporcionales; el término independiente cumple la misma proporción si m = 2.", "m = 2: coincidentes; el tercero (normal (1, −1, 0)) los corta en una recta (rg(A) = rg(A|B) = 2).", "m ≠ 2: paralelos distintos; rg(A) = 2 y rg(A|B) = 3: SI."],
      resultado: "m = 2: dos coincidentes y uno secante · m ≠ 2: dos paralelos y uno secante" },
    { id: "d8", nivel: 3,
      enunciado: "Una tienda mezcla tres cafés de 6, 8 y 10 €/kg para obtener 100 kg que cuestan 8,2 €/kg, con la condición de que la cantidad del primero sea 20 kg mayor que la del tercero. ¿Existe tal mezcla?",
      check: op("Respuesta", ["No: el sistema es incompatible", "Sí, es única", "Sí, hay infinitas", "Solo con cantidades negativas"], 0),
      pistas: ["x + y + z = 100; 6x + 8y + 10z = 820; x − z = 20. Combina las dos primeras."],
      pasos: ["820 − 8·100 = 20 = −2x + 2z → x − z = −10, que contradice x − z = 20.", "rg(A) = 2, rg(A|B) = 3: SI. No existe la mezcla."],
      resultado: "No existe (SI)" },
    { id: "d9", nivel: 3,
      enunciado: "La suma de las edades de una madre y sus dos hijos es 60. Dentro de 10 años, la edad de la madre será la suma de las edades de los hijos. El mayor tiene 5 años más que el menor. ¿Qué edades tienen hoy?",
      check: [num("Madre =", 35, "años"), num("Hijo mayor =", 15, "años"), num("Hijo menor =", 10, "años")],
      pistas: ["Dentro de 10 años cada hijo tiene +10, así que: m + 10 = (a + 10) + (b + 10)."],
      pasos: ["m + a + b = 60; m − a − b = 10; a − b = 5.", "Sumando las dos primeras: 2m = 70 → m = 35; a + b = 25 y a − b = 5 → a = 15, b = 10.", "Comprobación: dentro de 10 años: 45 = 25 + 20 ✓."],
      resultado: "35, 15 y 10 años" },
    { id: "d10", nivel: 3,
      enunciado: "Para el sistema" + sis(["x + y + z = 3", "m·x + 2y + z = 4", "x + y + m·z = m + 2"]) + "calcula con la regla de Cramer la solución cuando m = 0. Da det(A), x, y y z.",
      check: [num("det(A) =", -2), num("x =", 0.5), num("y =", 1.5), num("z =", 1)],
      pistas: ["Sustituye m = 0 y calcula cuatro determinantes."],
      pasos: ["A = " + M([[1, 1, 1], [0, 2, 1], [1, 1, 0]]) + ", det(A) = −2.", "det(A_x) = −1, det(A_y) = −3, det(A_z) = −2.", "x = 1/2, y = 3/2, z = 1. Comprobación: 1/2 + 3/2 + 1 = 3 ✓; 3 + 1 = 4 ✓; 1/2 + 3/2 = 2 ✓."],
      resultado: "det(A) = −2 · (1/2, 3/2, 1)" },
    { id: "d11", nivel: 3,
      enunciado: "Se considera el sistema x + y = 2, 2x − y = 1, 3x + 2y = b. (a) ¿Para qué valor de b es compatible? ¿Qué solución tiene? (b) Si b = 6, ¿qué tipo es?",
      check: [num("b =", 5), num("x =", 1), num("y =", 1), op("Tipo para b = 6", TIPOS, 2)],
      pistas: ["Resuelve las dos primeras ecuaciones y exige que cumplan la tercera."],
      pasos: ["De las dos primeras: sumando, 3x = 3 → x = 1, y = 1.", "La 3.ª exige 3·1 + 2·1 = b → b = 5. Con b = 6 las dos primeras fijan (1, 1) y la tercera da 5 ≠ 6: rg(A) = 2, rg(A|B) = 3, SI."],
      resultado: "b = 5 · (1, 1) · b = 6: SI" },
    { id: "d12", nivel: 3,
      enunciado: "Los planos π₁: x + 2y + 3z = 4 y π₂: 2x + 4y + a·z = b. (a) ¿Para qué valor de a son paralelos o coincidentes? (b) Para ese a, ¿qué valor de b hace que coincidan?",
      check: [num("a =", 6), num("b =", 8)],
      pistas: ["Las normales (1, 2, 3) y (2, 4, a) deben ser proporcionales."],
      pasos: ["(2, 4, a) = 2·(1, 2, 3) → a = 6.", "Coinciden si el término independiente guarda la misma razón: b = 2·4 = 8. Si b ≠ 8, son paralelos distintos."],
      resultado: "a = 6 · b = 8" },
    { id: "d13", nivel: 3,
      enunciado: "En un triángulo, el ángulo mayor es la suma de los otros dos y el mediano supera en 10° al menor. Calcula los tres ángulos.",
      check: [num("Mayor =", 90, "°"), num("Mediano =", 50, "°"), num("Menor =", 40, "°")],
      pistas: ["A + B + C = 180; A = B + C; B = C + 10."],
      pasos: ["De A = B + C y A + B + C = 180: 2A = 180 → A = 90 y B + C = 90.", "B − C = 10 → B = 50 y C = 40."],
      resultado: "90°, 50° y 40°" }
  ];

  // ---------------------------------------------------------------- láminas
  var lamina = [
    { titulo: "Rouché-Frobenius", ancha: true,
      tabla: { cab: ["Rangos", "Tipo", "Soluciones"], filas: [
        ["rg(A) ≠ rg(A|B)", "SI", "ninguna"],
        ["rg(A) = rg(A|B) = n", "SCD", "una"],
        ["rg(A) = rg(A|B) < n", "SCI", "infinitas (n − rg(A) parámetros)"]
      ] },
      nota: "Menos ecuaciones que incógnitas: nunca SCD. Homogéneo: nunca SI." },
    { titulo: "Discutir con parámetro",
      pasos: ["Escribe A y (A|B) con m.", "det(A) = 0 → valores críticos (si A es cuadrada).", "Resto de valores: SCD.", "Cada crítico: rg(A) y rg(A|B) con números.", "m solo en B: orla el menor no nulo con B.", "Cierra con un resumen de casos."],
      nota: "Nunca dividas entre una expresión con m sin estudiar el caso en que vale 0." },
    { titulo: "Cramer y homogéneos",
      items: [
        { label: "Cramer", formula: "xᵢ = det(Aᵢ)/det(A)" },
        { label: "Aᵢ", formula: "A con la columna i cambiada por B" },
        { label: "Se aplica si", formula: "n ecuaciones, n incógnitas, det(A) ≠ 0" },
        { label: "Homogéneo cuadrado", formula: "no trivial ⇔ det(A) = 0" }
      ],
      nota: "Con un SCI: pasa las incógnitas libres al segundo miembro y aplica Cramer al subsistema." },
    { titulo: "Tres planos en el espacio", ancha: true,
      tabla: { cab: ["rg(A) / rg(A|B)", "Posición"], filas: [
        ["3 / 3", "un punto"],
        ["2 / 2", "una recta: haz, o dos coincidentes + secante"],
        ["2 / 3", "prisma, o dos paralelos + secante"],
        ["1 / 1", "tres coincidentes"],
        ["1 / 2", "paralelos, o dos coincidentes + paralelo"]
      ] },
      nota: "Paralelos: normales proporcionales. Coincidentes: también el término independiente." },
    { titulo: "Problemas con enunciado",
      pasos: ["Incógnitas con unidades.", "Una ecuación por cada dato.", "Forma matricial y clasificación.", "Resuelve (Gauss o Cramer).", "Comprueba en el texto.", "¿Tiene sentido? (positivos, enteros)."],
      nota: "SCI = faltan datos; SI = datos contradictorios." }
  ];

  B.registrar("mates2", "t3", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
