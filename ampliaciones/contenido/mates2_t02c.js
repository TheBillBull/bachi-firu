/* ============================================================
   Matemáticas II · ampliaciones · Tema 2: Determinantes
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr;
  var D = B.lab.det, M = D.mat, T = D.dtm;

  var resumen = [
    "|A| es un <b>número</b> asociado a una matriz cuadrada. 2×2: |A| = ad − bc. 3×3: Sarrus, (aei + bfg + cdh) − (ceg + bdi + afh). Para órdenes mayores: <b>hacer ceros</b> y <b>desarrollar por adjuntos</b> (por la fila o columna con más ceros): |A| = Σ a<sub>ij</sub>·A<sub>ij</sub>, con A<sub>ij</sub> = (−1)<sup>i+j</sup>·M<sub>ij</sub>.",
    "Propiedades: intercambiar dos filas cambia el signo · multiplicar <b>una</b> fila por k multiplica |A| por k · |kA| = kⁿ|A| · sumar a una fila un múltiplo de otra no cambia |A| · dos filas proporcionales o una fila de ceros ⟹ |A| = 0 · |Aᵗ| = |A| · |AB| = |A||B| · |A⁻¹| = 1/|A| · |Aⁿ| = |A|ⁿ · triangular: producto de la diagonal.",
    "Problemas «si |A| = 3, calcula…»: descompón en factores y aplica cada regla; recuerda que el número que multiplica a una matriz n×n sale elevado a <b>n</b>.",
    "<b>Rango</b> = orden del mayor menor no nulo; se calcula orlando. En una matriz cuadrada: rg = n ⟺ |A| ≠ 0.",
    "<b>Inversa</b>: A⁻¹ = Adj(A)ᵗ/|A|, con |A| ≠ 0. Orden de los pasos: determinante → adjuntos → traspuesta → dividir. En ecuaciones matriciales, AX = B ⟹ X = A⁻¹B, pero XA = B ⟹ X = BA⁻¹.",
    "<b>Con parámetro</b>: calcula |A(m)|, factoriza, resuelve |A(m)| = 0 y estudia el rango de cada valor singular por separado. <b>Geometría</b>: |det| es área (2×2) o volumen (3×3); |det| = 0 ⟺ vectores proporcionales / coplanarios / puntos alineados; el signo es la orientación."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«A es 3×3 con |A| = 5, luego |2A| = 2·5 = 10». ¿Qué falla?",
          op: ["Nada, está bien", "El 2 multiplica a las tres filas: sale 2³ = 8, y |2A| = 8·5 = 40", "|2A| = 2 + 5 = 7", "|2A| = 5/2"], ok: 1,
          porque: "Multiplicar toda la matriz por k es multiplicar cada una de sus n filas por k, y cada fila aporta un factor k: |kA| = kⁿ|A|. Solo si se multiplica <i>una</i> fila el determinante queda multiplicado por k." },
        { q: "Un alumno escribe |A + B| = |A| + |B|. ¿Qué falla?",
          op: ["Es correcto", "El determinante no es lineal respecto de la matriz entera: con A = B = I (2×2), |A + B| = |2I| = 4 pero |A| + |B| = 2", "Solo falla con matrices 3×3", "Falla porque |B| debe restarse"], ok: 1,
          porque: "Las propiedades correctas son |AB| = |A||B| (producto) y la linealidad fila a fila. La suma de matrices no tiene fórmula sencilla." },
        { q: "Para calcular el determinante de una matriz 4×4, un alumno aplica Sarrus «ampliando» la regla. ¿Qué falla?",
          op: ["Nada", "Sarrus solo vale para 3×3; en 4×4 hay que hacer ceros o desarrollar por adjuntos", "Debe usar la regla 2×2 dos veces", "Sarrus vale si hay ceros"], ok: 1,
          porque: "Una 4×4 tiene 24 productos, no 8; la regla de las diagonales no los recoge. Se desarrolla por una línea y se baja a determinantes 3×3." },
        { q: "Al invertir A = (2 1 / 5 3) un alumno obtiene (3 5 / −1 2)·(1/1) tras calcular los adjuntos 3, −5, −1, 2. ¿Qué falla?",
          op: ["Nada", "Se olvidó de trasponer la matriz de adjuntos: la inversa es (3 −1 / −5 2)", "Debía dividir entre 2", "El determinante es 0"], ok: 1,
          porque: "A⁻¹ = Adj(A)ᵗ/|A|. La adjunta es (3 −5 / −1 2); su traspuesta (3 −1 / −5 2) es la inversa, y es la que cumple A·A⁻¹ = I." },
        { q: "«Como |A| = 0, la matriz A es la matriz nula». ¿Qué falla?",
          op: ["Nada", "|A| = 0 solo dice que A es singular: por ejemplo (1 2 / 2 4) tiene |A| = 0 y no es nula", "La matriz nula tiene determinante 1", "|A| = 0 implica rango 0"], ok: 1,
          porque: "|A| = 0 ⟺ no hay inversa ⟺ rg(A) &lt; n. El rango puede ser n − 1 o menos, pero no tiene por qué ser 0." },
        { q: "De XA = B un alumno obtiene X = A⁻¹B. ¿Qué falla?",
          op: ["Nada", "Hay que multiplicar por A⁻¹ por la derecha: X = BA⁻¹, porque el producto no es conmutativo", "X = B/A", "X = A·B⁻¹"], ok: 1,
          porque: "XA·A⁻¹ = X·I = X, así que A⁻¹ se coloca a la derecha en ambos miembros. A⁻¹B sería la solución de AX = B." },
        { q: "«Hago F₂ ← 3F₂ + F₁; esa operación no cambia el determinante». ¿Qué falla?",
          op: ["Nada", "Multiplicar F₂ por 3 sí cambia el determinante (lo multiplica por 3); solo sumar un múltiplo de otra fila deja |A| igual", "Cambia el signo", "Lo divide entre 3"], ok: 1,
          porque: "F₂ ← F₂ + kF₁ es la operación segura. F₂ ← 3F₂ + F₁ equivale a multiplicar la fila 2 por 3 (|A| ×3) y luego sumar F₁ (sin efecto)." },
        { q: "Se afirma que |A⁻¹| = −|A|. ¿Qué falla?",
          op: ["Nada", "|A⁻¹| = 1/|A|: A·A⁻¹ = I, así que |A|·|A⁻¹| = 1", "|A⁻¹| = |A|", "|A⁻¹| = |A|ᵗ"], ok: 1,
          porque: "Tomando determinantes en AA⁻¹ = I se obtiene |A||A⁻¹| = |I| = 1. No hay cambio de signo, y la inversa existe solo si |A| ≠ 0." },
        { q: "Una fila se multiplica por 2 y otra por 3. Un alumno dice que |A| queda multiplicado por 5. ¿Qué falla?",
          op: ["Nada", "Los factores se multiplican: 2·3 = 6, no se suman", "Queda multiplicado por 3", "Queda multiplicado por 2/3"], ok: 1,
          porque: "Cada fila multiplicada por k aporta un factor k al determinante; los factores de distintas filas se multiplican entre sí." }
      ]
    },
    quiz1: {
      titulo: "Test del tema 2",
      preguntas: [
        { q: "El determinante de (3 −2 / 5 4) es", op: ["22", "2", "−22", "17"], ok: 0, porque: "3·4 − (−2)·5 = 12 + 10 = 22." },
        { q: "Si |A| = 4 y A es 3×3, |2A| vale", op: ["8", "32", "16", "12"], ok: 1, porque: "2³·4 = 8·4 = 32." },
        { q: "Si |A| = 5, |A⁻¹Aᵗ| vale", op: ["1", "5", "1/5", "25"], ok: 0, porque: "|A⁻¹|·|Aᵗ| = (1/5)·5 = 1." },
        { q: "Intercambiar dos columnas de una matriz", op: ["no cambia |A|", "cambia el signo de |A|", "multiplica |A| por 2", "anula |A|"], ok: 1, porque: "Es la propiedad del cambio de signo." },
        { q: "Una matriz con una fila igual a la suma de otras dos filas tiene determinante", op: ["1", "0", "el doble", "no se puede saber"], ok: 1, porque: "Es combinación lineal de las otras: al restar, aparece una fila de ceros." },
        { q: "El determinante de una matriz triangular 3×3 con diagonal 2, −1, 4 es", op: ["5", "−8", "8", "0"], ok: 1, porque: "Producto de la diagonal: 2·(−1)·4 = −8." },
        { q: "Para que A tenga inversa hace falta que", op: ["|A| = 0", "|A| ≠ 0", "A sea simétrica", "A sea triangular"], ok: 1, porque: "A⁻¹ = Adj(A)ᵗ/|A| exige dividir entre |A|." },
        { q: "En A⁻¹ = (1/|A|)·(…) el paréntesis es", op: ["Adj(A)", "Adj(A)ᵗ", "A", "Aᵗ"], ok: 1, porque: "La traspuesta de la matriz de adjuntos." },
        { q: "El rango de una matriz 3×3 con |A| = 0 es", op: ["3", "como mucho 2", "0", "exactamente 2"], ok: 1, porque: "rg &lt; 3, pero puede ser 0, 1 o 2." },
        { q: "El área del paralelogramo de lados (3, 1) y (1, 2) es", op: ["7", "5", "1", "6"], ok: 1, porque: "|3·2 − 1·1| = 5." },
        { q: "Si |A| = 3 con A de orden 4, |Adj(A)| vale", op: ["9", "27", "3", "81"], ok: 1, porque: "|Adj A| = |A|ⁿ⁻¹ = 3³ = 27." },
        { q: "En el desarrollo por adjuntos, el signo del elemento a₂₃ es", op: ["+", "−", "depende del valor", "siempre 0"], ok: 1, porque: "(−1)^{2+3} = −1." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de determinantes",
      cartas: [
        { a: "Determinante 2×2", b: "|a b / c d| = ad − bc" },
        { a: "Regla de Sarrus", b: "(aei + bfg + cdh) − (ceg + bdi + afh). Solo 3×3." },
        { a: "Adjunto de a<sub>ij</sub>", b: "A<sub>ij</sub> = (−1)<sup>i+j</sup>·M<sub>ij</sub>" },
        { a: "Desarrollo por adjuntos", b: "|A| = suma de (elementos de una línea) × (sus adjuntos). Elige la línea con más ceros." },
        { a: "|kA| en una matriz n×n", b: "kⁿ·|A|" },
        { a: "|AB|, |Aᵗ|, |A⁻¹|", b: "|A||B| · |A| · 1/|A|" },
        { a: "Operación que no cambia |A|", b: "Sumar a una fila un múltiplo de otra (F<sub>i</sub> ← F<sub>i</sub> + kF<sub>j</sub>)" },
        { a: "Matriz triangular", b: "|A| = producto de la diagonal" },
        { a: "Inversa por adjuntos", b: "A⁻¹ = Adj(A)ᵗ/|A|, con |A| ≠ 0" },
        { a: "Rango por menores", b: "Orden del mayor menor ≠ 0; se orla desde un menor no nulo" },
        { a: "Resolver XA = B", b: "X = BA⁻¹ (A⁻¹ a la derecha)" },
        { a: "Interpretación geométrica", b: "|det| = área (2×2) o volumen (3×3); 0 ⟺ proporcionales / coplanarios / alineados" }
      ]
    },
    props: {
      titulo: "Operación y efecto",
      consigna: "Une cada operación con lo que le pasa a |A|.",
      pares: [
        ["Intercambiar dos filas", "|A| cambia de signo"],
        ["Multiplicar una fila por 3", "|A| se multiplica por 3"],
        ["Sumar a F₂ el doble de F₁", "|A| no cambia"],
        ["Trasponer la matriz", "|Aᵗ| = |A|"],
        ["Multiplicar por 2 una matriz 3×3", "|A| se multiplica por 8"],
        ["Dos filas iguales", "|A| = 0"],
        ["Invertir la matriz", "|A| pasa a 1/|A|"]
      ]
    },
    cero: {
      titulo: "¿|A| = 0 o |A| ≠ 0?",
      consigna: "Toca una matriz y después elige si su determinante es cero.",
      categorias: ["|A| = 0", "|A| ≠ 0"],
      items: [
        { t: "Una fila de ceros", c: 0 }, { t: "La matriz identidad 4×4", c: 1 }, { t: "F₃ = F₁ + F₂", c: 0 },
        { t: "Triangular con diagonal 1, 2, 3", c: 1 }, { t: "Dos columnas proporcionales", c: 0 }, { t: "Una A que tiene inversa", c: 1 },
        { t: "Filas (1,2,3), (4,5,6), (7,8,9)", c: 0 }, { t: "Antisimétrica 3×3 (Aᵗ = −A)", c: 0 },
        { t: "Aᵗ, con A invertible", c: 1 }, { t: "Una A con rg(A) = n", c: 1 }
      ]
    },
    inversa: {
      titulo: "Calcular la inversa por adjuntos",
      consigna: "Ordena los pasos.",
      items: [
        { t: "Calcular |A| y comprobar que es distinto de 0" },
        { t: "Calcular los menores de cada elemento" },
        { t: "Poner el signo (−1)<sup>i+j</sup> a cada menor: matriz de adjuntos" },
        { t: "Trasponer la matriz de adjuntos" },
        { t: "Dividir entre |A|" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function lista(et, v, ph) { return { tipo: "lista", etiqueta: et, valores: v, ph: ph || "valores separados por comas" }; }
  function opcion(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "d1", nivel: 1, enunciado: "Calcula " + T([[4, -3], [2, 5]]) + ".", check: num("|A| =", 26),
      pistas: ["ad − bc."], pasos: ["4·5 − (−3)·2 = 20 + 6 = 26."], resultado: "26" },
    { id: "d2", nivel: 1, enunciado: "Calcula " + T([[-2, 3], [1, -6]]) + ".", check: num("|A| =", 9),
      pistas: ["Cuidado con (−2)(−6) = +12."], pasos: ["(−2)(−6) − 3·1 = 12 − 3 = 9."], resultado: "9" },
    { id: "d3", nivel: 1, enunciado: "Calcula por Sarrus " + T([[1, 2, 3], [0, 1, 4], [5, 6, 0]]) + ".", check: num("|A| =", 1),
      pistas: ["Suman: 1·1·0, 2·4·5, 3·0·6. Restan: 3·1·5, 2·0·0, 1·4·6."],
      pasos: ["Suman: 0 + 40 + 0 = 40.", "Restan: 15 + 0 + 24 = 39.", "|A| = 40 − 39 = 1."], resultado: "1" },
    { id: "d4", nivel: 1, enunciado: "Calcula por Sarrus " + T([[2, 0, 1], [1, 3, 2], [0, -1, 1]]) + ".", check: num("|A| =", 9),
      pistas: ["Hay un 0 y un −1: cuidado con los signos."],
      pasos: ["Suman: 2·3·1 + 0·2·0 + 1·1·(−1) = 6 + 0 − 1 = 5.", "Restan: 1·3·0 + 0·1·1 + 2·2·(−1) = 0 + 0 − 4 = −4.", "|A| = 5 − (−4) = 9."], resultado: "9" },
    { id: "d5", nivel: 1, enunciado: "Calcula " + T([[3, 5, 7], [0, -2, 1], [0, 0, 4]]) + " sin hacer Sarrus.", check: num("|A| =", -24),
      pistas: ["Es triangular superior: producto de la diagonal."], pasos: ["3·(−2)·4 = −24."], resultado: "−24" },
    { id: "d6", nivel: 1, enunciado: "Halla x para que " + T([["x", 2], [3, 4]]) + " = 0.", check: num("x =", 1.5),
      pistas: ["4x − 6 = 0."], pasos: ["4x − 2·3 = 0.", "x = 6/4 = 1,5."], resultado: "x = 3/2" },
    { id: "d7", nivel: 1, enunciado: "Sin desarrollar, ¿cuánto vale " + T([[1, 2, 3], [4, 5, 6], [5, 7, 9]]) + "?",
      check: opcion("Respuesta", ["0, porque F₃ = F₁ + F₂", "−3", "1", "No se puede saber sin calcular"], 0),
      pistas: ["Suma la fila 1 y la fila 2."], pasos: ["F₁ + F₂ = (1+4, 2+5, 3+6) = (5, 7, 9) = F₃.", "Una fila combinación de las otras ⟹ |A| = 0."], resultado: "0" },
    { id: "d8", nivel: 1, enunciado: "Si A es 2×2 con |A| = −4, calcula |3A|.", check: num("|3A| =", -36),
      pistas: ["Orden 2: el 3 sale al cuadrado."], pasos: ["|3A| = 3²·(−4) = 9·(−4) = −36."], resultado: "−36" },
    { id: "d9", nivel: 1, enunciado: "Si A es 3×3 con |A| = 5, calcula |2A|.", check: num("|2A| =", 40),
      pistas: ["El 2 sale al cubo."], pasos: ["2³·5 = 8·5 = 40."], resultado: "40" },
    { id: "d10", nivel: 1, enunciado: "Si |A| = 6, ¿cuánto vale |A⁻¹|? (decimal)", check: num("|A⁻¹| =", 1 / 6, { ph: "0,1667" }),
      pistas: ["|A|·|A⁻¹| = 1."], pasos: ["|A⁻¹| = 1/6 ≈ 0,1667."], resultado: "1/6" },
    { id: "d11", nivel: 1, enunciado: "Si |A| = 7 y |B| = −2 (del mismo orden), calcula |AB|.", check: num("|AB| =", -14),
      pistas: ["|AB| = |A||B|."], pasos: ["7·(−2) = −14."], resultado: "−14" },
    { id: "d12", nivel: 1, enunciado: "Para A = " + M([[1, 2, 3], [4, 5, 6], [7, 8, 10]]) + ", calcula el adjunto A₂₃.", check: num("A₂₃ =", 6),
      pistas: ["Tacha la fila 2 y la columna 3; signo (−1)<sup>2+3</sup>."],
      pasos: ["Queda " + T([[1, 2], [7, 8]]) + " = 8 − 14 = −6.", "Signo (−1)⁵ = −1: A₂₃ = −(−6) = 6."], resultado: "6" },
    { id: "d13", nivel: 1, enunciado: "Calcula el rango de " + M([[1, 0, 2], [0, 1, 3]]) + ".", check: num("rg =", 2),
      pistas: ["Busca un menor de orden 2 distinto de 0."], pasos: ["El menor de las dos primeras columnas es " + T([[1, 0], [0, 1]]) + " = 1 ≠ 0.", "No hay menores de orden 3 (solo 2 filas): rg = 2."], resultado: "2" },
    { id: "d14", nivel: 1, enunciado: "Calcula el área del triángulo de vértices A(0, 1), B(4, 3), C(1, 6).", check: num("Área =", 9),
      pistas: ["Área = ½|det(AB, AC)|."], pasos: ["AB = (4, 2), AC = (1, 5).", "det = 20 − 2 = 18.", "Área = 18/2 = 9."], resultado: "9" },
    // ---------------------------------------------------------------- ★★
    { id: "d15", nivel: 2, enunciado: "Calcula " + T([[2, 1, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 2]]) + ".", check: num("|A| =", 5),
      pistas: ["Suma todas las columnas en la primera: cada fila suma 5."],
      pasos: ["C₁ ← C₁ + C₂ + C₃ + C₄ = (5, 5, 5, 5).", "Saca el 5: 5·|1 1 1 1 / 1 2 1 1 / 1 1 2 1 / 1 1 1 2|.", "Resta F₁ a las demás filas: quedan (0,1,0,0), (0,0,1,0), (0,0,0,1).", "Triangular con diagonal 1: |A| = 5·1 = 5."], resultado: "5" },
    { id: "d16", nivel: 2, enunciado: "Calcula " + T([[3, 1, 0, 2], [1, 2, 0, 1], [2, 0, 1, 4], [0, 1, 0, 5]]) + " desarrollando por la columna 3.", check: num("|A| =", 24),
      pistas: ["La columna 3 es (0, 0, 1, 0)."],
      pasos: ["Solo a₃₃ = 1, con signo (−1)⁶ = +.", "|A| = " + T([[3, 1, 2], [1, 2, 1], [0, 1, 5]]) + " (tachando fila 3 y columna 3).", "Sarrus: suman 30 + 0 + 2 = 32; restan 0 + 3 + 5 = 8. |A| = 32 − 8 = 24."], resultado: "24" },
    { id: "d17", nivel: 2, enunciado: "Sea A una matriz 4×4 con |A| = 2. Calcula |3A⁻¹Aᵗ|.", check: num("|3A⁻¹Aᵗ| =", 81),
      pistas: ["El 3 sale elevado a 4."], pasos: ["|3A⁻¹Aᵗ| = 3⁴·|A⁻¹|·|Aᵗ| = 81·(1/2)·2 = 81."], resultado: "81" },
    { id: "d18", nivel: 2, enunciado: "Sea A una matriz 3×3 con |A| = −2. Calcula |A³·(−A)ᵗ|.", check: num("|A³(−A)ᵗ| =", -16),
      pistas: ["|(−A)ᵗ| = |−A| = (−1)³|A|."], pasos: ["|A³| = (−2)³ = −8.", "|(−A)ᵗ| = |−A| = (−1)³·(−2) = 2.", "Producto: (−8)·2 = −16."], resultado: "−16" },
    { id: "d19", nivel: 2, enunciado: "Sea A una matriz 3×3 con filas F₁, F₂, F₃ y |A| = 5. Calcula el determinante de la matriz con filas 3F₂, F₁ y F₃ − 4F₂.", check: num("Determinante =", -15),
      pistas: ["Saca el 3, quita el −4F₂ (no cambia), y cuenta los intercambios."], pasos: ["Saca el 3: 3·|F₂, F₁, F₃ − 4F₂|.", "Restar un múltiplo de otra fila no cambia: 3·|F₂, F₁, F₃|.", "Pasar de (F₂, F₁, F₃) a (F₁, F₂, F₃) es un intercambio: −|A| = −5.", "Total: 3·(−5) = −15."], resultado: "−15" },
    { id: "d20", nivel: 2, enunciado: "Halla los valores de m para los que " + M([["m", 1, 0], [1, "m", 1], [0, 1, "m"]]) + " no tiene inversa (de menor a mayor).", check: lista("m =", [-Math.SQRT2, 0, Math.SQRT2], "tres valores"),
      pistas: ["|A| = 0. Sarrus: suman m³ + 0 + 0; restan 0 + m + m."],
      pasos: ["|A| = m³ − 2m = m(m² − 2).", "m(m² − 2) = 0 ⟹ m = 0 o m² = 2.", "m = 0, m = √2 ≈ 1,414, m = −√2 ≈ −1,414."], resultado: "m = −√2, 0, √2" },
    { id: "d21", nivel: 2, enunciado: "¿Para qué valores de a la matriz " + M([["a", 3], [2, "a + 1"]]) + " no tiene inversa?", check: lista("a =", [-3, 2], "dos valores"),
      pistas: ["|A| = a(a + 1) − 6."], pasos: ["a² + a − 6 = 0.", "a = (−1 ± 5)/2 ⟹ a = 2 o a = −3."], resultado: "a = −3, a = 2" },
    { id: "d22", nivel: 2, enunciado: "Resuelve " + T([["x", 1, 1], [1, "x", 1], [1, 1, "x"]]) + " = 0.", check: lista("x =", [-2, 1], "dos valores"),
      pistas: ["Sarrus y Ruffini: x = 1 es raíz."], pasos: ["Suman x³ + 1 + 1; restan x + x + x. Determinante: x³ − 3x + 2.", "Ruffini con x = 1: x³ − 3x + 2 = (x − 1)(x² + x − 2) = (x − 1)²(x + 2).", "x = 1 (doble) o x = −2."], resultado: "x = −2, x = 1" },
    { id: "d23", nivel: 2, enunciado: "Calcula la inversa de A = " + M([[2, 1], [5, 3]]) + " y escribe sus cuatro elementos por filas (a₁₁, a₁₂, a₂₁, a₂₂).", check: lista("A⁻¹ =", [3, -1, -5, 2], "cuatro valores"),
      pistas: ["|A| = 1."], pasos: ["|A| = 6 − 5 = 1.", "Adj(A)ᵗ = " + M([[3, -1], [-5, 2]]) + ".", "A⁻¹ = esa matriz."], resultado: "(3 −1 / −5 2)" },
    { id: "d24", nivel: 2, enunciado: "Para A = " + M([[1, 2, 3], [0, 1, 4], [5, 6, 0]]) + " (|A| = 1) calcula la primera fila de A⁻¹.", check: lista("Fila 1 =", [-24, 18, 5], "tres valores"),
      pistas: ["La primera fila de A⁻¹ está formada por los adjuntos de la primera <i>columna</i> de A (por la traspuesta)."],
      pasos: ["A₁₁ = " + T([[1, 4], [6, 0]]) + " = −24; A₂₁ = −" + T([[2, 3], [6, 0]]) + " = 18; A₃₁ = " + T([[2, 3], [1, 4]]) + " = 5.", "Fila 1 de A⁻¹: (A₁₁, A₂₁, A₃₁)/|A| = (−24, 18, 5)."], resultado: "(−24, 18, 5)" },
    { id: "d25", nivel: 2, enunciado: "Para A = " + M([[2, 1, 0], [1, 3, 1], [0, 1, 2]]) + " (|A| = 8) calcula la primera fila de A⁻¹ (en decimales).", check: lista("Fila 1 =", [0.625, -0.25, 0.125], "tres valores"),
      pistas: ["Adjuntos de la primera columna: A₁₁, A₂₁, A₃₁."], pasos: ["A₁₁ = " + T([[3, 1], [1, 2]]) + " = 5; A₂₁ = −" + T([[1, 0], [1, 2]]) + " = −2; A₃₁ = " + T([[1, 0], [3, 1]]) + " = 1.", "Fila 1 de A⁻¹ = (5, −2, 1)/8 = (0,625; −0,25; 0,125)."], resultado: "(5/8, −1/4, 1/8)" },
    { id: "d26", nivel: 2, enunciado: "Calcula el rango de " + M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) + ".", check: num("rg =", 2),
      pistas: ["|A| = 0, pero hay un menor de orden 2 no nulo."], pasos: ["|A| = 0 (F₃ = 2F₂ − F₁).", "El menor " + T([[1, 2], [4, 5]]) + " = −3 ≠ 0.", "rg = 2."], resultado: "2" },
    { id: "d27", nivel: 2, enunciado: "¿Para qué valores de a el rango de " + M([[1, "a", 2], [2, 1, "a"], [1, 1, 1]]) + " es menor que 3?",
      check: opcion("Respuesta", ["Para ninguno: |A| = a² − 3a + 3 nunca se anula", "a = 1 y a = 2", "a = 3", "a = 0"], 0),
      pistas: ["Calcula |A| y mira si tiene raíces reales (discriminante)."], pasos: ["Sarrus: suman 1 + a² + 4 = a² + 5; restan 2 + 2a + a = 3a + 2. |A| = a² + 5 − 3a − 2 = a² − 3a + 3.", "Discriminante 9 − 12 = −3 &lt; 0: no hay raíces reales.", "|A| ≠ 0 para todo a: rg = 3 siempre."], resultado: "Para ninguno" },
    { id: "d28", nivel: 2, enunciado: "Resuelve AX = B con A = " + M([[2, 1], [5, 3]]) + " y B = " + M([[1, 2], [0, 1]]) + ". Escribe los cuatro elementos de X (de menor a mayor).", check: lista("X =", [-8, -5, 3, 5], "cuatro valores"),
      pistas: ["X = A⁻¹B, con A⁻¹ = (3 −1 / −5 2)."], pasos: ["X = (3 −1 / −5 2)·(1 2 / 0 1) = (3 5 / −5 −8).", "Elementos: 3, 5, −5, −8."], resultado: "(3 5 / −5 −8)" },
    { id: "d29", nivel: 2, enunciado: "Calcula el volumen del tetraedro que determinan u = (1, 1, 0), v = (0, 2, 1) y w = (1, 0, 3) (decimal).", check: num("Volumen =", 7 / 6, { ph: "1,1667" }),
      pistas: ["Volumen = |det|/6."], pasos: ["det = " + T([[1, 1, 0], [0, 2, 1], [1, 0, 3]]) + ": suman 6 + 1 + 0 = 7; restan 0 + 0 + 0 = 0 ⟹ 7.", "Tetraedro: 7/6 ≈ 1,1667."], resultado: "7/6" },
    { id: "d30", nivel: 2, enunciado: "Halla k para que A(2, 1), B(5, k) y C(−1, −2) estén alineados.", check: num("k =", 4),
      pistas: ["det(AB, AC) = 0."], pasos: ["AB = (3, k − 1), AC = (−3, −3).", "det = −9 + 3(k − 1) = 3k − 12 = 0.", "k = 4."], resultado: "4" },
    // ---------------------------------------------------------------- ★★★
    { id: "d31", nivel: 3, enunciado: "Calcula |A(3)| con A(m) = " + M([["m", 1, 1], [1, "m", 1], [1, 1, "m"]]) + " usando |A(m)| = m³ − 3m + 2.", check: num("|A(3)| =", 20),
      pistas: ["Sustituye m = 3, o comprueba con Sarrus la matriz (3 1 1 / 1 3 1 / 1 1 3)."], pasos: ["27 − 9 + 2 = 20.", "Con Sarrus: suman 27 + 1 + 1 = 29; restan 3 + 3 + 3 = 9. 29 − 9 = 20 ✓."], resultado: "20" },
    { id: "d32", nivel: 3, enunciado: "Demuestra que si A es ortogonal (A·Aᵗ = I), entonces |A| = 1 o |A| = −1.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Toma determinantes en A·Aᵗ = I", p: 0.5 }, { t: "Usa |AAᵗ| = |A|·|Aᵗ|", p: 0.5 },
        { t: "Usa |Aᵗ| = |A| y |I| = 1, llegando a |A|² = 1", p: 0.5 }, { t: "Concluye |A| = 1 o |A| = −1", p: 0.5 }] },
      pasos: ["|A·Aᵗ| = |I| = 1.", "|A|·|Aᵗ| = |A|·|A| = |A|² = 1.", "|A|² = 1 ⟹ |A| = 1 o |A| = −1. ∎"], resultado: "|A| = ±1" },
    { id: "d33", nivel: 3, enunciado: "Sean A y B de orden 3 con |A| = 2 y |B| = −3. Calcula |A²·B⁻¹·(2Bᵗ)|.", check: num("Valor =", 32),
      pistas: ["Sale 2³ de la última; |B⁻¹|·|Bᵗ| = 1."], pasos: ["|A²| = 4; |B⁻¹| = −1/3; |2Bᵗ| = 2³·(−3) = −24.", "Producto: 4·(−1/3)·(−24) = 32."], resultado: "32" },
    { id: "d34", nivel: 3, enunciado: "Una matriz A de orden 3 cumple A² = 2A y tiene inversa. Calcula |A|.", check: num("|A| =", 8),
      pistas: ["Multiplica por A⁻¹ para despejar A."], pasos: ["A² = 2A ⟹ A⁻¹A² = 2A⁻¹A ⟹ A = 2I.", "|2I| = 2³·1 = 8."], resultado: "8" },
    { id: "d35", nivel: 3, enunciado: "Si A es una matriz 3×3 con |A| = 2, calcula |Adj(2A)|.", check: num("|Adj(2A)| =", 256),
      pistas: ["|Adj(M)| = |M|² para M de orden 3. Primero |2A|."], pasos: ["|2A| = 8·2 = 16.", "|Adj(2A)| = 16² = 256."], resultado: "256" },
    { id: "d36", nivel: 3, enunciado: "Discute el rango de " + M([[1, 2, 3, 1], [2, 4, "a", 2], [3, 6, 9, "a"]]) + " e indica los dos valores de a para los que rg = 2 (de menor a mayor).", check: lista("a =", [3, 6], "dos valores"),
      pistas: ["Las columnas 1 y 2 son proporcionales: usa los menores de las columnas 1, 3 y 4."],
      pasos: ["Menor de columnas (1, 3, 4): " + T([[1, 3, 1], [2, "a", 2], [3, 9, "a"]]) + " = a² − 9a + 18 = (a − 3)(a − 6).", "Menor de columnas (2, 3, 4) = 2·(a − 3)(a − 6).", "Si a ≠ 3 y a ≠ 6: ese menor es distinto de 0 y rg = 3.", "Si a = 3 o a = 6: todos los menores de orden 3 se anulan (las columnas 1 y 2 son proporcionales y los otros dos menores llevan el mismo factor (a − 3)(a − 6)). Hay un menor de orden 2 no nulo: para a = 3, filas 1 y 2 con columnas 1 y 3 → a − 6 = −3; para a = 6, filas 1 y 3 con columnas 1 y 4 → a − 3 = 3. Luego rg = 2."], resultado: "a = 3 y a = 6 (rg = 2); en el resto rg = 3" },
    { id: "d37", nivel: 3, enunciado: "Para C = " + M([[1, 1, 2], [2, 1, 1], [1, 2, 1]]) + " (|C| = 4) calcula el elemento (1, 1) de C⁻¹ (decimal).", check: num("(C⁻¹)₁₁ =", -0.25),
      pistas: ["Es el adjunto A₁₁ dividido entre |C|."], pasos: ["A₁₁ = " + T([[1, 1], [2, 1]]) + " = 1 − 2 = −1.", "(C⁻¹)₁₁ = −1/4 = −0,25."], resultado: "−1/4" },
    { id: "d38", nivel: 3, enunciado: "Calcula " + T([[1, 1, 1], [1, 3, 6], [1, 9, 36]]) + " usando la fórmula del determinante de Vandermonde |1 1 1 / a b c / a² b² c²| = (b − a)(c − a)(c − b) con a = 1, b = 3, c = 6.", check: num("|A| =", 30),
      pistas: ["Sustituye en la fórmula."], pasos: ["(3 − 1)(6 − 1)(6 − 3) = 2·5·3 = 30."], resultado: "30" },
    { id: "d39", nivel: 3, enunciado: "Los puntos P(1, 1), Q(m, 3), R(4, m) forman un triángulo de área 5/2. Halla los dos valores <b>enteros</b> de m (de menor a mayor).", check: lista("m =", [0, 2], "dos valores enteros"),
      pistas: ["det(PQ, PR) = (m − 1)² − 6; el área es la mitad de su valor absoluto."], pasos: ["PQ = (m − 1, 2), PR = (3, m − 1): det = (m − 1)² − 6.", "½|(m − 1)² − 6| = 5/2 ⟹ |(m − 1)² − 6| = 5.", "(m − 1)² = 11 o (m − 1)² = 1. Los enteros salen de (m − 1)² = 1: m = 0 o m = 2."], resultado: "m = 0 y m = 2" },
    { id: "d40", nivel: 3, enunciado: "Si A es una matriz 4×4 con |A| = 2, calcula |Adj(A)|.", check: num("|Adj(A)| =", 8),
      pistas: ["|Adj A| = |A|ⁿ⁻¹."], pasos: ["|Adj(A)| = 2⁴⁻¹ = 2³ = 8."], resultado: "8" },
    { id: "d41", nivel: 3, enunciado: "Si |A| = −3 con A de orden 3 y |B| = 2, calcula |(AB)⁻¹·A²|.", check: num("Valor =", -1.5),
      pistas: ["|(AB)⁻¹| = 1/(|A||B|)."], pasos: ["|(AB)⁻¹| = 1/((−3)·2) = −1/6.", "|A²| = 9.", "(−1/6)·9 = −1,5."], resultado: "−3/2" },
    { id: "d42", nivel: 3, enunciado: "Sea A = " + M([[1, 2], [3, 4]]) + ". Resuelve AX + X = B con B = " + M([[1, 0], [0, 2]]) + ". Escribe los elementos de X de menor a mayor.", check: lista("X =", [-1, -0.75, 1, 1.25], "cuatro valores"),
      pistas: ["Saca X factor común por la derecha: (A + I)X = B."], pasos: ["(A + I)X = B, con A + I = (2 2 / 3 5), |A + I| = 4.", "(A + I)⁻¹ = (1/4)(5 −2 / −3 2).", "X = (1/4)(5 −2 / −3 2)(1 0 / 0 2) = (1/4)(5 −4 / −3 4) = (1,25 −1 / −0,75 1)."], resultado: "(5/4 −1 / −3/4 1)" },
    { id: "d43", nivel: 3, enunciado: "Demuestra que si A tiene inversa, entonces |A⁻¹| = 1/|A|.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 4, items: [
        { t: "Parte de A·A⁻¹ = I", p: 0.5 }, { t: "Toma determinantes: |A·A⁻¹| = |I| = 1", p: 0.5 },
        { t: "Aplica |AB| = |A||B|: |A|·|A⁻¹| = 1", p: 0.5 }, { t: "Despeja, indicando que |A| ≠ 0", p: 0.5 }] },
      pasos: ["A·A⁻¹ = I.", "|A|·|A⁻¹| = |I| = 1.", "Como el producto vale 1, |A| ≠ 0 y |A⁻¹| = 1/|A|. ∎"], resultado: "|A⁻¹| = 1/|A|" },
    { id: "d44", nivel: 3, enunciado: "Prueba, sin desarrollar, que " + T([[1, 1, 1], ["a", "b", "c"], ["b + c", "a + c", "a + b"]]) + " = 0.",
      check: { tipo: "rubrica", etiqueta: "Tu razonamiento", filas: 4, items: [
        { t: "Suma a la tercera fila la segunda: F₃ ← F₃ + F₂ (no cambia el determinante)", p: 0.5 },
        { t: "La nueva fila 3 es (a + b + c, a + b + c, a + b + c)", p: 0.5 },
        { t: "Es (a + b + c) veces la fila 1: filas proporcionales", p: 0.5 }, { t: "Concluye que el determinante vale 0", p: 0.5 }] },
      pasos: ["F₃ ← F₃ + F₂ = (a + b + c, a + b + c, a + b + c).", "Es (a + b + c)·F₁.", "Dos filas proporcionales ⟹ |A| = 0. ∎"], resultado: "0" },
    { id: "d45", nivel: 3, enunciado: "Si |A| = 0 para una matriz A de orden n, ¿qué se puede asegurar?",
      check: opcion("Respuesta", ["A no tiene inversa y rg(A) &lt; n", "A es la matriz nula", "rg(A) = 0", "Todas las filas de A son iguales"], 0),
      pistas: ["Piensa en (1 2 / 2 4)."], pasos: ["|A| = 0 ⟺ A no es invertible ⟺ rg(A) &lt; n.", "No implica A = 0 ni filas iguales: (1 2 / 2 4) tiene |A| = 0, rg = 1."], resultado: "No tiene inversa y rg &lt; n" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Cómo calcular un determinante",
      tabla: { cab: ["Orden / situación", "Método"], filas: [
        ["2×2", "ad − bc"], ["3×3", "Sarrus (o adjuntos si hay ceros)"], ["4×4 o más", "hacer ceros + desarrollar por adjuntos"],
        ["Triangular / diagonal", "producto de la diagonal"], ["Con parámetro", "calcular, factorizar, igualar a 0"]
      ] },
      nota: "Antes de nada, mira si hay una fila o columna con ceros o dos filas proporcionales." },
    { titulo: "Propiedades que más se usan",
      items: [
        { label: "Intercambio de filas", formula: "|A| → −|A|" },
        { label: "Fila × k", formula: "|A| → k·|A|" },
        { label: "Matriz × k (orden n)", formula: "|kA| = kⁿ·|A|" },
        { label: "Suma de múltiplo de otra fila", formula: "no cambia |A|" },
        { label: "Producto, traspuesta, inversa", formula: "|AB| = |A||B| · |Aᵗ| = |A| · |A⁻¹| = 1/|A|" },
        { label: "Adjunta", formula: "|Adj A| = |A|ⁿ⁻¹" }
      ] },
    { titulo: "Inversa y rango",
      items: [
        { label: "Inversa", formula: "A⁻¹ = Adj(A)ᵗ / |A|", cuando: "Si |A| ≠ 0.", ojo: "No olvides trasponer." },
        { label: "Ecuaciones matriciales", formula: "AX = B ⟹ X = A⁻¹B · XA = B ⟹ X = BA⁻¹" },
        { label: "Rango por menores", formula: "mayor orden de un menor ≠ 0 (se orla)" },
        { label: "Cuadrada n×n", formula: "rg = n ⟺ |A| ≠ 0" }
      ] },
    { titulo: "Determinantes y geometría", ancha: true,
      tabla: { cab: ["Figura", "Fórmula", "|det| = 0 significa"], filas: [
        ["Paralelogramo (plano)", "|det(u, v)|", "u ∥ v"], ["Triángulo", "½|det(AB, AC)|", "A, B, C alineados"],
        ["Paralelepípedo", "|det(u, v, w)|", "u, v, w coplanarios"], ["Tetraedro", "⅙|det(u, v, w)|", "4 puntos coplanarios"]
      ] },
      nota: "El signo del determinante es la orientación (antihoraria o directa si es positivo)." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "|2A| = 2|A| (A 3×3)", bien: "|2A| = 8|A|", por: "Sale kⁿ." },
        { mal: "|A + B| = |A| + |B|", bien: "No hay fórmula así", por: "Solo |AB| = |A||B|." },
        { mal: "Sarrus en una 4×4", bien: "Hacer ceros y adjuntos", por: "Sarrus es solo 3×3." },
        { mal: "A⁻¹ = Adj(A)/|A|", bien: "A⁻¹ = Adj(A)ᵗ/|A|", por: "Falta trasponer." },
        { mal: "XA = B ⟹ X = A⁻¹B", bien: "X = BA⁻¹", por: "El producto no conmuta." },
        { mal: "F₂ ← 3F₂ + F₁ no cambia |A|", bien: "multiplica |A| por 3", por: "Solo F₂ + kF₁ es seguro." }
      ] }
  ];

  B.registrar("mates2", "t2", {
    resumen: resumen, secciones: B.parte.m2t2a.secciones, nuevas: B.parte.m2t2b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
