/* ============================================================
   Matemáticas I · ampliaciones · Tema 8: Geometría analítica (rectas)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t8/" + ref); }

  var resumen = [
    "Una recta se determina con <b>un punto y un vector director</b> (o con dos puntos: v = AB). Tiene muchas ecuaciones equivalentes.",
    "<b>Vectorial</b> (x, y) = P + t·v · <b>paramétricas</b> x = p₁ + tv₁, y = p₂ + tv₂ · <b>continua</b> (x − p₁)/v₁ = (y − p₂)/v₂ · <b>general</b> Ax + By + C = 0 · <b>explícita</b> y = mx + n.",
    "En la general, <b>(A, B) es un vector normal</b> (perpendicular) y <b>(−B, A) es un vector director</b>. La pendiente es m = −A/B = tan α.",
    "Posición de dos rectas: secantes (A/A′ ≠ B/B′), paralelas (A/A′ = B/B′ ≠ C/C′) o coincidentes. Perpendiculares: AA′ + BB′ = 0 (m₁m₂ = −1).",
    "<b>Distancia punto–recta</b>: |Ap₁ + Bp₂ + C|/√(A² + B²). La <b>mediatriz</b> de AB pasa por el punto medio y es perpendicular a AB.",
    "Los puntos notables de un triángulo salen de cortar medianas (G), alturas (H), mediatrices (O) o bisectrices (I)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué hace falta
  secciones[0] =
    "<h5>Cuatro maneras de dar una recta</h5>" +
    "<p>Una recta queda determinada por cualquiera de estos datos mínimos; cada uno lleva de forma natural a una ecuación:</p>" +
    tabla(["Datos", "Qué se usa", "Ecuación natural"], [
      ["un punto y un vector director", "P y v", "vectorial / paramétricas / continua"],
      ["dos puntos A y B", "A y v = AB", "continua o punto-pendiente"],
      ["un punto y la pendiente", "P y m", "punto-pendiente  y − p₂ = m(x − p₁)"],
      ["un punto y un vector normal", "P y n = (A, B)", "general  A(x − p₁) + B(y − p₂) = 0"]
    ]) +
    "<p>La última merece atención: si conoces un vector <b>perpendicular</b> a la recta, el producto escalar da directamente la ecuación: un punto X = (x, y) está en la recta si PX es perpendicular a n, es decir, n·PX = 0: A(x − p₁) + B(y − p₂) = 0.</p>" +
    ejemplo("Cuatro rectas, un mismo punto", "Escribe una ecuación de la recta que pasa por P = (2, 3) y (a) tiene vector director (1, −2); (b) pasa también por Q = (4, 7); (c) tiene pendiente −1/2; (d) es perpendicular al vector (3, 1).", [
      "(a) Continua: (x − 2)/1 = (y − 3)/(−2) → −2(x − 2) = y − 3 → <b>2x + y − 7 = 0</b>.",
      "(b) v = PQ = (2, 4) → (x − 2)/2 = (y − 3)/4 → 4(x − 2) = 2(y − 3) → <b>2x − y − 1 = 0</b>.",
      "(c) Punto-pendiente: y − 3 = −1/2·(x − 2) → 2y − 6 = −x + 2 → <b>x + 2y − 8 = 0</b>.",
      "(d) Normal n = (3, 1): 3(x − 2) + 1·(y − 3) = 0 → <b>3x + y − 9 = 0</b>."
    ]) +
    "<p>Y para comprobar si un punto pertenece a una recta, se sustituye en la ecuación: si la cumple, está en la recta. Así, el punto (3, 4) está en 2x − 3y + 6 = 0 (6 − 12 + 6 = 0 ✓), pero (1, 2) no (2 − 6 + 6 = 2 ≠ 0).</p>";

  // ---------------------------------------------------------------- 2. Vectorial y paramétricas
  secciones[1] =
    "<h5>El parámetro t: moverse a lo largo de la recta</h5>" +
    "<p>En (x, y) = (p₁, p₂) + t·(v₁, v₂), el parámetro t es como un «reloj»: en t = 0 estás en P; en t = 1 has avanzado exactamente un vector v; en t = −1, un vector v hacia atrás; en t = 1/2, la mitad. Si A y B son los dos puntos y v = AB, entonces t = 0 es A, <b>t = 1 es B</b> y t = 1/2 es el punto medio: es exactamente el P = A + t·AB del Tema 7. Arrastra A y B, y mira cómo todas las ecuaciones describen la misma recta:</p>" +
    w("recta2p") +
    ejemplo("Pasar de dos puntos a las ecuaciones", "Halla las ecuaciones vectorial y paramétricas de la recta que pasa por A = (1, −2) y B = (4, 2). ¿Para qué valor de t se obtiene el punto (7, 6)?", [
      "v = AB = (3, 4). Vectorial: <b>(x, y) = (1, −2) + t·(3, 4)</b>. Paramétricas: <b>x = 1 + 3t, y = −2 + 4t</b>.",
      "Para (7, 6): 1 + 3t = 7 → t = 2 y −2 + 4t = 6 → t = 2. Los dos t coinciden: el punto está en la recta (con t = 2).",
      "¿Y (5, 3)? 1 + 3t = 5 → t = 4/3 pero −2 + 4t = 3 → t = 5/4. No coinciden: (5, 3) <b>no</b> está en la recta."
    ]) +
    ojo("las ecuaciones paramétricas <b>no son únicas</b>: puedes elegir cualquier punto de la recta como P y cualquier vector paralelo como v (por ejemplo, (6, 8) vale igual que (3, 4)). Dos alumnos pueden dar ecuaciones distintas de la misma recta y estar los dos bien: para comprobarlo, pasa ambas a la forma general y compáralas.");

  // ---------------------------------------------------------------- 3. Continua y general
  secciones[2] =
    "<h5>Casos especiales: rectas verticales y horizontales</h5>" +
    "<p>Si una componente del vector director es 0 la ecuación continua tiene un denominador 0 (que no se puede escribir): <b>v = (0, v₂)</b> es una recta <b>vertical</b>, x = p₁; <b>v = (v₁, 0)</b> es una recta <b>horizontal</b>, y = p₂. En una recta vertical la pendiente no existe (se dice que es infinita) y no se puede escribir como y = mx + n.</p>" +
    "<h5>Pasar de la forma general a las demás</h5>" +
    "<ul><li><b>Vector normal</b>: (A, B). <b>Vector director</b>: (−B, A) o (B, −A): basta intercambiar los coeficientes y cambiar un signo (¡comprueba que son perpendiculares: A·(−B) + B·A = 0!).</li>" +
    "<li><b>Un punto</b>: da un valor a x (o a y) y despeja el otro.</li>" +
    "<li><b>Cortes con los ejes</b>: con y = 0, x = −C/A (corta al eje X); con x = 0, y = −C/B (corta al eje Y).</li>" +
    "<li><b>Pendiente</b>: m = −A/B (de despejar y). </li></ul>" +
    ejemplo("De la general a las demás", "Dada r: 2x − 3y + 6 = 0, halla un vector director, un vector normal, la pendiente, los cortes con los ejes y las ecuaciones paramétricas.", [
      "Normal: n = (2, −3). Director: (−B, A) = (3, 2).",
      "Pendiente: m = −A/B = 2/3. Explícita: y = (2/3)x + 2.",
      "Cortes: y = 0 → x = −3 → (−3, 0); x = 0 → y = 2 → (0, 2).",
      "Paramétricas con el punto (0, 2): <b>x = 3t, y = 2 + 2t</b>."
    ]) +
    "<p>Hay otra forma muy visual, la <b>ecuación segmentaria</b> (o canónica), que usa los cortes con los ejes (a, 0) y (0, b): <b>x/a + y/b = 1</b>. Por ejemplo, la recta que pasa por (4, 0) y (0, 2) es x/4 + y/2 = 1, que equivale a x + 2y − 4 = 0. Sólo existe si la recta no pasa por el origen ni es paralela a un eje.</p>" +
    "<p>Escribe tú mismo una ecuación (en cualquier forma: con paréntesis, fracciones, x e y en los dos lados…) y se convertirá a todas las demás; en el dibujo verás el vector director (rojo) y el normal (azul):</p>" +
    w("ecgeneral") +
    ojo("el vector normal es (A, B), el director es (−B, A). Cambiarlos entre sí es el error más común: ¡recuerda que el normal es perpendicular a la recta! En 4x − 3y + 2 = 0, el director es (3, 4), no (4, −3).");

  // ---------------------------------------------------------------- 4. Pendiente
  secciones[3] =
    "<h5>Pendiente y ángulo: m = tan α</h5>" +
    "<p>Si α es el ángulo que forma la recta con el semieje X positivo (entre 0° y 180°), la pendiente es m = tan α. Por eso: una recta con ángulo agudo tiene pendiente positiva (sube hacia la derecha), con ángulo obtuso la tiene negativa (baja), horizontal m = 0 y vertical (α = 90°) no tiene pendiente (la tangente de 90° no existe).</p>" +
    ejemplo("De un ángulo a la ecuación", "Halla la ecuación de la recta que pasa por P = (1, 2) y forma 60° con el eje X. ¿Y si forma 135°?", [
      "m = tan 60° = √3. Punto-pendiente: y − 2 = √3(x − 1) → y = √3x + (2 − √3) ≈ 1,732x + 0,268.",
      "Con 135°: m = tan 135° = −1. y − 2 = −(x − 1) → y = −x + 3 → <b>x + y − 3 = 0</b>."
    ]) +
    ejemplo("Dos puntos, pendiente y ángulo", "Calcula la pendiente, el ángulo y la ecuación de la recta por A = (−1, 3) y B = (5, 0).", [
      "m = (0 − 3)/(5 − (−1)) = −3/6 = −1/2.",
      "El ángulo: tan α = −1/2 → α = 180° − arctan(1/2) = 180° − 26,57° = <b>153,43°</b> (obtuso, la recta baja).",
      "Punto-pendiente con B: y − 0 = −1/2(x − 5) → <b>x + 2y − 5 = 0</b>."
    ]) +
    "<p>La pendiente también da el significado de la recta: m = 2 significa «por cada unidad que avanzas en horizontal, subes 2»; es una <b>tasa de variación constante</b> (idea que aparecerá en las funciones lineales del Tema 9 y en las derivadas del Tema 11: la derivada de una recta es su pendiente).</p>";

  // ---------------------------------------------------------------- 5. Posiciones
  secciones[4] =
    "<h5>Con las ecuaciones generales no hace falta despejar</h5>" +
    "<p>Dadas r: Ax + By + C = 0 y s: A′x + B′y + C′ = 0, la posición se lee de los coeficientes:</p>" +
    tabla(["Condición", "Posición"], [
      ["A/A′ ≠ B/B′ (equivale a AB′ − A′B ≠ 0)", "secantes: un punto común"],
      ["A/A′ = B/B′ ≠ C/C′", "paralelas: ninguno"],
      ["A/A′ = B/B′ = C/C′", "coincidentes: todos"]
    ]) +
    "<p>Para las secantes, el punto de corte se halla resolviendo el sistema de las dos ecuaciones (Tema 3). Prueba con tus propias rectas:</p>" +
    w("posiciones") +
    "<h5>El ángulo entre dos rectas</h5>" +
    "<p>El ángulo entre dos rectas es el ángulo (agudo, entre 0° y 90°) que forman sus vectores directores (o sus vectores normales, da lo mismo). Con el producto escalar del Tema 7:</p>" +
    H.formula("cos θ = " + fr("|u·v|", "|u|·|v|") + "         o con pendientes:         tan θ = " + fr("|m₂ − m₁|", "1 + m₁·m₂")) +
    ejemplo("Ángulo entre dos rectas", "Calcula el ángulo entre r: y = 2x + 1 y s: y = −x/3 + 4.", [
      "Pendientes: m₁ = 2 y m₂ = −1/3. 1 + m₁m₂ = 1 − 2/3 = 1/3 (no es 0).",
      "tan θ = |(−1/3 − 2)/(1/3)| = |(−7/3)/(1/3)| = 7 → θ = arctan 7 = <b>81,87°</b>."
    ]) +
    ejemplo("Perpendiculares", "Halla k para que 2x + 3y − 1 = 0 y kx − 6y + 5 = 0 sean perpendiculares, y para que sean paralelas.", [
      "Perpendiculares: AA′ + BB′ = 0 → 2k + 3·(−6) = 0 → <b>k = 9</b>.",
      "Paralelas: A/A′ = B/B′ → 2/k = 3/(−6) = −1/2 → <b>k = −4</b> (y entonces C/C′ = −1/5 ≠ −1/2: son paralelas distintas, no coincidentes)."
    ]) +
    "<h5>Rectas por un punto: paralela y perpendicular</h5>" +
    "<p>Para trazar por P la <b>paralela</b> a r: Ax + By + C = 0 se conserva (A, B) y se cambia C: Ax + By + k = 0, con k fijado al sustituir P. Para la <b>perpendicular</b> se intercambian los coeficientes: Bx − Ay + k = 0.</p>" +
    ejemplo("Paralela y perpendicular por un punto", "Halla la paralela y la perpendicular a r: 3x − 2y + 5 = 0 por P = (2, −1).", [
      "Paralela: 3x − 2y + k = 0; con P: 6 + 2 + k = 0 → k = −8 → <b>3x − 2y − 8 = 0</b>.",
      "Perpendicular: 2x + 3y + k = 0; con P: 4 − 3 + k = 0 → k = −1 → <b>2x + 3y − 1 = 0</b>."
    ]) +
    "<h5>Haz de rectas</h5>" +
    "<p>Todas las rectas que pasan por un mismo punto forman un <b>haz</b>. Si el punto es la intersección de r y s, el haz es r + k·s = 0 (con k variable). Ejemplo: las rectas que pasan por (2, 2), intersección de x + y − 4 = 0 y x − y = 0, son (x + y − 4) + k(x − y) = 0. Para la que pasa por (1, 0): (1 − 4) + k(1) = 0 → k = 3 → 4x − 2y − 4 = 0, es decir, 2x − y − 2 = 0.</p>";

  // ---------------------------------------------------------------- 6. Distancias
  secciones[5] =
    "<h5>De dónde sale la fórmula de la distancia a una recta</h5>" +
    "<p>Sea A un punto cualquiera de la recta y n = (A, B) su vector normal. La distancia de P a la recta es la <b>proyección</b> del vector AP sobre la dirección normal: d = |AP·n|/|n|. Como A está en la recta, A·a₁ + B·a₂ = −C, y AP·n = A(p₁ − a₁) + B(p₂ − a₂) = Ap₁ + Bp₂ + C. Por tanto:</p>" +
    H.formula("d(P, r) = " + fr("|A·p₁ + B·p₂ + C|", "√(A² + B²)")) +
    "<p>Mueve el punto P y la recta, y observa la distancia, el pie H de la perpendicular y el simétrico P′:</p>" +
    w("distpunto") +
    ejemplo("Distancia punto-recta y entre paralelas", "Calcula la distancia de P = (2, −1) a r: 5x − 12y + 3 = 0, y la distancia entre las paralelas 3x + 4y − 6 = 0 y 3x + 4y + 9 = 0.", [
      "d(P, r) = |5·2 − 12·(−1) + 3|/√(25 + 144) = |10 + 12 + 3|/13 = 25/13 ≈ <b>1,92</b>.",
      "Entre paralelas: se toma un punto de una y se mide a la otra, o directamente d = |C − C′|/√(A² + B²) (con los mismos A y B): |−6 − 9|/5 = <b>3</b>."
    ]) +
    ejemplo("Simétrico de un punto respecto de una recta", "Halla el simétrico de P = (0, 0) respecto de r: x + y − 4 = 0.", [
      "Recta perpendicular a r por P: x − y = 0. Su intersección con r: x = y, 2x = 4 → H = (2, 2) (el pie de la perpendicular).",
      "H es el punto medio entre P y P′: P′ = 2H − P = <b>(4, 4)</b>.",
      "Comprobación: la distancia de P′ a r es |4 + 4 − 4|/√2 = 4/√2 = 2√2, igual que la de P (|−4|/√2) ✓."
    ]) +
    ojo("el valor absoluto del numerador es imprescindible, y la ecuación tiene que estar en <b>forma general</b> (todo en un lado). Si usas y = 2x + 1 sin pasarla a 2x − y + 1 = 0, la fórmula no funciona.");

  // ---------------------------------------------------------------- 7. Mediatriz
  secciones[6] =
    "<h5>La mediatriz como lugar geométrico</h5>" +
    "<p>La mediatriz del segmento AB es el <b>conjunto de los puntos que están a la misma distancia de A que de B</b>. Eso da otra forma de obtenerla: se escribe |XA| = |XB| con X = (x, y) y se desarrolla. Por ejemplo, con A = (1, 2) y B = (5, 6): (x − 1)² + (y − 2)² = (x − 5)² + (y − 6)² → −2x − 4y + 5 = −10x − 12y + 61 → 8x + 8y − 56 = 0 → <b>x + y − 7 = 0</b>. Coincide con el método geométrico: pasa por M = (3, 4) y su vector normal es AB = (4, 4) → 4(x − 3) + 4(y − 4) = 0 → x + y − 7 = 0.</p>" +
    w("mediatriz") +
    "<h5>Bisectriz de dos rectas</h5>" +
    "<p>La bisectriz es el lugar geométrico de los puntos <b>equidistantes de dos rectas</b>: |Ax + By + C|/√(A² + B²) = |A′x + B′y + C′|/√(A′² + B′²). Quitando el valor absoluto se obtienen dos rectas (+ y −), las dos bisectrices de los cuatro ángulos que forman, y son perpendiculares entre sí.</p>" +
    ejemplo("Las bisectrices", "Halla las bisectrices de las rectas 3x + 4y − 5 = 0 y 5x − 12y + 7 = 0.", [
      "Se iguala |3x + 4y − 5|/5 = |5x − 12y + 7|/13, es decir, 13(3x + 4y − 5) = ±5(5x − 12y + 7).",
      "Con el signo +: 39x + 52y − 65 = 25x − 60y + 35 → <b>14x + 112y − 100 = 0</b>, o sea, 7x + 56y − 50 = 0.",
      "Con el signo −: 39x + 52y − 65 = −25x + 60y − 35 → <b>64x − 8y − 30 = 0</b>, o sea, 32x − 4y − 15 = 0.",
      "Comprobación: son perpendiculares: 7·32 + 56·(−4) = 224 − 224 = 0 ✓."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Rectas y puntos notables de un triángulo",
      html:
        "<p>Con lo anterior se pueden calcular los cuatro puntos notables de un triángulo, cada uno como intersección de tres rectas:</p>" +
        tabla(["Rectas", "Qué son", "Punto", "Qué significa"], [
          ["Medianas", "vértice → punto medio del lado opuesto", "Baricentro G", "centro de gravedad; divide cada mediana en 2 : 1"],
          ["Alturas", "vértice ⊥ lado opuesto", "Ortocentro H", "puede quedar fuera si el triángulo es obtusángulo"],
          ["Mediatrices", "⊥ por el punto medio de cada lado", "Circuncentro O", "centro de la circunferencia que pasa por los vértices"],
          ["Bisectrices", "dividen los ángulos en dos iguales", "Incentro I", "centro de la circunferencia inscrita"]
        ]) +
        w("ptosnotables") +
        ejemplo("Un triángulo completo", "Calcula G, H y O del triángulo A = (0, 0), B = (6, 0), C = (2, 4). Comprueba que están alineados.", [
          "<b>G</b> = ((0 + 6 + 2)/3, (0 + 0 + 4)/3) = (8/3, 4/3).",
          "<b>H</b>: la altura desde C es perpendicular a AB (horizontal): x = 2. La altura desde A es perpendicular a BC = (−4, 4) (pendiente −1): su pendiente es 1 → y = x. Se cortan en H = (2, 2).",
          "<b>O</b>: la mediatriz de AB es x = 3. La de AC pasa por (1, 2) y es perpendicular a AC = (2, 4) (pendiente 2): pendiente −1/2 → y − 2 = −(x − 1)/2; con x = 3: y = 1. O = (3, 1).",
          "Los tres están en una misma recta, la <b>recta de Euler</b>: HG = (2/3, −2/3) y GO = (1/3, −1/3), con HG = 2·GO ✓ (siempre G divide a HO en razón 2 : 1)."
        ]) +
        ejemplo("Circunferencia circunscrita", "Halla el radio de la circunferencia que pasa por los vértices del triángulo anterior.", [
          "El centro es el circuncentro O = (3, 1). Radio = |OA| = √(9 + 1) = <b>√10 ≈ 3,16</b>. (Comprueba con B: √(9 + 1) ✓ y con C: √(1 + 9) ✓.)"
        ])
    },
    {
      h: "9. Áreas con coordenadas y problemas de rectas",
      html:
        "<p>Tres herramientas para calcular áreas: (1) <b>base × altura / 2</b>, midiendo la altura como la distancia de un vértice a la recta del lado opuesto; (2) el <b>determinante</b> ½·|det(AB, AC)| del Tema 7; (3) para polígonos, dividirlos en triángulos.</p>" +
        ejemplo("Tres formas de calcular el mismo área", "Calcula el área del triángulo A = (0, 0), B = (6, 0), C = (2, 4).", [
          "Base AB = 6 (sobre el eje X) y altura = ordenada de C = 4: área = 6·4/2 = <b>12</b>.",
          "Con el determinante: AB = (6, 0), AC = (2, 4): ½·|24 − 0| = 12 ✓.",
          "Con la distancia de C a la recta AB (y = 0): d = 4; |AB| = 6 → 12 ✓."
        ]) +
        ejemplo("Una recta que forma un triángulo de área dada", "Halla la recta que pasa por P = (3, 2) y forma con los semiejes positivos un triángulo de área 12.", [
          "Sea x/a + y/b = 1 (cortes a y b). Pasa por P: 3/a + 2/b = 1. Área: ab/2 = 12 → ab = 24.",
          "Multiplicando 3/a + 2/b = 1 por ab: 3b + 2a = ab = 24. Sustituyendo a = 24/b: 3b + 48/b = 24 → 3b² − 24b + 48 = 0 → b² − 8b + 16 = 0 → b = 4.",
          "Entonces a = 6 y la recta es x/6 + y/4 = 1 → <b>2x + 3y − 12 = 0</b>. (Es la única: el discriminante es 0.)"
        ]) +
        ejemplo("Un rayo de luz y un espejo", "Un rayo sale de A = (1, 3), se refleja en el espejo y = 0 (el eje X) y pasa por B = (5, 1). ¿En qué punto del espejo rebota?", [
          "Truco: la imagen de A en el espejo es A′ = (1, −3). El rayo reflejado va como si saliese de A′ en línea recta hasta B.",
          "Recta A′B: v = (4, 4) → pendiente 1: y + 3 = x − 1 → y = x − 4. Corta al eje X (y = 0) en x = 4: <b>el punto (4, 0)</b>.",
          "Comprobación: la longitud del camino es |A′B| = √(16 + 16) = 4√2 ≈ 5,66, y con el punto (4, 0): |A(4, 0)| = 3√2 y |(4, 0)B| = √2, que suman 4√2 ✓."
        ]) +
        ejemplo("Un lugar geométrico", "Halla los puntos del eje Y que están a distancia 5 de la recta 3x + 4y − 10 = 0.", [
          "P = (0, y): d = |4y − 10|/5 = 5 → |4y − 10| = 25 → 4y − 10 = 25 o 4y − 10 = −25.",
          "y = 35/4 = 8,75 o y = −15/4 = −3,75. <b>Dos puntos: (0; 8,75) y (0; −3,75)</b>."
        ])
    },
    {
      h: "10. Semiplanos: una recta divide el plano",
      html:
        "<p>Una recta Ax + By + C = 0 divide el plano en <b>dos semiplanos</b>: en uno la expresión Ax + By + C es positiva y en el otro negativa. Para saber qué lado es solución de una inecuación, se prueba <b>un punto</b> (normalmente el origen, si la recta no pasa por él). La recta pertenece a la región si la desigualdad es ≤ o ≥, y no si es &lt; o &gt;. Un <b>sistema de inecuaciones</b> es la intersección de los semiplanos; si sale un polígono, sus vértices son los cortes de las rectas.</p>" +
        ejemplo("Un semiplano", "Dibuja la región 2x + 3y ≤ 12.", [
          "La recta 2x + 3y = 12 pasa por (6, 0) y (0, 4).",
          "Probamos el origen: 0 + 0 = 0 ≤ 12 ✓. La región es el lado de la recta <b>donde está el origen</b>, incluyendo la recta."
        ]) +
        ejemplo("Un triángulo como sistema", "Escribe el sistema de inecuaciones que describe el triángulo de vértices (0, 0), (4, 0) y (0, 4).", [
          "Los lados son: y = 0 (eje X), x = 0 (eje Y) y la recta que pasa por (4, 0) y (0, 4): x + y = 4.",
          "El interior está sobre el eje X (y ≥ 0), a la derecha del eje Y (x ≥ 0) y por debajo de x + y = 4 (x + y ≤ 4, el origen lo cumple).",
          "<b>Sistema: x ≥ 0, y ≥ 0, x + y ≤ 4</b>."
        ]) +
        w("region") +
        ojo("al multiplicar una inecuación por un número negativo, la desigualdad se invierte (−2x + y ≥ 4 equivale a 2x − y ≤ −4). Y recuerda que las desigualdades estrictas dejan la recta fuera (se dibuja discontinua).")
    },
    {
      h: "11. Mapa de formas de la ecuación",
      html:
        "<p>Cada forma de la ecuación tiene su momento: la <b>paramétrica</b> para recorrer puntos, la <b>explícita</b> para dibujar y ver m, la <b>general</b> para distancias y posiciones. Une cada nombre con su ecuación para la recta que pasa por (1, 2) con vector director (3, 4):</p>" +
        w("emparejar", "formas") +
        w("clasificar", "datos")
    },
    {
      h: "18. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "19. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas con las fórmulas del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    formas: {
      titulo: "La misma recta de cinco formas",
      consigna: "Recta por P = (1, 2) con vector director (3, 4). Une cada nombre con su ecuación.",
      pares: [
        ["Vectorial", "(x, y) = (1, 2) + t·(3, 4)"],
        ["Paramétricas", "x = 1 + 3t, y = 2 + 4t"],
        ["Continua", "(x − 1)/3 = (y − 2)/4"],
        ["General", "4x − 3y + 2 = 0"],
        ["Explícita", "y = (4/3)x + 2/3"],
        ["Punto-pendiente", "y − 2 = (4/3)(x − 1)"]
      ]
    },
    datos: {
      titulo: "¿Con qué datos empiezo?",
      consigna: "Toca un enunciado y después la ecuación que usarías primero.",
      categorias: ["Continua o punto-pendiente (puntos / pendiente)", "General con vector normal", "Fórmula de la distancia punto-recta", "Mediatriz: punto medio + perpendicular"],
      items: [
        { t: "La recta pasa por A = (1, 2) y B = (4, 6)", c: 0 }, { t: "La recta pasa por P y tiene pendiente −1/2", c: 0 },
        { t: "La recta pasa por P y es perpendicular al vector (3, 1)", c: 1 }, { t: "Una paralela a 3x − 2y + 5 = 0 por un punto", c: 1 },
        { t: "Calcular a qué distancia está P de la recta 5x − 12y + 3 = 0", c: 2 }, { t: "Altura de un triángulo desde un vértice sobre la recta del lado opuesto", c: 2 },
        { t: "Hallar los puntos equidistantes de A y B", c: 3 }, { t: "Hallar el circuncentro de un triángulo", c: 3 }
      ]
    },
    tj1: {
      titulo: "Rectas en el plano",
      cartas: [
        { a: "Ecuación vectorial y paramétricas", b: "(x, y) = (p₁, p₂) + t(v₁, v₂) · x = p₁ + tv₁, y = p₂ + tv₂" },
        { a: "Ecuación continua", b: "(x − p₁)/v₁ = (y − p₂)/v₂. Si v₁ = 0: x = p₁ (vertical). Si v₂ = 0: y = p₂ (horizontal)." },
        { a: "Ecuación general y vectores", b: "Ax + By + C = 0 · normal (A, B) · director (−B, A) · pendiente m = −A/B" },
        { a: "Pendiente", b: "m = (b₂ − a₂)/(b₁ − a₁) = v₂/v₁ = tan α. La vertical no tiene pendiente." },
        { a: "Explícita y punto-pendiente", b: "y = mx + n (n = ordenada en el origen) · y − p₂ = m(x − p₁)" },
        { a: "Posición de dos rectas generales", b: "A/A′ ≠ B/B′: secantes · A/A′ = B/B′ ≠ C/C′: paralelas · los tres iguales: coincidentes" },
        { a: "Perpendiculares", b: "AA′ + BB′ = 0 · m₁·m₂ = −1" },
        { a: "Ángulo entre dos rectas", b: "cos θ = |u·v|/(|u||v|) · tan θ = |m₂ − m₁|/(1 + m₁m₂)" },
        { a: "Distancia de un punto a una recta", b: "d = |Ap₁ + Bp₂ + C|/√(A² + B²) · entre paralelas: |C − C′|/√(A² + B²)" },
        { a: "Mediatriz de AB", b: "Pasa por M (punto medio) y es perpendicular a AB. Equidista de A y B." },
        { a: "Recta paralela y perpendicular por un punto", b: "Paralela: misma (A, B) y C nuevo. Perpendicular: Bx − Ay + k = 0." },
        { a: "Puntos notables del triángulo", b: "Medianas → G (media de vértices) · Alturas → H · Mediatrices → O · Bisectrices → I" },
        { a: "Área del triángulo", b: "½·|det(AB, AC)| = base·altura/2" },
        { a: "Semiplano", b: "Ax + By + C ≥ 0: lado de la recta que contiene los puntos que cumplen la desigualdad (se prueba un punto)." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Para la recta 4x − 3y + 2 = 0, un alumno dice que el vector director es (4, −3). ¿Qué falla?",
          op: ["Nada", "(4, −3) es el vector normal; el director es (3, 4) (o (−3, −4))", "El director es (−4, 3)", "El director es (4, 3)"], ok: 1,
          porque: "En Ax + By + C = 0, (A, B) es perpendicular a la recta. El director es (−B, A) = (3, 4). Comprobación: 4·3 − 3·4 = 0." },
        { q: "Un alumno calcula la pendiente de la recta por A = (1, 3) y B = (4, 9) como (4 − 1)/(9 − 3) = 1/2. ¿Qué falla?",
          op: ["Nada", "Ha invertido el cociente: m = (9 − 3)/(4 − 1) = 2", "Debía sumar", "La pendiente es 12"], ok: 1,
          porque: "La pendiente es «cuánto sube partido por cuánto avanza»: m = Δy/Δx = 6/3 = 2." },
        { q: "Un alumno dice que 3x + 2y − 5 = 0 y 2x − 3y + 1 = 0 son paralelas porque «los números están cruzados». ¿Qué falla?",
          op: ["Nada", "Son perpendiculares: 3·2 + 2·(−3) = 0. Paralelas exigiría A/A′ = B/B′", "Son coincidentes", "Son secantes oblicuas"], ok: 1,
          porque: "AA′ + BB′ = 6 − 6 = 0 → perpendiculares. Paralelas: 3/2 ≠ 2/(−3), no lo son." },
        { q: "Para calcular la distancia de P = (1, 2) a la recta y = 2x + 1, un alumno sustituye en |2·1 + 1 − 2|/√(4 + 1)... ¿Qué falla?",
          op: ["Nada", "Hay que pasar la recta a forma general (2x − y + 1 = 0) y usar |2·1 − 2 + 1|/√5 = 1/√5", "Debía dividir entre 2", "Debía restar los dos puntos"], ok: 1,
          porque: "La fórmula pide Ax + By + C = 0 con todo a un lado: A = 2, B = −1, C = 1. Con ello d = |2 − 2 + 1|/√5 = 0,447." },
        { q: "Un alumno halla la perpendicular a 3x − 2y + 5 = 0 por (2, −1) como 3x − 2y + k = 0. ¿Qué falla?",
          op: ["Nada", "Esa es la paralela. La perpendicular es 2x + 3y + k = 0", "Debe ser −3x + 2y + k = 0", "Debe ser 3x + 2y + k = 0"], ok: 1,
          porque: "Perpendicular: se intercambian los coeficientes y se cambia un signo: (A, B) → (B, −A). Con 3x − 2y: 2x + 3y + k = 0." },
        { q: "Un alumno dice que la recta x = 3 tiene pendiente 0. ¿Qué falla?",
          op: ["Nada", "x = 3 es una recta vertical: no tiene pendiente (la pendiente 0 es la de las horizontales)", "Su pendiente es 3", "Su pendiente es 1"], ok: 1,
          porque: "La recta vertical forma 90° con el eje X, y tan 90° no existe. La horizontal, como y = 3, sí tiene pendiente 0." },
        { q: "Un alumno halla el punto medio de AB y lo da como «la mediatriz». ¿Qué falla?",
          op: ["Nada", "La mediatriz es una recta: la que pasa por el punto medio y es perpendicular a AB", "Es el segmento AB", "Es el baricentro"], ok: 1,
          porque: "El punto medio es un punto. La mediatriz es la recta perpendicular a AB por ese punto." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La recta por A = (1, 2) y B = (3, 8) tiene pendiente…",
          op: ["3", "1/3", "6", "−3"], ok: 0,
          porque: "m = (8 − 2)/(3 − 1) = 6/2 = 3." },
        { q: "Un vector director de 5x − 2y + 7 = 0 es…",
          op: ["(2, 5)", "(5, −2)", "(5, 2)", "(−5, 2)"], ok: 0,
          porque: "(−B, A) = (2, 5). El vector (5, −2) es el normal." },
        { q: "Las rectas 2x + 3y − 6 = 0 y 4x + 6y + 1 = 0 son…",
          op: ["paralelas", "coincidentes", "secantes", "perpendiculares"], ok: 0,
          porque: "2/4 = 3/6 = 1/2 y −6/1 ≠ 1/2: paralelas distintas." },
        { q: "Una recta perpendicular a y = 2x + 1 tiene pendiente…",
          op: ["−1/2", "2", "1/2", "−2"], ok: 0,
          porque: "m₁·m₂ = −1 → m₂ = −1/2." },
        { q: "La distancia de (1, 2) a 3x + 4y − 6 = 0 es…",
          op: ["1", "5", "3", "0,2"], ok: 0,
          porque: "|3 + 8 − 6|/5 = 5/5 = 1." },
        { q: "La mediatriz del segmento de extremos (0, 0) y (6, 4) es…",
          op: ["3x + 2y − 13 = 0", "2x − 3y = 0", "3x + 2y = 0", "x + y − 5 = 0"], ok: 0,
          porque: "Pasa por (3, 2) con normal AB = (6, 4) ∥ (3, 2): 3(x − 3) + 2(y − 2) = 0 → 3x + 2y − 13 = 0." },
        { q: "La ecuación de la recta que pasa por (0, 2) con pendiente −3 es…",
          op: ["y = −3x + 2", "y = 3x + 2", "y = −3x − 2", "y = 2x − 3"], ok: 0,
          porque: "Pendiente −3 y ordenada en el origen 2." },
        { q: "El ángulo entre y = x e y = 3x es…",
          op: ["26,57°", "63,43°", "45°", "18,43°"], ok: 0,
          porque: "tan θ = |3 − 1|/(1 + 3) = 0,5 → θ = 26,57°." },
        { q: "El baricentro del triángulo (0, 0), (6, 0), (0, 6) es…",
          op: ["(2, 2)", "(3, 3)", "(6, 6)", "(1, 1)"], ok: 0,
          porque: "La media de los vértices: ((0 + 6 + 0)/3, (0 + 0 + 6)/3) = (2, 2)." },
        { q: "El punto (3, 4) pertenece a la recta…",
          op: ["2x − 3y + 6 = 0", "2x + 3y − 6 = 0", "x − y + 2 = 0", "3x − 4y = 0"], ok: 0,
          porque: "2·3 − 3·4 + 6 = 0 ✓. Las demás no se anulan: 6 + 12 − 6 = 12; 3 − 4 + 2 = 1; 9 − 16 = −7." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "r1", nivel: 1,
      enunciado: "Halla la ecuación general de la recta que pasa por P = (2, 1) con vector director v = (1, 3). Da A, B y C con A &gt; 0.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 3 }, { tipo: "num", etiqueta: "B =", valor: -1 }, { tipo: "num", etiqueta: "C =", valor: -5 }],
      pistas: ["Continua: (x − 2)/1 = (y − 1)/3. Multiplica en cruz."],
      pasos: ["3(x − 2) = 1·(y − 1) → 3x − 6 = y − 1 → 3x − y − 5 = 0."],
      resultado: "3x − y − 5 = 0" },
    { id: "r2", nivel: 1,
      enunciado: "Halla la pendiente y la ordenada en el origen de la recta que pasa por A = (0, 2) y B = (3, 8).",
      check: [{ tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 2 }],
      pistas: ["m = (b₂ − a₂)/(b₁ − a₁). El punto A está en el eje Y."],
      pasos: ["m = (8 − 2)/(3 − 0) = 2. La ordenada en el origen es la y de A: n = 2.", "y = 2x + 2."],
      resultado: "y = 2x + 2" },
    { id: "r3", nivel: 1,
      enunciado: "Halla un vector director de 3x − 5y + 2 = 0 (con primera componente positiva) y escribe sus componentes.",
      check: [{ tipo: "num", etiqueta: "v₁ =", valor: 5 }, { tipo: "num", etiqueta: "v₂ =", valor: 3 }],
      pistas: ["(−B, A)."],
      pasos: ["A = 3 y B = −5: (−B, A) = (5, 3). (El normal es (3, −5).)"],
      resultado: "(5, 3)" },
    { id: "r4", nivel: 1,
      enunciado: "Estudia la posición de r: 2x + y − 3 = 0 y s: 4x + 2y + 1 = 0.",
      check: { tipo: "opcion", etiqueta: "Son", opciones: ["paralelas", "coincidentes", "secantes", "perpendiculares"], ok: 0 },
      pistas: ["Compara A/A′, B/B′ y C/C′."],
      pasos: ["2/4 = 1/2 y 1/2 = 1/2, pero −3/1 ≠ 1/2: paralelas (no coincidentes)."],
      resultado: "paralelas" },
    { id: "r5", nivel: 1,
      enunciado: "Una recta tiene pendiente 3. ¿Qué pendiente tiene cualquier recta perpendicular a ella?",
      check: { tipo: "num", etiqueta: "m′ =", valor: -1 / 3, tol: 0.002, ph: "−1/3" },
      pistas: ["m·m′ = −1."],
      pasos: ["m′ = −1/3."],
      resultado: "−1/3" },
    { id: "r6", nivel: 1,
      enunciado: "Calcula la distancia del punto P = (3, 1) a la recta 4x − 3y + 2 = 0.",
      check: { tipo: "num", etiqueta: "d =", valor: 2.2 },
      pistas: ["d = |Ap₁ + Bp₂ + C|/√(A² + B²)."],
      pasos: ["d = |12 − 3 + 2|/√(16 + 9) = 11/5 = 2,2."],
      resultado: "11/5 = 2,2" },
    { id: "r7", nivel: 1,
      enunciado: "¿Pertenece el punto (−1, 4) a la recta 3x + 2y − 5 = 0?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["Sí", "No"], ok: 0 },
      pistas: ["Sustituye x e y."],
      pasos: ["3·(−1) + 2·4 − 5 = −3 + 8 − 5 = 0: sí pertenece."],
      resultado: "Sí" },
    { id: "r8", nivel: 1,
      enunciado: "Halla los puntos de corte de 2x + 3y − 12 = 0 con el eje X y con el eje Y. Da la abscisa del primero y la ordenada del segundo.",
      check: [{ tipo: "num", etiqueta: "corte con el eje X: x =", valor: 6 }, { tipo: "num", etiqueta: "corte con el eje Y: y =", valor: 4 }],
      pistas: ["Eje X: y = 0. Eje Y: x = 0."],
      pasos: ["y = 0: 2x = 12 → x = 6. x = 0: 3y = 12 → y = 4. Puntos (6, 0) y (0, 4)."],
      resultado: "(6, 0) y (0, 4)" },
    { id: "r9", nivel: 1,
      enunciado: "¿Qué ángulo forma con el eje X la recta y = √3·x + 1?",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 60, unidad: "°" },
      pistas: ["m = tan α."],
      pasos: ["tan α = √3 → α = 60°."],
      resultado: "60°" },
    { id: "r10", nivel: 1,
      enunciado: "Halla la recta paralela a y = 2x − 3 que pasa por (1, 5). Da su pendiente y su ordenada en el origen.",
      check: [{ tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 3 }],
      pistas: ["Misma pendiente: y − 5 = 2(x − 1)."],
      pasos: ["y − 5 = 2x − 2 → y = 2x + 3."],
      resultado: "y = 2x + 3" },
    // ================= ★★ medio =================
    { id: "r11", nivel: 2,
      enunciado: "La recta que pasa por A = (1, −2) y B = (4, 2) tiene ecuaciones x = 1 + 3t, y = −2 + 4t. ¿Para qué valor de t se obtiene el punto (7, 6)?",
      check: { tipo: "num", etiqueta: "t =", valor: 2 },
      pistas: ["Resuelve 1 + 3t = 7 y comprueba con la otra ecuación."],
      pasos: ["1 + 3t = 7 → t = 2. Comprobación: −2 + 4·2 = 6 ✓."],
      resultado: "t = 2" },
    { id: "r12", nivel: 2,
      enunciado: "Pasa la recta (x − 3)/2 = (y + 1)/(−4) a la forma explícita y = mx + n. Da m y n.",
      check: [{ tipo: "num", etiqueta: "m =", valor: -2 }, { tipo: "num", etiqueta: "n =", valor: 5 }],
      pistas: ["Multiplica en cruz y despeja y."],
      pasos: ["−4(x − 3) = 2(y + 1) → −4x + 12 = 2y + 2 → y = −2x + 5."],
      resultado: "y = −2x + 5" },
    { id: "r13", nivel: 2,
      enunciado: "Halla la perpendicular a r: 3x − 2y + 5 = 0 que pasa por P = (2, −1). Da A, B y C (con A &gt; 0).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 2 }, { tipo: "num", etiqueta: "B =", valor: 3 }, { tipo: "num", etiqueta: "C =", valor: -1 }],
      pistas: ["Perpendicular: se intercambian los coeficientes: 2x + 3y + k = 0."],
      pasos: ["2x + 3y + k = 0; con P: 4 − 3 + k = 0 → k = −1.", "2x + 3y − 1 = 0."],
      resultado: "2x + 3y − 1 = 0" },
    { id: "r14", nivel: 2,
      enunciado: "Calcula el ángulo agudo entre r: y = 2x + 1 y s: y = −x/3 + 4.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 81.87, unidad: "°" },
      pistas: ["tan θ = |m₂ − m₁|/(1 + m₁m₂)."],
      pasos: ["tan θ = |(−1/3 − 2)/(1 − 2/3)| = |(−7/3)/(1/3)| = 7 → θ = 81,87°."],
      resultado: "≈ 81,87°" },
    { id: "r15", nivel: 2,
      enunciado: "Halla k para que 2x + 3y − 1 = 0 y kx − 6y + 5 = 0 sean perpendiculares.",
      check: { tipo: "num", etiqueta: "k =", valor: 9 },
      pistas: ["AA′ + BB′ = 0."],
      pasos: ["2k + 3·(−6) = 0 → k = 9."],
      resultado: "k = 9" },
    { id: "r16", nivel: 2,
      enunciado: "Calcula la distancia entre las rectas paralelas 3x + 4y − 6 = 0 y 3x + 4y + 9 = 0.",
      check: { tipo: "num", etiqueta: "d =", valor: 3 },
      pistas: ["d = |C − C′|/√(A² + B²)."],
      pasos: ["d = |−6 − 9|/√(9 + 16) = 15/5 = 3."],
      resultado: "3" },
    { id: "r17", nivel: 2,
      enunciado: "Halla la mediatriz del segmento de extremos A = (1, 2) y B = (5, 6). Da A, B y C (con A = 1).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 1 }, { tipo: "num", etiqueta: "B =", valor: 1 }, { tipo: "num", etiqueta: "C =", valor: -7 }],
      pistas: ["Pasa por M = (3, 4) y tiene como vector normal AB = (4, 4)."],
      pasos: ["4(x − 3) + 4(y − 4) = 0 → x + y − 7 = 0."],
      resultado: "x + y − 7 = 0" },
    { id: "r18", nivel: 2,
      enunciado: "Halla el simétrico de P = (0, 0) respecto de la recta x + y − 4 = 0. Da sus coordenadas.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["Pie de la perpendicular H y P′ = 2H − P."],
      pasos: ["Perpendicular por P: x − y = 0. Corta a r en H = (2, 2). P′ = 2H − P = (4, 4)."],
      resultado: "(4, 4)" },
    { id: "r19", nivel: 2,
      enunciado: "Halla el punto de corte de r: 2x − y + 1 = 0 y s: x + y − 4 = 0.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 1 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["Resuelve el sistema (suma las dos ecuaciones)."],
      pasos: ["Sumando: 3x − 3 = 0 → x = 1 y y = 3. Comprobación: 2 − 3 + 1 = 0 y 1 + 3 − 4 = 0."],
      resultado: "(1, 3)" },
    { id: "r20", nivel: 2,
      enunciado: "Halla la recta que pasa por P = (2, 3) y es perpendicular al vector n = (3, 1). Da A, B y C.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 3 }, { tipo: "num", etiqueta: "B =", valor: 1 }, { tipo: "num", etiqueta: "C =", valor: -9 }],
      pistas: ["Si n es perpendicular a la recta, n = (A, B): A(x − 2) + B(y − 3) = 0."],
      pasos: ["3(x − 2) + 1·(y − 3) = 0 → 3x + y − 9 = 0."],
      resultado: "3x + y − 9 = 0" },
    { id: "r21", nivel: 2,
      enunciado: "Calcula el área del triángulo que forma la recta 3x + 4y − 12 = 0 con los ejes de coordenadas.",
      check: { tipo: "num", etiqueta: "área =", valor: 6 },
      pistas: ["Halla los cortes con los ejes."],
      pasos: ["Cortes: (4, 0) y (0, 3). Triángulo rectángulo de catetos 4 y 3: área = 4·3/2 = 6."],
      resultado: "6" },
    { id: "r22", nivel: 2,
      enunciado: "Calcula la distancia del punto P = (2, −1) a la recta 5x − 12y + 3 = 0 (decimal).",
      check: { tipo: "num", etiqueta: "d =", valor: 1.9231, tol: 0.002 },
      pistas: ["√(25 + 144) = 13."],
      pasos: ["d = |10 + 12 + 3|/13 = 25/13 ≈ 1,923."],
      resultado: "25/13" },
    { id: "r23", nivel: 2,
      enunciado: "Halla el ortocentro del triángulo A = (0, 0), B = (6, 0), C = (2, 4).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 2 }],
      pistas: ["Altura desde C: perpendicular a AB (vertical). Altura desde A: perpendicular a BC."],
      pasos: ["Altura desde C: x = 2. BC = (−4, 4): pendiente −1; la altura desde A tiene pendiente 1: y = x.", "H = (2, 2)."],
      resultado: "H = (2, 2)" },
    { id: "r24", nivel: 2,
      enunciado: "Halla el circuncentro del mismo triángulo A = (0, 0), B = (6, 0), C = (2, 4).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 3 }, { tipo: "num", etiqueta: "y =", valor: 1 }],
      pistas: ["Mediatriz de AB: x = 3. Mediatriz de AC: por (1, 2), perpendicular a (2, 4)."],
      pasos: ["Mediatriz de AB: x = 3. Mediatriz de AC: 2(x − 1) + 4(y − 2) = 0 → x + 2y − 5 = 0.", "Con x = 3: y = 1. O = (3, 1)."],
      resultado: "O = (3, 1)" },
    // ================= ★★★ nivel PAU =================
    { id: "r25", nivel: 3,
      enunciado: "Halla la recta que pasa por P = (3, 2) y forma con los semiejes positivos un triángulo de área 12. Da A, B y C (con A &gt; 0 y sin factor común).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 2 }, { tipo: "num", etiqueta: "B =", valor: 3 }, { tipo: "num", etiqueta: "C =", valor: -12 }],
      pistas: ["x/a + y/b = 1, con 3/a + 2/b = 1 y ab = 24."],
      pasos: ["3b + 2a = ab = 24 y a = 24/b → 3b + 48/b = 24 → b² − 8b + 16 = 0 → b = 4, a = 6.", "x/6 + y/4 = 1 → 2x + 3y − 12 = 0."],
      resultado: "2x + 3y − 12 = 0" },
    { id: "r26", nivel: 3,
      enunciado: "Un rayo de luz sale de A = (1, 3), se refleja en el espejo y = 0 y pasa por B = (5, 1). ¿En qué punto del espejo rebota? Da su abscisa.",
      check: { tipo: "num", etiqueta: "x =", valor: 4 },
      pistas: ["Usa la imagen de A en el espejo: A′ = (1, −3). La recta A′B corta al espejo en el punto de rebote."],
      pasos: ["A′B: v = (4, 4): y = x − 4. Con y = 0: x = 4. El punto de rebote es (4, 0)."],
      resultado: "(4, 0)" },
    { id: "r27", nivel: 3,
      enunciado: "Halla la bisectriz «con signo +» de 3x + 4y − 5 = 0 y 5x − 12y + 7 = 0, es decir, 13(3x + 4y − 5) = 5(5x − 12y + 7). Da A, B y C (A &gt; 0, sin factor común).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 7 }, { tipo: "num", etiqueta: "B =", valor: 56 }, { tipo: "num", etiqueta: "C =", valor: -50 }],
      pistas: ["Desarrolla: 39x + 52y − 65 = 25x − 60y + 35."],
      pasos: ["14x + 112y − 100 = 0 → dividiendo entre 2: 7x + 56y − 50 = 0."],
      resultado: "7x + 56y − 50 = 0" },
    { id: "r28", nivel: 3,
      enunciado: "Halla los puntos del eje Y que están a distancia 5 de la recta 3x + 4y − 10 = 0. Escribe sus ordenadas.",
      check: { tipo: "lista", etiqueta: "y =", valores: [8.75, -3.75], ph: "dos valores" },
      pistas: ["P = (0, y): |4y − 10|/5 = 5."],
      pasos: ["|4y − 10| = 25 → 4y − 10 = 25 o 4y − 10 = −25 → y = 35/4 = 8,75 o y = −15/4 = −3,75."],
      resultado: "(0; 8,75) y (0; −3,75)" },
    { id: "r29", nivel: 3,
      enunciado: "Las rectas del haz (x + y − 4) + k(x − y) = 0 pasan por el punto (2, 2). ¿Qué valor de k da la que pasa también por (1, 0)?",
      check: { tipo: "num", etiqueta: "k =", valor: 3 },
      pistas: ["Sustituye (1, 0) en la ecuación del haz."],
      pasos: ["(1 + 0 − 4) + k(1 − 0) = 0 → k = 3. La recta: 4x − 2y − 4 = 0, es decir, 2x − y − 2 = 0."],
      resultado: "k = 3" },
    { id: "r30", nivel: 3,
      enunciado: "Calcula la altura desde A = (1, 1) sobre el lado BC del triángulo de vértices B = (7, 1) y C = (4, 5).",
      check: { tipo: "num", etiqueta: "altura =", valor: 4.8 },
      pistas: ["Recta BC: vector director (−3, 4) → 4x + 3y − 31 = 0."],
      pasos: ["BC: 4(x − 7) + 3(y − 1) = 0 → 4x + 3y − 31 = 0.", "h = d(A, BC) = |4 + 3 − 31|/5 = 24/5 = 4,8. (Área = ½·5·4,8 = 12.)"],
      resultado: "4,8" },
    { id: "r31", nivel: 3,
      enunciado: "Halla las pendientes de las rectas que pasan por P = (1, 2) y forman un ángulo de 45° con la recta y = 2x.",
      check: { tipo: "lista", etiqueta: "pendientes:", valores: [-3, 1 / 3], ph: "dos valores" },
      pistas: ["tan 45° = 1 = |(m − 2)/(1 + 2m)|: dos casos, + y −."],
      pasos: ["(m − 2)/(1 + 2m) = 1 → m − 2 = 1 + 2m → m = −3.", "(m − 2)/(1 + 2m) = −1 → m − 2 = −1 − 2m → m = 1/3.", "Rectas: 3x + y − 5 = 0 y x − 3y + 5 = 0."],
      resultado: "m = −3 y m = 1/3" },
    { id: "r32", nivel: 3,
      enunciado: "Deduce la fórmula de la distancia de un punto P = (p₁, p₂) a la recta Ax + By + C = 0 usando el vector normal.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 7, items: [
        { t: "Toma un punto X = (x₀, y₀) de la recta, de modo que Ax₀ + By₀ + C = 0", p: 0.5 },
        { t: "Explica que la distancia es la proyección de XP sobre el vector normal n = (A, B): d = |XP·n|/|n|", p: 0.5 },
        { t: "Calcula XP·n = A(p₁ − x₀) + B(p₂ − y₀) y usa Ax₀ + By₀ = −C", p: 0.5 },
        { t: "Llega a d = |Ap₁ + Bp₂ + C|/√(A² + B²)", p: 0.5 }
      ] },
      pasos: ["XP·n = A(p₁ − x₀) + B(p₂ − y₀) = Ap₁ + Bp₂ − (Ax₀ + By₀) = Ap₁ + Bp₂ + C.", "|n| = √(A² + B²). Por tanto d = |Ap₁ + Bp₂ + C|/√(A² + B²). ∎"],
      resultado: "d = |Ap₁ + Bp₂ + C|/√(A² + B²)" },
    { id: "r33", nivel: 3,
      enunciado: "Demuestra que el lugar geométrico de los puntos X = (x, y) que equidistan de A = (a₁, a₂) y B = (b₁, b₂) es una recta perpendicular a AB que pasa por su punto medio.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe |XA|² = |XB|² y desarrolla las dos distancias", p: 0.5 },
        { t: "Cancela los términos x² e y² y obtiene una ecuación de primer grado en x e y", p: 0.5 },
        { t: "Reordena como 2(b₁ − a₁)x + 2(b₂ − a₂)y = |B|² − |A|², donde (b₁ − a₁, b₂ − a₂) = AB es el vector normal", p: 0.5 },
        { t: "Comprueba que el punto medio la cumple (o que la recta es perpendicular a AB)", p: 0.5 }
      ] },
      pasos: ["(x − a₁)² + (y − a₂)² = (x − b₁)² + (y − b₂)² → −2a₁x − 2a₂y + |A|² = −2b₁x − 2b₂y + |B|².", "2(b₁ − a₁)x + 2(b₂ − a₂)y = |B|² − |A|²: recta con vector normal AB (perpendicular a AB).", "El punto medio M cumple: (b₁ − a₁)(a₁ + b₁) + (b₂ − a₂)(a₂ + b₂) = b₁² − a₁² + b₂² − a₂² = |B|² − |A|². ∎"],
      resultado: "La mediatriz de AB" },
    { id: "r34", nivel: 3,
      enunciado: "En el triángulo A = (0, 0), B = (6, 0), C = (2, 4), comprueba la recta de Euler: calcula el cociente |HG|/|GO| entre las distancias del baricentro al ortocentro y al circuncentro.",
      check: { tipo: "num", etiqueta: "|HG|/|GO| =", valor: 2 },
      pistas: ["G = (8/3, 4/3), H = (2, 2), O = (3, 1)."],
      pasos: ["HG = G − H = (2/3, −2/3) y GO = O − G = (1/3, −1/3).", "HG = 2·GO: la razón es 2."],
      resultado: "2" },
    { id: "r35", nivel: 3,
      enunciado: "Calcula el área de la región definida por x ≥ 0, y ≥ 0 y x + 2y ≤ 8.",
      check: { tipo: "num", etiqueta: "área =", valor: 16 },
      pistas: ["Es un triángulo con vértices en los ejes y en la recta."],
      pasos: ["Vértices: (0, 0), (8, 0) (y = 0 → x = 8) y (0, 4) (x = 0 → y = 4).", "Área = 8·4/2 = 16."],
      resultado: "16" },
    { id: "r36", nivel: 3,
      enunciado: "Halla el simétrico de P = (2, 5) respecto de la recta x − y + 1 = 0. Da sus coordenadas.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["Perpendicular por P: x + y − 7 = 0. Corta a r en H."],
      pasos: ["Perpendicular por P: x + y = 7. Con x − y = −1: 2x = 6 → x = 3, y = 4: H = (3, 4).", "P′ = 2H − P = (6 − 2, 8 − 5) = (4, 3)."],
      resultado: "P′ = (4, 3)" }
  ];

  var lamina = [
    { titulo: "Formas de la ecuación de una recta", ancha: true,
      tabla: { cab: ["Forma", "Ecuación", "Cuándo usarla"], filas: [
        ["Vectorial", "(x, y) = (p₁, p₂) + t(v₁, v₂)", "recorrer puntos"],
        ["Paramétricas", "x = p₁ + tv₁ · y = p₂ + tv₂", "puntos concretos (t = 0, 1, …)"],
        ["Continua", "(x − p₁)/v₁ = (y − p₂)/v₂", "con dos puntos o punto y vector"],
        ["General", "Ax + By + C = 0", "distancias, posiciones"],
        ["Explícita", "y = mx + n", "dibujar, ver la pendiente"],
        ["Punto-pendiente", "y − p₂ = m(x − p₁)", "con punto y pendiente"],
        ["Segmentaria", "x/a + y/b = 1", "cortes con los ejes"]
      ] },
      nota: "Normal (A, B) ⊥ recta · director (−B, A) · pendiente m = −A/B = tan α." },
    { titulo: "Pendiente y ángulo",
      items: [
        { label: "Con dos puntos", formula: "m = " + fr("b₂ − a₂", "b₁ − a₁"), ejemplo: "A = (1, 3), B = (4, 9) → m = 6/3 = 2" },
        { label: "Con el ángulo", formula: "m = tan α", ejemplo: "α = 60° → m = √3 · 135° → m = −1" },
        { label: "Vertical y horizontal", formula: "x = k (sin pendiente) · y = k (m = 0)" }
      ] },
    { titulo: "Posiciones relativas y ángulos",
      tabla: { cab: ["Condición", "Rectas"], filas: [["A/A′ ≠ B/B′", "secantes"], ["A/A′ = B/B′ ≠ C/C′", "paralelas"], ["A/A′ = B/B′ = C/C′", "coincidentes"], ["AA′ + BB′ = 0  ·  m₁m₂ = −1", "perpendiculares"]] },
      items: [{ label: "Ángulo entre rectas", formula: "tan θ = |m₂ − m₁|/(1 + m₁m₂)", cuando: "θ agudo.", ejemplo: "y = x e y = 3x: tan θ = 2/4 → 26,57°" }],
      nota: "Paralela por P: mismo (A, B), C nuevo. Perpendicular por P: Bx − Ay + k = 0." },
    { titulo: "Distancias y mediatriz",
      items: [
        { label: "Entre dos puntos", formula: "d(A, B) = √((b₁ − a₁)² + (b₂ − a₂)²)" },
        { label: "Punto-recta", formula: "d = " + fr("|Ap₁ + Bp₂ + C|", "√(A² + B²)"), ejemplo: "(1, 2) y 3x + 4y − 6 = 0 → 5/5 = 1", ojo: "La recta debe estar en forma general." },
        { label: "Entre paralelas", formula: "d = |C − C′|/√(A² + B²)" },
        { label: "Mediatriz de AB", formula: "pasa por M y es ⊥ AB (normal = AB)" }
      ],
      nota: "Simétrico de P respecto de r: H = pie de la perpendicular; P′ = 2H − P." },
    { titulo: "Puntos notables del triángulo",
      tabla: { cab: ["Punto", "Rectas", "Cálculo"], filas: [["Baricentro G", "medianas", "media de los vértices"], ["Ortocentro H", "alturas", "cortar dos alturas"], ["Circuncentro O", "mediatrices", "cortar dos mediatrices"], ["Incentro I", "bisectrices", "(a·A + b·B + c·C)/(a + b + c)"]] },
      nota: "G, H y O están alineados (recta de Euler) y HG = 2·GO." },
    { titulo: "Áreas y regiones",
      items: [
        { label: "Triángulo", formula: "S = ½·|det(AB, AC)| = ½·base·altura", ejemplo: "A = (0,0), B = (6,0), C = (2,4) → 12" },
        { label: "Semiplano", formula: "Ax + By + C ≥ 0", cuando: "Prueba el origen para elegir el lado.", ojo: "Estricta (<, >): la recta no entra." }
      ],
      nota: "Sistema de inecuaciones = intersección de semiplanos; los vértices son cortes de las rectas." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "En 4x − 3y + 2 = 0, el director es (4, −3)", bien: "El director es (3, 4)", por: "(A, B) es la normal." },
        { mal: "m = Δx/Δy", bien: "m = Δy/Δx", por: "Sube partido por avanza." },
        { mal: "Perpendicular a 3x − 2y + 5 = 0: 3x − 2y + k = 0", bien: "2x + 3y + k = 0", por: "Esa es la paralela." },
        { mal: "Distancia a y = 2x + 1: |2·1 + 1 − 2|/√5", bien: "Pasar a 2x − y + 1 = 0 primero", por: "La fórmula pide la forma general." },
        { mal: "x = 3 tiene pendiente 0", bien: "No tiene pendiente (vertical)", por: "tan 90° no existe." },
        { mal: "Mediatriz = punto medio", bien: "Mediatriz = recta ⊥ AB por M", por: "Es una recta, no un punto." }
      ] }
  ];


  // =====================================================================
  // REFUERZO del tema 8: forma normal y distancia con signo, haz de rectas, programación lineal,
  //                      modelos lineales, incentro y recta de Euler, problemas de examen
  // =====================================================================
  resumen.push(
    "La <b>distancia con signo</b> δ = (Ax₀ + By₀ + C)/√(A² + B²) dice a qué lado de la recta está un punto; el <b>haz</b> r + k·s = 0 da todas las rectas por r ∩ s sin calcular el punto.",
    "En <b>programación lineal</b> el máximo o mínimo de F = ax + by sobre una región poligonal está en un <b>vértice</b>. Las rectas también modelizan costes, tarifas y puntos de equilibrio, y el incentro es el centro de la circunferencia inscrita: I = (aA + bB + cC)/(a + b + c)."
  );

  var nuevas8 = [
    {
      h: "12. Forma normal de Hesse y distancia con signo",
      html:
        "<p>Si dividimos la ecuación general Ax + By + C = 0 entre la longitud del vector normal, N = √(A² + B²), los coeficientes de x e y pasan a ser las componentes de un vector <b>unitario</b>: (A/N)x + (B/N)y + C/N = 0. Escogiendo el signo para que C/N sea negativo se obtiene la <b>forma normal de Hesse</b>: x·cos φ + y·sen φ = p, donde φ es el ángulo del vector normal unitario y <b>p ≥ 0 es la distancia de la recta al origen</b>.</p>" +
        "<p>Lo más útil es lo que ocurre al sustituir un punto cualquiera P = (x₀, y₀) en esa expresión normalizada: se obtiene la <b>distancia con signo</b>:</p>" +
        H.formula("δ(P) = (A·x₀ + B·y₀ + C) / √(A² + B²)") +
        "<p>Su valor absoluto |δ| es la distancia de P a la recta (la fórmula que ya conoces); su <b>signo</b> dice en qué lado está P: positivo en el lado hacia el que apunta el vector normal (A, B) y negativo en el contrario; vale 0 sobre la recta. Con esto:</p>" +
        "<ul><li>Dos puntos están <b>del mismo lado</b> de la recta si δ tiene el mismo signo, y en <b>lados opuestos</b> si los signos son distintos (entonces el segmento que los une corta a la recta).</li>" +
        "<li>Una recta divide el segmento AB (con A y B en lados opuestos) en la razón <b>AP/PB = |δ(A)|/|δ(B)|</b>: los triángulos de las dos distancias son semejantes. Así se halla el punto de corte sin resolver un sistema.</li></ul>" +
        ejemplo("Forma normal y distancias con signo", "Pasa 3x + 4y − 10 = 0 a forma normal y calcula δ(O) y δ(P) para el origen O y P = (4, 3).", [
          "N = √(9 + 16) = 5. Normal: 0,6x + 0,8y − 2 = 0, es decir, <b>0,6x + 0,8y = 2</b>: la recta está a <b>p = 2</b> del origen y el vector normal unitario (0,6; 0,8) forma φ = arctan(4/3) = 53,13° con el eje X.",
          "δ(O) = (0 + 0 − 10)/5 = <b>−2</b> (distancia 2, lado negativo).",
          "δ(P) = (12 + 12 − 10)/5 = <b>2,8</b> (distancia 2,8, lado positivo). Los signos son distintos: O y P están en lados opuestos de la recta."
        ]) +
        ejemplo("Dónde corta una recta a un segmento", "La recta x + y − 6 = 0 corta al segmento de extremos A = (0, 0) y B = (6, 3). Halla el punto de corte sin resolver ningún sistema.", [
          "δ(A) = (0 + 0 − 6)/√2 = −6/√2 y δ(B) = (6 + 3 − 6)/√2 = 3/√2. Signos opuestos: la recta sí corta al segmento.",
          "AP/PB = |δ(A)|/|δ(B)| = 6/3 = 2, es decir, P está a 2/3 del camino de A a B: P = A + (2/3)·AB = (0, 0) + (2/3)(6, 3) = <b>(4, 2)</b>.",
          "Comprobación: 4 + 2 − 6 = 0 ✓ (P está en la recta)."
        ]) +
        ojo("el signo de δ depende de <b>cómo se escribió</b> la ecuación: multiplicar la ecuación por −1 invierte todos los signos. Lo que no cambia es que dos puntos del mismo lado dan el mismo signo y los de lados opuestos, signos distintos."),
    },
    {
      h: "13. Haz de rectas",
      html:
        "<p>Un <b>haz de rectas</b> es una familia de rectas que comparten algo. Hay tres tipos, y todos se describen con un parámetro:</p>" +
        tabla(["Haz", "Ecuación", "Qué comparten"], [
          ["Central (por un punto P)", "y − y₀ = m·(x − x₀) (y la vertical x = x₀)", "pasan por P; varía la pendiente m"],
          ["Por la intersección de r y s", "r + k·s = 0, es decir, (A₁ + kA₂)x + (B₁ + kB₂)y + (C₁ + kC₂) = 0", "pasan por P = r ∩ s; varía k"],
          ["De paralelas", "Ax + By + k = 0", "tienen el mismo vector normal (A, B); varía k"]
        ]) +
        "<p>La ecuación r + k·s = 0 pasa por P = r ∩ s porque en P tanto r como s valen 0, así que r(P) + k·s(P) = 0 para <b>cualquier</b> k. Su gran utilidad: obtener rectas que pasan por la intersección de r y s <b>sin calcular ese punto</b>. Elige el tipo de haz, mueve k y arrastra Q:</p>" +
        w("haz") +
        ejemplo("La recta del haz que pasa por un punto", "Halla la recta que pasa por la intersección de r: 2x − y − 1 = 0 y s: x + 2y − 8 = 0 y por Q = (1, 0).", [
          "Haz: (2x − y − 1) + k(x + 2y − 8) = 0. Sustituimos Q: r(Q) = 2 − 0 − 1 = 1 y s(Q) = 1 − 8 = −7, luego 1 − 7k = 0 → <b>k = 1/7</b>.",
          "(2x − y − 1) + (1/7)(x + 2y − 8) = 0. Multiplicando por 7: 15x − 5y − 15 = 0 → <b>3x − y − 3 = 0</b>.",
          "Comprobación: las rectas se cortan en P = (2, 3) y 3·2 − 3 − 3 = 0 ✓; y Q: 3·1 − 0 − 3 = 0 ✓."
        ]) +
        ejemplo("Una recta del haz con una condición de paralelismo", "De ese mismo haz, ¿cuál es paralela a 3x + y − 7 = 0?", [
          "La recta del haz es (2 + k)x + (−1 + 2k)y + (−1 − 8k) = 0, con vector normal (2 + k, −1 + 2k).",
          "Paralela a 3x + y − 7 = 0 ⇔ normales proporcionales: (2 + k)/(−1 + 2k) = 3/1 → 2 + k = −3 + 6k → 5 = 5k → <b>k = 1</b>.",
          "La recta es 3x + y − 9 = 0. Comprobación: pasa por P = (2, 3): 6 + 3 − 9 = 0 ✓."
        ]) +
        ejemplo("Tres rectas concurrentes", "¿Para qué valor de m se cortan en un mismo punto las rectas x + y − 4 = 0, x − y = 0 y mx + y − 6 = 0?", [
          "Las dos primeras se cortan en P = (2, 2) (de x + y = 4 y x = y). Para que la tercera pase por P: m·2 + 2 − 6 = 0 → <b>m = 2</b>.",
          "Con el haz: la tercera debe ser proporcional a (x + y − 4) + k(x − y) = (1 + k)x + (1 − k)y − 4. Para pasar el término independiente de −4 a −6 se multiplica por 3/2, y (3/2)(1 − k) = 1 da k = 1/3, con lo que m = (3/2)(1 + 1/3) = 2 ✓."
        ]) +
        ejemplo("Un haz de paralelas", "Halla las rectas paralelas a 3x + 4y − 1 = 0 que distan 2 de ella.", [
          "Las paralelas son 3x + 4y + k = 0. La distancia entre 3x + 4y − 1 = 0 y 3x + 4y + k = 0 es |k − (−1)|/√(9 + 16) = |k + 1|/5.",
          "|k + 1|/5 = 2 → k + 1 = ±10 → <b>k = 9 o k = −11</b>: las rectas 3x + 4y + 9 = 0 y 3x + 4y − 11 = 0 (una a cada lado de la dada)."
        ]) +
        ojo("el haz r + k·s = 0 contiene <b>todas las rectas por P salvo s</b> (para llegar a s habría que hacer k → ∞). Si el problema pide una recta del haz y no sale para ningún k, prueba con s. Por ejemplo, la perpendicular a y = 2x dentro del haz anterior es precisamente s: x + 2y − 8 = 0. Para no perder ninguna se escribe λ·r + μ·s = 0 con (λ, μ) ≠ (0, 0)."),
    },
    {
      h: "14. Programación lineal: optimizar en una región",
      html:
        "<p>Muchos problemas de la vida real piden lo mejor posible (máximo beneficio, mínimo coste) con recursos limitados. Si todas las condiciones son <b>lineales</b>, es un problema de <b>programación lineal</b>, y se resuelve con lo que sabes de rectas y semiplanos. Hay cuatro ingredientes:</p>" +
        "<ul><li><b>Variables</b> x e y (lo que se decide: unidades de cada producto).</li>" +
        "<li><b>Restricciones</b>: inecuaciones lineales (recursos disponibles, mínimos exigidos y x ≥ 0, y ≥ 0).</li>" +
        "<li><b>Región factible</b>: la intersección de todos los semiplanos. Es un polígono convexo (puede ser no acotado o vacío).</li>" +
        "<li><b>Función objetivo</b> F(x, y) = ax + by, lo que se quiere maximizar o minimizar.</li></ul>" +
        "<p>La clave: las rectas ax + by = k (<b>rectas de nivel</b>) son paralelas entre sí y F crece al desplazarlas en un sentido. Si se mueve la recta de nivel hasta el último punto de la región que toca, ese punto es el óptimo, y <b>siempre está en un vértice</b> (o en todo un lado, si la recta de nivel es paralela a él). Por eso basta calcular F en los vértices. Prueba los cuatro problemas del simulador y mueve el nivel:</p>" +
        w("proglineal") +
        "<h5>Método</h5>" +
        "<ol><li>Definir las variables y escribir la función objetivo.</li><li>Escribir las restricciones (sin olvidar x ≥ 0, y ≥ 0).</li><li>Dibujar la región factible (probando un punto en cada inecuación).</li><li>Hallar los vértices: intersecciones de pares de rectas que cumplen todas las restricciones.</li><li>Evaluar F en cada vértice y quedarse con el mayor (o el menor).</li><li>Responder con el contexto del problema: cuántas unidades y qué valor.</li></ol>" +
        ejemplo("Un problema de máximo", "Un agricultor dispone de 12 ha para trigo (x) y maíz (y), 18 h de trabajo (2 h por ha de trigo, 1 h por ha de maíz) y debe sembrar al menos 2 ha de trigo. El beneficio es de 400 € por ha de trigo y 300 € por ha de maíz. ¿Cuánto debe sembrar para ganar lo máximo?", [
          "Restricciones: x + y ≤ 12 (terreno), 2x + y ≤ 18 (horas), x ≥ 2, y ≥ 0. Objetivo: maximizar F = 4x + 3y (en centenas de euros).",
          "Vértices de la región: (2, 0) [x = 2 con y = 0]; (9, 0) [y = 0 con 2x + y = 18]; (6, 6) [x + y = 12 con 2x + y = 18: restando, x = 6]; (2, 10) [x = 2 con x + y = 12].",
          "F(2, 0) = 8, F(9, 0) = 36, <b>F(6, 6) = 42</b>, F(2, 10) = 38.",
          "<b>Máximo en (6, 6)</b>: sembrar 6 ha de trigo y 6 de maíz, con un beneficio de 4 200 €. Comprobación: 6 + 6 = 12 ✓ y 2·6 + 6 = 18 ✓ (usa todo el terreno y todas las horas)."
        ]) +
        ejemplo("Un problema de mínimo con región no acotada", "Se mezclan x kg de un pienso A (3 €/kg) y y kg de un pienso B (4 €/kg). La mezcla debe aportar al menos 12 unidades de proteína (A aporta 2 por kg y B, 1) y al menos 9 de fibra (A aporta 1 por kg y B, 2). ¿Cuál es la mezcla más barata?", [
          "Restricciones: 2x + y ≥ 12, x + 2y ≥ 9, x ≥ 0, y ≥ 0. Objetivo: minimizar F = 3x + 4y.",
          "La región es <b>no acotada</b> (se extiende hacia arriba y a la derecha), pero F ≥ 0 crece al alejarse, así que el mínimo existe y está en un vértice.",
          "Vértices: (0, 12) [x = 0 con 2x + y = 12]; (9, 0) [y = 0 con x + 2y = 9]; (5, 2) [2x + y = 12 con x + 2y = 9: x = 5, y = 2]. (En (6, 0) no se cumple la fibra: 6 &lt; 9.)",
          "F(0, 12) = 48, F(9, 0) = 27, <b>F(5, 2) = 23</b>. <b>Mezcla más barata: 5 kg de A y 2 kg de B, por 23 €.</b>"
        ]) +
        ejemplo("Del enunciado al sistema", "Una panadería hace tartas grandes (x) y pequeñas (y). Cada grande necesita 3 kg de harina y 2 h de horno; cada pequeña, 1 kg y 1 h. Hay 30 kg de harina y 22 h de horno. Gana 5 € por grande y 2 € por pequeña. Plantea el problema y resuélvelo.", [
          "Restricciones: 3x + y ≤ 30 (harina), 2x + y ≤ 22 (horno), x ≥ 0, y ≥ 0. Objetivo: maximizar F = 5x + 2y.",
          "Vértices: (0, 0); (10, 0) [harina con y = 0]; (0, 22) [horno con x = 0; cumple 22 ≤ 30]; (8, 6) [3x + y = 30 y 2x + y = 22: restando, x = 8, y = 6].",
          "F(0, 0) = 0, F(10, 0) = 50, F(0, 22) = 44, <b>F(8, 6) = 52</b>.",
          "<b>Máximo en (8, 6)</b>: 8 tartas grandes y 6 pequeñas, con 52 € de beneficio. (Fíjate: no es el vértice con mayor x ni con mayor y; hay que comparar todos.)"
        ]) +
        "<h5>Casos especiales</h5>" +
        "<ul><li><b>Infinitas soluciones</b>: si las rectas de nivel son paralelas a un lado de la región (F proporcional a una restricción), todos los puntos de ese lado son óptimos. Ocurre en el simulador con F = x + y.</li>" +
        "<li><b>Sin solución</b>: si las restricciones se contradicen, la región es vacía (por ejemplo x + y ≤ 2 y x + y ≥ 5).</li>" +
        "<li><b>Sin óptimo</b>: si la región no está acotada y F mejora hacia el infinito (por ejemplo, maximizar x + y con x + y ≥ 3), no hay máximo.</li></ul>" +
        ojo("el óptimo no está «en el centro» de la región ni se encuentra evaluando F en un punto interior: siempre en un vértice. Y si una región es no acotada, comprueba hacia dónde crece F antes de afirmar que existe un máximo."),
    },
    {
      h: "15. Rectas que modelizan: costes, tarifas y puntos de equilibrio",
      html:
        "<p>Una magnitud que cambia a ritmo constante se describe con una recta: <b>y = m·x + n</b>. La pendiente m es lo que aumenta y por cada unidad de x (precio por unidad, velocidad, litros por hora…) y la ordenada n el valor inicial o «cuota fija». Para obtener el modelo basta una recta que pase por dos datos.</p>" +
        ejemplo("Una recta por dos datos", "Un depósito tiene 300 L a las 2 h y 600 L a las 5 h de empezar a llenarse con un grifo de caudal constante. Halla la función V(t), interpreta m y n, y calcula cuándo llegará a 1 000 L.", [
          "m = (600 − 300)/(5 − 2) = 100 L/h: el caudal del grifo. V(t) = 100t + n con V(2) = 300 → n = 300 − 200 = 100.",
          "<b>V(t) = 100t + 100</b>: el depósito ya tenía 100 L (la ordenada en el origen) y entran 100 L cada hora.",
          "V(t) = 1 000 → 100t = 900 → <b>t = 9 h</b>."
        ]) +
        "<p>Cuando se comparan dos opciones lineales, el <b>punto de corte</b> de sus rectas marca el cambio de la mejor. En una empresa, el <b>coste</b> es C(x) = costes fijos + (coste por unidad)·x y el <b>ingreso</b> es I(x) = (precio)·x: el <b>punto de equilibrio</b> es donde C(x) = I(x), y el beneficio es B(x) = I(x) − C(x). Mueve los datos:</p>" +
        w("equilibrio") +
        ejemplo("El punto de equilibrio de un taller", "Un taller tiene unos costes fijos de 3 000 € y cada pieza cuesta 12 € de material y se vende a 20 €. ¿A partir de cuántas piezas gana dinero? ¿Y cuánto gana con 500?", [
          "C(x) = 3 000 + 12x e I(x) = 20x. B(x) = 20x − 3 000 − 12x = 8x − 3 000.",
          "Equilibrio: 8x = 3 000 → <b>x* = 375 piezas</b> (con ingresos y costes de 7 500 €). Con más de 375 piezas hay beneficio.",
          "Con x = 500: B = 8·500 − 3 000 = <b>1 000 €</b>. Con x = 300 sería B = −600 € (pérdidas)."
        ]) +
        ejemplo("Dos tarifas de móvil", "La tarifa A cobra 8 € al mes más 0,06 €/min y la tarifa B, 3 € al mes más 0,10 €/min. ¿Cuándo compensa cada una?", [
          "Costes: A(x) = 8 + 0,06x y B(x) = 3 + 0,10x. Se igualan: 8 + 0,06x = 3 + 0,10x → 5 = 0,04x → <b>x = 125 min</b> (a los 125 minutos las dos cuestan 15,50 €).",
          "Para x &lt; 125, la más barata es la B (su cuota fija es menor y todavía no pesa su mayor precio por minuto); para x &gt; 125, la <b>A</b>, que tiene menor pendiente.",
          "Regla práctica: la tarifa de menor pendiente gana cuando se usa mucho; la de menor ordenada en el origen, cuando se usa poco."
        ]) +
        ojo("un modelo lineal solo vale <b>dentro del rango</b> en que se ha medido. <b>Interpolar</b> (calcular entre los datos) suele ser fiable; <b>extrapolar</b> (salirse de los datos) puede dar disparates: si la estatura de un niño crece 6 cm al año, a los 40 años mediría más de 3 m. Y fíjate en las unidades: m = 100 L/h y n = 100 L no son comparables."),
    },
    {
      h: "16. Incentro, circunferencia inscrita y recta de Euler",
      html:
        "<p>El <b>incentro</b> I es el punto donde se cortan las tres bisectrices; equidista de los tres lados y es el centro de la <b>circunferencia inscrita</b>. Se puede calcular sin resolver sistemas. Con a = |BC|, b = |CA| y c = |AB| (cada lado lleva la letra del vértice opuesto):</p>" +
        H.formula("I = (a·A + b·B + c·C) / (a + b + c)          r = Área / s,  con s = (a + b + c)/2") +
        "<p>(Es una media ponderada de los vértices, como el centro de masas del tema de vectores, pero con los lados como «masas»: el vértice opuesto al lado más largo pesa más.) El radio r de la circunferencia inscrita es la distancia de I a cada lado y vale Área/s (porque Área = ½·perímetro·r). Solo coincide con el baricentro si el triángulo es equilátero.</p>" +
        ejemplo("Incentro de un triángulo rectángulo", "Calcula el incentro y el radio de la circunferencia inscrita en el triángulo A = (0, 0), B = (4, 0), C = (0, 3).", [
          "a = |BC| = 5, b = |CA| = 3, c = |AB| = 4. Perímetro 12.",
          "I = (5·(0, 0) + 3·(4, 0) + 4·(0, 3))/12 = (12, 12)/12 = <b>(1, 1)</b>.",
          "Área = ½·4·3 = 6 y s = 6, luego <b>r = 6/6 = 1</b>. Comprobación: la distancia de I a la hipotenusa 3x + 4y − 12 = 0 es |3 + 4 − 12|/5 = 1 ✓ y a los catetos (los ejes) también es 1 ✓. (En un triángulo rectángulo r = (b + c − a)/2 = (3 + 4 − 5)/2 = 1.)"
        ]) +
        "<h5>La recta de Euler</h5>" +
        "<p>En todo triángulo, el circuncentro O, el baricentro G y el ortocentro H están alineados, y G divide al segmento OH en la razón 1 : 2 (OG = ½·GH). Con vectores se comprueba en una línea: G = (A + B + C)/3 y H = A + B + C − 2·O, es decir, <b>H = 3G − 2O</b>. Casos curiosos: en un triángulo equilátero los tres puntos coinciden; en un triángulo rectángulo, H es el vértice del ángulo recto y O el punto medio de la hipotenusa.</p>" +
        ejemplo("Comprobar la recta de Euler", "En el triángulo A = (0, 0), B = (8, 0), C = (2, 6) halla O, G y H y comprueba que están alineados.", [
          "<b>G</b> = ((0 + 8 + 2)/3, (0 + 0 + 6)/3) = (10/3, 2).",
          "<b>O</b>: la mediatriz de AB es x = 4. Con |OA| = |OC|: 16 + y² = (4 − 2)² + (y − 6)² = 4 + y² − 12y + 36 → 12y = 24 → y = 2. <b>O = (4, 2)</b>.",
          "<b>H</b> = 3G − 2O = (10 − 8, 6 − 4) = <b>(2, 2)</b>. Comprobación: la altura desde C es x = 2 ✓ y la altura desde A (perpendicular a BC = (−6, 6), de pendiente −1) es y = x, que corta a x = 2 en (2, 2) ✓.",
          "Los tres puntos están en la recta <b>y = 2</b>. Distancias: |OG| = 2/3 y |GH| = 4/3 (GH = 2·OG ✓)."
        ])
    },
    {
      h: "17. Problemas de examen resueltos",
      html:
        "<p>Cinco problemas del estilo de la prueba de acceso, con el desarrollo que se pide en un examen.</p>" +
        ejemplo("Problema 1 · Un triángulo", "Sea el triángulo de vértices A = (−2, 0), B = (4, 0) y C = (0, 4). (a) Halla las ecuaciones generales de sus lados. (b) Calcula el área. (c) Halla la altura desde A (recta y longitud). (d) Halla la mediatriz del lado BC.", [
          "(a) AB: y = 0. BC: pasa por (4, 0) y (0, 4): x + y − 4 = 0. AC: pasa por (−2, 0) y (0, 4), pendiente 2: 2x − y + 4 = 0.",
          "(b) Base AB = 6 y altura (la de C) = 4: área = ½·6·4 = <b>12</b>.",
          "(c) La altura desde A es perpendicular a BC (normal (1, 1)), luego tiene dirección (1, 1): y = x + 2. Corta a BC en x + (x + 2) = 4 → x = 1: pie D = (1, 3). Longitud = |AD| = |(3, 3)| = 3√2 ≈ <b>4,24</b> (también: 2·área/|BC| = 24/(4√2) = 3√2 ✓).",
          "(d) Punto medio de BC: M = (2, 2). La mediatriz es perpendicular a BC, luego tiene la dirección de su normal (1, 1) y pasa por M: y − 2 = x − 2 → <b>x − y = 0</b>."
        ]) +
        ejemplo("Problema 2 · Una recta a distancia dada", "Halla las rectas que pasan por P = (2, 1) y están a distancia 2 del origen.", [
          "La recta vertical x = 2 pasa por P y su distancia al origen es 2: <b>es una solución</b> (no se ve con la forma y = mx + n, ¡cuidado!).",
          "Las demás: y − 1 = m(x − 2) → mx − y + 1 − 2m = 0. Distancia al origen: |1 − 2m|/√(m² + 1) = 2 → (1 − 2m)² = 4(m² + 1) → 1 − 4m + 4m² = 4m² + 4 → −4m = 3 → m = −3/4.",
          "y − 1 = −(3/4)(x − 2) → 3x + 4y − 10 = 0: <b>segunda solución</b>. Comprobación: |−10|/5 = 2 ✓ y 3·2 + 4·1 − 10 = 0 ✓."
        ]) +
        ejemplo("Problema 3 · Rectas tangentes (avance de circunferencias)", "Halla los valores de k para que la recta 3x + 4y + k = 0 sea tangente a la circunferencia de centro (1, 2) y radio 3.", [
          "Una recta es tangente a una circunferencia cuando la distancia del centro a la recta es igual al radio.",
          "d = |3·1 + 4·2 + k|/√(9 + 16) = |11 + k|/5 = 3 → |11 + k| = 15.",
          "11 + k = 15 → <b>k = 4</b>; 11 + k = −15 → <b>k = −26</b>. Hay dos tangentes (paralelas, una a cada lado del centro)."
        ]) +
        ejemplo("Problema 4 · Programación lineal", "Un taller fabrica sillas y mesas. Cada silla necesita 2 h de carpintería y 1 h de pintura y deja 30 € de beneficio; cada mesa, 3 h de carpintería y 2 h de pintura y deja 50 €. Se dispone al mes de 120 h de carpintería y 70 h de pintura. (a) Plantea el sistema y dibuja la región. (b) ¿Cuántas sillas y mesas conviene fabricar?", [
          "(a) x sillas, y mesas: 2x + 3y ≤ 120 (carpintería), x + 2y ≤ 70 (pintura), x ≥ 0, y ≥ 0. La región es un cuadrilátero con vértices (0, 0), (60, 0), (30, 20) y (0, 35) [(30, 20) sale de 2x + 3y = 120 y x + 2y = 70: x = 70 − 2y → 140 − 4y + 3y = 120 → y = 20, x = 30].",
          "(b) F = 30x + 50y: F(0, 0) = 0; F(60, 0) = 1 800; <b>F(30, 20) = 1 900</b>; F(0, 35) = 1 750.",
          "Conviene fabricar <b>30 sillas y 20 mesas</b>, con un beneficio de 1 900 € al mes."
        ]) +
        ejemplo("Problema 5 · Bisectrices de rectas perpendiculares", "Halla las bisectrices de los ángulos que forman r: 3x − 4y + 1 = 0 y s: 4x + 3y − 2 = 0.", [
          "Las rectas son perpendiculares (3·4 + (−4)·3 = 0) y se cortan en P = (1/5, 2/5). Las bisectrices son los puntos que equidistan de r y de s: |3x − 4y + 1|/5 = |4x + 3y − 2|/5.",
          "Con signo +: 3x − 4y + 1 = 4x + 3y − 2 → <b>x + 7y − 3 = 0</b>. Con signo −: 3x − 4y + 1 = −4x − 3y + 2 → <b>7x − y − 1 = 0</b>.",
          "Comprobación: P cumple ambas (1/5 + 14/5 − 3 = 0 y 7/5 − 2/5 − 1 = 0) y las bisectrices son perpendiculares entre sí: (1, 7)·(7, −1) = 0 ✓. Como siempre, las dos bisectrices son perpendiculares."
        ])
    }
  ];
  nuevas.splice(nuevas.length - 2, 0, nuevas8[0], nuevas8[1], nuevas8[2], nuevas8[3], nuevas8[4], nuevas8[5]);

  // actividades nuevas
  datos.tipoHaz = {
    titulo: "¿Qué tipo de haz es?",
    consigna: "Clasifica cada familia de rectas.",
    categorias: ["Central (pasan por un punto)", "Por la intersección de r y s", "De paralelas"],
    items: [
      { t: "y − 3 = m(x − 1), con m variable", c: 0 }, { t: "2x + 3y + k = 0", c: 2 }, { t: "(x + y − 2) + k(x − y) = 0", c: 1 },
      { t: "Todas las rectas que pasan por (0, 0)", c: 0 }, { t: "Todas las rectas de pendiente 3", c: 2 }, { t: "Rectas por el punto de corte de dos rectas dadas", c: 1 }
    ]
  };
  datos.ordenPL = {
    titulo: "Resolver un problema de programación lineal",
    consigna: "Ordena los pasos del método.",
    items: [
      { t: "Definir las variables y la función objetivo", nota: "F = ax + by: lo que se quiere maximizar o minimizar." },
      { t: "Escribir las restricciones como inecuaciones", nota: "Sin olvidar x ≥ 0 e y ≥ 0." },
      { t: "Dibujar la región factible", nota: "Se prueba un punto en cada semiplano." },
      { t: "Calcular los vértices de la región", nota: "Intersección de pares de rectas que cumplan todas las restricciones." },
      { t: "Evaluar F en cada vértice y elegir el mayor o el menor" },
      { t: "Interpretar el resultado en el contexto del problema", nota: "Cuántas unidades y qué beneficio (o coste)." }
    ]
  };
  nuevas8[1].html += w("clasificar", "tipoHaz");
  nuevas8[2].html += "<p>Practica el orden del método:</p>" + w("orden", "ordenPL");

  // preguntas nuevas de «¿Qué falla aquí?» y del test
  datos.errores.preguntas.push(
    { q: "En un problema de programación lineal, un alumno evalúa F = 4x + 3y en el centro de la región, (4, 3), y dice que ahí está el máximo. ¿Qué falla?",
      op: ["Nada: el centro es el mejor punto", "El máximo (si existe) está siempre en un <b>vértice</b>: hay que calcular F en todos los vértices y comparar", "El máximo está siempre en el origen", "Hay que evaluar solo el vértice con mayor x"], ok: 1,
      porque: "F es lineal: sobre un segmento crece o decrece de forma constante, así que no puede tener un máximo en el interior; se alcanza en un vértice (o en un lado entero)." },
    { q: "Para la recta del haz (x + y − 4) + k(x − y) = 0 que pasa por Q = (1, 0), un alumno escribe: r(Q) = −3, luego k = −3. ¿Qué falla?",
      op: ["Nada", "Hay que resolver −3 + k·s(Q) = 0 con s(Q) = 1: k = <b>3</b>, no −3", "k debe ser 0", "No existe tal recta"], ok: 1,
      porque: "Al sustituir Q: r(Q) + k·s(Q) = 0 → k = −r(Q)/s(Q) = −(−3)/1 = 3. Se había olvidado pasar r(Q) al otro lado." },
    { q: "Un alumno dice que el incentro de cualquier triángulo es el baricentro, porque ambos son «el centro» del triángulo. ¿Qué falla?",
      op: ["Nada", "Solo coinciden en un triángulo equilátero: el incentro es I = (aA + bB + cC)/(a + b + c), con los lados como pesos", "El incentro es el ortocentro", "El baricentro es el punto de las mediatrices"], ok: 1,
      porque: "Con A = (0, 0), B = (4, 0), C = (0, 3): incentro (1, 1), baricentro (4/3, 1). Son puntos distintos." }
  );
  datos.quiz1.preguntas.push(
    { q: "Los puntos P y Q dan δ(P) = 3 y δ(Q) = −2 al sustituir en la ecuación normalizada de una recta. Entonces…", op: ["están en lados opuestos de la recta", "están en el mismo lado", "P está sobre la recta", "la recta es paralela a PQ"], ok: 0, porque: "Los signos distintos indican lados opuestos: el segmento PQ corta a la recta." },
    { q: "La ecuación r + k·s = 0 (con r y s secantes) representa…", op: ["las rectas que pasan por el punto r ∩ s (salvo s)", "las rectas paralelas a r", "las rectas perpendiculares a s", "la bisectriz de r y s"], ok: 0, porque: "En el punto de corte r = s = 0, así que r + k·s = 0 para todo k: es el haz de rectas por ese punto." },
    { q: "En un problema de programación lineal con región acotada, el máximo de F = ax + by se alcanza…", op: ["en un vértice de la región", "siempre en el origen", "en el centro de la región", "en un punto cualquiera del interior"], ok: 0, porque: "Las rectas de nivel de F son paralelas y el último punto de la región que tocan es un vértice (o un lado entero)." },
    { q: "Con C(x) = 3 000 + 12x e I(x) = 20x, el punto de equilibrio es…", op: ["x = 375", "x = 150", "x = 250", "x = 3 000"], ok: 0, porque: "20x = 3 000 + 12x → 8x = 3 000 → x = 375." },
    { q: "El incentro de un triángulo es la intersección de…", op: ["las bisectrices", "las mediatrices", "las alturas", "las medianas"], ok: 0, porque: "Equidista de los tres lados: es el centro de la circunferencia inscrita." },
    { q: "La recta de Euler de un triángulo contiene…", op: ["el circuncentro, el baricentro y el ortocentro", "el incentro y el baricentro", "los tres vértices", "los puntos medios de los lados"], ok: 0, porque: "O, G y H están alineados y G divide a OH en razón 1 : 2." }
  );

  // ejercicios nuevos (r37–r49)
  ejercicios.push(
    // ---------- ★ ----------
    { id: "r37", nivel: 1,
      enunciado: "Para la recta 5x − 12y − 39 = 0, calcula la distancia del origen a la recta y la distancia con signo δ del punto P = (8, 0) (usa δ = (Ax₀ + By₀ + C)/√(A² + B²); da el valor con signo, en decimales).",
      check: [{ tipo: "num", etiqueta: "distancia al origen =", valor: 3 }, { tipo: "num", etiqueta: "δ(P) =", valor: 0.07692, tol: 0.002 }],
      pistas: ["√(A² + B²) = 13. La distancia del origen es |C|/13."],
      pasos: ["N = √(25 + 144) = 13. Distancia del origen: |−39|/13 = 3.", "δ(P) = (5·8 − 12·0 − 39)/13 = 1/13 ≈ 0,0769 (positivo: P está en el lado hacia el que apunta (5, −12))."],
      resultado: "p = 3; δ(P) = 1/13 ≈ 0,077" },
    { id: "r38", nivel: 1,
      enunciado: "La temperatura en °F es función lineal de la temperatura en °C, con F = 32 para C = 0 y F = 212 para C = 100. ¿Cuántos °F son 37 °C?",
      check: { tipo: "num", etiqueta: "F =", valor: 98.6, unidad: "°F" },
      pistas: ["Pendiente = (212 − 32)/(100 − 0)."],
      pasos: ["m = 180/100 = 1,8 y n = 32: F = 1,8·C + 32.", "F(37) = 1,8·37 + 32 = 66,6 + 32 = 98,6 °F."],
      resultado: "98,6 °F" },
    { id: "r39", nivel: 1,
      enunciado: "Para la recta 2x − y + 3 = 0, ¿cómo están situados los puntos P = (1, 1) y Q = (−2, 1)?",
      check: { tipo: "opcion", etiqueta: "P y Q están", opciones: ["en lados opuestos de la recta", "en el mismo lado (el positivo)", "en el mismo lado (el negativo)", "uno de ellos está sobre la recta"], ok: 0 },
      pistas: ["Calcula 2x − y + 3 en cada punto y compara los signos."],
      pasos: ["P: 2·1 − 1 + 3 = 4 &gt; 0. Q: 2·(−2) − 1 + 3 = −2 &lt; 0.", "Los signos son distintos: lados opuestos."],
      resultado: "en lados opuestos" },
    // ---------- ★★ ----------
    { id: "r40", nivel: 2,
      enunciado: "Halla la recta que pasa por la intersección de r: x + y − 3 = 0 y s: 2x − y = 0 y por el punto Q = (0, 5). Da A, B y C con A &gt; 0 y sin factor común.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 3 }, { tipo: "num", etiqueta: "B =", valor: 1 }, { tipo: "num", etiqueta: "C =", valor: -5 }],
      pistas: ["Haz: (x + y − 3) + k(2x − y) = 0 y sustituye Q."],
      pasos: ["Con Q: (0 + 5 − 3) + k(0 − 5) = 0 → 2 − 5k = 0 → k = 2/5.", "(x + y − 3) + (2/5)(2x − y) = 0 → 5x + 5y − 15 + 4x − 2y = 0 → 9x + 3y − 15 = 0 → 3x + y − 5 = 0.", "Comprobación: r ∩ s = (1, 2) y 3 + 2 − 5 = 0 ✓."],
      resultado: "3x + y − 5 = 0" },
    { id: "r41", nivel: 2,
      enunciado: "Calcula el incentro (x, y) y el radio r de la circunferencia inscrita en el triángulo A = (−3, 0), B = (3, 0), C = (0, 4).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 0 }, { tipo: "num", etiqueta: "y =", valor: 1.5 }, { tipo: "num", etiqueta: "r =", valor: 1.5 }],
      pistas: ["Lados: a = |BC|, b = |CA|, c = |AB|. I = (aA + bB + cC)/(a + b + c) y r = Área/s."],
      pasos: ["a = 5, b = 5, c = 6; perímetro 16.", "I = (5·A + 5·B + 6·C)/16 = ((−15 + 15 + 0), (0 + 0 + 24))/16 = (0; 1,5).", "Área = ½·6·4 = 12 y s = 8 → r = 12/8 = 1,5."],
      resultado: "I = (0; 1,5), r = 1,5" },
    { id: "r42", nivel: 2,
      enunciado: "La recta 2x − y − 4 = 0 corta al segmento de extremos A = (0, 0) y B = (6, 2). Halla el punto de corte usando distancias con signo.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2.4 }, { tipo: "num", etiqueta: "y =", valor: 0.8 }],
      pistas: ["δ(A) ∝ 2·0 − 0 − 4 y δ(B) ∝ 2·6 − 2 − 4. AP/PB = |δ(A)|/|δ(B)|."],
      pasos: ["Valores sin normalizar: A: −4; B: 12 − 2 − 4 = 6. Signos opuestos.", "AP/PB = 4/6 = 2/3 → AP = (2/5)·AB.", "P = (2/5)(6, 2) = (2,4; 0,8). Comprobación: 4,8 − 0,8 − 4 = 0 ✓."],
      resultado: "P = (2,4; 0,8)" },
    { id: "r43", nivel: 2,
      enunciado: "Una compañía A cobra 12 € fijos más 0,05 €/min y otra B, 5 € fijos más 0,10 €/min. ¿A partir de cuántos minutos compensa más la A? ¿Cuánto cuesta entonces cada una?",
      check: [{ tipo: "num", etiqueta: "minutos =", valor: 140 }, { tipo: "num", etiqueta: "coste =", valor: 19, unidad: "€" }],
      pistas: ["Iguala 12 + 0,05x = 5 + 0,10x."],
      pasos: ["12 + 0,05x = 5 + 0,10x → 7 = 0,05x → x = 140 min.", "Coste: 12 + 0,05·140 = 19 € (y 5 + 0,10·140 = 19 €).", "Para más de 140 min es más barata la A (menor pendiente)."],
      resultado: "140 min; 19 €" },
    { id: "r44", nivel: 2,
      enunciado: "¿Para qué valor de m se cortan en un mismo punto las rectas x − 2y + 3 = 0, 2x + y − 4 = 0 y 3x + my − 5 = 0?",
      check: { tipo: "num", etiqueta: "m =", valor: 1 },
      pistas: ["Halla el punto de corte de las dos primeras y exige que la tercera pase por él."],
      pasos: ["x − 2y = −3 y 2x + y = 4 → y = 4 − 2x → x − 8 + 4x = −3 → x = 1, y = 2.", "Tercera: 3·1 + 2m − 5 = 0 → 2m = 2 → m = 1."],
      resultado: "m = 1" },
    // ---------- ★★★ ----------
    { id: "r45", nivel: 3,
      enunciado: "Halla la recta simétrica de r: 2x − y + 1 = 0 respecto de s: x + y − 2 = 0. Da A, B y C con A &gt; 0 y sin factor común.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 1 }, { tipo: "num", etiqueta: "B =", valor: -2 }, { tipo: "num", etiqueta: "C =", valor: 3 }],
      pistas: ["La simetría respecto de x + y = 2 lleva (x, y) en (2 − y, 2 − x). La recta simétrica es el conjunto de las imágenes."],
      pasos: ["Un punto (x', y') de la simétrica viene de (x, y) = (2 − y', 2 − x') de r: 2(2 − y') − (2 − x') + 1 = 0.", "4 − 2y' − 2 + x' + 1 = 0 → x' − 2y' + 3 = 0.", "Comprobación: r ∩ s = (1/3, 5/3) está en la simétrica: 1/3 − 10/3 + 3 = 0 ✓."],
      resultado: "x − 2y + 3 = 0" },
    { id: "r46", nivel: 3,
      enunciado: "Un taller fabrica x mesas e y sillas. Cada mesa necesita 4 h de carpintería y 2 h de barnizado; cada silla, 2 h y 3 h. Hay 40 h de carpintería y 36 h de barnizado. Gana 60 € por mesa y 40 € por silla. Halla cuántas de cada fabricar para el máximo beneficio y cuál es éste.",
      check: [{ tipo: "num", etiqueta: "mesas x =", valor: 6 }, { tipo: "num", etiqueta: "sillas y =", valor: 8 }, { tipo: "num", etiqueta: "beneficio =", valor: 680, unidad: "€" }],
      pistas: ["Restricciones 4x + 2y ≤ 40, 2x + 3y ≤ 36, x, y ≥ 0. F = 60x + 40y. Calcula F en los vértices."],
      pasos: ["Vértices: (0, 0), (10, 0), (0, 12) y (6, 8) [de 4x + 2y = 40 y 2x + 3y = 36: y = 20 − 2x → 2x + 60 − 6x = 36 → x = 6].", "F = 0, 600, 480 y 60·6 + 40·8 = 680.", "Máximo en (6, 8): 6 mesas y 8 sillas, 680 €."],
      resultado: "6 mesas, 8 sillas, 680 €" },
    { id: "r47", nivel: 3,
      enunciado: "Minimiza F = 2x + 3y sujeto a x + y ≥ 6, x + 3y ≥ 10, x ≥ 0, y ≥ 0. Da el punto óptimo y el valor mínimo.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 2 }, { tipo: "num", etiqueta: "F mín =", valor: 14 }],
      pistas: ["La región no está acotada, pero F ≥ 0 crece al alejarse. Calcula los vértices: (10, 0), (0, 6) y la intersección de las dos rectas."],
      pasos: ["Vértices: (10, 0) [y = 0 con x + 3y = 10], (0, 6) [x = 0 con x + y = 6] y (4, 2) [x + y = 6 con x + 3y = 10 → 2y = 4].", "F(10, 0) = 20; F(0, 6) = 18; F(4, 2) = 8 + 6 = 14.", "Mínimo en (4, 2): F = 14."],
      resultado: "(4, 2), F = 14" },
    { id: "r48", nivel: 3,
      enunciado: "Halla los valores de k para que la recta y = x + k sea tangente a la circunferencia de centro (0, 0) y radio 3 (la distancia del centro a la recta debe valer el radio). Da los dos valores en decimales.",
      check: { tipo: "lista", etiqueta: "k =", valores: [4.2426, -4.2426], tol: 0.002, ph: "dos valores" },
      pistas: ["La recta es x − y + k = 0. Distancia del origen: |k|/√2."],
      pasos: ["|k|/√2 = 3 → |k| = 3√2 ≈ 4,2426.", "k = 3√2 o k = −3√2."],
      resultado: "k = ±3√2 ≈ ±4,243" },
    { id: "r49", nivel: 3,
      enunciado: "Demuestra que, en un triángulo con el circuncentro O en el origen, el punto H = A + B + C es el ortocentro, y que O, G y H están alineados (recta de Euler).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Usa |A| = |B| = |C| (O es el circuncentro y está en el origen)", p: 0.5 },
        { t: "Calcula (H − A)·(B − C) = (B + C)·(B − C) = |B|² − |C|² = 0 (la recta AH es perpendicular a BC)", p: 0.5 },
        { t: "Razona igual con otro vértice y concluye que H es el ortocentro", p: 0.5 },
        { t: "Escribe el baricentro G = (A + B + C)/3 = H/3 y concluye que O, G y H están alineados con OH = 3·OG", p: 0.5 }
      ] },
      pasos: ["Con O = (0, 0): |A| = |B| = |C| = R. Sea H = A + B + C.", "(H − A)·(B − C) = (B + C)·(B − C) = |B|² − |C|² = R² − R² = 0 → AH ⊥ BC. Análogamente BH ⊥ CA, luego H es el ortocentro.", "G = (A + B + C)/3 = H/3: G está en la recta OH, con OG = OH/3 (GH = 2·OG). ∎"],
      resultado: "H = A + B + C = 3G" }
  );
  ejercicios.sort(function (a, b) { return a.nivel - b.nivel; });

  // láminas nuevas
  lamina.push(
    { titulo: "Distancia con signo y haz de rectas",
      items: [
        { label: "Forma normal", formula: "(Ax + By + C)/√(A² + B²) = 0 → x cos φ + y sen φ = p", ejemplo: "3x + 4y − 10 = 0 → 0,6x + 0,8y = 2 (p = 2)" },
        { label: "Distancia con signo", formula: "δ(P) = (Ax₀ + By₀ + C)/√(A² + B²)", cuando: "Signos distintos: P y Q en lados opuestos. AP/PB = |δ(A)|/|δ(B)|." },
        { label: "Haz por r ∩ s", formula: "r + k·s = 0", cuando: "Todas las rectas por el punto de corte (salvo s). Por Q: k = −r(Q)/s(Q).", ojo: "No incluye s: para ella k → ∞." },
        { label: "Haz de paralelas", formula: "Ax + By + k = 0", cuando: "Distancia entre k₁ y k₂: |k₁ − k₂|/√(A² + B²)." }
      ],
      nota: "Tres rectas concurrentes: la tercera pasa por el corte de las otras dos." },
    { titulo: "Programación lineal y modelos", ancha: true,
      tabla: { cab: ["Idea", "Qué hacer"], filas: [
        ["Región factible", "intersección de semiplanos (polígono convexo; puede ser no acotado o vacío)"],
        ["Función objetivo F = ax + by", "rectas de nivel ax + by = k, paralelas; F crece al desplazarlas"],
        ["Óptimo", "en un vértice (o en todo un lado si la recta de nivel es paralela a él)"],
        ["Método", "variables → restricciones → región → vértices → evaluar F → interpretar"],
        ["Punto de equilibrio", "C(x) = I(x); C = fijos + c·x, I = p·x; x* = fijos/(p − c)"],
        ["Incentro", "I = (aA + bB + cC)/(a + b + c); r = Área/s"],
        ["Recta de Euler", "O, G, H alineados; H = 3G − 2O"]
      ] },
      nota: "Interpolar es fiable; extrapolar con un modelo lineal puede dar disparates." }
  );

  B.registrar("mates1", "t8", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
