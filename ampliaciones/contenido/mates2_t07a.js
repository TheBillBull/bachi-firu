/* ============================================================
   Matemáticas II · ampliaciones · Tema 7: Límites de funciones y continuidad
   (parte A: se añade al final de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t7/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso
  secciones[0] =
    "<h5>Qué es una indeterminación (y qué no es)</h5>" +
    "<p>Al calcular un límite sustituimos x por el valor al que tiende. A veces sale un número (y ya está), a veces sale un resultado claro con infinitos, y a veces sale una <b>indeterminación</b>: una expresión como 0/0 que <b>no tiene valor por sí sola</b> porque depende de «quién gana» en cada parte. Que salga una indeterminación <b>no quiere decir que el límite no exista</b>: quiere decir «todavía no sé cuánto vale, hay que transformar la expresión». Por ejemplo, 0/0 puede valer 0, 5, +∞ o no existir, según de qué funciones venga.</p>" +
    "<h5>Operaciones con infinito: lo que sí está decidido</h5>" +
    tabla(["Expresión", "Resultado", "Expresión", "Resultado"], [
      ["k + ∞", "+∞", "k / ∞", "0"],
      ["∞ + ∞", "+∞", "k / 0 (k ≠ 0)", "±∞ (hay que mirar los signos)"],
      ["∞ · ∞", "∞ (con la regla de signos)", "k^∞ con k &gt; 1", "+∞"],
      ["k · ∞ (k ≠ 0)", "±∞", "k^∞ con 0 &lt; k &lt; 1", "0"]
    ]) +
    "<p><b>Las siete indeterminaciones</b> (las que obligan a trabajar): <b>0/0 · ∞/∞ · ∞ − ∞ · 0·∞ · 1<sup>∞</sup> · ∞<sup>0</sup> · 0<sup>0</sup></b>. En Selectividad aparecen sobre todo las cinco primeras; las dos últimas se resuelven con logaritmos y la regla de L'Hôpital, que se verá en el tema de derivadas.</p>" +
    ojo("«k/0» <b>no es una indeterminación</b>: es ±∞. Pero el signo no sale de la sustitución: hay que calcular los dos límites laterales y mirar el signo del denominador a cada lado de x = a. Por ejemplo 1/x² es +∞ por los dos lados, mientras que 1/x es −∞ por la izquierda y +∞ por la derecha.") +
    "<h5>Quién crece más: la jerarquía de infinitos</h5>" +
    "<p>Cuando x → +∞, todas estas funciones tienden a infinito, pero con rapidez muy distinta. De menor a mayor: <b>logaritmo ≪ potencia (xⁿ) ≪ exponencial (aˣ, a &gt; 1) ≪ factorial/xˣ</b>. Entre potencias gana el exponente mayor. Esto resuelve de un vistazo cualquier ∞/∞: <b>manda el término que más crece</b>, y el límite del cociente es 0 si manda el denominador, ±∞ si manda el numerador, y el cociente de coeficientes si mandan los dos con la misma rapidez.</p>" +
    w("jerarquia") +
    "<h5>Acercarse a un punto y mirar los dos lados</h5>" +
    "<p>Una tabla con valores cada vez más próximos a a (por la izquierda y por la derecha) no es una demostración, pero sirve para <b>intuir</b> el resultado y, sobre todo, para comprobar el que has calculado a mano. Pruébalo con las indeterminaciones de la lista: observa que en el hueco de (x² − 1)/(x − 1) la función no existe en x = 1 pero los valores cercanos se acercan a 2.</p>" +
    w("acercar");

  // ---------------------------------------------------------------- 2. ∞ − ∞
  secciones[1] =
    "<h5>Ojo con x → −∞</h5>" +
    "<p>Al sacar una raíz de x² hay que recordar que <b>√(x²) = |x|</b>: vale x si x &gt; 0 pero −x si x &lt; 0. Por eso un mismo límite puede dar resultados distintos en +∞ y en −∞.</p>" +
    ejemplo("Raíz menos x, con un coeficiente",
      "Calcula lím<sub>x→+∞</sub> (√(x² + 3x) − x).",
      ["Sustituyendo: +∞ − ∞. Indeterminación; hay una raíz, así que conjugado.",
       "Multiplicamos y dividimos por (√(x² + 3x) + x): el numerador es (x² + 3x) − x² = 3x.",
       "Queda " + fr("3x", "√(x² + 3x) + x") + ". Dividimos numerador y denominador entre x (para x &gt; 0, √(x²+3x)/x = √(1 + 3/x)).",
       "= " + fr("3", "√(1 + 3/x) + 1") + " ⟶ " + fr("3", "1 + 1") + " = <b>3/2</b>."]) +
    ejemplo("El mismo tipo de límite hacia −∞",
      "Calcula lím<sub>x→−∞</sub> (√(x² + 3x) + x).",
      ["Aquí la suma √(x²+3x) + x es del tipo +∞ − ∞ (x es muy negativo). Conjugado: (√(x² + 3x) − x).",
       "Numerador: (x² + 3x) − x² = 3x. Queda " + fr("3x", "√(x² + 3x) − x") + ".",
       "Con x &lt; 0, √(x² + 3x) ≈ |x| = −x, de modo que el denominador se comporta como −x − x = −2x.",
       "Dividiendo entre x (negativo): " + fr("3", "−√(1 + 3/x) − 1") + " ⟶ " + fr("3", "−1 − 1") + " = <b>−3/2</b>.",
       "Comprobación numérica: para x = −1000, √(10⁶ − 3000) − 1000 ≈ −1,5011 ✓ (se acerca a −1,5)."]) +
    ejemplo("Dos raíces",
      "Calcula lím<sub>x→+∞</sub> (√(x² + x) − √(x² − x)).",
      ["+∞ − ∞ con dos raíces: el conjugado es la suma de las dos. Multiplicamos y dividimos por (√(x²+x) + √(x²−x)).",
       "Numerador: (x² + x) − (x² − x) = 2x.",
       "Queda " + fr("2x", "√(x² + x) + √(x² − x)") + ". Dividimos entre x: " + fr("2", "√(1 + 1/x) + √(1 − 1/x)") + " ⟶ " + fr("2", "1 + 1") + " = <b>1</b>."]) +
    "<h5>Cuando no hay raíces: denominador común o término dominante</h5>" +
    "<p>Si ∞ − ∞ viene de <b>fracciones</b>, se reduce a común denominador. Si viene de un <b>polinomio</b> (x³ − 5x², por ejemplo), basta sacar factor común de la mayor potencia: x³(1 − 5/x), que tiende a +∞·1 = +∞ cuando x → +∞.</p>" +
    ejemplo("Resta de fracciones en x = 1",
      "Calcula lím<sub>x→1</sub> (" + fr("1", "x − 1") + " − " + fr("2", "x² − 1") + ").",
      ["Cada sumando tiende a ±∞ (por el mismo lado, con distinto signo posible): ∞ − ∞.",
       "Común denominador x² − 1 = (x − 1)(x + 1): " + fr("(x + 1) − 2", "x² − 1") + " = " + fr("x − 1", "(x − 1)(x + 1)") + ".",
       "Simplificamos (x ≠ 1): " + fr("1", "x + 1") + " ⟶ <b>1/2</b>."]);

  // ---------------------------------------------------------------- 3. Continuidad
  secciones[2] =
    "<h5>Las tres condiciones, y qué función las cumple de fábrica</h5>" +
    "<p>f es continua en x = a si: <b>(1)</b> existe f(a); <b>(2)</b> existe lím<sub>x→a</sub> f(x) (finito, es decir, los dos laterales existen y son iguales); <b>(3)</b> el límite coincide con f(a). No hace falta comprobarlo todo cada vez: las funciones «de catálogo» ya son continuas en su dominio.</p>" +
    tabla(["Función", "Dónde es continua"], [
      ["Polinomios", "En todo ℝ"],
      ["Cociente de polinomios (racional)", "En todo ℝ salvo donde se anula el denominador"],
      ["√(g(x)) y ln(g(x))", "Donde g(x) ≥ 0 (raíz) o g(x) &gt; 0 (logaritmo)"],
      ["eˣ, sen x, cos x", "En todo ℝ"],
      ["tg x", "En ℝ salvo x = π/2 + kπ"],
      ["|x|", "En todo ℝ"],
      ["Suma, producto, composición", "Si las piezas son continuas, el resultado también (el cociente, donde el denominador no es 0)"]
    ]) +
    "<p>Por tanto, <b>una función dada por una sola fórmula elemental solo puede fallar en los puntos que no están en su dominio</b>. Una función a trozos puede fallar, además, en los puntos donde cambia de fórmula. Esos son los candidatos que hay que revisar.</p>" +
    ejemplo("Clasificar las discontinuidades de una racional",
      "Estudia la continuidad de f(x) = " + fr("x² − x − 2", "x² − 4") + " y clasifica las discontinuidades.",
      ["Dominio: x² − 4 = (x − 2)(x + 2) = 0 ⟹ x = 2 y x = −2. Solo pueden fallar esos dos puntos.",
       "Factorizamos el numerador: x² − x − 2 = (x − 2)(x + 1). Entonces f(x) = " + fr("(x − 2)(x + 1)", "(x − 2)(x + 2)") + ".",
       "<b>En x = 2</b>: se simplifica el factor x − 2 y lím<sub>x→2</sub> f = " + fr("2 + 1", "2 + 2") + " = 3/4, finito. No existe f(2): discontinuidad <b>evitable</b> (se arreglaría definiendo f(2) = 3/4).",
       "<b>En x = −2</b>: el numerador vale (−2)² − (−2) − 2 = 4 ≠ 0 y el denominador tiende a 0. Signo del denominador: para x ligeramente menor que −2, x² &gt; 4 ⟹ positivo ⟹ lím<sub>x→−2⁻</sub> f = +∞; para x ligeramente mayor, x² &lt; 4 ⟹ negativo ⟹ lím<sub>x→−2⁺</sub> f = −∞.",
       "Discontinuidad de <b>salto infinito</b> en x = −2, con asíntota vertical x = −2."]) +
    "<h5>Una cuarta rareza: la discontinuidad esencial</h5>" +
    "<p>Hay límites que no valen ni un número ni ±∞ porque la función <b>oscila</b> sin parar, como sen(1/x) cerca de x = 0. Se llama discontinuidad esencial. Es poco frecuente en los exámenes; los tipos que debes dominar son evitable, salto finito y salto infinito.</p>" +
    w("leerlimites") +
    ojo("«Evitable» no significa que la función sea continua: sigue siendo discontinua en ese punto mientras no se redefina. Y «salto finito» exige que <b>los dos laterales existan y sean números</b>; si uno de ellos es infinito el salto es infinito.");

  // ---------------------------------------------------------------- 4. As. verticales
  secciones[3] =
    "<h5>Dónde buscar las asíntotas verticales</h5>" +
    "<p>Una asíntota vertical x = a solo puede aparecer en un punto «roto» de la función. Los candidatos son: <b>los ceros del denominador</b>, los <b>extremos abiertos del dominio</b> (por ejemplo x = 0 en ln x, o x = 2 en 1/√(x − 2)) y los puntos de cambio de fórmula de una función a trozos. En cada candidato se calculan los <b>límites laterales</b>: si alguno es ±∞, hay asíntota vertical (aunque el otro lado sea finito o no exista).</p>" +
    ejemplo("Laterales y signos",
      "Halla las asíntotas verticales de f(x) = " + fr("x", "x² − 4") + " y estudia el comportamiento de f a cada lado.",
      ["Denominador: x² − 4 = 0 ⟹ x = ±2. El numerador no se anula en ninguno (2 y −2 son distintos de 0) ⟹ en los dos hay asíntota vertical.",
       "<b>x = 2</b>. Por la derecha (x = 2,001): numerador ≈ 2 (positivo), denominador x² − 4 &gt; 0 ⟹ cociente positivo ⟹ lím<sub>x→2⁺</sub> f = +∞. Por la izquierda: x² − 4 &lt; 0 ⟹ lím<sub>x→2⁻</sub> f = −∞.",
       "<b>x = −2</b>. Por la derecha (x = −1,999): numerador negativo, denominador x² − 4 &lt; 0 ⟹ cociente positivo ⟹ lím<sub>x→−2⁺</sub> f = +∞. Por la izquierda (x = −2,001): numerador negativo, denominador positivo ⟹ lím<sub>x→−2⁻</sub> f = −∞."]) +
    "<p>Otros ejemplos clásicos: <b>ln x</b> tiende a −∞ cuando x → 0⁺ (asíntota x = 0); <b>e<sup>1/x</sup></b> vale 0 por la izquierda de 0 y +∞ por la derecha (hay asíntota vertical aunque solo por un lado); <b>tg x</b> tiene infinitas asíntotas verticales, x = π/2 + kπ.</p>" +
    ojo("Si el numerador <b>también</b> se anula en el punto, es un 0/0: puede ser un simple hueco (evitable). Se factoriza y se simplifica antes de decidir. Por ejemplo, (x² − 1)/(x − 1) no tiene asíntota vertical en x = 1.") +
    w("asintotas");

  // ---------------------------------------------------------------- 5. As. horizontales
  secciones[4] =
    "<h5>Cociente de polinomios, con la regla completa</h5>" +
    "<p>Si f = P/Q con grado P = p y grado Q = q, cuando x → ±∞: si <b>p &lt; q</b>, f → 0 (asíntota y = 0); si <b>p = q</b>, f → a<sub>p</sub>/b<sub>q</sub> (cociente de coeficientes principales); si <b>p &gt; q</b>, f → ±∞ y <b>no hay</b> asíntota horizontal (hay oblicua si p = q + 1). El resultado es el mismo en +∞ y en −∞ para una racional.</p>" +
    "<h5>Cuando aparecen raíces o exponenciales: +∞ y −∞ por separado</h5>" +
    "<p>Las funciones con √(x²) o con eˣ pueden tener <b>asíntotas horizontales distintas a cada lado</b>, o una asíntota solo en uno de los lados. Una función tiene como máximo dos asíntotas horizontales (una en +∞ y otra en −∞).</p>" +
    ejemplo("Dos asíntotas horizontales distintas",
      "Halla las asíntotas horizontales de f(x) = " + fr("2x + 1", "√(x² + 3)") + ".",
      ["x → +∞: dividimos numerador y denominador entre x &gt; 0: " + fr("2 + 1/x", "√(1 + 3/x²)") + " ⟶ " + fr("2", "1") + " = 2. Asíntota <b>y = 2</b>.",
       "x → −∞: al meter x dentro de la raíz con x &lt; 0 hay que escribir x = −√(x²). Dividiendo entre x (negativo): el denominador queda " + fr("√(x² + 3)", "x") + " = −√(1 + 3/x²) ⟶ −1.",
       "El límite es " + fr("2", "−1") + " = −2. Asíntota <b>y = −2</b> en −∞.",
       "Comprobación: f(1000) ≈ 2,0010 y f(−1000) ≈ −1,9990."]) +
    ejemplo("Exponencial: una sola horizontal",
      "Halla las asíntotas horizontales de f(x) = " + fr("3eˣ + 1", "eˣ + 2") + ".",
      ["x → +∞: eˣ → +∞. Dividiendo entre eˣ: " + fr("3 + e⁻ˣ", "1 + 2e⁻ˣ") + " ⟶ 3. Asíntota <b>y = 3</b>.",
       "x → −∞: eˣ → 0, y la función tiende a " + fr("0 + 1", "0 + 2") + " = 1/2. Asíntota <b>y = 1/2</b>.",
       "Aquí hay dos horizontales, una en cada lado."]) +
    ojo("Si hay asíntota horizontal por un lado (por ejemplo, en +∞), <b>no puede haber oblicua por ese mismo lado</b>. Cada lado (+∞ y −∞) admite una sola asíntota que no sea vertical.") +
    w("infinito");

  // ---------------------------------------------------------------- 6. As. oblicuas
  secciones[5] =
    "<h5>Cociente de polinomios: la división manda</h5>" +
    "<p>Si grado P = grado Q + 1, se divide P entre Q: P/Q = (mx + n) + R/Q, donde R/Q → 0. La asíntota oblicua es <b>y = mx + n</b> (el cociente de la división), sin necesidad de calcular ningún límite. Los límites de la definición sirven para cualquier otra función.</p>" +
    ejemplo("Oblicua por división",
      "Halla la asíntota oblicua de f(x) = " + fr("2x² + 3x − 1", "x − 1") + ".",
      ["Grado 2 = 1 + 1: puede haber oblicua. Dividimos (Ruffini con 1): coeficientes 2, 3, −1 ⟶ 2, 5, 4. Cociente 2x + 5, resto 4.",
       "f(x) = 2x + 5 + " + fr("4", "x − 1") + ", y 4/(x − 1) → 0 en ±∞. Asíntota <b>y = 2x + 5</b>.",
       "Comprobación con la definición: m = lím f/x = lím " + fr("2x² + 3x − 1", "x² − x") + " = 2; n = lím (f − 2x) = lím " + fr("5x − 1", "x − 1") + " = 5 ✓.",
       "Además, hay asíntota vertical en x = 1 (el numerador vale 4 ≠ 0 en x = 1)."]) +
    ejemplo("Oblicua con una raíz: dos rectas distintas",
      "Halla las asíntotas oblicuas de f(x) = √(x² + x).",
      ["<b>x → +∞.</b> m = lím f/x = lím √(1 + 1/x) = 1. n = lím (√(x² + x) − x): conjugado ⟹ " + fr("x", "√(x² + x) + x") + " ⟶ 1/2. Asíntota <b>y = x + 1/2</b>.",
       "<b>x → −∞.</b> m = lím √(x² + x)/x. Con x &lt; 0, √(x²+x)/x = −√(1 + 1/x) ⟶ <b>−1</b>. n = lím (√(x² + x) + x): conjugado ⟹ " + fr("x", "√(x² + x) − x") + " con denominador ≈ −x − x = −2x ⟶ −1/2. Asíntota <b>y = −x − 1/2</b>.",
       "Cada lado (+∞ y −∞) tiene su propia recta: hay que calcular los dos."]) +
    ojo("<b>Orden en el que conviene estudiar una función</b>: primero el dominio; segundo las asíntotas verticales (en los puntos fuera del dominio); tercero el límite en +∞ y en −∞: si sale un número, es horizontal; si sale ±∞, se prueba la oblicua con m = lím f/x. Si m es 0 o ±∞, no hay oblicua.");

  B.parte.m2t7a = { secciones: secciones };
})(window);
