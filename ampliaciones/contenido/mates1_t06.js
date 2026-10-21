/* ============================================================
   Matemáticas I · ampliaciones · Tema 6: Números complejos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t6/" + ref); }

  var resumen = [
    "La <b>unidad imaginaria</b> i cumple i² = −1. Un complejo es <b>z = a + bi</b> (parte real a, parte imaginaria b). Las potencias de i se repiten de 4 en 4.",
    "Se suma y se resta por partes; se multiplica con la distributiva (i² = −1); se divide <b>multiplicando por el conjugado</b> del denominador.",
    "En el plano complejo z es el punto (a, b). <b>Módulo</b> |z| = √(a² + b²); <b>argumento</b> θ con tan θ = b/a (¡mira el cuadrante!).",
    "Forma polar: <b>z = r<sub>θ</sub> = r(cos θ + i·sen θ)</b>. Multiplicar: módulos × y argumentos +. Dividir: módulos ÷ y argumentos −.",
    "<b>De Moivre</b>: zⁿ = rⁿ·(cos nθ + i·sen nθ). Las <b>raíces n-ésimas</b> son n puntos de un polígono regular: ⁿ√r con argumentos (θ + 360°k)/n.",
    "Toda ecuación polinómica de grado n tiene n raíces complejas (contando repeticiones)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Por qué
  secciones[0] =
    "<h5>Una pequeña historia: los complejos nacieron de las ecuaciones de tercer grado</h5>" +
    "<p>Los números imaginarios no surgieron de la ecuación x² + 1 = 0 (esa se descartaba diciendo «no tiene solución»), sino de una sorpresa en el siglo XVI. Cuando Cardano (1545) publicó la fórmula para resolver las ecuaciones de tercer grado, ocurrió algo extraño: ecuaciones como x³ = 15x + 4, que tienen una solución real evidente (x = 4), obligaban en la fórmula a pasar por raíces cuadradas de números negativos. Bombelli (1572) tuvo la idea de operar con esos símbolos «imposibles» como si fueran números, y al final del cálculo los trozos imaginarios se cancelaban y salía el 4. Había que aceptarlos: eran un puente necesario. Euler les dio la letra <b>i</b> (siglo XVIII) y Gauss los dibujó en un plano (hacia 1800).</p>" +
    "<h5>Cuidado con √(−1)</h5>" +
    "<p>Se puede escribir i = √−1, pero las propiedades de las raíces de reales positivos <b>no</b> siguen valiendo con negativos. Por ejemplo, √(−4)·√(−9) = (2i)(3i) = 6i² = <b>−6</b>, y en cambio √((−4)(−9)) = √36 = 6. Por eso conviene escribir siempre primero √(−a) = √a·i y operar después: √(−4) = 2i, √(−9) = 3i, √(−5) = i√5.</p>" +
    "<h5>Las potencias de i dan vueltas de 90°</h5>" +
    "<p>Calculando: i⁰ = 1, i¹ = i, i² = −1, i³ = i²·i = −i, i⁴ = i²·i² = 1, i⁵ = i⁴·i = i… ¡se repite cada 4! Así que para calcular iⁿ basta dividir n entre 4 y mirar el <b>resto</b>: resto 0 → 1; resto 1 → i; resto 2 → −1; resto 3 → −i. (Multiplicar por i equivale a girar 90°, como se ve en el plano complejo.)</p>" +
    w("potenciasi") +
    ejemplo("Potencias grandes", "Calcula i²⁵, i¹⁰² y i⁻³, y la suma 1 + i + i² + i³ + … + i⁹⁹.", [
      "25 = 4·6 + 1 → i²⁵ = i¹ = <b>i</b>.",
      "102 = 4·25 + 2 → i¹⁰² = i² = <b>−1</b>.",
      "i⁻³ = 1/i³ = 1/(−i) = i/(−i·i) = i/1 = <b>i</b>. (También: −3 + 4 = 1 → i¹ = i, porque sumar un múltiplo de 4 al exponente no cambia el resultado.)",
      "Cada cuatro potencias seguidas suman 1 + i − 1 − i = 0. La suma de i⁰ a i⁹⁹ tiene 100 términos = 25 bloques de 4 → <b>0</b>."
    ]) +
    "<h5>Ecuaciones de segundo grado que antes «no tenían solución»</h5>" +
    "<p>Con i, la fórmula de la ecuación de segundo grado funciona siempre: si Δ = b² − 4ac es negativo, √Δ = i·√|Δ| y las soluciones son dos complejos <b>conjugados</b>.</p>" +
    ejemplo("Δ negativo", "Resuelve x² + 2x + 5 = 0 y x² + x + 1 = 0.", [
      "x² + 2x + 5 = 0: Δ = 4 − 20 = −16 → √Δ = 4i → x = (−2 ± 4i)/2 = <b>−1 ± 2i</b>. (Comprobación: la suma −2 = −b/a y el producto (−1)² + 2² = 5 = c/a ✓.)",
      "x² + x + 1 = 0: Δ = 1 − 4 = −3 → √Δ = i√3 → x = <b>(−1 ± i√3)/2</b>. Son los números llamados «raíces cúbicas de la unidad» (ya aparecerán en este tema)."
    ]) +
    "<h5>El teorema fundamental del álgebra</h5>" +
    "<p>Con los complejos se cierra el círculo: <b>toda ecuación polinómica de grado n tiene exactamente n raíces complejas</b> (contando cada raíz tantas veces como su multiplicidad). Por eso x² + 1 tiene dos (i y −i), x³ − 1 tiene tres, etc. No hace falta inventar ningún número más. Además, si el polinomio tiene coeficientes reales, las raíces no reales vienen siempre <b>por parejas de conjugados</b>: si 3 − 2i es raíz, 3 + 2i también.</p>";

  // ---------------------------------------------------------------- 2. Binómica
  secciones[1] =
    "<h5>Igualdad, conjugado y opuesto</h5>" +
    "<ul><li><b>Dos complejos son iguales</b> cuando tienen la misma parte real y la misma parte imaginaria: a + bi = c + di ⇔ a = c y b = d. Es la propiedad más usada para <i>resolver ecuaciones</i>: una igualdad entre complejos equivale a <b>dos igualdades entre reales</b>.</li>" +
    "<li>El <b>opuesto</b> de a + bi es −a − bi. El <b>conjugado</b> es a − bi (se cambia sólo el signo de la parte imaginaria).</li>" +
    "<li>Un número es <b>real</b> si b = 0, <b>imaginario puro</b> si a = 0 y b ≠ 0. Un complejo es igual a su conjugado si y sólo si es real.</li></ul>" +
    ejemplo("Hallar x e y reales", "Halla x e y para que (2x − y) + (x + 3y)i = 5 + 6i.", [
      "Igualamos partes reales: 2x − y = 5. Igualamos partes imaginarias: x + 3y = 6.",
      "Despejando y = 2x − 5 en la segunda: x + 3(2x − 5) = 6 → 7x = 21 → x = 3, y = 1.",
      "<b>x = 3 e y = 1</b>. Comprobación: (6 − 1) + (3 + 3)i = 5 + 6i ✓."
    ]) +
    ejemplo("Parte real e imaginaria", "Indica Re(z), Im(z) y el conjugado de z = −2 + 5i, w = 7i y u = 4.", [
      "z = −2 + 5i: Re = −2, Im = 5 (el 5, no «5i»), conjugado −2 − 5i.",
      "w = 7i: Re = 0, Im = 7, imaginario puro, conjugado −7i.",
      "u = 4: Re = 4, Im = 0, real puro, conjugado 4 (igual a sí mismo)."
    ]);

  // ---------------------------------------------------------------- 3. Operaciones
  secciones[2] =
    "<h5>Las reglas, con una calculadora que muestra los pasos</h5>" +
    "<p>Prueba con tus números y mira cómo se desarrolla cada operación, y dónde aparece cada resultado en el plano:</p>" +
    w("operaciones") +
    "<h5>Propiedades del conjugado (lo que más se usa)</h5>" +
    "<ul><li><b>z + z̄ = 2a</b> (siempre un número real) y <b>z − z̄ = 2bi</b> (imaginario puro).</li>" +
    "<li><b>z·z̄ = a² + b² = |z|²</b> (siempre un real ≥ 0). Es la clave de la división.</li>" +
    "<li>El conjugado de una suma, producto o cociente es la suma, producto o cociente de los conjugados: conj(z·w) = z̄·w̄.</li></ul>" +
    ejemplo("División con el conjugado", "Calcula (3 − 2i)/(1 + 2i).", [
      "Multiplicamos arriba y abajo por el conjugado del denominador, 1 − 2i.",
      "Denominador: (1 + 2i)(1 − 2i) = 1 + 4 = 5.",
      "Numerador: (3 − 2i)(1 − 2i) = 3 − 6i − 2i + 4i² = 3 − 8i − 4 = −1 − 8i.",
      "(−1 − 8i)/5 = <b>−1/5 − (8/5)i</b> = −0,2 − 1,6i."
    ]) +
    ejemplo("Potencias de un complejo en binómica", "Calcula (1 + i)² y (2 − i)³.", [
      "(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = <b>2i</b> (es la identidad notable (a + b)² con i² = −1).",
      "(2 − i)² = 4 − 4i + i² = 3 − 4i. Entonces (2 − i)³ = (3 − 4i)(2 − i) = 6 − 3i − 8i + 4i² = 6 − 11i − 4 = <b>2 − 11i</b>."
    ]) +
    ejemplo("Despejar un complejo", "Resuelve (1 + 2i)·z = 3 − i.", [
      "z = (3 − i)/(1 + 2i). Multiplicamos por el conjugado del denominador: (3 − i)(1 − 2i)/5 = (3 − 6i − i + 2i²)/5 = (1 − 7i)/5.",
      "<b>z = 1/5 − (7/5)i</b> = 0,2 − 1,4i. Comprobación: (1 + 2i)(0,2 − 1,4i) = 0,2 − 1,4i + 0,4i − 2,8i² = 0,2 + 2,8 − i = 3 − i ✓."
    ]) +
    ojo("al multiplicar, no te olvides de que <b>i² = −1</b>: el producto (a + bi)(c + di) tiene parte real ac − bd, con un <b>menos</b>. Y no «dejes» una i en el denominador: siempre se multiplica por el conjugado hasta que el denominador sea real.");

  // ---------------------------------------------------------------- 4. Plano
  secciones[3] =
    "<h5>Dos números en el plano: suma, producto y cociente</h5>" +
    "<p>El plano complejo no es sólo una forma de dibujar: las operaciones tienen un significado geométrico. Arrastra los puntos y observa. La <b>suma</b> es la diagonal del paralelogramo (como sumar vectores). El <b>conjugado</b> es el reflejo respecto del eje real. El <b>opuesto</b>, el simétrico respecto del origen. Y el <b>producto</b> y el <b>cociente</b> son giros y estiramientos:</p>" +
    w("plano") +
    "<p>Una consecuencia importante: <b>multiplicar por i</b> es girar 90° (porque i tiene módulo 1 y argumento 90°). Por ejemplo, el punto 2 + i, al multiplicarlo por i, pasa a ser (2 + i)·i = 2i + i² = −1 + 2i: es el mismo punto girado 90° alrededor del origen en sentido antihorario.</p>" +
    ejemplo("Un giro de 90° y la suma", "El triángulo con vértices 0, 4 y 4 + 3i: gíralo 90° alrededor del origen. ¿Dónde caen 4 y 4 + 3i?", [
      "Girar 90° es multiplicar por i: 4·i = <b>4i</b> y (4 + 3i)·i = 4i + 3i² = <b>−3 + 4i</b>.",
      "El vértice 0 no se mueve. Comprobamos que las distancias se conservan: |4 + 3i| = 5 y |−3 + 4i| = 5 ✓."
    ]);

  // ---------------------------------------------------------------- 5. Módulo y argumento
  secciones[4] =
    "<h5>Cómo calcular el argumento sin equivocarse de cuadrante</h5>" +
    "<p>La calculadora, con tan⁻¹(b/a), sólo devuelve ángulos entre −90° y 90° (cuadrantes I y IV). Si el afijo está en el II o III, el ángulo sale equivocado en 180°. El método seguro:</p>" +
    "<ol><li>Dibuja (o razona) en qué <b>cuadrante</b> está el punto (a, b).</li><li>Calcula el <b>ángulo de referencia</b> α = arctan(|b|/|a|) (siempre agudo).</li><li>El argumento es α (cuadrante I), 180° − α (II), 180° + α (III) o 360° − α (IV). Si está sobre un eje, se lee directamente.</li></ol>" +
    ejemplo("Un argumento en cada cuadrante", "Calcula módulo y argumento de 1 + i, −1 + i, −√3 − i y 2 − 2√3 i.", [
      "<b>1 + i</b>: |z| = √2. 1.er cuadrante, α = arctan(1) = 45° → θ = <b>45°</b>.",
      "<b>−1 + i</b>: |z| = √2. 2.º cuadrante, α = 45° → θ = 180° − 45° = <b>135°</b>.",
      "<b>−√3 − i</b>: |z| = √(3 + 1) = 2. 3.er cuadrante, α = arctan(1/√3) = 30° → θ = 180° + 30° = <b>210°</b>.",
      "<b>2 − 2√3 i</b>: |z| = √(4 + 12) = 4. 4.º cuadrante, α = arctan(2√3/2) = arctan √3 = 60° → θ = 360° − 60° = <b>300°</b> (o −60°)."
    ]) +
    ejemplo("Sobre los ejes", "Argumento de 3, −2, 5i y −4i.", [
      "<b>3</b>: eje real positivo → 0°. <b>−2</b>: eje real negativo → 180°. <b>5i</b>: eje imaginario positivo → 90°. <b>−4i</b>: eje imaginario negativo → 270° (o −90°)."
    ]) +
    "<h5>Propiedades del módulo</h5>" +
    "<ul><li>|z|² = z·z̄ y |z̄| = |−z| = |z|.</li><li>|z·w| = |z|·|w| y |z/w| = |z|/|w|.</li><li>Desigualdad triangular: |z + w| ≤ |z| + |w| (el lado de un triángulo no supera a la suma de los otros dos).</li><li>|z − w| es la <b>distancia entre los puntos</b> z y w. Esto permite describir circunferencias y mediatrices (sección 9).</li></ul>" +
    "<p>El argumento no es único: si θ es un argumento, θ + 360°·k también. Se suele tomar el <b>argumento principal</b>, el que está en [0°, 360°) (o en (−180°, 180°], según el libro). También se mide en radianes: arg(−1 + i) = 3π/4.</p>";

  // ---------------------------------------------------------------- 6. Polar
  secciones[5] =
    "<h5>Cuatro formas de escribir el mismo número</h5>" +
    tabla(["Forma", "Escritura", "Ejemplo (z = 1 + i)"], [
      ["Binómica", "a + bi", "1 + i"],
      ["Polar", "r<sub>θ</sub>", "√2<sub>45°</sub>"],
      ["Trigonométrica", "r(cos θ + i·sen θ)", "√2(cos 45° + i·sen 45°)"],
      ["Exponencial (Euler)", "r·e<sup>iθ</sup> (θ en radianes)", "√2·e<sup>iπ/4</sup>"]
    ]) +
    "<p>La última (fórmula de Euler, e<sup>iθ</sup> = cos θ + i·sen θ) aparece en cursos de ingeniería y física: la verás en 2.º y en la universidad. Una consecuencia famosa: e<sup>iπ</sup> + 1 = 0, que une los cinco números más importantes de las matemáticas.</p>" +
    w("conversor") +
    ejemplo("De binómica a polar", "Escribe z = −1 + i y w = 4 − 4√3 i en forma polar.", [
      "z = −1 + i: |z| = √2 y θ = 135° (2.º cuadrante). <b>z = √2<sub>135°</sub></b>.",
      "w = 4 − 4√3 i: |w| = √(16 + 48) = 8. α = arctan(4√3/4) = 60°, 4.º cuadrante → θ = 300°. <b>w = 8<sub>300°</sub></b>."
    ]) +
    ejemplo("De polar a binómica", "Pasa a binómica 3<sub>150°</sub> y 2<sub>90°</sub>.", [
      "3<sub>150°</sub> = 3(cos 150° + i·sen 150°) = 3(−√3/2 + i/2) = <b>−3√3/2 + (3/2)i ≈ −2,598 + 1,5i</b>.",
      "2<sub>90°</sub> = 2(cos 90° + i·sen 90°) = 2(0 + i) = <b>2i</b>."
    ]) +
    "<p>Algunos números tienen formas polares que conviene reconocer: 1 = 1<sub>0°</sub>, i = 1<sub>90°</sub>, −1 = 1<sub>180°</sub>, −i = 1<sub>270°</sub>; y cualquier real positivo r = r<sub>0°</sub>, real negativo −r = r<sub>180°</sub>.</p>";

  // ---------------------------------------------------------------- 7. Mult, div, potencias
  secciones[6] =
    "<h5>Por qué en polar se multiplican los módulos y se suman los argumentos</h5>" +
    "<p>Es una consecuencia directa de las fórmulas de suma de ángulos del Tema 5. Sea z = r(cos α + i·sen α) y w = s(cos β + i·sen β). Entonces:</p>" +
    "<p>z·w = rs[(cos α·cos β − sen α·sen β) + i(sen α·cos β + cos α·sen β)] = rs[<b>cos(α + β) + i·sen(α + β)</b>] = (rs)<sub>α+β</sub>.</p>" +
    "<p>Dividir es lo inverso: (r/s)<sub>α−β</sub>. Y la potencia, repetir el producto n veces, da el <b>teorema de De Moivre</b>: (r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>.</p>" +
    ejemplo("Producto, cociente y potencia", "Calcula 2<sub>30°</sub>·5<sub>75°</sub>, 12<sub>200°</sub>/3<sub>50°</sub> y (3<sub>20°</sub>)⁴.", [
      "Producto: módulos 2·5 = 10, argumentos 30° + 75° = 105°. <b>10<sub>105°</sub></b>.",
      "Cociente: módulos 12/3 = 4, argumentos 200° − 50° = 150°. <b>4<sub>150°</sub></b>.",
      "Potencia: módulo 3⁴ = 81, argumento 4·20° = 80°. <b>81<sub>80°</sub></b>."
    ]) +
    ejemplo("Una potencia grande, sin desarrollar", "Calcula (1 + i)⁸ y (√3 + i)¹⁰.", [
      "1 + i = √2<sub>45°</sub>. (1 + i)⁸ = ((√2)⁸)<sub>8·45°</sub> = 16<sub>360°</sub> = 16<sub>0°</sub> = <b>16</b>.",
      "√3 + i = 2<sub>30°</sub>. (√3 + i)¹⁰ = (2¹⁰)<sub>300°</sub> = 1024(cos 300° + i·sen 300°) = 1024(1/2 − (√3/2)i) = <b>512 − 512√3 i ≈ 512 − 886,8i</b>."
    ]) +
    ejemplo("Combinar forma polar y binómica", "Calcula (1 + i)²⁰/(1 − i)¹⁰.", [
      "1 + i = √2<sub>45°</sub> → (1 + i)²⁰ = ((√2)²⁰)<sub>900°</sub> = 1024<sub>180°</sub> = −1024.",
      "1 − i = √2<sub>315°</sub> → (1 − i)¹⁰ = ((√2)¹⁰)<sub>3150°</sub> = 32<sub>270°</sub> (3150° − 8·360° = 270°) = −32i.",
      "Cociente: (−1024)/(−32i) = 32/i = −32i. En polar: <b>32<sub>270°</sub></b>."
    ]) +
    ojo("al multiplicar en polar, los argumentos se <b>suman</b> (no se multiplican) y al elevar a n el módulo se eleva a n pero el argumento <b>se multiplica</b> por n. Y recuerda reducir el argumento resultante a [0°, 360°).");

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Raíces n-ésimas de un número complejo",
      html:
        "<p>Calcular una raíz n-ésima de w es encontrar todos los z con zⁿ = w. En ℂ hay <b>exactamente n</b>. Con De Moivre se encuentran fácilmente: si w = r<sub>θ</sub>, buscamos z = ρ<sub>φ</sub> con ρⁿ = r y nφ = θ + 360°·k (el argumento de zⁿ sólo se conoce salvo vueltas completas). Despejando:</p>" +
        H.formula("ⁿ√(r<sub>θ</sub>) = ( ⁿ√r )<sub>(θ + 360°·k)/n</sub>          k = 0, 1, 2, …, n − 1") +
        "<p>Esos n números tienen el <b>mismo módulo</b> y sus argumentos se separan 360°/n: son los vértices de un <b>polígono regular de n lados</b> inscrito en una circunferencia. Cambia el índice y el número:</p>" +
        w("raices") +
        ejemplo("Raíces cúbicas de 8", "Halla las raíces cúbicas de 8.", [
          "8 = 8<sub>0°</sub>. Módulo de las raíces: ∛8 = 2. Argumentos: (0° + 360°·k)/3 = 0°, 120°, 240°.",
          "<b>2<sub>0°</sub> = 2</b>, <b>2<sub>120°</sub> = −1 + √3 i</b> y <b>2<sub>240°</sub> = −1 − √3 i</b>. Forman un triángulo equilátero de radio 2; sólo una de las tres es real."
        ]) +
        ejemplo("Raíces cuadradas de −4", "Halla las raíces cuadradas de −4.", [
          "−4 = 4<sub>180°</sub>. Módulo: √4 = 2. Argumentos: (180° + 360°k)/2 = 90°, 270°.",
          "<b>2<sub>90°</sub> = 2i</b> y <b>2<sub>270°</sub> = −2i</b>. (Se comprueba: (2i)² = 4i² = −4 ✓.)"
        ]) +
        ejemplo("Raíces cuartas de −16", "Halla las raíces cuartas de −16.", [
          "−16 = 16<sub>180°</sub>. Módulo: ⁴√16 = 2. Argumentos: (180° + 360°k)/4 = 45°, 135°, 225°, 315°.",
          "Las cuatro raíces son 2<sub>45°</sub>, 2<sub>135°</sub>, 2<sub>225°</sub> y 2<sub>315°</sub>, es decir, <b>±√2 ± √2 i</b> (los vértices de un cuadrado). Su suma es 0, como la de las raíces de cualquier z<sup>n</sup> − w con n ≥ 2."
        ]) +
        ejemplo("Raíces de la unidad", "Halla las raíces sextas de 1 y el lado del polígono que forman.", [
          "1 = 1<sub>0°</sub>: módulo 1 y argumentos 0°, 60°, 120°, 180°, 240°, 300°: z = 1, (1 + √3 i)/2, (−1 + √3 i)/2, −1, (−1 − √3 i)/2, (1 − √3 i)/2.",
          "Forman un hexágono regular inscrito en la circunferencia de radio 1, y por eso el lado mide <b>1</b> (en un hexágono regular, el lado es igual al radio). En general, el lado es 2·sen(180°/n)."
        ]) +
        ojo("no te quedes con una sola raíz: cuando se pide «las raíces», hay que dar las <b>n</b>. Y comprueba con tu calculadora que (raíz)ⁿ vuelve a w.")
    },
    {
      h: "9. Ecuaciones en ℂ",
      html:
        "<p>Casi todas las ecuaciones con complejos se resuelven con una de estas técnicas:</p>" +
        "<ul><li><b>Ecuaciones polinómicas</b> con las fórmulas del Tema 3 (la ecuación de segundo grado con Δ &lt; 0 da dos conjugados).</li>" +
        "<li><b>Ecuaciones binomias</b> zⁿ = w: raíces n-ésimas en polar.</li>" +
        "<li><b>Con z y z̄ a la vez</b>: se escribe z = x + yi (x, y reales), se desarrolla y se iguala parte real con parte real y parte imaginaria con parte imaginaria.</li></ul>" +
        ejemplo("Con z y su conjugado", "Resuelve z + 2z̄ = 3 + 2i.", [
          "Sea z = x + yi, con lo que z̄ = x − yi. Entonces z + 2z̄ = (x + yi) + (2x − 2yi) = 3x − yi.",
          "Igualando con 3 + 2i: 3x = 3 y −y = 2 → x = 1, y = −2.",
          "<b>z = 1 − 2i</b>. Comprobación: (1 − 2i) + 2(1 + 2i) = 3 + 2i ✓."
        ]) +
        ejemplo("Raíz cuadrada en binómica", "Halla las raíces cuadradas de −3 + 4i sin pasar a polar.", [
          "Buscamos z = x + yi con z² = −3 + 4i, es decir, (x² − y²) + 2xy·i = −3 + 4i → x² − y² = −3 y 2xy = 4.",
          "De la segunda, y = 2/x. En la primera: x² − 4/x² = −3 → x⁴ + 3x² − 4 = 0 (bicuadrada) → x² = 1 (la otra, x² = −4, no es real) → x = ±1, y = ±2.",
          "Raíces: <b>1 + 2i</b> y <b>−1 − 2i</b>. Comprobación: (1 + 2i)² = 1 + 4i − 4 = −3 + 4i ✓."
        ]) +
        ejemplo("z² = z̄", "Halla todos los complejos que cumplen z² = z̄.", [
          "Con z = x + yi: (x² − y²) + 2xy·i = x − yi → x² − y² = x y 2xy = −y.",
          "De la segunda: y(2x + 1) = 0 → y = 0 o x = −1/2.",
          "Si y = 0: x² = x → x = 0 o x = 1. Si x = −1/2: 1/4 − y² = −1/2 → y² = 3/4 → y = ±√3/2.",
          "<b>Cuatro soluciones</b>: 0, 1 y (−1 ± √3 i)/2 (las dos últimas son 1<sub>120°</sub> y 1<sub>240°</sub>)."
        ]) +
        ejemplo("Sistema con complejos", "Resuelve z + w = 4 + i y z − w = 2 + 3i.", [
          "Sumando: 2z = 6 + 4i → z = 3 + 2i. Restando: 2w = 2 − 2i → w = 1 − i.",
          "<b>z = 3 + 2i y w = 1 − i</b>. (Mismas técnicas de reducción que con reales.)"
        ])
    },
    {
      h: "10. Geometría con complejos: lugares geométricos y giros",
      html:
        "<p>Como |z − a| es la distancia de z al punto a, muchas figuras se describen con una condición sencilla sobre z. Escribiendo z = x + yi se pasa a la ecuación cartesiana de siempre. Prueba las cinco condiciones más típicas:</p>" +
        w("lugar") +
        ejemplo("Pasar a coordenadas", "Describe el conjunto |z − 2i| = 3 y el conjunto |z − 1| = |z + i|.", [
          "|z − 2i| = 3: z = x + yi → |x + (y − 2)i| = 3 → x² + (y − 2)² = 9. Es la <b>circunferencia de centro (0, 2) y radio 3</b>.",
          "|z − 1| = |z + i|: la distancia a 1 es igual a la distancia a −i: es la <b>mediatriz</b> del segmento que une 1 con −i. En coordenadas: (x − 1)² + y² = x² + (y + 1)² → −2x + 1 = 2y + 1 → <b>y = −x</b>."
        ]) +
        "<h5>Giros, homotecias y movimientos con complejos</h5>" +
        "<p>Multiplicar por un complejo r<sub>α</sub> es hacer un <b>giro de ángulo α</b> alrededor del origen y una <b>homotecia de razón r</b>. Si r = 1, es un giro puro. Para girar respecto de otro centro c, se resta c, se gira y se vuelve a sumar: z' = c + (z − c)·1<sub>α</sub>.</p>" +
        ejemplo("Un giro de 60°", "Gira el punto 2 + i un ángulo de 60° alrededor del origen.", [
          "Multiplicamos por 1<sub>60°</sub> = cos 60° + i·sen 60° = 1/2 + (√3/2)i.",
          "(2 + i)(1/2 + (√3/2)i) = 1 + √3 i + i/2 + (√3/2)i² = (1 − √3/2) + (√3 + 1/2)i ≈ <b>0,134 + 2,232i</b>.",
          "Comprobación: |2 + i| = √5 = 2,236 y |0,134 + 2,232i| = 2,236 ✓ (el giro conserva el módulo)."
        ]) +
        ejemplo("Un cuadrado con complejos", "Un cuadrado tiene un vértice en 1 + i y centro en el origen. ¿Cuáles son los otros vértices?", [
          "Girar 90° alrededor del centro es multiplicar por i: los vértices son z, iz, −z y −iz.",
          "Con z = 1 + i: i(1 + i) = −1 + i; −z = −1 − i; −i(1 + i) = 1 − i.",
          "<b>Vértices: 1 + i, −1 + i, −1 − i, 1 − i</b>."
        ]) +
        ejemplo("Área de un triángulo", "Calcula el área del triángulo de vértices 0, 1 + 2i y 3 + i.", [
          "Con z₁ = 1 + 2i y z₂ = 3 + i, el área es ½·|Im(z̄₁·z₂)| = ½·|x₁y₂ − x₂y₁| = ½·|1·1 − 3·2| = ½·5 = <b>2,5</b>.",
          "(Es el módulo del producto vectorial: la misma fórmula del determinante que verás en el tema de vectores.)"
        ])
    },
    {
      h: "11. Una curiosidad: el conjunto de Mandelbrot",
      html:
        "<p>No cae en el examen, pero sirve para ver que sumar y multiplicar complejos esconde mundos enteros. Para cada número complejo c se repite la regla <b>z → z² + c</b> partiendo de z = 0. Si el resultado se mantiene acotado, c <b>pertenece</b> al conjunto de Mandelbrot (la mancha oscura); si se dispara, se colorea según la rapidez. Toca un punto de la imagen y mira la órbita que genera:</p>" +
        w("mandelbrot")
    },
    {
      h: "12. ¿Qué forma uso? Mapa de decisiones",
      html:
        "<p>Cada operación tiene una forma preferida. Decide con qué empezarías cada problema:</p>" +
        w("clasificar", "forma") +
        "<p>Une también cada situación con la técnica que la resuelve:</p>" +
        w("emparejar", "tecnicas")
    },
    {
      h: "18. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "19. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas para fijar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    forma: {
      titulo: "¿Binómica o polar?",
      consigna: "Toca una operación y después la forma con la que resulta más cómoda.",
      categorias: ["Forma binómica (a + bi)", "Forma polar (r<sub>θ</sub>)"],
      items: [
        { t: "Sumar (3 + 2i) + (1 − 4i)", c: 0 }, { t: "Restar dos complejos", c: 0 }, { t: "Dividir (3 + 2i)/(1 − i)", c: 0 }, { t: "Multiplicar dos complejos pequeños: (2 + i)(1 − 3i)", c: 0 },
        { t: "Calcular (1 + i)²⁰", c: 1 }, { t: "Hallar las raíces cúbicas de 8", c: 1 }, { t: "Multiplicar 5<sub>40°</sub> · 2<sub>80°</sub>", c: 1 }, { t: "Calcular (√3 + i)¹⁰", c: 1 },
        { t: "Hallar el conjugado de 4 − 7i", c: 0 }, { t: "Raíz cuarta de −16", c: 1 }
      ]
    },
    tecnicas: {
      titulo: "¿Cómo se resuelve?",
      consigna: "Une cada situación con la técnica adecuada.",
      pares: [
        ["Un cociente de complejos en binómica", "Multiplicar numerador y denominador por el conjugado del denominador"],
        ["Una potencia grande como (1 + i)¹⁵", "Pasar a polar y usar De Moivre"],
        ["Una ecuación con z y z̄", "Escribir z = x + yi e igualar partes real e imaginaria"],
        ["Calcular iⁿ para n grande", "Dividir n entre 4 y mirar el resto"],
        ["Raíces n-ésimas de un complejo", "Módulo ⁿ√r y argumentos (θ + 360°k)/n"],
        ["Ecuación de 2.º grado con Δ &lt; 0", "Fórmula con √Δ = i·√|Δ|: dos soluciones conjugadas"],
        ["Un giro de 90° alrededor del origen", "Multiplicar por i"],
        ["Dos complejos iguales", "Igualar partes reales y partes imaginarias"]
      ]
    },
    tj1: {
      titulo: "Números complejos",
      cartas: [
        { a: "Unidad imaginaria", b: "i² = −1 · potencias: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, y se repite cada 4." },
        { a: "Forma binómica", b: "z = a + bi · Re(z) = a, Im(z) = b (el coeficiente, sin la i) · conjugado z̄ = a − bi." },
        { a: "Suma y producto", b: "(a + bi) ± (c + di) = (a ± c) + (b ± d)i · (a + bi)(c + di) = (ac − bd) + (ad + bc)i" },
        { a: "Cociente", b: "Se multiplica por el conjugado del denominador: (a + bi)/(c + di) = (a + bi)(c − di)/(c² + d²)" },
        { a: "Conjugado: propiedades", b: "z + z̄ = 2a · z·z̄ = a² + b² = |z|² · conj(z·w) = z̄·w̄" },
        { a: "Módulo y argumento", b: "|z| = √(a² + b²) · tan θ = b/a, eligiendo el cuadrante con el signo de a y de b." },
        { a: "Forma polar y trigonométrica", b: "z = r<sub>θ</sub> = r(cos θ + i·sen θ) · a = r·cos θ, b = r·sen θ" },
        { a: "Producto y cociente en polar", b: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub> · r<sub>α</sub>/s<sub>β</sub> = (r/s)<sub>α−β</sub>" },
        { a: "Teorema de De Moivre", b: "(r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub> = rⁿ(cos nθ + i·sen nθ)" },
        { a: "Raíces n-ésimas de r<sub>θ</sub>", b: "n raíces: módulo ⁿ√r y argumentos (θ + 360°·k)/n, con k = 0, …, n − 1. Forman un polígono regular." },
        { a: "Multiplicar por i", b: "Es un giro de 90° (antihorario) alrededor del origen." },
        { a: "|z − a|", b: "Es la distancia entre z y a. |z − a| = r es una circunferencia; |z − a| = |z − b| es una mediatriz." },
        { a: "Teorema fundamental del álgebra", b: "Un polinomio de grado n tiene n raíces complejas (contadas con multiplicidad). Si los coeficientes son reales, las no reales vienen en pares conjugados." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula (2 + 3i)(1 − i) multiplicando sólo «real por real» e «imaginario por imaginario»: 2·1 + 3i·(−i) = 2 + 3 = 5. ¿Qué falla?",
          op: ["Nada: el resultado es 5", "Faltan los productos cruzados: (2 + 3i)(1 − i) = 5 + i", "i² vale +1", "El resultado es 6i"], ok: 1,
          porque: "(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i (con i² = −1)." },
        { q: "Un alumno escribe (1 + i)² = 1² + i² = 1 − 1 = 0. ¿Qué falla?",
          op: ["Nada", "Falta el doble producto: (1 + i)² = 1 + 2i + i² = 2i", "i² = 1", "El resultado es 2"], ok: 1,
          porque: "Es la identidad notable (a + b)² = a² + 2ab + b² del Tema 3, también válida con complejos. Resultado 2i." },
        { q: "Para dividir (3 + 2i)/(1 − i), un alumno multiplica sólo el denominador por 1 + i. ¿Qué falla?",
          op: ["Nada", "Hay que multiplicar numerador y denominador (si no, cambia el valor de la fracción)", "Debía multiplicar por 1 − i", "Debía restar"], ok: 1,
          porque: "Multiplicar sólo el denominador cambia el valor. (3 + 2i)(1 + i)/[(1 − i)(1 + i)] = (1 + 5i)/2." },
        { q: "El argumento de −1 + i lo calcula un alumno como arctan(1/(−1)) = −45°, y lo da como argumento. ¿Qué falla?",
          op: ["Nada", "El punto está en el 2.º cuadrante: el argumento es 135°. La calculadora no distingue cuadrantes", "El argumento es 45°", "El argumento es 225°"], ok: 1,
          porque: "tan 135° = −1 y tan(−45°) = −1: la tangente es la misma en los dos. Sólo el cuadrante decide." },
        { q: "Un alumno calcula (3<sub>20°</sub>)⁴ como 12<sub>80°</sub>. ¿Qué falla?",
          op: ["Nada", "El módulo se ELEVA a 4: 3⁴ = 81, el resultado es 81<sub>80°</sub>", "El argumento no cambia", "El argumento debía ser 24°"], ok: 1,
          porque: "De Moivre: (r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>. Se eleva el módulo y se multiplica el argumento por n." },
        { q: "Un alumno dice «√(−4)·√(−9) = √36 = 6». ¿Qué falla?",
          op: ["Nada", "Con radicandos negativos no vale √a·√b = √(ab): (2i)(3i) = −6", "El resultado es 36", "El resultado es 6i"], ok: 1,
          porque: "Hay que pasar primero a imaginarios: √(−4) = 2i y √(−9) = 3i, y 2i·3i = 6i² = −6." },
        { q: "Un alumno da como raíces cúbicas de 8 sólo el número 2. ¿Qué falla?",
          op: ["Nada", "En ℂ hay 3 raíces cúbicas: 2, −1 + √3 i y −1 − √3 i", "Hay 2 raíces", "Sólo hay una, porque 8 es real"], ok: 1,
          porque: "Son los vértices de un triángulo equilátero: 2<sub>0°</sub>, 2<sub>120°</sub> y 2<sub>240°</sub>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Cuánto vale i⁷⁵?",
          op: ["−i", "i", "1", "−1"], ok: 0,
          porque: "75 = 4·18 + 3 → i⁷⁵ = i³ = −i." },
        { q: "(3 + 2i)(1 − 4i) =",
          op: ["11 − 10i", "−5 − 10i", "3 − 8i", "11 + 10i"], ok: 0,
          porque: "3 − 12i + 2i − 8i² = 3 − 10i + 8 = 11 − 10i." },
        { q: "El conjugado de 5 − 3i es…",
          op: ["5 + 3i", "−5 + 3i", "−5 − 3i", "3 − 5i"], ok: 0,
          porque: "Se cambia el signo de la parte imaginaria." },
        { q: "El módulo de 3 − 4i vale…",
          op: ["5", "7", "1", "25"], ok: 0,
          porque: "√(9 + 16) = 5." },
        { q: "El argumento de −√3 − i es…",
          op: ["210°", "30°", "150°", "330°"], ok: 0,
          porque: "3.er cuadrante, ángulo de referencia 30°: 180° + 30° = 210°." },
        { q: "2<sub>30°</sub> · 3<sub>60°</sub> =",
          op: ["6<sub>90°</sub>", "5<sub>90°</sub>", "6<sub>1800°</sub>", "5<sub>1800°</sub>"], ok: 0,
          porque: "Módulos se multiplican (6) y argumentos se suman (90°)." },
        { q: "(1 + i)⁴ =",
          op: ["−4", "4", "4i", "−4i"], ok: 0,
          porque: "(1 + i)² = 2i → (2i)² = 4i² = −4. Con polar: (√2)⁴ = 4 y 4·45° = 180°: 4<sub>180°</sub> = −4." },
        { q: "¿Cuántas raíces cuartas distintas tiene cualquier número complejo no nulo?",
          op: ["4", "1", "2", "Infinitas"], ok: 0,
          porque: "Siempre hay n raíces n-ésimas distintas." },
        { q: "Multiplicar un complejo por i equivale a…",
          op: ["girar 90° alrededor del origen", "girarlo 180°", "reflejarlo respecto al eje real", "duplicar su módulo"], ok: 0,
          porque: "i = 1<sub>90°</sub>: módulo 1 (no cambia la longitud) y argumento +90°." },
        { q: "Las soluciones de x² − 2x + 5 = 0 son…",
          op: ["1 ± 2i", "−1 ± 2i", "2 ± i", "1 ± 4i"], ok: 0,
          porque: "Δ = 4 − 20 = −16 → x = (2 ± 4i)/2 = 1 ± 2i." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "j1", nivel: 1,
      enunciado: "Calcula i⁴⁵ y escribe su parte real y su parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1 }],
      pistas: ["Divide el exponente entre 4 y mira el resto."],
      pasos: ["45 = 4·11 + 1 → i⁴⁵ = i¹ = i: parte real 0 y parte imaginaria 1."],
      resultado: "i" },
    { id: "j2", nivel: 1,
      enunciado: "Calcula (2 − 3i) + (5 + i). Escribe la parte real y la imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 7 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -2 }],
      pistas: ["Se suman partes reales y partes imaginarias por separado."],
      pasos: ["(2 + 5) + (−3 + 1)i = 7 − 2i."],
      resultado: "7 − 2i" },
    { id: "j3", nivel: 1,
      enunciado: "Calcula (2 + 3i)(4 − i).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 11 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 10 }],
      pistas: ["Distributiva, y sustituye i² por −1."],
      pasos: ["(2 + 3i)(4 − i) = 8 − 2i + 12i − 3i² = 8 + 10i + 3 = 11 + 10i."],
      resultado: "11 + 10i" },
    { id: "j4", nivel: 1,
      enunciado: "Para z = 3 − 4i, calcula su módulo y la parte imaginaria de su conjugado.",
      check: [{ tipo: "num", etiqueta: "|z| =", valor: 5 }, { tipo: "num", etiqueta: "Im(z̄) =", valor: 4 }],
      pistas: ["|z| = √(a² + b²). El conjugado cambia el signo de la parte imaginaria."],
      pasos: ["|z| = √(9 + 16) = 5.", "z̄ = 3 + 4i, con parte imaginaria 4."],
      resultado: "|z| = 5 · z̄ = 3 + 4i" },
    { id: "j5", nivel: 1,
      enunciado: "Calcula (1 + i)².",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2 }],
      pistas: ["(a + b)² = a² + 2ab + b², con i² = −1."],
      pasos: ["(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i."],
      resultado: "2i" },
    { id: "j6", nivel: 1,
      enunciado: "Resuelve x² + 4 = 0 en ℂ. Las soluciones son ±bi: ¿cuánto vale b?",
      check: { tipo: "num", etiqueta: "b =", valor: 2 },
      pistas: ["x² = −4."],
      pasos: ["x² = −4 → x = ±√(−4) = ±2i."],
      resultado: "x = 2i y x = −2i" },
    { id: "j7", nivel: 1,
      enunciado: "Calcula (4 + 2i)/(1 + i).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 3 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1 }],
      pistas: ["Multiplica arriba y abajo por 1 − i."],
      pasos: ["(4 + 2i)(1 − i)/[(1 + i)(1 − i)] = (4 − 4i + 2i − 2i²)/2 = (6 − 2i)/2 = 3 − i."],
      resultado: "3 − i" },
    { id: "j8", nivel: 1,
      enunciado: "Escribe z = 2i en forma polar: módulo y argumento (en grados).",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "argumento =", valor: 90, unidad: "°" }],
      pistas: ["El afijo (0, 2) está en el eje imaginario positivo."],
      pasos: ["|z| = 2 y el argumento es 90°: z = 2<sub>90°</sub>."],
      resultado: "2<sub>90°</sub>" },
    { id: "j9", nivel: 1,
      enunciado: "Escribe en forma binómica el número 4<sub>60°</sub>. Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 3.4641, tol: 0.002 }],
      pistas: ["a = r·cos θ y b = r·sen θ."],
      pasos: ["a = 4·cos 60° = 2. b = 4·sen 60° = 4·(√3/2) = 2√3 ≈ 3,464.", "4<sub>60°</sub> = 2 + 2√3 i."],
      resultado: "2 + 2√3 i" },
    { id: "j10", nivel: 1,
      enunciado: "Calcula el módulo de −5 + 12i.",
      check: { tipo: "num", etiqueta: "módulo =", valor: 13 },
      pistas: ["Pitágoras con a = −5 y b = 12."],
      pasos: ["√(25 + 144) = √169 = 13."],
      resultado: "13" },
    // ================= ★★ medio =================
    { id: "j11", nivel: 2,
      enunciado: "Calcula la suma 1 + i + i² + i³ + … + i⁹⁹ (100 términos).",
      check: { tipo: "num", etiqueta: "suma =", valor: 0 },
      pistas: ["Cada bloque de 4 potencias consecutivas suma 0."],
      pasos: ["1 + i − 1 − i = 0. Hay 100 términos = 25 bloques de 4: la suma es 25·0 = 0."],
      resultado: "0" },
    { id: "j12", nivel: 2,
      enunciado: "Resuelve x² − 2x + 5 = 0 en ℂ. Las soluciones son a ± bi con b &gt; 0: da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 1 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["Δ = 4 − 20 = −16."],
      pasos: ["x = (2 ± √(−16))/2 = (2 ± 4i)/2 = 1 ± 2i."],
      resultado: "x = 1 ± 2i" },
    { id: "j13", nivel: 2,
      enunciado: "Calcula (3 − 2i)/(1 + 2i). Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -0.2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1.6 }],
      pistas: ["Multiplica por el conjugado 1 − 2i."],
      pasos: ["(3 − 2i)(1 − 2i) = 3 − 6i − 2i + 4i² = −1 − 8i. Denominador: 5.", "(−1 − 8i)/5 = −0,2 − 1,6i."],
      resultado: "−1/5 − (8/5)i" },
    { id: "j14", nivel: 2,
      enunciado: "Resuelve (1 + 2i)·z = 3 − i. Da la parte real e imaginaria de z (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0.2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1.4 }],
      pistas: ["z = (3 − i)/(1 + 2i)."],
      pasos: ["z = (3 − i)(1 − 2i)/5 = (3 − 6i − i + 2i²)/5 = (1 − 7i)/5 = 0,2 − 1,4i."],
      resultado: "z = (1 − 7i)/5" },
    { id: "j15", nivel: 2,
      enunciado: "Halla los reales x e y que cumplen (2x − y) + (x + 3y)i = 5 + 6i.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 3 }, { tipo: "num", etiqueta: "y =", valor: 1 }],
      pistas: ["Dos complejos son iguales si lo son sus partes real e imaginaria."],
      pasos: ["2x − y = 5 y x + 3y = 6.", "y = 2x − 5 → x + 6x − 15 = 6 → x = 3, y = 1."],
      resultado: "x = 3 e y = 1" },
    { id: "j16", nivel: 2,
      enunciado: "Calcula el módulo y el argumento (en grados) de −1 + i.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 1.4142, tol: 0.002 }, { tipo: "num", etiqueta: "argumento =", valor: 135, unidad: "°" }],
      pistas: ["El afijo (−1, 1) está en el 2.º cuadrante."],
      pasos: ["|z| = √2. Ángulo de referencia 45° → 180° − 45° = 135°."],
      resultado: "√2<sub>135°</sub>" },
    { id: "j17", nivel: 2,
      enunciado: "Calcula el módulo y el argumento (en grados, entre 0° y 360°) de −√3 − i.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "argumento =", valor: 210, unidad: "°" }],
      pistas: ["3.er cuadrante: 180° + ángulo de referencia."],
      pasos: ["|z| = √(3 + 1) = 2. α = arctan(1/√3) = 30°.", "θ = 180° + 30° = 210°."],
      resultado: "2<sub>210°</sub>" },
    { id: "j18", nivel: 2,
      enunciado: "Escribe en binómica 3<sub>150°</sub>. Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -2.598, tol: 0.002 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1.5 }],
      pistas: ["cos 150° = −√3/2 y sen 150° = 1/2."],
      pasos: ["a = 3·(−√3/2) = −3√3/2 ≈ −2,598. b = 3·(1/2) = 1,5."],
      resultado: "−3√3/2 + (3/2)i" },
    { id: "j19", nivel: 2,
      enunciado: "Calcula 2<sub>30°</sub> · 5<sub>75°</sub> en forma polar: módulo y argumento.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 10 }, { tipo: "num", etiqueta: "argumento =", valor: 105, unidad: "°" }],
      pistas: ["Se multiplican los módulos y se suman los argumentos."],
      pasos: ["Módulo 2·5 = 10. Argumento 30° + 75° = 105°."],
      resultado: "10<sub>105°</sub>" },
    { id: "j20", nivel: 2,
      enunciado: "Calcula 12<sub>200°</sub> / 3<sub>50°</sub> en forma polar: módulo y argumento.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 4 }, { tipo: "num", etiqueta: "argumento =", valor: 150, unidad: "°" }],
      pistas: ["Se dividen los módulos y se restan los argumentos."],
      pasos: ["Módulo 12/3 = 4. Argumento 200° − 50° = 150°."],
      resultado: "4<sub>150°</sub>" },
    { id: "j21", nivel: 2,
      enunciado: "Calcula (1 − i)⁶ en forma binómica: parte real y parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 8 }],
      pistas: ["1 − i = √2<sub>315°</sub>. O bien (1 − i)² = −2i."],
      pasos: ["(1 − i)² = 1 − 2i + i² = −2i. Entonces (1 − i)⁶ = (−2i)³ = −8i³ = −8·(−i) = 8i.", "En polar: (√2)⁶ = 8 y 6·315° = 1890° = 5·360° + 90°: 8<sub>90°</sub> = 8i."],
      resultado: "8i" },
    { id: "j22", nivel: 2,
      enunciado: "Calcula (√3 + i)¹⁰ en forma binómica (decimales): parte real e imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 512 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -886.81, tol: 0.001 }],
      pistas: ["√3 + i = 2<sub>30°</sub>."],
      pasos: ["(2<sub>30°</sub>)¹⁰ = 1024<sub>300°</sub> = 1024(cos 300° + i·sen 300°) = 1024(1/2 − (√3/2)i).", "= 512 − 512√3 i ≈ 512 − 886,81i."],
      resultado: "512 − 512√3 i" },
    { id: "j23", nivel: 2,
      enunciado: "Halla las raíces cuadradas de −4. Escribe la parte imaginaria de cada una.",
      check: { tipo: "lista", etiqueta: "partes imaginarias:", valores: [2, -2] },
      pistas: ["−4 = 4<sub>180°</sub>."],
      pasos: ["Módulo √4 = 2, argumentos 90° y 270°: 2i y −2i."],
      resultado: "2i y −2i" },
    { id: "j24", nivel: 2,
      enunciado: "Halla las raíces cúbicas de 8. Escribe la parte real e imaginaria de la que tiene argumento 120°.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1.7321, tol: 0.002 }],
      pistas: ["8 = 8<sub>0°</sub>: módulo 2 y argumentos 0°, 120°, 240°."],
      pasos: ["2<sub>120°</sub> = 2(cos 120° + i·sen 120°) = 2(−1/2 + (√3/2)i) = −1 + √3 i."],
      resultado: "−1 + √3 i (y 2, y −1 − √3 i)" },
    { id: "j25", nivel: 2,
      enunciado: "Halla las raíces cuadradas de −3 + 4i. Da la de parte real positiva: parte real e imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2 }],
      pistas: ["Sea z = x + yi con z² = −3 + 4i: x² − y² = −3 y 2xy = 4."],
      pasos: ["y = 2/x → x⁴ + 3x² − 4 = 0 → x² = 1 → x = ±1.", "Raíces: 1 + 2i y −1 − 2i."],
      resultado: "±(1 + 2i)" },
    // ================= ★★★ nivel PAU =================
    { id: "j26", nivel: 3,
      enunciado: "Resuelve z + 2z̄ = 3 + 2i. Da la parte real e imaginaria de z.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -2 }],
      pistas: ["Sea z = x + yi y z̄ = x − yi."],
      pasos: ["z + 2z̄ = 3x − yi = 3 + 2i → x = 1 e y = −2.", "z = 1 − 2i."],
      resultado: "z = 1 − 2i" },
    { id: "j27", nivel: 3,
      enunciado: "Calcula las raíces cuartas de −16. ¿Cuál es su módulo común y cuánto suman las cuatro?",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "suma =", valor: 0 }],
      pistas: ["−16 = 16<sub>180°</sub>: argumentos (180° + 360°k)/4."],
      pasos: ["Módulo ⁴√16 = 2. Argumentos 45°, 135°, 225°, 315°: ±√2 ± √2 i.", "Están a 90° unas de otras (un cuadrado centrado en el origen): la suma es 0."],
      resultado: "módulo 2 · suma 0" },
    { id: "j28", nivel: 3,
      enunciado: "¿Qué figura describe |z − 2i| = 3?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["una circunferencia de centro (0, 2) y radio 3", "una circunferencia de centro (2, 0) y radio 3", "una recta horizontal", "una circunferencia de centro (0, −2) y radio 3"], ok: 0 },
      pistas: ["|z − a| es la distancia entre z y a."],
      pasos: ["z = x + yi: |x + (y − 2)i| = 3 → x² + (y − 2)² = 9: circunferencia de centro (0, 2) y radio 3."],
      resultado: "circunferencia de centro (0, 2) y radio 3" },
    { id: "j29", nivel: 3,
      enunciado: "Gira el punto 2 + i un ángulo de 60° alrededor del origen (sentido antihorario). Da la parte real e imaginaria del resultado (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0.134, tol: 0.01 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2.232, tol: 0.002 }],
      pistas: ["Multiplica por cos 60° + i·sen 60°."],
      pasos: ["(2 + i)(1/2 + (√3/2)i) = 1 + √3 i + i/2 + (√3/2)i² = (1 − √3/2) + (√3 + 1/2)i.", "≈ 0,134 + 2,232i."],
      resultado: "≈ 0,134 + 2,232i" },
    { id: "j30", nivel: 3,
      enunciado: "Las raíces sextas de 1 forman un hexágono regular. ¿Cuánto mide su lado?",
      check: { tipo: "num", etiqueta: "lado =", valor: 1 },
      pistas: ["Las raíces están en la circunferencia de radio 1; el lado de un polígono regular de n lados inscrito en radio r es 2r·sen(180°/n)."],
      pasos: ["Lado = 2·1·sen 30° = 1. En el hexágono regular el lado coincide con el radio."],
      resultado: "1" },
    { id: "j31", nivel: 3,
      enunciado: "Demuestra que, para todo complejo z = a + bi, se cumple z·z̄ = |z|².",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Escribe z·z̄ = (a + bi)(a − bi)", p: 0.5 },
        { t: "Desarrolla: a² − abi + abi − b²i²", p: 0.5 },
        { t: "Usa i² = −1 y simplifica a a² + b²", p: 0.5 },
        { t: "Reconoce a² + b² = |z|² (módulo al cuadrado)", p: 0.5 }
      ] },
      pasos: ["z·z̄ = (a + bi)(a − bi) = a² − abi + abi − b²i² = a² − b²·(−1) = a² + b² = |z|². ∎"],
      resultado: "z·z̄ = |z|²" },
    { id: "j32", nivel: 3,
      enunciado: "Demuestra con las fórmulas del seno y del coseno de la suma que r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe r(cos α + i·sen α)·s(cos β + i·sen β) y desarrolla la distributiva", p: 0.5 },
        { t: "Agrupa la parte real: cos α·cos β − sen α·sen β (usando i² = −1)", p: 0.5 },
        { t: "Agrupa la parte imaginaria: sen α·cos β + cos α·sen β", p: 0.5 },
        { t: "Reconoce cos(α + β) y sen(α + β) y concluye rs·[cos(α + β) + i·sen(α + β)]", p: 0.5 }
      ] },
      pasos: ["rs[(cos α·cos β − sen α·sen β) + i(sen α·cos β + cos α·sen β)].", "Las dos expresiones son cos(α + β) y sen(α + β). ∎"],
      resultado: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>" },
    { id: "j33", nivel: 3,
      enunciado: "Halla todos los complejos que cumplen z² = z̄. ¿Cuántas soluciones hay y cuánto suman todas?",
      check: [{ tipo: "num", etiqueta: "nº de soluciones =", valor: 4 }, { tipo: "num", etiqueta: "suma =", valor: 0 }],
      pistas: ["z = x + yi. x² − y² = x y 2xy = −y."],
      pasos: ["De 2xy = −y: y = 0 o x = −1/2.", "y = 0 → x² = x → x = 0 o 1. x = −1/2 → y = ±√3/2.", "Soluciones: 0, 1, −1/2 ± (√3/2)i. Suma: 0 + 1 − 1/2 − 1/2 = 0."],
      resultado: "0, 1 y (−1 ± √3 i)/2 → cuatro, suma 0" },
    { id: "j34", nivel: 3,
      enunciado: "Calcula el área del triángulo de vértices 0, 1 + 2i y 3 + i.",
      check: { tipo: "num", etiqueta: "área =", valor: 2.5 },
      pistas: ["Área = ½·|x₁y₂ − x₂y₁|."],
      pasos: ["½·|1·1 − 3·2| = ½·5 = 2,5."],
      resultado: "2,5" },
    { id: "j35", nivel: 3,
      enunciado: "Las raíces quintas de 1 forman un pentágono regular. ¿Cuánto mide su lado (decimal)?",
      check: { tipo: "num", etiqueta: "lado =", valor: 1.1756, tol: 0.002 },
      pistas: ["Radio 1 y 5 lados: lado = 2·sen(180°/5)."],
      pasos: ["Lado = 2·sen 36° = 2·0,5878 = 1,1756."],
      resultado: "≈ 1,1756" },
    { id: "j36", nivel: 3,
      enunciado: "Calcula (1 + i)²⁰/(1 − i)¹⁰ y da su módulo y su argumento (en grados entre 0° y 360°).",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 32 }, { tipo: "num", etiqueta: "argumento =", valor: 270, unidad: "°" }],
      pistas: ["Pasa cada base a polar: 1 + i = √2<sub>45°</sub> y 1 − i = √2<sub>315°</sub>."],
      pasos: ["(1 + i)²⁰ = 1024<sub>900°</sub> = 1024<sub>180°</sub>. (1 − i)¹⁰ = 32<sub>3150°</sub> = 32<sub>270°</sub>.", "Cociente: módulo 1024/32 = 32 y argumento 180° − 270° = −90° ≡ 270°."],
      resultado: "32<sub>270°</sub> = −32i" }
  ];

  var lamina = [
    { titulo: "Unidad imaginaria y forma binómica",
      items: [
        { label: "Definición", formula: "i² = −1  ·  z = a + bi", cuando: "Re(z) = a, Im(z) = b (sin la i).", ejemplo: "z = 3 − 2i → Re = 3, Im = −2" },
        { label: "Potencias de i", formula: "i⁰ = 1, i¹ = i, i² = −1, i³ = −i", cuando: "Divide el exponente entre 4: el resto decide.", ejemplo: "i²⁵ = i · i¹⁰² = −1" },
        { label: "Conjugado", formula: "z̄ = a − bi  ·  z·z̄ = a² + b² = |z|²", ejemplo: "z + z̄ = 2a" }
      ],
      nota: "Dos complejos son iguales si lo son sus partes real e imaginaria." },
    { titulo: "Operaciones en binómica", ancha: true,
      tabla: { cab: ["Operación", "Cómo se hace"], filas: [
        ["Suma / resta", "partes reales con reales, imaginarias con imaginarias"],
        ["Producto", "(a+bi)(c+di) = (ac − bd) + (ad + bc)i   (i² = −1)"],
        ["Cociente", "multiplicar arriba y abajo por el conjugado del denominador"],
        ["Potencias pequeñas", "(1 + i)² = 2i · usar (a ± b)² con i² = −1"]
      ] },
      nota: "Nunca dejes una i en el denominador." },
    { titulo: "Módulo, argumento y forma polar",
      items: [
        { label: "Módulo", formula: "|z| = √(a² + b²)", ejemplo: "|3 − 4i| = 5" },
        { label: "Argumento", formula: "tan θ = b/a  (según el cuadrante)", ojo: "La calculadora sólo da cuadrantes I y IV: corrige con 180°." },
        { label: "Forma polar y trigonométrica", formula: "z = r<sub>θ</sub> = r(cos θ + i·sen θ)", ejemplo: "−1 + i = √2<sub>135°</sub>" }
      ],
      pasos: ["Dibuja el afijo y mira el cuadrante.", "Ángulo de referencia α = arctan(|b|/|a|).", "θ = α (I), 180° − α (II), 180° + α (III), 360° − α (IV)."] },
    { titulo: "Operaciones en polar y raíces", ancha: true,
      items: [
        { label: "Producto y cociente", formula: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>  ·  r<sub>α</sub>/s<sub>β</sub> = (r/s)<sub>α−β</sub>" },
        { label: "De Moivre", formula: "(r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>", ejemplo: "(1 + i)⁸ = (√2)⁸<sub>360°</sub> = 16" },
        { label: "Raíces n-ésimas", formula: "ⁿ√(r<sub>θ</sub>) = (ⁿ√r)<sub>(θ + 360°k)/n</sub>, k = 0 … n − 1", cuando: "Hay n raíces: un polígono regular de n lados.", ejemplo: "∛8: 2<sub>0°</sub>, 2<sub>120°</sub>, 2<sub>240°</sub>" }
      ],
      nota: "Multiplicar por i = girar 90°. Multiplicar por 1<sub>α</sub> = girar α." },
    { titulo: "Ecuaciones y geometría",
      pasos: ["Ecuación de 2.º grado con Δ < 0: x = (−b ± i√|Δ|)/2a (conjugados).", "Con z y z̄: z = x + yi e igualar partes real e imaginaria.", "zⁿ = w: raíces n-ésimas en polar.", "|z − a| = r: circunferencia. |z − a| = |z − b|: mediatriz. Re z = k, Im z = k: rectas."],
      nota: "Teorema fundamental del álgebra: grado n ⇒ n raíces en ℂ." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(1 + i)² = 1 + i² = 0", bien: "(1 + i)² = 1 + 2i + i² = 2i", por: "Falta el doble producto." },
        { mal: "√(−4)·√(−9) = √36 = 6", bien: "(2i)(3i) = −6", por: "Con radicandos negativos no vale √a·√b = √ab." },
        { mal: "arg(−1 + i) = arctan(−1) = −45°", bien: "135°", por: "Hay que mirar el cuadrante." },
        { mal: "(3<sub>20°</sub>)⁴ = 12<sub>80°</sub>", bien: "81<sub>80°</sub>", por: "El módulo se ELEVA a 4." },
        { mal: "Raíz cúbica de 8 = 2 (solo)", bien: "2, −1 ± √3 i", por: "En ℂ hay n raíces n-ésimas." },
        { mal: "Re(3 − 2i) = −2i", bien: "Re = 3 · Im = −2", por: "La parte imaginaria es −2, sin la i." }
      ] }
  ];


  // =====================================================================
  // REFUERZO del tema 6: Euler, transformaciones, polinomios, polígonos y problemas de examen
  // =====================================================================
  resumen.push(
    "La <b>fórmula de Euler</b> e<sup>iθ</sup> = cos θ + i·sen θ da la forma exponencial z = r·e<sup>iθ</sup> (θ en radianes): e<sup>iπ</sup> = −1.",
    "Con complejos se escriben las <b>transformaciones</b> del plano: z + c (traslación), e<sup>iα</sup>·z (giro), k·z (homotecia), z̄ (simetría) y a·z + b (semejanza)."
  );

  // Julia, junto a Mandelbrot
  nuevas[3].html +=
    "<p>Cada punto c del plano tiene además su propio <b>conjunto de Julia</b>: los números z₀ cuya órbita z → z² + c no se escapa al infinito. La relación con Mandelbrot es asombrosa: si c está <i>dentro</i> del conjunto de Mandelbrot, el conjunto de Julia de c es de una sola pieza; si está <i>fuera</i>, se rompe en «polvo» de infinitos puntos sueltos. Arrastra el punto rojo del Mandelbrot de la izquierda y mira cómo cambia el Julia de la derecha:</p>" +
    w("julia");

  var nuevas6 = [
    {
      h: "13. La fórmula de Euler y la forma exponencial",
      html:
        "<p>Hasta ahora has escrito un complejo de tres maneras. La cuarta es la más compacta y la que usan ingenieros y físicos: <b>z = r·e<sup>iθ</sup></b>. Lo curioso es que e<sup>iθ</sup> no es una potencia «de verdad» (¿qué significa multiplicar el número e por sí mismo i·θ veces?): es una <b>definición</b> que Euler (1748) justificó con las series de potencias.</p>" +
        "<h5>De dónde sale: tres series que encajan</h5>" +
        "<p>Las funciones e<sup>x</sup>, cos x y sen x se pueden escribir como sumas infinitas de potencias de x (cuantos más términos se suman, mejor es la aproximación):</p>" +
        H.formula("e<sup>x</sup> = 1 + x + x²/2! + x³/3! + x⁴/4! + x⁵/5! + …") +
        H.formula("cos x = 1 − x²/2! + x⁴/4! − …          sen x = x − x³/3! + x⁵/5! − …") +
        "<p>Sustituyamos x = iθ. Como i² = −1, i³ = −i, i⁴ = 1, i⁵ = i, …, las potencias <i>pares</i> de iθ son reales (1, −θ², +θ⁴, …) y las <i>impares</i> son imaginarias puras (iθ, −iθ³, +iθ⁵, …). Separando:</p>" +
        H.formula("e<sup>iθ</sup> = (1 − θ²/2! + θ⁴/4! − …) + i·(θ − θ³/3! + θ⁵/5! − …) = cos θ + i·sen θ") +
        "<p>Esa es la <b>fórmula de Euler</b>. En el simulador, cada punto gris es la suma de los primeros términos de la serie para el ángulo elegido: se «enrosca» y acaba cayendo sobre el punto de la circunferencia unidad.</p>" +
        w("euler") +
        "<h5>Qué dice, en palabras</h5>" +
        "<ul><li><b>e<sup>iθ</sup> es el punto de la circunferencia unidad con argumento θ</b> (en radianes): su abscisa es cos θ y su ordenada sen θ. Su módulo es siempre 1.</li>" +
        "<li>Valores clave: e<sup>i0</sup> = 1, e<sup>iπ/2</sup> = i, e<sup>iπ</sup> = −1, e<sup>i3π/2</sup> = −i, e<sup>i2π</sup> = 1. De ahí la identidad de Euler <b>e<sup>iπ</sup> + 1 = 0</b>.</li>" +
        "<li>Es periódica de periodo 2π: e<sup>i(θ + 2π)</sup> = e<sup>iθ</sup> (dar una vuelta completa no cambia el punto).</li>" +
        "<li>Como su módulo es 1, el conjugado y el inverso coinciden: <b>conj(e<sup>iθ</sup>) = 1/e<sup>iθ</sup> = e<sup>−iθ</sup></b>.</li></ul>" +
        "<h5>La forma exponencial</h5>" +
        "<p>Escribir z = r·e<sup>iθ</sup> es exactamente lo mismo que la forma polar r<sub>θ</sub>, pero con el ángulo en <b>radianes</b>:</p>" +
        tabla(["Polar", "Exponencial", "Binómica"], [
          ["1<sub>0°</sub>", "e<sup>i0</sup>", "1"],
          ["1<sub>90°</sub>", "e<sup>iπ/2</sup>", "i"],
          ["1<sub>180°</sub>", "e<sup>iπ</sup>", "−1"],
          ["1<sub>270°</sub>", "e<sup>i3π/2</sup> = e<sup>−iπ/2</sup>", "−i"],
          ["2<sub>60°</sub>", "2e<sup>iπ/3</sup>", "1 + √3·i"],
          ["√2<sub>45°</sub>", "√2·e<sup>iπ/4</sup>", "1 + i"]
        ]) +
        "<h5>Por qué los argumentos se suman</h5>" +
        "<p>La ley de los exponentes e<sup>a</sup>·e<sup>b</sup> = e<sup>a+b</sup> sigue valiendo con exponentes imaginarios. Por eso, sin ninguna fórmula nueva que memorizar:</p>" +
        H.formula("r·e<sup>iα</sup> · s·e<sup>iβ</sup> = rs·e<sup>i(α+β)</sup>          (r·e<sup>iα</sup>)/(s·e<sup>iβ</sup>) = (r/s)·e<sup>i(α−β)</sup>          (r·e<sup>iθ</sup>)ⁿ = rⁿ·e<sup>inθ</sup>") +
        "<p>La última es el teorema de De Moivre, que ahora es simplemente la regla «potencia de una potencia». Multiplicar por e<sup>iα</sup> es girar un ángulo α.</p>" +
        ejemplo("De binómica a exponencial y vuelta", "Escribe z = −1 + i√3 en forma exponencial y pasa 3e<sup>iπ/6</sup> a binómica.", [
          "Módulo: r = √(1 + 3) = 2. El punto (−1, √3) está en el 2.º cuadrante; el ángulo de referencia es arctan(√3/1) = 60°, así que θ = 180° − 60° = 120° = 2π/3.",
          "<b>z = 2e<sup>i2π/3</sup></b>.",
          "3e<sup>iπ/6</sup> = 3(cos 30° + i·sen 30°) = 3(√3/2 + i/2) = <b>(3√3/2) + (3/2)i ≈ 2,598 + 1,5i</b>."
        ]) +
        ejemplo("Operar en forma exponencial", "Calcula (2e<sup>iπ/6</sup>)·(3e<sup>iπ/3</sup>), (4e<sup>i5π/6</sup>)/(2e<sup>iπ/3</sup>) y (√2·e<sup>iπ/4</sup>)⁸.", [
          "Producto: módulos 2·3 = 6 y argumentos π/6 + π/3 = π/2 → <b>6e<sup>iπ/2</sup> = 6i</b>.",
          "Cociente: módulos 4/2 = 2 y argumentos 5π/6 − π/3 = 5π/6 − 2π/6 = π/2 → <b>2e<sup>iπ/2</sup> = 2i</b>.",
          "Potencia: (√2)⁸ = 16 y 8·π/4 = 2π → <b>16e<sup>i2π</sup> = 16</b>."
        ]) +
        ejemplo("Las fórmulas del seno y del coseno de la suma salen solas", "Deduce cos(a + b) y sen(a + b) a partir de e<sup>i(a+b)</sup> = e<sup>ia</sup>·e<sup>ib</sup>.", [
          "Aplicando Euler a cada lado: cos(a + b) + i·sen(a + b) = (cos a + i·sen a)(cos b + i·sen b).",
          "Se desarrolla el producto con i² = −1: (cos a·cos b − sen a·sen b) + i·(sen a·cos b + cos a·sen b).",
          "Igualando partes reales e imaginarias: <b>cos(a + b) = cos a·cos b − sen a·sen b</b> y <b>sen(a + b) = sen a·cos b + cos a·sen b</b>. Con a = b salen las del ángulo doble: cos 2a = cos²a − sen²a y sen 2a = 2·sen a·cos a."
        ]) +
        ejemplo("El coseno y el seno con exponenciales", "Demuestra que cos θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>)/2 y comprueba el caso θ = π/3.", [
          "e<sup>iθ</sup> = cos θ + i·sen θ y e<sup>−iθ</sup> = cos θ − i·sen θ. Al sumarlas, las partes imaginarias se cancelan: e<sup>iθ</sup> + e<sup>−iθ</sup> = 2cos θ.",
          "Restándolas se cancelan las reales: e<sup>iθ</sup> − e<sup>−iθ</sup> = 2i·sen θ, es decir sen θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)/(2i).",
          "Comprobación con θ = π/3 (60°): e<sup>iπ/3</sup> + e<sup>−iπ/3</sup> = (1/2 + (√3/2)i) + (1/2 − (√3/2)i) = 1, y 1/2 = cos 60° ✓."
        ]) +
        ejemplo("Una potencia imposible: iⁱ", "Calcula iⁱ (con la determinación principal).", [
          "Como i = e<sup>iπ/2</sup>, iⁱ = (e<sup>iπ/2</sup>)<sup>i</sup> = e<sup>i·iπ/2</sup> = e<sup>i²π/2</sup> = e<sup>−π/2</sup>.",
          "<b>iⁱ = e<sup>−π/2</sup> ≈ 0,2079</b>: ¡un número real! (Hay otros valores, e<sup>−π/2−2πk</sup>, porque el argumento de i también puede ser π/2 + 2πk.)"
        ]) +
        "<h5>Para qué sirve: las ondas como números complejos (fasores)</h5>" +
        "<p>Una onda A·cos(ωt + φ) (la corriente alterna, el sonido, la luz…) queda determinada por su amplitud A y su fase φ, es decir, por el complejo <b>A·e<sup>iφ</sup></b>, que se llama su <i>fasor</i>. <b>Sumar dos ondas de la misma frecuencia equivale a sumar sus fasores</b>: así se evitan las fórmulas trigonométricas.</p>" +
        ejemplo("Suma de dos ondas", "Suma 3cos(ωt) + 4cos(ωt + 90°).", [
          "Fasores: 3e<sup>i0°</sup> = 3 y 4e<sup>i90°</sup> = 4i. Suma: 3 + 4i = 5<sub>53,13°</sub> (|3 + 4i| = 5 y arctan(4/3) = 53,13°).",
          "Por tanto <b>3cos(ωt) + 4cos(ωt + 90°) = 5cos(ωt + 53,13°)</b>. Comprobación en t = 0: 3 + 4cos 90° = 3 y 5cos 53,13° = 3 ✓."
        ]) +
        ejemplo("Dos tensiones desfasadas 120°", "Dos fuentes de 230 V de amplitud tienen fases 0° y 120°. ¿Qué amplitud tiene su suma?", [
          "230 + 230e<sup>i120°</sup> = 230·(1 − 1/2 + (√3/2)i) = 230·(1/2 + (√3/2)i) = 230e<sup>i60°</sup>.",
          "La amplitud es <b>230 V</b> (con fase 60°): al sumar dos ondas desfasadas 120° no se obtiene el doble sino lo mismo que cada una."
        ]) +
        ojo("En la forma exponencial el ángulo va <b>siempre en radianes</b>: e<sup>i·90°</sup> no tiene sentido; hay que escribir e<sup>iπ/2</sup>. Y e<sup>iθ</sup> con θ real tiene módulo 1, no el valor de e ≈ 2,718 multiplicado por nada."),
    },
    {
      h: "14. Transformaciones del plano con complejos",
      html:
        "<p>Una función f(z) manda cada punto del plano a otro punto y, por tanto, <b>transforma figuras</b>. Con complejos las transformaciones más importantes (traslaciones, giros, homotecias y simetrías) se escriben en una línea. Prueba cada una sobre la letra F, una figura asimétrica que deja ver si la figura se gira o se «da la vuelta»:</p>" +
        w("transformaciones") +
        tabla(["Transformación", "Fórmula", "Distancias", "Orientación"], [
          ["Traslación de vector c", "z ↦ z + c", "se conservan", "se conserva"],
          ["Giro de centro 0 y ángulo α", "z ↦ e<sup>iα</sup>·z", "se conservan", "se conserva"],
          ["Homotecia de centro 0 y razón k", "z ↦ k·z (k real)", "se multiplican por |k|", "se conserva si k &gt; 0"],
          ["Simetría respecto del eje real", "z ↦ z̄", "se conservan", "se invierte"],
          ["Simetría respecto del eje imaginario", "z ↦ −z̄", "se conservan", "se invierte"],
          ["Simetría respecto de la recta y = x", "z ↦ i·z̄", "se conservan", "se invierte"],
          ["Giro de centro c", "z ↦ c + e<sup>iα</sup>·(z − c)", "se conservan", "se conserva"],
          ["Semejanza directa", "z ↦ a·z + b (a ≠ 0)", "se multiplican por |a|", "se conserva"]
        ]) +
        "<h5>Giro de centro cualquiera</h5>" +
        "<p>Para girar alrededor de un punto c se lleva c al origen (z − c), se gira (· e<sup>iα</sup>) y se devuelve a su sitio (+ c): z' = c + e<sup>iα</sup>(z − c). Desarrollando queda z' = e<sup>iα</sup>·z + c(1 − e<sup>iα</sup>), que tiene la forma <b>a·z + b</b>. Al revés, toda transformación z ↦ a·z + b con a ≠ 1 deja <b>un punto fijo</b> z₀ = b/(1 − a) y es un giro de ángulo arg a combinado con una homotecia de razón |a| alrededor de ese punto; si a = 1 es una traslación.</p>" +
        ejemplo("Un giro alrededor de un punto", "Gira el punto P = 4 + i un ángulo de 90° alrededor de c = 1 − 2i.", [
          "Se lleva c al origen: P − c = (4 + i) − (1 − 2i) = 3 + 3i.",
          "Se gira 90° (multiplicar por i): i(3 + 3i) = 3i + 3i² = −3 + 3i.",
          "Se devuelve a su sitio: (−3 + 3i) + (1 − 2i) = <b>−2 + i</b>. Comprobación: |P − c| = 3√2 y |(−2 + i) − c| = |−3 + 3i| = 3√2 ✓ (el giro conserva la distancia al centro)."
        ]) +
        "<h5>Simetrías respecto de una recta</h5>" +
        "<p>Conjugar es reflejar respecto del eje real. Para otras rectas basta combinar giros y traslaciones; las fórmulas útiles son:</p>" +
        "<ul><li>Recta vertical x = k: <b>z ↦ 2k − z̄</b>. Recta horizontal y = k: <b>z ↦ z̄ + 2ki</b>.</li>" +
        "<li>Recta que pasa por el origen y forma un ángulo φ con el eje real: <b>z ↦ e<sup>2iφ</sup>·z̄</b> (para φ = 45°, e<sup>i90°</sup> = i y sale i·z̄).</li></ul>" +
        ejemplo("Tres simetrías de un mismo punto", "Halla el simétrico de z = 3 + 2i respecto de la recta x = 1, respecto de y = x y respecto de y = −1.", [
          "Respecto de x = 1: 2·1 − z̄ = 2 − (3 − 2i) = <b>−1 + 2i</b>.",
          "Respecto de y = x: i·z̄ = i(3 − 2i) = 3i − 2i² = <b>2 + 3i</b> (se intercambian las coordenadas).",
          "Respecto de y = −1: z̄ + 2(−1)i = 3 − 2i − 2i = <b>3 − 4i</b>. Comprobación: el punto (3, 2) está a 3 por encima de y = −1 y (3, −4) a 3 por debajo ✓."
        ]) +
        ejemplo("¿Qué semejanza lleva A en A' y B en B'?", "Halla z ↦ a·z + b que lleva A = 1 a A' = 2 + 3i y B = i a B' = −1 + 2i. Indica su razón, su ángulo y su punto fijo.", [
          "Restando las dos condiciones: A' − B' = a(A − B) → (3 + i) = a(1 − i) → a = (3 + i)/(1 − i) = (3 + i)(1 + i)/2 = (2 + 4i)/2 = <b>1 + 2i</b>.",
          "b = A' − a·A = (2 + 3i) − (1 + 2i) = <b>1 + i</b>. Comprobación con B: (1 + 2i)·i + 1 + i = i − 2 + 1 + i = −1 + 2i ✓.",
          "Razón |a| = √5 ≈ 2,236 y ángulo arctan 2 ≈ 63,43°. Punto fijo: z₀ = b/(1 − a) = (1 + i)/(−2i) = <b>−1/2 + i/2</b> (se comprueba que f(z₀) = z₀)."
        ]) +
        ejemplo("Dos espejos hacen un giro", "Refleja un punto respecto del eje real y después respecto del eje imaginario. ¿Qué transformación resulta?", [
          "Primero w = z̄. Después, la simetría respecto del eje imaginario es w ↦ −w̄, y −conj(z̄) = −z.",
          "<b>z ↦ −z es un giro de 180°</b>, el doble del ángulo (90°) que forman los dos ejes. En general, dos simetrías respecto de rectas que se cortan en un ángulo β componen un giro de ángulo 2β."
        ]) +
        "<h5>Más allá de lo lineal: z² y 1/z</h5>" +
        "<p>No todas las transformaciones conservan la forma. Con z = r<sub>θ</sub>: <b>z ↦ z²</b> lleva a (r²)<sub>2θ</sub> (duplica el argumento y eleva el módulo al cuadrado, así que «abre» la figura al doble de ángulo) y <b>z ↦ 1/z</b> lleva a (1/r)<sub>−θ</sub> (invierte el módulo y cambia el signo del argumento). Por ejemplo, para z = 2<sub>30°</sub>: z² = 4<sub>60°</sub> y 1/z = (1/2)<sub>−30°</sub>. Estas transformaciones son la base de los «mapas de colores» del análisis complejo que verás en la universidad.</p>"
    },
    {
      h: "15. Polinomios con raíces complejas",
      html:
        "<p>El teorema fundamental del álgebra dice que un polinomio de grado n se descompone en n factores de primer grado <b>sobre ℂ</b>: P(x) = a(x − r₁)(x − r₂)…(x − rₙ). Cuando los coeficientes son reales, las raíces no reales vienen por parejas conjugadas a ± bi, y cada pareja forma un factor de segundo grado <b>con coeficientes reales</b>:</p>" +
        H.formula("(x − (a + bi))(x − (a − bi)) = x² − 2a·x + (a² + b²)") +
        "<p>Por eso, <b>sobre los reales, todo polinomio se factoriza en factores de grado 1 y grado 2</b> (los de grado 2 con Δ &lt; 0). Además, un polinomio real de grado impar tiene siempre <b>al menos una raíz real</b>, porque las no reales no pueden quedarse sin pareja. Y las raíces cumplen las <b>relaciones de Cardano–Vieta</b>: en x² + bx + c la suma de raíces es −b y el producto c; en x³ + px² + qx + r la suma es −p, la suma de productos de dos en dos es q y el producto es −r.</p>" +
        ejemplo("Construir un polinomio con raíces dadas", "Halla un polinomio real de grado 3 con raíces 2 y 1 − 3i.", [
          "Como los coeficientes son reales, 1 − 3i obliga a que 1 + 3i también sea raíz: ya tenemos las tres (2, 1 − 3i, 1 + 3i).",
          "La pareja conjugada da el factor x² − 2·1·x + (1² + 3²) = x² − 2x + 10.",
          "(x − 2)(x² − 2x + 10) = x³ − 2x² + 10x − 2x² + 4x − 20 = <b>x³ − 4x² + 14x − 20</b>. Comprobación con Vieta: suma de raíces 2 + 2 = 4 ✓ y producto 2·(1 + 9) = 20 = −(−20) ✓."
        ]) +
        ejemplo("Conocida una raíz, hallar las demás", "Sabiendo que 1 + 2i es raíz de x³ − 3x² + 7x − 5 = 0, halla las otras dos.", [
          "Los coeficientes son reales, luego 1 − 2i también es raíz. La suma de las tres raíces vale −(−3) = 3.",
          "Tercera raíz: 3 − (1 + 2i) − (1 − 2i) = <b>1</b>.",
          "Comprobación con el producto: (1 + 2i)(1 − 2i)·1 = 5 = −(−5) ✓. El polinomio es (x − 1)(x² − 2x + 5): <b>raíces 1, 1 + 2i y 1 − 2i</b>."
        ]) +
        ejemplo("Un clásico: x⁴ + 4", "Factoriza x⁴ + 4 con coeficientes reales.", [
          "x⁴ = −4 = 4<sub>180°</sub>: las raíces cuartas tienen módulo ⁴√4 = √2 y argumentos (180° + 360°k)/4 = 45°, 135°, 225°, 315°. Son <b>1 + i, −1 + i, −1 − i, 1 − i</b>.",
          "Se agrupan por parejas conjugadas: (x − (1 + i))(x − (1 − i)) = x² − 2x + 2 y (x + 1 − i)(x + 1 + i) = x² + 2x + 2.",
          "<b>x⁴ + 4 = (x² + 2x + 2)(x² − 2x + 2)</b>. Comprobación: (x² + 2)² − (2x)² = x⁴ + 4x² + 4 − 4x² = x⁴ + 4 ✓."
        ]) +
        ejemplo("¿Cuándo tiene raíces complejas?", "Estudia las raíces de x² − 2x + m = 0 según el valor de m.", [
          "Δ = 4 − 4m. Si m &lt; 1 hay dos raíces reales distintas; si m = 1, una doble (x = 1); si <b>m &gt; 1</b>, dos raíces complejas conjugadas: x = (2 ± i·2√(m − 1))/2 = 1 ± i√(m − 1).",
          "En ese caso |x|² = 1 + (m − 1) = m: el producto de las raíces es m = |x|² (siempre z·z̄ = |z|²). Con m = 5: raíces 1 ± 2i y módulo √5."
        ]) +
        ojo("Las raíces conjugadas por parejas sólo están garantizadas si <b>los coeficientes son reales</b>. El polinomio x − i tiene una única raíz, i, y su conjugada −i no lo es. Con coeficientes complejos no hay parejas."),
    },
    {
      h: "16. Polígonos regulares y raíces de la unidad",
      html:
        "<p>Las <b>raíces n-ésimas de la unidad</b> son las soluciones de zⁿ = 1. En polar son 1<sub>360°k/n</sub>, es decir ω<sup>k</sup> con <b>ω = e<sup>2πi/n</sup></b>, y forman un polígono regular de n lados inscrito en la circunferencia unidad, con un vértice en 1. Tienen propiedades muy útiles:</p>" +
        "<ul><li><b>Su suma es 0</b> (para n ≥ 2). Por la suma de una progresión geométrica: 1 + ω + … + ω<sup>n−1</sup> = (1 − ωⁿ)/(1 − ω) = 0, porque ωⁿ = 1 y ω ≠ 1. Geométricamente, el centro del polígono es el baricentro de sus vértices.</li>" +
        "<li><b>Su producto</b> vale (−1)ⁿ⁺¹ (las raíces de zⁿ − 1 = 0 multiplican (−1)ⁿ·(−1)).</li>" +
        "<li>Los conjugados son también raíces: conj(ω<sup>k</sup>) = ω<sup>−k</sup> = ω<sup>n−k</sup>. El polígono es simétrico respecto del eje real.</li></ul>" +
        "<h5>Cualquier polígono regular</h5>" +
        "<p>Si un polígono regular de n lados tiene centro c y un vértice z₀, los demás vértices salen de girar z₀ alrededor de c ángulos múltiplos de 360°/n: <b>z<sub>k</sub> = c + (z₀ − c)·ω<sup>k</sup></b>, k = 0, …, n − 1. Con R = |z₀ − c| el radio, el <b>lado</b> mide 2R·sen(π/n) y el <b>área</b> (n/2)·R²·sen(2π/n).</p>" +
        ejemplo("Un triángulo equilátero con centro dado", "Un triángulo equilátero tiene centro 1 + i y un vértice en 4 + i. Halla los otros dos vértices y el lado.", [
          "R = |z₀ − c| = |3| = 3 y ω = e<sup>2πi/3</sup> = −1/2 + (√3/2)i.",
          "z₁ = c + 3ω = 1 + i + (−3/2 + (3√3/2)i) = <b>−1/2 + (1 + 3√3/2)i ≈ −0,5 + 3,598i</b>.",
          "z₂ = c + 3ω² = 1 + i + (−3/2 − (3√3/2)i) = <b>−1/2 + (1 − 3√3/2)i ≈ −0,5 − 1,598i</b>.",
          "Lado = 2·3·sen 60° = 3√3 ≈ 5,196. Comprobación: |z₀ − z₁| = |4,5 − 2,598i| = √(20,25 + 6,75) = √27 = 3√3 ✓."
        ]) +
        ejemplo("El hexágono de z⁶ = 64", "Resuelve z⁶ = 64, dibuja el polígono y calcula su lado, su perímetro y su área.", [
          "64 = 64<sub>0°</sub>: módulo ⁶√64 = 2 y argumentos 60°·k. Las soluciones son <b>2, 1 + √3i, −1 + √3i, −2, −1 − √3i, 1 − √3i</b>: un hexágono regular de radio 2.",
          "Lado = 2·2·sen 30° = 2 (en el hexágono el lado coincide con el radio). Perímetro = 6·2 = <b>12</b>.",
          "Área = (6/2)·2²·sen 60° = 12·(√3/2) = <b>6√3 ≈ 10,39</b>."
        ]) +
        ejemplo("Un polígono con el centro desplazado", "Resuelve (z − 1)³ = 8.", [
          "Sea u = z − 1. Entonces u³ = 8, cuyas raíces son 2, 2<sub>120°</sub> = −1 + √3i y 2<sub>240°</sub> = −1 − √3i.",
          "Se deshace el cambio z = u + 1: <b>z = 3, z = √3i y z = −√3i</b>. Es el triángulo equilátero de centro 1 y radio 2."
        ]) +
        "<p>Las raíces de la unidad también explican por qué se puede construir con regla y compás el pentágono regular (cos 72° = (√5 − 1)/4), y están detrás de la transformada de Fourier, que comprime sonido e imagen en tu móvil.</p>"
    },
    {
      h: "17. Problemas de examen resueltos",
      html:
        "<p>Cinco problemas del estilo de la prueba de acceso, con el desarrollo que se pide en un examen.</p>" +
        ejemplo("Problema 1 · Potencias y cocientes", "Calcula (1 + i√3)⁶/(√3 − i)⁴ y expresa el resultado en forma binómica.", [
          "1 + i√3 = 2<sub>60°</sub> → (1 + i√3)⁶ = 2⁶<sub>360°</sub> = 64<sub>0°</sub> = 64.",
          "√3 − i está en el 4.º cuadrante: módulo 2 y argumento 330° → (√3 − i)⁴ = 2⁴<sub>1320°</sub> = 16<sub>240°</sub> (1320° = 3·360° + 240°).",
          "Cociente: módulo 64/16 = 4 y argumento 0° − 240° = −240° ≡ 120°.",
          "4<sub>120°</sub> = 4(cos 120° + i·sen 120°) = 4(−1/2 + (√3/2)i) = <b>−2 + 2√3 i</b>."
        ]) +
        ejemplo("Problema 2 · Un parámetro real", "Halla m real para que (m + 2i)/(1 − i) sea: (a) un número real; (b) imaginario puro; (c) de módulo √10.", [
          "Se racionaliza: (m + 2i)(1 + i)/[(1 − i)(1 + i)] = (m + mi + 2i + 2i²)/2 = [(m − 2) + (m + 2)i]/2.",
          "(a) Real: parte imaginaria nula → m + 2 = 0 → <b>m = −2</b> (el número vale −2).",
          "(b) Imaginario puro: parte real nula → m − 2 = 0 → <b>m = 2</b> (el número vale 2i).",
          "(c) Módulo al cuadrado: [(m − 2)² + (m + 2)²]/4 = (2m² + 8)/4 = (m² + 4)/2 = 10 → m² = 16 → <b>m = 4 o m = −4</b>. Comprobación: m = 4 da 1 + 3i (módulo √10) y m = −4 da −3 − i (módulo √10) ✓."
        ]) +
        ejemplo("Problema 3 · Una ecuación z⁴ = w", "Resuelve z⁴ = −8 + 8√3 i, escribe las soluciones en forma binómica y di qué polígono forman.", [
          "w = −8 + 8√3 i: módulo √(64 + 192) = 16 y argumento 120° (2.º cuadrante, ángulo de referencia 60°).",
          "z = ⁴√16 = 2 con argumentos (120° + 360°k)/4 = 30°, 120°, 210°, 300°.",
          "En binómica: 2<sub>30°</sub> = <b>√3 + i</b>; 2<sub>120°</sub> = <b>−1 + √3 i</b>; 2<sub>210°</sub> = <b>−√3 − i</b>; 2<sub>300°</sub> = <b>1 − √3 i</b>.",
          "Forman un <b>cuadrado</b> inscrito en la circunferencia de radio 2; su lado mide 2·2·sen 45° = 2√2 ≈ 2,83."
        ]) +
        ejemplo("Problema 4 · Un triángulo equilátero", "Dos vértices de un triángulo equilátero son A = 1 + i y B = 3 + i. Halla el tercer vértice (hay dos posibilidades).", [
          "AB = B − A = 2. El tercer vértice C se obtiene girando B alrededor de A un ángulo de ±60°: C = A + (B − A)·e<sup>±iπ/3</sup>.",
          "e<sup>±iπ/3</sup> = 1/2 ± (√3/2)i → C = 1 + i + 2(1/2 ± (√3/2)i) = 1 + i + 1 ± √3 i = <b>2 + (1 + √3)i o 2 + (1 − √3)i</b>.",
          "Comprobación: |C − A| = |1 ± √3 i| = 2 = |AB| ✓ y |C − B| = |−1 ± √3 i| = 2 ✓."
        ]) +
        ejemplo("Problema 5 · Una región con área", "Dibuja y calcula el área del conjunto de los z con |z| ≤ 2 y |z − 1| ≤ |z − i|. ¿Y la curva |z + 2| = 2|z − 1|?", [
          "Con z = x + yi: |z − 1| ≤ |z − i| ⇔ (x − 1)² + y² ≤ x² + (y − 1)² ⇔ −2x + 1 ≤ −2y + 1 ⇔ <b>x ≥ y</b>: el semiplano por debajo de la recta y = x (mediatriz de 1 e i).",
          "La recta y = x pasa por el centro del círculo |z| ≤ 2, así que la región es <b>medio círculo</b>: área = ½·π·2² = <b>2π ≈ 6,28</b>.",
          "Segunda curva (círculo de Apolonio): |z + 2|² = 4|z − 1|² → (x + 2)² + y² = 4(x − 1)² + 4y² → 3x² − 12x + 3y² = 0 → x² − 4x + y² = 0 → <b>(x − 2)² + y² = 4</b>: circunferencia de centro 2 y radio 2."
        ])
    }
  ];
  nuevas.splice(nuevas.length - 2, 0, nuevas6[0], nuevas6[1], nuevas6[2], nuevas6[3], nuevas6[4]);

  // actividades nuevas
  datos.transf = {
    titulo: "Transformaciones y fórmulas",
    consigna: "Une cada transformación del plano con su fórmula compleja.",
    pares: [
      ["Giro de 90° alrededor del origen", "z ↦ i·z"],
      ["Giro de 180° alrededor del origen", "z ↦ −z"],
      ["Simetría respecto del eje real", "z ↦ z̄"],
      ["Traslación de vector (2, 1)", "z ↦ z + 2 + i"],
      ["Homotecia de razón 3", "z ↦ 3z"],
      ["Simetría respecto de y = x", "z ↦ i·z̄"],
      ["Simetría respecto de x = 1", "z ↦ 2 − z̄"]
    ]
  };
  datos.ordenPol = {
    titulo: "Polinomio con coeficientes reales a partir de una raíz compleja",
    consigna: "Ordena los pasos para completar las raíces y construir el polinomio.",
    items: [
      { t: "Escribir la raíz dada a + bi", nota: "Por ejemplo 2 + 3i." },
      { t: "Añadir su conjugada a − bi como raíz", nota: "Los coeficientes son reales: las raíces no reales van por parejas." },
      { t: "Formar el factor cuadrático x² − 2a·x + (a² + b²)", nota: "Aquí x² − 4x + 13." },
      { t: "Multiplicar por los factores (x − r) de las demás raíces" },
      { t: "Comprobar con Vieta: suma y producto de las raíces", nota: "Suma = −(coef. de xⁿ⁻¹), producto = ±(término independiente)." }
    ]
  };
  nuevas6[1].html += w("emparejar", "transf");
  nuevas6[2].html += "<p>Practica el orden de un procedimiento muy repetido en los exámenes:</p>" + w("orden", "ordenPol");

  // preguntas nuevas de «¿Qué falla aquí?» y del test
  datos.errores.preguntas.push(
    { q: "Un alumno calcula e<sup>iπ/2</sup> = cos(π/2) + sen(π/2) = 0 + 1 = 1. ¿Qué falla?",
      op: ["Nada: vale 1", "Se ha olvidado la i: e<sup>iθ</sup> = cos θ + <b>i</b>·sen θ, así que e<sup>iπ/2</sup> = i", "El resultado es −1", "e elevado a un número imaginario no se puede calcular"], ok: 1,
      porque: "La fórmula de Euler es e<sup>iθ</sup> = cos θ + i·sen θ. Con θ = π/2: 0 + i·1 = i." },
    { q: "Un polinomio con coeficientes reales tiene la raíz 1 + 2i. Un alumno dice que otra raíz es −1 − 2i (la opuesta). ¿Qué falla?",
      op: ["Nada", "La otra raíz que se garantiza es la <b>conjugada</b>, 1 − 2i, no la opuesta", "La otra raíz es 2 + i", "No hay ninguna otra raíz garantizada"], ok: 1,
      porque: "Si los coeficientes son reales, las raíces no reales vienen por parejas conjugadas: a + bi y a − bi." },
    { q: "Un alumno afirma que la simetría respecto del eje imaginario es z ↦ z̄. ¿Qué falla?",
      op: ["Nada", "z ↦ z̄ es la simetría respecto del eje <b>real</b>; la del eje imaginario es z ↦ −z̄", "Es z ↦ −z", "Es z ↦ i·z"], ok: 1,
      porque: "Si z = a + bi, z̄ = a − bi (cambia b) y −z̄ = −a + bi (cambia a). Cambiar el signo de la parte real es reflejar respecto del eje imaginario." }
  );
  datos.quiz1.preguntas.push(
    { q: "e<sup>iπ</sup> vale…", op: ["−1", "1", "i", "−i"], ok: 0, porque: "cos π + i·sen π = −1 + 0i. De ahí la identidad e<sup>iπ</sup> + 1 = 0." },
    { q: "2e<sup>iπ/3</sup> en forma binómica es…", op: ["1 + √3·i", "√3 + i", "2 + 2i", "1/2 + (√3/2)i"], ok: 0, porque: "2(cos 60° + i·sen 60°) = 2(1/2 + (√3/2)i) = 1 + √3·i." },
    { q: "La transformación z ↦ z̄ es…", op: ["una simetría respecto del eje real", "un giro de 90°", "una simetría respecto del eje imaginario", "una homotecia"], ok: 0, porque: "Conjugar cambia el signo de la parte imaginaria: refleja el punto respecto del eje real." },
    { q: "Si 3 − i es raíz de un polinomio con coeficientes reales, otra raíz seguro es…", op: ["3 + i", "−3 + i", "−3 − i", "i"], ok: 0, porque: "Las raíces no reales de un polinomio real vienen por parejas conjugadas." },
    { q: "El conjunto de los z con |z − 1| = |z + 1| es…", op: ["el eje imaginario (la recta Re z = 0)", "la circunferencia de centro 0 y radio 1", "el eje real", "un solo punto"], ok: 0, porque: "Son los puntos que equidistan de 1 y de −1: la mediatriz, la recta x = 0." },
    { q: "La suma de las cinco raíces quintas de cualquier número complejo vale…", op: ["0", "1", "5", "depende del número"], ok: 0, porque: "Forman un pentágono regular centrado en el origen y su centro es el baricentro de los vértices: la suma es 0." }
  );

  // ejercicios nuevos (j37–j49)
  ejercicios.push(
    // ---------- ★ ----------
    { id: "j37", nivel: 1,
      enunciado: "Escribe −1 + i en forma exponencial r·e<sup>iθ</sup>. Da r y θ en radianes (0 ≤ θ &lt; 2π, decimales).",
      check: [{ tipo: "num", etiqueta: "r =", valor: 1.41421 }, { tipo: "num", etiqueta: "θ =", valor: 2.35619, unidad: "rad" }],
      pistas: ["r = √(a² + b²). El punto (−1, 1) está en el 2.º cuadrante."],
      pasos: ["r = √(1 + 1) = √2 ≈ 1,4142.", "Ángulo de referencia arctan(1/1) = 45°; en el 2.º cuadrante θ = 180° − 45° = 135° = 3π/4 ≈ 2,3562 rad.", "−1 + i = √2·e<sup>i3π/4</sup>."],
      resultado: "√2·e<sup>i3π/4</sup>" },
    { id: "j38", nivel: 1,
      enunciado: "Calcula (2e<sup>iπ/6</sup>)·(3e<sup>iπ/3</sup>) y da su módulo y su argumento en grados.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 6 }, { tipo: "num", etiqueta: "argumento =", valor: 90, unidad: "°" }],
      pistas: ["Los módulos se multiplican y los argumentos se suman."],
      pasos: ["Módulo: 2·3 = 6.", "Argumento: π/6 + π/3 = π/2 = 90°.", "El producto es 6e<sup>iπ/2</sup> = 6i."],
      resultado: "6e<sup>iπ/2</sup> = 6i" },
    { id: "j39", nivel: 1,
      enunciado: "Si 2 + 3i es raíz de x² + bx + c = 0 con b y c reales, halla b y c.",
      check: [{ tipo: "num", etiqueta: "b =", valor: -4 }, { tipo: "num", etiqueta: "c =", valor: 13 }],
      pistas: ["La otra raíz es la conjugada 2 − 3i. Suma de raíces = −b y producto = c."],
      pasos: ["Raíces: 2 + 3i y 2 − 3i.", "Suma: 4 = −b → b = −4.", "Producto: (2 + 3i)(2 − 3i) = 4 + 9 = 13 = c."],
      resultado: "b = −4, c = 13 (x² − 4x + 13 = 0)" },
    // ---------- ★★ ----------
    { id: "j40", nivel: 2,
      enunciado: "Calcula i·z̄ para z = 3 + 2i. Da su parte real y su parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "Re =", valor: 2 }, { tipo: "num", etiqueta: "Im =", valor: 3 }],
      pistas: ["Primero el conjugado z̄ = 3 − 2i y después multiplica por i."],
      pasos: ["z̄ = 3 − 2i.", "i·(3 − 2i) = 3i − 2i² = 3i + 2 = 2 + 3i.", "(Es el simétrico de 3 + 2i respecto de la recta y = x: se han intercambiado las coordenadas.)"],
      resultado: "2 + 3i" },
    { id: "j41", nivel: 2,
      enunciado: "Sabiendo que 1 + 2i es raíz de x³ − 3x² + 7x − 5 = 0, halla la raíz real.",
      check: { tipo: "num", etiqueta: "raíz real =", valor: 1 },
      pistas: ["Las raíces no reales vienen por parejas conjugadas. La suma de las tres raíces es −(−3) = 3."],
      pasos: ["La otra raíz compleja es 1 − 2i.", "Suma de raíces: (1 + 2i) + (1 − 2i) + r = 3 → 2 + r = 3 → r = 1.", "Comprobación: 1 − 3 + 7 − 5 = 0 ✓."],
      resultado: "x = 1" },
    { id: "j42", nivel: 2,
      enunciado: "Un cuadrado tiene centro 1 + i y un vértice en 3 + i. Calcula su área y la parte real del vértice con mayor parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "área =", valor: 8 }, { tipo: "num", etiqueta: "Re del vértice =", valor: 1 }],
      pistas: ["Los vértices son c + (z₀ − c)·iᵏ. La diagonal es 2·|z₀ − c|."],
      pasos: ["z₀ − c = 2. Vértices: 1 + i + 2·iᵏ → 3 + i, 1 + 3i, −1 + i, 1 − i.", "Diagonal = 4 → área = d²/2 = 16/2 = 8.", "El de mayor parte imaginaria es 1 + 3i: parte real 1."],
      resultado: "área 8; vértice 1 + 3i" },
    { id: "j43", nivel: 2,
      enunciado: "Resuelve z³ = −27. De las tres soluciones, ¿cuál tiene parte imaginaria positiva? Da su parte real y su parte imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "Re =", valor: 1.5 }, { tipo: "num", etiqueta: "Im =", valor: 2.59808, tol: 0.002 }],
      pistas: ["−27 = 27<sub>180°</sub>. Las raíces cúbicas tienen módulo 3 y argumentos (180° + 360°k)/3."],
      pasos: ["Argumentos 60°, 180° y 300°.", "3<sub>60°</sub> = 3(1/2 + (√3/2)i) = 1,5 + 2,598i (parte imaginaria positiva).", "Las otras: −3 y 1,5 − 2,598i."],
      resultado: "3/2 + (3√3/2)i ≈ 1,5 + 2,598i" },
    { id: "j44", nivel: 2,
      enunciado: "Calcula el área de la región del plano formada por los z que cumplen 1 ≤ |z − 2i| ≤ 3.",
      check: { tipo: "num", etiqueta: "área =", valor: 25.1327, tol: 0.002 },
      pistas: ["|z − 2i| = r es la circunferencia de centro 2i y radio r. La región es una corona circular."],
      pasos: ["Círculo exterior de radio 3: π·3² = 9π. Círculo interior de radio 1: π·1² = π.", "Área de la corona = 9π − π = 8π ≈ 25,13."],
      resultado: "8π ≈ 25,13" },
    // ---------- ★★★ ----------
    { id: "j45", nivel: 3,
      enunciado: "Calcula iⁱ (valor principal) con la fórmula de Euler. Da el resultado con cuatro decimales.",
      check: { tipo: "num", etiqueta: "iⁱ =", valor: 0.20788, tol: 0.002 },
      pistas: ["Escribe i = e<sup>iπ/2</sup> y aplica (e<sup>a</sup>)<sup>b</sup> = e<sup>ab</sup>."],
      pasos: ["i = e<sup>iπ/2</sup>.", "iⁱ = (e<sup>iπ/2</sup>)<sup>i</sup> = e<sup>i·i·π/2</sup> = e<sup>−π/2</sup>.", "e<sup>−π/2</sup> ≈ 0,2079 (¡un número real!)."],
      resultado: "e<sup>−π/2</sup> ≈ 0,2079" },
    { id: "j46", nivel: 3,
      enunciado: "La semejanza f(z) = a·z + b cumple f(1) = 3 + i y f(i) = 2 + 4i. Halla el factor de ampliación |a|, el ángulo de giro (en grados, entre −180° y 180°) y las coordenadas del punto fijo.",
      check: [{ tipo: "num", etiqueta: "|a| =", valor: 2.23607 }, { tipo: "num", etiqueta: "ángulo =", valor: -26.565, unidad: "°" }, { tipo: "num", etiqueta: "Re del punto fijo =", valor: 0.5 }, { tipo: "num", etiqueta: "Im del punto fijo =", valor: -1.5 }],
      pistas: ["Resta las dos condiciones: f(1) − f(i) = a(1 − i). Después b = f(1) − a. El punto fijo es b/(1 − a)."],
      pasos: ["a = (3 + i − 2 − 4i)/(1 − i) = (1 − 3i)/(1 − i) = (1 − 3i)(1 + i)/2 = (4 − 2i)/2 = 2 − i.", "b = (3 + i) − (2 − i) = 1 + 2i. |a| = √5 ≈ 2,236 y arg a = −arctan(1/2) = −26,565°.", "Punto fijo: z₀ = b/(1 − a) = (1 + 2i)/(−1 + i) = (1 + 2i)(−1 − i)/2 = (1 − 3i)/2 = 0,5 − 1,5i."],
      resultado: "a = 2 − i; |a| = 2,236; −26,57°; punto fijo 1/2 − 3i/2" },
    { id: "j47", nivel: 3,
      enunciado: "Escribe 3cos(ωt) + 4sen(ωt) como A·cos(ωt − φ) con A &gt; 0 y 0° &lt; φ &lt; 90°. Da A y φ (en grados). (Pista: sen(ωt) = cos(ωt − 90°) y usa fasores.)",
      check: [{ tipo: "num", etiqueta: "A =", valor: 5 }, { tipo: "num", etiqueta: "φ =", valor: 53.13, unidad: "°" }],
      pistas: ["Fasores: 3cos(ωt) ↔ 3 y 4cos(ωt − 90°) ↔ 4e<sup>−i90°</sup> = −4i. Suma los dos complejos."],
      pasos: ["Fasor total: 3 + 4e<sup>−iπ/2</sup> = 3 − 4i, con módulo 5 y argumento −arctan(4/3) = −53,13°.", "Así que la suma es 5cos(ωt − 53,13°): A = 5 y φ = 53,13°.", "Comprobación: 5cos φ = 3 y 5 sen φ = 4 (cos φ = 3/5, sen φ = 4/5)."],
      resultado: "5cos(ωt − 53,13°)" },
    { id: "j48", nivel: 3,
      enunciado: "Halla el simétrico de z = 4 + 2i respecto de la recta que pasa por el origen y forma 30° con el eje real. Da su parte real y su parte imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "Re =", valor: 3.73205, tol: 0.002 }, { tipo: "num", etiqueta: "Im =", valor: 2.4641, tol: 0.002 }],
      pistas: ["La simetría respecto de una recta por el origen de ángulo φ es z ↦ e<sup>2iφ</sup>·z̄."],
      pasos: ["φ = 30° → e<sup>2iφ</sup> = e<sup>i60°</sup> = 1/2 + (√3/2)i. z̄ = 4 − 2i.", "(1/2 + (√3/2)i)(4 − 2i) = 2 − i + 2√3 i − √3 i² = (2 + √3) + (2√3 − 1)i.", "≈ 3,732 + 2,464i. Comprobación: |z'|² = 13,93 + 6,07 = 20 = |z|² ✓."],
      resultado: "(2 + √3) + (2√3 − 1)i ≈ 3,732 + 2,464i" },
    { id: "j49", nivel: 3,
      enunciado: "Demuestra que la suma de las n raíces n-ésimas de la unidad (n ≥ 2) es 0.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe las raíces como 1, ω, ω², …, ωⁿ⁻¹ con ω = e<sup>2πi/n</sup> ≠ 1", p: 0.5 },
        { t: "Reconoce una progresión geométrica de razón ω", p: 0.5 },
        { t: "Aplica la suma: (1 − ωⁿ)/(1 − ω)", p: 0.5 },
        { t: "Usa ωⁿ = 1 para concluir que el numerador es 0 y la suma vale 0 (el denominador no se anula)", p: 0.5 }
      ] },
      pasos: ["Las raíces son ω<sup>k</sup>, k = 0, …, n − 1, con ω = e<sup>2πi/n</sup>, y ω ≠ 1 por ser n ≥ 2.", "S = 1 + ω + … + ωⁿ⁻¹ = (1 − ωⁿ)/(1 − ω) (suma de una progresión geométrica de razón ω).", "ωⁿ = e<sup>2πi</sup> = 1, luego el numerador es 0, y como 1 − ω ≠ 0, S = 0. ∎"],
      resultado: "S = 0" }
  );
  ejercicios.sort(function (a, b) { return a.nivel - b.nivel; });

  // láminas nuevas
  lamina.push(
    { titulo: "Fórmula de Euler y forma exponencial",
      items: [
        { label: "Fórmula de Euler", formula: "e<sup>iθ</sup> = cos θ + i·sen θ", cuando: "θ siempre en radianes. |e<sup>iθ</sup>| = 1.", ejemplo: "e<sup>iπ</sup> = −1 · e<sup>iπ/2</sup> = i" },
        { label: "Forma exponencial", formula: "z = r·e<sup>iθ</sup> = r<sub>θ</sub>", ejemplo: "−1 + i = √2·e<sup>i3π/4</sup>" },
        { label: "Operaciones", formula: "r e<sup>iα</sup>·s e<sup>iβ</sup> = rs e<sup>i(α+β)</sup> · (r e<sup>iθ</sup>)ⁿ = rⁿ e<sup>inθ</sup>", ejemplo: "(√2 e<sup>iπ/4</sup>)⁸ = 16" },
        { label: "Coseno y seno", formula: "cos θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>)/2 · sen θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)/(2i)" }
      ],
      nota: "e<sup>iπ</sup> + 1 = 0. Fasores: A·cos(ωt + φ) ↔ A·e<sup>iφ</sup>." },
    { titulo: "Transformaciones y polinomios", ancha: true,
      tabla: { cab: ["Idea", "Fórmula / regla"], filas: [
        ["Traslación · giro · homotecia", "z + c · e<sup>iα</sup>·z · k·z"],
        ["Simetrías", "z̄ (eje real) · −z̄ (eje imaginario) · i·z̄ (y = x) · e<sup>2iφ</sup>·z̄ (recta por 0 a φ)"],
        ["Giro de centro c", "c + e<sup>iα</sup>(z − c)"],
        ["Semejanza a·z + b", "razón |a|, ángulo arg a, punto fijo b/(1 − a)"],
        ["Raíces conjugadas", "con coeficientes reales: a ± bi vienen juntas → factor x² − 2a·x + a² + b²"],
        ["Polígono regular", "z<sub>k</sub> = c + (z₀ − c)·e<sup>2πik/n</sup> · lado 2R·sen(π/n)"]
      ] },
      nota: "La suma de las n raíces n-ésimas de la unidad es 0." }
  );

  B.registrar("mates1", "t6", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
