/* ============================================================
   Matemáticas II · ampliaciones · Tema 7: Límites de funciones y continuidad
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Indeterminaciones</b> (siete): 0/0, ∞/∞, ∞ − ∞, 0·∞, 1<sup>∞</sup>, ∞<sup>0</sup>, 0<sup>0</sup>. «k/0» y «k·∞» <b>no</b> lo son. Una indeterminación no es «no existe»: hay que transformar la expresión. ∞/∞: dividir por el término que más crece (jerarquía log ≪ potencia ≪ exponencial). 0/0: factorizar, conjugado o límite notable. ∞ − ∞: conjugado (raíces) o común denominador. 0·∞: pasar a cociente.",
    "<b>1<sup>∞</sup></b>: lím f<sup>g</sup> = e<sup>L</sup> con L = lím g·(f − 1). Solo si la base tiende exactamente a 1. <b>Notables</b>: sen u/u → 1; (1 − cos u)/u² → 1/2; tg u/u → 1; (eᵘ − 1)/u → 1; ln(1 + u)/u → 1.",
    "<b>Laterales</b>: existe lím<sub>x→a</sub> f ⟺ los dos laterales existen y son iguales. Imprescindibles con |·|, funciones a trozos y 1/x en exponentes. Con x → −∞, √(x²) = |x| = −x.",
    "<b>Continuidad en a</b>: existe f(a), existe el límite y coinciden. Discontinuidad <b>evitable</b> (límite finito ≠ f(a) o f(a) no existe), de <b>salto finito</b> (laterales finitos y distintos), de <b>salto infinito</b> (algún lateral ±∞). Las funciones elementales son continuas en su dominio: solo hay que revisar los puntos fuera del dominio y los empalmes.",
    "<b>Parámetros</b>: cada empalme da una ecuación (lateral izquierdo = lateral derecho = f(a)); resolver y comprobar. Si hay un 0/0 con parámetro, el numerador debe anularse en ese punto.",
    "<b>Asíntotas</b>: vertical x = a si algún lateral es ±∞ (candidatos: ceros del denominador y bordes del dominio). Horizontal y = L si lím<sub>±∞</sub> f = L. Oblicua y = mx + n con m = lím f/x ≠ 0 finito y n = lím (f − mx); en una racional, es el cociente de la división. Cada lado (+∞, −∞) se estudia aparte; si hay horizontal en un lado, no hay oblicua en ese lado.",
    "<b>Bolzano</b>: f continua en [a, b] y f(a)·f(b) &lt; 0 ⟹ existe c ∈ (a, b) con f(c) = 0 (al menos una). Se redacta: definir f = izquierda − derecha, continuidad, signos, conclusión. Valores intermedios: f continua en [a, b] toma todos los valores entre f(a) y f(b). <b>Weierstrass</b>: f continua en [a, b] cerrado ⟹ alcanza máximo y mínimo absolutos."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«lím<sub>x→∞</sub> (√(x²+1) − x) = ∞ − ∞ = 0, porque un infinito se cancela con otro». ¿Qué falla?",
          op: ["Nada, está bien", "∞ − ∞ es una indeterminación: no vale 0 por sí sola. Hay que multiplicar por el conjugado; aquí sale 0, pero por otra razón", "Debería dar ∞", "Debería dar 1"], ok: 1,
          porque: "∞ − ∞ puede valer cualquier cosa: (x + 1) − x → 1, (2x) − x → ∞, (x) − (x + 3) → −3. El resultado depende de cómo se acercan. Con el conjugado: 1/(√(x²+1) + x) → 0." },
        { q: "«(1 + 1/x)ˣ es 1 elevado a algo, luego vale 1». ¿Qué falla?",
          op: ["Nada", "Es la indeterminación 1<sup>∞</sup>: la base solo tiende a 1, nunca es 1 exactamente, y el exponente crece. El límite es e", "Vale 0", "Vale ∞"], ok: 1,
          porque: "1<sup>∞</sup> no vale 1: (1 + 1/x)ˣ → e ≈ 2,718. La base es ligeramente mayor que 1, y elevada a un exponente enorme da un efecto que no se anula." },
        { q: "«lím<sub>x→2</sub> 1/(x − 2) = ∞». ¿Qué falla?",
          op: ["Nada", "Los laterales son distintos: −∞ por la izquierda y +∞ por la derecha, así que el límite no existe", "El límite es 0", "Es una indeterminación"], ok: 1,
          porque: "k/0 no es una indeterminación, pero el signo depende del lado. Sin laterales iguales no hay límite. Solo escribirías lím = +∞ si los dos laterales dieran +∞ (como en 1/(x − 2)²)." },
        { q: "«f(x) = 1/x cumple f(−1) = −1 &lt; 0 y f(1) = 1 &gt; 0, luego por Bolzano tiene una raíz en (−1, 1)». ¿Qué falla?",
          op: ["Nada", "f no es continua en [−1, 1] (no está definida en 0): falta una hipótesis y la conclusión es falsa", "f(−1)·f(1) debería ser positivo", "Bolzano exige intervalo abierto"], ok: 1,
          porque: "Bolzano necesita continuidad en todo el intervalo cerrado. 1/x salta de −∞ a +∞ en 0 sin pasar por 0, y no tiene ninguna raíz." },
        { q: "«lím<sub>x→−∞</sub> √(x² + 3x)/x = 1, porque √(x²) = x». ¿Qué falla?",
          op: ["Nada", "√(x²) = |x|, y para x &lt; 0 vale −x: el límite es −1", "El límite es 0", "El límite es ∞"], ok: 1,
          porque: "√(x² + 3x)/x = √(1 + 3/x)·|x|/x. Con x &lt; 0, |x|/x = −1, y el límite vale −1." },
        { q: "«En x = 1, lím f = 2 y f(1) no existe, así que es una discontinuidad de salto». ¿Qué falla?",
          op: ["Nada", "Si el límite existe y es finito, y no coincide con f(1) (o f(1) no existe), es una discontinuidad evitable, no de salto", "Es de salto infinito", "Es continua"], ok: 1,
          porque: "El salto exige que los laterales sean finitos y distintos. Aquí los dos laterales valen 2 (el límite existe): solo falta el valor puntual." },
        { q: "«f(x) = (2x² + 1)/(x² − 1) tiene asíntota horizontal y = 2 y además asíntota oblicua». ¿Qué falla?",
          op: ["Nada", "Si hay horizontal en un lado no puede haber oblicua en ese lado; además aquí los grados son iguales y no hay oblicua", "La horizontal es y = 1", "No hay ninguna asíntota"], ok: 1,
          porque: "En +∞ (y en −∞) una función tiene a lo sumo una asíntota no vertical. Con grados iguales, lím f/x = 0 y no hay oblicua." },
        { q: "Para que f(x) = { x + k si x &lt; 1 ; 3 si x = 1 ; 5 − x si x &gt; 1 } sea continua en 1 se plantea 1 + k = 5 − 1. ¿Qué falla?",
          op: ["Nada", "Se ha olvidado el valor f(1) = 3: hay que igualar también con él, y entonces 1 + k = 3 y 5 − 1 = 4 no coinciden: no existe k que la haga continua", "k debería ser 0", "Hay que derivar"], ok: 1,
          porque: "La continuidad exige tres cosas iguales: lateral izquierdo, lateral derecho y f(1). El lateral derecho vale 4 ≠ 3 = f(1), así que ningún k lo arregla." },
        { q: "«f(x) = x en (0, 1) es continua, luego por Weierstrass tiene máximo y mínimo». ¿Qué falla?",
          op: ["Nada", "El intervalo es abierto: Weierstrass pide cerrado. Aquí f no alcanza ni 0 ni 1", "f no es continua", "Weierstrass es solo para polinomios de grado 2"], ok: 1,
          porque: "Los valores 0 y 1 solo se alcanzarían en los extremos 0 y 1, que no pertenecen a (0, 1). En el cerrado [0, 1] sí hay mínimo 0 y máximo 1." },
        { q: "«lím<sub>x→0</sub> sen(3x)/x = 0/0 = 0». ¿Qué falla?",
          op: ["Nada", "0/0 es indeterminación: aplicando el límite notable sen u/u → 1 con u = 3x, sale 3", "Vale 1", "No existe"], ok: 1,
          porque: "sen(3x)/x = 3·sen(3x)/(3x) → 3·1 = 3. 0/0 no tiene valor propio." }
      ]
    },
    quiz1: {
      titulo: "Test de límites y continuidad",
      preguntas: [
        { q: "lím<sub>x→+∞</sub> (5x² − 3)/(2x² + x) vale", op: ["5/2", "0", "+∞", "5"], ok: 0, porque: "Mismo grado: cociente de coeficientes principales, 5/2." },
        { q: "Para resolver lím<sub>x→+∞</sub> (√(x²+1) − x) se usa", op: ["El conjugado", "Dividir entre x² sin más", "Sustituir x = 0", "Factorizar"], ok: 0, porque: "∞ − ∞ con raíz: multiplicar y dividir por √(x²+1) + x. El resultado es 0." },
        { q: "lím<sub>x→0</sub> sen(4x)/(2x) vale", op: ["2", "4", "1", "0"], ok: 0, porque: "= 2·sen(4x)/(4x) → 2·1 = 2." },
        { q: "lím<sub>x→+∞</sub> (1 + 1/x)<sup>3x</sup> vale", op: ["e³", "e", "3", "1"], ok: 0, porque: "L = lím 3x·(1/x) = 3, resultado e³." },
        { q: "f(x) = (x² − 9)/(x − 3) en x = 3 presenta una discontinuidad", op: ["Evitable", "De salto finito", "De salto infinito", "Esencial"], ok: 0, porque: "= x + 3 para x ≠ 3, el límite vale 6 y f(3) no existe." },
        { q: "Las asíntotas verticales de f(x) = 1/(x² − 1) son", op: ["x = 1 y x = −1", "Solo x = 1", "y = 0", "No tiene"], ok: 0, porque: "El denominador se anula en ±1 y el numerador no." },
        { q: "La asíntota oblicua de f(x) = (3x² + 1)/(x − 2) es", op: ["y = 3x + 6", "y = 3x", "y = 3x − 6", "y = x + 6"], ok: 0, porque: "Ruffini con 2: 3, 6, 13. Cociente 3x + 6." },
        { q: "Bolzano exige", op: ["f continua en [a, b] y f(a)·f(b) &lt; 0", "f derivable en (a, b)", "f(a) = f(b)", "f creciente"], ok: 0, porque: "Esas son las dos hipótesis." },
        { q: "Weierstrass asegura que una función continua en [a, b]", op: ["alcanza máximo y mínimo absolutos", "tiene una raíz", "es derivable", "es monótona"], ok: 0, porque: "En un intervalo cerrado y acotado, una función continua alcanza sus valores máximo y mínimo." },
        { q: "lím<sub>x→0⁻</sub> 1/x vale", op: ["−∞", "+∞", "0", "No existe (oscila)"], ok: 0, porque: "x es negativo y pequeño: 1/x es negativo y grande en valor absoluto." },
        { q: "Para que f(x) = { x + k si x &lt; 1 ; 3 si x ≥ 1 } sea continua, k vale", op: ["2", "1", "3", "0"], ok: 0, porque: "1 + k = 3 ⟹ k = 2." },
        { q: "lím<sub>x→+∞</sub> eˣ/x⁵ vale", op: ["+∞", "0", "1", "e"], ok: 0, porque: "La exponencial crece más que cualquier potencia." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de límites y continuidad",
      cartas: [
        { a: "Indeterminaciones", b: "0/0 · ∞/∞ · ∞ − ∞ · 0·∞ · 1^∞ · ∞^0 · 0^0. «k/0» no lo es." },
        { a: "∞/∞ y 0/0 con polinomios", b: "∞/∞: dividir por la mayor potencia. 0/0: factorizar y simplificar el factor que se anula." },
        { a: "∞ − ∞ con raíces", b: "Multiplicar y dividir por el conjugado. Con x → −∞ recuerda √(x²) = −x." },
        { a: "Fórmula del número e", b: "f → 1, g → ∞: lím f^g = e^L con L = lím g·(f − 1)." },
        { a: "Límites notables (u → 0)", b: "sen u/u → 1 · (1 − cos u)/u² → 1/2 · tg u/u → 1 · (eᵘ − 1)/u → 1 · ln(1+u)/u → 1." },
        { a: "Continuidad en a", b: "Existe f(a), existe lím f y son iguales." },
        { a: "Tipos de discontinuidad", b: "Evitable: límite finito ≠ f(a). Salto finito: laterales finitos y distintos. Salto infinito: algún lateral ±∞." },
        { a: "Asíntotas", b: "Vertical x = a: lím = ±∞. Horizontal y = L: lím en ±∞. Oblicua y = mx + n: m = lím f/x, n = lím (f − mx)." },
        { a: "Parámetros y continuidad", b: "En cada empalme: lateral izquierdo = lateral derecho = f(a). Resolver y comprobar." },
        { a: "Teorema de Bolzano", b: "f continua en [a, b], f(a)·f(b) < 0 ⟹ existe c ∈ (a, b) con f(c) = 0." },
        { a: "Teorema de Weierstrass", b: "f continua en [a, b] ⟹ alcanza máximo y mínimo absolutos en [a, b]." },
        { a: "Jerarquía de infinitos", b: "ln x ≪ xⁿ ≪ aˣ (a > 1)." }
      ]
    },
    empar: {
      titulo: "Límite y resultado",
      consigna: "Une cada límite con su valor.",
      pares: [
        ["lím<sub>x→+∞</sub> (3x² + 1)/(x² − 5)", "3"],
        ["lím<sub>x→0</sub> sen(5x)/x", "5"],
        ["lím<sub>x→0</sub> (1 − cos x)/x²", "1/2"],
        ["lím<sub>x→+∞</sub> (1 + 2/x)<sup>x</sup>", "e²"],
        ["lím<sub>x→+∞</sub> (x⁴ + 1)/eˣ", "0"],
        ["lím<sub>x→2⁻</sub> 1/(x − 2)", "−∞"]
      ]
    },
    clas: {
      titulo: "¿Qué técnica uso?",
      consigna: "Toca cada límite y elige la técnica que lo resuelve.",
      categorias: ["Factorizar", "Conjugado", "Dividir por la mayor potencia", "Número e"],
      items: [
        { t: "lím<sub>x→3</sub> (x² − 9)/(x − 3)", c: 0 },
        { t: "lím<sub>x→1</sub> (x² − 3x + 2)/(x² − 1)", c: 0 },
        { t: "lím<sub>x→4</sub> (√x − 2)/(x − 4)", c: 1 },
        { t: "lím<sub>x→+∞</sub> (√(x² + x) − x)", c: 1 },
        { t: "lím<sub>x→+∞</sub> (2x³ − x)/(x³ + 5)", c: 2 },
        { t: "lím<sub>x→+∞</sub> (3ˣ + 1)/(3ˣ⁺¹ − 2)", c: 2 },
        { t: "lím<sub>x→+∞</sub> ((x + 1)/(x − 1))ˣ", c: 3 },
        { t: "lím<sub>x→0</sub> (1 + 2x)<sup>1/x</sup>", c: 3 }
      ]
    },
    orden: {
      titulo: "Resolver un límite",
      consigna: "Ordena los pasos para resolver un límite con rigor.",
      items: [
        { t: "Sustituir el valor al que tiende x", nota: "Si sale un número o ±∞ claro, terminas." },
        { t: "Identificar el tipo de indeterminación", nota: "0/0, ∞/∞, ∞ − ∞, 0·∞ o 1^∞." },
        { t: "Aplicar la técnica del tipo", nota: "Factorizar, conjugado, dividir, e^L." },
        { t: "Si hay k/0 o un valor absoluto, calcular los laterales", nota: "Con signos a cada lado." },
        { t: "Calcular el límite de lo que queda", nota: "Ya sin indeterminación." },
        { t: "Comprobar con una tabla de valores cercanos", nota: "Seguridad en el resultado." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function opc(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var TIPOS = ["Evitable", "Salto finito", "Salto infinito", "Continua"];

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "e01", nivel: 1, enunciado: "Calcula lím<sub>x→+∞</sub> (4x³ − 2x)/(x³ + 7).", check: num("Límite =", 4),
      pistas: ["Mismo grado arriba y abajo."], pasos: ["Dividimos entre x³: (4 − 2/x²)/(1 + 7/x³) → 4/1.", "El límite es 4."], resultado: "4" },
    { id: "e02", nivel: 1, enunciado: "Calcula lím<sub>x→2</sub> (x² − 4)/(x − 2).", check: num("Límite =", 4),
      pistas: ["x² − 4 = (x − 2)(x + 2)."], pasos: ["0/0. Factorizando: (x − 2)(x + 2)/(x − 2) = x + 2.", "lím<sub>x→2</sub> (x + 2) = 4."], resultado: "4" },
    { id: "e03", nivel: 1, enunciado: "Calcula lím<sub>x→3</sub> (x² − 9)/(x² − x − 6).", check: num("Límite =", 1.2),
      pistas: ["x² − x − 6 = (x − 3)(x + 2)."], pasos: ["0/0. Numerador (x − 3)(x + 3); denominador (x − 3)(x + 2).", "Simplificando: (x + 3)/(x + 2) → 6/5."], resultado: "6/5" },
    { id: "e04", nivel: 1, enunciado: "Calcula lím<sub>x→+∞</sub> (2x + 1)/√(x² + 3) y lím<sub>x→−∞</sub> (2x + 1)/√(x² + 3).", check: [num("En +∞ =", 2), num("En −∞ =", -2)],
      pistas: ["Para x &lt; 0, √(x²) = −x."], pasos: ["En +∞ dividimos entre x &gt; 0: (2 + 1/x)/√(1 + 3/x²) → 2.", "En −∞, √(x²+3)/x = −√(1 + 3/x²) → −1, luego el límite es 2/(−1) = −2."], resultado: "2 y −2" },
    { id: "e05", nivel: 1, enunciado: "Calcula lím<sub>x→+∞</sub> (2x³ − x)/(5x³ + 4x²).", check: num("Límite =", 0.4),
      pistas: ["Cociente de coeficientes principales."], pasos: ["Dividimos entre x³: (2 − 1/x²)/(5 + 4/x) → 2/5."], resultado: "2/5" },
    { id: "e06", nivel: 1, enunciado: "¿Cuánto vale lím<sub>x→1</sub> 2/(x − 1)²?", check: opc("Límite", ["+∞", "−∞", "No existe", "0"], 0),
      pistas: ["El denominador es positivo por los dos lados."], pasos: ["Numerador 2 &gt; 0, denominador (x − 1)² → 0⁺ por ambos lados.", "Los dos laterales valen +∞."], resultado: "+∞" },
    { id: "e07", nivel: 1, enunciado: "Calcula lím<sub>x→0</sub> (√(x + 4) − 2)/x.", check: num("Límite =", 0.25),
      pistas: ["Multiplica por el conjugado √(x+4) + 2."], pasos: ["0/0. Numerador por el conjugado: (x + 4) − 4 = x.", "Queda x/(x(√(x+4) + 2)) = 1/(√(x+4) + 2) → 1/4."], resultado: "1/4" },
    { id: "e08", nivel: 1, enunciado: "Halla la asíntota horizontal de f(x) = (3x − 1)/(x + 2): y = ...", check: num("y =", 3),
      pistas: ["Mismo grado: cociente de coeficientes."], pasos: ["lím<sub>x→±∞</sub> (3x − 1)/(x + 2) = 3/1 = 3.", "Asíntota horizontal y = 3."], resultado: "y = 3" },
    { id: "e09", nivel: 1, enunciado: "Halla las asíntotas verticales de f(x) = (x + 1)/(x² − 9).", check: { tipo: "lista", etiqueta: "x =", valores: [3, -3] },
      pistas: ["Ceros del denominador, comprobando el numerador."], pasos: ["x² − 9 = 0 ⟹ x = ±3. El numerador vale 4 y −2 (no nulo).", "Hay asíntotas verticales en x = 3 y x = −3."], resultado: "x = 3 y x = −3" },
    { id: "e10", nivel: 1, enunciado: "f(x) = (x² − 1)/(x − 1) para x ≠ 1. ¿Qué valor debe tener f(1) para que f sea continua en 1?", check: num("f(1) =", 2),
      pistas: ["Calcula el límite en 1."], pasos: ["Para x ≠ 1: (x − 1)(x + 1)/(x − 1) = x + 1 ⟶ 2 cuando x → 1.", "Debe ser f(1) = 2."], resultado: "2" },
    { id: "e11", nivel: 1, enunciado: "Calcula lím<sub>x→0</sub> sen(5x)/(2x).", check: num("Límite =", 2.5),
      pistas: ["Multiplica y divide por 5."], pasos: ["sen(5x)/(2x) = (5/2)·sen(5x)/(5x) → (5/2)·1 = 5/2."], resultado: "5/2" },
    { id: "e12", nivel: 1, enunciado: "Calcula lím<sub>x→0</sub> (1 − cos x)/(3x²).", check: num("Límite =", 1 / 6),
      pistas: ["(1 − cos x)/x² → 1/2."], pasos: ["= (1/3)·(1 − cos x)/x² → (1/3)·(1/2) = 1/6."], resultado: "1/6" },
    { id: "e13", nivel: 1, enunciado: "Calcula lím<sub>x→+∞</sub> (x − √(x² − 4x)).", check: num("Límite =", 2),
      pistas: ["∞ − ∞ con raíz: conjugado x + √(x² − 4x)."], pasos: ["Numerador: x² − (x² − 4x) = 4x.", "4x/(x + √(x² − 4x)); dividiendo entre x: 4/(1 + √(1 − 4/x)) → 4/2 = 2."], resultado: "2" },
    { id: "e14", nivel: 1, enunciado: "Calcula lím<sub>x→+∞</sub> (1 + 4/x)<sup>x</sup>.", check: num("Límite =", Math.exp(4)),
      pistas: ["Es 1<sup>∞</sup>: e<sup>L</sup> con L = lím x·(4/x)."], pasos: ["L = lím x·(4/x) = 4.", "Resultado e⁴ ≈ 54,598."], resultado: "e⁴ ≈ 54,598" },
    // ---------------------------------------------------------------- ★★
    { id: "e15", nivel: 2, enunciado: "Calcula lím<sub>x→+∞</sub> (√(x² + 5x) − x).", check: num("Límite =", 2.5),
      pistas: ["Conjugado."], pasos: ["= 5x/(√(x² + 5x) + x).", "Dividiendo entre x: 5/(√(1 + 5/x) + 1) → 5/2."], resultado: "5/2" },
    { id: "e16", nivel: 2, enunciado: "Calcula lím<sub>x→+∞</sub> ((x + 1)/(x − 2))<sup>x</sup>.", check: num("Límite =", Math.exp(3)),
      pistas: ["Base → 1: e<sup>L</sup> con L = lím x·(f − 1)."], pasos: ["f − 1 = (x + 1)/(x − 2) − 1 = 3/(x − 2).", "L = lím x·3/(x − 2) = 3. Resultado e³ ≈ 20,086."], resultado: "e³ ≈ 20,086" },
    { id: "e17", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> (1 + 2x)<sup>3/x</sup>.", check: num("Límite =", Math.exp(6)),
      pistas: ["Exponente 3/x → ∞ cuando x → 0⁺."], pasos: ["L = lím (3/x)·(2x) = 6.", "Resultado e⁶ ≈ 403,43."], resultado: "e⁶ ≈ 403,43" },
    { id: "e18", nivel: 2, enunciado: "Calcula lím<sub>x→+∞</sub> x·sen(3/x).", check: num("Límite =", 3),
      pistas: ["Cambia t = 1/x."], pasos: ["0·∞. Con t = 1/x → 0⁺: sen(3t)/t = 3·sen(3t)/(3t) → 3."], resultado: "3" },
    { id: "e19", nivel: 2, enunciado: "Calcula lím<sub>x→2</sub> (1/(x − 2) − 4/(x² − 4)).", check: num("Límite =", 0.25),
      pistas: ["Común denominador x² − 4."], pasos: ["= ((x + 2) − 4)/(x² − 4) = (x − 2)/((x − 2)(x + 2)) = 1/(x + 2).", "→ 1/4."], resultado: "1/4" },
    { id: "e20", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> (√(1 + x) − √(1 − x))/x.", check: num("Límite =", 1),
      pistas: ["Conjugado: suma de las dos raíces."], pasos: ["Numerador: (1 + x) − (1 − x) = 2x.", "2x/(x(√(1+x) + √(1−x))) = 2/(√(1+x) + √(1−x)) → 2/2 = 1."], resultado: "1" },
    { id: "e21", nivel: 2, enunciado: "Calcula lím<sub>x→2</sub> (x³ − 8)/(x² − 4).", check: num("Límite =", 3),
      pistas: ["x³ − 8 = (x − 2)(x² + 2x + 4)."], pasos: ["= (x² + 2x + 4)/(x + 2) → 12/4 = 3."], resultado: "3" },
    { id: "e22", nivel: 2, enunciado: "Calcula lím<sub>x→0</sub> tg(3x)/(2x).", check: num("Límite =", 1.5),
      pistas: ["tg u/u → 1."], pasos: ["= (3/2)·tg(3x)/(3x) → 3/2."], resultado: "3/2" },
    { id: "e23", nivel: 2, enunciado: "Calcula lím<sub>x→+∞</sub> (4<sup>x+1</sup> + 2ˣ)/(2·4ˣ − 1).", check: num("Límite =", 2),
      pistas: ["4<sup>x+1</sup> = 4·4ˣ; divide entre 4ˣ."], pasos: ["Dividiendo entre 4ˣ: (4 + (1/2)ˣ)/(2 − 1/4ˣ).", "→ 4/2 = 2."], resultado: "2" },
    { id: "e24", nivel: 2, enunciado: "Halla la asíntota oblicua y = mx + n de f(x) = (3x² − x + 2)/(x + 1).", check: [num("m =", 3), num("n =", -4)],
      pistas: ["Divide con Ruffini por −1."], pasos: ["Ruffini con −1: 3, −1, 2 ⟶ 3, −4, 6. Cociente 3x − 4, resto 6.", "f = 3x − 4 + 6/(x + 1) ⟹ y = 3x − 4."], resultado: "y = 3x − 4" },
    { id: "e25", nivel: 2, enunciado: "Para f(x) = (x² − 2x)/(x² − 1), da la asíntota horizontal y = ... y las verticales.", check: [num("y =", 1), { tipo: "lista", etiqueta: "Verticales x =", valores: [1, -1] }],
      pistas: ["Mismo grado ⟹ horizontal; denominador (x − 1)(x + 1)."], pasos: ["Horizontal: 1/1 = 1.", "Verticales: x = ±1 (el numerador vale −1 y 3, no nulo)."], resultado: "y = 1; x = 1 y x = −1" },
    { id: "e26", nivel: 2, enunciado: "Sea f(x) = (x² + x − 6)/(x² − 9). Calcula lím<sub>x→−3</sub> f y clasifica la discontinuidad de f en x = 3.", check: [num("lím<sub>x→−3</sub> f =", 5 / 6), opc("En x = 3", TIPOS, 2)],
      pistas: ["Factoriza: (x + 3)(x − 2)/((x − 3)(x + 3))."], pasos: ["Simplificando (x ≠ −3): (x − 2)/(x − 3). En x = −3: (−5)/(−6) = 5/6 (evitable).", "En x = 3: numerador 1 ≠ 0, denominador → 0: salto infinito."], resultado: "5/6; salto infinito" },
    { id: "e27", nivel: 2, enunciado: "Halla a para que f(x) = { x² + a si x &lt; 1 ; 3x + 1 si x ≥ 1 } sea continua.", check: num("a =", 3),
      pistas: ["Igualar los dos trozos en x = 1."], pasos: ["Lateral izquierdo: 1 + a. Valor y lateral derecho: 3 + 1 = 4.", "1 + a = 4 ⟹ a = 3."], resultado: "3" },
    { id: "e28", nivel: 2, enunciado: "f(x) = (√(2x + 1) − 3)/(x − 4) para x ≠ 4. ¿Qué valor k = f(4) la hace continua?", check: num("k =", 1 / 3),
      pistas: ["Conjugado: √(2x+1) + 3."], pasos: ["Numerador: (2x + 1) − 9 = 2(x − 4).", "f = 2/(√(2x + 1) + 3) → 2/6 = 1/3. k = 1/3."], resultado: "1/3" },
    { id: "e29", nivel: 2, enunciado: "La ecuación x³ − 3x + 1 = 0 tiene tres raíces reales. Da los extremos izquierdos n de los tres intervalos [n, n + 1] enteros donde Bolzano las localiza.", check: { tipo: "lista", etiqueta: "n =", valores: [-2, 0, 1] },
      pistas: ["Tabla de f(n) para n de −2 a 2."], pasos: ["f(−2) = −1, f(−1) = 3, f(0) = 1, f(1) = −1, f(2) = 3.", "Cambios de signo en [−2, −1], [0, 1] y [1, 2]: n = −2, 0 y 1."], resultado: "−2, 0 y 1" },
    { id: "e30", nivel: 2, enunciado: "Aplicando bisección a f(x) = x³ − 2x − 5 en [2, 3]: calcula f(2,5) y di en qué mitad está la raíz.", check: [num("f(2,5) =", 5.625), opc("Mitad", ["[2; 2,5]", "[2,5; 3]", "No se sabe", "Ninguna"], 0)],
      pistas: ["f(2) = −1 y f(3) = 16."], pasos: ["f(2,5) = 15,625 − 5 − 5 = 5,625 &gt; 0.", "f(2) &lt; 0 y f(2,5) &gt; 0: cambio de signo en [2; 2,5]."], resultado: "5,625; [2; 2,5]" },
    // ---------------------------------------------------------------- ★★★
    { id: "e31", nivel: 3, enunciado: "Halla a y b para que f(x) = { x + 2 si x &lt; −1 ; ax + b si −1 ≤ x ≤ 1 ; 3 − x si x &gt; 1 } sea continua en ℝ.", check: [num("a =", 0.5), num("b =", 1.5)],
      pistas: ["Dos empalmes ⟹ dos ecuaciones."], pasos: ["En x = −1: −a + b = −1 + 2 = 1.", "En x = 1: a + b = 3 − 1 = 2.", "Sumando: 2b = 3 ⟹ b = 3/2 y a = 1/2."], resultado: "a = 1/2, b = 3/2" },
    { id: "e32", nivel: 3, enunciado: "Halla a y b para que f(x) = { sen(ax)/x si x &lt; 0 ; 6 si x = 0 ; b·cos x + 1 si x &gt; 0 } sea continua en ℝ.", check: [num("a =", 6), num("b =", 5)],
      pistas: ["Límite notable sen u/u → 1."], pasos: ["Izquierda: lím sen(ax)/x = a = f(0) = 6.", "Derecha: lím (b cos x + 1) = b + 1 = 6 ⟹ b = 5."], resultado: "a = 6, b = 5" },
    { id: "e33", nivel: 3, enunciado: "Calcula lím<sub>x→0</sub> (cos 2x)<sup>1/x²</sup>.", check: num("Límite =", Math.exp(-2)),
      pistas: ["1<sup>∞</sup>. L = lím (cos 2x − 1)/x²."], pasos: ["L = −lím (1 − cos 2x)/x² = −4·(1/2) = −2.", "Resultado e⁻² ≈ 0,1353."], resultado: "e⁻² ≈ 0,1353" },
    { id: "e34", nivel: 3, enunciado: "Calcula lím<sub>x→+∞</sub> (√(x² + 3x) − √(x² − x)).", check: num("Límite =", 2),
      pistas: ["Conjugado: suma de las dos raíces."], pasos: ["Numerador: (x² + 3x) − (x² − x) = 4x.", "4x/(√(x²+3x) + √(x²−x)) → 4/(1 + 1) = 2."], resultado: "2" },
    { id: "e35", nivel: 3, enunciado: "Calcula lím<sub>x→+∞</sub> ((x² + 1)/(x² − 1))<sup>x²</sup>.", check: num("Límite =", Math.exp(2)),
      pistas: ["f − 1 = 2/(x² − 1)."], pasos: ["L = lím x²·2/(x² − 1) = 2.", "Resultado e² ≈ 7,389."], resultado: "e² ≈ 7,389" },
    { id: "e36", nivel: 3, enunciado: "Estudia las asíntotas de f(x) = (2x³ − x² + 1)/(x² + x): da las verticales y la oblicua y = mx + n.", check: [{ tipo: "lista", etiqueta: "Verticales x =", valores: [0, -1] }, num("m =", 2), num("n =", -3)],
      pistas: ["Denominador x(x + 1). Divide el numerador entre x² + x."], pasos: ["Verticales: x = 0 y x = −1. El numerador vale 1 y −2 (no nulo) en ellos.", "Oblicua: m = lím f/x = 2. n = lím (f − 2x) = lím (−3x² + 1)/(x² + x) = −3.", "Asíntota y = 2x − 3."], resultado: "x = 0, x = −1; y = 2x − 3" },
    { id: "e37", nivel: 3, enunciado: "Se quiere aplicar Bolzano a f(x) = 1/(x − 1) en [0, 2], donde f(0) = −1 y f(2) = 1. ¿Qué hipótesis no se cumple?", check: opc("Hipótesis", ["f no es continua en [0, 2] (falla en x = 1)", "f(0) y f(2) tienen el mismo signo", "El intervalo no es cerrado", "Todas se cumplen"], 0),
      pistas: ["Mira dónde no está definida."], pasos: ["Los signos son opuestos, pero f no está definida en x = 1 ∈ [0, 2], luego no es continua en el intervalo. Bolzano no se puede aplicar (y f no tiene raíces)."], resultado: "No es continua en [0, 2]" },
    { id: "e38", nivel: 3, enunciado: "Demuestra que la ecuación x·eˣ = 1 tiene al menos una solución en (0, 1).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Define f(x) = x·eˣ − 1", p: 0.5 }, { t: "Justifica que f es continua en [0, 1] (producto y suma de funciones continuas)", p: 0.5 },
        { t: "Calcula f(0) = −1 &lt; 0 y f(1) = e − 1 &gt; 0", p: 0.5 }, { t: "Concluye con el teorema de Bolzano: existe c ∈ (0, 1) con f(c) = 0", p: 0.5 }] },
      pasos: ["f(x) = x·eˣ − 1 es continua en ℝ, en particular en [0, 1].", "f(0) = 0 − 1 = −1 &lt; 0 y f(1) = e − 1 ≈ 1,718 &gt; 0.", "Por Bolzano existe c ∈ (0, 1) con f(c) = 0, es decir, c·e<sup>c</sup> = 1. ∎"], resultado: "Existe c ∈ (0, 1)" },
    { id: "e39", nivel: 3, enunciado: "¿Qué tipo de discontinuidad tiene f(x) = e<sup>1/x</sup> en x = 0?", check: opc("Tipo", TIPOS, 2),
      pistas: ["Calcula los dos laterales."], pasos: ["x → 0⁺: 1/x → +∞ y eˣ → +∞. x → 0⁻: 1/x → −∞ y e<sup>1/x</sup> → 0.", "Un lateral es +∞: salto infinito (asíntota vertical por la derecha)."], resultado: "Salto infinito" },
    { id: "e40", nivel: 3, enunciado: "Sea f(x) = (x² − 4x)/|x − 4|. Calcula el salto en x = 4: |lím<sub>x→4⁺</sub> f − lím<sub>x→4⁻</sub> f|.", check: num("Salto =", 8),
      pistas: ["x² − 4x = x(x − 4) y |x − 4| cambia de signo."], pasos: ["Para x &gt; 4: x(x − 4)/(x − 4) = x ⟶ 4. Para x &lt; 4: x(x − 4)/(−(x − 4)) = −x ⟶ −4.", "Salto: |4 − (−4)| = 8 (salto finito)."], resultado: "8" },
    { id: "e41", nivel: 3, enunciado: "Halla a para que lím<sub>x→1</sub> (x² + ax + 2)/(x − 1) sea finito y calcula ese límite.", check: [num("a =", -3), num("Límite =", -1)],
      pistas: ["El numerador debe anularse en x = 1."], pasos: ["Con x = 1: 1 + a + 2 = 0 ⟹ a = −3.", "x² − 3x + 2 = (x − 1)(x − 2) ⟹ el cociente es x − 2 → −1."], resultado: "a = −3; límite −1" },
    { id: "e42", nivel: 3, enunciado: "Halla a para que lím<sub>x→+∞</sub> (√(x² + ax + 1) − x) = 3.", check: num("a =", 6),
      pistas: ["Conjugado: el límite vale a/2."], pasos: ["= (ax + 1)/(√(x² + ax + 1) + x) → a/2.", "a/2 = 3 ⟹ a = 6."], resultado: "6" },
    { id: "e43", nivel: 3, enunciado: "f(x) = (ax² + bx + 1)/(x − 1) tiene como asíntota oblicua y = 2x + 5. Halla a y b.", check: [num("a =", 2), num("b =", 3)],
      pistas: ["m = a; n = lím (f − mx)."], pasos: ["m = lím f/x = a = 2.", "n = lím (2x² + bx + 1 − 2x² + 2x)/(x − 1) = lím ((b + 2)x + 1)/(x − 1) = b + 2 = 5 ⟹ b = 3."], resultado: "a = 2, b = 3" },
    { id: "e44", nivel: 3, enunciado: "Halla el máximo y el mínimo absolutos de f(x) = x³ − 3x en [0, 2] (Weierstrass lo garantiza).", check: [num("Máximo =", 2), num("Mínimo =", -2)],
      pistas: ["f'(x) = 3x² − 3 se anula en x = 1; compara con los extremos."], pasos: ["f(0) = 0, f(2) = 8 − 6 = 2, f(1) = 1 − 3 = −2.", "Máximo absoluto 2 (en x = 2) y mínimo absoluto −2 (en x = 1)."], resultado: "máximo 2, mínimo −2" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Cada indeterminación, su técnica", ancha: true,
      tabla: { cab: ["Tipo", "Qué hacer"], filas: [
        ["∞/∞", "Dividir por la mayor potencia (o jerarquía de infinitos)"],
        ["0/0", "Factorizar · conjugado · límite notable"],
        ["∞ − ∞", "Conjugado (raíces) · común denominador"],
        ["0·∞", "Pasar a cociente"],
        ["1^∞", "e^L con L = lím g·(f − 1)"],
        ["k/0", "No es indeterminación: laterales y signos"]
      ] },
      nota: "Notables: sen u/u → 1 · (1 − cos u)/u² → 1/2 · tg u/u → 1 · (eᵘ − 1)/u → 1." },
    { titulo: "Continuidad y asíntotas",
      tabla: { cab: ["Concepto", "Condición"], filas: [
        ["Continua en a", "∃f(a), ∃lím, iguales"],
        ["Evitable", "Lím finito ≠ f(a)"],
        ["Salto finito", "Laterales finitos distintos"],
        ["Salto infinito", "Algún lateral ±∞"],
        ["A. vertical x = a", "Algún lateral ±∞"],
        ["A. horizontal y = L", "lím<sub>±∞</sub> f = L"],
        ["A. oblicua y = mx + n", "m = lím f/x, n = lím (f − mx)"]
      ] },
      nota: "Estudia +∞ y −∞ por separado." },
    { titulo: "Bolzano y Weierstrass",
      items: [
        "<b>Bolzano</b>: f continua en [a, b] y f(a)·f(b) &lt; 0 ⟹ ∃c ∈ (a, b), f(c) = 0.",
        "<b>Valores intermedios</b>: f continua en [a, b] toma todos los valores entre f(a) y f(b).",
        "<b>Weierstrass</b>: f continua en [a, b] ⟹ máximo y mínimo absolutos.",
        "Redacción: definir f, continuidad, signos, conclusión."
      ], nota: "Bolzano da «al menos una» raíz, no «una sola»." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "∞ − ∞ = 0", bien: "indeterminación: conjugado o común denominador", por: "Depende de cómo se acercan." },
        { mal: "(1 + 1/x)ˣ → 1", bien: "→ e", por: "1^∞ es indeterminación." },
        { mal: "1/(x − 2) → ∞ en x = 2", bien: "laterales −∞ y +∞: no existe", por: "El signo depende del lado." },
        { mal: "√(x²) = x siempre", bien: "√(x²) = |x|", por: "Cambia el resultado en −∞." },
        { mal: "Bolzano con 1/x en [−1, 1]", bien: "no es continua en el intervalo", por: "Falta una hipótesis." },
        { mal: "Olvidar f(a) al buscar parámetros", bien: "lateral izq. = lateral dcho. = f(a)", por: "Son tres cosas iguales." }
      ] }
  ];

  B.registrar("mates2", "t7", {
    resumen: resumen, secciones: B.parte.m2t7a.secciones, nuevas: B.parte.m2t7b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
