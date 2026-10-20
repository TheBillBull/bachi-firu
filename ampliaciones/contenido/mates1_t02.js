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

  B.registrar("mates1", "t2", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
