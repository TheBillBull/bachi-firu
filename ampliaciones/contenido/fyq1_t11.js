/* ============================================================
   Física y Química I · ampliaciones · Tema 11: Gravitación
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "fyq1/t11/" + ref); }

  var resumen = [
    "<b>Ley de gravitación universal</b>: dos masas se atraen con una fuerza central F = G·m₁·m₂/r² (G = 6,674·10⁻¹¹ N·m²/kg²), igual y opuesta en cada una (3.ª ley de Newton). Disminuye con el cuadrado de la distancia entre <b>centros</b>.",
    "<b>Campo gravitatorio</b>: g = GM/r² (N/kg = m/s²), dirigido hacia el centro. En la superficie terrestre g₀ ≈ 9,82 m/s²; a la altura h vale GM/(R + h)². Varios cuerpos: se suman vectorialmente (superposición).",
    "<b>Kepler</b>: 1.ª órbitas elípticas con el Sol en un foco · 2.ª áreas iguales en tiempos iguales (conservación del momento angular: v<sub>p</sub>·r<sub>p</sub> = v<sub>a</sub>·r<sub>a</sub>) · 3.ª T² = 4π²a³/(GM) = k·a³.",
    "<b>Energía potencial</b> E<sub>p</sub> = −GMm/r (cero en el infinito) y potencial V = −GM/r. Cerca de la superficie, ΔE<sub>p</sub> ≈ mgh.",
    "<b>Órbita circular</b>: v = √(GM/r), T = 2π√(r³/GM), E<sub>c</sub> = GMm/2r, E<sub>m</sub> = −GMm/2r = E<sub>p</sub>/2 (ligado: E &lt; 0).",
    "<b>Velocidad de escape</b>: v<sub>e</sub> = √(2GM/R) = √2·v<sub>orbital rasante</sub> (E<sub>m</sub> = 0). Tierra: 11,19 km/s."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Ley de gravitación universal
  secciones[0] =
    "<h5>Qué dice exactamente la ley</h5>" +
    "<p>La ley de gravitación universal reúne cuatro ideas en una sola fórmula. (1) La fuerza es <b>siempre atractiva</b>: nunca repele. (2) Es <b>proporcional a las dos masas</b>: si una masa se duplica, la fuerza se duplica; si se duplican las dos, se cuadruplica. (3) Es <b>inversamente proporcional al cuadrado de la distancia</b>: si la distancia se duplica, la fuerza se divide entre 4; si se triplica, entre 9. (4) Es una <b>fuerza central</b>: actúa a lo largo de la recta que une los centros de las dos masas.</p>" +
    formula("F = G·" + fr("m₁·m₂", "r²")) +
    "<p>En forma vectorial, para la fuerza que la masa 2 ejerce sobre la masa 1: <b>F⃗₁₂ = −G·(m₁m₂/r²)·û₁₂</b>, donde û₁₂ es el vector unitario que va de 1 hacia 2 (el signo menos indica que la fuerza sobre 1 apunta <i>hacia</i> 2). Por la <b>tercera ley de Newton</b> (Tema 10), la fuerza que 1 ejerce sobre 2 es exactamente la opuesta: F⃗₂₁ = −F⃗₁₂. Las dos fuerzas tienen el <b>mismo módulo</b>, aunque las aceleraciones sean muy distintas: a = F/m es grande para la masa pequeña y minúscula para la grande.</p>" +
    "<h5>Los datos que se usan en todo el tema</h5>" +
    tabla(["Magnitud", "Valor", "Símbolo"], [
      ["Constante de gravitación universal", "6,674·10⁻¹¹ N·m²/kg²", "G"],
      ["Masa de la Tierra · radio medio", "5,972·10²⁴ kg · 6,371·10⁶ m", "M<sub>T</sub> · R<sub>T</sub>"],
      ["Producto G·M<sub>T</sub> (parámetro gravitatorio)", "3,986·10¹⁴ m³/s²", "GM<sub>T</sub>"],
      ["Masa de la Luna · radio", "7,342·10²² kg · 1,737·10⁶ m", "M<sub>L</sub> · R<sub>L</sub>"],
      ["Distancia media Tierra–Luna", "3,844·10⁸ m", "d<sub>TL</sub>"],
      ["Masa del Sol · radio", "1,989·10³⁰ kg · 6,957·10⁸ m", "M<sub>☉</sub> · R<sub>☉</sub>"],
      ["Distancia media Tierra–Sol (1 unidad astronómica)", "1,496·10¹¹ m", "1 UA"],
      ["Gravedad en la superficie terrestre", "g₀ = GM<sub>T</sub>/R<sub>T</sub>² = 9,82 m/s² (valor medido: 9,81)", "g₀"],
      ["Velocidad de la luz", "2,998·10⁸ m/s", "c"]
    ]) +
    "<p>Los ejercicios del tema indican los datos que necesitan; si no dicen otra cosa, se usan estos. Recuerda que <b>r es la distancia entre los centros</b> de las masas, no entre las superficies: para un objeto a 400 km de altura sobre la Tierra, r = 6371 + 400 = 6771 km.</p>" +
    "<h5>Órdenes de magnitud: por qué sólo notamos la gravedad de cuerpos enormes</h5>" +
    tabla(["Situación", "Masas", "Distancia", "Fuerza"], [
      ["Dos personas", "70 kg y 70 kg", "1 m", "3,3·10⁻⁷ N"],
      ["Persona y Tierra (el peso)", "70 kg y 5,97·10²⁴ kg", "6,371·10⁶ m", "687 N"],
      ["Tierra y Luna", "5,97·10²⁴ kg y 7,34·10²² kg", "3,844·10⁸ m", "1,98·10²⁰ N"],
      ["Sol y Tierra", "1,99·10³⁰ kg y 5,97·10²⁴ kg", "1,496·10¹¹ m", "3,54·10²² N"]
    ]) +
    "<p>La fuerza entre dos personas a un metro (0,33 micronewton) es unas <b>dos mil millones de veces menor</b> que el peso de una persona. G es una constante diminuta, y sólo cuando una de las masas es del tamaño de un planeta la atracción se vuelve apreciable. Experimenta con masas y distancias:</p>" +
    w("f11_fuerza") +
    "<h5>Ejemplos resueltos</h5>" +
    ejemplo("Atracción entre dos masas", "Calcula la fuerza gravitatoria entre dos masas de 50 kg y 80 kg separadas 2 m.", [
      "F = G·m₁·m₂/r² = 6,674·10⁻¹¹·50·80/2² ",
      "= 6,674·10⁻¹¹·4000/4 = 6,674·10⁻¹¹·1000",
      "<b>F = 6,674·10⁻⁸ N</b> (mil veces menor que el peso de un grano de arena)"
    ]) +
    ejemplo("La fuerza Tierra–Luna y las aceleraciones", "Calcula la fuerza con que se atraen la Tierra y la Luna y la aceleración que cada una adquiere.", [
      "F = G·M<sub>T</sub>·M<sub>L</sub>/d² = 6,674·10⁻¹¹·5,972·10²⁴·7,342·10²²/(3,844·10⁸)² = <b>1,98·10²⁰ N</b>",
      "Aceleración de la Luna: a<sub>L</sub> = F/M<sub>L</sub> = 1,98·10²⁰/7,342·10²² = <b>2,70·10⁻³ m/s²</b> (es la aceleración centrípeta que la mantiene en órbita)",
      "Aceleración de la Tierra: a<sub>T</sub> = F/M<sub>T</sub> = 1,98·10²⁰/5,972·10²⁴ = <b>3,32·10⁻⁵ m/s²</b>, unas 81 veces menor (la masa terrestre es 81 veces mayor)",
      "La fuerza es la misma en módulo para las dos; lo que cambia es la aceleración, porque la masa es distinta."
    ]) +
    ejemplo("Cambiar la distancia", "Dos cuerpos se atraen con una fuerza de 360 N. ¿Con qué fuerza se atraerán si se duplica la distancia? ¿Y si se reduce a la tercera parte?", [
      "F ∝ 1/r². Si r pasa a 2r: F′ = F/2² = 360/4 = <b>90 N</b>.",
      "Si r pasa a r/3: F′ = F/(1/3)² = 9F = 9·360 = <b>3240 N</b>.",
      "No hace falta conocer las masas ni G: basta con razonar con la proporcionalidad."
    ]) +
    "<h5>La constante G y el experimento de Cavendish</h5>" +
    "<p>Newton publicó la ley en 1687, pero no pudo dar el valor de G, porque nadie sabía medir la fuerza entre dos masas pequeñas. En 1798, Henry Cavendish lo consiguió con una <b>balanza de torsión</b>: dos bolas de plomo pequeñas colgadas de una barra ligera sujeta por un hilo muy fino; al acercarles dos bolas grandes, la atracción gravitatoria hacía girar la barra un ángulo minúsculo, que se medía con un haz de luz. Conociendo la torsión del hilo y las masas se obtenía G. Con G se podía por fin «pesar la Tierra»: de g = GM/R² resulta M = gR²/G = 9,81·(6,371·10⁶)²/6,674·10⁻¹¹ = 5,97·10²⁴ kg. Por eso se dice que Cavendish «pesó la Tierra».</p>" +
    "<h5>Principio de superposición</h5>" +
    "<p>Cuando una masa interacciona con varias, la fuerza total es la <b>suma vectorial</b> de las fuerzas que cada una ejerce, como si las demás no existieran. La gravedad no se «apantalla»: la presencia de una tercera masa no cambia la atracción entre las otras dos.</p>" +
    ejemplo("Tres masas en línea", "Una masa m = 2 kg está entre dos masas de 10 kg situadas a 1 m a cada lado. ¿Qué fuerza total actúa sobre m? ¿Y si está a 1 m de una de 10 kg y a 2 m de la otra?", [
      "Caso simétrico: las dos fuerzas tienen el mismo módulo, F = G·2·10/1² = 1,335·10⁻⁹ N, y sentidos opuestos: <b>F total = 0</b>.",
      "Caso asimétrico: F₁ = G·2·10/1² = 1,335·10⁻⁹ N (hacia la masa cercana) y F₂ = G·2·10/2² = 3,34·10⁻¹⁰ N (en sentido contrario).",
      "Resultante: 1,335·10⁻⁹ − 3,34·10⁻¹⁰ = <b>1,0·10⁻⁹ N</b> hacia la masa más cercana."
    ]) +
    "<h5>Esferas: el teorema de las capas de Newton</h5>" +
    "<p>La ley está formulada para masas puntuales, pero se usa con planetas y estrellas. Newton demostró que <b>una distribución esférica de masa atrae a un cuerpo exterior como si toda su masa estuviera concentrada en su centro</b>. Por eso la distancia que va en la fórmula es siempre la que separa los centros. (Y por eso la ley sirve, en este tema, con la Tierra, la Luna o el Sol.)</p>" +
    "<h5>Masa y peso: no son lo mismo</h5>" +
    "<p>La <b>masa</b> es la cantidad de materia (kg) y no cambia de un lugar a otro. El <b>peso</b> es la fuerza gravitatoria que un cuerpo celeste ejerce sobre el objeto: P = m·g, con g el valor del campo en ese punto. Una persona de 60 kg pesa 589 N en la Tierra, 97,4 N en la Luna y 0 N (prácticamente) muy lejos de todo; su masa es siempre 60 kg.</p>" +
    ojo("tres errores muy comunes: (1) usar la distancia entre superficies en vez de entre centros; (2) pensar que la fuerza sobre la masa pequeña es menor que sobre la grande (son <i>iguales</i>); (3) escribir 1/r en vez de 1/r² (la fuerza no baja a la mitad al duplicar la distancia, sino a la cuarta parte).");

  // ---------------------------------------------------------------- 2. Campo gravitatorio
  secciones[1] =
    "<h5>Qué es un campo</h5>" +
    "<p>Un <b>campo</b> es una propiedad del espacio: a cada punto se le asigna una magnitud. Una masa M modifica el espacio que la rodea, de modo que cualquier otra masa colocada en un punto P siente una fuerza. En lugar de hablar de «fuerzas entre pares de masas», se asigna a cada punto un vector, la <b>intensidad del campo gravitatorio</b> g⃗, que indica la fuerza que sentiría <i>cada kilogramo</i> colocado en ese punto:</p>" +
    formula("g⃗ = " + fr("F⃗", "m") + " = −" + fr("G·M", "r²") + "·û<sub>r</sub>") +
    "<ul><li><b>Unidades</b>: N/kg, que es lo mismo que m/s². El campo gravitatorio es una aceleración: es la aceleración con que cae un objeto abandonado en ese punto si no hay otra fuerza.</li>" +
    "<li><b>Dirección y sentido</b>: radial y hacia el centro de la masa que crea el campo (el signo menos).</li>" +
    "<li><b>Módulo</b>: g = GM/r². Sólo depende de la masa que crea el campo y de la distancia a su centro, <b>no de la masa de prueba</b>.</li></ul>" +
    "<p>Se representa con <b>líneas de campo</b>: curvas tangentes en cada punto al vector g⃗. Para una masa esférica son rectas que convergen en el centro; están más juntas donde el campo es más intenso. Cerca de la superficie, en una región pequeña, las líneas son prácticamente paralelas: el campo es <b>uniforme</b> (g constante), que es la aproximación que usas en cinemática y dinámica.</p>" +
    "<h5>g en la superficie y a distintas alturas</h5>" +
    "<p>En la superficie de un cuerpo de masa M y radio R: <b>g₀ = GM/R²</b>. A la altura h sobre la superficie (distancia al centro R + h):</p>" +
    formula("g(h) = " + fr("G·M", "(R + h)²") + " = g₀·" + fr("R²", "(R + h)²")) +
    tabla(["Altura h sobre la Tierra", "r = R + h", "g (m/s²)", "% de g₀"], [
      ["0 (superficie)", "1 R", "9,82", "100 %"],
      ["400 km (ISS)", "1,063 R", "8,69", "88,5 %"],
      ["0,5 R = 3186 km", "1,5 R", "4,36", "44,4 %"],
      ["1 R = 6371 km", "2 R", "2,45", "25 %"],
      ["2 R = 12 742 km", "3 R", "1,09", "11,1 %"],
      ["3 R", "4 R", "0,614", "6,25 %"],
      ["Órbita de la Luna", "60,3 R", "0,00270", "0,027 %"]
    ]) +
    "<p>Observa cómo cambia: a una altura igual al radio terrestre, g baja a la <b>cuarta parte</b>; a 2R, a la novena parte. Ni siquiera a la altura de la ISS la gravedad desaparece: allí es todavía el 88 % de la de la superficie. Explora la gráfica, con distintos cuerpos:</p>" +
    w("f11_campo") +
    ejemplo("Gravedad a gran altura", "¿A qué altura sobre la superficie de la Tierra el valor de g es la novena parte del de la superficie?", [
      "g = g₀/9 → R²/(R + h)² = 1/9 → (R + h)/R = 3 → R + h = 3R",
      "<b>h = 2R = 12 742 km</b> (r = 3R, y por tanto g = g₀/3² = g₀/9)."
    ]) +
    "<h5>Otros mundos: g depende de la masa y del radio</h5>" +
    tabla(["Cuerpo", "M (kg)", "R (m)", "g₀ = GM/R² (m/s²)", "Peso de 60 kg (N)"], [
      ["Mercurio", "3,30·10²³", "2,44·10⁶", "3,70", "222"],
      ["Venus", "4,87·10²⁴", "6,05·10⁶", "8,87", "532"],
      ["Tierra", "5,97·10²⁴", "6,37·10⁶", "9,82", "589"],
      ["Luna", "7,34·10²²", "1,74·10⁶", "1,62", "97,4"],
      ["Marte", "6,42·10²³", "3,39·10⁶", "3,73", "224"],
      ["Júpiter", "1,90·10²⁷", "6,99·10⁷", "25,9", "1555"],
      ["Sol", "1,99·10³⁰", "6,96·10⁸", "274", "16 456"]
    ]) +
    "<p>Fíjate en que g depende de M/R². Júpiter tiene 318 veces la masa de la Tierra y sólo 2,6 veces su g, porque su radio es 11 veces mayor: la masa crece 318 veces, pero R² crece unas 120 veces. Saturno, 95 veces más masivo que la Tierra, tiene una gravedad superficial parecida (11,2 m/s²) por ser enorme y poco denso. Compara cualquier magnitud entre cuerpos:</p>" +
    w("f11_planetas") +
    ejemplo("Pesar un planeta a partir de g y R", "En la superficie de un planeta de radio 3,39·10⁶ m, un objeto cae con una aceleración de 3,73 m/s². Calcula la masa del planeta.", [
      "g₀ = GM/R² → M = g₀·R²/G",
      "M = 3,73·(3,39·10⁶)²/(6,674·10⁻¹¹) = 3,73·1,149·10¹³/6,674·10⁻¹¹",
      "<b>M = 6,42·10²³ kg</b> (son los datos de Marte)."
    ]) +
    "<h5>Superposición de campos y el punto neutro</h5>" +
    "<p>Si hay varias masas, el campo en un punto es la <b>suma vectorial</b> de los campos de cada una: g⃗ = g⃗₁ + g⃗₂ + … Entre dos cuerpos hay un punto donde los dos campos tienen el mismo módulo y sentidos opuestos: allí el campo total se anula (<b>punto neutro</b> o de equilibrio gravitatorio). Para dos masas M₁ y M₂ separadas una distancia d, el punto neutro está a una distancia x de M₁ que cumple GM₁/x² = GM₂/(d − x)², es decir:</p>" +
    formula("x = " + fr("d", "1 + √(M₂/M₁)")) +
    ejemplo("El punto neutro Tierra–Luna", "¿A qué distancia de la Tierra el campo gravitatorio total de la Tierra y la Luna es nulo?", [
      "M<sub>L</sub>/M<sub>T</sub> = 7,342·10²²/5,972·10²⁴ = 0,01229 → √ = 0,1109",
      "x = d/(1 + 0,1109) = 3,844·10⁸/1,1109 = <b>3,46·10⁸ m</b>, es decir, a unos 346 000 km de la Tierra (90 % del camino) y a 38 400 km de la Luna.",
      "Una nave que pase por ese punto «se cae» hacia la Luna: a partir de él manda el campo lunar."
    ]) +
    w("f11_neutro") +
    ojo("el campo gravitatorio es un <b>vector</b>: para sumarlo hay que tener en cuenta su dirección y sentido. Una suma de módulos sólo es válida si los campos son paralelos y del mismo sentido. Tampoco hay campo de «cero» en la superficie de un planeta ni a la altura de la ISS: el campo sólo se anula en el punto neutro entre dos masas.");

  // ---------------------------------------------------------------- 3. Kepler
  secciones[2] =
    "<h5>La primera ley con precisión: la elipse</h5>" +
    "<p>Una <b>elipse</b> es el conjunto de puntos cuya suma de distancias a dos puntos fijos (los <b>focos</b>) es constante. Se describe con el <b>semieje mayor a</b>, el <b>semieje menor b</b> y la <b>excentricidad</b> e = c/a, donde c es la distancia del centro a cada foco (b² = a² − c²). Con e = 0 la elipse es una circunferencia; cuanto más cerca de 1, más alargada.</p>" +
    "<ul><li>El Sol ocupa un foco. El punto más cercano al Sol se llama <b>perihelio</b>: r<sub>p</sub> = a(1 − e). El más lejano, <b>afelio</b>: r<sub>a</sub> = a(1 + e).</li>" +
    "<li>Se cumple r<sub>p</sub> + r<sub>a</sub> = 2a, de modo que el semieje mayor es la distancia media entre el perihelio y el afelio.</li></ul>" +
    tabla(["Planeta", "a (UA)", "Excentricidad e", "Perihelio (UA)", "Afelio (UA)"], [
      ["Mercurio", "0,387", "0,206", "0,307", "0,467"],
      ["Venus", "0,723", "0,0068", "0,718", "0,728"],
      ["Tierra", "1,000", "0,0167", "0,983", "1,017"],
      ["Marte", "1,524", "0,0934", "1,381", "1,666"],
      ["Júpiter", "5,204", "0,0484", "4,952", "5,456"]
    ]) +
    "<p>Las órbitas de casi todos los planetas son <b>muy poco excéntricas</b>: la de la Tierra es una elipse casi circular (r<sub>p</sub> = 1,471·10¹¹ m, r<sub>a</sub> = 1,521·10¹¹ m: sólo un 3 % de diferencia). Los dibujos de libros exageran la excentricidad. Los <b>cometas</b> sí tienen órbitas muy alargadas: el cometa Halley tiene e = 0,967. Mueve los deslizadores de esta simulación y observa cómo cambia la forma:</p>" +
    w("f11_orbita") +
    "<h5>La segunda ley: velocidad areolar y momento angular</h5>" +
    "<p>El segmento que une el Sol con el planeta (el <b>radio vector</b>) barre áreas iguales en tiempos iguales. Es decir, la <b>velocidad areolar</b> dA/dt es constante. Una consecuencia directa: el planeta va más deprisa cuando está más cerca del Sol (perihelio) y más despacio cuando está más lejos (afelio). Como la fuerza gravitatoria es <b>central</b> (siempre apunta al Sol), su momento respecto del Sol es cero y el <b>momento angular L = m·r·v·sen θ se conserva</b>; la velocidad areolar vale dA/dt = L/(2m). En el perihelio y en el afelio la velocidad es perpendicular al radio vector (sen θ = 1), de modo que:</p>" +
    formula("r<sub>p</sub>·v<sub>p</sub> = r<sub>a</sub>·v<sub>a</sub>   ⟹   " + fr("v<sub>p</sub>", "v<sub>a</sub>") + " = " + fr("r<sub>a</sub>", "r<sub>p</sub>") + " = " + fr("1 + e", "1 − e")) +
    ejemplo("Velocidad de la Tierra en el perihelio", "En el afelio (r<sub>a</sub> = 1,521·10¹¹ m) la Tierra se mueve a 29,29 km/s. ¿Cuál es su velocidad en el perihelio (r<sub>p</sub> = 1,471·10¹¹ m)?", [
      "Conservación del momento angular: r<sub>p</sub>·v<sub>p</sub> = r<sub>a</sub>·v<sub>a</sub>",
      "v<sub>p</sub> = v<sub>a</sub>·r<sub>a</sub>/r<sub>p</sub> = 29,29·1,521/1,471 = <b>30,29 km/s</b>",
      "La Tierra va un 3,4 % más rápido en enero (perihelio) que en julio (afelio)."
    ]) +
    ejemplo("El cometa Halley", "El cometa Halley pasa a 0,586 UA del Sol en el perihelio y a 35,1 UA en el afelio. Halla su semieje mayor, su periodo y el cociente de velocidades v<sub>p</sub>/v<sub>a</sub>.", [
      "Semieje mayor: a = (r<sub>p</sub> + r<sub>a</sub>)/2 = (0,586 + 35,1)/2 = <b>17,84 UA</b>",
      "Tercera ley (UA y años): T² = a³ → T = 17,84<sup>3/2</sup> = <b>75,4 años</b> (el valor real es 75,3 años)",
      "v<sub>p</sub>/v<sub>a</sub> = r<sub>a</sub>/r<sub>p</sub> = 35,1/0,586 = <b>59,9</b>: en el perihelio va casi 60 veces más rápido que en el afelio."
    ]) +
    "<h5>La tercera ley y su deducción para órbitas circulares</h5>" +
    "<p>Kepler la encontró con datos de Tycho Brahe: <b>T² = k·a³</b>, con la misma k para todos los planetas. Newton la deduce de su ley de gravitación. Para una órbita circular de radio r, la fuerza gravitatoria hace de fuerza centripeta (Tema 9):</p>" +
    formula(fr("G·M·m", "r²") + " = m·ω²·r = m·" + fr("4π²", "T²") + "·r   ⟹   T² = " + fr("4π²", "G·M") + "·r³") +
    "<p>Para órbitas elípticas, r se sustituye por el semieje mayor a. Observa tres cosas: (1) la constante k = 4π²/(GM) depende de la <b>masa del cuerpo central</b>, no de la del planeta (que se cancela); (2) cada sistema tiene su propia constante: para el Sol, k = 2,97·10⁻¹⁹ s²/m³ = 1 año²/UA³; para la Tierra, k′ = 4π²/(GM<sub>T</sub>) = 9,9·10⁻¹⁴ s²/m³; (3) permite <b>calcular masas</b> de cuerpos centrales observando a un satélite.</p>" +
    tabla(["Planeta", "a (UA)", "T (años)", "T²/a³ (años²/UA³)"], [
      ["Mercurio", "0,3871", "0,2408", "0,9996"], ["Venus", "0,7233", "0,6152", "1,0001"], ["Tierra", "1,0000", "1,0000", "1,0000"], ["Marte", "1,5237", "1,8808", "1,0000"],
      ["Júpiter", "5,2043", "11,862", "0,9982"], ["Saturno", "9,5822", "29,457", "0,9862"], ["Urano", "19,189", "84,011", "0,9989"], ["Neptuno", "30,070", "164,79", "0,9988"]
    ]) +
    "<p>Los ocho cocientes valen 1 (con pequeñas desviaciones debidas a la masa de los planetas, que Kepler no podía conocer): la ley se cumple desde Mercurio hasta Neptuno. En escala logarítmica, la ley T² ∝ a³ es una recta de pendiente 3/2. Compruébalo con los datos reales, y mira cómo se usa en las lunas de Júpiter:</p>" +
    w("f11_kepler3") +
    ejemplo("Comparar dos órbitas con la razón de radios", "Un asteroide gira alrededor del Sol a 4 UA. ¿Cuál es su periodo?", [
      "T² ∝ a³: (T/T<sub>T</sub>)² = (a/a<sub>T</sub>)³ → T² = 4³ = 64 años²",
      "<b>T = 8 años</b>. Se resuelve sin G ni M: basta con comparar con la Tierra (1 UA, 1 año)."
    ]) +
    ejemplo("Pesar el Sol", "Con T = 1 año = 3,156·10⁷ s y a = 1,496·10¹¹ m para la Tierra, calcula la masa del Sol.", [
      "M = 4π²a³/(G·T²) = 4π²·(1,496·10¹¹)³/(6,674·10⁻¹¹·(3,156·10⁷)²)",
      "(1,496·10¹¹)³ = 3,348·10³³ → numerador: 39,48·3,348·10³³ = 1,322·10³⁵; denominador: 6,674·10⁻¹¹·9,961·10¹⁴ = 6,648·10⁴",
      "<b>M<sub>☉</sub> = 1,988·10³⁰ kg</b>: la masa del Sol sale de la órbita de la Tierra."
    ]);

  // ---------------------------------------------------------------- 4. Energía potencial
  secciones[3] =
    "<h5>Por qué hace falta una fórmula nueva: g no es constante</h5>" +
    "<p>La fórmula E<sub>p</sub> = mgh (Tema 12) supone que g no cambia, algo cierto sólo si la altura es pequeña frente al radio del planeta. Para alturas grandes (satélites, cohetes, el sistema Tierra–Luna), hay que usar la fuerza real F = GMm/r², que disminuye con la distancia. El trabajo de una fuerza variable se calcula sumando los trabajos en tramos muy pequeños (es el área bajo la curva F–r); el resultado, al llevar una masa m desde r₁ hasta r₂ en contra de la gravedad, es:</p>" +
    formula("W<sub>externo</sub> = ΔE<sub>p</sub> = GMm·(" + fr("1", "r₁") + " − " + fr("1", "r₂") + ")") +
    "<p>Esta diferencia es la misma sea cual sea el camino que se siga: la gravedad es una <b>fuerza conservativa</b> (el trabajo sólo depende de las posiciones inicial y final, y es nulo en un camino cerrado). Por eso se puede definir una energía potencial. Se elige el origen donde nunca hay interacción, en el infinito: E<sub>p</sub>(∞) = 0. Con ese convenio:</p>" +
    formula("E<sub>p</sub> = −" + fr("G·M·m", "r")) +
    "<ul><li>E<sub>p</sub> es <b>negativa</b> en todo punto, porque desde el infinito (E<sub>p</sub> = 0) la gravedad atractiva libera energía al acercarse. Cuanto más cerca, más negativa (menor).</li>" +
    "<li>El valor absoluto, GMm/r, es la <b>energía de ligadura</b> del sistema: lo que hay que aportarle para separar las masas hasta el infinito.</li>" +
    "<li>Para que una masa se aleje (aumente r) hay que realizar trabajo en contra del campo: E<sub>p</sub> aumenta (se hace menos negativa).</li></ul>" +
    "<p>Dividiendo por la masa de prueba se obtiene el <b>potencial gravitatorio</b> V = E<sub>p</sub>/m = −GM/r, medido en J/kg (= m²/s²). Las <b>superficies equipotenciales</b> (V = constante) son esferas concéntricas con la masa, y el campo es siempre perpendicular a ellas y apunta hacia donde el potencial disminuye.</p>" +
    "<h5>Relación con E<sub>p</sub> = mgh</h5>" +
    "<p>Si h es mucho menor que R: E<sub>p</sub>(R + h) − E<sub>p</sub>(R) = GMm(1/R − 1/(R + h)) = GMm·h/(R(R + h)) ≈ GMm·h/R² = m·g₀·h. La fórmula simplificada es una buena aproximación, pero deja de serlo al subir mucho:</p>" +
    tabla(["h sobre la Tierra", "ΔE<sub>p</sub> exacta por kg (J/kg)", "g₀·h (J/kg)", "Error de mgh"], [
      ["1 km", "9 818", "9 820", "0,016 %"], ["100 km", "9,668·10⁵", "9,820·10⁵", "1,6 %"], ["400 km", "3,696·10⁶", "3,928·10⁶", "6,3 %"], ["R = 6371 km", "3,128·10⁷", "6,256·10⁷", "100 % (el doble)"]
    ]) +
    ejemplo("Energía para elevar un satélite", "¿Qué energía hay que comunicar a un objeto de 1000 kg para elevarlo desde la superficie terrestre hasta 400 km de altura (sin darle velocidad)? Compárala con mgh.", [
      "ΔE<sub>p</sub> = GM<sub>T</sub>m·(1/R − 1/(R + h)) = 3,986·10¹⁴·1000·(1/6,371·10⁶ − 1/6,771·10⁶)",
      "= 3,986·10¹⁷·(1,5696·10⁻⁷ − 1,4769·10⁻⁷) = <b>3,70·10⁹ J</b>",
      "Con mgh = 9,82·1000·4·10⁵ = 3,93·10⁹ J: el error es de un 6 %. A mayor altura la diferencia crece."
    ]) +
    "<h5>Energía mecánica y órbitas</h5>" +
    "<p>Para un satélite de masa m que gira en una órbita circular de radio r (con v = √(GM/r), ver el apartado siguiente):</p>" +
    formula("E<sub>c</sub> = " + fr("1", "2") + "mv² = " + fr("G·M·m", "2r") + " ,   E<sub>p</sub> = −" + fr("G·M·m", "r") + " ,   E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = −" + fr("G·M·m", "2r")) +
    "<p>Fíjate en las relaciones: <b>E<sub>c</sub> = −E<sub>m</sub></b> y <b>E<sub>p</sub> = 2E<sub>m</sub></b>. La energía mecánica es <b>negativa</b>: el satélite está <i>ligado</i> al planeta; cuanto mayor es la órbita (r mayor), menos negativa (más energía). Una órbita con E<sub>m</sub> &lt; 0 es cerrada (círculo o elipse); con E<sub>m</sub> = 0, la trayectoria es una parábola (justo escapa), y con E<sub>m</sub> &gt; 0, una hipérbola (escapa con velocidad sobrante).</p>" +
    ejemplo("Energía de un satélite", "Un satélite de 500 kg orbita a 600 km sobre la superficie terrestre. Calcula su energía mecánica y la energía que hubo que aportarle desde la superficie (en reposo) para colocarlo allí.", [
      "r = R + h = 6,371·10⁶ + 6·10⁵ = 6,971·10⁶ m",
      "E<sub>m</sub> = −GMm/(2r) = −3,986·10¹⁴·500/(2·6,971·10⁶) = <b>−1,429·10¹⁰ J</b>",
      "E<sub>m</sub> en la superficie (parado, ignorando la rotación): E<sub>p</sub>(R) = −GMm/R = −3,128·10¹⁰ J",
      "Energía necesaria: ΔE = −1,429·10¹⁰ − (−3,128·10¹⁰) = <b>1,70·10¹⁰ J</b> (4,7 MWh: más que el consumo eléctrico de un año de un hogar medio)."
    ]) +
    "<h5>Velocidad de escape</h5>" +
    "<p>La <b>velocidad de escape</b> es la velocidad mínima con la que hay que lanzar un objeto desde la superficie para que se aleje indefinidamente (llegue al infinito con velocidad cero). Se obtiene imponiendo E<sub>m</sub> = 0:</p>" +
    formula(fr("1", "2") + "mv<sub>e</sub>² − " + fr("G·M·m", "R") + " = 0   ⟹   v<sub>e</sub> = " + raiz(fr("2·G·M", "R"))) +
    "<p>No depende de la masa del objeto, ni de la dirección del lanzamiento (si se desprecia el rozamiento de la atmósfera y la rotación). Comparada con la velocidad orbital a ras de superficie v<sub>o</sub> = √(GM/R): <b>v<sub>e</sub> = √2·v<sub>o</sub></b> ≈ 1,414·v<sub>o</sub>.</p>" +
    tabla(["Cuerpo", "Velocidad de escape", "Comentario"], [
      ["Luna", "2,38 km/s", "no retiene atmósfera"], ["Mercurio", "4,25 km/s", ""], ["Marte", "5,03 km/s", "atmósfera muy tenue"], ["Venus", "10,36 km/s", ""], ["Tierra", "11,19 km/s", "40 270 km/h"], ["Júpiter", "60,2 km/s", ""], ["Sol", "617,8 km/s", ""]
    ]) +
    ejemplo("Lanzamiento vertical: hasta dónde llega", "Se lanza un objeto verticalmente desde la superficie de la Tierra con una velocidad de 8 km/s. Calcula la altura máxima que alcanza (sin atmósfera).", [
      "Energía mecánica por unidad de masa: e = ½v₀² − GM/R = ½·(8000)² − 3,986·10¹⁴/6,371·10⁶ = 3,2·10⁷ − 6,256·10⁷ = −3,056·10⁷ J/kg (negativa: ligado).",
      "En el punto más alto v = 0: −GM/r<sub>máx</sub> = e → r<sub>máx</sub> = GM/(−e) = 3,986·10¹⁴/3,056·10⁷ = 1,304·10⁷ m.",
      "Altura: h = r<sub>máx</sub> − R = 1,304·10⁷ − 6,371·10⁶ = <b>6,67·10⁶ m</b> (6670 km).",
      "Con la fórmula «de cerca de la superficie», h = v₀²/2g = 3,3·10⁶ m: <b>la mitad</b> del valor correcto. El error de usar g constante es enorme a estas alturas."
    ]) +
    w("f11_escape") +
    "<h5>Agujeros negros: velocidad de escape igual a c</h5>" +
    "<p>Si un cuerpo es tan compacto que v<sub>e</sub> ≥ c, ni la luz escapa de él. El radio crítico (radio de Schwarzschild) es, en este razonamiento, R = 2GM/c². Para la Tierra serían 8,9 mm; para el Sol, 2,95 km. (La descripción correcta de los agujeros negros requiere la relatividad general, pero el resultado coincide.)</p>";

  // ---------------------------------------------------------------- 5. Velocidad orbital
  secciones[4] =
    "<h5>Deducción completa: v, ω y T en función del radio</h5>" +
    "<p>La única fuerza sobre un satélite es la atracción gravitatoria del planeta; apunta al centro y por eso hace de fuerza centrípeta (Tema 9). Con la segunda ley de Newton, F = m·a<sub>c</sub>:</p>" +
    formula(fr("G·M·m", "r²") + " = m·" + fr("v²", "r")) +
    "<p>La masa m del satélite se cancela, y se obtienen todas las magnitudes de la órbita circular:</p>" +
    tabla(["Magnitud", "Fórmula", "Cómo varía al aumentar r"], [
      ["Velocidad orbital", "v = √(GM/r)", "disminuye (∝ r<sup>−1/2</sup>)"],
      ["Velocidad angular", "ω = v/r = √(GM/r³)", "disminuye (∝ r<sup>−3/2</sup>)"],
      ["Periodo", "T = 2πr/v = 2π√(r³/(GM))", "aumenta (∝ r<sup>3/2</sup>)"],
      ["Aceleración centrípeta", "a<sub>c</sub> = GM/r² = g(r)", "disminuye (∝ r<sup>−2</sup>)"],
      ["Energía cinética", "E<sub>c</sub> = GMm/(2r)", "disminuye"],
      ["Energía mecánica", "E<sub>m</sub> = −GMm/(2r)", "aumenta (menos negativa)"]
    ]) +
    "<p>Un resultado importante: a mayor radio, <b>menor velocidad pero mayor energía</b>. Y nada de lo que dependen v y T es la masa del satélite: un satélite de 10 kg y uno de 10 toneladas a la misma altura tienen el mismo periodo (por eso los astronautas y su nave caen igual, y flotan).</p>" +
    ejemplo("La Estación Espacial Internacional", "La ISS orbita a 420 km sobre la superficie terrestre. Calcula su velocidad, su periodo y cuántas vueltas da cada día.", [
      "r = 6,371·10⁶ + 4,2·10⁵ = 6,791·10⁶ m",
      "v = √(GM/r) = √(3,986·10¹⁴/6,791·10⁶) = <b>7661 m/s</b> = 7,66 km/s = 27 580 km/h",
      "T = 2πr/v = 2π·6,791·10⁶/7661 = 5570 s = <b>92,8 min</b>",
      "Vueltas por día: 1440/92,8 = <b>15,5 vueltas</b>: cada 24 h los astronautas ven 15 amaneceres."
    ]) +
    ejemplo("Satélite geoestacionario", "Calcula el radio y la altura de la órbita de un satélite geoestacionario (periodo = un día sidéreo = 86 164 s) y su velocidad.", [
      "T² = 4π²r³/(GM) → r³ = GM·T²/(4π²) = 3,986·10¹⁴·(86 164)²/(4π²) = 7,495·10²² m³",
      "r = <b>4,216·10⁷ m</b>; altura h = r − R = <b>3,579·10⁷ m</b> (35 786 km)",
      "v = √(GM/r) = <b>3,075 km/s</b>; o bien v = 2πr/T = 2π·4,216·10⁷/86 164 = 3,075 km/s ✓",
      "Debe estar en el plano ecuatorial y girar hacia el este: así queda «fijo» sobre un punto del ecuador."
    ]) +
    "<h5>Cuadro de órbitas habituales de la Tierra</h5>" +
    tabla(["Órbita", "Altura", "v (km/s)", "Periodo", "Uso"], [
      ["Baja (LEO): ISS", "420 km", "7,66", "92,8 min", "estaciones, observación, constelaciones"],
      ["Media (MEO): GPS", "20 200 km", "3,87", "11 h 58 min", "navegación"],
      ["Geoestacionaria (GEO)", "35 786 km", "3,07", "23 h 56 min", "telecomunicaciones, meteorología"],
      ["Luna", "378 000 km", "1,02", "27,3 días", "satélite natural"]
    ]) +
    w("f11_satelite") +
    "<h5>Por qué flotan los astronautas</h5>" +
    "<p>La gravedad en la ISS es el 88,5 % de la de la superficie, así que los astronautas <b>no flotan por ausencia de gravedad</b>. Flotan porque nave y astronautas están en <b>caída libre continua</b>: caen hacia la Tierra con la misma aceleración y, al mismo tiempo, se mueven tan deprisa hacia el lado que la superficie terrestre «se curva» por debajo y nunca los alcanza. Como todo cae igual, no hay fuerza normal entre el suelo y los pies: el <b>peso aparente</b> es nulo (ingravidez aparente).</p>" +
    "<h5>Cómo se mantiene un satélite y qué ocurre si se frena</h5>" +
    "<p>Los satélites bajos rozan los restos de atmósfera y pierden energía. Pero, al perder energía, su radio disminuye, y entonces <b>v aumenta</b> (v ∝ r<sup>−1/2</sup>): el rozamiento hace que el satélite vaya cada vez más deprisa mientras cae. Esta aparente paradoja se explica porque la energía cinética aumenta a costa de una pérdida mayor de energía potencial (E<sub>c</sub> = −E<sub>m</sub>). Por eso la ISS necesita impulsos periódicos de sus motores.</p>" +
    ojo("para que un satélite alcance una órbita más alta hay que <b>aumentarle</b> la energía, pero una vez en la nueva órbita su velocidad es <b>menor</b>. Y, al revés, no se «frena» para bajar: se pierde energía y se acaba yendo más rápido. Es un error confundir la energía que hay que aportar con la velocidad orbital resultante.");

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Método para resolver problemas de gravitación",
      html:
        "<p>Casi todos los problemas del tema se reducen a elegir bien entre cinco herramientas. Antes de calcular, pregúntate <b>qué te piden y qué te dan</b>:</p>" +
        tabla(["Si te piden…", "Usa…", "Fórmula"], [
          ["la fuerza entre dos masas", "ley de gravitación", "F = G·m₁m₂/r²"],
          ["el peso o la aceleración de caída en un punto", "campo gravitatorio", "g = GM/r²  (r = R + h)"],
          ["un periodo, un radio de órbita o comparar dos órbitas", "3.ª ley de Kepler", "T² = 4π²r³/(GM)  ó  T₁²/T₂² = r₁³/r₂³"],
          ["la velocidad o el periodo de un satélite", "fuerza gravitatoria = fuerza centrípeta", "v = √(GM/r),  T = 2πr/v"],
          ["la energía de un satélite o un cambio de órbita", "energía mecánica orbital", "E<sub>m</sub> = −GMm/(2r),  ΔE = GMm/2·(1/r₁ − 1/r₂)"],
          ["la altura máxima, la velocidad de llegada o la de escape", "conservación de la energía", "½mv² − GMm/r = constante"],
          ["la velocidad en perihelio/afelio", "momento angular", "r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>"],
          ["la masa de un cuerpo central", "Kepler o campo", "M = 4π²r³/(GT²)  ó  M = gR²/G"]
        ]) +
        "<h5>Los diez pasos que evitan casi todos los errores</h5>" +
        "<ol><li><b>Dibuja</b> la situación: el cuerpo central, el objeto y la distancia (entre centros).</li>" +
        "<li><b>Escribe los datos</b> con unidades y pásalos al SI (km → m, días → s, UA → m).</li>" +
        "<li>Calcula <b>r = R + h</b> si te dan la altura sobre la superficie.</li>" +
        "<li>Elige el <b>principio</b>: ley de gravitación, fuerza centrípeta, Kepler o energía.</li>" +
        "<li>Escribe la <b>ecuación general</b> antes de sustituir.</li>" +
        "<li><b>Simplifica</b> las magnitudes que se cancelan (la masa del satélite casi siempre).</li>" +
        "<li>Despeja y <b>sustituye con notación científica</b> (cuidado con los cuadrados y las raíces).</li>" +
        "<li>Comprueba las <b>unidades</b>: m/s², m/s, s, J…</li>" +
        "<li>Comprueba el <b>orden de magnitud</b>: ¿tiene sentido? (v de un satélite bajo ≈ 7–8 km/s, g de la Tierra ≈ 10 m/s²…).</li>" +
        "<li><b>Responde</b> a lo que se pregunta, con unidades y cifras significativas adecuadas.</li></ol>" +
        "<h5>El método de las proporciones (lo que más tiempo ahorra)</h5>" +
        "<p>Muchos problemas dan masas y radios «relativos» a la Tierra (un planeta de doble masa, radio mitad…). No hace falta usar G ni números: se escribe cómo depende cada magnitud de M y R y se calcula el factor por el que cambia.</p>" +
        tabla(["Magnitud", "Depende de", "Si M × a y R × b, cambia por…"], [
          ["g<sub>0</sub> = GM/R²", "M/R²", "a/b²"],
          ["v<sub>escape</sub> = √(2GM/R)", "√(M/R)", "√(a/b)"],
          ["v<sub>orbital</sub> a radio r = √(GM/r)", "√(M/r)", "√(a) si r igual; 1/√(factor de r) si cambia r"],
          ["T a radio r = 2π√(r³/GM)", "√(r³/M)", "1/√a si r igual; (factor)<sup>3/2</sup> si cambia r"],
          ["F entre dos masas", "m₁m₂/r²", "producto de factores / (factor de r)²"],
          ["E<sub>p</sub> = −GMm/r", "Mm/r", "factores de M y m / factor de r"]
        ]) +
        ejemplo("Un planeta distinto", "Un planeta tiene el doble de masa y la mitad del radio que la Tierra. ¿Cuánto vale g en su superficie? ¿Y su velocidad de escape?", [
          "g ∝ M/R²: factor 2/(1/2)² = 2·4 = 8 → g = 8·g<sub>0</sub> = 8·9,82 = <b>78,6 m/s²</b>.",
          "v<sub>e</sub> ∝ √(M/R): factor √(2/(1/2)) = √4 = 2 → v<sub>e</sub> = 2·11,19 = <b>22,4 km/s</b>.",
          "Sin calcular G, M ni R: sólo razonando con factores."
        ]) +
        "<h5>Unidades y conversiones que hay que dominar</h5>" +
        tabla(["Unidad", "Equivale a"], [
          ["1 km", "10³ m"], ["1 UA", "1,496·10¹¹ m (149,6 millones de km)"], ["1 día", "86 400 s"], ["1 año", "3,156·10⁷ s (365,25 días)"], ["1 km/s", "3600 km/h"], ["1 h", "3600 s"], ["1 MJ", "10⁶ J"], ["1 kWh", "3,6·10⁶ J"]
        ]) +
        ojo("la causa más frecuente de resultados absurdos es olvidar pasar los kilómetros a metros antes de aplicar G (que está en unidades del SI), o sumar sólo la altura h en vez de R + h. Antes de calcular, comprueba que todos los datos están en m, kg y s.")
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Seis problemas tipo PAU resueltos paso a paso",
      html:
        "<p>Para practicar el razonamiento completo, aquí tienes problemas de distintos tipos con la resolución que se espera en un examen (datos del apartado 1: G = 6,674·10⁻¹¹ N·m²/kg², M<sub>T</sub> = 5,972·10²⁴ kg, R<sub>T</sub> = 6,371·10⁶ m).</p>" +
        ejemplo("Problema 1 · Satélite en órbita circular", "Un satélite de 800 kg orbita a 1000 km de altura sobre la superficie terrestre. Calcula: a) su velocidad y su periodo; b) sus energías cinética y mecánica; c) la energía adicional necesaria para pasarlo a una órbita a 2000 km de altura.", [
          "<b>a)</b> r = 6,371·10⁶ + 10⁶ = 7,371·10⁶ m. v = √(GM/r) = √(3,986·10¹⁴/7,371·10⁶) = <b>7353 m/s</b>. T = 2πr/v = 2π·7,371·10⁶/7353 = 6299 s = <b>105 min</b>.",
          "<b>b)</b> E<sub>c</sub> = ½mv² = ½·800·7353² = <b>2,16·10¹⁰ J</b>. E<sub>m</sub> = −E<sub>c</sub> = <b>−2,16·10¹⁰ J</b> (negativa: ligado).",
          "<b>c)</b> Nueva órbita: r′ = 8,371·10⁶ m. E<sub>m</sub>′ = −GMm/(2r′) = −3,986·10¹⁴·800/(2·8,371·10⁶) = −1,905·10¹⁰ J.",
          "ΔE = E<sub>m</sub>′ − E<sub>m</sub> = −1,905·10¹⁰ − (−2,163·10¹⁰) = <b>2,58·10⁹ J</b>. (En la órbita mayor la velocidad es menor: 6900 m/s.)"
        ]) +
        ejemplo("Problema 2 · Un exoplaneta", "Un planeta tiene 2,5 veces la masa de la Tierra y 1,5 veces su radio. Calcula: a) g en su superficie; b) su velocidad de escape; c) el periodo de un satélite que orbita a una altura igual al radio del planeta.", [
          "<b>a)</b> g/g₀ = 2,5/1,5² = 1,111 → <b>g = 10,9 m/s²</b>.",
          "<b>b)</b> v<sub>e</sub>/v<sub>eT</sub> = √(2,5/1,5) = 1,291 → v<sub>e</sub> = 1,291·11,19 = <b>14,4 km/s</b>.",
          "<b>c)</b> r = 2R = 3R<sub>T</sub> = 1,911·10⁷ m; GM = 2,5·3,986·10¹⁴ = 9,965·10¹⁴ m³/s². T = 2π√(r³/GM) = 2π√((1,911·10⁷)³/9,965·10¹⁴) = 1,663·10⁴ s = <b>4,62 h</b>."
        ]) +
        ejemplo("Problema 3 · Campo de dos masas (vectorial)", "Una masa de 2·10⁹ kg está en el origen y otra de 6·10⁹ kg en (4 m, 0). Calcula el campo gravitatorio en el punto P (0, 3 m).", [
          "Campo de M₁ (a 3 m, hacia el origen, o sea −j): g₁ = G·M₁/3² = 6,674·10⁻¹¹·2·10⁹/9 = 1,483·10⁻² m/s² → g⃗₁ = (0, −1,483·10⁻²).",
          "Campo de M₂ (a 5 m): g₂ = G·M₂/5² = 6,674·10⁻¹¹·6·10⁹/25 = 1,602·10⁻² m/s². Dirección hacia M₂: vector unitario (4, −3)/5 → g⃗₂ = (1,602·10⁻²·0,8; −1,602·10⁻²·0,6) = (1,281·10⁻², −0,961·10⁻²).",
          "Suma: g⃗ = (1,281·10⁻²; −2,444·10⁻²) m/s². Módulo: <b>|g| = 2,76·10⁻² m/s²</b>, apuntando hacia abajo y a la derecha (62,3° bajo el eje X).",
          "Nota: no se pueden sumar los módulos (1,483 + 1,602) porque los vectores no son paralelos."
        ]) +
        ejemplo("Problema 4 · Velocidad de escape y energía sobrante", "Un cohete sale de la superficie terrestre con 15 km/s. ¿Con qué velocidad llegará muy lejos de la Tierra (en el infinito)?", [
          "Conservación de la energía: ½v₀² − GM/R = ½v<sub>∞</sub>² (E<sub>p</sub>(∞) = 0).",
          "Como GM/R = ½v<sub>e</sub>²: v<sub>∞</sub>² = v₀² − v<sub>e</sub>² = 15² − 11,19² = 225 − 125,1 = 99,9 km²/s².",
          "<b>v<sub>∞</sub> = 9,99 km/s</b>. Tiene E &gt; 0: trayectoria hiperbólica."
        ]) +
        ejemplo("Problema 5 · Pesar Marte con Fobos", "Fobos orbita alrededor de Marte a 9,376·10⁶ m del centro con un periodo de 7,654 h. Calcula la masa de Marte y la gravedad en su superficie (R = 3,3895·10⁶ m).", [
          "T = 7,654·3600 = 27 554 s. M = 4π²r³/(G·T²) = 4π²·(9,376·10⁶)³/(6,674·10⁻¹¹·27 554²)",
          "r³ = 8,243·10²⁰; numerador = 3,254·10²² ; denominador = 5,067·10⁻² → <b>M = 6,42·10²³ kg</b>.",
          "g = GM/R² = 6,674·10⁻¹¹·6,42·10²³/(3,3895·10⁶)² = <b>3,73 m/s²</b>."
        ]) +
        ejemplo("Problema 6 · Cambio de órbita", "Un satélite de 1500 kg pasa de una órbita circular de radio 7,0·10⁶ m a otra de radio 1,2·10⁷ m. Calcula la variación de su energía cinética, de su energía potencial y de su energía mecánica, y la energía que deben aportar los motores.", [
          "Antes: v₁ = √(GM/r₁) = 7546 m/s → E<sub>c1</sub> = ½·1500·7546² = 4,27·10¹⁰ J; E<sub>p1</sub> = −GMm/r₁ = −8,54·10¹⁰ J; E<sub>m1</sub> = −4,27·10¹⁰ J.",
          "Después: v₂ = 5763 m/s → E<sub>c2</sub> = 2,49·10¹⁰ J; E<sub>p2</sub> = −4,98·10¹⁰ J; E<sub>m2</sub> = −2,49·10¹⁰ J.",
          "ΔE<sub>c</sub> = −1,78·10¹⁰ J (disminuye); ΔE<sub>p</sub> = +3,56·10¹⁰ J (aumenta); <b>ΔE<sub>m</sub> = +1,78·10¹⁰ J</b>.",
          "Los motores deben aportar <b>1,78·10¹⁰ J</b> (el aumento de energía mecánica). Observa: la energía potencial sube el doble de lo que baja la cinética: ΔE<sub>p</sub> = −2ΔE<sub>c</sub>."
        ])
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Aplicaciones: satélites, GPS y viajes espaciales",
      html:
        "<h5>Satélites de comunicaciones y meteorológicos</h5>" +
        "<p>Los satélites <b>geoestacionarios</b> (35 786 km) siempre ven la misma región de la Tierra, de modo que una antena fija (como la parabólica de tu casa) puede apuntarles sin moverse. La contrapartida es la distancia: la señal tarda unos 0,24 s en ir y volver (3,6·10⁷ m/3·10⁸ m/s ≈ 0,12 s cada trayecto), por eso las conversaciones por satélite tienen un retardo apreciable. Los satélites meteorológicos (como Meteosat) también son geoestacionarios, para vigilar continuamente una zona.</p>" +
        "<h5>GPS y navegación</h5>" +
        "<p>La constelación GPS tiene unos 30 satélites a 20 200 km de altura (r = 2,656·10⁷ m), con una velocidad de 3,87 km/s y un periodo de casi 12 h (11 h 58 min = medio día sidéreo). Un receptor calcula su distancia a varios satélites midiendo cuánto tarda en llegar la señal y así determina su posición. Los relojes de los satélites deben corregirse por efectos relativistas (su velocidad y su menor gravedad hacen que adelanten unos 38 microsegundos al día): sin esa corrección, el GPS acumularía errores de 10 km al día.</p>" +
        "<h5>Cómo se llega de una órbita a otra: la transferencia de Hohmann</h5>" +
        "<p>Para pasar de una órbita circular baja a una más alta con el mínimo combustible se usa una <b>elipse de transferencia</b> tangente a las dos órbitas. Hacen falta <b>dos impulsos</b>: uno en la órbita baja para entrar en la elipse y otro en el punto más alto para circularizar. Por ejemplo, de una órbita de 300 km (r₁ = 6,671·10⁶ m) a la geoestacionaria (r₂ = 4,216·10⁷ m):</p>" +
        tabla(["Fase", "Velocidad", "Impulso Δv"], [
          ["Órbita baja circular", "7,73 km/s", ""],
          ["Perigeo de la elipse de transferencia", "10,16 km/s", "+2,43 km/s"],
          ["Apogeo de la elipse de transferencia", "1,61 km/s", ""],
          ["Órbita geoestacionaria circular", "3,07 km/s", "+1,47 km/s"]
        ]) +
        "<p>El semieje de la elipse es a = (r₁ + r₂)/2 = 2,442·10⁷ m y el viaje dura medio periodo: t = π√(a³/GM) = 5,27 h. Es una aplicación directa de la conservación de la energía (v² = GM(2/r − 1/a)) y del momento angular. Observa la paradoja ya vista: para <i>llegar</i> a una órbita más alta hay que acelerar dos veces, pero en la órbita final se va <b>más despacio</b> (3,07 km/s) que en la inicial (7,73 km/s).</p>" +
        "<h5>Lanzar hacia el este y la ayuda de la rotación terrestre</h5>" +
        "<p>La Tierra gira con un periodo de 86 164 s, de modo que un punto del ecuador se mueve a v = 2πR/T = 465 m/s hacia el este. Un cohete que despega hacia el este desde una base cercana al ecuador parte con esa velocidad «de regalo» (ahorra un 6 % de los 7,7 km/s necesarios). Por eso las bases de lanzamiento (Cabo Cañaveral, Kourou) se sitúan cerca del ecuador y los lanzamientos suelen ser hacia el este.</p>" +
        "<h5>Asistencia gravitatoria</h5>" +
        "<p>Las sondas que viajan al sistema solar exterior (Voyager, Cassini) usan la gravedad de los planetas para ganar velocidad: al pasar cerca de un planeta en movimiento, la sonda intercambia energía con él y sale con más velocidad respecto al Sol. Es un «frenazo» tan pequeño para el planeta que no se nota, y un enorme ahorro de combustible para la sonda.</p>" +
        "<h5>La Luna y la caída de la manzana</h5>" +
        "<p>La idea clave de Newton: la Luna <i>cae</i> hacia la Tierra igual que una manzana, pero se mueve tan deprisa hacia el lado que nunca la alcanza. A la distancia de la Luna (60,3 R<sub>T</sub>), g vale g₀/60,3² = 2,70·10⁻³ m/s²; la aceleración centrípeta de la Luna (v²/d = 1018²/3,844·10⁸ = 2,70·10⁻³ m/s²) coincide. Esa coincidencia fue la prueba de que la fuerza que mantiene a la Luna y la que hace caer a la manzana es la misma.</p>"
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. La gravedad en la vida real: variaciones y mareas",
      html:
        "<h5>g no es exactamente 9,82 en todas partes</h5>" +
        "<p>El valor de g varía ligeramente en la Tierra por tres causas: (1) la <b>altitud</b> (g(h) disminuye al subir: en la cima del Everest, 8848 m, vale 9,792 m/s², un 0,3 % menos); (2) la <b>rotación</b> de la Tierra (la fuerza centrífuga aparente reduce algo g en el ecuador); (3) la <b>forma</b> de la Tierra, achatada en los polos (en los polos el punto de la superficie está más cerca del centro). Por todo ello g vale unos 9,780 m/s² en el ecuador y 9,832 m/s² en los polos. El valor «normal» que se usa en los problemas, 9,81 m/s², es un promedio.</p>" +
        "<h5>Las mareas: una diferencia de campo</h5>" +
        "<p>Las mareas no se deben a que la Luna «atraiga el agua» con más fuerza que a la Tierra: se deben a que la atracción es <b>distinta en distintos puntos</b> de la Tierra. El campo de la Luna en el centro de la Tierra es g<sub>L</sub> = GM<sub>L</sub>/d² = 3,3·10⁻⁵ m/s². En el punto más cercano a la Luna es algo mayor, y en el más lejano algo menor, con una diferencia de aproximadamente <b>2GM<sub>L</sub>R<sub>T</sub>/d³ = 1,1·10⁻⁶ m/s²</b>. Esa diferencia (la fuerza de marea) estira la Tierra a lo largo de la línea Tierra–Luna y levanta dos «abultamientos» de agua: uno hacia la Luna y otro en el lado opuesto, de ahí que haya <b>dos mareas altas al día</b>.</p>" +
        "<p>Compara: 1,1·10⁻⁶ m/s² es unas diez millonésimas de g₀ (1,1·10⁻⁷ g₀). Parece poco, pero actúa sobre toda la masa del océano. El Sol (aunque su atracción es 180 veces mayor sobre la Tierra) produce una marea 2,2 veces menor que la Luna, porque la fuerza de marea depende de <b>1/d³</b>, y el Sol está mucho más lejos. Cuando Sol, Tierra y Luna están alineados (luna llena y nueva) se suman los efectos: <b>mareas vivas</b>; en cuartos (a 90°), se restan parcialmente: <b>mareas muertas</b>.</p>" +
        "<h5>Densidad media y estructura de la Tierra</h5>" +
        "<p>De M y R se obtiene la densidad media de la Tierra: ρ = M/(4πR³/3) = 5,972·10²⁴/1,083·10²¹ = <b>5513 kg/m³</b>, más del doble que la de las rocas de la corteza (≈ 2700 kg/m³). Fue una de las primeras pruebas de que el interior terrestre es mucho más denso (un núcleo de hierro y níquel).</p>" +
        ejemplo("Cuánto pesas en lo alto del Everest", "Calcula g en la cima del Everest (h = 8848 m) y el peso de un alpinista de 70 kg allí y a nivel del mar.", [
          "g = GM/(R + h)² = 3,986·10¹⁴/(6,371·10⁶ + 8848)² = 3,986·10¹⁴/(6,3798·10⁶)² = <b>9,792 m/s²</b>",
          "Peso en la cima: 70·9,792 = <b>685,4 N</b>. Peso a nivel del mar: 70·9,820 = 687,4 N.",
          "La diferencia es de 2 N, el peso de una manzana pequeña: ¡subir al Everest no te hace «flotar»!"
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. De Ptolomeo a Newton: cómo se llegó a la ley",
      html:
        "<p>La ley de gravitación es el final de un camino de dos mil años. Conocer la secuencia ayuda a entender <i>por qué</i> cada ley es como es:</p>" +
        tabla(["Quién", "Cuándo", "Aportación"], [
          ["Ptolomeo", "siglo II", "Modelo geocéntrico: la Tierra en el centro, planetas con epiciclos que explican los movimientos «hacia atrás»."],
          ["Copérnico", "1543", "Modelo heliocéntrico: la Tierra es un planeta más que gira alrededor del Sol."],
          ["Tycho Brahe", "1576–1601", "Observaciones astronómicas de precisión sin telescopio durante 20 años."],
          ["Kepler", "1609, 1619", "Con los datos de Tycho deduce las tres leyes: elipses, áreas, T² ∝ a³."],
          ["Galileo", "1610", "Con el telescopio ve las lunas de Júpiter y las fases de Venus: apoyo al heliocentrismo."],
          ["Newton", "1687", "Ley de gravitación universal: explica las leyes de Kepler y la caída de los cuerpos con una sola fuerza."],
          ["Cavendish", "1798", "Mide G con la balanza de torsión: «pesa la Tierra»."],
          ["Einstein", "1915", "Relatividad general: la gravedad como curvatura del espacio-tiempo (la ley de Newton es su límite para campos débiles)."]
        ]) +
        "<h5>El razonamiento de Newton, paso a paso</h5>" +
        "<ol><li>Kepler da T² = k·r³ para los planetas. Para una órbita circular, la aceleración centrípeta es a = 4π²r/T² = 4π²/(k·r²): la aceleración de un planeta es <b>inversamente proporcional a r²</b>.</li>" +
        "<li>Newton pensó que la fuerza que causa esa aceleración debía ser proporcional a la masa del planeta (F = m·a) y, por la tercera ley, también a la del Sol: F ∝ m·M/r².</li>" +
        "<li>Comprobó el 1/r² con la Luna (apartado anterior): g a la distancia de la Luna es g₀/60² y coincide con la aceleración centrípeta observada.</li>" +
        "<li>Generalizó: <b>todas</b> las masas se atraen así, en la Tierra y en el cielo. Esa universalidad es lo que da nombre a la ley.</li></ol>" +
        "<p>Es uno de los grandes ejemplos de cómo funciona la física: partiendo de las observaciones (leyes de Kepler), se propone una ley (gravitación universal) que las explica <b>y</b> predice hechos nuevos (la forma achatada de la Tierra, las mareas, el descubrimiento de Neptuno por sus perturbaciones sobre Urano en 1846).</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y piensa por qué es un error.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las fórmulas, un juego de parejas, una clasificación de problemas por la herramienta que usarías y un ejercicio de ordenar los pasos de un problema clásico.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "emp1") + w("clasificar", "cla1") + w("orden", "orden1")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula la gravedad a 400 km de altura sobre la Tierra con g = GM/r² usando r = 400 km = 4·10⁵ m. ¿Qué falla?",
          op: ["Nada", "r es la distancia al <b>centro</b>: debe ser R + h = 6,771·10⁶ m", "Debería usar r = h/2", "La fórmula correcta es g = GM/r"], ok: 1,
          porque: "El campo depende de la distancia al centro del planeta. Con r = 6,771·10⁶ m sale 8,69 m/s²; con 4·10⁵ m saldría un valor absurdo (¡2491 m/s²!)." },
        { q: "«La Tierra atrae a la Luna con más fuerza que la Luna a la Tierra, porque la Tierra es más masiva.» ¿Es correcto?",
          op: ["Sí", "No: las dos fuerzas son iguales en módulo (3.ª ley de Newton); lo que difiere es la aceleración", "No: es la Luna la que atrae más", "Depende de la distancia"], ok: 1,
          porque: "F = G·M_T·M_L/d² es la misma para ambas, y de sentido opuesto. La Luna se acelera más (a = F/M_L) porque tiene menos masa." },
        { q: "«Los astronautas de la ISS flotan porque allí no hay gravedad.» ¿Qué falla?",
          op: ["Nada", "En la ISS g vale aún el 88 % del valor en la superficie; flotan porque están en caída libre continua", "En el espacio la gravedad es negativa", "Flotan por el vacío"], ok: 1,
          porque: "A 420 km g ≈ 8,7 m/s². La nave y los astronautas caen juntos con la misma aceleración, por eso no hay fuerza normal entre ellos y el suelo: ingravidez aparente." },
        { q: "Un alumno escribe que la energía mecánica de un satélite en órbita circular es +GMm/(2r). ¿Qué falla?",
          op: ["Nada", "Es negativa: E<sub>m</sub> = −GMm/(2r), porque E<sub>p</sub> = −GMm/r es el doble de E<sub>c</sub> en valor absoluto", "Debe ser GMm/r", "Debe ser cero"], ok: 1,
          porque: "E<sub>c</sub> = +GMm/2r y E<sub>p</sub> = −GMm/r. Suman −GMm/2r &lt; 0. Es negativa porque el satélite está ligado." },
        { q: "«Un satélite de 2000 kg tiene que ir más deprisa que uno de 500 kg a la misma altura.» ¿Es correcto?",
          op: ["Sí", "No: v = √(GM/r) no depende de la masa del satélite", "Sí, porque tiene más energía", "No: el más pesado va más despacio"], ok: 1,
          porque: "En G·M·m/r² = m·v²/r, la masa m se cancela. A la misma altura, la velocidad orbital es la misma para cualquier masa." },
        { q: "Un alumno dice que la Tierra va más despacio en el perihelio, «porque está más cerca del Sol y lo frena». ¿Qué falla?",
          op: ["Nada", "Segunda ley de Kepler: cerca del Sol la velocidad es <b>mayor</b> (se conserva el momento angular)", "En el perihelio la velocidad es cero", "La velocidad no cambia en una órbita"], ok: 1,
          porque: "r·v se conserva en el perihelio y el afelio: si r es menor, v es mayor. La Tierra va unos 30,3 km/s en enero y 29,3 en julio." },
        { q: "«Para que un satélite suba a una órbita mayor hay que aumentarle la velocidad, y después se mueve más deprisa.» ¿Qué falla?",
          op: ["Nada", "Hay que aumentar su energía, pero en la órbita mayor se mueve <b>más despacio</b> (v ∝ 1/√r)", "No hay que hacer nada", "Debe frenar"], ok: 1,
          porque: "Un impulso aumenta la energía mecánica y lo lleva más arriba; allí v = √(GM/r) es menor. Por eso el GEO va a 3,07 km/s y la ISS a 7,66 km/s." },
        { q: "Si la distancia entre dos masas se duplica, un alumno dice que la fuerza se reduce a la mitad. ¿Qué falla?",
          op: ["Nada", "F ∝ 1/r²: se reduce a la <b>cuarta parte</b>", "Se duplica", "Se reduce a la tercera parte"], ok: 1,
          porque: "La fuerza gravitatoria es inversamente proporcional al cuadrado de la distancia: (1/2)² = 1/4." },
        { q: "Para calcular hasta dónde llega un cohete lanzado verticalmente a 8 km/s desde la Tierra, un alumno usa h = v²/(2g). ¿Qué falla?",
          op: ["Nada", "g no es constante a esas alturas: hay que usar la conservación de la energía con E<sub>p</sub> = −GMm/r", "Debió usar h = v·t", "Debió usar h = v²/g"], ok: 1,
          porque: "Con h = v²/2g saldrían 3300 km; el valor correcto es 6670 km, el doble. A alturas comparables a R, g disminuye mucho." },
        { q: "«La velocidad de escape de un cuerpo depende de la masa del objeto que se lanza.» ¿Qué falla?",
          op: ["Nada", "v<sub>e</sub> = √(2GM/R) sólo depende del cuerpo del que se escapa; la masa del objeto se cancela", "Depende de la masa y del tiempo", "Depende de la temperatura"], ok: 1,
          porque: "½mv² = GMm/R → m se cancela. Una canica y un cohete necesitan la misma velocidad para escapar (aunque el cohete requiere mucha más energía)." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Si la distancia entre dos masas se triplica, la fuerza gravitatoria entre ellas…",
          op: ["se divide por 9", "se divide por 3", "se multiplica por 9", "se divide por 6"], ok: 0,
          porque: "F ∝ 1/r²: (1/3)² = 1/9." },
        { q: "La unidad de la intensidad del campo gravitatorio es…",
          op: ["N/kg (= m/s²)", "N·m", "kg/m", "J"], ok: 0,
          porque: "g = F/m: newtons por kilogramo, equivalente a metros por segundo al cuadrado." },
        { q: "A una altura igual al radio de la Tierra sobre su superficie, g vale…",
          op: ["g₀/4", "g₀/2", "g₀/9", "g₀"], ok: 0,
          porque: "r = 2R → g = GM/(2R)² = g₀/4." },
        { q: "Según la tercera ley de Kepler, si el radio medio de una órbita se multiplica por 4, el periodo se multiplica por…",
          op: ["8", "4", "16", "2"], ok: 0,
          porque: "T² ∝ r³ → T ∝ r^(3/2) = 4^(3/2) = 8." },
        { q: "En el perihelio, un planeta se mueve…",
          op: ["más deprisa que en el afelio", "más despacio que en el afelio", "igual que en el afelio", "con velocidad nula"], ok: 0,
          porque: "Conservación del momento angular: r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>, y r<sub>p</sub> &lt; r<sub>a</sub>." },
        { q: "La energía potencial gravitatoria entre dos masas (origen en el infinito) es…",
          op: ["−GMm/r", "+GMm/r", "mgh", "−GMm/r²"], ok: 0,
          porque: "Es negativa porque la gravedad es atractiva y se toma E<sub>p</sub> = 0 en r → ∞." },
        { q: "La velocidad orbital de un satélite en órbita circular de radio r es…",
          op: ["√(GM/r)", "GM/r", "√(GM/r²)", "√(2GM/r)"], ok: 0,
          porque: "Igualando GMm/r² = mv²/r." },
        { q: "Si un satélite pasa a una órbita de radio mayor, su velocidad…",
          op: ["disminuye", "aumenta", "no cambia", "se hace cero"], ok: 0,
          porque: "v = √(GM/r) disminuye con r. (Pero su energía mecánica aumenta.)" },
        { q: "La energía mecánica de un satélite en órbita circular vale…",
          op: ["−GMm/(2r)", "GMm/(2r)", "−GMm/r", "0"], ok: 0,
          porque: "E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = GMm/2r − GMm/r = −GMm/2r." },
        { q: "La velocidad de escape desde la superficie de un planeta de masa M y radio R es…",
          op: ["√(2GM/R)", "√(GM/R)", "2GM/R", "√(GM/2R)"], ok: 0,
          porque: "E<sub>m</sub> = 0: ½mv² = GMm/R." },
        { q: "Un satélite geoestacionario tiene un periodo de…",
          op: ["24 h (86 164 s)", "12 h", "90 min", "1 semana"], ok: 0,
          porque: "Gira con la Tierra para quedar fijo sobre un punto del ecuador: radio 4,22·10⁷ m." },
        { q: "El punto neutro entre dos masas M₁ y M₂ está…",
          op: ["más cerca de la masa menor", "más cerca de la masa mayor", "justo en el punto medio", "no existe"], ok: 0,
          porque: "x = d/(1 + √(M₂/M₁)) respecto de M₁: la masa menor «gana» en cercanía; entre la Tierra y la Luna está a 38 400 km de la Luna." }
      ]
    },
    tj1: {
      titulo: "Gravitación",
      cartas: [
        { a: "Ley de gravitación universal", b: "F = G·m₁·m₂/r². Atractiva, central, proporcional a las masas, ∝ 1/r². G = 6,674·10⁻¹¹ N·m²/kg². Pares acción-reacción iguales." },
        { a: "Campo gravitatorio", b: "g = GM/r² (N/kg = m/s²), dirigido al centro. Superficie: g₀ = GM/R². A la altura h: GM/(R + h)². Superposición vectorial." },
        { a: "g en otros mundos", b: "g ∝ M/R². Luna 1,62 · Marte 3,73 · Venus 8,87 · Tierra 9,82 · Júpiter 25,9 · Sol 274 m/s²." },
        { a: "Punto neutro", b: "Donde los campos de dos masas se cancelan: x = d/(1 + √(M₂/M₁)) desde M₁. Tierra–Luna: a 346 000 km de la Tierra." },
        { a: "1.ª ley de Kepler", b: "Órbitas elípticas con el Sol en un foco. r<sub>p</sub> = a(1 − e), r<sub>a</sub> = a(1 + e)." },
        { a: "2.ª ley de Kepler", b: "Áreas iguales en tiempos iguales: dA/dt = L/2m constante. Perihelio: más rápido. r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>." },
        { a: "3.ª ley de Kepler", b: "T² = 4π²a³/(GM) = k·a³. k depende del cuerpo central. Sol: T²/a³ = 1 año²/UA³. Permite pesar cuerpos centrales." },
        { a: "Energía potencial gravitatoria", b: "E<sub>p</sub> = −GMm/r (cero en el infinito). Potencial V = −GM/r. Cerca del suelo: ΔE<sub>p</sub> ≈ mgh." },
        { a: "Velocidad orbital y periodo", b: "v = √(GM/r), ω = √(GM/r³), T = 2π√(r³/GM). No dependen de la masa del satélite." },
        { a: "Energías en órbita circular", b: "E<sub>c</sub> = GMm/2r, E<sub>p</sub> = −GMm/r, E<sub>m</sub> = −GMm/2r = E<sub>p</sub>/2 = −E<sub>c</sub>. Ligado: E<sub>m</sub> &lt; 0." },
        { a: "Velocidad de escape", b: "v<sub>e</sub> = √(2GM/R) = √2·v<sub>orbital rasante</sub>. Tierra 11,19 km/s; Luna 2,38; Marte 5,03; Sol 618." },
        { a: "Tipo de órbita según la energía", b: "E<sub>m</sub> &lt; 0: elipse o círculo (ligado). E<sub>m</sub> = 0: parábola. E<sub>m</sub> &gt; 0: hipérbola (escapa)." },
        { a: "Satélite geoestacionario", b: "T = 86 164 s, r = 4,22·10⁷ m (h = 35 786 km), v = 3,07 km/s; en el plano del ecuador." },
        { a: "Ingravidez en la ISS", b: "No hay ausencia de gravedad (g ≈ 8,7 m/s²): nave y astronautas caen juntos en caída libre continua." },
        { a: "Cambio de órbita", b: "ΔE<sub>m</sub> = GMm/2·(1/r₁ − 1/r₂). Más lejos: más energía y menos velocidad." },
        { a: "Método de las proporciones", b: "g ∝ M/R² · v<sub>e</sub> ∝ √(M/R) · T ∝ r<sup>3/2</sup> (a igual M) · F ∝ m₁m₂/r²." }
      ]
    },
    emp1: {
      titulo: "Cada fórmula con su significado",
      consigna: "Une cada expresión con lo que representa.",
      pares: [
        ["F = G·m₁m₂/r²", "fuerza de atracción entre dos masas"],
        ["g = GM/r²", "intensidad del campo gravitatorio"],
        ["T² = 4π²r³/(GM)", "tercera ley de Kepler"],
        ["E<sub>p</sub> = −GMm/r", "energía potencial gravitatoria"],
        ["v = √(GM/r)", "velocidad de un satélite en órbita circular"],
        ["v<sub>e</sub> = √(2GM/R)", "velocidad de escape"],
        ["E<sub>m</sub> = −GMm/(2r)", "energía mecánica de un satélite en órbita circular"],
        ["r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>", "conservación del momento angular (2.ª ley de Kepler)"]
      ]
    },
    cla1: {
      titulo: "¿Qué herramienta uso en cada problema?",
      consigna: "Toca un problema y después la herramienta con la que lo resolverías.",
      categorias: ["Ley de gravitación (F)", "Campo gravitatorio (g)", "3.ª ley de Kepler", "Energía (E<sub>p</sub>, E<sub>m</sub>)", "Fuerza centrípeta (v, T de un satélite)"],
      items: [
        { t: "Fuerza entre la Tierra y la Luna", c: 0 }, { t: "Atracción entre dos camiones separados 5 m", c: 0 },
        { t: "Peso de una persona en Marte", c: 1 }, { t: "Aceleración de caída de un objeto a 400 km de altura", c: 1 },
        { t: "Periodo de un asteroide a 3 UA del Sol sin conocer masas", c: 2 }, { t: "Comparar los periodos de dos lunas de Júpiter", c: 2 },
        { t: "Altura máxima de un cohete lanzado a 8 km/s", c: 3 }, { t: "Velocidad mínima para escapar de la Luna", c: 3 }, { t: "Energía necesaria para subir un satélite a otra órbita", c: 3 },
        { t: "Velocidad de la Estación Espacial Internacional", c: 4 }, { t: "Radio de la órbita geoestacionaria", c: 4 }
      ]
    },
    orden1: {
      titulo: "Radio de la órbita geoestacionaria",
      consigna: "Ordena los pasos para calcular el radio de la órbita de un satélite geoestacionario.",
      items: [
        { t: "Datos: periodo T = 86 164 s y GM<sub>T</sub> = 3,986·10¹⁴ m³/s²", nota: "Geoestacionario: da una vuelta por día sidéreo." },
        { t: "Igualar la fuerza gravitatoria y la centrípeta: GMm/r² = mω²r", nota: "La atracción de la Tierra es la fuerza centrípeta." },
        { t: "Sustituir ω = 2π/T: GM/r² = 4π²r/T²", nota: "Se simplifica la masa m del satélite." },
        { t: "Despejar el radio: r³ = GM·T²/(4π²)", nota: "Es la tercera ley de Kepler." },
        { t: "Calcular: r³ = 7,50·10²² m³ → r = 4,22·10⁷ m", nota: "Raíz cúbica de 7,50·10²²." },
        { t: "Altura sobre la superficie: h = r − R<sub>T</sub> = 3,58·10⁷ m", nota: "La altura se mide desde la superficie, no desde el centro." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "g1", nivel: 1,
      enunciado: "Calcula la fuerza gravitatoria entre dos masas de 50 kg y 80 kg separadas 2 m (G = 6,674·10⁻¹¹ N·m²/kg²). Da el resultado en unidades de 10⁻⁸ N.",
      check: { tipo: "num", etiqueta: "F (10⁻⁸ N) =", valor: 6.674 },
      pistas: ["F = G·m₁·m₂/r²."],
      pasos: ["F = 6,674·10⁻¹¹·50·80/2² = 6,674·10⁻¹¹·1000", "F = 6,674·10⁻⁸ N."],
      resultado: "6,674·10⁻⁸ N" },
    { id: "g2", nivel: 1,
      enunciado: "Si la distancia entre dos masas se hace tres veces mayor, ¿entre qué número se divide la fuerza de atracción?",
      check: { tipo: "num", etiqueta: "Se divide entre", valor: 9 },
      pistas: ["La fuerza es inversamente proporcional al cuadrado de la distancia."],
      pasos: ["F′ = G·m₁m₂/(3r)² = F/9."],
      resultado: "entre 9" },
    { id: "g3", nivel: 1,
      enunciado: "Calcula el valor de g en la superficie de la Luna (M = 7,342·10²² kg, R = 1,737·10⁶ m).",
      check: { tipo: "num", etiqueta: "g (m/s²) =", valor: 1.62 },
      pistas: ["g = GM/R²."],
      pasos: ["g = 6,674·10⁻¹¹·7,342·10²²/(1,737·10⁶)² = 4,900·10¹²/3,017·10¹²", "g = 1,62 m/s²."],
      resultado: "1,62 m/s²" },
    { id: "g4", nivel: 1,
      enunciado: "Una persona de 60 kg está en la Luna, donde g = 1,62 m/s². ¿Cuánto pesa? ¿Y cuál es su masa allí? (Peso en N; masa en kg)",
      check: [{ tipo: "num", etiqueta: "Peso (N) =", valor: 97.2 }, { tipo: "num", etiqueta: "Masa (kg) =", valor: 60 }],
      pistas: ["P = m·g. La masa no cambia."],
      pasos: ["P = 60·1,62 = 97,2 N.", "La masa sigue siendo 60 kg."],
      resultado: "97,2 N y 60 kg" },
    { id: "g5", nivel: 1,
      enunciado: "Con g = 9,81 m/s² y R = 6,371·10⁶ m, calcula la masa de la Tierra (en 10²⁴ kg).",
      check: { tipo: "num", etiqueta: "M (10²⁴ kg) =", valor: 5.966 },
      pistas: ["g = GM/R² → M = gR²/G."],
      pasos: ["M = 9,81·(6,371·10⁶)²/6,674·10⁻¹¹ = 9,81·4,059·10¹³/6,674·10⁻¹¹", "M = 5,97·10²⁴ kg."],
      resultado: "5,97·10²⁴ kg" },
    { id: "g6", nivel: 1,
      enunciado: "Un asteroide orbita alrededor del Sol a una distancia media de 4 UA. ¿Cuál es su periodo en años? (La Tierra: 1 UA, 1 año.)",
      check: { tipo: "num", etiqueta: "T (años) =", valor: 8 },
      pistas: ["T² ∝ a³."],
      pasos: ["T² = 4³ = 64 → T = 8 años."],
      resultado: "8 años" },
    { id: "g7", nivel: 1,
      enunciado: "Calcula la velocidad orbital de un satélite que orbita a 500 km de altura sobre la Tierra (GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m). Da el resultado en km/s.",
      check: { tipo: "num", etiqueta: "v (km/s) =", valor: 7.616 },
      pistas: ["r = R + h. v = √(GM/r)."],
      pasos: ["r = 6,371·10⁶ + 5·10⁵ = 6,871·10⁶ m", "v = √(3,986·10¹⁴/6,871·10⁶) = 7616 m/s = 7,616 km/s."],
      resultado: "7,616 km/s" },
    { id: "g8", nivel: 1,
      enunciado: "Calcula el periodo del satélite anterior (r = 6,871·10⁶ m, v = 7616 m/s), en minutos.",
      check: { tipo: "num", etiqueta: "T (min) =", valor: 94.5 },
      pistas: ["T = 2πr/v."],
      pasos: ["T = 2π·6,871·10⁶/7616 = 5668 s", "= 94,5 min."],
      resultado: "94,5 min" },
    { id: "g9", nivel: 1,
      enunciado: "Calcula la velocidad de escape desde la superficie de la Tierra (GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m), en km/s.",
      check: { tipo: "num", etiqueta: "v<sub>e</sub> (km/s) =", valor: 11.19 },
      pistas: ["v<sub>e</sub> = √(2GM/R)."],
      pasos: ["v<sub>e</sub> = √(2·3,986·10¹⁴/6,371·10⁶) = √(1,2513·10⁸) = 11 186 m/s = 11,19 km/s."],
      resultado: "11,19 km/s" },
    { id: "g10", nivel: 1,
      enunciado: "Calcula la energía potencial gravitatoria de una masa de 100 kg en la superficie de la Tierra (en 10⁹ J). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "E<sub>p</sub> (10⁹ J) =", valor: -6.256 },
      pistas: ["E<sub>p</sub> = −GMm/r."],
      pasos: ["E<sub>p</sub> = −3,986·10¹⁴·100/6,371·10⁶ = −6,256·10⁹ J."],
      resultado: "−6,256·10⁹ J" },
    { id: "g11", nivel: 1,
      enunciado: "Si en la superficie terrestre g₀ = 9,82 m/s², ¿cuánto vale g a una altura igual al radio de la Tierra?",
      check: { tipo: "num", etiqueta: "g (m/s²) =", valor: 2.455 },
      pistas: ["La distancia al centro se duplica."],
      pasos: ["r = 2R → g = g₀/4 = 9,82/4 = 2,455 m/s²."],
      resultado: "2,455 m/s²" },
    { id: "g12", nivel: 1,
      enunciado: "La Tierra atrae a la Luna con una fuerza F. ¿Con qué fuerza atrae la Luna a la Tierra?",
      check: { tipo: "opcion", etiqueta: "La fuerza de la Luna sobre la Tierra es", opciones: ["igual a F, y de sentido opuesto", "mayor que F", "menor que F, porque la Luna tiene menos masa", "nula"], ok: 0 },
      pistas: ["Tercera ley de Newton."],
      pasos: ["Son un par acción-reacción: mismo módulo, misma dirección, sentido opuesto, aplicadas en cuerpos distintos."],
      resultado: "igual, de sentido opuesto" },

    // ================= ★★ medio =================
    { id: "g13", nivel: 2,
      enunciado: "Calcula la fuerza con que se atraen la Tierra (5,972·10²⁴ kg) y la Luna (7,342·10²² kg), separadas 3,844·10⁸ m. Da el resultado en 10²⁰ N.",
      check: { tipo: "num", etiqueta: "F (10²⁰ N) =", valor: 1.98 },
      pistas: ["Ley de gravitación universal."],
      pasos: ["F = 6,674·10⁻¹¹·5,972·10²⁴·7,342·10²²/(3,844·10⁸)² = 2,926·10³⁷/1,478·10¹⁷", "F = 1,98·10²⁰ N."],
      resultado: "1,98·10²⁰ N" },
    { id: "g14", nivel: 2,
      enunciado: "Calcula el valor de g a 400 km de altura sobre la superficie de la Tierra (GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m).",
      check: { tipo: "num", etiqueta: "g (m/s²) =", valor: 8.69 },
      pistas: ["r = R + h = 6,771·10⁶ m."],
      pasos: ["g = 3,986·10¹⁴/(6,771·10⁶)² = 3,986·10¹⁴/4,585·10¹³ = 8,69 m/s²."],
      resultado: "8,69 m/s²" },
    { id: "g15", nivel: 2,
      enunciado: "Calcula el peso de un astronauta de 80 kg a 400 km de altura sobre la Tierra (usa g = 8,69 m/s²). ¿Por qué entonces se dice que «flota»? (Peso en N)",
      check: { tipo: "num", etiqueta: "Peso (N) =", valor: 695.2 },
      pistas: ["P = m·g, con el g de esa altura."],
      pasos: ["P = 80·8,69 = 695 N, casi igual que en la superficie (785 N).", "Flota porque él y la nave están en caída libre: peso aparente nulo."],
      resultado: "≈ 695 N" },
    { id: "g16", nivel: 2,
      enunciado: "Marte tiene M = 6,417·10²³ kg y R = 3,3895·10⁶ m. Calcula la gravedad en su superficie (m/s²) y la velocidad de escape (km/s).",
      check: [{ tipo: "num", etiqueta: "g (m/s²) =", valor: 3.728 }, { tipo: "num", etiqueta: "v<sub>e</sub> (km/s) =", valor: 5.027 }],
      pistas: ["g = GM/R² y v<sub>e</sub> = √(2GM/R)."],
      pasos: ["GM = 6,674·10⁻¹¹·6,417·10²³ = 4,283·10¹³ m³/s².", "g = 4,283·10¹³/(3,3895·10⁶)² = 3,728 m/s².", "v<sub>e</sub> = √(2·4,283·10¹³/3,3895·10⁶) = 5027 m/s."],
      resultado: "3,73 m/s² y 5,03 km/s" },
    { id: "g17", nivel: 2,
      enunciado: "Júpiter orbita a 5,2 UA del Sol. Calcula su periodo en años (con la tercera ley de Kepler, tomando la Tierra como referencia).",
      check: { tipo: "num", etiqueta: "T (años) =", valor: 11.86 },
      pistas: ["T = a<sup>3/2</sup> en años cuando a está en UA."],
      pasos: ["T = 5,2<sup>3/2</sup> = 5,2·√5,2 = 5,2·2,280 = 11,86 años."],
      resultado: "11,86 años" },
    { id: "g18", nivel: 2,
      enunciado: "La Tierra orbita a a = 1,496·10¹¹ m con T = 3,156·10⁷ s. Calcula la masa del Sol (en 10³⁰ kg).",
      check: { tipo: "num", etiqueta: "M (10³⁰ kg) =", valor: 1.988 },
      pistas: ["M = 4π²a³/(G·T²)."],
      pasos: ["a³ = 3,348·10³³ m³; T² = 9,960·10¹⁴ s².", "M = 4π²·3,348·10³³/(6,674·10⁻¹¹·9,960·10¹⁴) = 1,988·10³⁰ kg."],
      resultado: "1,988·10³⁰ kg" },
    { id: "g19", nivel: 2,
      enunciado: "Calcula, para un satélite geoestacionario (T = 86 164 s), el radio de la órbita (10⁷ m), su altura sobre la superficie (10⁷ m) y su velocidad (km/s). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: [{ tipo: "num", etiqueta: "r (10⁷ m) =", valor: 4.216 }, { tipo: "num", etiqueta: "h (10⁷ m) =", valor: 3.579 }, { tipo: "num", etiqueta: "v (km/s) =", valor: 3.075 }],
      pistas: ["r³ = GM·T²/(4π²)."],
      pasos: ["r³ = 3,986·10¹⁴·(86 164)²/(4π²) = 7,495·10²² → r = 4,216·10⁷ m.", "h = r − R = 3,579·10⁷ m.", "v = 2πr/T = 3075 m/s."],
      resultado: "4,216·10⁷ m · 3,579·10⁷ m · 3,075 km/s" },
    { id: "g20", nivel: 2,
      enunciado: "En el afelio la Tierra está a 1,521·10¹¹ m del Sol y se mueve a 29,29 km/s. ¿Qué velocidad (km/s) tiene en el perihelio, a 1,471·10¹¹ m?",
      check: { tipo: "num", etiqueta: "v<sub>p</sub> (km/s) =", valor: 30.29 },
      pistas: ["Conservación del momento angular."],
      pasos: ["r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub> → v<sub>p</sub> = 29,29·1,521/1,471 = 30,29 km/s."],
      resultado: "30,29 km/s" },
    { id: "g21", nivel: 2,
      enunciado: "Un satélite de 500 kg orbita a 600 km sobre la superficie terrestre. Calcula su energía mecánica (en 10⁹ J). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "E<sub>m</sub> (10⁹ J) =", valor: -14.29 },
      pistas: ["E<sub>m</sub> = −GMm/(2r), con r = R + h."],
      pasos: ["r = 6,971·10⁶ m.", "E<sub>m</sub> = −3,986·10¹⁴·500/(2·6,971·10⁶) = −1,429·10¹⁰ J."],
      resultado: "−1,429·10¹⁰ J" },
    { id: "g22", nivel: 2,
      enunciado: "¿Qué energía (en 10⁹ J) hay que aportar al satélite del ejercicio anterior para llevarlo desde la superficie (en reposo, ignorando la rotación terrestre) hasta esa órbita?",
      check: { tipo: "num", etiqueta: "ΔE (10⁹ J) =", valor: 16.99 },
      pistas: ["E en la superficie = −GMm/R. ΔE = E<sub>m,órbita</sub> − E<sub>superficie</sub>."],
      pasos: ["E<sub>superficie</sub> = −3,986·10¹⁴·500/6,371·10⁶ = −3,128·10¹⁰ J.", "ΔE = −1,429·10¹⁰ + 3,128·10¹⁰ = 1,699·10¹⁰ J."],
      resultado: "1,70·10¹⁰ J" },
    { id: "g23", nivel: 2,
      enunciado: "¿A qué distancia del centro de la Tierra se anula el campo gravitatorio total creado por la Tierra y la Luna, en la línea que las une? (d = 3,844·10⁸ m; M<sub>L</sub>/M<sub>T</sub> = 0,01229). Da el resultado en 10⁸ m.",
      check: { tipo: "num", etiqueta: "x (10⁸ m) =", valor: 3.46 },
      pistas: ["x = d/(1 + √(M<sub>L</sub>/M<sub>T</sub>))."],
      pasos: ["√0,01229 = 0,1109.", "x = 3,844·10⁸/1,1109 = 3,46·10⁸ m."],
      resultado: "3,46·10⁸ m" },
    { id: "g24", nivel: 2,
      enunciado: "Un satélite orbita a una altura igual al radio terrestre (r = 2R<sub>T</sub>). Calcula su velocidad orbital en km/s. GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "v (km/s) =", valor: 5.593 },
      pistas: ["r = 2R = 1,2742·10⁷ m."],
      pasos: ["v = √(3,986·10¹⁴/1,2742·10⁷) = 5593 m/s."],
      resultado: "5,593 km/s" },
    { id: "g25", nivel: 2,
      enunciado: "¿A qué altura sobre la superficie terrestre g vale la novena parte de su valor en la superficie? Da el resultado en 10⁷ m (R<sub>T</sub> = 6,371·10⁶ m).",
      check: { tipo: "num", etiqueta: "h (10⁷ m) =", valor: 1.274 },
      pistas: ["g = g₀/9 ⇒ r = 3R."],
      pasos: ["(R/r)² = 1/9 → r = 3R → h = 2R = 1,2742·10⁷ m."],
      resultado: "h = 2R = 1,274·10⁷ m" },
    { id: "g26", nivel: 2,
      enunciado: "Venus tiene a = 0,723 UA y T = 0,615 años. Calcula T²/a³ (en años²/UA³) y comprueba la tercera ley.",
      check: { tipo: "num", etiqueta: "T²/a³ =", valor: 1.0008 },
      pistas: ["Eleva T al cuadrado y a al cubo."],
      pasos: ["T² = 0,3782; a³ = 0,3779.", "T²/a³ = 1,0008 ≈ 1: se cumple la tercera ley."],
      resultado: "≈ 1" },
    { id: "g27", nivel: 2,
      enunciado: "Calcula la variación de energía potencial gravitatoria de un cuerpo de 1000 kg al elevarlo desde la superficie terrestre hasta 400 km de altura (en 10⁹ J). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "ΔE<sub>p</sub> (10⁹ J) =", valor: 3.696 },
      pistas: ["ΔE<sub>p</sub> = GMm(1/R − 1/(R + h))."],
      pasos: ["ΔE<sub>p</sub> = 3,986·10¹⁷·(1,5696·10⁻⁷ − 1,4769·10⁻⁷) = 3,696·10⁹ J.", "(Con mgh = 3,92·10⁹ J, un 6 % de error.)"],
      resultado: "3,70·10⁹ J" },
    { id: "g28", nivel: 2,
      enunciado: "Calcula la aceleración centrípeta de la Luna hacia la Tierra, usando que es el campo gravitatorio terrestre a d = 3,844·10⁸ m. Da el resultado en 10⁻³ m/s².",
      check: { tipo: "num", etiqueta: "a (10⁻³ m/s²) =", valor: 2.697 },
      pistas: ["g = GM<sub>T</sub>/d²."],
      pasos: ["a = 3,986·10¹⁴/(3,844·10⁸)² = 3,986·10¹⁴/1,478·10¹⁷ = 2,70·10⁻³ m/s²."],
      resultado: "2,70·10⁻³ m/s²" },
    { id: "g29", nivel: 2,
      enunciado: "Según la segunda ley de Kepler, ¿cuándo se mueve más deprisa un planeta?",
      check: { tipo: "opcion", etiqueta: "Más deprisa en…", opciones: ["el perihelio (más cerca del Sol)", "el afelio (más lejos del Sol)", "siempre igual", "cuando el área es menor"], ok: 0 },
      pistas: ["Se conserva el momento angular."],
      pasos: ["r·v = constante en perihelio/afelio: menor r ⇒ mayor v."],
      resultado: "en el perihelio" },
    { id: "g30", nivel: 2,
      enunciado: "Si el radio de la órbita circular de un satélite se multiplica por 4, ¿por qué número se multiplica su velocidad orbital?",
      check: { tipo: "num", etiqueta: "v se multiplica por", valor: 0.5 },
      pistas: ["v = √(GM/r)."],
      pasos: ["v′ = √(GM/4r) = v/2."],
      resultado: "0,5 (se reduce a la mitad)" },

    // ================= ★★★ avanzado =================
    { id: "g31", nivel: 3,
      enunciado: "Dos masas M y 4M están separadas 3 m. ¿A qué distancia de la masa M se anula el campo gravitatorio total (punto neutro, entre ellas)?",
      check: { tipo: "num", etiqueta: "x (m) =", valor: 1 },
      pistas: ["GM/x² = G·4M/(3 − x)²."],
      pasos: ["1/x² = 4/(3 − x)² → (3 − x) = 2x → x = 1 m.", "(Con la fórmula: x = d/(1 + √4) = 3/3 = 1 m.)"],
      resultado: "1 m" },
    { id: "g32", nivel: 3,
      enunciado: "Un planeta tiene la mitad de la masa y la mitad del radio de la Tierra. ¿Cuántas veces mayor es g en su superficie que en la de la Tierra?",
      check: { tipo: "num", etiqueta: "g/g<sub>T</sub> =", valor: 2 },
      pistas: ["g ∝ M/R²."],
      pasos: ["Factor: (1/2)/(1/2)² = (1/2)·4 = 2."],
      resultado: "2" },
    { id: "g33", nivel: 3,
      enunciado: "Un planeta tiene doble masa y doble radio que la Tierra. ¿Cuál es el cociente entre su velocidad de escape y la de la Tierra?",
      check: { tipo: "num", etiqueta: "v<sub>e</sub>/v<sub>eT</sub> =", valor: 1 },
      pistas: ["v<sub>e</sub> ∝ √(M/R)."],
      pasos: ["Factor: √(2/2) = 1: la misma velocidad de escape que la Tierra."],
      resultado: "1" },
    { id: "g34", nivel: 3,
      enunciado: "Un satélite terrestre tiene un periodo de 2 h (7200 s). Calcula el radio de su órbita (10⁶ m), su altura sobre la superficie (10⁶ m) y su velocidad (km/s). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: [{ tipo: "num", etiqueta: "r (10⁶ m) =", valor: 8.059 }, { tipo: "num", etiqueta: "h (10⁶ m) =", valor: 1.688 }, { tipo: "num", etiqueta: "v (km/s) =", valor: 7.033 }],
      pistas: ["r³ = GM·T²/(4π²)."],
      pasos: ["r³ = 3,986·10¹⁴·7200²/(4π²) = 5,234·10²⁰ → r = 8,059·10⁶ m.", "h = 8,059·10⁶ − 6,371·10⁶ = 1,688·10⁶ m.", "v = 2πr/T = 7033 m/s."],
      resultado: "8,059·10⁶ m · 1,688·10⁶ m · 7,033 km/s" },
    { id: "g35", nivel: 3,
      enunciado: "La Luna tarda 27,32 días en orbitar la Tierra a una distancia media de 3,844·10⁸ m. Calcula la masa de la Tierra (en 10²⁴ kg), despreciando la masa de la Luna.",
      check: { tipo: "num", etiqueta: "M<sub>T</sub> (10²⁴ kg) =", valor: 6.03 },
      pistas: ["T = 27,32·86 400 s. M = 4π²r³/(G·T²)."],
      pasos: ["T = 2,3604·10⁶ s.", "M = 4π²·(3,844·10⁸)³/(6,674·10⁻¹¹·(2,3604·10⁶)²) = 6,03·10²⁴ kg.", "(El valor real, 5,97·10²⁴, difiere un 1 % por despreciar la masa de la Luna.)"],
      resultado: "6,03·10²⁴ kg" },
    { id: "g36", nivel: 3,
      enunciado: "Un satélite de 1000 kg pasa de una órbita circular de radio 7,0·10⁶ m a otra de 1,4·10⁷ m. ¿Qué aumento de energía mecánica (en 10¹⁰ J) deben aportar los motores?",
      check: { tipo: "num", etiqueta: "ΔE<sub>m</sub> (10¹⁰ J) =", valor: 1.423 },
      pistas: ["E<sub>m</sub> = −GMm/(2r)."],
      pasos: ["ΔE<sub>m</sub> = (GMm/2)(1/r₁ − 1/r₂) = (3,986·10¹⁷/2)(1/7·10⁶ − 1/1,4·10⁷)", "= 1,993·10¹⁷·7,143·10⁻⁸ = 1,423·10¹⁰ J."],
      resultado: "1,42·10¹⁰ J" },
    { id: "g37", nivel: 3,
      enunciado: "Se lanza verticalmente desde la superficie terrestre un objeto a 8 km/s. Calcula la altura máxima que alcanza sobre la superficie (en 10⁶ m). GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "h (10⁶ m) =", valor: 6.671 },
      pistas: ["Energía por kg: e = ½v₀² − GM/R. En el punto más alto, −GM/r<sub>máx</sub> = e."],
      pasos: ["e = 3,2·10⁷ − 6,256·10⁷ = −3,056·10⁷ J/kg.", "r<sub>máx</sub> = GM/(−e) = 1,3042·10⁷ m.", "h = r<sub>máx</sub> − R = 6,671·10⁶ m."],
      resultado: "6,67·10⁶ m" },
    { id: "g38", nivel: 3,
      enunciado: "Se suelta, desde el reposo, un objeto a una altura igual al radio terrestre (r = 2R). Calcula con qué velocidad llega a la superficie (km/s), sin rozamiento. GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6,371·10⁶ m.",
      check: { tipo: "num", etiqueta: "v (km/s) =", valor: 7.91 },
      pistas: ["Conservación de la energía: ½v² = GM(1/R − 1/2R)."],
      pasos: ["½v² = GM/(2R) → v = √(GM/R) = √(3,986·10¹⁴/6,371·10⁶) = 7910 m/s."],
      resultado: "7,91 km/s" },
    { id: "g39", nivel: 3,
      enunciado: "La Estación Espacial Internacional da una vuelta a la Tierra en 92,9 min. Calcula su altura sobre la superficie en km (GM<sub>T</sub> = 3,986·10¹⁴ m³/s², R<sub>T</sub> = 6371 km).",
      check: { tipo: "num", etiqueta: "h (km) =", valor: 423.5 },
      pistas: ["r³ = GM·T²/(4π²)."],
      pasos: ["T = 5574 s → r³ = 3,986·10¹⁴·5574²/(4π²) = 3,137·10²⁰ → r = 6,7945·10⁶ m.", "h = 6794,5 − 6371 = 423,5 km."],
      resultado: "≈ 423 km" },
    { id: "g40", nivel: 3,
      enunciado: "Calcula el radio de Schwarzschild del Sol, R = 2GM/c² (M = 1,989·10³⁰ kg, c = 2,998·10⁸ m/s), en km: el radio al que se tendría que comprimir para que la velocidad de escape fuera c.",
      check: { tipo: "num", etiqueta: "R (km) =", valor: 2.954 },
      pistas: ["v<sub>e</sub> = c → √(2GM/R) = c."],
      pasos: ["R = 2·6,674·10⁻¹¹·1,989·10³⁰/(2,998·10⁸)² = 2,655·10²⁰/8,988·10¹⁶ = 2954 m.", "= 2,95 km."],
      resultado: "2,95 km" },
    { id: "g41", nivel: 3,
      enunciado: "Ío orbita alrededor de Júpiter a 4,217·10⁸ m con un periodo de 1,769 días. Calcula la masa de Júpiter (en 10²⁷ kg).",
      check: { tipo: "num", etiqueta: "M<sub>J</sub> (10²⁷ kg) =", valor: 1.899 },
      pistas: ["T = 1,769·86 400 s = 1,5284·10⁵ s."],
      pasos: ["M = 4π²r³/(G·T²) = 4π²·(4,217·10⁸)³/(6,674·10⁻¹¹·(1,5284·10⁵)²)", "r³ = 7,499·10²⁵ m³; numerador 4π²r³ = 2,960·10²⁷; denominador G·T² = 6,674·10⁻¹¹·2,336·10¹⁰ = 1,559 → M = 1,899·10²⁷ kg."],
      resultado: "1,90·10²⁷ kg" },
    { id: "g42", nivel: 3,
      enunciado: "El cometa Halley tiene un perihelio de 0,586 UA y un afelio de 35,1 UA. Calcula su periodo en años.",
      check: { tipo: "num", etiqueta: "T (años) =", valor: 75.37 },
      pistas: ["Semieje mayor a = (r<sub>p</sub> + r<sub>a</sub>)/2."],
      pasos: ["a = (0,586 + 35,1)/2 = 17,843 UA.", "T = a<sup>3/2</sup> = 17,843·√17,843 = 75,4 años."],
      resultado: "75,4 años" },
    { id: "g43", nivel: 3,
      enunciado: "Una masa de 2·10⁹ kg está en el origen y otra de 6·10⁹ kg en (4 m, 0). Calcula las componentes del campo gravitatorio en P(0, 3 m): g<sub>x</sub> y g<sub>y</sub> en unidades de 10⁻² m/s².",
      check: [{ tipo: "num", etiqueta: "g<sub>x</sub> (10⁻² m/s²) =", valor: 1.281 }, { tipo: "num", etiqueta: "g<sub>y</sub> (10⁻² m/s²) =", valor: -2.444 }],
      pistas: ["g₁ = G·M₁/9 hacia −j; g₂ = G·M₂/25 en la dirección (4, −3)/5."],
      pasos: ["g₁ = 1,483·10⁻² (0, −1).", "g₂ = 1,602·10⁻² (0,8; −0,6) = (1,281; −0,961)·10⁻².", "Suma: (1,281; −2,444)·10⁻² m/s²."],
      resultado: "(1,281; −2,444)·10⁻² m/s²" },
    { id: "g44", nivel: 3,
      enunciado: "Un cohete sale de la superficie terrestre con 15 km/s. ¿Con qué velocidad (km/s) llegará a una distancia muy grande de la Tierra (en el infinito)? v<sub>e</sub> = 11,19 km/s.",
      check: { tipo: "num", etiqueta: "v<sub>∞</sub> (km/s) =", valor: 9.994 },
      pistas: ["v<sub>∞</sub>² = v₀² − v<sub>e</sub>²."],
      pasos: ["v<sub>∞</sub> = √(15² − 11,186²) = √(225 − 125,12) = 9,99 km/s."],
      resultado: "9,99 km/s" },
    { id: "g45", nivel: 3,
      enunciado: "Fobos orbita Marte a 9,376·10⁶ m del centro con un periodo de 7,654 h. Calcula la masa de Marte (en 10²³ kg).",
      check: { tipo: "num", etiqueta: "M (10²³ kg) =", valor: 6.42 },
      pistas: ["T = 7,654·3600 s."],
      pasos: ["T = 27 554 s.", "M = 4π²(9,376·10⁶)³/(6,674·10⁻¹¹·27 554²) = 6,42·10²³ kg."],
      resultado: "6,42·10²³ kg" },
    { id: "g46", nivel: 3,
      enunciado: "Explica por qué los astronautas de la Estación Espacial Internacional flotan, aunque la gravedad a esa altura sea casi igual que en la superficie. Redáctalo como en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu explicación", filas: 6, items: [
        { t: "Indica que a 400 km g sigue siendo ≈ 8,7 m/s² (el 88 % del valor en la superficie): no hay ausencia de gravedad", p: 0.5 },
        { t: "Explica que la gravedad es la fuerza centrípeta que mantiene la órbita: nave y astronautas están en caída libre", p: 0.5 },
        { t: "Dice que todos caen con la misma aceleración, por lo que no hay fuerza normal entre ellos y la nave", p: 0.5 },
        { t: "Concluye que el peso aparente es cero (ingravidez aparente)", p: 0.5 }
      ] },
      pasos: ["g a 420 km = GM/(R + h)² ≈ 8,7 m/s²: la gravedad existe.", "La atracción de la Tierra hace de fuerza centrípeta: la estación «cae» continuamente alrededor de la Tierra.", "Estación y astronautas caen con la misma aceleración: no se empujan mutuamente (N = 0)", "Peso aparente nulo → parecen flotar."],
      resultado: "Flotan por caída libre continua, no por falta de gravedad." },
    { id: "g47", nivel: 3,
      enunciado: "Deduce la tercera ley de Kepler (T² = 4π²r³/(GM)) para una órbita circular a partir de la ley de gravitación universal.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 6, items: [
        { t: "Plantea que la fuerza gravitatoria GMm/r² es la fuerza centrípeta mv²/r", p: 0.5 },
        { t: "Cancela la masa m del satélite y despeja v² = GM/r", p: 0.5 },
        { t: "Usa v = 2πr/T para relacionar velocidad y periodo", p: 0.5 },
        { t: "Llega a T² = 4π²r³/(GM) e indica que k depende sólo de M", p: 0.5 }
      ] },
      pasos: ["GMm/r² = mv²/r → v² = GM/r.", "v = 2πr/T → 4π²r²/T² = GM/r.", "T² = 4π²r³/(GM) = k·r³. ∎"],
      resultado: "T² = 4π²r³/(GM)" },
    { id: "g48", nivel: 3,
      enunciado: "Demuestra que la velocidad de escape desde la superficie de un cuerpo es √2 veces su velocidad orbital rasante.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Obtiene la velocidad orbital rasante v<sub>o</sub> = √(GM/R)", p: 0.5 },
        { t: "Obtiene la velocidad de escape con E<sub>m</sub> = 0: v<sub>e</sub> = √(2GM/R)", p: 0.5 },
        { t: "Divide: v<sub>e</sub>/v<sub>o</sub> = √2 ≈ 1,41", p: 0.5 },
        { t: "Comenta que en la órbita E<sub>m</sub> = −GMm/2R, y que hay que añadir GMm/2R para escapar", p: 0.5 }
      ] },
      pasos: ["v<sub>o</sub>² = GM/R; v<sub>e</sub>² = 2GM/R.", "v<sub>e</sub>²/v<sub>o</sub>² = 2 → v<sub>e</sub> = √2·v<sub>o</sub> = 1,414·v<sub>o</sub>.", "Tierra: 7,91·1,414 = 11,19 km/s ✓."],
      resultado: "v<sub>e</sub> = √2·v<sub>o</sub>" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Fuerza y campo gravitatorio", ancha: true,
      tabla: { cab: ["Magnitud", "Fórmula", "Unidad / nota"], filas: [
        ["Fuerza de gravitación", "F = G·m₁m₂/r²", "N · atractiva y central · r entre centros"],
        ["Campo gravitatorio", "g = GM/r²", "N/kg = m/s² · hacia el centro"],
        ["Superficie / altura h", "g₀ = GM/R² · g(h) = GM/(R + h)²", "g(h) = g₀·R²/(R + h)²"],
        ["Peso", "P = m·g", "N (la masa no cambia)"],
        ["Masa del cuerpo central", "M = gR²/G", "pesar un planeta"]
      ] },
      nota: "G = 6,674·10⁻¹¹ N·m²/kg² · M<sub>T</sub> = 5,972·10²⁴ kg · R<sub>T</sub> = 6,371·10⁶ m · GM<sub>T</sub> = 3,986·10¹⁴ m³/s² · g₀ = 9,82 m/s²." },
    { titulo: "Datos de cuerpos del sistema solar", ancha: true,
      tabla: { cab: ["Cuerpo", "g₀ (m/s²)", "v<sub>escape</sub> (km/s)", "a (UA)", "T (años)"], filas: [
        ["Mercurio", "3,70", "4,25", "0,387", "0,241"], ["Venus", "8,87", "10,36", "0,723", "0,615"], ["Tierra", "9,82", "11,19", "1,000", "1,000"], ["Marte", "3,73", "5,03", "1,524", "1,881"],
        ["Júpiter", "25,9", "60,2", "5,204", "11,86"], ["Saturno", "11,2", "36,1", "9,582", "29,46"], ["Luna", "1,62", "2,38", "—", "27,3 d"], ["Sol", "274", "617,8", "—", "—"]
      ] },
      nota: "g₀ ∝ M/R² · v<sub>e</sub> ∝ √(M/R)." },
    { titulo: "Leyes de Kepler",
      items: [
        { label: "1.ª", formula: "órbita elíptica, Sol en un foco", cuando: "r<sub>p</sub> = a(1 − e), r<sub>a</sub> = a(1 + e)" },
        { label: "2.ª", formula: "dA/dt = constante · r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>", cuando: "perihelio: más rápido" },
        { label: "3.ª", formula: "T² = 4π²a³/(GM) = k·a³", cuando: "Sol, en UA y años: T² = a³", ejemplo: "a = 4 UA → T = 8 años" }
      ],
      nota: "Cociente de dos órbitas: T₁²/T₂² = a₁³/a₂³ (no necesita G ni M)." },
    { titulo: "Energía gravitatoria",
      items: [
        { label: "Energía potencial", formula: "E<sub>p</sub> = −GMm/r", cuando: "cero en el infinito; negativa" },
        { label: "Potencial", formula: "V = −GM/r  (J/kg)" },
        { label: "Variación de E<sub>p</sub>", formula: "ΔE<sub>p</sub> = GMm(1/r₁ − 1/r₂)", ojo: "Sólo ΔE<sub>p</sub> ≈ mgh si h ≪ R." },
        { label: "Conservación", formula: "½mv² − GMm/r = constante" }
      ] },
    { titulo: "Órbita circular", ancha: true,
      tabla: { cab: ["Magnitud", "Fórmula", "Al subir r"], filas: [
        ["Velocidad", "v = √(GM/r)", "baja"], ["Periodo", "T = 2π√(r³/GM)", "sube"], ["Energía cinética", "E<sub>c</sub> = GMm/2r", "baja"],
        ["Energía potencial", "E<sub>p</sub> = −GMm/r", "sube"], ["Energía mecánica", "E<sub>m</sub> = −GMm/2r", "sube (menos negativa)"]
      ] },
      nota: "Relaciones: E<sub>c</sub> = −E<sub>m</sub> · E<sub>p</sub> = 2E<sub>m</sub>. No dependen de la masa del satélite (v y T)." },
    { titulo: "Escape y tipo de órbita",
      items: [
        { label: "Velocidad de escape", formula: "v<sub>e</sub> = √(2GM/R) = √2·v<sub>orb,rasante</sub>", ejemplo: "Tierra: 11,19 km/s" },
        { label: "E<sub>m</sub> &lt; 0", formula: "órbita cerrada (elipse, círculo)" },
        { label: "E<sub>m</sub> = 0", formula: "parábola (justo escapa)" },
        { label: "E<sub>m</sub> &gt; 0", formula: "hipérbola: v<sub>∞</sub> = √(v₀² − v<sub>e</sub>²)" }
      ] },
    { titulo: "Órbitas de la Tierra", ancha: true,
      tabla: { cab: ["Órbita", "Altura", "v", "Periodo"], filas: [
        ["ISS (LEO)", "420 km", "7,66 km/s", "92,8 min"], ["GPS (MEO)", "20 200 km", "3,87 km/s", "11 h 58 min"], ["Geoestacionaria", "35 786 km", "3,07 km/s", "23 h 56 min"], ["Luna", "378 000 km", "1,02 km/s", "27,3 d"]
      ] },
      nota: "Geoestacionaria: plano ecuatorial, r = 4,22·10⁷ m." },
    { titulo: "Cómo cambian las magnitudes (proporciones)",
      items: [
        { label: "Si r × 2", formula: "F ÷ 4 · g ÷ 4 · v ÷ √2 · T × 2√2" },
        { label: "Si M × a, R × b", formula: "g × a/b² · v<sub>e</sub> × √(a/b)" },
        { label: "Si m (satélite) × k", formula: "v, T no cambian · E × k" }
      ] },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Usar r = h (400 km) en g = GM/r²", bien: "r = R + h", por: "La distancia es al centro." },
        { mal: "Fuerza menor sobre la masa pequeña", bien: "Iguales (3.ª ley de Newton)", por: "Cambia la aceleración, no la fuerza." },
        { mal: "En la ISS no hay gravedad", bien: "Hay ≈ 88 %: caída libre continua", por: "El peso aparente es nulo." },
        { mal: "E<sub>m</sub> orbital = +GMm/2r", bien: "E<sub>m</sub> = −GMm/2r", por: "Está ligado: E &lt; 0." },
        { mal: "v orbital depende de la masa del satélite", bien: "Sólo de M y r", por: "La masa m se cancela." },
        { mal: "Altura máxima = v²/2g a gran altura", bien: "Usar conservación con −GMm/r", por: "g no es constante." }
      ] }
  ];

  B.registrar("fyq1", "t11", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
