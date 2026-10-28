/* ============================================================
   Matemáticas II · ampliaciones · Tema 13: Azar y probabilidad
   (parte A: se añade al final de las cinco secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t13/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso: Laplace y operaciones
  secciones[0] =
    "<h5>Las reglas que sostienen todo el tema</h5>" +
    "<p>Un <b>experimento aleatorio</b> tiene un <b>espacio muestral</b> E (todos los resultados posibles) y los <b>sucesos</b> son subconjuntos de E. La probabilidad cumple tres reglas, y de ellas salen todas las demás:</p>" +
    "<ul><li>0 ≤ P(A) ≤ 1 y P(E) = 1.</li>" +
    "<li><b>Complementario</b>: P(Ā) = 1 − P(A). Es el truco más útil de todo el tema: «al menos uno» se calcula casi siempre como 1 − P(«ninguno»).</li>" +
    "<li><b>Unión</b>: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Se resta la intersección porque se ha contado dos veces. Si A y B son <b>incompatibles</b> (A ∩ B = ∅), se reduce a P(A) + P(B).</li></ul>" +
    "<p>La <b>regla de Laplace</b>, P(A) = casos favorables / casos posibles, solo vale cuando <b>todos los resultados elementales son equiprobables</b>. Con dos dados, los 36 pares (a, b) lo son, pero las 11 sumas posibles (2 a 12) <b>no</b>: la suma 7 sale de 6 pares y la suma 2 de uno solo.</p>" +
    w("m13_laplace") +
    ejemplo("Laplace con dos dados",
      "Se lanzan dos dados. Calcula la probabilidad de que la suma sea 7 y la de que la suma sea 7 o los dos números sean iguales.",
      ["Espacio muestral: 36 pares equiprobables. Suma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) ⟹ <b>P = 6/36 = 1/6</b>.",
       "Dobles: (1,1), …, (6,6) ⟹ 6 casos. Ninguno de los dobles suma 7 (la suma de dos números iguales es par), así que son incompatibles.",
       "P(suma 7 ∪ dobles) = 6/36 + 6/36 = <b>12/36 = 1/3</b>."]) +
    ejemplo("La unión con datos",
      "Sean A y B dos sucesos con P(A) = 0,5, P(B) = 0,4 y P(A ∪ B) = 0,7. Calcula P(A ∩ B).",
      ["Despejamos de P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
       "P(A ∩ B) = 0,5 + 0,4 − 0,7 = <b>0,2</b>.",
       "Comprobación: tiene que estar entre max(0, 0,5 + 0,4 − 1) = 0 y min(0,5; 0,4) = 0,4 ✓."]) +
    ojo("Si un enunciado te da P(A) = 0,7 y P(B) = 0,6 <b>no pueden ser incompatibles</b>: sumarían 1,3 &gt; 1. De hecho, P(A ∩ B) ≥ 0,7 + 0,6 − 1 = 0,3. Detectar un dato imposible es una pregunta típica.");

  // ---------------------------------------------------------------- 2. Combinatoria
  secciones[1] =
    "<h5>Tres preguntas para elegir la fórmula</h5>" +
    "<p>Antes de calcular, responde: <b>(1)</b> ¿entran todos los elementos o solo una parte? <b>(2)</b> ¿importa el orden? <b>(3)</b> ¿pueden repetirse? Con eso eliges:</p>" +
    tabla(["Situación", "Fórmula", "Ejemplo"], [
      ["Todos, en orden", "P(n) = n!", "Ordenar 5 personas en una fila: 120"],
      ["Una parte, importa el orden", "V(n, k) = n!/(n−k)!", "Podio de 3 entre 8 corredores: 8·7·6 = 336"],
      ["Una parte, NO importa el orden", "C(n, k) = n!/(k!(n−k)!)", "Comisión de 3 entre 8 personas: 56"],
      ["Todos, con elementos repetidos", "n!/(a!·b!…)", "Palabras con las letras de MAMA: 4!/(2!·2!) = 6"]
    ]) +
    "<p>Dos propiedades ahorran muchas cuentas: <b>C(n, k) = C(n, n−k)</b> (elegir los que entran es lo mismo que elegir los que se quedan fuera) y <b>C(n, 0) = C(n, n) = 1</b>. En probabilidad, la combinatoria se usa para <b>contar casos favorables y posibles</b> cuando se extraen varios elementos «de golpe» (o sin reposición, sin importar el orden): P = C(favorables…)/C(total, k).</p>" +
    w("m13_combinatoria") +
    ejemplo("Extraer varias cartas: producto de combinaciones",
      "De una baraja española (40 cartas, 10 oros) se reparten 5 cartas. Calcula la probabilidad de que haya exactamente 2 oros.",
      ["Casos posibles: C(40, 5) = 658.008 manos distintas (el orden de las cartas no importa).",
       "Casos favorables: 2 oros de 10 y las otras 3 cartas de las 30 que no son oros: C(10, 2)·C(30, 3) = 45·4.060 = 182.700.",
       "<b>P = 182.700/658.008 = 5.075/18.278 ≈ 0,2777.</b>",
       "Idea clave: se <b>multiplica</b> por cada grupo («2 de los oros» y «3 de los no oros») y se <b>divide</b> por todas las manos."]) +
    ejemplo("«Al menos uno» con combinaciones",
      "Se elige una comisión de 3 personas entre 10 (6 chicas y 4 chicos). ¿Probabilidad de que haya al menos un chico?",
      ["«Al menos un chico» es el contrario de «ninguno»: la comisión sería solo de chicas.",
       "P(ninguno) = C(6, 3)/C(10, 3) = 20/120 = 1/6.",
       "<b>P(al menos un chico) = 1 − 1/6 = 5/6.</b> Contar directamente (1 chico, 2 chicos, 3 chicos) también sale, pero con tres sumandos."]) +
    ejemplo("Permutaciones con una condición",
      "Cinco amigos se sientan al azar en una fila de 5 sillas. ¿Probabilidad de que Ana y Luis estén juntos?",
      ["Casos posibles: 5! = 120.",
       "Favorables: se trata la pareja como un bloque. Con el bloque y los otros 3 hay 4 «piezas» ⟹ 4! ordenaciones, y dentro del bloque Ana-Luis o Luis-Ana: ×2. Total 2·4! = 48.",
       "<b>P = 48/120 = 2/5.</b>"]) +
    ojo("Si tras escribir C(n, k) la probabilidad sale mayor que 1, hay un error: los favorables siempre están dentro de los posibles. Comprueba que en el numerador los elementos elegidos suman k y que los «de cada grupo» suman n.");

  // ---------------------------------------------------------------- 3. Condicionada
  secciones[2] =
    "<h5>La regla del producto y los cuatro números que importan</h5>" +
    "<p>Despejando de la definición se obtiene la <b>regla del producto</b>: <b>P(A ∩ B) = P(B)·P(A | B) = P(A)·P(B | A)</b>. Es la regla que usan los diagramas de árbol: se multiplica a lo largo de una rama. Dos propiedades de la condicionada, a menudo olvidadas: (1) P( · | B) es una probabilidad como cualquier otra, así que <b>P(Ā | B) = 1 − P(A | B)</b>; (2) <b>P(A | B) ≠ P(B | A)</b> en general: «de los que tienen fiebre, pocos tienen gripe grave» no es lo mismo que «de los que tienen gripe grave, pocos tienen fiebre».</p>" +
    ejemplo("Las condicionadas a partir de tres datos",
      "Sean P(A) = 0,6, P(B) = 0,5 y P(A ∩ B) = 0,2. Calcula P(A | B), P(B | A), P(A | B̄) y P(A ∪ B).",
      ["P(A | B) = P(A ∩ B)/P(B) = 0,2/0,5 = <b>0,4</b>.   P(B | A) = 0,2/0,6 = <b>1/3</b> ≈ 0,333.",
       "Para P(A | B̄) se necesita P(A ∩ B̄) = P(A) − P(A ∩ B) = 0,6 − 0,2 = 0,4 (la parte de A que no está en B) y P(B̄) = 0,5. Entonces <b>P(A | B̄) = 0,4/0,5 = 0,8</b>.",
       "P(A ∪ B) = 0,6 + 0,5 − 0,2 = <b>0,9</b>.",
       "Fíjate: P(A | B) = 0,4 &lt; P(A) = 0,6 &lt; P(A | B̄) = 0,8. Saber que B ocurre hace A <b>menos</b> probable: A y B no son independientes. (Pruébalo en el simulador de la sección 6 con P(A) = 0,6, P(B) = 0,5 y P(A ∩ B) = 0,2.)"]) +
    ejemplo("Sin reposición: regla del producto",
      "Una urna tiene 5 bolas rojas y 3 azules. Se sacan dos sin reponer. ¿Probabilidad de que ambas sean rojas?",
      ["P(1.ª roja) = 5/8. Como la bola no vuelve, quedan 4 rojas de 7: P(2.ª roja | 1.ª roja) = 4/7.",
       "<b>P(R₁ ∩ R₂) = 5/8 · 4/7 = 20/56 = 5/14 ≈ 0,357.</b>",
       "Con reposición sería 5/8 · 5/8 = 25/64 ≈ 0,391: las extracciones serían independientes."]) +
    w("m13_urna");

  // ---------------------------------------------------------------- 4. Probabilidad total
  secciones[3] =
    "<h5>Cómo se arma el árbol: tres causas</h5>" +
    "<p>La probabilidad total funciona con <b>cualquier</b> número de causas, siempre que formen una <b>partición</b>: son incompatibles dos a dos y entre todas cubren E (sus probabilidades suman 1). Se dibuja un árbol con las causas B₁, B₂, B₃ en la primera etapa y el suceso A (o su contrario Ā) en la segunda; <b>cada hoja vale el producto de su rama</b> y la probabilidad de A es la suma de las hojas que acaban en A.</p>" +
    ejemplo("Tres máquinas",
      "Tres máquinas producen el 50 %, el 30 % y el 20 % de las piezas de una fábrica, con un 2 %, un 3 % y un 6 % de piezas defectuosas respectivamente. ¿Probabilidad de que una pieza elegida al azar sea defectuosa?",
      ["Causas: M₁, M₂, M₃ con P = 0,5; 0,3; 0,2 (suman 1 ✓). Suceso D = «defectuosa» con P(D | Mᵢ) = 0,02; 0,03; 0,06.",
       "Hojas con D: 0,5·0,02 = 0,010;  0,3·0,03 = 0,009;  0,2·0,06 = 0,012.",
       "<b>P(D) = 0,010 + 0,009 + 0,012 = 0,031</b> (un 3,1 %).",
       "Comprobación de sentido común: tiene que quedar entre el menor (2 %) y el mayor (6 %) de los porcentajes, y más cerca de los de las máquinas que fabrican más."]) +
    w("m2_total_bayes") +
    ojo("No es lo mismo la probabilidad total que la <b>media simple</b> de los porcentajes: (2 + 3 + 6)/3 ≈ 3,67 % ≠ 3,1 %. Hay que <b>ponderar</b> por lo que fabrica cada máquina. Y recuerda que las probabilidades de las ramas que salen de un mismo nodo deben sumar 1: es la mejor forma de detectar un dato mal copiado.");

  // ---------------------------------------------------------------- 5. Bayes
  secciones[4] =
    "<h5>Bayes con frecuencias: 1.000 personas lo aclaran todo</h5>" +
    "<p>La fórmula de Bayes asusta menos si se traduce a <b>contar personas</b>. Imagina 1.000 personas y reparte según las probabilidades. El teorema dice entonces: <i>de las que cumplen el resultado observado, ¿qué fracción viene de cada causa?</i></p>" +
    ejemplo("Test médico (el resultado que sorprende)",
      "Una enfermedad afecta al 1 % de la población. Un test da positivo en el 95 % de los enfermos (sensibilidad) y también en el 5 % de los sanos (falsos positivos). Una persona da positivo. ¿Probabilidad de que esté enferma?",
      ["Con 1.000 personas: 10 enfermas y 990 sanas.",
       "Positivos entre los enfermos: 0,95·10 = 9,5.  Positivos entre los sanos: 0,05·990 = 49,5.  Total de positivos: 59.",
       "Solo 9,5 de los 59 positivos están enfermos: <b>P(E | +) = 9,5/59 ≈ 0,161</b>. ¡Un 16 %, no un 95 %!",
       "Con la fórmula: P(E | +) = 0,01·0,95/(0,01·0,95 + 0,99·0,05) = 0,0095/0,059 ≈ 0,161. Es lo mismo; el árbol y las 1.000 personas dan los mismos números.",
       "La explicación: la enfermedad es rara, y el 5 % de los 990 sanos es muchísima más gente que el 95 % de los 10 enfermos. Esto se llama <b>falacia de la tasa base</b>."]) +
    w("m13_bayes") +
    "<p>Prueba a subir la prevalencia del 1 % al 20 %: la probabilidad de estar enfermo tras un positivo sube con fuerza. Un test no es «bueno» o «malo» en abstracto: lo que significa un positivo depende de lo frecuente que sea la enfermedad en el grupo al que se aplica.</p>" +
    ejemplo("Bayes con tres causas",
      "En la fábrica de las tres máquinas (50 %, 30 %, 20 % de la producción; 2 %, 3 %, 6 % de defectuosas), se encuentra una pieza defectuosa. ¿De qué máquina es más probable que proceda?",
      ["P(D) = 0,031 (calculado arriba). Hojas con D: 0,010; 0,009; 0,012.",
       "P(M₁ | D) = 0,010/0,031 = 10/31 ≈ 0,323.   P(M₂ | D) = 0,009/0,031 = 9/31 ≈ 0,290.   P(M₃ | D) = 0,012/0,031 = 12/31 ≈ <b>0,387</b>.",
       "Suman 1 ✓ (10 + 9 + 12 = 31). La máquina M₃ solo fabrica el 20 % de las piezas pero es responsable del 38,7 % de las defectuosas: «antes» 0,20, «después» 0,387.",
       "Si la pieza fuese <b>correcta</b>, el denominador sería P(D̄) = 1 − 0,031 = 0,969 y, por ejemplo, P(M₁ | D̄) = 0,5·0,98/0,969 ≈ 0,506."]);

  B.parte.m2t13a = { secciones: secciones };
})(window);
