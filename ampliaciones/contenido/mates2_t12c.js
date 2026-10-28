/* ============================================================
   Matemáticas II · ampliaciones · Tema 12: Integral definida
   (parte C: problemas EvAU, resumen, actividades, ejercicios, láminas y registro)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(n, ref) { return H.w(n, ref && "mates2/t12/" + ref); }
  var I = B.parte.m2t12a.I;

  var nuevas = B.parte.m2t12b.nuevas;

  // ================================================================
  //  SECCIONES FINALES (10 problemas EvAU, 11 errores, 12 autocomprobación)
  // ================================================================
  nuevas.push({
    h: "10. Problemas tipo EvAU resueltos",
    html:
      "<p>Cinco problemas con el formato de la EvAU de Madrid: intenta los apartados antes de leer la solución.</p>" +
      ejemplo("Problema 1 · Estudiar una función integral", "Sea F(x) = " + I("0", "x") + " (t² − 2t − 3)dt. (a) Calcula F′ y los intervalos de crecimiento y decrecimiento de F. (b) Extremos relativos y su valor. (c) Curvatura e inflexión. (d) Calcula F(x) explícitamente y comprueba (b).",
        ["<b>(a)</b> Por el teorema fundamental, F′(x) = x² − 2x − 3 = (x − 3)(x + 1). F′ &gt; 0 si x &lt; −1 o x &gt; 3 y F′ &lt; 0 en (−1, 3): <b>F crece en (−∞, −1) y (3, +∞), decrece en (−1, 3)</b>.",
         "<b>(b)</b> Máximo relativo en x = −1 y mínimo relativo en x = 3 (F′ cambia de + a − y de − a +).",
         "<b>(c)</b> F″ = 2x − 2 = 0 ⟹ x = 1. Cóncava si x &lt; 1, convexa si x &gt; 1: <b>inflexión en x = 1</b>.",
         "<b>(d)</b> F(x) = x³/3 − x² − 3x (con F(0) = 0). Valores: F(−1) = −1/3 − 1 + 3 = <b>5/3</b> (máximo); F(3) = 9 − 9 − 9 = <b>−9</b> (mínimo); F(1) = 1/3 − 1 − 3 = −11/3 (inflexión). Coincide con lo deducido sin integrar."]) +
      ejemplo("Problema 2 · Área con tres raíces", "Sea f(x) = x³ − 3x² + 2x. Calcula " + I("0", "2") + " f(x)dx y el área limitada por la gráfica de f y el eje X.",
        ["f = x(x − 1)(x − 2): raíces 0, 1 y 2. Signo: + en (0, 1) y − en (1, 2).",
         "F(x) = x⁴/4 − x³ + x². F(0) = 0; F(1) = 1/4 − 1 + 1 = 1/4; F(2) = 4 − 8 + 4 = 0.",
         "Integral: " + I("0", "2") + " f = F(2) − F(0) = <b>0</b>. Trozos: " + I("0", "1") + " f = 1/4 e " + I("1", "2") + " f = −1/4.",
         "<b>Área</b> = |1/4| + |−1/4| = <b>1/2</b>. (Que la integral valga 0 no significa que no haya área: se compensan dos regiones iguales, porque f es simétrica respecto del punto (1, 0).)"]) +
      ejemplo("Problema 3 · Por partes y cambio de signo", "Calcula el área de la región limitada por y = x·eˣ, el eje X y las rectas x = −1 y x = 1.",
        ["Corte con el eje: x·eˣ = 0 ⟹ x = 0 (eˣ nunca se anula). Signo: − en (−1, 0) y + en (0, 1).",
         "Primitiva por partes: u = x, dv = eˣdx ⟹ ∫x eˣ dx = x eˣ − eˣ = (x − 1)eˣ.",
         I("−1", "0") + " = (0 − 1)e⁰ − (−2)e<sup>−1</sup> = −1 + 2/e ≈ −0,264 &nbsp;·&nbsp; " + I("0", "1") + " = 0·e − (−1)e⁰ = 1.",
         "<b>Área</b> = |−1 + 2/e| + 1 = (1 − 2/e) + 1 = <b>2 − 2/e</b> ≈ 1,264. (La integral neta sería 2/e ≈ 0,736: no es el área.)"]) +
      ejemplo("Problema 4 · Valor medio y parámetro", "Sea f(x) = ax² + 1 con a &gt; 0. Se sabe que el valor medio de f en [0, 3] es 7. Halla a y el punto c ∈ [0, 3] donde f toma ese valor medio.",
        ["μ = (1/3)" + I("0", "3") + " (ax² + 1)dx = (1/3)[ax³/3 + x]<sub>0</sub><sup>3</sup> = (1/3)(9a + 3) = 3a + 1.",
         "3a + 1 = 7 ⟹ <b>a = 2</b>.",
         "f(c) = 2c² + 1 = 7 ⟹ c² = 3 ⟹ <b>c = √3</b> ≈ 1,732 (la raíz negativa queda fuera de [0, 3])."]) +
      ejemplo("Problema 5 · Límite con integral", "Calcula lím<sub>x→0</sub> " + I("0", "x") + " ln(1 + t)dt / x² y comprueba el resultado calculando la integral.",
        ["Numerador y denominador tienden a 0: L'Hôpital. Derivada del numerador: ln(1 + x) (teorema fundamental); del denominador: 2x. Queda ln(1 + x)/(2x), otra vez 0/0.",
         "Otra vez L'Hôpital: (1/(1 + x))/2 → <b>1/2</b>.",
         "Comprobación: por partes, " + I("0", "x") + " ln(1 + t)dt = [(1 + t)ln(1 + t) − t]<sub>0</sub><sup>x</sup> = (1 + x)ln(1 + x) − x. Con ln(1 + x) ≈ x − x²/2 + x³/3 resulta ≈ x²/2 − x³/6, y dividido entre x² tiende a 1/2 ✓."])
  });

  nuevas.push({
    h: "11. ¿Qué falla aquí? Errores típicos",
    html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
  });
  nuevas.push({
    h: "12. Autocomprobación del tema",
    html: "<p>Test con explicación, tarjetas, una actividad de emparejar, otra de clasificar el signo de integrales y el orden del área entre curvas.</p>" +
      w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
  });

  // ================================================================
  //  RESUMEN
  // ================================================================
  var resumen = [
    "<b>Definición</b>: " + I("a", "b") + " f = límite de las sumas de Riemann (rectángulos de anchura (b − a)/n). Si f es continua, las sumas inferiores y superiores convergen al mismo número. Es un <b>número</b>, y es el área solo si f ≥ 0.",
    "<b>Propiedades</b>: linealidad; aditividad " + I("a", "b") + " = " + I("a", "c") + " + " + I("c", "b") + "; " + I("b", "a") + " = −" + I("a", "b") + "; " + I("a", "a") + " = 0; |∫f| ≤ ∫|f|; par: 2∫<sub>0</sub><sup>a</sup>; impar: 0.",
    "<b>Barrow</b>: " + I("a", "b") + " f = F(b) − F(a), con F primitiva (sin +C). Paréntesis al restar. Solo si f es continua en [a, b].",
    "<b>Área con cambio de signo</b>: ceros de f dentro de [a, b], un Barrow por trozo y suma de valores absolutos. «Entre la curva y el eje X» sin límites: las raíces consecutivas.",
    "<b>Área entre curvas</b>: esbozo, cortes f = g, quién va encima en cada tramo, ∫(arriba − abajo), suma. Si las curvas se cruzan, el valor absoluto parte la integral. A veces conviene integrar en y.",
    "<b>Teorema fundamental</b>: (" + I("a", "x") + " f)′ = f(x); con extremo g(x): f(g(x))·g′(x); con dos extremos variables: f(g)g′ − f(h)h′. Se estudia F (crecimiento, extremos, curvatura) con F′ y F″ sin integrar.",
    "<b>Valor medio</b>: μ = (1/(b − a))" + I("a", "b") + " f. Teorema: si f es continua existe c con f(c) = μ (puede haber varios).",
    "<b>En la integral definida</b>: el cambio de variable cambia también los límites; por partes: [uv] − ∫v du; valor absoluto y funciones a trozos se parten en sus puntos.",
    "<b>Volumen de revolución</b> (ampliación): V = π" + I("a", "b") + " [f(x)]²dx."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«∫<sub>−1</sub><sup>2</sup> (x³ − x)dx = 9/4, luego el área es 9/4». ¿Qué falla?",
          op: ["Nada, está bien", "f cambia de signo en 0 y 1: hay que partir y sumar valores absolutos; el área es 11/4", "El área es 9/4 − 11/4", "La primitiva es x⁴ − x²"], ok: 1,
          porque: "La integral neta compensa trozos positivos y negativos. Con trozos 1/4, −1/4 y 9/4, la integral vale 9/4 pero el área es 1/4 + 1/4 + 9/4 = 11/4." },
        { q: "«∫<sub>−1</sub><sup>1</sup> dx/x² = [−1/x] entre −1 y 1 = −1 − 1 = −2». ¿Qué falla?",
          op: ["Nada, está bien", "La función no es continua en x = 0 ∈ [−1, 1]: no se puede aplicar Barrow (la integral diverge)", "La primitiva es 1/x", "Debería salir +2"], ok: 1,
          porque: "Barrow exige f continua en todo [a, b]. Además un integrando positivo no puede dar un resultado negativo: señal de alarma." },
        { q: "«Derivada de ∫<sub>0</sub><sup>x²</sup> e<sup>−t</sup> dt es e<sup>−x²</sup>». ¿Qué falla?",
          op: ["Nada, está bien", "Falta multiplicar por la derivada del extremo: es e<sup>−x²</sup>·2x", "Es e<sup>−x</sup>", "Se debe integrar primero"], ok: 1,
          porque: "Regla de la cadena: (∫<sub>0</sub><sup>g(x)</sup> f)′ = f(g(x))·g′(x). Aquí g′ = 2x." },
        { q: "«∫<sub>0</sub><sup>3</sup> (x − 1)dx = [x²/2 − x + C] entre 0 y 3 = 3/2 + C». ¿Qué falla?",
          op: ["Nada, está bien", "En una integral definida no se pone +C: se cancela al restar F(3) − F(0) = 3/2", "La primitiva es x² − x", "Falta dividir entre 3"], ok: 1,
          porque: "(F(3) + C) − (F(0) + C) = F(3) − F(0). El resultado es el número 3/2, sin constante." },
        { q: "«∫<sub>0</sub><sup>2</sup> 2x e<sup>x²</sup> dx: con t = x² queda ∫<sub>0</sub><sup>2</sup> eᵗ dt = e² − 1». ¿Qué falla?",
          op: ["Nada, está bien", "Al cambiar de variable hay que cambiar los límites: x = 2 ⟹ t = 4, y el resultado es e⁴ − 1", "El cambio correcto es t = 2x", "Hay que sumar +C"], ok: 1,
          porque: "En una integral definida los límites pertenecen a la variable: con t = x², van de t = 0 a t = 4. Entonces ∫<sub>0</sub><sup>4</sup> eᵗ dt = e⁴ − 1 (que coincide con [e<sup>x²</sup>] entre 0 y 2)." },
        { q: "«Área entre y = x e y = x³ en [−1, 1] es ∫<sub>−1</sub><sup>1</sup> (x − x³)dx = 0». ¿Qué falla?",
          op: ["Nada, está bien", "Las curvas se cruzan en −1, 0, 1 y cambia cuál va encima: el área es 2·∫<sub>0</sub><sup>1</sup> (x − x³)dx = 1/2", "El área es 1", "No se puede calcular"], ok: 1,
          porque: "Una región con área no puede tener área 0. Hay que tomar valores absolutos de cada tramo (o usar la simetría)." },
        { q: "«El valor medio de f(x) = x² en [0, 3] es ∫<sub>0</sub><sup>3</sup> x²dx = 9». ¿Qué falla?",
          op: ["Nada, está bien", "Falta dividir entre la longitud del intervalo: μ = 9/3 = 3", "Es 9/2", "El valor medio es f(3) = 9"], ok: 1,
          porque: "El valor medio es la integral dividida entre b − a. La integral (9) es el área; μ = 3 es la altura del rectángulo equivalente." },
        { q: "«El teorema del valor medio integral dice que existe un único c con f(c) = μ». ¿Qué falla?",
          op: ["Nada, está bien", "Garantiza al menos uno; por ejemplo, sen x en [0, π] toma el valor medio 2/π en dos puntos", "Solo vale para funciones derivables", "Dice f′(c) = μ"], ok: 1,
          porque: "Es un teorema de existencia: no asegura unicidad. Pide f continua, no derivable." }
      ]
    },
    quiz1: {
      titulo: "Test de integral definida",
      preguntas: [
        { q: "∫<sub>0</sub><sup>2</sup> 3x² dx vale", op: ["4", "8", "12", "6"], ok: 1, porque: "[x³] entre 0 y 2 = 8 − 0 = 8." },
        { q: "Si f(x) &lt; 0 en [a, b], la integral ∫<sub>a</sub><sup>b</sup> f es", op: ["positiva y es el área", "negativa; el área es su valor absoluto", "cero", "no existe"], ok: 1, porque: "Los rectángulos tienen altura negativa; el área es |∫ f|." },
        { q: "∫<sub>−3</sub><sup>3</sup> x⁵ dx vale", op: ["0", "243", "729/3", "−243"], ok: 0, porque: "x⁵ es impar: las contribuciones de −3..0 y 0..3 se anulan." },
        { q: "(d/dx) ∫<sub>1</sub><sup>x</sup> ln(t² + 1) dt =", op: ["ln(x² + 1)", "ln(x² + 1) − ln 2", "2x/(x² + 1)", "0"], ok: 0, porque: "Teorema fundamental: derivar la integral con extremo superior x devuelve el integrando evaluado en x." },
        { q: "(d/dx) ∫<sub>0</sub><sup>x³</sup> sen t dt =", op: ["sen(x³)", "3x² sen(x³)", "−cos(x³)", "3x² cos(x³)"], ok: 1, porque: "f(g(x))·g′(x) con f = sen y g = x³." },
        { q: "Para calcular el área entre f y g hay que", op: ["integrar f − g siempre", "resolver f = g y tomar valor absoluto o decidir quién va encima en cada tramo", "integrar f y g por separado y sumar", "derivar f − g"], ok: 1, porque: "Los cortes parten la región; en cada tramo se integra (arriba − abajo)." },
        { q: "El valor medio de f(x) = x en [0, 4] es", op: ["8", "4", "2", "16"], ok: 2, porque: "∫ x dx = 8, dividido entre 4 = 2." },
        { q: "El área limitada por y = x² − 1 y el eje X es", op: ["2/3", "4/3", "8/3", "−4/3"], ok: 1, porque: "Raíces ±1: ∫<sub>−1</sub><sup>1</sup> (x² − 1)dx = 2(1/3 − 1) = −4/3; el área es su valor absoluto, 4/3." },
        { q: "∫<sub>a</sub><sup>b</sup> f = −∫<sub>b</sub><sup>a</sup> f ocurre", op: ["solo si f es par", "siempre", "solo si a = b", "solo si f es impar"], ok: 1, porque: "Es la propiedad de intercambio de límites." },
        { q: "Con el cambio t = 1 + x² en ∫<sub>0</sub><sup>1</sup> x(1 + x²)³ dx, los nuevos límites son", op: ["0 y 1", "1 y 2", "1 y 4", "0 y 2"], ok: 1, porque: "x = 0 ⟹ t = 1; x = 1 ⟹ t = 2." }
      ]
    },
    tj1: {
      titulo: "Tarjetas del tema 12",
      cartas: [
        { a: "Suma de Riemann", b: "Δ·Σ f(x*<sub>i</sub>) con Δ = (b − a)/n. Si f es continua, las sumas inferiores y superiores tienden al mismo límite: ∫ f." },
        { a: "Regla de Barrow", b: "∫<sub>a</sub><sup>b</sup> f = F(b) − F(a), F primitiva de f continua en [a, b]. No lleva +C." },
        { a: "Propiedades básicas", b: "Lineal · aditiva ∫<sub>a</sub><sup>b</sup> = ∫<sub>a</sub><sup>c</sup> + ∫<sub>c</sub><sup>b</sup> · ∫<sub>b</sub><sup>a</sup> = −∫<sub>a</sub><sup>b</sup> · |∫f| ≤ ∫|f|." },
        { a: "Simetrías", b: "Par: ∫<sub>−a</sub><sup>a</sup> = 2∫<sub>0</sub><sup>a</sup>. Impar: ∫<sub>−a</sub><sup>a</sup> = 0." },
        { a: "Área con cambio de signo", b: "Raíces dentro de [a, b], una integral por trozo, suma de valores absolutos." },
        { a: "Área entre dos curvas", b: "Cortes f = g; en cada tramo ∫(arriba − abajo); suma de áreas. Esbozo antes de integrar." },
        { a: "Teorema fundamental del cálculo", b: "(∫<sub>a</sub><sup>x</sup> f(t)dt)′ = f(x) si f es continua." },
        { a: "Derivada con extremo g(x)", b: "(∫<sub>a</sub><sup>g(x)</sup> f)′ = f(g(x))·g′(x)." },
        { a: "Dos extremos variables", b: "(∫<sub>h(x)</sub><sup>g(x)</sup> f)′ = f(g)·g′ − f(h)·h′." },
        { a: "Valor medio", b: "μ = (1/(b − a))∫<sub>a</sub><sup>b</sup> f. Teorema: existe c con f(c) = μ si f es continua." },
        { a: "Cambio de variable en integral definida", b: "Cambian los límites con la variable; el resultado ya es un número: no se deshace el cambio." },
        { a: "Volumen de revolución", b: "Giro alrededor del eje X: V = π∫<sub>a</sub><sup>b</sup> [f(x)]² dx." }
      ]
    },
    empar: {
      titulo: "Integral y resultado",
      consigna: "Une cada integral con su valor.",
      pares: [
        ["∫<sub>0</sub><sup>1</sup> x eˣ dx", "1"],
        ["∫<sub>0</sub><sup>1</sup> √x dx", "2/3"],
        ["∫<sub>0</sub><sup>1</sup> 2x/(1 + x²) dx", "ln 2"],
        ["∫<sub>0</sub><sup>π</sup> sen x dx", "2"],
        ["∫<sub>0</sub><sup>3</sup> |x − 1| dx", "5/2"],
        ["∫<sub>−2</sub><sup>2</sup> x³ dx", "0"]
      ]
    },
    clas: {
      titulo: "Signo de una integral",
      consigna: "Clasifica cada integral según su signo (sin calcularla entera, mirando la gráfica).",
      categorias: ["Positiva", "Negativa", "Cero"],
      items: [
        { t: "∫<sub>0</sub><sup>π</sup> sen x dx", c: 0 }, { t: "∫<sub>1</sub><sup>e</sup> ln x dx", c: 0 }, { t: "∫<sub>−1</sub><sup>1</sup> x² dx", c: 0 },
        { t: "∫<sub>π</sub><sup>2π</sup> sen x dx", c: 1 }, { t: "∫<sub>0</sub><sup>1</sup> ln x dx", c: 1 }, { t: "∫<sub>3</sub><sup>0</sup> x² dx", c: 1 },
        { t: "∫<sub>−2</sub><sup>2</sup> x³ dx", c: 2 }, { t: "∫<sub>0</sub><sup>2π</sup> cos x dx", c: 2 }, { t: "∫<sub>−π</sub><sup>π</sup> sen x dx", c: 2 }
      ]
    },
    orden: {
      titulo: "Área entre dos curvas",
      consigna: "Ordena los pasos para calcular el área encerrada por dos curvas.",
      items: [
        { t: "Esbozar las dos curvas" }, { t: "Resolver f(x) = g(x) para hallar los cortes" }, { t: "Ordenar los cortes: serán los límites de integración" },
        { t: "En cada tramo, decidir cuál va encima probando un punto" }, { t: "Integrar (arriba − abajo) en cada tramo con Barrow" }, { t: "Sumar las áreas de los tramos (todas positivas)" }
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
    // ---------------------------------------------------------------- ★
    E("a1", 1, "Calcula " + I("1", "3") + " (2x + 1)dx.", num("∫ =", 10),
      ["Primitiva de 2x + 1."], ["F(x) = x² + x. F(3) = 12 y F(1) = 2.", "12 − 2 = 10."], "10"),
    E("a2", 1, "Calcula " + I("0", "π") + " sen x dx.", num("∫ =", 2),
      ["Primitiva de sen x: −cos x."], ["[−cos x] entre 0 y π = −cos π + cos 0 = 1 + 1."], "2"),
    E("a3", 1, "Calcula " + I("0", "1") + " eˣ dx (da el valor decimal).", num("∫ ≈", 1.718282),
      ["La primitiva de eˣ es eˣ."], ["e¹ − e⁰ = e − 1."], "e − 1 ≈ 1,718"),
    E("a4", 1, "Calcula el área bajo y = 4 − x² entre x = 0 y x = 2.", num("Área =", 16 / 3),
      ["f ≥ 0 en [0, 2]: el área es la integral."], ["F(x) = 4x − x³/3. F(2) = 8 − 8/3 = 16/3; F(0) = 0."], "16/3 ≈ 5,333"),
    E("a5", 1, "Sin hacer cuentas largas, " + I("−2", "2") + " (x⁵ − x³ + x)dx vale", opcion("Valor", ["0", "8", "16", "−8"], 0),
      ["¿Es par o impar el integrando?"], ["x⁵, x³ y x son impares: la suma es impar.", "Integral de una impar entre −2 y 2: 0."], "0"),
    E("a6", 1, "Calcula " + I("1", "4") + " √x dx.", num("∫ =", 14 / 3),
      ["√x = x<sup>1/2</sup>."], ["F = (2/3)x<sup>3/2</sup>. F(4) = (2/3)·8 = 16/3; F(1) = 2/3.", "16/3 − 2/3 = 14/3."], "14/3 ≈ 4,667"),
    E("a7", 1, "Halla el valor medio de f(x) = 3x² en [0, 2].", num("μ =", 4),
      ["μ = (1/(b − a))·∫ f."], ["∫<sub>0</sub><sup>2</sup> 3x²dx = [x³] = 8.", "μ = 8/2 = 4."], "4"),
    E("a8", 1, "Si " + I("0", "3") + " f = 5 y " + I("3", "7") + " f = 2, calcula " + I("7", "0") + " f.", num("∫ =", -7),
      ["Aditividad y luego límites invertidos."], ["∫<sub>0</sub><sup>7</sup> f = 5 + 2 = 7.", "Invertir límites cambia el signo: −7."], "−7"),
    E("a9", 1, "Sea F(x) = " + I("0", "x") + " (t² + 1)dt. Calcula F′(2).", num("F′(2) =", 5),
      ["Teorema fundamental: F′(x) = f(x)."], ["F′(x) = x² + 1.", "F′(2) = 5."], "5"),
    E("a10", 1, "Calcula " + I("1", "e") + " dx/x.", num("∫ =", 1),
      ["Primitiva de 1/x."], ["[ln x] entre 1 y e = ln e − ln 1 = 1 − 0."], "1"),
    E("a11", 1, "Calcula " + I("0", "2") + " |x − 1| dx.", num("∫ =", 1),
      ["Parte en x = 1."], ["Dos triángulos de base 1 y altura 1: 1/2 + 1/2.", "O bien ∫<sub>0</sub><sup>1</sup> (1 − x) + ∫<sub>1</sub><sup>2</sup> (x − 1) = 1/2 + 1/2."], "1"),
    E("a12", 1, "Halla el área encerrada entre y = x² e y = 2x.", num("Área =", 4 / 3),
      ["Cortes: x² = 2x."], ["x² − 2x = 0 ⟹ x = 0 y x = 2. En x = 1: 2x = 2 &gt; x² = 1.", "∫<sub>0</sub><sup>2</sup> (2x − x²)dx = [x² − x³/3] = 4 − 8/3 = 4/3."], "4/3 ≈ 1,333"),
    E("a13", 1, "Suma izquierda de f(x) = x en [0, 4] con n = 4 rectángulos.", num("Suma =", 6),
      ["Δ = 1; alturas en x = 0, 1, 2, 3."], ["Δ = (4 − 0)/4 = 1.", "Δ·[f(0) + f(1) + f(2) + f(3)] = 0 + 1 + 2 + 3 = 6 (la integral exacta es 8)."], "6"),
    E("a14", 1, "Calcula " + I("0", "1") + " (x + 1)³ dx.", num("∫ =", 15 / 4),
      ["La primitiva de (x + 1)³ es (x + 1)⁴/4."], ["[(x + 1)⁴/4] entre 0 y 1 = 16/4 − 1/4 = 15/4."], "15/4 = 3,75"),
    E("a15", 1, "Calcula " + I("−1", "3") + " 5 dx.", num("∫ =", 20),
      ["Rectángulo de altura 5."], ["Base 3 − (−1) = 4, altura 5: 20. Con Barrow: [5x] = 15 + 5 = 20."], "20"),

    // ---------------------------------------------------------------- ★★
    E("b1", 2, "Calcula " + I("0", "1") + " x·eˣ dx.", num("∫ =", 1),
      ["Por partes: u = x, dv = eˣdx."], ["[x eˣ − eˣ]<sub>0</sub><sup>1</sup> = (e − e) − (0 − 1) = 1."], "1"),
    E("b2", 2, "Calcula " + I("1", "e") + " ln x dx.", num("∫ =", 1),
      ["Por partes: u = ln x, dv = dx."], ["Primitiva x ln x − x. En e: e − e = 0; en 1: 0 − 1 = −1.", "0 − (−1) = 1."], "1"),
    E("b3", 2, "Calcula " + I("0", "1") + " 2x/(x² + 1) dx.", num("∫ ≈", 0.693147),
      ["El numerador es la derivada del denominador."], ["[ln(x² + 1)] entre 0 y 1 = ln 2 − ln 1 = ln 2."], "ln 2 ≈ 0,693"),
    E("b4", 2, "Calcula " + I("0", "1") + " x√(x² + 1) dx.", num("∫ ≈", 0.609476),
      ["t = x² + 1; los límites pasan a 1 y 2."], ["(1/2)∫<sub>1</sub><sup>2</sup> √t dt = (1/2)(2/3)[t<sup>3/2</sup>] = (1/3)(2√2 − 1)."], "(2√2 − 1)/3 ≈ 0,609"),
    E("b5", 2, "Halla el área encerrada por y = x³ − x y el eje X.", num("Área =", 1 / 2),
      ["Raíces −1, 0, 1: dos regiones."], ["Una es 1/4 y la otra 1/4 (simetría impar): ∫<sub>0</sub><sup>1</sup> (x³ − x) = −1/4.", "Área = 2·(1/4) = 1/2."], "1/2"),
    E("b6", 2, "Halla el área entre y = x² − 4x + 3 y el eje X para x entre 0 y 3.", num("Área =", 8 / 3),
      ["Raíces 1 y 3: parte en x = 1."], ["F = x³/3 − 2x² + 3x. F(0) = 0, F(1) = 4/3, F(3) = 0.", "|4/3| + |0 − 4/3| = 8/3."], "8/3 ≈ 2,667"),
    E("b7", 2, "Halla el área encerrada por y = x² e y = x + 2.", num("Área =", 9 / 2),
      ["Cortes: x² − x − 2 = 0."], ["x = −1 y x = 2; la recta va encima.", "∫<sub>−1</sub><sup>2</sup> (x + 2 − x²)dx = 9/2."], "9/2 = 4,5"),
    E("b8", 2, "Halla el área entre y = sen x e y = cos x para x entre 0 y π/2.", num("Área ≈", 0.828427),
      ["Se cruzan en π/4."], ["∫<sub>0</sub><sup>π/4</sup> (cos − sen) = √2 − 1 y ∫<sub>π/4</sub><sup>π/2</sup> (sen − cos) = √2 − 1.", "Suma: 2√2 − 2."], "2√2 − 2 ≈ 0,828"),
    E("b9", 2, "Sea F(x) = " + I("0", "x²") + " e<sup>−t</sup> dt. Calcula F′(1).", num("F′(1) ≈", 0.735759),
      ["Regla de la cadena: f(g(x))·g′(x)."], ["F′(x) = e<sup>−x²</sup>·2x.", "F′(1) = 2e<sup>−1</sup> = 2/e."], "2/e ≈ 0,736"),
    E("b10", 2, "Sea F(x) = " + I("0", "x") + " (t² − 4t + 3)dt. Halla las abscisas de sus extremos relativos.", lista("x =", [1, 3]),
      ["F′ = t² − 4t + 3 evaluada en x."], ["F′(x) = (x − 1)(x − 3).", "Ceros en 1 (máximo: de + a −) y 3 (mínimo)."], "x = 1 (máx) y x = 3 (mín)"),
    E("b11", 2, "Calcula lím<sub>x→0</sub> " + I("0", "x") + " sen t dt / x².", num("Límite =", 0.5),
      ["0/0: L'Hôpital."], ["Derivando: sen x/(2x) → 1/2."], "1/2"),
    E("b12", 2, "Para f(x) = 3x² en [0, 2], halla el c del teorema del valor medio integral.", num("c ≈", 1.154701),
      ["f(c) = μ = 8/2 = 4."], ["∫<sub>0</sub><sup>2</sup> 3x² = 8, μ = 4.", "3c² = 4 ⟹ c = 2/√3 ≈ 1,155."], "2/√3 ≈ 1,155"),
    E("b13", 2, "Calcula " + I("0", "2") + " |x² − 1| dx.", num("∫ =", 2),
      ["Parte en x = 1."], ["∫<sub>0</sub><sup>1</sup> (1 − x²) = 2/3 y ∫<sub>1</sub><sup>2</sup> (x² − 1) = 4/3.", "Suma: 2."], "2"),
    E("b14", 2, "Calcula " + I("0", "1") + " dx/((x + 1)(x + 2)).", num("∫ ≈", 0.287682),
      ["Fracciones simples."], ["1/(x + 1) − 1/(x + 2).", "[ln(x + 1) − ln(x + 2)] = (ln 2 − ln 3) + ln 2 = ln(4/3)."], "ln(4/3) ≈ 0,288"),
    E("b15", 2, "Suma de punto medio de f(x) = x² en [0, 2] con n = 4 rectángulos.", num("Suma =", 2.625),
      ["Δ = 0,5; puntos medios 0,25; 0,75; 1,25; 1,75."], ["Cuadrados: 0,0625 + 0,5625 + 1,5625 + 3,0625 = 5,25.", "5,25·0,5 = 2,625 (la integral exacta es 8/3 ≈ 2,667)."], "2,625"),
    E("b16", 2, "Calcula " + I("0", "π") + " x sen x dx.", num("∫ ≈", 3.141593),
      ["Por partes: u = x, dv = sen x dx."], ["[−x cos x] entre 0 y π = π·1 − 0 = π.", "Más ∫<sub>0</sub><sup>π</sup> cos x dx = [sen x] = 0. Resultado: π."], "π"),
    E("b17", 2, "Halla el área encerrada entre y = x² e y = x³.", num("Área ≈", 0.083333),
      ["Cortes en 0 y 1."], ["En (0, 1): x² ≥ x³.", "∫<sub>0</sub><sup>1</sup> (x² − x³) = 1/3 − 1/4 = 1/12."], "1/12 ≈ 0,0833"),
    E("b18", 2, "Sin calcular a mano, " + I("−π", "π") + " x²·sen x dx vale", opcion("Valor", ["0", "π", "2π", "No se puede saber"], 0),
      ["x² es par y sen x impar."], ["Producto par × impar = impar. La integral de una impar sobre un intervalo simétrico es 0."], "0"),

    // ---------------------------------------------------------------- ★★★
    E("c1", 3, "Sea F(x) = " + I("0", "x²") + " √(1 + t²) dt. Calcula F′(1).", num("F′(1) ≈", 2.828427),
      ["Cadena: f(x²)·2x con f(t) = √(1 + t²)."], ["F′(x) = √(1 + x⁴)·2x.", "F′(1) = 2√2."], "2√2 ≈ 2,828"),
    E("c2", 3, "Sea F(x) = " + I("0", "x") + " (t² − t − 2)dt. Halla el valor del mínimo relativo de F.", num("F(mín) ≈", -10 / 3),
      ["F′(x) = x² − x − 2 = (x − 2)(x + 1): el mínimo está en x = 2."], ["Mínimo en x = 2 (F′ pasa de − a +).", "F(x) = x³/3 − x²/2 − 2x. F(2) = 8/3 − 2 − 4 = −10/3."], "−10/3 ≈ −3,333"),
    E("c3", 3, "Calcula lím<sub>x→0</sub> " + I("0", "x") + " (1 − cos t)dt / x³.", num("Límite ≈", 1 / 6),
      ["L'Hôpital con el teorema fundamental."], ["Primera: (1 − cos x)/(3x²), otra vez 0/0.", "Segunda: sen x/(6x) → 1/6."], "1/6 ≈ 0,1667"),
    E("c4", 3, "Halla a &gt; 0 tal que " + I("0", "a") + " (3x² + 2x)dx = 12.", num("a =", 2),
      ["Calcula la integral en función de a."], ["[x³ + x²]<sub>0</sub><sup>a</sup> = a³ + a² = 12.", "a = 2 cumple 8 + 4 = 12 (y a³ + a² − 12 = (a − 2)(a² + 3a + 6))."], "a = 2"),
    E("c5", 3, "Halla el área limitada por y = x², su tangente en (2, 4) y el eje Y.", num("Área ≈", 8 / 3),
      ["Tangente: y = 4x − 4."], ["La parábola está por encima de su tangente: x² − 4x + 4 = (x − 2)².", "∫<sub>0</sub><sup>2</sup> (x − 2)²dx = [(x − 2)³/3]<sub>0</sub><sup>2</sup> = 8/3."], "8/3 ≈ 2,667"),
    E("c6", 3, "Halla el área encerrada por x = y² y x = 3 − 2y (integra respecto de y).", num("Área ≈", 32 / 3),
      ["Cortes: y² = 3 − 2y."], ["y² + 2y − 3 = 0 ⟹ y = −3 y y = 1. La recta (x = 3 − 2y) está a la derecha.", "∫<sub>−3</sub><sup>1</sup> (3 − 2y − y²)dy = [3y − y² − y³/3] = 5/3 + 9 = 32/3."], "32/3 ≈ 10,667"),
    E("c7", 3, "Halla el área limitada por y = eˣ, y = e<sup>−x</sup> y la recta x = 1.", num("Área ≈", 1.086161),
      ["Se cortan en x = 0."], ["Entre 0 y 1, eˣ ≥ e<sup>−x</sup>.", "∫<sub>0</sub><sup>1</sup> (eˣ − e<sup>−x</sup>)dx = [eˣ + e<sup>−x</sup>] = (e + 1/e) − 2."], "e + 1/e − 2 ≈ 1,086"),
    E("c8", 3, "Halla el área limitada por y = 1/x, y = 1/x² y x = e (a la derecha del corte).", num("Área ≈", 0.367879),
      ["Cortes: 1/x = 1/x² ⟹ x = 1."], ["En (1, e): 1/x ≥ 1/x².", "[ln x + 1/x] entre 1 y e = (1 + 1/e) − 1 = 1/e."], "1/e ≈ 0,368"),
    E("c9", 3, "Halla a &gt; 0 para que el área encerrada por y = x² e y = ax sea 9/2.", num("a =", 3),
      ["Cortes en 0 y a."], ["∫<sub>0</sub><sup>a</sup> (ax − x²)dx = a³/2 − a³/3 = a³/6.", "a³/6 = 9/2 ⟹ a³ = 27 ⟹ a = 3."], "a = 3"),
    E("c10", 3, "Calcula " + I("0", "1") + " x²·eˣ dx.", num("∫ ≈", 0.718282),
      ["Por partes dos veces."], ["∫x²eˣ = x²eˣ − 2∫x eˣ = x²eˣ − 2(x − 1)eˣ = (x² − 2x + 2)eˣ.", "En 1: e; en 0: 2. Resultado e − 2."], "e − 2 ≈ 0,718"),
    E("c11", 3, "Para f(x) = ln x en [1, e], halla el c del teorema del valor medio integral.", num("c ≈", 1.789634),
      ["f(c) = μ = (1/(e − 1))∫ ln x."], ["∫<sub>1</sub><sup>e</sup> ln x dx = 1, μ = 1/(e − 1) ≈ 0,582.", "ln c = 1/(e − 1) ⟹ c = e<sup>1/(e − 1)</sup> ≈ 1,790."], "c ≈ 1,790"),
    E("c12", 3, "Calcula " + I("0", "3") + " |x² − 2x| dx.", num("∫ ≈", 8 / 3),
      ["Raíces 0 y 2: parte en x = 2."], ["∫<sub>0</sub><sup>2</sup> (2x − x²) = 4/3 y ∫<sub>2</sub><sup>3</sup> (x² − 2x) = 4/3.", "Suma 8/3."], "8/3 ≈ 2,667"),
    E("c13", 3, "Sea G(x) = " + I("x", "x²") + " dt/(1 + t²). Calcula G′(1).", num("G′(1) =", 0.5),
      ["G′ = f(x²)·2x − f(x)."], ["f(t) = 1/(1 + t²). G′(x) = 2x/(1 + x⁴) − 1/(1 + x²).", "G′(1) = 2/2 − 1/2 = 1/2."], "1/2"),
    E("c14", 3, "Calcula lím<sub>n→∞</sub> (1/n)·Σ<sub>k=1</sub><sup>n</sup> √(k/n).", num("Límite ≈", 2 / 3),
      ["Es una suma de Riemann derecha en [0, 1]."], ["Δ = 1/n, x<sub>k</sub> = k/n: la suma es la derecha de √x en [0, 1].", "Límite = ∫<sub>0</sub><sup>1</sup> √x dx = 2/3."], "2/3"),
    E("c15", 3, "Halla el área limitada por y = |x| e y = 2 − x².", num("Área ≈", 7 / 3),
      ["Cortes en x = ±1; simetría."], ["Para x ≥ 0: x = 2 − x² ⟹ x = 1. La parábola va encima.", "Área = 2∫<sub>0</sub><sup>1</sup> (2 − x² − x)dx = 2(2 − 1/3 − 1/2) = 7/3."], "7/3 ≈ 2,333"),
    E("c16", 3, "Calcula " + I("0", "ln 2") + " eˣ/(1 + eˣ) dx.", num("∫ ≈", 0.405465),
      ["El numerador es la derivada del denominador."], ["[ln(1 + eˣ)] entre 0 y ln 2 = ln 3 − ln 2.", "= ln(3/2)."], "ln(3/2) ≈ 0,405")
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Integral definida: lo esencial", ancha: true,
      tabla: { cab: ["Idea", "Fórmula"], filas: [
        ["Definición", "∫<sub>a</sub><sup>b</sup> f = lím (b − a)/n · Σ f(x*<sub>i</sub>)"],
        ["Barrow", "∫<sub>a</sub><sup>b</sup> f = F(b) − F(a)"],
        ["Aditiva / invertir", "∫<sub>a</sub><sup>b</sup> = ∫<sub>a</sub><sup>c</sup> + ∫<sub>c</sub><sup>b</sup> · ∫<sub>b</sub><sup>a</sup> = −∫<sub>a</sub><sup>b</sup>"],
        ["Simetrías", "par: 2∫<sub>0</sub><sup>a</sup> · impar: 0"],
        ["Valor medio", "μ = (1/(b − a))∫<sub>a</sub><sup>b</sup> f"]
      ] } },
    { titulo: "Áreas: receta", ancha: true,
      pasos: ["Esbozo (o estudio del signo).", "Ceros de f (o cortes f = g) dentro de [a, b].", "Un Barrow por trozo: ∫(arriba − abajo).", "Suma de valores absolutos.", "Un área nunca sale negativa."],
      nota: "La integral neta y el área solo coinciden si no hay cambio de signo." },
    { titulo: "Teorema fundamental", ancha: true,
      tabla: { cab: ["F(x) =", "F′(x) ="], filas: [
        ["∫<sub>a</sub><sup>x</sup> f(t)dt", "f(x)"],
        ["∫<sub>a</sub><sup>g(x)</sup> f(t)dt", "f(g(x))·g′(x)"],
        ["∫<sub>h(x)</sub><sup>g(x)</sup> f(t)dt", "f(g)·g′ − f(h)·h′"],
        ["∫<sub>x</sub><sup>a</sup> f(t)dt", "−f(x)"]
      ] },
      nota: "Con F′ = integrando se estudian crecimiento y extremos de F sin integrar." },
    { titulo: "Teoremas del valor medio",
      tabla: { cab: ["Teorema", "Dice"], filas: [
        ["Integral", "f(c) = (1/(b − a))∫<sub>a</sub><sup>b</sup> f"],
        ["Derivativo (Lagrange)", "f′(c) = (f(b) − f(a))/(b − a)"]
      ] },
      nota: "Ambos garantizan al menos un c, no uno solo." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Llamar área a ∫ f cuando f cambia de signo", bien: "Parte en los ceros y suma |trozos|", por: "La integral neta compensa positivos con negativos." },
        { mal: "Poner +C en una integral definida", bien: "La constante se cancela", por: "(F(b) + C) − (F(a) + C) = F(b) − F(a)." },
        { mal: "(∫<sub>0</sub><sup>x²</sup> f)′ = f(x²)", bien: "f(x²)·2x", por: "Regla de la cadena con g′." },
        { mal: "Aplicar Barrow con una asíntota en [a, b]", bien: "Comprobar continuidad", por: "∫<sub>−1</sub><sup>1</sup> dx/x² no vale −2." },
        { mal: "Deshacer el cambio de variable al final", bien: "Con los límites nuevos ya es un número", por: "Se cambian límites y no se vuelve a x." },
        { mal: "Valor medio = integral", bien: "Dividir entre b − a", por: "μ es la altura del rectángulo equivalente." }
      ] }
  ];

  B.registrar("mates2", "t12", {
    resumen: resumen, secciones: B.parte.m2t12a.secciones, nuevas: nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
