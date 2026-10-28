/* ============================================================
   Química II · ampliaciones
   Tema 6: Equilibrio químico (parte A)
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(nombre, ref) { return H.w(nombre, ref && "quimica2/t6/" + ref); }

  // ============================================================
  // TEORÍA (se añade al final de cada sección existente)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Cómo se ve un equilibrio</h5>" +
    "<p>Mira la gráfica: partimos de 1 mol de H₂ y 1 mol de I₂ (solo reactivos). Al principio la reacción directa es rápida, porque hay mucho reactivo, y la inversa casi no existe, porque aún no hay HI. A medida que se forma HI, la directa se ralentiza y la inversa se acelera… hasta que <b>las dos velocidades se igualan</b>. Desde ese momento, las concentraciones se quedan quietas.</p>" +
    w("eqtiempo") +
    "<p>Tres ideas que conviene grabarse:</p>" +
    "<ul><li>Es un equilibrio <b>dinámico</b>: las moléculas siguen reaccionando en ambos sentidos, pero a la misma velocidad, así que no se nota nada por fuera.</li>" +
    "<li>Se llega al <b>mismo equilibrio</b> partiendo de reactivos o de productos (a la misma temperatura): compruébalo con los dos botones.</li>" +
    "<li>En el equilibrio las concentraciones son <b>constantes</b>, no <em>iguales</em>. Es un error muy común pensar que [reactivos] = [productos].</li></ul>" +
    ejemplo("Un equilibrio que se ve", "El tetraóxido de dinitrógeno (N₂O₄, incoloro) y el dióxido de nitrógeno (NO₂, pardo) se interconvierten: N₂O₄ ⇌ 2 NO₂. ¿Cómo puedes «ver» el equilibrio?", [
      "Un tubo cerrado con la mezcla tiene un color pardo <b>constante</b> mientras no lo perturbes: la proporción de NO₂ no cambia, aunque las moléculas sigan reaccionando.",
      "Si lo calientas el color se oscurece (se forma más NO₂); si lo enfrías se aclara (se forma más N₂O₄).",
      "Es la prueba visual de que el equilibrio <b>se desplaza</b> cuando cambian las condiciones. Más abajo lo simulas tú."
    ]);

  secciones[1] =
    "<h5>Cómo escribir K<sub>c</sub> sin fallar</h5>" +
    "<p>Siempre igual: <b>productos arriba, reactivos abajo</b>, cada concentración elevada a su <b>coeficiente estequiométrico</b>. Solo cuentan las sustancias que están en disolución o en fase gas (más abajo verás por qué los sólidos no aparecen).</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>N₂ + 3 H₂ ⇌ 2 NH₃</td><td>K<sub>c</sub> = " + fr("[NH₃]²", "[N₂]·[H₂]³") + "</td></tr>" +
    "<tr><td>H₂ + I₂ ⇌ 2 HI</td><td>K<sub>c</sub> = " + fr("[HI]²", "[H₂]·[I₂]") + "</td></tr>" +
    "<tr><td>2 SO₂ + O₂ ⇌ 2 SO₃</td><td>K<sub>c</sub> = " + fr("[SO₃]²", "[SO₂]²·[O₂]") + "</td></tr>" +
    "</tbody></table>" +
    "<h5>Qué te dice el valor de K</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>K ≫ 1</td><td>En el equilibrio hay sobre todo <b>productos</b>: la reacción está muy desplazada a la derecha.</td></tr>" +
    "<tr><td>K ≈ 1</td><td>Hay cantidades comparables de reactivos y productos.</td></tr>" +
    "<tr><td>K ≪ 1</td><td>En el equilibrio hay sobre todo <b>reactivos</b>: casi no se forma producto.</td></tr>" +
    "</tbody></table>" +
    "<p>Pero cuidado: K habla de <em>cuánto</em> producto hay al final, no de <em>lo rápido</em> que se llega. Una reacción con K enorme puede ser lentísima.</p>" +
    ejemplo("Ejemplo resuelto: calcular K<sub>c</sub>", "En el equilibrio 2 SO₂ + O₂ ⇌ 2 SO₃ las concentraciones son [SO₂] = 0,20 M, [O₂] = 0,10 M y [SO₃] = 0,40 M. Calcula K<sub>c</sub>.", [
      "Escribimos la expresión: K<sub>c</sub> = " + fr("[SO₃]²", "[SO₂]²·[O₂]"),
      "Sustituimos: K<sub>c</sub> = " + fr("0,40²", "0,20²·0,10") + " = " + fr("0,16", "0,04·0,10") + " = " + fr("0,16", "0,004"),
      "<b>K<sub>c</sub> = 40</b> (mol/L)⁻¹. Es mayor que 1: hay más producto que reactivo."
    ]) +
    "<h5>De K<sub>c</sub> a K<sub>p</sub></h5>" +
    "<p>Para gases, la presión parcial de cada uno es pᵢ = cᵢ·R·T. Al sustituir en K<sub>p</sub> sale la relación que ya conoces, K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup>, donde Δn es la suma de coeficientes de los <b>gases</b> productos menos la de los gases reactivos. Con R = 0,082 atm·L/(mol·K) y T en kelvin:</p>" +
    ejemplo("Ejemplo resuelto: K<sub>p</sub>", "Para N₂O₄ ⇌ 2 NO₂ a 298 K, K<sub>c</sub> = 4,6·10⁻³. Calcula K<sub>p</sub>.", [
      "Δn = 2 − 1 = +1",
      "RT = 0,082 · 298 = 24,4 atm·L/mol",
      "K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup> = 4,6·10⁻³ · 24,4 ≈ <b>0,112</b>",
      "Si Δn fuera 0, K<sub>p</sub> = K<sub>c</sub> (como en H₂ + I₂ ⇌ 2 HI): las unidades de presión y de concentración se cancelan."
    ]) +
    ojo("T siempre en kelvin (K = °C + 273) y R con las unidades que correspondan. Y no escribas K<sub>p</sub> = K<sub>c</sub> por inercia: solo es verdad si Δn = 0.");

  secciones[2] =
    ejemplo("Ejemplo resuelto: ¿hacia dónde va?", "A cierta temperatura, K<sub>c</sub> = 54 para H₂ + I₂ ⇌ 2 HI. En un instante las concentraciones son [H₂] = 0,50 M, [I₂] = 0,50 M y [HI] = 2,0 M. ¿Está en equilibrio? Si no, ¿hacia dónde evoluciona?", [
      "Calculamos Q con la misma fórmula que K<sub>c</sub>: Q = " + fr("[HI]²", "[H₂]·[I₂]") + " = " + fr("2,0²", "0,50·0,50") + " = " + fr("4", "0,25") + " = <b>16</b>",
      "Comparamos: Q = 16 &lt; K<sub>c</sub> = 54",
      "Q es menor que K: faltan productos para llegar al equilibrio → el sistema evoluciona <b>hacia la derecha</b> (se forma más HI)."
    ]) +
    "<p>La idea de fondo: <b>K es la «meta»</b> y Q es dónde estás ahora. Si estás por debajo, avanzas hacia los productos; si te has pasado, retrocedes. Esta idea te va a explicar todo Le Chatelier en el apartado siguiente.</p>";

  secciones[3] =
    "<h5>Le Chatelier sin memorizar: usa Q y K</h5>" +
    "<p>No hace falta aprenderse una lista de efectos: casi todo sale de comparar Q con K justo después de perturbar.</p>" +
    "<ul><li><b>Cambias una concentración</b> (añades o quitas algo): K no cambia, pero Q sí. Si añades reactivo, Q baja por debajo de K → derecha.</li>" +
    "<li><b>Cambias el volumen o la presión</b>: cambian las concentraciones de todos los gases, y Q cambia salvo que Δn = 0.</li>" +
    "<li><b>Cambias la temperatura</b>: aquí cambia <b>K</b> (¡es lo único que la modifica!), y Q se queda como estaba.</li></ul>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Añadir reactivo o retirar producto</td><td>Q &lt; K → <b>derecha</b></td></tr>" +
    "<tr><td>Añadir producto o retirar reactivo</td><td>Q &gt; K → <b>izquierda</b></td></tr>" +
    "<tr><td>Comprimir (↑ presión)</td><td>Hacia el lado con <b>menos moles de gas</b> (si Δn = 0, no se desplaza)</td></tr>" +
    "<tr><td>Expandir (↓ presión)</td><td>Hacia el lado con <b>más moles de gas</b></td></tr>" +
    "<tr><td>Subir T, reacción exotérmica</td><td>K baja → <b>izquierda</b></td></tr>" +
    "<tr><td>Subir T, reacción endotérmica</td><td>K sube → <b>derecha</b></td></tr>" +
    "<tr><td>Añadir un catalizador</td><td>No cambia K ni Q: <b>no desplaza</b>, solo llega antes al equilibrio</td></tr>" +
    "<tr><td>Añadir un gas inerte (V y T constantes)</td><td>Las concentraciones no cambian: <b>no desplaza</b></td></tr>" +
    "</tbody></table>" +
    "<p>Ahora experimenta tú. Prueba a perturbar cada reacción y, <b>antes de mirar</b>, predice hacia dónde irá. Fíjate también en lo que marca el indicador Q/K<sub>c</sub>: es la explicación de todo.</p>" +
    w("equilibrio") +
    ojo("el catalizador acelera la reacción directa y la inversa por igual. Cambia <em>cuándo</em> se llega al equilibrio, no <em>cómo es</em> el equilibrio. Si en un problema aparece un catalizador, ¡no desplaza nada!");

  // ============================================================
  // SECCIONES NUEVAS
  // ============================================================
  var nuevas = [
    {
      h: "5. Equilibrios heterogéneos y operaciones con K",
      html:
        "<h5>Los sólidos y líquidos puros no figuran en K</h5>" +
        "<p>En un equilibrio <b>heterogéneo</b> hay sustancias en distintas fases. Un sólido o un líquido puro tiene una concentración constante (depende de su densidad, no de cuánto haya), así que se «absorbe» en el valor de K y <b>no se escribe</b>.</p>" +
        ejemplo("Dos equilibrios heterogéneos", "Escribe K<sub>c</sub> y K<sub>p</sub> para CaCO₃(s) ⇌ CaO(s) + CO₂(g), y K<sub>c</sub> para C(s) + CO₂(g) ⇌ 2 CO(g).", [
          "CaCO₃ y CaO son sólidos: no aparecen. Solo queda el gas: <b>K<sub>c</sub> = [CO₂]</b> y <b>K<sub>p</sub> = p(CO₂)</b>.",
          "En el segundo, C es sólido y no aparece: <b>K<sub>c</sub> = " + fr("[CO]²", "[CO₂]") + "</b>",
          "Para K<sub>p</sub> solo cuentan los <em>gases</em>, y Δn también: en el segundo, Δn = 2 − 1 = +1."
        ]) +
        "<h5>Operar con constantes de equilibrio</h5>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Inviertes la reacción</td><td>K′ = " + fr("1", "K") + "</td></tr>" +
        "<tr><td>Multiplicas los coeficientes por n</td><td>K′ = Kⁿ</td></tr>" +
        "<tr><td>Sumas dos reacciones</td><td>K = K₁ · K₂</td></tr>" +
        "</tbody></table>" +
        ejemplo("Ejemplo resuelto", "Para N₂ + 3 H₂ ⇌ 2 NH₃, K<sub>c</sub> = 0,08. Calcula la K<sub>c</sub> de (a) 2 NH₃ ⇌ N₂ + 3 H₂ y (b) ½ N₂ + 3/2 H₂ ⇌ NH₃.", [
          "(a) Es la reacción inversa: K′ = 1/0,08 = <b>12,5</b>",
          "(b) Todos los coeficientes divididos entre 2, es decir, elevados a ½: K′ = 0,08<sup>1/2</sup> = √0,08 ≈ <b>0,283</b>"
        ]),
    },
    {
      h: "6. La tabla ICE paso a paso",
      html:
        "<p>Es la herramienta que resuelve casi todos los problemas de equilibrio de Selectividad. ICE significa <b>I</b>nicial, <b>C</b>ambio, <b>E</b>quilibrio.</p>" +
        "<ol><li>Escribe la reacción ajustada y la expresión de K.</li><li>Haz la tabla con las cantidades <b>iniciales</b>.</li><li>En la fila de <b>cambio</b> pon −a·x para los reactivos y +b·x para los productos (a y b son los coeficientes; x es lo que avanza la reacción).</li><li>La fila de <b>equilibrio</b> es inicial + cambio.</li><li>Sustituye en K (¡con concentraciones, no con moles!) y resuelve x.</li><li>Comprueba que ninguna cantidad sale negativa y que K sale bien.</li></ol>" +
        ejemplo("Ejemplo 1: calcular el equilibrio a partir de K", "En un recipiente de 1 L se introducen 1 mol de H₂ y 1 mol de I₂ a 700 K, donde K<sub>c</sub> = 54. Calcula las concentraciones en el equilibrio.", [
          "Tabla ICE (en mol/L, porque V = 1 L):" + tabla(["", "H₂", "I₂", "HI"], [["Inicial", "1", "1", "0"], ["Cambio", "−x", "−x", "+2x"], ["Equilibrio", "1 − x", "1 − x", "2x"]], "ice"),
          "K<sub>c</sub> = " + fr("(2x)²", "(1 − x)(1 − x)") + " = 54  →  " + fr("2x", "1 − x") + " = √54 = 7,35 (cuadrado perfecto: sacamos raíz)",
          "2x = 7,35 − 7,35x  →  x = " + fr("7,35", "9,35") + " = 0,786",
          "<b>[H₂] = [I₂] = 1 − 0,786 = 0,214 mol/L</b> · <b>[HI] = 2·0,786 = 1,57 mol/L</b>",
          "Comprobación: " + fr("1,57²", "0,214²") + " = " + fr("2,47", "0,0458") + " ≈ 54 ✓"
        ]) +
        ejemplo("Ejemplo 2: con grado de disociación (α)", "En un recipiente de 10 L se introduce 1,0 mol de PCl₅ y se calienta. En el equilibrio se ha disociado el 40 % (α = 0,4): PCl₅ ⇌ PCl₃ + Cl₂. Calcula K<sub>c</sub>.", [
          "El grado de disociación α es la fracción de moles iniciales que se han disociado: moles disociados = n₀·α = 1,0·0,4 = 0,4 mol.",
          "Tabla ICE en <b>moles</b>:" + tabla(["", "PCl₅", "PCl₃", "Cl₂"], [["Inicial", "1,0", "0", "0"], ["Cambio", "−0,4", "+0,4", "+0,4"], ["Equilibrio", "0,6", "0,4", "0,4"], ["[ ] = n/10 L", "0,06", "0,04", "0,04"]], "ice"),
          "K<sub>c</sub> = " + fr("[PCl₃][Cl₂]", "[PCl₅]") + " = " + fr("0,04·0,04", "0,06") + " ≈ <b>0,0267</b>",
          "Ojo: aquí Δn = +1, así que el <b>volumen sí importa</b>. Si hubieras usado moles en vez de concentraciones saldría otro valor."
        ]) +
        ejemplo("Ejemplo 3: cuando sale una ecuación de segundo grado", "En un recipiente de 1 L se introduce N₂O₄ con concentración inicial 0,10 M a 298 K, donde K<sub>c</sub> = 4,6·10⁻³ para N₂O₄ ⇌ 2 NO₂. Calcula [NO₂] y α en el equilibrio.", [
          "Tabla ICE (mol/L):" + tabla(["", "N₂O₄", "NO₂"], [["Inicial", "0,10", "0"], ["Cambio", "−x", "+2x"], ["Equilibrio", "0,10 − x", "2x"]], "ice"),
          "K<sub>c</sub> = " + fr("(2x)²", "0,10 − x") + " = 4,6·10⁻³  →  4x² = 4,6·10⁻³(0,10 − x)  →  4x² + 4,6·10⁻³x − 4,6·10⁻⁴ = 0",
          "Fórmula de la ecuación de 2º grado, nos quedamos con la raíz positiva: x = " + fr("−4,6·10⁻³ + √((4,6·10⁻³)² + 16·4,6·10⁻⁴)", "8") + " ≈ 0,0102",
          "<b>[NO₂] = 2x ≈ 0,0203 mol/L</b> · [N₂O₄] = 0,10 − 0,0102 ≈ 0,0898 mol/L",
          "<b>α = x/0,10 ≈ 0,10</b>, es decir, un 10 % del N₂O₄ se ha disociado."
        ]) +
        ojo("a veces se puede <em>aproximar</em> 0,10 − x ≈ 0,10 para evitar la ecuación de 2º grado, pero solo si x es menos del 5 % del valor inicial. Aquí x es el 10 %, así que habría que resolverla entera. Si dudas, resuelve la cuadrática: nunca falla."),
    },
    {
      h: "7. El equilibrio en la industria: la síntesis del amoniaco",
      html:
        "<p>El proceso Haber-Bosch fabrica amoniaco para fertilizantes: N₂ + 3 H₂ ⇌ 2 NH₃, con ΔH = −92,2 kJ. Es un ejemplo perfecto de cómo Le Chatelier y la cinética compiten entre sí, y una pregunta clásica de examen.</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Presión alta (150–300 atm)</td><td>Δn = −2: la presión desplaza el equilibrio hacia el lado con menos moles de gas, los productos.</td></tr>" +
        "<tr><td>Temperatura baja</td><td>La reacción es exotérmica: bajar T aumenta K y favorece el NH₃. <b>Pero</b> a baja T la reacción es lentísima (Tema 5).</td></tr>" +
        "<tr><td>Temperatura «intermedia» (400–500 °C)</td><td>Compromiso: se pierde algo de rendimiento en el equilibrio a cambio de una velocidad razonable.</td></tr>" +
        "<tr><td>Catalizador de hierro</td><td>Acelera la reacción sin cambiar K: permite no tener que subir más la temperatura.</td></tr>" +
        "<tr><td>Se licúa y retira el NH₃</td><td>Al quitar producto, Q &lt; K y el equilibrio se desplaza a la derecha: se reciclan N₂ y H₂ sin reaccionar.</td></tr>" +
        "</tbody></table>" +
        "<p>La idea que se pide en los exámenes: <b>termodinámica</b> (el equilibrio, que quiere T baja) y <b>cinética</b> (la velocidad, que quiere T alta) se enfrentan, y la industria busca el mejor compromiso.</p>"
    },
    {
      h: "8. ¿Qué falla aquí? Errores típicos de equilibrio",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "9. Autocomprobación del tema",
      html: "<p>Ocho preguntas para saber si el tema está en su sitio y un juego de parejas para fijar las ideas clave.</p>" + w("quiz", "quiz1") + w("emparejar", "emp1")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe, para CaCO₃(s) ⇌ CaO(s) + CO₂(g): K<sub>c</sub> = [CaO][CO₂] / [CaCO₃]. ¿Qué error ha cometido?",
          op: ["Ha incluido sólidos puros, que no aparecen en K", "Ha invertido el cociente", "Le falta elevar al cuadrado", "Nada, está bien"], ok: 0,
          porque: "Los sólidos y líquidos puros tienen concentración constante y no figuran en K. Lo correcto es K<sub>c</sub> = [CO₂]." },
        { q: "Para N₂ + 3 H₂ ⇌ 2 NH₃ escribe K<sub>c</sub> = [NH₃] / ([N₂][H₂]). ¿Qué falta?",
          op: ["Nada, es correcto", "Los exponentes: cada concentración va elevada a su coeficiente estequiométrico", "Sumar en vez de multiplicar", "Poner los reactivos arriba"], ok: 1,
          porque: "K<sub>c</sub> = [NH₃]² / ([N₂]·[H₂]³): el 2 y el 3 son los coeficientes de la reacción ajustada." },
        { q: "«La síntesis de NH₃ es exotérmica; al subir la temperatura el equilibrio se desplaza hacia el NH₃ porque la reacción necesita más energía.» ¿Es correcto?",
          op: ["Sí", "No: en una reacción exotérmica, subir T disminuye K y desplaza el equilibrio hacia los reactivos", "No: la temperatura nunca influye", "Sí, pero solo a presión alta"], ok: 1,
          porque: "Subir T favorece el sentido endotérmico, que aquí es la reacción inversa (descomposición del NH₃). K<sub>c</sub> baja y el rendimiento en NH₃ también." },
        { q: "«Añadimos un catalizador, así que el equilibrio se desplaza hacia los productos.» ¿Qué tiene de erróneo?",
          op: ["Nada", "El catalizador acelera por igual la reacción directa y la inversa: no cambia K ni la posición del equilibrio", "El catalizador solo actúa si sube la presión", "El catalizador consume parte de los reactivos"], ok: 1,
          porque: "Un catalizador reduce la energía de activación en ambos sentidos. El equilibrio se alcanza antes, pero con las mismas concentraciones." },
        { q: "«Para cualquier reacción en fase gas, K<sub>p</sub> = K<sub>c</sub>.» ¿Es cierto?",
          op: ["Sí, siempre", "No: K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>, y solo coinciden si Δn = 0", "Solo a 25 °C", "Solo si hay más productos que reactivos"], ok: 1,
          porque: "Si Δn ≠ 0, el factor (RT)<sup>Δn</sup> no vale 1. Por ejemplo, para N₂ + 3H₂ ⇌ 2NH₃, Δn = −2." },
        { q: "En N₂ + 3 H₂ ⇌ 2 NH₃, a V y T constantes añadimos helio. Un alumno dice: «aumenta la presión total, así que se desplaza hacia menos moles de gas». ¿Qué falla?",
          op: ["Nada", "El helio no reacciona y V no cambia: las concentraciones de los reactivos y productos siguen igual, y Q = K", "El helio es un reactivo", "El helio baja la temperatura"], ok: 1,
          porque: "A volumen constante, el gas inerte aumenta la presión total pero no las concentraciones (ni las presiones parciales) de las sustancias que reaccionan. No hay desplazamiento." },
        { q: "«Como K<sub>c</sub> = 54, la reacción es muy rápida.» ¿Qué error hay?",
          op: ["Ninguno", "K<sub>c</sub> habla de las cantidades en el equilibrio, no de la velocidad (cinética)", "K<sub>c</sub> debería ser menor que 1", "Falta multiplicar por RT"], ok: 1,
          porque: "K dice hasta dónde llega la reacción, no cuánto tarda. Hay reacciones con K enorme y muy lentas." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Una reacción tiene K<sub>c</sub> = 2·10⁻⁵ a cierta T. ¿Qué significa?",
          op: ["En el equilibrio predominan los reactivos", "En el equilibrio predominan los productos", "La reacción es muy rápida", "La reacción no se produce nunca"], ok: 0,
          porque: "K muy pequeña: el numerador (productos) es diminuto frente al denominador (reactivos). Hay sobre todo reactivos al llegar al equilibrio." },
        { q: "Para N₂ + 3 H₂ ⇌ 2 NH₃, ¿cuánto vale Δn en K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>?",
          op: ["+2", "−2", "−4", "0"], ok: 1,
          porque: "Δn = moles de gas de productos − moles de gas de reactivos = 2 − (1 + 3) = −2." },
        { q: "Si en un instante Q &gt; K<sub>c</sub>, el sistema…",
          op: ["Ya está en equilibrio", "Evoluciona hacia los productos", "Evoluciona hacia los reactivos", "No evoluciona porque K cambia"], ok: 2,
          porque: "Q mayor que K significa «demasiado producto»: para llegar a Q = K el sistema retrocede, formando más reactivos." },
        { q: "Si invierto una reacción cuya constante es K, la nueva constante vale…",
          op: ["K", "−K", "1/K", "K²"], ok: 2,
          porque: "Al invertir, productos y reactivos cambian de sitio en la expresión: K′ = 1/K." },
        { q: "Una reacción es endotérmica. Al aumentar la temperatura…",
          op: ["K disminuye y se desplaza hacia los reactivos", "K aumenta y se desplaza hacia los productos", "K no cambia", "Solo cambia la velocidad"], ok: 1,
          porque: "Subir T favorece el sentido que absorbe calor (el endotérmico, hacia los productos). Aumenta K." },
        { q: "En el equilibrio, la velocidad de la reacción directa es…",
          op: ["mayor que la de la inversa", "menor que la de la inversa", "igual que la de la inversa", "cero"], ok: 2,
          porque: "Es un equilibrio dinámico: ambas reacciones continúan, a la misma velocidad. Por eso las concentraciones son constantes." },
        { q: "¿Qué factor es el único que modifica el valor de K<sub>c</sub>?",
          op: ["La concentración de un reactivo", "La presión", "La temperatura", "Un catalizador"], ok: 2,
          porque: "Concentración, presión y volumen desplazan el equilibrio cambiando Q, pero K permanece. Solo la temperatura cambia K." },
        { q: "En H₂ + I₂ ⇌ 2 HI comprimimos el recipiente a temperatura constante. ¿Qué ocurre?",
          op: ["Se forma más HI", "Se forma más H₂ e I₂", "No hay desplazamiento (Δn = 0)", "Cambia K"], ok: 2,
          porque: "Hay 2 moles de gas a cada lado, así que comprimir cambia las concentraciones de todos por igual y Q sigue valiendo K. No hay desplazamiento." }
      ]
    },

    emp1: {
      titulo: "Situación ↔ consecuencia",
      consigna: "Toca una situación de la izquierda y su consecuencia a la derecha.",
      pares: [
        ["Q &lt; K<sub>c</sub>", "Evoluciona hacia los productos (→)"],
        ["Q &gt; K<sub>c</sub>", "Evoluciona hacia los reactivos (←)"],
        ["Q = K<sub>c</sub>", "El sistema está en equilibrio"],
        ["Subir T en una reacción exotérmica", "K<sub>c</sub> disminuye"],
        ["Añadir un catalizador", "No cambia K ni la posición del equilibrio"],
        ["Comprimir con Δn(gas) &lt; 0", "Hacia el lado con menos moles de gas"]
      ]
    }
  };

  // ============================================================
  // EJERCICIOS NUEVOS (nivel 1 ★ · 2 ★★ · 3 ★★★ PAU) con comprobación
  // ============================================================
  var ejercicios = [
    { id: "q1", nivel: 1,
      enunciado: "En un recipiente de 2 L se alcanza el equilibrio H₂ + I₂ ⇌ 2 HI con 0,4 mol de H₂, 0,4 mol de I₂ y 2,4 mol de HI. Calcula K<sub>c</sub>.",
      check: { tipo: "num", etiqueta: "K<sub>c</sub> =", valor: 36 },
      pistas: ["Pasa los moles a concentraciones dividiendo entre 2 L.", "K<sub>c</sub> = [HI]² / ([H₂]·[I₂])."],
      pasos: ["[H₂] = 0,4/2 = 0,2 M · [I₂] = 0,4/2 = 0,2 M · [HI] = 2,4/2 = 1,2 M", "K<sub>c</sub> = " + fr("[HI]²", "[H₂][I₂]") + " = " + fr("1,2²", "0,2·0,2") + " = " + fr("1,44", "0,04") + " = 36"],
      resultado: "K<sub>c</sub> = 36",
      ojo: "En este caso Δn = 0 y el volumen se cancela, pero no lo hagas por costumbre: en otros equilibrios hay que usar concentraciones, no moles." },
    { id: "q2", nivel: 1,
      enunciado: "Para el equilibrio heterogéneo CaCO₃(s) ⇌ CaO(s) + CO₂(g), ¿cuál es la expresión correcta de K<sub>c</sub>?",
      check: { tipo: "opcion", etiqueta: "K<sub>c</sub> =", opciones: ["[CaO][CO₂] / [CaCO₃]", "[CO₂]", "[CO₂] / [CaCO₃]", "[CaO][CO₂]"], ok: 1 },
      pistas: ["¿Qué sustancias están en estado sólido? Esas no aparecen en K."],
      pasos: ["CaCO₃ y CaO son sólidos puros: su concentración es constante y no figura en la expresión.", "Solo queda el gas: K<sub>c</sub> = [CO₂] (y K<sub>p</sub> = p<sub>CO₂</sub>)."],
      resultado: "K<sub>c</sub> = [CO₂]" },
    { id: "q3", nivel: 1,
      enunciado: "Para N₂ + 3 H₂ ⇌ 2 NH₃, K<sub>c</sub> = 0,08 a cierta temperatura. ¿Cuánto vale K<sub>c</sub> para la reacción inversa, 2 NH₃ ⇌ N₂ + 3 H₂?",
      check: { tipo: "num", etiqueta: "K<sub>c</sub>′ =", valor: 12.5 },
      pistas: ["Al invertir una reacción, productos y reactivos cambian de sitio en la expresión de K."],
      pasos: ["K′ = 1/K = 1/0,08 = 12,5"],
      resultado: "K<sub>c</sub>′ = 12,5" },
    { id: "q4", nivel: 2,
      enunciado: "Para 2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g), K<sub>c</sub> = 280 a 1000 K. Calcula K<sub>p</sub> (R = 0,082 atm·L/(mol·K)).",
      check: { tipo: "num", etiqueta: "K<sub>p</sub> =", valor: 3.41, unidad: "atm⁻¹" },
      pistas: ["K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>. Calcula primero Δn.", "Δn = 2 − (2 + 1) = −1. RT = 0,082·1000 = 82."],
      pasos: ["Δn = 2 − 3 = −1", "RT = 0,082 · 1000 = 82 atm·L/mol", "K<sub>p</sub> = 280 · 82<sup>−1</sup> = 280/82 ≈ 3,41"],
      resultado: "K<sub>p</sub> ≈ 3,41 atm⁻¹" },
    { id: "q5", nivel: 2,
      enunciado: "Se introducen 2,0 mol de H₂ y 2,0 mol de I₂ en un recipiente de 4 L a 700 K, donde K<sub>c</sub> = 54 para H₂ + I₂ ⇌ 2 HI. Calcula las concentraciones en el equilibrio.",
      check: [{ tipo: "num", etiqueta: "[H₂] =", valor: 0.107, unidad: "mol/L" }, { tipo: "num", etiqueta: "[HI] =", valor: 0.786, unidad: "mol/L" }],
      pistas: ["Concentraciones iniciales: 2,0/4 = 0,50 M de H₂ y de I₂. Haz la tabla ICE.", "(2x)²/(0,5 − x)² = 54 → 2x/(0,5 − x) = √54 ≈ 7,35."],
      pasos: ["Concentraciones iniciales: [H₂] = [I₂] = 2,0/4 = 0,50 M · [HI] = 0", "Tabla ICE: H₂: 0,5 − x · I₂: 0,5 − x · HI: 2x", "K<sub>c</sub> = (2x)²/(0,5 − x)² = 54 → 2x/(0,5 − x) = 7,35 → 2x = 3,674 − 7,35x → x = 3,674/9,35 = 0,393", "[H₂] = [I₂] = 0,5 − 0,393 = 0,107 M · [HI] = 2·0,393 = 0,786 M", "Comprobación: 0,786²/0,107² = 0,618/0,01145 ≈ 54 ✓"],
      resultado: "[H₂] = [I₂] ≈ 0,107 mol/L · [HI] ≈ 0,786 mol/L" },
    { id: "q6", nivel: 2,
      enunciado: "Se introducen 2,0 mol de PCl₅ en un recipiente de 10 L. Cuando se alcanza el equilibrio PCl₅ ⇌ PCl₃ + Cl₂ quedan 1,2 mol de PCl₅. Calcula el grado de disociación α y K<sub>c</sub>.",
      check: [{ tipo: "num", etiqueta: "α =", valor: 0.4 }, { tipo: "num", etiqueta: "K<sub>c</sub> =", valor: 0.0533, tol: 0.01 }],
      pistas: ["Moles disociados = 2,0 − 1,2. Por cada PCl₅ que se disocia se forma 1 PCl₃ y 1 Cl₂.", "Concentraciones: divide los moles de equilibrio entre 10 L."],
      pasos: ["Moles disociados: 2,0 − 1,2 = 0,8 mol → α = 0,8/2,0 = 0,4 (un 40 %)", "En equilibrio: n(PCl₅) = 1,2 · n(PCl₃) = 0,8 · n(Cl₂) = 0,8 mol", "Concentraciones (V = 10 L): 0,12 · 0,08 · 0,08 mol/L", "K<sub>c</sub> = " + fr("0,08·0,08", "0,12") + " = " + fr("0,0064", "0,12") + " ≈ 0,0533"],
      resultado: "α = 0,4 · K<sub>c</sub> ≈ 0,0533" },
    { id: "q7", nivel: 3,
      enunciado: "Para PCl₅ ⇌ PCl₃ + Cl₂, K<sub>c</sub> = 0,04 mol/L a cierta temperatura. Se introducen 0,40 mol de PCl₅ en un recipiente de 2 L. Calcula la concentración de PCl₃ en el equilibrio y el grado de disociación.",
      check: [{ tipo: "num", etiqueta: "[PCl₃] =", valor: 0.0717, unidad: "mol/L" }, { tipo: "num", etiqueta: "α =", valor: 0.358 }],
      pistas: ["[PCl₅]₀ = 0,40/2 = 0,20 M. Tabla ICE con x = lo que se disocia.", "x²/(0,20 − x) = 0,04 → x² + 0,04x − 0,008 = 0 (ecuación de 2º grado)."],
      pasos: ["[PCl₅]₀ = 0,40/2 = 0,20 M. ICE: PCl₅: 0,20 − x · PCl₃: x · Cl₂: x", "K<sub>c</sub> = " + fr("x·x", "0,20 − x") + " = 0,04 → x² = 0,04(0,20 − x) → x² + 0,04x − 0,008 = 0", "x = " + fr("−0,04 + √(0,04² + 4·0,008)", "2") + " = " + fr("−0,04 + 0,1833", "2") + " ≈ 0,0717", "[PCl₃] = [Cl₂] = x ≈ 0,0717 mol/L · [PCl₅] = 0,20 − 0,0717 ≈ 0,128 mol/L", "α = x/[PCl₅]₀ = 0,0717/0,20 ≈ 0,358 (un 35,8 %)"],
      resultado: "[PCl₃] ≈ 0,0717 mol/L · α ≈ 0,358",
      ojo: "aproximar 0,20 − x ≈ 0,20 daría x ≈ 0,0894, un error del 25 %: aquí α es muy grande para aproximar. Resuelve la cuadrática." },
    { id: "q8", nivel: 3,
      enunciado: "La síntesis del amoniaco, N₂ + 3 H₂ ⇌ 2 NH₃ (ΔH &lt; 0), está en equilibrio. Indica hacia dónde se desplaza al hacer cada cambio.",
      check: [
        { tipo: "opcion", etiqueta: "a) Aumentar la temperatura", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 1 },
        { tipo: "opcion", etiqueta: "b) Comprimir el recipiente", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "c) Añadir un catalizador", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 2 },
        { tipo: "opcion", etiqueta: "d) Añadir N₂ (V y T constantes)", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "e) Retirar NH₃", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "f) Añadir He (V y T constantes)", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 2 }
      ],
      pistas: ["Piensa en Q y K: ¿qué cambia con cada perturbación, Q o K?", "Δn(gas) = −2. La reacción es exotérmica."],
      pasos: ["a) Exotérmica: al subir T baja K → Q &gt; K → <b>izquierda</b>.", "b) Comprimir: favorece el lado con menos moles de gas (2 frente a 4) → <b>derecha</b>.", "c) El catalizador no cambia K ni Q → <b>no se desplaza</b>.", "d) Más reactivo: Q &lt; K → <b>derecha</b>.", "e) Menos producto: Q &lt; K → <b>derecha</b>.", "f) Gas inerte a V y T constantes: las concentraciones no cambian → <b>no se desplaza</b>."],
      resultado: "a) ← · b) → · c) no · d) → · e) → · f) no" },
    { id: "q9", nivel: 3,
      enunciado: "A cierta temperatura, K<sub>c</sub> = 0,08 para N₂ + 3 H₂ ⇌ 2 NH₃. En un recipiente de 1 L hay 0,5 mol de N₂, 1,0 mol de H₂ y 0,3 mol de NH₃. Calcula Q e indica hacia dónde evoluciona el sistema.",
      check: [{ tipo: "num", etiqueta: "Q =", valor: 0.18 }, { tipo: "opcion", etiqueta: "Evoluciona", opciones: ["hacia los productos (→)", "hacia los reactivos (←)", "está en equilibrio"], ok: 1 }],
      pistas: ["Como V = 1 L, los moles coinciden con las concentraciones.", "Q = [NH₃]² / ([N₂][H₂]³)."],
      pasos: ["Concentraciones (V = 1 L): [N₂] = 0,5 · [H₂] = 1,0 · [NH₃] = 0,3", "Q = " + fr("[NH₃]²", "[N₂][H₂]³") + " = " + fr("0,3²", "0,5·1,0³") + " = " + fr("0,09", "0,5") + " = 0,18", "Q = 0,18 &gt; K<sub>c</sub> = 0,08 → hay «demasiado producto» → el sistema evoluciona hacia los <b>reactivos</b> (←)."],
      resultado: "Q = 0,18 &gt; K<sub>c</sub> → evoluciona hacia la izquierda (se descompone NH₃)" },
    { id: "q10", nivel: 3,
      enunciado: "Explica por qué la síntesis industrial del amoniaco (N₂ + 3 H₂ ⇌ 2 NH₃, ΔH &lt; 0) se realiza a presión alta y a una temperatura intermedia (400–500 °C) y con catalizador. Redáctalo como en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 7, items: [
        { t: "Presión alta: hay menos moles de gas en los productos (2 frente a 4), así que se favorece el NH₃", p: 0.5 },
        { t: "La reacción es exotérmica: bajar la temperatura aumenta K y el rendimiento del equilibrio", p: 0.5 },
        { t: "Pero a temperatura baja la reacción es muy lenta (cinética): hay que subirla para tener una velocidad razonable", p: 0.5 },
        { t: "Habla de compromiso, y dice que el catalizador acelera sin cambiar K ni el equilibrio", p: 0.5 }
      ] },
      pasos: ["Presión alta: Δn(gas) = 2 − 4 = −2, así que, por Le Chatelier, aumentar la presión desplaza el equilibrio hacia el lado con menos moles de gas, el NH₃.", "Temperatura: la reacción es exotérmica, y el rendimiento en el equilibrio mejora al bajar T (K aumenta).", "Pero a baja T la velocidad de reacción es demasiado pequeña. Hay que elegir una T intermedia que combine rendimiento y velocidad aceptables.", "El catalizador (hierro) acelera la reacción directa y la inversa por igual: reduce el tiempo en alcanzar el equilibrio sin modificar K, y permite trabajar a una T no demasiado alta."],
      resultado: "Compromiso termodinámica–cinética: presión alta (más NH₃ en el equilibrio), T intermedia (velocidad vs rendimiento) y catalizador (más velocidad sin cambiar K)." }
  ];

  // ============================================================
  // LÁMINA RESUMEN
  // ============================================================
  var lamina = [
    { titulo: "Kc, Kp y Q: cómo se calculan",
      items: [
        { label: "Constante de equilibrio (aA + bB ⇌ cC + dD)", formula: "K<sub>c</sub> = " + fr("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>"), cuando: "Concentraciones <b>en el equilibrio</b> (mol/L).", ojo: "Sólidos y líquidos puros no aparecen." },
        { label: "De K<sub>c</sub> a K<sub>p</sub>", formula: "K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup>", cuando: "Reacciones con gases. T en kelvin; R = 0,082 atm·L/(mol·K).", ejemplo: "Δn = moles gas productos − moles gas reactivos.", ojo: "Si Δn = 0, K<sub>p</sub> = K<sub>c</sub>." },
        { label: "Cociente de reacción", formula: "Q = " + fr("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>"), cuando: "Misma fórmula, pero con las concentraciones de <b>cualquier instante</b>.", ejemplo: "Q &lt; K → derecha · Q &gt; K → izquierda · Q = K → equilibrio." }
      ] },
    { titulo: "Operar con constantes",
      tabla: { cab: ["Operación", "Nueva K"], filas: [["Invertir la reacción", "1/K"], ["Multiplicar los coeficientes por n", "Kⁿ"], ["Sumar dos reacciones", "K₁·K₂"]] },
      nota: "Ejemplo: K = 0,08 → inversa 12,5 → mitad de coeficientes √0,08 ≈ 0,28." },
    { titulo: "Tabla ICE en 6 pasos", ancha: true,
      pasos: ["Reacción ajustada y expresión de K.", "Cantidades <b>iniciales</b> (en mol/L: divide entre V).", "Fila de <b>cambio</b>: −a·x los reactivos, +b·x los productos.", "Fila de <b>equilibrio</b> = inicial + cambio.", "Sustituye en K y despeja x (a veces, ecuación de 2º grado).", "Comprueba que nada sale negativo. Con α: moles disociados = n₀·α."],
      nota: "Aproximar «c₀ − x ≈ c₀» solo si x es menos del 5 % de c₀." },
    { titulo: "Le Chatelier: qué pasa si…", ancha: true,
      tabla: { cab: ["Perturbación", "¿Cambia K?", "Desplazamiento"], filas: [
        ["Añadir reactivo / retirar producto", "No", "→ derecha"],
        ["Añadir producto / retirar reactivo", "No", "← izquierda"],
        ["Comprimir (↑ P)", "No", "hacia el lado con menos moles de gas (Δn = 0: nada)"],
        ["Subir T, exotérmica", "Baja", "← izquierda"],
        ["Subir T, endotérmica", "Sube", "→ derecha"],
        ["Catalizador", "No", "ninguno (solo más rápido)"],
        ["Gas inerte, V y T constantes", "No", "ninguno"]
      ] },
      nota: "Truco: razona siempre con Q y K. Solo la temperatura cambia K." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "K<sub>c</sub> = [CaO][CO₂] / [CaCO₃]", bien: "K<sub>c</sub> = [CO₂]", por: "Los sólidos puros no figuran en K." },
        { mal: "K<sub>c</sub> = [NH₃] / ([N₂][H₂])", bien: "K<sub>c</sub> = [NH₃]² / ([N₂][H₂]³)", por: "Cada concentración, elevada a su coeficiente." },
        { mal: "El catalizador desplaza el equilibrio a la derecha", bien: "No desplaza: solo acelera", por: "Actúa igual en los dos sentidos." },
        { mal: "En el equilibrio [reactivos] = [productos]", bien: "Las concentraciones son constantes, no iguales", por: "Es v directa = v inversa." },
        { mal: "K<sub>p</sub> = K<sub>c</sub> siempre", bien: "K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>", por: "Solo coinciden si Δn = 0." }
      ] }
  ];

  // el registro final lo hace quimica2_t06c.js, que junta las partes A, B y C
  B.parte = B.parte || {};
  B.parte.q2t6a = { secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina };

})(window);
