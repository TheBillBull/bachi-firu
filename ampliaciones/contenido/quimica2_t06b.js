/* ============================================================
   Química II · ampliaciones · Tema 6: Equilibrio químico
   (parte B: secciones nuevas 8 a 14; la parte A ya trae las secciones 5 a 7)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t6/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 8
    {
      h: "8. Kc y Kp con calma: presiones parciales, fracciones molares y Δn",
      html: env(
        "<h5>De dónde sale Kp = Kc·(RT)<sup>Δn</sup></h5>" +
        "<p>Para un gas ideal, p·V = n·R·T, es decir, <b>p = c·R·T</b> (c = n/V es la concentración molar). Si escribes K con presiones parciales y sustituyes cada p por c·R·T, los factores R·T se acumulan: sale un (RT) por cada mol de gas de los productos y desaparece uno por cada mol de gas de los reactivos.</p>" +
        "<div class='formula-wrap'><div class='formula'>K<sub>p</sub> = K<sub>c</sub>·(R·T)<sup>Δn</sup>  con  Δn = Σ coef. de los <u>gases</u> producto − Σ coef. de los <u>gases</u> reactivo</div></div>" +
        "<p>Tres cosas que se piden o se suspenden en Selectividad: (1) en Δn <b>solo cuentan los gases</b> (los sólidos y los líquidos no); (2) T siempre en <b>kelvin</b>; (3) con R = 0,082 atm·L·mol⁻¹·K⁻¹ las presiones van en <b>atm</b> y las concentraciones en <b>mol/L</b>. En el examen, K se da y se pide <em>sin unidades</em>.</p>" +
        tabla(["Reacción (todo gas salvo indicación)", "Δn", "¿K<sub>p</sub> = K<sub>c</sub>?"], [
          ["N₂ + 3 H₂ ⇌ 2 NH₃", "2 − 4 = −2", "No: K<sub>p</sub> = K<sub>c</sub>(RT)⁻²"],
          ["2 SO₂ + O₂ ⇌ 2 SO₃", "2 − 3 = −1", "No: K<sub>p</sub> = K<sub>c</sub>(RT)⁻¹"],
          ["H₂ + I₂ ⇌ 2 HI", "2 − 2 = 0", "Sí: K<sub>p</sub> = K<sub>c</sub>"],
          ["PCl₅ ⇌ PCl₃ + Cl₂", "2 − 1 = +1", "No: K<sub>p</sub> = K<sub>c</sub>(RT)"],
          ["CaCO₃(s) ⇌ CaO(s) + CO₂(g)", "1 − 0 = +1", "No: solo cuenta el CO₂"],
          ["C(s) + CO₂(g) ⇌ 2 CO(g)", "2 − 1 = +1", "No: el C sólido no cuenta"]
        ], "q3t") +
        "<h5>Presiones parciales y fracciones molares</h5>" +
        "<p>En una mezcla de gases, la presión parcial de cada componente es <b>p<sub>i</sub> = x<sub>i</sub>·P<sub>total</sub></b>, con x<sub>i</sub> = n<sub>i</sub>/n<sub>total</sub> (ley de Dalton). Las presiones parciales suman la total. Cuando el problema da <em>moles y presión total</em>, este es el camino: calcula n<sub>total</sub> (¡suma solo los gases!), las fracciones molares y de ahí las p<sub>i</sub>.</p>" +
        ejemplo("Ejemplo 1: de K<sub>p</sub> a K<sub>c</sub>", "En el equilibrio N₂ + 3 H₂ ⇌ 2 NH₃ a 500 K las presiones parciales son p(N₂) = 2,0 atm, p(H₂) = 3,0 atm y p(NH₃) = 1,0 atm. Calcula K<sub>p</sub> y K<sub>c</sub>.", [
          "K<sub>p</sub> = " + fr("p(NH₃)²", "p(N₂)·p(H₂)³") + " = " + fr("1,0²", "2,0 · 3,0³") + " = " + fr("1", "54") + " = <b>0,0185</b>",
          "Δn = 2 − (1 + 3) = −2, así que K<sub>p</sub> = K<sub>c</sub>(RT)⁻² y K<sub>c</sub> = K<sub>p</sub>·(RT)² con RT = 0,082·500 = 41 atm·L/mol",
          "K<sub>c</sub> = " + fr("1", "54") + " · 41² = " + fr("1681", "54") + " = <b>31,1</b>",
          "Comprobación de sentido: con Δn negativo y RT &gt; 1, K<sub>c</sub> sale mayor que K<sub>p</sub>. Es coherente."
        ]) +
        ejemplo("Ejemplo 2: con moles y presión total (ley de Dalton)", "En un recipiente a 400 K y presión total 3,0 atm hay en el equilibrio 2,0 mol de N₂O₄ y 4,0 mol de NO₂ (N₂O₄ ⇌ 2 NO₂). Calcula K<sub>p</sub> y K<sub>c</sub>.", [
          "n<sub>total</sub> = 2,0 + 4,0 = 6,0 mol. Fracciones molares: x(N₂O₄) = 2/6 = 1/3 y x(NO₂) = 4/6 = 2/3.",
          "Presiones parciales: p(N₂O₄) = 3,0·(1/3) = 1,0 atm y p(NO₂) = 3,0·(2/3) = 2,0 atm (suman 3,0 atm ✓).",
          "K<sub>p</sub> = " + fr("p(NO₂)²", "p(N₂O₄)") + " = " + fr("2,0²", "1,0") + " = <b>4,0</b>",
          "Δn = 2 − 1 = +1; RT = 0,082·400 = 32,8. K<sub>c</sub> = K<sub>p</sub>/(RT) = 4,0/32,8 = <b>0,122</b>"
        ]) +
        ojo("si el enunciado da el volumen y los moles, es más rápido trabajar con <b>K<sub>c</sub></b> (concentraciones) y pasar a K<sub>p</sub> al final; si da la presión total, trabaja con <b>fracciones molares y K<sub>p</sub></b> y pasa a K<sub>c</sub> al final. Mezclar moles con presiones en la misma fórmula es el error más repetido.")
      )
    },

    // ------------------------------------------------------------ 9
    {
      h: "9. Problemas con tabla ICE y grado de disociación (estilo EvAU)",
      html: env(
        "<h5>Un método que sirve para casi todo</h5>" +
        "<ol>" +
        "<li><b>Ajusta</b> la reacción y escribe la expresión de K que te piden (K<sub>c</sub> o K<sub>p</sub>).</li>" +
        "<li><b>Tabla ICE</b> en moles (o en mol/L si V cambia o piden concentraciones): inicial, cambio (−a·x, +b·x) y equilibrio.</li>" +
        "<li>Usa el <b>dato del enunciado</b> para fijar x: moles de una sustancia en el equilibrio, α, presión total, valor de K…</li>" +
        "<li>Pasa a <b>concentraciones</b> (n/V) o a <b>presiones parciales</b> (x<sub>i</sub>·P) y sustituye en K.</li>" +
        "<li>Comprueba: ¿ningún mol sale negativo? ¿Q = K con tus números?</li>" +
        "</ol>" +
        "<h5>Grado de disociación α</h5>" +
        "<p>α = moles disociados / moles iniciales (en tanto por uno; ×100 es el porcentaje). Se usa cuando una sola sustancia se descompone. Para una disociación de un mol de reactivo con n₀ moles iniciales en un volumen V, estas relaciones te ahorran la tabla en los exámenes (pero sabe deducirlas con ella):</p>" +
        tabla(["Disociación", "K<sub>c</sub>", "K<sub>p</sub> (presión total P)", "n<sub>total</sub>"], [
          ["A ⇌ B + C  (PCl₅ ⇌ PCl₃ + Cl₂)", fr("n₀α²", "V(1 − α)"), fr("α²·P", "1 − α²"), "n₀(1 + α)"],
          ["A ⇌ 2 B  (N₂O₄ ⇌ 2 NO₂)", fr("4n₀α²", "V(1 − α)"), fr("4α²·P", "1 − α²"), "n₀(1 + α)"]
        ], "q3t") +
        "<p>Mira qué dicen: si Δn = 0 el volumen y la presión no aparecen y α no depende de ellos; si Δn = +1, <b>menos presión (más volumen) ⇒ α mayor</b>. Pruébalo:</p>" +
        w("q6_alfa") +
        ejemplo("Ejemplo 1: dato en forma de concentración de equilibrio", "Se introducen 0,10 mol de CO₂ y 0,10 mol de H₂ en un recipiente de 1,0 L a 1000 K, donde K<sub>c</sub> = 0,63 para CO₂ + H₂ ⇌ CO + H₂O. Calcula las concentraciones en el equilibrio y el porcentaje de CO₂ convertido.", [
          "Tabla ICE (mol/L, V = 1,0 L):" + tabla(["", "CO₂", "H₂", "CO", "H₂O"], [["Inicial", "0,10", "0,10", "0", "0"], ["Cambio", "−x", "−x", "+x", "+x"], ["Equilibrio", "0,10 − x", "0,10 − x", "x", "x"]], "ice"),
          "K<sub>c</sub> = " + fr("x²", "(0,10 − x)²") + " = 0,63. Es un cuadrado perfecto: " + fr("x", "0,10 − x") + " = √0,63 = 0,794",
          "x = 0,794·(0,10 − x)  →  x(1 + 0,794) = 0,0794  →  <b>x = 0,0443 mol/L</b>",
          "[CO] = [H₂O] = 0,0443 M y [CO₂] = [H₂] = 0,10 − 0,0443 = <b>0,0557 M</b>.  Convertido: 0,0443/0,10 = <b>44,3 %</b> del CO₂.",
          "Como Δn = 0 el volumen no influye: con 10 L y los mismos moles la conversión sería idéntica."
        ]) +
        ejemplo("Ejemplo 2: α, presión total y las dos constantes", "En un recipiente cerrado se introduce 1,00 mol de PCl₅ y se calienta a 500 K. A la presión total de 1,0 atm el PCl₅ está disociado en un 50 % (PCl₅ ⇌ PCl₃ + Cl₂). Calcula K<sub>p</sub> y K<sub>c</sub>. ¿Cuánto vale α si la presión total sube hasta 4,0 atm?", [
          "Con α = 0,50: moles en el equilibrio PCl₅ = 0,50, PCl₃ = 0,50, Cl₂ = 0,50; n<sub>total</sub> = 1,50 mol. Fracciones molares: 1/3 cada una; con P = 1,0 atm, cada p = 0,333 atm.",
          "K<sub>p</sub> = " + fr("0,333·0,333", "0,333") + " = <b>0,333</b>  (con la fórmula: " + fr("α²P", "1 − α²") + " = " + fr("0,25", "0,75") + " ✓).",
          "Δn = +1: K<sub>c</sub> = K<sub>p</sub>/(RT) = 0,333/(0,082·500) = 0,333/41 = <b>8,13·10⁻³</b>",
          "A 4,0 atm (misma T, así que misma K<sub>p</sub>): " + fr("α²·4,0", "1 − α²") + " = 0,333  →  α² = 0,0833(1 − α²)  →  α² = " + fr("0,0833", "1,0833") + " = 0,0769  →  <b>α = 0,277</b> (27,7 %).",
          "Es Le Chatelier en números: al aumentar la presión se favorece el lado con menos moles de gas (el PCl₅) y α baja de 0,50 a 0,28."
        ]) +
        ojo("el grado de disociación solo se define sobre <em>la sustancia que se descompone</em>. Si hay otras sustancias presentes desde el principio, α no se obtiene de la tabla «estándar»: escribe la tabla completa. Y cuando dudes de si puedes aproximar (1 − α ≈ 1), no lo hagas: resuelve la cuadrática, que es lo que el corrector espera.")
      )
    },

    // ------------------------------------------------------------ 10
    {
      h: "10. Q en acción: predecir el sentido y calcular el nuevo equilibrio",
      html: env(
        "<h5>Q primero, siempre que haya duda</h5>" +
        "<p>Q se escribe como K pero con las concentraciones <em>de ese momento</em>. Cuando un enunciado mezcla reactivos y productos desde el principio, <b>compara Q con K antes de montar la tabla</b>: te dice si x es positivo (a la derecha) o negativo (a la izquierda), y evita sorpresas con moles negativos.</p>" +
        ejemplo("Ejemplo 1: ¿hacia dónde evoluciona?", "Para CO + H₂O ⇌ CO₂ + H₂ a cierta temperatura K<sub>c</sub> = 4,0. Se preparan tres mezclas (moles de CO, H₂O, CO₂, H₂ en el mismo recipiente): (a) 1,0 / 1,0 / 1,0 / 1,0; (b) 0,5 / 0,5 / 3,0 / 3,0; (c) 1,0 / 2,0 / 4,0 / 2,0. Indica el sentido de cada una.", [
          "Como Δn = 0, V se cancela y Q se calcula con moles: Q = " + fr("n(CO₂)·n(H₂)", "n(CO)·n(H₂O)") + ".",
          "(a) Q = " + fr("1·1", "1·1") + " = 1,0 &lt; 4,0 → evoluciona <b>hacia la derecha</b> (se forma CO₂ y H₂).",
          "(b) Q = " + fr("3·3", "0,5·0,5") + " = 36 &gt; 4,0 → evoluciona <b>hacia la izquierda</b>.",
          "(c) Q = " + fr("4·2", "1·2") + " = 4,0 = K<sub>c</sub> → <b>ya está en equilibrio</b>: no cambia nada."
        ]) +
        "<h5>Después de perturbar: nueva tabla ICE</h5>" +
        "<p>Cuando añades o retiras una sustancia, la mezcla deja de estar en equilibrio. Para calcular el <b>nuevo equilibrio</b>: (1) el «inicial» de la nueva tabla es la composición del equilibrio anterior más (o menos) lo que has añadido; (2) la K es la misma (la temperatura no ha cambiado); (3) resuelves igual que siempre. Si lo que cambia es el volumen, además divide por el nuevo V.</p>" +
        ejemplo("Ejemplo 2: añadir un reactivo", "En 1,0 L, 1,0 mol de H₂ y 1,0 mol de I₂ a 700 K alcanzan el equilibrio (K<sub>c</sub> = 54): [H₂] = [I₂] = 0,214 M y [HI] = 1,572 M. Se añade 1,0 mol de H₂ (sin cambiar V ni T). Calcula las nuevas concentraciones.", [
          "Nuevo inicial: [H₂] = 0,214 + 1,0 = 1,214 · [I₂] = 0,214 · [HI] = 1,572.",
          "Q = " + fr("1,572²", "1,214·0,214") + " = " + fr("2,471", "0,2598") + " = 9,5 &lt; 54 → el sistema va a la derecha (Le Chatelier: se «gasta» parte del H₂ añadido).",
          "Tabla ICE: H₂ = 1,214 − x · I₂ = 0,214 − x · HI = 1,572 + 2x.  K<sub>c</sub> = " + fr("(1,572 + 2x)²", "(1,214 − x)(0,214 − x)") + " = 54",
          "Desarrollando: 50x² − 83,4x + 11,56 = 0. De las dos raíces, solo vale la que cumple x &lt; 0,214 (si no, saldría un [I₂] negativo): <b>x = 0,152</b>.",
          "Nuevo equilibrio: [H₂] = <b>1,062 M</b> · [I₂] = <b>0,062 M</b> · [HI] = <b>1,877 M</b>. Comprobación: 1,877²/(1,062·0,062) = 53,5 ≈ 54 ✓.",
          "Observa lo que ha pasado: el I₂ casi ha desaparecido (de 0,214 a 0,062 M) y el HI ha subido. Añadir H₂ no cambia K, solo la posición."
        ])
      )
    },

    // ------------------------------------------------------------ 11
    {
      h: "11. Le Chatelier completo: presión, gas inerte, catalizador y temperatura",
      html: env(
        "<h5>La regla que lo ordena todo: calcula cómo cambia Q</h5>" +
        "<p>Cualquier perturbación se analiza igual: ¿cambia Q o cambia K? Si cambia <b>Q</b> (concentración, volumen, presión), el sistema evoluciona hasta que Q vuelva a valer el mismo K. Si cambia <b>K</b> (solo la temperatura), el sistema evoluciona hasta el nuevo K.</p>" +
        "<h5>Volumen y presión</h5>" +
        "<p>Comprimir (V a la mitad) duplica todas las concentraciones. En Q aparece el factor 2 elevado a Δn: si Δn &lt; 0 (menos moles de gas en productos), Q <em>disminuye</em> y el sistema evoluciona hacia productos; si Δn &gt; 0, Q <em>aumenta</em> y evoluciona hacia reactivos; si Δn = 0, Q no cambia. Por ejemplo, para N₂O₄ ⇌ 2 NO₂ (Δn = +1) comprimir a la mitad hace Q = 2K: Q &gt; K, el sistema retrocede hacia el N₂O₄.</p>" +
        "<h5>Gas inerte: depende de qué se mantenga constante</h5>" +
        "<ul>" +
        "<li><b>V y T constantes</b>: añadir un gas inerte sube la presión total, pero las concentraciones (y las presiones parciales) de las sustancias que reaccionan no cambian. Q = K: <b>no hay desplazamiento</b>.</li>" +
        "<li><b>P y T constantes</b>: el recipiente se expande, V crece, las concentraciones bajan: equivale a <em>disminuir la presión</em>. Se favorece el lado con <b>más moles de gas</b>.</li>" +
        "</ul>" +
        w("q6_inerte") +
        "<h5>Catalizador</h5>" +
        "<p>Disminuye la energía de activación de la reacción directa <em>y</em> de la inversa en la misma proporción: se llega antes al equilibrio, pero <b>K y las concentraciones finales no cambian</b>. Es una pregunta de «verdadero o falso» muy habitual.</p>" +
        "<h5>Temperatura: es lo único que cambia K</h5>" +
        "<p>La ecuación de van't Hoff conecta K con la temperatura: ln(K₂/K₁) = −(ΔH/R)·(1/T₂ − 1/T₁). Con ΔH &lt; 0 (exotérmica), subir T <b>disminuye</b> K; con ΔH &gt; 0 (endotérmica) lo <b>aumenta</b>. Para una exotérmica y una endotérmica en el mismo gráfico de ln K frente a 1/T salen rectas de pendiente −ΔH/R, de signos contrarios. (En 2.º de Bachillerato la ecuación aparece pocas veces; lo que sí se pide siempre es el razonamiento cualitativo con ΔH.)</p>" +
        w("q6_vanthoff") +
        ejemplo("Ejemplo EvAU (cualitativo): el SO₂ y el SO₃", "El equilibrio 2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g) tiene ΔH = −198 kJ. Razona, para cada cambio, hacia dónde se desplaza y si K cambia: (a) subir la temperatura; (b) aumentar la presión comprimiendo; (c) añadir un catalizador; (d) retirar SO₃; (e) añadir He a volumen constante.", [
          "(a) Exotérmica: subir T favorece el sentido endotérmico (la inversa). Se desplaza hacia la <b>izquierda</b> y <b>K disminuye</b>.",
          "(b) Δn = 2 − 3 = −1: la presión favorece el lado con menos moles de gas, los productos. Se desplaza a la <b>derecha</b>; K no cambia.",
          "(c) <b>No se desplaza</b>: el equilibrio se alcanza antes, con las mismas concentraciones; K no cambia.",
          "(d) Retirar producto hace Q &lt; K: se desplaza a la <b>derecha</b> para reponer SO₃; K no cambia.",
          "(e) V y T constantes: las concentraciones no varían, Q = K. <b>No hay desplazamiento</b>."
        ]) +
        ejemplo("Ejemplo con números: K a otra temperatura", "Para N₂O₄ ⇌ 2 NO₂ (ΔH = +57,2 kJ) K<sub>c</sub> = 4,6·10⁻³ a 298 K. Calcula K<sub>c</sub> a 320 K.", [
          "ln(K₂/K₁) = −" + fr("ΔH", "R") + "(" + fr("1", "T₂") + " − " + fr("1", "T₁") + ") = −" + fr("57200", "8,314") + "(" + fr("1", "320") + " − " + fr("1", "298") + ")",
          "= −6880 · (3,125·10⁻³ − 3,356·10⁻³) = −6880·(−2,307·10⁻⁴) = +1,587",
          "K₂/K₁ = e<sup>1,587</sup> = 4,89  →  K₂ = 4,6·10⁻³·4,89 = <b>2,25·10⁻²</b>",
          "Coherente: endotérmica y T más alta ⇒ K aumenta (casi 5 veces con solo 22 K)."
        ])
      )
    },

    // ------------------------------------------------------------ 12
    {
      h: "12. Equilibrios heterogéneos con gases: presión de equilibrio y masa mínima",
      html: env(
        "<p>Cuando en el equilibrio hay <b>un único gas</b> y uno o varios sólidos, la presión de ese gas en el equilibrio es una <b>constante a cada temperatura</b>: es K<sub>p</sub>. No depende de cuánto sólido haya, con una condición: <b>tiene que haber algo de cada sólido</b>. Si el sólido se agota antes de llegar a esa presión, el equilibrio no se alcanza.</p>" +
        ejemplo("Ejemplo 1: dos gases en la misma proporción", "En un recipiente se introduce NH₄HS(s), que se descompone: NH₄HS(s) ⇌ NH₃(g) + H₂S(g). En el equilibrio la presión total es 0,66 atm. Calcula K<sub>p</sub>.", [
          "Los dos gases salen en cantidades iguales (mismo coeficiente y no había ninguno al principio), así que p(NH₃) = p(H₂S) = 0,66/2 = 0,33 atm.",
          "K<sub>p</sub> = p(NH₃)·p(H₂S) = 0,33·0,33 = <b>0,109</b>. El sólido no aparece.",
          "Si se aumenta el volumen, se descompone más sólido hasta recuperar esas presiones; si el sólido se acaba, la presión bajará y no habrá equilibrio."
        ]) +
        ejemplo("Ejemplo 2: ¿cuánto sólido se descompone?", "En un recipiente de 10 L a 800 °C (1073 K) se alcanza CaCO₃(s) ⇌ CaO(s) + CO₂(g) con p(CO₂) = 0,22 atm. Calcula K<sub>c</sub> y la masa de CaCO₃ que se ha descompuesto. M(CaCO₃) = 100,1 g/mol.", [
          "K<sub>p</sub> = p(CO₂) = 0,22. Con Δn = +1: K<sub>c</sub> = K<sub>p</sub>/(RT) = 0,22/(0,082·1073) = 0,22/88,0 = <b>2,50·10⁻³</b> (= [CO₂]).",
          "n(CO₂) = pV/RT = " + fr("0,22·10", "0,082·1073") + " = <b>0,0250 mol</b>.",
          "Por cada mol de CO₂ se descompone 1 mol de CaCO₃: 0,0250 mol · 100,1 g/mol = <b>2,50 g</b> de CaCO₃ descompuestos.",
          "Si solo hubiéramos puesto 1,0 g de CaCO₃ (0,0100 mol), se descompondría <em>todo</em> y la presión quedaría por debajo de 0,22 atm: no habría equilibrio."
        ]) +
        ojo("el valor de K<sub>p</sub> de un equilibrio heterogéneo se calcula solo con las presiones de los <em>gases</em>. Y cuidado con la «cantidad mínima de sólido»: es la que hace falta para llegar a la presión de equilibrio, no la que se pone «de más».")
      )
    },

    // ------------------------------------------------------------ 13
    {
      h: "13. Solubilidad y producto de solubilidad (K<sub>s</sub>)",
      html: env(
        "<h5>Una sal poco soluble es un equilibrio heterogéneo</h5>" +
        "<p>Cuando un sólido iónico poco soluble se disuelve hasta saturar la disolución, queda en equilibrio con sus iones: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). Como el sólido no figura en la expresión, la constante solo contiene los iones y se llama <b>producto de solubilidad</b>: K<sub>s</sub> = [Ag⁺][Cl⁻]. Para una sal general A<sub>m</sub>B<sub>n</sub> ⇌ m A<sup>n+</sup> + n B<sup>m−</sup>:</p>" +
        "<div class='formula-wrap'><div class='formula'>K<sub>s</sub> = [A<sup>n+</sup>]<sup>m</sup>·[B<sup>m−</sup>]<sup>n</sup></div></div>" +
        "<p>La <b>solubilidad</b> s es la concentración (mol/L) de sal disuelta en la disolución saturada (también se da en g/L: divide entre la masa molar para pasar a mol/L). Con una tabla ICE, si se disuelven s mol/L de sal, aparecen m·s de catión y n·s de anión, y K<sub>s</sub> = (ms)<sup>m</sup>(ns)<sup>n</sup>:</p>" +
        tabla(["Tipo de sal", "Ejemplos", "K<sub>s</sub> en función de s", "s"], [
          ["AB", "AgCl, BaSO₄, CaCO₃", "s²", "√K<sub>s</sub>"],
          ["AB₂ o A₂B", "PbI₂, CaF₂, Mg(OH)₂, Ag₂CrO₄", "4s³", "∛(K<sub>s</sub>/4)"],
          ["AB₃ o A₃B", "Fe(OH)₃, Al(OH)₃", "27s⁴", "⁴√(K<sub>s</sub>/27)"],
          ["A₂B₃ o A₃B₂", "Ca₃(PO₄)₂, Al₂S₃", "108s⁵", "⁵√(K<sub>s</sub>/108)"]
        ], "q3t") +
        ejemplo("Ejemplo 1: de K<sub>s</sub> a solubilidad", "K<sub>s</sub>(AgCl) = 1,8·10⁻¹⁰ y K<sub>s</sub>(PbI₂) = 7,1·10⁻⁹. Calcula la solubilidad de cada uno en mol/L y en g/L. M(AgCl) = 143,3; M(PbI₂) = 461,0 g/mol.", [
          "AgCl ⇌ Ag⁺ + Cl⁻: K<sub>s</sub> = s². s = √(1,8·10⁻¹⁰) = <b>1,34·10⁻⁵ mol/L</b> → 1,34·10⁻⁵·143,3 = <b>1,92·10⁻³ g/L</b>.",
          "PbI₂ ⇌ Pb²⁺ + 2 I⁻: [Pb²⁺] = s, [I⁻] = 2s, K<sub>s</sub> = s·(2s)² = 4s³. s = ∛(7,1·10⁻⁹/4) = ∛(1,775·10⁻⁹) = <b>1,21·10⁻³ mol/L</b> → 1,21·10⁻³·461,0 = <b>0,558 g/L</b>."
        ]) +
        ejemplo("Ejemplo 2: de solubilidad a K<sub>s</sub>", "La solubilidad del Ag₂CrO₄ en agua es 0,0216 g/L. Calcula su K<sub>s</sub>. M(Ag₂CrO₄) = 331,7 g/mol.", [
          "s = 0,0216 / 331,7 = <b>6,51·10⁻⁵ mol/L</b>.",
          "Ag₂CrO₄ ⇌ 2 Ag⁺ + CrO₄²⁻: [Ag⁺] = 2s, [CrO₄²⁻] = s. K<sub>s</sub> = (2s)²·s = 4s³ = 4·(6,51·10⁻⁵)³ = <b>1,10·10⁻¹²</b>."
        ]) +
        ojo("<b>No compares K<sub>s</sub> de sales con distinta estequiometría para decir cuál es más soluble.</b> K<sub>s</sub>(Ag₂CrO₄) = 1,1·10⁻¹² es unas 160 veces menor que K<sub>s</sub>(AgCl) = 1,8·10⁻¹⁰, pero la solubilidad del cromato (6,5·10⁻⁵ M) es casi 5 veces <em>mayor</em> que la del cloruro (1,3·10⁻⁵ M). Solo es válido comparar K<sub>s</sub> si las sales son del mismo tipo (AB con AB). En los demás casos, calcula s.") +
        "<h5>Otras cuestiones que salen</h5>" +
        "<p><b>Temperatura</b>: K<sub>s</sub> cambia con T (casi siempre aumenta al calentar, porque disolver suele ser endotérmico). <b>pH</b>: si el anión es básico (OH⁻, S²⁻, CO₃²⁻…), un ácido lo consume y la sal se disuelve más; por eso el Mg(OH)₂ se disuelve en ácido. Con hidróxidos puedes calcular el pH de la disolución saturada: Mg(OH)₂ tiene [OH⁻] = 2s, y de ahí pOH y pH (tema 7).</p>"
      )
    },

    // ------------------------------------------------------------ 14
    {
      h: "14. Ion común y precipitación",
      html: env(
        "<h5>Efecto del ion común</h5>" +
        "<p>Si a una disolución saturada de AgCl le añades NaCl (un ion Cl⁻ que ya forma parte de la sal), aumenta [Cl⁻] y, para mantener [Ag⁺][Cl⁻] = K<sub>s</sub>, tiene que disminuir [Ag⁺]: se forma más sólido. Es Le Chatelier aplicado a la solubilidad: <b>un ion común disminuye la solubilidad</b>. K<sub>s</sub> no cambia (solo cambia con la temperatura).</p>" +
        "<p>Cómo se calcula: tabla ICE con el ion común ya presente en el estado inicial. Para AgCl en NaCl 0,10 M: [Cl⁻] = 0,10 + s, [Ag⁺] = s. Como s es minúscula, 0,10 + s ≈ 0,10 y entonces s ≈ K<sub>s</sub>/0,10. Mueve el deslizador y comprueba que la curva es una recta de pendiente −1 (para AB) en escala logarítmica:</p>" +
        w("q6_ks") +
        ejemplo("Ejemplo 1: AgCl en una disolución de NaCl", "Calcula la solubilidad del AgCl (K<sub>s</sub> = 1,8·10⁻¹⁰) en una disolución de NaCl 0,10 M y compárala con la del agua pura.", [
          "En agua pura: s₀ = √(1,8·10⁻¹⁰) = 1,34·10⁻⁵ M.",
          "Con ion común: K<sub>s</sub> = [Ag⁺][Cl⁻] = s·(0,10 + s) ≈ s·0,10 → <b>s = 1,8·10⁻¹⁰/0,10 = 1,8·10⁻⁹ M</b>.",
          "Aproximación válida: s = 1,8·10⁻⁹ ≪ 0,10.",
          "Se disuelve unas 7.500 veces menos que en agua pura (1,34·10⁻⁵/1,8·10⁻⁹ = 7,5·10³)."
        ]) +
        "<h5>¿Precipita o no? Q frente a K<sub>s</sub></h5>" +
        "<p>Es el cociente de reacción de siempre, con los iones: <b>Q = [catión]<sup>m</sup>[anión]<sup>n</sup></b> con las concentraciones <em>justo después de mezclar</em>. Si Q &gt; K<sub>s</sub> → precipita; si Q = K<sub>s</sub> → disolución saturada; si Q &lt; K<sub>s</sub> → no precipita (sigue disuelto). La trampa clásica: al mezclar dos disoluciones, el volumen total es la suma y <b>cada concentración se diluye</b>: c' = c·V/(V₁ + V₂).</p>" +
        w("q6_precip") +
        ejemplo("Ejemplo 2: mezcla de dos disoluciones", "Se mezclan 50 mL de AgNO₃ 1,0·10⁻³ M con 50 mL de NaCl 1,0·10⁻⁴ M. ¿Precipita AgCl? (K<sub>s</sub> = 1,8·10⁻¹⁰)", [
          "Volumen final 100 mL; cada concentración se reduce a la mitad: [Ag⁺] = 5,0·10⁻⁴ M y [Cl⁻] = 5,0·10⁻⁵ M.",
          "Q = [Ag⁺][Cl⁻] = 5,0·10⁻⁴·5,0·10⁻⁵ = <b>2,5·10⁻⁸</b>.",
          "Q = 2,5·10⁻⁸ &gt; K<sub>s</sub> = 1,8·10⁻¹⁰ (unas 140 veces mayor) → <b>sí precipita AgCl</b>."
        ]) +
        ejemplo("Ejemplo 3: con una sal AB₂", "Se mezclan 100 mL de Pb(NO₃)₂ 0,010 M con 100 mL de KI 0,010 M. ¿Precipita PbI₂? (K<sub>s</sub> = 7,1·10⁻⁹)", [
          "Concentraciones tras mezclar (V = 200 mL): [Pb²⁺] = 5,0·10⁻³ M y [I⁻] = 5,0·10⁻³ M.",
          "Q = [Pb²⁺][I⁻]² = 5,0·10⁻³·(5,0·10⁻³)² = <b>1,25·10⁻⁷</b> (el yoduro va <em>al cuadrado</em>).",
          "Q = 1,25·10⁻⁷ &gt; 7,1·10⁻⁹ → <b>sí precipita</b> PbI₂."
        ]) +
        "<h5>Precipitación fraccionada</h5>" +
        "<p>Si en una disolución hay dos aniones que forman sales poco solubles con el mismo catión y vas añadiendo el catión, precipita primero la sal que necesita <b>menos catión</b> para alcanzar su K<sub>s</sub>. No se decide mirando solo K<sub>s</sub>: hay que calcular la concentración mínima de catión en cada caso.</p>" +
        ejemplo("Ejemplo 4: ¿cuál precipita primero?", "Una disolución contiene Cl⁻ 0,010 M y CrO₄²⁻ 0,010 M. Se añade AgNO₃ sólido poco a poco (sin variar el volumen). K<sub>s</sub>(AgCl) = 1,8·10⁻¹⁰; K<sub>s</sub>(Ag₂CrO₄) = 1,1·10⁻¹². ¿Qué sal precipita primero? ¿Qué [Cl⁻] queda cuando empieza a precipitar la otra?", [
          "AgCl empieza a precipitar cuando [Ag⁺] = K<sub>s</sub>/[Cl⁻] = 1,8·10⁻¹⁰/0,010 = <b>1,8·10⁻⁸ M</b>.",
          "Ag₂CrO₄ empieza cuando [Ag⁺]² = K<sub>s</sub>/[CrO₄²⁻] = 1,1·10⁻¹²/0,010 = 1,1·10⁻¹⁰ → [Ag⁺] = <b>1,05·10⁻⁵ M</b>.",
          "AgCl necesita mucho menos Ag⁺: <b>precipita primero el AgCl</b> (aunque su K<sub>s</sub> sea mayor).",
          "Cuando empieza a precipitar el cromato, [Ag⁺] = 1,05·10⁻⁵ M y entonces [Cl⁻] = 1,8·10⁻¹⁰/1,05·10⁻⁵ = <b>1,7·10⁻⁵ M</b>.",
          "Eso es el 0,17 % del cloruro inicial (1,7·10⁻⁵/0,010): ya ha precipitado el 99,8 %. Así se separan los iones."
        ]) +
        ejemplo("Ejemplo 5: concentración mínima para que precipite", "¿A partir de qué pH precipita el Mg(OH)₂ en una disolución de Mg²⁺ 0,010 M? K<sub>s</sub>[Mg(OH)₂] = 1,8·10⁻¹¹.", [
          "Precipita cuando Q = [Mg²⁺][OH⁻]² supera K<sub>s</sub>: [OH⁻]² = 1,8·10⁻¹¹/0,010 = 1,8·10⁻⁹.",
          "[OH⁻] = √(1,8·10⁻⁹) = 4,24·10⁻⁵ M → pOH = 4,37 → <b>pH = 14 − 4,37 = 9,63</b>.",
          "Por debajo de pH 9,63 no precipita; por encima, sí."
        ])
      )
    }
  ];

  B.parte.q2t6b = { nuevas: nuevas };
})(window);
