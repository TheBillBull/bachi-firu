/* ============================================================
   Química II · ampliaciones · Tema 10: Reactividad de los compuestos del carbono
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t10/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5. Condensación
    {
      h: "5. Condensación: ésteres, hidrólisis y amidas",
      html: env(
        "<h5>Esterificación: ácido + alcohol</h5>" +
        "<p>En una reacción de <b>condensación</b> dos moléculas se unen y expulsan una molécula pequeña, casi siempre agua. La más importante es la <b>esterificación</b> (de Fischer): un ácido carboxílico y un alcohol, con H₂SO₄ como catalizador y calor, dan un <b>éster</b> y agua:</p>" +
        "<div class='formula-wrap'><div class='formula'>R−COOH + R'−OH ⇌ R−COO−R' + H₂O</div></div>" +
        "<p>El agua se forma con el <b>OH del ácido</b> y el <b>H del alcohol</b> (se demostró marcando el oxígeno del alcohol con ¹⁸O: queda en el éster). Nombre del éster: <b>«-oato de -ilo»</b>: el trozo del ácido pasa a «-oato» y el del alcohol a «-ilo». Ejemplo: ácido etanoico + etanol → <b>etanoato de etilo</b> (olor a disolvente de uñas y a fruta).</p>" +
        w("q7_reacciones") +
        "<p>La reacción es <b>reversible</b> y llega a un equilibrio con <b>K ≈ 4</b> (con etanol y ácido etanoico a 25 °C). Se resuelve como cualquier equilibrio en fase homogénea; el volumen se cancela porque hay los mismos moles a ambos lados.</p>" +
        ejemplo("Rendimiento de la esterificación",
          "Se mezclan 12,0 g de ácido etanoico (M = 60) y 9,2 g de etanol (M = 46) con unas gotas de H₂SO₄. La constante del equilibrio CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O es K = 4. ¿Qué masa de etanoato de etilo (M = 88) hay en el equilibrio?",
          ["n(ácido) = 12,0/60 = 0,200 mol; n(etanol) = 9,2/46 = 0,200 mol. Reactivo limitante: ambos (mol iguales).",
           "Sea x los moles de éster formados: en el equilibrio quedan 0,200 − x de ácido y de alcohol, x de éster y x de agua.",
           "K = x² / (0,200 − x)² = 4 → x / (0,200 − x) = 2 (raíz positiva) → x = 0,400 − 2x → x = 0,133 mol.",
           "Masa de éster = 0,133 · 88 = <b>11,7 g</b>. El rendimiento es 0,133/0,200 = 67 %: nunca llega al 100 % mientras el sistema esté en equilibrio."]) +
        w("q10_ester") +
        ojo("Para mejorar el rendimiento no sirve añadir más catalizador (no cambia K). Lo que funciona es el principio de Le Châtelier: <b>exceso de uno de los reactivos</b> (barato) o <b>retirar el agua</b> (destilación, agente desecante).") +
        "<h5>Hidrólisis del éster: el camino de vuelta</h5>" +
        "<ul>" +
        "<li><b>Hidrólisis ácida</b> (H₂O con H⁺ y calor): es justo la reacción inversa, reversible. Éster + H₂O ⇌ ácido + alcohol.</li>" +
        "<li><b>Hidrólisis básica o saponificación</b> (NaOH o KOH): el ácido que se forma reacciona con la base y da su <b>sal</b> (carboxilato). Como la sal no vuelve a esterificarse, la reacción es <b>irreversible</b>: CH₃COOCH₂CH₃ + NaOH → CH₃COONa + CH₃CH₂OH. Con los triésteres de la glicerina (grasas), da jabón: de ahí el nombre.</li>" +
        "</ul>" +
        ejemplo("Saponificación con estequiometría",
          "Se hidrolizan 8,8 g de etanoato de etilo (M = 88) con NaOH en exceso. Escribe la reacción y calcula la masa de etanoato de sodio (M = 82) formado, y el volumen de NaOH 0,50 mol/L que se consume si se parte de la cantidad justa.",
          ["CH₃COOCH₂CH₃ + NaOH → CH₃COONa + CH₃CH₂OH (relación 1 : 1 : 1 : 1).",
           "n(éster) = 8,8/88 = 0,100 mol → 0,100 mol de etanoato de sodio → m = 0,100 · 82 = <b>8,2 g</b>.",
           "Se consumen 0,100 mol de NaOH: V = 0,100/0,50 = 0,20 L = <b>200 mL</b>."]) +
        "<h5>Amidas: ácido + amina</h5>" +
        "<p>Los ácidos carboxílicos también condensan con el amoníaco o con las aminas (con calor), perdiendo agua: R−COOH + R'−NH₂ → R−CO−NH−R' + H₂O. Se forma una <b>amida</b>, base de los enlaces peptídicos de las proteínas y del nailon. Ejemplo: CH₃COOH + CH₃NH₂ → CH₃CONHCH₃ (N-metiletanamida) + H₂O.</p>"
      )
    },
    // ------------------------------------------------------------ 6. Oxidación-reducción
    {
      h: "6. Oxidación y reducción en química orgánica",
      html: env(
        "<h5>Qué significa «oxidar» un compuesto orgánico</h5>" +
        "<p>En orgánica se oxida un compuesto cuando <b>gana enlaces con oxígeno</b> o <b>pierde hidrógenos</b> (el carbono sube su n.º de oxidación); se reduce cuando <b>gana H</b> o pierde O. La escalera completa de un carbono es:</p>" +
        "<div class='formula-wrap'><div class='formula'>alcano → alcohol → aldehído / cetona → ácido carboxílico → CO₂</div></div>" +
        "<p>Cada flecha es una oxidación (el n.º de oxidación del C pasa de −3 en el CH₃ del etano a −1 en el alcohol, +1 en el aldehído, +3 en el ácido, +4 en el CO₂); recorrida al revés es una reducción.</p>" +
        "<h5>Oxidación de los alcoholes con K₂Cr₂O₇ / H⁺ (o KMnO₄)</h5>" +
        "<p>El oxidante habitual es el dicromato de potasio en medio ácido (naranja → verde al reducirse a Cr³⁺, lo que también sirve como indicador). Lo que ocurre depende de cuántos H tiene el carbono que lleva el −OH:</p>" +
        tabla(["Alcohol", "Producto", "Ejemplo"], [
          ["<b>Primario</b> (R−CH₂OH, 2 H en el C−OH)", "<b>aldehído</b> (si se destila enseguida) y, con exceso de oxidante, <b>ácido</b>", "CH₃CH₂OH → CH₃CHO → CH₃COOH"],
          ["<b>Secundario</b> (R₂CH−OH, 1 H)", "<b>cetona</b> (se detiene ahí)", "CH₃CH(OH)CH₃ → CH₃COCH₃"],
          ["<b>Terciario</b> (R₃C−OH, 0 H)", "<b>no se oxida</b> en condiciones suaves", "(CH₃)₃C−OH → no hay reacción"]
        ], "q3t") +
        w("q7_reacciones") +
        ojo("Aldehído y cetona se distinguen por la oxidación: el aldehído se oxida fácilmente a ácido (reactivo de Tollens: espejo de plata; de Fehling: precipitado rojo de Cu₂O); la cetona no.") +
        ejemplo("Oxidación del etanol y volumen de dicromato",
          "El etanol se oxida a ácido etanoico con dicromato en medio ácido: 3 CH₃CH₂OH + 2 Cr₂O₇²⁻ + 16 H⁺ → 3 CH₃COOH + 4 Cr³⁺ + 11 H₂O. ¿Qué volumen de K₂Cr₂O₇ 0,10 mol/L oxida 4,6 g de etanol (M = 46)?",
          ["Comprobación del ajuste: cada etanol cede 4 e⁻ (C de −1 a +3) y cada Cr₂O₇²⁻ gana 6 e⁻: 3 · 4 = 12 = 2 · 6. Átomos y carga cuadran.",
           "n(etanol) = 4,6/46 = 0,10 mol.",
           "Relación 3 etanol : 2 dicromato → n(Cr₂O₇²⁻) = 0,10 · 2/3 = 0,0667 mol.",
           "V = 0,0667/0,10 = 0,667 L = <b>667 mL</b>."]) +
        ejemplo("Oxidar un alcohol secundario",
          "Para la oxidación del propan-2-ol a propanona: 3 CH₃CH(OH)CH₃ + Cr₂O₇²⁻ + 8 H⁺ → 3 CH₃COCH₃ + 2 Cr³⁺ + 7 H₂O. ¿Qué volumen de K₂Cr₂O₇ 0,200 mol/L se necesita para oxidar 6,0 g de propan-2-ol (M = 60)?",
          ["n(alcohol) = 6,0/60 = 0,100 mol.",
           "Relación 3 : 1 → n(Cr₂O₇²⁻) = 0,100/3 = 0,0333 mol.",
           "V = 0,0333/0,200 = 0,167 L = <b>167 mL</b>."]) +
        "<h5>Reducciones</h5>" +
        "<ul>" +
        "<li><b>Aldehído → alcohol primario</b>, <b>cetona → alcohol secundario</b>: con H₂ y catalizador (Ni, Pt) o con un hidruro (LiAlH₄, NaBH₄). CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃.</li>" +
        "<li><b>Alqueno → alcano</b> y <b>alquino → alqueno → alcano</b>: hidrogenación catalítica (adición de H₂).</li>" +
        "<li><b>Ácido → alcohol primario</b>, con LiAlH₄ (más enérgico).</li>" +
        "</ul>"
      )
    },
    // ------------------------------------------------------------ 7. Combustión
    {
      h: "7. Combustión: ecuación, aire necesario y energía",
      html: env(
        "<h5>La ecuación general</h5>" +
        "<p>La combustión completa de cualquier compuesto C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> da CO₂ y H₂O. Para ajustarla basta seguir el orden <b>C → H → O</b>:</p>" +
        "<div class='formula-wrap'><div class='formula'>C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + (y/2) H₂O</div></div>" +
        "<p>El carbono de la fórmula fija los CO₂, el hidrógeno fija el agua (mitad de los H) y el oxígeno se deja para el final: se cuenta el O de los productos, se resta el que ya tiene el compuesto y el resto lo pone el O₂. Si el resultado es una fracción, se multiplica todo por 2 para tener coeficientes enteros. Ejemplo: butano C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O, es decir, <b>2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O</b>.</p>" +
        w("q7_combustion") +
        ojo("Con poco oxígeno la combustión es <b>incompleta</b>: se forma CO (venenoso) o hollín (C) en vez de CO₂. Ejemplo con metano: 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O. En los problemas de EvAU, si no dicen otra cosa, la combustión es completa.") +
        ejemplo("Oxígeno y CO₂ de la combustión del propano",
          "Se queman 10,0 g de propano (C₃H₈). (a) Ajusta la reacción. (b) ¿Cuántos moles de O₂ se consumen? (c) ¿Qué volumen de CO₂ se desprende medido a 25 °C y 1 atm? (d) Si ΔH<sub>c</sub> = −2 220 kJ/mol, ¿qué energía se libera? (R = 0,082 atm·L/(mol·K); C = 12; H = 1.)",
          ["(a) C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O (C: 3; H: 8 → 4 H₂O; O: 6 + 4 = 10 → 5 O₂).",
           "(b) n(C₃H₈) = 10,0/44 = 0,227 mol → n(O₂) = 5 · 0,227 = <b>1,14 mol</b>.",
           "(c) n(CO₂) = 3 · 0,227 = 0,682 mol → V = nRT/p = 0,682 · 0,082 · 298 / 1 = <b>16,7 L</b>.",
           "(d) E = 0,227 · 2 220 = <b>504,5 kJ</b> desprendidos (ΔH negativo, reacción exotérmica)."]) +
        ejemplo("ΔH de combustión a partir de las entalpías de formación (Hess)",
          "Calcula la entalpía de combustión del etanol líquido y la energía que libera 100 g. Datos: ΔH°<sub>f</sub> en kJ/mol: C₂H₅OH(l) = −277,7; CO₂(g) = −393,5; H₂O(l) = −285,8. M(etanol) = 46.",
          ["C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O (el O₂ es un elemento: ΔH°<sub>f</sub> = 0).",
           "ΔH = Σ ΔH°<sub>f</sub>(productos) − Σ ΔH°<sub>f</sub>(reactivos) = [2(−393,5) + 3(−285,8)] − (−277,7) = −787,0 − 857,4 + 277,7 = <b>−1 366,7 kJ/mol</b>.",
           "100 g son 100/46 = 2,17 mol → E = 2,17 · 1 366,7 = <b>2 971 kJ</b>."]) +
        ejemplo("Aire necesario",
          "¿Qué volumen de aire (21 % en volumen de O₂), en condiciones normales (22,4 L/mol), hace falta para quemar 1,00 kg de butano (M = 58)?",
          ["C₄H₁₀ + 13/2 O₂ → 4 CO₂ + 5 H₂O. n(butano) = 1 000/58 = 17,2 mol.",
           "n(O₂) = 6,5 · 17,2 = 112 mol → V(O₂) = 112 · 22,4 = 2 510 L.",
           "El aire es solo un 21 % de O₂: V(aire) = 2 510/0,21 ≈ <b>11 950 L</b> (casi 12 m³)."])
      )
    },
    // ------------------------------------------------------------ 8. Efectos electrónicos y reactivos
    {
      h: "8. Efectos electrónicos y tipos de reactivos",
      html: env(
        "<h5>Efecto inductivo: transmisión por los enlaces σ</h5>" +
        "<p>Cuando dos átomos de distinta electronegatividad forman un enlace, los electrones se desplazan hacia el más electronegativo. Ese desplazamiento se <b>transmite a lo largo de la cadena</b> por los enlaces σ, debilitándose con la distancia (casi desaparece a los tres enlaces).</p>" +
        "<ul>" +
        "<li><b>Efecto inductivo negativo (−I)</b>: el grupo <b>atrae</b> electrones. Lo tienen los átomos electronegativos y grupos como −F, −Cl, −Br, −OH, −NO₂, −COOH, −CN.</li>" +
        "<li><b>Efecto inductivo positivo (+I)</b>: el grupo <b>cede</b> electrones. Lo tienen los grupos alquilo (−CH₃, −C₂H₅, −C(CH₃)₃).</li>" +
        "</ul>" +
        "<p>Consecuencias que se preguntan: (1) la <b>acidez</b> de los ácidos carboxílicos — un grupo −I estabiliza el carboxilato (RCOO⁻) y aumenta la acidez; un +I la reduce —; (2) la <b>basicidad</b> de las aminas — los grupos alquilo (+I) enriquecen de electrones el N: las aminas alifáticas son más básicas que el NH₃ —; (3) la estabilidad de los <b>carbocationes</b> (la base de Markovnikov).</p>" +
        w("q10_induc") +
        ejemplo("Comparar la fuerza de dos ácidos",
          "El pKa del ácido etanoico es 4,76 y el del ácido cloroetanoico es 2,87. ¿Cuántas veces es más fuerte el segundo y por qué? ¿Qué pH tiene una disolución 0,10 mol/L de ácido cloroetanoico?",
          ["Ka = 10<sup>−pKa</sup>: la razón es 10<sup>4,76 − 2,87</sup> = 10<sup>1,89</sup> ≈ <b>78 veces</b> más fuerte.",
           "Causa: el Cl (muy electronegativo, −I) tira de los electrones del enlace C−C y estabiliza el anión ClCH₂COO⁻; al estabilizarse el anión, el equilibrio de ionización se desplaza hacia la derecha.",
           "Ka = 10<sup>−2,87</sup> = 1,35·10⁻³. Equilibrio: x²/(0,10 − x) = 1,35·10⁻³ → x² + 1,35·10⁻³ x − 1,35·10⁻⁴ = 0 → x = 1,10·10⁻² mol/L.",
           "pH = −log(1,10·10⁻²) = <b>1,96</b> (con la aproximación x ≪ 0,10 saldría 1,93; aquí x no es despreciable, 11 % de 0,10)."]) +
        "<h5>Efecto mesómero o resonancia: deslocalización por los enlaces π</h5>" +
        "<p>Cuando hay enlaces π conjugados (alternados con enlaces sencillos) o un par libre junto a un enlace π, los electrones se <b>deslocalizan</b> y se reparten entre varios átomos. La estructura real es un <b>híbrido de resonancia</b> de varias fórmulas límite, más estable que cualquiera de ellas. Se representa con flechas curvas y una flecha de doble punta entre las fórmulas.</p>" +
        "<ul>" +
        "<li><b>+M</b>: el grupo <b>cede</b> un par libre al sistema π: −OH, −NH₂, −OR, −X (en el halógeno el −I domina, pero orienta como +M).</li>" +
        "<li><b>−M</b>: el grupo <b>atrae</b> electrones π hacia sí: −C=O, −COOH, −NO₂, −CN.</li>" +
        "</ul>" +
        "<p>Ejemplos que hay que conocer: (1) el <b>ion carboxilato</b> RCOO⁻ tiene los dos enlaces C−O iguales (carga −1 repartida), por eso el ácido es mucho más ácido que un alcohol (pKa ≈ 4,8 frente a ≈ 16); (2) el <b>fenol</b> (pKa ≈ 10) es más ácido que el etanol (≈ 16) porque el anión fenóxido reparte la carga por el anillo; (3) el <b>grupo carbonilo</b> C=O está polarizado (C δ⁺, O δ⁻) también por resonancia: el nucleófilo ataca al carbono; (4) la <b>anilina</b> es menos básica que las aminas alifáticas porque el par del N se deslocaliza en el anillo y está menos disponible.</p>" +
        ojo("El efecto inductivo actúa por los enlaces σ y se atenúa deprisa; el mesómero actúa por los π o los pares libres y llega mucho más lejos. En un mismo grupo pueden oponerse: el −OH es −I pero +M, y en el fenol gana el +M sobre el anillo.") +
        "<h5>Nucleófilos y electrófilos</h5>" +
        tabla(["", "Nucleófilo (Nu)", "Electrófilo (E)"], [
          ["Qué es", "especie con par de electrones libre, rica en electrones", "especie con déficit de electrones, atrae un par"],
          ["Carga", "aniones o neutros con par libre", "cationes o neutros con orbital vacío o carbono δ⁺"],
          ["Ejemplos", "OH⁻, CN⁻, Cl⁻, Br⁻, H₂O, NH₃, R−OH, R−NH₂, carbaniones", "H⁺, NO₂⁺, Br⁺, carbocationes, AlCl₃, BF₃, el carbono del C=O, el carbono de R−X"],
          ["Ataca a…", "zonas con δ⁺ (C−X, C=O)", "zonas ricas en electrones (C=C, benceno)"],
          ["Reacciones típicas", "sustitución nucleófila (R−X), adición al C=O", "adición a alquenos, sustitución en el benceno"]
        ], "q3t") +
        w("clasificar", "clas2") +
        "<p>La regla de oro: un nucleófilo busca un electrófilo y viceversa. En CH₃−Br + OH⁻ → CH₃−OH + Br⁻, el OH⁻ es el nucleófilo, el carbono del CH₃Br (δ⁺ por el −I del Br) el electrófilo y el Br⁻ el grupo saliente.</p>"
      )
    },
    // ------------------------------------------------------------ 9. Problemas de estequiometría orgánica
    {
      h: "9. Problemas de estequiometría orgánica",
      html: env(
        "<h5>El método de siempre, con tres detalles</h5>" +
        "<p>Los problemas numéricos de reactividad orgánica son estequiometría normal: <b>ecuación ajustada → moles → relación molar → resultado</b>. Los tres detalles son:</p>" +
        "<ol>" +
        "<li><b>Reactivo limitante</b>: si dan masas de los dos reactivos, calcula los moles de ambos y divide cada uno por su coeficiente; el menor es el limitante.</li>" +
        "<li><b>Rendimiento</b>: rendimiento (%) = (cantidad real / cantidad teórica) · 100. En equilibrios (como la esterificación) el rendimiento máximo lo fija K.</li>" +
        "<li><b>Gases</b>: pV = nRT (o 22,4 L/mol en condiciones normales). Si te dan temperatura y presión, usa la ecuación de estado.</li>" +
        "</ol>" +
        ejemplo("Reactivo limitante y rendimiento",
          "Se hacen reaccionar 10,0 g de eteno (M = 28) con 10,0 g de Br₂ (M = 160). Calcula la masa de 1,2-dibromoetano (M = 188) que se forma si la reacción es total y di cuál es el reactivo en exceso.",
          ["CH₂=CH₂ + Br₂ → CH₂Br−CH₂Br (1 : 1 : 1).",
           "n(eteno) = 10,0/28 = 0,357 mol; n(Br₂) = 10,0/160 = 0,0625 mol. Reactivo limitante: el <b>Br₂</b>.",
           "n(producto) = 0,0625 mol → m = 0,0625 · 188 = <b>11,75 g</b> (11,8 g).",
           "Sobran 0,357 − 0,0625 = 0,295 mol de eteno (8,3 g)."]) +
        ejemplo("Deshidratación con rendimiento y volumen de gas",
          "Se deshidratan 23,0 g de etanol (M = 46) con H₂SO₄ concentrado y se obtiene eteno con un rendimiento del 90 %. ¿Qué volumen de eteno se recoge a 25 °C y 1 atm?",
          ["CH₃CH₂OH → CH₂=CH₂ + H₂O (1 : 1). n(etanol) = 23,0/46 = 0,500 mol.",
           "n(eteno) real = 0,500 · 0,90 = 0,450 mol.",
           "V = nRT/p = 0,450 · 0,082 · 298 / 1 = <b>11,0 L</b>."]) +
        ejemplo("Hidrogenación de un alquino",
          "El etino (acetileno) se hidrogena totalmente a etano. ¿Qué volumen de H₂ (condiciones normales) reacciona con 5,2 g de etino (M = 26)?",
          ["HC≡CH + 2 H₂ → CH₃−CH₃: dos moles de H₂ por mol de etino (se rompen los dos enlaces π).",
           "n(etino) = 5,2/26 = 0,20 mol → n(H₂) = 0,40 mol.",
           "V = 0,40 · 22,4 = <b>8,96 L</b>."]) +
        ejemplo("Entalpía de hidrogenación con las entalpías de combustión",
          "Calcula la entalpía de la reacción C₂H₄ + H₂ → C₂H₆ con ΔH<sub>c</sub> en kJ/mol: C₂H₄ = −1 411; H₂ = −286; C₂H₆ = −1 560.",
          ["Ley de Hess con combustiones: ΔH = Σ ΔH<sub>c</sub>(reactivos) − Σ ΔH<sub>c</sub>(productos).",
           "ΔH = (−1 411) + (−286) − (−1 560) = <b>−137 kJ/mol</b> (exotérmica: la hidrogenación libera energía)."]) +
        "<h5>Determinar una fórmula a partir de un análisis de combustión</h5>" +
        "<p>Se quema una muestra de masa conocida y se pesa el CO₂ y el H₂O. Todo el C del compuesto está en el CO₂; todo el H, en el H₂O; el O se obtiene <b>por diferencia</b>. Luego se obtiene la fórmula empírica y, con la masa molar, la molecular.</p>" +
        ejemplo("Del análisis a la fórmula",
          "La combustión de 1,50 g de un compuesto de C, H y O produce 2,20 g de CO₂ y 0,90 g de H₂O. Su masa molar es 60 g/mol. Halla su fórmula molecular. (C = 12; H = 1; O = 16.)",
          ["Masa de C = 2,20 · 12/44 = 0,600 g (0,0500 mol). Masa de H = 0,90 · 2/18 = 0,100 g (0,100 mol).",
           "Masa de O = 1,50 − 0,600 − 0,100 = 0,800 g (0,0500 mol).",
           "Relación C : H : O = 0,05 : 0,10 : 0,05 = 1 : 2 : 1 → fórmula empírica CH₂O (M = 30).",
           "60/30 = 2 → fórmula molecular <b>C₂H₄O₂</b>: ácido etanoico (CH₃COOH) o metanoato de metilo (HCOOCH₃), isómeros de función."]) +
        w("orden", "orden2")
      )
    },
    // ------------------------------------------------------------ 10. Cómo se pregunta
    {
      h: "10. Cómo se pregunta en la EvAU",
      html: env(
        "<h5>Cinco preguntas que se repiten</h5>" +
        "<ol>" +
        "<li><b>«Completa y clasifica»</b>: te dan reactivos (y a veces condiciones) y pides el producto y el tipo. Identifica el grupo funcional, mira el reactivo y las condiciones, y aplica la regla (Markovnikov, Saytzeff…).</li>" +
        "<li><b>«Productos de una eliminación o adición»</b>: escribe <i>todos</i> los posibles, señala el mayoritario y cuenta los isómeros (¡no olvides <i>cis</i>/<i>trans</i>!).</li>" +
        "<li><b>Encadenadas</b>: propeno → (HBr) 2-bromopropano → (KOH/etanol) propeno; propan-2-ol → (K₂Cr₂O₇) propanona. Ve paso a paso.</li>" +
        "<li><b>Esterificación</b>: nombra el éster, escribe agua como subproducto, y calcula un rendimiento o un equilibrio.</li>" +
        "<li><b>Combustión y estequiometría</b>: ajuste, moles, gas con pV = nRT y, a veces, ΔH con Hess.</li>" +
        "</ol>" +
        "<h5>Cuadro de decisión para predecir el producto</h5>" +
        tabla(["Si tienes…", "con…", "obtienes…"], [
          ["alqueno / alquino", "H₂, Pt", "alcano (alqueno)"],
          ["alqueno", "HX o H₂O/H⁺", "R−X o alcohol (Markovnikov)"],
          ["alqueno", "X₂", "dihalogenuro vecinal"],
          ["alcano", "X₂ + UV", "R−X (mezcla de isómeros) + HX"],
          ["R−X", "NaOH(aq)", "alcohol (sustitución)"],
          ["R−X", "KOH / etanol, calor", "alqueno (Saytzeff)"],
          ["alcohol", "H₂SO₄ conc., 170 °C", "alqueno (Saytzeff)"],
          ["alcohol primario / secundario", "K₂Cr₂O₇ / H⁺", "aldehído → ácido / cetona"],
          ["alcohol terciario", "K₂Cr₂O₇ / H⁺", "no reacciona"],
          ["ácido + alcohol", "H₂SO₄, calor", "éster + H₂O (equilibrio)"],
          ["éster", "NaOH", "sal del ácido + alcohol (irreversible)"],
          ["benceno", "Br₂ / FeBr₃, HNO₃ / H₂SO₄", "sustitución: bromobenceno, nitrobenceno"]
        ], "q3t") +
        "<h5>Lista de comprobación antes de entregar</h5>" +
        "<ul>" +
        "<li>¿Está ajustada la ecuación (átomos y, si hay iones, carga)?</li>" +
        "<li>¿Dije el <b>tipo</b> de reacción y las condiciones (UV, H₂SO₄, KOH/etanol, K₂Cr₂O₇…)?</li>" +
        "<li>¿Apliqué Markovnikov (adición) o Saytzeff (eliminación) y nombré el producto <b>mayoritario</b>?</li>" +
        "<li>¿Escribí el subproducto (H₂O, HX) en condensaciones y eliminaciones?</li>" +
        "<li>¿Usé gramos → moles → relación molar → rendimiento, y L, K y atm en los gases?</li>" +
        "</ul>"
      )
    },
    // ------------------------------------------------------------ 11. ¿Qué falla aquí?
    {
      h: "11. ¿Qué falla aquí? Errores típicos de reactividad orgánica",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 12. Autocomprobación
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Un test de diez preguntas, tarjetas para fijar definiciones y un juego de emparejar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1")
    }
  ];

  B.parte.q2t10b = { nuevas: nuevas };
})(window);
