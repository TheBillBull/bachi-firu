/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 13: Movimiento armónico simple
   Parte A: resumen y refuerzo de las secciones originales 1–3 (movimientos periódicos, magnitudes, ecuación)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t13/" + ref); }
  var P = B._fq13 = {};

  P.resumen = [
    "<b>MAS</b>: movimiento oscilatorio en el que la elongación varía como x(t) = A·cos(ω·t + φ₀). <b>A</b> amplitud (m) · <b>T</b> periodo (s) · <b>f</b> = 1/T frecuencia (Hz) · <b>ω</b> = 2π/T = 2π·f (rad/s) · <b>φ₀</b> fase inicial (rad), que sale de x₀ y v₀.",
    "<b>Velocidad y aceleración</b>: v = −A·ω·sen(ω·t + φ₀) · a = −A·ω²·cos(ω·t + φ₀) = <b>−ω²·x</b> · v<sub>máx</sub> = A·ω (en x = 0) · a<sub>máx</sub> = A·ω² (en x = ±A) · v = ±ω·√(A² − x²).",
    "<b>Dinámica</b>: la fuerza recuperadora es proporcional a la elongación y de sentido contrario: <b>F = −k·x</b> (ley de Hooke). Con la 2.ª ley: m·a = −k·x ⇒ <b>ω = √(k/m)</b> y <b>T = 2π√(m/k)</b>: no depende de la amplitud ni (en un muelle) de g.",
    "<b>Energía</b>: E<sub>p</sub> = ½·k·x² · E<sub>c</sub> = ½·m·v² = ½·k·(A² − x²) · <b>E<sub>m</sub> = ½·k·A²</b> = constante (sin rozamiento) · la energía oscila con frecuencia doble que x.",
    "<b>Muelles</b>: en serie 1/k = 1/k₁ + 1/k₂ (misma fuerza, se suman los alargamientos) · en paralelo k = k₁ + k₂ (mismo alargamiento) · vertical: el equilibrio se desplaza Δℓ = m·g/k pero T no cambia · <b>péndulo simple</b> (ángulos pequeños): T = 2π√(l/g).",
    "<b>Método</b>: A (de la elongación máxima o de E<sub>m</sub>), ω (de k y m, o de T), φ₀ (de x₀ y v₀), y luego x, v y a en cualquier instante; para el estado en una posición usa v = ±ω√(A² − x²) y la conservación de la energía."
  ];

  P.secciones = {};

  // ---------------------------------------------------------------- 1. Movimientos periódicos y el MAS
  P.secciones[0] =
    "<h5>Oscilaciones por todas partes</h5>" +
    "<p>Si te fijas, buena parte de lo que se mueve a tu alrededor lo hace «de ida y vuelta»: el péndulo de un reloj, la cuerda de una guitarra, el pistón de un motor, el niño en un columpio, la suspensión de un coche cuando pasa un bache, los átomos de una molécula que vibran alrededor de su posición de equilibrio, la corriente alterna de los enchufes (que cambia de sentido 100 veces por segundo)… Todos son <b>movimientos oscilatorios</b>: el cuerpo se mueve a uno y otro lado de una posición de equilibrio. Cuando, además, se repiten exactamente igual cada cierto tiempo, se llaman <b>periódicos</b>. Casi todas las oscilaciones físicas importantes se parecen, en una primera aproximación, a un tipo muy sencillo: el <b>movimiento armónico simple</b> (MAS).</p>" +
    tabla(["Fenómeno periódico", "Periodo aproximado", "Frecuencia"], [
      ["Corriente alterna de la red", "20 ms", "50 Hz"],
      ["Nota LA de un diapasón", "2,27 ms", "440 Hz"],
      ["Latido del corazón (en reposo)", "≈ 0,8–1 s", "≈ 1–1,2 Hz"],
      ["Péndulo de un reloj de pared (de «segundos»)", "2 s", "0,5 Hz"],
      ["Suspensión de un coche", "≈ 0,7 s", "≈ 1,4 Hz"],
      ["Vibración de una molécula de agua", "≈ 10⁻¹⁴ s", "≈ 10¹⁴ Hz"],
      ["Movimiento de la Tierra alrededor del Sol (periódico, pero no MAS)", "1 año", "3·10⁻⁸ Hz"]
    ]) +
    "<h5>Por qué se llama «armónico» y «simple»</h5>" +
    "<p>Un movimiento oscilatorio es un <b>MAS</b> cuando la elongación (la distancia a la posición de equilibrio) es una función <b>seno o coseno</b> del tiempo. Se llama «armónico» porque estas funciones son las de la vibración más pura que existe (el sonido de un diapasón es un MAS, y cualquier otra vibración se puede construir sumando varias de ellas); y «simple» porque es el caso más sencillo: una sola frecuencia, sin amortiguamiento.</p>" +
    "<p>Hay una forma equivalente de reconocer un MAS, y es la que explica <i>por qué</i> ocurre: <b>la fuerza que actúa sobre el cuerpo es proporcional a la elongación y siempre apunta hacia el equilibrio</b>, F = −k·x. Cualquier sistema sobre el que actúe una fuerza así (un muelle ideal, un péndulo que oscila poco, una molécula con un enlace «elástico») hace un MAS. Cuanto más lejos del equilibrio, más fuerte tira hacia él: el cuerpo acelera hacia el centro, lo pasa a toda velocidad, y la misma fuerza (ahora al otro lado) lo frena y lo devuelve. Es el motor de la oscilación.</p>" +
    "<h5>Una propiedad sorprendente: el isocronismo</h5>" +
    "<p>En un MAS, el <b>periodo no depende de la amplitud</b>: un muelle que oscila 2 cm tarda lo mismo en cada oscilación que uno que oscila 10 cm (el segundo va más deprisa porque recorre más camino, pero tarda lo mismo). Es lo que descubrió Galileo observando una lámpara que oscilaba en la catedral de Pisa y es la razón por la que los relojes de péndulo y de cuarzo funcionan: aunque la amplitud vaya cambiando poco a poco, el ritmo se mantiene.</p>" +
    w("f13_mas") +
    ojo("el MAS es un modelo ideal: no tiene rozamiento. En la vida real la amplitud disminuye con el tiempo (movimiento amortiguado, que se verá más adelante); pero durante pocas oscilaciones, muchos sistemas se comportan casi como un MAS ideal.");

  // ---------------------------------------------------------------- 2. Magnitudes del MAS
  P.secciones[1] =
    "<h5>Las magnitudes, una por una</h5>" +
    "<p>Para describir un MAS se necesitan pocas magnitudes. Las que ya aparecen en el cuadro del tema son las siguientes, con sus unidades en el Sistema Internacional y una forma práctica de recordarlas:</p>" +
    tabla(["Magnitud", "Símbolo y unidad", "Qué mide", "Cómo se mide en una gráfica"], [
      ["Elongación", "x (m)", "distancia a la posición de equilibrio en cada instante (con signo)", "la altura de la curva x–t"],
      ["Amplitud", "A (m)", "elongación máxima (siempre positiva): el cuerpo oscila entre −A y +A", "la altura de un máximo"],
      ["Periodo", "T (s)", "tiempo de una oscilación completa", "distancia horizontal entre dos máximos consecutivos"],
      ["Frecuencia", "f (Hz = s⁻¹)", "oscilaciones completas por segundo: f = 1/T", "—"],
      ["Frecuencia angular (pulsación)", "ω (rad/s)", "ritmo de la oscilación expresado en radianes por segundo: ω = 2π/T = 2π·f", "—"],
      ["Fase inicial", "φ₀ (rad)", "estado de la oscilación en t = 0", "desplazamiento horizontal de la curva respecto a un coseno"]
    ]) +
    "<p>La <b>frecuencia</b> f (hercios) y la <b>frecuencia angular</b> ω (radianes por segundo) son dos formas de decir lo mismo: una oscilación completa equivale a 2π radianes del vector giratorio asociado (como en el Tema 9). Un MAS de f = 2 Hz tiene T = 0,5 s y ω = 4π ≈ 12,57 rad/s. La ω es la que aparece en las ecuaciones porque simplifica las fórmulas.</p>" +
    "<p>Ten en cuenta que «una oscilación completa» es una <b>ida y vuelta</b> y recuperar la misma posición <i>y</i> el mismo sentido de movimiento: pasar por el centro dos veces seguidas no es un periodo, sino medio (la segunda vez va en sentido contrario). En una oscilación completa el cuerpo recorre una distancia total de 4·A (por ejemplo, de 0 a A, de A a 0, de 0 a −A y de −A a 0).</p>" +
    "<p>Una gráfica x–t de un MAS contiene toda esta información: se lee A como la altura máxima, T como la distancia entre máximos, f = 1/T y ω = 2π/T; y la fase inicial se deduce de dónde empieza la curva y hacia dónde va en t = 0.</p>" +
    w("f13_leer") +
    ejemplo("Leer los parámetros en una gráfica", "Un cuerpo oscila entre +5 cm y −5 cm y completa 2,5 oscilaciones en 10 s. Calcula la amplitud, el periodo, la frecuencia y la frecuencia angular.", [
      "Amplitud: la mitad del recorrido total, A = (5 − (−5))/2 = <b>5 cm = 0,05 m</b>.",
      "Periodo: T = tiempo/nº de oscilaciones = 10/2,5 = <b>4 s</b>.",
      "Frecuencia: f = 1/T = <b>0,25 Hz</b> (una oscilación cada 4 s).",
      "Frecuencia angular: ω = 2π/T = 2π/4 = π/2 = <b>1,571 rad/s</b>."
    ]) +
    ejemplo("Conversión de unidades", "Un taladro vibra con 3000 oscilaciones por minuto. Expresa su frecuencia en hercios, su periodo y su frecuencia angular.", [
      "3000 oscilaciones/min = 3000/60 = <b>50 Hz</b> (50 oscilaciones por segundo).",
      "T = 1/f = 1/50 = <b>0,02 s = 20 ms</b>.",
      "ω = 2π·f = 2π·50 = <b>314,2 rad/s</b>."
    ]);

  // ---------------------------------------------------------------- 3. Ecuación del MAS
  P.secciones[2] =
    "<h5>La ecuación x(t) = A·cos(ωt + φ₀) y qué significa cada letra</h5>" +
    "<p>La posición en cada instante se describe con la función coseno: <b>A</b> es el valor máximo del coseno multiplicado (la amplitud); <b>ω·t + φ₀</b>, la <b>fase</b>, es el ángulo del coseno (en radianes) y va aumentando con el tiempo a razón de ω radianes por segundo; y <b>φ₀</b>, la <b>fase inicial</b>, es el valor de la fase en t = 0. Dos MAS con la misma A y la misma ω pero distinta φ₀ son el mismo movimiento «desfasado» uno respecto del otro: la misma oscilación con un desplazamiento temporal.</p>" +
    w("f13_fase") +
    "<h5>Seno o coseno: da igual (si se ajusta la fase)</h5>" +
    "<p>Muchos libros y problemas escriben el MAS con seno: x = A·sen(ωt + φ₀′). Es exactamente lo mismo, porque sen(θ) = cos(θ − π/2): una función seno es un coseno retrasado un cuarto de periodo. Por eso la fase inicial depende de qué función se use (φ₀ con coseno, φ₀′ = φ₀ + π/2 con seno). <b>En este tema se usa el coseno</b>, como en el cuadro del tema. Si te dan la ecuación con seno, se convierte con x = A·sen(ωt + φ′) = A·cos(ωt + φ′ − π/2).</p>" +
    "<h5>Cómo se obtiene la fase inicial</h5>" +
    "<p>La fase inicial se calcula con las <b>condiciones iniciales</b> (la posición x₀ y la velocidad v₀ en t = 0), imponiéndolas en las ecuaciones de x y de v: x₀ = A·cos φ₀ y v₀ = −A·ω·sen φ₀. De aquí se despejan A = √(x₀² + (v₀/ω)²) y φ₀ tal que cos φ₀ = x₀/A y sen φ₀ = −v₀/(A·ω). Hay que mirar <b>los dos signos</b> (seno y coseno) para saber en qué cuadrante está φ₀; con solo el coseno quedan dos ángulos posibles (φ₀ y −φ₀), y es la velocidad la que decide cuál es. Los casos más habituales son estos:</p>" +
    tabla(["φ₀", "x(0)", "v(0)", "Cómo empieza el movimiento"], [
      ["0", "+A", "0", "en el extremo positivo, en reposo (se estira el muelle y se suelta)"],
      ["π/2 (90°)", "0", "−A·ω", "pasando por el centro hacia los valores negativos"],
      ["π (180°)", "−A", "0", "en el extremo negativo, en reposo"],
      ["−π/2 (270°)", "0", "+A·ω", "pasando por el centro hacia los valores positivos"]
    ]) +
    ejemplo("Analizar una ecuación", "Un MAS viene dado por x(t) = 0,08·cos(5π·t + π/3) (en el SI). Calcula la amplitud, la frecuencia angular, el periodo, la frecuencia, la fase inicial, la posición inicial, la velocidad inicial y la posición en t = 0,1 s.", [
      "Comparando con x = A·cos(ωt + φ₀): <b>A = 0,08 m</b>, <b>ω = 5π = 15,71 rad/s</b> y <b>φ₀ = π/3 = 60°</b>.",
      "T = 2π/ω = 2π/(5π) = <b>0,4 s</b> y f = 1/T = <b>2,5 Hz</b>.",
      "x(0) = 0,08·cos(π/3) = 0,08·0,5 = <b>0,04 m</b>.",
      "v(0) = −A·ω·sen φ₀ = −0,08·15,71·sen 60° = −0,08·15,71·0,866 = <b>−1,088 m/s</b> (empieza moviéndose hacia los valores negativos).",
      "x(0,1) = 0,08·cos(5π·0,1 + π/3) = 0,08·cos(π/2 + π/3) = 0,08·cos 150° = <b>−0,0693 m</b>."
    ]) +
    ejemplo("Hallar A y φ₀ con las condiciones iniciales", "Un cuerpo en MAS con ω = 10 rad/s está en t = 0 en x₀ = 0,03 m moviéndose con v₀ = −0,4 m/s. Escribe su ecuación x(t).", [
      "Amplitud: A = √(x₀² + (v₀/ω)²) = √(0,03² + 0,04²) = √0,0025 = <b>0,05 m</b>.",
      "cos φ₀ = x₀/A = 0,03/0,05 = 0,6. sen φ₀ = −v₀/(A·ω) = 0,4/(0,05·10) = 0,8.",
      "cos &gt; 0 y sen &gt; 0 ⇒ primer cuadrante: φ₀ = arctan(0,8/0,6) = <b>0,927 rad = 53,13°</b>.",
      "Ecuación: <b>x(t) = 0,05·cos(10·t + 0,927)</b> m. (El otro ángulo con el mismo coseno, −53,13°, daría v₀ positiva: no vale.)"
    ]) +
    ejemplo("De seno a coseno", "Expresa x = 0,2·sen(2t + π/6) con la función coseno.", [
      "sen θ = cos(θ − π/2) → x = 0,2·cos(2t + π/6 − π/2) = 0,2·cos(2t − π/3).",
      "Es el mismo movimiento: A = 0,2 m y ω = 2 rad/s; sólo cambia la manera de escribir la fase (φ₀ = −π/3 con coseno)."
    ]) +
    ojo("el argumento del coseno, ω·t + φ₀, está en <b>radianes</b>: la calculadora debe estar en modo RAD. Y el signo de φ₀ importa: adelanta (φ₀ &gt; 0) o retrasa (φ₀ &lt; 0) la curva.");
})(window);
