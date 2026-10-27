/* ============================================================
   Matemáticas I · ampliaciones
   Tema 11: Derivadas y aplicaciones
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos, bloques de la lámina
   y un simulacro nuevo.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  // ---------- ayudantes de maquetación (compartidos en nucleo.js) ----------
  var H = B.h, fr = H.fr, raiz = H.raiz, formula = H.formula, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(nombre, ref) { return H.w(nombre, ref && "mates1/t11/" + ref); }

  // ============================================================
  // TEORÍA: se añade al final de cada sección existente (índice 0 = sección 1)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Velocidad media y ritmo medio de cambio</h5>" +
    "<p>Si f(t) es la posición de un coche (en metros) en el instante t (en segundos), la TVM entre t₁ y t₂ es justo su <b>velocidad media</b>: metros recorridos entre segundos transcurridos. Con cualquier otra magnitud (temperatura, beneficios, población…) la TVM es su <b>ritmo medio de cambio</b>: cuánto sube o baja de media por cada unidad de x. Por eso la TVM siempre lleva unidades: las de f entre las de x.</p>" +
    ejemplo("Ejemplo resuelto", "La posición de un coche que arranca es s(t) = 5t² (s en metros, t en segundos). ¿Cuál es su velocidad media entre t = 2 s y t = 4 s?", [
      "s(2) = 5·2² = 20 m   y   s(4) = 5·4² = 80 m",
      "TVM[2,4] = " + fr("s(4) − s(2)", "4 − 2") + " = " + fr("80 − 20", "2") + " = " + fr("60", "2") + " = 30",
      "Unidades: metros entre segundos → <b>30 m/s</b>. Es la pendiente de la secante que une (2, 20) y (4, 80)."
    ]) +
    ojo("La TVM puede ser negativa (la función baja de media) o cero. Que TVM[a,b] = 0 <em>no</em> significa que f sea constante entre a y b: solo que f(a) = f(b). Una pelota lanzada hacia arriba vuelve a la altura de partida con velocidad media cero, y sin embargo se ha movido.") +
    w("secante");

  secciones[1] =
    "<p>Antes de ponerle fórmula, <b>míralo</b>. Desplázate por los pasos de esta clase: la gráfica de la izquierda cambia a medida que lees.</p>" +
    w("clase", "clase1") +
    "<h5>La definición con «h»: la forma que usarás en los ejercicios</h5>" +
    "<p>Si llamas h a la distancia entre los dos puntos (b = a + h), decir «b tiende a a» es lo mismo que decir «h tiende a 0». La definición queda así, y es la que se pide cuando un ejercicio dice «calcula <em>por la definición</em>»:</p>" +
    formula("f'(a) = lim<sub>h→0</sub> " + fr("f(a + h) − f(a)", "h")) +
    "<p>Siempre sale una indeterminación 0/0 (numerador y denominador tienden a 0). El truco, igual que en el Tema 10, es <b>simplificar h antes de hacer el límite</b>.</p>" +
    ejemplo("Ejemplo resuelto 1", "Calcula por la definición la derivada de f(x) = x² en a = 3.", [
      "f(3 + h) − f(3) = (3 + h)² − 9 = 9 + 6h + h² − 9 = 6h + h²",
      "Dividimos entre h y simplificamos: " + fr("6h + h²", "h") + " = 6 + h",
      "lim<sub>h→0</sub> (6 + h) = 6   →   <b>f'(3) = 6</b>",
      "Comprobación con la regla de la potencia: (x²)' = 2x, y 2·3 = 6 ✓"
    ]) +
    ejemplo("Ejemplo resuelto 2", "Calcula por la definición la derivada de f(x) = 1/x en a = 2.", [
      "f(2 + h) − f(2) = " + fr("1", "2 + h") + " − " + fr("1", "2") + " = " + fr("2 − (2 + h)", "2(2 + h)") + " = " + fr("−h", "2(2 + h)"),
      "Dividimos entre h: " + fr("−1", "2(2 + h)"),
      "lim<sub>h→0</sub> " + fr("−1", "2(2 + h)") + " = " + fr("−1", "4") + "   →   <b>f'(2) = −1/4</b>",
      "Comprobación: (x⁻¹)' = −x⁻², y −1/2² = −1/4 ✓"
    ]) +
    "<h5>La derivada como velocidad instantánea</h5>" +
    "<p>Lo que acabas de ver con las secantes es exactamente lo que hace el velocímetro de un coche: no mide la velocidad media de todo el viaje, sino la TVM calculada en un intervalo de tiempo diminuto. Por eso f'(a) se llama <b>razón de cambio instantánea</b> de f en a, y se mide con las mismas unidades que la TVM (por ejemplo, m/s).</p>" +
    "<h5>¿Siempre existe la derivada?</h5>" +
    "<p>No. Para que exista f'(a), la pendiente de las secantes tiene que acercarse al <em>mismo</em> valor tanto si B se acerca a A por la derecha (h &gt; 0) como por la izquierda (h &lt; 0). Esos dos límites se llaman <b>derivadas laterales</b>. El ejemplo clásico es f(x) = |x| en x = 0: por la derecha la pendiente es 1 y por la izquierda −1, así que hay un «pico» y no hay tangente. Dos ideas que conviene tener claras:</p>" +
    "<ul><li><b>Derivable ⇒ continua</b>: si hay tangente, no puede haber un salto.</li><li><b>Continua no implica derivable</b>: |x| es continua en 0 y no es derivable.</li></ul>";

  secciones[2] =
    w("tangente") +
    "<p>Fíjate en lo que has visto: el <b>signo</b> de la pendiente te dice si la función sube o baja en ese punto, y su <b>valor</b> te dice lo deprisa que lo hace. Una pendiente grande (positiva o negativa) es una gráfica muy empinada; una pendiente cercana a 0, una gráfica casi plana.</p>" +
    "<h5>La recta normal</h5>" +
    "<p>La <b>recta normal</b> a la gráfica en x = a es la perpendicular a la tangente por el mismo punto. Dos rectas perpendiculares tienen pendientes que cumplen m₁·m₂ = −1 (Tema 8), así que si la tangente tiene pendiente f'(a), la normal tiene pendiente −1/f'(a):</p>" +
    formula("y − f(a) = " + fr("−1", "f'(a)") + " · (x − a)") +
    ejemplo("Ejemplo resuelto", "Halla la tangente y la normal a f(x) = x² en el punto de abscisa x = 1.", [
      "f(1) = 1, así que el punto es (1, 1). Además f'(x) = 2x, luego f'(1) = 2",
      "Tangente: y − 1 = 2(x − 1) → <b>y = 2x − 1</b>",
      "Normal: pendiente −1/2. y − 1 = −½(x − 1) → <b>y = −½x + 3/2</b>"
    ]) +
    "<p>Si f'(a) = 0 la tangente es horizontal (y = f(a)) y la normal es la recta vertical x = a, que no tiene pendiente.</p>";

  secciones[3] =
    "<h5>Truco: la última operación manda</h5>" +
    "<p>Para decidir qué regla usar, imagina que calculas f(x) con la calculadora y mira cuál es la <b>última</b> operación que haces:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>x³ + sen x</td><td>Suma</td><td>Derivas cada sumando por separado</td></tr>" +
    "<tr><td>5x²</td><td>Número · función</td><td>El número sale fuera: 5·(x²)'</td></tr>" +
    "<tr><td>x²·eˣ</td><td>Producto</td><td>f'g + fg'</td></tr>" +
    "<tr><td>(x+1)/(x−2)</td><td>Cociente</td><td>(f'g − fg')/g²</td></tr>" +
    "<tr><td>sen(3x)</td><td>Función dentro de otra</td><td>Regla de la cadena (siguiente apartado)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Regla del producto", "Deriva f(x) = (x² + 1)(3x − 2).", [
      "Última operación: producto de u = x² + 1 y v = 3x − 2. Sus derivadas: u' = 2x, v' = 3",
      "f'(x) = u'v + uv' = 2x(3x − 2) + (x² + 1)·3",
      "= 6x² − 4x + 3x² + 3 = <b>9x² − 4x + 3</b>",
      "Comprobación: multiplicando antes, f(x) = 3x³ − 2x² + 3x − 2, y derivando sale 9x² − 4x + 3 ✓"
    ]) +
    ejemplo("Regla del cociente", "Deriva f(x) = " + fr("x² + 1", "x − 1") + ".", [
      "u = x² + 1 → u' = 2x   ·   v = x − 1 → v' = 1",
      "f'(x) = " + fr("u'v − uv'", "v²") + " = " + fr("2x(x − 1) − (x² + 1)·1", "(x − 1)²"),
      "Numerador: 2x² − 2x − x² − 1 = x² − 2x − 1",
      "<b>f'(x) = " + fr("x² − 2x − 1", "(x − 1)²") + "</b>"
    ]) +
    ejemplo("Raíces y fracciones: reescribe como potencia", "Deriva f(x) = " + fr("5", "x³") + " + 4√x.", [
      "Reescribe: f(x) = 5x⁻³ + 4x<sup>1/2</sup>",
      "Deriva: 5·(−3)x⁻⁴ + 4·½·x<sup>−1/2</sup> = −15x⁻⁴ + 2x<sup>−1/2</sup>",
      "Vuelve a la forma de partida: <b>f'(x) = " + fr("−15", "x⁴") + " + " + fr("2", "√x") + "</b>"
    ]) +
    ojo("antes de usar la regla del cociente, ¿se puede simplificar? Por ejemplo f(x) = (x⁴ − 3x²)/x² = x² − 3 (para x ≠ 0), y su derivada es simplemente 2x. Es más rápido y se falla menos.");

  secciones[4] =
    "<h5>Todas las derivadas, ya con la cadena incluida</h5>" +
    "<p>Si en vez de x tienes una función u(x), la derivada es la de siempre <b>multiplicada por u'</b>. Esta es la tabla que usarás en los exámenes:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>(uⁿ)'</td><td>n·uⁿ⁻¹·u'</td></tr>" +
    "<tr><td>(eᵘ)'</td><td>eᵘ·u'</td></tr>" +
    "<tr><td>(ln u)'</td><td>" + fr("u'", "u") + "</td></tr>" +
    "<tr><td>(sen u)'</td><td>cos u · u'</td></tr>" +
    "<tr><td>(cos u)'</td><td>−sen u · u'</td></tr>" +
    "<tr><td>(tg u)'</td><td>" + fr("u'", "cos² u") + " = (1 + tg² u)·u'</td></tr>" +
    "<tr><td>(√u)'</td><td>" + fr("u'", "2√u") + "</td></tr>" +
    "<tr><td>(aᵘ)'</td><td>aᵘ·ln a·u'</td></tr>" +
    "</tbody></table>" +
    "<h5>Derivar «de fuera hacia dentro»</h5>" +
    "<p>Imagina la función como una cebolla, con capas una dentro de otra. Derivas la capa exterior dejando lo de dentro tal cual, y multiplicas por la derivada de la capa siguiente, hasta llegar a x.</p>" +
    ejemplo("Ejemplo 1: sen de algo", "Deriva f(x) = sen(3x²).", [
      "Capa de fuera: sen( ) → cos( ), dejando 3x² dentro: cos(3x²)",
      "Capa de dentro: 3x² → 6x",
      "<b>f'(x) = 6x·cos(3x²)</b>"
    ]) +
    ejemplo("Ejemplo 2: exponencial", "Deriva f(x) = e<sup>x² − x</sup>.", [
      "Fuera: e<sup>u</sup> → e<sup>u</sup>, igual que antes: e<sup>x² − x</sup>",
      "Dentro: u = x² − x → u' = 2x − 1",
      "<b>f'(x) = (2x − 1)·e<sup>x² − x</sup></b>"
    ]) +
    ejemplo("Ejemplo 3: logaritmo y raíz", "Deriva f(x) = ln(x² + 1) y g(x) = " + raiz("3x + 1") + ".", [
      "(ln u)' = u'/u con u = x² + 1 → <b>f'(x) = " + fr("2x", "x² + 1") + "</b>",
      "(√u)' = u'/(2√u) con u = 3x + 1 → <b>g'(x) = " + fr("3", "2" + raiz("3x + 1")) + "</b>"
    ]) +
    ejemplo("Ejemplo 4: cadena dentro de un producto", "Deriva f(x) = x·e⁻ˣ.", [
      "Última operación: producto de u = x y v = e⁻ˣ. Ya sabemos u' = 1",
      "v' = e⁻ˣ·(−1) = −e⁻ˣ (cadena: dentro es −x, cuya derivada es −1)",
      "f'(x) = u'v + uv' = 1·e⁻ˣ + x·(−e⁻ˣ) = <b>(1 − x)·e⁻ˣ</b>"
    ]) +
    w("derivador");

  secciones[5] =
    ejemplo("Tangente en un punto", "Halla la recta tangente a f(x) = x³ − 2x en x = 1.", [
      "f(1) = 1 − 2 = −1 → punto de tangencia (1, −1)",
      "f'(x) = 3x² − 2 → f'(1) = 3 − 2 = 1 → pendiente m = 1",
      "y − (−1) = 1·(x − 1) → y + 1 = x − 1 → <b>y = x − 2</b>"
    ]) +
    ejemplo("Tangente con una condición", "¿En qué punto de f(x) = x² − 4x la tangente es paralela a la recta y = 2x + 1? Escribe esa tangente.", [
      "Rectas paralelas tienen la misma pendiente: buscamos los x con f'(x) = 2",
      "f'(x) = 2x − 4 = 2 → x = 3",
      "f(3) = 9 − 12 = −3 → punto de tangencia (3, −3)",
      "y + 3 = 2(x − 3) → <b>y = 2x − 9</b>"
    ]) +
    ojo("la tangente se escribe con el <em>punto</em> (a, f(a)) y la <em>pendiente</em> f'(a). Dos errores muy habituales: usar f(a) como pendiente, y usar a (en lugar de f(a)) como coordenada y del punto.");

  secciones[6] =
    "<h5>El método en 5 pasos</h5>" +
    "<ol><li>Halla el <b>dominio</b> de f.</li><li>Calcula <b>f'(x)</b>.</li><li>Resuelve <b>f'(x) = 0</b> (y mira dónde f' no existe): son los <b>puntos críticos</b>.</li><li><b>Tabla de signos</b>: elige un valor de prueba en cada intervalo entre puntos críticos y mira el signo de f'.</li><li><b>Conclusión</b>: crece donde f' &gt; 0 y decrece donde f' &lt; 0. Hay máximo si f' pasa de + a −, y mínimo si pasa de − a +. Calcula también la coordenada y.</li></ol>" +
    ejemplo("Ejemplo completo", "Estudia el crecimiento y los extremos de f(x) = x³ − 3x.", [
      "Dominio: todo ℝ (es un polinomio).",
      "f'(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1)",
      "f'(x) = 0 → x = −1 y x = 1 (puntos críticos)",
      "Valores de prueba: f'(−2) = 9 &gt; 0 · f'(0) = −3 &lt; 0 · f'(2) = 9 &gt; 0",
      "Creciente en (−∞, −1) ∪ (1, +∞) y decreciente en (−1, 1)",
      "En x = −1 pasa de + a −: <b>máximo</b> en (−1, 2), porque f(−1) = −1 + 3 = 2. En x = 1 pasa de − a +: <b>mínimo</b> en (1, −2)."
    ]) +
    ojo("f'(a) = 0 <em>no</em> garantiza un extremo. Mira f(x) = x³: f'(x) = 3x² vale 0 en x = 0, pero es positiva a los dos lados, así que f sigue creciendo y no hay ni máximo ni mínimo. Por eso hay que mirar siempre el <b>cambio de signo</b> (compruébalo abajo con x³).") +
    w("fprima");

  // ============================================================
  // AMPLIACIÓN DE LAS SECCIONES EXISTENTES (se añade al final de cada una)
  // ============================================================
  secciones[0] +=
    "<h5>La TVM con tablas de datos</h5>" +
    "<p>Muchas veces no hay fórmula, sólo una tabla de mediciones. La TVM se calcula igual, con dos filas de la tabla, y sigue siendo «cuánto cambia la magnitud por cada unidad de x».</p>" +
    ejemplo("Temperaturas de un día", "Un termómetro marcó 8 °C a las 6 h, 18 °C a las 12 h, 21 °C a las 15 h y 11 °C a las 21 h. Calcula la TVM en [6, 12], en [12, 15] y en [15, 21] e interprétalas.", [
      "TVM[6, 12] = (18 − 8)/(12 − 6) = 10/6 = <b>1,67 °C/h</b>: de media sube 1,67 grados cada hora.",
      "TVM[12, 15] = (21 − 18)/(15 − 12) = 3/3 = <b>1 °C/h</b>: sigue subiendo, pero más despacio.",
      "TVM[15, 21] = (11 − 21)/(21 − 15) = −10/6 = <b>−1,67 °C/h</b>: negativa, porque entre las 15 y las 21 h la temperatura baja."
    ]) +
    "<h5>Dos TVM que conviene saberse</h5>" +
    "<ul><li><b>En una función afín</b> f(x) = mx + n la TVM vale m en <i>cualquier</i> intervalo: por eso su gráfica es una recta y su ritmo de cambio es constante.</li>" +
    "<li><b>En f(x) = x²</b>: TVM[a, b] = (b² − a²)/(b − a) = (b − a)(b + a)/(b − a) = <b>a + b</b>. La pendiente de la secante entre dos puntos de la parábola es la suma de sus abscisas. (Por eso, cuando b se acerca a a, la TVM se acerca a 2a: la derivada de x² es 2x.)</li></ul>" +
    ejemplo("La TVM de x³", "Calcula la TVM de f(x) = x³ en [−1, 2] y explica qué significa.", [
      "f(−1) = −1 y f(2) = 8.",
      "TVM[−1, 2] = (8 − (−1))/(2 − (−1)) = 9/3 = <b>3</b>.",
      "La secante que une (−1, −1) con (2, 8) tiene pendiente 3: de media, f sube 3 unidades por cada unidad que avanza x."
    ]);

  secciones[1] +=
    "<h5>La derivada como función: f′(x)</h5>" +
    "<p>Hasta ahora hemos calculado la derivada en un punto concreto, f′(a). Si en la definición dejamos <i>x</i> libre, obtenemos la <b>función derivada</b> f′(x), que da la pendiente de la tangente en cada punto. Las reglas de derivación que verás después son atajos para obtenerla sin hacer el límite cada vez. Veamos cuatro derivadas «a mano» para comprobar que las reglas dicen la verdad:</p>" +
    ejemplo("(x²)′ = 2x", "Calcula por la definición la derivada de f(x) = x².", [
      "f(x + h) − f(x) = (x + h)² − x² = 2xh + h².",
      "Dividiendo entre h: 2x + h → cuando h → 0: <b>f′(x) = 2x</b>."
    ]) +
    ejemplo("(x³)′ = 3x²", "Calcula por la definición la derivada de f(x) = x³.", [
      "(x + h)³ − x³ = 3x²h + 3xh² + h³ (desarrollo del binomio).",
      "Dividiendo entre h: 3x² + 3xh + h² → 3x² cuando h → 0: <b>f′(x) = 3x²</b>."
    ]) +
    ejemplo("(√x)′ = 1/(2√x)", "Calcula por la definición la derivada de f(x) = √x (para x &gt; 0).", [
      "(√(x + h) − √x)/h: es una indeterminación 0/0 con raíces; se multiplica por el conjugado √(x + h) + √x.",
      "Numerador: (x + h) − x = h. Queda h/(h(√(x + h) + √x)) = 1/(√(x + h) + √x).",
      "Cuando h → 0: 1/(2√x). <b>f′(x) = 1/(2√x)</b>."
    ]) +
    ejemplo("(1/x)′ = −1/x²", "Calcula por la definición la derivada de f(x) = 1/x.", [
      "1/(x + h) − 1/x = (x − (x + h))/(x(x + h)) = −h/(x(x + h)).",
      "Dividiendo entre h: −1/(x(x + h)) → −1/x² cuando h → 0: <b>f′(x) = −1/x²</b>."
    ]) +
    "<h5>Notaciones</h5>" +
    "<p>La derivada de y = f(x) se escribe de varias formas equivalentes: <b>f′(x)</b> (Lagrange), <b>y′</b>, <b>dy/dx</b> o <b>df/dx</b> (Leibniz, que recuerda a «cambio de y entre cambio de x») y <b>D f</b>. La derivada segunda se escribe f″(x) o d²f/dx².</p>" +
    "<h5>Derivadas laterales y cuándo no existe la derivada</h5>" +
    "<p>La derivada en a es un límite, y un límite exige que los dos laterales coincidan. Se definen la <b>derivada por la izquierda</b> f′(a⁻) = lím<sub>h→0⁻</sub> [f(a + h) − f(a)]/h y la <b>derivada por la derecha</b> f′(a⁺) = lím<sub>h→0⁺</sub> [f(a + h) − f(a)]/h. <b>f es derivable en a si y sólo si ambas existen, son finitas e iguales.</b> Hay cuatro maneras típicas de que falle:</p>" +
    tabla(["Situación", "Ejemplo", "Qué se ve", "Derivadas laterales"], [
      ["Punto anguloso", "|x| en x = 0", "pico en forma de V", "−1 y 1 (finitas y distintas)"],
      ["Cúspide", "∛(x²) en x = 0", "pico afilado vertical", "−∞ y +∞"],
      ["Tangente vertical", "∛x en x = 0", "la gráfica sube «de pie»", "+∞ y +∞ (el límite es infinito)"],
      ["Discontinuidad", "salto en x = 0", "la función se rompe", "no existen"]
    ]) +
    "<p><b>Derivable ⇒ continua.</b> Si f′(a) existe, f(a + h) − f(a) = [(f(a + h) − f(a))/h]·h → f′(a)·0 = 0, es decir, f(a + h) → f(a): f es continua en a. El recíproco es falso: |x| es continua en 0 y no es derivable. Y una función <b>no continua</b> jamás puede ser derivable en ese punto: lo primero que se comprueba en un problema de derivabilidad de una función a trozos es la continuidad.</p>";

  secciones[2] +=
    "<h5>El ángulo de la tangente</h5>" +
    "<p>Como f′(a) = tan α, siendo α el ángulo que forma la tangente con el eje X, el ángulo se obtiene con α = arctan f′(a). Si f′(a) = 1, la tangente forma 45° con el eje; si f′(a) = 0, es horizontal; si f′(a) = −1, forma 135° (o −45°).</p>" +
    "<h5>Tangente que pasa por un punto que no está en la curva</h5>" +
    "<p>Si te piden la tangente desde un punto exterior P, el punto de tangencia es una <i>incógnita</i> t: la tangente en (t, f(t)) es y − f(t) = f′(t)(x − t), y se impone que pase por P.</p>" +
    ejemplo("Tangentes desde un punto exterior", "Halla las tangentes a y = x² que pasan por P = (1, −3).", [
      "En un punto (t, t²) la tangente es y − t² = 2t(x − t).",
      "Imponemos que pase por (1, −3): −3 − t² = 2t(1 − t) → −3 − t² = 2t − 2t² → t² − 2t − 3 = 0 → t = 3 o t = −1.",
      "Para t = 3: y − 9 = 6(x − 3) → <b>y = 6x − 9</b>. Para t = −1: y − 1 = −2(x + 1) → <b>y = −2x − 1</b>.",
      "Comprobación: en x = 1, 6·1 − 9 = −3 ✓ y −2·1 − 1 = −3 ✓."
    ]) +
    "<h5>Ángulo entre dos curvas</h5>" +
    "<p>El ángulo entre dos curvas que se cortan es el ángulo entre sus tangentes en el punto de corte, y se calcula con las pendientes: tan θ = |(m₂ − m₁)/(1 + m₁m₂)| (Tema 8).</p>" +
    ejemplo("Ángulo de corte", "Calcula el ángulo con el que se cortan y = x² e y = √x en el punto (1, 1).", [
      "Pendientes en x = 1: para x², m₁ = 2x = 2. Para √x, m₂ = 1/(2√x) = 1/2.",
      "tan θ = |(1/2 − 2)/(1 + 2·1/2)| = |−3/2|/2 = 3/4.",
      "θ = arctan(3/4) = <b>36,87°</b>."
    ]);

  secciones[3] +=
    "<h5>Por qué funcionan las reglas (para quien quiera entender de verdad)</h5>" +
    "<ul>" +
    "<li><b>Suma:</b> el límite de una suma es la suma de los límites, luego (f + g)′ = f′ + g′. Igual con las constantes: (k·f)′ = k·f′.</li>" +
    "<li><b>Potencia:</b> (x + h)ⁿ = xⁿ + n·xⁿ⁻¹h + (términos con h²…). Al restar xⁿ y dividir entre h queda n·xⁿ⁻¹ + (términos con h) → n·xⁿ⁻¹.</li>" +
    "<li><b>Producto:</b> f(x + h)g(x + h) − f(x)g(x) = [f(x + h) − f(x)]·g(x + h) + f(x)·[g(x + h) − g(x)]. Al dividir entre h y tomar límite (g es continua) queda f′g + fg′.</li>" +
    "<li><b>Cociente:</b> sale de aplicar el producto a f·(1/g) y de que (1/g)′ = −g′/g².</li>" +
    "</ul>" +
    "<h5>Derivadas sucesivas</h5>" +
    "<p>Como f′ es otra función, se puede volver a derivar: f″ = (f′)′ es la <b>derivada segunda</b>, f‴ la tercera, etc. Mide cómo cambia la pendiente. En física, si s(t) es la posición, s′ = velocidad y s″ = aceleración. En matemáticas, el signo de f″ dice hacia dónde se curva la gráfica (lo verás en «Concavidad»).</p>" +
    ejemplo("Derivadas sucesivas", "Calcula f′, f″ y f‴ de f(x) = x⁴ − 3x².", [
      "f′(x) = 4x³ − 6x.",
      "f″(x) = 12x² − 6.",
      "f‴(x) = 24x."
    ]) +
    "<h5>Funciones definidas a trozos y valor absoluto</h5>" +
    "<p>Se deriva cada trozo por separado en el interior de su intervalo. En los puntos de unión hay que estudiar las derivadas laterales (siguiente sección). Para el valor absoluto: (|x|)′ = 1 si x &gt; 0 y −1 si x &lt; 0 (en x = 0 no existe); en general (|u|)′ = u′·u/|u| = u′·signo(u).</p>";

  secciones[4] +=
    "<h5>Más derivadas elementales</h5>" +
    "<p>Para completar la tabla de derivadas que pueden pedirte:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>(aˣ)′</td><td>aˣ·ln a</td><td>(logₐ x)′</td><td>1/(x·ln a)</td></tr>" +
    "<tr><td>(arcsen x)′</td><td>1/√(1 − x²)</td><td>(arccos x)′</td><td>−1/√(1 − x²)</td></tr>" +
    "<tr><td>(arctan x)′</td><td>1/(1 + x²)</td><td>(cotg x)′</td><td>−1/sen²x</td></tr>" +
    "</tbody></table>" +
    "<p>Con la cadena, cada una se multiplica por u′: por ejemplo (arctan u)′ = u′/(1 + u²).</p>" +
    "<h5>Cadenas de tres capas</h5>" +
    "<p>Si hay más de dos capas, se derivan <b>de fuera hacia dentro</b> y se multiplican todas las derivadas.</p>" +
    ejemplo("Tres capas: e<sup>sen(x²)</sup>", "Deriva f(x) = e<sup>sen(x²)</sup>.", [
      "Capa 1 (fuera): e<sup>u</sup> → e<sup>u</sup>, con u = sen(x²).",
      "Capa 2: sen(v) → cos(v), con v = x².",
      "Capa 3: x² → 2x.",
      "<b>f′(x) = e<sup>sen(x²)</sup>·cos(x²)·2x</b>."
    ]) +
    ejemplo("Un cuadrado de un seno", "Deriva f(x) = sen²(3x) = [sen(3x)]².", [
      "Fuera: ( )² → 2( ). Dentro: sen(3x) → cos(3x)·3.",
      "f′(x) = 2·sen(3x)·cos(3x)·3 = 6·sen(3x)·cos(3x) = <b>3·sen(6x)</b> (por el seno del ángulo doble)."
    ]) +
    "<h5>Derivación logarítmica: cuando la variable está en la base y en el exponente</h5>" +
    "<p>Para f(x) = g(x)<sup>h(x)</sup> no sirven ni la regla de la potencia (exponente constante) ni la de la exponencial (base constante). Se toman logaritmos: ln f = h·ln g, se deriva en los dos lados (el izquierdo da f′/f) y se despeja:</p>" +
    H.formula("(g<sup>h</sup>)′ = g<sup>h</sup>·( h′·ln g + h·g′/g )") +
    ejemplo("La derivada de xˣ", "Calcula la derivada de f(x) = xˣ (x &gt; 0).", [
      "ln f = x·ln x. Se deriva: f′/f = 1·ln x + x·(1/x) = ln x + 1.",
      "Se despeja: <b>f′(x) = xˣ(ln x + 1)</b>. Por ejemplo, f′(1) = 1·(0 + 1) = 1."
    ]);

  secciones[5] +=
    "<h5>Más preguntas típicas de tangentes</h5>" +
    ejemplo("Tangente paralela a una recta dada", "¿En qué puntos de f(x) = x³ − 3x² la tangente es paralela a y = 9x + 1? Escribe las tangentes.", [
      "Paralela: misma pendiente 9. f′(x) = 3x² − 6x = 9 → x² − 2x − 3 = 0 → x = 3 o x = −1.",
      "x = 3: f(3) = 27 − 27 = 0 → tangente y = 9(x − 3) = <b>9x − 27</b>.",
      "x = −1: f(−1) = −1 − 3 = −4 → y + 4 = 9(x + 1) → <b>y = 9x + 5</b>."
    ]) +
    ejemplo("Normal de un logaritmo", "Halla la recta normal a f(x) = ln x en x = 1.", [
      "f(1) = 0 y f′(x) = 1/x → f′(1) = 1. La normal tiene pendiente −1.",
      "y − 0 = −1·(x − 1) → <b>y = −x + 1</b>."
    ]) +
    ejemplo("Tangente perpendicular", "¿En qué punto de f(x) = x² − 4x la tangente es perpendicular a la recta y = −x/2 + 3?", [
      "Pendiente de la recta: −1/2. La tangente debe tener pendiente 2 (m₁·m₂ = −1).",
      "f′(x) = 2x − 4 = 2 → x = 3, f(3) = −3. El punto es <b>(3, −3)</b>."
    ]) +
    "<h5>Derivada y velocidad: un primer vistazo</h5>" +
    "<p>Si s(t) es la posición, la tangente a la gráfica de s en un instante tiene pendiente igual a la velocidad en ese instante. Prueba con las cuatro situaciones del simulador (en la sección sobre la derivada en las ciencias).</p>";

  secciones[6] +=
    "<h5>Extremos absolutos en un intervalo cerrado</h5>" +
    "<p>Si f es continua en [a, b], alcanza un máximo y un mínimo absolutos (teorema de Weierstrass). Se encuentran <b>comparando los valores de f en los puntos críticos y en los extremos del intervalo</b>: el mayor es el máximo absoluto y el menor el mínimo.</p>" +
    ejemplo("Extremos absolutos", "Halla los extremos absolutos de f(x) = x³ − 3x en [−2, 3].", [
      "f′(x) = 3x² − 3 = 0 → x = ±1 (los dos están en el intervalo).",
      "Valores: f(−2) = −8 + 6 = −2 · f(−1) = 2 · f(1) = −2 · f(3) = 27 − 9 = 18.",
      "<b>Máximo absoluto</b>: 18, en x = 3 (un extremo del intervalo). <b>Mínimo absoluto</b>: −2, que se alcanza en x = −2 y en x = 1."
    ]) +
    "<h5>El criterio de la segunda derivada</h5>" +
    "<p>Si f′(a) = 0 (tangente horizontal) y la segunda derivada existe en a:</p>" +
    tabla(["f″(a)", "Conclusión"], [["&gt; 0", "mínimo relativo (la gráfica es una «sonrisa» ∪ en a)"], ["&lt; 0", "máximo relativo (una «cara triste» ∩)"], ["= 0", "no concluye: hay que estudiar el signo de f′ (x⁴ tiene mínimo, −x⁴ máximo y x³ ninguno)"]]) +
    ejemplo("Con la segunda derivada", "Clasifica los puntos críticos de f(x) = x³ − 6x² + 9x + 1.", [
      "f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) → puntos críticos x = 1 y x = 3.",
      "f″(x) = 6x − 12. f″(1) = −6 &lt; 0 → <b>máximo</b> en (1, f(1)) = (1, 5). f″(3) = 6 &gt; 0 → <b>mínimo</b> en (3, f(3)) = (3, 1)."
    ]) +
    "<h5>Puntos donde f′ no existe</h5>" +
    "<p>Un extremo puede estar donde f′ no existe: f(x) = |x − 2| tiene un mínimo en x = 2 (punto anguloso) y f(x) = ∛(x²) otro en x = 0 (cúspide). Por eso, además de resolver f′ = 0, se miran los puntos del dominio donde f′ no existe.</p>";

  // ============================================================
  // SECCIONES NUEVAS al final del tema
  // ============================================================
  var nuevas = [
    {
      h: "8. Problemas de optimización: máximos y mínimos con sentido",
      html:
        "<p>Es el problema más «de examen» de todo el tema: te dan una situación (una caja, una valla, un coste) y te piden <em>la mejor</em> opción. Se resuelve con lo que ya sabes; solo hay que ordenar los pasos:</p>" +
        "<ol><li><b>Dibuja y nombra</b> las incógnitas (x, y…).</li><li>Escribe la <b>función objetivo</b>: lo que quieres hacer máximo o mínimo (área, volumen, coste).</li><li>Usa la <b>condición</b> del enunciado (un perímetro fijo, un volumen dado) para dejar la función en <b>una sola variable</b>.</li><li>Deriva, iguala a 0 y <b>comprueba</b> que es máximo o mínimo (signo de f') y que está dentro del dominio.</li><li><b>Responde</b> a lo que preguntan, con unidades.</li></ol>" +
        ejemplo("Ejemplo 1: máximo", "Con 40 m de valla quieres cercar un campo rectangular de área máxima. ¿Qué dimensiones debe tener?", [
          "Incógnitas: base x y altura y. Perímetro: 2x + 2y = 40 → y = 20 − x",
          "Función objetivo: A = x·y = x(20 − x) = 20x − x², con 0 &lt; x &lt; 20",
          "A'(x) = 20 − 2x = 0 → x = 10",
          "Signo: A' &gt; 0 si x &lt; 10 y A' &lt; 0 si x &gt; 10 → pasa de + a −: <b>máximo</b>",
          "x = 10 → y = 10. <b>Es un cuadrado de 10 × 10 m, con área 100 m².</b>"
        ]) +
        ejemplo("Ejemplo 2: mínimo", "Halla dos números positivos cuyo producto sea 36 y cuya suma sea la menor posible.", [
          "Números x e y, con x·y = 36 → y = 36/x",
          "Función objetivo: S(x) = x + " + fr("36", "x") + ", con x &gt; 0",
          "S'(x) = 1 − " + fr("36", "x²") + " = 0 → x² = 36 → x = 6 (la solución x = −6 no vale: pedimos positivos)",
          "Signo: S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → pasa de − a +: <b>mínimo</b>",
          "x = 6 → y = 6. <b>Los números son 6 y 6, con suma mínima 12.</b>"
        ]) +
        "<p>Ahora experimenta tú. Mueve x a ojo para buscar el óptimo y después compruébalo con la derivada:</p>" +
        w("optimizar") +
        ojo("tres fallos típicos: (1) dar la x cuando preguntan por el área o el volumen máximo; (2) no comprobar si el punto crítico es máximo o mínimo; (3) dar una solución que se sale del dominio (una longitud negativa, por ejemplo)."),
    },
    {
      h: "9. Aproximación lineal: la tangente como calculadora",
      html:
        "<p>Cerca del punto de tangencia, la recta tangente y la curva casi coinciden. Eso permite <b>aproximar valores</b> de una función complicada con una recta:</p>" +
        H.formula("f(a + h) ≈ f(a) + f′(a)·h        (h pequeño)") +
        ejemplo("Una raíz sin calculadora", "Aproxima √4,1 usando la tangente de f(x) = √x en a = 4.", [
          "f(4) = 2 y f′(x) = 1/(2√x) → f′(4) = 1/4.",
          "√4,1 = f(4 + 0,1) ≈ 2 + (1/4)·0,1 = <b>2,025</b>. (El valor exacto es 2,02485: el error es de 0,00015.)"
        ]) +
        ejemplo("Un logaritmo", "Aproxima ln 1,02 con la tangente de ln x en a = 1.", [
          "f(1) = 0 y f′(1) = 1/1 = 1. ln 1,02 ≈ 0 + 1·0,02 = <b>0,02</b> (exacto: 0,0198026)."
        ]) +
        ejemplo("Una potencia", "Aproxima 1,03¹⁰.", [
          "f(x) = x¹⁰ en a = 1: f(1) = 1 y f′(1) = 10. 1,03¹⁰ ≈ 1 + 10·0,03 = <b>1,3</b> (exacto: 1,3439; con h = 0,03 y exponente grande el error ya se nota)."
        ]) +
        w("linealizacion") +
        "<p><b>Diferencial.</b> Se llama diferencial de f en x a dy = f′(x)·dx: el cambio de y que predice la tangente cuando x cambia en dx. Es la idea que está detrás del cálculo de <i>errores</i>: si mides una arista de un cubo con un error de 0,1 cm, el volumen V = x³ cambia aproximadamente dV = 3x²·dx.</p>" +
        ojo("la aproximación sólo es buena para h pequeño. Con h grande la recta se separa de la curva. Y el error es mayor cuanto más «curvada» esté la gráfica (cuanto mayor sea |f″|).")
    },
    {
      h: "10. Derivabilidad de funciones a trozos y con valor absoluto",
      html:
        "<p>Es uno de los problemas más repetidos en los exámenes. Para que f sea derivable en el punto de unión x = c de dos trozos hacen falta <b>dos</b> condiciones (en este orden):</p>" +
        "<ol><li><b>Continuidad</b>: el valor por la izquierda, el valor por la derecha y f(c) coinciden.</li><li><b>Derivadas laterales iguales</b>: la derivada del trozo izquierdo en c es igual que la del trozo derecho en c.</li></ol>" +
        "<p>Con parámetros, esas dos condiciones forman un <b>sistema de ecuaciones</b>. Explora el simulador: con a = 2 y b = 0 las pendientes coinciden pero hay un salto; con b = −1 se unen sin pico.</p>" +
        w("derivabilidad") +
        ejemplo("Dos parámetros", "Halla a y b para que f(x) = { x² + ax + b si x &lt; 1 ; 3x − 1 si x ≥ 1 } sea derivable en x = 1.", [
          "<b>Continuidad</b>: por la izquierda 1 + a + b; por la derecha (y f(1)) 3·1 − 1 = 2. Entonces 1 + a + b = 2 → a + b = 1.",
          "<b>Derivadas laterales</b>: izquierda 2x + a → 2 + a; derecha 3. Entonces 2 + a = 3 → a = 1.",
          "De a + b = 1 se tiene b = 0. <b>a = 1, b = 0</b>."
        ]) +
        ejemplo("Otro sistema", "Halla a y b para que f(x) = { ax² + 1 si x ≤ 1 ; bx + 2 si x &gt; 1 } sea derivable en x = 1.", [
          "Continuidad: a + 1 = b + 2 → a − b = 1.",
          "Derivadas: 2a = b.",
          "Sustituyendo: a − 2a = 1 → a = −1 y b = −2. <b>a = −1, b = −2</b>."
        ]) +
        ejemplo("Con valor absoluto", "Estudia la derivabilidad de f(x) = |x² − 4| en x = 2 y x = −2.", [
          "Cerca de x = 2: x² − 4 &gt; 0 para x &gt; 2 y &lt; 0 para x &lt; 2. Entonces f(x) = x² − 4 por la derecha, con pendiente 2x = 4 en x = 2; y f(x) = −(x² − 4) por la izquierda, con pendiente −2x = −4.",
          "Las derivadas laterales son −4 y 4: son distintas. <b>No es derivable en x = 2</b> (punto anguloso). Por simetría, tampoco en x = −2."
        ]) +
        ejemplo("Una trampa agradable", "Estudia la derivabilidad de f(x) = (x − 1)·|x − 1| en x = 1.", [
          "Para x &gt; 1: f(x) = (x − 1)², con derivada 2(x − 1) → 0. Para x &lt; 1: f(x) = −(x − 1)², con derivada −2(x − 1) → 0.",
          "Las derivadas laterales valen las dos 0: <b>es derivable en x = 1</b> y f′(1) = 0, aunque tenga valor absoluto."
        ])
    },
    {
      h: "11. Concavidad y puntos de inflexión: la segunda derivada",
      html:
        "<p>La primera derivada dice si f sube o baja. La <b>segunda derivada</b> dice <b>hacia dónde se curva</b> la gráfica:</p>" +
        tabla(["Si…", "f está…", "Imagen", "La pendiente f′…"], [
          ["f″ &gt; 0", "curvada hacia arriba (∪)", "una «sonrisa»: la tangente queda por debajo de la curva", "va aumentando"],
          ["f″ &lt; 0", "curvada hacia abajo (∩)", "una «cara triste»: la tangente queda por encima", "va disminuyendo"]
        ]) +
        "<p><b>Nota sobre los nombres.</b> Unos libros llaman «cóncava» a ∪ y «convexa» a ∩, y otros al revés. Para no confundirte, di siempre «curvada hacia arriba/abajo» y dibuja la forma.</p>" +
        "<p>Un <b>punto de inflexión</b> es un punto donde la gráfica cambia de curvarse hacia un lado a curvarse hacia el otro: f″ cambia de signo (y la tangente atraviesa la curva). En un punto de inflexión suele cumplirse f″ = 0, pero <i>f″ = 0 no basta</i>: f(x) = x⁴ tiene f″(0) = 0 y no hay inflexión (siempre curva hacia arriba).</p>" +
        ejemplo("Concavidad e inflexión", "Estudia la curvatura de f(x) = x⁴ − 4x³.", [
          "f′(x) = 4x³ − 12x² y f″(x) = 12x² − 24x = 12x(x − 2).",
          "f″ = 0 → x = 0 y x = 2. Signo de f″: positivo en (−∞, 0), negativo en (0, 2), positivo en (2, +∞).",
          "Curvada hacia arriba en (−∞, 0) ∪ (2, +∞) y hacia abajo en (0, 2). <b>Puntos de inflexión</b>: (0, 0) y (2, f(2)) = (2, −16)."
        ]) +
        "<p>Mira las tres gráficas a la vez: la de f, la de f′ y la de f″. Observa que los máximos y mínimos de f son los ceros de f′, y los puntos de inflexión de f son los ceros de f″ (y los máximos o mínimos de f′):</p>" +
        w("tresgraficas")
    },
    {
      h: "12. Estudio completo y representación gráfica de funciones",
      html:
        "<p>Con todo lo que sabes ya puedes hacer el <b>estudio completo</b> de una función y dibujarla. El guion:</p>" +
        "<ol><li><b>Dominio</b> y puntos de corte con los ejes.</li><li><b>Simetría</b> (par/impar) y periodicidad.</li><li><b>Asíntotas</b> (Tema 10).</li><li><b>Primera derivada</b>: crecimiento, decrecimiento y extremos relativos.</li><li><b>Segunda derivada</b>: curvatura y puntos de inflexión.</li><li><b>Tabla resumen</b> y <b>gráfica</b>.</li></ol>" +
        ejemplo("Un polinomio", "Estudia y representa f(x) = x³ − 6x² + 9x.", [
          "<b>Dominio</b> ℝ. <b>Cortes</b>: f(0) = 0; f(x) = x(x − 3)² = 0 → x = 0 y x = 3 (raíz doble: la gráfica toca el eje en x = 3 sin cruzarlo).",
          "<b>f′(x)</b> = 3x² − 12x + 9 = 3(x − 1)(x − 3) → crece en (−∞, 1) ∪ (3, +∞), decrece en (1, 3). <b>Máximo relativo</b> (1, 4); <b>mínimo relativo</b> (3, 0).",
          "<b>f″(x)</b> = 6x − 12 = 0 → x = 2. Curvada hacia abajo para x &lt; 2 y hacia arriba para x &gt; 2: <b>inflexión</b> (2, 2).",
          "Sin asíntotas (polinomio de grado 3: tiende a ±∞). Con estos puntos se dibuja: sube hasta (1, 4), baja pasando por (2, 2) hasta (3, 0) y vuelve a subir."
        ]) +
        ejemplo("Una racional", "Estudia y representa f(x) = x²/(x − 1).", [
          "<b>Dominio</b> ℝ − {1}. <b>Cortes</b>: f(0) = 0 (único corte: x² = 0 → x = 0).",
          "<b>Asíntotas</b>: vertical x = 1 (numerador 1 ≠ 0). Oblicua: x²/(x − 1) = x + 1 + 1/(x − 1), así que y = x + 1 (grado del numerador = grado del denominador + 1).",
          "<b>f′(x)</b> = [2x(x − 1) − x²]/(x − 1)² = x(x − 2)/(x − 1)². Se anula en x = 0 y x = 2. Signo: crece en (−∞, 0) ∪ (2, +∞) y decrece en (0, 1) ∪ (1, 2). <b>Máximo relativo</b> (0, 0); <b>mínimo relativo</b> (2, 4).",
          "<b>f″(x)</b> = 2/(x − 1)³: nunca se anula, luego no hay inflexión. Curvada hacia abajo en (−∞, 1) y hacia arriba en (1, +∞).",
          "Dibujo: dos ramas separadas por x = 1, pegadas a la oblicua y = x + 1."
        ]) +
        ejemplo("Con exponencial", "Estudia f(x) = x·e⁻ˣ.", [
          "<b>Dominio</b> ℝ. Corte: x = 0. <b>Asíntota horizontal</b>: lím<sub>x→+∞</sub> x·e⁻ˣ = 0 (la exponencial gana a la potencia): y = 0 en +∞.",
          "<b>f′(x)</b> = e⁻ˣ − x·e⁻ˣ = (1 − x)e⁻ˣ: crece en (−∞, 1), decrece en (1, +∞). <b>Máximo</b> (1, 1/e) ≈ (1; 0,368).",
          "<b>f″(x)</b> = −e⁻ˣ − (1 − x)e⁻ˣ = (x − 2)e⁻ˣ: cambia de signo en x = 2 → <b>inflexión</b> (2, 2/e²) ≈ (2; 0,271)."
        ]) +
        "<p>Para comprobar tus estudios, usa el analizador del Tema 9 (ficha automática) y las tres gráficas de la sección anterior.</p>" +
        w("analisis")
    },
    {
      h: "13. Más problemas de optimización",
      html:
        "<p>Cada uno de estos problemas es de los que caen en exámenes. Pruébalos primero en el simulador (busca el óptimo moviendo x) y después resuélvelos con la derivada.</p>" +
        w("optimizar2") +
        ejemplo("Coste medio mínimo", "El coste de fabricar x unidades es C(x) = x² + 100x + 2500 €. ¿Para qué producción es mínimo el coste medio por unidad?", [
          "Coste medio: M(x) = C(x)/x = x + 100 + 2500/x (x &gt; 0).",
          "M′(x) = 1 − 2500/x² = 0 → x² = 2500 → x = 50.",
          "M′ &lt; 0 si x &lt; 50 y M′ &gt; 0 si x &gt; 50: mínimo. <b>Producción de 50 unidades</b>, con coste medio M(50) = 50 + 100 + 50 = 200 €/unidad."
        ]) +
        ejemplo("Rectángulo inscrito en una circunferencia", "Halla el rectángulo de mayor área inscrito en una circunferencia de radio r.", [
          "Los vértices son (±x, ±y) con x² + y² = r². Área A = 2x·2y = 4xy = 4x√(r² − x²).",
          "Maximizar A es lo mismo que maximizar A² = 16x²(r² − x²) = 16(r²x² − x⁴). Derivada: 16(2r²x − 4x³) = 32x(r² − 2x²) = 0 → x² = r²/2.",
          "Entonces y² = r²/2 también: x = y = r/√2. <b>Es un cuadrado de lado r√2</b>, con área máxima 2r²."
        ]) +
        ejemplo("Caja de base cuadrada", "Una caja abierta (sin tapa) de base cuadrada debe tener 108 dm³. ¿Qué dimensiones minimizan el material?", [
          "Lado de la base x, altura h: x²h = 108 → h = 108/x². Superficie: S = x² + 4xh = x² + 432/x.",
          "S′ = 2x − 432/x² = 0 → x³ = 216 → x = 6 dm.",
          "S′ &lt; 0 antes y &gt; 0 después: mínimo. <b>x = 6 dm, h = 108/36 = 3 dm</b> y S = 36 + 72 = 108 dm²."
        ]) +
        "<h5>Casos clásicos que conviene recordar</h5>" +
        tabla(["Problema", "Solución"], [
          ["Rectángulo de perímetro fijo, área máxima", "el cuadrado"],
          ["Rectángulo de área fija, perímetro mínimo", "el cuadrado"],
          ["Lata cilíndrica de volumen fijo, superficie mínima", "altura = diámetro (h = 2r)"],
          ["Caja abierta de base cuadrada y volumen fijo", "altura = mitad del lado de la base"],
          ["Dos números de suma fija, producto máximo", "iguales"],
          ["Dos números de producto fijo, suma mínima", "iguales"]
        ])
    },
    {
      h: "14. La derivada en las ciencias: velocidad, aceleración y ritmos de cambio",
      html:
        "<p>La derivada mide <b>el ritmo de cambio instantáneo</b> de una magnitud respecto de otra. Por eso aparece en todas las ciencias: si N(t) es una población, N′(t) es su velocidad de crecimiento; si C(x) es un coste, C′(x) es el coste marginal; si s(t) es una posición, s′ es la velocidad y s″ la aceleración. Observa cómo se relacionan las tres gráficas:</p>" +
        w("cinematica") +
        ejemplo("Caída libre", "Se suelta un objeto desde 80 m de altura: h(t) = 80 − 5t². Calcula la velocidad en t = 2 s y con qué velocidad llega al suelo.", [
          "v(t) = h′(t) = −10t (negativa: baja). En t = 2: v = <b>−20 m/s</b> (20 m/s hacia abajo).",
          "Llega al suelo cuando h = 0: 80 − 5t² = 0 → t = 4 s. Entonces v(4) = <b>−40 m/s</b>.",
          "La aceleración a = v′ = −10 m/s² (la gravedad, constante)."
        ]) +
        ejemplo("Coste marginal", "El coste de producir x unidades es C(x) = 0,01x³ − 0,6x² + 13x (euros). Calcula el coste marginal en x = 10 e interprétalo.", [
          "C′(x) = 0,03x² − 1,2x + 13 → C′(10) = 3 − 12 + 13 = <b>4 €/unidad</b>.",
          "Significa que, produciendo ya 10 unidades, fabricar una más cuesta aproximadamente 4 €. (C(11) − C(10) = 3,71: la derivada lo aproxima razonablemente.)"
        ]) +
        ejemplo("Crecimiento de una población", "N(t) = 500·e^(0,2t) bacterias (t en horas). ¿Con qué rapidez crece a las 5 h?", [
          "N′(t) = 500·0,2·e^(0,2t) = 0,2·N(t). Es <b>proporcional a la población</b>.",
          "N(5) = 500e = 1 359,1 y N′(5) = 0,2·1 359,1 = <b>271,8 bacterias/hora</b>."
        ]) +
        ejemplo("Concentración máxima de un fármaco", "C(t) = 8t·e^(−0,5t) (mg/L, t en horas). ¿Cuándo es máxima y cuánto vale?", [
          "C′(t) = 8e^(−0,5t) + 8t·(−0,5)e^(−0,5t) = 8e^(−0,5t)(1 − 0,5t).",
          "C′ = 0 → t = 2 h. C′ &gt; 0 antes y &lt; 0 después: máximo.",
          "<b>C(2) = 16/e = 5,89 mg/L</b>, a las 2 horas."
        ])
    },
    {
      h: "15. El teorema del valor medio (para ir más allá)",
      html:
        "<p><b>Teorema del valor medio (Lagrange).</b> Si f es continua en [a, b] y derivable en (a, b), existe al menos un c ∈ (a, b) tal que</p>" +
        H.formula("f′(c) = " + fr("f(b) − f(a)", "b − a")) +
        "<p>Es decir: en algún punto, la pendiente de la tangente (instantánea) es igual a la pendiente de la secante (media). Un caso particular es el <b>teorema de Rolle</b>: si además f(a) = f(b), existe c con f′(c) = 0 (entre dos alturas iguales tiene que haber una cima o un valle).</p>" +
        w("valormedio") +
        ejemplo("Hallar c", "Halla el punto c que garantiza el teorema para f(x) = x³ − x en [0, 2].", [
          "f(0) = 0 y f(2) = 6, así que la pendiente media vale (6 − 0)/(2 − 0) = 3.",
          "f′(c) = 3c² − 1 = 3 → c² = 4/3 → c = 2/√3 = <b>1,1547</b> (la raíz negativa queda fuera del intervalo)."
        ]) +
        ejemplo("El radar", "Un coche recorre 100 km en exactamente 1 hora. ¿Qué dice el teorema?", [
          "Si s(t) es la posición, la velocidad media es (s(1) − s(0))/1 = 100 km/h. El teorema asegura que existe un instante c en que la velocidad instantánea fue exactamente <b>100 km/h</b>: es la base de los radares de tramo."
        ])
    },
    {
      h: "16. Banco de derivadas resueltas, por tipos",
      html:
        "<p>Veinticuatro derivadas con la regla que las resuelve. Tápalas y deriva tú antes de mirar la solución.</p>" +
        tabla(["Función", "Regla", "Derivada"], [
          ["5x⁴ − 3x² + 2x − 7", "potencia y suma", "20x³ − 6x + 2"],
          ["x⁻² + 4√x", "potencias", "−2x⁻³ + 2/√x"],
          ["(2x − 1)(x² + 3)", "producto", "6x² − 2x + 6"],
          ["x·eˣ", "producto", "(1 + x)eˣ"],
          ["x²·ln x", "producto", "2x ln x + x"],
          ["(x + 1)/(x − 1)", "cociente", "−2/(x − 1)²"],
          ["x/(x² + 1)", "cociente", "(1 − x²)/(x² + 1)²"],
          ["eˣ/x", "cociente", "eˣ(x − 1)/x²"],
          ["sen x·cos x", "producto", "cos²x − sen²x = cos 2x"],
          ["tg x", "tabla", "1/cos²x"],
          ["sen(3x²)", "cadena", "6x·cos(3x²)"],
          ["cos²x", "cadena", "−2 sen x cos x = −sen 2x"],
          ["e<sup>−x²</sup>", "cadena", "−2x·e<sup>−x²</sup>"],
          ["ln(x² + 1)", "cadena", "2x/(x² + 1)"],
          ["√(1 − x²)", "cadena", "−x/√(1 − x²)"],
          ["(2x + 1)⁵", "cadena", "10(2x + 1)⁴"],
          ["ln(sen x)", "cadena", "cos x/sen x = cotg x"],
          ["e<sup>sen x</sup>", "cadena", "cos x·e<sup>sen x</sup>"],
          ["2ˣ", "tabla", "2ˣ·ln 2"],
          ["xˣ", "logarítmica", "xˣ(ln x + 1)"],
          ["arctan(2x)", "cadena", "2/(1 + 4x²)"],
          ["ln(x + √(x² + 1))", "cadena", "1/√(x² + 1)"],
          ["(x² + 1)/eˣ", "cociente", "−(x − 1)²e⁻ˣ"],
          ["1/√x", "potencia", "−1/(2x√x)"]
        ]) +
        "<p>Y para entrenar de forma automática con corrección, el entrenador de derivadas:</p>" +
        w("derivador")
    },
    {
      h: "17. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html:
        "<p>Casi todos los fallos en derivadas son siempre los mismos. Leerlos una vez no basta: hay que <b>detectarlos</b> en un ejercicio ya hecho. Cada pregunta muestra un razonamiento con un error; elige cuál es.</p>" +
        w("quiz", "errores")
    },
    {
      h: "18. Autocomprobación del tema",
      html:
        "<p>Dieciséis preguntas de test, juegos de parejas y de clasificación para fijar las reglas, un problema de optimización para ordenar y tarjetas con todo lo esencial. Si fallas alguna, la explicación te dice por qué.</p>" +
        w("quiz", "quiz1") +
        w("emparejar", "emp1") +
        w("clasificar", "reglas") +
        w("orden", "optim") +
        w("tarjetas", "tj1")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    clase1: {
      titulo: "De la secante a la tangente",
      montar: function (host) { return B.lab.claseSecante(host); },
      pasos: [
        { h: "Dos puntos, una secante", estado: { h: 2, tang: false },
          html: "<p>Tomamos f(x) = x² y el punto <b>A = (1, 1)</b>. Elegimos otro punto B de la gráfica, a distancia <b>h = 2</b> de A en horizontal: B = (3, 9).</p><p>La recta que pasa por A y B es la <b>secante</b>. Su pendiente es la TVM:</p><p><b>(9 − 1) ÷ 2 = 4</b></p>" },
        { h: "Acercamos B", estado: { h: 1 },
          html: "<p>Ahora h = 1, así que B = (2, 4). La secante cambia: su pendiente ya no es 4.</p><p><b>(4 − 1) ÷ 1 = 3</b></p><p>Fíjate en que la secante se va «tumbando» hacia la curva.</p>" },
        { h: "Más cerca todavía", estado: { h: 0.5 },
          html: "<p>Con h = 0,5 tenemos B = (1,5; 2,25).</p><p><b>(2,25 − 1) ÷ 0,5 = 2,5</b></p><p>Cada vez que acercas B, la pendiente baja… pero cada vez baja menos.</p>" },
        { h: "Muy cerca", estado: { h: 0.1 },
          html: "<p>Para h = 0,1 la pendiente es 2,1; para h = 0,01 será 2,01. Estas son las pendientes que hemos ido obteniendo:</p><table class='lam-tabla'><thead><tr><th>h</th><th>B</th><th>TVM</th></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td></tr><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>0,5</td><td>1,5</td><td>2,5</td></tr><tr><td>0,1</td><td>1,1</td><td>2,1</td></tr><tr><td>→ 0</td><td>→ 1</td><td>→ <b>2</b></td></tr></tbody></table>" },
        { h: "El límite es la tangente", estado: { h: 0.002, tang: true },
          html: "<p>Cuando B casi se funde con A, la secante es casi idéntica a la <b>tangente</b> (línea verde discontinua). La pendiente se acerca a 2.</p><p>Eso es exactamente <b>f'(1) = 2</b>: el límite de la TVM cuando h → 0.</p>" },
        { h: "¿Por qué sale 2?", estado: { h: 0.002, tang: true },
          html: "<p>Con álgebra, para cualquier h ≠ 0:</p><p><b>TVM = ((1 + h)² − 1) ÷ h = (2h + h²) ÷ h = 2 + h</b></p><p>Y cuando h → 0, 2 + h → 2. Por eso la tabla se acercaba a 2: las pendientes eran 2 + h.</p>" },
        { h: "Pruébalo tú", estado: { h: -1, tang: true },
          html: "<p>Usa el deslizador <b>h</b> de la gráfica. Prueba valores negativos: B pasa al lado izquierdo de A y la pendiente es <b>2 + h</b> también (por ejemplo, h = −1 da 1).</p><p>Da igual por qué lado te acerques: tiende a 2. Por eso f tiene derivada en x = 1.</p>" }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno deriva f(x) = x²·eˣ y escribe f'(x) = 2x·eˣ. ¿Qué ha hecho mal?",
          op: ["Ha derivado el producto como producto de las derivadas", "Ha olvidado que (eˣ)' = eˣ", "Debió usar la regla de la cadena", "Está bien"], ok: 0,
          porque: "El producto <b>no</b> se deriva factor a factor. Lo correcto es (x²·eˣ)' = 2x·eˣ + x²·eˣ = (2x + x²)eˣ." },
        { q: "Un alumno deriva f(x) = sen(3x) y escribe f'(x) = cos(3x). ¿Qué falta?",
          op: ["Cambiar el signo", "Multiplicar por la derivada de lo de dentro, que es 3", "Derivar también el 3x como si fuese x²", "Nada, está bien"], ok: 1,
          porque: "Regla de la cadena: derivas la función de fuera (sen → cos) <b>y multiplicas por la derivada de lo de dentro</b> (3x → 3). Resultado correcto: f'(x) = 3cos(3x)." },
        { q: "«f(x) = x³ cumple f'(0) = 0, así que tiene un mínimo en x = 0.» ¿Es correcto?",
          op: ["Sí: si f' = 0 siempre hay un mínimo", "No: f' vale 0 pero no cambia de signo en x = 0, así que no hay extremo", "No: f'(0) no vale 0", "Sí, pero es un máximo"], ok: 1,
          porque: "f'(x) = 3x² es positiva a ambos lados de 0, así que f sigue creciendo: no hay máximo ni mínimo. f' = 0 solo da un <em>candidato</em>; hay que comprobar el cambio de signo." },
        { q: "Tangente a f(x) = x² en x = 3. Un alumno escribe «y − 3 = 6(x − 3)». ¿Cuál es el fallo?",
          op: ["La pendiente debería ser 3", "Ha usado a = 3 como coordenada y, en vez de f(3) = 9", "Falta derivar otra vez", "No hay fallo"], ok: 1,
          porque: "El punto de tangencia es (3, f(3)) = (3, 9), no (3, 3). La recta correcta es y − 9 = 6(x − 3), es decir, y = 6x − 9." },
        { q: "Para f(x) = (x² + 1)/x, un alumno deriva arriba y abajo por separado y obtiene f'(x) = 2x/1 = 2x. ¿Qué ha fallado?",
          op: ["Nada: es la regla del cociente", "El cociente tiene su propia regla: (u'v − uv')/v², no se deriva numerador y denominador por separado", "Debía usar la regla del producto", "Debía integrar"], ok: 1,
          porque: "Correcto: f'(x) = (2x·x − (x² + 1)·1)/x² = (x² − 1)/x² = 1 − 1/x². (Se ve más fácil reescribiendo f(x) = x + 1/x.)" },
        { q: "«La derivada de 5x² + 7 es 10x + 7.» ¿Qué error hay?",
          op: ["La derivada de 5x² es 5x", "Las constantes se derivan a 0: (7)' = 0", "Hay que dividir entre 2", "Está bien"], ok: 1,
          porque: "Una constante no cambia nunca, así que su derivada es 0. Lo correcto es (5x² + 7)' = 10x." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La TVM de f en [1, 3] vale 4. ¿Qué significa?",
          op: ["La secante que une los puntos de abscisas 1 y 3 tiene pendiente 4", "f'(2) = 4", "f(3) − f(1) = 4", "f es creciente en todo [1, 3]"], ok: 0,
          porque: "TVM = (f(3) − f(1)) ÷ 2 = 4, así que f(3) − f(1) = 8 (no 4). Y no dice nada sobre f'(2) ni sobre si crece siempre: es una media." },
        { q: "Si f'(a) &lt; 0, la recta tangente en x = a…",
          op: ["Sube de izquierda a derecha", "Es horizontal", "Baja de izquierda a derecha: f decrece en a", "No existe"], ok: 2,
          porque: "La derivada es la pendiente de la tangente: negativa significa que la tangente (y la función, localmente) baja al avanzar hacia la derecha." },
        { q: "La derivada de f(x) = e<sup>2x</sup> es…",
          op: ["e<sup>2x</sup>", "2x·e<sup>2x−1</sup>", "2e<sup>2x</sup>", "2e<sup>x</sup>"], ok: 2,
          porque: "Cadena: (e<sup>u</sup>)' = e<sup>u</sup>·u' con u = 2x, u' = 2. Por tanto f'(x) = 2e<sup>2x</sup>." },
        { q: "La recta tangente a f(x) = x² en x = 2 es…",
          op: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = 2x − 4"], ok: 1,
          porque: "f(2) = 4 y f'(2) = 4. Entonces y − 4 = 4(x − 2) → y = 4x − 4." },
        { q: "Si f' pasa de negativa a positiva en x = a, entonces en a hay…",
          op: ["un máximo relativo", "un mínimo relativo", "un punto sin derivada", "ningún extremo siempre"], ok: 1,
          porque: "Antes f decrece (f' &lt; 0) y después crece (f' &gt; 0): baja, toca fondo y sube. Eso es un mínimo relativo." },
        { q: "¿Cuál es la derivada de f(x) = ln(5x)?",
          op: ["1/(5x)", "1/x", "5/x", "ln 5"], ok: 1,
          porque: "(ln u)' = u'/u = 5/(5x) = 1/x. (También: ln(5x) = ln 5 + ln x, y ln 5 es una constante.)" },
        { q: "En un problema de optimización, después de escribir la función objetivo, ¿qué haces antes de derivar?",
          op: ["Nada: se deriva directamente", "Usar la condición del enunciado para dejarla en una sola variable", "Calcular el límite en infinito", "Dibujar la tangente"], ok: 1,
          porque: "La función objetivo suele tener dos variables (x, y). La condición del enunciado (perímetro fijo, volumen dado…) permite despejar una en función de la otra." },
        { q: "La derivada de f(x) = x/(x + 1) es…",
          op: ["1/(x + 1)²", "1/(x + 1)", "x/(x + 1)²", "1"], ok: 0,
          porque: "Cociente: ((x + 1)·1 − x·1)/(x + 1)² = 1/(x + 1)²." }
      ]
    },

    emp1: {
      titulo: "Función ↔ derivada",
      consigna: "Toca una función de la izquierda y su derivada de la derecha.",
      pares: [
        ["x³", "3x²"],
        ["e<sup>2x</sup>", "2e<sup>2x</sup>"],
        ["ln(x² + 1)", "2x ÷ (x² + 1)"],
        ["sen(x²)", "2x·cos(x²)"],
        ["x/(x + 1)", "1 ÷ (x + 1)²"],
        ["√x", "1 ÷ (2√x)"]
      ]
    }
  };


  // ---------------- actividades ampliadas ----------------
  datos.errores.preguntas.push(
    { q: "Un alumno deriva f(x) = (x² + 1)³ y escribe f′(x) = 3(x² + 1)². ¿Qué falta?",
      op: ["Nada", "Multiplicar por la derivada de lo de dentro: 2x. Resultado: 6x(x² + 1)²", "Restar 1 al exponente otra vez", "Dividir entre 3"], ok: 1,
      porque: "Regla de la cadena: la derivada de la potencia (3u²) se multiplica por u′ = 2x. f′(x) = 3(x² + 1)²·2x = 6x(x² + 1)²." },
    { q: "Un alumno deriva ln(x²) y escribe 1/x². ¿Qué ha hecho mal?",
      op: ["Nada", "(ln u)′ = u′/u = 2x/x² = 2/x: olvidó la derivada de lo de dentro", "La derivada de ln es ln", "Debía usar la regla del cociente"], ok: 1,
      porque: "(ln u)′ = u′/u con u = x². Sale 2x/x² = 2/x. (También: ln(x²) = 2 ln x para x &gt; 0, cuya derivada es 2/x.)" },
    { q: "Para f(x) = x³ − 12x, un alumno resuelve f′(2) = 0 y dice «hay un máximo en x = 2». ¿Qué falla?",
      op: ["Nada", "f″(2) = 12 &gt; 0, así que en x = 2 hay un mínimo, no un máximo (el máximo está en x = −2)", "f′(2) no vale 0", "Es un punto de inflexión"], ok: 1,
      porque: "f′(x) = 3x² − 12 = 0 → x = ±2. Con la segunda derivada f″(x) = 6x: f″(2) = 12 &gt; 0 → mínimo; f″(−2) = −12 &lt; 0 → máximo." },
    { q: "Un alumno dice que f(x) = { x² si x &lt; 1 ; x si x ≥ 1 } es derivable en x = 1 «porque es continua». ¿Qué falla?",
      op: ["Nada", "Continua no implica derivable: las pendientes laterales son 2 y 1, distintas", "No es continua", "La derivada vale 3"], ok: 1,
      porque: "Por la izquierda la pendiente es 2x = 2 y por la derecha es 1. Hay un punto anguloso en (1, 1): continua pero no derivable." },
    { q: "Un alumno intenta hallar el rectángulo de perímetro 40 de área máxima y da como respuesta «x = 10». ¿Qué falta?",
      op: ["Nada: x = 10 es la respuesta a lo que se pide", "Si se pregunta por el área máxima hay que calcular A(10) = 100 y dar también las dimensiones 10 × 10", "Comprobar que x = 10 es mínimo", "Derivar otra vez"], ok: 1,
      porque: "Hay que responder exactamente a lo que preguntan: dimensiones (10 × 10) y/o área máxima (100 m²), con unidades." }
);
  datos.quiz1.preguntas.push(
    { q: "La pendiente de la tangente a f(x) = x³ − 3x² + 2 en x = 1 es…",
      op: ["−3", "0", "3", "−1"], ok: 0,
      porque: "f′(x) = 3x² − 6x → f′(1) = 3 − 6 = −3." },
    { q: "La derivada de f(x) = e<sup>x²</sup> es…",
      op: ["2x·e<sup>x²</sup>", "e<sup>x²</sup>", "x²·e<sup>x² − 1</sup>", "2e<sup>x</sup>"], ok: 0,
      porque: "Cadena: e<sup>u</sup>·u′ con u = x², u′ = 2x." },
    { q: "Si f′(x) = x² − 4, f decrece en…",
      op: ["(−2, 2)", "(−∞, −2) ∪ (2, +∞)", "(2, +∞)", "todo ℝ"], ok: 0,
      porque: "f′ &lt; 0 ⟺ x² &lt; 4 ⟺ −2 &lt; x &lt; 2." },
    { q: "Si f″(x) = 6x − 12, f tiene un punto de inflexión en…",
      op: ["x = 2", "x = 12", "x = 6", "x = 0"], ok: 0,
      porque: "f″ = 0 en x = 2 y cambia de signo (negativa antes, positiva después)." },
    { q: "Para f(x) = x² en [1, 3], el teorema del valor medio da c =…",
      op: ["2", "1,5", "√5", "3"], ok: 0,
      porque: "Pendiente media: (9 − 1)/2 = 4. f′(c) = 2c = 4 → c = 2." },
    { q: "Usando la tangente de f(x) = √x en a = 9, √9,1 ≈…",
      op: ["3,0167", "3,1", "3,01", "3,0333"], ok: 0,
      porque: "f′(9) = 1/6; √9,1 ≈ 3 + 0,1/6 = 3,0167 (exacto: 3,01662)." },
    { q: "Un rectángulo tiene perímetro 100 m. El área máxima posible es…",
      op: ["625 m²", "500 m²", "2 500 m²", "250 m²"], ok: 0,
      porque: "Con lados x y 50 − x: A = x(50 − x), máximo en x = 25: A = 625 m² (el cuadrado)." },
    { q: "La derivada de f(x) = ln(x² + 1) en x = 1 vale…",
      op: ["1", "2", "1/2", "0"], ok: 0,
      porque: "f′(x) = 2x/(x² + 1) → f′(1) = 2/2 = 1." }
  );
  datos.tj1 = {
    titulo: "Derivadas: lo imprescindible",
    cartas: [
      { a: "Definición de derivada", b: "f′(a) = lím<sub>h→0</sub> [f(a + h) − f(a)]/h = pendiente de la tangente = ritmo de cambio instantáneo." },
      { a: "Derivable y continua", b: "Derivable ⇒ continua. Continua no implica derivable (|x| en 0). Para derivar a trozos: continuidad + derivadas laterales iguales." },
      { a: "Reglas básicas", b: "(xⁿ)′ = nxⁿ⁻¹ · (f ± g)′ = f′ ± g′ · (kf)′ = kf′ · (c)′ = 0." },
      { a: "Producto y cociente", b: "(fg)′ = f′g + fg′ · (f/g)′ = (f′g − fg′)/g²." },
      { a: "Regla de la cadena", b: "[f(g(x))]′ = f′(g(x))·g′(x): la de fuera sin tocar lo de dentro, por la derivada de lo de dentro." },
      { a: "Derivadas elementales", b: "(eˣ)′ = eˣ · (aˣ)′ = aˣ ln a · (ln x)′ = 1/x · (sen x)′ = cos x · (cos x)′ = −sen x · (tg x)′ = 1/cos²x." },
      { a: "Derivación logarítmica", b: "(g<sup>h</sup>)′ = g<sup>h</sup>(h′ ln g + h g′/g). Ejemplo: (xˣ)′ = xˣ(ln x + 1)." },
      { a: "Tangente y normal", b: "Tangente: y − f(a) = f′(a)(x − a). Normal: pendiente −1/f′(a). Tangente horizontal: f′(a) = 0." },
      { a: "Monotonía y extremos", b: "f′ &gt; 0 crece · f′ &lt; 0 decrece · extremo si f′ cambia de signo (de + a −: máximo; de − a +: mínimo)." },
      { a: "Segunda derivada", b: "f″ &gt; 0: curvada hacia arriba (∪) · f″ &lt; 0: hacia abajo (∩) · inflexión si f″ cambia de signo. Criterio: f′(a) = 0 y f″(a) &gt; 0 ⇒ mínimo; &lt; 0 ⇒ máximo." },
      { a: "Extremos absolutos en [a, b]", b: "Comparar f en los puntos críticos y en los extremos a y b: el mayor es el máximo, el menor el mínimo." },
      { a: "Optimización", b: "Función objetivo → una sola variable con la condición del enunciado → derivar → igualar a 0 → comprobar máximo/mínimo y dominio → responder con unidades." },
      { a: "Aproximación lineal", b: "f(a + h) ≈ f(a) + f′(a)·h para h pequeño. Diferencial: dy = f′(x)dx." },
      { a: "Teorema del valor medio", b: "f continua en [a, b] y derivable en (a, b) ⇒ ∃c: f′(c) = (f(b) − f(a))/(b − a). Rolle: si f(a) = f(b), f′(c) = 0." },
      { a: "Derivada en las ciencias", b: "Velocidad v = s′, aceleración a = s″ = v′. Coste marginal C′(x). Crecimiento de una población N′(t)." },
      { a: "Estudio completo", b: "Dominio · cortes · simetría · asíntotas · f′ (crece, extremos) · f″ (curvatura, inflexión) · tabla · gráfica." }
    ]
  };
  datos.reglas = {
    titulo: "¿Qué regla uso primero?",
    consigna: "Toca una función y después la regla que aplicarías primero (la de la última operación).",
    categorias: ["Suma, resta o constante por función", "Producto", "Cociente", "Cadena (función dentro de otra)", "Derivación logarítmica"],
    items: [
      { t: "x⁴ − 3x + 2", c: 0 }, { t: "2x³ − √x", c: 0 }, { t: "x²·sen x", c: 1 }, { t: "x·ln x", c: 1 }, { t: "(x + 1)·eˣ", c: 1 },
      { t: "(x + 1)/(x − 2)", c: 2 }, { t: "eˣ/x²", c: 2 }, { t: "sen(5x)", c: 3 }, { t: "e<sup>x² + 1</sup>", c: 3 }, { t: "ln(3x − 1)", c: 3 },
      { t: "√(x² + 4)", c: 3 }, { t: "(3x + 1)⁷", c: 3 }, { t: "xˣ", c: 4 }, { t: "x<sup>sen x</sup>", c: 4 }
    ]
  };
  datos.optim = {
    titulo: "Un problema de optimización completo",
    consigna: "Ordena los pasos para resolver: «Una caja abierta de base cuadrada debe tener 500 cm³; halla las dimensiones que minimizan el material».",
    items: [
      { t: "Nombrar las incógnitas: lado de la base x y altura h", nota: "Siempre se empieza dibujando y poniendo letras." },
      { t: "Escribir la función objetivo: superficie S = x² + 4xh", nota: "Es lo que hay que hacer mínimo: base más cuatro caras." },
      { t: "Usar la condición del volumen x²h = 500 para despejar h = 500/x²", nota: "Así la función queda con una sola variable." },
      { t: "Sustituir: S(x) = x² + 2000/x, con x &gt; 0", nota: "4x·(500/x²) = 2000/x." },
      { t: "Derivar e igualar a 0: S′(x) = 2x − 2000/x² = 0 → x³ = 1000 → x = 10", nota: "El punto crítico candidato." },
      { t: "Comprobar que es mínimo: S′ &lt; 0 antes de 10 y S′ &gt; 0 después", nota: "También valdría S″(10) &gt; 0." },
      { t: "Responder: x = 10 cm, h = 500/100 = 5 cm, S = 300 cm²", nota: "Con unidades y respondiendo a lo que se pide." }
    ]
  };

  // ============================================================
  // EJERCICIOS NUEVOS: por niveles y con comprobación automática
  // nivel 1 ★ básico · 2 ★★ medio · 3 ★★★ nivel PAU
  // ============================================================
  var ejercicios = [
    // ---------- ★ ----------
    { id: "d1", nivel: 1,
      enunciado: "Calcula la tasa de variación media de f(x) = x² − 2x + 3 en el intervalo [1, 4].",
      check: { tipo: "num", etiqueta: "TVM =", valor: 3 },
      pistas: ["Calcula primero f(1) y f(4).", "TVM = (f(4) − f(1)) ÷ (4 − 1)."],
      pasos: ["f(1) = 1 − 2 + 3 = 2", "f(4) = 16 − 8 + 3 = 11", "TVM[1,4] = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3"],
      resultado: "TVM[1,4] = 3" },
    { id: "d2", nivel: 1,
      enunciado: "Deriva f(x) = 5x³ − 4x² + 7x − 9.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "15x^2-8x+7" },
      pistas: ["Deriva cada sumando con (xⁿ)' = n·xⁿ⁻¹.", "La constante −9 desaparece."],
      pasos: ["5x³ → 3·5x² = 15x²", "−4x² → 2·(−4)x = −8x", "7x → 7", "−9 → 0"],
      resultado: "f'(x) = 15x² − 8x + 7" },
    { id: "d3", nivel: 1,
      enunciado: "Deriva f(x) = 4√x.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2/sqrt(x)", dom: [0.3, 5], ph: "puedes escribir sqrt(x) o √x" },
      pistas: ["Escribe √x como x elevado a 1/2.", "(x<sup>1/2</sup>)' = ½·x<sup>−1/2</sup>."],
      pasos: ["f(x) = 4x<sup>1/2</sup>", "f'(x) = 4·½·x<sup>−1/2</sup> = 2x<sup>−1/2</sup>", "Volvemos a la raíz: 2x<sup>−1/2</sup> = " + fr("2", "√x")],
      resultado: "f'(x) = " + fr("2", "√x") },
    { id: "d4", nivel: 1,
      enunciado: "Calcula la pendiente de la recta tangente a f(x) = x³ − x en el punto de abscisa x = 2.",
      check: { tipo: "num", etiqueta: "m =", valor: 11 },
      pistas: ["La pendiente de la tangente es f'(2).", "f'(x) = 3x² − 1."],
      pasos: ["f'(x) = 3x² − 1", "f'(2) = 3·4 − 1 = 11"],
      resultado: "m = f'(2) = 11" },
    // ---------- ★★ ----------
    { id: "d5", nivel: 2,
      enunciado: "Deriva f(x) = (2x − 1)·eˣ.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(2x+1)e^x" },
      pistas: ["Es un producto de u = 2x − 1 y v = eˣ.", "f' = u'v + uv' = 2·eˣ + (2x − 1)·eˣ."],
      pasos: ["u = 2x − 1 → u' = 2   ·   v = eˣ → v' = eˣ", "f'(x) = u'v + uv' = 2eˣ + (2x − 1)eˣ", "Sacamos eˣ factor común: eˣ(2 + 2x − 1) = (2x + 1)eˣ"],
      resultado: "f'(x) = (2x + 1)·eˣ",
      ojo: "(f·g)' no es f'·g'. Si hubieras puesto 2·eˣ, te falta el término u·v'." },
    { id: "d6", nivel: 2,
      enunciado: "Deriva f(x) = " + fr("x² + 1", "x − 3") + " y simplifica el numerador.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(x^2-6x-1)/(x-3)^2", dom: [-2, 2.5] },
      pistas: ["Regla del cociente: (u'v − uv') ÷ v².", "u' = 2x, v' = 1."],
      pasos: ["u = x² + 1 → u' = 2x   ·   v = x − 3 → v' = 1", "f'(x) = " + fr("2x(x − 3) − (x² + 1)·1", "(x − 3)²"), "Numerador: 2x² − 6x − x² − 1 = x² − 6x − 1"],
      resultado: "f'(x) = " + fr("x² − 6x − 1", "(x − 3)²") },
    { id: "d7", nivel: 2,
      enunciado: "Deriva f(x) = sen(x² + 1).",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2x cos(x^2+1)" },
      pistas: ["Función de fuera: sen. Función de dentro: x² + 1.", "(sen u)' = cos u · u'."],
      pasos: ["Fuera: sen( ) → cos( ), dejando x² + 1 dentro", "Dentro: (x² + 1)' = 2x", "Multiplicamos: cos(x² + 1)·2x"],
      resultado: "f'(x) = 2x·cos(x² + 1)" },
    { id: "d8", nivel: 2,
      enunciado: "Halla la pendiente y la ecuación de la recta tangente a f(x) = x³ − 3x² + 2 en x = 3.",
      check: [{ tipo: "num", etiqueta: "pendiente m =", valor: 9 }, { tipo: "expr", etiqueta: "tangente: y =", expr: "9x-25", ph: "9x-25" }],
      pistas: ["Necesitas el punto (3, f(3)) y la pendiente f'(3).", "f(3) = 27 − 27 + 2 = 2 y f'(x) = 3x² − 6x."],
      pasos: ["f(3) = 27 − 27 + 2 = 2 → punto de tangencia (3, 2)", "f'(x) = 3x² − 6x → f'(3) = 27 − 18 = 9", "y − 2 = 9(x − 3) → y = 9x − 27 + 2 = 9x − 25"],
      resultado: "m = 9 · tangente: y = 9x − 25" },
    { id: "d9", nivel: 2,
      enunciado: "Halla los puntos donde la gráfica de f(x) = x³ − 12x + 5 tiene tangente horizontal. Escribe los valores de x separados por comas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "por ejemplo: 1, 3" },
      pistas: ["Tangente horizontal significa pendiente 0: f'(x) = 0.", "f'(x) = 3x² − 12."],
      pasos: ["f'(x) = 3x² − 12", "3x² − 12 = 0 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, f(−2)) = (−2, 21) y (2, f(2)) = (2, −11)"],
      resultado: "x = −2 y x = 2" },
    { id: "d10", nivel: 2,
      enunciado: "¿En qué intervalo es creciente la función f(x) = x² − 6x + 5?",
      check: { tipo: "opcion", etiqueta: "Crece en", opciones: ["(−∞, 3)", "(3, +∞)", "(−∞, −3)", "(−3, +∞)"], ok: 1 },
      pistas: ["Una función crece donde f' &gt; 0.", "f'(x) = 2x − 6 &gt; 0 ⇔ x &gt; 3."],
      pasos: ["f'(x) = 2x − 6", "2x − 6 = 0 → x = 3", "f'(0) = −6 &lt; 0 y f'(4) = 2 &gt; 0", "f decrece en (−∞, 3) y crece en (3, +∞); en x = 3 hay un mínimo, f(3) = −4"],
      resultado: "Creciente en (3, +∞)" },
    // ---------- ★★★ (nivel PAU) ----------
    { id: "d11", nivel: 3,
      enunciado: "Halla los valores de a y b para que la función f(x) = x³ + ax² + bx tenga extremos relativos en x = 1 y en x = 2.",
      check: [{ tipo: "num", etiqueta: "a =", valor: -4.5 }, { tipo: "num", etiqueta: "b =", valor: 6 }],
      pistas: ["Si hay extremo en x = 1 y en x = 2, entonces f'(1) = 0 y f'(2) = 0.", "f'(x) = 3x² + 2ax + b. Te quedan dos ecuaciones con a y b."],
      pasos: ["f'(x) = 3x² + 2ax + b", "f'(1) = 0 → 3 + 2a + b = 0", "f'(2) = 0 → 12 + 4a + b = 0", "Restamos la 1ª a la 2ª: 9 + 2a = 0 → a = −9/2 = −4,5", "Sustituimos: b = −3 − 2a = −3 + 9 = 6", "Comprobación: f'(x) = 3x² − 9x + 6 = 3(x − 1)(x − 2) ✓"],
      resultado: "a = −9/2, b = 6" },
    { id: "d12", nivel: 3,
      enunciado: "La gráfica de f(x) = x³ − 3x tiene dos puntos en los que la tangente es paralela a la recta y = 9x − 2. Halla las abscisas de esos puntos.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "dos valores separados por comas" },
      pistas: ["Rectas paralelas tienen la misma pendiente: f'(x) = 9.", "3x² − 3 = 9."],
      pasos: ["Pendiente de la recta dada: 9. Buscamos f'(x) = 9", "f'(x) = 3x² − 3 = 9 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, −2) y (2, 2) (comprobación: f(2) = 8 − 6 = 2)"],
      resultado: "x = −2 y x = 2" },
    { id: "d13", nivel: 3,
      enunciado: "Dos números positivos suman 12. ¿Cuánto vale el menor valor posible de la suma de sus cuadrados? Indica también el valor de x (uno de los números).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 6 }, { tipo: "num", etiqueta: "suma mínima =", valor: 72 }],
      pistas: ["Números x y 12 − x. Función objetivo: S(x) = x² + (12 − x)².", "S'(x) = 2x − 2(12 − x) = 4x − 24."],
      pasos: ["Números x y 12 − x, con 0 &lt; x &lt; 12", "S(x) = x² + (12 − x)² = 2x² − 24x + 144", "S'(x) = 4x − 24 = 0 → x = 6", "S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → mínimo", "S(6) = 36 + 36 = 72"],
      resultado: "x = 6 (los dos números son 6); suma mínima = 72" },
    { id: "d14", nivel: 3,
      enunciado: "Un granjero tiene 120 m de valla para cercar un corral rectangular junto a un río. El lado del río no necesita valla. ¿Qué dimensiones dan el corral de mayor área? ¿Cuál es esa área?",
      check: [{ tipo: "num", etiqueta: "lado perpendicular al río x =", valor: 30, unidad: "m" }, { tipo: "num", etiqueta: "lado paralelo y =", valor: 60, unidad: "m" }, { tipo: "num", etiqueta: "área =", valor: 1800, unidad: "m²" }],
      pistas: ["Hay dos lados de longitud x y uno de longitud y: 2x + y = 120.", "A(x) = x(120 − 2x) = 120x − 2x²."],
      pasos: ["Valla: 2x + y = 120 → y = 120 − 2x, con 0 &lt; x &lt; 60", "Área: A(x) = x·y = x(120 − 2x) = 120x − 2x²", "A'(x) = 120 − 4x = 0 → x = 30, y entonces y = 60", "A' pasa de + a −: es un máximo. A(30) = 30·60 = 1800"],
      resultado: "x = 30 m, y = 60 m · área máxima = 1800 m²",
      ojo: "el enunciado pide el <b>área</b>: no te quedes en x = 30. Responde a lo que preguntan, con unidades." },
    { id: "d15", nivel: 3,
      enunciado: "Para f(x) = " + fr("x", "x² + 1") + ": (a) halla los puntos críticos y (b) decide qué hay en x = 1.",
      check: [{ tipo: "lista", etiqueta: "puntos críticos x =", valores: [-1, 1], ph: "valores separados por comas" }, { tipo: "opcion", etiqueta: "en x = 1 hay un", opciones: ["mínimo relativo", "máximo relativo", "ningún extremo"], ok: 1 }],
      pistas: ["Regla del cociente: f'(x) = ((x² + 1)·1 − x·2x) ÷ (x² + 1)².", "El numerador queda 1 − x²."],
      pasos: ["f'(x) = " + fr("(x² + 1)·1 − x·2x", "(x² + 1)²") + " = " + fr("1 − x²", "(x² + 1)²"), "El denominador es siempre positivo, así que el signo lo da 1 − x²: f'(x) = 0 → x = −1 y x = 1", "Signo: f' &lt; 0 en (−∞, −1), f' &gt; 0 en (−1, 1), f' &lt; 0 en (1, +∞)", "En x = 1 pasa de + a −: <b>máximo</b>, f(1) = 1/2. En x = −1 pasa de − a +: mínimo, f(−1) = −1/2."],
      resultado: "Puntos críticos x = −1 (mínimo) y x = 1 (máximo, f(1) = ½)" },
    { id: "d16", nivel: 3,
      enunciado: "Explica por qué f(x) = x³ cumple f'(0) = 0 y, sin embargo, no tiene ningún máximo ni mínimo en x = 0. Redacta tu respuesta como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Calcula la derivada f'(x) = 3x² y comprueba que f'(0) = 0", p: 0.5 },
        { t: "Estudia el signo de f' a ambos lados de 0 (es positiva en los dos)", p: 0.5 },
        { t: "Concluye que f es creciente a ambos lados, sin cambio de signo, así que no hay máximo ni mínimo", p: 0.5 },
        { t: "Aclara que f'(a) = 0 es condición necesaria pero no suficiente: solo da candidatos", p: 0.5 }
      ] },
      pasos: ["f'(x) = 3x², y f'(0) = 0: x = 0 es un punto crítico.", "Pero 3x² ≥ 0 para todo x: f' es positiva a la izquierda (x &lt; 0) y a la derecha (x &gt; 0) de 0.", "Como f' no cambia de signo en x = 0, la función es creciente a ambos lados y no hay máximo ni mínimo (es un punto de tangente horizontal sin extremo).", "Conclusión general: f'(a) = 0 es condición <em>necesaria</em> para un extremo, pero no <em>suficiente</em>; hay que comprobar el cambio de signo."],
      resultado: "f'(0) = 0 pero f' no cambia de signo → no hay extremo en x = 0." }
  ];

  // ============================================================
  // LÁMINA RESUMEN: bloques nuevos (chuletas que se pueden imprimir)
  // ============================================================
  var lamina = [
    { titulo: "¿Qué regla uso? La última operación manda", ancha: true,
      tabla: { cab: ["Última operación", "Regla", "Ejemplo"], filas: [
        ["Suma o resta", "(f ± g)' = f' ± g'", "x³ + sen x → 3x² + cos x"],
        ["Número · función", "(k·f)' = k·f'", "5x² → 10x"],
        ["Producto", "(f·g)' = f'g + fg'", "x²eˣ → (2x + x²)eˣ"],
        ["Cociente", "(f/g)' = (f'g − fg') ÷ g²", "(x + 1)/(x − 2) → −3/(x − 2)²"],
        ["Función dentro de otra", "Cadena: f'(g)·g'", "sen(3x) → 3cos(3x)"]
      ] },
      nota: "Truco: si se puede simplificar o reescribir como potencia, hazlo antes de derivar." },
    { titulo: "Derivadas con la cadena (u = u(x))", ancha: true,
      tabla: { cab: ["Función", "Derivada"], filas: [
        ["uⁿ", "n·uⁿ⁻¹·u'"], ["eᵘ", "eᵘ·u'"], ["ln u", "u' ÷ u"], ["sen u", "cos u·u'"], ["cos u", "−sen u·u'"],
        ["tg u", "u' ÷ cos²u"], ["√u", "u' ÷ (2√u)"], ["aᵘ", "aᵘ·ln a·u'"]
      ] },
      nota: "Siempre: «la de fuera sin tocar lo de dentro, por la derivada de lo de dentro»." },
    { titulo: "Tangente y normal",
      items: [
        { label: "Tangente en x = a", formula: "y − f(a) = f'(a)·(x − a)", cuando: "«Halla la recta tangente en x = a»", ejemplo: "f = x², a = 1 → y − 1 = 2(x − 1)", ojo: "La pendiente es f'(a), no f(a)." },
        { label: "Normal en x = a", formula: "y − f(a) = " + fr("−1", "f'(a)") + "·(x − a)", cuando: "Perpendicular a la tangente", ojo: "Si f'(a) = 0 la normal es vertical: x = a." },
        { label: "Tangente con una condición", formula: "f'(x) = m", cuando: "Paralela a y = mx + n (misma pendiente)", ejemplo: "Perpendicular a esa recta: f'(x) = −1/m." }
      ] },
    { titulo: "Monotonía y extremos en 5 pasos",
      pasos: ["Dominio de f.", "Calcula f'(x).", "Resuelve f'(x) = 0 (puntos críticos).", "Tabla de signos de f' con un valor de prueba por intervalo.", "f' &gt; 0: crece · f' &lt; 0: decrece · de + a −: <b>máximo</b> · de − a +: <b>mínimo</b>. Da también la coordenada y."],
      nota: "f'(a) = 0 no basta: x³ tiene f'(0) = 0 y no tiene extremo." },
    { titulo: "Optimización en 5 pasos",
      pasos: ["Dibuja y nombra las incógnitas.", "Escribe la función objetivo (lo que se maximiza o minimiza).", "Usa la condición del enunciado para dejarla en una sola variable.", "Deriva, iguala a 0, comprueba máximo o mínimo y el dominio.", "Responde a lo que pregunten, con unidades."],
      nota: "Clásicos: rectángulo de perímetro fijo → cuadrado; caja de volumen fijo → mínimo material." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(x²·eˣ)' = 2x·eˣ", bien: "(x²·eˣ)' = 2x·eˣ + x²·eˣ", por: "El producto no se deriva factor a factor." },
        { mal: "(sen 3x)' = cos 3x", bien: "(sen 3x)' = 3·cos 3x", por: "Falta multiplicar por la derivada de lo de dentro." },
        { mal: "(5x² + 7)' = 10x + 7", bien: "(5x² + 7)' = 10x", por: "La derivada de una constante es 0." },
        { mal: "f'(0) = 0 ⇒ hay un extremo en 0", bien: "Solo si f' cambia de signo", por: "Contraejemplo: f(x) = x³." },
        { mal: "Tangente a x² en 3: y − 3 = 6(x − 3)", bien: "y − 9 = 6(x − 3)", por: "El punto es (3, f(3)), no (3, 3)." }
      ] }
  ];

  var resumen = [
    "f'(a) es la <b>pendiente de la tangente</b> en a: el límite de la TVM cuando h → 0.",
    "Qué regla usar: mira la <b>última operación</b> (suma, producto, cociente o cadena).",
    "Tangente en a: <b>y − f(a) = f'(a)·(x − a)</b>.",
    "f' &gt; 0 crece · f' &lt; 0 decrece · extremo si f' <b>cambia de signo</b>.",
    "Optimización: función objetivo en una variable → derivar → comprobar."
  ];


  // ---------------- ejercicios ampliados (d17–d51) ----------------
  ejercicios.push(
    // ===== ★ básico =====
    { id: "d17", nivel: 1,
      enunciado: "Calcula la tasa de variación media de f(x) = x³ en el intervalo [−1, 2].",
      check: { tipo: "num", etiqueta: "TVM =", valor: 3 },
      pistas: ["f(−1) = −1 y f(2) = 8."],
      pasos: ["TVM = (8 − (−1))/(2 − (−1)) = 9/3 = 3."], resultado: "3" },
    { id: "d18", nivel: 1,
      enunciado: "Deriva f(x) = 6x⁵ − x³/3 + 2/x.",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "30x^4 - x^2 - 2/x^2", ph: "por ejemplo 30x^4 - ..." },
      pistas: ["Escribe 2/x como 2x⁻¹.", "x³/3 = (1/3)x³."],
      pasos: ["6x⁵ → 30x⁴ · −x³/3 → −x² · 2/x = 2x⁻¹ → −2x⁻² = −2/x²."], resultado: "f′(x) = 30x⁴ − x² − 2/x²" },
    { id: "d19", nivel: 1,
      enunciado: "Calcula por la definición f′(1) para f(x) = x² + 3x.",
      check: { tipo: "num", etiqueta: "f′(1) =", valor: 5 },
      pistas: ["f(1 + h) − f(1) = (1 + h)² + 3(1 + h) − 4."],
      pasos: ["f(1) = 4. f(1 + h) = 1 + 2h + h² + 3 + 3h = 4 + 5h + h².", "(f(1 + h) − f(1))/h = 5 + h → 5."], resultado: "5" },
    { id: "d20", nivel: 1,
      enunciado: "Deriva f(x) = x·eˣ.",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "(1+x)e^x", ph: "por ejemplo (1+x)e^x" },
      pistas: ["Regla del producto."],
      pasos: ["f′ = 1·eˣ + x·eˣ = (1 + x)eˣ."], resultado: "f′(x) = (1 + x)eˣ" },
    { id: "d21", nivel: 1,
      enunciado: "Deriva f(x) = ln(x² + 4).",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "2x/(x^2+4)", ph: "una fracción en x" },
      pistas: ["(ln u)′ = u′/u."],
      pasos: ["u = x² + 4, u′ = 2x → f′ = 2x/(x² + 4)."], resultado: "f′(x) = 2x/(x² + 4)" },
    { id: "d22", nivel: 1,
      enunciado: "Halla la pendiente de la tangente a y = √x en x = 9 (como número decimal o fracción).",
      check: { tipo: "num", etiqueta: "m =", valor: 1 / 6 },
      pistas: ["f′(x) = 1/(2√x)."],
      pasos: ["f′(9) = 1/(2·3) = 1/6."], resultado: "1/6 ≈ 0,1667" },
    { id: "d23", nivel: 1,
      enunciado: "¿En qué punto tiene tangente horizontal la parábola f(x) = x² − 6x + 1?",
      check: { tipo: "num", etiqueta: "x =", valor: 3 },
      pistas: ["Tangente horizontal: f′(x) = 0."],
      pasos: ["f′(x) = 2x − 6 = 0 → x = 3. (Es el vértice.)"], resultado: "x = 3" },

    // ===== ★★ medio =====
    { id: "d24", nivel: 2,
      enunciado: "Deriva f(x) = (x² − 1)/(x² + 1) y simplifica.",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "4x/(x^2+1)^2", ph: "una fracción en x" },
      pistas: ["(u′v − uv′)/v²."],
      pasos: ["u = x² − 1, v = x² + 1: [2x(x² + 1) − (x² − 1)2x]/(x² + 1)².", "Numerador: 2x³ + 2x − 2x³ + 2x = 4x."], resultado: "f′(x) = 4x/(x² + 1)²" },
    { id: "d25", nivel: 2,
      enunciado: "Deriva f(x) = sen²(3x) y simplifica con el seno del ángulo doble.",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "3sin(6x)", ph: "por ejemplo 3sin(6x)" },
      pistas: ["Cadena de tres capas: ( )², sen, 3x."],
      pasos: ["f′ = 2 sen(3x)·cos(3x)·3 = 6 sen 3x cos 3x = 3 sen 6x."], resultado: "f′(x) = 3 sen 6x" },
    { id: "d26", nivel: 2,
      enunciado: "Deriva f(x) = x²·e⁻ˣ.",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "(2x-x^2)e^(-x)", ph: "por ejemplo (2x-x^2)e^(-x)" },
      pistas: ["Producto: u = x², v = e⁻ˣ con v′ = −e⁻ˣ."],
      pasos: ["f′ = 2x·e⁻ˣ + x²·(−e⁻ˣ) = (2x − x²)e⁻ˣ."], resultado: "f′(x) = (2x − x²)e⁻ˣ" },
    { id: "d27", nivel: 2,
      enunciado: "Deriva f(x) = √(x² + 1).",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "x/sqrt(x^2+1)", ph: "una fracción con raíz" },
      pistas: ["(√u)′ = u′/(2√u)."],
      pasos: ["u′ = 2x → 2x/(2√(x² + 1)) = x/√(x² + 1)."], resultado: "f′(x) = x/√(x² + 1)" },
    { id: "d28", nivel: 2,
      enunciado: "Halla la recta tangente a f(x) = x²·ln x en x = 1 (y = mx + n).",
      check: [{ tipo: "num", etiqueta: "m =", valor: 1 }, { tipo: "num", etiqueta: "n =", valor: -1 }],
      pistas: ["f(1) = 0. f′(x) = 2x ln x + x."],
      pasos: ["f′(1) = 0 + 1 = 1.", "y − 0 = 1·(x − 1) → y = x − 1."], resultado: "y = x − 1" },
    { id: "d29", nivel: 2,
      enunciado: "¿En qué punto de f(x) = x² − 2x la tangente es paralela a y = 4x + 3? Da la abscisa x del punto y la ordenada en el origen n de esa tangente (y = 4x + n).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 3 }, { tipo: "num", etiqueta: "n =", valor: -9 }],
      pistas: ["f′(x) = 4."],
      pasos: ["2x − 2 = 4 → x = 3; f(3) = 3.", "y − 3 = 4(x − 3) → y = 4x − 9."], resultado: "x = 3 · y = 4x − 9" },
    { id: "d30", nivel: 2,
      enunciado: "Halla la recta normal a f(x) = eˣ en x = 0 (y = mx + n).",
      check: [{ tipo: "num", etiqueta: "m =", valor: -1 }, { tipo: "num", etiqueta: "n =", valor: 1 }],
      pistas: ["f(0) = 1, f′(0) = 1: la normal tiene pendiente −1."],
      pasos: ["y − 1 = −1·(x − 0) → y = −x + 1."], resultado: "y = −x + 1" },
    { id: "d31", nivel: 2,
      enunciado: "Halla el valor del máximo relativo y el del mínimo relativo de f(x) = x³ − 12x.",
      check: [{ tipo: "num", etiqueta: "valor del máximo =", valor: 16 }, { tipo: "num", etiqueta: "valor del mínimo =", valor: -16 }],
      pistas: ["f′(x) = 3x² − 12 = 0 → x = ±2."],
      pasos: ["f′ &gt; 0 en (−∞, −2) y (2, +∞); &lt; 0 en (−2, 2).", "Máximo en x = −2: f(−2) = −8 + 24 = 16. Mínimo en x = 2: f(2) = 8 − 24 = −16."], resultado: "máximo 16 · mínimo −16" },
    { id: "d32", nivel: 2,
      enunciado: "Halla el valor mínimo de f(x) = x·eˣ (da un decimal con 4 cifras).",
      check: { tipo: "num", etiqueta: "mínimo =", valor: -0.3679 },
      pistas: ["f′(x) = (1 + x)eˣ = 0 → x = −1."],
      pasos: ["f′ &lt; 0 si x &lt; −1 y &gt; 0 si x &gt; −1: mínimo en x = −1.", "f(−1) = −e⁻¹ = −0,3679."], resultado: "−1/e ≈ −0,3679" },
    { id: "d33", nivel: 2,
      enunciado: "Halla a y b para que f(x) = { ax² + b si x &lt; 1 ; 2x + 3 si x ≥ 1 } sea derivable en x = 1.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 1 }, { tipo: "num", etiqueta: "b =", valor: 4 }],
      pistas: ["Continuidad: a + b = 2·1 + 3. Derivadas: 2a = 2."],
      pasos: ["Derivadas laterales: 2a = 2 → a = 1.", "Continuidad: a + b = 5 → b = 4."], resultado: "a = 1, b = 4" },
    { id: "d34", nivel: 2,
      enunciado: "Halla a y b para que f(x) = { x³ + ax si x ≤ 1 ; bx² + 2 si x &gt; 1 } sea derivable en x = 1.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 5 }, { tipo: "num", etiqueta: "b =", valor: 4 }],
      pistas: ["Continuidad: 1 + a = b + 2. Derivadas: 3 + a = 2b."],
      pasos: ["De la primera, a = b + 1. En la segunda: 3 + b + 1 = 2b → b = 4.", "a = 5."], resultado: "a = 5, b = 4" },
    { id: "d35", nivel: 2,
      enunciado: "Una caja abierta de base cuadrada debe tener 500 cm³. Halla el lado de la base x, la altura h y la superficie mínima S.",
      check: [{ tipo: "num", etiqueta: "x (cm) =", valor: 10 }, { tipo: "num", etiqueta: "h (cm) =", valor: 5 }, { tipo: "num", etiqueta: "S (cm²) =", valor: 300 }],
      pistas: ["x²h = 500 → h = 500/x². S = x² + 4xh = x² + 2000/x."],
      pasos: ["S′ = 2x − 2000/x² = 0 → x³ = 1000 → x = 10.", "h = 500/100 = 5. S = 100 + 200 = 300."], resultado: "10 cm, 5 cm, 300 cm²" },
    { id: "d36", nivel: 2,
      enunciado: "Halla dos números positivos x e y con x + y = 20 tales que x²·y sea máximo. Da x e y (con dos decimales).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 13.33 }, { tipo: "num", etiqueta: "y =", valor: 6.67 }],
      pistas: ["P(x) = x²(20 − x) = 20x² − x³."],
      pasos: ["P′(x) = 40x − 3x² = x(40 − 3x) = 0 → x = 40/3 = 13,33 (x = 0 da P = 0, mínimo).", "y = 20 − 40/3 = 20/3 = 6,67."], resultado: "x = 40/3, y = 20/3" },
    { id: "d37", nivel: 2,
      enunciado: "Se quiere cercar un jardín rectangular de 800 m² con la menor cantidad de valla posible. Halla el lado x y el perímetro mínimo.",
      check: [{ tipo: "num", etiqueta: "lado x (m) =", valor: 28.28 }, { tipo: "num", etiqueta: "perímetro (m) =", valor: 113.14 }],
      pistas: ["Lados x e y = 800/x. Perímetro P = 2x + 1600/x."],
      pasos: ["P′ = 2 − 1600/x² = 0 → x² = 800 → x = 28,28.", "Es un cuadrado: P = 4·28,28 = 113,14 m."], resultado: "28,28 m · 113,14 m" },
    { id: "d38", nivel: 2,
      enunciado: "El coste de fabricar x unidades es C(x) = 0,5x² + 20x + 800 €. ¿Para qué x es mínimo el coste medio por unidad y cuánto vale entonces?",
      check: [{ tipo: "num", etiqueta: "x =", valor: 40 }, { tipo: "num", etiqueta: "coste medio mínimo (€/unidad) =", valor: 60 }],
      pistas: ["M(x) = C(x)/x = 0,5x + 20 + 800/x."],
      pasos: ["M′(x) = 0,5 − 800/x² = 0 → x² = 1600 → x = 40.", "M(40) = 20 + 20 + 20 = 60."], resultado: "x = 40 · 60 €/unidad" },
    { id: "d39", nivel: 2,
      enunciado: "Usa la aproximación lineal de f(x) = ∛x en a = 8 para estimar ∛8,12 (da el resultado con dos decimales).",
      check: { tipo: "num", etiqueta: "∛8,12 ≈", valor: 2.01 },
      pistas: ["f′(x) = 1/(3·∛(x²)) → f′(8) = 1/12."],
      pasos: ["f(8.12) ≈ 2 + (1/12)·0,12 = 2 + 0,01 = 2,01.", "(Valor exacto: 2,00998.)"], resultado: "≈ 2,01" },
    { id: "d40", nivel: 2,
      enunciado: "Aproxima ln 1,05 con la tangente de ln x en a = 1.",
      check: { tipo: "num", etiqueta: "ln 1,05 ≈", valor: 0.05 },
      pistas: ["ln 1 = 0 y f′(1) = 1."],
      pasos: ["ln(1 + 0,05) ≈ 0 + 1·0,05 = 0,05. (Exacto: 0,04879.)"], resultado: "≈ 0,05" },
    { id: "d41", nivel: 2,
      enunciado: "Halla el valor de c que da el teorema del valor medio para f(x) = x³ en [0, 3] (con tres decimales).",
      check: { tipo: "num", etiqueta: "c =", valor: 1.732 },
      pistas: ["La pendiente media es (27 − 0)/3 = 9. Resuelve f′(c) = 9."],
      pasos: ["3c² = 9 → c² = 3 → c = √3 = 1,732 (−√3 queda fuera de (0, 3))."], resultado: "c = √3 ≈ 1,732" },
    { id: "d42", nivel: 2,
      enunciado: "Halla las abscisas de los puntos de inflexión de f(x) = x⁴ − 6x².",
      check: { tipo: "lista", etiqueta: "x =", valores: [-1, 1], ph: "dos valores" },
      pistas: ["f″(x) = 12x² − 12."],
      pasos: ["f″ = 12(x² − 1) = 0 → x = ±1. f″ cambia de signo en los dos: inflexión en x = −1 y x = 1."], resultado: "x = −1 y x = 1" },
    { id: "d43", nivel: 2,
      enunciado: "Halla el punto de inflexión de f(x) = x³ − 3x² (abscisa y ordenada).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 1 }, { tipo: "num", etiqueta: "y =", valor: -2 }],
      pistas: ["f″(x) = 6x − 6."],
      pasos: ["f″ = 0 → x = 1 (con cambio de signo).", "f(1) = 1 − 3 = −2. Punto (1, −2)."], resultado: "(1, −2)" },

    // ===== ★★★ avanzado =====
    { id: "d44", nivel: 3,
      enunciado: "Para f(x) = x + 1/x halla la abscisa y la ordenada del mínimo relativo (en x &gt; 0).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 1 }, { tipo: "num", etiqueta: "y =", valor: 2 }],
      pistas: ["f′(x) = 1 − 1/x²."],
      pasos: ["1 − 1/x² = 0 → x = ±1. Para x &gt; 0: x = 1.", "f″(x) = 2/x³ → f″(1) = 2 &gt; 0: mínimo. f(1) = 2."], resultado: "mínimo en (1, 2)" },
    { id: "d45", nivel: 3,
      enunciado: "Calcula f′(1) para f(x) = x<sup>2x</sup> (derivación logarítmica).",
      check: { tipo: "num", etiqueta: "f′(1) =", valor: 2 },
      pistas: ["ln f = 2x·ln x. Deriva los dos lados."],
      pasos: ["f′/f = 2 ln x + 2x·(1/x) = 2 ln x + 2.", "f′(x) = x<sup>2x</sup>(2 ln x + 2) → f′(1) = 1·(0 + 2) = 2."], resultado: "2" },
    { id: "d46", nivel: 3,
      enunciado: "Deriva f(x) = arctan(3x).",
      check: { tipo: "expr", etiqueta: "f′(x) =", expr: "3/(1+9x^2)", ph: "una fracción en x" },
      pistas: ["(arctan u)′ = u′/(1 + u²)."],
      pasos: ["u = 3x, u′ = 3 → 3/(1 + 9x²)."], resultado: "f′(x) = 3/(1 + 9x²)" },
    { id: "d47", nivel: 3,
      enunciado: "La posición de un móvil es s(t) = t³ − 9t² + 24t (m, t en s). Halla los dos instantes en que se detiene y la aceleración en el primero de ellos.",
      check: [{ tipo: "lista", etiqueta: "instantes t =", valores: [2, 4], ph: "dos valores" }, { tipo: "num", etiqueta: "a en el primer instante =", valor: -6 }],
      pistas: ["Se detiene cuando v = s′ = 0."],
      pasos: ["v(t) = 3t² − 18t + 24 = 3(t − 2)(t − 4) → t = 2 y t = 4.", "a(t) = v′(t) = 6t − 18 → a(2) = −6 m/s²."], resultado: "t = 2 s y t = 4 s · a(2) = −6 m/s²" },
    { id: "d48", nivel: 3,
      enunciado: "La concentración de un fármaco es C(t) = 10t·e^(−t/4) (mg/L, t en h). Halla cuándo es máxima y su valor (con dos decimales).",
      check: [{ tipo: "num", etiqueta: "t (h) =", valor: 4 }, { tipo: "num", etiqueta: "C máxima (mg/L) =", valor: 14.72 }],
      pistas: ["C′(t) = 10e^(−t/4)(1 − t/4)."],
      pasos: ["C′ = 0 → t = 4 h (antes C′ &gt; 0, después C′ &lt; 0: máximo).", "C(4) = 40e⁻¹ = 14,72 mg/L."], resultado: "t = 4 h · C = 40/e ≈ 14,72 mg/L" },
    { id: "d49", nivel: 3,
      enunciado: "Haz el estudio completo (cortes, crecimiento y extremos, curvatura e inflexión) de f(x) = x³ − 3x².",
      check: { tipo: "rubrica", etiqueta: "Tu estudio", filas: 9, items: [
        { t: "Dominio ℝ. Cortes: f(0) = 0 y x²(x − 3) = 0 → x = 0 (doble) y x = 3", p: 0.5 },
        { t: "f′(x) = 3x² − 6x = 3x(x − 2): crece en (−∞, 0) ∪ (2, +∞), decrece en (0, 2)", p: 0.5 },
        { t: "Máximo relativo (0, 0) y mínimo relativo (2, −4)", p: 0.5 },
        { t: "f″(x) = 6x − 6: curvada hacia abajo en (−∞, 1) y hacia arriba en (1, +∞)", p: 0.5 },
        { t: "Punto de inflexión (1, −2)", p: 0.5 }
      ] },
      pasos: ["f(x) = x²(x − 3): cortes en 0 (doble) y 3.", "f′ = 3x(x − 2): puntos críticos 0 y 2; máx (0, 0), mín (2, −4).", "f″ = 6(x − 1): inflexión en (1, −2)."], resultado: "Máx (0, 0) · mín (2, −4) · inflexión (1, −2)" },
    { id: "d50", nivel: 3,
      enunciado: "Demuestra que si f es derivable en a entonces es continua en a.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe f(a + h) − f(a) = [(f(a + h) − f(a))/h]·h para h ≠ 0", p: 0.5 },
        { t: "Aplica límites: el primer factor tiende a f′(a) (existe y es finito) y h → 0", p: 0.5 },
        { t: "Concluye lím(f(a + h) − f(a)) = f′(a)·0 = 0", p: 0.5 },
        { t: "Deduce lím f(a + h) = f(a): f es continua en a", p: 0.5 }
      ] },
      pasos: ["f(a + h) − f(a) = [(f(a + h) − f(a))/h]·h.", "Cuando h → 0, el corchete → f′(a) y h → 0, luego el producto → 0.", "Entonces f(a + h) → f(a): f es continua en a. ∎"], resultado: "Derivable ⇒ continua" },
    { id: "d51", nivel: 3,
      enunciado: "Calcula por la definición la derivada de f(x) = √(x + 1) en a = 3.",
      check: { tipo: "num", etiqueta: "f′(3) =", valor: 0.25 },
      pistas: ["Multiplica por el conjugado √(4 + h) + 2."],
      pasos: ["f(3 + h) − f(3) = √(4 + h) − 2. Conjugado: h/(√(4 + h) + 2).", "Dividiendo entre h: 1/(√(4 + h) + 2) → 1/4."], resultado: "1/4" }
  );

  lamina.push(
    { titulo: "Derivabilidad de funciones a trozos",
      pasos: ["Comprueba que es <b>continua</b> en el punto de unión (valor izquierdo = derecho = f(c)).", "Calcula la derivada de cada trozo y evalúala en c.", "Si las dos <b>derivadas laterales coinciden</b>, es derivable.", "Con parámetros: continuidad + igualdad de derivadas = sistema de ecuaciones."],
      nota: "Derivable ⇒ continua; continua no implica derivable (punto anguloso |x|, cúspide, tangente vertical)." },
    { titulo: "Segunda derivada y curvatura",
      items: [
        { label: "Curvatura", formula: "f″ &gt; 0: ∪ (hacia arriba) · f″ &lt; 0: ∩ (hacia abajo)" },
        { label: "Punto de inflexión", formula: "f″ cambia de signo", ojo: "f″ = 0 no basta (x⁴)." },
        { label: "Criterio de extremos", formula: "f′(a) = 0 y f″(a) &gt; 0 ⇒ mínimo; f″(a) &lt; 0 ⇒ máximo", cuando: "Si f″(a) = 0 no concluye." }
      ] },
    { titulo: "Estudio completo de una función", ancha: true,
      pasos: ["Dominio y cortes con los ejes.", "Simetría (par/impar) y periodicidad.", "Asíntotas verticales, horizontales y oblicuas.", "f′: crecimiento y extremos relativos.", "f″: curvatura y puntos de inflexión.", "Tabla resumen y gráfica."],
      nota: "Extremos absolutos en [a, b]: comparar los puntos críticos con los extremos del intervalo." },
    { titulo: "Más derivadas y derivación logarítmica",
      items: [
        { label: "Otras elementales", formula: "(aˣ)′ = aˣ ln a · (logₐ x)′ = 1/(x ln a) · (arctan x)′ = 1/(1 + x²) · (arcsen x)′ = 1/√(1 − x²)" },
        { label: "Base y exponente variables", formula: "(g<sup>h</sup>)′ = g<sup>h</sup>(h′ ln g + h g′/g)", ejemplo: "(xˣ)′ = xˣ(ln x + 1)" },
        { label: "Valor absoluto", formula: "(|u|)′ = u′·u/|u|", ojo: "No existe donde u = 0." }
      ] },
    { titulo: "Aproximación lineal y valor medio",
      items: [
        { label: "Aproximación lineal", formula: "f(a + h) ≈ f(a) + f′(a)·h", ejemplo: "√4,1 ≈ 2 + 0,1/4 = 2,025" },
        { label: "Teorema del valor medio", formula: "∃c ∈ (a, b): f′(c) = [f(b) − f(a)]/(b − a)", cuando: "f continua en [a, b] y derivable en (a, b)." },
        { label: "Teorema de Rolle", formula: "f(a) = f(b) ⇒ ∃c: f′(c) = 0" }
      ] },
    { titulo: "La derivada en las ciencias",
      items: [
        { label: "Velocidad y aceleración", formula: "v = s′(t) · a = v′(t) = s″(t)" },
        { label: "Coste marginal", formula: "C′(x) ≈ C(x + 1) − C(x)" },
        { label: "Crecimiento exponencial", formula: "N = N₀e^(kt) ⇒ N′ = k·N", ejemplo: "La velocidad de crecimiento es proporcional a la población." }
      ] }
  );
  resumen.push(
    "Derivable ⇒ continua. A trozos: <b>continuidad + derivadas laterales iguales</b> en el punto de unión.",
    "f″ &gt; 0: curvada hacia arriba (∪); f″ &lt; 0: hacia abajo (∩); inflexión donde f″ cambia de signo. Criterio: f′ = 0 y f″ &gt; 0 ⇒ mínimo.",
    "Extremos absolutos en [a, b]: comparar puntos críticos y extremos del intervalo.",
    "Aproximación lineal: f(a + h) ≈ f(a) + f′(a)·h · Valor medio: f′(c) = (f(b) − f(a))/(b − a).",
    "Derivación logarítmica para g<sup>h</sup>: (xˣ)′ = xˣ(ln x + 1). Velocidad = s′, aceleración = s″."
  );

  B.registrar("mates1", "t11", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

  // ============================================================
  // SIMULACRO NUEVO: monográfico de derivadas (5 bloques × 2 puntos)
  // ============================================================
  B.registrarSimulacros("mates1", [{
    id: "sim8", titulo: "Simulacro 8 · Derivadas", tipo: "ciencias",
    bloques: [
      { titulo: "Derivada por la definición", puntos: 2,
        enunciado: "Calcula, usando la definición de derivada, f'(2) para f(x) = 3x² − x.",
        solucion: "f'(2) = lim<sub>h→0</sub> [f(2 + h) − f(2)]/h. f(2) = 12 − 2 = 10. f(2 + h) = 3(2 + h)² − (2 + h) = 12 + 12h + 3h² − 2 − h = 10 + 11h + 3h². Entonces f(2 + h) − f(2) = 11h + 3h², y dividiendo entre h: 11 + 3h. Cuando h → 0, el límite es 11. Por tanto f'(2) = 11 (coincide con la regla: f'(x) = 6x − 1, f'(2) = 11)." },
      { titulo: "Reglas de derivación", puntos: 2,
        enunciado: "Deriva: a) f(x) = (3x² − 1)·eˣ  b) g(x) = ln(x² + 1)  c) h(x) = (x² + 1)/(x + 2).",
        solucion: "a) Producto: f'(x) = 6x·eˣ + (3x² − 1)eˣ = (3x² + 6x − 1)eˣ. b) Cadena: g'(x) = 2x/(x² + 1). c) Cociente: h'(x) = [2x(x + 2) − (x² + 1)·1]/(x + 2)² = (2x² + 4x − x² − 1)/(x + 2)² = (x² + 4x − 1)/(x + 2)²." },
      { titulo: "Tangente y normal", puntos: 2,
        enunciado: "Halla la ecuación de la recta tangente y la de la recta normal a f(x) = x² − 3x + 1 en el punto de abscisa x = 1.",
        solucion: "f(1) = 1 − 3 + 1 = −1, así que el punto es (1, −1). f'(x) = 2x − 3, luego f'(1) = −1. Tangente: y + 1 = −1·(x − 1) → y = −x. Normal: pendiente 1/1 = 1 (opuesta de la inversa de −1): y + 1 = 1·(x − 1) → y = x − 2." },
      { titulo: "Monotonía y extremos", puntos: 2,
        enunciado: "Estudia el crecimiento y decrecimiento de f(x) = x³ − 6x² + 9x + 1 y calcula sus máximos y mínimos relativos.",
        solucion: "f'(x) = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3). Puntos críticos: x = 1 y x = 3. Signo de f': positivo en (−∞, 1), negativo en (1, 3), positivo en (3, +∞). Por tanto f crece en (−∞, 1) ∪ (3, +∞) y decrece en (1, 3). En x = 1 hay un máximo relativo, f(1) = 1 − 6 + 9 + 1 = 5, es decir (1, 5). En x = 3 hay un mínimo relativo, f(3) = 27 − 54 + 27 + 1 = 1, es decir (3, 1)." },
      { titulo: "Optimización", puntos: 2,
        enunciado: "Se quiere construir una caja sin tapa, de base cuadrada y volumen 32 m³. Halla las dimensiones que minimizan la cantidad de material (superficie).",
        solucion: "Sea x el lado de la base y h la altura. Volumen: x²h = 32 → h = 32/x². Superficie (base + 4 caras laterales): S(x) = x² + 4xh = x² + 128/x, con x > 0. S'(x) = 2x − 128/x² = 0 → x³ = 64 → x = 4. S' < 0 si x < 4 y S' > 0 si x > 4: mínimo. Entonces h = 32/16 = 2. La caja de menor superficie tiene base 4 × 4 m y altura 2 m, con S = 16 + 32 = 48 m²." }
    ]
  }]);

})(window);
