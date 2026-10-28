/* ============================================================
   Matemáticas II · ampliaciones · Tema 10: Estudio y representación de funciones
   (parte C: problemas EvAU, resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(n, ref) { return H.w(n, ref && "mates2/t10/" + ref); }

  var nuevas = B.parte.m2t10b.nuevas;

  // ================================================================
  //  SECCIONES FINALES (14 problemas EvAU, 15 errores, 16 autocomprobación)
  // ================================================================
  nuevas.push({
    h: "14. Problemas tipo EvAU resueltos",
    html:
      "<p>Cinco problemas con el formato de la EvAU de Madrid: lee cada enunciado, intenta los apartados y compara con la solución desarrollada.</p>" +
      ejemplo("Problema 1 · Estudio completo de una racional", "Sea f(x) = (x² + 1)/x. (a) Dominio, simetría y asíntotas. (b) Intervalos de crecimiento y decrecimiento y extremos relativos. (c) Curvatura. (d) Esboza la gráfica.",
        ["<b>(a)</b> Dom(f) = ℝ − {0}. f(−x) = (x² + 1)/(−x) = −f(x): <b>impar</b>. No corta a los ejes (0 ∉ Dom y x² + 1 &gt; 0). Vertical: lím<sub>x→0⁺</sub> f = +∞ y lím<sub>x→0⁻</sub> f = −∞: <b>x = 0</b>. Como f = x + 1/x, la oblicua es <b>y = x</b> (diferencia 1/x: por encima a la derecha, por debajo a la izquierda).",
         "<b>(b)</b> f′ = 1 − 1/x² = (x² − 1)/x². Ceros x = ±1. f′ &gt; 0 en (−∞, −1) y (1, +∞); f′ &lt; 0 en (−1, 0) y (0, 1). <b>Máximo relativo (−1, −2)</b> y <b>mínimo relativo (1, 2)</b>.",
         "<b>(c)</b> f″ = 2/x³: negativa si x &lt; 0 (cóncava), positiva si x &gt; 0 (convexa). Sin inflexiones (x = 0 no está en el dominio).",
         "<b>(d)</b> Rama derecha: viene de +∞ junto al eje Y, baja convexa hasta (1, 2) y sube pegada a y = x. Rama izquierda: es la reflexión respecto al origen (impar): viene de −∞ pegada a y = x, sube cóncava hasta (−1, −2) y cae hacia −∞ junto al eje Y. Observa que el máximo relativo (−1, −2) está <i>por debajo</i> del mínimo relativo (1, 2)."]) +
      ejemplo("Problema 2 · Logaritmo por potencia", "Sea f(x) = x²·ln x. (a) Dominio y lím<sub>x→0⁺</sub> f(x). (b) Monotonía y extremos. (c) Curvatura e inflexión.",
        ["<b>(a)</b> Dom = (0, +∞). Para el límite se escribe x² ln x = (ln x)/x<sup>−2</sup> (forma −∞/∞) y L'Hôpital: (1/x)/(−2x<sup>−3</sup>) = −x²/2 → 0. <b>El límite es 0</b>: no hay asíntota vertical.",
         "<b>(b)</b> f′ = 2x ln x + x = x(2 ln x + 1). Como x &gt; 0, f′ = 0 ⟺ ln x = −1/2 ⟺ x = e<sup>−1/2</sup> ≈ 0,607. Decrece en (0, e<sup>−1/2</sup>) y crece después: <b>mínimo</b> en (e<sup>−1/2</sup>, −1/(2e)) ≈ (0,607; −0,184).",
         "<b>(c)</b> f″ = 2 ln x + 2 + 1 = 2 ln x + 3 = 0 ⟺ x = e<sup>−3/2</sup> ≈ 0,223. Cóncava en (0, e<sup>−3/2</sup>) y convexa después: <b>inflexión</b> (e<sup>−3/2</sup>, −3/(2e³)) ≈ (0,223; −0,075). Curiosamente la inflexión está <i>antes</i> del mínimo."]) +
      ejemplo("Problema 3 · Hallar parámetros con un extremo", "La función f(x) = (ax² + b)/x tiene un mínimo relativo en el punto (1, 2). Halla a y b y comprueba que es el que has estudiado antes.",
        ["Dos datos para dos incógnitas. Pasa por (1, 2): f(1) = a + b = 2. Extremo en x = 1: f′ = a − b/x², f′(1) = a − b = 0.",
         "Sumando: 2a = 2 ⟹ <b>a = 1, b = 1</b>. Es f(x) = (x² + 1)/x, la del problema 1, que sí tiene un mínimo relativo en (1, 2) (f″(1) = 2 &gt; 0) ✓."]) +
      ejemplo("Problema 4 · Información de f a partir de f′", "La gráfica de f′ es la parábola f′(x) = x² − 4x. (a) Estudia monotonía y extremos de f. (b) Curvatura e inflexión. (c) Si f(0) = 1, halla f y el valor del mínimo relativo.",
        ["<b>(a)</b> f′ = x(x − 4) &gt; 0 si x &lt; 0 o x &gt; 4 y &lt; 0 en (0, 4). f crece en (−∞, 0) y (4, +∞) y decrece en (0, 4): <b>máximo en x = 0</b>, <b>mínimo en x = 4</b>.",
         "<b>(b)</b> f″ = 2x − 4 = 0 ⟹ x = 2 (el vértice de la parábola f′). f″ &lt; 0 si x &lt; 2 (cóncava) y &gt; 0 si x &gt; 2 (convexa): <b>inflexión en x = 2</b>.",
         "<b>(c)</b> f(x) = x³/3 − 2x² + C y f(0) = C = 1. Entonces f(x) = x³/3 − 2x² + 1. Mínimo: f(4) = 64/3 − 32 + 1 = −29/3 ≈ −9,67. Además f(0) = 1 (máximo) y f(2) = 8/3 − 8 + 1 = −13/3 (en la inflexión)."]) +
      ejemplo("Problema 5 · Con valor absoluto", "Estudia f(x) = x·|x − 2|: expresión a trozos, derivabilidad, monotonía, extremos y curvatura.",
        ["A trozos: f(x) = x(2 − x) = −x² + 2x si x &lt; 2 y f(x) = x(x − 2) = x² − 2x si x ≥ 2. Corta a los ejes en (0, 0) y (2, 0); f &lt; 0 si x &lt; 0 y f &gt; 0 en el resto salvo f(2) = 0.",
         "f′ = −2x + 2 si x &lt; 2 y f′ = 2x − 2 si x &gt; 2. En x = 2: f′(2⁻) = −2 y f′(2⁺) = 2 ⟹ <b>punto angular</b>, f no es derivable en 2.",
         "Monotonía: crece en (−∞, 1) (−2x + 2 &gt; 0), decrece en (1, 2), crece en (2, +∞). <b>Máximo relativo (1, 1)</b> y <b>mínimo relativo (2, 0)</b> (en el pico).",
         "Curvatura: f″ = −2 (cóncava) si x &lt; 2 y f″ = 2 (convexa) si x &gt; 2. El cambio de curvatura ocurre en el pico x = 2, donde no existe tangente: no se cuenta como inflexión. Sin asíntotas (rama parabólica en ambos extremos)."])
  });

  nuevas.push({
    h: "15. ¿Qué falla aquí? Errores típicos",
    html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
  });
  nuevas.push({
    h: "16. Autocomprobación del tema",
    html: "<p>Test con explicación, tarjetas, una actividad de emparejar, otra de clasificar ramas infinitas y el orden del guion.</p>" +
      w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
  });

  // ================================================================
  //  RESUMEN
  // ================================================================
  var resumen = [
    "<b>Guion</b> (siempre en este orden): dominio y simetría → cortes y signo → asíntotas (+∞ y −∞ por separado) → f′: monotonía y extremos → f″: curvatura e inflexiones → esbozo coherente. Cada paso comprueba al anterior.",
    "<b>Dominio</b>: raíz par ⟹ radicando ≥ 0; ln ⟹ argumento &gt; 0; fracción ⟹ denominador ≠ 0. Simetría: primero ¿es simétrico el dominio? Par: f(−x) = f(x); impar: f(−x) = −f(x). Una raíz común de numerador y denominador es un <b>hueco</b>, no una asíntota.",
    "<b>Ramas infinitas</b>: lím f = L ⟹ horizontal; si no, m = lím f/x y n = lím (f − mx) ⟹ oblicua; si n = ∞, m = ±∞ o m = 0 ⟹ rama parabólica. Con raíces o exponenciales, +∞ y −∞ pueden dar cosas distintas. En el borde del dominio calcula el límite lateral: puede ser finito (x·ln x en 0⁺).",
    "<b>f′</b>: f crece donde f′ &gt; 0. Los candidatos a extremo son f′ = 0 y los puntos donde f′ no existe (picos del valor absoluto); es extremo solo si f′ cambia de signo (de + a −: máximo; de − a +: mínimo). Si f″(a) = 0 el criterio de f″ no decide.",
    "<b>f″</b>: convexa (∪) si f″ &gt; 0, cóncava (∩) si f″ &lt; 0. Inflexión: f″ = 0 <b>y cambia de signo</b> (x⁴ en 0 no; x³ en 0 sí). Picos (sin tangente) no son inflexiones.",
    "<b>Leer f desde f′</b>: f′ &gt; 0 ⟹ f crece; ceros de f′ con cambio de signo ⟹ extremos de f; extremos de f′ ⟹ inflexiones de f; crece/decrece f′ ⟹ convexa/cóncava f. f queda determinada salvo una constante.",
    "<b>Deducir la fórmula</b>: cada dato es una ecuación (pasa por un punto: f(p) = q; extremo: f′(p) = 0; inflexión: f″(p) = 0; asíntotas: límites). Tantas ecuaciones como parámetros; comprobar con un dato no usado.",
    "<b>Esbozo</b>: puntos con coordenadas, asíntotas discontinuas, tangentes horizontales en extremos, tabla de formas (↗∩ ↘∩ ↘∪ ↗∪) y nunca cruzar una vertical."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«f(x) = x·ln x no tiene dominio en x = 0, luego x = 0 es una asíntota vertical». ¿Qué falla?",
          op: ["Nada, está bien", "Hay que calcular el límite lateral: lím<sub>x→0⁺</sub> x ln x = 0 es finito, así que no hay asíntota vertical", "El dominio de x ln x es ℝ", "Falta mirar x = 1"], ok: 1,
          porque: "Una asíntota vertical exige que el límite lateral sea ±∞. Aquí 0·(−∞) se resuelve con L'Hôpital y da 0: la curva termina en un punto abierto (0, 0)." },
        { q: "«f′(0) = 0, luego f(x) = x³ tiene un mínimo en x = 0». ¿Qué falla?",
          op: ["Nada, está bien", "f′ = 3x² es ≥ 0 a ambos lados: no cambia de signo, así que no hay extremo (hay una inflexión)", "x³ no es derivable en 0", "El mínimo está en x = 3"], ok: 1,
          porque: "f′ = 0 solo da candidatos. Hay extremo cuando f′ cambia de signo. En x³, f′ = 3x² ≥ 0 siempre: f crece en todo ℝ y en 0 tiene tangente horizontal con inflexión." },
        { q: "«f″(1) = 0, luego x = 1 es un punto de inflexión de f(x) = (x − 1)⁴». ¿Qué falla?",
          op: ["Nada, está bien", "f″ = 12(x − 1)² ≥ 0 no cambia de signo: no hay inflexión (f es convexa en todo ℝ)", "f″ debería valer 1", "(x − 1)⁴ no tiene derivada segunda"], ok: 1,
          porque: "Para que haya inflexión, f″ debe cambiar de signo. Con (x − 1)⁴ solo toca el 0, como x⁴ en el origen: es un mínimo." },
        { q: "«f(x) = (x² − 1)/(x − 1) tiene asíntota vertical en x = 1 porque se anula el denominador». ¿Qué falla?",
          op: ["Nada, está bien", "Al simplificar f = x + 1 (x ≠ 1): el límite en 1 es 2, finito. Es un hueco en (1, 2), no una asíntota", "La asíntota está en x = −1", "Es una asíntota horizontal"], ok: 1,
          porque: "Si numerador y denominador se anulan a la vez hay que factorizar. Aquí x − 1 se cancela y f(x) → 2 cuando x → 1." },
        { q: "«f(x) = √(x² + x) − x tiene la asíntota horizontal y = 1/2, y nada más». ¿Qué falla?",
          op: ["Nada, está bien", "Solo es horizontal en +∞; en −∞ tiene la oblicua y = −2x − 1/2", "La horizontal es y = 1", "No tiene ninguna asíntota"], ok: 1,
          porque: "Hay que estudiar +∞ y −∞ por separado: en −∞, √(x² + x) ≈ −x, y f ≈ −2x." },
        { q: "«f′(x) = x(x − 2)² se anula en 0 y en 2, luego f tiene dos extremos relativos». ¿Qué falla?",
          op: ["Nada, está bien", "En x = 2 el factor (x − 2)² no cambia de signo: solo x = 0 es extremo (un mínimo)", "Solo x = 2 es extremo", "f no tiene extremos"], ok: 1,
          porque: "Una raíz doble de f′ no produce cambio de signo. En x = 2, f tiene tangente horizontal pero sigue creciendo." },
        { q: "«f(x) = |x² − 4| tiene dos puntos de inflexión, en x = ±2, porque ahí cambia la curvatura». ¿Qué falla?",
          op: ["Nada, está bien", "En x = ±2 hay picos (puntos angulares): f no tiene tangente allí, así que no se consideran inflexiones", "Los puntos de inflexión están en x = 0", "No cambia la curvatura"], ok: 1,
          porque: "Un punto de inflexión necesita tangente (la gráfica la atraviesa). En x = ±2 las derivadas laterales son ±4: hay pico." },
        { q: "«La gráfica de f′ tiene un mínimo en x = 1 con f′(1) = −4, luego f tiene un mínimo en x = 1». ¿Qué falla?",
          op: ["Nada, está bien", "Un extremo de f′ es una inflexión de f; los extremos de f están en los ceros de f′", "f no tiene nada en x = 1", "f tiene un máximo en x = −4"], ok: 1,
          porque: "El mínimo de f′ indica el punto donde f′ deja de decrecer y empieza a crecer: f″ cambia de − a +, o sea inflexión de f." }
      ]
    },
    quiz1: {
      titulo: "Test de estudio de funciones",
      preguntas: [
        { q: "El dominio de f(x) = ln(x² − 4) es", op: ["ℝ − {−2, 2}", "(−∞, −2) ∪ (2, +∞)", "[−2, 2]", "(2, +∞)"], ok: 1, porque: "El argumento debe ser estrictamente positivo: x² − 4 &gt; 0 ⟺ |x| &gt; 2." },
        { q: "Si el dominio no es simétrico respecto del origen, f", op: ["es par", "es impar", "no puede ser par ni impar", "no está definida"], ok: 2, porque: "Para que f(−x) tenga sentido, −x debe estar en el dominio cuando lo está x." },
        { q: "f(x) = (x² + 1)/x tiene como asíntota oblicua", op: ["y = x + 1", "y = x", "y = 1", "no tiene"], ok: 1, porque: "(x² + 1)/x = x + 1/x, y 1/x → 0." },
        { q: "Si f′ pasa de positiva a negativa en x = a, f tiene en a", op: ["un mínimo relativo", "un máximo relativo", "una inflexión", "una asíntota"], ok: 1, porque: "f deja de crecer y empieza a decrecer: máximo relativo." },
        { q: "Un punto de inflexión de f es un punto donde", op: ["f′ = 0", "f″ = 0 y f″ cambia de signo", "f = 0", "f″ &gt; 0"], ok: 1, porque: "Es donde cambia la curvatura: f″ = 0 y cambia de signo (x⁴ en 0 tiene f″ = 0 sin inflexión)." },
        { q: "Si la gráfica de f′ tiene un máximo relativo en x = a, f tiene en a", op: ["un mínimo", "un máximo", "un punto de inflexión", "un cero"], ok: 2, porque: "f′ cambia de crecer a decrecer: f″ cambia de + a −, inflexión de f." },
        { q: "lím<sub>x→+∞</sub> x·e<sup>−x</sup> vale", op: ["+∞", "1", "0", "−∞"], ok: 2, porque: "xe<sup>−x</sup> = x/eˣ; la exponencial gana a la potencia (L'Hôpital: 1/eˣ → 0)." },
        { q: "f(x) = eˣ tiene en +∞", op: ["asíntota horizontal y = 0", "asíntota oblicua", "rama parabólica en la dirección del eje Y", "asíntota vertical"], ok: 2, porque: "f(x)/x = eˣ/x → +∞: crece más deprisa que cualquier recta, sin asíntota. (La asíntota y = 0 está en −∞.)" },
        { q: "Para f(x) = x³ − 6x² + 9x + 1, f′(1) = 0 y f″(1) vale", op: ["−6 (máximo)", "6 (mínimo)", "0", "−3"], ok: 0, porque: "f″ = 6x − 12 ⟹ f″(1) = −6 &lt; 0: máximo, en (1, 5)." },
        { q: "Una asíntota vertical de f(x) = (3x − 2)/(x − 2) es", op: ["x = 3", "x = 2", "x = 2/3", "no tiene"], ok: 1, porque: "El denominador se anula en x = 2 y el numerador vale 4 ≠ 0." }
      ]
    },
    tj1: {
      titulo: "Tarjetas del tema 10",
      cartas: [
        { a: "Orden del estudio completo", b: "Dominio y simetría · cortes y signo · asíntotas · f′ (monotonía, extremos) · f″ (curvatura, inflexiones) · esbozo." },
        { a: "Asíntota horizontal", b: "lím<sub>x→±∞</sub> f(x) = L (finito). Estudia +∞ y −∞ por separado." },
        { a: "Asíntota oblicua y = mx + n", b: "m = lím f(x)/x (finito, ≠ 0); n = lím [f(x) − mx] (finito)." },
        { a: "Rama parabólica", b: "Rama infinita sin asíntota: f/x → ±∞ (eje Y, como eˣ) o f/x → 0 con f → ∞ (eje X, como ln x)." },
        { a: "Hueco frente a asíntota vertical", b: "Si una raíz anula numerador y denominador, tras factorizar el límite es finito: hueco. Si solo anula el denominador: asíntota." },
        { a: "Extremo relativo", b: "Punto crítico (f′ = 0 o no existe) donde f′ cambia de signo: + a − máximo, − a + mínimo." },
        { a: "Punto de inflexión", b: "f″ = 0 (o tangente con f″ no definida) <b>y</b> f″ cambia de signo; la curva atraviesa su tangente." },
        { a: "Convexa y cóncava", b: "Convexa (∪): f″ &gt; 0. Cóncava (∩): f″ &lt; 0." },
        { a: "De f′ a f", b: "f′ &gt; 0: f crece · ceros con cambio de signo: extremos · extremos de f′: inflexiones de f." },
        { a: "Cada dato, una ecuación", b: "Pasa por (p, q): f(p) = q · extremo en p: f′(p) = 0 · inflexión en p: f″(p) = 0." },
        { a: "x·ln x en 0⁺", b: "Tiende a 0 (L'Hôpital): no hay asíntota vertical, hay un punto abierto en (0, 0)." },
        { a: "Valor absoluto", b: "Se escribe a trozos; en los puntos de unión se calculan las derivadas laterales (picos)." }
      ]
    },
    empar: {
      titulo: "Función y su asíntota",
      consigna: "Une cada función con su asíntota (la que se pide en +∞ si no se dice otra cosa).",
      pares: [
        ["3x/(x − 5)", "vertical x = 5 (y horizontal y = 3)"],
        ["(4x² + 1)/(2x² − 3)", "horizontal y = 2"],
        ["(x² + 3x)/(x − 1)", "oblicua y = x + 4"],
        ["ln x / x", "horizontal y = 0 (y vertical x = 0)"],
        ["√(x² + x) − x", "horizontal y = 1/2"],
        ["(x² + 1)/(x − 1)", "oblicua y = x + 1"]
      ]
    },
    clas: {
      titulo: "Ramas infinitas",
      consigna: "Clasifica el comportamiento de cada función cuando x → +∞.",
      categorias: ["Asíntota horizontal", "Asíntota oblicua", "Rama parabólica"],
      items: [
        { t: "(2x² + 1)/(x² − 3)", c: 0 }, { t: "x·e<sup>−x</sup>", c: 0 }, { t: "(x − 1)/(x² + 1)", c: 0 },
        { t: "(x² + 1)/(x − 1)", c: 1 }, { t: "(x³ + 1)/x²", c: 1 }, { t: "√(x² + 1)", c: 1 },
        { t: "eˣ", c: 2 }, { t: "ln x", c: 2 }, { t: "x²", c: 2 }
      ]
    },
    orden: {
      titulo: "El guion del estudio de una función",
      consigna: "Ordena los pasos del estudio completo.",
      items: [
        { t: "Dominio y simetría" }, { t: "Cortes con los ejes y signo de f" }, { t: "Asíntotas y ramas infinitas" },
        { t: "Derivada primera: monotonía y extremos relativos" }, { t: "Derivada segunda: curvatura e inflexiones" }, { t: "Esbozo coherente con la tabla" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function lista(et, v, ph) { return { tipo: "lista", etiqueta: et, valores: v, ph: ph || "valores separados por comas" }; }
  function opcion(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  function E(id, nivel, enunciado, check, pistas, pasos, resultado) { return { id: id, nivel: nivel, enunciado: enunciado, check: check, pistas: pistas, pasos: pasos, resultado: resultado }; }

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    E("a1", 1, "Halla los extremos finitos de los intervalos que forman el dominio de f(x) = √(x² − 6x + 8).", lista("extremos =", [2, 4]),
      ["Radicando ≥ 0: parábola hacia arriba, fuera de las raíces."], ["x² − 6x + 8 = (x − 2)(x − 4) ≥ 0 ⟺ x ≤ 2 o x ≥ 4."], "Dom = (−∞, 2] ∪ [4, +∞)"),
    E("a2", 1, "Clasifica la simetría de f(x) = x³/(x² + 1).", opcion("f es", ["Par", "Impar", "Ni par ni impar", "Par e impar a la vez"], 1),
      ["Calcula f(−x)."], ["f(−x) = −x³/(x² + 1) = −f(x)."], "Impar"),
    E("a3", 1, "Halla el punto de corte con el eje Y de f(x) = (x² − 9)/(x + 1) (da la ordenada).", num("f(0) =", -9),
      ["Sustituye x = 0."], ["f(0) = (0 − 9)/(0 + 1) = −9."], "(0, −9)"),
    E("a4", 1, "Halla los cortes con el eje X de f(x) = (x² − 5x + 6)/(x + 4).", lista("x =", [2, 3]),
      ["Numerador igual a 0 (y denominador distinto de 0)."], ["x² − 5x + 6 = (x − 2)(x − 3): x = 2 y x = 3, y el denominador vale 6 y 7 ≠ 0."], "x = 2 y x = 3"),
    E("a5", 1, "Halla la asíntota vertical de f(x) = 3x/(x − 5) (valor de x).", num("x =", 5),
      ["Denominador igual a 0."], ["x − 5 = 0 ⟹ x = 5, y el numerador vale 15 ≠ 0."], "x = 5"),
    E("a6", 1, "Halla la asíntota horizontal de f(x) = (4x² + 1)/(2x² − 3) (valor de y).", num("y =", 2),
      ["Mismo grado: cociente de los coeficientes principales."], ["lím f = 4/2 = 2."], "y = 2"),
    E("a7", 1, "Halla la asíntota oblicua y = mx + n de f(x) = (x² + 3x)/(x − 1).", [num("m =", 1), num("n =", 4)],
      ["Divide los polinomios."], ["(x² + 3x) = (x − 1)(x + 4) + 4, así que f = x + 4 + 4/(x − 1).", "m = 1, n = 4."], "y = x + 4"),
    E("a8", 1, "Estudia f(x) = x³ − 12x: da la abscisa del máximo relativo y el valor de f en él.", [num("x del máximo =", -2), num("f en el máximo =", 16)],
      ["f′ = 3x² − 12."], ["f′ = 3(x − 2)(x + 2): + , −, +: máximo en x = −2.", "f(−2) = −8 + 24 = 16."], "Máximo (−2, 16)"),
    E("a9", 1, "Estudia f(x) = x·eˣ: da la abscisa de su mínimo relativo y su valor (decimal).", [num("x del mínimo =", -1), num("f en el mínimo =", -0.367879, { ph: "−0,368" })],
      ["f′ = (1 + x)eˣ."], ["f′ = 0 ⟹ x = −1; pasa de − a +: mínimo.", "f(−1) = −1/e ≈ −0,368."], "Mínimo (−1, −1/e)"),
    E("a10", 1, "Halla la abscisa del punto de inflexión de f(x) = x³ − 6x².", num("x =", 2),
      ["f″ = 6x − 12."], ["f″ = 0 ⟹ x = 2; f″ cambia de − a +."], "x = 2"),
    E("a11", 1, "Halla el punto crítico de f(x) = (ln x)/x (valor decimal de x).", num("x =", 2.71828, { ph: "2,718" }),
      ["f′ = (1 − ln x)/x²."], ["f′ = 0 ⟹ ln x = 1 ⟹ x = e."], "x = e ≈ 2,718"),
    E("a12", 1, "¿Qué tipo de rama tiene f(x) = eˣ cuando x → +∞?", opcion("Rama", ["Asíntota horizontal", "Asíntota oblicua", "Rama parabólica en la dirección del eje Y", "Asíntota vertical"], 2),
      ["Calcula f(x)/x."], ["eˣ/x → +∞: no hay oblicua; crece más rápido que cualquier recta."], "Rama parabólica (eje Y)"),
    E("a13", 1, "f(x) = x⁴ − 4x³ tiene un único extremo relativo. ¿En qué x?", num("x =", 3),
      ["f′ = 4x²(x − 3): el factor x² no cambia el signo."], ["f′ = 0 en x = 0 (raíz doble: no cambia de signo) y x = 3 (− a +): mínimo en x = 3."], "x = 3"),
    E("a14", 1, "La derivada de f es f′(x) = (x − 1)(x + 2). ¿En qué x tiene f un máximo relativo?", num("x =", -2),
      ["Signo de f′ a cada lado de las raíces."], ["f′ es + en (−∞, −2), − en (−2, 1), + en (1, +∞): máximo en x = −2 y mínimo en x = 1."], "x = −2"),
    E("a15", 1, "Si la gráfica de f′ tiene un máximo relativo en x = a, ¿qué tiene f en a?", opcion("f tiene", ["Un máximo relativo", "Un mínimo relativo", "Un punto de inflexión", "Una asíntota vertical"], 2),
      ["Un extremo de f′ es un cero de f″ con cambio de signo."], ["f″ pasa de + a −: cambio de curvatura."], "Punto de inflexión"),
    // ---------------------------------------------------------------- ★★
    E("b1", 2, "Para f(x) = x²/(x + 2): halla el valor del máximo relativo (que está en x = −4).", num("f(−4) =", -8),
      ["Comprueba que f′(−4) = 0."], ["f′ = x(x + 4)/(x + 2)²: es + si x &lt; −4 y − en (−4, −2): pasa de + a − en x = −4.", "f(−4) = 16/(−2) = −8."], "(−4, −8)"),
    E("b2", 2, "Halla la asíntota oblicua y = mx + n de f(x) = x²/(x + 2).", [num("m =", 1), num("n =", -2)],
      ["Divide x² entre x + 2."], ["x² = (x + 2)(x − 2) + 4, así que f = x − 2 + 4/(x + 2).", "m = 1, n = −2."], "y = x − 2"),
    E("b3", 2, "Para f(x) = x²/(x + 2), f″(x) = 8/(x + 2)³. ¿Cómo es f en (−∞, −2)?", opcion("En (−∞, −2) f es", ["Convexa", "Cóncava", "Lineal", "Depende del punto"], 1),
      ["Signo de (x + 2)³ cuando x &lt; −2."], ["(x + 2)³ &lt; 0, así que f″ &lt; 0: cóncava."], "Cóncava"),
    E("b4", 2, "Para f(x) = 2x/(x² + 1), halla el valor del máximo relativo.", num("máximo =", 1),
      ["f′ = 2(1 − x²)/(x² + 1)²."], ["f′ = 0 ⟹ x = ±1; en x = 1 pasa de + a −: máximo.", "f(1) = 2/2 = 1."], "(1, 1)"),
    E("b5", 2, "Para f(x) = 2x/(x² + 1), halla la mayor abscisa de sus inflexiones (decimal).", num("x =", 1.73205, { ph: "1,732" }),
      ["f″ = 4x(x² − 3)/(x² + 1)³."], ["f″ = 0 ⟹ x = 0 o x = ±√3 (tres inflexiones, con cambio de signo en cada una)."], "x = √3 ≈ 1,732"),
    E("b6", 2, "Halla la abscisa del punto de inflexión de f(x) = x·eˣ.", num("x =", -2),
      ["f″ = (x + 2)eˣ."], ["f′ = (x + 1)eˣ, f″ = (x + 2)eˣ = 0 ⟹ x = −2, con cambio de signo."], "x = −2"),
    E("b7", 2, "Halla la mayor abscisa de inflexión de f(x) = e<sup>−x²</sup> (decimal).", num("x =", 0.707107, { ph: "0,707" }),
      ["f″ = (4x² − 2)e<sup>−x²</sup>."], ["4x² − 2 = 0 ⟹ x = ±√2/2 ≈ ±0,707."], "x = √2/2"),
    E("b8", 2, "Halla la ordenada de esos puntos de inflexión de f(x) = e<sup>−x²</sup> (decimal).", num("f =", 0.606531, { ph: "0,607" }),
      ["Sustituye x² = 1/2."], ["f = e<sup>−1/2</sup> ≈ 0,607."], "e<sup>−1/2</sup> ≈ 0,607"),
    E("b9", 2, "Halla el valor mínimo relativo de f(x) = x·ln x (decimal).", num("mínimo =", -0.367879, { ph: "−0,368" }),
      ["f′ = ln x + 1."], ["f′ = 0 ⟹ x = 1/e; f(1/e) = (1/e)(−1) = −1/e ≈ −0,368."], "−1/e ≈ −0,368"),
    E("b10", 2, "Halla la abscisa de la inflexión de f(x) = ln(x² + 1) con x &gt; 0.", num("x =", 1),
      ["f′ = 2x/(x² + 1)."], ["f″ = 2(1 − x²)/(x² + 1)² = 0 ⟹ x = ±1."], "x = 1"),
    E("b11", 2, "Halla la ordenada de ese punto de inflexión de f(x) = ln(x² + 1) en x = 1 (decimal).", num("f(1) =", 0.693147, { ph: "0,693" }),
      ["Sustituye x = 1."], ["f(1) = ln 2 ≈ 0,693."], "ln 2"),
    E("b12", 2, "Halla la abscisa del máximo relativo de f(x) = x·√(4 − x) (decimal).", num("x =", 2.66667, { ph: "2,667" }),
      ["f′ = (8 − 3x)/(2√(4 − x))."], ["f′ = 0 ⟹ x = 8/3."], "x = 8/3"),
    E("b13", 2, "Halla el valor de ese máximo relativo de f(x) = x·√(4 − x) (decimal).", num("máximo =", 3.0792, { ph: "3,079" }),
      ["f(8/3) = (8/3)·√(4/3)."], ["√(4/3) = 2/√3, y f = 16/(3√3) = 16√3/9 ≈ 3,079."], "16√3/9 ≈ 3,079"),
    E("b14", 2, "¿Cuántos puntos angulares (picos) tiene la gráfica de f(x) = |x² − 4|?", num("picos =", 2),
      ["Picos donde x² − 4 cruza el eje con pendiente no nula."], ["En x = ±2 las derivadas laterales valen ±4."], "2"),
    E("b15", 2, "Halla el valor del máximo relativo de f(x) = x·|x − 2|.", num("máximo =", 1),
      ["Para x &lt; 2: f = −x² + 2x."], ["f′ = −2x + 2 = 0 ⟹ x = 1; f(1) = 1."], "(1, 1)"),
    E("b16", 2, "Halla la asíntota horizontal en +∞ de f(x) = √(x² + x) − x (valor de y).", num("y =", 0.5),
      ["Multiplica y divide por el conjugado."], ["f = x/(√(x² + x) + x) → 1/2."], "y = 1/2"),
    E("b17", 2, "Para esa misma función, halla la asíntota oblicua en −∞: y = mx + n.", [num("m =", -2), num("n =", -0.5)],
      ["En −∞, √(x² + x) ≈ −x."], ["m = lím f/x = −2; n = lím (√(x² + x) + x) = −1/2."], "y = −2x − 1/2"),
    E("b18", 2, "f(x) = (ax + b)/(x + c) tiene asíntota vertical x = −1, horizontal y = 2 y pasa por (0, 3). Halla a, b, c.", [num("a =", 2), num("b =", 3), num("c =", 1)],
      ["Vertical: x + c = 0 en x = −1. Horizontal: a."], ["c = 1; a = 2.", "f(0) = b/c = 3 ⟹ b = 3."], "a = 2, b = 3, c = 1"),
    E("b19", 2, "f(x) = ax³ + bx² tiene un mínimo relativo en (2, −4). Halla a, b y la abscisa de su inflexión.", [num("a =", 1), num("b =", -3), num("x de la inflexión =", 1)],
      ["f′(2) = 0 y f(2) = −4."], ["12a + 4b = 0 ⟹ b = −3a; 8a + 4b = −4 ⟹ −4a = −4 ⟹ a = 1, b = −3.", "f″ = 6x − 6 = 0 ⟹ x = 1."], "a = 1, b = −3, inflexión en x = 1"),
    E("b20", 2, "f(x) = (ax + b)eˣ pasa por (0, −1) y tiene tangente horizontal en x = 1. Halla a y b.", [num("a =", 0.5), num("b =", -1)],
      ["f′ = (ax + a + b)eˣ."], ["f(0) = b = −1; f′(1) = (2a + b)e = 0 ⟹ a = 1/2."], "a = 1/2, b = −1"),
    E("b21", 2, "Si f′(x) = x(x − 2)², ¿cuántos extremos relativos tiene f?", num("extremos =", 1),
      ["Mira en qué raíces cambia de signo f′."], ["Solo cambia de signo en x = 0 (mínimo); x = 2 es raíz doble."], "1"),
    E("b22", 2, "Si f′(x) = x³ − 3x², halla la mayor abscisa de inflexión de f.", num("x =", 2),
      ["f″ = 3x² − 6x."], ["f″ = 3x(x − 2) = 0 ⟹ x = 0 y x = 2, con cambio de signo en ambos."], "x = 2"),
    E("b23", 2, "Halla la asíntota oblicua y = x + n de f(x) = (x² + x + 1)/(x − 1) (valor de n).", num("n =", 2),
      ["Divide."], ["x² + x + 1 = (x − 1)(x + 2) + 3 ⟹ f = x + 2 + 3/(x − 1)."], "n = 2"),
    E("b24", 2, "Halla el valor del mínimo relativo de f(x) = (x² + x + 1)/(x − 1) (decimal).", num("mínimo =", 6.4641, { ph: "6,464" }),
      ["f′ = (x² − 2x − 2)/(x − 1)²."], ["x² − 2x − 2 = 0 ⟹ x = 1 ± √3; el mínimo está en x = 1 + √3.", "f(1 + √3) = 3 + 2√3 ≈ 6,464."], "3 + 2√3 ≈ 6,464"),
    E("b25", 2, "¿Cuántas asíntotas verticales tiene f(x) = (x² − 1)/(x² − 3x + 2)?", num("asíntotas =", 1),
      ["Factoriza numerador y denominador."], ["f = (x − 1)(x + 1)/((x − 1)(x − 2)): en x = 1 hay hueco; solo x = 2 es asíntota."], "1"),
    // ---------------------------------------------------------------- ★★★
    E("c1", 3, "Para f(x) = x³/(x² − 1), halla la abscisa positiva del mínimo relativo (decimal).", num("x =", 1.73205, { ph: "1,732" }),
      ["f′ = x²(x² − 3)/(x² − 1)²."], ["f′ = 0 en x = 0 (doble) y x = ±√3. El mínimo está en x = √3."], "x = √3"),
    E("c2", 3, "Para esa misma función, halla el valor del mínimo relativo (decimal).", num("mínimo =", 2.59808, { ph: "2,598" }),
      ["f(√3) = 3√3/2."], ["f(√3) = 3√3/(3 − 1) = 3√3/2 ≈ 2,598."], "3√3/2"),
    E("c3", 3, "Para f(x) = x³/(x² − 1) se tiene f′(0) = 0. ¿Qué ocurre en x = 0?", opcion("En x = 0 hay", ["Un máximo relativo", "Un mínimo relativo", "Un punto de inflexión con tangente horizontal", "Nada especial"], 2),
      ["f′ = x²(x² − 3)/(x² − 1)² y f″ = 2x(x² + 3)/(x² − 1)³."], ["f′ ≤ 0 a ambos lados: no cambia de signo (no hay extremo).", "f″ cambia de + a − en 0: inflexión."], "Inflexión con tangente horizontal"),
    E("c4", 3, "Halla el valor del máximo relativo de f(x) = x²e<sup>−x</sup> (decimal).", num("máximo =", 0.541341, { ph: "0,541" }),
      ["f′ = x(2 − x)e<sup>−x</sup>."], ["Máximo en x = 2: f(2) = 4/e² ≈ 0,541."], "4/e²"),
    E("c5", 3, "Halla la mayor abscisa de inflexión de f(x) = x²e<sup>−x</sup> (decimal).", num("x =", 3.41421, { ph: "3,414" }),
      ["f″ = (x² − 4x + 2)e<sup>−x</sup>."], ["x² − 4x + 2 = 0 ⟹ x = 2 ± √2; la mayor es 2 + √2 ≈ 3,414."], "x = 2 + √2"),
    E("c6", 3, "Halla la abscisa del máximo de f(x) = (ln x)/x² (decimal).", num("x =", 1.64872, { ph: "1,649" }),
      ["f′ = (1 − 2 ln x)/x³."], ["f′ = 0 ⟹ ln x = 1/2 ⟹ x = √e ≈ 1,649."], "x = √e"),
    E("c7", 3, "Halla el valor de ese máximo de f(x) = (ln x)/x² (decimal).", num("máximo =", 0.18394, { ph: "0,184" }),
      ["Sustituye x = √e."], ["f(√e) = (1/2)/e = 1/(2e) ≈ 0,184."], "1/(2e)"),
    E("c8", 3, "Halla la abscisa del punto de inflexión de f(x) = (ln x)/x² (decimal).", num("x =", 2.30098, { ph: "2,301" }),
      ["f″ = (6 ln x − 5)/x⁴."], ["6 ln x = 5 ⟹ x = e<sup>5/6</sup> ≈ 2,301."], "x = e<sup>5/6</sup>"),
    E("c9", 3, "Halla la derivada lateral f′(0⁺) de f(x) = e<sup>−|x|</sup>.", num("f′(0⁺) =", -1),
      ["Para x &gt; 0, f = e<sup>−x</sup>."], ["f′ = −e<sup>−x</sup> → −1. (Por la izquierda es +1: punto angular, máximo en (0, 1).)"], "−1"),
    E("c10", 3, "Halla la pendiente m de la asíntota oblicua en −∞ de f(x) = √(x² + 1) − x.", num("m =", -2),
      ["En −∞, √(x² + 1) ≈ −x."], ["f/x = (√(x² + 1) − x)/x → −1 − 1 = −2; n = lím (√(x² + 1) + x) = 0."], "y = −2x"),
    E("c11", 3, "Para f(x) = √(x² + 1) − x se tiene f′ = x/√(x² + 1) − 1. ¿Cómo es f?", opcion("f es", ["Estrictamente creciente", "Estrictamente decreciente en ℝ", "Con un mínimo en x = 0", "Con un máximo en x = 0"], 1),
      ["Compara |x| con √(x² + 1)."], ["x/√(x² + 1) &lt; 1 siempre, luego f′ &lt; 0."], "Decreciente (y convexa: f″ &gt; 0)"),
    E("c12", 3, "f(x) = x + a/x tiene un mínimo relativo en x = 2 (con x &gt; 0). Halla a.", num("a =", 4),
      ["f′ = 1 − a/x²."], ["f′(2) = 1 − a/4 = 0 ⟹ a = 4."], "a = 4"),
    E("c13", 3, "Con ese valor de a, f(x) = x + 4/x: calcula el valor del mínimo relativo.", num("mínimo =", 4),
      ["f(2) = 2 + 4/2."], ["f(2) = 4."], "(2, 4)"),
    E("c14", 3, "f(x) = ax + b/x tiene un mínimo relativo en el punto (2, 4). Halla a y b.", [num("a =", 1), num("b =", 4)],
      ["f′(2) = 0 y f(2) = 4."], ["a − b/4 = 0 ⟹ b = 4a; 2a + b/2 = 4 ⟹ 2a + 2a = 4 ⟹ a = 1, b = 4."], "a = 1, b = 4"),
    E("c15", 3, "Halla el valor del mínimo relativo de f(x) = x²·ln x (decimal).", num("mínimo =", -0.18394, { ph: "−0,184" }),
      ["f′ = x(2 ln x + 1)."], ["x = e<sup>−1/2</sup>; f = (1/e)(−1/2) = −1/(2e) ≈ −0,184."], "−1/(2e)"),
    E("c16", 3, "Halla la abscisa de la inflexión de f(x) = x²·ln x (decimal).", num("x =", 0.22313, { ph: "0,223" }),
      ["f″ = 2 ln x + 3."], ["2 ln x + 3 = 0 ⟹ x = e<sup>−3/2</sup> ≈ 0,223."], "x = e<sup>−3/2</sup>"),
    E("c17", 3, "Si f′(x) = x² − 4x y f(0) = 1, halla el valor del mínimo relativo de f (decimal).", num("mínimo =", -9.66667, { ph: "−9,667" }),
      ["Integra y usa f(0) = 1; el mínimo está donde f′ pasa de − a +."], ["f = x³/3 − 2x² + 1; mínimo en x = 4: f(4) = 64/3 − 32 + 1 = −29/3."], "−29/3 ≈ −9,667"),
    E("c18", 3, "¿Cuántas asíntotas (verticales, horizontales y oblicuas) tiene en total f(x) = 2x/(x² − 1)?", num("asíntotas =", 3),
      ["Verticales en x = ±1; en ±∞ el cociente tiende a 0."], ["x = −1, x = 1 e y = 0 (la misma en ±∞): 3."], "3"),
    E("c19", 3, "Halla el valor del mínimo relativo de f(x) = eˣ/x (decimal).", num("mínimo =", 2.71828, { ph: "2,718" }),
      ["f′ = (x − 1)eˣ/x²."], ["Mínimo en x = 1: f(1) = e."], "(1, e)"),
    E("c20", 3, "f(x) = (x² − 1)/(x² + 1) es par. Halla la abscisa positiva de su inflexión (decimal).", num("x =", 0.57735, { ph: "0,577" }),
      ["f″ = 4(1 − 3x²)/(x² + 1)³."], ["1 − 3x² = 0 ⟹ x = ±1/√3 ≈ ±0,577."], "x = 1/√3"),
    E("c21", 3, "Halla la ordenada de esa inflexión en x = 1/√3 de f(x) = (x² − 1)/(x² + 1).", num("f =", -0.5),
      ["Sustituye x² = 1/3."], ["f = (1/3 − 1)/(1/3 + 1) = (−2/3)/(4/3) = −1/2."], "−1/2")
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "El guion del estudio completo", ancha: true,
      pasos: ["Dominio y simetría (¿es simétrico el dominio?).", "Cortes con los ejes y signo de f.", "Asíntotas en +∞ y en −∞, y verticales (límite lateral).", "f′: monotonía y extremos (¿cambia de signo?).", "f″: curvatura e inflexiones (¿cambia de signo?).", "Esbozo: puntos, asíntotas, tabla de formas ↗∩ ↘∩ ↘∪ ↗∪."],
      nota: "Cada paso comprueba al anterior; una contradicción indica un error de cálculo." },
    { titulo: "Ramas infinitas: receta", ancha: true,
      tabla: { cab: ["Si…", "Entonces"], filas: [
        ["lím f = L finito", "horizontal y = L"],
        ["m = lím f/x finito ≠ 0 y n = lím (f − mx) finito", "oblicua y = mx + n"],
        ["m = ±∞ (eˣ, x²)", "rama parabólica en la dirección del eje Y"],
        ["m = 0 con f → ∞ (ln x, √x)", "rama parabólica en la dirección del eje X"],
        ["límite lateral ±∞ en un borde", "asíntota vertical"]
      ] },
      nota: "Racional: grado de P frente al de Q. Con raíces y exponenciales, +∞ y −∞ por separado." },
    { titulo: "Qué cuenta f′ sobre f", ancha: true,
      tabla: { cab: ["En f′", "En f"], filas: [
        ["f′ &gt; 0 / f′ &lt; 0", "crece / decrece"],
        ["cero con cambio + a − / − a +", "máximo / mínimo"],
        ["cero sin cambio de signo", "tangente horizontal, sin extremo"],
        ["f′ crece / decrece", "convexa ∪ / cóncava ∩"],
        ["f′ tiene un extremo", "inflexión de f"]
      ] } },
    { titulo: "Deducir parámetros",
      pasos: ["Un dato = una ecuación.", "Pasa por (p, q): f(p) = q.", "Extremo en p: f′(p) = 0.", "Inflexión en p: f″(p) = 0.", "Asíntotas: límites.", "Resolver y comprobar con un dato no usado."],
      nota: "Tantas ecuaciones como parámetros." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Asíntota vertical solo porque x = 0 no está en el dominio", bien: "Límite lateral: puede ser finito (x ln x)", por: "Entonces hay un punto abierto, no una asíntota." },
        { mal: "f′ = 0 ⟹ extremo", bien: "Además f′ debe cambiar de signo", por: "x³ en 0 tiene f′ = 0 y ningún extremo." },
        { mal: "f″ = 0 ⟹ inflexión", bien: "f″ debe cambiar de signo", por: "x⁴ en 0: f″ = 0 y es un mínimo." },
        { mal: "Una sola asíntota para +∞ y −∞", bien: "Estudiarlas por separado", por: "√(x² + x) − x: horizontal en +∞, oblicua en −∞." },
        { mal: "Cancelar (x − a) y dar asíntota en a", bien: "Es un hueco", por: "El límite en a es finito." },
        { mal: "Curva que cruza la asíntota vertical", bien: "Nunca la cruza", por: "No está en el dominio." }
      ] }
  ];

  B.registrar("mates2", "t10", {
    resumen: resumen, secciones: B.parte.m2t10a.secciones, nuevas: nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
