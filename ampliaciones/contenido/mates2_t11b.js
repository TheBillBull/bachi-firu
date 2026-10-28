/* ============================================================
   Matemáticas II · ampliaciones · Tema 11: Cálculo de primitivas
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t11/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 5
    {
      h: "5. Integrales racionales: fracciones simples",
      html:
        "<p>Una integral racional es ∫P(x)/Q(x)dx con P y Q polinomios. Se resuelve siempre con la misma receta, en cuatro pasos:</p>" +
        "<ol><li><b>Grado.</b> Si grado P ≥ grado Q, <b>divide</b>: P/Q = cociente + resto/Q. El cociente se integra a la vista; el resto tiene grado menor que Q.</li>" +
        "<li><b>Factoriza Q</b> (fórmula de segundo grado, Ruffini, factor común).</li>" +
        "<li><b>Descompón</b> en fracciones simples según los factores (tabla de abajo) y halla los coeficientes.</li>" +
        "<li><b>Integra</b> cada fracción simple.</li></ol>" +
        tabla(["Factor de Q", "Fracciones simples que genera", "Se integra como"], [
          ["(x − a), raíz simple", "A/(x − a)", "A·ln|x − a|"],
          ["(x − a)², raíz doble", "A/(x − a) + B/(x − a)²", "A·ln|x − a| − B/(x − a)"],
          ["x² + bx + c, irreducible (Δ &lt; 0)", "(Mx + N)/(x² + bx + c)", "logaritmo + arcotangente"]
        ]) +
        "<p>Prueba el asistente: elige un caso, mueve A, B y C hasta que la curva roja discontinua cubra a la azul, y pulsa «Siguiente paso» para ver cómo se calculan sin tanteos.</p>" +
        w("m2_fracciones") +
        "<h5>Hallar los coeficientes sin sufrir</h5>" +
        "<p>Se multiplica por el denominador común y se obtiene una igualdad de polinomios que es cierta <b>para todo x</b>. Dos herramientas: (a) <b>sustituir en las raíces</b> (x = a anula todos los términos menos uno: da un coeficiente de golpe); (b) <b>comparar coeficientes</b> de x², x, término independiente, para los que quedan. Se pueden combinar. Siempre comprueba un valor suelto (por ejemplo x = 0 o x = 2) en los dos lados.</p>" +
        ejemplo("Raíces simples con denominador de segundo grado",
          "Calcula ∫1/(x² − 1)dx.",
          ["Factoriza: x² − 1 = (x − 1)(x + 1). Grado 0 &lt; 2: no se divide.",
           "1/((x−1)(x+1)) = A/(x−1) + B/(x+1) ⟹ 1 = A(x+1) + B(x−1).",
           "x = 1: 1 = 2A ⟹ A = ½.  x = −1: 1 = −2B ⟹ B = −½.",
           "∫ = ½ln|x−1| − ½ln|x+1| + C = <b>½·ln|(x−1)/(x+1)| + C</b>."]) +
        ejemplo("Cociente + fracciones: hay que dividir",
          "Calcula ∫(x³ + 2)/(x² − 1)dx.",
          ["Grado 3 ≥ 2: se divide. x³ + 2 = x·(x² − 1) + (x + 2) ⟹ cociente x, resto x + 2.",
           "(x+2)/((x−1)(x+1)) = A/(x−1) + B/(x+1) ⟹ x + 2 = A(x+1) + B(x−1).",
           "x = 1: 3 = 2A ⟹ A = 3/2.  x = −1: 1 = −2B ⟹ B = −½.",
           "∫ = ∫x dx + (3/2)ln|x−1| − (1/2)ln|x+1| = <b>x²/2 + (3/2)·ln|x−1| − (1/2)·ln|x+1| + C</b>."]) +
        ejemplo("Un denominador de tercer grado: Ruffini",
          "Calcula ∫1/(x³ − 2x² − x + 2)dx.",
          ["Ruffini: x = 1 es raíz (1 − 2 − 1 + 2 = 0). Queda x³ − 2x² − x + 2 = (x − 1)(x² − x − 2) = (x − 1)(x + 1)(x − 2).",
           "1/((x−1)(x+1)(x−2)) = A/(x−1) + B/(x+1) + C/(x−2) ⟹ 1 = A(x+1)(x−2) + B(x−1)(x−2) + C(x−1)(x+1).",
           "x = 1: 1 = −2A ⟹ A = −½.  x = −1: 1 = 6B ⟹ B = 1/6.  x = 2: 1 = 3C ⟹ C = 1/3.",
           "∫ = <b>−½·ln|x−1| + (1/6)·ln|x+1| + (1/3)·ln|x−2| + C</b>."]) +
        "<h5>Raíz doble</h5>" +
        "<p>Un factor (x − a)² exige <b>los dos</b> términos A/(x − a) y B/(x − a)²; si pones solo el segundo, el sistema no tiene solución. Y no olvides que ∫(x − a)<sup>−2</sup>dx = −1/(x − a), sin logaritmo.</p>" +
        ejemplo("Raíz doble y raíz simple",
          "Calcula ∫(x² + 1)/((x − 1)²(x + 1))dx.",
          ["Grado 2 &lt; 3. Descomposición: A/(x−1) + B/(x−1)² + C/(x+1).",
           "x² + 1 = A(x−1)(x+1) + B(x+1) + C(x−1)².",
           "x = 1: 2 = 2B ⟹ B = 1.  x = −1: 2 = 4C ⟹ C = ½.  Coeficiente de x²: 1 = A + C ⟹ A = ½.  (Comprobación en x = 0: ½·(−1) + 1 + ½ = 1 ✓.)",
           "∫ = <b>½·ln|x−1| − 1/(x−1) + ½·ln|x+1| + C</b>."]) +
        "<h5>Denominador irreducible: aparece la arcotangente</h5>" +
        "<p>Si Δ = b² − 4c &lt; 0, el polinomio x² + bx + c no tiene raíces reales. Se completa el cuadrado: x² + bx + c = (x + b/2)² + k², con k² = c − b²/4. Entonces ∫dx/((x + b/2)² + k²) = (1/k)·arctg((x + b/2)/k). Si el numerador no es constante, se parte en «derivada del denominador» (da logaritmo) más una constante (da arcotangente).</p>" +
        ejemplo("Completar cuadrados",
          "Calcula ∫1/(x² + 2x + 5)dx.",
          ["Δ = 4 − 20 &lt; 0. Se completa: x² + 2x + 5 = (x + 1)² + 4.",
           "∫dx/((x+1)² + 4) = (1/2)·arctg((x+1)/2). (Con t = (x+1)/2: (x+1)² + 4 = 4(t² + 1) y dx = 2dt, luego ∫2dt/(4(t²+1)) = ½arctg t.)",
           "<b>Resultado:</b> ½·arctg((x + 1)/2) + C."]) +
        ejemplo("Numerador de grado 1 sobre un irreducible",
          "Calcula ∫(2x + 3)/(x² + 2x + 5)dx.",
          ["La derivada del denominador es 2x + 2. Se escribe 2x + 3 = (2x + 2) + 1.",
           "∫(2x+2)/(x²+2x+5)dx = ln(x² + 2x + 5) (sin valor absoluto: siempre positivo).  ∫1/(x²+2x+5)dx = ½arctg((x+1)/2).",
           "<b>Resultado:</b> ln(x² + 2x + 5) + ½·arctg((x + 1)/2) + C."]) +
        ejemplo("Fracción simple con factor irreducible",
          "Calcula ∫4/((x − 1)(x² + 1))dx.",
          ["4/((x−1)(x²+1)) = A/(x−1) + (Bx + C)/(x²+1) ⟹ 4 = A(x²+1) + (Bx+C)(x−1).",
           "x = 1: 4 = 2A ⟹ A = 2.  Coeficiente de x²: 0 = A + B ⟹ B = −2.  Término independiente: 4 = A − C ⟹ C = −2.",
           "4/((x−1)(x²+1)) = 2/(x−1) − (2x + 2)/(x²+1). Integrando: 2ln|x−1| − ln(x²+1) − 2arctg x.",
           "<b>Resultado:</b> 2·ln|x−1| − ln(x² + 1) − 2·arctg x + C."]) +
        ejemplo("Denominador de grado 1: solo dividir",
          "Calcula ∫x²/(x + 1)dx.",
          ["Se divide: x² = (x − 1)(x + 1) + 1 ⟹ x²/(x+1) = x − 1 + 1/(x+1).",
           "<b>Resultado:</b> x²/2 − x + ln|x + 1| + C."]) +
        ojo("Con una raíz doble o un irreducible, <b>no vale</b> poner una sola constante en el numerador. Y antes de descomponer, comprueba el grado: si grado P ≥ grado Q y no divides, el sistema sale inconsistente."),
    },
    // -------------------------------------------------------------- 6
    {
      h: "6. Integrales trigonométricas y trucos habituales",
      html:
        "<p>En la EvAU las trigonométricas que caen son pocas y siempre se resuelven con uno de estos cuatro trucos.</p>" +
        tabla(["Si ves…", "Haz…"], [
          ["sen²x o cos²x", "Fórmula del ángulo doble: sen²x = (1 − cos 2x)/2 y cos²x = (1 + cos 2x)/2"],
          ["sen³x, cos³x (potencia impar)", "Separa un factor: cos³x = cos x·(1 − sen²x) y cambia u = sen x"],
          ["sen x·cos x", "u = sen x (da sen²x/2); o bien sen x·cos x = ½sen 2x (da −¼cos 2x)"],
          ["tg²x", "1 + tg²x = 1/cos²x ⟹ tg²x = 1/cos²x − 1, y ∫tg²x dx = tg x − x"],
          ["tg x", "tg x = sen x/cos x = −(cos x)′/cos x ⟹ ∫tg x dx = −ln|cos x|"]
        ]) +
        ejemplo("Ángulo doble",
          "Calcula ∫sen²x dx.",
          ["sen²x = (1 − cos 2x)/2.",
           "∫(1 − cos 2x)/2 dx = x/2 − (1/2)(sen 2x)/2 = x/2 − sen 2x/4.",
           "<b>Resultado:</b> x/2 − sen(2x)/4 + C.  Comprobación: derivada = ½ − ½cos 2x = sen²x ✓."]) +
        ejemplo("Potencia impar",
          "Calcula ∫cos³x dx.",
          ["cos³x = cos x·cos²x = cos x·(1 − sen²x).",
           "Con u = sen x, du = cos x dx: ∫(1 − u²)du = u − u³/3.",
           "<b>Resultado:</b> sen x − sen³x/3 + C."]) +
        ejemplo("Un truco con tangente",
          "Calcula ∫tg²x dx.",
          ["tg²x = 1/cos²x − 1, porque 1 + tg²x = 1/cos²x.",
           "<b>Resultado:</b> tg x − x + C."]) +
        "<h5>Dos primitivas «distintas» que son la misma</h5>" +
        "<p>∫sen x·cos x dx puede dar sen²x/2, o −cos²x/2, o −cos(2x)/4. ¿Alguna está mal? No: difieren en constantes (sen²x = 1 − cos²x, luego sen²x/2 = −cos²x/2 + ½; y cos 2x = 1 − 2sen²x). Todas son primitivas válidas. Por eso, <b>para comparar con la solución del libro, deriva</b>, no compares las fórmulas. Y por eso en los ejercicios de esta web se pide la primitiva que cumple una condición F(x₀) = y₀, que es única.</p>"
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. ¿Qué método uso? Estrategia",
      html:
        "<p>Ante una integral, no empieces a probar: recorre esta lista en orden y quédate con el primer método que encaje.</p>" +
        tabla(["Mira el integrando", "Método", "Ejemplo"], [
          ["Suma de potencias, constantes, eˣ, sen, cos", "Término a término (tabla)", "∫(3x² − 4x + 5)dx"],
          ["Una función u(x) con su derivada u′(x) multiplicando (o u′/u)", "Inmediata compuesta", "∫2x·e<sup>x²</sup>dx, ∫(2x+3)/(x²+3x−1)dx"],
          ["Cociente de polinomios", "Dividir si hace falta + fracciones simples", "∫(5x+1)/((x−1)(x+2))dx"],
          ["Producto de polinomio por eˣ, sen, cos, ln x, arctg x; o ln x / arctg x solos", "Partes (ALPES)", "∫x·eˣdx, ∫ln x dx"],
          ["Raíz o exponencial de algo no lineal que complica; sobra una x que se puede despejar", "Cambio de variable", "∫x√(x+1)dx, ∫1/(eˣ+1)dx"],
          ["Potencias de sen y cos", "Ángulo doble o separar un factor", "∫sen²x dx, ∫cos³x dx"]
        ]) +
        ejemplo("Tres integrales parecidas, tres métodos",
          "Decide el método y calcula: (a) ∫x/(x² + 1)dx, (b) ∫x·arctg x dx, (c) ∫x²/(x² + 1)dx.",
          ["<b>(a)</b> El numerador es la mitad de la derivada del denominador ⟹ f′/f: ½ln(x² + 1) + C.",
           "<b>(b)</b> arctg (A) por polinomio (P) ⟹ partes con u = arctg x, dv = x dx. Resultado: (x²/2)·arctg x − x/2 + ½·arctg x + C (ver el ejercicio e46).",
           "<b>(c)</b> ∫x²/(x²+1)dx: grado igual ⟹ dividir: x²/(x²+1) = 1 − 1/(x²+1), de donde x − arctg x + C.",
           "Moraleja: parecen la misma integral y son tres técnicas distintas. La pregunta clave es «¿qué hay en el numerador respecto al denominador?»."]) +
        ojo("Si una integral se «resiste», no insistas con el mismo método: prueba otro, o combina (cambio y luego partes, o dividir y luego cambio). Y comprueba siempre derivando antes de pasar a la siguiente.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Tres problemas completos al estilo EvAU",
      html:
        ejemplo("Primitiva por un punto, con partes",
          "Sea f(x) = x·e<sup>−x</sup>. Halla la primitiva de f cuya gráfica pasa por el punto (0, 1).",
          ["Por partes: u = x, dv = e<sup>−x</sup>dx ⟹ du = dx, v = −e<sup>−x</sup>.",
           "∫x·e<sup>−x</sup>dx = −x·e<sup>−x</sup> + ∫e<sup>−x</sup>dx = −x·e<sup>−x</sup> − e<sup>−x</sup> = −(x + 1)e<sup>−x</sup>.",
           "F(x) = −(x + 1)e<sup>−x</sup> + C. Condición F(0) = 1: −1 + C = 1 ⟹ C = 2.",
           "<b>F(x) = 2 − (x + 1)e<sup>−x</sup>.</b> Comprobación: F′ = −e<sup>−x</sup> + (x + 1)e<sup>−x</sup> = x·e<sup>−x</sup> ✓, F(0) = 2 − 1 = 1 ✓."]) +
        ejemplo("Parámetros en una primitiva",
          "Halla a y b para que F(x) = (ax + b)eˣ sea una primitiva de f(x) = (2x + 3)eˣ.",
          ["Hay que cumplir F′ = f. Derivando: F′(x) = a·eˣ + (ax + b)eˣ = (ax + a + b)eˣ.",
           "Igualando con (2x + 3)eˣ: a = 2 y a + b = 3 ⟹ b = 1.",
           "<b>a = 2, b = 1.</b> (Así se resuelve una integral sin hacerla: se plantea la F y se identifica.)"]) +
        ejemplo("Racional con división",
          "Calcula ∫(x³ + 2)/(x² − 1)dx y comprueba derivando.",
          ["Resuelto en el apartado 5: F(x) = x²/2 + (3/2)ln|x − 1| − (1/2)ln|x + 1|.",
           "Comprobación: F′ = x + (3/2)/(x−1) − (1/2)/(x+1) = x + [3(x+1) − (x−1)]/(2(x²−1)) = x + (2x + 4)/(2(x²−1)) = x + (x+2)/(x²−1) = (x³ − x + x + 2)/(x²−1) = (x³+2)/(x²−1) ✓."])
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. ¿Qué falla aquí? Errores típicos",
      html: "<p>Cada pregunta muestra un razonamiento con un fallo. Encuéntralo y entiende por qué importa.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Autocomprobación del tema",
      html: "<p>Test con explicación, tarjetas con las fórmulas, una actividad de emparejar, otra de clasificar por método y el orden correcto de una descomposición en fracciones simples.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "empar") + w("clasificar", "clas") + w("orden", "orden")
    }
  ];

  B.parte.m2t11b = { nuevas: nuevas };
})(window);
