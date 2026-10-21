/* ============================================================
   Matemáticas I · ampliaciones · Tema 2: Sucesiones
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t2/" + ref); }

  var resumen = [
    "Una sucesión es una lista ordenada de números a₁, a₂, a₃… Se da por su <b>término general</b> aₙ o por <b>recurrencia</b>.",
    "<b>Aritmética</b>: se suma siempre d → aₙ = a₁ + (n−1)d y Sₙ = n(a₁ + aₙ)/2.",
    "<b>Geométrica</b>: se multiplica siempre por r → aₙ = a₁·rⁿ⁻¹ y Sₙ = a₁(rⁿ − 1)/(r − 1).",
    "Si |r| &lt; 1 se pueden sumar infinitos términos: <b>S = a₁/(1 − r)</b>.",
    "Para estudiar monotonía: signo de aₙ₊₁ − aₙ. El interés compuesto es una progresión geométrica."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Concepto
  secciones[0] =
    "<h5>Tres maneras de dar una sucesión</h5>" +
    "<ul><li><b>Término general</b>: una fórmula en n. Sirve para saltar directamente a cualquier posición. Ejemplo: aₙ = 3n − 1 da 2, 5, 8, 11…</li>" +
    "<li><b>Recurrencia</b>: el primer término y una regla que usa los anteriores. Ejemplo: a₁ = 2 y aₙ₊₁ = aₙ + 3 da la misma lista 2, 5, 8, 11… Para calcular a₁₀₀ habría que ir paso a paso, así que interesa encontrar la fórmula.</li>" +
    "<li><b>Descripción</b>: «los números primos» (2, 3, 5, 7, 11…). No hay una fórmula sencilla, pero también es una sucesión.</li></ul>" +
    "<h5>Cómo encontrar el término general</h5>" +
    "<p>No hay un método único, pero estas pistas resuelven casi todos los casos de examen:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>3, 5, 7, 9, …</td><td>Los términos suben siempre 2 → es 2n más algo. Con n = 1 sale 2, y el primero es 3, así que aₙ = <b>2n + 1</b>.</td></tr>" +
    "<tr><td>1/2, 2/3, 3/4, 4/5, …</td><td>El numerador es n y el denominador es n + 1 → aₙ = <b>n/(n+1)</b>.</td></tr>" +
    "<tr><td>2, 5, 10, 17, 26, …</td><td>Compara con los cuadrados 1, 4, 9, 16, 25: cada término es uno más → aₙ = <b>n² + 1</b>.</td></tr>" +
    "<tr><td>−1, 1, −1, 1, …</td><td>Los signos se alternan: la potencia (−1)ⁿ → aₙ = <b>(−1)ⁿ</b>.</td></tr>" +
    "<tr><td>2, 4, 8, 16, …</td><td>Cada término es el doble del anterior → aₙ = <b>2ⁿ</b>.</td></tr>" +
    "</tbody></table>" +
    "<p>Para alternar signos se usa (−1)ⁿ si el primero es negativo, y (−1)ⁿ⁺¹ si el primero es positivo. Para saber de qué tipo es una sucesión conviene mirar las <b>diferencias</b> aₙ₊₁ − aₙ y los <b>cocientes</b> aₙ₊₁/aₙ (lo verás en la sección 5).</p>" +
    ejemplo("Pasar de recurrencia a término general", "Halla el término general de a₁ = 3, aₙ₊₁ = 2·aₙ.", [
      "Calculamos los primeros términos: a₁ = 3, a₂ = 6, a₃ = 12, a₄ = 24, …",
      "Cada término es el doble del anterior: se multiplica siempre por 2. Es una progresión geométrica de razón 2.",
      "El término general es a₁·2ⁿ⁻¹, es decir, <b>aₙ = 3·2ⁿ⁻¹</b>. Comprobación: a₄ = 3·2³ = 24 ✓."
    ]) +
    "<p>Escribe tú el término general que quieras (con la letra n) y mira qué hace la sucesión. También puedes definirla por recurrencia. Observa la monotonía, las cotas y si se «aquieta» en un valor:</p>" +
    w("sucesion");

  // ---------------------------------------------------------------- 2. Monotonía y acotación
  secciones[1] =
    "<h5>Cómo estudiar la monotonía</h5>" +
    "<p>Hay dos herramientas, y cada una tiene su sitio:</p>" +
    "<ul><li><b>Diferencia</b> aₙ₊₁ − aₙ: si es ≥ 0 para todo n, la sucesión es creciente; si es ≤ 0, decreciente. Sirve siempre, y es la más segura.</li>" +
    "<li><b>Cociente</b> aₙ₊₁/aₙ (solo si los términos son positivos): si es ≥ 1, creciente; si es ≤ 1, decreciente. Es cómoda con potencias y factoriales.</li></ul>" +
    ejemplo("Con una fracción", "Estudia la monotonía y la acotación de aₙ = (2n − 1)/(n + 1).", [
      "Calculamos aₙ₊₁ = (2n + 1)/(n + 2) y restamos: aₙ₊₁ − aₙ = (2n+1)/(n+2) − (2n−1)/(n+1).",
      "Común denominador (n+1)(n+2): numerador = (2n+1)(n+1) − (2n−1)(n+2) = (2n² + 3n + 1) − (2n² + 3n − 2) = 3.",
      "aₙ₊₁ − aₙ = 3/((n+1)(n+2)) &gt; 0 para todo n: la sucesión es <b>estrictamente creciente</b>.",
      "Acotación: dividiendo, aₙ = (2n − 1)/(n + 1) = 2 − 3/(n + 1). Como 3/(n+1) &gt; 0, aₙ &lt; 2: <b>cota superior 2</b>. Como es creciente, el menor término es a₁ = 1/2: <b>cota inferior 1/2</b>.",
      "Conclusión: creciente y acotada, con 1/2 ≤ aₙ &lt; 2. Es de esperar que se aquiete cerca de 2 (de hecho, converge a 2)."
    ]) +
    ejemplo("Con el cociente", "Estudia la monotonía de aₙ = n/2ⁿ.", [
      "Todos los términos son positivos, así que podemos usar el cociente: aₙ₊₁/aₙ = [(n+1)/2ⁿ⁺¹] · [2ⁿ/n] = (n+1)/(2n).",
      "(n+1)/(2n) ≤ 1 ⇔ n + 1 ≤ 2n ⇔ n ≥ 1, que es siempre cierto.",
      "Por tanto la sucesión es <b>decreciente</b> (a₁ = 1/2, a₂ = 1/2, a₃ = 3/8, …). Está acotada: 0 &lt; aₙ ≤ 1/2."
    ]) +
    "<h5>Acotación con más detalle</h5>" +
    "<ul><li>K es <b>cota superior</b> si aₙ ≤ K para todo n; k es <b>cota inferior</b> si aₙ ≥ k para todo n. Si hay una, hay infinitas (cualquier número mayor que K también sirve).</li>" +
    "<li>La menor cota superior se llama <b>supremo</b> y la mayor cota inferior, <b>ínfimo</b>. Si el supremo es uno de los términos, es el <b>máximo</b>.</li>" +
    "<li>Una sucesión puede estar acotada sin ser monótona: (−1)ⁿ = −1, 1, −1, 1… está acotada entre −1 y 1 y va saltando.</li>" +
    "<li>Una sucesión puede ser monótona sin estar acotada: n² crece sin techo.</li></ul>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>aₙ = 1/n</td><td>decreciente · acotada (0 &lt; aₙ ≤ 1) · converge a 0</td></tr>" +
    "<tr><td>aₙ = n²</td><td>creciente · acotada inferiormente, no superiormente · diverge (+∞)</td></tr>" +
    "<tr><td>aₙ = (−1)ⁿ</td><td>no monótona · acotada · no converge (oscila entre −1 y 1)</td></tr>" +
    "<tr><td>aₙ = (n+1)/n</td><td>decreciente · acotada (1 &lt; aₙ ≤ 2) · converge a 1</td></tr>" +
    "</tbody></table>" +
    "<p><b>Teorema útil</b>: toda sucesión monótona y acotada converge (se acerca a un valor concreto). Por ejemplo, aₙ = (1 + 1/n)ⁿ es creciente y está acotada por 3, y por eso converge: su límite es el número e ≈ 2,718. En el Tema 10 verás cómo se calcula el límite.</p>";

  // ---------------------------------------------------------------- 3. Aritméticas
  secciones[2] =
    "<h5>Por qué funcionan las fórmulas</h5>" +
    "<p><b>Término general</b>: para llegar de a₁ a aₙ hay que dar n − 1 saltos de tamaño d, así que aₙ = a₁ + (n − 1)d. Más en general, entre dos términos cualesquiera: <b>aₙ = aₘ + (n − m)·d</b>. Esta forma es la que más se usa en los problemas, porque rara vez te dan el primer término.</p>" +
    "<p><b>Suma</b>: Gauss, con 10 años, sumó 1 + 2 + … + 100 emparejando los extremos: 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101… Hay 50 parejas, así que la suma es 50 · 101 = 5050. En general, <b>los términos equidistantes de los extremos suman lo mismo</b>: a₁ + aₙ = a₂ + aₙ₋₁ = …, y hay n/2 parejas, así que Sₙ = n(a₁ + aₙ)/2. Míralo con barras: pegando la progresión al revés sobre sí misma sale un rectángulo.</p>" +
    w("aritmetica") +
    "<p>Dos consecuencias muy útiles:</p>" +
    "<ul><li><b>Media aritmética</b>: cada término es la media de sus vecinos: aₙ = (aₙ₋₁ + aₙ₊₁)/2. En particular, <em>tres números a, b, c están en progresión aritmética si y solo si 2b = a + c</em>.</li>" +
    "<li>Para tres términos consecutivos conviene llamarlos <b>a − d, a, a + d</b>: al sumarlos desaparece la d.</li></ul>" +
    ejemplo("Hallar a₁ y d con dos términos", "En una progresión aritmética a₅ = 17 y a₁₂ = 45. Calcula a₁, d, a₂₀ y S₂₀.", [
      "Entre los términos 5 y 12 hay 12 − 5 = 7 saltos: a₁₂ = a₅ + 7d → 45 = 17 + 7d → d = 28/7 = <b>4</b>.",
      "a₅ = a₁ + 4d → 17 = a₁ + 16 → a₁ = <b>1</b>.",
      "a₂₀ = a₁ + 19d = 1 + 76 = <b>77</b>.",
      "S₂₀ = 20·(1 + 77)/2 = 10·78 = <b>780</b>."
    ]) +
    ejemplo("Sumar los múltiplos de 7 que hay entre 100 y 500", "Calcula la suma de todos los múltiplos de 7 mayores que 100 y menores que 500.", [
      "El primer múltiplo de 7 mayor que 100 es 105 (= 7·15) y el último menor que 500 es 497 (= 7·71).",
      "Forman una progresión aritmética con a₁ = 105, d = 7 y aₙ = 497. Número de términos: 497 = 105 + (n − 1)·7 → n − 1 = 56 → n = 57.",
      "S = 57·(105 + 497)/2 = 57·301 = <b>17.157</b>."
    ]) +
    ejemplo("Interpolar medios aritméticos", "Intercala 4 números entre 3 y 18 para que los 6 formen una progresión aritmética.", [
      "Ahora el primer término es 3 y el sexto es 18, así que a₆ = a₁ + 5d → 18 = 3 + 5d → d = 3.",
      "Regla: para intercalar k números entre a y b, <b>d = (b − a)/(k + 1)</b>. Aquí (18 − 3)/5 = 3.",
      "La progresión es 3, <b>6, 9, 12, 15</b>, 18."
    ]) +
    ejemplo("Cuántos términos hay que sumar", "¿Cuántos términos de la progresión 5, 9, 13, … hay que sumar para que la suma sea 495?", [
      "a₁ = 5 y d = 4. Sₙ = n·(2a₁ + (n − 1)d)/2 = n·(10 + 4n − 4)/2 = n·(4n + 6)/2 = 2n² + 3n.",
      "Igualamos a 495: 2n² + 3n − 495 = 0.",
      "n = (−3 ± √(9 + 3960))/4 = (−3 ± 63)/4. La raíz positiva es n = 60/4 = <b>15</b> (la otra, −16,5, no tiene sentido).",
      "Comprobación: a₁₅ = 5 + 14·4 = 61 y S₁₅ = 15·(5 + 61)/2 = 495 ✓."
    ]) +
    ojo("al hallar el número de términos n, sale una ecuación de segundo grado, y <b>hay que descartar</b> la solución negativa o no entera. n siempre es un entero positivo.");

  // ---------------------------------------------------------------- 4. Geométricas
  secciones[3] =
    "<h5>De dónde sale la fórmula de la suma</h5>" +
    "<p>Escribimos Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹ y multiplicamos por r: r·Sₙ = a₁r + a₁r² + … + a₁rⁿ. Restando las dos igualdades se cancelan casi todos los términos: Sₙ − r·Sₙ = a₁ − a₁rⁿ, es decir, Sₙ(1 − r) = a₁(1 − rⁿ). De ahí:</p>" +
    "<div class='formula-wrap'><div class='formula'>Sₙ = " + fr("a₁(rⁿ − 1)", "r − 1") + "  (si r ≠ 1)</div></div>" +
    "<p>Si r = 1, todos los términos son iguales y simplemente Sₙ = n·a₁. Si |r| &lt; 1, rⁿ se hace diminuto al crecer n y queda <b>S = a₁/(1 − r)</b>. Con sumas parciales se ve cómo se apretan contra su límite:</p>" +
    w("geometrica") +
    "<h5>Propiedades que se preguntan</h5>" +
    "<ul><li><b>Media geométrica</b>: aₙ² = aₙ₋₁·aₙ₊₁. Tres números positivos a, b, c están en progresión geométrica si y solo si b² = a·c.</li>" +
    "<li><b>Producto de los n primeros términos</b>: Pₙ = (a₁·aₙ)<sup>n/2</sup>. (Es el mismo truco de las parejas de los extremos: a₁·aₙ = a₂·aₙ₋₁ = …)</li>" +
    "<li><b>Cualquier término</b>: aₙ = aₘ·rⁿ⁻ᵐ.</li>" +
    "<li><b>Interpolación</b>: para intercalar k términos entre a y b, <b>r = (b/a)<sup>1/(k+1)</sup></b>.</li></ul>" +
    ejemplo("Hallar r y a₁", "En una progresión geométrica a₃ = 12 y a₆ = 96. Calcula r, a₁ y S₈.", [
      "Entre los términos 3 y 6 hay 3 pasos: a₆ = a₃·r³ → 96 = 12·r³ → r³ = 8 → <b>r = 2</b>.",
      "a₃ = a₁·r² → 12 = a₁·4 → <b>a₁ = 3</b>.",
      "S₈ = 3·(2⁸ − 1)/(2 − 1) = 3·255 = <b>765</b>."
    ]) +
    ejemplo("Un decimal periódico como suma infinita", "Escribe 0,666… como suma de infinitos términos y calcula su valor.", [
      "0,666… = 0,6 + 0,06 + 0,006 + … Es una progresión geométrica con a₁ = 0,6 y r = 0,1.",
      "Como |r| = 0,1 &lt; 1, la suma existe: S = a₁/(1 − r) = 0,6/0,9 = 6/9 = <b>2/3</b>.",
      "Es otra forma de obtener la fracción generatriz del Tema 1: 0,666… = 2/3 ✓."
    ]) +
    ejemplo("Producto de términos", "Calcula el producto de los 5 primeros términos de 2, 6, 18, 54, …", [
      "a₁ = 2 y r = 3. El quinto término es a₅ = 2·3⁴ = 162.",
      "P₅ = (a₁·a₅)<sup>5/2</sup> = (2·162)<sup>5/2</sup> = 324<sup>5/2</sup> = (√324)⁵ = 18⁵ = <b>1.889.568</b>.",
      "Comprobación directa: 2·6·18·54·162 = 1.889.568 ✓."
    ]) +
    "<h5>Un clásico: la pelota que rebota</h5>" +
    "<p>Una pelota se deja caer desde 10 m y en cada rebote sube el 60 % de la altura anterior. ¿Qué distancia recorre en total hasta quedarse quieta? La distancia es una <b>serie geométrica</b>: primero baja 10 m y después, en cada rebote, sube y baja la misma altura. Pruébalo con tus propios valores:</p>" +
    w("rebote") +
    ejemplo("La distancia total", "Calcula la distancia total recorrida por una pelota que se deja caer desde 10 m y en cada rebote alcanza el 60 % de la altura anterior.", [
      "Cae primero 10 m. Después, en el rebote k, sube y baja 10·0,6ᵏ m, es decir, 2·10·0,6ᵏ en total.",
      "Distancia = 10 + 2·(10·0,6 + 10·0,6² + 10·0,6³ + …) = 10 + 2·(6 + 3,6 + 2,16 + …).",
      "Entre paréntesis hay una serie geométrica con a₁ = 6 y r = 0,6, que suma 6/(1 − 0,6) = 15.",
      "Distancia total = 10 + 2·15 = <b>40 m</b>. (Fórmula general: h₀·(1 + e)/(1 − e).)"
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "5. ¿Aritmética, geométrica o ninguna? Cómo decidirlo",
      html:
        "<p>Ante una lista de números, el primer paso es mirar qué se repite:</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>aₙ₊₁ − aₙ constante</td><td>progresión <b>aritmética</b> (la constante es d)</td></tr>" +
        "<tr><td>aₙ₊₁ / aₙ constante</td><td>progresión <b>geométrica</b> (la constante es r)</td></tr>" +
        "<tr><td>ninguna de las dos</td><td>mira las diferencias de las diferencias, o busca una fórmula (cuadrados, alternancia de signos…)</td></tr>" +
        "</tbody></table>" +
        ejemplo("Tres listas", "Clasifica: (a) 5, 8, 11, 14…  (b) 2, 6, 18, 54…  (c) 2, 5, 10, 17, 26…", [
          "(a) Diferencias: 3, 3, 3 → <b>aritmética</b> con d = 3. Término general: aₙ = 5 + 3(n−1) = 3n + 2.",
          "(b) Cocientes: 6/2 = 3, 18/6 = 3, 54/18 = 3 → <b>geométrica</b> con r = 3. Término general: aₙ = 2·3ⁿ⁻¹.",
          "(c) Diferencias: 3, 5, 7, 9 (no constantes). Cocientes: 2,5; 2; 1,7 (tampoco). Diferencias de las diferencias: 2, 2, 2 → constante. Cuando la <b>segunda</b> diferencia es constante, el término general es un polinomio de grado 2, aquí aₙ = n² + 1."
        ]) +
        ojo("una lista con todos los términos iguales (5, 5, 5, 5…) es a la vez aritmética (d = 0) y geométrica (r = 1). Y una sucesión como 1, 3, 7, 15 (cada término es el doble del anterior más 1) no es ni lo uno ni lo otro: es 2ⁿ − 1.")
    },
    {
      h: "6. Aplicaciones: dinero, depreciación y poblaciones",
      html:
        "<p>Casi todo lo que crece o decrece un tanto por ciento cada periodo es una progresión geométrica. La clave es el <b>factor</b>: un aumento del r % multiplica por <b>1 + r/100</b> y una bajada del r % multiplica por <b>1 − r/100</b>.</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Capital al 5 % anual</td><td>factor 1,05 → C·1,05ⁿ</td></tr>" +
        "<tr><td>Un coche que pierde el 12 % de valor al año</td><td>factor 0,88 → V·0,88ⁿ</td></tr>" +
        "<tr><td>Una población que crece un 2 % anual</td><td>factor 1,02 → P·1,02ⁿ</td></tr>" +
        "</tbody></table>" +
        w("interes") +
        ejemplo("Interés compuesto", "Se ingresan 1.000 € al 5 % de interés compuesto anual. ¿Cuánto habrá al cabo de 10 años?", [
          "Cada año el capital se multiplica por 1,05: es una progresión geométrica de razón 1,05.",
          "C₁₀ = 1.000·1,05¹⁰ = 1.000·1,62889… = <b>1.628,89 €</b>.",
          "Intereses ganados: 1.628,89 − 1.000 = 628,89 €."
        ]) +
        ejemplo("Ahorro periódico", "Se ingresan 1.000 € al principio de cada año durante 10 años, al 5 % anual. ¿Qué capital hay al final del décimo año?", [
          "El primer ingreso genera intereses durante 10 años (factor 1,05¹⁰), el segundo durante 9, …, el último durante 1 año (factor 1,05).",
          "Capital = 1.000·(1,05 + 1,05² + … + 1,05¹⁰): suma de una progresión geométrica con a₁ = 1,05, r = 1,05 y 10 términos.",
          "S₁₀ = 1,05·(1,05¹⁰ − 1)/(1,05 − 1) = 1,05·0,62889/0,05 = 13,2068…",
          "Capital = 1.000·13,2068 = <b>13.206,79 €</b>. Has puesto 10.000 € y los intereses son 3.206,79 €."
        ]) +
        "<p>Si hay una cantidad que se reduce siempre por el mismo factor y quieres saber cuándo llegará a cierto valor, hay que resolver una ecuación exponencial (con logaritmos): por ejemplo, 1.000·1,05ⁿ = 2.000 → n = log 2/log 1,05 ≈ 14,2 años: el dinero se duplica en poco más de 14 años.</p>"
    },
    {
      h: "7. Fibonacci y el número áureo",
      html:
        "<p>La sucesión de Fibonacci (1, 1, 2, 3, 5, 8, 13, 21…) se define por recurrencia: cada término es la suma de los dos anteriores. No es aritmética ni geométrica, pero tiene una propiedad sorprendente: el cociente de dos términos consecutivos <b>tiende al número áureo φ = (1 + √5)/2 ≈ 1,618</b>. Compruébalo:</p>" +
        w("fibonacci") +
        "<p>¿Por qué? Si aₙ₊₁/aₙ se acerca a un valor φ, entonces aₙ₊₂ = aₙ₊₁ + aₙ implica, dividiendo entre aₙ₊₁, que 1 + 1/φ = φ, es decir φ² = φ + 1, cuya raíz positiva es φ = (1 + √5)/2.</p>"
    },
    {
      h: "8. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "9. Autocomprobación del tema",
      html: "<p>Ocho preguntas de test con explicación y tarjetas para memorizar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe, para una progresión aritmética, aₙ = a₁ + n·d. ¿Qué falla?",
          op: ["Nada, es la fórmula correcta", "Debe ser (n − 1)·d: de a₁ a aₙ solo hay n − 1 saltos", "Debe ser a₁·dⁿ", "Debe ser n·(a₁ + d)"], ok: 1,
          porque: "Para llegar de a₁ a aₙ hay que dar n − 1 saltos. Con n = 1 la fórmula debe dar a₁: a₁ + 0·d = a₁ ✓; con «n·d» daría a₁ + d." },
        { q: "Un alumno calcula la suma de los 20 primeros términos como S₂₀ = 20·(a₁ + a₂₀). ¿Qué ha olvidado?",
          op: ["Nada", "Dividir entre 2", "Multiplicar por d", "Restar a₁"], ok: 1,
          porque: "Sₙ = n·(a₁ + aₙ)/2. Sin el 2, estaría contando cada pareja de extremos dos veces: es justo el rectángulo doble de la demostración de Gauss." },
        { q: "Un alumno suma 1 + 2 + 4 + 8 + … con la fórmula S = a₁/(1 − r) y obtiene 1/(1 − 2) = −1. ¿Qué falla?",
          op: ["Nada, es la suma", "La fórmula de la suma infinita solo vale si |r| &lt; 1; aquí r = 2 y la suma crece sin límite", "Debía dividir entre r", "Debía usar la fórmula aritmética"], ok: 1,
          porque: "Con |r| ≥ 1 los términos no tienden a 0 y la suma diverge: no existe. Una suma de números positivos nunca puede dar un número negativo." },
        { q: "Un alumno dice que la razón de 3, 6, 12, 24 es r = 3 porque 6 − 3 = 3. ¿Qué falla?",
          op: ["Nada", "La razón es un cociente: 6/3 = 2. La diferencia 3 sería la d de una progresión aritmética", "La razón es siempre 1", "La razón es 12/3"], ok: 1,
          porque: "r = aₙ₊₁/aₙ. Con 3, 6, 12, 24 los cocientes valen 2 (geométrica); las diferencias (3, 6, 12) no son constantes." },
        { q: "«aₙ = 1/n es creciente porque el denominador crece».",
          op: ["Es correcto", "Falso: cuanto mayor es el denominador, menor es la fracción; la sucesión es decreciente", "Falso: es constante", "Falso: no es monótona"], ok: 1,
          porque: "aₙ₊₁ − aₙ = 1/(n+1) − 1/n = −1/(n(n+1)) &lt; 0: decrece (hacia 0)." },
        { q: "«Toda sucesión acotada converge».",
          op: ["Es correcto", "Falso: (−1)ⁿ está acotada entre −1 y 1 y no converge (oscila)", "Falso: solo converge si es creciente", "Es correcto solo si es de números enteros"], ok: 1,
          porque: "Hace falta además que sea monótona. Teorema correcto: <em>monótona y acotada ⇒ convergente</em>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "En una progresión aritmética a₁ = 7 y d = −2. ¿Cuánto vale a₁₀?",
          op: ["−11", "−13", "27", "−9"], ok: 0,
          porque: "a₁₀ = 7 + 9·(−2) = 7 − 18 = −11." },
        { q: "¿Cuál es la razón de la progresión 81, 27, 9, 3, …?",
          op: ["−54", "3", "1/3", "−1/3"], ok: 2,
          porque: "27/81 = 1/3, 9/27 = 1/3, 3/9 = 1/3: r = 1/3." },
        { q: "¿Cuánto vale 1 + 2 + 3 + … + 50?",
          op: ["1.275", "2.550", "1.250", "1.326"], ok: 0,
          porque: "S₅₀ = 50·(1 + 50)/2 = 25·51 = 1.275." },
        { q: "La suma infinita 6 + 2 + 2/3 + 2/9 + … vale…",
          op: ["8", "9", "12", "no existe"], ok: 1,
          porque: "a₁ = 6, r = 1/3 (|r| &lt; 1): S = 6/(1 − 1/3) = 6/(2/3) = 9." },
        { q: "La sucesión aₙ = (−1)ⁿ…",
          op: ["es creciente y acotada", "es decreciente y no acotada", "está acotada y no es monótona", "converge a 0"], ok: 2,
          porque: "Sus términos son −1, 1, −1, 1…: siempre entre −1 y 1, y sube y baja alternativamente." },
        { q: "Para intercalar 3 medios geométricos entre 1 y 16, la razón es…",
          op: ["2", "3", "4", "5"], ok: 0,
          porque: "r = (16/1)<sup>1/(3+1)</sup> = 16<sup>1/4</sup> = 2: la progresión es 1, 2, 4, 8, 16." },
        { q: "¿Cuál de estas listas es una progresión geométrica?",
          op: ["2, 4, 6, 8", "1, 3, 9, 27", "1, 4, 9, 16", "1, 2, 4, 6"], ok: 1,
          porque: "1, 3, 9, 27 tiene cociente constante 3. La primera es aritmética, la tercera son cuadrados y la cuarta no tiene regla de este tipo." },
        { q: "2.000 € al 3 % de interés compuesto anual durante 5 años se convierten en…",
          op: ["2.300,00 €", "2.318,55 €", "2.309,10 €", "2.600,00 €"], ok: 1,
          porque: "2.000·1,03⁵ = 2.000·1,159274 = 2.318,55 €. El interés simple daría 2.300 €." }
      ]
    },
    tj1: {
      titulo: "Fórmulas de sucesiones",
      cartas: [
        { a: "Progresión aritmética: término general", b: "aₙ = a₁ + (n − 1)·d  ·  en general aₙ = aₘ + (n − m)·d" },
        { a: "Progresión aritmética: suma de n términos", b: "Sₙ = n·(a₁ + aₙ)/2. Los términos equidistantes de los extremos suman lo mismo." },
        { a: "Progresión geométrica: término general", b: "aₙ = a₁·rⁿ⁻¹  ·  en general aₙ = aₘ·rⁿ⁻ᵐ" },
        { a: "Progresión geométrica: suma de n términos", b: "Sₙ = a₁·(rⁿ − 1)/(r − 1)  (r ≠ 1). Si r = 1, Sₙ = n·a₁." },
        { a: "¿Cuándo existe la suma de infinitos términos?", b: "Cuando |r| &lt; 1. Entonces S = a₁/(1 − r)." },
        { a: "Interpolación aritmética de k términos entre a y b", b: "d = (b − a)/(k + 1)" },
        { a: "Interpolación geométrica de k términos entre a y b", b: "r = (b/a)<sup>1/(k+1)</sup>" },
        { a: "Producto de los n primeros términos de una geométrica", b: "Pₙ = (a₁·aₙ)<sup>n/2</sup>" },
        { a: "Tres números a, b, c en progresión aritmética", b: "2b = a + c (b es la media aritmética). Se pueden escribir a − d, a, a + d." },
        { a: "Tres números a, b, c en progresión geométrica", b: "b² = a·c (b es la media geométrica). Se pueden escribir a/r, a, a·r." },
        { a: "Interés compuesto", b: "C·(1 + r/100)ⁿ. Cada periodo el capital se multiplica por 1 + r/100." },
        { a: "Criterio de monotonía", b: "Signo de aₙ₊₁ − aₙ (o cociente aₙ₊₁/aₙ comparado con 1, si los términos son positivos)." }
      ]
    }
  };

  var ejercicios = [
    // ---------- ★ ----------
    { id: "s1", nivel: 1,
      enunciado: "Halla el término general de la sucesión 3, 5, 7, 9, 11, …",
      check: { tipo: "expr", etiqueta: "aₙ =", expr: "2n+1", ph: "usa la letra n, por ejemplo 2n+1" },
      pistas: ["Los términos suben siempre lo mismo: es una progresión aritmética.", "aₙ = a₁ + (n − 1)·d con a₁ = 3 y d = 2."],
      pasos: ["Diferencia constante: 5 − 3 = 2 = d. Es aritmética con a₁ = 3.", "aₙ = 3 + (n − 1)·2 = 3 + 2n − 2 = 2n + 1.", "Comprobación: a₁ = 3 ✓, a₅ = 11 ✓."],
      resultado: "aₙ = 2n + 1" },
    { id: "s2", nivel: 1,
      enunciado: "En una progresión aritmética a₁ = 4 y d = −3. Calcula a₈.",
      check: { tipo: "num", etiqueta: "a₈ =", valor: -17 },
      pistas: ["aₙ = a₁ + (n − 1)·d."],
      pasos: ["a₈ = 4 + 7·(−3) = 4 − 21 = −17."],
      resultado: "a₈ = −17" },
    { id: "s3", nivel: 1,
      enunciado: "Calcula la razón de la progresión geométrica 5, 10, 20, 40, …",
      check: { tipo: "num", etiqueta: "r =", valor: 2 },
      pistas: ["La razón es el cociente de dos términos consecutivos."],
      pasos: ["r = 10/5 = 2. Comprobación: 20/10 = 2 y 40/20 = 2."],
      resultado: "r = 2" },
    { id: "s4", nivel: 1,
      enunciado: "Calcula la suma de los 10 primeros términos de la progresión aritmética 2, 5, 8, 11, …",
      check: { tipo: "num", etiqueta: "S₁₀ =", valor: 155 },
      pistas: ["Primero necesitas a₁₀ = a₁ + 9d.", "Sₙ = n·(a₁ + aₙ)/2."],
      pasos: ["a₁ = 2 y d = 3. a₁₀ = 2 + 9·3 = 29.", "S₁₀ = 10·(2 + 29)/2 = 5·31 = 155."],
      resultado: "S₁₀ = 155" },
    { id: "s5", nivel: 1,
      enunciado: "Estudia la monotonía de la sucesión aₙ = 3n − 2.",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["creciente", "decreciente", "constante", "no monótona"], ok: 0 },
      pistas: ["Calcula aₙ₊₁ − aₙ."],
      pasos: ["aₙ₊₁ = 3(n + 1) − 2 = 3n + 1.", "aₙ₊₁ − aₙ = (3n + 1) − (3n − 2) = 3 &gt; 0 para todo n.", "Es estrictamente <b>creciente</b> (es una progresión aritmética de diferencia 3)."],
      resultado: "creciente" },
    { id: "s6", nivel: 1,
      enunciado: "La sucesión de Fibonacci empieza con a₁ = 1, a₂ = 1 y cumple aₙ = aₙ₋₁ + aₙ₋₂. Calcula a₉.",
      check: { tipo: "num", etiqueta: "a₉ =", valor: 34 },
      pistas: ["Ve sumando de dos en dos: 1, 1, 2, 3, 5, …"],
      pasos: ["a₃ = 2, a₄ = 3, a₅ = 5, a₆ = 8, a₇ = 13, a₈ = 21, a₉ = 13 + 21 = 34."],
      resultado: "a₉ = 34" },
    // ---------- ★★ ----------
    { id: "s7", nivel: 2,
      enunciado: "En una progresión aritmética a₅ = 17 y a₁₂ = 45. Halla a₁ y la diferencia d.",
      check: [{ tipo: "num", etiqueta: "a₁ =", valor: 1 }, { tipo: "num", etiqueta: "d =", valor: 4 }],
      pistas: ["Entre los términos 5 y 12 hay 7 saltos de tamaño d: a₁₂ = a₅ + 7d."],
      pasos: ["a₁₂ = a₅ + 7d → 45 = 17 + 7d → d = 4.", "a₅ = a₁ + 4d → 17 = a₁ + 16 → a₁ = 1.", "Comprobación: a₁₂ = 1 + 11·4 = 45 ✓."],
      resultado: "a₁ = 1 y d = 4" },
    { id: "s8", nivel: 2,
      enunciado: "Calcula la suma de todos los múltiplos de 7 mayores que 100 y menores que 500.",
      check: { tipo: "num", etiqueta: "Suma =", valor: 17157 },
      pistas: ["Primer múltiplo: 105. Último: 497. Calcula cuántos hay.", "Sₙ = n·(a₁ + aₙ)/2."],
      pasos: ["a₁ = 105 y aₙ = 497 con d = 7. 497 = 105 + (n − 1)·7 → n = 57.", "S = 57·(105 + 497)/2 = 57·301 = 17.157."],
      resultado: "17.157" },
    { id: "s9", nivel: 2,
      enunciado: "Intercala 4 números entre 3 y 18 para que los 6 formen una progresión aritmética. Indica la diferencia y el tercer número intercalado.",
      check: [{ tipo: "num", etiqueta: "d =", valor: 3 }, { tipo: "num", etiqueta: "tercer intercalado =", valor: 12 }],
      pistas: ["d = (b − a)/(k + 1) con k = 4."],
      pasos: ["d = (18 − 3)/(4 + 1) = 3.", "La progresión: 3, 6, 9, 12, 15, 18. Los intercalados son 6, 9, 12, 15; el tercero es 12."],
      resultado: "d = 3 · intercalados: 6, 9, 12, 15" },
    { id: "s10", nivel: 2,
      enunciado: "En una progresión geométrica a₃ = 12 y a₆ = 96. Calcula r, a₁ y S₈.",
      check: [{ tipo: "num", etiqueta: "r =", valor: 2 }, { tipo: "num", etiqueta: "a₁ =", valor: 3 }, { tipo: "num", etiqueta: "S₈ =", valor: 765 }],
      pistas: ["a₆ = a₃·r³.", "Sₙ = a₁·(rⁿ − 1)/(r − 1)."],
      pasos: ["96 = 12·r³ → r³ = 8 → r = 2.", "a₃ = a₁·r² → 12 = 4a₁ → a₁ = 3.", "S₈ = 3·(2⁸ − 1)/(2 − 1) = 3·255 = 765."],
      resultado: "r = 2, a₁ = 3, S₈ = 765" },
    { id: "s11", nivel: 2,
      enunciado: "Calcula la suma de infinitos términos 9 + 3 + 1 + 1/3 + 1/9 + …",
      check: { tipo: "num", etiqueta: "S =", valor: 13.5 },
      pistas: ["Es geométrica con a₁ = 9. Calcula la razón."],
      pasos: ["r = 3/9 = 1/3, y |r| &lt; 1: la suma existe.", "S = a₁/(1 − r) = 9/(1 − 1/3) = 9/(2/3) = 27/2 = 13,5."],
      resultado: "S = 27/2 = 13,5" },
    { id: "s12", nivel: 2,
      enunciado: "Se depositan 1.000 € al 5 % de interés compuesto anual. ¿Cuánto dinero hay al cabo de 10 años? (Redondea a céntimos.)",
      check: { tipo: "num", etiqueta: "Capital =", valor: 1628.89, unidad: "€", tol: 0.0005 },
      pistas: ["Cada año el capital se multiplica por 1,05."],
      pasos: ["C₁₀ = 1.000·1,05¹⁰.", "1,05¹⁰ ≈ 1,628895.", "C₁₀ ≈ 1.628,89 €."],
      resultado: "≈ 1.628,89 €" },
    { id: "s13", nivel: 2,
      enunciado: "Estudia la sucesión aₙ = (2n − 1)/(n + 1): ¿cómo es su monotonía y su acotación?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["creciente y acotada superiormente por 2", "decreciente y acotada inferiormente por 2", "creciente y no acotada", "no monótona"], ok: 0 },
      pistas: ["Calcula aₙ₊₁ − aₙ.", "Escribe aₙ = 2 − 3/(n+1)."],
      pasos: ["aₙ₊₁ − aₙ = (2n+1)/(n+2) − (2n−1)/(n+1) = 3/((n+1)(n+2)) &gt; 0 → creciente.", "aₙ = 2 − 3/(n+1) &lt; 2 → acotada superiormente por 2 (y inferiormente por a₁ = 1/2)."],
      resultado: "Creciente y acotada: 1/2 ≤ aₙ &lt; 2" },
    { id: "s14", nivel: 2,
      enunciado: "Calcula el producto de los 5 primeros términos de la progresión geométrica 2, 6, 18, 54, …",
      check: { tipo: "num", etiqueta: "P₅ =", valor: 1889568 },
      pistas: ["Pₙ = (a₁·aₙ)<sup>n/2</sup>. Calcula antes a₅.", "También puedes multiplicar directamente los cinco términos."],
      pasos: ["a₅ = 2·3⁴ = 162.", "P₅ = (2·162)<sup>5/2</sup> = 324<sup>5/2</sup> = 18⁵ = 1.889.568.", "Comprobación: 2·6·18·54·162 = 1.889.568."],
      resultado: "P₅ = 1.889.568" },
    // ---------- ★★★ ----------
    { id: "s15", nivel: 3,
      enunciado: "Una pelota se deja caer desde 10 m. En cada rebote sube el 60 % de la altura anterior. ¿Qué distancia total recorre hasta pararse?",
      check: { tipo: "num", etiqueta: "Distancia =", valor: 40, unidad: "m" },
      pistas: ["Primero baja 10 m. Después, cada rebote sube y baja.", "Serie geométrica de razón 0,6."],
      pasos: ["Distancia = 10 + 2·(6 + 3,6 + 2,16 + …).", "La serie tiene a₁ = 6 y r = 0,6: suma = 6/(1 − 0,6) = 15.", "Distancia total = 10 + 2·15 = 40 m."],
      resultado: "40 m" },
    { id: "s16", nivel: 3,
      enunciado: "¿Cuántos términos de la progresión aritmética 5, 9, 13, … hay que sumar para que la suma sea 495?",
      check: { tipo: "num", etiqueta: "n =", valor: 15 },
      pistas: ["Sₙ = n·(2a₁ + (n − 1)d)/2 = 2n² + 3n.", "Resuelve 2n² + 3n = 495 y descarta la solución negativa."],
      pasos: ["S<sub>n</sub> = n·(10 + 4(n − 1))/2 = 2n² + 3n = 495 → 2n² + 3n − 495 = 0.", "n = (−3 ± √(9 + 3960))/4 = (−3 ± 63)/4 → n = 15 o n = −16,5.", "n debe ser entero positivo: n = 15."],
      resultado: "n = 15" },
    { id: "s17", nivel: 3,
      enunciado: "Se ingresan 1.000 € al principio de cada año durante 10 años, a un 5 % anual de interés compuesto. ¿Qué capital hay al final del décimo año?",
      check: { tipo: "num", etiqueta: "Capital =", valor: 13206.79, unidad: "€", tol: 0.001 },
      pistas: ["El primer ingreso gana intereses durante 10 años y el último durante 1.", "Suma geométrica: 1.000·(1,05 + 1,05² + … + 1,05¹⁰)."],
      pasos: ["Capital = 1.000·(1,05 + 1,05² + … + 1,05¹⁰).", "Es una suma geométrica: a₁ = 1,05, r = 1,05, n = 10: S = 1,05·(1,05¹⁰ − 1)/0,05 = 1,05·12,5779 = 13,2068.", "Capital ≈ 13.206,79 €."],
      resultado: "≈ 13.206,79 €" },
    { id: "s18", nivel: 3,
      enunciado: "Expresa 0,636363… (el 63 se repite) como suma de infinitos términos de una progresión geométrica y calcula su valor como fracción.",
      check: { tipo: "num", etiqueta: "Valor =", valor: 7 / 11, tol: 0.001, ph: "p/q" },
      pistas: ["0,6363… = 0,63 + 0,0063 + 0,000063 + …", "a₁ = 0,63 y r = 0,01."],
      pasos: ["0,636363… = 0,63 + 0,0063 + 0,000063 + … con a₁ = 0,63 y r = 0,01.", "S = 0,63/(1 − 0,01) = 0,63/0,99 = 63/99 = 7/11.", "Coincide con la fracción generatriz del Tema 1."],
      resultado: "7/11" },
    { id: "s19", nivel: 3,
      enunciado: "Calcula la suma infinita 1 − 1/2 + 1/4 − 1/8 + … (los signos alternan).",
      check: { tipo: "num", etiqueta: "S =", valor: 2 / 3, tol: 0.001, ph: "p/q" },
      pistas: ["Es geométrica con razón negativa."],
      pasos: ["a₁ = 1 y r = −1/2, con |r| &lt; 1.", "S = a₁/(1 − r) = 1/(1 + 1/2) = 1/(3/2) = 2/3."],
      resultado: "S = 2/3" },
    { id: "s20", nivel: 3,
      enunciado: "Tres números están en progresión aritmética. Suman 21 y su producto es 315. Calcula el menor y el mayor.",
      check: [{ tipo: "num", etiqueta: "menor =", valor: 5 }, { tipo: "num", etiqueta: "mayor =", valor: 9 }],
      pistas: ["Llámalos a − d, a, a + d: al sumarlos desaparece d.", "(a − d)·a·(a + d) = a·(a² − d²)."],
      pasos: ["Suma: (a − d) + a + (a + d) = 3a = 21 → a = 7.", "Producto: (7 − d)·7·(7 + d) = 7·(49 − d²) = 315 → 49 − d² = 45 → d² = 4 → d = ±2.", "Los números son 5, 7, 9 (o 9, 7, 5)."],
      resultado: "5, 7 y 9" },
    { id: "s21", nivel: 3,
      enunciado: "Tres números están en progresión geométrica. Suman 14 y su producto es 64. Calcula el menor y el mayor.",
      check: [{ tipo: "num", etiqueta: "menor =", valor: 2 }, { tipo: "num", etiqueta: "mayor =", valor: 8 }],
      pistas: ["Llámalos a/r, a, a·r: al multiplicarlos desaparece r.", "Producto: a³ = 64."],
      pasos: ["Producto: (a/r)·a·(a·r) = a³ = 64 → a = 4.", "Suma: 4/r + 4 + 4r = 14 → 4/r + 4r = 10 → 4 + 4r² = 10r → 2r² − 5r + 2 = 0.", "r = (5 ± 3)/4 → r = 2 o r = 1/2.", "Con r = 2: 2, 4, 8 (con r = 1/2: 8, 4, 2). Menor 2 y mayor 8."],
      resultado: "2, 4 y 8" },
    { id: "s22", nivel: 3,
      enunciado: "Demuestra la fórmula de la suma de los n primeros términos de una progresión geométrica, Sₙ = a₁(rⁿ − 1)/(r − 1), para r ≠ 1.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹", p: 0.5 },
        { t: "Multiplica por r y escribe r·Sₙ = a₁r + a₁r² + … + a₁rⁿ", p: 0.5 },
        { t: "Resta las dos igualdades y observa que casi todos los términos se cancelan: Sₙ − r·Sₙ = a₁ − a₁rⁿ", p: 0.5 },
        { t: "Saca factor común y despeja: Sₙ(1 − r) = a₁(1 − rⁿ) → Sₙ = a₁(rⁿ − 1)/(r − 1)", p: 0.5 }
      ] },
      pasos: ["Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹.", "Multiplicando por r: r·Sₙ = a₁r + a₁r² + … + a₁rⁿ⁻¹ + a₁rⁿ.", "Restando: Sₙ − r·Sₙ = a₁ − a₁rⁿ (se cancelan todos los términos intermedios).", "Sₙ(1 − r) = a₁(1 − rⁿ) → Sₙ = a₁(1 − rⁿ)/(1 − r) = a₁(rⁿ − 1)/(r − 1)."],
      resultado: "Sₙ = a₁(rⁿ − 1)/(r − 1)" }
  ];

  var lamina = [
    { titulo: "Progresión aritmética (se SUMA d)",
      items: [
        { label: "Término general", formula: "aₙ = a₁ + (n − 1)·d", cuando: "Para llegar a cualquier término.", ejemplo: "3, 7, 11… (d = 4) → a₁₀ = 3 + 9·4 = 39", ojo: "Son n − 1 saltos, no n." },
        { label: "Entre dos términos", formula: "aₙ = aₘ + (n − m)·d", cuando: "Cuando te dan dos términos y no el primero.", ejemplo: "a₅ = 17, a₁₂ = 45 → 7d = 28 → d = 4" },
        { label: "Suma de n términos", formula: "Sₙ = " + fr("n·(a₁ + aₙ)", "2"), cuando: "Siempre que conozcas a₁ y aₙ.", ejemplo: "1 + 2 + … + 100 = 100·101/2 = 5050", ojo: "No olvides el «÷ 2»." },
        { label: "Interpolar k términos entre a y b", formula: "d = " + fr("b − a", "k + 1") }
      ] },
    { titulo: "Progresión geométrica (se MULTIPLICA por r)",
      items: [
        { label: "Término general", formula: "aₙ = a₁·rⁿ⁻¹", ejemplo: "3, 6, 12… (r = 2) → a₆ = 3·2⁵ = 96", ojo: "La razón es un cociente, no una diferencia." },
        { label: "Suma de n términos", formula: "Sₙ = " + fr("a₁·(rⁿ − 1)", "r − 1"), ojo: "Si r = 1, Sₙ = n·a₁." },
        { label: "Suma infinita (|r| &lt; 1)", formula: "S = " + fr("a₁", "1 − r"), cuando: "Solo si |r| &lt; 1.", ejemplo: "4 + 2 + 1 + … = 4/(1 − 1/2) = 8" },
        { label: "Producto de n términos", formula: "Pₙ = (a₁·aₙ)<sup>n/2</sup>" },
        { label: "Interpolar k términos entre a y b", formula: "r = (b/a)<sup>1/(k+1)</sup>" }
      ] },
    { titulo: "¿Aritmética o geométrica?", ancha: true,
      tabla: { cab: ["Mira…", "Si es constante", "Entonces"], filas: [
        ["Diferencias aₙ₊₁ − aₙ", "sí", "aritmética (d)"], ["Cocientes aₙ₊₁ / aₙ", "sí", "geométrica (r)"], ["Segunda diferencia", "sí", "polinomio de grado 2 (n² …)"], ["Tres números a, b, c", "2b = a + c", "aritmética"], ["Tres números a, b, c", "b² = a·c", "geométrica"]
      ] },
      nota: "Para 3 números aritméticos usa a − d, a, a + d. Para geométricos, a/r, a, a·r." },
    { titulo: "Monotonía y acotación",
      pasos: ["Calcula aₙ₊₁ − aₙ y estudia su signo (≥ 0 creciente, ≤ 0 decreciente).", "Con términos positivos, también vale aₙ₊₁/aₙ ≷ 1.", "Cota superior K: aₙ ≤ K ∀n. Cota inferior k: aₙ ≥ k ∀n.", "Monótona y acotada ⇒ converge."],
      nota: "(−1)ⁿ está acotada, no es monótona y no converge." },
    { titulo: "Interés compuesto",
      items: [
        { label: "Capital tras n años", formula: "Cₙ = C·(1 + r/100)ⁿ", ejemplo: "1.000 € al 5 % durante 10 años → 1.628,89 €", cuando: "Los intereses se suman al capital cada año." },
        { label: "Ahorro al inicio de cada año", formula: "C·q·(qⁿ − 1)/(q − 1)", cuando: "Con q = 1 + r/100 y una aportación C anual." }
      ],
      nota: "Aumento del r %: factor 1 + r/100. Disminución del r %: factor 1 − r/100." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "aₙ = a₁ + n·d", bien: "aₙ = a₁ + (n − 1)·d", por: "De a₁ a aₙ hay n − 1 saltos." },
        { mal: "Sₙ = n·(a₁ + aₙ)", bien: "Sₙ = n·(a₁ + aₙ)/2", por: "Cada pareja se cuenta una vez, no dos." },
        { mal: "1 + 2 + 4 + 8 + … = 1/(1 − 2) = −1", bien: "La suma diverge", por: "La fórmula solo vale si |r| &lt; 1." },
        { mal: "r = aₙ₊₁ − aₙ", bien: "r = aₙ₊₁ ÷ aₙ", por: "La diferencia es d (aritmética)." },
        { mal: "Toda sucesión acotada converge", bien: "Monótona y acotada converge", por: "(−1)ⁿ está acotada y oscila." }
      ] }
  ];


  // ============================================================
  // Ampliación del tema 2 (secciones 8–13, ejercicios s23–s59, láminas y actividades)
  // ============================================================
  resumen.push(
    "Una <b>recurrencia</b> aₙ₊₁ = f(aₙ) se estudia con su <b>punto fijo</b>: si converge, el límite L cumple L = f(L). Si aₙ₊₁ = p·aₙ + q, el cambio bₙ = aₙ − L la convierte en geométrica.",
    "Para pasar de la suma al término: <b>aₙ = Sₙ − Sₙ₋₁</b> (n ≥ 2) y a₁ = S₁. Si Sₙ es un polinomio de 2.º grado sin término independiente, la sucesión es aritmética.",
    "Una <b>serie</b> es la suma de infinitos términos: converge si las sumas parciales Sₙ se acercan a un número. La armónica 1 + 1/2 + 1/3 + … <b>diverge</b> aunque sus términos tiendan a 0.",
    "Dinero: ahorro mensual <b>C = c·((1 + i)ⁿ − 1)/i</b>; cuota de un préstamo <b>c = C·i/(1 − (1 + i)⁻ⁿ)</b> con i = r/12. Y (1 + 1/n)ⁿ → <b>e</b> (capitalización continua: C·e<sup>rt</sup>)."
  );

  // ---------------- secciones originales: más desarrollo ----------------
  secciones[0] +=
    "<h5>La sucesión como función</h5>" +
    "<p>Una sucesión es una <b>función</b> cuyo dominio son los naturales positivos: a cada posición n = 1, 2, 3, … le asigna un número aₙ. Por eso su gráfica no es una línea continua sino una <b>nube de puntos aislados</b> (n, aₙ): no tiene sentido hablar de a₂,₅. Y por eso el <b>orden</b> y las <b>repeticiones</b> importan: la sucesión (−1)ⁿ = −1, 1, −1, 1, … no es lo mismo que el conjunto {−1, 1}.</p>" +
    "<h5>Buscar el término general a partir de las diferencias</h5>" +
    "<p>Si la sucesión no es aritmética ni geométrica, calcula las <b>diferencias primeras</b> (aₙ₊₁ − aₙ) y, si hace falta, las <b>segundas</b> (las diferencias de las diferencias):</p>" +
    "<ul><li>Primeras diferencias constantes (= d) → lineal: aₙ = d·n + c.</li>" +
    "<li>Segundas diferencias constantes (= k) → polinomio de segundo grado: aₙ = (k/2)·n² + b·n + c. Se resta (k/2)·n² a los términos y lo que queda es lineal.</li></ul>" +
    ejemplo("Un polinomio de segundo grado", "Halla el término general de 3, 8, 15, 24, 35, …", [
      "Diferencias primeras: 5, 7, 9, 11. Diferencias segundas: 2, 2, 2 (constantes). Con k = 2, el coeficiente de n² es k/2 = 1.",
      "Restamos n² a cada término: 3 − 1 = 2, 8 − 4 = 4, 15 − 9 = 6, 24 − 16 = 8. Queda 2, 4, 6, 8, … = 2n.",
      "Por tanto <b>aₙ = n² + 2n = n(n + 2)</b>. Comprobación: a₅ = 5·7 = 35 ✓."
    ]) +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>1, 3, 6, 10, 15, …</td><td><b>números triangulares</b>: aₙ = n(n + 1)/2 (son 1, 1 + 2, 1 + 2 + 3, …)</td></tr>" +
    "<tr><td>1, 4, 9, 16, 25, …</td><td>cuadrados: aₙ = n²</td></tr>" +
    "<tr><td>1, 5, 12, 22, 35, …</td><td>pentagonales: aₙ = n(3n − 1)/2</td></tr>" +
    "<tr><td>2, 6, 12, 20, 30, …</td><td>oblongos: aₙ = n(n + 1) (el doble de los triangulares)</td></tr>" +
    "<tr><td>1, 2, 6, 24, 120, …</td><td>factoriales: aₙ = n! = 1·2·3·…·n</td></tr>" +
    "</tbody></table>" +
    ejemplo("Con signos alternados", "Halla el término general de 2, −4, 6, −8, 10, …", [
      "Sin signos, los valores son 2, 4, 6, 8, 10: es 2n.",
      "El primer término es positivo y los signos alternan: hace falta (−1)ⁿ⁺¹ (vale +1 cuando n es impar).",
      "<b>aₙ = (−1)ⁿ⁺¹·2n</b>. Comprobación: a₂ = (−1)³·4 = −4 ✓."
    ]) +
    ojo("los primeros términos <b>no determinan</b> la sucesión. 1, 2, 4, … puede seguir con 8 (potencias de 2, aₙ = 2ⁿ⁻¹) o con 7 (cada vez se suma una unidad más: aₙ₊₁ = aₙ + n, que da 1, 2, 4, 7, 11, 16…). Por eso los enunciados dan la fórmula o la regla, o preguntan por «el término general más sencillo».");

  secciones[1] +=
    "<h5>Más ejemplos de estudio de la monotonía</h5>" +
    ejemplo("Cuando el numerador y el denominador crecen", "Estudia la monotonía y la acotación de aₙ = n/(n² + 1).", [
      "aₙ₊₁ − aₙ = (n+1)/((n+1)² + 1) − n/(n² + 1). Con denominador común, el numerador es (n+1)(n² + 1) − n(n² + 2n + 2) = (n³ + n² + n + 1) − (n³ + 2n² + 2n) = <b>−n² − n + 1</b>.",
      "Para n ≥ 1 ese numerador es ≤ −1 &lt; 0 y el denominador es positivo: aₙ₊₁ − aₙ &lt; 0, la sucesión es <b>estrictamente decreciente</b> (1/2, 2/5, 3/10, 4/17, …).",
      "Acotación: 0 &lt; aₙ ≤ a₁ = 1/2. Al ser decreciente y positiva, converge (a 0: el denominador es de mayor grado)."
    ]) +
    ejemplo("Una sucesión que baja y luego sube", "Estudia aₙ = n² − 6n.", [
      "aₙ₊₁ − aₙ = [(n+1)² − 6(n+1)] − [n² − 6n] = 2n − 5.",
      "Es negativa si n ≤ 2 (n = 1: −3, n = 2: −1) y positiva desde n = 3. Los términos son −5, −8, −9, −8, −5, 0, 7, …",
      "Decrece hasta a₃ = −9 y <b>crece a partir de n = 3</b>. No es monótona, pero sí «eventualmente creciente». Su mínimo es a₃ = −9 (cota inferior), y no tiene cota superior."
    ]) +
    ejemplo("Con factoriales: el cociente es lo cómodo", "Estudia aₙ = 2ⁿ/n!.", [
      "Todos los términos son positivos: aₙ₊₁/aₙ = [2ⁿ⁺¹/(n+1)!]·[n!/2ⁿ] = 2/(n + 1).",
      "2/(n + 1) ≤ 1 cuando n ≥ 1: la sucesión es decreciente (a₁ = 2, a₂ = 2, a₃ = 4/3, a₄ = 2/3, …).",
      "Está acotada: 0 &lt; aₙ ≤ 2. Al ser monótona y acotada, converge: de hecho tiende a 0 (el factorial «le gana» a la potencia)."
    ]) +
    "<h5>Cuándo «se aquieta» una sucesión: la idea de límite</h5>" +
    "<p>Decimos que aₙ <b>converge a L</b> (aₙ → L) si los términos se acercan a L tanto como queramos y se quedan cerca. Con más precisión: <b>para cualquier tolerancia ε &gt; 0 existe un lugar N tal que, a partir de él (n ≥ N), todos los términos cumplen |aₙ − L| &lt; ε</b>. Es el entorno de L del Tema 1, E(L, ε), y la sucesión acaba entrando y ya no sale. Elige tú la tolerancia y mira a partir de qué término se cumple:</p>" +
    w("epsn") +
    "<p>Cuando no hay ningún L que sirva, la sucesión <b>no converge</b>: o bien crece (o decrece) sin límite (<b>diverge</b>, como n²), o bien oscila sin acercarse a nada (como (−1)ⁿ).</p>" +
    "<h5>Cómo calcular límites de sucesiones sencillas</h5>" +
    "<ul><li><b>Propiedades</b>: si aₙ → a y bₙ → b, entonces aₙ ± bₙ → a ± b, aₙ·bₙ → a·b, k·aₙ → k·a y aₙ/bₙ → a/b (si b ≠ 0).</li>" +
    "<li><b>Se conocen de memoria</b>: 1/n → 0, 1/n² → 0, c/nᵏ → 0 (k &gt; 0), rⁿ → 0 si |r| &lt; 1.</li>" +
    "<li><b>Cociente de polinomios en n</b>: se divide numerador y denominador entre la mayor potencia de n y se aplican las reglas anteriores.</li></ul>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>grado del numerador &lt; grado del denominador</td><td>el límite es <b>0</b>: (n² + 1)/n³ → 0</td></tr>" +
    "<tr><td>los dos grados iguales</td><td>el límite es el <b>cociente de los coeficientes principales</b>: (5n − 1)/(2n + 3) → 5/2</td></tr>" +
    "<tr><td>grado del numerador &gt; grado del denominador</td><td>el límite es <b>±∞</b> (diverge): (2n³ + n)/(n + 1) → +∞</td></tr>" +
    "</tbody></table>" +
    ejemplo("Dividir entre la mayor potencia", "Calcula el límite de aₙ = (3n² − 2n + 1)/(n² + 5).", [
      "La mayor potencia es n². Dividimos todos los términos entre n²: (3 − 2/n + 1/n²)/(1 + 5/n²).",
      "Cuando n → ∞, 2/n → 0, 1/n² → 0 y 5/n² → 0. Queda (3 − 0 + 0)/(1 + 0) = <b>3</b>."
    ]) +
    ojo("«∞/∞» <b>no vale 1</b>: es una indeterminación. n²/n = n → ∞, n/n² = 1/n → 0 y (3n)/n = 3. Cada caso se resuelve dividiendo por la mayor potencia. En el Tema 10 verás los límites con más detalle.");

  secciones[2] +=
    "<h5>De la suma al término: aₙ = Sₙ − Sₙ₋₁</h5>" +
    "<p>Si conoces la fórmula de la suma Sₙ = a₁ + a₂ + … + aₙ, el término se obtiene <b>restando dos sumas consecutivas</b>: Sₙ − Sₙ₋₁ = aₙ. La resta solo tiene sentido para n ≥ 2 (S₀ no existe), así que el primer término se calcula aparte: <b>a₁ = S₁</b>. Y hay que comprobar si la fórmula que sale vale también para n = 1.</p>" +
    "<p>Una consecuencia: si Sₙ es un polinomio de <b>segundo grado sin término independiente</b>, Sₙ = A·n² + B·n, la sucesión es aritmética con d = 2A y a₁ = A + B. Es la forma que tiene la suma de una progresión aritmética: Sₙ = (d/2)·n² + (a₁ − d/2)·n.</p>" +
    ejemplo("Sacar el término general", "La suma de los n primeros términos de una sucesión es Sₙ = 3n² − 2n. Halla aₙ.", [
      "a₁ = S₁ = 3 − 2 = 1.",
      "Para n ≥ 2: aₙ = Sₙ − Sₙ₋₁ = (3n² − 2n) − (3(n−1)² − 2(n−1)) = 3n² − 2n − 3n² + 6n − 3 + 2n − 2 = 6n − 5.",
      "Para n = 1 la fórmula da 6 − 5 = 1 = a₁ ✓: sirve para todo n. <b>aₙ = 6n − 5</b>, una progresión aritmética con a₁ = 1 y d = 6."
    ]) +
    ejemplo("Cuando la fórmula no vale para n = 1", "Sₙ = n² + 1. Halla a₁, a₂, a₃ y el término general.", [
      "a₁ = S₁ = 2.",
      "Para n ≥ 2: aₙ = (n² + 1) − ((n−1)² + 1) = n² − (n−1)² = 2n − 1. Así a₂ = 3, a₃ = 5…",
      "La fórmula 2n − 1 daría 1 para n = 1, pero a₁ = 2. Hay que dar el término general <b>por trozos</b>: a₁ = 2 y aₙ = 2n − 1 si n ≥ 2. La sucesión 2, 3, 5, 7, … <b>no</b> es aritmética: el término independiente 1 de Sₙ lo estropea."
    ]) +
    "<h5>Sumas que conviene saberse</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>1 + 2 + 3 + … + n</td><td>n(n + 1)/2</td></tr>" +
    "<tr><td>1 + 3 + 5 + … + (2n − 1) (los n primeros impares)</td><td><b>n²</b></td></tr>" +
    "<tr><td>2 + 4 + 6 + … + 2n (los n primeros pares)</td><td>n(n + 1)</td></tr>" +
    "<tr><td>1² + 2² + 3² + … + n²</td><td>n(n + 1)(2n + 1)/6 (no es aritmética; se demuestra por inducción en 2.º)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Un anfiteatro", "Un anfiteatro tiene 20 filas. La primera tiene 15 asientos y cada fila tiene 2 más que la anterior. ¿Cuántos asientos hay en total?", [
      "Progresión aritmética con a₁ = 15 y d = 2. La fila 20 tiene a₂₀ = 15 + 19·2 = 53 asientos.",
      "Total: S₂₀ = 20·(15 + 53)/2 = 10·68 = <b>680 asientos</b>."
    ]) +
    ejemplo("Cuándo se supera una meta", "Una persona ahorra 5 € la primera semana y cada semana ahorra 2 € más que la anterior. ¿En qué semana habrá superado los 500 € acumulados?", [
      "Ahorros semanales: 5, 7, 9, … (a₁ = 5, d = 2). Acumulado: Sₙ = n·(2·5 + (n − 1)·2)/2 = n² + 4n.",
      "Imponemos n² + 4n &gt; 500 → n² + 4n − 500 &gt; 0 → n &gt; −2 + √504 ≈ 20,45.",
      "Comprobación: S₂₀ = 400 + 80 = 480 (no llega) y S₂₁ = 441 + 84 = 525. La meta se supera en la <b>semana 21</b>."
    ]);

  secciones[3] +=
    "<h5>La razón manda: seis comportamientos</h5>" +
    "<p>El comportamiento de aₙ = a₁·rⁿ⁻¹ depende solo de <b>dónde está la razón r</b> (con a₁ &gt; 0):</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>r &gt; 1</td><td>crece sin límite (diverge a +∞): 3, 6, 12, 24, …</td></tr>" +
    "<tr><td>r = 1</td><td>constante: 5, 5, 5, …</td></tr>" +
    "<tr><td>0 &lt; r &lt; 1</td><td>decrece hacia 0: 80, 40, 20, 10, …</td></tr>" +
    "<tr><td>−1 &lt; r &lt; 0</td><td>alterna de signo y se acerca a 0: 8, −4, 2, −1, …</td></tr>" +
    "<tr><td>r = −1</td><td>oscila entre a₁ y −a₁: 3, −3, 3, −3, …</td></tr>" +
    "<tr><td>r &lt; −1</td><td>alterna de signo y su valor absoluto crece sin límite: 1, −2, 4, −8, …</td></tr>" +
    "</tbody></table>" +
    "<h5>Crecimiento lineal frente a crecimiento exponencial</h5>" +
    "<p>Una progresión aritmética <b>suma</b> lo mismo en cada paso (crecimiento lineal); una geométrica con r &gt; 1 <b>multiplica</b> por lo mismo (crecimiento exponencial). Al principio parece que no hay mucha diferencia, pero al final <b>siempre</b> gana la geométrica, y por una distancia enorme.</p>" +
    ejemplo("El folio que llega a la Luna", "Un folio de 0,1 mm de grosor se dobla por la mitad una y otra vez. ¿Cuántos dobleces harían falta para superar la distancia a la Luna (384.400 km)? (Es un experimento mental: en la práctica no se puede doblar tantas veces.)", [
      "Cada doblez duplica el grosor: tras n dobleces el grosor es 0,1·2ⁿ mm. Es una progresión geométrica de razón 2.",
      "384.400 km = 3,844·10¹¹ mm. Hay que resolver 0,1·2ⁿ &gt; 3,844·10¹¹ → 2ⁿ &gt; 3,844·10¹² → n &gt; log₂(3,844·10¹²) ≈ 41,8.",
      "Con 41 dobleces: 0,1·2⁴¹ mm ≈ 219.902 km (no llega). Con <b>42 dobleces</b>: 0,1·2⁴² mm ≈ 439.805 km (más que la distancia a la Luna)."
    ]) +
    ejemplo("El tablero de ajedrez", "Se ponen en las 64 casillas de un tablero 1, 2, 4, 8, … granos de trigo (el doble en cada casilla). ¿Cuántos granos hay en total?", [
      "Progresión geométrica con a₁ = 1, r = 2 y 64 términos.",
      "S₆₄ = 1·(2⁶⁴ − 1)/(2 − 1) = 2⁶⁴ − 1 = <b>18.446.744.073.709.551.615</b> granos, unos 1,8·10¹⁹. Es muchísimo más que toda la producción mundial de trigo."
    ]) +
    ejemplo("Una sustancia que se desintegra", "Una muestra de 500 g pierde el 10 % de su masa cada hora. ¿Cuántos gramos quedan a las 6 horas? ¿Cuántas horas deben pasar para que queden menos de 100 g?", [
      "Perder el 10 % es multiplicar por 0,9: mₙ = 500·0,9ⁿ. A las 6 horas: 500·0,9⁶ = 500·0,531441 = <b>265,72 g</b>.",
      "Queremos 500·0,9ⁿ &lt; 100 → 0,9ⁿ &lt; 0,2 → n &gt; log 0,2/log 0,9 ≈ 15,28.",
      "Comprobación: tras 15 h quedan 102,95 g y tras 16 h, 92,65 g. Hacen falta <b>16 horas</b>."
    ]) +
    ejemplo("Bacterias", "Un cultivo de 1.000 bacterias duplica su número cada 20 minutos. ¿Cuántas habrá en 3 horas?", [
      "3 horas = 180 minutos = 9 periodos de 20 minutos. El número se multiplica por 2 nueve veces.",
      "1.000·2⁹ = 1.000·512 = <b>512.000 bacterias</b>."
    ]);

  // ---------------- secciones nuevas (8–13), antes de «¿Qué falla aquí?» ----------------
  nuevas.splice(3, 0,
    {
      h: "8. Sucesiones recurrentes: cada término depende del anterior",
      html:
        "<p>Una sucesión <b>recurrente</b> da el primer término y una regla para obtener cada término a partir del anterior: aₙ₊₁ = f(aₙ). Las progresiones son casos particulares (f(x) = x + d y f(x) = r·x), pero hay muchas más, y algunas tienen comportamientos sorprendentes. Experimenta con las reglas de ejemplo y con las tuyas (escribe la regla con la letra x en lugar de aₙ):</p>" +
        w("recurrencia") +
        "<h5>¿A dónde va? El punto fijo</h5>" +
        "<p>Si una sucesión recurrente <b>converge</b> a L, al pasar al límite en aₙ₊₁ = f(aₙ) queda <b>L = f(L)</b>. Resolver esa ecuación da los <em>candidatos</em> a límite. (Se llaman «puntos fijos» de f porque f los deja quietos.)</p>" +
        ejemplo("Límite de una recurrencia", "Calcula el límite de a₁ = 10, aₙ₊₁ = (aₙ + 2)/2, suponiendo que converge.", [
          "Los primeros términos: 10, 6, 4, 3, 2,5, 2,25, … bajan y se acercan a algo.",
          "Si el límite es L: L = (L + 2)/2 → 2L = L + 2 → <b>L = 2</b>.",
          "Comprobación: aₙ − 2 = 8/2ⁿ⁻¹ (8, 4, 2, 1, 0,5, …), que tiende a 0 ✓."
        ]) +
        ejemplo("El método de Herón para √2", "La sucesión a₁ = 1, aₙ₊₁ = (aₙ + 2/aₙ)/2 aproxima √2. Calcula a₂, a₃, a₄ y demuestra que, si converge, lo hace a √2.", [
          "a₂ = (1 + 2)/2 = 3/2 = 1,5. a₃ = (1,5 + 2/1,5)/2 = 17/12 ≈ 1,416667. a₄ = (17/12 + 24/17)/2 = 577/408 ≈ <b>1,414216</b>.",
          "Si converge a L: L = (L + 2/L)/2 → 2L = L + 2/L → L = 2/L → L² = 2. Como todos los términos son positivos, <b>L = √2</b> ≈ 1,414214.",
          "Con solo 4 términos ya coinciden las 5 primeras cifras decimales. Es un método babilonio, y es el que usan las calculadoras (el método de Newton para x² − 2 = 0)."
        ]) +
        "<h5>Una recurrencia lineal es una geométrica disfrazada</h5>" +
        "<p>Si aₙ₊₁ = p·aₙ + q con p ≠ 1, se resta el punto fijo L = q/(1 − p): <b>bₙ = aₙ − L</b> cumple bₙ₊₁ = p·bₙ, que es una progresión geométrica de razón p. Entonces aₙ = L + b₁·pⁿ⁻¹.</p>" +
        ejemplo("Término general de una recurrencia", "Halla el término general de a₁ = 3, aₙ₊₁ = 2aₙ − 1 y calcula a₅.", [
          "Punto fijo: L = 2L − 1 → L = 1. Definimos bₙ = aₙ − 1.",
          "bₙ₊₁ = aₙ₊₁ − 1 = 2aₙ − 2 = 2(aₙ − 1) = 2bₙ, con b₁ = 3 − 1 = 2: geométrica de razón 2, así que bₙ = 2·2ⁿ⁻¹ = 2ⁿ.",
          "<b>aₙ = 2ⁿ + 1</b>. Comprobación: a₁ = 3 ✓, a₂ = 5 = 2·3 − 1 ✓. Y a₅ = 2⁵ + 1 = <b>33</b> (3, 5, 9, 17, 33)."
        ]) +
        ojo("<b>L = f(L) no garantiza que la sucesión llegue a L</b>. En el ejemplo anterior el punto fijo es 1, pero la sucesión 3, 5, 9, 17, 33, … se aleja de él. El punto fijo solo dice cuál sería el límite <em>si</em> converge; la convergencia hay que comprobarla (monotonía y acotación, o |p| &lt; 1 en el caso lineal). Prueba también la regla 3,9·x(1 − x) en el simulador: ni converge ni se repite. Es un ejemplo de <b>caos</b>.") +
        "<p>Otro punto fijo famoso: aₙ₊₁ = 1 + 1/aₙ con a₁ = 1 da 1, 2, 3/2, 5/3, 8/5, … (cocientes de Fibonacci). Su límite cumple L = 1 + 1/L → L² = L + 1 → <b>L = (1 + √5)/2 ≈ 1,618</b>, el número áureo.</p>"
    },
    {
      h: "9. Series: sumar infinitos términos",
      html:
        "<p>Sumar infinitos números puede dar un número finito. Una <b>serie</b> es la suma de los infinitos términos de una sucesión: a₁ + a₂ + a₃ + … Para darle sentido se mira la sucesión de <b>sumas parciales</b> Sₙ = a₁ + … + aₙ: si Sₙ <b>se acerca a un número S</b>, se dice que la serie <b>converge</b> y vale S; si no, <b>diverge</b>.</p>" +
        w("serie") +
        "<h5>La serie geométrica</h5>" +
        "<p>Para a + ar + ar² + …, las sumas parciales son Sₙ = a(1 − rⁿ)/(1 − r). Si <b>|r| &lt; 1</b>, rⁿ → 0 y las sumas se acercan a <b>S = a/(1 − r)</b>. Si |r| ≥ 1, los términos no tienden a 0 y la serie diverge. Regla práctica: <b>S = (primer término que sumas)/(1 − r)</b>.</p>" +
        ejemplo("Aquiles y la tortuga (la paradoja de Zenón)", "Aquiles corre a 10 m/s y una tortuga a 1 m/s, con 100 m de ventaja. Aquiles llega donde estaba la tortuga (10 s), pero ella ha avanzado 10 m; recorre esos 10 m (1 s) y ella ha avanzado 1 m, … ¿Cuándo la alcanza?", [
          "Los tiempos de cada etapa son 10 + 1 + 0,1 + 0,01 + … Es una serie geométrica con a = 10 y r = 0,1.",
          "S = 10/(1 − 0,1) = 10/0,9 = 100/9 ≈ <b>11,11 s</b>: infinitas etapas pueden sumar un tiempo finito.",
          "Comprobación con una ecuación: 10t = 100 + t → 9t = 100 → t = 100/9 ✓."
        ]) +
        ejemplo("0,999… = 1", "Demuestra con series que 0,999… vale exactamente 1.", [
          "0,999… = 0,9 + 0,09 + 0,009 + …: geométrica con a = 0,9 y r = 0,1.",
          "S = 0,9/(1 − 0,1) = 0,9/0,9 = <b>1</b>. No es «casi» 1: es 1, porque el límite de las sumas parciales 0,9, 0,99, 0,999… es 1."
        ]) +
        ejemplo("Una serie que empieza más tarde", "Calcula 1/8 + 1/16 + 1/32 + … (es la suma de (1/2)ᵏ desde k = 3).", [
          "El primer término que sumas es 1/8 y la razón es 1/2.",
          "S = (1/8)/(1 − 1/2) = (1/8)/(1/2) = <b>1/4</b>. Comprobación: 1 − (1/2 + 1/4) = 1/4 ✓ (toda la serie 1/2 + 1/4 + … suma 1)."
        ]) +
        "<h5>Una advertencia: que los términos tiendan a 0 no basta</h5>" +
        "<p>Si una serie converge, sus términos tienen que tender a 0. Pero <b>al revés es falso</b>: la serie armónica 1 + 1/2 + 1/3 + 1/4 + … tiene términos que tienden a 0 y sin embargo <b>diverge</b>. La razón: se agrupa así</p>" +
        "<div class='formula-wrap'><div class='formula'>1 + 1/2 + (1/3 + 1/4) + (1/5 + … + 1/8) + (1/9 + … + 1/16) + …</div></div>" +
        "<p>Cada paréntesis suma más de 1/2 (1/3 + 1/4 &gt; 1/4 + 1/4 = 1/2; 1/5 + … + 1/8 &gt; 4·(1/8) = 1/2; y así siempre). Hay infinitos paréntesis, así que la suma supera cualquier número, aunque crece <em>muy</em> despacio: hacen falta 12.367 términos para pasar de 10.</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>a + ar + ar² + … con |r| &lt; 1</td><td>converge: a/(1 − r)</td></tr>" +
        "<tr><td>a + ar + ar² + … con |r| ≥ 1</td><td>diverge</td></tr>" +
        "<tr><td>1 + 1/2 + 1/3 + 1/4 + … (armónica)</td><td>diverge (lentamente)</td></tr>" +
        "<tr><td>1 + 1/4 + 1/9 + 1/16 + … (1/n²)</td><td>converge, a π²/6 ≈ 1,645 (Euler); no es geométrica y su suma es mucho más difícil</td></tr>" +
        "<tr><td>cuando aₙ no tiende a 0</td><td>la serie diverge seguro</td></tr>" +
        "</tbody></table>"
    },
    {
      h: "10. Dinero con pagos periódicos: ahorro, préstamos y TAE",
      html:
        "<p>Las cuentas de ahorro y las hipotecas son progresiones geométricas. Con pagos <b>mensuales</b> el tipo anual r se reparte en doce: el tipo mensual es <b>i = r/12</b> y el factor mensual es <b>1 + i</b>. (Error típico: usar 0,03 como si fuera mensual cuando es anual.) Comprueba las dos fórmulas con tus propios datos:</p>" +
        w("anualidad") +
        "<h5>Ahorro: el capital acumulado</h5>" +
        "<p>Si se ingresa <b>c</b> al final de cada mes durante n meses, el último ingreso no gana intereses, el penúltimo gana uno, … y el primero gana n − 1. El capital es la suma de una progresión geométrica de razón (1 + i):</p>" +
        "<div class='formula-wrap'><div class='formula'>C = c + c(1 + i) + c(1 + i)² + … + c(1 + i)ⁿ⁻¹ = " + fr("c·((1 + i)ⁿ − 1)", "i") + "</div></div>" +
        ejemplo("Un plan de ahorro", "Se ahorran 200 € al final de cada mes durante 10 años en una cuenta al 3 % anual (interés compuesto mensual). ¿Qué capital se acumula?", [
          "i = 0,03/12 = 0,0025 y n = 10·12 = 120 pagos.",
          "(1,0025)¹²⁰ ≈ 1,349354.",
          "C = 200·(1,349354 − 1)/0,0025 = 200·139,7414 ≈ <b>27.948,28 €</b>. Has aportado 24.000 € y los intereses son 3.948,28 €."
        ]) +
        "<h5>Préstamo: la cuota</h5>" +
        "<p>Un préstamo de capital C a n meses se devuelve con cuotas iguales de importe c. El valor actual de todas las cuotas debe ser el capital prestado: C = c/(1 + i) + c/(1 + i)² + … + c/(1 + i)ⁿ, una progresión geométrica de razón 1/(1 + i). Sumándola y despejando:</p>" +
        "<div class='formula-wrap'><div class='formula'>c = " + fr("C·i", "1 − (1 + i)⁻ⁿ") + "</div></div>" +
        ejemplo("Cuota de un préstamo", "Se piden 10.000 € al 6 % anual a devolver en 5 años con cuotas mensuales. Calcula la cuota y los intereses totales.", [
          "i = 0,06/12 = 0,005 y n = 60 cuotas. (1,005)⁻⁶⁰ ≈ 0,741372.",
          "c = 10.000·0,005/(1 − 0,741372) = 50/0,258628 ≈ <b>193,33 €</b> al mes.",
          "Se pagan 193,33·60 ≈ 11.599,68 €, es decir, <b>1.599,68 €</b> de intereses."
        ]) +
        "<h5>Tipo nominal y TAE</h5>" +
        "<p>Un banco que anuncia «6 % nominal con abonos mensuales» te da en realidad más del 6 %, porque cada mes los intereses ya generan intereses. La rentabilidad real de un año es la <b>TAE</b> (Tasa Anual Equivalente): TAE = (1 + r/k)ᵏ − 1, con k abonos al año. Con r = 6 % y k = 12: (1,005)¹² − 1 = 0,061678 → <b>TAE = 6,168 %</b>.</p>" +
        "<p><b>Regla del 72</b>: a un tipo anual de r %, un capital se duplica en unos 72/r años (a un 6 %, unos 12 años; exacto: log 2/log 1,06 = 11,9 años). Sale de log 2 ≈ 0,693 y de que log(1 + r/100) ≈ r/100 para r pequeño.</p>"
    },
    {
      h: "11. El número e como límite",
      html:
        "<p>En 1683 Jakob Bernoulli se preguntó: si un banco paga el 100 % anual, ¿qué pasa si en vez de pagar una vez al año se paga la mitad cada seis meses, o la cuarta parte cada trimestre, …? Con k abonos al año, 1 € se convierte en (1 + 1/k)ᵏ. Mira qué ocurre cuando k crece:</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>k = 1</td><td>(1 + 1)¹ = 2</td></tr>" +
        "<tr><td>k = 2</td><td>(1,5)² = 2,25</td></tr>" +
        "<tr><td>k = 10</td><td>(1,1)¹⁰ = 2,5937</td></tr>" +
        "<tr><td>k = 100</td><td>(1,01)¹⁰⁰ = 2,7048</td></tr>" +
        "<tr><td>k = 1.000</td><td>2,7169</td></tr>" +
        "<tr><td>k = 1.000.000</td><td>2,71828</td></tr>" +
        "</tbody></table>" +
        "<p>La sucesión aₙ = (1 + 1/n)ⁿ es <b>creciente y está acotada por 3</b>, así que (por el teorema de la sección 2) <b>converge</b>. Su límite es el número <b>e = 2,718281828…</b>, un irracional que aparece en todas partes (crecimiento de poblaciones, desintegración radiactiva, probabilidad, la función exponencial del Tema 9…). Experimenta con el capital, el tipo y el número de abonos:</p>" +
        w("capitaliza") +
        ejemplo("Capitalización continua", "Se invierten 1.000 € al 5 % anual durante 10 años. Compara el capital final con abonos anuales, mensuales y continuos.", [
          "Anual: 1.000·1,05¹⁰ = <b>1.628,89 €</b>.",
          "Mensual: 1.000·(1 + 0,05/12)¹²⁰ = <b>1.647,01 €</b>.",
          "Continua (k → ∞): el factor anual (1 + r/k)ᵏ tiende a eʳ, así que el capital es C·e<sup>rt</sup> = 1.000·e⁰·⁵ = <b>1.648,72 €</b>.",
          "Capitalizar con más frecuencia ayuda, pero con un tope: de mensual a continua solo se ganan 1,71 €."
        ]) +
        ojo("(1 + 1/n)ⁿ <b>no</b> tiende a 1 aunque 1 + 1/n → 1. Es la indeterminación «1 elevado a ∞»: la base se acerca a 1 pero el exponente crece sin parar, y el resultado intermedio es e.")
    },
    {
      h: "12. El copo de nieve de Koch: perímetro infinito, área finita",
      html:
        "<p>Parte de un triángulo equilátero de lado 1. En cada paso, a cada lado se le quita el tercio central y se pone en su lugar un triángulo equilátero «hacia fuera» sin base, es decir, dos lados nuevos de longitud 1/3 del original. Repitiendo el proceso sale una curva llamada <b>copo de nieve de Koch</b>. Es un ejemplo de <b>fractal</b> y se estudia con tres sucesiones:</p>" +
        w("koch") +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Número de lados</td><td>cada lado se convierte en 4: 3, 12, 48, … → <b>3·4ⁿ</b> (geométrica de razón 4)</td></tr>" +
        "<tr><td>Longitud de cada lado</td><td>cada lado se divide entre 3: (1/3)ⁿ</td></tr>" +
        "<tr><td>Perímetro</td><td>Pₙ = 3·4ⁿ·(1/3)ⁿ = <b>3·(4/3)ⁿ</b>: razón 4/3 &gt; 1, <b>tiende a +∞</b></td></tr>" +
        "<tr><td>Área añadida en el paso k</td><td>se añaden 3·4ᵏ⁻¹ triángulos de área A₀/9ᵏ (A₀ = √3/4 es el área inicial): una serie geométrica de razón 4/9 &lt; 1</td></tr>" +
        "</tbody></table>" +
        ejemplo("Área del copo", "Calcula el área del copo de Koch tras n pasos y el área de la figura «completa» (n → ∞), con lado inicial 1.", [
          "A₀ = √3/4 ≈ 0,4330. En el paso k se añaden 3·4ᵏ⁻¹ triángulos de área A₀/9ᵏ, es decir, A₀·(3/4)·(4/9)ᵏ.",
          "Aₙ = A₀·[1 + (3/4)·((4/9) + (4/9)² + … + (4/9)ⁿ)]. Por ejemplo A₂ = A₀·(1 + 1/3 + 4/27) = (40/27)·A₀ ≈ 0,6415.",
          "Para n → ∞, la serie geométrica de razón 4/9 vale (4/9)/(1 − 4/9) = 4/5, así que A = A₀·(1 + (3/4)·(4/5)) = A₀·(8/5) = <b>2√3/5 ≈ 0,6928</b>.",
          "Conclusión: la curva mide <b>infinito</b> pero encierra una superficie <b>finita</b> (8/5 del triángulo inicial)."
        ])
    },
    {
      h: "13. Problemas de examen resueltos",
      html:
        "<p>Los problemas de sucesiones suelen mezclar varias ideas. Mira cómo se plantea cada uno antes de operar.</p>" +
        ejemplo("Tres números en progresión aritmética", "Tres números en progresión aritmética suman 21 y su producto es 280. Hállalos.", [
          "Los llamamos a − d, a, a + d: al sumarlos desaparece d. 3a = 21 → a = 7.",
          "Producto: (7 − d)·7·(7 + d) = 7(49 − d²) = 280 → 49 − d² = 40 → d² = 9 → d = ±3.",
          "Los números son <b>4, 7, 10</b> (o 10, 7, 4). Comprobación: 4 + 7 + 10 = 21 y 4·7·10 = 280 ✓."
        ]) +
        ejemplo("Cuántos términos para superar una cantidad", "¿Cuántos términos de 3 + 6 + 12 + … hay que sumar para superar 1.000?", [
          "Geométrica con a₁ = 3 y r = 2: Sₙ = 3(2ⁿ − 1).",
          "3(2ⁿ − 1) &gt; 1.000 → 2ⁿ &gt; 334,3 → n &gt; log₂ 334,3 ≈ 8,4.",
          "S₈ = 3·255 = 765 (no llega) y S₉ = 3·511 = 1.533. Hacen falta <b>9 términos</b>."
        ]) +
        ejemplo("Una progresión aritmética y una geométrica a la vez", "Tres números en progresión aritmética suman 15. Si se les suman 1, 1 y 9 respectivamente, resultan tres números en progresión geométrica. Hállalos.", [
          "Los llamamos 5 − d, 5, 5 + d (3a = 15 → a = 5). Después de sumar: 6 − d, 6, 14 + d.",
          "Son una geométrica si el cuadrado del central es el producto de los extremos: 6² = (6 − d)(14 + d) → 36 = 84 − 8d − d² → d² + 8d − 48 = 0.",
          "d = (−8 ± √(64 + 192))/2 = (−8 ± 16)/2 → d = 4 ó d = −12.",
          "<b>Hay dos soluciones</b>: con d = 4, los números son 1, 5, 9 (y se convierten en 2, 6, 18, de razón 3); con d = −12, son 17, 5, −7 (y se convierten en 18, 6, 2, de razón 1/3)."
        ]) +
        ejemplo("Combinar suma y término", "En una progresión aritmética, S₁₀ = 120 y a₁₀ = 21. Calcula a₁ y d.", [
          "S₁₀ = 10(a₁ + a₁₀)/2 = 5(a₁ + 21) = 120 → a₁ + 21 = 24 → <b>a₁ = 3</b>.",
          "a₁₀ = a₁ + 9d → 21 = 3 + 9d → <b>d = 2</b>.",
          "Coincide con la sucesión aₙ = 2n + 1 del ejemplo de Sₙ = n² + 2n."
        ]) +
        ejemplo("Una inversión con aportaciones crecientes", "Un trabajador cobra 1.200 € al mes y cada año le suben el sueldo un 3 %. ¿Cuánto cobra en total en 10 años?", [
          "El primer año cobra 12·1.200 = 14.400 €. Cada año multiplica por 1,03: progresión geométrica con a₁ = 14.400 y r = 1,03.",
          "S₁₀ = 14.400·(1,03¹⁰ − 1)/(1,03 − 1) = 14.400·0,343916/0,03 = 14.400·11,46388…",
          "Total ≈ <b>165.079,86 €</b>."
        ]) +
        "<p>Ahora ordena los pasos de una resolución tipo y clasifica listas de números:</p>" +
        w("orden", "proc") + w("clasificar", "clasuc") + w("emparejar", "herr")
    }
  );
  nuevas[nuevas.length - 2].h = "14. ¿Qué falla aquí? Los errores que más puntos cuestan";
  nuevas[nuevas.length - 1].h = "15. Autocomprobación del tema";
  nuevas[nuevas.length - 1].html += "<p>Segunda tanda: diez preguntas sobre recurrencias, series, dinero y límites, y más tarjetas de fórmulas.</p>" + w("quiz", "quiz2") + w("tarjetas", "tj2");

  // ---------------- datos de las actividades ----------------
  datos.errores.preguntas.push(
    { q: "Dada a₁ = 3 y aₙ₊₁ = 2aₙ − 1, un alumno resuelve L = 2L − 1 → L = 1 y concluye que la sucesión converge a 1. ¿Qué falla?",
      op: ["Nada: el punto fijo siempre es el límite", "El punto fijo solo es el límite <em>si</em> la sucesión converge; aquí los términos 3, 5, 9, 17, … se alejan de 1", "Debía resolver L = 2", "Debía resolver aₙ = 0"], ok: 1,
      porque: "L = f(L) da los <em>candidatos</em> a límite. Hay que comprobar además que la sucesión converge (aquí diverge, con razón 2 en bₙ = aₙ − 1)." },
    { q: "«La serie 1 + 1/2 + 1/3 + 1/4 + … converge porque sus términos tienden a 0.»",
      op: ["Es correcto", "Falso: la serie armónica diverge; que los términos tiendan a 0 es necesario pero no suficiente", "Falso: no es una serie", "Es correcto solo si se suman 1.000 términos"], ok: 1,
      porque: "Agrupando (1/3 + 1/4), (1/5 + … + 1/8), … cada bloque supera 1/2, y hay infinitos: la suma no está acotada." },
    { q: "Sabiendo que Sₙ = n² + 1, un alumno calcula aₙ = Sₙ − Sₙ₋₁ = 2n − 1 y escribe a₁ = 1. ¿Qué falla?",
      op: ["Nada", "El primer término es a₁ = S₁ = 2; la resta Sₙ − Sₙ₋₁ solo vale para n ≥ 2", "Debía restar Sₙ₊₁", "Debía dividir entre 2"], ok: 1,
      porque: "S₀ no existe, así que a₁ = S₁ = 2 se calcula aparte. La fórmula 2n − 1 vale solo desde n = 2." },
    { q: "Para ahorrar 100 € al mes al 3 % anual, un alumno usa i = 0,03 en C = c·((1 + i)ⁿ − 1)/i con n = 12 meses. ¿Qué falla?",
      op: ["Nada", "El tipo 3 % es anual; el mensual es i = 0,03/12 = 0,0025", "Debía usar n = 1", "Debía multiplicar por 12"], ok: 1,
      porque: "Con pagos mensuales todo debe estar en meses: n = 12 pagos y tipo mensual i = r/12." },
    { q: "Un alumno afirma: «como 1 + 1/n tiende a 1, (1 + 1/n)ⁿ tiende a 1ⁿ = 1». ¿Qué falla?",
      op: ["Nada", "1^∞ es una indeterminación: la base se acerca a 1 pero el exponente crece, y el límite es e ≈ 2,718", "Debe valer 0", "Debe valer ∞"], ok: 1,
      porque: "Los valores son 2, 2,25, 2,37, … 2,718…: crecen y se acercan a e." }
  );

  datos.quiz2 = {
    titulo: "Test del tema (2): recurrencias, series y dinero",
    preguntas: [
      { q: "Dada a₁ = 5 y aₙ₊₁ = 3aₙ − 4, ¿cuánto vale a₃?",
        op: ["29", "23", "17", "31"], ok: 0,
        porque: "a₂ = 3·5 − 4 = 11 y a₃ = 3·11 − 4 = 29." },
      { q: "Si la sucesión aₙ₊₁ = (aₙ + 6)/3 converge, su límite es…",
        op: ["3", "2", "6", "no tiene límite"], ok: 0,
        porque: "L = (L + 6)/3 → 3L = L + 6 → L = 3." },
      { q: "¿Cuánto vale 4 + 2 + 1 + 1/2 + 1/4 + …?",
        op: ["6", "8", "7,5", "no existe"], ok: 1,
        porque: "a = 4 y r = 1/2: S = 4/(1 − 1/2) = 8." },
      { q: "La serie 1 + 1/2 + 1/3 + 1/4 + … (armónica)…",
        op: ["converge a 2", "converge a e", "diverge, aunque los términos tienden a 0", "es geométrica de razón 1/2"], ok: 2,
        porque: "Cada bloque (1/3 + 1/4), (1/5 + … + 1/8), … suma más de 1/2: no está acotada." },
      { q: "¿Cuánto vale 1 + 1,2 + 1,44 + 1,728 + … si se suman infinitos términos?",
        op: ["6", "5", "1,2", "no existe (diverge)"], ok: 3,
        porque: "La razón es r = 1,2 &gt; 1: los términos crecen y la suma no se estabiliza." },
      { q: "Se ahorran 100 € al final de cada mes durante 12 meses con un tipo mensual del 1 %. El capital final es…",
        op: ["1.268,25 €", "1.200,00 €", "1.126,83 €", "1.282,60 €"], ok: 0,
        porque: "C = 100·(1,01¹² − 1)/0,01 = 100·12,6825 = 1.268,25 €." },
      { q: "El límite de (1 + 1/n)ⁿ cuando n crece es…",
        op: ["1", "e ≈ 2,718", "+∞", "0"], ok: 1,
        porque: "Es la definición del número e: 1^∞ es una indeterminación y los valores 2, 2,25, 2,37, … se acercan a 2,718…" },
      { q: "En el copo de Koch con lado inicial 1, el perímetro tras n pasos es…",
        op: ["3·(4/3)ⁿ", "3·4ⁿ", "3·(1/3)ⁿ", "3 + 4n"], ok: 0,
        porque: "Hay 3·4ⁿ lados de longitud (1/3)ⁿ: 3·4ⁿ/3ⁿ = 3·(4/3)ⁿ → +∞." },
      { q: "Si Sₙ = n² + 1, ¿cómo es la sucesión aₙ?",
        op: ["No es aritmética: a₁ = 2 y aₙ = 2n − 1 si n ≥ 2", "Aritmética con d = 2", "Geométrica de razón 2", "aₙ = n² + 1"], ok: 0,
        porque: "a₁ = S₁ = 2, pero para n ≥ 2 aₙ = Sₙ − Sₙ₋₁ = 2n − 1, que daría 1 en n = 1: 2, 3, 5, 7… no es aritmética." },
      { q: "El límite de (3n² + 1)/(n² − n) es…",
        op: ["3", "0", "+∞", "1/3"], ok: 0,
        porque: "Mismo grado: cociente de los coeficientes principales, 3/1 = 3." }
    ]
  };

  datos.tj2 = {
    titulo: "Más fórmulas de sucesiones",
    cartas: [
      { a: "Recurrencia aₙ₊₁ = f(aₙ): ¿cómo se calcula el posible límite?", b: "Resolviendo L = f(L) (punto fijo). Solo vale si la sucesión realmente converge." },
      { a: "aₙ₊₁ = p·aₙ + q con p ≠ 1: ¿cómo se resuelve?", b: "Con L = q/(1 − p), bₙ = aₙ − L es geométrica de razón p: aₙ = L + (a₁ − L)·pⁿ⁻¹." },
      { a: "Hallar aₙ conociendo la suma Sₙ", b: "a₁ = S₁ y aₙ = Sₙ − Sₙ₋₁ para n ≥ 2. Comprueba si la fórmula vale en n = 1." },
      { a: "Suma de los n primeros impares", b: "1 + 3 + 5 + … + (2n − 1) = n²" },
      { a: "Una serie converge cuando…", b: "las sumas parciales Sₙ se acercan a un número. Necesario: aₙ → 0 (pero no es suficiente)." },
      { a: "Serie armónica 1 + 1/2 + 1/3 + …", b: "Diverge, aunque aₙ → 0." },
      { a: "Ahorro: c al final de cada mes", b: "C = c·((1 + i)ⁿ − 1)/i, con i = r/12 y n = meses." },
      { a: "Préstamo: cuota mensual", b: "c = C·i/(1 − (1 + i)⁻ⁿ), con i = r/12 y n = meses." },
      { a: "TAE", b: "TAE = (1 + r/k)ᵏ − 1, con k abonos al año. Es mayor que el nominal r." },
      { a: "El número e", b: "e = lím (1 + 1/n)ⁿ = 2,71828… Capitalización continua: C·eʳᵗ." },
      { a: "Copo de Koch (lado inicial 1)", b: "Lados 3·4ⁿ; perímetro 3·(4/3)ⁿ → ∞; área → 2√3/5 ≈ 0,693 (finita)." },
      { a: "Límite de un cociente de polinomios en n", b: "Grado menor: 0. Mismo grado: cociente de coeficientes principales. Grado mayor: ±∞." },
      { a: "Definición de aₙ → L", b: "Para cada ε &gt; 0 existe N tal que |aₙ − L| &lt; ε si n ≥ N." }
    ]
  };

  datos.clasuc = {
    titulo: "¿Qué tipo de sucesión es?",
    consigna: "Toca una sucesión y después el tipo al que pertenece.",
    categorias: ["Aritmética (diferencia constante)", "Geométrica (cociente constante)", "Ninguna de las dos"],
    items: [
      { t: "7, 4, 1, −2, −5, …", c: 0 }, { t: "−3, 0, 3, 6, 9, …", c: 0 }, { t: "aₙ = 4n − 1", c: 0 }, { t: "0,5; 1; 1,5; 2; …", c: 0 },
      { t: "2, 6, 18, 54, …", c: 1 }, { t: "100, 50, 25, 12,5, …", c: 1 }, { t: "aₙ = 3·2ⁿ", c: 1 }, { t: "aₙ = 5·(−1)ⁿ", c: 1 },
      { t: "1, 4, 9, 16, 25, …", c: 2 }, { t: "1, 1, 2, 3, 5, 8, …", c: 2 }, { t: "aₙ = n² + n", c: 2 }, { t: "1, 1/2, 1/3, 1/4, …", c: 2 }
    ]
  };

  datos.herr = {
    titulo: "Cada problema con su herramienta",
    consigna: "Une cada situación con la fórmula o el método que la resuelve.",
    pares: [
      ["Sumar los múltiplos de 7 entre 100 y 500", "Progresión aritmética: Sₙ = n(a₁ + aₙ)/2"],
      ["Capital con interés compuesto anual", "Progresión geométrica: C·(1 + r/100)ⁿ"],
      ["Distancia total de una pelota que rebota", "Serie geométrica: a/(1 − r)"],
      ["Ahorrar una cantidad fija cada mes", "Suma geométrica: c((1 + i)ⁿ − 1)/i"],
      ["Cuota de un préstamo", "c = C·i/(1 − (1 + i)⁻ⁿ)"],
      ["Aproximar √2 paso a paso", "Recurrencia de Herón: (aₙ + 2/aₙ)/2"],
      ["Hallar aₙ conociendo Sₙ", "aₙ = Sₙ − Sₙ₋₁ (n ≥ 2) y a₁ = S₁"]
    ]
  };

  datos.proc = {
    titulo: "Resolver: tres números en progresión aritmética suman 21 y su producto es 280",
    consigna: "Ordena los pasos de la resolución.",
    items: [
      { t: "Llamar a − d, a y a + d a los tres números", nota: "Con esta elección, al sumar desaparece d." },
      { t: "Sumar: 3a = 21 → a = 7" },
      { t: "Multiplicar: (7 − d)·7·(7 + d) = 280 → 7(49 − d²) = 280", nota: "Suma por diferencia: (7 − d)(7 + d) = 49 − d²." },
      { t: "Despejar: 49 − d² = 40 → d² = 9 → d = ±3" },
      { t: "Escribir los números: 4, 7 y 10 (o 10, 7 y 4)" },
      { t: "Comprobar: 4 + 7 + 10 = 21 y 4·7·10 = 280", nota: "Una comprobación rápida detecta errores de signo." }
    ]
  };

  // ---------------- ejercicios nuevos (s23–s59) ----------------
  ejercicios.push(
    // ---------- ★ ----------
    { id: "s23", nivel: 1,
      enunciado: "Halla el término general de la sucesión 2, −4, 6, −8, 10, …",
      check: { tipo: "expr", etiqueta: "aₙ =", expr: "(-1)^(n+1)*2*n", enteros: true, ph: "usa la letra n, por ejemplo 3n-1" },
      pistas: ["Sin signos, los valores 2, 4, 6, 8, … son 2n.", "El primero es positivo y luego alternan: (−1)ⁿ⁺¹."],
      pasos: ["Valores absolutos: 2n.", "Signo: + − + − …, que es (−1)ⁿ⁺¹ (+1 si n es impar).", "aₙ = (−1)ⁿ⁺¹·2n. Comprobación: a₃ = (+1)·6 = 6 ✓."],
      resultado: "aₙ = (−1)ⁿ⁺¹·2n" },
    { id: "s24", nivel: 1,
      enunciado: "Se define a₁ = 3 y aₙ₊₁ = 2aₙ − 1. Calcula a₅.",
      check: { tipo: "num", etiqueta: "a₅ =", valor: 33 },
      pistas: ["Calcula los términos uno a uno."],
      pasos: ["a₂ = 2·3 − 1 = 5.", "a₃ = 2·5 − 1 = 9.", "a₄ = 2·9 − 1 = 17.", "a₅ = 2·17 − 1 = 33 (que coincide con aₙ = 2ⁿ + 1)."],
      resultado: "a₅ = 33" },
    { id: "s25", nivel: 1,
      enunciado: "Se define a₁ = 10 y aₙ₊₁ = (aₙ + 2)/2, y la sucesión converge. ¿Cuál es su límite?",
      check: { tipo: "num", etiqueta: "L =", valor: 2 },
      pistas: ["El límite L cumple L = f(L)."],
      pasos: ["L = (L + 2)/2 → 2L = L + 2 → L = 2.", "Los términos 10, 6, 4, 3, 2,5, … se acercan a 2."],
      resultado: "L = 2" },
    { id: "s26", nivel: 1,
      enunciado: "Se intercalan 3 números entre 2 y 18 para que los 5 formen una progresión aritmética. Calcula la diferencia d.",
      check: { tipo: "num", etiqueta: "d =", valor: 4 },
      pistas: ["d = (b − a)/(k + 1) con k = 3."],
      pasos: ["d = (18 − 2)/(3 + 1) = 16/4 = 4.", "La progresión es 2, 6, 10, 14, 18."],
      resultado: "d = 4" },
    { id: "s27", nivel: 1,
      enunciado: "Se intercalan 2 números entre 3 y 24 para que los 4 formen una progresión geométrica. Calcula la razón r.",
      check: { tipo: "num", etiqueta: "r =", valor: 2 },
      pistas: ["r = (b/a)<sup>1/(k+1)</sup> con k = 2."],
      pasos: ["r = (24/3)<sup>1/3</sup> = 8<sup>1/3</sup> = 2.", "La progresión es 3, 6, 12, 24."],
      resultado: "r = 2" },
    { id: "s28", nivel: 1,
      enunciado: "Calcula la suma infinita 12 + 4 + 4/3 + 4/9 + …",
      check: { tipo: "num", etiqueta: "S =", valor: 18 },
      pistas: ["Es una serie geométrica: calcula primero la razón."],
      pasos: ["r = 4/12 = 1/3 (|r| &lt; 1).", "S = 12/(1 − 1/3) = 12/(2/3) = 18."],
      resultado: "S = 18" },
    { id: "s29", nivel: 1,
      enunciado: "Escribe 0,181818… (el 18 se repite) como suma de una serie geométrica y da su valor como fracción irreducible.",
      check: { tipo: "num", etiqueta: "Valor =", valor: 2 / 11, tol: 0.001, ph: "p/q" },
      pistas: ["0,1818… = 0,18 + 0,0018 + 0,000018 + …", "a = 0,18 y r = 0,01."],
      pasos: ["a = 0,18 y r = 0,01.", "S = 0,18/(1 − 0,01) = 0,18/0,99 = 18/99 = 2/11."],
      resultado: "2/11" },
    // ---------- ★★ ----------
    { id: "s30", nivel: 2,
      enunciado: "La suma de los n primeros términos de una sucesión es Sₙ = n² + 2n. Calcula a₁₀.",
      check: { tipo: "num", etiqueta: "a₁₀ =", valor: 21 },
      pistas: ["aₙ = Sₙ − Sₙ₋₁."],
      pasos: ["S₁₀ = 100 + 20 = 120 y S₉ = 81 + 18 = 99.", "a₁₀ = S₁₀ − S₉ = 21.", "En general aₙ = 2n + 1."],
      resultado: "a₁₀ = 21" },
    { id: "s31", nivel: 2,
      enunciado: "En una progresión geométrica a₂ = 6 y a₅ = 162. Calcula la razón, el primer término y a₈.",
      check: [{ tipo: "num", etiqueta: "r =", valor: 3 }, { tipo: "num", etiqueta: "a₁ =", valor: 2 }, { tipo: "num", etiqueta: "a₈ =", valor: 4374 }],
      pistas: ["De a₂ a a₅ hay 3 pasos: a₅ = a₂·r³."],
      pasos: ["162 = 6·r³ → r³ = 27 → r = 3.", "a₂ = a₁·r → 6 = 3a₁ → a₁ = 2.", "a₈ = 2·3⁷ = 2·2187 = 4374."],
      resultado: "r = 3, a₁ = 2, a₈ = 4374" },
    { id: "s32", nivel: 2,
      enunciado: "La suma de los n primeros términos de una sucesión es Sₙ = 3n² − 2n. Halla su término general aₙ.",
      check: { tipo: "expr", etiqueta: "aₙ =", expr: "6n-5", ph: "usa la letra n" },
      pistas: ["a₁ = S₁ y aₙ = Sₙ − Sₙ₋₁. Comprueba si vale también para n = 1."],
      pasos: ["a₁ = S₁ = 1.", "aₙ = 3n² − 2n − [3(n−1)² − 2(n−1)] = 6n − 5.", "Con n = 1 da 1 = a₁ ✓: vale para todo n."],
      resultado: "aₙ = 6n − 5" },
    { id: "s33", nivel: 2,
      enunciado: "Una progresión geométrica tiene a₁ = 4 y la suma de todos sus términos es 12. Calcula la razón.",
      check: { tipo: "num", etiqueta: "r =", valor: 2 / 3, tol: 0.001, ph: "p/q" },
      pistas: ["S = a₁/(1 − r)."],
      pasos: ["12 = 4/(1 − r) → 1 − r = 4/12 = 1/3.", "r = 2/3 (y |r| &lt; 1: la suma existe)."],
      resultado: "r = 2/3" },
    { id: "s34", nivel: 2,
      enunciado: "La suma de los n primeros términos de una progresión aritmética es Sₙ = n(2n + 1). ¿Cuál es el menor valor de n para el que Sₙ supera 1.000?",
      check: { tipo: "num", etiqueta: "n =", valor: 23 },
      pistas: ["Resuelve 2n² + n &gt; 1000 y prueba con enteros cercanos."],
      pasos: ["2n² + n − 1000 &gt; 0 → n &gt; (−1 + √8001)/4 ≈ 22,1.", "S₂₂ = 22·45 = 990 (no llega) y S₂₃ = 23·47 = 1.081 (supera).", "n = 23."],
      resultado: "n = 23" },
    { id: "s35", nivel: 2,
      enunciado: "Un anfiteatro tiene 20 filas: la primera tiene 15 asientos y cada fila tiene 2 más que la anterior. ¿Cuántos asientos hay en total?",
      check: { tipo: "num", etiqueta: "Asientos =", valor: 680 },
      pistas: ["Progresión aritmética con a₁ = 15, d = 2."],
      pasos: ["a₂₀ = 15 + 19·2 = 53.", "S₂₀ = 20·(15 + 53)/2 = 680."],
      resultado: "680 asientos" },
    { id: "s36", nivel: 2,
      enunciado: "Alguien ahorra 5 € la primera semana y cada semana 2 € más que la anterior. ¿En qué semana supera por primera vez los 500 € acumulados?",
      check: { tipo: "num", etiqueta: "Semana =", valor: 21 },
      pistas: ["Sₙ = n(2·5 + (n − 1)·2)/2 = n² + 4n."],
      pasos: ["n² + 4n &gt; 500 → n &gt; −2 + √504 ≈ 20,45.", "S₂₀ = 480 y S₂₁ = 525.", "Semana 21."],
      resultado: "semana 21" },
    { id: "s37", nivel: 2,
      enunciado: "Un folio de 0,1 mm de grosor se dobla por la mitad una y otra vez. ¿Cuántos dobleces hacen falta para superar la distancia de la Tierra a la Luna, 384.400 km? (Experimento mental.)",
      check: { tipo: "num", etiqueta: "Dobleces =", valor: 42 },
      pistas: ["Grosor tras n dobleces: 0,1·2ⁿ mm. 1 km = 10⁶ mm."],
      pasos: ["Hay que lograr 0,1·2ⁿ &gt; 3,844·10¹¹ mm → 2ⁿ &gt; 3,844·10¹².", "log₂(3,844·10¹²) ≈ 41,8.", "Con 41 dobleces: 219.902 km. Con 42: 439.805 km. Hacen falta 42."],
      resultado: "42 dobleces" },
    { id: "s38", nivel: 2,
      enunciado: "Una muestra de 500 g de una sustancia pierde el 10 % de su masa cada hora. ¿Cuántos gramos quedan después de 6 horas?",
      check: { tipo: "num", etiqueta: "Masa =", valor: 265.72, unidad: "g", tol: 0.0005 },
      pistas: ["Perder el 10 % es multiplicar por 0,9."],
      pasos: ["m₆ = 500·0,9⁶ = 500·0,531441 = 265,72 g."],
      resultado: "≈ 265,72 g" },
    { id: "s39", nivel: 2,
      enunciado: "Aquiles corre a 10 m/s y una tortuga a 1 m/s, con 100 m de ventaja. Suma la serie de los tiempos de las etapas (10 + 1 + 0,1 + …) y da el instante, en segundos, en que Aquiles alcanza a la tortuga.",
      check: { tipo: "num", etiqueta: "t =", valor: 100 / 9, unidad: "s", tol: 0.001 },
      pistas: ["Serie geométrica con a = 10 y r = 0,1."],
      pasos: ["S = 10/(1 − 0,1) = 100/9 ≈ 11,11 s.", "Comprobación: 10t = 100 + t → t = 100/9."],
      resultado: "≈ 11,11 s" },
    { id: "s40", nivel: 2,
      enunciado: "Estudia la sucesión aₙ = n/(n² + 1).",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["decreciente y acotada: 0 < aₙ ≤ 1/2", "creciente y acotada", "decreciente y no acotada", "no monótona"], ok: 0 },
      pistas: ["Calcula aₙ₊₁ − aₙ: el numerador sale −n² − n + 1."],
      pasos: ["aₙ₊₁ − aₙ = (−n² − n + 1)/(((n+1)² + 1)(n² + 1)) &lt; 0 para n ≥ 1.", "Decreciente: 1/2, 2/5, 3/10, … y positiva: 0 &lt; aₙ ≤ a₁ = 1/2."],
      resultado: "decreciente y acotada" },
    { id: "s41", nivel: 2,
      enunciado: "Estudia aₙ = n² − 6n: ¿para qué valor de n alcanza su mínimo y cuánto vale ese mínimo?",
      check: [{ tipo: "num", etiqueta: "n =", valor: 3 }, { tipo: "num", etiqueta: "mínimo =", valor: -9 }],
      pistas: ["aₙ₊₁ − aₙ = 2n − 5: mira dónde cambia de signo."],
      pasos: ["Es negativa para n = 1, 2 y positiva desde n = 3.", "Los términos son −5, −8, −9, −8, −5, …: el mínimo es a₃ = 9 − 18 = −9."],
      resultado: "n = 3, mínimo −9" },
    { id: "s42", nivel: 2,
      enunciado: "Calcula el límite de la sucesión aₙ = (3n² − 2n + 1)/(n² + 5).",
      check: { tipo: "num", etiqueta: "límite =", valor: 3 },
      pistas: ["Divide numerador y denominador entre n²."],
      pasos: ["(3 − 2/n + 1/n²)/(1 + 5/n²) → 3/1 = 3."],
      resultado: "3" },
    { id: "s43", nivel: 2,
      enunciado: "¿Cuál de estas sucesiones converge a 0?",
      check: { tipo: "opcion", etiqueta: "Converge a 0", opciones: ["(n² + 1)/n³", "(n² + 1)/n²", "(n³ + 1)/n²", "(−1)ⁿ"], ok: 0 },
      pistas: ["Compara los grados del numerador y del denominador."],
      pasos: ["(n² + 1)/n³: grado 2 &lt; 3 → tiende a 0.", "(n² + 1)/n² → 1; (n³ + 1)/n² → +∞; (−1)ⁿ oscila entre −1 y 1."],
      resultado: "(n² + 1)/n³" },
    // ---------- ★★★ ----------
    { id: "s44", nivel: 3,
      enunciado: "Tres números en progresión aritmética suman 15. Si se les suman 1, 1 y 9 respectivamente, resultan tres números en progresión geométrica. Halla los tres números originales de la solución con diferencia positiva.",
      check: { tipo: "lista", etiqueta: "números =", valores: [1, 5, 9], ph: "tres valores separados por comas" },
      pistas: ["Llámalos 5 − d, 5, 5 + d.", "Tras sumar: 6 − d, 6, 14 + d. Impón 6² = (6 − d)(14 + d)."],
      pasos: ["a = 5. Los transformados son 6 − d, 6, 14 + d.", "36 = (6 − d)(14 + d) = 84 − 8d − d² → d² + 8d − 48 = 0 → d = 4 ó d = −12.", "Con d = 4: 1, 5, 9 (→ 2, 6, 18, razón 3). Con d = −12: 17, 5, −7 (→ 18, 6, 2, razón 1/3)."],
      resultado: "1, 5 y 9 (la otra solución es 17, 5, −7)" },
    { id: "s45", nivel: 3,
      enunciado: "Se ahorran 200 € al final de cada mes durante 10 años en una cuenta al 3 % anual con interés compuesto mensual. ¿Qué capital se acumula?",
      check: { tipo: "num", etiqueta: "Capital =", valor: 27948.28, unidad: "€", tol: 0.0005 },
      pistas: ["i = 0,03/12 = 0,0025 y n = 120.", "C = c·((1 + i)ⁿ − 1)/i."],
      pasos: ["(1,0025)¹²⁰ ≈ 1,349354.", "C = 200·0,349354/0,0025 ≈ 27.948,28 €."],
      resultado: "≈ 27.948,28 €" },
    { id: "s46", nivel: 3,
      enunciado: "Se piden 10.000 € al 6 % anual para devolverlos en 5 años con cuotas mensuales iguales. ¿Cuánto vale cada cuota?",
      check: { tipo: "num", etiqueta: "Cuota =", valor: 193.33, unidad: "€", tol: 0.0005 },
      pistas: ["i = 0,06/12 = 0,005 y n = 60.", "c = C·i/(1 − (1 + i)⁻ⁿ)."],
      pasos: ["(1,005)⁻⁶⁰ ≈ 0,741372.", "c = 10.000·0,005/(1 − 0,741372) = 50/0,258628 ≈ 193,33 €."],
      resultado: "≈ 193,33 €" },
    { id: "s47", nivel: 3,
      enunciado: "En el copo de Koch con lado inicial 1, calcula el perímetro tras 3 pasos y el número de lados tras 4 pasos.",
      check: [{ tipo: "num", etiqueta: "perímetro (n = 3) =", valor: 64 / 9, tol: 0.001 }, { tipo: "num", etiqueta: "lados (n = 4) =", valor: 768 }],
      pistas: ["Lados: 3·4ⁿ. Perímetro: 3·(4/3)ⁿ."],
      pasos: ["P₃ = 3·(4/3)³ = 3·64/27 = 64/9 ≈ 7,111.", "Lados con n = 4: 3·4⁴ = 3·256 = 768."],
      resultado: "P₃ = 64/9 ≈ 7,111 · 768 lados" },
    { id: "s48", nivel: 3,
      enunciado: "Un banco ofrece un 6 % nominal anual con abonos mensuales. Calcula la TAE, en %, con dos decimales.",
      check: { tipo: "num", etiqueta: "TAE =", valor: 6.1678, unidad: "%", tol: 0.002 },
      pistas: ["TAE = (1 + r/k)ᵏ − 1 con k = 12."],
      pasos: ["(1 + 0,06/12)¹² = 1,005¹² = 1,061678.", "TAE = 0,061678 = 6,17 %."],
      resultado: "TAE ≈ 6,17 %" },
    { id: "s49", nivel: 3,
      enunciado: "Aplica el método de Herón a₁ = 1, aₙ₊₁ = (aₙ + 2/aₙ)/2 y calcula a₄ con 5 decimales.",
      check: { tipo: "num", etiqueta: "a₄ =", valor: 1.41422, tol: 0.0001 },
      pistas: ["a₂ = 1,5; a₃ = 17/12."],
      pasos: ["a₂ = (1 + 2)/2 = 1,5.", "a₃ = (1,5 + 2/1,5)/2 = 17/12 ≈ 1,416667.", "a₄ = (17/12 + 24/17)/2 = 577/408 ≈ 1,41422 (√2 ≈ 1,41421)."],
      resultado: "a₄ = 577/408 ≈ 1,41422" },
    { id: "s50", nivel: 3,
      enunciado: "La sucesión de Fibonacci empieza con 1, 1, 2, 3, 5, … (cada término es la suma de los dos anteriores). Calcula a₂₀.",
      check: { tipo: "num", etiqueta: "a₂₀ =", valor: 6765 },
      pistas: ["Sigue la lista: …, 34, 55, 89, 144, …"],
      pasos: ["1, 1, 2, 3, 5, 8, 13, 21, 34, 55 (a₁₀), 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765 (a₂₀)."],
      resultado: "a₂₀ = 6765" },
    { id: "s51", nivel: 3,
      enunciado: "Calcula la suma de la serie 1/8 + 1/16 + 1/32 + 1/64 + … (los términos son (1/2)ᵏ desde k = 3).",
      check: { tipo: "num", etiqueta: "S =", valor: 0.25, ph: "p/q o decimal" },
      pistas: ["El primer término que sumas es a = 1/8 y la razón es 1/2."],
      pasos: ["S = (1/8)/(1 − 1/2) = (1/8)/(1/2) = 1/4."],
      resultado: "S = 1/4" },
    { id: "s52", nivel: 3,
      enunciado: "Se invierten 1.000 € al 5 % anual con capitalización continua durante 10 años. ¿Qué capital se obtiene? (Usa C·e<sup>rt</sup>.)",
      check: { tipo: "num", etiqueta: "Capital =", valor: 1648.72, unidad: "€", tol: 0.0005 },
      pistas: ["C·e<sup>rt</sup> con r = 0,05 y t = 10."],
      pasos: ["1.000·e⁰·⁵ = 1.000·1,648721 = 1.648,72 €.", "(Frente a 1.628,89 € con abonos anuales y 1.647,01 € con abonos mensuales.)"],
      resultado: "≈ 1.648,72 €" },
    { id: "s53", nivel: 3,
      enunciado: "¿Cuál de estas series converge?",
      check: { tipo: "opcion", etiqueta: "Converge", opciones: ["1 + 1/2 + 1/3 + 1/4 + …", "1 + 0,9 + 0,81 + 0,729 + …", "1 + 1 + 1 + 1 + …", "1 − 2 + 4 − 8 + …"], ok: 1 },
      pistas: ["Mira la razón de las geométricas y recuerda la armónica."],
      pasos: ["La primera es la armónica: diverge. La segunda es geométrica con r = 0,9 &lt; 1: suma 1/(1 − 0,9) = 10.", "La tercera tiene r = 1 y la cuarta r = −2: ambas divergen."],
      resultado: "1 + 0,9 + 0,81 + … (suma 10)" },
    { id: "s54", nivel: 3,
      enunciado: "La sucesión a₁ = 1, aₙ₊₁ = 1 + 1/aₙ converge. Calcula su límite con 3 decimales.",
      check: { tipo: "num", etiqueta: "L =", valor: 1.618, tol: 0.001 },
      pistas: ["L = 1 + 1/L → L² = L + 1 (y L &gt; 0)."],
      pasos: ["L² − L − 1 = 0 → L = (1 ± √5)/2.", "Los términos son positivos: L = (1 + √5)/2 ≈ 1,618 (el número áureo)."],
      resultado: "L = (1 + √5)/2 ≈ 1,618" },
    { id: "s55", nivel: 3,
      enunciado: "¿Cuántos términos de la progresión 3 + 6 + 12 + … hay que sumar como mínimo para superar 1.000?",
      check: { tipo: "num", etiqueta: "n =", valor: 9 },
      pistas: ["Sₙ = 3(2ⁿ − 1)."],
      pasos: ["3(2ⁿ − 1) &gt; 1000 → 2ⁿ &gt; 334,3 → n ≥ 9.", "S₈ = 765 y S₉ = 1.533."],
      resultado: "n = 9" },
    { id: "s56", nivel: 3,
      enunciado: "Un trabajador cobra 1.200 € al mes y cada año le suben el sueldo un 3 %. ¿Cuánto cobra en total en 10 años? (Redondea a euros.)",
      check: { tipo: "num", etiqueta: "Total =", valor: 165079.86, unidad: "€", tol: 0.0005 },
      pistas: ["El primer año cobra 14.400 € y cada año multiplica por 1,03."],
      pasos: ["Geométrica con a₁ = 14.400, r = 1,03 y n = 10.", "S₁₀ = 14.400·(1,03¹⁰ − 1)/0,03 = 14.400·11,46388 ≈ 165.079,86 €."],
      resultado: "≈ 165.080 €" },
    { id: "s57", nivel: 3,
      enunciado: "Demuestra la fórmula Sₙ = n·(a₁ + aₙ)/2 de la suma de los n primeros términos de una progresión aritmética (el truco de Gauss).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe Sₙ = a₁ + a₂ + … + aₙ y, debajo, la misma suma en orden inverso: Sₙ = aₙ + aₙ₋₁ + … + a₁", p: 0.5 },
        { t: "Suma las dos igualdades columna a columna: 2Sₙ = (a₁ + aₙ) + (a₂ + aₙ₋₁) + … + (aₙ + a₁)", p: 0.5 },
        { t: "Justifica que todas las parejas valen lo mismo: a₁ + aₙ = a₂ + aₙ₋₁ = … (al avanzar un lugar se suma d en un lado y se resta d en el otro)", p: 0.5 },
        { t: "Hay n parejas iguales: 2Sₙ = n·(a₁ + aₙ), y por tanto Sₙ = n·(a₁ + aₙ)/2", p: 0.5 }
      ] },
      pasos: ["Sₙ = a₁ + a₂ + … + aₙ y Sₙ = aₙ + aₙ₋₁ + … + a₁.", "Al sumar, cada columna da a₁ + aₙ, a₂ + aₙ₋₁ = (a₁ + d) + (aₙ − d) = a₁ + aₙ, …: todas iguales.", "Hay n columnas: 2Sₙ = n(a₁ + aₙ) → Sₙ = n(a₁ + aₙ)/2."],
      resultado: "Sₙ = n(a₁ + aₙ)/2" },
    { id: "s58", nivel: 3,
      enunciado: "Demuestra que la suma de los n primeros números impares es n²: 1 + 3 + 5 + … + (2n − 1) = n².",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Reconoce que los impares forman una progresión aritmética con a₁ = 1, d = 2 y aₙ = 2n − 1", p: 0.5 },
        { t: "Aplica Sₙ = n(a₁ + aₙ)/2 = n(1 + 2n − 1)/2", p: 0.5 },
        { t: "Simplifica: n·2n/2 = n²", p: 0.5 },
        { t: "(Opcional) Comprueba con n = 4: 1 + 3 + 5 + 7 = 16 = 4²", p: 0.5 }
      ] },
      pasos: ["Los impares: 1, 3, 5, … con a₁ = 1, d = 2, aₙ = 1 + (n − 1)·2 = 2n − 1.", "Sₙ = n(1 + 2n − 1)/2 = n·2n/2 = n².", "Geométricamente: cada impar es una «L» de casillas que completa el cuadrado siguiente."],
      resultado: "Sₙ = n²" },
    { id: "s59", nivel: 3,
      enunciado: "Demuestra que la serie armónica 1 + 1/2 + 1/3 + 1/4 + … diverge (agrupando los términos).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Agrupa los términos en bloques: 1 + 1/2 + (1/3 + 1/4) + (1/5 + … + 1/8) + (1/9 + … + 1/16) + …", p: 0.5 },
        { t: "Acota cada bloque por debajo: 1/3 + 1/4 &gt; 1/4 + 1/4 = 1/2; 1/5 + … + 1/8 &gt; 4·(1/8) = 1/2; y en general el bloque de 2ᵏ términos supera 1/2", p: 0.5 },
        { t: "Concluye que la suma es mayor que 1 + 1/2 + 1/2 + 1/2 + … (infinitos medios), que supera cualquier número", p: 0.5 },
        { t: "Por tanto las sumas parciales no están acotadas y la serie diverge, aunque los términos tiendan a 0", p: 0.5 }
      ] },
      pasos: ["Se forman bloques de 2, 4, 8, … términos.", "En cada bloque, todos los términos son al menos tan grandes como el último, y por eso el bloque suma más de (número de términos)·(último) = 1/2.", "Con infinitos bloques, S &gt; 1 + 1/2 + 1/2 + … = ∞."],
      resultado: "la serie armónica diverge" }
  );

  // ---------------- láminas nuevas ----------------
  lamina.push(
    { titulo: "Recurrencias y series",
      items: [
        { label: "Punto fijo", formula: "L = f(L)", cuando: "Si aₙ₊₁ = f(aₙ) converge, su límite cumple esta ecuación.", ejemplo: "aₙ₊₁ = (aₙ + 2)/2 → L = 2", ojo: "No garantiza la convergencia: aₙ₊₁ = 2aₙ − 1 se aleja de L = 1." },
        { label: "Lineal aₙ₊₁ = p·aₙ + q", formula: "bₙ = aₙ − L, L = q/(1 − p)", cuando: "bₙ es geométrica de razón p: aₙ = L + (a₁ − L)·pⁿ⁻¹.", ejemplo: "a₁ = 3, aₙ₊₁ = 2aₙ − 1 → aₙ = 2ⁿ + 1" },
        { label: "Serie geométrica", formula: "S = " + fr("a", "1 − r"), cuando: "Solo si |r| &lt; 1.", ejemplo: "0,999… = 0,9/(1 − 0,1) = 1" },
        { label: "Serie armónica", formula: "1 + 1/2 + 1/3 + … = ∞", ojo: "Los términos tienden a 0 y aun así diverge." }
      ] },
    { titulo: "De Sₙ a aₙ",
      pasos: ["a₁ = S₁.", "aₙ = Sₙ − Sₙ₋₁ para n ≥ 2.", "Comprueba si la fórmula obtenida vale para n = 1.", "Sₙ = A·n² + B·n (sin término independiente) → aritmética con d = 2A y a₁ = A + B."],
      nota: "Ejemplo: Sₙ = 3n² − 2n → aₙ = 6n − 5. Pero Sₙ = n² + 1 da a₁ = 2 y aₙ = 2n − 1 (n ≥ 2): no es aritmética." },
    { titulo: "Dinero: ahorro, préstamo y TAE", ancha: true,
      tabla: { cab: ["Situación", "Fórmula", "Datos (pagos mensuales)"], filas: [
        ["Capital con interés compuesto", "C·(1 + i)ⁿ", "i = r/12, n en meses"],
        ["Ahorro de c cada mes", "C = c·((1 + i)ⁿ − 1)/i", "200 €/mes, 3 %, 10 años → 27.948,28 €"],
        ["Cuota de un préstamo", "c = C·i/(1 − (1 + i)⁻ⁿ)", "10.000 €, 6 %, 5 años → 193,33 €"],
        ["TAE", "(1 + r/k)ᵏ − 1", "6 % nominal mensual → 6,168 %"],
        ["Capitalización continua", "C·e<sup>rt</sup>", "1.000 €, 5 %, 10 años → 1.648,72 €"]
      ] },
      nota: "Regla del 72: a un r % anual el capital se duplica en unos 72/r años." },
    { titulo: "El número e y el copo de Koch",
      items: [
        { label: "Número e", formula: "e = lím (1 + 1/n)ⁿ = 2,71828…", ojo: "1 + 1/n → 1 pero (1 + 1/n)ⁿ → e (indeterminación 1^∞)." },
        { label: "Copo de Koch (lado 1)", formula: "lados 3·4ⁿ · perímetro 3·(4/3)ⁿ → ∞", ejemplo: "área → 2√3/5 ≈ 0,693 (finita)" }
      ] },
    { titulo: "Límite de una sucesión", ancha: true,
      tabla: { cab: ["Cociente de polinomios en n", "Límite", "Ejemplo"], filas: [
        ["grado num &lt; grado den", "0", "(n² + 1)/n³ → 0"],
        ["grado num = grado den", "cociente de coeficientes principales", "(5n − 1)/(2n + 3) → 5/2"],
        ["grado num &gt; grado den", "±∞ (diverge)", "(2n³ + n)/(n + 1) → +∞"]
      ] },
      nota: "aₙ → L significa: para cada ε &gt; 0 hay un N tal que |aₙ − L| &lt; ε si n ≥ N." }
  );

  B.registrar("mates1", "t2", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
