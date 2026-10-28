/* ============================================================
   Matemáticas II · ampliaciones · Tema 13: Azar y probabilidad
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Reglas básicas</b>: P(Ā) = 1 − P(A); P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Laplace (favorables/posibles) solo con resultados <b>equiprobables</b>. «Al menos uno» = 1 − P(ninguno).",
    "<b>Álgebra de sucesos</b>: De Morgan (A ∪ B)ᶜ = Ā ∩ B̄ y (A ∩ B)ᶜ = Ā ∪ B̄. Solo A = P(A) − P(A ∩ B); exactamente uno = P(A) + P(B) − 2P(A ∩ B). Dibuja un Venn con las cuatro regiones: suman 1.",
    "<b>Combinatoria</b>: ¿importa el orden? Sí: variaciones n!/(n−k)!; no: C(n, k) = n!/(k!(n−k)!); todos en orden: n!. Extracciones «de golpe»: P = C(favorables por grupo)/C(total, k).",
    "<b>Condicionada y producto</b>: P(A | B) = P(A ∩ B)/P(B); P(A ∩ B) = P(B)·P(A | B). Ojo: P(A | B) ≠ P(B | A). P(Ā | B) = 1 − P(A | B).",
    "<b>Independencia ≠ incompatibilidad</b>: independientes ⟺ P(A ∩ B) = P(A)·P(B) ⟺ P(A | B) = P(A). Incompatibles: P(A ∩ B) = 0. Con probabilidades no nulas, incompatibles ⟹ NO independientes.",
    "<b>Probabilidad total</b>: con una partición B₁…Bₙ, P(A) = ΣP(Bᵢ)·P(A | Bᵢ): se multiplica por ramas y se suman las hojas con A. No es la media simple: hay que ponderar.",
    "<b>Bayes</b>: P(Bᵢ | A) = P(Bᵢ)·P(A | Bᵢ)/P(A) = hoja Bᵢ∩A entre la suma de todas las hojas con A. En un test, con enfermedad rara el positivo engaña (tasa base): se ve con 1.000 personas.",
    "<b>Estrategia</b>: nombrar sucesos, traducir datos (conjunta, condicionada, simple), elegir árbol/tabla/Venn, calcular, comprobar (entre 0 y 1; ramas que suman 1)."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«A y B son incompatibles con P(A) = 0,3 y P(B) = 0,4; por tanto P(A ∩ B) = 0,12 = P(A)·P(B)». ¿Qué falla?",
          op: ["Nada, está bien", "Incompatibles significa P(A ∩ B) = 0; el producto es para sucesos independientes", "Debería ser 0,7", "Debería ser 0,3 + 0,4 − 0,12"], ok: 1,
          porque: "Incompatibles: no pueden ocurrir a la vez, P(A ∩ B) = 0. Con probabilidades no nulas, jamás son independientes (0 ≠ 0,12)." },
        { q: "«P(A) = 0,5 y P(B) = 0,4, luego P(A ∪ B) = 0,9». ¿Qué falla?",
          op: ["Nada", "Solo se suma sin restar si son incompatibles; en general hay que restar P(A ∩ B)", "La unión siempre es el producto", "Debería dar 0,2"], ok: 1,
          porque: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Si no sabes nada de la intersección, no se puede dar un valor único: solo que está entre 0,5 y 0,9." },
        { q: "Test con prevalencia 1 %, sensibilidad 95 % y 5 % de falsos positivos. «Una persona da positivo, luego la probabilidad de estar enferma es 95 %». ¿Qué falla?",
          op: ["Nada, la sensibilidad es la respuesta", "Se confunde P(+ | enfermo) con P(enfermo | +); hay que aplicar Bayes y da ≈ 16 %", "Debería ser 5 %", "Debería ser 1 %"], ok: 1,
          porque: "El 95 % es P(+ | E). Lo que se pide es P(E | +) = 0,0095/0,059 ≈ 0,161. Con enfermedad rara hay muchos más falsos positivos que verdaderos." },
        { q: "Tres máquinas producen el 50 %, 30 % y 20 % con 2 %, 3 % y 6 % de defectuosas. «P(D) = (2 + 3 + 6)/3 = 3,67 %». ¿Qué falla?",
          op: ["Nada", "Es una media simple; la total pondera: 0,5·0,02 + 0,3·0,03 + 0,2·0,06 = 3,1 %", "Debería sumarse sin dividir", "Debería ser 6 %"], ok: 1,
          porque: "Cada porcentaje pesa lo que pesa su máquina. La probabilidad total es una media ponderada." },
        { q: "Una urna con 5 rojas y 3 azules; sin reponer. «La 2.ª bola es roja con probabilidad 4/7». ¿Qué falla?",
          op: ["Nada", "4/7 es P(2.ª roja | 1.ª roja); sin saber la 1.ª hay que hacer la total: 5/8·4/7 + 3/8·5/7 = 5/8", "Debería ser 5/7", "Debería ser 1/2"], ok: 1,
          porque: "Sin información sobre la primera, la 2.ª sale roja con la misma probabilidad que la 1.ª: 5/8. Solo si te dicen que la primera fue roja pasa a 4/7." },
        { q: "«(A ∪ B)ᶜ = Ā ∪ B̄». ¿Qué falla?",
          op: ["Nada", "De Morgan cambia la unión por intersección: (A ∪ B)ᶜ = Ā ∩ B̄", "Debería ser Ā ∪ B̄", "(A ∪ B)ᶜ = A ∩ B"], ok: 1,
          porque: "El complementario de «A o B» es «ni A ni B» = Ā ∩ B̄. El símbolo de la operación se invierte (∪ ↔ ∩) al pasar el complementario dentro." },
        { q: "«Con 3 dados, P(al menos un 6) = 3·(1/6) = 1/2». ¿Qué falla?",
          op: ["Nada", "Se suman sucesos que no son incompatibles; con el complementario: 1 − (5/6)³ = 91/216 ≈ 0,421", "Debería ser 1/6", "Debería ser 1/216"], ok: 1,
          porque: "Los 6 de cada dado pueden coincidir, así que sumar cuenta de más. Con el complementario: 1 − P(ningún 6) = 1 − 125/216 = 91/216." },
        { q: "«Si P(A | B) = P(B | A), entonces A y B son independientes». ¿Qué falla?",
          op: ["Nada", "P(A | B) = P(B | A) solo exige P(A) = P(B) (si P(A ∩ B) ≠ 0); no hay nada de independencia", "Debe ser P(A | B) = 0", "Debe ser P(A) = 1"], ok: 1,
          porque: "P(A ∩ B)/P(B) = P(A ∩ B)/P(A) ⟹ P(A) = P(B) (si P(A ∩ B) &gt; 0). La independencia es P(A | B) = P(A), no P(A | B) = P(B | A)." }
      ]
    },
    quiz1: {
      titulo: "Test de probabilidad",
      preguntas: [
        { q: "El complementario de «al menos uno de A, B» es", op: ["Ā ∩ B̄ (ninguno)", "Ā ∪ B̄", "A ∩ B", "A − B"], ok: 0, porque: "De Morgan: (A ∪ B)ᶜ = Ā ∩ B̄." },
        { q: "P(A) = 0,4; P(B) = 0,5; P(A ∩ B) = 0,2. Entonces P(A ∪ B) =", op: ["0,7", "0,9", "0,2", "0,1"], ok: 0, porque: "0,4 + 0,5 − 0,2 = 0,7." },
        { q: "Los sucesos A y B son independientes si", op: ["P(A ∩ B) = P(A)·P(B)", "P(A ∩ B) = 0", "P(A ∪ B) = P(A) + P(B)", "P(A) = P(B)"], ok: 0, porque: "Las otras son incompatibilidad (dos de ellas) o simplemente igualdad de probabilidades." },
        { q: "Comisión de 2 personas entre 7, sin orden. Número de comisiones", op: ["21", "42", "14", "49"], ok: 0, porque: "C(7, 2) = 7·6/2 = 21. (42 serían variaciones, con orden.)" },
        { q: "P(A | B) =", op: ["P(A ∩ B)/P(B)", "P(A ∩ B)/P(A)", "P(A)·P(B)", "P(B | A)"], ok: 0, porque: "La condición B va en el denominador." },
        { q: "Se saca una carta de una baraja de 40. P(rey de oros o copas) =", op: ["2/40 = 1/20", "1/40", "4/40", "1/2"], ok: 0, porque: "Hay un rey de oros y uno de copas: 2 casos favorables." },
        { q: "En un árbol, la probabilidad de un camino es", op: ["el producto de las probabilidades de sus ramas", "la suma de las ramas", "la media de las ramas", "la de la última rama"], ok: 0, porque: "Regla del producto: P(B ∩ A) = P(B)·P(A | B)." },
        { q: "El teorema de la probabilidad total exige que las causas", op: ["formen una partición (incompatibles y sumen 1)", "sean independientes", "tengan igual probabilidad", "sean solo dos"], ok: 0, porque: "Incompatibles dos a dos y que cubran todo E." },
        { q: "Un test tiene sensibilidad 99 %. Una persona da positivo, luego la probabilidad de estar enferma", op: ["depende también de la prevalencia y de los falsos positivos", "es 99 %", "es 1 %", "es 50 %"], ok: 0, porque: "Es P(E | +), que se calcula con Bayes; 99 % es P(+ | E)." },
        { q: "P(A) = 0,6; P(B) = 0,5 y son independientes. P(A ∪ B) =", op: ["0,8", "1,1", "0,3", "0,9"], ok: 0, porque: "0,6 + 0,5 − 0,3 = 0,8." },
        { q: "Si A y B son incompatibles con probabilidades no nulas, entonces", op: ["no son independientes", "son independientes", "P(A ∪ B) = 1", "P(A) = P(B)"], ok: 0, porque: "P(A ∩ B) = 0 ≠ P(A)·P(B) &gt; 0." },
        { q: "Tres monedas, P(al menos una cara) =", op: ["7/8", "3/8", "1/2", "1/8"], ok: 0, porque: "1 − P(ninguna) = 1 − (1/2)³ = 7/8." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de probabilidad",
      cartas: [
        { a: "Unión", b: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Incompatibles: sin restar." },
        { a: "Leyes de De Morgan", b: "(A ∪ B)ᶜ = Ā ∩ B̄ (ni A ni B)  ·  (A ∩ B)ᶜ = Ā ∪ B̄ (no los dos)." },
        { a: "Exactamente uno", b: "P(A) + P(B) − 2·P(A ∩ B) = P(solo A) + P(solo B)." },
        { a: "Al menos uno de varios independientes", b: "1 − P(Ā₁)·P(Ā₂)·…  (complementario de «ninguno»)." },
        { a: "Condicionada", b: "P(A | B) = P(A ∩ B)/P(B). La condición es lo que va detrás de la barra." },
        { a: "Regla del producto", b: "P(A ∩ B) = P(B)·P(A | B) = P(A)·P(B | A). En el árbol: producto por ramas." },
        { a: "Independientes", b: "P(A ∩ B) = P(A)·P(B)  ⟺  P(A | B) = P(A)  ⟺  P(B | A) = P(B)." },
        { a: "Incompatibles", b: "A ∩ B = ∅, P(A ∩ B) = 0. Con P(A), P(B) &gt; 0: NO independientes." },
        { a: "Probabilidad total", b: "P(A) = P(B₁)P(A | B₁) + … + P(Bₙ)P(A | Bₙ). Partición: incompatibles y suman 1." },
        { a: "Bayes", b: "P(Bᵢ | A) = P(Bᵢ)P(A | Bᵢ)/P(A): la hoja Bᵢ∩A entre la suma de las hojas con A." },
        { a: "Combinaciones y variaciones", b: "C(n, k) = n!/(k!(n−k)!) sin orden;  V(n, k) = n!/(n−k)! con orden;  C(n, k) = C(n, n−k)." },
        { a: "Test médico", b: "Sensibilidad = P(+ | E). Lo que interesa es P(E | +), que depende de la prevalencia. Truco: 1.000 personas." }
      ]
    },
    empar: {
      titulo: "Frase y símbolo",
      consigna: "Une cada frase con su expresión en sucesos.",
      pares: [
        ["Ocurre al menos uno de los dos", "A ∪ B"],
        ["No ocurre ninguno", "Ā ∩ B̄ = (A ∪ B)ᶜ"],
        ["No ocurren los dos a la vez", "Ā ∪ B̄ = (A ∩ B)ᶜ"],
        ["Ocurre A pero no B", "A ∩ B̄"],
        ["Ocurre exactamente uno", "(A ∩ B̄) ∪ (Ā ∩ B)"],
        ["Sabiendo que ha ocurrido B, ocurre A", "P(A | B)"]
      ]
    },
    clas: {
      titulo: "¿Qué herramienta uso?",
      consigna: "Toca cada situación y elige la herramienta que la resuelve.",
      categorias: ["Combinatoria + Laplace", "Probabilidad total", "Bayes", "Complementario («al menos uno»)"],
      items: [
        { t: "Repartir 5 cartas y pedir exactamente 2 oros", c: 0 },
        { t: "Elegir una comisión de 3 entre 10 personas", c: 0 },
        { t: "Probabilidad de que una pieza sea defectuosa, si hay tres máquinas", c: 1 },
        { t: "Se elige una urna al azar y se saca una bola: ¿prob. de roja?", c: 1 },
        { t: "Probabilidad de que sea de la máquina B sabiendo que es defectuosa", c: 2 },
        { t: "Dio positivo: ¿prob. de estar enfermo?", c: 2 },
        { t: "Salió cara: ¿prob. de que la moneda sea la trucada?", c: 2 },
        { t: "Tres tiradores independientes: acierta al menos uno", c: 3 },
        { t: "Al lanzar un dado 4 veces sale al menos un 6", c: 3 },
        { t: "Entre 3 elegidos de un grupo, hay al menos una chica", c: 3 }
      ]
    },
    orden: {
      titulo: "Un problema de Bayes paso a paso",
      consigna: "Ordena los pasos para resolver «sabiendo que ha ocurrido A, ¿cuál es la probabilidad de la causa Bᵢ?».",
      items: [
        { t: "Nombrar los sucesos: causas B₁, B₂, … y el resultado A", nota: "Escribe qué significa cada letra." },
        { t: "Escribir P(Bᵢ) y P(A | Bᵢ) (comprobar que las P(Bᵢ) suman 1)", nota: "Con ellas se dibuja el árbol." },
        { t: "Multiplicar por ramas: P(Bᵢ ∩ A) = P(Bᵢ)·P(A | Bᵢ)", nota: "Una hoja para cada causa." },
        { t: "Sumar las hojas con A: probabilidad total P(A)", nota: "Es el denominador." },
        { t: "Dividir la hoja de la causa pedida entre P(A)", nota: "Bayes: P(Bᵢ | A) = P(Bᵢ ∩ A)/P(A)." },
        { t: "Comprobar: entre 0 y 1 y las P(Bᵢ | A) suman 1", nota: "Si no suman 1, hay un error." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v) { return { tipo: "num", etiqueta: et, valor: v }; }
  function opc(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var DA = "P(A) = 0,5, P(B) = 0,4 y P(A ∪ B) = 0,7";
  var D2 = "P(A) = 0,6, P(B) = 0,5 y P(A ∩ B) = 0,2";
  var TAB = "En un grupo de 200 alumnos hay 120 chicas. Practican deporte 80 alumnos, y de ellos 50 son chicas.";
  var TEST = "Una enfermedad afecta al 1 % de la población. Un test da positivo en el 95 % de los enfermos y en el 5 % de los sanos.";
  var FAB = "Tres máquinas producen el 50 %, el 30 % y el 20 % de las piezas, con un 2 %, un 3 % y un 6 % de defectuosas.";
  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "e1", nivel: 1, enunciado: "Se lanza un dado. Calcula la probabilidad de que salga un múltiplo de 3 o un número par.", check: num("P =", 2 / 3),
      pistas: ["Escribe los dos conjuntos y haz la unión sin repetir."], pasos: ["Múltiplos de 3: {3, 6}. Pares: {2, 4, 6}.", "Unión: {2, 3, 4, 6}: 4 casos de 6."], resultado: "P = 4/6 = 2/3" },
    { id: "e2", nivel: 1, enunciado: "De una baraja española de 40 cartas se extrae una. Calcula la probabilidad de que sea una figura (sota, caballo o rey) o un as.", check: num("P =", 0.4),
      pistas: ["Hay 12 figuras y 4 ases, y ninguna carta es las dos cosas."], pasos: ["Incompatibles: 12 + 4 = 16 casos favorables.", "P = 16/40."], resultado: "P = 16/40 = 2/5 = 0,4" },
    { id: "e3", nivel: 1, enunciado: "Sean A y B con " + DA + ". Calcula P(A ∩ B).", check: num("P(A ∩ B) =", 0.2),
      pistas: ["Despeja de P(A ∪ B) = P(A) + P(B) − P(A ∩ B)."], pasos: ["P(A ∩ B) = 0,5 + 0,4 − 0,7."], resultado: "P(A ∩ B) = 0,2" },
    { id: "e4", nivel: 1, enunciado: "Con los datos anteriores (" + DA + "), calcula P(Ā ∩ B̄), la probabilidad de que no ocurra ninguno.", check: num("P(Ā ∩ B̄) =", 0.3),
      pistas: ["De Morgan: Ā ∩ B̄ = (A ∪ B)ᶜ."], pasos: ["P = 1 − P(A ∪ B) = 1 − 0,7."], resultado: "0,3" },
    { id: "e5", nivel: 1, enunciado: "Con los mismos datos (" + DA + "), calcula P(Ā ∪ B̄), la probabilidad de que no ocurran los dos a la vez.", check: num("P(Ā ∪ B̄) =", 0.8),
      pistas: ["De Morgan: Ā ∪ B̄ = (A ∩ B)ᶜ. Necesitas P(A ∩ B) = 0,2."], pasos: ["P = 1 − P(A ∩ B) = 1 − 0,2."], resultado: "0,8" },
    { id: "e6", nivel: 1, enunciado: "A y B son incompatibles, con P(A) = 0,35 y P(B) = 0,45. Calcula la probabilidad de que no ocurra ninguno.", check: num("P =", 0.2),
      pistas: ["Incompatibles: P(A ∪ B) = P(A) + P(B)."], pasos: ["P(A ∪ B) = 0,35 + 0,45 = 0,8.", "Ninguno: 1 − 0,8."], resultado: "0,2" },
    { id: "e7", nivel: 1, enunciado: "¿Cuántos números de 3 cifras distintas se pueden formar con los dígitos 1, 2, 3, 4 y 5?", check: num("Nº =", 60),
      pistas: ["Importa el orden y no se repiten: variaciones V(5, 3)."], pasos: ["5·4·3 = 60."], resultado: "60 números" },
    { id: "e8", nivel: 1, enunciado: "¿Cuántas comisiones distintas de 3 personas se pueden formar con un grupo de 8?", check: num("Nº =", 56),
      pistas: ["El orden no importa: C(8, 3)."], pasos: ["C(8, 3) = 8·7·6/(3·2·1) = 56."], resultado: "56 comisiones" },
    { id: "e9", nivel: 1, enunciado: "Una urna tiene 5 bolas rojas y 3 azules. Se extraen dos <b>sin reposición</b>. Calcula la probabilidad de que las dos sean rojas.", check: num("P =", 5 / 14),
      pistas: ["P(1.ª roja)·P(2.ª roja | 1.ª roja)."], pasos: ["5/8 · 4/7 = 20/56."], resultado: "P = 5/14 ≈ 0,357" },
    { id: "e10", nivel: 1, enunciado: "La misma urna (5 rojas y 3 azules), pero ahora <b>con reposición</b>. Calcula la probabilidad de que las dos sean rojas.", check: num("P =", 25 / 64),
      pistas: ["Las extracciones son independientes."], pasos: ["5/8 · 5/8 = 25/64."], resultado: "P = 25/64 ≈ 0,391" },
    { id: "e11", nivel: 1, enunciado: "Sean A y B con " + D2 + ". Calcula P(A | B).", check: num("P(A | B) =", 0.4),
      pistas: ["P(A ∩ B)/P(B)."], pasos: ["0,2/0,5."], resultado: "0,4" },
    { id: "e12", nivel: 1, enunciado: "Con los mismos datos (" + D2 + "), calcula P(B | A).", check: num("P(B | A) =", 1 / 3),
      pistas: ["Ahora el denominador es P(A)."], pasos: ["0,2/0,6."], resultado: "1/3 ≈ 0,333" },
    { id: "e13", nivel: 1, enunciado: "A y B son independientes, con P(A) = 0,5 y P(B) = 0,6. Calcula P(A ∪ B).", check: num("P(A ∪ B) =", 0.8),
      pistas: ["Independientes: P(A ∩ B) = P(A)·P(B)."], pasos: ["P(A ∩ B) = 0,3.", "P(A ∪ B) = 0,5 + 0,6 − 0,3."], resultado: "0,8" },
    { id: "e14", nivel: 1, enunciado: "La urna I tiene 2 bolas blancas y 3 negras; la urna II, 4 blancas y 1 negra. Se elige una urna al azar (con igual probabilidad) y se saca una bola. Calcula la probabilidad de que sea blanca.", check: num("P(blanca) =", 0.6),
      pistas: ["Probabilidad total con dos causas."], pasos: ["P = ½·(2/5) + ½·(4/5) = 0,2 + 0,4."], resultado: "P = 0,6" },
    // ---------------------------------------------------------------- ★★
    { id: "e15", nivel: 2, enunciado: "Se lanzan dos dados. Calcula la probabilidad de que la suma sea 8.", check: num("P =", 5 / 36),
      pistas: ["Cuenta los pares (a, b) de 36 con a + b = 8."], pasos: ["(2,6), (3,5), (4,4), (5,3), (6,2): 5 casos."], resultado: "P = 5/36 ≈ 0,139" },
    { id: "e16", nivel: 2, enunciado: "Se lanzan dos dados. Calcula la probabilidad de obtener al menos un 6.", check: num("P =", 11 / 36),
      pistas: ["Complementario: ningún 6 en los dos dados."], pasos: ["P(ningún 6) = (5/6)² = 25/36.", "P = 1 − 25/36."], resultado: "P = 11/36 ≈ 0,306" },
    { id: "e17", nivel: 2, enunciado: "De una baraja española de 40 cartas (10 oros) se reparten 5. Calcula la probabilidad de que haya exactamente 2 oros.", check: num("P =", 5075 / 18278),
      pistas: ["C(10, 2)·C(30, 3) entre C(40, 5)."], pasos: ["Favorables: 45·4.060 = 182.700.", "Posibles: C(40, 5) = 658.008.", "P = 182.700/658.008."], resultado: "P ≈ 0,2777" },
    { id: "e18", nivel: 2, enunciado: "Se elige una comisión de 3 personas entre 10 (6 chicas y 4 chicos). Calcula la probabilidad de que haya al menos un chico.", check: num("P =", 5 / 6),
      pistas: ["Complementario: todas chicas."], pasos: ["P(todas chicas) = C(6, 3)/C(10, 3) = 20/120 = 1/6.", "P = 1 − 1/6."], resultado: "P = 5/6" },
    { id: "e19", nivel: 2, enunciado: "Cinco amigos se sientan al azar en una fila de 5 sillas. Calcula la probabilidad de que Ana y Luis queden juntos.", check: num("P =", 2 / 5),
      pistas: ["Trata a la pareja como un bloque que puede ir en dos órdenes."], pasos: ["Favorables: 2·4! = 48. Posibles: 5! = 120."], resultado: "P = 48/120 = 2/5" },
    { id: "e20", nivel: 2, enunciado: "Tres tiradores aciertan con probabilidades 0,8, 0,7 y 0,6 y disparan de forma independiente. Calcula la probabilidad de que acierte al menos uno.", check: num("P =", 0.976),
      pistas: ["1 − P(ninguno acierta)."], pasos: ["P(ninguno) = 0,2·0,3·0,4 = 0,024.", "P = 1 − 0,024."], resultado: "P = 0,976" },
    { id: "e21", nivel: 2, enunciado: "Con los mismos tres tiradores (0,8; 0,7; 0,6), calcula la probabilidad de que acierte <b>exactamente uno</b>.", check: num("P =", 0.188),
      pistas: ["Suma los tres casos: solo el 1.º, solo el 2.º, solo el 3.º."], pasos: ["0,8·0,3·0,4 = 0,096;  0,2·0,7·0,4 = 0,056;  0,2·0,3·0,6 = 0,036.", "Suma: 0,188."], resultado: "P = 0,188" },
    { id: "e22", nivel: 2, enunciado: "Sean A y B <b>independientes</b>, con P(A) = 0,3 y P(A ∪ B) = 0,58. Calcula P(B).", check: num("P(B) =", 0.4),
      pistas: ["P(A ∪ B) = P(A) + P(B) − P(A)·P(B)."], pasos: ["0,58 = 0,3 + x − 0,3x ⟹ 0,7x = 0,28."], resultado: "P(B) = 0,4" },
    { id: "e23", nivel: 2, enunciado: "Sean A y B <b>incompatibles</b>, con P(A) = 0,3 y P(A ∪ B) = 0,58. Calcula P(B).", check: num("P(B) =", 0.28),
      pistas: ["Incompatibles: la intersección es nula."], pasos: ["0,58 = 0,3 + P(B)."], resultado: "P(B) = 0,28" },
    { id: "e24", nivel: 2, enunciado: TAB + " Se elige un alumno al azar. Sabiendo que practica deporte, ¿probabilidad de que sea chica?", check: num("P =", 0.625),
      pistas: ["Construye la tabla; la condición es «deporte»."], pasos: ["Deporte: 80 alumnos, 50 chicas.", "P = 50/80."], resultado: "P = 5/8 = 0,625" },
    { id: "e25", nivel: 2, enunciado: TAB + " Se elige una alumna (chica). ¿Probabilidad de que practique deporte?", check: num("P =", 5 / 12),
      pistas: ["Ahora la condición es «chica»: 120 chicas."], pasos: ["P = 50/120."], resultado: "P = 5/12 ≈ 0,417" },
    { id: "e26", nivel: 2, enunciado: TAB + " ¿Son independientes «ser chica» y «practicar deporte»?", check: opc("Respuesta", ["Sí, porque P(chica ∩ deporte) = P(chica)·P(deporte)", "No: P(chica)·P(deporte) = 0,24 ≠ 0,25", "No: son incompatibles", "Sí, porque hay chicas que practican deporte"], 1),
      pistas: ["Compara el producto de marginales con la casilla conjunta."], pasos: ["P(chica) = 0,6, P(deporte) = 0,4: producto 0,24.", "P(chica ∩ deporte) = 50/200 = 0,25 ≠ 0,24."], resultado: "No son independientes" },
    { id: "e27", nivel: 2, enunciado: TEST + " Calcula la probabilidad de que una persona elegida al azar dé positivo.", check: num("P(+) =", 0.059),
      pistas: ["Probabilidad total: enfermos y sanos."], pasos: ["0,01·0,95 + 0,99·0,05 = 0,0095 + 0,0495."], resultado: "P(+) = 0,059" },
    { id: "e28", nivel: 2, enunciado: TEST + " Una persona da positivo. Calcula la probabilidad de que esté enferma.", check: num("P(E | +) =", 0.0095 / 0.059),
      pistas: ["Bayes: hoja «enfermo y positivo» entre P(+)."], pasos: ["0,0095/0,059 ≈ 0,161."], resultado: "P(E | +) ≈ 0,161 (16,1 %)" },
    { id: "e29", nivel: 2, enunciado: FAB + " Calcula la probabilidad de que una pieza elegida al azar sea defectuosa.", check: num("P(D) =", 0.031),
      pistas: ["Probabilidad total con tres causas."], pasos: ["0,5·0,02 + 0,3·0,03 + 0,2·0,06 = 0,010 + 0,009 + 0,012."], resultado: "P(D) = 0,031" },
    { id: "e30", nivel: 2, enunciado: FAB + " Una pieza resulta defectuosa. Calcula la probabilidad de que sea de la tercera máquina.", check: num("P(M₃ | D) =", 12 / 31),
      pistas: ["Bayes: 0,012 entre P(D)."], pasos: ["0,012/0,031 = 12/31."], resultado: "P(M₃ | D) = 12/31 ≈ 0,387" },
    { id: "e31", nivel: 2, enunciado: "Sean A y B con " + D2 + ". Calcula P(A | B̄).", check: num("P(A | B̄) =", 0.8),
      pistas: ["P(A ∩ B̄) = P(A) − P(A ∩ B) y P(B̄) = 1 − P(B)."], pasos: ["P(A ∩ B̄) = 0,6 − 0,2 = 0,4.", "P(A | B̄) = 0,4/0,5."], resultado: "0,8" },
    // ---------------------------------------------------------------- ★★★
    { id: "e32", nivel: 3, enunciado: "La urna U₁ tiene 4 bolas blancas y 6 negras; la urna U₂, 3 blancas y 2 negras. Se saca una bola de U₁, se pasa a U₂ y se extrae una bola de U₂. Calcula la probabilidad de que esta sea blanca.", check: num("P =", 17 / 30),
      pistas: ["Causas: la bola pasada fue blanca o negra. Cambia la composición de U₂."], pasos: ["P(blanca | pasó blanca) = 4/6; P(blanca | pasó negra) = 3/6.", "P = 0,4·(2/3) + 0,6·(1/2) = 4/15 + 3/10."], resultado: "P = 17/30 ≈ 0,567" },
    { id: "e33", nivel: 3, enunciado: "En la situación anterior (U₁ → U₂), la bola extraída de U₂ es blanca. ¿Probabilidad de que la bola pasada desde U₁ fuese blanca?", check: num("P =", 8 / 17),
      pistas: ["Bayes con el resultado del ejercicio anterior en el denominador."], pasos: ["P(pasó blanca ∩ 2.ª blanca) = 0,4·(2/3) = 8/30.", "Dividir entre 17/30: 8/17."], resultado: "P = 8/17 ≈ 0,471" },
    { id: "e34", nivel: 3, enunciado: "Una caja tiene dos monedas: una normal y otra trucada con P(cara) = 0,8. Se elige una al azar y se lanza. Calcula la probabilidad de obtener cara.", check: num("P(cara) =", 0.65),
      pistas: ["Total con dos causas equiprobables."], pasos: ["0,5·0,8 + 0,5·0,5 = 0,4 + 0,25."], resultado: "P(cara) = 0,65" },
    { id: "e35", nivel: 3, enunciado: "En la caja anterior salió cara. ¿Probabilidad de que la moneda sea la trucada?", check: num("P =", 8 / 13),
      pistas: ["Bayes: 0,4 entre 0,65."], pasos: ["0,4/0,65 = 8/13."], resultado: "P = 8/13 ≈ 0,615" },
    { id: "e36", nivel: 3, enunciado: "Una urna tiene 5 bolas rojas y 3 azules. Se sacan dos <b>sin reposición</b>. Sin mirar la primera, ¿probabilidad de que la <b>segunda</b> sea roja?", check: num("P(2.ª roja) =", 5 / 8),
      pistas: ["Total: la primera pudo ser roja o azul."], pasos: ["5/8·4/7 + 3/8·5/7 = 20/56 + 15/56 = 35/56."], resultado: "P = 5/8 (igual que la primera)" },
    { id: "e37", nivel: 3, enunciado: "En la misma urna (5 rojas, 3 azules, sin reposición), la segunda bola ha sido roja. ¿Probabilidad de que la primera también lo fuese?", check: num("P =", 4 / 7),
      pistas: ["Bayes con P(2.ª roja) = 5/8."], pasos: ["P(R₁ ∩ R₂) = 5/14.", "(5/14)/(5/8) = 8/14 = 4/7."], resultado: "P = 4/7 ≈ 0,571" },
    { id: "e38", nivel: 3, enunciado: "Una enfermedad afecta al 2 % de la población. El test da positivo en el 90 % de los enfermos y en el 4 % de los sanos. Una persona da <b>negativo</b>. ¿Probabilidad de que esté enferma?", check: num("P(E | −) =", 0.002 / 0.9428),
      pistas: ["Falsos negativos: 10 % de los enfermos."], pasos: ["P(E ∩ −) = 0,02·0,10 = 0,002.", "P(−) = 0,002 + 0,98·0,96 = 0,9428.", "0,002/0,9428."], resultado: "P ≈ 0,0021 (0,21 %)" },
    { id: "e39", nivel: 3, enunciado: "Se sabe que P(A) = 0,7, P(B | A) = 0,5 y P(B | Ā) = 0,2. Calcula P(B).", check: num("P(B) =", 0.41),
      pistas: ["Total con la partición {A, Ā}."], pasos: ["0,7·0,5 + 0,3·0,2 = 0,35 + 0,06."], resultado: "P(B) = 0,41" },
    { id: "e40", nivel: 3, enunciado: "Con los datos anteriores (P(A) = 0,7, P(B | A) = 0,5, P(B | Ā) = 0,2), calcula P(A | B).", check: num("P(A | B) =", 35 / 41),
      pistas: ["Bayes: 0,35 entre 0,41."], pasos: ["P(A ∩ B) = 0,35.", "0,35/0,41 = 35/41."], resultado: "P(A | B) = 35/41 ≈ 0,854" },
    { id: "e41", nivel: 3, enunciado: "Sean A y B con P(A ∪ B) = 0,85, P(B) = 0,6 y P(A | B) = 0,5. Calcula P(A).", check: num("P(A) =", 0.55),
      pistas: ["Primero P(A ∩ B) = P(B)·P(A | B)."], pasos: ["P(A ∩ B) = 0,6·0,5 = 0,3.", "P(A) = P(A ∪ B) − P(B) + P(A ∩ B) = 0,85 − 0,6 + 0,3."], resultado: "P(A) = 0,55" },
    { id: "e42", nivel: 3, enunciado: "Una bolsa tiene 10 bolas, 4 rojas y 6 verdes. Se extraen 3 <b>a la vez</b>. Calcula la probabilidad de que exactamente 2 sean rojas.", check: num("P =", 0.3),
      pistas: ["C(4, 2)·C(6, 1) entre C(10, 3)."], pasos: ["Favorables: 6·6 = 36. Posibles: 120.", "36/120."], resultado: "P = 3/10" },
    { id: "e43", nivel: 3, enunciado: "Se lanzan tres dados. Calcula la probabilidad de que salga al menos un 6.", check: num("P =", 91 / 216),
      pistas: ["No sumes 3·(1/6): usa el complementario."], pasos: ["P(ningún 6) = (5/6)³ = 125/216.", "P = 1 − 125/216."], resultado: "P = 91/216 ≈ 0,421" },
    { id: "e44", nivel: 3, enunciado: "Si A y B son incompatibles y P(A) &gt; 0, P(B) &gt; 0, entonces", check: opc("Se cumple", ["A y B no son independientes", "A y B son independientes", "P(A ∪ B) = 1", "P(A | B) = P(A)"], 0),
      pistas: ["Compara P(A ∩ B) con P(A)·P(B)."], pasos: ["P(A ∩ B) = 0, pero P(A)·P(B) &gt; 0."], resultado: "No son independientes" },
    { id: "e45", nivel: 3, enunciado: "El suceso «A y B no ocurren a la vez» se escribe y tiene probabilidad", check: opc("Es", ["Ā ∪ B̄, con probabilidad 1 − P(A ∩ B)", "Ā ∩ B̄, con probabilidad 1 − P(A ∪ B)", "Ā ∪ B̄, con probabilidad 1 − P(A ∪ B)", "A ∩ B̄, con probabilidad P(A) − P(B)"], 0),
      pistas: ["De Morgan sobre (A ∩ B)ᶜ."], pasos: ["(A ∩ B)ᶜ = Ā ∪ B̄, con probabilidad 1 − P(A ∩ B)."], resultado: "Ā ∪ B̄, 1 − P(A ∩ B)" },
    { id: "e46", nivel: 3, enunciado: "Con prevalencia del 10 % y un 5 % de falsos positivos, ¿qué sensibilidad s debe tener un test para que P(enfermo | positivo) = 0,5?", check: num("s =", 0.45),
      pistas: ["Plantea 0,1s/(0,1s + 0,9·0,05) = 0,5."], pasos: ["0,1s = 0,5(0,1s + 0,045).", "0,05s = 0,0225 ⟹ s = 0,45."], resultado: "s = 0,45 (45 %)" },
    { id: "e47", nivel: 3, enunciado: "La probabilidad de que ocurra «exactamente uno» de los sucesos A y B es", check: opc("Es", ["P(A) + P(B) − 2·P(A ∩ B)", "P(A) + P(B) − P(A ∩ B)", "P(A) + P(B)", "1 − P(A ∪ B)"], 0),
      pistas: ["Solo A + solo B, sin la intersección."], pasos: ["(P(A) − P(A ∩ B)) + (P(B) − P(A ∩ B))."], resultado: "P(A) + P(B) − 2·P(A ∩ B)" },
    { id: "e48", nivel: 3, enunciado: "<b>(Tipo EvAU)</b> Sean A y B con P(A) = 0,4, P(B) = 0,5 y P(A ∪ B) = 0,7. Calcula (a) P(A ∩ B); (b) P(A | B); (c) P(Ā ∩ B̄); (d) P(B | Ā); y (e) di si A y B son independientes.",
      check: [num("(a) P(A ∩ B) =", 0.2), num("(b) P(A | B) =", 0.4), num("(c) P(Ā ∩ B̄) =", 0.3), num("(d) P(B | Ā) =", 0.5), opc("(e) A y B", ["son independientes", "no son independientes", "son incompatibles", "no se puede saber"], 0)],
      pistas: ["(d): P(B ∩ Ā) = P(B) − P(A ∩ B). (e): compara P(A)·P(B) con P(A ∩ B)."],
      pasos: ["(a) 0,4 + 0,5 − 0,7 = 0,2.  (b) 0,2/0,5 = 0,4.  (c) 1 − 0,7 = 0,3.", "(d) P(B ∩ Ā) = 0,5 − 0,2 = 0,3; P(Ā) = 0,6 ⟹ 0,3/0,6 = 0,5.", "(e) P(A)·P(B) = 0,2 = P(A ∩ B): independientes."], resultado: "0,2; 0,4; 0,3; 0,5; independientes" },
    { id: "e49", nivel: 3, enunciado: "<b>(Tipo EvAU)</b> Se lanza un dado. Si sale 1 o 2, se extrae una bola de la urna X (3 rojas y 1 azul); si sale 3, 4, 5 o 6, se extrae una bola de la urna Y (1 roja y 3 azules). Calcula (a) la probabilidad de que la bola sea roja; (b) sabiendo que es roja, la probabilidad de que venga de la urna X.",
      check: [num("(a) P(roja) =", 5 / 12), num("(b) P(X | roja) =", 3 / 5)],
      pistas: ["P(X) = 2/6 = 1/3 y P(Y) = 2/3."], pasos: ["(a) 1/3·3/4 + 2/3·1/4 = 1/4 + 1/6 = 5/12.", "(b) (1/4)/(5/12) = 3/5."], resultado: "5/12 ≈ 0,417; 3/5 = 0,6" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Álgebra de sucesos", ancha: true,
      tabla: { cab: ["En castellano", "En símbolos", "Probabilidad"], filas: [
        ["Al menos uno", "A ∪ B", "P(A) + P(B) − P(A ∩ B)"],
        ["Los dos", "A ∩ B", "P(A ∩ B)"],
        ["Ninguno", "Ā ∩ B̄ = (A ∪ B)ᶜ", "1 − P(A ∪ B)"],
        ["No los dos", "Ā ∪ B̄ = (A ∩ B)ᶜ", "1 − P(A ∩ B)"],
        ["Solo A", "A ∩ B̄", "P(A) − P(A ∩ B)"],
        ["Exactamente uno", "(A ∩ B̄) ∪ (Ā ∩ B)", "P(A) + P(B) − 2P(A ∩ B)"]
      ] },
      nota: "Las cuatro regiones del Venn suman 1." },
    { titulo: "Independientes frente a incompatibles",
      tabla: { cab: ["", "Incompatibles", "Independientes"], filas: [
        ["Condición", "P(A ∩ B) = 0", "P(A ∩ B) = P(A)·P(B)"],
        ["Unión", "P(A) + P(B)", "P(A) + P(B) − P(A)P(B)"],
        ["Condicionada", "P(A | B) = 0", "P(A | B) = P(A)"]
      ] },
      nota: "Con P(A), P(B) &gt; 0: incompatibles ⟹ NO independientes." },
    { titulo: "Total y Bayes: el árbol",
      pasos: [
        "<b>Causas</b> B₁, B₂, … (suman 1) en la primera etapa; el resultado A en la segunda.",
        "<b>Hoja</b> = producto de su rama: P(Bᵢ ∩ A) = P(Bᵢ)·P(A | Bᵢ).",
        "<b>Total</b>: P(A) = suma de las hojas con A.",
        "<b>Bayes</b>: P(Bᵢ | A) = hoja Bᵢ∩A / P(A).",
        "<b>Test médico</b>: con enfermedad rara, positivo ≠ enfermo (usa 1.000 personas).",
        "<b>Comprueba</b>: ramas de cada nodo suman 1; los P(Bᵢ | A) suman 1."
      ], nota: "Condicionada: la condición va detrás de la barra." }
  ];

  B.registrar("mates2", "t13", {
    resumen: resumen, secciones: B.parte.m2t13a.secciones, nuevas: B.parte.m2t13b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
