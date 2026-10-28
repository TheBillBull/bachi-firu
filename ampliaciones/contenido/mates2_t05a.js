/* ============================================================
   Matemáticas II · ampliaciones · Tema 5: Puntos, rectas y planos en el espacio
   (parte A: se añade al final de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t5/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Determinar una recta
  secciones[0] =
    "<h5>Dos formas habituales de dar una recta</h5>" +
    "<p>En los problemas, la recta casi nunca viene como «punto y vector». Lo normal es que te den <b>dos puntos</b> A y B (el vector director es entonces v = AB = B − A) o <b>dos planos</b> que se cortan. En ambos casos el primer paso es el mismo: <b>conseguir un punto y un vector director</b>; todo lo demás sale de ahí.</p>" +
    ejemplo("Recta por dos puntos",
      "Halla un punto y un vector director de la recta que pasa por A(1, −2, 3) y B(4, 0, −1). ¿Pertenece C(7, 2, −5) a la recta?",
      ["Vector director: v = AB = B − A = (4 − 1, 0 − (−2), −1 − 3) = <b>(3, 2, −4)</b>. Como punto sirve A (o B).",
       "Paramétricas: x = 1 + 3t, y = −2 + 2t, z = 3 − 4t.",
       "¿Está C? Igualamos cada coordenada: 7 = 1 + 3t ⟹ t = 2; 2 = −2 + 2t ⟹ t = 2; −5 = 3 − 4t ⟹ t = 2. <b>Sale el mismo t en las tres</b>, luego C está en la recta (es el punto para t = 2).",
       "Si C fuese (7, 2, −4), la tercera daría t = 7/4 ≠ 2 y no pertenecería."]) +
    "<p><b>Regla para saber si un punto está en una recta:</b> se sustituye en las ecuaciones paramétricas y se despeja t en cada una; el punto pertenece si y solo si <b>el valor de t es el mismo en las tres</b> (o, en la continua, si las tres fracciones valen lo mismo).</p>" +
    ojo("El vector director no es único: cualquier múltiplo no nulo de v sirve (también el opuesto). Dos ecuaciones distintas pueden describir la misma recta; para compararlas hay que mirar si los directores son proporcionales y si comparten un punto.");

  // ---------------------------------------------------------------- 2. Ecuaciones de la recta
  secciones[1] =
    "<h5>La cuarta forma: la recta como intersección de dos planos</h5>" +
    "<p>Una recta también se puede ver como el conjunto de puntos que cumplen <b>dos ecuaciones de plano a la vez</b> (los dos planos se cortan en esa recta). Es la ecuación <b>implícita</b> (o «general») de la recta:</p>" +
    "<div class='formula-wrap'><div class='formula'>r: { A₁x + B₁y + C₁z + D₁ = 0 &nbsp;·&nbsp; A₂x + B₂y + C₂z + D₂ = 0 }</div></div>" +
    "<p>Hay infinitos pares de planos que dan la misma recta (cualquier par de planos que la contengan). Es la forma más frecuente en los enunciados de la EvAU, y la que hay que saber <b>convertir</b>.</p>" +
    "<h5>De la implícita a las demás (la conversión más pedida)</h5>" +
    "<p>Si r viene como intersección de π₁ y π₂, un punto de r cumple las dos ecuaciones y su vector director es <b>perpendicular a las dos normales</b>: v = n₁ × n₂. Para el punto: se da un valor a una incógnita (la que deje un sistema 2×2 con solución) y se resuelven las otras dos. Otra forma, igual de válida: se toma una incógnita como parámetro (z = t) y se despejan x e y en función de t; así salen directamente las paramétricas.</p>" +
    ejemplo("De implícita a paramétricas y continua",
      "Pasa a paramétricas y a continua la recta r: x − 2y + z = 3, 2x + y − z = 0.",
      ["Vector director: n₁ = (1, −2, 1), n₂ = (2, 1, −1). v = n₁ × n₂ = ((−2)(−1) − 1·1, 1·2 − 1·(−1), 1·1 − (−2)·2) = <b>(1, 3, 5)</b>.",
       "Un punto: hacemos x = 0. Entonces −2y + z = 3 e y − z = 0 ⟹ z = y ⟹ −y = 3 ⟹ y = −3, z = −3. Punto <b>P(0, −3, −3)</b>.",
       "Comprobación en las dos ecuaciones: 0 + 6 − 3 = 3 ✓ y 0 − 3 + 3 = 0 ✓.",
       "Paramétricas: x = t, y = −3 + 3t, z = −3 + 5t.",
       "Continua: " + fr("x", "1") + " = " + fr("y + 3", "3") + " = " + fr("z + 3", "5") + ".",
       "Segunda comprobación: para t = 1 sale (1, 0, 2) y debe cumplir las dos ecuaciones: 1 − 0 + 2 = 3 ✓ y 2 + 0 − 2 = 0 ✓."]) +
    "<h5>De la continua a la implícita</h5>" +
    "<p>La continua es una cadena de igualdades; basta <b>tomarlas de dos en dos</b> y quitar denominadores. Cada pareja da un plano y las dos parejas dan la recta como intersección.</p>" +
    ejemplo("De continua a implícita",
      "Escribe como intersección de dos planos la recta " + fr("x − 1", "2") + " = " + fr("y + 1", "−1") + " = " + fr("z − 3", "3") + ".",
      ["Primera con segunda, multiplicando en cruz: −(x − 1) = 2(y + 1) ⟹ −x + 1 = 2y + 2 ⟹ <b>x + 2y + 1 = 0</b>.",
       "Segunda con tercera: 3(y + 1) = −(z − 3) ⟹ 3y + 3 = −z + 3 ⟹ <b>3y + z = 0</b>.",
       "Comprobación: el punto P(1, −1, 3) cumple ambas: 1 − 2 + 1 = 0 ✓ y −3 + 3 = 0 ✓. Y n₁ × n₂ = (1, 2, 0) × (0, 3, 1) = (2, −1, 3), que es el director (2, −1, 3) de la recta ✓."]) +
    "<h5>Cuando una componente del vector director es 0</h5>" +
    "<p>Si v tiene una componente nula no se puede dividir entre ella. Esa coordenada <b>no cambia</b> (es constante) y se escribe aparte; las otras dos se igualan. Por ejemplo, la recta por P(1, 2, 3) con v = (2, 0, −1) es " + fr("x − 1", "2") + " = " + fr("z − 3", "−1") + ", &nbsp; <b>y = 2</b>. Ese «y = 2» ya es uno de los planos de la implícita (el plano horizontal en y), y el otro sale de la igualdad: x − 1 = −2(z − 3) ⟹ x + 2z − 7 = 0.</p>" +
    w("esp_formas") +
    ojo("«Continua» y «implícita» no son lo mismo: la continua es una cadena de <b>tres</b> fracciones iguales (que equivale a dos ecuaciones), la implícita son dos ecuaciones de plano. Y escribir «0» en un denominador es el error más habitual: hay que escribir esa coordenada aparte.");

  // ---------------------------------------------------------------- 3. Determinar un plano
  secciones[2] =
    "<h5>Cuatro maneras de determinar un plano</h5>" +
    "<p>Un plano queda fijado por cualquiera de estos datos (siempre se reduce a «un punto y dos vectores no paralelos», o «un punto y una normal»):</p>" +
    tabla(["Datos", "Punto", "Vectores directores", "Normal"], [
      ["Tres puntos A, B, C (no alineados)", "A", "AB y AC", "AB × AC"],
      ["Una recta r y un punto Q fuera de ella", "el de r", "v<sub>r</sub> y PQ (P de r)", "v<sub>r</sub> × PQ"],
      ["Dos rectas secantes (o paralelas)", "el de una", "v₁ y v₂ (si son paralelas: v y PQ)", "v₁ × v₂"],
      ["Un punto P y la normal n", "P", "—", "n"]
    ]) +
    ejemplo("Plano que contiene a una recta y a un punto",
      "Halla el plano que contiene a la recta r: x = 1 + t, y = 2t, z = 2 − t y al punto Q(2, 3, 1).",
      ["De r: punto P(1, 0, 2) y director u = (1, 2, −1).",
       "Segundo vector del plano: PQ = Q − P = (1, 3, −1). No es paralelo a u, así que Q no está en r.",
       "Normal: n = u × PQ = (2·(−1) − (−1)·3, (−1)·1 − 1·(−1), 1·3 − 2·1) = <b>(1, 0, 1)</b>.",
       "Plano: 1·(x − 1) + 0·(y − 0) + 1·(z − 2) = 0 ⟹ <b>x + z − 3 = 0</b>.",
       "Comprobación con Q: 2 + 1 − 3 = 0 ✓. (Y con otro punto de r, t = 1: (2, 2, 1): 2 + 1 − 3 = 0 ✓.)"]) +
    "<p>En el ejemplo no aparece la coordenada y: el plano x + z = 3 es <b>paralelo al eje OY</b>. Es una regla muy útil para comprobar: <i>si falta una variable en la ecuación general, el plano es paralelo al eje de esa variable</i>.</p>" +
    ojo("Si los tres puntos están alineados (AB y AC son proporcionales, AB × AC = 0) no determinan un único plano: hay infinitos que los contienen. Y si el punto Q está en la recta, tampoco: la recta y el punto no determinan plano. Comprueba siempre que los vectores no sean paralelos.");

  // ---------------------------------------------------------------- 4. Ecuaciones del plano
  secciones[3] =
    "<h5>Plano por tres puntos, con un determinante</h5>" +
    "<p>Una forma rápida de escribir la ecuación general sin calcular la normal es imponer que el punto genérico X(x, y, z) sea <b>coplanario</b> con A, B y C, es decir, que el producto mixto de AX, AB y AC sea cero:</p>" +
    "<div class='formula-wrap'><div class='formula'>| x − a₁ &nbsp; y − a₂ &nbsp; z − a₃ ; &nbsp; AB₁ &nbsp; AB₂ &nbsp; AB₃ ; &nbsp; AC₁ &nbsp; AC₂ &nbsp; AC₃ | = 0</div></div>" +
    "<p>Desarrollar este determinante por la primera fila es exactamente lo mismo que (x − a₁, y − a₂, z − a₃)·(AB × AC) = 0.</p>" +
    ejemplo("Plano por tres puntos, forma segmentaria",
      "Halla el plano que pasa por A(1, 0, 0), B(0, 2, 0) y C(0, 0, 3).",
      ["AB = (−1, 2, 0) y AC = (−1, 0, 3).",
       "n = AB × AC = (2·3 − 0·0, 0·(−1) − (−1)·3, (−1)·0 − 2·(−1)) = <b>(6, 3, 2)</b>.",
       "Plano: 6(x − 1) + 3y + 2z = 0 ⟹ <b>6x + 3y + 2z − 6 = 0</b>.",
       "Dividiendo entre 6: x/1 + y/2 + z/3 = 1. Es la <b>forma segmentaria</b>: los denominadores (1, 2, 3) son los puntos donde el plano corta a los ejes."]) +
    "<h5>De la ecuación general a puntos, vectores y paramétricas</h5>" +
    "<p>Para pasar de Ax + By + Cz + D = 0 a la vectorial: <b>se buscan tres puntos</b> (dando valores a dos incógnitas y despejando la tercera) y se hace como «plano por tres puntos». Otra opción es poner dos incógnitas como parámetros (y = λ, z = μ) y despejar la otra: así salen las paramétricas directamente.</p>" +
    ejemplo("De la general a las paramétricas",
      "Escribe en paramétricas el plano π: x + 2y − z = 4.",
      ["Se despeja x: x = 4 − 2y + z. Se toman y = λ, z = μ como parámetros.",
       "<b>x = 4 − 2λ + μ, y = λ, z = μ</b>, es decir, X = (4, 0, 0) + λ(−2, 1, 0) + μ(1, 0, 1).",
       "Comprobación: u × v = (−2, 1, 0) × (1, 0, 1) = (1·1 − 0·0, 0·1 − (−2)·1, 0 − 1·1) = (1, 2, −1), que es la normal (1, 2, −1) de π ✓.",
       "Cortes con los ejes: y = z = 0 ⟹ x = 4; x = z = 0 ⟹ y = 2; x = y = 0 ⟹ z = −4."]) +
    w("esp_formas", "plano") +
    "<h5>Planos de ecuación sencilla</h5>" +
    tabla(["Ecuación", "Qué plano es"], [
      ["x = k, &nbsp; y = k, &nbsp; z = k", "perpendicular al eje X, Y, Z (paralelo a los planos coordenados YZ, XZ, XY)"],
      ["z = 0 &nbsp; (y = 0, &nbsp; x = 0)", "el plano coordenado XY (XZ, YZ)"],
      ["Falta una variable: Ax + By + D = 0", "paralelo al eje de la variable que falta (aquí, OZ)"],
      ["Falta el término D: Ax + By + Cz = 0", "pasa por el origen"],
      ["Ax + By + Cz + D = 0 y Ax + By + Cz + D′ = 0", "paralelos (misma normal)"]
    ]) +
    ojo("La normal (A, B, C) se lee <b>directamente</b> de la ecuación general. Pero si la ecuación está sin simplificar (por ejemplo 2x − 4y + 2z = 6), (2, −4, 2) y (1, −2, 1) son la misma dirección: puedes simplificar para trabajar con números pequeños sin cambiar el plano.");

  // ---------------------------------------------------------------- 5. Posiciones relativas de dos rectas
  secciones[4] =
    "<h5>Método de los vectores: tres vectores y un determinante</h5>" +
    "<p>Sean r (punto A, director u) y s (punto Q, director v). Se mira el vector AQ que une los puntos. Todo se decide con los <b>rangos</b> de {u, v} y de {u, v, AQ}:</p>" +
    tabla(["Posición", "rango {u, v}", "rango {u, v, AQ}", "Lo que ocurre"], [
      ["Coincidentes", "1", "1", "los tres vectores son proporcionales"],
      ["Paralelas", "1", "2", "u ∥ v, pero AQ no es paralelo a ellos"],
      ["Secantes (se cortan)", "2", "2", "u, v, AQ coplanarios: det(u, v, AQ) = 0"],
      ["Se cruzan", "2", "3", "u, v, AQ no coplanarios: det(u, v, AQ) ≠ 0"]
    ]) +
    "<p>En la práctica: <b>primero</b> ¿u y v son proporcionales? Si no lo son (rango 2) basta calcular un único determinante: <b>0 ⟹ se cortan, distinto de 0 ⟹ se cruzan</b>. Si lo son, se mira si AQ también es proporcional.</p>" +
    ejemplo("Los cuatro casos con una misma recta",
      "Sea r la recta por A(1, 2, 3) con u = (1, −1, 2). Estudia la posición relativa de r y cada una de estas rectas: (a) s por Q(0, 1, 0), v = (2, 1, 1); (b) s por Q(0, 0, 4), v = (2, 1, 1); (c) s por Q(0, 0, 0), v = (−2, 2, −4); (d) s por Q(3, 0, 7), v = (−2, 2, −4).",
      ["<b>(a)</b> u y v no son proporcionales (1/2 ≠ −1/1). AQ = (−1, −1, −3). det(u, v, AQ) = |1 −1 2 ; 2 1 1 ; −1 −1 −3| = −9 ≠ 0 ⟹ <b>se cruzan</b>.",
       "<b>(b)</b> Mismo v. AQ = (−1, −2, 1). det = |1 −1 2 ; 2 1 1 ; −1 −2 1| = 0 ⟹ <b>se cortan</b>. El punto: r en t = 1 da (2, 1, 5) y s en λ = 1 da (0 + 2, 0 + 1, 4 + 1) = (2, 1, 5) ✓.",
       "<b>(c)</b> v = −2u: son proporcionales (rango 1). AQ = (−1, −2, −3) no es proporcional a u = (1, −1, 2) (−1/1 ≠ −2/−1) ⟹ rango {u, v, AQ} = 2 ⟹ <b>paralelas</b>.",
       "<b>(d)</b> v = −2u y AQ = (2, −2, 4) = 2u: los tres son proporcionales ⟹ <b>coincidentes</b>. (Q es el punto de r para t = 2.)"]) +
    w("esp_rectas") +
    "<h5>Método de los rangos con las rectas en implícita</h5>" +
    "<p>Si r y s vienen como intersección de planos (cuatro ecuaciones con tres incógnitas), se escribe la matriz de coeficientes M (4×3) y la ampliada M* (4×4) y se compara el rango:</p>" +
    tabla(["rango M", "rango M*", "Posición"], [
      ["3", "3", "se cortan (un punto: el sistema tiene solución única)"],
      ["3", "4", "se cruzan (sistema incompatible, directores no paralelos)"],
      ["2", "2", "coincidentes (infinitas soluciones: una recta)"],
      ["2", "3", "paralelas (sistema incompatible, directores paralelos)"]
    ]) +
    ejemplo("Dos rectas en implícita",
      "Estudia r: x − y = 0, y − z = 0 y s: x + y = 2, x + z = 2.",
      ["M = (1 −1 0 ; 0 1 −1 ; 1 1 0 ; 1 0 1). Con las tres primeras filas el determinante es |1 −1 0 ; 0 1 −1 ; 1 1 0| = 1·(0 + 1) + 1·(0 + 1) = 2 ≠ 0 ⟹ rango M = 3.",
       "El sistema tiene solución: r da x = y = z = t, y en s: 2t = 2 ⟹ t = 1 (y x + z = 2 ✓). Luego rango M* = 3 también.",
       "rango M = rango M* = 3 ⟹ <b>se cortan en el punto (1, 1, 1)</b>."]) +
    ojo("Dos rectas del espacio pueden «parecer» cortarse en un dibujo y no hacerlo: sin coordenadas no se puede decidir, y por eso el método es siempre el determinante. Y recuerda: en el plano las rectas no paralelas siempre se cortan; <b>en el espacio, no</b> (se pueden cruzar).");

  // ---------------------------------------------------------------- 6. Recta-plano y plano-plano
  secciones[5] =
    "<h5>Recta y plano con los rangos</h5>" +
    "<p>Con la recta en implícita (dos planos) y el plano, se obtiene un sistema de 3 ecuaciones y 3 incógnitas: M es 3×3 y M* es 3×4.</p>" +
    tabla(["rango M", "rango M*", "Posición", "Soluciones"], [
      ["3", "3", "secantes", "un único punto"],
      ["2", "2", "la recta está contenida en el plano", "infinitas (una recta)"],
      ["2", "3", "paralelos (sin tocarse)", "ninguna"]
    ]) +
    "<p>Con la recta en paramétricas es todavía más corto: se sustituye (x, y, z) = P + t·v en la ecuación del plano y queda <b>una ecuación en t</b>. Si tiene una solución, esa es la posición del corte; si da 0 = 0 (cualquier t sirve), la recta está contenida; si da 0 = k ≠ 0, no hay corte (paralelos).</p>" +
    ejemplo("Sustituir la recta en el plano",
      "Estudia la recta r: x = 1 + 2t, y = −t, z = 3 + t y el plano π: x + y + z = 5.",
      ["v = (2, −1, 1) y n = (1, 1, 1): v·n = 2 − 1 + 1 = 2 ≠ 0 ⟹ <b>secantes</b>.",
       "Sustituyendo: (1 + 2t) + (−t) + (3 + t) = 5 ⟹ 4 + 2t = 5 ⟹ t = 1/2.",
       "Punto de corte: (1 + 1, −1/2, 3 + 1/2) = <b>(2, −1/2, 7/2)</b>. Comprobación: 2 − 1/2 + 7/2 = 5 ✓."]) +
    ejemplo("Tres resultados al sustituir",
      "La recta r: x = 1 + t, y = 2 − t, z = t se estudia con tres planos distintos: π₁: x + y = 3, π₂: x + y = 5, π₃: x + y + z = 4.",
      ["En π₁: (1 + t) + (2 − t) = 3 ⟹ 3 = 3, se cumple para todo t ⟹ <b>r está contenida en π₁</b>.",
       "En π₂: 3 = 5, imposible ⟹ <b>r es paralela a π₂</b> (v·n = 1 − 1 + 0 = 0 y el punto (1, 2, 0) no cumple 3 = 5).",
       "En π₃: 3 + t = 4 ⟹ t = 1 ⟹ <b>secantes</b> en el punto (2, 1, 1)."]) +
    w("esp_planos") +
    "<h5>Dos planos</h5>" +
    "<p>Se comparan los coeficientes: si (A, B, C) y (A′, B′, C′) <b>no son proporcionales</b> ⟹ planos secantes, que se cortan en una recta de director n × n′. Si lo son, se mira también el término independiente: si <b>A/A′ = B/B′ = C/C′ = D/D′</b> son el mismo plano; si D no sigue la proporción, son paralelos.</p>" +
    ejemplo("Recta de intersección de dos planos",
      "Halla la recta que forman π₁: x + 2y − z = 1 y π₂: 2x − y + z = 4.",
      ["Normales (1, 2, −1) y (2, −1, 1): no son proporcionales ⟹ secantes.",
       "Director: n₁ × n₂ = (2·1 − (−1)(−1), (−1)·2 − 1·1, 1·(−1) − 2·2) = <b>(1, −3, −5)</b>.",
       "Un punto: z = 0 ⟹ x + 2y = 1 y 2x − y = 4. De la segunda y = 2x − 4 ⟹ x + 4x − 8 = 1 ⟹ x = 9/5, y = −2/5. Punto (9/5, −2/5, 0).",
       "Paramétricas: x = 9/5 + t, y = −2/5 − 3t, z = −5t. (Con t = 1/5 sale (2, −1, −1): 2 − 2 + 1 = 1 ✓ y 4 + 1 − 1 = 4 ✓.)"]) +
    ojo("Un plano y una recta nunca «se cruzan»: solo pueden ser secantes, paralelos o la recta estar contenida. Cruzarse es cosa de dos rectas.");

  B.parte.m2t5a = { secciones: secciones };
})(window);
