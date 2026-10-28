/* ============================================================
   Matemáticas II · ampliaciones · Tema 7: Límites de funciones y continuidad
   (parte B: secciones nuevas 7–14)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t7/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Cómo resolver cada indeterminación",
      html:
        "<p>Ante un límite, el método es siempre el mismo: <b>1) sustituir</b>; <b>2) si sale un número o ±∞ claro, terminar</b>; <b>3) si sale una indeterminación, identificar cuál es y aplicar su técnica</b>. La tabla resume qué hacer en cada caso; después tienes un ejemplo de cada una.</p>" +
        tabla(["Indeterminación", "Dónde aparece", "Técnica"], [
          ["∞ / ∞", "Cociente de polinomios, raíces, exponenciales", "Dividir numerador y denominador por el término que más crece (o comparar los órdenes de infinito)"],
          ["0 / 0", "Cociente de polinomios o con raíces, en un punto", "Factorizar y simplificar; con raíces, multiplicar por el conjugado; límites notables"],
          ["∞ − ∞", "Resta de raíces, de fracciones o de polinomios", "Conjugado (raíces); común denominador (fracciones); sacar factor común de la mayor potencia"],
          ["0 · ∞", "Producto de algo que tiende a 0 por algo que tiende a ∞", "Pasarlo a un cociente (0/0 o ∞/∞) y aplicar la técnica correspondiente"],
          ["1<sup>∞</sup>", "Potencias con base → 1 y exponente → ∞", "lím f<sup>g</sup> = e<sup>L</sup> con L = lím g·(f − 1)"],
          ["k / 0", "No es indeterminación", "Límites laterales y signo del denominador"]
        ]) +
        "<h5>∞/∞: dividir por lo que manda</h5>" +
        ejemplo("Cociente de polinomios y de exponenciales",
          "Calcula (a) lím<sub>x→+∞</sub> " + fr("3x² − 5x + 1", "2x² + x") + "; (b) lím<sub>x→+∞</sub> " + fr("2·3ˣ + 5", "3ˣ⁺¹ − 1") + ".",
          ["(a) Mayor potencia: x². Dividimos todo entre x²: " + fr("3 − 5/x + 1/x²", "2 + 1/x") + " ⟶ " + fr("3", "2") + ". Resultado <b>3/2</b>: los grados son iguales, y sale el cociente de coeficientes principales.",
           "(b) Escribimos 3ˣ⁺¹ = 3·3ˣ y dividimos entre 3ˣ: " + fr("2 + 5/3ˣ", "3 − 1/3ˣ") + ". Como 3ˣ → ∞, 5/3ˣ → 0 y 1/3ˣ → 0: resultado <b>2/3</b>."]) +
        "<h5>0/0: factorizar, conjugado o límite notable</h5>" +
        ejemplo("Tres formas de resolver un 0/0",
          "Calcula (a) lím<sub>x→2</sub> " + fr("x² − 4", "x² − x − 2") + "; (b) lím<sub>x→0</sub> " + fr("√(x + 9) − 3", "x") + "; (c) lím<sub>x→0</sub> " + fr("1 − cos 2x", "x²") + ".",
          ["(a) Al sustituir: 0/0. Factorizamos: x² − 4 = (x − 2)(x + 2) y x² − x − 2 = (x − 2)(x + 1). Simplificando (x ≠ 2): " + fr("x + 2", "x + 1") + " ⟶ <b>4/3</b>.",
           "(b) 0/0 con raíz: conjugado (√(x+9) + 3). Numerador: (x + 9) − 9 = x. Queda " + fr("x", "x(√(x + 9) + 3)") + " = " + fr("1", "√(x + 9) + 3") + " ⟶ <b>1/6</b>.",
           "(c) Límite notable: (1 − cos u)/u² → 1/2 cuando u → 0. Con u = 2x: " + fr("1 − cos 2x", "x²") + " = 4·" + fr("1 − cos 2x", "(2x)²") + " ⟶ 4·(1/2) = <b>2</b>."]) +
        tabla(["Límites notables (u → 0)", "Valor"], [
          ["sen u / u", "1"], ["(1 − cos u) / u²", "1/2"], ["tg u / u", "1"], ["(eᵘ − 1) / u", "1"], ["ln(1 + u) / u", "1"]
        ]) +
        "<h5>0·∞: se convierte en un cociente</h5>" +
        ejemplo("Dos productos indeterminados",
          "Calcula (a) lím<sub>x→+∞</sub> x·sen(2/x); (b) lím<sub>x→1</sub> (x − 1)· " + fr("1", "x² − 1") + ".",
          ["(a) x → ∞ y sen(2/x) → 0: es 0·∞. Cambio t = 1/x (t → 0⁺): sen(2t)/t = 2·" + fr("sen 2t", "2t") + " ⟶ 2·1 = <b>2</b>.",
           "(b) (x − 1) → 0 y 1/(x² − 1) → ∞. Lo escribimos como cociente: " + fr("x − 1", "x² − 1") + " = " + fr("1", "x + 1") + " ⟶ <b>1/2</b>."]) +
        "<h5>1<sup>∞</sup>: el número e</h5>" +
        "<p>Recuerda que e = lím (1 + 1/x)ˣ. Cuando la base tiende a 1 y el exponente a infinito, hay una fórmula directa:</p>" +
        "<div class='formula-wrap'><div class='formula'>si f(x) → 1 y g(x) → ∞, entonces lím f(x)<sup>g(x)</sup> = e<sup>L</sup> con L = lím g(x)·(f(x) − 1)</div></div>" +
        "<p>(Se justifica porque f<sup>g</sup> = e<sup>g·ln f</sup> y, si f → 1, ln f ≈ f − 1.) El método: <b>comprobar que es 1<sup>∞</sup>, calcular L (que a su vez suele ser un ∞·0 o un ∞/∞ sencillo) y escribir e<sup>L</sup></b>.</p>" +
        ejemplo("Cuatro límites 1<sup>∞</sup>",
          "Calcula (a) lím<sub>x→+∞</sub> (1 + 2/x)ˣ; (b) lím<sub>x→+∞</sub> (" + fr("x + 3", "x − 1") + ")<sup>2x</sup>; (c) lím<sub>x→0</sub> (1 + 3x)<sup>1/x</sup>; (d) lím<sub>x→0</sub> (cos x)<sup>1/x²</sup>.",
          ["(a) Base → 1, exponente → ∞. L = lím x·(2/x) = 2. Resultado <b>e²</b> ≈ 7,389.",
           "(b) f − 1 = " + fr("x + 3", "x − 1") + " − 1 = " + fr("4", "x − 1") + ". L = lím 2x·" + fr("4", "x − 1") + " = lím " + fr("8x", "x − 1") + " = 8. Resultado <b>e⁸</b> ≈ 2981,0.",
           "(c) Base 1 + 3x → 1, exponente 1/x → ∞. L = lím (1/x)·3x = 3. Resultado <b>e³</b> ≈ 20,09.",
           "(d) cos x → 1, exponente 1/x² → ∞. L = lím " + fr("cos x − 1", "x²") + " = −1/2 (límite notable). Resultado <b>e<sup>−1/2</sup></b> = 1/√e ≈ 0,6065."]) +
        w("m2_numero_e") +
        ojo("La fórmula solo se aplica si la base tiende a <b>1</b> exactamente. Si la base tiende a otro valor k, no hay indeterminación: (k)<sup>∞</sup> es +∞ si k &gt; 1 y 0 si 0 &lt; k &lt; 1. Y si olvidas restar 1 y calculas L = lím g·f, el resultado es otro número.") +
        "<h5>k/0: no hay que transformar, hay que mirar signos</h5>" +
        ejemplo("Un numerador que no se anula",
          "Calcula lím<sub>x→2</sub> " + fr("x + 1", "x − 2") + " y lím<sub>x→2</sub> " + fr("x + 1", "(x − 2)²") + ".",
          ["Numerador → 3 ≠ 0 y denominador → 0: no es indeterminación, es ±∞ según los signos.",
           "x → 2⁺: x − 2 &gt; 0 ⟹ " + fr("x + 1", "x − 2") + " → +∞. x → 2⁻: x − 2 &lt; 0 ⟹ −∞. Los laterales no coinciden: <b>no existe el límite</b> (hay asíntota vertical x = 2).",
           "Con (x − 2)² el denominador es positivo por los dos lados ⟹ el límite es <b>+∞</b>."]) +
        "<p>Otras indeterminaciones (∞<sup>0</sup>, 0<sup>0</sup>) y los casos que se resisten a estas técnicas se resuelven con la <b>regla de L'Hôpital</b>, que usa derivadas y se estudia en el tema siguiente.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Límites laterales y funciones a trozos",
      html:
        "<p>Escribimos lím<sub>x→a⁻</sub> f para el límite por la <b>izquierda</b> (x &lt; a) y lím<sub>x→a⁺</sub> f para el de la <b>derecha</b> (x &gt; a). La regla básica: <b>existe lím<sub>x→a</sub> f ⟺ existen los dos laterales y son iguales</b>.</p>" +
        "<p>Los laterales son imprescindibles en tres situaciones: (1) funciones con <b>valor absoluto</b> (que cambian de fórmula en el punto donde se anula lo de dentro); (2) funciones <b>a trozos</b>, en los puntos de cambio de fórmula; (3) funciones con <b>1/x en un exponente</b> o raíces pares en el borde del dominio, donde los dos lados se comportan distinto.</p>" +
        ejemplo("Valor absoluto: dos fórmulas escondidas",
          "Calcula los límites laterales en x = 2 de f(x) = " + fr("|x − 2|", "x − 2") + " y decide si existe el límite.",
          ["Quitamos el valor absoluto: |x − 2| = x − 2 si x &gt; 2 y = −(x − 2) si x &lt; 2.",
           "Por la derecha: " + fr("x − 2", "x − 2") + " = 1 ⟹ lím<sub>x→2⁺</sub> f = 1. Por la izquierda: " + fr("−(x − 2)", "x − 2") + " = −1 ⟹ lím<sub>x→2⁻</sub> f = −1.",
           "Son distintos: <b>no existe el límite</b>. Es una discontinuidad de <b>salto finito</b> de altura |1 − (−1)| = 2."]) +
        ejemplo("Un exponente 1/x",
          "Calcula los laterales de f(x) = e<sup>1/x</sup> en x = 0.",
          ["x → 0⁺: 1/x → +∞ ⟹ e<sup>1/x</sup> → +∞.", "x → 0⁻: 1/x → −∞ ⟹ e<sup>1/x</sup> → e<sup>−∞</sup> = 0.",
           "Un lateral es infinito y el otro vale 0: discontinuidad de salto infinito. La recta x = 0 es asíntota vertical (solo por la derecha)."]) +
        ejemplo("Función a trozos con un valor suelto",
          "Estudia la continuidad en x = 1 de f(x) = { x² + 1 si x &lt; 1 ; 5 si x = 1 ; 3x − 1 si x &gt; 1 }.",
          ["Por la izquierda: lím<sub>x→1⁻</sub> (x² + 1) = 2. Por la derecha: lím<sub>x→1⁺</sub> (3x − 1) = 2. Los laterales coinciden: existe el límite y vale 2.",
           "Pero f(1) = 5 ≠ 2. Discontinuidad <b>evitable</b> en x = 1 (bastaría con definir f(1) = 2).",
           "En los demás puntos cada trozo es un polinomio, luego f es continua en ℝ \\ {1}."]) +
        ejemplo("Límites en el infinito de una función a trozos",
          "Estudia la continuidad en 0 y las asíntotas horizontales de f(x) = { eˣ si x ≤ 0 ; " + fr("2x + 1", "x + 1") + " si x &gt; 0 }.",
          ["En 0: f(0) = e⁰ = 1; lím<sub>x→0⁻</sub> eˣ = 1; lím<sub>x→0⁺</sub> " + fr("2x + 1", "x + 1") + " = 1. Los tres valores coinciden ⟹ continua en 0.",
           "En −∞ se usa el trozo eˣ: lím<sub>x→−∞</sub> eˣ = 0 ⟹ asíntota horizontal <b>y = 0</b> en −∞.",
           "En +∞ se usa el otro trozo: lím " + fr("2x + 1", "x + 1") + " = 2 ⟹ asíntota horizontal <b>y = 2</b> en +∞.",
           "El trozo racional tiene x = −1 como punto problemático, pero está fuera de su rango (x &gt; 0), así que no importa."]) +
        w("trozos") +
        ojo("En una función a trozos, <b>cada límite en el infinito usa solo el trozo que contiene a ese infinito</b> (el de la derecha para +∞ y el de la izquierda para −∞). Y al estudiar un punto de cambio, usa para cada lateral el trozo de ese lado, no el otro.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Hallar parámetros para que una función sea continua",
      html:
        "<p>Es el problema de continuidad más repetido en la EvAU. La idea: <b>cada punto de empalme da una ecuación</b> (límite izquierdo = límite derecho = valor de la función), y los parámetros son las incógnitas. Método:</p>" +
        "<ol><li><b>Localiza los puntos de empalme</b> (donde cambia la fórmula) y asegúrate de que cada trozo es continuo dentro de su intervalo (si no, ahí también puede fallar).</li>" +
        "<li><b>Calcula los límites laterales</b> y f(a) en cada empalme (si hay un 0/0, resuélvelo).</li>" +
        "<li><b>Iguala</b> lateral izquierdo = lateral derecho = f(a). Se obtiene una ecuación por empalme.</li>" +
        "<li><b>Resuelve</b> el sistema y <b>comprueba</b> sustituyendo los valores hallados.</li></ol>" +
        ejemplo("Un parámetro",
          "Halla a para que f(x) = { 3x − a si x &lt; 2 ; x² + 1 si x ≥ 2 } sea continua en ℝ.",
          ["Cada trozo es polinómico, así que el único punto problemático es x = 2.",
           "Lateral izquierdo: lím<sub>x→2⁻</sub> (3x − a) = 6 − a. Lateral derecho y valor: f(2) = lím<sub>x→2⁺</sub> (x² + 1) = 5.",
           "Continuidad ⟺ 6 − a = 5 ⟹ <b>a = 1</b>.",
           "Comprobación: con a = 1, los dos trozos valen 5 en x = 2 ✓."]) +
        ejemplo("Dos parámetros y un 0/0",
          "Halla a y b para que f(x) = { " + fr("x² − 4", "x − 2") + " si x &lt; 2 ; ax + b si 2 ≤ x ≤ 4 ; x² − 7 si x &gt; 4 } sea continua en ℝ.",
          ["Empalmes: x = 2 y x = 4.",
           "<b>En x = 2</b>: lím<sub>x→2⁻</sub> " + fr("x² − 4", "x − 2") + " = lím (x + 2) = 4 (se factoriza el 0/0). Valor: f(2) = 2a + b. Ecuación: <b>2a + b = 4</b>.",
           "<b>En x = 4</b>: f(4) = 4a + b y lím<sub>x→4⁺</sub> (x² − 7) = 9. Ecuación: <b>4a + b = 9</b>.",
           "Restando: 2a = 5 ⟹ a = 5/2. Entonces b = 4 − 2a = −1. Solución: <b>a = 5/2, b = −1</b>.",
           "Comprobación: 2·(5/2) − 1 = 4 ✓ y 4·(5/2) − 1 = 9 ✓."]) +
        ejemplo("Parámetros con límites notables",
          "Halla a y b para que f(x) = { " + fr("1 − cos x", "x²") + " si x &lt; 0 ; a si x = 0 ; " + fr("sen 2x", "bx") + " si x &gt; 0 } sea continua en x = 0 (con b ≠ 0).",
          ["Lateral izquierdo: lím<sub>x→0⁻</sub> " + fr("1 − cos x", "x²") + " = 1/2 (límite notable).",
           "Lateral derecho: lím<sub>x→0⁺</sub> " + fr("sen 2x", "bx") + " = " + fr("2", "b") + "·lím " + fr("sen 2x", "2x") + " = 2/b.",
           "Valor: f(0) = a. Continuidad ⟺ 1/2 = 2/b = a ⟹ <b>b = 4 y a = 1/2</b>."]) +
        w("m2_empalme") +
        ojo("Un error frecuente: igualar solo los dos trozos y olvidar el valor de f en el punto (cuando aparece «si x = a»). Otro: aplicar las igualdades en un punto que no es de empalme. Y, al final, <b>comprueba siempre</b> que con los valores hallados se cumplen las condiciones de verdad.") +
        "<h5>Variantes que aparecen en los enunciados</h5>" +
        "<ul>" +
        "<li><b>«Para qué valores existe el límite»</b>: solo se piden los laterales iguales (no hace falta f(a)).</li>" +
        "<li><b>«Que sea continua en x = a»</b> con un solo trozo y un valor puntual (f(a) = k): el parámetro es el valor del límite.</li>" +
        "<li><b>«Que tenga un límite finito»</b> cuando hay un 0/0 con parámetro: el numerador debe anularse en el punto (hay que factorizar x − a), y eso da la ecuación del parámetro.</li></ul>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Teorema de Bolzano",
      html:
        "<div class='formula-wrap'><div class='formula'><b>Teorema de Bolzano.</b> Si f es <b>continua en el intervalo cerrado [a, b]</b> y f(a) y f(b) tienen <b>signos opuestos</b> (f(a)·f(b) &lt; 0), entonces existe al menos un c ∈ (a, b) con f(c) = 0.</div></div>" +
        "<p>Geométricamente: una curva continua que empieza por debajo del eje X y acaba por encima (o al revés) <b>tiene que cruzarlo</b> en algún punto. Garantiza que <b>existe</b> una raíz, pero no dice cuántas ni cuánto vale. Hay que cumplir <b>las dos hipótesis</b>: continuidad en [a, b] y signos opuestos en los extremos.</p>" +
        "<h5>Cómo se redacta una demostración con Bolzano</h5>" +
        "<ol><li><b>Define la función</b> pasando todo a un lado: f(x) = (izquierda) − (derecha) de la ecuación.</li>" +
        "<li><b>Continuidad</b>: justifica que f es continua en [a, b] (suma, producto o composición de funciones continuas).</li>" +
        "<li><b>Signos</b>: calcula f(a) y f(b) y comprueba que tienen signo opuesto.</li>" +
        "<li><b>Conclusión</b>: «por el teorema de Bolzano, existe c ∈ (a, b) con f(c) = 0, es decir, la ecuación tiene al menos una solución en (a, b)».</li></ol>" +
        ejemplo("Una ecuación con coseno",
          "Demuestra que la ecuación cos x = x tiene al menos una solución en (0, 1).",
          ["Definimos f(x) = cos x − x. Una solución de la ecuación es una raíz de f.",
           "f es continua en [0, 1] por ser diferencia de dos funciones continuas (cos x y x).",
           "f(0) = cos 0 − 0 = 1 &gt; 0. f(1) = cos 1 − 1 ≈ 0,5403 − 1 = −0,4597 &lt; 0 (cos 1 con 1 radián). Signos opuestos.",
           "Por Bolzano existe c ∈ (0, 1) con f(c) = 0, es decir, cos c = c. ∎"]) +
        ejemplo("Corte de dos gráficas",
          "Demuestra que las gráficas de y = eˣ e y = 3 − x se cortan en algún punto de abscisa entre 0 y 1.",
          ["Se cortan donde eˣ = 3 − x, es decir, donde f(x) = eˣ + x − 3 = 0.",
           "f es continua en [0, 1] (suma de funciones continuas).",
           "f(0) = 1 + 0 − 3 = −2 &lt; 0 y f(1) = e + 1 − 3 = e − 2 ≈ 0,718 &gt; 0.",
           "Bolzano ⟹ existe c ∈ (0, 1) con f(c) = 0. ∎"]) +
        ejemplo("¿Cuántas raíces? Contar intervalos",
          "Demuestra que f(x) = x³ − 6x² + 9x − 2 tiene tres raíces reales.",
          ["Es polinómica, luego continua en ℝ. Calculamos valores: f(0) = −2, f(1) = 1 − 6 + 9 − 2 = 2, f(3) = 27 − 54 + 27 − 2 = −2, f(4) = 64 − 96 + 36 − 2 = 2.",
           "Cambios de signo: (0, 1), (1, 3) y (3, 4). Bolzano en cada intervalo ⟹ al menos una raíz en cada uno: tres raíces distintas (los intervalos no se solapan).",
           "Un polinomio de grado 3 no puede tener más de tres raíces, así que son <b>exactamente tres</b>."]) +
        "<h5>Cuando Bolzano no se puede aplicar</h5>" +
        ejemplo("Las dos hipótesis importan",
          "¿Qué falla al intentar aplicar Bolzano a (a) f(x) = 1/x en [−1, 1] y (b) g(x) = x² en [−1, 1]?",
          ["(a) f(−1) = −1 y f(1) = 1, signos opuestos. Pero <b>f no es continua en [−1, 1]</b> (no existe f(0), hay una asíntota). Y de hecho 1/x no tiene ninguna raíz: la conclusión falla.",
           "(b) g(−1) = g(1) = 1, mismo signo: <b>no se cumple la hipótesis</b>, y el teorema no dice nada. Sin embargo g(0) = 0: tiene raíz. Bolzano da una condición <b>suficiente</b>, no necesaria."]) +
        "<h5>Bisección: acorralar la raíz</h5>" +
        "<p>Bolzano se usa también para <b>aproximar</b> la raíz: se parte [a, b] por la mitad, se mira el signo en el punto medio y se queda uno con la mitad donde sigue habiendo cambio de signo. Con x³ + x − 3 en [1, 2]: f(1) = −1 y f(2) = 7. Punto medio 1,5: f = 1,875 &gt; 0 ⟹ raíz en [1; 1,5]. Punto medio 1,25: f ≈ 0,203 &gt; 0 ⟹ raíz en [1; 1,25]. Punto medio 1,125: f ≈ −0,451 &lt; 0 ⟹ raíz en [1,125; 1,25]. Cada paso reduce el intervalo a la mitad.</p>" +
        w("bolzano") +
        "<h5>Teorema de los valores intermedios</h5>" +
        "<p>Es el mismo resultado visto de otro modo: si f es continua en [a, b], <b>toma todos los valores comprendidos entre f(a) y f(b)</b>. Se demuestra aplicando Bolzano a g(x) = f(x) − k.</p>" +
        ejemplo("Que una función toma un valor",
          "Demuestra que f(x) = x³ + x toma el valor 5 en algún punto de (1, 2).",
          ["Queremos f(c) = 5. Sea g(x) = x³ + x − 5, continua por ser polinómica.",
           "g(1) = 1 + 1 − 5 = −3 &lt; 0 y g(2) = 8 + 2 − 5 = 5 &gt; 0.",
           "Por Bolzano existe c ∈ (1, 2) con g(c) = 0, es decir, f(c) = 5. ∎"]) +
        ojo("Bolzano demuestra que <b>hay al menos una</b> raíz. Para probar que hay <b>una sola</b> hace falta, además, que la función sea estrictamente monótona (con la derivada, en el tema siguiente) o el teorema de Rolle.")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Teorema de Weierstrass",
      html:
        "<div class='formula-wrap'><div class='formula'><b>Teorema de Weierstrass.</b> Si f es <b>continua en el intervalo cerrado y acotado [a, b]</b>, entonces f alcanza en [a, b] un <b>máximo absoluto</b> y un <b>mínimo absoluto</b>: existen c, d ∈ [a, b] con f(d) ≤ f(x) ≤ f(c) para todo x ∈ [a, b].</div></div>" +
        "<p>Equivale a decir que la función está <b>acotada</b> y que sus valores máximo M y mínimo m existen de verdad (se alcanzan). Junto con los valores intermedios, el conjunto de valores que toma f en [a, b] es todo el intervalo cerrado [m, M].</p>" +
        "<p>El teorema asegura que existen, pero <b>no dice dónde están</b>. Para localizarlos se comparan los valores en los extremos del intervalo y en los puntos donde la derivada se anula (tema siguiente).</p>" +
        ejemplo("Máximo y mínimo en un intervalo cerrado",
          "Calcula el máximo y el mínimo absolutos de f(x) = x² − 4x + 1 en [0, 3].",
          ["f es polinómica, continua en [0, 3] cerrado: Weierstrass garantiza que existen.",
           "Es una parábola con vértice en x = 2 (la derivada 2x − 4 se anula en x = 2) y f(2) = 4 − 8 + 1 = −3.",
           "Valores en los extremos: f(0) = 1 y f(3) = 9 − 12 + 1 = −2.",
           "Comparando 1, −2 y −3: <b>máximo absoluto 1</b> (en x = 0) y <b>mínimo absoluto −3</b> (en x = 2)."]) +
        "<h5>Por qué hacen falta «continua» y «cerrado»</h5>" +
        tabla(["Función e intervalo", "Qué falla", "Consecuencia"], [
          ["f(x) = 1/x en (0, 1]", "No es cerrado en 0 (ni acotada)", "No tiene máximo: crece sin límite cerca de 0"],
          ["f(x) = x en (0, 1)", "Intervalo abierto", "Ni mínimo ni máximo: los valores 0 y 1 no se alcanzan"],
          ["f(x) = 1/x en [−1, 1]", "No es continua en 0", "No está acotada: ni máximo ni mínimo"],
          ["f(x) = x en [0, 1]", "Todo bien", "Mínimo 0 en x = 0 y máximo 1 en x = 1"]
        ]) +
        ejemplo("Weierstrass y valores intermedios juntos",
          "Sea f continua en [0, 2] con f(0) = 1 y f(2) = 5. ¿Qué se puede asegurar?",
          ["Por Weierstrass, f tiene máximo M y mínimo m absolutos en [0, 2], con m ≤ 1 y M ≥ 5.",
           "Por el teorema de los valores intermedios, f toma todos los valores entre m y M, en particular todos los de [1, 5].",
           "Por ejemplo, existe c ∈ [0, 2] con f(c) = 3. Si f(x) = x² + 1, c = √2."]) +
        ojo("Weierstrass da <b>máximo y mínimo absolutos</b> en todo el intervalo, no máximos «locales». Y la hipótesis es continuidad en <b>todo</b> el intervalo cerrado: si hay un solo punto de discontinuidad el teorema deja de valer.")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Un estudio completo, paso a paso",
      html:
        "<p>En la EvAU el límite casi nunca aparece aislado: se pide estudiar una función. Este es un guion de respuesta que sirve para casi cualquier racional.</p>" +
        ejemplo("Dominio, continuidad, asíntotas y cortes",
          "Estudia el dominio, la continuidad, las asíntotas y los puntos de corte con los ejes de f(x) = " + fr("2x² + 3x − 1", "x − 1") + ".",
          ["<b>Dominio</b>: el denominador se anula en x = 1 ⟹ Dom f = ℝ \\ {1}.",
           "<b>Continuidad</b>: f es racional, continua en su dominio. En x = 1 el numerador vale 2 + 3 − 1 = 4 ≠ 0: discontinuidad de salto infinito.",
           "<b>Asíntota vertical</b> x = 1. Laterales: x → 1⁺: numerador 4 &gt; 0, denominador → 0⁺ ⟹ +∞. x → 1⁻: denominador → 0⁻ ⟹ −∞.",
           "<b>Horizontales</b>: grado del numerador (2) &gt; grado del denominador (1) ⟹ lím f = ±∞ ⟹ no hay.",
           "<b>Oblicua</b>: al dividir, f(x) = 2x + 5 + 4/(x − 1) ⟹ y = 2x + 5 (en +∞ y en −∞).",
           "<b>Cortes</b>: con OY, f(0) = (−1)/(−1) = 1 ⟹ (0, 1). Con OX, 2x² + 3x − 1 = 0 ⟹ x = (−3 ± √17)/4 ≈ 0,281 y ≈ −1,781."]) +
        w("asintotas") +
        "<h5>Plantilla para la hoja del examen</h5>" +
        "<ol><li>Dominio de la función.</li><li>Continuidad: puntos candidatos (fuera del dominio, empalmes) y clasificación de cada uno con los laterales.</li><li>Asíntotas verticales: candidatos con sus dos laterales.</li><li>En +∞ y en −∞ por separado: horizontal (límite finito) u oblicua (m = lím f/x, n = lím (f − mx)).</li><li>Conclusión en una frase.</li></ol>" +
        ojo("Indica <b>siempre los resultados de los límites que usas</b> (aunque los hagas de cabeza): en la corrección de la EvAU se puntúa el planteamiento, no solo el resultado final.")
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para resolver un límite.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t7b = { nuevas: nuevas };
})(window);
