/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 13: Movimiento armónico simple
   Parte C: secciones nuevas 7–10 (método, péndulo simple, amortiguamiento y resonancia, MAS en la vida real)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t13/" + ref); }
  var P = B._fq13;

  P.nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Método para resolver problemas de MAS",
      html:
        "<p>Casi todos los problemas de MAS se reducen a obtener tres cosas —la amplitud A, la frecuencia angular ω y la fase inicial φ₀— y a partir de ellas calcular lo que pidan. Con este esquema no se pierde nadie:</p>" +
        "<ol>" +
        "<li><b>Datos en el SI</b> (m, kg, s, N/m): 5 cm = 0,05 m; 300 g = 0,3 kg; 120 oscilaciones por minuto = 2 Hz.</li>" +
        "<li><b>Amplitud A</b>: es la elongación máxima. Si el cuerpo «se separa 10 cm del equilibrio y se suelta», A = 0,10 m. Si dan la energía, A = √(2E<sub>m</sub>/k); si dan la velocidad máxima, A = v<sub>máx</sub>/ω; si dan la velocidad al pasar por el centro, es la misma v<sub>máx</sub>.</li>" +
        "<li><b>Frecuencia angular ω</b>: de la masa y el muelle, ω = √(k/m); del periodo o de la frecuencia, ω = 2π/T = 2πf; de la ecuación, el número que multiplica a t.</li>" +
        "<li><b>Fase inicial φ₀</b>: con x₀ y v₀ (cos φ₀ = x₀/A; sen φ₀ = −v₀/(Aω)). Si el cuerpo se suelta desde reposo en un extremo, φ₀ = 0 (extremo positivo) o φ₀ = π (extremo negativo).</li>" +
        "<li><b>Escribir x(t), v(t), a(t)</b> con los tres parámetros.</li>" +
        "<li><b>Calcular lo pedido</b>: valores en un instante (se sustituye t con la calculadora en <b>radianes</b>); instantes en que se alcanza una posición (se despeja el ángulo y se tiene en cuenta que hay dos soluciones por periodo); velocidad en una posición (v = ±ω√(A² − x²)); energías (E<sub>m</sub> = ½kA²).</li>" +
        "<li><b>Comprobar</b>: unidades, que |x| ≤ A, que |v| ≤ Aω, que a = −ω²x y que E<sub>c</sub> + E<sub>p</sub> = E<sub>m</sub>.</li>" +
        "</ol>" +
        ejemplo("El método completo", "Un cuerpo de 0,25 kg está unido a un muelle de k = 25 N/m sobre una mesa sin rozamiento. Se estira 8 cm y se suelta. Calcula ω, T, la ecuación del movimiento, la velocidad y la aceleración máximas, la energía mecánica, y la posición, velocidad, aceleración y fuerza del muelle en t = 0,1 s.", [
          "<b>A</b> = 0,08 m (se suelta desde el extremo, en reposo) y φ₀ = 0.",
          "<b>ω</b> = √(k/m) = √(25/0,25) = <b>10 rad/s</b>; T = 2π/10 = <b>0,628 s</b>.",
          "Ecuación: <b>x(t) = 0,08·cos(10·t)</b> m; v(t) = −0,8·sen(10t) m/s; a(t) = −8·cos(10t) m/s².",
          "Máximos: v<sub>máx</sub> = A·ω = <b>0,8 m/s</b>; a<sub>máx</sub> = A·ω² = <b>8 m/s²</b> (comprobación: F<sub>máx</sub> = k·A = 2 N = m·a<sub>máx</sub> = 0,25·8 ✓). E<sub>m</sub> = ½·25·0,08² = <b>0,08 J</b>.",
          "En t = 0,1 s (el ángulo es 10·0,1 = 1 rad, calculadora en radianes): x = 0,08·cos 1 = <b>0,0432 m</b>; v = −0,8·sen 1 = <b>−0,673 m/s</b>; a = −8·cos 1 = <b>−4,32 m/s²</b>; F = −k·x = −25·0,0432 = <b>−1,08 N</b> (= m·a = 0,25·(−4,32) ✓)."
        ])
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. El péndulo simple",
      html:
        "<p>Un <b>péndulo simple</b> es una masa puntual colgada de un hilo ligero e inextensible de longitud l. Si se separa un ángulo θ de la vertical y se suelta, oscila. No parece un movimiento rectilíneo como el de un muelle, pero para pequeñas oscilaciones se comporta como un MAS. Veámoslo.</p>" +
        "<p>Sobre la masa actúan el peso m·g (vertical) y la tensión del hilo T (hacia el punto de suspensión). Descomponemos el peso en la dirección del hilo y en la dirección tangente a la trayectoria. La componente <b>tangencial</b> del peso, m·g·sen θ, es la que tira de la masa hacia la vertical (siempre contra el desplazamiento: es la fuerza recuperadora). La componente en la dirección del hilo se compensa (en parte) con la tensión y se encarga de curvar la trayectoria. Aplicando la segunda ley en la dirección tangente:</p>" +
        formula("m·a<sub>t</sub> = −m·g·sen θ") +
        "<p>Para ángulos pequeños (θ medido en radianes), sen θ ≈ θ, y el arco recorrido s = l·θ es casi la elongación x en línea recta. Entonces a<sub>t</sub> ≈ −g·θ = −(g/l)·s: la aceleración es proporcional al desplazamiento y de signo contrario, la relación de un MAS con ω² = g/l. Por tanto:</p>" +
        formula("ω = √(" + fr("g", "l") + ") &nbsp;&nbsp;&nbsp;&nbsp; T = 2π·√(" + fr("l", "g") + ")") +
        "<ul>" +
        "<li>El periodo <b>no depende de la masa</b> (la masa se cancela, como en la caída libre: el peso y la inercia son proporcionales a m).</li>" +
        "<li>No depende de la amplitud, <b>siempre que ésta sea pequeña</b> (isocronismo). Con amplitudes grandes el periodo real es mayor: a 30° la diferencia respecto de la fórmula es 1,7 %; a 60°, 7,3 %.</li>" +
        "<li>Aumenta con la longitud (T ∝ √l: para duplicar el periodo hay que cuadruplicar l) y <b>disminuye con g</b> (el mismo péndulo oscila más despacio en la Luna).</li>" +
        "<li>Se usa para <b>medir g</b> con un cronómetro y una cuerda: g = 4π²·l/T².</li>" +
        "</ul>" +
        w("f13_pendulo") +
        ejemplo("Un péndulo de «segundos»", "¿Qué longitud debe tener un péndulo que tarde exactamente 2 s en una oscilación completa (un «péndulo de segundos»), en la Tierra (g = 9,8 m/s²)? ¿Cuánto vale T con l = 1 m?", [
          "T = 2π√(l/g) → l = g·T²/(4π²) = 9,8·4/39,48 = <b>0,993 m</b> (casi exactamente 1 m: esa fue una de las primeras propuestas de definición del metro).",
          "Con l = 1 m: T = 2π·√(1/9,8) = <b>2,007 s</b>."
        ]) +
        ejemplo("El mismo péndulo en la Luna", "Calcula el periodo de un péndulo de 1 m en la Luna (g = 1,62 m/s²) y la longitud que habría que darle para que tardara 2 s.", [
          "T = 2π·√(1/1,62) = 2π·0,7857 = <b>4,94 s</b> (2,46 veces el de la Tierra: √(9,8/1,62) = 2,46).",
          "Para T = 2 s: l = 1,62·4/(4π²) = <b>0,164 m</b>."
        ]) +
        ejemplo("Medir g con un péndulo", "Un alumno mide 20 oscilaciones completas de un péndulo de 0,75 m y obtiene 34,8 s. ¿Qué valor de g obtiene?", [
          "T = 34,8/20 = 1,74 s (se miden varias oscilaciones para reducir el error del cronómetro).",
          "g = 4π²·l/T² = 39,478·0,75/1,74² = 29,61/3,028 = <b>9,78 m/s²</b>."
        ]) +
        ejemplo("Velocidad máxima", "Un péndulo de 1 m se suelta con una amplitud de 10° (g = 9,8 m/s²). ¿Qué velocidad alcanza al pasar por el punto más bajo?", [
          "Por conservación de la energía, m·g·h = ½mv², con h = l·(1 − cos θ₀) = 1·(1 − cos 10°) = 0,01519 m.",
          "v = √(2·g·h) = √(2·9,8·0,01519) = <b>0,546 m/s</b>. (Con el modelo de MAS: ω·l·θ₀ = 3,13·1·0,1745 = 0,546 m/s, casi lo mismo.)"
        ]) +
        ojo("el periodo del péndulo <b>sí</b> depende de g (y por tanto del lugar), mientras que el de la masa en un muelle <b>no</b>. Y recuerda que la fórmula T = 2π√(l/g) sólo vale para <b>oscilaciones pequeñas</b> (θ ≲ 15°).")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Oscilaciones amortiguadas y resonancia",
      html:
        "<h5>Cuando hay rozamiento: el movimiento amortiguado</h5>" +
        "<p>En la vida real, las oscilaciones no duran para siempre: un columpio al que nadie empuja se va parando, y una cuerda de guitarra se calla. El rozamiento (con el aire, con la superficie, interno del muelle) va quitando energía mecánica y convirtiéndola en calor. En muchos casos la fuerza de rozamiento es proporcional a la velocidad, −b·v, y la ecuación del movimiento deja de ser la de un MAS. La solución, si el rozamiento es débil, es una oscilación cuya amplitud disminuye exponencialmente con el tiempo:</p>" +
        formula("x(t) = A₀·e<sup>−γ·t</sup>·cos(ω<sub>d</sub>·t + φ₀) &nbsp;&nbsp;&nbsp; con &nbsp; γ = " + fr("b", "2m") + " &nbsp; y &nbsp; ω<sub>d</sub> = √(ω₀² − γ²)") +
        "<p>donde ω₀ = √(k/m) es la frecuencia propia del sistema sin rozamiento. Según la intensidad del rozamiento hay tres regímenes: <b>subamortiguado</b> (γ &lt; ω₀: el cuerpo oscila con amplitud decreciente), <b>críticamente amortiguado</b> (γ = ω₀: vuelve al equilibrio lo más deprisa posible sin oscilar) y <b>sobreamortiguado</b> (γ &gt; ω₀: vuelve muy despacio, sin oscilar). Los <b>amortiguadores</b> de un coche o la puerta de un frigorífico (con un cierre amortiguado) están diseñados cerca del régimen crítico. El tiempo para que la amplitud caiga a 1/e (37 %) es 1/γ.</p>" +
        w("f13_amortiguado") +
        "<h5>Cuando alguien empuja al sistema: oscilaciones forzadas y resonancia</h5>" +
        "<p>Si se aplica al oscilador una fuerza periódica externa de frecuencia angular ω, el sistema acaba oscilando <b>con la frecuencia de la fuerza</b> (no con la suya propia), y con una amplitud que depende mucho de lo cerca que esté ω de ω₀. Cuando ω ≈ ω₀ se produce la <b>resonancia</b>: la fuerza «empuja a tiempo» y la amplitud aumenta enormemente; lo máximo que puede llegar a ser depende de cuánta energía se disipe: con poco amortiguamiento (Q = ω₀/2γ grande) el pico es altísimo. Empujar un columpio al ritmo adecuado, sintonizar una emisora (el circuito de la radio se hace resonar con la frecuencia de esa emisora), la resonancia magnética de los hospitales, o la copa que se rompe con un sonido muy agudo son aplicaciones y ejemplos de resonancia. Pero también puede ser peligrosa: en 1940 el puente de Tacoma Narrows (EE. UU.) acabó destruido por oscilaciones inducidas por el viento (un fenómeno aeroelástico parecido a la resonancia), y los soldados rompen el paso al cruzar un puente para no entrar en resonancia con él.</p>" +
        w("f13_resonancia") +
        ejemplo("Un oscilador amortiguado", "Un oscilador tiene una frecuencia propia ω₀ = 10 rad/s y un coeficiente de amortiguamiento γ = 0,5 s⁻¹. Calcula la frecuencia angular amortiguada, el tiempo en que la amplitud cae a 1/e y la fracción de amplitud que queda tras 5 s. Si se fuerza en resonancia, ¿cuántas veces es mayor la amplitud que la estática?", [
          "ω<sub>d</sub> = √(ω₀² − γ²) = √(100 − 0,25) = <b>9,987 rad/s</b> (casi igual a ω₀: amortiguamiento débil).",
          "La amplitud cae a 1/e en t = 1/γ = <b>2 s</b>. Tras 5 s: e<sup>−γt</sup> = e<sup>−2,5</sup> = <b>0,082</b> → queda un 8,2 % de la amplitud inicial.",
          "Factor de calidad: Q = ω₀/(2γ) = 10/(2·0,5) = <b>10</b>: en resonancia, la amplitud es unas 10 veces la que produciría la misma fuerza aplicada muy despacio."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. El MAS en la vida real y en la naturaleza",
      html:
        "<p>El modelo del MAS es tan útil porque casi cualquier sistema estable, cuando se le separa poco de su equilibrio, se comporta como un oscilador armónico: cerca de un mínimo de energía potencial, la fuerza recuperadora es aproximadamente proporcional al desplazamiento (el mismo motivo por el que sen θ ≈ θ). Algunos casos:</p>" +
        "<ul>" +
        "<li><b>Suspensión de un vehículo</b>: cada rueda soporta una parte de la masa, unida a la carrocería por un muelle y un amortiguador. Es un oscilador amortiguado cuyo diseño busca una frecuencia de unos 1–1,5 Hz (cómoda para los pasajeros).</li>" +
        "<li><b>Instrumentos musicales y sonido</b>: una cuerda, una lengüeta o un diapasón vibran con MAS (o superposición de varios); la frecuencia es el tono (440 Hz = nota LA) y la amplitud es el volumen.</li>" +
        "<li><b>Relojes</b>: de péndulo (periodo constante por isocronismo), de cuarzo (un cristal que vibra 32 768 veces por segundo) y atómicos (átomos de cesio con una frecuencia de 9 192 631 770 Hz definen el segundo).</li>" +
        "<li><b>Moléculas y sólidos</b>: los átomos de una molécula o de un cristal vibran alrededor de su posición con frecuencias del orden de 10¹² a 10¹⁴ Hz; la espectroscopía infrarroja identifica sustancias por esas vibraciones.</li>" +
        "<li><b>Terremotos y edificios</b>: cada edificio tiene una frecuencia propia (los altos, más baja, del orden de 0,1–1 Hz); si coincide con la dominante de las ondas sísmicas, puede entrar en resonancia, y por eso se diseñan con amortiguadores.</li>" +
        "</ul>" +
        ejemplo("La suspensión de un coche", "La masa que soporta cada rueda de un coche es de unos 250 kg y el muelle tiene una constante de 20 000 N/m. Calcula la frecuencia propia, el periodo y cuánto se comprime el muelle bajo el peso de esa masa (g = 9,8 m/s²).", [
          "ω = √(k/m) = √(20 000/250) = √80 = <b>8,94 rad/s</b>.",
          "f = ω/2π = <b>1,42 Hz</b> y T = 1/f = <b>0,70 s</b>.",
          "Compresión estática: x = m·g/k = 250·9,8/20 000 = <b>0,1225 m = 12,3 cm</b>."
        ]) +
        ejemplo("Las aceleraciones de un diapasón", "Un diapasón vibra a 440 Hz con una amplitud de 1 mm en los extremos de sus púas. Calcula el periodo, la velocidad máxima y la aceleración máxima de los extremos.", [
          "T = 1/440 = <b>2,27 ms</b> y ω = 2π·440 = <b>2765 rad/s</b>.",
          "v<sub>máx</sub> = A·ω = 0,001·2765 = <b>2,76 m/s</b>.",
          "a<sub>máx</sub> = A·ω² = 0,001·2765² = <b>7640 m/s²</b>, ¡unas 780 veces g! Un movimiento minúsculo, pero muy vivo."
        ])
    }
  ];
})(window);
