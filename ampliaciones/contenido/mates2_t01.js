/* ============================================================
   Matemáticas II · ampliaciones · Tema 1: Álgebra de matrices
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula, T = B.lab.mt;
  function w(n, ref) { return H.w(n, ref && "mates2/t1/" + ref); }
  function M(rows, sep) { return T.m(rows, sep); }
  function MT(rows) { return T.mt(rows); }
  // comprobación de una matriz entrada a entrada
  function mc(et, rows) {
    var out = [];
    rows.forEach(function (r, i) { r.forEach(function (v, j) { out.push({ tipo: "num", etiqueta: et + " (" + (i + 1) + "," + (j + 1) + ") =", valor: v }); }); });
    return out;
  }

  var resumen = [
    "Una matriz m×n tiene <b>m filas y n columnas</b> (primero filas). Se suman y restan solo matrices de la misma dimensión, elemento a elemento; k·A multiplica todos los elementos.",
    "<b>A·B</b> existe solo si columnas de A = filas de B; cada elemento es «fila de A por columna de B». Es asociativa y distributiva, pero <b>no conmutativa</b> (AB ≠ BA en general), y AB = O no obliga a A = O ni a B = O. Por eso (A+B)² = A² + AB + BA + B².",
    "<b>Potencias:</b> calcula A², A³, A⁴ hasta ver el patrón y demuéstralo por inducción. Casos que se repiten: diagonales, A = I + N con N nilpotente (binomio de Newton), periódicas (A² = I) e idempotentes (A² = A).",
    "<b>Traspuesta:</b> (A+B)ᵗ = Aᵗ+Bᵗ, (k·A)ᵗ = k·Aᵗ, <b>(A·B)ᵗ = Bᵗ·Aᵗ</b>. Simétrica: Aᵗ = A; antisimétrica: Aᵗ = −A (diagonal de ceros); ortogonal: AᵗA = I.",
    "<b>Inversa:</b> A⁻¹ existe solo si A es cuadrada y su rango es n (det ≠ 0). Gauss-Jordan: (A | I) → (I | A⁻¹). <b>(A·B)⁻¹ = B⁻¹·A⁻¹</b> (orden invertido). Si A² − 2A + I = O, entonces A⁻¹ = 2I − A.",
    "<b>Ecuaciones matriciales:</b> no se divide; se multiplica por la inversa <b>del lado donde está la X</b>: AX = B → X = A⁻¹B; XA = B → X = BA⁻¹. Con X en varios sumandos, factor común (respetando el lado) y después la inversa. Comprueba siempre sustituyendo.",
    "<b>Rango</b> = número de filas no nulas tras escalonar por Gauss (o de filas linealmente independientes). Con un parámetro, se escalona sin dividir entre expresiones que puedan valer 0 y se discuten los valores que anulan pivotes."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es una matriz
  secciones[0] =
    "<h5>Cuándo dos matrices son iguales</h5>" +
    "<p>Dos matrices A y B son <b>iguales</b> si tienen la <b>misma dimensión</b> y todos sus elementos coinciden posición a posición: aᵢⱼ = bᵢⱼ para todo i, j. Parece una obviedad, pero es una herramienta de examen muy potente: una igualdad de matrices equivale a <b>un sistema de ecuaciones</b>, una por cada posición. Si " + MT([["x", "2"], ["3", "y"]]) + " = " + M([[5, 2], [3, 7]]) + ", entonces x = 5 e y = 7.</p>" +
    "<h5>Matrices definidas por una fórmula</h5>" +
    "<p>Muchas veces la matriz no se da escrita, sino mediante una regla para aᵢⱼ. Para construirla se recorre la tabla fila a fila sustituyendo i y j.</p>" +
    ejemplo("Matriz 3×3 con aᵢⱼ = 2i − j", "Escribe la matriz A = (aᵢⱼ) de orden 3 con aᵢⱼ = 2i − j.", [
      "Fila 1 (i = 1): a₁₁ = 2 − 1 = 1; a₁₂ = 2 − 2 = 0; a₁₃ = 2 − 3 = −1.",
      "Fila 2 (i = 2): a₂₁ = 4 − 1 = 3; a₂₂ = 2; a₂₃ = 1.",
      "Fila 3 (i = 3): a₃₁ = 5; a₃₂ = 4; a₃₃ = 3.",
      "A = " + M([[1, 0, -1], [3, 2, 1], [5, 4, 3]]) + ". Fíjate en que la diagonal sale de i = j, es decir, aᵢᵢ = 2i − i = i: 1, 2, 3."
    ]) +
    "<h5>Para qué sirven: matrices como tablas de datos</h5>" +
    "<p>Una matriz es la forma ordenada de manejar muchos números a la vez: las ventas de cada producto en cada tienda, los costes por material, las rutas de un grafo. Lo que hace potente al álgebra de matrices es que las operaciones (sumar, multiplicar, invertir) tienen un <b>significado</b> en esos contextos; lo verás en el producto de la sección 4 y en el ejemplo de producción de la sección 12.</p>";

  // ---------------------------------------------------------------- 2. Tipos
  secciones[1] =
    "<h5>Más tipos que conviene reconocer (aparecen en las preguntas)</h5>" +
    tabla(["Tipo", "Condición", "Ejemplo"], [
      ["Triangular superior", "aᵢⱼ = 0 si i &gt; j (ceros por debajo de la diagonal)", M([[1, 2, 3], [0, 4, 5], [0, 0, 6]])],
      ["Triangular inferior", "aᵢⱼ = 0 si i &lt; j (ceros por encima)", M([[1, 0], [2, 3]])],
      ["Simétrica", "Aᵗ = A, es decir, aᵢⱼ = aⱼᵢ", M([[1, 2, 3], [2, 0, -1], [3, -1, 4]])],
      ["Antisimétrica", "Aᵗ = −A, es decir, aᵢⱼ = −aⱼᵢ (y por tanto aᵢᵢ = 0)", M([[0, 2, -3], [-2, 0, 1], [3, -1, 0]])],
      ["Idempotente", "A² = A", M([[2, -2], [1, -1]])],
      ["Involutiva", "A² = I", M([[0, 1], [1, 0]])],
      ["Nilpotente", "Aᵏ = O para algún k", M([[0, 1], [0, 0]])],
      ["Ortogonal", "Aᵗ·A = I (entonces A⁻¹ = Aᵗ)", M([["3/5", "-4/5"], ["4/5", "3/5"]])]
    ]) +
    ojo("Que una matriz sea antisimétrica obliga a que su diagonal principal sea de ceros (aᵢᵢ = −aᵢᵢ implica aᵢᵢ = 0). En cambio, una matriz con diagonal de ceros no tiene por qué ser antisimétrica.") +
    "<p>Las propiedades <b>A² = A</b>, <b>A² = I</b> y <b>Aᵏ = O</b> son las que dan juego en los ejercicios de potencias (sección 7): si A² = A, todas las potencias valen A; si A² = I, las potencias alternan entre A e I; si A es nilpotente, a partir de cierto exponente todo es la matriz nula.</p>";

  // ---------------------------------------------------------------- 3. Suma
  secciones[2] =
    "<h5>Despejar una matriz en una suma</h5>" +
    "<p>La suma y el producto por un número se manejan como en el álgebra de siempre: se puede sumar o restar el mismo término a los dos miembros y multiplicar por un número no nulo. Es el primer tipo de ecuación matricial que aparece, y no requiere inversas.</p>" +
    ejemplo("Despejar X en 3X + A = 2B", "Con A = " + M([[1, 2], [3, 4]]) + " y B = " + M([[2, 1], [3, 5]]) + ", halla X tal que 3X + A = 2B.", [
      "Paso A al otro miembro: 3X = 2B − A.",
      "2B = " + M([[4, 2], [6, 10]]) + "; 2B − A = " + M([[3, 0], [3, 6]]) + ".",
      "Divido entre 3 (multiplico por 1/3 todos los elementos): X = " + M([[1, 0], [1, 2]]) + ".",
      "Comprobación: 3X + A = " + M([[3, 0], [3, 6]]) + " + " + M([[1, 2], [3, 4]]) + " = " + M([[4, 2], [6, 10]]) + " = 2B. ✓"
    ]) +
    "<p>La resta A − B es A + (−B), y se cumple todo lo esperable: A + B = B + A, (A + B) + C = A + (B + C), k(A + B) = kA + kB y (k + l)A = kA + lA. Lo que <b>no</b> se puede hacer es dividir entre una matriz: eso se sustituye por multiplicar por su inversa (sección 10).</p>";

  // ---------------------------------------------------------------- 4. Producto
  secciones[3] =
    w("mm_producto") +
    "<h5>Cómo leer el producto: dimensiones primero</h5>" +
    "<p>Antes de calcular nada, mira las dimensiones y haz el «dominó»: A (m×<b>n</b>) por B (<b>p</b>×q) existe si n = p, y el resultado es m×q (se «cancelan» las dimensiones de en medio). Si A es 2×3 y B es 3×4, entonces A·B es 2×4 y B·A <b>no existe</b>. Si A es 3×2 y B es 2×3, existen A·B (3×3) y B·A (2×2), de distinto tamaño: es imposible que coincidan.</p>" +
    "<p>Cada elemento (A·B)ᵢⱼ es «fila i de A por columna j de B»: se multiplican los elementos uno a uno y se suma. Es el producto escalar de la fila por la columna. Pruébalo arriba: con las dimensiones 2×3 y 3×2 el resultado es 2×2, y con 3 columnas frente a 2 filas el simulador avisa de que no se puede multiplicar.</p>" +
    "<h5>Propiedades que sí se cumplen</h5>" +
    "<ul><li><b>Asociativa:</b> (A·B)·C = A·(B·C). Por eso se escribe ABC sin paréntesis (pero sin cambiar el orden).</li>" +
    "<li><b>Distributiva:</b> A·(B + C) = AB + AC y (A + B)·C = AC + BC. Ojo: se saca factor común <b>conservando el lado</b>.</li>" +
    "<li><b>Elemento neutro:</b> A·I = I·A = A (con la identidad del tamaño adecuado).</li>" +
    "<li><b>Escalares:</b> (kA)·B = A·(kB) = k(AB).</li></ul>" +
    "<h5>Lo que NO se cumple (el origen de casi todos los errores)</h5>" +
    "<ol><li><b>No es conmutativa:</b> en general AB ≠ BA, y a veces solo existe uno de los dos.</li>" +
    "<li><b>AB = O no implica A = O ni B = O.</b> Hay «divisores de cero».</li>" +
    "<li><b>No se puede simplificar:</b> AB = AC no implica B = C (salvo que A tenga inversa).</li></ol>" +
    ejemplo("AB = O con A ≠ O y B ≠ O, y PQ = PR con Q ≠ R", "Comprueba con A = " + M([[1, 1], [1, 1]]) + ", B = " + M([[1, -1], [-1, 1]]) + " que AB = O, y con P = " + M([[1, 0], [0, 0]]) + ", Q = " + M([[1, 2], [3, 4]]) + ", R = " + M([[1, 2], [5, 6]]) + " que PQ = PR aunque Q ≠ R.", [
      "A·B: cada elemento es 1·1 + 1·(−1) = 0 ó 1·(−1) + 1·1 = 0, así que AB = " + M([[0, 0], [0, 0]]) + ", pero ni A ni B son nulas.",
      "P·Q = " + M([[1, 2], [0, 0]]) + " y P·R = " + M([[1, 2], [0, 0]]) + ": son iguales, pero Q ≠ R. P solo «mira» la primera fila, y por eso no distingue Q de R: no se puede simplificar P."
    ]) +
    "<h5>Las identidades notables cambian</h5>" +
    "<p>Como AB ≠ BA, al desarrollar hay que conservar el orden:</p>" +
    formula("(A + B)² = A² + AB + BA + B²   ·   (A − B)(A + B) = A² + AB − BA − B²") +
    "<p>Solo se reducen a las de siempre, (A + B)² = A² + 2AB + B² y (A − B)(A + B) = A² − B², cuando <b>AB = BA</b> (se dice que A y B <b>conmutan</b>).</p>" +
    ejemplo("(A + B)² frente a A² + 2AB + B²", "Con A = " + M([[1, 1], [0, 1]]) + " y B = " + M([[1, 0], [1, 1]]) + ", calcula (A + B)² y compáralo con A² + 2AB + B².", [
      "A + B = " + M([[2, 1], [1, 2]]) + ", luego (A + B)² = " + M([[5, 4], [4, 5]]) + ".",
      "A² = " + M([[1, 2], [0, 1]]) + ", B² = " + M([[1, 0], [2, 1]]) + ", AB = " + M([[2, 1], [1, 1]]) + " y BA = " + M([[1, 1], [1, 2]]) + ".",
      "A² + 2AB + B² = " + M([[6, 4], [4, 4]]) + " ≠ (A + B)². En cambio A² + AB + BA + B² = " + M([[5, 4], [4, 5]]) + ", que sí coincide."
    ]) +
    "<h5>Matrices que conmutan con una dada</h5>" +
    "<p>Pregunta clásica: «halla todas las matrices X que conmutan con A». Se escribe X con letras, se imponen AX = XA y se resuelve el sistema que sale de comparar posiciones.</p>" +
    ejemplo("Matrices que conmutan con A = [[0,1],[0,0]]", "Halla las matrices X = [[a, b], [c, d]] tales que AX = XA.", [
      "A·X = " + MT([["c", "d"], ["0", "0"]]) + " (la primera fila de AX es la segunda de X) y X·A = " + MT([["0", "a"], ["0", "c"]]) + ".",
      "Igualando posición a posición: c = 0; d = a; 0 = 0; 0 = c.",
      "Luego X = " + MT([["a", "b"], ["0", "a"]]) + " con a y b cualesquiera: infinitas matrices, con dos parámetros libres."
    ]) +
    "<h5>El producto en contexto</h5>" +
    "<p>Si A es «producto × ingrediente» y c es «coste por ingrediente», entonces A·c es «coste por producto». Para encadenar tablas se multiplican en orden y el sentido lo marcan las dimensiones. Verás un ejemplo completo en la sección 12.</p>";

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Potencias de una matriz: busca el patrón y demuéstralo",
      html:
        "<p>Solo las matrices <b>cuadradas</b> se pueden elevar a un exponente: Aⁿ = A·A·…·A (n factores) y A⁰ = I. Valen Aᵐ·Aⁿ = Aᵐ⁺ⁿ y (Aᵐ)ⁿ = Aᵐⁿ. Pero cuidado: <b>(A·B)ⁿ ≠ Aⁿ·Bⁿ</b> en general, porque para reordenar los factores haría falta que AB = BA.</p>" +
        w("mm_potencias") +
        "<h5>El método de siempre en la EvAU</h5>" +
        "<ol><li><b>Calcula</b> A², A³ y, si hace falta, A⁴ a mano. No te saltes este paso: el patrón sale de los números.</li>" +
        "<li><b>Conjetura</b> la fórmula de Aⁿ (o el periodo, o el exponente a partir del cual se anula).</li>" +
        "<li><b>Demuéstrala por inducción</b> si te piden «demostrar» o «probar»: caso base n = 1, hipótesis para n, y paso Aⁿ⁺¹ = Aⁿ·A.</li></ol>" +
        ejemplo("Patrón por inducción", "Sea A = " + M([[1, 1], [0, 1]]) + ". Halla Aⁿ y demuéstralo.", [
          "A² = " + M([[1, 2], [0, 1]]) + ", A³ = A²·A = " + M([[1, 3], [0, 1]]) + ". Conjetura: Aⁿ = " + MT([["1", "n"], ["0", "1"]]) + ".",
          "Caso base: n = 1 da A. ✓",
          "Hipótesis: Aⁿ = " + MT([["1", "n"], ["0", "1"]]) + ". Paso: Aⁿ⁺¹ = Aⁿ·A = " + MT([["1", "n"], ["0", "1"]]) + "·" + M([[1, 1], [0, 1]]) + " = " + MT([["1", "n+1"], ["0", "1"]]) + ", que es la fórmula con n + 1. ∎"
        ]) +
        "<h5>Cuatro situaciones que se repiten</h5>" +
        "<p><b>1. Diagonal.</b> Se eleva cada elemento de la diagonal: diag(a, b)ⁿ = diag(aⁿ, bⁿ).</p>" +
        "<p><b>2. Nilpotente.</b> Si Aᵏ = O, todas las potencias desde k son O. Una matriz triangular con ceros en la diagonal de orden 3 cumple siempre A³ = O.</p>" +
        ejemplo("Una nilpotente de orden 3", "Calcula las potencias de A = " + M([[0, 1, 0], [0, 0, 1], [0, 0, 0]]) + ".", [
          "A² = " + M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) + " (el 1 de la diagonal superior «sube» un lugar).",
          "A³ = A²·A = " + M([[0, 0, 0], [0, 0, 0], [0, 0, 0]]) + ". Luego Aⁿ = O para todo n ≥ 3."
        ]) +
        "<p><b>3. Identidad más nilpotente: A = I + N.</b> I y N conmutan (I conmuta con todo), así que se puede usar el <b>binomio de Newton</b>: Aⁿ = (I + N)ⁿ = I + n·N + C(n,2)·N² + … y, como N se anula pronto, la suma tiene pocos términos. Es el truco que resuelve las matrices triangulares con unos en la diagonal.</p>" +
        ejemplo("Binomio de Newton con N nilpotente", "Halla Aⁿ para A = " + M([[1, 2, 3], [0, 1, 2], [0, 0, 1]]) + ".", [
          "Escribo A = I + N con N = " + M([[0, 2, 3], [0, 0, 2], [0, 0, 0]]) + ".",
          "N² = " + M([[0, 0, 4], [0, 0, 0], [0, 0, 0]]) + " y N³ = O.",
          "Binomio: Aⁿ = I + nN + C(n,2)·N² (los demás términos son O).",
          "Entradas: a₁₂ = 2n, a₂₃ = 2n y a₁₃ = 3n + 4·n(n−1)/2 = 2n² + n. Comprobación con n = 2: a₁₃ = 3·1 + 2·2 + 1·3 = 10 = 2·4 + 2. ✓",
          "Aⁿ = " + MT([["1", "2n", "2n²+n"], ["0", "1", "2n"], ["0", "0", "1"]]) + "."
        ]) +
        "<p><b>4. Periódicas e idempotentes.</b> Si A² = I, las potencias alternan: A, I, A, I… Si A² = A, entonces Aⁿ = A para todo n ≥ 1. A veces el patrón es «con signo»: si A² = −A, entonces Aⁿ = (−1)ⁿ⁻¹·A.</p>" +
        ejemplo("Periodo 4 y A² = −A", "(a) Calcula A²⁰²³ para A = " + M([[0, -1], [1, 0]]) + ". (b) Halla Bⁿ para B = " + M([[1, 2], [-1, -2]]) + ".", [
          "(a) A² = " + M([[-1, 0], [0, -1]]) + " = −I, así que A⁴ = (−I)² = I: el periodo es 4. Como 2023 = 4·505 + 3, A²⁰²³ = A³ = A²·A = −A = " + M([[0, 1], [-1, 0]]) + ".",
          "(b) B² = " + M([[-1, -2], [1, 2]]) + " = −B. Entonces B³ = B²·B = −B² = B, B⁴ = −B…: Bⁿ = (−1)ⁿ⁻¹·B."
        ]) +
        ojo("Para el periodo, mira el <b>resto</b> de dividir el exponente entre el periodo (2023 entre 4 da resto 3, no 0), y recuerda que el exponente 0 corresponde a la identidad I, no a A.") +
        "<p>Con A = " + M([[1, 1], [1, 0]]) + " las potencias generan los <b>números de Fibonacci</b>: Aⁿ = [[Fₙ₊₁, Fₙ], [Fₙ, Fₙ₋₁]] (puedes verlo en el simulador). Es un buen ejemplo de que una potencia no siempre tiene una fórmula «bonita» en n.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. La traspuesta: propiedades y matrices con simetría",
      html:
        "<p>La traspuesta Aᵗ cambia filas por columnas. Se comporta bien con la suma y el producto por números, y <b>da la vuelta</b> al producto:</p>" +
        formula("(Aᵗ)ᵗ = A  ·  (A + B)ᵗ = Aᵗ + Bᵗ  ·  (k·A)ᵗ = k·Aᵗ  ·  (A·B)ᵗ = Bᵗ·Aᵗ") +
        ejemplo("(AB)ᵗ = BᵗAᵗ, y no AᵗBᵗ", "Con A = " + M([[1, 2], [0, 3]]) + " y B = " + M([[4, 0], [1, 5]]) + ", comprueba que (AB)ᵗ = BᵗAᵗ.", [
          "AB = " + M([[6, 10], [3, 15]]) + ", luego (AB)ᵗ = " + M([[6, 3], [10, 15]]) + ".",
          "Bᵗ·Aᵗ = " + M([[4, 1], [0, 5]]) + "·" + M([[1, 0], [2, 3]]) + " = " + M([[6, 3], [10, 15]]) + ". ✓",
          "En cambio Aᵗ·Bᵗ = " + M([[4, 1], [8, 17]]) + ", que es distinta: el orden cambia al trasponer."
        ]) +
        "<p>La regla se extiende: (ABC)ᵗ = CᵗBᵗAᵗ. Es la misma idea que «los calcetines y los zapatos»: se quitan en orden inverso al que se pusieron, y volverá a aparecer con la inversa.</p>" +
        "<h5>Simétricas y antisimétricas se fabrican</h5>" +
        "<p>Para cualquier matriz cuadrada A (y esto se pregunta mucho):</p>" +
        "<ul><li><b>A + Aᵗ es simétrica</b>, porque (A + Aᵗ)ᵗ = Aᵗ + A.</li>" +
        "<li><b>A − Aᵗ es antisimétrica</b>, porque (A − Aᵗ)ᵗ = Aᵗ − A = −(A − Aᵗ).</li>" +
        "<li><b>A·Aᵗ y Aᵗ·A son simétricas</b>, porque (A·Aᵗ)ᵗ = (Aᵗ)ᵗ·Aᵗ = A·Aᵗ. (A no tiene que ser cuadrada: A·Aᵗ es m×m y Aᵗ·A es n×n.)</li></ul>" +
        "<p>Y toda matriz cuadrada se descompone de forma única en parte simétrica más parte antisimétrica:</p>" +
        formula("A = S + K  con  S = (A + Aᵗ)/2  (simétrica)  y  K = (A − Aᵗ)/2  (antisimétrica)") +
        ejemplo("Descomponer en simétrica + antisimétrica", "Descompón A = " + M([[1, 4], [2, 3]]) + ".", [
          "Aᵗ = " + M([[1, 2], [4, 3]]) + ".",
          "S = (A + Aᵗ)/2 = " + M([[1, 3], [3, 3]]) + " (simétrica).",
          "K = (A − Aᵗ)/2 = " + M([[0, 1], [-1, 0]]) + " (antisimétrica).",
          "Comprobación: S + K = " + M([[1, 4], [2, 3]]) + " = A. ✓"
        ]) +
        "<h5>Ortogonales: la traspuesta hace de inversa</h5>" +
        "<p>Una matriz Q es <b>ortogonal</b> si Qᵗ·Q = I, y entonces Q⁻¹ = Qᵗ (invertir es tan fácil como trasponer). Ejemplos típicos son los giros: Q = " + M([["3/5", "-4/5"], ["4/5", "3/5"]]) + " cumple QᵗQ = I porque (3/5)² + (4/5)² = 1 y −12/25 + 12/25 = 0. Las columnas de una ortogonal son vectores de módulo 1 y perpendiculares entre sí (lo verás en el tema de producto escalar).</p>" +
        ojo("«Simétrica» y «ortogonal» no son lo mismo: la identidad es ambas, pero " + M([[1, 2], [2, 1]]) + " es simétrica y no es ortogonal (sus columnas no tienen módulo 1).")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. La matriz inversa con Gauss-Jordan, paso a paso",
      html:
        "<p>La inversa de una matriz cuadrada A de orden n es la matriz A⁻¹ (si existe) con <b>A·A⁻¹ = A⁻¹·A = I</b>. Es única. Si existe, A es <b>invertible</b> (o regular); si no, es <b>singular</b>. Hay tres formas equivalentes de decir que A es invertible: A⁻¹ existe, det A ≠ 0 y rango A = n.</p>" +
        w("mm_gauss") +
        "<h5>Método de Gauss-Jordan</h5>" +
        "<p>Se escribe (A | I) y, con operaciones elementales entre filas (cambiar dos filas, multiplicar una fila por un número ≠ 0, sumar a una fila un múltiplo de otra), se transforma la parte izquierda en I. La parte derecha se convierte, a la vez, en A⁻¹. Un orden cómodo es trabajar <b>columna por columna</b>: poner el pivote 1, y hacer ceros en <b>toda</b> la columna (arriba y abajo).</p>" +
        ejemplo("Inversa 3×3 por Gauss-Jordan", "Calcula la inversa de A = " + M([[1, 2, 3], [0, 1, 4], [1, 0, 6]]) + ".", [
          "(A | I) = " + M([[1, 2, 3, 1, 0, 0], [0, 1, 4, 0, 1, 0], [1, 0, 6, 0, 0, 1]], 3) + " (las tres últimas columnas son I).",
          "F₃ ← F₃ − F₁: " + M([[1, 2, 3, 1, 0, 0], [0, 1, 4, 0, 1, 0], [0, -2, 3, -1, 0, 1]], 3) + ".",
          "F₁ ← F₁ − 2·F₂ y F₃ ← F₃ + 2·F₂: " + M([[1, 0, -5, 1, -2, 0], [0, 1, 4, 0, 1, 0], [0, 0, 11, -1, 2, 1]], 3) + ".",
          "F₃ ← F₃ ÷ 11: la última fila es (0, 0, 1 | −1/11, 2/11, 1/11).",
          "F₁ ← F₁ + 5·F₃ y F₂ ← F₂ − 4·F₃: " + M([[1, 0, 0, "6/11", "-12/11", "5/11"], [0, 1, 0, "4/11", "3/11", "-4/11"], [0, 0, 1, "-1/11", "2/11", "1/11"]], 3) + ".",
          "A⁻¹ = (1/11)·" + M([[6, -12, 5], [4, 3, -4], [-1, 2, 1]]) + ". El 11 que aparece es det A = 11 (lo calcularás directamente en el tema 2).",
          "Comprobación (obligatoria): fila 1 de A por columna 1 de A⁻¹ = (6 + 8 − 3)/11 = 1, y fila 1 de A por columna 2 = (−12 + 6 + 6)/11 = 0. ✓ Sigue igual con el resto para confirmar que A·A⁻¹ = I."
        ]) +
        "<h5>Cuándo no existe: la fila de ceros</h5>" +
        "<p>Si al escalonar aparece una <b>fila de ceros a la izquierda</b>, el método se detiene: A no tiene inversa. Por ejemplo, con A = " + M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) + ": F₂ ← F₂ − 4F₁ da (0, −3, −6); F₃ ← F₃ − 7F₁ da (0, −6, −12); y F₃ ← F₃ − 2F₂ da (0, 0, 0). El rango es 2 &lt; 3: A es singular. (Pruébalo en el simulador con la opción «3×3 sin inversa».)</p>" +
        "<h5>El atajo para 2×2 (y cuándo conviene)</h5>" +
        formula("A = " + MT([["a", "b"], ["c", "d"]]) + "  ⟹  A⁻¹ = " + H.fr("1", "ad − bc") + " · " + MT([["d", "-b"], ["-c", "a"]])) +
        ejemplo("Inversa 2×2 con el atajo", "Calcula A⁻¹ para A = " + M([[3, 5], [1, 2]]) + ".", [
          "ad − bc = 3·2 − 5·1 = 1 ≠ 0, así que existe.",
          "Intercambio los de la diagonal (3 y 2), cambio de signo los otros (5 y 1) y divido entre 1: A⁻¹ = " + M([[2, -5], [-1, 3]]) + ".",
          "Comprobación: A·A⁻¹ = " + M([[1, 0], [0, 1]]) + " = I. ✓"
        ]) +
        "<h5>Propiedades de la inversa</h5>" +
        formula("(A⁻¹)⁻¹ = A  ·  (Aᵗ)⁻¹ = (A⁻¹)ᵗ  ·  (k·A)⁻¹ = (1/k)·A⁻¹  ·  (A·B)⁻¹ = B⁻¹·A⁻¹") +
        ejemplo("(AB)⁻¹ = B⁻¹A⁻¹", "Con A = " + M([[1, 1], [0, 1]]) + " y B = " + M([[2, 1], [1, 1]]) + ", comprueba la regla del orden.", [
          "AB = " + M([[3, 2], [1, 1]]) + " tiene determinante 3 − 2 = 1, luego (AB)⁻¹ = " + M([[1, -2], [-1, 3]]) + ".",
          "A⁻¹ = " + M([[1, -1], [0, 1]]) + " y B⁻¹ = " + M([[1, -1], [-1, 2]]) + ". Entonces B⁻¹·A⁻¹ = " + M([[1, -2], [-1, 3]]) + ". ✓",
          "En cambio A⁻¹·B⁻¹ = " + M([[2, -3], [-1, 2]]) + " no es la inversa de AB."
        ]) +
        ojo("<b>(A + B)⁻¹ ≠ A⁻¹ + B⁻¹.</b> No hay ninguna regla simple para la inversa de una suma: no la inventes. Tampoco existe «1/A»: la expresión A⁻¹ nunca se escribe como fracción con matrices.") +
        "<h5>Calcular A⁻¹ sin Gauss: a partir de una ecuación que cumple A</h5>" +
        "<p>Si te dan una igualdad como A² − 2A + I = O, puedes <b>despejar la identidad</b> y sacar A factor común: I = 2A − A² = A·(2I − A). Como A·(2I − A) = I, la inversa es A⁻¹ = 2I − A. Cuidado de no escribir 2 − A (un número menos una matriz no existe: hay que escribir 2I).</p>" +
        ejemplo("Inversa a partir de un polinomio", "Se sabe que A² − 2A + I = O. Demuestra que A es invertible y calcula A⁻¹ para A = " + M([[1, 2], [0, 1]]) + ".", [
          "De A² − 2A + I = O: I = 2A − A² = A·(2I − A) (y también (2I − A)·A, porque A conmuta con I y consigo misma).",
          "Por tanto A es invertible y A⁻¹ = 2I − A.",
          "Con A = " + M([[1, 2], [0, 1]]) + ": 2I − A = " + M([[1, -2], [0, 1]]) + ". Comprobación: A·(2I − A) = " + M([[1, 0], [0, 1]]) + ". ✓"
        ]) +
        "<h5>Inversa con un parámetro</h5>" +
        "<p>Si la matriz depende de un parámetro, lo primero es saber <b>para qué valores existe la inversa</b>: los que dejan el rango máximo (o det ≠ 0). Con A = " + MT([["1", "a"], ["2", "4"]]) + ", ad − bc = 4 − 2a, así que existe si y solo si a ≠ 2. Para a = 1, ad − bc = 2 y A⁻¹ = " + M([[2, "-1/2"], [-1, "1/2"]]) + ".</p>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Ecuaciones matriciales: despejar sin dividir",
      html:
        "<p>Despejar X en una ecuación con matrices sigue tres reglas, y las tres nacen de que el producto <b>no conmuta</b>:</p>" +
        "<ol><li><b>Los sumandos que no llevan X</b> se pasan al otro miembro (sumando o restando: eso sí se puede).</li>" +
        "<li>Si X aparece en varios sumandos, se saca <b>factor común</b> conservando el lado: AX + X = (A + I)X (con I, no con 1) y XA − X = X(A − I).</li>" +
        "<li>Para quitar una matriz P que multiplica a X, se multiplica <b>los dos miembros por P⁻¹ por el mismo lado en que está P</b>: si PX = Q, entonces X = P⁻¹Q; si XP = Q, entonces X = QP⁻¹. Y se necesita que P sea invertible.</li></ol>" +
        w("mm_ecuacion") +
        tabla(["Ecuación", "Solución", "Por qué"], [
          ["A·X = B", "X = A⁻¹·B", "A⁻¹ por la izquierda en ambos miembros"],
          ["X·A = B", "X = B·A⁻¹", "A⁻¹ por la derecha en ambos miembros"],
          ["A·X·B = C", "X = A⁻¹·C·B⁻¹", "A⁻¹ a la izquierda y B⁻¹ a la derecha"],
          ["A·X + B = C", "X = A⁻¹·(C − B)", "primero pasar B, luego A⁻¹ a la izquierda del paréntesis"],
          ["A·X + X = B", "X = (A + I)⁻¹·B", "factor común X a la derecha: (A + I)X"],
          ["X·A = X + B", "X = B·(A − I)⁻¹", "X·(A − I) = B, y (A − I)⁻¹ por la derecha"],
          ["A·X·A⁻¹ = B", "X = A⁻¹·B·A", "A⁻¹ a la izquierda y A a la derecha"]
        ]) +
        ejemplo("AX = B y XA = B con las mismas matrices", "Sean A = " + M([[2, 1], [5, 3]]) + " y B = " + M([[1, 0], [2, 1]]) + ". Resuelve A·X = B y X·A = B.", [
          "|A| = 2·3 − 1·5 = 1, luego A⁻¹ = " + M([[3, -1], [-5, 2]]) + ".",
          "A·X = B: X = A⁻¹·B = " + M([[1, -1], [-1, 2]]) + ".",
          "X·A = B: X = B·A⁻¹ = " + M([[3, -1], [1, 0]]) + ". Son matrices distintas, aunque A y B son las mismas: el lado importa.",
          "Comprobaciones: A·" + M([[1, -1], [-1, 2]]) + " = " + M([[1, 0], [2, 1]]) + " y " + M([[3, -1], [1, 0]]) + "·A = " + M([[1, 0], [2, 1]]) + ". ✓"
        ]) +
        ejemplo("Un sumando sin X", "Resuelve A·X + B = C con A = " + M([[1, 2], [0, 1]]) + ", B = " + M([[1, 0], [1, 1]]) + ", C = " + M([[3, 1], [2, 3]]) + ".", [
          "Paso B: A·X = C − B = " + M([[2, 1], [1, 2]]) + ".",
          "A⁻¹ = " + M([[1, -2], [0, 1]]) + ", y se multiplica por la izquierda: X = A⁻¹·(C − B) = " + M([[0, -3], [1, 2]]) + ".",
          "Comprobación: A·X + B = " + M([[2, 1], [1, 2]]) + " + " + M([[1, 0], [1, 1]]) + " = C. ✓"
        ]) +
        ejemplo("X en dos sumandos: factor común", "Resuelve A·X + X = 4I con A = " + M([[1, 2], [3, 4]]) + ".", [
          "Saco X factor común por la derecha: (A + I)·X = 4I.",
          "A + I = " + M([[2, 2], [3, 5]]) + " tiene determinante 10 − 6 = 4, y su inversa es (1/4)·" + M([[5, -2], [-3, 2]]) + ".",
          "X = (A + I)⁻¹·4I = " + M([[5, -2], [-3, 2]]) + ".",
          "Comprobación: (A + I)·X = " + M([[4, 0], [0, 4]]) + " = 4I. ✓"
        ]) +
        ejemplo("Sistema de ecuaciones matriciales", "Halla X e Y que cumplen 2X + Y = A y X − Y = B, con A = " + M([[3, 3], [0, 6]]) + " y B = " + M([[0, 3], [3, 0]]) + ".", [
          "Se resuelve como un sistema de dos ecuaciones: sumando, 3X = A + B = " + M([[3, 6], [3, 6]]) + ", luego X = " + M([[1, 2], [1, 2]]) + ".",
          "De la segunda: Y = X − B = " + M([[1, -1], [-2, 2]]) + ".",
          "Comprobación en la primera: 2X + Y = " + M([[3, 3], [0, 6]]) + " = A. ✓"
        ]) +
        "<h5>Los tres errores que más puntos cuestan</h5>" +
        "<ul><li><b>Multiplicar por el lado equivocado.</b> De A·X = B no sale X = B·A⁻¹. Prueba: A·(B·A⁻¹) no es B en general.</li>" +
        "<li><b>Factor común sin lado ni identidad.</b> A·X + X no es (A + 1)·X: el 1 no es una matriz; es (A + I)·X.</li>" +
        "<li><b>Invertir lo que no es invertible.</b> Antes de escribir A⁻¹ comprueba que det A ≠ 0 (o que el rango es n). Si no, la ecuación no se despeja así.</li></ul>" +
        "<p>Y la comprobación final es gratis: sustituye X en la ecuación <b>original</b> y verifica la igualdad. El simulador de arriba lo hace por ti, con colores.</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Rango de una matriz y discusión según un parámetro",
      html:
        "<p>El <b>rango</b> de una matriz es el número máximo de filas (o de columnas, da lo mismo) <b>linealmente independientes</b>: filas que no se pueden obtener como combinación de las demás. Se escribe rg(A) y cumple 0 ≤ rg(A) ≤ mín(m, n), rg(A) = rg(Aᵗ), y rg(A) = 0 solo para la matriz nula.</p>" +
        "<h5>Cálculo por Gauss</h5>" +
        "<p>Se escalona la matriz con operaciones elementales (cambiar filas, multiplicar una fila por un número ≠ 0, sumar a una fila un múltiplo de otra), que <b>no cambian el rango</b>. El rango es el número de <b>filas no nulas</b> de la matriz escalonada resultante.</p>" +
        ejemplo("Rango de una 3×3 con dependencias", "Halla el rango de " + M([[1, 2, 3], [2, 4, 6], [1, 0, 1]]) + ".", [
          "F₂ ← F₂ − 2F₁ da (0, 0, 0): la fila 2 es el doble de la fila 1. F₃ ← F₃ − F₁ da (0, −2, −2).",
          "Quedan dos filas no nulas, (1, 2, 3) y (0, −2, −2): rg = 2. La matriz no es invertible."
        ]) +
        ejemplo("Rango de una 3×4", "Halla el rango de " + M([[1, 2, 0, 1], [2, 1, 3, 0], [3, 3, 3, 1]]) + ".", [
          "Observo que F₃ = F₁ + F₂. Con Gauss: F₂ ← F₂ − 2F₁ = (0, −3, 3, −2); F₃ ← F₃ − 3F₁ = (0, −3, 3, −2).",
          "F₃ ← F₃ − F₂ = (0, 0, 0, 0). Quedan 2 filas no nulas: rg = 2."
        ]) +
        w("mm_rango") +
        "<h5>Discutir el rango según un parámetro</h5>" +
        "<p>Es la pregunta estrella: «discute el rango de A según los valores de a». El método:</p>" +
        "<ol><li>Escalona <b>sin dividir</b> entre expresiones que contengan a (puede valer 0): usa operaciones del tipo F₂ ← F₂ − (algo)·F₁ con pivotes que sean números.</li>" +
        "<li>Mira los pivotes que quedan: son expresiones en a. Los valores de a que los anulan son los <b>valores críticos</b>.</li>" +
        "<li>Para cada valor crítico, <b>sustituye en la matriz</b> y calcula el rango a mano. Para los demás valores, el rango es el máximo.</li></ol>" +
        ejemplo("Discusión con un parámetro (3×3)", "Discute el rango de M = " + MT([["1", "1", "a"], ["1", "a", "1"], ["a", "1", "1"]]) + " según a.", [
          "F₂ ← F₂ − F₁ y F₃ ← F₃ − a·F₁: filas (1, 1, a), (0, a−1, 1−a) y (0, 1−a, 1−a²).",
          "F₃ ← F₃ + F₂: la tercera fila queda (0, 0, (1−a²) + (1−a)) = (0, 0, (1−a)(a+2)).",
          "Pivotes: 1, a−1 y (1−a)(a+2). Se anulan en a = 1 (el 2.º y el 3.º) y en a = −2 (el 3.º).",
          "Si a ≠ 1 y a ≠ −2: tres pivotes, rg = 3.",
          "Si a = 1: M = " + M([[1, 1, 1], [1, 1, 1], [1, 1, 1]]) + ", todas las filas iguales: rg = 1.",
          "Si a = −2: la fila 3 se anula y quedan (1, 1, −2) y (0, −3, 3), independientes: rg = 2."
        ]) +
        ejemplo("Discusión con un parámetro (2×3)", "Discute el rango de N = " + MT([["1", "a", "2"], ["a", "4", "2a"]]) + " según a.", [
          "F₂ ← F₂ − a·F₁ da (0, 4 − a², 2a − 2a) = (0, 4 − a², 0).",
          "Si 4 − a² ≠ 0, es decir, a ≠ 2 y a ≠ −2: dos filas no nulas, rg = 2.",
          "Si a = 2 ó a = −2: la segunda fila es (0, 0, 0) y solo queda la primera: rg = 1."
        ]) +
        "<p><b>Conexión con otros temas.</b> Una matriz cuadrada tiene rg = n si y solo si su determinante es distinto de 0 (tema 2: allí el rango también se calcula con menores). Y el rango de la matriz de coeficientes y el de la ampliada deciden si un sistema tiene solución (teorema de Rouché-Frobenius, tema 3). Por eso esta sección es la base de dos temas siguientes.</p>" +
        ojo("Un error típico: dividir una fila entre (a − 1) «para poner un 1». Si a vale 1 esa operación no existe y el caso queda sin estudiar. Mejor deja el pivote como está y estudia aparte los valores que lo anulan.")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Matrices en problemas con contexto",
      html:
        "<p>En los problemas «de enunciado» no te piden operar con matrices abstractas: te dan una situación, tú organizas los datos en matrices y el producto hace el cálculo. La clave es etiquetar filas y columnas para saber si el producto tiene sentido.</p>" +
        ejemplo("Dos tablas encadenadas", "Un taller fabrica dos productos, P₁ y P₂. P₁ usa 2 unidades del ingrediente I₁ y 1 de I₂; P₂ usa 1 de cada uno de I₁, I₂ e I₃. Los ingredientes cuestan 3, 5 y 2 euros por unidad. Se piden 100 unidades de P₁ y 50 de P₂. ¿Cuánto cuesta el pedido?", [
          "Matriz de composición (productos × ingredientes): A = " + M([[2, 1, 0], [1, 1, 1]]) + ". Vector de costes (ingredientes × 1): c = " + M([[3], [5], [2]]) + ".",
          "Coste de cada producto: A·c = " + M([[11], [10]]) + " (2·3 + 1·5 + 0·2 = 11 y 3 + 5 + 2 = 10).",
          "Pedido (1 × productos): p = (100, 50). Coste total: p·(A·c) = 100·11 + 50·10 = 1600 euros.",
          "Por asociatividad se puede hacer en otro orden: p·A = (250, 150, 50) son las unidades de cada ingrediente, y (p·A)·c = 750 + 750 + 100 = 1600. Mismo resultado, con una información distinta por el camino."
        ]) +
        ejemplo("Potencias y caminos en un grafo", "En una red de tres nodos hay un enlace de 1 a 2, de 1 a 3, de 2 a 1, de 2 a 3 y de 3 a 2. Su matriz de adyacencia es A = " + M([[0, 1, 1], [1, 0, 1], [0, 1, 0]]) + ". ¿Cuántos caminos de longitud 2 hay del nodo 2 a sí mismo?", [
          "El elemento aᵢⱼ de Aⁿ cuenta los caminos de longitud n que van de i a j.",
          "A² = " + M([[1, 1, 1], [0, 2, 1], [1, 0, 1]]) + ".",
          "El elemento (2,2) vale 2: los caminos 2→1→2 y 2→3→2."
        ])
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. Cómo se pregunta en la EvAU de Madrid y cómo se contesta",
      html:
        "<p>Las matrices se preguntan dentro del bloque de Álgebra (junto con determinantes y sistemas), y los enunciados se repiten por familias:</p>" +
        tabla(["Qué piden", "Qué hacer", "Dónde se pierden puntos"], [
          ["Calcular Aⁿ", "A², A³, A⁴ → patrón → inducción", "no calcular los primeros casos; no demostrar"],
          ["Resolver AX = B (o XA = B)", "det A ≠ 0 → A⁻¹ → lado correcto", "lado equivocado; no justificar que A⁻¹ existe"],
          ["Discutir rango / invertibilidad según a", "Gauss sin dividir; valores críticos; casos aparte", "dividir entre a − 1; olvidar un valor crítico"],
          ["Matrices que cumplen una condición", "plantear X con letras y comparar posición a posición", "no resolver el sistema entero; quedarse en una solución"],
          ["Demostrar una propiedad", "partir de las propiedades (traspuesta, inversa, producto)", "usar AB = BA o (A+B)⁻¹ = A⁻¹ + B⁻¹ sin justificar"],
          ["Inversa por Gauss-Jordan", "(A | I) con operaciones indicadas en cada paso", "errores aritméticos sin comprobar A·A⁻¹ = I"]
        ]) +
        "<p>Reglas para redactar bien: <b>nombra cada operación</b> entre filas (F₂ ← F₂ − 3F₁); <b>comprueba siempre</b> el resultado (A·A⁻¹ = I, o sustituir X en la ecuación); y cuando uses una hipótesis (A invertible, A y B conmutan), <b>dilo explícitamente</b>.</p>"
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 15
    {
      h: "15. Autocomprobación",
      html:
        "<p>Test de doce preguntas, tarjetas con lo esencial, un juego para unir cada ecuación con su solución, otro para clasificar matrices y un ejercicio de ordenar los pasos de Gauss-Jordan.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "ecuaciones") + w("clasificar", "tipos") + w("orden", "gauss")
    }
  ];

  // ---------------------------------------------------------------- datos de actividades
  var datos = {
    errores: {
      titulo: "¿Qué falla aquí?",
      preguntas: [
        { q: "Un alumno razona: «A·B = A·C, así que, simplificando A, B = C».",
          op: ["Está bien: se simplifica el factor común", "No se puede simplificar una matriz: solo si A tiene inversa se multiplica por A⁻¹", "Debía restar B − C = 0 y ya", "Falla porque A·B no existe"], ok: 1,
          porque: "En matrices no hay simplificación. Con A = [[1,0],[0,0]] se tiene A·B = A·C con B ≠ C. Solo si A es invertible, multiplicando por A⁻¹ se concluye B = C." },
        { q: "Para A·X = B, un alumno escribe «X = B·A⁻¹». ¿Qué falla?",
          op: ["Nada, es la solución", "El producto está en el orden contrario: debe ser X = A⁻¹·B", "Debe ser X = B/A", "Debe ser X = A·B⁻¹"], ok: 1,
          porque: "A⁻¹ se multiplica por la izquierda en los dos miembros, porque A está a la izquierda de X. Con X = B·A⁻¹ resolverías X·A = B." },
        { q: "«(A + B)² = A² + 2AB + B²», dice un alumno sin más justificación.",
          op: ["Correcto: es el cuadrado de una suma", "Solo vale si AB = BA; en general es A² + AB + BA + B²", "Siempre falla; el término cruzado vale 0", "Debía ser A² + B²"], ok: 1,
          porque: "2AB solo aparece si AB = BA. Con A = [[1,1],[0,1]] y B = [[1,0],[1,1]] se comprueba que (A+B)² ≠ A² + 2AB + B²." },
        { q: "Un alumno calcula (A·B)⁻¹ = A⁻¹·B⁻¹.",
          op: ["Es correcto", "El orden debe invertirse: (A·B)⁻¹ = B⁻¹·A⁻¹", "(A·B)⁻¹ = (A + B)⁻¹", "La inversa de un producto no existe"], ok: 1,
          porque: "Para deshacer A·B hay que deshacer primero B y luego A: B⁻¹·A⁻¹. Lo mismo ocurre con la traspuesta: (AB)ᵗ = BᵗAᵗ." },
        { q: "De «A·X + X = B» un alumno concluye «(A + 1)·X = B».",
          op: ["Es correcto", "No existe «A + 1»: el factor común es (A + I)·X, con la matriz identidad", "Debía ser (A·X)(1 + X)", "Debía ser X(A + 1)"], ok: 1,
          porque: "Un número no se puede sumar a una matriz. X = I·X, luego A·X + I·X = (A + I)·X." },
        { q: "Al discutir el rango, un alumno divide la fila 2 entre (a − 1) «para tener un 1» y sigue sin más.",
          op: ["Es un buen método", "Falla: si a = 1 esa operación no existe y ese caso queda sin estudiar", "Falla: nunca se divide una fila", "Falla: el rango no depende de a"], ok: 1,
          porque: "Hay que dejar el pivote como expresión y estudiar por separado los valores que lo anulan (aquí a = 1)." },
        { q: "«La matriz [[0, 2], [−2, 3]] es antisimétrica porque a₁₂ = −a₂₁».",
          op: ["Correcto", "Falla: la diagonal debería ser de ceros y a₂₂ = 3 ≠ 0", "Falla: debería ser simétrica", "Falla: no es cuadrada"], ok: 1,
          porque: "Antisimétrica exige aᵢⱼ = −aⱼᵢ para todo i, j; para i = j da aᵢᵢ = 0. Aquí a₂₂ = 3." },
        { q: "«Como A² = O, entonces A = O».",
          op: ["Cierto, como en los números", "Falso: existen matrices no nulas con A² = O, como [[0,1],[0,0]]", "Cierto solo para 2×2", "Falso porque A² nunca puede ser O"], ok: 1,
          porque: "Las matrices nilpotentes cumplen Aᵏ = O sin ser nulas. En los números, x² = 0 implica x = 0; con matrices no." },
        { q: "Un alumno calcula A⁵ de A = [[1,1],[0,1]] elevando cada elemento a 5 y obtiene A⁵ = A.",
          op: ["Es correcto", "Falla: Aⁿ es el producto de A por sí misma n veces, no se eleva elemento a elemento; A⁵ = [[1,5],[0,1]]", "Falla: el resultado es la matriz nula", "Falla: A⁵ = 5A"], ok: 1,
          porque: "La potencia de una matriz no es la potencia de cada elemento (salvo en las diagonales). Aquí Aⁿ = [[1,n],[0,1]]." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Si A es 2×3 y B es 3×4, entonces A·B…",
          op: ["es 2×4", "es 3×3", "es 4×2", "no existe"], ok: 0,
          porque: "Las columnas de A (3) coinciden con las filas de B (3); el resultado tiene las filas de A y las columnas de B: 2×4." },
        { q: "¿Cuál de estas igualdades es cierta para matrices cualesquiera para las que existen los productos?",
          op: ["(A·B)ᵗ = Bᵗ·Aᵗ", "(A·B)ᵗ = Aᵗ·Bᵗ", "A·B = B·A", "(A·B)⁻¹ = A⁻¹·B⁻¹"], ok: 0,
          porque: "La traspuesta de un producto invierte el orden. Las otras dos son falsas en general." },
        { q: "Si A² = A, entonces A⁵ vale…",
          op: ["A", "A⁵ no se puede simplificar", "I", "5A"], ok: 0,
          porque: "A³ = A²·A = A·A = A, y así sucesivamente: todas las potencias valen A." },
        { q: "La inversa de A·B es…",
          op: ["B⁻¹·A⁻¹", "A⁻¹·B⁻¹", "(A + B)⁻¹", "A·B"], ok: 0,
          porque: "(B⁻¹A⁻¹)(AB) = B⁻¹(A⁻¹A)B = B⁻¹B = I." },
        { q: "El rango de [[1, 2], [2, 4]] es…",
          op: ["1", "2", "0", "4"], ok: 0,
          porque: "La segunda fila es el doble de la primera: solo hay una fila independiente." },
        { q: "La solución de X·A = B (con A invertible) es…",
          op: ["X = B·A⁻¹", "X = A⁻¹·B", "X = B/A", "X = A·B⁻¹"], ok: 0,
          porque: "A⁻¹ se multiplica por la derecha en los dos miembros: X·A·A⁻¹ = B·A⁻¹." },
        { q: "Si A² = I, entonces A²⁰²³ vale…",
          op: ["A", "I", "O", "A²⁰²³ no se puede simplificar"], ok: 0,
          porque: "Las potencias alternan A, I, A, I…: el exponente es impar, luego A²⁰²³ = A." },
        { q: "Una matriz cuadrada de orden n tiene inversa si y solo si…",
          op: ["su rango es n", "todos sus elementos son distintos de 0", "es simétrica", "su diagonal es de unos"], ok: 0,
          porque: "Rango n equivale a determinante distinto de 0 y a que Gauss-Jordan llegue a la identidad." },
        { q: "En una matriz antisimétrica, la diagonal principal…",
          op: ["está formada por ceros", "está formada por unos", "es simétrica", "puede ser cualquiera"], ok: 0,
          porque: "aᵢᵢ = −aᵢᵢ obliga a aᵢᵢ = 0." },
        { q: "(A + B)² es igual a…",
          op: ["A² + AB + BA + B²", "A² + 2AB + B²", "A² + B²", "A² + 2A + B²"], ok: 0,
          porque: "Se aplica la distributiva respetando el orden. La segunda solo vale si AB = BA." },
        { q: "Al aplicar Gauss-Jordan a (A | I) aparece una fila de ceros en la parte izquierda. Entonces…",
          op: ["A no tiene inversa", "A es la identidad", "A⁻¹ = Aᵗ", "hay que repetir el cálculo"], ok: 0,
          porque: "La fila de ceros indica que el rango es menor que n: A es singular." },
        { q: "Si A = [[1,1],[0,1]], el elemento a₁₂ de A⁵⁰ vale…",
          op: ["50", "1", "2⁵⁰", "0"], ok: 0,
          porque: "Aⁿ = [[1,n],[0,1]], luego a₁₂ = n = 50." }
      ]
    },
    tj1: {
      titulo: "Tarjetas del tema",
      cartas: [
        { a: "¿Cuándo existe A·B?", b: "Cuando las columnas de A son tantas como las filas de B. Si A es m×n y B es n×q, A·B es m×q." },
        { a: "¿Es conmutativo el producto de matrices?", b: "No: en general AB ≠ BA. Por eso (A + B)² = A² + AB + BA + B²." },
        { a: "AB = O, ¿implica A = O o B = O?", b: "No. Por ejemplo [[1,1],[1,1]]·[[1,−1],[−1,1]] = O." },
        { a: "(A·B)ᵗ", b: "Bᵗ·Aᵗ (se invierte el orden)." },
        { a: "(A·B)⁻¹", b: "B⁻¹·A⁻¹ (se invierte el orden)." },
        { a: "Matriz simétrica y antisimétrica", b: "Simétrica: Aᵗ = A. Antisimétrica: Aᵗ = −A, con diagonal de ceros." },
        { a: "Inversa de una 2×2", b: "A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]], si ad − bc ≠ 0." },
        { a: "Gauss-Jordan para A⁻¹", b: "Se parte de (A | I) y se hace con operaciones entre filas (I | A⁻¹). Fila de ceros a la izquierda: no hay inversa." },
        { a: "Resolver A·X = B", b: "X = A⁻¹·B (A⁻¹ por la izquierda). Si fuese X·A = B, X = B·A⁻¹." },
        { a: "Resolver A·X + X = B", b: "(A + I)·X = B, y X = (A + I)⁻¹·B." },
        { a: "Aⁿ de una matriz diagonal", b: "Se eleva cada elemento de la diagonal a n." },
        { a: "A = I + N con N nilpotente", b: "Binomio de Newton: Aⁿ = I + nN + C(n,2)N² + … (se corta cuando Nᵏ = O)." },
        { a: "A² = A, A² = I y Aᵏ = O", b: "Idempotente (Aⁿ = A), involutiva (A, I, A, I…) y nilpotente (O desde el exponente k)." },
        { a: "Rango de una matriz", b: "Número de filas no nulas tras escalonar por Gauss. Para cuadradas: rango n equivale a invertible." },
        { a: "Si A² − 2A + I = O", b: "A·(2I − A) = I, luego A⁻¹ = 2I − A." },
        { a: "Matriz ortogonal", b: "Aᵗ·A = I, es decir, A⁻¹ = Aᵗ." }
      ]
    },
    ecuaciones: {
      titulo: "Ecuación y solución",
      consigna: "Une cada ecuación matricial (A y B invertibles) con su solución.",
      pares: [
        ["A·X = B", "X = A⁻¹·B"],
        ["X·A = B", "X = B·A⁻¹"],
        ["A·X + B = C", "X = A⁻¹·(C − B)"],
        ["A·X + X = B", "X = (A + I)⁻¹·B"],
        ["A·X·B = C", "X = A⁻¹·C·B⁻¹"],
        ["X·A − X = B", "X = B·(A − I)⁻¹"]
      ]
    },
    tipos: {
      titulo: "Reconoce el tipo de matriz",
      consigna: "Clasifica cada matriz. Ninguna pertenece a dos categorías.",
      categorias: ["Simétrica", "Antisimétrica", "Idempotente (A² = A)", "Ortogonal (AᵗA = I)"],
      items: [
        { t: M([[1, 2], [2, 5]]), c: 0 }, { t: M([[0, 3, -1], [3, 2, 4], [-1, 4, 0]]), c: 0 },
        { t: M([[0, 2], [-2, 0]]), c: 1 }, { t: M([[0, 1, -4], [-1, 0, 2], [4, -2, 0]]), c: 1 },
        { t: M([[1, 1], [0, 0]]), c: 2 }, { t: M([[2, -2], [1, -1]]), c: 2 }, { t: M([[1, 0], [1, 0]]), c: 2 },
        { t: M([["3/5", "-4/5"], ["4/5", "3/5"]]), c: 3 }, { t: M([[0, 1, 0], [0, 0, 1], [1, 0, 0]]), c: 3 }
      ]
    },
    gauss: {
      titulo: "Gauss-Jordan en orden",
      consigna: "Ordena los pasos para calcular A⁻¹ con el método de Gauss-Jordan.",
      items: [
        { t: "Comprobar que A es cuadrada" },
        { t: "Escribir la matriz ampliada (A | I)" },
        { t: "Elegir el pivote de la primera columna (intercambiando filas si es 0) y convertirlo en 1" },
        { t: "Hacer ceros en el resto de la primera columna, arriba y abajo" },
        { t: "Repetir con la segunda, tercera… columna hasta tener I a la izquierda" },
        { t: "Leer A⁻¹ en la parte derecha (si aparece una fila de ceros a la izquierda, A no es invertible)" },
        { t: "Comprobar que A·A⁻¹ = I" }
      ]
    }
  };

  // ---------------------------------------------------------------- ejercicios
  var ejercicios = [
    // ================= ★ básico =================
    { id: "b1", nivel: 1,
      enunciado: "Sea A = " + M([[2, -1, 0], [3, 4, 5]]) + ". ¿Qué dimensión tiene? Da además los elementos a₁₂ y a₂₃.",
      check: [{ tipo: "opcion", etiqueta: "Dimensión", opciones: ["2×3", "3×2", "2×2", "3×3"], ok: 0 }, { tipo: "num", etiqueta: "a₁₂ =", valor: -1 }, { tipo: "num", etiqueta: "a₂₃ =", valor: 5 }],
      pistas: ["Primero las filas, después las columnas. aᵢⱼ: fila i, columna j."],
      pasos: ["Tiene 2 filas y 3 columnas: dimensión 2×3.", "a₁₂ está en la fila 1, columna 2: −1.", "a₂₃ está en la fila 2, columna 3: 5."],
      resultado: "2×3 · a₁₂ = −1 · a₂₃ = 5" },
    { id: "b2", nivel: 1,
      enunciado: "Escribe la matriz A de dimensión 2×3 con aᵢⱼ = i² − j. ¿Cuánto vale a₂₁ y cuánto suman todos sus elementos?",
      check: [{ tipo: "num", etiqueta: "a₂₁ =", valor: 3 }, { tipo: "num", etiqueta: "Suma de elementos =", valor: 3 }],
      pistas: ["Fila 1: i = 1, así que 1 − j. Fila 2: i = 2, así que 4 − j."],
      pasos: ["A = " + M([[0, -1, -2], [3, 2, 1]]) + ".", "a₂₁ = 4 − 1 = 3.", "Suma: (0 − 1 − 2) + (3 + 2 + 1) = −3 + 6 = 3."],
      resultado: "a₂₁ = 3 · suma = 3" },
    { id: "b3", nivel: 1,
      enunciado: "Con A = " + M([[1, 2], [3, 4]]) + " y B = " + M([[0, -1], [2, 1]]) + ", calcula 2A − 3B.",
      check: mc("2A − 3B", [[2, 7], [0, 5]]),
      pistas: ["Multiplica cada matriz por su número y resta posición a posición."],
      pasos: ["2A = " + M([[2, 4], [6, 8]]) + " y 3B = " + M([[0, -3], [6, 3]]) + ".", "2A − 3B = " + M([[2, 7], [0, 5]]) + "."],
      resultado: M([[2, 7], [0, 5]]) },
    { id: "b4", nivel: 1,
      enunciado: "A es 3×2 y B es 2×4. ¿Qué dimensión tiene A·B? ¿Existe B·A?",
      check: [{ tipo: "opcion", etiqueta: "A·B es", opciones: ["3×4", "2×2", "4×3", "no existe"], ok: 0 }, { tipo: "opcion", etiqueta: "B·A", opciones: ["no existe", "existe y es 4×3", "existe y es 2×2", "existe y es 3×4"], ok: 0 }],
      pistas: ["Columnas de la primera = filas de la segunda."],
      pasos: ["A·B: A tiene 2 columnas y B tiene 2 filas: existe y es 3×4.", "B·A: B tiene 4 columnas y A tiene 3 filas; 4 ≠ 3: no existe."],
      resultado: "A·B es 3×4 · B·A no existe" },
    { id: "b5", nivel: 1,
      enunciado: "Calcula A·B con A = " + M([[1, 2], [0, 1]]) + " y B = " + M([[3, 0], [1, 4]]) + ". Después B·A: ¿son iguales?",
      check: mc("A·B", [[5, 8], [1, 4]]).concat([{ tipo: "opcion", etiqueta: "¿A·B = B·A?", opciones: ["No", "Sí"], ok: 0 }]),
      pistas: ["Fila de A por columna de B. Para B·A, al revés."],
      pasos: ["A·B = " + M([[5, 8], [1, 4]]) + " (por ejemplo, 1·3 + 2·1 = 5).", "B·A = " + M([[3, 6], [1, 6]]) + ". Distintas: no conmutan."],
      resultado: "A·B = " + M([[5, 8], [1, 4]]) + " ≠ B·A = " + M([[3, 6], [1, 6]]) },
    { id: "b6", nivel: 1,
      enunciado: "Calcula A·B con A = " + M([[1, 0, 2], [-1, 3, 1]]) + " y B = " + M([[3, 1], [2, 1], [1, 0]]) + ".",
      check: mc("A·B", [[5, 1], [4, 2]]),
      pistas: ["El resultado es 2×2: cuatro productos fila × columna de tres sumandos."],
      pasos: ["(1,1): 1·3 + 0·2 + 2·1 = 5. (1,2): 1·1 + 0·1 + 2·0 = 1.", "(2,1): −1·3 + 3·2 + 1·1 = 4. (2,2): −1·1 + 3·1 + 1·0 = 2."],
      resultado: M([[5, 1], [4, 2]]) },
    { id: "b7", nivel: 1,
      enunciado: "Sea A = " + M([[1, 2, 3], [4, 5, 6]]) + ". Escribe Aᵗ: ¿cuánto valen sus elementos (Aᵗ)₃₁ y (Aᵗ)₂₂?",
      check: [{ tipo: "num", etiqueta: "(Aᵗ)₃₁ =", valor: 3 }, { tipo: "num", etiqueta: "(Aᵗ)₂₂ =", valor: 5 }],
      pistas: ["(Aᵗ)ᵢⱼ = aⱼᵢ."],
      pasos: ["Aᵗ = " + M([[1, 4], [2, 5], [3, 6]]) + " (3×2).", "(Aᵗ)₃₁ = a₁₃ = 3 y (Aᵗ)₂₂ = a₂₂ = 5."],
      resultado: "(Aᵗ)₃₁ = 3 · (Aᵗ)₂₂ = 5" },
    { id: "b8", nivel: 1,
      enunciado: "Calcula la inversa de A = " + M([[3, 1], [5, 2]]) + " con el atajo para 2×2.",
      check: mc("A⁻¹", [[2, -1], [-5, 3]]),
      pistas: ["det = ad − bc. Intercambia a y d, cambia el signo de b y c, divide entre det."],
      pasos: ["det A = 3·2 − 1·5 = 1.", "A⁻¹ = (1/1)·" + M([[2, -1], [-5, 3]]) + "."],
      resultado: M([[2, -1], [-5, 3]]) },
    { id: "b9", nivel: 1,
      enunciado: "¿Para qué valor de k NO tiene inversa la matriz A = " + MT([["1", "2"], ["k", "6"]]) + "?",
      check: { tipo: "num", etiqueta: "k =", valor: 3 },
      pistas: ["No tiene inversa cuando ad − bc = 0."],
      pasos: ["ad − bc = 6 − 2k = 0 ⟹ k = 3."],
      resultado: "k = 3" },
    { id: "b10", nivel: 1,
      enunciado: "Calcula A³ con A = " + M([[2, 0], [0, 3]]) + ".",
      check: mc("A³", [[8, 0], [0, 27]]),
      pistas: ["En una diagonal se eleva cada elemento de la diagonal."],
      pasos: ["A³ = diag(2³, 3³) = diag(8, 27)."],
      resultado: M([[8, 0], [0, 27]]) },
    { id: "b11", nivel: 1,
      enunciado: "Sea A = " + M([[0, 1], [0, 0]]) + " y B = " + M([[0, 1, 0], [0, 0, 1], [0, 0, 0]]) + ". ¿Cuál es el menor exponente n con Aⁿ = O? ¿Y con Bⁿ = O?",
      check: [{ tipo: "num", etiqueta: "Para A, n =", valor: 2 }, { tipo: "num", etiqueta: "Para B, n =", valor: 3 }],
      pistas: ["Calcula A², B² y B³."],
      pasos: ["A² = O (0·0 + 1·0 = 0 en todas las posiciones): n = 2.", "B² = " + M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) + " ≠ O, y B³ = O: n = 3."],
      resultado: "n = 2 para A y n = 3 para B" },
    { id: "b12", nivel: 1,
      enunciado: "Halla el rango de " + M([[1, 2], [2, 4]]) + " y el de " + M([[1, 2, 3], [0, 1, 1], [1, 3, 4]]) + ".",
      check: [{ tipo: "num", etiqueta: "Rango de la 2×2 =", valor: 1 }, { tipo: "num", etiqueta: "Rango de la 3×3 =", valor: 2 }],
      pistas: ["Busca filas que sean combinación de las otras."],
      pasos: ["En la 2×2, F₂ = 2F₁: rango 1.", "En la 3×3, F₃ = F₁ + F₂ (1+0, 2+1, 3+1 = 1, 3, 4): rango 2 (F₁ y F₂ son independientes)."],
      resultado: "1 y 2" },
    { id: "b13", nivel: 1,
      enunciado: "Resuelve A·X = B con A = " + M([[1, 1], [0, 1]]) + " y B = " + M([[3], [2]]) + ".",
      check: mc("X", [[1], [2]]),
      pistas: ["X = A⁻¹·B. La inversa de una triangular 2×2 de unos es fácil."],
      pasos: ["det A = 1, A⁻¹ = " + M([[1, -1], [0, 1]]) + ".", "X = A⁻¹·B = " + M([[1], [2]]) + " (3 − 2 = 1 y 2)."],
      resultado: M([[1], [2]]) },
    { id: "b14", nivel: 1,
      enunciado: "¿Cuál de estas matrices es antisimétrica?",
      check: { tipo: "opcion", etiqueta: "Es antisimétrica", opciones: ["filas (0, 2) y (−2, 0)", "filas (0, 2) y (2, 0)", "filas (1, 2) y (−2, 1)", "filas (0, 2) y (−2, 1)"], ok: 0 },
      pistas: ["Diagonal de ceros y aᵢⱼ = −aⱼᵢ."],
      pasos: ["Solo la primera tiene diagonal de ceros y a₁₂ = −a₂₁ (2 = −(−2)). La segunda es simétrica; las demás tienen diagonal no nula."],
      resultado: "La primera" },
    { id: "b15", nivel: 1,
      enunciado: "Calcula " + M([[1, 2, 3], [0, 1, -1]]) + "·" + M([[2], [1], [1]]) + ".",
      check: mc("Producto", [[7], [0]]),
      pistas: ["Una matriz 2×3 por una columna 3×1 da una columna 2×1."],
      pasos: ["Fila 1: 1·2 + 2·1 + 3·1 = 7.", "Fila 2: 0·2 + 1·1 + (−1)·1 = 0."],
      resultado: M([[7], [0]]) },

    // ================= ★★ intermedio =================
    { id: "c1", nivel: 2,
      enunciado: "Calcula A² con A = " + M([[1, -1], [2, 3]]) + ".",
      check: mc("A²", [[-1, -4], [8, 7]]),
      pistas: ["A² = A·A, no los cuadrados de los elementos."],
      pasos: ["(1,1): 1·1 + (−1)·2 = −1. (1,2): 1·(−1) + (−1)·3 = −4.", "(2,1): 2·1 + 3·2 = 8. (2,2): 2·(−1) + 3·3 = 7."],
      resultado: M([[-1, -4], [8, 7]]) },
    { id: "c2", nivel: 2,
      enunciado: "Con A = " + M([[1, 2], [0, 1]]) + " y B = " + M([[1, 0], [3, 1]]) + ", calcula el conmutador A·B − B·A. ¿Conmutan A y B?",
      check: mc("A·B − B·A", [[6, 0], [0, -6]]),
      pistas: ["Calcula por separado A·B y B·A."],
      pasos: ["A·B = " + M([[7, 2], [3, 1]]) + " y B·A = " + M([[1, 2], [3, 7]]) + ".", "A·B − B·A = " + M([[6, 0], [0, -6]]) + " ≠ O: no conmutan."],
      resultado: M([[6, 0], [0, -6]]) },
    { id: "c3", nivel: 2,
      enunciado: "(Tipo EvAU) Halla las matrices X = " + MT([["a", "b"], ["c", "d"]]) + " que conmutan con A = " + M([[2, 0], [0, 3]]) + ". ¿Cuánto valen b y c? ¿Cuántos parámetros libres tiene X?",
      check: [{ tipo: "num", etiqueta: "b =", valor: 0 }, { tipo: "num", etiqueta: "c =", valor: 0 }, { tipo: "num", etiqueta: "Parámetros libres =", valor: 2 }],
      pistas: ["Calcula A·X y X·A con letras e iguala posición a posición."],
      pasos: ["A·X = " + MT([["2a", "2b"], ["3c", "3d"]]) + " y X·A = " + MT([["2a", "3b"], ["2c", "3d"]]) + ".", "2b = 3b ⟹ b = 0; 3c = 2c ⟹ c = 0. Los elementos a y d quedan libres.", "X = diag(a, d): dos parámetros."],
      resultado: "b = 0, c = 0; X diagonal con 2 parámetros libres" },
    { id: "c4", nivel: 2,
      enunciado: "Con A = " + M([[1, 2], [3, 4]]) + " y B = " + M([[0, 1], [1, 0]]) + ", calcula (A·B)ᵗ.",
      check: mc("(A·B)ᵗ", [[2, 4], [1, 3]]),
      pistas: ["Calcula A·B y traspón; o usa (AB)ᵗ = BᵗAᵗ para comprobarlo."],
      pasos: ["A·B = " + M([[2, 1], [4, 3]]) + " (intercambia las columnas de A).", "(A·B)ᵗ = " + M([[2, 4], [1, 3]]) + "."],
      resultado: M([[2, 4], [1, 3]]) },
    { id: "c5", nivel: 2,
      enunciado: "Sea A = " + M([[1, 2, 0], [0, 1, 3]]) + ". Calcula A·Aᵗ y comprueba que es simétrica.",
      check: mc("A·Aᵗ", [[5, 2], [2, 10]]),
      pistas: ["A es 2×3 y Aᵗ es 3×2: A·Aᵗ es 2×2."],
      pasos: ["(1,1): 1 + 4 + 0 = 5. (1,2): 0 + 2 + 0 = 2.", "(2,1) = 2 y (2,2): 0 + 1 + 9 = 10.", "A·Aᵗ = " + M([[5, 2], [2, 10]]) + ", simétrica."],
      resultado: M([[5, 2], [2, 10]]) },
    { id: "c6", nivel: 2,
      enunciado: "Calcula por Gauss-Jordan la inversa de A = " + M([[1, 1, 0], [0, 1, 1], [1, 0, 1]]) + ". Da los elementos (A⁻¹)₁₁, (A⁻¹)₂₃ y (A⁻¹)₃₁.",
      check: [{ tipo: "num", etiqueta: "(A⁻¹)₁₁ =", valor: 0.5 }, { tipo: "num", etiqueta: "(A⁻¹)₂₃ =", valor: -0.5 }, { tipo: "num", etiqueta: "(A⁻¹)₃₁ =", valor: -0.5 }],
      pistas: ["Empieza con F₃ ← F₃ − F₁. El determinante es 2."],
      pasos: ["(A | I) → F₃ ← F₃ − F₁ → F₃ ← F₃ + F₂ da (0, 0, 2 | −1, 1, 1).", "Se normaliza y se hacen ceros hacia arriba.", "A⁻¹ = (1/2)·" + M([[1, -1, 1], [1, 1, -1], [-1, 1, 1]]) + "."],
      resultado: "A⁻¹ = (1/2)·" + M([[1, -1, 1], [1, 1, -1], [-1, 1, 1]]) },
    { id: "c7", nivel: 2,
      enunciado: "Resuelve X·A = B con A = " + M([[1, 2], [1, 3]]) + " y B = " + M([[1, 0], [2, 1]]) + ".",
      check: mc("X", [[3, -2], [5, -3]]),
      pistas: ["La X está a la izquierda de A: X = B·A⁻¹."],
      pasos: ["det A = 3 − 2 = 1 y A⁻¹ = " + M([[3, -2], [-1, 1]]) + ".", "X = B·A⁻¹ = " + M([[3, -2], [5, -3]]) + ".", "Comprobación: X·A = " + M([[1, 0], [2, 1]]) + " = B. ✓"],
      resultado: M([[3, -2], [5, -3]]) },
    { id: "c8", nivel: 2,
      enunciado: "Resuelve A·X + B = C con A = " + M([[2, 1], [1, 1]]) + ", B = " + M([[1, 1], [0, 2]]) + " y C = " + M([[4, 3], [1, 5]]) + ".",
      check: mc("X", [[2, -1], [-1, 4]]),
      pistas: ["Pasa B restando y multiplica por A⁻¹ por la izquierda."],
      pasos: ["A·X = C − B = " + M([[3, 2], [1, 3]]) + ".", "A⁻¹ = " + M([[1, -1], [-1, 2]]) + " (det A = 1).", "X = A⁻¹·(C − B) = " + M([[2, -1], [-1, 4]]) + "."],
      resultado: M([[2, -1], [-1, 4]]) },
    { id: "c9", nivel: 2,
      enunciado: "Halla a para que A = " + MT([["2", "−2"], ["a", "−1"]]) + " sea idempotente (A² = A).",
      check: { tipo: "num", etiqueta: "a =", valor: 1 },
      pistas: ["Calcula A² con a y compara con A."],
      pasos: ["A² = " + MT([["4−2a", "−2"], ["a", "1−2a"]]) + ".", "Igualando a A: 4 − 2a = 2 ⟹ a = 1, y 1 − 2a = −1 ⟹ a = 1. Las demás posiciones se cumplen."],
      resultado: "a = 1" },
    { id: "c10", nivel: 2,
      enunciado: "Halla x, y, z, w para que A = " + MT([["x", "2", "y"], ["z", "0", "−3"], ["1", "w", "x"]]) + " sea antisimétrica. Indica y, z y w.",
      check: [{ tipo: "num", etiqueta: "y =", valor: -1 }, { tipo: "num", etiqueta: "z =", valor: -2 }, { tipo: "num", etiqueta: "w =", valor: 3 }],
      pistas: ["aᵢⱼ = −aⱼᵢ y diagonal de ceros."],
      pasos: ["Diagonal: x = 0 (a₁₁ y a₃₃).", "a₁₃ = −a₃₁ ⟹ y = −1. a₂₁ = −a₁₂ ⟹ z = −2. a₃₂ = −a₂₃ = 3 ⟹ w = 3."],
      resultado: "x = 0, y = −1, z = −2, w = 3" },
    { id: "c11", nivel: 2,
      enunciado: "(Tipo EvAU) Comprueba que A = " + M([[2, 1], [-1, 0]]) + " cumple A² − 2A + I = O y calcula A⁻¹ a partir de esa igualdad.",
      check: mc("A⁻¹", [[0, -1], [1, 2]]),
      pistas: ["Despeja I y saca A factor común: I = A·(2I − A)."],
      pasos: ["A² = " + M([[3, 2], [-2, -1]]) + ", 2A = " + M([[4, 2], [-2, 0]]) + ": A² − 2A + I = O. ✓", "I = 2A − A² = A·(2I − A) ⟹ A⁻¹ = 2I − A = " + M([[0, -1], [1, 2]]) + "."],
      resultado: "A⁻¹ = 2I − A = " + M([[0, -1], [1, 2]]) },
    { id: "c12", nivel: 2,
      enunciado: "Sea A = " + M([[1, 0], [3, 1]]) + ". Halla Aⁿ (escribe el elemento a₂₁ de Aⁿ en función de n) y el valor de a₂₁ en A²⁰.",
      check: [{ tipo: "expr", etiqueta: "a₂₁ de Aⁿ =", expr: "3*n" }, { tipo: "num", etiqueta: "a₂₁ de A²⁰ =", valor: 60 }],
      pistas: ["A² = [[1,0],[6,1]], A³ = [[1,0],[9,1]]…"],
      pasos: ["A² y A³ muestran que a₂₁ crece de 3 en 3: Aⁿ = [[1, 0], [3n, 1]] (por inducción: Aⁿ·A suma 3 a a₂₁).", "A²⁰: a₂₁ = 60."],
      resultado: "Aⁿ = [[1, 0], [3n, 1]] · a₂₁(A²⁰) = 60" },
    { id: "c13", nivel: 2,
      enunciado: "Para B = " + M([[2, 0], [0, 3]]) + " escribe (Bⁿ)₁₁ y (Bⁿ)₂₂ en función de n.",
      check: [{ tipo: "expr", etiqueta: "(Bⁿ)₁₁ =", expr: "2^n" }, { tipo: "expr", etiqueta: "(Bⁿ)₂₂ =", expr: "3^n" }],
      pistas: ["Es diagonal."],
      pasos: ["Bⁿ = diag(2ⁿ, 3ⁿ)."],
      resultado: "Bⁿ = diag(2ⁿ, 3ⁿ)" },
    { id: "c14", nivel: 2,
      enunciado: "Discute el rango de " + MT([["1", "1", "1"], ["1", "m", "1"], ["1", "1", "m"]]) + " según m. ¿Para qué valor de m baja el rango? ¿A cuánto?",
      check: [{ tipo: "num", etiqueta: "Valor crítico m =", valor: 1 }, { tipo: "num", etiqueta: "Rango en ese caso =", valor: 1 }],
      pistas: ["F₂ ← F₂ − F₁ y F₃ ← F₃ − F₁."],
      pasos: ["Quedan las filas (1, 1, 1), (0, m−1, 0) y (0, 0, m−1).", "Si m ≠ 1: tres pivotes, rango 3. Si m = 1: las dos últimas son nulas y el rango es 1."],
      resultado: "rg = 3 si m ≠ 1; rg = 1 si m = 1" },
    { id: "c15", nivel: 2,
      enunciado: "Despeja X en 2X − A = B + X con A = " + M([[1, 2], [3, 4]]) + " y B = " + M([[0, 1], [1, 0]]) + ".",
      check: mc("X", [[1, 3], [4, 4]]),
      pistas: ["Agrupa las X a un lado: X = A + B."],
      pasos: ["2X − X = A + B ⟹ X = A + B = " + M([[1, 3], [4, 4]]) + "."],
      resultado: M([[1, 3], [4, 4]]) },
    { id: "c16", nivel: 2,
      enunciado: "Una tienda vende tres productos en dos sucursales. Las unidades vendidas son las filas de " + M([[10, 20, 5], [8, 15, 12]]) + " (sucursal × producto) y los precios, 3, 4 y 5 euros. Calcula con un producto de matrices la facturación de cada sucursal.",
      check: mc("Facturación", [[135], [144]]),
      pistas: ["(unidades 2×3)·(precios 3×1) da una columna 2×1."],
      pasos: ["Sucursal 1: 10·3 + 20·4 + 5·5 = 135 euros.", "Sucursal 2: 8·3 + 15·4 + 12·5 = 144 euros."],
      resultado: M([[135], [144]]) + " euros" },
    { id: "c17", nivel: 2,
      enunciado: "Calcula la inversa de A = " + M([[2, 4], [1, 3]]) + ".",
      check: mc("A⁻¹", [[1.5, -2], [-0.5, 1]]),
      pistas: ["det A = 2; divide cada elemento entre 2."],
      pasos: ["det A = 6 − 4 = 2.", "A⁻¹ = (1/2)·" + M([[3, -4], [-1, 2]]) + " = " + M([["3/2", -2], ["-1/2", 1]]) + "."],
      resultado: M([["3/2", -2], ["-1/2", 1]]) },

    // ================= ★★★ nivel EvAU / avanzado =================
    { id: "d1", nivel: 3,
      enunciado: "(Tipo EvAU) Sea A = " + M([[1, 1, 0], [0, 1, 1], [0, 0, 1]]) + ". Halla Aⁿ. Indica el elemento a₁₃ de Aⁿ en función de n y su valor en A¹⁰.",
      check: [{ tipo: "expr", etiqueta: "a₁₃ de Aⁿ =", expr: "n*(n-1)/2" }, { tipo: "num", etiqueta: "a₁₃ de A¹⁰ =", valor: 45 }],
      pistas: ["Escribe A = I + N y usa el binomio de Newton: N³ = O."],
      pasos: ["A = I + N con N = " + M([[0, 1, 0], [0, 0, 1], [0, 0, 0]]) + ", N² = " + M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) + ", N³ = O.", "Aⁿ = I + nN + C(n,2)N² = " + MT([["1", "n", "n(n−1)/2"], ["0", "1", "n"], ["0", "0", "1"]]) + ".", "Con n = 10: 10·9/2 = 45."],
      resultado: "a₁₃ = n(n−1)/2 · en A¹⁰: 45" },
    { id: "d2", nivel: 3,
      enunciado: "Halla A⁵ para A = " + M([[3, 1], [0, 3]]) + " usando A = 3I + N.",
      check: mc("A⁵", [[243, 405], [0, 243]]),
      pistas: ["N = [[0,1],[0,0]] cumple N² = O. (3I + N)ⁿ = 3ⁿI + n·3ⁿ⁻¹N."],
      pasos: ["A⁵ = 3⁵I + 5·3⁴N = 243I + 405N.", "A⁵ = " + M([[243, 405], [0, 243]]) + "."],
      resultado: M([[243, 405], [0, 243]]) },
    { id: "d3", nivel: 3,
      enunciado: "Calcula A²⁰²⁵ para A = " + M([[0, 1], [-1, 0]]) + ". Da sus elementos a₁₂ y a₂₁.",
      check: mc("A²⁰²⁵", [[0, 1], [-1, 0]]),
      pistas: ["A² = −I. ¿Cuál es el periodo?"],
      pasos: ["A² = −I y A⁴ = I: periodo 4.", "2025 = 4·506 + 1 ⟹ A²⁰²⁵ = A = " + M([[0, 1], [-1, 0]]) + "."],
      resultado: M([[0, 1], [-1, 0]]) },
    { id: "d4", nivel: 3,
      enunciado: "Para A = " + M([[1, 1], [1, 0]]) + ", calcula A¹⁰ y da su elemento a₁₂. (Pista: Aⁿ = [[Fₙ₊₁, Fₙ], [Fₙ, Fₙ₋₁]].)",
      check: { tipo: "num", etiqueta: "a₁₂ de A¹⁰ =", valor: 55 },
      pistas: ["Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55."],
      pasos: ["a₁₂ = F₁₀ = 55 (F₁ = 1, F₂ = 1, F₃ = 2, …, F₁₀ = 55).", "A¹⁰ = " + M([[89, 55], [55, 34]]) + "."],
      resultado: "a₁₂ = 55" },
    { id: "d5", nivel: 3,
      enunciado: "Halla las matrices A y B que cumplen A + B = " + M([[3, 1], [2, 0]]) + " y A − B = " + M([[1, -1], [0, 2]]) + ". Da A.",
      check: mc("A", [[2, 0], [1, 1]]),
      pistas: ["Suma las dos ecuaciones: 2A = …"],
      pasos: ["Sumando: 2A = " + M([[4, 0], [2, 2]]) + ", luego A = " + M([[2, 0], [1, 1]]) + ".", "B = (A+B) − A = " + M([[1, 1], [1, -1]]) + "."],
      resultado: "A = " + M([[2, 0], [1, 1]]) + " · B = " + M([[1, 1], [1, -1]]) },
    { id: "d6", nivel: 3,
      enunciado: "(Tipo EvAU) Resuelve X·A − 2X = B con A = " + M([[3, 1], [0, 4]]) + " y B = " + M([[1, 2], [3, 4]]) + ".",
      check: mc("X", [[1, 0.5], [3, 0.5]]),
      pistas: ["X·A − 2X = X·(A − 2I)."],
      pasos: ["X·(A − 2I) = B, con A − 2I = " + M([[1, 1], [0, 2]]) + " (det 2).", "(A − 2I)⁻¹ = " + M([[1, "-1/2"], [0, "1/2"]]) + ".", "X = B·(A − 2I)⁻¹ = " + M([[1, "1/2"], [3, "1/2"]]) + "."],
      resultado: M([[1, "1/2"], [3, "1/2"]]) },
    { id: "d7", nivel: 3,
      enunciado: "(Tipo EvAU) Sea A = " + M([[1, 1], [1, 0]]) + ". Comprueba que A² = A + I, deduce que A es invertible y calcula A⁻¹.",
      check: mc("A⁻¹", [[0, 1], [1, -1]]),
      pistas: ["A² − A = I ⟹ A·(A − I) = I."],
      pasos: ["A² = " + M([[2, 1], [1, 1]]) + " = A + I. ✓", "A² − A = I ⟹ A·(A − I) = I, así que A⁻¹ = A − I.", "A⁻¹ = " + M([[0, 1], [1, -1]]) + "."],
      resultado: M([[0, 1], [1, -1]]) },
    { id: "d8", nivel: 3,
      enunciado: "Halla los valores de a para los que A = " + MT([["a", "1"], ["4", "a"]]) + " NO es invertible. Escríbelos separados por comas.",
      check: { tipo: "lista", etiqueta: "a =", valores: [-2, 2] },
      pistas: ["Determinante a·a − 1·4."],
      pasos: ["ad − bc = a² − 4 = 0 ⟹ a = 2 ó a = −2."],
      resultado: "a = −2 y a = 2" },
    { id: "d9", nivel: 3,
      enunciado: "(Tipo EvAU) Discute el rango de M = " + MT([["1", "1", "a"], ["1", "a", "1"], ["a", "1", "1"]]) + ". Da los dos valores de a que lo reducen y el rango en cada uno (primero el menor valor de a).",
      check: [{ tipo: "lista", etiqueta: "Valores de a =", valores: [-2, 1] }, { tipo: "num", etiqueta: "Rango si a = −2:", valor: 2 }, { tipo: "num", etiqueta: "Rango si a = 1:", valor: 1 }],
      pistas: ["F₂ − F₁, F₃ − aF₁, luego F₃ + F₂: el último pivote es (1−a)(a+2)."],
      pasos: ["Tras Gauss los pivotes son 1, a−1 y (1−a)(a+2).", "a = −2 ⟹ rango 2; a = 1 ⟹ rango 1; en otro caso, rango 3."],
      resultado: "a = −2 (rango 2), a = 1 (rango 1); si no, rango 3" },
    { id: "d10", nivel: 3,
      enunciado: "Estudia el rango de " + MT([["1", "2", "−1", "3"], ["2", "4", "a", "6"], ["−1", "−2", "1", "−3"]]) + " según a. ¿Para qué valor de a el rango es 1?",
      check: { tipo: "num", etiqueta: "a =", valor: -2 },
      pistas: ["La tercera fila es −F₁. ¿Cuándo es F₂ múltiplo de F₁?"],
      pasos: ["F₃ = −F₁, así que el rango es el de las dos primeras filas.", "F₂ ← F₂ − 2F₁ = (0, 0, a + 2, 0). Rango 2 si a ≠ −2; rango 1 si a = −2."],
      resultado: "a = −2 (rango 1); si no, rango 2" },
    { id: "d11", nivel: 3,
      enunciado: "¿Cuántas matrices diagonales 2×2 son idempotentes (A² = A)?",
      check: { tipo: "num", etiqueta: "Hay", valor: 4 },
      pistas: ["diag(a, d)² = diag(a², d²) = diag(a, d)."],
      pasos: ["a² = a ⟹ a ∈ {0, 1}; d² = d ⟹ d ∈ {0, 1}.", "2·2 = 4 matrices: O, I, diag(1,0) y diag(0,1)."],
      resultado: "4" },
    { id: "d12", nivel: 3,
      enunciado: "Se sabe que A⁻¹ = " + M([[1, 2], [0, 1]]) + " y B⁻¹ = " + M([[1, 0], [3, 1]]) + ". Calcula (A·B)⁻¹.",
      check: mc("(AB)⁻¹", [[1, 2], [3, 7]]),
      pistas: ["(AB)⁻¹ = B⁻¹·A⁻¹. Cuidado con el orden."],
      pasos: ["(AB)⁻¹ = B⁻¹·A⁻¹ = " + M([[1, 0], [3, 1]]) + "·" + M([[1, 2], [0, 1]]) + " = " + M([[1, 2], [3, 7]]) + ".", "(El otro orden, A⁻¹·B⁻¹ = " + M([[7, 2], [3, 1]]) + ", es incorrecto.)"],
      resultado: M([[1, 2], [3, 7]]) },
    { id: "d13", nivel: 3,
      enunciado: "Demuestra que si A es antisimétrica (Aᵗ = −A), entonces A² es simétrica.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Calcula la traspuesta (A²)ᵗ", p: 1 },
        { t: "Usa (A·A)ᵗ = Aᵗ·Aᵗ (traspuesta de un producto)", p: 1 },
        { t: "Sustituye Aᵗ = −A: (−A)(−A)", p: 1 },
        { t: "Concluye (A²)ᵗ = A²", p: 1 }] },
      pistas: ["Parte de (A²)ᵗ y usa la regla del producto."],
      pasos: ["(A²)ᵗ = (A·A)ᵗ = Aᵗ·Aᵗ (con dos factores iguales el orden invertido no importa).", "Como Aᵗ = −A: Aᵗ·Aᵗ = (−A)·(−A) = A².", "Luego (A²)ᵗ = A²: A² es simétrica. ∎"],
      resultado: "(A²)ᵗ = (Aᵗ)² = (−A)² = A²" },
    { id: "d14", nivel: 3,
      enunciado: "(Tipo EvAU) Halla X tal que A·X·A⁻¹ = B, con A = " + M([[1, 1], [0, 1]]) + " y B = " + M([[1, 0], [1, 1]]) + ".",
      check: mc("X", [[0, -1], [1, 2]]),
      pistas: ["A⁻¹ por la izquierda y A por la derecha: X = A⁻¹·B·A."],
      pasos: ["A⁻¹ = " + M([[1, -1], [0, 1]]) + ".", "A⁻¹·B = " + M([[0, -1], [1, 1]]) + " y, por A: X = " + M([[0, -1], [1, 2]]) + ".", "Comprobación: A·X·A⁻¹ = B. ✓"],
      resultado: M([[0, -1], [1, 2]]) },
    { id: "d15", nivel: 3,
      enunciado: "Sea N = " + M([[0, 1, 1], [0, 0, 1], [0, 0, 0]]) + ". Comprueba que N³ = O y calcula (I − N)⁻¹. Da el elemento (1,3).",
      check: { tipo: "num", etiqueta: "(I−N)⁻¹ (1,3) =", valor: 2 },
      pistas: ["(I − N)(I + N + N²) = I − N³."],
      pasos: ["N² = " + M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) + " y N³ = O.", "(I − N)(I + N + N²) = I − N³ = I, así que (I − N)⁻¹ = I + N + N² = " + M([[1, 1, 2], [0, 1, 1], [0, 0, 1]]) + "."],
      resultado: M([[1, 1, 2], [0, 1, 1], [0, 0, 1]]) }
  ];

  // ---------------------------------------------------------------- láminas
  var lamina = [
    { titulo: "Operaciones y propiedades", ancha: true,
      tabla: { cab: ["Operación", "Regla"], filas: [
        ["Suma, resta", "misma dimensión; elemento a elemento"],
        ["Producto A·B", "A m×n, B n×q → m×q; fila de A por columna de B"],
        ["Conmutativa", "NO: AB ≠ BA en general"],
        ["Cuadrado de una suma", "(A+B)² = A² + AB + BA + B²"],
        ["Traspuesta", "(AB)ᵗ = BᵗAᵗ · (A+B)ᵗ = Aᵗ+Bᵗ"],
        ["Inversa", "(AB)⁻¹ = B⁻¹A⁻¹ · (Aᵗ)⁻¹ = (A⁻¹)ᵗ"]
      ] },
      nota: "AB = O no implica A = O ni B = O; AB = AC no implica B = C." },
    { titulo: "Inversa por Gauss-Jordan",
      pasos: ["Escribe (A | I).", "Pivote 1 en cada columna (cambia filas si hace falta).", "Haz ceros arriba y abajo del pivote.", "Cuando a la izquierda esté I, a la derecha tienes A⁻¹.", "Fila de ceros a la izquierda: A no es invertible.", "Comprueba A·A⁻¹ = I."],
      nota: "2×2: A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]]." },
    { titulo: "Ecuaciones matriciales",
      items: [
        { label: "AX = B", formula: "X = A⁻¹·B" },
        { label: "XA = B", formula: "X = B·A⁻¹" },
        { label: "AXB = C", formula: "X = A⁻¹·C·B⁻¹" },
        { label: "AX + X = B", formula: "X = (A + I)⁻¹·B" },
        { label: "Regla", formula: "la inversa se multiplica por el lado donde está la matriz que quitas, en los dos miembros" }
      ],
      nota: "Comprueba que la matriz es invertible y sustituye X en la ecuación original." },
    { titulo: "Patrones de potencias",
      items: [
        { label: "Diagonal", formula: "diag(a,b)ⁿ = diag(aⁿ, bⁿ)" },
        { label: "A² = A", formula: "Aⁿ = A" },
        { label: "A² = I", formula: "A, I, A, I…" },
        { label: "Nilpotente", formula: "Aᵏ = O ⟹ Aⁿ = O si n ≥ k" },
        { label: "A = I + N", formula: "Aⁿ = I + nN + C(n,2)N² + …" }
      ],
      nota: "Calcula A², A³, A⁴, conjetura y demuestra por inducción." },
    { titulo: "Rango con parámetro",
      pasos: ["Escalona sin dividir entre expresiones con a.", "Anula cada pivote para hallar los valores críticos.", "Sustituye cada valor crítico y calcula el rango a mano.", "El rango máximo vale para el resto de valores."],
      nota: "Cuadrada: rango n ⟺ invertible ⟺ det ≠ 0." }
  ];

  B.registrar("mates2", "t1", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
