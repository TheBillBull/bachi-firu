/* ============================================================
   Matemáticas II · ampliaciones · Tema 14: Distribuciones de probabilidad
   (parte C: problemas EvAU, resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(n, ref) { return H.w(n, ref && "mates2/t14/" + ref); }
  var nuevas = B.parte.m2t14b.nuevas;

  // ================================================================
  //  SECCIONES FINALES (8 problemas EvAU, 9 errores, 10 autocomprobación)
  // ================================================================
  nuevas.push({
    h: "8. Problemas tipo EvAU resueltos",
    html:
      "<p>Cinco problemas con el formato de la EvAU de Madrid (con la tabla N(0,1) a la vista). Intenta los apartados antes de leer la solución.</p>" +
      ejemplo("Problema 1 · Normal con enunciado", "El peso de los paquetes de arroz de una marca sigue N(1000; 20) g. (a) Probabilidad de que un paquete pese menos de 970 g. (b) Probabilidad de que pese entre 990 y 1 030 g. (c) Peso por encima del cual está el 2,5 % de los paquetes más pesados. (d) De 500 paquetes, ¿cuántos se espera que pesen menos de 970 g?",
        ["X ~ N(1000; 20).",
         "<b>(a)</b> z = (970 − 1000)/20 = −1,5. P(X &lt; 970) = 1 − Φ(1,5) = 1 − 0,9332 = <b>0,0668</b>.",
         "<b>(b)</b> z = −0,5 y z = 1,5. P = Φ(1,5) − Φ(−0,5) = 0,9332 − (1 − 0,6915) = 0,9332 − 0,3085 = <b>0,6247</b>.",
         "<b>(c)</b> P(X ≥ k) = 0,025 ⟹ P(Z ≤ z) = 0,975 ⟹ z = 1,96 ⟹ k = 1000 + 1,96·20 = <b>1 039,2 g</b>.",
         "<b>(d)</b> 500·0,0668 = 33,4 ⟹ <b>≈ 33 paquetes</b>."]) +
      ejemplo("Problema 2 · Binomial", "Un test tiene 6 preguntas con 3 opciones cada una, y un alumno contesta todas al azar. Calcula (a) P(exactamente 2 aciertos); (b) P(al menos un acierto); (c) media y desviación típica del número de aciertos.",
        ["X = nº de aciertos ~ B(6; 1/3): 6 pruebas independientes, éxito = acertar, p = 1/3, q = 2/3.",
         "<b>(a)</b> P(X = 2) = C(6, 2)·(1/3)²·(2/3)⁴ = 15·(1/9)·(16/81) = 240/729 ≈ <b>0,3292</b>.",
         "<b>(b)</b> P(X ≥ 1) = 1 − P(X = 0) = 1 − (2/3)⁶ = 1 − 64/729 = 665/729 ≈ <b>0,9122</b>.",
         "<b>(c)</b> μ = 6·(1/3) = <b>2</b> aciertos; σ = √(6·(1/3)·(2/3)) = √(4/3) ≈ <b>1,155</b>."]) +
      ejemplo("Problema 3 · Variable discreta con incógnita", "La variable X toma los valores 0, 1, 2 y 3 con probabilidades 0,1; k; 2k y 0,3. Halla k, la media, la desviación típica y P(X ≥ 2).",
        ["Suma 1: 0,1 + k + 2k + 0,3 = 1 ⟹ 3k = 0,6 ⟹ <b>k = 0,2</b>. Probabilidades: 0,1; 0,2; 0,4; 0,3.",
         "μ = 0·0,1 + 1·0,2 + 2·0,4 + 3·0,3 = 0,2 + 0,8 + 0,9 = <b>1,9</b>.",
         "E(X²) = 0,2 + 4·0,4 + 9·0,3 = 0,2 + 1,6 + 2,7 = 4,5 ⟹ σ² = 4,5 − 1,9² = 0,89 ⟹ <b>σ ≈ 0,943</b>.",
         "P(X ≥ 2) = 0,4 + 0,3 = <b>0,7</b>."]) +
      ejemplo("Problema 4 · Aproximación por la normal", "El 20 % de los usuarios de una aplicación cancela la suscripción en el primer mes. Entre 225 usuarios nuevos, halla la probabilidad de que cancelen (a) 50 o más; (b) 55 o menos.",
        ["X = nº de cancelaciones ~ B(225; 0,2). n·p = 45 ≥ 5 y n·q = 180 ≥ 5: se aproxima por Y ~ N(45; √(225·0,2·0,8)) = N(45; 6).",
         "<b>(a)</b> P(X ≥ 50) ≈ P(Y ≥ 49,5) = P(Z ≥ 0,75) = 1 − 0,7734 = <b>0,2266</b>.",
         "<b>(b)</b> P(X ≤ 55) ≈ P(Y ≤ 55,5) = P(Z ≤ 1,75) = <b>0,9599</b>.",
         "Sin la corrección de 0,5, el apartado (a) daría P(Z ≥ 0,83) = 0,2033, y se perdería casi 0,02 de probabilidad."]) +
      ejemplo("Problema 5 · Hallar μ y σ", "El tiempo de espera en urgencias sigue una normal. El 84,13 % espera menos de 34 minutos y sólo el 2,28 % espera menos de 22. Halla μ y σ y la probabilidad de esperar más de 36 minutos.",
        ["0,8413 ⟹ z = 1: (34 − μ)/σ = 1. Y 0,0228 = 1 − 0,9772 ⟹ z = −2: (22 − μ)/σ = −2.",
         "Restando las ecuaciones 34 − μ = σ y 22 − μ = −2σ: 12 = 3σ ⟹ <b>σ = 4</b> y μ = 34 − 4 = <b>30</b>.",
         "P(X &gt; 36) = P(Z &gt; (36 − 30)/4) = P(Z &gt; 1,5) = 1 − 0,9332 = <b>0,0668</b>."])
  });
  nuevas.push({
    h: "9. ¿Qué falla aquí? Errores típicos",
    html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
  });
  nuevas.push({
    h: "10. Autocomprobación del tema",
    html: "<p>Test con explicación, tarjetas, emparejar la corrección de continuidad, clasificar situaciones (binomial, normal o ninguna) y el orden de un problema de búsqueda inversa.</p>" +
      w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
  });

  // ================================================================
  //  RESUMEN
  // ================================================================
  var resumen = [
    "<b>Discreta</b>: tabla de P(x); cada P entre 0 y 1 y suma 1 (así se halla la incógnita). μ = Σ x·P; σ² = Σ x²·P − μ²; σ = √σ². Un juego es justo si μ = 0. <b>Continua</b>: la probabilidad es un área, P(X = a) = 0.",
    "<b>Binomial B(n, p)</b>: n pruebas independientes, dos resultados, p constante. P(X = k) = C(n, k)·p<sup>k</sup>·q<sup>n−k</sup>; μ = np; σ = √(npq). «Al menos» y «más de» se resuelven con el complementario; «al menos uno» = 1 − q<sup>n</sup>. Cuidado con ≥ frente a &gt;.",
    "<b>Normal N(μ, σ)</b>: campana simétrica; 68 – 95 – 99,7 % a 1, 2 y 3σ. Tipificar: Z = (X − μ)/σ ~ N(0, 1).",
    "<b>Tabla N(0,1)</b>: da Φ(z) = P(Z ≤ z) para z ≥ 0. P(Z ≥ a) = 1 − Φ(a); P(Z ≤ −a) = 1 − Φ(a); P(a ≤ Z ≤ b) = Φ(b) − Φ(a); P(|Z| ≤ a) = 2Φ(a) − 1. Se dibuja la campana siempre.",
    "<b>Búsqueda inversa</b>: porcentaje → P(Z ≤ z) → z en el cuerpo de la tabla → k = μ + zσ. Z clave: 1,28 (90 %), 1,645 (95 %), 1,96 (97,5 % unilateral; 95 % central), 2,33 (99 %), 2,575 (99 % central).",
    "<b>Parámetros desconocidos</b>: tipificar con la incógnita e igualar a z; con dos datos sale un sistema lineal.",
    "<b>Binomial → normal</b>: si n·p ≥ 5 y n·q ≥ 5, B(n, p) ≈ N(np, √npq). <b>Corrección de continuidad</b>: P(X ≤ k) → P(Y ≤ k + 0,5); P(X ≥ k) → P(Y ≥ k − 0,5); P(X = k) → P(k − 0,5 ≤ Y ≤ k + 0,5).",
    "<b>Decidir</b>: se cuenta → binomial; se mide con «sigue una normal» → normal; binomial con n grande → normal con corrección; a veces la normal da la p de una binomial."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«X ~ B(10; 0,3). P(X ≥ 3) = 1 − P(X ≤ 3)». ¿Qué falla?",
          op: ["Nada, está bien", "El complementario de X ≥ 3 es X ≤ 2: 1 − P(X ≤ 2)", "Hay que usar la media 3", "Se debe usar la normal"], ok: 1,
          porque: "Los valores 0, 1, 2 son los que NO cumplen X ≥ 3. Si se resta P(X ≤ 3) se está quitando también P(X = 3), que sí se quería." },
        { q: "«X ~ N(70; 8). P(X ≤ 62) = P(Z ≤ (62 − 70)/8) = P(Z ≤ −1)» y se lee 0,8413 en la tabla. ¿Qué falla?",
          op: ["Nada", "Con z negativa hay que pasar a positiva por simetría: P(Z ≤ −1) = 1 − 0,8413 = 0,1587", "El valor 0,8413 no existe", "Hay que dividir entre σ²"], ok: 1,
          porque: "La tabla da Φ(1) = 0,8413, el área hasta +1. El área hasta −1 es el resto simétrico: 0,1587. Una probabilidad por debajo de la media debe ser menor que 0,5." },
        { q: "«Se lanza una moneda 100 veces. P(X ≤ 55) ≈ P(Y ≤ 55), con Y ~ N(50; 5), da 0,8413». ¿Qué falla?",
          op: ["Nada", "Falta la corrección de continuidad: P(Y ≤ 55,5) = 0,8643", "La normal no se puede usar aquí", "σ debería ser 25"], ok: 1,
          porque: "La barra del 55 llega hasta 55,5: sin la corrección se pierde media barra. La condición n·p = 50 ≥ 5 sí permite la aproximación." },
        { q: "«B(100; 0,02) se aproxima por N(2; 1,4) porque n = 100 es grande». ¿Qué falla?",
          op: ["Nada", "n·p = 2 &lt; 5: la binomial es muy asimétrica y la normal no sirve", "σ está mal calculada", "La normal necesita n ≥ 1 000"], ok: 1,
          porque: "El tamaño de n no basta: hace falta también que n·p y n·q sean ≥ 5. Con p = 0,02 casi toda la probabilidad se concentra en 0, 1, 2, 3, 4." },
        { q: "«Hay un 95 % de probabilidad de que la nota esté en [μ − 3σ, μ + 3σ]». ¿Qué falla?",
          op: ["Nada", "El 95 % corresponde a μ ± 1,96σ (≈ 2σ); μ ± 3σ contiene el 99,7 %", "Hay que sumar 0,5", "El intervalo debería ser [μ, μ + 3σ]"], ok: 1,
          porque: "Regla 68-95-99,7: 1σ → 68 %; 2σ → 95 %; 3σ → 99,7 %." },
        { q: "«Se sacan 3 bolas SIN reemplazamiento de una urna con 4 rojas y 6 blancas; X = nº de rojas ~ B(3; 0,4)». ¿Qué falla?",
          op: ["Nada", "Sin reemplazamiento la probabilidad de rojo cambia en cada extracción: las pruebas no son independientes y no es binomial", "n debería ser 10", "p debería ser 0,6"], ok: 1,
          porque: "Es una hipergeométrica. Con reemplazamiento (o una población enorme) sí sería B(3; 0,4)." }
      ]
    },
    quiz1: {
      titulo: "Test de distribuciones de probabilidad",
      preguntas: [
        { q: "En una distribución discreta, ¿qué debe cumplirse siempre?", op: ["Que la media sea un valor posible", "Que las probabilidades sumen 1", "Que todas las probabilidades sean iguales", "Que σ valga 1"], ok: 1, porque: "Es la condición que permite hallar la incógnita de una tabla." },
        { q: "X ~ B(10; 0,5). La media es", op: ["0,5", "5", "2,5", "10"], ok: 1, porque: "μ = n·p = 10·0,5 = 5." },
        { q: "X ~ B(100; 0,5). La desviación típica es", op: ["50", "25", "5", "0,5"], ok: 2, porque: "σ = √(100·0,5·0,5) = √25 = 5." },
        { q: "X ~ B(8; 0,1). P(al menos una) =", op: ["0,1", "8·0,1", "1 − 0,9⁸", "0,9⁸"], ok: 2, porque: "Complementario de «ninguna»: 1 − q<sup>n</sup>." },
        { q: "Z ~ N(0, 1). P(Z ≤ −0,5) =", op: ["0,6915", "−0,6915", "0,3085", "0,5"], ok: 2, porque: "1 − Φ(0,5) = 1 − 0,6915 = 0,3085." },
        { q: "X ~ N(50; 10). P(X ≥ 70) =", op: ["0,9772", "0,0228", "0,9987", "0,0013"], ok: 1, porque: "z = 2: 1 − Φ(2) = 1 − 0,9772 = 0,0228." },
        { q: "X ~ N(μ, σ). Tipificar significa calcular", op: ["(X − μ)·σ", "(X − μ)/σ", "(X − σ)/μ", "X/σ"], ok: 1, porque: "Z = (X − μ)/σ ~ N(0, 1)." },
        { q: "Si P(Z ≤ z) = 0,95, ¿entre qué valores está z según la tabla?", op: ["entre 1,64 y 1,65", "entre 0,95 y 1", "entre 1,95 y 1,96", "entre 0,64 y 0,65"], ok: 0, porque: "Φ(1,64) = 0,9495 y Φ(1,65) = 0,9505: z ≈ 1,645." },
        { q: "Aproximando B(100; 0,5) por la normal, P(X ≤ 60) pasa a ser", op: ["P(Y ≤ 60)", "P(Y ≤ 60,5)", "P(Y ≤ 59,5)", "P(Y ≥ 60,5)"], ok: 1, porque: "Para «≤ k» se incluye la barra entera de k: borde k + 0,5." },
        { q: "¿Cuál de estas condiciones permite aproximar B(n, p) por una normal?", op: ["n ≥ 5", "p = 0,5 siempre", "n·p ≥ 5 y n·q ≥ 5", "n·p·q ≤ 5"], ok: 2, porque: "Con ellas la binomial no es demasiado asimétrica." }
      ]
    },
    tj1: {
      titulo: "Tarjetas del tema 14",
      cartas: [
        { a: "Función de probabilidad", b: "Tabla de P(X = x<sub>i</sub>) con 0 ≤ p<sub>i</sub> ≤ 1 y Σp<sub>i</sub> = 1." },
        { a: "Media y desviación típica de una discreta", b: "μ = Σ x·p; σ² = Σ x²·p − μ²; σ = √σ²." },
        { a: "Juego justo", b: "Ganancia media μ = 0: ni se gana ni se pierde a la larga." },
        { a: "Binomial B(n, p)", b: "n pruebas independientes, dos resultados, p constante. P(X = k) = C(n, k)p<sup>k</sup>q<sup>n−k</sup>." },
        { a: "Media y σ de la binomial", b: "μ = n·p; σ = √(n·p·q), con q = 1 − p." },
        { a: "Al menos uno en n pruebas", b: "P(X ≥ 1) = 1 − q<sup>n</sup>." },
        { a: "Normal N(μ, σ)", b: "Campana simétrica en μ; σ la ensancha o estrecha. 68 – 95 – 99,7 % a 1, 2 y 3σ." },
        { a: "Tipificar", b: "Z = (X − μ)/σ ~ N(0, 1). El área no cambia: P(X ≤ a) = P(Z ≤ (a − μ)/σ)." },
        { a: "Tabla N(0,1): P(Z ≤ −a)", b: "= 1 − Φ(a) por simetría (z negativa → positiva)." },
        { a: "P(a ≤ Z ≤ b) y P(|Z| ≤ a)", b: "Φ(b) − Φ(a) y 2Φ(a) − 1." },
        { a: "Búsqueda inversa", b: "Área → P(Z ≤ z) = área → z en el cuerpo de la tabla → k = μ + z·σ. Si piden P(X ≥ k) se usa 1 − p." },
        { a: "z de uso frecuente", b: "1,28 (90 %) · 1,645 (95 %) · 1,96 (97,5 % ⟹ 95 % central) · 2,33 (99 %) · 2,575 (99,5 % ⟹ 99 % central)." },
        { a: "Aproximación binomial → normal", b: "B(n, p) ≈ N(np, √npq) si n·p ≥ 5 y n·q ≥ 5." },
        { a: "Corrección de continuidad", b: "P(X ≤ k) ≈ P(Y ≤ k + 0,5); P(X ≥ k) ≈ P(Y ≥ k − 0,5); P(X = k) ≈ P(k − 0,5 ≤ Y ≤ k + 0,5)." }
      ]
    },
    empar: {
      titulo: "Corrección de continuidad",
      consigna: "Une cada probabilidad binomial con su traducción a la normal Y (tomando k = 12).",
      pares: [
        ["P(X ≤ 12)", "P(Y ≤ 12,5)"],
        ["P(X ≥ 12)", "P(Y ≥ 11,5)"],
        ["P(X &lt; 12)", "P(Y ≤ 11,5)"],
        ["P(X &gt; 12)", "P(Y ≥ 12,5)"],
        ["P(X = 12)", "P(11,5 ≤ Y ≤ 12,5)"],
        ["P(10 ≤ X ≤ 12)", "P(9,5 ≤ Y ≤ 12,5)"]
      ]
    },
    clas: {
      titulo: "¿Binomial, normal o ninguna?",
      consigna: "Clasifica cada variable según el modelo que le corresponde.",
      categorias: ["Binomial", "Normal (continua)", "Ninguna de las dos"],
      items: [
        { t: "Nº de caras en 20 lanzamientos de una moneda", c: 0 }, { t: "Nº de aciertos al azar en un test de 15 preguntas", c: 0 }, { t: "Nº de piezas defectuosas en un lote de 50 (cada una con prob. 0,02)", c: 0 },
        { t: "Estatura de una persona elegida al azar", c: 1 }, { t: "Peso de un paquete de arroz de 1 kg nominal", c: 1 }, { t: "Tiempo de espera de un autobús (según el enunciado, «sigue una normal»)", c: 1 },
        { t: "Nº de lanzamientos hasta que sale la primera cara", c: 2 }, { t: "Nº de bolas rojas al sacar 3 sin reemplazamiento de una urna de 10", c: 2 }, { t: "Nº de lluvias consecutivas si cada día depende del anterior", c: 2 }
      ]
    },
    orden: {
      titulo: "Problema de búsqueda inversa",
      consigna: "Ordena los pasos para hallar el valor k tal que P(X ≥ k) = 0,10 con X ~ N(70; 8).",
      items: [
        { t: "Escribir la distribución y dibujar la campana con la zona sombreada" }, { t: "Pasar a «hasta k»: P(X ≤ k) = 1 − 0,10 = 0,90" }, { t: "Tipificar: P(Z ≤ z) = 0,90" },
        { t: "Buscar 0,90 en el cuerpo de la tabla y leer z = 1,28" }, { t: "Destipificar: k = μ + z·σ = 70 + 1,28·8" }, { t: "Interpretar: k ≈ 80,24 y comprobar que es mayor que la media" }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS
  // ================================================================
  function num(et, v, o) { var c = { tipo: "num", etiqueta: et, valor: v }; if (o) for (var k in o) c[k] = o[k]; return c; }
  function lista(et, v, ph) { return { tipo: "lista", etiqueta: et, valores: v, ph: ph || "valores separados por comas" }; }
  function opcion(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  function E(id, nivel, enunciado, check, pistas, pasos, resultado) { return { id: id, nivel: nivel, enunciado: enunciado, check: check, pistas: pistas, pasos: pasos, resultado: resultado }; }

  var ejercicios = [
    // ---------- NIVEL 1 ----------
    E("a1", 1, "Una variable X toma los valores 1, 2, 3 y 4 con probabilidades 0,1; 0,2; 0,3 y k. Halla k.", num("k =", 0.4),
      ["Las probabilidades suman 1."], ["0,1 + 0,2 + 0,3 + k = 1 ⟹ k = 0,4."], "k = 0,4"),
    E("a2", 1, "Calcula la media de X con P(0) = 0,1; P(1) = 0,3; P(2) = 0,4; P(3) = 0,2.", num("μ =", 1.7),
      ["μ = Σ x·P(x)."], ["0·0,1 + 1·0,3 + 2·0,4 + 3·0,2 = 0,3 + 0,8 + 0,6 = 1,7."], "μ = 1,7"),
    E("a3", 1, "X ~ B(6; 0,5). Calcula P(X = 3).", num("P(X = 3) =", 0.3125),
      ["C(6, 3) = 20."], ["P = 20·0,5³·0,5³ = 20/64 = 0,3125."], "0,3125"),
    E("a4", 1, "Halla la desviación típica de X ~ B(8; 0,25).", num("σ =", 1.2247),
      ["σ = √(n·p·q)."], ["σ = √(8·0,25·0,75) = √1,5 ≈ 1,2247."], "σ ≈ 1,225"),
    E("a5", 1, "X ~ B(5; 0,4). Calcula la probabilidad de que no haya ningún éxito.", num("P(X = 0) =", 0.07776),
      ["P(X = 0) = q<sup>n</sup>."], ["0,6⁵ = 0,07776."], "0,0778"),
    E("a6", 1, "X ~ N(100; 15). Tipifica x = 130 (calcula z).", num("z =", 2),
      ["z = (x − μ)/σ."], ["(130 − 100)/15 = 2."], "z = 2"),
    E("a7", 1, "Z ~ N(0, 1). Con la tabla, calcula P(Z ≤ 1,35).", num("P =", 0.9115, { tol: 0.002 }),
      ["Fila 1,3 y columna 0,05."], ["Se lee directamente: Φ(1,35) = 0,9115."], "0,9115"),
    E("a8", 1, "Z ~ N(0, 1). Calcula P(Z ≥ 1,35).", num("P =", 0.0885, { tol: 0.01 }),
      ["Complementario."], ["1 − 0,9115 = 0,0885."], "0,0885"),
    E("a9", 1, "Z ~ N(0, 1). Calcula P(Z ≤ −0,8).", num("P =", 0.2119, { tol: 0.005 }),
      ["Simetría: P(Z ≤ −a) = 1 − Φ(a)."], ["Φ(0,8) = 0,7881; 1 − 0,7881 = 0,2119."], "0,2119"),
    E("a10", 1, "Z ~ N(0, 1). Calcula P(−1 ≤ Z ≤ 1).", num("P =", 0.6826, { tol: 0.002 }),
      ["2Φ(1) − 1."], ["2·0,8413 − 1 = 0,6826."], "0,6826"),
    E("a11", 1, "X ~ N(50; 10). Calcula P(X ≤ 65).", num("P =", 0.9332, { tol: 0.002 }),
      ["Tipifica: z = 1,5."], ["P(Z ≤ 1,5) = 0,9332."], "0,9332"),
    E("a12", 1, "Se lanzan 5 monedas. ¿Probabilidad de obtener al menos una cara?", num("P =", 0.96875),
      ["Complementario de «ninguna cara»."], ["1 − 0,5⁵ = 1 − 1/32 = 31/32 = 0,96875."], "31/32 ≈ 0,969"),
    E("a13", 1, "¿Se puede aproximar B(20; 0,1) por una normal?", opcion("Respuesta", ["Sí, porque n = 20 es grande", "No: n·p = 2 &lt; 5", "Sí, porque p &lt; 0,5", "No: n·q &lt; 5"], 1),
      ["Calcula n·p y n·q."], ["n·p = 20·0,1 = 2 &lt; 5: no se cumple la condición."], "No: n·p = 2"),
    E("a14", 1, "Una binomial B(100; 0,2) se aproxima por una normal. Da sus parámetros μ y σ (en ese orden).", lista("μ, σ", [20, 4], "20, 4"),
      ["μ = np; σ = √(npq)."], ["μ = 20; σ = √(100·0,2·0,8) = √16 = 4."], "N(20; 4)"),
    // ---------- NIVEL 2 ----------
    E("b1", 2, "X toma los valores 1, 2, 3 y 4 con P(X = x) = k·x. Calcula k y después la media.", num("μ =", 3),
      ["Suma = 10k = 1."], ["k = 0,1 y P = 0,1; 0,2; 0,3; 0,4.", "μ = 0,1 + 0,4 + 0,9 + 1,6 = 3."], "k = 0,1; μ = 3"),
    E("b2", 2, "Halla la desviación típica de X con P(0) = 0,1; P(1) = 0,3; P(2) = 0,4; P(3) = 0,2.", num("σ =", 0.9),
      ["Usa E(X²) − μ²; μ = 1,7."], ["E(X²) = 0,3 + 1,6 + 1,8 = 3,7.", "σ² = 3,7 − 1,7² = 0,81 ⟹ σ = 0,9."], "σ = 0,9"),
    E("b3", 2, "X ~ B(10; 0,3). Calcula P(X ≥ 3).", num("P =", 0.6172, { tol: 0.005 }),
      ["1 − P(X ≤ 2)."], ["P(0) = 0,0282; P(1) = 0,1211; P(2) = 0,2335; suma = 0,3828.", "1 − 0,3828 = 0,6172."], "0,6172"),
    E("b4", 2, "Un test de 10 preguntas con 4 opciones se contesta al azar. ¿Probabilidad de acertar 5 o más?", num("P =", 0.0781, { tol: 0.01 }),
      ["X ~ B(10; 0,25); 1 − P(X ≤ 4)."], ["P(X ≤ 4) = 0,9219.", "P(X ≥ 5) = 0,0781."], "0,0781"),
    E("b5", 2, "El 10 % de las piezas de un lote es defectuoso. Se eligen 8 piezas. ¿Probabilidad de que al menos una sea defectuosa?", num("P =", 0.5695, { tol: 0.005 }),
      ["X ~ B(8; 0,1)."], ["1 − 0,9⁸ = 1 − 0,4305 = 0,5695."], "0,5695"),
    E("b6", 2, "El peso X sigue N(70; 8). Calcula P(X &gt; 80).", num("P =", 0.1056, { tol: 0.01 }),
      ["z = 1,25."], ["1 − Φ(1,25) = 1 − 0,8944 = 0,1056."], "0,1056"),
    E("b7", 2, "Con X ~ N(70; 8), calcula P(66 ≤ X ≤ 86).", num("P =", 0.6687, { tol: 0.005 }),
      ["z = −0,5 y z = 2."], ["Φ(2) − Φ(−0,5) = 0,9772 − (1 − 0,6915) = 0,9772 − 0,3085 = 0,6687."], "0,6687"),
    E("b8", 2, "Las notas siguen N(6; 1,5). Calcula P(X &lt; 4,5).", num("P =", 0.1587, { tol: 0.005 }),
      ["z = −1."], ["P(Z &lt; −1) = 1 − 0,8413 = 0,1587."], "0,1587"),
    E("b9", 2, "El tiempo de una gestión sigue N(25; 4) minutos. Calcula P(X ≥ 31).", num("P =", 0.0668, { tol: 0.01 }),
      ["z = 1,5."], ["1 − 0,9332 = 0,0668."], "0,0668"),
    E("b10", 2, "Z ~ N(0, 1). Halla k tal que P(Z ≤ k) = 0,90.", num("k =", 1.28, { tol: 0.01 }),
      ["Busca 0,90 en el cuerpo de la tabla."], ["El valor más cercano es 0,8997 ⟹ z = 1,28."], "k ≈ 1,28"),
    E("b11", 2, "El tiempo de espera sigue N(25; 4). ¿A partir de qué tiempo k se está entre el 20 % de las esperas más largas?", num("k =", 28.36, { tol: 0.005 }),
      ["P(X ≥ k) = 0,20 ⟹ P(X ≤ k) = 0,80."], ["Φ(z) = 0,80: valor más cercano 0,7995 ⟹ z = 0,84.", "k = 25 + 0,84·4 = 28,36."], "k ≈ 28,36 min"),
    E("b12", 2, "X ~ B(100; 0,5). Aproxima por la normal P(X ≤ 42) (con corrección de continuidad).", num("P ≈", 0.0668, { tol: 0.01 }),
      ["N(50; 5) y P(Y ≤ 42,5)."], ["z = (42,5 − 50)/5 = −1,5.", "P = 1 − 0,9332 = 0,0668."], "0,0668"),
    E("b13", 2, "X ~ B(100; 0,5). Aproxima P(X = 55) por la normal.", num("P ≈", 0.0484, { tol: 0.02 }),
      ["P(54,5 ≤ Y ≤ 55,5) con N(50; 5)."], ["z entre 0,9 y 1,1.", "Φ(1,1) − Φ(0,9) = 0,8643 − 0,8159 = 0,0484."], "0,0484"),
    E("b14", 2, "Las notas siguen N(5,9; 1,5). ¿Qué proporción de alumnos aprueba (nota ≥ 5)?", num("P =", 0.7257, { tol: 0.005 }),
      ["z = (5 − 5,9)/1,5 = −0,6."], ["P(Z ≥ −0,6) = Φ(0,6) = 0,7257."], "72,57 %"),
    E("b15", 2, "X ~ N(50; σ) y P(X ≥ 62) = 0,0228. Halla σ.", num("σ =", 6),
      ["P(Z ≥ z) = 0,0228 ⟹ Φ(z) = 0,9772."], ["z = 2: (62 − 50)/σ = 2 ⟹ σ = 6."], "σ = 6"),
    E("b16", 2, "X ~ N(μ; 5) y P(X ≥ 30) = 0,0228. Halla μ.", num("μ =", 20),
      ["Φ(z) = 0,9772 ⟹ z = 2."], ["(30 − μ)/5 = 2 ⟹ μ = 20."], "μ = 20"),
    // ---------- NIVEL 3 ----------
    E("c1", 3, "¿Cuántas veces hay que lanzar una moneda, como mínimo, para que la probabilidad de obtener al menos una cara sea ≥ 0,99?", num("n =", 7),
      ["1 − 0,5<sup>n</sup> ≥ 0,99."], ["0,5<sup>n</sup> ≤ 0,01. Con n = 6: 0,0156 (no); con n = 7: 0,0078 (sí).", "n = 7."], "n = 7"),
    E("c2", 3, "Un arquero acierta con probabilidad 0,7. Hace 5 disparos. ¿Probabilidad de acertar entre 2 y 4 veces (ambos incluidos)?", num("P =", 0.8012, { tol: 0.005 }),
      ["X ~ B(5; 0,7); 1 − P(0, 1) − P(5)."], ["P(0) = 0,00243; P(1) = 0,02835; P(5) = 0,16807.", "1 − 0,19885 = 0,80115 ≈ 0,8012."], "0,8012"),
    E("c3", 3, "Se lanza un dado: con un 6 se ganan 6 €, con un 5 se ganan 2 € y en otro caso se pierde 1 €. Calcula la ganancia media por partida.", num("μ =", 2 / 3),
      ["Valores: 6, 2, −1 con probabilidades 1/6, 1/6, 4/6."], ["μ = 6/6 + 2/6 − 4/6 = 4/6 = 2/3 ≈ 0,667 €."], "μ = 2/3 €"),
    E("c4", 3, "Se lanzan dos dados y X es la suma. Calcula P(X ≥ 10).", num("P =", 1 / 6),
      ["Casos: 10 (3), 11 (2), 12 (1)."], ["6 casos favorables entre 36: 1/6 ≈ 0,1667."], "1/6"),
    E("c5", 3, "Se lanzan dos dados y X es la suma (μ = 7). Calcula la desviación típica.", num("σ =", 2.4152, { tol: 0.005 }),
      ["E(X²) = 54,833…"], ["E(X²) = (4·1 + 9·2 + 16·3 + 25·4 + 36·5 + 49·6 + 64·5 + 81·4 + 100·3 + 121·2 + 144·1)/36 = 1974/36 = 54,833.", "σ² = 54,833 − 49 = 5,833 = 35/6 ⟹ σ ≈ 2,415."], "σ ≈ 2,415"),
    E("c6", 3, "La altura sigue N(172; 7) cm. Calcula P(165 ≤ X ≤ 186).", num("P =", 0.8185, { tol: 0.005 }),
      ["z = −1 y z = 2."], ["Φ(2) − Φ(−1) = 0,9772 − 0,1587 = 0,8185."], "0,8185"),
    E("c7", 3, "Con la altura N(172; 7) cm, ¿cuántas de 1 000 personas se espera que midan más de 179 cm?", num("Personas ≈", 158.7, { tol: 0.01 }),
      ["z = 1."], ["P(X &gt; 179) = 1 − 0,8413 = 0,1587; 1 000·0,1587 = 158,7."], "≈ 159 personas"),
    E("c8", 3, "Las puntuaciones siguen N(250; 20). Halla el extremo superior del intervalo simétrico respecto de la media que contiene al 95 % de las personas.", num("Extremo =", 289.2, { tol: 0.002 }),
      ["P(Z ≤ z) = 0,975 ⟹ z = 1,96."], ["250 + 1,96·20 = 289,2 (el inferior es 210,8)."], "289,2"),
    E("c9", 3, "Las notas siguen N(6; 1,5). ¿Qué nota mínima hay que sacar para estar entre el 15 % mejor?", num("k =", 7.56, { tol: 0.005 }),
      ["P(X ≥ k) = 0,15 ⟹ P(Z ≤ z) = 0,85."], ["Valor más cercano a 0,85: 0,8508 ⟹ z = 1,04.", "k = 6 + 1,04·1,5 = 7,56."], "k ≈ 7,56"),
    E("c10", 3, "X ~ B(625; 0,2). Aproxima P(X ≥ 145) con la corrección de continuidad.", num("P ≈", 0.0256, { tol: 0.02 }),
      ["N(125; 10); P(Y ≥ 144,5)."], ["z = 19,5/10 = 1,95.", "1 − Φ(1,95) = 1 − 0,9744 = 0,0256."], "0,0256"),
    E("c11", 3, "X ~ B(625; 0,2). Aproxima P(120 ≤ X ≤ 135).", num("P ≈", 0.5619, { tol: 0.01 }),
      ["P(119,5 ≤ Y ≤ 135,5) con N(125; 10)."], ["z = −0,55 y z = 1,05.", "Φ(1,05) − (1 − Φ(0,55)) = 0,8531 − 0,2912 = 0,5619."], "0,5619"),
    E("c12", 3, "Se lanza 100 veces una moneda. Aproxima la probabilidad de obtener 60 caras o más.", num("P ≈", 0.0287, { tol: 0.02 }),
      ["N(50; 5); P(Y ≥ 59,5)."], ["z = 9,5/5 = 1,9.", "1 − Φ(1,9) = 1 − 0,9713 = 0,0287."], "0,0287"),
    E("c13", 3, "X es normal con P(X ≤ 80) = 0,9772 y P(X ≤ 56) = 0,1587. Halla μ.", num("μ =", 64),
      ["z = 2 y z = −1."], ["80 − μ = 2σ y 56 − μ = −σ ⟹ 24 = 3σ, σ = 8, μ = 64."], "μ = 64 (σ = 8)"),
    E("c14", 3, "La altura sigue N(172; 7). Se eligen 5 personas. ¿Probabilidad de que al menos una mida más de 179 cm?", num("P =", 0.5785, { tol: 0.005 }),
      ["p = P(X &gt; 179) = 0,1587; luego binomial B(5; p)."], ["1 − (1 − 0,1587)⁵ = 1 − 0,8413⁵ = 1 − 0,4215 = 0,5785."], "0,5785"),
    E("c15", 3, "Una aseguradora cobra 100 € de prima y paga 5 000 € con probabilidad 0,01. Calcula el beneficio medio por póliza.", num("μ =", 50),
      ["Beneficio: 100 (prob. 0,99) o 100 − 5 000 (prob. 0,01)."], ["μ = 100·0,99 + (−4 900)·0,01 = 99 − 49 = 50 €."], "50 €"),
    E("c16", 3, "Una binomial tiene media 12 y varianza 3. Halla n.", num("n =", 16),
      ["np = 12 y npq = 3."], ["q = 3/12 = 0,25 ⟹ p = 0,75 ⟹ n = 12/0,75 = 16."], "n = 16 (p = 0,75)")
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Binomial: lo esencial", ancha: true,
      tabla: { cab: ["Idea", "Fórmula"], filas: [
        ["Condiciones", "n fijo · dos resultados · p constante · independientes"],
        ["Probabilidad", "P(X = k) = C(n, k)·p<sup>k</sup>·q<sup>n−k</sup>"],
        ["Media y σ", "μ = np · σ = √(npq)"],
        ["Al menos uno", "1 − q<sup>n</sup>"],
        ["Al menos k", "1 − P(X ≤ k − 1)"]
      ] } },
    { titulo: "Normal: de la tabla a la respuesta", ancha: true,
      pasos: ["Escribe X ~ N(μ, σ) y dibuja la campana sombreada.", "Tipifica: z = (x − μ)/σ.", "Reduce a Φ(z) (z positiva; con negativa, simetría).", "P(Z ≥ a) = 1 − Φ(a); P(a ≤ Z ≤ b) = Φ(b) − Φ(a).", "Inverso: del área a z en el cuerpo de la tabla; k = μ + zσ."],
      nota: "Z clave: 1,28 · 1,645 · 1,96 · 2,33 · 2,575." },
    { titulo: "Binomial → normal",
      tabla: { cab: ["Binomial", "Normal Y"], filas: [
        ["Condición", "n·p ≥ 5 y n·q ≥ 5"],
        ["Parámetros", "N(np, √npq)"],
        ["P(X ≤ k)", "P(Y ≤ k + 0,5)"],
        ["P(X ≥ k)", "P(Y ≥ k − 0,5)"],
        ["P(X = k)", "P(k − 0,5 ≤ Y ≤ k + 0,5)"]
      ] },
      nota: "Dibuja las barras para decidir el signo de la corrección." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "P(X ≥ 3) = 1 − P(X ≤ 3)", bien: "1 − P(X ≤ 2)", por: "Hay que dejar fuera el valor frontera." },
        { mal: "P(Z ≤ −a) = Φ(a)", bien: "1 − Φ(a)", por: "Por debajo de la media el área es menor que 0,5." },
        { mal: "Tipificar con (X − μ)·σ", bien: "(X − μ)/σ", por: "σ divide." },
        { mal: "Aproximar sin corrección de continuidad", bien: "k ± 0,5 según las barras", por: "Se pierde media barra y P(X = k) saldría 0." },
        { mal: "Aproximar B(100; 0,02) porque n es grande", bien: "Comprobar n·p ≥ 5 y n·q ≥ 5", por: "Con n·p = 2 la binomial es asimétrica." },
        { mal: "Usar binomial sin reemplazamiento en urna pequeña", bien: "Probabilidad condicionada", por: "p cambia y las pruebas no son independientes." }
      ] }
  ];

  B.registrar("mates2", "t14", {
    resumen: resumen, secciones: B.parte.m2t14a.secciones, nuevas: nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
