/* ============================================================
   Matemáticas I · ampliaciones · Tema 9: Funciones elementales
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t9/" + ref); }

  var resumen = [
    "Una función asigna a cada x del <b>dominio</b> un único y. Se puede dar con enunciado, tabla, fórmula o gráfica. Test de la recta vertical: ninguna vertical corta a la gráfica más de una vez.",
    "<b>Dominio</b>: se excluyen los x que anulan un denominador, hacen negativo el radicando de una raíz par o dan un argumento ≤ 0 en un logaritmo. El <b>recorrido</b> se lee en el eje Y.",
    "Se estudia una función con una ficha: dominio, recorrido, cortes con los ejes, signo, crecimiento, extremos, simetría (par/impar), periodicidad y asíntotas.",
    "<b>Afín</b> y = mx + n · <b>cuadrática</b> a(x − h)² + k, vértice x = −b/2a · <b>inversa</b> k/x (hipérbola) · <b>raíz</b> · <b>valor absoluto</b> y <b>a trozos</b> · <b>exponencial</b> aˣ y <b>logaritmo</b> logₐx · <b>trigonométricas</b> A·sen(B(x − C)) + D.",
    "Transformaciones: f(x) + k sube, f(x − h) desplaza a la derecha, a·f(x) estira, −f(x) refleja en el eje X, f(−x) en el eje Y. Composición (f∘g)(x) = f(g(x)); la inversa f⁻¹ es el reflejo respecto a y = x.",
    "Para elegir el modelo: Δy constante → afín · Δ²y constante → cuadrática · cociente constante → exponencial · producto x·y constante → proporcionalidad inversa."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es una función
  secciones[0] =
    "<h5>Cuatro maneras de dar una misma función</h5>" +
    "<p>Una función puede presentarse de cuatro formas distintas, y saber pasar de una a otra es la mitad del tema. Todas dicen lo mismo, pero cada una sirve para algo:</p>" +
    tabla(["Forma", "Cómo se ve", "Para qué sirve"], [
      ["Enunciado", "«el taxi cobra 3 € de bajada de bandera más 1,20 € por kilómetro»", "da el significado de las variables"],
      ["Tabla de valores", "x = 0, 1, 2, 3 → y = 3, 4,2, 5,4, 6,6", "valores concretos y comprobaciones"],
      ["Fórmula", "f(x) = 3 + 1,2x", "calcula cualquier valor y permite razonar con álgebra"],
      ["Gráfica", "los puntos (x, f(x)) dibujados en el plano", "se ve la forma de un vistazo: sube, baja, se corta…"]
    ]) +
    "<p>Fíjate en que <b>la fórmula no es la función</b>: la función es la regla de asignación. Por eso hay funciones que se dan sólo con una tabla (la temperatura que midió un termómetro cada hora), otras sólo con una gráfica (un electrocardiograma) y otras que necesitan <i>varias</i> fórmulas, según el tramo (lo verás en las funciones a trozos).</p>" +
    "<h5>El vocabulario que hay que dominar</h5>" +
    "<ul>" +
    "<li><b>Variable independiente</b> (x): la entrada, la que tú eliges. <b>Variable dependiente</b> (y): la salida, lo que resulta.</li>" +
    "<li><b>Imagen</b>: si f(3) = 7, se dice que 7 es la imagen de 3. Y 3 es <b>una antiimagen</b> de 7 (puede haber más de una: en f(x) = x², los números 2 y −2 son antiimágenes de 4).</li>" +
    "<li><b>Dominio</b> Dom(f): todos los x para los que f(x) existe. <b>Recorrido</b> (o imagen) Im(f): todos los valores de y que realmente se alcanzan.</li>" +
    "<li>Escribimos f: ℝ → ℝ para decir «f toma números reales y devuelve números reales»; la flecha ↦ describe la regla: x ↦ x² − 3x.</li>" +
    "</ul>" +
    "<h5>¿Es función o no? La prueba de la recta vertical</h5>" +
    "<p>La condición «a cada x, un único y» tiene una traducción visual inmediata: <b>ninguna recta vertical puede cortar a la gráfica en más de un punto</b>. Si alguna vertical la corta dos veces, a ese x le corresponden dos valores de y y entonces no es una función.</p>" +
    tabla(["Relación", "¿Función?", "Por qué"], [
      ["y = x²", "Sí", "cada x da un solo y"],
      ["x = y² (parábola «tumbada»)", "No", "x = 4 da y = 2 e y = −2"],
      ["x² + y² = 25 (circunferencia)", "No", "x = 3 da y = 4 e y = −4"],
      ["y = √(25 − x²) (semicircunferencia superior)", "Sí", "al elegir la raíz positiva, sólo queda un y"],
      ["parejas (1, 2), (2, 5), (1, 3)", "No", "el 1 tiene dos imágenes distintas: 2 y 3"],
      ["parejas (1, 4), (2, 4), (3, 4)", "Sí", "varios x pueden tener la misma imagen: no importa"]
    ]) +
    ojo("lo que no está permitido es que <b>un x</b> tenga dos imágenes; sí está permitido que <b>dos x</b> distintos tengan la misma imagen (es lo que pasa en y = x² con 2 y −2).") +
    "<h5>Construir una gráfica punto a punto</h5>" +
    ejemplo("Tabla de valores de f(x) = x² − 2x", "Dibuja la gráfica de f(x) = x² − 2x y léela.", [
      "Tabla: x = −1 → f = 1 + 2 = 3 · x = 0 → f = 0 · x = 1 → f = 1 − 2 = −1 · x = 2 → f = 4 − 4 = 0 · x = 3 → f = 9 − 6 = 3.",
      "Puntos: (−1, 3), (0, 0), (1, −1), (2, 0), (3, 3). Se unen con una curva suave: es una parábola con mínimo en (1, −1).",
      "<b>Dominio</b>: ℝ (es un polinomio). <b>Recorrido</b>: [−1, +∞), porque el punto más bajo es y = −1 y la curva sube sin límite.",
      "<b>Cortes con los ejes</b>: con el eje Y: f(0) = 0 → (0, 0). Con el eje X: x² − 2x = 0 → x(x − 2) = 0 → x = 0 y x = 2."
    ]) +
    "<h5>Cortes con los ejes y signo de la función</h5>" +
    "<p>Dos datos que se leen y se calculan siempre:</p>" +
    "<ul><li><b>Corte con el eje Y</b>: se hace x = 0 y se calcula f(0). Como mucho hay <b>uno</b> (si 0 está en el dominio): un x no puede tener dos imágenes.</li>" +
    "<li><b>Cortes con el eje X</b> (<i>ceros</i> o raíces de f): se resuelve f(x) = 0. Puede haber ninguno, uno o muchos.</li></ul>" +
    "<p>El <b>signo</b> de la función indica dónde la gráfica queda por encima (f &gt; 0) o por debajo (f &lt; 0) del eje X. Se organiza en una tabla con los ceros (y los puntos fuera del dominio) como separadores:</p>" +
    ejemplo("Signo de f(x) = x² − 2x", "¿Dónde es positiva y dónde negativa?", [
      "Ceros: x = 0 y x = 2. Dividen la recta en tres intervalos: (−∞, 0), (0, 2) y (2, +∞).",
      "Se prueba un punto de cada intervalo: f(−1) = 3 &gt; 0 · f(1) = −1 &lt; 0 · f(3) = 3 &gt; 0.",
      "<b>Positiva</b> en (−∞, 0) ∪ (2, +∞); <b>negativa</b> en (0, 2); cero en x = 0 y x = 2."
    ]) +
    "<h5>Un ejemplo con contexto: la temperatura de un día</h5>" +
    "<p>La tabla recoge la temperatura de una ciudad: (6 h, 8 °C), (9 h, 12 °C), (12 h, 18 °C), (15 h, 21 °C), (18 h, 17 °C), (21 h, 11 °C). Es una función aunque no tengamos fórmula: a cada hora le corresponde una única temperatura. El <b>dominio</b> es el intervalo de horas observadas [6, 21]; el <b>recorrido</b> aproximado es [8, 21]; el <b>máximo</b> se alcanza hacia las 15 h; la temperatura <b>crece</b> de 6 a 15 h y <b>decrece</b> de 15 a 21 h. Todo eso son propiedades de la función que aprenderás a leer y calcular en este tema.</p>";

  // ---------------------------------------------------------------- 2. Dominio
  secciones[1] =
    "<h5>La tabla de «zonas peligrosas»</h5>" +
    "<p>Para cada tipo de expresión hay una restricción característica. Aprende esta tabla y el cálculo del dominio se convierte en rutina:</p>" +
    tabla(["Tipo de expresión", "Restricción sobre lo de dentro", "Ejemplo", "Dominio"], [
      ["Polinomio", "ninguna", "x³ − 2x + 1", "ℝ"],
      ["Fracción", "el denominador ≠ 0", "1/(x − 3)", "ℝ − {3}"],
      ["Raíz de índice par (√, ⁴√…)", "el radicando ≥ 0", "√(x − 2)", "[2, +∞)"],
      ["Raíz de índice impar (∛…)", "ninguna", "∛(x − 2)", "ℝ"],
      ["Raíz en el denominador", "el radicando &gt; 0 (≥ 0 y además ≠ 0)", "1/√(x − 1)", "(1, +∞)"],
      ["Logaritmo", "el argumento &gt; 0", "ln(x + 1)", "(−1, +∞)"],
      ["Exponencial aˣ (a &gt; 0)", "ninguna", "2ˣ", "ℝ"],
      ["Tangente", "cos x ≠ 0", "tan x", "ℝ − {π/2 + kπ}"],
      ["Potencia de exponente negativo", "como una fracción: base ≠ 0", "x⁻²", "ℝ − {0}"]
    ]) +
    "<h5>Método en cuatro pasos</h5>" +
    "<ol>" +
    "<li><b>Localiza</b> las zonas peligrosas: denominadores, raíces pares y logaritmos.</li>" +
    "<li><b>Escribe</b> la condición de cada una (≠ 0, ≥ 0, &gt; 0).</li>" +
    "<li><b>Resuelve</b> cada condición: ecuación (si es ≠ 0) o inecuación (si es ≥ 0 o &gt; 0). Las inecuaciones de segundo grado se resuelven con la parábola o con una tabla de signos (Tema 3).</li>" +
    "<li><b>Intersecta</b> los resultados: el dominio es el conjunto de x que cumplen <i>todas</i> las condiciones a la vez.</li>" +
    "</ol>" +
    w("dominio") +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Raíz de un trinomio", "Halla el dominio de f(x) = √(x² − 4x + 3).", [
      "Condición: x² − 4x + 3 ≥ 0.",
      "Raíces de x² − 4x + 3 = 0: x = 1 y x = 3. La parábola abre hacia arriba, luego es ≥ 0 <b>fuera</b> de las raíces (y en ellas).",
      "Dom(f) = (−∞, 1] ∪ [3, +∞). (Comprueba: x = 2 daría √(4 − 8 + 3) = √(−1): no existe ✓.)"
    ]) +
    ejemplo("Fracción con trinomio", "Halla el dominio de g(x) = (x + 1)/(x² − x − 6).", [
      "Condición: x² − x − 6 ≠ 0.",
      "x² − x − 6 = 0 → x = (1 ± 5)/2 → x = 3 y x = −2.",
      "Dom(g) = ℝ − {−2, 3}. Observa que el numerador x + 1 no interviene: sólo importa el denominador."
    ]) +
    ejemplo("Raíz de un cociente", "Halla el dominio de h(x) = √((x − 1)/(x + 2)).", [
      "Condiciones: (x − 1)/(x + 2) ≥ 0 y x + 2 ≠ 0.",
      "Tabla de signos con x = 1 (anula el numerador) y x = −2 (anula el denominador): x &lt; −2: (−)/(−) = + ✓ · −2 &lt; x &lt; 1: (−)/(+) = − ✗ · x &gt; 1: (+)/(+) = + ✓.",
      "En x = 1 el cociente vale 0 y √0 = 0 existe: se incluye. En x = −2 no: se excluye.",
      "Dom(h) = (−∞, −2) ∪ [1, +∞)."
    ]) +
    ejemplo("Varias condiciones a la vez", "Halla el dominio de k(x) = ln(x − 1) + √(5 − x).", [
      "Del logaritmo: x − 1 &gt; 0 → x &gt; 1.",
      "De la raíz: 5 − x ≥ 0 → x ≤ 5.",
      "Deben cumplirse las dos: Dom(k) = (1, 5]. (El 1 se excluye y el 5 se incluye.)"
    ]) +
    ejemplo("Raíz en el denominador", "Halla el dominio de f(x) = 1/√(4 − x²).", [
      "Hay una raíz (4 − x² ≥ 0) y está en el denominador (no puede valer 0): 4 − x² &gt; 0.",
      "x² &lt; 4 → −2 &lt; x &lt; 2.",
      "Dom(f) = (−2, 2)."
    ]) +
    "<h5>Dominio de la función y dominio del problema</h5>" +
    "<p>Cuando una función modela una situación real, el dominio matemático puede ser más grande que el dominio con sentido. Por ejemplo, el área de un rectángulo de perímetro 40 con un lado x es A(x) = x(20 − x): matemáticamente es un polinomio (dominio ℝ), pero como x es una longitud, el <b>dominio del problema</b> es (0, 20). Y si la variable es «número de personas», sólo valen los enteros no negativos. Siempre conviene preguntarse qué valores tienen sentido.</p>" +
    "<h5>Los cuatro errores de dominio más frecuentes</h5>" +
    "<ul>" +
    "<li><b>Simplificar antes de calcular el dominio.</b> f(x) = (x² − 1)/(x − 1) se simplifica a x + 1, pero su dominio es ℝ − {1}, no ℝ: la gráfica es la recta y = x + 1 con un <i>hueco</i> en (1, 2).</li>" +
    "<li><b>√(x²) = x.</b> Falso: √(x²) = |x|. Su dominio es ℝ, y la función es el valor absoluto, no la identidad.</li>" +
    "<li><b>ln(x²) = 2·ln x.</b> Falso en general: ln(x²) existe para todo x ≠ 0, mientras que 2·ln x sólo para x &gt; 0. Correcto: ln(x²) = 2·ln|x|.</li>" +
    "<li><b>Poner «≥ 0» en un denominador.</b> En una fracción sólo se prohíbe que el denominador valga 0; no pide ser positivo. Sólo cuando hay una <i>raíz</i> en el denominador se exige &gt; 0.</li>" +
    "</ul>";

  // ---------------------------------------------------------------- 3. Leer una gráfica
  secciones[2] =
    "<h5>Definiciones con precisión</h5>" +
    "<p>Hablar de «sube» y «baja» sirve para empezar, pero en matemáticas todo se define con desigualdades entre valores de <i>x</i> y de <i>f(x)</i>:</p>" +
    tabla(["Propiedad", "Definición (para cualesquiera x₁ &lt; x₂ de un intervalo I)", "Gráfica"], [
      ["Creciente en I", "f(x₁) &lt; f(x₂)", "sube de izquierda a derecha"],
      ["Decreciente en I", "f(x₁) &gt; f(x₂)", "baja de izquierda a derecha"],
      ["Constante en I", "f(x₁) = f(x₂)", "es horizontal"],
      ["Máximo relativo en a", "f(a) ≥ f(x) para los x cercanos a a", "«pico»: pasa de crecer a decrecer"],
      ["Mínimo relativo en a", "f(a) ≤ f(x) para los x cercanos a a", "«valle»: pasa de decrecer a crecer"],
      ["Máximo absoluto en a", "f(a) ≥ f(x) para todo x del dominio", "el punto más alto de toda la gráfica"],
      ["Mínimo absoluto en a", "f(a) ≤ f(x) para todo x del dominio", "el punto más bajo de toda la gráfica"]
    ]) +
    "<p>Dos precisiones importantes:</p>" +
    "<ul>" +
    "<li>El crecimiento se estudia <b>en intervalos</b>, no en puntos. Y si el dominio tiene huecos hay que ser prudente: la hipérbola y = 1/x es decreciente en (−∞, 0) y en (0, +∞), pero <i>no</i> es decreciente en todo su dominio, porque −1 &lt; 1 y sin embargo f(−1) = −1 &lt; f(1) = 1.</li>" +
    "<li>Un extremo relativo no tiene por qué ser absoluto. En f(x) = x³ − 3x hay un máximo relativo en (−1, 2) y un mínimo relativo en (1, −2), pero la función no tiene extremos absolutos: baja y sube sin límite.</li>" +
    "</ul>" +
    "<h5>Acotación</h5>" +
    "<p>Una función está <b>acotada superiormente</b> si existe un número M con f(x) ≤ M para todo x (y acotada inferiormente si f(x) ≥ m). Es <b>acotada</b> si lo está por ambos lados. sen x está acotada (−1 ≤ sen x ≤ 1); x² está acotada inferiormente (x² ≥ 0) pero no superiormente; x³ no está acotada de ningún lado.</p>" +
    "<h5>Simetrías: cómo se comprueban algebraicamente</h5>" +
    "<p>La definición se comprueba calculando f(−x) y comparando con f(x). Antes, una condición previa: el <b>dominio debe ser simétrico</b> respecto del origen (si x está, −x también); si no, la función no puede ser ni par ni impar.</p>" +
    tabla(["Tipo", "Condición", "Simetría de la gráfica", "Ejemplos"], [
      ["Par", "f(−x) = f(x)", "respecto del eje Y (espejo)", "x², x⁴, |x|, cos x"],
      ["Impar", "f(−x) = −f(x)", "respecto del origen (giro de 180°)", "x, x³, 1/x, sen x, tan x"]
    ]) +
    ejemplo("Par, impar o ninguna", "Estudia la paridad de f(x) = x⁴ − 2x² + 1, g(x) = x³ − x, h(x) = x² + x y k(x) = √x.", [
      "f(−x) = (−x)⁴ − 2(−x)² + 1 = x⁴ − 2x² + 1 = f(x) → <b>par</b>.",
      "g(−x) = (−x)³ − (−x) = −x³ + x = −(x³ − x) = −g(x) → <b>impar</b>.",
      "h(−x) = x² − x. No es h(x) = x² + x ni −h(x) = −x² − x → <b>ni par ni impar</b>.",
      "k(x) = √x tiene dominio [0, +∞), que no es simétrico (−4 no está pero 4 sí) → <b>ni par ni impar</b>."
    ]) +
    "<p>Reglas útiles: par + par = par · impar + impar = impar · par × par = par · impar × impar = par · par × impar = impar. Un polinomio con sólo potencias pares (x⁰, x², x⁴…) es par, y con sólo impares es impar.</p>" +
    "<h5>Periodicidad</h5>" +
    "<p>f es <b>periódica</b> de periodo T si f(x + T) = f(x) para todo x: la gráfica se repite cada T unidades. sen x y cos x tienen periodo 2π; tan x tiene periodo π.</p>" +
    "<h5>Continuidad y tendencia (primer contacto)</h5>" +
    "<p>Una función es <b>continua</b> en un intervalo si su gráfica se puede dibujar <i>sin levantar el lápiz</i>. Las roturas son de tres tipos: <b>salto</b> (la gráfica «salta» de una altura a otra), <b>hueco</b> (falta un punto) y <b>asíntota vertical</b> (la gráfica se dispara hacia ±∞). La <b>tendencia</b> describe a qué se acerca f(x) cuando x se hace muy grande o muy negativo; si se acerca a un valor L, la recta y = L es una <b>asíntota horizontal</b>. Todo esto se formaliza en el Tema 10 (límites y continuidad).</p>" +
    "<h5>La ficha de lectura de una gráfica: ocho preguntas</h5>" +
    "<p>Ante una gráfica, contesta siempre en este orden: <b>1.</b> dominio (proyección sobre el eje X) · <b>2.</b> recorrido (proyección sobre el eje Y) · <b>3.</b> cortes con los ejes · <b>4.</b> signo · <b>5.</b> intervalos de crecimiento y decrecimiento · <b>6.</b> máximos y mínimos · <b>7.</b> simetría y periodicidad · <b>8.</b> continuidad y asíntotas. Practica con las tres gráficas siguientes y después con el analizador, que te da la ficha de cualquier función que escribas:</p>" +
    w("leergrafica") +
    w("analisis") +
    ojo("el analizador calcula numéricamente: sirve para <b>comprobar</b> tu estudio hecho a mano, no para sustituirlo. En el examen tendrás que justificar cada apartado (por ejemplo, el dominio con las condiciones, los cortes resolviendo f(x) = 0).");

  // ---------------------------------------------------------------- 4. Afín
  secciones[3] =
    "<h5>La pendiente es una razón de cambio</h5>" +
    "<p>En f(x) = mx + n, la pendiente <b>m = Δy/Δx</b> dice cuánto cambia <i>y</i> por cada unidad que aumenta <i>x</i>, y es la <b>misma</b> en cualquier tramo: por eso la gráfica es una recta. En un contexto real, m tiene unidades y significado: precio por kilo, velocidad en km/h, coste por unidad. La <b>ordenada en el origen</b> n es el valor inicial, lo que hay cuando x = 0 (la cuota fija, la posición inicial).</p>" +
    tabla(["Caso", "Fórmula", "Cómo es la gráfica"], [
      ["Función afín", "f(x) = mx + n", "recta con pendiente m que corta a Y en n"],
      ["Función lineal (proporcionalidad directa)", "f(x) = mx", "recta por el origen; el cociente y/x es constante (= m)"],
      ["Función constante", "f(x) = n", "recta horizontal (m = 0)"],
      ["Función identidad", "f(x) = x", "la bisectriz del primer y tercer cuadrante"]
    ]) +
    "<h5>Reconocer una función afín en una tabla</h5>" +
    "<p>Si los valores de x avanzan de uno en uno y las <b>diferencias</b> de y son siempre iguales, la función es afín, y esa diferencia es la pendiente. Si los x no avanzan a paso constante, se comprueba que el cociente Δy/Δx es el mismo para todas las parejas.</p>" +
    ejemplo("¿Es afín esta tabla?", "x = 0, 1, 2, 3, 4 y y = 5, 8, 11, 14, 17. Halla la fórmula.", [
      "Diferencias de y: 8 − 5 = 3, 11 − 8 = 3, 14 − 11 = 3, 17 − 14 = 3. Todas iguales: <b>es afín con m = 3</b>.",
      "Ordenada en el origen: el valor para x = 0 es 5 → n = 5.",
      "f(x) = 3x + 5. Comprobación con x = 4: 3·4 + 5 = 17 ✓."
    ]) +
    "<h5>Obtener la fórmula</h5>" +
    ejemplo("Por dos puntos", "Halla la función afín con f(2) = 7 y f(5) = 16.", [
      "m = (16 − 7)/(5 − 2) = 9/3 = 3.",
      "y − 7 = 3(x − 2) → y = 3x − 6 + 7 → <b>f(x) = 3x + 1</b>.",
      "Comprobación: f(5) = 15 + 1 = 16 ✓."
    ]) +
    ejemplo("Un caso real: de °C a °F", "El agua se congela a 0 °C = 32 °F y hierve a 100 °C = 212 °F. Halla la fórmula que convierte C en F y la temperatura en la que ambas escalas coinciden.", [
      "Dos puntos: (0, 32) y (100, 212). m = (212 − 32)/(100 − 0) = 180/100 = 1,8. n = 32.",
      "<b>F = 1,8·C + 32</b>.",
      "Coinciden cuando C = F: x = 1,8x + 32 → −0,8x = 32 → <b>x = −40</b>. A −40 grados las dos escalas marcan lo mismo."
    ]) +
    "<h5>Paralelas y perpendiculares</h5>" +
    "<p>Todo lo que viste en el Tema 8 se traduce al lenguaje de funciones: dos rectas y = m₁x + n₁ e y = m₂x + n₂ son <b>paralelas</b> si m₁ = m₂ y <b>perpendiculares</b> si m₁·m₂ = −1. Por ejemplo, la recta perpendicular a y = 2x + 1 que pasa por (4, 3) tiene pendiente −1/2: y − 3 = −(x − 4)/2 → y = −x/2 + 5.</p>" +
    w("afin") +
    "<h5>Modelos afines en la vida real</h5>" +
    "<ul><li><b>Movimiento uniforme</b>: x(t) = x₀ + v·t. La pendiente es la velocidad y la ordenada en el origen la posición inicial (lo verás en Física).</li>" +
    "<li><b>Tarifas con cuota fija</b>: coste = cuota + precio·unidades.</li>" +
    "<li><b>Depreciación lineal</b>: valor = V₀ − d·t.</li></ul>" +
    ejemplo("Dos tarifas de móvil", "La tarifa A cuesta 5 € fijos más 2 € por GB; la B, 15 € fijos más 0,50 € por GB. ¿A partir de cuántos GB compensa la B?", [
      "C<sub>A</sub>(x) = 5 + 2x y C<sub>B</sub>(x) = 15 + 0,5x.",
      "Se igualan: 5 + 2x = 15 + 0,5x → 1,5x = 10 → x = 6,67 GB.",
      "Para menos de 6,67 GB sale mejor A (la cuota fija es menor) y para más, B (el precio por GB es menor). Con 10 GB: A = 25 €, B = 20 €."
    ]) +
    w("tarifa");

  // ---------------------------------------------------------------- 5. Cuadrática
  secciones[4] =
    "<h5>Tres formas de la misma parábola</h5>" +
    "<p>Una función cuadrática puede escribirse de tres maneras equivalentes y cada una «regala» una información distinta:</p>" +
    tabla(["Forma", "Fórmula", "Qué se lee a simple vista"], [
      ["General", "f(x) = ax² + bx + c", "el corte con el eje Y: (0, c)"],
      ["Canónica (o de vértice)", "f(x) = a(x − h)² + k", "el vértice V(h, k) y el eje x = h"],
      ["Factorizada", "f(x) = a(x − x₁)(x − x₂)", "los cortes con el eje X: x₁ y x₂"]
    ]) +
    "<p>El coeficiente <b>a</b> es el mismo en las tres: si a &gt; 0 la parábola abre hacia arriba (tiene un mínimo) y si a &lt; 0 hacia abajo (tiene un máximo); cuanto mayor es |a|, más «cerrada» es la parábola.</p>" +
    "<h5>De la forma general a la canónica: completar el cuadrado</h5>" +
    "<p>Sacando a factor común y completando el cuadrado: ax² + bx + c = a(x + b/2a)² + c − b²/4a. De ahí sale la fórmula del vértice, con h = −b/2a y k = c − b²/4a = −Δ/4a (siendo Δ = b² − 4ac el discriminante). Es decir:</p>" +
    H.formula("V = (−b/2a , f(−b/2a))") +
    ejemplo("Completar el cuadrado", "Pasa a forma canónica f(x) = x² − 6x + 5.", [
      "Se toma la mitad del coeficiente de x: −6/2 = −3, y se suma y se resta su cuadrado, 9: x² − 6x + 9 − 9 + 5.",
      "x² − 6x + 9 = (x − 3)², luego f(x) = (x − 3)² − 4.",
      "Vértice V(3, −4). Comprobación con la fórmula: −b/2a = 6/2 = 3 y f(3) = 9 − 18 + 5 = −4 ✓."
    ]) +
    "<h5>El discriminante y los cortes con el eje X</h5>" +
    "<p>Los cortes con el eje X son las soluciones de ax² + bx + c = 0. Según el signo de Δ = b² − 4ac: <b>Δ &gt; 0</b> → dos cortes (la parábola cruza el eje); <b>Δ = 0</b> → un solo punto de contacto, que es el vértice (la parábola es tangente al eje); <b>Δ &lt; 0</b> → ningún corte (queda toda por encima si a &gt; 0, o toda por debajo si a &lt; 0).</p>" +
    "<h5>Dibujar una parábola en cinco pasos</h5>" +
    "<ol><li><b>Abertura</b>: mira el signo de a.</li><li><b>Vértice</b>: x = −b/2a y después y = f(x).</li><li><b>Corte con el eje Y</b>: (0, c).</li><li><b>Cortes con el eje X</b>: ax² + bx + c = 0 (si Δ ≥ 0).</li><li><b>Punto simétrico</b> del corte con Y respecto del eje x = h: (2h, c). Con eso y el vértice la curva queda bien definida.</li></ol>" +
    ejemplo("Dibujo completo", "Estudia y representa f(x) = x² − 4x + 3.", [
      "a = 1 &gt; 0: abre hacia arriba.",
      "Vértice: x = 4/2 = 2; f(2) = 4 − 8 + 3 = −1 → V(2, −1). Eje de simetría x = 2.",
      "Corte con Y: f(0) = 3 → (0, 3). Su simétrico: (4, 3).",
      "Cortes con X: x² − 4x + 3 = 0 → x = 1 y x = 3. Forma factorizada: (x − 1)(x − 3).",
      "Dominio ℝ · Recorrido [−1, +∞) · decrece en (−∞, 2) y crece en (2, +∞) · mínimo absoluto (2, −1)."
    ]) +
    ejemplo("Con a negativo", "Estudia f(x) = −2x² + 8x − 6.", [
      "a = −2 &lt; 0: abre hacia abajo (tendrá un máximo).",
      "Vértice: x = −8/(2·(−2)) = 2; f(2) = −8 + 16 − 6 = 2 → V(2, 2). Forma canónica: −2(x − 2)² + 2.",
      "Cortes con X: −2x² + 8x − 6 = 0 → x² − 4x + 3 = 0 → x = 1 y x = 3. Factorizada: −2(x − 1)(x − 3).",
      "Corte con Y: (0, −6). Recorrido (−∞, 2]. Crece en (−∞, 2) y decrece en (2, +∞)."
    ]) +
    "<h5>Hallar la parábola a partir de datos</h5>" +
    ejemplo("Con el vértice y un punto", "Halla la parábola de vértice (1, −4) que pasa por (3, 4).", [
      "Con el vértice, la forma canónica: y = a(x − 1)² − 4.",
      "Con el punto: 4 = a(3 − 1)² − 4 → 4a = 8 → a = 2.",
      "y = 2(x − 1)² − 4 = 2x² − 4x − 2."
    ]) +
    ejemplo("Con los cortes y un punto", "Una parábola corta al eje X en x = 1 y x = 3, y al eje Y en y = 6. Halla su ecuación.", [
      "Con los cortes, la forma factorizada: y = a(x − 1)(x − 3).",
      "Con (0, 6): 6 = a·(−1)(−3) = 3a → a = 2.",
      "y = 2(x − 1)(x − 3) = 2x² − 8x + 6."
    ]) +
    ejemplo("Con tres puntos", "Halla la parábola que pasa por (0, 1), (1, 3) y (2, 9).", [
      "y = ax² + bx + c. Con (0, 1): c = 1.",
      "Con (1, 3): a + b + 1 = 3 → a + b = 2. Con (2, 9): 4a + 2b + 1 = 9 → 2a + b = 4.",
      "Restando: a = 2, y entonces b = 0. <b>y = 2x² + 1</b>."
    ]) +
    w("cuadratica") +
    "<h5>Problemas de máximos y mínimos sin derivadas</h5>" +
    "<p>Siempre que una magnitud dependa de una variable mediante una cuadrática, su máximo o mínimo está en el vértice.</p>" +
    ejemplo("Área máxima con una valla", "Un agricultor dispone de 40 m de valla para cercar un rectángulo. ¿Qué dimensiones dan el área máxima?", [
      "Si un lado mide x, el otro mide 20 − x (el semiperímetro es 20). Área: A(x) = x(20 − x) = −x² + 20x, con 0 &lt; x &lt; 20.",
      "Es una parábola con a = −1 &lt; 0: el máximo está en el vértice, x = −20/(2·(−1)) = 10.",
      "Lados 10 × 10 (un cuadrado) y A = 100 m²."
    ]) +
    ejemplo("Un lanzamiento", "Un balón se lanza hacia arriba y su altura (en metros) en el instante t (en segundos) es h(t) = −5t² + 20t + 1. Halla la altura máxima y cuándo cae al suelo.", [
      "Vértice: t = −20/(2·(−5)) = 2 s; h(2) = −20 + 40 + 1 = 21 m. <b>Altura máxima 21 m a los 2 s</b>.",
      "Suelo: h(t) = 0 → 5t² − 20t − 1 = 0 → t = (20 ± √(400 + 20))/10 = (20 ± 20,49)/10 → t = 4,05 s (la solución negativa, −0,05 s, no tiene sentido).",
      "El balón llega al suelo a los 4,05 s. Fíjate: 2 s hasta arriba y 2,05 s de bajada, algo más porque parte de 1 m de altura."
    ]) +
    ejemplo("Beneficio máximo", "Una empresa vende un artículo a p euros y vende 200 − 4p unidades. Si fabricar cada unidad le cuesta 10 €, ¿qué precio maximiza el beneficio?", [
      "Ingresos: p(200 − 4p). Costes: 10(200 − 4p). Beneficio B(p) = (p − 10)(200 − 4p) = −4p² + 240p − 2000.",
      "Vértice: p = −240/(2·(−4)) = 30 €. B(30) = −3600 + 7200 − 2000 = 1600 €.",
      "El precio óptimo es 30 €, con un beneficio de 1 600 €."
    ]) +
    "<h5>Parábola y recta</h5>" +
    "<p>Para saber cuántos puntos comunes tienen una parábola y una recta se igualan sus ecuaciones: queda una ecuación de segundo grado y su discriminante responde: Δ &gt; 0 (la recta es <i>secante</i>, dos puntos), Δ = 0 (<i>tangente</i>, uno) o Δ &lt; 0 (<i>exterior</i>, ninguno). Por ejemplo, y = x² e y = 2x − 1 → x² − 2x + 1 = 0 → Δ = 0: la recta es tangente en (1, 1). La herramienta de resolución gráfica del final del tema lo muestra.</p>";

  // ---------------------------------------------------------------- 6. A trozos
  secciones[5] =
    "<h5>Cómo dibujar una función a trozos</h5>" +
    "<ol><li>Dibuja <b>cada trozo</b> como si fuera toda la función (con una pequeña tabla de valores).</li>" +
    "<li><b>Recorta</b> cada fórmula a su intervalo.</li>" +
    "<li>En cada extremo, pon un <b>punto relleno</b> si el extremo se incluye (≤, ≥) y un <b>círculo hueco</b> si no (&lt;, &gt;).</li>" +
    "<li>Comprueba cómo se enlazan los trozos en los puntos de unión: ¿se encuentran, hay un salto?</li></ol>" +
    ejemplo("Tres trozos", "Representa f(x) = { x + 3 si x &lt; −1 ; x² si −1 ≤ x ≤ 1 ; 2 si x &gt; 1 } y estudia su dominio, recorrido y continuidad.", [
      "Trozo 1: recta con x &lt; −1; en x = −1 valdría 2 (círculo hueco en (−1, 2)). Trozo 2: parábola en [−1, 1], de (−1, 1) a (1, 1) pasando por (0, 0) (ambos extremos rellenos). Trozo 3: recta horizontal y = 2 con x &gt; 1 (círculo hueco en (1, 2)).",
      "<b>Dominio</b>: ℝ (los tres intervalos cubren todos los reales sin solaparse).",
      "<b>Recorrido</b>: trozo 1 → (−∞, 2); trozo 2 → [0, 1]; trozo 3 → {2}. Unión: (−∞, 2].",
      "<b>Continuidad</b>: en x = −1, por la izquierda se acerca a 2 pero f(−1) = 1: <b>salto</b> de 1. En x = 1, f(1) = 1 y por la derecha vale 2: <b>salto</b> de 1. Es continua en el resto."
    ]) +
    w("trozos") +
    "<h5>Continuidad en el punto de unión</h5>" +
    "<p>Cuando dos trozos se juntan en x = a, la función es continua en ese punto si coinciden tres valores: lo que vale cerca de a por la izquierda, lo que vale por la derecha y f(a). Si alguno falla hay una rotura: <b>salto</b> (izquierda y derecha son distintos), <b>evitable</b> (izquierda = derecha pero f(a) es otro valor o no existe) o <b>asíntota</b> (se dispara a infinito). Muchos problemas piden <b>elegir un parámetro</b> para que la función sea continua:</p>" +
    ejemplo("Un parámetro", "Halla k para que f(x) = { x² + k si x &lt; 1 ; 3x − 2 si x ≥ 1 } sea continua en x = 1.", [
      "Por la derecha (y en x = 1): 3·1 − 2 = 1. Por la izquierda: 1² + k = 1 + k.",
      "Continuidad: 1 + k = 1 → <b>k = 0</b>."
    ]) +
    ejemplo("Dos parámetros", "Halla a y b para que f(x) = { 2x + a si x &lt; 0 ; x² + b si 0 ≤ x &lt; 2 ; 3x − 1 si x ≥ 2 } sea continua en todo ℝ.", [
      "En x = 2: por la izquierda 2² + b = 4 + b; por la derecha 3·2 − 1 = 5. Así 4 + b = 5 → b = 1.",
      "En x = 0: por la izquierda 2·0 + a = a; por la derecha (y f(0)) 0² + b = b. Así a = b = 1.",
      "<b>a = 1, b = 1</b>."
    ]) +
    "<h5>El valor absoluto como función a trozos</h5>" +
    "<p>|u| vale u cuando u ≥ 0 y −u cuando u &lt; 0. Para quitar un valor absoluto, se estudia <b>el signo de lo que hay dentro</b>: |x − 3| = { x − 3 si x ≥ 3 ; 3 − x si x &lt; 3 }. Con varios valores absolutos se marcan <b>todos los puntos críticos</b> (donde se anula cada interior) y se escribe una fórmula por tramo.</p>" +
    ejemplo("Dos valores absolutos", "Escribe f(x) = |x + 1| + |x − 2| como función a trozos y dibújala.", [
      "Puntos críticos: x = −1 (anula x + 1) y x = 2 (anula x − 2). Tres tramos.",
      "x &lt; −1: x + 1 &lt; 0 y x − 2 &lt; 0 → f = −(x + 1) − (x − 2) = −2x + 1.",
      "−1 ≤ x &lt; 2: x + 1 ≥ 0 y x − 2 &lt; 0 → f = (x + 1) − (x − 2) = 3 (¡constante!).",
      "x ≥ 2: ambos ≥ 0 → f = (x + 1) + (x − 2) = 2x − 1.",
      "La gráfica es una «copa» con una meseta de altura 3 entre x = −1 y x = 2. Recorrido [3, +∞); mínimo absoluto 3."
    ]) +
    "<h5>Ecuaciones e inecuaciones con valor absoluto</h5>" +
    "<p>|u| = c (c &gt; 0) equivale a u = c o u = −c. |u| &lt; c equivale a −c &lt; u &lt; c (el interior está <i>cerca</i> de 0). |u| &gt; c equivale a u &lt; −c o u &gt; c (<i>lejos</i> de 0).</p>" +
    ejemplo("Tres casos", "Resuelve |2x − 4| = 6, |x − 2| &lt; 3 y |x + 1| ≥ 2.", [
      "|2x − 4| = 6 → 2x − 4 = 6 (x = 5) o 2x − 4 = −6 (x = −1). Soluciones x = −1 y x = 5.",
      "|x − 2| &lt; 3 → −3 &lt; x − 2 &lt; 3 → −1 &lt; x &lt; 5. Solución (−1, 5).",
      "|x + 1| ≥ 2 → x + 1 ≤ −2 o x + 1 ≥ 2 → x ≤ −3 o x ≥ 1. Solución (−∞, −3] ∪ [1, +∞)."
    ]) +
    "<h5>Otras funciones a trozos famosas</h5>" +
    "<ul><li><b>Parte entera</b> E(x) = ⌊x⌋: el mayor entero que no supera a x (⌊2,7⌋ = 2, ⌊−1,3⌋ = −2). Gráfica «en escalera».</li>" +
    "<li><b>Signo</b> sgn(x): vale −1 si x &lt; 0, 0 si x = 0 y 1 si x &gt; 0.</li>" +
    "<li><b>Escalón</b> y funciones constantes por tramos: tarifas postales, aparcamientos, tramos de impuestos.</li></ul>" +
    ejemplo("Un impuesto por tramos", "Un impuesto es el 10 % de los primeros 10 000 € y el 20 % de lo que exceda de 10 000 €. Escribe la función T(x) y calcula el impuesto de 25 000 €.", [
      "T(x) = { 0,10x si 0 ≤ x ≤ 10 000 ; 1 000 + 0,20(x − 10 000) si x &gt; 10 000 }.",
      "La función es continua: en 10 000 las dos fórmulas dan 1 000 €.",
      "T(25 000) = 1 000 + 0,20·15 000 = 4 000 €. (Un error común es aplicar el 20 % a todo: 5 000 €; el tramo alto sólo grava el exceso.)"
    ]);

  // ---------------------------------------------------------------- 7. Exponencial y logaritmo
  secciones[6] =
    "<h5>La exponencial: propiedades</h5>" +
    tabla(["", "a &gt; 1 (por ejemplo 2ˣ)", "0 &lt; a &lt; 1 (por ejemplo (½)ˣ)"], [
      ["Dominio", "ℝ", "ℝ"],
      ["Recorrido", "(0, +∞)", "(0, +∞)"],
      ["Crecimiento", "creciente", "decreciente"],
      ["Puntos fijos", "(0, 1) y (1, a)", "(0, 1) y (1, a)"],
      ["Asíntota", "y = 0 hacia la izquierda", "y = 0 hacia la derecha"],
      ["Signo", "siempre positiva", "siempre positiva"],
      ["Inyectividad", "sí: aˣ = aʸ ⇒ x = y", "sí"]
    ]) +
    "<p>Como (½)ˣ = 2⁻ˣ, la gráfica de (½)ˣ es el <b>reflejo respecto al eje Y</b> de la de 2ˣ. Ninguna exponencial se anula: no corta al eje X.</p>" +
    "<h5>El número e</h5>" +
    "<p>De todas las bases posibles, la más importante en ciencia es <b>e ≈ 2,71828…</b>. Aparece al capitalizar el interés cada vez más veces: con un capital de 1 € al 100 % anual, el resultado después de un año con n capitalizaciones es (1 + 1/n)ⁿ:</p>" +
    tabla(["n (veces al año)", "1", "2", "10", "100", "10 000", "1 000 000"], [["(1 + 1/n)ⁿ", "2", "2,25", "2,5937", "2,7048", "2,7181", "2,71828"]]) +
    "<p>Los valores se acercan a e. La función eˣ tiene la propiedad de que su ritmo de crecimiento en cada punto es igual a su valor: lo verás en el Tema 11 (derivadas).</p>" +
    "<h5>El logaritmo: definición y propiedades</h5>" +
    "<p>El logaritmo es la operación que <b>deshace</b> la exponencial: logₐ x = y significa aʸ = x (con a &gt; 0, a ≠ 1, x &gt; 0). Se pregunta «¿a qué exponente hay que elevar a para obtener x?». Casos particulares: log<sub>a</sub> 1 = 0, log<sub>a</sub> a = 1; log (sin base) es el de base 10; ln es el de base e.</p>" +
    tabla(["Propiedad", "Fórmula", "Ejemplo"], [
      ["Producto", "logₐ(x·y) = logₐ x + logₐ y", "log 6 = log 2 + log 3"],
      ["Cociente", "logₐ(x/y) = logₐ x − logₐ y", "log₂(5/2) = log₂ 5 − 1"],
      ["Potencia", "logₐ(xⁿ) = n·logₐ x", "ln(x³) = 3 ln x (x &gt; 0)"],
      ["Cambio de base", "logₐ x = ln x / ln a", "log₂ 10 = ln 10 / ln 2 ≈ 3,3219"]
    ]) +
    w("logaritmos") +
    ejemplo("Calcular logaritmos «a ojo»", "Calcula log₂ 32, log 0,001 y log₃(1/9).", [
      "log₂ 32: ¿2 elevado a qué da 32? 2⁵ = 32 → <b>5</b>.",
      "log 0,001 = log 10⁻³ → <b>−3</b>.",
      "log₃(1/9) = log₃ 3⁻² → <b>−2</b>."
    ]) +
    "<h5>Gráfica del logaritmo</h5>" +
    "<p>y = logₐ x tiene dominio (0, +∞), recorrido ℝ, pasa por (1, 0) y por (a, 1), tiene la <b>asíntota vertical x = 0</b> y es creciente si a &gt; 1 (decreciente si 0 &lt; a &lt; 1). Su gráfica es el reflejo de la de aˣ respecto a la recta y = x. Explora esa simetría:</p>" +
    w("expolog") +
    "<h5>Ecuaciones exponenciales y logarítmicas</h5>" +
    ejemplo("Misma base", "Resuelve 2^(x+1) = 32.", [
      "32 = 2⁵: 2^(x+1) = 2⁵ → x + 1 = 5 → <b>x = 4</b>."
    ]) +
    ejemplo("Base distinta: usar logaritmos", "Resuelve 3ˣ = 20.", [
      "Se toman logaritmos: x·ln 3 = ln 20 → x = ln 20 / ln 3 = 2,9957/1,0986 = <b>2,727</b>."
    ]) +
    ejemplo("Un logaritmo con dos términos", "Resuelve log₂(x + 1) + log₂(x − 1) = 3.", [
      "Producto: log₂[(x + 1)(x − 1)] = 3 → x² − 1 = 2³ = 8 → x² = 9 → x = ±3.",
      "Comprobación en el dominio: x + 1 &gt; 0 y x − 1 &gt; 0 → x &gt; 1. Se descarta x = −3.",
      "<b>x = 3</b>. (Comprueba: log₂ 4 + log₂ 2 = 2 + 1 = 3 ✓.)"
    ]) +
    ejemplo("Cambio de variable", "Resuelve 4ˣ − 3·2ˣ + 2 = 0.", [
      "4ˣ = (2ˣ)². Con t = 2ˣ: t² − 3t + 2 = 0 → t = 1 o t = 2.",
      "2ˣ = 1 → x = 0. 2ˣ = 2 → x = 1. <b>x = 0 y x = 1</b>."
    ]) +
    "<h5>Modelos de crecimiento y decrecimiento exponencial</h5>" +
    "<p>Si una cantidad se multiplica por el mismo factor en cada periodo, el modelo es <b>C(t) = C₀·aᵗ</b>: C₀ es el valor inicial y a = 1 + r/100 el factor (r es el % de variación por periodo; r &gt; 0 crece, r &lt; 0 decrece). Para saber <b>cuándo</b> se alcanza un valor hay que despejar el exponente con logaritmos: <b>t = ln(meta/C₀) / ln a</b>.</p>" +
    ejemplo("Interés compuesto", "Se depositan 5 000 € al 2,5 % anual compuesto. ¿Cuánto habrá en 10 años y cuándo llegará a 8 000 €?", [
      "C(t) = 5000·1,025ᵗ. En 10 años: C(10) = 5000·1,025¹⁰ = 5000·1,2801 = 6 400,42 €.",
      "8000 = 5000·1,025ᵗ → 1,025ᵗ = 1,6 → t = ln 1,6/ln 1,025 = 0,47000/0,024693 = <b>19,03 años</b>."
    ]) +
    ejemplo("Desintegración radiactiva", "Una muestra de 100 g de un isótopo con semivida de 5 años pierde la mitad de su masa cada 5 años. ¿Cuánto queda a los 12 años y cuándo quedará 1 g?", [
      "N(t) = 100·(1/2)^(t/5).",
      "N(12) = 100·(1/2)^2,4 = 100·0,1895 = 18,95 g.",
      "1 = 100·(1/2)^(t/5) → (1/2)^(t/5) = 0,01 → t/5 = ln 0,01 / ln 0,5 = 6,644 → t = <b>33,2 años</b>."
    ]) +
    w("modelo") +
    "<h5>Escalas logarítmicas</h5>" +
    "<p>Cuando una magnitud abarca muchísimos órdenes de magnitud se mide con una escala logarítmica: el <b>pH</b> (pH = −log[H⁺]; cada unidad de pH es un factor 10 en la concentración), la escala de <b>Richter</b> (cada punto es 10 veces más amplitud de onda) y los <b>decibelios</b> (dB = 10·log(I/I₀); +10 dB es 10 veces más intensidad). Por ejemplo, un pH 3 es 10 000 veces más ácido que un pH 7 (10⁷⁻³ = 10⁴).</p>";

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 8
    {
      h: "8. Potencias y proporcionalidad inversa: la hipérbola",
      html:
        "<h5>Las funciones potenciales y = xⁿ</h5>" +
        "<p>La forma de y = xⁿ depende de si n es par o impar:</p>" +
        tabla(["", "n par (x², x⁴, x⁶…)", "n impar (x, x³, x⁵…)"], [
          ["Simetría", "par (eje Y)", "impar (origen)"],
          ["Forma", "«U»: baja hasta (0, 0) y sube", "«S»: siempre creciente"],
          ["Recorrido", "[0, +∞)", "ℝ"],
          ["Puntos comunes", "(−1, 1), (0, 0), (1, 1)", "(−1, −1), (0, 0), (1, 1)"],
          ["Si crece n", "más plana cerca de 0 y más empinada lejos", "ídem"]
        ]) +
        "<h5>La proporcionalidad inversa y = k/x</h5>" +
        "<p>Dos magnitudes son <b>inversamente proporcionales</b> si su producto es constante: x·y = k. Si una se duplica, la otra se divide entre 2. Ejemplo: con 120 km por recorrer, el tiempo que se tarda depende de la velocidad: t = 120/v. A 60 km/h son 2 h; a 40 km/h, 3 h; a 120 km/h, 1 h (y en todos los casos v·t = 120).</p>" +
        "<p>La gráfica de y = k/x es una <b>hipérbola</b> con dos ramas:</p>" +
        "<ul><li>Si k &gt; 0, las ramas están en los cuadrantes I y III; si k &lt; 0, en el II y el IV.</li>" +
        "<li>Dominio ℝ − {0} y recorrido ℝ − {0}. Es <b>impar</b>: simétrica respecto del origen.</li>" +
        "<li>Los ejes son <b>asíntotas</b>: x = 0 (vertical) e y = 0 (horizontal). La curva se acerca indefinidamente a ellos sin tocarlos.</li>" +
        "<li>Si k &gt; 0 decrece en cada rama; si k &lt; 0 crece en cada rama.</li></ul>" +
        "<h5>La función homográfica y = (ax + b)/(cx + d)</h5>" +
        "<p>Es una hipérbola desplazada. Se ve dividiendo: (ax + b)/(cx + d) = q + k/(x − p), con <b>p = −d/c</b>, <b>q = a/c</b> y k = (bc − ad)/c². El punto (p, q) es el <b>centro</b>: las asíntotas son <b>x = p</b> e <b>y = q</b> y la gráfica es la de k/x trasladada a ese centro. Las asíntotas se obtienen sin dibujar nada: la vertical anula el denominador y la horizontal es el cociente de los coeficientes de x.</p>" +
        ejemplo("Dibujar una homográfica", "Estudia y representa f(x) = (3x − 2)/(x + 1).", [
          "Dividiendo: 3x − 2 = 3(x + 1) − 5, luego f(x) = 3 − 5/(x + 1). Centro (−1, 3).",
          "<b>Asíntotas</b>: x = −1 (denominador cero) e y = 3 (cociente 3/1).",
          "<b>Dominio</b> ℝ − {−1}; <b>recorrido</b> ℝ − {3}.",
          "k = −5 &lt; 0: crece en cada rama. Ramas en las zonas «arriba-izquierda» y «abajo-derecha» del centro.",
          "<b>Cortes</b>: con Y: f(0) = −2 → (0, −2). Con X: 3x − 2 = 0 → x = 2/3 → (2/3, 0)."
        ]) +
        w("hiperbola") +
        ojo("el que x no pueda valer −d/c no significa que la función «no exista cerca»: la gráfica se acerca muchísimo a la asíntota vertical, pero no la toca. Del mismo modo, y = q no se alcanza nunca (q no está en el recorrido).")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Funciones con raíces y radicales",
      html:
        "<h5>La función raíz cuadrada</h5>" +
        "<p>y = √x tiene dominio [0, +∞) y recorrido [0, +∞); es creciente; pasa por (0, 0), (1, 1), (4, 2) y (9, 3). Es la <b>mitad de una parábola «tumbada»</b>: si x = y², y ≥ 0. Es la función inversa de y = x² cuando se restringe a x ≥ 0. La raíz cúbica y = ∛x, en cambio, tiene dominio ℝ, es impar y es la inversa de y = x³ (sin restringir nada).</p>" +
        "<h5>Con traslaciones y estiramientos</h5>" +
        "<p>Para y = a·√(bx + c) + d se calcula el dominio resolviendo bx + c ≥ 0; el «punto de arranque» está donde el radicando es 0. El recorrido es [d, +∞) si a &gt; 0 y (−∞, d] si a &lt; 0.</p>" +
        ejemplo("Estudio de una raíz", "Estudia f(x) = √(2x + 6) − 1.", [
          "<b>Dominio</b>: 2x + 6 ≥ 0 → x ≥ −3 → [−3, +∞).",
          "<b>Punto de arranque</b>: x = −3 → f(−3) = −1, es decir (−3, −1). Es creciente.",
          "<b>Recorrido</b>: [−1, +∞).",
          "<b>Cortes</b>: con Y: f(0) = √6 − 1 = 1,449 → (0, 1,45). Con X: √(2x + 6) = 1 → 2x + 6 = 1 → x = −2,5 → (−2,5, 0)."
        ]) +
        "<h5>Ecuaciones con una raíz</h5>" +
        "<p>Se aísla la raíz, se eleva al cuadrado y <b>siempre se comprueba</b> la solución en la ecuación original, porque al elevar al cuadrado pueden aparecer soluciones falsas (la herramienta «igualar» del Tema 3 lo muestra).</p>" +
        ejemplo("Una solución falsa", "Resuelve √(x + 2) = x.", [
          "Se eleva al cuadrado: x + 2 = x² → x² − x − 2 = 0 → x = 2 o x = −1.",
          "Comprobación: x = 2 → √4 = 2 ✓. x = −1 → √1 = 1 ≠ −1 ✗ (la raíz nunca es negativa).",
          "Solución: <b>x = 2</b>."
        ]) +
        "<h5>Gráficamente: ¿cuántas soluciones?</h5>" +
        "<p>Dibujar y = √(x + 2) e y = x muestra que se cortan una sola vez (en x = 2): el otro candidato, x = −1, correspondería a la raíz «negativa», que no está en la gráfica de y = √(x + 2).</p>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Funciones trigonométricas: seno, coseno y tangente",
      html:
        "<h5>Las gráficas básicas</h5>" +
        tabla(["", "y = sen x", "y = cos x", "y = tan x"], [
          ["Dominio", "ℝ", "ℝ", "ℝ − {π/2 + kπ}"],
          ["Recorrido", "[−1, 1]", "[−1, 1]", "ℝ"],
          ["Periodo", "2π", "2π", "π"],
          ["Simetría", "impar", "par", "impar"],
          ["Cortes con X", "x = kπ", "x = π/2 + kπ", "x = kπ"],
          ["Máximo · mínimo", "1 en π/2 + 2kπ · −1 en 3π/2 + 2kπ", "1 en 2kπ · −1 en π + 2kπ", "no tiene"],
          ["Asíntotas", "no", "no", "x = π/2 + kπ"]
        ]) +
        "<p>Puntos clave de sen x en un periodo: (0, 0), (π/2, 1), (π, 0), (3π/2, −1), (2π, 0): sube, baja, baja, sube. El coseno es el seno adelantado π/2: cos x = sen(x + π/2).</p>" +
        "<h5>La onda general y = A·sen(B(x − C)) + D</h5>" +
        tabla(["Parámetro", "Qué hace", "Cómo se lee"], [
          ["A", "amplitud (estira en vertical)", "|A| = (máximo − mínimo)/2; si A &lt; 0 invierte la onda"],
          ["B", "frecuencia (acorta el periodo)", "periodo T = 2π/|B|"],
          ["C", "desfase (desplaza en horizontal)", "la onda arranca en x = C"],
          ["D", "eje central (sube o baja la onda)", "D = (máximo + mínimo)/2"]
        ]) +
        ejemplo("Leer los parámetros", "Describe y = 3·sen(2x − π) + 1.", [
          "Se saca factor común de 2 en el argumento: 2x − π = 2(x − π/2). Así y = 3·sen(2(x − π/2)) + 1: A = 3, B = 2, C = π/2, D = 1.",
          "<b>Amplitud</b> 3. <b>Periodo</b> 2π/2 = π. <b>Desfase</b> π/2 a la derecha. <b>Eje central</b> y = 1.",
          "<b>Máximo</b> 1 + 3 = 4 y <b>mínimo</b> 1 − 3 = −2. Recorrido [−2, 4]."
        ]) +
        ejemplo("De la gráfica a la fórmula", "Una onda tiene máximo 5, mínimo −1 y periodo 8, y pasa por su eje central hacia arriba en x = 0. Escribe su fórmula.", [
          "A = (5 − (−1))/2 = 3 y D = (5 + (−1))/2 = 2.",
          "T = 8 = 2π/B → B = π/4.",
          "Como arranca en el eje central subiendo en x = 0: <b>y = 3·sen(πx/4) + 2</b>."
        ]) +
        w("ondas") +
        "<h5>Fenómenos periódicos reales</h5>" +
        "<ul><li><b>La marea</b>: h(t) = 2 + 1,5·sen(πt/6) (m, t en horas). Periodo 2π/(π/6) = 12 h; máxima 3,5 m y mínima 0,5 m.</li>" +
        "<li><b>La corriente alterna doméstica</b>: V(t) = 325·sen(100πt) (V, t en s). Periodo 0,02 s, es decir, 50 ciclos por segundo (50 Hz). Su valor eficaz es 325/√2 ≈ 230 V.</li>" +
        "<li>Los <b>ritmos</b> de las estaciones, las ondas del sonido, las horas de luz en el año o la posición de un muelle son funciones senoidales (movimiento armónico simple, en Física).</li></ul>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Transformaciones de funciones",
      html:
        "<p>Casi todas las funciones del curso son una función <b>base</b> (x², |x|, √x, 1/x, sen x, eˣ…) con alguna transformación. Conocer el efecto de cada una permite dibujar sin tablas:</p>" +
        tabla(["Función", "Qué le pasa a la gráfica de f", "Ejemplo con f(x) = x²"], [
          ["f(x) + k", "se desplaza k unidades hacia arriba (abajo si k &lt; 0)", "x² + 3: sube 3"],
          ["f(x − h)", "se desplaza h unidades hacia la derecha (izquierda si h &lt; 0)", "(x − 2)²: vértice en x = 2"],
          ["a·f(x), a &gt; 1", "se estira en vertical (multiplica las alturas)", "3x²: más cerrada"],
          ["a·f(x), 0 &lt; a &lt; 1", "se aplasta en vertical", "x²/3: más abierta"],
          ["−f(x)", "se refleja respecto del eje X", "−x²: abre hacia abajo"],
          ["f(bx), b &gt; 1", "se comprime en horizontal (factor 1/b)", "(2x)² = 4x²"],
          ["f(−x)", "se refleja respecto del eje Y", "(−x)² = x² (par: igual)"],
          ["|f(x)|", "lo que queda bajo el eje X se refleja hacia arriba", "|x² − 4|"],
          ["f(|x|)", "se borra la parte izquierda y se copia la derecha reflejada", "|x|² − 4 = x² − 4"]
        ]) +
        "<p><b>Regla mnemotécnica:</b> lo que se hace <b>dentro</b> del paréntesis (a la x) actúa «al revés» de lo que parece: f(x − 2) mueve a la <i>derecha</i>; y lo que se hace <b>fuera</b> (a la y) actúa «al derecho»: f(x) + 2 sube. Cuando se combinan, el orden es: primero lo de dentro (de dentro a fuera: cambio de escala y desplazamiento horizontal) y luego lo de fuera.</p>" +
        w("transformar") +
        ejemplo("De x² a −2(x + 1)² + 3", "Dibuja y = −2(x + 1)² + 3 a partir de y = x².", [
          "(x + 1)²: desplaza 1 unidad a la <b>izquierda</b> (h = −1). Vértice en (−1, 0).",
          "2(x + 1)²: estira en vertical por 2 (más cerrada).",
          "−2(x + 1)²: refleja respecto del eje X (abre hacia abajo).",
          "−2(x + 1)² + 3: sube 3 unidades. <b>Vértice (−1, 3)</b>, abre hacia abajo. Cortes con X: −2(x + 1)² + 3 = 0 → (x + 1)² = 3/2 → x = −1 ± 1,225 → x = −2,22 y x = 0,22."
        ]) +
        ejemplo("Con valor absoluto", "Dibuja y = |x² − 4|.", [
          "Primero y = x² − 4 (parábola con vértice (0, −4), cortes en x = ±2).",
          "|·| refleja hacia arriba la parte que está bajo el eje X, es decir, para −2 &lt; x &lt; 2.",
          "Resultado: una «W» con mínimos 0 en x = ±2 y un máximo relativo en (0, 4)."
        ]) +
        ejemplo("Una onda", "Describe cómo pasar de y = sen x a y = 2·sen(x − π/3) + 1.", [
          "sen(x − π/3): desplaza π/3 a la derecha. 2·sen(…): amplitud 2. + 1: sube el eje central a y = 1.",
          "Máximo 3, mínimo −1, periodo 2π; la onda «arranca» en x = π/3."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Operaciones con funciones y composición",
      html:
        "<h5>Suma, resta, producto y cociente</h5>" +
        "<p>Se definen punto a punto: (f ± g)(x) = f(x) ± g(x), (f·g)(x) = f(x)·g(x) y (f/g)(x) = f(x)/g(x). El dominio es la <b>intersección</b> de los dominios de f y g y, en el cociente, <b>además</b> hay que quitar los x que anulan el denominador, g(x) = 0.</p>" +
        ejemplo("Dominio de las operaciones", "Con f(x) = √x y g(x) = x − 4, halla Dom(f + g), Dom(f/g) y Dom(g/f).", [
          "Dom f = [0, +∞) y Dom g = ℝ → Dom(f + g) = [0, +∞).",
          "(f/g)(x) = √x/(x − 4): se exige g(x) ≠ 0, es decir x ≠ 4 → Dom = [0, +∞) − {4}.",
          "(g/f)(x) = (x − 4)/√x: se exige f(x) ≠ 0, es decir x ≠ 0 → Dom = (0, +∞)."
        ]) +
        "<h5>Composición de funciones</h5>" +
        "<p>La <b>composición</b> (f∘g)(x) = f(g(x)) aplica primero g y después f (se lee de derecha a izquierda). Su dominio es {x ∈ Dom g : g(x) ∈ Dom f}: los x deben valer para g y su imagen debe valer para f.</p>" +
        ejemplo("Evaluar una composición", "Con f(x) = x² + 1 y g(x) = 2x − 3, calcula (f∘g)(2), (g∘f)(2) y las fórmulas de f∘g y g∘f.", [
          "(f∘g)(2) = f(g(2)) = f(1) = 1 + 1 = <b>2</b>. (g∘f)(2) = g(f(2)) = g(5) = 10 − 3 = <b>7</b>.",
          "(f∘g)(x) = f(2x − 3) = (2x − 3)² + 1 = 4x² − 12x + 10.",
          "(g∘f)(x) = g(x² + 1) = 2(x² + 1) − 3 = 2x² − 1.",
          "Son funciones distintas: la composición <b>no es conmutativa</b>."
        ]) +
        ejemplo("El dominio cambia", "Con f(x) = ln x y g(x) = x², halla f∘g y g∘f con sus dominios.", [
          "(f∘g)(x) = ln(x²): hace falta x² &gt; 0 → Dom = ℝ − {0}.",
          "(g∘f)(x) = (ln x)²: hace falta x &gt; 0 (por el logaritmo) → Dom = (0, +∞).",
          "Fíjate: ln(x²) = 2·ln|x| ≠ (ln x)². Dos funciones diferentes con dominios distintos."
        ]) +
        w("compuesta") +
        "<h5>Descomponer una función compuesta</h5>" +
        "<p>Saber ver una función como composición será esencial en derivadas (regla de la cadena): h(x) = √(x² + 1) = f(g(x)) con g(x) = x² + 1 («lo de dentro») y f(x) = √x («lo de fuera»); h(x) = e^(sen x) es f(g(x)) con g = sen x y f = eˣ; h(x) = (3x − 5)⁴ es f(g(x)) con g = 3x − 5 y f = x⁴. La pregunta clave es: <i>¿cuál es la última operación que se hace al calcular el valor?</i> Esa es la función de fuera.</p>"
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. La función inversa",
      html:
        "<h5>Idea y condición</h5>" +
        "<p>La inversa f⁻¹ <b>deshace</b> lo que hace f: si f(a) = b entonces f⁻¹(b) = a. Por tanto, (f⁻¹∘f)(x) = x y (f∘f⁻¹)(x) = x. Una función tiene inversa sólo si es <b>inyectiva</b>: a distintos x les corresponden distintos y (cada valor de y sale de un único x). Gráficamente: <b>ninguna recta horizontal corta a la gráfica más de una vez</b>. Cuando f no es inyectiva (como x² en ℝ) se <b>restringe el dominio</b> a una zona donde sí lo sea (x ≥ 0).</p>" +
        "<p>Consecuencias: Dom(f⁻¹) = Im(f) e Im(f⁻¹) = Dom(f); y la gráfica de f⁻¹ es el <b>reflejo respecto de la recta y = x</b>, porque (a, b) pasa a (b, a).</p>" +
        "<h5>Cómo se calcula: tres pasos</h5>" +
        "<ol><li>Escribe y = f(x).</li><li><b>Intercambia</b> x e y.</li><li><b>Despeja</b> y: es f⁻¹(x).</li></ol>" +
        ejemplo("Una afín", "Halla la inversa de f(x) = 3x − 5.", [
          "y = 3x − 5 → intercambio: x = 3y − 5 → 3y = x + 5 → y = (x + 5)/3.",
          "<b>f⁻¹(x) = (x + 5)/3</b>. Comprobación: f(f⁻¹(x)) = 3(x + 5)/3 − 5 = x ✓."
        ]) +
        ejemplo("Una homográfica", "Halla la inversa de f(x) = (2x + 1)/(x − 3).", [
          "x = (2y + 1)/(y − 3) → x(y − 3) = 2y + 1 → xy − 3x = 2y + 1.",
          "Agrupa los términos en y: xy − 2y = 3x + 1 → y(x − 2) = 3x + 1.",
          "<b>f⁻¹(x) = (3x + 1)/(x − 2)</b>. Dom f = ℝ − {3} y Im f = ℝ − {2}: justo al revés en la inversa."
        ]) +
        ejemplo("Con restricción de dominio", "Halla la inversa de f(x) = x² + 1 con x ≥ 0.", [
          "x = y² + 1 → y² = x − 1 → y = ±√(x − 1). Como el dominio de f era x ≥ 0, la inversa debe dar y ≥ 0: se elige el signo +.",
          "<b>f⁻¹(x) = √(x − 1)</b> con x ≥ 1 (el recorrido de f es [1, +∞))."
        ]) +
        tabla(["Función", "Inversa", "Observación"], [
          ["y = aˣ", "y = logₐ x", "dominio (0, ∞) ↔ ℝ"],
          ["y = x² (x ≥ 0)", "y = √x", "hay que restringir el dominio"],
          ["y = x³", "y = ∛x", "no hace falta restringir"],
          ["y = mx + n", "y = (x − n)/m", "una recta se invierte en otra recta"],
          ["y = sen x (restringido a [−π/2, π/2])", "y = arcsen x", "se verá con las trigonométricas inversas"]
        ]) +
        w("inversa") +
        ojo("f⁻¹ <b>no</b> es 1/f. f⁻¹(x) es la función inversa; 1/f(x) es el inverso multiplicativo. Con f(x) = 2x: f⁻¹(x) = x/2, pero 1/f(x) = 1/(2x).")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Resolución gráfica de ecuaciones e inecuaciones",
      html:
        "<p>Muchas ecuaciones se leen como cortes de gráficas:</p>" +
        tabla(["Problema", "Interpretación gráfica"], [
          ["f(x) = 0", "puntos donde la gráfica corta al eje X (ceros)"],
          ["f(x) = g(x)", "abscisas de los puntos donde se cortan las gráficas de f y g"],
          ["f(x) &gt; g(x)", "valores de x para los que la gráfica de f queda <b>por encima</b> de la de g"],
          ["f(x) &lt; g(x)", "valores de x para los que f queda <b>por debajo</b> de g"]
        ]) +
        ejemplo("Una ecuación con solución exacta", "Resuelve x² = x + 6 gráficamente y comprueba con álgebra.", [
          "Se dibujan y = x² e y = x + 6: se cortan en dos puntos con abscisas x = −2 y x = 3.",
          "Álgebra: x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 y x = −2 ✓.",
          "Como bonus, f(x) &gt; g(x) (la parábola sobre la recta) ocurre fuera de las raíces: x &lt; −2 o x &gt; 3."
        ]) +
        ejemplo("Una ecuación que sólo se resuelve gráficamente", "¿Cuántas soluciones tiene eˣ = x + 2?", [
          "No hay forma algebraica de despejar x: mezcla una exponencial con un polinomio. Pero la gráfica lo resuelve: y = eˣ y la recta y = x + 2 se cortan en <b>dos</b> puntos.",
          "Aproximaciones: x ≈ −1,84 (e^−1,84 = 0,159 ≈ 0,16 ✓) y x ≈ 1,15 (e^1,15 = 3,16 ≈ 3,15 ✓).",
          "Así se resuelven en la práctica estas ecuaciones: con una gráfica para saber cuántas soluciones hay y con métodos numéricos para precisarlas."
        ]) +
        w("interseccion") +
        "<h5>Inecuaciones</h5>" +
        ejemplo("x² − 4 &lt; 0", "Resuelve x² − 4 &lt; 0 con la gráfica.", [
          "Se estudia y = x² − 4: parábola con cortes en x = ±2.",
          "Está <b>por debajo del eje X</b> (y &lt; 0) entre las raíces: −2 &lt; x &lt; 2. Solución (−2, 2).",
          "(Mismo método que con la tabla de signos del Tema 3: ahora lo ves.)"
        ]) +
        "<h5>Sistemas de una recta y una parábola</h5>" +
        "<p>Para <b>y = x² − 1</b> e <b>y = x + 1</b>, las ecuaciones se igualan: x² − 1 = x + 1 → x² − x − 2 = 0 → x = 2 y x = −1. Los puntos comunes son (2, 3) y (−1, 0). Gráficamente, la recta corta a la parábola en esos dos puntos.</p>"
    },
    // -------------------------------------------------------------- 15
    {
      h: "15. Modelos: ¿qué función elijo?",
      html:
        "<p>En los problemas con datos hay que decidir qué tipo de función los describe. La tabla de «pistas» ahorra tiempo:</p>" +
        tabla(["Si observas…", "El modelo es…", "Fórmula"], [
          ["la variación de y es siempre la misma por cada paso de x (Δy constante)", "afín", "y = mx + n"],
          ["la variación de la variación es constante (Δ²y constante)", "cuadrática", "y = ax² + bx + c"],
          ["y se multiplica por el mismo factor en cada paso (cociente constante)", "exponencial", "y = C·aˣ"],
          ["el producto x·y es constante", "proporcionalidad inversa", "y = k/x"],
          ["se repite periódicamente", "trigonométrica", "y = A·sen(Bx + C) + D"],
          ["crece muy despacio al final, tras un inicio rápido", "logarítmica", "y = a + b·ln x"]
        ]) +
        ejemplo("Cuatro tablas, cuatro modelos", "Identifica el modelo de cada tabla (x = 0, 1, 2, 3, 4 en las tres primeras) y escribe su fórmula.", [
          "<b>A)</b> y = 5, 8, 11, 14, 17. Diferencias: 3, 3, 3, 3 → afín: <b>y = 3x + 5</b>.",
          "<b>B)</b> y = 1, 3, 9, 19, 33. Diferencias: 2, 6, 10, 14; diferencias de las diferencias: 4, 4, 4 → cuadrática con 2a = 4 → a = 2. Con c = 1 (x = 0) y f(1) = 3: 2 + b + 1 = 3 → b = 0. <b>y = 2x² + 1</b> (comprobación: x = 4 → 33 ✓).",
          "<b>C)</b> y = 3, 6, 12, 24, 48. Cocientes: 2, 2, 2, 2 → exponencial: <b>y = 3·2ˣ</b>.",
          "<b>D)</b> (x, y) = (1, 12), (2, 6), (3, 4), (4, 3). Productos: 12, 12, 12, 12 → inversa: <b>y = 12/x</b>."
        ]) +
        "<h5>Resolver un problema de modelización</h5>" +
        "<ol><li><b>Identifica</b> las variables y sus unidades.</li><li><b>Elige</b> el tipo de función con las pistas anteriores.</li><li><b>Calcula</b> los parámetros con los datos (2 puntos para una recta o una exponencial; 3 para una cuadrática).</li><li><b>Comprueba</b> con un dato que no hayas usado.</li><li><b>Responde</b> con unidades y comprueba que el resultado tiene sentido en el dominio del problema.</li></ol>" +
        ejemplo("Una bacteria", "Un cultivo tiene 400 bacterias y su número se duplica cada 3 horas. ¿Cuántas habrá a las 12 h y cuándo llegarán a 100 000?", [
          "Modelo exponencial: N(t) = 400·2^(t/3) (se duplica cada 3 horas).",
          "N(12) = 400·2⁴ = 6 400 bacterias.",
          "100 000 = 400·2^(t/3) → 2^(t/3) = 250 → t/3 = log₂ 250 = ln 250/ln 2 = 7,966 → t = 23,9 h."
        ]) +
        ejemplo("Velocidad y tiempo", "Para recorrer 300 km, ¿cuánto se tarda a v km/h? ¿Qué velocidad media hace falta para llegar en 4 h 30 min?", [
          "Magnitudes inversamente proporcionales: t(v) = 300/v (horas). Es una hipérbola con asíntotas v = 0 y t = 0.",
          "Para t = 4,5 h: 4,5 = 300/v → v = 300/4,5 = 66,67 km/h.",
          "Si se duplica la velocidad (133 km/h), el tiempo se reduce a la mitad (2,25 h)."
        ])
    },
    // -------------------------------------------------------------- 16
    {
      h: "16. Catálogo de las funciones elementales",
      html:
        "<p>Para repasar o consultar, aquí está el catálogo completo con su ficha. Elige una función y compara dominio, recorrido, crecimiento, simetría y asíntotas:</p>" +
        w("galeria") +
        "<h5>Tabla comparativa</h5>" +
        tabla(["Función", "Dominio", "Recorrido", "Simetría", "Asíntotas"], [
          ["mx + n", "ℝ", "ℝ (m ≠ 0)", "impar si n = 0", "—"],
          ["ax² + bx + c", "ℝ", "[k, ∞) / (−∞, k]", "respecto de x = −b/2a", "—"],
          ["k/x", "ℝ − {0}", "ℝ − {0}", "impar", "x = 0 · y = 0"],
          ["√x", "[0, ∞)", "[0, ∞)", "—", "—"],
          ["|x|", "ℝ", "[0, ∞)", "par", "—"],
          ["aˣ", "ℝ", "(0, ∞)", "—", "y = 0"],
          ["logₐ x", "(0, ∞)", "ℝ", "—", "x = 0"],
          ["sen x · cos x", "ℝ", "[−1, 1]", "impar · par", "—"],
          ["tan x", "ℝ − {π/2 + kπ}", "ℝ", "impar", "x = π/2 + kπ"]
        ]) +
        "<p>Para reconocerlas de un vistazo, une cada función con su descripción:</p>" +
        w("emparejar", "familias") +
        w("clasificar", "modelos")
    },
    // -------------------------------------------------------------- 17
    {
      h: "17. Estudio completo de una función: guion y ejemplos",
      html:
        "<p>Cuando un problema pide «estudiar la función», este es el guion (se hace sólo lo que se pueda calcular con lo que se sabe del tipo de función):</p>" +
        "<ol><li><b>Dominio.</b></li><li><b>Cortes con los ejes</b> (f(0) y f(x) = 0).</li><li><b>Simetría y periodicidad.</b></li><li><b>Signo.</b></li><li><b>Asíntotas</b> y comportamiento en los extremos del dominio.</li><li><b>Crecimiento y extremos</b> (en este curso, con la forma de la función; en el Tema 11, con derivadas).</li><li><b>Recorrido.</b></li><li><b>Gráfica</b> con todos los datos.</li></ol>" +
        ejemplo("Estudio de una cuadrática", "Estudia f(x) = −x² + 4x − 3.", [
          "<b>Dominio</b>: ℝ. <b>Cortes</b>: f(0) = −3 → (0, −3); −x² + 4x − 3 = 0 → x² − 4x + 3 = 0 → x = 1, 3.",
          "<b>Simetría</b>: respecto de x = 2 (no es ni par ni impar: f(−x) = −x² − 4x − 3).",
          "<b>Signo</b>: a &lt; 0, positiva entre las raíces: f &gt; 0 en (1, 3), f &lt; 0 en (−∞, 1) ∪ (3, +∞).",
          "<b>Vértice</b>: x = −4/(−2) = 2, f(2) = 1 → máximo absoluto (2, 1). Crece en (−∞, 2), decrece en (2, +∞).",
          "<b>Recorrido</b>: (−∞, 1]. Sin asíntotas."
        ]) +
        ejemplo("Estudio de una homográfica", "Estudia f(x) = (2x + 1)/(x − 1).", [
          "<b>Dominio</b>: x ≠ 1 → ℝ − {1}.",
          "<b>Cortes</b>: f(0) = −1 → (0, −1); 2x + 1 = 0 → x = −1/2 → (−1/2, 0).",
          "<b>Simetría</b>: dominio no simétrico (1 está excluido y −1 no): ni par ni impar.",
          "<b>Reducida</b>: f(x) = 2 + 3/(x − 1). <b>Asíntotas</b>: x = 1 e y = 2.",
          "<b>Signo</b>: ceros y puntos prohibidos: x = −1/2 y x = 1. Positiva en (−∞, −1/2) ∪ (1, +∞) y negativa en (−1/2, 1).",
          "<b>Crecimiento</b>: k = 3 &gt; 0 → decrece en (−∞, 1) y en (1, +∞). Sin extremos. <b>Recorrido</b>: ℝ − {2}."
        ]) +
        ejemplo("Estudio de una a trozos", "Estudia f(x) = { −x si x &lt; 0 ; x² si 0 ≤ x ≤ 2 ; 4 si x &gt; 2 }.", [
          "<b>Dominio</b>: ℝ. <b>Cortes</b>: f(0) = 0 → (0, 0), que es el único corte con los ejes (−x = 0 → x = 0, no está en x &lt; 0; x² = 0 → x = 0; 4 ≠ 0).",
          "<b>Continuidad</b>: en x = 0 vale 0 por los dos lados: continua. En x = 2, x² = 4 y el tramo siguiente es 4: continua. Es continua en todo ℝ.",
          "<b>Crecimiento</b>: decrece en (−∞, 0) (−x baja), crece en (0, 2) (x² sube) y es constante en (2, +∞).",
          "<b>Extremos</b>: mínimo absoluto (0, 0). No hay máximo absoluto: la rama izquierda, −x con x &lt; 0, crece sin límite hacia la izquierda (el valor 4 de la derecha se supera enseguida).",
          "<b>Recorrido</b>: [0, +∞). (Tramo 1: (0, +∞); tramo 2: [0, 4]; tramo 3: {4}.)"
        ])
    },
    // -------------------------------------------------------------- 18
    {
      h: "18. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 19
    {
      h: "19. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación y tarjetas con las fórmulas y las ideas del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1") + w("orden", "inversa")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    familias: {
      titulo: "Cada función con su descripción",
      consigna: "Une cada función con la frase que mejor la describe.",
      pares: [
        ["y = 2x − 3", "Recta creciente que corta al eje Y en −3"],
        ["y = −x² + 4", "Parábola hacia abajo con vértice (0, 4)"],
        ["y = 3/x", "Hipérbola con asíntotas en los dos ejes"],
        ["y = 2ˣ", "Siempre positiva y pasa por (0, 1)"],
        ["y = ln x", "Sólo definida para x &gt; 0 y pasa por (1, 0)"],
        ["y = |x|", "«V» con el vértice en el origen"],
        ["y = √x", "Media parábola «tumbada», definida para x ≥ 0"],
        ["y = sen x", "Onda de periodo 2π acotada entre −1 y 1"]
      ]
    },
    modelos: {
      titulo: "¿Qué modelo describe cada situación?",
      consigna: "Toca una situación y después el tipo de función que la modela.",
      categorias: ["Afín", "Cuadrática", "Exponencial", "Proporcionalidad inversa", "Trigonométrica"],
      items: [
        { t: "El taxi cobra 3 € más 1,20 € por km", c: 0 }, { t: "Precio de x kg de manzanas a 2 €/kg", c: 0 }, { t: "Perímetro de un cuadrado según su lado", c: 0 },
        { t: "Altura de una pelota lanzada hacia arriba según el tiempo", c: 1 }, { t: "Área de un cuadrado según su lado", c: 1 }, { t: "Beneficio según el precio de venta", c: 1 },
        { t: "Población que crece un 3 % cada año", c: 2 }, { t: "Capital con interés compuesto", c: 2 }, { t: "Cada bacteria se divide en dos cada hora", c: 2 },
        { t: "Tiempo de viaje según la velocidad (distancia fija)", c: 3 }, { t: "Lo que toca a cada uno al repartir 120 € entre x personas", c: 3 },
        { t: "La altura de la marea a lo largo del día", c: 4 }, { t: "La corriente alterna de un enchufe", c: 4 }
      ]
    },
    inversa: {
      titulo: "Calcular una función inversa",
      consigna: "Ordena los pasos para hallar la inversa de f(x) = 2x/(x + 1).",
      items: [
        { t: "Escribir y = 2x/(x + 1)", nota: "Se empieza escribiendo la función con y." },
        { t: "Intercambiar x e y: x = 2y/(y + 1)", nota: "Aquí está la clave: lo que era la entrada pasa a ser la salida." },
        { t: "Quitar el denominador: x(y + 1) = 2y, es decir xy + x = 2y", nota: "Se multiplica en cruz para quedarnos sin fracciones." },
        { t: "Pasar los términos con y a un lado: x = 2y − xy", nota: "Los términos con y deben quedar juntos." },
        { t: "Sacar y como factor común: x = y(2 − x)", nota: "Así y queda multiplicada por un único factor." },
        { t: "Despejar: y = x/(2 − x), es decir f⁻¹(x) = x/(2 − x)", nota: "Se divide entre 2 − x." },
        { t: "Comprobar: f(f⁻¹(x)) = x", nota: "Siempre conviene verificar el resultado." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno dice que x = y² define una función y = f(x), porque «es una parábola». ¿Qué falla?",
          op: ["Nada", "Para x = 4 salen y = 2 e y = −2: a un x le corresponden dos y; no pasa la prueba de la recta vertical", "Es una función, pero no continua", "Es una función, pero con dominio ℝ"], ok: 1,
          porque: "Es una parábola tumbada: las rectas verticales la cortan en dos puntos. Sólo y = x² (parábola «de pie») es función. Para tener función habría que elegir una rama: y = √x." },
        { q: "Para f(x) = (x² − 9)/(x − 3), un alumno simplifica y escribe f(x) = x + 3, «así que el dominio es ℝ». ¿Qué falla?",
          op: ["Nada", "El dominio se calcula antes de simplificar: x = 3 anula el denominador, así que Dom f = ℝ − {3}", "Debía dividir entre 3", "El dominio es ℝ − {−3}"], ok: 1,
          porque: "La función original no existe en x = 3. Su gráfica es la recta y = x + 3 con un hueco en (3, 6). Simplificar no cambia el dominio." },
        { q: "Un alumno afirma que √(x²) = x para todo x. ¿Qué falla?",
          op: ["Nada", "√(x²) = |x|: para x = −3 sale 3, no −3", "Sólo vale si x es entero", "√(x²) = x²"], ok: 1,
          porque: "La raíz cuadrada siempre es ≥ 0. Con x = −3: √9 = 3 = |−3|, no −3." },
        { q: "Un alumno escribe ln(x²) = 2·ln x. ¿Qué falla?",
          op: ["Nada", "ln(x²) existe también para x &lt; 0, pero 2·ln x sólo para x &gt; 0: lo correcto es 2·ln|x|", "ln(x²) = ln 2·ln x", "ln(x²) = (ln x)²"], ok: 1,
          porque: "La propiedad logₐ(xⁿ) = n·logₐ x exige x &gt; 0. Para x = −2: ln(4) existe, pero ln(−2) no." },
        { q: "Para y = x² − 4x + 5 un alumno calcula Δ = 16 − 20 = −4 &lt; 0 y concluye que «no tiene vértice». ¿Qué falla?",
          op: ["Nada", "Δ &lt; 0 sólo significa que no corta al eje X; el vértice siempre existe: V(2, 1)", "Debió usar Δ = b² + 4ac", "El vértice es (−2, −1)"], ok: 1,
          porque: "Toda parábola tiene vértice: x = 4/2 = 2 y y = 4 − 8 + 5 = 1. Como el vértice (2, 1) está por encima del eje X y a &gt; 0, la parábola nunca lo toca." },
        { q: "Un alumno quita el valor absoluto escribiendo |x − 3| = x − 3 «porque es lo de dentro». ¿Qué falla?",
          op: ["Nada", "Sólo es cierto si x ≥ 3; si x &lt; 3 es 3 − x", "|x − 3| = x + 3", "|x − 3| = −(x − 3) siempre"], ok: 1,
          porque: "El valor absoluto depende del signo del interior: |x − 3| = x − 3 si x ≥ 3 y = −(x − 3) = 3 − x si x &lt; 3." },
        { q: "Un alumno dice que la inversa de f(x) = 2x es 1/(2x). ¿Qué falla?",
          op: ["Nada", "Confunde inversa con inverso: f⁻¹(x) = x/2", "La inversa es −2x", "La inversa es 2/x"], ok: 1,
          porque: "La función inversa deshace f: si f multiplica por 2, f⁻¹ divide entre 2. 1/f(x) es el inverso multiplicativo, otra cosa." },
        { q: "Un alumno dice que y = 1/x es decreciente en todo su dominio ℝ − {0}. ¿Qué falla?",
          op: ["Nada", "Es decreciente en cada rama por separado, pero no en la unión: −1 &lt; 1 y f(−1) = −1 &lt; f(1) = 1", "Es creciente", "No tiene crecimiento"], ok: 1,
          porque: "Decreciente exige que x₁ &lt; x₂ implique f(x₁) &gt; f(x₂) para <i>cualesquiera</i> puntos del conjunto; entre ramas falla. Se dice «decrece en (−∞, 0) y en (0, +∞)»." },
        { q: "Resolviendo √(x + 2) = x, un alumno obtiene x = 2 y x = −1 y da las dos como soluciones. ¿Qué falla?",
          op: ["Nada", "Al elevar al cuadrado aparecen soluciones falsas: x = −1 da √1 = 1 ≠ −1; sólo vale x = 2", "x = 2 tampoco vale", "Debió dar sólo x = −1"], ok: 1,
          porque: "Elevar al cuadrado no es una equivalencia (a = b implica a² = b², pero no al revés). Hay que comprobar en la ecuación original." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El dominio de f(x) = √(x − 2)/(x − 5) es…",
          op: ["[2, 5) ∪ (5, +∞)", "[2, +∞)", "(2, +∞) − {5}", "ℝ − {5}"], ok: 0,
          porque: "Raíz: x ≥ 2. Fracción: x ≠ 5. Intersección: [2, 5) ∪ (5, +∞)." },
        { q: "La función f(x) = x³ − 5x es…",
          op: ["impar", "par", "ni par ni impar", "periódica"], ok: 0,
          porque: "f(−x) = −x³ + 5x = −f(x)." },
        { q: "El vértice de y = −x² + 6x − 5 es…",
          op: ["(3, 4)", "(3, −4)", "(−3, 4)", "(6, −5)"], ok: 0,
          porque: "x = −6/(−2) = 3; y = −9 + 18 − 5 = 4." },
        { q: "Con f(x) = { x + 1 si x &lt; 2 ; x² − 1 si x ≥ 2 }, f(2) vale…",
          op: ["3", "−1", "1", "No está definida"], ok: 0,
          porque: "x = 2 cumple x ≥ 2, luego se usa x² − 1 = 3." },
        { q: "log₂ 64 − log₃ 27 vale…",
          op: ["3", "2", "6", "9"], ok: 0,
          porque: "log₂ 64 = 6 y log₃ 27 = 3; 6 − 3 = 3." },
        { q: "El periodo de y = sen(4x) es…",
          op: ["π/2", "2π", "4π", "8π"], ok: 0,
          porque: "T = 2π/4 = π/2." },
        { q: "Las asíntotas de f(x) = (2x + 3)/(x − 1) son…",
          op: ["x = 1 e y = 2", "x = −1 e y = 2", "x = 1 e y = 3", "x = 2 e y = 1"], ok: 0,
          porque: "Vertical: denominador 0 → x = 1. Horizontal: 2/1 = 2." },
        { q: "Si f(x) = x² y g(x) = x + 3, entonces (f∘g)(1) vale…",
          op: ["16", "4", "10", "2"], ok: 0,
          porque: "g(1) = 4 y f(4) = 16. (Ojo: (g∘f)(1) = 1 + 3 = 4.)" },
        { q: "La inversa de f(x) = 2x + 6 es…",
          op: ["(x − 6)/2", "(x + 6)/2", "1/(2x + 6)", "2x − 6"], ok: 0,
          porque: "x = 2y + 6 → y = (x − 6)/2." },
        { q: "La tabla x = 0, 1, 2, 3 → y = 2, 6, 18, 54 corresponde a…",
          op: ["y = 2·3ˣ", "y = 4x + 2", "y = 2x² + 2", "y = 6/x"], ok: 0,
          porque: "Los cocientes son 3, 3, 3: modelo exponencial con y(0) = 2 y razón 3." },
        { q: "La gráfica de y = (x − 3)² + 1 es la de y = x² desplazada…",
          op: ["3 a la derecha y 1 arriba", "3 a la izquierda y 1 arriba", "3 a la derecha y 1 abajo", "1 a la derecha y 3 arriba"], ok: 0,
          porque: "x − 3 desplaza 3 a la derecha y +1 sube 1 unidad: vértice (3, 1)." },
        { q: "¿Cuál de estas funciones no tiene ningún corte con el eje X?",
          op: ["y = 2ˣ", "y = x² − 1", "y = ln x", "y = sen x"], ok: 0,
          porque: "2ˣ &gt; 0 siempre. x² − 1 corta en ±1, ln x en x = 1 y sen x en x = kπ." }
      ]
    },
    tj1: {
      titulo: "Funciones elementales",
      cartas: [
        { a: "Dominio: las tres «zonas peligrosas»", b: "Denominador ≠ 0 · radicando de raíz par ≥ 0 · argumento del logaritmo &gt; 0. Si hay raíz en un denominador: radicando &gt; 0." },
        { a: "Prueba de la recta vertical", b: "Es función si ninguna recta vertical corta a la gráfica más de una vez." },
        { a: "Función par e impar", b: "Par: f(−x) = f(x), simetría respecto del eje Y. Impar: f(−x) = −f(x), simetría respecto del origen. El dominio debe ser simétrico." },
        { a: "Función afín", b: "f(x) = mx + n. m = Δy/Δx (pendiente); n = valor en x = 0. Paralelas: m₁ = m₂. Perpendiculares: m₁·m₂ = −1." },
        { a: "Función cuadrática", b: "a(x − h)² + k, vértice (h, k), h = −b/2a. Cortes con X: ax² + bx + c = 0. Δ = b² − 4ac." },
        { a: "Hipérbola homográfica", b: "(ax + b)/(cx + d) = q + k/(x − p): asíntotas x = −d/c, y = a/c; k = (bc − ad)/c²." },
        { a: "Valor absoluto", b: "|u| = u si u ≥ 0 y −u si u &lt; 0. |u| = c ⇔ u = ±c · |u| &lt; c ⇔ −c &lt; u &lt; c · |u| &gt; c ⇔ u &lt; −c ó u &gt; c." },
        { a: "Continuidad de una función a trozos", b: "En x = a coinciden: valor por la izquierda, valor por la derecha y f(a). Si no: salto o hueco." },
        { a: "Exponencial aˣ", b: "Dominio ℝ, recorrido (0, ∞), pasa por (0, 1), asíntota y = 0. Crece si a &gt; 1, decrece si 0 &lt; a &lt; 1." },
        { a: "Logaritmo y propiedades", b: "logₐ x = y ⇔ aʸ = x. log(xy) = log x + log y · log(x/y) = log x − log y · log xⁿ = n·log x · cambio: logₐ x = ln x/ln a." },
        { a: "Modelo de crecimiento exponencial", b: "C(t) = C₀·aᵗ con a = 1 + r/100. Tiempo para llegar a una meta: t = ln(meta/C₀)/ln a." },
        { a: "Trigonométrica general", b: "y = A·sen(B(x − C)) + D: amplitud |A|, periodo 2π/|B|, desfase C, eje y = D. Máx D + |A|, mín D − |A|." },
        { a: "Transformaciones", b: "f(x) + k ↑ · f(x − h) → · a·f(x) estira · −f(x) refleja en eje X · f(−x) refleja en eje Y · |f(x)| · f(|x|)." },
        { a: "Composición", b: "(f∘g)(x) = f(g(x)): primero g, después f. Dom: x ∈ Dom g con g(x) ∈ Dom f. No es conmutativa." },
        { a: "Función inversa", b: "f⁻¹(b) = a ⇔ f(a) = b. Requiere f inyectiva. Se calcula intercambiando x e y y despejando. Gráfica: reflejo en y = x." },
        { a: "¿Qué modelo elijo?", b: "Δy constante → afín · Δ²y constante → cuadrática · cociente constante → exponencial · x·y constante → inversa." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "u1", nivel: 1,
      enunciado: "Calcula el dominio de f(x) = 5/(x + 2). ¿Qué único valor de x hay que excluir?",
      check: { tipo: "num", etiqueta: "x ≠", valor: -2 },
      pistas: ["Una fracción no existe cuando el denominador vale 0."],
      pasos: ["x + 2 = 0 → x = −2.", "Dom(f) = ℝ − {−2}."],
      resultado: "ℝ − {−2}" },
    { id: "u2", nivel: 1,
      enunciado: "El dominio de f(x) = √(3x − 6) es [a, +∞). Halla a.",
      check: { tipo: "num", etiqueta: "a =", valor: 2 },
      pistas: ["Radicando ≥ 0."],
      pasos: ["3x − 6 ≥ 0 → 3x ≥ 6 → x ≥ 2.", "Dom(f) = [2, +∞)."],
      resultado: "a = 2" },
    { id: "u3", nivel: 1,
      enunciado: "Calcula f(−2) para f(x) = 2x² − 3x + 1.",
      check: { tipo: "num", etiqueta: "f(−2) =", valor: 15 },
      pistas: ["Cuidado con el signo: (−2)² = +4."],
      pasos: ["f(−2) = 2·(−2)² − 3·(−2) + 1 = 2·4 + 6 + 1 = 15."],
      resultado: "15",
      ojo: "(−2)² = 4, no −4. El cuadrado de un número negativo es positivo." },
    { id: "u4", nivel: 1,
      enunciado: "Estudia si f(x) = x⁴ − 3x² es par, impar o ninguna de las dos.",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["par", "impar", "ni par ni impar"], ok: 0 },
      pistas: ["Calcula f(−x) y compara con f(x)."],
      pasos: ["f(−x) = (−x)⁴ − 3(−x)² = x⁴ − 3x² = f(x).", "Sólo hay potencias pares: es par (simétrica respecto del eje Y)."],
      resultado: "par" },
    { id: "u5", nivel: 1,
      enunciado: "Halla los cortes de la recta y = 2x − 6 con los ejes: abscisa del corte con el eje X y ordenada del corte con el eje Y.",
      check: [{ tipo: "num", etiqueta: "Corte con X: x =", valor: 3 }, { tipo: "num", etiqueta: "Corte con Y: y =", valor: -6 }],
      pistas: ["Eje X: y = 0. Eje Y: x = 0."],
      pasos: ["Eje X: 2x − 6 = 0 → x = 3 → (3, 0).", "Eje Y: f(0) = −6 → (0, −6)."],
      resultado: "(3, 0) y (0, −6)" },
    { id: "u6", nivel: 1,
      enunciado: "Halla la pendiente y la ordenada en el origen de la función afín cuya gráfica pasa por (1, 3) y (3, 7).",
      check: [{ tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 1 }],
      pistas: ["m = Δy/Δx. Después, sustituye un punto en y = mx + n."],
      pasos: ["m = (7 − 3)/(3 − 1) = 2.", "3 = 2·1 + n → n = 1. f(x) = 2x + 1."],
      resultado: "y = 2x + 1" },
    { id: "u7", nivel: 1,
      enunciado: "Halla el vértice de la parábola y = x² − 6x + 5.",
      check: [{ tipo: "num", etiqueta: "x del vértice =", valor: 3 }, { tipo: "num", etiqueta: "y del vértice =", valor: -4 }],
      pistas: ["x = −b/2a. Luego sustituye para hallar y."],
      pasos: ["x = 6/2 = 3.", "y = 9 − 18 + 5 = −4. V(3, −4)."],
      resultado: "V(3, −4)" },
    { id: "u8", nivel: 1,
      enunciado: "Halla los cortes con el eje X de y = x² − 6x + 5.",
      check: { tipo: "lista", etiqueta: "x =", valores: [1, 5], ph: "dos valores" },
      pistas: ["Resuelve x² − 6x + 5 = 0."],
      pasos: ["x = (6 ± √(36 − 20))/2 = (6 ± 4)/2 → x = 5 y x = 1.", "Factorizada: (x − 1)(x − 5)."],
      resultado: "x = 1 y x = 5" },
    { id: "u9", nivel: 1,
      enunciado: "Sea f(x) = { 2x + 1 si x &lt; 1 ; x² − 1 si x ≥ 1 }. Calcula f(−3), f(1) y f(4).",
      check: [{ tipo: "num", etiqueta: "f(−3) =", valor: -5 }, { tipo: "num", etiqueta: "f(1) =", valor: 0 }, { tipo: "num", etiqueta: "f(4) =", valor: 15 }],
      pistas: ["Primero decide en qué trozo cae cada x. Atención a x = 1."],
      pasos: ["−3 &lt; 1: f(−3) = 2·(−3) + 1 = −5.", "1 ≥ 1: f(1) = 1 − 1 = 0.", "4 ≥ 1: f(4) = 16 − 1 = 15."],
      resultado: "f(−3) = −5 · f(1) = 0 · f(4) = 15" },
    { id: "u10", nivel: 1,
      enunciado: "Calcula (sin calculadora) log₂ 32, log₃(1/9) y log 0,001.",
      check: [{ tipo: "num", etiqueta: "log₂ 32 =", valor: 5 }, { tipo: "num", etiqueta: "log₃(1/9) =", valor: -2 }, { tipo: "num", etiqueta: "log 0,001 =", valor: -3 }],
      pistas: ["Pregúntate: «¿a qué exponente hay que elevar la base?»."],
      pasos: ["2⁵ = 32 → 5.", "3⁻² = 1/9 → −2.", "10⁻³ = 0,001 → −3."],
      resultado: "5, −2 y −3" },
    { id: "u11", nivel: 1,
      enunciado: "Resuelve 5ˣ = 125 y 2^(x − 1) = 16.",
      check: [{ tipo: "num", etiqueta: "5ˣ = 125 → x =", valor: 3 }, { tipo: "num", etiqueta: "2^(x−1) = 16 → x =", valor: 5 }],
      pistas: ["Escribe los dos lados con la misma base: 125 = 5³; 16 = 2⁴."],
      pasos: ["5ˣ = 5³ → x = 3.", "2^(x−1) = 2⁴ → x − 1 = 4 → x = 5."],
      resultado: "x = 3 y x = 5" },
    { id: "u12", nivel: 1,
      enunciado: "Halla el periodo de y = sen(3x) (en radianes, con decimales).",
      check: { tipo: "num", etiqueta: "T =", valor: 2.0944 },
      pistas: ["T = 2π/B."],
      pasos: ["T = 2π/3 = 2,0944."],
      resultado: "2π/3 ≈ 2,094" },

    // ================= ★★ medio =================
    { id: "u13", nivel: 2,
      enunciado: "El dominio de f(x) = √(x² − 5x + 6) es (−∞, a] ∪ [b, +∞). Halla a y b.",
      check: { tipo: "lista", etiqueta: "a, b =", valores: [2, 3], ph: "a y b" },
      pistas: ["x² − 5x + 6 ≥ 0. Halla las raíces y recuerda que la parábola abre hacia arriba."],
      pasos: ["x² − 5x + 6 = 0 → x = 2 y x = 3.", "a = 1 &gt; 0: ≥ 0 fuera de las raíces. Dom = (−∞, 2] ∪ [3, +∞)."],
      resultado: "(−∞, 2] ∪ [3, +∞)" },
    { id: "u14", nivel: 2,
      enunciado: "El dominio de f(x) = ln(4 − x²) es un intervalo abierto (a, b). Halla a y b.",
      check: { tipo: "lista", etiqueta: "a, b =", valores: [-2, 2], ph: "a y b" },
      pistas: ["El argumento del logaritmo debe ser positivo: 4 − x² &gt; 0."],
      pasos: ["4 − x² &gt; 0 → x² &lt; 4 → −2 &lt; x &lt; 2.", "Dom = (−2, 2)."],
      resultado: "(−2, 2)" },
    { id: "u15", nivel: 2,
      enunciado: "Halla los dos valores que hay que excluir del dominio de f(x) = (x + 1)/(x² − x − 6).",
      check: { tipo: "lista", etiqueta: "x ≠", valores: [-2, 3], ph: "dos valores" },
      pistas: ["Resuelve x² − x − 6 = 0. El numerador no importa."],
      pasos: ["x = (1 ± √(1 + 24))/2 = (1 ± 5)/2 → x = 3 y x = −2.", "Dom = ℝ − {−2, 3}."],
      resultado: "ℝ − {−2, 3}" },
    { id: "u16", nivel: 2,
      enunciado: "Una empresa de reparto cobra una cuota fija más un precio por kilómetro. Por 3 km cobra 12 € y por 6 km cobra 18 €. Halla el precio por km (m), la cuota fija (n) y lo que cobraría por 10 km.",
      check: [{ tipo: "num", etiqueta: "m (€/km) =", valor: 2 }, { tipo: "num", etiqueta: "n (€) =", valor: 6 }, { tipo: "num", etiqueta: "Coste de 10 km (€) =", valor: 26 }],
      pistas: ["Es una función afín que pasa por (3, 12) y (6, 18)."],
      pasos: ["m = (18 − 12)/(6 − 3) = 2 €/km.", "12 = 2·3 + n → n = 6 €.", "C(x) = 2x + 6 → C(10) = 26 €."],
      resultado: "m = 2 · n = 6 · C(10) = 26 €" },
    { id: "u17", nivel: 2,
      enunciado: "La tarifa A cuesta C<sub>A</sub>(x) = 10 + 0,5x y la tarifa B, C<sub>B</sub>(x) = 4 + x (x en GB, coste en €). ¿Para qué consumo cuestan lo mismo y cuánto cuesta entonces?",
      check: [{ tipo: "num", etiqueta: "x (GB) =", valor: 12 }, { tipo: "num", etiqueta: "Coste (€) =", valor: 16 }],
      pistas: ["Iguala las dos expresiones."],
      pasos: ["10 + 0,5x = 4 + x → 6 = 0,5x → x = 12 GB.", "C = 4 + 12 = 16 €."],
      resultado: "12 GB y 16 €" },
    { id: "u18", nivel: 2,
      enunciado: "Halla el vértice de y = −2x² + 8x − 3 (abscisa h y ordenada k).",
      check: [{ tipo: "num", etiqueta: "h =", valor: 2 }, { tipo: "num", etiqueta: "k =", valor: 5 }],
      pistas: ["h = −b/2a con a = −2 y b = 8."],
      pasos: ["h = −8/(2·(−2)) = 2.", "k = −2·4 + 16 − 3 = 5. V(2, 5): es un máximo (a &lt; 0)."],
      resultado: "V(2, 5)" },
    { id: "u19", nivel: 2,
      enunciado: "Halla la parábola de vértice (1, −4) que pasa por (3, 4) y da sus coeficientes a, b y c en y = ax² + bx + c.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 2 }, { tipo: "num", etiqueta: "b =", valor: -4 }, { tipo: "num", etiqueta: "c =", valor: -2 }],
      pistas: ["y = a(x − 1)² − 4. Con el punto (3, 4) sale a. Después, desarrolla."],
      pasos: ["4 = a(3 − 1)² − 4 → 4a = 8 → a = 2.", "y = 2(x² − 2x + 1) − 4 = 2x² − 4x − 2."],
      resultado: "y = 2x² − 4x − 2" },
    { id: "u20", nivel: 2,
      enunciado: "Se quiere cercar un corral rectangular aprovechando un muro (el lado del muro no necesita valla) con 60 m de valla. Si x es la longitud de cada lado perpendicular al muro, calcula x que maximiza el área, la longitud del lado paralelo y el área máxima.",
      check: [{ tipo: "num", etiqueta: "x (m) =", valor: 15 }, { tipo: "num", etiqueta: "Lado paralelo (m) =", valor: 30 }, { tipo: "num", etiqueta: "Área máxima (m²) =", valor: 450 }],
      pistas: ["Lado paralelo = 60 − 2x. Área A(x) = x(60 − 2x)."],
      pasos: ["A(x) = 60x − 2x², parábola con a = −2 &lt; 0.", "Vértice: x = −60/(2·(−2)) = 15 m. Lado paralelo: 60 − 30 = 30 m.", "A(15) = 15·30 = 450 m²."],
      resultado: "x = 15 m · lado 30 m · área 450 m²" },
    { id: "u21", nivel: 2,
      enunciado: "La altura de un proyectil es h(t) = −5t² + 20t + 1 (m, t en s). Halla la altura máxima y el instante (con dos decimales) en que toca el suelo.",
      check: [{ tipo: "num", etiqueta: "Altura máxima (m) =", valor: 21 }, { tipo: "num", etiqueta: "Tiempo en el suelo (s) =", valor: 4.05 }],
      pistas: ["Vértice para el máximo; h(t) = 0 para el suelo (descarta la solución negativa)."],
      pasos: ["t = 20/10 = 2 s; h(2) = −20 + 40 + 1 = 21 m.", "−5t² + 20t + 1 = 0 → t = (20 ± √420)/10 → t = 4,05 s (la otra, −0,05 s, no vale)."],
      resultado: "21 m y 4,05 s" },
    { id: "u22", nivel: 2,
      enunciado: "Halla k para que f(x) = { kx − 2 si x ≤ 3 ; x² − 2k si x &gt; 3 } sea continua en x = 3.",
      check: { tipo: "num", etiqueta: "k =", valor: 2.2 },
      pistas: ["Iguala los valores de los dos trozos en x = 3."],
      pasos: ["Trozo izquierdo en 3: 3k − 2. Trozo derecho en 3: 9 − 2k.", "3k − 2 = 9 − 2k → 5k = 11 → k = 11/5 = 2,2."],
      resultado: "k = 11/5 = 2,2" },
    { id: "u23", nivel: 2,
      enunciado: "Resuelve |3x + 1| = 8. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-3, 7 / 3], ph: "dos valores" },
      pistas: ["|u| = 8 equivale a u = 8 o u = −8."],
      pasos: ["3x + 1 = 8 → x = 7/3.", "3x + 1 = −8 → x = −3."],
      resultado: "x = −3 y x = 7/3" },
    { id: "u24", nivel: 2,
      enunciado: "Una población de 5 000 habitantes crece un 4 % anual. Calcula la población a los 10 años (redondea a las unidades).",
      check: { tipo: "num", etiqueta: "P(10) =", valor: 7401 },
      pistas: ["P(t) = 5000·1,04ᵗ."],
      pasos: ["P(10) = 5000·1,04¹⁰ = 5000·1,48024 = 7 401,2 habitantes."],
      resultado: "≈ 7 401 habitantes" },
    { id: "u25", nivel: 2,
      enunciado: "¿Cuántos años tarda en duplicarse una población que crece un 4 % anual? (con dos decimales)",
      check: { tipo: "num", etiqueta: "t (años) =", valor: 17.67 },
      pistas: ["1,04ᵗ = 2 → t = ln 2/ln 1,04."],
      pasos: ["t = ln 2/ln 1,04 = 0,69315/0,039221 = 17,67 años."],
      resultado: "17,67 años" },
    { id: "u26", nivel: 2,
      enunciado: "Halla la función inversa de f(x) = (2x − 1)/3.",
      check: { tipo: "expr", etiqueta: "f⁻¹(x) =", expr: "(3x+1)/2", ph: "por ejemplo (3x+1)/2" },
      pistas: ["Intercambia x e y: x = (2y − 1)/3, y despeja y."],
      pasos: ["x = (2y − 1)/3 → 3x = 2y − 1 → 2y = 3x + 1 → y = (3x + 1)/2.", "Comprobación: f(f⁻¹(x)) = (2·(3x + 1)/2 − 1)/3 = (3x + 1 − 1)/3 = x ✓."],
      resultado: "f⁻¹(x) = (3x + 1)/2" },

    // ================= ★★★ avanzado =================
    { id: "u27", nivel: 3,
      enunciado: "Sean f(x) = 3x − 1 y g(x) = x² + 2. Calcula (f∘g)(1), (g∘f)(1) y escribe la fórmula de (f∘g)(x).",
      check: [{ tipo: "num", etiqueta: "(f∘g)(1) =", valor: 8 }, { tipo: "num", etiqueta: "(g∘f)(1) =", valor: 6 }, { tipo: "expr", etiqueta: "(f∘g)(x) =", expr: "3x^2+5", ph: "una expresión en x" }],
      pistas: ["(f∘g)(x) = f(g(x)): sustituye g(x) en f."],
      pasos: ["g(1) = 3 y f(3) = 8. f(1) = 2 y g(2) = 6.", "(f∘g)(x) = f(x² + 2) = 3(x² + 2) − 1 = 3x² + 5."],
      resultado: "8 · 6 · 3x² + 5" },
    { id: "u28", nivel: 3,
      enunciado: "Sean f(x) = √x y g(x) = x² − 9. El dominio de f∘g es (−∞, a] ∪ [b, +∞). Halla a y b.",
      check: { tipo: "lista", etiqueta: "a, b =", valores: [-3, 3], ph: "a y b" },
      pistas: ["(f∘g)(x) = √(x² − 9): hace falta x² − 9 ≥ 0."],
      pasos: ["x² − 9 ≥ 0 → x ≤ −3 o x ≥ 3.", "Dom(f∘g) = (−∞, −3] ∪ [3, +∞)."],
      resultado: "(−∞, −3] ∪ [3, +∞)" },
    { id: "u29", nivel: 3,
      enunciado: "Halla la función inversa de f(x) = (3x + 2)/(x − 1).",
      check: { tipo: "expr", etiqueta: "f⁻¹(x) =", expr: "(x+2)/(x-3)", dom: [4, 9], ph: "una fracción en x" },
      pistas: ["x = (3y + 2)/(y − 1) → xy − x = 3y + 2 → agrupa los términos con y."],
      pasos: ["x(y − 1) = 3y + 2 → xy − x = 3y + 2 → xy − 3y = x + 2.", "y(x − 3) = x + 2 → y = (x + 2)/(x − 3).", "Dom f = ℝ − {1} y Im f = ℝ − {3}: en la inversa se intercambian."],
      resultado: "f⁻¹(x) = (x + 2)/(x − 3)" },
    { id: "u30", nivel: 3,
      enunciado: "Halla las asíntotas de f(x) = (2x − 1)/(x + 3): la vertical x = a y la horizontal y = b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: -3 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["Vertical: denominador cero. Horizontal: cociente de los coeficientes de x."],
      pasos: ["x + 3 = 0 → x = −3.", "b = 2/1 = 2. (También: (2x − 1)/(x + 3) = 2 − 7/(x + 3).)"],
      resultado: "x = −3 e y = 2" },
    { id: "u31", nivel: 3,
      enunciado: "Para f(x) = −2|x − 1| + 3, halla los cortes con el eje X.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-0.5, 2.5], ph: "dos valores" },
      pistas: ["Despeja |x − 1| y separa en dos casos."],
      pasos: ["−2|x − 1| + 3 = 0 → |x − 1| = 3/2.", "x − 1 = 3/2 → x = 5/2 · x − 1 = −3/2 → x = −1/2.", "Vértice (1, 3), abre hacia abajo."],
      resultado: "x = −1/2 y x = 5/2" },
    { id: "u32", nivel: 3,
      enunciado: "Halla las abscisas de los puntos de corte de y = x² − 4x + 3 e y = x − 1.",
      check: { tipo: "lista", etiqueta: "x =", valores: [1, 4], ph: "dos valores" },
      pistas: ["Iguala las dos expresiones."],
      pasos: ["x² − 4x + 3 = x − 1 → x² − 5x + 4 = 0 → x = 1 y x = 4.", "Puntos: (1, 0) y (4, 3)."],
      resultado: "x = 1 y x = 4" },
    { id: "u33", nivel: 3,
      enunciado: "Resuelve gráficamente (parábola) la inecuación x² − 2x − 8 &lt; 0. Da los extremos del intervalo solución.",
      check: { tipo: "lista", etiqueta: "extremos =", valores: [-2, 4], ph: "dos valores" },
      pistas: ["Halla las raíces de x² − 2x − 8. La parábola abre hacia arriba."],
      pasos: ["x² − 2x − 8 = 0 → x = 4 y x = −2.", "a &gt; 0: negativa entre las raíces → solución (−2, 4)."],
      resultado: "(−2, 4)" },
    { id: "u34", nivel: 3,
      enunciado: "Resuelve log₃ x + log₃(x − 2) = 1. Da la solución válida.",
      check: { tipo: "num", etiqueta: "x =", valor: 3 },
      pistas: ["Suma de logaritmos = logaritmo del producto. Comprueba el dominio al final."],
      pasos: ["log₃[x(x − 2)] = 1 → x(x − 2) = 3 → x² − 2x − 3 = 0 → x = 3 y x = −1.", "Dominio: x &gt; 0 y x − 2 &gt; 0 → x &gt; 2: se descarta x = −1.", "x = 3. (Comprobación: log₃ 3 + log₃ 1 = 1 + 0 = 1 ✓.)"],
      resultado: "x = 3" },
    { id: "u35", nivel: 3,
      enunciado: "Resuelve 4ˣ − 5·2ˣ + 4 = 0. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 2], ph: "dos valores" },
      pistas: ["Cambia t = 2ˣ (entonces 4ˣ = t²)."],
      pasos: ["t² − 5t + 4 = 0 → t = 1 y t = 4.", "2ˣ = 1 → x = 0. 2ˣ = 4 → x = 2."],
      resultado: "x = 0 y x = 2" },
    { id: "u36", nivel: 3,
      enunciado: "Para y = 2·cos(3x) − 1 halla la amplitud, el periodo (decimales) y el valor máximo.",
      check: [{ tipo: "num", etiqueta: "Amplitud =", valor: 2 }, { tipo: "num", etiqueta: "Periodo =", valor: 2.0944 }, { tipo: "num", etiqueta: "Máximo =", valor: 1 }],
      pistas: ["A = 2, B = 3, D = −1."],
      pasos: ["Amplitud |A| = 2. Periodo 2π/3 ≈ 2,094. Máximo D + |A| = −1 + 2 = 1 (y mínimo −3)."],
      resultado: "2 · 2π/3 · 1" },
    { id: "u37", nivel: 3,
      enunciado: "Una tabla da y = 3, 6, 12, 24 para x = 0, 1, 2, 3. Identifica el modelo y calcula y para x = 5.",
      check: { tipo: "num", etiqueta: "y(5) =", valor: 96 },
      pistas: ["Cocientes entre valores consecutivos."],
      pasos: ["6/3 = 12/6 = 24/12 = 2: exponencial. y = 3·2ˣ.", "y(5) = 3·32 = 96."],
      resultado: "y = 3·2ˣ → y(5) = 96" },
    { id: "u38", nivel: 3,
      enunciado: "Una tabla da y = 1, 3, 9, 19 para x = 0, 1, 2, 3. Identifica el modelo y calcula y para x = 10.",
      check: { tipo: "num", etiqueta: "y(10) =", valor: 201 },
      pistas: ["Diferencias primeras y segundas."],
      pasos: ["Diferencias: 2, 6, 10. Segundas: 4, 4: cuadrática con 2a = 4 → a = 2.", "c = 1 (x = 0) y 2 + b + 1 = 3 → b = 0. y = 2x² + 1.", "y(10) = 200 + 1 = 201."],
      resultado: "y = 2x² + 1 → y(10) = 201" },
    { id: "u39", nivel: 3,
      enunciado: "La altura de la marea es h(t) = 2 + 1,5·sen(πt/6) (m, t en horas). Calcula el periodo (en horas), la altura máxima y la mínima.",
      check: [{ tipo: "num", etiqueta: "Periodo (h) =", valor: 12 }, { tipo: "num", etiqueta: "Máxima (m) =", valor: 3.5 }, { tipo: "num", etiqueta: "Mínima (m) =", valor: 0.5 }],
      pistas: ["B = π/6, A = 1,5, D = 2."],
      pasos: ["T = 2π/(π/6) = 12 h.", "Máxima 2 + 1,5 = 3,5 m. Mínima 2 − 1,5 = 0,5 m."],
      resultado: "12 h · 3,5 m · 0,5 m" },
    { id: "u40", nivel: 3,
      enunciado: "Sea f(x) = 2ˣ + 1. Calcula f⁻¹(9).",
      check: { tipo: "num", etiqueta: "f⁻¹(9) =", valor: 3 },
      pistas: ["f⁻¹(9) es el x que cumple f(x) = 9."],
      pasos: ["2ˣ + 1 = 9 → 2ˣ = 8 → x = 3.", "(En general: f⁻¹(x) = log₂(x − 1) y log₂ 8 = 3.)"],
      resultado: "3" },
    { id: "u41", nivel: 3,
      enunciado: "Descompón h(x) = √(x² + 1) como una composición h = f∘g. ¿Cuáles son f y g?",
      check: { tipo: "opcion", etiqueta: "f y g son", opciones: ["f(x) = √x y g(x) = x² + 1", "f(x) = x² + 1 y g(x) = √x", "f(x) = √(x²) y g(x) = x + 1", "f(x) = x² y g(x) = √(x + 1)"], ok: 0 },
      pistas: ["La última operación que se hace al calcular el valor es la función de fuera."],
      pasos: ["Primero se calcula x² + 1 (lo de dentro, g) y después la raíz (lo de fuera, f): f(g(x)) = √(x² + 1)."],
      resultado: "f(x) = √x, g(x) = x² + 1" },
    { id: "u42", nivel: 3,
      enunciado: "Una empresa de mensajería cobra 5 € si el paquete pesa hasta 2 kg y, a partir de 2 kg, 5 € más 1,50 € por cada kg adicional (se paga proporcional al exceso). Escribe el coste C(x) a trozos y calcula el coste de un paquete de 7 kg.",
      check: { tipo: "num", etiqueta: "C(7) (€) =", valor: 12.5 },
      pistas: ["Para x &gt; 2: C(x) = 5 + 1,5(x − 2)."],
      pasos: ["C(x) = { 5 si 0 &lt; x ≤ 2 ; 5 + 1,5(x − 2) si x &gt; 2 }.", "C(7) = 5 + 1,5·5 = 12,5 €."],
      resultado: "12,5 €" },
    { id: "u43", nivel: 3,
      enunciado: "Estudia completamente f(x) = (x² − 1)/(x² + 1): dominio, simetría, cortes con los ejes, signo, asíntota horizontal, extremos y recorrido. (Pista: f(x) = 1 − 2/(x² + 1).)",
      check: { tipo: "rubrica", etiqueta: "Tu estudio", filas: 9, items: [
        { t: "Dominio ℝ: el denominador x² + 1 ≥ 1 nunca se anula", p: 0.4 },
        { t: "Simetría: f(−x) = f(x), función par (simétrica respecto del eje Y)", p: 0.4 },
        { t: "Cortes: con Y f(0) = −1 → (0, −1); con X x² − 1 = 0 → x = ±1", p: 0.5 },
        { t: "Signo: positiva en (−∞, −1) ∪ (1, +∞) y negativa en (−1, 1)", p: 0.4 },
        { t: "Asíntota horizontal y = 1 (f = 1 − 2/(x² + 1) y 2/(x² + 1) → 0); sin asíntotas verticales", p: 0.5 },
        { t: "Mínimo absoluto (0, −1): como x² + 1 ≥ 1, 2/(x² + 1) ≤ 2 y f ≥ −1", p: 0.4 },
        { t: "Recorrido [−1, 1): llega a −1 pero a 1 sólo se acerca sin alcanzarlo", p: 0.4 }
      ] },
      pasos: ["f(x) = (x² − 1)/(x² + 1) = 1 − 2/(x² + 1).", "Dominio ℝ; par; cortes (0, −1), (−1, 0), (1, 0); positiva fuera de [−1, 1]; asíntota y = 1.", "Decrece en (−∞, 0) y crece en (0, +∞); mínimo (0, −1); recorrido [−1, 1)."],
      resultado: "Dom ℝ · par · mínimo (0, −1) · asíntota y = 1 · Im [−1, 1)" },
    { id: "u44", nivel: 3,
      enunciado: "Explica con tus palabras por qué f(x) = x² no tiene función inversa en todo ℝ y cómo se puede arreglar.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 5, items: [
        { t: "Dice que una función necesita ser inyectiva para tener inversa (cada y sale de un solo x)", p: 0.5 },
        { t: "Da un contraejemplo: f(2) = f(−2) = 4 (o la recta horizontal y = 4 corta dos veces)", p: 0.5 },
        { t: "Propone restringir el dominio (x ≥ 0 o x ≤ 0)", p: 0.5 },
        { t: "Indica la inversa resultante (√x para x ≥ 0; −√x para x ≤ 0)", p: 0.5 }
      ] },
      pasos: ["Para invertir hay que despejar x de y = x², lo que da x = ±√y: dos valores. La función no es inyectiva.", "Con la restricción x ≥ 0 sí lo es, y la inversa es f⁻¹(x) = √x."],
      resultado: "x² no es inyectiva; se restringe a x ≥ 0 y f⁻¹(x) = √x" },
    { id: "u45", nivel: 3,
      enunciado: "Demuestra que el vértice de la parábola y = ax² + bx + c está en x = −b/2a, completando el cuadrado.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Saca a factor común en los dos primeros términos: a(x² + (b/a)x) + c", p: 0.5 },
        { t: "Completa el cuadrado: x² + (b/a)x = (x + b/2a)² − b²/4a²", p: 0.5 },
        { t: "Llega a y = a(x + b/2a)² + c − b²/4a", p: 0.5 },
        { t: "Razona que (x + b/2a)² ≥ 0 y es 0 sólo si x = −b/2a, que es donde está el extremo", p: 0.5 }
      ] },
      pasos: ["ax² + bx + c = a[x² + (b/a)x] + c = a[(x + b/2a)² − b²/4a²] + c = a(x + b/2a)² + c − b²/4a.", "El término (x + b/2a)² vale 0 en x = −b/2a y es positivo en el resto: ahí está el vértice, con ordenada c − b²/4a = −Δ/4a. ∎"],
      resultado: "x_v = −b/2a, y_v = c − b²/4a" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Dominio: qué vigilar", ancha: true,
      tabla: { cab: ["Si ves…", "Impón", "Ejemplo → dominio"], filas: [
        ["polinomio", "nada", "x³ − 2x → ℝ"],
        ["fracción", "denominador ≠ 0", "1/(x − 3) → ℝ − {3}"],
        ["√ (índice par)", "radicando ≥ 0", "√(x − 2) → [2, ∞)"],
        ["√ en el denominador", "radicando &gt; 0", "1/√(x − 1) → (1, ∞)"],
        ["log, ln", "argumento &gt; 0", "ln(x + 1) → (−1, ∞)"],
        ["varias cosas a la vez", "intersección de condiciones", "ln(x − 1) + √(5 − x) → (1, 5]"]
      ] },
      nota: "No simplifiques antes de calcular el dominio: (x² − 1)/(x − 1) tiene dominio ℝ − {1}." },
    { titulo: "Ficha de una función",
      items: [
        { label: "Cortes con los ejes", formula: "Y: f(0)  ·  X: f(x) = 0" },
        { label: "Simetría", formula: "par: f(−x) = f(x)  ·  impar: f(−x) = −f(x)", ojo: "El dominio debe ser simétrico." },
        { label: "Creciente en I", formula: "x₁ &lt; x₂ ⇒ f(x₁) &lt; f(x₂)", cuando: "Se estudia en intervalos." },
        { label: "Periodo T", formula: "f(x + T) = f(x)" },
        { label: "Recorrido", formula: "los valores de y alcanzados", cuando: "Se lee en el eje Y." }
      ],
      nota: "Orden de lectura: dominio · recorrido · cortes · signo · crecimiento · extremos · simetría · asíntotas." },
    { titulo: "Función afín y cuadrática",
      items: [
        { label: "Afín", formula: "f(x) = mx + n", cuando: "m = Δy/Δx; n = f(0).", ejemplo: "(2, 7) y (5, 16) → m = 3, n = 1" },
        { label: "Cuadrática (3 formas)", formula: "ax² + bx + c  ·  a(x − h)² + k  ·  a(x − x₁)(x − x₂)" },
        { label: "Vértice", formula: "x_v = −b/2a  ·  y_v = f(x_v) = c − b²/4a" },
        { label: "Discriminante", formula: "Δ = b² − 4ac", cuando: "Δ &gt; 0: dos cortes · Δ = 0: tangente · Δ &lt; 0: ninguno." }
      ] },
    { titulo: "Hipérbola y raíz",
      items: [
        { label: "Proporcionalidad inversa", formula: "y = k/x", cuando: "x·y constante. Asíntotas: los ejes." },
        { label: "Homográfica", formula: "y = (ax + b)/(cx + d) = q + k/(x − p)", ejemplo: "(3x − 2)/(x + 1) = 3 − 5/(x + 1)" },
        { label: "Asíntotas", formula: "vertical x = −d/c  ·  horizontal y = a/c" },
        { label: "Raíz", formula: "y = √(bx + c) + d", cuando: "Dominio: bx + c ≥ 0.", ojo: "Si elevas al cuadrado, comprueba las soluciones." }
      ] },
    { titulo: "Valor absoluto y a trozos",
      items: [
        { label: "Definición", formula: "|u| = u si u ≥ 0 · −u si u &lt; 0" },
        { label: "Ecuación", formula: "|u| = c ⇔ u = c o u = −c" },
        { label: "Inecuaciones", formula: "|u| &lt; c ⇔ −c &lt; u &lt; c  ·  |u| &gt; c ⇔ u &lt; −c o u &gt; c" },
        { label: "Continuidad en x = a", formula: "valor izquierdo = valor derecho = f(a)", ojo: "Si falla: salto o evitable." }
      ],
      nota: "Extremos: relleno si incluye (≤, ≥), hueco si no (&lt;, &gt;)." },
    { titulo: "Exponencial y logaritmo", ancha: true,
      tabla: { cab: ["", "aˣ", "logₐ x"], filas: [
        ["Dominio", "ℝ", "(0, +∞)"],
        ["Recorrido", "(0, +∞)", "ℝ"],
        ["Puntos", "(0, 1) y (1, a)", "(1, 0) y (a, 1)"],
        ["Asíntota", "y = 0", "x = 0"],
        ["Crece si", "a &gt; 1", "a &gt; 1"]
      ] },
      items: [
        { label: "Propiedades del log", formula: "log(xy) = log x + log y · log(x/y) = log x − log y · log xⁿ = n·log x · logₐ x = ln x/ln a" },
        { label: "Modelo exponencial", formula: "C(t) = C₀·aᵗ  con  a = 1 + r/100", ejemplo: "t = ln(meta/C₀)/ln a" }
      ] },
    { titulo: "Trigonométricas",
      items: [
        { label: "Onda general", formula: "y = A·sen(B(x − C)) + D" },
        { label: "Amplitud · periodo", formula: "|A|  ·  T = 2π/|B|  (tan: π/|B|)" },
        { label: "Máx · mín · eje", formula: "D + |A|  ·  D − |A|  ·  y = D" },
        { label: "De la gráfica a la fórmula", formula: "A = (M − m)/2 · D = (M + m)/2 · B = 2π/T" }
      ] },
    { titulo: "Transformaciones", ancha: true,
      tabla: { cab: ["Función", "Efecto"], filas: [
        ["f(x) + k", "sube k"], ["f(x − h)", "desplaza h a la derecha"], ["a·f(x)", "estira (|a| &gt; 1) / aplasta"],
        ["−f(x)", "refleja respecto del eje X"], ["f(−x)", "refleja respecto del eje Y"], ["f(bx)", "comprime en horizontal (1/b)"],
        ["|f(x)|", "refleja hacia arriba lo negativo"], ["f(|x|)", "copia la parte derecha en la izquierda"]
      ] },
      nota: "Dentro del paréntesis (a la x): actúa «al revés». Fuera (a la y): «al derecho»." },
    { titulo: "Composición e inversa",
      items: [
        { label: "Composición", formula: "(f∘g)(x) = f(g(x))", cuando: "Primero g, luego f.", ojo: "No es conmutativa." },
        { label: "Dominio de f∘g", formula: "x ∈ Dom g y g(x) ∈ Dom f" },
        { label: "Inversa", formula: "f⁻¹(b) = a ⇔ f(a) = b", cuando: "Cambia x por y y despeja. f debe ser inyectiva." },
        { label: "Gráfica de f⁻¹", formula: "reflejo de f respecto de y = x" }
      ] },
    { titulo: "¿Qué modelo elijo?",
      tabla: { cab: ["Dato", "Modelo"], filas: [
        ["Δy constante", "afín"], ["Δ²y constante", "cuadrática"], ["cociente y₂/y₁ constante", "exponencial"], ["producto x·y constante", "inversa k/x"], ["se repite", "trigonométrica"]
      ] },
      nota: "Con 2 puntos: recta o exponencial. Con 3: parábola. Comprueba con un cuarto dato." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Dominio de (x² − 9)/(x − 3) = ℝ «porque simplifica»", bien: "ℝ − {3}", por: "El dominio se calcula antes de simplificar." },
        { mal: "√(x²) = x", bien: "√(x²) = |x|", por: "La raíz es siempre ≥ 0." },
        { mal: "ln(x²) = 2 ln x", bien: "ln(x²) = 2 ln|x|", por: "ln x exige x &gt; 0." },
        { mal: "|x − 3| = x − 3 siempre", bien: "Depende del signo de x − 3", por: "Divide en dos casos." },
        { mal: "Inversa de 2x = 1/(2x)", bien: "x/2", por: "Inversa ≠ inverso." },
        { mal: "1/x decrece en todo su dominio", bien: "Decrece en cada rama", por: "Entre ramas no se cumple." }
      ] }
  ];

  B.registrar("mates1", "t9", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
