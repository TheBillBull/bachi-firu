/* ============================================================
   Matemáticas II · ampliaciones · Tema 8: Derivadas
   (parte B: secciones nuevas 6 a 11)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t8/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Derivabilidad: derivadas laterales y funciones a trozos",
      html:
        "<p>Una función es derivable en a si existe (y es un número real) el límite de la definición. Como todo límite, existe solo si coinciden los <b>límites laterales</b>; aquí se llaman <b>derivadas laterales</b>:</p>" +
        "<div class='formula-wrap'><div class='formula'>f′(a⁺) = lim<sub>h→0⁺</sub> [f(a + h) − f(a)]/h &nbsp;&nbsp;·&nbsp;&nbsp; f′(a⁻) = lim<sub>h→0⁻</sub> [f(a + h) − f(a)]/h</div></div>" +
        "<p>f es derivable en a ⟺ f′(a⁺) = f′(a⁻) (y es finito). La derivada por la derecha es la pendiente que «sube» desde el punto hacia la derecha; por la izquierda, desde la izquierda. Si no coinciden, la gráfica tiene un pico.</p>" +
        "<h5>Derivable ⟹ continua, pero no al revés</h5>" +
        "<p>Si f es derivable en a, entonces es continua en a (si hubiera un salto, el cociente [f(a + h) − f(a)]/h se haría infinito). El recíproco es falso, y es una de las preguntas clásicas de teoría. Hay tres maneras de ser continua y no derivable:</p>" +
        tabla(["Tipo de punto", "Ejemplo en x = 0", "Derivadas laterales", "Aspecto"], [
          ["Punto angular", "|x|", "−1 y +1 (finitas y distintas)", "pico"],
          ["Cúspide", "∛(x²)", "−∞ y +∞", "pico con tangente vertical"],
          ["Tangente vertical", "∛x", "+∞ y +∞ (el mismo infinito)", "curva con tangente vertical, sin pico"]
        ]) +
        "<p>En los tres casos no hay derivada (la derivada tiene que ser un número real). Y, por supuesto, si hay un salto o un hueco la función ni siquiera es continua y tampoco es derivable. Prueba todos los casos:</p>" +
        w("derivabilidad") +
        "<h5>Funciones a trozos: el método de los dos pasos</h5>" +
        "<p>Para estudiar f en el punto c donde se unen los trozos (o para hallar parámetros):</p>" +
        "<ol>" +
        "<li><b>Continuidad en c</b>: los dos límites laterales de f valen lo mismo que f(c). Cada trozo evaluado en c da el mismo número. (Primera ecuación.)</li>" +
        "<li><b>Derivabilidad en c</b>: se deriva cada trozo y se evalúa en c; deben dar el mismo número. (Segunda ecuación.) Este atajo es válido cuando f ya es continua en c.</li>" +
        "</ol>" +
        "<p>Si hay dos parámetros, tendrás dos ecuaciones lineales: un sistema que se resuelve en dos líneas.</p>" +
        ejemplo("Dos parámetros: polinomio y logaritmo", "Halla a y b para que f sea derivable en x = 1, con f(x) = ax² + bx si x ≤ 1 y f(x) = 2 + ln x si x &gt; 1.",
          ["Continuidad en 1: a + b = 2 + ln 1 = 2.",
           "Derivadas de los trozos: 2ax + b y 1/x. En x = 1: 2a + b = 1.",
           "Restando: (2a + b) − (a + b) = 1 − 2 ⟹ <b>a = −1</b>, y b = 2 − a = <b>3</b>.",
           "Entonces f′(1) = 1. Comprobación: −1 + 3 = 2 ✓ y 2(−1) + 3 = 1 ✓."]) +
        ejemplo("Exponencial y parábola", "Halla a y b para que f(x) = eˣ + a (x &lt; 0), f(x) = x² + bx + 3 (x ≥ 0) sea derivable en x = 0.",
          ["Continuidad: e⁰ + a = 0 + 0 + 3 ⟹ 1 + a = 3 ⟹ <b>a = 2</b>.",
           "Derivadas: eˣ y 2x + b. En 0: 1 = b ⟹ <b>b = 1</b>.",
           "f′(0) = 1."]) +
        w("m2t8_trozos") +
        "<h5>Con valor absoluto: se separa en trozos</h5>" +
        "<p>Una función con |·| se reescribe como función a trozos según el signo de lo de dentro, y desde ahí se estudia igual. Los únicos puntos sospechosos son los que anulan lo que hay dentro del valor absoluto.</p>" +
        ejemplo("Valor absoluto de una parábola", "Estudia la derivabilidad de f(x) = |x² − 4|.",
          ["x² − 4 &lt; 0 en (−2, 2): f = 4 − x², f′ = −2x. Fuera de [−2, 2]: f = x² − 4, f′ = 2x.",
           "En x = 2: f′(2⁻) = −4 y f′(2⁺) = +4. Distintas ⟹ <b>no derivable en x = 2</b> (punto angular). Por simetría, tampoco en x = −2.",
           "En el resto de los puntos es derivable."]) +
        ejemplo("Un parámetro dentro del valor absoluto", "Halla a para que f(x) = |x − 1|·(x + a) sea derivable en x = 1.",
          ["f es continua siempre (producto de continuas). Para x &gt; 1: f = (x − 1)(x + a), f′(1⁺) = 1 + a.",
           "Para x &lt; 1: f = −(x − 1)(x + a), f′(1⁻) = −(1 + a).",
           "Derivable ⟺ 1 + a = −(1 + a) ⟺ 2(1 + a) = 0 ⟹ <b>a = −1</b>. Entonces f = (x − 1)|x − 1| y f′(1) = 0."]) +
        "<h5>Cuidado con la derivada que existe pero no es continua</h5>" +
        "<p>Para una función como f(x) = x²·sen(1/x) si x ≠ 0 y f(0) = 0, hay que ir a la definición en x = 0 (el atajo de «derivar cada trozo» no sirve porque la expresión de f′(x) no tiene límite en 0): f′(0) = lim<sub>h→0</sub> h² sen(1/h)/h = lim h·sen(1/h) = 0. Es derivable en 0 con f′(0) = 0, y sin embargo f′(x) = 2x sen(1/x) − cos(1/x) <b>no tiene límite</b> cuando x → 0: <i>una función puede ser derivable y tener derivada discontinua</i>.</p>" +
        ojo("Para hallar parámetros no basta la derivabilidad: <b>primero la continuidad</b>. Una función a trozos con las derivadas de los trozos iguales en c pero con un salto no es derivable (ni continua) en c. Y no te olvides de comprobar a qué trozo pertenece el propio punto c (con ≤ o con &lt;) al evaluar f(c)."),
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Derivación logarítmica: funciones del tipo f(x)<sup>g(x)</sup>",
      html:
        "<p>Cuando la base y el exponente dependen de x, no sirve ni la regla de la potencia (que exige exponente constante) ni la de la exponencial (que exige base constante). La salida es <b>tomar logaritmos</b>, que convierte la potencia en un producto:</p>" +
        "<div class='formula-wrap'><div class='formula'>y = f(x)<sup>g(x)</sup> &nbsp;⟹&nbsp; ln y = g(x)·ln f(x) &nbsp;⟹&nbsp; y′/y = g′·ln f + g·f′/f &nbsp;⟹&nbsp; <b>y′ = f<sup>g</sup>·(g′·ln f + g·f′/f)</b></div></div>" +
        "<p>Pasos: (1) comprueba que f &gt; 0 (para poder tomar ln); (2) toma ln en los dos miembros; (3) deriva los dos lados — el izquierdo sale como y′/y por la regla de la cadena; (4) despeja y′ y sustituye y por su expresión original. Una forma equivalente: y = e<sup>g·ln f</sup> y deriva la exponencial.</p>" +
        ejemplo("La clásica x<sup>x</sup>", "Deriva y = xˣ (x &gt; 0).",
          ["ln y = x·ln x. Derivando: y′/y = 1·ln x + x·(1/x) = ln x + 1.",
           "<b>y′ = xˣ(ln x + 1)</b>. Por ejemplo, y′(1) = 1 y y′(2) = 4(ln 2 + 1) ≈ 6,77."]) +
        ejemplo("Exponente trigonométrico", "Deriva y = x<sup>sen x</sup> (x &gt; 0).",
          ["ln y = sen x·ln x. Derivando: y′/y = cos x·ln x + sen x·(1/x).",
           "<b>y′ = x<sup>sen x</sup>·(cos x·ln x + sen x/x)</b>."]) +
        ejemplo("Base que es otra función", "Deriva y = (ln x)<sup>x</sup> (x &gt; 1).",
          ["ln y = x·ln(ln x). Derivando: y′/y = ln(ln x) + x·[1/(x·ln x)] = ln(ln x) + 1/ln x.",
           "<b>y′ = (ln x)ˣ·(ln(ln x) + 1/ln x)</b>."]) +
        "<h5>El mismo truco para productos y cocientes enormes</h5>" +
        "<p>Si tienes muchos factores y potencias, el logaritmo transforma productos en sumas y cocientes en restas, y es más cómodo que la regla del producto repetida:</p>" +
        ejemplo("Producto y cociente de varios factores", "Calcula y′(1) para y = x²(x + 1)³/(x − 2)⁴.",
          ["ln y = 2 ln x + 3 ln(x + 1) − 4 ln(x − 2) (con valor absoluto dentro si hace falta).",
           "y′/y = 2/x + 3/(x + 1) − 4/(x − 2).",
           "En x = 1: y(1) = 1·8/(−1)⁴ = 8 y y′/y = 2 + 3/2 − 4/(−1) = 7,5.",
           "<b>y′(1) = 8·7,5 = 60</b>."]) +
        ejemplo("Recta tangente a una función potencial-exponencial", "Halla la tangente a y = xˣ en x = 2.",
          ["y(2) = 4 y y′(2) = 4(ln 2 + 1).",
           "Tangente: y − 4 = 4(1 + ln 2)(x − 2) ⟹ <b>y = 4(1 + ln 2)x − 4 − 8 ln 2</b>  (≈ 6,77x − 9,55)."]) +
        ojo("No derives xˣ como x·x^(x−1) (eso supone exponente constante) ni como xˣ·ln x (eso supone base constante). Lo correcto es la <b>suma de las dos</b>: xˣ·ln x + x·x^(x−1) = xˣ(ln x + 1). Si lo piensas bien, cada una de las dos reglas «equivocadas» es una de las dos mitades."),
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Recta tangente y normal: los problemas típicos",
      html:
        "<p>En la EvAU la derivada casi siempre se usa para escribir una recta tangente. Las preguntas se reducen a cuatro situaciones; saber cuál es la tuya es la mitad del ejercicio.</p>" +
        "<h5>A. Tangente en un punto dado de la curva</h5>" +
        "<p>Es la receta de la sección 1: y − f(a) = f′(a)(x − a).</p>" +
        ejemplo("Tangente y normal con logaritmo", "Halla la tangente y la normal a f(x) = x·ln x en x = e.",
          ["f(e) = e·1 = e. f′(x) = ln x + 1 ⟹ f′(e) = 2.",
           "Tangente: y − e = 2(x − e) ⟹ <b>y = 2x − e</b>.",
           "Normal: pendiente −1/2 ⟹ y − e = −½(x − e) ⟹ <b>y = −x/2 + 3e/2</b>."]) +
        "<h5>B. Pendiente conocida o paralela/perpendicular a otra recta</h5>" +
        "<p>Aquí no te dan el punto: te dan la <b>pendiente</b> m (o una recta paralela a la tangente, o perpendicular a ella). Se resuelve la ecuación <b>f′(x) = m</b>, cuyas soluciones son las abscisas de los puntos de tangencia. Recuerda: paralela ⟹ misma pendiente; perpendicular ⟹ pendiente m′ = −1/m.</p>" +
        ejemplo("Tangentes paralelas a una recta", "¿En qué puntos de f(x) = x³ − 3x la tangente es paralela a y = 6x + 1? Escribe las tangentes.",
          ["Pendiente 6: f′(x) = 3x² − 3 = 6 ⟹ x² = 3 ⟹ x = ±√3.",
           "f(√3) = 3√3 − 3√3 = 0 y f(−√3) = 0. Puntos: <b>(√3, 0) y (−√3, 0)</b>.",
           "Tangentes: y = 6(x − √3) = 6x − 6√3 e y = 6(x + √3) = 6x + 6√3."]) +
        ejemplo("Tangente horizontal", "¿Dónde es horizontal la tangente de f(x) = x·e<sup>−x</sup>?",
          ["Horizontal ⟺ f′(x) = 0. Con f′ = (1 − x)e<sup>−x</sup>: 1 − x = 0 (la exponencial nunca se anula) ⟹ x = 1.",
           "Punto: <b>(1, 1/e)</b>, y la tangente es y = 1/e."]) +
        "<h5>C. Tangente que pasa por un punto que no está en la curva</h5>" +
        "<p>Este es el que más cuesta. Ahora el punto de tangencia es la <b>incógnita</b>, t. La tangente en t es y = f(t) + f′(t)(x − t); le obligas a pasar por el punto exterior (x₀, y₀) y resuelves en t.</p>" +
        ejemplo("Tangentes a una parábola desde un punto exterior", "Halla las rectas tangentes a y = x² que pasan por P(1, −3).",
          ["Tangente en t: y = t² + 2t(x − t) (f(t) = t², f′(t) = 2t).",
           "Que pase por P: −3 = t² + 2t(1 − t) = 2t − t² ⟹ t² − 2t − 3 = 0 ⟹ <b>t = 3 o t = −1</b>.",
           "t = 3: y = 9 + 6(x − 3) = <b>6x − 9</b>. t = −1: y = 1 − 2(x + 1) = <b>−2x − 1</b>.",
           "Comprobación en P(1, −3): 6 − 9 = −3 ✓ y −2 − 1 = −3 ✓."]) +
        ejemplo("Tangente a y = ln x que pasa por el origen", "Halla la tangente a y = ln x que pasa por el origen.",
          ["Tangente en t: y = ln t + (x − t)/t.",
           "Por (0, 0): 0 = ln t − 1 ⟹ ln t = 1 ⟹ t = e.",
           "Pendiente 1/e: <b>y = x/e</b>."]) +
        "<h5>D. Tangente que corta a los ejes</h5>" +
        "<p>Una vez escrita la tangente, sus cortes con los ejes salen igualando x = 0 (ordenada en el origen) e y = 0 (abscisa en el origen); con ellos se calcula el área del triángulo que forma con los ejes, otra pregunta habitual.</p>" +
        ejemplo("Corte de la normal con el eje X", "Halla dónde corta al eje X la normal a f(x) = eˣ en x = 0.",
          ["f(0) = 1, f′(0) = 1 ⟹ normal de pendiente −1: y − 1 = −x ⟹ y = 1 − x.",
           "y = 0 ⟹ <b>x = 1</b>: corta al eje X en el punto (1, 0)."]) +
        w("tangente"),
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Teoremas de Rolle y del valor medio",
      html:
        "<p>Son dos teoremas de <b>existencia</b>: dicen que hay un punto con cierta propiedad pero no dónde está. En la EvAU se pregunta casi siempre lo mismo: «¿se cumplen las hipótesis? Si sí, calcula el c».</p>" +
        "<h5>Teorema de Rolle</h5>" +
        "<div class='formula-wrap'><div class='formula'>f continua en [a, b] · f derivable en (a, b) · f(a) = f(b) &nbsp;⟹&nbsp; existe c ∈ (a, b) con <b>f′(c) = 0</b></div></div>" +
        "<p>Geométricamente: si sales y vuelves a la misma altura, en algún punto intermedio la tangente es horizontal (en un máximo o un mínimo relativo). Fíjate en las tres hipótesis por separado: continuidad en el intervalo <i>cerrado</i>, derivabilidad en el <i>abierto</i> y mismas alturas en los extremos. Si falla una, el teorema no se puede aplicar (aunque la conclusión pueda cumplirse por casualidad).</p>" +
        w("m2t8_rolle") +
        ejemplo("Aplicar Rolle y hallar c", "Comprueba que f(x) = x³ − 6x² + 9x cumple el teorema de Rolle en [0, 3] y halla c.",
          ["Polinomio: continuo y derivable en todo ℝ. f(0) = 0 y f(3) = 27 − 54 + 27 = 0 ✓ (f(a) = f(b)).",
           "f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0 ⟹ x = 1 o x = 3.",
           "Solo x = 1 está en el intervalo abierto (0, 3) ⟹ <b>c = 1</b>."]) +
        ejemplo("Rolle que no se puede aplicar", "¿Se puede aplicar Rolle a f(x) = |x − 1| en [0, 2]?",
          ["Continua en [0, 2] ✓. f(0) = 1 = f(2) ✓.",
           "Pero f no es derivable en x = 1 ∈ (0, 2) (punto angular) ✗. <b>No se puede aplicar</b>, y de hecho no hay ningún c con f′(c) = 0 (f′ vale −1 a la izquierda y +1 a la derecha)."]) +
        "<h5>Teorema del valor medio (de Lagrange)</h5>" +
        "<div class='formula-wrap'><div class='formula'>f continua en [a, b] · f derivable en (a, b) &nbsp;⟹&nbsp; existe c ∈ (a, b) con <b>f′(c) = [f(b) − f(a)]/(b − a)</b></div></div>" +
        "<p>Geométricamente: hay un punto donde la tangente es paralela a la cuerda (secante) que une los extremos. Rolle es el caso particular en que la cuerda es horizontal. Se usa igual: compruebas hipótesis, calculas la pendiente de la cuerda y resuelves f′(c) = ese número, quedándote con las soluciones del intervalo <i>abierto</i>.</p>" +
        w("valormedio") +
        ejemplo("Valor medio con logaritmo", "Halla el c del teorema del valor medio para f(x) = ln x en [1, e].",
          ["Continua y derivable en [1, e] (x &gt; 0).",
           "Pendiente de la cuerda: [ln e − ln 1]/(e − 1) = 1/(e − 1).",
           "f′(c) = 1/c = 1/(e − 1) ⟹ <b>c = e − 1 ≈ 1,718</b>, que está en (1, e) ✓."]) +
        ejemplo("Valor medio con un cubo", "Halla c para f(x) = x³ en [1, 3].",
          ["Cuerda: (27 − 1)/(3 − 1) = 13.",
           "f′(c) = 3c² = 13 ⟹ c = ±√(13/3) ≈ ±2,082. Solo c ≈ 2,082 está en (1, 3). <b>c = √(13/3)</b>."]) +
        "<h5>Para qué sirven (más allá de calcular c)</h5>" +
        "<ul>" +
        "<li><b>Contar raíces</b>: junto a Bolzano. Bolzano asegura que hay una raíz; Rolle asegura que <i>no hay más de una</i>: si hubiera dos raíces, entre ellas f′ se anularía.</li>" +
        "<li><b>Acotar cantidades</b>: con el valor medio, |sen b − sen a| = |cos c|·|b − a| ≤ |b − a|.</li>" +
        "<li><b>Funciones con f′ = 0</b>: si f′ = 0 en todo un intervalo, f es constante (el valor medio da f(b) − f(a) = 0 para cualquier a y b).</li>" +
        "</ul>" +
        ejemplo("Exactamente una raíz real", "Demuestra que x³ + 3x − 1 = 0 tiene exactamente una raíz real.",
          ["f(x) = x³ + 3x − 1 es continua. f(0) = −1 &lt; 0 y f(1) = 3 &gt; 0 ⟹ (Bolzano) hay al menos una raíz en (0, 1).",
           "Supón que hubiera dos, α &lt; β. Rolle en [α, β] daría un c con f′(c) = 0.",
           "Pero f′(x) = 3x² + 3 ≥ 3 &gt; 0 para todo x. Contradicción ⟹ <b>la raíz es única</b>."]) +
        ejemplo("A lo sumo una raíz en un intervalo", "Demuestra que x³ − 3x + 1 = 0 tiene exactamente una raíz en (−1, 1).",
          ["g(x) = x³ − 3x + 1: g(−1) = 3 &gt; 0 y g(1) = −1 &lt; 0 ⟹ (Bolzano) al menos una raíz en (−1, 1).",
           "g′(x) = 3x² − 3 = 3(x² − 1) &lt; 0 en (−1, 1): si hubiera dos raíces, Rolle daría g′(c) = 0 en (−1, 1), imposible. <b>Exactamente una.</b>"]) +
        ojo("Los tres «es continua / es derivable / f(a) = f(b)» hay que <b>escribirlos</b> en el examen: el corrector da puntos por comprobar las hipótesis. Y recuerda que el teorema da la existencia de c, pero a veces hay varios (se piden «todos»), y que solo valen los que están en el intervalo <b>abierto</b>."),
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Regla de L'Hôpital",
      html:
        "<p>Es la herramienta para resolver límites con las indeterminaciones <b>0/0</b> o <b>∞/∞</b>. Si f(x) y g(x) cumplen las condiciones (ambas tienden a 0, o ambas a ∞, y son derivables cerca del punto con g′ ≠ 0):</p>" +
        "<div class='formula-wrap'><div class='formula'>lim f(x)/g(x) = lim f′(x)/g′(x) &nbsp;&nbsp;(si el segundo límite existe, finito o infinito)</div></div>" +
        "<p>Se derivan <b>por separado</b> numerador y denominador (no es la regla del cociente). Si tras derivar sigue la indeterminación, se repite. Vale con x → a, x → a⁺, x → a⁻ y x → ±∞.</p>" +
        ejemplo("0/0 aplicada dos veces", "Calcula lim<sub>x→0</sub> (eˣ − 1 − x)/x².",
          ["Para x = 0: numerador 1 − 1 − 0 = 0 y denominador 0 ⟹ 0/0.",
           "Derivando: (eˣ − 1)/(2x) es otra vez 0/0.",
           "Derivando otra vez: eˣ/2 → <b>1/2</b>."]) +
        ejemplo("0/0 aplicada tres veces", "Calcula lim<sub>x→0</sub> (sen x − x)/x³.",
          ["0/0 ⟹ (cos x − 1)/(3x²), de nuevo 0/0 ⟹ (−sen x)/(6x), de nuevo 0/0 ⟹ (−cos x)/6 → <b>−1/6</b>."]) +
        ejemplo("∞/∞ con un polinomio y un logaritmo", "Calcula lim<sub>x→+∞</sub> (2x² + ln x)/(x² + x).",
          ["∞/∞ ⟹ (4x + 1/x)/(2x + 1), de nuevo ∞/∞ ⟹ (4 − 1/x²)/2 → <b>2</b>."]) +
        w("m2t8_hopital") +
        "<h5>Las otras indeterminaciones: se reducen a un cociente</h5>" +
        tabla(["Forma", "Cómo se pasa a 0/0 o ∞/∞"], [
          ["0 · ∞", "f·g = f/(1/g): se pone uno de los factores en el denominador como inverso"],
          ["∞ − ∞", "se saca común denominador (o se multiplica por el conjugado) para tener una sola fracción"],
          ["1<sup>∞</sup>, 0⁰, ∞⁰", "se toma logaritmo: ln L = lim g·ln f (que sale 0·∞); luego L = e<sup>(ese límite)</sup>"]
        ]) +
        ejemplo("0 · ∞", "Calcula lim<sub>x→0⁺</sub> x·ln x.",
          ["Es 0·(−∞). Se escribe ln x / (1/x), que es −∞/+∞ (tipo ∞/∞).",
           "Derivando: (1/x)/(−1/x²) = −x → <b>0</b>."]) +
        ejemplo("∞ − ∞", "Calcula lim<sub>x→0</sub> [1/x − 1/(eˣ − 1)].",
          ["Común denominador: (eˣ − 1 − x)/[x(eˣ − 1)], que es 0/0.",
           "Derivando: (eˣ − 1)/(eˣ − 1 + x·eˣ) sigue siendo 0/0.",
           "Derivando otra vez: eˣ/(eˣ + eˣ + x·eˣ) = 1/(2 + x) → <b>1/2</b>."]) +
        ejemplo("Indeterminación 1<sup>∞</sup>", "Calcula lim<sub>x→+∞</sub> (1 + 2/x)ˣ.",
          ["Es 1<sup>∞</sup>. ln L = lim x·ln(1 + 2/x) = lim ln(1 + 2/x)/(1/x) (0/0).",
           "Derivando: [(−2/x²)/(1 + 2/x)]/(−1/x²) = 2/(1 + 2/x) → 2.",
           "ln L = 2 ⟹ <b>L = e²</b>."]) +
        ejemplo("Indeterminación 1<sup>∞</sup> con coseno", "Calcula lim<sub>x→0</sub> (cos x)<sup>1/x²</sup>.",
          ["ln L = lim ln(cos x)/x² (0/0). Derivando: (−tan x)/(2x) (0/0).",
           "Derivando otra vez: −(1 + tan² x)/2 → −1/2. Luego <b>L = e<sup>−1/2</sup> = 1/√e ≈ 0,607</b>."]) +
        "<h5>Con parámetros: lo que exige «el límite sea finito»</h5>" +
        ejemplo("Un parámetro para que el límite exista", "Halla a para que lim<sub>x→0</sub> (cos x + ax² − 1)/x⁴ sea finito y calcula el límite.",
          ["Es 0/0. Derivando: (−sen x + 2ax)/(4x³), otra vez 0/0. Derivando: (−cos x + 2a)/(12x²).",
           "Para x → 0 el numerador tiende a −1 + 2a; para que el cociente tenga límite finito, el numerador tiene que anularse: <b>a = 1/2</b>.",
           "Entonces (−cos x + 1)/(12x²) es 0/0 ⟹ sen x/(24x) ⟹ cos x/24 → <b>1/24</b>."]) +
        ojo("Tres fallos clásicos: (1) <b>derivar sin comprobar</b> la indeterminación (si el límite no es 0/0 ni ∞/∞, L'Hôpital da un resultado falso); (2) usar la <b>regla del cociente</b> en vez de derivar arriba y abajo por separado; (3) creer que «si f′/g′ no tiene límite, entonces f/g tampoco»: eso es falso. Por ejemplo lim<sub>x→∞</sub> (x + sen x)/x = 1, pero (1 + cos x)/1 no tiene límite; L'Hôpital no dice nada en ese caso."),
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Estrategia de examen: qué se pregunta y cómo contestar",
      html:
        "<p>Lo que cuesta de este tema no es derivar: es <b>elegir la herramienta</b>. Esta tabla relaciona la frase del enunciado con el método.</p>" +
        tabla(["Si el enunciado dice…", "Haz…"], [
          ["«Calcula por la definición f′(a)»", "Sustituye en [f(a + h) − f(a)]/h, simplifica la h (conjugado, común denominador) y haz h → 0"],
          ["«Estudia la derivabilidad en x = c» (a trozos)", "Continuidad en c; luego f′(c⁻) y f′(c⁺) con las derivadas de cada trozo"],
          ["«Halla a y b para que sea derivable»", "Ecuación de continuidad + ecuación de derivadas iguales = sistema"],
          ["«Función con |·|»", "Separa en trozos según el signo de lo de dentro; los puntos dudosos son los ceros"],
          ["«y = f(x)<sup>g(x)</sup>»", "Derivación logarítmica: ln y = g·ln f"],
          ["«Tangente en el punto de abscisa a»", "y = f(a) + f′(a)(x − a)"],
          ["«Tangente paralela/perpendicular a una recta», «de pendiente m»", "Resuelve f′(x) = m (o −1/m) y localiza el punto"],
          ["«Tangente desde un punto exterior»", "Punto de tangencia t incógnita; la tangente en t pasa por el punto"],
          ["«¿Se puede aplicar Rolle / el valor medio?»", "Escribe las hipótesis (continua, derivable, f(a) = f(b)) y comprueba una a una; luego resuelve f′(c) = 0 (o = pendiente de la cuerda) en (a, b) abierto"],
          ["«Demuestra que tiene una única raíz»", "Bolzano para existir, Rolle (o signo de f′) para unicidad"],
          ["«Calcula el límite» con 0/0 o ∞/∞", "L'Hôpital, tantas veces como haga falta, comprobando la forma cada vez"]
        ]) +
        "<h5>Errores que se pagan caros</h5>" +
        "<ul>" +
        "<li>Aplicar la regla del producto como (uv)′ = u′v′.</li>" +
        "<li>Olvidar la derivada del interior en la regla de la cadena.</li>" +
        "<li>Derivar xˣ como una potencia o como una exponencial, sin logaritmos.</li>" +
        "<li>Dar por derivable una función a trozos solo porque las derivadas de los trozos coinciden, sin verificar la continuidad.</li>" +
        "<li>Aceptar un c de Rolle o del valor medio que está fuera del intervalo (o en un extremo).</li>" +
        "<li>Usar L'Hôpital cuando el límite no es indeterminado.</li>" +
        "<li>Confundir «tangente» con «normal» (pendiente m con −1/m).</li>" +
        "</ul>"
    }
  ];

  B.parte.m2t8b = { nuevas: nuevas };
})(window);
