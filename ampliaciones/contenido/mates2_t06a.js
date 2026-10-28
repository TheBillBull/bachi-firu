/* ============================================================
   Matemáticas II · ampliaciones · Tema 6: Problemas métricos
   (parte A: se añade al final de las seis secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Ángulo entre dos rectas
  secciones[0] =
    "<h5>De dónde sale la fórmula y qué vectores usar</h5>" +
    "<p>El ángulo entre dos rectas es el ángulo entre sus <b>vectores directores</b>. Dos vectores forman dos ángulos suplementarios según el sentido que elijas (α y 180° − α); como una recta no tiene sentido, nos quedamos siempre con el <b>agudo</b>, y por eso el producto escalar lleva valor absoluto. El resultado está siempre entre 0° (paralelas) y 90° (perpendiculares).</p>" +
    "<p>Lo primero es sacar bien el vector director, según cómo te den la recta:</p>" +
    "<ul>" +
    "<li><b>Paramétricas o continua</b> x = x₀ + at, … o (x − x₀)/a = …: el director es (a, b, c), los números que multiplican a t o están en los denominadores.</li>" +
    "<li><b>Dos puntos A y B</b>: el director es AB = B − A.</li>" +
    "<li><b>Como intersección de dos planos</b> (forma implícita): el director es el producto vectorial de las normales, v = n₁ × n₂.</li>" +
    "</ul>" +
    ejemplo("Una recta dada como intersección de planos",
      "Calcula el ángulo entre r: (x − 1)/2 = (y + 1)/(−1) = z/2 y s: x + y = 1, y + z = 2.",
      ["Director de r: u = (2, −1, 2), de módulo √(4 + 1 + 4) = 3.",
       "Director de s: producto vectorial de las normales (1, 1, 0) y (0, 1, 1): v = (1·1 − 0·1, 0·0 − 1·1, 1·1 − 1·0) = (1, −1, 1), de módulo √3.",
       "u·v = 2·1 + (−1)(−1) + 2·1 = 5.",
       "cos α = |5| / (3·√3) = 5/(3√3) = 5√3/9 ≈ 0,9623 ⟹ <b>α ≈ 15,79°</b>."]) +
    "<h5>Paralelas y perpendiculares: las dos condiciones que más se preguntan</h5>" +
    "<div class='formula-wrap'><div class='formula'>r ∥ s ⟺ u y v proporcionales (u × v = 0) &nbsp;&nbsp;·&nbsp;&nbsp; r ⟂ s ⟺ u·v = 0</div></div>" +
    ojo("«Perpendiculares» en el espacio quiere decir que los directores son perpendiculares: las rectas pueden cortarse <b>o cruzarse</b> (la x y la y de los ejes, por ejemplo, se cortan; una horizontal y una vertical en habitaciones distintas, no). Para saber si además se cortan hay que estudiar la posición relativa del tema 5.") +
    ejemplo("Un parámetro para que sean perpendiculares",
      "(EvAU) Halla m para que las rectas de directores u = (1, m, 2) y v = (m, −3, 1) sean perpendiculares.",
      ["u·v = 1·m + m·(−3) + 2·1 = m − 3m + 2 = 2 − 2m.",
       "u·v = 0 ⟹ 2 − 2m = 0 ⟹ <b>m = 1</b>.",
       "Comprobación: u = (1, 1, 2), v = (1, −3, 1): 1 − 3 + 2 = 0 ✓."]);

  // ---------------------------------------------------------------- 2. Ángulo recta-plano
  secciones[1] =
    "<h5>Por qué seno y no coseno</h5>" +
    "<p>El vector normal n es perpendicular al plano. Si el ángulo entre la recta y la normal es β, el ángulo entre la recta y el plano es el complementario, α = 90° − β, y como sen α = cos β, basta calcular el coseno con la normal pero <b>llamarlo seno</b>. Es decir: la fórmula es la del producto escalar de siempre, y lo único que cambia es la función que despejas.</p>" +
    "<div class='formula-wrap'><div class='formula'>sen α = |v·n| / (|v|·|n|) &nbsp;⟹&nbsp; α = arcsen( |v·n| / (|v|·|n|) ) &nbsp;&nbsp;(0° ≤ α ≤ 90°)</div></div>" +
    ejemplo("Ángulo entre una recta y un plano",
      "Halla el ángulo que forma la recta r de director v = (1, −2, 2) con el plano π: 2x + 3y + 6z − 1 = 0.",
      ["Normal del plano: n = (2, 3, 6), |n| = √(4 + 9 + 36) = 7. Director: |v| = √(1 + 4 + 4) = 3.",
       "v·n = 1·2 + (−2)·3 + 2·6 = 2 − 6 + 12 = 8.",
       "sen α = 8/(3·7) = 8/21 ≈ 0,3810 ⟹ <b>α ≈ 22,39°</b>.",
       "Si hubieras usado coseno saldría arccos(8/21) ≈ 67,61°: el ángulo con la normal, no con el plano."]) +
    "<h5>Los dos casos extremos</h5>" +
    "<ul>" +
    "<li><b>Recta paralela al plano</b> (o contenida en él): v ⟂ n, es decir, v·n = 0 (sen α = 0, α = 0°). Para distinguir «paralela» de «contenida» se mira si un punto de la recta cumple la ecuación del plano.</li>" +
    "<li><b>Recta perpendicular al plano</b>: v ∥ n (proporcionales), sen α = 1, α = 90°.</li>" +
    "</ul>" +
    ejemplo("Recta paralela a un plano",
      "Halla m para que la recta de director v = (2, m, 1) sea paralela al plano π: 3x + y − z = 2.",
      ["n = (3, 1, −1). Paralela ⟺ v·n = 0.",
       "v·n = 6 + m − 1 = m + 5 = 0 ⟹ <b>m = −5</b>.",
       "Para que además no esté contenida en π habría que comprobar que algún punto de la recta no cumple 3x + y − z = 2."]);

  // ---------------------------------------------------------------- 3. Ángulo entre planos
  secciones[2] =
    "<h5>El ángulo entre planos es el de sus normales</h5>" +
    "<p>Dos planos que se cortan forman cuatro ángulos diedros (dos agudos iguales y dos obtusos iguales); se toma el agudo, y es el mismo que forman sus normales. Con las ecuaciones generales Ax + By + Cz + D = 0 basta leer los coeficientes (A, B, C): el término independiente D no interviene.</p>" +
    ejemplo("Ángulo entre dos planos",
      "Calcula el ángulo entre π₁: x + 2y − 2z = 3 y π₂: 3y + 4z + 5 = 0.",
      ["n₁ = (1, 2, −2), |n₁| = 3. n₂ = (0, 3, 4), |n₂| = 5.",
       "n₁·n₂ = 0 + 6 − 8 = −2.",
       "cos α = |−2|/(3·5) = 2/15 ≈ 0,1333 ⟹ <b>α ≈ 82,34°</b>."]) +
    "<ul>" +
    "<li><b>Paralelos</b> (o coincidentes): n₁ y n₂ proporcionales. Se distinguen comparando también los términos independientes: si (A, B, C, D) son proporcionales los cuatro, son el mismo plano.</li>" +
    "<li><b>Perpendiculares</b>: n₁·n₂ = 0. Es la condición que más aparece al pedir «un plano perpendicular a otro».</li>" +
    "</ul>" +
    ejemplo("Un parámetro para que los planos sean perpendiculares",
      "Halla m para que π₁: mx + 2y − z = 1 y π₂: x + my + 2z = 0 sean perpendiculares.",
      ["n₁ = (m, 2, −1), n₂ = (1, m, 2).",
       "n₁·n₂ = m + 2m − 2 = 3m − 2 = 0 ⟹ <b>m = 2/3</b>."]);

  // ---------------------------------------------------------------- 4. Distancia punto-plano
  secciones[3] =
    "<h5>Por qué funciona la fórmula</h5>" +
    "<p>Si Q es un punto cualquiera del plano, la distancia de P al plano es la longitud de la proyección del vector QP sobre la normal n: d = |QP·n| / |n|. Como Q cumple A·q₁ + B·q₂ + C·q₃ + D = 0, se tiene QP·n = A·p₁ + B·p₂ + C·p₃ − (A·q₁ + B·q₂ + C·q₃) = A·p₁ + B·p₂ + C·p₃ + D, y de ahí sale exactamente la fórmula: <b>sustituyes el punto en el primer miembro y divides por el módulo de la normal</b>. El signo del numerador (antes del valor absoluto) dice en qué lado del plano está P; y vale 0 si P está en el plano.</p>" +
    ejemplo("Distancia de un punto a un plano",
      "Calcula la distancia de P(3, 0, 3) al plano π: 2x − y + 2z − 3 = 0.",
      ["Numerador: 2·3 − 0 + 2·3 − 3 = 9.",
       "Denominador: √(4 + 1 + 4) = 3.",
       "d(P, π) = 9/3 = <b>3</b>."]) +
    ojo("La fórmula exige el plano en forma <b>general</b> Ax + By + Cz + D = 0, con todo en un miembro. Si te lo dan como x + 2y = 5 − z, primero pásalo a x + 2y + z − 5 = 0. Y si te lo dan en paramétricas o por tres puntos, saca antes la normal con un producto vectorial.") +
    "<p>Si el enunciado pide «los puntos de una recta que están a distancia d de un plano», sustituye el punto genérico de la recta (en función de t) en la fórmula, iguala a d y resuelve: sale una ecuación con valor absoluto, es decir, <b>dos soluciones</b> (uno a cada lado del plano).</p>";

  // ---------------------------------------------------------------- 5. Distancia punto-recta
  secciones[4] =
    "<h5>Un ejemplo con la fórmula del producto vectorial</h5>" +
    ejemplo("Distancia de un punto a una recta",
      "Calcula la distancia de P(1, 2, −1) a la recta r: (x, y, z) = (0, 1, 0) + t(1, 1, 2).",
      ["Tomamos Q = (0, 1, 0) y v = (1, 1, 2). QP = P − Q = (1, 1, −1).",
       "QP × v = (1·2 − (−1)·1, (−1)·1 − 1·2, 1·1 − 1·1) = (3, −3, 0).",
       "|QP × v| = √(9 + 9) = 3√2. |v| = √6.",
       "d(P, r) = 3√2/√6 = 3/√3 = <b>√3 ≈ 1,732</b>."]) +
    "<h5>Segundo método: plano perpendicular a la recta</h5>" +
    "<p>Es más largo, pero te da además el <b>pie de la perpendicular</b> (la proyección de P sobre r), que suele pedirse en el mismo problema: (1) plano π por P perpendicular a r (su normal es v); (2) corte F = r ∩ π; (3) d(P, r) = |PF|. Lo desarrollamos con números en la sección de proyecciones.</p>" +
    ojo("Con la fórmula del producto vectorial hay que dividir por |v|, no por |QP|. Y si P está en la recta, QP y v son paralelos, el producto vectorial sale (0, 0, 0) y la distancia es 0: comprobación útil si te sale un número raro.");

  // ---------------------------------------------------------------- 6. Distancia entre rectas que se cruzan
  secciones[5] =
    "<h5>Primero, ¿se cruzan de verdad?</h5>" +
    "<p>La fórmula del producto mixto solo vale para rectas que <b>se cruzan</b>. Antes de usarla conviene saber en cuál de los cuatro casos estás:</p>" +
    tabla(["Caso", "Directores", "[Q₁Q₂, u, v]", "Distancia"], [
          ["Se cruzan", "no proporcionales", "≠ 0", "|[Q₁Q₂, u, v]| / |u × v|"],
          ["Se cortan", "no proporcionales", "= 0", "0"],
          ["Paralelas", "proporcionales", "(u × v = 0)", "d(punto de s, r)"],
          ["Coincidentes", "proporcionales y Q₂ ∈ r", "—", "0"]]) +
    ejemplo("Distancia entre dos rectas que se cruzan",
      "Calcula la distancia entre r: (x, y, z) = (−1, 1, 0) + t(2, 1, 0) y s: (x, y, z) = (2, −1, 1) + s(0, 1, 1).",
      ["Q₁ = (−1, 1, 0), u = (2, 1, 0); Q₂ = (2, −1, 1), v = (0, 1, 1). Q₁Q₂ = (3, −2, 1).",
       "u × v = (1·1 − 0·1, 0·0 − 2·1, 2·1 − 1·0) = (1, −2, 2), |u × v| = 3. No son proporcionales.",
       "[Q₁Q₂, u, v] = Q₁Q₂·(u × v) = 3·1 + (−2)(−2) + 1·2 = 9 ≠ 0 ⟹ se cruzan.",
       "d(r, s) = |9|/3 = <b>3</b>."]) +
    "<p>Una forma de ver la fórmula: el paralelepípedo construido sobre Q₁Q₂, u y v tiene volumen |[Q₁Q₂, u, v]|; su base (u, v) tiene área |u × v|, y su altura —la distancia entre los dos planos paralelos que contienen una recta cada uno— es la distancia entre las rectas. Pruébalo en el interactivo del apartado «perpendicular común».</p>";

  B.parte.m2t6a = { secciones: secciones };
})(window);
