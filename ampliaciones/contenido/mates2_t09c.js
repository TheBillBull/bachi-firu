/* ============================================================
   Matemáticas II · ampliaciones · Tema 9: Aplicaciones de la derivada
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Monotonía</b>: f′ &gt; 0 ⟹ crece; f′ &lt; 0 ⟹ decrece. Tabla de signos con los puntos donde f′ = 0 <b>o no existe</b> y los que no están en el dominio. Máximo si f′ pasa de + a −; mínimo si de − a +; si no cambia, no hay extremo.",
    "<b>Segunda derivada</b>: f′(a) = 0 y f″(a) &gt; 0 ⟹ mínimo; f″(a) &lt; 0 ⟹ máximo; f″(a) = 0 ⟹ el criterio no decide (mira el signo de f′ o la primera derivada no nula: orden par ⟹ extremo, impar ⟹ no).",
    "<b>Curvatura</b>: f″ &gt; 0 ⟹ ∪ (convexa); f″ &lt; 0 ⟹ ∩ (cóncava). Inflexión: f″ cambia de signo (f″(a) = 0 no basta: x⁴ en 0). Escribe siempre el signo o el dibujo ∪/∩.",
    "<b>Extremos absolutos en [a, b]</b> (f continua, Weierstrass): comparar f en los puntos críticos interiores (f′ = 0 o f′ no existe) y en a y b. Dices dónde se alcanzan; puede haber empates. Si no es cerrado, mira los límites en los bordes.",
    "<b>Parámetros</b>: pasa por (x₀, y₀) ⟹ f(x₀) = y₀; extremo en x₀ ⟹ f′(x₀) = 0; inflexión en x₀ ⟹ f″(x₀) = 0; tangente de pendiente m ⟹ f′(x₀) = m. Una ecuación por cada parámetro. Comprueba al final.",
    "<b>Optimización</b>: variable y función objetivo ⟹ una sola variable con la condición ⟹ dominio ⟹ f′ = 0 ⟹ justificar (f″, signo de f′ o bordes) ⟹ responder con todas las magnitudes y unidades. Distancia mínima: minimiza d².",
    "<b>Rolle</b>: continua en [a, b], derivable en (a, b), f(a) = f(b) ⟹ ∃c, f′(c) = 0. <b>Valor medio</b>: ∃c, f′(c) = (f(b) − f(a))/(b − a). Bolzano ⟹ al menos una raíz; f′ ≠ 0 siempre ⟹ como mucho una (Rolle).",
    "<b>L'Hôpital</b>: solo con 0/0 o ∞/∞ y si <b>existe</b> lím f′/g′. 0·∞ ⟹ cociente; ∞ − ∞ ⟹ denominador común; 1<sup>∞</sup>, 0<sup>0</sup>, ∞<sup>0</sup> ⟹ logaritmos. Trampa: (x + sen x)/x en ∞."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«f(x) = x³ cumple f′(0) = 0, luego tiene un extremo en x = 0». ¿Qué falla?",
          op: ["Nada, está bien", "f′(a) = 0 es necesario pero no suficiente: f′ = 3x² no cambia de signo en 0, así que no hay extremo (es una inflexión)", "f′(0) no vale 0", "f(x) = x³ tiene un máximo en x = 0"], ok: 1,
          porque: "Un extremo exige que f′ cambie de signo. f′ = 3x² ≥ 0 a ambos lados: f es siempre creciente." },
        { q: "«f(x) = x⁴ cumple f′(0) = 0 y f″(0) = 0, luego en x = 0 no hay extremo». ¿Qué falla?",
          op: ["Nada", "Si f″(a) = 0 el criterio no decide: hay que mirar el signo de f′ (− a la izquierda, + a la derecha) y en x = 0 hay un mínimo", "Hay un máximo", "Hay una inflexión"], ok: 1,
          porque: "f′ = 4x³ pasa de negativa a positiva: mínimo. La primera derivada no nula es la cuarta (24 &gt; 0, orden par): mínimo." },
        { q: "«f″(a) = 0, luego en a hay un punto de inflexión». ¿Qué falla?",
          op: ["Nada", "Falta que f″ cambie de signo: f(x) = x⁴ tiene f″(0) = 0 y no hay inflexión", "Debería ser f′(a) = 0", "Debería ser f(a) = 0"], ok: 1,
          porque: "f″(a) = 0 es condición necesaria. Para x⁴, f″ = 12x² no cambia de signo (es ≥ 0 a ambos lados)." },
        { q: "«f(x) = 1/x es decreciente en todo su dominio, porque f′ = −1/x² &lt; 0; por tanto f(−1) &gt; f(1)». ¿Qué falla?",
          op: ["Nada", "El dominio ℝ − {0} no es un intervalo: f decrece en (−∞, 0) y en (0, ∞) por separado, y f(−1) = −1 &lt; 1 = f(1)", "f′ es positiva", "f es creciente"], ok: 1,
          porque: "La monotonía se enuncia en intervalos. Entre −1 y 1 hay una asíntota y f salta de −∞ a +∞." },
        { q: "«Máximo de x³ − 3x en [0, 2]: f′ = 3x² − 3 = 0 ⟹ x = ±1; el máximo es f(1) = −2». ¿Qué falla?",
          op: ["Nada", "x = −1 está fuera del intervalo, y además hay que evaluar los extremos: f(0) = 0, f(2) = 2; el máximo absoluto es 2 en x = 2 y f(1) = −2 es el mínimo", "El máximo es f(−1) = 2", "El máximo es f(0) = 0"], ok: 1,
          porque: "En un intervalo cerrado se comparan puntos críticos interiores y extremos: f(0) = 0, f(1) = −2, f(2) = 2." },
        { q: "«Para minimizar la distancia de (x, √x) al punto (4, 0) derivo d = √((x−4)² + x) y me sale una derivada enorme; no se puede simplificar». ¿Qué falla?",
          op: ["Nada", "Basta minimizar d² = (x−4)² + x: tiene el mismo mínimo y su derivada es 2x − 7", "Hay que maximizar", "Hay que usar L'Hôpital"], ok: 1,
          porque: "La raíz cuadrada es creciente, así que d y d² alcanzan el mínimo en el mismo x. Después se hace la raíz para dar la distancia." },
        { q: "«El rectángulo de perímetro 20 con área A = x·y: A′ = y + x·y′ = 0…». ¿Qué falla?",
          op: ["Nada", "No se ha eliminado una variable con la condición 2x + 2y = 20: debe ser A(x) = x(10 − x) y derivar esa función de una variable", "A no se puede derivar", "El perímetro no se usa"], ok: 1,
          porque: "Antes de derivar hay que dejar la función objetivo en una sola variable; la condición del problema sirve para eso." },
        { q: "«Tras hallar x = 4 en el problema de la caja, respondo: el volumen máximo es 4». ¿Qué falla?",
          op: ["Nada", "x = 4 es el lado del recorte; el volumen máximo es V(4), no x. Hay que responder con lo que pide el enunciado y con unidades", "El volumen es x²", "x debería ser 0"], ok: 1,
          porque: "Siempre hay que sustituir el óptimo en la función objetivo y contestar con todas las magnitudes pedidas." },
        { q: "«Aplico L'Hôpital a lím<sub>x→0</sub> (x + 1)/(x + 2): (x+1)′/(x+2)′ = 1, así que el límite vale 1». ¿Qué falla?",
          op: ["Nada", "No es 0/0 ni ∞/∞ (da 1/2): L'Hôpital solo se aplica con indeterminación, y aquí el límite vale 1/2", "Hay que derivar dos veces", "El límite no existe"], ok: 1,
          porque: "Sustituyendo, (0+1)/(0+2) = 1/2. La regla es válida solo para 0/0 o ∞/∞." },
        { q: "«El teorema de Rolle se aplica a f(x) = |x| en [−1, 1] porque f(−1) = f(1)». ¿Qué falla?",
          op: ["Nada", "f no es derivable en x = 0 ∈ (−1, 1): falta una hipótesis, y de hecho no hay ningún c con f′(c) = 0", "f no es continua", "El intervalo debe ser abierto"], ok: 1,
          porque: "|x| es continua y toma el mismo valor en ±1, pero tiene un pico en 0, donde no existe la derivada. Su derivada es ±1 y nunca vale 0." }
      ]
    },
    quiz1: {
      titulo: "Test de aplicaciones de la derivada",
      preguntas: [
        { q: "Si f′(x) &gt; 0 en todo el intervalo (a, b), entonces en (a, b) f es", op: ["estrictamente creciente", "estrictamente decreciente", "constante", "convexa"], ok: 0, porque: "El signo de la primera derivada da la monotonía." },
        { q: "f′(2) = 0 y f″(2) = −4. En x = 2 hay", op: ["un máximo relativo", "un mínimo relativo", "una inflexión", "no se sabe"], ok: 0, porque: "f″ &lt; 0: la curva es ∩ y la tangente es horizontal: máximo." },
        { q: "f(x) = x³ − 3x tiene un máximo relativo en", op: ["x = −1", "x = 1", "x = 0", "x = 3"], ok: 0, porque: "f′ = 3(x−1)(x+1) pasa de + a − en x = −1." },
        { q: "El punto de inflexión de f(x) = x³ − 6x² + 1 está en", op: ["x = 2", "x = 4", "x = 0", "x = −2"], ok: 0, porque: "f″ = 6x − 12 = 0 ⟹ x = 2, y cambia de signo." },
        { q: "Si f″(x) &lt; 0 en un intervalo, f es", op: ["cóncava (∩)", "convexa (∪)", "creciente", "constante"], ok: 0, porque: "f″ &lt; 0 ⟹ f′ decrece ⟹ forma ∩." },
        { q: "Para hallar los extremos absolutos de una función continua en [a, b] se comparan", op: ["los puntos críticos del interior y los valores en a y b", "solo los puntos con f′ = 0", "solo los extremos del intervalo", "solo los puntos de inflexión"], ok: 0, porque: "Es el método de Weierstrass." },
        { q: "f(x) = x² en [−2, 1]: el máximo absoluto vale", op: ["4", "1", "0", "2"], ok: 0, porque: "f(−2) = 4, f(1) = 1, f(0) = 0." },
        { q: "Si una curva «pasa por (1, 2) y tiene un extremo en x = 1» se plantea", op: ["f(1) = 2 y f′(1) = 0", "f(1) = 2 y f″(1) = 0", "f′(1) = 2", "f(2) = 1"], ok: 0, porque: "Pasar por el punto es f(1) = 2; un extremo es f′(1) = 0." },
        { q: "En el rectángulo de perímetro 40 de área máxima, los lados miden", op: ["10 y 10", "5 y 15", "8 y 12", "20 y 0"], ok: 0, porque: "A = x(20 − x) es máxima en x = 10: un cuadrado." },
        { q: "Para minimizar una distancia conviene minimizar", op: ["su cuadrado", "su raíz", "su logaritmo en base 2", "su inversa"], ok: 0, porque: "Mismo mínimo con una derivada más sencilla." },
        { q: "L'Hôpital se puede aplicar a lím<sub>x→0</sub> (1 − cos x)/x² porque es", op: ["0/0", "∞/∞", "1<sup>∞</sup>", "no es indeterminado"], ok: 0, porque: "1 − cos 0 = 0 y 0² = 0. Resultado 1/2." },
        { q: "El teorema del valor medio asegura que existe c ∈ (a, b) con f′(c) igual a", op: ["(f(b) − f(a))/(b − a)", "f(b) − f(a)", "0", "(f(a) + f(b))/2"], ok: 0, porque: "La derivada coincide con la tasa de variación media en algún punto." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de aplicaciones de la derivada",
      cartas: [
        { a: "Crecimiento", b: "f′ &gt; 0 ⟹ f creciente; f′ &lt; 0 ⟹ decreciente. Tabla de signos con puntos críticos y puntos fuera del dominio." },
        { a: "Extremos relativos", b: "f′ pasa de + a − ⟹ máximo; de − a + ⟹ mínimo; sin cambio ⟹ ninguno." },
        { a: "Criterio de la segunda derivada", b: "f′(a) = 0: f″(a) &gt; 0 ⟹ mínimo; f″(a) &lt; 0 ⟹ máximo; f″(a) = 0 ⟹ no decide." },
        { a: "Curvatura", b: "f″ &gt; 0 ⟹ convexa (∪); f″ &lt; 0 ⟹ cóncava (∩). Escribe siempre el signo o el dibujo." },
        { a: "Punto de inflexión", b: "f″ cambia de signo en a. f″(a) = 0 es necesario, no suficiente." },
        { a: "Extremos absolutos en [a, b]", b: "f continua: comparar f en puntos críticos interiores y en a y b. Pueden empatar." },
        { a: "Parámetros", b: "Pasa por (x₀, y₀): f(x₀) = y₀. Extremo: f′(x₀) = 0. Inflexión: f″(x₀) = 0. Pendiente m: f′(x₀) = m." },
        { a: "Optimización: pasos", b: "Función objetivo ⟹ una variable ⟹ dominio ⟹ f′ = 0 ⟹ justificar ⟹ responder con unidades." },
        { a: "Distancia mínima", b: "Minimiza d² (mismo mínimo, derivada más fácil) y haz la raíz al final." },
        { a: "Rolle", b: "f continua en [a, b], derivable en (a, b), f(a) = f(b) ⟹ ∃c ∈ (a, b), f′(c) = 0." },
        { a: "Teorema del valor medio", b: "f continua en [a, b], derivable en (a, b) ⟹ ∃c, f′(c) = (f(b) − f(a))/(b − a)." },
        { a: "L'Hôpital", b: "Solo 0/0 o ∞/∞ y si existe lím f′/g′. Otras indeterminaciones: pasar a cociente o usar logaritmos." }
      ]
    },
    empar: {
      titulo: "Función y su característica",
      consigna: "Une cada función con el dato que se pide.",
      pares: [
        ["Mínimo relativo de f(x) = x² − 4x + 1", "x = 2"],
        ["Inflexión de f(x) = x³ − 3x²", "x = 1"],
        ["Máximo absoluto de f(x) = x² en [−3, 2]", "9"],
        ["Mínimo absoluto de f(x) = x + 4/x en (0, ∞)", "4"],
        ["Rectángulo de perímetro 40 con mayor área: área", "100"],
        ["lím<sub>x→0</sub> (eˣ − 1)/x aplicando L'Hôpital", "1"]
      ]
    },
    clas: {
      titulo: "¿Qué herramienta uso?",
      consigna: "Toca cada pregunta y elige la herramienta que la resuelve.",
      categorias: ["Signo de f′", "Signo de f″", "Comparar candidatos en [a, b]", "Plantear ecuaciones con parámetros"],
      items: [
        { t: "¿Dónde crece la función?", c: 0 },
        { t: "¿Cuáles son sus mínimos relativos (tabla)?", c: 0 },
        { t: "¿En qué intervalos es convexa?", c: 1 },
        { t: "Puntos de inflexión", c: 1 },
        { t: "Máximo absoluto en [0, 5]", c: 2 },
        { t: "Beneficio máximo si el precio está limitado a p ≤ 40", c: 2 },
        { t: "Halla a para que tenga un extremo en x = 1", c: 3 },
        { t: "Halla a y b para que pase por (1, 2) con tangente horizontal", c: 3 }
      ]
    },
    orden: {
      titulo: "Resolver un problema de optimización",
      consigna: "Ordena los pasos de un problema de máximos y mínimos.",
      items: [
        { t: "Identificar la magnitud a optimizar y la condición del enunciado", nota: "Dibujar ayuda." },
        { t: "Expresar la función objetivo con una sola variable", nota: "Usando la condición para eliminar la otra." },
        { t: "Fijar el dominio de la variable", nota: "Longitudes positivas, etc." },
        { t: "Derivar e igualar a cero", nota: "Descartar soluciones fuera del dominio." },
        { t: "Justificar que es máximo o mínimo", nota: "Con f″, con el signo de f′ o comparando con los bordes." },
        { t: "Responder con todas las magnitudes y unidades", nota: "Sustituir en la función objetivo." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function opc(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "e01", nivel: 1, enunciado: "Halla el mínimo relativo de f(x) = x² − 4x + 3: ¿en qué valor de x se alcanza?", check: num("x =", 2),
      pistas: ["Deriva e iguala a cero."], pasos: ["f′(x) = 2x − 4 = 0 ⟹ x = 2.", "f″(x) = 2 &gt; 0: mínimo relativo en x = 2 (con f(2) = −1)."], resultado: "x = 2" },
    { id: "e02", nivel: 1, enunciado: "Halla los puntos críticos de f(x) = x³ − 12x.", check: { tipo: "lista", etiqueta: "x =", valores: [2, -2] },
      pistas: ["f′(x) = 0."], pasos: ["f′(x) = 3x² − 12 = 3(x − 2)(x + 2).", "Se anula en x = 2 y x = −2."], resultado: "x = 2 y x = −2" },
    { id: "e03", nivel: 1, enunciado: "Calcula el valor del máximo relativo de f(x) = x³ − 12x.", check: num("f(máx) =", 16),
      pistas: ["Los críticos son ±2; f′ pasa de + a − en uno de ellos."], pasos: ["f′ = 3(x − 2)(x + 2): + si x &lt; −2, − en (−2, 2), + si x &gt; 2.", "Máximo en x = −2: f(−2) = −8 + 24 = 16."], resultado: "16" },
    { id: "e04", nivel: 1, enunciado: "Halla la abscisa del punto de inflexión de f(x) = x³ − 3x².", check: num("x =", 1),
      pistas: ["f″(x) = 0."], pasos: ["f″(x) = 6x − 6 = 0 ⟹ x = 1.", "f″ cambia de − a +: es inflexión (f(1) = −2)."], resultado: "x = 1" },
    { id: "e05", nivel: 1, enunciado: "Halla las abscisas de los mínimos relativos de f(x) = x⁴ − 2x².", check: { tipo: "lista", etiqueta: "x =", valores: [1, -1] },
      pistas: ["f′(x) = 4x(x² − 1)."], pasos: ["f′ = 4x(x − 1)(x + 1): críticos −1, 0, 1.", "Signos de f′: − (x &lt; −1), + (−1, 0), − (0, 1), + (x &gt; 1). Mínimos en x = ±1; en x = 0 hay un máximo."], resultado: "x = 1 y x = −1" },
    { id: "e06", nivel: 1, enunciado: "Si f′(a) = 0 y f″(a) = −3, ¿qué hay en x = a?", check: opc("En x = a hay", ["Un máximo relativo", "Un mínimo relativo", "Un punto de inflexión", "No se puede decir"], 0),
      pistas: ["Signo de la segunda derivada."], pasos: ["f″(a) &lt; 0: la curva es ∩ con tangente horizontal."], resultado: "Máximo relativo" },
    { id: "e07", nivel: 1, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = 2x³ − 6x + 1 en [0, 2].", check: [num("Máximo =", 5), num("Mínimo =", -3)],
      pistas: ["Compara f en los extremos y en los puntos críticos interiores."], pasos: ["f′ = 6x² − 6 = 0 ⟹ x = ±1; solo x = 1 está en [0, 2].", "f(0) = 1, f(1) = −3, f(2) = 16 − 12 + 1 = 5.", "Máximo absoluto 5 (x = 2); mínimo absoluto −3 (x = 1)."], resultado: "máximo 5, mínimo −3" },
    { id: "e08", nivel: 1, enunciado: "Halla el punto c que da el teorema de Rolle para f(x) = x² − 6x + 8 en [2, 4].", check: num("c =", 3),
      pistas: ["f(2) = f(4) = 0."], pasos: ["f(2) = 4 − 12 + 8 = 0 y f(4) = 16 − 24 + 8 = 0.", "f′(c) = 2c − 6 = 0 ⟹ c = 3."], resultado: "c = 3" },
    { id: "e09", nivel: 1, enunciado: "Halla el punto c del teorema del valor medio para f(x) = x³ en [0, 2].", check: num("c =", 2 / Math.sqrt(3)),
      pistas: ["Pendiente media = (8 − 0)/(2 − 0)."], pasos: ["Pendiente media = 8/2 = 4.", "3c² = 4 ⟹ c = 2/√3 ≈ 1,155 (el valor negativo no está en el intervalo)."], resultado: "c = 2/√3 ≈ 1,155" },
    { id: "e10", nivel: 1, enunciado: "Calcula lím<sub>x→1</sub> (x² − 1)/ln x con L'Hôpital.", check: num("Límite =", 2),
      pistas: ["Es 0/0."], pasos: ["(x² − 1)′/(ln x)′ = 2x/(1/x) = 2x².", "En x = 1: 2."], resultado: "2" },
    { id: "e11", nivel: 1, enunciado: "Dos números positivos suman 30. ¿Cuánto valen si su producto es máximo y cuál es ese producto?", check: [num("Cada número =", 15), num("Producto máximo =", 225)],
      pistas: ["Si uno es x, el otro es 30 − x."], pasos: ["P(x) = x(30 − x) = 30x − x², x ∈ (0, 30).", "P′ = 30 − 2x = 0 ⟹ x = 15; P″ = −2 &lt; 0: máximo.", "Los dos números valen 15 y el producto es 225."], resultado: "15 y 15; 225" },
    { id: "e12", nivel: 1, enunciado: "De todos los rectángulos de perímetro 36 m, ¿qué área máxima se consigue?", check: num("Área máxima (m²) =", 81),
      pistas: ["Semiperímetro 18: lados x y 18 − x."], pasos: ["A(x) = x(18 − x); A′ = 18 − 2x = 0 ⟹ x = 9.", "A″ = −2 &lt; 0: máximo. Cuadrado de lado 9: A = 81 m²."], resultado: "81 m²" },
    { id: "e13", nivel: 1, enunciado: "Halla el mínimo de f(x) = x − ln x en (0, ∞): el punto x y el valor mínimo.", check: [num("x =", 1), num("Mínimo =", 1)],
      pistas: ["Dominio x &gt; 0."], pasos: ["f′ = 1 − 1/x = 0 ⟹ x = 1. f″ = 1/x² &gt; 0 ⟹ mínimo.", "f(1) = 1 − 0 = 1."], resultado: "x = 1, mínimo 1" },
    { id: "e14", nivel: 1, enunciado: "La función f(x) = eˣ, en todo ℝ, es", check: opc("f es", ["Convexa (∪)", "Cóncava (∩)", "Con una inflexión en x = 0", "Convexa en x &gt; 0 y cóncava en x &lt; 0"], 0),
      pistas: ["f″(x) = eˣ."], pasos: ["f″(x) = eˣ &gt; 0 para todo x: convexa siempre, sin inflexiones."], resultado: "Convexa" },
    // ---------------------------------------------------------------- ★★
    { id: "e15", nivel: 2, enunciado: "Halla los valores del máximo y del mínimo relativos de f(x) = x³ − 6x² + 9x + 2.", check: [num("Máximo relativo =", 6), num("Mínimo relativo =", 2)],
      pistas: ["f′ = 3(x − 1)(x − 3)."], pasos: ["Críticos x = 1 y x = 3; f′ es + / − / + ⟹ máximo en x = 1, mínimo en x = 3.", "f(1) = 1 − 6 + 9 + 2 = 6; f(3) = 27 − 54 + 27 + 2 = 2."], resultado: "máximo 6 (x = 1), mínimo 2 (x = 3)" },
    { id: "e16", nivel: 2, enunciado: "Para f(x) = x/(x² + 1), halla la abscisa y el valor del máximo relativo.", check: [num("x =", 1), num("Valor =", 0.5)],
      pistas: ["f′ = (1 − x²)/(x² + 1)²."], pasos: ["f′ = 0 ⟹ x = ±1. Signos: − (x &lt; −1), + (−1, 1), − (x &gt; 1).", "Máximo en x = 1: f(1) = 1/2 (y mínimo en x = −1: −1/2)."], resultado: "x = 1, valor 1/2" },
    { id: "e17", nivel: 2, enunciado: "Calcula el valor del máximo relativo de f(x) = x²e<sup>−x</sup>.", check: num("Máximo =", 4 * Math.exp(-2)),
      pistas: ["f′ = (2x − x²)e<sup>−x</sup> = x(2 − x)e<sup>−x</sup>."], pasos: ["f′ = 0 ⟹ x = 0 y x = 2. Signos: − (x &lt; 0), + (0, 2), − (x &gt; 2).", "Máximo en x = 2: f(2) = 4e<sup>−2</sup> ≈ 0,5413. (En x = 0, mínimo con f = 0.)"], resultado: "4e⁻² ≈ 0,5413" },
    { id: "e18", nivel: 2, enunciado: "Halla las abscisas de los puntos de inflexión de f(x) = x⁴ − 8x² + 3.", check: { tipo: "lista", etiqueta: "x =", valores: [2 / Math.sqrt(3), -2 / Math.sqrt(3)] },
      pistas: ["f″(x) = 12x² − 16."], pasos: ["f″ = 0 ⟹ x² = 4/3 ⟹ x = ±2/√3 ≈ ±1,155.", "f″ cambia de signo en ambos (es una parábola que corta al eje): son inflexiones."], resultado: "x = ±2/√3 ≈ ±1,155" },
    { id: "e19", nivel: 2, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = x³ − 3x² + 2 en [−1, 3].", check: [num("Máximo =", 2), num("Mínimo =", -2)],
      pistas: ["f′ = 3x(x − 2)."], pasos: ["Críticos x = 0 y x = 2, ambos en (−1, 3).", "f(−1) = −2, f(0) = 2, f(2) = −2, f(3) = 2.", "Máximo 2 (x = 0 y x = 3); mínimo −2 (x = −1 y x = 2)."], resultado: "máximo 2, mínimo −2" },
    { id: "e20", nivel: 2, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = ln x / x en [1, e²].", check: [num("Máximo =", 1 / Math.E), num("Mínimo =", 0)],
      pistas: ["f′ = (1 − ln x)/x²."], pasos: ["f′ = 0 ⟹ ln x = 1 ⟹ x = e ∈ [1, e²].", "f(1) = 0, f(e) = 1/e ≈ 0,368, f(e²) = 2/e² ≈ 0,271.", "Máximo 1/e (x = e); mínimo 0 (x = 1)."], resultado: "máximo 1/e, mínimo 0" },
    { id: "e21", nivel: 2, enunciado: "Halla a y b para que f(x) = x³ + ax + b tenga un mínimo relativo en el punto (2, −5).", check: [num("a =", -12), num("b =", 11)],
      pistas: ["f′(2) = 0 y f(2) = −5."], pasos: ["f′ = 3x² + a ⟹ 12 + a = 0 ⟹ a = −12.", "f(2) = 8 − 24 + b = −5 ⟹ b = 11.", "Comprobación: f″(2) = 12 &gt; 0, mínimo. ✓"], resultado: "a = −12, b = 11" },
    { id: "e22", nivel: 2, enunciado: "Halla a, b y c para que f(x) = ax² + bx + c pase por (0, 1) y tenga un mínimo en (1, 0).", check: [num("a =", 1), num("b =", -2), num("c =", 1)],
      pistas: ["Tres condiciones: f(0) = 1, f(1) = 0, f′(1) = 0."], pasos: ["f(0) = c = 1. f(1) = a + b + 1 = 0. f′(1) = 2a + b = 0.", "Restando: a = 1, y b = −2.", "f(x) = x² − 2x + 1 = (x − 1)²: mínimo en (1, 0). ✓"], resultado: "a = 1, b = −2, c = 1" },
    { id: "e23", nivel: 2, enunciado: "Un rectángulo tiene un lado sobre el eje X y los dos vértices superiores en la parábola y = 12 − x² (simétrico respecto al eje Y). Halla el valor x de su vértice (con x &gt; 0) que da el área máxima y esa área.", check: [num("x =", 2), num("Área máx =", 32)],
      pistas: ["Base 2x, altura 12 − x²."], pasos: ["A(x) = 2x(12 − x²) = 24x − 2x³, x ∈ (0, √12).", "A′ = 24 − 6x² = 0 ⟹ x = 2; A″ = −12x &lt; 0: máximo.", "A(2) = 2·2·8 = 32."], resultado: "x = 2, área 32" },
    { id: "e24", nivel: 2, enunciado: "Se quiere cercar una parcela rectangular de 900 m² con la menor cantidad de valla. Halla el lado del cuadrado óptimo y el perímetro mínimo.", check: [num("Lado (m) =", 30), num("Perímetro mín (m) =", 120)],
      pistas: ["P = 2x + 2·900/x."], pasos: ["P(x) = 2x + 1800/x, x &gt; 0. P′ = 2 − 1800/x² = 0 ⟹ x² = 900 ⟹ x = 30.", "P″ = 3600/x³ &gt; 0: mínimo. y = 900/30 = 30 (cuadrado). P = 120 m."], resultado: "lado 30 m, perímetro 120 m" },
    { id: "e25", nivel: 2, enunciado: "Una lata cilíndrica debe tener 330 cm³ (como una de refresco). Halla el radio (cm) y la superficie mínima (cm²) con ese volumen.", check: [num("Radio (cm) =", 3.7449), num("Superficie mín (cm²) =", 264.36)],
      pistas: ["S(r) = 2πr² + 660/r."], pasos: ["h = 330/(πr²) ⟹ S(r) = 2πr² + 660/r.", "S′ = 4πr − 660/r² = 0 ⟹ r³ = 165/π ⟹ r ≈ 3,745 cm (h = 2r ≈ 7,49 cm).", "S″ &gt; 0: mínimo. S ≈ 264,4 cm²."], resultado: "r ≈ 3,745 cm; S ≈ 264,4 cm²" },
    { id: "e26", nivel: 2, enunciado: "¿Cuál es la distancia mínima del origen a la recta y = 2x + 3 (usando derivadas)? Da también la abscisa del punto más cercano.", check: [num("Abscisa =", -1.2), num("Distancia =", 3 / Math.sqrt(5))],
      pistas: ["Minimiza d² = x² + (2x + 3)²."], pasos: ["d²(x) = 5x² + 12x + 9. (d²)′ = 10x + 12 = 0 ⟹ x = −6/5.", "d² = 5·36/25 − 72/5 + 9 = 9/5 ⟹ d = 3/√5 ≈ 1,342."], resultado: "x = −6/5, d = 3/√5 ≈ 1,342" },
    { id: "e27", nivel: 2, enunciado: "Halla a para que f(x) = x² + ax + 3 cumpla el teorema de Rolle en [1, 5], y el valor de c.", check: [num("a =", -6), num("c =", 3)],
      pistas: ["Impón f(1) = f(5)."], pasos: ["f(1) = 4 + a; f(5) = 28 + 5a ⟹ 4 + a = 28 + 5a ⟹ a = −6.", "f′(c) = 2c − 6 = 0 ⟹ c = 3 ∈ (1, 5)."], resultado: "a = −6, c = 3" },
    { id: "e28", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> (x − sen x)/x³.", check: num("Límite =", 1 / 6),
      pistas: ["Aplícalo dos veces."], pasos: ["0/0: (1 − cos x)/(3x²), otra vez 0/0.", "Segunda aplicación: sen x/(6x) → 1/6."], resultado: "1/6" },
    { id: "e29", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> (e<sup>2x</sup> − 1 − 2x)/x².", check: num("Límite =", 2),
      pistas: ["Dos aplicaciones de L'Hôpital."], pasos: ["(2e<sup>2x</sup> − 2)/(2x): sigue 0/0.", "(4e<sup>2x</sup>)/2 → 2."], resultado: "2" },
    { id: "e30", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> (1/x − 1/(eˣ − 1)).", check: num("Límite =", 0.5),
      pistas: ["Denominador común: ∞ − ∞ pasa a 0/0."], pasos: ["= (eˣ − 1 − x)/(x(eˣ − 1)): 0/0.", "L'Hôpital: (eˣ − 1)/(eˣ − 1 + xeˣ): 0/0 otra vez. Segunda: eˣ/(2eˣ + xeˣ) → 1/2."], resultado: "1/2" },
    // ---------------------------------------------------------------- ★★★
    { id: "e31", nivel: 3, enunciado: "Para f(x) = x²/(x − 1), halla los valores del máximo relativo y del mínimo relativo (¡compáralos!).", check: [num("Máximo relativo =", 0), num("Mínimo relativo =", 4)],
      pistas: ["f′ = x(x − 2)/(x − 1)²."], pasos: ["Dominio x ≠ 1. f′ = 0 ⟹ x = 0, x = 2.", "Signos: + (x &lt; 0), − (0, 1), − (1, 2), + (x &gt; 2). Máximo relativo en x = 0 con f = 0; mínimo relativo en x = 2 con f = 4.", "El máximo relativo (0) es menor que el mínimo relativo (4): no son absolutos."], resultado: "máximo relativo 0, mínimo relativo 4" },
    { id: "e32", nivel: 3, enunciado: "Halla la abscisa y el valor del mínimo relativo de f(x) = eˣ/x en x &gt; 0.", check: [num("x =", 1), num("Valor =", Math.E)],
      pistas: ["f′ = eˣ(x − 1)/x²."], pasos: ["f′ = 0 ⟹ x = 1. Signos: − en (0, 1), + en x &gt; 1.", "Mínimo en x = 1: f(1) = e ≈ 2,718."], resultado: "x = 1, valor e" },
    { id: "e33", nivel: 3, enunciado: "Halla las abscisas de los puntos de inflexión de f(x) = x²e<sup>−x</sup>.", check: { tipo: "lista", etiqueta: "x =", valores: [2 + Math.SQRT2, 2 - Math.SQRT2] },
      pistas: ["f″ = (x² − 4x + 2)e<sup>−x</sup>."], pasos: ["f′ = (2x − x²)e<sup>−x</sup>; f″ = (2 − 2x)e<sup>−x</sup> − (2x − x²)e<sup>−x</sup> = (x² − 4x + 2)e<sup>−x</sup>.", "x² − 4x + 2 = 0 ⟹ x = 2 ± √2 ≈ 3,414 y 0,586; la parábola cambia de signo en ambos."], resultado: "x = 2 ± √2" },
    { id: "e34", nivel: 3, enunciado: "Halla el mínimo absoluto de f(x) = x + 4/x en (0, ∞): la abscisa y el valor.", check: [num("x =", 2), num("Valor =", 4)],
      pistas: ["f → ∞ en los bordes del dominio."], pasos: ["f′ = 1 − 4/x² = 0 ⟹ x = 2. f″ = 8/x³ &gt; 0: mínimo.", "Como f → ∞ cuando x → 0⁺ y cuando x → ∞, es mínimo absoluto: f(2) = 4."], resultado: "x = 2, mínimo 4" },
    { id: "e35", nivel: 3, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = x + 2cos x en [0, π].", check: [num("Máximo =", Math.PI / 6 + Math.sqrt(3)), num("Mínimo =", 5 * Math.PI / 6 - Math.sqrt(3))],
      pistas: ["f′ = 1 − 2 sen x = 0 ⟹ sen x = 1/2."], pasos: ["En [0, π]: x = π/6 y x = 5π/6.", "f(0) = 2; f(π/6) = π/6 + √3 ≈ 2,2556; f(5π/6) = 5π/6 − √3 ≈ 0,8859; f(π) = π − 2 ≈ 1,1416.", "Máximo ≈ 2,2556 (x = π/6); mínimo ≈ 0,8859 (x = 5π/6)."], resultado: "máx π/6 + √3 ≈ 2,256; mín 5π/6 − √3 ≈ 0,886" },
    { id: "e36", nivel: 3, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = |x² − 4x| en [0, 5].", check: [num("Máximo =", 5), num("Mínimo =", 0)],
      pistas: ["Cuidado con x = 0 y x = 4, donde f no es derivable."], pasos: ["f(x) = x² − 4x si x ≤ 0 o x ≥ 4; f(x) = 4x − x² si 0 &lt; x &lt; 4.", "Candidatos: extremos 0 y 5; x = 4 (punto angular); x = 2 (f′ = 4 − 2x = 0).", "f(0) = 0, f(2) = 4, f(4) = 0, f(5) = 5. Máximo 5, mínimo 0."], resultado: "máximo 5, mínimo 0" },
    { id: "e37", nivel: 3, enunciado: "Halla a, b y c para que f(x) = x³ + ax² + bx + c tenga un máximo relativo en x = −1, un mínimo relativo en x = 3 y f(0) = 5.", check: [num("a =", -3), num("b =", -9), num("c =", 5)],
      pistas: ["f′(x) = 3(x + 1)(x − 3)."], pasos: ["f′(−1) = 3 − 2a + b = 0 y f′(3) = 27 + 6a + b = 0.", "Restando: 24 + 8a = 0 ⟹ a = −3, y b = −9. f(0) = c = 5.", "Comprobación: f″ = 6x − 6: f″(−1) = −12 &lt; 0 (máximo), f″(3) = 12 &gt; 0 (mínimo). ✓"], resultado: "a = −3, b = −9, c = 5" },
    { id: "e38", nivel: 3, enunciado: "Halla a y b para que f(x) = a·eˣ + b·x pase por (0, 1) y tenga un extremo en x = ln 2.", check: [num("a =", 1), num("b =", -2)],
      pistas: ["f′(x) = aeˣ + b."], pasos: ["f(0) = a = 1.", "f′(ln 2) = 2a + b = 0 ⟹ b = −2.", "f(x) = eˣ − 2x: f″ = eˣ &gt; 0, mínimo con f(ln 2) = 2 − 2 ln 2 ≈ 0,614."], resultado: "a = 1, b = −2" },
    { id: "e39", nivel: 3, enunciado: "Un triángulo rectángulo tiene hipotenusa 10. ¿Qué área máxima puede tener?", check: num("Área máxima =", 25),
      pistas: ["Catetos x y √(100 − x²); minimiza o maximiza A² = x²(100 − x²)/4."], pasos: ["A = x√(100 − x²)/2; A² = (100x² − x⁴)/4.", "(A²)′ = (200x − 4x³)/4 = 0 ⟹ x² = 50. Máximo (A² = 625).", "A = 25 (triángulo isósceles de catetos 5√2)."], resultado: "25" },
    { id: "e40", nivel: 3, enunciado: "Un cilindro está inscrito en una esfera de radio 3. Halla su altura h y su volumen máximo.", check: [num("Altura =", 2 * Math.sqrt(3)), num("Volumen máx =", 12 * Math.sqrt(3) * Math.PI)],
      pistas: ["r² = 9 − h²/4; V = πr²h."], pasos: ["V(h) = π(9h − h³/4), h ∈ (0, 6).", "V′ = π(9 − 3h²/4) = 0 ⟹ h² = 12 ⟹ h = 2√3 ≈ 3,464. V″ &lt; 0: máximo.", "r² = 9 − 3 = 6; V = π·6·2√3 = 12√3π ≈ 65,30."], resultado: "h = 2√3 ≈ 3,464; V = 12√3π ≈ 65,30" },
    { id: "e41", nivel: 3, enunciado: "Una persona está en una barca a 3 km de la orilla (recta) y quiere llegar a un punto situado a 6 km del pie de la perpendicular, a lo largo de la orilla. Rema a 3 km/h y anda a 5 km/h. ¿A qué distancia x del pie de la perpendicular debe desembarcar para tardar lo menos posible, y cuánto tarda?", check: [num("x (km) =", 2.25), num("Tiempo (h) =", 2)],
      pistas: ["T(x) = √(9 + x²)/3 + (6 − x)/5."], pasos: ["T′(x) = x/(3√(9 + x²)) − 1/5 = 0 ⟹ 5x = 3√(9 + x²) ⟹ 25x² = 81 + 9x² ⟹ x = 9/4.", "T(9/4) = 3,75/3 + 3,75/5 = 1,25 + 0,75 = 2 h. Se compara con los bordes: T(0) = 2,2 h y T(6) ≈ 2,236 h.", "Por tanto desembarca a 2,25 km y tarda 2 h."], resultado: "x = 2,25 km; 2 h" },
    { id: "e42", nivel: 3, enunciado: "Una empresa vende una cantidad q = 1000 − 10p con p el precio en euros; el coste total es C = 2000 + 20q. Halla el precio que maximiza el beneficio y ese beneficio.", check: [num("Precio (€) =", 60), num("Beneficio (€) =", 14000)],
      pistas: ["Beneficio = ingresos − coste = pq − C."], pasos: ["B(p) = p(1000 − 10p) − 2000 − 20(1000 − 10p) = −10p² + 1200p − 22000.", "B′ = −20p + 1200 = 0 ⟹ p = 60; B″ = −20 &lt; 0: máximo.", "B(60) = −36000 + 72000 − 22000 = 14000 €."], resultado: "p = 60 €; B = 14 000 €" },
    { id: "e43", nivel: 3, enunciado: "¿Cuántas soluciones reales tiene la ecuación x³ + 3x − 1 = 0?", check: opc("Número de raíces reales", ["Exactamente una", "Ninguna", "Exactamente dos", "Tres"], 0),
      pistas: ["Bolzano para la existencia; f′ para la unicidad."], pasos: ["f(0) = −1 y f(1) = 3: Bolzano ⟹ hay al menos una en (0, 1).", "f′ = 3x² + 3 &gt; 0 en todo ℝ: f es estrictamente creciente; como mucho una (Rolle)."], resultado: "Exactamente una" },
    { id: "e44", nivel: 3, enunciado: "Halla la abscisa y el valor del mínimo de f(x) = x² ln x en su dominio (x &gt; 0).", check: [num("x =", Math.exp(-0.5)), num("Mínimo =", -1 / (2 * Math.E))],
      pistas: ["f′ = x(2 ln x + 1)."], pasos: ["f′ = 2x ln x + x = x(2 ln x + 1) = 0 ⟹ ln x = −1/2 ⟹ x = e<sup>−1/2</sup> ≈ 0,6065.", "f′ es − a la izquierda y + a la derecha: mínimo.", "f = e<sup>−1</sup>·(−1/2) = −1/(2e) ≈ −0,1839."], resultado: "x = e^(−1/2); mínimo −1/(2e) ≈ −0,184" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Signos de f′ y de f″", ancha: true,
      tabla: { cab: ["Signo", "Qué dice sobre f"], filas: [
        ["f′ &gt; 0", "f creciente"],
        ["f′ &lt; 0", "f decreciente"],
        ["f′ pasa de + a −", "máximo relativo"],
        ["f′ pasa de − a +", "mínimo relativo"],
        ["f″ &gt; 0", "convexa ∪"],
        ["f″ &lt; 0", "cóncava ∩"],
        ["f″ cambia de signo", "punto de inflexión"]
      ] },
      nota: "f′(a) = 0 y f″(a) &gt; 0 ⟹ mínimo; f″(a) &lt; 0 ⟹ máximo; f″(a) = 0 no decide." },
    { titulo: "Extremos absolutos y parámetros",
      pasos: [
        "<b>Cerrado [a, b]</b>: comparar f en los puntos críticos interiores y en a y b.",
        "<b>No cerrado</b>: mirar también los límites en los bordes.",
        "<b>Pasa por (x₀, y₀)</b> ⟹ f(x₀) = y₀.",
        "<b>Extremo en x₀</b> ⟹ f′(x₀) = 0.",
        "<b>Inflexión en x₀</b> ⟹ f″(x₀) = 0.",
        "<b>Tangente de pendiente m</b> ⟹ f′(x₀) = m."
      ], nota: "Una ecuación por parámetro; comprueba el resultado." },
    { titulo: "Optimización: pasos",
      pasos: [
        "Dibuja e identifica la magnitud a optimizar.",
        "Función con una sola variable (usa la condición).",
        "Dominio.",
        "f′ = 0 y descarta lo que no esté en el dominio.",
        "Justifica: f″, signo de f′ o bordes.",
        "Responde con todas las magnitudes y unidades."
      ], nota: "Distancia mínima: minimiza el cuadrado." },
    { titulo: "Teoremas y L'Hôpital",
      items: [
        "<b>Rolle</b>: continua en [a, b], derivable en (a, b), f(a) = f(b) ⟹ ∃c, f′(c) = 0.",
        "<b>Valor medio</b>: ∃c, f′(c) = (f(b) − f(a))/(b − a).",
        "<b>Bolzano + f′ ≠ 0</b> ⟹ exactamente una raíz.",
        "<b>L'Hôpital</b>: 0/0 o ∞/∞, y debe existir lím f′/g′."
      ], nota: "Trampa: (x + sen x)/x en ∞." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "f′(a) = 0 ⟹ extremo", bien: "hace falta cambio de signo de f′", por: "x³ en x = 0." },
        { mal: "f″(a) = 0 ⟹ inflexión", bien: "f″ debe cambiar de signo", por: "x⁴ en x = 0." },
        { mal: "Olvidar los extremos del intervalo", bien: "comparar con f(a) y f(b)", por: "El máximo absoluto puede estar en el borde." },
        { mal: "Responder solo con x", bien: "dar el valor de la magnitud y unidades", por: "Piden área, volumen, beneficio…" },
        { mal: "Derivar sin una sola variable", bien: "usar la condición antes de derivar", por: "La función objetivo debe depender de una variable." },
        { mal: "L'Hôpital sin indeterminación", bien: "comprobar 0/0 o ∞/∞", por: "(x+1)/(x+2) en 0 vale 1/2, no 1." }
      ] }
  ];

  B.registrar("mates2", "t9", {
    resumen: resumen, secciones: B.parte.m2t9a.secciones, nuevas: B.parte.m2t9b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
