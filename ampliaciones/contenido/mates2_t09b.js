/* ============================================================
   Matemáticas II · ampliaciones · Tema 9: Aplicaciones de la derivada
   (parte B: secciones nuevas 5 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t9/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 5
    {
      h: "5. Crecimiento, decrecimiento y extremos relativos",
      html:
        "<p>El signo de la derivada manda: si <b>f′ &gt; 0</b> en un intervalo, f es <b>estrictamente creciente</b> ahí; si <b>f′ &lt; 0</b>, estrictamente decreciente. Un <b>extremo relativo</b> (o local) es un punto donde f deja de crecer para decrecer (máximo) o al revés (mínimo). Si f es derivable, en un extremo la tangente es horizontal: <b>f′(a) = 0</b>. Pero ojo, la implicación no se puede invertir: f′(a) = 0 es necesaria, no suficiente.</p>" +
        w("m2_signos") +
        "<h5>Procedimiento (siempre el mismo)</h5>" +
        "<ol><li><b>Dominio</b> de f.</li><li><b>Calcula f′</b> y factorízala.</li><li><b>Puntos críticos:</b> los x del dominio donde f′(x) = 0 <b>o donde f′ no existe</b>.</li>" +
        "<li><b>Tabla de signos:</b> coloca en una recta los puntos críticos <b>y los puntos fuera del dominio</b>; en cada intervalo mira el signo de f′ con un valor de prueba.</li>" +
        "<li><b>Concluye:</b> f′ pasa de + a − ⟹ máximo; de − a + ⟹ mínimo; sin cambio de signo ⟹ no hay extremo.</li></ol>" +
        ejemplo("Tabla de signos de un cúbico",
          "Estudia la monotonía y los extremos relativos de f(x) = x³ − 3x² − 9x + 5.",
          ["Dominio: ℝ. f′(x) = 3x² − 6x − 9 = 3(x² − 2x − 3) = 3(x + 1)(x − 3).",
           "Puntos críticos: f′ = 0 ⟹ x = −1 y x = 3.",
           tabla(["Intervalo", "(−∞, −1)", "(−1, 3)", "(3, +∞)"], [["Signo de f′ (valor de prueba)", "+ (x = −2: 15)", "− (x = 0: −9)", "+ (x = 4: 15)"], ["f", "creciente", "decreciente", "creciente"]]),
           "En x = −1 pasa de + a −: <b>máximo relativo</b>, f(−1) = −1 − 3 + 9 + 5 = <b>10</b>. En x = 3 pasa de − a +: <b>mínimo relativo</b>, f(3) = 27 − 27 − 27 + 5 = <b>−22</b>.",
           "Comprobación con f″(x) = 6x − 6: f″(−1) = −12 &lt; 0 (máximo) y f″(3) = 12 &gt; 0 (mínimo). ✓"]) +
        ejemplo("Un dominio restringido",
          "Estudia f(x) = x ln x.",
          ["Dominio: x &gt; 0. f′(x) = ln x + 1.",
           "f′ = 0 ⟹ ln x = −1 ⟹ x = 1/e ≈ 0,368.",
           "Si 0 &lt; x &lt; 1/e, ln x &lt; −1 y f′ &lt; 0: decrece. Si x &gt; 1/e, f′ &gt; 0: crece.",
           "<b>Mínimo relativo</b> en x = 1/e con f(1/e) = (1/e)·(−1) = <b>−1/e ≈ −0,368</b>. (Además es mínimo absoluto en todo el dominio.)"]) +
        ejemplo("Un punto donde f′ no existe",
          "Estudia f(x) = x<sup>2/3</sup> = ∛(x²).",
          ["Dominio: ℝ. f′(x) = (2/3)x<sup>−1/3</sup> = 2/(3∛x), que no existe en x = 0 (aunque f sí está definida allí).",
           "x &lt; 0: ∛x &lt; 0 ⟹ f′ &lt; 0 (decrece). x &gt; 0: f′ &gt; 0 (crece).",
           "En x = 0 hay un <b>mínimo relativo</b> (de hecho absoluto, f(0) = 0) con una cúspide: f′(0) no existe y no vale la regla «f′ = 0»."]) +
        "<h5>Criterio de la segunda derivada (y cuándo falla)</h5>" +
        "<p>Si f′(a) = 0: <b>f″(a) &gt; 0 ⟹ mínimo</b> (f curvada hacia arriba), <b>f″(a) &lt; 0 ⟹ máximo</b>. Si <b>f″(a) = 0, el criterio no decide</b>: hay que mirar el signo de f′ a cada lado, o seguir derivando (si la primera derivada no nula es de orden <b>par</b>, hay extremo —mínimo si es &gt; 0, máximo si es &lt; 0—; si es <b>impar</b>, no lo hay).</p>" +
        tabla(["Función en x = 0", "f′(0), f″(0), …", "Conclusión"], [
          ["f(x) = x²", "f′ = 0, f″ = 2 &gt; 0", "mínimo"],
          ["f(x) = −x⁴", "f′ = f″ = f‴ = 0, f⁗ = −24 &lt; 0", "máximo (el criterio de f″ falla, pero el orden par decide)"],
          ["f(x) = x⁴", "f′ = f″ = f‴ = 0, f⁗ = 24 &gt; 0", "mínimo"],
          ["f(x) = x³", "f′ = f″ = 0, f‴ = 6 ≠ 0 (orden impar)", "no hay extremo (es una inflexión)"]
        ]) +
        ojo("<b>Extremo relativo no es lo mismo que mayor o menor valor.</b> Una función puede tener un «máximo» relativo más bajo que su «mínimo» relativo (por ejemplo f(x) = x²/(x − 1): máximo relativo 0 en x = 0, mínimo relativo 4 en x = 2; mira la sección 10). Que sea máximo solo significa «mayor que sus vecinos».") +
        ojo("Si te piden los intervalos de crecimiento, no olvides los puntos fuera del dominio: aunque f′ no cambie de signo en x = 1, si x = 1 no está en el dominio no puedes escribir «crece en (−∞, ∞)»: son intervalos separados.")
    },
    // -------------------------------------------------------------- 6
    {
      h: "6. Curvatura y puntos de inflexión",
      html:
        "<p>La segunda derivada mide cómo cambia la pendiente. Si <b>f″ &gt; 0</b> en un intervalo, f′ crece y la gráfica se curva hacia arriba (forma ∪): f es <b>convexa</b>. Si <b>f″ &lt; 0</b>, f′ decrece y la gráfica se curva hacia abajo (∩): f es <b>cóncava</b>. Un <b>punto de inflexión</b> es donde cambia la curvatura: f″ cambia de signo, y por tanto f″(a) = 0 (si f″ existe).</p>" +
        ojo("<b>Terminología:</b> en los libros españoles y en los exámenes de Madrid lo habitual es «convexa» = ∪ (f″ &gt; 0) y «cóncava» = ∩ (f″ &lt; 0), pero algunos textos usan los nombres al revés. Para evitar malentendidos, escribe siempre el signo de f″ o el dibujo ∪ / ∩ junto al nombre.") +
        "<h5>Procedimiento</h5>" +
        "<ol><li>Calcula f″ y resuelve f″(x) = 0 (también anota dónde f″ no existe).</li><li>Haz una tabla con el signo de f″ en cada intervalo.</li><li>Hay inflexión en a si <b>f″ cambia de signo</b> en a (o, si f‴(a) ≠ 0 y f″(a) = 0, basta con eso).</li></ol>" +
        ejemplo("Dos inflexiones y un extremo",
          "Estudia la curvatura de f(x) = x⁴ − 4x³ y halla sus extremos y puntos de inflexión.",
          ["f′(x) = 4x³ − 12x² = 4x²(x − 3); f″(x) = 12x² − 24x = 12x(x − 2).",
           tabla(["Intervalo", "(−∞, 0)", "(0, 2)", "(2, +∞)"], [["Signo de f″", "+", "−", "+"], ["Curvatura", "convexa ∪", "cóncava ∩", "convexa ∪"]]),
           "f″ cambia de signo en x = 0 y en x = 2: <b>inflexiones en (0, 0) y en (2, −16)</b> (f(2) = 16 − 32 = −16).",
           "Extremos: f′ = 0 en x = 0 y x = 3. En x = 0, f′ = 4x²(x − 3) es negativa a ambos lados (el factor x² no cambia de signo): <b>no hay extremo</b> (es una inflexión con tangente horizontal). En x = 3, f″(3) = 36 &gt; 0: <b>mínimo</b> con f(3) = 81 − 108 = −27."]) +
        ejemplo("La campana de Gauss",
          "Halla los puntos de inflexión de f(x) = e<sup>−x²</sup>.",
          ["f′(x) = −2x e<sup>−x²</sup>. f″(x) = −2e<sup>−x²</sup> + 4x² e<sup>−x²</sup> = (4x² − 2)e<sup>−x²</sup>.",
           "Como e<sup>−x²</sup> &gt; 0, f″ = 0 ⟺ 4x² = 2 ⟺ x = ±1/√2 ≈ ±0,707.",
           "El factor (4x² − 2) es + fuera de [−0,707; 0,707] y − dentro: cambia de signo en ambos puntos.",
           "Inflexiones en (±1/√2, e<sup>−1/2</sup>) ≈ (±0,707; 0,607). (Además f tiene un máximo en x = 0, donde f″(0) = −2 &lt; 0.)"]) +
        ojo("<b>f″(a) = 0 no basta para que haya inflexión</b>: f(x) = x⁴ cumple f″(0) = 0 y en x = 0 hay un <i>mínimo</i>, porque f″ = 12x² es ≥ 0 a ambos lados (no cambia de signo). Y al revés: en x = 0, f(x) = x³ tiene inflexión sin extremo.") +
        "<p>Geométricamente, en un punto de inflexión <b>la tangente atraviesa a la curva</b> (la curva pasa de estar por un lado de su tangente a estar por el otro). La recta tangente en la inflexión es una pregunta típica: se calcula con f′(a) y f(a) como siempre.</p>" +
        ejemplo("Tangente en la inflexión",
          "Halla la recta tangente a f(x) = x³ − 3x² + 2x en su punto de inflexión.",
          ["f″(x) = 6x − 6 = 0 ⟹ x = 1, y f″ cambia de − a +: inflexión en x = 1, con f(1) = 1 − 3 + 2 = 0.",
           "f′(x) = 3x² − 6x + 2 ⟹ f′(1) = −1.",
           "Tangente: y − 0 = −1·(x − 1), es decir <b>y = −x + 1</b>."])
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Extremos absolutos en un intervalo cerrado",
      html:
        "<p>Los extremos <b>absolutos</b> son el mayor y el menor valor de f en todo un intervalo. El <b>teorema de Weierstrass</b> garantiza que existen si <b>f es continua en un intervalo cerrado y acotado [a, b]</b>. Dónde están: o en los <b>extremos del intervalo</b>, o en un <b>punto crítico del interior</b> (f′ = 0 o f′ no existe). Por eso el método es simplemente comparar.</p>" +
        w("m2_absolutos") +
        "<ol><li>Comprueba que f es continua en [a, b].</li><li>Halla los puntos críticos que estén dentro de (a, b) (descarta los que caigan fuera).</li><li>Calcula f en <b>todos</b> los candidatos: los puntos críticos, a y b. No hace falta clasificarlos.</li><li>El mayor valor es el máximo absoluto; el menor, el mínimo absoluto. Indica <b>dónde</b> se alcanzan.</li></ol>" +
        ejemplo("Un cúbico en [0, 5]",
          "Halla los extremos absolutos de f(x) = x³ − 6x² + 9x + 1 en [0, 5].",
          ["f es un polinomio: continua. f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) ⟹ puntos críticos x = 1 y x = 3, ambos en (0, 5).",
           tabla(["x", "0", "1", "3", "5"], [["f(x)", "1", "5", "1", "21"]]),
           "f(5) = 125 − 150 + 45 + 1 = 21. <b>Máximo absoluto 21 en x = 5</b> (un extremo del intervalo, no un punto crítico). <b>Mínimo absoluto 1</b>, alcanzado en x = 0 <b>y</b> en x = 3 (empate).",
           "Fíjate: x = 1 es máximo <i>relativo</i> (f = 5), pero no es el máximo absoluto."]) +
        ejemplo("Un valor absoluto: los puntos angulares también cuentan",
          "Halla los extremos absolutos de f(x) = |x² − 1| en [−2, 2].",
          ["Escribimos f(x) = x² − 1 si |x| ≥ 1 y f(x) = 1 − x² si |x| &lt; 1. Es continua.",
           "Derivada: f′ = 2x si |x| &gt; 1; f′ = −2x si |x| &lt; 1. En x = ±1 los dos lados no coinciden (2 ≠ −2): f no es derivable, <b>candidatos</b>. En x = 0: f′ = 0, candidato.",
           tabla(["x", "−2", "−1", "0", "1", "2"], [["f(x)", "3", "0", "1", "0", "3"]]),
           "<b>Máximo absoluto 3</b> en x = ±2; <b>mínimo absoluto 0</b> en x = ±1 (los dos puntos angulares). El punto x = 0 es máximo relativo con valor 1."]) +
        ejemplo("Función a trozos",
          "Halla los extremos absolutos de f(x) = x² si x ≤ 1 y f(x) = 2 − x si x &gt; 1, en [−1, 3].",
          ["Continua en x = 1 (los dos trozos valen 1). Candidatos: extremos −1 y 3; x = 0 (donde 2x = 0); x = 1 (donde f′ cambia de 2 a −1, no derivable).",
           tabla(["x", "−1", "0", "1", "3"], [["f(x)", "1", "0", "1", "−1"]]),
           "<b>Máximo absoluto 1</b>, en x = −1 y en x = 1; <b>mínimo absoluto −1</b> en x = 3."]) +
        "<h5>Si el intervalo no es cerrado o f no es continua</h5>" +
        "<p>Entonces Weierstrass no garantiza nada y hay que <b>mirar los límites en los bordes</b>. Por ejemplo f(x) = x + 1/x en (0, +∞): f′ = 1 − 1/x² = 0 ⟹ x = 1, con f(1) = 2 y f″(1) = 2 &gt; 0. Como f → +∞ en x → 0⁺ y en x → +∞, el valor 2 es el <b>mínimo absoluto</b>; no hay máximo absoluto.</p>" +
        ojo("«f continua en [a, b] ⟹ máximo y mínimo» es lo que dice el teorema. «f no continua en [a, b] ⟹ no hay» <b>no</b> es cierto: simplemente no está garantizado. Por ejemplo f(x) = 1/x en [1, 3] sí tiene máximo (f(1) = 1) y mínimo (f(3) = 1/3); en [−1, 1] no, por la asíntota en 0.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Hallar parámetros a partir de condiciones",
      html:
        "<p>Este es <b>el tipo de pregunta con más trampa en la EvAU</b>: se da una función con parámetros (a, b, c…) y se imponen condiciones geométricas que hay que traducir a ecuaciones. Cada condición produce <b>una ecuación</b>; con n parámetros necesitas n ecuaciones independientes.</p>" +
        tabla(["El enunciado dice…", "Se traduce en…"], [
          ["«pasa por el punto (x₀, y₀)»", "f(x₀) = y₀"],
          ["«tiene un extremo (máximo o mínimo) en x = x₀»", "f′(x₀) = 0"],
          ["«tiene un extremo en el punto (x₀, y₀)»", "f′(x₀) = 0  y  f(x₀) = y₀"],
          ["«tiene un punto de inflexión en x = x₀»", "f″(x₀) = 0 (y f″ cambia de signo)"],
          ["«la tangente en x₀ es horizontal»", "f′(x₀) = 0"],
          ["«la tangente en x₀ tiene pendiente m» / «es paralela a y = mx + n»", "f′(x₀) = m"],
          ["«la tangente en x₀ es la recta y = mx + n»", "f′(x₀) = m  y  f(x₀) = m x₀ + n"],
          ["«es continua / derivable en x₀» (función a trozos)", "Lateral izquierdo = lateral derecho = f(x₀);  y para derivable, también f′(x₀⁻) = f′(x₀⁺)"]
        ]) +
        w("m2_parametros") +
        ejemplo("Tres parámetros",
          "Halla a, b y c para que f(x) = x³ + ax² + bx + c tenga un punto de inflexión en x = −1, un mínimo relativo en x = 1 y corte al eje Y en el punto (0, 2).",
          ["f′(x) = 3x² + 2ax + b y f″(x) = 6x + 2a.",
           "Inflexión en x = −1: f″(−1) = −6 + 2a = 0 ⟹ <b>a = 3</b>.",
           "Mínimo en x = 1: f′(1) = 3 + 2a + b = 3 + 6 + b = 0 ⟹ <b>b = −9</b>.",
           "Corte con el eje Y: f(0) = c = 2 ⟹ <b>c = 2</b>.",
           "<b>Comprobación (imprescindible):</b> f(x) = x³ + 3x² − 9x + 2. f′ = 3(x + 3)(x − 1): en x = 1, f″(1) = 12 &gt; 0 ✓ (mínimo, f(1) = −3). f″(x) = 6(x + 1) cambia de signo en x = −1 ✓ (inflexión, f(−1) = 13)."]) +
        ejemplo("Dos extremos dados",
          "Halla a y b para que f(x) = a ln x + b x² + x tenga extremos relativos en x = 1 y en x = 2. Clasifícalos.",
          ["f′(x) = a/x + 2bx + 1. Condiciones: f′(1) = a + 2b + 1 = 0 y f′(2) = a/2 + 4b + 1 = 0.",
           "De la primera, a = −1 − 2b. En la segunda: (−1 − 2b)/2 + 4b + 1 = 0 ⟹ −1/2 − b + 4b + 1 = 0 ⟹ 3b = −1/2 ⟹ <b>b = −1/6</b>, y <b>a = −1 + 1/3 = −2/3</b>.",
           "Clasificación con f″(x) = −a/x² + 2b = (2/3)/x² − 1/3: f″(1) = 1/3 &gt; 0 ⟹ <b>mínimo en x = 1</b>; f″(2) = 1/6 − 1/3 = −1/6 &lt; 0 ⟹ <b>máximo en x = 2</b>."]) +
        ejemplo("Tangente con pendiente conocida",
          "Halla a y b para que la gráfica de f(x) = ax³ + bx² pase por (1, 3) y tenga en ese punto tangente de pendiente 5. Escribe la tangente.",
          ["f(1) = a + b = 3. f′(x) = 3ax² + 2bx ⟹ f′(1) = 3a + 2b = 5.",
           "De la primera, b = 3 − a. En la segunda: 3a + 6 − 2a = 5 ⟹ <b>a = −1</b>, <b>b = 4</b>.",
           "f(x) = −x³ + 4x². Tangente en x = 1: y − 3 = 5(x − 1), es decir <b>y = 5x − 2</b>."]) +
        ojo("Tras resolver, <b>comprueba</b> con los parámetros hallados que se cumple lo que decía el enunciado (por ejemplo, que el punto es de verdad un mínimo y no un máximo). Un error frecuente es plantear f′ = 0 con la función equivocada o derivar mal el parámetro: a·ln x se deriva como a/x, no como ln x.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Problemas de optimización con enunciado",
      html:
        "<p>Los problemas de la EvAU de Madrid son siempre de uno de estos cuatro tipos: <b>geométricos</b> (áreas, volúmenes con perímetro o superficie dados), <b>de distancia</b>, <b>económicos</b> (beneficio, coste, ingresos) y <b>de tiempo o movimiento</b>. El método es el de la sección 4; aquí aprendes a justificar bien y a ver las trampas.</p>" +
        ejemplo("Lata de 1 litro (geométrico)",
          "Se quiere fabricar una lata cilíndrica de 1 litro (1000 cm³). ¿Qué dimensiones usan menos chapa?",
          ["<b>Plantear.</b> Superficie S = 2πr² + 2πrh. Volumen: πr²h = 1000 ⟹ h = 1000/(πr²). Sustituyendo: S(r) = 2πr² + 2000/r, con <b>r &gt; 0</b>.",
           "<b>Derivar.</b> S′(r) = 4πr − 2000/r² = 0 ⟹ r³ = 500/π ⟹ <b>r ≈ 5,419 cm</b>.",
           "<b>Justificar.</b> S″(r) = 4π + 4000/r³ &gt; 0 en todo el dominio ⟹ mínimo. Como S → ∞ cuando r → 0⁺ y r → ∞, es el mínimo absoluto.",
           "<b>Responder.</b> r ≈ 5,42 cm, h = 1000/(πr²) ≈ 10,84 cm (es decir h = 2r) y S ≈ <b>553,6 cm²</b>."]) +
        ejemplo("Punto más cercano (distancia)",
          "Halla los puntos de la parábola y = x² más próximos al punto (0, 3).",
          ["<b>Plantear.</b> Un punto es (x, x²). Su distancia al cuadrado: d² = x² + (x² − 3)² = x⁴ − 5x² + 9. (Minimizar d² da los mismos puntos que minimizar d.)",
           "<b>Derivar.</b> (d²)′ = 4x³ − 10x = 2x(2x² − 5) = 0 ⟹ x = 0 o x = ±√(5/2) ≈ ±1,581.",
           "<b>Justificar.</b> (d²)″ = 12x² − 10: en x = 0 vale −10 &lt; 0 (es un máximo local, d² = 9); en x = ±√(5/2) vale 20 &gt; 0 (mínimos).",
           "<b>Responder.</b> Hay <b>dos</b> puntos: (±√(5/2), 5/2) ≈ (±1,58; 2,5), con d² = 25/4 − 25/2 + 9 = 11/4, es decir d = √11/2 ≈ 1,66."]) +
        ejemplo("El óptimo puede estar en el borde del dominio (económico)",
          "El beneficio al vender un producto a p euros es B(p) = (p − 20)(400 − 5p). Por un acuerdo con el distribuidor, el precio no puede superar 40 €. ¿Qué precio maximiza el beneficio?",
          ["<b>Plantear.</b> B(p) = −5p² + 500p − 8000, con dominio <b>20 ≤ p ≤ 40</b> (cerrado: ahora Weierstrass nos sirve).",
           "<b>Derivar.</b> B′(p) = −10p + 500 = 0 ⟹ p = 50, que <b>no está en [20, 40]</b>: se descarta.",
           "<b>Comparar los extremos.</b> B(20) = 0; B(40) = 20 · 200 = 4000. En todo el intervalo B′ &gt; 0 (B crece), así que el máximo está en el extremo derecho.",
           "<b>Responder.</b> p = 40 €, con un beneficio de <b>4000 €</b>. Sin la restricción habría sido p = 50 y 4500 €."]) +
        w("optimizar2") +
        "<h5>Qué trampas buscan los examinadores</h5>" +
        "<ul>" +
        "<li><b>Olvidar el dominio.</b> Sin él no puedes descartar soluciones ni comparar con los bordes.</li>" +
        "<li><b>No justificar.</b> «Es máximo porque A″ &lt; 0» o «porque f′ pasa de + a −» son frases obligatorias.</li>" +
        "<li><b>Responder solo con x.</b> Si piden las dimensiones, da todas; si piden el valor máximo, da el valor (área, beneficio…), no el x.</li>" +
        "<li><b>Unidades</b> y coherencia: un radio de −3 o una longitud mayor que la valla disponible delata un error.</li>" +
        "<li><b>Dos variables sin eliminar.</b> Si en la función aparecen x e y, falta usar la condición del enunciado.</li></ul>"
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Un estudio completo, paso a paso",
      html:
        "<p>Reúne todo lo anterior en el estudio de una función racional. Es la base de la representación gráfica (tema siguiente).</p>" +
        ejemplo("Estudio de f(x) = x²/(x − 1)",
          "Halla el dominio, las asíntotas, los intervalos de crecimiento, los extremos y la curvatura de f(x) = x²/(x − 1).",
          ["<b>Dominio:</b> x ≠ 1, es decir ℝ − {1}.",
           "<b>Asíntotas:</b> en x = 1 el numerador vale 1 ≠ 0: <b>asíntota vertical x = 1</b> (lím<sub>x→1⁻</sub> = −∞, lím<sub>x→1⁺</sub> = +∞). Al dividir, x²/(x − 1) = x + 1 + 1/(x − 1): <b>asíntota oblicua y = x + 1</b> (a ambos lados).",
           "<b>Primera derivada:</b> f′(x) = [2x(x − 1) − x²]/(x − 1)² = (x² − 2x)/(x − 1)² = x(x − 2)/(x − 1)². Se anula en x = 0 y x = 2.",
           tabla(["Intervalo", "(−∞, 0)", "(0, 1)", "(1, 2)", "(2, +∞)"], [["Signo de f′", "+", "−", "−", "+"], ["f", "crece", "decrece", "decrece", "crece"]]),
           "<b>Extremos relativos:</b> máximo en (0, 0) (f pasa de crecer a decrecer) y mínimo en (2, 4). Fíjate: el «máximo» (0) es menor que el «mínimo» (4); como la función no es continua en x = 1, son extremos solo <i>relativos</i>.",
           "<b>Segunda derivada:</b> f″(x) = 2/(x − 1)³. Nunca se anula: <b>no hay puntos de inflexión</b>. Para x &lt; 1, f″ &lt; 0 (cóncava ∩); para x &gt; 1, f″ &gt; 0 (convexa ∪). El cambio en x = 1 no es una inflexión porque x = 1 no pertenece al dominio.",
           "<b>Comprobación:</b> f″(0) = −2 &lt; 0 ✓ (máximo) y f″(2) = 2 &gt; 0 ✓ (mínimo)."]) +
        ojo("Un cambio de curvatura en un punto <b>fuera del dominio</b> (una asíntota vertical) no es un punto de inflexión: un punto de inflexión es un punto de la gráfica.")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para resolver un problema de optimización.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t9b = { nuevas: nuevas };
})(window);
