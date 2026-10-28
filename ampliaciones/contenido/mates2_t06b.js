/* ============================================================
   Matemáticas II · ampliaciones · Tema 6: Problemas métricos
   (parte B: secciones nuevas 7 a 15)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t6/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Proyecciones ortogonales y puntos simétricos",
      html:
        "<p>Un tipo de problema muy repetido en la EvAU es: «halla la proyección ortogonal del punto P sobre el plano (o la recta) y el punto simétrico de P». Los dos puntos se calculan juntos: la <b>proyección P′</b> es el pie de la perpendicular desde P, y el <b>simétrico P″</b> está al otro lado a la misma distancia, de modo que P′ es el punto medio de PP″ y por tanto <b>P″ = 2P′ − P</b>.</p>" +
        "<h5>Sobre un plano</h5>" +
        "<p>El método más rápido usa que la perpendicular desde P a π tiene como dirección la normal n. Con el numerador de la fórmula de distancia, v = A·p₁ + B·p₂ + C·p₃ + D:</p>" +
        "<div class='formula-wrap'><div class='formula'>P′ = P − (v / |n|²)·n &nbsp;&nbsp;·&nbsp;&nbsp; P″ = P − (2v / |n|²)·n</div></div>" +
        ejemplo("Proyección y simétrico de un punto sobre un plano",
          "Halla la proyección ortogonal y el simétrico de P(3, −1, 2) respecto del plano π: x + 2y − 2z − 6 = 0.",
          ["n = (1, 2, −2), |n|² = 9. Valor en P: v = 3 − 2 − 4 − 6 = −9.",
           "P′ = P − (−9/9)·n = P + n = <b>(4, 1, 0)</b>. Comprobación: 4 + 2 − 0 − 6 = 0, está en el plano ✓.",
           "P″ = P + 2n = <b>(5, 3, −2)</b> (o 2P′ − P = (8 − 3, 2 + 1, 0 − 2)).",
           "Distancia: |PP′| = |n| = 3 (también |−9|/3 = 3 ✓)."]) +
        "<p>Si prefieres el método «de manual», es el mismo: recta r por P con dirección n, P′ = r ∩ π, P″ = 2P′ − P. Pruébalo con el interactivo: mueve P y comprueba que el segmento P–P″ (discontinuo) siempre es paralelo a la normal.</p>" +
        w("met_3d", "plano") +
        "<h5>Sobre una recta</h5>" +
        "<p>Aquí la perpendicular desde P a r no tiene una dirección conocida de antemano, así que se hace al revés: se construye el <b>plano por P perpendicular a r</b> (su normal es el director v) y se corta con r.</p>" +
        ejemplo("Proyección y simétrico de un punto sobre una recta",
          "Halla la proyección ortogonal de P(2, 1, 2) sobre r: (x, y, z) = (0, 1, 0) + t(1, 1, 2), el simétrico de P respecto de r y la distancia de P a r.",
          ["Plano por P perpendicular a r: x + y + 2z + D = 0 con 2 + 1 + 4 + D = 0 ⟹ D = −7: π: x + y + 2z = 7.",
           "Punto genérico de r: (t, 1 + t, 2t). En π: t + 1 + t + 4t = 7 ⟹ 6t = 6 ⟹ t = 1.",
           "Proyección: P′ = F = <b>(1, 2, 2)</b>.",
           "Simétrico: P″ = 2F − P = (2 − 2, 4 − 1, 4 − 2) = <b>(0, 3, 2)</b>.",
           "Distancia: |PF| = |(−1, 1, 0)| = <b>√2</b>. (Con la fórmula: QP = (2, 0, 2), QP × v = (−2, −2, 2), |QP × v| = 2√3, y 2√3/√6 = √2 ✓.)"]) +
        w("met_3d", "recta") +
        "<h5>Respecto de otro punto, y la proyección de una recta sobre un plano</h5>" +
        "<p>El simétrico de A respecto de un <b>punto</b> M es A′ = 2M − A (M es el punto medio). Para la <b>proyección de una recta sobre un plano</b> hay dos caminos: proyectar dos puntos de la recta, o —más corto— cortar el plano dado con el plano que contiene a la recta y es perpendicular a π (sus vectores son el director v de la recta y la normal n, luego su normal es v × n).</p>" +
        ejemplo("Proyección de una recta sobre un plano",
          "Halla la proyección ortogonal de r: (x, y, z) = (1, 0, 0) + t(1, 1, 0) sobre el plano π: x + y + z = 0.",
          ["Normal de π: n = (1, 1, 1). Plano que contiene a r y es perpendicular a π: normal v × n = (1, 1, 0) × (1, 1, 1) = (1·1 − 0·1, 0·1 − 1·1, 1·1 − 1·1) = (1, −1, 0).",
           "Pasa por (1, 0, 0): x − y = 1.",
           "La proyección es la intersección de los dos planos: <b>x − y = 1, x + y + z = 0</b>.",
           "Comprobación: proyectamos el punto (1, 0, 0): (1, 0, 0) − (1/3)(1, 1, 1) = (2/3, −1/3, −1/3), que cumple x − y = 1 ✓."]) +
        ojo("El simétrico <b>no</b> es el opuesto. P″ = −P solo sirve si el centro de simetría es el origen. Y en una simetría respecto de un plano o una recta no cambian «signos de coordenadas» salvo en casos muy particulares (plano z = 0: solo cambia z)."),
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Perpendicular común a dos rectas que se cruzan",
      html:
        "<p>Dos rectas que se cruzan tienen una única recta que las corta a las dos y es perpendicular a ambas: la <b>perpendicular común</b>. El segmento que une los dos puntos de corte (los «pies» A ∈ r y B ∈ s) mide justo la distancia entre las rectas. Hay dos métodos; ambos salen en la EvAU.</p>" +
        "<h5>Método 1: puntos genéricos (el más directo)</h5>" +
        "<p>Escribe un punto genérico de cada recta, X(t) y Y(s); impón que el vector XY sea perpendicular a u y a v (dos ecuaciones lineales) y resuelve t y s.</p>" +
        ejemplo("Pies de la perpendicular común",
          "Con r: (−1, 1, 0) + t(2, 1, 0) y s: (2, −1, 1) + s(0, 1, 1), halla los pies de la perpendicular común y su ecuación.",
          ["X = (−1 + 2t, 1 + t, 0), Y = (2, −1 + s, 1 + s). XY = Y − X = (3 − 2t, −2 + s − t, 1 + s).",
           "XY·u = 0: 2(3 − 2t) + (−2 + s − t) = 4 − 5t + s = 0.",
           "XY·v = 0: (−2 + s − t) + (1 + s) = −1 − t + 2s = 0.",
           "De la segunda, s = (1 + t)/2; en la primera: 4 − 5t + (1 + t)/2 = 0 ⟹ 8 − 10t + 1 + t = 0 ⟹ t = 1, s = 1.",
           "Pies: A = X(1) = <b>(1, 2, 0)</b> y B = Y(1) = <b>(2, 0, 2)</b>. AB = (1, −2, 2) ⟹ |AB| = 3 = d(r, s) ✓ (coincide con el producto mixto).",
           "Perpendicular común: la recta por A con dirección AB: <b>(x, y, z) = (1, 2, 0) + λ(1, −2, 2)</b>."]) +
        w("met_3d", "cruz") +
        "<h5>Método 2: intersección de dos planos</h5>" +
        "<p>La perpendicular común tiene la dirección w = u × v. Está contenida en el plano π₁ que contiene a r y a la dirección w, y también en el plano π₂ que contiene a s y a w. Así que la perpendicular común es π₁ ∩ π₂. Es el método de la EvAU cuando te piden la recta en forma implícita.</p>" +
        ejemplo("La misma recta por intersección de planos",
          "Con las mismas rectas, w = u × v = (1, −2, 2). Halla π₁ ⊃ r y π₂ ⊃ s, ambos con dirección w.",
          ["π₁ contiene a Q₁ = (−1, 1, 0) y a los vectores u = (2, 1, 0), w = (1, −2, 2). Normal: u × w = (1·2 − 0·(−2), 0·1 − 2·2, 2·(−2) − 1·1) = (2, −4, −5).",
           "π₁: 2(x + 1) − 4(y − 1) − 5z = 0 ⟹ <b>2x − 4y − 5z + 6 = 0</b>.",
           "π₂ contiene a Q₂ = (2, −1, 1) y a v = (0, 1, 1), w = (1, −2, 2). Normal: v × w = (1·2 − 1·(−2), 1·1 − 0·2, 0·(−2) − 1·1) = (4, 1, −1).",
           "π₂: 4(x − 2) + (y + 1) − (z − 1) = 0 ⟹ <b>4x + y − z − 6 = 0</b>.",
           "Perpendicular común: <b>2x − 4y − 5z + 6 = 0, 4x + y − z − 6 = 0</b>. Comprobación: A(1, 2, 0): 2 − 8 + 6 = 0 y 4 + 2 − 6 = 0 ✓; B(2, 0, 2): 4 − 10 + 6 = 0 y 8 − 2 − 6 = 0 ✓."]) +
        "<p>Y una consecuencia útil: la <b>distancia entre rectas que se cruzan</b> es también la distancia entre los dos planos paralelos que las contienen (los dos planos con normal u × v), o la distancia de un punto de s al plano que contiene a r y es paralelo a s.</p>" +
        ojo("Si el producto mixto [Q₁Q₂, u, v] sale 0, las rectas son coplanarias: se cortan (o son paralelas) y no existe «perpendicular común única». Mira antes la tabla de la sección 6."),
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Distancias entre elementos paralelos",
      html:
        "<p>Cuando dos elementos son paralelos, la distancia es la misma en cualquier punto, así que todo se reduce a <b>elegir un punto de uno y usar la fórmula de punto–plano o punto–recta</b>.</p>" +
        tabla(["Elementos", "Condición", "Cómo se calcula"], [
          ["Plano y plano", "n₁ ∥ n₂", "d(π₁, π₂) = d(P, π₂) con P ∈ π₁. Si tienen la misma normal (A, B, C): |D − D′|/√(A² + B² + C²)"],
          ["Recta y plano", "v·n = 0 y recta fuera del plano", "d(r, π) = d(P, π) con P ∈ r"],
          ["Recta y recta", "u ∥ v", "d(r, s) = d(Q₂, r) con Q₂ ∈ s"]]) +
        ejemplo("Distancia entre dos planos paralelos",
          "Calcula la distancia entre π₁: 2x − y + 2z − 3 = 0 y π₂: 4x − 2y + 4z + 12 = 0.",
          ["Normales (2, −1, 2) y (4, −2, 4): proporcionales, son paralelos.",
           "Primero se igualan los coeficientes: π₂ ÷ 2: 2x − y + 2z + 6 = 0.",
           "d = |6 − (−3)| / √(4 + 1 + 4) = 9/3 = <b>3</b>.",
           "Otra forma: un punto de π₁ es (0, 0, 3/2) (cumple 3 − 3 = 0); d = |4·0 − 0 + 4·(3/2) + 12|/√(16 + 4 + 16) = 18/6 = 3 ✓."]) +
        ojo("Restar los términos independientes (−3 y 12 sin más) solo vale si las <b>ecuaciones tienen exactamente los mismos A, B, C</b>. Si no, divide antes. Aquí 12 − (−3) = 15 daría 5, que es falso.") +
        ejemplo("Distancia de una recta a un plano paralelo",
          "Comprueba que r: (1, 1, 1) + t(1, 1, −2) es paralela a π: x + y + z − 9 = 0 y calcula la distancia.",
          ["v·n = (1, 1, −2)·(1, 1, 1) = 1 + 1 − 2 = 0: son paralelos (el punto (1, 1, 1) da 3 − 9 ≠ 0, no está contenida).",
           "d(r, π) = d((1, 1, 1), π) = |1 + 1 + 1 − 9| / √3 = 6/√3 = <b>2√3 ≈ 3,464</b>."]) +
        ejemplo("Distancia entre dos rectas paralelas",
          "Calcula la distancia entre r: (1, 0, 2) + t(1, 2, 2) y s: (3, 1, 0) + t(1, 2, 2).",
          ["Mismo director v = (1, 2, 2) ⟹ paralelas. Tomamos Q₁ = (1, 0, 2) ∈ r y Q₂ = (3, 1, 0) ∈ s: Q₁Q₂ = (2, 1, −2).",
           "Q₁Q₂ × v = (1·2 − (−2)·2, (−2)·1 − 2·2, 2·2 − 1·1) = (6, −6, 3), de módulo √(36 + 36 + 9) = 9. |v| = 3.",
           "d(r, s) = 9/3 = <b>3</b>."]),
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Áreas y volúmenes en el espacio",
      html:
        "<p>Aquí se juntan el tema 4 (productos vectorial y mixto) con las distancias de este tema. Las alturas se obtienen despejando de las fórmulas de área y de volumen, o con una distancia punto–plano/punto–recta; ambos caminos deben dar lo mismo, y es una buena comprobación.</p>" +
        "<div class='formula-wrap'><div class='formula'>Área(ABC) = ½|AB × AC| &nbsp;&nbsp;·&nbsp;&nbsp; V(ABCD) = ⅙|[AB, AC, AD]| &nbsp;&nbsp;·&nbsp;&nbsp; h<sub>D</sub> = 3V / Área(ABC)</div></div>" +
        ejemplo("Un tetraedro completo",
          "Sean A(1, 0, 0), B(3, 0, 1), C(1, 2, 2) y D(2, 1, 5). Calcula: el área de ABC, el volumen de ABCD, la altura desde D, la ecuación del plano ABC y el ángulo que forma la arista AD con ese plano.",
          ["AB = (2, 0, 1), AC = (0, 2, 2), AD = (1, 1, 5).",
           "AB × AC = (0·2 − 1·2, 1·0 − 2·2, 2·2 − 0) = (−2, −4, 4), módulo √36 = 6 ⟹ Área(ABC) = 6/2 = <b>3</b>.",
           "[AB, AC, AD] = (−2, −4, 4)·(1, 1, 5) = −2 − 4 + 20 = 14 ⟹ V = 14/6 = <b>7/3</b>.",
           "Altura desde D: h = 3V/Área = 7/3 · 3 / 3 = <b>7/3</b>.",
           "Plano ABC: normal (−2, −4, 4) ∥ (1, 2, −2); por A(1, 0, 0): x + 2y − 2z − 1 = 0. Comprobación de h: D da 2 + 2 − 10 − 1 = −7, y |−7|/3 = 7/3 ✓.",
           "Ángulo de AD con el plano: sen α = |AD·n| / (|AD||n|) = |1 + 2 − 10| / (√27·3) = 7/(9√3) = 7√3/27 ≈ 0,4490 ⟹ <b>α ≈ 26,68°</b>."]) +
        "<p>Para <b>pirámides</b> de base un paralelogramo o un triángulo vale V = ⅓·(área de la base)·h, con h = distancia del vértice al plano de la base. Y si un vértice depende de un parámetro, el volumen es |polinomio en m|/6: dos casos por el valor absoluto.</p>" +
        ojo("Área del triángulo = ½|AB × AC|, y volumen del tetraedro = ⅙|[…]|: son los dos factores que más se olvidan. Comprueba siempre que el resultado es positivo (valor absoluto) y que la altura de un tetraedro nunca es mayor que sus aristas."),
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Lugares geométricos sencillos",
      html:
        "<p>Un lugar geométrico es el conjunto de puntos que cumplen una condición de distancias o ángulos. En 2.º de Bachillerato solo aparecen tres, y los tres acaban en un plano.</p>" +
        "<h5>Plano mediador de dos puntos A y B</h5>" +
        "<p>Es el conjunto de puntos X con d(X, A) = d(X, B): pasa por el punto medio M de AB y es perpendicular a AB. Su normal es AB: <b>AB·(X − M) = 0</b>. (También sale elevando al cuadrado |XA|² = |XB|².)</p>" +
        ejemplo("Plano mediador",
          "Halla el plano mediador de A(1, 2, 3) y B(3, 0, 1).",
          ["AB = (2, −2, −2) ∥ (1, −1, −1). Punto medio M = (2, 1, 2).",
           "(x − 2) − (y − 1) − (z − 2) = 0 ⟹ <b>x − y − z + 1 = 0</b>.",
           "Comprobación con las distancias: (x − 1)² + (y − 2)² + (z − 3)² = (x − 3)² + y² + (z − 1)² ⟹ −2x − 4y − 6z + 14 = −6x − 2z + 10 ⟹ 4x − 4y − 4z + 4 = 0 ✓."]) +
        "<h5>Planos a distancia d de un plano dado</h5>" +
        "<p>Son los dos planos paralelos a π: Ax + By + Cz + D = 0 situados a cada lado: <b>Ax + By + Cz + D ± d·√(A² + B² + C²) = 0</b>.</p>" +
        ejemplo("Planos paralelos a distancia dada",
          "Halla los planos paralelos a π: 2x − y + 2z − 1 = 0 que distan 2 unidades de él.",
          ["√(A² + B² + C²) = 3, luego el término independiente cambia en 2·3 = 6.",
           "Nuevos planos: 2x − y + 2z − 1 ± 6 = 0 ⟹ <b>2x − y + 2z + 5 = 0</b> y <b>2x − y + 2z − 7 = 0</b>.",
           "Comprobación: un punto del primero, (0, 0, −5/2), cumple −5 + 5 = 0, y d a π = |−5 − 1|/3 = 2 ✓."]) +
        "<h5>Planos bisectores de dos planos</h5>" +
        "<p>Los puntos X equidistantes de π₁ y π₂ cumplen |π₁(X)|/|n₁| = |π₂(X)|/|n₂|: salen <b>dos</b> planos bisectores (uno por cada signo), perpendiculares entre sí. Si los planos son paralelos, solo hay uno (el plano medio).</p>" +
        ejemplo("Bisectores",
          "Halla los planos bisectores de π₁: x + 2y + 2z − 3 = 0 y π₂: 2x − 2y + z + 3 = 0.",
          ["|n₁| = 3 y |n₂| = 3, así que basta igualar: x + 2y + 2z − 3 = ±(2x − 2y + z + 3).",
           "Signo +: x + 2y + 2z − 3 = 2x − 2y + z + 3 ⟹ <b>−x + 4y + z − 6 = 0</b>.",
           "Signo −: x + 2y + 2z − 3 = −2x + 2y − z − 3 ⟹ 3x + 3z = 0 ⟹ <b>x + z = 0</b>.",
           "Son perpendiculares: (−1, 4, 1)·(1, 0, 1) = 0 ✓."]) +
        ojo("Si los módulos de las normales son distintos, divide cada ecuación por su |n| antes de igualar (π₁/|n₁| = ±π₂/|n₂|), o el bisector no será equidistante."),
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. ¿Qué fórmula uso? Mapa de decisión y calculadora",
      html:
        "<p>Casi todos los fallos de este tema son de elección de fórmula. Fíjate en <b>qué dos objetos te dan</b> y mira esta tabla:</p>" +
        tabla(["Objetos", "Datos que necesitas", "Resultado"], [
          ["Recta – recta (ángulo)", "u, v", "cos α = |u·v|/(|u||v|)"],
          ["Recta – plano (ángulo)", "v, n", "sen α = |v·n|/(|v||n|)"],
          ["Plano – plano (ángulo)", "n₁, n₂", "cos α = |n₁·n₂|/(|n₁||n₂|)"],
          ["Punto – plano", "P y A, B, C, D", "|valor|/|n|"],
          ["Punto – recta", "P, Q, v", "|QP × v|/|v|"],
          ["Recta – recta (distancia)", "Q₁, u, Q₂, v", "cruzan: |[Q₁Q₂, u, v]|/|u × v|; paralelas: punto–recta"],
          ["Recta – plano / plano – plano", "solo si son paralelos", "un punto del primero al segundo"]]) +
        "<p>Y el orden que conviene seguir: (1) escribe los datos (puntos, directores, normales); (2) decide si hay que mirar paralelismo o posición relativa antes; (3) aplica la fórmula con todos los pasos; (4) comprueba con otro camino si el problema es largo (por ejemplo, una distancia con la proyección). La calculadora hace los seis cálculos paso a paso: úsala para <b>comprobar tus ejercicios</b>, no para sustituir el razonamiento.</p>" +
        w("met_calc"),
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. Problemas tipo EvAU resueltos",
      html:
        ejemplo("Problema 1: punto y plano",
          "Sea π: 2x − y + 2z − 3 = 0 y P(3, 0, 3). (a) Distancia de P a π. (b) Proyección ortogonal de P sobre π. (c) Simétrico de P respecto de π. (d) Ángulo que forma la recta OP (O es el origen) con π.",
          ["(a) v = 6 − 0 + 6 − 3 = 9; |n| = 3. d = 9/3 = <b>3</b>.",
           "(b) P′ = P − (9/9)·n = (3, 0, 3) − (2, −1, 2) = <b>(1, 1, 1)</b>. Comprobación: 2 − 1 + 2 − 3 = 0 ✓.",
           "(c) P″ = 2P′ − P = (2 − 3, 2 − 0, 2 − 3) = <b>(−1, 2, −1)</b>.",
           "(d) OP = (3, 0, 3) ∥ (1, 0, 1), |OP| = 3√2. sen α = |OP·n|/(|OP||n|) = 12/(3√2·3) = 4/(3√2) = 2√2/3 ≈ 0,9428 ⟹ <b>α ≈ 70,53°</b>."]) +
        ejemplo("Problema 2: tetraedro",
          "Con A(1, 0, 0), B(3, 0, 1), C(1, 2, 2) y D(2, 1, 5): (a) Área del triángulo ABC. (b) Volumen del tetraedro. (c) Distancia de D al plano ABC. (d) Ángulo entre las rectas AB y AC.",
          ["(a) AB × AC = (−2, −4, 4) ⟹ Área = ½·6 = <b>3</b>.",
           "(b) [AB, AC, AD] = 14 ⟹ V = 14/6 = <b>7/3</b>.",
           "(c) Plano ABC: x + 2y − 2z − 1 = 0; d(D, ABC) = |2 + 2 − 10 − 1|/3 = <b>7/3</b> (coincide con 3V/Área).",
           "(d) AB·AC = 0 + 0 + 2 = 2; |AB| = √5, |AC| = √8: cos α = 2/√40 = 1/√10 ≈ 0,3162 ⟹ <b>α ≈ 71,57°</b>."]) +
        ejemplo("Problema 3: perpendicular desde un punto a una recta",
          "Sea P(2, 1, 2) y r: (x, y, z) = (0, 1, 0) + t(1, 1, 2). (a) Halla la recta que pasa por P, corta a r y es perpendicular a ella. (b) Halla el simétrico de P respecto de r. (c) Calcula el área del triángulo de vértices Q(0, 1, 0), P y P″.",
          ["(a) La recta pedida pasa por P y por el pie de la perpendicular F = (1, 2, 2) (sección 7). Dirección PF = (−1, 1, 0): <b>(x, y, z) = (2, 1, 2) + λ(−1, 1, 0)</b>. Comprobación: (−1, 1, 0)·(1, 1, 2) = 0 ✓.",
           "(b) P″ = 2F − P = <b>(0, 3, 2)</b>.",
           "(c) QP = (2, 0, 2) y QP″ = (0, 2, 2). QP × QP″ = (0·2 − 2·2, 2·0 − 2·2, 2·2 − 0) = (−4, −4, 4), módulo √48 = 4√3 ⟹ Área = <b>2√3 ≈ 3,464</b>.",
           "Comprobación: el triángulo es isósceles con base PP″ = 2√2 y altura QF = √6: ½·2√2·√6 = √12 = 2√3 ✓."]),
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 15
    {
      h: "15. Autocomprobación del tema",
      html: "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar y el orden correcto para resolver el problema de la perpendicular común.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t6b = { nuevas: nuevas };
})(window);
