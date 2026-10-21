/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 13: Movimiento armónico simple
   Parte D: problemas tipo PAU, historia, «¿Qué falla aquí?», autocomprobación y datos de las actividades
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t13/" + ref); }
  var P = B._fq13;

  P.nuevas.push(
    // -------------------------------------------------------------- 11
    {
      h: "11. Seis problemas tipo examen (PAU) resueltos paso a paso",
      html:
        "<p>Resuélvelos tú antes de mirar la solución. Se usa g = 9,8 m/s² y la calculadora en <b>radianes</b>.</p>" +
        ejemplo("Problema 1 · Un cuerpo en un muelle horizontal", "Un cuerpo de 0,5 kg está unido a un muelle horizontal de constante 50 N/m. Se separa 10 cm de su posición de equilibrio y se suelta. Calcula: a) la frecuencia angular, el periodo y la frecuencia; b) la ecuación del movimiento; c) la velocidad y la aceleración máximas; d) la energía mecánica; e) la velocidad cuando está a 6 cm del equilibrio.", [
          "<b>a)</b> ω = √(k/m) = √(50/0,5) = √100 = <b>10 rad/s</b>; T = 2π/ω = <b>0,628 s</b>; f = 1/T = <b>1,59 Hz</b>.",
          "<b>b)</b> Se suelta desde un extremo en reposo: A = 0,10 m y φ₀ = 0 → <b>x(t) = 0,10·cos(10t)</b> m.",
          "<b>c)</b> v<sub>máx</sub> = A·ω = 0,10·10 = <b>1 m/s</b>; a<sub>máx</sub> = A·ω² = 0,10·100 = <b>10 m/s²</b>.",
          "<b>d)</b> E<sub>m</sub> = ½·k·A² = ½·50·0,10² = <b>0,25 J</b>.",
          "<b>e)</b> v = ω·√(A² − x²) = 10·√(0,0100 − 0,0036) = 10·0,08 = <b>0,8 m/s</b>. Comprobación: E<sub>p</sub> = ½·50·0,06² = 0,09 J; E<sub>c</sub> = 0,25 − 0,09 = 0,16 J = ½·0,5·0,8² ✓."
        ]) +
        ejemplo("Problema 2 · Analizar una ecuación con seno", "Un MAS está descrito por x(t) = 0,05·sen(8π·t + π/4) (SI). Calcula: a) la amplitud, la frecuencia angular, la frecuencia y el periodo; b) la posición y la velocidad iniciales; c) la posición, la velocidad y la aceleración en t = 0,125 s.", [
          "<b>a)</b> <b>A = 0,05 m</b>; <b>ω = 8π = 25,13 rad/s</b>; f = ω/2π = <b>4 Hz</b>; T = <b>0,25 s</b>.",
          "<b>b)</b> x(0) = 0,05·sen(π/4) = <b>0,0354 m</b>. v = A·ω·cos(ωt + π/4) → v(0) = 0,05·25,13·cos(π/4) = <b>0,889 m/s</b> (positiva: se aleja del centro hacia +).",
          "<b>c)</b> En t = 0,125 s (justo medio periodo): el ángulo es 8π·0,125 + π/4 = π + π/4 = 5π/4. x = 0,05·sen(5π/4) = <b>−0,0354 m</b>; v = 0,05·25,13·cos(5π/4) = <b>−0,889 m/s</b>; a = −ω²·x = −631,7·(−0,0354) = <b>+22,3 m/s²</b>.",
          "Observa que medio periodo después la posición y la velocidad han cambiado de signo (x y v opuestas a las iniciales) y que a tiene el signo contrario de x."
        ]) +
        ejemplo("Problema 3 · Muelle vertical", "Un muelle se alarga 10 cm cuando se cuelga de él una masa de 0,5 kg. Después se tira de la masa 5 cm hacia abajo desde su posición de equilibrio y se suelta. Calcula: a) la constante del muelle; b) el periodo; c) la ecuación del movimiento (x positiva hacia abajo desde el equilibrio); d) la velocidad máxima; e) la energía mecánica; f) la fuerza máxima que hace el muelle.", [
          "<b>a)</b> k·Δℓ = m·g → k = 0,5·9,8/0,10 = <b>49 N/m</b>.",
          "<b>b)</b> ω = √(k/m) = √(49/0,5) = √98 = 9,90 rad/s → T = 2π/ω = <b>0,635 s</b>.",
          "<b>c)</b> A = 0,05 m (se suelta del extremo inferior, φ₀ = 0 con x hacia abajo) → <b>x(t) = 0,05·cos(9,90·t)</b> m.",
          "<b>d)</b> v<sub>máx</sub> = A·ω = 0,05·9,90 = <b>0,495 m/s</b> (al pasar por el equilibrio).",
          "<b>e)</b> E<sub>m</sub> = ½·k·A² = ½·49·0,05² = <b>0,0613 J</b> (energía de la oscilación respecto del equilibrio).",
          "<b>f)</b> La fuerza del muelle es máxima en el extremo inferior, donde el alargamiento es Δℓ + A = 0,15 m: F = k·0,15 = <b>7,35 N</b>. Comprobación: m·g + m·a<sub>máx</sub> = 4,9 + 0,5·4,9 = 7,35 N ✓ (con a<sub>máx</sub> = Aω² = 4,9 m/s²)."
        ]) +
        ejemplo("Problema 4 · Muelles asociados", "Dos muelles de constantes 100 N/m y 300 N/m se asocian primero en serie y luego en paralelo, y de cada asociación se cuelga una masa de 2 kg. Calcula la constante equivalente y el periodo de oscilación en cada caso.", [
          "<b>Serie:</b> 1/k = 1/100 + 1/300 = 4/300 → k = <b>75 N/m</b>. T = 2π·√(m/k) = 2π·√(2/75) = <b>1,026 s</b>.",
          "<b>Paralelo:</b> k = 100 + 300 = <b>400 N/m</b>. T = 2π·√(2/400) = <b>0,444 s</b>.",
          "El periodo en serie es 2,3 veces mayor que en paralelo (√(400/75) = 2,31), como corresponde a un conjunto mucho más blando."
        ]) +
        ejemplo("Problema 5 · Un péndulo y la Luna", "Un péndulo simple de 1,5 m de longitud se suelta con una amplitud de 8° en la Tierra. Calcula: a) su periodo; b) la velocidad máxima de la masa; c) la longitud que debería tener en la Luna (g = 1,62 m/s²) para tener el mismo periodo.", [
          "<b>a)</b> T = 2π·√(l/g) = 2π·√(1,5/9,8) = 2π·0,3912 = <b>2,46 s</b> (la amplitud es pequeña: MAS).",
          "<b>b)</b> Conservación de la energía: v = √(2·g·l·(1 − cos 8°)) = √(2·9,8·1,5·0,009741) = √0,2864 = <b>0,535 m/s</b>.",
          "<b>c)</b> Mismo T con g′: l′/g′ = l/g → l′ = l·g′/g = 1,5·1,62/9,8 = <b>0,248 m</b> (un poco menos de la sexta parte)."
        ]) +
        ejemplo("Problema 6 · Energías en un oscilador", "Un oscilador con m = 0,2 kg y k = 80 N/m tiene una amplitud de 5 cm. Calcula: a) la energía mecánica y ω; b) la velocidad cuando x = 3 cm; c) la elongación para la que E<sub>c</sub> = 3·E<sub>p</sub>; d) el tiempo que tarda en ir desde el centro hasta el extremo.", [
          "<b>a)</b> E<sub>m</sub> = ½·80·0,05² = <b>0,1 J</b>; ω = √(80/0,2) = √400 = <b>20 rad/s</b>.",
          "<b>b)</b> v = ω·√(A² − x²) = 20·√(0,0025 − 0,0009) = 20·0,04 = <b>0,8 m/s</b>.",
          "<b>c)</b> E<sub>c</sub> = 3E<sub>p</sub> → E<sub>p</sub> = E<sub>m</sub>/4 → ½kx² = ¼·½kA² → x = A/2 = <b>2,5 cm</b>.",
          "<b>d)</b> De x = 0 a x = A hay un cuarto de periodo: T/4 = (2π/ω)/4 = π/(2·20) = <b>0,0785 s</b>."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Un poco de historia: del péndulo de Galileo al reloj atómico",
      html:
        "<p>La historia del MAS es la historia de la medida del tiempo. Se cuenta que hacia 1583 un joven <b>Galileo</b> observó en la catedral de Pisa cómo oscilaba una lámpara y midió, con su propio pulso, que el tiempo de cada oscilación parecía el mismo aunque la amplitud disminuyera: había descubierto el isocronismo. Años después estudió el péndulo con rigor y sugirió usarlo para medir el tiempo, por ejemplo en las exploraciones médicas (el «pulsilogium» servía para medir el pulso).</p>" +
        "<p>En 1656, <b>Christiaan Huygens</b> construyó el primer reloj de péndulo: los mejores relojes de la época se desviaban unos quince minutos al día; el suyo, menos de un minuto. En su <i>Horologium Oscillatorium</i> (1673) estudió matemáticamente el péndulo y propuso definir la unidad de longitud con el péndulo de segundos. Por su parte, <b>Robert Hooke</b> formuló en 1678 la ley de la elasticidad que lleva su nombre, y estudió los muelles para usarlos como reguladores de los relojes de bolsillo (el muelle espiral «del volante» sigue siendo el corazón de los relojes mecánicos).</p>" +
        "<p>En 1851, <b>Léon Foucault</b> colgó del domo del Panteón de París una esfera de 28 kg de un cable de 67 m, y demostró, con un péndulo, que la Tierra gira: el plano de oscilación giraba lentamente respecto al suelo. En 1822, <b>Joseph Fourier</b> mostró que cualquier movimiento periódico puede descomponerse como suma de movimientos armónicos simples, lo que explica el adjetivo «armónico» y por qué el MAS es la pieza básica de la teoría del sonido, de las ondas y de la señal eléctrica.</p>" +
        "<p>En el siglo XX, los cristales de cuarzo (1927) pasaron a regular los relojes con una frecuencia de 32 768 Hz, y en 1955 se construyó el primer reloj atómico de cesio. Desde 1967, el segundo se define como la duración de 9 192 631 770 periodos de una vibración concreta del átomo de cesio-133. Un oscilador armónico, perfeccionado durante cuatro siglos, está en la base de la unidad de tiempo que usa el mundo entero.</p>"
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y piensa por qué es un error.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, juegos de parejas, dos clasificaciones (dónde se alcanza cada máximo y qué sistemas son un MAS) y un ejercicio para ordenar los pasos de un problema clásico.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "emp1") + w("emparejar", "emp2") + w("clasificar", "cla1") + w("clasificar", "cla2") + w("orden", "orden1")
    }
  );

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  P.datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«Si duplico la amplitud de un muelle, el periodo también se duplica, porque tiene que recorrer el doble de distancia.» ¿Qué falla?",
          op: ["Nada", "El periodo de un MAS <b>no depende de la amplitud</b> (isocronismo): recorre más camino, pero también va más deprisa", "El periodo se hace cuatro veces mayor", "El periodo se reduce a la mitad"], ok: 1,
          porque: "T = 2π√(m/k) sólo depende de m y k. Con el doble de amplitud, la velocidad máxima A·ω también se duplica y el tiempo del recorrido no cambia." },
        { q: "«En los extremos de la oscilación la velocidad es cero, así que la aceleración también lo es.» ¿Qué falla?",
          op: ["Nada", "En los extremos la aceleración es <b>máxima</b> (a = −ω²·A): que v = 0 sólo significa que el cuerpo da la vuelta", "La aceleración es la de la gravedad", "La aceleración es mínima y positiva"], ok: 1,
          porque: "La fuerza recuperadora, F = −k·x, es máxima donde x es máxima. v = 0 un instante no implica a = 0 (como la piedra lanzada hacia arriba en su punto más alto)." },
        { q: "«Al pasar por la posición de equilibrio la fuerza que ejerce el muelle es máxima, porque es donde va más deprisa.» ¿Qué falla?",
          op: ["Nada", "En el equilibrio x = 0, luego F = −k·x = 0; es la <b>velocidad</b> (no la fuerza) la que es máxima", "La fuerza es mínima y negativa", "La fuerza vale m·g"], ok: 1,
          porque: "F es proporcional a x, no a v. Por eso, en el equilibrio, F = 0 y a = 0, pero el cuerpo sigue moviéndose por inercia a la máxima velocidad." },
        { q: "Un alumno escribe T = 2π·√(k/m) para un muelle. ¿Qué falla?",
          op: ["Nada", "Está invertido: T = 2π·√(<b>m/k</b>) (más masa ⇒ más lento; más rigidez ⇒ más rápido)", "Falta un factor ½", "Debería ser T = √(m/k)"], ok: 1,
          porque: "ω = √(k/m), y T = 2π/ω = 2π√(m/k). Comprobación por sentido común: un muelle más duro (k mayor) debe oscilar más deprisa (T menor)." },
        { q: "«La velocidad máxima de un MAS es A/ω.» ¿Qué falla?",
          op: ["Nada", "Es <b>v<sub>máx</sub> = A·ω</b> (se multiplica, no se divide)", "Es A·ω²", "Es ω/A"], ok: 1,
          porque: "v = −A·ω·sen(ωt + φ₀), cuyo valor máximo es A·ω. Con A = 0,1 m y ω = 10 rad/s, v<sub>máx</sub> = 1 m/s (dimensionalmente: m·s⁻¹)." },
        { q: "«Como el periodo de un péndulo no depende de la masa, en la Luna tarda lo mismo que en la Tierra.» ¿Qué falla?",
          op: ["Nada", "T = 2π√(l/g) <b>sí depende de g</b>: en la Luna (g menor) el péndulo oscila más despacio", "En la Luna no hay péndulos", "T depende de la masa en la Luna"], ok: 1,
          porque: "No depende de la masa, pero sí de g. Con l = 1 m, T = 2,0 s en la Tierra y 4,9 s en la Luna. (El periodo de una masa en un muelle, en cambio, sí es el mismo.)" },
        { q: "«En un muelle vertical, la fuerza recuperadora es k por el alargamiento respecto de la longitud natural, y por eso el periodo depende de g.» ¿Qué falla?",
          op: ["Nada", "La fuerza recuperadora neta es −k·x con x medida desde el <b>nuevo equilibrio</b> (donde k·Δℓ = m·g): el periodo no depende de g", "El peso no existe en la Luna", "La fuerza es siempre m·g"], ok: 1,
          porque: "El peso sólo desplaza el equilibrio en Δℓ = m·g/k. Respecto de ese punto, la fuerza neta es −k·x y ω = √(k/m) no cambia." },
        { q: "«Dos muelles de 30 N/m y 60 N/m en serie equivalen a uno de 90 N/m.» ¿Qué falla?",
          op: ["Nada", "En serie se suman las <b>inversas</b>: 1/k = 1/30 + 1/60 → k = 20 N/m; 90 N/m es la asociación en paralelo", "En serie k = 60 − 30 = 30 N/m", "En serie k = 30·60 = 1800 N/m"], ok: 1,
          porque: "En serie, los alargamientos se suman, por lo que el conjunto es más blando que el más blando de los dos. En paralelo, las fuerzas se suman: k = k₁ + k₂ = 90 N/m." },
        { q: "«En el centro de la oscilación la energía mecánica es cero porque x = 0.» ¿Qué falla?",
          op: ["Nada", "La energía <b>mecánica</b> es constante, ½kA²; en x = 0 la potencial es cero, pero la cinética es máxima y vale toda la mecánica", "La energía es mínima en el centro", "La energía cinética es cero en el centro"], ok: 1,
          porque: "E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = ½kA² siempre. En x = 0: E<sub>p</sub> = 0 y E<sub>c</sub> = ½kA²." },
        { q: "Un alumno escribe x = 0,1·sen(5t) y dice que la fase inicial de la ecuación en forma coseno es φ₀ = 0. ¿Qué falla?",
          op: ["Nada", "sen(5t) = cos(5t − π/2): la fase inicial en forma coseno es <b>φ₀ = −π/2</b>", "φ₀ = π", "φ₀ = π/2"], ok: 1,
          porque: "El seno es un coseno retrasado π/2. Con φ₀ = −π/2 se cumple x(0) = 0 y v(0) = +A·ω, como corresponde a empezar en el centro moviéndose hacia +." },
        { q: "Un alumno calcula cos(10·0,1) con la calculadora en grados y obtiene 0,99985. ¿Qué falla?",
          op: ["Nada", "El argumento de la fase está en <b>radianes</b>: cos(1 rad) = 0,5403", "Debe usar la tangente", "Debe multiplicar por 2π"], ok: 1,
          porque: "En las fórmulas del MAS, ω·t está en rad. Con la calculadora en grados se interpreta 1° (0,0175 rad) y el resultado es erróneo." },
        { q: "«La aceleración de un MAS es constante, así que puedo usar x = x₀ + v₀t + ½at².» ¿Qué falla?",
          op: ["Nada", "En un MAS la aceleración <b>cambia</b> (a = −ω²·x): las ecuaciones del MRUA no valen", "La aceleración es cero", "Sólo vale si x₀ = 0"], ok: 1,
          porque: "Las ecuaciones del movimiento uniformemente acelerado exigen a constante. En un MAS hay que usar x = A·cos(ωt + φ₀) y sus derivadas." }
      ]
    },
    quiz1: {
      titulo: "Test: movimiento armónico simple",
      preguntas: [
        { q: "Un MAS viene dado por x = 0,3·cos(2π·t) (SI). Su periodo es…", op: ["1 s", "2π s", "0,3 s", "2 s"], ok: 0, porque: "ω = 2π rad/s → T = 2π/ω = 1 s." },
        { q: "Un oscilador tiene f = 5 Hz. Su periodo es…", op: ["0,2 s", "5 s", "0,5 s", "31,4 s"], ok: 0, porque: "T = 1/f = 0,2 s." },
        { q: "Una masa de 1 kg en un muelle de k = 100 N/m oscila con ω igual a…", op: ["10 rad/s", "100 rad/s", "0,1 rad/s", "31,4 rad/s"], ok: 0, porque: "ω = √(k/m) = √100 = 10 rad/s." },
        { q: "Si se cuadruplica la masa que cuelga de un muelle, el periodo…", op: ["se duplica", "se cuadruplica", "se reduce a la mitad", "no cambia"], ok: 0, porque: "T ∝ √m: √4 = 2." },
        { q: "Un MAS tiene A = 0,2 m y ω = 5 rad/s. Su velocidad máxima es…", op: ["1 m/s", "0,04 m/s", "5 m/s", "0,2 m/s"], ok: 0, porque: "v<sub>máx</sub> = A·ω = 0,2·5 = 1 m/s." },
        { q: "La aceleración de un MAS es máxima…", op: ["en los extremos de la oscilación", "en el centro", "cuando la velocidad es máxima", "nunca: es constante"], ok: 0, porque: "a = −ω²x: máxima cuando |x| = A (extremos)." },
        { q: "Si se duplica la amplitud de un oscilador, su energía mecánica…", op: ["se multiplica por 4", "se duplica", "se divide entre 2", "no cambia"], ok: 0, porque: "E<sub>m</sub> = ½kA²." },
        { q: "Dos muelles iguales de 50 N/m se asocian en paralelo. La constante equivalente es…", op: ["100 N/m", "25 N/m", "50 N/m", "2500 N/m"], ok: 0, porque: "En paralelo k = k₁ + k₂ = 100 N/m." },
        { q: "Si la longitud de un péndulo simple se multiplica por 4, su periodo…", op: ["se duplica", "se cuadruplica", "se divide entre 2", "no cambia"], ok: 0, porque: "T ∝ √l." },
        { q: "En un MAS, las energías cinética y potencial son iguales cuando la elongación vale…", op: ["±A/√2", "±A/2", "0", "±A"], ok: 0, porque: "½kx² = ½·½kA² → x = A/√2." },
        { q: "La energía cinética de un MAS oscila con una frecuencia…", op: ["doble que la del movimiento", "igual que la del movimiento", "mitad de la del movimiento", "nula (es constante)"], ok: 0, porque: "E<sub>c</sub> = ½kA²·sen²(ωt + φ₀): dos máximos por periodo." },
        { q: "En la ley de Hooke F = −k·x, el signo menos indica que la fuerza…", op: ["se opone a la elongación (recuperadora)", "es siempre negativa", "es proporcional al cuadrado de x", "no depende de x"], ok: 0, porque: "Apunta siempre hacia el equilibrio, contra la elongación." }
      ]
    },
    tj1: {
      titulo: "Tarjetas: fórmulas y conceptos del MAS",
      cartas: [
        { a: "Ecuación del MAS", b: "x(t) = A·cos(ω·t + φ₀) · A amplitud · ω frecuencia angular · φ₀ fase inicial" },
        { a: "Relaciones entre T, f y ω", b: "f = 1/T · ω = 2π/T = 2π·f" },
        { a: "Velocidad en el MAS", b: "v = −A·ω·sen(ωt + φ₀) · v<sub>máx</sub> = A·ω (en x = 0)" },
        { a: "Aceleración en el MAS", b: "a = −A·ω²·cos(ωt + φ₀) = −ω²·x · a<sub>máx</sub> = A·ω² (en x = ±A)" },
        { a: "Velocidad en función de la posición", b: "v = ±ω·√(A² − x²)" },
        { a: "Fase inicial con condiciones iniciales", b: "x₀ = A·cos φ₀ · v₀ = −A·ω·sen φ₀ · A = √(x₀² + (v₀/ω)²)" },
        { a: "Ley de Hooke", b: "F = −k·x · fuerza recuperadora; k en N/m" },
        { a: "Frecuencia de un muelle", b: "ω = √(k/m) · T = 2π√(m/k) · no depende de A ni de g" },
        { a: "Muelle vertical", b: "equilibrio: k·Δℓ = m·g · T no cambia con g" },
        { a: "Muelles en serie y en paralelo", b: "serie: 1/k = 1/k₁ + 1/k₂ · paralelo: k = k₁ + k₂" },
        { a: "Energía potencial elástica", b: "E<sub>p</sub> = ½·k·x²" },
        { a: "Energía mecánica del MAS", b: "E<sub>m</sub> = ½·k·A² = ½·m·v<sub>máx</sub>² = constante · E<sub>c</sub> = ½k(A² − x²)" },
        { a: "Péndulo simple", b: "T = 2π√(l/g) · θ pequeño · no depende de m ni de A · depende de g" },
        { a: "E<sub>c</sub> = E<sub>p</sub>", b: "x = ±A/√2 ≈ ±0,707·A" },
        { a: "Amortiguamiento", b: "A(t) = A₀·e<sup>−γt</sup> · ω<sub>d</sub> = √(ω₀² − γ²) · crítico: γ = ω₀" },
        { a: "Resonancia", b: "ω ≈ ω₀ → amplitud máxima · Q = ω₀/(2γ)" }
      ]
    },
    emp1: {
      titulo: "Parejas: sistema y periodo",
      consigna: "Une cada sistema con su fórmula del periodo.",
      pares: [
        ["Masa m en un muelle k", "T = 2π√(m/k)"],
        ["Péndulo simple de longitud l", "T = 2π√(l/g)"],
        ["Muelle vertical (m, k)", "T = 2π√(m/k) = 2π√(Δℓ/g)"],
        ["Oscilador con ω conocida", "T = 2π/ω"],
        ["Oscilador con f conocida", "T = 1/f"],
        ["Dos muelles en paralelo", "T = 2π√(m/(k₁ + k₂))"],
        ["Dos muelles en serie", "T = 2π√(m(k₁ + k₂)/(k₁k₂))"]
      ]
    },
    emp2: {
      titulo: "Parejas: magnitud y unidad",
      consigna: "Une cada magnitud con su unidad en el SI.",
      pares: [
        ["Amplitud A", "metro (m)"],
        ["Periodo T", "segundo (s)"],
        ["Frecuencia f", "hercio (Hz = s⁻¹)"],
        ["Frecuencia angular ω", "radián por segundo (rad/s)"],
        ["Constante elástica k", "newton por metro (N/m)"],
        ["Energía mecánica E<sub>m</sub>", "julio (J)"],
        ["Fase inicial φ₀", "radián (rad)"]
      ]
    },
    cla1: {
      titulo: "¿Dónde se alcanza cada valor?",
      consigna: "Clasifica cada afirmación según la posición en que se cumple.",
      categorias: ["En x = 0 (equilibrio)", "En x = ±A (extremos)", "En cualquier posición"],
      items: [
        { t: "La velocidad es máxima", c: 0 }, { t: "La aceleración es nula", c: 0 }, { t: "La energía cinética es máxima", c: 0 }, { t: "La fuerza recuperadora es nula", c: 0 },
        { t: "La energía potencial es máxima", c: 1 }, { t: "La aceleración es máxima", c: 1 }, { t: "La velocidad es nula", c: 1 },
        { t: "La energía mecánica vale ½kA²", c: 2 }, { t: "Se cumple a = −ω²·x", c: 2 }, { t: "La fuerza es F = −k·x", c: 2 }
      ]
    },
    cla2: {
      titulo: "¿Es un MAS?",
      consigna: "Decide si cada sistema describe (de forma aproximada) un movimiento armónico simple.",
      categorias: ["Sí (aproximadamente)", "No"],
      items: [
        { t: "Masa en un muelle ideal", c: 0 }, { t: "Péndulo con amplitud de 5°", c: 0 }, { t: "Diapasón que suena", c: 0 }, { t: "Sombra de un punto que da vueltas con velocidad constante", c: 0 },
        { t: "Piedra lanzada hacia arriba", c: 1 }, { t: "Péndulo con amplitud de 80°", c: 1 }, { t: "Pelota que rebota en el suelo", c: 1 }, { t: "La Tierra girando alrededor del Sol", c: 1 }
      ]
    },
    orden1: {
      titulo: "Ordena los pasos: masa y muelle que se suelta desde un extremo",
      consigna: "Ordena los pasos para estudiar el movimiento de una masa unida a un muelle que se estira y se suelta.",
      items: [
        { t: "Pasar los datos al SI (m en kg, A en m, k en N/m)", nota: "5 cm = 0,05 m" },
        { t: "Amplitud A: la elongación inicial (se suelta en reposo desde el extremo)", nota: "φ₀ = 0" },
        { t: "Frecuencia angular ω = √(k/m) y periodo T = 2π/ω", nota: "f = 1/T" },
        { t: "Escribir x(t) = A·cos(ωt), v(t) = −Aω·sen(ωt), a(t) = −Aω²·cos(ωt)", nota: "con φ₀ = 0" },
        { t: "Valores máximos: v<sub>máx</sub> = A·ω, a<sub>máx</sub> = A·ω² y E<sub>m</sub> = ½kA²", nota: "" },
        { t: "Valores en un instante o una posición dada (calculadora en radianes)", nota: "v = ±ω√(A² − x²)" },
        { t: "Comprobar: |x| ≤ A, a = −ω²x, E<sub>c</sub> + E<sub>p</sub> = E<sub>m</sub>", nota: "unidades" }
      ]
    }
  };
})(window);
