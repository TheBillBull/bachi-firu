/* ============================================================
   Matemáticas I · ampliaciones · Tema 4: Trigonometría
   (razones y resolución de triángulos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t4/" + ref); }

  var resumen = [
    "En un triángulo rectángulo: <b>sen α = opuesto/hipotenusa</b>, <b>cos α = adyacente/hipotenusa</b>, <b>tan α = opuesto/adyacente</b>. La razón sólo depende del ángulo, no del tamaño.",
    "Los ángulos se miden en grados o en <b>radianes</b> (π rad = 180°). En la circunferencia de radio 1, el punto de ángulo θ es <b>(cos θ, sen θ)</b>.",
    "<b>sen²θ + cos²θ = 1</b>. Valores a saber: sen 30° = 1/2, sen 45° = √2/2, sen 60° = √3/2 (y los cosenos, al revés).",
    "Cualquier ángulo se <b>reduce al primer cuadrante</b> con su ángulo de referencia y el signo del cuadrante.",
    "<b>Teorema del seno</b>: a/sen A = b/sen B = c/sen C. <b>Teorema del coseno</b>: a² = b² + c² − 2bc·cos A.",
    "¿Cuál usar? Ángulo opuesto a un lado conocido → seno (¡cuidado con el caso ambiguo!). Dos lados y el ángulo entre ellos, o tres lados → coseno. Área = ½·b·c·sen A."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Ángulos y razones
  secciones[0] =
    "<h5>Medir ángulos: grados, minutos y segundos</h5>" +
    "<p>Un grado (1°) se divide en 60 minutos (60′) y un minuto en 60 segundos (60″), igual que las horas. Las calculadoras trabajan con decimales, así que hay que saber pasar de un sistema al otro:</p>" +
    "<ul><li><b>De grados-minutos a decimal</b>: 35° 27′ = 35 + 27/60 = 35,45°.</li>" +
    "<li><b>De decimal a grados-minutos</b>: 12,3° → 12° y 0,3° = 0,3·60′ = 18′, es decir, 12° 18′.</li></ul>" +
    "<p>Dos nombres que se usan mucho: ángulos <b>complementarios</b> son los que suman 90°, y <b>suplementarios</b> los que suman 180°. En todo triángulo los tres ángulos suman 180°; por eso, en un triángulo rectángulo, los dos ángulos agudos son complementarios.</p>" +
    "<h5>Las tres razones y cómo no confundirlas</h5>" +
    "<p>Siempre se nombran desde el ángulo α que miras: el <b>opuesto</b> es el cateto que no toca a α, el <b>adyacente</b> el cateto que sí lo toca, y la <b>hipotenusa</b> el lado largo. Un truco para recordar las fórmulas en el orden correcto es la frase <b>SOH · CAH · TOA</b> (<i>Seno = Opuesto/Hipotenusa, Coseno = Adyacente/Hipotenusa, Tangente = Opuesto/Adyacente</i>). Como la hipotenusa es siempre el lado más largo, el seno y el coseno de un ángulo agudo siempre están entre 0 y 1; la tangente, en cambio, puede valer cualquier número positivo.</p>" +
    "<p>Mira qué pasa si cambias el tamaño del triángulo sin cambiar el ángulo:</p>" +
    w("rectangulo") +
    "<h5>Las razones inversas</h5>" +
    "<p>A veces se usan sus inversos: la <b>cosecante</b> cosec α = 1/sen α, la <b>secante</b> sec α = 1/cos α y la <b>cotangente</b> cotan α = 1/tan α = cos α/sen α. No son nuevas razones, solo escrituras cómodas (aparecerán, por ejemplo, en la relación 1 + tan²α = 1/cos²α).</p>" +
    "<h5>Resolver triángulos rectángulos</h5>" +
    "<p>«Resolver» un triángulo es calcular todos sus lados y ángulos. En uno rectángulo basta con conocer <b>dos datos</b> (aparte del ángulo recto) y que uno sea un lado. El método: dibuja, rotula (opuesto, adyacente, hipotenusa respecto del ángulo que uses) y elige la razón que relaciona lo que tienes con lo que buscas.</p>" +
    ejemplo("Hipotenusa y un ángulo", "En un triángulo rectángulo la hipotenusa mide 12 y un ángulo agudo mide 35°. Resuélvelo.", [
      "El otro ángulo agudo es 90° − 35° = <b>55°</b>.",
      "El cateto opuesto a 35°: sen 35° = opuesto/12 → opuesto = 12·sen 35° = 12·0,5736 = <b>6,88</b>.",
      "El cateto adyacente: cos 35° = adyacente/12 → adyacente = 12·cos 35° = 12·0,8192 = <b>9,83</b>.",
      "Comprobación con Pitágoras: 6,88² + 9,83² = 47,4 + 96,6 = 144 = 12² ✓."
    ]) +
    ejemplo("Dos catetos", "Los catetos de un triángulo rectángulo miden 5 y 12. Calcula la hipotenusa y los ángulos.", [
      "Hipotenusa: √(5² + 12²) = √169 = <b>13</b>.",
      "El ángulo α opuesto al cateto de 5: tan α = 5/12 = 0,4167 → α = arctan(0,4167) = <b>22,62°</b> (en la calculadora, la tecla tan⁻¹).",
      "El otro ángulo es 90° − 22,62° = <b>67,38°</b>."
    ]) +
    ejemplo("Cateto y ángulo", "Un cateto adyacente mide 8 y el ángulo es 40°. Halla el cateto opuesto y la hipotenusa.", [
      "Opuesto: tan 40° = opuesto/8 → opuesto = 8·tan 40° = 8·0,8391 = <b>6,71</b>.",
      "Hipotenusa: cos 40° = 8/hipotenusa → hipotenusa = 8/cos 40° = 8/0,7660 = <b>10,44</b>."
    ]) +
    "<h5>Ángulos de elevación y de depresión</h5>" +
    "<p>El <b>ángulo de elevación</b> es el que forma la horizontal con la visual hacia un punto <i>más alto</i> que el observador; el de <b>depresión</b>, hacia uno más bajo. Los dos se miden respecto de la horizontal (nunca de la vertical). Casi todos los problemas de altura y distancia son un triángulo rectángulo con el ángulo en el suelo.</p>" +
    ejemplo("La pendiente de una carretera", "Una señal indica «pendiente del 8 %». ¿Qué ángulo forma la carretera con la horizontal? Y una rampa de 10° de inclinación, ¿qué porcentaje de pendiente tiene?", [
      "Una pendiente del 8 % significa que se sube 8 m por cada 100 m <i>en horizontal</i>: tan α = 8/100 = 0,08 → α = arctan 0,08 = <b>4,57°</b>.",
      "Con 10°: pendiente = tan 10° = 0,1763 → <b>17,6 %</b>. (La pendiente no es el seno: 100 m «de carretera» no son 100 m en horizontal.)"
    ]) +
    ejemplo("Una escalera", "Una escalera de 5 m se apoya en una pared formando 65° con el suelo. ¿A qué altura llega y a qué distancia de la pared está su pie?", [
      "La escalera es la hipotenusa (5 m) y el ángulo con el suelo es 65°.",
      "Altura (cateto opuesto): 5·sen 65° = 5·0,9063 = <b>4,53 m</b>. Distancia (adyacente): 5·cos 65° = 5·0,4226 = <b>2,11 m</b>."
    ]) +
    ojo("la calculadora tiene dos modos para los ángulos, <b>DEG</b> (grados) y <b>RAD</b> (radianes). Si trabajas en grados y está en RAD, sen 30 te dará −0,988 en lugar de 0,5. Mira siempre la «D» o la «DEG» de la pantalla antes de empezar. Y para calcular un ángulo a partir de una razón usa las teclas sin⁻¹, cos⁻¹ y tan⁻¹ (por ejemplo, sin⁻¹(0,6) = 36,87°).");

  // ---------------------------------------------------------------- 2. Circunferencia goniométrica y radianes
  secciones[1] =
    "<h5>Por qué el punto es (cos θ, sen θ)</h5>" +
    "<p>Si el radio es 1, el triángulo rectángulo que forma el punto de la circunferencia con el eje X tiene hipotenusa 1. Entonces cos θ = adyacente/1 = <b>abscisa</b> del punto y sen θ = opuesto/1 = <b>ordenada</b>. Lo bueno es que esa definición ya <i>no necesita un triángulo</i>: tiene sentido para cualquier ángulo, también mayor de 90°, negativo o de varias vueltas. Y la tangente es la longitud del segmento que la visual de θ recorta sobre la recta vertical x = 1 (de ahí su nombre: es el trozo de tangente a la circunferencia). Arrastra el punto rojo:</p>" +
    w("goniometrica") +
    "<h5>Ángulos negativos y de más de una vuelta</h5>" +
    "<p>Los ángulos <b>positivos</b> se miden en sentido contrario a las agujas del reloj, y los <b>negativos</b> en el sentido de las agujas: −60° es lo mismo que 300°. Pasar una vuelta completa (360°) no cambia el punto: <b>sen(θ + 360°·k) = sen θ</b> y lo mismo para el coseno y la tangente (esta última se repite incluso cada 180°). Se dice que son funciones <b>periódicas</b>. Por eso, 1110° = 3·360° + 30° tiene las mismas razones que 30°.</p>" +
    "<h5>Cuándo es positiva cada razón</h5>" +
    "<p>Por las coordenadas del punto: el seno es positivo arriba (cuadrantes I y II), el coseno es positivo a la derecha (I y IV) y la tangente, cociente de los dos, es positiva cuando seno y coseno tienen el mismo signo (I y III). Una regla para recordarlo, recorriendo los cuadrantes I, II, III y IV: <b>«Todas, Seno, Tangente, Coseno»</b>: en el I son positivas todas, en el II sólo el seno, en el III sólo la tangente y en el IV sólo el coseno.</p>" +
    tabla(["Cuadrante", "Ángulos", "sen", "cos", "tan"], [
      ["I", "0° – 90°", "+", "+", "+"], ["II", "90° – 180°", "+", "−", "−"], ["III", "180° – 270°", "−", "−", "+"], ["IV", "270° – 360°", "−", "+", "−"]
    ]) +
    "<p>En los ejes: tan 90° y tan 270° <b>no existen</b> (el coseno vale 0 y no se puede dividir entre 0); en esos ángulos la visual es vertical y nunca corta a la recta x = 1.</p>" +
    "<h5>Radianes: otra manera de medir ángulos</h5>" +
    "<p>Los grados son un invento antiguo (360 viene de los babilonios y su sistema de base 60). Para hacer matemáticas con ángulos se usa la unidad que simplifica todas las fórmulas: el <b>radián</b>. Un radián es el ángulo que, en cualquier circunferencia, abarca un arco <b>de longitud igual al radio</b>. Como la circunferencia mide 2πr, caben 2π radios en ella: una vuelta completa son <b>2π rad</b> y media vuelta <b>π rad</b>. De ahí sale toda la conversión:</p>" +
    H.formula("180° = π rad        grados × π/180 = radianes        radianes × 180/π = grados") +
    w("radianes") +
    tabla(["Grados", "0°", "30°", "45°", "60°", "90°", "120°", "135°", "150°", "180°", "270°", "360°"], [
      ["Radianes", "0", "π/6", "π/4", "π/3", "π/2", "2π/3", "3π/4", "5π/6", "π", "3π/2", "2π"]
    ]) +
    "<p>Los radianes hacen muy cómodo el cálculo de arcos y sectores: la <b>longitud de un arco</b> es <b>s = θ·r</b> y el <b>área de un sector</b> es <b>A = ½·r²·θ</b> (con θ en radianes). Con grados las dos fórmulas se llenan de factores π/180.</p>" +
    ejemplo("Conversiones y arco", "Pasa 135° a radianes y 5π/6 rad a grados. Después calcula la longitud del arco de un ángulo de 2 rad en una circunferencia de 5 cm de radio, y el área de ese sector.", [
      "135° · π/180 = 135π/180 = <b>3π/4 rad</b> (≈ 2,356 rad).",
      "5π/6 · 180/π = 5·180/6 = <b>150°</b> (el π se cancela).",
      "Arco: s = θ·r = 2·5 = <b>10 cm</b>. Sector: A = ½·r²·θ = ½·25·2 = <b>25 cm²</b>."
    ]) +
    ojo("«π» no vale 3,14 en las respuestas exactas: 3π/4 rad es una cantidad exacta y 2,36 es su aproximación. Y no mezcles unidades: si escribes sen(π/6) debes poner la calculadora en RAD y sen(30°) en DEG; ambas valen 0,5.");

  // ---------------------------------------------------------------- 3. Relación fundamental y notables
  secciones[2] =
    "<h5>De dónde salen los valores notables</h5>" +
    "<p>No son números que haya que «creer»: se pueden deducir con Pitágoras en dos triángulos muy sencillos.</p>" +
    "<ul><li><b>El cuadrado de lado 1 cortado por su diagonal</b>: es un triángulo rectángulo isósceles de catetos 1 e hipotenusa √2 (Pitágoras: 1 + 1 = 2). Los ángulos son 45° y 45°, así que sen 45° = 1/√2 = <b>√2/2</b>, cos 45° = √2/2 y tan 45° = 1.</li>" +
    "<li><b>El triángulo equilátero de lado 2 cortado por su altura</b>: queda un triángulo rectángulo de hipotenusa 2, un cateto 1 (la mitad de la base) y el otro √(4 − 1) = √3 (la altura). Los ángulos son 30° (frente al cateto 1) y 60° (frente a √3). Entonces sen 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3 = <b>√3/3</b>; sen 60° = √3/2, cos 60° = 1/2 y tan 60° = <b>√3</b>.</li></ul>" +
    "<h5>Una regla para no memorizar nada</h5>" +
    "<p>Los senos de 0°, 30°, 45°, 60° y 90° son <b>√0/2, √1/2, √2/2, √3/2 y √4/2</b> (es decir, 0, 1/2, √2/2, √3/2, 1). Los cosenos son los mismos números en orden inverso. La tangente es sen/cos.</p>" +
    tabla(["", "0°", "30°", "45°", "60°", "90°"], [
      ["sen", "0", "1/2", "√2/2", "√3/2", "1"],
      ["cos", "1", "√3/2", "√2/2", "1/2", "0"],
      ["tan", "0", "√3/3", "1", "√3", "no existe"]
    ]) +
    "<h5>Usar la relación fundamental para hallar las demás razones</h5>" +
    "<p>Si conoces <b>una</b> razón y el <b>cuadrante</b>, puedes calcular las demás con sen²α + cos²α = 1. El cuadrante decide el signo de la raíz cuadrada que aparece. Además, dividiendo la relación fundamental entre cos²α se obtiene otra muy útil: <b>1 + tan²α = 1/cos²α</b>.</p>" +
    ejemplo("Conozco el seno", "Si sen α = 3/5 y α está en el 2.º cuadrante, calcula cos α y tan α.", [
      "cos²α = 1 − sen²α = 1 − 9/25 = 16/25 → cos α = ±4/5.",
      "En el 2.º cuadrante el coseno es negativo: <b>cos α = −4/5</b>.",
      "tan α = sen α/cos α = (3/5)/(−4/5) = <b>−3/4</b>."
    ]) +
    ejemplo("Conozco la tangente", "Si tan α = 2 y α está en el 3.er cuadrante, calcula sen α y cos α.", [
      "1 + tan²α = 1/cos²α → 1 + 4 = 5 = 1/cos²α → cos²α = 1/5 → cos α = ±1/√5 = ±√5/5.",
      "En el 3.er cuadrante, seno y coseno son negativos: <b>cos α = −√5/5 ≈ −0,447</b>.",
      "sen α = tan α·cos α = 2·(−√5/5) = <b>−2√5/5 ≈ −0,894</b>. Comprobación: 0,2 + 0,8 = 1 ✓."
    ]) +
    ejemplo("Otra versión: el coseno", "Si cos α = −5/13 y α está en el 3.er cuadrante, calcula sen α y tan α.", [
      "sen²α = 1 − 25/169 = 144/169 → sen α = ±12/13. En el 3.er cuadrante es negativo: <b>sen α = −12/13</b>.",
      "tan α = (−12/13)/(−5/13) = <b>12/5</b> (positiva en el 3.er cuadrante, como debe ser)."
    ]) +
    ojo("al despejar con la relación fundamental, la raíz cuadrada da <b>dos</b> valores, ± el número. No olvides quedarte con el signo que corresponde al cuadrante; con un ángulo agudo, ambos son positivos.");

  // ---------------------------------------------------------------- 4. Reducción
  secciones[3] =
    "<h5>El método en cuatro pasos (sirve para cualquier ángulo)</h5>" +
    "<ol><li><b>Reduce a una vuelta</b>: resta o suma 360° hasta quedar entre 0° y 360° (o 2π en radianes).</li><li><b>Identifica el cuadrante</b> y apunta el signo de la razón que te piden (con la regla «Todas, Seno, Tangente, Coseno»).</li><li><b>Halla el ángulo de referencia</b>: el ángulo agudo que forma el lado final con el eje horizontal. Es α en 180° − α, 180° + α o 360° − α.</li><li><b>Calcula</b> la razón del ángulo de referencia (valor notable) y pon el signo del paso 2.</li></ol>" +
    w("reductor") +
    ejemplo("Cuatro reducciones", "Calcula el valor exacto de sen 210°, cos 315°, tan 120° y sen 1110°.", [
      "<b>sen 210°</b>: está en el 3.er cuadrante (seno negativo) y 210° = 180° + 30°, así que el ángulo de referencia es 30°. sen 210° = −sen 30° = <b>−1/2</b>.",
      "<b>cos 315°</b>: 4.º cuadrante (coseno positivo), 315° = 360° − 45°. cos 315° = cos 45° = <b>√2/2</b>.",
      "<b>tan 120°</b>: 2.º cuadrante (tangente negativa), 120° = 180° − 60°. tan 120° = −tan 60° = <b>−√3</b>.",
      "<b>sen 1110°</b>: 1110° − 3·360° = 1110° − 1080° = 30°. sen 1110° = sen 30° = <b>1/2</b>."
    ]) +
    ejemplo("Con radianes y ángulos negativos", "Calcula sen(11π/6), cos(−60°) y cos(7π/3).", [
      "11π/6 está justo antes de 2π: 2π − π/6, en el 4.º cuadrante (seno negativo). sen(11π/6) = −sen(π/6) = <b>−1/2</b>.",
      "cos(−60°) = cos 60° = <b>1/2</b> (el coseno es una función <i>par</i>: cos(−α) = cos α).",
      "7π/3 = 2π + π/3. Quitamos una vuelta: cos(7π/3) = cos(π/3) = <b>1/2</b>."
    ]) +
    "<h5>Todas las equivalencias en una tabla</h5>" +
    tabla(["Ángulo", "sen", "cos", "tan"], [
      ["180° − α", "+ sen α", "− cos α", "− tan α"], ["180° + α", "− sen α", "− cos α", "+ tan α"], ["360° − α  (ó −α)", "− sen α", "+ cos α", "− tan α"],
      ["90° − α  (complementario)", "+ cos α", "+ sen α", "+ 1/tan α"], ["90° + α", "+ cos α", "− sen α", "− 1/tan α"]
    ]) +
    "<p>Las dos últimas filas son las que mezclan seno y coseno: el seno de un ángulo es el coseno de su <b>complementario</b>. Por ejemplo, sen 70° = cos 20°. Para entenderlas basta recordar que en el triángulo rectángulo, el cateto opuesto a α es el adyacente de 90° − α.</p>" +
    "<h5>Ángulos con una razón dada: dos soluciones por vuelta</h5>" +
    "<p>Con lo anterior, puedes responder a «¿para qué ángulos sen x = 1/2?» (esto es una ecuación trigonométrica; la estudiarás a fondo en el Tema 5). En una vuelta hay <b>dos</b> ángulos con el mismo seno: el de referencia y su suplementario. Con sen x = 1/2: x = 30° y x = 150°. Con cos x = 1/2: x = 60° y x = 300°, y con tan x = 1: x = 45° y x = 225°.</p>" +
    ojo("al pedir arcsen, la calculadora devuelve siempre un solo ángulo (entre −90° y 90°). Pero un seno positivo también corresponde al 2.º cuadrante: sen⁻¹(0,5) = 30° y también hay solución en 150°. Haz siempre el dibujo del cuadrante.");

  // ---------------------------------------------------------------- 5. Teorema del seno
  secciones[4] =
    "<h5>De dónde sale</h5>" +
    "<p>Dibuja una altura <b>h</b> desde el vértice C sobre el lado c. Forma dos triángulos rectángulos: en uno, h = b·sen A; en el otro, h = a·sen B. Igualando: b·sen A = a·sen B → <b>a/sen A = b/sen B</b>. Repitiendo con otra altura se obtiene la tercera igualdad. Además, ese cociente común tiene un significado geométrico bonito: es el <b>diámetro de la circunferencia circunscrita</b>:</p>" +
    H.formula(fr("a", "sen A") + " = " + fr("b", "sen B") + " = " + fr("c", "sen C") + " = 2R") +
    "<p>Por ejemplo, si un lado mide 10 y el ángulo opuesto es 30°, entonces 2R = 10/sen 30° = 20 y el radio de la circunferencia circunscrita es R = 10.</p>" +
    "<h5>Cuándo se usa</h5>" +
    "<p>Hace falta conocer <b>un lado y su ángulo opuesto</b> (la «pareja» conocida) y un dato más. Hay dos situaciones típicas:</p>" +
    "<ul><li><b>Dos ángulos y un lado</b> (ALA o AAL): el tercer ángulo sale de la suma de 180°, y luego el teorema da los otros dos lados. Siempre hay una única solución.</li>" +
    "<li><b>Dos lados y el ángulo opuesto a uno de ellos</b> (LLA): se calcula el seno del otro ángulo… y aquí aparece un problema, el <b>caso ambiguo</b>.</li></ul>" +
    ejemplo("Dos ángulos y un lado", "Resuelve el triángulo con A = 40°, B = 65° y c = 12.", [
      "Tercer ángulo: C = 180° − 40° − 65° = <b>75°</b>.",
      "Parejas: c/sen C = 12/sen 75° = 12/0,9659 = 12,423.",
      "a = 12,423·sen 40° = 12,423·0,6428 = <b>7,99</b>.",
      "b = 12,423·sen 65° = 12,423·0,9063 = <b>11,26</b>. Comprobación: el lado mayor es c = 12 y está frente al ángulo mayor, C = 75° ✓."
    ]) +
    "<h5>El caso ambiguo (lado, lado, ángulo opuesto)</h5>" +
    "<p>Cuando conoces a, b y el ángulo A opuesto a a, el teorema da sen B = b·sen A/a. Y a partir de un seno hay <b>dos ángulos</b> entre 0° y 180°: B y 180° − B. A veces los dos sirven, y entonces existen dos triángulos distintos con los mismos datos. Para visualizar por qué, mueve los deslizadores: se traza una circunferencia de radio a con centro en C, y los puntos donde corta a la línea base son las posiciones posibles de B.</p>" +
    w("ambiguo") +
    "<p>El resumen, con A agudo y h = b·sen A (la altura desde C):</p>" +
    tabla(["Valor de a", "Triángulos", "Por qué"], [
      ["a &lt; h", "0", "a es demasiado corto para llegar a la base (sen B &gt; 1)"],
      ["a = h", "1", "es un triángulo rectángulo en B (sen B = 1)"],
      ["h &lt; a &lt; b", "2", "la circunferencia corta a la base en dos puntos"],
      ["a ≥ b", "1", "un corte queda «detrás» de A y no vale"]
    ]) +
    "<p>Si el ángulo A es obtuso (o recto), sólo hay una solución si a &gt; b y ninguna si a ≤ b (un triángulo no puede tener dos ángulos obtusos).</p>" +
    ejemplo("Dos soluciones", "Resuelve el triángulo con a = 8, b = 10 y A = 40°.", [
      "h = b·sen A = 10·sen 40° = 6,43. Como h &lt; a &lt; b (6,43 &lt; 8 &lt; 10), habrá <b>dos</b> triángulos.",
      "sen B = b·sen A/a = 10·0,6428/8 = 0,8035 → B₁ = 53,46° o B₂ = 180° − 53,46° = 126,54°.",
      "Triángulo 1: C₁ = 180° − 40° − 53,46° = 86,54° y c₁ = a·sen C₁/sen A = 8·0,9982/0,6428 = <b>12,42</b>.",
      "Triángulo 2: C₂ = 180° − 40° − 126,54° = 13,46° y c₂ = 8·0,2328/0,6428 = <b>2,90</b>.",
      "Los dos cumplen los datos: por eso, con «lado, lado, ángulo opuesto» hay que examinar siempre la ambigüedad."
    ]) +
    ejemplo("Sin solución y con una solución", "Con A = 40° y b = 10: ¿qué ocurre si a = 5? ¿Y si a = 12?", [
      "a = 5 &lt; h = 6,43: sen B = 10·0,6428/5 = 1,286 &gt; 1 → <b>no existe ningún triángulo</b>.",
      "a = 12 ≥ b = 10: sen B = 0,5357 → B = 32,39° (la otra opción, 147,61°, sumada a 40° da 187,61° &gt; 180°, no vale). <b>Un solo triángulo</b>."
    ]) +
    ojo("si el ángulo que buscas puede ser obtuso (si es opuesto al lado mayor, por ejemplo), no lo calcules con el seno: <b>usa el teorema del coseno</b>, que da el ángulo sin ambigüedad (el coseno de un obtuso sale negativo). Con el seno, siempre tendrías que decidir entre B y 180° − B.");

  // ---------------------------------------------------------------- 6. Teorema del coseno
  secciones[5] =
    "<h5>De dónde sale</h5>" +
    "<p>Coloca el triángulo con A en el origen y el lado c sobre el eje X. Entonces B = (c, 0) y, por la definición de seno y coseno, C = (b·cos A, b·sen A). La distancia entre B y C es el lado a:</p>" +
    "<p>a² = (b·cos A − c)² + (b·sen A)² = b²cos²A − 2bc·cos A + c² + b²sen²A = b²(cos²A + sen²A) − 2bc·cos A + c² = <b>b² + c² − 2bc·cos A</b>.</p>" +
    "<p>Las otras dos versiones salen girando las letras: b² = a² + c² − 2ac·cos B y c² = a² + b² − 2ab·cos C. Si A = 90° el último término se anula y queda Pitágoras.</p>" +
    "<h5>Usos</h5>" +
    "<ul><li><b>Tercer lado</b> conociendo dos lados y el ángulo que forman (LAL).</li>" +
    "<li><b>Un ángulo</b> conociendo los tres lados (LLL), despejando: <b>cos A = (b² + c² − a²)/(2bc)</b>.</li></ul>" +
    "<p>Una propiedad curiosa: el signo de b² + c² − a² dice qué tipo de ángulo es A. Si b² + c² &gt; a², cos A &gt; 0 y A es <b>agudo</b>; si es igual, A es recto (Pitágoras); si b² + c² &lt; a², A es <b>obtuso</b>. Así, un triángulo de lados 4, 5 y 8 es obtusángulo porque 4² + 5² = 41 &lt; 64 = 8².</p>" +
    ejemplo("Tres lados", "Resuelve el triángulo de lados a = 7, b = 5 y c = 8.", [
      "El ángulo A (frente a 7): cos A = (b² + c² − a²)/(2bc) = (25 + 64 − 49)/80 = 40/80 = 0,5 → <b>A = 60°</b>.",
      "El ángulo B (frente a 5): cos B = (a² + c² − b²)/(2ac) = (49 + 64 − 25)/112 = 88/112 = 0,7857 → <b>B = 38,21°</b>.",
      "El tercer ángulo: C = 180° − 60° − 38,21° = <b>81,79°</b>.",
      "Comprobación: el ángulo mayor (81,79°) está frente al lado mayor (8) ✓."
    ]) +
    ejemplo("Dos lados y el ángulo entre ellos", "Resuelve el triángulo con b = 7, c = 5 y A = 60°.", [
      "a² = 49 + 25 − 2·7·5·cos 60° = 74 − 70·0,5 = 39 → <b>a = √39 ≈ 6,24</b>.",
      "Para el siguiente ángulo, el coseno otra vez: cos B = (a² + c² − b²)/(2ac) = (39 + 25 − 49)/(2·6,245·5) = 0,2402 → <b>B = 76,10°</b>.",
      "<b>C = 180° − 60° − 76,10° = 43,90°</b>. Comprobación con el teorema del seno: c/sen C = 5/0,6934 = 7,21 y a/sen A = 6,245/0,8660 = 7,21 ✓."
    ]) +
    "<p>Prueba con tus propios datos. El resolutor elige el teorema que corresponde a los datos y muestra los pasos con todos los números:</p>" +
    w("triangulo") +
    ojo("después de hallar el tercer lado con el coseno, <b>sigue con el coseno</b> (o con el seno, sólo si el ángulo que buscas es seguro agudo, es decir, si no es el opuesto al lado mayor). Y no olvides la raíz cuadrada: el teorema da a², no a.");

  // ---------------------------------------------------------------- 7. Área
  secciones[6] =
    "<h5>Todas las fórmulas del área de un triángulo</h5>" +
    tabla(["Datos", "Fórmula", "Ejemplo"], [
      ["base y altura", "½·b·h", "base 10, altura 4 → 20"],
      ["dos lados y el ángulo entre ellos", "½·b·c·sen A", "lados 8 y 11, ángulo 40° → ½·88·0,6428 = 28,28"],
      ["los tres lados (Herón)", "√( s(s−a)(s−b)(s−c) ),  s = (a+b+c)/2", "13, 14, 15 → s = 21 → √(21·8·7·6) = 84"],
      ["los tres lados y el radio R", "a·b·c / (4R)", "—"]
    ]) +
    "<p>La fórmula ½·b·c·sen A sale de la básica: la altura sobre el lado c es h = b·sen A, así que ½·c·h = ½·b·c·sen A. La de Herón se obtiene del teorema del coseno y es útil cuando no tienes ningún ángulo.</p>" +
    ejemplo("Dos fórmulas, mismo resultado", "Calcula el área del triángulo de lados 7, 5 y 8 de dos maneras.", [
      "Con el ángulo A = 60° entre los lados b = 5 y c = 8: S = ½·5·8·sen 60° = 20·(√3/2) = <b>10√3 ≈ 17,32</b>.",
      "Con Herón: s = (7 + 5 + 8)/2 = 10 → S = √(10·3·5·2) = √300 = 10√3 ≈ 17,32 ✓."
    ]) +
    ejemplo("Un paralelogramo y un hexágono", "Calcula el área de un paralelogramo de lados 6 y 9 que forman 50°, y la de un hexágono regular de lado 6.", [
      "Un paralelogramo se divide en dos triángulos iguales: S = 2·½·6·9·sen 50° = 54·0,7660 = <b>41,37</b>.",
      "Un hexágono regular se divide en 6 triángulos equiláteros de lado 6: cada uno tiene área ½·6·6·sen 60° = 18·(√3/2) = 9√3. En total <b>54√3 ≈ 93,53</b>."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Aplicaciones: alturas, distancias y navegación",
      html:
        "<p>Los topógrafos, los marinos y los arquitectos llevan siglos calculando distancias que no se pueden medir con una cinta: la altura de una torre, la anchura de un río, la distancia entre dos barcos. La idea es siempre la misma: <b>medir un ángulo y una distancia fácil, y calcular el resto con un triángulo</b>.</p>" +
        ejemplo("Una sombra", "Un poste de 3 m proyecta su sombra cuando el Sol está a 40° sobre el horizonte. ¿Cuánto mide la sombra?", [
          "El poste y la sombra son los catetos de un triángulo rectángulo; el ángulo en el extremo de la sombra es 40°.",
          "tan 40° = 3/sombra → sombra = 3/tan 40° = 3/0,8391 = <b>3,58 m</b>."
        ]) +
        ejemplo("Altura de una torre con dos observaciones", "Desde un punto del suelo se ve la cima de una torre bajo un ángulo de elevación de 30°. Acercándose 50 m hacia la torre, el ángulo pasa a ser 45°. ¿Qué altura tiene la torre?", [
          "Sea h la altura y x la distancia desde el segundo punto (el más cercano) a la base. Entonces tan 45° = h/x → x = h.",
          "Desde el primer punto la distancia es x + 50: tan 30° = h/(x + 50) → h/(h + 50) = 1/√3.",
          "√3·h = h + 50 → h(√3 − 1) = 50 → h = 50/(√3 − 1) = 50/0,7321 = <b>68,30 m</b>.",
          "Observa que no hizo falta conocer la distancia a la base: con <b>dos ángulos y la distancia entre las dos observaciones</b> se resuelve."
        ]) +
        ejemplo("Distancia a un punto inaccesible", "Para medir la distancia a un punto C al otro lado de un río, se miden en la orilla dos puntos A y B separados 100 m, y los ángulos CAB = 62° y CBA = 75°. Calcula AC y BC.", [
          "Es el caso ALA: el tercer ángulo, en C, vale 180° − 62° − 75° = 43°.",
          "Teorema del seno: AC/sen 75° = BC/sen 62° = 100/sen 43°. Como 100/sen 43° = 100/0,6820 = 146,63:",
          "AC = 146,63·sen 75° = <b>141,63 m</b> y BC = 146,63·sen 62° = <b>129,46 m</b>."
        ]) +
        ejemplo("Dos barcos que salen del mismo puerto", "Dos barcos salen a la vez de un puerto con rumbos que forman 80°, a 12 y 16 km/h. ¿A qué distancia están al cabo de 3 horas?", [
          "En 3 horas recorren 36 km y 48 km: son dos lados de un triángulo con el ángulo de 80° entre ellos (LAL).",
          "d² = 36² + 48² − 2·36·48·cos 80° = 1296 + 2304 − 3456·0,17365 = 3600 − 600,13 = 2999,87.",
          "d = √2999,87 = <b>54,77 km</b>."
        ]) +
        ejemplo("Un acantilado", "Desde lo alto de un acantilado de 80 m se ven dos barcos alineados con la base, con ángulos de depresión de 25° y 40°. ¿Qué distancia hay entre ellos?", [
          "El ángulo de depresión desde arriba es igual al ángulo de elevación desde el barco hacia arriba (ángulos alternos internos). Distancia a la base: 80/tan 25° = 171,55 m (el barco más lejano) y 80/tan 40° = 95,34 m (el más cercano).",
          "Separación: 171,55 − 95,34 = <b>76,2 m</b>."
        ]) +
        ojo("un fallo clásico: usar como ángulo el que forma la visual con la <b>vertical</b> en vez de con la horizontal. Lee con cuidado «elevación/depresión» (siempre respecto de la horizontal) y haz un dibujo antes de elegir sen, cos o tan.")
    },
    {
      h: "9. ¿Qué teorema uso? Protocolo para resolver cualquier triángulo",
      html:
        "<p>Para elegir herramienta, fíjate en <b>qué datos tienes</b>. Hay cuatro situaciones; la clave es ver si conoces una «pareja» lado-ángulo opuesto:</p>" +
        tabla(["Datos", "Nombre", "Primer paso", "Soluciones"], [
          ["tres lados", "LLL", "teorema del coseno para el ángulo mayor", "una (si cumple la desigualdad triangular)"],
          ["dos lados y el ángulo entre ellos", "LAL", "teorema del coseno para el tercer lado", "una"],
          ["dos ángulos y un lado", "ALA / AAL", "tercer ángulo = 180° − A − B; después teorema del seno", "una"],
          ["dos lados y un ángulo opuesto a uno", "LLA", "teorema del seno (¡caso ambiguo!)", "0, 1 o 2"],
          ["tres ángulos", "AAA", "no basta: hay infinitos triángulos semejantes", "infinitas"]
        ]) +
        "<p>Un detalle práctico: en un triángulo, el <b>lado mayor está frente al ángulo mayor</b> y el menor frente al menor. Es una comprobación rápida de todos los resultados.</p>" +
        "<p>Ordena los pasos para resolver el triángulo con a = 7, b = 5 y c = 8:</p>" +
        w("orden", "proceso") +
        "<p>Y ahora decide el teorema para cada enunciado:</p>" +
        w("clasificar", "cual")
    },
    {
      h: "10. Los valores notables, para que se queden",
      html:
        "<p>Con una semana de práctica estos valores se saben solos. Prueba con las dos actividades de repaso: la primera es una clasificación (con ángulos que hay que reducir) y la segunda, tarjetas de «ida y vuelta».</p>" +
        w("clasificar", "notables") + w("tarjetas", "tj1")
    },
    {
      h: "17. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "18. Autocomprobación del tema",
      html: "<p>Dieciséis preguntas de test con explicación para saber si el tema está firme.</p>" + w("quiz", "quiz1")
    }
  ];

  var datos = {
    proceso: {
      titulo: "Resolver el triángulo a = 7, b = 5, c = 8",
      consigna: "Ordena los pasos de la resolución.",
      items: [
        { t: "Identificar los datos: tres lados (caso LLL)", nota: "No hay ningún ángulo conocido, así que el teorema del seno no se puede empezar." },
        { t: "Teorema del coseno para el ángulo A: cos A = (b² + c² − a²)/(2bc) = 0,5", nota: "Se puede empezar por cualquiera; lo mejor es el ángulo opuesto al lado mayor." },
        { t: "A = 60°", nota: "arccos(0,5) = 60°." },
        { t: "Teorema del coseno para B: cos B = (a² + c² − b²)/(2ac) = 0,7857 → B = 38,21°" },
        { t: "C = 180° − 60° − 38,21° = 81,79°", nota: "El último ángulo sale restando de 180°." },
        { t: "Comprobar: el ángulo mayor (81,79°) está frente al lado mayor (8)", nota: "Una comprobación rápida que detecta errores de cálculo." }
      ]
    },
    cual: {
      titulo: "¿Qué teorema necesito primero?",
      consigna: "Toca un enunciado y después el teorema con el que empezarías.",
      categorias: ["Teorema del coseno", "Teorema del seno", "Basta Pitágoras o las razones del triángulo rectángulo"],
      items: [
        { t: "Dos lados (7 y 5) y el ángulo entre ellos (60°); piden el tercer lado", c: 0 },
        { t: "Los tres lados (4, 6 y 9); piden un ángulo", c: 0 },
        { t: "Dos lados (8 y 6) y el ángulo que forman (110°); piden el tercer lado", c: 0 },
        { t: "Dos ángulos (40° y 65°) y un lado (12); piden los otros lados", c: 1 },
        { t: "a = 9, A = 35° y b = 12; piden el ángulo B", c: 1 },
        { t: "Un lado y su ángulo opuesto (a = 10 y A = 30°); piden el radio circunscrito", c: 1 },
        { t: "Triángulo con un ángulo recto: catetos 5 y 12; piden la hipotenusa", c: 2 },
        { t: "Escalera de 5 m apoyada formando 65° con el suelo; piden la altura que alcanza", c: 2 }
      ]
    },
    notables: {
      titulo: "¿Cuánto vale?",
      consigna: "Toca una razón y después su valor exacto. Algunas requieren reducir al primer cuadrante.",
      categorias: ["1/2", "√2/2", "√3/2", "√3/3", "1", "√3", "−1/2", "−√3/2"],
      items: [
        { t: "sen 30°", c: 0 }, { t: "cos 60°", c: 0 }, { t: "sen 150°", c: 0 },
        { t: "sen 45°", c: 1 }, { t: "cos 315°", c: 1 },
        { t: "sen 60°", c: 2 }, { t: "cos 30°", c: 2 }, { t: "sen 120°", c: 2 },
        { t: "tan 30°", c: 3 },
        { t: "tan 45°", c: 4 }, { t: "tan 225°", c: 4 }, { t: "sen 90°", c: 4 },
        { t: "tan 60°", c: 5 }, { t: "tan 240°", c: 5 },
        { t: "sen 210°", c: 6 }, { t: "cos 120°", c: 6 },
        { t: "cos 150°", c: 7 }, { t: "cos 210°", c: 7 }, { t: "sen 240°", c: 7 }
      ]
    },
    tj1: {
      titulo: "Trigonometría: ida y vuelta",
      cartas: [
        { a: "Definición de sen α, cos α y tan α en el triángulo rectángulo", b: "sen α = opuesto/hipotenusa · cos α = adyacente/hipotenusa · tan α = opuesto/adyacente (SOH-CAH-TOA)." },
        { a: "Relación fundamental", b: "sen²α + cos²α = 1. Y de ella: 1 + tan²α = 1/cos²α." },
        { a: "Un radián", b: "Es el ángulo cuyo arco mide lo mismo que el radio. π rad = 180° ⇒ 1 rad ≈ 57,3°." },
        { a: "Longitud de un arco y área de un sector (θ en radianes)", b: "s = θ·r y A = ½·r²·θ." },
        { a: "¿Qué signo tienen sen, cos y tan en cada cuadrante?", b: "I: todas +. II: sólo sen +. III: sólo tan +. IV: sólo cos +." },
        { a: "sen 30°, sen 45°, sen 60°", b: "1/2, √2/2, √3/2 (los cosenos, en orden inverso)." },
        { a: "tan 30°, tan 45°, tan 60°", b: "√3/3, 1, √3." },
        { a: "Reducción al primer cuadrante: 180° − α, 180° + α, 360° − α", b: "sen(180° − α) = sen α, cos(180° − α) = −cos α · sen(180° + α) = −sen α, cos(180° + α) = −cos α · sen(360° − α) = −sen α, cos(360° − α) = cos α." },
        { a: "Complementarios", b: "sen(90° − α) = cos α y cos(90° − α) = sen α." },
        { a: "Teorema del seno", b: "a/sen A = b/sen B = c/sen C = 2R (R = radio de la circunferencia circunscrita)." },
        { a: "Teorema del coseno", b: "a² = b² + c² − 2bc·cos A. Despejando: cos A = (b² + c² − a²)/(2bc)." },
        { a: "Caso ambiguo (a, b, A)", b: "Con A agudo y h = b·sen A: a &lt; h → 0; a = h → 1; h &lt; a &lt; b → 2; a ≥ b → 1." },
        { a: "Área de un triángulo con trigonometría", b: "S = ½·b·c·sen A (dos lados y el ángulo entre ellos). Herón: S = √(s(s−a)(s−b)(s−c))." },
        { a: "Resolver un triángulo: cuándo seno y cuándo coseno", b: "Hay un lado y su ángulo opuesto conocidos → seno. Dos lados y el ángulo entre ellos, o los tres lados → coseno." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula sen 30° con la calculadora en modo radianes y obtiene −0,988. ¿Qué ha hecho mal?",
          op: ["Nada: sen 30° vale −0,988", "La calculadora estaba en RAD; en grados (DEG) sale 0,5", "Debía usar cos", "El seno de 30° es 0,866"], ok: 1,
          porque: "En modo RAD, «30» se interpreta como 30 radianes. En modo DEG, sen 30° = 0,5. Mira siempre el indicador D/DEG de la pantalla." },
        { q: "Un alumno escribe sen 150° = −sen 30°. ¿Qué falla?",
          op: ["Nada", "150° es del 2.º cuadrante, donde el seno es positivo: sen 150° = +sen 30° = 1/2", "Debía ser cos 30°", "Debía ser −cos 30°"], ok: 1,
          porque: "150° = 180° − 30° y el seno es positivo en el 2.º cuadrante. El signo menos aparece con 180° + 30° = 210° (3.er cuadrante)." },
        { q: "Si sen α = 3/5 y α está en el 2.º cuadrante, un alumno afirma cos α = +4/5. ¿Qué falla?",
          op: ["Nada", "En el 2.º cuadrante el coseno es negativo: cos α = −4/5", "El seno sería 4/5", "cos α = 2/5"], ok: 1,
          porque: "La raíz cuadrada da ±4/5 y el cuadrante decide el signo. En el 2.º cuadrante la abscisa del punto es negativa." },
        { q: "Un alumno resuelve un triángulo con a = 5, b = 10 y A = 40° y calcula sen B = 1,286, pero escribe B = 90° «porque es lo máximo». ¿Qué falla?",
          op: ["Nada", "Un seno no puede valer más de 1: ese triángulo no existe", "Debía usar la tangente", "B = 51,4°"], ok: 1,
          porque: "El seno de un ángulo vale como máximo 1. Si sale mayor, el lado a es demasiado corto: el caso es el de «0 soluciones» del caso ambiguo (a &lt; h = 6,43)." },
        { q: "En un triángulo con A = 100°, un alumno halla B con el teorema del seno y obtiene 40°. ¿Cuándo hay que sospechar?",
          op: ["Nunca", "Si B es opuesto al lado mayor o ya hay un ángulo obtuso, el seno puede dar un ángulo equivocado: mejor el coseno", "Siempre que A sea menor de 90°", "Cuando el resultado es exacto"], ok: 1,
          porque: "El seno de un ángulo y el de su suplementario son iguales, así que la calculadora no distingue un agudo de un obtuso. El coseno sí: el de un obtuso sale negativo." },
        { q: "Un alumno escribe a² = b² + c² − 2bc·sen A. ¿Qué falla?",
          op: ["Nada", "El teorema del coseno lleva cos A: a² = b² + c² − 2bc·cos A", "El signo debería ser +", "Falta una raíz cuadrada"], ok: 1,
          porque: "Si A = 90°, cos A = 0 y sale Pitágoras; con sen A saldría 2bc: ¡un absurdo! Comprueba siempre con A = 90°." },
        { q: "Un alumno convierte 150° a radianes y escribe 150π. ¿Qué falla?",
          op: ["Nada", "Hay que multiplicar por π/180: 150°·π/180 = 5π/6 rad", "150° son 3π rad", "Son 150/π rad"], ok: 1,
          porque: "El factor de conversión es π/180 (porque 180° = π rad). 150π sería dar 75 vueltas." },
        { q: "Un alumno dice que, como sen 30° = 1/2, entonces sen 60° = 2·sen 30° = 1. ¿Qué falla?",
          op: ["Nada", "El seno no es proporcional al ángulo: sen 60° = √3/2 ≈ 0,866", "sen 60° = 1/4", "sen 60° = 0,5"], ok: 1,
          porque: "sen(2α) ≠ 2·sen α. La razón entre ángulo y seno no es constante: el seno crece cada vez más despacio al acercarse a 90°." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "En un triángulo rectángulo, el cateto opuesto a α mide 3 y la hipotenusa 5. ¿Cuánto vale tan α?",
          op: ["3/4", "3/5", "4/5", "4/3"], ok: 0,
          porque: "El otro cateto mide √(25 − 9) = 4, así que tan α = opuesto/adyacente = 3/4." },
        { q: "¿Cuántos radianes son 135°?",
          op: ["3π/4", "2π/3", "5π/6", "π/4"], ok: 0,
          porque: "135·π/180 = 3π/4." },
        { q: "El valor exacto de cos 210° es…",
          op: ["−√3/2", "√3/2", "−1/2", "1/2"], ok: 0,
          porque: "210° = 180° + 30°: cos 210° = −cos 30° = −√3/2." },
        { q: "Si cos α = 0,6 y α es agudo, tan α vale…",
          op: ["4/3", "3/4", "0,8", "5/3"], ok: 0,
          porque: "sen α = √(1 − 0,36) = 0,8 y tan α = 0,8/0,6 = 4/3." },
        { q: "Un ángulo de 1110° tiene las mismas razones que…",
          op: ["30°", "150°", "210°", "60°"], ok: 0,
          porque: "1110° − 3·360° = 30°." },
        { q: "En un triángulo, A = 30°, a = 10. ¿Cuánto vale el radio de la circunferencia circunscrita?",
          op: ["10", "20", "5", "10√3"], ok: 0,
          porque: "2R = a/sen A = 10/0,5 = 20 → R = 10." },
        { q: "Un triángulo de lados 4, 5 y 8 es…",
          op: ["obtusángulo", "acutángulo", "rectángulo", "no existe"], ok: 0,
          porque: "4² + 5² = 41 &lt; 64 = 8²: el ángulo opuesto al lado 8 es obtuso. Existe, porque 8 &lt; 4 + 5." },
        { q: "Con A = 40°, b = 10 y a = 8, ¿cuántos triángulos existen?",
          op: ["2", "0", "1", "3"], ok: 0,
          porque: "h = 10·sen 40° = 6,43 &lt; 8 &lt; 10 = b: dos triángulos." },
        { q: "¿Cuál es el área de un triángulo con dos lados de 8 y 11 que forman 40°?",
          op: ["28,3", "44", "56,6", "34,0"], ok: 0,
          porque: "S = ½·8·11·sen 40° = 44·0,6428 = 28,28." },
        { q: "Desde un punto a 30 m de la base de una torre, el ángulo de elevación a su cima es de 60°. La torre mide…",
          op: ["52 m", "30 m", "17,3 m", "60 m"], ok: 0,
          porque: "h = 30·tan 60° = 30·√3 = 51,96 ≈ 52 m." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "g1", nivel: 1,
      enunciado: "Los catetos de un triángulo rectángulo miden 5 y 12. Calcula la hipotenusa y la tangente del ángulo α opuesto al cateto de 5.",
      check: [{ tipo: "num", etiqueta: "hipotenusa =", valor: 13 }, { tipo: "num", etiqueta: "tan α =", valor: 5 / 12, tol: 0.002, ph: "p/q o decimal" }],
      pistas: ["Pitágoras: h² = 5² + 12².", "tan α = opuesto/adyacente."],
      pasos: ["h = √(25 + 144) = √169 = 13.", "tan α = 5/12 ≈ 0,4167 (α ≈ 22,62°)."],
      resultado: "hipotenusa 13 · tan α = 5/12" },
    { id: "g2", nivel: 1,
      enunciado: "Si sen α = 0,6 y α es un ángulo agudo, calcula cos α y tan α.",
      check: [{ tipo: "num", etiqueta: "cos α =", valor: 0.8 }, { tipo: "num", etiqueta: "tan α =", valor: 0.75 }],
      pistas: ["sen²α + cos²α = 1."],
      pasos: ["cos²α = 1 − 0,36 = 0,64 → cos α = 0,8 (agudo: positivo).", "tan α = 0,6/0,8 = 0,75."],
      resultado: "cos α = 0,8 · tan α = 0,75" },
    { id: "g3", nivel: 1,
      enunciado: "Pasa 135° a radianes y 5π/6 rad a grados.",
      check: [{ tipo: "num", etiqueta: "135° =", valor: 3 * Math.PI / 4, unidad: "rad", tol: 0.002, ph: "decimal (o 3pi/4)" }, { tipo: "num", etiqueta: "5π/6 rad =", valor: 150, unidad: "°" }],
      pistas: ["grados × π/180 = radianes. radianes × 180/π = grados."],
      pasos: ["135·π/180 = 3π/4 ≈ 2,356 rad.", "5π/6·180/π = 150°."],
      resultado: "3π/4 rad y 150°" },
    { id: "g4", nivel: 1,
      enunciado: "Calcula el valor exacto de sen 60°·cos 30° + cos 60°·sen 30°.",
      check: { tipo: "num", etiqueta: "valor =", valor: 1 },
      pistas: ["Sustituye los valores notables."],
      pasos: ["(√3/2)·(√3/2) + (1/2)·(1/2) = 3/4 + 1/4 = 1.", "(Es el seno de 60° + 30° = 90°: la fórmula del Tema 5.)"],
      resultado: "1" },
    { id: "g5", nivel: 1,
      enunciado: "El ángulo 200° está en…",
      check: { tipo: "opcion", etiqueta: "Cuadrante y signos", opciones: ["3.er cuadrante: sen y cos negativos", "2.º cuadrante: sen positivo y cos negativo", "3.er cuadrante: sen positivo y cos negativo", "4.º cuadrante: sen negativo y cos positivo"], ok: 0 },
      pistas: ["Los cuadrantes: 0°–90°, 90°–180°, 180°–270°, 270°–360°."],
      pasos: ["200° está entre 180° y 270°: 3.er cuadrante.", "Allí el punto de la circunferencia tiene x e y negativos: cos y sen negativos (tan positiva)."],
      resultado: "3.er cuadrante: sen y cos negativos" },
    { id: "g6", nivel: 1,
      enunciado: "Calcula sen 150°.",
      check: { tipo: "num", etiqueta: "sen 150° =", valor: 0.5, ph: "decimal o 1/2" },
      pistas: ["150° = 180° − 30°."],
      pasos: ["sen(180° − α) = sen α → sen 150° = sen 30° = 1/2."],
      resultado: "1/2" },
    { id: "g7", nivel: 1,
      enunciado: "Desde un punto a 30 m de la base de una torre, el ángulo de elevación de su cima es 60°. ¿Qué altura tiene la torre?",
      check: { tipo: "num", etiqueta: "altura =", valor: 51.96, unidad: "m" },
      pistas: ["Cateto adyacente 30 m, ángulo 60°, se pide el opuesto."],
      pasos: ["tan 60° = h/30 → h = 30·tan 60° = 30·√3 = 51,96 m."],
      resultado: "≈ 52 m" },
    { id: "g8", nivel: 1,
      enunciado: "Si cos α = 0,6 y α es agudo, calcula sen α.",
      check: { tipo: "num", etiqueta: "sen α =", valor: 0.8 },
      pistas: ["sen²α = 1 − cos²α."],
      pasos: ["sen²α = 1 − 0,36 = 0,64 → sen α = 0,8."],
      resultado: "0,8" },
    { id: "g9", nivel: 1,
      enunciado: "Una escalera de 4 m forma 70° con el suelo. ¿A qué altura de la pared llega y a qué distancia está su pie de la pared?",
      check: [{ tipo: "num", etiqueta: "altura =", valor: 3.76, unidad: "m" }, { tipo: "num", etiqueta: "distancia =", valor: 1.37, unidad: "m" }],
      pistas: ["La escalera es la hipotenusa."],
      pasos: ["Altura: 4·sen 70° = 4·0,9397 = 3,76 m.", "Distancia: 4·cos 70° = 4·0,3420 = 1,37 m."],
      resultado: "3,76 m y 1,37 m" },
    { id: "g10", nivel: 1,
      enunciado: "En una circunferencia de 5 cm de radio, un ángulo central mide 2 rad. Calcula la longitud del arco y el área del sector.",
      check: [{ tipo: "num", etiqueta: "arco =", valor: 10, unidad: "cm" }, { tipo: "num", etiqueta: "área =", valor: 25, unidad: "cm²" }],
      pistas: ["s = θ·r y A = ½·r²·θ (θ en radianes)."],
      pasos: ["s = 2·5 = 10 cm.", "A = ½·25·2 = 25 cm²."],
      resultado: "arco 10 cm · sector 25 cm²" },
    // ================= ★★ medio =================
    { id: "g11", nivel: 2,
      enunciado: "Si sen α = 3/5 y α está en el 2.º cuadrante, calcula cos α y tan α.",
      check: [{ tipo: "num", etiqueta: "cos α =", valor: -0.8 }, { tipo: "num", etiqueta: "tan α =", valor: -0.75 }],
      pistas: ["En el 2.º cuadrante el coseno es negativo."],
      pasos: ["cos²α = 1 − 9/25 = 16/25 → cos α = −4/5 (2.º cuadrante).", "tan α = (3/5)/(−4/5) = −3/4."],
      resultado: "cos α = −4/5 · tan α = −3/4" },
    { id: "g12", nivel: 2,
      enunciado: "Si tan α = 2 y α está en el 3.er cuadrante, calcula sen α y cos α (decimales).",
      check: [{ tipo: "num", etiqueta: "sen α =", valor: -0.8944, tol: 0.002 }, { tipo: "num", etiqueta: "cos α =", valor: -0.4472, tol: 0.002 }],
      pistas: ["1 + tan²α = 1/cos²α.", "En el 3.er cuadrante, sen y cos son negativos."],
      pasos: ["1 + 4 = 5 = 1/cos²α → cos²α = 1/5 → cos α = −1/√5 ≈ −0,447.", "sen α = tan α·cos α = 2·(−1/√5) = −2/√5 ≈ −0,894.", "Comprobación: 0,2 + 0,8 = 1."],
      resultado: "cos α ≈ −0,447 · sen α ≈ −0,894" },
    { id: "g13", nivel: 2,
      enunciado: "Calcula el valor exacto de cos 210°·sen 300° (da el resultado como decimal).",
      check: { tipo: "num", etiqueta: "valor =", valor: 0.75, ph: "decimal o 3/4" },
      pistas: ["210° = 180° + 30° y 300° = 360° − 60°."],
      pasos: ["cos 210° = −cos 30° = −√3/2. sen 300° = −sen 60° = −√3/2.", "Producto: (−√3/2)(−√3/2) = 3/4 = 0,75."],
      resultado: "3/4" },
    { id: "g14", nivel: 2,
      enunciado: "Calcula sen(11π/6) y cos(7π/3).",
      check: [{ tipo: "num", etiqueta: "sen(11π/6) =", valor: -0.5 }, { tipo: "num", etiqueta: "cos(7π/3) =", valor: 0.5 }],
      pistas: ["11π/6 = 2π − π/6. 7π/3 = 2π + π/3."],
      pasos: ["11π/6 es del 4.º cuadrante: sen = −sen(π/6) = −1/2.", "7π/3 − 2π = π/3: cos(7π/3) = cos(π/3) = 1/2."],
      resultado: "−1/2 y 1/2" },
    { id: "g15", nivel: 2,
      enunciado: "Halla los ángulos x entre 0° y 360° que cumplen sen x = 1/2.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 150], unidad: "°" },
      pistas: ["En una vuelta hay dos ángulos con el mismo seno: el de referencia y 180° − el de referencia."],
      pasos: ["sen 30° = 1/2, ángulo de referencia 30°.", "El seno también es positivo en el 2.º cuadrante: x = 180° − 30° = 150°."],
      resultado: "x = 30° y x = 150°" },
    { id: "g16", nivel: 2,
      enunciado: "En un triángulo A = 40°, B = 65° y c = 12. Calcula los lados a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 7.99 }, { tipo: "num", etiqueta: "b =", valor: 11.26 }],
      pistas: ["C = 180° − A − B.", "Teorema del seno con la pareja c, C."],
      pasos: ["C = 75°. c/sen C = 12/0,9659 = 12,423.", "a = 12,423·sen 40° = 7,99. b = 12,423·sen 65° = 11,26."],
      resultado: "a ≈ 7,99 · b ≈ 11,26" },
    { id: "g17", nivel: 2,
      enunciado: "En un triángulo b = 9, c = 6 y el ángulo que forman es A = 50°. Calcula el lado a.",
      check: { tipo: "num", etiqueta: "a =", valor: 6.8977 },
      pistas: ["Teorema del coseno: a² = b² + c² − 2bc·cos A."],
      pasos: ["a² = 81 + 36 − 2·9·6·cos 50° = 117 − 108·0,6428 = 117 − 69,42 = 47,58.", "a = √47,58 ≈ 6,90."],
      resultado: "a ≈ 6,90" },
    { id: "g18", nivel: 2,
      enunciado: "Los lados de un triángulo miden 6, 7 y 9. Calcula el ángulo mayor.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 87.27, unidad: "°" },
      pistas: ["El ángulo mayor es el opuesto al lado mayor (9).", "cos A = (b² + c² − a²)/(2bc)."],
      pasos: ["cos A = (36 + 49 − 81)/(2·6·7) = 4/84 = 0,0476.", "A = arccos(0,0476) = 87,27°."],
      resultado: "≈ 87,27°" },
    { id: "g19", nivel: 2,
      enunciado: "Calcula el área de un triángulo con dos lados de 8 y 11 que forman un ángulo de 40°.",
      check: { tipo: "num", etiqueta: "área =", valor: 28.28 },
      pistas: ["S = ½·b·c·sen A."],
      pasos: ["S = ½·8·11·sen 40° = 44·0,6428 = 28,28."],
      resultado: "≈ 28,28" },
    { id: "g20", nivel: 2,
      enunciado: "Calcula el área de un triángulo de lados 13, 14 y 15 con la fórmula de Herón.",
      check: { tipo: "num", etiqueta: "área =", valor: 84 },
      pistas: ["s = (13 + 14 + 15)/2 = 21."],
      pasos: ["S = √(21·(21 − 13)·(21 − 14)·(21 − 15)) = √(21·8·7·6) = √7056 = 84."],
      resultado: "84" },
    { id: "g21", nivel: 2,
      enunciado: "Desde un punto del suelo se ve la cima de una torre con ángulo de elevación 30°. Acercándose 50 m, el ángulo es 45°. ¿Qué altura tiene la torre?",
      check: { tipo: "num", etiqueta: "altura =", valor: 68.3, unidad: "m" },
      pistas: ["Con 45° la distancia a la base es igual a la altura h.", "tan 30° = h/(h + 50)."],
      pasos: ["tan 45° = h/x → x = h. tan 30° = h/(h + 50) = 1/√3.", "√3·h = h + 50 → h = 50/(√3 − 1) = 68,30 m."],
      resultado: "≈ 68,30 m" },
    { id: "g22", nivel: 2,
      enunciado: "Tres pueblos A, B y C. De A a B hay 12 km, de B a C hay 9 km y el ángulo en B es 110°. ¿Qué distancia hay entre A y C?",
      check: { tipo: "num", etiqueta: "AC =", valor: 17.29, unidad: "km" },
      pistas: ["Dos lados y el ángulo que forman: teorema del coseno."],
      pasos: ["AC² = 12² + 9² − 2·12·9·cos 110° = 144 + 81 + 216·0,3420 = 225 + 73,88 = 298,88.", "AC = 17,29 km."],
      resultado: "≈ 17,29 km" },
    { id: "g23", nivel: 2,
      enunciado: "Calcula el área de un paralelogramo de lados 6 y 9 que forman 50°.",
      check: { tipo: "num", etiqueta: "área =", valor: 41.37 },
      pistas: ["Un paralelogramo son dos triángulos iguales."],
      pasos: ["S = 6·9·sen 50° = 54·0,7660 = 41,37."],
      resultado: "≈ 41,37" },
    { id: "g24", nivel: 2,
      enunciado: "Una carretera tiene una pendiente del 8 %. ¿Qué ángulo forma con la horizontal? Y una rampa de 10°, ¿qué pendiente tiene (en %)?",
      check: [{ tipo: "num", etiqueta: "ángulo =", valor: 4.57, unidad: "°" }, { tipo: "num", etiqueta: "pendiente =", valor: 17.63, unidad: "%" }],
      pistas: ["La pendiente es la tangente del ángulo."],
      pasos: ["tan α = 0,08 → α = arctan 0,08 = 4,57°.", "tan 10° = 0,1763 → 17,63 %."],
      resultado: "4,57° y 17,63 %" },
    // ================= ★★★ nivel PAU =================
    { id: "g25", nivel: 3,
      enunciado: "Resuelve el triángulo con a = 8, b = 10 y A = 40°. Indica cuántos triángulos hay y los dos valores posibles de c.",
      check: [{ tipo: "num", etiqueta: "nº de triángulos =", valor: 2 }, { tipo: "lista", etiqueta: "valores de c:", valores: [12.42, 2.9], tol: 0.01, ph: "dos valores" }],
      pistas: ["Calcula h = b·sen A y compáralo con a.", "sen B = b·sen A/a y mira B y 180° − B."],
      pasos: ["h = 10·sen 40° = 6,43 &lt; a = 8 &lt; b = 10 → dos triángulos.", "sen B = 0,8035 → B₁ = 53,46° o B₂ = 126,54°.", "C₁ = 86,54° → c₁ = 8·sen 86,54°/sen 40° = 12,42. C₂ = 13,46° → c₂ = 8·sen 13,46°/sen 40° = 2,90."],
      resultado: "dos triángulos: c = 12,42 y c = 2,90" },
    { id: "g26", nivel: 3,
      enunciado: "Con A = 40° y b = 10, ¿entre qué valores de a (opuesto a A) existen dos triángulos? Escribe el extremo inferior y el superior.",
      check: [{ tipo: "num", etiqueta: "extremo inferior =", valor: 6.428 }, { tipo: "num", etiqueta: "extremo superior =", valor: 10 }],
      pistas: ["La condición es h &lt; a &lt; b con h = b·sen A."],
      pasos: ["h = 10·sen 40° = 6,43. Para a &gt; h la circunferencia corta la base, y para a &lt; b los dos cortes quedan a la derecha de A.", "Dos triángulos si 6,43 &lt; a &lt; 10."],
      resultado: "6,43 &lt; a &lt; 10" },
    { id: "g27", nivel: 3,
      enunciado: "En un triángulo, a = 10 y A = 60°. Calcula el radio R de la circunferencia circunscrita.",
      check: { tipo: "num", etiqueta: "R =", valor: 5.7735 },
      pistas: ["a/sen A = 2R."],
      pasos: ["2R = 10/sen 60° = 10/(√3/2) = 20/√3 = 11,547.", "R = 10/√3 = 5,77."],
      resultado: "R = 10/√3 ≈ 5,77" },
    { id: "g28", nivel: 3,
      enunciado: "Demuestra el teorema del coseno: a² = b² + c² − 2bc·cos A.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Coloca el triángulo con A en el origen y B sobre el eje X: B = (c, 0)", p: 0.5 },
        { t: "Determina C = (b·cos A, b·sen A)", p: 0.5 },
        { t: "Escribe a² como la distancia al cuadrado entre B y C: (b·cos A − c)² + (b·sen A)²", p: 0.5 },
        { t: "Desarrolla y usa sen²A + cos²A = 1 para llegar a b² + c² − 2bc·cos A", p: 0.5 }
      ] },
      pasos: ["A = (0, 0), B = (c, 0) y C = (b·cos A, b·sen A).", "a² = |BC|² = (b·cos A − c)² + (b·sen A)².", "= b²cos²A − 2bc·cos A + c² + b²sen²A = b²(cos²A + sen²A) − 2bc·cos A + c².", "= b² + c² − 2bc·cos A."],
      resultado: "a² = b² + c² − 2bc·cos A" },
    { id: "g29", nivel: 3,
      enunciado: "Para medir la distancia a un punto C al otro lado de un río, se toman A y B en la orilla con AB = 100 m, y se miden CAB = 62° y CBA = 75°. Calcula AC y BC.",
      check: [{ tipo: "num", etiqueta: "AC =", valor: 141.63, unidad: "m" }, { tipo: "num", etiqueta: "BC =", valor: 129.46, unidad: "m" }],
      pistas: ["Ángulo en C = 180° − 62° − 75°.", "AB/sen C = AC/sen B = BC/sen A."],
      pasos: ["C = 43°. 100/sen 43° = 146,63.", "AC = 146,63·sen 75° = 141,63 m. BC = 146,63·sen 62° = 129,46 m."],
      resultado: "AC ≈ 141,63 m · BC ≈ 129,46 m" },
    { id: "g30", nivel: 3,
      enunciado: "Dos barcos salen de un puerto con rumbos que forman un ángulo de 80°, a 12 y 16 km/h. ¿A qué distancia están tras 3 horas?",
      check: { tipo: "num", etiqueta: "distancia =", valor: 54.77, unidad: "km" },
      pistas: ["Recorren 36 km y 48 km: dos lados con el ángulo entre ellos."],
      pasos: ["d² = 36² + 48² − 2·36·48·cos 80° = 3600 − 3456·0,17365 = 2999,87.", "d = 54,77 km."],
      resultado: "≈ 54,77 km" },
    { id: "g31", nivel: 3,
      enunciado: "Un triángulo isósceles tiene dos lados iguales de 10 cm y un ángulo de 36° en el vértice desigual. Calcula la base y la altura sobre ella.",
      check: [{ tipo: "num", etiqueta: "base =", valor: 6.18, unidad: "cm" }, { tipo: "num", etiqueta: "altura =", valor: 9.51, unidad: "cm" }],
      pistas: ["La altura sobre la base lo divide en dos triángulos rectángulos con ángulo de 18°."],
      pasos: ["Cada mitad: hipotenusa 10 y ángulo 18°. Media base = 10·sen 18° = 3,09 → base = 6,18 cm.", "Altura = 10·cos 18° = 9,51 cm.", "(Curiosidad: 10/6,18 = 1,618, el número áureo.)"],
      resultado: "base ≈ 6,18 cm · altura ≈ 9,51 cm" },
    { id: "g32", nivel: 3,
      enunciado: "Desde lo alto de un acantilado de 80 m se ven dos barcos alineados con su base. Los ángulos de depresión son 25° y 40°. ¿Qué distancia hay entre los barcos?",
      check: { tipo: "num", etiqueta: "distancia =", valor: 76.22, unidad: "m" },
      pistas: ["Cada barco forma un triángulo rectángulo con la base y la cima."],
      pasos: ["Barco lejano: 80/tan 25° = 171,55 m. Barco cercano: 80/tan 40° = 95,34 m.", "Separación = 171,55 − 95,34 = 76,2 m."],
      resultado: "≈ 76,2 m" },
    { id: "g33", nivel: 3,
      enunciado: "Calcula el área de un hexágono regular de lado 6 cm.",
      check: { tipo: "num", etiqueta: "área =", valor: 93.53, unidad: "cm²" },
      pistas: ["Se divide en 6 triángulos equiláteros."],
      pasos: ["Cada triángulo: ½·6·6·sen 60° = 18·(√3/2) = 9√3.", "Área = 6·9√3 = 54√3 ≈ 93,53 cm²."],
      resultado: "54√3 ≈ 93,53 cm²" },
    { id: "g34", nivel: 3,
      enunciado: "En un triángulo rectángulo de hipotenusa 10 se cumple sen α·cos α = 12/25 (α agudo). Calcula los dos catetos.",
      check: { tipo: "lista", etiqueta: "catetos:", valores: [6, 8] },
      pistas: ["(sen α + cos α)² = 1 + 2·sen α·cos α.", "Los catetos son 10·sen α y 10·cos α."],
      pasos: ["(sen α + cos α)² = 1 + 24/25 = 49/25 → sen α + cos α = 7/5.", "sen α y cos α son las raíces de t² − (7/5)t + 12/25 = 0 → t = 3/5 y t = 4/5.", "Catetos: 10·3/5 = 6 y 10·4/5 = 8."],
      resultado: "6 y 8" },
    { id: "g35", nivel: 3,
      enunciado: "Las diagonales de un rectángulo de 12 × 5 se cortan formando un ángulo agudo. Calcula su medida.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 45.24, unidad: "°" },
      pistas: ["La diagonal forma con el lado mayor un ángulo α con tan α = 5/12.", "El ángulo entre las dos diagonales es 2α."],
      pasos: ["tan α = 5/12 → α = 22,62°.", "Las diagonales son simétricas respecto del eje horizontal: el ángulo entre ellas es 2α = 45,24°."],
      resultado: "≈ 45,24°" },
    { id: "g36", nivel: 3,
      enunciado: "Demuestra que 1 + tan²α = 1/cos²α a partir de la relación fundamental.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Parte de sen²α + cos²α = 1", p: 0.5 },
        { t: "Divide los dos miembros entre cos²α (indicando que cos α ≠ 0)", p: 0.5 },
        { t: "Reconoce sen²α/cos²α = tan²α y cos²α/cos²α = 1", p: 0.5 },
        { t: "Concluye tan²α + 1 = 1/cos²α", p: 0.5 }
      ] },
      pasos: ["sen²α + cos²α = 1.", "Dividiendo entre cos²α (con cos α ≠ 0): sen²α/cos²α + 1 = 1/cos²α.", "Como sen α/cos α = tan α: tan²α + 1 = 1/cos²α."],
      resultado: "1 + tan²α = 1/cos²α" }
  ];

  var lamina = [
    { titulo: "Razones en el triángulo rectángulo",
      items: [
        { label: "Las tres razones", formula: "sen α = " + fr("opuesto", "hipotenusa") + "   cos α = " + fr("adyacente", "hipotenusa") + "   tan α = " + fr("opuesto", "adyacente"), cuando: "Triángulo con un ángulo recto. Recuerda SOH-CAH-TOA.", ejemplo: "hipotenusa 13, opuesto 5 → sen α = 5/13" },
        { label: "Relaciones fundamentales", formula: "sen²α + cos²α = 1  ·  tan α = sen α/cos α  ·  1 + tan²α = 1/cos²α", ojo: "Al despejar, ± la raíz; el signo lo da el cuadrante." },
        { label: "Complementarios", formula: "sen(90° − α) = cos α  ·  cos(90° − α) = sen α" }
      ],
      pasos: ["Dibuja y rotula: opuesto, adyacente, hipotenusa respecto del ángulo.", "Elige la razón que relacione tu dato con tu incógnita.", "Calcula (modo DEG). Comprueba con Pitágoras."],
      nota: "Pendiente de una carretera (%) = 100·tan α." },
    { titulo: "Ángulos: grados y radianes",
      items: [
        { label: "Conversión", formula: "180° = π rad  ·  rad = grados·π/180", ejemplo: "135° = 3π/4 rad · 5π/6 rad = 150°" },
        { label: "Arco y sector", formula: "s = θ·r  ·  A = ½·r²·θ", cuando: "θ en radianes." }
      ],
      tabla: { cab: ["Grados", "0°", "30°", "45°", "60°", "90°", "180°", "270°", "360°"], filas: [["Radianes", "0", "π/6", "π/4", "π/3", "π/2", "π", "3π/2", "2π"]] },
      nota: "1 rad ≈ 57,3°. Un grado = 60′ y un minuto = 60″." },
    { titulo: "Valores notables", ancha: true,
      tabla: { cab: ["", "0°", "30°", "45°", "60°", "90°"], filas: [
        ["sen", "0", "1/2", "√2/2", "√3/2", "1"], ["cos", "1", "√3/2", "√2/2", "1/2", "0"], ["tan", "0", "√3/3", "1", "√3", "no existe"]
      ] },
      nota: "sen = √0/2, √1/2, √2/2, √3/2, √4/2. Los cosenos van al revés." },
    { titulo: "Circunferencia goniométrica y signos",
      items: [
        { label: "El punto de ángulo θ", formula: "P = (cos θ, sen θ)  ·  tan θ = recorte sobre x = 1", cuando: "Define las razones para cualquier ángulo." },
        { label: "Periodicidad", formula: "sen(θ + 360°) = sen θ  ·  tan(θ + 180°) = tan θ" }
      ],
      tabla: { cab: ["Cuadrante", "sen", "cos", "tan"], filas: [["I (0–90°)", "+", "+", "+"], ["II (90–180°)", "+", "−", "−"], ["III (180–270°)", "−", "−", "+"], ["IV (270–360°)", "−", "+", "−"]] },
      nota: "«Todas, Seno, Tangente, Coseno»: lo positivo en I, II, III y IV." },
    { titulo: "Reducción al primer cuadrante",
      pasos: ["Resta o suma vueltas de 360° hasta quedar entre 0° y 360°.", "Cuadrante → signo de la razón.", "Ángulo de referencia: 180° − θ, θ − 180° o 360° − θ.", "Razón del ángulo de referencia con su signo."],
      tabla: { cab: ["Ángulo", "sen", "cos", "tan"], filas: [["180° − α", "sen α", "−cos α", "−tan α"], ["180° + α", "−sen α", "−cos α", "tan α"], ["−α", "−sen α", "cos α", "−tan α"], ["90° + α", "cos α", "−sen α", "−1/tan α"]] },
      nota: "Con radianes: π − α, π + α, 2π − α." },
    { titulo: "Teoremas del seno y del coseno",
      items: [
        { label: "Teorema del seno", formula: fr("a", "sen A") + " = " + fr("b", "sen B") + " = " + fr("c", "sen C") + " = 2R", cuando: "Hay una pareja lado-ángulo opuesto conocida.", ojo: "Con dos lados y un ángulo opuesto puede haber 0, 1 o 2 triángulos." },
        { label: "Teorema del coseno", formula: "a² = b² + c² − 2bc·cos A", cuando: "Dos lados y el ángulo entre ellos (para el tercer lado), o tres lados (para un ángulo).", ejemplo: "cos A = (b² + c² − a²)/(2bc)" },
        { label: "Área", formula: "S = ½·b·c·sen A  ·  Herón: √(s(s−a)(s−b)(s−c))" }
      ],
      nota: "El lado mayor está frente al ángulo mayor. Si b² + c² &lt; a², el ángulo A es obtuso." },
    { titulo: "Caso ambiguo (a, b, A) con A agudo", ancha: true,
      tabla: { cab: ["Condición (h = b·sen A)", "Triángulos"], filas: [["a &lt; h", "0"], ["a = h", "1 (rectángulo)"], ["h &lt; a &lt; b", "2"], ["a ≥ b", "1"]] },
      nota: "Con A obtuso: 1 triángulo si a &gt; b y ninguno si a ≤ b. Para un ángulo que pueda ser obtuso usa el coseno." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Calculadora en RAD con ángulos en grados", bien: "Modo DEG: sen 30° = 0,5", por: "En RAD, «30» son 30 radianes." },
        { mal: "sen 150° = −sen 30°", bien: "sen 150° = +sen 30°", por: "El 2.º cuadrante tiene seno positivo." },
        { mal: "sen(2α) = 2·sen α", bien: "No es lineal: sen 60° ≠ 2·sen 30°", por: "El seno no es proporcional al ángulo." },
        { mal: "a² = b² + c² − 2bc·sen A", bien: "a² = b² + c² − 2bc·cos A", por: "Con A = 90° debe salir Pitágoras." },
        { mal: "150° = 150π rad", bien: "150° = 5π/6 rad", por: "Se multiplica por π/180." },
        { mal: "sen B = 1,2 → B = 90°", bien: "No existe el triángulo", por: "Un seno vale como mucho 1." }
      ] }
  ];

  // ================================================================
  // AMPLIACIÓN 2 · refuerzo del tema: funciones inversas, radianes, Herón y radios,
  // rumbos y navegación, figuras y espacio, problemas de examen
  // (simuladores nuevos en lab_trigo3.js)
  // ================================================================
  resumen.push(
    "<b>Del valor al ángulo</b>: arcsen devuelve un ángulo de −90° a 90°, arccos de 0° a 180° y arctan de −90° a 90°. Falta siempre el <b>otro</b> ángulo de la vuelta (180° − α, 360° − α o α + 180°). Para hallar un ángulo de un triángulo, usa el coseno.",
    "<b>Rumbo</b> = ángulo desde el norte en sentido horario. Coordenadas: E = d·sen(rumbo), N = d·cos(rumbo). Al cambiar de rumbo, el ángulo del triángulo es 180° − giro. Áreas y radios: Herón, R = abc/(4S), r = S/s."
  );

  secciones[5] +=
    "<h5>Clasificar un triángulo sin calcular ángulos</h5>" +
    "<p>Si a es el lado mayor, el teorema del coseno dice que cos A tiene el signo de b² + c² − a². Así: si a² &lt; b² + c², el triángulo es <b>acutángulo</b>; si a² = b² + c², es <b>rectángulo</b>; y si a² &gt; b² + c², es <b>obtusángulo</b> (con el ángulo obtuso frente al lado mayor). Por ejemplo, con lados 5, 6 y 7: 49 &lt; 25 + 36 = 61, acutángulo (el mayor ángulo vale 78,46°). Con 4, 5 y 8: 64 &gt; 16 + 25 = 41, obtusángulo (cos C = −0,575, C = 125,10°). Y para que el triángulo exista debe cumplirse la <b>desigualdad triangular</b>: cada lado es menor que la suma de los otros dos (con 3, 4 y 8 no se puede cerrar, porque 3 + 4 &lt; 8).</p>";

  datos.rumbos = {
    titulo: "Direcciones y rumbos",
    consigna: "Une cada dirección con su rumbo (ángulo desde el norte, en sentido horario).",
    pares: [["Noreste", "045°"], ["Sureste", "135°"], ["Suroeste", "225°"], ["Noroeste", "315°"], ["Oeste", "270°"], ["N 30° E", "030°"], ["S 30° O", "210°"]]
  };

  nuevas[0].html +=
    "<h5>Una fórmula general para dos observaciones</h5>" +
    "<p>El ejemplo de la torre se puede resolver de una vez. Si desde A (lejos) la elevación es α, desde B (más cerca, alineado con A y con el edificio, a distancia d de A) es β, y h es la altura, la diferencia de las dos distancias horizontales es d: h/tan α − h/tan β = d, de donde <b>h = d·tan α·tan β/(tan β − tan α)</b>. Con α = 30°, β = 45° y d = 50 m: h = 50·(1/√3)·1/(1 − 1/√3) = 50/(√3 − 1) = <b>68,30 m</b>, como antes. Cambia los ángulos y la distancia en el simulador y comprueba que <i>d</i> no tiene que ver con la distancia al edificio:</p>" +
    w("observador");

  nuevas.splice(nuevas.length - 2, 0,
    {
      h: "11. Del valor al ángulo: arcsen, arccos y arctan",
      html:
        "<p>Hasta ahora íbamos del <b>ángulo</b> a la <b>razón</b>: dado α = 30°, sen α = 1/2. En muchos problemas es al revés: conoces la razón (porque has medido dos lados) y quieres el <b>ángulo</b>. Para eso están las funciones inversas <b>arcsen</b>, <b>arccos</b> y <b>arctan</b>, que se leen «el ángulo cuyo seno (coseno, tangente) es…». En la calculadora son las teclas sen⁻¹, cos⁻¹ y tan⁻¹ (la segunda función de cada tecla).</p>" +
        ojo("sen⁻¹ x <b>no</b> significa 1/sen x. El «−1» indica la función inversa, no un exponente; el inverso 1/sen x es la cosecante.") +
        "<h5>La calculadora da un solo ángulo</h5>" +
        "<p>Un mismo seno lo tienen dos ángulos en cada vuelta (el de referencia y su suplementario), así que «¿qué ángulo tiene seno 0,5?» tiene muchas respuestas. Para que arcsen sea una función (una respuesta por pregunta) se acuerda que la calculadora devuelva siempre el ángulo de un trozo concreto de la circunferencia, el <b>rango principal</b>:</p>" +
        tabla(["Función", "Rango principal", "Cuadrantes", "Ejemplos"], [
          ["arcsen k  (|k| ≤ 1)", "de −90° a 90°", "1.º y 4.º", "arcsen 0,5 = 30° · arcsen(−0,5) = −30°"],
          ["arccos k  (|k| ≤ 1)", "de 0° a 180°", "1.º y 2.º", "arccos 0,5 = 60° · arccos(−0,5) = 120°"],
          ["arctan k  (cualquier k)", "de −90° a 90° (sin los extremos)", "1.º y 4.º", "arctan 1 = 45° · arctan(−1) = −45°"]
        ]) +
        "<p>Los rangos no son caprichosos: son los trozos en los que la función no repite valores (el seno sube de −1 a 1 entre −90° y 90°; el coseno baja de 1 a −1 entre 0° y 180°; la tangente sube de −∞ a +∞ entre −90° y 90°). En radianes, arcsen y arctan devuelven valores entre −π/2 y π/2, y arccos entre 0 y π. Mueve el valor <i>k</i> y mira dónde cae la respuesta de la calculadora y cuál es la «otra»:</p>" +
        w("inversas") +
        "<h5>De la respuesta de la calculadora a todas las soluciones</h5>" +
        "<p>Cuando necesitas todos los ángulos de [0°, 360°) con una razón dada, sigue siempre este recorrido: <b>(1)</b> calcula el ángulo que da la calculadora; <b>(2)</b> si sale negativo, súmale 360°; <b>(3)</b> añade el <b>otro</b> ángulo (180° − α para el seno, 360° − α para el coseno, α + 180° para la tangente); <b>(4)</b> si el enunciado dice en qué cuadrante está el ángulo, quédate con el que corresponda.</p>" +
        ejemplo("Un seno negativo", "Halla α en [0°, 360°) sabiendo que sen α = −0,8 y que α está en el 3.er cuadrante.", [
          "La calculadora da arcsen(−0,8) = −53,13° (sale negativo: es del 4.º cuadrante).",
          "El ángulo de referencia es 53,13°. Con seno negativo hay dos posibilidades: 180° + 53,13° (3.er cuadrante) y 360° − 53,13° (4.º).",
          "En el 3.er cuadrante: α = 180° + 53,13° = <b>233,13°</b>. (La otra solución sería 306,87°.)"
        ]) +
        ejemplo("Un ángulo con arccos", "En un triángulo de lados a = 7, b = 9 y c = 12, calcula el ángulo C opuesto a c.", [
          "Con tres lados usamos el teorema del coseno: cos C = (a² + b² − c²)/(2ab) = (49 + 81 − 144)/(2·7·9) = −14/126 = −1/9 ≈ −0,1111.",
          "C = arccos(−0,1111) = <b>96,38°</b>. La calculadora lo da bien porque arccos devuelve ángulos entre 0° y 180°, obtusos incluidos.",
          "Con el teorema del seno habríamos tenido sen C = 0,9938 y arcsen(0,9938) = 83,62°: ¡mal!, el ángulo verdadero es el suplementario, 180° − 83,62° = 96,38°."
        ]) +
        ejemplo("Una tangente negativa", "Resuelve tan x = −2 en [0°, 360°).", [
          "La calculadora da arctan(−2) = −63,43°.",
          "La tangente se repite cada 180°: x = −63,43° + 180° = 116,57° y x = −63,43° + 360° = 296,57°.",
          "<b>x = 116,57° y x = 296,57°</b> (2.º y 4.º cuadrante, donde la tangente es negativa)."
        ]) +
        ojo("arcsen <b>nunca</b> devuelve un ángulo obtuso. Por eso, si en un triángulo el ángulo buscado puede ser obtuso, hallarlo con el teorema del seno es una trampa (es el origen del caso ambiguo): <b>con tres lados, o con dos lados y el ángulo entre ellos, usa el coseno</b> y la calculadora no se equivocará.")
    },
    {
      h: "12. Radianes con soltura: ángulos coterminales, arcos y segmentos",
      html:
        "<h5>Ángulos coterminales</h5>" +
        "<p>Dos ángulos son <b>coterminales</b> si, dibujados desde el eje horizontal, acaban en el mismo lado: se diferencian en un número entero de vueltas. θ y θ + 360°·k (en radianes, θ + 2π·k, con k entero) tienen el mismo seno, coseno y tangente. De todos ellos, el <b>ángulo principal</b> es el que está en [0°, 360°) (o en [0, 2π)). Para hallarlo se quitan o se ponen vueltas completas. Si el ángulo es un múltiplo de π/n, basta pensar en «n-avos de π»: una vuelta son 2n de ellos.</p>" +
        ejemplo("Ángulo principal y razones", "Halla el ángulo principal de −750° y de 47π/6 rad, y calcula sen(−750°) y cos(47π/6).", [
          "−750° + 3·360° = −750° + 1080° = <b>330°</b>. Entonces sen(−750°) = sen 330° = −sen 30° = <b>−1/2</b>.",
          "47π/6 son 47 «sextos de π»; una vuelta (2π) son 12 sextos. Como 47 = 3·12 + 11, 47π/6 = 3·2π + 11π/6, y el ángulo principal es <b>11π/6</b> (= 330°).",
          "cos(47π/6) = cos(11π/6) = cos 330° = <b>√3/2</b>."
        ]) +
        ejemplo("Una familia de ángulos", "Escribe los ángulos coterminales con 50° y di cuáles están entre −400° y 800°.", [
          "Todos son de la forma 50° + 360°·k, con k entero (en radianes, 5π/18 + 2πk).",
          "k = −1 → −310°; k = 0 → 50°; k = 1 → 410°; k = 2 → 770°. (k = −2 da −670° y k = 3 da 1130°: fuera del intervalo.)",
          "Hay cuatro: <b>−310°, 50°, 410° y 770°</b>."
        ]) +
        "<h5>Velocidad angular y velocidad lineal</h5>" +
        "<p>Si algo gira, el ángulo que recorre por unidad de tiempo es la <b>velocidad angular</b> ω (en rad/s). Un punto a distancia r del centro recorre un arco s = θ·r, así que su <b>velocidad lineal</b> es <b>v = ω·r</b>. Para pasar de revoluciones por minuto (rpm) a rad/s: ω = rpm·2π/60. Es la misma idea de los radianes («arco = ángulo·radio») aplicada al movimiento circular.</p>" +
        ejemplo("Una rueda de bicicleta", "Una rueda de 35 cm de radio da 120 vueltas por minuto. Calcula su velocidad angular y la velocidad de la bicicleta (sin deslizar).", [
          "ω = 120·2π/60 = 4π ≈ <b>12,57 rad/s</b>.",
          "v = ω·r = 12,57·0,35 = <b>4,40 m/s</b> ≈ 15,8 km/h."
        ]) +
        "<h5>Arco, sector, cuerda y segmento circular</h5>" +
        "<p>Para un ángulo central θ (en radianes) en una circunferencia de radio r: el <b>arco</b> mide s = θ·r; el <b>sector</b> tiene área ½·r²·θ; la <b>cuerda</b> que une los extremos del arco mide c = 2·r·sen(θ/2); y el <b>segmento circular</b> (la parte del círculo que corta la cuerda) tiene área igual a la del sector menos la del triángulo de lados r, r y ángulo θ: <b>A = ½·r²·(θ − sen θ)</b>.</p>" +
        ejemplo("Un segmento circular", "En una circunferencia de radio 6 cm, un ángulo central mide 2 rad. Calcula el arco, la cuerda y el área del segmento.", [
          "Arco: s = 2·6 = <b>12 cm</b>. Cuerda: 2·6·sen(1 rad) = 12·0,8415 = <b>10,10 cm</b>.",
          "Sector: ½·36·2 = 36 cm². Triángulo: ½·36·sen 2 = 18·0,9093 = 16,37 cm² (¡calculadora en RAD!).",
          "Segmento = 36 − 16,37 = <b>19,63 cm²</b>."
        ]) +
        ejemplo("La aguja minutera", "La aguja minutera de un reloj de torre mide 1,2 m. ¿Qué ángulo, qué arco y qué área barre su punta en 25 minutos?", [
          "25 minutos son 25/60 de vuelta: θ = (25/60)·2π = 5π/6 rad (150°).",
          "Arco: s = θ·r = (5π/6)·1,2 = π ≈ <b>3,14 m</b>.",
          "Área barrida: ½·r²·θ = ½·1,44·5π/6 = 0,6π ≈ <b>1,88 m²</b>."
        ]) +
        ojo("para una fórmula como s = θ·r el ángulo <b>tiene que estar en radianes</b>. Con grados hay que convertir antes (o usar s = 2π·r·θ/360°). Y al calcular un seno de un ángulo en radianes, pon la calculadora en modo RAD.")
    },
    {
      h: "13. Todas las medidas de un triángulo: Herón, radios, alturas y medianas",
      html:
        "<p>Con un poco más de trigonometría se obtiene casi todo de un triángulo. Para el triángulo de lados a, b, c llamamos <b>semiperímetro</b> a s = (a + b + c)/2 y S al área:</p>" +
        tabla(["Medida", "Fórmula", "Qué es"], [
          ["Área (Herón)", "S = √( s(s − a)(s − b)(s − c) )", "con los tres lados"],
          ["Altura sobre el lado a", "h<sub>a</sub> = 2S/a = b·sen C", "distancia del vértice A al lado a"],
          ["Radio circunscrito R", "R = a/(2·sen A) = abc/(4S)", "circunferencia que pasa por los tres vértices"],
          ["Radio inscrito r", "r = S/s", "circunferencia tangente a los tres lados"],
          ["Mediana desde A", "m<sub>a</sub> = ½·√(2b² + 2c² − a²)", "segmento de A al punto medio del lado a"]
        ]) +
        "<h5>De dónde salen</h5>" +
        "<p><b>Herón.</b> Partimos de S = ½bc·sen A. Entonces 16S² = 4b²c²·sen²A = 4b²c² − 4b²c²·cos²A = 4b²c² − (b² + c² − a²)², donde hemos usado el teorema del coseno (2bc·cos A = b² + c² − a²). Es una diferencia de cuadrados: = [a² − (b − c)²]·[(b + c)² − a²] = (a − b + c)(a + b − c)(b + c − a)(a + b + c) = 16·s(s − a)(s − b)(s − c), porque cada factor es el doble de s menos un lado. Por tanto, S² = s(s − a)(s − b)(s − c).</p>" +
        "<p><b>Radio circunscrito.</b> El teorema del seno completo dice a/sen A = 2R. Con S = ½bc·sen A = ½bc·a/(2R) = abc/(4R) se obtiene R = abc/(4S). <b>Radio inscrito.</b> Uniendo el centro de la circunferencia inscrita con los tres vértices, el triángulo se divide en tres, de altura r: S = ½ar + ½br + ½cr = r·s. <b>Mediana.</b> El teorema del coseno en los dos triángulos pequeños que forma la mediana, sumados, da m<sub>a</sub>² = (2b² + 2c² − a²)/4.</p>" +
        ejemplo("El triángulo 13, 14, 15 al completo", "Calcula del triángulo de lados 13, 14 y 15: el área, las tres alturas, los radios R y r, los ángulos y la mediana sobre el lado 14.", [
          "s = 21 y S = √(21·8·7·6) = √7056 = <b>84</b>.",
          "Alturas: h<sub>13</sub> = 2·84/13 = 12,92; h<sub>14</sub> = 2·84/14 = 12; h<sub>15</sub> = 2·84/15 = 11,2. (La altura mayor cae sobre el lado menor.)",
          "R = 13·14·15/(4·84) = 2730/336 = <b>8,125</b> y r = 84/21 = <b>4</b>.",
          "Ángulos: sen A = a/(2R) = 13/16,25 = 0,8 → A = 53,13°. Los otros con el coseno: cos B = (13² + 15² − 14²)/(2·13·15) = 0,5077 → B = 59,49°, y C = 180° − 53,13° − 59,49° = 67,38°.",
          "Mediana sobre el lado 14: m = ½·√(2·13² + 2·15² − 14²) = ½·√592 = <b>12,17</b>."
        ]) +
        ejemplo("Un triángulo rectángulo: 8, 15, 17", "Calcula el área y los radios R y r del triángulo de lados 8, 15 y 17.", [
          "s = 20 y S = √(20·12·5·3) = √3600 = <b>60</b> (que coincide con ½·8·15, como debe).",
          "R = 8·15·17/(4·60) = 2040/240 = <b>8,5</b> = hipotenusa/2: en un triángulo rectángulo el circuncentro es el punto medio de la hipotenusa.",
          "r = 60/20 = <b>3</b> = (8 + 15 − 17)/2: en un triángulo rectángulo, r = (cateto + cateto − hipotenusa)/2."
        ]) +
        ojo("en Herón hay que usar el <b>semi</b>perímetro s, no el perímetro. Y comprueba que cada factor (s − a), (s − b), (s − c) sale positivo: si alguno sale negativo o cero, los lados no forman un triángulo.")
    },
    {
      h: "14. Rumbos, azimuts y navegación",
      html:
        "<p>En navegación y aviación los ángulos no se miden como en la circunferencia goniométrica (desde el eje X, al revés que las agujas del reloj) sino desde el <b>norte</b> y en el <b>sentido de las agujas del reloj</b>. Ese ángulo se llama <b>rumbo</b> (o <b>azimut</b>, cuando es la dirección de un punto visto desde otro) y se escribe con tres cifras: 040°, 135°, 270°.</p>" +
        tabla(["Dirección", "N", "NE", "E", "SE", "S", "SO", "O", "NO"], [["Rumbo", "000°", "045°", "090°", "135°", "180°", "225°", "270°", "315°"]]) +
        "<p>También se usa la notación de cuadrante: «N 40° E» es la dirección que se separa 40° del norte hacia el este (rumbo 040°), y «S 30° O» la que se separa 30° del sur hacia el oeste (rumbo 210°). Practica el cambio de notación:</p>" +
        w("emparejar", "rumbos") +
        "<h5>Del rumbo a las coordenadas</h5>" +
        "<p>Tomamos el este como eje horizontal y el norte como eje vertical. Un desplazamiento de d kilómetros con rumbo ρ avanza <b>E = d·sen ρ</b> hacia el este y <b>N = d·cos ρ</b> hacia el norte. Fíjate: seno y coseno están «cambiados» respecto de la circunferencia goniométrica, porque ahora el ángulo se mide desde el norte. Es lo mismo que usar el ángulo matemático 90° − ρ. Con 20 km a rumbo 040°: E = 20·sen 40° = 12,86 km y N = 20·cos 40° = 15,32 km.</p>" +
        "<h5>Dos tramos y el regreso</h5>" +
        "<p>El caso típico: un barco hace un tramo, cambia de rumbo y hace otro. Los dos tramos y el regreso forman un triángulo en el que conoces dos lados y el ángulo entre ellos (LAL). Atención al ángulo: si el rumbo pasa de ρ₁ a ρ₂, el barco <b>gira</b> ρ₂ − ρ₁, pero el ángulo interior del triángulo es el suplementario, <b>180° − giro</b>. Cambia los rumbos y las distancias y mira el triángulo:</p>" +
        w("navegacion") +
        ejemplo("Dos tramos y el regreso", "Un barco sale de puerto, navega 20 km con rumbo 040° y después 30 km con rumbo 100°. ¿A qué distancia del puerto está y con qué rumbo debe volver?", [
          "El rumbo cambia de 040° a 100°: giro de 60° a la derecha. El ángulo interior del triángulo (puerto, punto de giro, punto final) es 180° − 60° = 120°.",
          "Teorema del coseno: d² = 20² + 30² − 2·20·30·cos 120° = 400 + 900 + 600 = 1900 → d = <b>43,59 km</b>.",
          "Para el rumbo de regreso calculamos el ángulo en el puerto con el teorema del seno: sen θ = 30·sen 120°/43,59 = 0,596 → θ = 36,59°. Desde el puerto, el punto final está en el rumbo 040° + 36,59° = 076,59°; el regreso es el opuesto: 076,59° + 180° = <b>256,59°</b>.",
          "Comprobación con coordenadas: el punto final es (12,86 + 29,54; 15,32 − 5,21) = (42,40; 10,11), y desde ahí al puerto el rumbo es 256,59° ✓."
        ]) +
        ejemplo("Un faro y dos marcaciones", "Un barco navega hacia el norte (rumbo 000°). Desde A ve un faro con rumbo 040° y, tras avanzar 6 km hasta B, con rumbo 070°. ¿A qué distancia está el faro de B y a qué distancia pasa de la ruta?", [
          "Triángulo ABF: en A, entre la ruta (norte) y la visual al faro, el ángulo es 40°. En B, la dirección hacia A es el sur (180°) y la visual al faro es 070°: el ángulo interior es 180° − 70° = 110°.",
          "En F: 180° − 40° − 110° = 30°.",
          "Teorema del seno: BF/sen 40° = AB/sen 30° → BF = 6·sen 40°/sen 30° = <b>7,71 km</b>.",
          "La distancia del faro a la ruta (hacia el este) es BF·sen 70° = 7,71·0,9397 = <b>7,25 km</b>."
        ]) +
        ejemplo("Viento y rumbo: sumar velocidades", "Un avión vuela con velocidad propia de 240 km/h y rumbo 060°. Sopla un viento de 50 km/h hacia el rumbo 120°. ¿Cuál es su velocidad respecto al suelo y su rumbo real?", [
          "La velocidad respecto al suelo es la suma de los dos vectores. Entre sus direcciones (060° y 120°) hay 60°, así que en el triángulo de velocidades el ángulo entre los dos lados conocidos es 180° − 60° = 120°.",
          "v² = 240² + 50² − 2·240·50·cos 120° = 57 600 + 2 500 + 12 000 = 72 100 → v = <b>268,5 km/h</b>.",
          "El rumbo se desvía un ángulo δ hacia el viento: sen δ/50 = sen 120°/268,5 → sen δ = 0,1613 → δ = 9,28°. Rumbo real: 060° + 9,28° = <b>069,3°</b>.",
          "Comprobación con coordenadas: (240·sen 60° + 50·sen 120°, 240·cos 60° + 50·cos 120°) = (251,15; 95), y atan2(251,15; 95) = 69,3° ✓."
        ]) +
        ojo("el fallo más repetido en navegación: usar como ángulo del triángulo la <b>diferencia de rumbos</b>. Es el ángulo que giras, no el ángulo interior; el interior es 180° menos el giro.")
    },
    {
      h: "15. Polígonos, cuadriláteros y problemas en el espacio",
      html:
        "<h5>Polígonos regulares</h5>" +
        "<p>Un polígono regular de n lados (lado ℓ) se descompone en n triángulos isósceles iguales, con vértice en el centro y ángulo central 360°/n. Cada uno se parte por su altura (la <b>apotema</b>) en dos triángulos rectángulos con ángulo 180°/n:</p>" +
        H.formula("R = " + fr("ℓ", "2·sen(180°/n)") + "      apotema a = " + fr("ℓ", "2·tan(180°/n)") + "      Área = ½·n·R²·sen(360°/n) = ½·perímetro·apotema") +
        ejemplo("Un octógono regular", "Calcula el radio, la apotema y el área de un octógono regular de lado 5 cm.", [
          "n = 8: el ángulo central es 45° y el medio, 22,5°.",
          "R = 5/(2·sen 22,5°) = <b>6,53 cm</b>. Apotema: a = 5/(2·tan 22,5°) = <b>6,04 cm</b>.",
          "Área = ½·perímetro·apotema = ½·40·6,036 = <b>120,71 cm²</b>. (Con la otra fórmula: ½·8·6,533²·sen 45° = 120,71 ✓.)"
        ]) +
        "<h5>Cuadriláteros: se parten en triángulos</h5>" +
        "<p>Para un terreno de cuatro lados se traza una <b>diagonal</b> que lo divide en dos triángulos; se resuelve uno con los datos de que se dispone (normalmente LAL) y el otro con el lado nuevo (Herón o el coseno).</p>" +
        ejemplo("Un terreno ABCD", "Un terreno cuadrilátero ABCD tiene AB = 6 m, BC = 8 m, CD = 7 m, DA = 5 m y el ángulo en B mide 70°. Calcula su área.", [
          "Diagonal AC en el triángulo ABC (LAL): AC² = 36 + 64 − 2·6·8·cos 70° = 100 − 32,83 = 67,17 → AC = 8,195 m.",
          "Área de ABC = ½·6·8·sen 70° = <b>22,55 m²</b>.",
          "Triángulo ACD con lados 8,195; 7 y 5: s = 10,0977 y Herón: S = √(10,0977·1,9023·3,0977·5,0977) = <b>17,42 m²</b>.",
          "Área total ≈ 22,55 + 17,42 = <b>39,97 m²</b>."
        ]) +
        "<h5>En el espacio</h5>" +
        "<p>Un problema en tres dimensiones se resuelve casi siempre buscando <b>triángulos rectángulos</b> dentro de la figura. El ángulo entre una recta y un plano es el que forma la recta con su <b>proyección</b> sobre el plano; el ángulo entre dos planos, el que forman dos rectas perpendiculares a su arista común (una en cada plano).</p>" +
        ejemplo("La diagonal de un cubo", "En un cubo de arista a, ¿qué ángulo forma la diagonal del cubo con la base?", [
          "La proyección de la diagonal del cubo sobre la base es la diagonal de la base, que mide a√2 (Pitágoras). La diagonal del cubo mide a√3.",
          "En el triángulo rectángulo de catetos a (vertical) y a√2 (en la base): tan α = a/(a√2) = 1/√2 → α = <b>35,26°</b>.",
          "Comprobación: sen α = a/(a√3) = 1/√3 = 0,5774 → 35,26° ✓. No depende de a."
        ]) +
        ejemplo("Una pirámide regular", "Una pirámide regular de base cuadrada tiene lado de base 10 m y altura 12 m. Calcula el ángulo de una cara lateral con la base y el de una arista lateral con la base.", [
          "Cara lateral: el triángulo rectángulo formado por la altura (12), la mitad del lado de la base (5) y la apotema de la cara. tan φ = 12/5 → φ = <b>67,38°</b> (la apotema mide √(144 + 25) = 13).",
          "Arista lateral: su proyección sobre la base es la mitad de la diagonal, 5√2 = 7,07. tan ψ = 12/7,07 → ψ = <b>59,49°</b>; la arista mide √(144 + 50) = 13,93 m."
        ]) +
        ejemplo("Una antena sobre un edificio", "Desde un punto del suelo a 60 m de la base de un edificio se ve el borde del tejado con elevación de 25° y la punta de la antena con 40°. ¿Cuánto mide la antena?", [
          "Altura del edificio: 60·tan 25° = 27,98 m.",
          "Altura hasta la punta: 60·tan 40° = 50,35 m.",
          "Antena = 50,35 − 27,98 = <b>22,37 m</b>."
        ])
    },
    {
      h: "16. Problemas de examen resueltos paso a paso",
      html:
        "<p>Un problema de trigonometría se resuelve casi siempre con la misma receta: <b>(1)</b> dibuja el triángulo y anota los datos; <b>(2)</b> identifica el caso (LLL, LAL, ALA o LLA); <b>(3)</b> elige el teorema (coseno si no tienes una pareja lado-ángulo opuesto; seno si la tienes); <b>(4)</b> calcula con la calculadora en DEG; <b>(5)</b> comprueba (los ángulos suman 180°, el lado mayor está frente al ángulo mayor, el orden de magnitud es razonable); <b>(6)</b> contesta con unidades.</p>" +
        ejemplo("Problema 1 · Dos lados y el ángulo entre ellos", "En un triángulo ABC, AB = 10 cm, AC = 14 cm y el ángulo en A mide 50°. Calcula BC, los otros dos ángulos, el área y la altura desde C.", [
          "LAL: teorema del coseno. a² = 10² + 14² − 2·10·14·cos 50° = 296 − 179,98 = 116,02 → a = BC = <b>10,77 cm</b>.",
          "Ángulo B (opuesto a b = 14): cos B = (a² + c² − b²)/(2ac) = (116,02 + 100 − 196)/(2·10,77·10) = 0,0929 → B = <b>84,67°</b>. (Con el coseno no hay duda entre agudo y obtuso.)",
          "C = 180° − 50° − 84,67° = <b>45,33°</b>. Comprobación: el lado mayor (14) está frente al ángulo mayor (84,67°) ✓.",
          "Área = ½·10·14·sen 50° = <b>53,62 cm²</b>. La altura desde C sobre AB: h = 2S/AB = 107,25/10 = <b>10,72 cm</b>."
        ]) +
        ejemplo("Problema 2 · Un globo entre dos observadores", "Dos observadores A y B están separados 500 m en terreno llano. Ven un globo G, en el mismo plano vertical y entre ellos, con elevaciones de 62° (desde A) y 48° (desde B). ¿A qué altura vuela?", [
          "Triángulo ABG: el ángulo en G es 180° − 62° − 48° = 70°.",
          "Teorema del seno: AG/sen 48° = 500/sen 70° → AG = 500·0,7431/0,9397 = 395,4 m.",
          "Altura: h = AG·sen 62° = 395,4·0,8829 = <b>349,1 m</b>.",
          "Comprobación desde B: BG = 500·sen 62°/sen 70° = 469,8 m y BG·sen 48° = 349,1 m ✓."
        ]) +
        ejemplo("Problema 3 · Hipotenusa y perímetro", "La hipotenusa de un triángulo rectángulo mide 20 cm y su perímetro 48 cm. Halla los catetos y los ángulos.", [
          "Catetos x e y: x + y = 48 − 20 = 28 y x² + y² = 400.",
          "(x + y)² = 784 → 400 + 2xy = 784 → xy = 192.",
          "x e y son las raíces de t² − 28t + 192 = 0 → t = (28 ± √(784 − 768))/2 = (28 ± 4)/2 = 16 y 12. Catetos <b>12 y 16 cm</b>.",
          "sen α = 12/20 = 0,6 → α = <b>36,87°</b>; el otro ángulo mide 53,13°."
        ]) +
        ejemplo("Problema 4 · ¿Cuántos triángulos hay?", "En un triángulo, a = 9 cm, b = 12 cm y A = 30°. Estudia cuántos triángulos hay y resuélvelos.", [
          "Caso LLA con A agudo. Altura h = b·sen A = 12·0,5 = 6. Como h = 6 &lt; a = 9 &lt; b = 12, hay <b>dos triángulos</b>.",
          "sen B = b·sen A/a = 12·0,5/9 = 0,6667 → B₁ = 41,81° o B₂ = 180° − 41,81° = 138,19°.",
          "Triángulo 1: C₁ = 180° − 30° − 41,81° = 108,19° → c₁ = a·sen C₁/sen A = 9·0,9501/0,5 = <b>17,10 cm</b>.",
          "Triángulo 2: C₂ = 180° − 30° − 138,19° = 11,81° → c₂ = 9·sen 11,81°/0,5 = <b>3,68 cm</b>. (Cabe, porque A + B₂ = 168,19° &lt; 180°.)"
        ]) +
        "<p>Al corregir, los examinadores puntúan sobre todo el <b>planteamiento</b> (el dibujo, el teorema elegido y la sustitución correcta) y luego el resultado: aunque falle una cuenta, un buen planteamiento da la mayor parte de los puntos. Y no redondees los pasos intermedios: guarda los valores en la memoria de la calculadora.</p>"
    }
  );

  datos.errores.preguntas.push(
    { q: "Para el triángulo de lados 4, 5 y 8, un alumno halla el ángulo C (opuesto al lado 8) con el teorema del seno y obtiene 54,9°. Otro usa el teorema del coseno y obtiene 125,1°. ¿Quién tiene razón?",
      op: ["El primero: el seno nunca falla", "Los dos: son el mismo ángulo", "El segundo: C es obtuso, y arcsen nunca devuelve ángulos obtusos", "Ninguno: el triángulo no existe"], ok: 2,
      porque: "cos C = (16 + 25 − 64)/40 = −0,575 → C = 125,1° (obtuso). El seno de 125,1° y el de 54,9° son iguales y arcsen devuelve el agudo. Con tres lados, usa siempre el coseno." },
    { q: "Un barco navega 20 km con rumbo 040° y luego 30 km con rumbo 100°. Un alumno aplica el teorema del coseno con el ángulo 100° − 40° = 60° y obtiene d = 26,5 km. ¿Qué falla?",
      op: ["Nada: el ángulo es la diferencia de rumbos", "El ángulo del triángulo es 180° − 60° = 120°: d = 43,59 km", "Debía usar el teorema del seno", "Los rumbos se miden desde el este"], ok: 1,
      porque: "La diferencia de rumbos (60°) es lo que gira el barco. El ángulo interior del triángulo es el suplementario, 120°: d² = 400 + 900 − 2·20·30·cos 120° = 1900." },
    { q: "Para calcular el arco de un ángulo de 60° en una circunferencia de radio 3 cm, un alumno escribe s = θ·r = 60·3 = 180 cm. ¿Qué falla?",
      op: ["Nada", "Con θ en grados la fórmula no vale: hay que pasar 60° a π/3 rad y s = π/3·3 = π ≈ 3,14 cm", "Debía dividir entre 3", "Debía multiplicar por 360"], ok: 1,
      porque: "s = θ·r exige radianes. 60° = π/3 rad, así que el arco mide π ≈ 3,14 cm (la sexta parte de la circunferencia de 6π cm)." }
  );

  datos.quiz1.preguntas.push(
    { q: "¿Cuánto vale arccos(−1/2)?",
      op: ["−60°", "120°", "240°", "60°"], ok: 1,
      porque: "arccos devuelve ángulos entre 0° y 180°. cos 120° = −1/2, así que arccos(−1/2) = 120° (240° también tiene ese coseno, pero está fuera del rango principal)." },
    { q: "La calculadora da arcsen(0,6) = 36,87°. ¿Qué otro ángulo de [0°, 360°) tiene ese seno?",
      op: ["53,13°", "143,13°", "216,87°", "323,13°"], ok: 1,
      porque: "El otro ángulo con el mismo seno es el suplementario: 180° − 36,87° = 143,13° (2.º cuadrante, donde el seno también es positivo)." },
    { q: "Un avión vuela 100 km con rumbo 090° y después 100 km con rumbo 180°. ¿A qué distancia está del punto de partida?",
      op: ["200 km", "100 km", "141,4 km", "70,7 km"], ok: 2,
      porque: "Va al este y luego al sur: los dos tramos son perpendiculares (giro de 90°, ángulo interior de 90°). d = √(100² + 100²) = 141,4 km." },
    { q: "¿Qué área tiene un triángulo de lados 5, 12 y 13?",
      op: ["30", "60", "32,5", "78"], ok: 0,
      porque: "Herón: s = 15 y S = √(15·10·3·2) = √900 = 30. (Es un triángulo rectángulo: ½·5·12 = 30.)" },
    { q: "¿Cuánto mide el radio de la circunferencia circunscrita a un triángulo rectángulo de hipotenusa 10?",
      op: ["10", "5", "20", "√50"], ok: 1,
      porque: "En un triángulo rectángulo el circuncentro es el punto medio de la hipotenusa: R = hipotenusa/2 = 5. (También sale de R = a/(2·sen A) con A = 90°.)" },
    { q: "¿En qué cuadrante está un ángulo de 3 radianes?",
      op: ["1.º", "2.º", "3.º", "4.º"], ok: 1,
      porque: "3 rad = 3·180°/π ≈ 171,9°, que está entre 90° y 180°: 2.º cuadrante. (π/2 ≈ 1,57 y π ≈ 3,14.)" }
  );

  ejercicios.push(
    // ================= ★ básico =================
    { id: "g37", nivel: 1,
      enunciado: "Halla el ángulo principal (entre 0 y 2π) de 61π/4 rad y calcula su seno.",
      check: [{ tipo: "num", etiqueta: "ángulo principal =", valor: 5 * Math.PI / 4, unidad: "rad", tol: 0.002, ph: "decimal (o 5pi/4)" }, { tipo: "num", etiqueta: "seno =", valor: -Math.SQRT1_2, tol: 0.002, ph: "decimal" }],
      pistas: ["Una vuelta completa son 2π = 8π/4.", "Divide 61 entre 8 y quédate con el resto."],
      pasos: ["Una vuelta son 2π = 8π/4. Como 61 = 7·8 + 5, 61π/4 = 7·2π + 5π/4.", "El ángulo principal es 5π/4 (= 225°), del 3.er cuadrante.", "sen(5π/4) = −sen(π/4) = −√2/2 ≈ −0,7071."],
      resultado: "5π/4 rad · sen = −√2/2 ≈ −0,7071" },
    { id: "g38", nivel: 1,
      enunciado: "La calculadora da arccos(−0,5) = 120°. ¿Qué otro ángulo de [0°, 360°) tiene ese mismo coseno?",
      check: { tipo: "num", etiqueta: "el otro ángulo =", valor: 240, unidad: "°" },
      pistas: ["El coseno es positivo en el 1.er y 4.º cuadrante y negativo en el 2.º y 3.º.", "Para el coseno, la otra solución es 360° − α."],
      pasos: ["El coseno es negativo en el 2.º y el 3.er cuadrante. 120° está en el 2.º.", "El otro es su simétrico respecto del eje horizontal: 360° − 120° = 240°.", "Comprobación: cos 240° = −cos 60° = −0,5 ✓."],
      resultado: "240°" },
    // ================= ★★ intermedio =================
    { id: "g39", nivel: 2,
      enunciado: "Un barco sale de puerto, navega 25 km con rumbo 060° y después 40 km con rumbo 160°. ¿A qué distancia del puerto está y con qué rumbo (0 a 360°) debe volver?",
      check: [{ tipo: "num", etiqueta: "distancia =", valor: 43.33, unidad: "km" }, { tipo: "num", etiqueta: "rumbo de regreso =", valor: 305.38, unidad: "°" }],
      pistas: ["El barco gira 160° − 60° = 100°; el ángulo interior del triángulo es 180° − 100°.", "Para el rumbo, calcula las coordenadas (E = d·sen ρ, N = d·cos ρ) del punto final."],
      pasos: ["Ángulo interior = 180° − 100° = 80°. d² = 25² + 40² − 2·25·40·cos 80° = 2225 − 347,30 = 1877,70 → d = 43,33 km.", "Punto final: E = 25·sen 60° + 40·sen 160° = 21,65 + 13,68 = 35,33; N = 25·cos 60° + 40·cos 160° = 12,5 − 37,59 = −25,09.", "Rumbo puerto → punto final: atan2(35,33; −25,09) = 125,4° (hacia el sureste). El regreso es el opuesto: 125,4° + 180° = 305,4°."],
      resultado: "d ≈ 43,33 km · rumbo de regreso ≈ 305,4°" },
    { id: "g40", nivel: 2,
      enunciado: "Los lados de un triángulo miden 9, 10 y 17 cm. Calcula su área, el radio r de la circunferencia inscrita y el radio R de la circunscrita.",
      check: [{ tipo: "num", etiqueta: "área =", valor: 36, unidad: "cm²" }, { tipo: "num", etiqueta: "r =", valor: 2, unidad: "cm" }, { tipo: "num", etiqueta: "R =", valor: 10.625, unidad: "cm" }],
      pistas: ["Herón: s = (9 + 10 + 17)/2.", "r = S/s y R = abc/(4S)."],
      pasos: ["s = 18 y S = √(18·9·8·1) = √1296 = 36 cm².", "r = S/s = 36/18 = 2 cm.", "R = 9·10·17/(4·36) = 1530/144 = 10,625 cm."],
      resultado: "S = 36 cm² · r = 2 cm · R = 10,625 cm" },
    { id: "g41", nivel: 2,
      enunciado: "Desde un punto del suelo a 40 m de la base de un edificio se ve el borde del tejado con elevación de 35° y la punta de una antena situada sobre él con 50°. ¿Cuánto mide la antena?",
      check: { tipo: "num", etiqueta: "antena =", valor: 19.66, unidad: "m" },
      pistas: ["Calcula por separado la altura hasta el tejado y hasta la punta de la antena."],
      pasos: ["Hasta el tejado: 40·tan 35° = 28,01 m.", "Hasta la punta: 40·tan 50° = 47,67 m.", "Antena = 47,67 − 28,01 = 19,66 m."],
      resultado: "≈ 19,66 m" },
    { id: "g42", nivel: 2,
      enunciado: "En una circunferencia de radio 10 cm, un ángulo central mide 80°. Calcula el área del segmento circular que limita su cuerda.",
      check: { tipo: "num", etiqueta: "área del segmento =", valor: 20.57, unidad: "cm²" },
      pistas: ["Pasa 80° a radianes.", "Área del segmento = ½·r²·(θ − sen θ)."],
      pasos: ["θ = 80·π/180 = 1,3963 rad.", "Sector: ½·100·1,3963 = 69,81 cm². Triángulo: ½·100·sen 80° = 49,24 cm².", "Segmento = 69,81 − 49,24 = 20,57 cm²."],
      resultado: "≈ 20,57 cm²" },
    { id: "g43", nivel: 2,
      enunciado: "Un disco de 12 cm de radio gira a 45 revoluciones por minuto. Calcula su velocidad angular (rad/s) y la velocidad lineal (m/s) de un punto de su borde.",
      check: [{ tipo: "num", etiqueta: "ω =", valor: 4.712, unidad: "rad/s" }, { tipo: "num", etiqueta: "v =", valor: 0.5655, unidad: "m/s" }],
      pistas: ["ω = rpm·2π/60.", "v = ω·r, con el radio en metros."],
      pasos: ["ω = 45·2π/60 = 1,5π = 4,712 rad/s.", "v = ω·r = 4,712·0,12 = 0,5655 m/s."],
      resultado: "ω = 1,5π ≈ 4,712 rad/s · v ≈ 0,5655 m/s" },
    // ================= ★★★ reto =================
    { id: "g44", nivel: 3,
      enunciado: "Una caja (ortoedro) mide 3 × 4 × 12 cm. Calcula la longitud de su diagonal y el ángulo que forma esa diagonal con la base de 3 × 4.",
      check: [{ tipo: "num", etiqueta: "diagonal =", valor: 13, unidad: "cm" }, { tipo: "num", etiqueta: "ángulo con la base =", valor: 67.38, unidad: "°" }],
      pistas: ["La diagonal de la base es la proyección de la diagonal de la caja.", "Forma un triángulo rectángulo con la altura (12) y la diagonal de la base."],
      pasos: ["Diagonal de la base: √(3² + 4²) = 5.", "Diagonal de la caja: √(5² + 12²) = 13 cm.", "tan α = 12/5 → α = 67,38° (o sen α = 12/13)."],
      resultado: "diagonal 13 cm · ángulo ≈ 67,38°" },
    { id: "g45", nivel: 3,
      enunciado: "Un barco navega hacia el norte. Desde A ve un faro con rumbo 030° y, tras avanzar 10 km hasta B, lo ve con rumbo 075°. Calcula la distancia BF del barco al faro desde B y la distancia mínima del faro a la ruta.",
      check: [{ tipo: "num", etiqueta: "BF =", valor: 7.071, unidad: "km" }, { tipo: "num", etiqueta: "distancia a la ruta =", valor: 6.83, unidad: "km" }],
      pistas: ["Ángulo en A: 30°. En B, el ángulo interior es 180° − 75°.", "La distancia a la ruta es BF·sen 75°."],
      pasos: ["En A: 30°. En B: 180° − 75° = 105°. En F: 180° − 30° − 105° = 45°.", "Teorema del seno: BF/sen 30° = 10/sen 45° → BF = 10·0,5/0,7071 = 7,071 km.", "Distancia a la ruta (hacia el este): BF·sen 75° = 7,071·0,9659 = 6,83 km."],
      resultado: "BF ≈ 7,07 km · distancia a la ruta ≈ 6,83 km" },
    { id: "g46", nivel: 3,
      enunciado: "Un terreno ABCD tiene AB = 50 m, BC = 70 m, CD = 60 m, DA = 45 m y el ángulo en B mide 60°. Calcula la diagonal AC y el área total del terreno.",
      check: [{ tipo: "num", etiqueta: "AC =", valor: 62.45, unidad: "m" }, { tipo: "num", etiqueta: "área =", valor: 2794.8, unidad: "m²" }],
      pistas: ["Teorema del coseno en ABC para AC.", "El triángulo ACD tiene los tres lados: Herón."],
      pasos: ["AC² = 50² + 70² − 2·50·70·cos 60° = 7400 − 3500 = 3900 → AC = 62,45 m.", "Área ABC = ½·50·70·sen 60° = 1515,54 m².", "ACD (62,45; 60; 45): s = 83,725 → S = √(83,725·21,275·23,725·38,725) = 1279,27 m².", "Área total = 1515,54 + 1279,27 = 2794,81 m²."],
      resultado: "AC ≈ 62,45 m · área ≈ 2794,8 m²" },
    { id: "g47", nivel: 3,
      enunciado: "Demuestra que el área de un triángulo es S = abc/(4R), siendo R el radio de su circunferencia circunscrita.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Parte de S = ½·b·c·sen A", p: 0.5 },
        { t: "Usa el teorema del seno ampliado: a/sen A = 2R, es decir, sen A = a/(2R)", p: 0.5 },
        { t: "Sustituye: S = ½·b·c·a/(2R)", p: 0.5 },
        { t: "Simplifica y llega a S = abc/(4R)", p: 0.5 }
      ] },
      pasos: ["S = ½·b·c·sen A.", "El teorema del seno dice a/sen A = 2R, así que sen A = a/(2R).", "S = ½·b·c·a/(2R) = abc/(4R)."],
      resultado: "S = abc/(4R)" },
    { id: "g48", nivel: 3,
      enunciado: "Un pentágono regular tiene 8 cm de lado. Calcula el radio de la circunferencia circunscrita, la apotema y el área.",
      check: [{ tipo: "num", etiqueta: "radio =", valor: 6.805, unidad: "cm" }, { tipo: "num", etiqueta: "apotema =", valor: 5.506, unidad: "cm" }, { tipo: "num", etiqueta: "área =", valor: 110.11, unidad: "cm²" }],
      pistas: ["El ángulo central es 360°/5 = 72°; el triángulo rectángulo tiene ángulo 36° y cateto 4.", "Área = ½·perímetro·apotema."],
      pasos: ["R = 8/(2·sen 36°) = 4/0,5878 = 6,805 cm.", "Apotema a = 4/tan 36° = 4/0,7265 = 5,506 cm.", "Área = ½·(5·8)·5,506 = 110,11 cm²."],
      resultado: "R ≈ 6,81 cm · apotema ≈ 5,51 cm · área ≈ 110,11 cm²" }
  );

  lamina.push(
    { titulo: "Del valor al ángulo y rumbos",
      items: [
        { label: "Funciones inversas", formula: "arcsen k ∈ [−90°, 90°]  ·  arccos k ∈ [0°, 180°]  ·  arctan k ∈ (−90°, 90°)", cuando: "Conoces la razón y buscas el ángulo.", ojo: "Da un solo ángulo: añade el otro (180° − α para sen; 360° − α para cos; α + 180° para tan)." },
        { label: "Rumbo → coordenadas", formula: "E = d·sen ρ  ·  N = d·cos ρ", cuando: "ρ se mide desde el norte, en sentido horario.", ejemplo: "20 km a 040° → E = 12,86 · N = 15,32" },
        { label: "Cambio de rumbo", formula: "ángulo del triángulo = 180° − giro", ejemplo: "040° → 100°: giro 60°, ángulo interior 120°" }
      ],
      tabla: { cab: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"], filas: [["000°", "045°", "090°", "135°", "180°", "225°", "270°", "315°"]] },
      nota: "Con tres lados (o dos lados y el ángulo entre ellos) usa el coseno: arccos sí distingue agudos y obtusos." },
    { titulo: "Medidas del triángulo y de las figuras", ancha: true,
      items: [
        { label: "Herón y radios", formula: "S = √(s(s−a)(s−b)(s−c))  ·  R = abc/(4S)  ·  r = S/s", ejemplo: "13, 14, 15 → S = 84 · R = 8,125 · r = 4" },
        { label: "Altura y mediana", formula: "h<sub>a</sub> = 2S/a  ·  m<sub>a</sub> = ½√(2b² + 2c² − a²)" },
        { label: "Polígono regular de n lados", formula: "R = ℓ/(2·sen(180°/n))  ·  a = ℓ/(2·tan(180°/n))  ·  S = ½·n·ℓ·a" },
        { label: "Arco, sector y segmento", formula: "s = θ·r  ·  A<sub>sector</sub> = ½r²θ  ·  A<sub>segmento</sub> = ½r²(θ − sen θ)  ·  cuerda = 2r·sen(θ/2)", cuando: "θ en radianes." }
      ],
      nota: "Cuadrilátero: traza una diagonal y resuelve dos triángulos. En el espacio: busca triángulos rectángulos." }
  );

  B.registrar("mates1", "t4", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
