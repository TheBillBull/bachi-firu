/* ============================================================
   Física y Química I · ampliaciones · Tema 7: Química del carbono
   (parte A: ampliación de las cinco secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t7/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Por qué el carbono es tan especial
  secciones[0] =
    "<h5>Cuatro electrones, cuatro enlaces, tres formas</h5>" +
    "<p>El carbono (Z = 6, 1s² 2s² 2p²) tiene cuatro electrones de valencia y forma <b>cuatro enlaces covalentes</b> (Tema 2). Según con cuántos átomos se una, adopta una de tres hibridaciones que fijan la forma de la molécula alrededor de él:</p>" +
    tabla(["Hibridación", "Enlaces que forma", "Forma alrededor del C", "Ángulo", "Ejemplo"], [
      ["sp³", "4 enlaces sencillos (σ)", "tetraedro", "109,5°", "metano, etano, etanol"],
      ["sp²", "1 doble + 2 sencillos (3 σ y 1 π)", "triángulo plano", "120°", "eteno, propanona, benceno"],
      ["sp", "1 triple + 1 sencillo, o 2 dobles (2 σ y 2 π)", "lineal", "180°", "etino, CO₂, HCN"]
    ]) +
    "<p>Por eso las cadenas de alcanos no son rectas sino en <b>zigzag</b>, con los carbonos a 109,5°, y por eso la fórmula esquelética (más abajo) se dibuja con ángulos.</p>" +
    "<h5>Catenación: por qué el carbono hace cadenas</h5>" +
    "<p>La <b>catenación</b>, la capacidad de unirse a otros átomos de carbono formando cadenas, ramificaciones y anillos, depende de que el enlace C–C sea muy fuerte (347 kJ/mol) y estable. El silicio, justo debajo del carbono, forma enlaces Si–Si bastante más débiles (≈ 226 kJ/mol) y muy reactivos con el oxígeno y el agua: sus cadenas largas no sobreviven. Además, el enlace C–H (413 kJ/mol) y los C–O, C–N y C–halógeno son fuertes y poco polares, de modo que las moléculas orgánicas son <b>estables a temperatura ambiente</b> pero reaccionan cuando se les da una oportunidad (calor, un catalizador, un reactivo adecuado). Se conocen más de diez millones de compuestos del carbono, muchos más que de todos los demás elementos juntos, y cada año se describen muchos miles más.</p>" +
    "<h5>Cuatro formas de escribir una molécula</h5>" +
    "<p>Una misma molécula se puede representar con distinto nivel de detalle. Aprender a pasar de una a otra es la mitad del tema:</p>" +
    tabla(["Fórmula", "Qué muestra", "Butano", "Etanol"], [
      ["Molecular", "cuántos átomos de cada elemento", "C₄H₁₀", "C₂H₆O"],
      ["Semidesarrollada", "cada carbono con sus hidrógenos y los enlaces C–C", "CH₃−CH₂−CH₂−CH₃", "CH₃−CH₂−OH"],
      ["Desarrollada", "todos los enlaces, uno a uno", "cuatro C en fila con 10 enlaces C–H", "C–C, C–O, 5 enlaces C–H y un O–H"],
      ["Esquelética", "sólo el esqueleto en zigzag: cada vértice y cada extremo es un C, y los H unidos al C se sobrentienden", "zigzag de 4 vértices", "zigzag de 2 vértices con −OH"]
    ]) +
    "<p>La fórmula molecular <b>no identifica</b> un compuesto (C₂H₆O es tanto el etanol como el éter dimetílico, como verás en isomería); la semidesarrollada y la esquelética, sí. En una fórmula esquelética, los heteroátomos (O, N, halógenos) y sus hidrógenos sí se escriben. Prueba con el constructor: modifica la cadena y observa cómo cambian a la vez el dibujo, la fórmula semidesarrollada, la molecular y el nombre.</p>" +
    w("q7_constructor", "moleculas") +
    "<h5>Las formas del carbono puro</h5>" +
    "<p>El carbono elemental ya muestra cómo la estructura manda sobre las propiedades (Tema 2): el <b>diamante</b> (cada C sp³ unido a cuatro: red rígida, duro, aislante), el <b>grafito</b> (capas de C sp² con electrones deslocalizados: blando y conductor), el <b>grafeno</b> (una sola capa de grafito, de un átomo de grosor, premio Nobel de Física 2010), los <b>fullerenos</b> (C₆₀, una «pelota de fútbol» de 60 átomos) y los <b>nanotubos</b> (láminas de grafeno enrolladas). Son todos carbono puro y todos distintos.</p>" +
    ojo("Por tradición se estudian como química inorgánica unos pocos compuestos con carbono, como el monóxido y el dióxido de carbono (CO y CO₂), los carbonatos (CaCO₃) y los cianuros. La química orgánica trata, sobre todo, de los compuestos con enlaces C–C y C–H.");

  // ---------------------------------------------------------------- 2. Alcanos
  secciones[1] =
    "<h5>La serie homóloga de los alcanos</h5>" +
    "<p>Los alcanos forman una <b>serie homóloga</b>: cada miembro tiene un grupo CH₂ más que el anterior, y todos comparten fórmula general (C<sub>n</sub>H<sub>2n+2</sub>) y propiedades parecidas que varían de forma regular. Los cuatro primeros tienen nombres tradicionales; a partir del quinto, la raíz es el prefijo numérico griego:</p>" +
    tabla(["n", "Nombre", "Fórmula", "Estado a 25 °C", "T ebullición (°C)"], [
      ["1", "metano", "CH₄", "gas", "−161,5"], ["2", "etano", "C₂H₆", "gas", "−88,6"], ["3", "propano", "C₃H₈", "gas", "−42,1"], ["4", "butano", "C₄H₁₀", "gas (se licúa a presión)", "−0,5"],
      ["5", "pentano", "C₅H₁₂", "líquido", "36,1"], ["6", "hexano", "C₆H₁₄", "líquido", "68,7"], ["7", "heptano", "C₇H₁₆", "líquido", "98,4"], ["8", "octano", "C₈H₁₈", "líquido", "125,7"],
      ["9", "nonano", "C₉H₂₀", "líquido", "150,8"], ["10", "decano", "C₁₀H₂₂", "líquido", "174,1"]
    ]) +
    "<p>Fíjate en cómo crece el punto de ebullición: cuantos más carbonos, más electrones y más superficie de contacto, es decir, más fuerzas de London (Tema 2). Por eso el gas natural (CH₄) es un gas, la gasolina (C₅–C₁₀) un líquido volátil y la parafina de las velas (más de 20 C) un sólido.</p>" +
    w("q7_serie") +
    "<h5>Radicales alquilo</h5>" +
    "<p>Si a un alcano se le quita un hidrógeno queda un <b>radical alquilo</b>, que se nombra cambiando <i>-ano</i> por <i>-ilo</i> (o <i>-il</i> cuando va de prefijo). Son las ramas de las cadenas ramificadas:</p>" +
    tabla(["Radical", "Fórmula", "Se obtiene de", "Nombre en una cadena"], [
      ["metilo", "−CH₃", "metano", "metil"], ["etilo", "−CH₂−CH₃", "etano", "etil"], ["propilo", "−CH₂−CH₂−CH₃", "propano (por un extremo)", "propil"],
      ["isopropilo", "−CH(CH₃)−CH₃", "propano (por el C central)", "isopropil"], ["butilo", "−CH₂−CH₂−CH₂−CH₃", "butano (por un extremo)", "butil"]
    ]) +
    "<h5>Nombrar alcanos ramificados, regla a regla</h5>" +
    "<ol>" +
    "<li><b>Cadena principal</b>: la más larga de carbonos seguidos (aunque en el dibujo no parezca recta). Si hay dos igual de largas, la que tenga más ramas.</li>" +
    "<li><b>Numerar</b> la cadena desde el extremo que dé a las ramas los <b>localizadores más bajos</b> (se comparan las listas término a término: 2,3,5 gana a 2,4,5).</li>" +
    "<li><b>Nombrar las ramas</b> (radicales) por <b>orden alfabético</b> delante del nombre de la cadena, cada una con el número del carbono al que va unida.</li>" +
    "<li>Si un radical se repite: <i>di-, tri-, tetra-</i>… y se repite el localizador de cada uno (2,2-dimetil). Estos prefijos <b>no cuentan</b> para el orden alfabético: «3-etil-2,2-dimetil…», con <i>etil</i> antes que <i>dimetil</i> porque la «e» va antes que la «m».</li>" +
    "<li>Los números se separan entre sí con comas, y de las letras con guiones. Todo se escribe junto: <b>2,3-dimetilpentano</b>.</li>" +
    "</ol>" +
    ejemplo("Nombrar tres alcanos ramificados", "Nombra: a) CH₃−CH(CH₃)−CH₂−CH₂−CH₃; b) CH₃−CH(CH₃)−CH(CH₃)−CH₂−CH₃; c) CH₃−CH(CH₃)−CH(CH₂−CH₃)−CH₂−CH₃.", [
      "<b>a)</b> Cadena más larga: 5 C (pentano). Rama: un metilo. Numerando de izquierda a derecha el metilo cae en el C2; de derecha a izquierda, en el C4: gana el 2 → <b>2-metilpentano</b>.",
      "<b>b)</b> Cadena de 5 C; dos metilos en los carbonos 2 y 3 (numerando desde la izquierda; desde la derecha serían el 3 y el 4: peor) → <b>2,3-dimetilpentano</b>.",
      "<b>c)</b> Ojo: la cadena más larga atraviesa el etilo de la rama: C−C−C(−etil)−C−C. La cadena principal tiene 5 C (pentano), con un etilo en C3 y un metilo en C2: <b>3-etil-2-metilpentano</b> (alfabético: etil antes que metil). Desde el otro extremo saldría 3-etil-4-metil: peor."
    ]) +
    w("q7_nombrar", "moleculas") +
    "<h5>Propiedades y reactividad de los alcanos</h5>" +
    "<p>Los alcanos son <b>apolares</b>: sólo tienen fuerzas de London, no se disuelven en agua (flotan sobre ella: su densidad es de 0,6 a 0,8 g/mL), sí en otros disolventes apolares, y a igual número de carbonos las moléculas ramificadas hierven más abajo que las lineales. Son <b>poco reactivos</b>, porque los enlaces C–C y C–H son fuertes y casi no hay zonas con carga donde atacar; de ahí que se llamen «parafinas» (del latín <i>parum affinis</i>, «poca afinidad»). Pese a ello, dan dos reacciones muy importantes: la <b>combustión</b> (con O₂ producen CO₂, H₂O y mucha energía) y la <b>sustitución por halógenos</b> con luz ultravioleta (CH₄ + Cl₂ → CH₃Cl + HCl). Las dos se desarrollan más adelante en este tema.</p>" +
    "<h5>Cicloalcanos</h5>" +
    "<p>Si los extremos de la cadena se unen, aparece un anillo: es un <b>cicloalcano</b>, de fórmula C<sub>n</sub>H<sub>2n</sub> (dos H menos que el alcano, porque los dos carbonos que cierran el ciclo pierden uno cada uno), y se nombra con el prefijo <i>ciclo-</i>: ciclopropano (C₃H₆), ciclobutano (C₄H₈), ciclopentano (C₅H₁₀), ciclohexano (C₆H₁₂). Los anillos pequeños están «tensos» (en el ciclopropano los enlaces C–C–C forman 60° en vez de 109,5°) y reaccionan con más facilidad; el ciclohexano, en forma de silla, no tiene tensión. Un cicloalcano es <b>isómero</b> del alqueno con el mismo número de carbonos (C₆H₁₂: ciclohexano y hex-1-eno). En fórmula esquelética se dibujan como un polígono sin letras: un triángulo, un cuadrado, un pentágono, un hexágono.</p>";

  // ---------------------------------------------------------------- 3. Alquenos y alquinos
  secciones[2] =
    "<h5>Fórmulas generales y forma</h5>" +
    "<p>Los hidrocarburos insaturados tienen menos hidrógenos que el alcano correspondiente: los <b>alquenos</b> (un doble enlace) siguen C<sub>n</sub>H<sub>2n</sub> y los <b>alquinos</b> (un triple enlace), C<sub>n</sub>H<sub>2n−2</sub>. Cada doble enlace (o cada ciclo) resta 2 H; cada triple enlace, 4 H. En el doble enlace los dos carbonos son sp²: la molécula es plana alrededor de él (120°) y el enlace tiene un σ y un π; en el triple, los carbonos son sp (lineal, 180°), con un σ y dos π. Cuanto más enlaces entre los dos carbonos, más corto y más fuerte: 154 pm y 347 kJ/mol (C–C), 134 pm y 614 kJ/mol (C=C), 120 pm y 839 kJ/mol (C≡C).</p>" +
    "<h5>Cómo se nombran</h5>" +
    "<ol>" +
    "<li>La cadena principal es la <b>más larga que contiene el enlace múltiple</b> (aunque haya otra más larga sin él).</li>" +
    "<li>Se numera para dar al enlace múltiple el <b>localizador más bajo</b> (esta regla va <i>antes</i> que la de las ramas).</li>" +
    "<li>Terminación <b>-eno</b> (doble) o <b>-ino</b> (triple), con el número del primer carbono del enlace delante: but-1-eno, but-2-eno, pent-2-ino. Con dos enlaces dobles: <b>-dieno</b> y se intercala una «a» (buta-1,3-dieno). Si hay uno doble y uno triple: -en-…-ino (pent-1-en-4-ino).</li>" +
    "<li>El localizador se omite cuando no hace falta: eteno, etino, propeno, propino.</li>" +
    "</ol>" +
    ejemplo("Nombrar alquenos y alquinos", "Nombra: a) CH₃−CH=CH−CH₂−CH₃; b) CH₂=CH−CH(CH₃)−CH₃; c) CH₂=CH−CH=CH−CH₃; d) CH₃−C≡C−CH₂−CH₃.", [
      "<b>a)</b> 5 C con un doble enlace entre C2 y C3 (numerando desde la izquierda; desde la derecha sería el 3): <b>pent-2-eno</b>.",
      "<b>b)</b> Cadena más larga con el doble enlace: 4 C. Numerando desde el extremo del doble enlace: C1=C2, y el metilo en el C3 → <b>3-metilbut-1-eno</b> (no «2-metilbut-3-eno»: manda el doble enlace).",
      "<b>c)</b> Dos dobles enlaces en las posiciones 1 y 3 de una cadena de 5 C → <b>penta-1,3-dieno</b>.",
      "<b>d)</b> Triple enlace entre C2 y C3 de una cadena de 5 C → <b>pent-2-ino</b>."
    ]) +
    "<h5>Isomería geométrica: cis y trans</h5>" +
    "<p>El doble enlace C=C <b>no gira</b> (para girar habría que romper el enlace π). Si cada carbono del doble enlace lleva dos sustituyentes distintos, hay dos formas posibles: con los sustituyentes iguales del <b>mismo lado</b> (<i>cis</i>) o de <b>lados opuestos</b> (<i>trans</i>). El cis-but-2-eno hierve a 3,7 °C y el trans-but-2-eno a 0,9 °C. El but-1-eno y el propeno no tienen isómeros cis-trans, porque uno de los carbonos del doble enlace lleva dos H iguales. Los alquinos son lineales, así que no tienen isomería cis-trans.</p>" +
    "<h5>Reactividad: la adición al enlace múltiple</h5>" +
    "<p>El enlace π es más débil y más accesible que el σ, así que los alquenos y alquinos dan sobre todo <b>reacciones de adición</b>: se rompe el π y se añaden dos átomos, uno a cada carbono (hidrogenación con H₂, halogenación con Cl₂ o Br₂, adición de HCl, HBr o H₂O). Una prueba sencilla: si un hidrocarburo decolora el agua de bromo (de color pardo-rojizo), tiene enlaces múltiples. El eteno madura la fruta; el etino arde con O₂ a 3 000 °C en el soplete oxiacetilénico. Con HX o H₂O se aplica la regla de Markovnikov, que se explica con el simulador de reacciones.</p>" +
    "<h5>Los hidrocarburos aromáticos: el benceno</h5>" +
    "<p>El benceno, C₆H₆, es un anillo plano de seis carbonos sp² con tres «dobles enlaces» alternados, pero los seis enlaces C–C son <b>idénticos</b> (139 pm, entre el sencillo y el doble): los seis electrones π están deslocalizados en el anillo (resonancia, Tema 2), y eso le da una gran estabilidad. No da reacciones de adición como un alqueno, sino de <i>sustitución</i> (un H se cambia por otro grupo, conservando el anillo). Compuestos derivados: el <b>tolueno</b> (metilbenceno), el <b>fenol</b> (hidroxibenceno) y la <b>anilina</b> (aminobenceno). Son tóxicos (el benceno es cancerígeno) y se obtienen del petróleo. El <b>grado de insaturación</b> del benceno es 4 (tres dobles enlaces y un ciclo), como el de casi cualquier derivado con un anillo bencénico.</p>" +
    w("q7_insaturacion");

  // ---------------------------------------------------------------- 4. Grupos funcionales
  secciones[3] =
    "<h5>Las familias de compuestos y sus grupos</h5>" +
    "<p>Un grupo funcional es la parte reactiva de la molécula. La tabla incluye los cinco del temario y otros cinco imprescindibles:</p>" +
    tabla(["Familia", "Grupo", "Fórmula general", "Nombre del grupo principal", "Ejemplo"], [
      ["Alcohol", "−OH", "R−OH", "sufijo <b>-ol</b>", "etanol, CH₃CH₂OH"],
      ["Éter", "−O−", "R−O−R'", "<i>radical</i>oxi<i>alcano</i>", "metoxietano, CH₃OCH₂CH₃"],
      ["Aldehído", "−CHO", "R−CHO", "sufijo <b>-al</b>", "etanal, CH₃CHO"],
      ["Cetona", "−CO−", "R−CO−R'", "sufijo <b>-ona</b>", "propanona, CH₃COCH₃"],
      ["Ácido carboxílico", "−COOH", "R−COOH", "<b>ácido …-oico</b>", "ácido etanoico, CH₃COOH"],
      ["Éster", "−COO−", "R−COO−R'", "<i>-ato de -ilo</i>", "etanoato de etilo, CH₃COOCH₂CH₃"],
      ["Amina", "−NH₂", "R−NH₂", "sufijo <b>-amina</b>", "etanamina, CH₃CH₂NH₂"],
      ["Amida", "−CONH₂", "R−CONH₂", "sufijo <b>-amida</b>", "etanamida, CH₃CONH₂"],
      ["Nitrilo", "−C≡N", "R−C≡N", "sufijo <b>-nitrilo</b>", "propanonitrilo, CH₃CH₂CN"],
      ["Derivado halogenado", "−F, −Cl, −Br, −I", "R−X", "prefijo <b>fluoro-, cloro-, bromo-, yodo-</b>", "cloroetano, CH₃CH₂Cl"]
    ]) +
    "<p>Aquí R y R' representan cadenas de carbonos. Las funciones <b>con el grupo en el extremo</b> de la cadena (aldehído, ácido, amida, nitrilo) llevan siempre el C1 en ese extremo; las demás (alcohol, cetona, amina) pueden ir en cualquier carbono y hay que indicar su localizador.</p>" +
    "<h5>¿Quién manda cuando hay varios grupos?</h5>" +
    "<p>Si en una molécula hay más de un grupo, solo uno es el <b>principal</b> (el que da el sufijo y manda en la numeración); los demás pasan a ser prefijos. El orden de prioridad que necesitas es:</p>" +
    "<div class='formula-wrap'><div class='formula'>ácido &gt; éster &gt; amida &gt; nitrilo &gt; aldehído &gt; cetona &gt; alcohol &gt; amina &gt; enlace doble &gt; enlace triple</div></div>" +
    "<p>Los grupos que no son principales se nombran como prefijos: −OH <i>hidroxi-</i>, =O <i>oxo-</i> (si hay un grupo de mayor rango), −NH₂ <i>amino-</i>, −C≡N <i>ciano-</i>; los halógenos y radicales siempre son prefijos. Ejemplo: HO−CH₂−CH₂−CH₂−COOH es el <b>ácido 4-hidroxibutanoico</b> (manda el ácido, el alcohol pasa a «hidroxi»).</p>" +
    "<h5>Método para nombrar con un grupo principal</h5>" +
    "<ol>" +
    "<li>Localiza el grupo principal y elige la cadena más larga <b>que lo contenga</b> (y a los enlaces múltiples).</li>" +
    "<li>Numera para dar el localizador más bajo al grupo principal; después, a los enlaces múltiples; después, a las ramas.</li>" +
    "<li>Escribe: ramas (alfabético) + raíz + enlaces (-an-, -en-, -in-) + sufijo del grupo con su localizador: <b>butan-2-ol</b>, <b>pentan-2-ona</b>, <b>prop-2-en-1-ol</b>, <b>ácido 2-metilpropanoico</b>.</li>" +
    "<li>El localizador del aldehído y del ácido (siempre 1) no se escribe.</li>" +
    "</ol>" +
    ejemplo("Nombrar compuestos con grupo funcional", "Nombra: a) CH₃−CH₂−CH(OH)−CH₃; b) CH₃−CH₂−CO−CH₂−CH₃; c) CH₃−CH(CH₃)−COOH; d) CH₂=CH−CH₂−OH; e) CH₃−CH(CH₃)−CH₂−CH₂−OH.", [
      "<b>a)</b> 4 C, el OH está en el C2 si numeras desde la derecha (en el C3 desde la izquierda): gana el 2 → <b>butan-2-ol</b>.",
      "<b>b)</b> 5 C con el C=O en el centro, C3 → <b>pentan-3-ona</b>.",
      "<b>c)</b> El −COOH marca el C1; 3 C con un metilo en el C2 → <b>ácido 2-metilpropanoico</b>.",
      "<b>d)</b> 3 C, el −OH manda (C1) y el doble enlace queda en el C2 → <b>prop-2-en-1-ol</b> (alcohol alílico).",
      "<b>e)</b> El −OH en el C1 y el metilo en el C3 de la cadena de 4 carbonos → <b>3-metilbutan-1-ol</b> (alcohol isoamílico)."
    ]) +
    w("q7_grupos", "moleculas") +
    "<h5>Propiedades según el grupo: fuerzas intermoleculares en acción</h5>" +
    "<p>El grupo funcional decide qué fuerzas hay entre las moléculas (Tema 2). Compara cinco sustancias con masa molar casi igual (58–60 g/mol): sólo cambia el grupo, y el punto de ebullición pasa de −0,5 °C a 118 °C.</p>" +
    tabla(["Sustancia", "Grupo", "M (g/mol)", "Fuerza dominante", "T ebullición (°C)"], [
      ["butano, C₄H₁₀", "ninguno", "58", "London", "−0,5"],
      ["propanal, C₃H₆O", "aldehído", "58", "dipolo–dipolo", "48"],
      ["propanona, C₃H₆O", "cetona", "58", "dipolo–dipolo", "56"],
      ["propan-1-amina, C₃H₉N", "amina", "59", "puente de H (débil)", "48"],
      ["propan-1-ol, C₃H₈O", "alcohol", "60", "puente de H", "97"],
      ["ácido etanoico, C₂H₄O₂", "ácido", "60", "puentes de H (dímeros)", "118"]
    ]) +
    "<p>Los alcoholes y ácidos de pocos carbonos se mezclan con agua (forman puentes de H con ella); al alargar la cadena, la parte apolar domina y se vuelven insolubles (el etanol es soluble, el octan-1-ol no). Los ésteres, sin O–H, hierven mucho más bajo que los ácidos isómeros y huelen a fruta: el etanoato de etilo a disolvente, el butanoato de etilo a piña, el etanoato de isopentilo a plátano.</p>" +
    "<h5>Presencia cotidiana</h5>" +
    "<p>Metanol (tóxico, anticongelante y combustible), etanol (bebidas, desinfectante, biocombustible), propano-1,2,3-triol o glicerina (cosmética, grasas), metanal (conservante: el formol), propanona (quitaesmalte), ácido etanoico (vinagre al 5 %), ésteres (aromas), aminas (olor del pescado), amidas (proteínas, nailon) y urea (fertilizante).</p>";

  // ---------------------------------------------------------------- 5. Isomería
  secciones[4] =
    "<h5>Isómeros: un mismo conjunto de átomos, otras moléculas</h5>" +
    "<p>La fórmula molecular sólo dice <i>cuántos</i> átomos hay, no cómo se unen. Dos compuestos son isómeros si comparten fórmula molecular pero son distintos. Se clasifican en dos grandes bloques:</p>" +
    tabla(["Tipo", "Qué cambia", "Ejemplo (misma fórmula)", "Diferencia en propiedades"], [
      ["<b>Estructural de cadena</b>", "la forma de la cadena carbonada", "butano / 2-metilpropano (C₄H₁₀)", "pequeña (−0,5 °C frente a −11,7 °C)"],
      ["<b>Estructural de posición</b>", "dónde está el grupo o el enlace múltiple", "propan-1-ol / propan-2-ol (C₃H₈O); but-1-eno / but-2-eno", "moderada (97 frente a 82 °C)"],
      ["<b>Estructural de función</b>", "el grupo funcional es otro", "etanol / metoximetano (C₂H₆O); propanal / propanona (C₃H₆O)", "grande (78 frente a −25 °C)"],
      ["<b>Geométrica (cis-trans)</b>", "disposición en el espacio alrededor de un doble enlace", "cis- / trans-but-2-eno", "pequeña (3,7 frente a 0,9 °C)"],
      ["<b>Óptica</b>", "imágenes especulares no superponibles (carbono asimétrico)", "(R)- y (S)-butan-2-ol", "idénticas, salvo el giro de la luz polarizada y el comportamiento biológico"]
    ]) +
    "<p>Los tres primeros son <b>isomería estructural</b> (los átomos se unen de forma distinta); los dos últimos, <b>estereoisomería</b> (misma conectividad, distinta disposición en el espacio). El número de isómeros crece muy deprisa con el tamaño de la cadena:</p>" +
    tabla(["Alcano", "C₄H₁₀", "C₅H₁₂", "C₆H₁₄", "C₇H₁₆", "C₈H₁₈", "C₉H₂₀", "C₁₀H₂₂", "C₂₀H₄₂"], [["Isómeros de cadena", "2", "3", "5", "9", "18", "35", "75", "366 319"]]) +
    w("q7_isomeria") +
    "<h5>Isomería de función: parejas clásicas</h5>" +
    "<p>Hay tres parejas que conviene saber de memoria: <b>alcohol y éter</b> (C<sub>n</sub>H<sub>2n+2</sub>O: etanol y metoximetano), <b>aldehído y cetona</b> (C<sub>n</sub>H<sub>2n</sub>O: propanal y propanona) y <b>ácido carboxílico y éster</b> (C<sub>n</sub>H<sub>2n</sub>O₂: ácido etanoico y metanoato de metilo). Dentro de cada pareja las propiedades son muy diferentes: el etanol es líquido (78 °C) y el éter dimetílico, un gas (−25 °C).</p>" +
    "<h5>Isomería óptica: moléculas con «mano izquierda y mano derecha»</h5>" +
    "<p>Un <b>carbono asimétrico</b> (quiral) es un carbono sp³ unido a <b>cuatro grupos distintos</b>. Una molécula con un solo carbono asimétrico existe en dos formas que son <b>imágenes especulares</b> una de otra y no se pueden superponer, como la mano izquierda y la derecha: son <b>enantiómeros</b>. Tienen las mismas propiedades físicas y químicas con una excepción: <b>desvían en sentido contrario el plano de la luz polarizada</b> (por eso se llaman ópticamente activos) y se comportan de forma distinta en un organismo, que está hecho de moléculas quirales. El limoneno huele a limón en una forma y a naranja en la otra, y la talidomida, que se vendió en los años 60 como mezcla de enantiómeros, provocó malformaciones graves en miles de recién nacidos: aquella tragedia cambió la regulación de los medicamentos y el interés por la quiralidad. Con <i>n</i> carbonos asimétricos distintos hay, como máximo, 2<sup>n</sup> estereoisómeros. Mueve el simulador para ver qué moléculas tienen carbono asimétrico: el butan-2-ol sí, el propan-2-ol no (dos grupos metilo iguales).</p>" +
    w("q7_quiral") +
    ojo("Un carbono con dos grupos iguales, como el C2 del propan-2-ol (dos CH₃) o cualquier CH₂, <b>no</b> es asimétrico. Y un carbono con doble enlace tampoco: sólo cuentan los sp³ con cuatro sustituyentes distintos.");

  B.parte.t7a = { secciones: secciones };
})(window);
