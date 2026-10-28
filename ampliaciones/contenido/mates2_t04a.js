/* ============================================================
   Matemáticas II · ampliaciones · Tema 4: Vectores en el espacio
   (parte A: se añade al final de las cuatro secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t4/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. De 2 a 3 dimensiones
  secciones[0] =
    "<h5>Puntos, vectores y el vector entre dos puntos</h5>" +
    "<p>Un <b>punto</b> A(a₁, a₂, a₃) es una posición en el espacio; un <b>vector</b> u = (u₁, u₂, u₃) es un desplazamiento (módulo, dirección y sentido), sin posición fija. Se relacionan así:</p>" +
    "<div class='formula-wrap'><div class='formula'>AB = B − A = (b₁ − a₁, b₂ − a₂, b₃ − a₃) &nbsp;&nbsp;·&nbsp;&nbsp; punto medio M = (A + B)/2</div></div>" +
    "<p>«Final menos principio»: el vector AB lleva de A a B. Y BA = −AB. La distancia entre A y B es el módulo |AB|.</p>" +
    ejemplo("Vector, distancia y punto medio",
      "Sean A(1, 2, −1) y B(4, 0, 3). Calcula AB, la distancia entre A y B y el punto medio del segmento.",
      ["AB = B − A = (4 − 1, 0 − 2, 3 − (−1)) = <b>(3, −2, 4)</b>.",
       "|AB| = √(3² + (−2)² + 4²) = √(9 + 4 + 16) = <b>√29 ≈ 5,39</b>.",
       "M = (A + B)/2 = (5/2, 2/2, 2/2) = <b>(5/2, 1, 1)</b>."]) +
    "<h5>Vector unitario y vector de módulo dado</h5>" +
    "<p>Dividir un vector por su módulo da otro de la <b>misma dirección y sentido</b> y de módulo 1 (vector <i>unitario</i> o normalizado): û = u/|u|. Para fabricar un vector de módulo k en esa dirección, multiplicas el unitario por k. Si multiplicas por un número negativo, el sentido se invierte, y recuerda que |λu| = |λ|·|u| (el módulo nunca es negativo).</p>" +
    ejemplo("Normalizar y escalar",
      "Halla el vector unitario en la dirección de u = (2, −3, 6) y un vector de módulo 14 con la misma dirección y sentido contrario.",
      ["|u| = √(4 + 9 + 36) = √49 = 7.",
       "Unitario: û = u/7 = <b>(2/7, −3/7, 6/7)</b>.",
       "Módulo 14 y sentido contrario: −14·û = −2u = <b>(−4, 6, −12)</b>. Comprobación: |(−4, 6, −12)| = √(16 + 36 + 144) = √196 = 14 ✓."]) +
    "<h5>Los tres usos más frecuentes de «AB = B − A»</h5>" +
    "<ul>" +
    "<li><b>Tres puntos alineados</b> ⟺ AB y AC son proporcionales (una de las dos es múltiplo de la otra).</li>" +
    "<li><b>Cuarto vértice de un paralelogramo</b> ABCD (en ese orden): los lados opuestos son iguales, AB = DC, luego D = A + C − B.</li>" +
    "<li><b>Punto simétrico</b> de A respecto de M: A′ = 2M − A.</li>" +
    "</ul>" +
    ejemplo("Cuarto vértice de un paralelogramo",
      "Tres vértices consecutivos de un paralelogramo son A(1, 0, 2), B(3, 1, 1) y C(4, 3, 0). Halla el cuarto vértice D.",
      ["En ABCD los lados opuestos cumplen AB = DC, es decir, B − A = C − D.",
       "Despejando: D = A + C − B = (1 + 4 − 3, 0 + 3 − 1, 2 + 0 − 1) = <b>(2, 2, 1)</b>.",
       "Comprobación: AB = (2, 1, −1) y DC = C − D = (4 − 2, 3 − 2, 0 − 1) = (2, 1, −1) ✓."]) +
    ejemplo("¿Están alineados?",
      "Comprueba si A(1, 2, 3), B(2, 4, 5) y C(4, 8, 9) están alineados.",
      ["AB = (1, 2, 2) y AC = (3, 6, 6).",
       "AC = 3·AB: son proporcionales, luego los tres puntos están en una misma recta (y B está entre A y C, a un tercio del camino)."]) +
    ojo("Un vector y un punto se escriben igual, (x, y, z), pero no son lo mismo: se pueden sumar vectores, y se puede sumar un vector a un punto (el resultado es un punto), pero «sumar dos puntos» no tiene sentido geométrico; solo se hace para el punto medio, que es una media.");

  // ---------------------------------------------------------------- 2. Producto escalar
  secciones[1] =
    "<h5>Dos fórmulas, un mismo número</h5>" +
    "<div class='formula-wrap'><div class='formula'>u·v = u₁v₁ + u₂v₂ + u₃v₃ = |u|·|v|·cos α</div></div>" +
    "<p>La primera sirve cuando tienes las <b>componentes</b>; la segunda, cuando tienes <b>módulos y ángulo</b>. Igualándolas sale la fórmula del ángulo. El producto escalar es conmutativo, distributivo respecto de la suma y cumple (λu)·v = λ(u·v). Además u·u = |u|², que es la forma más rápida de calcular un módulo al cuadrado.</p>" +
    tabla(["Signo de u·v", "Ángulo α", "Significado"], [
      ["u·v &gt; 0", "agudo (0° ≤ α &lt; 90°)", "apuntan «más o menos hacia el mismo lado»"],
      ["u·v = 0", "α = 90°", "<b>perpendiculares</b> (ortogonales); vale también si uno es el vector nulo"],
      ["u·v &lt; 0", "obtuso (90° &lt; α ≤ 180°)", "apuntan «más o menos hacia lados opuestos»"]
    ]) +
    ejemplo("Ángulo entre dos vectores",
      "Calcula el ángulo que forman u = (2, −1, 2) y v = (1, 2, −2).",
      ["u·v = 2·1 + (−1)·2 + 2·(−2) = 2 − 2 − 4 = −4.",
       "|u| = √(4 + 1 + 4) = 3 y |v| = √(1 + 4 + 4) = 3.",
       "cos α = −4/(3·3) = −4/9 ≈ −0,444 ⟹ α = arccos(−4/9) ≈ <b>116,39°</b> (obtuso, como anunciaba el signo negativo)."]) +
    ejemplo("La diagonal del cubo",
      "En un cubo de arista 1, calcula el ángulo entre dos diagonales que parten de vértices distintos: (1, 1, 1) y (1, 1, −1).",
      ["Producto escalar: 1 + 1 − 1 = 1. Los dos módulos son √3.",
       "cos α = 1/(√3·√3) = 1/3 ⟹ α = arccos(1/3) ≈ <b>70,53°</b>."]) +
    "<h5>Proyección ortogonal</h5>" +
    "<p>Si dejas caer una «sombra» perpendicular del vector u sobre la recta de v, obtienes la <b>proyección de u sobre v</b>. Su longitud con signo y el vector proyección son:</p>" +
    "<div class='formula-wrap'><div class='formula'>proy<sub>v</sub>u (escalar) = (u·v)/|v| &nbsp;&nbsp;·&nbsp;&nbsp; proy<sub>v</sub>u (vector) = ((u·v)/|v|²)·v</div></div>" +
    "<p>El vector proyección es paralelo a v; el resto, u − proy, es perpendicular a v. En la vista 3D de abajo es el segmento verde, y el discontinuo es la perpendicular.</p>" +
    ejemplo("Proyección de u sobre v",
      "Calcula la proyección ortogonal de u = (3, 4, 0) sobre v = (1, 2, 2).",
      ["u·v = 3 + 8 + 0 = 11 y |v|² = 1 + 4 + 4 = 9, |v| = 3.",
       "Longitud con signo: 11/3 ≈ 3,67.",
       "Vector proyección: (11/9)·(1, 2, 2) = <b>(11/9, 22/9, 22/9)</b>.",
       "Comprobación: u − proy = (16/9, 14/9, −22/9) y su producto escalar con v es (16 + 28 − 44)/9 = 0 ✓."]) +
    w("vec_3d", "escalar") +
    ojo("Para decidir si dos vectores son perpendiculares <b>no hace falta el ángulo</b>: basta u·v = 0. Es la condición que más aparece con parámetros (véase la sección 7).");

  // ---------------------------------------------------------------- 3. Producto vectorial
  secciones[2] =
    "<h5>Cómo se calcula sin aprenderse nada de memoria</h5>" +
    "<p>La fórmula por componentes se recuerda mejor como un <b>determinante simbólico</b>, que se desarrolla por la primera fila:</p>" +
    "<div class='formula-wrap'><div class='formula'>u × v = | i&nbsp; j&nbsp; k ; u₁&nbsp; u₂&nbsp; u₃ ; v₁&nbsp; v₂&nbsp; v₃ | = (u₂v₃ − u₃v₂)·i − (u₁v₃ − u₃v₁)·j + (u₁v₂ − u₂v₁)·k</div></div>" +
    "<p>Fíjate en el signo menos de la componente j (el «tablero de ajedrez» del Tema 2). Con i = (1, 0, 0), j = (0, 1, 0), k = (0, 0, 1) se cumple i × j = k, j × k = i y k × i = j.</p>" +
    "<h5>Qué es u × v: dirección, sentido y módulo</h5>" +
    "<ul>" +
    "<li><b>Dirección</b>: perpendicular a u y a v a la vez, es decir, perpendicular al plano que forman. Por eso (u × v)·u = 0 y (u × v)·v = 0: es una forma estupenda de <b>comprobar</b> el resultado.</li>" +
    "<li><b>Sentido</b>: regla de la mano derecha. Curva los dedos de la mano derecha de u hacia v (por el ángulo menor): el pulgar apunta en el sentido de u × v. Si cambias el orden, el sentido se invierte: v × u = −(u × v).</li>" +
    "<li><b>Módulo</b>: |u × v| = |u|·|v|·sen α, el <b>área del paralelogramo</b> de lados u y v.</li>" +
    "</ul>" +
    tabla(["Propiedad", "Fórmula"], [
      ["Anticonmutativa", "v × u = −(u × v)"],
      ["Con un escalar", "(λu) × v = λ(u × v)"],
      ["Distributiva", "u × (v + w) = u × v + u × w"],
      ["Un vector consigo mismo", "u × u = 0"],
      ["Paralelismo", "u × v = 0 ⟺ u y v son paralelos (proporcionales)"],
      ["Identidad de Lagrange", "|u × v|² = |u|²|v|² − (u·v)²"]
    ]) +
    ejemplo("Producto vectorial y comprobación",
      "Calcula u × v para u = (1, 2, 3) y v = (4, −1, 2), y comprueba que es perpendicular a ambos.",
      ["Componente i: 2·2 − 3·(−1) = 4 + 3 = 7.",
       "Componente j: 3·4 − 1·2 = 12 − 2 = 10 (ya con el signo menos aplicado: −(1·2 − 3·4) = 10).",
       "Componente k: 1·(−1) − 2·4 = −1 − 8 = −9. Resultado: <b>u × v = (7, 10, −9)</b>.",
       "Comprobación: u·(u × v) = 7 + 20 − 27 = 0 ✓ y v·(u × v) = 28 − 10 − 18 = 0 ✓.",
       "Módulo (área del paralelogramo): |u × v| = √(49 + 100 + 81) = <b>√230 ≈ 15,17</b>. Con Lagrange: |u|²|v|² − (u·v)² = 14·21 − 8² = 294 − 64 = 230 ✓."]) +
    "<h5>Área de un triángulo y vector perpendicular a un plano</h5>" +
    "<p>Para un triángulo ABC, toma dos lados que salgan del mismo vértice: <b>área = ½·|AB × AC|</b>. Y el mismo producto AB × AC es un vector <b>perpendicular al plano</b> que contiene a A, B y C (lo usarás en el Tema 5 como vector normal del plano).</p>" +
    ejemplo("Área y vector unitario perpendicular",
      "Sean A(1, 0, 1), B(2, 2, 0) y C(0, 1, 3). Calcula el área del triángulo ABC y un vector unitario perpendicular al plano que contiene al triángulo.",
      ["AB = (1, 2, −1) y AC = (−1, 1, 2).",
       "AB × AC = (2·2 − (−1)·1, −(1·2 − (−1)(−1)), 1·1 − 2·(−1)) = (5, −1, 3).",
       "|AB × AC| = √(25 + 1 + 9) = √35. Área = ½·√35 ≈ <b>2,96</b>.",
       "Vector unitario perpendicular al plano: (5, −1, 3)/√35 ≈ <b>(0,845; −0,169; 0,507)</b> (y su opuesto)."]) +
    ejemplo("Altura de un triángulo",
      "En el triángulo anterior, halla la altura desde C sobre el lado AB.",
      ["Área = ½·base·altura ⟹ altura = 2·Área/|AB|.",
       "|AB| = √(1 + 4 + 1) = √6, y 2·Área = √35.",
       "Altura = √35/√6 = √(35/6) ≈ <b>2,42</b>."]) +
    w("vec_3d", "vectorial") +
    ojo("El producto vectorial <b>solo existe en el espacio</b> (tres dimensiones) y su resultado es un <b>vector</b>; el escalar da un <b>número</b>. Si te piden «el área», es el módulo de u × v, no el vector.");

  // ---------------------------------------------------------------- 4. Producto mixto
  secciones[3] =
    "<h5>Propiedades útiles del producto mixto</h5>" +
    "<p>[u, v, w] = u·(v × w) = det de la matriz con filas u, v, w. Heredas todas las propiedades de los determinantes:</p>" +
    "<ul>" +
    "<li><b>Permutar dos vectores</b> cambia el signo: [v, u, w] = −[u, v, w]. Una permutación cíclica no lo cambia: [u, v, w] = [v, w, u] = [w, u, v].</li>" +
    "<li>Es lineal en cada vector, y si uno es combinación lineal de los otros dos, vale 0.</li>" +
    "<li><b>[u, v, w] = 0 ⟺ u, v, w son coplanarios</b> (están en un mismo plano) ⟺ son linealmente dependientes.</li>" +
    "<li>El <b>signo</b> es la orientación: positivo si u, v, w siguen la regla de la mano derecha (como i, j, k).</li>" +
    "</ul>" +
    "<p>Geométricamente, el volumen del paralelepípedo es «área de la base × altura»: la base es el paralelogramo de u y v, de área |u × v|, y la altura es la proyección de w sobre u × v. De ahí, |[u, v, w]| = |u × v|·h.</p>" +
    "<h5>Los dos usos típicos de la EvAU</h5>" +
    "<p><b>1. Volumen de un tetraedro con cuatro vértices.</b> Fija un vértice como origen y usa las tres aristas que salen de él: V = (1/6)·|[AB, AC, AD]|. La altura desde D sobre la cara ABC sale de V = (1/3)·Área(ABC)·h, es decir, h = 3V / Área(ABC).</p>" +
    ejemplo("Volumen y altura de un tetraedro",
      "Halla el volumen del tetraedro de vértices A(1, 0, 0), B(0, 2, 0), C(0, 0, 3) y D(1, 1, 1) y la altura desde D sobre la cara ABC.",
      ["AB = (−1, 2, 0), AC = (−1, 0, 3), AD = (0, 1, 1).",
       "[AB, AC, AD] = |−1 2 0 ; −1 0 3 ; 0 1 1| = −1·(0·1 − 3·1) − 2·(−1·1 − 3·0) + 0 = 3 + 2 = 5.",
       "Volumen = |5|/6 = <b>5/6 ≈ 0,833</b>.",
       "AB × AC = (2·3 − 0·0, −((−1)·3 − 0·(−1)), (−1)·0 − 2·(−1)) = (6, 3, 2), de módulo √(36 + 9 + 4) = 7. Área(ABC) = 7/2.",
       "Altura: h = 3V/Área = 3·(5/6)/(7/2) = (5/2)/(7/2) = <b>5/7 ≈ 0,714</b>."]) +
    "<p><b>2. Cuatro puntos coplanarios.</b> A, B, C, D están en el mismo plano si y solo si AB, AC y AD son coplanarios: [AB, AC, AD] = 0. Con un parámetro, es una ecuación en m.</p>" +
    ejemplo("¿Para qué valor de m son coplanarios?",
      "Halla m para que A(1, 1, 1), B(2, 3, 4), C(0, 1, 2) y D(3, 5, m) estén en un mismo plano.",
      ["AB = (1, 2, 3), AC = (−1, 0, 1), AD = (2, 4, m − 1).",
       "[AB, AC, AD] = |1 2 3 ; −1 0 1 ; 2 4 m−1| = 1·(0 − 4) − 2·(−(m − 1) − 2) + 3·(−4 − 0) = −4 + 2m + 2 − 12 = 2m − 14.",
       "2m − 14 = 0 ⟹ <b>m = 7</b>."]) +
    w("vec_3d", "mixto") +
    ojo("El volumen y el área son siempre positivos: lleva <b>valor absoluto</b>. El producto mixto sin valor absoluto puede ser negativo, y entonces solo informa de la orientación. Y no olvides el factor 1/6 del tetraedro (frente a 1 del paralelepípedo).");

  B.parte.m2t4a = { secciones: secciones };
})(window);
