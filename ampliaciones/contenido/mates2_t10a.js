/* ============================================================
   Matemáticas II · ampliaciones · Tema 10: Estudio y representación de funciones
   (parte A: se añade al final de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t10/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. El guion
  secciones[0] =
    "<h5>El guion completo, con lo que se pide y lo que suele fallar</h5>" +
    "<p>En la EvAU de Madrid el enunciado casi nunca dice «estudia la función»; dice cosas como <i>«calcula las asíntotas, los intervalos de crecimiento y decrecimiento, los extremos relativos y esboza la gráfica»</i>. Cada apartado es un paso del guion. Hacerlos <b>siempre en el mismo orden</b> evita olvidos y, sobre todo, permite que unos pasos comprueben a otros.</p>" +
    tabla(["Paso", "Qué calculas", "Error típico"], [
      ["1. Dominio y simetría", "Dónde existe f; si f(−x) = ±f(x)", "Olvidar que un logaritmo pide argumento &gt; 0 o que una raíz pide radicando ≥ 0"],
      ["2. Cortes y signo", "(0, f(0)); f(x) = 0; signo de f en cada tramo", "Dar como corte un valor que no está en el dominio"],
      ["3. Asíntotas", "Verticales (en los bordes del dominio), horizontales y oblicuas, en +∞ y en −∞ por separado", "Dar una sola asíntota para +∞ y −∞ cuando son distintas"],
      ["4. Monotonía y extremos", "Signo de f′; puntos con f′ = 0 o donde f′ no existe", "Llamar «extremo» a un punto con f′ = 0 en el que f′ no cambia de signo"],
      ["5. Curvatura e inflexiones", "Signo de f″; puntos donde f″ cambia de signo", "Decir «inflexión» donde f″ = 0 pero no cambia de signo (x⁴ en 0)"],
      ["6. Esbozo", "Juntar puntos, asíntotas, tangentes horizontales y curvatura", "Dibujar una curva que corta una asíntota vertical o que contradice la tabla de signos"]
    ]) +
    "<p>Este orden tiene lógica: el dominio dice <i>dónde</i> hay que buscar asíntotas verticales; los cortes y el signo dan puntos y regiones por donde pasa la curva; las asíntotas dicen <i>cómo se comporta en los bordes</i>; f′ da la forma entre puntos y f″ el detalle de cómo se curva. Al final, todo debe ser coherente: si el esbozo sube donde tu tabla dice que baja, hay un error en alguna parte.</p>" +
    ojo("No hace falta dibujar con regla ni escala exacta: el examen valora que estén bien los <b>puntos notables</b> (con sus coordenadas), las <b>asíntotas</b>, los <b>intervalos</b> y que la curva sea coherente con ellos. Un esbozo claro con los datos escritos al lado vale más que un dibujo bonito sin datos.") +
    "<p>Prueba el guion completo con el estudio guiado: cada pulsación añade un paso y la curva solo aparece al final, cuando ya tienes todos los datos.</p>" +
    w("m2t10_estudio");

  // ---------------------------------------------------------------- 2. Dominio y simetría
  secciones[1] =
    "<h5>Dominio según el tipo de función</h5>" +
    tabla(["Función", "Dominio"], [
      ["Polinomio, eˣ, sen x, cos x", "ℝ"],
      ["Fracción P(x)/Q(x)", "ℝ salvo las raíces de Q (Q(x) = 0)"],
      ["Raíz de índice par, √g(x)", "g(x) ≥ 0 (la raíz cúbica no impone nada)"],
      ["Logaritmo, ln g(x)", "g(x) &gt; 0 (estrictamente)"],
      ["Varias a la vez", "La intersección de todas las condiciones"]
    ]) +
    ejemplo("Raíz dentro de una fracción", "Halla el dominio de f(x) = √(x² − 4x)/(x − 1).",
      ["Raíz: x² − 4x = x(x − 4) ≥ 0. Esta parábola (hacia arriba) es ≥ 0 fuera de las raíces: x ≤ 0 o x ≥ 4.",
       "Denominador: x ≠ 1; pero x = 1 ya está fuera de la zona anterior (1 está entre 0 y 4).",
       "Dom(f) = (−∞, 0] ∪ [4, +∞). <b>Ojo</b>: la condición del denominador no siempre quita algo nuevo."]) +
    ejemplo("Logaritmo con una cuadrática", "Halla el dominio y la simetría de f(x) = ln(x² − 4).",
      ["x² − 4 &gt; 0 ⟺ x &lt; −2 o x &gt; 2. Dom(f) = (−∞, −2) ∪ (2, +∞).",
       "Este dominio es simétrico respecto al origen, así que tiene sentido preguntar por la paridad: f(−x) = ln((−x)² − 4) = ln(x² − 4) = f(x). Es <b>par</b>."]) +
    "<h5>Simetría: lo primero que hay que mirar es el dominio</h5>" +
    "<p>Si x está en el dominio, para que f sea par o impar también debe estarlo −x. Por eso f(x) = ln x o f(x) = √x <b>no pueden ser pares ni impares</b>: su dominio no es simétrico. Si lo es, se calcula f(−x) y se compara:</p>" +
    tabla(["Resultado", "Simetría", "Qué ahorra"], [
      ["f(−x) = f(x)", "Par: respecto al eje Y", "Estudias solo x ≥ 0 y reflejas"],
      ["f(−x) = −f(x)", "Impar: respecto al origen", "Estudias solo x ≥ 0 y giras 180° respecto al origen"],
      ["Ninguna", "Sin simetría", "Estudias todo el dominio"]
    ]) +
    ejemplo("Par, impar o ninguna", "Clasifica g(x) = x/(x² + 1), h(x) = eˣ + e<sup>−x</sup> y k(x) = x + eˣ.",
      ["g(−x) = −x/(x² + 1) = −g(x): <b>impar</b>.",
       "h(−x) = e<sup>−x</sup> + eˣ = h(x): <b>par</b> (es el coseno hiperbólico).",
       "k(−x) = −x + e<sup>−x</sup>, que no es k(x) ni −k(x): <b>ninguna</b>. Basta comprobarlo con un valor: k(1) = 1 + e y k(−1) = −1 + 1/e, que no son iguales ni opuestos."]) +
    "<p>Una función par o impar con asíntota en +∞ tiene la «misma» asíntota reflejada en −∞: ahórrate la mitad del trabajo.</p>";

  // ---------------------------------------------------------------- 3. Cortes y signo
  secciones[2] =
    "<h5>El signo de f: la tabla de signos de una fracción</h5>" +
    "<p>Una función continua solo puede cambiar de signo en un cero o en una discontinuidad (asíntota vertical). Por eso la tabla de signos de f = P/Q se hace así: <b>1)</b> marca en la recta real los ceros del numerador y los del denominador; <b>2)</b> en cada intervalo que queda, elige un número y calcula el signo (o usa el signo de cada factor); <b>3)</b> las raíces <i>dobles</i> no cambian el signo.</p>" +
    ejemplo("Tabla de signos", "Estudia el signo de f(x) = (x + 1)(x − 3)/(x − 1).",
      ["Ceros del numerador: x = −1 y x = 3. Cero del denominador: x = 1 (fuera del dominio). Intervalos: (−∞, −1), (−1, 1), (1, 3), (3, +∞).",
       "x = −2: (−)(−)/(−) = <b>−</b> · x = 0: (+)(−)/(−) = <b>+</b> · x = 2: (+)(−)/(+) = <b>−</b> · x = 4: (+)(+)/(+) = <b>+</b>.",
       "f &gt; 0 en (−1, 1) ∪ (3, +∞); f &lt; 0 en (−∞, −1) ∪ (1, 3). Cortes: (−1, 0), (3, 0) y (0, 3)."]) +
    "<h5>Cuidado con los «huecos»: simplificar cambia el dominio</h5>" +
    "<p>Si una raíz anula a la vez numerador y denominador, al simplificar la fracción el dominio original <b>no cambia</b>: sigue excluyendo esa raíz, pero allí <b>no hay asíntota vertical</b>, sino un hueco (discontinuidad evitable).</p>" +
    ejemplo("Un hueco en la gráfica", "Estudia el dominio, los cortes y las asíntotas verticales de f(x) = (x² − x − 2)/(x² − 4).",
      ["Dominio: x² − 4 ≠ 0, es decir x ≠ ±2. Dom(f) = ℝ − {−2, 2}.",
       "Factorizando: f(x) = (x − 2)(x + 1)/((x − 2)(x + 2)) = (x + 1)/(x + 2) para x ≠ 2.",
       "Cortes: eje Y, f(0) = 1/2 → (0, 1/2). Eje X: x = −1 → (−1, 0). El valor x = 2 <b>no</b> es corte: no está en el dominio.",
       "x = −2 anula solo el denominador: <b>asíntota vertical</b> x = −2. En x = 2 el límite es (2 + 1)/(2 + 2) = 3/4: <b>hueco</b> en el punto (2, 3/4), sin asíntota."]);

  // ---------------------------------------------------------------- 4. Asíntotas
  secciones[3] =
    "<h5>Recordatorio rápido: dónde buscar cada tipo</h5>" +
    tabla(["Asíntota", "Dónde se busca", "Qué compruebas"], [
      ["Vertical x = a", "En los puntos aislados que no están en el dominio y en los extremos abiertos del dominio", "lím<sub>x→a⁺</sub> f o lím<sub>x→a⁻</sub> f es ±∞"],
      ["Horizontal y = L", "En +∞ y en −∞, por separado", "lím f(x) = L (finito)"],
      ["Oblicua y = mx + n", "Solo si no hay horizontal en ese lado", "m = lím f(x)/x (finito y no nulo) y n = lím [f(x) − mx] (finito)"]
    ]) +
    ojo("Una función racional tiene a lo sumo <b>una</b> asíntota no vertical (la misma en +∞ y −∞). Con exponenciales, raíces o logaritmos pueden aparecer <b>dos distintas</b>: por eso hay que estudiar +∞ y −∞ por separado (ver el apartado de ramas infinitas).") +
    ejemplo("Cómo se acerca a la asíntota", "Estudia las asíntotas de f(x) = x²/(x² − 4) y de qué lado se acerca la curva a cada una.",
      ["Verticales: x² − 4 = 0 → x = ±2. Hay dos si el numerador no se anula ahí (4 ≠ 0).",
       "Horizontal: lím<sub>x→±∞</sub> f = 1. Para saber el lado: f(x) − 1 = 4/(x² − 4), que es <b>positivo</b> para |x| grande: la curva está <b>por encima</b> de y = 1 en ambos extremos.",
       "Lados en las verticales: en x = 2⁺ el denominador es positivo pequeño: f → +∞; en x = 2⁻, negativo pequeño: f → −∞. Por la simetría (f es par), en x = −2⁻: +∞ y en x = −2⁺: −∞."]);

  // ---------------------------------------------------------------- 5. Monotonía
  secciones[4] =
    "<h5>Puntos críticos: dónde mirar</h5>" +
    "<p>Los únicos puntos donde puede cambiar el sentido de variación de f son aquellos <b>del dominio</b> donde f′(x) = 0 <b>o donde f′ no existe</b> (picos del valor absoluto, uniones de funciones a trozos). Además hay que partir los intervalos de signo en los puntos que <i>no</i> están en el dominio (asíntotas): entre dos de ellos f′ puede mantener el signo pero la función no es «una sola pieza».</p>" +
    "<p><b>Dos criterios para clasificar un punto crítico a:</b></p>" +
    tabla(["Criterio", "Cómo se usa", "Cuándo falla"], [
      ["Cambio de signo de f′", "f′ pasa de + a −: máximo · de − a +: mínimo · sin cambio: no hay extremo", "Casi nunca; es el más seguro"],
      ["Segunda derivada", "f′(a) = 0 y f″(a) &gt; 0: mínimo · f″(a) &lt; 0: máximo", "Si f″(a) = 0 no decide (x⁴ tiene mínimo en 0, −x⁴ máximo, x³ ninguno): usa el signo de f′"]
    ]) +
    ejemplo("Dos extremos con exponencial", "Estudia la monotonía y los extremos de f(x) = x²e<sup>−x</sup>.",
      ["f′(x) = 2xe<sup>−x</sup> − x²e<sup>−x</sup> = x(2 − x)e<sup>−x</sup>. Como e<sup>−x</sup> &gt; 0, el signo lo dan x y (2 − x).",
       "f′ = 0 en x = 0 y x = 2. Signos: x &lt; 0: (−)(+) = −; 0 &lt; x &lt; 2: (+)(+) = +; x &gt; 2: (+)(−) = −.",
       "Decrece en (−∞, 0), crece en (0, 2), decrece en (2, +∞). <b>Mínimo relativo</b> (0, 0) y <b>máximo relativo</b> (2, 4/e²) ≈ (2; 0,541)."]) +
    ejemplo("Cuando f″ no decide", "Clasifica el punto crítico x = 0 de f(x) = x⁴.",
      ["f′ = 4x³ = 0 en x = 0; f″ = 12x² y f″(0) = 0: el criterio de la segunda derivada no decide.",
       "Signo de f′: x &lt; 0: 4x³ &lt; 0 (decrece); x &gt; 0: 4x³ &gt; 0 (crece). Cambia de − a +: <b>mínimo</b> en (0, 0)."]);

  // ---------------------------------------------------------------- 6. Curvatura
  secciones[5] =
    "<h5>Qué significa de verdad f″ &gt; 0</h5>" +
    "<p>f″ es la derivada de f′: mide cómo cambia la <b>pendiente</b>. Si f″ &gt; 0, la pendiente va aumentando: la gráfica se queda <i>por encima</i> de sus tangentes (convexa, ∪). Si f″ &lt; 0, la pendiente va disminuyendo: la gráfica queda <i>por debajo</i> de sus tangentes (cóncava, ∩). En un punto de inflexión la gráfica <b>atraviesa su tangente</b>. Mira las tres gráficas a la vez: ceros de f′ ↔ extremos de f; ceros de f″ ↔ inflexiones de f.</p>" +
    w("tresgraficas") +
    ojo("«Cóncava» y «convexa» se usan con sentido opuesto en distintos libros. En Madrid y en este curso: <b>convexa = ∪ = f″ &gt; 0</b>, <b>cóncava = ∩ = f″ &lt; 0</b>. Si dudas, en el examen escribe también «f″ &gt; 0 (forma de ∪)» y no habrá confusión.") +
    "<h5>Cómo se clasifica un posible punto de inflexión</h5>" +
    "<p>Los candidatos son los x con f″(x) = 0 (o donde f″ no existe pero sí existe tangente). Comprueba <b>siempre</b> que f″ cambia de signo; f″ = 0 solo no basta. Si f′(a) existe y f″(a) = 0 pero f‴(a) ≠ 0, hay inflexión en a.</p>" +
    ejemplo("f″ = 0 sin inflexión", "Compara el punto x = 0 en f(x) = x⁴ y en g(x) = x³.",
      ["f″ = 12x²: se anula en 0 pero es ≥ 0 a ambos lados: no cambia de signo. <b>No hay inflexión</b> (f es convexa en todo ℝ).",
       "g″ = 6x: negativa a la izquierda y positiva a la derecha. Cambia de signo: <b>inflexión</b> en (0, 0), con tangente horizontal y = 0 que la curva atraviesa."]) +
    ejemplo("Dos inflexiones con la campana de Gauss", "Halla los puntos de inflexión de f(x) = e<sup>−x²</sup>.",
      ["f′ = −2xe<sup>−x²</sup>. f″ = −2e<sup>−x²</sup> + 4x²e<sup>−x²</sup> = (4x² − 2)e<sup>−x²</sup>.",
       "f″ = 0 ⟺ x² = 1/2 ⟺ x = ±√2/2 ≈ ±0,707. El factor 4x² − 2 es positivo fuera de [−0,707; 0,707] y negativo dentro: cambia de signo en ambos.",
       "Convexa en (−∞, −√2/2) y (√2/2, +∞); cóncava en el centro. Inflexiones en (±√2/2, e<sup>−1/2</sup>) ≈ (±0,707; 0,607)."]);

  B.parte.m2t10a = { secciones: secciones };
})(window);
