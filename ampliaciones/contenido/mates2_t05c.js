/* ============================================================
   Matemáticas II · ampliaciones · Tema 5: Puntos, rectas y planos en el espacio
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr;

  var resumen = [
    "<b>Recta</b> = punto P + vector director v. Cuatro formas: vectorial X = P + t·v, paramétricas, continua (tres fracciones iguales; si una componente de v es 0 esa coordenada se escribe aparte) e <b>implícita</b> (intersección de dos planos, con director n₁ × n₂). Un punto está en la recta si el mismo t sirve en las tres coordenadas.",
    "<b>Plano</b> = punto P + normal n (o dos directores u, v con n = u × v). General: Ax + By + Cz + D = 0 con n = (A, B, C). Por tres puntos: n = AB × AC. Si falta una variable el plano es paralelo a ese eje; si falta D pasa por el origen.",
    "<b>Dos rectas</b> (A, u) y (Q, v): rango{u, v} y rango{u, v, AQ}. (1, 1) coincidentes · (1, 2) paralelas · (2, 2) se cortan (det = 0) · (2, 3) se cruzan (det ≠ 0). En implícita: rango M, rango M* con (3, 3) se cortan, (3, 4) se cruzan, (2, 2) coincidentes, (2, 3) paralelas.",
    "<b>Recta y plano</b>: v·n ≠ 0 ⟹ secantes (un punto: se sustituye en t). v·n = 0 ⟹ paralelos o la recta contenida, según un punto cumpla o no el plano. <b>Dos planos</b>: normales no proporcionales ⟹ se cortan en una recta (n₁ × n₂); proporcionales ⟹ paralelos o coincidentes (mirar D).",
    "<b>Tres planos</b> (Rouché): rg M = rg M* = 3 un punto · rg M = rg M* = 2 una recta (o dos coincidentes) · rg M = 2, rg M* = 3 prisma o dos paralelos y un tercero · rg 1 ⟹ coincidentes (1, 1) o paralelos (1, 2). Distingue los casos mirando qué normales son proporcionales.",
    "<b>Haz de planos</b> por la recta π₁ = 0, π₂ = 0: π₁ + λπ₂ = 0, y una condición fija λ. Paralelos a π: Ax + By + Cz + k = 0. <b>Puntos</b>: alineados si AB ∥ AC; coplanarios si [AB, AC, AD] = 0; D = A + C − B cierra el paralelogramo; simétrico de A respecto de M: 2M − A.",
    "<b>Con parámetro</b>: calcula un determinante o un producto escalar en m, iguala a 0, y <b>estudia a mano cada valor crítico</b>; da siempre también la respuesta para «el resto de valores de m»."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«Las rectas r y s no son paralelas, luego se cortan, como en el plano». ¿Qué falla?",
          op: ["Nada, está bien", "En el espacio dos rectas no paralelas pueden cruzarse: hay que comprobar además que u, v y AQ sean coplanarios (det = 0)", "Solo se cortan si son perpendiculares", "Dos rectas no paralelas nunca se cortan"], ok: 1,
          porque: "En ℝ³ hay cuatro posiciones. Que los directores no sean proporcionales descarta paralelas y coincidentes, pero quedan «se cortan» y «se cruzan». Lo decide el determinante det(u, v, AQ): 0 ⟹ se cortan; distinto de 0 ⟹ se cruzan." },
        { q: "«La recta (x − 1)/2 = (y + 3)/0 = (z − 2)/5 tiene vector director (2, 0, 5) y se escribe así». ¿Qué falla?",
          op: ["Nada", "No se puede dividir entre 0: se escribe (x − 1)/2 = (z − 2)/5, y = −3", "El director es (2, 3, 5)", "Habría que escribir y/0 = ∞"], ok: 1,
          porque: "Un denominador 0 no tiene sentido. Una componente nula del director significa que esa coordenada es constante, y se escribe aparte (aquí, y = −3)." },
        { q: "«El plano 2x − y + 3z = 6 tiene vector normal (2, −1, 3, 6)». ¿Qué falla?",
          op: ["Nada", "La normal solo son los tres coeficientes (2, −1, 3); el 6 es el término independiente", "La normal es (−2, 1, −3)", "La normal es (6, 6, 6)"], ok: 1,
          porque: "Un vector del espacio tiene tres componentes. n = (A, B, C): el término independiente D no interviene en la dirección del plano, solo en cuál de los planos paralelos es." },
        { q: "«Los planos x + y + z = 1 y 2x + 2y + 2z = 2 son paralelos, porque sus normales son proporcionales». ¿Qué falla?",
          op: ["Nada", "También el término independiente es proporcional (2/1): son el mismo plano, coincidentes", "Son secantes", "Son perpendiculares"], ok: 1,
          porque: "Con normales proporcionales hay dos casos: si D sigue la misma proporción, los planos coinciden; si no, son paralelos. Aquí la segunda ecuación es 2 veces la primera." },
        { q: "«v·n = 0, luego la recta y el plano son paralelos». ¿Qué falla?",
          op: ["Nada", "Puede estar contenida: falta comprobar si un punto de la recta cumple la ecuación del plano", "v·n = 0 significa que se cortan", "v·n = 0 es imposible"], ok: 1,
          porque: "v·n = 0 dice que la recta es paralela a la dirección del plano. Si además un punto de la recta está en el plano, toda la recta lo está. Solo si ese punto no cumple la ecuación hay paralelismo estricto." },
        { q: "«Tres planos con rango M = 2 y rango M* = 3 se cortan en una recta». ¿Qué falla?",
          op: ["Nada", "Rango M* = 3 > rango M implica sistema incompatible: no hay ningún punto común (prisma triangular, o dos paralelos)", "Se cortan en un punto", "Son coincidentes"], ok: 1,
          porque: "Rouché-Frobenius: si rango M ≠ rango M*, el sistema es incompatible. Los tres planos no comparten ningún punto. Que se corten en una recta exigiría rango M = rango M* = 2." },
        { q: "«El plano que contiene a A, B y C tiene normal AB + AC». ¿Qué falla?",
          op: ["Nada", "La normal es el producto vectorial AB × AC, no la suma", "La normal es AB · AC", "Hace falta un cuarto punto"], ok: 1,
          porque: "La suma AB + AC es otro vector del plano (una diagonal del paralelogramo), no perpendicular a él. La normal es AB × AC." },
        { q: "«El vector director de la recta x + y = 1, y + z = 2 es (1, 1, 0) + (0, 1, 1) = (1, 2, 1)». ¿Qué falla?",
          op: ["Nada", "El director es perpendicular a las dos normales: n₁ × n₂ = (1, 1, 0) × (0, 1, 1) = (1, −1, 1)", "El director es (1, 1, 2)", "Una recta implícita no tiene director"], ok: 1,
          porque: "Las normales no son el director. El director es perpendicular a ambas, es decir, n₁ × n₂. Comprobación: (1, −1, 1)·(1, 1, 0) = 0 y (1, −1, 1)·(0, 1, 1) = 0." },
        { q: "Para m = 3 el determinante de las dos rectas se anula; se contesta «se cortan para m = 3» sin más. ¿Qué falla?",
          op: ["Nada", "Hay que comprobar que para ese m las rectas no sean paralelas ni coincidentes (rango de {u, v} = 2); si no, no «se cortan» en un solo punto", "Hay que elevar al cuadrado", "Se cortan para todo m"], ok: 1,
          porque: "det = 0 con rango{u, v} = 2 significa se cortan, pero con u ∥ v el determinante también vale 0 (paralelas o coincidentes). Hay que mirar el rango de {u, v} antes de concluir." }
      ]
    },
    quiz1: {
      titulo: "Test de puntos, rectas y planos",
      preguntas: [
        { q: "El vector director de la recta que pasa por A(1, 2, 3) y B(4, 0, 5) es", op: ["(5, 2, 8)", "(3, −2, 2)", "(−3, 2, −2)", "(1, 2, 3)"], ok: 1, porque: "AB = B − A = (3, −2, 2). Su opuesto (−3, 2, −2) también sirve, pero es otra opción de la lista." },
        { q: "Un vector normal del plano 3x − y + 2z − 7 = 0 es", op: ["(3, −1, 2)", "(3, −1, 2, −7)", "(−7, 3, −1)", "(3, 1, 2)"], ok: 0, porque: "(A, B, C) = (3, −1, 2)." },
        { q: "Dos rectas con rango{u, v} = 2 y rango{u, v, AQ} = 3", op: ["se cortan", "se cruzan", "son paralelas", "coinciden"], ok: 1, porque: "Direcciones distintas y vectores no coplanarios: no están en un mismo plano y no se cortan." },
        { q: "Si v·n = 0 y un punto de la recta no cumple la ecuación del plano, la recta y el plano son", op: ["secantes", "perpendiculares", "paralelos sin tocarse", "la recta está contenida"], ok: 2, porque: "v·n = 0: paralelos o contenida. Como el punto no está en el plano, no hay contacto." },
        { q: "Los planos x + 2y − z = 3 y 2x + 4y − 2z = 5 son", op: ["coincidentes", "paralelos", "secantes", "perpendiculares"], ok: 1, porque: "Normales proporcionales, pero 5 ≠ 2·3: paralelos." },
        { q: "El vector director de la recta intersección de dos planos es", op: ["n₁ + n₂", "n₁ · n₂", "n₁ × n₂", "n₁ − n₂"], ok: 2, porque: "Debe ser perpendicular a las dos normales." },
        { q: "El plano z = 4 es", op: ["paralelo al plano XY", "perpendicular al plano XY", "paralelo al eje OZ", "el plano YZ"], ok: 0, porque: "Su normal (0, 0, 1) es la del plano XY: paralelo a él." },
        { q: "El plano 2x + 3z = 6 es paralelo al eje", op: ["OX", "OY", "OZ", "ninguno"], ok: 1, porque: "Falta la variable y: el plano contiene la dirección (0, 1, 0)." },
        { q: "Tres planos con rango M = rango M* = 2 y sin normales proporcionales se cortan en", op: ["un punto", "una recta", "el vacío", "un plano"], ok: 1, porque: "Sistema compatible indeterminado con un parámetro libre: una recta común." },
        { q: "A, B, C están alineados si", op: ["AB · AC = 0", "AB × AC = 0", "|AB| = |AC|", "[AB, AC] = 1"], ok: 1, porque: "AB y AC paralelos ⟺ su producto vectorial es nulo." },
        { q: "El plano que contiene a una recta r y a un punto Q de fuera tiene normal", op: ["v<sub>r</sub> × PQ (P de r)", "v<sub>r</sub> · PQ", "PQ", "v<sub>r</sub>"], ok: 0, porque: "Los dos vectores del plano son v<sub>r</sub> y PQ; su producto vectorial es la normal." },
        { q: "El haz de planos paralelos a x − 2y + z = 5 es", op: ["x − 2y + z + k = 0", "kx − 2y + z = 5", "x − 2y + kz = 5", "(x − 2y + z) + k(x + y) = 0"], ok: 0, porque: "Misma normal, término independiente libre." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de rectas y planos",
      cartas: [
        { a: "Ecuaciones de una recta", b: "Vectorial X = P + t·v · paramétricas · continua (x−p₁)/v₁ = (y−p₂)/v₂ = (z−p₃)/v₃ · implícita (dos planos)." },
        { a: "Director de una recta en implícita", b: "v = n₁ × n₂ (perpendicular a las dos normales)." },
        { a: "Ecuación general del plano", b: "Ax + By + Cz + D = 0, con n = (A, B, C). Por P y n: n·(X − P) = 0." },
        { a: "Plano por tres puntos", b: "n = AB × AC. Equivale a | x−a₁ y−a₂ z−a₃ ; AB ; AC | = 0." },
        { a: "Dos rectas: ¿qué miro?", b: "rango{u, v} y rango{u, v, AQ} (o det(u, v, AQ)): (1,1) coinciden, (1,2) paralelas, (2,2) se cortan, (2,3) se cruzan." },
        { a: "Recta y plano", b: "v·n ≠ 0: un punto. v·n = 0: paralelos si P no cumple el plano; contenida si lo cumple." },
        { a: "Dos planos", b: "Normales no proporcionales: recta (n₁ × n₂). Proporcionales: paralelos, o coincidentes si D también lo es." },
        { a: "Tres planos", b: "rg M = rg M* = 3: punto · =2: recta · M=2, M*=3: sin puntos (prisma o dos paralelos) · rg 1: coincidentes o paralelos." },
        { a: "Haz de planos", b: "π₁ + λπ₂ = 0 contiene a la recta π₁ = π₂ = 0. Un dato fija λ." },
        { a: "Puntos alineados / coplanarios", b: "AB × AC = 0 / [AB, AC, AD] = 0." },
        { a: "Plano con una variable que falta", b: "Es paralelo al eje de esa variable. Si falta D, pasa por el origen." },
        { a: "Con parámetro", b: "Determinante o producto escalar en m; iguala a 0; estudia a mano los valores críticos y el resto." }
      ]
    },
    empar: {
      titulo: "Condición y posición",
      consigna: "Une cada condición con la posición relativa que expresa.",
      pares: [
        ["rango{u, v} = 1 y rango{u, v, AQ} = 1", "Rectas coincidentes"],
        ["rango{u, v} = 1 y rango{u, v, AQ} = 2", "Rectas paralelas"],
        ["rango{u, v} = 2 y det(u, v, AQ) = 0", "Rectas que se cortan"],
        ["rango{u, v} = 2 y det(u, v, AQ) ≠ 0", "Rectas que se cruzan"],
        ["v·n ≠ 0", "Recta y plano secantes"],
        ["Normales no proporcionales", "Planos que se cortan en una recta"],
        ["rg M = 2, rg M* = 3, sin normales proporcionales", "Prisma triangular"]
      ]
    },
    clas: {
      titulo: "¿Cuántos puntos comunes?",
      consigna: "Toca cada situación y elige cuántos puntos tienen en común.",
      categorias: ["Ninguno", "Uno", "Infinitos"],
      items: [
        { t: "Dos rectas que se cruzan", c: 0 }, { t: "Dos rectas que se cortan", c: 1 }, { t: "Dos rectas paralelas", c: 0 },
        { t: "Dos rectas coincidentes", c: 2 }, { t: "Recta y plano secantes", c: 1 }, { t: "Recta contenida en un plano", c: 2 },
        { t: "Recta paralela a un plano (fuera de él)", c: 0 }, { t: "Dos planos secantes", c: 2 }, { t: "Dos planos paralelos", c: 0 },
        { t: "Tres planos con rg M = rg M* = 3", c: 1 }, { t: "Tres planos en prisma triangular", c: 0 }
      ]
    },
    orden: {
      titulo: "Posición relativa de dos rectas",
      consigna: "Ordena los pasos para estudiar dos rectas en el espacio.",
      items: [
        { t: "Obtener un punto y un vector director de cada recta (A, u) y (Q, v)" },
        { t: "Comparar u y v: ¿son proporcionales?" },
        { t: "Si no lo son: calcular det(u, v, AQ) (0: se cortan; distinto de 0: se cruzan)" },
        { t: "Si lo son: ver si AQ también es proporcional a u (coincidentes) o no (paralelas)" },
        { t: "Si se cortan, hallar el punto igualando las coordenadas (y comprobarlo en las dos rectas)" }
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
  var POS = ["Se cortan", "Se cruzan", "Son paralelas", "Son coincidentes"];

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "p1", nivel: 1, enunciado: "Halla el vector director de la recta que pasa por A(1, 2, 3) y B(3, 0, −1), dividido para que su primera componente sea 1. Da (x, y, z).", check: vec(1, -1, -2),
      pistas: ["v = AB = B − A; luego divide entre 2."], pasos: ["AB = (3 − 1, 0 − 2, −1 − 3) = (2, −2, −4).", "Dividiendo entre 2: (1, −1, −2)."], resultado: "(1, −1, −2)" },
    { id: "p2", nivel: 1, enunciado: "La recta r es x = 2 − t, y = 1 + 3t, z = 4t. Halla el punto que corresponde a t = 2.", check: vec(0, 7, 8),
      pistas: ["Sustituye t = 2 en las tres ecuaciones."], pasos: ["x = 2 − 2 = 0; y = 1 + 6 = 7; z = 8."], resultado: "(0, 7, 8)" },
    { id: "p3", nivel: 1, enunciado: "El punto P(5, −7, 4) está en la recta (x − 1)/2 = (y + 1)/(−3) = (z − 2)/1. ¿Para qué valor del parámetro t (con x = 1 + 2t, y = −1 − 3t, z = 2 + t) se obtiene?", check: num("t =", 2),
      pistas: ["Despeja t en una coordenada y comprueba con las otras."], pasos: ["5 = 1 + 2t ⟹ t = 2; −7 = −1 − 3t ⟹ t = 2; 4 = 2 + t ⟹ t = 2. Coincide en las tres."], resultado: "2" },
    { id: "p4", nivel: 1, enunciado: "El plano pasa por P(1, 2, 3) y tiene normal n = (2, −1, 4). Escribe 2x − y + 4z + D = 0 y da D.", check: num("D =", -12),
      pistas: ["Sustituye P en la ecuación."], pasos: ["2·1 − 2 + 4·3 + D = 0 ⟹ 12 + D = 0 ⟹ D = −12."], resultado: "−12" },
    { id: "p5", nivel: 1, enunciado: "¿Cuál de estos puntos pertenece al plano 2x − y + 3z = 7?",
      check: opcion("Punto", ["(1, 1, 2)", "(2, 1, 1)", "(3, 0, 0)", "(1, −1, 1)"], 0),
      pistas: ["Sustituye cada uno en 2x − y + 3z."], pasos: ["(1, 1, 2): 2 − 1 + 6 = 7 ✓.", "Los demás dan 6, 6 y 6."], resultado: "(1, 1, 2)" },
    { id: "p6", nivel: 1, enunciado: "El plano pasa por A(1, 0, 0), B(0, 1, 0) y C(0, 0, 1). Se escribe x + y + z + D = 0. Da D.", check: num("D =", -1),
      pistas: ["Sustituye A."], pasos: ["AB = (−1, 1, 0), AC = (−1, 0, 1), AB × AC = (1, 1, 1).", "1 + D = 0 ⟹ D = −1."], resultado: "−1" },
    { id: "p7", nivel: 1, enunciado: "Halla el vector director de r: x + y + z = 3, x − y + 2z = 0, con primera componente 3. Da (x, y, z).", check: vec(3, -1, -2),
      pistas: ["n₁ × n₂ con n₁ = (1, 1, 1) y n₂ = (1, −1, 2)."], pasos: ["n₁ × n₂ = (1·2 − 1·(−1), 1·1 − 1·2, 1·(−1) − 1·1) = (3, −1, −2)."], resultado: "(3, −1, −2)" },
    { id: "p8", nivel: 1, enunciado: "r pasa por P(1, 2, 3) con u = (1, −2, 4) y s pasa por el origen con v = (−2, 4, −8). Posición relativa:",
      check: opcion("Posición", POS, 2),
      pistas: ["v = −2u. ¿Está P en s?"], pasos: ["v = −2u: direcciones proporcionales.", "P = t·v ⟹ 1 = −2t ⟹ t = −1/2, pero 2 = 4t ⟹ t = 1/2. P no está en s ⟹ paralelas."], resultado: "Son paralelas" },
    { id: "p9", nivel: 1, enunciado: "El plano paralelo al plano XY que pasa por (2, −1, 5) se escribe z + D = 0. Da D.", check: num("D =", -5),
      pistas: ["Un plano paralelo a XY es z = constante."], pasos: ["z = 5 ⟹ z − 5 = 0 ⟹ D = −5."], resultado: "−5" },
    { id: "p10", nivel: 1, enunciado: "Posición relativa de π₁: 2x − y + 3z = 1 y π₂: 4x − 2y + 6z = 5.",
      check: opcion("Posición", ["Son coincidentes", "Son paralelos", "Se cortan en una recta", "Son perpendiculares"], 1),
      pistas: ["Normales proporcionales; ¿lo es también el término independiente?"], pasos: ["(4, −2, 6) = 2·(2, −1, 3), pero 5 ≠ 2·1 ⟹ paralelos."], resultado: "Son paralelos" },
    { id: "p11", nivel: 1, enunciado: "¿Están alineados A(1, 2, 3), B(3, 5, 7) y C(5, 8, 11)?",
      check: opcion("Respuesta", ["Sí", "No"], 0),
      pistas: ["Compara AB con AC."], pasos: ["AB = (2, 3, 4), AC = (4, 6, 8) = 2·AB ⟹ proporcionales ⟹ alineados."], resultado: "Sí" },
    { id: "p12", nivel: 1, enunciado: "Halla el simétrico de A(1, 2, 3) respecto del punto M(0, 1, −1).", check: vec(-1, 0, -5),
      pistas: ["A′ = 2M − A."], pasos: ["A′ = (0 − 1, 2 − 2, −2 − 3) = (−1, 0, −5)."], resultado: "(−1, 0, −5)" },
    { id: "p13", nivel: 1, enunciado: "r: x + y = 3, y + z = 4. Halla su punto con x = 0.", check: vec(0, 3, 1),
      pistas: ["Con x = 0, y = 3 y luego z = 4 − y."], pasos: ["0 + y = 3 ⟹ y = 3; 3 + z = 4 ⟹ z = 1."], resultado: "(0, 3, 1)" },
    { id: "p14", nivel: 1, enunciado: "La recta r: (1, 1, 1) + t(1, −1, 0) y el plano π: x + y + z = 3. Posición relativa:",
      check: opcion("Posición", ["Secantes", "Paralelos sin tocarse", "La recta está contenida en el plano", "Perpendiculares"], 2),
      pistas: ["v·n y un punto de r."], pasos: ["v·n = 1 − 1 + 0 = 0.", "P(1, 1, 1): 1 + 1 + 1 = 3 ✓. Contenida."], resultado: "La recta está contenida" },
    // ---------------------------------------------------------------- ★★
    { id: "p15", nivel: 2, enunciado: "El plano por A(1, 2, 0), B(3, 1, 1) y C(0, 0, 2) tiene la forma y + z + D = 0. Da D.", check: num("D =", -2),
      pistas: ["AB × AC = (0, −5, −5) ∥ (0, 1, 1)."], pasos: ["AB = (2, −1, 1), AC = (−1, −2, 2).", "AB × AC = (−2 + 2, −1 − 4, −4 − 1) = (0, −5, −5) ∥ (0, 1, 1).", "y + z + D = 0 con A: 2 + 0 + D = 0 ⟹ D = −2. Comprobación con C: 0 + 2 − 2 = 0 ✓."], resultado: "−2" },
    { id: "p16", nivel: 2, enunciado: "Halla el punto con z = 0 de la recta r: x + y − z = 2, 2x − y + z = 1.", check: vec(1, 1, 0),
      pistas: ["Con z = 0 queda un sistema 2×2."], pasos: ["x + y = 2 y 2x − y = 1 ⟹ sumando 3x = 3 ⟹ x = 1, y = 1.", "Comprobación: 1 + 1 − 0 = 2 ✓ y 2 − 1 + 0 = 1 ✓."], resultado: "(1, 1, 0)" },
    { id: "p17", nivel: 2, enunciado: "La recta pasa por P(1, −1, 2) y es perpendicular al plano 2x − y + 3z = 4. Halla su punto con z = 8.", check: vec(5, -3, 8),
      pistas: ["Su director es la normal del plano."], pasos: ["v = n = (2, −1, 3). Paramétricas: (1 + 2t, −1 − t, 2 + 3t).", "z = 2 + 3t = 8 ⟹ t = 2 ⟹ (5, −3, 8)."], resultado: "(5, −3, 8)" },
    { id: "p18", nivel: 2, enunciado: "r pasa por P(1, 0, −1) con u = (2, 1, −1) y s por Q(0, 1, 2) con v = (1, −1, 3). Calcula det(u, v, PQ) (y decide si se cruzan).", check: num("det =", -18),
      pistas: ["PQ = Q − P = (−1, 1, 3)."], pasos: ["det |2 1 −1 ; 1 −1 3 ; −1 1 3| = 2(−3 − 3) − 1(3 + 3) + (−1)(1 − 1) = −12 − 6 + 0 = −18.", "Distinto de 0 y u, v no proporcionales ⟹ se cruzan."], resultado: "−18" },
    { id: "p19", nivel: 2, enunciado: "r pasa por el origen con u = (1, 2, 3) y s por Q(2, 2, 2) con v = (1, 0, −1). Se cortan; halla el punto.", check: vec(1, 2, 3),
      pistas: ["(t, 2t, 3t) = (2 + λ, 2, 2 − λ)."], pasos: ["2t = 2 ⟹ t = 1. Entonces x = 1 = 2 + λ ⟹ λ = −1, y z = 3 = 2 − λ = 3 ✓.", "Punto (1, 2, 3)."], resultado: "(1, 2, 3)" },
    { id: "p20", nivel: 2, enunciado: "Plano que contiene a la recta r (punto P(1, 2, 0), director u = (1, −1, 1)) y al punto Q(0, 0, 1). Se escribe x + By + Cz + D = 0. Da B, C y D.", check: [num("B =", -2), num("C =", -3), num("D =", 3)],
      pistas: ["n = u × PQ con PQ = (−1, −2, 1)."], pasos: ["n = (−1·1 − 1·(−2), 1·(−1) − 1·1, 1·(−2) − (−1)(−1)) = (1, −2, −3).", "x − 2y − 3z + D = 0 con Q: −3 + D = 0 ⟹ D = 3. Comprobación con P: 1 − 4 − 0 + 3 = 0 ✓."], resultado: "B = −2, C = −3, D = 3" },
    { id: "p21", nivel: 2, enunciado: "Plano paralelo a 2x − y + z = 5 que pasa por (1, 1, 1). Se escribe 2x − y + z + D = 0. Da D.", check: num("D =", -2),
      pistas: ["Misma normal; D se fija con el punto."], pasos: ["2 − 1 + 1 + D = 0 ⟹ D = −2."], resultado: "−2" },
    { id: "p22", nivel: 2, enunciado: "La recta de intersección de π₁: x + 2y − z = 1 y π₂: 2x − y + z = 4 corta al plano XY (z = 0). Halla el punto (puedes usar decimales).", check: vec(1.8, -0.4, 0),
      pistas: ["Con z = 0: x + 2y = 1 y 2x − y = 4."], pasos: ["De la segunda y = 2x − 4. Entonces x + 4x − 8 = 1 ⟹ x = 9/5 = 1,8.", "y = 2·9/5 − 4 = −2/5 = −0,4."], resultado: "(1,8, −0,4, 0)" },
    { id: "p23", nivel: 2, enunciado: "Resuelve el sistema (tres planos) x + y + z = 6, x − y + z = 2, 2x + y − z = 1 y da el punto común.", check: vec(1, 2, 3),
      pistas: ["Resta las dos primeras."], pasos: ["Restando: 2y = 4 ⟹ y = 2. Entonces x + z = 4.", "Tercera: 2x + 2 − z = 1 ⟹ 2x − z = −1. Sumando con x + z = 4: 3x = 3 ⟹ x = 1, z = 3."], resultado: "(1, 2, 3)" },
    { id: "p24", nivel: 2, enunciado: "Tres planos: x + y = 1, y + z = 1, x − z = 0. Su posición es:",
      check: opcion("Posición", ["Se cortan en un punto", "Pasan por una misma recta", "Prisma triangular (sin puntos comunes)", "Son paralelos"], 1),
      pistas: ["¿Es la tercera ecuación la resta de las dos primeras?"], pasos: ["π₁ − π₂: x − z = 0 = π₃, incluido el término independiente ⟹ rango M = rango M* = 2.", "Ninguna pareja de normales es proporcional ⟹ una recta común."], resultado: "Pasan por una misma recta" },
    { id: "p25", nivel: 2, enunciado: "Del haz (x + y − 2) + k(y − z + 1) = 0, halla k para el plano que pasa por (2, 1, 0).", check: num("k =", -0.5),
      pistas: ["Sustituye el punto."], pasos: ["(2 + 1 − 2) + k(1 − 0 + 1) = 0 ⟹ 1 + 2k = 0 ⟹ k = −1/2."], resultado: "−1/2" },
    { id: "p26", nivel: 2, enunciado: "Halla m para que A(1, 2, 1), B(2, m, 3) y C(4, 0, 7) estén alineados (decimal o fracción).", check: num("m =", 4 / 3),
      pistas: ["AB y AC proporcionales."], pasos: ["AB = (1, m − 2, 2), AC = (3, −2, 6) = 3·(1, −2/3, 2).", "m − 2 = −2/3 ⟹ m = 4/3."], resultado: "4/3" },
    { id: "p27", nivel: 2, enunciado: "Dados A(0, 1, 2), B(3, 1, 4) y C(5, 4, 1), halla D para que ABCD sea un paralelogramo.", check: vec(2, 4, -1),
      pistas: ["D = A + C − B."], pasos: ["D = (0 + 5 − 3, 1 + 4 − 1, 2 + 1 − 4) = (2, 4, −1).", "Comprobación: AB = (3, 0, 2) = DC = (5 − 2, 4 − 4, 1 + 1) = (3, 0, 2) ✓."], resultado: "(2, 4, −1)" },
    { id: "p28", nivel: 2, enunciado: "Halla los puntos de corte del plano 2x − 3y + z = 6 con los ejes OX, OY y OZ (x, y y z de cada corte).", check: lista("Cortes", [-2, 3, 6], "los tres valores"),
      pistas: ["Para el eje OX: y = z = 0."], pasos: ["OX: 2x = 6 ⟹ x = 3.", "OY: −3y = 6 ⟹ y = −2.", "OZ: z = 6."], resultado: "x = 3, y = −2, z = 6" },
    { id: "p29", nivel: 2, enunciado: "Corte de la recta x = 1 + t, y = 2t, z = 1 − t con el plano x + y + z = 3.", check: vec(1.5, 1, 0.5),
      pistas: ["Sustituye en el plano y despeja t."], pasos: ["(1 + t) + 2t + (1 − t) = 3 ⟹ 2 + 2t = 3 ⟹ t = 1/2.", "Punto (3/2, 1, 1/2)."], resultado: "(3/2, 1, 1/2)" },
    { id: "p30", nivel: 2, enunciado: "Plano perpendicular a r: x = 1 + 2t, y = −t, z = 3t que pasa por (1, 1, 1). Se escribe 2x − y + 3z + D = 0. Da D.", check: num("D =", -4),
      pistas: ["La normal del plano es el director de r."], pasos: ["n = (2, −1, 3). Con (1, 1, 1): 2 − 1 + 3 + D = 0 ⟹ D = −4."], resultado: "−4" },
    { id: "p31", nivel: 2, enunciado: "¿Para qué valor de k son coincidentes π₁: x − 2y + 3z = 4 y π₂: 2x − 4y + 6z = k?", check: num("k =", 8),
      pistas: ["π₂ debe ser el doble de π₁."], pasos: ["Los coeficientes de π₂ son el doble ⟹ k = 2·4 = 8."], resultado: "8" },
    { id: "p32", nivel: 2, enunciado: "r: (x − 2)/3 = (y + 1)/2 = z/(−1). Halla el punto con y = 1.", check: vec(5, 1, -1),
      pistas: ["Iguala cada fracción a t: y + 1 = 2t."], pasos: ["y + 1 = 2t = 2 ⟹ t = 1.", "x = 2 + 3 = 5; z = −1."], resultado: "(5, 1, −1)" },
    // ---------------------------------------------------------------- ★★★
    { id: "p33", nivel: 3, enunciado: "r pasa por A(1, 0, 0) con u = (1, 1, m) y s por B(0, 1, 1) con v = (2, −1, 1). Halla m para que se corten.", check: num("m =", 5),
      pistas: ["AB = (−1, 1, 1); det(u, v, AB) = 0."], pasos: ["det |1 1 m ; 2 −1 1 ; −1 1 1| = 1(−1 − 1) − 1(2 + 1) + m(2 − 1) = m − 5.", "m = 5. Comprobación de que no son paralelas: u = (1, 1, 5) y v = (2, −1, 1) no son proporcionales (1/2 ≠ 1/(−1))."], resultado: "5" },
    { id: "p34", nivel: 3, enunciado: "r: P(1, 0, 0), v = (1, −1, 2) y π: mx + y − z = m + 1. Halla m para que sean paralelos (sin contacto) y, para m = 4, el punto de corte.",
      check: [num("m =", 3), num("x =", 2), num("y =", -1), num("z =", 2)],
      pistas: ["v·n = m − 3. Para m = 4 sustituye (1 + t, −t, 2t)."], pasos: ["v·n = m − 1 − 2 = m − 3 = 0 ⟹ m = 3. P: 3 ≠ 4, no contenida ⟹ paralelos.", "m = 4: 4(1 + t) − t − 2t = 5 ⟹ 4 + t = 5 ⟹ t = 1 ⟹ (2, −1, 2)."], resultado: "m = 3; punto (2, −1, 2)" },
    { id: "p35", nivel: 3, enunciado: "Halla m y k para que π₁: mx + 2y − z = 1 y π₂: 2x + 4y − 2z = k sean el mismo plano.", check: [num("m =", 1), num("k =", 2)],
      pistas: ["Todos los coeficientes proporcionales."], pasos: ["Factor 2 en y y z ⟹ m·2 = 2 ⟹ m = 1; k = 2·1 = 2."], resultado: "m = 1, k = 2" },
    { id: "p36", nivel: 3, enunciado: "x + y + mz = 1, x + my + z = 1, mx + y + z = 1. ¿Para qué valores de m (de menor a mayor) los tres planos NO se cortan en un único punto?", check: lista("m =", [-2, 1], "dos valores"),
      pistas: ["det = −(m − 1)²(m + 2)."], pasos: ["det M = 3m − 2 − m³ = −(m − 1)²(m + 2).", "Se anula en m = 1 y m = −2: ahí no hay solución única."], resultado: "m = −2 y m = 1" },
    { id: "p37", nivel: 3, enunciado: "En el sistema anterior, para m = −2, los tres planos forman:",
      check: opcion("Posición", ["Un punto", "Una recta común", "Un prisma triangular (sin puntos comunes)", "Un único plano"], 2),
      pistas: ["Suma las tres ecuaciones."], pasos: ["m = −2: x + y − 2z = 1, x − 2y + z = 1, −2x + y + z = 1. Sumando: 0 = 3, incompatible.", "rango M = 2, rango M* = 3, sin normales proporcionales ⟹ prisma triangular."], resultado: "Prisma triangular" },
    { id: "p38", nivel: 3, enunciado: "Plano que contiene a r: P(1, 0, 1), u = (1, 1, 0) y es paralelo al vector v = (0, 1, 1). Se escribe x + By + Cz + D = 0. Da B, C y D.", check: [num("B =", -1), num("C =", 1), num("D =", -2)],
      pistas: ["n = u × v."], pasos: ["n = (1·1 − 0·1, 0·0 − 1·1, 1·1 − 1·0) = (1, −1, 1).", "x − y + z + D = 0 con P: 1 − 0 + 1 + D = 0 ⟹ D = −2."], resultado: "B = −1, C = 1, D = −2" },
    { id: "p39", nivel: 3, enunciado: "La recta pasa por P(1, 1, 1) y es paralela a los planos x + y + z = 1 y x − y = 0. Da su vector director con primera componente 1.", check: vec(1, 1, -2),
      pistas: ["Es perpendicular a las dos normales."], pasos: ["n₁ × n₂ = (1, 1, 1) × (1, −1, 0) = (1·0 − 1·(−1), 1·1 − 1·0, 1·(−1) − 1·1) = (1, 1, −2)."], resultado: "(1, 1, −2)" },
    { id: "p40", nivel: 3, enunciado: "Halla m para que A(1, 1, 0), B(2, 0, 1), C(0, 1, 1) y D(1, m, m) sean coplanarios (decimal o fracción).", check: num("m =", 2 / 3),
      pistas: ["AB = (1, −1, 1), AC = (−1, 0, 1), AD = (0, m − 1, m)."], pasos: ["[AB, AC, AD] = 1(0 − (m − 1)) + 1(−m − 0) + 1(−(m − 1) − 0) = 2 − 3m.", "2 − 3m = 0 ⟹ m = 2/3."], resultado: "2/3" },
    { id: "p41", nivel: 3, enunciado: "r: P(1, 0, 1), u = (1, 1, −1) y s: Q(2, 1, 0), v = (1, 0, 1) se cortan. Da el punto de corte y el plano que las contiene, x − 2y − z + D = 0 (da D).", check: [num("x =", 2), num("y =", 1), num("z =", 0), num("D =", 0)],
      pistas: ["Q es el punto de r para t = 1."], pasos: ["r en t = 1: (2, 1, 0) = Q ⟹ corte (2, 1, 0).", "n = u × v = (1·1 − (−1)·0, (−1)·1 − 1·1, 1·0 − 1·1) = (1, −2, −1). Con P: 1 − 0 − 1 + D = 0 ⟹ D = 0."], resultado: "(2, 1, 0); D = 0" },
    { id: "p42", nivel: 3, enunciado: "Del haz (x − y + z − 1) + k(2x + y − z − 2) = 0, halla k para que el plano sea paralelo al eje OX.", check: num("k =", -0.5),
      pistas: ["El coeficiente de x debe ser 0."], pasos: ["Coeficiente de x: 1 + 2k = 0 ⟹ k = −1/2.", "El plano resultante es y − z = 0."], resultado: "−1/2" },
    { id: "p43", nivel: 3, enunciado: "Las rectas paralelas r: P(1, 0, 0), u = (1, 1, 1) y s: Q(0, 1, 0), v = (2, 2, 2) están en un plano. Escríbelo como x + By + Cz + D = 0 y da B, C y D.", check: [num("B =", 1), num("C =", -2), num("D =", -1)],
      pistas: ["Usa u y PQ = (−1, 1, 0)."], pasos: ["n = u × PQ = (1·0 − 1·1, 1·(−1) − 1·0, 1·1 − 1·(−1)) = (−1, −1, 2) ∥ (1, 1, −2).", "x + y − 2z + D = 0 con P: 1 + D = 0 ⟹ D = −1. Comprobación con Q: 1 − 1 = 0 ✓."], resultado: "B = 1, C = −2, D = −1" },
    { id: "p44", nivel: 3, enunciado: "Tres planos con rango M = 2, rango M* = 3 y exactamente dos de ellos paralelos (normales proporcionales, planos distintos). Su posición es:",
      check: opcion("Posición", ["Un prisma triangular", "Dos paralelos y un tercero que los corta", "Una recta común", "Un punto"], 1),
      pistas: ["Un par de planos paralelos no tiene puntos comunes."], pasos: ["Sistema incompatible por los dos planos paralelos.", "El tercero, con normal distinta, corta a los dos paralelos en dos rectas paralelas."], resultado: "Dos paralelos y un tercero que los corta" },
    { id: "p45", nivel: 3, enunciado: "Punto de r: (x − 1)/2 = (y + 1)/(−1) = (z − 3)/3 situado en el plano x + y + z = 9 (puedes usar decimales).", check: vec(4, -2.5, 7.5),
      pistas: ["(1 + 2t, −1 − t, 3 + 3t)."], pasos: ["(1 + 2t) + (−1 − t) + (3 + 3t) = 3 + 4t = 9 ⟹ t = 3/2.", "Punto (4, −5/2, 15/2)."], resultado: "(4, −5/2, 15/2)" },
    { id: "p46", nivel: 3, enunciado: "Halla m para que A(1, 0, 0), B(0, 1, 0), C(0, 0, 1) y D(m, m, m) sean coplanarios (decimal o fracción).", check: num("m =", 1 / 3),
      pistas: ["El plano ABC es x + y + z = 1."], pasos: ["n = AB × AC = (1, 1, 1) ⟹ x + y + z = 1.", "D cumple: 3m = 1 ⟹ m = 1/3."], resultado: "1/3" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Ecuaciones de la recta",
      tabla: { cab: ["Forma", "Expresión"], filas: [
        ["Vectorial", "X = P + t·v"],
        ["Paramétricas", "x = p₁ + tv₁, y = p₂ + tv₂, z = p₃ + tv₃"],
        ["Continua", "(x − p₁)/v₁ = (y − p₂)/v₂ = (z − p₃)/v₃"],
        ["Implícita", "A₁x + B₁y + C₁z + D₁ = 0 y A₂x + B₂y + C₂z + D₂ = 0"],
        ["De implícita a vector", "v = n₁ × n₂; un punto, dando valor a una incógnita"]
      ] },
      nota: "Si una componente de v es 0, esa coordenada queda fija: nunca se divide entre 0." },
    { titulo: "Ecuaciones del plano", ancha: true,
      tabla: { cab: ["Datos", "Normal", "Ecuación"], filas: [
        ["Punto P y normal n", "n", "n·(X − P) = 0"],
        ["Punto P y directores u, v", "u × v", "X = P + λu + μv"],
        ["Tres puntos A, B, C", "AB × AC", "| x−a₁ y−a₂ z−a₃ ; AB ; AC | = 0"],
        ["Recta r y punto Q", "v<sub>r</sub> × PQ", "n·(X − Q) = 0"],
        ["Dos rectas secantes", "v₁ × v₂", "n·(X − P) = 0"]
      ] },
      nota: "Falta una variable ⟹ paralelo a ese eje · falta D ⟹ pasa por el origen." },
    { titulo: "Dos rectas: cuatro posiciones", ancha: true,
      tabla: { cab: ["Posición", "rg{u, v}", "rg{u, v, AQ}", "det(u, v, AQ)"], filas: [
        ["Coincidentes", "1", "1", "0"], ["Paralelas", "1", "2", "0"],
        ["Se cortan", "2", "2", "0"], ["Se cruzan", "2", "3", "≠ 0"]
      ] },
      nota: "En implícita: (rg M, rg M*) = (3,3) cortan · (3,4) cruzan · (2,2) coinciden · (2,3) paralelas." },
    { titulo: "Recta, plano y planos",
      tabla: { cab: ["Caso", "Condición", "Resultado"], filas: [
        ["Recta y plano", "v·n ≠ 0", "un punto"],
        ["Recta y plano", "v·n = 0 y P ∈ π", "recta contenida"],
        ["Recta y plano", "v·n = 0 y P ∉ π", "paralelos"],
        ["Dos planos", "normales no prop.", "recta, v = n₁ × n₂"],
        ["Dos planos", "normales prop., D no", "paralelos"],
        ["Dos planos", "todo prop.", "coincidentes"]
      ] } },
    { titulo: "Tres planos (Rouché)", ancha: true,
      tabla: { cab: ["rg M", "rg M*", "Posición"], filas: [
        ["3", "3", "un punto"], ["2", "2", "una recta (haz) o dos coincidentes + otro"],
        ["2", "3", "prisma triangular o dos paralelos + otro"], ["1", "1", "los tres coincidentes"], ["1", "2", "paralelos (o 2 coincidentes + 1 paralelo)"]
      ] },
      nota: "Para separar casos con el mismo rango, mira qué normales son proporcionales." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Dos rectas no paralelas se cortan", bien: "pueden cruzarse: comprobar det(u, v, AQ)", por: "En el espacio hay una posición más." },
        { mal: "(x − 1)/2 = (y + 3)/0", bien: "y = −3 aparte", por: "No se divide entre 0." },
        { mal: "La normal incluye el término independiente", bien: "n = (A, B, C)", por: "D no es una componente." },
        { mal: "v·n = 0 ⟹ paralelos", bien: "o contenida: mira un punto", por: "Falta comprobar P." },
        { mal: "Director = n₁ + n₂", bien: "n₁ × n₂", por: "Perpendicular a las dos normales." },
        { mal: "det = 0 ⟹ se cortan (sin más)", bien: "descartar antes u ∥ v", por: "Si u ∥ v el det también es 0." }
      ] }
  ];

  B.registrar("mates2", "t5", {
    resumen: resumen, secciones: B.parte.m2t5a.secciones, nuevas: B.parte.m2t5b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
