/* ============================================================
   Matemáticas II · ampliaciones · Tema 2: Determinantes
   (parte B: secciones nuevas 7 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  var D = B.lab.det, M = D.mat, T = D.dtm;
  function w(n, ref) { return H.w(n, ref && "mates2/t2/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Desarrollo por adjuntos y determinantes de orden 4",
      html:
        "<h5>Menor, adjunto y signo</h5>" +
        "<p>Para un elemento a<sub>ij</sub> de una matriz n×n:</p>" +
        "<ul>" +
        "<li>Su <b>menor</b> M<sub>ij</sub> es el determinante (de orden n − 1) que queda al <b>tachar la fila i y la columna j</b>.</li>" +
        "<li>Su <b>adjunto</b> es A<sub>ij</sub> = (−1)<sup>i+j</sup>·M<sub>ij</sub>. El signo sigue el «tablero de ajedrez» con + en la esquina superior izquierda: el signo de a<sub>ij</sub> es + si i + j es par y − si es impar.</li>" +
        "</ul>" +
        "<div class='formula-wrap'><div class='formula'>|A| = a<sub>i1</sub>A<sub>i1</sub> + a<sub>i2</sub>A<sub>i2</sub> + … + a<sub>in</sub>A<sub>in</sub> &nbsp; (por la fila i) &nbsp;·&nbsp; |A| = a<sub>1j</sub>A<sub>1j</sub> + … + a<sub>nj</sub>A<sub>nj</sub> &nbsp; (por la columna j)</div></div>" +
        "<p>Vale <b>cualquier fila o columna</b> y siempre da el mismo número. Elige la que tenga <b>más ceros</b>: cada cero elimina un determinante entero que habría que calcular.</p>" +
        ejemplo("Desarrollo de un 3×3 por la primera fila",
          "Calcula " + T([[2, 1, 0], [1, 3, 1], [0, 1, 2]]) + " por adjuntos.",
          ["Primera fila: |A| = 2·A₁₁ + 1·A₁₂ + 0·A₁₃.",
           "A₁₁ = +" + T([[3, 1], [1, 2]]) + " = 6 − 1 = 5. A₁₂ = −" + T([[1, 1], [0, 2]]) + " = −(2 − 0) = −2.",
           "|A| = 2·5 + 1·(−2) + 0 = 10 − 2 = <b>8</b>. El tercer término ni se calcula, porque a₁₃ = 0.",
           "Comprobación con Sarrus: (12 + 0 + 0) − (0 + 2 + 2) = 12 − 4 = 8 ✓."]) +
        "<h5>Determinantes de orden 4 en la EvAU</h5>" +
        "<p>En la prueba casi siempre aparecen con <b>muchos ceros</b> o con una estructura que permite hacerlos. Hay dos movimientos que se combinan:</p>" +
        "<ol><li><b>Hacer ceros</b> en una columna (o fila) con operaciones «F<sub>i</sub> ← F<sub>i</sub> + k·F<sub>j</sub>», que no cambian el determinante.</li>" +
        "<li><b>Desarrollar</b> por esa columna: solo sobrevive un término, y el determinante pasa a ser de orden 3.</li></ol>" +
        ejemplo("Un 4×4 haciendo ceros",
          "Calcula " + T([[1, 2, -1, 3], [2, 5, 0, 1], [-1, 0, 3, 2], [3, 1, 2, 4]]) + ".",
          ["La columna 1 empieza por 1: úsala de pivote. F₂ ← F₂ − 2F₁, F₃ ← F₃ + F₁, F₄ ← F₄ − 3F₁.",
           "Nuevas filas: (0, 1, 2, −5), (0, 2, 2, 5), (0, −5, 5, −5). La primera fila queda (1, 2, −1, 3).",
           "Desarrollo por la columna 1: solo cuenta el 1 de la posición (1,1), con signo +: |A| = 1·" + T([[1, 2, -5], [2, 2, 5], [-5, 5, -5]]) + ".",
           "Por Sarrus: suman −10 − 50 − 50 = −110; restan 50 − 20 + 25 = 55. El determinante 3×3 vale −110 − 55 = −165.",
           "|A| = <b>−165</b>."]) +
        ejemplo("Un 4×4 con una columna casi vacía",
          "Calcula " + T([[2, 0, 1, 3], [1, 2, 0, 1], [0, 1, 0, 2], [3, 0, 0, 1]]) + ".",
          ["La columna 3 es (1, 0, 0, 0): un solo elemento no nulo, a₁₃ = 1, con signo (−1)<sup>1+3</sup> = +.",
           "|A| = 1·" + T([[1, 2, 1], [0, 1, 2], [3, 0, 1]]) + " (tachando la fila 1 y la columna 3).",
           "Sarrus: (1 + 12 + 0) − (3 + 0 + 0) = 13 − 3 = 10. Luego |A| = <b>10</b>."]) +
        "<p>Prueba el desarrollo con el simulador: elige una fila o columna y comprueba que el resultado no cambia, pero el trabajo sí. Con la 4×4, mira qué línea tiene más ceros.</p>" +
        w("det_adjuntos", "desarrollo") +
        "<h5>Una curiosidad que explica la inversa</h5>" +
        "<p>Si multiplicas los elementos de una fila por los adjuntos de <b>otra</b> fila distinta, la suma da <b>0</b>: es como desarrollar el determinante de una matriz con dos filas iguales. Por ejemplo, en la matriz anterior: 2·A₂₁ + 1·A₂₂ + 0·A₂₃ = 2·(−2) + 1·4 + 0 = 0. Esta propiedad es la razón de que A·Adj(A)ᵗ = |A|·I y, de ahí, A⁻¹ = Adj(A)ᵗ/|A|.</p>" +
        ojo("Los errores de signo en el tablero son los más frecuentes: el elemento a₁₂ lleva signo <b>menos</b>, a₂₁ también, y a₂₂ lleva más. Escribe el tablero de signos al lado de la matriz antes de empezar.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Determinantes con parámetro: ¿cuándo vale 0?",
      html:
        "<p>Es el esquema de casi todos los problemas de determinantes de la EvAU: una matriz con un parámetro (m, a, k…) y varias preguntas que se responden con <b>el mismo determinante</b>.</p>" +
        tabla(["Paso", "Qué hacer"], [
          ["1", "Calcula |A(m)| (Sarrus u otro método) y <b>factorízalo</b>."],
          ["2", "Resuelve |A(m)| = 0: los valores que salgan son los <b>valores singulares</b>."],
          ["3", "Para cualquier otro m: |A| ≠ 0 ⟹ tiene inversa y rg = n (orden de la matriz)."],
          ["4", "Para <b>cada</b> valor singular, sustituye y estudia el rango por separado (menores)."]
        ]) +
        "<p>Para factorizar un polinomio de grado 3 usa Ruffini probando como raíces los divisores del término independiente (±1, ±2, …). Si sale una raíz doble, el factor aparece al cuadrado: eso <i>no</i> añade valores singulares, pero conviene detectarla.</p>" +
        ejemplo("Inversa, rango y una inversa concreta",
          "Sea A(m) = " + M([[1, 1, "m"], [1, "m", 1], ["m", 1, 1]]) + ". (a) ¿Para qué m tiene inversa? (b) Calcula el rango en los valores singulares. (c) Halla A(0)⁻¹.",
          ["(a) Sarrus: suman m + m + m = 3m; restan m·m·m + 1 + 1 = m³ + 2. Luego |A| = −m³ + 3m − 2 = −(m³ − 3m + 2).",
           "Ruffini con m = 1: 1 + 0 − 3 + 2 = 0 ✓. m³ − 3m + 2 = (m − 1)(m² + m − 2) = (m − 1)²(m + 2). Por tanto |A| = −(m − 1)²(m + 2).",
           "Tiene inversa si <b>m ≠ 1 y m ≠ −2</b>.",
           "(b) Con m = 1 todas las filas son (1, 1, 1): <b>rg = 1</b>. Con m = −2: " + M([[1, 1, -2], [1, -2, 1], [-2, 1, 1]]) + ", y el menor " + T([[1, 1], [1, -2]]) + " = −3 ≠ 0, así que <b>rg = 2</b> (el 3×3 vale 0).",
           "(c) A(0) = " + M([[1, 1, 0], [1, 0, 1], [0, 1, 1]]) + " con |A| = −2. Adj(A)ᵗ = " + M([[-1, -1, 1], [-1, 1, -1], [1, -1, -1]]) + " y A(0)⁻¹ = (1/−2)·Adj(A)ᵗ = " + M([[fr("1", "2"), fr("1", "2"), fr("−1", "2")], [fr("1", "2"), fr("−1", "2"), fr("1", "2")], [fr("−1", "2"), fr("1", "2"), fr("1", "2")]]) + "."]) +
        ejemplo("Resolver una ecuación con un determinante",
          "Resuelve " + T([[1, 1, 1], ["x", 2, 3], ["x²", 4, 9]]) + " = 0.",
          ["Sarrus: suman 18 + 3x² + 4x; restan 2x² + 9x + 12.",
           "Determinante: x² − 5x + 6 = (x − 2)(x − 3). Las soluciones son <b>x = 2</b> y <b>x = 3</b>.",
           "Se podía prever: con x = 2 la primera columna es (1, 2, 4), igual que la segunda; con x = 3 es (1, 3, 9), igual que la tercera. Es un determinante de Vandermonde."]) +
        ejemplo("Otra matriz con parámetro",
          "¿Para qué valores de a tiene inversa " + M([["a", 2, 1], [1, "a", 0], [0, 1, 1]]) + "?",
          ["Sarrus: suman a² + 0 + 1; restan 0 + 2 + 0. |A| = a² + 1 − 2 = a² − 1 = (a − 1)(a + 1).",
           "Tiene inversa para todo <b>a ≠ 1 y a ≠ −1</b>."]) +
        "<p>Mueve el parámetro y observa dónde la curva |A(m)| corta al eje: en ese instante el rango baja y la inversa desaparece. Hay cuatro matrices; en la primera la raíz m = 1 es doble (la curva solo «toca» el eje).</p>" +
        w("det_param") +
        ojo("Un error frecuente: dividir entre un factor que puede valer 0. Si escribes «m(m − 1) = m ⟹ m − 1 = 1», pierdes la solución m = 0. Factoriza e iguala a 0 cada factor, en vez de simplificar.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Interpretación geométrica: área, volumen y orientación",
      html:
        "<p>Si las filas de una matriz son vectores, su determinante mide algo muy concreto: el <b>área</b> (en el plano) o el <b>volumen</b> (en el espacio) de la figura que forman, <b>con signo</b>.</p>" +
        tabla(["Situación", "Fórmula", "Interpretación del 0"], [
          ["Paralelogramo de lados u, v (plano)", "Área = |det(u, v)|", "u y v proporcionales"],
          ["Triángulo de vértices A, B, C", "Área = ½·|det(AB, AC)|", "A, B, C alineados"],
          ["Paralelepípedo de aristas u, v, w", "Volumen = |det(u, v, w)|", "u, v, w coplanarios"],
          ["Tetraedro de aristas u, v, w", "Volumen = ⅙·|det(u, v, w)|", "los 4 puntos son coplanarios"]
        ]) +
        "<p>El <b>signo</b> es la orientación: en el plano, det(u, v) &gt; 0 si para ir de u a v se gira en sentido antihorario; al cambiar el orden, el signo cambia (justo la propiedad de intercambiar filas). En el espacio, det(u, v, w) &gt; 0 si la terna es «directa» (regla de la mano derecha).</p>" +
        w("det_geom") +
        ejemplo("Área de un triángulo",
          "Calcula el área del triángulo de vértices A(1, 1), B(5, 2), C(2, 6).",
          ["AB = (4, 1) y AC = (1, 5).",
           "det(AB, AC) = " + T([[4, 1], [1, 5]]) + " = 20 − 1 = 19.",
           "Área = ½·|19| = <b>19/2 = 9,5</b> unidades cuadradas."]) +
        ejemplo("Tres puntos alineados",
          "¿Para qué valor de k están alineados A(1, 2), B(3, k) y C(−1, −4)?",
          ["Alineados ⟺ el triángulo tiene área 0 ⟺ " + T([[1, 2, 1], [3, "k", 1], [-1, -4, 1]]) + " = 0.",
           "Por Sarrus: suman k − 2 − 12 = k − 14; restan −k + 6 − 4 = −k + 2. El determinante es (k − 14) − (−k + 2) = 2k − 16.",
           "2k − 16 = 0 ⟹ <b>k = 8</b>. Comprobación: pendientes AB = (8 − 2)/(3 − 1) = 3 y AC = (−4 − 2)/(−1 − 1) = 3 ✓."]) +
        ejemplo("Volumen de un paralelepípedo y de un tetraedro",
          "Sean u = (1, 2, 0), v = (0, 1, 3), w = (2, 0, 1). Calcula el volumen del paralelepípedo y del tetraedro que determinan.",
          ["det(u, v, w) = " + T([[1, 2, 0], [0, 1, 3], [2, 0, 1]]) + ". Sarrus: suman 1 + 12 + 0 = 13; restan 0 + 0 + 0 = 0. El determinante vale 13.",
           "Volumen del paralelepípedo = |13| = <b>13</b> u³.",
           "Volumen del tetraedro = 13/6 ≈ <b>2,17</b> u³ (un sexto del paralelepípedo)."]) +
        ejemplo("¿Cuatro puntos coplanarios?",
          "Estudia si A(1, 0, 0), B(0, 1, 0), C(0, 0, 1) y D(2, 2, −3) están en un mismo plano.",
          ["AB = (−1, 1, 0), AC = (−1, 0, 1), AD = (1, 2, −3).",
           "det(AB, AC, AD) = " + T([[-1, 1, 0], [-1, 0, 1], [1, 2, -3]]) + " = (0 + 1 + 0) − (0 − 2 + 3) = 1 − 1 = 0.",
           "Determinante 0 ⟹ los cuatro puntos son <b>coplanarios</b> (están en el plano x + y + z = 1)."])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Problemas tipo EvAU resueltos",
      html:
        ejemplo("Problema 1 · Propiedades sin conocer las matrices",
          "Sean A y B matrices 3×3 con |A| = 2 y |B| = −3. Calcula |3A⁻¹B²|, |AᵗB⁻¹| y |Adj(A)|.",
          ["|3A⁻¹B²| = 3³·|A⁻¹|·|B|² = 27·(1/2)·9 = <b>243/2</b>.",
           "|AᵗB⁻¹| = |A|·(1/|B|) = 2·(−1/3) = <b>−2/3</b>.",
           "Como A·Adj(A)ᵗ = |A|·I, tomando determinantes: |A|·|Adj(A)| = |A|³, luego |Adj(A)| = |A|² = <b>4</b> (en general |Adj A| = |A|<sup>n−1</sup>)."]) +
        ejemplo("Problema 2 · Una matriz con parámetro",
          "Sea B(m) = " + M([[1, "m", 0], [0, 1, "m"], ["m", 0, 1]]) + ". (a) ¿Para qué m existe B⁻¹? (b) Rango en el valor singular. (c) B(1)⁻¹.",
          ["(a) Sarrus: suman 1 + m³ + 0; restan 0. |B| = 1 + m³ = (m + 1)(m² − m + 1).",
           "El factor m² − m + 1 no tiene raíces reales (discriminante 1 − 4 &lt; 0). Luego |B| = 0 solo si <b>m = −1</b>: existe B⁻¹ para todo m ≠ −1.",
           "(b) Con m = −1: " + M([[1, -1, 0], [0, 1, -1], [-1, 0, 1]]) + ". El menor " + T([[1, -1], [0, 1]]) + " = 1 ≠ 0 y |B| = 0: <b>rg = 2</b>.",
           "(c) m = 1: " + M([[1, 1, 0], [0, 1, 1], [1, 0, 1]]) + ", |B| = 2. Adjuntos y traspuesta dan B(1)⁻¹ = " + M([[fr("1", "2"), fr("−1", "2"), fr("1", "2")], [fr("1", "2"), fr("1", "2"), fr("−1", "2")], [fr("−1", "2"), fr("1", "2"), fr("1", "2")]]) + "."]) +
        ejemplo("Problema 3 · Ecuación matricial",
          "Sea A = " + M([[1, 2], [3, 4]]) + ". Halla X con XA − 2X = I.",
          ["Saca X factor común <b>por la izquierda</b>: X(A − 2I) = I. (No vale X(A − 2), porque 2 no es una matriz.)",
           "A − 2I = " + M([[-1, 2], [3, 2]]) + ", con |A − 2I| = −2 − 6 = −8 ≠ 0, así que tiene inversa.",
           "X = (A − 2I)⁻¹ = (1/−8)·" + M([[2, -2], [-3, -1]]) + " = " + M([[fr("−1", "4"), fr("1", "4")], [fr("3", "8"), fr("1", "8")]]) + "."]) +
        ejemplo("Problema 4 · Razonamientos con determinantes",
          "(a) Si Aᵗ = −A y A es 3×3, demuestra que |A| = 0. (b) Si A² = A, ¿qué valores puede tener |A|?",
          ["(a) |Aᵗ| = |A|, y también |−A| = (−1)³|A| = −|A|. Entonces |A| = −|A| ⟹ 2|A| = 0 ⟹ <b>|A| = 0</b>. (Para orden par no sale: ahí |−A| = |A|.)",
           "(b) |A²| = |A|² = |A| ⟹ |A|(|A| − 1) = 0 ⟹ <b>|A| = 0 o |A| = 1</b>."]) +
        ejemplo("Problema 5 · Área con parámetro",
          "Los puntos O(0, 0), P(m, 2) y Q(3, m) forman un triángulo de área 2. Halla m.",
          ["Área = ½·|" + T([["m", 2], [3, "m"]]) + "| = ½·|m² − 6|.",
           "½·|m² − 6| = 2 ⟹ |m² − 6| = 4 ⟹ m² − 6 = 4 o m² − 6 = −4 ⟹ m² = 10 o m² = 2.",
           "Soluciones: <b>m = ±√10 ≈ ±3,16</b> y <b>m = ±√2 ≈ ±1,41</b> (cuatro valores)."])
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para calcular una inversa.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "props") + w("clasificar", "cero") + w("orden", "inversa")
    }
  ];

  B.parte.m2t2b = { nuevas: nuevas };
})(window);
