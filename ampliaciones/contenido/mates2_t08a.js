/* ============================================================
   Matemáticas II · ampliaciones · Tema 8: Derivadas
   (parte A: se añade al final de las cinco secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t8/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Definición
  secciones[0] =
    "<h5>Las dos formas de la definición</h5>" +
    "<p>La derivada de f en el punto a se puede escribir de dos maneras equivalentes. Si llamas h a lo que te alejas de a, o x al punto que se acerca a a:</p>" +
    "<div class='formula-wrap'><div class='formula'>f′(a) = lim<sub>h→0</sub> [f(a + h) − f(a)] / h &nbsp;&nbsp;=&nbsp;&nbsp; lim<sub>x→a</sub> [f(x) − f(a)] / (x − a)</div></div>" +
    "<p>El numerador es lo que sube (o baja) la función y el denominador lo que avanzas en x: el cociente es la <b>pendiente de la recta secante</b> que une los puntos (a, f(a)) y (a + h, f(a + h)). Al hacer h → 0 el segundo punto se acerca al primero y la secante gira hasta convertirse en la <b>tangente</b>; su pendiente es f′(a). Si el límite no existe o es infinito, la función no es derivable en a. Mira cómo la secante se acerca a la tangente al acercar B hacia A:</p>" +
    w("secante") +
    "<h5>Calcular una derivada con la definición</h5>" +
    "<p>Te lo piden con frecuencia («calcula por la definición…»). El truco siempre es el mismo: sustituir, <b>simplificar la h del denominador</b> y solo entonces hacer h → 0 (al sustituir antes tendrías 0/0).</p>" +
    ejemplo("Un polinomio", "Calcula por la definición f′(3) para f(x) = x².",
      ["[f(3 + h) − f(3)]/h = [(3 + h)² − 9]/h = (9 + 6h + h² − 9)/h = (6h + h²)/h = 6 + h.",
       "lim<sub>h→0</sub> (6 + h) = <b>6</b>. Coincide con 2x en x = 3 ✓."]) +
    ejemplo("Una raíz: se racionaliza", "Calcula por la definición f′(4) para f(x) = √x.",
      ["[√(4 + h) − 2]/h es 0/0. Multiplica y divide por el conjugado √(4 + h) + 2.",
       "Numerador: (4 + h) − 4 = h. Queda h / [h·(√(4 + h) + 2)] = 1 / (√(4 + h) + 2).",
       "lim<sub>h→0</sub> = 1/(2 + 2) = <b>1/4</b>. Coincide con 1/(2√x) en x = 4 ✓."]) +
    ejemplo("Un cociente: se reducen fracciones", "Calcula por la definición f′(2) para f(x) = 1/x.",
      ["[1/(2 + h) − 1/2]/h = [(2 − (2 + h)) / (2(2 + h))]/h = [−h / (2(2 + h))]/h = −1 / (2(2 + h)).",
       "lim<sub>h→0</sub> = −1/4. Coincide con −1/x² en x = 2 ✓."]) +
    "<h5>Reconocer una derivada escondida en un límite</h5>" +
    "<p>Un truco que cae en la EvAU: ciertos límites <i>son</i> una derivada y se resuelven sin hacer cuentas, solo reconociendo la definición.</p>" +
    ejemplo("Límites que son derivadas", "Calcula (a) lim<sub>x→1</sub> (x⁵ − 1)/(x − 1) y (b) lim<sub>h→0</sub> [sen(π/3 + h) − sen(π/3)]/h.",
      ["(a) Es [f(x) − f(1)]/(x − 1) con f(x) = x⁵ (f(1) = 1). Vale f′(1) = 5·1⁴ = <b>5</b>.",
       "(b) Es [f(a + h) − f(a)]/h con f = sen y a = π/3. Vale f′(π/3) = cos(π/3) = <b>1/2</b>."]) +
    "<h5>Tangente y normal: lo que significa f′(a)</h5>" +
    "<p>f′(a) es la <b>pendiente de la recta tangente</b> a la gráfica en el punto (a, f(a)). Con la ecuación punto–pendiente salen las dos rectas que más se piden:</p>" +
    "<div class='formula-wrap'><div class='formula'>Tangente: y − f(a) = f′(a)·(x − a) &nbsp;&nbsp;·&nbsp;&nbsp; Normal: y − f(a) = −[1/f′(a)]·(x − a)</div></div>" +
    "<p>La normal es la perpendicular a la tangente por el mismo punto (pendientes opuestas e inversas, m·m′ = −1). Si f′(a) = 0, la tangente es horizontal y la normal es la recta vertical x = a. Arrastra el punto y mira cómo cambia la pendiente:</p>" +
    w("tangente") +
    ejemplo("Tangente y normal en un punto", "Halla la tangente y la normal a f(x) = x² − 3x + 1 en x = 2.",
      ["f(2) = 4 − 6 + 1 = −1. f′(x) = 2x − 3 ⟹ f′(2) = 1.",
       "Tangente: y + 1 = 1·(x − 2) ⟹ <b>y = x − 3</b>.",
       "Normal: pendiente −1/1 = −1 ⟹ y + 1 = −(x − 2) ⟹ <b>y = −x + 1</b>."]) +
    ojo("f′(a) es un <b>límite</b>, no un cociente de derivadas ni «la derivada del cociente». Y al escribir la recta tangente, no sustituyas x = a en f′(x) por todas partes: la x que queda en (x − a) es la variable de la recta.");

  // ---------------------------------------------------------------- 2. Reglas de suma, producto y cociente
  secciones[1] =
    "<h5>Más casos que conviene tener claros</h5>" +
    "<ul>" +
    "<li><b>Constante por función</b>: (k·u)′ = k·u′ (la constante sale fuera; no se deriva a 0).</li>" +
    "<li><b>Inversa de una función</b>: (1/v)′ = −v′/v² (es el cociente con u = 1, u′ = 0).</li>" +
    "<li><b>Producto de tres factores</b>: (u·v·w)′ = u′vw + uv′w + uvw′ (cada vez uno se deriva y los otros dos se copian).</li>" +
    "<li><b>Cuidado con el producto</b>: (u·v)′ ≠ u′·v′. Es un error clásico: (x·eˣ)′ = (1 + x)eˣ, no 1·eˣ.</li>" +
    "</ul>" +
    ejemplo("Cociente y simplificación", "Deriva f(x) = (x² + 1)/(x − 3).",
      ["u = x² + 1, u′ = 2x; v = x − 3, v′ = 1.",
       "f′ = [2x(x − 3) − (x² + 1)·1]/(x − 3)² = (2x² − 6x − x² − 1)/(x − 3)² = <b>(x² − 6x − 1)/(x − 3)²</b>."]) +
    ejemplo("Producto de tres factores", "Deriva f(x) = x·eˣ·sen x.",
      ["f′ = 1·eˣ·sen x + x·eˣ·sen x + x·eˣ·cos x.",
       "Sacando factor común: <b>f′(x) = eˣ(sen x + x sen x + x cos x)</b>."]) +
    ejemplo("Cociente con logaritmo", "Deriva f(x) = x²/ln x.",
      ["u = x², u′ = 2x; v = ln x, v′ = 1/x.",
       "f′ = [2x·ln x − x²·(1/x)]/(ln x)² = (2x ln x − x)/(ln x)² = <b>x(2 ln x − 1)/(ln x)²</b>."]) +
    ejemplo("La derivada de tan x sale de la del cociente", "Comprueba que (tan x)′ = 1 + tan² x.",
      ["tan x = sen x / cos x. u = sen x, v = cos x.",
       "f′ = [cos x·cos x − sen x·(−sen x)]/cos² x = (cos² x + sen² x)/cos² x = 1/cos² x.",
       "Y 1/cos² x = (cos² x + sen² x)/cos² x = 1 + tan² x ✓. Las dos formas (<b>1/cos² x</b> y <b>1 + tan² x</b>) valen."]);

  // ---------------------------------------------------------------- 3. Tabla de derivadas
  secciones[2] =
    "<h5>La tabla completa, ya con la regla de la cadena incluida</h5>" +
    "<p>La tabla original da las derivadas de x. En la práctica casi nunca derivas «x», sino una función u(x) metida dentro. Por eso conviene aprender cada fila en su <b>forma compuesta</b> (la que lleva u′ detrás):</p>" +
    tabla(["Función", "Derivada", "Compuesta (con u = u(x))"], [
      ["k (constante)", "0", "0"],
      ["xⁿ", "n·xⁿ⁻¹", "(uⁿ)′ = n·uⁿ⁻¹·u′"],
      ["√x", "1/(2√x)", "(√u)′ = u′/(2√u)"],
      ["1/x", "−1/x²", "(1/u)′ = −u′/u²"],
      ["eˣ", "eˣ", "(eᵘ)′ = u′·eᵘ"],
      ["aˣ", "aˣ·ln a", "(aᵘ)′ = u′·aᵘ·ln a"],
      ["ln x", "1/x", "(ln u)′ = u′/u"],
      ["sen x", "cos x", "(sen u)′ = u′·cos u"],
      ["cos x", "−sen x", "(cos u)′ = −u′·sen u"],
      ["tan x", "1 + tan² x = 1/cos² x", "(tan u)′ = u′(1 + tan² u)"],
      ["arcsen x", "1/√(1 − x²)", "(arcsen u)′ = u′/√(1 − u²)"],
      ["arccos x", "−1/√(1 − x²)", "(arccos u)′ = −u′/√(1 − u²)"],
      ["arctan x", "1/(1 + x²)", "(arctan u)′ = u′/(1 + u²)"]
    ]) +
    "<p>Fíjate en dos regularidades que ayudan a memorizar: las derivadas de las <b>«co-»</b> (cos, arccos) llevan un signo menos, y las tres funciones inversas (arcsen, arccos, arctan) tienen derivadas <b>algebraicas</b> (sin trigonometría).</p>" +
    ejemplo("Derivadas de arcos", "Deriva (a) f(x) = arctan(x²) y (b) g(x) = arcsen(2x).",
      ["(a) u = x², u′ = 2x: f′(x) = 2x/(1 + (x²)²) = <b>2x/(1 + x⁴)</b>.",
       "(b) u = 2x, u′ = 2: g′(x) = 2/√(1 − 4x²) (definida para |x| &lt; 1/2)."]) +
    ejemplo("Una derivada que se simplifica sola", "Deriva f(x) = arctan((1 + x)/(1 − x)).",
      ["u = (1 + x)/(1 − x); u′ = [(1 − x) + (1 + x)]/(1 − x)² = 2/(1 − x)².",
       "1 + u² = [(1 − x)² + (1 + x)²]/(1 − x)² = (2 + 2x²)/(1 − x)².",
       "f′ = u′/(1 + u²) = [2/(1 − x)²]·[(1 − x)²/(2 + 2x²)] = <b>1/(1 + x²)</b>. (Es la derivada de arctan x: las dos funciones difieren en una constante.)"]);

  // ---------------------------------------------------------------- 4. Regla de la cadena
  secciones[3] =
    "<h5>Cómo derivar una compuesta larga sin perderse</h5>" +
    "<p>Cuando hay varias funciones anidadas, trabaja <b>de fuera hacia dentro</b>: (1) identifica la función más exterior; (2) derívala dejando su interior intacto; (3) multiplica por la derivada del interior, que a su vez puede necesitar otra cadena. Dibuja mentalmente las «capas» como las de una cebolla: cada capa aporta un factor.</p>" +
    ejemplo("Tres capas", "Deriva f(x) = [sen(2x + 1)]³.",
      ["Capas: elevar al cubo → seno → 2x + 1.",
       "f′ = 3·[sen(2x + 1)]²·cos(2x + 1)·2 = <b>6·sen²(2x + 1)·cos(2x + 1)</b>."]) +
    ejemplo("Exponencial de un seno de un cuadrado", "Deriva f(x) = e<sup>sen(x²)</sup>.",
      ["Capas: exponencial → seno → x².",
       "f′ = e<sup>sen(x²)</sup>·cos(x²)·2x = <b>2x·cos(x²)·e<sup>sen(x²)</sup></b>."]) +
    ejemplo("Arco tangente de una raíz", "Deriva f(x) = arctan(√x).",
      ["u = √x, u′ = 1/(2√x). f′ = u′/(1 + u²) = [1/(2√x)]/(1 + x).",
       "<b>f′(x) = 1/(2√x·(1 + x))</b>, para x &gt; 0."]) +
    "<h5>Truco: simplificar antes de derivar</h5>" +
    "<p>Con logaritmos conviene aplicar primero sus propiedades (ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b, ln aⁿ = n ln a): derivas sumas de términos sencillos en lugar de una cadena enorme.</p>" +
    ejemplo("Logaritmo de un cociente", "Deriva f(x) = ln[(x + 1)/(x − 1)].",
      ["Sin simplificar saldría una cadena con cociente dentro. Mejor: f(x) = ln(x + 1) − ln(x − 1).",
       "f′ = 1/(x + 1) − 1/(x − 1) = [(x − 1) − (x + 1)]/(x² − 1) = <b>−2/(x² − 1)</b>."]) +
    ejemplo("Logaritmo de una raíz", "Deriva f(x) = ln √(x² + 1).",
      ["f(x) = ½·ln(x² + 1). f′ = ½·2x/(x² + 1) = <b>x/(x² + 1)</b>."]) +
    "<p>Practica con el derivador paso a paso: te pide la derivada de funciones compuestas y te explica cada capa.</p>" +
    w("derivador") +
    ojo("El error más frecuente en la EvAU es <b>olvidar el factor de dentro</b>: derivar sen(3x) como cos(3x) en lugar de 3cos(3x), o e^(x²) como e^(x²) sin el 2x. Antes de cerrar un ejercicio, pregúntate: ¿hay algo distinto de «x» dentro de cada función? Si sí, falta una u′.");

  // ---------------------------------------------------------------- 5. Derivadas de orden superior
  secciones[4] =
    "<h5>Derivadas sucesivas: patrones que se repiten</h5>" +
    "<p>Derivar varias veces suele hacerse con paciencia, pero a veces piden una <b>fórmula general</b> de la derivada n-ésima f<sup>(n)</sup>: se calculan las primeras, se detecta el patrón y se enuncia (la demostración rigurosa sería por inducción).</p>" +
    tabla(["f(x)", "f′", "f″", "f‴", "Patrón"], [
      ["e<sup>2x</sup>", "2e<sup>2x</sup>", "4e<sup>2x</sup>", "8e<sup>2x</sup>", "f<sup>(n)</sup> = 2ⁿ·e<sup>2x</sup>"],
      ["ln x", "1/x", "−1/x²", "2/x³", "f<sup>(n)</sup> = (−1)ⁿ⁻¹(n − 1)!/xⁿ"],
      ["sen x", "cos x", "−sen x", "−cos x", "se repite cada 4 derivadas"],
      ["x·eˣ", "(x + 1)eˣ", "(x + 2)eˣ", "(x + 3)eˣ", "f<sup>(n)</sup> = (x + n)·eˣ"],
      ["1/(1 − x)", "1/(1 − x)²", "2/(1 − x)³", "6/(1 − x)⁴", "f<sup>(n)</sup> = n!/(1 − x)ⁿ⁺¹"]
    ]) +
    ejemplo("Una derivada de orden alto", "Calcula la derivada décima de f(x) = x·eˣ en x = 0.",
      ["Patrón: f<sup>(n)</sup>(x) = (x + n)eˣ (cada derivada suma 1 al paréntesis porque (eˣ)′ = eˣ).",
       "f<sup>(10)</sup>(0) = (0 + 10)·e⁰ = <b>10</b>."]) +
    ejemplo("Derivadas segundas con producto", "Calcula f′ y f″ para f(x) = x·e<sup>−x</sup>.",
      ["f′ = e<sup>−x</sup> + x·(−e<sup>−x</sup>) = (1 − x)e<sup>−x</sup>.",
       "f″ = −e<sup>−x</sup> + (1 − x)(−e<sup>−x</sup>) = (−1 − 1 + x)e<sup>−x</sup> = <b>(x − 2)e<sup>−x</sup></b>."]) +
    "<p>Observa las tres gráficas a la vez: donde f′ es cero, f tiene tangente horizontal; donde f″ es positiva, f curva hacia arriba. Es la base de los Temas 9 y 10.</p>" +
    w("tresgraficas");

  B.parte.m2t8a = { secciones: secciones };
})(window);
