/* ============================================================
   Matemáticas I · ampliaciones · Tema 13: Probabilidad
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla, formula = H.formula;
  function w(n, ref) { return H.w(n, ref && "mates1/t13/" + ref); }

  var resumen = [
    "Un <b>experimento aleatorio</b> tiene varios resultados posibles que se conocen de antemano, pero no se sabe cuál saldrá. El <b>espacio muestral</b> E recoge todos los resultados; un <b>suceso</b> es un subconjunto de E.",
    "Los sucesos se combinan como conjuntos: <b>A ∪ B</b> («A o B», al menos uno), <b>A ∩ B</b> («A y B»), <b>Ā</b> («no A»), <b>A − B</b> («A pero no B»). Leyes de De Morgan: (A ∪ B)ᶜ = Ā ∩ B̄ y (A ∩ B)ᶜ = Ā ∪ B̄.",
    "<b>Regla de Laplace</b>: si todos los resultados son equiprobables, P(A) = casos favorables / casos posibles. Para contar casos sin listarlos se usa la <b>combinatoria</b> (variaciones, permutaciones, combinaciones).",
    "Axiomas de Kolmogorov: P(A) ≥ 0, P(E) = 1 y P(A ∪ B) = P(A) + P(B) si A y B son incompatibles. De ellos salen P(Ā) = 1 − P(A), P(∅) = 0 y la <b>fórmula de la unión</b>: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
    "<b>Probabilidad condicionada</b>: P(A | B) = P(A ∩ B)/P(B). Regla del producto: P(A ∩ B) = P(A)·P(B | A). <b>Independientes</b>: P(A ∩ B) = P(A)·P(B). Incompatibles e independientes son ideas distintas (casi opuestas).",
    "Con un sistema completo de sucesos A₁, …, Aₙ: <b>probabilidad total</b> P(B) = ΣP(Aᵢ)·P(B | Aᵢ) y <b>teorema de Bayes</b> P(Aᵢ | B) = P(Aᵢ)·P(B | Aᵢ)/P(B). Los diagramas de árbol y las tablas de contingencia lo organizan todo.",
    "Adelanto: una <b>variable aleatoria</b> asigna un número a cada resultado; la <b>binomial</b> B(n, p) cuenta los éxitos en n pruebas independientes (media np, varianza np(1 − p))."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Experimentos y espacio muestral
  secciones[0] =
    "<h5>Determinista o aleatorio: qué se puede predecir</h5>" +
    "<p>La palabra «azar» se usa en la vida diaria con muchos sentidos. En matemáticas se precisa con tres condiciones. Un experimento es <b>aleatorio</b> si:</p>" +
    "<ol>" +
    "<li>se conocen de antemano <b>todos los resultados posibles</b> (aunque sean muchos);</li>" +
    "<li>antes de realizarlo <b>no se puede predecir</b> cuál de ellos ocurrirá;</li>" +
    "<li>se puede <b>repetir</b> en las mismas condiciones tantas veces como se quiera.</li>" +
    "</ol>" +
    "<p>Lanzar un dado cumple las tres cosas. En cambio, «¿ganará mi equipo el domingo?» no es un experimento aleatorio en este sentido, porque no se puede repetir en idénticas condiciones, aunque aun así tenga sentido hablar de <i>grados de creencia</i> (más abajo). Un experimento <b>determinista</b> es el contrario: las condiciones determinan el resultado (la caída libre de una piedra desde 20 m tarda siempre lo mismo, con el mismo rozamiento).</p>" +
    "<p>Lo notable es que, aunque el resultado de <i>una</i> repetición sea impredecible, el <b>conjunto</b> de muchas repeticiones sí sigue un patrón: si lanzas una moneda 10 veces puede salir cualquier cosa, pero si la lanzas 100 000 veces la proporción de caras se queda muy cerca de 1/2. A esta estabilidad de las frecuencias se le llama <b>regularidad estadística</b> y es lo que hace posible una teoría de la probabilidad.</p>" +
    "<h5>Cómo construir el espacio muestral</h5>" +
    "<p>Para escribir E sin olvidar casos hay que ser sistemático. Lo primero es decidir si <b>importa el orden</b> en que aparecen los resultados parciales y si los objetos son <b>distinguibles</b>:</p>" +
    "<ul>" +
    "<li><b>Dos monedas distintas</b> (o la misma lanzada dos veces): E = {CC, CX, XC, XX}, 4 resultados. CX (cara en la primera, cruz en la segunda) y XC son <b>diferentes</b>. Escribir E = {2 caras, 1 cara, 0 caras} es correcto como lista de <i>posibles números de caras</i>, pero no como lista de resultados igual de probables.</li>" +
    "<li><b>Dos dados</b>: E = {(1,1), (1,2), …, (6,6)}, 6·6 = 36 pares ordenados. (1,2) y (2,1) son resultados distintos aunque tengan la misma suma.</li>" +
    "<li><b>Tres monedas</b>: 2·2·2 = 8 resultados: CCC, CCX, CXC, CXX, XCC, XCX, XXC, XXX.</li>" +
    "<li><b>Sacar dos bolas de una urna con una bola roja, una azul y una verde</b>: con orden y sin reposición hay 3·2 = 6 resultados (RA, RV, AR, AV, VR, VA); si sólo interesa <i>qué dos colores</i> salieron y no el orden, hay 3 (RA, RV, AV).</li>" +
    "</ul>" +
    "<p>Dos herramientas dibujan el espacio muestral sin perder casos: la <b>tabla de doble entrada</b> (filas = primer resultado, columnas = segundo) y el <b>diagrama de árbol</b> (cada nivel es una etapa del experimento). Las dos aparecen una y otra vez en este tema.</p>" +
    "<div class='callout'><b>Principio multiplicativo.</b> Si un experimento tiene dos etapas, la primera con m resultados y la segunda con n (sea cual sea el resultado de la primera), en total hay <b>m·n</b> resultados. Con tres etapas, m·n·p, etc. Es la clave de todo lo que viene después (combinatoria).</div>" +
    "<h5>Sucesos: elementales, compuestos, seguro e imposible</h5>" +
    "<p>Un suceso es un subconjunto de E. Si tiene un solo elemento se llama <b>suceso elemental</b> («sale el 4»); si tiene varios, <b>suceso compuesto</b> («sale par» = {2, 4, 6}). Dos sucesos extremos merecen nombre propio: el <b>suceso seguro</b> es E (ocurre siempre) y el <b>suceso imposible</b> es ∅ (no ocurre nunca).</p>" +
    "<p>¿Cuántos sucesos distintos hay? Un suceso queda determinado decidiendo, para cada uno de los n elementos de E, si está dentro o fuera: 2·2·…·2 = <b>2ⁿ</b> sucesos en total (incluidos ∅ y E). Con E = {1, 2, 3} hay 2³ = 8: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3} y E. Con un dado, 2⁶ = 64 sucesos; con dos dados, 2³⁶ ≈ 6,9·10¹⁰: por eso nunca se escriben todos, se describen con una condición.</p>" +
    w("m13_montecarlo") +
    "<h5>Tres maneras de entender «probabilidad»</h5>" +
    tabla(["Enfoque", "Idea", "Cuándo se usa", "Limitación"], [
      ["Clásico (Laplace)", "casos favorables entre casos posibles, si todos son igual de probables", "dados, monedas, barajas, urnas, loterías", "sólo vale con resultados equiprobables y en número finito"],
      ["Frecuentista", "P(A) es el valor al que se acerca la frecuencia relativa de A al repetir muchas veces el experimento", "fabricación (piezas defectuosas), seguros, genética, meteorología", "hay que poder repetir el experimento; sólo se obtiene una aproximación"],
      ["Subjetivo (bayesiano)", "grado de confianza de una persona, revisable cuando llegan datos nuevos", "sucesos únicos: elecciones, diagnóstico, ciencia", "depende de quién lo evalúa si no se calibra con datos"]
    ]) +
    "<p>Los tres comparten reglas de cálculo, y eso permitió a Kolmogorov (1933) construir una teoría <b>axiomática</b> válida para todos (sección 4). La <b>ley de los grandes números</b> (la simulación de arriba) justifica el enfoque frecuentista: si P(A) = p, la frecuencia relativa de A tiende a p al aumentar n. Pero cuidado: <i>no</i> afirma que las desviaciones se «compensen»; sólo que, relativamente, se hacen insignificantes (ver la falacia del jugador en la sección 11).</p>" +
    ejemplo("Tres hijos", "Una familia tiene tres hijos. Escribe el espacio muestral (sexo de cada hijo, de mayor a menor) y calcula la probabilidad de que tenga exactamente dos chicas, suponiendo que chico y chica son igual de probables.", [
      "Cada hijo es una etapa con 2 resultados: E = {CCC, CCO, COC, COO, OCC, OCO, OOC, OOO} (C = chica, O = chico), 2³ = 8 resultados equiprobables.",
      "Exactamente dos chicas: CCO, COC, OCC → 3 casos favorables.",
      "P(exactamente dos chicas) = <b>3/8</b> = 0,375. Con una sola chica también es 3/8; con tres o con ninguna, 1/8."
    ]) +
    ojo("«Salir cara» y «salir cruz» en una moneda son resultados igual de probables, pero «salir 0, 1 o 2 caras» con dos monedas <b>no</b> lo son (1/4, 1/2 y 1/4). Antes de aplicar Laplace comprueba siempre que los casos que cuentas son equiprobables: lo seguro es contar resultados <i>ordenados</i> de objetos <i>distinguibles</i>.");

  // ---------------------------------------------------------------- 2. Sucesos y operaciones
  secciones[1] =
    "<h5>El diccionario entre conjuntos y sucesos</h5>" +
    "<p>Todo lo que sabes de conjuntos sirve aquí, con otro vocabulario. Cada vez que veas una operación, tradúcela al español de «lo que ocurre en el experimento»:</p>" +
    tabla(["Notación", "Se lee", "Significa en el experimento"], [
      ["A ∪ B", "A unión B", "ocurre A, o B, o los dos (<b>al menos uno</b>)"],
      ["A ∩ B", "A intersección B", "ocurren A <b>y</b> B a la vez"],
      ["Ā  (también Aᶜ)", "complementario de A", "<b>no</b> ocurre A"],
      ["A − B  (= A ∩ B̄)", "A menos B", "ocurre A <b>pero no</b> B"],
      ["A ⊂ B", "A contenido en B", "si ocurre A, entonces ocurre B (A <b>implica</b> B)"],
      ["A ∩ B = ∅", "A y B incompatibles", "no pueden ocurrir a la vez"],
      ["A ∪ Ā = E,  A ∩ Ā = ∅", "contrarios", "uno de los dos ocurre <b>siempre</b> y nunca los dos"]
    ]) +
    "<p>Se llaman <b>incompatibles</b> (o excluyentes, disjuntos) dos sucesos sin elementos comunes. Todos los pares de contrarios son incompatibles, pero no al revés: «sale 1» y «sale 6» son incompatibles, sin ser contrarios (falta lo que ocurre si sale 2, 3, 4 o 5).</p>" +
    "<h5>Un ejemplo completo con el dado</h5>" +
    "<p>Con E = {1, 2, 3, 4, 5, 6}, sean A = «par» = {2, 4, 6}, B = «múltiplo de 3» = {3, 6} y C = «mayor que 4» = {5, 6}. Entonces:</p>" +
    tabla(["Suceso", "Elementos", "Cómo se obtiene"], [
      ["A ∪ B", "{2, 3, 4, 6}", "juntar los elementos de A y de B (sin repetir el 6)"],
      ["A ∩ B", "{6}", "los que están en los dos"],
      ["Ā", "{1, 3, 5}", "los que no están en A"],
      ["A − B", "{2, 4}", "los de A que no están en B"],
      ["B − A", "{3}", "los de B que no están en A"],
      ["(A ∪ B)ᶜ", "{1, 5}", "los que no están en A ni en B"],
      ["Ā ∩ B̄", "{1, 5}", "{1, 3, 5} ∩ {1, 2, 4, 5} — igual que el anterior (De Morgan)"],
      ["A ∩ C", "{6}", "el único par que además es mayor que 4"],
      ["B ∩ C ∩ A", "{6}", "ocurren los tres a la vez"]
    ]) +
    w("m13_venn") +
    "<h5>Propiedades del álgebra de sucesos</h5>" +
    "<p>Las operaciones cumplen las reglas del álgebra de conjuntos. Las más útiles para simplificar:</p>" +
    tabla(["Propiedad", "Fórmula"], [
      ["Conmutativa", "A ∪ B = B ∪ A  ·  A ∩ B = B ∩ A"],
      ["Asociativa", "(A ∪ B) ∪ C = A ∪ (B ∪ C)  ·  (A ∩ B) ∩ C = A ∩ (B ∩ C)"],
      ["Distributiva", "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)  ·  A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)"],
      ["Idempotencia y neutros", "A ∪ A = A  ·  A ∩ A = A  ·  A ∪ ∅ = A  ·  A ∩ E = A  ·  A ∪ E = E  ·  A ∩ ∅ = ∅"],
      ["Doble complemento", "(Ā)ᶜ = A"],
      ["Contrarios", "A ∪ Ā = E  ·  A ∩ Ā = ∅"],
      ["<b>Leyes de De Morgan</b>", "(A ∪ B)ᶜ = Ā ∩ B̄  ·  (A ∩ B)ᶜ = Ā ∪ B̄"]
    ]) +
    "<p><b>Por qué valen las leyes de De Morgan.</b> «No es cierto que ocurra A <i>o</i> B» significa que no ocurre ninguno de los dos, es decir, «no A <i>y</i> no B»: (A ∪ B)ᶜ = Ā ∩ B̄. Y «no es cierto que ocurran A <i>y</i> B a la vez» significa que falla al menos uno: «no A <i>o</i> no B»: (A ∩ B)ᶜ = Ā ∪ B̄. Con el dado: (A ∩ B)ᶜ = {6}ᶜ = {1, 2, 3, 4, 5}, y Ā ∪ B̄ = {1, 3, 5} ∪ {1, 2, 4, 5} = {1, 2, 3, 4, 5}. ✓ Se pueden comprobar con el simulador de arriba: las dos últimas casillas iluminan la misma región con las dos formas.</p>" +
    "<h5>Traducir una frase a símbolos (y al revés)</h5>" +
    "<p>La mitad de los errores en probabilidad está en traducir mal el enunciado. Esta tabla conviene aprenderla de memoria; A y B son dos sucesos cualesquiera:</p>" +
    tabla(["Frase", "Suceso", "Forma de contar"], [
      ["Ocurre A", "A", ""],
      ["No ocurre A", "Ā", "1 − P(A)"],
      ["Ocurren A y B", "A ∩ B", ""],
      ["Ocurre A o B (o los dos); <b>al menos uno</b>", "A ∪ B", "P(A) + P(B) − P(A ∩ B)"],
      ["No ocurre ninguno", "Ā ∩ B̄ = (A ∪ B)ᶜ", "1 − P(A ∪ B)"],
      ["Ocurre A pero no B; <b>sólo A</b>", "A ∩ B̄ = A − B", "P(A) − P(A ∩ B)"],
      ["Ocurre <b>exactamente uno</b> de los dos", "(A ∩ B̄) ∪ (Ā ∩ B)", "P(A) + P(B) − 2P(A ∩ B)"],
      ["Ocurre <b>como máximo uno</b> (no ocurren los dos)", "(A ∩ B)ᶜ = Ā ∪ B̄", "1 − P(A ∩ B)"],
      ["Si ocurre A, entonces ocurre B", "A ⊂ B", "A ∩ B = A"]
    ]) +
    ejemplo("Tres sucesos sobre una persona", "De una persona elegida al azar se estudian tres sucesos: V = «tiene vacuna», M = «tiene mascarilla» y C = «se contagia». Expresa con símbolos: (a) se contagia aunque tenga la vacuna; (b) tiene vacuna y mascarilla y no se contagia; (c) no tiene ninguna protección y se contagia; (d) tiene al menos una protección.", [
      "(a) «Se contagia aunque tenga vacuna»: ocurren los dos a la vez, <b>V ∩ C</b>.",
      "(b) «Vacuna y mascarilla y no contagio»: <b>V ∩ M ∩ C̄</b>.",
      "(c) «Ninguna protección» es no V y no M: <b>V̄ ∩ M̄ ∩ C</b> (observa que V̄ ∩ M̄ = (V ∪ M)ᶜ).",
      "(d) «Al menos una protección»: <b>V ∪ M</b>, el contrario de (V̄ ∩ M̄) (De Morgan)."
    ]) +
    "<h5>Sistema completo de sucesos</h5>" +
    "<p>Los sucesos A₁, A₂, …, Aₙ forman un <b>sistema completo</b> (una <b>partición</b> de E) si son <b>incompatibles dos a dos</b> y su unión es E: A₁ ∪ A₂ ∪ … ∪ Aₙ = E. Cada resultado del experimento pertenece a uno y sólo uno de ellos. Ejemplos: {par, impar}; {{1}, {2, 3}, {4, 5, 6}} en un dado; «el producto lo fabrica la máquina 1, la 2 o la 3». Los sistemas completos son la base de la probabilidad total y de Bayes (sección 6).</p>";

  // ---------------------------------------------------------------- 3. Laplace
  secciones[2] =
    "<h5>Cuándo se puede usar y cuándo no</h5>" +
    "<p>La regla de Laplace tiene dos condiciones, y las dos son importantes: (1) el espacio muestral es <b>finito</b> y (2) todos los resultados son <b>equiprobables</b>. Esto último no es un detalle técnico: se justifica con la <b>simetría</b> física (dado perfecto, baraja bien barajada, bolas indistinguibles al tacto) o porque el enunciado lo dice («se elige al azar»). Si el dado está trucado, si una máquina falla más que otra o si el enunciado dice que cierto resultado es más frecuente, Laplace no vale: hay que usar las probabilidades que se dan o se estiman.</p>" +
    "<p>La cuenta se puede hacer de dos modos: <b>(a)</b> listando los casos (útil con pocos resultados) o <b>(b)</b> contándolos con el principio multiplicativo y la combinatoria (sección 7). Veamos el modo (a) con los espacios de siempre.</p>" +
    "<h5>Los espacios muestrales de siempre</h5>" +
    "<p><b>Un dado.</b> E = {1, …, 6}, 6 casos. P(par) = 3/6 = 1/2. P(mayor que 4) = 2/6 = 1/3. P(primo) = P({2, 3, 5}) = 3/6 = 1/2 (el 1 no es primo). P(múltiplo de 5) = 1/6.</p>" +
    "<p><b>Dos dados</b> (36 casos igual de probables). La tabla de sumas es la que más se usa:</p>" +
    tabla(["Suma", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], [
      ["Casos", "1", "2", "3", "4", "5", "6", "5", "4", "3", "2", "1"],
      ["Probabilidad", "1/36", "2/36", "3/36", "4/36", "5/36", "6/36", "5/36", "4/36", "3/36", "2/36", "1/36"]
    ]) +
    "<p>La suma más probable es el 7 (1/6), y 2 y 12 son las menos probables (1/36). Otros sucesos con dos dados: P(suma ≥ 10) = (3 + 2 + 1)/36 = 6/36 = 1/6; P(dobles) = 6/36 = 1/6; P(al menos un 6) = 11/36 (hay 6 en la fila del 6 y 6 en la columna, pero el (6,6) se cuenta una vez: 6 + 6 − 1); P(ningún 6) = 25/36 = (5/6)².</p>" +
    "<p><b>Baraja española</b> (40 cartas: 4 palos —oros, copas, espadas, bastos— con las cartas 1 a 7, sota, caballo y rey). P(as) = 4/40 = 1/10. P(oros) = 10/40 = 1/4. P(figura) = 12/40 = 3/10 (sota, caballo y rey de cada palo). P(as de oros) = 1/40. P(rey o copas) = (4 + 10 − 1)/40 = 13/40 (el rey de copas se cuenta una vez).</p>" +
    w("m13_laplace") +
    ejemplo("El error de d'Alembert", "Al lanzar dos monedas, d'Alembert (siglo XVIII) razonaba: «hay tres resultados: 2 caras, 1 cara y 0 caras; luego cada uno tiene probabilidad 1/3». ¿Qué falla?", [
      "Los tres resultados «0, 1 o 2 caras» <b>no son equiprobables</b>: son sucesos compuestos de resultados distintos.",
      "El espacio equiprobable es E = {CC, CX, XC, XX} (4 casos). «2 caras» = {CC} → 1/4; «1 cara» = {CX, XC} → 2/4; «0 caras» = {XX} → 1/4.",
      "Se comprueba lanzando dos monedas muchas veces: sale exactamente una cara en la <b>mitad</b> de los lanzamientos, no en un tercio."
    ]) +
    "<h5>Un caso especial: espacios continuos (probabilidad geométrica)</h5>" +
    "<p>Si el resultado es un punto elegido al azar en una región (un dardo en una diana, la hora de llegada de un autobús entre las 8:00 y las 8:20), hay infinitos casos y no se pueden contar. Se sustituye «número de casos» por <b>longitud, área o volumen</b>: P(A) = medida de A / medida de E. Ejemplo: una diana circular de radio 10 cm con una zona central de radio 2 cm; un dardo que cae al azar en la diana acierta el centro con probabilidad π·2²/(π·10²) = 4/100 = <b>0,04</b>.</p>" +
    "<h5>Tres errores clásicos</h5>" +
    "<ul>" +
    "<li><b>«Hay dos posibilidades, luego 1/2»:</b> «o llueve o no llueve», «o apruebo o suspendo», «o me toca la lotería o no»: que haya dos resultados no los hace igual de probables.</li>" +
    "<li><b>Contar casos que no son equiprobables</b> (las sumas de dos dados, el número de caras de varias monedas).</li>" +
    "<li><b>Contar dos veces</b> un caso (el 6-6 en «al menos un 6») o <b>no contar</b> alguno (olvidar el orden: CX y XC).</li>" +
    "</ul>" +
    "<div class='callout'><b>Comprobación rápida.</b> Siempre que sea posible, calcula también la probabilidad del suceso contrario y comprueba que suman 1. En «al menos un 6 con dos dados»: 11/36 + 25/36 = 36/36 ✓.</div>";

  // ---------------------------------------------------------------- 4. Axiomas y propiedades
  secciones[3] =
    "<h5>Los tres axiomas de Kolmogorov</h5>" +
    "<p>Una <b>probabilidad</b> es cualquier función P que a cada suceso A le asigna un número P(A) cumpliendo tres reglas muy sencillas (Kolmogorov, 1933):</p>" +
    "<ol>" +
    "<li><b>No negatividad:</b> P(A) ≥ 0 para todo suceso A.</li>" +
    "<li><b>Normalización:</b> P(E) = 1.</li>" +
    "<li><b>Aditividad:</b> si A y B son incompatibles (A ∩ B = ∅), entonces P(A ∪ B) = P(A) + P(B). (Se extiende a cualquier número finito de sucesos incompatibles dos a dos.)</li>" +
    "</ol>" +
    "<p>Es una definición «de reglas del juego»: no dice cómo se obtienen los valores (Laplace, frecuencias, estimaciones), sino qué condiciones tienen que cumplir para ser coherentes. La regla de Laplace, las frecuencias relativas y los grados de confianza bien calibrados cumplen los tres axiomas. Todas las propiedades de abajo se <b>deducen</b> de ellos, y por eso valen siempre:</p>" +
    "<h5>Consecuencias, con demostración</h5>" +
    tabla(["Propiedad", "Demostración"], [
      ["<b>P(Ā) = 1 − P(A)</b>", "A y Ā son incompatibles y A ∪ Ā = E. Por los axiomas 3 y 2: P(A) + P(Ā) = P(E) = 1."],
      ["<b>P(∅) = 0</b>", "∅ = Ēᶜ, luego P(∅) = 1 − P(E) = 0."],
      ["<b>Monotonía:</b> A ⊂ B ⟹ P(A) ≤ P(B)", "B = A ∪ (B − A) con A y B − A incompatibles: P(B) = P(A) + P(B − A) ≥ P(A)."],
      ["<b>0 ≤ P(A) ≤ 1</b>", "El axioma 1 da P(A) ≥ 0; como A ⊂ E, la monotonía da P(A) ≤ P(E) = 1."],
      ["<b>P(A − B) = P(A) − P(A ∩ B)</b>", "A = (A − B) ∪ (A ∩ B), incompatibles: P(A) = P(A − B) + P(A ∩ B)."],
      ["<b>Sucesos elementales:</b> P(A) = Σ P({ω}) para ω ∈ A, y Σ P({ω}) = 1", "Cada suceso es unión (incompatible) de sus elementos; en particular E es la unión de todos."],
      ["<b>Subaditividad:</b> P(A ∪ B) ≤ P(A) + P(B)", "Se verá con la fórmula de la unión (sección 5), porque P(A ∩ B) ≥ 0."]
    ]) +
    ejemplo("Un dado trucado", "Un dado está cargado de modo que el 6 sale con probabilidad 0,3 y los otros cinco números son igual de probables entre sí. Calcula P(par) y P(menor que 3).", [
      "Sea x la probabilidad de cada uno de los otros cinco números. Los sucesos elementales suman 1: 5x + 0,3 = 1 → x = 0,14.",
      "P(par) = P(2) + P(4) + P(6) = 0,14 + 0,14 + 0,3 = <b>0,58</b> (aquí ya no vale Laplace: 3/6 = 0,5 sería un error).",
      "P(menor que 3) = P(1) + P(2) = 0,14 + 0,14 = <b>0,28</b>."
    ]) +
    "<h5>Cotas: ¿entre qué valores puede estar P(A ∩ B)?</h5>" +
    "<p>Aunque sólo conozcas P(A) y P(B), los axiomas acotan la probabilidad de la intersección. Por un lado, A ∩ B ⊂ A y A ∩ B ⊂ B, luego P(A ∩ B) ≤ mín{P(A), P(B)}. Por otro, P(A ∪ B) ≤ 1 y la fórmula de la unión dan P(A) + P(B) − P(A ∩ B) ≤ 1, es decir P(A ∩ B) ≥ P(A) + P(B) − 1. En conjunto:</p>" +
    formula("máx{0, P(A) + P(B) − 1} ≤ P(A ∩ B) ≤ mín{P(A), P(B)}") +
    ejemplo("¿Pueden ser incompatibles?", "Se sabe que P(A) = 0,6 y P(B) = 0,7. ¿Pueden ser A y B incompatibles? ¿Entre qué valores está P(A ∩ B) y P(A ∪ B)?", [
      "Si fueran incompatibles, P(A ∪ B) = 0,6 + 0,7 = 1,3 &gt; 1: imposible. <b>No pueden serlo.</b>",
      "Cota inferior: P(A ∩ B) ≥ 0,6 + 0,7 − 1 = <b>0,3</b>. Cota superior: P(A ∩ B) ≤ mín{0,6; 0,7} = <b>0,6</b>.",
      "Entonces P(A ∪ B) = 1,3 − P(A ∩ B) está entre 0,7 y 1."
    ]) +
    "<h5>El truco del «al menos uno»</h5>" +
    "<p>Calcular «al menos uno» sumando casos («exactamente uno», «exactamente dos», …) es largo y propenso a fallos. El suceso contrario es «ninguno», y suele ser un único producto: <b>P(al menos uno) = 1 − P(ninguno)</b>.</p>" +
    ejemplo("El problema del caballero de Méré", "En el siglo XVII, el caballero de Méré apostaba a que sacaría al menos un 6 en 4 lanzamientos de un dado, y creía que lo mismo le pasaría con al menos un doble 6 en 24 lanzamientos de dos dados. Calcula las dos probabilidades.", [
      "En un lanzamiento, P(no sale 6) = 5/6. En cuatro lanzamientos independientes, P(ningún 6) = (5/6)⁴ = 625/1296.",
      "P(al menos un 6) = 1 − 625/1296 = 671/1296 = <b>0,5177</b> (apuesta favorable).",
      "Con dos dados, P(no doble 6) = 35/36; en 24 lanzamientos, P(ningún doble 6) = (35/36)²⁴ = 0,5086, y P(al menos un doble 6) = <b>0,4914</b> (apuesta desfavorable). Méré lo notó jugando y preguntó a Pascal: de esa correspondencia con Fermat nació la teoría de la probabilidad."
    ]) +
    ojo("«Al menos uno» no es «uno». Y no se calcula multiplicando por 4 la probabilidad de un lanzamiento: 4·(1/6) = 0,667, un valor mayor que la verdadera 0,518 (se estarían contando varias veces los casos en que salen varios seises).");

  // ---------------------------------------------------------------- 5. Unión
  secciones[4] =
    "<h5>De dónde sale la fórmula</h5>" +
    "<p>Basta separar A ∪ B en dos trozos incompatibles: A ∪ B = A ∪ (B − A). Por el axioma 3, P(A ∪ B) = P(A) + P(B − A), y como P(B − A) = P(B) − P(A ∩ B), resulta</p>" +
    formula("P(A ∪ B) = P(A) + P(B) − P(A ∩ B)") +
    "<p>En el diagrama de Venn hay tres zonas: <b>sólo A</b>, la <b>intersección</b> y <b>sólo B</b>. P(A) suma las dos primeras, P(B) suma las dos últimas, y la intersección entra en las dos sumas: por eso hay que restarla una vez. Con las tres zonas (<i>sólo A</i> = P(A) − P(A ∩ B), <i>sólo B</i> = P(B) − P(A ∩ B)) y el «fuera» = 1 − P(A ∪ B), todo se reparte sin huecos ni solapes: es la imagen del simulador siguiente.</p>" +
    w("m13_union") +
    ejemplo("Múltiplos de 2 o de 3", "Se elige al azar un número del 1 al 20. Calcula la probabilidad de que sea múltiplo de 2 o de 3.", [
      "A = múltiplo de 2: 10 casos (2, 4, …, 20) → P(A) = 10/20. B = múltiplo de 3: 6 casos (3, 6, …, 18) → P(B) = 6/20.",
      "A ∩ B = múltiplo de 6: 3 casos (6, 12, 18) → P(A ∩ B) = 3/20.",
      "P(A ∪ B) = 10/20 + 6/20 − 3/20 = 13/20 = <b>0,65</b>. (Comprobación: los números que no son múltiplos de 2 ni de 3 son 7: 1, 5, 7, 11, 13, 17, 19 → 7/20 = 0,35 = 1 − 0,65 ✓.)"
    ]) +
    ejemplo("Hallar la intersección a partir de la unión", "Si P(A) = 0,5, P(B) = 0,6 y P(A ∪ B) = 0,8, calcula P(A ∩ B) y P(Ā ∩ B̄).", [
      "De 0,8 = 0,5 + 0,6 − P(A ∩ B) se despeja: P(A ∩ B) = 1,1 − 0,8 = <b>0,3</b>.",
      "P(Ā ∩ B̄) = P((A ∪ B)ᶜ) = 1 − 0,8 = <b>0,2</b>."
    ]) +
    "<h5>Todo lo que se puede leer con A, B y A ∩ B</h5>" +
    "<p>Con sólo tres datos (por ejemplo P(A), P(B) y P(A ∩ B)) se puede calcular la probabilidad de cualquier suceso construido con A y B. Las más frecuentes, con P(A) = 0,4, P(B) = 0,5 y P(A ∩ B) = 0,2:</p>" +
    tabla(["Suceso", "Fórmula", "Valor"], [
      ["A ∪ B (al menos uno)", "P(A) + P(B) − P(A ∩ B)", "0,4 + 0,5 − 0,2 = <b>0,7</b>"],
      ["(A ∪ B)ᶜ = Ā ∩ B̄ (ninguno)", "1 − P(A ∪ B)", "1 − 0,7 = <b>0,3</b>"],
      ["A − B (sólo A)", "P(A) − P(A ∩ B)", "0,4 − 0,2 = <b>0,2</b>"],
      ["B − A (sólo B)", "P(B) − P(A ∩ B)", "0,5 − 0,2 = <b>0,3</b>"],
      ["Exactamente uno", "P(A) + P(B) − 2P(A ∩ B)", "0,9 − 0,4 = <b>0,5</b>"],
      ["(A ∩ B)ᶜ = Ā ∪ B̄ (no los dos)", "1 − P(A ∩ B)", "1 − 0,2 = <b>0,8</b>"]
    ]) +
    "<h5>Tres sucesos: inclusión–exclusión</h5>" +
    "<p>Con tres sucesos, sumar las tres probabilidades cuenta dos veces cada solape de dos, y tres veces el solape triple; restando los solapes de dos, el solape triple se ha quitado tres veces y hay que devolverlo una vez:</p>" +
    formula("P(A ∪ B ∪ C) = P(A) + P(B) + P(C) − P(A ∩ B) − P(A ∩ C) − P(B ∩ C) + P(A ∩ B ∩ C)") +
    "<p>Con un dado: A = {1, 2, 3}, B = {2, 3, 4}, C = {3, 4, 5}. Se tiene P(A ∪ B ∪ C) = P({1, 2, 3, 4, 5}) = 5/6 y, por la fórmula: 3/6 + 3/6 + 3/6 − 2/6 − 1/6 − 2/6 + 1/6 = (9 − 5 + 1)/6 = <b>5/6</b> ✓. (Las intersecciones son A ∩ B = {2, 3}, A ∩ C = {3}, B ∩ C = {3, 4} y A ∩ B ∩ C = {3}.)</p>" +
    ejemplo("Idiomas en un instituto", "En un grupo de 100 alumnos, 60 estudian inglés (I), 40 francés (F) y 30 alemán (A). Además, 20 estudian inglés y francés, 15 inglés y alemán, 10 francés y alemán, y 5 los tres idiomas. Si se elige un alumno al azar, ¿cuál es la probabilidad de que estudie al menos un idioma? ¿Y de que estudie exactamente uno?", [
      "Inclusión–exclusión: P(I ∪ F ∪ A) = (60 + 40 + 30 − 20 − 15 − 10 + 5)/100 = 90/100 = <b>0,9</b>. Por tanto 10 alumnos no estudian ninguno.",
      "Zonas del diagrama (se resta hacia dentro): los tres = 5; sólo I y F = 20 − 5 = 15; sólo I y A = 15 − 5 = 10; sólo F y A = 10 − 5 = 5; sólo I = 60 − 15 − 10 − 5 = 30; sólo F = 40 − 15 − 5 − 5 = 15; sólo A = 30 − 10 − 5 − 5 = 10.",
      "Comprobación: 30 + 15 + 10 + 15 + 10 + 5 + 5 = 90 ✓. Exactamente un idioma: 30 + 15 + 10 = 55 → <b>0,55</b>."
    ]) +
    ojo("el «o» matemático es <b>inclusivo</b>: «A o B» incluye el caso en que ocurren los dos. Si el enunciado dice «o … o» (uno u otro, pero no ambos) se refiere a «exactamente uno». Y si A y B son incompatibles, P(A ∩ B) = 0 y la fórmula se reduce a la suma: <b>no uses la suma si no te dicen (o no puedes justificar) que son incompatibles</b>.");

  // ---------------------------------------------------------------- 6. Condicionada, independencia, total, Bayes
  secciones[5] =
    "<h5>Qué mide la probabilidad condicionada</h5>" +
    "<p>P(A | B) responde a la pregunta: «si <b>sé</b> que ha ocurrido B, ¿con qué probabilidad ocurre A?». Saber que B ha ocurrido <b>reduce el espacio muestral</b> a B: sólo importan los resultados de B, y de ellos, los que además están en A (los de A ∩ B). Si todo es equiprobable, es una cuenta de casos:</p>" +
    formula("P(A | B) = casos de A ∩ B / casos de B = P(A ∩ B) / P(B)    (con P(B) &gt; 0)") +
    "<p>Con un dado: P(6 | par) = 1/3 (de los tres pares 2, 4, 6, uno es el 6); P(par | mayor que 3) = P({4, 6})/P({4, 5, 6}) = 2/3; pero P(par | 6) = 1: <b>la condicionada no es simétrica</b>, P(A | B) y P(B | A) son cosas distintas (y confundirlas es uno de los errores más graves de la estadística aplicada: «el 90 % de los que tienen la enfermedad dan positivo» no es lo mismo que «el 90 % de los que dan positivo tienen la enfermedad»).</p>" +
    "<p>La condicionada se comporta como una probabilidad más: P(Ā | B) = 1 − P(A | B), P(A ∪ C | B) = P(A | B) + P(C | B) − P(A ∩ C | B), etc. Casos extremos: si A ⊂ B, P(A | B) = P(A)/P(B); si B ⊂ A, P(A | B) = 1; si A y B son incompatibles, P(A | B) = 0.</p>" +
    "<h5>Regla del producto (y su extensión)</h5>" +
    "<p>Despejando P(A ∩ B) en la definición: <b>P(A ∩ B) = P(B)·P(A | B) = P(A)·P(B | A)</b>. Para tres o más sucesos se encadena: <b>P(A ∩ B ∩ C) = P(A)·P(B | A)·P(C | A ∩ B)</b>. Es la regla que hay detrás de todo árbol (se multiplican las probabilidades de las ramas de un camino).</p>" +
    ejemplo("Tres oros seguidos", "Se sacan tres cartas de una baraja española (40 cartas) sin devolverlas. ¿Probabilidad de que las tres sean oros?", [
      "P(1.ª oros) = 10/40. Sacada una, quedan 39 cartas y 9 oros: P(2.ª oros | 1.ª oros) = 9/39. Después quedan 38 y 8: P(3.ª oros | las dos anteriores) = 8/38.",
      "P = 10/40 · 9/39 · 8/38 = 720/59 280 = <b>3/247 ≈ 0,0121</b> (apenas un 1,2 %).",
      "(Con reposición serían independientes y daría (1/4)³ = 0,0156.)"
    ]) +
    "<h5>Independencia</h5>" +
    "<p>Dos sucesos son <b>independientes</b> si saber que ha ocurrido uno no modifica la probabilidad del otro: P(A | B) = P(A). La definición que se usa para comprobarlo es equivalente y más cómoda (y no exige P(B) &gt; 0):</p>" +
    formula("A y B independientes  ⟺  P(A ∩ B) = P(A)·P(B)  ⟺  P(A | B) = P(A)  ⟺  P(B | A) = P(B)") +
    "<p>La independencia <b>se comprueba con números</b> (no se ve en el diagrama de Venn). Aparece, sobre todo, cuando los sucesos se refieren a repeticiones del experimento sin influencia mutua (dos lanzamientos de un dado, extracciones <i>con</i> reposición): P(6 en el primero y 6 en el segundo) = 1/6 · 1/6 = 1/36.</p>" +
    "<p><b>Si A y B son independientes, también lo son A y B̄, Ā y B, Ā y B̄.</b> Demostración para el primer par: P(A ∩ B̄) = P(A) − P(A ∩ B) = P(A) − P(A)P(B) = P(A)(1 − P(B)) = P(A)·P(B̄). ∎ Es muy útil: si «aprobar» es independiente de «tener coche», también lo es «suspender» de «tener coche».</p>" +
    "<h5>Probabilidad total y teorema de Bayes</h5>" +
    "<p>Sean A₁, …, Aₙ un <b>sistema completo</b> de sucesos (incompatibles dos a dos, con unión E) con P(Aᵢ) &gt; 0, y B otro suceso cualquiera. Como B = (B ∩ A₁) ∪ … ∪ (B ∩ Aₙ), con trozos incompatibles, y P(B ∩ Aᵢ) = P(Aᵢ)·P(B | Aᵢ):</p>" +
    formula("<b>Probabilidad total:</b>   P(B) = P(A₁)·P(B | A₁) + P(A₂)·P(B | A₂) + … + P(Aₙ)·P(B | Aₙ)") +
    "<p>Es una <b>media ponderada</b>: la probabilidad de B en cada «mundo» Aᵢ, ponderada por lo probable que es ese mundo. Y como P(Aᵢ | B) = P(Aᵢ ∩ B)/P(B), sustituyendo el numerador por la regla del producto y el denominador por la total se obtiene el <b>teorema de Bayes</b>, que «da la vuelta» a la condicionada:</p>" +
    formula("<b>Bayes:</b>   P(Aᵢ | B) = " + fr("P(Aᵢ)·P(B | Aᵢ)", "P(A₁)·P(B | A₁) + … + P(Aₙ)·P(B | Aₙ)")) +
    "<p>Interpretación: P(Aᵢ) es la probabilidad <b>a priori</b> (antes de saber nada) y P(Aᵢ | B) la <b>a posteriori</b> (después de saber que ha ocurrido B). Bayes explica cómo se debe <i>actualizar</i> una creencia con datos nuevos. En la práctica no hace falta memorizar la fórmula: <b>el árbol la contiene entera</b> (se multiplican las ramas de cada camino; la total es la suma de los caminos que acaban en B; Bayes es el camino concreto dividido entre esa suma).</p>" +
    ejemplo("Tres máquinas", "Una fábrica tiene tres máquinas. La A₁ produce el 50 % de las piezas y un 2 % de ellas son defectuosas; la A₂ produce el 30 % con un 3 % de defectuosas; la A₃, el 20 % restante con un 5 % de defectuosas. (a) ¿Qué porcentaje de piezas son defectuosas? (b) Si una pieza elegida al azar resulta defectuosa, ¿de qué máquina es más probable que venga?", [
      "(a) Probabilidad total: P(D) = 0,5·0,02 + 0,3·0,03 + 0,2·0,05 = 0,010 + 0,009 + 0,010 = <b>0,029</b> (un 2,9 %).",
      "(b) Bayes: P(A₁ | D) = 0,010/0,029 = 0,3448; P(A₂ | D) = 0,009/0,029 = 0,3103; P(A₃ | D) = 0,010/0,029 = 0,3448. Suman 1 ✓.",
      "La A₁ y la A₃ empatan en 34,5 %: aunque la A₃ fabrica sólo el 20 %, su tasa de defectos (5 %) es alta y compensa. Las probabilidades a priori (0,5; 0,3; 0,2) cambiaron a (0,345; 0,310; 0,345) al saber que la pieza era defectuosa."
    ]) +
    w("m13_arbol") +
    ejemplo("El test médico", "Una enfermedad afecta al 1 % de la población. Un test da positivo en el 95 % de los enfermos y también en el 5 % de los sanos (falsos positivos). Una persona da positivo: ¿qué probabilidad hay de que esté enferma?", [
      "Sean E = «enfermo» y + = «test positivo». P(E) = 0,01; P(+ | E) = 0,95; P(+ | Ē) = 0,05.",
      "Total: P(+) = 0,01·0,95 + 0,99·0,05 = 0,0095 + 0,0495 = 0,059.",
      "Bayes: P(E | +) = 0,0095/0,059 = <b>0,161</b>: ¡sólo un 16 %, pese a que el test «acierta el 95 %»!"
    ]) +
    w("m13_bayes") +
    "<p>La explicación está en el 1 %: entre 1 000 personas hay 10 enfermas (de las cuales ~9,5 dan positivo) y 990 sanas (de las que 49,5 son falsos positivos). Hay más del quíntuple de falsos positivos que de positivos reales. Cuando la enfermedad es rara, un positivo es poco concluyente: es el fallo de la <b>tasa base</b> (sección 11).</p>";

  // ================================================================
  //  SECCIONES NUEVAS
  // ================================================================
  var nuevas = [
    // -------------------------------------------------------------- 7
    {
      h: "7. Contar sin listar: combinatoria",
      html:
        "<p>Casi todos los problemas de Laplace se reducen a <b>contar</b>: ¿cuántos casos favorables y cuántos posibles? Cuando son decenas o millones, listarlos es imposible. La <b>combinatoria</b> da fórmulas para contar agrupaciones sin enumerarlas, y todas salen del principio multiplicativo.</p>" +
        "<h5>Principio multiplicativo y factorial</h5>" +
        "<p>Si un proceso tiene k etapas con n₁, n₂, …, nₖ opciones (independientes del resultado de las etapas anteriores), hay n₁·n₂·…·nₖ resultados. Un menú con 3 primeros, 4 segundos y 2 postres ofrece 3·4·2 = 24 menús distintos. Se llama <b>factorial</b> de n al producto n! = n·(n − 1)·…·2·1 (con 0! = 1): 3! = 6, 5! = 120, 10! = 3 628 800. Crece muy deprisa: 20! ≈ 2,4·10¹⁸.</p>" +
        "<h5>Las tres preguntas que deciden la fórmula</h5>" +
        "<ol>" +
        "<li><b>¿Importa el orden?</b> (¿ABC y CBA son agrupaciones distintas?)</li>" +
        "<li><b>¿Se pueden repetir elementos?</b> (¿se vuelve a poder elegir lo ya elegido?)</li>" +
        "<li><b>¿Se usan todos los elementos?</b> (entonces es una permutación)</li>" +
        "</ol>" +
        tabla(["Agrupación", "Orden", "Repetición", "Fórmula", "Ejemplo"], [
          ["Variaciones sin repetición V(n, k)", "sí", "no", "n·(n − 1)·…·(n − k + 1) = n!/(n − k)!", "podio de 3 entre 8 corredores: 8·7·6 = 336"],
          ["Variaciones con repetición VR(n, k)", "sí", "sí", "nᵏ", "PIN de 4 cifras: 10⁴ = 10 000"],
          ["Permutaciones P(n)", "sí", "no (todos)", "n!", "5 personas en fila: 5! = 120"],
          ["Permutaciones con repetición", "sí", "elementos repetidos", "n!/(a!·b!·…)", "anagramas de MAMA: 4!/(2!·2!) = 6"],
          ["Combinaciones C(n, k)", "no", "no", "n!/(k!·(n − k)!)", "comisión de 3 entre 10: 120"],
          ["Combinaciones con repetición CR(n, k)", "no", "sí", "C(n + k − 1, k)", "2 bolas de helado entre 3 sabores: C(4, 2) = 6"]
        ]) +
        w("m13_combinatoria") +
        "<h5>Combinaciones y números combinatorios</h5>" +
        "<p>Las combinaciones son variaciones donde se ha «olvidado» el orden. Cada grupo de k elementos aparece k! veces como variación (todas sus ordenaciones), de modo que <b>C(n, k) = V(n, k)/k! = n!/(k!·(n − k)!)</b>. Se escribe también como número combinatorio (n sobre k). Propiedades:</p>" +
        "<ul>" +
        "<li><b>C(n, 0) = C(n, n) = 1</b> y <b>C(n, 1) = n</b>.</li>" +
        "<li><b>Simetría: C(n, k) = C(n, n − k)</b> (elegir los k que entran es lo mismo que elegir los n − k que se quedan fuera).</li>" +
        "<li><b>Regla de Pascal: C(n, k) = C(n − 1, k − 1) + C(n − 1, k)</b> (los grupos que contienen a un elemento fijo, más los que no). Es la regla de construcción del <b>triángulo de Pascal</b>, que el simulador dibuja.</li>" +
        "<li><b>Suma de la fila: Σₖ C(n, k) = 2ⁿ</b> (es el número de sucesos de un espacio de n elementos: cada subconjunto tiene algún tamaño k).</li>" +
        "<li><b>Binomio de Newton:</b> (a + b)ⁿ = Σₖ C(n, k)·aⁿ⁻ᵏ·bᵏ. Por ejemplo (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴ (fila 4 del triángulo: 1, 4, 6, 4, 1).</li>" +
        "</ul>" +
        ejemplo("Contar manos de lotería y comisiones", "(a) En la Primitiva se eligen 6 números de 49 sin importar el orden. ¿Cuántas apuestas distintas hay? (b) De un grupo de 6 mujeres y 5 hombres se forma un comité de 3 mujeres y 2 hombres. ¿Cuántos comités distintos? (c) ¿Cuántas palabras (con o sin sentido) se pueden formar reordenando las letras de MATEMATICAS?", [
          "(a) Importa qué números, no el orden, y no se repiten: C(49, 6) = 49·48·47·46·45·44/6! = <b>13 983 816</b> apuestas.",
          "(b) Se eligen las mujeres y los hombres por separado y se multiplica (principio multiplicativo): C(6, 3)·C(5, 2) = 20·10 = <b>200</b> comités.",
          "(c) MATEMATICAS tiene 11 letras: M×2, A×3, T×2, y E, I, C, S una vez. Permutaciones con repetición: 11!/(2!·3!·2!) = 39 916 800/24 = <b>1 663 200</b>."
        ]) +
        ojo("el error más frecuente es usar variaciones cuando importa «qué» y no «en qué orden» (o al revés). Pregúntate: «si intercambio dos elementos del grupo, ¿es otro resultado?». Podio (oro, plata, bronce) → sí → variaciones. Equipo de tres personas → no → combinaciones. Otro error clásico: confundir C(n, k) con n!/k!."
        ) +
        "<h5>Combinaciones con repetición (para ir más allá)</h5>" +
        "<p>Si se eligen k objetos de n tipos pudiendo repetir y sin importar el orden (3 bolas de helado entre 4 sabores, repartir 5 caramelos iguales entre 3 niños), el número de formas es CR(n, k) = C(n + k − 1, k). Con 4 sabores y 3 bolas: C(6, 3) = 20. La demostración es el método de «estrellas y barras»: se colocan k estrellas y n − 1 barras separadoras en una fila de n + k − 1 huecos y se elige cuáles son estrellas. No suele pedirse en examen, pero explica por qué el reparto de caramelos no es 3⁵ (eso contaría los caramelos como distinguibles).</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Probabilidad con combinatoria: urnas, barajas y loterías",
      html:
        "<p>Cuando el espacio muestral es enorme, Laplace se aplica contando casos con combinatoria: <b>P(A) = C(favorables) / C(posibles)</b>. La clave es contar de la <b>misma manera</b> arriba y abajo (los dos con orden o los dos sin orden).</p>" +
        "<h5>Extracciones de una urna: con y sin reposición</h5>" +
        "<p>Una urna con 5 bolas rojas y 3 azules. Se extraen dos bolas. Hay dos protocolos y las probabilidades son diferentes:</p>" +
        "<ul>" +
        "<li><b>Con reposición</b> (se devuelve la bola): las extracciones son <b>independientes</b>. P(dos rojas) = 5/8 · 5/8 = 25/64 ≈ 0,3906.</li>" +
        "<li><b>Sin reposición</b> (la bola no se devuelve): la segunda depende de la primera. P(dos rojas) = 5/8 · 4/7 = 20/56 = 5/14 ≈ 0,3571. Con combinatoria, sin orden: C(5, 2)/C(8, 2) = 10/28 = 5/14 ✓ (dos formas de contar, mismo resultado).</li>" +
        "</ul>" +
        w("m13_urna") +
        "<p>Caso general (sin reposición, <b>distribución hipergeométrica</b>): de una urna con N bolas, de las cuales R son rojas, se extraen n; la probabilidad de que exactamente k sean rojas es</p>" +
        formula("P(k rojas) = " + fr("C(R, k)·C(N − R, n − k)", "C(N, n)")) +
        "<p>(se eligen las k rojas entre las R, las n − k no rojas entre las N − R, y se divide entre todas las formas de elegir n bolas).</p>" +
        ejemplo("Una mano de cartas", "Se reparten 3 cartas de una baraja española de 40. ¿Cuál es la probabilidad de que haya exactamente un as?", [
          "Posibles: C(40, 3) = 9 880 manos (sin orden).",
          "Favorables: un as entre los 4 (C(4, 1) = 4) y las otras dos cartas entre las 36 que no son ases (C(36, 2) = 630): 4·630 = 2 520.",
          "P = 2 520/9 880 = <b>63/247 ≈ 0,2551</b>.",
          "(Comprobación por otro camino, con orden: hay 3 posiciones para el as, y P(as, no as, no as) = 4/40·36/39·35/38 = 0,0850; multiplicado por 3 da 0,2551 ✓.)"
        ]) +
        "<h5>Loterías: probabilidades pequeñas</h5>" +
        "<p>En la Primitiva se eligen 6 números entre 49 y el sorteo extrae 6 sin reposición. Hay C(49, 6) = 13 983 816 combinaciones equiprobables.</p>" +
        tabla(["Aciertos", "Casos favorables", "Probabilidad"], [
          ["6", "C(6, 6)·C(43, 0) = 1", "1/13 983 816 ≈ 7,15·10⁻⁸"],
          ["5", "C(6, 5)·C(43, 1) = 6·43 = 258", "258/13 983 816 ≈ 1,84·10⁻⁵"],
          ["4", "C(6, 4)·C(43, 2) = 15·903 = 13 545", "13 545/13 983 816 ≈ 9,69·10⁻⁴"]
        ]) +
        "<p>Es decir, un jugador necesita comprar de media casi catorce millones de apuestas para acertar una vez. Comprar una apuesta más sube la probabilidad en 1/13 983 816: <b>no «siempre toca»</b>.</p>" +
        ejemplo("Cinco cartas del mismo palo", "Se reparten 5 cartas de una baraja española. ¿Probabilidad de que sean todas del mismo palo?", [
          "Posibles: C(40, 5) = 658 008.",
          "Favorables: se elige el palo (4 formas) y 5 cartas de sus 10: 4·C(10, 5) = 4·252 = 1 008.",
          "P = 1 008/658 008 = 14/9 139 ≈ <b>0,00153</b> (un 0,15 %)."
        ]) +
        "<h5>La paradoja de los cumpleaños</h5>" +
        "<p>¿Cuántas personas hacen falta en una sala para que sea más probable que no que dos de ellas cumplan años el mismo día? La mayoría respondería «unas 180». La respuesta correcta es <b>23</b>. Se calcula con el contrario: P(nadie coincide) = (365/365)·(364/365)·(363/365)·…·((365 − n + 1)/365), y P(alguna coincidencia) = 1 − P(nadie coincide). Para n = 23 es 1 − 0,4927 = <b>0,5073</b>; con 30 personas, 0,706; con 50, 0,970; con 57, 0,990.</p>" +
        w("m13_cumple") +
        "<p>Parece increíble porque confundimos «alguien comparte cumpleaños conmigo» (que sí es improbable) con «algún par cualquiera coincide»: en un grupo de 23 hay C(23, 2) = 253 pares, y cada par tiene una pequeña probabilidad de coincidir. Este tipo de razonamiento se usa en criptografía (ataques de «cumpleaños» contra funciones hash).</p>"
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Tablas de contingencia y diagramas de árbol",
      html:
        "<p>Los enunciados con porcentajes («el 60 % de los alumnos…, de los cuales el 30 %…») son un laberinto si se intentan resolver «a ojo». Hay dos herramientas visuales que convierten casi cualquier problema en una cuenta mecánica. Conviene dominar las dos y saber pasar de una a otra.</p>" +
        "<h5>La tabla de contingencia 2 × 2</h5>" +
        "<p>Se usa cuando se estudian <b>dos características</b> (A y B) de una población. Las cuatro casillas interiores son las intersecciones (A ∩ B, A ∩ B̄, Ā ∩ B, Ā ∩ B̄); los totales de fila y de columna son las probabilidades marginales P(A), P(Ā), P(B), P(B̄); y el total general es 1 (o N).</p>" +
        tabla(["", "B", "B̄", "Total"], [
          ["A", "P(A ∩ B)", "P(A ∩ B̄)", "P(A)"], ["Ā", "P(Ā ∩ B)", "P(Ā ∩ B̄)", "P(Ā)"], ["Total", "P(B)", "P(B̄)", "1"]
        ]) +
        "<p>Cómo se lee todo: <b>conjunta</b> = casilla/total; <b>marginal</b> = total de fila o de columna; <b>condicionada P(A | B)</b> = casilla de A ∩ B dividida entre el total de la <i>columna</i> B (la condición decide por dónde dividir); independencia ⟺ cada casilla = (total de su fila)·(total de su columna)/total general.</p>" +
        w("m13_contingencia") +
        ejemplo("Deporte y curso", "En un instituto de 200 alumnos hay 120 chicas y 80 chicos. Practican deporte 54 chicas y 24 chicos. Se elige un alumno al azar. Calcula: (a) P(deporte); (b) P(chica | deporte); (c) P(deporte | chico); (d) ¿son independientes «ser chica» y «hacer deporte»?", [
          "Tabla (filas: chica, chico; columnas: deporte, no deporte): chica 54 | 66 | 120; chico 24 | 56 | 80; total 78 | 122 | 200.",
          "(a) P(D) = 78/200 = <b>0,39</b>.",
          "(b) P(chica | D) = 54/78 = 9/13 ≈ <b>0,692</b> (se divide entre el total de la columna «deporte»).",
          "(c) P(D | chico) = 24/80 = <b>0,30</b> (se divide entre el total de la fila «chico»).",
          "(d) P(chica)·P(D) = 0,6·0,39 = 0,234, y P(chica ∩ D) = 54/200 = 0,27 ≠ 0,234: <b>no</b> son independientes (entre las chicas hay más deportistas, 45 %, que entre los chicos, 30 %)."
        ]) +
        "<h5>Reconstruir una tabla a partir de datos parciales</h5>" +
        "<p>Muchos problemas dan sólo algunos datos y piden otros. La estrategia es siempre la misma: coloca lo que te dan en la tabla y <b>completa por sumas y restas</b>. Por ejemplo: «P(A) = 0,5; P(B) = 0,4; P(A ∪ B) = 0,7». Primero P(A ∩ B) = 0,5 + 0,4 − 0,7 = 0,2; después A ∩ B̄ = 0,5 − 0,2 = 0,3; Ā ∩ B = 0,4 − 0,2 = 0,2; Ā ∩ B̄ = 1 − 0,7 = 0,3. La tabla queda completa y cualquier pregunta se contesta leyéndola.</p>" +
        "<h5>El diagrama de árbol</h5>" +
        "<p>Se usa cuando hay <b>etapas</b> sucesivas (primero una cosa, luego otra). Reglas de oro:</p>" +
        "<ol>" +
        "<li>De cada nodo salen ramas que representan <b>todas</b> las opciones de esa etapa; sus probabilidades <b>suman 1</b>.</li>" +
        "<li>En la 2.ª etapa, las probabilidades de las ramas son <b>condicionadas</b> a lo ocurrido antes (P(B | A), P(B | Ā)).</li>" +
        "<li>La probabilidad de un <b>camino completo</b> se obtiene <b>multiplicando</b> las ramas (regla del producto).</li>" +
        "<li>La probabilidad de un suceso que se puede alcanzar por varios caminos se obtiene <b>sumando</b> esos caminos (aditividad; probabilidad total).</li>" +
        "<li>Una probabilidad condicionada «al revés» (Bayes) es el camino concreto dividido entre la suma de los caminos que cumplen la condición.</li>" +
        "</ol>" +
        ejemplo("Tiros libres", "Un jugador de baloncesto convierte el 70 % de sus tiros libres, de forma independiente. Lanza tres. Calcula: (a) P(convertir los tres); (b) P(exactamente dos); (c) P(al menos uno).", [
          "Cada tiro: acierto (A) con 0,7, fallo (F) con 0,3. Los caminos con exactamente dos aciertos son AAF, AFA y FAA, todos con probabilidad 0,7·0,7·0,3 = 0,147.",
          "(a) P(AAA) = 0,7³ = <b>0,343</b>.",
          "(b) P(dos aciertos) = 3·0,7²·0,3 = 3·0,147 = <b>0,441</b>. (Es un caso de distribución binomial, sección 12.)",
          "(c) P(al menos uno) = 1 − P(FFF) = 1 − 0,3³ = 1 − 0,027 = <b>0,973</b>."
        ]) +
        ejemplo("Árbol y tabla son lo mismo", "En una clase, el 40 % son de ciencias (C). De los de ciencias, el 70 % aprueba matemáticas (M); de los demás, aprueba el 50 %. Calcula la probabilidad de aprobar y la de ser de ciencias sabiendo que se ha aprobado.", [
          "Árbol: P(C) = 0,4; P(M | C) = 0,7; P(M | C̄) = 0,5. Caminos: C∩M = 0,4·0,7 = 0,28; C∩M̄ = 0,4·0,3 = 0,12; C̄∩M = 0,6·0,5 = 0,30; C̄∩M̄ = 0,6·0,5 = 0,30.",
          "P(M) = 0,28 + 0,30 = <b>0,58</b> (probabilidad total).",
          "P(C | M) = 0,28/0,58 = 14/29 ≈ <b>0,483</b> (Bayes).",
          "La tabla de contingencia con 100 alumnos tiene las mismas cuatro casillas (28, 12, 30, 30). Es el mismo problema, mirado desde otro lado: el árbol ordena por «primero C»; la tabla permite empezar por M con sólo cambiar el sentido de la división."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Incompatibles, independientes, contrarios: no es lo mismo",
      html:
        "<p>Son tres ideas que se confunden constantemente porque en español suenan parecido. Responden a preguntas distintas:</p>" +
        tabla(["Concepto", "Pregunta que responde", "Definición", "Consecuencia en P"], [
          ["<b>Incompatibles</b>", "¿Pueden ocurrir a la vez?", "A ∩ B = ∅", "P(A ∩ B) = 0 · P(A ∪ B) = P(A) + P(B)"],
          ["<b>Contrarios</b>", "¿Uno u otro, siempre uno y nunca los dos?", "B = Ā", "P(B) = 1 − P(A)"],
          ["<b>Independientes</b>", "¿Saber uno cambia la probabilidad del otro?", "P(A ∩ B) = P(A)·P(B)", "P(A | B) = P(A) · P(B | A) = P(B)"]
        ]) +
        "<p>Las relaciones son: <b>contrarios ⟹ incompatibles</b> (no al revés), y <b>incompatibles (con probabilidades no nulas) ⟹ DEPENDIENTES</b>. Es decir: dos sucesos «excluyentes» no son «independientes», todo lo contrario. Razón: si A ocurre, sabes <i>con certeza</i> que B no ocurre, y esa es la máxima influencia posible: P(B | A) = 0 ≠ P(B). Formalmente, con P(A) &gt; 0 y P(B) &gt; 0, P(A ∩ B) = 0 pero P(A)·P(B) &gt; 0, así que no se cumple la definición de independencia.</p>" +
        "<h5>La independencia no se «ve» en el diagrama de Venn</h5>" +
        "<p>Se comprueba con la definición. Con un dado, A = «par» = {2, 4, 6} y B = «menor que 5» = {1, 2, 3, 4}: A ∩ B = {2, 4}, P(A ∩ B) = 2/6 = 1/3 y P(A)·P(B) = 1/2 · 2/3 = 1/3. ¡<b>Son independientes</b> aunque se solapen! (Saber que salió menor que 5 deja pares y no pares en la misma proporción que antes: 2 de 4 = 1/2.) En cambio, con A y C = «menor que 4» = {1, 2, 3}: P(A ∩ C) = P({2}) = 1/6 ≠ 1/2·1/2 = 1/4: son <b>dependientes</b>.</p>" +
        ejemplo("Mismos datos, dos hipótesis", "Si P(A) = 0,4 y P(B) = 0,3, calcula P(A ∪ B) en los casos (a) A y B incompatibles; (b) A y B independientes.", [
          "(a) Incompatibles: P(A ∩ B) = 0 → P(A ∪ B) = 0,4 + 0,3 = <b>0,7</b>.",
          "(b) Independientes: P(A ∩ B) = 0,4·0,3 = 0,12 → P(A ∪ B) = 0,4 + 0,3 − 0,12 = <b>0,58</b>.",
          "En general, P(A ∪ B) depende de P(A ∩ B), que no se puede deducir sólo de P(A) y de P(B) si no se sabe qué relación hay entre los sucesos."
        ]) +
        "<h5>Independencia de tres sucesos: por pares no basta</h5>" +
        "<p>Tres sucesos A, B y C son <b>mutuamente independientes</b> si se cumplen las <i>cuatro</i> igualdades: P(A ∩ B) = P(A)P(B), P(A ∩ C) = P(A)P(C), P(B ∩ C) = P(B)P(C) y además P(A ∩ B ∩ C) = P(A)P(B)P(C). Cumplir las tres primeras (independencia «por pares») no basta:</p>" +
        ejemplo("Independientes por pares, pero no mutuamente", "Se lanzan dos monedas. A = «cara en la 1.ª», B = «cara en la 2.ª», C = «las dos monedas coinciden» (CC o XX). Estudia la independencia.", [
          "P(A) = P(B) = P(C) = 1/2 (C = {CC, XX}).",
          "P(A ∩ B) = P(CC) = 1/4 = 1/2·1/2 ✓. P(A ∩ C) = P(CC) = 1/4 ✓. P(B ∩ C) = P(CC) = 1/4 ✓: independientes dos a dos.",
          "Pero P(A ∩ B ∩ C) = P(CC) = <b>1/4</b> y P(A)P(B)P(C) = <b>1/8</b>: no son mutuamente independientes (saber A y B determina C por completo)."
        ]) +
        "<h5>Cómo decidir en un problema</h5>" +
        "<ol>" +
        "<li>Si el enunciado lo dice («independientes», «extracciones con reposición», «lanzamientos sucesivos de una moneda») se usa el producto.</li>" +
        "<li>Si el enunciado da P(A), P(B) y P(A ∩ B), se <b>calcula</b> P(A)·P(B) y se compara con P(A ∩ B).</li>" +
        "<li>Si «sin reposición», se encadenan condicionadas: <b>no</b> son independientes.</li>" +
        "<li>Si «no pueden ocurrir a la vez» o «A ∩ B = ∅», son incompatibles.</li>" +
        "</ol>" +
        ojo("«independientes» no significa «sin nada en común» y «incompatibles» no significa «sin relación». Un error muy típico en examen es escribir P(A ∩ B) = P(A)·P(B) <b>sin justificar</b> la independencia (o sumar probabilidades sin justificar la incompatibilidad): se pierde la mayor parte de la puntuación aunque la cuenta sea correcta.")
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Paradojas e intuiciones traicioneras",
      html:
        "<p>La probabilidad es una de las partes de las matemáticas donde la intuición más falla, incluso en personas expertas. Estas situaciones no son rarezas: son la razón de que haya que calcular en vez de «sentir». Cada una se resuelve con herramientas del tema.</p>" +
        "<h5>El problema de Monty Hall</h5>" +
        "<p>En un concurso hay tres puertas: detrás de una hay un coche y detrás de las otras dos, cabras. Eliges una puerta (digamos la 1). El presentador, que <b>sabe</b> dónde está el coche, abre otra puerta que tiene una cabra (la 3) y te pregunta: «¿te quedas con la 1 o cambias a la 2?». ¿Conviene cambiar?</p>" +
        "<p>La respuesta intuitiva, «da igual, ahora quedan dos puertas, 50 %», es <b>falsa</b>. Conviene cambiar: se gana con probabilidad <b>2/3</b>. Razonamiento con el árbol: al elegir tenías 1/3 de acertar y 2/3 de equivocarte. Si te equivocaste (2/3), el presentador no tiene otra elección que abrir la otra puerta con cabra, así que la puerta que queda cerrada tiene el coche: cambiar gana. Si acertaste (1/3), cambiar pierde. Cambiar gana exactamente cuando te habías equivocado al principio: 2/3. La información que da el presentador no es «aleatoria»: modifica las probabilidades condicionadas.</p>" +
        w("m13_monty") +
        "<h5>La falacia del jugador</h5>" +
        "<p>Una moneda justa ha dado cinco caras seguidas. ¿Es más probable que ahora salga cruz «para compensar»? <b>No.</b> La moneda no tiene memoria: los lanzamientos son independientes, y P(cara en el 6.º | cinco caras antes) = P(cara) = 1/2. La probabilidad de que salgan <i>seis</i> caras seguidas es 1/64, pero ya se han producido cinco de las seis: lo que queda por ocurrir es sólo un lanzamiento, con probabilidad 1/2. La ley de los grandes números no dice que la moneda «corrija» las rachas; dice que, a la larga, la proporción se acerca a 1/2 porque las rachas se <i>diluyen</i> entre muchísimos lanzamientos nuevos.</p>" +
        "<h5>La falacia de la tasa base</h5>" +
        "<p>En el ejemplo del test médico, el 95 % de acierto parecía garantizar el diagnóstico, y sin embargo P(enfermo | positivo) sólo era del 16 %. Se ignoraba la <b>tasa base</b> (la prevalencia: 1 %). Con una enfermedad poco frecuente, los falsos positivos (un 5 % de muchos sanos) superan con mucho a los verdaderos positivos (un 95 % de muy pocos enfermos). Se confunde P(positivo | enfermo) = 0,95 con P(enfermo | positivo) = 0,16. Es el mismo error que cometen jueces y médicos con la «probabilidad de la prueba» en lugar de la del «caso».</p>" +
        "<h5>El problema de los dos hijos</h5>" +
        "<p>Una familia tiene dos hijos. (a) Se sabe que <b>al menos uno</b> es chica. ¿Probabilidad de que los dos sean chicas? (b) Se sabe que la <b>mayor</b> es chica. ¿Probabilidad de que los dos sean chicas?</p>" +
        "<p>Espacio muestral (mayor, menor): {CC, CO, OC, OO}. (a) «Al menos una chica» = {CC, CO, OC}, y sólo CC cumple: P = <b>1/3</b>. (b) «La mayor es chica» = {CC, CO}: P = <b>1/2</b>. La información es distinta y la probabilidad también: <b>cómo</b> te enteras de algo importa tanto como <i>qué</i> te enteras.</p>" +
        "<h5>La paradoja de Simpson</h5>" +
        "<p>Un tratamiento puede ser mejor en cada subgrupo y peor en el total. Datos reales (cálculos renales, 1986) con dos tratamientos, A y B, según el tamaño de las piedras:</p>" +
        tabla(["", "Piedras pequeñas", "Piedras grandes", "Total"], [
          ["Tratamiento A", "81/87 = 93,1 %", "192/263 = 73,0 %", "273/350 = <b>78,0 %</b>"],
          ["Tratamiento B", "234/270 = 86,7 %", "55/80 = 68,8 %", "289/350 = <b>82,6 %</b>"]
        ]) +
        "<p>A es mejor tanto en piedras pequeñas (93 % frente a 87 %) como en grandes (73 % frente a 69 %), pero en el total gana B (83 % frente a 78 %). ¿Cómo es posible? Porque los grupos tienen <b>pesos muy distintos</b>: A se aplicó sobre todo a casos difíciles (263 de 350 eran piedras grandes) y B sobre casos fáciles (270 de 350 eran pequeñas). En la media total, el tamaño de la piedra actúa como <b>variable oculta</b> (de confusión). Moraleja: no compares porcentajes totales sin mirar cómo se reparten los grupos.</p>" +
        ojo("estas paradojas no son trucos: son pruebas de que la intuición confunde P(A | B) con P(B | A), olvida la tasa base y mezcla grupos de tamaños distintos. La salida es siempre la misma: <b>escribir los sucesos, las probabilidades condicionadas y calcular</b>.")
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Adelanto: variables aleatorias y distribución binomial",
      html:
        "<p>Muchas veces no interesa el resultado exacto del experimento, sino un <b>número</b> asociado a él: la suma de dos dados, las caras de diez monedas, los aciertos de un examen, la ganancia de un juego. Una <b>variable aleatoria</b> X es una regla que asigna un número a cada resultado. Su <b>distribución de probabilidad</b> es la tabla de sus valores xᵢ con sus probabilidades pᵢ = P(X = xᵢ), que suman 1.</p>" +
        "<h5>Media (esperanza) y varianza</h5>" +
        formula("μ = E(X) = Σ xᵢ·pᵢ    ·    σ² = Σ xᵢ²·pᵢ − μ²    ·    σ = √(σ²)") +
        "<p>La media es el «valor medio a largo plazo» (el centro de gravedad de la distribución) y la desviación típica mide su dispersión. Para un dado, X = resultado: μ = (1 + 2 + … + 6)/6 = <b>3,5</b> (un valor que el dado nunca da, pero es el promedio de muchas tiradas) y σ² = (1² + … + 6²)/6 − 3,5² = 91/6 − 12,25 = 35/12 ≈ 2,917, σ ≈ 1,708.</p>" +
        ejemplo("¿Es justo este juego?", "Pagas 1 € por tirar un dado. Si sale 6 recibes 3 €, y en otro caso no recibes nada. ¿Cuánto ganas de media por partida? ¿Qué premio por el 6 haría el juego justo?", [
          "Ganancia neta X: con probabilidad 1/6 ganas 3 − 1 = +2 €; con probabilidad 5/6 pierdes 1 € (X = −1). E(X) = 2·1/6 + (−1)·5/6 = −3/6 = <b>−0,5 €</b> por partida: en 100 partidas se pierden unos 50 €.",
          "Un juego es <b>justo</b> si E(X) = 0. Con premio p por el 6: (p − 1)·1/6 − 1·5/6 = 0 → p − 1 = 5 → <b>p = 6 €</b>. Es decir, justo sería pagar 6 € por un 6 (lo que se tiene que pagar al «acertar» es el inverso de la probabilidad)."
        ]) +
        "<h5>La distribución binomial</h5>" +
        "<p>Un experimento de <b>Bernoulli</b> tiene sólo dos resultados: éxito (probabilidad p) y fracaso (probabilidad 1 − p). Si se repite n veces <b>de forma independiente</b> y con la misma p, la variable X = «número de éxitos» sigue una <b>distribución binomial B(n, p)</b>:</p>" +
        formula("P(X = k) = C(n, k)·pᵏ·(1 − p)ⁿ⁻ᵏ     (k = 0, 1, …, n)     ·     μ = n·p     ·     σ² = n·p·(1 − p)") +
        "<p>Por qué es así: un camino concreto con k éxitos y n − k fracasos tiene probabilidad pᵏ(1 − p)ⁿ⁻ᵏ (se multiplican por independencia), y hay C(n, k) caminos distintos (se elige en cuáles de las n pruebas están los éxitos). Se suman por ser incompatibles. Es exactamente lo que se hizo con los tiros libres (sección 9).</p>" +
        w("m13_binomial") +
        ejemplo("Un examen tipo test contestado al azar", "Un examen tiene 10 preguntas con 4 opciones cada una (sólo una correcta). Un alumno contesta todas al azar. Sea X el número de aciertos. Calcula P(X = 0), P(X ≥ 6) y la media.", [
          "X sigue B(10; 0,25): cada pregunta es un éxito con p = 1/4, de forma independiente.",
          "P(X = 0) = 0,75¹⁰ = <b>0,0563</b> (un 5,6 % de sacar un cero).",
          "P(X ≥ 6) = P(6) + P(7) + P(8) + P(9) + P(10) = 0,01622 + 0,00309 + 0,00039 + 0,00003 + 0,00000 ≈ <b>0,0197</b>: aprobar al azar es muy difícil (menos de un 2 %).",
          "Media μ = 10·0,25 = <b>2,5</b> aciertos; σ² = 10·0,25·0,75 = 1,875, σ = 1,369."
        ]) +
        ejemplo("Piezas defectuosas", "El 3 % de las piezas de una máquina son defectuosas. Se toma un lote de 20 piezas. ¿Probabilidad de que ninguna sea defectuosa? ¿Y de que haya al menos una?", [
          "X ~ B(20; 0,03). P(X = 0) = 0,97²⁰ = <b>0,5438</b>.",
          "P(X ≥ 1) = 1 − P(X = 0) = <b>0,4562</b>: casi la mitad de los lotes de 20 piezas tienen al menos una defectuosa, aunque sólo el 3 % de las piezas lo sean."
        ]) +
        ojo("la binomial exige <b>independencia</b> y <b>p constante</b>. Si se extrae de una urna pequeña <i>sin reposición</i>, las pruebas no son independientes (p cambia) y la distribución correcta es la hipergeométrica (sección 8). Con poblaciones muy grandes la diferencia es despreciable.") +
        "<p>En 2.º de Bachillerato se estudiará la distribución <b>normal</b> como aproximación de la binomial para n grande (es la «campana» que se aprecia en el simulador al aumentar n) y se verán los contrastes de hipótesis, que usan todo esto.</p>"
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. Cómo resolver un problema de probabilidad (método y modelos EvAU)",
      html:
        "<h5>Seis pasos para no perderse</h5>" +
        "<ol>" +
        "<li><b>Define los sucesos con letras</b> y escribe qué significa cada una (A = «la pieza es defectuosa»). Esto vale ya puntos en un examen.</li>" +
        "<li><b>Traduce los datos a probabilidades</b>. Los porcentajes que empiezan con «de los que…», «entre los…», «si…» son <b>condicionadas</b>: P(D | A₁) = 0,02. Los que hablan de la población entera son <b>marginales</b>.</li>" +
        "<li><b>Elige la herramienta</b>: Laplace (casos), tabla de contingencia (dos características), árbol (etapas), fórmulas (unión, producto, total, Bayes).</li>" +
        "<li><b>Calcula</b>, indicando qué regla usas en cada paso.</li>" +
        "<li><b>Comprueba</b>: 0 ≤ P ≤ 1, las ramas de cada nodo suman 1, las probabilidades de un sistema completo suman 1, el resultado tiene sentido.</li>" +
        "<li><b>Redacta la respuesta</b> con una frase: «La probabilidad de que … es 0,58».</li>" +
        "</ol>" +
        "<h5>Palabras clave del enunciado</h5>" +
        tabla(["Si el enunciado dice…", "Piensa en…"], [
          ["«sabiendo que», «dado que», «si resulta que», «entre los que», «de los que»", "probabilidad <b>condicionada</b> P(A | B): lo que viene después de «sabiendo que» es la condición B"],
          ["«y», «ambos», «a la vez», «los dos»", "<b>intersección</b> A ∩ B (producto, o casilla de la tabla)"],
          ["«o», «al menos uno de»", "<b>unión</b> A ∪ B (¡no olvides restar la intersección!) o complementario"],
          ["«ninguno», «ni… ni…»", "complementario de la unión: (A ∪ B)ᶜ = Ā ∩ B̄"],
          ["«al menos uno»", "1 − P(ninguno)"],
          ["«independientes», «con reposición», «lanzamientos sucesivos»", "regla del producto P(A ∩ B) = P(A)·P(B)"],
          ["«sin reposición», «sin devolver»", "condicionadas encadenadas (o combinaciones)"],
          ["«¿de qué origen es más probable que venga?», «sabiendo que ha resultado…»", "<b>Bayes</b> (después de calcular la probabilidad total)"]
        ]) +
        "<h5>Cuatro problemas completos de estilo EvAU</h5>" +
        ejemplo("Problema 1 · Urnas y un dado", "La urna I contiene 3 bolas blancas y 2 negras; la urna II, 1 blanca y 4 negras. Se lanza un dado: si sale 1 o 2 se extrae una bola de la urna I; en otro caso, de la urna II. (a) Probabilidad de sacar una bola blanca. (b) Si la bola extraída es blanca, ¿probabilidad de que sea de la urna I?", [
          "Sucesos: I = «se elige la urna I» (P = 2/6 = 1/3), II = «se elige la urna II» (P = 2/3), B = «bola blanca». P(B | I) = 3/5; P(B | II) = 1/5.",
          "(a) Probabilidad total: P(B) = 1/3·3/5 + 2/3·1/5 = 3/15 + 2/15 = 5/15 = <b>1/3</b>.",
          "(b) Bayes: P(I | B) = (1/3·3/5)/(1/3) = (1/5)/(1/3) = <b>3/5 = 0,6</b>.",
          "Comprobación: P(II | B) = (2/15)/(1/3) = 2/5; 3/5 + 2/5 = 1 ✓."
        ]) +
        ejemplo("Problema 2 · Transporte en una ciudad", "En una ciudad, el 45 % de los habitantes usa el autobús (B), el 30 % la bicicleta (C) y el 15 % usa ambos. Se elige un habitante. Calcula: (a) P(no usa ninguno). (b) P(sólo bici). (c) P(usa bus | usa bici). (d) ¿Son independientes B y C?", [
          "P(B) = 0,45; P(C) = 0,30; P(B ∩ C) = 0,15.",
          "(a) P(B ∪ C) = 0,45 + 0,30 − 0,15 = 0,60 → P(ninguno) = 1 − 0,60 = <b>0,40</b>.",
          "(b) P(C − B) = P(C) − P(B ∩ C) = 0,30 − 0,15 = <b>0,15</b>.",
          "(c) P(B | C) = P(B ∩ C)/P(C) = 0,15/0,30 = <b>0,5</b>.",
          "(d) P(B)·P(C) = 0,45·0,30 = 0,135 ≠ 0,15 = P(B ∩ C): <b>no son independientes</b> (los que usan la bici usan más el bus, 50 %, que el resto de la población, 45 %)."
        ]) +
        ejemplo("Problema 3 · Filtro de correo", "El 40 % del correo recibido es spam. Un filtro marca como spam el 95 % del spam y también el 2 % del correo legítimo. (a) ¿Qué porcentaje de mensajes marca el filtro? (b) Si un mensaje está marcado, ¿probabilidad de que sea realmente spam? (c) Si no está marcado, ¿probabilidad de que sea spam?", [
          "S = «es spam», M = «marcado». P(S) = 0,4; P(M | S) = 0,95; P(M | S̄) = 0,02.",
          "(a) P(M) = 0,4·0,95 + 0,6·0,02 = 0,380 + 0,012 = <b>0,392</b>.",
          "(b) P(S | M) = 0,380/0,392 = <b>0,9694</b> (el filtro funciona bien porque el spam es muy frecuente: tasa base alta).",
          "(c) P(S | M̄) = P(S)·P(M̄ | S)/P(M̄) = 0,4·0,05/0,608 = 0,02/0,608 = <b>0,0329</b> (un 3,3 % del correo no marcado es spam que se escapa)."
        ]) +
        ejemplo("Problema 4 · Bombillas defectuosas", "En una caja hay 12 bombillas, 4 de ellas defectuosas. Se eligen 3 al azar sin reposición. Calcula la probabilidad de que (a) ninguna sea defectuosa; (b) exactamente una; (c) al menos una.", [
          "Posibles: C(12, 3) = 220 grupos de 3 (equiprobables).",
          "(a) Ninguna defectuosa: C(8, 3) = 56 → 56/220 = 14/55 ≈ <b>0,2545</b>.",
          "(b) Exactamente una: C(4, 1)·C(8, 2) = 4·28 = 112 → 112/220 = 28/55 ≈ <b>0,5091</b>.",
          "(c) Al menos una: 1 − 14/55 = 41/55 ≈ <b>0,7455</b>.",
          "(Comprobación con las cuatro posibilidades: 0 → 14/55; 1 → 28/55; 2 → C(4,2)·8/220 = 48/220 = 12/55; 3 → 4/220 = 1/55. Suman (14 + 28 + 12 + 1)/55 = 1 ✓.)"
        ]) +
        "<p>Observa que los cuatro problemas se resuelven con las mismas piezas: una tabla o un árbol, la regla del producto y la suma de los caminos. Si te atascas, dibuja el árbol y escribe encima cada probabilidad con su condición.</p>"
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta presenta un razonamiento con un fallo. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 15
    {
      h: "15. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test, tarjetas con las fórmulas, un juego para unir cada situación con la herramienta adecuada, otro para clasificar sucesos y un ejercicio para ordenar los pasos de un problema de Bayes.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "herramientas") + w("clasificar", "sucesos") + w("orden", "bayes")
    }
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    herramientas: {
      titulo: "¿Qué herramienta uso?",
      consigna: "Une cada situación con el método o la fórmula que la resuelve.",
      pares: [
        ["Sacar dos cartas sin devolver la primera", "Condicionadas encadenadas: P(A)·P(B | A)"],
        ["Lanzar dos veces una moneda (cara y cara)", "Independientes: P(A)·P(B)"],
        ["«Al menos un 6» en cinco tiradas de un dado", "Suceso contrario: 1 − (5/6)⁵"],
        ["«Sabiendo que el test ha dado positivo, ¿probabilidad de estar enfermo?»", "Teorema de Bayes"],
        ["Un suceso que se puede alcanzar por varios caminos de un árbol", "Probabilidad total: suma de los caminos"],
        ["Número de aciertos en n pruebas independientes con la misma p", "Distribución binomial B(n, p)"],
        ["Elegir 3 personas de 10 sin importar el orden", "Combinaciones C(10, 3)"],
        ["«A o B», pudiendo ocurrir los dos a la vez", "P(A) + P(B) − P(A ∩ B)"]
      ]
    },
    sucesos: {
      titulo: "Incompatibles, independientes o dependientes",
      consigna: "Toca cada pareja de sucesos y clasifícala. ¡Ojo!: la independencia se decide calculando.",
      categorias: ["Incompatibles", "Independientes", "Dependientes y compatibles"],
      items: [
        { t: "Dado: «sale 2» y «sale 5»", c: 0 },
        { t: "Dado: «sale par» y «sale impar»", c: 0 },
        { t: "Una carta de la baraja: «es de oros» y «es de copas»", c: 0 },
        { t: "Dos lanzamientos de una moneda: «cara en el 1.º» y «cara en el 2.º»", c: 1 },
        { t: "Dos dados: «6 en el primero» y «6 en el segundo»", c: 1 },
        { t: "Moneda y dado a la vez: «sale cara» y «sale par»", c: 1 },
        { t: "Dado: «sale par» y «sale menor que 5»  (P(A∩B) = 1/3 = 1/2·2/3)", c: 1 },
        { t: "Una carta de la baraja española: «es un as» y «es de oros»", c: 1 },
        { t: "Dos cartas sin devolver: «la 1.ª es as» y «la 2.ª es as»", c: 2 },
        { t: "Dado: «sale par» y «sale menor que 4»  (P(A∩B) = 1/6 ≠ 1/2·1/2)", c: 2 },
        { t: "Una persona: «tiene gripe» y «tiene fiebre»", c: 2 }
      ]
    },
    bayes: {
      titulo: "Un problema de probabilidad total y Bayes",
      consigna: "Ordena los pasos de la resolución.",
      items: [
        { t: "Definir los sucesos: un sistema completo A₁, …, Aₙ y el suceso B observado", nota: "Escribe qué significa cada letra." },
        { t: "Escribir las probabilidades a priori P(Aᵢ) y las condicionadas P(B | Aᵢ) en un árbol", nota: "Las ramas de cada nodo suman 1." },
        { t: "Multiplicar a lo largo de cada camino: P(Aᵢ ∩ B) = P(Aᵢ)·P(B | Aᵢ)", nota: "Regla del producto." },
        { t: "Sumar los caminos que acaban en B: probabilidad total P(B)", nota: "Es el denominador de Bayes." },
        { t: "Dividir el camino pedido entre P(B): P(Aᵢ | B) = P(Aᵢ ∩ B)/P(B)", nota: "Teorema de Bayes." },
        { t: "Comprobar que las probabilidades a posteriori suman 1 y redactar la respuesta", nota: "Una frase con el resultado." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«P(A) = 0,6 y P(B) = 0,7, luego P(A ∪ B) = 0,6 + 0,7 = 1,3.» ¿Qué falla?",
          op: ["Nada", "Una probabilidad nunca puede valer más de 1: se olvidó restar P(A ∩ B) (los sucesos no son incompatibles)", "Hay que multiplicar, no sumar", "Debía dividir entre 2"], ok: 1,
          porque: "La suma sólo vale para incompatibles. En general P(A ∪ B) = P(A) + P(B) − P(A ∩ B) ≤ 1, y aquí P(A ∩ B) ≥ 0,3." },
        { q: "«Como A y B son incompatibles, son independientes.» ¿Qué falla?",
          op: ["Nada", "Incompatibles con probabilidades positivas son dependientes: si ocurre A, B no puede ocurrir (P(B | A) = 0 ≠ P(B))", "Sólo son independientes si P(A) = 0,5", "Ser incompatibles significa P(A ∩ B) = P(A)P(B)"], ok: 1,
          porque: "Independencia: P(A ∩ B) = P(A)P(B). Incompatibilidad: P(A ∩ B) = 0. Con P(A), P(B) &gt; 0 son excluyentes entre sí." },
        { q: "«Mañana o llueve o no llueve: hay dos casos, luego la probabilidad de que llueva es 1/2.» ¿Qué falla?",
          op: ["Nada", "Laplace exige casos equiprobables, y que haya dos resultados no los hace igual de probables", "Debía ser 1/3", "Es 1/2 siempre que haya dos casos"], ok: 1,
          porque: "La regla de Laplace sólo vale si todos los casos posibles tienen la misma probabilidad. «Llueve / no llueve» no es el caso." },
        { q: "«Una prueba detecta el 95 % de los enfermos, así que si das positivo hay un 95 % de probabilidad de estar enfermo.» ¿Qué falla?",
          op: ["Nada", "Se confunde P(positivo | enfermo) con P(enfermo | positivo): falta la tasa base (la prevalencia) y el teorema de Bayes", "Debía ser el 5 %", "Se debería multiplicar por 2"], ok: 1,
          porque: "Si la enfermedad es rara, hay más falsos positivos que positivos reales: con prevalencia del 1 % y falsos positivos del 5 %, P(enfermo | positivo) ≈ 16 %." },
        { q: "«Al lanzar dos monedas hay tres resultados (2 caras, 1 cara, 0 caras), luego cada uno tiene probabilidad 1/3.» ¿Qué falla?",
          op: ["Nada", "Los tres no son equiprobables: «1 cara» agrupa CX y XC, así que vale 1/2, y los otros dos 1/4", "Debía haber seis resultados, todos con probabilidad 1/6", "Las monedas no se pueden lanzar a la vez"], ok: 1,
          porque: "El espacio equiprobable es {CC, CX, XC, XX}; «1 cara» = {CX, XC} tiene probabilidad 2/4." },
        { q: "«Ha salido cara cinco veces seguidas; ahora es más probable que salga cruz.» ¿Qué falla?",
          op: ["Nada: hay que compensar", "La moneda no tiene memoria: los lanzamientos son independientes y P(cruz) sigue siendo 1/2", "Debe salir cara otra vez", "Sólo vale con monedas de 1 euro"], ok: 1,
          porque: "Es la falacia del jugador. La ley de los grandes números no «compensa» las rachas: las diluye en muchos lanzamientos nuevos." },
        { q: "«La probabilidad de al menos un 6 en cuatro tiradas es 4·(1/6) = 2/3.» ¿Qué falla?",
          op: ["Nada", "Se cuentan varias veces los casos con más de un 6; lo correcto es 1 − (5/6)⁴ ≈ 0,518", "Debía ser 4/6 elevado a 4", "El 6 no se puede sumar"], ok: 1,
          porque: "«Al menos uno» se calcula con el suceso contrario: 1 − P(ningún 6) = 1 − (5/6)⁴ = 671/1 296 ≈ 0,5177." },
        { q: "De una urna con 5 rojas y 3 azules se extraen dos bolas SIN devolver la primera, y se calcula P(dos rojas) = 5/8·5/8. ¿Qué falla?",
          op: ["Nada", "Sin reposición la segunda extracción cambia: P(2.ª roja | 1.ª roja) = 4/7, y el resultado correcto es 5/8·4/7 = 5/14", "Debía sumar 5/8 + 5/8", "Debía usar 3/8"], ok: 1,
          porque: "Producto de independientes sólo si hay reposición. Sin reposición hay que condicionar." },
        { q: "«Sé que P(A | B) = 0,3, así que P(B | A) = 0,3.» ¿Qué falla?",
          op: ["Nada", "La condicionada no es simétrica: P(B | A) = P(A | B)·P(B)/P(A), que sólo coincide si P(A) = P(B)", "P(B | A) = 1 − 0,3", "P(B | A) = 0,3²"], ok: 1,
          porque: "P(A | B) = P(A ∩ B)/P(B) y P(B | A) = P(A ∩ B)/P(A): el numerador es el mismo, los denominadores no." },
        { q: "Un alumno escribe el teorema de Bayes como P(A | B) = P(A)·P(B | A). ¿Qué falla?",
          op: ["Nada", "Falta dividir entre P(B), la probabilidad total", "Debía restar P(B)", "Debía sumar P(A)"], ok: 1,
          porque: "P(A ∩ B) = P(A)·P(B | A) es sólo el numerador. Hay que dividir entre P(B) = suma de todos los caminos que acaban en B." },
        { q: "En un árbol, un alumno dibuja las dos ramas que salen de un nodo con probabilidades 0,7 y 0,5. ¿Qué falla?",
          op: ["Nada", "Las ramas que salen de un nodo agotan todas las opciones y deben sumar 1", "Debían ser iguales", "Deben sumar 2"], ok: 1,
          porque: "Las probabilidades de las ramas de un mismo nodo suman 1 (0,7 + 0,3, por ejemplo)." },
        { q: "En el problema de Monty Hall, un alumno razona: «quedan dos puertas, así que da igual cambiar: 50 %.» ¿Qué falla?",
          op: ["Nada", "El presentador no abre una puerta al azar: sabe dónde está el coche. Al cambiar se gana con probabilidad 2/3", "Hay que quedarse: 2/3", "Hay tres puertas, luego 1/3"], ok: 1,
          porque: "Elegiste mal con probabilidad 2/3; en ese caso, cambiar te lleva con seguridad al coche." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Si A y B son independientes, con P(A) = 0,3 y P(B) = 0,5, entonces P(A ∩ B) vale…",
          op: ["0,15", "0,8", "0,2", "0"], ok: 0,
          porque: "Independientes: P(A ∩ B) = 0,3·0,5 = 0,15." },
        { q: "Si A y B son incompatibles, con P(A) = 0,3 y P(B) = 0,5, entonces P(A ∪ B) vale…",
          op: ["0,8", "0,65", "0,15", "0,5"], ok: 0,
          porque: "Incompatibles: P(A ∩ B) = 0 y P(A ∪ B) = 0,3 + 0,5 = 0,8." },
        { q: "El suceso «no ocurre ni A ni B» es…",
          op: ["Ā ∩ B̄ = (A ∪ B)ᶜ", "Ā ∪ B̄", "A ∩ B", "(A ∩ B)ᶜ"], ok: 0,
          porque: "Primera ley de De Morgan: (A ∪ B)ᶜ = Ā ∩ B̄." },
        { q: "«No ocurren A y B a la vez» se escribe…",
          op: ["Ā ∪ B̄ = (A ∩ B)ᶜ", "Ā ∩ B̄", "A − B", "A ∪ B"], ok: 0,
          porque: "Segunda ley de De Morgan: (A ∩ B)ᶜ = Ā ∪ B̄." },
        { q: "Si P(A) = 0,5, P(B) = 0,4 y P(A ∩ B) = 0,2, entonces P(A | B) vale…",
          op: ["0,5", "0,4", "0,2", "0,1"], ok: 0,
          porque: "P(A | B) = P(A ∩ B)/P(B) = 0,2/0,4 = 0,5 (como P(A) = 0,5, A y B son independientes)." },
        { q: "Al lanzar dos dados, la probabilidad de que la suma sea 8 es…",
          op: ["5/36", "1/11", "1/6", "1/8"], ok: 0,
          porque: "Cinco parejas suman 8: (2,6), (3,5), (4,4), (5,3), (6,2). 5/36." },
        { q: "El número de comisiones de 2 personas que se pueden elegir de un grupo de 6 es…",
          op: ["15", "30", "36", "12"], ok: 0,
          porque: "No importa el orden: C(6, 2) = 6·5/2 = 15." },
        { q: "«Sale 1» y «sale 6» en un dado son sucesos…",
          op: ["incompatibles, pero no contrarios", "contrarios", "independientes", "compatibles"], ok: 0,
          porque: "No pueden darse a la vez, pero no cubren todo el espacio (faltan 2, 3, 4 y 5): no son contrarios." },
        { q: "Si P(A) = 0,5, P(B | A) = 0,9 y P(B | Ā) = 0,3, entonces P(A | B) vale…",
          op: ["0,75", "0,9", "0,6", "0,45"], ok: 0,
          porque: "P(B) = 0,5·0,9 + 0,5·0,3 = 0,6. P(A | B) = 0,45/0,6 = 0,75." },
        { q: "Al lanzar tres monedas, la probabilidad de obtener al menos una cara es…",
          op: ["7/8", "1/2", "3/8", "1/8"], ok: 0,
          porque: "1 − P(ninguna cara) = 1 − (1/2)³ = 7/8." },
        { q: "Si X ~ B(4; 0,5), P(X = 2) vale…",
          op: ["0,375", "0,5", "0,25", "0,0625"], ok: 0,
          porque: "C(4, 2)·0,5²·0,5² = 6/16 = 0,375." },
        { q: "Si A ⊂ B, entonces siempre se cumple que…",
          op: ["P(A) ≤ P(B)", "P(A) ≥ P(B)", "P(A) = P(B)", "A y B son incompatibles"], ok: 0,
          porque: "Monotonía: P(B) = P(A) + P(B − A) ≥ P(A)." }
      ]
    },
    tj1: {
      titulo: "Probabilidad",
      cartas: [
        { a: "Experimento aleatorio y espacio muestral", b: "Resultados conocidos pero impredecibles, repetible. E = conjunto de todos los resultados posibles." },
        { a: "Suceso", b: "Subconjunto de E. Elemental (un resultado), compuesto, seguro (E) o imposible (∅). Hay 2ⁿ sucesos." },
        { a: "Operaciones con sucesos", b: "A ∪ B: al menos uno · A ∩ B: los dos · Ā: no A · A − B = A ∩ B̄: A pero no B." },
        { a: "Leyes de De Morgan", b: "(A ∪ B)ᶜ = Ā ∩ B̄ y (A ∩ B)ᶜ = Ā ∪ B̄." },
        { a: "Regla de Laplace", b: "P(A) = casos favorables / casos posibles, sólo con resultados equiprobables." },
        { a: "Axiomas de Kolmogorov", b: "P(A) ≥ 0 · P(E) = 1 · P(A ∪ B) = P(A) + P(B) si A ∩ B = ∅." },
        { a: "Consecuencias de los axiomas", b: "P(Ā) = 1 − P(A) · P(∅) = 0 · 0 ≤ P ≤ 1 · A ⊂ B ⟹ P(A) ≤ P(B)." },
        { a: "Probabilidad de la unión", b: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Con tres sucesos: inclusión–exclusión." },
        { a: "«Al menos uno»", b: "P(al menos uno) = 1 − P(ninguno)." },
        { a: "Probabilidad condicionada", b: "P(A | B) = P(A ∩ B)/P(B). Reduce el espacio muestral a B. No es simétrica." },
        { a: "Regla del producto", b: "P(A ∩ B) = P(A)·P(B | A). Con tres: P(A)·P(B | A)·P(C | A ∩ B)." },
        { a: "Independencia", b: "P(A ∩ B) = P(A)·P(B) ⟺ P(A | B) = P(A). Se comprueba con números. También lo son los complementarios." },
        { a: "Incompatibles ≠ independientes", b: "Incompatibles: A ∩ B = ∅. Si tienen probabilidad positiva son dependientes." },
        { a: "Probabilidad total", b: "P(B) = ΣP(Aᵢ)·P(B | Aᵢ), con A₁…Aₙ sistema completo. Suma de los caminos del árbol." },
        { a: "Teorema de Bayes", b: "P(Aᵢ | B) = P(Aᵢ)·P(B | Aᵢ)/P(B). Camino pedido entre suma de caminos." },
        { a: "Combinatoria", b: "V(n,k) = n!/(n−k)! (orden) · P(n) = n! · C(n,k) = n!/(k!(n−k)!) (sin orden) · VR = nᵏ." },
        { a: "Distribución binomial B(n, p)", b: "P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ · μ = np · σ² = np(1−p). Requiere independencia y p constante." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  var ejercicios = [
    // ================= ★ básico =================
    { id: "p1", nivel: 1,
      enunciado: "Se lanza un dado equilibrado. Calcula la probabilidad de obtener un número mayor que 4.",
      check: { tipo: "num", etiqueta: "P =", valor: 1 / 3 },
      pistas: ["Cuenta los resultados favorables y los posibles."],
      pasos: ["Casos posibles: 6. Casos favorables: {5, 6}, es decir, 2.", "Laplace: P = 2/6 = 1/3 ≈ 0,3333."],
      resultado: "P = 1/3 ≈ 0,3333" },
    { id: "p2", nivel: 1,
      enunciado: "Se lanzan dos monedas equilibradas. ¿Cuál es la probabilidad de obtener exactamente una cara?",
      check: { tipo: "num", etiqueta: "P =", valor: 0.5 },
      pistas: ["Escribe el espacio muestral con resultados ordenados: CC, CX, XC, XX."],
      pasos: ["E = {CC, CX, XC, XX}: 4 casos equiprobables.", "Exactamente una cara: CX y XC → 2 casos.", "P = 2/4 = 1/2."],
      resultado: "P = 1/2",
      ojo: "no es 1/3: «0, 1 o 2 caras» no son resultados equiprobables." },
    { id: "p3", nivel: 1,
      enunciado: "Se extrae una carta de una baraja española de 40 cartas. Calcula la probabilidad de que sea una figura (sota, caballo o rey).",
      check: { tipo: "num", etiqueta: "P =", valor: 0.3 },
      pistas: ["Hay 3 figuras en cada uno de los 4 palos."],
      pasos: ["Figuras: 3·4 = 12. Casos posibles: 40.", "P = 12/40 = 3/10 = 0,3."],
      resultado: "P = 3/10 = 0,3" },
    { id: "p4", nivel: 1,
      enunciado: "Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea 9?",
      check: { tipo: "num", etiqueta: "P =", valor: 1 / 9 },
      pistas: ["Hay 36 casos posibles. ¿Qué parejas suman 9?"],
      pasos: ["Parejas que suman 9: (3,6), (4,5), (5,4), (6,3) → 4 casos.", "P = 4/36 = 1/9 ≈ 0,1111."],
      resultado: "P = 1/9 ≈ 0,1111" },
    { id: "p5", nivel: 1,
      enunciado: "En un dado, A = «sale par» = {2, 4, 6} y B = «sale múltiplo de 3» = {3, 6}. ¿Cuál es el suceso A ∪ B?",
      check: { tipo: "opcion", etiqueta: "A ∪ B =", opciones: ["{6}", "{2, 3, 4, 6}", "{2, 3, 4, 5, 6}", "{2, 4}"], ok: 1 },
      pistas: ["La unión incluye los elementos que están en A, en B o en los dos (sin repetir)."],
      pasos: ["A ∪ B = {2, 4, 6} ∪ {3, 6} = {2, 3, 4, 6}.", "El 6 está en los dos pero se escribe una sola vez; la intersección es {6}."],
      resultado: "A ∪ B = {2, 3, 4, 6}" },
    { id: "p6", nivel: 1,
      enunciado: "Si la probabilidad de que un tren llegue con retraso es 0,35, ¿cuál es la probabilidad de que llegue a su hora?",
      check: { tipo: "num", etiqueta: "P =", valor: 0.65 },
      pistas: ["Son sucesos contrarios."],
      pasos: ["P(a su hora) = 1 − P(con retraso) = 1 − 0,35 = 0,65."],
      resultado: "P = 0,65" },
    { id: "p7", nivel: 1,
      enunciado: "Si P(A) = 0,5, P(B) = 0,3 y P(A ∩ B) = 0,1, calcula P(A ∪ B).",
      check: { tipo: "num", etiqueta: "P(A ∪ B) =", valor: 0.7 },
      pistas: ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B)."],
      pasos: ["P(A ∪ B) = 0,5 + 0,3 − 0,1 = 0,7."],
      resultado: "P(A ∪ B) = 0,7" },
    { id: "p8", nivel: 1,
      enunciado: "A y B son incompatibles, con P(A) = 0,2 y P(B) = 0,45. Calcula P(A ∪ B).",
      check: { tipo: "num", etiqueta: "P(A ∪ B) =", valor: 0.65 },
      pistas: ["Si A ∩ B = ∅ entonces P(A ∩ B) = 0."],
      pasos: ["Incompatibles: P(A ∩ B) = 0, así que P(A ∪ B) = 0,2 + 0,45 = 0,65."],
      resultado: "P(A ∪ B) = 0,65" },
    { id: "p9", nivel: 1,
      enunciado: "A y B son independientes, con P(A) = 0,4 y P(B) = 0,25. Calcula P(A ∩ B).",
      check: { tipo: "num", etiqueta: "P(A ∩ B) =", valor: 0.1 },
      pistas: ["Para independientes, la probabilidad de la intersección es el producto."],
      pasos: ["P(A ∩ B) = P(A)·P(B) = 0,4·0,25 = 0,1."],
      resultado: "P(A ∩ B) = 0,1" },
    { id: "p10", nivel: 1,
      enunciado: "Si P(A ∩ B) = 0,12 y P(B) = 0,4, calcula la probabilidad condicionada P(A | B).",
      check: { tipo: "num", etiqueta: "P(A | B) =", valor: 0.3 },
      pistas: ["P(A | B) = P(A ∩ B)/P(B)."],
      pasos: ["P(A | B) = 0,12/0,4 = 0,3."],
      resultado: "P(A | B) = 0,3" },
    { id: "p11", nivel: 1,
      enunciado: "¿Cómo se escribe el suceso «ocurre A pero no ocurre B»?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["A ∩ B̄", "Ā ∩ B", "A ∪ B̄", "(A ∩ B)ᶜ"], ok: 0 },
      pistas: ["«Pero» equivale a «y»; «no ocurre B» es B̄."],
      pasos: ["«Ocurre A» y «no ocurre B»: A ∩ B̄, que también se escribe A − B."],
      resultado: "A ∩ B̄ = A − B" },
    { id: "p12", nivel: 1,
      enunciado: "¿De cuántas formas distintas se pueden elegir 3 alumnos de un grupo de 8 para formar una comisión (sin importar el orden)?",
      check: { tipo: "num", etiqueta: "C(8, 3) =", valor: 56 },
      pistas: ["No importa el orden: combinaciones. C(n, k) = n!/(k!(n − k)!)."],
      pasos: ["C(8, 3) = 8·7·6/(3·2·1) = 336/6 = 56."],
      resultado: "56 comisiones" },
    { id: "p13", nivel: 1,
      enunciado: "En una carrera participan 10 atletas. ¿De cuántas maneras distintas pueden repartirse el oro, la plata y el bronce?",
      check: { tipo: "num", etiqueta: "Maneras =", valor: 720 },
      pistas: ["Aquí sí importa el orden y no se repiten: variaciones V(10, 3)."],
      pasos: ["V(10, 3) = 10·9·8 = 720."],
      resultado: "720 maneras",
      ojo: "con combinaciones saldría 120, pero un podio ABC es distinto de CBA." },
    { id: "p14", nivel: 1,
      enunciado: "¿Cuál de los siguientes números NO puede ser la probabilidad de un suceso?",
      check: { tipo: "opcion", etiqueta: "No puede ser", opciones: ["0,35", "1", "1,2", "0"], ok: 2 },
      pistas: ["Recuerda entre qué valores está siempre P(A)."],
      pasos: ["0 ≤ P(A) ≤ 1 siempre. 0 es la probabilidad del suceso imposible, 1 la del seguro, pero 1,2 &gt; 1 es imposible."],
      resultado: "1,2" },

    // ================= ★★ medio =================
    { id: "p15", nivel: 2,
      enunciado: "Se lanza un dado tres veces. Calcula la probabilidad de obtener al menos un 6.",
      check: { tipo: "num", etiqueta: "P =", valor: 91 / 216 },
      pistas: ["Calcula primero la probabilidad de que no salga ningún 6 y pasa al contrario."],
      pasos: ["P(ningún 6) = (5/6)³ = 125/216 (los tres lanzamientos son independientes).", "P(al menos un 6) = 1 − 125/216 = 91/216 ≈ 0,4213."],
      resultado: "P = 91/216 ≈ 0,4213",
      ojo: "no es 3·(1/6) = 0,5: así se cuentan varias veces los casos con más de un 6." },
    { id: "p16", nivel: 2,
      enunciado: "Se sabe que P(A) = 0,5, P(B) = 0,4 y P(A ∪ B) = 0,7. Calcula P(A ∩ B) y P(Ā ∩ B̄).",
      check: [{ tipo: "num", etiqueta: "P(A ∩ B) =", valor: 0.2 }, { tipo: "num", etiqueta: "P(Ā ∩ B̄) =", valor: 0.3 }],
      pistas: ["Despeja P(A ∩ B) de la fórmula de la unión. Después aplica De Morgan al segundo apartado."],
      pasos: ["0,7 = 0,5 + 0,4 − P(A ∩ B) → P(A ∩ B) = 0,9 − 0,7 = 0,2.", "Ā ∩ B̄ = (A ∪ B)ᶜ → P = 1 − 0,7 = 0,3."],
      resultado: "P(A ∩ B) = 0,2 · P(Ā ∩ B̄) = 0,3" },
    { id: "p17", nivel: 2,
      enunciado: "Con P(A) = 0,6, P(B) = 0,5 y P(A ∩ B) = 0,3, calcula P(A − B) (ocurre A pero no B) y la probabilidad de que ocurra exactamente uno de los dos.",
      check: [{ tipo: "num", etiqueta: "P(A − B) =", valor: 0.3 }, { tipo: "num", etiqueta: "P(exactamente uno) =", valor: 0.5 }],
      pistas: ["P(A − B) = P(A) − P(A ∩ B). «Exactamente uno» = sólo A + sólo B."],
      pasos: ["Sólo A: P(A) − P(A ∩ B) = 0,6 − 0,3 = 0,3.", "Sólo B: 0,5 − 0,3 = 0,2.", "Exactamente uno: 0,3 + 0,2 = 0,5 (también P(A) + P(B) − 2P(A ∩ B) = 1,1 − 0,6 = 0,5)."],
      resultado: "P(A − B) = 0,3 · P(exactamente uno) = 0,5" },
    { id: "p18", nivel: 2,
      enunciado: "Se extrae una carta de la baraja española. Calcula la probabilidad de que sea un rey o una carta de copas.",
      check: { tipo: "num", etiqueta: "P =", valor: 0.325 },
      pistas: ["El rey de copas está en los dos sucesos: no lo cuentes dos veces."],
      pasos: ["P(rey) = 4/40, P(copas) = 10/40, P(rey ∩ copas) = P(rey de copas) = 1/40.", "P(rey ∪ copas) = 4/40 + 10/40 − 1/40 = 13/40 = 0,325."],
      resultado: "P = 13/40 = 0,325" },
    { id: "p19", nivel: 2,
      enunciado: "Se extraen dos cartas de una baraja española sin devolver la primera. Calcula la probabilidad de que (a) las dos sean ases; (b) ninguna sea un as.",
      check: [{ tipo: "num", etiqueta: "(a) =", valor: 1 / 130 }, { tipo: "num", etiqueta: "(b) =", valor: 21 / 26 }],
      pistas: ["Regla del producto con condicionadas: P(1.ª)·P(2.ª | 1.ª).", "En (b), tras sacar una carta que no es as quedan 39 cartas, y 35 de ellas siguen sin ser ases."],
      pasos: ["(a) P = 4/40 · 3/39 = 12/1 560 = 1/130 ≈ 0,0077.", "(b) P(1.ª no as) = 36/40; P(2.ª no as | 1.ª no as) = 35/39. P = 36/40 · 35/39 = 1 260/1 560 = 21/26 ≈ 0,8077."],
      resultado: "(a) 1/130 ≈ 0,0077 · (b) 21/26 ≈ 0,8077" },
    { id: "p20", nivel: 2,
      enunciado: "Se lanzan dos dados. Calcula la probabilidad de que la suma sea 10 sabiendo que ha salido al menos un 6.",
      check: { tipo: "num", etiqueta: "P =", valor: 2 / 11 },
      pistas: ["Probabilidad condicionada: el espacio muestral se reduce a los casos donde hay algún 6."],
      pasos: ["Casos con al menos un 6: 11 de 36.", "De ellos, suman 10: (4,6) y (6,4) → 2 casos.", "P(suma 10 | algún 6) = (2/36)/(11/36) = 2/11 ≈ 0,1818."],
      resultado: "P = 2/11 ≈ 0,1818" },
    { id: "p21", nivel: 2,
      enunciado: "Se sabe que P(A) = 0,5, P(B) = 0,4 y P(A ∪ B) = 0,7. ¿Son A y B independientes?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["Sí, porque P(A ∩ B) = 0,2 = P(A)·P(B)", "No, porque P(A ∩ B) = 0,1", "No, porque son incompatibles", "No se puede saber"], ok: 0 },
      pistas: ["Calcula P(A ∩ B) con la unión y compárala con P(A)·P(B)."],
      pasos: ["P(A ∩ B) = 0,5 + 0,4 − 0,7 = 0,2.", "P(A)·P(B) = 0,5·0,4 = 0,2. Coinciden: son independientes (aunque se solapen)."],
      resultado: "Sí son independientes" },
    { id: "p22", nivel: 2,
      enunciado: "A y B son independientes, con P(A) = 0,3 y P(B) = 0,6. Calcula P(A ∪ B) y la probabilidad de que no ocurra ninguno de los dos.",
      check: [{ tipo: "num", etiqueta: "P(A ∪ B) =", valor: 0.72 }, { tipo: "num", etiqueta: "P(ninguno) =", valor: 0.28 }],
      pistas: ["Primero P(A ∩ B) = P(A)·P(B). Para «ninguno», también Ā y B̄ son independientes."],
      pasos: ["P(A ∩ B) = 0,3·0,6 = 0,18.", "P(A ∪ B) = 0,3 + 0,6 − 0,18 = 0,72.", "P(ninguno) = 1 − 0,72 = 0,28 (= 0,7·0,4)."],
      resultado: "P(A ∪ B) = 0,72 · P(ninguno) = 0,28" },
    { id: "p23", nivel: 2,
      enunciado: "La urna I tiene 2 bolas blancas y 3 negras; la urna II, 4 blancas y 1 negra. Se elige una urna al azar (probabilidad 1/2 cada una) y se extrae una bola. ¿Probabilidad de que sea blanca?",
      check: { tipo: "num", etiqueta: "P(blanca) =", valor: 0.6 },
      pistas: ["Probabilidad total: suma de los caminos que acaban en «blanca»."],
      pasos: ["P(B) = P(I)·P(B | I) + P(II)·P(B | II) = 1/2·2/5 + 1/2·4/5 = 0,2 + 0,4 = 0,6."],
      resultado: "P(blanca) = 0,6" },
    { id: "p24", nivel: 2,
      enunciado: "En la situación anterior (urna I: 2 blancas y 3 negras; urna II: 4 blancas y 1 negra; se elige una urna al azar), la bola extraída es blanca. ¿Cuál es la probabilidad de que proceda de la urna I?",
      check: { tipo: "num", etiqueta: "P(I | blanca) =", valor: 1 / 3 },
      pistas: ["Teorema de Bayes: camino «I y blanca» entre P(blanca)."],
      pasos: ["P(I ∩ B) = 1/2·2/5 = 0,2; P(B) = 0,6.", "P(I | B) = 0,2/0,6 = 1/3 ≈ 0,3333."],
      resultado: "P(I | blanca) = 1/3" },
    { id: "p25", nivel: 2,
      enunciado: "Un jugador acierta un tiro con probabilidad 0,6, de forma independiente en cada intento. Si lanza tres tiros, calcula la probabilidad de que acierte exactamente dos.",
      check: { tipo: "num", etiqueta: "P =", valor: 0.432 },
      pistas: ["Hay tres caminos con dos aciertos (AAF, AFA, FAA), todos con la misma probabilidad."],
      pasos: ["Cada camino: 0,6·0,6·0,4 = 0,144.", "P = 3·0,144 = 0,432. (Es C(3, 2)·0,6²·0,4¹.)"],
      resultado: "P = 0,432" },
    { id: "p26", nivel: 2,
      enunciado: "De un grupo de 5 chicas y 4 chicos se elige al azar un comité de 3 personas. Calcula el número de comités con 2 chicas y 1 chico, y la probabilidad de que el comité tenga esa composición.",
      check: [{ tipo: "num", etiqueta: "Nº de comités =", valor: 40 }, { tipo: "num", etiqueta: "Probabilidad =", valor: 10 / 21 }],
      pistas: ["Favorables: C(5, 2)·C(4, 1). Posibles: C(9, 3)."],
      pasos: ["Favorables: C(5, 2)·C(4, 1) = 10·4 = 40.", "Posibles: C(9, 3) = 84.", "P = 40/84 = 10/21 ≈ 0,4762."],
      resultado: "40 comités · P = 10/21 ≈ 0,4762" },
    { id: "p27", nivel: 2,
      enunciado: "De 150 personas, 90 son mujeres y 60 hombres. Llevan gafas 45 de las mujeres y 20 de los hombres. Se elige una persona al azar: calcula P(lleva gafas) y P(es mujer | lleva gafas).",
      check: [{ tipo: "num", etiqueta: "P(gafas) =", valor: 65 / 150 }, { tipo: "num", etiqueta: "P(mujer | gafas) =", valor: 45 / 65 }],
      pistas: ["Haz una tabla 2 × 2 con totales. La condición «lleva gafas» decide qué total usar."],
      pasos: ["Gafas: 45 + 20 = 65 de 150 → P(gafas) = 65/150 = 13/30 ≈ 0,4333.", "P(mujer | gafas) = 45/65 = 9/13 ≈ 0,6923 (se divide entre el total de la columna «gafas»)."],
      resultado: "P(gafas) = 13/30 ≈ 0,4333 · P(mujer | gafas) = 9/13 ≈ 0,6923" },
    { id: "p28", nivel: 2,
      enunciado: "Se extrae una carta de una baraja española. Escribe, en cualquier orden y separadas por comas, las probabilidades de: (a) que sea de oros, (b) que sea un as, (c) que sea el as de oros.",
      check: { tipo: "lista", etiqueta: "Probabilidades:", valores: [0.025, 0.1, 0.25], ph: "tres valores" },
      pistas: ["Laplace con 40 casos. El as de oros es una sola carta."],
      pasos: ["P(oros) = 10/40 = 0,25.", "P(as) = 4/40 = 0,1.", "P(as de oros) = 1/40 = 0,025. Observa que P(as ∩ oros) = P(as)·P(oros): independientes."],
      resultado: "0,25 · 0,1 · 0,025" },
    { id: "p29", nivel: 2,
      enunciado: "Un examen de 5 preguntas de verdadero/falso se contesta lanzando una moneda. ¿Probabilidad de acertar exactamente 3?",
      check: { tipo: "num", etiqueta: "P =", valor: 0.3125 },
      pistas: ["Binomial B(5; 0,5): P(X = 3) = C(5, 3)·0,5⁵."],
      pasos: ["C(5, 3) = 10 maneras de elegir cuáles se aciertan.", "P = 10·0,5³·0,5² = 10/32 = 0,3125."],
      resultado: "P = 10/32 = 0,3125" },
    { id: "p30", nivel: 2,
      enunciado: "(a) ¿Cuántos números de 3 cifras, todas distintas, se pueden formar con las cifras 1 a 9? (b) Si se forma al azar un número de 3 cifras con las cifras 1 a 9 pudiendo repetirlas, ¿cuál es la probabilidad de que las tres sean distintas?",
      check: [{ tipo: "num", etiqueta: "(a) =", valor: 504 }, { tipo: "num", etiqueta: "(b) =", valor: 504 / 729 }],
      pistas: ["(a) Variaciones sin repetición V(9, 3). (b) Posibles: variaciones con repetición 9³."],
      pasos: ["(a) V(9, 3) = 9·8·7 = 504.", "(b) Casos posibles: 9³ = 729. P = 504/729 = 56/81 ≈ 0,6914."],
      resultado: "(a) 504 · (b) 56/81 ≈ 0,6914" },

    // ================= ★★★ nivel PAU =================
    { id: "p31", nivel: 3,
      enunciado: "Demuestra, a partir de los axiomas de Kolmogorov, que P(Ā) = 1 − P(A).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Observa que A y Ā son incompatibles (A ∩ Ā = ∅)", p: 0.5 },
        { t: "Observa que A ∪ Ā = E", p: 0.5 },
        { t: "Aplica el axioma de aditividad: P(A ∪ Ā) = P(A) + P(Ā)", p: 0.5 },
        { t: "Usa P(E) = 1 y despeja: P(Ā) = 1 − P(A)", p: 0.5 }
      ] },
      pasos: ["A y Ā no tienen elementos comunes (incompatibles) y su unión es E.", "Por el axioma 3: P(A ∪ Ā) = P(A) + P(Ā). Por el axioma 2: P(A ∪ Ā) = P(E) = 1.", "Luego P(A) + P(Ā) = 1 y P(Ā) = 1 − P(A). ∎"],
      resultado: "P(Ā) = 1 − P(A)" },
    { id: "p32", nivel: 3,
      enunciado: "Demuestra que P(A ∪ B) = P(A) + P(B) − P(A ∩ B) usando que los sucesos incompatibles suman sus probabilidades.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Descompone A ∪ B = A ∪ (B − A) como unión de sucesos incompatibles", p: 0.5 },
        { t: "Aplica la aditividad: P(A ∪ B) = P(A) + P(B − A)", p: 0.5 },
        { t: "Descompone B = (B − A) ∪ (A ∩ B), incompatibles: P(B − A) = P(B) − P(A ∩ B)", p: 0.5 },
        { t: "Sustituye y obtiene la fórmula", p: 0.5 }
      ] },
      pasos: ["A ∪ B = A ∪ (B − A) y A ∩ (B − A) = ∅, luego P(A ∪ B) = P(A) + P(B − A).", "B = (B − A) ∪ (A ∩ B), incompatibles: P(B) = P(B − A) + P(A ∩ B) → P(B − A) = P(B) − P(A ∩ B).", "Sustituyendo: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). ∎"],
      resultado: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)" },
    { id: "p33", nivel: 3,
      enunciado: "Se sabe que P(A) = 0,5, P(B) = 0,4, P(C) = 0,3, P(A ∩ B) = 0,2, P(A ∩ C) = 0,15, P(B ∩ C) = 0,1 y P(A ∩ B ∩ C) = 0,05. Calcula P(A ∪ B ∪ C) y la probabilidad de que no ocurra ninguno de los tres.",
      check: [{ tipo: "num", etiqueta: "P(A ∪ B ∪ C) =", valor: 0.8 }, { tipo: "num", etiqueta: "P(ninguno) =", valor: 0.2 }],
      pistas: ["Inclusión–exclusión: suma de una en una, resta de dos en dos, suma de tres en tres."],
      pasos: ["P(A ∪ B ∪ C) = 0,5 + 0,4 + 0,3 − 0,2 − 0,15 − 0,1 + 0,05 = 1,2 − 0,45 + 0,05 = 0,8.", "P(ninguno) = P((A ∪ B ∪ C)ᶜ) = 1 − 0,8 = 0,2."],
      resultado: "P(A ∪ B ∪ C) = 0,8 · P(ninguno) = 0,2" },
    { id: "p34", nivel: 3,
      enunciado: "Una fábrica tiene tres máquinas: M₁ produce el 50 % de las piezas con un 1 % de defectuosas; M₂, el 30 % con un 4 %; M₃, el 20 % con un 5 %. Calcula la probabilidad de que una pieza sea defectuosa y, si lo es, la probabilidad de que proceda de M₂.",
      check: [{ tipo: "num", etiqueta: "P(defectuosa) =", valor: 0.027 }, { tipo: "num", etiqueta: "P(M₂ | defectuosa) =", valor: 12 / 27 }],
      pistas: ["Probabilidad total con los tres caminos y luego Bayes."],
      pasos: ["P(D) = 0,5·0,01 + 0,3·0,04 + 0,2·0,05 = 0,005 + 0,012 + 0,010 = 0,027.", "P(M₂ | D) = 0,012/0,027 = 12/27 = 4/9 ≈ 0,4444."],
      resultado: "P(D) = 0,027 · P(M₂ | D) = 4/9 ≈ 0,4444" },
    { id: "p35", nivel: 3,
      enunciado: "Una enfermedad afecta al 2 % de la población. Un test da positivo en el 90 % de los enfermos y en el 4 % de los sanos. Calcula la probabilidad de dar positivo y la de estar enfermo si el test es positivo.",
      check: [{ tipo: "num", etiqueta: "P(positivo) =", valor: 0.0572 }, { tipo: "num", etiqueta: "P(enfermo | positivo) =", valor: 0.018 / 0.0572 }],
      pistas: ["Árbol: enfermo (0,02) / sano (0,98); después positivo con 0,90 o 0,04."],
      pasos: ["P(+) = 0,02·0,90 + 0,98·0,04 = 0,018 + 0,0392 = 0,0572.", "P(E | +) = 0,018/0,0572 ≈ 0,3147: sólo un 31 % de los positivos están enfermos."],
      resultado: "P(+) = 0,0572 · P(E | +) ≈ 0,3147" },
    { id: "p36", nivel: 3,
      enunciado: "Se lanza un dado n veces. (a) Calcula la probabilidad de obtener al menos un 6 en 10 lanzamientos. (b) ¿Cuál es el menor número de lanzamientos para que esa probabilidad supere 0,95?",
      check: [{ tipo: "num", etiqueta: "(a) P =", valor: 0.8385 }, { tipo: "num", etiqueta: "(b) n =", valor: 17 }],
      pistas: ["P(al menos un 6) = 1 − (5/6)ⁿ.", "Para (b), resuelve (5/6)ⁿ &lt; 0,05 con logaritmos."],
      pasos: ["(a) 1 − (5/6)¹⁰ = 1 − 0,1615 = 0,8385.", "(b) 1 − (5/6)ⁿ &gt; 0,95 ⟺ (5/6)ⁿ &lt; 0,05 ⟺ n &gt; ln 0,05/ln(5/6) = (−2,9957)/(−0,18232) = 16,43.", "Luego n = 17 (con n = 16 se tiene 0,9459 y con n = 17, 0,9549)."],
      resultado: "(a) 0,8385 · (b) n = 17" },
    { id: "p37", nivel: 3,
      enunciado: "En una caja hay 12 bombillas, 4 defectuosas. Se eligen 3 al azar sin reposición. ¿Probabilidad de que exactamente 2 sean defectuosas?",
      check: { tipo: "num", etiqueta: "P =", valor: 12 / 55 },
      pistas: ["Hipergeométrica: C(4, 2)·C(8, 1)/C(12, 3)."],
      pasos: ["Favorables: C(4, 2)·C(8, 1) = 6·8 = 48. Posibles: C(12, 3) = 220.", "P = 48/220 = 12/55 ≈ 0,2182."],
      resultado: "P = 12/55 ≈ 0,2182" },
    { id: "p38", nivel: 3,
      enunciado: "Variante de Monty Hall con 4 puertas (un coche, tres cabras): eliges una; el presentador, que sabe dónde está el coche, abre una de las otras con cabra y te permite cambiar a una de las otras dos puertas cerradas (la eliges al azar). Calcula la probabilidad de ganar si te quedas y si cambias.",
      check: [{ tipo: "num", etiqueta: "Quedándote =", valor: 0.25 }, { tipo: "num", etiqueta: "Cambiando =", valor: 0.375 }],
      pistas: ["Si tu primera elección era errónea (3/4), el coche está en una de las dos puertas cerradas restantes."],
      pasos: ["Quedarse: ganas si acertaste al principio: 1/4.", "Cambiar: sólo ganas si te habías equivocado (3/4) <b>y</b> eliges, entre las 2 puertas cerradas restantes, la del coche (1/2): 3/4·1/2 = 3/8 = 0,375.", "Cambiar sigue siendo mejor (0,375 &gt; 0,25), aunque menos que en el problema de 3 puertas (2/3 frente a 1/3)."],
      resultado: "Quedarse: 1/4 · Cambiar: 3/8" },
    { id: "p39", nivel: 3,
      enunciado: "Una familia tiene tres hijos y se sabe que al menos dos son chicas. Suponiendo que chico y chica son igual de probables, ¿cuál es la probabilidad de que los tres sean chicas?",
      check: { tipo: "num", etiqueta: "P =", valor: 0.25 },
      pistas: ["Escribe los 8 resultados y conserva sólo los que cumplen la condición."],
      pasos: ["Con al menos dos chicas: CCC, CCO, COC, OCC → 4 casos equiprobables.", "Los tres chicas: CCC → 1 caso. P = 1/4 = 0,25.", "(Por la fórmula: P(CCC)/P(al menos 2) = (1/8)/(4/8) = 1/4.)"],
      resultado: "P = 1/4" },
    { id: "p40", nivel: 3,
      enunciado: "Si P(A) = 0,7 y P(B) = 0,5, ¿entre qué valores puede estar P(A ∩ B)? Escribe el mínimo y el máximo, separados por comas.",
      check: { tipo: "lista", etiqueta: "mínimo, máximo:", valores: [0.2, 0.5], ph: "dos valores" },
      pistas: ["Cota inferior: P(A) + P(B) − 1. Cota superior: el menor de P(A) y P(B)."],
      pasos: ["Como P(A ∪ B) ≤ 1: P(A ∩ B) = P(A) + P(B) − P(A ∪ B) ≥ 0,7 + 0,5 − 1 = 0,2.", "Como A ∩ B ⊂ B: P(A ∩ B) ≤ 0,5.", "Por tanto 0,2 ≤ P(A ∩ B) ≤ 0,5."],
      resultado: "0,2 ≤ P(A ∩ B) ≤ 0,5" },
    { id: "p41", nivel: 3,
      enunciado: "Una moneda trucada sale cara con probabilidad 0,6. Se lanza 8 veces. Sea X el número de caras. Calcula P(X ≥ 7) y la media de X.",
      check: [{ tipo: "num", etiqueta: "P(X ≥ 7) =", valor: 0.1064 }, { tipo: "num", etiqueta: "μ =", valor: 4.8 }],
      pistas: ["X ~ B(8; 0,6). P(X ≥ 7) = P(X = 7) + P(X = 8)."],
      pasos: ["P(X = 7) = C(8, 7)·0,6⁷·0,4 = 8·0,0279936·0,4 = 0,08958.", "P(X = 8) = 0,6⁸ = 0,01680.", "P(X ≥ 7) = 0,08958 + 0,01680 = 0,1064. Media μ = n·p = 8·0,6 = 4,8."],
      resultado: "P(X ≥ 7) ≈ 0,1064 · μ = 4,8" },
    { id: "p42", nivel: 3,
      enunciado: "Se sabe que P(A) = 0,4, P(B | A) = 0,5 y P(B | Ā) = 0,2. Calcula P(B) y P(A | B), y decide si A y B son independientes.",
      check: [{ tipo: "num", etiqueta: "P(B) =", valor: 0.32 }, { tipo: "num", etiqueta: "P(A | B) =", valor: 0.625 }, { tipo: "opcion", etiqueta: "¿Independientes?", opciones: ["Sí", "No"], ok: 1 }],
      pistas: ["Probabilidad total y Bayes. Independientes ⟺ P(B | A) = P(B)."],
      pasos: ["P(B) = 0,4·0,5 + 0,6·0,2 = 0,20 + 0,12 = 0,32.", "P(A | B) = 0,20/0,32 = 0,625.", "P(B | A) = 0,5 ≠ 0,32 = P(B) (también P(A | B) = 0,625 ≠ 0,4 = P(A)): <b>no son independientes</b>."],
      resultado: "P(B) = 0,32 · P(A | B) = 0,625 · dependientes" },
    { id: "p43", nivel: 3,
      enunciado: "Demuestra que si A y B son independientes, entonces A y B̄ también lo son.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe A = (A ∩ B) ∪ (A ∩ B̄), con los dos trozos incompatibles, y deduce P(A ∩ B̄) = P(A) − P(A ∩ B)", p: 0.5 },
        { t: "Usa la independencia: P(A ∩ B) = P(A)·P(B)", p: 0.5 },
        { t: "Saca factor común: P(A)·(1 − P(B))", p: 0.5 },
        { t: "Concluye con 1 − P(B) = P(B̄): P(A ∩ B̄) = P(A)·P(B̄)", p: 0.5 }
      ] },
      pasos: ["A = (A ∩ B) ∪ (A ∩ B̄) con trozos incompatibles ⟹ P(A ∩ B̄) = P(A) − P(A ∩ B).", "Por independencia, P(A ∩ B) = P(A)P(B): P(A ∩ B̄) = P(A) − P(A)P(B) = P(A)(1 − P(B)).", "Como 1 − P(B) = P(B̄): P(A ∩ B̄) = P(A)·P(B̄). ∎"],
      resultado: "A y B̄ son independientes" },
    { id: "p44", nivel: 3,
      enunciado: "Una caja tiene tres monedas: una normal (cara y cruz), una con dos caras y una con dos cruces. Se elige una al azar y se lanza. Calcula la probabilidad de que salga cara y, si ha salido cara, la de que la moneda elegida sea la de dos caras.",
      check: [{ tipo: "num", etiqueta: "P(cara) =", valor: 0.5 }, { tipo: "num", etiqueta: "P(dos caras | cara) =", valor: 2 / 3 }],
      pistas: ["Probabilidad total con tres monedas y Bayes. P(cara | normal) = 1/2, P(cara | dos caras) = 1, P(cara | dos cruces) = 0."],
      pasos: ["P(cara) = 1/3·1/2 + 1/3·1 + 1/3·0 = 1/6 + 1/3 = 1/2.", "P(dos caras | cara) = (1/3·1)/(1/2) = 2/3 (no 1/2: la moneda de dos caras «produce» más caras)."],
      resultado: "P(cara) = 1/2 · P(dos caras | cara) = 2/3" },
    { id: "p45", nivel: 3,
      enunciado: "Sea X ~ B(4, x), donde x es la probabilidad de éxito en cada prueba. Escribe P(X = 2) como función de x.",
      check: { tipo: "expr", etiqueta: "P(X = 2) =", expr: "6*x^2*(1-x)^2", dom: [0, 1] },
      pistas: ["P(X = k) = C(n, k)·xᵏ·(1 − x)ⁿ⁻ᵏ con n = 4 y k = 2."],
      pasos: ["C(4, 2) = 6.", "P(X = 2) = 6·x²·(1 − x)². Por ejemplo, para x = 0,5 da 6/16 = 0,375."],
      resultado: "P(X = 2) = 6x²(1 − x)²" },
    { id: "p46", nivel: 3,
      enunciado: "Razona si es verdadera o falsa la afirmación: «dos sucesos incompatibles de probabilidad positiva son independientes».",
      check: { tipo: "rubrica", etiqueta: "Tu razonamiento", filas: 6, items: [
        { t: "Escribe la definición de incompatibles: A ∩ B = ∅, luego P(A ∩ B) = 0", p: 0.5 },
        { t: "Escribe la definición de independientes: P(A ∩ B) = P(A)·P(B)", p: 0.5 },
        { t: "Concluye: con P(A) &gt; 0 y P(B) &gt; 0, P(A)·P(B) &gt; 0 ≠ 0 = P(A ∩ B). La afirmación es falsa", p: 0.5 },
        { t: "Interpreta o da un ejemplo (dado: «sale 1» y «sale 2»: P(B | A) = 0 ≠ P(B))", p: 0.5 }
      ] },
      pasos: ["Incompatibles: P(A ∩ B) = 0. Independientes: P(A ∩ B) = P(A)P(B).", "Si P(A), P(B) &gt; 0 el producto es positivo y no puede ser 0: <b>falso</b>.", "Ejemplo: A = «sale 1», B = «sale 2» en un dado: P(A ∩ B) = 0 ≠ 1/36. Saber que ha salido A hace imposible B: dependencia máxima."],
      resultado: "Falso: incompatibles con probabilidad positiva son dependientes" }
  ];

  // ================================================================
  //  LÁMINA (chuleta)
  // ================================================================
  var lamina = [
    { titulo: "Fórmulas de probabilidad", ancha: true,
      tabla: { cab: ["Concepto", "Fórmula"], filas: [
        ["Laplace", "P(A) = casos favorables / casos posibles (equiprobables)"],
        ["Complementario", "P(Ā) = 1 − P(A) · P(∅) = 0 · P(E) = 1"],
        ["Unión", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)"],
        ["Unión de tres", "ΣP(A) − ΣP(A ∩ B) + P(A ∩ B ∩ C)"],
        ["Condicionada", "P(A | B) = P(A ∩ B)/P(B)"],
        ["Producto", "P(A ∩ B) = P(A)·P(B | A)"],
        ["Independientes", "P(A ∩ B) = P(A)·P(B)"],
        ["Total", "P(B) = ΣP(Aᵢ)·P(B | Aᵢ)"],
        ["Bayes", "P(Aᵢ | B) = P(Aᵢ)·P(B | Aᵢ)/P(B)"]
      ] },
      nota: "El «o» es inclusivo: A ∪ B incluye el caso en que ocurren los dos." },
    { titulo: "De frase a símbolos",
      tabla: { cab: ["Frase", "Suceso"], filas: [
        ["al menos uno", "A ∪ B"], ["los dos", "A ∩ B"], ["ninguno", "Ā ∩ B̄ = (A ∪ B)ᶜ"], ["sólo A", "A ∩ B̄ = A − B"],
        ["exactamente uno", "(A ∩ B̄) ∪ (Ā ∩ B)"], ["no los dos", "Ā ∪ B̄ = (A ∩ B)ᶜ"]
      ] },
      nota: "«al menos uno» = 1 − P(ninguno)." },
    { titulo: "De Morgan y propiedades",
      items: [
        { label: "De Morgan 1", formula: "(A ∪ B)ᶜ = Ā ∩ B̄", ejemplo: "no (A o B) = no A y no B" },
        { label: "De Morgan 2", formula: "(A ∩ B)ᶜ = Ā ∪ B̄", ejemplo: "no (A y B) = no A o no B" },
        { label: "Distributiva", formula: "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)" },
        { label: "Sistema completo", formula: "incompatibles dos a dos y A₁ ∪ … ∪ Aₙ = E" }
      ] },
    { titulo: "Laplace: cuándo sí y cuándo no",
      items: [
        { label: "Condición", formula: "casos equiprobables y número finito" },
        { label: "Dos dados", formula: "36 casos · suma 7: 6/36", cuando: "las sumas NO son equiprobables" },
        { label: "Baraja española", formula: "40 cartas · 4 palos · 10 cartas por palo · 12 figuras" },
        { label: "Dos monedas", formula: "{CC, CX, XC, XX}", ojo: "«0, 1 o 2 caras» no son equiprobables: 1/4, 1/2, 1/4." }
      ] },
    { titulo: "Combinatoria",
      tabla: { cab: ["¿Orden?", "¿Repite?", "Fórmula"], filas: [
        ["sí", "no", "V(n, k) = n!/(n − k)!"], ["sí", "sí", "VR = nᵏ"], ["sí (todos)", "no", "P(n) = n!"], ["no", "no", "C(n, k) = n!/(k!(n − k)!)"], ["no", "sí", "CR = C(n + k − 1, k)"]
      ] },
      items: [{ label: "Propiedades", formula: "C(n, k) = C(n, n − k) · C(n, k) = C(n−1, k−1) + C(n−1, k) · ΣC(n, k) = 2ⁿ" }],
      nota: "Pregunta clave: si intercambio dos elementos, ¿es otro resultado?" },
    { titulo: "Condicionada e independencia",
      items: [
        { label: "Reduce el espacio muestral", formula: "P(A | B) = casos de A ∩ B / casos de B" },
        { label: "No es simétrica", formula: "P(A | B) ≠ P(B | A)", ojo: "Test positivo ≠ estar enfermo." },
        { label: "Tres sucesos", formula: "P(A ∩ B ∩ C) = P(A)·P(B | A)·P(C | A ∩ B)" },
        { label: "Independientes", formula: "P(A | B) = P(A) ⟺ P(A ∩ B) = P(A)P(B)", cuando: "Ā y B̄ también son independientes." }
      ] },
    { titulo: "Árbol, total y Bayes",
      pasos: ["Ramas de un nodo: suman 1 (condicionadas en la 2.ª etapa).", "Camino = producto de sus ramas.", "Probabilidad total = suma de los caminos que acaban en B.", "Bayes = camino pedido / probabilidad total.", "Comprueba que las posteriores suman 1."],
      nota: "Tabla de contingencia y árbol contienen la misma información." },
    { titulo: "Tabla de contingencia 2 × 2",
      tabla: { cab: ["", "B", "B̄", "Total"], filas: [["A", "A∩B", "A∩B̄", "P(A)"], ["Ā", "Ā∩B", "Ā∩B̄", "P(Ā)"], ["Total", "P(B)", "P(B̄)", "1"]] },
      items: [{ label: "Condicionada", formula: "P(A | B) = casilla / total de la columna B" }, { label: "Independencia", formula: "casilla = total fila · total columna / total" }] },
    { titulo: "Incompatibles ≠ independientes",
      tabla: { cab: ["", "Incompatibles", "Independientes"], filas: [["Definición", "A ∩ B = ∅", "P(A ∩ B) = P(A)P(B)"], ["P(A ∩ B)", "0", "P(A)·P(B)"], ["P(A ∪ B)", "P(A) + P(B)", "P(A) + P(B) − P(A)P(B)"]] },
      nota: "Incompatibles con P &gt; 0 ⟹ dependientes. Contrarios ⟹ incompatibles (no al revés)." },
    { titulo: "Distribución binomial",
      items: [
        { label: "Modelo", formula: "n pruebas independientes, éxito con probabilidad p constante" },
        { label: "Probabilidad", formula: "P(X = k) = C(n, k)·pᵏ·(1 − p)ⁿ⁻ᵏ" },
        { label: "Media y varianza", formula: "μ = np · σ² = np(1 − p)" }
      ],
      nota: "Sin reposición y poblaciones pequeñas: hipergeométrica." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "P(A ∪ B) = P(A) + P(B) sin más", bien: "Restar P(A ∩ B) si no son incompatibles", por: "Se cuenta dos veces la intersección." },
        { mal: "Incompatibles ⇒ independientes", bien: "Incompatibles con P &gt; 0 son dependientes", por: "Si ocurre A, B no puede ocurrir." },
        { mal: "Dos casos ⇒ probabilidad 1/2", bien: "Laplace exige equiprobabilidad", por: "«Llueve / no llueve»; sumas de dos dados." },
        { mal: "P(A | B) = P(B | A)", bien: "P(A | B) = P(B | A)·P(A)/P(B)", por: "Falacia de la tasa base: positivo ≠ enfermo." },
        { mal: "Tras 5 caras, ahora toca cruz", bien: "P(cruz) sigue siendo 1/2", por: "Falacia del jugador: no hay memoria." },
        { mal: "Sin reposición: 5/8 · 5/8", bien: "5/8 · 4/7", por: "Las extracciones dependen unas de otras." },
        { mal: "Bayes: P(A)·P(B | A)", bien: "Dividir entre P(B)", por: "Falta la probabilidad total." }
      ] }
  ];

  B.registrar("mates1", "t13", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);
