/* ============================================================
   Matemáticas I · ampliaciones · Tema 10: Límites y continuidad
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t10/" + ref); }
  function lim(a, f) { return "lím<sub>x→" + a + "</sub> " + f; }

  var resumen = [
    "<b>lím<sub>x→a</sub> f(x) = L</b>: f(x) se acerca a L tanto como quieras al acercar x a a (x ≠ a). No importa lo que valga f(a), ni siquiera si existe.",
    "El límite existe si y sólo si los <b>límites laterales</b> existen y coinciden. Pueden fallar de tres maneras: laterales distintos (salto), tendencia a ±∞ o oscilación.",
    "Se sustituye primero: si sale un número, es el límite. k/0 → estudia los signos a cada lado. <b>Indeterminaciones</b>: 0/0, ∞/∞, ∞ − ∞, 0·∞, 1^∞ (hay que transformar la expresión).",
    "0/0: factorizar o multiplicar por el conjugado. ∞/∞ en racionales: comparar grados. ∞ − ∞ con raíces: conjugado. 1^∞: número e, lím f^g = e^(lím g·(f − 1)).",
    "Asíntotas: <b>vertical</b> x = a si lím = ±∞; <b>horizontal</b> y = L si lím<sub>x→±∞</sub> f = L; <b>oblicua</b> y = mx + n con m = lím f/x y n = lím (f − mx).",
    "<b>Continua</b> en a: existe f(a), existe el límite y coinciden. Discontinuidades: evitable, salto finito, salto infinito y esencial. Bolzano: continua en [a, b] con f(a)·f(b) &lt; 0 ⇒ hay una raíz en (a, b)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Idea intuitiva
  secciones[0] =
    "<h5>De una tabla de valores al límite</h5>" +
    "<p>La forma más honesta de entender un límite es <b>acercarse</b> al punto y observar. Tomemos f(x) = (x² − 1)/(x − 1) y acerquémonos a x = 1 (donde la fórmula no se puede usar, porque da 0/0):</p>" +
    tabla(["x (por la izquierda)", "0,9", "0,99", "0,999", "0,9999"], [["f(x)", "1,9", "1,99", "1,999", "1,9999"]]) +
    tabla(["x (por la derecha)", "1,1", "1,01", "1,001", "1,0001"], [["f(x)", "2,1", "2,01", "2,001", "2,0001"]]) +
    "<p>En los dos lados los valores se pegan a <b>2</b>. Escribimos <b>lím<sub>x→1</sub> (x² − 1)/(x − 1) = 2</b>. Fíjate en que f(1) <i>no existe</i> y, aun así, el límite vale 2: el límite habla de lo que pasa <b>cerca</b> de 1, nunca de lo que pasa <i>en</i> 1. (De hecho, (x² − 1)/(x − 1) = x + 1 siempre que x ≠ 1: la gráfica es la recta y = x + 1 con un hueco en (1, 2).)</p>" +
    w("acercar") +
    "<h5>Cómo se lee</h5>" +
    "<p><b>lím<sub>x→a</sub> f(x) = L</b> se lee «el límite de f(x) cuando x tiende a a es L» y significa: <i>podemos hacer que f(x) esté tan cerca de L como queramos, sin más que tomar x suficientemente cerca de a (pero distinto de a)</i>. Las palabras clave son «tan cerca como queramos» (es una tendencia ilimitada) y «distinto de a» (el punto mismo no cuenta).</p>" +
    "<h5>Los tres escenarios en un punto</h5>" +
    "<p>Cuando existe el límite L en x = a, hay tres posibilidades para el valor de f(a):</p>" +
    tabla(["f(a)…", "Ejemplo", "Qué se ve en la gráfica"], [
      ["existe y es igual a L", "f(x) = x², a = 2: lím = 4 = f(2)", "la curva pasa por el punto: <b>continua</b>"],
      ["no existe", "f(x) = (x² − 1)/(x − 1), a = 1", "un <b>hueco</b>"],
      ["existe pero es distinto de L", "f(x) = x + 1 si x ≠ 1 y f(1) = 5", "un <b>punto desplazado</b> fuera de la curva"]
    ]) +
    "<h5>Cuándo un límite no existe</h5>" +
    "<p>Hay tres razones distintas (y conviene saber distinguirlas):</p>" +
    "<ol>" +
    "<li><b>Los límites laterales son distintos</b> (un salto): f(x) = |x|/x en x = 0 vale −1 a la izquierda y 1 a la derecha.</li>" +
    "<li><b>La función se dispara hacia ±∞</b> (asíntota vertical): 1/x en x = 0. En rigor el límite «no existe» como número (aunque a veces se escribe lím = +∞ o −∞ para describir cómo falla).</li>" +
    "<li><b>La función oscila sin estabilizarse</b>: sen(1/x) en x = 0 toma infinitas veces todos los valores entre −1 y 1 cerca del 0.</li>" +
    "</ol>" +
    "<h5>La definición exacta (para quien quiera entender de verdad)</h5>" +
    "<p>«Tan cerca como queramos» se traduce con dos números pequeños: una tolerancia ε en el eje Y y una distancia δ en el eje X. <b>lím<sub>x→a</sub> f(x) = L</b> significa: <i>para cada ε &gt; 0 existe un δ &gt; 0 tal que, si 0 &lt; |x − a| &lt; δ, entonces |f(x) − L| &lt; ε</i>. Es un juego: tú eliges la tolerancia ε (tan pequeña como quieras) y yo tengo que encontrar el δ que lo cumple. En la sección «La definición ε–δ» de más abajo puedes jugarlo con un deslizador.</p>";

  // ---------------------------------------------------------------- 2. Laterales
  secciones[1] =
    "<h5>Definición y notación</h5>" +
    "<p>Acercarse por la izquierda significa tomar x &lt; a (x → a⁻); por la derecha, x &gt; a (x → a⁺). Se escribe <b>lím<sub>x→a⁻</sub> f(x)</b> y <b>lím<sub>x→a⁺</sub> f(x)</b>. La relación entre el límite y los laterales es:</p>" +
    H.formula("lím<sub>x→a</sub> f(x) = L  ⟺  lím<sub>x→a⁻</sub> f(x) = L  y  lím<sub>x→a⁺</sub> f(x) = L") +
    "<p>Si un lateral no existe o los dos son distintos, el límite no existe. Los laterales son imprescindibles en tres situaciones: <b>funciones a trozos</b> (en el punto de unión), <b>valores absolutos</b> (cambian de fórmula en el cero de su interior) y <b>divisiones entre 0</b> (el signo del denominador cambia).</p>" +
    ejemplo("Valor absoluto en un cociente", "Calcula los límites laterales de f(x) = (x² − 4)/|x − 2| en x = 2.", [
      "Por la derecha (x &gt; 2): |x − 2| = x − 2, luego f(x) = (x − 2)(x + 2)/(x − 2) = x + 2 → <b>4</b>.",
      "Por la izquierda (x &lt; 2): |x − 2| = −(x − 2), luego f(x) = −(x + 2) → <b>−4</b>.",
      "Los laterales son distintos (4 y −4): el límite en x = 2 <b>no existe</b> (salto)."
    ]) +
    ejemplo("Función a trozos", "Estudia los laterales de f(x) = { x² si x &lt; 1 ; 2x − 1 si x ≥ 1 } en x = 1.", [
      "Por la izquierda se usa x²: lím = 1² = 1. Por la derecha se usa 2x − 1: lím = 2·1 − 1 = 1.",
      "Los laterales coinciden: <b>lím<sub>x→1</sub> f(x) = 1</b>. Y f(1) = 2·1 − 1 = 1. Todo encaja: continua en x = 1."
    ]) +
    "<h5>Cuando el denominador se anula: el signo manda</h5>" +
    "<p>Si al sustituir queda <b>k/0 con k ≠ 0</b>, el límite no es una indeterminación: la función se dispara a infinito. Falta saber <i>hacia cuál</i>, y eso lo decide el signo. Se estudia el signo del numerador y del denominador un poquito antes y un poquito después de a:</p>" +
    tabla(["Cociente", "Signo", "Resultado"], [
      ["k/0⁺ con k &gt; 0", "(+)/(+)", "+∞"],
      ["k/0⁻ con k &gt; 0", "(+)/(−)", "−∞"],
      ["k/0⁺ con k &lt; 0", "(−)/(+)", "−∞"],
      ["k/0⁻ con k &lt; 0", "(−)/(−)", "+∞"]
    ]) +
    ejemplo("Un denominador que se anula", "Calcula lím<sub>x→3</sub> (x + 1)/(x − 3) y lím<sub>x→1</sub> 3/(x − 1)².", [
      "<b>(x + 1)/(x − 3)</b>: al sustituir queda 4/0. Por la derecha, x − 3 es un número pequeño positivo → 4/0⁺ = +∞. Por la izquierda, x − 3 es pequeño negativo → 4/0⁻ = −∞. Laterales distintos: no existe límite; hay una asíntota vertical.",
      "<b>3/(x − 1)²</b>: el denominador (x − 1)² es siempre positivo (un cuadrado). A los dos lados: 3/0⁺ = +∞. Como los dos laterales coinciden, se puede escribir <b>lím = +∞</b>."
    ]) +
    ojo("con una potencia par en el denominador, el signo no cambia al pasar por el punto, y los dos laterales suelen coincidir en ±∞. Con una potencia impar (o con un factor de grado 1), el signo cambia y los laterales son opuestos.") +
    w("trozos") +
    "<h5>Extremos del dominio</h5>" +
    "<p>Si una función sólo está definida a un lado de a (por ejemplo √x en x = 0, que sólo existe por la derecha), sólo tiene sentido el límite lateral: lím<sub>x→0⁺</sub> √x = 0. Por convenio, el límite «bilateral» no se plantea.</p>";

  // ---------------------------------------------------------------- 3. Sustitución
  secciones[2] =
    "<h5>Propiedades de los límites</h5>" +
    "<p>Si lím f = L y lím g = M (números reales), entonces:</p>" +
    tabla(["Operación", "Resultado", "Condición"], [
      ["Suma y resta", "lím (f ± g) = L ± M", "—"],
      ["Producto por un número", "lím (k·f) = k·L", "—"],
      ["Producto", "lím (f·g) = L·M", "—"],
      ["Cociente", "lím (f/g) = L/M", "M ≠ 0"],
      ["Potencia", "lím (fⁿ) = Lⁿ", "—"],
      ["Raíz", "lím ⁿ√f = ⁿ√L", "L ≥ 0 si n es par"],
      ["Exponencial y logaritmo", "lím aᶠ = aᴸ · lím logₐ f = logₐ L", "L &gt; 0 para el logaritmo"]
    ]) +
    "<p>De aquí sale lo que habíamos visto: las funciones <b>continuas</b> (polinomios, racionales en su dominio, raíces, exponenciales, logaritmos, seno, coseno…) cumplen lím<sub>x→a</sub> f(x) = f(a) en cualquier punto a de su dominio. Por eso la mayoría de los límites se calculan simplemente <b>sustituyendo</b>.</p>" +
    ejemplo("Sustituir", "Calcula lím<sub>x→−1</sub> (x² + 2)/(x − 3), lím<sub>x→4</sub> √(x² − 7) y lím<sub>x→0</sub> (cos x)/(x + 2).", [
      "(1 + 2)/(−1 − 3) = 3/(−4) = <b>−3/4</b>.",
      "√(16 − 7) = √9 = <b>3</b>.",
      "cos 0/(0 + 2) = 1/2 = <b>0,5</b>."
    ]) +
    "<h5>El cuadro de decisión: ¿qué sale al sustituir?</h5>" +
    tabla(["Al sustituir sale…", "Qué significa", "Qué hay que hacer"], [
      ["un número L", "ése es el límite", "nada más"],
      ["k/0 (k ≠ 0)", "tendencia infinita, no es indeterminación", "estudiar los signos a cada lado (laterales)"],
      ["0/0", "indeterminación", "factorizar y simplificar, o multiplicar por el conjugado"],
      ["∞/∞", "indeterminación", "dividir por la mayor potencia (o comparar grados)"],
      ["∞ − ∞", "indeterminación", "común denominador, o conjugado si hay raíces"],
      ["0·∞", "indeterminación", "convertirlo en un cociente (0/0 o ∞/∞)"],
      ["1^∞", "indeterminación", "usar el número e"],
      ["0⁰, ∞⁰", "indeterminaciones (raras en este curso)", "se transforman con logaritmos"]
    ]) +
    "<h5>Operaciones con infinito (las que SÍ se pueden hacer)</h5>" +
    tabla(["Expresión", "Resultado", "Expresión", "Resultado"], [
      ["∞ + k", "∞", "k/∞", "0"],
      ["∞ + ∞", "∞", "∞/k (k ≠ 0)", "±∞"],
      ["∞·∞", "∞", "k/0 (k ≠ 0)", "±∞ (signo por laterales)"],
      ["k·∞ (k ≠ 0)", "±∞", "aᵏ con a &gt; 1 y k → ∞", "∞"],
      ["∞^k (k &gt; 0)", "∞", "aᵏ con 0 &lt; a &lt; 1 y k → ∞", "0"]
    ]) +
    ojo("«0/0» y «∞/∞» no valen 1 ni 0 ni ∞: son indeterminaciones, es decir, el resultado puede ser cualquier cosa según de dónde provengan los ceros o los infinitos. Hay que seguir trabajando.");

  // ---------------------------------------------------------------- 4. 0/0
  secciones[3] =
    "<h5>Por qué se puede simplificar</h5>" +
    "<p>Al calcular lím<sub>x→a</sub> f(x), x se acerca a a pero <b>nunca vale a</b>. Por eso un factor (x − a) que está arriba y abajo es distinto de 0 durante todo el proceso y se puede cancelar sin problema. Cancelar el factor no cambia el valor de f(x) para x ≠ a, y eso es lo único que le importa al límite.</p>" +
    "<h5>Método 1: factorizar</h5>" +
    "<p>Se factorizan numerador y denominador (factor común, identidades notables, Ruffini o resolviendo la ecuación de 2.º grado), se cancela el factor (x − a) y se vuelve a sustituir.</p>" +
    ejemplo("Un cociente de polinomios", "Calcula lím<sub>x→1</sub> (x² − 3x + 2)/(x² − 1).", [
      "Al sustituir: (1 − 3 + 2)/(1 − 1) = 0/0. Indeterminación: ambos tienen el factor (x − 1).",
      "x² − 3x + 2 = (x − 1)(x − 2) y x² − 1 = (x − 1)(x + 1).",
      "Se cancela: (x − 2)/(x + 1). Sustituyendo: (1 − 2)/(1 + 1) = <b>−1/2</b>."
    ]) +
    ejemplo("Con diferencia de cubos", "Calcula lím<sub>x→2</sub> (x³ − 8)/(x² − 4).", [
      "En x = 2 queda 0/0.",
      "x³ − 8 = (x − 2)(x² + 2x + 4) y x² − 4 = (x − 2)(x + 2).",
      "Cancelando: (x² + 2x + 4)/(x + 2) → (4 + 4 + 4)/4 = <b>3</b>."
    ]) +
    ejemplo("Con Ruffini", "Calcula lím<sub>x→1</sub> (x³ − 3x + 2)/(x² − 2x + 1).", [
      "En x = 1 queda 0/0. Ruffini con x = 1 en x³ + 0x² − 3x + 2: coeficientes 1, 0, −3, 2 → 1, 1, −2, 0: x³ − 3x + 2 = (x − 1)(x² + x − 2) = (x − 1)(x − 1)(x + 2).",
      "El denominador es (x − 1)².",
      "Cancelando (x − 1)²: queda (x + 2) → <b>3</b>."
    ]) +
    "<h5>Método 2: multiplicar por el conjugado (cuando hay raíces)</h5>" +
    "<p>Si en el numerador (o el denominador) hay una resta con una raíz, se multiplica y divide por el <b>conjugado</b> (la misma expresión con la suma): (√a − b)(√a + b) = a − b². Así desaparece la raíz y aparece el factor que anulaba todo.</p>" +
    ejemplo("Un 0/0 con raíz", "Calcula lím<sub>x→0</sub> (√(x + 4) − 2)/x.", [
      "En x = 0 queda 0/0. Se multiplica arriba y abajo por el conjugado √(x + 4) + 2.",
      "Numerador: (√(x + 4) − 2)(√(x + 4) + 2) = (x + 4) − 4 = x. Denominador: x·(√(x + 4) + 2).",
      "Queda x/(x(√(x + 4) + 2)) = 1/(√(x + 4) + 2) → 1/(2 + 2) = <b>1/4</b>."
    ]) +
    ejemplo("Dos raíces", "Calcula lím<sub>x→0</sub> (√(1 + x) − √(1 − x))/x.", [
      "0/0. Conjugado: √(1 + x) + √(1 − x). Numerador: (1 + x) − (1 − x) = 2x.",
      "Queda 2x/(x(√(1 + x) + √(1 − x))) = 2/(√(1 + x) + √(1 − x)) → 2/(1 + 1) = <b>1</b>."
    ]) +
    "<h5>Método 3: límites notables</h5>" +
    "<p>Hay límites trigonométricos y exponenciales que conviene saberse de memoria (con x en <b>radianes</b>):</p>" +
    tabla(["Límite notable", "Valor", "Para qué sirve"], [
      ["lím<sub>x→0</sub> sen x / x", "1", "el seno «es» x cerca del 0"],
      ["lím<sub>x→0</sub> tan x / x", "1", "ídem para la tangente"],
      ["lím<sub>x→0</sub> (1 − cos x)/x²", "1/2", "el coseno es 1 − x²/2 cerca del 0"],
      ["lím<sub>x→0</sub> (eˣ − 1)/x", "1", "eˣ ≈ 1 + x"],
      ["lím<sub>x→0</sub> ln(1 + x)/x", "1", "ln(1 + x) ≈ x"]
    ]) +
    ejemplo("Usar un límite notable", "Calcula lím<sub>x→0</sub> sen(3x)/x y lím<sub>x→0</sub> (1 − cos 2x)/x².", [
      "sen(3x)/x = 3·sen(3x)/(3x). Con t = 3x → 0: sen t/t → 1. El límite es <b>3·1 = 3</b>.",
      "(1 − cos 2x)/x² = 4·(1 − cos 2x)/(2x)². Con t = 2x → 0: (1 − cos t)/t² → 1/2. El límite es <b>4·1/2 = 2</b>."
    ]) +
    "<h5>Cómo elegir el método</h5>" +
    "<p>Si es un cociente de polinomios, factoriza. Si hay raíces, conjugado. Si hay senos, cosenos o exponenciales «pegados» a una x que tiende a 0, piensa en los notables. Y recuerda: al final siempre se vuelve a <b>sustituir</b> para ver si ya se ha salido de la indeterminación.</p>";

  // ---------------------------------------------------------------- 5. Infinito
  secciones[4] =
    "<h5>Funciones elementales en el infinito</h5>" +
    tabla(["Función", "x → +∞", "x → −∞"], [
      ["xⁿ (n par)", "+∞", "+∞"],
      ["xⁿ (n impar)", "+∞", "−∞"],
      ["1/xⁿ (n &gt; 0)", "0", "0"],
      ["aˣ con a &gt; 1 (por ejemplo eˣ)", "+∞", "0"],
      ["aˣ con 0 &lt; a &lt; 1", "0", "+∞"],
      ["logₐ x con a &gt; 1", "+∞", "no definido"],
      ["arctan x", "π/2", "−π/2"],
      ["sen x, cos x", "no existe (oscilan)", "no existe"]
    ]) +
    "<h5>Cocientes de polinomios: la regla de los grados</h5>" +
    "<p>Cuando x es enormemente grande, en cada polinomio manda su <b>término de mayor grado</b>. Por tanto, lím f(x)/g(x) = lím (aₙxⁿ)/(bₘxᵐ). Esto da los tres casos que has visto (y el signo, cuando es infinito, hay que calcularlo con cuidado en x → −∞):</p>" +
    tabla(["Grados", "Límite", "Ejemplo"], [
      ["grado num. &lt; grado den.", "0", "(x + 1)/(x² + 1) → 0"],
      ["grado num. = grado den.", "cociente de coeficientes principales", "(3x² + 2x)/(x² − 1) → 3"],
      ["grado num. &gt; grado den.", "±∞ (signo de aₙ/bₘ·(±∞)ⁿ⁻ᵐ)", "(x² + 1)/(x + 3) → +∞ (en +∞) y −∞ (en −∞)"]
    ]) +
    ejemplo("Dividir por la mayor potencia", "Calcula lím<sub>x→+∞</sub> (2x³ − x)/(5x³ + 4x²).", [
      "Es ∞/∞. Se divide numerador y denominador por x³: (2 − 1/x²)/(5 + 4/x).",
      "Cuando x → ∞: 1/x² → 0 y 4/x → 0. Queda <b>2/5</b>."
    ]) +
    ejemplo("Signos en +∞ y −∞", "Calcula lím<sub>x→+∞</sub> y lím<sub>x→−∞</sub> de (x² + 1)/(x + 3).", [
      "Grado del numerador (2) &gt; grado del denominador (1): crece como x²/x = x.",
      "Si x → +∞: x → +∞ → el límite es <b>+∞</b>. Si x → −∞: x → −∞ → el límite es <b>−∞</b>."
    ]) +
    "<h5>Funciones con raíces: ojo con √(x²) = |x|</h5>" +
    ejemplo("Un cociente con raíz", "Calcula lím<sub>x→+∞</sub> y lím<sub>x→−∞</sub> de √(x² + 1)/x.", [
      "Para x &gt; 0: √(x² + 1)/x = √(1 + 1/x²) → 1.",
      "Para x &lt; 0: √(x² + 1) sigue siendo positiva ≈ |x| = −x, y se divide entre x negativo: el cociente → −1.",
      "Resultado: <b>+1</b> en +∞ y <b>−1</b> en −∞. (Dos asíntotas horizontales distintas: y = 1 e y = −1.)"
    ]) +
    "<h5>La indeterminación ∞ − ∞</h5>" +
    "<p>Si es una resta de fracciones, se pone común denominador. Si hay raíces, se multiplica y divide por el conjugado.</p>" +
    ejemplo("Con raíz", "Calcula lím<sub>x→+∞</sub> (√(x² + 3x) − x).", [
      "Es ∞ − ∞. Conjugado: (√(x² + 3x) − x)(√(x² + 3x) + x)/(√(x² + 3x) + x) = (x² + 3x − x²)/(√(x² + 3x) + x) = 3x/(√(x² + 3x) + x).",
      "Ahora es ∞/∞: dividimos por x: 3/(√(1 + 3/x) + 1) → 3/(1 + 1) = <b>3/2</b>."
    ]) +
    ejemplo("Con fracciones", "Calcula lím<sub>x→+∞</sub> (x²/(x + 1) − x).", [
      "Común denominador: (x² − x(x + 1))/(x + 1) = (x² − x² − x)/(x + 1) = −x/(x + 1).",
      "Grados iguales → cociente de coeficientes: <b>−1</b>."
    ]) +
    ojo("el error más común: «∞ − ∞ = 0». No. √(x² + 3x) − x → 3/2 (no 0) y √(x² + 1) − x → 0 (esa sí). Cada caso hay que calcularlo.") +
    w("infinito") +
    "<h5>La indeterminación 1^∞ y el número e</h5>" +
    "<p>El límite fundamental es <b>lím<sub>x→∞</sub> (1 + 1/x)ˣ = e</b> ≈ 2,71828. Generalizando: si f → 1 y g → ∞, entonces</p>" +
    H.formula("lím f<sup>g</sup> = e<sup>lím g·(f − 1)</sup>") +
    ejemplo("Tres variantes", "Calcula lím<sub>x→+∞</sub> (1 + 2/x)ˣ, lím<sub>x→+∞</sub> ((x + 1)/(x − 1))ˣ y lím<sub>x→+∞</sub> (1 + 3/x)^(2x).", [
      "(1 + 2/x)ˣ: f − 1 = 2/x, g = x: g(f − 1) = 2 → <b>e²</b> ≈ 7,389.",
      "((x + 1)/(x − 1))ˣ: f − 1 = 2/(x − 1), g(f − 1) = 2x/(x − 1) → 2 → <b>e²</b>.",
      "(1 + 3/x)^(2x): g(f − 1) = 2x·3/x = 6 → <b>e⁶</b> ≈ 403,4."
    ]) +
    "<h5>Jerarquía de infinitos</h5>" +
    "<p>Cuando varias funciones tienden a ∞, algunas lo hacen mucho más deprisa que otras. El orden, de menor a mayor, es: <b>logaritmos ≪ potencias (xⁿ) ≪ exponenciales (aˣ, a &gt; 1) ≪ factoriales</b>. Por eso lím x⁵/2ˣ = 0, lím ln x/x = 0 y lím eˣ/x¹⁰⁰ = +∞.</p>";

  // ---------------------------------------------------------------- 6. Asíntotas
  secciones[5] =
    "<h5>Asíntota vertical</h5>" +
    "<p>La recta <b>x = a</b> es una asíntota vertical si algún límite lateral en a es infinito: lím<sub>x→a⁻</sub> f = ±∞ o lím<sub>x→a⁺</sub> f = ±∞. En una <b>función racional</b>, las candidatas son las raíces del denominador; hay que comprobar que no se anulen también en el numerador (si se anulan los dos y se cancelan, es un <b>hueco</b>, no una asíntota).</p>" +
    ejemplo("Asíntotas verticales de una racional", "Halla las asíntotas verticales de f(x) = (x² − 4)/(x² − 3x + 2).", [
      "Denominador: x² − 3x + 2 = (x − 1)(x − 2). Candidatas: x = 1 y x = 2.",
      "Numerador: x² − 4 = (x − 2)(x + 2).",
      "En x = 2 se cancela (x − 2): lím = (2 + 2)/(2 − 1) = 4 (un número): <b>hueco en (2, 4)</b>, no asíntota.",
      "En x = 1 el numerador vale 1² − 4 = −3 ≠ 0 y el denominador se anula: −3/0 → <b>asíntota vertical x = 1</b>."
    ]) +
    "<h5>Asíntota horizontal</h5>" +
    "<p>La recta <b>y = L</b> es una asíntota horizontal si lím<sub>x→+∞</sub> f(x) = L o lím<sub>x→−∞</sub> f(x) = L. Puede haber una por cada lado (como máximo dos), y pueden ser distintas: arctan x tiene y = π/2 a la derecha e y = −π/2 a la izquierda; eˣ sólo tiene y = 0 a la izquierda.</p>" +
    "<h5>Asíntota oblicua</h5>" +
    "<p>La recta <b>y = mx + n</b> (m ≠ 0) es una asíntota oblicua si la gráfica se pega a ella cuando x → ±∞. Se calcula así:</p>" +
    H.formula("m = lím<sub>x→±∞</sub> f(x)/x ,   n = lím<sub>x→±∞</sub> (f(x) − m·x)") +
    "<p>Si m = 0 es la asíntota horizontal; si m es ∞ no hay asíntota oblicua. <b>En un lado donde hay horizontal no hay oblicua</b>. En una función racional hay oblicua cuando el grado del numerador es <b>exactamente uno más</b> que el del denominador, y la recta es el <b>cociente</b> de la división de polinomios.</p>" +
    ejemplo("Con la división de polinomios", "Halla la asíntota oblicua de f(x) = (x² + 1)/(x − 1) y la posición de la curva respecto de ella.", [
      "Dividiendo: x² + 1 = (x − 1)(x + 1) + 2, luego f(x) = x + 1 + 2/(x − 1).",
      "Cuando x → ±∞, 2/(x − 1) → 0, así que f(x) − (x + 1) → 0: <b>asíntota oblicua y = x + 1</b>.",
      "Con la fórmula: m = lím (x² + 1)/(x² − x) = 1 y n = lím [(x² + 1)/(x − 1) − x] = lím (x + 1)/(x − 1) = 1 ✓.",
      "<b>Posición</b>: f(x) − (x + 1) = 2/(x − 1): positivo si x &gt; 1 (la curva queda por encima en +∞) y negativo si x &lt; 1 (por debajo en −∞). Además hay una asíntota vertical en x = 1."
    ]) +
    ejemplo("Con una raíz", "Halla las asíntotas oblicuas de f(x) = √(x² + 1).", [
      "En +∞: m = lím √(x² + 1)/x = 1; n = lím (√(x² + 1) − x) = 0 (por el conjugado). Asíntota <b>y = x</b>.",
      "En −∞: m = lím √(x² + 1)/x = −1; n = lím (√(x² + 1) + x) = 0. Asíntota <b>y = −x</b>.",
      "(La gráfica es una hipérbola con las dos rectas como asíntotas.)"
    ]) +
    w("asintotas") +
    "<h5>Resumen: cuántas asíntotas puede tener</h5>" +
    tabla(["Tipo", "Cuántas", "Nota"], [
      ["Vertical", "varias (en funciones racionales, una por raíz del denominador sin cancelar)", "x = a: límite lateral infinito"],
      ["Horizontal", "como máximo 2 (una por cada lado)", "y = L: límite en ±∞ finito"],
      ["Oblicua", "como máximo 1 por cada lado", "sólo si no hay horizontal en ese lado"]
    ]);

  // ---------------------------------------------------------------- 7. Continuidad
  secciones[6] =
    "<h5>Continuidad en un intervalo y en los extremos</h5>" +
    "<p>Una función es <b>continua en un intervalo abierto (a, b)</b> si lo es en cada punto de él. En un extremo de un intervalo cerrado se exige la continuidad <b>lateral</b>: f es continua en [a, b] si es continua en (a, b), continua por la derecha en a (lím<sub>x→a⁺</sub> f = f(a)) y continua por la izquierda en b.</p>" +
    "<h5>Los cuatro tipos de discontinuidad</h5>" +
    tabla(["Tipo", "Qué ocurre en x = a", "Ejemplo"], [
      ["Evitable", "existe el límite L, pero f(a) no existe o es distinto de L", "(x² − 1)/(x − 1) en x = 1: L = 2, f(1) no existe"],
      ["De salto finito", "existen los dos laterales, pero son distintos", "|x|/x en x = 0: −1 y 1 (salto de 2)"],
      ["De salto infinito (asíntota)", "algún lateral es ±∞", "1/x en x = 0"],
      ["Esencial (sin límite)", "el límite oscila y no existe", "sen(1/x) en x = 0"]
    ]) +
    "<p>La evitable se llama así porque <b>se puede arreglar</b> redefiniendo f(a) = L: la función se vuelve continua. Las otras no tienen arreglo.</p>" +
    "<h5>Qué funciones son continuas</h5>" +
    "<ul><li>Polinomios, funciones exponenciales, seno y coseno: continuas en todo ℝ.</li>" +
    "<li>Racionales: continuas en todo su dominio (fallan sólo donde el denominador se anula).</li>" +
    "<li>Raíz cuadrada y logaritmo: continuas en su dominio.</li>" +
    "<li>La suma, el producto, el cociente (con denominador ≠ 0) y la composición de funciones continuas son continuas.</li>" +
    "<li>Las <b>funciones a trozos</b> pueden romperse en los puntos de unión: son los únicos puntos «sospechosos», junto con los que no están en el dominio.</li></ul>" +
    "<h5>Cómo estudiar la continuidad de una función</h5>" +
    "<ol><li>Calcula el <b>dominio</b>.</li><li>Localiza los <b>puntos sospechosos</b>: los que no están en el dominio y los puntos de unión de una función a trozos.</li><li>En cada uno estudia las tres condiciones: ¿existe f(a)? ¿existe el límite (laterales)? ¿coinciden?</li><li><b>Clasifica</b> cada discontinuidad.</li></ol>" +
    ejemplo("Una racional", "Estudia la continuidad de f(x) = (x² − 1)/(x² − x − 2).", [
      "Dominio: x² − x − 2 = (x − 2)(x + 1) ≠ 0 → ℝ − {−1, 2}. Es continua en todo su dominio; sólo hay que clasificar x = −1 y x = 2.",
      "Numerador: x² − 1 = (x − 1)(x + 1). Simplificando: f(x) = (x − 1)/(x − 2) para x ≠ −1.",
      "<b>x = −1</b>: lím = (−1 − 1)/(−1 − 2) = (−2)/(−3) = 2/3 y f(−1) no existe → discontinuidad <b>evitable</b> (hueco en (−1, 2/3)).",
      "<b>x = 2</b>: (2 − 1)/(2 − 2) = 1/0: asíntota vertical → discontinuidad de <b>salto infinito</b>."
    ]) +
    ejemplo("Un punto aislado", "Estudia en x = 0 la función f(x) = { sen x / x si x ≠ 0 ; 2 si x = 0 }.", [
      "lím<sub>x→0</sub> sen x / x = 1 (límite notable).",
      "f(0) = 2 ≠ 1: existe el límite y existe f(0), pero no coinciden → discontinuidad <b>evitable</b>. Se arreglaría con f(0) = 1."
    ]) +
    "<h5>Hallar parámetros para que sea continua</h5>" +
    ejemplo("Dos parámetros", "Halla a y b para que f sea continua en ℝ: f(x) = { 2x + a si x ≤ 1 ; bx² si 1 &lt; x &lt; 2 ; 4x − 4 si x ≥ 2 }.", [
      "En x = 2: por la izquierda b·4; por la derecha (y f(2)) 4·2 − 4 = 4. Así 4b = 4 → b = 1.",
      "En x = 1: por la izquierda (y f(1)) 2 + a; por la derecha b·1 = 1. Así 2 + a = 1 → a = −1.",
      "<b>a = −1, b = 1</b>."
    ]);

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 8
    {
      h: "8. Diagrama de decisión: ¿cómo calculo este límite?",
      html:
        "<p>Ante cualquier límite, el procedimiento es siempre el mismo:</p>" +
        "<ol>" +
        "<li><b>Sustituye</b> (x = a, o x = ±∞).</li>" +
        "<li>Si sale un <b>número</b>, ése es el límite.</li>" +
        "<li>Si sale <b>k/0</b>, estudia los signos a cada lado (laterales).</li>" +
        "<li>Si sale una <b>indeterminación</b>: identifica cuál y aplica su técnica.</li>" +
        "<li>Tras transformar, <b>sustituye otra vez</b>.</li>" +
        "</ol>" +
        tabla(["Tipo de límite", "Técnica"], [
          ["x → a (número), 0/0, polinomios", "factorizar y simplificar"],
          ["x → a (número), 0/0, con raíces", "multiplicar por el conjugado"],
          ["x → a (número), con senos, cosenos, exponenciales", "límites notables"],
          ["x → ±∞, ∞/∞, racional", "grados (o dividir por la mayor potencia)"],
          ["x → ±∞, ∞ − ∞ con raíces", "conjugado, luego dividir por x"],
          ["x → ±∞, 1^∞", "número e"],
          ["x → a, k/0", "laterales (signo del denominador)"]
        ]) +
        "<p>Practica: clasifica cada límite según la técnica que usarías primero.</p>" +
        w("clasificar", "metodos")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. El teorema del sándwich y los límites con funciones acotadas",
      html:
        "<h5>Teorema del sándwich (o de compresión)</h5>" +
        "<p>Si g(x) ≤ f(x) ≤ h(x) cerca de a y lím g = lím h = L, entonces lím f = L: f queda «apretada» entre dos funciones que van al mismo sitio y no tiene más remedio que ir también allí.</p>" +
        ejemplo("x·sen(1/x) en el 0", "Calcula lím<sub>x→0</sub> x·sen(1/x).", [
          "sen(1/x) oscila entre −1 y 1, pero está <b>acotado</b>: −1 ≤ sen(1/x) ≤ 1.",
          "Multiplicando por |x|: −|x| ≤ x·sen(1/x) ≤ |x|.",
          "Como lím(−|x|) = lím(|x|) = 0, el sándwich da <b>lím x·sen(1/x) = 0</b>. (Observa que sen(1/x) solo no tiene límite, pero multiplicada por x sí.)"
        ]) +
        ejemplo("En el infinito", "Calcula lím<sub>x→+∞</sub> sen x / x.", [
          "Como |sen x| ≤ 1, se cumple −1/x ≤ sen x / x ≤ 1/x.",
          "Los dos extremos tienden a 0 cuando x → ∞. Por el sándwich: <b>lím = 0</b>."
        ]) +
        "<p>Regla práctica: <b>(función acotada) × (algo que tiende a 0) → 0</b> y <b>(función acotada) / (algo que tiende a ∞) → 0</b>. Ojo: sen x / x tiende a 1 cuando x → <i>0</i> pero a 0 cuando x → <i>∞</i>.</p>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. La definición ε–δ: el límite como un juego",
      html:
        "<p>La definición formal usa una tolerancia ε (en el eje Y) y un entorno δ (en el eje X). Observa en el simulador qué banda vertical (δ) hace que la curva quede dentro de la banda horizontal (ε):</p>" +
        w("epsdelta") +
        ejemplo("Demostrar un límite con ε y δ", "Demuestra que lím<sub>x→1</sub> (2x + 1) = 3.", [
          "Hay que encontrar, para cada ε &gt; 0, un δ &gt; 0 que cumpla: si 0 &lt; |x − 1| &lt; δ entonces |(2x + 1) − 3| &lt; ε.",
          "Se simplifica la expresión: |(2x + 1) − 3| = |2x − 2| = 2|x − 1|.",
          "Se quiere 2|x − 1| &lt; ε, es decir, |x − 1| &lt; ε/2. Basta elegir <b>δ = ε/2</b>.",
          "Comprobación: si |x − 1| &lt; ε/2 entonces |f(x) − 3| = 2|x − 1| &lt; ε ∎. (Por ejemplo, con ε = 0,01 vale δ = 0,005.)"
        ]) +
        "<p>Para una función como x² el δ depende de ε y de la zona (la curva es más empinada a la derecha): por eso a veces es difícil encontrar la fórmula exacta de δ. Lo importante es la <b>idea</b>: hacer el límite una promesa precisa, no un «se parece».</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Jerarquía de infinitos",
      html:
        "<p>Cuando dos funciones tienden a +∞, su cociente decide cuál va más deprisa. Experimenta con las parejas más importantes:</p>" +
        w("jerarquia") +
        ejemplo("Aplicando la jerarquía", "Calcula lím<sub>x→+∞</sub> (x⁵ + 3x)/2ˣ, lím<sub>x→+∞</sub> (ln x)/√x y lím<sub>x→+∞</sub> (3ˣ − 2ˣ)/4ˣ.", [
          "Arriba, potencia; abajo, exponencial: gana el exponencial → <b>0</b>.",
          "Arriba, logaritmo; abajo, potencia (√x = x^(1/2)): gana la potencia → <b>0</b>.",
          "Dividiendo por 4ˣ: (3/4)ˣ − (2/4)ˣ → 0 − 0 = <b>0</b>. (Las dos bases son menores que 1.)"
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Aplicaciones: límites en situaciones reales",
      html:
        "<p>El límite en el infinito describe el <b>comportamiento a largo plazo</b> de un fenómeno:</p>" +
        ejemplo("Concentración de un fármaco", "La concentración de un medicamento en sangre (mg/L) a las t horas de una infusión es C(t) = 50t/(t + 5). ¿Hacia qué valor tiende? ¿Cuándo llega a 40 mg/L?", [
          "Límite: lím<sub>t→∞</sub> 50t/(t + 5) = 50 (grados iguales): la concentración se estabiliza en <b>50 mg/L</b> (asíntota horizontal y = 50).",
          "50t/(t + 5) = 40 → 50t = 40t + 200 → t = 20 h.",
          "Nunca llega a 50 mg/L; sólo se acerca."
        ]) +
        ejemplo("Coste medio", "Fabricar x unidades de un producto cuesta C(x) = 100 + 2x euros. El coste medio por unidad es C(x)/x. ¿A qué tiende cuando la producción se dispara?", [
          "Coste medio: (100 + 2x)/x = 100/x + 2 → 2 cuando x → ∞.",
          "A largo plazo, el coste unitario se aproxima a los 2 € de coste variable: los 100 € fijos se «diluyen»."
        ]) +
        ejemplo("Interés compuesto continuo", "Un capital C₀ al 100 % anual, capitalizado n veces al año, produce C₀(1 + 1/n)ⁿ. ¿Qué ocurre cuando n → ∞?", [
          "lím(1 + 1/n)ⁿ = e ≈ 2,71828. Por mucho que se capitalice más veces, el capital no pasa de multiplicarse por e: el crecimiento <b>continuo</b> es C₀·eʳᵗ.",
          "(Para un tipo r y un tiempo t, con capitalización continua: C = C₀·eʳᵗ.)"
        ]) +
        ejemplo("Velocidad límite", "Un paracaidista cae con velocidad v(t) = 55(1 − e^(−0,2t)) m/s. ¿A qué velocidad máxima tiende?", [
          "Cuando t → ∞, e^(−0,2t) → 0: v → 55·(1 − 0) = <b>55 m/s</b> (velocidad límite).",
          "Nunca se alcanza exactamente, pero a los 30 s ya es 54,9 m/s."
        ])
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. Teoremas de continuidad: Bolzano (adelanto)",
      html:
        "<p>La continuidad permite <b>asegurar</b> cosas sin calcularlas. El más famoso es el <b>teorema de Bolzano</b>:</p>" +
        H.formula("f continua en [a, b] y f(a)·f(b) &lt; 0  ⟹  existe c ∈ (a, b) con f(c) = 0") +
        "<p>Intuición: si la gráfica empieza por debajo del eje X y acaba por encima (o al revés) y no se puede dibujar sin levantar el lápiz, tiene que cruzar el eje. Es la herramienta para <b>demostrar que una ecuación tiene solución</b> aunque no se sepa despejar. Para localizarla mejor se puede usar la <b>bisección</b>: se divide el intervalo por la mitad y se queda uno con el trozo donde sigue cambiando el signo.</p>" +
        ejemplo("Existencia de una raíz", "Demuestra que x³ + x − 3 = 0 tiene alguna solución en (1, 2).", [
          "f(x) = x³ + x − 3 es un polinomio: continua en ℝ, en particular en [1, 2].",
          "f(1) = 1 + 1 − 3 = −1 &lt; 0 y f(2) = 8 + 2 − 3 = 7 &gt; 0: tienen signos opuestos.",
          "Por Bolzano, existe c ∈ (1, 2) con f(c) = 0. ∎ Bisección: f(1,5) = 1,875 &gt; 0 → la raíz está en (1, 1,5)."
        ]) +
        ejemplo("Una ecuación trascendente", "Demuestra que cos x = x tiene solución en (0, 1).", [
          "Se define f(x) = cos x − x, continua en ℝ. f(0) = 1 &gt; 0 y f(1) = cos 1 − 1 = −0,46 &lt; 0.",
          "Por Bolzano hay un c ∈ (0, 1) con f(c) = 0, es decir, cos c = c (de hecho, c ≈ 0,739)."
        ]) +
        w("bolzano") +
        ojo("Bolzano exige <b>continuidad en todo el intervalo cerrado</b>. La función f(x) = 1/x cumple f(−1)·f(1) &lt; 0 y, sin embargo, no tiene ninguna raíz: es discontinua en x = 0 y no se puede aplicar el teorema.") +
        "<h5>Otros dos teoremas (para saber que existen)</h5>" +
        "<ul><li><b>Teorema del valor intermedio</b>: una función continua en [a, b] toma todos los valores entre f(a) y f(b).</li>" +
        "<li><b>Teorema de Weierstrass</b>: una función continua en un intervalo <i>cerrado</i> [a, b] alcanza en él un máximo y un mínimo absolutos.</li></ul>"
    },
    // -------------------------------------------------------------- 13b
    {
      h: "14. Leer límites en una gráfica",
      html:
        "<p>En muchos problemas no hay fórmula: sólo una gráfica. Se leen los límites <b>siguiendo la curva con el dedo</b> y fijándose en la <b>altura</b> a la que llega, no en el punto exacto. Reglas: un círculo hueco es un valor al que se acerca la curva pero que no toma; un punto relleno aislado es f(a) y no cuenta para el límite; las asíntotas indican infinitos.</p>" +
        w("leerlimites")
    },
    // -------------------------------------------------------------- 13c
    {
      h: "15. Límites con parámetros y funciones a trozos",
      html:
        "<p>Dos tipos de problemas que aparecen mucho: <b>hallar un parámetro</b> conociendo el valor del límite, y <b>estudiar un límite en el punto de unión</b> de una función a trozos.</p>" +
        ejemplo("Parámetro con raíz", "Halla k para que lím<sub>x→0</sub> (√(1 + kx) − 1)/x = 3.", [
          "Es 0/0. Conjugado: (1 + kx − 1)/(x(√(1 + kx) + 1)) = k/(√(1 + kx) + 1) → k/2.",
          "Se exige k/2 = 3 → <b>k = 6</b>."
        ]) +
        ejemplo("Parámetro en el infinito", "Halla a para que lím<sub>x→+∞</sub> (√(x² + ax) − x) = 4.", [
          "∞ − ∞. Conjugado: ax/(√(x² + ax) + x) → a/2.",
          "Se exige a/2 = 4 → <b>a = 8</b>."
        ]) +
        ejemplo("Parámetro para que exista el límite", "Halla a para que exista lím<sub>x→1</sub> (x² + ax − 2)/(x − 1), y calcúlalo.", [
          "Si x = 1 no anula el numerador, el límite sería k/0 (infinito). Para que exista, el numerador debe anularse en x = 1: 1 + a − 2 = 0 → <b>a = 1</b>.",
          "Con a = 1: (x² + x − 2)/(x − 1) = (x − 1)(x + 2)/(x − 1) = x + 2 → <b>3</b>."
        ]) +
        ejemplo("Función a trozos en el punto de unión", "Estudia el límite de f(x) = { (x² − 4)/(x − 2) si x &lt; 2 ; 3x − 2 si x ≥ 2 } en x = 2 y la continuidad.", [
          "Por la izquierda: (x − 2)(x + 2)/(x − 2) = x + 2 → <b>4</b>. Por la derecha: 3·2 − 2 = <b>4</b>.",
          "Los laterales coinciden: lím<sub>x→2</sub> f(x) = 4. Además f(2) = 3·2 − 2 = 4: <b>continua</b> en x = 2."
        ])
    },
    // -------------------------------------------------------------- 13d
    {
      h: "16. Banco de límites resueltos, por tipos",
      html:
        "<p>Diecisiete límites con su técnica y su resolución, ordenados por tipo. Tápalo y haz tú el cálculo antes de mirar la solución.</p>" +
        tabla(["Límite", "Tipo", "Resolución", "Resultado"], [
          ["lím<sub>x→2</sub> (x³ − 3x)/(x + 1)", "sustitución", "(8 − 6)/3", "2/3"],
          ["lím<sub>x→1⁺</sub> (x + 2)/(x² − 1) · lím<sub>x→1⁻</sub>", "k/0", "numerador 3 &gt; 0; x² − 1 → 0⁺ por la derecha y 0⁻ por la izquierda", "+∞ · −∞"],
          ["lím<sub>x→0</sub> (x³ − 2x²)/x²", "0/0 factor común", "x²(x − 2)/x² = x − 2", "−2"],
          ["lím<sub>x→−1</sub> (x³ + 1)/(x + 1)", "0/0 factorizar", "(x + 1)(x² − x + 1)/(x + 1) → 1 + 1 + 1", "3"],
          ["lím<sub>x→1</sub> (x⁴ − 1)/(x − 1)", "0/0 factorizar", "x³ + x² + x + 1 → 4", "4"],
          ["lím<sub>x→1</sub> (√x − 1)/(x − 1)", "0/0 conjugado", "(x − 1)/((x − 1)(√x + 1)) = 1/(√x + 1)", "1/2"],
          ["lím<sub>x→0</sub> (√(x² + 9) − 3)/x²", "0/0 conjugado", "x²/(x²(√(x² + 9) + 3)) = 1/(√(x² + 9) + 3)", "1/6"],
          ["lím<sub>x→0</sub> tan x/(2x)", "notable", "(1/2)·(tan x/x)", "1/2"],
          ["lím<sub>x→0</sub> (e²ˣ − 1)/x", "notable", "2·(e<sup>t</sup> − 1)/t con t = 2x", "2"],
          ["lím<sub>x→+∞</sub> (x³ + 2x)/(4x³ − x²)", "∞/∞", "grados iguales: 1/4", "1/4"],
          ["lím<sub>x→−∞</sub> (2x + 1)/√(x² + 3)", "∞/∞ con raíz", "numerador ≈ 2x (negativo); √(x² + 3) ≈ |x| = −x", "−2"],
          ["lím<sub>x→+∞</sub> (√(x + 1) − √x)", "∞ − ∞ conjugado", "1/(√(x + 1) + √x) → 1/∞", "0"],
          ["lím<sub>x→+∞</sub> (x − √(x² − 4x))", "∞ − ∞ conjugado", "4x/(x + √(x² − 4x)) → 4/(1 + 1)", "2"],
          ["lím<sub>x→+∞</sub> ((x + 1)/(x + 3))ˣ", "1^∞", "g(f − 1) = x·(−2/(x + 3)) → −2", "e⁻²"],
          ["lím<sub>x→0</sub> (1 + 3x)^(1/x)", "1^∞", "g(f − 1) = (1/x)·3x = 3", "e³"],
          ["lím<sub>x→+∞</sub> cos x/x²", "sándwich", "|cos x/x²| ≤ 1/x² → 0", "0"],
          ["lím<sub>x→0</sub> x²·sen(1/x)", "sándwich", "|x² sen(1/x)| ≤ x² → 0", "0"]
        ])
    },
    // -------------------------------------------------------------- 14
    {
      h: "17. Estudio completo: límites, asíntotas y continuidad",
      html:
        ejemplo("Una función racional", "Estudia f(x) = (x² − 4)/(x² − 1): dominio, límites en los extremos del dominio, asíntotas y continuidad.", [
          "<b>Dominio</b>: x² − 1 ≠ 0 → ℝ − {−1, 1}.",
          "<b>Asíntotas verticales</b>: en x = 1 el numerador vale −3 ≠ 0: asíntota vertical. En x = −1 el numerador vale −3 ≠ 0: asíntota vertical. Laterales en x = 1: x² − 1 → 0⁺ por la derecha → −3/0⁺ = −∞; por la izquierda x² − 1 → 0⁻ → −3/0⁻ = +∞. En x = −1: por la izquierda (x &lt; −1) x² − 1 → 0⁺ → −∞; por la derecha → +∞.",
          "<b>Asíntota horizontal</b>: grados iguales → cociente de coeficientes principales 1/1 = 1: <b>y = 1</b> en ±∞.",
          "<b>Continuidad</b>: continua en su dominio; en x = ±1, discontinuidad de salto infinito.",
          "<b>Cortes</b>: f(0) = −4/−1 = 4 → (0, 4); x² − 4 = 0 → x = ±2. <b>Simetría</b>: f(−x) = f(x) → par."
        ]) +
        ejemplo("Una función con raíz", "Estudia f(x) = x − √(x² + 1): dominio, límites en ±∞ y asíntotas.", [
          "<b>Dominio</b>: x² + 1 &gt; 0 siempre → ℝ. Es continua en ℝ.",
          "<b>x → +∞</b>: ∞ − ∞. Conjugado: (x − √(x² + 1))(x + √(x² + 1))/(x + √(x² + 1)) = (x² − x² − 1)/(x + √(x² + 1)) = −1/(x + √(x² + 1)) → 0. Asíntota horizontal y = 0 en +∞.",
          "<b>x → −∞</b>: x → −∞ y −√(x² + 1) → −∞: la suma → −∞. Se busca una oblicua: m = lím f(x)/x = lím (1 − √(x² + 1)/x) = 1 − (−1) = 2; n = lím (x − √(x² + 1) − 2x) = lím (−x − √(x² + 1)) = 0 (conjugado). Asíntota oblicua <b>y = 2x</b> en −∞."
        ])
    },
    // -------------------------------------------------------------- 15
    {
      h: "18. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 16
    {
      h: "19. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas y un ejercicio de ordenar los pasos de un límite con conjugado.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1") + w("orden", "conjugado")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    metodos: {
      titulo: "¿Qué técnica uso para cada límite?",
      consigna: "Toca un límite y después la técnica con la que empezarías.",
      categorias: ["Sustitución directa", "Factorizar (0/0)", "Conjugado (0/0 con raíz)", "Grados / dividir por la mayor potencia (∞/∞)", "Conjugado en el infinito (∞ − ∞)", "Número e (1^∞)", "Laterales (k/0)"],
      items: [
        { t: "lím<sub>x→2</sub> (x² + 3x − 1)", c: 0 }, { t: "lím<sub>x→−1</sub> (x² + 1)/(x + 2)", c: 0 },
        { t: "lím<sub>x→3</sub> (x² − 9)/(x − 3)", c: 1 }, { t: "lím<sub>x→1</sub> (x³ − 1)/(x² − 1)", c: 1 },
        { t: "lím<sub>x→0</sub> (√(x + 1) − 1)/x", c: 2 }, { t: "lím<sub>x→4</sub> (√x − 2)/(x − 4)", c: 2 },
        { t: "lím<sub>x→+∞</sub> (3x² + 1)/(x² − 5)", c: 3 }, { t: "lím<sub>x→+∞</sub> (2x − 1)/(x³ + 1)", c: 3 },
        { t: "lím<sub>x→+∞</sub> (√(x² + 2x) − x)", c: 4 }, { t: "lím<sub>x→+∞</sub> (√(x² + 1) − x)", c: 4 },
        { t: "lím<sub>x→+∞</sub> (1 + 5/x)ˣ", c: 5 }, { t: "lím<sub>x→+∞</sub> ((x + 3)/x)^(2x)", c: 5 },
        { t: "lím<sub>x→2⁺</sub> 1/(x − 2)", c: 6 }, { t: "lím<sub>x→0</sub> 3/x²", c: 6 }
      ]
    },
    conjugado: {
      titulo: "Un límite con raíz, paso a paso",
      consigna: "Ordena los pasos para calcular lím<sub>x→0</sub> (√(x + 4) − 2)/x.",
      items: [
        { t: "Sustituir x = 0: (√4 − 2)/0 = 0/0. Es una indeterminación", nota: "Siempre se sustituye primero para saber a qué nos enfrentamos." },
        { t: "Multiplicar numerador y denominador por el conjugado: √(x + 4) + 2", nota: "Multiplicamos arriba y abajo por lo mismo, así que no cambia el valor." },
        { t: "En el numerador: (√(x + 4) − 2)(√(x + 4) + 2) = (x + 4) − 4 = x", nota: "Suma por diferencia: desaparece la raíz." },
        { t: "Simplificar: x/(x·(√(x + 4) + 2)) = 1/(√(x + 4) + 2)", nota: "Se cancela el factor x (válido porque x ≠ 0 al acercarse)." },
        { t: "Sustituir otra vez x = 0: 1/(2 + 2)", nota: "Ahora la sustitución ya no da indeterminación." },
        { t: "Resultado: el límite vale 1/4", nota: "Coincide con lo que mostraba la tabla de valores." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno dice que lím<sub>x→1</sub> (x² − 1)/(x − 1) «no existe» porque f(1) no existe. ¿Qué falla?",
          op: ["Nada", "El límite no depende de f(1): vale 2 (la función es x + 1 salvo en x = 1)", "El límite vale 0", "El límite vale ∞"], ok: 1,
          porque: "El límite describe lo que pasa cerca de a, no en a. Factorizando: (x − 1)(x + 1)/(x − 1) = x + 1 → 2." },
        { q: "Un alumno calcula lím<sub>x→0</sub> |x|/x = 1 «porque |x| = x». ¿Qué falla?",
          op: ["Nada", "|x| = x sólo si x ≥ 0; por la izquierda vale −x. Los laterales son −1 y 1: no existe", "El límite es 0", "El límite es −1"], ok: 1,
          porque: "Para x &lt; 0, |x| = −x y el cociente vale −1. Con laterales distintos, el límite no existe." },
        { q: "Un alumno calcula lím<sub>x→+∞</sub> (√(x² + 3x) − x) y dice «∞ − ∞ = 0». ¿Qué falla?",
          op: ["Nada", "∞ − ∞ es indeterminación: con el conjugado el límite vale 3/2", "El límite es ∞", "El límite es 3"], ok: 1,
          porque: "Hay que transformarla: 3x/(√(x² + 3x) + x) → 3/2." },
        { q: "Un alumno calcula lím<sub>x→+∞</sub> (1 + 1/x)^(2x) y dice «1^∞ = 1, luego vale 1». ¿Qué falla?",
          op: ["Nada", "1^∞ es indeterminación; aplicando e el límite vale e² ≈ 7,39", "Vale e", "Vale 2"], ok: 1,
          porque: "g(f − 1) = 2x·(1/x) = 2 → e²." },
        { q: "Un alumno afirma: «si existe lím<sub>x→a</sub> f(x), entonces f es continua en a». ¿Qué falla?",
          op: ["Nada", "También debe existir f(a) y coincidir con el límite (puede haber un hueco o un punto desplazado)", "Debe ser derivable", "Debe ser par"], ok: 1,
          porque: "La continuidad exige las tres condiciones. (x² − 1)/(x − 1) tiene límite en 1 y no es continua ahí." },
        { q: "Un alumno calcula lím<sub>x→0</sub> sen x / x = 0 «porque sen 0 = 0». ¿Qué falla?",
          op: ["Nada", "Es una indeterminación 0/0; por un límite notable vale 1", "Vale ∞", "No existe"], ok: 1,
          porque: "El cociente de dos cantidades que tienden a 0 puede valer cualquier cosa. Aquí, sen x ≈ x cerca del 0 y el cociente tiende a 1." },
        { q: "Un alumno dice que f(x) = 1/x cumple Bolzano en [−1, 1] porque f(−1) = −1 y f(1) = 1 tienen signos opuestos, «así que tiene una raíz». ¿Qué falla?",
          op: ["Nada", "f no es continua en [−1, 1] (no existe f(0)); el teorema no se puede aplicar y, de hecho, 1/x no tiene raíces", "Debía usar [0, 1]", "f(−1)·f(1) es positivo"], ok: 1,
          porque: "Bolzano exige continuidad en todo el intervalo cerrado." },
        { q: "Un alumno dice que f(x) = (x² − 4)/(x² − 3x + 2) tiene asíntotas verticales en x = 1 y en x = 2 «porque son las raíces del denominador». ¿Qué falla?",
          op: ["Nada", "En x = 2 el numerador también se anula: hay un hueco, no una asíntota (el límite es 4)", "Sólo hay una en x = 0", "No hay ninguna"], ok: 1,
          porque: "(x − 2)(x + 2)/((x − 1)(x − 2)) = (x + 2)/(x − 1). En x = 2 el límite es 4/1 = 4; sólo x = 1 es una asíntota vertical." },
        { q: "Un alumno calcula lím<sub>x→−∞</sub> √(x² + 1)/x = 1. ¿Qué falla?",
          op: ["Nada", "Para x &lt; 0 la raíz es ≈ |x| = −x, luego el cociente → −1", "El límite es ∞", "El límite no existe"], ok: 1,
          porque: "√(x²) = |x|, que es −x cuando x es negativo. Así, el cociente tiende a −1 en −∞ y a 1 en +∞." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "lím<sub>x→2</sub> (x² + 3x − 1) vale…",
          op: ["9", "0", "11", "No existe"], ok: 0,
          porque: "Sustituyendo: 4 + 6 − 1 = 9." },
        { q: "lím<sub>x→−3</sub> (x² − 9)/(x + 3) vale…",
          op: ["−6", "6", "0", "No existe"], ok: 0,
          porque: "(x − 3)(x + 3)/(x + 3) = x − 3 → −6." },
        { q: "lím<sub>x→+∞</sub> (5x² + 3)/(2x² − x) vale…",
          op: ["5/2", "0", "+∞", "2/5"], ok: 0,
          porque: "Grados iguales: cociente de coeficientes principales, 5/2." },
        { q: "lím<sub>x→0⁺</sub> 1/x vale…",
          op: ["+∞", "−∞", "0", "1"], ok: 0,
          porque: "1/0⁺ = +∞." },
        { q: "lím<sub>x→0</sub> sen(4x)/x vale…",
          op: ["4", "1", "0", "1/4"], ok: 0,
          porque: "sen(4x)/x = 4·sen(4x)/(4x) → 4." },
        { q: "lím<sub>x→+∞</sub> (1 + 3/x)ˣ vale…",
          op: ["e³", "e", "1", "3"], ok: 0,
          porque: "g(f − 1) = x·3/x = 3 → e³." },
        { q: "La asíntota horizontal de f(x) = (4x − 1)/(2x + 5) es…",
          op: ["y = 2", "y = 4", "y = 1/5", "x = −5/2"], ok: 0,
          porque: "Cociente de coeficientes: 4/2 = 2. (x = −5/2 es la vertical.)" },
        { q: "La función f(x) = (x² − 1)/(x − 1) en x = 1 tiene…",
          op: ["una discontinuidad evitable", "un salto finito", "una asíntota vertical", "es continua"], ok: 0,
          porque: "lím = 2 pero f(1) no existe." },
        { q: "Una función con lím<sub>x→a⁻</sub> f = 1 y lím<sub>x→a⁺</sub> f = 4 tiene en a…",
          op: ["un salto finito", "una discontinuidad evitable", "una asíntota", "continuidad"], ok: 0,
          porque: "Los laterales existen pero son distintos (salto de 3)." },
        { q: "El teorema de Bolzano asegura una raíz de f en (a, b) si…",
          op: ["f es continua en [a, b] y f(a)·f(b) &lt; 0", "f es derivable en (a, b)", "f(a) = f(b)", "f(a) &gt; 0"], ok: 0,
          porque: "Hacen falta las dos condiciones: continuidad en el intervalo cerrado y cambio de signo." },
        { q: "lím<sub>x→+∞</sub> (x⁴)/(3ˣ) vale…",
          op: ["0", "+∞", "1/3", "No existe"], ok: 0,
          porque: "La exponencial gana a la potencia." },
        { q: "lím<sub>x→0</sub> x·sen(1/x) vale…",
          op: ["0", "1", "No existe", "+∞"], ok: 0,
          porque: "Sándwich: |x·sen(1/x)| ≤ |x| → 0." }
      ]
    },
    tj1: {
      titulo: "Límites y continuidad",
      cartas: [
        { a: "Definición intuitiva", b: "lím<sub>x→a</sub> f(x) = L: f(x) se acerca a L al acercarse x a a (x ≠ a). No importa f(a)." },
        { a: "Existencia del límite", b: "Existe ⟺ los dos laterales existen y son iguales. Puede fallar por salto, por ±∞ o por oscilación." },
        { a: "k/0", b: "No es indeterminación: tiende a ±∞. El signo sale de estudiar numerador y denominador a cada lado de a." },
        { a: "Indeterminaciones", b: "0/0 · ∞/∞ · ∞ − ∞ · 0·∞ · 1^∞ (y 0⁰, ∞⁰). Hay que transformar la expresión." },
        { a: "0/0 en racionales", b: "Factorizar y simplificar el factor (x − a). Con raíces: multiplicar por el conjugado." },
        { a: "Límites notables (x → 0)", b: "sen x/x → 1 · tan x/x → 1 · (1 − cos x)/x² → 1/2 · (eˣ − 1)/x → 1 · ln(1 + x)/x → 1." },
        { a: "Racionales en ±∞", b: "grado num. &lt; den.: 0 · iguales: cociente de coeficientes principales · num. &gt; den.: ±∞." },
        { a: "∞ − ∞", b: "Con fracciones: común denominador. Con raíces: conjugado y dividir por la mayor potencia." },
        { a: "El número e y 1^∞", b: "lím(1 + 1/x)ˣ = e. En general lím f^g = e^(lím g·(f − 1)) si f → 1 y g → ∞." },
        { a: "Jerarquía de infinitos", b: "log x ≪ xⁿ ≪ aˣ (a &gt; 1) ≪ x!" },
        { a: "Asíntotas", b: "Vertical x = a: lím = ±∞ · Horizontal y = L: lím<sub>±∞</sub> f = L · Oblicua y = mx + n: m = lím f/x, n = lím (f − mx)." },
        { a: "Continuidad en a", b: "1) existe f(a) · 2) existe el límite · 3) lím = f(a)." },
        { a: "Tipos de discontinuidad", b: "Evitable (límite ≠ f(a)) · salto finito (laterales distintos) · salto infinito (±∞) · esencial (oscila)." },
        { a: "Sándwich", b: "g ≤ f ≤ h y lím g = lím h = L ⇒ lím f = L. Acotada × infinitésimo → 0." },
        { a: "Teorema de Bolzano", b: "f continua en [a, b] y f(a)·f(b) &lt; 0 ⇒ existe c ∈ (a, b) con f(c) = 0." },
        { a: "Definición ε–δ", b: "∀ε &gt; 0 ∃δ &gt; 0: 0 &lt; |x − a| &lt; δ ⇒ |f(x) − L| &lt; ε." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "l1", nivel: 1,
      enunciado: "Calcula lím<sub>x→−1</sub> (2x³ − x + 4).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 3 },
      pistas: ["Es un polinomio: se puede sustituir directamente."],
      pasos: ["2·(−1)³ − (−1) + 4 = −2 + 1 + 4 = 3."],
      resultado: "3",
      ojo: "(−1)³ = −1: al elevar un número negativo a una potencia impar sale negativo." },
    { id: "l2", nivel: 1,
      enunciado: "Calcula lím<sub>x→1</sub> (x² − 1)/(x − 1).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 2 },
      pistas: ["Al sustituir sale 0/0. Factoriza el numerador."],
      pasos: ["x² − 1 = (x − 1)(x + 1).", "(x − 1)(x + 1)/(x − 1) = x + 1 → 2."],
      resultado: "2" },
    { id: "l3", nivel: 1,
      enunciado: "Calcula lím<sub>x→−2</sub> (x² + x − 2)/(x + 2).",
      check: { tipo: "num", etiqueta: "Límite =", valor: -3 },
      pistas: ["x² + x − 2 se anula en x = −2: tiene el factor (x + 2)."],
      pasos: ["x² + x − 2 = (x + 2)(x − 1).", "Cancelando: x − 1 → −2 − 1 = −3."],
      resultado: "−3" },
    { id: "l4", nivel: 1,
      enunciado: "Calcula lím<sub>x→0</sub> (x² + 5x)/x.",
      check: { tipo: "num", etiqueta: "Límite =", valor: 5 },
      pistas: ["Saca x factor común."],
      pasos: ["(x² + 5x)/x = x + 5 → 5."],
      resultado: "5" },
    { id: "l5", nivel: 1,
      enunciado: "Calcula lím<sub>x→+∞</sub> (4x − 1)/(2x + 7).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 2 },
      pistas: ["Grados iguales: cociente de coeficientes principales."],
      pasos: ["Dividiendo por x: (4 − 1/x)/(2 + 7/x) → 4/2 = 2."],
      resultado: "2" },
    { id: "l6", nivel: 1,
      enunciado: "Calcula lím<sub>x→+∞</sub> (3x² + 1)/(x³ − 2).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 0 },
      pistas: ["Compara los grados: el del denominador es mayor."],
      pasos: ["Grado numerador (2) &lt; grado denominador (3) → el límite es 0."],
      resultado: "0" },
    { id: "l7", nivel: 1,
      enunciado: "Calcula lím<sub>x→+∞</sub> (x² + 1)/(x + 3).",
      check: { tipo: "opcion", etiqueta: "Vale", opciones: ["+∞", "−∞", "0", "1"], ok: 0 },
      pistas: ["Grado del numerador mayor que el del denominador."],
      pasos: ["Crece como x²/x = x → +∞."],
      resultado: "+∞" },
    { id: "l8", nivel: 1,
      enunciado: "Calcula los límites laterales de f(x) = |x|/x en x = 0.",
      check: [{ tipo: "num", etiqueta: "Por la izquierda =", valor: -1 }, { tipo: "num", etiqueta: "Por la derecha =", valor: 1 }],
      pistas: ["Para x &lt; 0, |x| = −x; para x &gt; 0, |x| = x."],
      pasos: ["x &lt; 0: −x/x = −1. x &gt; 0: x/x = 1.", "Como −1 ≠ 1, el límite en 0 no existe."],
      resultado: "−1 y 1" },
    { id: "l9", nivel: 1,
      enunciado: "Calcula lím<sub>x→2⁻</sub> 1/(x − 2).",
      check: { tipo: "opcion", etiqueta: "Vale", opciones: ["+∞", "−∞", "0", "No existe como número, pero tiende a 1"], ok: 1 },
      pistas: ["Por la izquierda, x &lt; 2, luego x − 2 es un número pequeño y negativo."],
      pasos: ["1/0⁻ = −∞."],
      resultado: "−∞" },
    { id: "l10", nivel: 1,
      enunciado: "Halla las asíntotas de f(x) = 3/(x − 5): la vertical x = a y la horizontal y = b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 5 }, { tipo: "num", etiqueta: "b =", valor: 0 }],
      pistas: ["Vertical: denominador cero. Horizontal: límite en el infinito."],
      pasos: ["x − 5 = 0 → x = 5 (el numerador es 3 ≠ 0).", "lím<sub>x→±∞</sub> 3/(x − 5) = 0 → y = 0."],
      resultado: "x = 5 e y = 0" },
    { id: "l11", nivel: 1,
      enunciado: "¿Es continua en x = 1 la función f(x) = { 2x + 1 si x &lt; 1 ; x² + 2 si x ≥ 1 }?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["Sí, es continua", "No: tiene un salto", "No: tiene una discontinuidad evitable", "No: tiene una asíntota"], ok: 0 },
      pistas: ["Compara el valor por la izquierda, por la derecha y f(1)."],
      pasos: ["Izquierda: 2·1 + 1 = 3. Derecha: 1 + 2 = 3. f(1) = 1² + 2 = 3.", "Los tres valores coinciden: continua."],
      resultado: "Sí, es continua" },
    { id: "l12", nivel: 1,
      enunciado: "Calcula lím<sub>x→0</sub> sen(3x)/x.",
      check: { tipo: "num", etiqueta: "Límite =", valor: 3 },
      pistas: ["Usa lím sen t/t = 1 con t = 3x."],
      pasos: ["sen(3x)/x = 3·sen(3x)/(3x) → 3·1 = 3."],
      resultado: "3" },

    // ================= ★★ medio =================
    { id: "l13", nivel: 2,
      enunciado: "Calcula lím<sub>x→4</sub> (√x − 2)/(x − 4).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 0.25 },
      pistas: ["0/0 con raíz: multiplica por el conjugado √x + 2."],
      pasos: ["(√x − 2)(√x + 2) = x − 4.", "Queda (x − 4)/((x − 4)(√x + 2)) = 1/(√x + 2) → 1/4."],
      resultado: "1/4 = 0,25" },
    { id: "l14", nivel: 2,
      enunciado: "Calcula lím<sub>x→0</sub> (√(x + 9) − 3)/x. (Puedes escribir una fracción.)",
      check: { tipo: "num", etiqueta: "Límite =", valor: 1 / 6 },
      pistas: ["Conjugado: √(x + 9) + 3."],
      pasos: ["Numerador: (x + 9) − 9 = x.", "Queda 1/(√(x + 9) + 3) → 1/(3 + 3) = 1/6."],
      resultado: "1/6 ≈ 0,1667" },
    { id: "l15", nivel: 2,
      enunciado: "Calcula lím<sub>x→3</sub> (x³ − 27)/(x² − 9).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 4.5 },
      pistas: ["x³ − 27 = (x − 3)(x² + 3x + 9)."],
      pasos: ["x² − 9 = (x − 3)(x + 3).", "(x² + 3x + 9)/(x + 3) → (9 + 9 + 9)/6 = 27/6 = 9/2."],
      resultado: "9/2 = 4,5" },
    { id: "l16", nivel: 2,
      enunciado: "Calcula lím<sub>x→2</sub> (x² − x − 2)/(x² − 4).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 0.75 },
      pistas: ["Factoriza los dos polinomios: ambos tienen el factor (x − 2)."],
      pasos: ["x² − x − 2 = (x − 2)(x + 1) y x² − 4 = (x − 2)(x + 2).", "(x + 1)/(x + 2) → 3/4."],
      resultado: "3/4 = 0,75" },
    { id: "l17", nivel: 2,
      enunciado: "Calcula lím<sub>x→+∞</sub> (5x³ + x)/(2x³ − 7x²).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 2.5 },
      pistas: ["Grados iguales."],
      pasos: ["Se divide por x³: (5 + 1/x²)/(2 − 7/x) → 5/2."],
      resultado: "5/2" },
    { id: "l18", nivel: 2,
      enunciado: "Calcula lím<sub>x→−∞</sub> (x² + 1)/(3x − 2).",
      check: { tipo: "opcion", etiqueta: "Vale", opciones: ["+∞", "−∞", "0", "1/3"], ok: 1 },
      pistas: ["Se comporta como x²/(3x) = x/3 cuando x es enorme."],
      pasos: ["x/3 con x → −∞ tiende a −∞."],
      resultado: "−∞" },
    { id: "l19", nivel: 2,
      enunciado: "Calcula lím<sub>x→+∞</sub> (√(x² + 5x) − x).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 2.5 },
      pistas: ["∞ − ∞: multiplica y divide por el conjugado √(x² + 5x) + x."],
      pasos: ["(x² + 5x − x²)/(√(x² + 5x) + x) = 5x/(√(x² + 5x) + x).", "Dividiendo por x: 5/(√(1 + 5/x) + 1) → 5/2."],
      resultado: "5/2" },
    { id: "l20", nivel: 2,
      enunciado: "Calcula lím<sub>x→+∞</sub> (√(x² + 4) − x).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 0 },
      pistas: ["Conjugado: √(x² + 4) + x."],
      pasos: ["(x² + 4 − x²)/(√(x² + 4) + x) = 4/(√(x² + 4) + x) → 4/∞ = 0."],
      resultado: "0" },
    { id: "l21", nivel: 2,
      enunciado: "Calcula lím<sub>x→1</sub> (1/(x − 1) − 2/(x² − 1)).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 0.5 },
      pistas: ["∞ − ∞ con fracciones: común denominador (x − 1)(x + 1)."],
      pasos: ["(x + 1 − 2)/((x − 1)(x + 1)) = (x − 1)/((x − 1)(x + 1)) = 1/(x + 1) → 1/2."],
      resultado: "1/2" },
    { id: "l22", nivel: 2,
      enunciado: "Calcula lím<sub>x→+∞</sub> (1 + 4/x)ˣ.",
      check: { tipo: "num", etiqueta: "Límite =", valor: 54.598 },
      pistas: ["1^∞: g(f − 1) = x·4/x = 4."],
      pasos: ["El límite es e⁴ = 54,598."],
      resultado: "e⁴ ≈ 54,6" },
    { id: "l23", nivel: 2,
      enunciado: "Calcula lím<sub>x→+∞</sub> ((x + 2)/(x − 1))ˣ.",
      check: { tipo: "num", etiqueta: "Límite =", valor: 20.0855 },
      pistas: ["f − 1 = 3/(x − 1). Calcula lím x·3/(x − 1)."],
      pasos: ["g(f − 1) = 3x/(x − 1) → 3.", "El límite es e³ ≈ 20,09."],
      resultado: "e³ ≈ 20,09" },
    { id: "l24", nivel: 2,
      enunciado: "Calcula lím<sub>x→0</sub> (1 − cos 3x)/x².",
      check: { tipo: "num", etiqueta: "Límite =", valor: 4.5 },
      pistas: ["Usa lím (1 − cos t)/t² = 1/2 con t = 3x."],
      pasos: ["(1 − cos 3x)/x² = 9·(1 − cos 3x)/(3x)² → 9·1/2 = 9/2."],
      resultado: "9/2 = 4,5" },
    { id: "l25", nivel: 2,
      enunciado: "La función f(x) = (x + 1)/(x² − x − 2) tiene una única asíntota vertical x = a. Halla a.",
      check: { tipo: "num", etiqueta: "a =", valor: 2 },
      pistas: ["Factoriza el denominador y comprueba cuáles de sus raíces se cancelan con el numerador."],
      pasos: ["x² − x − 2 = (x − 2)(x + 1). Candidatas: x = 2 y x = −1.", "En x = −1 se cancela (x + 1): hay un hueco, no una asíntota.", "En x = 2: 3/0 → asíntota vertical x = 2."],
      resultado: "x = 2" },
    { id: "l26", nivel: 2,
      enunciado: "Halla la asíntota oblicua y = mx + n de f(x) = (x² − 3x + 5)/(x − 2).",
      check: [{ tipo: "num", etiqueta: "m =", valor: 1 }, { tipo: "num", etiqueta: "n =", valor: -1 }],
      pistas: ["Divide los polinomios."],
      pasos: ["x² − 3x + 5 = (x − 2)(x − 1) + 3, luego f(x) = x − 1 + 3/(x − 2).", "La asíntota oblicua es y = x − 1."],
      resultado: "y = x − 1" },
    { id: "l27", nivel: 2,
      enunciado: "Halla la asíntota horizontal y = b de f(x) = (3x² + 1)/(x² + 2).",
      check: { tipo: "num", etiqueta: "b =", valor: 3 },
      pistas: ["Grados iguales."],
      pasos: ["lím = 3/1 = 3 → y = 3."],
      resultado: "y = 3" },
    { id: "l28", nivel: 2,
      enunciado: "Halla k para que f(x) = { (x² − 1)/(x − 1) si x ≠ 1 ; k si x = 1 } sea continua en x = 1.",
      check: { tipo: "num", etiqueta: "k =", valor: 2 },
      pistas: ["El valor en 1 debe ser igual al límite en 1."],
      pasos: ["lím<sub>x→1</sub> (x² − 1)/(x − 1) = lím (x + 1) = 2.", "Se exige f(1) = 2: k = 2."],
      resultado: "k = 2" },
    { id: "l29", nivel: 2,
      enunciado: "Halla k para que f(x) = { kx − 1 si x ≤ 2 ; x² − k si x &gt; 2 } sea continua en x = 2 (da el valor decimal).",
      check: { tipo: "num", etiqueta: "k =", valor: 5 / 3 },
      pistas: ["Iguala los valores de los dos trozos en x = 2."],
      pasos: ["Izquierda: 2k − 1. Derecha: 4 − k.", "2k − 1 = 4 − k → 3k = 5 → k = 5/3 ≈ 1,667."],
      resultado: "k = 5/3 ≈ 1,667" },

    // ================= ★★★ avanzado =================
    { id: "l30", nivel: 3,
      enunciado: "Calcula lím<sub>x→+∞</sub> x·sen(1/x).",
      check: { tipo: "num", etiqueta: "Límite =", valor: 1 },
      pistas: ["Cambia t = 1/x. Cuando x → ∞, t → 0."],
      pasos: ["x·sen(1/x) = sen t/t con t = 1/x → 0.", "Límite notable: → 1."],
      resultado: "1" },
    { id: "l31", nivel: 3,
      enunciado: "Para f(x) = (x² − 9)/(x² − 4x + 3) halla la asíntota vertical x = a, la horizontal y = b y la ordenada del hueco (el valor al que tiende f en el punto donde el denominador y el numerador se anulan a la vez).",
      check: [{ tipo: "num", etiqueta: "a =", valor: 1 }, { tipo: "num", etiqueta: "b =", valor: 1 }, { tipo: "num", etiqueta: "ordenada del hueco =", valor: 3 }],
      pistas: ["x² − 4x + 3 = (x − 1)(x − 3) y x² − 9 = (x − 3)(x + 3)."],
      pasos: ["Se cancela (x − 3): f(x) = (x + 3)/(x − 1).", "x = 3: hueco, con lím = (3 + 3)/(3 − 1) = 3.", "x = 1: numerador 1 − 9 = −8 ≠ 0: asíntota vertical x = 1.", "Grados iguales: horizontal y = 1."],
      resultado: "x = 1 · y = 1 · hueco en (3, 3)" },
    { id: "l32", nivel: 3,
      enunciado: "Estudia f(x) = (x² − 4)/(x² + x − 6). En x = 2 calcula el límite y en x = −3 clasifica la discontinuidad.",
      check: [{ tipo: "num", etiqueta: "lím en x = 2 =", valor: 0.8 }, { tipo: "opcion", etiqueta: "En x = −3 hay", opciones: ["una discontinuidad evitable", "un salto finito", "un salto infinito (asíntota)", "continuidad"], ok: 2 }],
      pistas: ["x² + x − 6 = (x + 3)(x − 2) y x² − 4 = (x − 2)(x + 2)."],
      pasos: ["f(x) = (x + 2)/(x + 3) para x ≠ 2.", "En x = 2: lím = 4/5 = 0,8 (hueco: evitable).", "En x = −3: numerador −1 ≠ 0, denominador 0: salto infinito (asíntota vertical)."],
      resultado: "4/5 · salto infinito" },
    { id: "l33", nivel: 3,
      enunciado: "Halla a y b para que f(x) = { ax + 2 si x &lt; 1 ; 5 si x = 1 ; x² + b si x &gt; 1 } sea continua en x = 1.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 3 }, { tipo: "num", etiqueta: "b =", valor: 4 }],
      pistas: ["Las tres expresiones deben valer lo mismo en x = 1."],
      pasos: ["Izquierda: a + 2 = f(1) = 5 → a = 3.", "Derecha: 1 + b = 5 → b = 4."],
      resultado: "a = 3, b = 4" },
    { id: "l34", nivel: 3,
      enunciado: "Sea g(x) = x³ − 2x − 5. Comprueba que g(2) &lt; 0 &lt; g(3) y da g(2,5) para empezar la bisección.",
      check: { tipo: "num", etiqueta: "g(2,5) =", valor: 5.625 },
      pistas: ["2,5³ = 15,625."],
      pasos: ["g(2) = 8 − 4 − 5 = −1 &lt; 0 y g(3) = 27 − 6 − 5 = 16 &gt; 0.", "g(2,5) = 15,625 − 5 − 5 = 5,625 &gt; 0: la raíz está en (2, 2,5)."],
      resultado: "5,625 → la raíz está en (2, 2,5)" },
    { id: "l35", nivel: 3,
      enunciado: "Demuestra que la ecuación x⁵ + x − 1 = 0 tiene alguna solución en el intervalo (0, 1).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Define f(x) = x⁵ + x − 1 y dice que es continua en [0, 1] (polinomio)", p: 0.5 },
        { t: "Calcula f(0) = −1 &lt; 0", p: 0.5 },
        { t: "Calcula f(1) = 1 &gt; 0", p: 0.5 },
        { t: "Concluye con el teorema de Bolzano: existe c ∈ (0, 1) con f(c) = 0", p: 0.5 }
      ] },
      pasos: ["f(x) = x⁵ + x − 1 es continua en ℝ por ser un polinomio.", "f(0) = −1 &lt; 0 y f(1) = 1 + 1 − 1 = 1 &gt; 0.", "Por Bolzano existe c ∈ (0, 1) con f(c) = 0. ∎"],
      resultado: "Existe solución en (0, 1) (Bolzano)" },
    { id: "l36", nivel: 3,
      enunciado: "Para lím<sub>x→2</sub> (3x − 2) = 4 y ε = 0,3, ¿cuál es el mayor δ que sirve?",
      check: { tipo: "num", etiqueta: "δ =", valor: 0.1 },
      pistas: ["|(3x − 2) − 4| = 3|x − 2|."],
      pasos: ["3|x − 2| &lt; 0,3 → |x − 2| &lt; 0,1. δ = ε/3 = 0,1."],
      resultado: "δ = 0,1" },
    { id: "l37", nivel: 3,
      enunciado: "Aplica la jerarquía de infinitos a lím<sub>x→+∞</sub> 2ˣ/x⁵ y lím<sub>x→+∞</sub> (ln x)/x.",
      check: [{ tipo: "opcion", etiqueta: "2ˣ/x⁵ →", opciones: ["+∞", "0", "1", "No existe"], ok: 0 }, { tipo: "opcion", etiqueta: "(ln x)/x →", opciones: ["+∞", "0", "1", "No existe"], ok: 1 }],
      pistas: ["Orden de crecimiento: logaritmo ≪ potencia ≪ exponencial."],
      pasos: ["2ˣ (exponencial) crece más que x⁵ (potencia): el cociente → +∞.", "ln x (logaritmo) crece menos que x (potencia): el cociente → 0."],
      resultado: "+∞ y 0" },
    { id: "l38", nivel: 3,
      enunciado: "Halla las asíntotas de f(x) = (2x² + 1)/x: la vertical x = a, y la oblicua y = mx + n.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 0 }, { tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 0 }],
      pistas: ["f(x) = 2x + 1/x."],
      pasos: ["f(x) = 2x + 1/x: vertical x = 0 (el numerador vale 1 ≠ 0).", "f(x) − 2x = 1/x → 0: oblicua y = 2x."],
      resultado: "x = 0 e y = 2x" },
    { id: "l39", nivel: 3,
      enunciado: "La concentración de un fármaco (mg/L) es C(t) = 200t/(t + 20) (t en horas). Calcula el valor al que tiende y el instante en que llega a 100 mg/L.",
      check: [{ tipo: "num", etiqueta: "Límite (mg/L) =", valor: 200 }, { tipo: "num", etiqueta: "t (h) =", valor: 20 }],
      pistas: ["Grados iguales para el límite; iguala C(t) = 100 para el instante."],
      pasos: ["lím<sub>t→∞</sub> 200t/(t + 20) = 200.", "200t/(t + 20) = 100 → 200t = 100t + 2000 → t = 20 h."],
      resultado: "200 mg/L y 20 h" },
    { id: "l40", nivel: 3,
      enunciado: "Una tabla da f(x) = (x³ − 8)/(x − 2): f(1,9) = 11,41 · f(1,99) = 11,9401 · f(1,999) = 11,994001 · f(2,001) = 12,006001 · f(2,01) = 12,0601. Estima lím<sub>x→2</sub> f(x) y compruébalo algebraicamente.",
      check: { tipo: "num", etiqueta: "Límite =", valor: 12 },
      pistas: ["x³ − 8 = (x − 2)(x² + 2x + 4)."],
      pasos: ["Por los dos lados los valores se acercan a 12.", "Algebraicamente: (x − 2)(x² + 2x + 4)/(x − 2) = x² + 2x + 4 → 4 + 4 + 4 = 12."],
      resultado: "12" },
    { id: "l41", nivel: 3,
      enunciado: "Estudia f(x) = (x² − 1)/(x² − 4): dominio, simetría, cortes con los ejes, asíntotas (con los límites laterales) y signo.",
      check: { tipo: "rubrica", etiqueta: "Tu estudio", filas: 9, items: [
        { t: "Dominio ℝ − {−2, 2}", p: 0.4 },
        { t: "Simetría: f(−x) = f(x) → función par", p: 0.4 },
        { t: "Cortes: con Y f(0) = 1/4 → (0, 1/4); con X x = ±1", p: 0.5 },
        { t: "Asíntotas verticales x = 2 y x = −2, con sus límites laterales (±∞)", p: 0.5 },
        { t: "Asíntota horizontal y = 1 (grados iguales)", p: 0.4 },
        { t: "Signo: positiva en (−∞, −2) ∪ (−1, 1) ∪ (2, +∞) y negativa en (−2, −1) ∪ (1, 2)", p: 0.4 }
      ] },
      pasos: ["Dominio: x² − 4 ≠ 0 → ℝ − {−2, 2}. Par.", "f(0) = (−1)/(−4) = 1/4; x² − 1 = 0 → x = ±1.", "Verticales: x = ±2 (numerador 3 ≠ 0). En x = 2⁺: 3/0⁺ = +∞; x = 2⁻: 3/0⁻ = −∞; en x = −2 por simetría: x = −2⁻: +∞ y x = −2⁺: −∞.", "Horizontal: y = 1.", "Signo: tabla con −2, −1, 1, 2: +, −, +, −, + (de izquierda a derecha)."],
      resultado: "Dom ℝ − {±2} · par · cortes (0, 1/4), (±1, 0) · AV x = ±2 · AH y = 1" },
    { id: "l42", nivel: 3,
      enunciado: "Explica por qué lím<sub>x→0</sub> sen(1/x) no existe.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Toma una sucesión que tiende a 0 con sen(1/xₙ) = 0, por ejemplo xₙ = 1/(nπ): los valores de f son 0", p: 0.5 },
        { t: "Toma otra sucesión que tiende a 0 con sen(1/xₙ) = 1, por ejemplo xₙ = 1/(π/2 + 2nπ): los valores de f son 1", p: 0.5 },
        { t: "Concluye que f se acerca a dos valores distintos y por tanto no tiene límite (oscila)", p: 0.5 }
      ] },
      pasos: ["Con xₙ = 1/(nπ) → 0: sen(nπ) = 0 → f(xₙ) = 0.", "Con yₙ = 1/(π/2 + 2nπ) → 0: sen(π/2 + 2nπ) = 1 → f(yₙ) = 1.", "Dos límites distintos: no existe. Es una discontinuidad esencial."],
      resultado: "No existe (oscila entre −1 y 1)" },
    { id: "l43", nivel: 3,
      enunciado: "Demuestra con la definición ε–δ que lím<sub>x→2</sub> (3x − 2) = 4.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Plantea: dado ε &gt; 0, hay que hallar δ &gt; 0 tal que 0 &lt; |x − 2| &lt; δ ⇒ |(3x − 2) − 4| &lt; ε", p: 0.5 },
        { t: "Simplifica |(3x − 2) − 4| = |3x − 6| = 3|x − 2|", p: 0.5 },
        { t: "Despeja: 3|x − 2| &lt; ε ⇔ |x − 2| &lt; ε/3 y elige δ = ε/3", p: 0.5 },
        { t: "Comprueba que con ese δ se cumple la implicación", p: 0.5 }
      ] },
      pasos: ["|(3x − 2) − 4| = |3x − 6| = 3|x − 2|.", "Si |x − 2| &lt; δ = ε/3, entonces |f(x) − 4| = 3|x − 2| &lt; 3·ε/3 = ε. ∎"],
      resultado: "δ = ε/3" },
    { id: "l44", nivel: 3,
      enunciado: "Halla k para que lím<sub>x→0</sub> (√(1 + kx) − 1)/x = 3.",
      check: { tipo: "num", etiqueta: "k =", valor: 6 },
      pistas: ["Conjugado: √(1 + kx) + 1. El límite resulta ser k/2."],
      pasos: ["(1 + kx − 1)/(x(√(1 + kx) + 1)) = k/(√(1 + kx) + 1) → k/2.", "k/2 = 3 → k = 6."],
      resultado: "k = 6" },
    { id: "l45", nivel: 3,
      enunciado: "Halla a para que lím<sub>x→+∞</sub> (√(x² + ax) − x) = 4.",
      check: { tipo: "num", etiqueta: "a =", valor: 8 },
      pistas: ["Con el conjugado, el límite es a/2."],
      pasos: ["(x² + ax − x²)/(√(x² + ax) + x) = ax/(√(x² + ax) + x) → a/2.", "a/2 = 4 → a = 8."],
      resultado: "a = 8" },
    { id: "l46", nivel: 3,
      enunciado: "Fabricar x unidades cuesta C(x) = 500 + 3x euros. ¿Hacia qué valor tiende el coste medio C(x)/x cuando x → +∞?",
      check: { tipo: "num", etiqueta: "Límite (€/unidad) =", valor: 3 },
      pistas: ["C(x)/x = 500/x + 3."],
      pasos: ["500/x → 0, luego el coste medio tiende a 3 €/unidad."],
      resultado: "3 €/unidad" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Cuadro de decisión: ¿qué sale al sustituir?", ancha: true,
      tabla: { cab: ["Sale…", "Qué hacer"], filas: [
        ["un número L", "ése es el límite"],
        ["k/0 (k ≠ 0)", "laterales: signo de numerador y denominador"],
        ["0/0", "factorizar · conjugado · límites notables"],
        ["∞/∞", "grados (racionales) · dividir por la mayor potencia"],
        ["∞ − ∞", "común denominador · conjugado"],
        ["0·∞", "pasar a cociente"],
        ["1^∞", "número e: lím f^g = e^(lím g·(f − 1))"]
      ] },
      nota: "Tras transformar, vuelve a sustituir." },
    { titulo: "Laterales y existencia",
      items: [
        { label: "Existencia", formula: "lím f = L ⟺ lím<sub>a⁻</sub> = lím<sub>a⁺</sub> = L" },
        { label: "k/0 con signos", formula: "k/0⁺ = +∞ si k &gt; 0 · k/0⁻ = −∞ si k &gt; 0 (y al revés si k &lt; 0)" },
        { label: "Valor absoluto", formula: "|x − a| = x − a (x &gt; a) · −(x − a) (x &lt; a)", ejemplo: "|x|/x → −1 y 1" }
      ] },
    { titulo: "0/0 y límites notables",
      items: [
        { label: "Factorizar", formula: "(x − a)·P(x)/((x − a)·Q(x)) = P(x)/Q(x)", ejemplo: "(x² − 9)/(x − 3) → x + 3 → 6" },
        { label: "Conjugado", formula: "(√A − B)(√A + B) = A − B²", ejemplo: "(√(x+4) − 2)/x → 1/4" },
        { label: "Notables (x → 0)", formula: "sen x/x → 1 · tan x/x → 1 · (1 − cos x)/x² → 1/2 · (eˣ − 1)/x → 1 · ln(1 + x)/x → 1" }
      ] },
    { titulo: "Límites en el infinito", ancha: true,
      tabla: { cab: ["Racional P/Q", "Límite"], filas: [
        ["grado P &lt; grado Q", "0"],
        ["grado P = grado Q", "aₙ/bₙ (coeficientes principales)"],
        ["grado P &gt; grado Q", "±∞ (signo por aₙ/bₘ y por el signo de x)"]
      ] },
      items: [
        { label: "Jerarquía", formula: "log x ≪ xⁿ ≪ aˣ (a &gt; 1) ≪ x!" },
        { label: "∞ − ∞ con raíces", formula: "multiplicar y dividir por el conjugado y dividir por x", ejemplo: "√(x² + 3x) − x → 3/2" },
        { label: "Cuidado con las raíces", formula: "√(x²) = |x|", ojo: "√(x² + 1)/x → +1 (en +∞) y −1 (en −∞)" },
        { label: "Número e", formula: "(1 + 1/x)ˣ → e", ejemplo: "(1 + 2/x)ˣ → e²" }
      ] },
    { titulo: "Asíntotas",
      items: [
        { label: "Vertical", formula: "x = a si lím<sub>a⁺ o a⁻</sub> f = ±∞", cuando: "Raíces del denominador que no se cancelan." },
        { label: "Horizontal", formula: "y = L si lím<sub>±∞</sub> f = L", cuando: "Máximo 2 (una por lado)." },
        { label: "Oblicua", formula: "y = mx + n, m = lím f/x, n = lím (f − mx)", cuando: "Racional: grado num. = grado den. + 1 (la división da la recta)." }
      ],
      nota: "Si en un lado hay horizontal, en ese lado no hay oblicua." },
    { titulo: "Continuidad", ancha: true,
      items: [
        { label: "Continua en a", formula: "1) existe f(a) · 2) existe lím · 3) lím = f(a)" }
      ],
      tabla: { cab: ["Discontinuidad", "Qué pasa"], filas: [
        ["Evitable", "existe el límite pero ≠ f(a) (o f(a) no existe)"],
        ["Salto finito", "laterales finitos y distintos"],
        ["Salto infinito", "algún lateral es ±∞ (asíntota vertical)"],
        ["Esencial", "el límite oscila y no existe"]
      ] },
      nota: "Las funciones elementales son continuas en su dominio; sólo sospechan los puntos de unión y los que no están en el dominio." },
    { titulo: "Teoremas",
      items: [
        { label: "Bolzano", formula: "f continua en [a, b], f(a)·f(b) &lt; 0 ⇒ ∃c ∈ (a, b): f(c) = 0" },
        { label: "Valor intermedio", formula: "f continua en [a, b] toma todos los valores entre f(a) y f(b)" },
        { label: "Weierstrass", formula: "f continua en [a, b] alcanza máximo y mínimo absolutos" },
        { label: "Sándwich", formula: "g ≤ f ≤ h, lím g = lím h = L ⇒ lím f = L" }
      ] },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "lím (x² − 1)/(x − 1) no existe porque f(1) no existe", bien: "Vale 2", por: "El límite no depende de f(a)." },
        { mal: "∞ − ∞ = 0", bien: "Es indeterminación", por: "√(x² + 3x) − x → 3/2." },
        { mal: "1^∞ = 1", bien: "Es indeterminación (número e)", por: "(1 + 1/x)ˣ → e." },
        { mal: "|x|/x → 1 en 0", bien: "Laterales −1 y 1: no existe", por: "|x| cambia de fórmula." },
        { mal: "√(x² + 1)/x → 1 en −∞", bien: "→ −1", por: "√(x²) = |x| = −x si x &lt; 0." },
        { mal: "Toda raíz del denominador es asíntota vertical", bien: "Sólo si no se cancela", por: "Si se cancela, es un hueco." }
      ] }
  ];

  B.registrar("mates1", "t10", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
