/* ============================================================
   Química II · ampliaciones · Tema 3: Sistema periódico
   (parte A: se añade al final de las secciones originales 1 a 4)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t3/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso: organización de la tabla
  secciones[0] = env(
    "<h5>De la configuración electrónica a la casilla de la tabla</h5>" +
    "<p>La tabla periódica no es un catálogo: es un <b>mapa de configuraciones electrónicas</b>. Si sabes escribir la configuración de un átomo, sabes dónde está en la tabla, y si sabes dónde está, puedes predecir cómo se comporta. Hay tres reglas que conviene tener automáticas:</p>" +
    "<ul>" +
    "<li><b>Periodo = mayor valor de <i>n</i></b> que aparece en la configuración (la capa más externa ocupada). El Cl, con 1s² 2s² 2p⁶ <b>3s² 3p⁵</b>, está en el periodo 3.</li>" +
    "<li><b>Bloque = subnivel donde entra el último electrón</b>: s (grupos 1 y 2), p (grupos 13 a 18), d (grupos 3 a 12, metales de transición) y f (lantánidos y actínidos).</li>" +
    "<li><b>Grupo</b>: en el bloque s, el número de electrones del subnivel s (1 o 2); en el bloque p, <b>10 + los electrones de valencia</b> (ns² np<sup>k</sup> → grupo 12 + k); en el bloque d, la suma de electrones <b>(n−1)d + ns</b> (hasta 10 → grupo 12 con d¹⁰ s²).</li>" +
    "</ul>" +
    tabla(["Grupo", "Configuración de valencia", "Nombre de la familia", "Ion habitual"], [
      ["1", "ns¹", "Alcalinos", "+1"], ["2", "ns²", "Alcalinotérreos", "+2"], ["13", "ns² np¹", "Térreos (B, Al…)", "+3"],
      ["14", "ns² np²", "Carbonoideos", "+4 / −4 (según el elemento)"], ["15", "ns² np³", "Nitrogenoideos", "−3"], ["16", "ns² np⁴", "Anfígenos (O, S…)", "−2"],
      ["17", "ns² np⁵", "Halógenos", "−1"], ["18", "ns² np⁶", "Gases nobles", "(no forman iones)"]
    ], "q3t") +
    ejemplo("Ejemplo resuelto: situar un elemento a partir de su configuración", "Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p³. Indica su número atómico, su periodo, su grupo y cuántos electrones de valencia tiene. Haz lo mismo con [Kr] 5s² 4d².", [
      "Número atómico: sumas los electrones 2 + 2 + 6 + 2 + 6 + 2 + 10 + 3 = <b>33</b> (el átomo es neutro, así que Z = n.º de electrones). Es el arsénico.",
      "Periodo: el mayor <i>n</i> es 4 → <b>periodo 4</b>.",
      "Valencia: la capa más externa es la n = 4: 4s² 4p³ → <b>5 electrones de valencia</b>. El último electrón entra en un p (bloque p): grupo 10 + 5 = <b>15</b>. Como tiene 5 electrones de valencia, necesita 3 para completar el octeto: ion habitual 3−.",
      "El segundo, [Kr] 5s² 4d²: Z = 36 + 2 + 2 = 40 (circonio); periodo 5; bloque d; grupo = 2 + 2 = <b>4</b>."
    ]) +
    "<p>Prueba la tabla: cambia el criterio de color y comprueba que los bloques s, p y d forman «trozos» continuos de la tabla; después toca elementos y compara su configuración con su posición.</p>" +
    w("q1_tabla") +
    "<h5>Configuración de iones: quién sale primero</h5>" +
    "<p>Los átomos se convierten en iones para llegar a configuraciones estables (gas noble). Al formar un <b>catión</b> se pierden los electrones de la <b>capa más externa (mayor <i>n</i>)</b>, aunque no sean los últimos que entraron. Por eso el hierro, [Ar] 4s² 3d⁶, pierde primero los 4s: <b>Fe²⁺ = [Ar] 3d⁶</b> y <b>Fe³⁺ = [Ar] 3d⁵</b> (cinco electrones desapareados, una configuración estable de semicapa llena). Los <b>aniones</b> ganan electrones hasta completar el subnivel: S²⁻ = [Ne] 3s² 3p⁶, igual que el Ar.</p>" +
    ojo("Un fallo clásico: quitar los electrones del hierro «por el final» de la configuración y escribir Fe²⁺ = [Ar] 4s² 3d⁴. Es incorrecto: sale antes el electrón de <b>mayor <i>n</i></b>, el 4s. Los metales de transición pierden primero los <i>s</i> y después los <i>d</i>.") +
    "<p>Practica con el simulador de configuraciones: elige un elemento, ponle carga y comprueba cuántos electrones tiene, cuántos desapareados y a qué gas noble se parece.</p>" +
    w("q1_config") +
    "<p><b>Dos excepciones que conviene saber:</b> el cromo ([Ar] 4s¹ 3d⁵) y el cobre ([Ar] 4s¹ 3d¹⁰). El subnivel d <b>semilleno o lleno</b> es especialmente estable (la ganancia de energía por tener todos los electrones d desapareados, o el subnivel completo, compensa promocionar un electrón desde el 4s). En la EvAU, si te piden la configuración del Cu o del Cr, esta es la que se espera.</p>"
  );

  // ---------------------------------------------------------------- 2. Radio atómico y carga nuclear efectiva
  secciones[1] = env(
    "<h5>La idea que explica casi todo: la carga nuclear efectiva</h5>" +
    "<p>Un electrón de valencia no «ve» toda la carga del núcleo. Los electrones que hay entre él y el núcleo (los <b>internos</b>) hacen de pantalla y le llegan atenuados los protones. A esa carga neta que realmente siente se le llama <b>carga nuclear efectiva</b>:</p>" +
    "<div class='formula-wrap'><div class='formula'>Z* = Z − σ</div></div>" +
    "<p>donde <i>Z</i> es el número de protones y <b>σ</b> es la <b>constante de apantallamiento</b> (cuánta carga «tapan» los demás electrones). Las reglas de Slater dan una estimación sencilla de σ para el electrón más externo:</p>" +
    tabla(["Los demás electrones están…", "Cada uno aporta a σ"], [
      ["en la misma capa (mismo grupo ns np)", "0,35 (0,30 si es la capa n = 1)"],
      ["en la capa n − 1", "0,85"],
      ["en capas n − 2 o inferiores", "1,00"],
      ["(si el electrón estudiado es d o f) en cualquier grupo a su izquierda", "1,00"]
    ], "q3t") +
    ejemplo("Ejemplo resuelto: Z* del electrón de valencia del Na y del Cl", "Calcula la carga nuclear efectiva que siente un electrón de la capa más externa en el sodio (Z = 11) y en el cloro (Z = 17), y explica qué átomo es más pequeño.", [
      "Na: 1s² 2s² 2p⁶ <b>3s¹</b>. Para el electrón 3s: no hay otros en su capa; en la capa n = 2 hay 8 electrones (2s² 2p⁶) → 8 · 0,85 = 6,80; en la capa n = 1 hay 2 → 2 · 1 = 2,00. σ = 8,80 → <b>Z* = 11 − 8,80 = 2,2</b>.",
      "Cl: 1s² 2s² 2p⁶ <b>3s² 3p⁵</b>. Para un electrón 3p: los otros electrones de su capa son 6 (7 − 1) → 6 · 0,35 = 2,10; capa n = 2: 8 · 0,85 = 6,80; capa n = 1: 2 · 1 = 2,00. σ = 10,90 → <b>Z* = 17 − 10,90 = 6,1</b>.",
      "Los dos están en la misma capa (n = 3), pero el electrón del Cl siente una carga casi tres veces mayor (6,1 frente a 2,2). El núcleo del Cl atrae con mucha más fuerza a su capa → <b>el Cl es mucho más pequeño que el Na</b>."
    ]) +
    "<p>Mueve el deslizador de <i>Z</i> y observa en la gráfica la forma de «diente de sierra» de <i>Z</i>*: dentro de un periodo sube casi sin parar (cada protón nuevo cuenta 1, cada electrón nuevo de la misma capa solo apantalla 0,35); al empezar un periodo nuevo, <i>Z</i>* cae porque el electrón nuevo va a una capa más externa y los de dentro lo tapan casi del todo. También puedes ponerle carga al átomo.</p>" +
    w("q3_zef") +
    "<h5>Las dos tendencias del radio, explicadas con <i>Z</i>* y <i>n</i></h5>" +
    "<p>El tamaño de un átomo depende de dos cosas que compiten: <b>cuántas capas tiene</b> (n, que lo agranda) y <b>cuánto tira el núcleo</b> de la capa más externa (Z*, que lo encoge). Con eso se entiende todo:</p>" +
    "<ul>" +
    "<li><b>En un periodo (de izquierda a derecha)</b> n es el mismo, pero Z* aumenta (Na 2,2 → Cl 6,1). La capa externa es atraída con más fuerza y el átomo <b>se contrae</b>. Es un efecto fuerte: el Na (166 pm) casi duplica el radio del Cl (102 pm).</li>" +
    "<li><b>En un grupo (de arriba abajo)</b> Z* apenas cambia (Li 1,3; Na 2,2; K 2,2), pero n sube una unidad en cada fila: el electrón de valencia está en una capa cada vez más lejana. El átomo <b>crece</b>.</li>" +
    "</ul>" +
    tabla(["Elemento", "Li", "Na", "K", "Rb"], [["Radio covalente (pm)", "128", "166", "203", "220"], ["Capa de valencia (n)", "2", "3", "4", "5"], ["Z* de Slater", "1,3", "2,2", "2,2", "2,2"]], "q3t") +
    "<p>Compruébalo en datos reales. Elige «radio» y desplázate por la gráfica: verás un diente de sierra con caídas dentro de cada periodo y saltos hacia arriba en cada alcalino. Después juega al reto de ordenar elementos.</p>" +
    w("q1_tendencias") +
    ojo("Entre el escandio y el zinc (metales de transición) el radio casi no cambia a lo largo del periodo: los electrones nuevos entran en la capa <b>interna</b> 3d y apantallan bien, así que Z* crece poco. Y no compares radios de elementos en periodos distintos con «derecha-izquierda» sin pensar: Na (periodo 3, grupo 1) es <b>mayor</b> que Mg, pero también mayor que Li y que Cl. Cuando dos elementos no están en el mismo periodo ni en el mismo grupo, razona con configuraciones electrónicas.")
  );

  // ---------------------------------------------------------------- 3. Energía de ionización
  secciones[2] = env(
    "<h5>Qué mide exactamente y en qué unidades</h5>" +
    "<p>La <b>primera energía de ionización</b> (EI₁) es la energía que hay que <b>aportar</b> a un mol de átomos neutros, en estado gaseoso y en su estado fundamental, para arrancar a cada uno su electrón más externo:</p>" +
    "<div class='formula-wrap'><div class='formula'>X(g) → X⁺(g) + e⁻ &nbsp;&nbsp; ΔH = EI₁ &gt; 0</div></div>" +
    "<p>Siempre es positiva: arrancar un electrón del atractivo del núcleo <b>cuesta</b> energía. Se da en <b>kJ/mol</b> (la EvAU) o en <b>eV por átomo</b> (1 eV = 1,602·10⁻¹⁹ J, lo que equivale a 96,485 kJ/mol). Así, para el sodio EI₁ = 496 kJ/mol = 496 000 / (6,022·10²³ · 1,602·10⁻¹⁹) = <b>5,14 eV</b> por átomo.</p>" +
    "<p>Su tendencia (Z* y n otra vez): aumenta en un periodo porque Z* sube y el electrón está más sujeto; disminuye en un grupo porque, aunque Z* casi no cambia, el electrón está cada vez más lejos. El helio tiene la mayor EI₁ (2372 kJ/mol); el cesio, la menor entre los elementos estables.</p>" +
    "<h5>Las dos «irregularidades» que siempre preguntan</h5>" +
    "<p>Si dibujas EI₁ frente a Z no sube de forma lisa: hay <b>dos pequeñas bajadas</b> dentro de cada periodo del bloque p. Ambas tienen una explicación en los orbitales y caen cada año en alguna prueba:</p>" +
    "<ul>" +
    "<li><b>Be → B (y Mg → Al)</b>: el B (2s² 2p¹) tiene menor EI que el Be (2s²) aunque tenga un protón más. El electrón que se arranca al B es un 2p, que está más alto en energía y está más apantallado por los 2s² que un electrón 2s. Es más fácil de quitar.</li>" +
    "<li><b>N → O (y P → S)</b>: el O (2p⁴) tiene menor EI que el N (2p³). En el N los tres electrones p están en tres orbitales distintos (desapareados, semicapa llena, con la repulsión mínima). En el O hay que meter un cuarto electrón en un orbital que ya tiene uno; la <b>repulsión entre los dos electrones apareados</b> facilita quitar uno de ellos.</li>" +
    "</ul>" +
    "<p>Pulsa cada caso en el simulador para ver los orbitales implicados (las cajitas con flechas) y comprueba con los números reales cuánto baja la energía en cada uno.</p>" +
    w("q3_anomalias") +
    "<h5>Energías de ionización sucesivas: el «DNI» del número de electrones de valencia</h5>" +
    "<p>Una vez arrancado el primer electrón se puede seguir con el segundo (EI₂), el tercero (EI₃), etc. Cada una es mayor que la anterior (el ion cada vez es más positivo y retiene más a los electrones que le quedan). El dato clave es <b>el salto enorme</b> que aparece cuando se empieza a arrancar electrones de la <b>capa interna completa</b>: esa capa está mucho más cerca del núcleo y está muy poco apantallada.</p>" +
    ejemplo("Ejemplo resuelto: ¿a qué grupo pertenece el elemento?", "Un elemento tiene estas energías de ionización sucesivas (kJ/mol): 738, 1451, 7733, 10543, 13630. ¿Cuántos electrones de valencia tiene, a qué grupo pertenece y de qué elemento se trata?", [
      "Razones entre valores consecutivos: 1451/738 = 1,97; 7733/1451 = <b>5,33</b>; 10543/7733 = 1,36; 13630/10543 = 1,29. El único salto brusco está entre EI₂ y EI₃.",
      "Los dos primeros electrones se arrancan con facilidad (están en la capa de valencia); el tercero pertenece a una capa interna completa. Por tanto tiene <b>2 electrones de valencia</b> → configuración de valencia ns² → <b>grupo 2</b> (alcalinotérreo).",
      "Para saber cuál: EI₁ = 738 kJ/mol. En el grupo 2, el Be tiene 900, el Mg 738 y el Ca 590. Es el <b>magnesio</b> (1s² 2s² 2p⁶ 3s²): el tercer electrón sale de la capa n = 2."
    ]) +
    w("q1_ionsucesiva") +
    ojo("Ojo con la pregunta típica «¿por qué la EI₂ del Na es muchísimo mayor que la EI₁?». No basta con decir que «es más difícil». La respuesta que puntúa: el Na⁺ tiene configuración de gas noble (1s² 2s² 2p⁶) y el segundo electrón se arranca de la capa n = 2, más cercana al núcleo, con Z* mucho mayor (6,85 frente a 2,2) y sin apantallar casi.")
  );

  // ---------------------------------------------------------------- 4. Afinidad electrónica y electronegatividad
  secciones[3] = env(
    "<h5>Afinidad electrónica: el signo hay que mirarlo siempre</h5>" +
    "<p>La <b>afinidad electrónica</b> (AE) es la energía asociada a la captura de un electrón por un átomo gaseoso neutro:</p>" +
    "<div class='formula-wrap'><div class='formula'>X(g) + e⁻ → X⁻(g)</div></div>" +
    "<p>En muchos libros se define como la energía <b>liberada</b> (valor positivo, por ejemplo AE(Cl) = +349 kJ/mol) y en otros como el <b>cambio de entalpía</b> del proceso, que entonces es negativo (ΔH = −349 kJ/mol). Son la misma información con distinto signo; <b>lee siempre la definición del enunciado</b>. Aquí usamos «AE = energía liberada», así que «mayor afinidad» = «más energía liberada». Los halógenos son los átomos con mayor afinidad: al captar un electrón completan el octeto y quedan con configuración de gas noble.</p>" +
    "<p>La tendencia general es la de la EI (aumenta hacia la derecha y hacia arriba), pero tiene <b>más excepciones</b> que la energía de ionización:</p>" +
    "<ul>" +
    "<li><b>Be, Mg y gases nobles ≈ 0</b>: el electrón nuevo iría a una capa o subnivel más alto y más apantallado. No liberan energía (a veces hay que aportarla).</li>" +
    "<li><b>N ≈ 0</b>: el electrón nuevo tiene que aparearse en un orbital p que ya tiene uno: repulsión que anula casi toda la ganancia.</li>" +
    "<li><b>Cl &gt; F</b>: el F es más pequeño, pero en su capa n = 2 los electrones están tan juntos que la repulsión se come parte de la energía liberada. AE(Cl) = 349 kJ/mol frente a 328 kJ/mol del F. Lo mismo ocurre con el S frente al O (200 frente a 141).</li>" +
    "<li><b>Segunda afinidad siempre desfavorable</b>: añadir un segundo electrón a un anión repele; O⁻ + e⁻ → O²⁻ cuesta energía (del orden de +700 kJ/mol). El O²⁻ solo es estable en los cristales (con el MgO, por ejemplo), donde la red lo compensa.</li>" +
    "</ul>" +
    "<p>Vuelve al simulador de antes y pulsa <em>Afinidad electrónica</em>; elige después cada caso para ver el porqué de cada irregularidad.</p>" +
    "<h5>Electronegatividad: no se mide, se asigna</h5>" +
    "<p>La electronegatividad (χ) mide la capacidad de un átomo <b>dentro de un enlace</b> para atraer hacia sí el par de electrones compartido. En la escala de Pauling (sin unidades) el flúor vale 3,98 (el más electronegativo), el oxígeno 3,44, el nitrógeno 3,04, el cloro 3,16, el carbono 2,55, el hidrógeno 2,20 y el cesio 0,79 (el menos electronegativo entre los metales alcalinos estables). Los gases nobles no tienen valor útil (apenas forman enlaces).</p>" +
    "<p>Mulliken propuso una definición que une las dos propiedades anteriores: <b>χ ∝ (EI + AE) / 2</b>. Un átomo es muy electronegativo cuando le cuesta perder electrones (EI alta) <b>y</b> los capta con ganas (AE alta). Por eso la tendencia de χ coincide con la de EI y AE: crece hacia la derecha y hacia arriba. Las tres propiedades (EI, AE, χ) tienen la misma causa: <b>Z* alta y electrón cerca del núcleo</b>.</p>" +
    ojo("La electronegatividad <b>no es</b> lo mismo que la afinidad electrónica: la AE es una energía medida de un átomo aislado (se puede medir en kJ/mol); la χ es un número relativo que describe al átomo <b>enlazado</b>. Dos errores frecuentes: decir que el F tiene la mayor afinidad electrónica (es el Cl) y decir que el helio es el elemento más electronegativo (el F; el He no forma enlaces).") +
    w("q1_tabla")
  );

  B.parte.q2t3a = { secciones: secciones };
})(window);
