/* ============================================================
   Matemáticas I · ampliaciones · Tema 5: Fórmulas trigonométricas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t5/" + ref); }

  var resumen = [
    "<b>Suma y diferencia</b>: sen(a ± b) = sen a·cos b ± cos a·sen b · cos(a ± b) = cos a·cos b ∓ sen a·sen b. Con ellas se sacan <b>todas</b> las demás.",
    "<b>Ángulo doble</b>: sen 2a = 2·sen a·cos a · cos 2a = cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a.",
    "<b>Ángulo mitad</b>: sen(a/2) = ±√((1 − cos a)/2) · cos(a/2) = ±√((1 + cos a)/2). El signo lo decide el cuadrante de a/2.",
    "Una <b>ecuación</b> trigonométrica tiene infinitas soluciones (+360°·n); en un examen se piden las de [0°, 360°).",
    "Una <b>identidad</b> se demuestra transformando <i>un</i> lado hasta llegar al otro (nunca «pasando cosas» de un lado a otro).",
    "Técnicas: factor común (sin dividir entre sen o cos), cambio de variable t = sen x, ángulo doble, pasar sumas a productos."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Suma y diferencia
  secciones[0] =
    "<h5>De dónde sale: la distancia entre dos puntos de la circunferencia</h5>" +
    "<p>Las fórmulas de suma no son una invención: se deducen con lo que ya sabes. Dibuja en la circunferencia goniométrica dos puntos, P = (cos a, sen a) y Q = (cos b, sen b). Calculamos su distancia al cuadrado de dos formas:</p>" +
    "<ul><li><b>Con las coordenadas</b>: |PQ|² = (cos a − cos b)² + (sen a − sen b)² = (cos²a + sen²a) + (cos²b + sen²b) − 2(cos a·cos b + sen a·sen b) = 2 − 2(cos a·cos b + sen a·sen b).</li>" +
    "<li><b>Con el teorema del coseno</b> en el triángulo OPQ (dos lados de longitud 1 que forman el ángulo a − b): |PQ|² = 1 + 1 − 2·1·1·cos(a − b) = 2 − 2·cos(a − b).</li></ul>" +
    "<p>Igualando: <b>cos(a − b) = cos a·cos b + sen a·sen b</b>. El resto se deduce en cadena:</p>" +
    "<ul><li>Cambiando b por −b (cos(−b) = cos b y sen(−b) = −sen b): <b>cos(a + b) = cos a·cos b − sen a·sen b</b>.</li>" +
    "<li>Como sen x = cos(90° − x): sen(a + b) = cos(90° − a − b) = cos((90° − a) − b) = cos(90° − a)·cos b + sen(90° − a)·sen b = <b>sen a·cos b + cos a·sen b</b>.</li>" +
    "<li>Cambiando b por −b: <b>sen(a − b) = sen a·cos b − cos a·sen b</b>.</li>" +
    "<li>Dividiendo sen(a + b) entre cos(a + b) y dividiendo todo entre cos a·cos b: <b>tan(a + b) = (tan a + tan b)/(1 − tan a·tan b)</b>.</li></ul>" +
    "<p>Moraleja práctica: de memoria sólo hacen falta <b>las dos primeras</b>, la del coseno de la suma y la del seno de la suma; todas las demás se deducen. Comprueba con números que las fórmulas funcionan (y que las «falsas» tentadoras no):</p>" +
    w("formulas") +
    "<h5>Cómo recordar los signos</h5>" +
    "<p>En el <b>seno</b> el signo del medio es el <i>mismo</i> que el de dentro del paréntesis (sen(a + b) lleva +, sen(a − b) lleva −). En el <b>coseno</b> el signo del medio es el <i>contrario</i> (cos(a + b) lleva −, cos(a − b) lleva +). En la tangente, el numerador conserva el signo y el denominador lo cambia.</p>" +
    "<h5>Ángulos que se descomponen en notables</h5>" +
    ejemplo("Valores exactos de 75°, 15° y 105°", "Calcula sen 75°, cos 15° y tan 105° sin calculadora.", [
      "<b>sen 75°</b> = sen(45° + 30°) = sen 45°·cos 30° + cos 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ <b>0,9659</b>.",
      "<b>cos 15°</b> = cos(45° − 30°) = cos 45°·cos 30° + sen 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4. Es el mismo valor que sen 75°, como debe ser (75° y 15° son complementarios).",
      "<b>tan 105°</b> = tan(60° + 45°) = (√3 + 1)/(1 − √3·1) = (√3 + 1)/(1 − √3). Multiplicamos arriba y abajo por (1 + √3): (√3 + 1)²/(1 − 3) = (4 + 2√3)/(−2) = <b>−(2 + √3) ≈ −3,732</b> (negativa porque 105° está en el 2.º cuadrante)."
    ]) +
    ejemplo("Conozco otras razones", "Si sen a = 4/5 (a en el 2.º cuadrante) y cos b = −12/13 (b en el 3.er cuadrante), calcula sen(a − b) y cos(a + b).", [
      "Primero se completan las razones que faltan, con la relación fundamental y los signos de cada cuadrante: cos a = −3/5 (2.º cuadrante) y sen b = −5/13 (3.er cuadrante).",
      "sen(a − b) = sen a·cos b − cos a·sen b = (4/5)(−12/13) − (−3/5)(−5/13) = −48/65 − 15/65 = <b>−63/65</b>.",
      "cos(a + b) = cos a·cos b − sen a·sen b = (−3/5)(−12/13) − (4/5)(−5/13) = 36/65 + 20/65 = <b>56/65</b>.",
      "Comprobación con la calculadora: a = 126,87° y b = 202,62°, así que a − b = −75,75° y a + b = 329,49°; sen(−75,75°) = −0,9692 = −63/65 ✓ y cos 329,49° = 0,8615 = 56/65 ✓."
    ]) +
    ojo("sen(a + b) <b>no</b> es sen a + sen b. Por ejemplo, sen(30° + 60°) = sen 90° = 1, pero sen 30° + sen 60° = 0,5 + 0,866 = 1,366. Y el coseno de una suma no es la suma de cosenos. La <b>suma</b> de ángulos entra en las fórmulas, no los separa.") +
    "<h5>Consecuencias inmediatas (las reducciones del Tema 4)</h5>" +
    "<p>Si en las fórmulas pones ángulos como 90° o 180°, recuperas las identidades del tema anterior: sen(x + 90°) = sen x·cos 90° + cos x·sen 90° = cos x, y sen(180° − x) = sen 180°·cos x − cos 180°·sen x = sen x. Por eso <b>no tienes que memorizar</b> las tablas de reducción: salen de aquí.</p>";

  // ---------------------------------------------------------------- 2. Ángulo doble
  secciones[1] =
    "<h5>Es la fórmula de la suma con b = a</h5>" +
    "<p>Si en sen(a + b) pones b = a: sen 2a = sen a·cos a + cos a·sen a = <b>2·sen a·cos a</b>. Y en cos(a + b): cos 2a = cos²a − sen²a. Usando sen²a + cos²a = 1 hay dos formas más de escribirlo: cambiando sen²a = 1 − cos²a queda <b>2cos²a − 1</b>, y cambiando cos²a = 1 − sen²a queda <b>1 − 2sen²a</b>. La tangente sale de la fórmula de la suma: tan 2a = 2·tan a/(1 − tan²a).</p>" +
    ejemplo("Conozco una razón y quiero el doble", "Si sen a = 5/13 y a es agudo, calcula sen 2a, cos 2a y tan 2a.", [
      "cos a = √(1 − 25/169) = 12/13 (agudo → positivo).",
      "sen 2a = 2·(5/13)·(12/13) = <b>120/169</b> ≈ 0,710.",
      "cos 2a = cos²a − sen²a = 144/169 − 25/169 = <b>119/169</b> ≈ 0,704. (Con la otra forma: 1 − 2·25/169 = 119/169 ✓.)",
      "tan 2a = sen 2a/cos 2a = <b>120/119</b>."
    ]) +
    "<h5>Para pasar de grado 2 a grado 1: las fórmulas de reducción de potencias</h5>" +
    "<p>Despejando cos²a y sen²a de las formas «2cos²a − 1» y «1 − 2sen²a» se obtienen unas fórmulas muy usadas en cálculo (para integrar potencias de seno y coseno, en 2.º de Bachillerato) y para resolver ecuaciones:</p>" +
    H.formula("cos²a = " + fr("1 + cos 2a", "2") + "          sen²a = " + fr("1 − cos 2a", "2")) +
    "<h5>Y el ángulo triple, por si te lo preguntan</h5>" +
    "<p>Sin fórmula nueva: sen 3a = sen(2a + a) = sen 2a·cos a + cos 2a·sen a = 2sen a·cos²a + (1 − 2sen²a)·sen a = 2sen a(1 − sen²a) + sen a − 2sen³a = <b>3·sen a − 4·sen³a</b>. De la misma forma cos 3a = 4cos³a − 3cos a.</p>" +
    ejemplo("Comprobación del seno del triple", "Si sen a = 0,6, calcula sen 3a con la fórmula y comprueba con la calculadora.", [
      "sen 3a = 3·0,6 − 4·0,6³ = 1,8 − 4·0,216 = 1,8 − 0,864 = <b>0,936</b>.",
      "Comprobación: a = arcsen 0,6 = 36,87° → 3a = 110,61° → sen 110,61° = 0,936 ✓."
    ]) +
    ojo("sen 2a <b>no</b> es 2·sen a. Para a = 30°: sen 60° = 0,866, pero 2·sen 30° = 1. Es el mismo error de «sacar el 2 fuera» que con la suma: el seno no es una función lineal.");

  // ---------------------------------------------------------------- 3. Ángulo mitad
  secciones[2] =
    "<h5>Cómo se obtiene y por qué lleva ±</h5>" +
    "<p>De cos 2x = 1 − 2sen²x se despeja sen²x = (1 − cos 2x)/2. Si llamamos a = 2x (es decir, x = a/2), queda sen²(a/2) = (1 − cos a)/2, y al hacer la raíz cuadrada hay dos signos posibles. El mismo razonamiento con cos 2x = 2cos²x − 1 da cos²(a/2) = (1 + cos a)/2. Dividiendo, aparece una versión de la tangente <b>sin signo</b>:</p>" +
    H.formula("tan(a/2) = " + fr("1 − cos a", "sen a") + " = " + fr("sen a", "1 + cos a")) +
    "<p>Esta última tiene la ventaja de que no necesita elegir un signo (el signo lo lleva el propio sen a). El signo en las otras dos lo decide el cuadrante de a/2; se ve con la tabla de signos del Tema 4.</p>" +
    ejemplo("El cuadrante decide el signo", "Si cos a = −4/5 y a está en el 3.er cuadrante (180° &lt; a &lt; 270°), calcula sen(a/2), cos(a/2) y tan(a/2).", [
      "Si 180° &lt; a &lt; 270°, entonces 90° &lt; a/2 &lt; 135°: a/2 está en el <b>2.º cuadrante</b> (seno positivo, coseno negativo).",
      "sen(a/2) = +√((1 − cos a)/2) = √((1 + 4/5)/2) = √(9/10) = <b>3/√10 ≈ 0,949</b>.",
      "cos(a/2) = −√((1 + cos a)/2) = −√((1 − 4/5)/2) = −√(1/10) = <b>−1/√10 ≈ −0,316</b>.",
      "tan(a/2) = sen(a/2)/cos(a/2) = <b>−3</b>. Comprobación con la forma sin signo: sen a = −3/5 (3.er cuadrante) → tan(a/2) = sen a/(1 + cos a) = (−3/5)/(1/5) = −3 ✓."
    ]) +
    ejemplo("Un valor exacto nuevo", "Calcula sen 22,5° y cos 22,5° con las fórmulas del ángulo mitad.", [
      "22,5° = 45°/2, y 22,5° está en el 1.er cuadrante (todo positivo).",
      "sen 22,5° = √((1 − cos 45°)/2) = √((1 − √2/2)/2) = √((2 − √2)/4) = <b>√(2 − √2)/2 ≈ 0,3827</b>.",
      "cos 22,5° = √((1 + cos 45°)/2) = <b>√(2 + √2)/2 ≈ 0,9239</b>."
    ]) +
    ojo("el ± de las fórmulas del ángulo mitad <b>no</b> se deja sin decidir: hay que elegir el signo. Un error muy frecuente es calcular a/2 mal (olvidar dividir entre 2 el intervalo de a) y elegir el signo con el cuadrante de a. Escribe siempre la desigualdad de a/2 antes de decidir.");

  // ---------------------------------------------------------------- 4. Ecuaciones
  secciones[3] =
    "<h5>Ecuaciones básicas y cómo ver sus soluciones</h5>" +
    "<p>Una ecuación trigonométrica es una igualdad que se cumple sólo para <i>algunos</i> ángulos. Como las razones son periódicas hay infinitas soluciones, pero en los problemas se pide casi siempre las de una vuelta, [0°, 360°). La gráfica lo hace transparente: las soluciones son los cortes de la curva con la recta horizontal y = k. Cambia la función, el ángulo (x, 2x, 3x) y el valor k:</p>" +
    w("ecuaciontrig") +
    "<p>Resumen de lo que ves: <b>sen x = k</b> (con |k| ≤ 1) tiene dos soluciones por vuelta (α y 180° − α); <b>cos x = k</b> también dos (α y −α, que en [0°, 360°) es 360° − α); <b>tan x = k</b> tiene siempre una (α) y la otra por vuelta es α + 180°.</p>" +
    "<h5>Cuando el ángulo es 2x, 3x, x/2…</h5>" +
    "<p>Primero se resuelve para el ángulo completo (todo lo que está dentro del seno) y al final se despeja x, <b>dividiendo también el «+360°·n»</b>. Esto multiplica el número de soluciones por vuelta.</p>" +
    ejemplo("sen 2x = 1/2 en [0°, 360°)", "Resuelve sen 2x = 1/2.", [
      "2x = 30° + 360°·n  ó  2x = 150° + 360°·n.",
      "Dividimos entre 2: x = 15° + 180°·n  ó  x = 75° + 180°·n.",
      "En [0°, 360°): n = 0 y n = 1 en cada familia → <b>x = 15°, 75°, 195°, 255°</b> (cuatro soluciones: el doble que con sen x = 1/2)."
    ]) +
    "<h5>Ecuaciones que hay que transformar primero</h5>" +
    "<p>El truco es siempre conseguir <b>una sola razón</b> y <b>un solo ángulo</b> (o un producto igual a 0). Se usan: sen²x + cos²x = 1 (para dejar todo en sen o en cos), el ángulo doble (para eliminar el 2x) y el factor común.</p>" +
    ejemplo("Segundo grado en coseno", "Resuelve 2cos²x − 3cos x + 1 = 0 en [0°, 360°).", [
      "Cambio t = cos x: 2t² − 3t + 1 = 0 → t = (3 ± 1)/4 → t = 1 o t = 1/2.",
      "cos x = 1 → x = 0°. cos x = 1/2 → x = 60° o x = 300°.",
      "<b>x = 0°, 60°, 300°</b>."
    ]) +
    ejemplo("Pasar a una sola razón", "Resuelve 2sen²x + cos x − 1 = 0 en [0°, 360°).", [
      "Sustituimos sen²x = 1 − cos²x: 2(1 − cos²x) + cos x − 1 = 0 → −2cos²x + cos x + 1 = 0 → 2cos²x − cos x − 1 = 0.",
      "t = cos x: t = (1 ± 3)/4 → t = 1 o t = −1/2.",
      "cos x = 1 → x = 0°. cos x = −1/2 → x = 120° o 240°. <b>x = 0°, 120°, 240°</b>."
    ]) +
    ejemplo("Con el ángulo doble: no dividas", "Resuelve sen 2x = cos x en [0°, 360°).", [
      "sen 2x = 2·sen x·cos x. La ecuación queda 2·sen x·cos x = cos x → 2·sen x·cos x − cos x = 0 → cos x·(2·sen x − 1) = 0.",
      "Un producto es 0 si algún factor lo es: cos x = 0 → x = 90° o 270°; 2·sen x − 1 = 0 → sen x = 1/2 → x = 30° o 150°.",
      "<b>x = 30°, 90°, 150°, 270°</b>. Si «simplificases» dividiendo entre cos x perderías las soluciones 90° y 270°."
    ]) +
    ejemplo("Una ecuación con tangente", "Resuelve tan x = 2·sen x en [0°, 360°).", [
      "Condición: cos x ≠ 0. Escribimos tan x = sen x/cos x: sen x/cos x = 2·sen x → sen x = 2·sen x·cos x → sen x(1 − 2cos x) = 0.",
      "sen x = 0 → x = 0° o 180°. 1 − 2cos x = 0 → cos x = 1/2 → x = 60° o 300°.",
      "Ninguna de las soluciones hace cos x = 0: <b>x = 0°, 60°, 180°, 300°</b>."
    ]) +
    "<h5>Cuando aparecen elevados al cuadrado: comprueba</h5>" +
    ejemplo("Solución falsa", "Resuelve sen x + cos x = 1 en [0°, 360°).", [
      "Elevamos al cuadrado: sen²x + 2·sen x·cos x + cos²x = 1 → 1 + sen 2x = 1 → sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°.",
      "Comprobamos en la ecuación original: x = 0° → 0 + 1 = 1 ✓ · x = 90° → 1 + 0 = 1 ✓ · x = 180° → 0 − 1 = −1 ✗ · x = 270° → −1 + 0 = −1 ✗.",
      "<b>x = 0° y x = 90°</b>. Al elevar al cuadrado se perdió el signo y aparecieron dos soluciones falsas (como en las ecuaciones irracionales del Tema 3)."
    ]) +
    "<p>Unas pautas para no perderse: <b>(1)</b> reduce a una razón y un ángulo; <b>(2)</b> si te sale un producto, iguala cada factor a 0, nunca simplifiques una razón; <b>(3)</b> resuelve la ecuación básica con los dos ángulos por vuelta; <b>(4)</b> si había ángulo 2x, 3x…, divide al final; <b>(5)</b> da las soluciones del intervalo pedido y, si elevaste al cuadrado, comprueba.</p>" +
    ojo("al resolver sen x = 0,5 la calculadora da <b>un solo</b> ángulo (30°), pero siempre hay otro en la misma vuelta (150°). Con el coseno, la otra solución es 360° − α. Haz el dibujo de la circunferencia: te recuerda que son dos.");

  // ---------------------------------------------------------------- 5. Identidades
  secciones[4] =
    "<h5>Tu caja de herramientas</h5>" +
    "<p>Para demostrar una identidad se usan siempre las mismas piezas; conviene tenerlas a mano:</p>" +
    "<ul><li><b>sen²x + cos²x = 1</b>, y sus versiones 1 − cos²x = sen²x y 1 − sen²x = cos²x.</li>" +
    "<li><b>tan x = sen x/cos x</b>, cotan x = cos x/sen x, y 1 + tan²x = 1/cos²x.</li>" +
    "<li>Ángulo doble, suma y mitad.</li>" +
    "<li>Álgebra: factor común, <b>(1 − cos x)(1 + cos x) = 1 − cos²x = sen²x</b>, denominador común, multiplicar por el conjugado.</li></ul>" +
    "<h5>Cuatro estrategias que funcionan</h5>" +
    "<ol><li><b>Pasar todo a seno y coseno</b>. Si hay tangentes, cotangentes, secantes… escríbelas con sen y cos: casi siempre simplifica.</li>" +
    "<li><b>Denominador común</b> cuando hay sumas de fracciones, y después simplificar con sen² + cos² = 1.</li>" +
    "<li><b>Multiplicar por el conjugado</b> cuando aparece 1 ± cos x o 1 ± sen x en un denominador (es el truco del ejemplo del tema).</li>" +
    "<li><b>Trabajar el lado más complicado</b> hasta llegar al otro, anotando cada paso. Nunca se opera en los dos lados a la vez.</li></ol>" +
    "<p>Antes de empezar una demostración, puedes comprobar numéricamente si la igualdad es plausible: prueba la identidad (y otras que no lo son) en el comprobador. <b>Pero ojo</b>, comprobar con números no es demostrar: un examen exige el álgebra.</p>" +
    w("identidad") +
    ejemplo("Convertir a seno y coseno", "Demuestra que tan x + 1/tan x = 2/sen 2x.", [
      "Lado izquierdo: tan x + cotan x = sen x/cos x + cos x/sen x = (sen²x + cos²x)/(sen x·cos x) = 1/(sen x·cos x).",
      "Lado derecho: 2/sen 2x = 2/(2·sen x·cos x) = 1/(sen x·cos x).",
      "Los dos lados son iguales a 1/(sen x·cos x). ∎ (Aquí hemos llevado los dos lados a una misma expresión intermedia: es una forma válida de demostrar, siempre que cada paso sea una igualdad.)"
    ]) +
    ejemplo("Suma de fracciones", "Demuestra que sen x/(1 + cos x) + (1 + cos x)/sen x = 2/sen x.", [
      "Denominador común sen x·(1 + cos x): [sen²x + (1 + cos x)²]/[sen x·(1 + cos x)].",
      "Numerador: sen²x + 1 + 2cos x + cos²x = (sen²x + cos²x) + 1 + 2cos x = 2 + 2cos x = 2(1 + cos x).",
      "Queda 2(1 + cos x)/[sen x·(1 + cos x)] = 2/sen x. ∎"
    ]) +
    ejemplo("Con tangentes y ángulo doble", "Demuestra que cos 2x = (1 − tan²x)/(1 + tan²x).", [
      "Partimos del lado derecho. Como 1 + tan²x = 1/cos²x, el denominador es 1/cos²x.",
      "Numerador: 1 − tan²x = (cos²x − sen²x)/cos²x. Entonces el cociente es [(cos²x − sen²x)/cos²x]·cos²x = cos²x − sen²x = cos 2x. ∎"
    ]) +
    "<p>Y una advertencia sobre lo que <b>no</b> se debe hacer: pasar términos de un lado al otro, multiplicar los dos lados en cruz o elevar al cuadrado «para ver si sale». Esas operaciones son válidas para resolver una ecuación, pero en una identidad suponen dar ya por cierto lo que quieres demostrar.</p>";

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "6. Transformar sumas en productos (y al revés)",
      html:
        "<p>Las fórmulas de suma y diferencia, sumadas o restadas entre sí, producen unas identidades muy cómodas para resolver ecuaciones, porque convierten una <b>suma</b> de razones (difícil de igualar a 0) en un <b>producto</b> (fácil: cada factor a 0). Por ejemplo, sumando sen(x + y) = sen x·cos y + cos x·sen y y sen(x − y) = sen x·cos y − cos x·sen y queda sen(x + y) + sen(x − y) = 2·sen x·cos y. Llamando A = x + y y B = x − y (x = (A + B)/2, y = (A − B)/2):</p>" +
        tabla(["Suma", "Producto"], [
          ["sen A + sen B", "2·sen((A + B)/2)·cos((A − B)/2)"],
          ["sen A − sen B", "2·cos((A + B)/2)·sen((A − B)/2)"],
          ["cos A + cos B", "2·cos((A + B)/2)·cos((A − B)/2)"],
          ["cos A − cos B", "−2·sen((A + B)/2)·sen((A − B)/2)"]
        ]) +
        "<p>Y al revés (producto a suma): sen A·cos B = ½[sen(A + B) + sen(A − B)], cos A·cos B = ½[cos(A + B) + cos(A − B)] y sen A·sen B = ½[cos(A − B) − cos(A + B)]. No hace falta memorizarlas todas: se deducen de las de suma en un renglón.</p>" +
        ejemplo("Un valor exacto", "Calcula sen 75° + sen 15° sin calculadora.", [
          "sen 75° + sen 15° = 2·sen((75° + 15°)/2)·cos((75° − 15°)/2) = 2·sen 45°·cos 30° = 2·(√2/2)(√3/2) = <b>√6/2 ≈ 1,2247</b>.",
          "Comprobación con los valores de la sección 1: 0,9659 + 0,2588 = 1,2247 ✓."
        ]) +
        ejemplo("Ecuación con una suma de senos", "Resuelve sen 3x + sen x = 0 en [0°, 360°).", [
          "Transformamos: sen 3x + sen x = 2·sen((3x + x)/2)·cos((3x − x)/2) = 2·sen 2x·cos x = 0.",
          "sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°. cos x = 0 → x = 90°, 270° (ya están).",
          "<b>x = 0°, 90°, 180°, 270°</b>."
        ]) +
        ejemplo("Ecuación con dos sumas", "Resuelve sen x + sen 3x = cos x + cos 3x en [0°, 360°).", [
          "Transformamos cada lado: 2·sen 2x·cos x = 2·cos 2x·cos x → 2·cos x·(sen 2x − cos 2x) = 0.",
          "cos x = 0 → x = 90° o 270°. sen 2x = cos 2x → tan 2x = 1 → 2x = 45° + 180°·n → x = 22,5° + 90°·n → x = 22,5°, 112,5°, 202,5°, 292,5°.",
          "<b>Seis soluciones: x = 22,5°, 90°, 112,5°, 202,5°, 270°, 292,5°</b>. (No dividimos entre cos x: perderíamos 90° y 270°.)"
        ])
    },
    {
      h: "7. Combinar seno y coseno en una sola onda",
      html:
        "<p>La suma a·sen x + b·cos x aparece mucho (ondas, corrientes alternas, movimiento armónico) y se puede escribir como <b>una sola</b> función seno con amplitud y desfase. Se busca R y φ tales que R·sen(x + φ) = R·cos φ·sen x + R·sen φ·cos x sea igual a a·sen x + b·cos x. Comparando coeficientes: R·cos φ = a y R·sen φ = b. Elevando al cuadrado y sumando: R² = a² + b² y tan φ = b/a.</p>" +
        H.formula("a·sen x + b·cos x = R·sen(x + φ)       con R = √(a² + b²) y tan φ = b/a") +
        w("amplitud") +
        ejemplo("Valor máximo", "¿Cuál es el valor máximo de f(x) = sen x + cos x y en qué ángulo de [0°, 360°) se alcanza?", [
          "a = b = 1: R = √2 y tan φ = 1 → φ = 45°. Entonces f(x) = √2·sen(x + 45°).",
          "El seno vale 1 como máximo, así que el máximo de f es <b>√2 ≈ 1,414</b>, cuando x + 45° = 90°, es decir, en <b>x = 45°</b>."
        ]) +
        ejemplo("Ecuación a·sen x + b·cos x = c", "Resuelve sen x − √3·cos x = 1 en [0°, 360°).", [
          "a = 1 y b = −√3: R = √(1 + 3) = 2 y tan φ = −√3 (con a &gt; 0) → φ = −60°. Así sen x − √3·cos x = 2·sen(x − 60°).",
          "2·sen(x − 60°) = 1 → sen(x − 60°) = 1/2 → x − 60° = 30° o 150° (+360°·n).",
          "<b>x = 90° o x = 210°</b>. Comprobación: sen 90° − √3·cos 90° = 1 ✓ y sen 210° − √3·cos 210° = −0,5 + 1,5 = 1 ✓."
        ]) +
        ejemplo("Amplitud de 3·sen x + 4·cos x", "Escribe 3·sen x + 4·cos x como R·sen(x + φ).", [
          "R = √(9 + 16) = 5 y tan φ = 4/3 → φ = arctan(4/3) = 53,13°.",
          "Por tanto 3·sen x + 4·cos x = <b>5·sen(x + 53,13°)</b>: oscila entre −5 y 5."
        ])
    },
    {
      h: "8. Mapa de fórmulas: qué hay que memorizar y qué se deduce",
      html:
        "<p>Muchos alumnos tienen la sensación de que «hay cientos de fórmulas». En realidad, todo parte de dos o tres:</p>" +
        "<ul><li>sen²x + cos²x = 1 (Pitágoras en la circunferencia) y tan x = sen x/cos x.</li>" +
        "<li>La suma de ángulos: cos(a − b) = cos a·cos b + sen a·sen b (y de ella, las otras tres).</li></ul>" +
        "<p>De la suma salen el doble (b = a), el triple (suma de 2a y a), las reducciones de ángulos (con 90° y 180°) y, despejando, el mitad y las transformaciones. Une cada resultado con su fórmula:</p>" +
        w("emparejar", "formulas") +
        "<p>Y ahora decide si cada igualdad es una identidad, una ecuación (cierta sólo para algunos ángulos) o directamente falsa:</p>" +
        w("clasificar", "tipos") +
        "<p>Ordena los pasos de la demostración de una identidad:</p>" +
        w("orden", "demo")
    },
    {
      h: "16. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "17. Autocomprobación del tema",
      html: "<p>Dieciséis preguntas de test con explicación y tarjetas para memorizar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    formulas: {
      titulo: "Cada resultado con su fórmula",
      consigna: "Une cada expresión con su desarrollo.",
      pares: [
        ["sen 2a", "2·sen a·cos a"],
        ["cos 2a (en función de cos a)", "2cos²a − 1"],
        ["cos 2a (en función de sen a)", "1 − 2sen²a"],
        ["cos(a − b)", "cos a·cos b + sen a·sen b"],
        ["sen(a + b)", "sen a·cos b + cos a·sen b"],
        ["tan 2a", "2tan a/(1 − tan²a)"],
        ["sen²a", "(1 − cos 2a)/2"],
        ["sen(a/2) (con signo)", "±√((1 − cos a)/2)"],
        ["sen 3a", "3·sen a − 4·sen³a"]
      ]
    },
    tipos: {
      titulo: "¿Identidad, ecuación o falsa?",
      consigna: "Toca una igualdad y después la categoría correcta.",
      categorias: ["Identidad (siempre cierta)", "Ecuación (cierta sólo para algunos x)", "Falsa en general"],
      items: [
        { t: "sen²x + cos²x = 1", c: 0 }, { t: "cos 2x = 2cos²x − 1", c: 0 }, { t: "sen(x + 90°) = cos x", c: 0 }, { t: "1 + tan²x = 1/cos²x", c: 0 },
        { t: "sen x = 1/2", c: 1 }, { t: "sen 2x = sen x", c: 1 }, { t: "sen x + cos x = 1", c: 1 }, { t: "(sen x + cos x)² = 1", c: 1 },
        { t: "sen(a + b) = sen a + sen b", c: 2 }, { t: "cos 2x = 2cos x", c: 2 }, { t: "sen(2x) = 2 sen x", c: 2 }
      ]
    },
    demo: {
      titulo: "Demostrar sen x/(1 + cos x) = (1 − cos x)/sen x",
      consigna: "Ordena los pasos de la demostración.",
      items: [
        { t: "Partimos del lado izquierdo: sen x/(1 + cos x)", nota: "Se trabaja un solo lado." },
        { t: "Multiplicamos numerador y denominador por (1 − cos x)", nota: "Es multiplicar por 1: no cambia el valor." },
        { t: "El denominador es una diferencia de cuadrados: (1 + cos x)(1 − cos x) = 1 − cos²x", nota: "Identidad notable del Tema 3." },
        { t: "Por la relación fundamental, 1 − cos²x = sen²x", nota: "sen²x + cos²x = 1." },
        { t: "Queda sen x·(1 − cos x)/sen²x; simplificamos un factor sen x", nota: "Se tachan factores, no sumandos." },
        { t: "Llegamos a (1 − cos x)/sen x, que es el lado derecho. ∎", nota: "Fin: hemos pasado del lado izquierdo al derecho con igualdades." }
      ]
    },
    tj1: {
      titulo: "Fórmulas trigonométricas",
      cartas: [
        { a: "sen(a ± b)", b: "sen a·cos b ± cos a·sen b" },
        { a: "cos(a ± b)", b: "cos a·cos b ∓ sen a·sen b (el signo del medio es el CONTRARIO)" },
        { a: "tan(a ± b)", b: "(tan a ± tan b)/(1 ∓ tan a·tan b)" },
        { a: "sen 2a", b: "2·sen a·cos a" },
        { a: "cos 2a (tres formas)", b: "cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a" },
        { a: "tan 2a", b: "2·tan a/(1 − tan²a)" },
        { a: "Reducción de potencias", b: "cos²a = (1 + cos 2a)/2 · sen²a = (1 − cos 2a)/2" },
        { a: "sen(a/2) y cos(a/2)", b: "±√((1 − cos a)/2) y ±√((1 + cos a)/2). El signo lo da el cuadrante de a/2." },
        { a: "tan(a/2) sin signo", b: "(1 − cos a)/sen a = sen a/(1 + cos a)" },
        { a: "sen 3a y cos 3a", b: "3·sen a − 4·sen³a · 4·cos³a − 3·cos a" },
        { a: "Suma de senos a producto", b: "sen A + sen B = 2·sen((A + B)/2)·cos((A − B)/2)" },
        { a: "Soluciones de sen x = k, cos x = k, tan x = k", b: "sen: α + 360°n y 180° − α + 360°n · cos: ±α + 360°n · tan: α + 180°n" },
        { a: "a·sen x + b·cos x", b: "R·sen(x + φ), R = √(a² + b²), tan φ = b/a" },
        { a: "Cómo se demuestra una identidad", b: "Se transforma UN lado (a sen y cos, denominador común, conjugado) hasta obtener el otro. No se pasan términos de un lado a otro." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula sen 75° = sen 45° + sen 30° = 0,707 + 0,5 = 1,207. ¿Qué falla?",
          op: ["Nada", "sen(a + b) ≠ sen a + sen b: hay que usar sen a·cos b + cos a·sen b = 0,9659", "Debía restar", "El resultado correcto es 1"], ok: 1,
          porque: "Un seno nunca puede ser mayor que 1, así que 1,207 es imposible. La fórmula correcta da (√2/2)(√3/2) + (√2/2)(1/2) = 0,9659." },
        { q: "Un alumno escribe cos(a + b) = cos a·cos b + sen a·sen b. ¿Qué falla?",
          op: ["Nada", "El signo del medio en el coseno de una suma es −: cos a·cos b − sen a·sen b", "Falta un 2", "Debía llevar tangentes"], ok: 1,
          porque: "Prueba con a = b = 90°: cos 180° = −1 y la fórmula correcta da 0·0 − 1·1 = −1, pero la errónea daría +1." },
        { q: "Un alumno resuelve sen 2x = cos x dividiendo entre cos x y obtiene 2 sen x = 1, es decir, x = 30° y 150°. ¿Qué ha perdido?",
          op: ["Nada", "Las soluciones x = 90° y 270°, donde cos x = 0: no se puede dividir entre una expresión que puede valer 0", "La solución x = 0°", "La solución x = 180°"], ok: 1,
          porque: "Debió factorizar: cos x(2 sen x − 1) = 0. De cos x = 0 salen 90° y 270°; de sen x = 1/2, 30° y 150°." },
        { q: "Para resolver sen x = 0,5 en [0°, 360°), un alumno da sólo x = 30° porque «la calculadora da 30°». ¿Qué falla?",
          op: ["Nada", "También x = 150° (180° − 30°): en una vuelta, el seno toma cada valor en dos ángulos", "También x = 330°", "También x = 210°"], ok: 1,
          porque: "El seno es positivo en los cuadrantes I y II; en el 2.º cuadrante el ángulo de referencia 30° da 180° − 30° = 150°." },
        { q: "Al resolver sen 2x = 1/2, un alumno escribe 2x = 30° + 360°n y concluye x = 30° + 360°n. ¿Qué falla?",
          op: ["Nada", "Al despejar x hay que dividir también la parte 360°n entre 2: x = 15° + 180°n", "Falta multiplicar por 2", "El resultado es x = 60° + 360°n"], ok: 1,
          porque: "Si 2x = 30° + 360°n, entonces x = 15° + 180°n. (Y además falta la segunda familia, 2x = 150° + 360°n.)" },
        { q: "Un alumno «demuestra» una identidad pasando términos de un lado a otro hasta llegar a algo evidente. ¿Qué falla?",
          op: ["Nada: es un método válido", "Pasar términos supone dar la igualdad por cierta, que es lo que se debe demostrar", "Debe multiplicar en cruz", "Falta una constante"], ok: 1,
          porque: "En una identidad se parte de un lado y se transforma con igualdades hasta llegar al otro. «Pasar cosas» es una técnica de las ecuaciones." },
        { q: "Si cos a = 0,6 con a agudo, un alumno calcula sen(a/2) = −√((1 − 0,6)/2) = −0,447. ¿Qué falla?",
          op: ["Nada", "a/2 está en el 1.er cuadrante, donde el seno es positivo: sen(a/2) = +0,447", "Debía ser √((1 + 0,6)/2)", "El valor es 0,2"], ok: 1,
          porque: "Si 0° &lt; a &lt; 90°, entonces 0° &lt; a/2 &lt; 45°: primer cuadrante, seno positivo. El signo lo decide a/2, no a." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El valor exacto de sen 75° es…",
          op: ["(√6 + √2)/4", "(√6 − √2)/4", "√3/2", "(√3 + 1)/2"], ok: 0,
          porque: "sen(45° + 30°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ 0,966." },
        { q: "Si sen a = 3/5 y a es agudo, sen 2a vale…",
          op: ["24/25", "6/5", "7/25", "3/10"], ok: 0,
          porque: "cos a = 4/5, sen 2a = 2·(3/5)·(4/5) = 24/25." },
        { q: "cos 2a, escrito en función de sen a, es…",
          op: ["1 − 2sen²a", "2sen²a − 1", "1 + 2sen²a", "2sen a·cos a"], ok: 0,
          porque: "cos 2a = cos²a − sen²a = 1 − sen²a − sen²a = 1 − 2sen²a." },
        { q: "Las soluciones de sen x = 1/2 en [0°, 360°) son…",
          op: ["30° y 150°", "30° y 330°", "60° y 120°", "30° y 210°"], ok: 0,
          porque: "sen 30° = 1/2 y también sen(180° − 30°) = sen 150° = 1/2." },
        { q: "El número de soluciones de sen 2x = 1/2 en [0°, 360°) es…",
          op: ["4", "2", "1", "8"], ok: 0,
          porque: "2x = 30° + 360°n o 150° + 360°n → x = 15° + 180°n o 75° + 180°n: cuatro en una vuelta." },
        { q: "Si cos a = 0,8 y a es agudo, ¿cuánto vale cos(a/2)?",
          op: ["√0,9 ≈ 0,949", "√0,1 ≈ 0,316", "0,4", "√0,4 ≈ 0,632"], ok: 0,
          porque: "cos(a/2) = +√((1 + 0,8)/2) = √0,9 ≈ 0,949 (a/2 es agudo: positivo)." },
        { q: "tan(45° + 30°) es igual a…",
          op: ["2 + √3", "1 + √3/3", "√3", "(√3 − 1)/2"], ok: 0,
          porque: "(1 + √3/3)/(1 − 1·√3/3) = (3 + √3)/(3 − √3) = (3 + √3)²/6 = (12 + 6√3)/6 = 2 + √3." },
        { q: "Para resolver 2cos²x − 3cos x + 1 = 0 el cambio adecuado es…",
          op: ["t = cos x", "t = 2x", "t = cos²x", "t = tan x"], ok: 0,
          porque: "Con t = cos x queda 2t² − 3t + 1 = 0, una ecuación de segundo grado normal." },
        { q: "Al demostrar una identidad trigonométrica, lo correcto es…",
          op: ["Transformar un lado hasta llegar al otro", "Pasar todos los términos a un lado", "Elevar al cuadrado los dos lados", "Sustituir x por un valor"], ok: 0,
          porque: "Probar con un valor no demuestra nada, y las demás operaciones suponen cierta la igualdad." },
        { q: "El valor máximo de sen x + cos x es…",
          op: ["√2", "2", "1", "√3"], ok: 0,
          porque: "sen x + cos x = √2·sen(x + 45°), cuyo máximo es √2 ≈ 1,414." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "h1", nivel: 1,
      enunciado: "Calcula sen 75° como suma de dos ángulos notables. Da el valor decimal.",
      check: { tipo: "num", etiqueta: "sen 75° =", valor: 0.9659, tol: 0.001 },
      pistas: ["75° = 45° + 30°."],
      pasos: ["sen(45° + 30°) = sen 45°·cos 30° + cos 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ 0,9659."],
      resultado: "(√6 + √2)/4 ≈ 0,9659" },
    { id: "h2", nivel: 1,
      enunciado: "Calcula cos 105° como cos(60° + 45°). Da el valor decimal.",
      check: { tipo: "num", etiqueta: "cos 105° =", valor: -0.2588, tol: 0.002 },
      pistas: ["cos(a + b) = cos a·cos b − sen a·sen b."],
      pasos: ["cos 105° = cos 60°·cos 45° − sen 60°·sen 45° = (1/2)(√2/2) − (√3/2)(√2/2) = (√2 − √6)/4 ≈ −0,2588.", "Es negativo, como corresponde al 2.º cuadrante."],
      resultado: "(√2 − √6)/4 ≈ −0,2588" },
    { id: "h3", nivel: 1,
      enunciado: "Si sen a = 5/13 y a es agudo, calcula sen 2a y cos 2a (decimales).",
      check: [{ tipo: "num", etiqueta: "sen 2a =", valor: 120 / 169, tol: 0.002 }, { tipo: "num", etiqueta: "cos 2a =", valor: 119 / 169, tol: 0.002 }],
      pistas: ["Primero cos a = √(1 − sen²a)."],
      pasos: ["cos a = 12/13.", "sen 2a = 2·(5/13)(12/13) = 120/169 ≈ 0,710.", "cos 2a = (12/13)² − (5/13)² = 119/169 ≈ 0,704."],
      resultado: "sen 2a = 120/169 · cos 2a = 119/169" },
    { id: "h4", nivel: 1,
      enunciado: "Calcula tan 75° = tan(45° + 30°). Da el valor decimal.",
      check: { tipo: "num", etiqueta: "tan 75° =", valor: 3.732, tol: 0.002 },
      pistas: ["tan(a + b) = (tan a + tan b)/(1 − tan a·tan b) con tan 45° = 1 y tan 30° = √3/3."],
      pasos: ["tan 75° = (1 + √3/3)/(1 − √3/3) = (3 + √3)/(3 − √3).", "Racionalizando: (3 + √3)²/6 = (12 + 6√3)/6 = 2 + √3 ≈ 3,732."],
      resultado: "2 + √3 ≈ 3,732" },
    { id: "h5", nivel: 1,
      enunciado: "Resuelve sen x = √3/2 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [60, 120], unidad: "°" },
      pistas: ["sen 60° = √3/2. El otro ángulo con el mismo seno es 180° − 60°."],
      pasos: ["x = 60° (1.er cuadrante) y x = 180° − 60° = 120° (2.º cuadrante)."],
      resultado: "x = 60° y x = 120°" },
    { id: "h6", nivel: 1,
      enunciado: "Resuelve cos x = −1/2 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [120, 240], unidad: "°" },
      pistas: ["cos 60° = 1/2: ángulo de referencia 60°, con coseno negativo (cuadrantes II y III)."],
      pasos: ["2.º cuadrante: 180° − 60° = 120°. 3.er cuadrante: 180° + 60° = 240°."],
      resultado: "x = 120° y x = 240°" },
    { id: "h7", nivel: 1,
      enunciado: "Resuelve tan x = 1 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [45, 225], unidad: "°" },
      pistas: ["La tangente se repite cada 180°."],
      pasos: ["tan 45° = 1. Sumando 180°: x = 225°."],
      resultado: "x = 45° y x = 225°" },
    { id: "h8", nivel: 1,
      enunciado: "Si cos a = 7/25 y a es agudo, calcula sen(a/2).",
      check: { tipo: "num", etiqueta: "sen(a/2) =", valor: 0.6 },
      pistas: ["a/2 también es agudo: signo positivo."],
      pasos: ["sen(a/2) = √((1 − cos a)/2) = √((1 − 7/25)/2) = √(18/50) = √(9/25) = 3/5 = 0,6."],
      resultado: "3/5" },
    { id: "h9", nivel: 1,
      enunciado: "Calcula sen 50°·cos 40° + cos 50°·sen 40° sin calculadora.",
      check: { tipo: "num", etiqueta: "valor =", valor: 1 },
      pistas: ["Es el desarrollo de una fórmula de suma."],
      pasos: ["sen a·cos b + cos a·sen b = sen(a + b) con a = 50° y b = 40°: sen 90° = 1."],
      resultado: "1" },
    { id: "h10", nivel: 1,
      enunciado: "Calcula cos²15° − sen²15° sin calculadora (valor decimal).",
      check: { tipo: "num", etiqueta: "valor =", valor: 0.866, tol: 0.002 },
      pistas: ["Es cos 2a con a = 15°."],
      pasos: ["cos²a − sen²a = cos 2a → cos 30° = √3/2 ≈ 0,866."],
      resultado: "√3/2" },
    // ================= ★★ medio =================
    { id: "h11", nivel: 2,
      enunciado: "Si sen a = 4/5 (a en el 2.º cuadrante) y cos b = −12/13 (b en el 3.er cuadrante), calcula sen(a − b) y cos(a + b).",
      check: [{ tipo: "num", etiqueta: "sen(a − b) =", valor: -63 / 65, tol: 0.002, ph: "p/q o decimal" }, { tipo: "num", etiqueta: "cos(a + b) =", valor: 56 / 65, tol: 0.002 }],
      pistas: ["cos a = −3/5 y sen b = −5/13 (por los cuadrantes)."],
      pasos: ["sen(a − b) = (4/5)(−12/13) − (−3/5)(−5/13) = −48/65 − 15/65 = −63/65.", "cos(a + b) = (−3/5)(−12/13) − (4/5)(−5/13) = 36/65 + 20/65 = 56/65."],
      resultado: "sen(a − b) = −63/65 · cos(a + b) = 56/65" },
    { id: "h12", nivel: 2,
      enunciado: "Si tan a = 2 y tan b = 3, calcula tan(a + b).",
      check: { tipo: "num", etiqueta: "tan(a + b) =", valor: -1 },
      pistas: ["tan(a + b) = (tan a + tan b)/(1 − tan a·tan b)."],
      pasos: ["(2 + 3)/(1 − 2·3) = 5/(−5) = −1."],
      resultado: "−1" },
    { id: "h13", nivel: 2,
      enunciado: "Si tan a = 3/4 y a es agudo, calcula sen 2a, cos 2a y tan 2a.",
      check: [{ tipo: "num", etiqueta: "sen 2a =", valor: 0.96 }, { tipo: "num", etiqueta: "cos 2a =", valor: 0.28 }, { tipo: "num", etiqueta: "tan 2a =", valor: 24 / 7, tol: 0.002 }],
      pistas: ["tan a = 3/4 → catetos 3 y 4, hipotenusa 5: sen a = 3/5 y cos a = 4/5."],
      pasos: ["sen 2a = 2·(3/5)(4/5) = 24/25 = 0,96.", "cos 2a = 16/25 − 9/25 = 7/25 = 0,28.", "tan 2a = (24/25)/(7/25) = 24/7. (Con la fórmula: 2·(3/4)/(1 − 9/16) = (3/2)/(7/16) = 24/7.)"],
      resultado: "sen 2a = 24/25 · cos 2a = 7/25 · tan 2a = 24/7" },
    { id: "h14", nivel: 2,
      enunciado: "Si sen a = 0,6, calcula sen 3a con la fórmula del seno del triple, sen 3a = 3·sen a − 4·sen³a.",
      check: { tipo: "num", etiqueta: "sen 3a =", valor: 0.936 },
      pistas: ["Sustituye sen a = 0,6 en la fórmula."],
      pasos: ["sen 3a = 3·0,6 − 4·0,216 = 1,8 − 0,864 = 0,936."],
      resultado: "0,936" },
    { id: "h15", nivel: 2,
      enunciado: "Si cos a = −4/5 y 180° &lt; a &lt; 270°, calcula sen(a/2) y cos(a/2).",
      check: [{ tipo: "num", etiqueta: "sen(a/2) =", valor: 0.9487, tol: 0.002 }, { tipo: "num", etiqueta: "cos(a/2) =", valor: -0.3162, tol: 0.002 }],
      pistas: ["Si 180° &lt; a &lt; 270°, entonces 90° &lt; a/2 &lt; 135°: 2.º cuadrante."],
      pasos: ["sen(a/2) = +√((1 + 4/5)/2) = √(9/10) = 3/√10 ≈ 0,949.", "cos(a/2) = −√((1 − 4/5)/2) = −√(1/10) ≈ −0,316."],
      resultado: "sen(a/2) = 3/√10 · cos(a/2) = −1/√10" },
    { id: "h16", nivel: 2,
      enunciado: "Calcula el valor exacto de sen 22,5° como decimal usando el ángulo mitad de 45°.",
      check: { tipo: "num", etiqueta: "sen 22,5° =", valor: 0.3827, tol: 0.002 },
      pistas: ["22,5° = 45°/2, en el 1.er cuadrante."],
      pasos: ["sen 22,5° = √((1 − cos 45°)/2) = √((1 − 0,7071)/2) = √0,14645 = 0,3827 (= √(2 − √2)/2)."],
      resultado: "√(2 − √2)/2 ≈ 0,3827" },
    { id: "h17", nivel: 2,
      enunciado: "Resuelve sen 2x = 1/2 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [15, 75, 195, 255], unidad: "°" },
      pistas: ["2x = 30° + 360°n ó 150° + 360°n. Divide entre 2."],
      pasos: ["x = 15° + 180°n ó x = 75° + 180°n.", "En [0°, 360°): 15°, 195°, 75°, 255°."],
      resultado: "x = 15°, 75°, 195°, 255°" },
    { id: "h18", nivel: 2,
      enunciado: "Resuelve 2cos²x − 3cos x + 1 = 0 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 60, 300], unidad: "°" },
      pistas: ["Cambio t = cos x."],
      pasos: ["2t² − 3t + 1 = 0 → t = 1 o t = 1/2.", "cos x = 1 → x = 0°. cos x = 1/2 → x = 60° o 300°."],
      resultado: "x = 0°, 60°, 300°" },
    { id: "h19", nivel: 2,
      enunciado: "Resuelve sen 2x = cos x en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 90, 150, 270], unidad: "°" },
      pistas: ["Escribe sen 2x = 2 sen x cos x y saca factor común cos x. No dividas entre cos x."],
      pasos: ["cos x(2 sen x − 1) = 0.", "cos x = 0 → 90°, 270°. sen x = 1/2 → 30°, 150°."],
      resultado: "x = 30°, 90°, 150°, 270°" },
    { id: "h20", nivel: 2,
      enunciado: "Resuelve 2sen²x + cos x − 1 = 0 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 120, 240], unidad: "°" },
      pistas: ["Sustituye sen²x = 1 − cos²x para tener una sola razón."],
      pasos: ["2(1 − cos²x) + cos x − 1 = 0 → 2cos²x − cos x − 1 = 0 → cos x = 1 o −1/2.", "x = 0°; x = 120° o 240°."],
      resultado: "x = 0°, 120°, 240°" },
    { id: "h21", nivel: 2,
      enunciado: "Resuelve tan x = 2·sen x en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 60, 180, 300], unidad: "°" },
      pistas: ["tan x = sen x/cos x (con cos x ≠ 0). Llega a sen x(1 − 2cos x) = 0."],
      pasos: ["sen x = 2 sen x cos x → sen x(1 − 2cos x) = 0.", "sen x = 0 → 0°, 180°. cos x = 1/2 → 60°, 300°. Ninguna con cos x = 0."],
      resultado: "x = 0°, 60°, 180°, 300°" },
    { id: "h22", nivel: 2,
      enunciado: "Resuelve cos 2x + 3sen x − 2 = 0 en [0°, 360°). Escribe las tres soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 90, 150], unidad: "°" },
      pistas: ["cos 2x = 1 − 2sen²x deja la ecuación sólo en sen x."],
      pasos: ["1 − 2sen²x + 3sen x − 2 = 0 → 2sen²x − 3sen x + 1 = 0 → sen x = 1 o 1/2.", "sen x = 1 → 90°; sen x = 1/2 → 30° y 150°."],
      resultado: "x = 30°, 90°, 150°" },
    { id: "h23", nivel: 2,
      enunciado: "Resuelve sen x = −√3/2 para x en [0, 2π) (en radianes). Escribe las dos soluciones en decimales.",
      check: { tipo: "lista", etiqueta: "x =", valores: [4 * Math.PI / 3, 5 * Math.PI / 3], unidad: "rad", tol: 0.002, ph: "decimales (o 4pi/3, 5pi/3)" },
      pistas: ["sen es negativo en los cuadrantes III y IV; el ángulo de referencia es π/3."],
      pasos: ["III: π + π/3 = 4π/3 ≈ 4,189. IV: 2π − π/3 = 5π/3 ≈ 5,236."],
      resultado: "x = 4π/3 y x = 5π/3" },
    { id: "h24", nivel: 2,
      enunciado: "Escribe sen 3x + sen x como un producto y calcula su valor para x = 30°.",
      check: { tipo: "num", etiqueta: "valor en x = 30° =", valor: 1.5, tol: 0.002 },
      pistas: ["sen A + sen B = 2 sen((A + B)/2) cos((A − B)/2)."],
      pasos: ["sen 3x + sen x = 2·sen 2x·cos x.", "Con x = 30°: 2·sen 60°·cos 30° = 2·(√3/2)(√3/2) = 3/2 = 1,5. (Directo: sen 90° + sen 30° = 1 + 0,5 = 1,5 ✓.)"],
      resultado: "2·sen 2x·cos x → 1,5" },
    // ================= ★★★ nivel PAU =================
    { id: "h25", nivel: 3,
      enunciado: "Demuestra que tan x + 1/tan x = 2/sen 2x.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe tan x y 1/tan x en función de sen x y cos x", p: 0.5 },
        { t: "Suma las fracciones con denominador común sen x·cos x", p: 0.5 },
        { t: "Usa sen²x + cos²x = 1 en el numerador y obtiene 1/(sen x·cos x)", p: 0.5 },
        { t: "Aplica sen 2x = 2·sen x·cos x al lado derecho y comprueba que coincide", p: 0.5 }
      ] },
      pasos: ["tan x + 1/tan x = sen x/cos x + cos x/sen x = (sen²x + cos²x)/(sen x·cos x) = 1/(sen x·cos x).", "2/sen 2x = 2/(2·sen x·cos x) = 1/(sen x·cos x). Iguales. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h26", nivel: 3,
      enunciado: "Demuestra que sen x/(1 + cos x) + (1 + cos x)/sen x = 2/sen x.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Reduce a denominador común sen x·(1 + cos x)", p: 0.5 },
        { t: "Desarrolla (1 + cos x)² en el numerador", p: 0.5 },
        { t: "Usa sen²x + cos²x = 1 para obtener 2 + 2cos x = 2(1 + cos x)", p: 0.5 },
        { t: "Simplifica el factor (1 + cos x) y llega a 2/sen x", p: 0.5 }
      ] },
      pasos: ["[sen²x + (1 + cos x)²]/[sen x(1 + cos x)] = [sen²x + 1 + 2cos x + cos²x]/[sen x(1 + cos x)] = (2 + 2cos x)/[sen x(1 + cos x)] = 2/sen x. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h27", nivel: 3,
      enunciado: "Demuestra que cos 2x = (1 − tan²x)/(1 + tan²x).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe tan²x = sen²x/cos²x en numerador y denominador", p: 0.5 },
        { t: "Reduce a común denominador: (cos²x − sen²x)/cos²x entre (cos²x + sen²x)/cos²x", p: 0.5 },
        { t: "Usa cos²x + sen²x = 1 en el denominador", p: 0.5 },
        { t: "Reconoce cos²x − sen²x = cos 2x", p: 0.5 }
      ] },
      pasos: ["(1 − tan²x)/(1 + tan²x) = [(cos²x − sen²x)/cos²x]/[(cos²x + sen²x)/cos²x] = (cos²x − sen²x)/(cos²x + sen²x) = cos²x − sen²x = cos 2x. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h28", nivel: 3,
      enunciado: "Deduce la fórmula de cos(a + b) a partir de cos(a − b) = cos a·cos b + sen a·sen b.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 5, items: [
        { t: "Escribe a + b = a − (−b)", p: 0.5 },
        { t: "Aplica la fórmula de cos(a − b) cambiando b por −b", p: 0.5 },
        { t: "Usa cos(−b) = cos b y sen(−b) = −sen b", p: 0.5 },
        { t: "Obtiene cos(a + b) = cos a·cos b − sen a·sen b", p: 0.5 }
      ] },
      pasos: ["cos(a + b) = cos(a − (−b)) = cos a·cos(−b) + sen a·sen(−b).", "Como cos(−b) = cos b y sen(−b) = −sen b: cos(a + b) = cos a·cos b − sen a·sen b."],
      resultado: "cos(a + b) = cos a·cos b − sen a·sen b" },
    { id: "h29", nivel: 3,
      enunciado: "Resuelve sen x + cos x = 1 en [0°, 360°) y comprueba las soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 90], unidad: "°" },
      pistas: ["Eleva al cuadrado: 1 + sen 2x = 1.", "Comprueba cada candidata en la ecuación original."],
      pasos: ["sen²x + 2sen x cos x + cos²x = 1 → sen 2x = 0 → x = 0°, 90°, 180°, 270°.", "x = 180°: 0 − 1 ≠ 1 ✗. x = 270°: −1 + 0 ≠ 1 ✗.", "Válidas: 0° y 90°."],
      resultado: "x = 0° y x = 90°" },
    { id: "h30", nivel: 3,
      enunciado: "Resuelve sen 3x + sen x = 0 en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 90, 180, 270], unidad: "°" },
      pistas: ["Transforma la suma en un producto: 2 sen 2x cos x."],
      pasos: ["2·sen 2x·cos x = 0.", "sen 2x = 0 → x = 0°, 90°, 180°, 270°. cos x = 0 → 90°, 270°."],
      resultado: "x = 0°, 90°, 180°, 270°" },
    { id: "h31", nivel: 3,
      enunciado: "Resuelve sen x + sen 3x = cos x + cos 3x en [0°, 360°). Escribe las seis soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [22.5, 90, 112.5, 202.5, 270, 292.5], unidad: "°", ph: "seis valores" },
      pistas: ["Transforma las dos sumas en productos y saca factor común cos x."],
      pasos: ["2 sen 2x cos x = 2 cos 2x cos x → cos x (sen 2x − cos 2x) = 0.", "cos x = 0 → 90°, 270°. tan 2x = 1 → 2x = 45° + 180°n → x = 22,5° + 90°n: 22,5°, 112,5°, 202,5°, 292,5°."],
      resultado: "x = 22,5°, 90°, 112,5°, 202,5°, 270°, 292,5°" },
    { id: "h32", nivel: 3,
      enunciado: "Resuelve 4sen²x − 1 = 0 en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 150, 210, 330], unidad: "°" },
      pistas: ["sen x = ±1/2: ¡las dos raíces cuadradas!"],
      pasos: ["sen²x = 1/4 → sen x = 1/2 o sen x = −1/2.", "sen x = 1/2 → 30°, 150°. sen x = −1/2 → 210°, 330°."],
      resultado: "x = 30°, 150°, 210°, 330°" },
    { id: "h33", nivel: 3,
      enunciado: "Halla el valor máximo de f(x) = sen x + cos x y el ángulo de [0°, 360°) en el que se alcanza.",
      check: [{ tipo: "num", etiqueta: "máximo =", valor: Math.SQRT2, tol: 0.002 }, { tipo: "num", etiqueta: "en x =", valor: 45, unidad: "°" }],
      pistas: ["Escribe f(x) = R·sen(x + φ) con R = √(a² + b²)."],
      pasos: ["R = √2 y φ = 45°: f(x) = √2·sen(x + 45°).", "Máximo √2 ≈ 1,414 cuando x + 45° = 90° → x = 45°."],
      resultado: "√2 en x = 45°" },
    { id: "h34", nivel: 3,
      enunciado: "Escribe 3·sen x + 4·cos x = R·sen(x + φ) y da R y φ (en grados).",
      check: [{ tipo: "num", etiqueta: "R =", valor: 5 }, { tipo: "num", etiqueta: "φ =", valor: 53.13, unidad: "°" }],
      pistas: ["R = √(a² + b²), tan φ = b/a."],
      pasos: ["R = √(9 + 16) = 5. tan φ = 4/3 → φ = 53,13° (a y b positivos: 1.er cuadrante)."],
      resultado: "5·sen(x + 53,13°)" },
    { id: "h35", nivel: 3,
      enunciado: "Resuelve sen x − √3·cos x = 1 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [90, 210], unidad: "°" },
      pistas: ["R = 2 y φ = −60°: sen x − √3 cos x = 2 sen(x − 60°)."],
      pasos: ["2·sen(x − 60°) = 1 → sen(x − 60°) = 1/2 → x − 60° = 30° o 150°.", "x = 90° o x = 210°. Comprobación: sen 90° − √3·0 = 1 ✓ y sen 210° − √3·cos 210° = −0,5 + 1,5 = 1 ✓."],
      resultado: "x = 90° y x = 210°" },
    { id: "h36", nivel: 3,
      enunciado: "Si tan a = 1/2 y tan b = 1/3, con a y b agudos, ¿cuánto vale a + b (en grados)?",
      check: { tipo: "num", etiqueta: "a + b =", valor: 45, unidad: "°" },
      pistas: ["Calcula tan(a + b) con la fórmula de la suma."],
      pasos: ["tan(a + b) = (1/2 + 1/3)/(1 − 1/6) = (5/6)/(5/6) = 1.", "Como a y b son agudos y tan a, tan b &lt; 1, ambos son menores de 45°, luego a + b &lt; 90°: a + b = 45°."],
      resultado: "45°" }
  ];

  var lamina = [
    { titulo: "Suma y diferencia de ángulos", ancha: true,
      items: [
        { label: "Seno", formula: "sen(a ± b) = sen a·cos b ± cos a·sen b", ojo: "El signo del medio es el MISMO que en el paréntesis." },
        { label: "Coseno", formula: "cos(a ± b) = cos a·cos b ∓ sen a·sen b", ojo: "El signo del medio es el CONTRARIO." },
        { label: "Tangente", formula: "tan(a ± b) = " + fr("tan a ± tan b", "1 ∓ tan a·tan b"), ejemplo: "tan 75° = (1 + √3/3)/(1 − √3/3) = 2 + √3" }
      ],
      nota: "Ejemplo: sen 75° = sen(45° + 30°) = (√6 + √2)/4. Y sen(a + b) NO es sen a + sen b." },
    { titulo: "Ángulo doble y reducción de potencias",
      items: [
        { label: "Seno y coseno del doble", formula: "sen 2a = 2·sen a·cos a · cos 2a = cos²a − sen²a", ejemplo: "sen a = 5/13 → sen 2a = 120/169" },
        { label: "Tres formas de cos 2a", formula: "cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a", cuando: "Elige la que use el dato (cos o sen)." },
        { label: "Tangente", formula: "tan 2a = " + fr("2·tan a", "1 − tan²a") },
        { label: "Potencias", formula: "cos²a = (1 + cos 2a)/2 · sen²a = (1 − cos 2a)/2" }
      ],
      nota: "Triple: sen 3a = 3sen a − 4sen³a · cos 3a = 4cos³a − 3cos a." },
    { titulo: "Ángulo mitad",
      items: [
        { label: "Seno y coseno", formula: "sen(a/2) = ±" + raiz(fr("1 − cos a", "2")) + "   cos(a/2) = ±" + raiz(fr("1 + cos a", "2")), cuando: "El signo lo decide el cuadrante de a/2.", ojo: "Escribe la desigualdad de a/2 antes de elegir el signo." },
        { label: "Tangente sin signo", formula: "tan(a/2) = " + fr("1 − cos a", "sen a") + " = " + fr("sen a", "1 + cos a") }
      ] },
    { titulo: "Ecuaciones trigonométricas",
      tabla: { cab: ["Ecuación", "Soluciones (n entero)"], filas: [
        ["sen x = k", "x = α + 360°n  ó  x = 180° − α + 360°n"],
        ["cos x = k", "x = ±α + 360°n"],
        ["tan x = k", "x = α + 180°n"],
        ["sen 2x = k", "2x = α + 360°n ó 180° − α + 360°n → divide TODO entre 2"]
      ] },
      pasos: ["Reduce a una sola razón y un solo ángulo (sen² + cos² = 1, ángulo doble).", "Si sale un producto, iguala cada factor a 0. NO dividas entre una razón.", "Cambio t = sen x (o cos x) si hay segundo grado.", "Da las soluciones del intervalo; si elevaste al cuadrado, comprueba."],
      nota: "Con la calculadora sale un solo ángulo: dibuja la circunferencia para encontrar el otro." },
    { titulo: "Cómo demostrar una identidad", ancha: true,
      pasos: ["Elige el lado más complicado.", "Pasa todo a seno y coseno (tan = sen/cos…).", "Denominador común / multiplica por el conjugado: (1 + cos)(1 − cos) = 1 − cos² = sen².", "Usa sen² + cos² = 1 y las fórmulas del ángulo doble.", "Llega al otro lado. ∎ Nunca pases términos de un lado a otro."],
      nota: "Comprobar con un valor no es demostrar. En un examen hay que hacerlo con álgebra." },
    { titulo: "Sumas y productos", ancha: true,
      tabla: { cab: ["Suma", "Producto"], filas: [
        ["sen A + sen B", "2·sen((A+B)/2)·cos((A−B)/2)"], ["sen A − sen B", "2·cos((A+B)/2)·sen((A−B)/2)"], ["cos A + cos B", "2·cos((A+B)/2)·cos((A−B)/2)"], ["cos A − cos B", "−2·sen((A+B)/2)·sen((A−B)/2)"]
      ] },
      nota: "a·sen x + b·cos x = R·sen(x + φ) con R = √(a²+b²) y tan φ = b/a." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "sen(a + b) = sen a + sen b", bien: "sen a·cos b + cos a·sen b", por: "sen 30° + sen 60° = 1,37 > 1: imposible." },
        { mal: "cos(a + b) = cos a·cos b + sen a·sen b", bien: "… − sen a·sen b", por: "El signo del coseno de la suma es el contrario." },
        { mal: "sen 2a = 2·sen a", bien: "sen 2a = 2·sen a·cos a", por: "El seno no es lineal." },
        { mal: "Dividir entre cos x en sen 2x = cos x", bien: "Factor común: cos x(2sen x − 1) = 0", por: "Dividir pierde las soluciones con cos x = 0." },
        { mal: "sen 2x = 1/2 → x = 30° + 360°n", bien: "x = 15° + 180°n y 75° + 180°n", por: "Al despejar x se divide también el período." },
        { mal: "Pasar términos para demostrar una identidad", bien: "Transformar un solo lado", por: "Dar por cierta la igualdad es hacer trampa." }
      ] }
  ];

  // ================================================================
  // AMPLIACIÓN 2 · refuerzo del tema: rombo y pulsaciones, ecuaciones de 2.º grado,
  // a·sen x + b·cos x = c, sistemas, identidades difíciles, retos y problemas de examen
  // (simuladores nuevos en lab_trigo3.js)
  // ================================================================
  resumen.push(
    "<b>Suma → producto</b> con el rombo: al sumar los vectores (cos A, sen A) y (cos B, sen B) sale una diagonal de longitud 2·cos((A − B)/2) y dirección (A + B)/2. Con ondas: sen(2πf₁t) + sen(2πf₂t) = 2·cos(π(f₁ − f₂)t)·sen(π(f₁ + f₂)t): <b>pulsaciones</b> de frecuencia |f₁ − f₂|.",
    "<b>Ecuación de 2.º grado</b> en sen, cos o tan: cambio t = razón, resuelve, <b>descarta |t| &gt; 1</b> (seno y coseno) y deshaz el cambio. <b>a·sen x + b·cos x = c</b> sólo tiene solución si |c| ≤ √(a² + b²). Los <b>sistemas</b> se resuelven buscando ecuaciones para x + y y x − y."
  );

  nuevas.splice(nuevas.length - 2, 0,
    {
      h: "9. Suma y producto en acción: el rombo y las pulsaciones",
      html:
        "<p>Las fórmulas de la sección 6 no son sólo un truco algebraico: tienen una lectura geométrica y otra física muy bonitas.</p>" +
        "<h5>El rombo de dos vectores unitarios</h5>" +
        "<p>El punto de la circunferencia goniométrica de ángulo A es (cos A, sen A). Si sumas los vectores de dos puntos, A y B, obtienes la diagonal de un <b>rombo</b> (sus cuatro lados miden 1). En un rombo la diagonal es bisectriz: por eso la suma apunta en la dirección (A + B)/2; y como la mitad de la diagonal es el cateto de un triángulo rectángulo de hipotenusa 1 y ángulo (A − B)/2, la diagonal entera mide 2·cos((A − B)/2). Escribiendo sus coordenadas:</p>" +
        H.formula("cos A + cos B = 2·cos((A + B)/2)·cos((A − B)/2)        sen A + sen B = 2·sen((A + B)/2)·cos((A − B)/2)") +
        "<p>Son dos de las cuatro fórmulas de la tabla: ahora sabes de dónde salen. Mueve A y B y compara los dos lados de cada igualdad:</p>" +
        w("rombo") +
        "<h5>Sonidos que laten: las pulsaciones</h5>" +
        "<p>Cuando suenan a la vez dos notas de frecuencias casi iguales, el volumen «late»: sube y baja varias veces por segundo. Es el fenómeno de las <b>pulsaciones</b> (o batidos), y se usa para <b>afinar</b> instrumentos: se toca la cuerda junto a un diapasón y se tensa hasta que desaparece el latido. Una nota pura de frecuencia f es sen(2πf·t), y la suma de dos notas es sen A + sen B con A = 2πf₁t y B = 2πf₂t:</p>" +
        H.formula("sen(2πf₁t) + sen(2πf₂t) = 2·cos(π(f₁ − f₂)t)·sen(π(f₁ + f₂)t)") +
        "<p>Lo que oyes es una onda de frecuencia <b>media</b> (f₁ + f₂)/2 cuya amplitud, 2·cos(π(f₁ − f₂)t) (la <b>envolvente</b>), sube y baja. El oído percibe la intensidad, no el signo, así que se oye un «golpe» cada vez que la envolvente llega a un máximo en valor absoluto: la frecuencia del batido es <b>|f₁ − f₂|</b>. Experimenta con las frecuencias:</p>" +
        w("batidos") +
        ejemplo("Valores exactos con sumas", "Calcula cos 75° + cos 15° y sen 105° − sen 15° sin calculadora.", [
          "cos 75° + cos 15° = 2·cos 45°·cos 30° = 2·(√2/2)(√3/2) = <b>√6/2 ≈ 1,2247</b>.",
          "sen 105° − sen 15° = 2·cos((105° + 15°)/2)·sen((105° − 15°)/2) = 2·cos 60°·sen 45° = 2·(1/2)(√2/2) = <b>√2/2 ≈ 0,7071</b>."
        ]) +
        ejemplo("Dos diapasones", "Dos diapasones suenan a la vez con 440 Hz y 444 Hz. Escribe la suma como producto y calcula la frecuencia de la nota que se oye y las pulsaciones por segundo.", [
          "(A + B)/2 = π(440 + 444)t = 884πt y (A − B)/2 = π(440 − 444)t = −4πt. Como el coseno es par: sen(2π·440t) + sen(2π·444t) = <b>2·cos(4πt)·sen(884πt)</b>.",
          "La nota que se oye es sen(884πt) = sen(2π·442t): <b>442 Hz</b>, la frecuencia media.",
          "La envolvente 2·|cos(4πt)| llega a su máximo cuando 4πt = kπ, es decir, cada 0,25 s: <b>4 pulsaciones por segundo</b> = |440 − 444|."
        ]) +
        ejemplo("Producto a suma", "Calcula sen 75°·cos 15° sin calculadora.", [
          "Usamos sen A·cos B = ½[sen(A + B) + sen(A − B)] con A = 75° y B = 15°.",
          "= ½[sen 90° + sen 60°] = ½(1 + √3/2) = <b>(2 + √3)/4 ≈ 0,9330</b>.",
          "Comprobación: sen 75° = cos 15° = 0,9659 y 0,9659² = 0,9330 ✓."
        ]) +
        ejemplo("Una diferencia de cosenos", "Resuelve cos 5x − cos x = 0 en [0°, 360°).", [
          "cos 5x − cos x = −2·sen((5x + x)/2)·sen((5x − x)/2) = −2·sen 3x·sen 2x = 0.",
          "sen 3x = 0 → 3x = 0°, 180°, …, 900° → x = 0°, 60°, 120°, 180°, 240°, 300°. sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°.",
          "Reunidas: <b>x = 0°, 60°, 90°, 120°, 180°, 240°, 270° y 300°</b> (ocho; 0° y 180° salen en las dos).",
          "Comprobación: cos 5x = cos x se cumple si 5x = ±x + 360°·k, es decir, 4x = 360°·k (x = 90°·k) o 6x = 360°·k (x = 60°·k) ✓."
        ])
    },
    {
      h: "10. Ecuaciones de 2.º grado en seno, coseno o tangente",
      html:
        "<p>Muchas ecuaciones trigonométricas acaban siendo una ecuación de segundo grado en una razón. El método tiene cuatro pasos:</p>" +
        "<ol><li><b>Una sola razón y un solo ángulo.</b> Usa sen²x = 1 − cos²x (o al revés), cos 2x = 2cos²x − 1 = 1 − 2sen²x, tan x = sen x/cos x…</li>" +
        "<li><b>Cambio de variable.</b> Llama t a la razón (t = sen x, cos x o tan x) y resuelve a·t² + b·t + c = 0 con t = (−b ± √(b² − 4ac))/(2a).</li>" +
        "<li><b>Filtra las raíces.</b> Como −1 ≤ sen x ≤ 1 y −1 ≤ cos x ≤ 1, toda raíz con |t| &gt; 1 se <b>descarta</b>: no hay ningún ángulo con ese seno o coseno. Con la tangente valen todas.</li>" +
        "<li><b>Deshaz el cambio.</b> Para cada raíz válida resuelve la ecuación básica, con sus dos ángulos por vuelta.</li></ol>" +
        "<p>El simulador dibuja la parábola a·t² + b·t + c (los cortes con el eje son las raíces) sobre una franja verde que marca los valores posibles de un seno o un coseno; debajo, la misma expresión como función de x, cuyos ceros son las soluciones. Prueba los cuatro ejemplos y después tus propios coeficientes:</p>" +
        w("cuadratica") +
        ejemplo("Una raíz que se descarta", "Resuelve 2sen²x + 3sen x − 2 = 0 en [0°, 360°).", [
          "Con t = sen x: 2t² + 3t − 2 = 0 → t = (−3 ± √(9 + 16))/4 = (−3 ± 5)/4 → t = 1/2 o t = −2.",
          "t = −2 no vale: un seno nunca es menor que −1.",
          "sen x = 1/2 → <b>x = 30° o x = 150°</b>."
        ]) +
        ejemplo("Pasar todo a coseno", "Resuelve 2sen²x = 3cos x en [0°, 360°).", [
          "Sustituimos sen²x = 1 − cos²x: 2 − 2cos²x = 3cos x → 2cos²x + 3cos x − 2 = 0.",
          "Con t = cos x: t = (−3 ± 5)/4 → t = 1/2 o t = −2 (descartada).",
          "cos x = 1/2 → <b>x = 60° o x = 300°</b>."
        ]) +
        ejemplo("Con el ángulo doble", "Resuelve cos 2x + 5cos x + 3 = 0 en [0°, 360°).", [
          "cos 2x = 2cos²x − 1: 2cos²x − 1 + 5cos x + 3 = 0 → 2cos²x + 5cos x + 2 = 0.",
          "t = cos x: t = (−5 ± √(25 − 16))/4 = (−5 ± 3)/4 → t = −1/2 o t = −2 (descartada).",
          "cos x = −1/2 → <b>x = 120° o x = 240°</b>."
        ]) +
        ejemplo("Con la tangente", "Resuelve tan²x − (1 + √3)·tan x + √3 = 0 en [0°, 360°).", [
          "Con t = tan x, la suma de las raíces es 1 + √3 y su producto √3: son t = 1 y t = √3 (comprobación: 1·√3 = √3 ✓).",
          "tan x = 1 → x = 45° y 225°. tan x = √3 → x = 60° y 240°.",
          "<b>x = 45°, 60°, 225° y 240°</b>. Con la tangente no se descarta ninguna raíz."
        ]) +
        ejemplo("Raíz doble", "Resuelve 4sen²x − 4sen x + 1 = 0 en [0°, 360°).", [
          "(2·sen x − 1)² = 0 → sen x = 1/2 (raíz doble: el discriminante es 16 − 16 = 0).",
          "<b>x = 30° y x = 150°</b>: la raíz doble no añade soluciones, sólo cuenta una vez en t."
        ]) +
        ojo("no confundas la <i>razón</i> t con el <i>ángulo</i> x: la ecuación de segundo grado da valores de t; después hay que deshacer el cambio. Y nunca dividas entre una razón (sen x o cos x) para «simplificar»: saca factor común, o perderás soluciones.")
    },
    {
      h: "11. a·sen x + b·cos x = c: tres caminos",
      html:
        "<p>En la sección 7 resolvimos sen x − √3·cos x = 1 con un ángulo auxiliar. Veamos el método completo, su condición de existencia y dos alternativas.</p>" +
        "<h5>Camino 1: el ángulo auxiliar</h5>" +
        "<p>Se escribe a·sen x + b·cos x = R·sen(x + φ), con R = √(a² + b²), cos φ = a/R y sen φ = b/R. La ecuación queda sen(x + φ) = c/R. Como un seno está entre −1 y 1, <b>hay solución sólo si |c| ≤ R</b>: si |c| = R hay una (el seno vale ±1) y si |c| &lt; R hay dos por vuelta.</p>" +
        ejemplo("Cuando la recta es tangente", "Resuelve 3·sen x + 4·cos x = 5 en [0°, 360°).", [
          "R = √(9 + 16) = 5 y φ = arctan(4/3) = 53,13°: 3·sen x + 4·cos x = 5·sen(x + 53,13°).",
          "5·sen(x + 53,13°) = 5 → sen(x + 53,13°) = 1 → x + 53,13° = 90° → <b>x = 36,87°</b> (solución única: |c| = R)."
        ]) +
        ejemplo("Dos soluciones", "Resuelve 3·sen x + 4·cos x = 2 en [0°, 360°).", [
          "Con R = 5 y φ = 53,13°: sen(x + 53,13°) = 2/5 = 0,4 → x + 53,13° = 23,58° o 156,42° (más 360°·n).",
          "x = 23,58° − 53,13° = −29,55° ≡ 330,45°, o x = 156,42° − 53,13° = 103,29°.",
          "<b>x = 103,29° y x = 330,45°</b>. Comprobación: 3·sen 103,29° + 4·cos 103,29° = 2,92 − 0,92 = 2 ✓."
        ]) +
        ejemplo("Sin solución", "Resuelve 3·sen x + 4·cos x = 6.", [
          "R = 5, así que 3·sen x + 4·cos x = 5·sen(x + φ) nunca pasa de 5.",
          "Como 6 &gt; 5 (|c| &gt; R), <b>la ecuación no tiene solución</b>: sen(x + φ) = 1,2 es imposible."
        ]) +
        "<h5>Camino 2: elevar al cuadrado (con comprobación)</h5>" +
        "<p>Se aísla un término, se eleva al cuadrado y se usa sen²x = 1 − cos²x; sale una ecuación de segundo grado en cos x. Pero al elevar al cuadrado aparecen <b>soluciones falsas</b>, y hay que comprobar todas en la ecuación original.</p>" +
        ejemplo("La misma ecuación, elevando al cuadrado", "Resuelve 3·sen x + 4·cos x = 2 elevando al cuadrado.", [
          "3·sen x = 2 − 4·cos x → 9(1 − cos²x) = 4 − 16·cos x + 16·cos²x → 25·cos²x − 16·cos x − 5 = 0.",
          "cos x = (16 ± √(256 + 500))/50 = (16 ± 27,50)/50 → cos x = 0,8699 o cos x = −0,2299.",
          "Candidatos: 29,55°, 330,45° (cos = 0,8699) y 103,29°, 256,71° (cos = −0,2299).",
          "Comprobamos: x = 29,55° da 3·0,4929 + 4·0,8699 = 4,96 ≠ 2 ✗; x = 330,45° da 2 ✓; x = 103,29° da 2 ✓; x = 256,71° da −3,84 ✗.",
          "<b>x = 103,29° y x = 330,45°</b>, igual que con el ángulo auxiliar (que no genera soluciones falsas)."
        ]) +
        "<h5>Camino 3: el cambio t = tan(x/2)</h5>" +
        "<p>Con t = tan(x/2) todo se expresa con fracciones algebraicas: <b>sen x = 2t/(1 + t²)</b>, <b>cos x = (1 − t²)/(1 + t²)</b> y tan x = 2t/(1 − t²). (Salen de sen x = 2·sen(x/2)·cos(x/2) = 2·tan(x/2)·cos²(x/2), de cos x = cos²(x/2) − sen²(x/2) y de 1/cos²(x/2) = 1 + tan²(x/2).) La ecuación se convierte en una de 2.º grado en t. Pero tan(x/2) no existe para x = 180°: <b>hay que comprobar a mano x = 180°</b>, que este método no puede dar.</p>" +
        ejemplo("Con t = tan(x/2)", "Resuelve √3·sen x + cos x = 1 en [0°, 360°).", [
          "Sustituimos: √3·2t/(1 + t²) + (1 − t²)/(1 + t²) = 1. Multiplicamos por 1 + t²: 2√3·t + 1 − t² = 1 + t² → 2t² − 2√3·t = 0 → 2t(t − √3) = 0.",
          "t = 0 → x/2 = 0° → x = 0°. t = √3 → x/2 = 60° → x = 120°.",
          "Comprobamos x = 180° aparte: √3·0 + (−1) = −1 ≠ 1, no es solución. <b>x = 0° y x = 120°</b>.",
          "Con el ángulo auxiliar: R = 2, φ = 30°, 2·sen(x + 30°) = 1 → x + 30° = 30° o 150° → x = 0° o 120° ✓."
        ])
    },
    {
      h: "12. Sistemas de ecuaciones trigonométricas",
      html:
        "<p>Un sistema trigonométrico tiene dos incógnitas (dos ángulos x e y) y dos ecuaciones. No hay un método único, pero casi siempre funciona alguna de estas ideas: <b>(a)</b> despejar una incógnita si una ecuación es lineal en los ángulos (x + y = 120° → y = 120° − x); <b>(b)</b> sumar y restar las ecuaciones para formar sen(x ± y) o cos(x ± y); <b>(c)</b> pasar sumas a productos y dividir las ecuaciones; <b>(d)</b> pasar productos a sumas. El objetivo es llegar a ecuaciones para <b>x + y</b> y <b>x − y</b>, que forman un sistema lineal fácil.</p>" +
        ejemplo("Suma de ángulos conocida", "Resuelve x + y = 120°, sen x + sen y = 3/2 con x e y entre 0° y 180°.", [
          "sen x + sen y = 2·sen((x + y)/2)·cos((x − y)/2) = 2·sen 60°·cos((x − y)/2) = √3·cos((x − y)/2).",
          "√3·cos((x − y)/2) = 3/2 → cos((x − y)/2) = √3/2 → (x − y)/2 = ±30° → x − y = ±60°.",
          "Con x + y = 120°: si x − y = 60°, x = 90° e y = 30°; si x − y = −60°, x = 30° e y = 90°.",
          "<b>(x, y) = (90°, 30°) o (30°, 90°)</b>. Comprobación: sen 90° + sen 30° = 1,5 ✓."
        ]) +
        ejemplo("Producto y suma de ángulos", "Resuelve x + y = 120°, sen x·sen y = 1/4 con x &gt; y, ambos entre 0° y 180°.", [
          "Producto a suma: sen x·sen y = ½[cos(x − y) − cos(x + y)] = ½[cos(x − y) − cos 120°] = ½[cos(x − y) + 1/2].",
          "½[cos(x − y) + 1/2] = 1/4 → cos(x − y) + 1/2 = 1/2 → cos(x − y) = 0 → x − y = 90° (se toma el positivo porque x &gt; y).",
          "Con x + y = 120°: <b>x = 105° e y = 15°</b>. Comprobación: sen 105°·sen 15° = 0,9659·0,2588 = 0,25 ✓."
        ]) +
        ejemplo("Sumar y restar las ecuaciones", "Resuelve sen x·cos y = 3/4, cos x·sen y = 1/4 con x e y entre 0° y 90°.", [
          "Sumando: sen x·cos y + cos x·sen y = sen(x + y) = 1. Restando: sen x·cos y − cos x·sen y = sen(x − y) = 1/2.",
          "x + y está entre 0° y 180° y su seno es 1: x + y = 90°. x − y está entre −90° y 90° y su seno es 1/2: x − y = 30°.",
          "Sistema lineal: <b>x = 60° e y = 30°</b>. Comprobación: sen 60°·cos 30° = (√3/2)(√3/2) = 3/4 ✓ y cos 60°·sen 30° = 1/4 ✓."
        ]) +
        ejemplo("Dividir las dos ecuaciones", "Resuelve sen x + sen y = √6/2, cos x + cos y = √6/2 con 0° &lt; y &lt; x &lt; 90°.", [
          "Sumas a productos: 2·sen((x + y)/2)·cos((x − y)/2) = √6/2 y 2·cos((x + y)/2)·cos((x − y)/2) = √6/2.",
          "Dividimos la primera entre la segunda (se simplifica cos((x − y)/2) ≠ 0): tan((x + y)/2) = 1 → (x + y)/2 = 45° → x + y = 90°.",
          "En la primera: 2·sen 45°·cos((x − y)/2) = √6/2 → √2·cos((x − y)/2) = √6/2 → cos((x − y)/2) = √3/2 → x − y = 60°.",
          "<b>x = 75° e y = 15°</b>."
        ])
    },
    {
      h: "13. Identidades difíciles: técnicas para los casos duros",
      html:
        "<p>Cuando una identidad no cede con «pasar todo a seno y coseno», suelen funcionar estas técnicas:</p>" +
        "<ul><li><b>Multiplicar por el conjugado</b>: (1 + sen x)(1 − sen x) = 1 − sen²x = cos²x.</li>" +
        "<li><b>Diferencia de cuadrados</b>: cos⁴x − sen⁴x = (cos²x − sen²x)(cos²x + sen²x).</li>" +
        "<li><b>Sumas a productos</b> cuando hay ángulos múltiplos (x y 3x, por ejemplo).</li>" +
        "<li><b>Denominador común</b>, y reconocer sen(a − b) en un numerador del tipo sen a·cos b − cos a·sen b.</li>" +
        "<li><b>Un solo ángulo</b>: llevar todo al mismo ángulo con las fórmulas del doble y del triple.</li>" +
        "<li>Como último recurso, <b>t = tan(x/2)</b> (sección 11): convierte cualquier identidad en una igualdad de fracciones algebraicas.</li></ul>" +
        "<p>Recuerda que una identidad vale para todos los ángulos <i>en los que las dos expresiones están definidas</i> (los denominadores no se anulan); al simplificar, anota qué valores excluyes.</p>" +
        ejemplo("Con el conjugado", "Demuestra que (1 + sen x)/cos x = cos x/(1 − sen x).", [
          "Partimos del lado izquierdo y multiplicamos numerador y denominador por (1 − sen x) (que no es 0: excluimos x = 90°).",
          "(1 + sen x)(1 − sen x)/(cos x·(1 − sen x)) = (1 − sen²x)/(cos x·(1 − sen x)) = cos²x/(cos x·(1 − sen x)).",
          "Simplificando cos x queda <b>cos x/(1 − sen x)</b>, el lado derecho ∎."
        ]) +
        ejemplo("Diferencia de cuadrados", "Demuestra que cos⁴x − sen⁴x = cos 2x.", [
          "cos⁴x − sen⁴x = (cos²x − sen²x)(cos²x + sen²x).",
          "El segundo paréntesis vale 1 y el primero es cos 2x ∎."
        ]) +
        ejemplo("Sumas a productos", "Demuestra que (sen x + sen 3x)/(cos x + cos 3x) = tan 2x.", [
          "Numerador: sen x + sen 3x = 2·sen 2x·cos x. Denominador: cos x + cos 3x = 2·cos 2x·cos x.",
          "Cociente: (2·sen 2x·cos x)/(2·cos 2x·cos x) = sen 2x/cos 2x = tan 2x ∎ (se simplifica cos x ≠ 0)."
        ]) +
        ejemplo("Reconocer una resta", "Demuestra que sen 3x/sen x − cos 3x/cos x = 2.", [
          "Denominador común: (sen 3x·cos x − cos 3x·sen x)/(sen x·cos x).",
          "El numerador es sen(3x − x) = sen 2x = 2·sen x·cos x.",
          "Queda 2·sen x·cos x/(sen x·cos x) = 2 ∎ (con sen x·cos x ≠ 0)."
        ])
    },
    {
      h: "14. Retos: el ángulo entre dos rectas y el valor exacto de sen 18°",
      html:
        "<h5>Ángulo entre dos rectas</h5>" +
        "<p>Una recta de pendiente m forma con el eje X un ángulo α con tan α = m. Si dos rectas tienen pendientes m₁ y m₂ (ángulos α₁ y α₂), el ángulo entre ellas es α₂ − α₁ y, por la fórmula de la tangente de una diferencia:</p>" +
        H.formula("tan θ = " + fr("m₂ − m₁", "1 + m₁·m₂") + "      (ángulo agudo: con valor absoluto)") +
        "<p>Si 1 + m₁·m₂ = 0 la tangente no existe y θ = 90°: las rectas son perpendiculares (la condición m₁·m₂ = −1 que ya conoces).</p>" +
        ejemplo("Dos rectas cualesquiera", "Calcula el ángulo agudo entre y = 3x − 1 e y = −x/2 + 4.", [
          "Las pendientes son m₁ = 3 y m₂ = −1/2.",
          "tan θ = |(−1/2 − 3)/(1 + 3·(−1/2))| = |(−7/2)/(−1/2)| = 7.",
          "θ = arctan 7 = <b>81,87°</b>."
        ]) +
        "<h5>Un valor exacto sorprendente: sen 18°</h5>" +
        "<p>Los valores de 30°, 45° y 60° no son los únicos «exactos». El de 18° (y con él los de 36°, 54° y 72°) está ligado al pentágono regular y al número áureo. Se deduce con las fórmulas del ángulo doble y del triple.</p>" +
        ejemplo("El valor exacto de sen 18°", "Calcula sen 18° y cos 36° de forma exacta.", [
          "Sea s = sen 18°. Como 3·18° + 2·18° = 90°, los ángulos 54° y 36° son complementarios: sen 3θ = cos 2θ con θ = 18°.",
          "sen 3θ = 3s − 4s³ y cos 2θ = 1 − 2s². Igualando: 4s³ − 2s² − 3s + 1 = 0.",
          "s = 1 es raíz (4 − 2 − 3 + 1 = 0), luego (s − 1)(4s² + 2s − 1) = 0. Como s ≠ 1, 4s² + 2s − 1 = 0.",
          "s = (−2 ± √(4 + 16))/8 = (−1 ± √5)/4; la raíz positiva da <b>sen 18° = (√5 − 1)/4 ≈ 0,3090</b>.",
          "Y cos 36° = 1 − 2·sen²18° = 1 − 2·(6 − 2√5)/16 = <b>(1 + √5)/4 ≈ 0,8090</b>: la mitad del número áureo (1 + √5)/2."
        ])
    },
    {
      h: "15. Problemas de examen resueltos paso a paso",
      html:
        "<p>En un examen de fórmulas trigonométricas se puntúa el <b>camino</b>: qué fórmula eliges, cómo la aplicas y si compruebas el resultado. Cuatro problemas típicos, resueltos con el nivel de detalle que conviene escribir:</p>" +
        ejemplo("Problema 1 · Razones de una suma", "Sabiendo que sen a = 3/5 con a en el 2.º cuadrante y cos b = −5/13 con b en el 3.er cuadrante, calcula sen(a + b), cos(a − b) y tan(a + b), e indica en qué cuadrante está a + b.", [
          "Completamos con la relación fundamental: cos a = −4/5 (2.º cuadrante: coseno negativo) y sen b = −12/13 (3.er cuadrante: seno negativo).",
          "sen(a + b) = sen a·cos b + cos a·sen b = (3/5)(−5/13) + (−4/5)(−12/13) = −15/65 + 48/65 = <b>33/65</b>.",
          "cos(a + b) = cos a·cos b − sen a·sen b = (−4/5)(−5/13) − (3/5)(−12/13) = 20/65 + 36/65 = 56/65, luego tan(a + b) = (33/65)/(56/65) = <b>33/56</b>.",
          "cos(a − b) = cos a·cos b + sen a·sen b = 20/65 − 36/65 = <b>−16/65</b>.",
          "Seno y coseno de a + b son positivos: a + b está en el 1.er cuadrante (salvo vueltas). Comprobación: (33/65)² + (56/65)² = (1089 + 3136)/4225 = 1 ✓."
        ]) +
        ejemplo("Problema 2 · Una ecuación con tres senos", "Resuelve sen x + sen 2x + sen 3x = 0 en [0°, 360°).", [
          "Agrupamos los extremos: sen x + sen 3x = 2·sen 2x·cos x.",
          "La ecuación queda 2·sen 2x·cos x + sen 2x = 0 → sen 2x·(2·cos x + 1) = 0 (factor común: no se divide).",
          "sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°. 2·cos x + 1 = 0 → cos x = −1/2 → x = 120°, 240°.",
          "<b>x = 0°, 90°, 120°, 180°, 240° y 270°</b>."
        ]) +
        ejemplo("Problema 3 · Máximo y mínimo", "Halla el máximo y el mínimo de f(x) = cos 2x − 3·cos x y los ángulos en que se alcanzan.", [
          "cos 2x = 2cos²x − 1, así que f = 2t² − 3t − 1 con t = cos x ∈ [−1, 1].",
          "La parábola tiene el vértice en t = 3/4, dentro del intervalo: f(3/4) = 2·9/16 − 9/4 − 1 = −17/8 = −2,125. Es el <b>mínimo</b>, en cos x = 3/4: x = 41,41° o x = 318,59°.",
          "El máximo está en un extremo: f(−1) = 2 + 3 − 1 = 4 y f(1) = 2 − 3 − 1 = −2. <b>Máximo 4</b>, en cos x = −1: x = 180°."
        ]) +
        ejemplo("Problema 4 · Demostrar y aplicar", "Demuestra que tan(x/2) = (1 − cos x)/sen x y úsalo para calcular tan 15°.", [
          "Con 1 − cos x = 2·sen²(x/2) y sen x = 2·sen(x/2)·cos(x/2): (1 − cos x)/sen x = 2·sen²(x/2)/(2·sen(x/2)·cos(x/2)) = sen(x/2)/cos(x/2) = tan(x/2) ∎.",
          "Con x = 30°: tan 15° = (1 − cos 30°)/sen 30° = (1 − √3/2)/(1/2) = <b>2 − √3 ≈ 0,2679</b>."
        ])
    }
  );

  datos.errores.preguntas.push(
    { q: "Un alumno resuelve 2sen²x + 3sen x − 2 = 0 con t = sen x, obtiene t = 1/2 y t = −2, y escribe además la solución x = arcsen(−2). ¿Qué falla?",
      op: ["Nada: todas las raíces valen", "t = −2 se descarta: un seno no puede ser menor que −1 y arcsen(−2) no existe", "Debía usar cos x en vez de sen x", "t = 1/2 es la que sobra"], ok: 1,
      porque: "Como −1 ≤ sen x ≤ 1, la raíz t = −2 no corresponde a ningún ángulo. Sólo vale sen x = 1/2: x = 30° y 150°." },
    { q: "Para resolver sen 3x + sen x = 0, un alumno escribe sen 4x = 0. ¿Qué falla?",
      op: ["Nada: sen A + sen B = sen(A + B)", "La suma de senos no es el seno de la suma: sen 3x + sen x = 2·sen 2x·cos x", "Debía dar sen 2x = 0", "Debía restar en vez de sumar"], ok: 1,
      porque: "sen A + sen B ≠ sen(A + B) (con A = B = 30°: 1 ≠ 0,87). La suma a producto es 2·sen((A + B)/2)·cos((A − B)/2) = 2·sen 2x·cos x." },
    { q: "Al resolver 3sen x + 4cos x = 6 con el ángulo auxiliar, un alumno llega a sen(x + φ) = 1,2 y la calculadora da «Math Error». ¿Qué significa?",
      op: ["Que la calculadora está mal configurada", "Que la ecuación no tiene solución: 6 es mayor que R = 5, el máximo de 3sen x + 4cos x", "Que hay que usar grados", "Que x = 90°"], ok: 1,
      porque: "3sen x + 4cos x = 5·sen(x + φ) oscila entre −5 y 5. Sólo hay solución si |c| ≤ R = 5; con c = 6 no existe ningún x." }
  );

  datos.quiz1.preguntas.push(
    { q: "¿A qué es igual cos A − cos B?",
      op: ["2·sen((A + B)/2)·sen((A − B)/2)", "−2·sen((A + B)/2)·sen((A − B)/2)", "2·cos((A + B)/2)·cos((A − B)/2)", "cos(A − B)"], ok: 1,
      porque: "Restando cos(a + b) y cos(a − b) sale cos(a + b) − cos(a − b) = −2·sen a·sen b; con a = (A + B)/2 y b = (A − B)/2 se obtiene el signo menos." },
    { q: "Dos diapasones de 256 Hz y 260 Hz suenan a la vez. ¿Cuántas pulsaciones por segundo se perciben?",
      op: ["2", "4", "258", "516"], ok: 1,
      porque: "La frecuencia del batido es |f₁ − f₂| = |256 − 260| = 4 pulsaciones por segundo (la nota que se oye tiene la frecuencia media, 258 Hz)." },
    { q: "¿Cuántas soluciones tiene 2sen²x − sen x − 1 = 0 en [0°, 360°)?",
      op: ["2", "3", "4", "1"], ok: 1,
      porque: "Con t = sen x: t = 1 o t = −1/2. sen x = 1 da x = 90° (una) y sen x = −1/2 da 210° y 330°. En total 3 soluciones." },
    { q: "La ecuación 3sen x + 4cos x = c tiene solución si y sólo si…",
      op: ["c ≥ 0", "|c| ≤ 5", "|c| ≤ 7", "|c| ≤ 1"], ok: 1,
      porque: "3sen x + 4cos x = 5·sen(x + φ), que toma todos los valores entre −5 y 5. Por eso hay solución exactamente cuando |c| ≤ 5 (R = √(3² + 4²))." },
    { q: "El ángulo agudo entre las rectas y = 2x e y = x/3 mide…",
      op: ["45°", "30°", "60°", "26,57°"], ok: 0,
      porque: "tan θ = |(m₂ − m₁)/(1 + m₁m₂)| = |(1/3 − 2)/(1 + 2/3)| = (5/3)/(5/3) = 1, luego θ = 45°." },
    { q: "Al resolver con t = tan(x/2) una ecuación a·sen x + b·cos x = c, ¿qué hay que comprobar aparte?",
      op: ["x = 0°", "x = 90°", "x = 180°, porque tan(x/2) no existe", "x = 360°"], ok: 2,
      porque: "Con x = 180°, x/2 = 90° y tan 90° no existe: el cambio no puede dar esa solución. Se comprueba a mano si x = 180° cumple la ecuación." }
  );

  ejercicios.push(
    // ================= ★ básico =================
    { id: "h37", nivel: 1,
      enunciado: "Calcula cos 75° + cos 15° sin calculadora (da el valor decimal).",
      check: { tipo: "num", etiqueta: "valor =", valor: 1.2247, tol: 0.002, ph: "decimal" },
      pistas: ["cos A + cos B = 2·cos((A + B)/2)·cos((A − B)/2)."],
      pasos: ["(75° + 15°)/2 = 45° y (75° − 15°)/2 = 30°.", "cos 75° + cos 15° = 2·cos 45°·cos 30° = 2·(√2/2)(√3/2) = √6/2 ≈ 1,2247."],
      resultado: "√6/2 ≈ 1,2247" },
    { id: "h38", nivel: 1,
      enunciado: "Calcula el ángulo agudo entre las rectas y = x e y = x/3 + 1 (en grados).",
      check: { tipo: "num", etiqueta: "θ =", valor: 26.565, unidad: "°" },
      pistas: ["tan θ = |(m₂ − m₁)/(1 + m₁·m₂)|."],
      pasos: ["m₁ = 1 y m₂ = 1/3.", "tan θ = (1 − 1/3)/(1 + 1/3) = (2/3)/(4/3) = 1/2.", "θ = arctan(1/2) = 26,565°."],
      resultado: "≈ 26,57°" },
    // ================= ★★ intermedio =================
    { id: "h39", nivel: 2,
      enunciado: "Resuelve 2sen²x = 3cos x en [0°, 360°). Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [60, 300], unidad: "°" },
      pistas: ["Sustituye sen²x = 1 − cos²x y usa t = cos x."],
      pasos: ["2(1 − cos²x) = 3cos x → 2cos²x + 3cos x − 2 = 0.", "t = (−3 ± 5)/4 → t = 1/2 o t = −2 (descartada).", "cos x = 1/2 → x = 60° o 300°."],
      resultado: "x = 60° y 300°" },
    { id: "h40", nivel: 2,
      enunciado: "Resuelve cos 2x + 5cos x + 3 = 0 en [0°, 360°). Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [120, 240], unidad: "°" },
      pistas: ["cos 2x = 2cos²x − 1."],
      pasos: ["2cos²x − 1 + 5cos x + 3 = 0 → 2cos²x + 5cos x + 2 = 0.", "t = (−5 ± 3)/4 → t = −1/2 o t = −2 (descartada).", "cos x = −1/2 → x = 120° o 240°."],
      resultado: "x = 120° y 240°" },
    { id: "h41", nivel: 2,
      enunciado: "Resuelve tan²x − (1 + √3)·tan x + √3 = 0 en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [45, 60, 225, 240], unidad: "°" },
      pistas: ["Con t = tan x, busca dos números de suma 1 + √3 y producto √3."],
      pasos: ["t = 1 y t = √3.", "tan x = 1 → 45° y 225°. tan x = √3 → 60° y 240°."],
      resultado: "x = 45°, 60°, 225°, 240°" },
    { id: "h42", nivel: 2,
      enunciado: "Resuelve cos x + cos 3x = cos 2x en [0°, 360°). Escribe las seis soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [45, 60, 135, 225, 300, 315], unidad: "°" },
      pistas: ["cos x + cos 3x = 2·cos 2x·cos x. Pasa todo a un lado y saca factor común cos 2x."],
      pasos: ["2·cos 2x·cos x − cos 2x = 0 → cos 2x·(2cos x − 1) = 0.", "cos 2x = 0 → 2x = 90°, 270°, 450°, 630° → x = 45°, 135°, 225°, 315°.", "cos x = 1/2 → x = 60°, 300°."],
      resultado: "x = 45°, 60°, 135°, 225°, 300°, 315°" },
    { id: "h43", nivel: 2,
      enunciado: "Dos diapasones suenan a la vez con frecuencias de 440 Hz y 444 Hz. Calcula la frecuencia del batido (pulsaciones por segundo) y la frecuencia de la nota que se oye.",
      check: [{ tipo: "num", etiqueta: "batido =", valor: 4, unidad: "pulsaciones/s" }, { tipo: "num", etiqueta: "nota que se oye =", valor: 442, unidad: "Hz" }],
      pistas: ["sen(2πf₁t) + sen(2πf₂t) = 2·cos(π(f₁ − f₂)t)·sen(π(f₁ + f₂)t)."],
      pasos: ["Batido: |f₁ − f₂| = |440 − 444| = 4 pulsaciones por segundo.", "Nota que se oye: la frecuencia media (440 + 444)/2 = 442 Hz."],
      resultado: "4 pulsaciones/s · 442 Hz" },
    // ================= ★★★ reto =================
    { id: "h44", nivel: 3,
      enunciado: "Resuelve el sistema sen x·cos y = 3/4, cos x·sen y = 1/4 con x e y entre 0° y 90°. Da x e y en grados.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 60, unidad: "°" }, { tipo: "num", etiqueta: "y =", valor: 30, unidad: "°" }],
      pistas: ["Suma y resta las dos ecuaciones: aparecen sen(x + y) y sen(x − y)."],
      pasos: ["Suma: sen(x + y) = 1 → x + y = 90°. Resta: sen(x − y) = 1/2 → x − y = 30°.", "x = 60° e y = 30°. Comprobación: sen 60°·cos 30° = 3/4 ✓."],
      resultado: "x = 60°, y = 30°" },
    { id: "h45", nivel: 3,
      enunciado: "Resuelve x + y = 120°, sen x·sen y = 1/4 con x &gt; y, ambos entre 0° y 180°. Da x e y en grados.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 105, unidad: "°" }, { tipo: "num", etiqueta: "y =", valor: 15, unidad: "°" }],
      pistas: ["sen x·sen y = ½[cos(x − y) − cos(x + y)]."],
      pasos: ["½[cos(x − y) − cos 120°] = ½[cos(x − y) + 1/2] = 1/4 → cos(x − y) = 0.", "x − y = 90° (x &gt; y) y x + y = 120° → x = 105°, y = 15°."],
      resultado: "x = 105°, y = 15°" },
    { id: "h46", nivel: 3,
      enunciado: "Resuelve 3sen x + 4cos x = 2 en [0°, 360°). Escribe las dos soluciones (en grados, con decimales).",
      check: { tipo: "lista", etiqueta: "x =", valores: [103.29, 330.45], unidad: "°" },
      pistas: ["R = 5 y φ = 53,13°: 3sen x + 4cos x = 5·sen(x + 53,13°)."],
      pasos: ["sen(x + 53,13°) = 0,4 → x + 53,13° = 23,58° o 156,42°.", "x = −29,55° ≡ 330,45°, o x = 103,29°.", "Comprobación: 3·sen 103,29° + 4·cos 103,29° = 2 ✓."],
      resultado: "x = 103,29° y 330,45°" },
    { id: "h47", nivel: 3,
      enunciado: "Demuestra que sen 3x/sen x − cos 3x/cos x = 2.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Reduce las fracciones a denominador común sen x·cos x", p: 0.5 },
        { t: "Llega al numerador sen 3x·cos x − cos 3x·sen x", p: 0.5 },
        { t: "Lo reconoce como sen(3x − x) = sen 2x", p: 0.5 },
        { t: "Usa sen 2x = 2·sen x·cos x y simplifica hasta 2", p: 0.5 }
      ] },
      pasos: ["sen 3x/sen x − cos 3x/cos x = (sen 3x·cos x − cos 3x·sen x)/(sen x·cos x).", "El numerador es sen(3x − x) = sen 2x = 2·sen x·cos x.", "Queda 2·sen x·cos x/(sen x·cos x) = 2."],
      resultado: "= 2 (con sen x·cos x ≠ 0)" },
    { id: "h48", nivel: 3,
      enunciado: "Sabiendo que s = sen 18° cumple sen 3θ = cos 2θ para θ = 18°, deduce la ecuación 4s² + 2s − 1 = 0 y calcula sen 18° y cos 36° (valores decimales).",
      check: [{ tipo: "num", etiqueta: "sen 18° =", valor: 0.3090, tol: 0.002, ph: "decimal" }, { tipo: "num", etiqueta: "cos 36° =", valor: 0.8090, tol: 0.002, ph: "decimal" }],
      pistas: ["sen 3θ = 3s − 4s³ y cos 2θ = 1 − 2s². Verás que s = 1 es una raíz.", "cos 36° = 1 − 2sen²18°."],
      pasos: ["4s³ − 2s² − 3s + 1 = 0 = (s − 1)(4s² + 2s − 1). Como s ≠ 1: 4s² + 2s − 1 = 0.", "s = (−1 + √5)/4 ≈ 0,3090 (la raíz positiva).", "cos 36° = 1 − 2·0,3090² = 0,8090 = (1 + √5)/4."],
      resultado: "sen 18° = (√5 − 1)/4 ≈ 0,3090 · cos 36° = (1 + √5)/4 ≈ 0,8090" }
  );

  lamina.push(
    { titulo: "Ecuaciones de 2.º grado y a·sen x + b·cos x = c", ancha: true,
      items: [
        { label: "2.º grado en una razón", formula: "t = sen x, cos x o tan x  →  a·t² + b·t + c = 0", cuando: "Reduce a una razón y un ángulo (sen² = 1 − cos², cos 2x = 2cos² − 1).", ojo: "Descarta las raíces con |t| &gt; 1 (sen y cos). Con tan valen todas." },
        { label: "Ángulo auxiliar", formula: "a·sen x + b·cos x = R·sen(x + φ),  R = √(a² + b²),  tan φ = b/a", cuando: "Sólo hay solución si |c| ≤ R.", ejemplo: "3sen x + 4cos x = 2 → x = 103,29° y 330,45°" },
        { label: "Cambio t = tan(x/2)", formula: "sen x = 2t/(1 + t²)  ·  cos x = (1 − t²)/(1 + t²)", ojo: "Comprueba aparte x = 180°." }
      ],
      nota: "Elevar al cuadrado crea soluciones falsas: comprueba siempre en la ecuación original." },
    { titulo: "Sistemas, pulsaciones y retos", ancha: true,
      items: [
        { label: "Sistemas", formula: "busca x + y y x − y: sumar y restar (sen(x ± y)), sumas a productos y dividir, productos a sumas", ejemplo: "sen x·cos y = 3/4, cos x·sen y = 1/4 → x = 60°, y = 30°" },
        { label: "Pulsaciones", formula: "sen(2πf₁t) + sen(2πf₂t) = 2·cos(π(f₁ − f₂)t)·sen(π(f₁ + f₂)t)", cuando: "Batido = |f₁ − f₂|; nota = (f₁ + f₂)/2.", ejemplo: "440 Hz y 444 Hz → 4 pulsaciones/s" },
        { label: "Ángulo entre rectas", formula: "tan θ = |(m₂ − m₁)/(1 + m₁·m₂)|", ejemplo: "pendientes 2 y 1/3 → 45°" },
        { label: "Valor exacto de 18°", formula: "sen 18° = (√5 − 1)/4  ·  cos 36° = (1 + √5)/4" }
      ],
      nota: "Identidades difíciles: conjugado, diferencia de cuadrados, sumas a productos, denominador común o t = tan(x/2)." }
  );

  B.registrar("mates1", "t5", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
