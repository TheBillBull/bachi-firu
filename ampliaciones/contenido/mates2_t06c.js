/* ============================================================
   Matemáticas II · ampliaciones · Tema 6: Problemas métricos
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Ángulos</b> (siempre agudos, con valor absoluto): entre rectas, cos α = |u·v|/(|u||v|) con sus directores; entre planos, igual con las normales; entre recta y plano, <b>seno</b>: sen α = |v·n|/(|v||n|). Una recta dada como corte de dos planos tiene director n₁ × n₂. Perpendiculares ⟺ producto escalar 0; paralelos ⟺ proporcionales.",
    "<b>Punto–plano</b>: d = |A·p₁ + B·p₂ + C·p₃ + D| / √(A² + B² + C²) (plano en forma general). <b>Punto–recta</b>: d = |QP × v| / |v|. <b>Entre rectas que se cruzan</b>: d = |[Q₁Q₂, u, v]| / |u × v| (si el mixto es 0, se cortan; si u ∥ v, son paralelas y se usa punto–recta).",
    "<b>Elementos paralelos</b>: la distancia es la de un punto de uno al otro (plano–plano con los mismos A, B, C: |D − D′|/|n|; recta–plano; recta–recta).",
    "<b>Proyección y simétrico</b>: sobre un plano, P′ = P − (valor/|n|²)·n; sobre una recta, plano por P perpendicular a r y cortarlo con r; el simétrico es siempre P″ = 2P′ − P. Para la proyección de una recta sobre un plano: corta π con el plano que contiene a r y es perpendicular a π (normal v × n).",
    "<b>Perpendicular común</b> de r y s (que se cruzan): con puntos genéricos X(t), Y(s) e imponiendo XY·u = 0 y XY·v = 0 salen los pies A y B; o como intersección de los planos que contienen a r y a s con dirección u × v. |AB| = d(r, s).",
    "<b>Áreas y volúmenes</b>: Área(ABC) = ½|AB × AC|; V(ABCD) = ⅙|[AB, AC, AD]|; altura h = 3V/Área. <b>Lugares</b>: plano mediador (normal AB, por el punto medio), planos a distancia d (D ± d·|n|) y bisectores (π₁/|n₁| = ±π₂/|n₂|)."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«El ángulo entre una recta de director v y un plano de normal n es arccos(|v·n|/(|v||n|))». ¿Qué falla?",
          op: ["Nada, está bien", "Con recta y plano se usa el seno: arcsen(|v·n|/(|v||n|))", "Hay que quitar el valor absoluto", "Hay que usar arctan"], ok: 1,
          porque: "El coseno de esa expresión es el ángulo con la <b>normal</b>; el ángulo con el plano es su complementario y sale con el seno. Por ejemplo, v = (1, 0, 0) y π: x = 0 son perpendiculares (90°): sen α = 1, mientras que arccos(1) daría 0°." },
        { q: "«Para el ángulo entre dos rectas me sale cos α = −0,5, luego α = 120°». ¿Qué falla?",
          op: ["Nada, 120° es correcto", "El ángulo entre rectas es el agudo: hay que tomar |u·v|, y sale 60°", "Hay que sumar 180°", "El coseno nunca es negativo"], ok: 1,
          porque: "Una recta no tiene sentido, así que u y −u dan la misma recta: el ángulo entre rectas es el agudo (entre 0° y 90°). Se toma valor absoluto en el numerador." },
        { q: "«d(P, π) = (A·p₁ + B·p₂ + C·p₃ + D)/(A² + B² + C²)». ¿Qué falla?",
          op: ["Nada", "Falta el valor absoluto y la raíz del denominador: |…|/√(A² + B² + C²)", "Hay que multiplicar por |n|", "Sobra el término D"], ok: 1,
          porque: "La distancia es positiva (valor absoluto) y se divide por el módulo de la normal, |n| = √(A² + B² + C²), no por su cuadrado." },
        { q: "Entre π₁: 2x − y + 2z − 3 = 0 y π₂: 4x − 2y + 4z + 12 = 0 alguien dice «d = |12 − (−3)|/3 = 5». ¿Qué falla?",
          op: ["Nada", "Los coeficientes de x, y, z no coinciden: hay que dividir π₂ entre 2 (D = 6) y entonces d = 9/3 = 3", "Hay que sumar los D en lugar de restarlos", "Falta multiplicar por √2"], ok: 1,
          porque: "La fórmula |D − D′|/|n| exige que ambas ecuaciones tengan los mismos A, B, C. Con 2x − y + 2z + 6 = 0, d = |6 − (−3)|/3 = 3." },
        { q: "«El simétrico de P(1, 2, 3) respecto de un plano cualquiera es (−1, −2, −3)». ¿Qué falla?",
          op: ["Nada", "Eso solo es el simétrico respecto del origen; respecto del plano se usa P″ = 2P′ − P", "Hay que cambiar solo el signo de z", "Es (1, 2, −3) siempre"], ok: 1,
          porque: "El simétrico depende del plano: P″ = P − (2v/|n|²)·n. Solo respecto de ciertos planos particulares (como z = 0) basta con cambiar un signo." },
        { q: "«Dos rectas con [Q₁Q₂, u, v] = 0 están a distancia d = 0/|u × v| = 0, luego se cruzan a distancia 0». ¿Qué falla?",
          op: ["Nada", "Si el mixto es 0, las rectas son coplanarias y se cortan: no se cruzan", "El mixto nunca puede valer 0", "Hay que dividir por |u|"], ok: 1,
          porque: "Que se crucen exige un mixto distinto de 0. Con mixto 0 (y directores no proporcionales) las rectas están en un plano y se cortan en un punto." },
        { q: "«La distancia de P a la recta r es |QP × v| sin dividir, porque ya es el área». ¿Qué falla?",
          op: ["Nada", "|QP × v| es el área del paralelogramo; hay que dividirla entre la base |v| para obtener la altura", "Hay que dividir por |QP|", "Hay que usar QP·v"], ok: 1,
          porque: "Área = base · altura: |QP × v| = |v|·d, de donde d = |QP × v|/|v|." },
        { q: "«Para hallar el pie de la perpendicular de P a r, corto r con la recta que pasa por P con dirección la normal». ¿Qué falla?",
          op: ["Nada, es válido", "Eso se hace con un plano; con una recta hay que usar el plano por P perpendicular a r (normal v)", "La normal no existe en el espacio", "Hay que cortar con el plano z = 0"], ok: 1,
          porque: "Una recta no tiene «normal» única en el espacio (hay infinitas direcciones perpendiculares). Se usa el plano por P con normal v y se corta con r." }
      ]
    },
    quiz1: {
      titulo: "Test de problemas métricos",
      preguntas: [
        { q: "El ángulo entre una recta y un plano se calcula con", op: ["el coseno de v y n", "el seno de v y n", "la tangente", "el producto vectorial v × n"], ok: 1, porque: "sen α = |v·n|/(|v||n|): la normal está a 90° del plano." },
        { q: "Dos planos son perpendiculares si", op: ["n₁ ∥ n₂", "n₁·n₂ = 0", "n₁ × n₂ = 0", "D₁ = D₂"], ok: 1, porque: "Sus normales son perpendiculares: producto escalar 0." },
        { q: "La distancia de P(1, 1, 1) a π: 2x + 2y + z − 3 = 0 es", op: ["2", "2/3", "1/3", "3"], ok: 1, porque: "|2 + 2 + 1 − 3|/√9 = 2/3." },
        { q: "El director de la recta x + y = 1, y + z = 2 es", op: ["(1, 1, 0)", "(1, −1, 1)", "(0, 1, 1)", "(1, 1, 2)"], ok: 1, porque: "(1, 1, 0) × (0, 1, 1) = (1, −1, 1)." },
        { q: "Si [Q₁Q₂, u, v] = 0 y u, v no proporcionales, las rectas", op: ["se cruzan", "se cortan", "son paralelas", "coinciden"], ok: 1, porque: "Son coplanarias y no paralelas: se cortan en un punto." },
        { q: "La distancia entre dos rectas paralelas se calcula como", op: ["|[Q₁Q₂, u, v]|/|u × v|", "la distancia de un punto de una a la otra", "|u·v|", "|Q₁Q₂|"], ok: 1, porque: "Con u × v = 0 el producto mixto no sirve: se usa punto–recta." },
        { q: "La proyección ortogonal de P sobre un plano de normal n está en la recta", op: ["por P con dirección n", "por P con dirección cualquiera del plano", "por el origen con dirección n", "por P con dirección P"], ok: 0, porque: "La perpendicular desde P al plano lleva la dirección de la normal." },
        { q: "Si P′ es la proyección de P, el simétrico es", op: ["−P′", "2P′ − P", "P′ − P", "(P + P′)/2"], ok: 1, porque: "P′ es el punto medio de P y su simétrico: P″ = 2P′ − P." },
        { q: "El plano mediador de A y B tiene como vector normal", op: ["A + B", "AB", "A × B", "(A + B)/2"], ok: 1, porque: "Es perpendicular al segmento AB y pasa por su punto medio." },
        { q: "Los planos a distancia 3 de x + 2y + 2z − 1 = 0 son", op: ["x + 2y + 2z − 4 = 0 y x + 2y + 2z + 2 = 0", "x + 2y + 2z + 8 = 0 y x + 2y + 2z − 10 = 0", "x + 2y + 2z − 1 ± 3 = 0 con el mismo D", "No hay ninguno"], ok: 1, porque: "|n| = 3: D cambia en 3·3 = 9. −1 + 9 = 8 y −1 − 9 = −10." },
        { q: "Altura desde D de un tetraedro de volumen V sobre la cara ABC:", op: ["V/Área", "3V/Área", "6V/Área", "Área/(3V)"], ok: 1, porque: "V = ⅓·Área·h ⟹ h = 3V/Área." },
        { q: "Una recta de director v es paralela a un plano de normal n si", op: ["v·n = 0", "v × n = 0", "v = n", "|v| = |n|"], ok: 0, porque: "Paralela al plano ⟺ v perpendicular a la normal. (v × n = 0 sería perpendicular al plano.)" }
      ]
    },
    tj1: {
      titulo: "Tarjetas de problemas métricos",
      cartas: [
        { a: "Ángulo entre dos rectas", b: "cos α = |u·v| / (|u||v|) con sus directores. Entre 0° y 90°." },
        { a: "Ángulo recta–plano", b: "sen α = |v·n| / (|v||n|). ¡Seno!" },
        { a: "Ángulo entre planos", b: "cos α = |n₁·n₂| / (|n₁||n₂|) con las normales." },
        { a: "Director de una recta dada por dos planos", b: "v = n₁ × n₂ (producto vectorial de las normales)." },
        { a: "Distancia punto–plano", b: "d = |A·p₁ + B·p₂ + C·p₃ + D| / √(A² + B² + C²)" },
        { a: "Distancia punto–recta", b: "d = |QP × v| / |v|, con Q ∈ r y v su director." },
        { a: "Distancia entre rectas que se cruzan", b: "d = |[Q₁Q₂, u, v]| / |u × v|. Si el mixto es 0, se cortan." },
        { a: "Proyección de P sobre un plano", b: "P′ = P − (valor/|n|²)·n, con valor = A·p₁ + B·p₂ + C·p₃ + D." },
        { a: "Proyección de P sobre una recta", b: "Plano por P perpendicular a r (normal v), cortar con r." },
        { a: "Simétrico de P", b: "P″ = 2P′ − P, con P′ la proyección (o el punto medio)." },
        { a: "Perpendicular común", b: "Puntos genéricos X(t), Y(s) con XY·u = 0 y XY·v = 0; o intersección de los planos con dirección u × v." },
        { a: "Plano mediador de A y B", b: "Normal AB, pasa por el punto medio: AB·(X − M) = 0." }
      ]
    },
    empar: {
      titulo: "Situación y condición",
      consigna: "Une cada situación con la condición que la expresa.",
      pares: [
        ["Dos rectas son perpendiculares", "u·v = 0"],
        ["Una recta es paralela a un plano", "v·n = 0"],
        ["Una recta es perpendicular a un plano", "v y n proporcionales (v × n = 0)"],
        ["Dos planos son perpendiculares", "n₁·n₂ = 0"],
        ["Dos rectas se cruzan", "[Q₁Q₂, u, v] ≠ 0"],
        ["Un punto está en un plano", "A·p₁ + B·p₂ + C·p₃ + D = 0"]
      ]
    },
    clas: {
      titulo: "¿Seno o coseno?",
      consigna: "Toca cada ángulo y elige la función que se usa para calcularlo con los vectores.",
      categorias: ["Coseno", "Seno"],
      items: [
        { t: "Ángulo entre dos rectas", c: 0 }, { t: "Ángulo entre una recta y un plano", c: 1 }, { t: "Ángulo entre dos planos", c: 0 },
        { t: "Ángulo de una recta con su proyección sobre el plano", c: 1 }, { t: "Ángulo entre las normales de dos planos", c: 0 }, { t: "Ángulo entre una recta y la normal de un plano", c: 0 }
      ]
    },
    orden: {
      titulo: "Perpendicular común a dos rectas",
      consigna: "Ordena los pasos del método de los puntos genéricos.",
      items: [
        { t: "Escribir un punto genérico de cada recta: X(t) en r e Y(s) en s" },
        { t: "Calcular el vector XY = Y − X en función de t y s" },
        { t: "Imponer XY·u = 0 y XY·v = 0 (dos ecuaciones lineales)" },
        { t: "Resolver el sistema para t y s" },
        { t: "Sustituir para obtener los pies A y B" },
        { t: "Dar la recta por A con dirección AB; la distancia es |AB|" }
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
    { id: "m1", nivel: 1, enunciado: "Calcula el ángulo (en grados) entre las rectas de directores u = (1, 1, 0) y v = (0, 1, 1).", check: num("α =", 60, { unidad: "°" }),
      pistas: ["cos α = |u·v|/(|u||v|)."], pasos: ["u·v = 1; |u| = |v| = √2.", "cos α = 1/2 ⟹ α = 60°."], resultado: "α = 60°" },
    { id: "m2", nivel: 1, enunciado: "Calcula el ángulo (en grados) entre la recta de director v = (1, 0, 1) y el plano π: x + y = 4.", check: num("α =", 30, { unidad: "°" }),
      pistas: ["Con recta y plano se usa el seno; n = (1, 1, 0)."], pasos: ["v·n = 1; |v| = |n| = √2.", "sen α = 1/2 ⟹ α = 30°."], resultado: "α = 30°" },
    { id: "m3", nivel: 1, enunciado: "Calcula el ángulo (en grados) entre los planos x + y + z = 3 y x = 0.", check: num("α =", 54.7356, { unidad: "°" }),
      pistas: ["Normales (1, 1, 1) y (1, 0, 0)."], pasos: ["n₁·n₂ = 1; |n₁| = √3, |n₂| = 1.", "cos α = 1/√3 ≈ 0,5774 ⟹ α ≈ 54,74°."], resultado: "α ≈ 54,74°" },
    { id: "m4", nivel: 1, enunciado: "Calcula la distancia de P(1, 2, 3) al plano 2x − y + 2z − 4 = 0 (decimal).", check: num("d =", 2 / 3, { ph: "0,667" }),
      pistas: ["Sustituye P en el primer miembro y divide por |n| = 3."], pasos: ["Numerador: 2 − 2 + 6 − 4 = 2.", "d = 2/3 ≈ 0,667."], resultado: "d = 2/3" },
    { id: "m5", nivel: 1, enunciado: "Calcula la distancia del origen al plano 2x + 3y + 6z − 14 = 0.", check: num("d =", 2),
      pistas: ["|n| = 7."], pasos: ["Numerador: |−14| = 14; |n| = √(4 + 9 + 36) = 7.", "d = 14/7 = 2."], resultado: "d = 2" },
    { id: "m6", nivel: 1, enunciado: "Las rectas de directores u = (1, 2, −1) y v = (3, −1, 1) son…",
      check: opcion("Elige", ["paralelas", "perpendiculares", "ni paralelas ni perpendiculares", "coincidentes"], 1),
      pistas: ["Calcula u·v."], pasos: ["u·v = 3 − 2 − 1 = 0 ⟹ directores perpendiculares."], resultado: "Perpendiculares" },
    { id: "m7", nivel: 1, enunciado: "Calcula la distancia de P(1, 2, 0) a la recta r: (1, 0, 0) + t(0, 1, 1) (decimal).", check: num("d =", Math.SQRT2, { ph: "1,414" }),
      pistas: ["QP = (0, 2, 0)."], pasos: ["QP × v = (0, 2, 0) × (0, 1, 1) = (2, 0, 0), módulo 2.", "d = 2/√2 = √2 ≈ 1,414."], resultado: "d = √2" },
    { id: "m8", nivel: 1, enunciado: "Halla la proyección ortogonal de P(1, 2, 3) sobre el plano x + y + z − 3 = 0.", check: vec(0, 1, 2),
      pistas: ["P′ = P − (valor/|n|²)·n."], pasos: ["Valor: 1 + 2 + 3 − 3 = 3; |n|² = 3.", "P′ = (1, 2, 3) − 1·(1, 1, 1) = (0, 1, 2)."], resultado: "(0, 1, 2)" },
    { id: "m9", nivel: 1, enunciado: "Halla el simétrico de A(1, 2, 3) respecto del punto M(2, 0, 1).", check: vec(3, -2, -1),
      pistas: ["A′ = 2M − A."], pasos: ["A′ = (4 − 1, 0 − 2, 2 − 3) = (3, −2, −1)."], resultado: "(3, −2, −1)" },
    { id: "m10", nivel: 1, enunciado: "Halla el área del triángulo de vértices A(1, 0, 0), B(0, 2, 0) y C(0, 0, 3) (decimal).", check: num("Área =", 3.5),
      pistas: ["½|AB × AC|."], pasos: ["AB = (−1, 2, 0), AC = (−1, 0, 3).", "AB × AC = (6, 3, 2), módulo 7 ⟹ Área = 7/2."], resultado: "7/2" },
    { id: "m11", nivel: 1, enunciado: "Halla el volumen del tetraedro de vértices O(0, 0, 0), A(1, 0, 0), B(0, 2, 0) y C(0, 0, 3).", check: num("V =", 1),
      pistas: ["⅙ del valor absoluto del mixto."], pasos: ["[OA, OB, OC] = 1·2·3 = 6.", "V = 6/6 = 1."], resultado: "V = 1" },
    { id: "m12", nivel: 1, enunciado: "Para calcular el ángulo entre una recta y un plano con v y n se usa…",
      check: opcion("Elige", ["cos α = |v·n|/(|v||n|)", "sen α = |v·n|/(|v||n|)", "tg α = |v·n|", "sen α = |v × n|/(|v||n|)"], 1),
      pistas: ["La normal forma 90° con el plano."], pasos: ["El ángulo con la normal es complementario del ángulo con el plano, así que su coseno es el seno buscado."], resultado: "sen α = |v·n|/(|v||n|)" },
    { id: "m13", nivel: 1, enunciado: "El plano mediador de A(1, 2, 3) y B(3, 0, 1) es x − y − z + D = 0. Halla D.", check: num("D =", 1),
      pistas: ["Normal AB ∥ (1, −1, −1); pasa por M = (2, 1, 2)."], pasos: ["AB = (2, −2, −2).", "M = (2, 1, 2) ⟹ 2 − 1 − 2 + D = 0 ⟹ D = 1."], resultado: "D = 1" },
    { id: "m14", nivel: 1, enunciado: "Calcula la distancia entre los planos 2x − y + 2z − 3 = 0 y 2x − y + 2z + 6 = 0.", check: num("d =", 3),
      pistas: ["Mismos A, B, C: |D − D′|/|n|."], pasos: ["|6 − (−3)|/3 = 9/3 = 3."], resultado: "d = 3" },
    { id: "m15", nivel: 1, enunciado: "Para calcular la distancia entre dos rectas que se cruzan, con directores u y v y puntos Q₁, Q₂, se usa…",
      check: opcion("Elige", ["|u·v| / |Q₁Q₂|", "|[Q₁Q₂, u, v]| / |u × v|", "|Q₁Q₂ × u| / |v|", "|u × v| / |Q₁Q₂|"], 1),
      pistas: ["Volumen del paralelepípedo entre el área de la base."], pasos: ["El mixto es el volumen; u × v da el área de la base; el cociente es la altura."], resultado: "|[Q₁Q₂, u, v]| / |u × v|" },
    // ---------------------------------------------------------------- ★★
    { id: "m16", nivel: 2, enunciado: "Calcula el ángulo (en grados) entre r: x − y = 0, y − z = 0 y s: (1, 0, 0) + t(1, 2, 0).", check: num("α =", 39.2315, { unidad: "°" }),
      pistas: ["Director de r: producto vectorial de las normales (1, −1, 0) y (0, 1, −1)."], pasos: ["u = (1, −1, 0) × (0, 1, −1) = (1, 1, 1); v = (1, 2, 0).", "u·v = 3; |u| = √3, |v| = √5: cos α = 3/√15 = √15/5 ≈ 0,7746.", "α ≈ 39,23°."], resultado: "α ≈ 39,23°" },
    { id: "m17", nivel: 2, enunciado: "Calcula el ángulo (en grados) entre la recta de director v = (2, 1, −2) y el plano π: x + 2y − 2z = 5.", check: num("α =", 62.7339, { unidad: "°" }),
      pistas: ["Seno."], pasos: ["v·n = 2 + 2 + 4 = 8; |v| = 3, |n| = 3.", "sen α = 8/9 ≈ 0,8889 ⟹ α ≈ 62,73°."], resultado: "α ≈ 62,73°" },
    { id: "m18", nivel: 2, enunciado: "Calcula la distancia de P(0, 3, 1) a la recta r: (0, 1, 0) + t(1, 1, 2) (decimal).", check: num("d =", Math.sqrt(7 / 3), { ph: "1,528" }),
      pistas: ["QP = (0, 2, 1)."], pasos: ["QP × v = (0, 2, 1) × (1, 1, 2) = (3, 1, −2), módulo √14.", "d = √14/√6 = √(7/3) ≈ 1,528."], resultado: "d ≈ 1,528" },
    { id: "m19", nivel: 2, enunciado: "Calcula la distancia entre r: (0, 0, 0) + t(1, 1, 0) y s: (0, 0, 1) + s(1, 0, 1) (decimal).", check: num("d =", 1 / Math.sqrt(3), { ph: "0,577" }),
      pistas: ["u × v = (1, −1, −1); Q₁Q₂ = (0, 0, 1)."], pasos: ["Mixto: Q₁Q₂·(u × v) = −1 ≠ 0 ⟹ se cruzan.", "d = 1/√3 ≈ 0,577."], resultado: "d = 1/√3 ≈ 0,577" },
    { id: "m20", nivel: 2, enunciado: "Halla la proyección ortogonal de P(1, 2, 3) sobre la recta x = y = z.", check: vec(2, 2, 2),
      pistas: ["Plano por P perpendicular a r: x + y + z = 6."], pasos: ["Plano por P con normal (1, 1, 1): x + y + z = 6.", "Punto (t, t, t): 3t = 6 ⟹ t = 2 ⟹ (2, 2, 2)."], resultado: "(2, 2, 2)" },
    { id: "m21", nivel: 2, enunciado: "Halla el simétrico de P(1, 2, 3) respecto del plano x + y + z − 3 = 0.", check: vec(-1, 0, 1),
      pistas: ["P″ = 2P′ − P con P′ = (0, 1, 2)."], pasos: ["P′ = (0, 1, 2) (ejercicio m8).", "P″ = (0 − 1, 2 − 2, 4 − 3) = (−1, 0, 1)."], resultado: "(−1, 0, 1)" },
    { id: "m22", nivel: 2, enunciado: "Los puntos de r: (1 + t, t, 2t) que están a distancia 1 del plano 2x − y + 2z − 1 = 0 corresponden a dos valores de t. Halla ambos.", check: lista("t =", [-0.8, 0.4], "dos valores"),
      pistas: ["Sustituye (1 + t, t, 2t): el numerador es 1 + 5t."], pasos: ["2(1 + t) − t + 4t − 1 = 1 + 5t.", "|1 + 5t|/3 = 1 ⟹ 1 + 5t = ±3 ⟹ t = 2/5 o t = −4/5."], resultado: "t = −4/5 y t = 2/5" },
    { id: "m23", nivel: 2, enunciado: "(EvAU) Halla m &gt; 0 para que la recta de director (1, 1, m) forme 45° con el plano z = 0.", check: num("m =", Math.SQRT2, { ph: "1,414" }),
      pistas: ["sen 45° = |m|/√(2 + m²)."], pasos: ["n = (0, 0, 1): sen α = |m|/√(2 + m²) = √2/2.", "Al cuadrado: 2m² = 2 + m² ⟹ m² = 2 ⟹ m = √2."], resultado: "m = √2" },
    { id: "m24", nivel: 2, enunciado: "(EvAU) Halla m para que la recta de director (2, m, 1) sea paralela al plano 3x + y − z = 2.", check: num("m =", -5),
      pistas: ["v·n = 0."], pasos: ["6 + m − 1 = 0 ⟹ m = −5."], resultado: "m = −5" },
    { id: "m25", nivel: 2, enunciado: "Con A(1, 0, 0), B(3, 0, 1), C(1, 2, 2) calcula la altura del triángulo ABC desde C (decimal).", check: num("h =", 6 / Math.sqrt(5), { ph: "2,683" }),
      pistas: ["Área = 3; base |AB| = √5."], pasos: ["AB × AC = (−2, −4, 4), Área = 3.", "h = 2·Área/|AB| = 6/√5 ≈ 2,683."], resultado: "h = 6/√5 ≈ 2,683" },
    { id: "m26", nivel: 2, enunciado: "Halla el volumen del tetraedro de vértices A(1, 0, 0), B(3, 0, 1), C(1, 2, 2) y D(2, 1, 5) (decimal).", check: num("V =", 7 / 3, { ph: "2,333" }),
      pistas: ["AB = (2, 0, 1), AC = (0, 2, 2), AD = (1, 1, 5)."], pasos: ["[AB, AC, AD] = 14.", "V = 14/6 = 7/3 ≈ 2,333."], resultado: "V = 7/3" },
    { id: "m27", nivel: 2, enunciado: "Con los mismos A, B, C, D, calcula el término D′ del plano ABC escrito como x + 2y − 2z + D′ = 0.", check: num("D′ =", -1),
      pistas: ["Normal AB × AC ∥ (1, 2, −2); sustituye A."], pasos: ["AB × AC = (−2, −4, 4) ∥ (1, 2, −2).", "Por A(1, 0, 0): 1 + D′ = 0 ⟹ D′ = −1."], resultado: "D′ = −1" },
    { id: "m28", nivel: 2, enunciado: "Uno de los planos bisectores de x + 2y + 2z − 3 = 0 y 2x − 2y + z + 3 = 0 no tiene término en y. ¿Cuál es?",
      check: opcion("Elige", ["x + z = 0", "x + z = 1", "x − z = 0", "x + 4z = 0"], 0),
      pistas: ["Las dos normales tienen módulo 3: iguala las ecuaciones con signo − ."], pasos: ["x + 2y + 2z − 3 = −(2x − 2y + z + 3) ⟹ 3x + 3z = 0 ⟹ x + z = 0."], resultado: "x + z = 0" },
    { id: "m29", nivel: 2, enunciado: "Los planos paralelos a 2x − y + 2z − 1 = 0 que distan 2 de él son 2x − y + 2z + D = 0. Da los dos valores de D (de menor a mayor).", check: lista("D =", [-7, 5], "dos valores"),
      pistas: ["|n| = 3; D = −1 ± 2·3."], pasos: ["D = −1 + 6 = 5 y D = −1 − 6 = −7."], resultado: "D = −7 y D = 5" },
    { id: "m30", nivel: 2, enunciado: "Halla el simétrico de P(3, 1, 0) respecto de r: (0, 1, 0) + t(1, 1, 2).", check: vec(-2, 2, 2),
      pistas: ["Plano por P con normal (1, 1, 2): x + y + 2z = 4."], pasos: ["Plano: x + y + 2z = 3 + 1 = 4; punto de r: (t, 1 + t, 2t): 6t + 1 = 4 ⟹ t = 1/2.", "P′ = (1/2, 3/2, 1); P″ = 2P′ − P = (1 − 3, 3 − 1, 2 − 0) = (−2, 2, 2)."], resultado: "(−2, 2, 2)" },
    { id: "m31", nivel: 2, enunciado: "Calcula la distancia entre las rectas paralelas r: (1, 0, 2) + t(1, 2, 2) y s: (3, 1, 0) + t(1, 2, 2).", check: num("d =", 3),
      pistas: ["Distancia de un punto de s a r."], pasos: ["Q₁Q₂ = (2, 1, −2); Q₁Q₂ × v = (6, −6, 3), módulo 9; |v| = 3.", "d = 9/3 = 3."], resultado: "d = 3" },
    { id: "m32", nivel: 2, enunciado: "Calcula la distancia de r: (1, 1, 1) + t(1, 1, −2) al plano x + y + z − 9 = 0 (decimal).", check: num("d =", 2 * Math.sqrt(3), { ph: "3,464" }),
      pistas: ["Comprueba v·n = 0 y usa el punto (1, 1, 1)."], pasos: ["v·n = 1 + 1 − 2 = 0: paralelos.", "d = |3 − 9|/√3 = 6/√3 = 2√3 ≈ 3,464."], resultado: "d = 2√3" },
    { id: "m33", nivel: 2, enunciado: "El plano perpendicular a la recta x = y = z que pasa por P(1, 2, 3) es x + y + z + D = 0. Halla D.", check: num("D =", -6),
      pistas: ["Su normal es el director (1, 1, 1)."], pasos: ["1 + 2 + 3 + D = 0 ⟹ D = −6."], resultado: "D = −6" },
    // ---------------------------------------------------------------- ★★★
    { id: "m34", nivel: 3, enunciado: "(EvAU) Sean r: (0, 1, −1) + t(1, 0, 1) y s: (0, −1, 0) + s(0, 1, 1). Halla los pies A ∈ r y B ∈ s de la perpendicular común.", check: [num("A: x =", 1), num("A: y =", 1), num("A: z =", 0), num("B: x =", 0), num("B: y =", 0), num("B: z =", 1)],
      pistas: ["X = (t, 1, −1 + t), Y = (0, −1 + s, s). Impón XY·u = 0 y XY·v = 0."], pasos: ["XY = (−t, −2 + s, 1 + s − t).", "XY·u = −2t + 1 + s = 0; XY·v = −2 + s + 1 + s − t = −1 − t + 2s = 0.", "De la primera, s = 2t − 1; en la segunda: −1 − t + 4t − 2 = 0 ⟹ t = 1, s = 1.", "A = X(1) = (1, 1, 0); B = Y(1) = (0, 0, 1). |AB| = √3."], resultado: "A(1, 1, 0), B(0, 0, 1)" },
    { id: "m35", nivel: 3, enunciado: "Con A(1, 0, 0), B(3, 0, 1), C(1, 2, 2) y D(2, 1, 5), calcula el ángulo (en grados) que forma la recta AD con el plano ABC.", check: num("α =", 26.6828, { unidad: "°" }),
      pistas: ["Plano ABC: normal (1, 2, −2). Usa el seno."], pasos: ["AD = (1, 1, 5), |AD| = √27 = 3√3; n·AD = 1 + 2 − 10 = −7; |n| = 3.", "sen α = 7/(9√3) ≈ 0,4490 ⟹ α ≈ 26,68°."], resultado: "α ≈ 26,68°" },
    { id: "m36", nivel: 3, enunciado: "Calcula el ángulo (en grados) que forma la recta OP, con P(3, 0, 3), con el plano 2x − y + 2z − 3 = 0.", check: num("α =", 70.5288, { unidad: "°" }),
      pistas: ["OP ∥ (1, 0, 1)."], pasos: ["v·n = 2 + 2 = 4 con v = (1, 0, 1); |v| = √2, |n| = 3.", "sen α = 4/(3√2) = 2√2/3 ≈ 0,9428 ⟹ α ≈ 70,53°."], resultado: "α ≈ 70,53°" },
    { id: "m37", nivel: 3, enunciado: "Halla la coordenada x del punto del eje OX que equidista de A(1, 2, 3) y B(3, 0, 1).", check: num("x =", -1),
      pistas: ["P = (x, 0, 0): iguala |PA|² y |PB|²."], pasos: ["|PA|² = (x − 1)² + 4 + 9; |PB|² = (x − 3)² + 0 + 1.", "x² − 2x + 14 = x² − 6x + 10 ⟹ 4x = −4 ⟹ x = −1."], resultado: "P(−1, 0, 0)" },
    { id: "m38", nivel: 3, enunciado: "(EvAU) Halla el punto de r: (t, 1, t + 1) que equidista de los planos x + 2y + 2z − 3 = 0 y 2x − 2y + z + 3 = 0.", check: vec(-0.5, 1, 0.5),
      pistas: ["Los dos módulos de normal valen 3: basta igualar los valores absolutos."], pasos: ["Primer plano: t + 2 + 2t + 2 − 3 = 3t + 1. Segundo: 2t − 2 + t + 1 + 3 = 3t + 2.", "|3t + 1| = |3t + 2| ⟹ 3t + 1 = −(3t + 2) ⟹ t = −1/2.", "P = (−1/2, 1, 1/2)."], resultado: "(−1/2, 1, 1/2)" },
    { id: "m39", nivel: 3, enunciado: "(EvAU) Halla m para que la distancia del punto P(m, 1, 1) al plano 2x + 2y − z + 1 = 0 sea 2 (de menor a mayor).", check: lista("m =", [-4, 2], "dos valores"),
      pistas: ["Numerador 2m + 2; |n| = 3."], pasos: ["2m + 2 − 1 + 1 = 2m + 2.", "|2m + 2|/3 = 2 ⟹ 2m + 2 = ±6 ⟹ m = 2 o m = −4."], resultado: "m = −4 y m = 2" },
    { id: "m40", nivel: 3, enunciado: "(EvAU) Sean r: (0, 0, 0) + t(1, 1, 0) y s<sub>m</sub>: (0, 0, m) + s(1, 0, 1). Halla m para que la distancia entre ellas sea √3 (de menor a mayor).", check: lista("m =", [-3, 3], "dos valores"),
      pistas: ["u × v = (1, −1, −1)."], pasos: ["Q₁Q₂ = (0, 0, m); mixto = −m.", "d = |m|/√3 = √3 ⟹ |m| = 3 ⟹ m = ±3."], resultado: "m = −3 y m = 3" },
    { id: "m41", nivel: 3, enunciado: "Con P(2, 1, 2) y r: (0, 1, 0) + t(1, 1, 2), calcula el área del triángulo formado por Q(0, 1, 0), P y el simétrico de P respecto de r (decimal).", check: num("Área =", 2 * Math.sqrt(3), { ph: "3,464" }),
      pistas: ["P″ = (0, 3, 2) (sección 7)."], pasos: ["QP = (2, 0, 2), QP″ = (0, 2, 2).", "QP × QP″ = (−4, −4, 4), módulo 4√3.", "Área = 2√3 ≈ 3,464."], resultado: "2√3" },
    { id: "m42", nivel: 3, enunciado: "Deduce la fórmula de la distancia de P a π: Ax + By + Cz + D = 0 usando la proyección de QP sobre la normal.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Toma un punto Q del plano y observa que d es la proyección escalar de QP sobre n", p: 0.5 }, { t: "Escribe d = |QP·n| / |n|", p: 0.5 },
        { t: "Desarrolla QP·n = A(p₁ − q₁) + B(p₂ − q₂) + C(p₃ − q₃)", p: 0.5 }, { t: "Usa que Q cumple Aq₁ + Bq₂ + Cq₃ = −D", p: 0.5 }] },
      pasos: ["d = |QP·n|/|n|.", "QP·n = A p₁ + B p₂ + C p₃ − (A q₁ + B q₂ + C q₃).", "Como Q ∈ π, A q₁ + B q₂ + C q₃ = −D. Luego QP·n = A p₁ + B p₂ + C p₃ + D y d = |A p₁ + B p₂ + C p₃ + D| / √(A² + B² + C²). ∎"], resultado: "d = |A p₁ + B p₂ + C p₃ + D| / √(A² + B² + C²)" },
    { id: "m43", nivel: 3, enunciado: "Demuestra que el ángulo α entre una recta de director v y un plano de normal n cumple sen α = |v·n|/(|v||n|).",
      check: { tipo: "rubrica", etiqueta: "Tu razonamiento", filas: 4, items: [
        { t: "Llama β al ángulo entre v y n: cos β = |v·n|/(|v||n|)", p: 0.5 }, { t: "Observa que n es perpendicular al plano, luego α + β = 90°", p: 0.5 },
        { t: "Usa sen α = sen(90° − β) = cos β", p: 0.5 }, { t: "Concluye la fórmula", p: 0.5 }] },
      pasos: ["Si β es el ángulo (agudo) entre la recta y la normal, cos β = |v·n|/(|v||n|).", "La normal forma 90° con el plano, luego α = 90° − β.", "sen α = sen(90° − β) = cos β = |v·n|/(|v||n|). ∎"], resultado: "sen α = |v·n| / (|v||n|)" },
    { id: "m44", nivel: 3, enunciado: "Calcula la distancia de A(1, 2, 3) al plano mediador de A y B(3, 0, 1) (decimal) sin hallar el plano.", check: num("d =", Math.sqrt(3), { ph: "1,732" }),
      pistas: ["Piensa en el punto medio de AB."], pasos: ["El plano mediador es perpendicular a AB por su punto medio M.", "La distancia de A al plano es |AM| = |AB|/2 = √12/2 = √3 ≈ 1,732."], resultado: "√3" },
    { id: "m45", nivel: 3, enunciado: "(EvAU) Halla m para que el tetraedro de vértices A(1, 0, 0), B(0, 2, 0), C(0, 0, 3) y D(1, 1, m) tenga volumen 1 (de menor a mayor).", check: lista("m =", [-4.5, 1.5], "dos valores"),
      pistas: ["AB = (−1, 2, 0), AC = (−1, 0, 3), AD = (0, 1, m)."], pasos: ["[AB, AC, AD] = 3 + 2m.", "V = |3 + 2m|/6 = 1 ⟹ 3 + 2m = ±6 ⟹ m = 3/2 o m = −9/2."], resultado: "m = −9/2 y m = 3/2" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Ángulos: cuál uso",
      tabla: { cab: ["Entre…", "Vectores", "Función", "Perpendicular si…"], filas: [
        ["Dos rectas", "u, v", "cos α = |u·v|/(|u||v|)", "u·v = 0"],
        ["Recta y plano", "v, n", "sen α = |v·n|/(|v||n|)", "v ∥ n"],
        ["Dos planos", "n₁, n₂", "cos α = |n₁·n₂|/(|n₁||n₂|)", "n₁·n₂ = 0"]
      ] },
      nota: "Siempre valor absoluto: el resultado está entre 0° y 90°." },
    { titulo: "Distancias", ancha: true,
      tabla: { cab: ["Objetos", "Fórmula", "Observación"], filas: [
        ["Punto – plano", "|Ap₁ + Bp₂ + Cp₃ + D| / √(A² + B² + C²)", "Plano en forma general"],
        ["Punto – recta", "|QP × v| / |v|", "Q ∈ r, v director"],
        ["Dos rectas que se cruzan", "|[Q₁Q₂, u, v]| / |u × v|", "Mixto ≠ 0"],
        ["Dos planos paralelos", "|D − D′| / |n|", "Mismos A, B, C"],
        ["Recta y plano paralelos", "d(P, π) con P ∈ r", "v·n = 0"],
        ["Dos rectas paralelas", "d(Q₂, r)", "u ∥ v"]
      ] } },
    { titulo: "Proyección y simétrico",
      items: [
        { label: "Sobre un plano", formula: "P′ = P − (valor/|n|²)·n" },
        { label: "Sobre una recta", formula: "plano por P ⟂ r; cortar con r" },
        { label: "Simétrico", formula: "P″ = 2P′ − P" },
        { label: "Respecto de un punto M", formula: "P″ = 2M − P" },
        { label: "Distancia", formula: "|PP′| = d(P, π o r)" },
        { label: "Perpendicular común", formula: "XY·u = 0 y XY·v = 0" }
      ] },
    { titulo: "Áreas, volúmenes y lugares", ancha: true,
      tabla: { cab: ["Concepto", "Fórmula"], filas: [
        ["Área del triángulo ABC", "½|AB × AC|"],
        ["Volumen del tetraedro", "⅙|[AB, AC, AD]|"],
        ["Altura desde D", "3V / Área(ABC)"],
        ["Plano mediador de A y B", "AB·(X − M) = 0, M punto medio"],
        ["Planos a distancia d de π", "Ax + By + Cz + D ± d|n| = 0"],
        ["Bisectores", "π₁/|n₁| = ±π₂/|n₂|"]
      ] } },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Recta–plano con coseno", bien: "Con seno", por: "La normal forma 90° con el plano." },
        { mal: "Ángulo obtuso entre rectas", bien: "Valor absoluto: ángulo agudo", por: "Una recta no tiene sentido." },
        { mal: "Restar los D sin igualar A, B, C", bien: "Dividir antes por el coeficiente común", por: "Si no, la distancia sale mal." },
        { mal: "Aplicar el mixto a rectas paralelas", bien: "Punto–recta", por: "u × v = 0: se divide por 0." },
        { mal: "Simétrico = opuesto", bien: "P″ = 2P′ − P", por: "Solo coincide si el centro es el origen." },
        { mal: "Olvidar ½ en el triángulo o ⅙ en el tetraedro", bien: "½|AB × AC| y ⅙|[…]|", por: "Eso es el paralelogramo o el paralelepípedo." }
      ] }
  ];

  B.registrar("mates2", "t6", {
    resumen: resumen, secciones: B.parte.m2t6a.secciones, nuevas: B.parte.m2t6b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
