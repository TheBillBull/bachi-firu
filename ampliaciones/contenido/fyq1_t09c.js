/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 9: Movimiento circular
   Parte C: secciones nuevas 7–11 (transmisiones, aplicaciones reales, encuentros, del MCU al MAS, método)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t9/" + ref); }
  var P = B._fq9;

  P.nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Transmisión del movimiento: engranajes, poleas y bicicleta",
      html:
        "<h5>Por qué hace falta transmitir el giro</h5>" +
        "<p>Casi todas las máquinas con partes giratorias —un reloj mecánico, una caja de cambios, una bicicleta, un motor que mueve una cinta— necesitan <b>transmitir</b> un giro de una rueda a otra, cambiando a menudo su velocidad. La clave para entender todos estos mecanismos es una única idea geométrica: <b>los puntos de dos ruedas que están en contacto (o unidos por una correa o una cadena) tienen la misma velocidad lineal</b>, porque si no uno resbalaría sobre el otro o la cadena se rompería. Como v = ω·r, la condición de «misma velocidad lineal en el borde» se traduce en una relación entre las velocidades angulares.</p>" +
        "<h5>Ruedas en contacto: engranajes</h5>" +
        "<p>En dos <b>engranajes</b> acoplados, los dientes de uno empujan a los del otro y los puntos de contacto se mueven con la misma velocidad: v₁ = v₂ → ω₁·r₁ = ω₂·r₂. Como el radio de un engranaje es proporcional a su número de dientes N (los dientes tienen el mismo tamaño en las dos ruedas para que encajen), también se cumple:</p>" +
        "<div class='formula-wrap'><div class='formula'>ω₁·r₁ = ω₂·r₂ &nbsp;&nbsp;⇔&nbsp;&nbsp; ω₁·N₁ = ω₂·N₂ &nbsp;&nbsp;⇔&nbsp;&nbsp; f₁·N₁ = f₂·N₂</div></div>" +
        "<p>Es decir, la rueda con <b>más dientes gira más despacio</b>. Y dos engranajes que engranan directamente giran en <b>sentidos contrarios</b> (si uno es antihorario, el otro es horario). Para que dos engranajes consecutivos giren en el mismo sentido hace falta un engranaje intermedio («loco»), que invierte el sentido dos veces y no altera la relación de velocidades.</p>" +
        w("f9_engranajes") +
        "<h5>Ruedas unidas por una correa o una cadena: poleas</h5>" +
        "<p>Cuando dos poleas están unidas por una <b>correa</b> (o dos ruedas dentadas por una cadena, como en la bicicleta), los puntos del borde de ambas tienen la velocidad de la correa: ω₁·r₁ = ω₂·r₂ = v<sub>correa</sub>. Aquí las dos ruedas giran en el <b>mismo sentido</b> (si la correa no está cruzada) y la polea más pequeña gira más deprisa. Con una correa cruzada en forma de ocho, el sentido se invierte.</p>" +
        "<h5>Ruedas sobre el mismo eje</h5>" +
        "<p>Si dos ruedas están unidas al mismo eje (como el piñón y la rueda trasera de una bicicleta, o las agujas de un reloj en el mismo mecanismo), giran <b>solidarias</b>: tienen la <b>misma velocidad angular</b>, aunque distinta velocidad lineal si sus radios son distintos. Combinando las tres situaciones se analiza cualquier tren de engranajes: «contacto o cadena → misma v», «mismo eje → misma ω».</p>" +
        tabla(["Situación", "Qué es igual", "Relación", "Sentido de giro"], [
          ["Engranajes en contacto", "velocidad lineal en el borde", "ω₁N₁ = ω₂N₂", "contrario"],
          ["Poleas con correa (o cadena)", "velocidad de la correa", "ω₁r₁ = ω₂r₂", "el mismo"],
          ["Ruedas en el mismo eje", "velocidad angular", "ω₁ = ω₂", "el mismo"],
          ["Rueda que rueda sin deslizar", "centro: v = ω·R", "v<sub>coche</sub> = ω·R", "—"]
        ]) +
        ejemplo("Un tren de engranajes", "El eje A gira a 1 200 rpm y lleva un engranaje de 20 dientes que engrana con otro de 40 dientes situado en el eje B. En el mismo eje B hay un engranaje de 15 dientes que engrana con otro de 45 dientes en el eje C. Calcula las rpm de B y C y los sentidos de giro (A es antihorario).", [
          "A → B: ω<sub>B</sub>·N = ω<sub>A</sub>·N<sub>A</sub> → ω<sub>B</sub> = 1 200 · 20/40 = <b>600 rpm</b>, en sentido <b>horario</b>.",
          "Los dos engranajes del eje B giran juntos (mismo eje): 600 rpm.",
          "B → C: ω<sub>C</sub> = 600 · 15/45 = <b>200 rpm</b>, en sentido <b>antihorario</b> (invierte de nuevo).",
          "Relación total: ω<sub>C</sub>/ω<sub>A</sub> = (20/40)·(15/45) = 1/6: el eje C va seis veces más lento que el A."
        ]) +
        ejemplo("Poleas con correa", "Un motor de 3 000 rpm tiene una polea de 5,0 cm de radio unida con una correa a otra polea de 15 cm de radio. ¿A cuántas rpm gira la segunda polea y cuál es la velocidad de la correa?", [
          "ω₁ = 3 000 · 2π/60 = 314,2 rad/s. Velocidad de la correa: v = ω₁·r₁ = 314,2 · 0,050 = <b>15,7 m/s</b>.",
          "ω₂ = v/r₂ = 15,7/0,15 = 104,7 rad/s → <b>1 000 rpm</b> (3 000 · 5/15), en el mismo sentido."
        ]) +
        "<h5>La bicicleta: cadena, piñón y rueda</h5>" +
        "<p>En una bicicleta, el <b>plato</b> (con N<sub>p</sub> dientes) gira con los pedales a la cadencia que marque el ciclista; la <b>cadena</b> lo une al <b>piñón</b> de la rueda trasera (N<sub>s</sub> dientes), con el que gira solidaria la rueda. Plato y piñón están unidos por la cadena (misma v en el borde) y piñón y rueda comparten eje (misma ω):</p>" +
        "<div class='formula-wrap'><div class='formula'>ω<sub>rueda</sub> = ω<sub>piñón</sub> = ω<sub>plato</sub> · " + fr("N<sub>p</sub>", "N<sub>s</sub>") + " &nbsp;&nbsp;&nbsp; v = ω<sub>rueda</sub>·R</div></div>" +
        "<p>Un plato grande con un piñón pequeño es una «marcha larga»: la rueda gira muchas vueltas por cada pedalada y se va más deprisa, pero cuesta más pedalear. Un plato pequeño con un piñón grande es una «marcha corta»: se avanza poco por pedalada pero con menos esfuerzo. Es la misma idea que en la caja de cambios de un coche.</p>" +
        ejemplo("Marchas de una bicicleta", "Una bicicleta tiene un plato de 44 dientes y un piñón de 16. El ciclista pedalea a 70 rpm y las ruedas miden 0,34 m de radio. Calcula las rpm de la rueda, la velocidad de la bicicleta y el avance por pedalada.", [
          "ω<sub>rueda</sub> = 70 · 44/16 = <b>192,5 rpm</b> = 20,16 rad/s.",
          "v = ω·R = 20,16 · 0,34 = <b>6,85 m/s ≈ 24,7 km/h</b>.",
          "Avance por pedalada (una vuelta del plato): 2π·R·(44/16) = 2,136 · 2,75 = <b>5,87 m</b>.",
          "Con el piñón de 32 dientes (marcha corta): 70 · 44/32 = 96,3 rpm → 12,3 km/h; el avance por pedalada se reduce a 2,94 m."
        ]) +
        "<h5>Rodar sin deslizar</h5>" +
        "<p>Una rueda que <b>rueda sin deslizar</b> sobre el suelo cumple que, por cada vuelta, el centro avanza una longitud igual a la circunferencia: v<sub>centro</sub> = ω·R. El punto de la rueda que toca el suelo está, en ese instante, <b>en reposo respecto del suelo</b> (por eso las ruedas no «arañan» el asfalto), y el punto más alto va al doble de la velocidad del coche (v<sub>coche</sub> + ω·R = 2v). Es una de las razones por las que el barro sale despedido hacia atrás desde la parte superior de una rueda en movimiento.</p>" +
        ojo("en las transmisiones hay que usar <b>velocidades angulares</b> (o rpm) para comparar ruedas que comparten eje, y <b>velocidades lineales</b> para comparar ruedas unidas por contacto o cadena. Si mezclas las dos reglas, te sale una relación al revés. Una comprobación rápida: la rueda más pequeña (o con menos dientes) siempre gira más deprisa que la más grande."),
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Movimientos circulares reales: de un CD a la Luna",
      html:
        "<h5>Ordenes de magnitud</h5>" +
        "<p>El movimiento circular uniforme es un modelo que describe muy bien una enorme variedad de sistemas reales, desde una rueda de bicicleta hasta la órbita de la Tierra. Calcular ω, v y a<sub>c</sub> para todos ellos ayuda a hacerse una idea de las magnitudes. En el simulador de abajo puedes elegir entre ocho situaciones y ver los resultados en el SI, en km/h y en múltiplos de g (9,8 m/s²).</p>" +
        w("f9_aplic") +
        "<p>Resumen de lo que se obtiene con los datos del simulador:</p>" +
        tabla(["Sistema", "r (m)", "T", "ω (rad/s)", "v", "a<sub>c</sub> (m/s²)"], [
          ["Rotación de la Tierra (ecuador)", "6,371·10⁶", "23 h 56 min", "7,292·10⁻⁵", "464,6 m/s", "0,0339"],
          ["Traslación de la Tierra", "1,496·10¹¹", "365,25 d", "1,991·10⁻⁷", "29,79 km/s", "5,93·10⁻³"],
          ["La Luna alrededor de la Tierra", "3,844·10⁸", "27,32 d", "2,662·10⁻⁶", "1,023 km/s", "2,72·10⁻³"],
          ["Rueda de bicicleta a 20 km/h", "0,34", "0,385 s", "16,34", "5,56 m/s", "90,8 (9,3 g)"],
          ["CD a 500 rpm (borde)", "0,060", "0,12 s", "52,36", "3,14 m/s", "164,5 (16,8 g)"],
          ["Tambor de lavadora a 1 200 rpm", "0,25", "0,05 s", "125,7", "31,4 m/s", "3 948 (403 g)"],
          ["Noria London Eye", "60", "30 min", "3,49·10⁻³", "0,209 m/s", "7,3·10⁻⁴"],
          ["Coche en curva a 72 km/h", "100", "—", "0,20", "20 m/s", "4,0"]
        ]) +
        "<p>Algunas observaciones útiles: (1) la Tierra se mueve alrededor del Sol a unos <b>107 000 km/h</b> aunque en la superficie no lo notemos; (2) a<sub>c</sub> es minúscula en los movimientos astronómicos (la aceleración centrípeta de la Tierra hacia el Sol es de unos 6 mm/s²) y enorme en las máquinas pequeñas que giran muy deprisa (la lavadora: 400 g); (3) en la rueda de la bicicleta el borde sufre unos 9 g, pero lo que sientes tú sobre la bici no es eso, sino la que corresponde a tu propio movimiento rectilíneo.</p>" +
        "<h5>La Tierra gira: el peso aparente en el ecuador</h5>" +
        "<p>Un objeto en reposo sobre el ecuador describe una circunferencia de radio R<sub>T</sub> con velocidad angular ω = 7,292·10⁻⁵ rad/s. Necesita por tanto una aceleración centrípeta ω²R<sub>T</sub> = 0,0339 m/s² dirigida al centro de la Tierra. Esa aceleración la proporciona una pequeña parte de la fuerza gravitatoria, de modo que sólo queda «g − a<sub>c</sub>» para presionar contra el suelo: el peso aparente en el ecuador es un 0,35 % menor (9,766 m/s² en vez de 9,8 m/s²) que en los polos, donde no hay giro. A esto se suma el abultamiento ecuatorial de la Tierra, de modo que la gravedad medida varía de 9,780 m/s² (ecuador) a 9,832 m/s² (polos).</p>" +
        "<h5>Los satélites geoestacionarios</h5>" +
        "<p>Un satélite <b>geoestacionario</b> da una vuelta alrededor de la Tierra en el mismo tiempo que ella gira (T = 86 164 s), siempre sobre el mismo punto del ecuador, y por eso «parece» fijo en el cielo (así funcionan las antenas parabólicas de la televisión por satélite). Su órbita está a 42 164 km del centro de la Tierra (unos 35 800 km de altura). Su velocidad es v = ω·r = 7,292·10⁻⁵ · 4,2164·10⁷ = <b>3 075 m/s ≈ 11 070 km/h</b> y su aceleración centrípeta a<sub>c</sub> = ω²r = <b>0,224 m/s²</b>, cuarenta y cuatro veces menor que g en la superficie. En el Tema 11 se verá que esa aceleración es la de la gravedad a esa distancia.</p>" +
        ejemplo("Aceleración de la Tierra hacia el Sol", "Calcula la velocidad y la aceleración centrípeta de la Tierra en su órbita (r = 1,496·10¹¹ m, T = 365,25 días).", [
          "T = 365,25 · 86 400 = 3,156·10⁷ s. ω = 2π/T = <b>1,991·10⁻⁷ rad/s</b>.",
          "v = ω·r = 1,991·10⁻⁷ · 1,496·10¹¹ = <b>2,98·10⁴ m/s ≈ 29,8 km/s</b> (107 000 km/h).",
          "a<sub>c</sub> = ω²·r = (1,991·10⁻⁷)² · 1,496·10¹¹ = <b>5,93·10⁻³ m/s²</b>: unas 1 650 veces menor que g. Esa aceleración es la que genera la atracción gravitatoria del Sol."
        ]) +
        ejemplo("El centrifugado de una lavadora", "El tambor de una lavadora (radio 25 cm) centrifuga a 1 200 rpm. Calcula la aceleración centrípeta de la ropa pegada a la pared del tambor y razona por qué el agua sale.", [
          "ω = 1 200 · 2π/60 = 125,7 rad/s. a<sub>c</sub> = ω²·r = 125,7² · 0,25 = <b>3 948 m/s² ≈ 403 g</b>.",
          "La ropa es empujada hacia el centro por la pared del tambor, que ejerce una fuerza centrípeta m·a<sub>c</sub>. El agua, en cambio, atraviesa los agujeros: nada la empuja hacia el centro, así que, por inercia, sigue en línea recta (tangente) y sale despedida. No hay una «fuerza centrífuga» que la expulse; es la primera ley de Newton (Tema 10)."
        ]),
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Móviles en trayectorias circulares: encuentros y coincidencias",
      html:
        "<h5>Cuándo se juntan dos móviles que giran</h5>" +
        "<p>Muchos problemas de movimiento circular preguntan <b>cuándo coinciden</b> dos móviles que giran: las agujas de un reloj, dos corredores en una pista, dos planetas, dos ruedas dentadas. El método es el del Tema 8 para los encuentros en línea recta, pero con ángulos: se escribe la posición angular de cada móvil, se igualan <b>salvo un número entero de vueltas</b> (porque en una circunferencia un ángulo y ese ángulo más 2π son el mismo punto) y se despeja el tiempo.</p>" +
        "<div class='formula-wrap'><div class='formula'>θ<sub>A</sub>(t) = θ<sub>B</sub>(t) + 2π·k &nbsp;&nbsp;&nbsp; (k = 0, ±1, ±2, …)</div></div>" +
        "<p>La condición permite obtener el <b>primer</b> encuentro (k = 0 o el menor k que da t &gt; 0) y los siguientes, que se repiten cada cierto intervalo (el <b>periodo de coincidencia</b>).</p>" +
        w("f9_coincidencia") +
        "<h5>Móviles que giran en el mismo sentido</h5>" +
        "<p>Si A es más rápido que B y los dos giran en el mismo sentido, A <b>alcanza</b> a B cuando le ha sacado una vuelta completa de ángulo: (ω<sub>A</sub> − ω<sub>B</sub>)·t = 2π. Como ω = 2π/T, queda una fórmula muy cómoda para los periodos, la misma que se usa para el reloj o para los planetas:</p>" +
        "<div class='formula-wrap'><div class='formula'>" + fr("1", "T<sub>enc</sub>") + " = " + fr("1", "T<sub>A</sub>") + " − " + fr("1", "T<sub>B</sub>") + " &nbsp;&nbsp;⇒&nbsp;&nbsp; T<sub>enc</sub> = " + fr("T<sub>A</sub>·T<sub>B</sub>", "T<sub>B</sub> − T<sub>A</sub>") + " &nbsp;&nbsp;(T<sub>A</sub> &lt; T<sub>B</sub>)</div></div>" +
        "<h5>Móviles que giran en sentidos opuestos</h5>" +
        "<p>Si giran en sentidos contrarios, se acercan más rápido: se encuentran cuando entre los dos suman una vuelta completa: (ω<sub>A</sub> + ω<sub>B</sub>)·t = 2π, es decir:</p>" +
        "<div class='formula-wrap'><div class='formula'>T<sub>enc</sub> = " + fr("T<sub>A</sub>·T<sub>B</sub>", "T<sub>A</sub> + T<sub>B</sub>") + "</div></div>" +
        ejemplo("Las manecillas del reloj", "¿Cada cuánto tiempo se superponen el minutero y la aguja horaria? ¿Cuántas veces lo hacen en 12 horas?", [
          "T<sub>min</sub> = 60 min; T<sub>hor</sub> = 720 min. T<sub>enc</sub> = 60·720/(720 − 60) = <b>65,45 min</b> = 1 h 5 min 27 s (= 12/11 h).",
          "En 12 h: 720/65,45 = <b>11 veces</b> (no 12): la superposición de las 12:00 de la segunda vuelta es la primera de la siguiente doce horas. Ocurren a las 12:00, 1:05:27, 2:10:55, 3:16:22, …"
        ]) +
        ejemplo("Dos corredores en una pista", "Dos corredores parten del mismo punto de una pista circular. A da una vuelta cada 60 s y B cada 80 s. ¿Cuándo vuelven a coincidir si corren en el mismo sentido? ¿Y si corren en sentidos opuestos?", [
          "Mismo sentido: T<sub>enc</sub> = 60·80/(80 − 60) = <b>240 s</b> (A ha dado 4 vueltas y B, 3).",
          "Sentidos opuestos: T<sub>enc</sub> = 60·80/(60 + 80) = <b>34,3 s</b> (se cruzan por primera vez; después se cruzan cada 34,3 s)."
        ]) +
        "<h5>Con ángulo inicial distinto de cero</h5>" +
        "<p>Cuando los móviles no parten del mismo punto, basta tener en cuenta la posición angular inicial de cada uno:</p>" +
        ejemplo("B va por delante de A", "A y B giran en sentido antihorario con ω<sub>A</sub> = 2,0 rad/s y ω<sub>B</sub> = 1,0 rad/s. En t = 0, B está 90° por delante de A. ¿Cuándo lo alcanza A? Después, ¿cada cuánto se vuelven a encontrar?", [
          "θ<sub>A</sub> = 2,0·t; θ<sub>B</sub> = π/2 + 1,0·t. Igualando: 2,0t = π/2 + t → <b>t = π/2 = 1,57 s</b>.",
          "Después, A sigue ganando 1,0 rad por segundo y vuelve a alcanzar a B cada vuelta de ventaja: T<sub>enc</sub> = 2π/(2,0 − 1,0) = <b>6,28 s</b>."
        ]) +
        ejemplo("Los periodos sinódicos: Tierra y Marte, y la Luna", "(a) La Tierra tarda 365,25 días y Marte 687 días en dar una vuelta al Sol. ¿Cada cuánto está Marte en oposición, es decir, cuándo la Tierra «alcanza» a Marte? (b) La Luna tarda 27,32 días en girar alrededor de la Tierra y la Tierra 365,25 días alrededor del Sol. ¿Cuánto dura el ciclo de fases de la Luna?", [
          "(a) T<sub>enc</sub> = 365,25·687/(687 − 365,25) = <b>780 días</b> (algo más de dos años). Por eso las ventanas de lanzamiento a Marte se abren cada 26 meses.",
          "(b) T<sub>enc</sub> = 27,32·365,25/(365,25 − 27,32) = <b>29,53 días</b>: el mes lunar (de luna nueva a luna nueva) es más largo que el periodo de la órbita de la Luna, 27,32 días, porque mientras la Luna da su vuelta, la Tierra se ha movido en su órbita y la Luna debe girar algo más para ver otra vez la misma fase."
        ]) +
        ojo("en un encuentro en una pista circular no basta con igualar las posiciones: hay que permitir un <b>número entero de vueltas</b> de diferencia (2π·k), porque al ser periódico el movimiento, A puede volver a coincidir con B con una o varias vueltas de ventaja. Y recuerda que si uno gira en sentido horario, su velocidad angular es <b>negativa</b>."),
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Del movimiento circular al movimiento oscilatorio (adelanto del Tema 13)",
      html:
        "<h5>La sombra de un punto que gira</h5>" +
        "<p>Imagina un punto que da vueltas con MCU alrededor de un centro y una linterna que lo ilumina desde un lado, de modo que su sombra se proyecta sobre una pared. La sombra se mueve hacia delante y hacia atrás, con una oscilación: sube y baja con exactamente el periodo de la rotación. Este movimiento oscilatorio es el <b>movimiento armónico simple</b> (MAS), que se estudia en el Tema 13. Lo importante aquí es que las magnitudes del MCU se reutilizan para describirlo: el radio de giro es la <b>amplitud</b> A de la oscilación, y la velocidad angular ω del MCU es la <b>frecuencia angular</b> del MAS.</p>" +
        w("f9_proyeccion") +
        "<h5>Las ecuaciones de la proyección</h5>" +
        "<p>Para un punto que gira en una circunferencia de radio A con posición angular θ = ω·t + φ₀, la coordenada x de su proyección sobre un eje es x = A·cos(ω·t + φ₀). Derivando respecto del tiempo, o lo que es lo mismo, proyectando sobre el eje x los vectores velocidad y aceleración centrípeta del MCU:</p>" +
        tabla(["Magnitud", "Expresión", "Valor máximo", "Cuándo"], [
          ["Elongación x", "A·cos(ωt + φ₀)", "A", "en los extremos"],
          ["Velocidad v<sub>x</sub>", "−A·ω·sen(ωt + φ₀)", "A·ω", "al pasar por el centro"],
          ["Aceleración a<sub>x</sub>", "−A·ω²·cos(ωt + φ₀) = −ω²·x", "A·ω²", "en los extremos"]
        ]) +
        "<p>La componente x de la aceleración centrípeta (módulo ω²·A, apuntando al centro) es −ω²·A·cos θ = −ω²·x: la aceleración de la sombra es <b>proporcional a la elongación y de sentido contrario</b>, que es la propiedad característica del MAS. Lo vimos en el apartado 5 de esta página: a⃗<sub>c</sub> = −ω²·r⃗.</p>" +
        ejemplo("Un pistón y su cigüeñal", "El cigüeñal de un motor gira a 3 000 rpm y su manivela mide 4,0 cm. El movimiento del pistón se aproxima, en primera aproximación, a la proyección de la manivela sobre un eje. Calcula el desplazamiento máximo, su velocidad máxima y su aceleración máxima.", [
          "ω = 3 000 · 2π/60 = 314,2 rad/s; A = 0,040 m.",
          "Desplazamiento máximo respecto del centro: <b>A = 4,0 cm</b>.",
          "v<sub>máx</sub> = A·ω = 0,040 · 314,2 = <b>12,6 m/s</b> (45 km/h), al pasar por el centro.",
          "a<sub>máx</sub> = A·ω² = 0,040 · 314,2² = <b>3 948 m/s² ≈ 403 g</b>, en los extremos: por eso las piezas de un motor tienen que ser tan resistentes."
        ]) +
        ejemplo("Tiempo entre dos posiciones", "Un punto gira en una circunferencia de radio 1,5 m con ω = 1,5 rad/s empezando en θ₀ = 0. ¿En qué instante está su sombra por primera vez en x = 0 (el centro)?", [
          "x = A·cos(ωt) = 0 → ωt = π/2 → t = (π/2)/1,5 = <b>1,05 s</b> (un cuarto del periodo T = 2π/1,5 = 4,19 s).",
          "En ese instante la sombra pasa por el centro con velocidad máxima: |v| = A·ω = 1,5 · 1,5 = 2,25 m/s."
        ]) +
        "<p>Este es el germen del Tema 13: cualquier cosa que oscile con MAS —un muelle, un péndulo con ángulos pequeños, la cuerda de una guitarra— se puede estudiar «como si» fuese la proyección de un movimiento circular de radio A y velocidad angular ω. La relación entre el periodo y la frecuencia, T = 2π/ω y f = 1/T, es la misma.</p>",
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Método de resolución y trucos de cálculo",
      html:
        "<h5>Un método para cualquier problema de movimiento circular</h5>" +
        H.pasos([
          "<b>Lee y dibuja.</b> Haz un esquema con el centro, el radio, el sentido de giro y los vectores que haga falta (velocidad tangente, aceleración hacia el centro). Marca el sentido positivo (antihorario).",
          "<b>Lista los datos</b> con símbolo, valor y unidad: r, T o f o rpm o ω, θ₀, t… Escribe qué se pide.",
          "<b>Pasa todo al SI:</b> rpm → rad/s (× 2π/60); km/h → m/s (÷ 3,6); grados → radianes (× π/180); cm → m.",
          "<b>Elige las relaciones:</b> ω = 2π/T = 2πf · v = ω·r · a<sub>c</sub> = v²/r = ω²r · θ = θ₀ + ωt (o las del MCUA) · en transmisiones, v igual (contacto) o ω igual (eje).",
          "<b>Despeja en letras</b> y sustituye al final, sin redondear los pasos intermedios.",
          "<b>Comprueba</b> unidades (rad/s, m/s, m/s²), signos y orden de magnitud (¿una rueda de bicicleta a 5 000 m/s? imposible)."
        ]) +
        "<h5>Tabla de conversión «a un golpe de vista»</h5>" +
        tabla(["Magnitud", "Símbolo", "Unidad SI", "Otras unidades", "Conversión"], [
          ["Posición/ángulo recorrido", "θ", "rad", "grados, vueltas", "2π rad = 360° = 1 vuelta"],
          ["Velocidad angular", "ω", "rad/s", "rpm, Hz, °/s", "1 rpm = 0,1047 rad/s; 1 Hz = 6,283 rad/s"],
          ["Periodo", "T", "s", "min, h, d", "T = 2π/ω = 1/f"],
          ["Frecuencia", "f", "Hz (= s⁻¹)", "rpm", "f = rpm/60"],
          ["Velocidad lineal", "v", "m/s", "km/h", "1 m/s = 3,6 km/h"],
          ["Aceleración centrípeta", "a<sub>c</sub>", "m/s²", "g", "1 g = 9,8 m/s²"],
          ["Aceleración angular", "α", "rad/s²", "rpm/s", "1 rpm/s = 0,1047 rad/s²"]
        ]) +
        "<h5>Análisis dimensional: una comprobación que no falla</h5>" +
        "<p>Las unidades de cada fórmula deben coincidir en los dos miembros. Comprueba, por ejemplo, a<sub>c</sub> = ω²·r: (rad/s)²·m = rad²·m/s², y como el radián es adimensional, queda m/s², la unidad de una aceleración. O v = 2πr/T: m/s. Si una fórmula que recuerdas mal da m/s³ o rad·s, es que está mal. La comprobación es especialmente útil con ω y f: ω = 2π·f tiene unidades de rad/s (ω) y de 1/s (f), de modo que 2π lleva implícito «rad por vuelta».</p>" +
        "<h5>Trucos para calcular deprisa</h5>" +
        "<ul>" +
        "<li><b>Cálculo con π en las rpm:</b> 1 rpm ≈ 0,105 rad/s; 60 rpm = 2π rad/s ≈ 6,28 rad/s; 300 rpm = 10π rad/s ≈ 31,4 rad/s. Muchas veces el enunciado se escoge para que salga π limpio.</li>" +
        "<li><b>Proporciones sin calculadora:</b> a r fijo, duplicar ω cuadruplica a<sub>c</sub>; a ω fijo, duplicar r duplica v y duplica a<sub>c</sub>; a v fijo, duplicar r divide a<sub>c</sub> entre 2.</li>" +
        "<li><b>Vueltas y fracciones de vuelta:</b> n = Δθ/2π; la parte decimal de n dice dónde queda el punto (0,25 → 90°, 0,5 → 180°…).</li>" +
        "<li><b>Cifras significativas:</b> en el cálculo con π, conserva π completo (la tecla de la calculadora) hasta el final y da el resultado con las cifras de los datos (tres suelen bastar).</li>" +
        "</ul>" +
        ejemplo("Aplicando el método completo", "Un disco de 30 cm de radio gira a 45 rpm. Calcula la velocidad lineal y la aceleración centrípeta de un punto del borde y de otro situado a 10 cm del centro, y el ángulo que gira en 2,0 s.", [
          "<b>Datos:</b> ω = 45 rpm; r<sub>1</sub> = 0,30 m; r<sub>2</sub> = 0,10 m; t = 2,0 s. <b>SI:</b> ω = 45 · 2π/60 = 4,712 rad/s (= 1,5π).",
          "<b>Borde:</b> v = ω·r = 4,712 · 0,30 = <b>1,41 m/s</b>; a<sub>c</sub> = ω²·r = 22,2 · 0,30 = <b>6,66 m/s²</b>.",
          "<b>A 10 cm:</b> v = 4,712 · 0,10 = <b>0,471 m/s</b>; a<sub>c</sub> = 22,2 · 0,10 = <b>2,22 m/s²</b>. Es un tercio de los valores del borde (r<sub>2</sub>/r<sub>1</sub> = 1/3).",
          "<b>Ángulo:</b> Δθ = ω·t = 4,712 · 2,0 = <b>9,42 rad</b> (= 3π) = 1,5 vueltas: acaba en el punto opuesto al de partida.",
          "<b>Comprobación:</b> 1,41 m/s ≈ 5,1 km/h: una velocidad razonable para el borde de un tocadiscos grande."
        ]),
    }
  ];
})(window);
