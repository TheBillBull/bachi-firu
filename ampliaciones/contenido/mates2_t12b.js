/* ============================================================
   Matemáticas II · ampliaciones · Tema 12: Integral definida
   (parte B: secciones nuevas 5 a 9)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t12/" + ref); }
  var I = B.parte.m2t12a.I;

  var nuevas = [
    // -------------------------------------------------------------- 5
    {
      h: "5. Teorema fundamental del cálculo: derivar funciones integrales",
      html:
        "<p>Hasta ahora la integral definida daba un número. Si dejamos libre el extremo superior, da una <b>función</b>: <b>F(x) = " + I("a", "x") + " f(t)dt</b> (la variable de integración es muda: se llama t para no confundirla con x). Es el área acumulada desde a hasta x. El <b>teorema fundamental del cálculo</b> dice:</p>" +
        "<div class='formula-wrap'><div class='formula'>f continua en [a, b] ⟹ F(x) = " + I("a", "x") + " f(t)dt es derivable y <b>F′(x) = f(x)</b></div></div>" +
        "<p>Es decir, derivar deshace integrar. Y de aquí sale Barrow: F es una primitiva de f. Lo que cae en la EvAU es la versión con <b>regla de la cadena</b>:</p>" +
        tabla(["Función integral", "Derivada"], [
          [I("a", "x") + " f(t)dt", "f(x)"],
          [I("a", "g(x)") + " f(t)dt", "f(g(x))·g′(x)"],
          [I("h(x)", "g(x)") + " f(t)dt", "f(g(x))·g′(x) − f(h(x))·h′(x)"],
          [I("x", "a") + " f(t)dt", "−f(x)  (límites invertidos)"]
        ]) +
        "<p>Para <b>no tener que calcular la integral</b>: la derivada de F se obtiene sin resolver nada; con F′ se estudian crecimiento y extremos de F. Con F″ = f′ se estudia la curvatura. El simulador dibuja F mientras mueves x: observa que F crece mientras f &gt; 0, que F tiene su máximo donde f pasa de + a −, y que la pendiente de F en cada punto es justamente el valor de f.</p>" +
        w("m2t12_fint") +
        ejemplo("Extremo superior que es una función", "Sea F(x) = " + I("1", "x²") + " ln t dt, con x &gt; 0. Calcula F′(x) y estudia su monotonía.",
          ["Regla de la cadena con g(x) = x²: F′(x) = ln(x²)·(x²)′ = 2 ln x · 2x = <b>4x ln x</b>.",
           "Signo para x &gt; 0: 4x &gt; 0, luego el signo es el de ln x. F′ &lt; 0 en (0, 1) y F′ &gt; 0 en (1, +∞).",
           "F decrece en (0, 1) y crece en (1, +∞): <b>mínimo en x = 1</b>, con F(1) = " + I("1", "1") + " ln t dt = 0.",
           "(Comprobación: " + I("1", "u") + " ln t dt = u ln u − u + 1, luego F(x) = x² ln x² − x² + 1 = 2x² ln x − x² + 1; derivando, 4x ln x + 2x − 2x = 4x ln x ✓.)"]) +
        ejemplo("Límite con una integral (L'Hôpital)", "Calcula lím<sub>x→0</sub> " + I("0", "x") + " (e<sup>t²</sup> − 1)dt / x³.",
          ["Numerador: para x = 0 la integral vale 0. Denominador: 0. Indeterminación 0/0 ⟹ L'Hôpital.",
           "Derivando arriba (teorema fundamental) y abajo: (e<sup>x²</sup> − 1)/(3x²).",
           "Sigue siendo 0/0. Con e<sup>x²</sup> − 1 ∼ x² (o L'Hôpital otra vez: 2x·e<sup>x²</sup>/(6x) = e<sup>x²</sup>/3) el límite es <b>1/3</b>."]) +
        ejemplo("Una F sin fórmula", "F(x) = " + I("0", "x") + " e<sup>−t²</sup>dt. Estúdiala: monotonía, curvatura y simetría.",
          ["No existe primitiva elemental de e<sup>−t²</sup>, pero no hace falta: F′(x) = e<sup>−x²</sup> &gt; 0 para todo x ⟹ F es <b>estrictamente creciente</b>.",
           "F″(x) = −2x·e<sup>−x²</sup>: positiva si x &lt; 0 (convexa) y negativa si x &gt; 0 (cóncava) ⟹ <b>inflexión en x = 0</b>, donde F(0) = 0 y la pendiente es la máxima (F′(0) = 1).",
           "F es impar (el integrando es par), y tiende a un valor finito cuando x → ∞ (≈ 0,886 = √π/2): tiene dos asíntotas horizontales, y = ±√π/2."]) +
        ojo("Fallos típicos: (1) olvidar el factor g′(x): la derivada de " + I("0", "x²") + " f(t)dt <b>no</b> es f(x²), es f(x²)·2x; (2) escribir x dentro del integrando como si fuera la variable cuando también está en el límite; (3) olvidar el signo − cuando el extremo variable es el inferior.")
    },
    // -------------------------------------------------------------- 6
    {
      h: "6. Valor medio de una función y teorema del valor medio integral",
      html:
        "<p>El <b>valor medio</b> de f en [a, b] es la altura que tendría un rectángulo con la misma base b − a y la misma área que la región bajo la curva:</p>" +
        "<div class='formula-wrap'><div class='formula'>μ = (1/(b − a))·" + I("a", "b") + " f(x)dx</div></div>" +
        "<p><b>Teorema del valor medio integral</b>: si f es continua en [a, b], existe al menos un c ∈ [a, b] con <b>f(c)·(b − a) = " + I("a", "b") + " f(x)dx</b>, es decir, f(c) = μ. La función toma su valor medio en algún punto (por el teorema de los valores intermedios, ya que μ está entre el mínimo y el máximo de f). Puede haber más de un c. Arrastra c en el simulador hasta que el rectángulo verde iguale la zona azul.</p>" +
        w("m2t12_medio") +
        ejemplo("Valor medio y punto c", "Para f(x) = x² en [0, 3], halla el valor medio y el c del teorema.",
          [I("0", "3") + " x²dx = [x³/3] = 9. Longitud 3. μ = 9/3 = <b>3</b>.",
           "f(c) = c² = 3 ⟹ c = ±√3; solo √3 ≈ 1,732 está en [0, 3]. <b>c = √3</b>."]) +
        ejemplo("Dos valores de c", "Para f(x) = sen x en [0, π], halla μ y los c que cumplen el teorema.",
          [I("0", "π") + " sen x dx = [−cos x] = 2. μ = 2/π ≈ 0,637.",
           "sen c = 2/π ⟹ c = arcsen(2/π) ≈ 0,690 y c = π − 0,690 ≈ 2,452. Los dos están en [0, π]: el teorema asegura que existe al menos uno, no que sea único."]) +
        ejemplo("Datos para hallar un parámetro", "Se sabe que f(x) = ax² + 1 tiene valor medio 7 en [0, 3]. Halla a y el punto c.",
          ["μ = (1/3)·" + I("0", "3") + " (ax² + 1)dx = (1/3)·[ax³/3 + x] = (1/3)(9a + 3) = 3a + 1.",
           "3a + 1 = 7 ⟹ <b>a = 2</b>. Entonces f(x) = 2x² + 1 y f(c) = 7 ⟹ 2c² = 6 ⟹ <b>c = √3</b> ≈ 1,732."]) +
        "<p>Aplicaciones que aparecen en problemas de enunciado: la <i>temperatura media</i> de un día es el valor medio de T(t); la <i>velocidad media</i> es el valor medio de v(t) = (1/(b − a))" + I("a", "b") + " v dt = (espacio recorrido)/(tiempo). El teorema dice que en algún instante la velocidad instantánea coincide con la media.</p>" +
        ojo("Distingue los dos teoremas: el del valor medio <i>derivativo</i> (Lagrange) dice f′(c) = (f(b) − f(a))/(b − a); el <i>integral</i> dice f(c) = (1/(b − a))" + I("a", "b") + " f. Son parientes (aplica Lagrange a la F de la sección 5) pero hablan de f′ y de f respectivamente.")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Técnicas dentro de la integral definida",
      html:
        "<p>Los métodos del Tema 11 (cambio de variable, partes, racionales) se usan igual, con una ventaja: en la integral definida <b>puedes cambiar los límites</b> y no hace falta deshacer el cambio. Veamos los tres métodos y los valores absolutos.</p>" +
        ejemplo("Cambio de variable con cambio de límites", "Calcula (a) " + I("0", "1") + " 2x/(1 + x²) dx; (b) " + I("0", "1") + " x√(1 + x²) dx; (c) " + I("0", "π/2") + " sen x cos x dx.",
          ["<b>(a)</b> t = 1 + x², dt = 2x dx. Límites: x = 0 ⟹ t = 1; x = 1 ⟹ t = 2. " + I("1", "2") + " dt/t = [ln t] = ln 2 − ln 1 = <b>ln 2</b> ≈ 0,693.",
           "<b>(b)</b> t = 1 + x², x dx = dt/2; t va de 1 a 2. (1/2)" + I("1", "2") + " √t dt = (1/2)·[(2/3)t<sup>3/2</sup>] = (1/3)(2√2 − 1) = <b>(2√2 − 1)/3</b> ≈ 0,610.",
           "<b>(c)</b> t = sen x, dt = cos x dx; x = 0 ⟹ t = 0 y x = π/2 ⟹ t = 1. " + I("0", "1") + " t dt = <b>1/2</b>."]) +
        ejemplo("Integración por partes", "Calcula (a) " + I("0", "1") + " x·eˣ dx; (b) " + I("1", "e") + " ln x dx; (c) " + I("0", "π") + " x sen x dx.",
          ["Fórmula: " + I("a", "b") + " u dv = [uv]<sub>a</sub><sup>b</sup> − " + I("a", "b") + " v du.",
           "<b>(a)</b> u = x, dv = eˣdx: [x eˣ]<sub>0</sub><sup>1</sup> − " + I("0", "1") + " eˣdx = e − (e − 1) = <b>1</b>.",
           "<b>(b)</b> u = ln x, dv = dx: [x ln x]<sub>1</sub><sup>e</sup> − " + I("1", "e") + " dx = e − (e − 1) = <b>1</b>.",
           "<b>(c)</b> u = x, dv = sen x dx: [−x cos x]<sub>0</sub><sup>π</sup> + " + I("0", "π") + " cos x dx = π + [sen x] = <b>π</b>."]) +
        ejemplo("Fracciones simples", "Calcula " + I("0", "1") + " dx/((x + 1)(x + 2)).",
          ["Descomposición: 1/((x + 1)(x + 2)) = 1/(x + 1) − 1/(x + 2).",
           "[ln(x + 1) − ln(x + 2)]<sub>0</sub><sup>1</sup> = (ln 2 − ln 3) − (0 − ln 2) = 2 ln 2 − ln 3 = <b>ln(4/3)</b> ≈ 0,288."]) +
        ejemplo("Valor absoluto y funciones a trozos", "Calcula (a) " + I("0", "3") + " |x − 1| dx; (b) " + I("0", "2") + " f(x)dx con f(x) = x² si x ≤ 1 y f(x) = 2 − x si x &gt; 1.",
          ["<b>(a)</b> |x − 1| = 1 − x si x &lt; 1 y x − 1 si x ≥ 1. " + I("0", "1") + " (1 − x)dx + " + I("1", "3") + " (x − 1)dx = 1/2 + 2 = <b>5/2</b>. (La gráfica son dos triángulos: 1·1/2 + 2·2/2.)",
           "<b>(b)</b> Se parte en el punto de unión: " + I("0", "1") + " x²dx + " + I("1", "2") + " (2 − x)dx = 1/3 + [2x − x²/2]<sub>1</sub><sup>2</sup> = 1/3 + (4 − 2) − (2 − 1/2) = 1/3 + 1/2 = <b>5/6</b>. (f es continua en 1: f(1) = 1 por ambos lados.)"]) +
        "<p>Truco para ahorrar tiempo: <b>en el valor absoluto de una función polinómica</b>, busca primero las raíces dentro del intervalo; es exactamente el mismo proceso del área con cambio de signo. Por ejemplo, " + I("0", "2") + " |x² − 1| dx = " + I("0", "1") + " (1 − x²)dx + " + I("1", "2") + " (x² − 1)dx = 2/3 + 4/3 = <b>2</b>.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Parámetros, geometría y problemas de enunciado",
      html:
        "<p>En la EvAU la integral rara vez se pide «a pelo»: lo habitual es que haya un parámetro o un dato que debes usar para plantear una ecuación. Receta: <b>calcula la integral en función del parámetro y iguala</b>.</p>" +
        ejemplo("Límite de integración desconocido", "Halla a &gt; 0 para que " + I("0", "a") + " (2x + 1)dx = 6.",
          ["[x² + x]<sub>0</sub><sup>a</sup> = a² + a. Se iguala: a² + a = 6 ⟹ a² + a − 6 = 0 ⟹ a = 2 o a = −3.",
           "Como a &gt; 0: <b>a = 2</b>."]) +
        ejemplo("Parámetro en la curva", "Halla k &gt; 0 para que la región limitada por y = kx − x² y el eje X tenga área 36.",
          ["Raíces: kx − x² = x(k − x) = 0 ⟹ x = 0 y x = k. Entre ellas la parábola (hacia abajo) está por encima del eje.",
           "Área = " + I("0", "k") + " (kx − x²)dx = [kx²/2 − x³/3]<sub>0</sub><sup>k</sup> = k³/2 − k³/3 = k³/6.",
           "k³/6 = 36 ⟹ k³ = 216 ⟹ <b>k = 6</b>. (Ya se ve la regla: el área bajo la parábola de un arco es 1/6 del cubo de la base.)"]) +
        ejemplo("Curva y recta que pasan por un punto", "Región limitada por y = eˣ, la recta y = e y el eje Y.",
          ["eˣ = e ⟹ x = 1. Entre 0 y 1, eˣ ≤ e: la recta va por encima.",
           "Área = " + I("0", "1") + " (e − eˣ)dx = [ex − eˣ]<sub>0</sub><sup>1</sup> = (e − e) − (0 − 1) = <b>1</b>."]) +
        ejemplo("Curva con una asíntota: tres fronteras", "Área limitada por y = 1/x, y = x y x = 2.",
          ["Corte: 1/x = x ⟹ x = 1 (con x &gt; 0). En (1, 2): x = 1,5 da x = 1,5 &gt; 1/x = 0,667: la recta va por encima.",
           "Área = " + I("1", "2") + " (x − 1/x)dx = [x²/2 − ln x]<sub>1</sub><sup>2</sup> = (2 − ln 2) − 1/2 = <b>3/2 − ln 2</b> ≈ 0,807."]) +
        "<p><b>Problemas con funciones definidas por una integral</b>: si te dan F(x) = " + I("0", "x") + " f(t)dt, entonces F(0) siempre vale 0 (límites iguales). Si te dan F(a) y F(b), entonces " + I("a", "b") + " f = F(b) − F(a). Y si f viene dada solo por su gráfica, la integral se lee como suma de áreas con signo (cuadraditos).</p>"
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Volumen de un cuerpo de revolución (ampliación)",
      html:
        "<p>Si la región bajo y = f(x) entre a y b gira alrededor del eje X, se engendra un sólido cuyo volumen es la suma de discos de radio f(x) y espesor dx:</p>" +
        "<div class='formula-wrap'><div class='formula'>V = π·" + I("a", "b") + " [f(x)]² dx</div></div>" +
        "<p>Este apartado suele quedar fuera de la EvAU de Madrid, pero entrena la misma herramienta y sirve de comprobación geométrica.</p>" +
        ejemplo("Tres volúmenes", "Calcula el volumen al girar sobre el eje X: (a) y = √x en [0, 4]; (b) y = x en [0, 1]; (c) y = sen x en [0, π].",
          ["<b>(a)</b> V = π" + I("0", "4") + " x dx = π·[x²/2] = <b>8π</b> ≈ 25,13.",
           "<b>(b)</b> V = π" + I("0", "1") + " x²dx = <b>π/3</b>: es un cono de radio 1 y altura 1, cuyo volumen conocido es (1/3)π·1²·1 ✓.",
           "<b>(c)</b> V = π" + I("0", "π") + " sen²x dx = π·[x/2 − sen 2x/4] = π·(π/2) = <b>π²/2</b> ≈ 4,93. (Se usa sen²x = (1 − cos 2x)/2.)"])
    }
  ];

  B.parte.m2t12b = { nuevas: nuevas };
})(window);
