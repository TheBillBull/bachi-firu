/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 8: Cinemática (rectilíneo)
   Parte B: secciones nuevas y actividades de datos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t8/" + ref); }
  var P = B._fq8;

  P.nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Composición de movimientos: tiro horizontal y tiro oblicuo",
      html:
        "<h5>El principio de independencia de movimientos (Galileo)</h5>" +
        "<p>Cuando un cuerpo realiza <b>dos movimientos a la vez</b> en direcciones perpendiculares, cada uno se desarrolla <b>como si el otro no existiera</b>; la posición real es la combinación (suma vectorial) de las dos. Es el principio de independencia de movimientos, enunciado por Galileo. Un ejemplo clásico: si se suelta una bola desde la altura de la mesa y, a la vez, se dispara otra horizontalmente desde el mismo punto, <b>las dos llegan al suelo en el mismo instante</b>: la bola disparada avanza horizontalmente, pero su movimiento vertical es una caída libre idéntica a la de la otra.</p>" +
        "<p>Un <b>proyectil</b> (sin rozamiento del aire) combina:</p>" +
        "<ul><li><b>Eje horizontal (x)</b>: no hay aceleración → <b>MRU</b> con velocidad constante vₓ = v₀·cos θ.</li><li><b>Eje vertical (y)</b>: la aceleración es −g → <b>MRUA</b> (caída libre / lanzamiento vertical) con v<sub>y0</sub> = v₀·sen θ.</li></ul>" +
        tabla(["", "Horizontal", "Vertical"], [
          ["Aceleración", "0", "−g"],
          ["Velocidad", "vₓ = v₀·cos θ (constante)", "v<sub>y</sub> = v₀·sen θ − g·t"],
          ["Posición", "x = x₀ + v₀·cos θ·t", "y = y₀ + v₀·sen θ·t − ½·g·t²"]
        ]) +
        "<p>Eliminando t entre las dos ecuaciones de posición se obtiene la <b>ecuación de la trayectoria</b>: y = y₀ + x·tan θ − g·x²/(2v₀²cos²θ), que es una <b>parábola</b>. La velocidad en cada instante es tangente a la trayectoria: su módulo es √(vₓ² + v<sub>y</sub>²) y su ángulo con la horizontal tan α = v<sub>y</sub>/vₓ.</p>" +
        w("f8_parabolico") +
        "<h5>Tiro horizontal (θ = 0)</h5>" +
        "<p>Es el caso en que el cuerpo sale con velocidad horizontal v₀ desde una altura h: v₀<sub>y</sub> = 0. El tiempo de caída sólo depende de la altura: t = √(2h/g). El alcance es x = v₀·t.</p>" +
        ejemplo("Una bola que sale de una mesa", "Una bola sale rodando de una mesa de 1,8 m de altura con velocidad horizontal de 4,0 m/s. Calcula el tiempo de caída, el alcance y la velocidad con que llega al suelo (g = 9,8 m/s²).", [
          "Tiempo: 1,8 = ½·9,8·t² → t² = 0,3673 → <b>t = 0,606 s</b> (no depende de los 4 m/s).",
          "Alcance: x = v₀·t = 4,0 · 0,606 = <b>2,42 m</b>.",
          "Velocidad: vₓ = 4,0 m/s (no cambia); v<sub>y</sub> = −g·t = −5,94 m/s. Módulo = √(4,0² + 5,94²) = <b>7,16 m/s</b>, con ángulo α = arctan(5,94/4,0) = <b>56,0°</b> bajo la horizontal."
        ]) +
        "<h5>Tiro oblicuo desde el suelo</h5>" +
        "<p>Se lanza con velocidad v₀ y ángulo θ sobre la horizontal. Si el lanzamiento y la caída están al mismo nivel (y₀ = 0 y se termina en y = 0), se obtienen tres resultados de gran utilidad:</p>" +
        tabla(["Magnitud", "Fórmula", "Cómo sale"], [
          ["Tiempo de subida", "t<sub>s</sub> = v₀·sen θ / g", "v<sub>y</sub> = 0 en el punto más alto"],
          ["Altura máxima", "h<sub>máx</sub> = v₀²·sen²θ / (2g)", "v<sub>y</sub>² = v<sub>y0</sub>² − 2g·h con v<sub>y</sub> = 0"],
          ["Tiempo de vuelo", "t<sub>v</sub> = 2·v₀·sen θ / g", "y = 0 (subida + bajada simétricas)"],
          ["Alcance", "R = v₀²·sen 2θ / g", "R = vₓ·t<sub>v</sub> con 2 sen θ cos θ = sen 2θ"]
        ]) +
        ejemplo("Un lanzamiento con números «bonitos»", "Un balón sale del suelo con v₀ = 25 m/s y un ángulo de 53,13° (sen = 0,8; cos = 0,6). Calcula las componentes, el tiempo de vuelo, la altura máxima y el alcance.", [
          "vₓ = 25·0,6 = <b>15 m/s</b>; v<sub>y0</sub> = 25·0,8 = <b>20 m/s</b>.",
          "t<sub>s</sub> = 20/9,8 = 2,04 s → <b>t<sub>v</sub> = 4,08 s</b>.",
          "h<sub>máx</sub> = 20²/(2·9,8) = <b>20,4 m</b>.",
          "Alcance = 15 · 4,08 = <b>61,2 m</b>. Comprobación: v₀² sen 2θ/g = 625·sen 106,26°/9,8 = 625·0,96/9,8 = 61,2 m ✓."
        ]) +
        "<h5>Ángulos complementarios y alcance máximo</h5>" +
        "<p>Como sen 2θ = sen(180° − 2θ) = sen 2(90° − θ), los ángulos <b>complementarios</b> θ y 90° − θ dan <b>el mismo alcance</b> (pero la trayectoria de θ mayor es más alta y tarda más). El alcance máximo para una v₀ dada se obtiene con sen 2θ = 1, es decir, <b>θ = 45°</b>, y vale R<sub>máx</sub> = v₀²/g. Con v₀ = 30 m/s: R<sub>máx</sub> = 900/9,8 = 91,8 m. Activa el ángulo complementario en el simulador de arriba para verlo.</p>" +
        "<h5>Lanzamiento desde una altura</h5>" +
        "<p>Si se lanza desde una altura y₀ = h₀, las fórmulas «bonitas» dejan de valer (la trayectoria no es simétrica) y hay que resolver y = 0 en la ecuación de la posición vertical: h₀ + v₀senθ·t − ½gt² = 0 (ecuación de 2.º grado: sirve la raíz positiva).</p>" +
        ejemplo("Lanzamiento de peso", "Un atleta lanza un peso con v₀ = 13 m/s y un ángulo de 40° desde una altura de 2,0 m. Calcula el tiempo de vuelo, el alcance y la velocidad con que llega al suelo.", [
          "vₓ = 13·cos 40° = 9,96 m/s; v<sub>y0</sub> = 13·sen 40° = 8,36 m/s.",
          "0 = 2 + 8,36t − 4,9t² → t = (8,36 + √(8,36² + 4·4,9·2))/(2·4,9) = (8,36 + 10,44)/9,8 = <b>1,92 s</b>.",
          "Alcance horizontal = 9,96 · 1,92 = <b>19,1 m</b>.",
          "Al llegar: v<sub>y</sub> = 8,36 − 9,8·1,92 = −10,4 m/s → |v| = √(9,96² + 10,4²) = <b>14,4 m/s</b>. Fíjate: coincide con √(v₀² + 2g·h₀) = √(169 + 39,2) = 14,4 m/s (lo entenderás con la conservación de la energía, Tema 12)."
        ]) +
        ojo("el tiempo de vuelo lo decide <b>sólo el movimiento vertical</b>; el movimiento horizontal sólo decide hasta dónde llega en ese tiempo. Y en el punto más alto la velocidad <b>no es cero</b>: vale vₓ (sólo se anula la componente vertical).")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Gráficas del movimiento: leer, interpretar y construir",
      html:
        "<p>Las tres gráficas de un movimiento (x–t, v–t, a–t) cuentan la misma historia de tres maneras. Cada una se obtiene de la anterior calculando <b>pendientes</b> (hacia la derecha: de x a v y de v a a) o <b>áreas</b> (hacia la izquierda).</p>" +
        tabla(["De…", "a…", "Se usa", "Ejemplo"], [
          ["x–t", "v–t", "pendiente (derivada)", "recta de pendiente 5 → v = 5 m/s"],
          ["v–t", "a–t", "pendiente", "recta de pendiente −2 → a = −2 m/s²"],
          ["a–t", "v–t", "área (integral)", "área de 3 m/s² · 4 s = 12 → Δv = 12 m/s"],
          ["v–t", "x–t", "área", "trapecio de bases 4 y 10 y altura 6 → Δx"]
        ]) +
        tabla(["Movimiento", "x–t", "v–t", "a–t"], [
          ["Reposo", "recta horizontal", "sobre el eje (v = 0)", "sobre el eje"],
          ["MRU", "recta inclinada", "recta horizontal", "sobre el eje"],
          ["MRUA acelerado (a &gt; 0, v &gt; 0)", "parábola que se empina", "recta ascendente", "recta horizontal positiva"],
          ["MRUA frenando (a &lt; 0, v &gt; 0)", "parábola que se aplana", "recta descendente", "recta horizontal negativa"]
        ]) +
        "<h5>Cómo leer una gráfica x–t</h5>" +
        "<ul><li><b>Posición inicial</b>: el punto en que la curva corta al eje x (t = 0).</li><li><b>Velocidad</b>: la pendiente. Sube la recta → v &gt; 0; baja → v &lt; 0; horizontal → parado. En una curva, la pendiente de la tangente da la velocidad instantánea.</li><li><b>Dos curvas que se cortan</b> → los dos móviles <b>se encuentran</b> (misma posición en el mismo instante).</li><li><b>Un máximo</b> (cima de la curva) → el móvil se para y da marcha atrás.</li></ul>" +
        "<h5>Cómo leer una gráfica v–t</h5>" +
        "<ul><li><b>Aceleración</b>: la pendiente.</li><li><b>Desplazamiento</b>: el área entre la gráfica y el eje t (con signo: lo que queda por debajo del eje resta).</li><li><b>Distancia recorrida</b>: suma de todas las áreas en valor absoluto.</li><li><b>Cortes con el eje t</b>: instantes en que el móvil se detiene y/o cambia de sentido.</li></ul>" +
        ejemplo("Un trayecto en tres tramos", "La gráfica v–t de un coche es: crece de 0 a 12 m/s en 4 s, se mantiene en 12 m/s durante 6 s y baja a 0 en 2 s. Calcula las aceleraciones de cada tramo y la distancia total.", [
          "Aceleraciones: tramo 1: (12 − 0)/4 = <b>+3 m/s²</b>; tramo 2: <b>0</b>; tramo 3: (0 − 12)/2 = <b>−6 m/s²</b>.",
          "Áreas: triángulo 1: ½·4·12 = 24 m; rectángulo: 6·12 = 72 m; triángulo 3: ½·2·12 = 12 m.",
          "Distancia total = 24 + 72 + 12 = <b>108 m</b> (en 12 s: velocidad media 9 m/s)."
        ]) +
        w("f8_graficas") +
        ejemplo("Construir las tres gráficas", "Un móvil parte de x₀ = 5 m con v₀ = 2 m/s y a = 1 m/s². Describe sus gráficas entre 0 y 4 s.", [
          "a–t: recta horizontal en a = 1 m/s².",
          "v–t: v = 2 + t: recta que va de 2 a 6 m/s (pendiente 1).",
          "x–t: x = 5 + 2t + ½t²: parábola con puntos (0, 5), (1, 7,5), (2, 11), (3, 15,5), (4, 21) m."
        ]) +
        ojo("la gráfica x–t <b>no es la trayectoria</b>: la trayectoria de un MRU es una línea recta en el espacio, aunque su gráfica x–t sea una recta inclinada. Y una curva ascendente en x–t no significa que el móvil «suba»: significa que se aleja del origen.") +
        w("f8_leerxt")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Encuentros y alcances: dos móviles, una ecuación",
      html:
        "<p>Muchos problemas de cinemática hablan de <b>dos móviles</b>: se cruzan, se persiguen, uno adelanta a otro. El método es siempre el mismo:</p>" +
        "<ol><li>Elige <b>un único sistema de referencia</b> (mismo origen, mismo sentido positivo y <b>mismo reloj</b>) para los dos.</li>" +
        "<li>Escribe la ecuación de posición de <b>cada móvil</b> con sus x₀, v₀ y a (con signo). Si uno sale más tarde, usa (t − t<sub>retraso</sub>) en su ecuación.</li>" +
        "<li><b>Iguala</b> las posiciones: x<sub>A</sub>(t) = x<sub>B</sub>(t). Esa ecuación da el instante del encuentro.</li>" +
        "<li>Sustituye el tiempo en cualquiera de las dos para saber <b>dónde</b> se encuentran.</li>" +
        "<li>Interpreta: si sale una ecuación de 2.º grado, hay hasta dos encuentros; vale la raíz con t ≥ 0 (y dentro del tiempo en que existe el movimiento).</li></ol>" +
        w("f8_encuentro") +
        ejemplo("Dos ciclistas que se acercan", "Dos ciudades A y B están a 90 km. Un ciclista sale de A hacia B a 18 km/h y otro sale de B hacia A a 12 km/h, a la vez. ¿Cuándo y dónde se cruzan?", [
          "Origen en A, sentido positivo hacia B: x<sub>A</sub> = 18t; x<sub>B</sub> = 90 − 12t (se mueve en sentido negativo).",
          "Igualamos: 18t = 90 − 12t → 30t = 90 → <b>t = 3 h</b>.",
          "Posición: x = 18·3 = <b>54 km desde A</b> (el más rápido ha recorrido más). Atajo: se acercan a 18 + 12 = 30 km/h, y 90/30 = 3 h."
        ]) +
        ejemplo("Un alcance con retraso", "Un coche pasa por un punto con 15 m/s constantes. 8 s después, una moto sale del mismo punto con 20 m/s constantes. ¿Cuándo y dónde alcanza la moto al coche?", [
          "Reloj en marcha cuando pasa el coche (t = 0): x<sub>coche</sub> = 15t; x<sub>moto</sub> = 20(t − 8).",
          "20(t − 8) = 15t → 5t = 160 → <b>t = 32 s</b> (24 s tras salir la moto).",
          "x = 15·32 = <b>480 m</b>. La moto sale con 120 m de desventaja (15·8) y recupera 5 m cada segundo: 120/5 = 24 s ✓."
        ]) +
        ejemplo("Uno acelera y el otro no", "Un coche pasa con 20 m/s constantes por un semáforo en el instante en que otro coche, parado en el semáforo, arranca con 2,5 m/s². ¿Dónde y cuándo lo alcanza y qué velocidad lleva entonces?", [
          "Origen en el semáforo: x₁ = 20t; x₂ = ½·2,5·t² = 1,25t².",
          "20t = 1,25t² → t(1,25t − 20) = 0 → t = 0 (instante de partida) o <b>t = 16 s</b>.",
          "x = 20·16 = <b>320 m</b>. Velocidad del que arranca: v = 2,5·16 = <b>40 m/s</b>, el doble. (Siempre que parten del mismo punto y uno es MRUA desde el reposo, lo alcanza a la velocidad doble.)"
        ]) +
        ejemplo("Dos encuentros", "Dos móviles circulan por la misma recta. A lleva 3 m/s constantes y parte de x = 10 m. B parte del origen con 10 m/s y frena con a = −2 m/s². ¿Cuándo coinciden?", [
          "x<sub>A</sub> = 10 + 3t; x<sub>B</sub> = 10t − t².",
          "Igualando: 10 + 3t = 10t − t² → t² − 7t + 10 = 0 → t = (7 ± √9)/2 → <b>t = 2 s y t = 5 s</b>. Las dos raíces valen.",
          "En t = 2 s: x = 16 m; B (más rápido) adelanta a A. En t = 5 s: x = 25 m; B ya casi parado (v<sub>B</sub> = 10 − 2·5 = 0) y A le adelanta de nuevo.",
          "Moraleja: una ecuación de 2.º grado puede tener <b>dos</b> encuentros físicamente válidos."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Seguridad vial: distancia de reacción y distancia de frenado",
      html:
        "<p>Cuando un conductor ve un obstáculo, no frena al instante: transcurre un <b>tiempo de reacción</b> t<sub>r</sub> (unos 0,75 s en un conductor atento y descansado; 1,5 s o más si hay cansancio, alcohol o distracciones). Durante ese tiempo el coche sigue con la velocidad que llevaba (<b>MRU</b>) y recorre la <b>distancia de reacción</b> d<sub>r</sub> = v·t<sub>r</sub>. Después empieza a frenar con aceleración (negativa) a (<b>MRUA</b>), y recorre la <b>distancia de frenado</b> d<sub>f</sub> = v²/(2|a|). La distancia total de detención es la suma:</p>" +
        "<div class='formula-wrap'><div class='formula'>d = v·t<sub>r</sub> + " + fr("v²", "2·|a|") + "</div></div>" +
        w("f8_frenado") +
        "<p>Lo más importante: <b>d<sub>f</sub> crece con el cuadrado de la velocidad</b>. Si pasas de 50 a 100 km/h, la distancia de frenado se multiplica por 4 (y la de reacción por 2). Una frenada a 120 km/h con asfalto seco necesita casi 80 m; sobre hielo, más de 550 m.</p>" +
        ejemplo("Una frenada de emergencia", "Un coche circula a 72 km/h, el conductor tarda 0,75 s en reaccionar y el coche frena con 6,0 m/s². ¿A qué distancia debe estar un obstáculo para no chocar?", [
          "v = 72/3,6 = 20 m/s.",
          "Reacción: d<sub>r</sub> = 20 · 0,75 = 15 m. Frenado: d<sub>f</sub> = 20²/(2·6) = 400/12 = 33,3 m.",
          "Total: <b>48,3 m</b>. Si el obstáculo está a menos, habrá choque (con una velocidad menor que la inicial)."
        ]) +
        ejemplo("Velocidad del impacto", "En la situación anterior hay un obstáculo a 40 m. ¿Con qué velocidad se produce el choque?", [
          "Tras la reacción (15 m) quedan 25 m hasta el obstáculo, que se recorren frenando: v² = v₀² − 2|a|·25 = 400 − 300 = 100 → v = <b>10 m/s = 36 km/h</b>.",
          "Aunque la velocidad inicial era 72 km/h, el choque «sólo» es a 36 km/h: frenar, aunque no se llegue a tiempo, reduce mucho el daño (la energía cinética es proporcional a v², Tema 12: queda la cuarta parte)."
        ]) +
        "<h5>La regla de los dos segundos</h5>" +
        "<p>Para mantener una distancia de seguridad se recomienda dejar al menos <b>2 s</b> de separación con el coche de delante: a 90 km/h (25 m/s) son 50 m. Cubre el tiempo de reacción y parte de la frenada. Con mojado o mucho tráfico hay que aumentarla.</p>" +
        ojo("el tiempo de reacción no depende del coche sino del conductor, y por eso un coche con los mejores frenos del mundo no evita la distancia de reacción. Un conductor que mira el móvil 2,5 s a 90 km/h recorre 62 m sin ver nada: más de la mitad de un campo de fútbol.")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Método para resolver cualquier problema de cinemática",
      html:
        "<p>Un problema de cinemática es un problema de traducción: del lenguaje del enunciado al lenguaje de las ecuaciones. La mayor parte de los fallos no viene de las ecuaciones, sino de esa traducción. Ocho pasos para no perderte:</p>" +
        "<ol>" +
        "<li><b>Lee dos veces</b> y subraya los datos numéricos y lo que se pide.</li>" +
        "<li><b>Haz un dibujo</b>: la recta, el origen, el sentido positivo, las posiciones inicial y final, y la dirección de v y a.</li>" +
        "<li><b>Pasa todo al SI</b> (km/h → m/s, min → s, km → m).</li>" +
        "<li><b>Tabla de datos</b> con cada magnitud (x₀, v₀, v, a, t, Δx) con su signo; marca con «?» las incógnitas. Fíjate en las frases clave: «parte del reposo» (v₀ = 0), «se detiene» (v = 0), «frena» (a con signo contrario a v), «cae» (a = −g con el eje hacia arriba).</li>" +
        "<li><b>Elige la ecuación</b> con el criterio «¿cuál no contiene la magnitud que no tengo ni me piden?».</li>" +
        "<li><b>Despeja en letras y sustituye al final</b>, con unidades.</li>" +
        "<li><b>Comprueba</b>: ¿las unidades son las de la magnitud pedida? ¿el signo tiene sentido? ¿el orden de magnitud es razonable (un coche no frena en 2 mm)?</li>" +
        "<li><b>Responde con una frase</b>, con unidades y cifras significativas adecuadas.</li>" +
        "</ol>" +
        tabla(["Frase del enunciado", "Se traduce en…"], [
          ["«parte del reposo»", "v₀ = 0"],
          ["«se detiene», «frena hasta parar»", "v = 0"],
          ["«velocidad constante»", "a = 0 (MRU)"],
          ["«se deja caer»", "v₀ = 0 y a = ∓g"],
          ["«se lanza hacia arriba con…»", "v₀ &gt; 0 (eje hacia arriba) y a = −g"],
          ["«a los 5 s»", "t = 5 s (instante)"],
          ["«durante el 5.º segundo»", "intervalo entre t = 4 s y t = 5 s"],
          ["«sale 3 s más tarde»", "su tiempo es (t − 3) en la ecuación"],
          ["«a la misma altura / posición»", "se igualan las ecuaciones de posición"]
        ]) +
        "<h5>Análisis dimensional como detector de errores</h5>" +
        "<p>Antes de sustituir números, comprueba que los dos miembros de cada ecuación tienen las mismas unidades. Ejemplo: v² = v₀² + 2aΔx → (m/s)² = (m/s)² + (m/s²)·m = m²/s² ✓. Si hubieras escrito v² = v₀² + 2a·t, el término 2at sería (m/s²)·s = m/s, que no se puede sumar con m²/s²: la fórmula está mal.</p>" +
        ejemplo("Un problema completo, con el método", "Un camión de 12 m a 72 km/h es alcanzado por un coche de 4 m que va a 108 km/h. El coche está a 20 m detrás del camión (de la parte delantera del coche a la trasera del camión). ¿Cuánto tarda el coche en rebasarlo por completo si no cambia de velocidad y recupera su carril 20 m por delante?", [
          "<b>Datos en SI</b>: camión 72 km/h = 20 m/s; coche 108 km/h = 30 m/s. Velocidad relativa del coche respecto del camión: 30 − 20 = 10 m/s.",
          "<b>Distancia relativa que debe ganar</b>: 20 m (hasta tocar la trasera) + 12 m (longitud del camión) + 4 m (longitud del coche) + 20 m (margen delante) = 56 m.",
          "<b>Tiempo</b>: 56/10 = <b>5,6 s</b>. En ese tiempo el coche recorre 30·5,6 = 168 m (¡hay que asegurarse de que el carril contrario está libre al menos 168 m!).",
          "Comprobación de orden de magnitud: unos 6 s para un adelantamiento a esas velocidades es razonable."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Problemas resueltos tipo EvAU",
      html:
        "<p>Seis problemas de dificultad de examen, con solución completa. Intenta resolverlos tú antes de mirar.</p>" +
        ejemplo("1. Adelantamiento con aceleración", "Un turismo de 4 m va a 90 km/h detrás de un camión de 15 m que va a 72 km/h, a 30 m de él. El turismo acelera con 1,0 m/s² para adelantar y debe terminar 30 m por delante del camión. Calcula el tiempo que dura el adelantamiento, la distancia que recorre el turismo y su velocidad final.", [
          "Velocidades: turismo 25 m/s; camión 20 m/s. En el sistema del camión, el turismo va a 5 m/s con a = 1 m/s².",
          "Distancia relativa a ganar: 30 + 15 + 4 + 30 = 79 m. Ecuación: 79 = 5t + ½·1·t² → t² + 10t − 158 = 0 → t = (−10 + √(100 + 632))/2 = <b>8,53 s</b>.",
          "Distancia recorrida por el turismo: 25·8,53 + ½·1·8,53² = 213,2 + 36,4 = <b>249,6 m</b>. Velocidad final: 25 + 1·8,53 = <b>33,5 m/s = 120,7 km/h</b>."
        ]) +
        ejemplo("2. Gráfica v–t por tramos", "Un móvil sigue esta gráfica v–t: de (0 s, 0) a (4 s, 8 m/s), constante hasta 10 s, baja a 0 en t = 12 s y continúa hasta (16 s, −8 m/s). Calcula las aceleraciones, el desplazamiento y la distancia recorrida.", [
          "Aceleraciones: 8/4 = <b>2 m/s²</b>; 0; (0 − 8)/2 = <b>−4 m/s²</b>; (−8 − 0)/4 = <b>−2 m/s²</b>.",
          "Áreas: ½·4·8 = 16; 6·8 = 48; ½·2·8 = 8 (suma 72 m hacia delante); último tramo: ½·4·(−8) = −16 m.",
          "<b>Desplazamiento</b> = 72 − 16 = <b>56 m</b>. <b>Distancia</b> = 72 + 16 = <b>88 m</b>. El móvil se detiene y da marcha atrás en t = 12 s."
        ]) +
        ejemplo("3. Un ascensor", "Un ascensor sube desde el reposo con a = 1,2 m/s² durante 4 s, continúa con velocidad constante 6 s y frena con a = −1,6 m/s² hasta detenerse. ¿Cuánto sube en total y cuánto dura el viaje?", [
          "Tramo 1: v = 1,2·4 = 4,8 m/s; h₁ = ½·1,2·16 = 9,6 m.",
          "Tramo 2 (MRU): h₂ = 4,8·6 = 28,8 m.",
          "Tramo 3: t₃ = 4,8/1,6 = 3 s; h₃ = ½·4,8·3 = 7,2 m.",
          "<b>Altura total = 9,6 + 28,8 + 7,2 = 45,6 m</b>; <b>tiempo total = 4 + 6 + 3 = 13 s</b>."
        ]) +
        ejemplo("4. Un cañón y un barco", "Un cañón situado en lo alto de un acantilado de 80 m dispara horizontalmente a un barco que está a 120 m de la base del acantilado. ¿Qué velocidad inicial debe tener el proyectil para acertar? ¿Con qué velocidad e inclinación llega?", [
          "Tiempo de caída: t = √(2·80/9,8) = <b>4,04 s</b>.",
          "v₀ = x/t = 120/4,04 = <b>29,7 m/s</b>.",
          "Al llegar: vₓ = 29,7 m/s; v<sub>y</sub> = −9,8·4,04 = −39,6 m/s → |v| = √(29,7² + 39,6²) = <b>49,5 m/s</b>, con ángulo arctan(39,6/29,7) = <b>53,1°</b> bajo la horizontal."
        ]) +
        ejemplo("5. Dos piedras que llegan a la vez", "Se deja caer una piedra desde un puente de 45 m. Un segundo después se lanza otra hacia abajo desde el mismo punto, de modo que las dos llegan al agua a la vez. ¿Qué velocidad inicial se le dio a la segunda?", [
          "Primera: 45 = ½·9,8·t₁² → t₁ = √(90/9,8) = 3,03 s.",
          "La segunda sale 1 s después y emplea t₂ = 3,03 − 1 = 2,03 s: 45 = v₀·2,03 + ½·9,8·2,03².",
          "45 = 2,03v₀ + 20,2 → v₀ = <b>12,2 m/s</b> (hacia abajo)."
        ]) +
        ejemplo("6. Moto y coche en un semáforo", "En un semáforo en verde, una moto parte del reposo con a = 3 m/s² en el instante en que un coche pasa a su lado con 54 km/h constantes. ¿Cuándo y dónde alcanza la moto al coche y con qué velocidad lo hace?", [
          "54 km/h = 15 m/s. x<sub>moto</sub> = ½·3·t² = 1,5t²; x<sub>coche</sub> = 15t.",
          "1,5t² = 15t → t = <b>10 s</b> (descartando t = 0).",
          "x = 15·10 = <b>150 m</b>; v<sub>moto</sub> = 3·10 = <b>30 m/s = 108 km/h</b> (el doble que el coche, como siempre en este tipo de problemas)."
        ])
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo antes de que te lo detecte el examen.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Autocomprobación del tema",
      html:
        "<p>Test de doce preguntas, tarjetas con las fórmulas, un juego de parejas, una clasificación de movimientos y un ejercicio de ordenar los pasos de un problema.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "emp1") + w("clasificar", "clas1") + w("orden", "orden1")
    }
  ];

  P.datos = {
    emp1: {
      titulo: "Magnitud ↔ unidad SI y fórmula",
      consigna: "Une cada magnitud con su unidad o su ecuación.",
      pares: [
        ["Velocidad media", "Δx / Δt, en m/s"],
        ["Aceleración", "Δv / Δt, en m/s²"],
        ["Ecuación del MRU", "x = x₀ + v·t"],
        ["Velocidad en un MRUA", "v = v₀ + a·t"],
        ["Ecuación sin tiempo", "v² = v₀² + 2a·Δx"],
        ["Alcance máximo (desde el suelo)", "θ = 45°"],
        ["Aceleración en caída libre", "g = 9,8 m/s² (hacia abajo)"],
        ["1 m/s equivale a…", "3,6 km/h"]
      ]
    },
    clas1: {
      titulo: "¿Qué tipo de movimiento es?",
      consigna: "Toca una situación y después el tipo de movimiento que mejor la describe.",
      categorias: ["MRU", "MRUA", "Caída libre / lanzamiento vertical", "Tiro parabólico", "Reposo"],
      items: [
        { t: "Un coche circula por una autopista recta a 120 km/h constantes", c: 0 }, { t: "La luz del Sol viaja hacia la Tierra", c: 0 },
        { t: "Un tren que sale de la estación acelerando de forma constante", c: 1 }, { t: "Un coche que frena con aceleración constante hasta pararse", c: 1 },
        { t: "Una piedra que se deja caer desde un puente", c: 2 }, { t: "Una pelota lanzada verticalmente hacia arriba", c: 2 },
        { t: "Un balón que sale de un saque de portería con ángulo de 40°", c: 3 }, { t: "Una bola que sale rodando por el borde de una mesa", c: 3 },
        { t: "Una maleta sobre la cinta de un aeropuerto en parada", c: 4 }
      ]
    },
    orden1: {
      titulo: "Resolver un problema de frenada",
      consigna: "Ordena los pasos para calcular la distancia de frenado de un coche que va a 72 km/h y frena con a = −5 m/s².",
      items: [
        { t: "Dibujar la situación: eje hacia la derecha, v₀ positiva y a negativa", nota: "El dibujo evita errores de signo." },
        { t: "Pasar los datos al SI: v₀ = 72 km/h = 20 m/s", nota: "Mezclar km/h con m/s² es el error más habitual." },
        { t: "Tabla de datos: v₀ = 20 m/s, v = 0 (se detiene), a = −5 m/s², Δx = ?", nota: "«Frena hasta pararse» significa v = 0." },
        { t: "Elegir v² = v₀² + 2a·Δx, que no contiene el tiempo (ni lo da el enunciado ni lo piden)", nota: "Se elige la ecuación que se «salta» la magnitud que no interviene." },
        { t: "Despejar: Δx = (v² − v₀²)/(2a)", nota: "Se despeja en letras antes de sustituir." },
        { t: "Sustituir: Δx = (0 − 400)/(−10) = 40 m", nota: "Los dos signos negativos dan un resultado positivo." },
        { t: "Comprobar y responder: 40 m es razonable para una frenada a 72 km/h", nota: "Orden de magnitud y unidades." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula la velocidad media de un viaje de ida a 60 km/h y vuelta a 40 km/h como (60 + 40)/2 = 50 km/h. ¿Qué falla?",
          op: ["Nada", "El tiempo no es el mismo a cada velocidad: hay que usar distancia total / tiempo total (48 km/h)", "Debía restar las velocidades", "Debía multiplicar las velocidades"], ok: 1,
          porque: "Se tarda más en la parte lenta, así que pesa más. Con distancia d cada trayecto: 2d/(d/60 + d/40) = 48 km/h." },
        { q: "Un coche circula con v = +20 m/s y a = −4 m/s². Un alumno dice «como a es negativa, el coche va hacia atrás». ¿Qué falla?",
          op: ["Nada", "El sentido del movimiento lo indica el signo de v, no el de a: va hacia delante y está frenando", "Debía ser a = +4", "No se puede saber"], ok: 1,
          porque: "v &gt; 0: avanza. a y v de signos contrarios: frena. Se parará en 5 s y, si siguiera la aceleración, entonces sí iría hacia atrás." },
        { q: "En el punto más alto de un lanzamiento vertical, un alumno dice «v = 0, luego a = 0». ¿Qué falla?",
          op: ["Nada", "La aceleración sigue siendo −g: sólo la velocidad se anula un instante", "a = +g", "a depende de la altura"], ok: 1,
          porque: "Si a fuera 0 el cuerpo se quedaría parado allí. La velocidad cambia de + a − pasando por 0 porque a = −g sigue actuando." },
        { q: "Un alumno convierte 36 km/h a m/s multiplicando por 3,6 y obtiene 129,6 m/s. ¿Qué falla?",
          op: ["Nada", "Para pasar de km/h a m/s se divide entre 3,6: son 10 m/s", "Debía dividir entre 36", "Debía multiplicar por 1 000"], ok: 1,
          porque: "36 km/h = 36 000 m / 3 600 s = 10 m/s. Un coche urbano no va a 130 m/s: el orden de magnitud lo delata." },
        { q: "Un alumno resuelve «un coche frena de 20 m/s a 0 en 5 s» usando x = v₀t + ½at² con a = +4. ¿Qué falla?",
          op: ["Nada", "Frenar con v &gt; 0 exige a &lt; 0: a = (0 − 20)/5 = −4 m/s², y x = 20·5 − ½·4·25 = 50 m", "Debía usar v = a t", "El tiempo debe ser 4 s"], ok: 1,
          porque: "Con a = +4 saldría x = 100 + 50 = 150 m, un resultado absurdo. El signo de a debe seguir al sentido del movimiento." },
        { q: "Un alumno dice que una bola lanzada horizontalmente desde una mesa tarda más en caer que otra que se suelta a la vez desde el mismo punto, «porque recorre más camino». ¿Qué falla?",
          op: ["Nada", "El movimiento vertical es independiente del horizontal: las dos llegan a la vez al suelo", "La bola lanzada llega antes", "Depende de la masa"], ok: 1,
          porque: "Las dos tienen v<sub>y0</sub> = 0 y a = −g; el movimiento horizontal no influye en el vertical." },
        { q: "Para el alcance de un proyectil, un alumno usa R = v₀² sen θ / g. ¿Qué falla?",
          op: ["Nada", "La fórmula es R = v₀² sen 2θ / g (viene de 2·senθ·cosθ)", "Debía usar cos θ", "Debía dividir por 2g"], ok: 1,
          porque: "El alcance es vₓ · t<sub>vuelo</sub> = v₀cosθ · 2v₀senθ/g = v₀²·sen2θ/g. Con θ = 45° se obtiene el máximo." },
        { q: "Dos móviles se mueven en sentidos contrarios y un alumno escribe x<sub>B</sub> = x₀ + v·t con v = +10 m/s para el que va hacia el origen. ¿Qué falla?",
          op: ["Nada", "Con un solo sentido positivo, el que va hacia el origen tiene v negativa (−10 m/s)", "x₀ debe ser 0", "Debía restar los tiempos"], ok: 1,
          porque: "El signo de v refleja el sentido respecto del eje elegido para <i>todos</i> los móviles del problema." },
        { q: "Una piedra cae 80 m. Un alumno calcula su tiempo con t = d/g = 80/9,8 = 8,2 s. ¿Qué falla?",
          op: ["Nada", "Es una caída acelerada: 80 = ½gt² → t = √(2·80/9,8) = 4,0 s", "g no tiene unidades de tiempo", "Debía usar la mitad de g"], ok: 1,
          porque: "d/g no tiene unidades de tiempo (m/(m/s²) = s²). En un MRUA la distancia depende del cuadrado del tiempo." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Un corredor va de x = 10 m a x = 40 m y vuelve a x = 25 m. Su desplazamiento y su distancia recorrida son…",
          op: ["+15 m y 45 m", "+15 m y 15 m", "45 m y 15 m", "+45 m y +45 m"], ok: 0, porque: "Desplazamiento = 25 − 10 = 15 m; distancia = 30 + 15 = 45 m." },
        { q: "72 km/h equivalen a…",
          op: ["20 m/s", "72 m/s", "259 m/s", "7,2 m/s"], ok: 0, porque: "72 : 3,6 = 20 m/s." },
        { q: "Un móvil con MRU a −5 m/s parte de x₀ = 30 m. Su posición a los 4 s es…",
          op: ["10 m", "50 m", "−20 m", "−10 m"], ok: 0, porque: "x = 30 + (−5)·4 = 10 m." },
        { q: "Un coche pasa de 10 a 30 m/s en 5 s. Su aceleración media es…",
          op: ["4 m/s²", "2 m/s²", "6 m/s²", "8 m/s²"], ok: 0, porque: "a = (30 − 10)/5 = 4 m/s²." },
        { q: "Un cuerpo parte del reposo con a = 2 m/s². Tras 6 s ha recorrido…",
          op: ["36 m", "12 m", "72 m", "6 m"], ok: 0, porque: "Δx = ½·2·36 = 36 m." },
        { q: "Un coche a 20 m/s frena con a = −5 m/s². La distancia de frenado es…",
          op: ["40 m", "80 m", "4 m", "100 m"], ok: 0, porque: "0 = 400 − 2·5·Δx → Δx = 40 m." },
        { q: "Una piedra se deja caer (g = 10 m/s²). Tras 3 s su velocidad y el espacio recorrido son…",
          op: ["30 m/s y 45 m", "30 m/s y 90 m", "15 m/s y 45 m", "30 m/s y 30 m"], ok: 0, porque: "v = 10·3 = 30 m/s; h = ½·10·9 = 45 m." },
        { q: "En el punto más alto de un lanzamiento vertical…",
          op: ["v = 0 y a = −g", "v = 0 y a = 0", "v = g y a = 0", "v máxima y a = −g"], ok: 0, porque: "La velocidad se anula un instante pero la aceleración no cambia." },
        { q: "Un proyectil sale del suelo con v₀ y 30°. Otro con la misma v₀ y 60° tiene…",
          op: ["el mismo alcance", "el doble de alcance", "la mitad de alcance", "alcance cero"], ok: 0, porque: "Ángulos complementarios dan el mismo alcance." },
        { q: "En una gráfica v–t, el área bajo la curva representa…",
          op: ["el desplazamiento", "la aceleración", "la velocidad media", "el tiempo"], ok: 0, porque: "Área = ∫v dt = Δx." },
        { q: "En una gráfica x–t, una recta que baja indica…",
          op: ["MRU con v &lt; 0", "MRU con v &gt; 0", "reposo", "MRUA"], ok: 0, porque: "Pendiente negativa = velocidad negativa constante." },
        { q: "Si se duplica la velocidad de un coche, su distancia de frenado se…",
          op: ["multiplica por 4", "duplica", "multiplica por 8", "mantiene"], ok: 0, porque: "d<sub>f</sub> = v²/(2a) crece con el cuadrado de v." }
      ]
    },
    tj1: {
      titulo: "Cinemática del movimiento rectilíneo",
      cartas: [
        { a: "Posición, desplazamiento y distancia", b: "x (con signo) · Δx = x − x₀ (con signo) · distancia = longitud del camino (≥ 0)." },
        { a: "Velocidad media y rapidez media", b: "v<sub>m</sub> = Δx/Δt (con signo) · rapidez media = distancia/Δt (≥ 0)." },
        { a: "Velocidad instantánea", b: "v = dx/dt: pendiente de la tangente en la gráfica x–t." },
        { a: "Conversión km/h ↔ m/s", b: "km/h ÷ 3,6 = m/s · m/s × 3,6 = km/h." },
        { a: "MRU", b: "v constante · x = x₀ + v·t · x–t recta, v–t horizontal." },
        { a: "Aceleración", b: "a = Δv/Δt (m/s²). Acelera si a y v tienen el mismo signo; frena si tienen signos contrarios." },
        { a: "MRUA: las 4 ecuaciones", b: "v = v₀ + at · Δx = v₀t + ½at² · v² = v₀² + 2aΔx · Δx = ½(v₀ + v)t." },
        { a: "Gráficas v–t", b: "Pendiente = a · Área = Δx (con signo) · Cortes con el eje t = cambio de sentido." },
        { a: "Caída libre", b: "a = −g (eje arriba), g = 9,8 m/s² · v = v₀ − gt · y = y₀ + v₀t − ½gt²." },
        { a: "Lanzamiento vertical", b: "t<sub>subida</sub> = v₀/g · h<sub>máx</sub> = v₀²/2g · t<sub>vuelo</sub> = 2v₀/g · v₀ vuelve con −v₀." },
        { a: "Tiro oblicuo", b: "vₓ = v₀cosθ (MRU) · v<sub>y</sub> = v₀senθ − gt · R = v₀²sen2θ/g · h<sub>máx</sub> = v₀²sen²θ/2g." },
        { a: "Encuentro de móviles", b: "x<sub>A</sub>(t) = x<sub>B</sub>(t) con el mismo origen, sentido y reloj. 2.º grado: hasta dos soluciones, t ≥ 0." },
        { a: "Distancia de detención", b: "v·t<sub>r</sub> + v²/(2|a|): reacción (MRU) + frenado (MRUA)." },
        { a: "Método de resolución", b: "Dibujo · SI · tabla de datos con signos · ecuación sin la magnitud que falta · despejar en letras · comprobar." }
      ]
    }
  };
})(window);
