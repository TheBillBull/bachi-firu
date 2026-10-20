/* ============================================================
   Matemáticas I · ampliaciones · Tema 7: Vectores en el plano
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t7/" + ref); }

  var resumen = [
    "Un vector tiene <b>módulo, dirección y sentido</b>. Con coordenadas: AB = B − A (extremo menos origen); |v| = √(v₁² + v₂²).",
    "Se suman y restan por componentes; k·u multiplica cada componente. Dos vectores no paralelos forman una <b>base</b>.",
    "<b>Producto escalar</b>: u·v = u₁v₁ + u₂v₂ = |u||v|cos α. Es un <b>número</b>; si vale 0, los vectores son perpendiculares.",
    "<b>Paralelos</b> si u₁/v₁ = u₂/v₂ (o det = 0); <b>perpendiculares</b> si u·v = 0. Un perpendicular a (a, b) es (−b, a).",
    "Punto medio: ((a₁+b₁)/2, (a₂+b₂)/2). Baricentro: ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3). Área del triángulo: ½|det(AB, AC)|.",
    "Las fuerzas, velocidades y desplazamientos son vectores: se suman con la regla del paralelogramo y el trabajo es W = F·d."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es un vector
  secciones[0] =
    "<h5>Magnitudes escalares y vectoriales</h5>" +
    "<p>Algunas magnitudes se dicen con un número (la masa, la temperatura, el tiempo, la energía): son <b>escalares</b>. Otras necesitan además una dirección y un sentido (la fuerza, la velocidad, la aceleración, el desplazamiento): son <b>vectoriales</b>. La diferencia es práctica: dos fuerzas de 5 N no se «suman» como 5 + 5 = 10 N, sino que depende de hacia dónde tiren (en el mismo sentido, 10 N; en sentidos opuestos, 0; en perpendicular, 7,07 N).</p>" +
    tabla(["Magnitud", "Tipo", "Por qué"], [
      ["Temperatura (20 °C)", "escalar", "basta un número"], ["Masa (3 kg)", "escalar", "basta un número"],
      ["Fuerza (5 N hacia el este)", "vectorial", "hay que decir hacia dónde"], ["Velocidad (80 km/h hacia el norte)", "vectorial", "dirección y sentido importan"],
      ["Desplazamiento (3 m a la derecha, 4 m arriba)", "vectorial", "no es lo mismo que la distancia recorrida"]
    ]) +
    "<h5>Vector fijo y vector libre</h5>" +
    "<p>Un <b>vector fijo</b> AB tiene un origen A y un extremo B concretos. Dos vectores fijos son <b>equipolentes</b> si tienen el mismo módulo, dirección y sentido; todos los equipolentes a uno dado forman un <b>vector libre</b>. En el curso trabajamos con vectores libres: «el vector (3, 4)» es el mismo se dibuje donde se dibuje; sólo cuenta cómo es.</p>" +
    "<ul><li>El <b>vector nulo</b> 0 = (0, 0) tiene módulo 0 y no tiene dirección ni sentido.</li><li>El <b>opuesto</b> de v, −v, tiene el mismo módulo y dirección pero sentido contrario. Además AB y BA son vectores opuestos.</li></ul>" +
    "<p>Dibuja y mueve vectores aquí. Los extremos son arrastrables (se ajustan a la cuadrícula) y verás la suma, la resta, el producto por un número y el módulo:</p>" +
    w("vectores");

  // ---------------------------------------------------------------- 2. Coordenadas
  secciones[1] =
    "<h5>Las componentes y la base canónica</h5>" +
    "<p>Las coordenadas de un vector dicen <b>cuánto hay que avanzar en horizontal y en vertical</b> para ir del origen al extremo. Se puede escribir v = (v₁, v₂), pero también v = v₁·<b>i</b> + v₂·<b>j</b>, donde i = (1, 0) y j = (0, 1) son los vectores unitarios de los ejes (la <b>base canónica</b>). Por ejemplo (3, −2) = 3i − 2j.</p>" +
    "<h5>De puntos a vectores y de vectores a puntos</h5>" +
    "<ul><li><b>Vector entre dos puntos</b>: AB = B − A. Con A = (1, 2) y B = (4, 6): AB = (3, 4).</li>" +
    "<li><b>Extremo a partir del origen</b>: B = A + AB. Con A = (2, 5) y AB = (−3, 1): B = (−1, 6).</li>" +
    "<li><b>Origen a partir del extremo</b>: A = B − AB.</li></ul>" +
    ejemplo("El cuarto vértice de un paralelogramo", "Tres vértices de un paralelogramo ABCD son A = (1, 1), B = (5, 2) y C = (6, 5). Halla D.", [
      "En un paralelogramo los lados opuestos son <b>equipolentes</b>: AB = DC (mismo vector).",
      "AB = B − A = (4, 1). Entonces DC = C − D = (4, 1) → D = C − (4, 1) = (6 − 4, 5 − 1) = <b>(2, 4)</b>.",
      "Comprobación: AD = (1, 3) y BC = (1, 3) ✓ (el otro par de lados opuestos también coincide)."
    ]) +
    ejemplo("Un vector con origen y extremo desconocidos", "El vector AB = (−3, 4) tiene su extremo en B = (2, 1). Halla A y el vector BA.", [
      "A = B − AB = (2 − (−3), 1 − 4) = <b>(5, −3)</b>.",
      "BA = −AB = <b>(3, −4)</b> (mismo módulo, sentido contrario)."
    ]) +
    ojo("el orden importa: AB = B − A, es decir, <b>extremo menos origen</b>. Si te equivocas de orden, te sale el opuesto BA. Y no confundas el <i>punto</i> A = (1, 2) con el <i>vector</i> OA = (1, 2): tienen las mismas coordenadas pero son objetos distintos.");

  // ---------------------------------------------------------------- 3. Suma, resta, escalares
  secciones[2] =
    "<h5>Propiedades de las operaciones</h5>" +
    "<p>La suma de vectores es <b>conmutativa</b> (u + v = v + u) y <b>asociativa</b>; el nulo es el elemento neutro y cada vector tiene su opuesto. El producto por un número cumple k(u + v) = ku + kv y (k + m)u = ku + mu. En total, los vectores se manejan casi como los números, y por eso se puede hablar de «despejar» un vector: si 2x + u = v, entonces x = (v − u)/2.</p>" +
    ejemplo("Despejar un vector", "Con u = (1, −2) y v = (5, 4), halla x tal que 2x + u = v.", [
      "2x = v − u = (5 − 1, 4 + 2) = (4, 6) → x = (4, 6)/2 = <b>(2, 3)</b>.",
      "Comprobación: 2·(2, 3) + (1, −2) = (4, 6) + (1, −2) = (5, 4) = v ✓."
    ]) +
    "<h5>Combinaciones lineales y bases</h5>" +
    "<p>Una <b>combinación lineal</b> de u y v es cualquier vector de la forma a·u + b·v. Si u y v <b>no son paralelos</b>, todo vector del plano se puede escribir de una única manera como combinación lineal de ellos: se dice que {u, v} es una <b>base</b>, y los números (a, b) son las <b>coordenadas</b> del vector en esa base. Arrastra w y mira cómo cambian a y b según la base:</p>" +
    w("combinacion") +
    ejemplo("Coordenadas en otra base", "Escribe w = (5, 1) como combinación lineal de u = (1, 1) y v = (1, −1).", [
      "Buscamos a y b con (5, 1) = a(1, 1) + b(1, −1) = (a + b, a − b).",
      "Igualando componentes: a + b = 5 y a − b = 1 → sumando, 2a = 6 → a = 3 y b = 2.",
      "<b>w = 3u + 2v</b>. Las coordenadas de w en la base {u, v} son (3, 2)."
    ]) +
    ejemplo("¿Forman base?", "¿Es {(2, 3), (4, 6)} una base? ¿Y {(2, 3), (4, 5)}?", [
      "(4, 6) = 2·(2, 3): son <b>paralelos</b> (uno es múltiplo del otro): no forman base (no «generan» todo el plano).",
      "(2, 3) y (4, 5): 2/4 ≠ 3/5 (o: 2·5 − 3·4 = −2 ≠ 0), no son paralelos: <b>sí forman base</b>."
    ]);

  // ---------------------------------------------------------------- 4. Módulo
  secciones[3] =
    "<h5>Vectores unitarios y vectores con módulo dado</h5>" +
    "<p>Para <b>normalizar</b> un vector se divide entre su módulo: v/|v| es unitario, con la misma dirección y sentido que v. Y al revés, para obtener un vector de módulo m en la dirección de v se hace m·v/|v|.</p>" +
    ejemplo("Normalizar y escalar", "Con v = (3, −4), calcula el vector unitario con su misma dirección y sentido, y un vector de módulo 10 con sentido contrario.", [
      "|v| = √(9 + 16) = 5. Unitario: v/5 = <b>(3/5, −4/5) = (0,6, −0,8)</b> (módulo 1: 0,36 + 0,64 = 1 ✓).",
      "De módulo 10 y sentido contrario: −10·v/5 = −2·v = <b>(−6, 8)</b> (módulo 10 ✓)."
    ]) +
    "<h5>El ángulo de dirección: un vector es un número complejo</h5>" +
    "<p>El ángulo θ que forma un vector con el eje X positivo cumple v = |v|·(cos θ, sen θ), y tan θ = v₂/v₁ (eligiendo el cuadrante con los signos). Es la misma «forma polar» de los números complejos del Tema 6: un vector del plano y un número complejo se manejan con las mismas ideas. Por ejemplo, el vector (1, √3) tiene módulo 2 y ángulo 60°: (1, √3) = 2(cos 60°, sen 60°).</p>" +
    ejemplo("Descomponer una fuerza", "Una fuerza de 20 N forma un ángulo de 30° con la horizontal. Halla sus componentes.", [
      "F = 20·(cos 30°, sen 30°) = 20·(√3/2, 1/2) = <b>(10√3, 10) ≈ (17,32, 10) N</b>.",
      "Es el mismo cálculo que en los problemas de plano inclinado y proyectiles de Física."
    ]) +
    "<p>Dos propiedades del módulo: |k·v| = |k|·|v| y la <b>desigualdad triangular</b> |u + v| ≤ |u| + |v| (en un triángulo, un lado nunca es mayor que la suma de los otros dos; sólo hay igualdad si u y v tienen la misma dirección y sentido).</p>";

  // ---------------------------------------------------------------- 5. Producto escalar
  secciones[4] =
    "<h5>Por qué las dos fórmulas dan lo mismo</h5>" +
    "<p>La forma geométrica u·v = |u||v|cos α es la definición; la algebraica u₁v₁ + u₂v₂ es un cálculo más cómodo. Equivalen gracias al teorema del coseno: en el triángulo de lados u, v y u − v, |u − v|² = |u|² + |v|² − 2|u||v|cos α. Pero también |u − v|² = (u₁ − v₁)² + (u₂ − v₂)² = |u|² + |v|² − 2(u₁v₁ + u₂v₂). Igualando se obtiene la relación entre las dos formas.</p>" +
    "<p>Mueve los vectores y observa cómo cambia el producto, el ángulo y la proyección:</p>" +
    w("escalar") +
    "<h5>Propiedades y significado</h5>" +
    "<ul><li><b>Conmutativo</b> (u·v = v·u) y <b>distributivo</b> (u·(v + w) = u·v + u·w).</li><li><b>u·u = |u|²</b>: el producto de un vector por sí mismo es el cuadrado de su módulo.</li><li>El <b>signo</b> informa del ángulo: u·v &gt; 0 si α es agudo, u·v = 0 si α = 90°, u·v &lt; 0 si α es obtuso.</li><li>La <b>proyección ortogonal</b> de v sobre u es el vector (u·v/|u|²)·u, de longitud (u·v)/|u| (con signo).</li></ul>" +
    ejemplo("El ángulo entre dos vectores", "Calcula el ángulo que forman u = (1, 2) y v = (3, −1).", [
      "u·v = 1·3 + 2·(−1) = 3 − 2 = 1. |u| = √5 y |v| = √10.",
      "cos α = u·v/(|u||v|) = 1/(√5·√10) = 1/√50 = 0,1414 → α = arccos 0,1414 = <b>81,87°</b> (agudo, porque u·v &gt; 0)."
    ]) +
    ejemplo("Proyección ortogonal", "Calcula la proyección de v = (2, 3) sobre u = (4, 1).", [
      "u·v = 8 + 3 = 11 y |u|² = 17.",
      "Vector proyección: (11/17)·(4, 1) = (44/17, 11/17) ≈ <b>(2,59, 0,65)</b>. Su longitud (con signo) es u·v/|u| = 11/√17 = 2,67.",
      "La diferencia v − proyección = (2 − 2,59, 3 − 0,65) = (−0,59, 2,35) es perpendicular a u: (−0,59)·4 + 2,35·1 = 0 ✓."
    ]) +
    ejemplo("El ángulo de un triángulo", "Calcula el ángulo en A del triángulo de vértices A = (0, 0), B = (4, 0) y C = (1, 3).", [
      "AB = (4, 0) y AC = (1, 3). AB·AC = 4. |AB| = 4 y |AC| = √10.",
      "cos A = 4/(4·√10) = 1/√10 = 0,3162 → A = <b>71,57°</b>."
    ]) +
    ojo("el producto escalar es un <b>número</b>, no un vector. No escribas u·v = (3, 5) ni «u·v = 0 ⇒ u = 0 o v = 0»: dos vectores no nulos pueden tener producto escalar 0 (si son perpendiculares). Tampoco se «simplifica»: de u·v = u·w no se deduce v = w.");

  // ---------------------------------------------------------------- 6. Paralelos y perpendiculares
  secciones[5] =
    "<h5>Tres formas de decir «paralelos»</h5>" +
    "<p>Los vectores u y v son <b>paralelos</b> si v = k·u. En coordenadas esto se detecta de tres maneras equivalentes: componentes proporcionales (u₁/v₁ = u₂/v₂), <b>determinante nulo</b> (u₁v₂ − u₂v₁ = 0, que evita las divisiones y los ceros), o ángulo 0° o 180°.</p>" +
    "<h5>Perpendiculares y el vector perpendicular</h5>" +
    "<p>u ⊥ v si u·v = 0. Para <b>fabricar</b> un vector perpendicular a (a, b) basta intercambiar las componentes y cambiar el signo de una: <b>(−b, a)</b> (es girar 90°; y (b, −a) gira −90°). Se comprueba: (a, b)·(−b, a) = −ab + ab = 0.</p>" +
    ejemplo("Valores de k", "Con u = (2, 3), halla k para que v = (k, −6) sea paralelo a u y k para que v = (k, −4) sea perpendicular a u.", [
      "Paralelos: 2/k = 3/(−6) → 3k = −12 → <b>k = −4</b> (v = (−4, −6) = −2u).",
      "Perpendiculares (con v = (k, −4)): u·v = 2k − 12 = 0 → <b>k = 6</b>."
    ]) +
    ejemplo("Un vector perpendicular y unitario", "Halla un vector unitario perpendicular a (3, −2).", [
      "Un perpendicular: (2, 3) (o (−2, −3)). Comprobación: 3·2 + (−2)·3 = 0 ✓.",
      "Su módulo es √13. Unitario: (2/√13, 3/√13) ≈ <b>(0,555, 0,832)</b>. (El otro, (−0,555, −0,832), también vale.)"
    ]) +
    ejemplo("Puntos alineados", "¿Están alineados A = (1, 2), B = (3, 5) y C = (7, 11)?", [
      "Tres puntos están alineados si AB y AC son paralelos. AB = (2, 3) y AC = (6, 9).",
      "Determinante: 2·9 − 3·6 = 18 − 18 = 0 → son paralelos: <b>los tres puntos están alineados</b> (AC = 3·AB)."
    ]);

  // ---------------------------------------------------------------- 7. Punto medio
  secciones[6] =
    "<h5>De punto medio a cualquier punto del segmento</h5>" +
    "<p>El punto medio es el caso particular de una idea más general: el punto P con AP = t·AB es P = A + t·AB = (1 − t)A + tB. Para t = 1/2 se obtiene el punto medio; para t = 1/3 o 2/3, los puntos que dividen el segmento en tres partes iguales; y con t fuera de [0, 1], puntos de la recta fuera del segmento. Mueve A, B y t:</p>" +
    w("segmento") +
    ejemplo("Punto que divide en una razón", "Halla el punto P del segmento AB, con A = (1, 2) y B = (7, 8), tal que AP/PB = 2.", [
      "AP/PB = 2 significa que AP es el doble de PB, es decir, AP = (2/3)·AB (t = r/(1 + r) = 2/3).",
      "AB = (6, 6). P = A + (2/3)·AB = (1 + 4, 2 + 4) = <b>(5, 6)</b>. Comprobación: AP = (4, 4) y PB = (2, 2): razón 2 ✓."
    ]) +
    ejemplo("El simétrico de un punto", "Halla el simétrico de A = (1, 3) respecto de M = (4, −1).", [
      "M es el punto medio entre A y su simétrico A': M = (A + A')/2 → A' = 2M − A = (8 − 1, −2 − 3) = <b>(7, −5)</b>."
    ]) +
    "<h5>El baricentro de un triángulo</h5>" +
    "<p>Las tres medianas de un triángulo (rectas que unen un vértice con el punto medio del lado opuesto) se cortan en un punto, el <b>baricentro</b> G, que es la media de los tres vértices: <b>G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)</b>. Divide cada mediana en dos partes en razón 2 : 1 (el trozo del vértice al baricentro es el doble del que va al lado). Es el punto de equilibrio de un triángulo de cartón. Mueve los vértices:</p>" +
    w("baricentro") +
    ejemplo("Baricentro y diagonales", "Calcula el baricentro del triángulo A = (−4, −2), B = (4, −1), C = (0, 4). ¿Qué punto es el punto medio de las diagonales de un paralelogramo ABCD con A = (1, 1), B = (5, 2), C = (6, 5), D = (2, 4)?", [
      "G = ((−4 + 4 + 0)/3, (−2 − 1 + 4)/3) = <b>(0, 1/3)</b>.",
      "Punto medio de AC: ((1 + 6)/2, (1 + 5)/2) = (3,5; 3). Punto medio de BD: ((5 + 2)/2, (2 + 4)/2) = (3,5; 3). <b>Coinciden</b>: las diagonales de un paralelogramo se cortan en su punto medio (y se usa para hallar el cuarto vértice: A + C = B + D)."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Áreas con vectores: el determinante",
      html:
        "<p>El <b>determinante</b> de dos vectores, det(u, v) = u₁v₂ − u₂v₁, mide el área (con signo) del paralelogramo que forman. Es muy cómodo para áreas y para saber si tres puntos están alineados:</p>" +
        H.formula("Área del paralelogramo = |u₁v₂ − u₂v₁|          Área del triángulo = ½·|u₁v₂ − u₂v₁|") +
        "<p>Por qué: el área de un paralelogramo es base × altura = |u|·|v|·sen α, y u₁v₂ − u₂v₁ = |u||v|·sen α (con signo según el giro de u a v). Si det = 0, el área es 0: los vectores son paralelos (los puntos están alineados). El triángulo ABC es la mitad del paralelogramo que forman AB y AC.</p>" +
        ejemplo("Área de un triángulo", "Calcula el área del triángulo A = (1, 1), B = (5, 2), C = (3, 6).", [
          "AB = (4, 1) y AC = (2, 5). det(AB, AC) = 4·5 − 1·2 = 18.",
          "Área del triángulo = ½·|18| = <b>9</b> (el paralelogramo correspondiente tendría área 18)."
        ]) +
        ejemplo("Área de un polígono", "Calcula el área del cuadrilátero A = (0, 0), B = (4, 0), C = (5, 3), D = (1, 4).", [
          "Se divide en dos triángulos con la diagonal AC. Triángulo ABC: AB = (4, 0), AC = (5, 3): det = 12 → área 6.",
          "Triángulo ACD: AC = (5, 3), AD = (1, 4): det = 20 − 3 = 17 → área 8,5.",
          "Total: 6 + 8,5 = <b>14,5</b>."
        ]) +
        ejemplo("¿Para qué valor de k están alineados?", "Halla k para que A = (1, 2), B = (3, 5) y C = (5, k) estén alineados.", [
          "AB = (2, 3) y AC = (4, k − 2). Alineados ⇔ det(AB, AC) = 0: 2(k − 2) − 3·4 = 0 → 2k − 4 − 12 = 0 → <b>k = 8</b>.",
          "Comprobación: AC = (4, 6) = 2·AB ✓."
        ])
    },
    {
      h: "9. Vectores y Física: fuerzas, velocidades y trabajo",
      html:
        "<p>La mayor parte de las aplicaciones de los vectores está en la Física. Las magnitudes vectoriales se suman con la regla del paralelogramo: la <b>fuerza resultante</b> es la suma de las fuerzas, la <b>velocidad resultante</b> es la suma de velocidades, y el <b>trabajo</b> de una fuerza es su producto escalar por el desplazamiento.</p>" +
        w("fuerzas") +
        ejemplo("Dos fuerzas perpendiculares", "Sobre un cuerpo actúan F₁ = 10 N a 30° y F₂ = 6 N a 120°. Calcula la resultante.", [
          "F₁ y F₂ forman 90°, así que |R| = √(10² + 6²) = √136 = <b>11,66 N</b>.",
          "Dirección: forma con F₁ el ángulo arctan(6/10) = 30,96°, luego R está a 30° + 30,96° = <b>60,96°</b> del eje X.",
          "En componentes: F₁ = (8,66, 5), F₂ = (−3, 5,196) → R = (5,66, 10,196), con módulo 11,66 ✓."
        ]) +
        ejemplo("Un barco que cruza un río", "Un barco apunta perpendicularmente a la orilla a 12 km/h y la corriente le arrastra a 5 km/h. ¿Cuál es su velocidad respecto de tierra y cuánto se desvía?", [
          "Velocidad del barco (0, 12) y corriente (5, 0): resultante (5, 12), módulo √(25 + 144) = <b>13 km/h</b>.",
          "Desviación respecto de la perpendicular: tan α = 5/12 → <b>α = 22,6°</b> (aguas abajo)."
        ]) +
        ejemplo("Equilibrio", "Una lámpara de 50 N cuelga de dos cables simétricos que forman 60° con la horizontal. ¿Qué tensión soporta cada cable?", [
          "Equilibrio: la suma vectorial de las tres fuerzas es cero. Cada cable tira con una tensión T en un ángulo de 60° con la horizontal.",
          "Componente vertical: 2·T·sen 60° = 50 (el peso) → T = 50/(2·0,866) = <b>28,87 N</b>. Las componentes horizontales (±T cos 60°) se cancelan."
        ]) +
        "<h5>El trabajo como producto escalar</h5>" +
        "<p>Cuando una fuerza constante F desplaza su punto de aplicación un vector d, realiza el trabajo <b>W = F·d = |F||d|cos α</b>. Sólo trabaja la componente de la fuerza que va en la dirección del desplazamiento (fuerza perpendicular: no trabaja).</p>" +
        w("trabajo") +
        ejemplo("Trabajo con componentes", "Una fuerza F = (3, 4) N desplaza un cuerpo d = (5, 2) m. Calcula el trabajo y el ángulo entre F y d.", [
          "W = F·d = 3·5 + 4·2 = <b>23 J</b>.",
          "|F| = 5 N, |d| = √29 = 5,385 m → cos α = 23/(5·5,385) = 0,8542 → <b>α = 31,4°</b> (agudo: el trabajo es positivo)."
        ])
    },
    {
      h: "10. Demostrar con vectores",
      html:
        "<p>Muchos teoremas de geometría se demuestran con unas pocas líneas usando el producto escalar. La receta: elige dos vectores del dibujo, exprésalo todo con ellos y usa u·v = 0 para la perpendicularidad.</p>" +
        ejemplo("Las diagonales de un rombo son perpendiculares", "Demuestra que en un rombo las diagonales se cortan en ángulo recto.", [
          "Sea el rombo con lados u y v desde un vértice: como todos los lados son iguales, |u| = |v|. Las diagonales son u + v y u − v.",
          "(u + v)·(u − v) = u·u − u·v + v·u − v·v = |u|² − |v|² = 0 porque |u| = |v|.",
          "Producto escalar nulo ⇒ las diagonales son perpendiculares. ∎"
        ]) +
        ejemplo("Un ángulo inscrito en una semicircunferencia es recto", "Demuestra el teorema de Tales: si AB es un diámetro y C está en la circunferencia, el ángulo en C es recto.", [
          "Coloquemos el centro O en el origen: B = −A y |A| = |C| = r. Los vectores CA = A − C y CB = B − C = −A − C.",
          "CA·CB = (A − C)·(−A − C) = −A·A − A·C + C·A + C·C = −|A|² + |C|² = −r² + r² = 0.",
          "Producto nulo ⇒ CA ⊥ CB: el ángulo en C es de 90°. ∎"
        ]) +
        ejemplo("Un teorema de Pitágoras vectorial", "Demuestra que si u ⊥ v, entonces |u + v|² = |u|² + |v|².", [
          "|u + v|² = (u + v)·(u + v) = u·u + 2u·v + v·v = |u|² + 2u·v + |v|².",
          "Si u ⊥ v, u·v = 0 y queda |u|² + |v|². ∎ (Es el teorema de Pitágoras, y el teorema del coseno con ángulo recto.)"
        ])
    },
    {
      h: "11. ¿Escalar o vector? Mapa de resultados",
      html:
        "<p>Un fallo muy típico es no darse cuenta de qué clase de objeto sale de cada operación. Clasifícalas:</p>" +
        w("clasificar", "tipo") +
        w("emparejar", "formulas")
    },
    {
      h: "12. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "13. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas con las fórmulas del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    tipo: {
      titulo: "¿Qué sale: un número o un vector?",
      consigna: "Toca una operación y después el tipo de resultado.",
      categorias: ["Un vector", "Un número (escalar)", "Un punto"],
      items: [
        { t: "u + v", c: 0 }, { t: "3·u", c: 0 }, { t: "B − A", c: 0 }, { t: "u/|u|", c: 0 },
        { t: "u · v (producto escalar)", c: 1 }, { t: "|u|", c: 1 }, { t: "El ángulo entre u y v", c: 1 }, { t: "det(u, v)", c: 1 }, { t: "El trabajo W = F·d", c: 1 },
        { t: "El punto medio de AB", c: 2 }, { t: "El baricentro de ABC", c: 2 }, { t: "A + AB", c: 2 }
      ]
    },
    formulas: {
      titulo: "Cada fórmula con su significado",
      consigna: "Une cada fórmula con lo que calcula.",
      pares: [
        ["B − A", "Vector AB entre dos puntos"],
        ["√(v₁² + v₂²)", "Módulo del vector"],
        ["u₁v₁ + u₂v₂", "Producto escalar"],
        ["u·v / (|u||v|)", "Coseno del ángulo entre u y v"],
        ["(−b, a)", "Vector perpendicular a (a, b)"],
        ["((a₁ + b₁)/2, (a₂ + b₂)/2)", "Punto medio de AB"],
        ["½·|u₁v₂ − u₂v₁|", "Área del triángulo de lados u y v"],
        ["(u·v / |u|²)·u", "Proyección ortogonal de v sobre u"]
      ]
    },
    tj1: {
      titulo: "Vectores en el plano",
      cartas: [
        { a: "Vector entre dos puntos", b: "AB = B − A (extremo menos origen). BA = −AB." },
        { a: "Módulo y vector unitario", b: "|v| = √(v₁² + v₂²) · unitario: v/|v|" },
        { a: "Suma, resta y producto por un número", b: "(u₁ ± v₁, u₂ ± v₂) · k·(u₁, u₂) = (ku₁, ku₂). Si k &lt; 0, cambia el sentido." },
        { a: "Producto escalar", b: "u·v = u₁v₁ + u₂v₂ = |u||v|cos α. Es un número. u·u = |u|²." },
        { a: "Ángulo entre dos vectores", b: "cos α = u·v/(|u||v|). Agudo si u·v &gt; 0, recto si = 0, obtuso si &lt; 0." },
        { a: "Vectores paralelos", b: "u₁/v₁ = u₂/v₂ (o det(u, v) = 0). Uno es múltiplo del otro." },
        { a: "Vectores perpendiculares", b: "u·v = 0. Un perpendicular a (a, b) es (−b, a)." },
        { a: "Base de vectores", b: "Dos vectores no paralelos: todo vector es a·u + b·v, con a y b únicos." },
        { a: "Punto medio y punto en una razón", b: "M = ((a₁ + b₁)/2, (a₂ + b₂)/2) · P = A + t·AB con t = r/(1 + r) si AP/PB = r" },
        { a: "Baricentro", b: "G = (A + B + C)/3. Divide las medianas en razón 2 : 1." },
        { a: "Proyección de v sobre u", b: "Vector: (u·v/|u|²)·u · longitud con signo: u·v/|u|" },
        { a: "Área del triángulo con vectores", b: "S = ½·|det(AB, AC)| = ½·|AB₁·AC₂ − AB₂·AC₁|" },
        { a: "Trabajo de una fuerza constante", b: "W = F·d = |F||d|cos α (julios). Perpendicular → 0." },
        { a: "Cuarto vértice de un paralelogramo ABCD", b: "AB = DC → D = A + C − B. Las diagonales comparten punto medio." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Con A = (1, 2) y B = (4, 6), un alumno calcula AB = (1 − 4, 2 − 6) = (−3, −4). ¿Qué falla?",
          op: ["Nada", "AB es extremo menos origen: B − A = (3, 4). Él ha calculado BA", "Debía sumar", "Debía dividir"], ok: 1,
          porque: "Para ir de A a B hay que avanzar 3 en horizontal y 4 en vertical: AB = (3, 4). El vector (−3, −4) es el opuesto, BA." },
        { q: "Un alumno escribe u·v = (2, −1)·(3, 5) = (6, −5). ¿Qué falla?",
          op: ["Nada", "El producto escalar es un número: 2·3 + (−1)·5 = 1", "Debía ser (5, 4)", "Debía ser (6, 5)"], ok: 1,
          porque: "u·v = u₁v₁ + u₂v₂ es un escalar. Multiplicar componente a componente no es el producto escalar." },
        { q: "Un alumno dice: «u·v = 0, luego u = 0 o v = 0». ¿Qué falla?",
          op: ["Nada", "Pueden ser dos vectores no nulos perpendiculares, como (1, 0) y (0, 1)", "Sólo ocurre en la recta", "Debía ser u = v"], ok: 1,
          porque: "A diferencia de los números reales, el producto escalar puede ser 0 con dos vectores no nulos: es la condición de perpendicularidad." },
        { q: "Un alumno comprueba que u = (2, 3) y v = (4, 5) son paralelos porque 2 &lt; 4 y 3 &lt; 5. ¿Qué falla?",
          op: ["Nada", "Paralelos significa proporcionales: 2/4 = 0,5 ≠ 3/5 = 0,6, luego no lo son", "Debía restar", "Son perpendiculares"], ok: 1,
          porque: "u ∥ v ⇔ u₁v₂ − u₂v₁ = 0. Aquí 2·5 − 3·4 = −2 ≠ 0." },
        { q: "Un alumno calcula el módulo de (3, 4) como 3 + 4 = 7. ¿Qué falla?",
          op: ["Nada", "El módulo se calcula con Pitágoras: √(9 + 16) = 5", "Es 12", "Es 25"], ok: 1,
          porque: "|v| = √(v₁² + v₂²). Sumar componentes no mide la longitud de la flecha (la hipotenusa)." },
        { q: "Un alumno halla el punto medio de A = (2, 6) y B = (8, 2) como (2 + 8, 6 + 2) = (10, 8). ¿Qué falla?",
          op: ["Nada", "Hay que dividir entre 2: ((2 + 8)/2, (6 + 2)/2) = (5, 4)", "Debía restar", "Debía multiplicar"], ok: 1,
          porque: "El punto medio es la media de cada coordenada. (10, 8) está fuera del segmento." },
        { q: "Un alumno afirma que si u·v &gt; 0 entonces los vectores tienen el mismo sentido. ¿Qué falla?",
          op: ["Nada", "u·v &gt; 0 sólo dice que el ángulo es agudo, no que sean paralelos", "u·v &gt; 0 significa perpendiculares", "u·v &gt; 0 significa que son opuestos"], ok: 1,
          porque: "Con (1, 0) y (1, 1), u·v = 1 &gt; 0 pero forman 45°. El mismo sentido exige además que sean paralelos (α = 0°)." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Con A = (−1, 3) y B = (4, −2), el vector AB es…",
          op: ["(5, −5)", "(−5, 5)", "(3, 1)", "(3, −5)"], ok: 0,
          porque: "AB = B − A = (4 − (−1), −2 − 3) = (5, −5)." },
        { q: "El módulo del vector (−6, 8) es…",
          op: ["10", "2", "14", "48"], ok: 0,
          porque: "√(36 + 64) = √100 = 10." },
        { q: "u = (2, 5) y v = (−5, k) son perpendiculares si k vale…",
          op: ["2", "−2", "5", "−5/2"], ok: 0,
          porque: "u·v = −10 + 5k = 0 → k = 2." },
        { q: "El ángulo entre u = (1, 0) y v = (1, 1) es…",
          op: ["45°", "90°", "0°", "60°"], ok: 0,
          porque: "cos α = 1/(1·√2) = √2/2 → α = 45°." },
        { q: "El punto medio de A = (2, −4) y B = (6, 10) es…",
          op: ["(4, 3)", "(8, 6)", "(2, 7)", "(4, 6)"], ok: 0,
          porque: "((2 + 6)/2, (−4 + 10)/2) = (4, 3)." },
        { q: "¿Cuál es un vector perpendicular a (3, −2)?",
          op: ["(2, 3)", "(−3, 2)", "(3, 2)", "(2, −3)"], ok: 0,
          porque: "3·2 + (−2)·3 = 0 ✓. (−3, 2) es el opuesto (paralelo)." },
        { q: "El baricentro del triángulo (0, 0), (6, 0), (0, 9) es…",
          op: ["(2, 3)", "(3, 4,5)", "(6, 9)", "(1, 2)"], ok: 0,
          porque: "((0 + 6 + 0)/3, (0 + 0 + 9)/3) = (2, 3)." },
        { q: "El área del triángulo de vértices (0, 0), (4, 0) y (0, 3) es…",
          op: ["6", "12", "7", "3,5"], ok: 0,
          porque: "½·|4·3 − 0·0| = 6." },
        { q: "El vector unitario en la dirección de (3, −4) es…",
          op: ["(0,6, −0,8)", "(3, −4)", "(1, −1)", "(0,8, −0,6)"], ok: 0,
          porque: "(3, −4)/5 = (0,6, −0,8)." },
        { q: "Una fuerza F = (3, 4) N desplaza un cuerpo d = (2, −1) m. El trabajo es…",
          op: ["2 J", "10 J", "−2 J", "5 J"], ok: 0,
          porque: "W = 3·2 + 4·(−1) = 6 − 4 = 2 J." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "v1", nivel: 1,
      enunciado: "Con A = (−2, 5) y B = (3, −1), calcula el vector AB y su módulo.",
      check: [{ tipo: "num", etiqueta: "AB₁ =", valor: 5 }, { tipo: "num", etiqueta: "AB₂ =", valor: -6 }, { tipo: "num", etiqueta: "|AB| =", valor: 7.8102, tol: 0.002 }],
      pistas: ["AB = B − A (extremo menos origen)."],
      pasos: ["AB = (3 − (−2), −1 − 5) = (5, −6).", "|AB| = √(25 + 36) = √61 ≈ 7,81."],
      resultado: "AB = (5, −6) · |AB| = √61" },
    { id: "v2", nivel: 1,
      enunciado: "Con u = (4, −3) y v = (−2, 5), calcula 2u − 3v.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 14 }, { tipo: "num", etiqueta: "componente y =", valor: -21 }],
      pistas: ["Primero 2u = (8, −6) y 3v = (−6, 15)."],
      pasos: ["2u − 3v = (8 + 6, −6 − 15) = (14, −21)."],
      resultado: "(14, −21)" },
    { id: "v3", nivel: 1,
      enunciado: "Calcula el módulo del vector (−6, 8).",
      check: { tipo: "num", etiqueta: "módulo =", valor: 10 },
      pistas: ["Pitágoras con los dos catetos 6 y 8."],
      pasos: ["√(36 + 64) = √100 = 10."],
      resultado: "10" },
    { id: "v4", nivel: 1,
      enunciado: "Calcula el vector unitario con la dirección y sentido de v = (3, −4).",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 0.6 }, { tipo: "num", etiqueta: "componente y =", valor: -0.8 }],
      pistas: ["Divide cada componente entre el módulo."],
      pasos: ["|v| = 5 → v/5 = (3/5, −4/5) = (0,6, −0,8)."],
      resultado: "(0,6, −0,8)" },
    { id: "v5", nivel: 1,
      enunciado: "Calcula el producto escalar de u = (2, 5) y v = (−1, 3).",
      check: { tipo: "num", etiqueta: "u·v =", valor: 13 },
      pistas: ["u₁v₁ + u₂v₂."],
      pasos: ["2·(−1) + 5·3 = −2 + 15 = 13."],
      resultado: "13" },
    { id: "v6", nivel: 1,
      enunciado: "Halla k para que u = (2, 5) y v = (−5, k) sean perpendiculares.",
      check: { tipo: "num", etiqueta: "k =", valor: 2 },
      pistas: ["Perpendiculares ⇔ producto escalar 0."],
      pasos: ["u·v = 2·(−5) + 5k = −10 + 5k = 0 → k = 2."],
      resultado: "k = 2" },
    { id: "v7", nivel: 1,
      enunciado: "Halla k para que u = (3, −6) y v = (k, 4) sean paralelos.",
      check: { tipo: "num", etiqueta: "k =", valor: -2 },
      pistas: ["Componentes proporcionales: 3/k = −6/4."],
      pasos: ["3·4 = −6·k → k = −2. (v = (−2, 4) = −(2/3)·u.)"],
      resultado: "k = −2" },
    { id: "v8", nivel: 1,
      enunciado: "Calcula el punto medio del segmento de extremos A = (2, −4) y B = (6, 10).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["La media de cada coordenada."],
      pasos: ["M = ((2 + 6)/2, (−4 + 10)/2) = (4, 3)."],
      resultado: "M = (4, 3)" },
    { id: "v9", nivel: 1,
      enunciado: "Tres vértices de un paralelogramo ABCD son A = (0, 0), B = (4, 1) y C = (6, 5). Halla D.",
      check: [{ tipo: "num", etiqueta: "D₁ =", valor: 2 }, { tipo: "num", etiqueta: "D₂ =", valor: 4 }],
      pistas: ["AB = DC → D = A + C − B."],
      pasos: ["D = (0 + 6 − 4, 0 + 5 − 1) = (2, 4).", "Comprobación: AD = (2, 4) y BC = (2, 4) ✓."],
      resultado: "D = (2, 4)" },
    { id: "v10", nivel: 1,
      enunciado: "Halla un vector perpendicular a (4, −1) cuya primera componente sea 1. ¿Cuánto vale su segunda componente?",
      check: { tipo: "num", etiqueta: "segunda componente =", valor: 4 },
      pistas: ["(4, −1)·(1, y) = 0."],
      pasos: ["4·1 + (−1)·y = 0 → y = 4. El vector es (1, 4)."],
      resultado: "(1, 4)" },
    // ================= ★★ medio =================
    { id: "v11", nivel: 2,
      enunciado: "Calcula el ángulo que forman u = (1, 2) y v = (3, −1).",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 81.87, unidad: "°" },
      pistas: ["cos α = u·v/(|u||v|)."],
      pasos: ["u·v = 3 − 2 = 1. |u| = √5 y |v| = √10.", "cos α = 1/√50 = 0,1414 → α = 81,87°."],
      resultado: "≈ 81,87°" },
    { id: "v12", nivel: 2,
      enunciado: "Calcula el ángulo entre u = (2, 2) y v = (−1, 3).",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 63.43, unidad: "°" },
      pistas: ["u·v = −2 + 6 = 4."],
      pasos: ["|u| = 2√2 = 2,828 y |v| = √10 = 3,162.", "cos α = 4/8,944 = 0,4472 → α = 63,43°."],
      resultado: "≈ 63,43°" },
    { id: "v13", nivel: 2,
      enunciado: "Calcula el vector proyección ortogonal de v = (2, 3) sobre u = (4, 1) (decimales).",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 2.588, tol: 0.003 }, { tipo: "num", etiqueta: "componente y =", valor: 0.647, tol: 0.005 }],
      pistas: ["Proyección = (u·v/|u|²)·u."],
      pasos: ["u·v = 11 y |u|² = 17. (11/17)·(4, 1) = (44/17, 11/17) ≈ (2,588, 0,647)."],
      resultado: "(44/17, 11/17)" },
    { id: "v14", nivel: 2,
      enunciado: "Escribe w = (7, −1) como combinación lineal a·(1, 1) + b·(1, −1). Da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 3 }, { tipo: "num", etiqueta: "b =", valor: 4 }],
      pistas: ["(a + b, a − b) = (7, −1)."],
      pasos: ["a + b = 7 y a − b = −1 → a = 3, b = 4.", "Comprobación: 3·(1, 1) + 4·(1, −1) = (7, −1) ✓."],
      resultado: "w = 3·(1, 1) + 4·(1, −1)" },
    { id: "v15", nivel: 2,
      enunciado: "Escribe w = (4, 5) como a·(2, 1) + b·(−1, 1). Da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 3 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["(2a − b, a + b) = (4, 5)."],
      pasos: ["2a − b = 4 y a + b = 5 → sumando 3a = 9 → a = 3 y b = 2."],
      resultado: "a = 3, b = 2" },
    { id: "v16", nivel: 2,
      enunciado: "Halla el punto P del segmento AB, con A = (−2, 1) y B = (6, 5), tal que AP/PB = 3.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["AP = (3/4)·AB (t = r/(1 + r))."],
      pasos: ["AB = (8, 4). P = A + (3/4)·AB = (−2 + 6, 1 + 3) = (4, 4).", "Comprobación: AP = (6, 3) y PB = (2, 1): razón 3 ✓."],
      resultado: "P = (4, 4)" },
    { id: "v17", nivel: 2,
      enunciado: "Halla el simétrico de A = (−3, 2) respecto del punto M = (1, 1).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 5 }, { tipo: "num", etiqueta: "y =", valor: 0 }],
      pistas: ["M es el punto medio entre A y A': A' = 2M − A."],
      pasos: ["A' = (2 + 3, 2 − 2) = (5, 0)."],
      resultado: "A' = (5, 0)" },
    { id: "v18", nivel: 2,
      enunciado: "Calcula el baricentro del triángulo A = (−1, 2), B = (5, −4), C = (2, 8).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 2 }],
      pistas: ["La media de las coordenadas de los tres vértices."],
      pasos: ["G = ((−1 + 5 + 2)/3, (2 − 4 + 8)/3) = (2, 2)."],
      resultado: "G = (2, 2)" },
    { id: "v19", nivel: 2,
      enunciado: "Calcula el área del triángulo de vértices A = (2, 1), B = (7, 3) y C = (4, 8).",
      check: { tipo: "num", etiqueta: "área =", valor: 15.5 },
      pistas: ["½·|det(AB, AC)|."],
      pasos: ["AB = (5, 2) y AC = (2, 7). det = 5·7 − 2·2 = 31.", "Área = 31/2 = 15,5."],
      resultado: "15,5" },
    { id: "v20", nivel: 2,
      enunciado: "Halla k para que A = (−1, 0), B = (2, 3) y C = (5, k) estén alineados.",
      check: { tipo: "num", etiqueta: "k =", valor: 6 },
      pistas: ["AB ∥ AC: determinante nulo."],
      pasos: ["AB = (3, 3) y AC = (6, k). 3k − 18 = 0 → k = 6.", "AC = (6, 6) = 2·AB ✓."],
      resultado: "k = 6" },
    { id: "v21", nivel: 2,
      enunciado: "Calcula el ángulo en C del triángulo A = (1, 1), B = (5, 1), C = (3, 5).",
      check: { tipo: "num", etiqueta: "ángulo C =", valor: 53.13, unidad: "°" },
      pistas: ["Usa los vectores CA y CB."],
      pasos: ["CA = (−2, −4) y CB = (2, −4). CA·CB = −4 + 16 = 12. |CA| = |CB| = √20.", "cos C = 12/20 = 0,6 → C = 53,13°."],
      resultado: "≈ 53,13°" },
    { id: "v22", nivel: 2,
      enunciado: "Una fuerza F = (6, −2) N desplaza un cuerpo d = (4, 3) m. Calcula el trabajo.",
      check: { tipo: "num", etiqueta: "W =", valor: 18, unidad: "J" },
      pistas: ["W = F·d."],
      pasos: ["W = 6·4 + (−2)·3 = 24 − 6 = 18 J."],
      resultado: "18 J" },
    { id: "v23", nivel: 2,
      enunciado: "Dos fuerzas perpendiculares de 8 N y 6 N actúan sobre un cuerpo. Calcula el módulo de la resultante y el ángulo que forma con la fuerza de 8 N.",
      check: [{ tipo: "num", etiqueta: "|R| =", valor: 10, unidad: "N" }, { tipo: "num", etiqueta: "ángulo =", valor: 36.87, unidad: "°" }],
      pistas: ["Pitágoras y tan α = 6/8."],
      pasos: ["|R| = √(64 + 36) = 10 N.", "tan α = 6/8 → α = 36,87°."],
      resultado: "10 N, a 36,87° de la de 8 N" },
    { id: "v24", nivel: 2,
      enunciado: "Con u = (1, −2) y v = (0, 4), halla el vector x tal que 3x − u = 2v.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 1 / 3, tol: 0.002, ph: "decimal o 1/3" }, { tipo: "num", etiqueta: "componente y =", valor: 2 }],
      pistas: ["3x = 2v + u."],
      pasos: ["3x = (0, 8) + (1, −2) = (1, 6) → x = (1/3, 2)."],
      resultado: "x = (1/3, 2)" },
    // ================= ★★★ nivel PAU =================
    { id: "v25", nivel: 3,
      enunciado: "Halla k para que u = (k, 2) y v = (3, −1) formen un ángulo de 45°.",
      check: { tipo: "num", etiqueta: "k =", valor: 4 },
      pistas: ["cos 45° = u·v/(|u||v|). Eleva al cuadrado y descarta la solución que da un coseno negativo."],
      pasos: ["(3k − 2)/(√(k² + 4)·√10) = √2/2 → elevando: 2(3k − 2)² = 10(k² + 4) → k² − 3k − 4 = 0 → k = 4 o k = −1.", "Con k = −1, 3k − 2 = −5 &lt; 0 (ángulo de 135°): se descarta. <b>k = 4</b>."],
      resultado: "k = 4" },
    { id: "v26", nivel: 3,
      enunciado: "Halla un vector de módulo 10 perpendicular a (3, 4), con primera componente positiva. Da sus componentes.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 8 }, { tipo: "num", etiqueta: "componente y =", valor: -6 }],
      pistas: ["Un perpendicular a (3, 4) es (−4, 3), de módulo 5. Multiplica por ±2."],
      pasos: ["(−4, 3) tiene módulo 5. Para módulo 10: ±2·(−4, 3) = (−8, 6) o (8, −6).", "Con primera componente positiva: (8, −6)."],
      resultado: "(8, −6)" },
    { id: "v27", nivel: 3,
      enunciado: "Un triángulo equilátero tiene vértices A = (0, 0) y B = (4, 0). Halla el tercer vértice C con ordenada positiva.",
      check: [{ tipo: "num", etiqueta: "C₁ =", valor: 2 }, { tipo: "num", etiqueta: "C₂ =", valor: 3.4641, tol: 0.002 }],
      pistas: ["C está sobre la mediatriz de AB (x = 2) y a distancia 4 de A."],
      pasos: ["C = (2, y) con 2² + y² = 16 → y = √12 = 2√3 ≈ 3,464.", "(También: ángulo de 60° en A: C = 4(cos 60°, sen 60°) = (2, 2√3).)"],
      resultado: "C = (2, 2√3)" },
    { id: "v28", nivel: 3,
      enunciado: "Demuestra con vectores que las diagonales de un rombo son perpendiculares.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Llama u y v a dos lados consecutivos y observa que |u| = |v| por ser un rombo", p: 0.5 },
        { t: "Expresa las diagonales como u + v y u − v", p: 0.5 },
        { t: "Calcula el producto escalar (u + v)·(u − v) = |u|² − |v|²", p: 0.5 },
        { t: "Concluye que vale 0 y, por tanto, las diagonales son perpendiculares", p: 0.5 }
      ] },
      pasos: ["(u + v)·(u − v) = u·u − u·v + v·u − v·v = |u|² − |v|² = 0.", "Producto escalar nulo ⇒ perpendiculares. ∎"],
      resultado: "Diagonales perpendiculares" },
    { id: "v29", nivel: 3,
      enunciado: "Demuestra que en todo paralelogramo, la suma de los cuadrados de las diagonales es igual a la suma de los cuadrados de los cuatro lados.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Llama u y v a los lados; las diagonales son u + v y u − v", p: 0.5 },
        { t: "Desarrolla |u + v|² = |u|² + 2u·v + |v|²", p: 0.5 },
        { t: "Desarrolla |u − v|² = |u|² − 2u·v + |v|²", p: 0.5 },
        { t: "Suma: 2|u|² + 2|v|², que es la suma de los cuadrados de los cuatro lados", p: 0.5 }
      ] },
      pasos: ["|u + v|² + |u − v|² = (|u|² + 2u·v + |v|²) + (|u|² − 2u·v + |v|²) = 2|u|² + 2|v|².", "Los cuatro lados valen |u|, |v|, |u|, |v|: la suma de sus cuadrados es 2|u|² + 2|v|². ∎"],
      resultado: "Ley del paralelogramo" },
    { id: "v30", nivel: 3,
      enunciado: "Calcula el área del cuadrilátero A = (0, 0), B = (5, 0), C = (6, 4), D = (1, 5) dividiéndolo en dos triángulos.",
      check: { tipo: "num", etiqueta: "área =", valor: 23 },
      pistas: ["Triángulos ABC y ACD, con la diagonal AC."],
      pasos: ["ABC: AB = (5, 0), AC = (6, 4): det = 20 → área 10.", "ACD: AC = (6, 4), AD = (1, 5): det = 30 − 4 = 26 → área 13.", "Total: 10 + 13 = 23."],
      resultado: "23" },
    { id: "v31", nivel: 3,
      enunciado: "Calcula la distancia del punto P = (5, 1) a la recta que pasa por el origen y por A = (3, 4).",
      check: { tipo: "num", etiqueta: "distancia =", valor: 3.4 },
      pistas: ["La distancia es la altura del paralelogramo formado por OA y OP: |det(OA, OP)|/|OA|."],
      pasos: ["det(OA, OP) = 3·1 − 4·5 = −17. |OA| = 5.", "Distancia = 17/5 = 3,4."],
      resultado: "3,4" },
    { id: "v32", nivel: 3,
      enunciado: "Un avión vuela con una velocidad propia de 200 km/h hacia el norte y sopla un viento de 50 km/h hacia el este. Calcula su velocidad respecto del suelo (módulo) y la desviación respecto del norte.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 206.16, unidad: "km/h" }, { tipo: "num", etiqueta: "desviación =", valor: 14.04, unidad: "°" }],
      pistas: ["Velocidades: (0, 200) y (50, 0)."],
      pasos: ["v = (50, 200): |v| = √(2500 + 40000) = 206,16 km/h.", "tan δ = 50/200 → δ = 14,04° hacia el este."],
      resultado: "206,16 km/h, 14,04° al este del norte" },
    { id: "v33", nivel: 3,
      enunciado: "Un cuadro de 100 N cuelga de dos cables simétricos que forman 40° con la horizontal. Calcula la tensión de cada cable.",
      check: { tipo: "num", etiqueta: "tensión =", valor: 77.79, unidad: "N" },
      pistas: ["Las componentes verticales de las dos tensiones equilibran el peso: 2T·sen 40° = 100."],
      pasos: ["T = 100/(2·sen 40°) = 100/(2·0,6428) = 77,79 N."],
      resultado: "≈ 77,8 N" },
    { id: "v34", nivel: 3,
      enunciado: "Halla el punto del eje X que equidista de A = (1, 2) y B = (5, 4).",
      check: { tipo: "num", etiqueta: "x =", valor: 4.5 },
      pistas: ["P = (x, 0). Iguala |PA|² y |PB|²."],
      pasos: ["(x − 1)² + 4 = (x − 5)² + 16 → x² − 2x + 5 = x² − 10x + 41 → 8x = 36 → x = 4,5."],
      resultado: "P = (4,5, 0)" },
    { id: "v35", nivel: 3,
      enunciado: "En el triángulo A = (1, 0), B = (5, 0), C = (3, 4), calcula la longitud de la mediana que sale de A.",
      check: { tipo: "num", etiqueta: "longitud =", valor: 3.6056, tol: 0.002 },
      pistas: ["La mediana va de A al punto medio de BC."],
      pasos: ["Punto medio de BC: ((5 + 3)/2, (0 + 4)/2) = (4, 2).", "Mediana: (4 − 1, 2 − 0) = (3, 2), de longitud √13 ≈ 3,606."],
      resultado: "√13 ≈ 3,606" },
    { id: "v36", nivel: 3,
      enunciado: "Gira el vector (3, 1) un ángulo de 90° en sentido antihorario. ¿Cuáles son las componentes del vector girado?",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: -1 }, { tipo: "num", etiqueta: "componente y =", valor: 3 }],
      pistas: ["Girar 90° (a, b) → (−b, a)."],
      pasos: ["(a, b) = (3, 1) → (−1, 3). Comprobación: perpendicular al original: 3·(−1) + 1·3 = 0 y del mismo módulo √10 ✓."],
      resultado: "(−1, 3)" }
  ];

  var lamina = [
    { titulo: "Vector: coordenadas y módulo",
      items: [
        { label: "Entre dos puntos", formula: "AB = B − A = (b₁ − a₁, b₂ − a₂)", ejemplo: "A = (1, 2), B = (4, 6) → AB = (3, 4)", ojo: "Extremo menos origen. BA = −AB." },
        { label: "Módulo", formula: "|v| = √(v₁² + v₂²)", ejemplo: "|(3, 4)| = 5" },
        { label: "Unitario", formula: "u = v/|v|", ejemplo: "(3, −4) → (0,6, −0,8)" },
        { label: "Con ángulo", formula: "v = |v|·(cos θ, sen θ)" }
      ] },
    { titulo: "Operaciones",
      items: [
        { label: "Suma y resta", formula: "(u₁ ± v₁, u₂ ± v₂)", cuando: "Regla del paralelogramo o del triángulo." },
        { label: "Producto por un número", formula: "k·(u₁, u₂) = (k·u₁, k·u₂)", ojo: "Si k &lt; 0 cambia el sentido." },
        { label: "Combinación lineal y base", formula: "w = a·u + b·v", cuando: "Si u y v no son paralelos, a y b son únicos." }
      ] },
    { titulo: "Producto escalar",
      items: [
        { label: "Fórmula algebraica", formula: "u·v = u₁v₁ + u₂v₂", ojo: "Es un NÚMERO, no un vector." },
        { label: "Fórmula geométrica", formula: "u·v = |u|·|v|·cos α", cuando: "Para el ángulo: cos α = u·v/(|u||v|)." },
        { label: "Proyección de v sobre u", formula: "(u·v/|u|²)·u", ejemplo: "longitud con signo: u·v/|u|" }
      ],
      nota: "u·v &gt; 0: ángulo agudo · u·v = 0: perpendiculares · u·v &lt; 0: ángulo obtuso." },
    { titulo: "Paralelos y perpendiculares",
      tabla: { cab: ["Condición", "Fórmula"], filas: [["u ∥ v", "u₁/v₁ = u₂/v₂  ·  det(u, v) = u₁v₂ − u₂v₁ = 0"], ["u ⊥ v", "u·v = 0"], ["Perpendicular a (a, b)", "(−b, a)"], ["Tres puntos alineados", "AB ∥ AC (det = 0)"]] },
      nota: "Con det no hay divisiones ni problemas con los ceros." },
    { titulo: "Puntos y áreas", ancha: true,
      items: [
        { label: "Punto medio", formula: "M = ((a₁ + b₁)/2, (a₂ + b₂)/2)" },
        { label: "Punto de AB en una razón AP/PB = r", formula: "P = A + t·AB con t = r/(1 + r)", ejemplo: "r = 2: t = 2/3" },
        { label: "Simétrico de A respecto de M", formula: "A' = 2M − A" },
        { label: "Baricentro", formula: "G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)", cuando: "Divide cada mediana en razón 2 : 1." },
        { label: "Área del triángulo", formula: "S = ½·|det(AB, AC)|", ejemplo: "AB = (4, 1), AC = (2, 5) → S = ½·18 = 9" }
      ],
      nota: "Cuarto vértice del paralelogramo ABCD: D = A + C − B." },
    { titulo: "Vectores en Física",
      items: [
        { label: "Resultante", formula: "R = F₁ + F₂ + …", cuando: "Equilibrio: R = 0.", ejemplo: "8 N y 6 N perpendiculares → 10 N" },
        { label: "Trabajo", formula: "W = F·d = |F||d|cos α", ojo: "Fuerza perpendicular al movimiento: W = 0." },
        { label: "Componentes", formula: "F = |F|(cos θ, sen θ)", ejemplo: "20 N a 30° → (17,3; 10) N" }
      ] },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "AB = A − B", bien: "AB = B − A", por: "Extremo menos origen." },
        { mal: "u·v = (6, −5)", bien: "u·v = 1 (un número)", por: "El producto escalar es un escalar." },
        { mal: "u·v = 0 ⇒ u = 0 ó v = 0", bien: "puede ser u ⊥ v", por: "Dos vectores no nulos pueden ser perpendiculares." },
        { mal: "|(3, 4)| = 3 + 4", bien: "|(3, 4)| = 5", por: "Pitágoras." },
        { mal: "Punto medio = (a₁ + b₁, a₂ + b₂)", bien: "…dividido entre 2", por: "Es una media." },
        { mal: "Paralelos si 2 < 4 y 3 < 5", bien: "Paralelos si son proporcionales", por: "2/4 ≠ 3/5." }
      ] }
  ];

  B.registrar("mates1", "t7", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
