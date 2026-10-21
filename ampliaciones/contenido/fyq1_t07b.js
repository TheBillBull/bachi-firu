/* ============================================================
   Física y Química I · ampliaciones · Tema 7
   (parte B: secciones nuevas: método de nomenclatura, propiedades físicas, reacciones, combustión,
    petróleo y biocombustibles, polímeros y problemas resueltos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t7/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Nombrar y formular: el método completo",
      html:
        "<p>Casi todos los ejercicios de este tema piden pasar del <b>nombre a la fórmula</b> o de la <b>fórmula al nombre</b>. Se hace con un único método de siete pasos, que se aplica siempre en el mismo orden. Practícalo con los simuladores del final de la sección.</p>" +
        "<h5>De la fórmula al nombre</h5>" +
        "<ol>" +
        "<li><b>Identifica el grupo principal</b> con la lista de prioridad (ácido &gt; éster &gt; amida &gt; nitrilo &gt; aldehído &gt; cetona &gt; alcohol &gt; amina &gt; doble &gt; triple). Si no hay ninguno, es un hidrocarburo.</li>" +
        "<li><b>Cadena principal</b>: la más larga que contenga el grupo principal y todos los enlaces múltiples. Cuenta sus carbonos y busca la raíz: <b>met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-</b>.</li>" +
        "<li><b>Numera</b> por el extremo que dé el localizador más bajo, por este orden de prioridad: (1) al grupo principal, (2) a los enlaces dobles y triples, (3) a las ramas y a los grupos que son prefijos.</li>" +
        "<li><b>Terminación</b>: -ano si todo son enlaces sencillos; -eno o -ino con los enlaces múltiples (con su localizador); y el sufijo del grupo: -ol, -al, -ona, -oico, -amina…</li>" +
        "<li><b>Ramas y prefijos</b> (metil, etil, cloro, hidroxi…) delante, por <b>orden alfabético</b> y con su localizador; <i>di-, tri-</i> si se repiten.</li>" +
        "<li>Escribe el nombre completo, con comas entre números y guiones entre números y letras.</li>" +
        "<li><b>Compruébalo</b> dibujándolo otra vez: ¿cuadra el número de carbonos, el grupo y las posiciones?</li>" +
        "</ol>" +
        ejemplo("Nombrar con grupo, ramas y enlace múltiple", "Nombra: a) CH₃−CH₂−CH(CH₃)−CH₂−CH₂−CH₃; b) CH₃−CH(OH)−CH(CH₃)−CH₃; c) CH₂=C(CH₃)−CH₂−CH₃; d) CH₃−CH=C(CH₃)−CH₂−CH₃; e) CH₃−CH(CH₃)−CH₂−CHO; f) CH₃−CO−CH(CH₃)−CH₃.", [
          "<b>a)</b> Sin grupo ni enlaces múltiples. Cadena de 6 C con un metilo en el C3 (desde la derecha también sale el 4: gana el 3) → <b>3-metilhexano</b>.",
          "<b>b)</b> Grupo principal: alcohol. Cadena de 4 C; el −OH debe tener el localizador más bajo → el C2 (numerando desde la izquierda); el metilo queda en el C3 → <b>3-metilbutan-2-ol</b>.",
          "<b>c)</b> Alqueno. La cadena más larga que contiene el doble enlace tiene 4 C; el enlace va del C1 al C2 y el metilo está en el C2 → <b>2-metilbut-1-eno</b>.",
          "<b>d)</b> Cadena de 5 C. Numerando desde la izquierda el doble enlace empieza en el C2 (desde la derecha empezaría en el C3: peor); el metilo queda en el C3 → <b>3-metilpent-2-eno</b>.",
          "<b>e)</b> Aldehído: el grupo −CHO es el C1. Cadena de 4 C y un metilo en el C3 → <b>3-metilbutanal</b> (sin localizador para el aldehído).",
          "<b>f)</b> Cetona de 4 C: el C=O está en el C2 (desde la izquierda) y el metilo en el C3 → <b>3-metilbutan-2-ona</b>."
        ]) +
        "<h5>Del nombre a la fórmula</h5>" +
        "<p>Se hace al revés: (1) la <b>raíz</b> dice cuántos carbonos hay en la cadena principal; dibújalos en fila y numéralos; (2) el <b>sufijo</b> dice el grupo principal y su posición; (3) <b>-an-/-en-/-in-</b> dicen qué enlaces hay entre carbonos; (4) pon las <b>ramas</b> en los carbonos indicados; (5) <b>completa los hidrógenos</b> hasta que cada carbono tenga 4 enlaces. Para <i>2-metilpentan-3-ol</i>: 5 C en fila; OH en el C3; metilo en el C2; resultado CH₃−CH(CH₃)−CH(OH)−CH₂−CH₃.</p>" +
        w("q7_reto", "retos") +
        "<h5>Errores típicos al nombrar</h5>" +
        tabla(["Error", "Corrección"], [
          ["Elegir la cadena recta del dibujo y no la más larga", "Cuenta todos los caminos de C seguidos: gana el más largo (que contenga el grupo y los enlaces múltiples)"],
          ["Numerar desde el extremo más cercano a una rama cuando hay un grupo funcional", "El grupo principal manda: primero el −OH, el C=O…, y sólo después las ramas"],
          ["«2-metilbut-3-eno»", "El enlace múltiple recibe el localizador más bajo: <b>3-metilbut-1-eno</b>"],
          ["Ordenar «dimetil» antes que «etil» porque «d» va antes que «e»", "Los prefijos di-, tri- no cuentan: «etil» (e) va antes que «metil» (m)"],
          ["«ácido 1-propanoico»", "El localizador del ácido y del aldehído no se escribe (siempre es el C1): <b>ácido propanoico</b>"]
        ])
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Propiedades físicas: del grupo funcional al punto de ebullición",
      html:
        "<p>Casi todo lo que se pregunta sobre propiedades físicas de compuestos orgánicos se resuelve con las fuerzas intermoleculares del Tema 2: <b>(1)</b> ¿Qué grupo funcional hay y, por tanto, qué fuerzas? <b>(2)</b> ¿Cuánto mide la molécula (masa y superficie)? <b>(3)</b> ¿Está ramificada?</p>" +
        tabla(["Si la molécula tiene…", "Fuerzas entre moléculas", "Punto de ebullición", "Solubilidad en agua"], [
          ["sólo C y H (alcanos, alquenos, alquinos, aromáticos)", "London", "el más bajo para su tamaño", "insolubles"],
          ["halógeno o éter", "London + dipolo–dipolo débil", "algo más alto", "poco o nada solubles"],
          ["C=O (aldehído, cetona, éster)", "London + dipolo–dipolo", "intermedio", "los de pocos C, solubles"],
          ["−NH₂ o −NH−", "London + puentes de H", "más alto", "solubles (pocos C)"],
          ["−OH (alcohol)", "London + puentes de H", "alto", "solubles hasta 3–4 C"],
          ["−COOH (ácido)", "puentes de H dobles (dímeros)", "el más alto", "solubles hasta 4 C"]
        ]) +
        "<p>Con el mismo grupo, el punto de ebullición sube al alargar la cadena (más London) y baja al ramificarla (menos superficie de contacto). Con la misma masa, manda el grupo. Pasar de 5 a 10 carbonos en un alcano suma unos 140 °C; en cambio, pasar del butano (M = 58, −0,5 °C) al ácido etanoico (M = 60, 118 °C), con casi la misma masa, suma más de 100 °C.</p>" +
        ejemplo("Ordenar por punto de ebullición", "Ordena de menor a mayor punto de ebullición: pentano (M = 72), pentanal (M = 86), pentan-1-ol (M = 88) y ácido pentanoico (M = 102). Después, ordena los isómeros del C₅H₁₂: pentano, 2-metilbutano y 2,2-dimetilpropano.", [
          "El pentano es apolar (sólo London): el más bajo, 36 °C.",
          "El pentanal tiene C=O (dipolo–dipolo, sin puentes de H): 103 °C.",
          "El pentan-1-ol forma puentes de H: 138 °C. El ácido pentanoico forma dímeros por dos puentes de H: 186 °C.",
          "Orden: <b>pentano (36) &lt; pentanal (103) &lt; pentan-1-ol (138) &lt; ácido pentanoico (186 °C)</b>.",
          "Los isómeros C₅H₁₂ sólo difieren en la ramificación: cuanto más compacta, menos contacto y menos London: <b>2,2-dimetilpropano (9,5) &lt; 2-metilbutano (28) &lt; pentano (36 °C)</b>."
        ]) +
        "<h5>Densidad, solubilidad y mezclas</h5>" +
        "<p>Los hidrocarburos y casi todos los derivados halogenados con pocos H son <b>menos densos que el agua</b> (flotan: la gasolina sobre un charco), salvo los muy halogenados (el tetraclorometano, 1,59 g/mL, se hunde). «Lo semejante disuelve a lo semejante» (Tema 2): las grasas se disuelven en gasolina y en tetracloruro de carbono, no en agua; el etanol se mezcla con agua en cualquier proporción y también con la gasolina (por eso se usa de aditivo). Los jabones y detergentes tienen una cadena larga apolar (que se pega a la grasa) y un extremo polar (que se queda en el agua).</p>" +
        "<p>Puedes volver al simulador de series homólogas (sección 2) para comprobar cómo crece el punto de ebullición con el número de carbonos y con el grupo funcional.</p>"
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Reactividad: las reacciones que hay que conocer",
      html:
        "<p>Los miles de reacciones orgánicas se agrupan en pocos tipos, según lo que le pasa al grupo funcional o al enlace múltiple. Aprende el tipo, el reactivo, la condición y la regla; después, el resto es aplicar.</p>" +
        tabla(["Tipo", "Qué pasa", "Reactivo y condiciones", "Ejemplo"], [
          ["<b>Sustitución</b> (halogenación)", "un H de un alcano se cambia por un halógeno", "Cl₂ o Br₂ y luz UV", "CH₄ + Cl₂ → CH₃Cl + HCl"],
          ["<b>Sustitución</b> (hidrólisis)", "un halógeno se cambia por un OH", "NaOH en agua", "CH₃CH₂Br + NaOH → CH₃CH₂OH + NaBr"],
          ["<b>Adición</b>", "se rompe un π y se añaden dos átomos", "H₂ (Pt, Ni), X₂, HX, H₂O (H⁺)", "CH₂=CH₂ + Br₂ → CH₂Br−CH₂Br"],
          ["<b>Eliminación</b>", "salen dos átomos vecinos y aparece un doble enlace", "alcohol: H₂SO₄ conc., calor · halogenuro: KOH en etanol", "CH₃CH₂OH → CH₂=CH₂ + H₂O"],
          ["<b>Oxidación</b>", "el C del −OH gana enlaces con O", "K₂Cr₂O₇ en medio ácido", "CH₃CH₂OH → CH₃CHO → CH₃COOH"],
          ["<b>Esterificación</b>", "ácido + alcohol dan éster y agua", "H₂SO₄ (catalizador), calor", "CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O"],
          ["<b>Combustión</b>", "oxidación completa con O₂", "O₂ y una chispa", "CH₄ + 2 O₂ → CO₂ + 2 H₂O"]
        ]) +
        "<h5>Dos reglas que ordenan los productos</h5>" +
        "<ul>" +
        "<li><b>Regla de Markovnikov</b> (adición de HX o H₂O a un alqueno asimétrico): el H se une al carbono del doble enlace que <i>ya tiene más H</i>; el X o el OH, al que tiene menos. «Al que más tiene, más se le da». CH₃−CH=CH₂ + HBr → CH₃−CHBr−CH₃ (2-bromopropano, mayoritario).</li>" +
        "<li><b>Regla de Saytzeff</b> (eliminación): el doble enlace que se forma es el <i>más sustituido</i>, es decir, el H sale del carbono vecino que tiene menos H. El butan-2-ol da sobre todo but-2-eno, y no but-1-eno.</li>" +
        "</ul>" +
        "<h5>Oxidación de alcoholes: depende de cuántos H tenga el carbono del −OH</h5>" +
        "<ul>" +
        "<li><b>Primario</b> (el C del −OH tiene 2 H): aldehído y, con más oxidante, ácido carboxílico. El vino que se «pica» se convierte en vinagre: etanol → etanal → ácido etanoico.</li>" +
        "<li><b>Secundario</b> (1 H): cetona. El propan-2-ol da propanona.</li>" +
        "<li><b>Terciario</b> (ningún H): no se oxida en estas condiciones (el 2-metilpropan-2-ol).</li>" +
        "</ul>" +
        w("q7_reacciones") +
        ejemplo("Encadenar reacciones", "Partiendo de propeno, escribe y nombra los productos de la secuencia: (1) adición de HBr; (2) tratamiento con NaOH(aq); (3) oxidación con K₂Cr₂O₇/H⁺. ¿Cuántos gramos del producto final salen de 42 g de propeno si cada etapa tiene un rendimiento del 90 %? (C = 12; H = 1; O = 16)", [
          "<b>(1)</b> CH₃−CH=CH₂ + HBr → CH₃−CHBr−CH₃ (Markovnikov): <b>2-bromopropano</b>.",
          "<b>(2)</b> Sustitución nucleófila: CH₃−CHBr−CH₃ + NaOH → CH₃−CH(OH)−CH₃ + NaBr: <b>propan-2-ol</b> (alcohol secundario).",
          "<b>(3)</b> El alcohol secundario se oxida a cetona: CH₃−CO−CH₃, <b>propanona</b>.",
          "Moles: 42 g de propeno (M = 42) = 1 mol, y la estequiometría es 1 : 1 : 1 : 1. Con tres etapas del 90 %: 0,90³ = 0,729 mol de propanona (M = 58) → 0,729 · 58 = <b>42,3 g</b>."
        ]) +
        ojo("La reacción de un alcohol con un ácido es una <b>esterificación</b> (sale agua); la de un halogenuro con KOH en etanol es una <b>eliminación</b>, y con NaOH en agua una <b>sustitución</b>. Con el mismo halogenuro, cambiar el disolvente cambia el producto.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Combustión de hidrocarburos y alcoholes: oxígeno, CO₂ y energía",
      html:
        "<p>La combustión es la reacción más utilizada de la química orgánica: producimos casi toda la energía de coches, calefacciones y centrales térmicas quemando compuestos del carbono. En la <b>combustión completa</b> todo el carbono pasa a CO₂ y todo el hidrógeno a H₂O:</p>" +
        "<div class='formula-wrap'><div class='formula'>C<sub>x</sub>H<sub>y</sub>O<sub>z</sub> + (x + y/4 − z/2) O₂ → x CO₂ + (y/2) H₂O</div></div>" +
        "<p>Para ajustarla sin fórmula: se ajustan primero el C (en el CO₂), después el H (en el H₂O) y por último el O, para el que se cuenta el que hay en los productos y se resta el que ya trae el combustible. Si sale un número de O₂ con medio, se multiplica todo por 2: 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O.</p>" +
        "<p>La <b>energía</b> que se desprende (entalpía de combustión, Tema 6) es proporcional a los moles que se queman. Algunos valores, por mol de combustible y con agua líquida: metano 890 kJ, etano 1 560, propano 2 220, butano 2 877, octano 5 470, etanol 1 367 kJ/mol.</p>" +
        ejemplo("Oxígeno, CO₂ y energía de una bombona", "Una bombona contiene 12,5 kg de butano (C₄H₁₀, M = 58 g/mol; ΔH<sub>c</sub> = −2 877 kJ/mol). Calcula los moles de O₂ que necesita y la masa de CO₂ que emite al quemarse del todo, y la energía que desprende. (C = 12; H = 1; O = 16)", [
          "Ecuación: 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O; por cada mol de butano: 6,5 mol de O₂ y 4 mol de CO₂.",
          "n(butano) = 12 500/58 = 215,5 mol.",
          "O₂: 215,5 · 6,5 = 1 401 mol. CO₂: 215,5 · 4 = 862 mol → 862 · 44 = 37 931 g ≈ <b>37,9 kg de CO₂</b>.",
          "Energía: 215,5 · 2 877 = 620 000 kJ ≈ <b>620 MJ</b> (unos 172 kWh)."
        ]) +
        "<h5>¿Qué combustible emite menos CO₂ por la misma energía?</h5>" +
        "<p>No basta con mirar cuánto CO₂ sale por kilo: lo que importa es cuánto CO₂ se emite <b>por unidad de energía</b> obtenida. Un combustible con más hidrógeno por carbono (más H₂O y menos CO₂) emite menos. Con los datos anteriores: metano, 44/890 = 0,049 kg de CO₂ por MJ; octano (gasolina), 8 · 44/5 470 = 0,064 kg/MJ: la gasolina emite alrededor de un 30 % más de CO₂ que el gas natural por cada MJ.</p>" +
        w("q7_combustion") +
        "<h5>Combustión incompleta: monóxido de carbono y hollín</h5>" +
        "<p>Cuando falta oxígeno (una estufa mal ventilada, un motor mal regulado) el carbono no llega a CO₂: se forma <b>monóxido de carbono</b> (CH₄ + 3/2 O₂ → CO + 2 H₂O) o carbono (hollín). El CO es un gas incoloro, inodoro y letal: se une a la hemoglobina 200 veces mejor que el O₂ e impide transportar oxígeno. Además se libera menos energía por mol. Por eso las calderas de gas necesitan ventilación y revisión.</p>" +
        ejemplo("Combustión por volúmenes", "Se queman 10 L de etino (acetileno) medidos en condiciones normales con oxígeno suficiente (ΔH<sub>c</sub> = −1 300 kJ/mol). Calcula los litros de O₂ necesarios y de CO₂ que se forman a la misma presión y temperatura, y la energía que se desprende.", [
          "2 C₂H₂ + 5 O₂ → 4 CO₂ + 2 H₂O. Para gases a igual P y T los volúmenes están en la proporción de los coeficientes: V(O₂) = 10 · 5/2 = <b>25 L</b>; V(CO₂) = 10 · 4/2 = <b>20 L</b> (el agua es líquida).",
          "n(C₂H₂) = 10/22,4 = 0,446 mol → energía = 0,446 · 1 300 = <b>580 kJ</b>."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Petróleo, gas natural y biocombustibles",
      html:
        "<p>El petróleo es una mezcla de miles de hidrocarburos (sobre todo alcanos, cicloalcanos y aromáticos) que se formó durante millones de años a partir de restos de organismos marinos enterrados. Se separa en una <b>torre de destilación fraccionada</b>: el crudo se calienta a unos 400 °C y sus componentes se evaporan; al subir por la torre se enfrían y se condensan a distinta altura, los más ligeros (menor punto de ebullición, menos carbonos) arriba y los más pesados abajo. Cada fracción sigue siendo una mezcla, pero de moléculas de tamaño parecido.</p>" +
        tabla(["Fracción", "Átomos de C", "Intervalo de ebullición (°C)", "Usos"], [
          ["gases (GLP)", "C₁–C₄", "menos de 30", "gas de bombona, propano, butano, petroquímica"],
          ["gasolina (nafta)", "C₅–C₁₀", "30–200", "combustible de coches, disolventes"],
          ["queroseno", "C₁₀–C₁₆", "175–275", "aviones (combustible de reactores)"],
          ["gasóleo (diésel)", "C₁₄–C₂₀", "250–350", "camiones, trenes, calefacción"],
          ["aceites lubricantes y fueloil", "C₂₀–C₅₀", "350–550", "motores, barcos, centrales"],
          ["residuo (asfalto, brea)", "más de C₅₀", "más de 550", "carreteras, impermeabilizantes"]
        ]) +
        "<p>La demanda de gasolina es mayor que la fracción que sale del crudo, así que se recurre al <b>craqueo</b>: con calor y catalizador, las moléculas largas se parten en otras más cortas y útiles (por ejemplo, C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆: un alcano y un alqueno, y los átomos se conservan). El <b>índice de octano</b> mide la resistencia de la gasolina a explotar antes de tiempo en el motor: por convenio, el 2,2,4-trimetilpentano (isooctano) vale 100 y el heptano 0, de modo que una gasolina de 95 octanos se comporta como una mezcla del 95 % de isooctano y el 5 % de heptano. Las cadenas ramificadas resisten mejor la compresión que las lineales.</p>" +
        "<h5>Gas natural y biogás</h5>" +
        "<p>El gas natural es, en un 70–90 %, metano. Es el combustible fósil que menos CO₂ emite por energía (sección anterior) y casi no tiene azufre, pero el propio metano es un potente gas de efecto invernadero (unas 28 veces más que el CO₂ en 100 años, a igualdad de masa), así que las fugas importan. El <b>biogás</b> es una mezcla de metano y CO₂ que producen las bacterias al descomponer residuos sin oxígeno.</p>" +
        "<h5>Biocombustibles y balance de CO₂</h5>" +
        "<p>El <b>bioetanol</b> se obtiene por fermentación alcohólica de azúcares (C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂, Tema 5) de caña, maíz o remolacha. El <b>biodiésel</b> son ésteres de ácidos grasos de aceites vegetales (se obtienen por transesterificación de los triglicéridos con metanol o etanol). Al quemarse emiten CO₂, pero ese carbono lo absorbieron las plantas de la atmósfera poco antes, así que el balance es mucho mejor que el de un combustible fósil que libera carbono guardado durante millones de años, aunque no es nulo (cultivo, fertilizantes, transporte, uso del suelo). La concentración de CO₂ en la atmósfera ha pasado de unos 280 ppm antes de la industrialización a más de 420 ppm; el aumento se debe a la combustión de combustibles fósiles y a la deforestación.</p>"
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Polímeros: moléculas gigantes",
      html:
        "<p>Un <b>polímero</b> es una molécula enorme formada por la repetición de miles de unidades pequeñas, los <b>monómeros</b>. Los hay naturales (celulosa, almidón, proteínas, ADN, caucho natural) y sintéticos (plásticos, fibras, gomas). Según cómo se unan los monómeros, hay dos tipos:</p>" +
        "<ul>" +
        "<li><b>Polímeros de adición</b>: los monómeros llevan un doble enlace; se rompe el π de cada uno y se encadenan sin perder ningún átomo: <i>n</i> CH₂=CH₂ → (−CH₂−CH₂−)<sub>n</sub>. Son los de las bolsas de plástico (polietileno), las tuberías (PVC), el teflón y la mayoría de los envases.</li>" +
        "<li><b>Polímeros de condensación</b>: los monómeros tienen dos grupos funcionales y, al unirse, sueltan una molécula pequeña (casi siempre agua). El <b>nailon</b> es una poliamida (diácido + diamina − H₂O), y el <b>PET</b> de las botellas, un poliéster (diácido + diol − H₂O).</li>" +
        "</ul>" +
        w("q7_polimeros") +
        ejemplo("Masa de un polímero", "El PVC se obtiene por polimerización del cloroeteno, CH₂=CHCl. a) Calcula la masa molar de una cadena de PVC de 500 unidades (M(C₂H₃Cl) = 62,5 g/mol). b) ¿Cuántos moles de cloroeteno hacen falta para fabricar 1 tonelada de PVC?", [
          "<b>a)</b> La cadena contiene 500 unidades repetidas −CH₂−CHCl−: M = 500 · 62,5 = <b>31 250 g/mol</b>.",
          "<b>b)</b> En una polimerización por adición no se pierde masa: se necesita 1 t de monómero. n = 10⁶ g / 62,5 g/mol = <b>16 000 mol</b> (16 kmol)."
        ]) +
        "<h5>Termoplásticos, termoestables y el problema del plástico</h5>" +
        "<p>Los <b>termoplásticos</b> (polietileno, PVC, PET) tienen cadenas sueltas, se ablandan con calor y se pueden fundir y volver a moldear: son reciclables. Los <b>termoestables</b> (baquelita, resinas epoxi) tienen las cadenas unidas entre sí por enlaces cruzados, no se funden y no se reciclan fácilmente. Como los enlaces C–C y C–H son muy estables, los plásticos tardan siglos en degradarse; los fragmentos (<i>microplásticos</i>) llegan a mares y cadenas alimentarias. Por eso se aplica la regla de las tres erres: reducir, reutilizar, reciclar, y se investigan polímeros biodegradables (el ácido poliláctico, de maíz).</p>"
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Problemas resueltos tipo examen",
      html:
        ejemplo("Problema 1: isómeros de un alcohol", "Escribe y nombra los cuatro alcoholes de fórmula C₄H₁₀O. Clasifica cada uno como primario, secundario o terciario e indica qué da al oxidarlo con K₂Cr₂O₇/H⁺.", [
          "Hay dos esqueletos: lineal (butano) y ramificado (2-metilpropano). En cada uno se cuelga el −OH de todos los carbonos distintos.",
          "<b>Butan-1-ol</b>, CH₃CH₂CH₂CH₂OH: primario → butanal → ácido butanoico.",
          "<b>Butan-2-ol</b>, CH₃CH(OH)CH₂CH₃: secundario → butanona.",
          "<b>2-Metilpropan-1-ol</b>, (CH₃)₂CHCH₂OH: primario → 2-metilpropanal → ácido 2-metilpropanoico.",
          "<b>2-Metilpropan-2-ol</b>, (CH₃)₃COH: terciario → no se oxida."
        ]) +
        ejemplo("Problema 2: fórmula de un compuesto", "Un compuesto orgánico tiene un 40,0 % de C, un 6,7 % de H y un 53,3 % de O en masa, y su masa molar es 60 g/mol. Halla su fórmula molecular y escribe dos isómeros de función. (C = 12; H = 1; O = 16)", [
          "Por cada 100 g: C 40,0/12 = 3,33 mol; H 6,7/1 = 6,7 mol; O 53,3/16 = 3,33 mol. Se divide entre el menor (3,33): C 1; H 2; O 1 → fórmula empírica <b>CH₂O</b> (M = 30).",
          "M molecular/M empírica = 60/30 = 2 → <b>C₂H₄O₂</b>.",
          "Isómeros de función: el <b>ácido etanoico</b>, CH₃−COOH, y el <b>metanoato de metilo</b>, H−COO−CH₃."
        ]) +
        ejemplo("Problema 3: grado de insaturación", "Un hidrocarburo tiene fórmula C₈H₁₀. Calcula su grado de insaturación y di qué estructura es compatible.", [
          "IDH = (2·8 + 2 − 10)/2 = 8/2 = <b>4</b>.",
          "Con 8 carbonos y 4 insaturaciones, lo más probable es un <b>anillo bencénico</b> (3 dobles enlaces y un ciclo) con dos carbonos más de cadena: etilbenceno (un etilo) o los xilenos (dos metilos).",
          "Un alcano de 8 carbonos sería C₈H₁₈: faltan 8 H, es decir, 4 pares → 4 insaturaciones."
        ]) +
        ejemplo("Problema 4: combustión y composición del aire", "Se queman 5,0 kg de propano (M = 44 g/mol) con aire (21 % de O₂ en volumen). Calcula la masa de CO₂ que se emite y el volumen de aire (CN) que se consume. (C = 12; H = 1; O = 16)", [
          "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. n(C₃H₈) = 5 000/44 = 113,6 mol.",
          "n(CO₂) = 3 · 113,6 = 340,9 mol → 340,9 · 44 = 15 000 g = <b>15,0 kg de CO₂</b> (tres veces la masa del propano).",
          "n(O₂) = 5 · 113,6 = 568,2 mol → V(O₂) = 568,2 · 22,4 = 12 727 L; V(aire) = 12 727/0,21 = 60 606 L ≈ <b>60,6 m³ de aire</b>."
        ]) +
        ejemplo("Problema 5: carbono asimétrico", "De las siguientes moléculas, ¿cuáles tienen carbonos asimétricos y cuántos estereoisómeros pueden tener como máximo? a) 2-clorobutano; b) 3-metilpentano; c) 2-bromo-3-clorobutano; d) propan-2-ol.", [
          "<b>a)</b> En el C2: H, Cl, CH₃ y CH₂CH₃ son cuatro grupos distintos → <b>1 carbono asimétrico</b>, 2¹ = 2 estereoisómeros (los dos enantiómeros).",
          "<b>b)</b> En el C3: H, CH₃ y <i>dos</i> grupos etilo iguales → <b>ninguno</b>.",
          "<b>c)</b> C2 (H, Br, CH₃, CHCl−CH₃) y C3 (H, Cl, CH₃, CHBr−CH₃): <b>dos carbonos asimétricos</b> distintos → 2² = 4 estereoisómeros.",
          "<b>d)</b> En el C2 hay dos CH₃ iguales → <b>ninguno</b>."
        ]) +
        ejemplo("Problema 6: ¿cuántos gramos de éster?", "Se hacen reaccionar 60 g de ácido etanoico (M = 60 g/mol) con un exceso de etanol. Si el rendimiento es del 67 %, ¿cuántos gramos de etanoato de etilo (M = 88 g/mol) se obtienen?", [
          "CH₃COOH + CH₃CH₂OH ⇌ CH₃COOCH₂CH₃ + H₂O: proporción 1 : 1.",
          "n(ácido) = 60/60 = 1 mol → 1 mol de éster teórico = 88 g.",
          "Masa real = 88 · 0,67 = <b>59,0 g</b> de etanoato de etilo."
        ])
    },
    // -------------------------------------------------------------- 13
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    // -------------------------------------------------------------- 14
    {
      h: "14. Autocomprobación del tema",
      html:
        "<p>Doce preguntas de test con explicación, tarjetas con las ideas clave y cuatro juegos: unir cada grupo funcional con su sufijo, clasificar sustancias por su fuerza intermolecular dominante, emparejar cada reacción con su tipo y ordenar los pasos del método de nomenclatura.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "sufijos") + w("clasificar", "familias") + w("emparejar", "reacciones") + w("orden", "metodo") + w("orden", "prioridad")
    }
  ];

  B.parte.t7b = { nuevas: nuevas };
})(window);
