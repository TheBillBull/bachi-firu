/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 8: Cinemática (rectilíneo)
   Parte A: refuerzo de las seis secciones originales (se añade al final de cada una)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t8/" + ref); }
  var P = B._fq8 = {};

  P.resumen = [
    "<b>Posición</b> x (con signo, respecto de un origen y un eje) · <b>desplazamiento</b> Δx = x − x₀ (puede ser negativo) · <b>distancia recorrida</b> (siempre ≥ 0, cuenta los cambios de sentido).",
    "<b>Velocidad media</b> v = Δx/Δt (vector, con signo) · <b>rapidez media</b> = distancia/Δt · velocidad instantánea = pendiente de la tangente en la gráfica x–t. Conversión: 1 m/s = 3,6 km/h.",
    "<b>MRU</b>: v constante, x = x₀ + v·t. <b>MRUA</b>: a constante, v = v₀ + a·t, x = x₀ + v₀t + ½at², v² = v₀² + 2aΔx (y Δx = ½(v₀ + v)t).",
    "Aceleración y velocidad con el <b>mismo signo</b>: acelera; con signo contrario: frena. En v–t la pendiente es a y el <b>área</b> es el desplazamiento.",
    "<b>Caída libre</b>: MRUA con a = −g (g = 9,8 m/s², eje hacia arriba). Tiempo de subida = tiempo de bajada; en lo más alto v = 0 pero a = −g.",
    "<b>Tiro parabólico</b>: horizontal MRU (vₓ = v₀cosθ) + vertical MRUA (a = −g). Alcance = v₀²sen2θ/g desde el suelo; θ y 90° − θ dan el mismo alcance."
  ];

  P.secciones = {};

  // ---------------------------------------------------------------- 1. Magnitudes básicas
  P.secciones[0] =
    "<h5>El sistema de referencia: sin él, «posición» no significa nada</h5>" +
    "<p>Decir que un coche «está a 300 m» no tiene sentido si no se dice <b>a 300 m de qué</b> y <b>hacia dónde</b>. Para describir un movimiento hay que fijar un <b>sistema de referencia</b>: un origen O, unos ejes y un sentido positivo. En el movimiento rectilíneo basta un único eje, que dibujamos como una recta graduada en metros; el cero es el origen, los números positivos están en el sentido que elijamos como positivo y los negativos en el contrario. Elegir bien el sistema de referencia no cambia la física, pero sí facilita los cálculos: lo habitual es colocar el origen en el punto de partida y el sentido positivo en el sentido del movimiento. Lo importante es <b>mantener la elección</b> hasta el final del problema.</p>" +
    "<p>Además, el <b>reposo y el movimiento son relativos</b>: un pasajero sentado en un tren está en reposo respecto del tren y se mueve a 80 km/h respecto del andén. Siempre hay que decir «respecto de qué». En este tema todos los movimientos se describen respecto de la Tierra (el suelo), que consideramos en reposo.</p>" +
    "<h5>El modelo de partícula</h5>" +
    "<p>Para estudiar el movimiento de un coche entre dos ciudades no importa que tenga cuatro ruedas, ni cuánto mide: lo tratamos como un <b>punto material</b> que se mueve sobre una línea. Esta simplificación es válida cuando el tamaño del objeto es despreciable frente a las distancias que recorre. Deja de valer, por ejemplo, para estudiar cómo gira una rueda o cuánto tarda un tren de 300 m en cruzar un túnel (ahí la longitud del tren sí cuenta, y lo veremos en los ejercicios).</p>" +
    "<h5>Posición, desplazamiento y distancia recorrida: tres cosas distintas</h5>" +
    tabla(["Magnitud", "Definición", "Signo", "Unidad SI"], [
      ["Posición x", "dónde está el móvil respecto del origen y del eje", "+ o −", "m"],
      ["Desplazamiento Δx", "x − x₀ (posición final menos inicial)", "+ o − (o 0)", "m"],
      ["Distancia recorrida s", "longitud total del camino seguido (suma de los trozos, todos en valor absoluto)", "siempre ≥ 0", "m"]
    ]) +
    ejemplo("Ida y vuelta", "Un corredor parte de x₀ = 10 m, llega a x = 40 m y regresa hasta x = 25 m. Calcula el desplazamiento total y la distancia recorrida.", [
      "<b>Desplazamiento</b>: Δx = x<sub>final</sub> − x<sub>inicial</sub> = 25 − 10 = <b>+15 m</b> (sólo cuentan el principio y el final).",
      "<b>Distancia</b>: ida = 40 − 10 = 30 m; vuelta = |25 − 40| = 15 m; total s = 30 + 15 = <b>45 m</b>.",
      "Observa que la distancia (45 m) es mayor que el módulo del desplazamiento (15 m). Sólo coinciden si el móvil <b>no cambia de sentido</b>."
    ]) +
    "<p>Si un móvil da una vuelta completa a una pista y termina donde empezó, su desplazamiento es 0 aunque haya recorrido kilómetros. Por eso la <b>velocidad media</b> de una vuelta completa es cero, mientras que su <b>rapidez media</b> no lo es: lo verás en el siguiente apartado.</p>" +
    "<h5>Trayectoria y tipos de movimiento</h5>" +
    "<p>La <b>trayectoria</b> es la línea que describe el móvil al moverse. Según su forma, el movimiento es <b>rectilíneo</b> (recta), <b>circular</b> (circunferencia: Tema 9), <b>parabólico</b> (parábola: lo veremos en este tema con el tiro oblicuo), etc. En el movimiento rectilíneo basta una coordenada x; en uno parabólico hacen falta dos (x, y) y entonces hay que usar vectores (Tema 7).</p>" +
    "<h5>Instante e intervalo de tiempo</h5>" +
    "<p>Un <b>instante</b> es un valor concreto del reloj (t = 3 s). Un <b>intervalo</b> es la diferencia entre dos instantes (Δt = t − t₀). Si se pone en marcha el cronómetro al empezar, t₀ = 0 y entonces Δt = t. Muchos errores en los problemas vienen de confundir «a los 5 s» (un instante) con «durante 5 s» (un intervalo): en el segundo caso, el tiempo transcurrido es 5 s, pero ¿desde cuándo? Hay que leer con calma el enunciado.</p>" +
    "<h5>Unidades, análisis dimensional y cifras significativas</h5>" +
    "<p>En el Sistema Internacional (SI) la longitud se mide en metros (m), el tiempo en segundos (s) y la masa en kilogramos (kg). Todas las demás magnitudes de este tema se obtienen combinándolas: la velocidad en m/s, la aceleración en m/s². Para comprobar una fórmula basta con ver si las <b>unidades</b> (dimensiones) de los dos miembros coinciden: x = x₀ + v·t es coherente porque (m/s)·s = m, pero x = v·t² no lo es (daría m·s). Es un control rápido que detecta fórmulas mal recordadas.</p>" +
    "<p>Para pasar de unas unidades a otras se multiplica por <b>factores de conversión</b> (fracciones iguales a 1). Por ejemplo, 72 km/h a m/s: 72 · (1 000 m / 1 km) · (1 h / 3 600 s) = 20 m/s. De ahí sale la regla práctica <b>1 m/s = 3,6 km/h</b>: para pasar de km/h a m/s se divide entre 3,6; de m/s a km/h se multiplica por 3,6.</p>" +
    ejemplo("Conversión con factores", "Expresa 54 km/h en m/s y 8 m/s en km/h.", [
      "54 km/h = 54 · 1 000 m / 3 600 s = <b>15 m/s</b> (o 54 : 3,6 = 15).",
      "8 m/s = 8 · 3,6 = <b>28,8 km/h</b>."
    ]) +
    "<p>Los resultados se dan con un número razonable de <b>cifras significativas</b>: no tiene sentido dar 3,4722222 m/s² cuando los datos tienen dos o tres cifras. La regla práctica en este curso: da el resultado con tantas cifras significativas como el dato menos preciso (normalmente 3) y no redondees los pasos intermedios.</p>" +
    w("f8_unidades");

  // ---------------------------------------------------------------- 2. Velocidad media e instantánea
  P.secciones[1] =
    "<h5>Velocidad media: un vector con signo</h5>" +
    "<p>La velocidad media entre dos instantes es el cociente entre el desplazamiento (¡no la distancia!) y el tiempo empleado. Es una magnitud <b>con signo</b>: positiva si el móvil se ha desplazado en el sentido positivo del eje y negativa en caso contrario.</p>" +
    "<div class='formula-wrap'><div class='formula'>v<sub>m</sub> = " + fr("Δx", "Δt") + " = " + fr("x − x₀", "t − t₀") + "</div></div>" +
    "<p>Cuando lo que se quiere es el <b>cuánto ha corrido en total por unidad de tiempo</b>, se usa la <b>rapidez media</b> (o celeridad): rapidez media = distancia recorrida / tiempo. Es siempre positiva. La rapidez coincide con el módulo de la velocidad media sólo si no hay cambios de sentido.</p>" +
    ejemplo("Velocidad media frente a rapidez media", "Un ciclista va de A a B (30 km) en 1,5 h y vuelve a A en 1 h. Calcula su velocidad media y su rapidez media en todo el recorrido.", [
      "Desplazamiento total: sale de A y vuelve a A → Δx = 0. Velocidad media = 0 / 2,5 h = <b>0 km/h</b>.",
      "Distancia total: 30 + 30 = 60 km. Rapidez media = 60 km / 2,5 h = <b>24 km/h</b>.",
      "El ciclista se ha esforzado (24 km/h de media) aunque su velocidad media sea cero."
    ]) +
    "<h5>La media de las velocidades no es la velocidad media</h5>" +
    "<p>Error clásico: «voy a 60 km/h a la ida y a 40 km/h a la vuelta, luego la media es 50 km/h». Es falso: el tiempo que se pasa a cada velocidad no es el mismo (se tarda más a 40 km/h). La velocidad media debe calcularse siempre con <b>distancia total entre tiempo total</b>.</p>" +
    ejemplo("Ida a 60 y vuelta a 40", "Un coche recorre un trayecto de d km a 60 km/h y regresa por el mismo camino a 40 km/h. ¿Cuál es su rapidez media?", [
      "Tiempo de ida: d/60. Tiempo de vuelta: d/40. Tiempo total: d(1/60 + 1/40) = d · 5/120 = d/24.",
      "Distancia total: 2d. Rapidez media = 2d / (d/24) = <b>48 km/h</b> (no 50).",
      "Es la <b>media armónica</b> de 60 y 40: 2·60·40/(60 + 40) = 48. Siempre es menor que la aritmética."
    ]) +
    ejemplo("Tres tramos", "Una etapa tiene tres tramos: 20 km a 80 km/h, 30 km a 100 km/h y 10 km a 50 km/h. Calcula la velocidad media.", [
      "Tiempos: 20/80 = 0,25 h; 30/100 = 0,30 h; 10/50 = 0,20 h. Tiempo total = 0,75 h.",
      "Distancia total = 60 km. Velocidad media = 60 / 0,75 = <b>80 km/h</b>."
    ]) +
    "<h5>Velocidad instantánea: el velocímetro</h5>" +
    "<p>La velocidad media no dice qué pasa en cada momento. La <b>velocidad instantánea</b> es la velocidad en un instante concreto: lo que marca el velocímetro. Se obtiene calculando la velocidad media en intervalos de tiempo <b>cada vez más pequeños</b> alrededor de ese instante:</p>" +
    "<div class='formula-wrap'><div class='formula'>v = lím<sub>Δt→0</sub> " + fr("Δx", "Δt") + " = " + fr("dx", "dt") + "</div></div>" +
    "<p>Es exactamente la <b>derivada</b> de la posición respecto del tiempo (Matemáticas I, tema 11). En la gráfica x–t, la velocidad instantánea es la <b>pendiente de la recta tangente</b> a la curva en ese instante; la velocidad media entre dos instantes es la pendiente de la <b>secante</b> que une los dos puntos. Si la gráfica es una recta, tangente y secante coinciden y la velocidad es constante (MRU).</p>" +
    ejemplo("Velocidad instantánea por aproximación", "La posición de un móvil es x = 2t² (m, s). Calcula la velocidad media entre t = 3 s y t = 3 + Δt para Δt = 1; 0,1 y 0,01 s, y deduce la velocidad instantánea en t = 3 s.", [
      "x(3) = 18 m. Para Δt = 1: x(4) = 32 → v<sub>m</sub> = (32 − 18)/1 = 14 m/s.",
      "Δt = 0,1: x(3,1) = 19,22 → v<sub>m</sub> = 1,22/0,1 = 12,2 m/s. Δt = 0,01: x(3,01) = 18,1202 → v<sub>m</sub> = 12,02 m/s.",
      "Los valores se acercan a <b>12 m/s</b>: ésa es la velocidad instantánea en t = 3 s (con la derivada: x' = 4t = 12 ✓)."
    ]) +
    "<p>Interpretación práctica: cuando un radar de tramo mide la velocidad media entre dos puntos y te sanciona, se basa en la velocidad <i>media</i>; un radar fijo mide la velocidad <i>instantánea</i> en un punto.</p>" +
    "<h5>Velocidad: rapidez, signo y unidades</h5>" +
    "<p>El signo de la velocidad indica el <b>sentido</b> del movimiento (+ en el sentido positivo del eje, − en el contrario) y su valor absoluto es la <b>rapidez</b> instantánea. Así, v = −15 m/s significa que el móvil se mueve a 15 m/s en el sentido negativo del eje. Para comparar, una persona camina a unos 1,4 m/s (5 km/h), un coche en autovía va a 33 m/s (120 km/h) y el sonido en el aire a 340 m/s.</p>";

  // ---------------------------------------------------------------- 3. MRU
  P.secciones[2] =
    "<h5>La ecuación, de dónde sale y cómo se usa</h5>" +
    "<p>Si la velocidad es constante, la velocidad media en cualquier intervalo coincide con ella: v = Δx/Δt. Despejando la posición final se obtiene la ecuación del MRU:</p>" +
    "<div class='formula-wrap'><div class='formula'>x = x₀ + v·t</div></div>" +
    "<p>Con <b>x₀</b> la posición en t = 0 y <b>v</b> con su signo. Es una función afín en t: la recta de ordenada en el origen x₀ y pendiente v (la misma que viste en Matemáticas I, funciones afines). Por eso la gráfica x–t de un MRU es una <b>recta</b>: creciente si v &gt; 0, decreciente si v &lt; 0 y horizontal si v = 0 (reposo). La gráfica v–t es una recta horizontal y el <b>área</b> bajo ella entre 0 y t, un rectángulo de base t y altura v, vale v·t, es decir, el desplazamiento.</p>" +
    tabla(["Gráfica", "Forma en un MRU", "Qué se lee"], [
      ["x–t", "recta", "pendiente = velocidad; corte con el eje x = posición inicial"],
      ["v–t", "recta horizontal", "altura = velocidad; área = desplazamiento"],
      ["a–t", "coincide con el eje (a = 0)", "no hay aceleración"]
    ]) +
    w("f8_movil") +
    "<h5>Cómo se resuelve un problema de MRU</h5>" +
    "<ol><li>Dibuja la recta, el origen y el sentido positivo.</li><li>Anota para <b>cada móvil</b> su x₀ y su v (con signo).</li><li>Escribe su ecuación x = x₀ + v·t.</li><li>Lo que pidan (tiempo, posición, distancia) sale de sustituir o de igualar ecuaciones.</li><li>Comprueba unidades y que el resultado tenga sentido (tiempos ≥ 0).</li></ol>" +
    ejemplo("Un viaje en tren", "Un tren circula a 90 km/h con MRU. ¿Cuánto tarda en recorrer 45 km? ¿Qué distancia recorre en 20 min?", [
      "v = 90 km/h. De x = v·t → t = x/v = 45/90 = <b>0,5 h = 30 min</b>.",
      "20 min = 1/3 h → x = 90 · 1/3 = <b>30 km</b>."
    ]) +
    ejemplo("El eco: MRU del sonido", "Un excursionista grita frente a una pared de roca y oye el eco 3,0 s después. La velocidad del sonido es 340 m/s. ¿A qué distancia está la pared?", [
      "El sonido recorre ida y vuelta: distancia total = v·t = 340 · 3,0 = 1 020 m.",
      "La distancia a la pared es la mitad: <b>510 m</b>.",
      "(Es el mismo principio que usan los sónares y los murciélagos.)"
    ]) +
    ejemplo("Un tren cruza un túnel", "Un tren de 200 m de longitud viaja a 20 m/s y atraviesa un túnel de 800 m. ¿Cuánto tarda en cruzarlo por completo, desde que la locomotora entra hasta que sale el último vagón?", [
      "Aquí el tren <b>no</b> puede tratarse como un punto: hay que contar su longitud.",
      "La locomotora recorre el túnel (800 m) y además el tren debe terminar de salir (200 m más): distancia = 800 + 200 = 1 000 m.",
      "t = 1 000 / 20 = <b>50 s</b>."
    ]) +
    "<h5>La luz y los años luz</h5>" +
    "<p>La luz viaja en el vacío con velocidad constante c = 3,00·10⁸ m/s. Un año luz es la distancia que recorre en un año: 3,00·10⁸ · 3,156·10⁷ ≈ 9,46·10¹⁵ m. La luz del Sol tarda t = d/c = 1,50·10¹¹ / 3,00·10⁸ = 500 s ≈ 8 min 20 s en llegar a la Tierra: lo que ves del Sol es lo que había hace ocho minutos.</p>" +
    ojo("en un MRU la velocidad es constante, no «la posición». Y que x sea negativa no significa que el móvil retroceda: sólo indica que está a la izquierda del origen. Lo que indica el sentido del movimiento es el <b>signo de v</b>.");

  // ---------------------------------------------------------------- 4. Aceleración
  P.secciones[3] =
    "<h5>Qué mide la aceleración y en qué se mide</h5>" +
    "<p>La aceleración es la <b>rapidez de cambio de la velocidad</b>, igual que la velocidad es la rapidez de cambio de la posición. Su unidad en el SI es el <b>m/s²</b>: una aceleración de 3 m/s² significa que la velocidad aumenta 3 m/s <i>cada segundo</i>. (Un coche que pasa de 0 a 100 km/h en 8 s tiene una aceleración media de 27,8 m/s ÷ 8 s ≈ 3,5 m/s².)</p>" +
    "<div class='formula-wrap'><div class='formula'>a<sub>m</sub> = " + fr("Δv", "Δt") + " = " + fr("v − v₀", "t − t₀") + "     a = lím<sub>Δt→0</sub> " + fr("Δv", "Δt") + " = " + fr("dv", "dt") + "</div></div>" +
    "<p>Como la velocidad, la aceleración tiene <b>signo</b>. Pero atención: el signo de a por sí solo no dice si el móvil acelera o frena. Hay que compararlo con el signo de la velocidad:</p>" +
    tabla(["Signo de v", "Signo de a", "Qué ocurre", "Ejemplo"], [
      ["+", "+", "<b>acelera</b> (la rapidez aumenta)", "un coche que arranca hacia la derecha"],
      ["+", "−", "<b>frena</b> (la rapidez disminuye)", "un coche que frena yendo hacia la derecha"],
      ["−", "−", "<b>acelera</b> (más negativa: más rápido hacia la izquierda)", "un objeto que cae con el eje hacia arriba"],
      ["−", "+", "<b>frena</b>", "un coche que va a la izquierda y frena"]
    ]) +
    "<p>Regla: <b>acelera</b> si v y a tienen el <b>mismo signo</b>; <b>frena</b> si tienen <b>signos contrarios</b>. Un caso muy común: un coche que va hacia la derecha (v &gt; 0) y frena tiene a &lt; 0; una persona que dice «decelerar» en realidad habla de a con signo contrario a v. Si el frenado continúa tras detenerse, el móvil <b>da marcha atrás</b>: la velocidad cambia de signo y entonces v y a vuelven a tener el mismo signo y el móvil acelera hacia atrás.</p>" +
    ejemplo("Aceleración media", "Un tren de alta velocidad pasa de 72 km/h a 252 km/h en 50 s. Calcula su aceleración media.", [
      "Pasamos a m/s: 72 km/h = 20 m/s; 252 km/h = 70 m/s.",
      "a = (70 − 20)/50 = <b>1,0 m/s²</b>.",
      "Interpretación: la velocidad aumenta 1 m/s cada segundo."
    ]) +
    ejemplo("Frenar es acelerar con signo contrario", "Un coche circula a 25 m/s en el sentido positivo y frena hasta detenerse en 10 s. Calcula la aceleración.", [
      "v₀ = +25 m/s, v = 0, Δt = 10 s → a = (0 − 25)/10 = <b>−2,5 m/s²</b>.",
      "El signo negativo, con velocidad positiva, indica que frena."
    ]) +
    "<h5>La aceleración en las gráficas</h5>" +
    "<p>En la gráfica v–t, la <b>pendiente</b> de la recta (o de la tangente si es curva) es la aceleración. Si la gráfica v–t es una recta, a es constante y el movimiento es un <b>MRUA</b>; si es una curva, a varía. En la gráfica a–t, el área bajo la curva entre dos instantes es el <b>cambio de velocidad</b> Δv.</p>" +
    ejemplo("Valores de la aceleración que debes tener en la cabeza", "Ordena de menor a mayor: arranque de un metro (1 m/s²), caída libre (9,8 m/s²), coche deportivo 0–100 km/h en 3 s, frenada de emergencia de un coche (7–8 m/s²), despegue de un cohete espacial.", [
      "Deportivo: (27,8 m/s)/3 s ≈ 9,3 m/s² ≈ 0,95 g. Frenada: 7–8 m/s² ≈ 0,75 g. Caída libre: 9,8 m/s² = 1 g. Un astronauta en el despegue soporta unos 3 g ≈ 30 m/s².",
      "Orden: metro (1) &lt; frenada (7–8) &lt; deportivo (9,3) &lt; caída libre (9,8) &lt; cohete (~30)."
    ]) +
    ojo("«Velocidad cero» no significa «aceleración cero». Una piedra lanzada hacia arriba tiene v = 0 en lo más alto y sigue teniendo a = −9,8 m/s². Y al revés: un coche con velocidad constante de 120 km/h tiene a = 0 aunque vaya muy deprisa.");

  // ---------------------------------------------------------------- 5. MRUA
  P.secciones[4] =
    "<h5>De dónde salen las ecuaciones: el área bajo la gráfica v–t</h5>" +
    "<p>Con aceleración constante, la velocidad cambia linealmente: v = v₀ + a·t (la gráfica v–t es una recta de pendiente a). El <b>desplazamiento</b> entre 0 y t es el área bajo esa recta: un trapecio de bases v₀ y v, y altura t:</p>" +
    "<div class='formula-wrap'><div class='formula'>Δx = " + fr("v₀ + v", "2") + " · t = " + fr("v₀ + v₀ + a·t", "2") + " · t = v₀·t + ½·a·t²</div></div>" +
    "<p>(El trapecio se descompone en un rectángulo de base t y altura v₀, que da v₀·t, y un triángulo de base t y altura a·t, que da ½·a·t².) Esta es la ecuación de la posición. Y eliminando t entre las dos primeras (t = (v − v₀)/a) se obtiene la tercera:</p>" +
    tabla(["Ecuación", "Magnitud que NO contiene", "Cuándo usarla"], [
      ["v = v₀ + a·t", "Δx", "te piden o te dan velocidades y tiempos"],
      ["Δx = v₀·t + ½·a·t²", "v", "no hace falta la velocidad final"],
      ["v² = v₀² + 2a·Δx", "t", "no te dan ni te piden el tiempo (frenadas, caídas desde una altura)"],
      ["Δx = ½(v₀ + v)·t", "a", "no hay aceleración en el enunciado o es una incógnita sin interés"]
    ]) +
    "<p>Como cada ecuación «se salta» una magnitud, con <b>tres datos</b> (de las cinco magnitudes v₀, v, a, t, Δx) siempre se puede encontrar una ecuación que contenga los tres datos y una de las incógnitas; con ella se calcula esa incógnita y después la otra. El resolvedor interactivo muestra cómo:</p>" +
    w("f8_ecuaciones") +
    "<h5>Método de resolución en seis pasos</h5>" +
    "<ol><li><b>Dibuja</b> la situación y elige origen y sentido positivo.</li><li><b>Datos</b>: pasa todo al SI y escribe v₀, v, a, t y Δx con su signo (poniendo «?» a las incógnitas).</li><li><b>Elige</b> la ecuación que contenga las magnitudes conocidas y la incógnita.</li><li><b>Despeja</b> literalmente y <b>después</b> sustituye con unidades.</li><li>Si sale un 2.º grado, <b>interpreta las dos soluciones</b> (tiempos negativos no valen).</li><li><b>Comprueba</b>: unidades, signo y orden de magnitud.</li></ol>" +
    ejemplo("Frenada: usando v² = v₀² + 2aΔx", "Un coche circula a 90 km/h y frena con aceleración de −5 m/s². Calcula la distancia y el tiempo de frenado.", [
      "v₀ = 90 km/h = 25 m/s; v = 0; a = −5 m/s². Incógnitas: Δx y t.",
      "Sin tiempo: 0 = 25² + 2·(−5)·Δx → Δx = 625/10 = <b>62,5 m</b>.",
      "Con v = v₀ + at: 0 = 25 − 5t → t = <b>5 s</b>.",
      "Comprobación con Δx = ½(v₀ + v)t = ½·25·5 = 62,5 m ✓."
    ]) +
    ejemplo("Un adelantamiento", "Un coche que lleva 20 m/s acelera con 1,5 m/s² durante 8 s para adelantar. Calcula su velocidad final y la distancia recorrida.", [
      "v₀ = 20 m/s, a = 1,5 m/s², t = 8 s.",
      "v = 20 + 1,5·8 = <b>32 m/s</b> (115 km/h).",
      "Δx = 20·8 + ½·1,5·8² = 160 + 48 = <b>208 m</b>."
    ]) +
    ejemplo("Con cambio de sentido", "Una pelota rueda por un plano con v₀ = +6 m/s y a = −2 m/s². Calcula cuándo se detiene, dónde está entonces, y su posición y velocidad a los 5 s (x₀ = 0).", [
      "Se detiene cuando v = 0: 0 = 6 − 2t → <b>t = 3 s</b>. Posición: x = 6·3 − ½·2·9 = 18 − 9 = <b>9 m</b> (punto de máximo alejamiento).",
      "A los 5 s: v = 6 − 2·5 = <b>−4 m/s</b> (vuelve hacia el origen) y x = 6·5 − ½·2·25 = 30 − 25 = <b>5 m</b>.",
      "Desplazamiento en 5 s: +5 m; distancia recorrida: 9 + (9 − 5) = 13 m. Fíjate en que no son iguales: hubo cambio de sentido."
    ]) +
    ejemplo("Distancia recorrida en un segundo concreto", "Un móvil parte del reposo con a = 4 m/s². ¿Qué distancia recorre durante el 5.º segundo (entre t = 4 s y t = 5 s)?", [
      "x(5) = ½·4·25 = 50 m; x(4) = ½·4·16 = 32 m.",
      "Durante el 5.º segundo: 50 − 32 = <b>18 m</b>. (En general, en el segundo n: a(2n − 1)/2 = 4·9/2 = 18 ✓.)"
    ]) +
    w("f8_graficas") +
    ojo("las ecuaciones del MRUA sólo valen si <b>a es constante</b>. Si cambia (por ejemplo, un coche que pisa el acelerador a tramos) hay que dividir el movimiento en tramos con aceleración constante y aplicar las ecuaciones a cada tramo con las condiciones iniciales del anterior.");

  // ---------------------------------------------------------------- 6. Caída libre
  P.secciones[5] =
    "<h5>Galileo y la caída de los cuerpos</h5>" +
    "<p>Aristóteles creía que los cuerpos pesados caen más deprisa que los ligeros. Galileo demostró lo contrario con experimentos con planos inclinados y razonamientos: <b>en el vacío (sin rozamiento del aire) todos los cuerpos caen con la misma aceleración</b>, independientemente de su masa. La experiencia cotidiana parece contradecirlo (una pluma cae más despacio que una piedra), pero eso se debe a la <b>resistencia del aire</b>, no a la gravedad. En 1971, el astronauta David Scott dejó caer a la vez un martillo y una pluma en la Luna (sin atmósfera): llegaron juntos al suelo.</p>" +
    "<h5>Ecuaciones con el eje hacia arriba</h5>" +
    "<p>Tomamos como origen el suelo y el eje y <b>positivo hacia arriba</b>; entonces la aceleración es a = −g (negativa, porque apunta hacia abajo), con g = 9,8 m/s² en la superficie de la Tierra. Las ecuaciones del MRUA se convierten en:</p>" +
    "<div class='formula-wrap'><div class='formula'>v = v₀ − g·t     y = y₀ + v₀·t − ½·g·t²     v² = v₀² − 2g(y − y₀)</div></div>" +
    "<p>con v₀ positiva si se lanza hacia arriba, negativa si se lanza hacia abajo y cero si se deja caer. Es el mismo MRUA de siempre: lo único «nuevo» es el valor de la aceleración. (Si prefieres el eje hacia abajo, a = +g; lo importante es ser coherente.)</p>" +
    w("f8_caida") +
    "<h5>Lanzamiento vertical hacia arriba: cuatro resultados que conviene saber</h5>" +
    "<ol><li>La velocidad en el punto más alto es <b>cero</b> (y es el momento en que cambia de signo). Eso da el tiempo de subida: t<sub>sub</sub> = v₀/g.</li>" +
    "<li>La altura máxima sobre el punto de lanzamiento es h<sub>máx</sub> = v₀²/(2g) (de v² = v₀² − 2gh con v = 0).</li>" +
    "<li><b>Subida y bajada son simétricas</b>: el tiempo que tarda en subir es igual al que tarda en bajar hasta el mismo nivel, y vuelve al punto de lanzamiento con la misma rapidez v₀ (con signo contrario).</li>" +
    "<li>El tiempo de vuelo hasta el mismo nivel es t = 2v₀/g.</li></ol>" +
    ejemplo("Una pelota lanzada hacia arriba", "Se lanza una pelota hacia arriba con v₀ = 14,7 m/s desde el suelo. Calcula el tiempo de subida, la altura máxima y el tiempo total de vuelo (g = 9,8 m/s²).", [
      "Tiempo de subida: v = 0 = 14,7 − 9,8t → t = <b>1,5 s</b>.",
      "Altura máxima: h = v₀²/(2g) = 14,7²/19,6 = 216,09/19,6 = <b>11,0 m</b>.",
      "Tiempo total: 2·1,5 = <b>3,0 s</b>. Velocidad al volver al suelo: −14,7 m/s."
    ]) +
    ejemplo("Desde un puente", "Desde un puente de 30 m sobre un río se lanza una piedra hacia arriba con 10 m/s. ¿Cuánto tarda en llegar al agua y con qué velocidad?", [
      "Eje hacia arriba, origen en el agua: y₀ = 30 m, v₀ = +10 m/s, y = 0.",
      "0 = 30 + 10t − 4,9t² → 4,9t² − 10t − 30 = 0 → t = (10 ± √(100 + 588))/9,8 = (10 ± 26,23)/9,8.",
      "La solución con sentido físico es <b>t = 3,70 s</b> (la otra, −1,66 s, es negativa y se descarta).",
      "Velocidad: v = 10 − 9,8·3,70 = <b>−26,2 m/s</b> (hacia abajo, ≈ 94 km/h)."
    ]) +
    ejemplo("El pozo y el sonido", "Dejas caer una piedra a un pozo y oyes el choque con el fondo 4,5 s después de soltarla. Si la velocidad del sonido es 340 m/s, ¿qué profundidad tiene el pozo?", [
      "Hay dos fases: la caída (tiempo t₁, con h = ½gt₁²) y la subida del sonido (tiempo t₂ = h/340). t₁ + t₂ = 4,5 s.",
      "4,9t₁² = h y t₂ = 4,9t₁²/340. Entonces t₁ + 4,9t₁²/340 = 4,5 → 4,9t₁² + 340t₁ − 1530 = 0.",
      "t₁ = (−340 + √(340² + 4·4,9·1530))/9,8 = (−340 + 381,6)/9,8 = 4,24 s → h = 4,9·4,24² = <b>88,1 m</b>.",
      "Si hubieras ignorado el sonido: h = ½·9,8·4,5² = 99,2 m (un 13 % de error)."
    ]) +
    "<h5>g depende del astro, no del cuerpo</h5>" +
    tabla(["Astro", "g (m/s²)", "Una piedra tarda en caer 20 m"], [
      ["Tierra", "9,8", "2,0 s"], ["Luna", "1,62", "5,0 s"], ["Marte", "3,71", "3,3 s"], ["Júpiter", "24,8", "1,3 s"]
    ]) +
    "<p>El valor de g viene de la ley de gravitación (Tema 11): depende de la masa y del radio del astro, no de la masa del cuerpo que cae. Por eso un astronauta salta mucho más alto en la Luna: con la misma v₀, la altura v₀²/(2g) es seis veces mayor.</p>" +
    "<h5>Y el rozamiento del aire</h5>" +
    "<p>La caída libre es un modelo idealizado. En el aire, una fuerza de rozamiento que crece con la velocidad se opone al movimiento; la aceleración disminuye hasta que el peso y el rozamiento se igualan y el cuerpo cae con <b>velocidad constante</b> (velocidad límite). Para un paracaidista en caída abierta es de unos 55 m/s (200 km/h); con el paracaídas abierto, unos 5 m/s. Nosotros despreciaremos el rozamiento, salvo que se diga lo contrario.</p>";
})(window);
