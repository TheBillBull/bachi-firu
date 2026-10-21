/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 9: Movimiento circular
   Parte D: problemas tipo EvAU, errores, autocomprobación y actividades de datos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t9/" + ref); }
  var P = B._fq9;

  P.nuevas.push(
    // -------------------------------------------------------------- 12
    {
      h: "12. Problemas resueltos al estilo EvAU",
      html:
        "<p>Seis problemas completos, con el planteamiento que se espera en un examen: datos en el SI, ecuaciones en letras, sustitución y comprobación. Intenta resolverlos tú antes de mirar la solución.</p>" +
        ejemplo("1. Una rueda de 40 cm de diámetro", "Una rueda de 40 cm de diámetro gira a 1 500 rpm. Calcula: (a) su velocidad angular en rad/s; (b) la frecuencia y el periodo; (c) la velocidad lineal y la aceleración centrípeta de un punto del borde; (d) el ángulo girado y el número de vueltas en 2,5 s.", [
          "<b>Datos:</b> r = 0,20 m; ω = 1 500 rpm.",
          "(a) ω = 1 500 · 2π/60 = <b>157,1 rad/s</b> (= 50π).",
          "(b) f = 1 500/60 = <b>25 Hz</b>; T = 1/f = <b>0,040 s</b>.",
          "(c) v = ω·r = 157,1 · 0,20 = <b>31,4 m/s</b> (113 km/h); a<sub>c</sub> = ω²·r = 157,1² · 0,20 = <b>4 935 m/s²</b> (≈ 504 g).",
          "(d) Δθ = ω·t = 157,1 · 2,5 = <b>392,7 rad</b>; n = 392,7/2π = <b>62,5 vueltas</b> (acaba en el punto opuesto al de partida)."
        ]) +
        ejemplo("2. Un satélite de órbita baja", "Un satélite artificial describe una órbita circular de 6 800 km de radio (medido desde el centro de la Tierra) con un periodo de 90 min. Calcula su velocidad angular, su velocidad lineal y su aceleración centrípeta, y compárala con g = 9,8 m/s².", [
          "<b>Datos:</b> r = 6,8·10⁶ m; T = 90 min = 5 400 s.",
          "ω = 2π/T = 2π/5 400 = <b>1,164·10⁻³ rad/s</b>.",
          "v = ω·r = 1,164·10⁻³ · 6,8·10⁶ = <b>7 912 m/s</b> (≈ 28 500 km/h).",
          "a<sub>c</sub> = v²/r = 7 912²/6,8·10⁶ = <b>9,21 m/s²</b> = 0,94 g.",
          "Es casi g: a esa altura la gravedad terrestre es apenas un 6 % menor que en la superficie, y es la que da la aceleración centrípeta (Tema 11)."
        ]) +
        ejemplo("3. Un volante que frena", "Un volante de 0,50 m de radio gira a 300 rpm. Se le aplica un freno que lo detiene en 12 s con aceleración angular constante. Calcula: (a) α; (b) el número de vueltas hasta que se para; (c) a los 4,0 s, las aceleraciones tangencial y normal de un punto del borde y el módulo de la aceleración total.", [
          "<b>Datos:</b> ω₀ = 300 rpm = 10π = 31,42 rad/s; ω = 0; t = 12 s; r = 0,50 m.",
          "(a) α = (0 − 31,42)/12 = <b>−2,62 rad/s²</b> (frena: signo contrario a ω).",
          "(b) Δθ = ½(ω₀ + ω)·t = ½ · 31,42 · 12 = 188,5 rad → <b>30 vueltas</b>.",
          "(c) A los 4,0 s: ω = ω₀ + αt = 31,42 − 2,618·4,0 = 20,94 rad/s. a<sub>t</sub> = α·r = −2,618 · 0,50 = <b>−1,31 m/s²</b> (módulo 1,31, opuesta a v). a<sub>n</sub> = ω²·r = 20,94² · 0,50 = <b>219,3 m/s²</b>.",
          "|a⃗| = √(1,31² + 219,3²) = <b>219,3 m/s²</b>: casi toda la aceleración es normal (ω es grande), aunque el volante esté frenando."
        ]) +
        ejemplo("4. Dos puntos de un mismo disco", "Un disco gira con velocidad angular constante de 20 rad/s. El punto A está a 10 cm del eje y el B a 25 cm. Compara su periodo, su velocidad lineal y su aceleración centrípeta, y calcula cuánto tarda B en recorrer 10 m.", [
          "El periodo es el mismo (comparten ω): T = 2π/20 = <b>0,314 s</b> para ambos.",
          "v<sub>A</sub> = 20 · 0,10 = <b>2,0 m/s</b>; v<sub>B</sub> = 20 · 0,25 = <b>5,0 m/s</b> (razón 2,5, igual que la de radios).",
          "a<sub>A</sub> = ω²·r = 400 · 0,10 = <b>40 m/s²</b>; a<sub>B</sub> = 400 · 0,25 = <b>100 m/s²</b> (razón 2,5).",
          "Tiempo de B para recorrer 10 m: t = s/v = 10/5,0 = <b>2,0 s</b> (6,4 vueltas)."
        ]) +
        ejemplo("5. Ciclistas en un velódromo", "Dos ciclistas recorren una pista circular de 400 m de longitud con velocidades constantes de 8,0 m/s y 6,0 m/s. Parten a la vez del mismo punto. ¿Cuándo vuelven a encontrarse si van en el mismo sentido? ¿Y en sentidos contrarios? Calcula también la aceleración centrípeta de cada uno.", [
          "<b>Radio:</b> 2π·r = 400 → r = 63,66 m. Velocidades angulares: ω<sub>A</sub> = 8/63,66 = 0,1257 rad/s; ω<sub>B</sub> = 6/63,66 = 0,0942 rad/s.",
          "<b>Mismo sentido:</b> (ω<sub>A</sub> − ω<sub>B</sub>)·t = 2π → t = 2π/0,0314 = <b>200 s</b> (= 400/(8 − 6); A ha dado 4 vueltas y B, 3).",
          "<b>Sentidos contrarios:</b> (ω<sub>A</sub> + ω<sub>B</sub>)·t = 2π → t = 400/(8 + 6) = <b>28,6 s</b>.",
          "<b>Aceleración centrípeta:</b> a<sub>A</sub> = v²/r = 64/63,66 = <b>1,01 m/s²</b>; a<sub>B</sub> = 36/63,66 = <b>0,566 m/s²</b>."
        ]) +
        ejemplo("6. Cambio de marchas", "Una bicicleta tiene un plato de 48 dientes, un piñón de 18 y ruedas de 0,33 m de radio. El ciclista pedalea a 80 rpm. Calcula la velocidad de la bicicleta en km/h y la distancia recorrida en 5 minutos.", [
          "ω<sub>plato</sub> = 80 rpm. ω<sub>rueda</sub> = ω<sub>piñón</sub> = 80 · 48/18 = <b>213,3 rpm</b> = 22,34 rad/s.",
          "v = ω·R = 22,34 · 0,33 = <b>7,37 m/s = 26,5 km/h</b>.",
          "Distancia en 5 min = 300 s: s = 7,37 · 300 = <b>2 211 m ≈ 2,21 km</b>."
        ]),
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
  );

  P.datos = {
    emp1: {
      titulo: "Magnitud circular ↔ fórmula o unidad",
      consigna: "Une cada concepto con su expresión o su unidad.",
      pares: [
        ["Velocidad angular de un MCU", "ω = 2π/T = 2π·f, en rad/s"],
        ["Velocidad lineal de un punto", "v = ω·r, tangente a la circunferencia"],
        ["Aceleración centrípeta", "a<sub>c</sub> = v²/r = ω²·r, hacia el centro"],
        ["Longitud de arco", "s = θ·r (θ en radianes)"],
        ["Ecuación del MCU", "θ = θ₀ + ω·t"],
        ["Aceleración tangencial", "a<sub>t</sub> = α·r"],
        ["Dos engranajes en contacto", "ω₁·N₁ = ω₂·N₂ (sentidos contrarios)"],
        ["1 rpm equivale a…", "2π/60 ≈ 0,1047 rad/s"]
      ]
    },
    clas1: {
      titulo: "¿Qué tipo de movimiento circular es?",
      consigna: "Toca una situación y después la categoría que mejor la describe.",
      categorias: ["MCU", "MCUA (con α ≠ 0)", "No es circular"],
      items: [
        { t: "Las agujas de un reloj", c: 0 }, { t: "Una noria que gira siempre a la misma velocidad", c: 0 },
        { t: "La Tierra alrededor del Sol (aproximación)", c: 0 }, { t: "Un ventilador desde que se conecta hasta alcanzar su régimen", c: 1 },
        { t: "El tambor de una lavadora frenando hasta pararse", c: 1 }, { t: "Una rueda de bicicleta cuando el ciclista arranca", c: 1 },
        { t: "Un coche en una autopista recta a 120 km/h", c: 2 }, { t: "Una piedra que se deja caer", c: 2 },
        { t: "Un balón que sale lanzado con 40°", c: 2 }
      ]
    },
    orden1: {
      titulo: "Aceleración centrípeta en una curva",
      consigna: "Ordena los pasos para calcular la aceleración centrípeta de un coche que toma una curva de 150 m de radio a 108 km/h y compararla con g.",
      items: [
        { t: "Dibujar la curva, el centro y el vector velocidad tangente", nota: "La aceleración centrípeta apunta al centro." },
        { t: "Pasar los datos al SI: v = 108 km/h = 30 m/s; r = 150 m", nota: "Dividir entre 3,6 para pasar de km/h a m/s." },
        { t: "Elegir la fórmula con los datos disponibles: a<sub>c</sub> = v²/r", nota: "Como se conocen v y r, no hace falta calcular ω." },
        { t: "Sustituir: a<sub>c</sub> = 30²/150 = 6,0 m/s²", nota: "Unidades: (m/s)²/m = m/s²." },
        { t: "Compararla con g: 6,0/9,8 = 0,61 g", nota: "Es un buen control de orden de magnitud." },
        { t: "Responder con la dirección: 6,0 m/s² hacia el centro de la curva", nota: "No olvides la dirección y el sentido." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula la velocidad lineal de un punto del borde de un disco de 0,20 m de radio que gira a 300 rpm con v = ω·r = 300 · 0,20 = 60 m/s. ¿Qué falla?",
          op: ["Nada", "Las rpm no son rad/s: ω = 300 · 2π/60 = 31,4 rad/s y v = 6,28 m/s", "Debía usar el diámetro", "Debía dividir entre 2π"], ok: 1,
          porque: "Las fórmulas del movimiento circular necesitan rad/s. 300 rpm = 31,4 rad/s, y v = 31,4 · 0,20 = 6,28 m/s (22,6 km/h), no 216 km/h." },
        { q: "«En un MCU la rapidez es constante, luego la aceleración es cero.» ¿Qué falla?",
          op: ["Nada", "La velocidad es un vector: su dirección cambia, así que hay aceleración centrípeta a<sub>c</sub> = v²/r", "La aceleración es g", "La aceleración es tangencial"], ok: 1,
          porque: "Un cambio de dirección también es una aceleración. En el MCU toda la aceleración es centrípeta, perpendicular a v." },
        { q: "Un alumno calcula la aceleración centrípeta de un coche (v = 20 m/s, r = 100 m) como a = v/r = 0,2 m/s². ¿Qué falla?",
          op: ["Nada", "La fórmula es v²/r: a<sub>c</sub> = 400/100 = 4,0 m/s²", "Debía multiplicar v por r", "Debía usar 2π"], ok: 1,
          porque: "(m/s)/m da 1/s, no m/s². La aceleración centrípeta es v²/r (o ω²r)." },
        { q: "«En una curva, la fuerza centrífuga empuja el coche hacia fuera y por eso derrapa.» ¿Qué falla?",
          op: ["Nada", "No hay una fuerza real hacia fuera: el coche tiende a seguir recto (inercia) y falta fuerza centrípeta (rozamiento) hacia dentro", "Falta la fuerza de Coriolis", "El coche pesa menos"], ok: 1,
          porque: "En un sistema de referencia inercial sólo hay fuerzas hacia el centro (rozamiento). Si no bastan para m·v²/r, el coche sale por la tangente." },
        { q: "Dos puntos de un disco que gira: uno en el borde y otro cerca del centro. Un alumno dice que el del borde tiene mayor velocidad angular. ¿Qué falla?",
          op: ["Nada", "Todos los puntos del sólido tienen la misma ω; lo que es mayor en el borde es la velocidad lineal v = ω·r", "El del centro tiene mayor ω", "La ω depende de la masa"], ok: 1,
          porque: "Comparten ω (dan la vuelta en el mismo tiempo). Sólo v y a<sub>c</sub> (∝ r) crecen hacia el borde." },
        { q: "Un engranaje de 20 dientes engrana con otro de 40 dientes. «Los dos giran con la misma velocidad angular y en el mismo sentido.» ¿Qué falla?",
          op: ["Nada", "En contacto la velocidad lineal es igual, no la angular: ω₂ = ω₁/2 y giran en sentido contrario", "Giran al doble", "Giran igual pero en sentido contrario"], ok: 1,
          porque: "ω₁N₁ = ω₂N₂: la rueda con más dientes gira más despacio. Y los dientes empujan en sentidos contrarios." },
        { q: "Un alumno calcula el arco recorrido por un punto de una rueda de 0,5 m de radio que gira 90° con s = θ·r = 90 · 0,5 = 45 m. ¿Qué falla?",
          op: ["Nada", "θ debe estar en radianes: 90° = π/2 rad y s = 0,785 m", "Debía multiplicar por 2π", "Debía dividir entre 360"], ok: 1,
          porque: "s = θ·r sólo funciona con θ en radianes. Un cuarto de circunferencia de radio 0,5 m mide 0,785 m, no 45 m." },
        { q: "«Las dos agujas de un reloj coinciden cada hora, es decir, 12 veces en 12 horas.» ¿Qué falla?",
          op: ["Nada", "El minutero alcanza a la horaria cada 12/11 h (65,45 min): son 11 veces en 12 horas", "Coinciden cada 30 min", "Coinciden cada 2 h"], ok: 1,
          porque: "La horaria también avanza: T<sub>enc</sub> = 60·720/(720 − 60) = 65,45 min. En 12 h hay 11 coincidencias." },
        { q: "Un alumno dice «si doblo la velocidad al tomar una curva, la aceleración centrípeta se duplica». ¿Qué falla?",
          op: ["Nada", "a<sub>c</sub> = v²/r crece con el cuadrado de v: se multiplica por 4", "Se reduce a la mitad", "No cambia"], ok: 1,
          porque: "Por eso doblar la velocidad en una curva exige cuatro veces más rozamiento: es mucho más peligroso de lo que parece." },
        { q: "Un alumno resuelve un MCUA con α = 2 rad/s², ω₀ = 0, t = 3 s y escribe θ = ω₀·t + α·t² = 18 rad. ¿Qué falla?",
          op: ["Nada", "Falta el factor ½: θ = ½·α·t² = 9 rad", "Debía usar α·t = 6 rad", "Debía multiplicar por 2π"], ok: 1,
          porque: "θ = θ₀ + ω₀t + ½αt². Si se olvida el ½ el resultado sale el doble de grande (18 rad en vez de 9 rad)." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "180° equivalen a…",
          op: ["π rad", "2π rad", "π/2 rad", "180 rad"], ok: 0, porque: "Media vuelta son π radianes." },
        { q: "Un disco gira a 60 rpm. Su velocidad angular es…",
          op: ["2π rad/s ≈ 6,28 rad/s", "60 rad/s", "π rad/s", "120π rad/s"], ok: 0, porque: "60 rpm = 1 Hz = 2π rad/s." },
        { q: "Si el periodo de un movimiento circular es 0,5 s, su frecuencia es…",
          op: ["2 Hz", "0,5 Hz", "π Hz", "4π Hz"], ok: 0, porque: "f = 1/T = 2 Hz." },
        { q: "Un punto a 0,20 m del eje de un disco que gira con ω = 10 rad/s tiene una velocidad lineal de…",
          op: ["2 m/s", "50 m/s", "0,02 m/s", "10 m/s"], ok: 0, porque: "v = ω·r = 10 · 0,20 = 2 m/s." },
        { q: "Un coche toma una curva de 5 m de radio a 10 m/s. Su aceleración centrípeta es…",
          op: ["20 m/s²", "2 m/s²", "50 m/s²", "0,5 m/s²"], ok: 0, porque: "a<sub>c</sub> = v²/r = 100/5 = 20 m/s²." },
        { q: "La aceleración centrípeta de un MCU apunta…",
          op: ["hacia el centro de la circunferencia", "en la dirección de la velocidad", "hacia fuera, alejándose del centro", "no existe en un MCU"], ok: 0, porque: "Es perpendicular a la velocidad y señala al centro." },
        { q: "La velocidad angular de rotación de la Tierra (un día sidéreo) es aproximadamente…",
          op: ["7,3·10⁻⁵ rad/s", "7,3·10⁻³ rad/s", "0,26 rad/s", "2π rad/s"], ok: 0, porque: "ω = 2π/86 164 s ≈ 7,29·10⁻⁵ rad/s." },
        { q: "Una rueda parte del reposo con α = 3 rad/s². El ángulo que gira en 4 s es…",
          op: ["24 rad", "12 rad", "48 rad", "6 rad"], ok: 0, porque: "θ = ½·3·16 = 24 rad (3,8 vueltas)." },
        { q: "Un engranaje de 10 dientes gira a 30 rad/s y engrana con otro de 30 dientes. El segundo gira a…",
          op: ["10 rad/s en sentido contrario", "30 rad/s", "90 rad/s", "10 rad/s en el mismo sentido"], ok: 0, porque: "ω₂ = ω₁·N₁/N₂ = 30·10/30 = 10 rad/s, con sentido opuesto." },
        { q: "Si se duplica la velocidad angular de un disco, la aceleración centrípeta de un punto fijo…",
          op: ["se multiplica por 4", "se duplica", "se reduce a la mitad", "no cambia"], ok: 0, porque: "a<sub>c</sub> = ω²·r." },
        { q: "En un MCUA, la aceleración tangencial de un punto a distancia r del eje vale…",
          op: ["α·r", "ω²·r", "ω·r", "α/r"], ok: 0, porque: "a<sub>t</sub> = α·r; la normal es ω²r." },
        { q: "En una gráfica ω–t de un MCUA (recta inclinada), la pendiente representa…",
          op: ["la aceleración angular α", "la velocidad angular", "el ángulo recorrido", "el periodo"], ok: 0, porque: "Pendiente de ω–t = α. El área es el ángulo recorrido." }
      ]
    },
    tj1: {
      titulo: "Movimiento circular",
      cartas: [
        { a: "Radián y arco", b: "θ = s/r (adimensional) · s = θ·r · 2π rad = 360° = 1 vuelta." },
        { a: "Velocidad angular", b: "ω = Δθ/Δt (rad/s) · ω = 2π/T = 2πf · 1 rpm = 2π/60 rad/s." },
        { a: "Periodo y frecuencia", b: "T = tiempo de una vuelta (s) · f = vueltas/s (Hz) · T = 1/f." },
        { a: "Velocidad lineal", b: "v = ω·r · tangente a la circunferencia · v = 2πr/T." },
        { a: "Mismo sólido", b: "Todos los puntos tienen la misma ω y el mismo T; v y a<sub>c</sub> crecen con r." },
        { a: "MCU", b: "ω constante · θ = θ₀ + ω·t · n.º de vueltas = Δθ/2π." },
        { a: "Aceleración centrípeta", b: "a<sub>c</sub> = v²/r = ω²r = 4π²r/T² · hacia el centro · perpendicular a v." },
        { a: "Doble de velocidad", b: "a<sub>c</sub> ∝ v²: se multiplica por 4 (a r constante)." },
        { a: "Aceleración angular", b: "α = Δω/Δt (rad/s²) · positiva si ω crece en el sentido positivo." },
        { a: "MCUA: ecuaciones", b: "ω = ω₀ + αt · θ = θ₀ + ω₀t + ½αt² · ω² = ω₀² + 2αΔθ." },
        { a: "Componentes de la aceleración", b: "a<sub>t</sub> = α·r (cambia |v|) · a<sub>n</sub> = ω²·r (cambia la dirección) · |a| = √(a<sub>t</sub>² + a<sub>n</sub>²)." },
        { a: "Transmisiones", b: "Contacto o correa: misma v (ω₁r₁ = ω₂r₂; ω₁N₁ = ω₂N₂) · mismo eje: misma ω · engranajes: sentidos contrarios." },
        { a: "Encuentros circulares", b: "Mismo sentido: T = T<sub>A</sub>T<sub>B</sub>/|T<sub>B</sub> − T<sub>A</sub>| · sentidos opuestos: T = T<sub>A</sub>T<sub>B</sub>/(T<sub>A</sub> + T<sub>B</sub>)." },
        { a: "Del MCU al MAS", b: "x = A·cos(ωt + φ₀) · v = −Aω·sen(ωt + φ₀) · a = −ω²x." }
      ]
    }
  };
})(window);
