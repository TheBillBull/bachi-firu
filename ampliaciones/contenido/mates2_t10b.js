/* ============================================================
   Matemáticas II · ampliaciones · Tema 10: Estudio y representación de funciones
   (parte B: secciones nuevas 7 a 13)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t10/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Funciones racionales: el estudio completo",
      html:
        "<p>Es el tipo que más cae. Toda la información sale de factorizar bien numerador y denominador y de dos derivadas con fracciones: <b>(u/v)′ = (u′v − uv′)/v²</b>. Una pista: en f′ y en f″ el denominador es siempre una potencia de v (v² y v³), luego su signo ya lo conoces; el trabajo está en el numerador.</p>" +
        ejemplo("Estudio completo de una racional con asíntota oblicua", "Estudia f(x) = x²/(x − 1) y esboza su gráfica.",
          ["<b>1. Dominio y simetría.</b> Dom(f) = ℝ − {1}. Sin simetría: f(−2) = −4/3 y f(2) = 4, que no son iguales ni opuestos.",
           "<b>2. Cortes y signo.</b> f(0) = 0 y x² = 0 ⟹ el único corte es (0, 0). Como x² ≥ 0, el signo es el de (x − 1): f &lt; 0 si x &lt; 1 (salvo f(0) = 0) y f &gt; 0 si x &gt; 1.",
           "<b>3. Asíntotas.</b> Vertical x = 1: lím<sub>x→1⁺</sub> = +∞ (1/0⁺) y lím<sub>x→1⁻</sub> = −∞. Dividiendo: x²/(x − 1) = x + 1 + 1/(x − 1), así que la oblicua es <b>y = x + 1</b>; la diferencia f − (x + 1) = 1/(x − 1) es positiva a la derecha (la curva va por encima) y negativa a la izquierda (por debajo).",
           "<b>4. Monotonía.</b> f′ = [2x(x − 1) − x²]/(x − 1)² = (x² − 2x)/(x − 1)² = x(x − 2)/(x − 1)². Signo del numerador: + si x &lt; 0, − si 0 &lt; x &lt; 2, + si x &gt; 2. Crece en (−∞, 0) y (2, +∞); decrece en (0, 1) y (1, 2). <b>Máximo relativo (0, 0)</b>, <b>mínimo relativo (2, 4)</b>.",
           "<b>5. Curvatura.</b> Como f = x + 1 + 1/(x − 1), f′ = 1 − 1/(x − 1)² y f″ = 2/(x − 1)³. Signo = el de (x − 1): cóncava en (−∞, 1), convexa en (1, +∞). Sin inflexiones (x = 1 no está en el dominio).",
           "<b>6. Esbozo.</b> Por la izquierda, la curva viene de abajo junto a y = x + 1, sube cóncava hasta el máximo (0, 0) y baja hacia −∞ pegada a x = 1. Por la derecha sale de +∞ junto a x = 1, baja convexa hasta el mínimo (2, 4) y sube pegada a la oblicua."]) +
        tabla(["Intervalo", "Signo de f′", "Signo de f″", "Forma de la curva"], [
          ["(−∞, 0)", "+", "−", "sube, cóncava ↗∩"],
          ["(0, 1)", "−", "−", "baja, cóncava ↘∩ (hacia −∞)"],
          ["(1, 2)", "−", "+", "baja, convexa ↘∪ (desde +∞)"],
          ["(2, +∞)", "+", "+", "sube, convexa ↗∪"]
        ]) +
        "<p>Esta <b>tabla de formas</b> (cuatro tipos: ↗∩, ↘∩, ↘∪, ↗∪) es la mejor ayuda para dibujar: en cada tramo sabes exactamente qué trozo de curva tienes que trazar. Compruébalo con el estudio guiado (elige la primera función).</p>" +
        ejemplo("Racional par con dos asíntotas verticales", "Estudia la monotonía y la curvatura de f(x) = x²/(x² − 4).",
          ["Dom = ℝ − {−2, 2}; es par. Corte: (0, 0). Asíntotas (ya vistas): x = ±2 e y = 1.",
           "f′ = [2x(x² − 4) − x²·2x]/(x² − 4)² = −8x/(x² − 4)². El signo es el de −x: f′ &gt; 0 si x &lt; 0 y f′ &lt; 0 si x &gt; 0. Crece en (−∞, −2) y (−2, 0); decrece en (0, 2) y (2, +∞). <b>Máximo relativo (0, 0)</b>.",
           "f″ = 8(3x² + 4)/(x² − 4)³. El numerador es siempre positivo, así que el signo es el de x² − 4: convexa si |x| &gt; 2 y cóncava si |x| &lt; 2. <b>No hay inflexiones</b> (±2 no están en el dominio).",
           "Ojo: (0, 0) es máximo <i>relativo</i>, no absoluto (la función llega a +∞ junto a las asíntotas)."]) +
        ojo("En una fracción, <b>no simplifiques antes de estudiar el dominio y las asíntotas</b>: si una raíz anula numerador y denominador, es un hueco (como en el ejemplo de f(x) = (x² − x − 2)/(x² − 4) de antes), no una asíntota. Y recuerda que puedes simplificar para derivar con más comodidad, siempre que luego excluyas ese punto.") +
        "<p>Más ejemplos para practicar con el estudio guiado: 2x/(x² − 1) tiene dos verticales, una horizontal y una inflexión en el origen sin ningún extremo; mira cómo la tabla de formas lo explica.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Funciones exponenciales y logarítmicas",
      html:
        "<p>Aquí aparecen los límites donde «gana el más fuerte». Con ellos se calculan casi todas las asíntotas y se resuelven los 0·∞ y ∞/∞:</p>" +
        tabla(["Si x → +∞", "Resultado", "Quién gana"], [
          ["xⁿ·e<sup>−x</sup> = xⁿ/eˣ", "0", "La exponencial gana a cualquier potencia"],
          ["(ln x)/xⁿ", "0", "Cualquier potencia gana al logaritmo"],
          ["eˣ/xⁿ", "+∞", "La exponencial gana"]
        ]) +
        tabla(["Si x → 0⁺", "Resultado", "Cómo se hace"], [
          ["xⁿ·ln x (n &gt; 0)", "0", "Se escribe (ln x)/x<sup>−n</sup> y L'Hôpital"],
          ["ln x", "−∞", "Da asíntota vertical x = 0 en f(x) = ln x o (ln x)/x"]
        ]) +
        ejemplo("Exponencial por polinomio", "Estudia f(x) = x·e<sup>−x</sup> y esboza su gráfica.",
          ["<b>Dominio</b> ℝ. Sin simetría. <b>Cortes</b>: (0, 0) en ambos ejes. <b>Signo</b>: el de x (e<sup>−x</sup> &gt; 0).",
           "<b>Asíntotas.</b> x → +∞: x/eˣ → 0 (L'Hôpital: 1/eˣ → 0), asíntota horizontal y = 0, con f &gt; 0 (por encima). x → −∞: f → −∞ y f(x)/x = e<sup>−x</sup> → +∞: <b>rama parabólica</b>, sin asíntota. No hay verticales (f es continua en ℝ).",
           "<b>Monotonía.</b> f′ = e<sup>−x</sup> − xe<sup>−x</sup> = (1 − x)e<sup>−x</sup>. Crece en (−∞, 1), decrece en (1, +∞): <b>máximo relativo (1, 1/e)</b> ≈ (1; 0,368).",
           "<b>Curvatura.</b> f″ = −e<sup>−x</sup> − (1 − x)e<sup>−x</sup> = (x − 2)e<sup>−x</sup>. Cóncava en (−∞, 2), convexa en (2, +∞): <b>inflexión (2, 2/e²)</b> ≈ (2; 0,271).",
           "<b>Esbozo.</b> Sube desde −∞ (cóncava) hasta el máximo (1; 0,37), baja cóncava hasta la inflexión (2; 0,27), y desde ahí sigue bajando convexa, pegada al eje X por encima."]) +
        ejemplo("Logaritmo dividido por x", "Estudia f(x) = (ln x)/x y esboza su gráfica.",
          ["<b>Dominio</b> (0, +∞). <b>Cortes</b>: no corta al eje Y; ln x = 0 ⟹ (1, 0). <b>Signo</b>: f &lt; 0 en (0, 1), f &gt; 0 en (1, +∞).",
           "<b>Asíntotas.</b> x → 0⁺: ln x → −∞ y x → 0⁺ ⟹ f → −∞: vertical <b>x = 0</b>. x → +∞: (ln x)/x → 0 (L'Hôpital: (1/x)/1): horizontal <b>y = 0</b> por encima.",
           "<b>Monotonía.</b> f′ = (1 − ln x)/x². Se anula en ln x = 1, o sea x = e. Crece en (0, e), decrece en (e, +∞): <b>máximo (e, 1/e)</b> ≈ (2,718; 0,368).",
           "<b>Curvatura.</b> f″ = [−(1/x)·x² − (1 − ln x)·2x]/x⁴ = (2 ln x − 3)/x³. Se anula en ln x = 3/2, o sea x = e<sup>3/2</sup> ≈ 4,482: cóncava en (0, e<sup>3/2</sup>) y convexa después. <b>Inflexión</b> (e<sup>3/2</sup>, 3/(2e<sup>3/2</sup>)) ≈ (4,482; 0,335)."]) +
        ejemplo("Cuando no hay asíntota vertical aunque falte el 0", "Estudia f(x) = x·ln x.",
          ["Dominio (0, +∞). En x = 0⁺: x·ln x es 0·(−∞); se pasa a (ln x)/(1/x) y L'Hôpital da (1/x)/(−1/x²) = −x → 0. <b>El límite es 0, finito: no hay asíntota vertical</b>; la curva termina en un punto abierto (0, 0).",
           "Corte: ln x = 0 ⟹ (1, 0). Signo: f &lt; 0 en (0, 1), f &gt; 0 en (1, +∞).",
           "f′ = ln x + 1 = 0 en x = 1/e: decrece en (0, 1/e), crece después: <b>mínimo (1/e, −1/e)</b> ≈ (0,368; −0,368). Además f′(x) → −∞ en 0⁺: la curva sale del origen con tangente vertical.",
           "f″ = 1/x &gt; 0: convexa en todo el dominio, sin inflexiones. En +∞: f(x)/x = ln x → +∞, rama parabólica."]) +
        ojo("El error más común: ver «0 no está en el dominio» y escribir «asíntota vertical x = 0». <b>Calcula siempre el límite lateral.</b> Con x·ln x, x²·ln x, x·e<sup>1/x</sup>… el límite en el borde puede ser finito, y entonces hay un punto abierto, no una asíntota.") +
        "<p>Otra con exponencial para practicar (y que sirve de contraste con la anterior): eˣ/x tiene una asíntota vertical <i>y</i> una horizontal solo por un lado; compruébalo en el estudio guiado.</p>"
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Raíces y valor absoluto",
      html:
        "<h5>Raíces: dominio acotado y tangentes verticales</h5>" +
        "<p>Con una raíz de índice par el dominio suele ser una semirrecta o una unión de ellas. En el extremo cerrado del dominio la función no tiene asíntota, pero puede tener una <b>tangente vertical</b>: pasa cuando f′ tiende a ±∞ al acercarte a ese extremo.</p>" +
        ejemplo("Función con raíz", "Estudia f(x) = x·√(4 − x) y esboza su gráfica.",
          ["<b>Dominio.</b> 4 − x ≥ 0 ⟹ (−∞, 4]. Sin simetría (el dominio no lo es). <b>Cortes</b>: f(0) = 0 → (0, 0); f(x) = 0 ⟹ x = 0 o x = 4 → (0, 0) y (4, 0). <b>Signo</b>: f &lt; 0 si x &lt; 0 y f &gt; 0 en (0, 4).",
           "<b>Ramas.</b> No hay verticales (f es continua en su dominio). x → −∞: f → −∞ y f(x)/x = √(4 − x) → +∞: rama parabólica. No hay horizontales ni oblicuas.",
           "<b>Monotonía.</b> f′ = √(4 − x) − x/(2√(4 − x)) = [2(4 − x) − x]/(2√(4 − x)) = (8 − 3x)/(2√(4 − x)). f′ = 0 ⟹ x = 8/3. Crece en (−∞, 8/3) y decrece en (8/3, 4). <b>Máximo relativo</b> (8/3, 16√3/9) ≈ (2,667; 3,079).",
           "<b>Extremo del dominio.</b> Cuando x → 4⁻: f′ → (8 − 12)/(2·0⁺) = −∞. La gráfica llega a (4, 0) con <b>tangente vertical</b>, bajando.",
           "<b>Curvatura.</b> f″ = (3x − 16)/(4(4 − x)<sup>3/2</sup>). En el dominio (x &lt; 4) el numerador es negativo y el denominador positivo: f″ &lt; 0, <b>cóncava</b> en todo el dominio. Sin inflexiones (x = 16/3 no está en el dominio)."]) +
        "<h5>Valor absoluto: se escribe a trozos y se estudia cada trozo</h5>" +
        "<p>Método: <b>(1)</b> halla dónde se anula lo de dentro de las barras; <b>(2)</b> escribe f a trozos (|g| = g donde g ≥ 0, −g donde g &lt; 0); <b>(3)</b> estudia cada trozo en su intervalo; <b>(4)</b> en los puntos de unión calcula las derivadas laterales: si no coinciden, hay un <b>punto angular</b> (que puede ser un extremo aunque f′ no exista). Una propiedad útil: como |g| ≥ 0, los puntos donde g cruza el eje X son <b>mínimos</b> de |g| (picos hacia abajo).</p>" +
        ejemplo("Valor absoluto de una parábola", "Estudia f(x) = |x² − 4| y esboza su gráfica.",
          ["x² − 4 ≥ 0 ⟺ |x| ≥ 2. Luego f(x) = x² − 4 si |x| ≥ 2, y f(x) = 4 − x² si |x| &lt; 2. Dominio ℝ; f es par; f ≥ 0.",
           "Cortes: Y → (0, 4); X → x = ±2: (±2, 0).",
           "f′ = 2x si |x| &gt; 2 y f′ = −2x si |x| &lt; 2. En x = 2: f′(2⁻) = −4 y f′(2⁺) = +4: <b>punto angular</b>; igual en x = −2 (derivadas laterales +4 y −4). Por tanto f′ no existe en ±2.",
           "Signos: decrece en (−∞, −2) (f′ = 2x &lt; 0), crece en (−2, 0) (f′ = −2x &gt; 0), decrece en (0, 2) y crece en (2, +∞). <b>Mínimos</b> (±2, 0) (en los picos) y <b>máximo relativo</b> (0, 4).",
           "Curvatura: f″ = 2 (convexa) si |x| &gt; 2 y f″ = −2 (cóncava) si |x| &lt; 2. En x = ±2 la curvatura cambia, pero no hay tangente (son picos): <b>no se consideran puntos de inflexión</b>. Sin asíntotas: f ≈ x² en ±∞."]) +
        ejemplo("Logaritmo con valor absoluto", "Estudia f(x) = ln|x|.",
          ["Dominio ℝ − {0}; f(−x) = ln|−x| = ln|x| = f(x): <b>par</b>. Para x &gt; 0 es ln x y para x &lt; 0 es ln(−x).",
           "Cortes: ln|x| = 0 ⟹ |x| = 1: (−1, 0) y (1, 0). Asíntota vertical x = 0 (lím<sub>x→0</sub> ln|x| = −∞ por ambos lados). No hay horizontales: en ±∞, f → +∞ lentamente (rama parabólica).",
           "f′ = 1/x: negativa en (−∞, 0) (decrece) y positiva en (0, +∞) (crece). No hay extremos, porque x = 0 no está en el dominio. f″ = −1/x² &lt; 0: cóncava en cada rama, sin inflexiones."]) +
        ojo("El valor absoluto <b>no siempre</b> da un pico: |x²| = x² es derivable, y |x|·x = x|x| también lo es en 0. Hay pico solo donde lo de dentro corta al eje X <i>con pendiente distinta de cero</i> (y no está multiplicado por algo que se anule allí). Si dudas, calcula las dos derivadas laterales.")
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Ramas infinitas: asíntotas y ramas parabólicas",
      html:
        "<p>Para saber cómo se comporta f cuando x → +∞ (y por separado cuando x → −∞) se hace siempre esta secuencia, que cubre todos los casos:</p>" +
        tabla(["Pregunta", "Si la respuesta es…", "Conclusión"], [
          ["1. ¿lím f(x) = L finito?", "Sí", "Asíntota horizontal y = L"],
          ["2. Si f → ±∞: m = lím f(x)/x", "m finito y m ≠ 0", "Posible oblicua: pasa a n"],
          ["3. n = lím [f(x) − m·x]", "n finito", "Asíntota oblicua y = mx + n"],
          ["", "n infinito", "Rama parabólica de pendiente m"],
          ["2′. m = ±∞", "(f crece más rápido que x)", "Rama parabólica en la dirección del eje Y (como eˣ o x²)"],
          ["2″. m = 0", "(f crece más lento que x)", "Rama parabólica en la dirección del eje X (como ln x o √x)"]
        ]) +
        ejemplo("Asíntota oblicua de una racional", "Halla la asíntota oblicua de f(x) = (x² + 1)/(x − 1).",
          ["m = lím f(x)/x = lím (x² + 1)/(x² − x) = 1.",
           "n = lím [f(x) − x] = lím [(x² + 1) − x(x − 1)]/(x − 1) = lím (x + 1)/(x − 1) = 1.",
           "Asíntota <b>y = x + 1</b> en +∞ y en −∞. Con la división se ve igual: (x² + 1) = (x − 1)(x + 1) + 2, o sea f = x + 1 + 2/(x − 1)."]) +
        ejemplo("Una raíz con dos comportamientos", "Estudia las ramas infinitas de f(x) = √(x² + x) − x.",
          ["Dominio: x² + x ≥ 0 ⟺ x ≤ −1 o x ≥ 0.",
           "<b>x → +∞.</b> Multiplicando por el conjugado: f = (x² + x − x²)/(√(x² + x) + x) = x/(√(x² + x) + x) → 1/2. <b>Asíntota horizontal y = 1/2</b>.",
           "<b>x → −∞.</b> Aquí √(x² + x) = |x|·√(1 + 1/x) = −x√(1 + 1/x), de modo que f(x)/x = −√(1 + 1/x) − 1 → −2. Luego m = −2.",
           "n = lím [f(x) + 2x] = lím [√(x² + x) + x] = lím x/(√(x² + x) − x) = lím x/(−2x) = −1/2 (la raíz vale ≈ −x). <b>Asíntota oblicua y = −2x − 1/2</b>.",
           "Moraleja: una misma función puede tener una horizontal en +∞ y una oblicua en −∞. Hay que estudiar cada lado por separado, vigilando el signo de x al sacar x² de la raíz."]) +
        "<h5>Ramas parabólicas: qué son y cuándo ocurren</h5>" +
        "<p>Una rama parabólica es una rama infinita <b>sin asíntota</b> a la que la curva no se pega a ninguna recta. Hay dos clases: crece más deprisa que cualquier recta (eˣ, x²: la dirección es la del eje Y) o más despacio (ln x, √x: la dirección es la del eje X, la curva se «achata»). Ejemplos de arriba: x·e<sup>−x</sup> en −∞, x·ln x en +∞.</p>" +
        "<p>Prueba con las seis funciones: la tabla numérica muestra f(x), f(x)/x y f(x) − m·x al alejarte, y la conclusión sale sola.</p>" +
        w("m2t10_ramas") +
        ojo("Para una <b>racional</b> no hace falta calcular límites: grado del numerador menor que el del denominador ⟹ y = 0; iguales ⟹ y = cociente de los coeficientes principales; el numerador un grado mayor ⟹ oblicua (se obtiene dividiendo); dos grados o más de diferencia ⟹ rama parabólica (no hay asíntota).")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Leer f a partir de la gráfica (o la fórmula) de f′",
      html:
        "<p>Un tipo de pregunta muy frecuente: te dan la gráfica de <b>f′</b> (no la de f) y piden crecimiento, extremos, curvatura o inflexiones de f. La clave es recordar lo que cada rasgo de f′ significa para f:</p>" +
        tabla(["En la gráfica de f′", "Qué pasa en f"], [
          ["f′ por encima del eje X (f′ &gt; 0)", "f crece"],
          ["f′ por debajo del eje X (f′ &lt; 0)", "f decrece"],
          ["f′ corta al eje X de + a −", "f tiene un <b>máximo relativo</b>"],
          ["f′ corta al eje X de − a +", "f tiene un <b>mínimo relativo</b>"],
          ["f′ toca al eje X sin cruzarlo", "f tiene tangente horizontal pero <b>no extremo</b>"],
          ["f′ crece (pendiente de f′ positiva)", "f es convexa (f″ &gt; 0)"],
          ["f′ decrece", "f es cóncava (f″ &lt; 0)"],
          ["f′ tiene un máximo o un mínimo relativo", "f tiene un <b>punto de inflexión</b> (f″ = 0 y cambia de signo)"]
        ]) +
        ojo("La gráfica de f′ <b>no determina f del todo</b>: f queda fijada salvo una constante (si f es solución, f + 5 también). Sabrás cómo es la forma, pero no a qué altura está, salvo que te den un dato como f(0) = 1.") +
        ejemplo("f′ es una parábola", "La gráfica de f′ es una parábola con cortes en x = −1 y x = 3 y vértice (1, −4). Estudia f y, sabiendo que f(0) = 0, encuentra su fórmula.",
          ["La parábola es f′(x) = (x + 1)(x − 3) = x² − 2x − 3 (el vértice está en x = 1 y f′(1) = −4 ✓).",
           "Signo de f′: positiva en (−∞, −1), negativa en (−1, 3), positiva en (3, +∞). f crece, decrece, crece: <b>máximo en x = −1</b> y <b>mínimo en x = 3</b>.",
           "El vértice de f′ (su mínimo) está en x = 1: ahí f″ = 0 y cambia de signo: <b>inflexión en x = 1</b>. f es cóncava en (−∞, 1) (f′ decrece) y convexa en (1, +∞).",
           "Integrando: f(x) = x³/3 − x² − 3x + C, y f(0) = 0 ⟹ C = 0. Valores: f(−1) = 5/3, f(3) = −9, f(1) = −11/3. Máximo (−1, 5/3), mínimo (3, −9), inflexión (1, −11/3)."]) +
        ejemplo("f′ toca el eje pero no lo cruza", "Si f′(x) = x(x − 2)², ¿cuántos extremos relativos tiene f? ¿y puntos de inflexión?",
          ["f′ = 0 en x = 0 y en x = 2 (doble). Signo de f′: x &lt; 0: (−)(+) = −; 0 &lt; x &lt; 2: (+)(+) = +; x &gt; 2: (+)(+) = +.",
           "Cambia de signo solo en x = 0 (de − a +): <b>un único extremo, un mínimo en x = 0</b>. En x = 2 hay tangente horizontal pero f sigue creciendo: no es extremo.",
           "f″ = (x − 2)² + 2x(x − 2) = (x − 2)(3x − 2). Ceros: x = 2/3 y x = 2, y en ambos f″ cambia de signo (+ , −, +): <b>dos inflexiones</b>. La de x = 2 tiene tangente horizontal."]) +
        "<p>Prueba tú: elige una función de la lista, mira su f′ con las zonas de signo y escribe qué dice sobre f antes de pulsar «Mostrar f». Cambia la constante para comprobar que la forma no cambia, solo la altura.</p>" +
        w("m2t10_fprima") +
        "<h5>El camino de vuelta: de f a f′</h5>" +
        "<p>Si te dan la gráfica de f y piden esbozar f′: los <b>extremos</b> de f son los <b>ceros</b> de f′; donde f crece, f′ está por encima del eje; los <b>puntos de inflexión</b> de f son los <b>extremos</b> de f′; una asíntota horizontal de f hace que f′ → 0; un pico de f (punto angular) es un salto o un punto sin valor en f′.</p>"
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Deducir la fórmula a partir de los datos de la gráfica",
      html:
        "<p>En muchos enunciados la función tiene parámetros (a, b, c…) y te dan datos de su gráfica. <b>Cada dato es una ecuación</b>. Traducciones habituales:</p>" +
        tabla(["Dato de la gráfica", "Ecuación"], [
          ["Pasa por el punto (p, q)", "f(p) = q"],
          ["Tiene un extremo relativo en x = p (o tangente horizontal)", "f′(p) = 0"],
          ["Tiene un extremo relativo en el punto (p, q)", "f′(p) = 0 <b>y</b> f(p) = q (dos ecuaciones)"],
          ["Tiene un punto de inflexión en x = p", "f″(p) = 0 (y debe cambiar de signo)"],
          ["Asíntota vertical x = p (racional)", "el denominador se anula en p y el numerador no"],
          ["Asíntota horizontal y = L", "lím<sub>x→∞</sub> f(x) = L"],
          ["Tangente de pendiente m en x = p", "f′(p) = m"]
        ]) +
        ejemplo("Una racional a partir de sus asíntotas", "f(x) = (ax + b)/(x + c) tiene asíntota vertical x = 2, asíntota horizontal y = 3 y pasa por (0, 1). Halla a, b y c.",
          ["Vertical x = 2: el denominador se anula en x = 2, así que 2 + c = 0 ⟹ <b>c = −2</b>. (Después hay que comprobar que el numerador no se anula en 2.)",
           "Horizontal: lím f = a (cociente de coeficientes de x) = 3 ⟹ <b>a = 3</b>.",
           "Pasa por (0, 1): f(0) = b/c = b/(−2) = 1 ⟹ <b>b = −2</b>.",
           "f(x) = (3x − 2)/(x − 2). Comprobación: en x = 2 el numerador vale 4 ≠ 0 ✓ (asíntota vertical auténtica)."]) +
        ejemplo("Una cúbica con extremo e inflexión", "f(x) = x³ + ax² + bx + c corta al eje Y en (0, 1), tiene un extremo relativo en x = 1 y un punto de inflexión en x = 2. Halla a, b y c y clasifica el extremo.",
          ["f(0) = c = 1 ⟹ <b>c = 1</b>.",
           "f″ = 6x + 2a, f″(2) = 12 + 2a = 0 ⟹ <b>a = −6</b>.",
           "f′ = 3x² + 2ax + b, f′(1) = 3 + 2a + b = 3 − 12 + b = 0 ⟹ <b>b = 9</b>.",
           "f(x) = x³ − 6x² + 9x + 1 con f′ = 3(x − 1)(x − 3): x = 1 es un <b>máximo</b> (f(1) = 5) y además hay un mínimo en x = 3 (f(3) = 1). La inflexión es (2, 3), a mitad entre los dos extremos (en una cúbica siempre)."]) +
        ejemplo("Con un logaritmo", "f(x) = a·ln x + b·x pasa por (1, −1) y tiene un extremo relativo en x = 2. Halla a y b y clasifícalo.",
          ["f(1) = a·0 + b = −1 ⟹ <b>b = −1</b>. f′ = a/x + b, f′(2) = a/2 − 1 = 0 ⟹ <b>a = 2</b>.",
           "f(x) = 2 ln x − x, f″ = −2/x² &lt; 0: el extremo es un <b>máximo</b>, (2, 2 ln 2 − 2) ≈ (2; −0,614)."]) +
        "<p>Prueba tú: ajusta los deslizadores hasta que los tres datos pasen a ✓ (o pulsa el botón para ver el sistema). Verás que con tantas ecuaciones como parámetros la solución es única.</p>" +
        w("m2t10_formula") +
        ojo("Comprueba siempre el resultado con un dato <i>que no hayas usado</i> (un valor de f, el signo de f″ o una asíntota), y que las condiciones de existencia se cumplen (denominador no nulo, argumento del logaritmo positivo…). Un parámetro mal despejado suele delatarse así.")
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. El dibujo final: coherencia con la tabla de signos",
      html:
        "<p>El esbozo es la parte que más puntúa y la que más se estropea por falta de coherencia. Antes de entregar, repasa esta lista:</p>" +
        "<ol>" +
        "<li><b>Puntos:</b> la curva pasa por todos los cortes y extremos, con sus coordenadas escritas.</li>" +
        "<li><b>Asíntotas:</b> dibújalas (discontinuas) <i>antes</i> que la curva; la curva se acerca a ellas por el lado que calculaste y <b>nunca cruza una vertical</b>.</li>" +
        "<li><b>Tangentes horizontales:</b> en cada máximo/mínimo la curva es horizontal (suavemente); en un pico no.</li>" +
        "<li><b>Monotonía:</b> entre dos extremos consecutivos la curva es monótona, sin ondulaciones extra.</li>" +
        "<li><b>Curvatura:</b> en cada intervalo respeta ∪ o ∩; cambia de tipo solo en las inflexiones.</li>" +
        "<li><b>Signo:</b> la curva está por encima del eje X donde f &gt; 0 y por debajo donde f &lt; 0, y cruza el eje solo en los ceros.</li>" +
        "</ol>" +
        "<p>Truco: haz la <b>tabla de formas</b> (como la del ejemplo de x²/(x − 1)): para cada intervalo, uno de los cuatro trazos ↗∩, ↘∩, ↘∪, ↗∪. Con ella no puedes dibujar un tramo equivocado. Ahora practica la detección: dada una tabla de signos de f′ y f″, elige el esbozo que la cumple y lee la explicación de por qué los demás no valen.</p>" +
        w("m2t10_coherente") +
        ejemplo("Cómo se detecta una contradicción", "Un alumno dice que f(x) = x³ − 3x tiene un mínimo en x = −1 y un máximo en x = 1. ¿Qué dice la tabla?",
          ["f′ = 3x² − 3 = 3(x − 1)(x + 1): positiva en (−∞, −1), negativa en (−1, 1), positiva en (1, +∞).",
           "Si f′ pasa de + a − en x = −1, f deja de crecer para empezar a decrecer: ahí hay un <b>máximo</b>, no un mínimo. Y en x = 1 pasa de − a +: <b>mínimo</b>. El alumno los tiene intercambiados.",
           "Valores: f(−1) = 2 (máximo) y f(1) = −2 (mínimo). Una buena comprobación rápida: el máximo relativo tiene que estar <i>más alto</i> que el mínimo contiguo."])
    }
  ];

  B.parte.m2t10b = { nuevas: nuevas };
})(window);
