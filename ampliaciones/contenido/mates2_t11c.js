/* ============================================================
   Matemáticas II · ampliaciones · Tema 11: Cálculo de primitivas
   (parte C: resumen, actividades, ejercicios, láminas y registro)
   Las respuestas se escriben como la primitiva que cumple una condición F(x₀) = y₀ (única) y la
   web la corrige por equivalencia algebraica (se evalúa en muchos puntos), sin «+ C».
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Primitiva</b>: F′ = f. Todas las primitivas difieren en una constante: ∫f dx = F + C. Para una sola, hace falta F(x₀) = y₀: halla F + C, sustituye y despeja C. <b>Siempre se comprueba derivando.</b>",
    "<b>Inmediatas y compuestas</b>: tabla de xⁿ, 1/x, eˣ, sen, cos, 1/cos², 1/(1+x²), 1/√(1−x²). Compuesta: u′·uⁿ, u′/u (⟹ ln|u|), u′·eᵘ, u′·cos u… Si falta una <b>constante</b>, se compensa; una x, no. Con argumento lineal: ∫f(ax+b)dx = F(ax+b)/a.",
    "<b>Cambio de variable</b>: u = g(x), du = g′(x)dx; toda la integral en u (si sobra una x, despéjala); integra y <b>deshaz</b> el cambio. u típica: lo de dentro de una raíz o potencia, el exponente de e, ln x, √x, eˣ.",
    "<b>Por partes</b>: ∫u dv = uv − ∫v du con <b>ALPES</b> (Arcos, Logaritmos, Polinomios, Exponenciales, Seno/coseno; u = el primero). Reiteradas: un polinomio de grado n necesita n pasadas. Cíclicas (eˣ·sen x): mismo criterio dos veces y se despeja I (÷2). ln x y arctg x solos: dv = dx.",
    "<b>Racionales</b>: si grado P ≥ grado Q, <b>divide</b>. Factoriza Q: raíz simple ⟹ A/(x−a); doble ⟹ A/(x−a) + B/(x−a)²; irreducible ⟹ (Mx+N)/(x²+bx+c). Coeficientes: sustituir en las raíces y comparar coeficientes. Irreducible: completa cuadrados ⟹ arctg; numerador = derivada ⟹ ln.",
    "<b>Trigonométricas</b>: sen², cos² ⟹ ángulo doble; potencia impar ⟹ separa un factor y u = sen o cos; tg²x = 1/cos²x − 1; ∫tg x = −ln|cos x|.",
    "<b>Estrategia</b>: ¿tabla? ¿u′ visible? ¿cociente de polinomios? ¿producto de tipos distintos o ln/arctg? ¿raíz o exponencial que molesta? Si no sale, prueba otro método o combina. Dos primitivas «distintas» pueden ser la misma (difieren en constante): deriva para comparar."
  ];

  // ================================================================
  //  DATOS DE ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«∫2x(x² + 1)³dx = (x² + 1)⁴ + C». ¿Qué falla?",
          op: ["Nada, está bien", "Falta dividir entre 4: al derivar (x²+1)⁴ sale 4(x²+1)³·2x = 8x(x²+1)³, cuatro veces lo pedido", "Debería ser (x²+1)⁴/3", "Debería llevar un logaritmo"], ok: 1,
          porque: "Al integrar una potencia se divide entre el nuevo exponente: ∫u′·u³dx = u⁴/4. Resultado correcto: (x²+1)⁴/4 + C. Derivando se detecta al instante." },
        { q: "«∫(1/x²)dx = ln|x²| + C». ¿Qué falla?",
          op: ["Nada, 1/x siempre da logaritmo", "1/x² = x⁻², y ∫x⁻²dx = −1/x + C: el logaritmo solo sale para x⁻¹", "Debería ser 2·ln|x|", "Debería ser x⁻¹"], ok: 1,
          porque: "Con exponente n ≠ −1 se aplica la regla de la potencia: xⁿ⁺¹/(n+1). Aquí n = −2 ⟹ x⁻¹/(−1) = −1/x." },
        { q: "«∫x·eˣdx = (x²/2)·eˣ + C» (integro cada factor por separado). ¿Qué falla?",
          op: ["Nada", "La integral de un producto NO es el producto de las integrales; hay que usar partes: (x − 1)eˣ + C", "Debería ser x²·eˣ", "Falta un logaritmo"], ok: 1,
          porque: "Derivando (x²/2)eˣ sale x·eˣ + (x²/2)eˣ ≠ x·eˣ. No existe una regla «integral del producto = producto de integrales»." },
        { q: "Para ∫x·ln x dx un alumno toma u = x y dv = ln x dx. ¿Qué pasa?",
          op: ["Funciona igual", "Mala elección (ALPES): para tener v hay que integrar ln x por partes y la integral nueva es más complicada", "No se puede hacer por partes", "El resultado sale con signo contrario"], ok: 1,
          porque: "El logaritmo (L) va antes que el polinomio (P) en ALPES: u = ln x, dv = x dx ⟹ (x²/2)ln x − x²/4 + C." },
        { q: "Tras dos pasadas por partes de ∫eˣsen x dx, un alumno llega a I = eˣ(sen x − cos x) − I y escribe «I = eˣ(sen x − cos x) + C». ¿Qué falla?",
          op: ["Nada", "Hay que despejar: 2I = eˣ(sen x − cos x) ⟹ I = ½eˣ(sen x − cos x) + C", "El signo de cos x es el contrario", "Debería haber terminado con I = 0"], ok: 1,
          porque: "I aparece en los dos lados: se pasa al otro lado (2I = …) y se divide entre 2. Comprueba derivando: el ½ importa." },
        { q: "«∫dx/(x² + 4) = arctg(x/2) + C». ¿Qué falla?",
          op: ["Nada", "Falta el factor ½: ∫dx/(x²+4) = ½·arctg(x/2) + C (derivando arctg(x/2) sale 2/(x²+4))", "Debería ser arctg(2x)", "Debería ser ln(x² + 4)"], ok: 1,
          porque: "1/(x²+k²) integra a (1/k)·arctg(x/k). Con k = 2: ½·arctg(x/2)." },
        { q: "En ∫x√(x+1)dx con u = x + 1, un alumno escribe ∫x·√u du. ¿Qué falla?",
          op: ["Nada", "Quedó una x sin pasar a u: hay que sustituir x = u − 1 y dx = du", "Debería ser u = √(x+1)", "No se puede integrar con un cambio"], ok: 1,
          porque: "En el cambio debe desaparecer TODA la x. Con x = u − 1: ∫(u−1)√u du = (2/5)u^(5/2) − (2/3)u^(3/2)." },
        { q: "Para ∫(x² + 1)/(x² − x)dx un alumno escribe directamente A/x + B/(x − 1). ¿Qué falla?",
          op: ["Nada", "El grado del numerador (2) no es menor que el del denominador (2): primero hay que dividir", "Debería haber una raíz doble", "Faltan los términos Cx + D"], ok: 1,
          porque: "x² + 1 = 1·(x² − x) + (x + 1). Solo la fracción (x+1)/(x²−x) se descompone. Sin dividir, el sistema no tiene solución." },
        { q: "«∫tg x dx = ln|cos x| + C». ¿Qué falla?",
          op: ["Nada", "Falta un signo: tg x = −(cos x)′/cos x ⟹ ∫tg x dx = −ln|cos x| + C", "Debería ser ln|sen x|", "Debería ser 1/cos²x"], ok: 1,
          porque: "(ln|cos x|)′ = −sen x/cos x = −tg x. Derivando tu resultado ves el signo." },
        { q: "Un alumno obtiene ∫sen x·cos x dx = sen²x/2 y otro −cos²x/2. ¿Quién tiene razón?",
          op: ["Solo el primero", "Solo el segundo", "Los dos: difieren en una constante (sen²x/2 = −cos²x/2 + ½)", "Ninguno: la integral es sen x + cos x"], ok: 2,
          porque: "Dos primitivas de la misma función difieren en una constante. Para comparar, deriva: las dos dan sen x·cos x." }
      ]
    },
    quiz1: {
      titulo: "Test de cálculo de primitivas",
      preguntas: [
        { q: "Si F es una primitiva de f, el conjunto de todas las primitivas de f es", op: ["F(x) + C, con C constante", "F(x)·C", "F′(x)", "F(x) + x"], ok: 0, porque: "La derivada de una constante es 0, así que sumar una constante no cambia F′. Y dos primitivas siempre difieren en una constante." },
        { q: "∫(3x² − 4x + 5)dx =", op: ["x³ − 2x² + 5x + C", "6x − 4 + C", "x³ − 4x² + 5x + C", "x³ − 2x² + C"], ok: 0, porque: "Término a término: 3x³/3 = x³, −4x²/2 = −2x², 5x." },
        { q: "∫e^(2x)dx =", op: ["½·e^(2x) + C", "2·e^(2x) + C", "e^(2x) + C", "e^(x²) + C"], ok: 0, porque: "Argumento lineal: se divide entre el coeficiente de x. Derivando ½e^(2x) sale e^(2x)." },
        { q: "∫(2x + 3)/(x² + 3x − 1)dx =", op: ["ln|x² + 3x − 1| + C", "(x² + 3x − 1)² + C", "arctg(x² + 3x − 1) + C", "ln|2x + 3| + C"], ok: 0, porque: "El numerador es la derivada del denominador: tipo u′/u." },
        { q: "Para ∫x²·sen x dx, ALPES dice que u es", op: ["x²", "sen x", "x² sen x", "dx"], ok: 0, porque: "P (polinomio) va antes que S (seno). Habrá que hacer dos pasadas porque el grado es 2." },
        { q: "∫ln x dx =", op: ["x·ln x − x + C", "1/x + C", "(ln x)²/2 + C", "x·ln x + C"], ok: 0, porque: "Partes con u = ln x, dv = dx: x ln x − ∫dx. Derivando: ln x + 1 − 1 = ln x." },
        { q: "En la descomposición de 1/((x − 1)²(x + 2)) aparecen", op: ["A/(x−1) + B/(x−1)² + C/(x+2)", "A/(x−1)² + B/(x+2)", "A/((x−1)²) + (Bx+C)/(x+2)", "A/(x−1) + B/(x+2)"], ok: 0, porque: "Una raíz doble genera dos fracciones (potencias 1 y 2); la simple, una." },
        { q: "x² + x + 1 en el denominador (Δ = −3 &lt; 0) genera una fracción simple del tipo", op: ["(Mx + N)/(x² + x + 1)", "A/(x² + x + 1)", "A/x + B/(x + 1)", "A/(x − r)"], ok: 0, porque: "Los factores irreducibles de grado 2 llevan numerador de grado 1. Se integra con logaritmo y arcotangente." },
        { q: "Si en ∫P/Q el grado de P es igual o mayor que el de Q, lo primero es", op: ["dividir los polinomios", "descomponer en fracciones simples", "hacer un cambio de variable", "derivar"], ok: 0, porque: "P/Q = cociente + resto/Q; el resto ya tiene grado menor que Q." },
        { q: "∫cos x/(1 + sen²x)dx, con u = sen x, es", op: ["arctg(sen x) + C", "ln(1 + sen²x) + C", "arctg(cos x) + C", "sen x + C"], ok: 0, porque: "du = cos x dx; queda ∫du/(1+u²) = arctg u." },
        { q: "La primitiva de f(x) = 2x que pasa por (1, 5) es", op: ["x² + 4", "x² + 5", "x² + 1", "2x²+ 3"], ok: 0, porque: "F = x² + C; F(1) = 1 + C = 5 ⟹ C = 4." },
        { q: "∫tg²x dx =", op: ["tg x − x + C", "tg³x/3 + C", "1/cos²x + C", "ln|cos x| + C"], ok: 0, porque: "tg²x = 1/cos²x − 1, y ∫1/cos²x dx = tg x." }
      ]
    },
    tj1: {
      titulo: "Tarjetas de primitivas",
      cartas: [
        { a: "∫xⁿdx", b: "xⁿ⁺¹/(n + 1) + C, para n ≠ −1. Para n = −1: ln|x| + C." },
        { a: "∫u′/u dx", b: "ln|u| + C. Ejemplo: ∫(2x+3)/(x²+3x−1)dx = ln|x²+3x−1|." },
        { a: "∫u′·uⁿdx", b: "uⁿ⁺¹/(n + 1) + C. Si falta una constante, se compensa; una x, no." },
        { a: "∫f(ax + b)dx", b: "F(ax + b)/a + C. Ej.: ∫cos(3x)dx = sen(3x)/3." },
        { a: "∫1/(1 + x²)dx   y   ∫1/(x² + k²)dx", b: "arctg x + C   y   (1/k)·arctg(x/k) + C." },
        { a: "Cambio de variable", b: "u = g(x), du = g′(x)dx; toda la integral en u (despeja la x que sobre); integra; deshaz el cambio." },
        { a: "Integración por partes", b: "∫u dv = u·v − ∫v du. ALPES: Arcos, Logaritmos, Polinomios, Exponenciales, Seno/coseno (u = el primero)." },
        { a: "Partes cíclicas (eˣ sen x)", b: "Dos pasadas con el mismo criterio: reaparece I. Se despeja: 2I = …, I = …/2." },
        { a: "∫ln x dx   y   ∫arctg x dx", b: "x ln x − x + C   y   x arctg x − ½ln(1 + x²) + C (partes con dv = dx)." },
        { a: "Fracciones simples", b: "Grado P ≥ grado Q: dividir. Raíz simple A/(x−a); doble A/(x−a) + B/(x−a)²; irreducible (Mx+N)/(x²+bx+c)." },
        { a: "Sen² y cos²", b: "sen²x = (1 − cos 2x)/2;  cos²x = (1 + cos 2x)/2." },
        { a: "Primitiva por un punto", b: "F = (primitiva) + C; F(x₀) = y₀ ⟹ despejar C. Comprobar derivando y evaluando." }
      ]
    },
    empar: {
      titulo: "Integral y resultado",
      consigna: "Une cada integral con su primitiva (sin constante).",
      pares: [
        ["∫2x·e^(x²)dx", "e^(x²)"],
        ["∫(2x + 1)/(x² + x)dx", "ln|x² + x|"],
        ["∫cos(2x)dx", "½·sen(2x)"],
        ["∫x·eˣdx", "(x − 1)·eˣ"],
        ["∫1/(x² + 9)dx", "⅓·arctg(x/3)"],
        ["∫sen x·cos x dx", "½·sen²x"]
      ]
    },
    clas: {
      titulo: "¿Qué método uso?",
      consigna: "Toca cada integral y elige el método que la resuelve.",
      categorias: ["Inmediata o compuesta", "Fracciones simples", "Por partes", "Cambio de variable"],
      items: [
        { t: "∫(3x² − 4x + 5)dx", c: 0 },
        { t: "∫x·e^(x²)dx", c: 0 },
        { t: "∫(2x+3)/(x²+3x−1)dx", c: 0 },
        { t: "∫(5x+1)/((x−1)(x+2))dx", c: 1 },
        { t: "∫4/((x−1)(x²+1))dx", c: 1 },
        { t: "∫(x²+1)/(x²−x)dx", c: 1 },
        { t: "∫x·sen x dx", c: 2 },
        { t: "∫ln x dx", c: 2 },
        { t: "∫eˣ·cos x dx", c: 2 },
        { t: "∫x·√(x+1)dx", c: 3 },
        { t: "∫1/(eˣ+1)dx", c: 3 },
        { t: "∫1/(√x·(1+√x))dx", c: 3 }
      ]
    },
    orden: {
      titulo: "Integral racional paso a paso",
      consigna: "Ordena los pasos para resolver ∫P(x)/Q(x)dx.",
      items: [
        { t: "Comparar los grados de P y Q", nota: "Si grado P ≥ grado Q, hay que dividir." },
        { t: "Dividir si hace falta y quedarse con cociente + resto/Q", nota: "El cociente se integra a la vista." },
        { t: "Factorizar el denominador Q", nota: "Fórmula de segundo grado, Ruffini, factor común." },
        { t: "Escribir las fracciones simples con coeficientes A, B, C…", nota: "Simple, doble o irreducible, según el factor." },
        { t: "Quitar denominadores y hallar los coeficientes", nota: "Sustituyendo en las raíces y comparando coeficientes." },
        { t: "Integrar cada fracción simple y sumar", nota: "ln|x−a|, −1/(x−a), arctg…" },
        { t: "Comprobar derivando", nota: "Debe salir el integrando de partida." }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS (F sin «+ C», la primitiva que cumple la condición indicada)
  // ================================================================
  function fx(expr, dom) { return { tipo: "expr", etiqueta: "F(x) =", expr: expr, dom: dom || [-2, 2] }; }
  function num(et, v) { return { tipo: "num", etiqueta: et, valor: v }; }
  function opc(et, ops, ok) { return { tipo: "opcion", etiqueta: et, opciones: ops, ok: ok }; }
  var N = "<br><i>Escribe F(x) sin «+C» (usa sen, cos, ln, e^, arctg, sqrt…).</i>";

  var ejercicios = [
    // ---------------------------------------------------------------- ★
    { id: "e1", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 6x² − 4x + 3 con F(0) = 2." + N, check: fx("2x^3-2x^2+3x+2"),
      pistas: ["Integra término a término."], pasos: ["∫(6x² − 4x + 3)dx = 2x³ − 2x² + 3x + C.", "F(0) = C = 2."], resultado: "F(x) = 2x³ − 2x² + 3x + 2" },
    { id: "e2", nivel: 1, enunciado: "Halla la primitiva F de f(x) = √x + 1/x² (x &gt; 0) con F(1) = 0." + N, check: fx("(2/3)x^(3/2)-1/x+1/3", [0.5, 4]),
      pistas: ["√x = x^(1/2) y 1/x² = x⁻²."], pasos: ["F = (2/3)x^(3/2) − 1/x + C.", "F(1) = 2/3 − 1 + C = 0 ⟹ C = 1/3."], resultado: "F(x) = (2/3)x^(3/2) − 1/x + 1/3" },
    { id: "e3", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 5eˣ − 2cos x con F(0) = 1." + N, check: fx("5e^x-2sen(x)-4"),
      pistas: ["∫cos x = sen x."], pasos: ["F = 5eˣ − 2 sen x + C.", "F(0) = 5 + C = 1 ⟹ C = −4."], resultado: "F(x) = 5eˣ − 2 sen x − 4" },
    { id: "e4", nivel: 1, enunciado: "Halla la primitiva F de f(x) = (x + 1)²/x (x &gt; 0) con F(1) = 0." + N, check: fx("x^2/2+2x+ln(x)-5/2", [0.5, 4]),
      pistas: ["Desarrolla: (x+1)²/x = x + 2 + 1/x."], pasos: ["F = x²/2 + 2x + ln x + C.", "F(1) = 1/2 + 2 + C = 0 ⟹ C = −5/2."], resultado: "F(x) = x²/2 + 2x + ln x − 5/2" },
    { id: "e5", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 3/(1 + x²) con F(0) = 1." + N, check: fx("3arctg(x)+1"),
      pistas: ["∫1/(1+x²)dx = arctg x."], pasos: ["F = 3 arctg x + C; F(0) = C = 1."], resultado: "F(x) = 3 arctg x + 1" },
    { id: "e6", nivel: 1, enunciado: "Halla la primitiva F de f(x) = (2x + 1)³ con F(0) = 0." + N, check: fx("(2x+1)^4/8-1/8"),
      pistas: ["Argumento lineal: divide entre el coeficiente 2."], pasos: ["F = (2x+1)⁴/(4·2) + C = (2x+1)⁴/8 + C.", "F(0) = 1/8 + C = 0 ⟹ C = −1/8."], resultado: "F(x) = (2x+1)⁴/8 − 1/8" },
    { id: "e7", nivel: 1, enunciado: "Halla la primitiva F de f(x) = cos(3x) con F(0) = 1." + N, check: fx("sen(3x)/3+1"),
      pistas: ["Divide entre 3."], pasos: ["F = sen(3x)/3 + C; F(0) = C = 1."], resultado: "F(x) = sen(3x)/3 + 1" },
    { id: "e8", nivel: 1, enunciado: "Halla la primitiva F de f(x) = e<sup>−2x</sup> con F(0) = 0." + N, check: fx("-e^(-2x)/2+1/2"),
      pistas: ["Divide entre −2."], pasos: ["F = −½e<sup>−2x</sup> + C.", "F(0) = −½ + C = 0 ⟹ C = ½."], resultado: "F(x) = ½ − ½e^(−2x)" },
    { id: "e9", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 1/(3x + 2) (x ≥ 0) con F(0) = 0." + N, check: fx("ln(3x+2)/3-ln(2)/3", [0, 3]),
      pistas: ["u′/u con ajuste: ∫1/(3x+2)dx = ⅓ln|3x+2|."], pasos: ["F = ⅓ln(3x+2) + C.", "F(0) = ⅓ln 2 + C = 0 ⟹ C = −⅓ln 2."], resultado: "F(x) = ⅓ln(3x+2) − ⅓ln 2" },
    { id: "e10", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 2x(x² + 3)⁴ con F(0) = 0." + N, check: fx("(x^2+3)^5/5-243/5"),
      pistas: ["u = x² + 3, u′ = 2x: es u′·u⁴."], pasos: ["F = (x²+3)⁵/5 + C.", "F(0) = 243/5 + C = 0 ⟹ C = −243/5."], resultado: "F(x) = (x²+3)⁵/5 − 243/5" },
    { id: "e11", nivel: 1, enunciado: "Halla la primitiva F de f(x) = 2x/(x² + 1) con F(0) = 2." + N, check: fx("ln(x^2+1)+2"),
      pistas: ["Numerador = derivada del denominador."], pasos: ["F = ln(x²+1) + C (x²+1 &gt; 0).", "F(0) = 0 + C = 2."], resultado: "F(x) = ln(x² + 1) + 2" },
    { id: "e12", nivel: 1, enunciado: "Halla la primitiva F de f(x) = x·e<sup>x²</sup> con F(0) = 1." + N, check: fx("e^(x^2)/2+1/2", [-1.5, 1.5]),
      pistas: ["u = x², u′ = 2x: falta un 2."], pasos: ["F = ½e<sup>x²</sup> + C.", "F(0) = ½ + C = 1 ⟹ C = ½."], resultado: "F(x) = ½e^(x²) + ½" },
    { id: "e13", nivel: 1, enunciado: "Halla la primitiva F de f(x) = sen x·cos x con F(0) = 0." + N, check: fx("sen(x)^2/2"),
      pistas: ["u = sen x, u′ = cos x."], pasos: ["F = sen²x/2 + C; F(0) = C = 0.", "(Otra forma, −cos²x/2 + ½, es la misma función.)"], resultado: "F(x) = sen²x/2" },
    { id: "e14", nivel: 1, enunciado: "¿Cuál es una primitiva de f(x) = 1/(2√x) para x &gt; 0?", check: opc("Primitiva", ["√x", "2√x", "−1/(4x√x)", "ln √x"], 0),
      pistas: ["Deriva cada opción."], pasos: ["(√x)′ = 1/(2√x) ✓.", "(2√x)′ = 1/√x ✗; la tercera es la derivada de f, no una primitiva; (ln√x)′ = 1/(2x) ✗."], resultado: "√x" },
    // ---------------------------------------------------------------- ★★
    { id: "e15", nivel: 2, enunciado: "Halla la primitiva F de f(x) = x√(x² + 1) con F(0) = 0." + N, check: fx("(x^2+1)^(3/2)/3-1/3"),
      pistas: ["u = x² + 1, u′ = 2x."], pasos: ["F = ½·(x²+1)^(3/2)/(3/2) + C = (x²+1)^(3/2)/3 + C.", "F(0) = 1/3 + C = 0 ⟹ C = −1/3."], resultado: "F(x) = ((x²+1)^(3/2) − 1)/3" },
    { id: "e16", nivel: 2, enunciado: "Halla la primitiva F de f(x) = (ln x)²/x (x &gt; 0) con F(1) = 0." + N, check: fx("ln(x)^3/3", [0.5, 5]),
      pistas: ["u = ln x, u′ = 1/x."], pasos: ["F = (ln x)³/3 + C.", "F(1) = 0 + C = 0."], resultado: "F(x) = (ln x)³/3" },
    { id: "e17", nivel: 2, enunciado: "Halla la primitiva F de f(x) = tg x en (−π/2, π/2) con F(0) = 0." + N, check: fx("-ln(cos(x))", [-1.2, 1.2]),
      pistas: ["tg x = sen x/cos x = −(cos x)′/cos x."], pasos: ["F = −ln|cos x| + C; en este intervalo cos x &gt; 0.", "F(0) = −ln 1 + C = 0."], resultado: "F(x) = −ln(cos x)" },
    { id: "e18", nivel: 2, enunciado: "Halla la primitiva F de f(x) = cos x/(1 + sen²x) con F(0) = 0." + N, check: fx("arctg(sen(x))"),
      pistas: ["Cambio u = sen x."], pasos: ["du = cos x dx ⟹ ∫du/(1+u²) = arctg u.", "F = arctg(sen x) + C; F(0) = 0 ⟹ C = 0."], resultado: "F(x) = arctg(sen x)" },
    { id: "e19", nivel: 2, enunciado: "Halla la primitiva F de f(x) = eˣ/(eˣ + 1) con F(0) = 0." + N, check: fx("ln(e^x+1)-ln(2)"),
      pistas: ["El numerador es la derivada del denominador."], pasos: ["F = ln(eˣ+1) + C.", "F(0) = ln 2 + C = 0 ⟹ C = −ln 2."], resultado: "F(x) = ln(eˣ + 1) − ln 2" },
    { id: "e20", nivel: 2, enunciado: "Halla la primitiva F de f(x) = x·sen x con F(0) = 0." + N, check: fx("-x*cos(x)+sen(x)"),
      pistas: ["ALPES: P antes que S ⟹ u = x."], pasos: ["u = x, dv = sen x dx ⟹ du = dx, v = −cos x.", "F = −x cos x + ∫cos x dx = −x cos x + sen x + C; F(0) = C = 0."], resultado: "F(x) = −x cos x + sen x" },
    { id: "e21", nivel: 2, enunciado: "Halla la primitiva F de f(x) = x·e<sup>−x</sup> con F(0) = 0." + N, check: fx("-(x+1)e^(-x)+1"),
      pistas: ["u = x, dv = e^(−x)dx."], pasos: ["v = −e^(−x): F = −x e^(−x) + ∫e^(−x)dx = −(x+1)e^(−x) + C.", "F(0) = −1 + C = 0 ⟹ C = 1."], resultado: "F(x) = 1 − (x + 1)e^(−x)" },
    { id: "e22", nivel: 2, enunciado: "Halla la primitiva F de f(x) = x·ln x (x &gt; 0) con F(1) = 0." + N, check: fx("x^2*ln(x)/2-x^2/4+1/4", [0.5, 4]),
      pistas: ["u = ln x, dv = x dx."], pasos: ["F = (x²/2)ln x − ∫x/2 dx = (x²/2)ln x − x²/4 + C.", "F(1) = −1/4 + C = 0 ⟹ C = 1/4."], resultado: "F(x) = (x²/2)ln x − x²/4 + 1/4" },
    { id: "e23", nivel: 2, enunciado: "Halla la primitiva F de f(x) = ln x (x &gt; 0) con F(1) = 0." + N, check: fx("x*ln(x)-x+1", [0.5, 4]),
      pistas: ["u = ln x, dv = dx."], pasos: ["F = x ln x − ∫dx = x ln x − x + C.", "F(1) = −1 + C = 0 ⟹ C = 1."], resultado: "F(x) = x ln x − x + 1" },
    { id: "e24", nivel: 2, enunciado: "Halla la primitiva F de f(x) = 1/(x² − 1) para x &gt; 1 con F(2) = 0." + N, check: fx("ln((x-1)/(x+1))/2+ln(3)/2", [1.5, 6]),
      pistas: ["x² − 1 = (x−1)(x+1): 1 = A(x+1) + B(x−1)."], pasos: ["A = ½ (x = 1), B = −½ (x = −1).", "F = ½ln(x−1) − ½ln(x+1) + C; F(2) = ½ln(1/3) + C = 0 ⟹ C = ½ln 3."], resultado: "F(x) = ½ln((x−1)/(x+1)) + ½ln 3" },
    { id: "e25", nivel: 2, enunciado: "Halla la primitiva F de f(x) = (4x − 1)/(x(x − 1)) para x &gt; 1 con F(2) = 0." + N, check: fx("ln(x)+3ln(x-1)-ln(2)", [1.5, 6]),
      pistas: ["(4x−1) = A(x−1) + Bx; x = 0 y x = 1."], pasos: ["x = 0: −1 = −A ⟹ A = 1.  x = 1: 3 = B.", "F = ln x + 3ln(x−1) + C; F(2) = ln 2 + 0 + C = 0 ⟹ C = −ln 2."], resultado: "F(x) = ln x + 3 ln(x−1) − ln 2" },
    { id: "e26", nivel: 2, enunciado: "Halla la primitiva F de f(x) = 1/(x² + 4) con F(0) = 1." + N, check: fx("arctg(x/2)/2+1"),
      pistas: ["∫1/(x²+k²)dx = (1/k)arctg(x/k)."], pasos: ["F = ½arctg(x/2) + C; F(0) = C = 1."], resultado: "F(x) = ½arctg(x/2) + 1" },
    { id: "e27", nivel: 2, enunciado: "Halla la primitiva F de f(x) = (2x + 3)/(x² + 3x + 5) con F(0) = 0." + N, check: fx("ln(x^2+3x+5)-ln(5)"),
      pistas: ["Δ = 9 − 20 &lt; 0 y el numerador es la derivada del denominador."], pasos: ["F = ln(x²+3x+5) + C.", "F(0) = ln 5 + C = 0 ⟹ C = −ln 5."], resultado: "F(x) = ln(x² + 3x + 5) − ln 5" },
    { id: "e28", nivel: 2, enunciado: "Halla la primitiva F de f(x) = x²/(x + 1) para x ≥ 0 con F(0) = 1." + N, check: fx("x^2/2-x+ln(x+1)+1", [0, 3]),
      pistas: ["Divide: x²/(x+1) = x − 1 + 1/(x+1)."], pasos: ["F = x²/2 − x + ln(x+1) + C.", "F(0) = 0 + C = 1."], resultado: "F(x) = x²/2 − x + ln(x+1) + 1" },
    { id: "e29", nivel: 2, enunciado: "Halla la primitiva F de f(x) = sen²x con F(0) = 0." + N, check: fx("x/2-sen(2x)/4"),
      pistas: ["sen²x = (1 − cos 2x)/2."], pasos: ["F = x/2 − sen(2x)/4 + C; F(0) = C = 0."], resultado: "F(x) = x/2 − sen(2x)/4" },
    { id: "e30", nivel: 2, enunciado: "Halla la primitiva F de f(x) = cos³x con F(0) = 0." + N, check: fx("sen(x)-sen(x)^3/3"),
      pistas: ["cos³x = cos x·(1 − sen²x); u = sen x."], pasos: ["∫(1 − u²)du = u − u³/3 ⟹ F = sen x − sen³x/3 + C.", "F(0) = C = 0."], resultado: "F(x) = sen x − sen³x/3" },
    // ---------------------------------------------------------------- ★★★
    { id: "e31", nivel: 3, enunciado: "Halla la primitiva F de f(x) = eˣ·sen x con F(0) = 0." + N, check: fx("e^x*(sen(x)-cos(x))/2+1/2"),
      pistas: ["Partes cíclicas: dos pasadas con el mismo criterio y se despeja."], pasos: ["I = eˣ sen x − ∫eˣcos x dx = eˣ sen x − eˣ cos x − I ⟹ I = ½eˣ(sen x − cos x).", "F(0) = ½(0 − 1) + C = 0 ⟹ C = ½."], resultado: "F(x) = ½eˣ(sen x − cos x) + ½" },
    { id: "e32", nivel: 3, enunciado: "Halla la primitiva F de f(x) = x²·eˣ con F(0) = 0." + N, check: fx("e^x*(x^2-2x+2)-2"),
      pistas: ["Dos pasadas; o la tabla de columnas."], pasos: ["F = eˣ(x² − 2x + 2) + C.", "F(0) = 2 + C = 0 ⟹ C = −2."], resultado: "F(x) = eˣ(x² − 2x + 2) − 2" },
    { id: "e33", nivel: 3, enunciado: "Halla la primitiva F de f(x) = x√(x + 1) (x ≥ 0) con F(0) = 0." + N, check: fx("2(x+1)^(5/2)/5-2(x+1)^(3/2)/3+4/15", [0, 4]),
      pistas: ["u = x + 1, x = u − 1."], pasos: ["∫(u − 1)u^(1/2)du = (2/5)u^(5/2) − (2/3)u^(3/2).", "F(0) = 2/5 − 2/3 + C = −4/15 + C = 0 ⟹ C = 4/15."], resultado: "F(x) = (2/5)(x+1)^(5/2) − (2/3)(x+1)^(3/2) + 4/15" },
    { id: "e34", nivel: 3, enunciado: "Halla la primitiva F de f(x) = 1/(eˣ + 1) con F(0) = 0." + N, check: fx("x-ln(e^x+1)+ln(2)"),
      pistas: ["u = eˣ ⟹ dx = du/u; luego fracciones simples."], pasos: ["∫du/(u(u+1)) = ln u − ln(u+1) ⟹ F = x − ln(eˣ+1) + C.", "F(0) = −ln 2 + C = 0 ⟹ C = ln 2."], resultado: "F(x) = x − ln(eˣ + 1) + ln 2" },
    { id: "e35", nivel: 3, enunciado: "Halla la primitiva F de f(x) = e<sup>√x</sup> (x &gt; 0) con F(0) = 0." + N, check: fx("2e^(sqrt(x))*(sqrt(x)-1)+2", [0.1, 4]),
      pistas: ["u = √x ⟹ dx = 2u du; después, partes."], pasos: ["∫2u·eᵘdu = 2(u − 1)eᵘ (partes: u, dv = eᵘdu).", "F = 2(√x − 1)e^(√x) + C; F(0) = −2 + C = 0 ⟹ C = 2."], resultado: "F(x) = 2(√x − 1)e^(√x) + 2" },
    { id: "e36", nivel: 3, enunciado: "Halla la primitiva F de f(x) = (x² + 1)/((x − 1)²(x + 1)) para x &gt; 1 con F(2) = 0." + N, check: fx("ln(x-1)/2-1/(x-1)+ln(x+1)/2+1-ln(3)/2", [1.5, 6]),
      pistas: ["A/(x−1) + B/(x−1)² + C/(x+1): A = ½, B = 1, C = ½."], pasos: ["F = ½ln(x−1) − 1/(x−1) + ½ln(x+1) + C.", "F(2) = 0 − 1 + ½ln 3 + C = 0 ⟹ C = 1 − ½ln 3."], resultado: "F(x) = ½ln(x−1) − 1/(x−1) + ½ln(x+1) + 1 − ½ln 3" },
    { id: "e37", nivel: 3, enunciado: "Halla la primitiva F de f(x) = 4/((x − 1)(x² + 1)) para x &gt; 1 con F(2) = 0." + N, check: fx("2ln(x-1)-ln(x^2+1)-2arctg(x)+ln(5)+2arctg(2)", [1.5, 5]),
      pistas: ["2/(x−1) − (2x+2)/(x²+1)."], pasos: ["F = 2ln(x−1) − ln(x²+1) − 2arctg x + C.", "F(2) = 0 − ln 5 − 2arctg 2 + C = 0 ⟹ C = ln 5 + 2arctg 2."], resultado: "F(x) = 2ln(x−1) − ln(x²+1) − 2arctg x + ln 5 + 2arctg 2" },
    { id: "e38", nivel: 3, enunciado: "Halla la primitiva F de f(x) = (2x + 1)/(x²(x + 1)) para x &gt; 0 con F(1) = 0." + N, check: fx("ln(x)-1/x-ln(x+1)+1+ln(2)", [0.5, 5]),
      pistas: ["A/x + B/x² + C/(x+1) con A = 1, B = 1, C = −1."], pasos: ["F = ln x − 1/x − ln(x+1) + C.", "F(1) = 0 − 1 − ln 2 + C = 0 ⟹ C = 1 + ln 2."], resultado: "F(x) = ln x − 1/x − ln(x+1) + 1 + ln 2" },
    { id: "e39", nivel: 3, enunciado: "Halla la primitiva F de f(x) = 1/(x² + 2x + 5) con F(−1) = 0." + N, check: fx("arctg((x+1)/2)/2", [-4, 3]),
      pistas: ["Completa cuadrados: x² + 2x + 5 = (x+1)² + 4."], pasos: ["F = ½arctg((x+1)/2) + C.", "F(−1) = ½arctg 0 + C = C = 0."], resultado: "F(x) = ½arctg((x+1)/2)" },
    { id: "e40", nivel: 3, enunciado: "Halla la primitiva F de f(x) = arctg x con F(0) = 0." + N, check: fx("x*arctg(x)-ln(x^2+1)/2"),
      pistas: ["Partes con dv = dx."], pasos: ["F = x arctg x − ∫x/(1+x²)dx = x arctg x − ½ln(1+x²) + C.", "F(0) = C = 0."], resultado: "F(x) = x arctg x − ½ln(1 + x²)" },
    { id: "e41", nivel: 3, enunciado: "Halla la primitiva F de f(x) = x/(x² + 2x + 5) con F(−1) = 0." + N, check: fx("ln(x^2+2x+5)/2-arctg((x+1)/2)/2-ln(2)", [-4, 3]),
      pistas: ["x = ½(2x + 2) − 1: logaritmo menos arcotangente."], pasos: ["F = ½ln(x²+2x+5) − ½arctg((x+1)/2) + C.", "F(−1) = ½ln 4 − 0 + C = ln 2 + C = 0 ⟹ C = −ln 2."], resultado: "F(x) = ½ln(x²+2x+5) − ½arctg((x+1)/2) − ln 2" },
    { id: "e42", nivel: 3, enunciado: "Halla la primitiva F de f(x) = 1/(x ln x) para x &gt; 1 con F(e) = 0." + N, check: fx("ln(ln(x))", [1.5, 6]),
      pistas: ["u = ln x: es u′/u."], pasos: ["F = ln|ln x| + C = ln(ln x) + C (ln x &gt; 0).", "F(e) = ln 1 + C = C = 0."], resultado: "F(x) = ln(ln x)" },
    { id: "e43", nivel: 3, enunciado: "Halla la primitiva F de f(x) = (ln x)² (x &gt; 0) con F(1) = 0." + N, check: fx("x*ln(x)^2-2x*ln(x)+2x-2", [0.5, 4]),
      pistas: ["Partes dos veces, siempre con u = potencia de ln x y dv = dx."], pasos: ["Primera: x ln²x − 2∫ln x dx.", "∫ln x dx = x ln x − x ⟹ F = x ln²x − 2x ln x + 2x + C.", "F(1) = 2 + C = 0 ⟹ C = −2."], resultado: "F(x) = x ln²x − 2x ln x + 2x − 2" },
    { id: "e44", nivel: 3, enunciado: "Halla la función f sabiendo que f″(x) = 12x − 6, f′(1) = 3 y f(0) = 1." + N.replace("F(x)", "f(x)"), check: { tipo: "expr", etiqueta: "f(x) =", expr: "2x^3-3x^2+3x+1", dom: [-2, 2] },
      pistas: ["Dos integrales, cada una con su constante."], pasos: ["f′(x) = 6x² − 6x + C₁; f′(1) = 0 + C₁ = 3 ⟹ C₁ = 3.", "f(x) = 2x³ − 3x² + 3x + C₂; f(0) = C₂ = 1."], resultado: "f(x) = 2x³ − 3x² + 3x + 1" },
    { id: "e45", nivel: 3, enunciado: "Se sabe que F(x) = (ax + b)e<sup>2x</sup> es una primitiva de f(x) = (6x + 5)e<sup>2x</sup>. Halla a y b.", check: [num("a =", 3), num("b =", 1)],
      pistas: ["Deriva F e iguala a f."], pasos: ["F′ = a·e^(2x) + 2(ax + b)e^(2x) = (2ax + a + 2b)e^(2x).", "2a = 6 ⟹ a = 3;  a + 2b = 5 ⟹ b = 1."], resultado: "a = 3, b = 1" },
    { id: "e46", nivel: 3, enunciado: "Halla la primitiva F de f(x) = x·arctg x con F(0) = 0." + N, check: fx("(x^2+1)*arctg(x)/2-x/2"),
      pistas: ["u = arctg x, dv = x dx; luego x²/(1+x²) = 1 − 1/(1+x²)."], pasos: ["F = (x²/2)arctg x − ½∫x²/(1+x²)dx = (x²/2)arctg x − ½(x − arctg x) + C.", "F = ((x²+1)/2)arctg x − x/2 + C; F(0) = C = 0."], resultado: "F(x) = ((x²+1)/2)·arctg x − x/2" },
    { id: "e47", nivel: 3, enunciado: "Sea F la primitiva de f(x) = (ln x)/x² (x &gt; 0) con F(1) = 0. Calcula F(e).", check: num("F(e) =", 1 - 2 / Math.E),
      pistas: ["Partes: u = ln x, dv = x⁻²dx ⟹ v = −1/x."], pasos: ["∫(ln x)/x² dx = −(ln x)/x + ∫1/x² dx = −(ln x)/x − 1/x = −(ln x + 1)/x.", "F = −(ln x + 1)/x + C; F(1) = −1 + C = 0 ⟹ C = 1.", "F(e) = −2/e + 1 ≈ 0,264."], resultado: "F(e) = 1 − 2/e ≈ 0,264" },
    { id: "e48", nivel: 3, enunciado: "Para calcular ∫x²·ln x dx por partes, la elección correcta es", check: opc("Elección", ["u = ln x, dv = x² dx", "u = x², dv = ln x dx", "u = x² ln x, dv = dx", "No se puede hacer por partes"], 0),
      pistas: ["ALPES: L antes que P."], pasos: ["Con u = ln x, dv = x²dx: v = x³/3 y ∫v du = ∫x²/3 dx, inmediata.", "Resultado: (x³/3)ln x − x³/9 + C."], resultado: "u = ln x, dv = x²dx" }
  ];

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Tabla de primitivas (básicas y compuestas)", ancha: true,
      tabla: { cab: ["Función", "Primitiva"], filas: [
        ["xⁿ  (n ≠ −1)", "xⁿ⁺¹/(n+1)"],
        ["1/x   ·   u′/u", "ln|x|   ·   ln|u|"],
        ["eˣ   ·   u′·eᵘ", "eˣ   ·   eᵘ"],
        ["cos x   ·   sen x", "sen x   ·   −cos x"],
        ["1/cos²x = 1 + tg²x", "tg x"],
        ["1/(1+x²)   ·   1/(x²+k²)", "arctg x   ·   (1/k)·arctg(x/k)"],
        ["1/√(1−x²)", "arcsen x"],
        ["f(ax + b)", "F(ax + b)/a"]
      ] },
      nota: "Comprueba siempre derivando el resultado." },
    { titulo: "Elegir el método",
      pasos: [
        "<b>¿Tabla?</b> Suma de potencias, eˣ, sen, cos: término a término.",
        "<b>¿u′ visible?</b> u′·uⁿ, u′/u, u′·eᵘ: inmediata compuesta (compensa solo con constantes).",
        "<b>¿Cociente de polinomios?</b> Dividir si grado P ≥ grado Q y fracciones simples.",
        "<b>¿Producto de tipos distintos o ln/arctg?</b> Por partes con ALPES.",
        "<b>¿Raíz o exponencial que molesta?</b> Cambio de variable; despeja x y deshaz el cambio.",
        "<b>¿Sigue sin salir?</b> Prueba otro método o combina."
      ], nota: "Siempre: derivar el resultado para comprobar." },
    { titulo: "Fracciones simples y partes",
      tabla: { cab: ["Caso", "Qué escribir"], filas: [
        ["Raíz simple a", "A/(x − a)"],
        ["Raíz doble a", "A/(x − a) + B/(x − a)²"],
        ["Irreducible x²+bx+c", "(Mx+N)/(x²+bx+c)"],
        ["ALPES para elegir u", "Arcos, Logaritmos, Polinomios, Exponenciales, Seno/coseno"],
        ["Cíclica (eˣ sen x)", "Dos pasadas iguales y se despeja I"]
      ] },
      nota: "Antes de descomponer: si grado P ≥ grado Q, divide." }
  ];

  B.registrar("mates2", "t11", {
    resumen: resumen, secciones: B.parte.m2t11a.secciones, nuevas: B.parte.m2t11b.nuevas,
    datos: datos, ejercicios: ejercicios, lamina: lamina
  });
})(window);
