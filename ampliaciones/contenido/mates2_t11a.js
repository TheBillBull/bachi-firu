/* ============================================================
   Matemáticas II · ampliaciones · Tema 11: Cálculo de primitivas
   (parte A: se añade al final de las cuatro secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates2/t11/" + ref); }
  B.parte = B.parte || {};

  var secciones = {};

  // ---------------------------------------------------------------- 1. ¿Qué es una primitiva?
  secciones[0] =
    "<h5>Una primitiva es una familia de funciones</h5>" +
    "<p>Si F′ = f, entonces (F + C)′ = f para <b>cualquier</b> constante C, y no hay más: dos primitivas de la misma f (en un intervalo) <b>siempre difieren en una constante</b>. Gráficamente, las primitivas son la misma curva desplazada hacia arriba o hacia abajo, y en cada x todas tienen <b>la misma pendiente</b>, f(x). Mueve la constante C y comprueba que la tangente (línea roja) no cambia de inclinación.</p>" +
    w("m2_familia") +
    "<h5>La primitiva que pasa por un punto: cómo se halla C</h5>" +
    "<p>Una integral indefinida da infinitas funciones; para quedarte con <b>una</b> hace falta un dato: «F(x₀) = y₀» (o «la curva pasa por (x₀, y₀)»). Receta fija de tres pasos: (1) halla una primitiva y escribe F(x) + C; (2) sustituye x = x₀ e iguala a y₀; (3) despeja C y escribe la F completa. En el simulador, el botón «Ajustar C» hace exactamente ese paso.</p>" +
    ejemplo("Hallar C",
      "Halla la primitiva F de f(x) = 6x² − 4x + 1 que cumple F(1) = 3.",
      ["<b>Primitiva general:</b> F(x) = 2x³ − 2x² + x + C.",
       "<b>Condición:</b> F(1) = 2 − 2 + 1 + C = 1 + C = 3 ⟹ <b>C = 2</b>.",
       "<b>Resultado:</b> F(x) = 2x³ − 2x² + x + 2.",
       "<b>Comprobación derivando:</b> F′(x) = 6x² − 4x + 1 ✓ y F(1) = 2 − 2 + 1 + 2 = 3 ✓."]) +
    ejemplo("Una función a partir de su segunda derivada",
      "Halla f sabiendo que f″(x) = 6x − 2, f′(0) = 1 y f(0) = 3.",
      ["Una integral por cada derivada: f′(x) = ∫(6x − 2)dx = 3x² − 2x + C₁. Como f′(0) = 1 ⟹ C₁ = 1, luego f′(x) = 3x² − 2x + 1.",
       "f(x) = ∫(3x² − 2x + 1)dx = x³ − x² + x + C₂. Como f(0) = 3 ⟹ C₂ = 3.",
       "<b>f(x) = x³ − x² + x + 3.</b> Comprobación: f′(0) = 1 ✓, f″ = 6x − 2 ✓, f(0) = 3 ✓."]) +
    "<h5>Comprobar derivando: tu mejor aliado</h5>" +
    "<p>A diferencia de otros apartados, aquí <b>siempre puedes saber si has acertado</b>: deriva tu resultado y debe salir el integrando. Es un chequeo de 20 segundos que en la EvAU separa un 10 de un 7. Si tu resultado lleva una constante C, su derivada no la tiene: ignórala al derivar.</p>" +
    ojo("La integral ∫(1/x)dx = ln|x| + C se cumple <b>en cada intervalo donde x no se anula</b> (x &gt; 0 o x &lt; 0). Como x = 0 parte el dominio en dos, la constante C puede ser distinta a cada lado. Para la EvAU basta con escribir ln|x|.");

  // ---------------------------------------------------------------- 2. Inmediatas
  secciones[1] =
    "<h5>La tabla completa que debes saber de memoria</h5>" +
    "<p>Cada fila de la tabla de derivadas leída al revés es una integral. Esta es la lista mínima para la EvAU; la columna de la derecha es la versión «compuesta», cuando en lugar de x hay una función u(x) y aparece su derivada u′(x) multiplicando.</p>" +
    tabla(["Integral básica", "Versión compuesta (u = u(x))"], [
      ["∫xⁿdx = xⁿ⁺¹/(n+1) + C  (n ≠ −1)", "∫u′·uⁿdx = uⁿ⁺¹/(n+1) + C"],
      ["∫(1/x)dx = ln|x| + C", "∫(u′/u)dx = ln|u| + C"],
      ["∫eˣdx = eˣ + C", "∫u′·eᵘdx = eᵘ + C"],
      ["∫aˣdx = aˣ/ln a + C", "∫u′·aᵘdx = aᵘ/ln a + C"],
      ["∫cos x dx = sen x + C", "∫u′·cos u dx = sen u + C"],
      ["∫sen x dx = −cos x + C", "∫u′·sen u dx = −cos u + C"],
      ["∫(1/cos²x)dx = tg x + C", "∫(u′/cos²u)dx = tg u + C"],
      ["∫1/(1+x²)dx = arctg x + C", "∫u′/(1+u²)dx = arctg u + C"],
      ["∫1/√(1−x²)dx = arcsen x + C", "∫u′/√(1−u²)dx = arcsen u + C"]
    ]) +
    "<p>Las potencias con exponente fraccionario o negativo se reescriben antes de integrar: √x = x<sup>1/2</sup>, 1/x³ = x<sup>−3</sup>, 1/∛x = x<sup>−1/3</sup>. Los cocientes con un solo término abajo se separan: (x² + 1)/x = x + 1/x.</p>" +
    ejemplo("Reescribir antes de integrar",
      "Calcula ∫(√x + 3/x² − 5/x)dx.",
      ["Se pasa todo a potencias: √x = x<sup>1/2</sup> y 3/x² = 3x<sup>−2</sup>.",
       "∫x<sup>1/2</sup>dx = x<sup>3/2</sup>/(3/2) = (2/3)x<sup>3/2</sup>.  ∫3x<sup>−2</sup>dx = 3·x<sup>−1</sup>/(−1) = −3/x.  ∫(−5/x)dx = −5 ln|x|.",
       "<b>Resultado:</b> (2/3)x√x − 3/x − 5 ln|x| + C."]) +
    "<h5>Integrales de tipo compuesto: reconoce «la derivada fuera»</h5>" +
    "<p>La mayoría de integrales «inmediatas» de la EvAU no lo son a primera vista: la clave es mirar si el integrando contiene una función <b>u(x) y, multiplicando, su derivada u′(x)</b> (o un múltiplo constante de ella). Tres preguntas rápidas: ¿hay un cociente cuyo numerador es la derivada del denominador? (⟹ logaritmo). ¿Hay una potencia de algo multiplicada por la derivada de ese algo? (⟹ potencia). ¿Hay eᵘ, sen u o cos u multiplicados por u′? (⟹ la función «igual».)</p>" +
    ejemplo("f′·fⁿ: potencia de algo por su derivada",
      "Calcula ∫x²(x³ + 5)⁴dx.",
      ["Dentro de la potencia está u = x³ + 5, cuya derivada es u′ = 3x². En el integrando hay x², que es u′/3: falta un 3.",
       "Se compensa multiplicando y dividiendo por 3: ∫x²(x³+5)⁴dx = (1/3)∫3x²(x³+5)⁴dx = (1/3)·(x³+5)⁵/5.",
       "<b>Resultado:</b> (x³ + 5)⁵/15 + C.  <b>Comprobación:</b> derivada = (1/15)·5(x³+5)⁴·3x² = x²(x³+5)⁴ ✓."]) +
    ejemplo("f′/f: logaritmo",
      "Calcula ∫(2x + 3)/(x² + 3x − 1)dx.",
      ["El denominador es u = x² + 3x − 1 y u′ = 2x + 3 es exactamente el numerador.",
       "<b>Resultado:</b> ln|x² + 3x − 1| + C. Si el numerador fuera 4x + 6, sería 2·ln|…|."]) +
    ejemplo("f′·eᶠ y el ajuste de la constante",
      "Calcula ∫x·e<sup>−x²</sup>dx.",
      ["u = −x² ⟹ u′ = −2x. En el integrando hay x = (−1/2)·u′.",
       "∫x·e<sup>−x²</sup>dx = (−1/2)∫(−2x)·e<sup>−x²</sup>dx = (−1/2)·e<sup>−x²</sup>.",
       "<b>Resultado:</b> −½·e<sup>−x²</sup> + C."]) +
    ejemplo("Argumento lineal: dividir entre el coeficiente",
      "Calcula ∫cos(3x)dx y ∫1/(1 + 4x²)dx.",
      ["Con argumento 3x, u′ = 3: ∫cos(3x)dx = (1/3)·sen(3x) + C. Regla general: ∫f(ax + b)dx = F(ax + b)/a.",
       "1 + 4x² = 1 + (2x)², con u = 2x y u′ = 2: ∫1/(1+(2x)²)dx = (1/2)·arctg(2x) + C."]) +
    ejemplo("Tres que parecen difíciles y no lo son",
      "Calcula ∫(ln x)²/x dx, ∫1/(x·ln x)dx y ∫x/√(1 − x²)dx.",
      ["<b>(ln x)²/x:</b> u = ln x, u′ = 1/x. Es u²·u′ ⟹ (ln x)³/3 + C.",
       "<b>1/(x ln x):</b> = (1/x)/(ln x) = u′/u con u = ln x ⟹ ln|ln x| + C.",
       "<b>x/√(1−x²):</b> u = 1 − x², u′ = −2x; x = (−1/2)u′ ⟹ (−1/2)·u<sup>1/2</sup>/(1/2) = −√(1−x²) + C."]) +
    ojo("Solo se puede «compensar» con una <b>constante</b>. Si en vez de x² te falta una x, no vale multiplicar y dividir por x: sacar una variable de la integral es un error grave. Si falta algo que no es constante, el método es otro (cambio de variable o partes).");

  // ---------------------------------------------------------------- 3. Cambio de variable
  secciones[2] =
    "<h5>Cómo elegir u (y cómo deshacer el cambio)</h5>" +
    "<p>Cuando el integrando no es de tipo inmediato conviene hacer el cambio explícito. Cuatro pasos siempre iguales: <b>(1)</b> elige u = g(x); <b>(2)</b> calcula du = g′(x)dx; <b>(3)</b> reescribe <b>toda</b> la integral en u (no debe quedar ninguna x; si queda alguna, despeja x en función de u); <b>(4)</b> integra y <b>deshaz el cambio</b>, volviendo a x. Candidatas habituales a u: lo que está dentro de una raíz o de una potencia, el exponente de e, ln x, √x, eˣ, sen x o cos x.</p>" +
    ejemplo("Cuando sobra una x: se despeja",
      "Calcula ∫x·√(x + 1)dx.",
      ["u = x + 1 ⟹ du = dx y x = u − 1.",
       "∫(u − 1)·u<sup>1/2</sup>du = ∫(u<sup>3/2</sup> − u<sup>1/2</sup>)du = (2/5)u<sup>5/2</sup> − (2/3)u<sup>3/2</sup>.",
       "Se deshace u = x + 1: <b>(2/5)(x+1)<sup>5/2</sup> − (2/3)(x+1)<sup>3/2</sup> + C</b>."]) +
    ejemplo("Cambio con exponencial: u = eˣ",
      "Calcula ∫1/(eˣ + 1)dx.",
      ["u = eˣ ⟹ du = eˣdx = u·dx ⟹ dx = du/u.",
       "∫1/(u + 1)·(1/u)du = ∫1/(u(u + 1))du. Es racional; se descompone: 1/(u(u+1)) = 1/u − 1/(u+1).",
       "∫ = ln|u| − ln|u + 1| = ln(eˣ) − ln(eˣ + 1) = x − ln(eˣ + 1).",
       "<b>Resultado:</b> x − ln(eˣ + 1) + C. <b>Comprobación:</b> derivada = 1 − eˣ/(eˣ+1) = 1/(eˣ+1) ✓."]) +
    ejemplo("Cambio con raíz: u = √x",
      "Calcula ∫1/(√x·(1 + √x))dx para x &gt; 0.",
      ["u = √x ⟹ x = u² ⟹ dx = 2u du.",
       "∫1/(u(1+u))·2u du = ∫2/(1+u)du = 2 ln(1 + u).",
       "<b>Resultado:</b> 2·ln(1 + √x) + C (no hace falta valor absoluto: 1 + √x &gt; 0)."]) +
    ejemplo("Cambio trigonométrico sencillo",
      "Calcula ∫cos x/(1 + sen²x)dx.",
      ["u = sen x ⟹ du = cos x dx. La integral queda ∫1/(1 + u²)du = arctg u.",
       "<b>Resultado:</b> arctg(sen x) + C."]) +
    ojo("<b>Nunca dejes la respuesta en u.</b> El resultado de una integral indefinida debe estar en la variable original. Y si el cambio deja una x suelta que no sabes pasar a u, el cambio elegido no era bueno: prueba con otro.") +
    "<p>Cuando se mezclan métodos —por ejemplo, un cambio que lleva a una integral por partes— no es un truco: es lo normal en la parte difícil de la EvAU. Ejemplo típico: ∫e<sup>√x</sup>dx. Con u = √x (x = u², dx = 2u du) se llega a ∫2u·eᵘdu, que es por partes: 2(u − 1)eᵘ. Resultado: <b>2(√x − 1)e<sup>√x</sup> + C</b>.</p>";

  // ---------------------------------------------------------------- 4. Por partes
  secciones[3] =
    "<h5>Cómo elegir u: la regla ALPES</h5>" +
    "<p>La fórmula ∫u·dv = u·v − ∫v·du solo ayuda si la integral nueva ∫v·du es <b>más fácil</b> que la de partida. Para acertar casi siempre, ordena los tipos de función del integrando según <b>ALPES</b>: <b>A</b>rcos (arctg, arcsen), <b>L</b>ogaritmos, <b>P</b>olinomios, <b>E</b>xponenciales, <b>S</b>eno y coseno. u es el que aparezca <b>antes</b> en la lista; el resto (con dx) es dv. Razón: arcos y logaritmos se «simplifican» al derivar (dan funciones racionales) y los polinomios bajan de grado; en cambio eˣ, sen y cos se integran sin complicarse. Prueba el simulador: elige mal a propósito y mira cómo se estropea.</p>" +
    w("m2_partes") +
    ejemplo("Un logaritmo por un polinomio",
      "Calcula ∫x·ln x dx.",
      ["ALPES: L (logaritmo) antes que P (polinomio) ⟹ u = ln x, dv = x dx.",
       "du = dx/x y v = x²/2.",
       "∫x·ln x dx = (x²/2)·ln x − ∫(x²/2)(1/x)dx = (x²/2)·ln x − ∫(x/2)dx.",
       "<b>Resultado:</b> (x²/2)·ln x − x²/4 + C."]) +
    ejemplo("Partes reiteradas",
      "Calcula ∫x²·eˣdx.",
      ["u = x², dv = eˣdx ⟹ du = 2x dx, v = eˣ: ∫ = x²eˣ − 2∫x·eˣdx.",
       "La integral que queda sigue necesitando partes (u = x, dv = eˣdx): ∫x·eˣdx = x·eˣ − eˣ.",
       "Total: x²eˣ − 2(x·eˣ − eˣ) = eˣ(x² − 2x + 2).",
       "<b>Resultado:</b> eˣ(x² − 2x + 2) + C. Cada pasada baja un grado: un polinomio de grado n necesita n pasadas."]) +
    ejemplo("Atajo para polinomio × (exponencial o seno/coseno): la tabla",
      "Calcula ∫x²·sen x dx sin repetir razonamientos.",
      ["Se escriben dos columnas: derivadas sucesivas del polinomio (x², 2x, 2, 0) e integrales sucesivas de sen x (−cos x, −sen x, cos x…).",
       "Se multiplican en diagonal alternando signos + − + …: (x²)(−cos x) − (2x)(−sen x) + (2)(cos x).",
       "<b>Resultado:</b> −x²cos x + 2x·sen x + 2cos x + C."]) +
    ejemplo("Partes con dv = dx",
      "Calcula ∫ln x dx y ∫arctg x dx.",
      ["Cuando solo hay una función, se toma dv = dx (v = x) y u = esa función.",
       "<b>ln x:</b> u = ln x, du = dx/x ⟹ x·ln x − ∫dx = x·ln x − x + C.",
       "<b>arctg x:</b> u = arctg x, du = dx/(1+x²) ⟹ x·arctg x − ∫x/(1+x²)dx = x·arctg x − ½ln(1 + x²) + C."]) +
    ejemplo("Partes cíclicas: la integral reaparece",
      "Calcula I = ∫eˣ·sen x dx.",
      ["u = sen x, dv = eˣdx ⟹ I = eˣsen x − ∫eˣcos x dx.",
       "Segunda pasada, <b>manteniendo el criterio</b> (u = cos x, dv = eˣdx): ∫eˣcos x dx = eˣcos x + ∫eˣsen x dx = eˣcos x + I.",
       "Sustituyendo: I = eˣsen x − eˣcos x − I ⟹ 2I = eˣ(sen x − cos x).",
       "<b>Resultado:</b> I = ½eˣ(sen x − cos x) + C. <b>Comprobación:</b> I′ = ½eˣ(sen x − cos x) + ½eˣ(cos x + sen x) = eˣ sen x ✓."]) +
    ojo("En la cíclica, si en la segunda pasada cambias el criterio (por ejemplo, pasas de u = sen x a u = eˣ), deshaces lo hecho y llegas a «I = I», que no dice nada. Y no olvides <b>despejar I</b> y dividir entre 2: el ½ del resultado es lo que más se pierde.");

  B.parte.m2t11a = { secciones: secciones };
})(window);
