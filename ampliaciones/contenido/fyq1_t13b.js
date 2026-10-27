/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 13: Movimiento armónico simple
   Parte B: refuerzo de las secciones originales 4–6 (velocidad y aceleración, ley de Hooke, energía)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t13/" + ref); }
  var P = B._fq13;

  // ---------------------------------------------------------------- 4. Velocidad y aceleración
  P.secciones[3] =
    "<h5>De dónde salen las expresiones de v y de a</h5>" +
    "<p>La velocidad es la rapidez con que cambia la posición, y la aceleración la rapidez con que cambia la velocidad: v = dx/dt y a = dv/dt (las derivadas que verás en Matemáticas). Derivando x = A·cos(ωt + φ₀), la regla de la cadena da v = −A·ω·sen(ωt + φ₀), y derivando otra vez, a = −A·ω²·cos(ωt + φ₀). Aunque no domines todavía las derivadas, el resultado tiene una interpretación muy visual: la posición, la velocidad y la aceleración son <b>tres funciones sinusoidales de la misma frecuencia</b> pero <b>desfasadas</b>.</p>" +
    "<ul>" +
    "<li>La <b>velocidad</b> es x «adelantada» un cuarto de periodo (π/2): cuando x pasa por su máximo, v es cero; cuando x pasa por cero, v es máxima en módulo. Su valor máximo es <b>v<sub>máx</sub> = A·ω</b>.</li>" +
    "<li>La <b>aceleración</b> es −ω² por la posición: está en <b>oposición de fase</b> con x (desfasada π). Es máxima en módulo en los extremos y nula en el centro: <b>a<sub>máx</sub> = A·ω²</b>.</li>" +
    "</ul>" +
    w("f13_fasor") +
    "<h5>La relación fundamental: a = −ω²·x</h5>" +
    "<p>Comparando las expresiones de a(t) y de x(t) se obtiene la relación que caracteriza a un MAS: <b>a = −ω²·x</b>. Es una ecuación (la <i>ecuación diferencial</i> del MAS) que dice que la aceleración es proporcional a la elongación y de signo contrario. Todo movimiento que cumpla esta relación es un MAS, y su frecuencia angular es la raíz cuadrada del coeficiente de proporcionalidad. Por ejemplo, si un sistema cumple a = −25·x, entonces ω = 5 rad/s y T = 2π/5 = 1,257 s.</p>" +
    "<h5>La velocidad en función de la posición</h5>" +
    "<p>Muchas veces interesa saber la velocidad cuando el cuerpo está en una posición x concreta, sin pasar por el tiempo. Eliminando el tiempo entre x = A·cos θ y v = −A·ω·sen θ (con θ = ωt + φ₀) y usando sen²θ + cos²θ = 1 se obtiene:</p>" +
    formula("v = ±ω·√(A² − x²)") +
    "<p>El doble signo indica que el cuerpo pasa por cada posición dos veces, una en cada sentido, con la misma rapidez. En x = 0, v = ±A·ω (máxima); en x = ±A, v = 0 (el cuerpo se detiene un instante y da la vuelta).</p>" +
    tabla(["Instante", "Posición x", "Velocidad v", "Aceleración a", "Descripción (φ₀ = 0)"], [
      ["t = 0", "+A", "0", "−A·ω² (mínima)", "extremo positivo; la fuerza apunta al centro"],
      ["t = T/4", "0", "−A·ω (mín.)", "0", "pasa por el centro hacia los negativos, a la máxima velocidad"],
      ["t = T/2", "−A", "0", "+A·ω² (máx.)", "extremo negativo"],
      ["t = 3T/4", "0", "+A·ω (máx.)", "0", "pasa por el centro hacia los positivos"],
      ["t = T", "+A", "0", "−A·ω²", "vuelve al principio"]
    ]) +
    ejemplo("Velocidad y aceleración máximas", "Un MAS es x(t) = 0,1·cos(4t) (SI). Calcula las ecuaciones de v(t) y a(t), los valores máximos y el valor de x, v y a en t = 0 y en t = π/8 s.", [
      "v(t) = −A·ω·sen(ωt) = <b>−0,4·sen(4t)</b> m/s y a(t) = −A·ω²·cos(ωt) = <b>−1,6·cos(4t)</b> m/s².",
      "Máximos: v<sub>máx</sub> = A·ω = 0,1·4 = <b>0,4 m/s</b>; a<sub>máx</sub> = A·ω² = 0,1·16 = <b>1,6 m/s²</b>.",
      "t = 0: x = 0,1 m; v = 0; a = −1,6 m/s² (extremo, la aceleración es la máxima y apunta al centro).",
      "t = π/8: 4t = π/2 → x = 0; v = −0,4·sen(π/2) = −0,4 m/s; a = −1,6·cos(π/2) = 0 (pasa por el centro a la máxima velocidad)."
    ]) +
    ejemplo("Velocidad en una posición dada", "Un MAS tiene A = 0,10 m y ω = 4 rad/s. Calcula la velocidad cuando la elongación es x = 0,06 m y comprueba que a = −ω²·x.", [
      "v = ±ω·√(A² − x²) = ±4·√(0,10² − 0,06²) = ±4·√(0,01 − 0,0036) = ±4·√0,0064 = ±4·0,08 = <b>±0,32 m/s</b>.",
      "a = −ω²·x = −16·0,06 = <b>−0,96 m/s²</b> (apunta hacia el centro, contra la elongación).",
      "Comprobación de la ley: v² + ω²x² = 0,1024 + 0,0576 = 0,16 = ω²A² ✓."
    ]) +
    ejemplo("¿Cuánto se tarda en ir de un punto a otro?", "Un MAS tiene un periodo de 2,4 s. ¿Cuánto tarda el cuerpo en ir desde el centro (x = 0) hasta A/2? ¿Y desde A/2 hasta A?", [
      "Se toma x = A·sen(ωt), que empieza en 0. x = A/2 → sen(ωt) = 1/2 → ωt = π/6 → t = (π/6)/ω = T/12 = <b>0,2 s</b>.",
      "De 0 a A se tarda un cuarto de periodo: T/4 = 0,6 s. Luego de A/2 a A: 0,6 − 0,2 = <b>0,4 s</b> (T/6).",
      "El cuerpo tarda el doble en recorrer la segunda mitad del trayecto (la que acaba en el extremo) que la primera, porque va mucho más despacio cerca del extremo."
    ]) +
    ojo("la aceleración <b>no</b> es constante: no se pueden usar las ecuaciones del MRUA (Tema 8) en un MAS. La aceleración cambia continuamente (a = −ω²x), y por eso hay que usar las ecuaciones propias del MAS.");

  // ---------------------------------------------------------------- 5. Fuerza recuperadora: ley de Hooke
  P.secciones[4] =
    "<h5>La ley de Hooke: el muelle ideal</h5>" +
    "<p>Robert Hooke publicó en 1678, en forma de anagrama latino, la ley que lleva su nombre: <i>ut tensio, sic vis</i> («como la extensión, así la fuerza»). Si se estira o se comprime un muelle una distancia x respecto de su longitud natural, el muelle ejerce una fuerza <b>proporcional a x y de sentido contrario</b>, que siempre tira de la masa hacia la posición de equilibrio (por eso se llama <b>fuerza recuperadora</b>):</p>" +
    formula("F = −k·x") +
    "<p>La <b>constante elástica</b> k se mide en N/m y representa lo «duro» que es el muelle (cuántos newtons hacen falta para estirarlo 1 m): un muelle de 200 N/m es el doble de duro que uno de 100 N/m. La ley sólo es válida mientras no se superen el <b>límite elástico</b> del muelle: pasado éste, el muelle se deforma permanentemente y la fuerza deja de ser proporcional. Una forma de comprobar la ley (y de medir k) es colgar masas distintas del muelle, medir cada alargamiento y representar la fuerza (m·g) frente al alargamiento: debe salir una recta cuya pendiente es k.</p>" +
    w("f13_hooke") +
    "<h5>De la ley de Hooke al MAS: la frecuencia del muelle</h5>" +
    "<p>Ahora se puede demostrar que un cuerpo unido a un muelle describe un MAS. Se aplica la segunda ley en el eje del muelle (sin rozamiento): la única fuerza que actúa en esa dirección es la del muelle, así que</p>" +
    formula("m·a = −k·x &nbsp;&nbsp;⇒&nbsp;&nbsp; a = −" + fr("k", "m") + "·x") +
    "<p>Esto es exactamente la relación a = −ω²·x del MAS con <b>ω² = k/m</b>. Por tanto el movimiento es un MAS, con</p>" +
    formula("ω = √(" + fr("k", "m") + ") &nbsp;&nbsp;&nbsp;&nbsp; T = 2π·√(" + fr("m", "k") + ") &nbsp;&nbsp;&nbsp;&nbsp; f = " + fr("1", "2π") + "·√(" + fr("k", "m") + ")") +
    "<p>Hay conclusiones físicas importantes: (1) el periodo <b>no depende de la amplitud</b> (isocronismo); (2) <b>cuanta más masa, más lento</b> (T ∝ √m: para duplicar el periodo hay que cuadruplicar la masa); (3) <b>cuanto más duro es el muelle, más rápido</b> (T ∝ 1/√k); (4) T no depende de g: un muelle oscilando tarda lo mismo en la Tierra que en la Luna. Estas mismas ideas permiten «pesar» en el espacio, donde las básculas normales no sirven: un astronauta mide su masa con una silla unida a un muelle, midiendo el periodo de oscilación (T = 2π√(m/k) → m = k·T²/4π²).</p>" +
    "<h5>El muelle vertical: la gravedad sólo mueve el equilibrio</h5>" +
    "<p>Cuando la masa cuelga del muelle, además de la fuerza elástica actúa el peso. Al colgarla, el muelle se estira una longitud Δℓ hasta que ambas fuerzas se compensan: <b>k·Δℓ = m·g</b>, es decir, Δℓ = m·g/k. Ése es el nuevo punto de equilibrio. Si se mide la posición respecto de él, la fuerza neta sobre la masa es de nuevo −k·x (el peso queda compensado por la parte constante de la fuerza del muelle), y por tanto es un MAS con la misma ω = √(k/m). <b>La gravedad desplaza el centro de la oscilación pero no cambia su periodo.</b></p>" +
    w("f13_vertical") +
    "<h5>Asociación de muelles</h5>" +
    "<p>Dos muelles se pueden combinar de dos maneras, y el conjunto se comporta como un único muelle con una <b>constante equivalente</b>. En <b>serie</b> (uno a continuación del otro) los dos soportan la misma fuerza y los alargamientos se suman: 1/k<sub>eq</sub> = 1/k₁ + 1/k₂ (k<sub>eq</sub> es menor que cada una: el conjunto es más blando). En <b>paralelo</b> (los dos sujetan la misma masa) los alargamientos son iguales y las fuerzas se suman: k<sub>eq</sub> = k₁ + k₂ (más duro).</p>" +
    w("f13_asociacion") +
    ejemplo("Frecuencia de una masa en un muelle", "Una masa de 0,5 kg está unida a un muelle horizontal de k = 200 N/m. Calcula ω, T y f.", [
      "ω = √(k/m) = √(200/0,5) = √400 = <b>20 rad/s</b>.",
      "T = 2π/ω = 2π/20 = <b>0,314 s</b>.",
      "f = 1/T = <b>3,18 Hz</b>. (Con la masa cuadruplicada, 2 kg, el periodo se duplicaría: T = 0,628 s.)"
    ]) +
    ejemplo("Medir k colgando una masa", "Al colgar una masa de 0,4 kg, un muelle se alarga 8 cm. Calcula k y el periodo de oscilación de esa masa (g = 9,8 m/s²).", [
      "En el equilibrio, k·Δℓ = m·g → k = 0,4·9,8/0,08 = 3,92/0,08 = <b>49 N/m</b>.",
      "T = 2π·√(m/k) = 2π·√(0,4/49) = 2π·0,0904 = <b>0,568 s</b>.",
      "Comprobación con Δℓ: T = 2π·√(Δℓ/g) = 2π·√(0,08/9,8) = 0,568 s ✓ (aquí T sólo depende del alargamiento en el equilibrio)."
    ]) +
    ejemplo("Muelle vertical en la Tierra y en la Luna", "Una masa de 2 kg cuelga de un muelle de k = 100 N/m. Calcula el alargamiento de equilibrio y el periodo en la Tierra (g = 9,8) y en la Luna (g = 1,62).", [
      "Tierra: Δℓ = m·g/k = 2·9,8/100 = <b>0,196 m</b>. Luna: Δℓ = 2·1,62/100 = <b>0,0324 m</b>.",
      "El periodo no depende de g: T = 2π·√(m/k) = 2π·√(2/100) = <b>0,889 s</b> en los dos casos."
    ]) +
    ejemplo("Muelles en serie y en paralelo", "Se dispone de dos muelles, de 30 N/m y de 60 N/m. Calcula la constante equivalente en serie y en paralelo y el periodo de una masa de 0,5 kg en cada caso.", [
      "Serie: 1/k = 1/30 + 1/60 = 3/60 → k = <b>20 N/m</b>. Paralelo: k = 30 + 60 = <b>90 N/m</b>.",
      "T<sub>serie</sub> = 2π·√(0,5/20) = <b>0,993 s</b>. T<sub>paralelo</sub> = 2π·√(0,5/90) = <b>0,468 s</b>.",
      "El conjunto en paralelo es 4,5 veces más duro y oscila √4,5 = 2,1 veces más rápido."
    ]) +
    ojo("la fuerza recuperadora F = −k·x depende de la <b>elongación</b> x respecto del equilibrio, no de la longitud del muelle. En un muelle vertical, x se mide desde el nuevo equilibrio (no desde la longitud natural).");

  // ---------------------------------------------------------------- 6. Energía en el MAS
  P.secciones[5] =
    "<h5>La energía potencial elástica</h5>" +
    "<p>La fuerza del muelle es una <b>fuerza conservativa</b> (como el peso): el trabajo que hace depende sólo de las posiciones inicial y final, no del camino. Por eso tiene asociada una energía potencial, la <b>energía potencial elástica</b>. Para estirar el muelle desde 0 hasta x hay que hacer un trabajo igual al <b>área bajo la gráfica F–x</b> (el triángulo de base x y altura k·x): W = ½·x·(k·x) = ½·k·x². Esa energía queda almacenada en el muelle:</p>" +
    formula("E<sub>p</sub> = ½·k·x²") +
    "<p>Es siempre positiva (da igual estirar que comprimir, porque x está al cuadrado) y vale cero en el equilibrio. Se mide en julios.</p>" +
    "<h5>Conservación de la energía mecánica: E<sub>m</sub> = ½·k·A²</h5>" +
    "<p>Sin rozamiento, la única fuerza que realiza trabajo es la del muelle (conservativa), así que la energía mecánica E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> se conserva (Tema 12). Se puede calcular en el instante más cómodo: en un extremo (x = ±A) la velocidad es cero, toda la energía es potencial y</p>" +
    formula("E<sub>m</sub> = ½·k·A² = ½·m·A²·ω² = ½·m·v<sub>máx</sub>²") +
    "<p>(la última igualdad es la misma energía calculada en el centro, donde toda es cinética). La energía mecánica es proporcional al <b>cuadrado de la amplitud</b>: si se duplica A, la energía se multiplica por 4. Y depende de k pero no de m.</p>" +
    "<p>En una posición x cualquiera, la energía se reparte así:</p>" +
    formula("E<sub>p</sub> = ½·k·x² &nbsp;&nbsp;&nbsp; E<sub>c</sub> = E<sub>m</sub> − E<sub>p</sub> = ½·k·(A² − x²) = ½·m·v²") +
    "<p>De la última igualdad se deduce de nuevo v = ±ω·√(A² − x²) (con ω² = k/m): la conservación de la energía y la cinemática del MAS dicen lo mismo.</p>" +
    w("f13_energia") +
    "<h5>Energía frente a posición y frente a tiempo</h5>" +
    "<p>Las gráficas muestran dos cosas. Frente a la <b>posición</b>, E<sub>p</sub> es una <b>parábola</b> con mínimo en x = 0 y E<sub>c</sub> es la parábola «invertida»; su suma es la recta horizontal E<sub>m</sub>. Se cruzan en x = ±A/√2 ≈ ±0,707·A, donde cada una vale la mitad de la energía. Frente al <b>tiempo</b>, E<sub>p</sub> = ½kA²·cos²(ωt + φ₀) y E<sub>c</sub> = ½kA²·sen²(ωt + φ₀): cada una oscila con una <b>frecuencia doble</b> que la del movimiento (dos máximos por periodo, porque se pasa por cada extremo y por el centro dos veces) y están en oposición, de modo que cuando una sube la otra baja. El valor medio de cada una es la mitad de la energía mecánica.</p>" +
    ejemplo("Reparto de energía", "Una masa de 0,4 kg oscila en un muelle de k = 100 N/m con una amplitud de 0,10 m. Calcula la energía mecánica, la velocidad máxima y las energías cinética y potencial y la velocidad cuando x = 0,06 m.", [
      "E<sub>m</sub> = ½·k·A² = ½·100·0,10² = <b>0,5 J</b>.",
      "Velocidad máxima: ½·m·v<sub>máx</sub>² = E<sub>m</sub> → v<sub>máx</sub> = √(2·0,5/0,4) = <b>1,58 m/s</b> (comprobación: A·ω = 0,1·√(100/0,4) = 0,1·15,81 = 1,58 ✓).",
      "En x = 0,06 m: E<sub>p</sub> = ½·100·0,06² = <b>0,18 J</b> y E<sub>c</sub> = 0,5 − 0,18 = <b>0,32 J</b>.",
      "v = √(2·E<sub>c</sub>/m) = √(2·0,32/0,4) = <b>1,265 m/s</b>."
    ]) +
    ejemplo("¿Dónde se igualan?", "En un MAS de amplitud A = 0,2 m, ¿para qué elongación coinciden E<sub>c</sub> y E<sub>p</sub>? ¿Y para cuál es E<sub>c</sub> = 3·E<sub>p</sub>?", [
      "E<sub>c</sub> = E<sub>p</sub> → cada una es la mitad de la total: ½kx² = ½·(½kA²) → x² = A²/2 → x = A/√2 = 0,2/1,414 = <b>±0,1414 m</b>.",
      "E<sub>c</sub> = 3E<sub>p</sub> → E<sub>p</sub> = E<sub>m</sub>/4 (porque E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = 4E<sub>p</sub>) → ½kx² = ¼·½kA² → x = A/2 = <b>±0,1 m</b>."
    ]) +
    ojo("la energía <b>no</b> depende de la masa: E<sub>m</sub> = ½kA². Y la energía mecánica sólo se conserva si no hay rozamiento: en un movimiento amortiguado la amplitud va disminuyendo porque la energía se disipa en forma de calor.");
})(window);
