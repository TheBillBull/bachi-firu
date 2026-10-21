/* ============================================================
   Matemáticas I · ampliaciones · Tema 12: Estadística bidimensional
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "mates1/t12/" + ref); }

  var resumen = [
    "Una variable estadística bidimensional estudia <b>dos características a la vez</b> en los mismos individuos: pares (xᵢ, yᵢ). Se dibuja como <b>nube de puntos</b>.",
    "Medias x̄, ȳ · varianzas Sx² = Σxᵢ²/n − x̄² · <b>covarianza</b> Sxy = Σxᵢyᵢ/n − x̄·ȳ (su signo dice si x e y «suben juntas»).",
    "<b>Coeficiente de correlación</b> r = Sxy/(Sx·Sy), siempre entre −1 y 1: mide la fuerza de la relación <b>lineal</b>. r² es el porcentaje de variación de y explicado por x.",
    "<b>Recta de regresión de y sobre x</b>: y − ȳ = (Sxy/Sx²)(x − x̄). Minimiza la suma de los cuadrados de los errores y pasa siempre por (x̄, ȳ). La de x sobre y es otra recta distinta (y mᵧₓ·mₓᵧ = r²).",
    "Predecir con la recta: <b>interpolar</b> (x dentro del rango de los datos) es fiable; <b>extrapolar</b> (fuera) puede dar resultados absurdos. Correlación no implica causalidad.",
    "Una nube curva puede enderezarse con logaritmos: exponencial (ln y frente a x), potencial (ln y frente a ln x) y logarítmica (y frente a ln x)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Variable bidimensional
  secciones[0] =
    "<h5>Pares de datos: la unidad estadística</h5>" +
    "<p>En la estadística de una variable cada individuo aporta un número (su altura, su nota…). Aquí cada individuo aporta <b>dos</b>: una pareja (xᵢ, yᵢ). El objetivo es responder a preguntas del tipo: ¿los alumnos que estudian más horas sacan mejores notas? ¿los coches más viejos valen menos? ¿hay relación entre la temperatura exterior y el gasto en calefacción? No basta con estudiar x e y por separado: lo interesante es <b>cómo se comportan juntas</b>.</p>" +
    "<p>En este tema ambas variables son <b>cuantitativas</b> (números). Se suelen llamar <b>x</b> a la variable que se toma como explicativa (la que se supone que influye o que se conoce) e <b>y</b> a la que se quiere explicar o predecir.</p>" +
    "<h5>Cómo se presentan los datos</h5>" +
    "<p>Hay tres formas habituales de organizar los pares:</p>" +
    "<ol>" +
    "<li><b>Lista de parejas</b> (datos sin agrupar): (1, 3), (2, 4), (3, 6), (4, 7), (5, 8), con n = 5 individuos.</li>" +
    "<li><b>Tabla de frecuencias con repeticiones</b>: se añade una columna fᵢ con las veces que aparece cada pareja.</li>" +
    "<li><b>Tabla de doble entrada</b>: filas para los valores de una variable, columnas para los de la otra y, en cada casilla, la frecuencia absoluta conjunta fᵢⱼ (cuántos individuos tienen a la vez xⱼ e yᵢ). Los totales de fila y columna son las <b>distribuciones marginales</b> (se estudian más abajo).</li>" +
    "</ol>" +
    tabla(["Nota (y) ↓ · Horas (x) →", "1", "2", "3", "Total"], [
      ["4", "6", "2", "1", "9"], ["6", "3", "5", "3", "11"], ["8", "1", "3", "6", "10"], ["Total", "10", "10", "10", "30"]
    ]) +
    "<p>La tabla de arriba corresponde a 30 alumnos: 6 estudian 1 hora y sacan un 4; 1 estudia 1 hora y saca un 8; etc. Fíjate en que los valores altos de x se concentran en las notas más altas: hay una relación.</p>" +
    "<h5>La nube de puntos: qué mirar</h5>" +
    "<p>Cada pareja (xᵢ, yᵢ) es un punto del plano; el conjunto de todos ellos es la <b>nube de puntos</b> o <b>diagrama de dispersión</b>. Antes de calcular nada, <b>dibújala</b> y fíjate en cuatro cosas:</p>" +
    tabla(["Qué mirar", "Qué significa"], [
      ["Dirección", "si la nube sube (relación positiva), baja (negativa) o no tiene dirección"],
      ["Forma", "si se parece a una recta (lineal), a una curva (no lineal) o a una mancha redonda (sin relación)"],
      ["Fuerza", "cuánto se pegan los puntos a esa recta o curva: muy juntos = relación fuerte"],
      ["Datos raros", "puntos aislados (atípicos) que no siguen el patrón y pueden distorsionarlo todo"]
    ]) +
    "<h5>Tres tipos de dependencia</h5>" +
    tabla(["Tipo", "Descripción", "Ejemplo"], [
      ["Funcional", "y queda determinada exactamente por x: todos los puntos están sobre una curva", "perímetro de un cuadrado y su lado: P = 4ℓ"],
      ["Estadística (aleatoria)", "hay tendencia, pero con dispersión: los puntos se agrupan en torno a una curva sin caer exactamente en ella", "altura y peso de las personas"],
      ["Independencia", "no hay ninguna tendencia: saber x no ayuda a predecir y", "talla de zapato y nota de matemáticas en un mismo curso"]
    ]) +
    "<p>La estadística bidimensional se ocupa del caso intermedio: la dependencia <b>estadística</b>. Cuanto más cerca está de la funcional, más fuerte es la relación; cuanto más cerca de la independencia, más débil.</p>" +
    w("m12_nube");

  // ---------------------------------------------------------------- 2. Medias y covarianza
  secciones[1] =
    "<h5>Medias y varianzas de cada variable</h5>" +
    "<p>Antes de combinar las dos variables hay que resumir cada una por separado, con las mismas fórmulas de la estadística de una variable (que se aplican a la columna de x y a la de y):</p>" +
    formula("x̄ = Σxᵢ / n   ·   ȳ = Σyᵢ / n") +
    formula("Sx² = Σxᵢ² / n − x̄²   ·   Sy² = Σyᵢ² / n − ȳ²   ·   Sx = √(Sx²)   ·   Sy = √(Sy²)") +
    "<p>Si hay frecuencias (los pares se repiten fᵢ veces) se multiplica cada término por su frecuencia y se divide entre N = Σfᵢ. Esta forma de la varianza («media de los cuadrados menos el cuadrado de la media») es la más cómoda para los cálculos con tabla.</p>" +
    "<h5>La covarianza: «¿suben juntas?»</h5>" +
    "<p>La covarianza mide si las dos variables varían <b>en el mismo sentido</b>. Se define como la media de los productos de las desviaciones respecto a las medias:</p>" +
    formula("Sxy = Σ(xᵢ − x̄)(yᵢ − ȳ) / n = Σxᵢyᵢ / n − x̄·ȳ") +
    "<p>(La segunda forma sale de desarrollar el producto: (xᵢ − x̄)(yᵢ − ȳ) = xᵢyᵢ − x̄yᵢ − ȳxᵢ + x̄ȳ; al sumar y dividir entre n queda Σxᵢyᵢ/n − x̄ȳ − ȳx̄ + x̄ȳ = Σxᵢyᵢ/n − x̄ȳ.)</p>" +
    "<p><b>Por qué su signo es tan informativo.</b> Los ejes que pasan por el centro (x̄, ȳ) dividen la nube en cuatro cuadrantes. Un punto del cuadrante superior derecho tiene (xᵢ − x̄) &gt; 0 y (yᵢ − ȳ) &gt; 0: el producto es positivo. Lo mismo en el inferior izquierdo (negativo por negativo). En cambio, los cuadrantes superior izquierdo e inferior derecho dan productos negativos.</p>" +
    tabla(["Cuadrante respecto de (x̄, ȳ)", "Signo de (xᵢ − x̄)", "Signo de (yᵢ − ȳ)", "Producto"], [
      ["Arriba a la derecha", "+", "+", "+"], ["Abajo a la izquierda", "−", "−", "+"], ["Arriba a la izquierda", "−", "+", "−"], ["Abajo a la derecha", "+", "−", "−"]
    ]) +
    "<p>Si la nube sube, casi todos los puntos están en los cuadrantes de producto positivo y <b>Sxy &gt; 0</b>; si baja, <b>Sxy &lt; 0</b>; si los puntos se reparten por los cuatro cuadrantes, los productos positivos y negativos se compensan y <b>Sxy ≈ 0</b>.</p>" +
    "<h5>Cómo se calcula: la tabla de cálculo</h5>" +
    "<p>Se construye una tabla con las columnas xᵢ, yᵢ, xᵢ², yᵢ² y xᵢyᵢ; se suman y todo lo demás sale de las sumas. Ejemplo con las horas de estudio (x) y las notas (y) de cinco alumnos:</p>" +
    tabla(["i", "xᵢ", "yᵢ", "xᵢ²", "yᵢ²", "xᵢ·yᵢ"], [
      ["1", "1", "3", "1", "9", "3"], ["2", "2", "4", "4", "16", "8"], ["3", "3", "6", "9", "36", "18"], ["4", "4", "7", "16", "49", "28"], ["5", "5", "8", "25", "64", "40"], ["Σ", "15", "28", "55", "174", "97"]
    ]) +
    ejemplo("Medias, varianzas y covarianza", "Con los datos de la tabla, calcula x̄, ȳ, Sx², Sy², Sx, Sy y Sxy.", [
      "x̄ = 15/5 = <b>3</b> y ȳ = 28/5 = <b>5,6</b>.",
      "Sx² = 55/5 − 3² = 11 − 9 = <b>2</b> → Sx = √2 = 1,4142. Sy² = 174/5 − 5,6² = 34,8 − 31,36 = <b>3,44</b> → Sy = 1,8547.",
      "Sxy = 97/5 − 3·5,6 = 19,4 − 16,8 = <b>2,6</b>.",
      "Comprobación con la definición: las desviaciones (xᵢ − 3) son −2, −1, 0, 1, 2 y las (yᵢ − 5,6) son −2,6, −1,6, 0,4, 1,4, 2,4; los productos 5,2, 1,6, 0, 1,4, 4,8 suman 13 y 13/5 = 2,6 ✓."
    ]) +
    w("m12_tabla") +
    "<h5>Con una tabla de doble entrada</h5>" +
    "<p>Cuando los datos vienen en una tabla de doble entrada, cada pareja (xⱼ, yᵢ) aparece fᵢⱼ veces y las sumas se hacen con frecuencias: Σxᵢyᵢ → ΣΣ fᵢⱼ·xⱼ·yᵢ y N = ΣΣ fᵢⱼ. Para las medias basta usar las distribuciones marginales.</p>" +
    ejemplo("Tabla 2 × 2", "En 8 cajas se miden x = 1 ó 2 (kg de fertilizante) e y = 1 ó 2 (kg de fruta). Las frecuencias son f(1,1) = 3, f(2,1) = 1, f(1,2) = 1 y f(2,2) = 3. Calcula Sxy.", [
      "N = 3 + 1 + 1 + 3 = 8. Σx·f = 1·(3 + 1) + 2·(1 + 3) = 12 → x̄ = 1,5; por simetría ȳ = 1,5.",
      "Σxy·f = 1·1·3 + 2·1·1 + 1·2·1 + 2·2·3 = 3 + 2 + 2 + 12 = 19.",
      "Sxy = 19/8 − 1,5·1,5 = 2,375 − 2,25 = <b>0,125</b>. (Varianzas: Sx² = Sy² = 0,25 → r = 0,125/0,25 = 0,5.)"
    ]) +
    "<h5>Propiedades útiles de la covarianza</h5>" +
    "<ul>" +
    "<li>Sxx = Sx²: la covarianza de una variable consigo misma es su varianza.</li>" +
    "<li>Sxy = Syx: es simétrica.</li>" +
    "<li><b>Cambio de origen y de escala</b>: si x′ = a·x + b e y′ = c·y + d, entonces x̄′ = a·x̄ + b, Sx′ = |a|·Sx y <b>Sx′y′ = a·c·Sxy</b>. Sumar una constante no cambia las desviaciones; multiplicar por a las multiplica por a.</li>" +
    "<li>Si x e y son independientes (en el sentido estadístico), Sxy = 0; pero <b>Sxy = 0 no implica independencia</b>: sólo ausencia de relación lineal.</li>" +
    "</ul>" +
    ejemplo("Cambio de unidades", "Con alturas en cm (x) y pesos en kg (y) de seis personas se obtiene Sxy = 109,22 cm·kg. Si expresamos la altura en metros, ¿cuánto vale la covarianza?", [
      "x′ = 0,01·x (a = 0,01) e y′ = y (c = 1): Sx′y′ = 0,01·1·109,22 = <b>1,0922</b> m·kg.",
      "El número cambia por completo, aunque la relación entre altura y peso es la misma: por eso la covarianza no sirve para decir si una relación es fuerte o débil. Eso lo resuelve el coeficiente de correlación."
    ]) +
    w("m12_unidades");

  // ---------------------------------------------------------------- 3. Correlación
  secciones[2] =
    "<h5>Por qué se divide entre las desviaciones típicas</h5>" +
    "<p>La covarianza tiene unidades (cm·kg, horas·puntos…) y se altera al cambiar la escala. Para obtener un número <b>sin unidades</b> y comparable se divide entre el producto de las desviaciones típicas. Nace así el <b>coeficiente de correlación lineal de Pearson</b>:</p>" +
    formula("r = Sxy / (Sx · Sy)") +
    "<h5>Propiedades</h5>" +
    "<ul>" +
    "<li><b>−1 ≤ r ≤ 1</b> siempre. (Idea de la demostración: la varianza de la variable y − m·x, con m = Sxy/Sx², no puede ser negativa y vale Sy²(1 − r²); por tanto 1 − r² ≥ 0.)</li>" +
    "<li>r y Sxy tienen <b>el mismo signo</b> (Sx y Sy son positivas).</li>" +
    "<li><b>r = 1</b> o <b>r = −1</b> si y sólo si todos los puntos están exactamente sobre una recta (creciente o decreciente).</li>" +
    "<li>No depende de las unidades: si x′ = ax + b e y′ = cy + d, entonces r′ = r si a·c &gt; 0 y r′ = −r si a·c &lt; 0 (se invierte el sentido de una variable).</li>" +
    "<li>Es simétrica: r(x, y) = r(y, x).</li>" +
    "</ul>" +
    "<h5>Cómo leer su valor</h5>" +
    tabla(["|r|", "Interpretación orientativa"], [
      ["0,9 a 1", "correlación muy fuerte"], ["0,7 a 0,9", "fuerte"], ["0,4 a 0,7", "moderada"], ["0,2 a 0,4", "débil"], ["0 a 0,2", "prácticamente nula (no hay relación lineal)"]
    ]) +
    "<p>Es una escala orientativa: el signo da el <b>sentido</b> (positiva: las dos suben; negativa: una sube y la otra baja) y el valor absoluto, la <b>fuerza</b> de la relación lineal.</p>" +
    ejemplo("Calcular r", "Con los datos de las horas de estudio, Sxy = 2,6, Sx = 1,4142 y Sy = 1,8547, calcula r e interprétalo.", [
      "r = 2,6/(1,4142·1,8547) = 2,6/2,6230 = <b>0,9912</b>.",
      "Es muy cercano a 1: correlación <b>positiva muy fuerte</b>. A más horas de estudio, notas más altas, y los puntos están casi alineados."
    ]) +
    ejemplo("Una relación negativa", "El precio (miles de €) de un coche tras 1, 2, 3, 4, 5 y 6 años es 18; 16; 14,5; 12; 10,5; 9. Se obtiene Sx² = 2,9167, Sy² = 9,8056 y Sxy = −5,3333. Calcula r.", [
      "r = −5,3333/√(2,9167·9,8056) = −5,3333/5,3479 = <b>−0,9973</b>.",
      "Correlación negativa muy fuerte: cada año que pasa el coche pierde valor de forma casi lineal."
    ]) +
    "<h5>El coeficiente de determinación r²</h5>" +
    "<p>El cuadrado de r se llama <b>coeficiente de determinación</b> y tiene una interpretación muy útil: <b>el porcentaje de la variabilidad de y que se explica por su relación lineal con x</b>. Con r = 0,9912 se tiene r² = 0,9825: el 98,25 % de las diferencias entre las notas se explica por las horas de estudio; el 1,75 % restante se debe a otros factores. Con r = 0,6, r² = 0,36: sólo el 36 % está explicado.</p>" +
    "<h5>Lo que r NO mide</h5>" +
    "<ul>" +
    "<li><b>Sólo mide relación lineal.</b> Con x = −2, −1, 0, 1, 2 e y = x² = 4, 1, 0, 1, 4, y es una función exacta de x y sin embargo r = 0 (la nube es una parábola simétrica). Un r cercano a 0 no significa «no hay relación», sino «no hay relación <i>lineal</i>». Hay que mirar la nube.</li>" +
    "<li><b>Es sensible a los valores atípicos.</b> Un solo dato extraño puede crear o destruir una correlación (ver el simulador de abajo).</li>" +
    "<li><b>Depende del rango de los datos.</b> Si se estudia sólo un tramo pequeño de x, r puede parecer bajo aunque la relación global sea fuerte.</li>" +
    "</ul>" +
    w("m12_adivina") +
    w("m12_atipicos") +
    "<h5>Correlación no es causalidad</h5>" +
    "<p>Que dos variables estén fuertemente correlacionadas <b>no demuestra que una cause la otra</b>. Hay cuatro explicaciones posibles de una correlación:</p>" +
    tabla(["Explicación", "Ejemplo"], [
      ["x causa y", "más horas de estudio → mejores notas (plausible)"],
      ["y causa x (causa inversa)", "los países más ricos tienen más médicos: ¿más médicos causan riqueza o la riqueza permite más médicos?"],
      ["Una tercera variable causa ambas (variable oculta)", "las ventas de helados y los ahogamientos están correlacionados: ambos suben con el calor"],
      ["Casualidad (correlación espuria)", "el consumo de queso per cápita y las muertes por enredarse en las sábanas: coinciden en el tiempo por azar"]
    ]) +
    ojo("para afirmar causalidad hace falta algo más que un coeficiente: un experimento controlado, un mecanismo que lo explique y descartar las otras posibilidades. r sólo habla de <b>asociación</b>.");

  // ---------------------------------------------------------------- 4. Recta de regresión
  secciones[3] =
    "<h5>La idea: la recta que menos se equivoca</h5>" +
    "<p>Entre todas las rectas que se pueden trazar sobre una nube, ¿cuál es «la mejor»? Para cada dato (xᵢ, yᵢ), la recta y = mx + n predice mxᵢ + n; la diferencia eᵢ = yᵢ − (mxᵢ + n) es el <b>residuo</b> (el error en vertical). Se busca la recta que hace <b>mínima la suma de los cuadrados de los residuos</b>:</p>" +
    formula("S(m, n) = Σ [ yᵢ − (m·xᵢ + n) ]²   →   mínimo") +
    "<p>Se eleva al cuadrado para que los errores positivos y negativos no se compensen y para penalizar más los errores grandes. Es el <b>método de mínimos cuadrados</b>. Pruébalo tú: ajusta la recta con los deslizadores y mira cómo cambia la suma de las áreas de los cuadrados.</p>" +
    w("m12_minimos") +
    "<h5>Deducción de la recta (con derivadas)</h5>" +
    "<p>S es una función de dos variables, m y n. Su mínimo se encuentra igualando a 0 las derivadas respecto de cada una (Tema 11):</p>" +
    "<ol>" +
    "<li>∂S/∂n = −2Σ[yᵢ − mxᵢ − n] = 0 → Σyᵢ − mΣxᵢ − n·N = 0 → dividiendo entre N: <b>ȳ = m·x̄ + n</b>. Es decir, la recta pasa por el punto (x̄, ȳ).</li>" +
    "<li>∂S/∂m = −2Σxᵢ[yᵢ − mxᵢ − n] = 0 → Σxᵢyᵢ − mΣxᵢ² − nΣxᵢ = 0 → dividiendo entre N: Σxᵢyᵢ/N − m·Σxᵢ²/N − n·x̄ = 0.</li>" +
    "<li>Sustituyendo n = ȳ − m·x̄ y reordenando: (Σxᵢyᵢ/N − x̄ȳ) − m(Σxᵢ²/N − x̄²) = 0 → <b>Sxy − m·Sx² = 0</b> → m = Sxy/Sx².</li>" +
    "</ol>" +
    "<h5>La recta de regresión de y sobre x</h5>" +
    formula("y − ȳ = (Sxy / Sx²) · (x − x̄)") +
    "<p>Es la ecuación punto-pendiente del Tema 8 con el punto (x̄, ȳ) y la pendiente <b>m = Sxy/Sx²</b> (el <b>coeficiente de regresión</b>). Otra forma muy útil: m = r·Sy/Sx. Interpretaciones:</p>" +
    "<ul>" +
    "<li><b>Pendiente m</b>: lo que aumenta (o disminuye) y de media por cada unidad que aumenta x. Tiene unidades (puntos por hora, euros por año…).</li>" +
    "<li><b>Ordenada n = ȳ − m·x̄</b>: el valor que predice la recta para x = 0. Sólo tiene sentido práctico si x = 0 está dentro o cerca del rango de datos.</li>" +
    "<li>El signo de m es el signo de r y de Sxy.</li>" +
    "</ul>" +
    ejemplo("La recta completa", "Con x̄ = 3, ȳ = 5,6, Sx² = 2 y Sxy = 2,6 (horas de estudio y nota), halla la recta de regresión de y sobre x y estima la nota de quien estudia 3,5 horas.", [
      "m = Sxy/Sx² = 2,6/2 = <b>1,3</b>.",
      "y − 5,6 = 1,3(x − 3) → y = 1,3x − 3,9 + 5,6 → <b>y = 1,3x + 1,7</b>.",
      "Interpretación: cada hora más de estudio supone, de media, 1,3 puntos más.",
      "Para x = 3,5: y = 1,3·3,5 + 1,7 = <b>6,25</b> (dentro del rango [1, 5]: interpolación fiable)."
    ]) +
    ejemplo("Una pendiente negativa", "Con los datos de los coches (x̄ = 3,5; ȳ = 13,333; Sx² = 2,9167; Sxy = −5,3333), halla la recta del precio sobre la antigüedad.", [
      "m = −5,3333/2,9167 = −1,8286 y n = 13,333 + 1,8286·3,5 = 19,733.",
      "<b>y = −1,8286x + 19,733</b>: un coche pierde de media 1 829 € al año, y uno nuevo (x = 0) valdría unos 19 733 €."
    ]) +
    "<h5>La recta de regresión de x sobre y</h5>" +
    "<p>Si se quiere <b>predecir x a partir de y</b>, no basta con despejar x en la recta anterior. La recta de <b>x sobre y</b> minimiza los errores en horizontal y se obtiene intercambiando los papeles de x e y:</p>" +
    formula("x − x̄ = (Sxy / Sy²) · (y − ȳ)") +
    "<p>Con los mismos datos: m′ = 2,6/3,44 = 0,7558 → x − 3 = 0,7558(y − 5,6) → x = 0,7558y − 1,2326. Para una nota y = 7: x = 4,058 horas. (Si se despejara x de la otra recta: (7 − 1,7)/1,3 = 4,077: casi igual, pero no es lo mismo.)</p>" +
    "<h5>Cómo se relacionan las dos rectas</h5>" +
    "<ul>" +
    "<li>Las dos pasan por el centro (x̄, ȳ): <b>se cortan en ese punto</b>.</li>" +
    "<li>El producto de sus pendientes (tomando y como función de x en ambas, o las pendientes de y/x y x/y) cumple <b>mᵧₓ·mₓᵧ = Sxy²/(Sx²Sy²) = r²</b>.</li>" +
    "<li>Si |r| = 1, coinciden. Cuanto menor es |r|, más se separan. Si r = 0, una es horizontal (y = ȳ) y la otra vertical (x = x̄).</li>" +
    "</ul>" +
    w("m12_dosrectas") +
    "<h5>Cuánto se equivoca la recta</h5>" +
    "<p>Los residuos de la recta de regresión suman 0 (Σeᵢ = 0). La suma de sus cuadrados es <b>SCE = n·Sy²·(1 − r²)</b>: cuanto mayor es r², menor es el error. Con los datos de estudio: n·Sy²(1 − r²) = 5·3,44·(1 − 0,9825) = 0,30, y se comprueba con los residuos de la recta y = 1,3x + 1,7:</p>" +
    tabla(["x", "y real", "y predicho", "residuo", "residuo²"], [
      ["1", "3", "3,0", "0,0", "0,00"], ["2", "4", "4,3", "−0,3", "0,09"], ["3", "6", "5,6", "0,4", "0,16"], ["4", "7", "6,9", "0,1", "0,01"], ["5", "8", "8,2", "−0,2", "0,04"], ["Σ", "", "", "0,0", "0,30"]
    ]);

  // ---------------------------------------------------------------- 5. Predicción
  secciones[4] =
    "<h5>Interpolar y extrapolar</h5>" +
    "<p>Para predecir el valor de y para un x nuevo se sustituye en la recta. Pero no todas las predicciones merecen la misma confianza:</p>" +
    tabla(["", "Interpolación", "Extrapolación"], [
      ["x está…", "dentro del rango de los datos observados", "fuera de ese rango"],
      ["Fiabilidad", "razonable (sobre todo si |r| es alto)", "muy dudosa: no sabemos si la relación sigue siendo lineal"],
      ["Ejemplo", "altura a los 6,5 años con datos de 2 a 10 años", "altura a los 30 años con esos mismos datos"]
    ]) +
    ejemplo("Una extrapolación absurda", "La altura de un niño entre los 2 y los 10 años sigue y = 6,333x + 76,11 (cm, x en años; r = 0,998). Predice la altura a los 6,5 años y a los 30 años.", [
      "A los 6,5 años (interpolación): y = 6,333·6,5 + 76,11 = <b>117,3 cm</b>. Razonable.",
      "A los 30 años (extrapolación): y = 6,333·30 + 76,11 = <b>266,1 cm</b>. ¡Absurdo! El crecimiento deja de ser lineal al llegar a la adolescencia.",
      "La recta ajusta muy bien (r = 0,998) <i>en el rango observado</i>, pero eso no la hace válida fuera de él."
    ]) +
    w("m12_prediccion") +
    "<h5>Qué hace fiable una predicción</h5>" +
    "<ol>" +
    "<li><b>|r| alto</b> (r² cercano a 1): los puntos están pegados a la recta.</li>" +
    "<li><b>Muchos datos</b>: con 3 o 4 puntos un r alto puede ser casualidad.</li>" +
    "<li><b>x dentro del rango</b> observado (interpolación).</li>" +
    "<li>Que la relación tenga <b>sentido</b> en el contexto (¿puede una antigüedad negativa o un precio negativo existir?).</li>" +
    "</ol>" +
    "<h5>Predecir x desde y</h5>" +
    "<p>Si lo que se conoce es y y se quiere estimar x, hay que usar la recta de x sobre y. Usar la de y sobre x «al revés» da un resultado distinto y menos adecuado (porque esa recta minimiza los errores de y, no los de x). Sólo coinciden cuando |r| = 1.</p>" +
    "<h5>Un dato de cultura: ¿por qué «regresión»?</h5>" +
    "<p>El nombre viene de Francis Galton (siglo XIX), que observó que los hijos de padres muy altos tendían a ser algo menos altos que sus padres (y los de padres muy bajos, algo más altos): sus alturas «regresaban» hacia la media de la población. En términos de la recta: si |r| &lt; 1, la predicción de y está «menos lejos de su media» que x de la suya (porque la pendiente es r·Sy/Sx).</p>";

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Con la calculadora: el modo estadístico y sus trampas",
      html:
        "<p>En los exámenes se permite la calculadora científica, que tiene un modo de <b>estadística con dos variables</b> (en las Casio suele ser MODE → STAT → «A + BX»; en otras marcas, «2-VAR» o «LR»). El procedimiento es siempre el mismo:</p>" +
        "<ol>" +
        "<li><b>Entra</b> en el modo estadístico de dos variables y <b>borra</b> los datos anteriores (esto es lo que más se olvida).</li>" +
        "<li><b>Introduce</b> cada pareja: x, luego y. Revisa la tabla: un dato mal escrito falsea todo.</li>" +
        "<li><b>Lee</b> los resultados: x̄, ȳ, las desviaciones típicas <b>poblacionales</b> (xσₙ, yσₙ; las que usamos aquí, dividiendo entre n), las sumas Σx, Σx², Σxy, y los coeficientes de la recta (A = ordenada, B = pendiente, r).</li>" +
        "</ol>" +
        tabla(["Resultado", "Símbolo habitual", "Lo que significa"], [
          ["n", "n", "número de parejas"], ["x̄ · ȳ", "x̄ · ȳ", "medias"], ["Sx · Sy", "xσₙ · yσₙ", "desviaciones típicas (÷ n)"], ["Σx, Σx², Σxy", "Σx, Σx², Σxy", "sumas para la tabla"],
          ["A", "A", "ordenada de la recta de y sobre x"], ["B", "B", "pendiente de la recta de y sobre x"], ["r", "r", "coeficiente de correlación"]
        ]) +
        ojo("las calculadoras dan dos desviaciones típicas: la <b>poblacional</b> (÷ n, la de este curso) y la <b>muestral</b> (÷ (n − 1)). Si usas la muestral, la covarianza y las rectas pueden salir distintas. r y la recta de regresión sí son iguales en los dos casos, porque el factor se cancela.") +
        "<p>Aun con calculadora, el examen suele exigir mostrar la <b>tabla</b> y las fórmulas, así que domina el método manual y utiliza la calculadora para <b>comprobar</b>. Practica ahora con la hoja de cálculo del simulador anterior: escribe tus datos y verifica con tu calculadora."
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Tablas de doble entrada: marginales, condicionadas e independencia",
      html:
        "<p>Cuando los datos son muchos o se repiten, se agrupan en una <b>tabla de doble entrada</b> (o tabla de contingencia). Veamos todo lo que se puede leer de ella con la tabla de 30 alumnos:</p>" +
        tabla(["Nota (y) ↓ · Horas (x) →", "1", "2", "3", "Total"], [
          ["4", "6", "2", "1", "9"], ["6", "3", "5", "3", "11"], ["8", "1", "3", "6", "10"], ["Total", "10", "10", "10", "30"]
        ]) +
        "<h5>Distribuciones marginales</h5>" +
        "<p>Los totales de las filas y de las columnas son las distribuciones de cada variable por separado: la <b>marginal de x</b> (totales de columna: 10, 10, 10) y la <b>marginal de y</b> (totales de fila: 9, 11, 10). Con ellas se calculan x̄ = (1·10 + 2·10 + 3·10)/30 = 2 y ȳ = (4·9 + 6·11 + 8·10)/30 = 182/30 = 6,0667, y las varianzas (Sx² = 0,6667, Sy² = 2,5289).</p>" +
        "<h5>Distribuciones condicionadas</h5>" +
        "<p>La distribución de y <b>dentro de</b> un valor concreto de x se obtiene dividiendo esa columna entre su total. Para x = 1 (10 alumnos): P(y = 4 | x = 1) = 6/10, P(y = 6 | x = 1) = 3/10, P(y = 8 | x = 1) = 1/10. Su media es la <b>media condicionada</b>: ȳ|x=1 = 4·0,6 + 6·0,3 + 8·0,1 = 5,0.</p>" +
        tabla(["Condición", "Distribución de y (4, 6, 8)", "Media condicionada"], [
          ["x = 1", "0,6 · 0,3 · 0,1", "5,0"], ["x = 2", "0,2 · 0,5 · 0,3", "6,2"], ["x = 3", "0,1 · 0,3 · 0,6", "7,0"]
        ]) +
        "<p>Las medias condicionadas (5,0; 6,2; 7,0) <b>suben</b> con x: es otra manera de ver la relación positiva. Los puntos (x, ȳ|x) forman la «curva de regresión» empírica, que aquí es casi una recta.</p>" +
        "<h5>Independencia estadística</h5>" +
        "<p>Dos variables son <b>independientes</b> cuando la distribución de y es la misma para todos los valores de x. Equivale a que en cada casilla se cumpla:</p>" +
        formula("fᵢⱼ = fᵢ· · f·ⱼ / N") +
        "<p>(la frecuencia conjunta es la que saldría de «repartir» los totales sin ninguna relación). Un ejemplo de tabla independiente:</p>" +
        tabla(["y ↓ · x →", "1", "2", "3", "Total"], [["4", "2", "4", "6", "12"], ["6", "3", "6", "9", "18"], ["8", "1", "2", "3", "6"], ["Total", "6", "12", "18", "36"]]) +
        "<p>Compruébalo: 12·6/36 = 2 ✓, 12·12/36 = 4 ✓, 18·18/36 = 9 ✓… En cada columna la distribución condicionada de y es 12/36 = 1/3, 18/36 = 1/2, 6/36 = 1/6, siempre la misma. Aquí r = 0 (la covarianza es 0), pero atención: lo recíproco no es cierto.</p>" +
        w("m12_doble") +
        ejemplo("Calcular r desde la tabla", "Con la tabla de los 30 alumnos, calcula la covarianza y el coeficiente de correlación.", [
          "x̄ = 2, ȳ = 6,0667. Σfᵢⱼ·xⱼ·yᵢ: fila y = 4: 4·(6·1 + 2·2 + 1·3) = 4·13 = 52; fila y = 6: 6·(3·1 + 5·2 + 3·3) = 6·22 = 132; fila y = 8: 8·(1·1 + 3·2 + 6·3) = 8·25 = 200. Total 384.",
          "Sxy = 384/30 − 2·6,0667 = 12,8 − 12,1333 = <b>0,6667</b>.",
          "r = 0,6667/(√0,6667·√2,5289) = 0,6667/(0,8165·1,5902) = <b>0,5134</b>: correlación positiva moderada."
        ])
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Más allá de la recta: ajustes exponencial, potencial y logarítmico",
      html:
        "<p>No todas las nubes son rectas. Muchos fenómenos (crecimiento de poblaciones, enfriamiento, leyes físicas) siguen curvas. Si se sabe <b>qué tipo</b> de curva, se puede «enderezar» la nube transformando una o las dos variables y aplicar después la regresión lineal:</p>" +
        tabla(["Modelo", "Ecuación", "Se transforma en una recta si se representa…", "Recta que se ajusta"], [
          ["Lineal", "y = a + bx", "y frente a x", "y = a + bx"],
          ["Exponencial", "y = a·eᵇˣ", "<b>ln y</b> frente a x", "ln y = ln a + b·x"],
          ["Potencial", "y = a·xᵇ", "<b>ln y</b> frente a <b>ln x</b>", "ln y = ln a + b·ln x"],
          ["Logarítmico", "y = a + b·ln x", "y frente a <b>ln x</b>", "y = a + b·ln x"]
        ]) +
        "<p>Después se deshace la transformación: de la recta ln y = A + Bx se obtiene y = e<sup>A</sup>·e<sup>Bx</sup>, es decir, a = e<sup>A</sup> y b = B. La <b>exponencial</b> aparece cuando y se multiplica por el mismo factor cada vez que x aumenta en una unidad; la <b>potencial</b>, cuando aumentos <i>porcentuales</i> en x producen aumentos porcentuales proporcionales en y; la <b>logarítmica</b>, en procesos de rendimientos decrecientes (aprendizaje, saturación).</p>" +
        ejemplo("Crecimiento de un cultivo", "El número de bacterias de un cultivo cada hora es 100; 160; 250; 410; 650; 1 020; 1 630 (x = 0, 1, …, 6). Ajusta un modelo exponencial.", [
          "Se calculan los logaritmos neperianos: ln y = 4,605; 5,075; 5,521; 6,016; 6,477; 6,928; 7,396.",
          "La recta de ln y sobre x tiene pendiente b = 0,4655 y ordenada ln a = 4,606, con r = 0,99995 (¡casi perfecta!).",
          "Modelo: <b>y = 100,1·e<sup>0,4655x</sup></b>: las bacterias se multiplican por e<sup>0,4655</sup> = 1,593 cada hora (crecen un 59 % por hora). A las 8 horas: 100,1·e<sup>3,724</sup> = 4 147 bacterias.",
          "(Un ajuste lineal de los mismos datos daría r = 0,934, bastante peor, y predeciría valores absurdos.)"
        ]) +
        ejemplo("Un ajuste potencial: las leyes de Kepler", "Distancia media al Sol (en UA) y periodo orbital (años) de seis planetas: (0,39; 0,24), (0,72; 0,62), (1; 1), (1,52; 1,88), (5,2; 11,86), (9,58; 29,46). Ajusta un modelo potencial.", [
          "Se representan ln(periodo) frente a ln(distancia): la nube es una recta con pendiente <b>b = 1,4997 ≈ 3/2</b> y ordenada ln a ≈ −0,0003, con r = 0,99999.",
          "Modelo: <b>T ≈ d<sup>1,5</sup></b>, es decir, T² = d³: la <b>tercera ley de Kepler</b>, descubierta justo así a partir de datos."
        ]) +
        ejemplo("Un ajuste logarítmico", "Tras 1, 2, 4, 8, 16 y 32 horas de práctica, una persona consigue 30, 44, 58, 71, 86 y 99 puntos. Ajusta y = a + b·ln x.", [
          "Los datos de y frente a ln x son casi una recta: b = 19,95; a = 30,10; r = 0,99988.",
          "<b>y = 30,10 + 19,95·ln x</b>: cada vez que se duplican las horas de práctica (ln 2 = 0,693) se ganan 19,95·0,693 = 13,8 puntos. Es el típico efecto de rendimientos decrecientes."
        ]) +
        w("m12_curva") +
        ojo("el coeficiente r del ajuste transformado mide lo bien que se alinean los datos <i>transformados</i> (por ejemplo ln y). Para comparar modelos de forma justa se mira también el error en la escala original (la suma de cuadrados de los residuos de y).")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Estudio completo de una distribución bidimensional: guion",
      html:
        "<p>Un problema típico de examen dice: «Estudia la relación entre las variables X e Y». Este es el guion que lo cubre todo:</p>" +
        "<ol>" +
        "<li><b>Nube de puntos</b>: dibújala y descríbela (dirección, forma, fuerza, atípicos).</li>" +
        "<li><b>Tabla de cálculo</b>: xᵢ, yᵢ, xᵢ², yᵢ², xᵢyᵢ y sus sumas.</li>" +
        "<li><b>Medias</b> x̄, ȳ, <b>varianzas</b> y <b>desviaciones típicas</b>.</li>" +
        "<li><b>Covarianza</b> Sxy e interpretación de su signo.</li>" +
        "<li><b>Coeficiente de correlación</b> r (y r²), con su interpretación.</li>" +
        "<li><b>Recta de regresión</b> de y sobre x (y, si se pide, la de x sobre y).</li>" +
        "<li><b>Predicción</b> indicando si es interpolación o extrapolación y si es fiable.</li>" +
        "<li><b>Conclusión</b> en el lenguaje del problema (con unidades).</li>" +
        "</ol>" +
        ejemplo("Un estudio completo", "Una tienda anota la inversión en publicidad (x, en miles de euros) y las ventas (y, en miles de euros) de seis semanas: (1, 12), (2, 15), (3, 19), (4, 21), (5, 26), (6, 28). Estudia la relación y predice las ventas para una inversión de 7 000 € y de 15 000 €.", [
          "<b>Nube</b>: los puntos suben casi alineados: relación positiva y fuerte.",
          "<b>Sumas</b>: Σx = 21; Σy = 121; Σx² = 91; Σy² = 2 631; Σxy = 481. Con n = 6.",
          "<b>Medias</b>: x̄ = 3,5; ȳ = 20,1667. <b>Varianzas</b>: Sx² = 91/6 − 12,25 = 2,9167; Sy² = 2 631/6 − 406,69 = 31,806. Sx = 1,7078; Sy = 5,6397.",
          "<b>Covarianza</b>: Sxy = 481/6 − 3,5·20,1667 = 80,1667 − 70,5833 = 9,5833 &gt; 0.",
          "<b>Correlación</b>: r = 9,5833/(1,7078·5,6397) = <b>0,995</b> (r² = 0,990: la publicidad explica el 99 % de la variación de las ventas).",
          "<b>Recta</b>: m = 9,5833/2,9167 = 3,2857; n = 20,1667 − 3,2857·3,5 = 8,6667 → <b>y = 3,2857x + 8,667</b>: cada 1 000 € más de publicidad se asocian a 3 286 € más de ventas.",
          "<b>Predicción</b>: x = 7 → y = 3,2857·7 + 8,667 = <b>31,67</b> (ligera extrapolación: x = 7 está algo fuera de [1, 6], razonablemente fiable por el r tan alto). x = 15 → 57,95 (extrapolación grande: poco fiable, pues el efecto de la publicidad suele saturarse)."
        ]) +
        ejemplo("Una nube sin relación", "Con los pares (1, 5), (2, 2), (3, 6), (4, 3), (5, 5), (6, 4) se obtiene Sxy = 0,0833, Sx = 1,7078, Sy = 1,3437. ¿Qué conclusión se saca?", [
          "r = 0,0833/(1,7078·1,3437) = <b>0,036</b>: prácticamente nulo (r² = 0,13 %).",
          "No hay relación lineal: la recta de regresión es casi horizontal (m = 0,0286) y predecir y con ella no mejora nada respecto a usar simplemente ȳ = 4,17. <b>No tiene sentido</b> usar la recta para hacer predicciones."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Problemas de contexto resueltos",
      html:
        ejemplo("Temperatura y consumo de calefacción", "En cinco semanas se registra la temperatura media exterior (x, en °C) y el consumo de gas (y, en m³): (10, 80), (15, 65), (20, 55), (25, 42), (30, 30). Calcula r, la recta de regresión, interpreta la pendiente y estima el consumo a 18 °C y a −5 °C.", [
          "Σx = 100; Σy = 272; Σx² = 2 250; Σy² = 16 314; Σxy = 4 825. x̄ = 20; ȳ = 54,4.",
          "Sx² = 450 − 400 = 50; Sy² = 3 262,8 − 2 959,36 = 303,44; Sxy = 965 − 1 088 = −123.",
          "r = −123/(7,0711·17,4195) = <b>−0,9986</b>: correlación negativa muy fuerte.",
          "m = −123/50 = −2,46; n = 54,4 + 2,46·20 = 103,6 → <b>y = −2,46x + 103,6</b>. Cada grado más de temperatura supone unos 2,46 m³ menos de gas.",
          "A 18 °C (interpolación): y = −2,46·18 + 103,6 = <b>59,3 m³</b>. A −5 °C (extrapolación): y = 115,9 m³: plausible pero poco fiable; con frío extremo el consumo no tiene por qué seguir creciendo linealmente."
        ]) +
        ejemplo("Peso y altura", "Seis personas: alturas (cm) 150, 158, 165, 170, 176, 182 y pesos (kg) 49, 54, 60, 66, 72, 79. Halla r y la recta de regresión del peso sobre la altura, y estima el peso de alguien de 168 cm.", [
          "x̄ = 166,83; ȳ = 63,33; Sx² = 114,81; Sy² = 105,22; Sxy = 109,22.",
          "r = 109,22/(10,715·10,258) = <b>0,9937</b>.",
          "m = 109,22/114,81 = 0,9514 kg/cm; n = 63,33 − 0,9514·166,83 = −95,39 → <b>y = 0,9514x − 95,39</b>.",
          "Para 168 cm (interpolación): y = 0,9514·168 − 95,39 = <b>64,4 kg</b>.",
          "Observa la ordenada n = −95,39: sale negativa porque x = 0 está muy lejos del rango [150, 182]. No tiene significado físico: es sólo un ajuste de la recta."
        ]) +
        ejemplo("Dos rectas de regresión dadas", "Se sabe que las rectas de regresión de una distribución son y = 2x + 1 (de y sobre x) y x = 0,3y + 2 (de x sobre y). Halla las medias y el coeficiente de correlación.", [
          "Las dos rectas se cortan en (x̄, ȳ): se resuelve el sistema. Sustituyendo y = 2x + 1 en la segunda: x = 0,3(2x + 1) + 2 = 0,6x + 2,3 → 0,4x = 2,3 → <b>x̄ = 5,75</b>; y = 2·5,75 + 1 = <b>ȳ = 12,5</b>.",
          "El producto de las pendientes es r²: 2·0,3 = 0,6 → r² = 0,6 → |r| = 0,7746. Como las dos pendientes son positivas, <b>r = +0,7746</b>."
        ]) +
        ojo("en el problema de las dos rectas, hay que identificar bien cuál es la de y sobre x (y = m·x + n) y cuál la de x sobre y (x = m′·y + n′). Si te dan dos rectas sin etiquetar, la «de y sobre x» es la que, al compararlas, cumple m·m′ ≤ 1 con m′ la pendiente de la otra tomada como x = m′y + n′.")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test, tarjetas con las fórmulas, un juego para unir valores de r con su descripción, otro para clasificar situaciones y un ejercicio de ordenar los pasos de un estudio completo.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "valores") + w("clasificar", "situaciones") + w("orden", "estudio")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    valores: {
      titulo: "¿Qué dice cada valor de r?",
      consigna: "Une cada coeficiente de correlación con la descripción que le corresponde.",
      pares: [
        ["r = 1", "Todos los puntos están exactamente sobre una recta creciente"],
        ["r = −1", "Todos los puntos están exactamente sobre una recta decreciente"],
        ["r = 0,95", "Correlación positiva muy fuerte: nube estrecha y creciente"],
        ["r = −0,6", "Correlación negativa moderada: tendencia a bajar con bastante dispersión"],
        ["r = 0,05", "Prácticamente no hay relación lineal"],
        ["r = 0 con puntos sobre una parábola", "La relación existe pero no es lineal: r no la detecta"]
      ]
    },
    situaciones: {
      titulo: "¿Qué tipo de relación esperas?",
      consigna: "Toca una situación y después el tipo de correlación que esperarías encontrar.",
      categorias: ["Correlación positiva", "Correlación negativa", "Sin correlación (nula)", "Relación no lineal"],
      items: [
        { t: "Horas de estudio y nota en el examen", c: 0 }, { t: "Altura y peso de adultos", c: 0 }, { t: "Temperatura exterior en verano y consumo de aire acondicionado", c: 0 },
        { t: "Antigüedad de un coche y su precio de venta", c: 1 }, { t: "Temperatura exterior en invierno y consumo de calefacción", c: 1 }, { t: "Velocidad de un coche y tiempo que tarda en hacer 100 km", c: 1 },
        { t: "Talla de zapato y número de teléfono", c: 2 }, { t: "Altura de los alumnos y su nota de Historia", c: 2 },
        { t: "Edad de una persona (0–90 años) y su altura", c: 3 }, { t: "Dosis de un fármaco y eficacia (hay un óptimo)", c: 3 }, { t: "Lado de un cuadrado y su área", c: 3 }
      ]
    },
    estudio: {
      titulo: "Estudio completo de una nube de puntos",
      consigna: "Ordena los pasos que se siguen para estudiar la relación entre dos variables.",
      items: [
        { t: "Dibujar la nube de puntos y describir su dirección, forma y fuerza", nota: "Antes de calcular nada: la nube dice si una recta tiene sentido." },
        { t: "Construir la tabla de cálculo (xᵢ, yᵢ, xᵢ², yᵢ², xᵢyᵢ) y sumar las columnas", nota: "Todos los cálculos siguientes salen de estas sumas." },
        { t: "Calcular las medias x̄ e ȳ y las varianzas Sx² y Sy²", nota: "Sx² = Σxᵢ²/n − x̄²." },
        { t: "Calcular la covarianza Sxy = Σxᵢyᵢ/n − x̄·ȳ", nota: "Su signo dice si la relación es creciente o decreciente." },
        { t: "Calcular el coeficiente de correlación r = Sxy/(Sx·Sy) e interpretarlo", nota: "Fuerza y sentido de la relación lineal." },
        { t: "Escribir la recta de regresión y − ȳ = (Sxy/Sx²)(x − x̄)", nota: "Sólo tiene sentido si |r| es suficientemente grande." },
        { t: "Hacer la predicción pedida y valorar si es interpolación o extrapolación", nota: "La fiabilidad depende de r y del rango de los datos." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula r = 1,35 para unos datos y concluye «correlación fortísima». ¿Qué falla?",
          op: ["Nada", "r nunca puede salirse del intervalo [−1, 1]: hay un error de cálculo", "Debía dividir entre 2", "r mayor que 1 significa correlación perfecta"], ok: 1,
          porque: "−1 ≤ r ≤ 1 siempre. Un valor fuera de ese rango indica un error (por ejemplo, restar mal la media al cuadrado o usar la covarianza sin dividir entre n)." },
        { q: "«Hay una correlación de 0,92 entre las ventas de helados y los ahogamientos; por tanto, comer helados provoca ahogamientos.» ¿Qué falla?",
          op: ["Nada", "Correlación no implica causalidad: ambas dependen de una tercera variable, el calor", "r debería ser 1", "Los ahogamientos no se pueden medir"], ok: 1,
          porque: "El calor aumenta tanto el consumo de helados como los baños. r sólo mide asociación, no causa." },
        { q: "«Como r = 0, las variables x e y no tienen ninguna relación.» (los puntos están sobre y = x²). ¿Qué falla?",
          op: ["Nada", "r = 0 sólo indica ausencia de relación lineal; y = x² es una relación exacta pero no lineal", "r no puede ser 0", "Los puntos de una parábola siempre dan r = 1"], ok: 1,
          porque: "El coeficiente de correlación mide sólo la fuerza de la relación lineal. Hay que mirar siempre la nube de puntos." },
        { q: "Un alumno dice que, al pasar las alturas de cm a m, el coeficiente de correlación se divide entre 100. ¿Qué falla?",
          op: ["Nada", "r no depende de las unidades; es la covarianza la que se divide entre 100", "r se multiplica por 100", "r cambia de signo"], ok: 1,
          porque: "r = Sxy/(Sx·Sy): al cambiar de escala, Sxy, Sx cambian y se cancelan en el cociente." },
        { q: "Para estimar x a partir de un valor de y, un alumno despeja x de la recta de y sobre x. ¿Qué falla?",
          op: ["Nada: es equivalente", "Debe usar la recta de regresión de x sobre y, que es otra recta distinta (sólo coinciden si |r| = 1)", "No se puede estimar x a partir de y", "Debe usar la recta con la pendiente cambiada de signo"], ok: 1,
          porque: "La recta de y sobre x minimiza los errores en y; para predecir x hay que usar la que minimiza los errores en x: x − x̄ = (Sxy/Sy²)(y − ȳ)." },
        { q: "Con datos de niños de 2 a 10 años, un alumno usa la recta de regresión para predecir la altura a los 40 años. ¿Qué falla?",
          op: ["Nada", "Es una extrapolación muy lejos del rango: la relación lineal no tiene por qué mantenerse", "Debió usar x̄", "La recta no tiene ordenada en el origen"], ok: 1,
          porque: "Fuera del rango de los datos no hay garantía de que siga la tendencia lineal: la predicción (más de 2 m) es absurda." },
        { q: "Un alumno calcula la covarianza como Σxᵢyᵢ/n (sin restar nada). ¿Qué falla?",
          op: ["Nada", "Falta restar x̄·ȳ: Sxy = Σxᵢyᵢ/n − x̄·ȳ", "Hay que dividir entre n − 1 siempre", "Hay que multiplicar por r"], ok: 1,
          porque: "Σxᵢyᵢ/n es la media de los productos; la covarianza es la media de los productos menos el producto de las medias." },
        { q: "Un alumno escribe la recta de regresión como y = ȳ + (Sxy/Sx²)·x. ¿Qué falla?",
          op: ["Nada", "La recta es y − ȳ = (Sxy/Sx²)(x − x̄): falta restar x̄ (la recta debe pasar por (x̄, ȳ))", "La pendiente debe ser Sxy/Sy²", "Debe ser y = x̄ + …"], ok: 1,
          porque: "La forma correcta pasa por (x̄, ȳ). Si se escribe sin restar x̄, la recta no pasa por el centro de la nube." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Si Sxy = −4,2, la nube de puntos…",
          op: ["tiene tendencia decreciente", "tiene tendencia creciente", "no tiene tendencia", "es perfectamente lineal"], ok: 0,
          porque: "El signo de la covarianza es el de la tendencia: negativa = al subir x, y tiende a bajar." },
        { q: "El coeficiente de correlación r nunca puede valer…",
          op: ["1,2", "−1", "0", "0,95"], ok: 0,
          porque: "−1 ≤ r ≤ 1." },
        { q: "Con r = 0,8, el coeficiente de determinación vale…",
          op: ["0,64", "0,8", "0,9", "0,16"], ok: 0,
          porque: "r² = 0,8² = 0,64: el 64 % de la variación de y se explica por x." },
        { q: "La recta de regresión de y sobre x pasa siempre por…",
          op: ["el punto (x̄, ȳ)", "el origen", "el primer dato", "el punto (Sx, Sy)"], ok: 0,
          porque: "La ecuación es y − ȳ = (Sxy/Sx²)(x − x̄)." },
        { q: "Si x̄ = 4, ȳ = 7, Sx² = 2,5 y Sxy = 3, la recta de y sobre x es…",
          op: ["y = 1,2x + 2,2", "y = 1,2x + 7", "y = 0,83x + 3,7", "y = 3x − 5"], ok: 0,
          porque: "m = 3/2,5 = 1,2; y − 7 = 1,2(x − 4) → y = 1,2x + 2,2." },
        { q: "Al pasar la variable x de metros a centímetros, el coeficiente de correlación…",
          op: ["no cambia", "se multiplica por 100", "se divide entre 100", "cambia de signo"], ok: 0,
          porque: "r no depende de las unidades (sólo cambia de signo si se invierte el sentido de una variable)." },
        { q: "Predecir y para un x dentro del rango de los datos se llama…",
          op: ["interpolación", "extrapolación", "regresión inversa", "correlación"], ok: 0,
          porque: "Dentro del rango: interpolación (fiable); fuera: extrapolación (dudosa)." },
        { q: "Si r = 0 pero los puntos están sobre una parábola, entonces…",
          op: ["existe relación, pero no lineal", "no hay ninguna relación", "la recta de regresión es perfecta", "hay un error de cálculo"], ok: 0,
          porque: "r sólo mide la relación lineal." },
        { q: "Dos rectas de regresión tienen pendientes (y sobre x) 0,9 y (x sobre y) 0,4. Entonces |r| vale…",
          op: ["0,6", "0,36", "1,3", "0,5"], ok: 0,
          porque: "r² = 0,9·0,4 = 0,36 → |r| = 0,6." },
        { q: "En una tabla de doble entrada, los totales de las filas forman…",
          op: ["la distribución marginal de la variable de las filas", "la distribución condicionada", "la covarianza", "la recta de regresión"], ok: 0,
          porque: "Los totales de fila y de columna son las distribuciones marginales." },
        { q: "Una correlación de 0,9 entre el consumo de chocolate de un país y sus premios Nobel demuestra que…",
          op: ["sólo hay una asociación; no se puede afirmar causalidad", "el chocolate mejora la inteligencia", "los Nobel aumentan el consumo de chocolate", "r debe ser mayor"], ok: 0,
          porque: "Correlación no implica causalidad: puede deberse a una variable oculta (la riqueza del país) o a la casualidad." },
        { q: "El método de mínimos cuadrados elige la recta que hace mínima…",
          op: ["la suma de los cuadrados de los residuos", "la suma de los residuos", "el número de puntos fuera de la recta", "la covarianza"], ok: 0,
          porque: "S(m, n) = Σ(yᵢ − mxᵢ − n)² es mínima en la recta de regresión." }
      ]
    },
    tj1: {
      titulo: "Estadística bidimensional",
      cartas: [
        { a: "Nube de puntos", b: "Representación de los pares (xᵢ, yᵢ). Muestra dirección, forma, fuerza y datos atípicos." },
        { a: "Medias y varianzas", b: "x̄ = Σxᵢ/n · ȳ = Σyᵢ/n · Sx² = Σxᵢ²/n − x̄² · Sy² = Σyᵢ²/n − ȳ²" },
        { a: "Covarianza", b: "Sxy = Σxᵢyᵢ/n − x̄·ȳ. Su signo dice si la relación es creciente (+) o decreciente (−). Depende de las unidades." },
        { a: "Coeficiente de correlación", b: "r = Sxy/(Sx·Sy). −1 ≤ r ≤ 1. Sin unidades. Mide la fuerza de la relación LINEAL." },
        { a: "Interpretación de r", b: "|r| ≥ 0,9 muy fuerte · 0,7–0,9 fuerte · 0,4–0,7 moderada · 0,2–0,4 débil · &lt; 0,2 nula. El signo da el sentido." },
        { a: "Coeficiente de determinación", b: "r²: porcentaje de la variación de y explicado por la relación lineal con x." },
        { a: "Recta de regresión de y sobre x", b: "y − ȳ = (Sxy/Sx²)(x − x̄). Pasa por (x̄, ȳ). Pendiente m = Sxy/Sx² = r·Sy/Sx." },
        { a: "Recta de regresión de x sobre y", b: "x − x̄ = (Sxy/Sy²)(y − ȳ). Se usa para predecir x. Las dos rectas se cortan en (x̄, ȳ)." },
        { a: "Relación entre las dos rectas", b: "m·m′ = r². Coinciden si |r| = 1; con r = 0 son y = ȳ y x = x̄." },
        { a: "Mínimos cuadrados", b: "La recta minimiza S(m, n) = Σ(yᵢ − mxᵢ − n)². Los residuos suman 0." },
        { a: "Interpolar y extrapolar", b: "Interpolar: x dentro del rango de datos (fiable). Extrapolar: fuera (poco fiable)." },
        { a: "Correlación y causalidad", b: "Correlación no implica causalidad: puede haber causa inversa, variable oculta o azar." },
        { a: "Cambio de unidades", b: "x′ = ax + b, y′ = cy + d: Sx′y′ = a·c·Sxy; |r| no cambia (r cambia de signo si ac &lt; 0)." },
        { a: "Distribución marginal y condicionada", b: "Marginal: totales de fila o columna. Condicionada: columna (o fila) dividida entre su total." },
        { a: "Independencia en una tabla", b: "fᵢⱼ = fᵢ·f·ⱼ/N en todas las casillas. Entonces Sxy = 0 (pero Sxy = 0 no implica independencia)." },
        { a: "Ajustes no lineales", b: "Exponencial: ln y frente a x · Potencial: ln y frente a ln x · Logarítmico: y frente a ln x." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "b1", nivel: 1,
      enunciado: "Con los datos x: 1, 2, 3, 4, 5 e y: 2, 4, 5, 4, 5, calcula las medias x̄ e ȳ.",
      check: [{ tipo: "num", etiqueta: "x̄ =", valor: 3 }, { tipo: "num", etiqueta: "ȳ =", valor: 4 }],
      pistas: ["Suma cada columna y divide entre n = 5."],
      pasos: ["Σx = 15 → x̄ = 15/5 = 3.", "Σy = 2 + 4 + 5 + 4 + 5 = 20 → ȳ = 20/5 = 4."],
      resultado: "x̄ = 3 · ȳ = 4" },
    { id: "b2", nivel: 1,
      enunciado: "Con los mismos datos (x: 1, 2, 3, 4, 5; y: 2, 4, 5, 4, 5) calcula la varianza Sx² y la covarianza Sxy.",
      check: [{ tipo: "num", etiqueta: "Sx² =", valor: 2 }, { tipo: "num", etiqueta: "Sxy =", valor: 1.2 }],
      pistas: ["Sx² = Σx²/n − x̄². Σxy = 2 + 8 + 15 + 16 + 25."],
      pasos: ["Σx² = 1 + 4 + 9 + 16 + 25 = 55 → Sx² = 55/5 − 3² = 11 − 9 = 2.", "Σxy = 2 + 8 + 15 + 16 + 25 = 66 → Sxy = 66/5 − 3·4 = 13,2 − 12 = 1,2."],
      resultado: "Sx² = 2 · Sxy = 1,2" },
    { id: "b3", nivel: 1,
      enunciado: "Con los datos anteriores se tiene Sx² = 2, Sy² = 1,2 y Sxy = 1,2. Calcula el coeficiente de correlación r (con 4 decimales).",
      check: { tipo: "num", etiqueta: "r =", valor: 0.7746 },
      pistas: ["r = Sxy/(Sx·Sy) = Sxy/√(Sx²·Sy²)."],
      pasos: ["r = 1,2/√(2·1,2) = 1,2/√2,4 = 1,2/1,5492 = 0,7746."],
      resultado: "r = 0,7746 (correlación positiva fuerte)" },
    { id: "b4", nivel: 1,
      enunciado: "Para unos datos se obtiene r = −0,92. ¿Cómo describes la correlación?",
      check: { tipo: "opcion", etiqueta: "Es una correlación", opciones: ["positiva muy fuerte", "negativa muy fuerte", "negativa débil", "prácticamente nula"], ok: 1 },
      pistas: ["El signo da el sentido; el valor absoluto, la fuerza."],
      pasos: ["|r| = 0,92 ≥ 0,9: muy fuerte. Signo negativo: cuando x aumenta, y disminuye."],
      resultado: "negativa muy fuerte" },
    { id: "b5", nivel: 1,
      enunciado: "Si la covarianza de dos variables es Sxy = −3,4, ¿qué puedes decir?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["al aumentar x, y tiende a disminuir", "al aumentar x, y tiende a aumentar", "las variables son independientes", "la correlación es perfecta"], ok: 0 },
      pistas: ["Lo único directamente interpretable de la covarianza es su signo."],
      pasos: ["Sxy &lt; 0 indica relación decreciente. Su valor (−3,4) no dice cuán fuerte es, porque depende de las unidades."],
      resultado: "y tiende a disminuir al aumentar x" },
    { id: "b6", nivel: 1,
      enunciado: "Se sabe que x̄ = 4, ȳ = 7, Sx² = 2,5 y Sxy = 3. Halla la pendiente m y la ordenada n de la recta de regresión de y sobre x y estima y para x = 6.",
      check: [{ tipo: "num", etiqueta: "m =", valor: 1.2 }, { tipo: "num", etiqueta: "n =", valor: 2.2 }, { tipo: "num", etiqueta: "y(6) =", valor: 9.4 }],
      pistas: ["m = Sxy/Sx². La recta pasa por (x̄, ȳ): n = ȳ − m·x̄."],
      pasos: ["m = 3/2,5 = 1,2.", "n = 7 − 1,2·4 = 2,2 → y = 1,2x + 2,2.", "y(6) = 1,2·6 + 2,2 = 9,4."],
      resultado: "y = 1,2x + 2,2 → y(6) = 9,4" },
    { id: "b7", nivel: 1,
      enunciado: "Dos variables tienen r = 0,8, Sx = 2 y Sy = 5. Calcula la covarianza Sxy.",
      check: { tipo: "num", etiqueta: "Sxy =", valor: 8 },
      pistas: ["De r = Sxy/(Sx·Sy) se despeja Sxy = r·Sx·Sy."],
      pasos: ["Sxy = 0,8·2·5 = 8."],
      resultado: "Sxy = 8" },
    { id: "b8", nivel: 1,
      enunciado: "Los pares (1, 10), (2, 8), (3, 6), (4, 4), (5, 2) están todos sobre una recta. ¿Cuánto vale r?",
      check: { tipo: "num", etiqueta: "r =", valor: -1 },
      pistas: ["La recta es decreciente y los puntos están exactamente sobre ella."],
      pasos: ["Todos los puntos cumplen y = 12 − 2x: recta exacta y decreciente → r = −1."],
      resultado: "r = −1" },
    { id: "b9", nivel: 1,
      enunciado: "Si se pasan todos los pesos de kg a gramos (se multiplican por 1 000), ¿qué le pasa al coeficiente de correlación r entre peso y altura?",
      check: { tipo: "opcion", etiqueta: "r…", opciones: ["se multiplica por 1 000", "no cambia", "se divide entre 1 000", "cambia de signo"], ok: 1 },
      pistas: ["r no depende de las unidades."],
      pasos: ["Con y′ = 1000y: Sx′y′ = 1000·Sxy y Sy′ = 1000·Sy; en r = Sxy/(Sx·Sy) el factor 1 000 se cancela."],
      resultado: "no cambia" },
    { id: "b10", nivel: 1,
      enunciado: "La distribución marginal de x en una tabla de doble entrada es: x = 1 → 4 veces, x = 2 → 6 veces, x = 3 → 10 veces. Calcula x̄.",
      check: { tipo: "num", etiqueta: "x̄ =", valor: 2.3 },
      pistas: ["x̄ = Σfᵢxᵢ/N con N = 20."],
      pasos: ["Σfx = 4·1 + 6·2 + 10·3 = 4 + 12 + 30 = 46.", "x̄ = 46/20 = 2,3."],
      resultado: "x̄ = 2,3" },
    { id: "b11", nivel: 1,
      enunciado: "En una tabla de doble entrada con x ∈ {1, 2} e y ∈ {1, 2} las frecuencias son f(1,1) = 3, f(2,1) = 1, f(1,2) = 1 y f(2,2) = 3. Calcula la proporción de y = 2 entre los que tienen x = 2: P(y = 2 | x = 2).",
      check: { tipo: "num", etiqueta: "P(y = 2 | x = 2) =", valor: 0.75 },
      pistas: ["Total de la columna x = 2: 1 + 3 = 4."],
      pasos: ["La columna x = 2 tiene f(2,1) = 1 y f(2,2) = 3: total 4.", "P(y = 2 | x = 2) = 3/4 = 0,75."],
      resultado: "0,75" },
    { id: "b12", nivel: 1,
      enunciado: "En la tabla de frecuencias con filas y = 1, 2 y columnas x = 1, 2: fila y = 1: 2 y 4; fila y = 2: 3 y 6. ¿Son x e y independientes?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["Sí, lo son", "No lo son"], ok: 0 },
      pistas: ["Comprueba si fᵢⱼ = fᵢ·f·ⱼ/N en cada casilla."],
      pasos: ["Total de filas: 6 y 9. Total de columnas: 5 y 10. N = 15.", "6·5/15 = 2 ✓, 6·10/15 = 4 ✓, 9·5/15 = 3 ✓, 9·10/15 = 6 ✓. Independientes."],
      resultado: "Sí, son independientes" },

    // ================= ★★ medio =================
    { id: "b13", nivel: 2,
      enunciado: "Horas de estudio (x): 1, 2, 3, 4, 5 y notas (y): 3, 4, 6, 7, 8. Calcula x̄, ȳ, Sxy y r.",
      check: [{ tipo: "num", etiqueta: "x̄ =", valor: 3 }, { tipo: "num", etiqueta: "ȳ =", valor: 5.6 }, { tipo: "num", etiqueta: "Sxy =", valor: 2.6 }, { tipo: "num", etiqueta: "r =", valor: 0.9912 }],
      pistas: ["Σx = 15, Σy = 28, Σx² = 55, Σy² = 174, Σxy = 97."],
      pasos: ["x̄ = 3 y ȳ = 5,6.", "Sx² = 55/5 − 9 = 2; Sy² = 174/5 − 31,36 = 3,44; Sxy = 97/5 − 16,8 = 2,6.", "r = 2,6/√(2·3,44) = 2,6/2,623 = 0,9912."],
      resultado: "x̄ = 3 · ȳ = 5,6 · Sxy = 2,6 · r = 0,9912" },
    { id: "b14", nivel: 2,
      enunciado: "Con los datos de b13 halla la recta de regresión de y sobre x (m y n) y estima la nota para 4,5 horas de estudio.",
      check: [{ tipo: "num", etiqueta: "m =", valor: 1.3 }, { tipo: "num", etiqueta: "n =", valor: 1.7 }, { tipo: "num", etiqueta: "y(4,5) =", valor: 7.55 }],
      pistas: ["m = Sxy/Sx² = 2,6/2."],
      pasos: ["m = 1,3; y − 5,6 = 1,3(x − 3) → y = 1,3x + 1,7.", "y(4,5) = 1,3·4,5 + 1,7 = 7,55 (interpolación)."],
      resultado: "y = 1,3x + 1,7 → 7,55" },
    { id: "b15", nivel: 2,
      enunciado: "Con los datos de b13 (Sxy = 2,6; Sy² = 3,44; x̄ = 3; ȳ = 5,6), halla la pendiente de la recta de regresión de x sobre y y estima las horas de estudio de quien ha sacado un 7 (con tres decimales).",
      check: [{ tipo: "num", etiqueta: "m′ =", valor: 0.7558 }, { tipo: "num", etiqueta: "x(7) =", valor: 4.058 }],
      pistas: ["x − x̄ = (Sxy/Sy²)(y − ȳ)."],
      pasos: ["m′ = 2,6/3,44 = 0,7558.", "x − 3 = 0,7558(7 − 5,6) = 1,058 → x = 4,058 horas."],
      resultado: "m′ = 0,7558 · x(7) ≈ 4,06 h" },
    { id: "b16", nivel: 2,
      enunciado: "Se miden x: 4, 6, 8, 10, 12 e y: 7, 6, 4, 3, 1. Calcula r, la recta de y sobre x (m y n) y la estimación para x = 9.",
      check: [{ tipo: "num", etiqueta: "r =", valor: -0.9934 }, { tipo: "num", etiqueta: "m =", valor: -0.75 }, { tipo: "num", etiqueta: "n =", valor: 10.2 }, { tipo: "num", etiqueta: "y(9) =", valor: 3.45 }],
      pistas: ["Σx = 40, Σy = 21, Σx² = 360, Σy² = 111, Σxy = 138."],
      pasos: ["x̄ = 8, ȳ = 4,2. Sx² = 72 − 64 = 8; Sy² = 22,2 − 17,64 = 4,56; Sxy = 27,6 − 33,6 = −6.", "r = −6/√(8·4,56) = −6/6,0398 = −0,9934. m = −6/8 = −0,75; n = 4,2 + 0,75·8 = 10,2.", "y(9) = −0,75·9 + 10,2 = 3,45."],
      resultado: "r = −0,9934 · y = −0,75x + 10,2 → y(9) = 3,45" },
    { id: "b17", nivel: 2,
      enunciado: "Con alturas en cm y pesos en kg se obtiene Sxy = 109,22. ¿Cuánto vale la covarianza si la altura se mide en metros? ¿Cuánto vale r en ese caso si en cm era 0,9937?",
      check: [{ tipo: "num", etiqueta: "Sxy (m·kg) =", valor: 1.0922 }, { tipo: "num", etiqueta: "r (con metros) =", valor: 0.9937 }],
      pistas: ["x′ = 0,01·x: la covarianza se multiplica por 0,01."],
      pasos: ["Sx′y′ = 0,01·109,22 = 1,0922.", "r no cambia con la escala: 0,9937."],
      resultado: "1,0922 y 0,9937" },
    { id: "b18", nivel: 2,
      enunciado: "La altura de un niño (cm) según su edad entre 2 y 10 años sigue y = 6,3333x + 76,1111 (x en años). Estima la altura a los 6,5 años y decide qué tipo de estimación es la de los 30 años.",
      check: [{ tipo: "num", etiqueta: "y(6,5) (cm) =", valor: 117.28 }, { tipo: "opcion", etiqueta: "A los 30 años es una", opciones: ["interpolación fiable", "extrapolación poco fiable (da 266 cm)", "estimación exacta", "estimación imposible de calcular"], ok: 1 }],
      pistas: ["Compara el valor de x con el rango [2, 10]."],
      pasos: ["y(6,5) = 6,3333·6,5 + 76,1111 = 117,28 cm (interpolación).", "x = 30 está fuera de [2, 10]: extrapolación; da 266,1 cm, absurdo."],
      resultado: "117,28 cm · extrapolación poco fiable" },
    { id: "b19", nivel: 2,
      enunciado: "Con r = 0,9 entre las horas de estudio y las notas, ¿qué porcentaje de la variación de las notas se explica por las horas de estudio?",
      check: { tipo: "num", etiqueta: "Porcentaje (%) =", valor: 81 },
      pistas: ["Coeficiente de determinación r²."],
      pasos: ["r² = 0,9² = 0,81 → el 81 %."],
      resultado: "81 %" },
    { id: "b20", nivel: 2,
      enunciado: "En una distribución r = 0,6 y la pendiente de la recta de y sobre x es 0,9. Calcula la pendiente m′ de la recta de x sobre y (x = m′y + n′).",
      check: { tipo: "num", etiqueta: "m′ =", valor: 0.4 },
      pistas: ["m·m′ = r²."],
      pasos: ["m′ = r²/m = 0,36/0,9 = 0,4."],
      resultado: "m′ = 0,4" },
    { id: "b21", nivel: 2,
      enunciado: "Las rectas de regresión de una distribución son y = 0,5x + 3 (de y sobre x) y x = 0,8y − 1 (de x sobre y). Halla x̄, ȳ y r (4 decimales).",
      check: [{ tipo: "num", etiqueta: "x̄ =", valor: 2.3333 }, { tipo: "num", etiqueta: "ȳ =", valor: 4.1667 }, { tipo: "num", etiqueta: "r =", valor: 0.6325 }],
      pistas: ["Las rectas se cortan en (x̄, ȳ). El producto de pendientes es r²."],
      pasos: ["x = 0,8(0,5x + 3) − 1 = 0,4x + 1,4 → x̄ = 1,4/0,6 = 7/3 = 2,3333; ȳ = 0,5·7/3 + 3 = 25/6 = 4,1667.", "r² = 0,5·0,8 = 0,4 → r = +0,6325 (pendientes positivas)."],
      resultado: "x̄ = 7/3 · ȳ = 25/6 · r = 0,6325" },
    { id: "b22", nivel: 2,
      enunciado: "En 8 cajas se mide x = 1 ó 2 e y = 1 ó 2 con f(1,1) = 3, f(2,1) = 1, f(1,2) = 1 y f(2,2) = 3. Calcula el coeficiente de correlación.",
      check: { tipo: "num", etiqueta: "r =", valor: 0.5 },
      pistas: ["Sxy = Σfxy/N − x̄ȳ con N = 8."],
      pasos: ["x̄ = ȳ = 1,5; Σfxy = 3 + 2 + 2 + 12 = 19 → Sxy = 2,375 − 2,25 = 0,125.", "Sx² = Sy² = (1·4 + 4·4)/8 − 2,25 = 2,5 − 2,25 = 0,25 → r = 0,125/0,25 = 0,5."],
      resultado: "r = 0,5" },
    { id: "b23", nivel: 2,
      enunciado: "En la tabla de 30 alumnos (filas y = 4, 6, 8; columnas x = 1, 2, 3): fila 4 → 6, 2, 1; fila 6 → 3, 5, 3; fila 8 → 1, 3, 6. Calcula la media condicionada de la nota y entre los alumnos con x = 2 horas.",
      check: { tipo: "num", etiqueta: "ȳ|x=2 =", valor: 6.2 },
      pistas: ["Columna x = 2: frecuencias 2, 5, 3 (total 10)."],
      pasos: ["Distribución de y dado x = 2: 2/10, 5/10, 3/10.", "ȳ|x=2 = 4·0,2 + 6·0,5 + 8·0,3 = 0,8 + 3 + 2,4 = 6,2."],
      resultado: "6,2" },
    { id: "b24", nivel: 2,
      enunciado: "Los datos x: 1, 2, 3, 4, 5 e y: 2, 4, 6, 8, 10 tienen r = 1. Se añade un punto atípico (6, 2). ¿Cuánto vale ahora r (4 decimales)?",
      check: { tipo: "num", etiqueta: "r =", valor: 0.3273 },
      pistas: ["Con 6 puntos: x̄ = 3,5; ȳ = 5,3333."],
      pasos: ["Σx = 21, Σy = 32, Σx² = 91, Σy² = 224, Σxy = 2 + 8 + 18 + 32 + 50 + 12 = 122.", "Sx² = 91/6 − 12,25 = 2,9167; Sy² = 224/6 − 28,444 = 8,8889; Sxy = 122/6 − 3,5·5,3333 = 1,6667.", "r = 1,6667/√(2,9167·8,8889) = 1,6667/5,092 = 0,3273. Un solo dato atípico ha hecho caer la correlación de 1 a 0,33."],
      resultado: "r = 0,3273" },
    { id: "b25", nivel: 2,
      enunciado: "Una población tiene x: 0, 1, 2, 3 (horas) e y: 2, 6, 18, 54 (individuos). Se ajusta y = a·e^(bx) tomando logaritmos. Calcula b (4 decimales) y la predicción para x = 4.",
      check: [{ tipo: "num", etiqueta: "b =", valor: 1.0986 }, { tipo: "num", etiqueta: "y(4) =", valor: 162 }],
      pistas: ["ln y = ln a + b·x: es una recta. Los cocientes entre valores consecutivos son constantes."],
      pasos: ["y se triplica en cada hora: y = 2·3ˣ = 2·e^(x·ln 3) → b = ln 3 = 1,0986, a = 2.", "y(4) = 2·3⁴ = 162."],
      resultado: "b = ln 3 = 1,0986 · y(4) = 162" },
    { id: "b26", nivel: 2,
      enunciado: "Los datos x: 1, 2, 3, 4 e y: 2, 8, 18, 32 siguen un modelo potencial y = a·xᵇ. Halla b y a.",
      check: [{ tipo: "num", etiqueta: "b =", valor: 2 }, { tipo: "num", etiqueta: "a =", valor: 2 }],
      pistas: ["Representa ln y frente a ln x: la pendiente es b."],
      pasos: ["y = 2x²: 2·1 = 2, 2·4 = 8, 2·9 = 18, 2·16 = 32.", "ln y = ln 2 + 2·ln x: pendiente b = 2 y a = e^(ln 2) = 2."],
      resultado: "y = 2x²" },

    // ================= ★★★ avanzado =================
    { id: "b27", nivel: 3,
      enunciado: "Se tienen los pares (1, 2), (3, 5), (4, 6), (6, 9), (8, 11). Calcula r (4 decimales) y la recta de regresión de y sobre x (m y n con 4 decimales).",
      check: [{ tipo: "num", etiqueta: "r =", valor: 0.9973 }, { tipo: "num", etiqueta: "m =", valor: 1.2945 }, { tipo: "num", etiqueta: "n =", valor: 0.9041 }],
      pistas: ["Σx = 22, Σy = 33, Σx² = 126, Σy² = 267, Σxy = 183."],
      pasos: ["x̄ = 4,4; ȳ = 6,6. Sx² = 25,2 − 19,36 = 5,84; Sy² = 53,4 − 43,56 = 9,84; Sxy = 36,6 − 29,04 = 7,56.", "r = 7,56/√(5,84·9,84) = 7,56/7,5805 = 0,9973.", "m = 7,56/5,84 = 1,2945; n = 6,6 − 1,2945·4,4 = 0,9041."],
      resultado: "r = 0,9973 · y = 1,2945x + 0,9041" },
    { id: "b28", nivel: 3,
      enunciado: "Demuestra que la recta de regresión de y sobre x pasa por el punto (x̄, ȳ).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Escribe la recta y − ȳ = (Sxy/Sx²)(x − x̄)", p: 0.5 },
        { t: "Sustituye x = x̄", p: 0.5 },
        { t: "Obtiene y − ȳ = 0, es decir, y = ȳ", p: 0.5 },
        { t: "Concluye que el punto (x̄, ȳ) cumple la ecuación (o lo deduce de ∂S/∂n = 0)", p: 0.5 }
      ] },
      pasos: ["La ecuación es y − ȳ = m(x − x̄) con m = Sxy/Sx².", "Para x = x̄: y − ȳ = m·0 = 0 → y = ȳ.", "Por tanto (x̄, ȳ) está en la recta. ∎"],
      resultado: "(x̄, ȳ) pertenece a la recta de regresión" },
    { id: "b29", nivel: 3,
      enunciado: "Deduce la pendiente de la recta de regresión m = Sxy/Sx² minimizando S(m, n) = Σ(yᵢ − mxᵢ − n)² con derivadas.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 8, items: [
        { t: "Deriva respecto de n e iguala a 0: obtiene ȳ = m·x̄ + n", p: 0.5 },
        { t: "Deriva respecto de m e iguala a 0: Σxᵢ(yᵢ − mxᵢ − n) = 0", p: 0.5 },
        { t: "Sustituye n = ȳ − m·x̄ y agrupa", p: 0.5 },
        { t: "Llega a Sxy − m·Sx² = 0 y despeja m = Sxy/Sx²", p: 0.5 }
      ] },
      pasos: ["∂S/∂n = −2Σ(yᵢ − mxᵢ − n) = 0 ⟹ n = ȳ − m·x̄.", "∂S/∂m = −2Σxᵢ(yᵢ − mxᵢ − n) = 0 ⟹ Σxᵢyᵢ − mΣxᵢ² − nΣxᵢ = 0.", "Dividiendo entre N y sustituyendo n: (Σxᵢyᵢ/N − x̄ȳ) − m(Σxᵢ²/N − x̄²) = 0 ⟹ Sxy = m·Sx². ∎"],
      resultado: "m = Sxy/Sx²" },
    { id: "b30", nivel: 3,
      enunciado: "Demuestra que −1 ≤ r ≤ 1 usando que la varianza de la variable y − m·x (con m = Sxy/Sx²) no puede ser negativa.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Calcula Var(y − m·x) = Sy² − 2m·Sxy + m²·Sx²", p: 0.5 },
        { t: "Sustituye m = Sxy/Sx² y simplifica: Sy² − Sxy²/Sx²", p: 0.5 },
        { t: "Escribe Sy² − Sxy²/Sx² = Sy²(1 − r²)", p: 0.5 },
        { t: "Como la varianza es ≥ 0, concluye 1 − r² ≥ 0, es decir, |r| ≤ 1", p: 0.5 }
      ] },
      pasos: ["Var(y − mx) = Sy² + m²Sx² − 2mSxy.", "Con m = Sxy/Sx²: Sy² + Sxy²/Sx² − 2Sxy²/Sx² = Sy² − Sxy²/Sx² = Sy²(1 − Sxy²/(Sx²Sy²)) = Sy²(1 − r²).", "Una varianza no es negativa: Sy²(1 − r²) ≥ 0 ⟹ r² ≤ 1. ∎"],
      resultado: "|r| ≤ 1" },
    { id: "b31", nivel: 3,
      enunciado: "Tabla de doble entrada con x = 1, 2, 3 (columnas) e y = 4, 6, 8 (filas): fila 4 → 6, 2, 1; fila 6 → 3, 5, 3; fila 8 → 1, 3, 6. Calcula la covarianza y el coeficiente de correlación (4 decimales).",
      check: [{ tipo: "num", etiqueta: "Sxy =", valor: 0.6667 }, { tipo: "num", etiqueta: "r =", valor: 0.5134 }],
      pistas: ["N = 30; x̄ = 2; ȳ = 182/30; Σfxy = 384."],
      pasos: ["x̄ = 2; ȳ = (4·9 + 6·11 + 8·10)/30 = 6,0667. Sx² = 0,6667; Sy² = (16·9 + 36·11 + 64·10)/30 − 36,804 = 2,5289.", "Σfxy = 4·13 + 6·22 + 8·25 = 52 + 132 + 200 = 384 → Sxy = 12,8 − 12,1333 = 0,6667.", "r = 0,6667/√(0,6667·2,5289) = 0,5134."],
      resultado: "Sxy = 0,6667 · r = 0,5134" },
    { id: "b32", nivel: 3,
      enunciado: "Las rectas de regresión de una distribución son y = 2x + 1 (de y sobre x) y x = 0,3y + 2 (de x sobre y). Halla x̄, ȳ y r (4 decimales).",
      check: [{ tipo: "num", etiqueta: "x̄ =", valor: 5.75 }, { tipo: "num", etiqueta: "ȳ =", valor: 12.5 }, { tipo: "num", etiqueta: "r =", valor: 0.7746 }],
      pistas: ["Resuelve el sistema para el punto de corte; r² = m·m′."],
      pasos: ["x = 0,3(2x + 1) + 2 = 0,6x + 2,3 → x̄ = 5,75; ȳ = 12,5.", "r² = 2·0,3 = 0,6 → r = +0,7746."],
      resultado: "x̄ = 5,75 · ȳ = 12,5 · r = 0,7746" },
    { id: "b33", nivel: 3,
      enunciado: "Para dos variables, r = 0,8 y Sxy = 3. Se definen x′ = x + 10 e y′ = −2y. Calcula r′ y Sx′y′.",
      check: [{ tipo: "num", etiqueta: "r′ =", valor: -0.8 }, { tipo: "num", etiqueta: "Sx′y′ =", valor: -6 }],
      pistas: ["Sx′y′ = a·c·Sxy con a = 1 y c = −2."],
      pasos: ["Sx′y′ = 1·(−2)·3 = −6.", "Como a·c = −2 &lt; 0, r cambia de signo y su valor absoluto se conserva: r′ = −0,8."],
      resultado: "r′ = −0,8 · Sx′y′ = −6" },
    { id: "b34", nivel: 3,
      enunciado: "Con los datos de horas de estudio (x) y notas (y) se quiere estimar cuántas horas ha estudiado un alumno a partir de su nota. ¿Qué recta hay que usar?",
      check: { tipo: "opcion", etiqueta: "Se usa…", opciones: ["la recta de y sobre x, despejando x", "la recta de x sobre y", "cualquiera de las dos, da lo mismo", "la recta y = ȳ"], ok: 1 },
      pistas: ["Cada recta minimiza el error de la variable que se predice."],
      pasos: ["Para predecir x desde y hay que usar la recta de x sobre y: x − x̄ = (Sxy/Sy²)(y − ȳ).", "Sólo darían lo mismo si |r| = 1."],
      resultado: "la recta de x sobre y" },
    { id: "b35", nivel: 3,
      enunciado: "Inversión en publicidad (x, miles de €): 1, 2, 3, 4, 5, 6 y ventas (y, miles de €): 12, 15, 19, 21, 26, 28. Halla la recta de regresión de y sobre x (m y n con 4 decimales) y estima las ventas para x = 7.",
      check: [{ tipo: "num", etiqueta: "m =", valor: 3.2857 }, { tipo: "num", etiqueta: "n =", valor: 8.6667 }, { tipo: "num", etiqueta: "y(7) =", valor: 31.667 }],
      pistas: ["Σx = 21, Σy = 121, Σx² = 91, Σxy = 481; n = 6."],
      pasos: ["x̄ = 3,5; ȳ = 20,1667; Sx² = 2,9167; Sxy = 481/6 − 70,5833 = 9,5833.", "m = 9,5833/2,9167 = 3,2857; n = 20,1667 − 3,2857·3,5 = 8,6667.", "y(7) = 3,2857·7 + 8,6667 = 31,667 (ligera extrapolación)."],
      resultado: "y = 3,2857x + 8,6667 → 31,67" },
    { id: "b36", nivel: 3,
      enunciado: "Con la recta y = 6,3333x + 76,1111 (altura en cm, edad en años), ¿cuántos centímetros crece de media un niño por cada año (entre los 2 y los 10)?",
      check: { tipo: "num", etiqueta: "Crecimiento (cm/año) =", valor: 6.3333 },
      pistas: ["La pendiente indica el cambio de y por unidad de x."],
      pasos: ["m = 6,3333 cm por año."],
      resultado: "6,33 cm/año" },
    { id: "b37", nivel: 3,
      enunciado: "Se ajusta y = a + b·ln x a x: 1, 2, 4, 8 e y: 5, 8, 11, 14 (exacto). Calcula b (3 decimales) y la predicción para x = 16.",
      check: [{ tipo: "num", etiqueta: "b =", valor: 4.328 }, { tipo: "num", etiqueta: "y(16) =", valor: 17 }],
      pistas: ["Cada vez que x se duplica, y aumenta 3: b·ln 2 = 3."],
      pasos: ["b = 3/ln 2 = 4,3281 y a = 5 (ln 1 = 0).", "y(16) = 5 + 4,3281·ln 16 = 5 + 4,3281·2,7726 = 17."],
      resultado: "b = 4,328 · y(16) = 17" },
    { id: "b38", nivel: 3,
      enunciado: "Con la recta y = 1,3x + 1,7 para los datos x: 1, 2, 3, 4, 5 e y: 3, 4, 6, 7, 8, calcula el residuo del dato (5, 8) y la suma de los cuadrados de todos los residuos.",
      check: [{ tipo: "num", etiqueta: "Residuo de (5, 8) =", valor: -0.2 }, { tipo: "num", etiqueta: "Suma de cuadrados =", valor: 0.3 }],
      pistas: ["Residuo = y real − y predicho."],
      pasos: ["Predicciones: 3,0; 4,3; 5,6; 6,9; 8,2 → residuos 0; −0,3; 0,4; 0,1; −0,2 (suman 0).", "Residuo de (5, 8): 8 − 8,2 = −0,2. Suma de cuadrados: 0 + 0,09 + 0,16 + 0,01 + 0,04 = 0,30."],
      resultado: "−0,2 y 0,30" },
    { id: "b39", nivel: 3,
      enunciado: "Se observa una correlación de r = 0,85 entre el número de bomberos que acuden a un incendio y los daños materiales. ¿Se puede concluir que los bomberos causan más daños? Razona.",
      check: { tipo: "rubrica", etiqueta: "Tu razonamiento", filas: 6, items: [
        { t: "Dice que correlación no implica causalidad", p: 0.5 },
        { t: "Identifica una variable oculta: la gravedad del incendio", p: 0.5 },
        { t: "Explica que incendios más graves requieren más bomberos y producen más daños", p: 0.5 },
        { t: "Concluye que la asociación no demuestra que los bomberos causen los daños", p: 0.5 }
      ] },
      pasos: ["r = 0,85 indica una asociación fuerte, no una causa.", "La gravedad del incendio es la variable oculta: más grave → más bomberos y más daños.", "No se puede concluir causalidad."],
      resultado: "No: hay una variable oculta (la gravedad del incendio)" },
    { id: "b40", nivel: 3,
      enunciado: "Estudia completamente la distribución (1, 2), (2, 4), (3, 3), (4, 6), (5, 5), (6, 8), (7, 7): medias, varianzas, covarianza, r y recta de y sobre x, e interpreta el resultado.",
      check: { tipo: "rubrica", etiqueta: "Tu estudio", filas: 9, items: [
        { t: "Medias: x̄ = 4 e ȳ = 5", p: 0.4 },
        { t: "Varianzas: Sx² = 4 y Sy² = 4 (Σx² = 140, Σy² = 203)", p: 0.5 },
        { t: "Covarianza: Sxy = 165/7 − 20 = 25/7 ≈ 3,5714", p: 0.4 },
        { t: "r = 3,5714/4 = 0,8929: correlación positiva fuerte", p: 0.4 },
        { t: "Recta: y − 5 = 0,8929(x − 4) → y = 0,8929x + 1,4286", p: 0.4 },
        { t: "Interpretación: por cada unidad de x, y aumenta de media 0,89; r² = 0,797: casi el 80 % de la variación de y se explica por x", p: 0.4 }
      ] },
      pasos: ["Σx = 28, Σy = 35, Σx² = 140, Σy² = 203, Σxy = 165. x̄ = 4; ȳ = 5.", "Sx² = 20 − 16 = 4; Sy² = 29 − 25 = 4; Sxy = 165/7 − 20 = 3,5714.", "r = 3,5714/(2·2) = 0,8929. m = 3,5714/4 = 0,8929; n = 5 − 0,8929·4 = 1,4286."],
      resultado: "r = 0,8929 · y = 0,8929x + 1,4286" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Fórmulas de la estadística bidimensional", ancha: true,
      tabla: { cab: ["Magnitud", "Fórmula"], filas: [
        ["Medias", "x̄ = Σxᵢ/n · ȳ = Σyᵢ/n"], ["Varianzas", "Sx² = Σxᵢ²/n − x̄² · Sy² = Σyᵢ²/n − ȳ²"], ["Covarianza", "Sxy = Σxᵢyᵢ/n − x̄·ȳ"],
        ["Correlación", "r = Sxy/(Sx·Sy)  (−1 ≤ r ≤ 1)"], ["Determinación", "r² = % de variación de y explicado por x"], ["Recta de y sobre x", "y − ȳ = (Sxy/Sx²)(x − x̄)"], ["Recta de x sobre y", "x − x̄ = (Sxy/Sy²)(y − ȳ)"]
      ] },
      nota: "Con frecuencias: sumas ponderadas con fᵢ y dividir entre N = Σfᵢ." },
    { titulo: "La tabla de cálculo",
      pasos: ["Columnas: xᵢ, yᵢ, xᵢ², yᵢ², xᵢ·yᵢ y sus sumas.", "Medias: x̄ = Σx/n, ȳ = Σy/n.", "Varianzas: Σx²/n − x̄² y Σy²/n − ȳ².", "Covarianza: Σxy/n − x̄ȳ.", "r y la recta."],
      nota: "Comprueba con la calculadora (σₙ, no σₙ₋₁)." },
    { titulo: "Cómo leer r",
      tabla: { cab: ["|r|", "Relación"], filas: [["0,9 – 1", "muy fuerte"], ["0,7 – 0,9", "fuerte"], ["0,4 – 0,7", "moderada"], ["0,2 – 0,4", "débil"], ["&lt; 0,2", "nula"]] },
      items: [{ label: "Signo", formula: "r &gt; 0: creciente · r &lt; 0: decreciente" }, { label: "r = ±1", formula: "puntos exactamente sobre una recta" }],
      nota: "r sólo mide la relación lineal: mira la nube." },
    { titulo: "Las dos rectas de regresión",
      items: [
        { label: "Pendientes", formula: "m = Sxy/Sx² = r·Sy/Sx · m′ = Sxy/Sy²", ejemplo: "m·m′ = r²" },
        { label: "Punto común", formula: "se cortan en (x̄, ȳ)" },
        { label: "Casos límite", formula: "|r| = 1: coinciden · r = 0: y = ȳ y x = x̄" },
        { label: "Cuál usar", formula: "predecir y → y sobre x · predecir x → x sobre y" }
      ] },
    { titulo: "Predicción",
      items: [
        { label: "Interpolación", formula: "x dentro del rango de datos", cuando: "Fiable si |r| es alto." },
        { label: "Extrapolación", formula: "x fuera del rango", ojo: "Puede dar resultados absurdos (alturas de 2,7 m, precios negativos)." },
        { label: "Residuo", formula: "eᵢ = yᵢ − (mxᵢ + n) · Σeᵢ = 0", ejemplo: "SCE = n·Sy²(1 − r²)" }
      ] },
    { titulo: "Cambios de escala",
      items: [
        { label: "Transformación lineal", formula: "x′ = ax + b, y′ = cy + d", cuando: "Sx′y′ = a·c·Sxy · Sx′ = |a|Sx" },
        { label: "Efecto en r", formula: "|r′| = |r|; r′ = −r si a·c &lt; 0" }
      ],
      nota: "Pasar de cm a m cambia Sxy, no r." },
    { titulo: "Tablas de doble entrada",
      items: [
        { label: "Marginales", formula: "totales de filas (y) y de columnas (x)" },
        { label: "Condicionada", formula: "P(y | x = xⱼ) = fᵢⱼ/f·ⱼ", ejemplo: "columna dividida entre su total" },
        { label: "Independencia", formula: "fᵢⱼ = fᵢ·f·ⱼ/N en todas las casillas", ojo: "Sxy = 0 no implica independencia." }
      ] },
    { titulo: "Ajustes no lineales",
      tabla: { cab: ["Modelo", "Transformación"], filas: [["y = a·eᵇˣ", "ln y frente a x"], ["y = a·xᵇ", "ln y frente a ln x"], ["y = a + b·ln x", "y frente a ln x"]] },
      nota: "Después se deshace: a = e^(ordenada) en los dos primeros casos." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "r = 1,3 «correlación fortísima»", bien: "r ∈ [−1, 1]", por: "Un valor fuera del rango indica un error." },
        { mal: "Correlación alta ⇒ x causa y", bien: "Sólo hay asociación", por: "Variable oculta, causa inversa o azar." },
        { mal: "r = 0 ⇒ no hay relación", bien: "No hay relación LINEAL", por: "y = x² da r = 0." },
        { mal: "Sxy = Σxy/n", bien: "Sxy = Σxy/n − x̄ȳ", por: "Falta restar el producto de medias." },
        { mal: "Predecir x despejando de la recta de y sobre x", bien: "Usar la recta de x sobre y", por: "Cada recta minimiza su propio error." },
        { mal: "Predecir a los 40 años con datos de 2–10 años", bien: "Es extrapolación: no fiable", por: "La relación puede dejar de ser lineal." }
      ] }
  ];

  B.registrar("mates1", "t12", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
