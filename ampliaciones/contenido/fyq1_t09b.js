/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 9: Movimiento circular
   Parte B: refuerzo de las secciones originales 4–6 (MCU, aceleración centrípeta, aceleración angular y MCUA)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t9/" + ref); }
  var P = B._fq9;

  // ---------------------------------------------------------------- 4. MCU
  P.secciones[3] =
    "<h5>Qué significa «uniforme» en un movimiento circular</h5>" +
    "<p>Un movimiento circular es <b>uniforme</b> cuando la <b>velocidad angular es constante</b>: el cuerpo barre ángulos iguales en tiempos iguales. Es exactamente la misma idea que el MRU del Tema 8, pero aplicada al ángulo en vez de a la posición sobre una recta. Como consecuencia, la <b>rapidez</b> (el módulo de la velocidad lineal v = ω·r) también es constante y el periodo y la frecuencia no cambian de una vuelta a otra. Lo que <b>no</b> es constante es el vector velocidad: su dirección cambia en cada instante, así que, como se explica en el punto siguiente, hay aceleración.</p>" +
    "<h5>La ecuación del movimiento: θ = θ₀ + ω·t</h5>" +
    "<p>Si ω es constante, la definición ω = Δθ/Δt permite despejar el ángulo recorrido en un tiempo t: Δθ = ω·t. Y sumando la posición angular inicial θ₀ se obtiene la <b>ecuación del movimiento circular uniforme</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>θ = θ₀ + ω·t</div></div>" +
    "<p>Compárala con x = x₀ + v·t: son la misma ecuación, con otra letra. En la ecuación entran la posición angular inicial θ₀ (rad, con signo), la velocidad angular ω (rad/s, con signo: positiva si el giro es antihorario) y el tiempo t (s). El resultado es la posición angular, que puede superar 2π: no se «reduce» hasta el final.</p>" +
    tabla(["Movimiento rectilíneo uniforme (Tema 8)", "Movimiento circular uniforme"], [
      ["posición x (m)", "posición angular θ (rad)"],
      ["velocidad v (m/s), constante", "velocidad angular ω (rad/s), constante"],
      ["x = x₀ + v·t", "θ = θ₀ + ω·t"],
      ["v = Δx/Δt", "ω = Δθ/Δt = 2π/T"],
      ["gráfica x–t: recta de pendiente v", "gráfica θ–t: recta de pendiente ω"],
      ["gráfica v–t: horizontal, área = Δx", "gráfica ω–t: horizontal, área = Δθ"]
    ]) +
    "<p>Con la posición angular se recupera la posición cartesiana del punto, si hace falta, con x = r·cos θ e y = r·sen θ. Y, con el periodo, se deduce que cada vez que t aumenta en T, el ángulo aumenta en 2π y el punto vuelve exactamente a la misma posición: el movimiento es <b>periódico</b>.</p>" +
    w("f9_leergraf") +
    "<h5>Cómo resolver los problemas de MCU</h5>" +
    "<ol>" +
    "<li><b>Convierte</b> las magnitudes al SI: ω en rad/s (desde rpm, Hz o °/s), r en metros, t en segundos.</li>" +
    "<li>Decide si el problema pide una <b>posición</b> (θ = θ₀ + ωt), un <b>tiempo</b> (t = Δθ/ω), un <b>número de vueltas</b> (n = Δθ/2π) o una <b>velocidad lineal</b> (v = ωr).</li>" +
    "<li>Haz un dibujo con el sentido positivo marcado y escribe el signo de ω.</li>" +
    "<li>Resuelve en letras y sustituye al final; comprueba unidades y orden de magnitud.</li>" +
    "</ol>" +
    ejemplo("Un tiovivo", "Un tiovivo da una vuelta cada 8,0 s. Un niño se sienta a 3,0 m del eje. Calcula su velocidad angular, su velocidad lineal, y el ángulo y el número de vueltas que ha dado a los 20 s.", [
      "ω = 2π/T = 2π/8,0 = <b>0,785 rad/s</b> (= π/4).",
      "v = ω·r = 0,785 · 3,0 = <b>2,36 m/s</b> (8,5 km/h).",
      "A los 20 s: Δθ = ω·t = 0,785 · 20 = <b>15,71 rad</b> (= 5π) → n = 15,71/2π = <b>2,5 vueltas</b>.",
      "Como son dos vueltas y media, el niño está justo en el lado opuesto al de partida (media vuelta más que un número entero de vueltas)."
    ]) +
    ejemplo("¿Cuántas vueltas da una rueda de bicicleta?", "Una bicicleta circula a 18 km/h y sus ruedas tienen un radio de 0,34 m. Calcula la velocidad angular de las ruedas en rad/s y rpm, y el número de vueltas que dan en 1 km de recorrido.", [
      "v = 18 km/h = 5,0 m/s. ω = v/r = 5,0/0,34 = <b>14,7 rad/s</b> → 14,7 · 60/2π = <b>140 rpm</b>.",
      "Longitud de una vuelta: 2π·r = 2,136 m. Vueltas en 1 000 m: n = 1 000/2,136 = <b>468 vueltas</b>.",
      "Alternativa: tiempo en recorrer 1 km: t = 1 000/5,0 = 200 s; frecuencia f = ω/2π = 2,34 Hz; vueltas = f·t = 2,34 · 200 = 468 (mismo resultado)."
    ]) +
    ejemplo("Posición de un punto en cada instante", "Un punto de una rueda de radio 2,0 m parte de θ₀ = 30° y gira en sentido antihorario con ω = 3,0 rad/s. Calcula sus coordenadas (x, y) a los 0,50 s.", [
      "Pasa θ₀ a radianes: 30° = 0,5236 rad.",
      "θ = θ₀ + ω·t = 0,5236 + 3,0 · 0,50 = <b>2,024 rad</b> (= 115,9°, en el segundo cuadrante).",
      "x = r·cos θ = 2,0 · cos(2,024) = <b>−0,875 m</b>; y = r·sen θ = 2,0 · sen(2,024) = <b>1,80 m</b>.",
      "Comprobación: x² + y² = 0,766 + 3,24 = 4,0 = r². (Con la calculadora en modo RAD.)"
    ]) +
    ejemplo("Sentido horario: ω negativa", "Una rueda de radio 2,0 m gira en sentido horario con 3,0 rad/s. En t = 0 un punto está en lo más alto (θ₀ = 90°). ¿Dónde está a los 0,50 s?", [
      "ω = −3,0 rad/s. θ = 1,5708 + (−3,0)(0,50) = <b>0,0708 rad</b> (≈ 4,06°).",
      "x = 2,0 · cos(0,0708) = <b>1,995 m</b>; y = 2,0 · sen(0,0708) = <b>0,141 m</b>: el punto ha bajado casi un cuarto de vuelta y está casi en la posición horizontal de la derecha."
    ]) +
    ejemplo("¿Cuánto tarda en girar un ángulo?", "Con el tiovivo anterior (ω = π/4 rad/s), ¿cuánto tarda en girar 90°?", [
      "90° = π/2 rad. t = Δθ/ω = (π/2)/(π/4) = <b>2,0 s</b> (un cuarto de vuelta, es decir, un cuarto del periodo de 8,0 s)."
    ]) +
    ojo("el ángulo θ = θ₀ + ω·t sólo vale con ω <b>constante</b>. Y recuerda que ω debe estar en rad/s <em>y</em> θ en radianes. Si el problema te da 300 rpm y 5 s, no pongas «300·5»: son 31,4 rad/s · 5 s = 157 rad, es decir, 25 vueltas.");

  // ---------------------------------------------------------------- 5. Aceleración centrípeta
  P.secciones[4] =
    "<h5>Un movimiento con rapidez constante, pero acelerado</h5>" +
    "<p>La aceleración es la rapidez con que cambia el <b>vector velocidad</b> (Tema 8). Pero un vector puede cambiar de dos maneras: cambiando su módulo (como cuando un coche acelera o frena en línea recta) o cambiando su <b>dirección</b> (como cuando toma una curva sin variar su rapidez). En el MCU el módulo de la velocidad es constante, pero la dirección varía a cada instante, siempre tangente a la circunferencia. Por tanto, <b>un movimiento circular uniforme sí tiene aceleración</b>. Es una de las ideas más contraintuitivas de la cinemática y de las que más se preguntan en los exámenes.</p>" +
    "<h5>Dirección y sentido: hacia el centro</h5>" +
    "<p>Para ver hacia dónde apunta, dibuja la velocidad de un punto en dos instantes cercanos, v⃗₁ y v⃗₂, y traslada los dos vectores a un origen común. Su diferencia Δv⃗ = v⃗₂ − v⃗₁ es el cambio de velocidad. Para intervalos muy pequeños, ese vector apunta <b>hacia el centro de la circunferencia</b>. De ahí el nombre de <b>aceleración centrípeta</b> (del latín <em>centrum petere</em>, «buscar el centro»): es perpendicular a la velocidad y sólo cambia su dirección, nunca su módulo.</p>" +
    "<h5>Módulo: de dónde sale a<sub>c</sub> = v²/r</h5>" +
    "<p>Los dos vectores v⃗₁ y v⃗₂ tienen el mismo módulo v y forman entre sí el mismo ángulo Δθ que han girado los radios (la velocidad es perpendicular al radio, y los dos radios forman Δθ). El triángulo formado por v⃗₁, v⃗₂ y Δv⃗ es por tanto <b>isósceles</b>, semejante al formado por los dos radios y la cuerda. Para ángulos pequeños, el módulo de Δv⃗ es aproximadamente la «longitud de arco» v·Δθ:</p>" +
    "<div class='formula-wrap'><div class='formula'>|Δv⃗| = 2v·sen" + fr("Δθ", "2") + " ≈ v·Δθ</div></div>" +
    "<p>Dividiendo entre el tiempo Δt = Δθ/ω necesario para girar ese ángulo:</p>" +
    "<div class='formula-wrap'><div class='formula'>a<sub>c</sub> = " + fr("|Δv⃗|", "Δt") + " = " + fr("v·Δθ", "Δθ/ω") + " = v·ω = " + fr("v²", "r") + " = ω²·r</div></div>" +
    "<p>En el simulador de abajo puedes ver cómo, cuando Δθ se hace pequeño, el cociente entre la aceleración media |Δv⃗|/Δt y v²/r se acerca a 1: la aproximación es exacta en el límite, que es lo que define la aceleración instantánea.</p>" +
    w("f9_vectores") +
    "<h5>Las formas de escribir a<sub>c</sub></h5>" +
    "<p>Usando v = ω·r, ω = 2π/T y ω = 2π·f se obtienen varias expresiones equivalentes. Se elige la que utiliza los datos que da el enunciado:</p>" +
    tabla(["Datos del problema", "Fórmula", "Ejemplo de uso"], [
      ["v y r", "a<sub>c</sub> = v²/r", "coche en una curva"],
      ["ω y r", "a<sub>c</sub> = ω²·r", "rueda, centrifugadora, disco"],
      ["T y r", "a<sub>c</sub> = 4π²·r/T²", "planetas, Luna, satélites"],
      ["f y r", "a<sub>c</sub> = 4π²·f²·r", "motores, ventiladores"],
      ["v y ω", "a<sub>c</sub> = v·ω", "cuando no se da el radio"]
    ]) +
    "<p>En forma vectorial, con r⃗ el vector que va del centro al punto: <b>a⃗<sub>c</sub> = −ω²·r⃗</b>. El signo menos expresa que apunta hacia el centro (en sentido contrario al radio vector). Esta fórmula, que parece un detalle, es la misma que aparecerá en el movimiento armónico simple (Tema 13): la aceleración proporcional a la posición pero de signo contrario.</p>" +
    "<h5>Cómo depende de v y de r</h5>" +
    "<p>La aceleración centrípeta depende de <b>cuánto cambia la dirección</b>: crece cuanto más deprisa se va y cuanto más cerrada es la curva. En concreto: <b>si se duplica la velocidad, la aceleración se multiplica por 4</b> (depende de v²); y si el radio es la mitad, la aceleración se duplica (a la misma velocidad, a<sub>c</sub> ∝ 1/r). Si en cambio la velocidad angular es la misma (puntos de un mismo sólido), a<sub>c</sub> = ω²r crece con r: los puntos del borde sufren más aceleración que los del centro.</p>" +
    tabla(["Qué se mantiene", "Variación de a<sub>c</sub>", "Ejemplo"], [
      ["ω constante (mismo sólido)", "a<sub>c</sub> ∝ r", "un punto del borde del disco tiene más que uno cercano al eje"],
      ["v constante (misma cuerda o carretera)", "a<sub>c</sub> ∝ 1/r", "una curva cerrada exige más aceleración que una abierta"],
      ["r constante", "a<sub>c</sub> ∝ v² ∝ ω²", "doblar la velocidad en una curva ⇒ 4 veces más aceleración"]
    ]) +
    ejemplo("Un coche en una curva", "Un coche toma una curva de 150 m de radio a 108 km/h. Calcula su aceleración centrípeta y exprésala en múltiplos de g. ¿Y si va a 54 km/h?", [
      "108 km/h = 30 m/s. a<sub>c</sub> = v²/r = 900/150 = <b>6,0 m/s²</b> = 6,0/9,8 = <b>0,61 g</b>.",
      "A 54 km/h = 15 m/s (la mitad de velocidad): a<sub>c</sub> = 225/150 = <b>1,5 m/s²</b>, es decir, la cuarta parte: depende de v².",
      "Esa aceleración la proporciona el rozamiento de los neumáticos con el asfalto (Tema 10). Si el rozamiento máximo no basta, el coche se sale de la curva."
    ]) +
    ejemplo("La Luna «cae» hacia la Tierra", "Calcula la aceleración centrípeta de la Luna en su órbita (r = 3,844·10⁸ m, T = 2,360·10⁶ s) y compárala con g = 9,8 m/s².", [
      "ω = 2π/T = 2,662·10⁻⁶ rad/s. a<sub>c</sub> = ω²·r = (2,662·10⁻⁶)² · 3,844·10⁸ = <b>2,72·10⁻³ m/s²</b>.",
      "Cociente: 9,8/2,72·10⁻³ ≈ 3 600 = 60². La Luna está unas 60 veces más lejos del centro de la Tierra que nosotros (60,3 R<sub>T</sub>) y su aceleración es 60² veces menor: la gravedad disminuye con el cuadrado de la distancia. Fue el cálculo con el que Newton comprobó su ley de la gravitación universal (Tema 11)."
    ]) +
    ejemplo("Una centrifugadora de laboratorio", "Una centrifugadora gira a 3 000 rpm y sus tubos están a 15 cm del eje. Calcula la aceleración centrípeta en múltiplos de g.", [
      "ω = 3 000 · 2π/60 = 314,2 rad/s.",
      "a<sub>c</sub> = ω²·r = 314,2² · 0,15 = <b>1,48·10⁴ m/s²</b> = <b>1 510 g</b>.",
      "Con esa «gravedad artificial» los componentes de la sangre se separan en minutos, en vez de las horas o días que tardarían por sedimentación normal."
    ]) +
    ejemplo("La Estación Espacial Internacional", "La ISS orbita a unos 400 km de altura (r = 6 771 km desde el centro de la Tierra) con una velocidad de 7,67 km/s. Calcula su aceleración centrípeta, su periodo y compara la aceleración con g.", [
      "a<sub>c</sub> = v²/r = (7 670)²/6,771·10⁶ = <b>8,69 m/s²</b> = 0,887 g.",
      "T = 2π·r/v = 2π · 6,771·10⁶/7 670 = <b>5 547 s = 92,4 min</b> (da unas 15,6 vueltas al día).",
      "La aceleración es casi la misma que en la superficie: los astronautas «flotan» no porque no haya gravedad, sino porque ellos y la nave están en caída libre alrededor de la Tierra con la misma aceleración (Tema 11)."
    ]) +
    ejemplo("Un avión en un rizo", "Un avión de acrobacia hace un rizo (una circunferencia vertical) de 1 500 m de radio a 250 m/s. Calcula la aceleración centrípeta en g.", [
      "a<sub>c</sub> = v²/r = 62 500/1 500 = <b>41,7 m/s²</b> = <b>4,25 g</b>: el piloto siente un peso aparente de unas cuatro veces el suyo (esa fuerza la ejerce el asiento; Tema 10)."
    ]) +
    "<h5>Un aviso importante: no existe la «fuerza centrífuga» en este curso</h5>" +
    "<p>Al viajar en un coche en una curva sientes que te «tiran hacia fuera». Pero lo único que ocurre, visto desde fuera del coche, es que tu cuerpo quiere seguir en línea recta (primera ley de Newton, Tema 10) y el coche gira hacia dentro: la puerta y el asiento te empujan hacia el centro. La fuerza real que actúa sobre ti es una fuerza <b>hacia el centro</b>: la fuerza centrípeta, que según la segunda ley de Newton vale F<sub>c</sub> = m·a<sub>c</sub> = m·v²/r. La «fuerza centrífuga» es una sensación que aparece cuando uno se describe a sí mismo desde un sistema de referencia que gira (un sistema no inercial), y no es una fuerza real. En el Tema 10 lo veremos con diagramas de fuerzas.</p>" +
    ojo("«centrípeta» no es una fuerza nueva que se dibuje además de las demás. Es el nombre de la resultante de las fuerzas que apuntan hacia el centro (tensión, rozamiento, normal, gravedad…), y la aceleración centrípeta es la consecuencia de que esa resultante exista. Y en el MCU la aceleración total <b>es</b> la centrípeta: no hay componente tangencial.");

  // ---------------------------------------------------------------- 6. Aceleración angular y MCUA
  P.secciones[5] =
    "<h5>Cuando el giro se acelera o se frena</h5>" +
    "<p>Si la velocidad angular de un sólido cambia con el tiempo (un ventilador al arrancar, una rueda de bicicleta al frenar, una lavadora que acelera su centrifugado), aparece una <b>aceleración angular</b> α, definida como el cociente entre el cambio de velocidad angular y el tiempo empleado, igual que en el Tema 8 pero para ω:</p>" +
    "<div class='formula-wrap'><div class='formula'>α = " + fr("Δω", "Δt") + " = " + fr("ω − ω₀", "t − t₀") + "</div></div>" +
    "<p>Se mide en <b>rad/s²</b>. Es positiva si ω aumenta en el sentido antihorario (o si disminuye en el horario) y negativa en caso contrario. Como en el movimiento rectilíneo, lo que importa es el signo <em>relativo</em> de ω y α: si tienen el mismo signo, el giro se <b>acelera</b>; si tienen signos contrarios, el giro <b>frena</b>.</p>" +
    "<h5>Movimiento circular uniformemente acelerado (MCUA)</h5>" +
    "<p>Cuando α es constante, el movimiento es un <b>MCUA</b>. Sus ecuaciones son las del MRUA del Tema 8 con el cambio de letras x→θ, v→ω y a→α:</p>" +
    tabla(["MRUA (Tema 8)", "MCUA", "No contiene…"], [
      ["v = v₀ + a·t", "ω = ω₀ + α·t", "el ángulo"],
      ["x = x₀ + v₀t + ½·a·t²", "θ = θ₀ + ω₀·t + ½·α·t²", "ω final"],
      ["v² = v₀² + 2a·(x − x₀)", "ω² = ω₀² + 2α·(θ − θ₀)", "el tiempo"],
      ["Δx = ½(v₀ + v)·t", "Δθ = ½(ω₀ + ω)·t", "α"]
    ]) +
    "<p>El procedimiento de resolución es el mismo que en el Tema 8: <b>dibuja</b>, <b>pasa al SI</b> (rad, rad/s, rad/s²), <b>escribe los datos con sus signos</b>, elige la ecuación que no contiene la magnitud que no interviene, despeja en letras, sustituye y comprueba.</p>" +
    ejemplo("Arranque de una rueda", "Una rueda parte del reposo y alcanza 120 rpm en 5,0 s con aceleración angular constante. Calcula α y el número de vueltas que ha dado en ese tiempo.", [
      "ω<sub>f</sub> = 120 · 2π/60 = 4π = 12,57 rad/s; ω₀ = 0.",
      "α = (ω − ω₀)/t = 12,57/5,0 = <b>2,51 rad/s²</b> (= 0,8π).",
      "Δθ = ½·α·t² = ½ · 2,513 · 25 = 31,4 rad = 10π → n = Δθ/2π = <b>5,0 vueltas</b> (también: Δθ = ½(ω₀ + ω)t = ½ · 12,57 · 5,0 = 31,4 rad)."
    ]) +
    ejemplo("Frenado de un ventilador", "Un ventilador gira a 900 rpm y, al desconectarlo, se detiene uniformemente en 20 s. Calcula la aceleración angular y las vueltas que da hasta pararse.", [
      "ω₀ = 900 · 2π/60 = 94,25 rad/s; ω = 0. α = (0 − 94,25)/20 = <b>−4,71 rad/s²</b> (signo negativo: frena).",
      "Δθ = ½(ω₀ + ω)·t = ½ · 94,25 · 20 = 942,5 rad → n = 942,5/2π = <b>150 vueltas</b>."
    ]) +
    ejemplo("Frenado sin conocer el tiempo", "Un disco gira a 10 rad/s y frena con α = −2,0 rad/s². ¿Qué ángulo recorre hasta detenerse y cuánto tarda?", [
      "Como no interviene el tiempo, usamos ω² = ω₀² + 2αΔθ: 0 = 100 + 2(−2,0)Δθ → Δθ = 100/4,0 = <b>25 rad</b> (≈ 3,98 vueltas).",
      "Tiempo: ω = ω₀ + αt → 0 = 10 − 2,0t → t = <b>5,0 s</b>."
    ]) +
    ejemplo("La lavadora que centrifuga", "El tambor de una lavadora pasa de 0 a 1 200 rpm en 15 s con aceleración angular constante. Calcula α y las vueltas que da durante la aceleración.", [
      "ω<sub>f</sub> = 1 200 · 2π/60 = 125,7 rad/s. α = 125,7/15 = <b>8,38 rad/s²</b>.",
      "Δθ = ½·ω<sub>f</sub>·t = ½ · 125,7 · 15 = 942,5 rad → <b>150 vueltas</b>."
    ]) +
    "<h5>Las dos componentes de la aceleración: tangencial y normal</h5>" +
    "<p>Cuando α ≠ 0, la aceleración de un punto del sólido tiene <b>dos componentes</b> perpendiculares entre sí (se descompone en los ejes tangente y normal a la trayectoria):</p>" +
    "<ul>" +
    "<li><b>Aceleración tangencial</b> a<sub>t</sub> = α·r: dirigida a lo largo de la tangente, cambia el <b>módulo</b> de la velocidad (se obtiene derivando v = ω·r y es la «aceleración lineal» del punto). Si el giro se acelera, tiene el mismo sentido que v; si frena, el contrario.</li>" +
    "<li><b>Aceleración normal</b> (centrípeta) a<sub>n</sub> = ω²·r = v²/r: dirigida al centro, cambia la <b>dirección</b> de la velocidad. Depende del valor <em>instantáneo</em> de ω, así que crece con el tiempo si el giro se acelera.</li>" +
    "</ul>" +
    "<p>Como son perpendiculares, el módulo de la aceleración total es el del teorema de Pitágoras, y forma con el radio un ángulo φ:</p>" +
    "<div class='formula-wrap'><div class='formula'>|a⃗| = " + raiz("a<sub>t</sub>² + a<sub>n</sub>²") + " &nbsp;&nbsp;&nbsp; tan φ = " + fr("a<sub>t</sub>", "a<sub>n</sub>") + "</div></div>" +
    w("f9_mcua") +
    "<p>Un caso extremo ayuda a entender los papeles: en el MCU, α = 0 y por tanto a<sub>t</sub> = 0 (la aceleración total es solo la centrípeta); en un movimiento rectilíneo (r → ∞), la aceleración normal v²/r tiende a 0 y queda sólo la tangencial a = dv/dt, que es la aceleración del Tema 8.</p>" +
    ejemplo("Un punto de una rueda que arranca", "Una rueda de radio 0,40 m parte del reposo con α = 2,0 rad/s². A los 3,0 s, calcula ω, la velocidad lineal del borde, las aceleraciones tangencial y normal, el módulo de la aceleración total y el ángulo que forma con el radio.", [
      "ω = α·t = <b>6,0 rad/s</b>; v = ω·r = 6,0 · 0,40 = <b>2,4 m/s</b>.",
      "a<sub>t</sub> = α·r = 2,0 · 0,40 = <b>0,80 m/s²</b>.",
      "a<sub>n</sub> = ω²·r = 36 · 0,40 = <b>14,4 m/s²</b>.",
      "|a⃗| = √(0,80² + 14,4²) = <b>14,4 m/s²</b>. El ángulo con el radio: tan φ = 0,80/14,4 → φ = <b>3,2°</b>: la aceleración total apunta casi al centro porque a<sub>n</sub> ≫ a<sub>t</sub>.",
      "Además, en estos 3,0 s la rueda ha girado Δθ = ½·2,0·9,0 = 9,0 rad = 1,43 vueltas."
    ]) +
    ejemplo("¿Cuánto tarda en dar la primera vuelta?", "Una rueda parte del reposo con α = 2,0 rad/s². ¿Cuánto tarda en dar una vuelta completa?", [
      "Una vuelta son 2π rad: 2π = ½·2,0·t² → t = √(2π) = <b>2,51 s</b>.",
      "Observa que la segunda vuelta tarda menos que la primera: la rueda va cada vez más deprisa (t₂ = √(4π) = 3,54 s para las dos vueltas, es decir, 1,04 s la segunda)."
    ]) +
    "<h5>Las gráficas del MCUA</h5>" +
    "<p>La gráfica <b>ω–t</b> de un MCUA es una recta cuya <b>pendiente es α</b>; el <b>área</b> bajo ella entre dos instantes es el <b>ángulo recorrido</b>. La gráfica <b>θ–t</b> es una <b>parábola</b> (un arco de parábola con θ = θ₀ + ω₀t + ½αt²), y su pendiente en cada instante es la velocidad angular instantánea. Todo esto es idéntico a las gráficas v–t y x–t del Tema 8 (si ω cambia de signo, el giro cambia de sentido en el punto en el que la recta corta el eje t). La gráfica <b>α–t</b> es una recta horizontal y el área bajo ella es la variación de velocidad angular Δω.</p>" +
    "<p>La analogía completa entre los dos temas permite reutilizar todo lo aprendido: cada problema de MCUA es un problema de MRUA con otras letras, con la diferencia de que, además, los puntos del sólido tienen una velocidad lineal v = ω·r y una aceleración tangencial a<sub>t</sub> = α·r que se obtienen multiplicando por el radio (¡no al revés!).</p>" +
    ojo("no olvides que la aceleración angular α <b>no</b> es la aceleración centrípeta. α mide cómo cambia la velocidad angular (rad/s²); a<sub>c</sub> mide cómo cambia la dirección de la velocidad (m/s²). Pueden valer cero una y no la otra: en un MCU, α = 0 pero a<sub>c</sub> ≠ 0. Y las unidades distintas (rad/s² frente a m/s²) delatan el error.");
})(window);
