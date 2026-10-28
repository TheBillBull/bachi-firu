/* ============================================================
   Matemáticas II · ampliaciones · Tema 2: Determinantes
   (parte A: se añade al final de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  var D = B.lab.det, M = D.mat, T = D.dtm;
  function w(n, ref) { return H.w(n, ref && "mates2/t2/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. ¿Qué es un determinante?
  secciones[0] =
    "<h5>Un número con tres significados</h5>" +
    "<p>El determinante de una matriz cuadrada se lee de tres maneras a la vez, y casi todo el tema consiste en saltar de una a otra:</p>" +
    tabla(["Lectura", "Qué dice |A| = 0", "Dónde la usarás"], [
      ["Algebraica", "A no tiene inversa (es <b>singular</b>)", "este tema y el Tema 1"],
      ["De filas y columnas", "alguna fila (o columna) es combinación lineal de las demás: el rango baja", "rango, Tema 3 (sistemas)"],
      ["Geométrica", "el área (2×2) o el volumen (3×3) que forman las filas vale 0: los vectores son proporcionales o coplanarios", "Tema 6 y siguientes"]
    ]) +
    "<p>Por eso los ejercicios de la EvAU casi nunca piden «calcula el determinante» y punto: piden <i>«halla los valores de <b>m</b> para los que la matriz no tiene inversa»</i>, <i>«discute el rango según <b>a</b>»</i> o <i>«comprueba que los puntos están alineados»</i>. Todas son, en el fondo, la pregunta <b>¿cuándo vale 0 el determinante?</b></p>" +
    "<h5>Tres avisos antes de empezar</h5>" +
    "<ul>" +
    "<li><b>|A| es un número, no una matriz.</b> Las barras no son un «paréntesis distinto»: transforman toda la matriz en un solo valor. Por eso se escribe |A| = −22 y nunca A = −22.</li>" +
    "<li>Solo las matrices <b>cuadradas</b> tienen determinante. Una matriz 2×3 no tiene determinante, aunque sí puede tener rango.</li>" +
    "<li><b>El determinante no es lineal en la matriz entera</b>: en general |A + B| ≠ |A| + |B|. Sí es lineal fila a fila (lo verás en las propiedades), y esa diferencia es la fuente de muchos errores.</li>" +
    "</ul>" +
    "<h5>Cómo se define de verdad (para entender los cálculos)</h5>" +
    "<p>El determinante de orden 1 es el propio número: |a| = a. Los demás se definen <b>con los de orden menor</b>: se elige una fila, se multiplica cada elemento por su adjunto (un determinante de un orden menos, con su signo) y se suma. Es el desarrollo por adjuntos, que verás en la sección 7. Sarrus y la fórmula 2×2 son solo ese desarrollo escrito ya «desplegado» para los órdenes 2 y 3.</p>";

  // ---------------------------------------------------------------- 2. Determinante 2×2
  secciones[1] =
    "<h5>Ejemplos con números negativos y con parámetro</h5>" +
    ejemplo("Determinantes 2×2 con signos",
      "Calcula " + T([[3, -2], [5, 4]]) + " y " + T([[-2, 3], [1, -6]]) + ".",
      ["Primero: 3·4 − (−2)·5 = 12 + 10 = <b>22</b>. El segundo producto lleva un signo menos delante <i>y</i> otro propio: se suman.",
       "Segundo: (−2)·(−6) − 3·1 = 12 − 3 = <b>9</b>."]) +
    ejemplo("Un 2×2 con parámetro",
      "¿Para qué valores de m la matriz " + M([["m", 2], [1, "m + 1"]]) + " <b>no</b> tiene inversa?",
      ["|A| = m(m + 1) − 2·1 = m² + m − 2.",
       "No hay inversa cuando |A| = 0: m² + m − 2 = 0 → m = (−1 ± 3)/2 → <b>m = 1</b> o <b>m = −2</b>.",
       "Comprobación con m = 1: " + M([[1, 2], [1, 2]]) + ", dos filas iguales, |A| = 0 ✓."]) +
    "<h5>El 2×2 es un área</h5>" +
    "<p>Con dos vectores u = (a, c) y v = (b, d) escritos como columnas (o filas), |ad − bc| es el <b>área del paralelogramo</b> que forman. Si los vectores son proporcionales, el paralelogramo se aplasta y el área es 0: en lenguaje de matrices, la matriz tiene rango 1 y no tiene inversa. Lo verás con un simulador en la sección 9.</p>" +
    ojo("La fórmula ad − bc se aplica <b>solo</b> a 2×2. No existe un «atajo de la diagonal» para 3×3 ni para 4×4: para esos hay Sarrus (3×3) o adjuntos (cualquier orden).");

  // ---------------------------------------------------------------- 3. Sarrus
  secciones[2] =
    "<h5>Sarrus sin equivocarse con los signos</h5>" +
    "<p>Los fallos de Sarrus casi nunca son de idea, sino de <b>signos y de despiste con los elementos negativos</b>. Un método ordenado: escribe en una línea los <b>seis productos</b> y no los sumes hasta tenerlos todos con su signo propio. Con A = (a b c / d e f / g h i):</p>" +
    "<ul>" +
    "<li><b>Los tres que suman</b>: <i>aei</i> (diagonal principal), <i>bfg</i> y <i>cdh</i> (las dos «diagonales rotas» paralelas a ella).</li>" +
    "<li><b>Los tres que restan</b>: <i>ceg</i> (diagonal secundaria), <i>bdi</i> y <i>afh</i> (sus paralelas rotas).</li>" +
    "</ul>" +
    ejemplo("Sarrus con un cero y un negativo",
      "Calcula |A| con A = " + M([[2, 1, 3], [0, -1, 4], [1, 2, -2]]) + ".",
      ["Productos que suman: aei = 2·(−1)·(−2) = 4; bfg = 1·4·1 = 4; cdh = 3·0·2 = 0. Suma: <b>8</b>.",
       "Productos que restan: ceg = 3·(−1)·1 = −3; bdi = 1·0·(−2) = 0; afh = 2·4·2 = 16. Suma: <b>13</b>.",
       "|A| = 8 − 13 = <b>−5</b>. Distinto de 0: A tiene inversa."]) +
    ejemplo("Sarrus con muchos negativos",
      "Calcula |B| con B = " + M([[-1, 2, 3], [4, 0, -2], [1, -3, 5]]) + ".",
      ["Suman: aei = (−1)·0·5 = 0; bfg = 2·(−2)·1 = −4; cdh = 3·4·(−3) = −36. Suma: <b>−40</b>.",
       "Restan: ceg = 3·0·1 = 0; bdi = 2·4·5 = 40; afh = (−1)·(−2)·(−3) = −6. Suma: <b>34</b>.",
       "|B| = (−40) − 34 = <b>−74</b>. Cuidado: restar 34 a −40 da −74, no −6."]) +
    ojo("Sarrus <b>solo vale para 3×3</b>. En una 4×4 aplicarlo «por analogía» da un número inventado. Para 4×4 se hacen ceros o se desarrolla por adjuntos (sección 7). Y antes de aplicar Sarrus mira si hay una fila con muchos ceros: con los ceros desaparecen casi todos los productos.");

  // ---------------------------------------------------------------- 4. Propiedades
  secciones[3] =
    "<h5>Las propiedades, ordenadas por lo que permiten hacer</h5>" +
    "<p>Las siete propiedades del apartado anterior se agrupan en tres usos. Memorízalas así, no como una lista suelta.</p>" +
    tabla(["Operación sobre A", "Efecto sobre |A|", "Ejemplo"], [
      ["Intercambiar dos filas (o columnas)", "cambia de signo", "|A| = 4 → −4"],
      ["Multiplicar <b>una</b> fila por k", "queda multiplicado por k", "fila ×3: |A| = 4 → 12"],
      ["Multiplicar <b>toda</b> la matriz n×n por k", "queda multiplicado por kⁿ", "3×3 con k = 2: |A| = 4 → 32"],
      ["Sumar a una fila un múltiplo de otra", "no cambia", "F₂ ← F₂ + 5F₁: sigue valiendo 4"],
      ["Trasponer", "no cambia", "|Aᵗ| = |A|"],
      ["Multiplicar matrices", "|AB| = |A|·|B|", "|A| = 2, |B| = 3 → |AB| = 6"],
      ["Invertir (si |A| ≠ 0)", "|A⁻¹| = 1/|A|", "|A| = 4 → 1/4"],
      ["Dos filas iguales o proporcionales, o una fila de ceros", "vale 0", "—"]
    ]) +
    "<p>Dos consecuencias que se usan constantemente: <b>|Aⁿ| = |A|ⁿ</b> (potencia entera, también negativa) y que el determinante de una matriz <b>triangular</b> (o diagonal) es el producto de los elementos de su diagonal principal. Este último hecho es la meta de «hacer ceros»: se transforma la matriz en triangular con operaciones que no cambian |A| (o cuyo efecto se controla) y se multiplica la diagonal.</p>" +
    "<h5>Problemas del tipo «si |A| = 3, calcula…»</h5>" +
    "<p>Son clásicos de la EvAU. El método no cambia: <b>descompón la expresión en factores</b>, aplica la regla de cada factor y no olvides que un número k que multiplica a una matriz n×n sale elevado a <b>n</b>.</p>" +
    ejemplo("|2A⁻¹Aᵗ| con A de orden 3",
      "Sea A una matriz 3×3 con |A| = 3. Calcula |2A⁻¹Aᵗ|.",
      ["El 2 multiplica a una matriz 3×3: sale como 2³ = 8.",
       "|2A⁻¹Aᵗ| = 2³·|A⁻¹|·|Aᵗ| = 8·(1/3)·3.",
       "Resultado: <b>8</b>. (Obsérvalo: |A⁻¹|·|Aᵗ| = (1/|A|)·|A| = 1, así que solo queda el 2³.)"]) +
    ejemplo("Potencias y signos",
      "Sea A de orden 3 con |A| = −2. Calcula |3A²| y |(−A)⁻¹|.",
      ["|3A²| = 3³·|A|² = 27·(−2)² = 27·4 = <b>108</b>. Se eleva al cuadrado <i>antes</i> de multiplicar: (−2)² = +4.",
       "|−A| = (−1)³·|A| = −(−2) = 2, luego |(−A)⁻¹| = 1/2 = <b>0,5</b>."]) +
    ejemplo("Operaciones por filas: ¿cuánto vale el nuevo determinante?",
      "Sea |A| = 4 con filas F₁, F₂, F₃ (A de orden 3). Calcula el determinante de la matriz que tiene por filas 2F₁, F₃ y F₂ + 5F₁.",
      ["Saca el 2 de la primera fila: 2·|F₁, F₃, F₂ + 5F₁|.",
       "En la tercera fila, F₂ + 5F₁ → F₂ (restar 5 veces la primera no cambia nada): 2·|F₁, F₃, F₂|.",
       "Intercambiar F₂ y F₃ cambia el signo: 2·(−|F₁, F₂, F₃|) = 2·(−4) = <b>−8</b>."]) +
    ejemplo("Hacer ceros en un 4×4",
      "Calcula " + T([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]) + ".",
      ["Suma a la columna 1 las otras tres: cada fila suma 1 + 2 + 3 + 4 = 10. La nueva columna 1 es (10, 10, 10, 10). Esta operación no cambia |A|.",
       "Saca 10 de la primera columna: queda 10 · det con primera columna (1, 1, 1, 1).",
       "Resta la fila 1 a las filas 2, 3 y 4 (tampoco cambia |A|): las filas son (0, 1, 1, −3), (0, 2, −2, −2), (0, −1, −1, −1).",
       "Desarrolla por la columna 1 (solo queda el 1 de arriba): 10·" + T([[1, 1, -3], [2, -2, -2], [-1, -1, -1]]) + ". Por Sarrus vale 10 − (−6) = 16.",
       "|A| = 10·16 = <b>160</b>."]) +
    ejemplo("Cero sin calcular nada",
      "Demuestra sin desarrollar que " + T([[1, "a", "b + c"], [1, "b", "a + c"], [1, "c", "a + b"]]) + " = 0.",
      ["Suma a la tercera columna la segunda: C₃ ← C₃ + C₂. No cambia el determinante.",
       "La tercera columna pasa a ser (a + b + c, a + b + c, a + b + c) = (a + b + c)·(1, 1, 1): es proporcional a la primera.",
       "Dos columnas proporcionales ⟹ determinante <b>0</b>. ∎"]) +
    "<h5>Probar las propiedades tú mismo</h5>" +
    "<p>Este aplicador hace las operaciones por filas y comprueba, cada vez, que el determinante cambia como predice la regla. Prueba con k = 0 (¿qué pasa al multiplicar una fila por 0?), con a = b (fila repetida) y con la matriz triangular.</p>" +
    w("det_props") +
    "<h5>La calculadora del «si |A| = …»</h5>" +
    "<p>Compón una expresión de la forma |k·Aᵖ·(Aᵗ)ᵠ·B| y mira cómo cada regla va entrando. Fíjate en tres cosas: el orden n cambia el efecto de k; los exponentes de A y Aᵗ se suman (|Aᵗ| = |A|); y con p negativo hace falta |A| ≠ 0 (pon |A| = 0 para verlo).</p>" +
    w("det_calc") +
    ojo("Tres errores de manual: (1) |kA| = k|A| (es kⁿ|A|); (2) |A + B| = |A| + |B| (falso en general); (3) «el determinante de A⁻¹ es −|A|» o «es |A|⁻¹ con signo cambiado» (es 1/|A|, sin cambio de signo).");

  // ---------------------------------------------------------------- 5. Rango
  secciones[4] =
    "<h5>Rango por menores: el método de la EvAU</h5>" +
    "<p>Un <b>menor de orden r</b> es el determinante de una submatriz r×r que se forma eligiendo r filas y r columnas. El rango de A es el <b>mayor orden r de un menor distinto de 0</b>. Para no calcular todos los menores se procede «<b>orlando</b>»:</p>" +
    "<ol>" +
    "<li>Busca un menor de orden 1 distinto de 0 (cualquier elemento no nulo): rg ≥ 1.</li>" +
    "<li>Busca un menor de orden 2 no nulo que lo contenga: rg ≥ 2. Si todos los menores de orden 2 son 0, rg = 1 y has terminado.</li>" +
    "<li>Añade (<b>orla</b>) a ese menor una fila y una columna más y calcula los menores de orden 3 así formados. Si alguno es distinto de 0: rg ≥ 3. Si <b>todos</b> los orlados valen 0, rg = 2 (no hace falta mirar otros menores de orden 3).</li>" +
    "<li>Repite mientras la matriz tenga filas y columnas suficientes.</li>" +
    "</ol>" +
    "<p>Si A es cuadrada n×n el atajo es directo: rg(A) = n ⟺ |A| ≠ 0. Por eso, con un parámetro, <b>solo hay que ver qué pasa en los valores que anulan |A|</b>.</p>" +
    ejemplo("Rango de una 3×3 según un parámetro",
      "Discute el rango de " + M([[1, 2, -1], [2, "a", -2], [3, 6, "a"]]) + " según los valores de a.",
      ["Por Sarrus: suman a·a·1 = a², 2·(−2)·3 = −12 y (−1)·2·6 = −12 (total a² − 24); restan (−1)·a·3 = −3a, 2·2·a = 4a y 1·(−2)·6 = −12 (total a − 12). Entonces |A| = a² − 24 − (a − 12) = a² − a − 12 = (a − 4)(a + 3).",
       "Si <b>a ≠ 4 y a ≠ −3</b>: |A| ≠ 0 y <b>rg(A) = 3</b>.",
       "Si <b>a = 4</b>: las filas son (1, 2, −1), (2, 4, −2), (3, 6, 4). Las dos primeras son proporcionales, pero el menor " + T([[1, -1], [3, 4]]) + " = 4 + 3 = 7 ≠ 0. Luego <b>rg(A) = 2</b>.",
       "Si <b>a = −3</b>: filas (1, 2, −1), (2, −3, −2), (3, 6, −3). La tercera es 3·F₁, y el menor " + T([[1, 2], [2, -3]]) + " = −3 − 4 = −7 ≠ 0. Luego <b>rg(A) = 2</b>."]) +
    ejemplo("Rango de una 3×4 por menores orlados",
      "Calcula el rango de " + M([[1, 0, 2, 1], [2, 1, 3, 0], [3, 1, "a", 1]]) + " según a.",
      ["Menor de orden 2 no nulo: " + T([[1, 0], [2, 1]]) + " = 1 ≠ 0. Luego rg ≥ 2.",
       "Orlamos con la columna 3 y la fila 3: el menor de las tres primeras columnas vale " + T([[1, 0, 2], [2, 1, 3], [3, 1, "a"]]) + " = a − 5.",
       "Si <b>a ≠ 5</b>: hay un menor de orden 3 no nulo, <b>rg(A) = 3</b> (el máximo posible en una 3×4).",
       "Si <b>a = 5</b>: hay que mirar los <i>otros</i> menores orlados, los que usan la columna 4: con columnas (1, 2, 4) el menor vale 0, con (1, 3, 4) vale 0, con (2, 3, 4) vale 0. Todos los menores de orden 3 son 0: <b>rg(A) = 2</b>."]) +
    ojo("No dejes sin comprobar el valor singular: decir «si a = 5, el rango es 2» sin mirar los demás menores de orden 3 es un error de razonamiento. En una cuadrada basta |A| = 0; en una <b>no cuadrada</b> hay que revisar todos los menores orlados (o triangular por Gauss).");

  // ---------------------------------------------------------------- 6. Inversa
  secciones[5] =
    "<h5>La inversa por adjuntos, paso a paso</h5>" +
    "<p>La receta tiene cuatro pasos, siempre en este orden, y cada uno es una fuente típica de error:</p>" +
    "<ol>" +
    "<li><b>Comprueba |A| ≠ 0.</b> Si es 0, no hay inversa y has terminado.</li>" +
    "<li><b>Calcula los menores</b> M<sub>ij</sub> (determinantes que quedan al tachar la fila i y la columna j) y ponles su signo (−1)<sup>i+j</sup> → <b>adjuntos</b> A<sub>ij</sub>. Con ellos formas Adj(A).</li>" +
    "<li><b>Traspón</b>: Adj(A)ᵗ. (El paso que más se olvida.)</li>" +
    "<li><b>Divide</b> entre |A|: A⁻¹ = Adj(A)ᵗ / |A|.</li>" +
    "</ol>" +
    ejemplo("Inversa 3×3 con determinante −22",
      "Halla la inversa de A = " + M([[1, 2, 0], [3, 1, 2], [0, 1, 4]]) + ".",
      ["|A| = 1·1·4 + 2·2·0 + 0·3·1 − (0·1·0 + 2·3·4 + 1·2·1) = 4 − 26 = <b>−22</b> ≠ 0.",
       "Adjuntos: A₁₁ = " + T([[1, 2], [1, 4]]) + " = 2; A₁₂ = −" + T([[3, 2], [0, 4]]) + " = −12; A₁₃ = " + T([[3, 1], [0, 1]]) + " = 3.",
       "A₂₁ = −" + T([[2, 0], [1, 4]]) + " = −8; A₂₂ = " + T([[1, 0], [0, 4]]) + " = 4; A₂₃ = −" + T([[1, 2], [0, 1]]) + " = −1.",
       "A₃₁ = " + T([[2, 0], [1, 2]]) + " = 4; A₃₂ = −" + T([[1, 0], [3, 2]]) + " = −2; A₃₃ = " + T([[1, 2], [3, 1]]) + " = −5.",
       "Adj(A) = " + M([[2, -12, 3], [-8, 4, -1], [4, -2, -5]]) + ", y su traspuesta Adj(A)ᵗ = " + M([[2, -8, 4], [-12, 4, -2], [3, -1, -5]]) + ".",
       "A⁻¹ = (1/−22)·Adj(A)ᵗ = " + M([[fr("−1", "11"), fr("4", "11"), fr("−2", "11")], [fr("6", "11"), fr("−2", "11"), fr("1", "11")], [fr("−3", "22"), fr("1", "22"), fr("5", "22")]]) + "."]) +
    ejemplo("Cuando |A| = 1 la inversa sale entera",
      "Halla la inversa de " + M([[1, 2, 3], [0, 1, 4], [5, 6, 0]]) + ".",
      ["|A| = 0 + 40 + 0 − (15 + 24 + 0) = 40 − 39 = <b>1</b>. Al dividir entre 1 no aparecen fracciones.",
       "Adj(A)ᵗ = " + M([[-24, 18, 5], [20, -15, -4], [-5, 4, 1]]) + " y por tanto A⁻¹ es esa misma matriz.",
       "Comprobación de una fila: (1, 2, 3)·(−24, 20, −5) = −24 + 40 − 15 = 1 ✓ (primer elemento de A·A⁻¹ = I)."]) +
    "<p>Pruébalo con distintas matrices, incluida una singular. Pulsa los cuatro pasos y fíjate en cómo el paso ③ coloca cada adjunto en la posición contraria:</p>" +
    w("det_adjuntos", "inversa") +
    "<h5>Ecuaciones matriciales: el orden importa</h5>" +
    "<p>Como el producto de matrices <b>no es conmutativo</b>, multiplicar por A⁻¹ hay que hacerlo <b>por el mismo lado</b> en los dos miembros: de AX = B se obtiene X = A⁻¹B (A⁻¹ a la izquierda); de XA = B se obtiene X = BA⁻¹ (A⁻¹ a la derecha). Si hay que sacar factor común, también por el lado correcto: XA + 2X = B ⟹ X(A + 2I) = B (nunca X(A + 2) porque 2 no es una matriz).</p>" +
    ejemplo("AX = B y XA = B con la misma A",
      "Sean A = " + M([[1, 2], [3, 5]]) + " y B = " + M([[1, 0], [2, 1]]) + ". Resuelve AX = B y XA = B.",
      ["|A| = 5 − 6 = −1 y A⁻¹ = (1/−1)·" + M([[5, -2], [-3, 1]]) + " = " + M([[-5, 2], [3, -1]]) + ".",
       "AX = B ⟹ X = A⁻¹B = " + M([[-5, 2], [3, -1]]) + M([[1, 0], [2, 1]]) + " = " + M([[-1, 2], [1, -1]]) + ".",
       "XA = B ⟹ X = BA⁻¹ = " + M([[1, 0], [2, 1]]) + M([[-5, 2], [3, -1]]) + " = " + M([[-5, 2], [-7, 3]]) + ".",
       "Son matrices distintas: cambiar el lado de A⁻¹ cambia el resultado."]) +
    ojo("Recuerda que (AB)⁻¹ = B⁻¹A⁻¹ (se invierte el orden) y que (Aᵗ)⁻¹ = (A⁻¹)ᵗ. Y que el atajo «A⁻¹ = 1/A» no existe: no se divide entre una matriz.");

  B.parte.m2t2a = { secciones: secciones };
})(window);
