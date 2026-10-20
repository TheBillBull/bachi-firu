/* ============================================================
   Matemáticas I · ampliaciones · Tema 1: Números reales
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, formula = H.formula, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t1/" + ref); }

  var resumen = [
    "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. <b>Racional</b> = decimal exacto o periódico (se puede escribir como fracción); <b>irracional</b> = infinitos decimales sin patrón.",
    "Un intervalo se escribe de tres formas (notación, desigualdad, recta). Corchete: el extremo <b>entra</b>; paréntesis: <b>no entra</b>.",
    "|x − a| es la <b>distancia</b> entre x y a. «&lt; k» da un intervalo; «&gt; k» da dos semirrectas.",
    "Radicales: saca los cuadrados perfectos y <b>racionaliza</b>; si el denominador tiene una suma o resta con raíces, multiplica por el <b>conjugado</b>.",
    "Notación científica a·10ⁿ con 1 ≤ a &lt; 10. Error relativo = error absoluto ÷ valor real."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Clasificación
  secciones[0] =
    "<h5>Decimal ⇄ fracción: la prueba de que un número es racional</h5>" +
    "<p>La definición de racional («se puede escribir como fracción») es poco práctica si no sabes <em>cómo</em> escribirlo. Por suerte hay un criterio muy cómodo: <b>un número es racional si y solo si su expresión decimal es exacta o periódica</b>. Y siempre se puede pasar de un decimal a una fracción con un truco: multiplicar por una potencia de 10 y restar para que desaparezca la parte que se repite.</p>" +
    "<p>Se distinguen tres casos:</p>" +
    "<ul><li><b>Decimal exacto</b> (por ejemplo 1,24): se escribe con una potencia de 10 en el denominador y se simplifica. 1,24 = 124/100 = 31/25.</li>" +
    "<li><b>Periódico puro</b> (el periodo empieza justo tras la coma, por ejemplo 0,4545…): se multiplica por 10 elevado al número de cifras del periodo y se resta.</li>" +
    "<li><b>Periódico mixto</b> (hay cifras antes del periodo, por ejemplo 3,2777…): se multiplica dos veces, una para llevar la coma justo antes del periodo y otra para llevarla justo después, y se resta.</li></ul>" +
    ejemplo("Periódico puro", "Escribe 0,4545… como fracción.", [
      "Llamamos x = 0,4545… El periodo (45) tiene 2 cifras, así que multiplicamos por 10² = 100.",
      "100x = 45,4545…   y   x = 0,4545…",
      "Restamos: 100x − x = 45,4545… − 0,4545… = 45, y por tanto 99x = 45.",
      "Despejamos y simplificamos: x = 45/99 = <b>5/11</b>.",
      "Comprobación: 5 ÷ 11 = 0,454545… ✓"
    ]) +
    ejemplo("Periódico mixto", "Escribe 3,2777… como fracción.", [
      "Llamamos x = 3,2777… Antes del periodo (7) hay una cifra (el 2), así que primero multiplicamos por 10 para que la coma quede justo antes del periodo: 10x = 32,777…",
      "Ahora multiplicamos por 100 para que la coma quede justo después de un periodo: 100x = 327,777…",
      "Restamos las dos: 100x − 10x = 327,777… − 32,777… = 295, es decir, 90x = 295.",
      "x = 295/90 = <b>59/18</b>.",
      "Regla rápida: <b>(número entero sin coma) − (parte que no se repite)</b> sobre tantos 9 como cifras tiene el periodo, seguidos de tantos 0 como cifras tiene la parte decimal que no se repite. Aquí (327 − 32)/90 ✓"
    ]) +
    "<h5>Fracción → decimal: cómo saber de antemano qué sale</h5>" +
    "<p>Al dividir el numerador entre el denominador, la división se corta o se repite. Hay un criterio para saberlo sin dividir: <b>simplifica la fracción</b> y descompón el denominador en factores primos. Si solo aparecen el 2 y el 5, el decimal es <b>exacto</b>; si aparece cualquier otro primo, es <b>periódico</b>.</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>7/20</td><td>20 = 2²·5 → solo 2 y 5 → exacto: 0,35</td></tr>" +
    "<tr><td>5/12</td><td>12 = 2²·3 → aparece el 3 → periódico mixto: 0,41666…</td></tr>" +
    "<tr><td>4/9</td><td>9 = 3² → periódico puro: 0,444…</td></tr>" +
    "<tr><td>1/7</td><td>7 → periódico puro con un periodo de 6 cifras: 0,142857142857…</td></tr>" +
    "</tbody></table>" +
    "<h5>Qué pasa al operar con racionales e irracionales</h5>" +
    "<p>Dentro de ℚ puedes sumar, restar, multiplicar y dividir (salvo por 0) y el resultado sigue siendo racional. Con irracionales hay que ir con cuidado:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>racional + racional</td><td>siempre racional: 1/2 + 1/3 = 5/6</td></tr>" +
    "<tr><td>racional + irracional</td><td>siempre irracional: 1 + √2</td></tr>" +
    "<tr><td>racional (≠ 0) · irracional</td><td>siempre irracional: 3·π</td></tr>" +
    "<tr><td>irracional + irracional</td><td><b>puede ser cualquiera</b>: √2 + (−√2) = 0 es racional, pero √2 + √3 es irracional</td></tr>" +
    "<tr><td>irracional · irracional</td><td><b>puede ser cualquiera</b>: √2·√2 = 2 es racional, pero √2·√3 = √6 es irracional</td></tr>" +
    "</tbody></table>" +
    "<p>Ahora juega: clasifica cada número en el conjunto <em>más pequeño</em> al que pertenece.</p>" +
    w("clasificar", "clasnum");

  // ---------------------------------------------------------------- 2. Recta e intervalos
  secciones[1] =
    "<h5>Tres maneras de escribir lo mismo</h5>" +
    "<p>Un mismo conjunto de números se puede describir con notación de intervalo, con una desigualdad o dibujándolo en la recta. En los problemas tienes que pasar de una a otra sin pensar:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>[−2, 5)</td><td>−2 ≤ x &lt; 5</td><td>círculo relleno en −2, hueco en 5, y todo lo de en medio</td></tr>" +
    "<tr><td>(−3, 1]</td><td>−3 &lt; x ≤ 1</td><td>hueco en −3, relleno en 1</td></tr>" +
    "<tr><td>[0, 4]</td><td>0 ≤ x ≤ 4</td><td>relleno en los dos extremos</td></tr>" +
    "<tr><td>(2, +∞)</td><td>x &gt; 2</td><td>hueco en 2 y flecha hacia la derecha</td></tr>" +
    "<tr><td>(−∞, 3]</td><td>x ≤ 3</td><td>relleno en 3 y flecha hacia la izquierda</td></tr>" +
    "<tr><td>(−∞, +∞)</td><td>cualquier x</td><td>toda la recta (es ℝ)</td></tr>" +
    "</tbody></table>" +
    "<p>Regla de oro: <b>±∞ siempre lleva paréntesis</b>, porque el infinito no es un número y por tanto nunca «entra». Mueve los extremos y observa cómo cambia cada forma de escritura:</p>" +
    w("intervalos") +
    "<h5>Desigualdades: la regla que más se olvida</h5>" +
    "<p>Las inecuaciones se resuelven igual que las ecuaciones, con una excepción importante: <b>si multiplicas o divides los dos lados por un número negativo, el sentido de la desigualdad se invierte</b>. Lo ves con números: 2 &lt; 5 es verdad, pero al multiplicar por −1 queda −2 &gt; −5, no −2 &lt; −5.</p>" +
    ejemplo("Inecuación de primer grado", "Resuelve 5 − 3x ≤ 11 y escribe la solución como intervalo.", [
      "Restamos 5 en los dos lados: −3x ≤ 6.",
      "Dividimos entre −3. Como es negativo, <b>invertimos</b> el sentido: x ≥ −2.",
      "Solución: <b>[−2, +∞)</b>.",
      "Comprobación con x = 0 (que está en la solución): 5 − 0 = 5 ≤ 11 ✓. Con x = −3 (fuera): 5 + 9 = 14 ≤ 11 es falso ✓."
    ]) +
    ejemplo("Sistema de inecuaciones", "Resuelve a la vez: 2x − 1 &lt; 7   y   3x + 2 ≥ −4.", [
      "Primera: 2x &lt; 8 → x &lt; 4, es decir, (−∞, 4).",
      "Segunda: 3x ≥ −6 → x ≥ −2, es decir, [−2, +∞).",
      "Como se piden las dos a la vez, se hace la <b>intersección</b>: (−∞, 4) ∩ [−2, +∞) = <b>[−2, 4)</b>."
    ]) +
    "<h5>Unión e intersección de intervalos</h5>" +
    "<p>La <b>intersección</b> A ∩ B son los números que están en A <em>y</em> en B. La <b>unión</b> A ∪ B son los que están en A <em>o</em> en B (o en los dos). Ayúdate de la recta: dibuja A arriba y B debajo, y mira dónde coinciden o dónde cubren.</p>" +
    w("opintervalos") +
    ejemplo("Dos operaciones", "Sean A = [−2, 3) y B = (0, 5]. Calcula A ∩ B y A ∪ B.", [
      "Dibujamos A: de −2 (incluido) a 3 (no incluido). Dibujamos B: de 0 (no incluido) a 5 (incluido).",
      "Intersección: empieza donde empieza el más a la derecha (0, que no entra porque B no lo incluye) y acaba donde acaba el más a la izquierda (3, que no entra porque A no lo incluye): <b>A ∩ B = (0, 3)</b>.",
      "Unión: empieza en el más pequeño (−2, que entra porque A lo incluye) y acaba en el más grande (5, que entra porque B lo incluye); como se solapan, no queda hueco: <b>A ∪ B = [−2, 5]</b>."
    ]) +
    ojo("si dos intervalos se tocan en un punto, mira si ese punto entra en alguno. (0, 2) ∪ (2, 5) <em>no</em> contiene el 2 y son dos trozos; pero (0, 2) ∪ [2, 5) = (0, 5) sí es un solo intervalo.") +
    "<h5>Entornos</h5>" +
    "<p>El <b>entorno</b> de centro a y radio r es E(a, r) = (a − r, a + r) = {x : |x − a| &lt; r}. El <b>entorno reducido</b> E*(a, r) es lo mismo pero sin el centro: (a − r, a) ∪ (a, a + r). Ejemplo: E(3; 0,5) = (2,5; 3,5). Los entornos serán la herramienta para definir límites y continuidad en el Tema 10.</p>";

  // ---------------------------------------------------------------- 3. Valor absoluto
  secciones[2] =
    "<h5>Valor absoluto = distancia</h5>" +
    "<p>La mejor forma de entender |x − a| es leerlo como «la distancia entre x y a». Con esa idea, las ecuaciones e inecuaciones se resuelven <em>mirando</em> la recta. Experimenta cambiando el centro, el radio y el signo de la desigualdad:</p>" +
    w("valorabs") +
    "<h5>Propiedades útiles</h5>" +
    "<ul><li>|a| ≥ 0 siempre, y |a| = 0 solo si a = 0.</li>" +
    "<li>|a·b| = |a|·|b| y |a/b| = |a|/|b| (b ≠ 0).</li>" +
    "<li>|a| = √(a²). Por eso √(a²) = |a| y no «a».</li>" +
    "<li><b>Desigualdad triangular</b>: |a + b| ≤ |a| + |b|. (Con a = 3 y b = −5: |−2| = 2 ≤ 3 + 5 = 8.) Nunca se puede decir que |a + b| = |a| + |b| salvo que a y b tengan el mismo signo.</li></ul>" +
    "<h5>El valor absoluto como función a trozos</h5>" +
    "<p>Para quitar las barras sin la ayuda de la recta se estudia el signo del interior: |A| = A cuando A ≥ 0, y |A| = −A cuando A &lt; 0. Por ejemplo, f(x) = |2x − 4| vale 2x − 4 si 2x − 4 ≥ 0, es decir, si x ≥ 2; y vale −(2x − 4) = 4 − 2x si x &lt; 2. Su gráfica es una «V» con vértice en (2, 0).</p>" +
    w("grafabs") +
    "<h5>Ecuaciones con valor absoluto</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>|A| = k  con k &gt; 0</td><td>dos casos: A = k  ó  A = −k</td></tr>" +
    "<tr><td>|A| = 0</td><td>una sola: A = 0</td></tr>" +
    "<tr><td>|A| = k  con k &lt; 0</td><td><b>no tiene solución</b> (una distancia nunca es negativa)</td></tr>" +
    "<tr><td>|A| = |B|</td><td>A = B  ó  A = −B</td></tr>" +
    "<tr><td>|A| = B  (B es una expresión con x)</td><td>exige B ≥ 0; se resuelven los dos casos y <b>se comprueban</b> las soluciones</td></tr>" +
    "</tbody></table>" +
    ejemplo("Ecuación con una expresión a la derecha", "Resuelve |x − 1| = 2x + 3.", [
      "Como un valor absoluto no puede ser negativo, es necesario que 2x + 3 ≥ 0, es decir, x ≥ −3/2. Esa es la condición que hay que comprobar al final.",
      "Caso 1: x − 1 = 2x + 3 → −x = 4 → x = −4. Pero −4 &lt; −3/2, así que no cumple la condición: <b>se descarta</b>.",
      "Caso 2: x − 1 = −(2x + 3) → x − 1 = −2x − 3 → 3x = −2 → x = −2/3. Cumple −2/3 ≥ −3/2: <b>vale</b>.",
      "Comprobación: |−2/3 − 1| = 5/3 y 2·(−2/3) + 3 = 5/3 ✓. Solución única: <b>x = −2/3</b>."
    ]) +
    ejemplo("Igualdad de dos valores absolutos", "Resuelve |x − 1| = |2x + 3|.", [
      "Dos números tienen el mismo valor absoluto cuando son iguales u opuestos: x − 1 = 2x + 3  ó  x − 1 = −(2x + 3).",
      "Primera: x − 1 = 2x + 3 → x = −4.",
      "Segunda: x − 1 = −2x − 3 → 3x = −2 → x = −2/3.",
      "En este tipo no hace falta comprobar el signo, porque los dos lados ya son valores absolutos. Soluciones: <b>x = −4 y x = −2/3</b>."
    ]) +
    "<h5>Inecuaciones con valor absoluto</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>|A| &lt; k  (k &gt; 0)</td><td>−k &lt; A &lt; k: <b>un intervalo</b></td></tr>" +
    "<tr><td>|A| ≤ k</td><td>−k ≤ A ≤ k</td></tr>" +
    "<tr><td>|A| &gt; k  (k &gt; 0)</td><td>A &lt; −k  ó  A &gt; k: <b>dos semirrectas</b> (unión)</td></tr>" +
    "<tr><td>|A| ≥ k</td><td>A ≤ −k  ó  A ≥ k</td></tr>" +
    "<tr><td>|A| &lt; k  con k ≤ 0</td><td>sin solución (|A| &lt; 0 es imposible; |A| &lt; 0 nunca)</td></tr>" +
    "<tr><td>|A| &gt; k  con k &lt; 0</td><td>toda la recta (siempre es verdad)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Tipo «menor que»", "Resuelve |2x − 1| &lt; 5.", [
      "−5 &lt; 2x − 1 &lt; 5 (se quita el valor absoluto con la doble desigualdad).",
      "Sumamos 1 a las tres partes: −4 &lt; 2x &lt; 6.",
      "Dividimos entre 2 (positivo, no cambia el sentido): −2 &lt; x &lt; 3.",
      "Solución: <b>(−2, 3)</b>. Interpretación: los x cuya distancia a 1/2 es menor que 5/2."
    ]) +
    ejemplo("Tipo «mayor que»", "Resuelve |x + 2| ≥ 3.", [
      "|x + 2| ≥ 3 significa x + 2 ≤ −3  ó  x + 2 ≥ 3.",
      "Primera: x ≤ −5. Segunda: x ≥ 1.",
      "Solución: <b>(−∞, −5] ∪ [1, +∞)</b>. Fíjate en que ahora es una <em>unión</em>, no una intersección."
    ]) +
    ejemplo("Con una expresión en el lado derecho", "Resuelve |x − 1| &lt; 2x.", [
      "Para que |x − 1| &lt; 2x pueda cumplirse hace falta 2x &gt; 0, es decir, x &gt; 0.",
      "La desigualdad equivale a −2x &lt; x − 1 &lt; 2x. Se separa en dos: (a) x − 1 &lt; 2x → x &gt; −1; (b) −2x &lt; x − 1 → 1 &lt; 3x → x &gt; 1/3.",
      "Se cumplen a la vez (a), (b) y x &gt; 0: la más exigente es x &gt; 1/3.",
      "Solución: <b>(1/3, +∞)</b>. Comprobación con x = 1: |0| = 0 &lt; 2 ✓; con x = 0,3: |−0,7| = 0,7 &lt; 0,6 es falso ✓."
    ]);

  // ---------------------------------------------------------------- 4. Potencias y radicales
  secciones[3] =
    "<h5>Potencias: cuidado con los signos y con las fracciones</h5>" +
    "<ul><li><b>Base negativa</b>: (−2)⁴ = 16 pero (−2)³ = −8. Un exponente par vuelve positivo el resultado.</li>" +
    "<li><b>Paréntesis</b>: (−3)² = 9, pero −3² = −9 (el cuadrado solo afecta al 3).</li>" +
    "<li><b>Base fraccionaria</b>: (a/b)ⁿ = aⁿ/bⁿ, y con exponente negativo se da la vuelta: (2/3)⁻² = (3/2)² = 9/4.</li>" +
    "<li><b>Mismo exponente</b>: aⁿ·bⁿ = (a·b)ⁿ. Por ejemplo, 2⁵·5⁵ = 10⁵.</li></ul>" +
    ejemplo("Simplificar con letras", "Simplifica " + fr("a³·b⁻²", "a⁻¹·b") + " y deja los exponentes positivos.", [
      "Se resta el exponente del denominador al del numerador, letra por letra: a³⁻⁽⁻¹⁾ = a⁴ y b⁻²⁻¹ = b⁻³.",
      "Queda a⁴·b⁻³. Para tener exponentes positivos, b⁻³ = 1/b³: <b>a⁴/b³</b>."
    ]) +
    "<h5>Radicales de cualquier índice</h5>" +
    "<p>Un radical ⁿ√a es lo mismo que a<sup>1/n</sup>. Esa equivalencia es la llave de todas las propiedades: los radicales se manejan con las reglas de las potencias.</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>ⁿ√(a·b) = ⁿ√a · ⁿ√b</td><td>raíz de un producto</td></tr>" +
    "<tr><td>ⁿ√(a/b) = ⁿ√a / ⁿ√b</td><td>raíz de un cociente</td></tr>" +
    "<tr><td>ᵐ√(ⁿ√a) = ᵐⁿ√a</td><td>raíz de una raíz: se multiplican los índices</td></tr>" +
    "<tr><td>ⁿ√(aᵐ) = a<sup>m/n</sup></td><td>pasar a potencia de exponente fraccionario</td></tr>" +
    "<tr><td>ⁿ√(aⁿ) = a (si a ≥ 0)</td><td>sale directamente; con índice par, ⁿ√(aⁿ) = |a|</td></tr>" +
    "</tbody></table>" +
    "<p><b>No existen</b> reglas parecidas para sumas: √(a + b) ≠ √a + √b. Por ejemplo, √(9 + 16) = 5, pero √9 + √16 = 7.</p>" +
    ejemplo("Extraer factores de la raíz", "Simplifica ³√54 y √(18x³) con x ≥ 0.", [
      "Para ³√54 buscamos cubos perfectos: 54 = 27·2 = 3³·2, así que ³√54 = ³√(3³)·³√2 = <b>3·³√2</b>.",
      "Para √(18x³): 18 = 9·2 = 3²·2 y x³ = x²·x, así que √(18x³) = √(3²·2·x²·x) = <b>3x·√(2x)</b>."
    ]) +
    ejemplo("Producto de radicales con distinto índice", "Calcula √2 · ³√2 como un solo radical.", [
      "Pasamos a potencias: √2 = 2<sup>1/2</sup> y ³√2 = 2<sup>1/3</sup>.",
      "Sumamos exponentes: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, es decir, 2<sup>5/6</sup>.",
      "Volvemos a radical: <b>⁶√(2⁵) = ⁶√32</b>. (El truco es reducir a índice común, aquí 6 = m.c.m. de 2 y 3.)"
    ]) +
    "<h5>Suma de radicales: solo se suman los semejantes</h5>" +
    "<p>Dos radicales son <b>semejantes</b> si tienen el mismo índice y el mismo radicando; solo entonces se suman o restan los coeficientes: 5√3 − 2√3 = 3√3. Si no lo parecen, primero hay que simplificar (sacar factores) a ver si se vuelven semejantes.</p>" +
    ejemplo("Suma con simplificación", "Calcula 3√12 − √27 + √75.", [
      "Simplificamos cada uno: √12 = √(4·3) = 2√3; √27 = √(9·3) = 3√3; √75 = √(25·3) = 5√3.",
      "Sustituimos: 3·2√3 − 3√3 + 5√3 = 6√3 − 3√3 + 5√3.",
      "Son semejantes: se suman los coeficientes 6 − 3 + 5 = 8. Resultado: <b>8√3</b>."
    ]) +
    "<h5>Racionalizar: los cuatro casos</h5>" +
    "<p>Racionalizar es eliminar las raíces del denominador sin cambiar el valor de la fracción (se multiplica arriba y abajo por lo mismo).</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>a/√b</td><td>multiplica por √b: a√b / b</td></tr>" +
    "<tr><td>a/(c·√b)</td><td>multiplica por √b: a√b / (c·b)</td></tr>" +
    "<tr><td>a/ⁿ√(bᵐ)</td><td>multiplica por ⁿ√(bⁿ⁻ᵐ) para completar bⁿ dentro de la raíz</td></tr>" +
    "<tr><td>a/(√b ± √c)</td><td>multiplica por el <b>conjugado</b> (√b ∓ √c): (√b + √c)(√b − √c) = b − c</td></tr>" +
    "</tbody></table>" +
    ejemplo("Con una suma en el denominador", "Racionaliza " + fr("4", "√5 − 1") + ".", [
      "El conjugado de √5 − 1 es √5 + 1. Multiplicamos arriba y abajo: " + fr("4(√5 + 1)", "(√5 − 1)(√5 + 1)") + ".",
      "Abajo es una suma por diferencia: (√5)² − 1² = 5 − 1 = 4.",
      "Queda " + fr("4(√5 + 1)", "4") + " = <b>√5 + 1</b>."
    ]) +
    ejemplo("Con raíz cúbica", "Racionaliza " + fr("1", "³√2") + ".", [
      "Queremos que dentro de la raíz aparezca 2³ para que salga entera. Tenemos 2¹; nos faltan 2²: multiplicamos arriba y abajo por ³√(2²) = ³√4.",
      "Abajo: ³√2·³√4 = ³√8 = 2. Arriba: ³√4.",
      "Resultado: <b>³√4 / 2</b>."
    ]) +
    ejemplo("Cociente de dos sumas con raíces", "Racionaliza " + fr("√3 + 1", "√3 − 1") + ".", [
      "Multiplicamos por el conjugado del denominador, √3 + 1: " + fr("(√3 + 1)²", "(√3)² − 1²") + ".",
      "Numerador: (√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3. Denominador: 3 − 1 = 2.",
      "Queda " + fr("4 + 2√3", "2") + " = <b>2 + √3</b>."
    ]) +
    ojo("(a + b)² = a² + 2ab + b², y nunca a² + b². Es el fallo más repetido al racionalizar: el término del medio 2ab aquí es 2·√3·1 = 2√3.") +
    "<p>Practica con ejercicios generados al azar (nunca se acaban):</p>" +
    w("radicales");

  // ---------------------------------------------------------------- 5. Notación científica y errores
  secciones[4] =
    "<h5>Mueve la coma y mira qué pasa</h5>" +
    "<p>Prueba a cambiar la mantisa y el exponente. Fíjate en que el exponente positivo da números grandes y el negativo, pequeños, y compáralos con medidas reales:</p>" +
    w("cientifica") +
    "<h5>Operar en notación científica</h5>" +
    "<ul><li><b>Multiplicar</b>: se multiplican las mantisas y se <em>suman</em> los exponentes. Si la mantisa sale ≥ 10, se ajusta.</li>" +
    "<li><b>Dividir</b>: se dividen las mantisas y se <em>restan</em> los exponentes.</li>" +
    "<li><b>Sumar o restar</b>: primero hay que dejar <em>el mismo exponente</em> en los dos números (se mueve la coma) y después se suman las mantisas.</li></ul>" +
    ejemplo("Producto y cociente", "Calcula (3,2·10⁵)·(4·10⁻²) / (1,6·10³).", [
      "Producto: 3,2·4 = 12,8 y 10⁵·10⁻² = 10³, así que el numerador es 12,8·10³ = 1,28·10⁴.",
      "Cociente: (1,28·10⁴)/(1,6·10³) = (1,28/1,6)·10⁴⁻³ = 0,8·10¹.",
      "Ajustamos la mantisa (debe estar entre 1 y 10): 0,8·10¹ = <b>8 = 8·10⁰</b>."
    ]) +
    ejemplo("Suma", "Calcula 3,5·10⁴ + 4,2·10³.", [
      "Igualamos exponentes: 4,2·10³ = 0,42·10⁴.",
      "Sumamos las mantisas: 3,5 + 0,42 = 3,92, con el mismo 10⁴.",
      "Resultado: <b>3,92·10⁴</b> = 39.200."
    ]) +
    "<h5>Aproximaciones: redondeo, truncamiento y cifras significativas</h5>" +
    "<ul><li><b>Truncar</b> es cortar el decimal sin más: π ≈ 3,14 (es una aproximación <em>por defecto</em>, queda por debajo del valor real).</li>" +
    "<li><b>Redondear</b> es dejar la cifra más cercana: π ≈ 3,142 (aquí queda por encima, <em>por exceso</em>). Si la cifra siguiente es 5 o más, la anterior sube una unidad.</li>" +
    "<li><b>Cifras significativas</b> son las que aportan información: en 0,00320 (si el último 0 es medido) hay 3 (el 3, el 2 y el 0). Los ceros de la izquierda solo sitúan la coma y no cuentan.</li></ul>" +
    "<h5>Error absoluto y error relativo con ejemplos</h5>" +
    "<p>Si la medida es M y el valor real R, el <b>error absoluto</b> es E<sub>a</sub> = |R − M| y el <b>error relativo</b> es E<sub>r</sub> = E<sub>a</sub>/|R| (multiplicado por 100 es el error en %). Mira por qué el relativo es el que dice la <em>calidad</em> de una medida:</p>" +
    w("errabs") +
    ejemplo("Dos medidas, ¿cuál es mejor?", "Un alumno mide una cuerda de 10 m y obtiene 9,8 m. Otro mide una distancia de 505 km y obtiene 504 km. ¿Quién ha medido mejor?", [
      "Cuerda: E<sub>a</sub> = |10 − 9,8| = 0,2 m; E<sub>r</sub> = 0,2/10 = 0,02 = <b>2 %</b>.",
      "Distancia: E<sub>a</sub> = |505 − 504| = 1 km; E<sub>r</sub> = 1/505 ≈ 0,00198 = <b>0,198 %</b>.",
      "El error absoluto de la segunda es mayor (1 km frente a 20 cm), pero el relativo es 10 veces menor: la segunda medida es <b>mucho mejor</b> en proporción a lo que se mide."
    ]) +
    "<p>Si dicen que una medida es 12,3 cm «con un error máximo de 0,1», significa que el valor real está en el intervalo [12,2; 12,4]. Es otra aplicación directa de los intervalos y del valor absoluto: |R − 12,3| ≤ 0,1.</p>";

  // ---------------------------------------------------------------- Secciones nuevas
  var nuevas = [
    {
      h: "6. Para pensar: tres resultados que sorprenden",
      html:
        "<p>Estos resultados no suelen preguntarse tal cual, pero entenderlos es lo que separa «saberse las reglas» de «saber matemáticas».</p>" +
        ejemplo("√2 no es racional", "Demuestra que √2 no se puede escribir como fracción.", [
          "Razonamos por <b>reducción al absurdo</b>: suponemos lo contrario y llegamos a una contradicción.",
          "Supongamos √2 = p/q con p y q enteros <b>sin factores comunes</b> (fracción irreducible).",
          "Elevamos al cuadrado: 2 = p²/q², es decir, p² = 2q². Luego p² es par, y por tanto p es par (el cuadrado de un impar es impar). Escribimos p = 2k.",
          "Sustituimos: (2k)² = 2q² → 4k² = 2q² → q² = 2k². Luego q² es par y q también es par.",
          "Entonces p y q son pares: tienen el factor 2 en común. Esto contradice que la fracción fuera irreducible.",
          "La suposición era falsa: <b>√2 es irracional</b>. (La misma idea sirve para √3, √5 y, en general, para la raíz de cualquier entero que no sea cuadrado perfecto.)"
        ]) +
        ejemplo("0,999… es exactamente 1", "Demuestra que 0,999… = 1.", [
          "Sea x = 0,999… Multiplicamos por 10: 10x = 9,999…",
          "Restamos: 10x − x = 9,999… − 0,999… = 9, es decir, 9x = 9.",
          "x = 1. Así que <b>0,999… y 1 son el mismo número</b> escrito de dos formas: no hay ningún número entre ellos."
        ]) +
        "<p><b>Los racionales y los irracionales están «mezclados»</b>: entre dos números reales distintos, por muy cerca que estén, siempre hay infinitos racionales y también infinitos irracionales. Por ejemplo, entre 1 y 2 están 3/2, 7/5, 1,41 (racionales) y √2, 1 + 1/π (irracionales). Y a pesar de eso, ℚ tiene «agujeros» (√2, π…) que ℝ rellena. Por eso la recta real no tiene huecos y los números racionales por sí solos no bastan para medir una diagonal.</p>"
    },
    {
      h: "7. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo y entenderás por qué se comete.</p>" + w("quiz", "errores")
    },
    {
      h: "8. Autocomprobación del tema",
      html: "<p>Ocho preguntas de test con la explicación de cada respuesta, y tarjetas para memorizar las propiedades clave.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  // ---------------------------------------------------------------- Datos de las actividades
  var datos = {
    clasnum: {
      titulo: "¿A qué conjunto pertenece?",
      consigna: "Toca un número y después el conjunto <b>más pequeño</b> al que pertenece.",
      categorias: ["ℕ · naturales", "ℤ pero no ℕ · enteros negativos", "ℚ pero no ℤ · fracciones y decimales exactos o periódicos", "𝕀 · irracionales"],
      items: [
        { t: "0", c: 0 }, { t: "√49", c: 0 }, { t: "−8", c: 1 }, { t: "−√16", c: 1 },
        { t: "3/4", c: 2 }, { t: "0,75", c: 2 }, { t: "0,2777… (el 7 se repite)", c: 2 }, { t: "−7/3", c: 2 },
        { t: "√10", c: 3 }, { t: "π + 1", c: 3 }, { t: "2√2", c: 3 }, { t: "0,1010010001… (cada vez un 0 más)", c: 3 }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«√(a²) = a para cualquier número real a.»",
          op: ["Es correcto", "Falso: √(a²) = |a|, y si a es negativo sale −a", "Falso: es siempre a²", "Falso: es siempre 0"], ok: 1,
          porque: "La raíz cuadrada es no negativa. Por ejemplo √((−3)²) = √9 = 3 = |−3|, no −3." },
        { q: "«√2 + √3 = √5».",
          op: ["Es correcto", "Falso: la raíz de una suma no es la suma de las raíces (√2 + √3 ≈ 3,15 y √5 ≈ 2,24)", "Falso: es √6", "Es correcto solo con números positivos"], ok: 1,
          porque: "Las raíces se separan en productos y cocientes, no en sumas. Para sumar radicales deben ser semejantes: √2 + √3 no se puede simplificar." },
        { q: "«|x − 3| &lt; 2 equivale a x &lt; 5 ó x &gt; 1».",
          op: ["Es correcto", "Falso: debe ser «y»: 1 &lt; x &lt; 5. Es una intersección, un intervalo", "Falso: equivale a x &lt; 1", "Falso: equivale a x &gt; 5"], ok: 1,
          porque: "«Distancia menor que 2» da los puntos <em>cerca</em> de 3: el intervalo (1, 5). El «ó» corresponde a «mayor que»: |x − 3| &gt; 2 ⇔ x &lt; 1 ó x &gt; 5." },
        { q: "Al resolver −2x &gt; 6 un alumno escribe x &gt; −3.",
          op: ["Está bien", "Ha olvidado invertir el sentido al dividir entre un negativo: x &lt; −3", "Debería haber escrito x = −3", "Ha restado mal"], ok: 1,
          porque: "Dividir entre −2 invierte la desigualdad: x &lt; −3. Comprobación: x = −4 → −2(−4) = 8 &gt; 6 ✓; x = 0 → 0 &gt; 6 es falso." },
        { q: "«2⁻³ = −8».",
          op: ["Es correcto", "Falso: un exponente negativo invierte, no cambia el signo: 2⁻³ = 1/2³ = 1/8", "Falso: 2⁻³ = −6", "Falso: 2⁻³ = 6"], ok: 1,
          porque: "a⁻ⁿ = 1/aⁿ. El signo del exponente no afecta al signo del resultado." },
        { q: "«0,333… no es racional, porque sus decimales no terminan nunca».",
          op: ["Es correcto", "Falso: los decimales periódicos son racionales (0,333… = 1/3)", "Falso: es irracional porque es mayor que 0,3", "Es correcto: solo los decimales exactos son racionales"], ok: 1,
          porque: "Racional = decimal exacto <em>o periódico</em>. Que no termine no es lo mismo que no tenga patrón: el 3 se repite siempre." },
        { q: "«−3² = 9».",
          op: ["Es correcto", "Falso: −3² = −9; el cuadrado solo afecta al 3. (−3)² sí vale 9", "Falso: −3² = −6", "Falso: −3² = 6"], ok: 1,
          porque: "Sin paréntesis, primero se eleva y luego se aplica el signo: −(3²) = −9." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Cuál es la fracción generatriz de 0,222…?",
          op: ["2/10", "2/9", "22/99", "1/5"], ok: 1,
          porque: "x = 0,222… → 10x = 2,222… → 9x = 2 → x = 2/9." },
        { q: "¿Cuál de estos números es irracional?",
          op: ["√36", "0,5", "√8", "−7/3"], ok: 2,
          porque: "√36 = 6 y 0,5 y −7/3 son racionales. √8 = 2√2 no sale exacta: es irracional." },
        { q: "La solución de x ≥ −2 y x &lt; 4 a la vez es…",
          op: ["(−2, 4)", "[−2, 4)", "[−2, 4]", "(−2, 4]"], ok: 1,
          porque: "−2 entra (≥) y 4 no entra (&lt;): [−2, 4)." },
        { q: "|x − 5| = 2 tiene como soluciones…",
          op: ["x = 3 y x = 7", "x = 3 solamente", "x = 7 solamente", "x = −3 y x = −7"], ok: 0,
          porque: "x − 5 = 2 → x = 7 y x − 5 = −2 → x = 3: dos puntos a distancia 2 de 5." },
        { q: "¿Cuánto vale ³√54 simplificado?",
          op: ["3³√2", "2³√3", "6³√3", "27³√2"], ok: 0,
          porque: "54 = 27·2 = 3³·2, así que ³√54 = 3·³√2." },
        { q: "Racionalizar 1/(√3 + 1) da…",
          op: ["(√3 − 1)/2", "(√3 + 1)/2", "√3 − 1", "1/2"], ok: 0,
          porque: "Multiplicando por el conjugado: (√3 − 1)/((√3)² − 1) = (√3 − 1)/2." },
        { q: "La notación científica de 0,00045 es…",
          op: ["4,5·10⁻⁴", "4,5·10⁻³", "45·10⁻⁵", "0,45·10⁻³"], ok: 0,
          porque: "La coma se mueve 4 lugares a la derecha para llegar a 4,5 (mantisa entre 1 y 10), así que el exponente es −4." },
        { q: "Aproximando 10 por 9,5, el error relativo es…",
          op: ["0,5", "5 %", "0,5 %", "9,5 %"], ok: 1,
          porque: "E<sub>a</sub> = |10 − 9,5| = 0,5; E<sub>r</sub> = 0,5/10 = 0,05 = 5 %." }
      ]
    },

    tj1: {
      titulo: "Propiedades que hay que tener a mano",
      cartas: [
        { a: "Fracción generatriz de un periódico puro", b: "Si el periodo es ab: x = ab/99. Ejemplo: 0,4545… = 45/99 = 5/11." },
        { a: "¿Cuándo una fracción irreducible da un decimal exacto?", b: "Cuando el denominador solo tiene los factores primos 2 y 5." },
        { a: "Intervalo cerrado [a, b]", b: "a ≤ x ≤ b. Los dos extremos entran." },
        { a: "|x − a| &lt; k", b: "a − k &lt; x &lt; a + k: un intervalo (los puntos cercanos a a)." },
        { a: "|x − a| &gt; k", b: "x &lt; a − k ó x &gt; a + k: dos semirrectas (los puntos lejanos)." },
        { a: "√(a²)", b: "|a|, no «a». Sale −a si a es negativo." },
        { a: "Racionalizar 1/(√a + √b)", b: "Multiplica arriba y abajo por el conjugado (√a − √b): el denominador queda a − b." },
        { a: "Notación científica", b: "a·10ⁿ con 1 ≤ a &lt; 10. Exponente positivo: número grande. Negativo: pequeño." },
        { a: "Error relativo", b: "|valor real − aproximación| ÷ |valor real|. En % se multiplica por 100." },
        { a: "Multiplicar una desigualdad por un número negativo", b: "Se invierte el sentido: −2x &gt; 6 ⇒ x &lt; −3." }
      ]
    }
  };

  // ---------------------------------------------------------------- Ejercicios
  var ejercicios = [
    // ---------- ★ ----------
    { id: "n1", nivel: 1,
      enunciado: "Escribe como intervalo el conjunto de los números que cumplen −2 ≤ x &lt; 5.",
      check: { tipo: "opcion", etiqueta: "Intervalo", opciones: ["[−2, 5)", "(−2, 5]", "[−2, 5]", "(−2, 5)"], ok: 0 },
      pistas: ["El ≤ del −2 significa que el −2 SÍ entra: corchete.", "El &lt; del 5 significa que el 5 NO entra: paréntesis."],
      pasos: ["−2 ≤ x: el extremo izquierdo se incluye → corchete «[−2».", "x &lt; 5: el extremo derecho no se incluye → paréntesis «5)».", "Intervalo: <b>[−2, 5)</b>."],
      resultado: "[−2, 5)" },
    { id: "n2", nivel: 1,
      enunciado: "Calcula |−9| + |4| − |−3|.",
      check: { tipo: "num", etiqueta: "Resultado =", valor: 10 },
      pistas: ["El valor absoluto quita el signo: |−9| = 9."],
      pasos: ["|−9| = 9, |4| = 4 y |−3| = 3.", "9 + 4 − 3 = 10."],
      resultado: "10" },
    { id: "n3", nivel: 1,
      enunciado: "Simplifica √50 y escríbelo como a√b, con b lo menor posible.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 5 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["Busca un cuadrado perfecto dentro de 50: 25·2."],
      pasos: ["50 = 25·2 = 5²·2.", "√50 = √(5²·2) = 5·√2."],
      resultado: "√50 = 5√2" },
    { id: "n4", nivel: 1,
      enunciado: "Escribe 0,000072 en notación científica a·10ⁿ.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 7.2 }, { tipo: "num", etiqueta: "n =", valor: -5 }],
      pistas: ["Mueve la coma hasta dejar una sola cifra distinta de cero delante.", "Si la coma se mueve hacia la derecha, el exponente es negativo."],
      pasos: ["Movemos la coma 5 lugares a la derecha: 0,000072 → 7,2.", "Como hemos movido la coma a la derecha, el exponente es negativo: −5.", "0,000072 = 7,2·10⁻⁵."],
      resultado: "7,2·10⁻⁵" },
    { id: "n5", nivel: 1,
      enunciado: "¿Cuál de estos números es racional?",
      check: { tipo: "opcion", etiqueta: "Es racional", opciones: ["√2", "π", "0,333… (el 3 se repite siempre)", "√5 + 1"], ok: 2 },
      pistas: ["Racional = decimal exacto o periódico."],
      pasos: ["√2 y π son irracionales; √5 + 1 también (un racional más un irracional es irracional).", "0,333… es periódico: = 1/3. <b>Es racional</b>."],
      resultado: "0,333… = 1/3" },
    { id: "n6", nivel: 1,
      enunciado: "Calcula la fracción generatriz de 0,454545… (el 45 se repite). Escríbela en la forma p/q.",
      check: { tipo: "num", etiqueta: "x =", valor: 5 / 11, tol: 0.001, ph: "p/q" },
      pistas: ["x = 0,4545… El periodo tiene 2 cifras: multiplica por 100.", "100x − x = 45."],
      pasos: ["x = 0,4545…  →  100x = 45,4545…", "100x − x = 45 → 99x = 45", "x = 45/99 = 5/11."],
      resultado: "5/11" },
    // ---------- ★★ ----------
    { id: "n7", nivel: 2,
      enunciado: "Resuelve |x − 4| &lt; 3 y expresa la solución como intervalo.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(1, 7)", "[1, 7]", "(−∞, 1) ∪ (7, +∞)", "(−7, −1)"], ok: 0 },
      pistas: ["«Distancia a 4 menor que 3»: los puntos de 4 − 3 a 4 + 3."],
      pasos: ["|x − 4| &lt; 3 ⇔ −3 &lt; x − 4 &lt; 3.", "Sumamos 4: 1 &lt; x &lt; 7.", "Intervalo abierto: <b>(1, 7)</b>."],
      resultado: "(1, 7)" },
    { id: "n8", nivel: 2,
      enunciado: "Resuelve la ecuación |2x + 1| = 7. Escribe las soluciones separadas por comas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-4, 3], ph: "por ejemplo: 1, 2" },
      pistas: ["Dos casos: 2x + 1 = 7  y  2x + 1 = −7."],
      pasos: ["Caso 1: 2x + 1 = 7 → 2x = 6 → x = 3.", "Caso 2: 2x + 1 = −7 → 2x = −8 → x = −4.", "Comprobación: |2·3 + 1| = 7 ✓ y |2·(−4) + 1| = |−7| = 7 ✓."],
      resultado: "x = −4 y x = 3" },
    { id: "n9", nivel: 2,
      enunciado: "Racionaliza " + fr("10", "√5") + " y escríbelo como (p/q)·√5 con la fracción irreducible.",
      check: [{ tipo: "num", etiqueta: "p =", valor: 2 }, { tipo: "num", etiqueta: "q =", valor: 1 }],
      pistas: ["Multiplica arriba y abajo por √5."],
      pasos: ["10/√5 = (10·√5)/(√5·√5) = 10√5/5.", "Simplificamos 10/5 = 2: <b>2√5</b> (p = 2, q = 1)."],
      resultado: "2√5" },
    { id: "n10", nivel: 2,
      enunciado: "Calcula 3√12 − √27 + √75 y expresa el resultado como a√b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 8 }, { tipo: "num", etiqueta: "b =", valor: 3 }],
      pistas: ["Simplifica cada raíz hasta que todas tengan √3."],
      pasos: ["√12 = 2√3, √27 = 3√3 y √75 = 5√3.", "3·2√3 − 3√3 + 5√3 = 6√3 − 3√3 + 5√3.", "Suma de coeficientes: 6 − 3 + 5 = 8. Resultado: 8√3."],
      resultado: "8√3" },
    { id: "n11", nivel: 2,
      enunciado: "Sean A = [−2, 3) y B = (0, 5]. ¿Cuánto vale A ∩ B?",
      check: { tipo: "opcion", etiqueta: "A ∩ B =", opciones: ["(0, 3)", "[−2, 5]", "[0, 3]", "(0, 3]"], ok: 0 },
      pistas: ["Dibuja A y B, y mira dónde están los dos a la vez.", "El 0 no entra porque B no lo incluye; el 3 no entra porque A no lo incluye."],
      pasos: ["Los dos a la vez: desde 0 (el mayor de los dos extremos izquierdos) hasta 3 (el menor de los dos derechos).", "El 0 no está en B (paréntesis) y el 3 no está en A: ambos quedan fuera.", "A ∩ B = (0, 3)."],
      resultado: "A ∩ B = (0, 3)" },
    { id: "n12", nivel: 2,
      enunciado: "Calcula la fracción generatriz de 3,2777… (el 7 se repite) y escríbela como p/q.",
      check: { tipo: "num", etiqueta: "x =", valor: 59 / 18, tol: 0.001, ph: "p/q" },
      pistas: ["Es periódico mixto. Multiplica por 10 y por 100 y resta.", "100x − 10x = 327,777… − 32,777…"],
      pasos: ["x = 3,2777…  →  10x = 32,777…  →  100x = 327,777…", "100x − 10x = 295 → 90x = 295", "x = 295/90 = 59/18."],
      resultado: "59/18" },
    { id: "n13", nivel: 2,
      enunciado: "Calcula (3,2·10⁵)·(4·10⁻²) / (1,6·10³) y da el resultado como un número decimal.",
      check: { tipo: "num", etiqueta: "Resultado =", valor: 8 },
      pistas: ["Mantisas por un lado y potencias de 10 por otro."],
      pasos: ["Numerador: 3,2·4 = 12,8 y 10⁵·10⁻² = 10³ → 12,8·10³.", "Cociente: (12,8·10³)/(1,6·10³) = 12,8/1,6 = 8.", "Las potencias de 10 se simplifican por completo: resultado 8."],
      resultado: "8" },
    // ---------- ★★★ (nivel PAU) ----------
    { id: "n14", nivel: 3,
      enunciado: "Resuelve |x − 2| ≥ 3 y escribe la solución como unión de intervalos.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−∞, −1] ∪ [5, +∞)", "[−1, 5]", "(−∞, −1) ∪ (5, +∞)", "(−1, 5)"], ok: 0 },
      pistas: ["«Distancia a 2 mayor o igual que 3»: los puntos lejos de 2."],
      pasos: ["|x − 2| ≥ 3 ⇔ x − 2 ≤ −3  ó  x − 2 ≥ 3.", "x ≤ −1  ó  x ≥ 5.", "Como el ≥ incluye el extremo: (−∞, −1] ∪ [5, +∞)."],
      resultado: "(−∞, −1] ∪ [5, +∞)" },
    { id: "n15", nivel: 3,
      enunciado: "Racionaliza " + fr("4", "√5 − 1") + " y simplifica al máximo.",
      check: { tipo: "expr", etiqueta: "Resultado =", expr: "sqrt(5)+1", ph: "puedes escribir sqrt(5) o √5" },
      pistas: ["Multiplica arriba y abajo por el conjugado: √5 + 1.", "(√5 − 1)(√5 + 1) = 5 − 1 = 4."],
      pasos: ["Conjugado de √5 − 1: √5 + 1.", "4(√5 + 1) / ((√5)² − 1²) = 4(√5 + 1)/4.", "Simplificamos el 4: <b>√5 + 1</b>."],
      resultado: "√5 + 1" },
    { id: "n16", nivel: 3,
      enunciado: "Resuelve |x − 1| = 2x + 3. Recuerda comprobar las soluciones.",
      check: { tipo: "num", etiqueta: "x =", valor: -2 / 3, tol: 0.001, ph: "solución única" },
      pistas: ["Hace falta 2x + 3 ≥ 0, es decir, x ≥ −3/2.", "Dos casos: x − 1 = 2x + 3  y  x − 1 = −(2x + 3)."],
      pasos: ["Condición: 2x + 3 ≥ 0 → x ≥ −3/2.", "Caso 1: x − 1 = 2x + 3 → x = −4 → no cumple x ≥ −3/2: se descarta.", "Caso 2: x − 1 = −2x − 3 → 3x = −2 → x = −2/3 → sí cumple.", "Comprobación: |−2/3 − 1| = 5/3 = 2·(−2/3) + 3 ✓."],
      resultado: "x = −2/3",
      ojo: "x = −4 sale al resolver, pero si lo sustituyes: |−5| = 5 y 2·(−4) + 3 = −5. No son iguales. En las ecuaciones |A| = B <b>siempre hay que comprobar</b>." },
    { id: "n17", nivel: 3,
      enunciado: "Resuelve la inecuación |x − 1| &lt; 2x.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(1/3, +∞)", "(−1/3, 1)", "(−∞, 1/3)", "(−1, +∞)"], ok: 0 },
      pistas: ["Equivale a −2x &lt; x − 1 &lt; 2x. Resuelve cada desigualdad por separado."],
      pasos: ["|x − 1| &lt; 2x ⇔ −2x &lt; x − 1 &lt; 2x.", "x − 1 &lt; 2x → x &gt; −1.", "−2x &lt; x − 1 → 1 &lt; 3x → x &gt; 1/3.", "Se deben cumplir las dos (y 2x &gt; 0): la más exigente es x &gt; 1/3.", "Solución: (1/3, +∞)."],
      resultado: "(1/3, +∞)" },
    { id: "n18", nivel: 3,
      enunciado: "Se aproxima π ≈ 3,141592654 por 22/7. Calcula el error absoluto y el error relativo (en %).",
      check: [{ tipo: "num", etiqueta: "Error absoluto =", valor: 0.001264, tol: 0.01 }, { tipo: "num", etiqueta: "Error relativo (%) =", valor: 0.04025, tol: 0.01 }],
      pistas: ["22/7 = 3,142857143.", "E<sub>r</sub> = E<sub>a</sub> / valor real, y para el porcentaje se multiplica por 100."],
      pasos: ["22/7 ≈ 3,142857143.", "E<sub>a</sub> = |π − 22/7| = |3,141592654 − 3,142857143| ≈ 0,001264.", "E<sub>r</sub> = 0,001264/3,141592654 ≈ 0,0004025.", "En porcentaje: 0,0004025·100 ≈ 0,04025 %."],
      resultado: "E<sub>a</sub> ≈ 0,001264 · E<sub>r</sub> ≈ 0,04 %" },
    { id: "n19", nivel: 3,
      enunciado: "Racionaliza " + fr("√3 + 1", "√3 − 1") + " y simplifica.",
      check: { tipo: "expr", etiqueta: "Resultado =", expr: "2+sqrt(3)", ph: "puedes escribir sqrt(3) o √3" },
      pistas: ["Multiplica por el conjugado del denominador: √3 + 1.", "(√3 + 1)² = 3 + 2√3 + 1."],
      pasos: ["Multiplicamos por (√3 + 1)/(√3 + 1).", "Numerador: (√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3.", "Denominador: (√3)² − 1² = 3 − 1 = 2.", "(4 + 2√3)/2 = 2 + √3."],
      resultado: "2 + √3",
      ojo: "el desarrollo (√3 + 1)² = (√3)² + 2·√3·1 + 1², no 3 + 1. Falta el doble producto." },
    { id: "n20", nivel: 3,
      enunciado: "Demuestra que √2 es un número irracional. Redáctalo como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 8, items: [
        { t: "Plantea reducción al absurdo: supone √2 = p/q con la fracción irreducible", p: 0.5 },
        { t: "Eleva al cuadrado y llega a p² = 2q²", p: 0.5 },
        { t: "Deduce que p² es par y, por tanto, p es par; escribe p = 2k", p: 0.5 },
        { t: "Sustituye y deduce que q también es par", p: 0.5 },
        { t: "Concluye la contradicción: p y q tendrían el factor 2 en común, y la fracción no era irreducible", p: 0.5 }
      ] },
      pasos: ["Supongamos que √2 es racional: √2 = p/q con p, q enteros y la fracción irreducible (sin factores comunes).", "Elevando al cuadrado: 2 = p²/q², es decir, p² = 2q². Entonces p² es par, y por tanto p es par (si p fuera impar, p² sería impar). Escribimos p = 2k.", "Sustituyendo: 4k² = 2q² → q² = 2k². Luego q² es par y q también es par.", "Así p y q son pares: tienen el factor 2 en común, lo que contradice que la fracción fuera irreducible.", "Por tanto la suposición es falsa y √2 es irracional."],
      resultado: "√2 es irracional (demostración por reducción al absurdo)." }
  ];

  // ---------------------------------------------------------------- Lámina resumen
  var lamina = [
    { titulo: "Fracción generatriz en 3 pasos",
      pasos: ["Llama x al número y escribe sus decimales.", "Multiplica por 10ⁿ (n = cifras del periodo) hasta colocar la coma justo detrás de un periodo. Si es mixto, hazlo dos veces (antes y después del periodo).", "<b>Resta</b> las dos expresiones para que desaparezca la parte que se repite, despeja x y simplifica."],
      nota: "Atajo: (número sin coma − parte que no se repite) / (tantos 9 como cifras del periodo y tantos 0 como cifras de la parte decimal no periódica)." },
    { titulo: "Intervalos: tres formas", ancha: true,
      tabla: { cab: ["Intervalo", "Desigualdad", "Recta"], filas: [
        ["[a, b]", "a ≤ x ≤ b", "●────●"], ["(a, b)", "a &lt; x &lt; b", "○────○"], ["[a, b)", "a ≤ x &lt; b", "●────○"],
        ["(a, +∞)", "x &gt; a", "○────→"], ["(−∞, b]", "x ≤ b", "←────●"]
      ] },
      nota: "Corchete = entra. Paréntesis = no entra. El infinito siempre lleva paréntesis. Multiplicar por un negativo invierte la desigualdad." },
    { titulo: "Valor absoluto", ancha: true,
      tabla: { cab: ["Expresión", "Se resuelve como"], filas: [
        ["|A| = k  (k &gt; 0)", "A = k  ó  A = −k"], ["|A| &lt; k", "−k &lt; A &lt; k  (un intervalo)"], ["|A| &gt; k", "A &lt; −k  ó  A &gt; k  (dos semirrectas)"],
        ["|A| = |B|", "A = B  ó  A = −B"], ["|A| = B", "B ≥ 0 y dos casos; comprobar siempre"], ["|A| = k  con k &lt; 0", "sin solución"]
      ] },
      nota: "Leer |x − a| como «distancia entre x y a» ayuda a no equivocarse." },
    { titulo: "Potencias y radicales",
      items: [
        { label: "Raíz como potencia", formula: "ⁿ√(aᵐ) = a<sup>m/n</sup>", cuando: "Para operar con radicales de distinto índice.", ejemplo: "√2·³√2 = 2<sup>1/2 + 1/3</sup> = 2<sup>5/6</sup> = ⁶√32" },
        { label: "Raíz de un producto", formula: "√(a·b) = √a · √b", cuando: "Para sacar factores de la raíz.", ejemplo: "√72 = √(36·2) = 6√2", ojo: "√(a + b) ≠ √a + √b." },
        { label: "Raíz de un cuadrado", formula: "√(a²) = |a|", ojo: "No es «a» si a es negativo." }
      ] },
    { titulo: "Racionalizar", ancha: true,
      tabla: { cab: ["Denominador", "Multiplica por", "Resultado"], filas: [
        ["√b", "√b", "queda b"], ["ⁿ√(bᵐ)", "ⁿ√(bⁿ⁻ᵐ)", "queda b"], ["√b + √c", "√b − √c (conjugado)", "queda b − c"], ["√b − √c", "√b + √c (conjugado)", "queda b − c"]
      ] },
      nota: "Siempre se multiplica arriba y abajo por lo mismo: así la fracción vale igual." },
    { titulo: "Notación científica y errores",
      pasos: ["a·10ⁿ con 1 ≤ a &lt; 10. Coma a la izquierda → n positivo; a la derecha → n negativo.", "Multiplicar: mantisas × y exponentes +. Dividir: mantisas ÷ y exponentes −. Sumar: mismo exponente primero.", "Error absoluto = |real − aproximado|. Error relativo = error absoluto ÷ |real| (×100 para el %)."],
      nota: "El error relativo dice la calidad de la medida: 1 km de error en 500 km es mejor que 20 cm en 10 m." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "√(a²) = a", bien: "√(a²) = |a|", por: "Si a es negativo la raíz sale positiva." },
        { mal: "√2 + √3 = √5", bien: "√2 + √3 no se simplifica", por: "La raíz de una suma no es la suma de raíces." },
        { mal: "−2x &gt; 6 ⇒ x &gt; −3", bien: "−2x &gt; 6 ⇒ x &lt; −3", por: "Dividir entre un negativo invierte el sentido." },
        { mal: "|x − 3| &lt; 2 ⇒ x &lt; 5 ó x &gt; 1", bien: "1 &lt; x &lt; 5", por: "«Menor que» es una intersección (un intervalo)." },
        { mal: "−3² = 9", bien: "−3² = −9 y (−3)² = 9", por: "El paréntesis decide a qué afecta el cuadrado." }
      ] }
  ];

  B.registrar("mates1", "t1", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
