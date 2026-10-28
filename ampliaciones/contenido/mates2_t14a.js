/* ============================================================
   Matemáticas II · ampliaciones · Tema 14: Distribuciones de probabilidad
   (parte A: se añade al final de las cuatro secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t14/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Variable aleatoria
  secciones[0] =
    "<h5>Función de probabilidad, media y desviación típica</h5>" +
    "<p>Una variable aleatoria <b>discreta</b> X toma valores sueltos x<sub>1</sub>, x<sub>2</sub>, …, x<sub>n</sub>. Su <b>función de probabilidad</b> asigna a cada valor su probabilidad p<sub>i</sub> = P(X = x<sub>i</sub>), y se escribe casi siempre como una tabla. Para que sea una distribución válida se exigen dos condiciones:</p>" +
    "<ul><li><b>Cada probabilidad entre 0 y 1</b>: 0 ≤ p<sub>i</sub> ≤ 1.</li><li><b>Suma total igual a 1</b>: p<sub>1</sub> + p<sub>2</sub> + … + p<sub>n</sub> = 1 (alguno de los valores tiene que salir).</li></ul>" +
    "<p>Si en el enunciado aparece una incógnita (k, a, …) en la tabla, casi siempre se obtiene con la segunda condición. Los dos números que resumen la distribución son:</p>" +
    tabla(["Parámetro", "Fórmula", "Qué mide"], [
      ["Media (esperanza) μ", "μ = Σ x<sub>i</sub>·p<sub>i</sub>", "El valor «promedio a largo plazo»: el centro de gravedad de las barras. No tiene por qué ser un valor posible."],
      ["Varianza σ²", "σ² = Σ x<sub>i</sub>²·p<sub>i</sub> − μ²", "Cuánto se alejan los valores de la media, en promedio cuadrático."],
      ["Desviación típica σ", "σ = √σ²", "Lo mismo, en las unidades de X."]
    ]) +
    "<p>La fórmula abreviada de la varianza (E(X²) − μ²) es la que conviene usar: se hace en una sola pasada por la tabla. Prueba con las cinco distribuciones del simulador: en la del dado, μ = 3,5 aunque el 3,5 «no salga nunca»; en el juego de las monedas, la media es la ganancia por partida si se juega muchas veces.</p>" +
    w("m2t14_discreta") +
    ejemplo("Media y desviación típica con una tabla", "X tiene la función de probabilidad: P(0) = 0,1; P(1) = 0,3; P(2) = 0,4; P(3) = 0,15; P(4) = 0,05. Calcula μ y σ.",
      ["Comprobamos que es una distribución: 0,1 + 0,3 + 0,4 + 0,15 + 0,05 = 1 ✓.",
       "Media: μ = 0·0,1 + 1·0,3 + 2·0,4 + 3·0,15 + 4·0,05 = 0 + 0,3 + 0,8 + 0,45 + 0,2 = <b>1,75</b>.",
       "E(X²) = 0·0,1 + 1·0,3 + 4·0,4 + 9·0,15 + 16·0,05 = 0,3 + 1,6 + 1,35 + 0,8 = 4,05.",
       "Varianza: σ² = 4,05 − 1,75² = 4,05 − 3,0625 = <b>0,9875</b>. Desviación típica: σ = √0,9875 ≈ <b>0,994</b>."]) +
    ejemplo("Hallar la incógnita de la tabla", "Una variable X toma los valores 0, 1, 2 y 3 con P(X = x) = k·(x + 1). Calcula k, la media y la desviación típica.",
      ["Las probabilidades son k, 2k, 3k y 4k. Deben sumar 1: 10k = 1 ⟹ <b>k = 0,1</b> (y así p = 0,1; 0,2; 0,3; 0,4, todas entre 0 y 1).",
       "μ = 0·0,1 + 1·0,2 + 2·0,3 + 3·0,4 = 0,2 + 0,6 + 1,2 = <b>2</b>.",
       "E(X²) = 0,2 + 4·0,3 + 9·0,4 = 0,2 + 1,2 + 3,6 = 5. Varianza = 5 − 2² = <b>1</b> y <b>σ = 1</b>."]) +
    ejemplo("Un juego justo", "Se lanza un dado: si sale 6 se ganan 5 €, y en otro caso se pierde 1 €. ¿Cuál es la ganancia media por partida? ¿Es un juego justo?",
      ["Sea X la ganancia: toma el valor 5 con probabilidad 1/6 y el valor −1 con probabilidad 5/6.",
       "μ = 5·(1/6) + (−1)·(5/6) = 5/6 − 5/6 = <b>0 €</b>.",
       "Un juego es <b>justo</b> cuando la ganancia media es 0: a la larga ni se gana ni se pierde. Con un premio de 4 € la media sería 4/6 − 5/6 = −1/6 €: el jugador perdería 1/6 € por partida."]) +
    "<h5>Variables continuas: la probabilidad es un área</h5>" +
    "<p>Una variable <b>continua</b> (peso, altura, tiempo…) puede tomar cualquier valor de un intervalo y su distribución se describe con una <b>función de densidad</b> f(x) ≥ 0, cuya área total vale 1. La probabilidad de un intervalo es el área bajo f sobre él: P(a ≤ X ≤ b) = ∫<sub>a</sub><sup>b</sup> f(x)dx (el Tema 12 entra aquí). Dos consecuencias importantes:</p>" +
    "<ul><li><b>P(X = a) = 0</b> para cualquier valor concreto: un punto no tiene área. Por eso, en una variable continua, P(X &lt; a) = P(X ≤ a) y da igual escribir &lt; o ≤.</li><li>En una variable <b>discreta</b> sí importa: P(X &lt; 3) ≠ P(X ≤ 3), porque P(X = 3) &gt; 0. En la binomial hay que tener mucho cuidado con la desigualdad.</li></ul>" +
    ojo("«Probabilidad ≠ altura de la curva». En una continua, f(x) puede ser mayor que 1 (si la variable se concentra en un intervalo muy pequeño); lo que no puede superar 1 es el área.");

  // ---------------------------------------------------------------- 2. Binomial
  secciones[1] =
    "<h5>Cuándo una variable es binomial: la lista de comprobación</h5>" +
    "<p>Reconocer la binomial es la mitad del problema. X ~ B(n, p) cuando se cumplen las <b>cuatro</b> condiciones a la vez:</p>" +
    "<ol><li>Hay un número fijo n de pruebas.</li><li>Cada prueba tiene solo dos resultados: éxito o fracaso.</li><li>La probabilidad de éxito p es la misma en todas las pruebas.</li><li>Las pruebas son independientes entre sí.</li></ol>" +
    "<p>Siempre se define X = «número de éxitos» y es <b>éxito</b> lo que el enunciado pide contar (aunque sea algo malo, como una pieza defectuosa). Se escribe q = 1 − p.</p>" +
    tabla(["Situación", "¿Binomial?", "Por qué"], [
      ["Acertar al azar un test de 10 preguntas con 4 opciones; X = nº de aciertos", "Sí: B(10; 0,25)", "n = 10 pruebas independientes con p = 1/4."],
      ["Lanzar un dado 12 veces; X = nº de seises", "Sí: B(12; 1/6)", "Dos resultados (seis / no seis), p constante."],
      ["Sacar 3 bolas de una urna <b>con</b> reemplazamiento; X = nº de rojas", "Sí", "Al reponer la bola, p no cambia entre extracciones."],
      ["Sacar 3 bolas de una urna <b>sin</b> reemplazamiento (urna pequeña)", "No", "p cambia en cada extracción (es hipergeométrica). Se resuelve con probabilidad condicionada (Tema 13)."],
      ["Lanzar una moneda hasta que salga cara; X = nº de lanzamientos", "No", "No hay n fijo: el número de pruebas es la propia incógnita."],
      ["Cada día llueve con prob. 0,3 si llovió ayer y 0,1 si no", "No", "Las pruebas no son independientes."]
    ]) +
    "<h5>Calcular probabilidades: «exactamente», «al menos», «como mucho»</h5>" +
    "<p>La fórmula P(X = k) = C(n, k)·p<sup>k</sup>·q<sup>n−k</sup> se usa para valores sueltos. Para varios valores a la vez, hay que traducir bien el enunciado y a menudo conviene el <b>complementario</b>, porque las probabilidades de todos los valores suman 1:</p>" +
    tabla(["Enunciado", "Se escribe", "Cómo se calcula"], [
      ["Exactamente k", "P(X = k)", "Fórmula directa"],
      ["Como mucho k (no más de k)", "P(X ≤ k)", "P(0) + P(1) + … + P(k)"],
      ["Menos de k", "P(X ≤ k − 1)", "Un valor menos que «como mucho k»"],
      ["Al menos k (k o más)", "P(X ≥ k)", "1 − P(X ≤ k − 1)"],
      ["Más de k", "P(X ≥ k + 1)", "1 − P(X ≤ k)"],
      ["Al menos uno", "P(X ≥ 1)", "1 − P(X = 0) = 1 − q<sup>n</sup>"],
      ["Entre a y b (ambos incluidos)", "P(a ≤ X ≤ b)", "P(a) + … + P(b)"]
    ]) +
    w("m2t14_binom") +
    ejemplo("Binomial: exactamente, al menos uno y complementario", "Una máquina fabrica piezas con una probabilidad 0,3 de salir defectuosas. Se eligen 10 piezas al azar. Calcula la probabilidad de que (a) haya exactamente 3 defectuosas; (b) haya al menos una defectuosa; (c) haya 8 o más; (d) la media y la desviación típica de X.",
      ["X = nº de defectuosas ~ B(10; 0,3): 10 pruebas independientes, éxito = «defectuosa», p = 0,3, q = 0,7.",
       "<b>(a)</b> P(X = 3) = C(10, 3)·0,3³·0,7⁷ = 120·0,027·0,0823543 ≈ <b>0,2668</b>.",
       "<b>(b)</b> P(X ≥ 1) = 1 − P(X = 0) = 1 − 0,7¹⁰ = 1 − 0,0282 = <b>0,9718</b>. (Sumar nueve términos sería un disparate.)",
       "<b>(c)</b> P(X ≥ 8) = P(8) + P(9) + P(10) = 45·0,3⁸·0,7² + 10·0,3⁹·0,7 + 0,3¹⁰ ≈ 0,00145 + 0,00014 + 0,00001 ≈ <b>0,0016</b>: muy improbable.",
       "<b>(d)</b> μ = n·p = 10·0,3 = <b>3</b> defectuosas de media; σ = √(10·0,3·0,7) = √2,1 ≈ <b>1,449</b>."]) +
    ejemplo("«Al menos» con una tabla de la binomial", "En un test de 10 preguntas con 4 opciones se responde al azar. ¿Qué probabilidad hay de aprobar (5 o más aciertos)?",
      ["X ~ B(10; 0,25). Se pide P(X ≥ 5) = 1 − P(X ≤ 4).",
       "P(0) = 0,0563; P(1) = 0,1877; P(2) = 0,2816; P(3) = 0,2503; P(4) = 0,1460. Suma: P(X ≤ 4) = 0,9219.",
       "P(X ≥ 5) = 1 − 0,9219 = <b>0,0781</b>: aprobar al azar es muy raro (≈ 7,8 %). Esperados: μ = 2,5 aciertos."]) +
    ojo("«Al menos 3» NO es P(X &gt; 3): es P(X ≥ 3) = 1 − P(X ≤ 2). El error de un valor en la desigualdad es el más común en la binomial. Para evitarlo, escribe siempre «X ≥ …» o «X ≤ …» con el signo y rodea el valor frontera.");

  // ---------------------------------------------------------------- 3. Normal
  secciones[2] =
    "<h5>Propiedades de la curva normal</h5>" +
    "<p>La densidad de N(μ, σ) es f(x) = (1/(σ√(2π)))·e<sup>−(x−μ)²/(2σ²)</sup>. No hace falta integrarla (no tiene primitiva elemental): para eso existe la tabla. Lo que sí hay que saber de la gráfica:</p>" +
    "<ul><li>Es <b>simétrica</b> respecto de x = μ, con el máximo en la media (que coincide con la mediana).</li><li>El área total vale 1, y el <b>50 %</b> queda a cada lado de la media.</li><li>La <b>media μ</b> la desplaza a izquierda o derecha; la <b>desviación σ</b> la ensancha (σ grande: campana baja y ancha) o la estrecha. Tiene puntos de inflexión en μ ± σ.</li><li>Regla empírica <b>68 – 95 – 99,7</b>: en [μ − σ, μ + σ] está el 68,3 % de los datos; en [μ − 2σ, μ + 2σ], el 95,4 %; en [μ − 3σ, μ + 3σ], el 99,7 %.</li></ul>" +
    "<h5>Tipificar es cambiar de escala</h5>" +
    "<p>Si X ~ N(μ, σ), entonces Z = (X − μ)/σ sigue una N(0, 1). Restar μ centra la campana en 0; dividir por σ fija la unidad de medida en «desviaciones típicas». Como el área es la misma antes y después, <b>P(X ≤ a) = P(Z ≤ (a − μ)/σ)</b>. En el simulador, los números <b>z</b> debajo de la campana indican cuántas desviaciones típicas hay entre cada punto y la media: cambia μ y σ y comprueba que la forma no cambia, solo la escala del eje.</p>" +
    w("m2t14_normal") +
    ejemplo("Regla 68–95–99,7 con notas", "Las notas de un examen siguen N(6; 1,5). ¿Entre qué valores está el 95 % central de los alumnos? ¿Y cuántos de 200 alumnos sacan entre 4,5 y 7,5?",
      ["El 95 % central es μ ± 2σ = 6 ± 3 ⟹ <b>[3; 9]</b>.",
       "4,5 = μ − σ y 7,5 = μ + σ: ese tramo contiene el 68 % aproximado, es decir, 0,68·200 ≈ <b>136 alumnos</b> (con la tabla, 0,6826·200 = 136,5).",
       "Fuera de [3; 9] queda un 5 %, 2,5 % a cada lado: 5 alumnos por cada extremo."]) +
    ojo("La desviación típica va <b>en el denominador</b> al tipificar: Z = (X − μ)/σ, no (X − μ)·σ ni (X − μ)/σ². Y si el enunciado da la <b>varianza</b> (N(μ, σ²) en algunos libros), hay que hacer la raíz antes de tipificar: en la EvAU de Madrid se escribe N(μ, σ) con la desviación típica, pero lee con cuidado.");

  // ---------------------------------------------------------------- 4. Aproximación
  secciones[3] =
    "<h5>Cuándo la aproximación es fiable</h5>" +
    "<p>La binomial B(n, p) se parece a la normal N(np, √(npq)) cuando las dos barras «a cada lado» tienen sitio para desarrollarse. La regla práctica que se usa en clase (y en la EvAU) es:</p>" +
    "<div class='formula-wrap'><div class='formula'>n·p ≥ 5 &nbsp; y &nbsp; n·q ≥ 5 &nbsp;(= n(1 − p) ≥ 5)</div></div>" +
    "<p>Con p cerca de 0 o de 1 la binomial es muy asimétrica y la campana no sirve; con n pequeño, tampoco. En el simulador de abajo, mueve p hacia 0,05 con n = 20 y verás cómo falla; vuelve a subir n y se arregla.</p>" +
    "<h5>La corrección de continuidad (Yates)</h5>" +
    "<p>X es discreta (barras) y la normal continua (área). La barra de «X = k» ocupa en el eje el intervalo <b>[k − 0,5; k + 0,5]</b>, y es esa anchura la que hay que recoger. Se llama Y a la normal N(np, √(npq)) y se hace:</p>" +
    tabla(["Binomial (discreta)", "Normal (continua)"], [
      ["P(X = k)", "P(k − 0,5 ≤ Y ≤ k + 0,5)"],
      ["P(X ≤ k)", "P(Y ≤ k + 0,5)"],
      ["P(X &lt; k) = P(X ≤ k − 1)", "P(Y ≤ k − 0,5)"],
      ["P(X ≥ k)", "P(Y ≥ k − 0,5)"],
      ["P(X &gt; k) = P(X ≥ k + 1)", "P(Y ≥ k + 0,5)"],
      ["P(a ≤ X ≤ b)", "P(a − 0,5 ≤ Y ≤ b + 0,5)"]
    ]) +
    "<p>Truco para no equivocarse: <b>dibuja las barras</b>. Para P(X ≤ k) se incluye la barra entera del k, así que el borde derecho es k + 0,5; para P(X ≥ k) se incluye la barra del k, así que el borde izquierdo es k − 0,5. El simulador sombrea las barras pedidas y compara el resultado exacto, la normal sin corrección y la normal con corrección.</p>" +
    w("m2t14_aprox") +
    ejemplo("Binomial → normal con corrección", "Se lanza 100 veces una moneda. Halla (a) P(X ≤ 55) y (b) P(X = 50), con la aproximación normal.",
      ["X ~ B(100; 0,5). Condición: n·p = 50 ≥ 5 y n·q = 50 ≥ 5 ✓. Aproximación: Y ~ N(50; √(100·0,5·0,5)) = N(50; 5).",
       "<b>(a)</b> P(X ≤ 55) ≈ P(Y ≤ 55,5) = P(Z ≤ (55,5 − 50)/5) = P(Z ≤ 1,1) = <b>0,8643</b>. (Sin corrección saldría P(Z ≤ 1) = 0,8413: se pierde casi 0,023.) El valor exacto binomial es 0,8644.",
       "<b>(b)</b> P(X = 50) ≈ P(49,5 ≤ Y ≤ 50,5) = P(−0,1 ≤ Z ≤ 0,1) = 2·0,5398 − 1 = <b>0,0796</b>. Exacto: 0,0796. Sin corrección, la probabilidad de un solo punto sería 0: absurdo."]) +
    ejemplo("Cuándo NO usar la aproximación", "¿Se puede aproximar B(40; 0,05) por una normal?",
      ["n·p = 40·0,05 = 2 &lt; 5: la condición falla. La distribución es muy asimétrica (casi todo el peso en 0, 1, 2, 3 éxitos).",
       "Hay que calcular con la fórmula binomial, o usar otra aproximación (Poisson, que no es materia de Bachillerato)."]);

  B.parte.m2t14a = { secciones: secciones };
})(window);
