/* ============================================================
   Matemáticas II · ampliaciones · Tema 12: Integral definida
   (parte A: se añade al final de las cuatro secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t12/" + ref); }
  function I(a, b) { return "∫<sub>" + a + "</sub><sup>" + b + "</sup>"; }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Riemann y propiedades
  secciones[0] =
    "<h5>De las sumas de rectángulos a la integral</h5>" +
    "<p>La definición de la integral definida no usa primitivas: usa <b>sumas de áreas de rectángulos</b>. Se parte [a, b] en n trozos iguales de anchura <b>Δ = (b − a)/n</b> y sobre cada trozo se levanta un rectángulo cuya altura es el valor de f en algún punto del trozo:</p>" +
    tabla(["Suma", "Altura del rectángulo", "Fórmula"], [
      ["Izquierda", "f en el extremo izquierdo del trozo", "Δ·[f(x<sub>0</sub>) + f(x<sub>1</sub>) + … + f(x<sub>n−1</sub>)]"],
      ["Derecha", "f en el extremo derecho", "Δ·[f(x<sub>1</sub>) + f(x<sub>2</sub>) + … + f(x<sub>n</sub>)]"],
      ["Inferior s<sub>n</sub>", "el mínimo de f en el trozo", "Δ·Σ mín f"],
      ["Superior S<sub>n</sub>", "el máximo de f en el trozo", "Δ·Σ máx f"]
    ]) +
    "<p>Siempre ocurre s<sub>n</sub> ≤ (área) ≤ S<sub>n</sub>. Si f es <b>continua</b> en [a, b], cuando n → ∞ las dos sumas se acercan al mismo número, y ese número es por definición la integral: <b>" + I("a", "b") + " f(x)dx = lím<sub>n→∞</sub> s<sub>n</sub> = lím<sub>n→∞</sub> S<sub>n</sub></b>. Todas las funciones continuas son integrables; eso es lo que garantiza que la regla de Barrow tenga sentido. En el simulador puedes ver cómo se pegan las sumas inferior y superior al valor exacto.</p>" +
    w("m2t12_riemann") +
    ejemplo("Una integral como límite de sumas", "Calcula " + I("0", "1") + " x²dx como límite de sumas de Riemann (suma derecha).",
      ["Δ = 1/n y los extremos derechos son x<sub>i</sub> = i/n, i = 1, …, n. La suma es S<sub>n</sub> = Σ (i/n)²·(1/n) = (1/n³)·Σ i².",
       "Se usa Σ<sub>i=1</sub><sup>n</sup> i² = n(n + 1)(2n + 1)/6. Entonces S<sub>n</sub> = (n + 1)(2n + 1)/(6n²).",
       "Valores: n = 4 → 5·9/96 = 0,46875; n = 10 → 11·21/600 = 0,385; n = 100 → 101·201/60000 ≈ 0,338.",
       "Límite: lím S<sub>n</sub> = 2/6 = <b>1/3</b>. Coincide con Barrow: [x³/3] entre 0 y 1 = 1/3. (La suma izquierda es (n − 1)(2n − 1)/(6n²), que tiende al mismo 1/3 por debajo.)"]) +
    "<p>Una consecuencia útil para los límites de sumas: si f es continua, <b>lím<sub>n→∞</sub> (1/n)·Σ<sub>k=1</sub><sup>n</sup> f(k/n) = " + I("0", "1") + " f(x)dx</b>. Es una suma derecha con Δ = 1/n. Por ejemplo, lím (1/n)Σ √(k/n) = " + I("0", "1") + " √x dx = 2/3.</p>" +
    "<h5>Propiedades de la integral definida</h5>" +
    tabla(["Propiedad", "Enunciado", "Para qué sirve"], [
      ["Linealidad", I("a", "b") + " [λf + μg] = λ" + I("a", "b") + " f + μ" + I("a", "b") + " g", "Integrar sumas y sacar constantes"],
      ["Aditividad", I("a", "b") + " f = " + I("a", "c") + " f + " + I("c", "b") + " f", "Partir en trozos (valor absoluto, funciones a trozos, cambios de signo)"],
      ["Límites iguales", I("a", "a") + " f = 0", "Un intervalo sin anchura no tiene área"],
      ["Límites invertidos", I("b", "a") + " f = −" + I("a", "b") + " f", "Cuidado con el signo cuando el extremo superior es menor"],
      ["Monotonía", "f ≤ g en [a, b] ⟹ " + I("a", "b") + " f ≤ " + I("a", "b") + " g", "Acotar integrales sin calcularlas"],
      ["Valor absoluto", "|" + I("a", "b") + " f| ≤ " + I("a", "b") + " |f|", "La integral neta nunca supera al área real"],
      ["Función par", "f(−x) = f(x) ⟹ " + I("−a", "a") + " f = 2" + I("0", "a") + " f", "Reducir el trabajo a la mitad"],
      ["Función impar", "f(−x) = −f(x) ⟹ " + I("−a", "a") + " f = 0", "Anular integrales sin hacer cuentas"]
    ]) +
    ejemplo("Simetría y aditividad", "(a) Calcula " + I("−2", "2") + " (x³ + 3x²)dx. (b) Si " + I("0", "3") + " f = 5 y " + I("3", "7") + " f = 2, calcula " + I("0", "7") + " f e " + I("7", "0") + " f.",
      ["<b>(a)</b> x³ es impar: su integral entre −2 y 2 vale 0. 3x² es par: " + I("−2", "2") + " 3x²dx = 2" + I("0", "2") + " 3x²dx = 2·[x³]<sub>0</sub><sup>2</sup> = 2·8 = <b>16</b>. (Haciéndolo directamente: [x⁴/4 + x³] entre −2 y 2 = (4 + 8) − (4 − 8) = 16 ✓.)",
       "<b>(b)</b> Aditividad: " + I("0", "7") + " f = " + I("0", "3") + " f + " + I("3", "7") + " f = 5 + 2 = <b>7</b>. Límites invertidos: " + I("7", "0") + " f = −7."]) +
    ojo("La integral definida es un <b>número</b>, y es el área solo si f ≥ 0. Si f &lt; 0 en todo el intervalo la integral sale <i>negativa</i>: el área es su valor absoluto. Y si f cambia de signo, la integral compensa positivos con negativos (sección 3).");

  // ---------------------------------------------------------------- 2. Barrow
  secciones[1] =
    "<h5>Por qué funciona Barrow, y cómo escribirlo bien</h5>" +
    "<p>La regla de Barrow dice que, si F′ = f en [a, b] (F es una primitiva de f, continua), entonces <b>" + I("a", "b") + " f(x)dx = F(b) − F(a) = [F(x)]<sub>a</sub><sup>b</sup></b>. La idea de fondo es que f es la velocidad a la que crece F, así que el área acumulada entre a y b es lo que ha crecido F en total (el teorema fundamental, sección 5 de este tema, lo demuestra). En el examen se escribe siempre en tres líneas: la primitiva, la sustitución <i>con paréntesis</i> y el resultado simplificado.</p>" +
    ejemplo("Barrow con potencias, exponenciales y trigonométricas", "Calcula: (a) " + I("1", "4") + " (√x + 1/x²)dx; (b) " + I("0", "1") + " e<sup>2x</sup>dx; (c) " + I("0", "π/4") + " dx/cos²x.",
      ["<b>(a)</b> Reescribe √x = x<sup>1/2</sup> y 1/x² = x<sup>−2</sup>. Primitiva: F(x) = (2/3)x<sup>3/2</sup> − 1/x. F(4) = (2/3)·8 − 1/4 = 16/3 − 1/4; F(1) = 2/3 − 1. Resta: (16/3 − 1/4) − (2/3 − 1) = 14/3 + 3/4 = <b>65/12</b> ≈ 5,417.",
       "<b>(b)</b> F(x) = e<sup>2x</sup>/2 (no olvides dividir por la derivada interior 2). [e<sup>2x</sup>/2] entre 0 y 1 = e²/2 − 1/2 = <b>(e² − 1)/2</b> ≈ 3,195.",
       "<b>(c)</b> 1/cos²x = 1 + tg²x, primitiva tg x. [tg x] entre 0 y π/4 = tg(π/4) − tg 0 = 1 − 0 = <b>1</b>."]) +
    ojo("Tres fallos clásicos al aplicar Barrow: (1) <b>no poner paréntesis</b> al restar F(a) cuando es negativa (F(1) = 2/3 − 1 se resta entera); (2) <b>olvidar la derivada interior</b> de e<sup>2x</sup>, sen 3x…; (3) escribir «+C»: en una integral definida la constante se cancela, no se pone.") +
    "<p>Hay una situación en la que Barrow <b>no se puede aplicar</b>: si f no está definida o no es continua en algún punto de [a, b]. Por ejemplo " + I("−1", "1") + " dx/x² no vale [−1/x] entre −1 y 1 = −2: la función tiene una asíntota en x = 0 y la integral no existe como tal (el área es infinita). Antes de integrar, mira el dominio.</p>";

  // ---------------------------------------------------------------- 3. Cambio de signo
  secciones[2] =
    "<h5>La receta del área cuando f cambia de signo</h5>" +
    tabla(["Paso", "Qué haces"], [
      ["1", "Resuelve f(x) = 0 y quédate con las raíces que caen <b>dentro</b> de [a, b]."],
      ["2", "Parte el intervalo en esos puntos: [a, x<sub>1</sub>], [x<sub>1</sub>, x<sub>2</sub>], …, [x<sub>k</sub>, b]."],
      ["3", "Calcula una integral por trozo con Barrow (una sola primitiva F sirve para todos)."],
      ["4", "Área = suma de los <b>valores absolutos</b>. La integral neta es la suma <i>con signos</i>."]
    ]) +
    "<p>Si se pide «el área encerrada por la curva y el eje X» sin dar límites, los límites son <b>las raíces consecutivas</b> de f: entre ellas f no cambia de signo y la región queda cerrada.</p>" +
    w("m2t12_signo") +
    ejemplo("Área con dos cambios de signo", "Calcula " + I("−1", "2") + " (x³ − x)dx y el área limitada por y = x³ − x, el eje X y las rectas x = −1, x = 2.",
      ["Primitiva: F(x) = x⁴/4 − x²/2. F(−1) = 1/4 − 1/2 = −1/4; F(0) = 0; F(1) = −1/4; F(2) = 4 − 2 = 2.",
       "Raíces de x³ − x = x(x − 1)(x + 1): −1, 0, 1. Dentro de (−1, 2) están 0 y 1. Signo: + en (−1, 0), − en (0, 1), + en (1, 2).",
       "Trozos: " + I("−1", "0") + " = F(0) − F(−1) = 1/4 &nbsp;·&nbsp; " + I("0", "1") + " = F(1) − F(0) = −1/4 &nbsp;·&nbsp; " + I("1", "2") + " = F(2) − F(1) = 9/4.",
       "<b>Integral neta</b> = 1/4 − 1/4 + 9/4 = <b>9/4</b> (= F(2) − F(−1) directamente). <b>Área</b> = 1/4 + 1/4 + 9/4 = <b>11/4</b>. Dos números distintos: eso es lo que se pregunta en la EvAU."]) +
    ejemplo("Curva y eje X sin límites", "Halla el área de la región limitada por y = x² − 4x + 3 y el eje X.",
      ["Raíces: x² − 4x + 3 = (x − 1)(x − 3). Los límites son x = 1 y x = 3. Entre ambas, la parábola (hacia arriba) está por debajo del eje.",
       "F(x) = x³/3 − 2x² + 3x. F(3) = 9 − 18 + 9 = 0; F(1) = 1/3 − 2 + 3 = 4/3. " + I("1", "3") + " = 0 − 4/3 = −4/3.",
       "Área = |−4/3| = <b>4/3</b>. (Atención: la respuesta «−4/3» es un error de signo: un área nunca es negativa.)"]) +
    ejemplo("El seno en un periodo", "Calcula " + I("0", "2π") + " sen x dx y el área entre y = sen x y el eje X en [0, 2π].",
      ["F(x) = −cos x. " + I("0", "2π") + " = −cos 2π + cos 0 = −1 + 1 = <b>0</b>: la arcada positiva y la negativa se compensan.",
       "Trozos con el cero en π: " + I("0", "π") + " = −cos π + cos 0 = 2 e " + I("π", "2π") + " = −cos 2π + cos π = −2. Área = 2 + 2 = <b>4</b>."]) +
    ojo("Trampa de examen: calcular " + I("a", "b") + " f con Barrow en un intervalo donde f cambia de signo y llamar a eso «área». Dibuja siempre un esbozo (o estudia el signo) <i>antes</i> de integrar. El simulador de arriba te deja mover a y b y comprobar cómo cambia la diferencia entre ambos números.");

  // ---------------------------------------------------------------- 4. Entre dos curvas
  secciones[3] =
    "<h5>Receta completa y casos que se complican</h5>" +
    tabla(["Paso", "Qué haces", "Fallo habitual"], [
      ["1. Esbozo", "Dibuja las curvas (aunque sea a grandes rasgos) y sombrea la región", "Integrar sin saber cuál va encima"],
      ["2. Cortes", "Resuelve f(x) = g(x). Ordena las soluciones", "Olvidar un corte intermedio"],
      ["3. Quién va encima", "En cada tramo entre cortes, prueba un punto: ¿f(x<sub>0</sub>) &gt; g(x<sub>0</sub>)?", "Suponer que la misma función va siempre encima"],
      ["4. Integra", "Para cada tramo, ∫(arriba − abajo)dx con Barrow", "Restar al revés y quedar con signo negativo"],
      ["5. Suma", "Suma las áreas de los tramos (todas positivas)", "Sumar integrales con signo en vez de áreas"]
    ]) +
    w("m2t12_entre") +
    ejemplo("Parábola y recta", "Halla el área encerrada por y = x² e y = x + 2.",
      ["Cortes: x² = x + 2 ⟹ x² − x − 2 = 0 ⟹ x = −1 y x = 2.",
       "Quién va encima: en x = 0 la recta vale 2 y la parábola 0, luego la recta va por encima en (−1, 2).",
       "Área = " + I("−1", "2") + " (x + 2 − x²)dx = [x²/2 + 2x − x³/3] entre −1 y 2 = (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = 10/3 + 7/6 = <b>9/2</b>."]) +
    ejemplo("Tres cortes: cambia quién va encima", "Halla el área limitada por y = x³ e y = x.",
      ["Cortes: x³ = x ⟹ x(x − 1)(x + 1) = 0 ⟹ x = −1, 0, 1.",
       "En (0, 1): x = 1/2 da x = 0,5 &gt; x³ = 0,125, luego la recta va encima. En (−1, 0): x = −1/2 da x³ = −0,125 &gt; x = −0,5, luego ahora va encima la cúbica.",
       "Área = " + I("−1", "0") + " (x³ − x)dx + " + I("0", "1") + " (x − x³)dx = [x⁴/4 − x²/2]<sub>−1</sub><sup>0</sup> + [x²/2 − x⁴/4]<sub>0</sub><sup>1</sup> = 1/4 + 1/4 = <b>1/2</b>.",
       "Comprobación del error típico: " + I("−1", "1") + " (x − x³)dx = 0 por ser una función impar. Las dos lóbulos se compensarían si no se toman en valor absoluto."]) +
    ejemplo("Seno y coseno", "Halla el área limitada por y = sen x, y = cos x y las rectas x = 0, x = π/2.",
      ["Corte en [0, π/2]: sen x = cos x ⟹ x = π/4. Para x &lt; π/4, cos x &gt; sen x; para x &gt; π/4, sen x &gt; cos x.",
       "Área = " + I("0", "π/4") + " (cos x − sen x)dx + " + I("π/4", "π/2") + " (sen x − cos x)dx.",
       "Primera: [sen x + cos x] entre 0 y π/4 = √2 − 1. Segunda: [−cos x − sen x] entre π/4 y π/2 = (0 − 1) − (−√2) = √2 − 1.",
       "Área total = <b>2√2 − 2</b> ≈ 0,828."]) +
    "<h5>Integrar respecto de y, y regiones con una tangente</h5>" +
    "<p>A veces es más cómodo ver las curvas como x = h(y). Entonces el área es " + I("y₁", "y₂") + " (x<sub>derecha</sub> − x<sub>izquierda</sub>)dy. Es el truco para regiones donde la parábola está «tumbada».</p>" +
    ejemplo("Integrar en y", "Halla el área encerrada por la parábola x = y² y la recta y = x − 2.",
      ["La recta es x = y + 2. Cortes: y² = y + 2 ⟹ y = −1 y y = 2.",
       "Entre ellos, la recta (x = y + 2) está a la derecha de la parábola (x = y², comprueba y = 0: 2 &gt; 0).",
       "Área = " + I("−1", "2") + " (y + 2 − y²)dy = [y²/2 + 2y − y³/3]<sub>−1</sub><sup>2</sup> = (2 + 4 − 8/3) − (1/2 − 2 + 1/3) = <b>9/2</b>. Respecto de x habría que partir en dos regiones; respecto de y basta una integral."]) +
    ejemplo("Curva, tangente y eje", "Halla el área limitada por y = x² + 1, su recta tangente en el punto (1, 2) y el eje Y.",
      ["Tangente: y′ = 2x, pendiente 2 en x = 1 ⟹ y − 2 = 2(x − 1) ⟹ y = 2x. La parábola siempre queda por encima de su tangente (es convexa): x² + 1 − 2x = (x − 1)² ≥ 0.",
       "La región queda entre x = 0 (el eje Y) y x = 1 (el punto de tangencia).",
       "Área = " + I("0", "1") + " (x² + 1 − 2x)dx = " + I("0", "1") + " (x − 1)²dx = [(x − 1)³/3]<sub>0</sub><sup>1</sup> = 0 − (−1/3) = <b>1/3</b>."]);

  B.parte.m2t12a = { secciones: secciones, I: I };
})(window);
