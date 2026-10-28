/* ============================================================
   Matemáticas II · ampliaciones · Tema 9: Aplicaciones de la derivada
   (parte A: se añade al final de las cuatro secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t9/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. Rolle
  secciones[0] =
    "<h5>Las tres hipótesis y qué pasa si falta una</h5>" +
    "<p>El teorema de Rolle exige <b>tres cosas</b>: (1) f continua en el intervalo <b>cerrado</b> [a, b]; (2) f derivable en el intervalo <b>abierto</b> (a, b); (3) f(a) = f(b). Si se cumplen, hay <b>al menos un</b> c ∈ (a, b) con f′(c) = 0. En un examen te piden casi siempre dos cosas: <b>comprobar las hipótesis</b> (una a una, nombrándolas) y <b>hallar c</b>.</p>" +
    ejemplo("Rolle con un cúbico",
      "Comprueba que f(x) = x³ − x cumple el teorema de Rolle en [−1, 1] y halla los valores de c.",
      ["<b>Continua y derivable:</b> es un polinomio, así que lo es en todo ℝ.",
       "<b>Mismo valor en los extremos:</b> f(−1) = −1 + 1 = 0 y f(1) = 1 − 1 = 0. ✓",
       "<b>Hallar c:</b> f′(x) = 3x² − 1 = 0 ⟹ x = ±1/√3 ≈ ±0,577.",
       "Los dos valores están en (−1, 1), así que hay <b>dos</b> puntos c. (El teorema asegura «al menos uno»; no dice «exactamente uno».)"]) +
    ejemplo("Rolle con un parámetro",
      "Halla a para que f(x) = x³ − 6x² + ax cumpla las hipótesis de Rolle en [0, 3], y calcula c.",
      ["f es un polinomio: continua y derivable. Falta f(0) = f(3).",
       "f(0) = 0 y f(3) = 27 − 54 + 3a = 3a − 27. Igualando: 3a − 27 = 0 ⟹ <b>a = 9</b>.",
       "Con a = 9: f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), cuyas raíces son x = 1 y x = 3.",
       "Solo x = 1 está en el intervalo <b>abierto</b> (0, 3). Luego <b>c = 1</b>. (El x = 3 es un extremo y no cuenta.)"]) +
    ejemplo("Cuando Rolle NO se puede aplicar",
      "¿Se puede aplicar el teorema de Rolle a f(x) = x<sup>2/3</sup> en [−1, 1]? ¿Existe algún c con f′(c) = 0?",
      ["f es continua en [−1, 1] y f(−1) = f(1) = 1. Dos hipótesis se cumplen.",
       "Pero f′(x) = (2/3)x<sup>−1/3</sup> no existe en x = 0 ∈ (−1, 1): f <b>no es derivable en todo el intervalo abierto</b>. Rolle no se puede aplicar.",
       "De hecho no existe ningún c: f′(x) = (2/3)/∛x nunca se anula. La gráfica tiene una <b>cúspide</b> en el origen en vez de una cima suave."]) +
    ojo("Rolle <b>no se puede invertir</b>: que haya un c con f′(c) = 0 no implica que f(a) = f(b). Y si falla una hipótesis, el teorema no dice «no hay c»: solo que no puede garantizarlo (a veces lo hay y a veces no).") +
    "<h5>El uso estrella: probar cuántas raíces tiene una ecuación</h5>" +
    "<p>Bolzano da <b>al menos</b> una raíz; Rolle (con la derivada) da <b>como mucho</b> una. Es una pareja muy frecuente en la EvAU: «demuestra que la ecuación tiene exactamente una solución real».</p>" +
    ejemplo("Exactamente una raíz",
      "Demuestra que la ecuación x³ + 3x − 1 = 0 tiene una única solución real.",
      ["<b>Existencia (Bolzano).</b> f(x) = x³ + 3x − 1 es continua. f(0) = −1 &lt; 0 y f(1) = 3 &gt; 0, luego existe c ∈ (0, 1) con f(c) = 0.",
       "<b>Unicidad (Rolle, por reducción al absurdo).</b> Si hubiera dos raíces x₁ &lt; x₂, f cumpliría Rolle en [x₁, x₂] (polinomio, f(x₁) = f(x₂) = 0), y existiría un d con f′(d) = 0.",
       "Pero f′(x) = 3x² + 3 ≥ 3 &gt; 0 para todo x: nunca se anula. Contradicción.",
       "Por tanto hay <b>exactamente una</b> raíz real (en (0, 1))."]) +
    ojo("Resumen de la técnica: <b>Bolzano ⟹ al menos una</b>; <b>f′ nunca se anula ⟹ a lo sumo una</b> (Rolle). Si f′ cambia de signo en algún punto, esta vía no basta y hay que estudiar monotonía por tramos.");

  // ---------------------------------------------------------------- 2. Valor medio
  secciones[1] =
    "<h5>Cómo se usa en un examen</h5>" +
    "<p>Hay tres tipos de pregunta: <b>(a)</b> comprobar las hipótesis y hallar c; <b>(b)</b> interpretar geométricamente (tangente paralela a la secante); <b>(c)</b> usar el teorema para <b>acotar</b> o demostrar una desigualdad. Las hipótesis son solo dos: continua en [a, b] y derivable en (a, b); ya no hace falta f(a) = f(b).</p>" +
    w("valormedio") +
    ejemplo("Hallar c con una raíz",
      "Aplica el teorema del valor medio a f(x) = √x en [1, 4] y halla c.",
      ["√x es continua en [1, 4] y derivable en (1, 4) (el problema estaría en x = 0, que no está en el intervalo).",
       "Pendiente media: " + fr("f(4) − f(1)", "4 − 1") + " = " + fr("2 − 1", "3") + " = 1/3.",
       "f′(x) = 1/(2√x) = 1/3 ⟹ √c = 3/2 ⟹ <b>c = 9/4 = 2,25</b>, que está en (1, 4). ✓"]) +
    ejemplo("Con un logaritmo",
      "Halla c para f(x) = ln x en [1, e].",
      ["ln x es continua y derivable en (0, ∞) ⊃ [1, e].",
       "Pendiente media: (ln e − ln 1)/(e − 1) = 1/(e − 1).",
       "f′(c) = 1/c = 1/(e − 1) ⟹ <b>c = e − 1 ≈ 1,718</b>, y 1 &lt; 1,718 &lt; e. ✓"]) +
    ejemplo("Cuando no se cumple",
      "Para f(x) = |x − 1| en [0, 3] la pendiente media es (2 − 1)/3 = 1/3. ¿Hay algún c con f′(c) = 1/3?",
      ["f no es derivable en x = 1 ∈ (0, 3): el teorema no se puede aplicar.",
       "De hecho f′(x) = −1 si x &lt; 1 y f′(x) = 1 si x &gt; 1: la derivada <b>nunca vale 1/3</b>. Se ve que la hipótesis no es un adorno."]) +
    "<h5>Para demostrar desigualdades</h5>" +
    ejemplo("ln(1 + x) &lt; x",
      "Demuestra que ln(1 + x) &lt; x para todo x &gt; 0.",
      ["Sea g(t) = ln(1 + t) en [0, x]: continua y derivable. Por el teorema del valor medio existe c ∈ (0, x) con " + fr("g(x) − g(0)", "x − 0") + " = g′(c), es decir " + fr("ln(1 + x)", "x") + " = " + fr("1", "1 + c") + ".",
       "Como c &gt; 0, 1 + c &gt; 1 y por tanto 1/(1 + c) &lt; 1.",
       "Entonces ln(1 + x)/x &lt; 1, y multiplicando por x &gt; 0: <b>ln(1 + x) &lt; x</b>."]) +
    ojo("Una consecuencia útil: si f′(x) = 0 en todo un intervalo, f es constante; y si f′(x) &gt; 0 en todo un intervalo, f es estrictamente creciente. <b>Así se demuestra</b> que el signo de f′ gobierna la monotonía (sección 5).");

  // ---------------------------------------------------------------- 3. L'Hôpital
  secciones[2] =
    "<h5>Condiciones y técnica</h5>" +
    "<p>L'Hôpital se aplica <b>solo</b> si el cociente es 0/0 o ∞/∞ (compruébalo siempre antes de derivar). Las otras indeterminaciones hay que convertirlas primero en un cociente. Además, la regla pide que <b>exista</b> el límite de f′/g′: si no existe, la regla <b>no dice nada</b> (el límite original puede existir o no).</p>" +
    tabla(["Indeterminación", "Cómo llevarla a 0/0 o ∞/∞", "Ejemplo"], [
      ["0 · ∞", "f·g = f/(1/g) (o g/(1/f))", "x ln x = ln x/(1/x)"],
      ["∞ − ∞", "Sacar denominador común o conjugado", "1/x − 1/sen x = (sen x − x)/(x sen x)"],
      ["1<sup>∞</sup>, 0<sup>0</sup>, ∞<sup>0</sup>", "Tomar logaritmos: L = lím g·ln f, resultado e<sup>L</sup>", "x<sup>x</sup> en 0⁺"]
    ]) +
    w("m2_lhopital") +
    ejemplo("Aplicar la regla dos veces",
      "Calcula lím<sub>x→0</sub> (eˣ − 1 − x)/x².",
      ["Sustituyendo: (1 − 1 − 0)/0 = 0/0. Aplicamos L'Hôpital: " + fr("eˣ − 1", "2x") + ".",
       "Sigue siendo 0/0 (e⁰ − 1 = 0). Se aplica otra vez: " + fr("eˣ", "2") + " ⟶ <b>1/2</b>.",
       "Comprobación con la tabla: (e<sup>0,01</sup> − 1 − 0,01)/0,01² = 0,50167…, que se acerca a 0,5. ✓"]) +
    ejemplo("Producto 0 · ∞",
      "Calcula lím<sub>x→0⁺</sub> x·ln x.",
      ["0 · (−∞): indeterminación. Se escribe como cociente: " + fr("ln x", "1/x") + " (ahora −∞/∞).",
       "L'Hôpital: " + fr("1/x", "−1/x²") + " = −x ⟶ <b>0</b>.",
       "Moraleja: la potencia «gana» al logaritmo, igual que dice la jerarquía de infinitos."]) +
    ejemplo("Diferencia ∞ − ∞",
      "Calcula lím<sub>x→0</sub> (1/x − 1/sen x).",
      ["Común denominador: " + fr("sen x − x", "x·sen x") + " (0/0).",
       "L'Hôpital: " + fr("cos x − 1", "sen x + x cos x") + " (sigue 0/0).",
       "Otra vez: " + fr("−sen x", "2 cos x − x sen x") + " ⟶ " + fr("0", "2") + " = <b>0</b>."]) +
    ejemplo("Una potencia 0<sup>0</sup>",
      "Calcula lím<sub>x→0⁺</sub> x<sup>x</sup>.",
      ["Es 0<sup>0</sup>. Llamamos L = lím x·ln x (por logaritmos: ln(x<sup>x</sup>) = x ln x).",
       "Hemos visto que L = 0, luego el límite vale e<sup>0</sup> = <b>1</b>."]) +
    ejemplo("Una potencia 1<sup>∞</sup> con L'Hôpital",
      "Calcula lím<sub>x→0</sub> (cos x)<sup>1/x²</sup>.",
      ["Base → 1 y exponente → ∞: 1<sup>∞</sup>. L = lím ln(cos x)/x² (0/0).",
       "L'Hôpital: " + fr("−sen x/cos x", "2x") + " = " + fr("−tg x", "2x") + " ⟶ −1/2.",
       "Resultado: e<sup>−1/2</sup> = 1/√e ≈ <b>0,6065</b> (el mismo que con la fórmula e<sup>L</sup> del tema de límites)."]) +
    ojo("<b>La trampa clásica:</b> lím<sub>x→∞</sub> (x + sen x)/x es ∞/∞, pero (x + sen x)′/x′ = 1 + cos x <b>no tiene límite</b> (oscila). L'Hôpital no puede concluir. El límite sí existe y vale 1: dividiendo entre x, 1 + sen x/x → 1 + 0.") +
    ojo("Tampoco es válido derivar «a ojo» un cociente que <b>no</b> es indeterminado: lím<sub>x→0</sub> (x + 1)/(x + 2) = 1/2, pero (x + 1)′/(x + 2)′ = 1. Aplicar la regla fuera de 0/0 o ∞/∞ da resultados falsos.") +
    "<p>Si el límite se puede resolver con factorización, conjugado o un límite notable, suele ser <b>más rápido y más seguro</b> hacerlo así; deja L'Hôpital para los casos con exponenciales, logaritmos y senos, donde es la herramienta natural.</p>";

  // ---------------------------------------------------------------- 4. Optimización
  secciones[3] =
    "<h5>El método en seis pasos (y qué se puntúa)</h5>" +
    "<p>En la EvAU de Madrid, un problema de optimización puntúa <b>por pasos</b>: plantear la función, derivar y resolver, y <b>justificar</b> que el valor hallado es máximo o mínimo y dar la respuesta con unidades. Quien olvida justificar suele perder puntos aunque la cifra sea correcta.</p>" +
    "<ol>" +
    "<li><b>Leer y dibujar.</b> Identifica qué se quiere optimizar (área, volumen, coste, distancia, tiempo…) y qué condición liga las variables.</li>" +
    "<li><b>Una sola variable.</b> Despeja una variable de la condición y sustitúyela en la función objetivo.</li>" +
    "<li><b>Dominio.</b> Escribe para qué valores tiene sentido el problema (longitudes &gt; 0, etc.).</li>" +
    "<li><b>Derivar e igualar a 0.</b> Elimina las soluciones que no estén en el dominio.</li>" +
    "<li><b>Justificar.</b> Con f″ (en el punto), con el signo de f′ a cada lado, o comparando con los valores en los bordes del dominio.</li>" +
    "<li><b>Responder</b> con la magnitud pedida, sus unidades y todas las cantidades que pregunte el enunciado (no solo x).</li></ol>" +
    ojo("Si te piden una <b>distancia mínima</b>, minimiza el <b>cuadrado</b> de la distancia: tiene el mismo mínimo y evita derivar raíces. Después acuérdate de hacer la raíz para dar la distancia.") +
    w("m2_problema") +
    "<p>En la sección 9 de este tema tienes el método completo con más ejemplos, y en la sección 7 cómo se justifica el óptimo cuando el dominio es un intervalo cerrado.</p>";

  B.parte.m2t9a = { secciones: secciones };
})(window);
