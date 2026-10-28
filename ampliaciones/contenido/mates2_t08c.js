/* ============================================================
   Matemáticas II · ampliaciones · Tema 8: Derivadas
   (parte C: problemas EvAU, resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(n, ref) { return H.w(n, ref && "mates2/t8/" + ref); }

  var nuevas = B.parte.m2t8b.nuevas;

  // ================================================================
  //  SECCIONES FINALES (12 problemas EvAU, 13 errores, 14 autocomprobación)
  // ================================================================
  nuevas.push({
    h: "12. Problemas tipo EvAU resueltos",
    html:
      "<p>Tres problemas completos, con el tipo de apartados que se mezclan en el examen.</p>" +
      ejemplo("Problema 1: función a trozos con exponencial",
        "Sea f(x) = e<sup>ax</sup> si x ≤ 0 y f(x) = 1 + bx + x² si x &gt; 0. (a) Halla la relación entre a y b para que f sea derivable en x = 0. (b) Con a = b = 2, escribe la recta tangente en x = 0. (c) Con a = b = −1, ¿existe f″(0)?",
        ["(a) Continuidad: por la izquierda e⁰ = 1; por la derecha 1 + 0 + 0 = 1. Se cumple siempre. Derivadas: a·e<sup>ax</sup> → a en x = 0; b + 2x → b. Derivable ⟺ <b>a = b</b>.",
         "(b) f(0) = 1, f′(0) = 2 ⟹ <b>y = 1 + 2x</b>.",
         "(c) Con a = b = −1: f′(x) = −e<sup>−x</sup> (x ≤ 0), −1 + 2x (x &gt; 0). f″ por la izquierda: e<sup>−x</sup> → 1; por la derecha: 2. Como 1 ≠ 2, <b>no existe f″(0)</b>: f es derivable en 0 pero no dos veces."]) +
      ejemplo("Problema 2: estudio con tangente y límite",
        "Sea f(x) = x²·e<sup>−x</sup>. (a) Halla los puntos de tangente horizontal. (b) Escribe la tangente en x = 1. (c) Calcula lim<sub>x→+∞</sub> f(x).",
        ["(a) f′ = 2x·e<sup>−x</sup> − x²·e<sup>−x</sup> = x(2 − x)e<sup>−x</sup> = 0 ⟹ x = 0 o x = 2. Puntos: <b>(0, 0) y (2, 4/e²)</b>.",
         "(b) f(1) = 1/e y f′(1) = 1·1·e⁻¹ = 1/e ⟹ y − 1/e = (1/e)(x − 1) ⟹ <b>y = x/e</b> (pasa por el origen).",
         "(c) x²/eˣ es ∞/∞. L'Hôpital: 2x/eˣ (∞/∞), otra vez: 2/eˣ → <b>0</b>."]) +
      ejemplo("Problema 3: Rolle y valor medio",
        "Sea f(x) = ln(1 + x²). (a) Comprueba que cumple Rolle en [−1, 1] y halla c. (b) Halla el c del valor medio en [0, 1].",
        ["(a) 1 + x² &gt; 0, luego f es continua y derivable en ℝ. f(−1) = ln 2 = f(1) ✓. f′(x) = 2x/(1 + x²) = 0 ⟹ <b>c = 0</b> ∈ (−1, 1).",
         "(b) Cuerda: [f(1) − f(0)]/1 = ln 2. f′(c) = 2c/(1 + c²) = ln 2 ⟹ (ln 2)c² − 2c + ln 2 = 0 ⟹ c = [1 ± √(1 − ln² 2)]/ln 2.",
         "Con ln 2 ≈ 0,6931: c ≈ 0,4028 o c ≈ 2,4826. Solo el primero está en (0, 1): <b>c ≈ 0,403</b>."])
  });

  nuevas.push({
    h: "13. ¿Qué falla aquí? Errores típicos",
    html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
  });
  nuevas.push({
    h: "14. Autocomprobación del tema",
    html: "<p>Test con explicación, tarjetas, una actividad de emparejar, otra de clasificar y el orden del método para funciones a trozos.</p>" +
      w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
  });

  // ================================================================
  //  RESUMEN
  // ================================================================
  var resumen = [
    "<b>Definición</b>: f′(a) = lim [f(a + h) − f(a)]/h = lim [f(x) − f(a)]/(x − a): pendiente de la tangente (límite de las secantes). Se calcula simplificando la h antes de hacer h → 0. <b>Tangente</b>: y = f(a) + f′(a)(x − a); <b>normal</b>: pendiente −1/f′(a).",
    "<b>Reglas</b>: (u ± v)′, (uv)′ = u′v + uv′, (u/v)′ = (u′v − uv′)/v², cadena (f∘g)′ = f′(g)·g′. Tabla compuesta: (eᵘ)′ = u′eᵘ, (ln u)′ = u′/u, (sen u)′ = u′cos u, (arctan u)′ = u′/(1 + u²), (arcsen u)′ = u′/√(1 − u²). Simplifica los logaritmos antes de derivar.",
    "<b>Derivabilidad</b>: derivable ⟺ f′(a⁻) = f′(a⁺) finitas. Derivable ⟹ continua (no al revés: punto angular, cúspide, tangente vertical). A trozos: primero continuidad en el punto de unión, luego derivadas de los trozos iguales. Con |·|: separar en trozos.",
    "<b>Derivación logarítmica</b> para f(x)<sup>g(x)</sup> y productos/cocientes grandes: ln y = g·ln f ⟹ y′ = f<sup>g</sup>(g′ln f + g·f′/f).",
    "<b>Tangentes</b>: en un punto (y − f(a) = f′(a)(x − a)); de pendiente m o paralela a una recta (resolver f′(x) = m); desde un punto exterior (el punto de tangencia es la incógnita t).",
    "<b>Rolle</b>: continua en [a, b], derivable en (a, b), f(a) = f(b) ⟹ ∃c con f′(c) = 0. <b>Valor medio</b>: ∃c con f′(c) = [f(b) − f(a)]/(b − a). Escribe las hipótesis y quédate con los c del intervalo abierto. Con Bolzano: existencia y unicidad de raíces.",
    "<b>L'Hôpital</b>: solo 0/0 o ∞/∞; se deriva arriba y abajo por separado, repitiendo si hace falta. 0·∞ y ∞ − ∞ → una fracción; 1<sup>∞</sup>, 0⁰, ∞⁰ → logaritmos."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«(x·eˣ)′ = 1·eˣ = eˣ». ¿Qué falla?",
          op: ["Nada, está bien", "La derivada de un producto no es el producto de las derivadas: (uv)′ = u′v + uv′, y sale (1 + x)eˣ", "Falta dividir por x", "La derivada de eˣ es x·eˣ"], ok: 1,
          porque: "Con u = x y v = eˣ: u′v + uv′ = eˣ + x·eˣ = (1 + x)eˣ. Compruébalo en x = 1: la pendiente real es (1 + 1)e = 2e, no e." },
        { q: "«Para derivar sen(3x) escribo cos(3x)». ¿Qué falla?",
          op: ["Nada, está bien", "Falta el factor de dentro (regla de la cadena): (sen 3x)′ = 3·cos(3x)", "Es −cos(3x)", "Es sen(3)"], ok: 1,
          porque: "La función de fuera es sen u (derivada cos u) y hay que multiplicar por la derivada de lo de dentro, u′ = 3." },
        { q: "«f(x) = |x| es derivable en 0 porque es continua en 0». ¿Qué falla?",
          op: ["Nada, es derivable", "Continua no implica derivable: las derivadas laterales valen −1 y +1", "|x| no es continua en 0", "Es derivable pero con derivada 0"], ok: 1,
          porque: "Derivable ⟹ continua, pero no al revés. En 0 hay un punto angular: f′(0⁻) = −1 ≠ f′(0⁺) = 1." },
        { q: "«f(x) = x² si x ≤ 1 y f(x) = 2x + 1 si x &gt; 1. Las derivadas de los trozos valen lo mismo en 1 (2 y 2), así que es derivable». ¿Qué falla?",
          op: ["Nada, está bien", "No es continua en 1 (x² vale 1 y 2x + 1 vale 3): sin continuidad no hay derivabilidad", "Hay que derivar dos veces", "El trozo derecho no es derivable"], ok: 1,
          porque: "Primero hay que comprobar la continuidad: por la izquierda f(1) = 1 y por la derecha el límite es 3. Hay un salto, y entonces no es derivable aunque las derivadas de los trozos coincidan." },
        { q: "«(xˣ)′ = x·x^(x−1) = xˣ». ¿Qué falla?",
          op: ["Nada", "La base y el exponente dependen de x: hay que derivar con logaritmos y sale xˣ(ln x + 1)", "Es xˣ·ln x", "Es x·xˣ"], ok: 1,
          porque: "La regla de la potencia vale solo con exponente constante. Con ln y = x ln x: y′/y = ln x + 1." },
        { q: "«lim<sub>x→0</sub> (x² + 1)/(x) es 0/0 así que, por L'Hôpital, vale lim 2x/1 = 0». ¿Qué falla?",
          op: ["Nada", "No es una indeterminación 0/0: el numerador vale 1, no 0, y el límite no existe finito", "Hay que derivar tres veces", "Falta una constante"], ok: 1,
          porque: "En x = 0 el numerador es 1 y el denominador 0: no es indeterminado (el límite es ±∞, según el lado). Aplicar L'Hôpital sin comprobar la forma da un resultado falso." },
        { q: "«Rolle en f(x) = x² en [0, 1] da c con f′(c) = 0, que es c = 0.» ¿Qué falla?",
          op: ["Nada", "No se cumple f(0) = f(1) (0 ≠ 1) y c = 0 no está en el intervalo abierto", "f no es derivable", "Hay que usar [−1, 1]"], ok: 1,
          porque: "Rolle exige f(a) = f(b). Aquí f(0) = 0 ≠ 1 = f(1); la conclusión (tangente horizontal en (0, 1)) además es falsa: f′(c) = 2c = 0 solo en c = 0, que no está en el abierto." }
      ]
    },
    quiz1: {
      titulo: "Test de derivadas",
      preguntas: [
        { q: "f′(a) es el límite de", op: ["f(a + h)/h", "[f(a + h) − f(a)]/h cuando h → 0", "f(a + h) − f(a)", "[f(a + h) + f(a)]/h"], ok: 1, porque: "Es la pendiente de la secante que se hace tangente al acercar el segundo punto al primero." },
        { q: "La derivada de ln(x² + 1) es", op: ["1/(x² + 1)", "2x/(x² + 1)", "2x·ln(x² + 1)", "(x² + 1)/2x"], ok: 1, porque: "(ln u)′ = u′/u con u = x² + 1, u′ = 2x." },
        { q: "La derivada de arctan(2x) es", op: ["2/(1 + 4x²)", "1/(1 + 4x²)", "2/(1 + 2x)", "1/(1 + 2x)²"], ok: 0, porque: "(arctan u)′ = u′/(1 + u²) con u = 2x." },
        { q: "Una función continua en a pero con derivadas laterales −2 y 3 en a", op: ["es derivable en a", "tiene en a un punto angular: no es derivable", "es discontinua en a", "tiene tangente horizontal"], ok: 1, porque: "Las derivadas laterales no coinciden: pico (punto angular)." },
        { q: "Para f(x) = xˣ, f′(1) vale", op: ["0", "1", "e", "ln 1"], ok: 1, porque: "f′ = xˣ(ln x + 1); en x = 1: 1·(0 + 1) = 1." },
        { q: "La recta normal a la gráfica en un punto con f′(a) = 4 tiene pendiente", op: ["4", "−4", "1/4", "−1/4"], ok: 3, porque: "Perpendicular a la tangente: m′ = −1/m = −1/4." },
        { q: "El teorema de Rolle exige", op: ["continua en [a, b] y f(a) = f(b), sin más", "continua en [a, b], derivable en (a, b) y f(a) = f(b)", "derivable en [a, b] y f(a) ≠ f(b)", "f′ continua"], ok: 1, porque: "Las tres hipótesis: continuidad en el cerrado, derivabilidad en el abierto, mismas alturas." },
        { q: "lim<sub>x→0</sub> (sen x − x)/x³ vale", op: ["0", "−1/6", "1/6", "no existe"], ok: 1, porque: "Tres veces L'Hôpital: (cos x − 1)/3x², (−sen x)/6x, (−cos x)/6 → −1/6." },
        { q: "Si lim f′/g′ no existe, entonces lim f/g", op: ["tampoco existe", "puede existir: L'Hôpital no dice nada", "vale 0", "vale ∞"], ok: 1, porque: "L'Hôpital es una implicación en un solo sentido; por ejemplo (x + sen x)/x → 1 aunque (1 + cos x) no tenga límite." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de derivadas",
      cartas: [
        { a: "Definición de derivada", b: "f′(a) = lim [f(a + h) − f(a)]/h = lim [f(x) − f(a)]/(x − a)." },
        { a: "Tangente y normal en x = a", b: "Tangente: y = f(a) + f′(a)(x − a). Normal: pendiente −1/f′(a)." },
        { a: "(u·v)′ y (u/v)′", b: "u′v + uv′  ·  (u′v − uv′)/v²." },
        { a: "Regla de la cadena", b: "(f∘g)′ = f′(g(x))·g′(x): de fuera hacia dentro, un factor por capa." },
        { a: "(arctan u)′, (arcsen u)′", b: "u′/(1 + u²)  ·  u′/√(1 − u²)." },
        { a: "(tan x)′", b: "1 + tan² x = 1/cos² x." },
        { a: "Derivada de f(x)^g(x)", b: "f^g·(g′ ln f + g·f′/f). Se obtiene con ln y = g ln f." },
        { a: "Derivabilidad en un punto", b: "f′(a⁻) = f′(a⁺) finitas. Derivable ⟹ continua." },
        { a: "Derivabilidad de una función a trozos", b: "1.º continuidad en el punto de unión; 2.º derivadas de los trozos iguales allí." },
        { a: "Tres formas de ser continua y no derivable", b: "Punto angular (|x|), cúspide (∛x²), tangente vertical (∛x)." },
        { a: "Teorema de Rolle", b: "Continua en [a, b], derivable en (a, b), f(a) = f(b) ⟹ ∃c ∈ (a, b): f′(c) = 0." },
        { a: "Teorema del valor medio", b: "Continua en [a, b], derivable en (a, b) ⟹ ∃c: f′(c) = [f(b) − f(a)]/(b − a)." },
        { a: "L'Hôpital", b: "0/0 o ∞/∞: lim f/g = lim f′/g′ (si existe). Se deriva arriba y abajo por separado." },
        { a: "Indeterminación 1^∞, 0⁰, ∞⁰", b: "Logaritmo: ln L = lim g·ln f (0·∞), se pasa a cociente y L = e^(límite)." }
      ]
    },
    empar: {
      titulo: "Función y derivada",
      consigna: "Une cada función con su derivada.",
      pares: [
        ["arctan x²", "2x/(1 + x⁴)"],
        ["ln(x² + 1)", "2x/(x² + 1)"],
        ["x·eˣ", "(1 + x)eˣ"],
        ["xˣ", "xˣ(ln x + 1)"],
        ["tan x", "1 + tan² x"],
        ["√(2x + 1)", "1/√(2x + 1)"]
      ]
    },
    clas: {
      titulo: "¿Derivable en x = 0?",
      consigna: "Toca cada función y di si es derivable en x = 0.",
      categorias: ["Derivable en 0", "No derivable en 0"],
      items: [
        { t: "x·|x|", c: 0 }, { t: "|x|", c: 1 }, { t: "∛x", c: 1 }, { t: "∛(x²)", c: 1 },
        { t: "x²", c: 0 }, { t: "e^|x|", c: 1 }, { t: "|x|³", c: 0 }, { t: "|sen x|", c: 1 }
      ]
    },
    orden: {
      titulo: "Parámetros para que una función a trozos sea derivable",
      consigna: "Ordena los pasos del método.",
      items: [
        { t: "Identificar el punto c donde se unen los trozos" },
        { t: "Imponer continuidad en c: los dos trozos valen lo mismo en c" },
        { t: "Derivar cada trozo por separado" },
        { t: "Imponer que las derivadas coincidan en c" },
        { t: "Resolver el sistema de las dos ecuaciones para los parámetros" },
        { t: "Comprobar sustituyendo los valores obtenidos en ambas condiciones" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function ex(et, e, dom, ph) { var c = { tipo: "expr", etiqueta: et, expr: e }; if (dom) c.dom = dom; if (ph) c.ph = ph; return c; }
  function lista(et, v, ph) { return { tipo: "lista", etiqueta: et, valores: v, ph: ph || "valores separados por comas" }; }
  function opcion(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "d1", nivel: 1, enunciado: "Calcula por la definición f′(2) para f(x) = x² − 3x.", check: num("f′(2) =", 1),
      pistas: ["Escribe [f(2 + h) − f(2)]/h y simplifica la h."], pasos: ["f(2) = −2; f(2 + h) = (2 + h)² − 3(2 + h) = −2 + h + h².", "Cociente: (h + h²)/h = 1 + h → 1."], resultado: "f′(2) = 1" },
    { id: "d2", nivel: 1, enunciado: "Calcula por la definición f′(1) para f(x) = x³.", check: num("f′(1) =", 3),
      pistas: ["(1 + h)³ = 1 + 3h + 3h² + h³."], pasos: ["[(1 + h)³ − 1]/h = (3h + 3h² + h³)/h = 3 + 3h + h².", "Límite: 3."], resultado: "f′(1) = 3" },
    { id: "d3", nivel: 1, enunciado: "Calcula lim<sub>h→0</sub> [sen(π/6 + h) − sen(π/6)]/h (decimal).", check: num("límite =", 0.8660254, { ph: "0,866" }),
      pistas: ["Es la derivada de sen x en π/6."], pasos: ["Es f′(π/6) con f = sen.", "cos(π/6) = √3/2 ≈ 0,866."], resultado: "√3/2 ≈ 0,866" },
    { id: "d4", nivel: 1, enunciado: "Deriva f(x) = x³·ln x.", check: ex("f′(x) =", "3x^2*ln(x)+x^2", [0.3, 5], "puedes usar ln(x)"),
      pistas: ["Regla del producto."], pasos: ["u = x³, v = ln x.", "f′ = 3x² ln x + x³/x = 3x² ln x + x²."], resultado: "f′(x) = 3x² ln x + x²" },
    { id: "d5", nivel: 1, enunciado: "Deriva f(x) = (2x + 1)/(x − 1).", check: ex("f′(x) =", "-3/(x-1)^2", [-3, 0.5]),
      pistas: ["Cociente: (u′v − uv′)/v²."], pasos: ["u′v − uv′ = 2(x − 1) − (2x + 1) = −3.", "f′ = −3/(x − 1)²."], resultado: "f′(x) = −3/(x − 1)²" },
    { id: "d6", nivel: 1, enunciado: "Deriva f(x) = x·e<sup>3x</sup>.", check: ex("f′(x) =", "(3*x+1)*e^(3*x)", [-2, 2]),
      pistas: ["Producto y cadena en la exponencial."], pasos: ["f′ = e<sup>3x</sup> + x·3e<sup>3x</sup> = (1 + 3x)e<sup>3x</sup>."], resultado: "f′(x) = (3x + 1)e<sup>3x</sup>" },
    { id: "d7", nivel: 1, enunciado: "Deriva f(x) = sen(x²).", check: ex("f′(x) =", "2*x*cos(x^2)", [-3, 3], "puedes usar cos(x^2)"),
      pistas: ["Función de fuera: seno. De dentro: x²."], pasos: ["f′ = cos(x²)·2x."], resultado: "f′(x) = 2x·cos(x²)" },
    { id: "d8", nivel: 1, enunciado: "Deriva f(x) = ln(x² + 1).", check: ex("f′(x) =", "2*x/(x^2+1)", [-3, 3]),
      pistas: ["(ln u)′ = u′/u."], pasos: ["u = x² + 1, u′ = 2x."], resultado: "f′(x) = 2x/(x² + 1)" },
    { id: "d9", nivel: 1, enunciado: "Deriva f(x) = √(2x + 1).", check: ex("f′(x) =", "1/sqrt(2*x+1)", [0, 5], "puedes usar sqrt(…)"),
      pistas: ["(√u)′ = u′/(2√u)."], pasos: ["u = 2x + 1, u′ = 2.", "f′ = 2/(2√(2x + 1)) = 1/√(2x + 1)."], resultado: "f′(x) = 1/√(2x + 1)" },
    { id: "d10", nivel: 1, enunciado: "Recta tangente a f(x) = x² − 3x + 1 en x = 2. Escríbela como y = mx + n.", check: [num("m =", 1), num("n =", -3)],
      pistas: ["f(2) = −1; f′(2) = 2·2 − 3."], pasos: ["f′(2) = 1, f(2) = −1.", "y + 1 = x − 2 ⟹ y = x − 3."], resultado: "y = x − 3" },
    { id: "d11", nivel: 1, enunciado: "Recta normal a f(x) = x² − 3x + 1 en x = 2. Escríbela como y = mx + n.", check: [num("m =", -1), num("n =", 1)],
      pistas: ["Pendiente de la normal: −1/f′(2)."], pasos: ["m = −1.", "y + 1 = −(x − 2) ⟹ y = −x + 1."], resultado: "y = −x + 1" },
    { id: "d12", nivel: 1, enunciado: "Calcula f″(1) para f(x) = x⁴ − 3x².", check: num("f″(1) =", 6),
      pistas: ["Deriva dos veces."], pasos: ["f′ = 4x³ − 6x, f″ = 12x² − 6.", "f″(1) = 6."], resultado: "f″(1) = 6" },
    { id: "d13", nivel: 1, enunciado: "¿Qué es cierto de f(x) = |x| en x = 0?",
      check: opcion("Elige", ["Es continua pero no derivable", "Es derivable pero no continua", "Es derivable y continua", "No es continua ni derivable"], 0),
      pistas: ["Compara las derivadas laterales."], pasos: ["|x| es continua en todo ℝ.", "Pendientes −1 por la izquierda y +1 por la derecha: no derivable en 0."], resultado: "Continua pero no derivable" },
    { id: "d14", nivel: 1, enunciado: "Deriva f(x) = arctan(2x).", check: ex("f′(x) =", "2/(1+4*x^2)", [-3, 3]),
      pistas: ["(arctan u)′ = u′/(1 + u²)."], pasos: ["u = 2x, u′ = 2.", "f′ = 2/(1 + 4x²)."], resultado: "f′(x) = 2/(1 + 4x²)" },
    { id: "d15", nivel: 1, enunciado: "Deriva f(x) = eˣ/x.", check: ex("f′(x) =", "(x-1)*e^x/x^2", [0.3, 5]),
      pistas: ["Cociente."], pasos: ["(eˣ·x − eˣ·1)/x² = (x − 1)eˣ/x²."], resultado: "f′(x) = (x − 1)eˣ/x²" },
    { id: "d16", nivel: 1, enunciado: "Calcula lim<sub>x→2</sub> (x⁴ − 16)/(x − 2) reconociendo una derivada.", check: num("límite =", 32),
      pistas: ["Es [f(x) − f(2)]/(x − 2) con f(x) = x⁴."], pasos: ["f(2) = 16, así que es f′(2).", "f′(x) = 4x³ ⟹ f′(2) = 32."], resultado: "32" },
    // ---------------------------------------------------------------- ★★
    { id: "d17", nivel: 2, enunciado: "Calcula f′(2) para f(x) = xˣ (decimal).", check: num("f′(2) =", 6.7725887, { ph: "6,77" }),
      pistas: ["Derivación logarítmica: f′ = xˣ(ln x + 1)."], pasos: ["f′(x) = xˣ(ln x + 1).", "f′(2) = 4(ln 2 + 1) ≈ 6,7726."], resultado: "4(1 + ln 2) ≈ 6,77" },
    { id: "d18", nivel: 2, enunciado: "Calcula f′(π/2) para f(x) = x<sup>sen x</sup>.", check: num("f′(π/2) =", 1),
      pistas: ["f′ = x<sup>sen x</sup>(cos x ln x + sen x/x)."], pasos: ["En x = π/2: sen = 1, cos = 0, así que f = π/2.", "f′ = (π/2)(0 + 1/(π/2)) = 1."], resultado: "f′(π/2) = 1" },
    { id: "d19", nivel: 2, enunciado: "Calcula y′(1) para y = x²(x + 1)³/(x − 2)⁴ (derivación logarítmica).", check: num("y′(1) =", 60),
      pistas: ["y′/y = 2/x + 3/(x + 1) − 4/(x − 2); y(1) = 8."], pasos: ["y′/y en 1 = 2 + 1,5 + 4 = 7,5.", "y′(1) = 8·7,5 = 60."], resultado: "60" },
    { id: "d20", nivel: 2, enunciado: "f(x) = ax² + bx si x ≤ 1; f(x) = 2 + ln x si x &gt; 1. Halla a y b para que sea derivable en x = 1.", check: [num("a =", -1), num("b =", 3)],
      pistas: ["Continuidad: a + b = 2. Derivada: 2a + b = 1."], pasos: ["Restando: a = −1.", "b = 2 − a = 3."], resultado: "a = −1, b = 3" },
    { id: "d21", nivel: 2, enunciado: "f(x) = eˣ + a si x &lt; 0; f(x) = x² + bx + 3 si x ≥ 0. Halla a y b para que sea derivable en 0.", check: [num("a =", 2), num("b =", 1)],
      pistas: ["Continuidad: 1 + a = 3. Derivada: 1 = b."], pasos: ["a = 2.", "b = 1."], resultado: "a = 2, b = 1" },
    { id: "d22", nivel: 2, enunciado: "f(x) = x² si x ≤ 1; f(x) = ax + b si x &gt; 1. Halla a y b para que sea derivable en x = 1.", check: [num("a =", 2), num("b =", -1)],
      pistas: ["Continuidad: 1 = a + b. Derivada: 2 = a."], pasos: ["a = 2.", "b = 1 − a = −1."], resultado: "a = 2, b = −1" },
    { id: "d23", nivel: 2, enunciado: "Para f(x) = |x² − 4|, calcula las derivadas laterales en x = 2.", check: [num("f′(2⁻) =", -4), num("f′(2⁺) =", 4)],
      pistas: ["Cerca de 2 por la izquierda x² − 4 &lt; 0, así que f = 4 − x²."], pasos: ["Izquierda: f = 4 − x², f′ = −2x → −4.", "Derecha: f = x² − 4, f′ = 2x → 4. No derivable."], resultado: "−4 y 4" },
    { id: "d24", nivel: 2, enunciado: "Halla a para que f(x) = |x − 1|·(x + a) sea derivable en x = 1.", check: num("a =", -1),
      pistas: ["Compara f′(1⁺) = 1 + a con f′(1⁻) = −(1 + a)."], pasos: ["1 + a = −(1 + a) ⟹ a = −1."], resultado: "a = −1" },
    { id: "d25", nivel: 2, enunciado: "Halla las abscisas de los puntos de f(x) = x³ − 3x donde la tangente es paralela a y = 6x + 1.", check: lista("x =", [Math.sqrt(3), -Math.sqrt(3)], "dos valores separados por comas (decimales)"),
      pistas: ["Resuelve f′(x) = 6."], pasos: ["3x² − 3 = 6 ⟹ x² = 3.", "x = ±√3 ≈ ±1,732."], resultado: "x = ±√3" },
    { id: "d26", nivel: 2, enunciado: "Halla las abscisas de los puntos de tangencia de las rectas tangentes a y = x² que pasan por P(1, −3).", check: lista("t =", [3, -1]),
      pistas: ["Tangente en t: y = t² + 2t(x − t). Que pase por P."], pasos: ["−3 = t² + 2t(1 − t) = 2t − t².", "t² − 2t − 3 = 0 ⟹ t = 3 o t = −1."], resultado: "t = 3 y t = −1" },
    { id: "d27", nivel: 2, enunciado: "Tangente a f(x) = x·ln x en x = e, escrita como y = mx + n.", check: [num("m =", 2), num("n =", -Math.E, { ph: "−2,718…" })],
      pistas: ["f′ = ln x + 1."], pasos: ["f(e) = e, f′(e) = 2.", "y − e = 2(x − e) ⟹ y = 2x − e."], resultado: "y = 2x − e" },
    { id: "d28", nivel: 2, enunciado: "Aplica Rolle a f(x) = x³ − 6x² + 9x en [0, 3] y halla c.", check: num("c =", 1),
      pistas: ["f(0) = f(3) = 0. Resuelve f′(c) = 0 en (0, 3)."], pasos: ["f′ = 3(x − 1)(x − 3).", "x = 1 está en (0, 3); x = 3 no."], resultado: "c = 1" },
    { id: "d29", nivel: 2, enunciado: "Halla el c del teorema del valor medio para f(x) = ln x en [1, e] (decimal).", check: num("c =", Math.E - 1, { ph: "1,718" }),
      pistas: ["Pendiente de la cuerda: 1/(e − 1)."], pasos: ["f′(c) = 1/c = 1/(e − 1).", "c = e − 1 ≈ 1,718."], resultado: "c = e − 1" },
    { id: "d30", nivel: 2, enunciado: "Halla el c del teorema del valor medio para f(x) = x³ en [1, 3] (decimal).", check: num("c =", Math.sqrt(13 / 3), { ph: "2,08" }),
      pistas: ["Cuerda: (27 − 1)/2 = 13."], pasos: ["3c² = 13 ⟹ c = ±√(13/3).", "Solo el positivo está en (1, 3): c ≈ 2,082."], resultado: "c = √(13/3) ≈ 2,082" },
    { id: "d31", nivel: 2, enunciado: "Calcula lim<sub>x→0</sub> (sen x − x)/x³ (decimal).", check: num("límite =", -1 / 6, { ph: "−0,1667" }),
      pistas: ["Tres veces L'Hôpital."], pasos: ["(cos x − 1)/3x² → (−sen x)/6x → (−cos x)/6."], resultado: "−1/6" },
    { id: "d32", nivel: 2, enunciado: "Calcula lim<sub>x→0</sub> (e<sup>2x</sup> − 1 − 2x)/x².", check: num("límite =", 2),
      pistas: ["Dos veces L'Hôpital."], pasos: ["(2e<sup>2x</sup> − 2)/2x → 4e<sup>2x</sup>/2 = 2."], resultado: "2" },
    { id: "d33", nivel: 2, enunciado: "Calcula lim<sub>x→+∞</sub> (x³ + 5x)/(2x³ − ln x).", check: num("límite =", 0.5),
      pistas: ["∞/∞; también vale dividir por x³."], pasos: ["(3x² + 5)/(6x² − 1/x) → ... → 1/2."], resultado: "1/2" },
    { id: "d34", nivel: 2, enunciado: "Calcula lim<sub>x→0⁺</sub> (sen x)ˣ.", check: num("límite =", 1),
      pistas: ["Forma 0⁰: logaritmo, x·ln(sen x) = ln(sen x)/(1/x)."], pasos: ["L'Hôpital: (cos x/sen x)/(−1/x²) = −x² cos x/sen x → 0.", "ln L = 0 ⟹ L = 1."], resultado: "1" },
    { id: "d35", nivel: 2, enunciado: "Calcula lim<sub>x→+∞</sub> (1 + 3/x)<sup>2x</sup> (decimal).", check: num("límite =", Math.exp(6), { ph: "403,4" }),
      pistas: ["Forma 1<sup>∞</sup>."], pasos: ["ln L = lim 2x·ln(1 + 3/x) = lim 2·ln(1 + 3/x)/(1/x) → 6.", "L = e⁶ ≈ 403,43."], resultado: "e⁶ ≈ 403,43" },
    // ---------------------------------------------------------------- ★★★
    { id: "d36", nivel: 3, enunciado: "Calcula lim<sub>x→0</sub> (cos 2x)<sup>1/x²</sup> (decimal).", check: num("límite =", Math.exp(-2), { ph: "0,1353" }),
      pistas: ["1<sup>∞</sup>: ln L = lim ln(cos 2x)/x²."], pasos: ["Derivando: (−2 tan 2x)/(2x) = −tan 2x/x → −2 (se puede repetir L'Hôpital).", "L = e<sup>−2</sup> ≈ 0,1353."], resultado: "e⁻² ≈ 0,1353" },
    { id: "d37", nivel: 3, enunciado: "Halla a para que lim<sub>x→0</sub> (eˣ − 1 − ax)/x² sea finito.", check: num("a =", 1),
      pistas: ["Tras la primera derivada: (eˣ − a)/(2x). El numerador debe valer 0 en x = 0."], pasos: ["e⁰ − a = 0 ⟹ a = 1.", "Entonces el límite es 1/2."], resultado: "a = 1" },
    { id: "d38", nivel: 3, enunciado: "Halla a para que lim<sub>x→0</sub> [ln(1 + x) − ax]/x² sea finito y calcula ese límite (decimal).", check: [num("a =", 1), num("límite =", -0.5)],
      pistas: ["Primera derivada: (1/(1 + x) − a)/(2x)."], pasos: ["Numerador en 0: 1 − a = 0 ⟹ a = 1.", "Con a = 1: [1/(1 + x) − 1]/(2x) = −1/(2(1 + x)) → −1/2."], resultado: "a = 1, límite −1/2" },
    { id: "d39", nivel: 3, enunciado: "Sea f(x) = x²·sen(1/x) si x ≠ 0 y f(0) = 0. ¿Cuál es cierta?",
      check: opcion("Elige", ["f es derivable en 0 y f′(0) = 0", "f no es continua en 0", "f no es derivable en 0 porque f′(x) no tiene límite", "f′(0) = 1"], 0),
      pistas: ["Usa la definición: h² sen(1/h)/h = h·sen(1/h)."], pasos: ["f′(0) = lim h·sen(1/h) = 0 (h → 0 y |sen| ≤ 1).", "Aunque f′(x) = 2x sen(1/x) − cos(1/x) no tiene límite en 0."], resultado: "Derivable en 0 con f′(0) = 0" },
    { id: "d40", nivel: 3, enunciado: "La tangente a y = ln x que pasa por el origen: halla su pendiente (decimal) y la abscisa del punto de tangencia.", check: [num("m =", 1 / Math.E, { ph: "0,3679" }), num("x =", Math.E, { ph: "2,718" })],
      pistas: ["Tangente en t: y = ln t + (x − t)/t. Que pase por (0, 0)."], pasos: ["0 = ln t − 1 ⟹ t = e.", "Pendiente 1/e ≈ 0,368."], resultado: "m = 1/e, x = e" },
    { id: "d41", nivel: 3, enunciado: "Calcula f′(1) para f(x) = (1 + x²)ˣ (decimal).", check: num("f′(1) =", 2 * (Math.log(2) + 1), { ph: "3,386" }),
      pistas: ["f′ = f·[ln(1 + x²) + x·2x/(1 + x²)]."], pasos: ["f(1) = 2.", "f′(1) = 2(ln 2 + 1) ≈ 3,386."], resultado: "2(1 + ln 2) ≈ 3,386" },
    { id: "d42", nivel: 3, enunciado: "¿Cuántas raíces reales tiene x³ − 3x + 1 = 0 en (−1, 1)? (Usa Bolzano y Rolle.)", check: num("Número =", 1),
      pistas: ["g(−1) = 3, g(1) = −1; mira el signo de g′ en (−1, 1)."], pasos: ["Bolzano: al menos una.", "g′ = 3(x² − 1) &lt; 0 en (−1, 1): si hubiera dos, Rolle daría g′(c) = 0. Exactamente una."], resultado: "1 raíz" },
    { id: "d43", nivel: 3, enunciado: "Halla a para que f(x) = x³ − 3x² + ax cumpla las hipótesis de Rolle en [0, 2], y el mayor de los c que da el teorema (decimal).", check: [num("a =", 2), num("c =", 1 + Math.sqrt(3) / 3, { ph: "1,577" })],
      pistas: ["f(0) = 0: pide f(2) = 0. Luego resuelve f′(c) = 0."], pasos: ["f(2) = 8 − 12 + 2a = 0 ⟹ a = 2.", "f′ = 3x² − 6x + 2 = 0 ⟹ x = 1 ± √3/3.", "Los dos están en (0, 2); el mayor es 1 + √3/3 ≈ 1,577."], resultado: "a = 2, c ≈ 1,577" },
    { id: "d44", nivel: 3, enunciado: "Calcula la derivada décima de f(x) = x·eˣ en x = 0.", check: num("f⁽¹⁰⁾(0) =", 10),
      pistas: ["Deriva dos o tres veces y busca el patrón (x + n)eˣ."], pasos: ["f⁽ⁿ⁾ = (x + n)eˣ.", "En 0 con n = 10: 10."], resultado: "10" },
    { id: "d45", nivel: 3, enunciado: "La normal a f(x) = eˣ en x = 0 corta al eje X en un punto. Halla su abscisa.", check: num("x =", 1),
      pistas: ["Pendiente de la normal: −1/f′(0) = −1."], pasos: ["Normal: y = 1 − x.", "y = 0 ⟹ x = 1."], resultado: "x = 1" },
    { id: "d46", nivel: 3, enunciado: "Deriva y simplifica f(x) = arctan[(1 + x)/(1 − x)].", check: ex("f′(x) =", "1/(1+x^2)", [-0.9, 0.9]),
      pistas: ["u′ = 2/(1 − x)²; 1 + u² = (2 + 2x²)/(1 − x)²."], pasos: ["f′ = u′/(1 + u²) = 2/(2 + 2x²) = 1/(1 + x²)."], resultado: "f′(x) = 1/(1 + x²)" },
    { id: "d47", nivel: 3, enunciado: "La tangente a f(x) = 1/x en x = 1 forma con los ejes un triángulo. Calcula su área.", check: num("Área =", 2),
      pistas: ["f(1) = 1, f′(1) = −1: tangente y = 2 − x."], pasos: ["Corta a los ejes en (2, 0) y (0, 2).", "Área = ½·2·2 = 2."], resultado: "Área = 2" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Derivadas con la cadena incluida", ancha: true,
      tabla: { cab: ["Función", "Derivada"], filas: [
        ["uⁿ", "n·uⁿ⁻¹·u′"], ["√u", "u′/(2√u)"], ["eᵘ", "u′·eᵘ"], ["aᵘ", "u′·aᵘ·ln a"], ["ln u", "u′/u"],
        ["sen u · cos u", "u′ cos u · −u′ sen u"], ["tan u", "u′(1 + tan² u)"],
        ["arcsen u · arctan u", "u′/√(1 − u²) · u′/(1 + u²)"], ["u^v", "u^v·(v′ ln u + v·u′/u)"]
      ] },
      nota: "Siempre: «de fuera hacia dentro», y un factor u′ por cada capa." },
    { titulo: "Funciones a trozos: método",
      pasos: ["Punto de unión c.", "Continuidad: trozo izquierdo(c) = trozo derecho(c).", "Derivar cada trozo.", "Derivadas iguales en c.", "Resolver el sistema.", "Comprobar."],
      nota: "Sin continuidad no hay derivabilidad." },
    { titulo: "Tres formas de no ser derivable", ancha: true,
      tabla: { cab: ["Tipo", "Ejemplo", "Derivadas laterales"], filas: [
        ["Punto angular", "|x|", "−1 y +1"], ["Cúspide", "∛(x²)", "−∞ y +∞"],
        ["Tangente vertical", "∛x", "+∞ y +∞"], ["Salto", "función discontinua", "no hay derivada"]
      ] } },
    { titulo: "Rolle, valor medio y L'Hôpital", ancha: true,
      tabla: { cab: ["Resultado", "Hipótesis", "Conclusión"], filas: [
        ["Rolle", "continua [a, b], derivable (a, b), f(a) = f(b)", "∃c: f′(c) = 0"],
        ["Valor medio", "continua [a, b], derivable (a, b)", "∃c: f′(c) = [f(b) − f(a)]/(b − a)"],
        ["L'Hôpital", "0/0 o ∞/∞, f′/g′ con límite", "lim f/g = lim f′/g′"]
      ] },
      nota: "Los c deben estar en el intervalo abierto." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(uv)′ = u′v′", bien: "u′v + uv′", por: "La derivada de un producto no es el producto de derivadas." },
        { mal: "(sen 3x)′ = cos 3x", bien: "3 cos 3x", por: "Falta la derivada de lo de dentro." },
        { mal: "(xˣ)′ = x·xˣ⁻¹", bien: "xˣ(ln x + 1)", por: "Base y exponente variables: logaritmos." },
        { mal: "Derivables porque las derivadas de los trozos coinciden", bien: "Primero la continuidad", por: "Un salto impide la derivabilidad." },
        { mal: "L'Hôpital sin mirar la forma", bien: "Solo con 0/0 o ∞/∞", por: "Si no, el resultado puede ser falso." },
        { mal: "c fuera del intervalo abierto", bien: "c ∈ (a, b)", por: "Los extremos no valen." }
      ] }
  ];

  B.registrar("mates2", "t8", {
    resumen: resumen, secciones: B.parte.m2t8a.secciones, nuevas: nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
