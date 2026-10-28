/* ============================================================
   Matemáticas II · ampliaciones · Tema 4: Vectores en el espacio
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr;

  var resumen = [
    "Un vector del espacio es u = (u₁, u₂, u₃); <b>AB = B − A</b> (final menos principio), punto medio (A + B)/2, módulo |u| = √(u₁² + u₂² + u₃²). El <b>unitario</b> es u/|u|; un vector de módulo k en esa dirección es k·u/|u|.",
    "<b>Producto escalar</b> (da un número): u·v = u₁v₁ + u₂v₂ + u₃v₃ = |u||v|cos α. Ángulo: cos α = u·v/(|u||v|). Perpendiculares ⟺ u·v = 0. Proyección de u sobre v: (u·v/|v|²)·v.",
    "<b>Producto vectorial</b> (da un vector): u × v = determinante simbólico con i, j, k. Es perpendicular a u y a v (regla de la mano derecha), v × u = −(u × v), y <b>|u × v| = área del paralelogramo</b> (la mitad, del triángulo). u × v = 0 ⟺ paralelos.",
    "<b>Producto mixto</b> (da un número): [u, v, w] = u·(v × w) = det. |[u, v, w]| = volumen del paralelepípedo; <b>un sexto</b>, del tetraedro. [u, v, w] = 0 ⟺ coplanarios ⟺ linealmente dependientes. Cuatro puntos coplanarios: [AB, AC, AD] = 0.",
    "<b>Base de ℝ³</b> = 3 vectores independientes (det ≠ 0); las coordenadas se hallan resolviendo un sistema (o con productos escalares si la base es ortogonal). Dos vectores dependientes = proporcionales; cuatro en ℝ³ siempre lo son.",
    "<b>Con parámetro</b>: traduce la condición (u·v = 0, |u × v| = A, [u, v, w] = 0…) a una ecuación en m, resuélvela y comprueba (cuadrados falsos, valor absoluto con dos casos)."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«u × v = v × u, igual que en el producto escalar». ¿Qué falla?",
          op: ["Nada, está bien", "El producto vectorial es anticonmutativo: v × u = −(u × v)", "El producto vectorial siempre vale 0", "Solo falla si u y v son perpendiculares"], ok: 1,
          porque: "Al cambiar el orden se invierte el sentido (regla de la mano derecha), luego el vector cambia de signo. Con u = i y v = j: i × j = k, pero j × i = −k." },
        { q: "«El área del triángulo ABC es |AB × AC|». ¿Qué falla?",
          op: ["Nada", "Eso es el área del paralelogramo; el triángulo es la mitad: ½|AB × AC|", "Hay que usar AB·AC", "Hay que dividir entre 3"], ok: 1,
          porque: "El módulo del producto vectorial es el área del paralelogramo de lados AB y AC, que está formado por dos triángulos iguales." },
        { q: "«El volumen del tetraedro de aristas u, v, w es |[u, v, w]|». ¿Qué falla?",
          op: ["Nada", "Es el volumen del paralelepípedo; el tetraedro es la sexta parte: |[u, v, w]|/6", "Hay que dividir entre 2", "Hay que elevar al cuadrado"], ok: 1,
          porque: "El paralelepípedo contiene 6 tetraedros iguales (la base se parte en 2 triángulos y la pirámide es 1/3 del prisma: ½·⅓ = ⅙)." },
        { q: "«u·v = (u₁v₁, u₂v₂, u₃v₃)». ¿Qué falla?",
          op: ["Nada", "El producto escalar es un número: u₁v₁ + u₂v₂ + u₃v₃, hay que sumar", "Debería dar un vector perpendicular", "Falta dividir entre |u||v|"], ok: 1,
          porque: "Escalar significa que el resultado es un escalar (un número). Multiplicar componente a componente y no sumar daría un vector, que no es el producto escalar." },
        { q: "«u·v = 0, luego u = 0 o v = 0, como con números». ¿Qué falla?",
          op: ["Nada", "Con vectores, u·v = 0 también ocurre si son perpendiculares: (1, 0, 0)·(0, 1, 0) = 0", "u·v = 0 implica α = 0°", "Solo falla en el plano"], ok: 1,
          porque: "Es la gran diferencia con los números: el producto escalar se anula cuando el coseno es 0, es decir, para vectores perpendiculares no nulos." },
        { q: "«Los vectores (1, 1, 0), (0, 1, 1) y (1, 2, 1) no son proporcionales dos a dos, así que son independientes». ¿Qué falla?",
          op: ["Nada", "Para tres vectores hay que mirar el determinante: aquí (1,2,1) = (1,1,0) + (0,1,1), son coplanarios", "Son independientes pero no forman base", "Hay que comprobar que son perpendiculares"], ok: 1,
          porque: "Tres vectores pueden ser dependientes sin que haya dos proporcionales: basta que uno sea combinación lineal de los otros (coplanarios). El criterio es det = 0." },
        { q: "«Los vectores (1, 0, 0), (0, 1, 0), (0, 0, 1) y (1, 1, 1) forman una base de ℝ³». ¿Qué falla?",
          op: ["Nada", "Una base de ℝ³ tiene exactamente tres vectores independientes; cuatro siempre son dependientes", "Falta un vector más", "El último no es unitario"], ok: 1,
          porque: "(1, 1, 1) = i + j + k es combinación de los otros tres. En ℝ³ la dimensión es 3: más de tres vectores son siempre dependientes." },
        { q: "«Las coordenadas de w = (3, 4, 5) en la base B = {(1,1,0), (0,1,1), (1,0,1)} son (3, 4, 5)». ¿Qué falla?",
          op: ["Nada", "(3, 4, 5) son las componentes en la base canónica; en B hay que resolver w = a·e₁ + b·e₂ + c·e₃, y sale (1, 3, 2)", "Las coordenadas son siempre las componentes", "B no es una base"], ok: 1,
          porque: "Las coordenadas dependen de la base. En B: 1·(1,1,0) + 3·(0,1,1) + 2·(1,0,1) = (3, 4, 5)." },
        { q: "Al resolver cos 60° = u·v/(|u||v|) con parámetro y elevar al cuadrado salen m = 0 y m = −4, y se contestan «las dos». ¿Qué falla?",
          op: ["Nada", "Al elevar al cuadrado aparece una solución falsa: hay que comprobar que u·v tenga el signo correcto (aquí m = −4 daría 120°)", "Siempre hay una sola solución", "Hay que quedarse con la menor"], ok: 1,
          porque: "Elevar al cuadrado pierde el signo: x² = y² admite x = ±y. Se sustituye cada valor en la ecuación original y se descarta el que no la cumple." },
        { q: "«|u × v| = |u||v|cos α». ¿Qué falla?",
          op: ["Nada", "Es con el seno: |u × v| = |u||v| sen α (el coseno es del producto escalar)", "Es |u × v| = |u| + |v|", "Falta un factor ½"], ok: 1,
          porque: "El área del paralelogramo es base × altura = |u|·(|v| sen α). Si u y v son paralelos, sen α = 0 y el área es 0, como debe." }
      ]
    },
    quiz1: {
      titulo: "Test de vectores en el espacio",
      preguntas: [
        { q: "El vector AB con A(1, 2, 3) y B(4, 0, 5) es", op: ["(5, 2, 8)", "(3, −2, 2)", "(−3, 2, −2)", "(3, 2, 2)"], ok: 1, porque: "B − A = (4 − 1, 0 − 2, 5 − 3) = (3, −2, 2)." },
        { q: "El módulo de (2, −2, 1) es", op: ["1", "3", "√5", "5"], ok: 1, porque: "√(4 + 4 + 1) = √9 = 3." },
        { q: "El producto escalar (1, 2, 3)·(2, 0, −1) vale", op: ["−1", "5", "(2, 0, −3)", "0"], ok: 0, porque: "2 + 0 − 3 = −1. El resultado es un número." },
        { q: "El resultado de u × v es", op: ["un número", "un vector perpendicular a u y a v", "un vector paralelo a u", "un ángulo"], ok: 1, porque: "El producto vectorial da un vector perpendicular al plano que forman u y v." },
        { q: "El área del triángulo de lados u y v es", op: ["|u × v|", "½|u × v|", "|u·v|", "⅙|[u, v, w]|"], ok: 1, porque: "El triángulo es la mitad del paralelogramo." },
        { q: "Si u × v = 0 (con u y v no nulos), los vectores", op: ["son perpendiculares", "son paralelos", "tienen el mismo módulo", "son unitarios"], ok: 1, porque: "|u × v| = |u||v| sen α = 0 ⟹ sen α = 0 ⟹ α = 0° o 180°." },
        { q: "El volumen del tetraedro de aristas u, v, w es", op: ["|[u, v, w]|", "|[u, v, w]|/2", "|[u, v, w]|/3", "|[u, v, w]|/6"], ok: 3, porque: "Un sexto del volumen del paralelepípedo." },
        { q: "Cuatro puntos A, B, C, D son coplanarios si", op: ["AB·AC·AD = 0", "[AB, AC, AD] = 0", "AB × AC = 0", "|AB| = |AC|"], ok: 1, porque: "El volumen del tetraedro ABCD es 0: los cuatro puntos están en un plano." },
        { q: "Tres vectores de ℝ³ forman base si", op: ["son unitarios", "su producto mixto es distinto de 0", "su producto mixto es 0", "son paralelos"], ok: 1, porque: "det ≠ 0 ⟺ independientes ⟺ rango 3." },
        { q: "Si u·v &lt; 0, el ángulo entre u y v es", op: ["agudo", "recto", "obtuso", "nulo"], ok: 2, porque: "cos α &lt; 0 ⟹ 90° &lt; α ≤ 180°." },
        { q: "El número máximo de vectores linealmente independientes en ℝ³ es", op: ["2", "3", "4", "infinito"], ok: 1, porque: "La dimensión de ℝ³ es 3." },
        { q: "El vector unitario en la dirección de (0, 3, 4) es", op: ["(0, 3, 4)", "(0, 3/5, 4/5)", "(0, 1/3, 1/4)", "(0, 4/5, 3/5)"], ok: 1, porque: "|u| = 5; se divide cada componente entre 5." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de vectores en el espacio",
      cartas: [
        { a: "Vector entre dos puntos", b: "AB = B − A (final menos principio). Punto medio: (A + B)/2." },
        { a: "Módulo de u", b: "|u| = √(u₁² + u₂² + u₃²). Unitario: u/|u|." },
        { a: "Producto escalar", b: "u·v = u₁v₁ + u₂v₂ + u₃v₃ = |u||v|cos α. Es un número." },
        { a: "Ángulo entre vectores", b: "cos α = u·v / (|u||v|)" },
        { a: "Perpendiculares", b: "u·v = 0" },
        { a: "Proyección de u sobre v", b: "Escalar: u·v/|v|. Vector: (u·v/|v|²)·v." },
        { a: "Producto vectorial", b: "Vector ⟂ a u y v, con regla de la mano derecha; v × u = −(u × v). Es un determinante con i, j, k." },
        { a: "|u × v|", b: "|u||v|sen α = área del paralelogramo. Triángulo: ½|u × v|." },
        { a: "Paralelos", b: "u × v = 0 (o componentes proporcionales)" },
        { a: "Producto mixto", b: "[u, v, w] = u·(v × w) = det de las tres filas. Es un número." },
        { a: "Volumen", b: "Paralelepípedo: |[u, v, w]|. Tetraedro: ⅙|[u, v, w]|." },
        { a: "Coplanarios / base", b: "[u, v, w] = 0 ⟺ coplanarios (dependientes). [u, v, w] ≠ 0 ⟺ base de ℝ³." }
      ]
    },
    empar: {
      titulo: "Condición y ecuación",
      consigna: "Une cada condición geométrica con la ecuación que la expresa.",
      pares: [
        ["u y v son perpendiculares", "u·v = 0"],
        ["u y v son paralelos", "u × v = 0"],
        ["Los tres vectores son coplanarios", "[u, v, w] = 0"],
        ["El área del paralelogramo vale A", "|u × v| = A"],
        ["El volumen del tetraedro vale V", "|[u, v, w]| = 6V"],
        ["El módulo de u vale k", "u·u = k²"],
        ["Forman base de ℝ³", "[u, v, w] ≠ 0"]
      ]
    },
    clas: {
      titulo: "¿Número o vector?",
      consigna: "Toca una operación y elige qué tipo de resultado da.",
      categorias: ["Un número", "Un vector"],
      items: [
        { t: "u·v", c: 0 }, { t: "u × v", c: 1 }, { t: "[u, v, w]", c: 0 }, { t: "|u|", c: 0 },
        { t: "AB = B − A", c: 1 }, { t: "El unitario u/|u|", c: 1 }, { t: "El área del paralelogramo", c: 0 },
        { t: "El volumen del tetraedro", c: 0 }, { t: "La proyección vectorial de u sobre v", c: 1 }, { t: "u + v", c: 1 }
      ]
    },
    orden: {
      titulo: "Resolver un problema con parámetro",
      consigna: "Ordena los pasos.",
      items: [
        { t: "Traducir la condición del enunciado a una ecuación (u·v = 0, |u × v| = A, [u, v, w] = 0…)" },
        { t: "Calcular la expresión en función de m (producto escalar, vectorial o determinante)" },
        { t: "Igualar y resolver la ecuación (factorizar; valor absoluto: dos casos)" },
        { t: "Comprobar cada solución (cuadrados falsos, signos)" },
        { t: "Escribir la conclusión con los valores de m que sirven" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function lista(et, v, ph) { return { tipo: "lista", etiqueta: et, valores: v, ph: ph || "valores separados por comas" }; }
  function opcion(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  function vec(a, b, c) { return [num("x =", a), num("y =", b), num("z =", c)]; }

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "v1", nivel: 1, enunciado: "Halla la distancia entre A(2, −1, 3) y B(5, 3, −9).", check: num("|AB| =", 13),
      pistas: ["Calcula AB = B − A y su módulo."], pasos: ["AB = (3, 4, −12).", "|AB| = √(9 + 16 + 144) = √169 = 13."], resultado: "13" },
    { id: "v2", nivel: 1, enunciado: "Calcula u·v para u = (2, −1, 3) y v = (1, 4, −2).", check: num("u·v =", -8),
      pistas: ["Multiplica componente a componente y suma."], pasos: ["2·1 + (−1)·4 + 3·(−2) = 2 − 4 − 6 = −8."], resultado: "−8" },
    { id: "v3", nivel: 1, enunciado: "Calcula el módulo de u = (2, 3, 6).", check: num("|u| =", 7),
      pistas: ["Raíz de la suma de cuadrados."], pasos: ["√(4 + 9 + 36) = √49 = 7."], resultado: "7" },
    { id: "v4", nivel: 1, enunciado: "¿Cuál de estas parejas de vectores es perpendicular?",
      check: opcion("Respuesta", ["(1, 2, 3) y (3, 0, −1)", "(1, 1, 1) y (1, 2, 3)", "(2, 0, 1) y (1, 1, 1)", "(1, −1, 2) y (2, 1, 1)"], 0),
      pistas: ["Calcula el producto escalar de cada pareja."], pasos: ["3 + 0 − 3 = 0 ✓ (primera pareja).", "Las otras dan 6, 3 y 3: no son perpendiculares."], resultado: "(1, 2, 3) y (3, 0, −1)" },
    { id: "v5", nivel: 1, enunciado: "Calcula u × v para u = (1, 2, 0) y v = (0, 1, 3). Escribe las tres componentes.", check: vec(6, -3, 1),
      pistas: ["Determinante con i, j, k; recuerda el signo menos de la componente j."],
      pasos: ["i: 2·3 − 0·1 = 6.", "j: −(1·3 − 0·0) = −3.", "k: 1·1 − 2·0 = 1.", "u × v = (6, −3, 1). Comprueba: u·(u × v) = 6 − 6 + 0 = 0 ✓."], resultado: "(6, −3, 1)" },
    { id: "v6", nivel: 1, enunciado: "Calcula el producto mixto de u = (1, 2, 0), v = (0, 1, 3) y w = (2, 0, 1).", check: num("[u, v, w] =", 13),
      pistas: ["Es el determinante de las tres filas."], pasos: ["|1 2 0 ; 0 1 3 ; 2 0 1| = 1·(1 − 0) − 2·(0 − 6) + 0 = 1 + 12 = 13."], resultado: "13" },
    { id: "v7", nivel: 1, enunciado: "Halla el área del paralelogramo de lados u = (1, 1, 0) y v = (0, 1, 1) (decimal).", check: num("Área =", Math.sqrt(3), { ph: "1,732" }),
      pistas: ["Área = |u × v|."], pasos: ["u × v = (1·1 − 0·1, −(1·1 − 0·0), 1·1 − 1·0) = (1, −1, 1).", "|u × v| = √3 ≈ 1,732."], resultado: "√3" },
    { id: "v8", nivel: 1, enunciado: "Para tres vectores se sabe que [u, v, w] = −18. Calcula el volumen del tetraedro que forman.", check: num("Volumen =", 3),
      pistas: ["Un sexto del valor absoluto."], pasos: ["|−18|/6 = 3."], resultado: "3" },
    { id: "v9", nivel: 1, enunciado: "Halla el punto medio del segmento de extremos A(1, −3, 4) y B(5, 1, −2).", check: vec(3, -1, 1),
      pistas: ["Media de cada coordenada."], pasos: ["((1 + 5)/2, (−3 + 1)/2, (4 − 2)/2) = (3, −1, 1)."], resultado: "(3, −1, 1)" },
    { id: "v10", nivel: 1, enunciado: "Halla el vector unitario de la dirección de u = (3, 0, 4). Escribe sus tres componentes separadas por comas.", check: lista("û =", [0, 0.6, 0.8], "tres valores"),
      pistas: ["|u| = 5."], pasos: ["|u| = √(9 + 16) = 5.", "û = (3/5, 0, 4/5) = (0,6; 0; 0,8)."], resultado: "(0,6; 0; 0,8)" },
    { id: "v11", nivel: 1, enunciado: "Los vectores (1, −2, 3) y (−2, 4, −6) ¿son linealmente dependientes?",
      check: opcion("Respuesta", ["Sí: el segundo es −2 veces el primero", "No, tienen distinto módulo", "No, son perpendiculares", "No se puede saber"], 0),
      pistas: ["Mira si son proporcionales."], pasos: ["(−2, 4, −6) = −2·(1, −2, 3): proporcionales ⟹ dependientes."], resultado: "Sí" },
    { id: "v12", nivel: 1, enunciado: "¿Son coplanarios u = (1, 1, 0), v = (0, 1, 1) y w = (1, 2, 1)?",
      check: opcion("Respuesta", ["Sí: w = u + v", "No: el determinante es 2", "No: u y v son perpendiculares", "Sí: los tres son unitarios"], 0),
      pistas: ["Suma u y v."], pasos: ["u + v = (1, 2, 1) = w.", "Una combinación lineal ⟹ [u, v, w] = 0 ⟹ coplanarios."], resultado: "Sí" },
    { id: "v13", nivel: 1, enunciado: "Si u × v = 0 con u y v no nulos, ¿qué se puede asegurar?",
      check: opcion("Respuesta", ["u y v son paralelos", "u y v son perpendiculares", "u·v = 0", "|u| = |v|"], 0),
      pistas: ["|u × v| = |u||v|sen α."], pasos: ["sen α = 0 ⟹ α = 0° o 180° ⟹ paralelos."], resultado: "Paralelos" },
    { id: "v14", nivel: 1, enunciado: "Calcula el ángulo (en grados) entre u = (1, 1, 0) y v = (1, 0, 0).", check: num("α =", 45, { unidad: "°" }),
      pistas: ["cos α = u·v/(|u||v|)."], pasos: ["u·v = 1, |u| = √2, |v| = 1.", "cos α = 1/√2 ⟹ α = 45°."], resultado: "45°" },
    // ---------------------------------------------------------------- ★★
    { id: "v15", nivel: 2, enunciado: "Calcula el ángulo (en grados) entre u = (2, −1, 2) y v = (1, 2, −2).", check: num("α =", 116.3878, { unidad: "°" }),
      pistas: ["Producto escalar y módulos."], pasos: ["u·v = 2 − 2 − 4 = −4; |u| = |v| = 3.", "cos α = −4/9 ⟹ α ≈ 116,39°."], resultado: "116,39°" },
    { id: "v16", nivel: 2, enunciado: "(EvAU) Halla m para que u = (m, 2, −1) y v = (3, m, 4) sean perpendiculares.", check: num("m =", 0.8),
      pistas: ["u·v = 0."], pasos: ["3m + 2m − 4 = 0 ⟹ 5m = 4 ⟹ m = 4/5 = 0,8."], resultado: "4/5" },
    { id: "v17", nivel: 2, enunciado: "Halla los valores de m para que u = (m, 2, 1) y v = (m, −3, 2) sean perpendiculares (de menor a mayor).", check: lista("m =", [-2, 2], "dos valores"),
      pistas: ["u·v = m² − 6 + 2."], pasos: ["u·v = m² − 6 + 2 = m² − 4 = 0.", "m = −2 o m = 2."], resultado: "m = −2, m = 2" },
    { id: "v18", nivel: 2, enunciado: "Halla la proyección vectorial de u = (3, 4, 0) sobre v = (1, 2, 2) (en decimales).", check: [num("x =", 11 / 9), num("y =", 22 / 9), num("z =", 22 / 9)],
      pistas: ["((u·v)/|v|²)·v."], pasos: ["u·v = 11, |v|² = 9.", "(11/9)·(1, 2, 2) = (11/9, 22/9, 22/9) ≈ (1,222; 2,444; 2,444)."], resultado: "(11/9, 22/9, 22/9)" },
    { id: "v19", nivel: 2, enunciado: "Halla el vector unitario perpendicular a u = (1, 2, −1) y v = (−1, 1, 2) cuya primera componente sea positiva (en decimales).", check: [num("x =", 5 / Math.sqrt(35)), num("y =", -1 / Math.sqrt(35)), num("z =", 3 / Math.sqrt(35))],
      pistas: ["u × v y divide por su módulo."], pasos: ["u × v = (2·2 − (−1)·1, −(1·2 − (−1)(−1)), 1·1 − 2·(−1)) = (5, −1, 3).", "|u × v| = √35.", "(5, −1, 3)/√35 ≈ (0,845; −0,169; 0,507)."], resultado: "(5, −1, 3)/√35" },
    { id: "v20", nivel: 2, enunciado: "Halla el área del triángulo de vértices A(1, 0, 1), B(2, 2, 0) y C(0, 1, 3) (decimal).", check: num("Área =", Math.sqrt(35) / 2, { ph: "2,958" }),
      pistas: ["½|AB × AC|."], pasos: ["AB = (1, 2, −1), AC = (−1, 1, 2).", "AB × AC = (5, −1, 3), módulo √35.", "Área = √35/2 ≈ 2,958."], resultado: "√35/2" },
    { id: "v21", nivel: 2, enunciado: "Tres vértices consecutivos de un paralelogramo ABCD son A(1, 0, 2), B(3, 1, 1) y C(4, 3, 0). Halla D.", check: vec(2, 2, 1),
      pistas: ["D = A + C − B."], pasos: ["D = (1 + 4 − 3, 0 + 3 − 1, 2 + 0 − 1) = (2, 2, 1)."], resultado: "(2, 2, 1)" },
    { id: "v22", nivel: 2, enunciado: "Halla el volumen del tetraedro de vértices A(0, 0, 0), B(1, 2, 0), C(0, 1, 3) y D(2, 1, 1) (decimal).", check: num("Volumen =", 5 / 3, { ph: "1,667" }),
      pistas: ["⅙|[AB, AC, AD]|."], pasos: ["[AB, AC, AD] = |1 2 0 ; 0 1 3 ; 2 1 1| = 1·(1 − 3) − 2·(0 − 6) = −2 + 12 = 10.", "V = 10/6 = 5/3 ≈ 1,667."], resultado: "5/3" },
    { id: "v23", nivel: 2, enunciado: "(EvAU) Halla m para que A(1, 1, 1), B(2, 3, 4), C(0, 1, 2) y D(3, 5, m) sean coplanarios.", check: num("m =", 7),
      pistas: ["[AB, AC, AD] = 0."], pasos: ["AB = (1, 2, 3), AC = (−1, 0, 1), AD = (2, 4, m − 1).", "Determinante: 2m − 14 = 0 ⟹ m = 7."], resultado: "7" },
    { id: "v24", nivel: 2, enunciado: "Escribe w = (3, −2, −1) como a·u + b·v con u = (1, 0, 1) y v = (0, 1, 2). Da a y b.", check: [num("a =", 3), num("b =", -2)],
      pistas: ["w = (a, b, a + 2b)."], pasos: ["a = 3 y b = −2.", "Tercera componente: 3 + 2(−2) = −1 ✓."], resultado: "a = 3, b = −2" },
    { id: "v25", nivel: 2, enunciado: "Halla los valores de m para los que u = (1, 1, m), v = (1, m, 1) y t = (m, 1, 1) son linealmente dependientes (de menor a mayor).", check: lista("m =", [-2, 1], "dos valores"),
      pistas: ["det = −(m − 1)²(m + 2)."], pasos: ["det = 1·(m − 1) − 1·(1 − m) + m·(1 − m²) = 3m − 2 − m³ = −(m − 1)²(m + 2).", "Se anula en m = 1 y m = −2."], resultado: "m = −2, m = 1" },
    { id: "v26", nivel: 2, enunciado: "¿Para qué valor de m <b>no</b> forman base de ℝ³ los vectores (1, m, 0), (0, 1, m) y (m, 0, 1)?", check: num("m =", -1),
      pistas: ["Calcula el determinante: sale 1 + m³."], pasos: ["det = 1 + m³ = 0 ⟹ m = −1 (única raíz real)."], resultado: "−1" },
    { id: "v27", nivel: 2, enunciado: "Halla las coordenadas de w = (5, 6, 7) en la base B = {(1, 1, 0), (0, 1, 1), (1, 0, 1)}.", check: [num("a =", 2), num("b =", 4), num("c =", 3)],
      pistas: ["a + c = 5, a + b = 6, b + c = 7."], pasos: ["Suma: 2(a + b + c) = 18 ⟹ a + b + c = 9.", "b = 9 − 5 = 4; c = 9 − 6 = 3; a = 9 − 7 = 2.", "Comprobación: 2(1,1,0) + 4(0,1,1) + 3(1,0,1) = (5, 6, 7) ✓."], resultado: "(2, 4, 3)" },
    { id: "v28", nivel: 2, enunciado: "(EvAU) Sean u = (1, m, 0) y v = (0, 1, 1). Halla m &gt; 0 para que el área del paralelogramo que forman sea √11.", check: num("m =", 3),
      pistas: ["u × v = (m, −1, 1)."], pasos: ["u × v = (m·1 − 0·1, −(1·1 − 0·0), 1·1 − m·0) = (m, −1, 1).", "|u × v|² = m² + 2 = 11 ⟹ m² = 9 ⟹ m = 3 (m &gt; 0)."], resultado: "3" },
    { id: "v29", nivel: 2, enunciado: "Los vectores u = (1, 0, 1), v = (0, 1, 1) y w = (1, 1, m) son aristas de un tetraedro de volumen 1/2. Halla los valores de m (de menor a mayor).", check: lista("m =", [-1, 5], "dos valores"),
      pistas: ["[u, v, w] = m − 2; volumen = |m − 2|/6."], pasos: ["[u, v, w] = 1·(m − 1) − 0 + 1·(0 − 1) = m − 2.", "|m − 2|/6 = 1/2 ⟹ |m − 2| = 3 ⟹ m = 5 o m = −1."], resultado: "m = −1, m = 5" },
    { id: "v30", nivel: 2, enunciado: "(EvAU) Halla m &gt; 0 para que u = (1, 0, 1) y v = (m, 1, 0) formen un ángulo de 60°.", check: num("m =", 1),
      pistas: ["Eleva al cuadrado y comprueba el signo."], pasos: ["u·v = m, |u| = √2, |v| = √(m² + 1).", "m/(√2·√(m² + 1)) = 1/2 ⟹ 2m = √2·√(m² + 1) ⟹ 4m² = 2m² + 2 ⟹ m² = 1.", "m = ±1; con m &gt; 0 (cos positivo): m = 1."], resultado: "1" },
    { id: "v31", nivel: 2, enunciado: "Si |u| = 2, |v| = 3 y el ángulo que forman es 30°, calcula |u × v| y u·v.", check: [num("|u × v| =", 3), num("u·v =", 3 * Math.sqrt(3), { ph: "5,196" })],
      pistas: ["|u × v| = |u||v|sen α; u·v = |u||v|cos α."], pasos: ["|u × v| = 2·3·sen 30° = 3.", "u·v = 2·3·cos 30° = 3√3 ≈ 5,196."], resultado: "3 y 3√3" },
    { id: "v32", nivel: 2, enunciado: "Halla la altura del paralelogramo de lados u = (2, 1, 2) y v = (0, 3, 4) sobre la base u (decimal).", check: num("Altura =", Math.sqrt(104) / 3, { ph: "3,399" }),
      pistas: ["Altura = área / base."], pasos: ["u × v = (1·4 − 2·3, −(2·4 − 2·0), 2·3 − 1·0) = (−2, −8, 6).", "Área = √104 ≈ 10,198; base |u| = 3.", "Altura = √104/3 ≈ 3,399."], resultado: "√104/3" },
    // ---------------------------------------------------------------- ★★★
    { id: "v33", nivel: 3, enunciado: "Para el tetraedro A(0, 0, 0), B(1, 2, 0), C(0, 1, 3), D(2, 1, 1) del ejercicio v22 (V = 5/3), halla la altura desde D sobre la cara ABC (decimal).", check: num("h =", 10 / Math.sqrt(46), { ph: "1,474" }),
      pistas: ["V = ⅓·Área(ABC)·h."], pasos: ["AB × AC = (2·3 − 0·1, −(1·3 − 0·0), 1·1 − 2·0) = (6, −3, 1), de módulo √46.", "Área(ABC) = √46/2.", "h = 3V/Área = 5/(√46/2) = 10/√46 ≈ 1,474."], resultado: "10/√46" },
    { id: "v34", nivel: 3, enunciado: "Demuestra la identidad de Lagrange: |u × v|² = |u|²|v|² − (u·v)².",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Usa |u × v| = |u||v|sen α", p: 0.5 }, { t: "Eleva al cuadrado: |u × v|² = |u|²|v|² sen²α", p: 0.5 },
        { t: "Usa sen²α = 1 − cos²α", p: 0.5 }, { t: "Usa u·v = |u||v|cos α para llegar a |u|²|v|² − (u·v)²", p: 0.5 }] },
      pasos: ["|u × v|² = |u|²|v|² sen²α = |u|²|v|²(1 − cos²α).", "= |u|²|v|² − (|u||v|cos α)² = |u|²|v|² − (u·v)². ∎"], resultado: "|u × v|² = |u|²|v|² − (u·v)²" },
    { id: "v35", nivel: 3, enunciado: "Prueba que si u·v = 0 y u × v = 0, entonces u = 0 o v = 0.",
      check: { tipo: "rubrica", etiqueta: "Tu razonamiento", filas: 5, items: [
        { t: "Supone u y v no nulos", p: 0.5 }, { t: "u·v = 0 ⟹ cos α = 0 (α = 90°)", p: 0.5 },
        { t: "u × v = 0 ⟹ sen α = 0", p: 0.5 }, { t: "Contradicción: sen² + cos² = 1 no puede dar 0, luego alguno es nulo", p: 0.5 }] },
      pasos: ["Si ambos fueran no nulos, u·v = |u||v|cos α = 0 daría cos α = 0.", "u × v = 0 daría |u||v|sen α = 0, es decir, sen α = 0.", "Pero sen²α + cos²α = 1: imposible. Luego u = 0 o v = 0. ∎"], resultado: "u = 0 o v = 0" },
    { id: "v36", nivel: 3, enunciado: "Los puntos O(0, 0, 0), A(1, 0, 0), B(0, 2, 0) y C(0, 0, m) forman un tetraedro de volumen 2. Halla m (de menor a mayor).", check: lista("m =", [-6, 6], "dos valores"),
      pistas: ["[OA, OB, OC] = 2m."], pasos: ["[OA, OB, OC] = |1 0 0 ; 0 2 0 ; 0 0 m| = 2m.", "V = |2m|/6 = 2 ⟹ |m| = 6 ⟹ m = ±6."], resultado: "m = −6, m = 6" },
    { id: "v37", nivel: 3, enunciado: "(EvAU) El triángulo de vértices O(0, 0, 0), A(1, 1, 0) y B(0, m, 1) tiene área 3/2. Halla m (de menor a mayor, en decimales).", check: lista("m =", [-Math.sqrt(7), Math.sqrt(7)], "dos valores"),
      pistas: ["OA × OB = (1, −1, m)."], pasos: ["OA × OB = (1·1 − 0·m, −(1·1 − 0·0), 1·m − 1·0) = (1, −1, m).", "Área = ½·√(2 + m²) = 3/2 ⟹ 2 + m² = 9 ⟹ m² = 7.", "m = ±√7 ≈ ±2,646."], resultado: "m = ±√7" },
    { id: "v38", nivel: 3, enunciado: "Halla un vector w de módulo √3 perpendicular a u = (1, 1, 0) y a v = (0, 1, 1), con primera componente positiva.", check: vec(1, -1, 1),
      pistas: ["Empieza por u × v."], pasos: ["u × v = (1, −1, 1), de módulo √3: ya tiene el módulo pedido.", "Primera componente positiva: w = (1, −1, 1)."], resultado: "(1, −1, 1)" },
    { id: "v39", nivel: 3, enunciado: "Con la base ortogonal e₁ = (1, 2, 2), e₂ = (2, 1, −2), e₃ = (2, −2, 1), halla las coordenadas de w = (6, 3, 0) (decimales).", check: [num("c₁ =", 4 / 3), num("c₂ =", 5 / 3), num("c₃ =", 2 / 3)],
      pistas: ["c<sub>i</sub> = w·e<sub>i</sub>/9."], pasos: ["w·e₁ = 6 + 6 = 12; w·e₂ = 12 + 3 = 15; w·e₃ = 12 − 6 = 6.", "c₁ = 12/9 = 4/3; c₂ = 15/9 = 5/3; c₃ = 6/9 = 2/3.", "Comprobación: (4/3)(1,2,2) + (5/3)(2,1,−2) + (2/3)(2,−2,1) = (6, 3, 0) ✓."], resultado: "(4/3, 5/3, 2/3)" },
    { id: "v40", nivel: 3, enunciado: "Si |u| = 2, |v| = 3 y u·v = −3, calcula |u + v| y |u − v| (decimales).", check: [num("|u + v| =", Math.sqrt(7)), num("|u − v| =", Math.sqrt(19))],
      pistas: ["|u ± v|² = |u|² ± 2u·v + |v|²."], pasos: ["|u + v|² = 4 − 6 + 9 = 7 ⟹ √7 ≈ 2,646.", "|u − v|² = 4 + 6 + 9 = 19 ⟹ √19 ≈ 4,359."], resultado: "√7 y √19" },
    { id: "v41", nivel: 3, enunciado: "Halla los vectores unitarios de la forma (x, x, z) perpendiculares a (1, 0, 1). Da los dos valores de x (de menor a mayor, en decimales).", check: lista("x =", [-1 / Math.sqrt(3), 1 / Math.sqrt(3)], "dos valores"),
      pistas: ["Perpendicular: x + z = 0. Unitario: 2x² + z² = 1."], pasos: ["(x, x, z)·(1, 0, 1) = x + z = 0 ⟹ z = −x.", "Módulo 1: x² + x² + x² = 1 ⟹ x² = 1/3.", "x = ±1/√3 ≈ ±0,577; los vectores son ±(1, 1, −1)/√3."], resultado: "x = ±1/√3" },
    { id: "v42", nivel: 3, enunciado: "Halla m para que u = (1, 2, m), v = (m, 1, 2) y w = (2, m, 1) sean coplanarios (solo hay un valor real).", check: num("m =", -3),
      pistas: ["det = m³ − 6m + 9. Prueba m = −3."], pasos: ["det = 1·(1 − 2m) − 2·(m − 4) + m·(m² − 2) = m³ − 6m + 9.", "Ruffini con −3: m³ − 6m + 9 = (m + 3)(m² − 3m + 3).", "m² − 3m + 3 tiene discriminante 9 − 12 &lt; 0: la única raíz real es m = −3."], resultado: "−3" },
    { id: "v43", nivel: 3, enunciado: "Demuestra que si u es perpendicular a v y a w, entonces u es perpendicular a cualquier combinación αv + βw.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 4, items: [
        { t: "Parte de u·v = 0 y u·w = 0", p: 0.5 }, { t: "Calcula u·(αv + βw)", p: 0.5 },
        { t: "Usa la linealidad: α(u·v) + β(u·w)", p: 0.5 }, { t: "Concluye que vale 0", p: 0.5 }] },
      pasos: ["u·(αv + βw) = α(u·v) + β(u·w).", "= α·0 + β·0 = 0. ∎ (Por eso u × v es perpendicular a todo el plano de u y v.)"], resultado: "u·(αv + βw) = 0" },
    { id: "v44", nivel: 3, enunciado: "Se sabe que |u| = 1, |v| = 2 y que forman 60°. Calcula (2u − v)·(u + v).", check: num("Valor =", -1),
      pistas: ["Desarrolla y usa u·v = |u||v|cos 60° = 1."], pasos: ["(2u − v)·(u + v) = 2|u|² + 2u·v − v·u − |v|² = 2|u|² + u·v − |v|².", "u·v = 1·2·½ = 1.", "= 2 + 1 − 4 = −1."], resultado: "−1" },
    { id: "v45", nivel: 3, enunciado: "El paralelepípedo de aristas (1, m, 0), (0, 1, m) y (m, 0, 1) tiene volumen 9. Halla los valores de m (de menor a mayor, en decimales).", check: lista("m =", [-Math.cbrt(10), 2], "dos valores"),
      pistas: ["Volumen = |1 + m³|."], pasos: ["[u, v, w] = 1 + m³; el volumen es |1 + m³| = 9.", "1 + m³ = 9 ⟹ m³ = 8 ⟹ m = 2.", "1 + m³ = −9 ⟹ m³ = −10 ⟹ m = −∛10 ≈ −2,154."], resultado: "m = −∛10, m = 2" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Los tres productos",
      tabla: { cab: ["Producto", "Fórmula", "Resultado", "Sirve para"], filas: [
        ["Escalar u·v", "u₁v₁ + u₂v₂ + u₃v₃", "número", "ángulo, perpendicularidad, proyección"],
        ["Vectorial u × v", "determinante con i, j, k", "vector ⟂ a u y v", "área, vector normal, paralelismo"],
        ["Mixto [u, v, w]", "u·(v × w) = det", "número", "volumen, coplanaridad, bases"]
      ] },
      nota: "Escalar = número · Vectorial = vector · Mixto = número (determinante)." },
    { titulo: "Áreas y volúmenes", ancha: true,
      tabla: { cab: ["Figura", "Fórmula", "Vale 0 si…"], filas: [
        ["Paralelogramo (u, v)", "|u × v|", "u ∥ v"], ["Triángulo ABC", "½|AB × AC|", "A, B, C alineados"],
        ["Paralelepípedo (u, v, w)", "|[u, v, w]|", "u, v, w coplanarios"], ["Tetraedro", "⅙|[AB, AC, AD]|", "A, B, C, D coplanarios"],
        ["Pirámide de base paralelogramo", "⅓|[u, v, w]|", "—"]
      ] },
      nota: "Altura del tetraedro sobre la cara ABC: h = 3V/Área(ABC)." },
    { titulo: "Producto vectorial: reglas",
      items: [
        { label: "Dirección y sentido", formula: "⟂ a u y v · mano derecha de u hacia v" },
        { label: "Módulo", formula: "|u × v| = |u||v|sen α" },
        { label: "Anticonmutativa", formula: "v × u = −(u × v)" },
        { label: "Paralelos", formula: "u × v = 0" },
        { label: "Lagrange", formula: "|u × v|² = |u|²|v|² − (u·v)²" },
        { label: "Comprobación", formula: "(u × v)·u = 0 y (u × v)·v = 0" }
      ] },
    { titulo: "Dependencia y bases", ancha: true,
      tabla: { cab: ["Vectores en ℝ³", "Dependientes si…"], filas: [
        ["2", "son proporcionales (u × v = 0)"], ["3", "[u, v, w] = 0 (coplanarios)"], ["4 o más", "siempre"],
        ["Base de ℝ³", "3 vectores con [u, v, w] ≠ 0"], ["Coordenadas", "w = a·e₁ + b·e₂ + c·e₃ (sistema); si la base es ortogonal, c<sub>i</sub> = w·e<sub>i</sub>/|e<sub>i</sub>|²"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "u × v = v × u", bien: "v × u = −(u × v)", por: "Anticonmutativo." },
        { mal: "Área del triángulo = |u × v|", bien: "½|u × v|", por: "El paralelogramo son dos triángulos." },
        { mal: "Volumen del tetraedro = |[u, v, w]|", bien: "⅙|[u, v, w]|", por: "Eso es el paralelepípedo." },
        { mal: "u·v es un vector", bien: "u·v es un número", por: "Se suman los productos." },
        { mal: "u·v = 0 ⟹ u = 0 o v = 0", bien: "o son perpendiculares", por: "cos 90° = 0." },
        { mal: "Elevar al cuadrado y quedarse con todo", bien: "Comprobar cada solución", por: "Aparecen soluciones falsas." }
      ] }
  ];

  B.registrar("mates2", "t4", {
    resumen: resumen, secciones: B.parte.m2t4a.secciones, nuevas: B.parte.m2t4b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
