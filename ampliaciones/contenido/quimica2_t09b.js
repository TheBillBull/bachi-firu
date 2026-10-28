/* ============================================================
   Química II · ampliaciones · Tema 9: Química de los compuestos del carbono
   (parte B: secciones nuevas 5 a 10)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t9/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5. Propiedades físicas
    {
      h: "5. Propiedades físicas: fuerzas intermoleculares y puntos de ebullición",
      html: env(
        "<h5>La idea central: el punto de ebullición mide la fuerza entre moléculas</h5>" +
        "<p>Para hervir, las moléculas de un líquido deben separarse unas de otras; los enlaces covalentes <b>dentro</b> de cada molécula no se rompen. Por eso el punto de ebullición (Teb) depende de las <b>fuerzas intermoleculares</b>, que de menor a mayor son:</p>" +
        tabla(["Fuerza", "Dónde actúa", "Intensidad relativa", "Ejemplo"], [
          ["London (dispersión)", "en todas las moléculas, polares o no; crece con la masa y con la superficie de contacto", "débil, pero se suma en moléculas grandes", "alcanos, éter, CH₃Cl"],
          ["Dipolo–dipolo", "entre moléculas polares (C=O, C–Cl, C–O–C)", "media", "propanona, propanal, cloroetano"],
          ["Puente de hidrógeno", "H unido a O o N (y F) atraído por el O o N de otra molécula", "la más fuerte (≈ 20 kJ/mol)", "alcoholes, ácidos, aminas, amidas"]
        ], "q3t") +
        "<p>Cómo ordenar compuestos de masa parecida: <b>primero mira si hay O–H o N–H (puentes de H)</b>; si no los hay, mira si hay un grupo polar (C=O, –Cl); si no, queda solo London y manda la masa y la forma. En los ácidos carboxílicos los puentes de H son dobles (forman <b>dímeros</b>) y por eso su Teb es la mayor de la tabla.</p>" +
        w("q2t9_fuerzas") +
        ejemplo("Ejemplo resuelto: ordena por punto de ebullición", "Ordena de menor a mayor Teb: ácido etanoico, butano, propan-1-ol, propanona. Todos tienen M ≈ 58–60 g/mol. Justifícalo.", [
          "<b>Butano</b> (CH₃CH₂CH₂CH₃): apolar, solo London → el menor (−0,5 °C).",
          "<b>Propanona</b>: C=O polar, dipolo–dipolo, <b>sin O–H</b> → 56,1 °C.",
          "<b>Propan-1-ol</b>: O–H, <b>puentes de hidrógeno</b> → 97,2 °C.",
          "<b>Ácido etanoico</b>: puentes de H y dímeros → 118,1 °C.",
          "Orden: butano &lt; propanona &lt; propan-1-ol &lt; ácido etanoico. Con masas casi iguales, lo único que cambia es el tipo de fuerza."
        ]) +
        ejemplo("Ejemplo resuelto: el mismo número de átomos, 100 °C de diferencia", "El etanol (CH₃CH₂OH) hierve a 78,4 °C y el metoximetano (CH₃OCH₃), con la misma fórmula C₂H₆O, a −24,8 °C. Explícalo.", [
          "Son <b>isómeros de función</b>: misma masa (46 g/mol), mismos átomos.",
          "El etanol tiene un H unido a O: forma <b>puentes de hidrógeno</b> con sus vecinas.",
          "El éter no tiene ningún H unido a O (los H están en C): solo dipolo débil y London. Por eso es un gas a temperatura ambiente.",
          "Diferencia: 78,4 − (−24,8) = <b>103,2 °C</b> debida únicamente al puente de hidrógeno."
        ]) +
        "<h5>Solubilidad, estado y densidad</h5>" +
        "<ul>" +
        "<li><b>Solubilidad en agua</b> («lo semejante disuelve a lo semejante»): los compuestos que forman puentes de H con el agua se disuelven (alcoholes, ácidos, aminas, aldehídos y cetonas pequeños); la <b>cadena apolar</b> lo impide cuando crece. El metanol y el etanol son miscibles en agua; el butan-1-ol, parcialmente; el octan-1-ol casi nada. Los hidrocarburos y los derivados halogenados no se disuelven en agua, pero sí en disolventes apolares.</li>" +
        "<li><b>Estado a 25 °C</b>: de los alcanos, hasta C₄ son gases y de C₅ a C₁₇ líquidos; los ácidos y alcoholes de hasta unos 10 C son líquidos; los ácidos grasos de cadena larga (palmítico, C₁₆) y las amidas son sólidos.</li>" +
        "<li><b>Densidad</b>: casi todos los hidrocarburos, alcoholes, éteres y ésteres son <b>menos densos que el agua</b> (flotan: por eso el petróleo mancha el mar); los derivados polihalogenados (CHCl₃, 1,49 g/mL; CCl₄, 1,59 g/mL) son más densos.</li>" +
        "<li><b>Series homólogas</b>: dentro de una familia, cada CH₂ más sube la Teb unos 20–30 °C (más London); las ramificaciones la bajan (menor superficie de contacto): pentano 36,1 °C, 2-metilbutano 27,8 °C, neopentano 9,5 °C.</li>" +
        "</ul>" +
        w("q7_serie") +
        ojo("Error típico: «el etanol hierve más porque tiene el enlace O–H más fuerte». No: el O–H <b>no se rompe</b> al hervir; lo que importa es el puente de hidrógeno <b>entre moléculas</b>. Otro: «el éter tiene oxígeno, luego forma puentes de H». Para formarlos como donante hace falta un H unido al O (o N); el éter solo puede aceptarlos de otras moléculas (por eso es algo soluble en agua pero hierve muy bajo).") +
        "<h5>Acidez y basicidad (adelanto del tema de ácido-base)</h5>" +
        "<p>Los <b>ácidos carboxílicos</b> son ácidos débiles (ácido etanoico: Kₐ = 1,8·10⁻⁵, pKₐ = 4,76) porque el anión carboxilato se estabiliza por resonancia. Los alcoholes no se comportan como ácidos en agua. Las <b>aminas</b> son bases débiles: el par libre del N capta H⁺ (R–NH₂ + H₂O ⇌ R–NH₃⁺ + OH⁻). Las <b>amidas</b> son casi neutras (el par del N se deslocaliza hacia el C=O).</p>"
      )
    },
    // ------------------------------------------------------------ 6. Análisis elemental
    {
      h: "6. De los datos de análisis a la fórmula del compuesto",
      html: env(
        "<h5>Fórmula empírica y molecular</h5>" +
        "<p>La <b>fórmula empírica</b> es la proporción más sencilla de átomos; la <b>molecular</b> es la real y es un múltiplo entero de la empírica: <b>fórmula molecular = (fórmula empírica)ₖ</b>, con <b>k = M / M<sub>empírica</sub></b>. Los datos pueden venir como <b>porcentajes</b> o como <b>masas de CO₂ y H₂O</b> de una combustión. (El método general ya lo viste en el Tema 1; aquí lo aplicamos a compuestos orgánicos.) El simulador de abajo hace el mismo cálculo paso a paso.</p>" +
        w("q4_empirica") +
        "<h5>El método de combustión</h5>" +
        "<p>Al quemar una muestra, todo el C pasa a CO₂ y todo el H a H₂O; el O del compuesto <b>no se mide</b>: se obtiene <b>por diferencia</b> con la masa de muestra. Como 1 mol de CO₂ contiene 1 mol de C y 1 mol de H₂O contiene <b>2 mol de H</b>:</p>" +
        "<div class='formula-wrap'><div class='formula'>n(C) = m(CO₂)/44,0 · n(H) = 2·m(H₂O)/18,0 · m(O) = m(muestra) − m(C) − m(H)</div></div>" +
        ejemplo("Ejemplo resuelto: composición centesimal y masa molar", "Un compuesto contiene 54,5 % de C, 9,1 % de H y 36,4 % de O, y su masa molar es 88 g/mol. Halla su fórmula molecular y propón dos isómeros.", [
          "En 100 g: 54,5 g C, 9,1 g H, 36,4 g O. Moles: C = 54,5/12,0 = 4,54; H = 9,1/1,01 = 9,0; O = 36,4/16,0 = 2,28.",
          "Se divide entre el menor (2,28): C = 1,99 ≈ 2; H = 3,95 ≈ 4; O = 1. Empírica: <b>C₂H₄O</b> (M = 44).",
          "k = 88/44 = <b>2</b> → molecular <b>C₄H₈O₂</b>.",
          "DI = (2·4 + 2 − 8)/2 = 1. Isómeros posibles: el <b>ácido butanoico</b> (función ácido) y el <b>etanoato de etilo</b> (función éster); también un <b>hidroxi-aldehído</b> sería válido."
        ]) +
        ejemplo("Ejemplo resuelto: combustión", "Al quemar 1,50 g de un compuesto C, H, O se obtienen 2,20 g de CO₂ y 0,90 g de H₂O. Su masa molar es 60 g/mol. Halla la fórmula molecular y di qué compuestos podría ser.", [
          "n(C) = 2,20/44,0 = 0,0500 mol → m(C) = 0,0500·12,0 = <b>0,600 g</b>.",
          "n(H) = 2·0,90/18,0 = 0,100 mol → m(H) = <b>0,100 g</b>.",
          "m(O) = 1,50 − 0,600 − 0,100 = <b>0,800 g</b> → n(O) = 0,800/16,0 = 0,0500 mol.",
          "Proporción C : H : O = 0,0500 : 0,100 : 0,0500 = 1 : 2 : 1 → empírica <b>CH₂O</b> (M = 30). k = 60/30 = 2 → <b>C₂H₄O₂</b>.",
          "Posibles: <b>ácido etanoico</b> o <b>metanoato de metilo</b> (isomería de función). Con los datos del análisis no se distinguen: hacen falta propiedades (Teb, acidez)."
        ]) +
        ejemplo("Ejemplo resuelto: hidrocarburo y densidad", "Un hidrocarburo contiene 85,7 % de C. La densidad del gas a 0 °C y 1 atm es 1,25 g/L. Halla su fórmula y di cuál es.", [
          "El resto es H: 100 − 85,7 = 14,3 %. Moles: C = 85,7/12,0 = 7,14; H = 14,3/1,01 = 14,2. Proporción 1 : 2 → empírica <b>CH₂</b> (M = 14).",
          "Masa molar con la densidad (1 mol de gas ocupa 22,4 L en c. n.): M = 1,25 · 22,4 = <b>28,0 g/mol</b>. k = 28/14 = 2 → <b>C₂H₄</b>.",
          "Es el <b>eteno</b> (etileno), CH₂=CH₂. Comprobación del DI: (2·2 + 2 − 4)/2 = 1 ✓."
        ]) +
        ojo("La fórmula empírica no basta: el CH₂O es la empírica del metanal o formaldehído (CH₂O), del ácido etanoico (C₂H₄O₂) y de la glucosa (C₆H₁₂O₆). Sin la masa molar no sabes cuál es. Y el O siempre sale <b>por diferencia</b>: no lo midas con los gramos de CO₂.")
      )
    },
    // ------------------------------------------------------------ 7. Benceno y aromáticos
    {
      h: "7. El benceno y los compuestos aromáticos",
      html: env(
        "<h5>Una molécula plana con electrones repartidos</h5>" +
        "<p>El <b>benceno</b>, C₆H₆, es un anillo plano de seis carbonos <b>sp²</b> unidos entre sí y cada uno a un H. Cada C aporta un orbital p con un electrón y los seis electrones π <b>se reparten por todo el anillo</b> (deslocalización, o resonancia): por eso todos los enlaces C–C miden lo mismo (140 pm, entre el simple, 154, y el doble, 134) y no hay tres dobles y tres simples alternos. Esa estabilidad extra hace que el benceno <b>no se comporte como un alqueno</b>: prefiere sustituir un H antes que adicionar. Se dibuja como un hexágono con un círculo o con tres dobles enlaces (formas de Kekulé, solo una convención).</p>" +
        tabla(["Fórmula", "Nombre IUPAC", "Nombre común"], [
          ["C₆H₅–CH₃", "metilbenceno", "tolueno"],
          ["C₆H₅–OH", "hidroxibenceno (bencenol)", "fenol"],
          ["C₆H₅–NH₂", "aminobenceno (bencenamina)", "anilina"],
          ["C₆H₅–CHO", "bencenocarbaldehído", "benzaldehído"],
          ["C₆H₅–COOH", "ácido bencenocarboxílico", "ácido benzoico"],
          ["C₆H₅–NO₂", "nitrobenceno", "—"],
          ["C₆H₅–Cl", "clorobenceno", "—"],
          ["C₆H₅–CH=CH₂", "vinilbenceno (etenilbenceno)", "estireno"]
        ], "q3t") +
        "<p>Con <b>dos sustituyentes</b> se indican las posiciones: <b>1,2</b> (orto), <b>1,3</b> (meta) y <b>1,4</b> (para); los xilenos son los tres dimetilbencenos (1,2-, 1,3- y 1,4-dimetilbenceno, C₈H₁₀). Como sustituyente, el anillo C₆H₅– se llama <b>fenil</b> y el C₆H₅–CH₂– <b>bencil</b>. En un compuesto con otro grupo de mayor prioridad, el anillo es un sustituyente fenil.</p>" +
        ejemplo("Ejemplo resuelto: hibridación y fórmula en el tolueno", "Para el metilbenceno (tolueno) indica la fórmula molecular, la hibridación de cada tipo de carbono y su grado de insaturación.", [
          "Fórmula: anillo C₆H₅ + CH₃ → <b>C₇H₈</b>.",
          "Los 6 C del anillo son <b>sp²</b> (3 vecinos cada uno); el CH₃ es <b>sp³</b> (4 vecinos).",
          "DI = (2·7 + 2 − 8)/2 = <b>4</b> (tres dobles enlaces y un ciclo en el anillo)."
        ]) +
        "<p>Hay compuestos aromáticos de mucha relevancia: el <b>fenol</b> (desinfectante), el <b>ácido benzoico</b> y su sal (conservante E-210/E-211), la <b>anilina</b> (colorantes), el <b>tolueno</b> (disolvente). El tema 10 estudia sus reacciones de sustitución.</p>" +
        ojo("No confundas <b>fenol</b> (OH unido <i>directamente</i> al anillo) con un alcohol aromático como el alcohol bencílico, C₆H₅–CH₂OH. El primero es ligeramente ácido (pKₐ ≈ 10); el segundo no.")
      )
    },
    // ------------------------------------------------------------ 8. Panorama de aplicaciones
    {
      h: "8. Dónde encuentras cada familia",
      html: env(
        "<p>Conviene asociar cada grupo a un compuesto conocido: ayuda a recordar nombres y propiedades y es la clase de contexto con la que se plantean muchas cuestiones.</p>" +
        tabla(["Familia", "Compuesto", "Dónde lo encuentras"], [
          ["Alcano", "metano, propano, butano; octano", "gas natural; bombonas; gasolina (índice de octano)"],
          ["Alqueno / alquino", "eteno (etileno), etino (acetileno)", "madura la fruta y da polietileno; soldadura oxiacetilénica"],
          ["Alcohol", "metanol, etanol, propano-1,2,3-triol (glicerina)", "disolvente y combustible; bebidas y desinfectante; cosméticos"],
          ["Aldehído / cetona", "metanal (formol), propanona (acetona)", "conservación de muestras; disolvente de esmaltes de uñas"],
          ["Ácido carboxílico", "ácido etanoico (acético), ácido láctico", "vinagre; leche agria y fatiga muscular"],
          ["Éster", "etanoato de etilo, butanoato de etilo", "aromas de frutas, disolvente; las grasas son ésteres de la glicerina"],
          ["Éter", "etoxietano (éter dietílico)", "disolvente, antiguo anestésico"],
          ["Amina / amida", "metilamina; urea (amida), péptidos", "olor del pescado; fertilizante; enlace peptídico de las proteínas"],
          ["Derivado halogenado", "triclorometano (cloroformo), CFC", "disolvente; antiguos refrigerantes que dañan el ozono"]
        ], "q3t") +
        "<p>Los tipos de reacciones que transforman unas familias en otras (sustitución, adición, eliminación, esterificación, oxidación) se estudian en el Tema 10, y los polímeros (polietileno, nylon, poliéster, proteínas) en el Tema 11.</p>"
      )
    },
    // ------------------------------------------------------------ 9. EvAU
    {
      h: "9. Cómo se responde en la EvAU",
      html: env(
        "<h5>Qué te piden y qué haces</h5>" +
        tabla(["Si el ejercicio dice…", "Empieza por…", "Recuerda"], [
          ["«Formule o nombre…»", "grupo principal → cadena → numeración", "el principal lleva el localizador más bajo; prefijos alfabéticos"],
          ["«Escriba todos los isómeros de…»", "DI, esqueletos, posiciones, funciones", "no repitas: numera desde el otro extremo"],
          ["«¿Qué tipo de isomería?»", "¿cambia el esqueleto, el grupo o su posición?", "cadena / posición / función; si no, estereoisomería"],
          ["«¿Tiene isomería cis-trans?»", "mira los dos sustituyentes de cada C del C=C", "deben ser distintos en cada carbono"],
          ["«¿Es quiral? ¿Tiene enantiómeros?»", "busca C con 4 sustituyentes distintos", "cuenta lo que hay detrás del primer átomo"],
          ["«Ordene por Teb / explique»", "¿O–H o N–H? ¿polar? ¿masa y forma?", "puente de H &gt; dipolo &gt; London"],
          ["«Fórmula a partir de % o de combustión»", "moles de cada elemento → divide entre el menor", "k = M/Memp; O por diferencia; 1 H₂O → 2 H"],
          ["«Hibridación / geometría»", "cuenta los vecinos de cada C (con H)", "4 sp³ · 3 sp² · 2 sp"]
        ], "q3t") +
        "<h5>Cómo redactar</h5>" +
        "<ul>" +
        "<li>Para formular escribe la <b>semidesarrollada</b> con todos los H del grupo (CH₃–CH(OH)–CH₃) y, si lo piden, indica la esquelética.</li>" +
        "<li>Para nombrar, escribe primero el grupo principal y la cadena; así evitas el 50 % de los errores.</li>" +
        "<li>En «justifique» di la <b>causa</b> (la fuerza intermolecular, el carbono con cuatro sustituyentes distintos…), no solo el resultado.</li>" +
        "<li>En los problemas de fórmula empírica deja siempre una línea con la masa de cada elemento y con los moles: da puntos parciales aunque falle el último paso.</li>" +
        "</ul>" +
        w("q7_reto", "retos")
      )
    },
    // ------------------------------------------------------------ 10. ¿Qué falla aquí?
    {
      h: "10. ¿Qué falla aquí? Errores típicos de química orgánica",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente en los exámenes. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 11. Autocomprobación
    {
      h: "11. Autocomprobación del tema",
      html: "<p>Un test de doce preguntas, tarjetas para fijar definiciones y juegos: emparejar, ordenar y clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("emparejar", "emp1") + w("orden", "orden1") + w("clasificar", "clas1") + w("clasificar", "clas2") + w("q7_nombrar", "moleculas") + w("q7_grupos", "moleculas")
    }
  ];

  B.parte.q2t9b = { nuevas: nuevas };
})(window);
