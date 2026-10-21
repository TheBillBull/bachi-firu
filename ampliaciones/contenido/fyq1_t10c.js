/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 10: Dinámica (las leyes de Newton)
   Parte C: secciones nuevas 7–12 (método, plano inclinado, cuerpos enlazados, dinámica circular, momento lineal, resistencia del aire)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t10/" + ref); }
  var P = B._fq10;

  P.nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Método para resolver problemas de dinámica",
      html:
        "<p>Los problemas de dinámica parecen todos distintos (un bloque, una polea, un ascensor, una curva…), pero se resuelven siempre con el mismo procedimiento. Cuanto más disciplinado seas con él, menos errores cometerás. Estos son los pasos:</p>" +
        "<ol>" +
        "<li><b>Haz un dibujo</b> de la situación y escribe los datos con sus unidades (pasa todo al SI: kg, m, s, N; 72 km/h = 20 m/s).</li>" +
        "<li><b>Elige el cuerpo</b> (o cada uno de los cuerpos, si hay varios) al que vas a aplicar la segunda ley.</li>" +
        "<li><b>Diagrama de cuerpo libre</b> de cada cuerpo: peso, normal, tensión, rozamiento, fuerza aplicada… sólo fuerzas reales y sólo las que actúan <i>sobre</i> ese cuerpo.</li>" +
        "<li><b>Elige los ejes</b>: uno en la dirección del movimiento (o hacia donde crees que va a acelerar) y otro perpendicular. En un plano inclinado, ejes paralelo y perpendicular al plano.</li>" +
        "<li><b>Descompón</b> en los ejes las fuerzas que no estén sobre ellos (el peso en el plano inclinado, una fuerza oblicua).</li>" +
        "<li><b>Escribe ΣF = m·a en cada eje</b>: en el eje perpendicular al movimiento, ΣF = 0 (suele dar la normal, y con ella el rozamiento μ·N); en el eje del movimiento, ΣF = m·a.</li>" +
        "<li><b>Relaciona los cuerpos</b> si hay varios: una cuerda inextensible hace que tengan la misma aceleración (en módulo); una cuerda de masa despreciable sobre una polea ideal tiene la misma tensión en todos sus puntos.</li>" +
        "<li><b>Resuelve y comprueba</b>: unidades, signo (¿acelera en el sentido que supusiste?), orden de magnitud y casos límite (sin rozamiento, masa infinita…).</li>" +
        "</ol>" +
        tabla(["Pregunta del problema", "Ecuación que hay que usar"], [
          ["¿Cuánto vale la normal?", "ΣF perpendicular al movimiento = 0 (si no hay aceleración en ese eje)"],
          ["¿Cuánto vale el rozamiento cinético?", "F<sub>r</sub> = μ<sub>c</sub>·N (después de calcular N)"],
          ["¿Se mueve o no?", "comparar la fuerza que tiende a mover con μ<sub>e</sub>·N"],
          ["¿Qué aceleración tiene?", "ΣF en el eje del movimiento = m·a"],
          ["¿Cuánto tarda / qué velocidad alcanza / cuánto recorre?", "con a: ecuaciones del MRUA (Tema 8)"],
          ["¿Qué tensión tiene la cuerda?", "ΣF = m·a de uno de los cuerpos (el más sencillo) una vez conocida a"]
        ]) +
        ejemplo("El método completo en un problema", "Un bloque de 4 kg está sobre una mesa horizontal y unido por una cuerda, que pasa por una polea ideal en el borde, a otro bloque de 2 kg que cuelga. El coeficiente de rozamiento entre el primer bloque y la mesa es 0,25 (g = 9,8 m/s²). Calcula la aceleración y la tensión.", [
          "<b>Cuerpos y DCL.</b> Bloque 1 (mesa): peso 39,2 N ↓, normal ↑, tensión T → (hacia la polea), rozamiento hacia atrás. Bloque 2: peso 19,6 N ↓ y tensión T ↑.",
          "<b>Vertical del bloque 1</b> (no se mueve en vertical): N = m₁g = 4·9,8 = 39,2 N → F<sub>r</sub> = μN = 0,25·39,2 = 9,8 N.",
          "<b>Segunda ley en el sentido del movimiento</b> (el bloque 2 baja y el 1 se desplaza hacia la polea; misma a): bloque 1: T − 9,8 = 4a; bloque 2: 19,6 − T = 2a.",
          "<b>Se suman las dos ecuaciones</b> (la tensión se cancela): 19,6 − 9,8 = 6a → a = <b>1,63 m/s²</b>.",
          "<b>Tensión</b> (del bloque 2): T = 19,6 − 2·1,633 = <b>16,33 N</b>. Comprobación con el bloque 1: 9,8 + 4·1,633 = 16,33 N ✓. Además T &lt; m₂g, como debe ser si el bloque 2 baja acelerando."
        ])
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. El plano inclinado",
      html:
        "<p>El plano inclinado es el problema más repetido de la dinámica, y también el que mejor ilustra el método. La clave es <b>elegir los ejes paralelo y perpendicular al plano</b>. En ese sistema, la normal y el rozamiento ya están sobre los ejes y sólo hay que descomponer el peso. Si el plano forma un ángulo θ con la horizontal, el peso m·g (vertical hacia abajo) forma un ángulo θ con el eje perpendicular al plano, así que sus componentes son:</p>" +
        formula("P<sub>∥</sub> = m·g·sen θ &nbsp;&nbsp;(a lo largo del plano, hacia abajo) &nbsp;&nbsp;&nbsp; P<sub>⊥</sub> = m·g·cos θ &nbsp;&nbsp;(contra el plano)") +
        "<p>(Para recordar cuál es seno y cuál coseno: si el plano es horizontal, θ = 0, todo el peso va contra el plano — P<sub>⊥</sub> = m·g — y nada a lo largo: el coseno vale 1 y el seno 0. Si el plano es vertical, θ = 90°, el cuerpo cae libremente: P<sub>∥</sub> = m·g.) Las ecuaciones son:</p>" +
        "<ul>" +
        "<li><b>Perpendicular al plano</b> (no hay movimiento): N − m·g·cos θ = 0 → <b>N = m·g·cos θ</b>.</li>" +
        "<li><b>A lo largo del plano</b> (bajando, eje + hacia abajo): m·g·sen θ − μ·N = m·a → <b>a = g·(sen θ − μ·cos θ)</b>.</li>" +
        "<li>Sin rozamiento (μ = 0): <b>a = g·sen θ</b>, <i>independiente de la masa</i>. Todos los cuerpos resbalan por un plano liso con la misma aceleración.</li>" +
        "</ul>" +
        "<p>El cuerpo sólo resbala si P<sub>∥</sub> supera el rozamiento estático máximo: m·g·sen θ &gt; μ<sub>e</sub>·m·g·cos θ ⇔ tan θ &gt; μ<sub>e</sub>. Es el <b>ángulo crítico</b> θ<sub>c</sub> = arctan μ<sub>e</sub>: por debajo de él el cuerpo no se mueve, por muy grande que sea su masa (la masa se cancela). Así se mide μ<sub>e</sub> en un laboratorio: se inclina lentamente el plano hasta que el bloque empieza a resbalar y se mide el ángulo.</p>" +
        w("f10_plano") +
        ejemplo("Plano liso", "Un bloque de 10 kg se suelta desde el reposo en lo alto de un plano inclinado 30° sin rozamiento y de 6 m de largo. Calcula la normal, la aceleración, el tiempo en llegar abajo y la velocidad final (g = 9,8 m/s²).", [
          "N = m·g·cos 30° = 98·0,866 = <b>84,87 N</b>.",
          "a = g·sen 30° = 9,8·0,5 = <b>4,9 m/s²</b>.",
          "6 = ½·4,9·t² → t = √(12/4,9) = <b>1,56 s</b>.",
          "v = a·t = 4,9·1,565 = 7,67 m/s; con v² = 2as = 2·4,9·6 = 58,8 → <b>v = 7,67 m/s</b> ✓."
        ]) +
        ejemplo("Plano con rozamiento", "El mismo plano (30°), pero con μ = 0,25. Calcula la aceleración y la fuerza de rozamiento.", [
          "N = 84,87 N → F<sub>r</sub> = μ·N = 0,25·84,87 = <b>21,2 N</b> (hacia arriba del plano).",
          "ΣF = P<sub>∥</sub> − F<sub>r</sub> = 49 − 21,2 = 27,8 N → a = 27,8/10 = <b>2,78 m/s²</b>.",
          "Con la fórmula: a = g(sen θ − μ cos θ) = 9,8·(0,5 − 0,25·0,866) = 9,8·0,2835 = 2,78 m/s² ✓."
        ]) +
        ejemplo("Subir una carga por una rampa", "Se sube un bloque de 20 kg por una rampa de 20° con μ = 0,15, tirando de él con una fuerza paralela al plano. Calcula la fuerza necesaria a) para subir con velocidad constante y b) para subir con aceleración de 0,5 m/s².", [
          "P<sub>∥</sub> = 196·sen 20° = 67,04 N; N = 196·cos 20° = 184,18 N; F<sub>r</sub> = 0,15·184,18 = 27,63 N (al subir, el rozamiento va hacia abajo del plano).",
          "a) Velocidad constante: ΣF = 0 → F = P<sub>∥</sub> + F<sub>r</sub> = 67,04 + 27,63 = <b>94,7 N</b>.",
          "b) F − P<sub>∥</sub> − F<sub>r</sub> = m·a → F = 94,66 + 20·0,5 = <b>104,7 N</b>."
        ]) +
        ejemplo("El ángulo crítico", "Un bloque de madera sobre una tabla comienza a resbalar cuando la tabla se inclina 31°. ¿Cuánto vale μ<sub>e</sub>? Si se pone encima una carga que duplica la masa, ¿a qué ángulo resbalará?", [
          "En el límite, m·g·sen θ = μ<sub>e</sub>·m·g·cos θ → μ<sub>e</sub> = tan θ<sub>c</sub> = tan 31° = <b>0,60</b>.",
          "La masa se cancela en la ecuación: el ángulo crítico <b>sigue siendo 31°</b> aunque se duplique la masa (más peso empuja más hacia abajo del plano, pero también aprieta más contra él)."
        ]) +
        tabla(["θ", "N", "P∥", "Observación"], [
          ["0° (horizontal)", "m·g", "0", "el cuerpo no tiende a deslizar"],
          ["30°", "0,866·m·g", "0,5·m·g", "a = g/2 sin rozamiento"],
          ["45°", "0,707·m·g", "0,707·m·g", "N y P∥ son iguales"],
          ["90° (vertical)", "0", "m·g", "caída libre: no hay apoyo"]
        ])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Cuerpos enlazados: cuerdas y poleas",
      html:
        "<p>Muchos problemas incluyen varios cuerpos que se influyen entre sí: dos bloques unidos por una cuerda, un tren con vagones, un cuerpo que tira de otro a través de una polea. Se resuelven con el mismo método, pero con una condición añadida: hay que <b>relacionar los movimientos</b> de los cuerpos y las fuerzas que se transmiten entre ellos.</p>" +
        "<h5>Reglas del juego</h5>" +
        "<ul>" +
        "<li><b>Cuerda inextensible</b>: si un extremo avanza una distancia, el otro también; por tanto <b>los dos cuerpos tienen la misma aceleración en módulo</b> (aunque cada uno se mueva en distinta dirección: uno sube y el otro baja).</li>" +
        "<li><b>Cuerda de masa despreciable y polea ideal</b> (sin masa ni rozamiento): <b>la tensión es la misma en toda la cuerda</b>, aunque cambie de dirección al pasar por la polea.</li>" +
        "<li>La cuerda sólo <b>tira</b> (nunca empuja) y lo hace a lo largo de ella, sobre cada cuerpo que la ata.</li>" +
        "<li>Cada cuerpo tiene <b>su propio diagrama de cuerpo libre y su propia ecuación</b>; el truco es <b>sumarlas</b> para eliminar la tensión y obtener a, o, si sólo hay que calcular a, tomar todo el conjunto como un único cuerpo.</li>" +
        "<li>Un buen consejo: antes de empezar, <b>elige un sentido positivo del movimiento</b> para cada cuerpo (hacia donde crees que acelerará). Si al final a sale negativa, es que se mueve al revés de lo supuesto: el resultado sigue siendo válido.</li>" +
        "</ul>" +
        w("f10_poleas") +
        ejemplo("La máquina de Atwood", "Dos masas de 3 kg y 5 kg cuelgan de los extremos de una cuerda que pasa por una polea ideal. Calcula la aceleración y la tensión (g = 9,8 m/s²).", [
          "Sentido positivo: m₂ (5 kg) baja y m₁ (3 kg) sube. m₂: m₂g − T = m₂a → 49 − T = 5a. m₁: T − m₁g = m₁a → T − 29,4 = 3a.",
          "Suma: 49 − 29,4 = 8a → a = (m₂ − m₁)g/(m₁ + m₂) = 19,6/8 = <b>2,45 m/s²</b>.",
          "T = 29,4 + 3·2,45 = <b>36,75 N</b>. (Comprobación con m₂: 49 − 5·2,45 = 36,75 N ✓.) Fíjate en que 29,4 N &lt; T &lt; 49 N: la tensión queda entre los dos pesos.",
          "Fórmula general: T = 2·m₁·m₂·g/(m₁ + m₂) = 2·15·9,8/8 = 36,75 N."
        ]) +
        ejemplo("Un bloque en la mesa y otro colgando", "Un bloque de 6 kg está sobre una mesa con μ = 0,2, unido a otro de 2 kg que cuelga. Calcula la aceleración y la tensión. ¿Se mueve realmente?", [
          "Comprobación previa: el bloque colgante tira con m₂g = 19,6 N; el rozamiento máximo en la mesa es μ·m₁g = 0,2·58,8 = 11,76 N. Como 19,6 &gt; 11,76, <b>sí se mueve</b>.",
          "Mesa (bloque 1): T − 11,76 = 6a. Colgante (bloque 2): 19,6 − T = 2a.",
          "Suma: 19,6 − 11,76 = 8a → a = <b>0,98 m/s²</b>. Tensión: T = 19,6 − 2·0,98 = <b>17,64 N</b>."
        ]) +
        ejemplo("Un tren con locomotora y dos vagones", "Una locomotora de 40 t arrastra dos vagones de 20 t y 10 t (enganchados a continuación de ella, en ese orden) con una fuerza motriz neta de 60 kN. Calcula la aceleración y las fuerzas en los dos enganches (sin rozamiento).", [
          "Todo el tren: m = 70 t = 70 000 kg → a = 60 000/70 000 = <b>0,857 m/s²</b>.",
          "El enganche locomotora–primer vagón arrastra a los dos vagones: T₁ = (20 000 + 10 000)·0,857 = <b>25 714 N</b>.",
          "El enganche entre los vagones arrastra sólo al último: T₂ = 10 000·0,857 = <b>8571 N</b>.",
          "Comprobación en la locomotora: 60 000 − 25 714 = 34 286 N = 40 000·0,857 ✓."
        ]) +
        ojo("la tensión de una cuerda <b>no</b> es, en general, igual al peso del cuerpo que cuelga: sólo lo es si no hay aceleración. Si el cuerpo que cuelga baja acelerando, T &lt; m·g; si sube acelerando, T &gt; m·g.")
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Dinámica del movimiento circular",
      html:
        "<p>En el Tema 9 viste que un cuerpo que describe una circunferencia tiene siempre aceleración (aunque su rapidez sea constante), dirigida hacia el centro: la aceleración centrípeta a<sub>c</sub> = v²/r. La segunda ley dice entonces que tiene que haber una fuerza neta hacia el centro: la <b>fuerza centrípeta</b>.</p>" +
        formula("ΣF<sub>normal</sub> = m·a<sub>c</sub> = m·" + fr("v²", "r") + " = m·ω²·r") +
        "<p>La palabra «centrípeta» describe el <i>papel</i> de la fuerza, no su naturaleza: <b>no es una fuerza nueva que haya que añadir al diagrama de cuerpo libre</b>. Es la resultante (en la dirección hacia el centro) de las fuerzas reales que ya has dibujado: la tensión de la cuerda en una honda, el rozamiento en una curva plana, la normal y el rozamiento en una curva peraltada, la gravedad en una órbita. Si se corta la cuerda, la piedra no sale «despedida hacia fuera»: sigue en línea recta por la tangente, con la velocidad que tenía (primera ley).</p>" +
        "<p>La «fuerza centrífuga» que parece lanzarte hacia fuera cuando el coche gira es una consecuencia de la inercia: tu cuerpo tiende a seguir en línea recta mientras el coche gira, y notas la puerta empujándote hacia dentro. Sólo existe como invento para describir las cosas desde dentro del coche, que es un sistema no inercial. No se dibuja en los diagramas de cuerpo libre.</p>" +
        "<p>Método: se toma un eje <b>radial</b> (hacia el centro) y otro <b>perpendicular al plano de la órbita o tangente</b>. En el eje radial, la suma de las fuerzas dirigidas hacia el centro menos las que apuntan hacia fuera es m·v²/r. En el eje perpendicular (si no hay aceleración en él), la suma es cero.</p>" +
        w("f10_curva") +
        ejemplo("Una piedra atada a una cuerda", "Una piedra de 0,5 kg gira en un plano horizontal (sin rozamiento) atada a una cuerda de 0,8 m con una rapidez de 4 m/s. ¿Qué tensión soporta la cuerda?", [
          "La única fuerza horizontal es la tensión, dirigida al centro: T = m·v²/r = 0,5·16/0,8 = <b>10 N</b>.",
          "Si la rapidez se duplica, la tensión se hace cuatro veces mayor (40 N): por eso las cuerdas se rompen a gran velocidad."
        ]) +
        ejemplo("Curva plana: la velocidad máxima", "¿A qué velocidad máxima puede tomar un coche una curva plana de 50 m de radio si el coeficiente de rozamiento es 0,6?", [
          "El rozamiento estático es la fuerza centrípeta: m·v²/r ≤ μ·N = μ·m·g (N = m·g en horizontal).",
          "v<sub>máx</sub> = √(μ·g·r) = √(0,6·9,8·50) = √294 = <b>17,1 m/s = 61,7 km/h</b>. La masa se cancela: un camión y un coche tienen el mismo límite.",
          "Con hielo (μ = 0,1) el límite baja a √(0,1·9,8·50) = 7 m/s = 25 km/h."
        ]) +
        ejemplo("El peralte", "Una curva de 100 m de radio se peralta (se inclina hacia dentro) para que se pueda tomar a 72 km/h sin necesidad de rozamiento. ¿Qué ángulo debe tener?", [
          "72 km/h = 20 m/s. Sin rozamiento, sólo actúan el peso y la normal (perpendicular a la calzada, inclinada θ).",
          "Vertical: N·cos θ = m·g. Horizontal (hacia el centro): N·sen θ = m·v²/r.",
          "Dividiendo: tan θ = v²/(r·g) = 400/(100·9,8) = 0,408 → <b>θ = 22,2°</b>."
        ]) +
        ejemplo("Un puente y un valle", "Un coche de 1000 kg pasa a 10 m/s por la cima de un puente curvo (convexo) de 40 m de radio y por el fondo de un valle del mismo radio. Calcula la normal en cada punto (g = 9,8 m/s²).", [
          "Cima: el centro de la curva queda <i>debajo</i>: m·g − N = m·v²/r → N = m(g − v²/r) = 1000·(9,8 − 2,5) = <b>7300 N</b> (menos que el peso: se «aligera»).",
          "Valle: el centro queda <i>encima</i>: N − m·g = m·v²/r → N = m(g + v²/r) = 1000·(9,8 + 2,5) = <b>12 300 N</b> (más que el peso: te «aprietas» contra el asiento).",
          "Si en la cima v²/r = g (v = √(g·r) = 19,8 m/s), N = 0: el coche pierde el contacto con el suelo."
        ])
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Cantidad de movimiento, impulso y choques",
      html:
        "<h5>La cantidad de movimiento</h5>" +
        "<p>Una bala ligera y rápida y un camión lento pueden ser igual de difíciles de parar. Para medir esa «cantidad de movimiento» que lleva un cuerpo, se define el <b>momento lineal</b> o cantidad de movimiento como el producto de la masa por la velocidad:</p>" +
        formula("p⃗ = m·v⃗ &nbsp;&nbsp;(kg·m/s)") +
        "<p>Es un vector con la dirección y el sentido de la velocidad. La segunda ley, en su forma original, dice que la fuerza neta es la rapidez con que cambia p: <b>ΣF = Δp/Δt</b>. Despejando se obtiene el <b>impulso</b> I = ΣF·Δt, que es igual a la variación de la cantidad de movimiento:</p>" +
        formula("I⃗ = ΣF⃗·Δt = Δp⃗ = m·v⃗<sub>f</sub> − m·v⃗<sub>i</sub>") +
        "<p>Esto explica por qué los airbags, los cascos y las zonas de deformación de los coches salvan vidas: el cambio de cantidad de movimiento que sufre una persona en un choque es fijo (de su velocidad a cero), así que, si se alarga el tiempo Δt de la frenada, la fuerza media F = Δp/Δt disminuye. Del mismo modo, se flexionan las rodillas al caer, y un portero retrocede las manos al parar un balón.</p>" +
        "<h5>Conservación de la cantidad de movimiento</h5>" +
        "<p>Si sobre un sistema de cuerpos no actúan fuerzas externas (o su resultante es cero), las fuerzas entre los cuerpos del sistema son parejas de acción-reacción: iguales, opuestas y durante el mismo tiempo, y por tanto los impulsos se anulan. En consecuencia, <b>la cantidad de movimiento total del sistema se conserva</b>: p<sub>antes</sub> = p<sub>después</sub>. Para dos cuerpos en una dimensión:</p>" +
        formula("m₁·v₁ + m₂·v₂ = m₁·v₁′ + m₂·v₂′") +
        "<p>Es una de las leyes más importantes de la física: vale en choques, explosiones y retrocesos, y su uso evita analizar las fuerzas (que suelen ser muy intensas y breves y de valor desconocido). Hay que tener en cuenta los <b>signos</b>: la velocidad hacia un lado es positiva y hacia el otro, negativa.</p>" +
        "<h5>Tipos de choque</h5>" +
        tabla(["Tipo de choque", "¿Se conserva p?", "¿Se conserva E<sub>c</sub>?", "Qué ocurre"], [
          ["<b>Elástico</b> (e = 1)", "sí", "sí", "los cuerpos rebotan sin deformarse; v₂′ − v₁′ = v₁ − v₂ (se «alejan» como se acercaban)"],
          ["<b>Inelástico</b> (0 &lt; e &lt; 1)", "sí", "no (se pierde parte)", "rebotan con menos velocidad relativa; parte de E<sub>c</sub> se convierte en calor y deformación"],
          ["<b>Perfectamente inelástico</b> (e = 0)", "sí", "no (se pierde la máxima posible)", "quedan unidos y se mueven con la misma velocidad: v′ = (m₁v₁ + m₂v₂)/(m₁ + m₂)"]
        ]) +
        "<p>El <b>coeficiente de restitución</b> e = (v₂′ − v₁′)/(v₁ − v₂) mide cuánto «rebotan» los cuerpos (la velocidad relativa de alejamiento dividida entre la de acercamiento). Con la conservación de p y esa definición se obtienen las velocidades finales: v₁′ = [(m₁ − e·m₂)v₁ + (1 + e)m₂v₂]/(m₁ + m₂) y v₂′ = [(m₂ − e·m₁)v₂ + (1 + e)m₁v₁]/(m₁ + m₂). Casos de interés: con masas iguales y choque elástico los cuerpos <b>intercambian</b> sus velocidades; un cuerpo ligero que choca contra uno muy pesado en reposo rebota con casi la misma velocidad.</p>" +
        w("f10_choque") +
        ejemplo("El golpe a una pelota (impulso)", "Un jugador golpea una pelota de 0,15 kg que llega a 20 m/s; la pelota sale en sentido contrario con 20 m/s, y el contacto dura 0,01 s. Calcula el impulso y la fuerza media sobre la pelota.", [
          "Sentido positivo: el de llegada. v<sub>i</sub> = +20 m/s; v<sub>f</sub> = −20 m/s.",
          "I = m(v<sub>f</sub> − v<sub>i</sub>) = 0,15·(−20 − 20) = <b>−6 N·s</b> (módulo 6 N·s, contra la llegada).",
          "F<sub>media</sub> = I/Δt = 6/0,01 = <b>600 N</b>: ¡unas 400 veces el peso de la pelota (1,47 N)!"
        ]) +
        ejemplo("Retroceso", "Un astronauta de 90 kg, en reposo en el espacio, lanza una herramienta de 3 kg a 6 m/s. ¿Con qué velocidad retrocede?", [
          "Antes, p = 0. Después, la cantidad de movimiento total sigue siendo 0: 90·v + 3·6 = 0.",
          "v = −18/90 = <b>−0,2 m/s</b> (20 cm/s en sentido contrario al de la herramienta). Es el principio de funcionamiento de un cohete."
        ]) +
        ejemplo("Un choque que acaba en un enganche", "Un coche de 1000 kg que va a 20 m/s alcanza un camión de 4000 kg que circula en el mismo sentido a 10 m/s; tras el golpe quedan unidos. Calcula la velocidad final y la energía que se pierde.", [
          "Conservación de p: 1000·20 + 4000·10 = (1000 + 4000)·v → v = 60 000/5000 = <b>12 m/s</b>.",
          "E<sub>c</sub> antes = ½·1000·20² + ½·4000·10² = 200 000 + 200 000 = 400 000 J. E<sub>c</sub> después = ½·5000·12² = 360 000 J.",
          "Energía perdida: <b>40 000 J</b> (en calor y en deformar las carrocerías)."
        ]) +
        ejemplo("Un choque elástico", "Un carrito de 2 kg que va a 5 m/s choca elásticamente con otro de 3 kg en reposo. Calcula las velocidades finales.", [
          "Con e = 1: v₁′ = (m₁ − m₂)v₁/(m₁ + m₂) = (2 − 3)·5/5 = <b>−1 m/s</b> (rebota). v₂′ = 2m₁v₁/(m₁ + m₂) = 2·2·5/5 = <b>4 m/s</b>.",
          "Comprobación: p antes = 10; p después = 2·(−1) + 3·4 = 10 ✓. E<sub>c</sub> antes = ½·2·25 = 25 J; después = ½·2·1 + ½·3·16 = 25 J ✓."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. La resistencia del aire y la velocidad límite",
      html:
        "<p>Hasta ahora has tratado las caídas sin aire, y has visto que todos los cuerpos caen con la misma aceleración g. Pero en la vida real un paracaidista no cae cada vez más deprisa sin límite. Cuando un cuerpo se mueve dentro de un fluido (aire o agua) sufre una <b>fuerza de resistencia</b> que se opone a su velocidad y que <b>aumenta con ella</b>. Para velocidades moderadas en el aire (desde las de un ciclista hasta las de un paracaidista) la resistencia es, de forma aproximada, proporcional al <b>cuadrado de la velocidad</b>: F<sub>aire</sub> = k·v², donde k depende de la forma y del área frontal del cuerpo y de la densidad del aire.</p>" +
        "<p>Imagina que un cuerpo se suelta desde el reposo. Al principio v ≈ 0, la resistencia es despreciable y la aceleración es g. Conforme la velocidad aumenta, también lo hace F<sub>aire</sub>, y la fuerza neta m·g − k·v² y la aceleración disminuyen. Cuando la resistencia iguala al peso, ΣF = 0, la aceleración se anula y, por la primera ley, el cuerpo sigue cayendo con <b>velocidad constante</b>: la <b>velocidad límite</b> (o terminal):</p>" +
        formula("m·g = k·v<sub>lím</sub>² &nbsp;&nbsp;⇒&nbsp;&nbsp; v<sub>lím</sub> = √(" + fr("m·g", "k") + ")") +
        "<p>Un paracaidista cayendo con el cuerpo extendido alcanza unos 55 m/s (200 km/h); con el paracaídas abierto, su área frontal es unas cien veces mayor, k aumenta enormemente y la velocidad límite baja a unos 5–6 m/s. Una gota de lluvia llega a unos 8 m/s: sin resistencia del aire, una gota que cae de una nube a 2 km llegaría a 200 m/s y sería un proyectil. La resistencia explica también que una pluma caiga más despacio que una piedra (v<sub>lím</sub> de la pluma ≈ 1 m/s).</p>" +
        w("f10_caida") +
        ejemplo("La constante k de un paracaidista", "Un paracaidista de 80 kg alcanza una velocidad límite de 55 m/s en caída libre y de 6 m/s con el paracaídas abierto. Calcula k en cada caso y la resistencia que sufre a 25 m/s con el cuerpo extendido (g = 9,8 m/s²).", [
          "k = m·g/v<sub>lím</sub>². Cuerpo extendido: k = 784/55² = 784/3025 = <b>0,259 kg/m</b>.",
          "Paracaídas abierto: k = 784/6² = 784/36 = <b>21,8 kg/m</b> (84 veces mayor).",
          "A 25 m/s con el cuerpo extendido: F<sub>aire</sub> = 0,259·25² = <b>162 N</b>; ΣF = 784 − 162 = 622 N → a = 7,8 m/s² (todavía acelera mucho)."
        ]) +
        ojo("en la velocidad límite el cuerpo <b>sigue sufriendo fuerzas</b> (peso y resistencia, iguales y opuestas); lo que ocurre es que la fuerza <i>neta</i> es cero y por eso no acelera. No es lo mismo «no hay fuerzas» que «las fuerzas se compensan».")
    }
  ];
})(window);
