/* ============================================================
   Matemáticas I · ampliaciones
   Tema 11: Derivadas y aplicaciones
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos, bloques de la lámina
   y un simulacro nuevo.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  // ---------- ayudantes de maquetación (compartidos en nucleo.js) ----------
  var H = B.h, fr = H.fr, raiz = H.raiz, formula = H.formula, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(nombre, ref) { return H.w(nombre, ref && "mates1/t11/" + ref); }

  // ============================================================
  // TEORÍA: se añade al final de cada sección existente (índice 0 = sección 1)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Velocidad media y ritmo medio de cambio</h5>" +
    "<p>Si f(t) es la posición de un coche (en metros) en el instante t (en segundos), la TVM entre t₁ y t₂ es justo su <b>velocidad media</b>: metros recorridos entre segundos transcurridos. Con cualquier otra magnitud (temperatura, beneficios, población…) la TVM es su <b>ritmo medio de cambio</b>: cuánto sube o baja de media por cada unidad de x. Por eso la TVM siempre lleva unidades: las de f entre las de x.</p>" +
    ejemplo("Ejemplo resuelto", "La posición de un coche que arranca es s(t) = 5t² (s en metros, t en segundos). ¿Cuál es su velocidad media entre t = 2 s y t = 4 s?", [
      "s(2) = 5·2² = 20 m   y   s(4) = 5·4² = 80 m",
      "TVM[2,4] = " + fr("s(4) − s(2)", "4 − 2") + " = " + fr("80 − 20", "2") + " = " + fr("60", "2") + " = 30",
      "Unidades: metros entre segundos → <b>30 m/s</b>. Es la pendiente de la secante que une (2, 20) y (4, 80)."
    ]) +
    ojo("La TVM puede ser negativa (la función baja de media) o cero. Que TVM[a,b] = 0 <em>no</em> significa que f sea constante entre a y b: solo que f(a) = f(b). Una pelota lanzada hacia arriba vuelve a la altura de partida con velocidad media cero, y sin embargo se ha movido.") +
    w("secante");

  secciones[1] =
    "<p>Antes de ponerle fórmula, <b>míralo</b>. Desplázate por los pasos de esta clase: la gráfica de la izquierda cambia a medida que lees.</p>" +
    w("clase", "clase1") +
    "<h5>La definición con «h»: la forma que usarás en los ejercicios</h5>" +
    "<p>Si llamas h a la distancia entre los dos puntos (b = a + h), decir «b tiende a a» es lo mismo que decir «h tiende a 0». La definición queda así, y es la que se pide cuando un ejercicio dice «calcula <em>por la definición</em>»:</p>" +
    formula("f'(a) = lim<sub>h→0</sub> " + fr("f(a + h) − f(a)", "h")) +
    "<p>Siempre sale una indeterminación 0/0 (numerador y denominador tienden a 0). El truco, igual que en el Tema 10, es <b>simplificar h antes de hacer el límite</b>.</p>" +
    ejemplo("Ejemplo resuelto 1", "Calcula por la definición la derivada de f(x) = x² en a = 3.", [
      "f(3 + h) − f(3) = (3 + h)² − 9 = 9 + 6h + h² − 9 = 6h + h²",
      "Dividimos entre h y simplificamos: " + fr("6h + h²", "h") + " = 6 + h",
      "lim<sub>h→0</sub> (6 + h) = 6   →   <b>f'(3) = 6</b>",
      "Comprobación con la regla de la potencia: (x²)' = 2x, y 2·3 = 6 ✓"
    ]) +
    ejemplo("Ejemplo resuelto 2", "Calcula por la definición la derivada de f(x) = 1/x en a = 2.", [
      "f(2 + h) − f(2) = " + fr("1", "2 + h") + " − " + fr("1", "2") + " = " + fr("2 − (2 + h)", "2(2 + h)") + " = " + fr("−h", "2(2 + h)"),
      "Dividimos entre h: " + fr("−1", "2(2 + h)"),
      "lim<sub>h→0</sub> " + fr("−1", "2(2 + h)") + " = " + fr("−1", "4") + "   →   <b>f'(2) = −1/4</b>",
      "Comprobación: (x⁻¹)' = −x⁻², y −1/2² = −1/4 ✓"
    ]) +
    "<h5>La derivada como velocidad instantánea</h5>" +
    "<p>Lo que acabas de ver con las secantes es exactamente lo que hace el velocímetro de un coche: no mide la velocidad media de todo el viaje, sino la TVM calculada en un intervalo de tiempo diminuto. Por eso f'(a) se llama <b>razón de cambio instantánea</b> de f en a, y se mide con las mismas unidades que la TVM (por ejemplo, m/s).</p>" +
    "<h5>¿Siempre existe la derivada?</h5>" +
    "<p>No. Para que exista f'(a), la pendiente de las secantes tiene que acercarse al <em>mismo</em> valor tanto si B se acerca a A por la derecha (h &gt; 0) como por la izquierda (h &lt; 0). Esos dos límites se llaman <b>derivadas laterales</b>. El ejemplo clásico es f(x) = |x| en x = 0: por la derecha la pendiente es 1 y por la izquierda −1, así que hay un «pico» y no hay tangente. Dos ideas que conviene tener claras:</p>" +
    "<ul><li><b>Derivable ⇒ continua</b>: si hay tangente, no puede haber un salto.</li><li><b>Continua no implica derivable</b>: |x| es continua en 0 y no es derivable.</li></ul>";

  secciones[2] =
    w("tangente") +
    "<p>Fíjate en lo que has visto: el <b>signo</b> de la pendiente te dice si la función sube o baja en ese punto, y su <b>valor</b> te dice lo deprisa que lo hace. Una pendiente grande (positiva o negativa) es una gráfica muy empinada; una pendiente cercana a 0, una gráfica casi plana.</p>" +
    "<h5>La recta normal</h5>" +
    "<p>La <b>recta normal</b> a la gráfica en x = a es la perpendicular a la tangente por el mismo punto. Dos rectas perpendiculares tienen pendientes que cumplen m₁·m₂ = −1 (Tema 8), así que si la tangente tiene pendiente f'(a), la normal tiene pendiente −1/f'(a):</p>" +
    formula("y − f(a) = " + fr("−1", "f'(a)") + " · (x − a)") +
    ejemplo("Ejemplo resuelto", "Halla la tangente y la normal a f(x) = x² en el punto de abscisa x = 1.", [
      "f(1) = 1, así que el punto es (1, 1). Además f'(x) = 2x, luego f'(1) = 2",
      "Tangente: y − 1 = 2(x − 1) → <b>y = 2x − 1</b>",
      "Normal: pendiente −1/2. y − 1 = −½(x − 1) → <b>y = −½x + 3/2</b>"
    ]) +
    "<p>Si f'(a) = 0 la tangente es horizontal (y = f(a)) y la normal es la recta vertical x = a, que no tiene pendiente.</p>";

  secciones[3] =
    "<h5>Truco: la última operación manda</h5>" +
    "<p>Para decidir qué regla usar, imagina que calculas f(x) con la calculadora y mira cuál es la <b>última</b> operación que haces:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>x³ + sen x</td><td>Suma</td><td>Derivas cada sumando por separado</td></tr>" +
    "<tr><td>5x²</td><td>Número · función</td><td>El número sale fuera: 5·(x²)'</td></tr>" +
    "<tr><td>x²·eˣ</td><td>Producto</td><td>f'g + fg'</td></tr>" +
    "<tr><td>(x+1)/(x−2)</td><td>Cociente</td><td>(f'g − fg')/g²</td></tr>" +
    "<tr><td>sen(3x)</td><td>Función dentro de otra</td><td>Regla de la cadena (siguiente apartado)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Regla del producto", "Deriva f(x) = (x² + 1)(3x − 2).", [
      "Última operación: producto de u = x² + 1 y v = 3x − 2. Sus derivadas: u' = 2x, v' = 3",
      "f'(x) = u'v + uv' = 2x(3x − 2) + (x² + 1)·3",
      "= 6x² − 4x + 3x² + 3 = <b>9x² − 4x + 3</b>",
      "Comprobación: multiplicando antes, f(x) = 3x³ − 2x² + 3x − 2, y derivando sale 9x² − 4x + 3 ✓"
    ]) +
    ejemplo("Regla del cociente", "Deriva f(x) = " + fr("x² + 1", "x − 1") + ".", [
      "u = x² + 1 → u' = 2x   ·   v = x − 1 → v' = 1",
      "f'(x) = " + fr("u'v − uv'", "v²") + " = " + fr("2x(x − 1) − (x² + 1)·1", "(x − 1)²"),
      "Numerador: 2x² − 2x − x² − 1 = x² − 2x − 1",
      "<b>f'(x) = " + fr("x² − 2x − 1", "(x − 1)²") + "</b>"
    ]) +
    ejemplo("Raíces y fracciones: reescribe como potencia", "Deriva f(x) = " + fr("5", "x³") + " + 4√x.", [
      "Reescribe: f(x) = 5x⁻³ + 4x<sup>1/2</sup>",
      "Deriva: 5·(−3)x⁻⁴ + 4·½·x<sup>−1/2</sup> = −15x⁻⁴ + 2x<sup>−1/2</sup>",
      "Vuelve a la forma de partida: <b>f'(x) = " + fr("−15", "x⁴") + " + " + fr("2", "√x") + "</b>"
    ]) +
    ojo("antes de usar la regla del cociente, ¿se puede simplificar? Por ejemplo f(x) = (x⁴ − 3x²)/x² = x² − 3 (para x ≠ 0), y su derivada es simplemente 2x. Es más rápido y se falla menos.");

  secciones[4] =
    "<h5>Todas las derivadas, ya con la cadena incluida</h5>" +
    "<p>Si en vez de x tienes una función u(x), la derivada es la de siempre <b>multiplicada por u'</b>. Esta es la tabla que usarás en los exámenes:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>(uⁿ)'</td><td>n·uⁿ⁻¹·u'</td></tr>" +
    "<tr><td>(eᵘ)'</td><td>eᵘ·u'</td></tr>" +
    "<tr><td>(ln u)'</td><td>" + fr("u'", "u") + "</td></tr>" +
    "<tr><td>(sen u)'</td><td>cos u · u'</td></tr>" +
    "<tr><td>(cos u)'</td><td>−sen u · u'</td></tr>" +
    "<tr><td>(tg u)'</td><td>" + fr("u'", "cos² u") + " = (1 + tg² u)·u'</td></tr>" +
    "<tr><td>(√u)'</td><td>" + fr("u'", "2√u") + "</td></tr>" +
    "<tr><td>(aᵘ)'</td><td>aᵘ·ln a·u'</td></tr>" +
    "</tbody></table>" +
    "<h5>Derivar «de fuera hacia dentro»</h5>" +
    "<p>Imagina la función como una cebolla, con capas una dentro de otra. Derivas la capa exterior dejando lo de dentro tal cual, y multiplicas por la derivada de la capa siguiente, hasta llegar a x.</p>" +
    ejemplo("Ejemplo 1: sen de algo", "Deriva f(x) = sen(3x²).", [
      "Capa de fuera: sen( ) → cos( ), dejando 3x² dentro: cos(3x²)",
      "Capa de dentro: 3x² → 6x",
      "<b>f'(x) = 6x·cos(3x²)</b>"
    ]) +
    ejemplo("Ejemplo 2: exponencial", "Deriva f(x) = e<sup>x² − x</sup>.", [
      "Fuera: e<sup>u</sup> → e<sup>u</sup>, igual que antes: e<sup>x² − x</sup>",
      "Dentro: u = x² − x → u' = 2x − 1",
      "<b>f'(x) = (2x − 1)·e<sup>x² − x</sup></b>"
    ]) +
    ejemplo("Ejemplo 3: logaritmo y raíz", "Deriva f(x) = ln(x² + 1) y g(x) = " + raiz("3x + 1") + ".", [
      "(ln u)' = u'/u con u = x² + 1 → <b>f'(x) = " + fr("2x", "x² + 1") + "</b>",
      "(√u)' = u'/(2√u) con u = 3x + 1 → <b>g'(x) = " + fr("3", "2" + raiz("3x + 1")) + "</b>"
    ]) +
    ejemplo("Ejemplo 4: cadena dentro de un producto", "Deriva f(x) = x·e⁻ˣ.", [
      "Última operación: producto de u = x y v = e⁻ˣ. Ya sabemos u' = 1",
      "v' = e⁻ˣ·(−1) = −e⁻ˣ (cadena: dentro es −x, cuya derivada es −1)",
      "f'(x) = u'v + uv' = 1·e⁻ˣ + x·(−e⁻ˣ) = <b>(1 − x)·e⁻ˣ</b>"
    ]) +
    w("derivador");

  secciones[5] =
    ejemplo("Tangente en un punto", "Halla la recta tangente a f(x) = x³ − 2x en x = 1.", [
      "f(1) = 1 − 2 = −1 → punto de tangencia (1, −1)",
      "f'(x) = 3x² − 2 → f'(1) = 3 − 2 = 1 → pendiente m = 1",
      "y − (−1) = 1·(x − 1) → y + 1 = x − 1 → <b>y = x − 2</b>"
    ]) +
    ejemplo("Tangente con una condición", "¿En qué punto de f(x) = x² − 4x la tangente es paralela a la recta y = 2x + 1? Escribe esa tangente.", [
      "Rectas paralelas tienen la misma pendiente: buscamos los x con f'(x) = 2",
      "f'(x) = 2x − 4 = 2 → x = 3",
      "f(3) = 9 − 12 = −3 → punto de tangencia (3, −3)",
      "y + 3 = 2(x − 3) → <b>y = 2x − 9</b>"
    ]) +
    ojo("la tangente se escribe con el <em>punto</em> (a, f(a)) y la <em>pendiente</em> f'(a). Dos errores muy habituales: usar f(a) como pendiente, y usar a (en lugar de f(a)) como coordenada y del punto.");

  secciones[6] =
    "<h5>El método en 5 pasos</h5>" +
    "<ol><li>Halla el <b>dominio</b> de f.</li><li>Calcula <b>f'(x)</b>.</li><li>Resuelve <b>f'(x) = 0</b> (y mira dónde f' no existe): son los <b>puntos críticos</b>.</li><li><b>Tabla de signos</b>: elige un valor de prueba en cada intervalo entre puntos críticos y mira el signo de f'.</li><li><b>Conclusión</b>: crece donde f' &gt; 0 y decrece donde f' &lt; 0. Hay máximo si f' pasa de + a −, y mínimo si pasa de − a +. Calcula también la coordenada y.</li></ol>" +
    ejemplo("Ejemplo completo", "Estudia el crecimiento y los extremos de f(x) = x³ − 3x.", [
      "Dominio: todo ℝ (es un polinomio).",
      "f'(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1)",
      "f'(x) = 0 → x = −1 y x = 1 (puntos críticos)",
      "Valores de prueba: f'(−2) = 9 &gt; 0 · f'(0) = −3 &lt; 0 · f'(2) = 9 &gt; 0",
      "Creciente en (−∞, −1) ∪ (1, +∞) y decreciente en (−1, 1)",
      "En x = −1 pasa de + a −: <b>máximo</b> en (−1, 2), porque f(−1) = −1 + 3 = 2. En x = 1 pasa de − a +: <b>mínimo</b> en (1, −2)."
    ]) +
    ojo("f'(a) = 0 <em>no</em> garantiza un extremo. Mira f(x) = x³: f'(x) = 3x² vale 0 en x = 0, pero es positiva a los dos lados, así que f sigue creciendo y no hay ni máximo ni mínimo. Por eso hay que mirar siempre el <b>cambio de signo</b> (compruébalo abajo con x³).") +
    w("fprima");

  // ============================================================
  // SECCIONES NUEVAS al final del tema
  // ============================================================
  var nuevas = [
    {
      h: "8. Problemas de optimización: máximos y mínimos con sentido",
      html:
        "<p>Es el problema más «de examen» de todo el tema: te dan una situación (una caja, una valla, un coste) y te piden <em>la mejor</em> opción. Se resuelve con lo que ya sabes; solo hay que ordenar los pasos:</p>" +
        "<ol><li><b>Dibuja y nombra</b> las incógnitas (x, y…).</li><li>Escribe la <b>función objetivo</b>: lo que quieres hacer máximo o mínimo (área, volumen, coste).</li><li>Usa la <b>condición</b> del enunciado (un perímetro fijo, un volumen dado) para dejar la función en <b>una sola variable</b>.</li><li>Deriva, iguala a 0 y <b>comprueba</b> que es máximo o mínimo (signo de f') y que está dentro del dominio.</li><li><b>Responde</b> a lo que preguntan, con unidades.</li></ol>" +
        ejemplo("Ejemplo 1: máximo", "Con 40 m de valla quieres cercar un campo rectangular de área máxima. ¿Qué dimensiones debe tener?", [
          "Incógnitas: base x y altura y. Perímetro: 2x + 2y = 40 → y = 20 − x",
          "Función objetivo: A = x·y = x(20 − x) = 20x − x², con 0 &lt; x &lt; 20",
          "A'(x) = 20 − 2x = 0 → x = 10",
          "Signo: A' &gt; 0 si x &lt; 10 y A' &lt; 0 si x &gt; 10 → pasa de + a −: <b>máximo</b>",
          "x = 10 → y = 10. <b>Es un cuadrado de 10 × 10 m, con área 100 m².</b>"
        ]) +
        ejemplo("Ejemplo 2: mínimo", "Halla dos números positivos cuyo producto sea 36 y cuya suma sea la menor posible.", [
          "Números x e y, con x·y = 36 → y = 36/x",
          "Función objetivo: S(x) = x + " + fr("36", "x") + ", con x &gt; 0",
          "S'(x) = 1 − " + fr("36", "x²") + " = 0 → x² = 36 → x = 6 (la solución x = −6 no vale: pedimos positivos)",
          "Signo: S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → pasa de − a +: <b>mínimo</b>",
          "x = 6 → y = 6. <b>Los números son 6 y 6, con suma mínima 12.</b>"
        ]) +
        "<p>Ahora experimenta tú. Mueve x a ojo para buscar el óptimo y después compruébalo con la derivada:</p>" +
        w("optimizar") +
        ojo("tres fallos típicos: (1) dar la x cuando preguntan por el área o el volumen máximo; (2) no comprobar si el punto crítico es máximo o mínimo; (3) dar una solución que se sale del dominio (una longitud negativa, por ejemplo)."),
    },
    {
      h: "9. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html:
        "<p>Casi todos los fallos en derivadas son siempre los mismos. Leerlos una vez no basta: hay que <b>detectarlos</b> en un ejercicio ya hecho. Cada pregunta muestra un razonamiento con un error; elige cuál es.</p>" +
        w("quiz", "errores")
    },
    {
      h: "10. Autocomprobación del tema",
      html:
        "<p>Ocho preguntas para saber si el tema está en su sitio, y un juego de parejas para fijar las derivadas más usadas. Si fallas alguna, la explicación te dice por qué.</p>" +
        w("quiz", "quiz1") +
        w("emparejar", "emp1")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    clase1: {
      titulo: "De la secante a la tangente",
      montar: function (host) { return B.lab.claseSecante(host); },
      pasos: [
        { h: "Dos puntos, una secante", estado: { h: 2, tang: false },
          html: "<p>Tomamos f(x) = x² y el punto <b>A = (1, 1)</b>. Elegimos otro punto B de la gráfica, a distancia <b>h = 2</b> de A en horizontal: B = (3, 9).</p><p>La recta que pasa por A y B es la <b>secante</b>. Su pendiente es la TVM:</p><p><b>(9 − 1) ÷ 2 = 4</b></p>" },
        { h: "Acercamos B", estado: { h: 1 },
          html: "<p>Ahora h = 1, así que B = (2, 4). La secante cambia: su pendiente ya no es 4.</p><p><b>(4 − 1) ÷ 1 = 3</b></p><p>Fíjate en que la secante se va «tumbando» hacia la curva.</p>" },
        { h: "Más cerca todavía", estado: { h: 0.5 },
          html: "<p>Con h = 0,5 tenemos B = (1,5; 2,25).</p><p><b>(2,25 − 1) ÷ 0,5 = 2,5</b></p><p>Cada vez que acercas B, la pendiente baja… pero cada vez baja menos.</p>" },
        { h: "Muy cerca", estado: { h: 0.1 },
          html: "<p>Para h = 0,1 la pendiente es 2,1; para h = 0,01 será 2,01. Estas son las pendientes que hemos ido obteniendo:</p><table class='lam-tabla'><thead><tr><th>h</th><th>B</th><th>TVM</th></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td></tr><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>0,5</td><td>1,5</td><td>2,5</td></tr><tr><td>0,1</td><td>1,1</td><td>2,1</td></tr><tr><td>→ 0</td><td>→ 1</td><td>→ <b>2</b></td></tr></tbody></table>" },
        { h: "El límite es la tangente", estado: { h: 0.002, tang: true },
          html: "<p>Cuando B casi se funde con A, la secante es casi idéntica a la <b>tangente</b> (línea verde discontinua). La pendiente se acerca a 2.</p><p>Eso es exactamente <b>f'(1) = 2</b>: el límite de la TVM cuando h → 0.</p>" },
        { h: "¿Por qué sale 2?", estado: { h: 0.002, tang: true },
          html: "<p>Con álgebra, para cualquier h ≠ 0:</p><p><b>TVM = ((1 + h)² − 1) ÷ h = (2h + h²) ÷ h = 2 + h</b></p><p>Y cuando h → 0, 2 + h → 2. Por eso la tabla se acercaba a 2: las pendientes eran 2 + h.</p>" },
        { h: "Pruébalo tú", estado: { h: -1, tang: true },
          html: "<p>Usa el deslizador <b>h</b> de la gráfica. Prueba valores negativos: B pasa al lado izquierdo de A y la pendiente es <b>2 + h</b> también (por ejemplo, h = −1 da 1).</p><p>Da igual por qué lado te acerques: tiende a 2. Por eso f tiene derivada en x = 1.</p>" }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno deriva f(x) = x²·eˣ y escribe f'(x) = 2x·eˣ. ¿Qué ha hecho mal?",
          op: ["Ha derivado el producto como producto de las derivadas", "Ha olvidado que (eˣ)' = eˣ", "Debió usar la regla de la cadena", "Está bien"], ok: 0,
          porque: "El producto <b>no</b> se deriva factor a factor. Lo correcto es (x²·eˣ)' = 2x·eˣ + x²·eˣ = (2x + x²)eˣ." },
        { q: "Un alumno deriva f(x) = sen(3x) y escribe f'(x) = cos(3x). ¿Qué falta?",
          op: ["Cambiar el signo", "Multiplicar por la derivada de lo de dentro, que es 3", "Derivar también el 3x como si fuese x²", "Nada, está bien"], ok: 1,
          porque: "Regla de la cadena: derivas la función de fuera (sen → cos) <b>y multiplicas por la derivada de lo de dentro</b> (3x → 3). Resultado correcto: f'(x) = 3cos(3x)." },
        { q: "«f(x) = x³ cumple f'(0) = 0, así que tiene un mínimo en x = 0.» ¿Es correcto?",
          op: ["Sí: si f' = 0 siempre hay un mínimo", "No: f' vale 0 pero no cambia de signo en x = 0, así que no hay extremo", "No: f'(0) no vale 0", "Sí, pero es un máximo"], ok: 1,
          porque: "f'(x) = 3x² es positiva a ambos lados de 0, así que f sigue creciendo: no hay máximo ni mínimo. f' = 0 solo da un <em>candidato</em>; hay que comprobar el cambio de signo." },
        { q: "Tangente a f(x) = x² en x = 3. Un alumno escribe «y − 3 = 6(x − 3)». ¿Cuál es el fallo?",
          op: ["La pendiente debería ser 3", "Ha usado a = 3 como coordenada y, en vez de f(3) = 9", "Falta derivar otra vez", "No hay fallo"], ok: 1,
          porque: "El punto de tangencia es (3, f(3)) = (3, 9), no (3, 3). La recta correcta es y − 9 = 6(x − 3), es decir, y = 6x − 9." },
        { q: "Para f(x) = (x² + 1)/x, un alumno deriva arriba y abajo por separado y obtiene f'(x) = 2x/1 = 2x. ¿Qué ha fallado?",
          op: ["Nada: es la regla del cociente", "El cociente tiene su propia regla: (u'v − uv')/v², no se deriva numerador y denominador por separado", "Debía usar la regla del producto", "Debía integrar"], ok: 1,
          porque: "Correcto: f'(x) = (2x·x − (x² + 1)·1)/x² = (x² − 1)/x² = 1 − 1/x². (Se ve más fácil reescribiendo f(x) = x + 1/x.)" },
        { q: "«La derivada de 5x² + 7 es 10x + 7.» ¿Qué error hay?",
          op: ["La derivada de 5x² es 5x", "Las constantes se derivan a 0: (7)' = 0", "Hay que dividir entre 2", "Está bien"], ok: 1,
          porque: "Una constante no cambia nunca, así que su derivada es 0. Lo correcto es (5x² + 7)' = 10x." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La TVM de f en [1, 3] vale 4. ¿Qué significa?",
          op: ["La secante que une los puntos de abscisas 1 y 3 tiene pendiente 4", "f'(2) = 4", "f(3) − f(1) = 4", "f es creciente en todo [1, 3]"], ok: 0,
          porque: "TVM = (f(3) − f(1)) ÷ 2 = 4, así que f(3) − f(1) = 8 (no 4). Y no dice nada sobre f'(2) ni sobre si crece siempre: es una media." },
        { q: "Si f'(a) &lt; 0, la recta tangente en x = a…",
          op: ["Sube de izquierda a derecha", "Es horizontal", "Baja de izquierda a derecha: f decrece en a", "No existe"], ok: 2,
          porque: "La derivada es la pendiente de la tangente: negativa significa que la tangente (y la función, localmente) baja al avanzar hacia la derecha." },
        { q: "La derivada de f(x) = e<sup>2x</sup> es…",
          op: ["e<sup>2x</sup>", "2x·e<sup>2x−1</sup>", "2e<sup>2x</sup>", "2e<sup>x</sup>"], ok: 2,
          porque: "Cadena: (e<sup>u</sup>)' = e<sup>u</sup>·u' con u = 2x, u' = 2. Por tanto f'(x) = 2e<sup>2x</sup>." },
        { q: "La recta tangente a f(x) = x² en x = 2 es…",
          op: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = 2x − 4"], ok: 1,
          porque: "f(2) = 4 y f'(2) = 4. Entonces y − 4 = 4(x − 2) → y = 4x − 4." },
        { q: "Si f' pasa de negativa a positiva en x = a, entonces en a hay…",
          op: ["un máximo relativo", "un mínimo relativo", "un punto sin derivada", "ningún extremo siempre"], ok: 1,
          porque: "Antes f decrece (f' &lt; 0) y después crece (f' &gt; 0): baja, toca fondo y sube. Eso es un mínimo relativo." },
        { q: "¿Cuál es la derivada de f(x) = ln(5x)?",
          op: ["1/(5x)", "1/x", "5/x", "ln 5"], ok: 1,
          porque: "(ln u)' = u'/u = 5/(5x) = 1/x. (También: ln(5x) = ln 5 + ln x, y ln 5 es una constante.)" },
        { q: "En un problema de optimización, después de escribir la función objetivo, ¿qué haces antes de derivar?",
          op: ["Nada: se deriva directamente", "Usar la condición del enunciado para dejarla en una sola variable", "Calcular el límite en infinito", "Dibujar la tangente"], ok: 1,
          porque: "La función objetivo suele tener dos variables (x, y). La condición del enunciado (perímetro fijo, volumen dado…) permite despejar una en función de la otra." },
        { q: "La derivada de f(x) = x/(x + 1) es…",
          op: ["1/(x + 1)²", "1/(x + 1)", "x/(x + 1)²", "1"], ok: 0,
          porque: "Cociente: ((x + 1)·1 − x·1)/(x + 1)² = 1/(x + 1)²." }
      ]
    },

    emp1: {
      titulo: "Función ↔ derivada",
      consigna: "Toca una función de la izquierda y su derivada de la derecha.",
      pares: [
        ["x³", "3x²"],
        ["e<sup>2x</sup>", "2e<sup>2x</sup>"],
        ["ln(x² + 1)", "2x ÷ (x² + 1)"],
        ["sen(x²)", "2x·cos(x²)"],
        ["x/(x + 1)", "1 ÷ (x + 1)²"],
        ["√x", "1 ÷ (2√x)"]
      ]
    }
  };

  // ============================================================
  // EJERCICIOS NUEVOS: por niveles y con comprobación automática
  // nivel 1 ★ básico · 2 ★★ medio · 3 ★★★ nivel PAU
  // ============================================================
  var ejercicios = [
    // ---------- ★ ----------
    { id: "d1", nivel: 1,
      enunciado: "Calcula la tasa de variación media de f(x) = x² − 2x + 3 en el intervalo [1, 4].",
      check: { tipo: "num", etiqueta: "TVM =", valor: 3 },
      pistas: ["Calcula primero f(1) y f(4).", "TVM = (f(4) − f(1)) ÷ (4 − 1)."],
      pasos: ["f(1) = 1 − 2 + 3 = 2", "f(4) = 16 − 8 + 3 = 11", "TVM[1,4] = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3"],
      resultado: "TVM[1,4] = 3" },
    { id: "d2", nivel: 1,
      enunciado: "Deriva f(x) = 5x³ − 4x² + 7x − 9.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "15x^2-8x+7" },
      pistas: ["Deriva cada sumando con (xⁿ)' = n·xⁿ⁻¹.", "La constante −9 desaparece."],
      pasos: ["5x³ → 3·5x² = 15x²", "−4x² → 2·(−4)x = −8x", "7x → 7", "−9 → 0"],
      resultado: "f'(x) = 15x² − 8x + 7" },
    { id: "d3", nivel: 1,
      enunciado: "Deriva f(x) = 4√x.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2/sqrt(x)", dom: [0.3, 5], ph: "puedes escribir sqrt(x) o √x" },
      pistas: ["Escribe √x como x elevado a 1/2.", "(x<sup>1/2</sup>)' = ½·x<sup>−1/2</sup>."],
      pasos: ["f(x) = 4x<sup>1/2</sup>", "f'(x) = 4·½·x<sup>−1/2</sup> = 2x<sup>−1/2</sup>", "Volvemos a la raíz: 2x<sup>−1/2</sup> = " + fr("2", "√x")],
      resultado: "f'(x) = " + fr("2", "√x") },
    { id: "d4", nivel: 1,
      enunciado: "Calcula la pendiente de la recta tangente a f(x) = x³ − x en el punto de abscisa x = 2.",
      check: { tipo: "num", etiqueta: "m =", valor: 11 },
      pistas: ["La pendiente de la tangente es f'(2).", "f'(x) = 3x² − 1."],
      pasos: ["f'(x) = 3x² − 1", "f'(2) = 3·4 − 1 = 11"],
      resultado: "m = f'(2) = 11" },
    // ---------- ★★ ----------
    { id: "d5", nivel: 2,
      enunciado: "Deriva f(x) = (2x − 1)·eˣ.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(2x+1)e^x" },
      pistas: ["Es un producto de u = 2x − 1 y v = eˣ.", "f' = u'v + uv' = 2·eˣ + (2x − 1)·eˣ."],
      pasos: ["u = 2x − 1 → u' = 2   ·   v = eˣ → v' = eˣ", "f'(x) = u'v + uv' = 2eˣ + (2x − 1)eˣ", "Sacamos eˣ factor común: eˣ(2 + 2x − 1) = (2x + 1)eˣ"],
      resultado: "f'(x) = (2x + 1)·eˣ",
      ojo: "(f·g)' no es f'·g'. Si hubieras puesto 2·eˣ, te falta el término u·v'." },
    { id: "d6", nivel: 2,
      enunciado: "Deriva f(x) = " + fr("x² + 1", "x − 3") + " y simplifica el numerador.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(x^2-6x-1)/(x-3)^2", dom: [-2, 2.5] },
      pistas: ["Regla del cociente: (u'v − uv') ÷ v².", "u' = 2x, v' = 1."],
      pasos: ["u = x² + 1 → u' = 2x   ·   v = x − 3 → v' = 1", "f'(x) = " + fr("2x(x − 3) − (x² + 1)·1", "(x − 3)²"), "Numerador: 2x² − 6x − x² − 1 = x² − 6x − 1"],
      resultado: "f'(x) = " + fr("x² − 6x − 1", "(x − 3)²") },
    { id: "d7", nivel: 2,
      enunciado: "Deriva f(x) = sen(x² + 1).",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2x cos(x^2+1)" },
      pistas: ["Función de fuera: sen. Función de dentro: x² + 1.", "(sen u)' = cos u · u'."],
      pasos: ["Fuera: sen( ) → cos( ), dejando x² + 1 dentro", "Dentro: (x² + 1)' = 2x", "Multiplicamos: cos(x² + 1)·2x"],
      resultado: "f'(x) = 2x·cos(x² + 1)" },
    { id: "d8", nivel: 2,
      enunciado: "Halla la pendiente y la ecuación de la recta tangente a f(x) = x³ − 3x² + 2 en x = 3.",
      check: [{ tipo: "num", etiqueta: "pendiente m =", valor: 9 }, { tipo: "expr", etiqueta: "tangente: y =", expr: "9x-25", ph: "9x-25" }],
      pistas: ["Necesitas el punto (3, f(3)) y la pendiente f'(3).", "f(3) = 27 − 27 + 2 = 2 y f'(x) = 3x² − 6x."],
      pasos: ["f(3) = 27 − 27 + 2 = 2 → punto de tangencia (3, 2)", "f'(x) = 3x² − 6x → f'(3) = 27 − 18 = 9", "y − 2 = 9(x − 3) → y = 9x − 27 + 2 = 9x − 25"],
      resultado: "m = 9 · tangente: y = 9x − 25" },
    { id: "d9", nivel: 2,
      enunciado: "Halla los puntos donde la gráfica de f(x) = x³ − 12x + 5 tiene tangente horizontal. Escribe los valores de x separados por comas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "por ejemplo: 1, 3" },
      pistas: ["Tangente horizontal significa pendiente 0: f'(x) = 0.", "f'(x) = 3x² − 12."],
      pasos: ["f'(x) = 3x² − 12", "3x² − 12 = 0 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, f(−2)) = (−2, 21) y (2, f(2)) = (2, −11)"],
      resultado: "x = −2 y x = 2" },
    { id: "d10", nivel: 2,
      enunciado: "¿En qué intervalo es creciente la función f(x) = x² − 6x + 5?",
      check: { tipo: "opcion", etiqueta: "Crece en", opciones: ["(−∞, 3)", "(3, +∞)", "(−∞, −3)", "(−3, +∞)"], ok: 1 },
      pistas: ["Una función crece donde f' &gt; 0.", "f'(x) = 2x − 6 &gt; 0 ⇔ x &gt; 3."],
      pasos: ["f'(x) = 2x − 6", "2x − 6 = 0 → x = 3", "f'(0) = −6 &lt; 0 y f'(4) = 2 &gt; 0", "f decrece en (−∞, 3) y crece en (3, +∞); en x = 3 hay un mínimo, f(3) = −4"],
      resultado: "Creciente en (3, +∞)" },
    // ---------- ★★★ (nivel PAU) ----------
    { id: "d11", nivel: 3,
      enunciado: "Halla los valores de a y b para que la función f(x) = x³ + ax² + bx tenga extremos relativos en x = 1 y en x = 2.",
      check: [{ tipo: "num", etiqueta: "a =", valor: -4.5 }, { tipo: "num", etiqueta: "b =", valor: 6 }],
      pistas: ["Si hay extremo en x = 1 y en x = 2, entonces f'(1) = 0 y f'(2) = 0.", "f'(x) = 3x² + 2ax + b. Te quedan dos ecuaciones con a y b."],
      pasos: ["f'(x) = 3x² + 2ax + b", "f'(1) = 0 → 3 + 2a + b = 0", "f'(2) = 0 → 12 + 4a + b = 0", "Restamos la 1ª a la 2ª: 9 + 2a = 0 → a = −9/2 = −4,5", "Sustituimos: b = −3 − 2a = −3 + 9 = 6", "Comprobación: f'(x) = 3x² − 9x + 6 = 3(x − 1)(x − 2) ✓"],
      resultado: "a = −9/2, b = 6" },
    { id: "d12", nivel: 3,
      enunciado: "La gráfica de f(x) = x³ − 3x tiene dos puntos en los que la tangente es paralela a la recta y = 9x − 2. Halla las abscisas de esos puntos.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "dos valores separados por comas" },
      pistas: ["Rectas paralelas tienen la misma pendiente: f'(x) = 9.", "3x² − 3 = 9."],
      pasos: ["Pendiente de la recta dada: 9. Buscamos f'(x) = 9", "f'(x) = 3x² − 3 = 9 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, −2) y (2, 2) (comprobación: f(2) = 8 − 6 = 2)"],
      resultado: "x = −2 y x = 2" },
    { id: "d13", nivel: 3,
      enunciado: "Dos números positivos suman 12. ¿Cuánto vale el menor valor posible de la suma de sus cuadrados? Indica también el valor de x (uno de los números).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 6 }, { tipo: "num", etiqueta: "suma mínima =", valor: 72 }],
      pistas: ["Números x y 12 − x. Función objetivo: S(x) = x² + (12 − x)².", "S'(x) = 2x − 2(12 − x) = 4x − 24."],
      pasos: ["Números x y 12 − x, con 0 &lt; x &lt; 12", "S(x) = x² + (12 − x)² = 2x² − 24x + 144", "S'(x) = 4x − 24 = 0 → x = 6", "S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → mínimo", "S(6) = 36 + 36 = 72"],
      resultado: "x = 6 (los dos números son 6); suma mínima = 72" },
    { id: "d14", nivel: 3,
      enunciado: "Un granjero tiene 120 m de valla para cercar un corral rectangular junto a un río. El lado del río no necesita valla. ¿Qué dimensiones dan el corral de mayor área? ¿Cuál es esa área?",
      check: [{ tipo: "num", etiqueta: "lado perpendicular al río x =", valor: 30, unidad: "m" }, { tipo: "num", etiqueta: "lado paralelo y =", valor: 60, unidad: "m" }, { tipo: "num", etiqueta: "área =", valor: 1800, unidad: "m²" }],
      pistas: ["Hay dos lados de longitud x y uno de longitud y: 2x + y = 120.", "A(x) = x(120 − 2x) = 120x − 2x²."],
      pasos: ["Valla: 2x + y = 120 → y = 120 − 2x, con 0 &lt; x &lt; 60", "Área: A(x) = x·y = x(120 − 2x) = 120x − 2x²", "A'(x) = 120 − 4x = 0 → x = 30, y entonces y = 60", "A' pasa de + a −: es un máximo. A(30) = 30·60 = 1800"],
      resultado: "x = 30 m, y = 60 m · área máxima = 1800 m²",
      ojo: "el enunciado pide el <b>área</b>: no te quedes en x = 30. Responde a lo que preguntan, con unidades." },
    { id: "d15", nivel: 3,
      enunciado: "Para f(x) = " + fr("x", "x² + 1") + ": (a) halla los puntos críticos y (b) decide qué hay en x = 1.",
      check: [{ tipo: "lista", etiqueta: "puntos críticos x =", valores: [-1, 1], ph: "valores separados por comas" }, { tipo: "opcion", etiqueta: "en x = 1 hay un", opciones: ["mínimo relativo", "máximo relativo", "ningún extremo"], ok: 1 }],
      pistas: ["Regla del cociente: f'(x) = ((x² + 1)·1 − x·2x) ÷ (x² + 1)².", "El numerador queda 1 − x²."],
      pasos: ["f'(x) = " + fr("(x² + 1)·1 − x·2x", "(x² + 1)²") + " = " + fr("1 − x²", "(x² + 1)²"), "El denominador es siempre positivo, así que el signo lo da 1 − x²: f'(x) = 0 → x = −1 y x = 1", "Signo: f' &lt; 0 en (−∞, −1), f' &gt; 0 en (−1, 1), f' &lt; 0 en (1, +∞)", "En x = 1 pasa de + a −: <b>máximo</b>, f(1) = 1/2. En x = −1 pasa de − a +: mínimo, f(−1) = −1/2."],
      resultado: "Puntos críticos x = −1 (mínimo) y x = 1 (máximo, f(1) = ½)" },
    { id: "d16", nivel: 3,
      enunciado: "Explica por qué f(x) = x³ cumple f'(0) = 0 y, sin embargo, no tiene ningún máximo ni mínimo en x = 0. Redacta tu respuesta como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Calcula la derivada f'(x) = 3x² y comprueba que f'(0) = 0", p: 0.5 },
        { t: "Estudia el signo de f' a ambos lados de 0 (es positiva en los dos)", p: 0.5 },
        { t: "Concluye que f es creciente a ambos lados, sin cambio de signo, así que no hay máximo ni mínimo", p: 0.5 },
        { t: "Aclara que f'(a) = 0 es condición necesaria pero no suficiente: solo da candidatos", p: 0.5 }
      ] },
      pasos: ["f'(x) = 3x², y f'(0) = 0: x = 0 es un punto crítico.", "Pero 3x² ≥ 0 para todo x: f' es positiva a la izquierda (x &lt; 0) y a la derecha (x &gt; 0) de 0.", "Como f' no cambia de signo en x = 0, la función es creciente a ambos lados y no hay máximo ni mínimo (es un punto de tangente horizontal sin extremo).", "Conclusión general: f'(a) = 0 es condición <em>necesaria</em> para un extremo, pero no <em>suficiente</em>; hay que comprobar el cambio de signo."],
      resultado: "f'(0) = 0 pero f' no cambia de signo → no hay extremo en x = 0." }
  ];

  // ============================================================
  // LÁMINA RESUMEN: bloques nuevos (chuletas que se pueden imprimir)
  // ============================================================
  var lamina = [
    { titulo: "¿Qué regla uso? La última operación manda", ancha: true,
      tabla: { cab: ["Última operación", "Regla", "Ejemplo"], filas: [
        ["Suma o resta", "(f ± g)' = f' ± g'", "x³ + sen x → 3x² + cos x"],
        ["Número · función", "(k·f)' = k·f'", "5x² → 10x"],
        ["Producto", "(f·g)' = f'g + fg'", "x²eˣ → (2x + x²)eˣ"],
        ["Cociente", "(f/g)' = (f'g − fg') ÷ g²", "(x + 1)/(x − 2) → −3/(x − 2)²"],
        ["Función dentro de otra", "Cadena: f'(g)·g'", "sen(3x) → 3cos(3x)"]
      ] },
      nota: "Truco: si se puede simplificar o reescribir como potencia, hazlo antes de derivar." },
    { titulo: "Derivadas con la cadena (u = u(x))", ancha: true,
      tabla: { cab: ["Función", "Derivada"], filas: [
        ["uⁿ", "n·uⁿ⁻¹·u'"], ["eᵘ", "eᵘ·u'"], ["ln u", "u' ÷ u"], ["sen u", "cos u·u'"], ["cos u", "−sen u·u'"],
        ["tg u", "u' ÷ cos²u"], ["√u", "u' ÷ (2√u)"], ["aᵘ", "aᵘ·ln a·u'"]
      ] },
      nota: "Siempre: «la de fuera sin tocar lo de dentro, por la derivada de lo de dentro»." },
    { titulo: "Tangente y normal",
      items: [
        { label: "Tangente en x = a", formula: "y − f(a) = f'(a)·(x − a)", cuando: "«Halla la recta tangente en x = a»", ejemplo: "f = x², a = 1 → y − 1 = 2(x − 1)", ojo: "La pendiente es f'(a), no f(a)." },
        { label: "Normal en x = a", formula: "y − f(a) = " + fr("−1", "f'(a)") + "·(x − a)", cuando: "Perpendicular a la tangente", ojo: "Si f'(a) = 0 la normal es vertical: x = a." },
        { label: "Tangente con una condición", formula: "f'(x) = m", cuando: "Paralela a y = mx + n (misma pendiente)", ejemplo: "Perpendicular a esa recta: f'(x) = −1/m." }
      ] },
    { titulo: "Monotonía y extremos en 5 pasos",
      pasos: ["Dominio de f.", "Calcula f'(x).", "Resuelve f'(x) = 0 (puntos críticos).", "Tabla de signos de f' con un valor de prueba por intervalo.", "f' &gt; 0: crece · f' &lt; 0: decrece · de + a −: <b>máximo</b> · de − a +: <b>mínimo</b>. Da también la coordenada y."],
      nota: "f'(a) = 0 no basta: x³ tiene f'(0) = 0 y no tiene extremo." },
    { titulo: "Optimización en 5 pasos",
      pasos: ["Dibuja y nombra las incógnitas.", "Escribe la función objetivo (lo que se maximiza o minimiza).", "Usa la condición del enunciado para dejarla en una sola variable.", "Deriva, iguala a 0, comprueba máximo o mínimo y el dominio.", "Responde a lo que pregunten, con unidades."],
      nota: "Clásicos: rectángulo de perímetro fijo → cuadrado; caja de volumen fijo → mínimo material." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(x²·eˣ)' = 2x·eˣ", bien: "(x²·eˣ)' = 2x·eˣ + x²·eˣ", por: "El producto no se deriva factor a factor." },
        { mal: "(sen 3x)' = cos 3x", bien: "(sen 3x)' = 3·cos 3x", por: "Falta multiplicar por la derivada de lo de dentro." },
        { mal: "(5x² + 7)' = 10x + 7", bien: "(5x² + 7)' = 10x", por: "La derivada de una constante es 0." },
        { mal: "f'(0) = 0 ⇒ hay un extremo en 0", bien: "Solo si f' cambia de signo", por: "Contraejemplo: f(x) = x³." },
        { mal: "Tangente a x² en 3: y − 3 = 6(x − 3)", bien: "y − 9 = 6(x − 3)", por: "El punto es (3, f(3)), no (3, 3)." }
      ] }
  ];

  var resumen = [
    "f'(a) es la <b>pendiente de la tangente</b> en a: el límite de la TVM cuando h → 0.",
    "Qué regla usar: mira la <b>última operación</b> (suma, producto, cociente o cadena).",
    "Tangente en a: <b>y − f(a) = f'(a)·(x − a)</b>.",
    "f' &gt; 0 crece · f' &lt; 0 decrece · extremo si f' <b>cambia de signo</b>.",
    "Optimización: función objetivo en una variable → derivar → comprobar."
  ];

  B.registrar("mates1", "t11", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

  // ============================================================
  // SIMULACRO NUEVO: monográfico de derivadas (5 bloques × 2 puntos)
  // ============================================================
  B.registrarSimulacros("mates1", [{
    id: "sim8", titulo: "Simulacro 8 · Derivadas", tipo: "ciencias",
    bloques: [
      { titulo: "Derivada por la definición", puntos: 2,
        enunciado: "Calcula, usando la definición de derivada, f'(2) para f(x) = 3x² − x.",
        solucion: "f'(2) = lim<sub>h→0</sub> [f(2 + h) − f(2)]/h. f(2) = 12 − 2 = 10. f(2 + h) = 3(2 + h)² − (2 + h) = 12 + 12h + 3h² − 2 − h = 10 + 11h + 3h². Entonces f(2 + h) − f(2) = 11h + 3h², y dividiendo entre h: 11 + 3h. Cuando h → 0, el límite es 11. Por tanto f'(2) = 11 (coincide con la regla: f'(x) = 6x − 1, f'(2) = 11)." },
      { titulo: "Reglas de derivación", puntos: 2,
        enunciado: "Deriva: a) f(x) = (3x² − 1)·eˣ  b) g(x) = ln(x² + 1)  c) h(x) = (x² + 1)/(x + 2).",
        solucion: "a) Producto: f'(x) = 6x·eˣ + (3x² − 1)eˣ = (3x² + 6x − 1)eˣ. b) Cadena: g'(x) = 2x/(x² + 1). c) Cociente: h'(x) = [2x(x + 2) − (x² + 1)·1]/(x + 2)² = (2x² + 4x − x² − 1)/(x + 2)² = (x² + 4x − 1)/(x + 2)²." },
      { titulo: "Tangente y normal", puntos: 2,
        enunciado: "Halla la ecuación de la recta tangente y la de la recta normal a f(x) = x² − 3x + 1 en el punto de abscisa x = 1.",
        solucion: "f(1) = 1 − 3 + 1 = −1, así que el punto es (1, −1). f'(x) = 2x − 3, luego f'(1) = −1. Tangente: y + 1 = −1·(x − 1) → y = −x. Normal: pendiente 1/1 = 1 (opuesta de la inversa de −1): y + 1 = 1·(x − 1) → y = x − 2." },
      { titulo: "Monotonía y extremos", puntos: 2,
        enunciado: "Estudia el crecimiento y decrecimiento de f(x) = x³ − 6x² + 9x + 1 y calcula sus máximos y mínimos relativos.",
        solucion: "f'(x) = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3). Puntos críticos: x = 1 y x = 3. Signo de f': positivo en (−∞, 1), negativo en (1, 3), positivo en (3, +∞). Por tanto f crece en (−∞, 1) ∪ (3, +∞) y decrece en (1, 3). En x = 1 hay un máximo relativo, f(1) = 1 − 6 + 9 + 1 = 5, es decir (1, 5). En x = 3 hay un mínimo relativo, f(3) = 27 − 54 + 27 + 1 = 1, es decir (3, 1)." },
      { titulo: "Optimización", puntos: 2,
        enunciado: "Se quiere construir una caja sin tapa, de base cuadrada y volumen 32 m³. Halla las dimensiones que minimizan la cantidad de material (superficie).",
        solucion: "Sea x el lado de la base y h la altura. Volumen: x²h = 32 → h = 32/x². Superficie (base + 4 caras laterales): S(x) = x² + 4xh = x² + 128/x, con x > 0. S'(x) = 2x − 128/x² = 0 → x³ = 64 → x = 4. S' < 0 si x < 4 y S' > 0 si x > 4: mínimo. Entonces h = 32/16 = 2. La caja de menor superficie tiene base 4 × 4 m y altura 2 m, con S = 16 + 32 = 48 m²." }
    ]
  }]);

})(window);
