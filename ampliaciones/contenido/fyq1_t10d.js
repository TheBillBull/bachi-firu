/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 10: Dinámica (las leyes de Newton)
   Parte D: problemas tipo PAU, historia, «¿Qué falla aquí?», autocomprobación y datos de las actividades
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t10/" + ref); }
  var P = B._fq10;

  P.nuevas.push(
    // -------------------------------------------------------------- 13
    {
      h: "13. Seis problemas tipo examen (PAU) resueltos paso a paso",
      html:
        "<p>Estos problemas tienen el nivel y el estilo de los exámenes. Intenta resolverlos tú antes de leer la solución: dibuja el diagrama de cuerpo libre, escribe las ecuaciones y compara. Se usa g = 9,8 m/s².</p>" +
        ejemplo("Problema 1 · Un bloque lanzado plano arriba", "Se lanza un bloque de 5 kg plano arriba, por un plano inclinado 30° con μ = 0,2, con una velocidad inicial de 8 m/s. a) ¿Qué aceleración tiene mientras sube? b) ¿Qué distancia recorre hasta pararse? c) ¿Vuelve a bajar? En ese caso, ¿con qué velocidad pasa de nuevo por el punto de partida?", [
          "<b>a)</b> Al subir, P<sub>∥</sub> y el rozamiento (contra la velocidad, plano abajo) frenan: |a| = g(sen θ + μ cos θ) = 9,8·(0,5 + 0,2·0,866) = 9,8·0,6732 = <b>6,60 m/s²</b> (a = −6,60 m/s² con el eje + plano arriba).",
          "<b>b)</b> v² = v₀² + 2as → 0 = 64 − 2·6,597·s → s = 64/13,19 = <b>4,85 m</b>.",
          "<b>c)</b> Vuelve a bajar si el rozamiento estático no basta para sostenerlo: tan 30° = 0,577 &gt; μ = 0,2 → <b>sí desliza</b>. Al bajar, el rozamiento va plano arriba: a = g(sen θ − μ cos θ) = 9,8·(0,5 − 0,1732) = <b>3,20 m/s²</b>.",
          "Velocidad al volver: v² = 2·3,2026·4,850 = 31,07 → <b>v = 5,57 m/s</b> (menor que los 8 m/s iniciales, porque el rozamiento disipó energía)."
        ]) +
        ejemplo("Problema 2 · Un bloque en un plano y otro colgante", "Un bloque de 8 kg está sobre un plano inclinado 37° (μ = 0,3), unido por una cuerda ideal, a través de una polea en lo alto del plano, a otro bloque de 10 kg que cuelga. a) ¿Qué masa mínima debe tener el bloque colgante para que el sistema se ponga en marcha plano arriba? b) Con 10 kg, calcula la aceleración y la tensión.", [
          "Datos: sen 37° = 0,6018; cos 37° = 0,7986. Para el bloque del plano: P<sub>∥</sub> = 8·9,8·0,6018 = 47,18 N; F<sub>r,máx</sub> = 0,3·8·9,8·0,7986 = 18,79 N.",
          "<b>a)</b> El colgante debe vencer P<sub>∥</sub> + F<sub>r,máx</sub> = 65,97 N → m₂·g &gt; 65,97 → <b>m₂ &gt; 6,73 kg</b>. (Con menos, el sistema no se mueve.)",
          "<b>b)</b> Con m₂ = 10 kg: colgante: 98 − T = 10a. Plano (hacia arriba): T − 47,18 − 18,79 = 8a.",
          "Suma: 98 − 65,97 = 18a → a = 32,03/18 = <b>1,78 m/s²</b>. Tensión: T = 98 − 10·1,78 = <b>80,2 N</b>."
        ]) +
        ejemplo("Problema 3 · Un ascensor con carga", "Una cabina de 630 kg con un pasajero de 70 kg (en total 700 kg) arranca hacia arriba con una aceleración de 1,5 m/s² hasta alcanzar 3 m/s. Calcula: a) la tensión del cable durante el arranque; b) la fuerza que la cabina ejerce sobre el pasajero y lo que marcaría una báscula; c) el tiempo y la altura del arranque; d) la tensión una vez que sube a velocidad constante.", [
          "<b>a)</b> Conjunto (700 kg): T − m·g = m·a → T = 700·(9,8 + 1,5) = <b>7910 N</b>.",
          "<b>b)</b> Sobre el pasajero: N − m·g = m·a → N = 70·(9,8 + 1,5) = <b>791 N</b>; la báscula marcaría 791/9,8 = 80,7 «kilos».",
          "<b>c)</b> v = a·t → t = 3/1,5 = <b>2 s</b>; altura: s = ½·a·t² = ½·1,5·4 = <b>3 m</b>.",
          "<b>d)</b> A velocidad constante a = 0: T = m·g = 700·9,8 = <b>6860 N</b> (menor que durante el arranque)."
        ]) +
        ejemplo("Problema 4 · Una curva", "Un coche de 1200 kg toma una curva de 150 m de radio. a) ¿Cuál es la velocidad máxima en la curva plana si μ = 0,8? b) ¿Qué ángulo de peralte permitiría tomarla a 90 km/h sin depender del rozamiento? c) En la curva plana a 90 km/h, ¿qué rozamiento hace falta?", [
          "<b>a)</b> v<sub>máx</sub> = √(μ·g·r) = √(0,8·9,8·150) = √1176 = 34,29 m/s = <b>123 km/h</b>.",
          "<b>b)</b> 90 km/h = 25 m/s. Sin rozamiento: tan θ = v²/(r·g) = 625/(150·9,8) = 0,4252 → <b>θ = 23,0°</b>.",
          "<b>c)</b> F<sub>c</sub> = m·v²/r = 1200·625/150 = <b>5000 N</b>, que debe aportarlo el rozamiento. Su máximo es μ·m·g = 0,8·1200·9,8 = 9408 N &gt; 5000 N, así que no derrapa (usa el 53 % del máximo)."
        ]) +
        ejemplo("Problema 5 · Un choque y luego rozamiento", "Un bloque A de 2 kg se mueve a 6 m/s sobre una superficie horizontal y choca con otro bloque B de 4 kg en reposo; tras el choque quedan unidos. El coeficiente de rozamiento con la superficie es 0,25. a) Velocidad justo después del choque. b) Energía perdida en el choque. c) Distancia que recorren hasta pararse.", [
          "<b>a)</b> p se conserva (el choque es muy breve): 2·6 = (2 + 4)·v → v = 12/6 = <b>2 m/s</b>.",
          "<b>b)</b> E<sub>c</sub> antes = ½·2·36 = 36 J; después = ½·6·4 = 12 J → pérdida = <b>24 J</b> (las dos terceras partes).",
          "<b>c)</b> Después del choque sólo actúa el rozamiento: |a| = μ·g = 0,25·9,8 = 2,45 m/s². d = v²/(2|a|) = 4/4,9 = <b>0,816 m</b>. (Comprobación: la energía restante, 12 J, es igual a μ·m·g·d = 0,25·6·9,8·0,816 = 12 J ✓.)"
        ]) +
        ejemplo("Problema 6 · Dos bloques en contacto con rozamiento", "Una fuerza horizontal de 60 N empuja un bloque A de 5 kg que está en contacto con otro B de 3 kg, sobre un suelo con μ = 0,2 para los dos bloques. Calcula la aceleración y la fuerza de contacto entre ellos.", [
          "Los dos se mueven juntos. Normales: N<sub>A</sub> = 49 N y N<sub>B</sub> = 29,4 N; rozamientos: 9,8 N y 5,88 N (total 15,68 N).",
          "Conjunto: 60 − 15,68 = 8·a → a = <b>5,54 m/s²</b>.",
          "Sobre B (la fuerza de contacto N<sub>AB</sub> empuja a B y el rozamiento le frena): N<sub>AB</sub> − 5,88 = 3·5,54 → N<sub>AB</sub> = <b>22,5 N</b>.",
          "Comprobación con A: 60 − 22,5 − 9,8 = 27,7 N = 5·5,54 ✓."
        ])
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Un poco de historia: de Aristóteles a Newton y más allá",
      html:
        "<p>La dinámica tardó casi dos mil años en nacer. <b>Aristóteles</b> (siglo IV a. C.) sostenía que el estado natural de los cuerpos terrestres es el reposo y que, para mantener un movimiento, hace falta una fuerza continua; además, que los cuerpos pesados caen más deprisa que los ligeros. Parecía coherente con la experiencia cotidiana y se aceptó como verdad durante siglos.</p>" +
        "<p><b>Galileo Galilei</b> (1564–1642) cambió la forma de preguntar: en lugar de explicar lo que se ve, hizo experimentos controlados y los idealizó. Con bolas rodando por planos inclinados descubrió que la caída es un movimiento uniformemente acelerado, independiente del peso, y que, sin rozamiento, un movimiento horizontal nunca se detendría: el principio de inercia. También formuló la idea de que las leyes de la mecánica son las mismas para un observador en reposo y para otro que se mueva con velocidad constante (el famoso barco de los <i>Diálogos</i>), una idea que Einstein recogería tres siglos después.</p>" +
        "<p><b>Isaac Newton</b> (1643–1727) publicó en 1687 los <i>Philosophiæ Naturalis Principia Mathematica</i>. Allí enunció las tres leyes que llevan su nombre, definió la masa y la cantidad de movimiento, y las combinó con la ley de gravitación universal (Tema 11) para explicar con el mismo conjunto de principios la caída de una manzana, las mareas y las órbitas de los planetas. Fue la primera gran unificación de la física: el cielo y la Tierra obedecían las mismas leyes. Para formular la dinámica, Newton tuvo que inventar, a la vez que Leibniz, el cálculo diferencial.</p>" +
        "<p>La mecánica newtoniana funcionó con éxito extraordinario durante más de dos siglos (permitió descubrir Neptuno a partir de las perturbaciones de la órbita de Urano). Sus límites aparecieron a principios del siglo XX: a velocidades cercanas a la de la luz hay que usar la <b>relatividad especial</b> de Einstein (1905), en la que la masa no es lo único que importa; y a escala atómica, la <b>mecánica cuántica</b>. Sin embargo, para casi todo lo que ocurre a escala humana (coches, puentes, planetas, satélites), las leyes de Newton siguen siendo exactas para todos los fines prácticos, y son las que usan los ingenieros que diseñan una misión a Marte.</p>"
    },
    // -------------------------------------------------------------- 15
    {
      h: "15. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y piensa por qué es un error.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 16
    {
      h: "16. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, juegos de parejas, dos clasificaciones (qué ley explica cada fenómeno y qué fuerzas son reales) y un ejercicio de ordenar los pasos de un problema clásico.</p>" +
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
        { q: "«Un coche circula por una recta a 100 km/h constantes; como se mueve, hay una fuerza neta grande en el sentido del movimiento.» ¿Qué falla?",
          op: ["Nada", "Con velocidad constante la fuerza neta es <b>cero</b> (motor y rozamientos se compensan)", "La fuerza neta debería ser igual a la velocidad", "La fuerza neta es igual a m·v"], ok: 1,
          porque: "La primera ley: velocidad constante ⇒ a = 0 ⇒ ΣF = 0. El motor empuja, pero el rozamiento y el aire lo compensan exactamente." },
        { q: "«El peso del libro y la normal de la mesa son una pareja acción-reacción porque son iguales y opuestas.» ¿Qué falla?",
          op: ["Nada", "Actúan sobre el <b>mismo</b> cuerpo (el libro): una pareja acción-reacción actúa sobre cuerpos distintos", "No son iguales", "Son de la misma naturaleza"], ok: 1,
          porque: "Son iguales y opuestas porque el libro está en equilibrio (2.ª ley, ΣF = 0), no por la 3.ª ley. La reacción del peso es la atracción del libro sobre la Tierra." },
        { q: "«El caballo tira del carro con una fuerza F y el carro tira del caballo con −F; se anulan y por eso el carro no puede moverse.» ¿Qué falla?",
          op: ["Nada", "Las dos fuerzas actúan sobre cuerpos distintos: para el carro sólo cuentan las fuerzas <b>sobre el carro</b> (tirón del caballo y rozamiento)", "El caballo tira con más fuerza", "El carro no tira del caballo"], ok: 1,
          porque: "Acción y reacción no se suman porque no actúan sobre el mismo cuerpo. El carro acelera si el tirón del caballo supera al rozamiento del suelo sobre el carro." },
        { q: "«Si duplico la masa de un bloque que resbala por un plano inclinado liso, su aceleración también se duplica.» ¿Qué falla?",
          op: ["Nada", "a = g·sen θ <b>no depende de la masa</b>: más masa pesa más, pero también tiene más inercia", "La aceleración se reduce a la mitad", "La aceleración se hace cuatro veces mayor"], ok: 1,
          porque: "m·g·sen θ = m·a ⇒ a = g·sen θ. La masa se cancela, como en la caída libre." },
        { q: "«Un bloque de 10 kg está en un plano inclinado 30°; la normal es N = m·g = 98 N.» ¿Qué falla?",
          op: ["Nada", "En un plano inclinado, N = m·g·cos θ = 84,9 N (sólo la componente perpendicular del peso se equilibra con la normal)", "N = m·g·sen θ", "N = m·g/cos θ"], ok: 1,
          porque: "Se aplica la 2.ª ley en la dirección perpendicular al plano: N − m·g·cos θ = 0. Usar m·g sobreestima la normal y, con ella, el rozamiento." },
        { q: "«Un bloque en reposo sobre una rampa con μ<sub>e</sub> = 0,5 soporta un rozamiento de μ<sub>e</sub>·N.» ¿Qué falla?",
          op: ["Nada", "μ<sub>e</sub>·N es el rozamiento estático <b>máximo</b>; en reposo vale sólo lo necesario (por ejemplo, igual a P<sub>∥</sub>)", "El rozamiento estático es cero", "El rozamiento siempre es μ<sub>c</sub>·N"], ok: 1,
          porque: "El rozamiento estático se adapta a la fuerza que tiende a mover el cuerpo. Sólo alcanza μ<sub>e</sub>·N en el instante en que el cuerpo está a punto de deslizar." },
        { q: "«En el punto más alto de su trayectoria, una pelota lanzada hacia arriba no tiene fuerzas, porque su velocidad es cero.» ¿Qué falla?",
          op: ["Nada", "Su peso sigue actuando: ΣF = m·g y a = g (hacia abajo) en todo el vuelo", "Sobre ella actúa una fuerza hacia arriba", "En ese punto ΣF = m·v"], ok: 1,
          porque: "Que la velocidad se anule un instante no significa que se anule la fuerza: la aceleración (g) es la misma en toda la trayectoria. Si no hubiese fuerza, la pelota se quedaría parada para siempre." },
        { q: "«En una curva dibujo la fuerza centrífuga hacia fuera y la centrípeta hacia dentro en el diagrama de cuerpo libre del coche.» ¿Qué falla?",
          op: ["Nada", "La centrífuga no es una interacción real y la centrípeta no es una fuerza nueva: es la <b>resultante</b> (rozamiento, normal…) hacia el centro", "Sólo falta la fuerza de la velocidad", "Debería dibujar sólo la centrífuga"], ok: 1,
          porque: "En un sistema inercial se dibujan sólo fuerzas reales; su resultante hacia el centro es m·v²/r." },
        { q: "«Un ascensor sube con velocidad constante de 5 m/s; la báscula marca más que cuando está parado.» ¿Qué falla?",
          op: ["Nada", "Con velocidad constante a = 0 ⇒ N = m·g: marca <b>lo mismo</b>; sólo importa la aceleración, no la velocidad", "Marca menos", "Marca el doble"], ok: 1,
          porque: "N = m(g + a). La lectura cambia durante el arranque y la frenada, pero no a velocidad constante." },
        { q: "«En una máquina de Atwood con masas de 3 kg y 5 kg, la tensión de la cuerda es el peso de la masa mayor, T = 49 N.» ¿Qué falla?",
          op: ["Nada", "Esa masa baja con aceleración, así que T &lt; m₂·g: T = 2m₁m₂g/(m₁ + m₂) = 36,75 N", "T es el peso de la masa menor", "T = 0"], ok: 1,
          porque: "Si la masa que baja acelera hacia abajo, la fuerza neta sobre ella apunta hacia abajo: m₂g − T = m₂a &gt; 0 ⇒ T &lt; m₂g." },
        { q: "Un alumno tira de una caja con una fuerza F que forma un ángulo θ con el suelo y escribe ΣF<sub>x</sub> = F − F<sub>r</sub> = m·a. ¿Qué falla?",
          op: ["Nada", "En el eje x sólo cuenta la componente: F·cos θ − F<sub>r</sub> = m·a (y la normal cambia: N = m·g − F·sen θ)", "Debe usar F·sen θ en el eje x", "El rozamiento no se resta"], ok: 1,
          porque: "Una fuerza oblicua se descompone: su componente horizontal es F·cos θ; la vertical F·sen θ altera la normal y, con ella, el rozamiento." },
        { q: "Dos bloques en contacto (A de 5 kg y B de 3 kg) se empujan con 24 N sobre una mesa lisa. Un alumno dice que la fuerza de contacto sobre B es 24 N. ¿Qué falla?",
          op: ["Nada", "Sobre B sólo actúa la fuerza de contacto: F<sub>AB</sub> = m<sub>B</sub>·a = 3·3 = 9 N", "Es 24/2 = 12 N", "Es 0 N"], ok: 1,
          porque: "El conjunto acelera a = 24/8 = 3 m/s²; para B, la fuerza neta es la de contacto: 9 N. Los 24 N actúan sobre A." }
      ]
    },
    quiz1: {
      titulo: "Test: dinámica y leyes de Newton",
      preguntas: [
        { q: "Un cuerpo de 4 kg recibe una fuerza neta de 12 N. Su aceleración es…", op: ["3 m/s²", "48 m/s²", "0,33 m/s²", "8 m/s²"], ok: 0, porque: "a = ΣF/m = 12/4 = 3 m/s²." },
        { q: "La unidad de fuerza del SI (N) equivale a…", op: ["kg·m/s²", "kg·m/s", "kg/(m·s²)", "kg·m²/s²"], ok: 0, porque: "1 N = 1 kg·1 m/s²." },
        { q: "Un cuerpo se mueve con MRU. ¿Qué se puede afirmar de la fuerza neta sobre él?", op: ["Es cero", "Apunta en el sentido del movimiento", "Es constante y distinta de cero", "Aumenta con el tiempo"], ok: 0, porque: "MRU ⇒ a = 0 ⇒ ΣF = 0 (1.ª ley)." },
        { q: "Dos fuerzas perpendiculares de 6 N y 8 N actúan sobre un cuerpo. El módulo de la resultante es…", op: ["10 N", "14 N", "2 N", "48 N"], ok: 0, porque: "√(6² + 8²) = 10 N." },
        { q: "Una persona de 70 kg pesa en la Luna (g = 1,62 m/s²) aproximadamente…", op: ["113 N", "686 N", "70 N", "11,5 N"], ok: 0, porque: "P = m·g = 70·1,62 = 113,4 N; su masa sigue siendo 70 kg." },
        { q: "La reacción al peso de un libro apoyado en una mesa es…", op: ["la atracción del libro sobre la Tierra", "la normal de la mesa", "el rozamiento", "no existe reacción"], ok: 0, porque: "Una pareja es «A sobre B» y «B sobre A»: la Tierra atrae al libro ↔ el libro atrae a la Tierra." },
        { q: "Un bloque de 5 kg se desliza sobre una superficie horizontal con μ<sub>c</sub> = 0,3 (g = 10 m/s²). El rozamiento vale…", op: ["15 N", "50 N", "1,5 N", "16,7 N"], ok: 0, porque: "F<sub>r</sub> = μ·N = μ·m·g = 0,3·5·10 = 15 N." },
        { q: "Un ascensor arranca hacia arriba con a = +2 m/s². La báscula en la que está una persona marca…", op: ["más que parado", "menos que parado", "lo mismo", "cero"], ok: 0, porque: "N = m(g + a) &gt; m·g." },
        { q: "En un plano inclinado liso, la aceleración de un bloque…", op: ["es g·sen θ y no depende de la masa", "es g·cos θ", "depende de la masa", "es g"], ok: 0, porque: "m·g·sen θ = m·a." },
        { q: "El coeficiente de rozamiento estático de un par de superficies es…", op: ["mayor o igual que el cinético", "menor que el cinético", "siempre igual al cinético", "siempre cero"], ok: 0, porque: "Cuesta más ponerlo en marcha que mantenerlo en movimiento: μ<sub>e</sub> ≥ μ<sub>c</sub>." },
        { q: "Un coche toma una curva plana. Si duplica su velocidad, la fuerza centrípeta necesaria…", op: ["se multiplica por 4", "se duplica", "se divide entre 2", "no cambia"], ok: 0, porque: "F = m·v²/r: depende del cuadrado de v." },
        { q: "En un choque perfectamente inelástico entre dos cuerpos aislados…", op: ["se conserva la cantidad de movimiento pero no la energía cinética", "se conserva la energía cinética pero no la cantidad de movimiento", "se conservan las dos", "no se conserva ninguna"], ok: 0, porque: "Σp se conserva siempre (sin fuerzas externas); E<sub>c</sub> sólo en el choque elástico." }
      ]
    },
    tj1: {
      titulo: "Tarjetas: fórmulas y conceptos de dinámica",
      cartas: [
        { a: "Segunda ley de Newton", b: "ΣF⃗ = m·a⃗ · por ejes: ΣF<sub>x</sub> = m·a<sub>x</sub>, ΣF<sub>y</sub> = m·a<sub>y</sub> · a tiene el sentido de ΣF" },
        { a: "Primera ley (inercia)", b: "ΣF = 0 ⇒ reposo o MRU (equilibrio). La masa mide la inercia." },
        { a: "Tercera ley", b: "F<sub>A→B</sub> = −F<sub>B→A</sub>: mismo módulo, sentido opuesto, cuerpos distintos (no se anulan)." },
        { a: "Peso", b: "P = m·g (N), vertical hacia abajo. La masa no cambia; el peso depende de g." },
        { a: "Fuerza normal en un plano inclinado", b: "N = m·g·cos θ (perpendicular al plano)" },
        { a: "Componentes del peso en el plano", b: "P<sub>∥</sub> = m·g·sen θ · P<sub>⊥</sub> = m·g·cos θ" },
        { a: "Aceleración en un plano con rozamiento", b: "a = g(sen θ − μ cos θ) (bajando) · sin rozamiento a = g sen θ" },
        { a: "Rozamiento", b: "estático: F<sub>r</sub> ≤ μ<sub>e</sub>·N · cinético: F<sub>r</sub> = μ<sub>c</sub>·N · μ<sub>e</sub> ≥ μ<sub>c</sub>" },
        { a: "Ángulo crítico", b: "tan θ<sub>c</sub> = μ<sub>e</sub>: por encima de θ<sub>c</sub> el cuerpo resbala (no depende de la masa)" },
        { a: "Báscula en un ascensor", b: "N = m(g + a), a positiva hacia arriba · caída libre: N = 0" },
        { a: "Máquina de Atwood", b: "a = (m₂ − m₁)g/(m₁ + m₂) · T = 2m₁m₂g/(m₁ + m₂)" },
        { a: "Dinámica circular", b: "ΣF<sub>normal</sub> = m·v²/r = m·ω²·r (hacia el centro) · curva plana: v<sub>máx</sub> = √(μ·g·r)" },
        { a: "Curva peraltada sin rozamiento", b: "tan θ = v²/(r·g)" },
        { a: "Cantidad de movimiento e impulso", b: "p = m·v · I = ΣF·Δt = Δp · Σp se conserva sin fuerzas externas" },
        { a: "Choque perfectamente inelástico", b: "v′ = (m₁v₁ + m₂v₂)/(m₁ + m₂) · se pierde la mayor E<sub>c</sub> posible" },
        { a: "Velocidad límite", b: "m·g = k·v² ⇒ v<sub>lím</sub> = √(m·g/k): ΣF = 0 y velocidad constante" }
      ]
    },
    emp1: {
      titulo: "Parejas: situación y ley (o fórmula) que la explica",
      consigna: "Une cada situación con la idea que la explica.",
      pares: [
        ["Un pasajero se va hacia delante cuando el autobús frena", "1.ª ley: inercia"],
        ["Un coche acelera más cuanto menos masa tiene (misma fuerza)", "2.ª ley: a = F/m"],
        ["Un cohete avanza expulsando gases hacia atrás", "3.ª ley: acción y reacción"],
        ["Una báscula marca 0 en caída libre", "N = m(g + a) con a = −g"],
        ["Un bloque de masa distinta resbala igual en un plano liso", "a = g·sen θ, sin m"],
        ["Un coche derrapa al tomar una curva muy deprisa", "el rozamiento no basta: m·v²/r &gt; μ·m·g"],
        ["Un airbag reduce la fuerza de un choque", "I = F·Δt = Δp: más Δt, menos F"],
        ["Un paracaidista cae a velocidad constante", "ΣF = 0: resistencia igual al peso"]
      ]
    },
    emp2: {
      titulo: "Parejas: fuerza y situación",
      consigna: "Une cada fuerza con la situación en la que aparece.",
      pares: [
        ["Normal", "El suelo empuja a una persona de pie"],
        ["Tensión", "Un cable sostiene una lámpara"],
        ["Rozamiento estático", "Un pie empuja el suelo y avanza"],
        ["Rozamiento cinético", "Una caja desliza sobre el suelo"],
        ["Peso", "La Tierra atrae a una piedra"],
        ["Fuerza elástica", "Un muelle estirado tira de un bloque"],
        ["Resistencia del aire", "Un ciclista rápido nota el viento en contra"]
      ]
    },
    cla1: {
      titulo: "¿Qué ley de Newton explica cada fenómeno?",
      consigna: "Clasifica cada fenómeno según la ley que lo explica.",
      categorias: ["1.ª ley (inercia)", "2.ª ley (F = m·a)", "3.ª ley (acción-reacción)"],
      items: [
        { t: "El café se derrama al arrancar bruscamente el coche", c: 0 },
        { t: "Un camión necesita más fuerza que un coche para acelerar igual", c: 1 },
        { t: "Al saltar de una barca, ésta se va hacia atrás", c: 2 },
        { t: "Un satélite en el espacio sigue moviéndose con los motores apagados", c: 0 },
        { t: "La aceleración de un bloque es el doble si se duplica la fuerza", c: 1 },
        { t: "La pelota rebota y la raqueta «nota» el golpe", c: 2 },
        { t: "El mantel sale de debajo de los platos con un tirón rápido", c: 0 },
        { t: "Un coche frena con a = −5 m/s²: ¿qué fuerza hace falta?", c: 1 },
        { t: "Un nadador avanza empujando el agua hacia atrás", c: 2 }
      ]
    },
    cla2: {
      titulo: "¿Es una fuerza real?",
      consigna: "Clasifica cada «fuerza» según si es de contacto, a distancia o si no es una fuerza real.",
      categorias: ["Fuerza de contacto", "Fuerza a distancia", "No es una fuerza real"],
      items: [
        { t: "Normal", c: 0 }, { t: "Rozamiento", c: 0 }, { t: "Tensión de una cuerda", c: 0 }, { t: "Peso", c: 1 }, { t: "Atracción entre dos imanes", c: 1 },
        { t: "Fuerza centrífuga", c: 2 }, { t: "«Fuerza del movimiento»", c: 2 }, { t: "Fuerza de inercia", c: 2 }, { t: "Resistencia del aire", c: 0 }, { t: "Atracción gravitatoria Tierra–Luna", c: 1 }
      ]
    },
    orden1: {
      titulo: "Ordena los pasos: un bloque en un plano inclinado con rozamiento",
      consigna: "Ordena los pasos para calcular la aceleración de un bloque que baja por un plano inclinado con rozamiento.",
      items: [
        { t: "Dibujar el plano, el bloque y escribir los datos en el SI", nota: "m, θ, μ, g" },
        { t: "Dibujar el diagrama de cuerpo libre: peso, normal y rozamiento", nota: "sólo fuerzas reales" },
        { t: "Elegir ejes paralelo y perpendicular al plano y descomponer el peso", nota: "P∥ = m·g·sen θ; P⊥ = m·g·cos θ" },
        { t: "Eje perpendicular: N − m·g·cos θ = 0, luego N = m·g·cos θ", nota: "no hay aceleración en ese eje" },
        { t: "Calcular el rozamiento: F<sub>r</sub> = μ·N", nota: "sólo si desliza" },
        { t: "Eje paralelo: m·g·sen θ − F<sub>r</sub> = m·a", nota: "segunda ley" },
        { t: "Despejar a = g(sen θ − μ cos θ) y comprobar el signo y las unidades", nota: "si da negativa, no desliza" }
      ]
    }
  };
})(window);
