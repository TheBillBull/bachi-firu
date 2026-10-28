/* ============================================================
   Química II · ampliaciones · Tema 4: Enlace químico
   (parte B: secciones nuevas 6 a 13)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t4/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 6
    {
      h: "6. Longitud, energía y orden de enlace",
      html: env(
        "<h5>Qué mide cada magnitud</h5>" +
        "<p>Al acercar dos átomos, la energía baja hasta un mínimo y luego sube bruscamente por la repulsión entre núcleos. La distancia del mínimo es la <b>longitud de enlace</b>; la profundidad del mínimo es la <b>energía de enlace</b> (la que hay que aportar para separar los átomos en fase gaseosa; es siempre positiva y se da en kJ/mol).</p>" +
        w("q4_morse") +
        "<p>Dos regularidades que se piden en examen:</p>" +
        "<ul>" +
        "<li><b>Orden de enlace</b> (1 sencillo, 2 doble, 3 triple): a mayor orden, enlace <b>más corto y más fuerte</b>. C–C 154 pm / 347 kJ/mol; C=C 134 / 614; C≡C 120 / 839.</li>" +
        "<li><b>Tamaño de los átomos</b>: a más grandes, enlace más largo y más débil: Cl–Cl 243, Br–Br 193, I–I 151 kJ/mol; H–F 567 &gt; H–Cl 431.</li>" +
        "</ul>" +
        "<h5>Energías de enlace y entalpía de reacción</h5>" +
        "<p>Una reacción en fase gaseosa consiste en romper unos enlaces (cuesta energía, +) y formar otros (la desprende, −). Aproximadamente:</p>" +
        "<div class='formula-wrap'><div class='formula'>ΔH ≈ Σ E(enlaces rotos) − Σ E(enlaces formados)</div></div>" +
        "<p>Es una estimación, porque las energías de enlace son <b>medias</b> sobre muchas moléculas; para entalpías precisas se usa la ley de Hess con entalpías de formación (termoquímica de Física y Química I).</p>" +
        ejemplo("Ejemplo resuelto: combustión del metano con energías de enlace", "Estima ΔH de CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g). E (kJ/mol): C–H 413; O=O 498; C=O (en CO₂) 799; O–H 463.", [
          "<b>Rotos</b>: 4 C–H + 2 O=O = 4·413 + 2·498 = 1652 + 996 = <b>2648 kJ</b>.",
          "<b>Formados</b>: 2 C=O + 4 O–H = 2·799 + 4·463 = 1598 + 1852 = <b>3450 kJ</b> (cada H₂O tiene 2 enlaces O–H).",
          "ΔH ≈ 2648 − 3450 = <b>−802 kJ</b> por mol de CH₄: exotérmica. (El valor medido con entalpías de formación es −802 kJ/mol.)"
        ]) +
        ejemplo("Ejemplo resuelto: síntesis del amoníaco", "Estima ΔH de N₂(g) + 3 H₂(g) → 2 NH₃(g). E (kJ/mol): N≡N 945; H–H 436; N–H 391.", [
          "Rotos: 1 N≡N + 3 H–H = 945 + 3·436 = 945 + 1308 = <b>2253 kJ</b>.",
          "Formados: 2 NH₃ = 6 enlaces N–H = 6·391 = <b>2346 kJ</b>.",
          "ΔH ≈ 2253 − 2346 = <b>−93 kJ</b> (experimental −92 kJ): se desprende energía, aunque romper el N≡N es muy costoso."
        ]) +
        ojo("Se rompen los enlaces de los <b>reactivos</b> y se forman los de los <b>productos</b>; no al revés. Cuenta los enlaces <b>de cada molécula</b> (CO₂ tiene dos C=O; H₂O, dos O–H) y multiplica por los coeficientes de la ecuación ajustada.")
      )
    },
    // ------------------------------------------------------------ 7
    {
      h: "7. Enlace iónico y energía reticular",
      html: env(
        "<h5>Cómo se forma un cristal iónico</h5>" +
        "<p>Un metal con baja energía de ionización (grupo 1, 2) cede electrones a un no metal con alta afinidad (grupos 16, 17). Pero ceder el electrón <b>cuesta</b> energía (la del Na → Na⁺ es +496 kJ/mol) y captarlo apenas la devuelve (Cl: −349). Un par aislado Na⁺···Cl⁻ no sería estable; lo que lo hace posible es la formación de un <b>cristal</b>: cada ion se rodea de iones de signo contrario (en el NaCl, 6 vecinos de cada tipo; en el CsCl, 8) y la atracción acumulada libera muchísima energía. No hay moléculas de NaCl: la fórmula NaCl es solo la <b>proporción</b> de iones, la que equilibra las cargas (Na⁺Cl⁻, Mg²⁺Cl⁻₂, Al³⁺O²⁻ → Al₂O₃).</p>" +
        "<h5>Energía reticular</h5>" +
        "<p>La <b>energía reticular U</b> es la energía que hay que aportar para separar 1 mol de sólido iónico en sus iones en fase gaseosa: NaCl(s) → Na⁺(g) + Cl⁻(g), U = +787 kJ/mol. (Algunos libros la definen para el proceso inverso, la formación de la red, con signo negativo: lee siempre la definición del enunciado.) Mide lo fuerte que es el cristal.</p>" +
        "<p>Por la ley de Coulomb, la fuerza entre iones es proporcional a q₊·q₋ / d²; de ahí la energía reticular:</p>" +
        "<div class='formula-wrap'><div class='formula'>U ∝ (|q₊| · |q₋|) / d,&nbsp;&nbsp; d = r₊ + r₋</div></div>" +
        "<p>Dos factores, y solo dos, deciden la comparación entre compuestos:</p>" +
        "<ul>" +
        "<li><b>La carga de los iones</b>: es el factor dominante. MgO (2+, 2−) tiene U = 3791 kJ/mol, cuatro veces la del NaF (923), con iones de tamaño parecido.</li>" +
        "<li><b>La distancia entre iones</b> (suma de radios): iones menores, d menor, U mayor. LiF (1036) &gt; NaF (923) &gt; KF (821): el catión crece al bajar en el grupo.</li>" +
        "</ul>" +
        w("q2_red") +
        tabla(["Compuesto", "q₊·q₋", "d = r₊ + r₋ (pm)", "U (kJ/mol)", "T<sub>fusión</sub> (°C)"], [
          ["LiF", "1", "76 + 133 = 209", "1036", "845"], ["NaF", "1", "102 + 133 = 235", "923", "993"], ["NaCl", "1", "102 + 181 = 283", "787", "801"],
          ["KCl", "1", "138 + 181 = 319", "715", "770"], ["MgO", "4", "72 + 140 = 212", "3791", "2852"], ["CaO", "4", "100 + 140 = 240", "3401", "2613"]
        ], "q3t") +
        "<h5>Consecuencias en las propiedades</h5>" +
        "<ul>" +
        "<li><b>Punto de fusión y dureza altos</b>, y tanto mayores cuanto mayor sea U: hay que vencer las atracciones de toda la red. MgO funde a 2852 °C, NaCl a 801 °C.</li>" +
        "<li><b>No conducen la electricidad en estado sólido</b> (los iones están fijos en la red) pero sí <b>fundidos o disueltos</b>, cuando los iones se mueven.</li>" +
        "<li><b>Frágiles</b>: un golpe desplaza una capa de iones y enfrenta cargas iguales, que se repelen y rompen el cristal.</li>" +
        "<li><b>Solubles en agua</b> en muchos casos: las moléculas polares rodean a los iones (ion–dipolo) y la energía de hidratación compensa la reticular. Si U es muy grande (MgO, Al₂O₃) no se disuelven.</li>" +
        "</ul>" +
        ejemplo("Ejemplo resuelto: comparar energías reticulares", "Ordena de mayor a menor energía reticular y de mayor a menor punto de fusión: NaCl, MgO, KCl. Datos de radios (pm): Na⁺ 102; K⁺ 138; Mg²⁺ 72; Cl⁻ 181; O²⁻ 140.", [
          "<b>Carga</b>: MgO tiene q₊·q₋ = 2·2 = 4; NaCl y KCl, 1·1 = 1. MgO es el mayor, sin dudar.",
          "<b>Tamaño</b>: entre NaCl y KCl la carga es la misma; d(NaCl) = 102 + 181 = 283 pm y d(KCl) = 138 + 181 = 319 pm. Menor distancia → NaCl con mayor U.",
          "Estimación de la proporción MgO/NaCl: (4/212) / (1/283) ≈ 5,3 (el valor real, 3791/787 ≈ 4,8, confirma el orden).",
          "<b>U: MgO &gt; NaCl &gt; KCl</b>. El punto de fusión sigue el mismo orden: <b>MgO (2852 °C) &gt; NaCl (801 °C) &gt; KCl (770 °C)</b>."
        ]) +
        ojo("No compares compuestos solo por el tamaño si la carga es distinta: el factor decisivo es la carga. Y recuerda que <b>la energía reticular no es la energía del enlace iónico entre dos iones</b>, sino la de un mol de cristal con todos sus vecinos.")
      )
    },
    // ------------------------------------------------------------ 8
    {
      h: "8. El ciclo de Born–Haber",
      html: env(
        "<h5>Por qué hace falta</h5>" +
        "<p>La energía reticular no se puede medir directamente (nadie separa un mol de cristal en iones gaseosos). Se calcula <b>indirectamente</b> con la ley de Hess: la entalpía de formación del compuesto, que sí se mide, es igual a la suma de las entalpías de todos los pasos imaginarios que llevan de los elementos al cristal. Esos pasos forman el <b>ciclo de Born–Haber</b>.</p>" +
        "<h5>Los pasos para NaCl(s), a partir de Na(s) y ½ Cl₂(g)</h5>" +
        "<ol>" +
        "<li><b>Sublimación</b> del metal: Na(s) → Na(g), ΔH<sub>sub</sub> = +107 kJ/mol.</li>" +
        "<li><b>Ionización</b>: Na(g) → Na⁺(g) + e⁻, EI = +496 kJ/mol.</li>" +
        "<li><b>Disociación</b> del no metal: ½ Cl₂(g) → Cl(g), ½ E<sub>enlace</sub> = +122 kJ/mol (la mitad de 243).</li>" +
        "<li><b>Afinidad electrónica</b>: Cl(g) + e⁻ → Cl⁻(g), AE = −349 kJ/mol (se libera).</li>" +
        "<li><b>Formación de la red</b> a partir de los iones gaseosos: Na⁺(g) + Cl⁻(g) → NaCl(s), −U.</li>" +
        "</ol>" +
        "<p>Por la ley de Hess, el camino directo (ΔH<sub>f</sub>) iguala al camino por los cinco pasos:</p>" +
        "<div class='formula-wrap'><div class='formula'>ΔH<sub>f</sub> = ΔH<sub>sub</sub> + EI + ½E<sub>enlace</sub> + AE − U</div></div>" +
        "<p>Despejando: <b>U = ΔH<sub>sub</sub> + EI + ½E<sub>enlace</sub> + AE − ΔH<sub>f</sub></b>. Los pasos 1 a 3 <b>suben</b> (cuestan energía); el 4 baja un poco; y el 5 baja muchísimo, y es el que hace que el compuesto sea estable.</p>" +
        w("q2_bornhaber") +
        ejemplo("Ejemplo resuelto: energía reticular del NaCl", "Calcula U del NaCl con: ΔH<sub>sub</sub>(Na) = 107; EI(Na) = 496; E(Cl–Cl) = 243; AE(Cl) = −349; ΔH<sub>f</sub>(NaCl) = −411 (kJ/mol).", [
          "Pasos hasta los iones gaseosos: 107 + 496 + 243/2 − 349 = 107 + 496 + 121,5 − 349 = <b>375,5 kJ/mol</b> (≈ 376).",
          "ΔH<sub>f</sub> = 375,5 − U → U = 375,5 − (−411) = <b>786,5 ≈ 787 kJ/mol</b>.",
          "Interpretación: formar los iones gaseosos cuesta +376 kJ/mol, pero la red devuelve 787: el balance es −411 kJ/mol, exotérmico."
        ]) +
        ejemplo("Ejemplo resuelto: ciclo con dos electrones, CaCl₂", "Calcula U del CaCl₂. Datos (kJ/mol): ΔH<sub>sub</sub>(Ca) = 178; EI₁(Ca) = 590; EI₂(Ca) = 1145; E(Cl–Cl) = 243; AE(Cl) = −349; ΔH<sub>f</sub>(CaCl₂) = −795.", [
          "El Ca pasa a Ca²⁺: se suman las <b>dos</b> ionizaciones: 590 + 1145 = 1735.",
          "Hay <b>dos</b> Cl: hay que disociar 1 mol de Cl₂ (+243) y captar <b>dos</b> electrones (2·(−349) = −698).",
          "Suma hasta los iones: 178 + 1735 + 243 − 698 = <b>1458 kJ/mol</b>.",
          "U = 1458 − (−795) = <b>2253 kJ/mol</b>. (Es mucho mayor que la del NaCl por la carga 2+ del Ca.)"
        ]) +
        ejemplo("Ejemplo resuelto: despejar la entalpía de formación", "Calcula ΔH<sub>f</sub> del KCl(s) si U = 718 kJ/mol; ΔH<sub>sub</sub>(K) = 89; EI(K) = 419; ½E(Cl–Cl) = 122; AE(Cl) = −349 (kJ/mol).", [
          "ΔH<sub>f</sub> = ΔH<sub>sub</sub> + EI + ½E + AE − U.",
          "Pasos hasta los iones: 89 + 419 + 122 − 349 = <b>281 kJ/mol</b>.",
          "ΔH<sub>f</sub> = 281 − 718 = <b>−437 kJ/mol</b>."
        ]) +
        "<h5>Los casos con oxígeno</h5>" +
        "<p>En el MgO aparece una sutileza: el O capta el primer electrón con liberación de energía (AE₁ = −141 kJ/mol), pero captar el segundo para formar O²⁻ <b>cuesta</b> energía (AE₂ = +744 kJ/mol), porque hay que meter un electrón en un ion ya negativo. Aun así el MgO es muy estable: la energía reticular (3791 kJ/mol) compensa con creces. El ciclo completo del MgO: 148 (sublimación) + 2189 (EI₁ + EI₂ = 738 + 1451) + 249 (½ O₂ → O) − 141 + 744 = 3189; con ΔH<sub>f</sub> = −602, U = 3189 + 602 = 3791.</p>" +
        "<p>Y esto explica por qué se forma MgCl₂ y no MgCl: quitar el segundo electrón al Mg cuesta +1451 kJ/mol, pero el cristal de Mg²⁺ tiene una energía reticular mucho mayor (2524 kJ/mol en el MgCl₂) que lo paga de sobra. Con el mismo razonamiento, el sodio forma Na⁺ y no Na²⁺: la EI₂ del Na (4562) sale de una capa interna y ninguna red puede compensarla.</p>" +
        w("orden", "ordenBH") +
        ojo("Errores típicos: (1) olvidar que el Cl₂ es diatómico y usar la energía completa del enlace (243) en vez de la mitad por átomo de Cl formado; (2) olvidar sumar las <b>dos</b> ionizaciones o las <b>dos</b> afinidades en compuestos como CaCl₂; (3) restar U cuando el enunciado la da como energía de formación de la red (negativa) y sumar si la da como energía de separación (positiva): comprueba el signo con la definición.")
      )
    },
    // ------------------------------------------------------------ 9
    {
      h: "9. Sólidos covalentes y enlace metálico",
      html: env(
        "<h5>Sólidos covalentes (redes)</h5>" +
        "<p>Algunos no metales no forman moléculas pequeñas sino una <b>red tridimensional gigante</b> de átomos unidos por enlaces covalentes. No hay moléculas: todo el cristal es «una molécula». Para fundirlos hay que romper enlaces covalentes, no fuerzas intermoleculares: por eso son <b>durísimos y con puntos de fusión altísimos</b>, <b>insolubles</b> y, en general, <b>aislantes</b>.</p>" +
        tabla(["Sustancia", "Estructura", "T<sub>fusión</sub> (°C)", "Propiedades"], [
          ["Diamante (C)", "cada C, sp³, unido a 4 C (tetraedro)", "≈ 3550", "el más duro; aislante"],
          ["Grafito (C)", "capas de anillos hexagonales, C sp²; cada C une 3 y le queda 1 p que se deslocaliza", "≈ 3650 (sublima)", "blando (las capas deslizan, unidas por fuerzas de dispersión); <b>conduce</b> la electricidad (electrones π deslocalizados)"],
          ["Cuarzo (SiO₂)", "cada Si unido a 4 O y cada O a 2 Si", "1713", "muy duro, aislante, insoluble"],
          ["Carburo de silicio (SiC)", "red tipo diamante Si–C", "≈ 2730", "muy duro"]
        ], "q3t") +
        "<p>Diamante y grafito son <b>alótropos</b> del carbono: misma sustancia química, distinta estructura y propiedades. Por eso un mismo elemento puede ser el material más duro (diamante) o uno de los más blandos y conductor (grafito).</p>" +
        "<h5>El enlace metálico: el mar de electrones</h5>" +
        "<p>En un metal, los átomos ceden sus electrones de valencia a una nube común. El metal es una <b>red de cationes</b> sumergida en un <b>«mar» de electrones deslocalizados</b> que pertenecen a todo el cristal. El enlace es la atracción entre la red positiva y el mar negativo, y no está dirigido. De ahí:</p>" +
        "<ul>" +
        "<li><b>Conductividad eléctrica y térmica</b>: los electrones se mueven libremente por todo el metal (en sólido y en líquido).</li>" +
        "<li><b>Maleabilidad y ductilidad</b>: si se golpea, los planos de cationes se deslizan unos sobre otros y el mar de electrones sigue envolviéndolos; no se enfrentan cargas iguales (a diferencia de un cristal iónico, frágil).</li>" +
        "<li><b>Brillo</b>: los electrones libres reflejan la luz.</li>" +
        "<li><b>Punto de fusión</b> variable: Hg −39 °C, Na 98 °C, Cu 1085 °C, Fe 1538 °C, W 3422 °C. Crece con el número de electrones de valencia aportados al mar y con la carga/tamaño de los cationes.</li>" +
        "</ul>" +
        w("q2_metalico") +
        "<p>Una <b>aleación</b> (latón, acero, bronce) es una mezcla de metales (o metal con algo de no metal, como el C en el acero) con enlace metálico que mejora dureza y resistencia: los átomos distintos dificultan el deslizamiento de los planos.</p>" +
        ojo("«El grafito conduce la electricidad porque es un metal»: no. Es un sólido covalente cuyos electrones π están deslocalizados <b>dentro de cada capa</b>; por eso conduce en el plano de la capa pero muy poco perpendicularmente. Y el diamante, con los 4 electrones de cada C fijos en enlaces σ, no conduce.")
      )
    },
    // ------------------------------------------------------------ 10
    {
      h: "10. Propiedades según el tipo de sustancia",
      html: env(
        "<h5>Cuatro tipos de sustancia y qué las distingue</h5>" +
        "<p>Casi toda pregunta de «propiedades» se resuelve decidiendo primero <b>a qué tipo pertenece la sustancia</b> y después recordando qué se rompe o se mueve al fundirla, disolverla o conducir.</p>" +
        tabla(["", "Iónica", "Molecular covalente", "Covalente en red", "Metálica"], [
          ["Partículas", "iones (+) y (−)", "moléculas", "átomos", "cationes + electrones libres"],
          ["Qué se rompe al fundir", "atracciones iónicas", "fuerzas intermoleculares", "enlaces covalentes", "enlace metálico"],
          ["T<sub>fusión</sub>", "alta (400–3000 °C)", "baja (&lt; 300 °C)", "muy alta (&gt; 1500 °C)", "variable (−39 a 3400 °C)"],
          ["Dureza", "duras y frágiles", "blandas", "muy duras (excepto grafito)", "maleables y dúctiles"],
          ["Conduce (sólido)", "no", "no", "no (grafito sí)", "<b>sí</b>"],
          ["Conduce (fundido/disuelto)", "<b>sí</b>", "no (salvo ácidos que se ionizan)", "no", "sí (fundido)"],
          ["Solubilidad en agua", "en general sí", "polares sí; apolares no", "no", "no"],
          ["Ejemplos", "NaCl, MgO, CaF₂", "H₂O, CO₂, I₂, azúcar", "C (diamante), SiO₂", "Fe, Cu, Na"]
        ], "q3t") +
        w("q2_propiedades") +
        "<h5>Las moléculas covalentes también se ordenan</h5>" +
        "<p>Dentro de las moléculas, T<sub>fusión</sub> y T<sub>ebullición</sub> dependen de las fuerzas intermoleculares: apolares y pequeñas (CH₄, N₂, Ne) son gases; apolares grandes (I₂, S₈, parafina) son sólidos blandos; polares con puentes de hidrógeno (H₂O, etanol, azúcar) llegan a ser líquidos o sólidos con puntos más altos. Por eso el agua (M = 18) es líquida a 25 °C y el CH₄ (M = 16) y el H₂S (M = 34) son gases.</p>" +
        ejemplo("Ejemplo resuelto: identificar el tipo de sustancia", "Tres sólidos blancos tienen estas propiedades: A funde a 801 °C, no conduce sólido pero sí fundido y disuelto, soluble en agua; B funde a 1713 °C, insoluble en todo, no conduce, muy duro; C funde a 80 °C, no conduce, insoluble en agua y soluble en hexano. ¿De qué tipo es cada una?", [
          "<b>A</b>: T<sub>f</sub> alta, conduce solo fundida/disuelta (iones libres), soluble en agua → <b>sólido iónico</b> (p. ej. NaCl).",
          "<b>B</b>: T<sub>f</sub> muy alta, insoluble, aislante y duro → <b>sólido covalente en red</b> (p. ej. SiO₂).",
          "<b>C</b>: T<sub>f</sub> baja, aislante, apolar (soluble en hexano) → <b>sustancia covalente molecular apolar</b> (p. ej. naftaleno, con fuerzas de dispersión)."
        ]) +
        w("clasificar", "clas1") +
        ejemplo("Ejemplo resuelto: justificar con el modelo de enlace", "Explica por qué el cloruro de sodio conduce la electricidad disuelto pero no en estado sólido, mientras que el cobre sí conduce siempre.", [
          "<b>NaCl sólido</b>: los iones Na⁺ y Cl⁻ ocupan posiciones fijas en la red; no hay cargas móviles.",
          "<b>NaCl disuelto</b>: las moléculas de agua rodean a los iones (ion–dipolo), rompen la red y los iones se mueven libres: transportan carga.",
          "<b>Cobre</b>: en el enlace metálico hay electrones de valencia deslocalizados por todo el cristal, que se mueven libremente tanto en sólido como en líquido."
        ])
      )
    },
    // ------------------------------------------------------------ 11
    {
      h: "11. Cómo se responde en la EvAU",
      html: env(
        "<h5>La ficha de una molécula</h5>" +
        "<p>La pregunta más repetida del tema pide, para una o dos especies, varias de estas cosas a la vez: <i>estructura de Lewis, geometría, hibridación, polaridad, tipo de fuerzas intermoleculares</i>. Se resuelven siempre en el mismo orden, y cada paso alimenta al siguiente:</p>" +
        "<ol>" +
        "<li><b>Lewis</b> (recuento de electrones).</li>" +
        "<li><b>Número de dominios en el átomo central</b> → notación AXₙEₘ.</li>" +
        "<li><b>Geometría</b> (TRPECV) y ángulo.</li>" +
        "<li><b>Hibridación</b> = nº de dominios (2 sp, 3 sp², 4 sp³).</li>" +
        "<li><b>Polaridad</b>: Δχ de los enlaces y simetría.</li>" +
        "<li><b>Fuerzas intermoleculares</b> → punto de ebullición, estado, solubilidad.</li>" +
        "</ol>" +
        w("q4_ficha") +
        ejemplo("Ejemplo resuelto estilo EvAU: NH₃ y BF₃", "Para NH₃ y BF₃: (a) estructuras de Lewis; (b) geometría y ángulos; (c) hibridación del átomo central; (d) polaridad; (e) justifica que el NH₃ tenga mayor punto de ebullición que el BF₃ (−33 °C frente a −100 °C). (χ: H 2,20; N 3,04; B 2,04; F 3,98)", [
          "<b>(a)</b> NH₃: V = 5 + 3 = 8 e⁻: 3 enlaces N–H y un par libre en el N. BF₃: V = 3 + 21 = 24 e⁻: 3 enlaces B–F, cada F con 3 pares libres; el B queda con solo 6 e⁻ (octeto incompleto).",
          "<b>(b)</b> NH₃: AX₃E → 4 dominios → <b>pirámide trigonal</b>, H–N–H ≈ 107° (el par libre comprime desde 109,5°). BF₃: AX₃ → 3 dominios → <b>trigonal plana</b>, F–B–F = 120°.",
          "<b>(c)</b> NH₃: 4 dominios → N <b>sp³</b>. BF₃: 3 dominios → B <b>sp²</b> (con un orbital p vacío).",
          "<b>(d)</b> N–H: Δχ = 0,84; B–F: Δχ = 1,94 (más polar). NH₃: la pirámide no anula los dipolos → <b>polar</b>. BF₃: los tres dipolos a 120° se anulan → <b>apolar</b>.",
          "<b>(e)</b> El NH₃ forma <b>puentes de hidrógeno</b> (N–H···N) y además es polar; el BF₃ es apolar y solo tiene fuerzas de dispersión. A pesar de que el BF₃ tiene más masa (68 frente a 17), su T<sub>eb</sub> es menor."
        ]) +
        "<h5>Plantillas de respuesta</h5>" +
        "<ul>" +
        "<li><b>«Justifique la geometría de…»</b>: Lewis → nº de pares alrededor del central → disposición de pares → forma de la molécula (cuenta solo átomos) → efecto de pares libres sobre el ángulo.</li>" +
        "<li><b>«¿Es polar…?»</b>: ¿hay enlaces polares? → geometría → ¿se anulan los vectores? (simetría y sustituyentes iguales).</li>" +
        "<li><b>«Ordene por punto de ebullición/fusión»</b>: identifica el tipo de sustancia → fuerza dominante (iónica ≫ puentes de H &gt; dipolo–dipolo &gt; dispersión) → dentro del mismo tipo, tamaño o carga → orden con &gt;.</li>" +
        "<li><b>«Explique por qué X conduce y Y no»</b>: qué partículas hay y si pueden moverse en cada estado.</li>" +
        "</ul>" +
        ojo("Un punto de cada pregunta suele estar en el <b>razonamiento escrito</b>, no en el dibujo. Escribe frases completas con las palabras clave: «pares de electrones», «se repelen», «dipolos», «simetría», «fuerzas de dispersión», «puente de hidrógeno», «red cristalina», «electrones deslocalizados». Y cierra siempre con la conclusión que pedía el enunciado.")
      )
    },
    // ------------------------------------------------------------ 12
    {
      h: "12. ¿Qué falla aquí? Errores típicos del enlace químico",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 13
    {
      h: "13. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y tres juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1")
    }
  ];

  B.parte.q2t4b = { nuevas: nuevas };
})(window);
