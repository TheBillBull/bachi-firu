/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 9: Movimiento circular
   Parte A: resumen y refuerzo de las secciones originales 1–3 (magnitudes angulares, v = ωr, periodo y frecuencia)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t9/" + ref); }
  var P = B._fq9 = {};

  P.resumen = [
    "<b>Posición angular</b> θ (rad) · <b>radián</b>: θ = s/r (adimensional) · 2π rad = 360° = 1 vuelta · longitud de arco s = θ·r (sólo con θ en radianes).",
    "<b>Velocidad angular</b> ω = Δθ/Δt (rad/s) · ω = 2π/T = 2πf · 1 rpm = 2π/60 rad/s ≈ 0,1047 rad/s · T = 1/f (s) · f en Hz = vueltas/s.",
    "<b>Velocidad lineal</b> v = ω·r: tangente a la circunferencia. Todos los puntos del sólido giran con la misma ω pero con v distinta (proporcional a r).",
    "<b>MCU</b>: ω constante → θ = θ₀ + ω·t (como el MRU). Módulo de v constante, dirección variable: hay aceleración.",
    "<b>Aceleración centrípeta</b>: a<sub>c</sub> = v²/r = ω²·r = 4π²r/T², dirigida hacia el centro; perpendicular a v.",
    "<b>MCUA</b>: α = Δω/Δt (rad/s²) · ω = ω₀ + αt · θ = θ₀ + ω₀t + ½αt² · ω² = ω₀² + 2αΔθ · a<sub>t</sub> = α·r (tangencial) y a<sub>n</sub> = ω²·r (normal)."
  ];

  P.secciones = {};

  // ---------------------------------------------------------------- 1. Magnitudes angulares
  P.secciones[0] =
    "<h5>Describir un giro: de los metros a los ángulos</h5>" +
    "<p>Una rueda, un disco, las agujas de un reloj, la Tierra, el tambor de una lavadora: en todos ellos, cada punto describe una <b>circunferencia</b> alrededor de un eje. Para describir su movimiento podríamos usar la distancia que recorre sobre la circunferencia, pero esa distancia depende del punto elegido (un punto cercano al eje recorre menos que uno del borde). Es más cómodo usar la magnitud que es <b>la misma para todos los puntos del sólido</b>: el <b>ángulo girado</b>. Por eso el movimiento circular tiene sus propias magnitudes angulares, paralelas a las lineales del Tema 8: posición angular θ, velocidad angular ω y aceleración angular α.</p>" +
    "<h5>La posición angular y su signo</h5>" +
    "<p>La <b>posición angular</b> θ de un punto es el ángulo que forma el radio que va del centro al punto con un <b>eje de referencia</b> (normalmente el semieje x positivo). Por convenio se toma como <b>sentido positivo el antihorario</b> (el contrario a las agujas del reloj): si el punto gira antihorario, θ crece; si gira en sentido horario, θ decrece. Es el mismo papel que juega el signo en el eje de un movimiento rectilíneo: indica el sentido del giro.</p>" +
    "<p>Dado el centro O y el radio r, la posición angular fija el punto sobre la circunferencia: en coordenadas cartesianas, <b>x = r·cos θ</b> e <b>y = r·sen θ</b>. Así, para r = 2 m: θ = 0 es el punto (2, 0); θ = 90° es (0, 2); θ = 180° es (−2, 0).</p>" +
    "<h5>El radián: la unidad natural de los ángulos</h5>" +
    "<p>Un <b>radián</b> es el ángulo cuyo arco mide lo mismo que su radio. En general, el ángulo en radianes es el cociente entre la longitud de arco s y el radio r:</p>" +
    "<div class='formula-wrap'><div class='formula'>θ = " + fr("s", "r") + " &nbsp;&nbsp;⇔&nbsp;&nbsp; s = θ·r</div></div>" +
    "<p>Como la circunferencia completa mide 2π·r, una vuelta entera son <b>2π radianes</b> (≈ 6,283 rad). De aquí salen las equivalencias que hay que saber de memoria:</p>" +
    tabla(["Grados", "Radianes (exacto)", "Radianes (decimal)", "Fracción de vuelta"], [
      ["30°", "π/6", "0,5236", "1/12"],
      ["45°", "π/4", "0,7854", "1/8"],
      ["60°", "π/3", "1,0472", "1/6"],
      ["90°", "π/2", "1,5708", "1/4"],
      ["180°", "π", "3,1416", "1/2"],
      ["270°", "3π/2", "4,7124", "3/4"],
      ["360°", "2π", "6,2832", "1 vuelta"]
    ]) +
    "<p>Para pasar de grados a radianes se multiplica por π/180; para pasar de radianes a grados, por 180/π. Un radián son 57,296° (unos 57° 18′). El radián es una <b>unidad adimensional</b> (metros entre metros): por eso en las fórmulas físicas «rad» puede aparecer o desaparecer sin que cambien las unidades del resultado. Así, rad/s multiplicado por m da m/s, no «rad·m/s».</p>" +
    "<p>¿Por qué la física usa radianes y no grados? Porque con radianes las fórmulas no llevan <b>factores extra</b>: s = θ·r, v = ω·r, a<sub>c</sub> = ω²·r. Si se midiera el ángulo en grados habría que poner un π/180 en cada una. Los radianes son también la unidad en la que las funciones trigonométricas se derivan «limpias» (la derivada de sen θ es cos θ sólo si θ está en radianes), lo que se aprovechará en el Tema 13.</p>" +
    ejemplo("Cambios de unidades angulares", "Expresa 150° en radianes, 2,4 rad en grados y 3,5 vueltas en radianes.", [
      "150° → 150·π/180 = <b>5π/6 = 2,618 rad</b>.",
      "2,4 rad → 2,4·180/π = <b>137,5°</b> (un poco menos que 180°·0,76).",
      "3,5 vueltas → 3,5·2π = 7π = <b>21,99 rad</b> (una vuelta son 2π rad)."
    ]) +
    ejemplo("Arco recorrido por un punto del borde", "Una rueda de radio 0,30 m da 2,5 vueltas. Calcula el ángulo girado y la longitud del arco recorrido por un punto de su borde.", [
      "Ángulo: Δθ = 2,5 · 2π = 5π = <b>15,71 rad</b>.",
      "Arco: s = Δθ·r = 15,71 · 0,30 = <b>4,71 m</b> (coincide con 2,5 · 2π·0,30 = 2,5 · 1,885 m).",
      "Observa que el ángulo es el mismo para cualquier punto de la rueda, pero el arco depende del radio: un punto a 0,10 m del eje recorrería sólo 1,57 m."
    ]) +
    w("f9_arco") +
    "<h5>Ángulo recorrido y número de vueltas</h5>" +
    "<p>El <b>ángulo recorrido</b> (o desplazamiento angular) es la diferencia Δθ = θ − θ₀. Igual que el desplazamiento Δx del Tema 8, tiene <b>signo</b> y puede ser mayor que 2π: un disco que da 7 vueltas ha girado Δθ = 14π rad ≈ 43,98 rad, no «un ángulo menor que una vuelta». En un problema conviene <b>no reducir</b> el ángulo (no quitarle vueltas enteras) mientras se calcula; sólo se reduce al final, si hay que decir dónde está el punto. El <b>número de vueltas</b> se obtiene dividiendo el ángulo recorrido entre 2π:</p>" +
    "<div class='formula-wrap'><div class='formula'>n = " + fr("Δθ", "2π") + " &nbsp;&nbsp;(vueltas)</div></div>" +
    "<p>Para saber en qué posición queda el punto tras n vueltas, se usa sólo la <b>parte decimal</b> de n: tras 2,25 vueltas el punto está en la misma posición que tras 0,25 vueltas, es decir, a 90° de donde empezó.</p>" +
    "<h5>Velocidad angular media e instantánea</h5>" +
    "<p>La <b>velocidad angular media</b> es el ángulo recorrido dividido entre el tiempo empleado. Es el paralelo exacto de la velocidad media del Tema 8, cambiando posición por posición angular:</p>" +
    "<div class='formula-wrap'><div class='formula'>ω<sub>m</sub> = " + fr("Δθ", "Δt") + " = " + fr("θ − θ₀", "t − t₀") + "</div></div>" +
    "<p>Se mide en <b>radianes por segundo</b> (rad/s). Cuando el intervalo se hace muy pequeño, la velocidad angular media tiende a la <b>velocidad angular instantánea</b> ω, la que realmente tiene el sólido en ese instante (en una gráfica θ–t es la pendiente de la tangente, igual que la velocidad en la gráfica x–t). El signo de ω indica el sentido: ω &gt; 0 si gira en sentido antihorario y ω &lt; 0 si lo hace en sentido horario.</p>" +
    ejemplo("Las agujas de un reloj", "Calcula la velocidad angular, en rad/s, del segundero, del minutero y de la aguja horaria de un reloj. Las tres giran en sentido horario: considera sólo su módulo.", [
      "El segundero da una vuelta (2π rad) en 60 s: ω = 2π/60 = <b>0,1047 rad/s</b>.",
      "El minutero da una vuelta en 3 600 s: ω = 2π/3600 = <b>1,745·10⁻³ rad/s</b>.",
      "La aguja horaria da una vuelta en 12 h = 43 200 s: ω = 2π/43 200 = <b>1,454·10⁻⁴ rad/s</b>.",
      "Cada aguja gira 60 veces más despacio que la anterior (el minutero es 12 veces más rápido que la aguja horaria): las razones de velocidades angulares son 60, 60 y 12."
    ]) +
    ejemplo("ω media a partir de dos posiciones", "Un disco pasa de la posición angular θ₀ = 0,50 rad a θ = 12,5 rad en 4,0 s. Calcula su velocidad angular media y cuántas vueltas ha dado.", [
      "Δθ = 12,5 − 0,50 = 12,0 rad. ω<sub>m</sub> = 12,0/4,0 = <b>3,0 rad/s</b>.",
      "Vueltas: n = Δθ/2π = 12,0/6,283 = <b>1,91 vueltas</b> (casi dos, pero no llega a darlas)."
    ]) +
    "<h5>Otras unidades de velocidad angular: rpm, °/s y vueltas por segundo</h5>" +
    "<p>En la vida cotidiana y en la técnica no se usa rad/s sino las <b>revoluciones por minuto</b> (rpm) para motores, discos, lavadoras o ventiladores. También se utilizan los grados por segundo y las vueltas por segundo (hercios). Las conversiones se hacen con factores de conversión, recordando que una vuelta son 2π rad y un minuto son 60 s:</p>" +
    tabla(["Para pasar…", "Se multiplica por…", "Ejemplo"], [
      ["rpm → rad/s", "2π/60 ≈ 0,1047", "300 rpm = 31,42 rad/s"],
      ["rad/s → rpm", "60/2π ≈ 9,549", "10 rad/s = 95,49 rpm"],
      ["vueltas/s (Hz) → rad/s", "2π ≈ 6,283", "5 Hz = 31,42 rad/s"],
      ["°/s → rad/s", "π/180 ≈ 0,01745", "90°/s = 1,571 rad/s"]
    ]) +
    w("f9_unidades") +
    ojo("la velocidad angular <b>no</b> se mide en hercios (Hz). Los hercios son vueltas por segundo (la frecuencia f); la velocidad angular en rad/s es 2π veces mayor: ω = 2π·f. Confundir ω con f es el error más frecuente de los problemas de movimiento circular, y hace que los resultados salgan 6,28 veces mayores o menores de lo debido." ) +
    ojo("antes de calcular, pon la calculadora en <b>modo RAD</b> si vas a usar seno o coseno de un ángulo en radianes (por ejemplo, para hallar x = r·cos θ). Con la calculadora en grados, cos(2,02) es casi 1, pero con la calculadora en radianes es −0,43: se nota enseguida si el resultado tiene sentido." ) +
    "<h5>La velocidad angular como vector (para ir más allá)</h5>" +
    "<p>La velocidad angular puede tratarse como un <b>vector</b> ω⃗ cuya dirección es la del eje de giro y cuyo sentido se obtiene con la <b>regla de la mano derecha</b>: si los dedos de la mano derecha se curvan en el sentido del giro, el pulgar señala el sentido de ω⃗. Con esa convención, un giro antihorario visto desde arriba tiene ω⃗ hacia arriba. En este curso sólo se usa su módulo (con signo según el sentido), pero esa representación explicará más adelante la relación v⃗ = ω⃗ × r⃗ en Física de 2.º de Bachillerato.</p>";

  // ---------------------------------------------------------------- 2. De lo angular a lo lineal: v = ωr
  P.secciones[1] =
    "<h5>La misma ω para todos, distinta v para cada uno</h5>" +
    "<p>Imagina un disco de vinilo, un CD o un tiovivo. Todos sus puntos dan una vuelta en el mismo tiempo, así que <b>todos tienen la misma velocidad angular</b> ω (y el mismo periodo). Pero si miras dónde está cada punto, uno cercano al borde recorre una circunferencia más grande, y por tanto mucho más camino por vuelta, que otro situado cerca del eje. El que está justo en el eje no se desplaza: su velocidad lineal es cero. La conclusión es que la velocidad lineal de un punto <b>depende de la distancia r al eje</b>.</p>" +
    "<p>La relación se deduce directamente de s = θ·r. Si dividimos ambos miembros entre el tiempo Δt durante el que se recorre el arco:</p>" +
    "<div class='formula-wrap'><div class='formula'>" + fr("s", "Δt") + " = " + fr("Δθ", "Δt") + " · r &nbsp;&nbsp;⇒&nbsp;&nbsp; v = ω·r</div></div>" +
    "<p>La velocidad lineal v (en m/s) es la <b>rapidez</b> con que el punto recorre su circunferencia. Si ω está en rad/s y r en metros, v sale en m/s directamente (el «rad» de ω no aparece porque es adimensional). Si ω estuviera en rpm o en °/s, habría que convertirla antes a rad/s: es la causa de la mayoría de errores en estos problemas.</p>" +
    "<h5>El vector velocidad: siempre tangente</h5>" +
    "<p>En cada instante, la velocidad del punto es un <b>vector tangente</b> a la circunferencia, es decir, perpendicular al radio que va hasta ese punto. Su módulo es v = ω·r y su sentido es el del giro. Una forma sencilla de comprobarlo es la de la honda (la cuerda con una piedra que se hace girar): si se suelta la cuerda, la piedra no sale hacia afuera ni hacia dentro, sino que escapa <b>en línea recta en la dirección de la tangente</b>, con la velocidad que tenía en ese instante (primera ley de Newton: Tema 10). Lo mismo ocurre con el agua que sale despedida de una rueda que gira, o con las chispas de una radial.</p>" +
    w("f9_honda") +
    "<p>En el movimiento circular uniforme el <b>módulo</b> de la velocidad no cambia, pero su <b>dirección</b> sí lo hace en cada instante, y por eso el vector velocidad no es constante. Esta observación, aparentemente sencilla, es la que explica la aceleración centrípeta del siguiente punto.</p>" +
    ejemplo("Dos puntos de un CD", "Un disco compacto gira a 500 rpm. Calcula la velocidad lineal de un punto situado a 3,0 cm del centro y de otro situado a 5,5 cm (cerca del borde).", [
      "Se pasa ω a rad/s: ω = 500 · 2π/60 = <b>52,36 rad/s</b>. Es la misma para todos los puntos del disco.",
      "Punto interior: v = ω·r = 52,36 · 0,030 = <b>1,57 m/s</b> (5,7 km/h).",
      "Punto exterior: v = 52,36 · 0,055 = <b>2,88 m/s</b> (10,4 km/h).",
      "El punto exterior va 5,5/3,0 = 1,83 veces más deprisa, la misma razón que sus radios: v es directamente proporcional a r cuando ω es la misma."
    ]) +
    ejemplo("Una rueda que rueda sin deslizar", "Un coche circula a 90 km/h con ruedas de radio 0,30 m. Calcula la velocidad angular de las ruedas en rad/s y en rpm, y cuántas vueltas da cada rueda en 1 km.", [
      "En una rueda que rueda <b>sin deslizar</b>, el centro de la rueda avanza con la misma velocidad que el coche: v = 90 km/h = 25 m/s.",
      "ω = v/r = 25/0,30 = <b>83,3 rad/s</b> → 83,3 · 60/2π = <b>796 rpm</b>.",
      "Vueltas en 1 000 m: n = 1 000/(2π·0,30) = <b>530 vueltas</b>."
    ]) +
    "<h5>Un ejemplo que se ve desde el espacio: la rotación de la Tierra</h5>" +
    "<p>La Tierra gira sobre su eje con un periodo de unas 23 h 56 min (86 164 s: el día sidéreo), de modo que su velocidad angular es la misma en todos los puntos del planeta: ω = 2π/86 164 = 7,292·10⁻⁵ rad/s. Pero la velocidad lineal de cada punto depende de su <b>latitud</b>, porque la distancia al eje de rotación es r = R<sub>T</sub>·cos(latitud):</p>" +
    tabla(["Lugar", "Latitud", "r al eje (km)", "v (m/s)", "v (km/h)"], [
      ["Ecuador", "0°", "6 371", "464,6", "1 672"],
      ["Madrid", "40°", "4 880", "355,9", "1 281"],
      ["Círculo polar", "66,5°", "2 540", "185,3", "667"],
      ["Polos", "90°", "0", "0", "0"]
    ]) +
    "<p>Estás ahora mismo moviéndote a más de 1 200 km/h respecto del eje de la Tierra, sin notarlo, porque nada cambia: todo se mueve contigo (el movimiento, como vimos en el Tema 8, es relativo). Cerca del ecuador, además, el movimiento de rotación reduce ligeramente el peso aparente; lo comentaremos en las aplicaciones.</p>" +
    ejemplo("Velocidad por la rotación terrestre en Madrid", "Calcula la velocidad lineal debida a la rotación de la Tierra de un punto de latitud 40°. Datos: R<sub>T</sub> = 6,371·10⁶ m; T = 86 164 s.", [
      "Radio de la circunferencia que describe el punto: r = R<sub>T</sub>·cos 40° = 6,371·10⁶ · 0,766 = <b>4,880·10⁶ m</b>.",
      "Velocidad angular: ω = 2π/T = 7,292·10⁻⁵ rad/s (la misma para todos los puntos).",
      "v = ω·r = 7,292·10⁻⁵ · 4,880·10⁶ = <b>355,9 m/s ≈ 1 281 km/h</b> (un 77 % de la velocidad del ecuador)."
    ]) +
    "<h5>Cuando la velocidad angular también es un dato de «cuántas vueltas»</h5>" +
    "<p>La fórmula v = ω·r vale en cualquier instante, incluso si ω no es constante (MCUA, punto 6). Y se puede leer al revés: dada la velocidad lineal de un punto del borde y el radio, se obtiene la velocidad angular de todo el sólido (ω = v/r). Es el cálculo que hace el velocímetro de una bicicleta (un imán en la rueda cuenta las vueltas) y el cuentakilómetros de un coche (cuenta las vueltas de las ruedas y las multiplica por la longitud de la circunferencia 2π·r). Por eso un coche con ruedas de mayor radio de lo especificado marca <b>menos</b> kilómetros por hora de los reales: la rueda grande avanza más por vuelta, pero el aparato sigue multiplicando por el radio antiguo.</p>" +
    ojo("«Mayor velocidad angular» no quiere decir «mayor velocidad lineal». Un punto cercano al eje de un disco que gira muy deprisa puede tener menos velocidad lineal que un punto del borde de otro disco que gira despacio pero es enorme. Compara siempre ω con ω y v con v, y recuerda que v = ω·r relaciona las dos.") +
    "<p>Como resumen de esta sección: la velocidad angular describe al <b>sólido entero</b> (es la misma para todos sus puntos) y la velocidad lineal describe a <b>un punto concreto</b> (depende de su radio). Los dos puntos de vista son equivalentes y se pasa del uno al otro con v = ω·r.</p>";

  // ---------------------------------------------------------------- 3. Periodo y frecuencia
  P.secciones[2] =
    "<h5>Periodo: tiempo de una vuelta</h5>" +
    "<p>El <b>periodo</b> T de un movimiento circular uniforme es el <b>tiempo que se tarda en dar una vuelta completa</b>. Se mide en segundos (s) en el SI, aunque en la práctica se usan también minutos, horas, días o años, según lo que se esté describiendo. Una vuelta supone 2π radianes, así que la velocidad angular constante es el ángulo de una vuelta dividido entre el tiempo de una vuelta:</p>" +
    "<div class='formula-wrap'><div class='formula'>ω = " + fr("2π", "T") + "</div></div>" +
    "<h5>Frecuencia: vueltas por segundo</h5>" +
    "<p>La <b>frecuencia</b> f es el <b>número de vueltas por unidad de tiempo</b>. En el SI se mide en <b>hercios</b> (Hz): 1 Hz es una vuelta por segundo (1 Hz = 1 s⁻¹). Es la inversa del periodo: si una vuelta dura T segundos, en un segundo se dan 1/T vueltas.</p>" +
    "<div class='formula-wrap'><div class='formula'>f = " + fr("1", "T") + " &nbsp;&nbsp;⇔&nbsp;&nbsp; T = " + fr("1", "f") + " &nbsp;&nbsp;⇒&nbsp;&nbsp; ω = 2π·f</div></div>" +
    "<p>Una frecuencia grande significa un periodo pequeño (giro rápido) y una frecuencia pequeña, un periodo grande (giro lento). Si se mide en <b>rpm</b>, se divide entre 60 para obtener hercios: 1 rpm = 1/60 Hz ≈ 0,0167 Hz.</p>" +
    "<h5>Las tres formas de dar la misma información</h5>" +
    "<p>Para un movimiento circular uniforme, T, f y ω son <b>tres maneras equivalentes</b> de decir lo rápido que gira el cuerpo; conocida una, se obtienen las otras dos. Y con el radio se puede obtener también la velocidad lineal. Este es el esquema de conversión que conviene tener a mano:</p>" +
    tabla(["Conocido", "Periodo T", "Frecuencia f", "Velocidad angular ω", "Velocidad lineal v"], [
      ["T", "—", "1/T", "2π/T", "2πr/T"],
      ["f", "1/f", "—", "2π·f", "2π·f·r"],
      ["ω", "2π/ω", "ω/2π", "—", "ω·r"],
      ["v y r", "2πr/v", "v/(2πr)", "v/r", "—"]
    ]) +
    "<p>La última columna merece atención: v = 2π·r/T, que dice simplemente que, en una vuelta, el punto recorre la longitud de la circunferencia (2π·r) en un tiempo T. Es la definición de velocidad (distancia/tiempo) aplicada a una vuelta.</p>" +
    ejemplo("Un volante de motor", "Un volante gira a 600 rpm. Calcula su frecuencia, su periodo y su velocidad angular, y la velocidad lineal de un punto situado a 12 cm del eje.", [
      "Frecuencia: f = 600/60 = <b>10 Hz</b> (diez vueltas cada segundo).",
      "Periodo: T = 1/f = <b>0,10 s</b>.",
      "Velocidad angular: ω = 2π·f = 2π·10 = <b>62,83 rad/s</b> (equivale a 600 · 2π/60: sale lo mismo).",
      "Velocidad lineal a 12 cm: v = ω·r = 62,83 · 0,12 = <b>7,54 m/s</b> (27,1 km/h)."
    ]) +
    ejemplo("La Luna", "La Luna tarda 27,32 días en dar una vuelta alrededor de la Tierra. Calcula su periodo en segundos, su frecuencia y su velocidad angular.", [
      "T = 27,32 d · 86 400 s/d = <b>2,360·10⁶ s</b>.",
      "f = 1/T = <b>4,236·10⁻⁷ Hz</b> (una vuelta cada 27 días: una frecuencia tan baja se suele expresar mejor con el periodo).",
      "ω = 2π/T = <b>2,662·10⁻⁶ rad/s</b>."
    ]) +
    ejemplo("Una hélice", "La hélice de un ventilador de mesa gira con velocidad angular de 125,7 rad/s. Calcula su frecuencia, su periodo y las rpm.", [
      "f = ω/2π = 125,7/6,283 = <b>20,0 Hz</b>.",
      "T = 1/20,0 = <b>0,050 s</b>.",
      "rpm = f · 60 = <b>1 200 rpm</b>."
    ]) +
    w("f9_mcu") +
    "<h5>Cómo elegir la magnitud con la que trabajar</h5>" +
    "<p>Una regla práctica: se trabaja siempre en el <b>SI</b>, es decir, ω en rad/s, T en s, f en Hz, r en m y v en m/s. Si el enunciado da otra unidad (rpm, km/h, vueltas/min, horas, días…), lo <b>primero</b> que se hace es convertirla. Otra regla: si el enunciado da el «periodo» o «cuánto tarda en dar una vuelta», la fórmula natural es ω = 2π/T; si da la «frecuencia» o las «vueltas por segundo/minuto», es ω = 2π·f (con f en vueltas por segundo); si da la «velocidad» de un punto y su radio, ω = v/r.</p>" +
    ejemplo("Pasando de unas magnitudes a otras", "Un disco duro antiguo giraba a 7 200 rpm. ¿Cuál es el periodo de una vuelta? ¿Cuánto tiempo tardan los 4,5 cm del radio externo en pasar por delante del cabezal? Calcula la velocidad lineal del borde (r = 4,5 cm).", [
      "f = 7 200/60 = <b>120 Hz</b>; T = 1/120 = <b>8,33 ms</b>.",
      "ω = 2π·120 = 753,98 rad/s. El borde va a v = ω·r = 753,98 · 0,045 = <b>33,9 m/s ≈ 122 km/h</b>.",
      "El tiempo de media vuelta es T/2 = 4,17 ms: es la latencia media de espera de un dato en el disco."
    ]) +
    ojo("2π·r/T y ω·r son <b>lo mismo</b> escritas de dos maneras. No las sumes ni uses ambas a la vez: si te da el periodo, v = 2π·r/T; si te da ω, v = ω·r. Y si usas T = 1/f, comprueba que f esté en hercios (vueltas por segundo): con f en rpm saldría un periodo en minutos.");
})(window);
