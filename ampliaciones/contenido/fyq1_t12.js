/* ============================================================
   Física y Química I · ampliaciones · Tema 12: Trabajo, energía y potencia
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t12/" + ref); }

  var resumen = [
    "<b>Trabajo</b> de una fuerza constante: W = F·d·cos α (J). Sólo cuenta la componente de F en la dirección del desplazamiento: positivo si ayuda (α &lt; 90°), nulo si es perpendicular (α = 90°), negativo si se opone (α &gt; 90°). Con fuerza variable, el trabajo es el <b>área bajo la gráfica F–x</b>.",
    "<b>Energía cinética</b> E<sub>c</sub> = ½·m·v². <b>Teorema de las fuerzas vivas</b>: el trabajo <i>neto</i> sobre un cuerpo es igual a la variación de su energía cinética, W<sub>neto</sub> = ΔE<sub>c</sub>.",
    "<b>Energía potencial</b>: gravitatoria cerca de la superficie E<sub>p</sub> = m·g·h (respecto a un nivel de referencia que se elige) y elástica E<sub>p</sub> = ½·k·x². Existe asociada a toda fuerza <b>conservativa</b>: W<sub>cons</sub> = −ΔE<sub>p</sub>.",
    "<b>Energía mecánica</b> E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub>. Se conserva si sólo trabajan fuerzas conservativas; en general ΔE<sub>m</sub> = W<sub>no cons</sub> (el rozamiento la convierte en calor). La energía <i>total</i> siempre se conserva.",
    "<b>Potencia</b>: P = W/t = F·v (W = J/s; 1 CV = 735,5 W). <b>Rendimiento</b>: η = P<sub>útil</sub>/P<sub>total</sub> ≤ 1; en una cadena de máquinas los rendimientos se multiplican. 1 kWh = 3,6·10⁶ J es una unidad de <i>energía</i>.",
    "<b>Método</b>: sin rozamiento → conservación de E<sub>m</sub>; con rozamiento o fuerzas externas → W<sub>nc</sub> = ΔE<sub>m</sub> o W<sub>neto</sub> = ΔE<sub>c</sub>; si piden tiempo o rapidez de la transferencia → potencia."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Trabajo mecánico
  secciones[0] =
    "<h5>Una definición con más contenido del que parece</h5>" +
    "<p>Cuando una fuerza actúa sobre un cuerpo que se desplaza, la fuerza puede <b>transferirle energía</b> o <b>quitársela</b>. El <b>trabajo</b> es la cantidad de energía que se transfiere de ese modo. Para una fuerza constante, y un desplazamiento rectilíneo, se calcula con el <b>producto escalar</b> de los dos vectores:</p>" +
    formula("W = F⃗ · Δr⃗ = F·d·cos α") +
    "<p>donde F es el módulo de la fuerza, d el módulo del desplazamiento y α el ángulo <b>entre la fuerza y el desplazamiento</b> (no entre la fuerza y la horizontal). La unidad en el SI es el <b>julio</b> (J): 1 J es el trabajo que hace una fuerza de 1 N a lo largo de 1 m, es decir, 1 J = 1 N·m = 1 kg·m²/s². Un julio es poco: es, más o menos, lo que cuesta levantar una manzana de 100 g a un metro de altura (0,98 J).</p>" +
    "<p>La forma de entender la fórmula es esta: la fuerza se puede descomponer en una parte <b>paralela</b> al desplazamiento, F·cos α, y otra <b>perpendicular</b>, F·sen α. Sólo la parte paralela empuja o frena el movimiento; la perpendicular no hace avanzar al cuerpo ni lo frena, así que no transfiere energía. Por eso el trabajo es simplemente (componente paralela de F) × (distancia recorrida).</p>" +
    w("f12_trabajo", "trabajo") +
    "<h5>El signo del trabajo</h5>" +
    "<p>El trabajo es un <b>escalar</b> (no tiene dirección) pero sí tiene <b>signo</b>, y el signo cuenta una historia: si es positivo, la fuerza le <i>da</i> energía al cuerpo; si es negativo, se la <i>quita</i>; si es cero, no hay transferencia.</p>" +
    tabla(["Ángulo α", "cos α", "Trabajo", "Qué significa", "Ejemplo"], [
      ["0°", "1", "W = F·d (máximo, positivo)", "la fuerza va en el sentido del movimiento", "empujar un carrito en línea recta"],
      ["0° &lt; α &lt; 90°", "entre 0 y 1", "positivo, menor que F·d", "ayuda, pero con una parte de la fuerza «desperdiciada»", "tirar de una maleta con asa inclinada"],
      ["90°", "0", "W = 0", "la fuerza es perpendicular al movimiento", "la normal en un suelo horizontal; la tensión de un péndulo"],
      ["90° &lt; α &lt; 180°", "entre −1 y 0", "negativo", "frena parcialmente", "la componente horizontal de una fuerza que va hacia atrás"],
      ["180°", "−1", "W = −F·d (mínimo)", "la fuerza se opone al movimiento", "rozamiento cinético, freno, resistencia del aire"]
    ]) +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Tirar de un carrito con una cuerda inclinada", "Se arrastra un carrito 6 m sobre el suelo tirando de una cuerda con una fuerza de 40 N que forma 30° con el suelo. ¿Qué trabajo hace la fuerza?", [
      "W = F·d·cos α = 40·6·cos 30°",
      "cos 30° = 0,866 → W = 240·0,866",
      "<b>W = 207,8 J</b> (si la cuerda fuera horizontal serían 240 J; la componente vertical, F·sen 30° = 20 N, sólo aligera el peso y no hace avanzar el carrito)"
    ]) +
    ejemplo("Una fuerza que frena", "Un bloque desliza 5 m y la fuerza de rozamiento vale 12 N. ¿Qué trabajo hace el rozamiento?", [
      "El rozamiento va en sentido contrario al desplazamiento: α = 180°, cos 180° = −1.",
      "W<sub>Fr</sub> = 12·5·(−1) = <b>−60 J</b>",
      "El signo negativo indica que el rozamiento le <b>quita</b> 60 J de energía cinética al bloque (se convierten en calor)."
    ]) +
    ejemplo("Una fuerza oblicua hacia atrás", "Una fuerza de 30 N forma un ángulo de 120° con un desplazamiento de 5 m. Calcula el trabajo.", [
      "cos 120° = −0,5",
      "W = 30·5·(−0,5) = <b>−75 J</b>",
      "(La fuerza tiene una componente que apunta contra el movimiento: frena.)"
    ]) +
    "<h5>Cuándo una fuerza no hace trabajo</h5>" +
    "<p>Hay tres situaciones en las que una fuerza, aunque exista, no hace trabajo, y conviene reconocerlas al vuelo porque simplifican muchos problemas:</p>" +
    "<ul>" +
    "<li><b>No hay desplazamiento (d = 0).</b> Si sostienes una maleta quieta, o empujas una pared, el trabajo mecánico sobre la maleta o la pared es cero. Los músculos sí gastan energía química (las fibras se contraen y se relajan continuamente y eso se convierte en calor), por eso te cansas, pero eso es fisiología, no trabajo mecánico sobre el objeto.</li>" +
    "<li><b>La fuerza es perpendicular al desplazamiento (α = 90°).</b> Es el caso de la <b>normal</b> en una superficie horizontal o inclinada, de la <b>tensión de la cuerda de un péndulo</b> (siempre perpendicular a la trayectoria circular) y de la <b>fuerza centrípeta</b> en un movimiento circular uniforme. Por eso la Luna da vueltas a la Tierra sin que la gravedad le cambie la energía cinética.</li>" +
    "<li><b>El punto de aplicación no se desplaza.</b> En una rueda que rueda sin deslizar, el rozamiento estático actúa sobre el punto de contacto, que en ese instante está quieto: no hace trabajo (por eso se puede avanzar con un coche sin que el rozamiento «gaste» energía en la tracción).</li>" +
    "</ul>" +
    "<h5>Varias fuerzas: el trabajo neto</h5>" +
    "<p>Cuando varias fuerzas actúan sobre un cuerpo, cada una hace su propio trabajo. El <b>trabajo neto</b> (o total) es la suma de todos, con sus signos:</p>" +
    formula("W<sub>neto</sub> = W₁ + W₂ + W₃ + … = F<sub>neta</sub>·d·cos α") +
    "<p>Las dos expresiones son equivalentes (para fuerzas constantes): puedes sumar los trabajos de cada fuerza, o calcular primero la fuerza resultante y hacer su trabajo. Elige la que te dé menos cuentas.</p>" +
    ejemplo("Trabajo de todas las fuerzas sobre un bloque", "Un bloque de 5 kg se empuja 8 m sobre un suelo horizontal con una fuerza horizontal de 25 N. El coeficiente de rozamiento es μ = 0,2 (g = 9,8 m/s²). Calcula el trabajo de cada fuerza y el neto.", [
      "Fuerza aplicada: W<sub>F</sub> = 25·8·cos 0° = <b>200 J</b>",
      "Peso y normal: son perpendiculares al desplazamiento → W<sub>P</sub> = W<sub>N</sub> = <b>0</b>",
      "Rozamiento: N = m·g = 49 N; F<sub>r</sub> = μ·N = 9,8 N → W<sub>Fr</sub> = 9,8·8·cos 180° = <b>−78,4 J</b>",
      "Neto: W<sub>neto</sub> = 200 + 0 + 0 − 78,4 = <b>121,6 J</b>",
      "Comprobación con la fuerza resultante: F<sub>neta</sub> = 25 − 9,8 = 15,2 N → 15,2·8 = 121,6 J ✓"
    ]) +
    "<h5>Cuando la fuerza no es constante: el área bajo la curva</h5>" +
    "<p>La fórmula W = F·d·cos α sólo vale si F es constante. Si la fuerza cambia al desplazarse el cuerpo, se divide el recorrido en tramos muy pequeños en los que F es casi constante, se calcula el trabajo de cada tramo (F·Δx) y se suman. Dibujado en una gráfica de <b>F frente a x</b>, cada F·Δx es el área de una tira estrecha, y la suma de todas las tiras es el <b>área encerrada entre la curva y el eje x</b>:</p>" +
    formula("W = área bajo la gráfica F(x)  (entre x₁ y x₂)") +
    "<p>El área cuenta como positiva si la fuerza es positiva y como negativa si la fuerza es negativa (por debajo del eje). Con esta idea se resuelven los casos que aparecen en 1.º de Bachillerato sin usar integrales: la gráfica es un rectángulo, un triángulo, un trapecio o la suma de varias figuras.</p>" +
    w("f12_fx", "fx") +
    "<p>El caso más importante es el <b>muelle</b>. Según la ley de Hooke, para estirar (o comprimir) un muelle una distancia x hay que hacer una fuerza F = k·x, donde k es la constante del muelle (N/m). La gráfica F–x es una recta que pasa por el origen, y el área bajo ella es un triángulo de base x y altura k·x:</p>" +
    formula("W = ½ · x · (k·x) = ½·k·x²") +
    ejemplo("Trabajo con una fuerza que crece linealmente", "Una fuerza varía con la posición como F = 2x (N, con x en m). Calcula el trabajo que hace entre x = 0 y x = 5 m.", [
      "La gráfica es una recta: F(0) = 0 y F(5) = 10 N. El área es un triángulo.",
      "W = ½·base·altura = ½·5·10 = <b>25 J</b>"
    ]) +
    ejemplo("Estirar un muelle", "Un muelle de constante k = 200 N/m se estira 10 cm desde su posición natural. ¿Cuánto trabajo cuesta? ¿Y si se estira 20 cm?", [
      "x = 0,10 m: W = ½·200·0,10² = <b>1 J</b>",
      "x = 0,20 m: W = ½·200·0,20² = <b>4 J</b>",
      "El doble de estiramiento cuesta <b>cuatro veces</b> más trabajo, porque W ∝ x²: no sólo la fuerza crece, sino también el recorrido."
    ]) +
    ojo("tres errores muy frecuentes con el trabajo: (1) usar el ángulo que forma la fuerza con la <i>horizontal</i> en vez del que forma con el <i>desplazamiento</i>; (2) olvidar el signo del rozamiento, que siempre tiene α = 180° y trabajo negativo; (3) confundir el <b>trabajo</b> (escalar, J) con la <b>fuerza</b> (vector, N) o con el esfuerzo físico que sientes. El peso <i>sí</i> hace trabajo cuando el cuerpo sube o baja, pero <i>no</i> cuando se mueve en horizontal.");

  // ---------------------------------------------------------------- 2. Energía cinética y teorema
  secciones[1] =
    "<h5>De dónde sale la fórmula ½·m·v²</h5>" +
    "<p>La energía cinética no es una fórmula que haya que aprenderse «porque sí»: sale directamente de la definición de trabajo y de la segunda ley de Newton. Supón que una fuerza neta constante F actúa sobre un cuerpo de masa m en la dirección del movimiento mientras se desplaza una distancia d, y que su velocidad pasa de v₀ a v:</p>" +
    "<ol class='steps'>" +
    "<li class='step'><div class='math-line'>Segunda ley de Newton: F = m·a → la aceleración es constante.</div></li>" +
    "<li class='step'><div class='math-line'>Cinemática (MRUA): v² = v₀² + 2·a·d → a·d = (v² − v₀²)/2.</div></li>" +
    "<li class='step'><div class='math-line'>Trabajo de la fuerza neta: W = F·d = m·a·d = m·(v² − v₀²)/2.</div></li>" +
    "<li class='step'><div class='math-line'><b>W = ½·m·v² − ½·m·v₀² = E<sub>c</sub> − E<sub>c0</sub> = ΔE<sub>c</sub></b></div></li>" +
    "</ol>" +
    "<p>El resultado es el <b>teorema del trabajo y la energía cinética</b> (o de las «fuerzas vivas»): <i>el trabajo neto de todas las fuerzas que actúan sobre un cuerpo es igual a la variación de su energía cinética</i>. Aunque lo hemos demostrado para una fuerza constante, es válido siempre: también con fuerzas variables y con trayectorias curvas.</p>" +
    formula("W<sub>neto</sub> = ΔE<sub>c</sub> = ½·m·v² − ½·m·v₀²") +
    "<h5>Propiedades de la energía cinética</h5>" +
    "<ul>" +
    "<li>Es un <b>escalar</b> y <b>nunca es negativa</b>: depende de v², no de la dirección del movimiento. Un coche que va hacia el norte y otro igual que va hacia el sur a la misma velocidad tienen la misma energía cinética.</li>" +
    "<li>Es <b>proporcional a la masa</b> y <b>al cuadrado de la velocidad</b>. Duplicar la masa duplica E<sub>c</sub>, pero duplicar la velocidad la multiplica por <b>cuatro</b> y triplicarla, por nueve.</li>" +
    "<li>Depende del <b>sistema de referencia</b>: una maleta tiene E<sub>c</sub> = 0 para quien viaja con ella en el tren, pero no para alguien que ve pasar el tren desde el andén.</li>" +
    "<li>Se mide en julios: 1 J = 1 kg·(m/s)².</li>" +
    "</ul>" +
    "<h5>Energías cinéticas de la vida cotidiana</h5>" +
    tabla(["Objeto", "Masa", "Velocidad", "Energía cinética"], [
      ["Persona caminando", "70 kg", "1,4 m/s (5 km/h)", "69 J"],
      ["Saque de tenis", "57 g", "55,6 m/s (200 km/h)", "88 J"],
      ["Bala de pistola", "4 g", "400 m/s", "320 J"],
      ["Ciclista con bici", "80 kg", "5,56 m/s (20 km/h)", "1,23 kJ"],
      ["Coche en ciudad", "1000 kg", "13,9 m/s (50 km/h)", "96,5 kJ"],
      ["Coche en autopista", "1000 kg", "27,8 m/s (100 km/h)", "386 kJ"],
      ["Coche a 120 km/h", "1000 kg", "33,3 m/s", "556 kJ"],
      ["Camión", "20 t", "25 m/s (90 km/h)", "6,25 MJ"],
      ["Tren", "100 t", "20 m/s (72 km/h)", "20 MJ"]
    ]) +
    "<p>Observa cómo un coche a 100 km/h tiene una energía cinética cuatro veces mayor que a 50 km/h, aunque la velocidad sólo se haya duplicado. Esa es la razón física por la que los accidentes a alta velocidad son tanto más graves: hay que disipar (en frenos, en la deformación de la carrocería, en los ocupantes…) cuatro veces más energía.</p>" +
    "<h5>Aplicación: la distancia de frenado</h5>" +
    "<p>Cuando un coche frena con las ruedas bloqueadas, la fuerza de rozamiento con la carretera hace un trabajo negativo F<sub>r</sub>·d = μ·m·g·d que se lleva toda la energía cinética hasta detenerlo: 0 − ½·m·v² = −μ·m·g·d. Despejando:</p>" +
    formula("d = " + fr("v²", "2·μ·g")) +
    "<p>La masa se cancela: el camión y el turismo, con los mismos neumáticos y la misma carretera, necesitan la misma distancia para frenar (sin ABS ni otros factores). Pero la distancia depende del <b>cuadrado de la velocidad</b>:</p>" +
    tabla(["Velocidad inicial", "Asfalto seco (μ = 0,7)", "Asfalto mojado (μ = 0,4)", "Hielo (μ = 0,15)"], [
      ["30 km/h", "5,1 m", "8,9 m", "23,6 m"],
      ["50 km/h", "14,1 m", "24,6 m", "65,6 m"],
      ["90 km/h", "45,6 m", "79,7 m", "212,6 m"],
      ["120 km/h", "81,0 m", "141,7 m", "377,9 m"]
    ]) +
    "<p>Estas distancias no incluyen la <b>distancia de reacción</b> (lo que recorres desde que ves el peligro hasta que pisas el freno, a velocidad constante), que se suma a la de frenado.</p>" +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Trabajo necesario para acelerar un coche", "Un coche de 1000 kg parte del reposo y alcanza 20 m/s (72 km/h). ¿Qué trabajo neto se ha realizado sobre él?", [
      "W = ΔE<sub>c</sub> = ½·1000·20² − 0 = ½·1000·400",
      "<b>W = 200 000 J = 200 kJ</b>"
    ]) +
    ejemplo("Duplicar la velocidad no cuesta el doble", "¿Qué trabajo hace falta para pasar un coche de 1000 kg de 10 m/s a 20 m/s? ¿Y de 20 m/s a 30 m/s?", [
      "De 10 a 20 m/s: ΔE<sub>c</sub> = ½·1000·(20² − 10²) = 500·300 = <b>150 kJ</b>",
      "De 20 a 30 m/s: ΔE<sub>c</sub> = ½·1000·(30² − 20²) = 500·500 = <b>250 kJ</b>",
      "Cada 10 m/s «cuesta» más que los anteriores, porque la energía crece con v²."
    ]) +
    ejemplo("Frenar con una fuerza constante", "Un coche de 1200 kg que va a 20 m/s frena con una fuerza constante de 6000 N. ¿Qué distancia recorre hasta detenerse?", [
      "W<sub>neto</sub> = −F·d = ΔE<sub>c</sub> = 0 − ½·1200·20² = −240 000 J",
      "d = 240 000/6000 = <b>40 m</b>",
      "(Con cinemática habría que calcular antes la aceleración, a = −5 m/s²: la vía energética es más directa.)"
    ]) +
    ejemplo("Teorema con rozamiento", "El bloque de 5 kg del ejemplo anterior (W<sub>neto</sub> = 121,6 J) parte del reposo. ¿Qué velocidad lleva tras los 8 m?", [
      "W<sub>neto</sub> = ΔE<sub>c</sub> = ½·m·v² − 0 → v = √(2·W<sub>neto</sub>/m)",
      "v = √(2·121,6/5) = √48,64 = <b>6,97 m/s</b>",
      "Fíjate en que hay que usar el trabajo <b>neto</b> (con el rozamiento), no sólo el de la fuerza aplicada: con 200 J saldrían 8,9 m/s, un resultado erróneo."
    ]) +
    "<h5>¿Cuándo conviene usar el teorema en vez de la cinemática?</h5>" +
    "<p>La dinámica y la cinemática (temas 8 a 10) resuelven los mismos problemas, pero el teorema del trabajo y la energía es más cómodo cuando <b>no te preguntan por el tiempo ni por la aceleración</b>, sino por una velocidad en función de una distancia, o al revés. También funciona cuando la fuerza no es constante o la trayectoria es curva, casos en los que el MRUA no sirve. Si en cambio te piden un <i>tiempo</i>, necesitarás la cinemática o la potencia.</p>" +
    ojo("el teorema habla del trabajo <b>neto</b> (de todas las fuerzas, incluido el rozamiento) y no de una sola fuerza. Y la energía cinética no se calcula como (½·m·Δv)²: la variación es ΔE<sub>c</sub> = ½·m·(v² − v₀²), <b>no</b> ½·m·(v − v₀)².");

  // ---------------------------------------------------------------- 3. Energía potencial
  secciones[2] =
    "<h5>La energía potencial a partir del trabajo del peso</h5>" +
    "<p>Imagina que levantas un libro de masa m desde el suelo hasta una altura h. El peso (m·g, hacia abajo) se opone al desplazamiento (hacia arriba): α = 180° y su trabajo es <b>W<sub>peso</sub> = −m·g·h</b>. Tú has tenido que hacer un trabajo positivo de la misma cantidad para subirlo despacio, y ese trabajo no se ha perdido: el libro, colocado arriba, es capaz de devolverlo (si lo sueltas, cae y gana energía cinética). Esa capacidad «almacenada» en la posición es la <b>energía potencial gravitatoria</b>. La definimos de modo que el trabajo del peso sea el opuesto de su variación:</p>" +
    formula("W<sub>peso</sub> = −ΔE<sub>p</sub>      con      E<sub>p</sub> = m·g·h") +
    "<p>Si el cuerpo sube (Δh &gt; 0), el peso hace trabajo negativo y la energía potencial <i>aumenta</i>; si baja, el peso hace trabajo positivo y la energía potencial <i>disminuye</i>. Esa es la forma de pensar en los problemas: <b>la gravedad «gasta» energía potencial para dársela al cuerpo en forma de energía cinética</b>.</p>" +
    "<h5>El nivel de referencia: tú decides dónde está el cero</h5>" +
    "<p>La altura h se mide desde un <b>nivel de referencia</b> que eliges tú (el suelo, la mesa, el punto más bajo de la trayectoria…). Cambiar de referencia cambia el valor de E<sub>p</sub>, pero <b>no cambia las diferencias</b> ΔE<sub>p</sub>, y sólo las diferencias tienen significado físico (son las que aparecen en el trabajo y en la conservación de la energía). Lo único que debes hacer es usar <b>la misma referencia durante todo el problema</b>.</p>" +
    tabla(["Referencia (h = 0)", "E<sub>p</sub> en la estantería (1,5 m)", "E<sub>p</sub> en la mesa (0,75 m)", "ΔE<sub>p</sub> al subir de la mesa a la estantería"], [
      ["El suelo", "2·9,8·1,5 = 29,4 J", "2·9,8·0,75 = 14,7 J", "14,7 J"],
      ["La mesa", "2·9,8·0,75 = 14,7 J", "0", "14,7 J"],
      ["La estantería", "0", "2·9,8·(−0,75) = −14,7 J", "14,7 J"]
    ]) +
    "<p>(Libro de 2 kg.) Como ves, la energía potencial puede ser <b>negativa</b> sin que eso signifique nada raro: simplemente el cuerpo está por debajo del nivel de referencia. La columna de la derecha es igual en los tres casos.</p>" +
    "<h5>Fuerzas conservativas</h5>" +
    "<p>No todas las fuerzas permiten definir una energía potencial. Sólo lo hacen las <b>fuerzas conservativas</b>, que se caracterizan porque <b>su trabajo no depende del camino</b> seguido entre los puntos inicial y final (sólo depende de esos dos puntos), o, dicho de otro modo equivalente, porque su trabajo en un <b>trayecto cerrado es nulo</b>. El peso es conservativo: sube una caja de 10 kg una altura de 5 m en vertical, o por una rampa de 30° (de 10 m de largo) o por una escalera de caracol, y el trabajo del peso siempre es −m·g·h = −490 J. En cambio, el rozamiento <b>no</b> es conservativo: arrastrar una caja por un camino largo y tortuoso gasta más energía que por uno corto, entre los mismos dos puntos.</p>" +
    ejemplo("El trabajo del peso no depende del camino", "Se sube una caja de 10 kg hasta 5 m de altura: (a) en vertical, (b) por una rampa de 30° (sin rozamiento). Calcula el trabajo del peso en cada caso (g = 9,8 m/s²).", [
      "(a) Vertical: desplazamiento 5 m hacia arriba, α = 180° → W<sub>P</sub> = 98·5·cos 180° = <b>−490 J</b>",
      "(b) Rampa: longitud L = h/sen 30° = 10 m. El peso forma con el desplazamiento un ángulo de 120° (90° + 30°): W<sub>P</sub> = 98·10·cos 120° = 98·10·(−0,5) = <b>−490 J</b>",
      "Mismo resultado: la rampa necesita menos fuerza pero más distancia. El peso es una fuerza <b>conservativa</b>."
    ]) +
    "<h5>La energía potencial elástica</h5>" +
    "<p>La fuerza de un muelle (F = −k·x) también es conservativa, y su trabajo, calculado como un área, es ½·k·x². Por eso un muelle comprimido o estirado almacena energía:</p>" +
    formula("E<sub>p,el</sub> = ½·k·x²") +
    "<p>donde x es la deformación respecto a la longitud natural (se toma E<sub>p,el</sub> = 0 con el muelle sin deformar) y k la constante del muelle. Es siempre positiva y depende del cuadrado de x: un muelle comprimido el doble guarda cuatro veces más energía (el tema siguiente estudia con detalle el muelle).</p>" +
    ejemplo("Un muelle lanza una bola", "Un muelle de k = 200 N/m se comprime 10 cm y empuja una bola de 50 g sobre una superficie lisa. ¿Con qué velocidad sale la bola?", [
      "Energía almacenada: E<sub>p,el</sub> = ½·200·0,10² = <b>1 J</b>",
      "Toda se convierte en cinética: ½·0,05·v² = 1 → v² = 40",
      "<b>v = 6,32 m/s</b>"
    ]) +
    "<h5>La energía potencial de la gravitación general</h5>" +
    "<p>En el tema 11 se vio que, a distancias grandes, la energía potencial gravitatoria es E<sub>p</sub> = −GMm/r. La expresión m·g·h es la <b>aproximación para alturas pequeñas</b> frente al radio del planeta (h ≪ R), donde g puede tomarse constante. ¿Hasta dónde vale? La aceleración de la gravedad disminuye aproximadamente un 0,31 % cada 10 km de altura (g(h) ≈ g₀(1 − 2h/R)): para un edificio, un avión de pasajeros o una montaña, la diferencia es inapreciable; a 30 km sería del 1 %; y a 400 km (la altura de la Estación Espacial) ΔE<sub>p</sub> = m·g·h se equivoca en un 6 %, como se calculó en el tema anterior.</p>" +
    w("f12_lanzamiento", "lanzamiento") +
    ejemplo("Energía potencial en distintos mundos", "Calcula la energía potencial de una persona de 70 kg a 1 m de altura sobre el suelo en la Tierra (g = 9,8 m/s²) y en la Luna (g = 1,62 m/s²).", [
      "Tierra: E<sub>p</sub> = 70·9,8·1 = <b>686 J</b>",
      "Luna: E<sub>p</sub> = 70·1,62·1 = <b>113,4 J</b>",
      "La masa es la misma (70 kg); cambia g. En la Luna subir cuesta 6 veces menos energía."
    ]) +
    ejemplo("Subir una escalera", "Una persona de 70 kg sube a un 1.º piso, 3 m más arriba. ¿Cuánto aumenta su energía potencial? Si tarda 5 s en subir, ¿qué potencia mecánica desarrolla?", [
      "ΔE<sub>p</sub> = m·g·Δh = 70·9,8·3 = <b>2058 J</b>",
      "P = W/t = 2058/5 = <b>412 W</b> (algo más de medio caballo de vapor; el cuerpo, además, gasta mucha más energía química porque el rendimiento de los músculos ronda el 25 %)."
    ]) +
    ojo("la energía potencial <b>no</b> es de un cuerpo solo: pertenece al <i>sistema</i> cuerpo–Tierra (o cuerpo–muelle); en los problemas basta con hablar de «la energía potencial del cuerpo». Y h no es «la altura de verdad» sino la altura sobre el nivel que has elegido como cero: para una pelota en una mesa de 0,8 m, h = 0 si el cero es la mesa y h = 0,8 si es el suelo.");

  // ---------------------------------------------------------------- 4. Conservación de la energía mecánica
  secciones[3] =
    "<h5>De la energía cinética y la potencial a la energía mecánica</h5>" +
    "<p>Reunimos lo que sabemos. Sobre un cuerpo actúan fuerzas conservativas (peso, muelles) y no conservativas (rozamiento, motores, la mano que empuja). El teorema del trabajo y la energía cinética dice que el trabajo neto es ΔE<sub>c</sub>. Ese trabajo neto es la suma del de las fuerzas conservativas y el de las no conservativas, y el de las conservativas es −ΔE<sub>p</sub>:</p>" +
    "<ol class='steps'>" +
    "<li class='step'><div class='math-line'>W<sub>neto</sub> = W<sub>cons</sub> + W<sub>no cons</sub> = ΔE<sub>c</sub></div></li>" +
    "<li class='step'><div class='math-line'>W<sub>cons</sub> = −ΔE<sub>p</sub></div></li>" +
    "<li class='step'><div class='math-line'><b>W<sub>no cons</sub> = ΔE<sub>c</sub> + ΔE<sub>p</sub> = Δ(E<sub>c</sub> + E<sub>p</sub>) = ΔE<sub>m</sub></b></div></li>" +
    "</ol>" +
    "<p>La suma E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> se llama <b>energía mecánica</b>. El resultado es la ley más útil del tema:</p>" +
    formula("ΔE<sub>m</sub> = W<sub>no cons</sub>") +
    "<p><b>El trabajo de las fuerzas no conservativas es igual a la variación de la energía mecánica.</b> Si ese trabajo es nulo, la energía mecánica <b>se conserva</b>: E<sub>m,final</sub> = E<sub>m,inicial</sub>, es decir, ½·m·v² + m·g·h = constante. Es la ley de conservación de la energía mecánica.</p>" +
    "<h5>¿Cuándo se conserva E<sub>m</sub>?</h5>" +
    tabla(["Fuerza", "¿Conservativa?", "Energía potencial asociada", "Comentario"], [
      ["Peso", "Sí", "m·g·h", "trabajo independiente del camino"],
      ["Fuerza elástica (muelle)", "Sí", "½·k·x²", "se almacena en la deformación"],
      ["Gravitatoria general", "Sí", "−GMm/r", "órbitas, tema 11"],
      ["Rozamiento", "No", "—", "trabajo negativo → calor; depende de la longitud del camino"],
      ["Resistencia del aire", "No", "—", "siempre contraria a la velocidad"],
      ["Fuerza del motor o de una persona", "No", "—", "puede aumentar E<sub>m</sub> (W &gt; 0)"],
      ["Normal, tensión de una cuerda", "No, pero…", "—", "son perpendiculares al movimiento: W = 0, no cambian E<sub>m</sub>"]
    ]) +
    "<p>Por tanto, E<sub>m</sub> se conserva cuando <b>sólo hacen trabajo fuerzas conservativas</b>, o cuando las demás fuerzas no hacen trabajo (normal, tensión). Esto último es la clave de muchos problemas: en una montaña rusa sin rozamiento, la normal del carril es una fuerza no conservativa, pero como siempre es perpendicular a la velocidad, no hace trabajo.</p>" +
    "<h5>Una herramienta potente: velocidades sin cinemática</h5>" +
    "<p>Con la conservación se pueden obtener resultados clásicos en una línea:</p>" +
    tabla(["Situación", "Planteamiento", "Resultado"], [
      ["Caída libre desde una altura h", "m·g·h = ½·m·v²", "v = √(2·g·h)"],
      ["Lanzamiento vertical con v₀", "½·m·v₀² = m·g·h<sub>máx</sub>", "h<sub>máx</sub> = v₀²/(2g)"],
      ["Rampa lisa (cualquier ángulo) desde altura h", "m·g·h = ½·m·v²", "v = √(2·g·h): no depende del ángulo"],
      ["Péndulo de longitud L soltado desde un ángulo θ₀", "h = L·(1 − cos θ₀)", "v<sub>máx</sub> = √(2·g·L·(1 − cos θ₀))"],
      ["Muelle comprimido x lanzando masa m", "½·k·x² = ½·m·v²", "v = x·√(k/m)"]
    ]) +
    "<p>Observa que la <b>masa se cancela</b> en todos los casos que sólo involucran energía cinética y potencial gravitatoria: la velocidad de llegada no depende de la masa. Y que en la rampa <i>no importa la forma del recorrido</i>, sólo la altura inicial y la final: es la ventaja de trabajar con energías (escalares) en vez de con fuerzas (vectores que cambian en cada punto).</p>" +
    w("f12_pendulo", "pendulo") +
    w("f12_montana", "montana") +
    "<h5>Ejemplos resueltos sin rozamiento</h5>" +
    ejemplo("Altura máxima de un lanzamiento", "Se lanza hacia arriba una piedra con v₀ = 8 m/s. ¿Hasta qué altura sube? (g = 9,8 m/s²)", [
      "E<sub>m</sub> abajo = ½·m·8²; arriba, v = 0: E<sub>m</sub> = m·g·h",
      "½·64 = 9,8·h → h = 32/9,8 = <b>3,265 m</b>",
      "(No hace falta saber la masa de la piedra.)"
    ]) +
    ejemplo("Péndulo", "Se suelta una bolita colgada de un hilo de 2 m desde un ángulo de 60° respecto a la vertical. ¿Con qué velocidad pasa por el punto más bajo?", [
      "Altura inicial sobre el punto más bajo: h = L·(1 − cos 60°) = 2·(1 − 0,5) = 1 m",
      "m·g·h = ½·m·v² → v = √(2·9,8·1) = <b>4,43 m/s</b>",
      "La tensión del hilo es perpendicular al movimiento: no hace trabajo y no interviene en el balance."
    ]) +
    ejemplo("Montaña rusa", "Un carrito parte del reposo en lo alto de una montaña rusa a 30 m de altura. ¿Con qué velocidad pasa por un punto situado a 10 m de altura? Ignora el rozamiento.", [
      "Se pierden 20 m de altura: m·g·(30 − 10) = ½·m·v²",
      "v = √(2·9,8·20) = √392 = <b>19,8 m/s</b> (71,3 km/h)"
    ]) +
    ejemplo("El rizo (looping)", "Un carrito baja por una rampa y entra en un rizo circular de radio R = 5 m. ¿Desde qué altura mínima (sobre el punto más bajo del rizo) debe salir para no despegarse del carril en la parte más alta? Sin rozamiento.", [
      "En el punto más alto, la normal N y el peso apuntan hacia el centro: m·g + N = m·v²/R. Justo antes de despegarse, N = 0 → v² = g·R",
      "Conservación entre el punto de salida (altura h, v = 0) y la cima del rizo (altura 2R): m·g·h = m·g·2R + ½·m·v² = m·g·2R + ½·m·g·R",
      "h = 2R + R/2 = 2,5·R = 2,5·5 = <b>12,5 m</b>",
      "Es un resultado clásico: la altura mínima es 2,5 veces el radio del rizo."
    ]) +
    "<h5>Con rozamiento: ΔE<sub>m</sub> = W<sub>no cons</sub></h5>" +
    "<p>Cuando hay rozamiento (o resistencia del aire), la energía mecánica <b>disminuye</b>: el trabajo del rozamiento es negativo y es exactamente la energía mecánica que se pierde. Pero esa energía no desaparece: se transforma en <b>calor</b> (las superficies y el aire se calientan). La energía <b>total</b> (mecánica + calor) se conserva siempre; lo que se degrada es la parte útil. En un balance completo:</p>" +
    formula("E<sub>c,0</sub> + E<sub>p,0</sub> = E<sub>c</sub> + E<sub>p</sub> + Q      con      Q = |W<sub>roz</sub>|") +
    w("f12_rampa", "rampa") +
    ejemplo("Plano inclinado con rozamiento", "Un bloque desliza desde lo alto de un plano inclinado 30° de 5 m de longitud, con μ = 0,2. ¿Con qué velocidad llega abajo? ¿Y sin rozamiento? (g = 9,8 m/s²)", [
      "Altura: h = 5·sen 30° = 2,5 m. Sin rozamiento: v = √(2·9,8·2,5) = <b>7,0 m/s</b>",
      "Con rozamiento: W<sub>roz</sub> = −μ·m·g·cos 30°·L = −0,2·m·9,8·0,866·5 = −8,49·m (J, con m en kg)",
      "ΔE<sub>m</sub> = W<sub>roz</sub> → ½·m·v² − m·9,8·2,5 = −8,49·m → ½·v² = 24,5 − 8,49 = 16,01",
      "<b>v = 5,66 m/s</b> (se pierde el 35 % de la energía cinética)",
      "(La masa se simplifica: aparece en todos los términos.)"
    ]) +
    ejemplo("¿Cuánta energía se disipa en el aire?", "Una bola de 2 kg se deja caer desde 50 m y llega al suelo con 28 m/s. ¿Qué energía se disipó por el rozamiento con el aire?", [
      "E<sub>m,inicial</sub> = m·g·h = 2·9,8·50 = 980 J",
      "E<sub>m,final</sub> = ½·2·28² = 784 J",
      "ΔE<sub>m</sub> = W<sub>aire</sub> = 784 − 980 = −196 J → se disipan <b>196 J</b> en forma de calor (el 20 %)."
    ]) +
    "<h5>Energía y calor: la energía total siempre se conserva</h5>" +
    "<p>Que la energía mecánica «se pierda» con el rozamiento no viola ninguna ley: la energía se <b>transforma</b>, no desaparece. El trabajo del rozamiento calienta las superficies (el calor que sientes al frotarte las manos). Esta es la idea del <b>primer principio de la termodinámica</b> que se vio en el tema 6: la energía total de un sistema aislado es constante, y calor y trabajo son dos formas de intercambiar energía. El rozamiento es el mecanismo por el que el trabajo mecánico se convierte, irreversiblemente, en calor; el proceso inverso (que el calor de una superficie vuelva a ponerla en movimiento por sí solo) no ocurre jamás espontáneamente.</p>" +
    "<h5>Leer un diagrama de energía</h5>" +
    "<p>La conservación de la energía permite «leer» el movimiento de un cuerpo en una gráfica de energía potencial E<sub>p</sub>(x), como las del simulador de la montaña rusa. Dibuja la línea horizontal de la energía mecánica total E<sub>m</sub>: en cada posición, la distancia vertical entre esa línea y la curva E<sub>p</sub> es la energía cinética. Como E<sub>c</sub> no puede ser negativa, <b>el cuerpo sólo puede estar donde la curva E<sub>p</sub> queda por debajo de la línea E<sub>m</sub></b>. Los puntos donde se cruzan (E<sub>c</sub> = 0) son los <b>puntos de retorno</b>: allí el cuerpo se detiene un instante y vuelve atrás. En los mínimos de E<sub>p</sub> (fondos de valle) el cuerpo va más rápido y hay un <b>equilibrio estable</b>; en los máximos (cimas), el equilibrio es inestable, y si la energía total no supera la cima el cuerpo no puede pasar al otro lado.</p>" +
    ojo("el error clásico es <b>aplicar la conservación de la energía mecánica cuando hay rozamiento</b> sin incluir el trabajo del rozamiento. La pregunta clave es siempre: ¿hay alguna fuerza no conservativa (rozamiento, aire, motor, persona) haciendo trabajo? Si es que sí, escribe ΔE<sub>m</sub> = W<sub>no cons</sub>; si es que no, E<sub>m</sub> es constante. Otro fallo habitual es olvidar que h se mide <i>verticalmente</i>: en una rampa, la altura es L·sen θ, no la longitud L.");

  // ---------------------------------------------------------------- 5. Potencia
  secciones[4] =
    "<h5>Potencia media e instantánea</h5>" +
    "<p>Dos máquinas pueden realizar el mismo trabajo (transferir la misma energía) con una gran diferencia: el tiempo que tardan. La <b>potencia</b> es la magnitud que mide esa rapidez. La <b>potencia media</b> es el cociente entre el trabajo realizado (o la energía transferida) y el tiempo empleado:</p>" +
    formula("P = " + fr("W", "t") + " = " + fr("ΔE", "t")) +
    "<p>Su unidad en el SI es el <b>vatio</b> (W): 1 W = 1 J/s. Se usan también el kilovatio (1 kW = 1000 W), el megavatio (1 MW = 10⁶ W) y, en motores, el <b>caballo de vapor</b> (1 CV = 735,5 W, casi tres cuartos de kilovatio).</p>" +
    "<h5>La relación P = F·v</h5>" +
    "<p>Si una fuerza constante F actúa en la dirección del movimiento y el cuerpo se desplaza una distancia d en un tiempo t, el trabajo es W = F·d y la potencia P = F·d/t. Pero d/t es la velocidad, así que:</p>" +
    formula("P = F·v      (F paralela a v)") +
    "<p>Esta forma sirve también para la <b>potencia instantánea</b> cuando la velocidad cambia (con v la velocidad en ese instante). En general, con la fuerza formando un ángulo α con la velocidad, P = F·v·cos α. Es la forma de calcular la potencia que necesita un coche, un ciclista o un ascensor que se mueven a velocidad constante.</p>" +
    "<h5>Potencias de la vida real</h5>" +
    tabla(["Sistema", "Potencia", "Comentario"], [
      ["Bombilla LED", "9 W", "equivale a una incandescente de 60 W"],
      ["Persona en reposo", "≈ 80 W", "metabolismo basal: 1700 kcal al día"],
      ["Ciclista sostenido", "150–250 W", "con puntas de más de 1000 W en un esprint"],
      ["Microondas", "1,2 kW", "de energía eléctrica consumida"],
      ["Coche turismo", "70–100 kW", "95–135 CV"],
      ["Aerogenerador marino", "≈ 10 MW", "en condiciones óptimas"],
      ["Central nuclear", "≈ 1 GW", "= 10⁹ W"],
      ["Luz del Sol que llega a la Tierra", "1,7·10¹⁷ W", "más de 8 000 veces el consumo mundial de energía"]
    ]) +
    w("f12_potencia", "potencia") +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Subir una carga con una grúa", "Una grúa eleva un bloque de 200 kg a 10 m de altura en 20 s a velocidad constante. Calcula el trabajo y la potencia (g = 9,8 m/s²).", [
      "La fuerza de la grúa iguala al peso: F = 200·9,8 = 1960 N",
      "W = F·h = 1960·10 = <b>19 600 J</b>",
      "P = W/t = 19 600/20 = <b>980 W</b> (0,98 kW)"
    ]) +
    ejemplo("Potencia de un coche", "Un coche se mueve a 30 m/s (108 km/h) a velocidad constante. La fuerza total de resistencia (rozamiento y aire) es 700 N. ¿Qué potencia útil desarrolla el motor?", [
      "A velocidad constante la fuerza motriz iguala a la resistencia: F = 700 N",
      "P = F·v = 700·30 = 21 000 W = <b>21 kW</b>",
      "En caballos: 21 000/735,5 = <b>28,6 CV</b>"
    ]) +
    "<p>La resistencia del aire crece con el cuadrado de la velocidad, F<sub>aire</sub> ∝ v². Como P = F·v, la potencia necesaria para mantener una velocidad crece con el <b>cubo</b> de v: para ir a 120 km/h en vez de a 90 km/h hace falta 2,4 veces más potencia, a 150 km/h unas 4,6 veces más y a 180 km/h, ¡8 veces más!, sólo para vencer al aire. Por eso el consumo de combustible se dispara en autopista.</p>" +
    "<h5>Rendimiento</h5>" +
    "<p>Ninguna máquina real convierte toda la energía que recibe en trabajo útil: una parte se «pierde» (se disipa como calor por rozamiento, efecto Joule, etc.). El <b>rendimiento</b> mide la fracción aprovechada:</p>" +
    formula("η = " + fr("W<sub>útil</sub>", "W<sub>total</sub>") + " = " + fr("P<sub>útil</sub>", "P<sub>total</sub>") + "      (0 &lt; η &lt; 1; en % si se multiplica por 100)") +
    "<p>Siempre es menor que 1 (menos del 100 %): sería imposible lo contrario porque supondría crear energía. Si una máquina está formada por varias etapas encadenadas (una central térmica: caldera, turbina, alternador, red eléctrica…), el rendimiento total es el <b>producto</b> de los rendimientos de cada etapa: η = η₁·η₂·η₃…, y por eso el resultado global suele ser sorprendentemente pequeño.</p>" +
    w("f12_sankey", "sankey") +
    ejemplo("Rendimiento de un motor", "Un motor recibe una potencia de 2 kW y tiene un rendimiento del 75 %. ¿Qué potencia útil desarrolla? ¿Cuánto tarda en elevar un bloque de 150 kg a 12 m? (g = 9,8 m/s²)", [
      "P<sub>útil</sub> = η·P<sub>total</sub> = 0,75·2000 = <b>1500 W</b>",
      "W = m·g·h = 150·9,8·12 = 17 640 J",
      "t = W/P<sub>útil</sub> = 17 640/1500 = <b>11,76 s</b>",
      "La potencia que «se pierde» es 500 W, que se disipa como calor."
    ]) +
    ejemplo("Rendimiento de una cadena", "Una central térmica tiene una caldera-turbina con η₁ = 38 %, un alternador con η₂ = 92 % y una red de transporte con η₃ = 85 %. ¿Qué fracción de la energía del combustible llega al consumidor?", [
      "η = 0,38·0,92·0,85 = <b>0,297 ≈ 29,7 %</b>",
      "Más de dos tercios de la energía del combustible se disipa como calor por el camino."
    ]) +
    ojo("el <b>kilovatio-hora</b> (kWh) no es una unidad de potencia, sino de <b>energía</b>: es la energía que consume un aparato de 1 kW durante 1 hora, 1 kWh = 1000 W·3600 s = 3,6·10⁶ J. «Potencia» y «energía» no son lo mismo: la factura de la luz cobra energía (kWh), mientras que lo que figura en la etiqueta de un aparato (W) es su potencia. Y el rendimiento no tiene unidades: es un cociente entre dos magnitudes de la misma clase.");

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Método para resolver problemas de energía",
      html:
        "<p>Los problemas de este tema parecen muy distintos entre sí (rampas, muelles, motores, péndulos…), pero casi todos se resuelven eligiendo bien entre cuatro herramientas. Lo primero es leer qué te piden y qué hay en el enunciado:</p>" +
        tabla(["Si el problema…", "Usa…", "Ecuación"], [
          ["pide un trabajo concreto de una fuerza constante", "definición de trabajo", "W = F·d·cos α  (α entre F y el desplazamiento)"],
          ["tiene una fuerza variable (gráfica o muelle)", "área bajo la curva F–x", "W = ½·k·x² para un muelle"],
          ["pide una velocidad (o una distancia) y actúan fuerzas externas o rozamiento", "teorema del trabajo y la energía", "W<sub>neto</sub> = ΔE<sub>c</sub>"],
          ["pide v o h entre dos puntos y no hay rozamiento ni motor", "conservación de la energía mecánica", "E<sub>c,0</sub> + E<sub>p,0</sub> = E<sub>c</sub> + E<sub>p</sub>"],
          ["pide v o h con rozamiento, aire o un motor", "variación de la energía mecánica", "ΔE<sub>m</sub> = W<sub>no cons</sub>"],
          ["pide cuánto calor se disipa", "balance de energía", "Q = |W<sub>roz</sub>| = −ΔE<sub>m</sub>"],
          ["pide un tiempo, una rapidez o un consumo", "potencia y rendimiento", "P = W/t = F·v · η = P<sub>útil</sub>/P<sub>total</sub>"]
        ]) +
        "<h5>Los diez pasos que evitan casi todos los errores</h5>" +
        "<ol><li><b>Dibuja</b> la situación y marca los dos instantes entre los que vas a comparar (<i>inicial</i> y <i>final</i>).</li>" +
        "<li><b>Escribe los datos</b> con unidades y pásalos al SI (km/h → m/s dividiendo entre 3,6; cm → m; kW → W).</li>" +
        "<li>Elige el <b>nivel de referencia</b> de la energía potencial (lo normal: el punto más bajo) y úsalo en los dos instantes.</li>" +
        "<li><b>Lista las fuerzas</b> que actúan y decide cuáles hacen trabajo: las perpendiculares al movimiento (normal, tensión) no lo hacen.</li>" +
        "<li><b>Elige el principio</b> según la tabla de arriba: ¿hay rozamiento o fuerzas externas?</li>" +
        "<li>Escribe la <b>ecuación general</b> con letras antes de sustituir y <b>simplifica la masa</b> si aparece en todos los términos.</li>" +
        "<li>Sustituye <b>con los signos</b>: el trabajo del rozamiento es negativo, la energía potencial por debajo de la referencia es negativa.</li>" +
        "<li>Despeja y calcula. Cuidado con la raíz cuadrada: al final aparece <b>v</b>, no v².</li>" +
        "<li>Comprueba las <b>unidades</b> (J, m/s, W…) y el <b>signo</b> del resultado.</li>" +
        "<li>Comprueba el <b>orden de magnitud</b> y el sentido físico: ¿la velocidad con rozamiento es menor que sin rozamiento? ¿la altura sale positiva?</li></ol>" +
        "<h5>El mismo problema por dos caminos</h5>" +
        "<p>Resolver un problema por dos métodos distintos es la mejor manera de comprobar un resultado. Un bloque desliza por un plano inclinado 30° y de 5 m de longitud, con μ = 0,2. ¿Con qué velocidad llega abajo?</p>" +
        ejemplo("Método 1: dinámica y cinemática (temas 8–10)", "Fuerzas a lo largo del plano: m·g·sen 30° (hacia abajo) y μ·m·g·cos 30° (hacia arriba).", [
          "m·a = m·g·sen 30° − μ·m·g·cos 30° → a = 9,8·(0,5 − 0,2·0,866) = 3,20 m/s²",
          "v² = 2·a·L = 2·3,20·5 = 32,0 → <b>v = 5,66 m/s</b>"
        ]) +
        ejemplo("Método 2: energía (este tema)", "Teorema del trabajo y la energía: W<sub>neto</sub> = W<sub>peso</sub> + W<sub>roz</sub> = ΔE<sub>c</sub>.", [
          "W<sub>peso</sub> = m·g·L·sen 30° = m·24,5 · W<sub>roz</sub> = −0,2·m·9,8·0,866·5 = −m·8,49",
          "½·m·v² = m·(24,5 − 8,49) → v² = 32,0",
          "<b>v = 5,66 m/s</b> ✓ El mismo resultado; ahora sin calcular la aceleración."
        ]) +
        "<p>Las dos vías coinciden. La energética es más corta cuando no te piden el tiempo, y se generaliza sin esfuerzo a trayectorias curvas, donde la aceleración cambia en cada punto.</p>" +
        ojo("no mezcles: si usas la conservación E<sub>m</sub> = constante, <b>no</b> añadas además el trabajo de las fuerzas conservativas (ya está incluido en E<sub>p</sub>); y si usas W<sub>neto</sub> = ΔE<sub>c</sub>, <b>no</b> incluyas E<sub>p</sub> (el trabajo del peso ya aparece en W<sub>neto</sub>). Escoge un lenguaje y usa sólo ese: <i>o</i> «peso como trabajo», <i>o</i> «peso como energía potencial».")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. El trabajo de cada fuerza: peso, normal, rozamiento, muelle y fuerzas oblicuas",
      html:
        "<p>Para resolver los problemas conviene tener a mano cuánto vale el trabajo de cada fuerza típica. El desplazamiento d se mide a lo largo de la trayectoria (para fuerzas constantes como el peso solo importan los puntos inicial y final; para el rozamiento, la longitud del camino).</p>" +
        tabla(["Fuerza", "Trabajo", "Notas"], [
          ["Peso (movimiento vertical)", "W = −m·g·Δh", "Δh = h<sub>final</sub> − h<sub>inicial</sub>: negativo al subir, positivo al bajar; no depende del camino"],
          ["Peso en un plano inclinado (bajando L)", "W = m·g·L·sen θ", "α = 90° − θ con el desplazamiento: cos(90° − θ) = sen θ"],
          ["Normal en una superficie fija", "W = 0", "perpendicular al desplazamiento"],
          ["Rozamiento cinético", "W = −μ·N·d", "N = m·g en suelo horizontal; N = m·g·cos θ en plano inclinado; N = m·g − F·sen α si una fuerza oblicua tira hacia arriba"],
          ["Muelle", "W = −(½·k·x<sub>f</sub>² − ½·k·x<sub>i</sub>²)", "= −ΔE<sub>p,el</sub>; positivo cuando el muelle vuelve hacia su longitud natural"],
          ["Tensión de una cuerda (péndulo)", "W = 0", "siempre perpendicular a la trayectoria circular"],
          ["Fuerza aplicada oblicua", "W = F·d·cos α", "sólo cuenta F·cos α; la componente F·sen α modifica la normal"],
          ["Resistencia del aire", "W &lt; 0", "depende de v y del camino; en el Bachillerato suele darse como dato (energía disipada)"]
        ]) +
        "<h5>Una fuerza oblicua que cambia la normal</h5>" +
        "<p>Cuando tiras de una caja con una cuerda inclinada hacia arriba, parte de tu fuerza «levanta» la caja: la normal se hace <b>menor</b> que el peso, y con ella el rozamiento. Es un detalle que se pasa por alto en muchos problemas y que cambia el resultado.</p>" +
        ejemplo("Cuerda inclinada con rozamiento", "Se arrastra una caja de 10 kg una distancia de 10 m sobre un suelo horizontal tirando de una cuerda con una fuerza de 60 N que forma 30° con la horizontal. El coeficiente de rozamiento es μ = 0,2. Calcula el trabajo de cada fuerza, el trabajo neto y la velocidad final si parte del reposo (g = 9,8 m/s²).", [
          "Vertical: N + F·sen 30° = m·g → N = 98 − 60·0,5 = <b>68 N</b> (menor que el peso)",
          "Rozamiento: F<sub>r</sub> = 0,2·68 = 13,6 N → W<sub>Fr</sub> = −13,6·10 = <b>−136 J</b>",
          "Fuerza aplicada: W<sub>F</sub> = 60·10·cos 30° = <b>519,6 J</b>",
          "Peso y normal: perpendiculares al desplazamiento → <b>0 J</b>",
          "W<sub>neto</sub> = 519,6 − 136 = <b>383,6 J</b>",
          "Teorema: ½·10·v² = 383,6 → v² = 76,7 → <b>v = 8,76 m/s</b>"
        ]) +
        "<h5>Subir y bajar un plano con rozamiento</h5>" +
        ejemplo("Hacia arriba y de vuelta", "Se lanza un bloque con v₀ = 10 m/s hacia arriba por un plano inclinado 37° (sen 37° = 0,6; cos 37° = 0,8) con μ = 0,25. ¿Hasta dónde sube? ¿Con qué velocidad vuelve al punto de partida?", [
          "Subida: al subir, el peso (m·g·sen 37° = 0,6·m·g) y el rozamiento (μ·m·g·cos 37° = 0,2·m·g) frenan. Teorema: −(0,6 + 0,2)·m·g·d = 0 − ½·m·v₀²",
          "d = v₀²/(2·g·0,8) = 100/(2·9,8·0,8) = <b>6,38 m</b>",
          "¿Se queda parado arriba? Como tan 37° = 0,75 &gt; μ = 0,25, el rozamiento estático máximo no puede sujetarlo: <b>vuelve a bajar</b>.",
          "Bajada: (0,6 − 0,2)·m·g·d = ½·m·v² → v² = 2·9,8·0,4·6,38 = 50,0 → <b>v = 7,07 m/s</b> (menor que los 10 m/s iniciales: el rozamiento ha disipado energía en el viaje de ida y vuelta)"
        ]) +
        "<h5>Un muelle y un suelo rugoso</h5>" +
        ejemplo("Hasta dónde llega", "Un bloque de 1 kg comprime 20 cm un muelle de k = 400 N/m sobre un suelo con μ = 0,3, y se suelta. Suponiendo que se separa del muelle cuando éste recupera su longitud natural, ¿qué distancia recorre aún hasta pararse? (Desprecia el rozamiento durante los 20 cm de empuje.)", [
          "Energía almacenada: ½·400·0,2² = <b>8 J</b>",
          "Rozamiento: F<sub>r</sub> = μ·m·g = 0,3·1·9,8 = 2,94 N",
          "Toda la energía se disipa en el rozamiento: 8 = 2,94·d → <b>d = 2,72 m</b>"
        ]) +
        "<p>La energía almacenada en el muelle se ha convertido en <b>calor</b> en el suelo y en el bloque: 8 J disipados. Un trabajo parecido, pero con el signo cambiado, hace el muelle de un amortiguador.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. La energía en la vida real: unidades, alimentos, combustibles y la factura de la luz",
      html:
        "<p>El julio es la unidad del SI, pero en la vida real se usan muchas otras según el contexto. Conocer sus equivalencias es útil para no confundirse en un examen y para entender la factura de la luz, las etiquetas de los alimentos o los precios de la gasolina.</p>" +
        tabla(["Unidad", "Equivalencia en julios", "Dónde se usa"], [
          ["julio (J)", "1 J", "unidad del SI: 1 N·m = 1 W·s"],
          ["kilojulio (kJ) · megajulio (MJ)", "10³ J · 10⁶ J", "etiquetas de alimentos (kJ), combustibles (MJ)"],
          ["caloría (cal)", "4,184 J", "energía para calentar 1 g de agua 1 °C (aprox.)"],
          ["kilocaloría (kcal)", "4184 J", "«calorías» de los alimentos"],
          ["kilovatio-hora (kWh)", "3,6·10⁶ J", "la factura de la luz"],
          ["electronvoltio (eV)", "1,602·10⁻¹⁹ J", "física atómica y de partículas"],
          ["caballo de vapor (CV)", "735,5 W (es potencia)", "motores de coches y motos"]
        ]) +
        w("f12_unidades", "unidades") +
        "<h5>La factura de la luz</h5>" +
        "<p>La compañía eléctrica cobra la <b>energía</b> consumida (en kWh), no la potencia: E = P·t, con P en kW y t en horas. Si el precio es de 0,15 €/kWh (valor orientativo):</p>" +
        tabla(["Aparato", "Potencia", "Uso", "Energía al mes", "Coste al mes"], [
          ["Bombilla LED", "9 W", "5 h al día", "1,35 kWh", "0,20 €"],
          ["Televisor", "100 W", "4 h al día", "12 kWh", "1,80 €"],
          ["Nevera", "150 W", "8 h al día de funcionamiento del motor", "36 kWh", "5,40 €"],
          ["Microondas", "1200 W", "30 min al día", "18 kWh", "2,70 €"],
          ["Radiador eléctrico", "2000 W", "4 h al día", "240 kWh", "36,00 €"]
        ]) +
        "<p>(Mes de 30 días.) El radiador consume más que todos los demás juntos, no por el tiempo sino porque su potencia es enorme. Es importante entender que un kWh es la energía de un aparato de <b>1 kW durante 1 hora</b>: puede ser una estufa de 1000 W una hora o una bombilla de 10 W durante cien horas.</p>" +
        ejemplo("Coste de una bombilla", "Una bombilla de 60 W está encendida 5 horas. ¿Cuántos kWh consume y cuánto cuesta (0,15 €/kWh)? ¿Cuántos julios son?", [
          "E = P·t = 0,060 kW·5 h = <b>0,3 kWh</b>",
          "Coste: 0,3·0,15 = <b>0,045 €</b> (4,5 céntimos)",
          "En julios: 0,3·3,6·10⁶ = <b>1,08·10⁶ J</b>"
        ]) +
        "<h5>Energía en los alimentos</h5>" +
        "<p>Los alimentos son «combustibles» para el cuerpo. Una barrita energética de 200 kcal contiene 200·4184 = 836 800 J (837 kJ). Si el cuerpo pudiera transformar toda esa energía en trabajo mecánico, una persona de 70 kg podría subir 837 000/(70·9,8) = 1220 m de desnivel. En realidad, el rendimiento de los músculos es de alrededor del 25 %: el resto se disipa como calor (por eso te acaloras al hacer deporte), y la barrita da para unos 305 m de desnivel.</p>" +
        tabla(["Combustible o reserva", "Energía por kg", "Comentario"], [
          ["Gasolina", "≈ 46 MJ/kg (34 MJ/L)", "9,4 kWh por litro"],
          ["Grasa corporal", "≈ 37 MJ/kg (9 kcal/g)", "la reserva más densa del cuerpo"],
          ["Carbón", "≈ 24 MJ/kg", "central térmica"],
          ["Glúcidos (azúcar, pan)", "≈ 17 MJ/kg (4 kcal/g)", "energía rápida"],
          ["Madera seca", "≈ 15 MJ/kg", "leña"],
          ["Batería de ion-litio", "≈ 0,9 MJ/kg (250 Wh/kg)", "50 veces menos que la gasolina por kg"],
          ["TNT", "≈ 4,2 MJ/kg", "base de la unidad «tonelada de TNT» = 4,184·10⁹ J"]
        ]) +
        ejemplo("¿Cuánta gasolina cuesta acelerar un coche?", "Un coche de 1000 kg se acelera desde el reposo hasta 100 km/h (27,8 m/s). El motor tiene un rendimiento del 30 %. Cada litro de gasolina contiene 34 MJ. ¿Qué cantidad de gasolina se gasta sólo en dar esa energía cinética?", [
          "E<sub>c</sub> = ½·1000·27,8² = 386 kJ",
          "Energía que hay que quemar: 386/0,30 = 1286 kJ = 1,29 MJ",
          "Gasolina: 1,29 MJ/34 MJ/L = <b>0,038 L (38 mL)</b>, apenas un chupito.",
          "(En carretera se gasta mucho más porque el rozamiento y el aire consumen la energía continuamente.)"
        ]) +
        "<h5>Fuentes de energía y rendimiento global</h5>" +
        "<p>Del combustible fósil a la bombilla del salón, la energía pasa por una cadena de transformaciones, cada una con su rendimiento. La conclusión es que, aun con tecnología avanzada, <b>la mayor parte de la energía primaria se disipa</b> como calor antes de llegar al usuario. Las renovables (solar fotovoltaica, eólica, hidráulica) evitan el combustible, pero tampoco tienen un rendimiento del 100 %: un panel solar convierte un 20 % de la luz en electricidad, un aerogenerador como mucho el 45–50 % de la energía del viento (límite de Betz: 59 %) y una central hidroeléctrica cerca del 85–90 %.</p>" +
        ejemplo("Una central hidroeléctrica", "Una central recibe un caudal de 50 m³/s de agua que cae desde una altura de 80 m. El rendimiento total es del 85 %. ¿Qué potencia eléctrica genera? (ρ<sub>agua</sub> = 1000 kg/m³, g = 9,8 m/s²)", [
          "Masa de agua por segundo: 50 m³/s·1000 kg/m³ = 5·10⁴ kg/s",
          "Potencia hidráulica: P = m·g·h/t = 5·10⁴·9,8·80 = 3,92·10⁷ W = 39,2 MW",
          "Potencia eléctrica: 0,85·39,2 = <b>33,3 MW</b> (suficiente para unas 30 000 viviendas)"
        ])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Seis problemas tipo examen (PAU) resueltos paso a paso",
      html:
        "<p>Estos seis problemas tienen el formato de los de las pruebas de acceso a la universidad. Intenta resolver cada uno por tu cuenta antes de leer la solución. Usa g = 9,8 m/s² salvo que se indique otra cosa.</p>" +
        "<h5>Problema 1 · Empujar, soltar y parar</h5>" +
        ejemplo("Un bloque sobre un suelo rugoso", "Un bloque de 2 kg está en reposo sobre un suelo horizontal con μ = 0,2. Se le empuja con una fuerza horizontal constante de 10 N durante 4 m y después se deja de empujar. (a) ¿Qué energía cinética y qué velocidad tiene al soltarlo? (b) ¿Cuánto más recorre hasta pararse?", [
          "(a) W<sub>F</sub> = 10·4 = 40 J. Rozamiento: F<sub>r</sub> = 0,2·2·9,8 = 3,92 N → W<sub>Fr</sub> = −3,92·4 = −15,68 J",
          "E<sub>c</sub> = W<sub>neto</sub> = 40 − 15,68 = <b>24,32 J</b> → v = √(2·24,32/2) = <b>4,93 m/s</b>",
          "(b) Sin empujar, sólo frena el rozamiento: 0 − 24,32 = −3,92·d<sub>2</sub> → <b>d<sub>2</sub> = 6,20 m</b>",
          "Comprobación global: todo el trabajo de F (40 J) se disipa en el rozamiento a lo largo de d = 10,2 m: 3,92·10,2 = 40 J ✓"
        ]) +
        "<h5>Problema 2 · Montaña rusa con rizo</h5>" +
        ejemplo("Un carrito de 300 kg", "Un carrito de 300 kg parte del reposo desde un punto A situado a 20 m de altura. Después de bajar, entra en un rizo circular de radio 6 m cuyo punto más bajo está a nivel del suelo. Sin rozamiento. (a) Velocidad al pasar por el punto B, a 5 m de altura. (b) Velocidad en el punto más alto del rizo. (c) Fuerza que hace el carril sobre el carrito en ese punto.", [
          "(a) m·g·(20 − 5) = ½·m·v<sub>B</sub>² → v<sub>B</sub> = √(2·9,8·15) = <b>17,1 m/s</b>",
          "(b) La cima del rizo está a 2R = 12 m: m·g·(20 − 12) = ½·m·v² → v² = 2·9,8·8 = 156,8 → <b>v = 12,5 m/s</b>",
          "(c) En la cima, la normal y el peso apuntan hacia el centro: N + m·g = m·v²/R → N = 300·(156,8/6 − 9,8) = 300·16,33 = <b>4900 N</b>",
          "¿Se despega? No: N &gt; 0. La altura mínima para completar el rizo sería 2,5·R = 15 m &lt; 20 m ✓"
        ]) +
        "<h5>Problema 3 · Muelle y rozamiento</h5>" +
        ejemplo("Un bloque lanzado por un muelle", "Un bloque de 0,5 kg se apoya contra un muelle de k = 300 N/m comprimido 10 cm sobre una superficie horizontal. Se suelta. (a) ¿Con qué velocidad sale del muelle (sin rozamiento durante el empuje)? (b) Si después recorre una zona rugosa con μ = 0,25, ¿cuánto recorre hasta pararse?", [
          "(a) ½·300·0,1² = ½·0,5·v² → 1,5 = 0,25·v² → v² = 6 → <b>v = 2,45 m/s</b>",
          "(b) Toda la energía de 1,5 J se disipa por rozamiento: 1,5 = 0,25·0,5·9,8·d = 1,225·d → <b>d = 1,22 m</b>"
        ]) +
        "<h5>Problema 4 · Potencia en una cuesta</h5>" +
        ejemplo("Un coche subiendo", "Un coche de 1200 kg sube a 72 km/h constantes por una carretera de pendiente 5 % (se toma sen α ≈ 0,05). La fuerza de resistencia (rozamiento y aire) es de 500 N. (a) ¿Qué fuerza motriz necesita? (b) ¿Qué potencia útil desarrolla el motor, en kW y en CV? (c) Si el rendimiento del motor es del 30 % y la gasolina contiene 34 MJ/L, ¿cuántos litros gasta por cada 100 km?", [
          "(a) A velocidad constante, la fuerza neta es nula: F = F<sub>resist</sub> + m·g·sen α = 500 + 1200·9,8·0,05 = 500 + 588 = <b>1088 N</b>",
          "(b) v = 72/3,6 = 20 m/s → P = F·v = 1088·20 = 21 760 W = <b>21,8 kW = 29,6 CV</b>",
          "(c) Potencia que se quema: 21 760/0,30 = 72 533 W → en 1 hora: 72 533·3600 = 2,61·10⁸ J = 261 MJ → 7,68 L/h",
          "100 km a 72 km/h son 100/72 = 1,39 h → 7,68·1,39 = <b>10,7 L por cada 100 km</b>"
        ]) +
        "<h5>Problema 5 · Rampa y tramo horizontal</h5>" +
        ejemplo("Un bloque de 4 kg", "Un bloque de 4 kg se deja deslizar desde el reposo por un plano inclinado 37° (sen 37° = 0,6; cos 37° = 0,8) desde una altura de 3 m, con μ = 0,3. Al terminar el plano sigue por un suelo horizontal con el mismo μ. (a) Velocidad al final del plano. (b) Calor disipado en el plano. (c) Distancia que recorre en el suelo hasta pararse.", [
          "Longitud del plano: L = h/sen 37° = 3/0,6 = 5 m",
          "(a) a = g·(sen 37° − μ·cos 37°) = 9,8·(0,6 − 0,24) = 3,528 m/s² → v² = 2·3,528·5 = 35,28 → <b>v = 5,94 m/s</b>",
          "(b) Q = μ·m·g·cos 37°·L = 0,3·4·9,8·0,8·5 = <b>47,0 J</b>",
          "Comprobación: E<sub>p</sub> inicial = 4·9,8·3 = 117,6 J = E<sub>c</sub> (70,56 J) + Q (47,04 J) ✓",
          "(c) En el suelo: 70,56 = μ·m·g·d = 0,3·4·9,8·d = 11,76·d → <b>d = 6,0 m</b>"
        ]) +
        "<h5>Problema 6 · Lanzamiento oblicuo y energía</h5>" +
        ejemplo("Una pelota lanzada con ángulo", "Una pelota de 0,2 kg se lanza desde el suelo con v₀ = 20 m/s formando 40° con la horizontal. Sin rozamiento. (a) Altura máxima. (b) Velocidad cuando está a 5 m de altura. (c) Energía cinética en el punto más alto.", [
          "(a) En el punto más alto sólo queda la componente horizontal: v<sub>x</sub> = 20·cos 40° = 15,32 m/s. Conservación: ½·v₀² = ½·v<sub>x</sub>² + g·h → h = (400 − 234,7)/(2·9,8) = <b>8,43 m</b>",
          "(b) A 5 m: ½·v₀² = ½·v² + g·5 → v² = 400 − 2·9,8·5 = 302 → <b>v = 17,4 m/s</b> (no depende del ángulo, sólo de la altura)",
          "(c) E<sub>c</sub> = ½·0,2·15,32² = <b>23,5 J</b> (de los 40 J iniciales; los 16,5 J restantes son E<sub>p</sub> = 0,2·9,8·8,43)"
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Un poco de historia: de la «fuerza viva» a la conservación de la energía",
      html:
        "<p>El concepto de energía, hoy central en toda la ciencia, tardó siglos en madurar. Aquí algunos de los pasos clave:</p>" +
        tabla(["Quién", "Cuándo", "Aportación"], [
          ["Leibniz", "1686", "Propone la «vis viva» (fuerza viva) m·v² como medida de la capacidad de un cuerpo en movimiento, frente a la «cantidad de movimiento» m·v de Descartes. Una larga polémica."],
          ["Watt", "hacia 1780", "Perfecciona la máquina de vapor; para vender sus máquinas compara su rendimiento con el de los caballos: nace el «caballo de vapor». La unidad de potencia lleva su nombre."],
          ["Coriolis", "1829", "Da el nombre de «trabajo» a la fuerza por la distancia y propone el factor ½: la energía cinética es ½·m·v²."],
          ["Mayer", "1842", "Afirma que calor y trabajo son manifestaciones de lo mismo y estima el equivalente mecánico del calor."],
          ["Joule", "1840–1850", "Mide con precisión el equivalente mecánico del calor con su experimento de la rueda de paletas (1 cal ≈ 4,18 J). La unidad de energía lleva su nombre."],
          ["Helmholtz", "1847", "Formula con rigor la conservación de la energía como principio universal."],
          ["Noether", "1918", "Demuestra que la conservación de la energía es consecuencia de que las leyes de la física no cambian con el tiempo (simetría de traslación temporal)."]
        ]) +
        "<h5>El experimento de Joule</h5>" +
        "<p>Joule hizo caer unas pesas que, mediante poleas, hacían girar unas paletas dentro de un recipiente con agua. Las pesas perdían energía potencial (m·g·h); el agua se calentaba. Midiendo la subida de temperatura (muy pequeña, de décimas de grado) y comparándola con la energía potencial perdida, comprobó que <b>siempre hacía falta el mismo trabajo para producir una caloría</b>: unos 4,18 J. Ese resultado muestra que el rozamiento transforma la energía mecánica en calor, sin pérdida, y que calor y trabajo son dos formas de transferir energía, la idea que sustenta el primer principio de la termodinámica.</p>" +
        "<h5>¿Qué es la energía?</h5>" +
        "<p>Richard Feynman dijo que «no sabemos qué es la energía»: lo que sí sabemos es que existe una cantidad numérica (la suma de las energías de todas las formas) que <b>nunca cambia</b> en un sistema aislado, por mucho que el sistema se transforme. La energía no se crea ni se destruye, sólo se transforma y se transfiere. En este tema has visto tres formas (cinética, potencial gravitatoria y elástica) y la «forma degradada» (calor); en los temas de termoquímica viste otras (energía química y enlace); en física de partículas y relatividad, la masa misma es una forma de energía (E = m·c²).</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y piensa por qué es un error.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, un juego de parejas, una clasificación de problemas por el método que usarías y un ejercicio para ordenar los pasos de un problema típico.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "emp1") + w("clasificar", "cla1") + w("orden", "orden1")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula el trabajo de la normal al empujar una caja sobre el suelo horizontal como W = N·d, con N = m·g. ¿Qué falla?",
          op: ["Nada", "La normal es perpendicular al desplazamiento (α = 90°, cos 90° = 0): su trabajo es <b>nulo</b>", "Debería usar el peso", "La normal siempre hace trabajo negativo"], ok: 1,
          porque: "W = N·d·cos 90° = 0. Sólo cuenta la componente de la fuerza en la dirección del movimiento." },
        { q: "«Si sostengo una mochila de 10 kg quieta durante 10 minutos hago un trabajo enorme, porque me canso.» ¿Qué falla?",
          op: ["Nada", "En física el trabajo exige desplazamiento: si d = 0, W = 0 sobre la mochila (el cansancio es consumo de energía química muscular)", "Falta multiplicar por el tiempo", "El trabajo se mide en newtons"], ok: 1,
          porque: "W = F·d·cos α con d = 0 da cero. Los músculos sí gastan energía, pero no hacen trabajo mecánico sobre la mochila." },
        { q: "Para calcular el trabajo que acelera un coche de 10 a 20 m/s, un alumno escribe W = ½·m·(20 − 10)². ¿Qué falla?",
          op: ["Nada", "La variación es ΔE<sub>c</sub> = ½·m·(20² − 10²), no ½·m·(20 − 10)²", "Debería usar m·g·h", "Falta dividir por el tiempo"], ok: 1,
          porque: "La energía cinética depende de v²: ΔE<sub>c</sub> = ½·m·(v² − v₀²). Con m = 1000 kg son 150 kJ, no 50 kJ." },
        { q: "Un bloque desliza por una rampa con rozamiento y el alumno plantea m·g·h = ½·m·v². ¿Qué falla?",
          op: ["Nada", "Con rozamiento la energía mecánica no se conserva: hay que usar ΔE<sub>m</sub> = W<sub>roz</sub> (parte de m·g·h se disipa como calor)", "Debe usar la fuerza centrípeta", "La masa no se puede cancelar nunca"], ok: 1,
          porque: "El rozamiento es no conservativo: m·g·h = ½·m·v² + |W<sub>roz</sub>|, así que la velocidad real es menor que √(2gh)." },
        { q: "Un plano inclinado mide 5 m de largo y forma 30° con la horizontal. Un alumno calcula E<sub>p</sub> = m·g·5. ¿Qué falla?",
          op: ["Nada", "h es la altura vertical: h = 5·sen 30° = 2,5 m", "La energía potencial no depende de la altura", "Debe usar cos 30°"], ok: 1,
          porque: "La energía potencial depende de la altura vertical sobre el nivel de referencia, no de la longitud del recorrido." },
        { q: "«Mi factura dice que he consumido 250 kW·h: ¡mi aparato tiene una potencia de 250 kWh!» ¿Qué falla?",
          op: ["Nada", "El kWh es una unidad de <b>energía</b> (potencia × tiempo), no de potencia", "El kW·h es una unidad de fuerza", "1 kWh = 1000 W"], ok: 1,
          porque: "1 kWh = 1000 W·3600 s = 3,6·10⁶ J: es la energía de un aparato de 1 kW funcionando 1 h." },
        { q: "«Para que un coche vaya al doble de velocidad basta con el doble de energía.» ¿Qué falla?",
          op: ["Nada", "E<sub>c</sub> ∝ v²: duplicar la velocidad exige <b>cuatro veces</b> más energía", "Hace falta la mitad", "Hace falta ocho veces más"], ok: 1,
          porque: "E<sub>c</sub> = ½·m·v². Si v se multiplica por 2, E<sub>c</sub> se multiplica por 4." },
        { q: "Una instalación tiene tres etapas, cada una con un rendimiento del 90 %. Un alumno dice que el rendimiento total es del 90 %. ¿Qué falla?",
          op: ["Nada", "Los rendimientos se multiplican: 0,9·0,9·0,9 = 0,729 = 72,9 %", "Se suman: 270 %", "Es el 30 %"], ok: 1,
          porque: "Cada etapa recibe sólo lo que dejó la anterior: η = η₁·η₂·η₃." },
        { q: "«Un camión pesado (2000 kg) necesita el doble de distancia para frenar que un coche (1000 kg) a la misma velocidad y con los mismos neumáticos.» ¿Qué falla?",
          op: ["Nada", "d = v²/(2μg) no depende de la masa: ambos necesitan la misma distancia", "El camión frena en la mitad", "Depende sólo del tiempo"], ok: 1,
          porque: "La energía cinética es doble, pero la fuerza de rozamiento también (μ·m·g): la masa se cancela." },
        { q: "«Un libro tiene energía potencial negativa, ¡eso es imposible!» ¿Qué falla?",
          op: ["Nada", "E<sub>p</sub> = m·g·h es negativa si el cuerpo está por <b>debajo</b> del nivel de referencia elegido; sólo importan las diferencias", "La energía nunca puede ser negativa", "La masa debe ser negativa"], ok: 1,
          porque: "El cero de E<sub>p</sub> es una convención. El resultado físico (ΔE<sub>p</sub>) no depende de ella." },
        { q: "Un alumno calcula el trabajo del peso al subir una caja de 10 kg 5 m y obtiene +490 J. ¿Qué falla?",
          op: ["Nada", "Al subir, el peso se opone al desplazamiento: W = −m·g·h = −490 J", "El peso nunca hace trabajo", "Debería dar 0 J"], ok: 1,
          porque: "El peso apunta hacia abajo y el desplazamiento hacia arriba (α = 180°): trabajo negativo. La energía potencial aumenta en 490 J." }
      ]
    },
    quiz1: {
      titulo: "Test del tema 12",
      intro: "Doce preguntas. Elige la respuesta correcta; después lee la explicación.",
      preguntas: [
        { q: "El trabajo se mide en…", op: ["julios", "newtons", "vatios", "kg·m/s"], ok: 0, porque: "1 J = 1 N·m. El vatio es J/s (potencia)." },
        { q: "Una fuerza de 10 N forma 60° con un desplazamiento de 4 m. El trabajo vale…", op: ["20 J", "40 J", "34,6 J", "0 J"], ok: 0, porque: "W = 10·4·cos 60° = 40·0,5 = 20 J." },
        { q: "Una fuerza perpendicular al desplazamiento realiza un trabajo…", op: ["nulo", "máximo", "negativo", "igual a F·d"], ok: 0, porque: "cos 90° = 0." },
        { q: "La energía cinética de un cuerpo de 2 kg que se mueve a 3 m/s es…", op: ["9 J", "6 J", "18 J", "3 J"], ok: 0, porque: "½·2·3² = 9 J." },
        { q: "Si se triplica la velocidad de un cuerpo, su energía cinética se multiplica por…", op: ["9", "3", "6", "27"], ok: 0, porque: "E<sub>c</sub> ∝ v²: 3² = 9." },
        { q: "La energía potencial gravitatoria de 3 kg a 5 m de altura (g = 9,8 m/s²) es…", op: ["147 J", "15 J", "29,4 J", "73,5 J"], ok: 0, porque: "m·g·h = 3·9,8·5 = 147 J." },
        { q: "La energía mecánica de un cuerpo se conserva cuando…", op: ["sólo hacen trabajo fuerzas conservativas", "no hay fuerzas", "la velocidad es constante siempre", "hay rozamiento"], ok: 0, porque: "W<sub>no cons</sub> = ΔE<sub>m</sub>: si es nulo, E<sub>m</sub> es constante." },
        { q: "Un cuerpo cae libremente desde 5 m (g = 10 m/s²). Llega al suelo con…", op: ["10 m/s", "5 m/s", "50 m/s", "25 m/s"], ok: 0, porque: "v = √(2·10·5) = 10 m/s." },
        { q: "El trabajo del rozamiento cinético es siempre…", op: ["negativo", "positivo", "nulo", "igual a la energía cinética"], ok: 0, porque: "El rozamiento se opone al movimiento: α = 180°." },
        { q: "1 kWh equivale a…", op: ["3,6·10⁶ J", "3600 J", "10³ J", "3,6 J"], ok: 0, porque: "1000 W·3600 s = 3,6·10⁶ J." },
        { q: "Un motor de 500 W funciona durante 10 s. El trabajo que realiza es…", op: ["5000 J", "50 J", "500 J", "0,5 J"], ok: 0, porque: "W = P·t = 500·10 = 5000 J." },
        { q: "El rendimiento de una máquina se define como…", op: ["P<sub>útil</sub>/P<sub>total</sub>", "P<sub>total</sub>/P<sub>útil</sub>", "P<sub>útil</sub> − P<sub>total</sub>", "P<sub>útil</sub>·t"], ok: 0, porque: "η = P<sub>útil</sub>/P<sub>total</sub> y siempre es menor que 1." }
      ]
    },
    tj1: {
      titulo: "Trabajo, energía y potencia",
      cartas: [
        { a: "Trabajo de una fuerza constante", b: "W = F·d·cos α (J). α es el ángulo entre F y el desplazamiento. 1 J = 1 N·m. Escalar con signo." },
        { a: "Signo del trabajo", b: "α &lt; 90°: positivo (aporta energía). α = 90°: nulo. α &gt; 90°: negativo (quita energía). Rozamiento: α = 180°." },
        { a: "Trabajo neto", b: "Suma de los trabajos de todas las fuerzas = trabajo de la fuerza resultante (si son constantes)." },
        { a: "Trabajo con fuerza variable", b: "Área bajo la gráfica F–x. Muelle: W = ½·k·x² (triángulo)." },
        { a: "Energía cinética", b: "E<sub>c</sub> = ½·m·v². Escalar, siempre ≥ 0, ∝ v²: duplicar v ⇒ ×4." },
        { a: "Teorema trabajo–energía cinética", b: "W<sub>neto</sub> = ΔE<sub>c</sub> = ½mv² − ½mv₀². Vale con fuerzas variables y trayectorias curvas." },
        { a: "Energía potencial gravitatoria", b: "E<sub>p</sub> = m·g·h (h sobre un nivel de referencia a elegir). W<sub>peso</sub> = −ΔE<sub>p</sub>. Cerca de la superficie." },
        { a: "Energía potencial elástica", b: "E<sub>p,el</sub> = ½·k·x², con x la deformación respecto a la longitud natural." },
        { a: "Fuerza conservativa", b: "Su trabajo no depende del camino (sólo de los extremos) y es nulo en un trayecto cerrado. Peso, muelle, gravitación. No: rozamiento, aire." },
        { a: "Energía mecánica", b: "E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub>. Se conserva si sólo trabajan fuerzas conservativas." },
        { a: "Con fuerzas no conservativas", b: "ΔE<sub>m</sub> = W<sub>no cons</sub>. El rozamiento convierte energía mecánica en calor: Q = |W<sub>roz</sub>|." },
        { a: "Velocidades por conservación", b: "Caída: v = √(2gh). Altura máx.: v₀²/2g. Rampa lisa: √(2gh) (no depende del ángulo). Rizo: h<sub>mín</sub> = 2,5R." },
        { a: "Potencia", b: "P = W/t = F·v (W = J/s). 1 kW = 1000 W. 1 CV = 735,5 W." },
        { a: "Rendimiento", b: "η = P<sub>útil</sub>/P<sub>total</sub> = W<sub>útil</sub>/W<sub>total</sub> &lt; 1. En cadena: η = η₁·η₂·η₃." },
        { a: "Unidades de energía", b: "1 kWh = 3,6·10⁶ J. 1 cal = 4,184 J. 1 kcal = 4184 J. 1 eV = 1,6·10⁻¹⁹ J. El kWh es energía, no potencia." },
        { a: "Método", b: "Dibuja, elige dos instantes, nivel de referencia, ¿hay fuerzas no conservativas?, ecuación general, simplifica m, calcula y comprueba." }
      ]
    },
    emp1: {
      titulo: "Cada fórmula con su significado",
      consigna: "Une cada expresión con lo que representa.",
      pares: [
        ["W = F·d·cos α", "trabajo de una fuerza constante"],
        ["½·m·v²", "energía cinética"],
        ["m·g·h", "energía potencial gravitatoria cerca de la superficie"],
        ["½·k·x²", "energía potencial elástica de un muelle"],
        ["W<sub>neto</sub> = ΔE<sub>c</sub>", "teorema del trabajo y la energía cinética"],
        ["ΔE<sub>m</sub> = W<sub>no cons</sub>", "variación de la energía mecánica con rozamiento"],
        ["P = F·v", "potencia con velocidad constante"],
        ["η = P<sub>útil</sub>/P<sub>total</sub>", "rendimiento de una máquina"]
      ]
    },
    cla1: {
      titulo: "¿Qué método uso en cada problema?",
      consigna: "Toca un problema y después el método con el que lo resolverías.",
      categorias: ["Trabajo W = F·d·cos α", "Teorema W<sub>neto</sub> = ΔE<sub>c</sub>", "Conservación de E<sub>m</sub>", "ΔE<sub>m</sub> = W<sub>roz</sub> (con rozamiento)", "Potencia y rendimiento"],
      items: [
        { t: "Trabajo de una cuerda inclinada sobre un carrito", c: 0 }, { t: "Trabajo del peso al subir una caja por una rampa", c: 0 },
        { t: "Distancia de frenado de un coche con una fuerza conocida", c: 1 }, { t: "Velocidad de un bloque tras ser empujado con una fuerza durante 4 m", c: 1 },
        { t: "Velocidad al pasar por el punto más bajo de un péndulo", c: 2 }, { t: "Altura máxima de una piedra lanzada hacia arriba", c: 2 }, { t: "Velocidad de un carrito de montaña rusa sin rozamiento", c: 2 },
        { t: "Velocidad al pie de un plano inclinado rugoso", c: 3 }, { t: "Calor disipado por una bola que cae con resistencia del aire", c: 3 },
        { t: "Potencia de un motor que sube un ascensor", c: 4 }, { t: "Cuánto cuesta tener encendido un radiador de 2 kW", c: 4 }, { t: "Rendimiento de una central térmica", c: 4 }
      ]
    },
    orden1: {
      titulo: "Plano inclinado con rozamiento",
      consigna: "Ordena los pasos para calcular la velocidad con la que un bloque llega al pie de un plano inclinado con rozamiento.",
      items: [
        { t: "Dibujar el plano y marcar los puntos inicial (arriba, v = 0) y final (abajo)", nota: "Sin dibujo es fácil confundir h con L." },
        { t: "Calcular la altura vertical: h = L·sen θ", nota: "h no es la longitud del plano." },
        { t: "Plantear ΔE<sub>m</sub> = W<sub>roz</sub>: ½mv² − mgh = −μ·m·g·cos θ·L", nota: "Hay rozamiento: la energía mecánica no se conserva." },
        { t: "Simplificar la masa, que aparece en todos los términos", nota: "La velocidad no depende de la masa." },
        { t: "Despejar v² = 2·g·L·(sen θ − μ·cos θ)", nota: "Por eso el bloque sólo baja si sen θ &gt; μ·cos θ, es decir, tan θ &gt; μ." },
        { t: "Sustituir los datos y hacer la raíz cuadrada", nota: "Comprobar que sale menos que sin rozamiento: √(2gh)." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "w1", nivel: 1,
      enunciado: "Una fuerza de 30 N actúa en la dirección y el sentido del movimiento de un cuerpo que se desplaza 5 m. ¿Qué trabajo realiza?",
      check: { tipo: "num", etiqueta: "W (J) =", valor: 150 },
      pistas: ["α = 0°, cos 0° = 1."],
      pasos: ["W = F·d·cos α = 30·5·1 = 150 J."],
      resultado: "150 J" },
    { id: "w2", nivel: 1,
      enunciado: "Una fuerza de 50 N actúa perpendicularmente al desplazamiento de un cuerpo, que se mueve 10 m. ¿Qué trabajo realiza?",
      check: { tipo: "opcion", etiqueta: "El trabajo vale…", opciones: ["500 J", "0 J", "50 J", "−500 J"], ok: 1 },
      pistas: ["¿Cuánto vale cos 90°?"],
      pasos: ["W = F·d·cos 90° = 50·10·0 = 0 J."],
      resultado: "0 J" },
    { id: "w3", nivel: 1,
      enunciado: "Calcula la energía cinética de un cuerpo de 2 kg que se mueve a 6 m/s.",
      check: { tipo: "num", etiqueta: "E<sub>c</sub> (J) =", valor: 36 },
      pistas: ["E<sub>c</sub> = ½·m·v²."],
      pasos: ["E<sub>c</sub> = ½·2·6² = 36 J."],
      resultado: "36 J" },
    { id: "w4", nivel: 1,
      enunciado: "Calcula la energía potencial gravitatoria de un cuerpo de 4 kg situado a 15 m sobre el suelo (g = 9,8 m/s²).",
      check: { tipo: "num", etiqueta: "E<sub>p</sub> (J) =", valor: 588 },
      pistas: ["E<sub>p</sub> = m·g·h."],
      pasos: ["E<sub>p</sub> = 4·9,8·15 = 588 J."],
      resultado: "588 J" },
    { id: "w5", nivel: 1,
      enunciado: "Un coche de 1000 kg parte del reposo y alcanza una velocidad de 20 m/s. ¿Qué trabajo neto se ha realizado sobre él? Da el resultado en kJ.",
      check: { tipo: "num", etiqueta: "W (kJ) =", valor: 200 },
      pistas: ["W = ΔE<sub>c</sub>."],
      pasos: ["W = ½·1000·20² − 0 = 200 000 J = 200 kJ."],
      resultado: "200 kJ" },
    { id: "w6", nivel: 1,
      enunciado: "Un motor realiza un trabajo de 3000 J en 15 s. ¿Qué potencia media desarrolla?",
      check: { tipo: "num", etiqueta: "P (W) =", valor: 200 },
      pistas: ["P = W/t."],
      pasos: ["P = 3000/15 = 200 W."],
      resultado: "200 W" },
    { id: "w7", nivel: 1,
      enunciado: "Una grúa eleva un bloque de 200 kg hasta 10 m de altura en 20 s, a velocidad constante. Calcula el trabajo que realiza (en J) y su potencia (en W). g = 9,8 m/s².",
      check: [{ tipo: "num", etiqueta: "W (J) =", valor: 19600 }, { tipo: "num", etiqueta: "P (W) =", valor: 980 }],
      pistas: ["La fuerza de la grúa iguala al peso: F = m·g.", "P = W/t."],
      pasos: ["F = 200·9,8 = 1960 N → W = 1960·10 = 19 600 J.", "P = 19 600/20 = 980 W."],
      resultado: "19 600 J y 980 W" },
    { id: "w8", nivel: 1,
      enunciado: "Un objeto se deja caer desde 45 m de altura. Aplicando la conservación de la energía, calcula su velocidad al llegar al suelo (g = 10 m/s²).",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 30 },
      pistas: ["m·g·h = ½·m·v²."],
      pasos: ["v = √(2·g·h) = √(2·10·45) = √900 = 30 m/s."],
      resultado: "30 m/s" },
    { id: "w9", nivel: 1,
      enunciado: "El trabajo que realiza la fuerza de rozamiento cinético sobre un cuerpo que se desliza es…",
      check: { tipo: "opcion", etiqueta: "Es…", opciones: ["positivo", "negativo", "nulo", "igual a la energía potencial"], ok: 1 },
      pistas: ["El rozamiento se opone al movimiento: ¿cuánto vale α?"],
      pasos: ["α = 180° → cos α = −1 → W = −F<sub>r</sub>·d &lt; 0."],
      resultado: "negativo" },
    { id: "w10", nivel: 1,
      enunciado: "Un aparato consume 2 kWh. Expresa esa energía en megajulios (1 kWh = 3,6·10⁶ J).",
      check: { tipo: "num", etiqueta: "E (MJ) =", valor: 7.2 },
      pistas: ["1 kWh = 3,6 MJ."],
      pasos: ["2·3,6 = 7,2 MJ."],
      resultado: "7,2 MJ" },
    { id: "w11", nivel: 1,
      enunciado: "Una persona de 80 kg corre a 10 m/s. ¿Cuál es su energía cinética?",
      check: { tipo: "num", etiqueta: "E<sub>c</sub> (J) =", valor: 4000 },
      pistas: ["E<sub>c</sub> = ½·m·v²."],
      pasos: ["½·80·10² = 4000 J."],
      resultado: "4000 J" },
    { id: "w12", nivel: 1,
      enunciado: "Una máquina recibe una potencia de 500 W y entrega una potencia útil de 400 W. ¿Cuál es su rendimiento, en %?",
      check: { tipo: "num", etiqueta: "η (%) =", valor: 80 },
      pistas: ["η = P<sub>útil</sub>/P<sub>total</sub>."],
      pasos: ["η = 400/500 = 0,8 = 80 %."],
      resultado: "80 %" },

    // ================= ★★ intermedio =================
    { id: "w13", nivel: 2,
      enunciado: "Se arrastra un carrito 6 m con una cuerda que ejerce una fuerza de 40 N formando 30° con el desplazamiento. Calcula el trabajo realizado por la fuerza.",
      check: { tipo: "num", etiqueta: "W (J) =", valor: 207.85 },
      pistas: ["cos 30° = 0,866."],
      pasos: ["W = 40·6·cos 30° = 240·0,866 = 207,85 J."],
      resultado: "207,8 J" },
    { id: "w14", nivel: 2,
      enunciado: "Se sube un cuerpo de 10 kg una altura de 5 m. ¿Qué trabajo hace el peso? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "W<sub>peso</sub> (J) =", valor: -490 },
      pistas: ["El peso apunta hacia abajo y el desplazamiento hacia arriba: α = 180°."],
      pasos: ["W = −m·g·h = −10·9,8·5 = −490 J."],
      resultado: "−490 J" },
    { id: "w15", nivel: 2,
      enunciado: "Un bloque de 5 kg parte del reposo y se empuja 8 m sobre un suelo horizontal con una fuerza horizontal de 25 N. μ = 0,2; g = 9,8 m/s². Calcula: (a) el trabajo del rozamiento, (b) el trabajo neto y (c) la velocidad final.",
      check: [{ tipo: "num", etiqueta: "W<sub>roz</sub> (J) =", valor: -78.4 }, { tipo: "num", etiqueta: "W<sub>neto</sub> (J) =", valor: 121.6 }, { tipo: "num", etiqueta: "v (m/s) =", valor: 6.974 }],
      pistas: ["N = m·g; F<sub>r</sub> = μ·N.", "W<sub>neto</sub> = ΔE<sub>c</sub>."],
      pasos: ["F<sub>r</sub> = 0,2·5·9,8 = 9,8 N → W<sub>roz</sub> = −9,8·8 = −78,4 J.", "W<sub>neto</sub> = 25·8 − 78,4 = 121,6 J.", "½·5·v² = 121,6 → v = √(48,64) = 6,974 m/s."],
      resultado: "−78,4 J · 121,6 J · 6,97 m/s" },
    { id: "w16", nivel: 2,
      enunciado: "Se lanza una piedra verticalmente hacia arriba a 8 m/s. ¿Hasta qué altura sube? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "h<sub>máx</sub> (m) =", valor: 3.265 },
      pistas: ["Conservación: ½·m·v₀² = m·g·h."],
      pasos: ["h = v₀²/(2g) = 64/19,6 = 3,265 m."],
      resultado: "3,265 m" },
    { id: "w17", nivel: 2,
      enunciado: "Una pelota de 0,5 kg cae desde 10 m hasta 6 m de altura. ¿Cuánta energía potencial gravitatoria pierde? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "|ΔE<sub>p</sub>| (J) =", valor: 19.6 },
      pistas: ["ΔE<sub>p</sub> = m·g·Δh."],
      pasos: ["Δh = −4 m → ΔE<sub>p</sub> = 0,5·9,8·(−4) = −19,6 J: pierde 19,6 J (que gana como energía cinética)."],
      resultado: "19,6 J" },
    { id: "w18", nivel: 2,
      enunciado: "Un muelle de k = 200 N/m se comprime 10 cm y lanza una bola de 50 g sobre una superficie lisa. Calcula la energía almacenada en el muelle (J) y la velocidad de la bola al salir (m/s).",
      check: [{ tipo: "num", etiqueta: "E<sub>p</sub> (J) =", valor: 1 }, { tipo: "num", etiqueta: "v (m/s) =", valor: 6.325 }],
      pistas: ["E<sub>p,el</sub> = ½·k·x² con x en metros.", "Toda se convierte en E<sub>c</sub>."],
      pasos: ["E<sub>p</sub> = ½·200·0,1² = 1 J.", "½·0,05·v² = 1 → v² = 40 → v = 6,325 m/s."],
      resultado: "1 J · 6,32 m/s" },
    { id: "w19", nivel: 2,
      enunciado: "Una fuerza varía con la posición como F = 2x (N, con x en m). Calcula el trabajo que realiza entre x = 0 y x = 5 m.",
      check: { tipo: "num", etiqueta: "W (J) =", valor: 25 },
      pistas: ["Área del triángulo bajo la gráfica F–x."],
      pasos: ["F(5) = 10 N. Área = ½·5·10 = 25 J."],
      resultado: "25 J" },
    { id: "w20", nivel: 2,
      enunciado: "Una fuerza de 40 N empuja un objeto que se mueve a velocidad constante de 8 m/s en la dirección de la fuerza. ¿Qué potencia desarrolla?",
      check: { tipo: "num", etiqueta: "P (W) =", valor: 320 },
      pistas: ["P = F·v."],
      pasos: ["P = 40·8 = 320 W."],
      resultado: "320 W" },
    { id: "w21", nivel: 2,
      enunciado: "Un bloque desliza desde lo alto de un plano inclinado 30° y de 5 m de longitud, sin rozamiento. Calcula su velocidad al llegar abajo (g = 9,8 m/s²).",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 7 },
      pistas: ["Altura: h = L·sen 30°."],
      pasos: ["h = 5·0,5 = 2,5 m.", "v = √(2·9,8·2,5) = √49 = 7 m/s."],
      resultado: "7 m/s" },
    { id: "w22", nivel: 2,
      enunciado: "El mismo plano del ejercicio anterior (30°, 5 m) tiene ahora un coeficiente de rozamiento μ = 0,2. ¿Con qué velocidad llega abajo? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 5.659 },
      pistas: ["ΔE<sub>m</sub> = W<sub>roz</sub> con W<sub>roz</sub> = −μ·m·g·cos 30°·L."],
      pasos: ["½v² = g·L·(sen 30° − μ·cos 30°) = 9,8·5·(0,5 − 0,1732) = 16,01.", "v = √32,03 = 5,659 m/s."],
      resultado: "5,66 m/s" },
    { id: "w23", nivel: 2,
      enunciado: "Un coche de 1200 kg que circula a 20 m/s frena con una fuerza constante de 6000 N. ¿Qué distancia recorre hasta detenerse?",
      check: { tipo: "num", etiqueta: "d (m) =", valor: 40 },
      pistas: ["W<sub>neto</sub> = ΔE<sub>c</sub>: −F·d = 0 − ½·m·v²."],
      pasos: ["−6000·d = −½·1200·20² = −240 000 → d = 40 m."],
      resultado: "40 m" },
    { id: "w24", nivel: 2,
      enunciado: "Una bombilla de 60 W está encendida 5 horas. ¿Cuántos kWh consume? Con un precio de 0,15 €/kWh, ¿cuánto cuesta (en €)?",
      check: [{ tipo: "num", etiqueta: "E (kWh) =", valor: 0.3 }, { tipo: "num", etiqueta: "Coste (€) =", valor: 0.045 }],
      pistas: ["E = P·t con P en kW y t en horas."],
      pasos: ["E = 0,060·5 = 0,3 kWh.", "Coste = 0,3·0,15 = 0,045 €."],
      resultado: "0,3 kWh · 0,045 €" },
    { id: "w25", nivel: 2,
      enunciado: "Un péndulo de 2 m de longitud se suelta desde un ángulo de 60° respecto a la vertical. ¿Con qué velocidad pasa por el punto más bajo? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 4.427 },
      pistas: ["h = L·(1 − cos θ)."],
      pasos: ["h = 2·(1 − 0,5) = 1 m.", "v = √(2·9,8·1) = 4,427 m/s."],
      resultado: "4,43 m/s" },
    { id: "w26", nivel: 2,
      enunciado: "Un cuerpo de 2 kg se deja caer desde 50 m y llega al suelo con 28 m/s. ¿Qué energía (en J) se ha disipado por rozamiento con el aire? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "Q (J) =", valor: 196 },
      pistas: ["ΔE<sub>m</sub> = W<sub>aire</sub>."],
      pasos: ["E<sub>m,0</sub> = 2·9,8·50 = 980 J; E<sub>m,f</sub> = ½·2·28² = 784 J.", "Q = 980 − 784 = 196 J."],
      resultado: "196 J" },
    { id: "w27", nivel: 2,
      enunciado: "Un motor recibe una potencia de 2 kW y tiene un rendimiento del 75 %. Calcula su potencia útil (W) y el tiempo (s) que tarda en subir un bloque de 150 kg a 12 m de altura (g = 9,8 m/s²).",
      check: [{ tipo: "num", etiqueta: "P<sub>útil</sub> (W) =", valor: 1500 }, { tipo: "num", etiqueta: "t (s) =", valor: 11.76 }],
      pistas: ["P<sub>útil</sub> = η·P<sub>total</sub>.", "t = W/P<sub>útil</sub>, con W = m·g·h."],
      pasos: ["P<sub>útil</sub> = 0,75·2000 = 1500 W.", "W = 150·9,8·12 = 17 640 J → t = 17 640/1500 = 11,76 s."],
      resultado: "1500 W · 11,76 s" },
    { id: "w28", nivel: 2,
      enunciado: "Un ascensor de 600 kg (con carga) sube 30 m en 20 s a velocidad constante. ¿Qué potencia mínima desarrolla el motor? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "P (W) =", valor: 8820 },
      pistas: ["W = m·g·h y P = W/t."],
      pasos: ["W = 600·9,8·30 = 176 400 J.", "P = 176 400/20 = 8820 W."],
      resultado: "8820 W (≈ 8,8 kW)" },
    { id: "w29", nivel: 2,
      enunciado: "Un carrito de montaña rusa parte del reposo a 30 m de altura. Sin rozamiento, ¿con qué velocidad pasa por un punto situado a 10 m de altura? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 19.8 },
      pistas: ["Se pierden 20 m de altura."],
      pasos: ["m·g·20 = ½·m·v² → v = √(2·9,8·20) = √392 = 19,8 m/s."],
      resultado: "19,8 m/s" },
    { id: "w30", nivel: 2,
      enunciado: "Un carrito entra en un rizo circular de radio 5 m. Sin rozamiento, ¿desde qué altura mínima sobre el punto más bajo del rizo debe partir del reposo para no despegarse en el punto más alto?",
      check: { tipo: "num", etiqueta: "h<sub>mín</sub> (m) =", valor: 12.5 },
      pistas: ["En la cima, justo antes de despegarse, N = 0: v² = g·R.", "Conservación entre el punto de partida y la cima (altura 2R)."],
      pasos: ["m·g·h = m·g·2R + ½·m·g·R → h = 2,5·R = 12,5 m."],
      resultado: "12,5 m" },

    // ================= ★★★ avanzado =================
    { id: "w31", nivel: 3,
      enunciado: "Un bloque se lanza a 10 m/s hacia arriba por un plano inclinado 37° (sen 37° = 0,6; cos 37° = 0,8) con μ = 0,25. (a) ¿Qué distancia recorre hasta detenerse? (b) ¿Con qué velocidad vuelve al punto de partida? (g = 9,8 m/s²)",
      check: [{ tipo: "num", etiqueta: "d (m) =", valor: 6.378 }, { tipo: "num", etiqueta: "v<sub>vuelta</sub> (m/s) =", valor: 7.071 }],
      pistas: ["Al subir frenan el peso y el rozamiento: (sen θ + μ cos θ).", "Al bajar: (sen θ − μ cos θ)."],
      pasos: ["Subida: −(0,6 + 0,2)·m·g·d = −½·m·v₀² → d = 100/(2·9,8·0,8) = 6,378 m.", "Bajada: ½·v² = g·d·(0,6 − 0,2) = 9,8·6,378·0,4 = 25,0 → v = 7,071 m/s."],
      resultado: "6,38 m · 7,07 m/s" },
    { id: "w32", nivel: 3,
      enunciado: "Un coche de 1000 kg parte del reposo. El motor ejerce una fuerza de 3000 N y la resistencia total es de 1000 N. Tras recorrer 100 m, ¿qué velocidad lleva (m/s)?",
      check: { tipo: "num", etiqueta: "v (m/s) =", valor: 20 },
      pistas: ["Fuerza neta = 3000 − 1000 N."],
      pasos: ["W<sub>neto</sub> = 2000·100 = 200 000 J = ½·1000·v² → v² = 400 → v = 20 m/s."],
      resultado: "20 m/s" },
    { id: "w33", nivel: 3,
      enunciado: "Un coche circula a 30 m/s con velocidad constante contra una fuerza resistente total de 700 N. Calcula la potencia útil del motor en kW y en CV (1 CV = 735,5 W).",
      check: [{ tipo: "num", etiqueta: "P (kW) =", valor: 21 }, { tipo: "num", etiqueta: "P (CV) =", valor: 28.55 }],
      pistas: ["A velocidad constante F<sub>motriz</sub> = F<sub>resist</sub>; P = F·v."],
      pasos: ["P = 700·30 = 21 000 W = 21 kW.", "21 000/735,5 = 28,55 CV."],
      resultado: "21 kW · 28,6 CV" },
    { id: "w34", nivel: 3,
      enunciado: "Un bloque de 1 kg comprime 20 cm un muelle de k = 400 N/m sobre un suelo con μ = 0,3. Al soltarlo, se separa del muelle cuando éste recupera su longitud natural (desprecia el rozamiento durante el empuje). ¿Qué distancia recorre después hasta pararse? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "d (m) =", valor: 2.721 },
      pistas: ["Toda la energía del muelle se disipa en el rozamiento."],
      pasos: ["E = ½·400·0,2² = 8 J; F<sub>r</sub> = 0,3·1·9,8 = 2,94 N.", "d = 8/2,94 = 2,721 m."],
      resultado: "2,72 m" },
    { id: "w35", nivel: 3,
      enunciado: "Una central tiene tres etapas encadenadas con rendimientos del 38 %, 92 % y 85 %. ¿Qué rendimiento total tiene, en %?",
      check: { tipo: "num", etiqueta: "η<sub>total</sub> (%) =", valor: 29.7 },
      pistas: ["Los rendimientos se multiplican."],
      pasos: ["η = 0,38·0,92·0,85 = 0,2972 = 29,7 %."],
      resultado: "29,7 %" },
    { id: "w36", nivel: 3,
      enunciado: "Una persona de 70 kg salta verticalmente y su centro de masas sube 0,5 m. (a) ¿Con qué velocidad despega? (b) ¿Qué energía potencial gana (J)? (g = 9,8 m/s²)",
      check: [{ tipo: "num", etiqueta: "v (m/s) =", valor: 3.130 }, { tipo: "num", etiqueta: "ΔE<sub>p</sub> (J) =", valor: 343 }],
      pistas: ["Conservación: ½·m·v² = m·g·h."],
      pasos: ["v = √(2·9,8·0,5) = √9,8 = 3,130 m/s.", "ΔE<sub>p</sub> = 70·9,8·0,5 = 343 J."],
      resultado: "3,13 m/s · 343 J" },
    { id: "w37", nivel: 3,
      enunciado: "Un meteorito de 1 tonelada entra en la atmósfera a 20 km/s. Calcula su energía cinética (en 10¹¹ J) y a cuántas toneladas de TNT equivale (1 t de TNT = 4,184·10⁹ J).",
      check: [{ tipo: "num", etiqueta: "E<sub>c</sub> (10¹¹ J) =", valor: 2 }, { tipo: "num", etiqueta: "toneladas de TNT =", valor: 47.8 }],
      pistas: ["m = 1000 kg; v = 2·10⁴ m/s."],
      pasos: ["E<sub>c</sub> = ½·1000·(2·10⁴)² = 2·10¹¹ J.", "2·10¹¹/4,184·10⁹ = 47,8 t de TNT."],
      resultado: "2·10¹¹ J · 47,8 t de TNT" },
    { id: "w38", nivel: 3,
      enunciado: "Una central hidroeléctrica recibe 50 m³/s de agua que cae desde 80 m de altura, con un rendimiento total del 85 %. ¿Qué potencia eléctrica genera (en MW)? (ρ = 1000 kg/m³, g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "P (MW) =", valor: 33.32 },
      pistas: ["Masa que cae cada segundo: 5·10⁴ kg.", "P<sub>hidráulica</sub> = m·g·h/t."],
      pasos: ["P<sub>hid</sub> = 5·10⁴·9,8·80 = 3,92·10⁷ W.", "P<sub>eléc</sub> = 0,85·39,2 = 33,32 MW."],
      resultado: "33,3 MW" },
    { id: "w39", nivel: 3,
      enunciado: "Una caja de 10 kg se arrastra 10 m por un suelo horizontal con una cuerda que ejerce una fuerza de 60 N formando 30° con la horizontal. μ = 0,2; g = 9,8 m/s². Calcula la normal (N), el trabajo neto (J) y la velocidad final partiendo del reposo (m/s).",
      check: [{ tipo: "num", etiqueta: "N (N) =", valor: 68 }, { tipo: "num", etiqueta: "W<sub>neto</sub> (J) =", valor: 383.6 }, { tipo: "num", etiqueta: "v (m/s) =", valor: 8.759 }],
      pistas: ["N + F·sen 30° = m·g.", "W<sub>neto</sub> = F·d·cos 30° − μ·N·d."],
      pasos: ["N = 98 − 30 = 68 N; F<sub>r</sub> = 13,6 N.", "W<sub>neto</sub> = 519,6 − 136 = 383,6 J.", "v = √(2·383,6/10) = 8,759 m/s."],
      resultado: "68 N · 383,6 J · 8,76 m/s" },
    { id: "w40", nivel: 3,
      enunciado: "Demuestra el teorema del trabajo y la energía cinética para una fuerza neta constante F que actúa sobre un cuerpo de masa m en la dirección del movimiento. Redáctalo como en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Plantea la segunda ley de Newton F = m·a y define el trabajo W = F·d", p: 0.5 },
        { t: "Escribe la ecuación del MRUA v² = v₀² + 2·a·d (o a·d = (v² − v₀²)/2)", p: 0.5 },
        { t: "Sustituye: W = m·a·d = m·(v² − v₀²)/2", p: 0.5 },
        { t: "Concluye W = ½·m·v² − ½·m·v₀² = ΔE<sub>c</sub> e identifica la energía cinética", p: 0.5 }
      ] },
      pasos: ["F = m·a y W = F·d = m·a·d.", "v² = v₀² + 2·a·d → a·d = (v² − v₀²)/2.", "W = m·(v² − v₀²)/2 = ½·m·v² − ½·m·v₀² = ΔE<sub>c</sub>. ∎"],
      resultado: "W<sub>neto</sub> = ΔE<sub>c</sub>" },
    { id: "w41", nivel: 3,
      enunciado: "Una persona lleva una maleta de 15 kg por un pasillo horizontal a velocidad constante. Explica, usando el concepto de trabajo, por qué el trabajo que la persona hace sobre la maleta es nulo, aunque la persona se canse.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Identifica que la fuerza que la persona ejerce sobre la maleta es vertical (igual al peso, hacia arriba)", p: 0.5 },
        { t: "Indica que el desplazamiento es horizontal y por tanto la fuerza es perpendicular (α = 90°)", p: 0.5 },
        { t: "Concluye W = F·d·cos 90° = 0, y que la energía cinética no cambia (velocidad constante)", p: 0.5 },
        { t: "Aclara que el cansancio es consumo de energía química del cuerpo, no trabajo mecánico sobre la maleta", p: 0.5 }
      ] },
      pasos: ["Velocidad constante → fuerza neta nula → la persona ejerce hacia arriba una fuerza F = m·g.", "Desplazamiento horizontal, fuerza vertical: α = 90°, cos 90° = 0 → W = 0.", "W<sub>neto</sub> = 0 = ΔE<sub>c</sub> (coherente con v constante).", "Los músculos gastan energía química y la disipan como calor aunque no haya trabajo mecánico."],
      resultado: "W = 0: fuerza ⟂ desplazamiento" },
    { id: "w42", nivel: 3,
      enunciado: "Usando la conservación de la energía mecánica, explica por qué un cuerpo que se deja caer desde una altura h llega al suelo con v = √(2gh) independientemente de su masa, y por qué la velocidad es la misma al bajar por una rampa sin rozamiento desde esa misma altura.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Plantea E<sub>m</sub> inicial = m·g·h y E<sub>m</sub> final = ½·m·v² (sin rozamiento, E<sub>m</sub> constante)", p: 0.5 },
        { t: "Cancela la masa y despeja v = √(2gh)", p: 0.5 },
        { t: "Explica que en la rampa la normal es perpendicular al movimiento y no hace trabajo, así que sólo el peso (conservativo) cambia la energía", p: 0.5 },
        { t: "Concluye que sólo importa la altura inicial y final, no el camino ni el ángulo", p: 0.5 }
      ] },
      pasos: ["m·g·h = ½·m·v² → la masa se simplifica → v = √(2gh).", "Rampa lisa: N ⟂ desplazamiento → W<sub>N</sub> = 0; sólo trabaja el peso, que es conservativo.", "Resultado: v = √(2gh), igual que en la caída libre: depende sólo de h."],
      resultado: "v = √(2gh), no depende de m ni del camino" },
    { id: "w43", nivel: 3,
      enunciado: "Se lanza una piedra verticalmente hacia arriba con v₀ = 15 m/s. ¿A qué altura (m) su energía cinética es igual a su energía potencial? (g = 9,8 m/s²)",
      check: { tipo: "num", etiqueta: "h (m) =", valor: 5.739 },
      pistas: ["E<sub>m</sub> = ½·m·v₀². Si E<sub>c</sub> = E<sub>p</sub>, entonces E<sub>p</sub> = E<sub>m</sub>/2."],
      pasos: ["m·g·h = ½·(½·m·v₀²) → h = v₀²/(4g) = 225/39,2 = 5,739 m.", "(Justo la mitad de la altura máxima, 11,48 m.)"],
      resultado: "5,74 m (la mitad de la altura máxima)" },
    { id: "w44", nivel: 3,
      enunciado: "¿Por qué el rozamiento es una fuerza no conservativa?",
      check: { tipo: "opcion", etiqueta: "Porque…", opciones: ["su trabajo depende del camino recorrido y no se puede asociar a una energía potencial", "es una fuerza muy pequeña", "siempre actúa hacia abajo", "no hace trabajo"], ok: 0 },
      pistas: ["Compara el trabajo por un camino corto y por uno largo entre los mismos dos puntos."],
      pasos: ["W<sub>roz</sub> = −μ·N·(longitud del camino): cuanto más largo el camino, más negativo. En un trayecto cerrado no es nulo, y no existe E<sub>p</sub> asociada."],
      resultado: "su trabajo depende del camino" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Trabajo", ancha: true,
      tabla: { cab: ["Caso", "Fórmula", "Nota"], filas: [
        ["Fuerza constante", "W = F·d·cos α", "J = N·m · α entre F y el desplazamiento"],
        ["Trabajo neto", "W<sub>neto</sub> = ΣW<sub>i</sub> = F<sub>neta</sub>·d·cos α", "suma con signos"],
        ["Peso", "W = −m·g·Δh", "negativo al subir; no depende del camino"],
        ["Rozamiento", "W = −μ·N·d", "siempre negativo (α = 180°)"],
        ["Muelle", "W = ½·k·x²", "área del triángulo F–x"],
        ["Fuerza variable", "W = área bajo F(x)", "verde (+) · rojo (−)"],
        ["Normal, tensión (péndulo)", "W = 0", "⟂ al desplazamiento"]
      ] },
      nota: "Sólo la componente de F a lo largo del desplazamiento hace trabajo." },
    { titulo: "Signo del trabajo",
      items: [
        { label: "α = 0°", formula: "W = F·d (máximo)", cuando: "la fuerza ayuda al movimiento" },
        { label: "0° &lt; α &lt; 90°", formula: "W &gt; 0", cuando: "aporta energía" },
        { label: "α = 90°", formula: "W = 0", cuando: "perpendicular" },
        { label: "90° &lt; α ≤ 180°", formula: "W &lt; 0", cuando: "quita energía (α = 180°: W = −F·d)" }
      ] },
    { titulo: "Energías",
      items: [
        { label: "Cinética", formula: "E<sub>c</sub> = ½·m·v²", cuando: "siempre ≥ 0; ×4 si v ×2" },
        { label: "Potencial gravitatoria", formula: "E<sub>p</sub> = m·g·h", cuando: "h sobre el nivel de referencia", ojo: "h vertical, no longitud." },
        { label: "Potencial elástica", formula: "E<sub>p,el</sub> = ½·k·x²", cuando: "x = deformación" },
        { label: "Mecánica", formula: "E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub>" }
      ] },
    { titulo: "Teoremas y conservación", ancha: true,
      tabla: { cab: ["Enunciado", "Ecuación", "Úsalo cuando…"], filas: [
        ["Trabajo–energía cinética", "W<sub>neto</sub> = ΔE<sub>c</sub>", "te dan fuerzas y distancias, sin E<sub>p</sub>"],
        ["Fuerza conservativa", "W<sub>cons</sub> = −ΔE<sub>p</sub>", "peso, muelle"],
        ["Conservación de E<sub>m</sub>", "E<sub>c,0</sub> + E<sub>p,0</sub> = E<sub>c</sub> + E<sub>p</sub>", "sin rozamiento ni motor"],
        ["Con fuerzas no conservativas", "ΔE<sub>m</sub> = W<sub>no cons</sub>", "rozamiento, aire, motor"],
        ["Calor disipado", "Q = |W<sub>roz</sub>| = −ΔE<sub>m</sub>", "balance de energía"]
      ] },
      nota: "La energía total (mecánica + calor) siempre se conserva." },
    { titulo: "Potencia y rendimiento",
      items: [
        { label: "Potencia media", formula: "P = W/t", cuando: "W = J/s" },
        { label: "Con velocidad", formula: "P = F·v", cuando: "F paralela a v" },
        { label: "Rendimiento", formula: "η = P<sub>útil</sub>/P<sub>total</sub> &lt; 1" },
        { label: "Cadena de máquinas", formula: "η = η₁·η₂·η₃", ejemplo: "0,38·0,92·0,85 = 29,7 %" },
        { label: "Energía eléctrica", formula: "E = P·t (kWh)", ojo: "El kWh es energía." }
      ] },
    { titulo: "Resultados que conviene saber", ancha: true,
      tabla: { cab: ["Situación", "Planteamiento", "Resultado"], filas: [
        ["Caída libre desde h", "m·g·h = ½·m·v²", "v = √(2gh)"],
        ["Lanzamiento vertical v₀", "½·m·v₀² = m·g·h", "h<sub>máx</sub> = v₀²/2g"],
        ["Rampa lisa desde altura h", "igual que la caída", "v = √(2gh) (no depende del ángulo)"],
        ["Péndulo (ángulo θ₀)", "h = L(1 − cos θ₀)", "v<sub>máx</sub> = √(2gL(1 − cos θ₀))"],
        ["Muelle lanza masa", "½·k·x² = ½·m·v²", "v = x·√(k/m)"],
        ["Rizo de radio R", "N = 0 arriba: v² = gR", "h<sub>mín</sub> = 2,5·R"],
        ["Frenado con μ", "−μ·m·g·d = −½·m·v²", "d = v²/(2μg)"],
        ["Rampa con rozamiento", "ΔE<sub>m</sub> = W<sub>roz</sub>", "v² = 2gL(sen θ − μ·cos θ)"]
      ] } },
    { titulo: "Unidades y equivalencias", ancha: true,
      tabla: { cab: ["Magnitud", "Unidad SI", "Equivalencias"], filas: [
        ["Trabajo, energía", "julio (J)", "1 kWh = 3,6·10⁶ J · 1 cal = 4,184 J · 1 kcal = 4184 J · 1 eV = 1,602·10⁻¹⁹ J"],
        ["Potencia", "vatio (W = J/s)", "1 kW = 1000 W · 1 CV = 735,5 W"],
        ["Velocidad", "m/s", "km/h ÷ 3,6 → m/s"],
        ["Fuerza", "newton (N)", "1 N·m = 1 J"]
      ] },
      nota: "g = 9,8 m/s². El kWh es una unidad de energía." },
    { titulo: "Método en diez pasos",
      pasos: ["Dibuja y marca estado inicial y final.", "Datos al SI (km/h ÷ 3,6).", "Elige nivel de referencia de E<sub>p</sub>.", "Lista las fuerzas: ¿cuáles hacen trabajo?", "¿Hay rozamiento o fuerzas externas? → ΔE<sub>m</sub> = W<sub>nc</sub>; si no, E<sub>m</sub> constante.", "Ecuación con letras y simplifica m.", "Sustituye con signos.", "Despeja y calcula.", "Comprueba unidades y signo.", "¿Tiene sentido físico?"] },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Usar el ángulo con la horizontal en W = F·d·cos α", bien: "α es entre F y el desplazamiento", por: "Sólo cuenta la componente a lo largo del movimiento." },
        { mal: "Olvidar el signo del rozamiento", bien: "W<sub>roz</sub> = −μ·N·d &lt; 0", por: "Se opone al movimiento (α = 180°)." },
        { mal: "ΔE<sub>c</sub> = ½·m·(v − v₀)²", bien: "ΔE<sub>c</sub> = ½·m·(v² − v₀²)", por: "La energía cinética depende de v²." },
        { mal: "Usar conservación de E<sub>m</sub> con rozamiento", bien: "ΔE<sub>m</sub> = W<sub>roz</sub>", por: "El rozamiento es no conservativo." },
        { mal: "h = longitud de la rampa", bien: "h = L·sen θ", por: "La altura es vertical." },
        { mal: "kWh como unidad de potencia", bien: "kWh es energía; kW es potencia", por: "1 kWh = 3,6·10⁶ J." },
        { mal: "Rendimientos que se suman", bien: "Se multiplican", por: "Cada etapa recibe lo que deja la anterior." }
      ] }
  ];

  B.registrar("fyq1", "t12", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
