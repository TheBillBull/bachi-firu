/* ============================================================
   Física y Química 1.º · ampliaciones · Tema 10: Dinámica (las leyes de Newton)
   Parte A: resumen y refuerzo de las secciones originales 1–3 (la fuerza como vector, 1.ª y 2.ª ley)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t10/" + ref); }
  var P = B._fq10 = {};

  P.resumen = [
    "<b>Fuerza</b>: magnitud vectorial (módulo, dirección y sentido) que mide una interacción entre dos cuerpos; se mide en newtons (N = kg·m/s²) · se suman como vectores: ΣF<sub>x</sub> = ΣF·cos θ, ΣF<sub>y</sub> = ΣF·sen θ y |ΣF| = √(ΣF<sub>x</sub>² + ΣF<sub>y</sub>²) · con ángulo α entre dos fuerzas: R² = F₁² + F₂² + 2F₁F₂cos α.",
    "<b>1.ª ley (inercia)</b>: si ΣF = 0, el cuerpo sigue en reposo o con MRU (equilibrio). La masa mide la inercia. Sólo vale en sistemas de referencia inerciales.",
    "<b>2.ª ley</b>: ΣF⃗ = m·a⃗ (por ejes: ΣF<sub>x</sub> = m·a<sub>x</sub>, ΣF<sub>y</sub> = m·a<sub>y</sub>) · a tiene la dirección y el sentido de ΣF · forma general ΣF = Δp/Δt, con p = m·v.",
    "<b>3.ª ley</b>: las fuerzas de acción y reacción son iguales en módulo, de sentido opuesto y actúan sobre cuerpos <i>distintos</i> (por eso no se anulan); peso y normal <b>no</b> son un par.",
    "<b>Peso</b> P = m·g (N) y <b>normal</b> N (perpendicular a la superficie; no siempre vale m·g: N = m·g·cos θ en un plano, N = m(g + a) en un ascensor) · <b>rozamiento</b>: F<sub>r</sub> ≤ μ<sub>e</sub>·N en reposo, F<sub>r</sub> = μ<sub>c</sub>·N deslizando (μ<sub>e</sub> ≥ μ<sub>c</sub>), independiente del área.",
    "<b>Método</b>: dibujar el cuerpo libre (sólo fuerzas reales), elegir ejes, descomponer, aplicar ΣF = m·a en cada eje, relacionar aceleraciones y tensiones, resolver y comprobar · <b>plano inclinado</b>: P∥ = m·g·sen θ, N = m·g·cos θ · <b>circular</b>: ΣF<sub>normal</sub> = m·v²/r · <b>choques</b>: Σp se conserva."
  ];

  P.secciones = {};

  // ---------------------------------------------------------------- 1. La fuerza como vector
  P.secciones[0] =
    "<h5>Qué es una fuerza y qué efectos produce</h5>" +
    "<p>Una <b>fuerza</b> es la medida de una <b>interacción</b> entre dos cuerpos. Siempre hay dos protagonistas: el cuerpo que ejerce la fuerza (el agente) y el cuerpo que la sufre (el receptor). Cuando empujas una mesa, el agente eres tú y el receptor es la mesa; cuando sueltas una piedra, el agente es la Tierra y el receptor es la piedra. Una fuerza no es una propiedad que «tenga» un cuerpo, como la masa: es algo que <i>ocurre entre</i> cuerpos, y sin interacción no hay fuerza.</p>" +
    "<p>Una fuerza puede producir dos efectos, que se pueden dar a la vez: <b>cambiar el estado de movimiento</b> del cuerpo (ponerlo en marcha, frenarlo, desviarlo; es decir, comunicarle una <i>aceleración</i>) y <b>deformarlo</b> (estirar un muelle, abollar una chapa, doblar una regla). Este tema se ocupa sobre todo del primer efecto: la relación entre las fuerzas y la aceleración, que es el núcleo de la dinámica.</p>" +
    "<p>Según cómo se ejercen, las fuerzas se agrupan en <b>fuerzas de contacto</b> (empujón, tensión de una cuerda, normal, rozamiento, resistencia del aire) y <b>fuerzas a distancia</b> (la atracción gravitatoria, las fuerzas eléctricas y las magnéticas), que actúan sin que los cuerpos se toquen. A nivel microscópico todas las fuerzas de contacto son, en el fondo, interacciones eléctricas entre los átomos de las superficies, pero a este nivel basta tratarlas como fuerzas distintas.</p>" +
    "<h5>Unidades y medida de las fuerzas</h5>" +
    "<p>La unidad de fuerza en el Sistema Internacional es el <b>newton</b> (N). Por definición, 1 N es la fuerza que comunica a una masa de 1 kg una aceleración de 1 m/s²: 1 N = 1 kg·m/s². Un newton es aproximadamente el peso de una manzana pequeña de unos 100 g (0,1 kg × 9,8 m/s² = 0,98 N). Todavía se usa en algunos contextos el <b>kilopondio</b> (o kilogramo-fuerza, kgf): es el peso de 1 kg en la Tierra, así que 1 kgf = 9,8 N. Cuando alguien dice que una caja «pesa 20 kilos», está dando su <i>masa</i>; su peso es 20 × 9,8 = 196 N (≈ 20 kgf). La <b>dina</b> (1 dyn = 10⁻⁵ N) pertenece al antiguo sistema cegesimal.</p>" +
    "<p>Para medir fuerzas se usa el <b>dinamómetro</b>: un muelle con una escala. Funciona porque, dentro de cierto margen, el alargamiento del muelle es proporcional a la fuerza aplicada (ley de Hooke, que se estudia con detalle en el Tema 13). Calibrando el muelle con pesos conocidos se obtiene una escala directamente en newtons.</p>" +
    "<h5>Las fuerzas que aparecen con más frecuencia</h5>" +
    "<p>Conviene conocer de memoria la lista de fuerzas habituales, quién las ejerce y hacia dónde apuntan, porque saber qué fuerzas hay sobre un cuerpo es la mitad de cualquier problema de dinámica:</p>" +
    tabla(["Fuerza", "La ejerce…", "Dirección y sentido", "Se calcula con…"], [
      ["Peso <b>P</b>", "la Tierra (a distancia)", "vertical, hacia el centro de la Tierra", "P = m·g"],
      ["Normal <b>N</b>", "la superficie de apoyo", "perpendicular a la superficie, hacia fuera de ella", "de ΣF = m·a (no tiene fórmula propia)"],
      ["Tensión <b>T</b>", "una cuerda, cable o varilla", "a lo largo de la cuerda, alejándose del cuerpo (la cuerda sólo tira)", "de ΣF = m·a"],
      ["Rozamiento <b>F<sub>r</sub></b>", "la superficie en contacto", "paralela a la superficie, contra el deslizamiento (o la tendencia a deslizar)", "F<sub>r</sub> ≤ μ<sub>e</sub>·N · F<sub>r</sub> = μ<sub>c</sub>·N"],
      ["Elástica <b>F<sub>e</sub></b>", "un muelle estirado o comprimido", "hacia la posición de equilibrio del muelle", "F = −k·x (ley de Hooke)"],
      ["Resistencia del fluido", "el aire o el agua", "contra la velocidad", "≈ k·v² (en aire a velocidades normales)"],
      ["Fuerza aplicada <b>F</b>", "una persona, un motor, un cable…", "la que tenga el agente", "dato del problema"]
    ]) +
    "<h5>Suma de fuerzas: los tres métodos</h5>" +
    "<p>Sobre un mismo cuerpo suelen actuar varias fuerzas a la vez. Su efecto conjunto es el de una sola fuerza, la <b>fuerza resultante</b> o <b>fuerza neta</b> ΣF⃗ (se lee «suma de fuerzas»), que es la <b>suma vectorial</b> de todas. Como las fuerzas son vectores, no se suman sus módulos: dos fuerzas de 3 N y 4 N pueden dar una resultante de 7 N, de 1 N, de 5 N o de cualquier valor intermedio según el ángulo que formen. Hay tres maneras de calcularla.</p>" +
    "<p><b>1. Método gráfico.</b> Se dibujan las fuerzas a escala. En el <b>paralelogramo</b> se colocan las dos fuerzas con el mismo origen y la resultante es la diagonal; en el <b>polígono</b> se colocan una a continuación de otra (el origen de cada una en el extremo de la anterior) y la resultante es el vector que cierra el camino, del origen de la primera al extremo de la última. Es intuitivo pero poco preciso.</p>" +
    "<p><b>2. Casos particulares con módulos.</b> Si las dos fuerzas tienen la <b>misma dirección y sentido</b>, el módulo de la resultante es la suma, R = F₁ + F₂; si tienen la misma dirección y <b>sentido opuesto</b>, es la diferencia, R = |F₁ − F₂|, y apunta como la mayor; si son <b>perpendiculares</b>, se usa Pitágoras, R = √(F₁² + F₂²); y si forman un <b>ángulo α cualquiera</b>, se usa el teorema del coseno:</p>" +
    formula("R = √(F₁² + F₂² + 2·F₁·F₂·cos α)") +
    "<p>donde α es el ángulo que forman las dos fuerzas cuando se dibujan con el mismo origen (para α = 0° da la suma y para α = 180° la diferencia; para α = 90°, cos α = 0 y se recupera Pitágoras).</p>" +
    "<p><b>3. Método analítico (por componentes).</b> Es el más seguro y el único válido con tres o más fuerzas. Se elige un sistema de ejes y cada fuerza F, que forma un ángulo θ con el eje x, se descompone en <b>F<sub>x</sub> = F·cos θ</b> y <b>F<sub>y</sub> = F·sen θ</b> (con su signo). Se suman las componentes de cada eje por separado:</p>" +
    formula("ΣF<sub>x</sub> = F<sub>1x</sub> + F<sub>2x</sub> + F<sub>3x</sub> + … &nbsp;&nbsp;&nbsp; ΣF<sub>y</sub> = F<sub>1y</sub> + F<sub>2y</sub> + F<sub>3y</sub> + …") +
    "<p>y luego se recompone la resultante: |ΣF| = √(ΣF<sub>x</sub>² + ΣF<sub>y</sub>²), con un ángulo respecto del eje x dado por tan φ = ΣF<sub>y</sub>/ΣF<sub>x</sub> (cuidado con el cuadrante: si ΣF<sub>x</sub> es negativa hay que sumar 180° al resultado de la calculadora).</p>" +
    w("f10_resultante") +
    ejemplo("Tres fuerzas sobre una caja", "Sobre una caja actúan F₁ = 40 N hacia la derecha (0°), F₂ = 30 N hacia arriba (90°) y F₃ = 20 N hacia la izquierda (180°). Calcula la fuerza resultante.", [
      "Componentes en x: F<sub>1x</sub> = 40, F<sub>2x</sub> = 0, F<sub>3x</sub> = −20 → ΣF<sub>x</sub> = 20 N.",
      "Componentes en y: F<sub>1y</sub> = 0, F<sub>2y</sub> = 30, F<sub>3y</sub> = 0 → ΣF<sub>y</sub> = 30 N.",
      "|ΣF| = √(20² + 30²) = √1300 = <b>36,06 N</b>.",
      "Dirección: tan φ = 30/20 = 1,5 → φ = <b>56,3°</b> sobre el eje x (hacia arriba y a la derecha)."
    ]) +
    ejemplo("Ángulo cualquiera: el teorema del coseno", "Dos fuerzas de 7 N y 8 N forman entre sí un ángulo de 60°. Calcula la resultante y el ángulo que forma con la fuerza de 7 N.", [
      "R² = 7² + 8² + 2·7·8·cos 60° = 49 + 64 + 112·0,5 = 169 → <b>R = 13 N</b>.",
      "Ángulo β con F₁: tan β = F₂·sen α/(F₁ + F₂·cos α) = 8·0,866/(7 + 8·0,5) = 6,928/11 = 0,630 → <b>β = 32,2°</b>."
    ]) +
    ejemplo("Descomponer una fuerza", "Se tira de un trineo con una cuerda que forma 30° con el suelo y la tensión es de 60 N. ¿Qué parte de la fuerza empuja hacia delante y qué parte levanta el trineo?", [
      "Componente horizontal: F<sub>x</sub> = 60·cos 30° = 60·0,866 = <b>51,96 N</b> (la que hace avanzar).",
      "Componente vertical: F<sub>y</sub> = 60·sen 30° = 60·0,5 = <b>30 N</b> (aligera el peso del trineo).",
      "Comprobación: √(51,96² + 30²) = √3600 = 60 N ✓."
    ]) +
    "<h5>El diagrama de cuerpo libre: la herramienta clave</h5>" +
    "<p>Antes de escribir cualquier ecuación hay que saber qué fuerzas actúan sobre el cuerpo. Para ello se hace un <b>diagrama de cuerpo libre</b> (DCL): se dibuja el cuerpo como un punto o un recuadro, <b>aislado</b> de todo lo demás, y se dibujan, saliendo de él, <b>todas las fuerzas que otros cuerpos ejercen sobre él</b>, con su dirección y sentido. Se hace así:</p>" +
    "<ol>" +
    "<li><b>Elige el cuerpo</b> cuyo movimiento quieres estudiar y dibújalo solo.</li>" +
    "<li><b>Dibuja el peso</b>, siempre: vertical, hacia abajo, desde el centro del cuerpo.</li>" +
    "<li><b>Recorre el contorno del cuerpo</b> preguntando «¿qué cosa me toca aquí?». Cada contacto puede generar una <b>normal</b> (empuja, perpendicular a la superficie), un <b>rozamiento</b> (paralelo a la superficie), una <b>tensión</b> (si hay cuerda) o una fuerza aplicada.</li>" +
    "<li><b>No dibujes</b> las fuerzas que el cuerpo ejerce sobre otros, ni los componentes de otras fuerzas a la vez que la fuerza, ni «fuerzas» que no existen: la <i>fuerza del movimiento</i>, la <i>fuerza de inercia</i> o la <i>fuerza centrífuga</i> no son interacciones con ningún cuerpo y no aparecen en un DCL de un sistema inercial.</li>" +
    "</ol>" +
    w("f10_dcl") +
    ojo("una fuerza sólo existe si hay <b>otro cuerpo</b> que la ejerce. Si no sabes decir quién empuja o tira, esa fuerza no existe. Un cuerpo lanzado hacia arriba sigue subiendo porque lleva velocidad (inercia), no porque una fuerza «lo empuje hacia arriba».");

  // ---------------------------------------------------------------- 2. Primera ley
  P.secciones[1] =
    "<h5>De Aristóteles a Galileo: un cambio de idea de dos mil años</h5>" +
    "<p>La experiencia diaria parece decir que para que algo siga moviéndose hay que seguir empujándolo: si dejas de empujar un carro, se para. Aristóteles generalizó esa observación y sostuvo que el estado «natural» de los cuerpos terrestres es el reposo. Esa idea dominó durante casi dos mil años. Galileo (siglo XVII) se fijó en lo que ocurre cuando se reduce el rozamiento: una bola que baja por un plano y sube por otro llega casi hasta la misma altura de la que partió, y cuanto más pulidos están los planos, más se acerca. En el límite ideal, una bola sobre un plano horizontal perfectamente liso <b>no se pararía nunca</b>. Lo que frena al carro no es que falte un empujón, sino que <b>hay una fuerza</b> (el rozamiento) que actúa contra el movimiento. Newton recogió esta idea y la puso como primera ley.</p>" +
    "<h5>Qué dice exactamente: ΣF = 0</h5>" +
    "<p>La primera ley no dice que «sin fuerzas no hay movimiento», sino todo lo contrario: <b>sin fuerza neta no hay cambio de movimiento</b>. Si la suma vectorial de todas las fuerzas sobre un cuerpo es cero, su velocidad (vector) no cambia: o está parado o se mueve con movimiento rectilíneo uniforme. Es lo mismo decir que la aceleración es nula. Se llama <b>equilibrio</b> a la situación en que ΣF = 0, y hay dos tipos: el <b>equilibrio estático</b> (el cuerpo está en reposo: un libro sobre una mesa) y el <b>equilibrio dinámico</b> (se mueve con velocidad constante: un coche que va a 100 km/h por una recta con el motor compensando el rozamiento y la resistencia del aire).</p>" +
    "<p>Fíjate en que «ΣF = 0» no significa «no hay fuerzas». El libro sobre la mesa soporta su peso y la normal, de 5 N cada una, y por eso está en equilibrio. Y un coche a velocidad constante tiene el motor empujando: la fuerza motriz se compensa exactamente con el rozamiento y el aire, y la suma es cero. Un error muy frecuente es creer que, si un cuerpo se mueve con velocidad constante, tiene que haber una fuerza neta «en el sentido del movimiento»: no la hay.</p>" +
    "<h5>La inercia y la masa</h5>" +
    "<p>La <b>inercia</b> es la tendencia de un cuerpo a mantener su estado de movimiento. Es una propiedad de los cuerpos, no una fuerza, y se mide con la <b>masa</b>: cuanta más masa tiene un cuerpo, más cuesta cambiar su velocidad, ya sea para acelerarlo o para frenarlo. Por eso es más difícil frenar un camión que una bicicleta aunque vayan a la misma velocidad. Los fenómenos de inercia están por todas partes: el cuerpo se va hacia delante cuando el autobús frena, el mantel se puede sacar de debajo de los platos con un tirón rápido (los platos, con su inercia, casi no se mueven), y el café se derrama al arrancar.</p>" +
    "<h5>Sistemas de referencia inerciales</h5>" +
    "<p>La primera ley sólo se cumple en ciertos sistemas de referencia, los llamados <b>sistemas inerciales</b>: aquellos en los que un cuerpo sobre el que no actúa ninguna fuerza se mueve con velocidad constante. Cualquier sistema que se mueva con velocidad constante respecto de uno inercial también lo es. La Tierra es, para los problemas de este curso, una muy buena aproximación (gira muy despacio). En cambio, un autobús que frena o que toma una curva <b>no</b> es inercial: desde dentro parece que los objetos sin fuerzas se aceleran solos (el pasajero «sale despedido» hacia delante). Para un observador en la calle no hay ningún misterio: el pasajero simplemente mantiene su velocidad (inercia) mientras el autobús frena bajo sus pies. Las «fuerzas de inercia» (centrífuga, de frenado…) son invenciones necesarias sólo cuando se insiste en describir el movimiento desde un sistema no inercial; en este curso siempre se razona desde uno inercial.</p>" +
    "<h5>Equilibrio de varias fuerzas: el cuerpo colgado</h5>" +
    "<p>Una aplicación directa de la primera ley es calcular las tensiones en un sistema en equilibrio. Se plantea ΣF<sub>x</sub> = 0 y ΣF<sub>y</sub> = 0 con las componentes. Un objeto de peso P colgado de dos cables que forman ángulos α₁ y α₂ con la horizontal cumple T₁cos α₁ = T₂cos α₂ (equilibrio horizontal) y T₁sen α₁ + T₂sen α₂ = P (equilibrio vertical). Cuando los dos cables son simétricos (α₁ = α₂ = α), T₁ = T₂ = P/(2·sen α): <b>cuanto más tumbados están los cables, más se tensan</b>, y para α → 0 la tensión tiende a infinito. Por eso un cable tendido nunca puede estar perfectamente horizontal si sostiene un peso en el centro.</p>" +
    w("f10_equilibrio") +
    ejemplo("Un cuadro colgado de dos cables", "Un cuadro de 5 kg cuelga de dos cables simétricos que forman 20° con la horizontal (g = 9,8 m/s²). ¿Qué tensión soporta cada cable?", [
      "Peso: P = 5·9,8 = 49 N.",
      "Equilibrio horizontal: T₁cos 20° = T₂cos 20° → T₁ = T₂ = T.",
      "Equilibrio vertical: 2·T·sen 20° = 49 → T = 49/(2·0,3420) = 49/0,6840",
      "<b>T = 71,6 N</b> en cada cable: ¡mayor que el peso del cuadro (49 N)! Con 90° (cables verticales) sería T = 24,5 N cada uno."
    ]) +
    ojo("la primera ley no es un caso particular de la segunda ley «porque a = 0»: es la que <b>define</b> los sistemas inerciales donde la segunda es válida. Pero en la práctica sí se usa así: ΣF = 0 ⇒ a = 0.");

  // ---------------------------------------------------------------- 3. Segunda ley
  P.secciones[2] =
    "<h5>La ley en forma vectorial: la aceleración sigue a la fuerza</h5>" +
    "<p>La segunda ley conecta lo que has visto en cinemática (Temas 8 y 9) con sus causas. Escrita con vectores, dice que la aceleración de un cuerpo tiene <b>la misma dirección y el mismo sentido que la fuerza neta</b> que actúa sobre él, y su módulo es la fuerza neta dividida entre la masa:</p>" +
    formula("ΣF⃗ = m·a⃗ &nbsp;&nbsp;⇔&nbsp;&nbsp; a⃗ = " + fr("ΣF⃗", "m")) +
    "<p>Hay un detalle de interpretación que conviene tener claro: la aceleración sigue a la <i>fuerza</i>, no a la <i>velocidad</i>. Una piedra lanzada hacia arriba sube (v hacia arriba) pero su aceleración es la de la gravedad, hacia abajo, porque la única fuerza es el peso; por eso frena. Un coche que toma una curva con rapidez constante tiene una fuerza neta (y una aceleración) dirigida hacia el centro de la curva, perpendicular a su velocidad. Cuando la fuerza neta apunta como la velocidad, el cuerpo acelera; cuando apunta en contra, frena; cuando es perpendicular, sólo gira.</p>" +
    "<h5>Qué significa «ΣF»: la suma de todas las fuerzas</h5>" +
    "<p>En la ecuación aparece la <b>suma vectorial de todas las fuerzas</b> que actúan sobre el cuerpo (no sólo la que «mueve»). Esta es la fuente de la mayor parte de los errores: los alumnos escriben F = m·a con la fuerza aplicada y se olvidan del rozamiento, de la componente de otra fuerza o de un peso. La receta es siempre la misma: dibujar el diagrama de cuerpo libre, sumar las fuerzas con su signo y entonces igualar a m·a.</p>" +
    "<h5>La ley eje por eje</h5>" +
    "<p>Como la ecuación es vectorial, equivale a una ecuación por cada eje. Eligiendo el eje x en la dirección del movimiento y el eje y perpendicular:</p>" +
    formula("ΣF<sub>x</sub> = m·a<sub>x</sub> &nbsp;&nbsp;&nbsp;&nbsp; ΣF<sub>y</sub> = m·a<sub>y</sub>") +
    "<p>En un movimiento rectilíneo sobre una superficie, a<sub>y</sub> = 0, de modo que ΣF<sub>y</sub> = 0: eso permite calcular la normal. Y el eje x da la aceleración. Esta separación es muy útil: la normal sale de las fuerzas perpendiculares al movimiento, y la aceleración, de las paralelas.</p>" +
    "<h5>Lo que de verdad mide la ley: proporcionalidad directa e inversa</h5>" +
    "<p>La segunda ley contiene dos proporcionalidades. Con la masa fija, <b>a es directamente proporcional a ΣF</b>: doble fuerza, doble aceleración (gráfica a–F: una recta que pasa por el origen y cuya pendiente es 1/m). Con la fuerza fija, <b>a es inversamente proporcional a m</b>: doble masa, mitad de aceleración (gráfica a–m: una hipérbola). Y por eso la masa se interpreta como una medida de la <b>inercia</b>: es la «resistencia» del cuerpo a ser acelerado.</p>" +
    w("f10_segunda") +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Empujar un trineo con rozamiento", "Un trineo de 25 kg se empuja horizontalmente con una fuerza de 60 N sobre nieve que ejerce un rozamiento de 15 N. Calcula la aceleración.", [
      "Fuerzas horizontales: F = 60 N hacia delante y F<sub>r</sub> = 15 N hacia atrás. Verticales: peso y normal (se anulan).",
      "ΣF<sub>x</sub> = F − F<sub>r</sub> = 60 − 15 = 45 N.",
      "a = ΣF/m = 45/25 = <b>1,8 m/s²</b>."
    ]) +
    ejemplo("Del frenado a la fuerza (cinemática + dinámica)", "Un coche de 1000 kg que circula a 72 km/h se detiene en 8 s con fuerza constante. Calcula la fuerza de frenado y la distancia recorrida.", [
      "72 km/h = 20 m/s. Aceleración: a = (0 − 20)/8 = −2,5 m/s² (frena).",
      "Fuerza neta: ΣF = m·a = 1000·(−2,5) = <b>−2500 N</b> (módulo 2500 N, contra la velocidad).",
      "Distancia: s = v₀t + ½at² = 20·8 − ½·2,5·64 = 160 − 80 = <b>80 m</b>."
    ]) +
    ejemplo("Fuerza oblicua: aceleración y normal", "Se tira de una caja de 5 kg, sobre un suelo sin rozamiento, con una fuerza de 20 N que forma 30° con la horizontal. Calcula la aceleración y la fuerza normal (g = 9,8 m/s²).", [
      "Descomposición: F<sub>x</sub> = 20·cos 30° = 17,32 N; F<sub>y</sub> = 20·sen 30° = 10 N (hacia arriba).",
      "Eje x: ΣF<sub>x</sub> = F<sub>x</sub> = m·a → a = 17,32/5 = <b>3,46 m/s²</b>.",
      "Eje y (no hay movimiento vertical): N + F<sub>y</sub> − P = 0 → N = 49 − 10 = <b>39 N</b>. La normal es menor que el peso porque la cuerda levanta parcialmente la caja."
    ]) +
    "<h5>Dos problemas en uno: de la fuerza al movimiento y del movimiento a la fuerza</h5>" +
    "<p>La segunda ley es el puente entre dinámica y cinemática, y casi todos los problemas pasan por él en uno de los dos sentidos. Si se conocen las fuerzas, se calcula la aceleración (ΣF/m) y con las ecuaciones del MRUA (Tema 8) se obtiene cuánto tarda, qué velocidad alcanza o cuánto recorre. Si, por el contrario, se conoce el movimiento (una frenada, una subida), se obtiene la aceleración a partir de las ecuaciones cinemáticas y con ella la fuerza neta (m·a). La aceleración es el eslabón común:</p>" +
    tabla(["Datos", "Primer paso", "Segundo paso", "Resultado"], [
      ["fuerzas y masa", "a = ΣF/m (dinámica)", "v = v₀ + a·t · s = v₀t + ½at² · v² = v₀² + 2as (cinemática)", "tiempo, velocidad, distancia"],
      ["movimiento (v, t, s)", "a de las ecuaciones del MRUA", "ΣF = m·a (dinámica)", "fuerza neta; una fuerza desconocida"]
    ]) +
    w("f10_leer") +
    "<h5>La forma general de la segunda ley: ΣF = Δp/Δt</h5>" +
    "<p>Newton no escribió F = m·a, sino que la fuerza es igual a la rapidez con que cambia la <b>cantidad de movimiento</b> o momento lineal p = m·v: ΣF = Δp/Δt. Cuando la masa es constante, Δp = m·Δv y se recupera F = m·a. Pero la forma general sirve también cuando la masa cambia (un cohete que quema combustible) y es la que permite estudiar choques y explosiones, como se hace más adelante en este tema.</p>" +
    ojo("la segunda ley no dice que «la fuerza es proporcional a la velocidad». Si un cuerpo se mueve con velocidad constante, la fuerza neta es <b>cero</b>, aunque la velocidad sea enorme.");
})(window);
