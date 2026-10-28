/* ============================================================
   Química II · ampliaciones · Tema 9: Química de los compuestos del carbono
   (parte A: se añade al final de las secciones originales 1 a 4)
   Reutiliza de FyQ I: q7_insaturacion, q7_constructor, q7_nombrar, q7_reto, q7_isomeria, q7_quiral
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t9/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso: el carbono, su hibridación y los hidrocarburos
  secciones[0] = env(
    "<h5>Por qué el carbono es tan especial</h5>" +
    "<p>El carbono (Z = 6, 1s² 2s² 2p²) forma <b>cuatro enlaces covalentes</b>. Tiene una electronegatividad intermedia (2,5), así que ni cede ni capta electrones con facilidad: <b>comparte</b>. Sus enlaces C–C son fuertes y se unen entre sí formando cadenas, ramificaciones y ciclos; además se enlaza con H, O, N y halógenos. Esa combinación explica que existan más de diez millones de compuestos orgánicos: con los mismos pocos elementos, cambia el esqueleto, cambia el grupo funcional y cambia la disposición en el espacio.</p>" +
    "<h5>Hibridación: la geometría alrededor de cada carbono</h5>" +
    "<p>Para explicar que el metano tiene cuatro enlaces idénticos a 109,5° se recurre a la <b>hibridación</b>: el orbital 2s y los 2p se mezclan y dan orbitales híbridos equivalentes. Lo que necesitas en un examen es una regla corta: <b>cuenta los átomos unidos al carbono</b> (hidrógenos incluidos).</p>" +
    tabla(["Átomos unidos al C", "Hibridación", "Enlaces del C", "Ángulo y forma", "Ejemplo"], [
      ["4", "sp³", "4 σ", "109,5° · tetraédrico", "CH₄, CH₃–CH₃, CH₃–OH"],
      ["3", "sp²", "3 σ + 1 π", "120° · plano triangular", "CH₂=CH₂, CH₃–CHO, –COOH"],
      ["2", "sp", "2 σ + 2 π", "180° · lineal", "HC≡CH, CH₃–C≡N, CH₂=C=CH₂ (C central)"]
    ], "q3t") +
    "<p>Un <b>enlace σ</b> (frontal, a lo largo del eje) lo tiene todo enlace; un <b>enlace π</b> (lateral, por solapamiento de orbitales p sin hibridar) solo aparece en los enlaces dobles (1 σ + 1 π) y triples (1 σ + 2 π). El π es más débil y más reactivo que el σ, y <b>impide el giro</b> alrededor del enlace: de ahí la isomería cis-trans de la sección 4. Al aumentar el orden del enlace, el C–C se acorta: 154 pm (simple), 134 pm (doble), 120 pm (triple).</p>" +
    w("q2t9_hibrida") +
    ejemplo("Ejemplo resuelto: hibridación y enlaces del propanal", "Indica la hibridación de cada carbono del propanal, CH₃–CH₂–CHO, y cuántos enlaces σ y π tiene la molécula.", [
      "<b>CH₃</b> (C1): unido a 3 H y 1 C → 4 átomos → <b>sp³</b>.",
      "<b>CH₂</b> (C2): 2 H + 2 C → 4 átomos → <b>sp³</b>.",
      "<b>CHO</b> (C3): 1 H + 1 C + 1 O (doble enlace: cuenta como un átomo vecino) → 3 átomos → <b>sp²</b>, plano y a 120°.",
      "Enlaces: C–H: 3 + 2 + 1 = 6 σ; C–C: 2 σ; C=O: 1 σ + 1 π. Total: <b>9 σ y 1 π</b>."
    ]) +
    "<h5>Cómo se escribe una molécula: cuatro tipos de fórmula</h5>" +
    tabla(["Fórmula", "Qué dice", "Ejemplo (butan-2-ol)"], [
      ["Molecular", "Qué átomos y cuántos", "C₄H₁₀O"],
      ["Semidesarrollada", "Cómo están unidos los carbonos y los grupos (la que más se usa)", "CH₃–CH(OH)–CH₂–CH₃"],
      ["Desarrollada", "Todos los enlaces, uno por uno", "(cada C–H y C–C dibujado)"],
      ["Esquelética", "Solo el esqueleto en zigzag: cada vértice y cada extremo es un C con los H necesarios", "una línea quebrada con un –OH en el segundo vértice"]
    ], "q3t") +
    "<p>En la esquelética no se escriben ni los C ni los H unidos a C; sí se escriben los heteroátomos (O, N, Cl…) y los H que van pegados a ellos (como en el –OH). Los H de cada carbono se deducen: tantos como falten hasta 4 enlaces.</p>" +
    "<h5>Los hidrocarburos de un vistazo</h5>" +
    tabla(["Familia", "Fórmula general (acíclicos)", "Enlaces C–C", "Sufijo", "Ejemplo"], [
      ["Alcanos", "CₙH₂ₙ₊₂", "solo simples (sp³)", "-ano", "propano, CH₃CH₂CH₃"],
      ["Alquenos", "CₙH₂ₙ", "un doble", "-eno", "propeno, CH₂=CH–CH₃"],
      ["Alquinos", "CₙH₂ₙ₋₂", "un triple", "-ino", "propino, CH≡C–CH₃"],
      ["Cicloalcanos", "CₙH₂ₙ", "solo simples, en anillo", "ciclo…ano", "ciclohexano, C₆H₁₂"],
      ["Aromáticos", "—", "anillo con enlaces deslocalizados", "—", "benceno, C₆H₆ (sección 7)"]
    ], "q3t") +
    "<h5>Grado de insaturación: cuántos «enlaces o ciclos» faltan</h5>" +
    "<p>Un alcano acíclico tiene el máximo de hidrógenos posible (2n + 2). Cada doble enlace o cada ciclo quita 2 H; cada triple enlace, 4. El <b>grado de insaturación</b> (o número de insaturaciones) cuenta esas «pérdidas» a partir de la fórmula molecular:</p>" +
    "<div class='formula-wrap'><div class='formula'>DI = (2C + 2 + N − H − X) / 2</div></div>" +
    "<p>(X = halógenos; el oxígeno no cuenta). DI = 0 es saturado y acíclico; DI = 1, un doble enlace o un ciclo; DI = 2, un triple o dos dobles, o un doble y un ciclo…; el benceno, C₆H₆, tiene DI = 4 (tres dobles enlaces y un ciclo).</p>" +
    w("q7_insaturacion") +
    ejemplo("Ejemplo resuelto: insaturación de tres fórmulas", "Calcula el grado de insaturación de (a) C₄H₈O, (b) C₃H₅Cl, (c) C₆H₁₂.", [
      "<b>(a)</b> DI = (2·4 + 2 − 8)/2 = 2/2 = <b>1</b>: p. ej. un alcohol con doble enlace (but-3-en-1-ol), un aldehído (butanal), una cetona (butanona) o un ciclo con O.",
      "<b>(b)</b> El Cl se resta como un H: DI = (2·3 + 2 − 5 − 1)/2 = 2/2 = <b>1</b> (por ejemplo 3-cloroprop-1-eno).",
      "<b>(c)</b> DI = (2·6 + 2 − 12)/2 = <b>1</b>: un hexeno o un ciclohexano. La fórmula sola no distingue: hace falta más información (ver la sección 3)."
    ]) +
    ojo("El DI no dice <b>dónde</b> están las insaturaciones, solo cuántas hay. C=O también cuenta como una insaturación: el etanal (C₂H₄O) tiene DI = 1.")
  );

  // ---------------------------------------------------------------- 2. Nomenclatura
  secciones[1] = env(
    "<h5>Los grupos funcionales: prefijo, sufijo y fórmula</h5>" +
    "<p>Un <b>grupo funcional</b> es el átomo o conjunto de átomos que determina las propiedades químicas de una familia. En la nomenclatura IUPAC cada grupo puede aparecer de dos maneras: como <b>sufijo</b> (si es el grupo <b>principal</b> de la molécula) o como <b>prefijo</b> (si hay otro grupo de mayor prioridad). Esta tabla, ordenada de <b>mayor a menor prioridad</b>, es la que más se pregunta:</p>" +
    tabla(["#", "Familia", "Grupo", "Sufijo (principal)", "Prefijo (secundario)", "Ejemplo"], [
      ["1", "Ácido carboxílico", "–COOH", "ácido …oico", "carboxi-", "CH₃COOH: ácido etanoico"],
      ["2", "Éster", "–COO–", "…oato de …ilo", "alcoxicarbonil-", "CH₃COOCH₂CH₃: etanoato de etilo"],
      ["3", "Amida", "–CONH₂", "…amida", "carbamoil-", "CH₃CONH₂: etanamida"],
      ["4", "Nitrilo", "–C≡N", "…nitrilo", "ciano-", "CH₃CN: etanonitrilo"],
      ["5", "Aldehído", "–CHO", "…al", "oxo- (o formil-)", "CH₃CH₂CHO: propanal"],
      ["6", "Cetona", ">C=O", "…ona", "oxo-", "CH₃COCH₃: propanona"],
      ["7", "Alcohol", "–OH", "…ol", "hidroxi-", "CH₃CH₂OH: etanol"],
      ["8", "Amina", "–NH₂", "…amina", "amino-", "CH₃CH₂NH₂: etanamina"],
      ["—", "Éter", "–O–", "(no tiene)", "alcoxi- (metoxi-, etoxi-…)", "CH₃OCH₂CH₃: metoxietano"],
      ["—", "Derivado halogenado", "–F, –Cl, –Br, –I", "(no tiene)", "fluoro-, cloro-, bromo-, yodo-", "CH₃CH₂Cl: cloroetano"],
      ["—", "Nitrocompuesto", "–NO₂", "(no tiene)", "nitro-", "CH₃NO₂: nitrometano"],
      ["—", "Doble / triple enlace", "C=C · C≡C", "-eno / -ino (dentro del nombre)", "—", "CH₂=CH₂: eteno"]
    ], "q3t") +
    "<p>Los últimos cuatro <b>nunca son principales</b>: los éteres y los halogenuros solo se nombran con prefijos, y los enlaces múltiples se expresan con «-en-» / «-in-» dentro del nombre. Una regla mnemotécnica para el orden de los ocho primeros: <b>«Á-Es-Am-Ni-Al-Ce-Ol-Am»</b> (ácido, éster, amida, nitrilo, aldehído, cetona, alcohol, amina): cuanto más «oxidado» está el carbono del grupo, más prioridad tiene.</p>" +
    w("q2t9_prioridad") +
    "<h5>Las cinco reglas para nombrar (en este orden)</h5>" +
    "<ol>" +
    "<li><b>Grupo principal</b>: localiza el grupo de mayor prioridad. Dará el sufijo; los demás pasan a prefijos.</li>" +
    "<li><b>Cadena principal</b>: la que <b>contiene el grupo principal</b> y, después, el mayor número de enlaces dobles y triples; entre varias, la <b>más larga</b>. La raíz es met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-.</li>" +
    "<li><b>Numeración</b>: empieza por el extremo que dé el <b>localizador más bajo</b>, por este orden de prioridad: 1.º al grupo principal; 2.º a los dobles y triples enlaces; 3.º a los sustituyentes (todos juntos); 4.º, si aún hay empate, al sustituyente que va primero alfabéticamente.</li>" +
    "<li><b>Sustituyentes</b>: se nombran como prefijos (metil, etil, cloro, hidroxi…), <b>por orden alfabético</b> sin contar di-, tri-, tetra-; sí cuentan los prefijos que forman parte de un nombre compuesto (dimetilamino se ordena por «d»).</li>" +
    "<li><b>Ensamblado</b>: prefijos con localizadores + raíz + «-en-/-in-» con localizador + sufijo con localizador. Los números se separan con comas y de las letras con guiones.</li>" +
    "</ol>" +
    "<p>Los radicales que más aparecen: <b>metil</b> (–CH₃), <b>etil</b> (–CH₂CH₃), <b>propil</b> (–CH₂CH₂CH₃), <b>isopropil</b> o 1-metiletil (–CH(CH₃)₂), <b>butil</b>, <b>terc-butil</b> o 1,1-dimetiletil (–C(CH₃)₃), <b>vinil</b> o etenil (–CH=CH₂), <b>fenil</b> (–C₆H₅).</p>" +
    ejemplo("Ejemplo resuelto: un alcano ramificado", "Nombra CH₃–CH(CH₃)–CH₂–CH(CH₂CH₃)–CH₂–CH₃.", [
      "Sin grupos funcionales: es un alcano. La <b>cadena más larga</b> tiene 6 carbonos (hexano): se puede tomar a través de cualquiera de los dos etilos.",
      "Quedan dos ramas: un <b>metilo</b> y un <b>etilo</b>. Numerando desde el extremo del isopropilo, los sustituyentes están en {2, 4}; desde el otro lado estarían en {3, 5}. Gana {2, 4}.",
      "Orden alfabético: <b>e</b>til antes que <b>m</b>etil. Nombre: <b>4-etil-2-metilhexano</b>.",
      "Comprobación: C₉H₂₀ (CₙH₂ₙ₊₂ con n = 9). Hexano (6 C) + metilo (1) + etilo (2) = 9 C ✓."
    ]) +
    ejemplo("Ejemplo resuelto: grupo principal y doble enlace", "Nombra CH₃–CH=CH–CH(OH)–CH₃.", [
      "Hay un alcohol y un doble enlace. El alcohol es el grupo <b>principal</b> (sufijo «-ol»); el doble enlace entra como «-en-».",
      "Cadena de 5 carbonos (pent-). Numeración: <b>el –OH debe llevar el localizador más bajo</b>, aunque el doble enlace quede más alto: desde la derecha, el C–OH es el C2 y el doble enlace va entre C3 y C4.",
      "Los carbonos quedan CH₃(1)–CH(OH)(2)–CH(3)=CH(4)–CH₃(5): el doble enlace va entre C3 y C4 → <b>pent-3-en-2-ol</b>.",
      "Fíjate: si hubiéramos numerado desde la izquierda el doble enlace tendría el 2 pero el –OH el 4: <b>se ha cumplido la prioridad</b> (grupo principal antes que el doble enlace)."
    ]) +
    "<h5>Cadenas con varios grupos iguales y la «o» que aparece o desaparece</h5>" +
    "<p>Con dos o más grupos iguales se usan los prefijos multiplicadores di-, tri-… en el sufijo, y el nombre de la cadena <b>conserva la «-o» final de «-ano»</b> si el sufijo empieza por consonante: <b>propano-1,2-diol</b> (d es consonante) frente a <b>propan-2-ol</b> (o es vocal). Igual con los dobles enlaces: <b>buta-1,3-dieno</b> (se añade una «a» de enlace); <b>hexa-2,4-diino</b>; <b>pent-1-en-4-ino</b> (con un doble y un triple enlace, se numera para que el conjunto de localizadores sea el más bajo y, si empatan como aquí ({1, 4} en los dos sentidos), el número más bajo es para el doble enlace).</p>" +
    w("q7_constructor", "moleculas") +
    "<h5>Ésteres, amidas, nitrilos, éteres y aminas</h5>" +
    "<p><b>Ésteres</b>: son derivados de un ácido y un alcohol. Se nombra primero la parte del ácido con terminación «-oato» y después el radical del alcohol: CH₃CH₂–COO–CH₂CH₃ = <b>propanoato de etilo</b> (propanoico del ácido + etilo del alcohol). Cuidado con el sentido: en CH₃–COO–CH₂CH₂CH₃ la parte «ácida» (con el C=O) tiene 2 C y el radical tiene 3: <b>etanoato de propilo</b>.</p>" +
    "<p><b>Amidas</b> (–CONH₂): sufijo «-amida» y el C del grupo cuenta en la cadena: CH₃CH₂CONH₂ = <b>propanamida</b>. Si el N lleva radicales se indica con «N-»: CH₃CONHCH₃ = <i>N</i>-metiletanamida.</p>" +
    "<p><b>Nitrilos</b> (–C≡N): el C del grupo también cuenta en la cadena: CH₃CH₂C≡N = <b>propanonitrilo</b> (3 C). Como prefijo: «ciano-» (NC–CH₂–COOH: ácido cianoetanoico).</p>" +
    "<p><b>Éteres</b> (R–O–R′): se nombran como <b>alcoxi-alcano</b>: la cadena más larga es el alcano y la más corta, con el O, el sustituyente «alcoxi»: CH₃–O–CH₂CH₃ = <b>metoxietano</b>; CH₃CH₂–O–CH₂CH₃ = <b>etoxietano</b> (dietil éter en nomenclatura radicofuncional). Cuidado: «metoxietano» ≠ «etoximetano».</p>" +
    "<p><b>Aminas</b>: primarias R–NH₂ (propan-1-amina), secundarias R–NH–R′ y terciarias. Las sustituciones en el N se marcan con <i>N</i>: CH₃–NH–CH₂CH₃ = <i>N</i>-metiletanamina (la cadena más larga es la base).</p>" +
    ejemplo("Ejemplo resuelto: ¿éster o éter?", "Nombra CH₃–CH₂–CH₂–O–CH₃ y CH₃–CH₂–CO–O–CH₃.", [
      "El primero no tiene C=O: es un <b>éter</b>. Cadena más larga (3 C: propano) y la otra cadena con el O (metoxi): <b>metoxipropano</b>.",
      "El segundo tiene –COO–: es un <b>éster</b>. Lado del C=O: CH₃CH₂CO– (3 C) → «propanoato». Lado del O: –CH₃ → «de metilo». Nombre: <b>propanoato de metilo</b>.",
      "Los dos son C₄H₁₀O y C₄H₈O₂ respectivamente: distintos compuestos; la diferencia es el C=O."
    ]) +
    ejemplo("Ejemplo resuelto: varias funciones a la vez", "Nombra HOOC–CH₂–CH(OH)–CH₃ y CH₃–CO–CH₂–CH₂–OH.", [
      "<b>Primero</b>: ácido (1.º) y alcohol (7.º): manda el ácido, el –OH pasa a prefijo «hidroxi». Cadena de 4 C con el –COOH en C1; el –OH en C3: <b>ácido 3-hidroxibutanoico</b>.",
      "<b>Segundo</b>: cetona (6.º) y alcohol (7.º): manda la cetona. Numerando desde el CH₃: C=O en 2 y –OH en 4; desde el otro lado, C=O en 3. Gana el 2: <b>4-hidroxibutan-2-ona</b>.",
      "Regla de oro: no numeres por comodidad; <b>el principal siempre lleva el localizador más bajo posible</b>."
    ]) +
    w("q2t9_nombre") +
    ojo("Errores muy frecuentes: (1) nombrar «propan-1-ol» como «1-propanol» en el examen (se admite, pero usa la IUPAC); (2) olvidar que el C del –COOH, –CHO, –CONH₂ y –CN <b>cuenta</b> en la cadena; (3) numerar por el extremo «que sale más bonito» en vez de por el que da el localizador más bajo al grupo principal; (4) separar mal los prefijos: «2,3-dimetil» (con coma) y «3-etil-2-metil» (con guion).")
  );

  // ---------------------------------------------------------------- 3. Isomería estructural
  secciones[2] = env(
    "<h5>Cómo se buscan los isómeros (y no se dejan ninguno)</h5>" +
    "<p>Dos compuestos son <b>isómeros estructurales</b> si tienen la misma fórmula molecular pero se unen los átomos de manera distinta. Pedir «todos los isómeros de C₄H₁₀O» es un clásico. El método que no falla es: (1) calcular el grado de insaturación para saber si hay que meter dobles enlaces o ciclos; (2) dibujar <b>todos los esqueletos de carbono</b> posibles (cadena o ramificada); (3) en cada esqueleto, colocar el grupo funcional en <b>todas las posiciones no equivalentes</b>; (4) repetir con cada función posible para esos átomos (alcohol <i>o</i> éter, aldehído <i>o</i> cetona…).</p>" +
    tabla(["Tipo", "Qué cambia", "Ejemplo (misma fórmula)"], [
      ["De cadena", "El esqueleto de carbonos", "butano / 2-metilpropano (C₄H₁₀)"],
      ["De posición", "Dónde está el grupo o el enlace múltiple", "propan-1-ol / propan-2-ol (C₃H₈O) · but-1-eno / but-2-eno (C₄H₈)"],
      ["De función", "El grupo funcional", "etanol / metoximetano (C₂H₆O) · propanal / propanona (C₃H₆O) · ácido etanoico / metanoato de metilo (C₂H₄O₂)"]
    ], "q3t") +
    ejemplo("Ejemplo resuelto: todos los isómeros de C₄H₁₀O", "Escribe y nombra todos los isómeros estructurales de C₄H₁₀O que sean alcoholes o éteres.", [
      "DI = (2·4 + 2 − 10)/2 = 0: sin dobles enlaces ni ciclos; el O va como –OH (alcohol) o como –O– (éter).",
      "<b>Alcoholes con 4 C en cadena</b>: butan-1-ol (CH₃CH₂CH₂CH₂OH) y butan-2-ol (CH₃CH(OH)CH₂CH₃). Los –OH en C3 o C4 repiten los anteriores (se numera desde el otro extremo).",
      "<b>Alcoholes ramificados</b> (esqueleto del 2-metilpropano): 2-metilpropan-1-ol y 2-metilpropan-2-ol.",
      "<b>Éteres</b>: R–O–R′ con 3 C entre R y R′: metoxipropano (1+3), 2-metoxipropano (1+3 ramificado) y etoxietano (2+2).",
      "Total: <b>7 isómeros</b> (4 alcoholes + 3 éteres). Entre alcoholes hay isomería de cadena y de posición; entre un alcohol y un éter, de función."
    ]) +
    w("q7_isomeria") +
    ejemplo("Ejemplo resuelto: ¿qué tipo de isomería hay?", "Clasifica la relación entre (a) pentano y 2-metilbutano, (b) pent-1-eno y pent-2-eno, (c) butanal y butanona, (d) ácido propanoico y etanoato de metilo.", [
      "<b>(a)</b> Los dos son C₅H₁₂; cambia el esqueleto: <b>cadena</b>.",
      "<b>(b)</b> Los dos son C₅H₁₀, misma cadena, el doble enlace en otra posición: <b>posición</b>.",
      "<b>(c)</b> Los dos son C₄H₈O; aldehído frente a cetona: <b>función</b>.",
      "<b>(d)</b> Los dos son C₃H₆O₂; ácido frente a éster: <b>función</b>."
    ]) +
    ojo("Los isómeros estructurales <b>son compuestos distintos</b>, con propiedades físicas y a menudo químicas diferentes (el etanol es líquido y el metoximetano un gas; el primero puede formar puentes de hidrógeno y el segundo no, sección 5). Si dos moléculas tienen la misma fórmula, el nombre «isómeros» solo es correcto si la <b>conectividad</b> o la <b>disposición</b> cambia; dos formas de escribir la misma molécula (CH₃CH₂CH₂CH₃ y CH₃(CH₂)₂CH₃) son lo mismo.")
  );

  // ---------------------------------------------------------------- 4. Estereoisomería
  secciones[3] = env(
    "<h5>Isomería geométrica (cis-trans): cuándo existe</h5>" +
    "<p>Los átomos de un doble enlace C=C y los cuatro sustituyentes están en un mismo plano y <b>no pueden girar</b> alrededor del eje (hay que romper el π). Por eso, si los sustituyentes ocupan lados distintos, la molécula es distinta. La condición, que se pregunta casi todos los años, es:</p>" +
    "<div class='formula-wrap'><div class='formula'>cada carbono del C=C lleva dos sustituyentes distintos</div></div>" +
    "<p>Si uno de los dos carbonos repite sustituyente (CH₂=, (CH₃)₂C=, Cl₂C=), intercambiarlos no da nada nuevo. Cuando existe: <b>cis</b> = los sustituyentes iguales (o los de la cadena principal) del mismo lado; <b>trans</b> = de lados opuestos. En general se usa el sistema <b>Z / E</b> (CIP), pero en Bachillerato basta con cis-trans.</p>" +
    w("q2t9_cistrans") +
    "<p>Los isómeros geométricos tienen propiedades físicas distintas: el cis-1,2-dicloroeteno hierve a 60,3 °C y el trans a 47,5 °C porque en el cis los dipolos C–Cl se suman (molécula polar) y en el trans se anulan (apolar). En los alquenos cíclicos o en C=N también ocurre; para el examen basta el alqueno.</p>" +
    ejemplo("Ejemplo resuelto: ¿cuáles de estos alquenos tienen isómeros cis-trans?", "Decide para (a) but-2-eno, (b) 2-metilbut-2-eno, (c) pent-2-eno, (d) 1-cloroprop-1-eno, (e) 2-metilprop-1-eno.", [
      "<b>(a)</b> CH₃–CH=CH–CH₃: cada C lleva H y CH₃. <b>Sí</b> (cis y trans).",
      "<b>(b)</b> (CH₃)₂C=CH–CH₃: el C2 lleva dos CH₃ iguales. <b>No</b>.",
      "<b>(c)</b> CH₃–CH=CH–CH₂CH₃: H y CH₃ en un C, H y etilo en el otro. <b>Sí</b>.",
      "<b>(d)</b> ClCH=CH–CH₃: H y Cl en un C, H y CH₃ en el otro. <b>Sí</b> (se usaría Z/E).",
      "<b>(e)</b> (CH₃)₂C=CH₂: ambos carbonos repiten sustituyente. <b>No</b>."
    ]) +
    "<h5>Isomería óptica: el carbono quiral</h5>" +
    "<p>Un <b>carbono quiral</b> (o asimétrico, estereocentro) es un C sp³ unido a <b>cuatro sustituyentes diferentes</b>. La molécula resultante y su imagen en un espejo son distintas y no se pueden superponer (como las manos): son <b>enantiómeros</b>. Tienen las mismas propiedades físicas y químicas, salvo dos: <b>desvían el plano de la luz polarizada</b> en el mismo ángulo y sentidos opuestos (uno dextrógiro, +, otro levógiro, −) y <b>reaccionan de forma distinta con otras moléculas quirales</b> (receptores, enzimas). Una mezcla al 50 % de los dos (mezcla racémica) no desvía la luz.</p>" +
    w("q2t9_espejo") +
    "<p>Cómo se detecta: se mira cada carbono con cuatro enlaces simples y se comprueba si sus cuatro vecinos <b>son todos distintos</b> mirando lo que hay detrás, <b>no solo el átomo inmediato</b>: un –CH₂CH₃ y un –CH₂CH₂CH₃ son distintos aunque ambos empiecen por –CH₂–. No son quirales los CH₃, CH₂, los carbonos con doble enlace (sp²) ni los que llevan dos grupos iguales.</p>" +
    ejemplo("Ejemplo resuelto: carbonos quirales", "Señala los carbonos quirales de (a) CH₃–CHCl–CH₂–CH₃, (b) CH₃–CH₂–CHOH–CH₂–CH₃, (c) CH₃–CH(OH)–CH(OH)–CH₃, (d) HOOC–CH(OH)–CH₃.", [
      "<b>(a)</b> El C2 lleva H, Cl, CH₃ y CH₂CH₃: cuatro distintos. <b>Quiral</b> (2-clorobutano).",
      "<b>(b)</b> El C3 lleva H, OH y <b>dos etilos</b>: dos iguales. <b>No es quiral</b> (pentan-3-ol).",
      "<b>(c)</b> C2 y C3 lo son (H, OH, CH₃ y el otro C(OH)…): <b>dos centros</b>. Como los dos son iguales entre sí, hay una forma <b>meso</b> con plano de simetría: 3 estereoisómeros (no 2² = 4).",
      "<b>(d)</b> El C2 lleva H, OH, CH₃ y COOH: <b>quiral</b> (ácido láctico, el del músculo cansado)."
    ]) +
    "<p><b>Cuántos estereoisómeros</b>: con <i>n</i> carbonos quirales hay como máximo <b>2ⁿ</b> estereoisómeros. Se reduce si hay formas meso (el ácido tartárico tiene 3, no 4). Dos estereoisómeros que <b>no</b> son imagen especular uno del otro se llaman <b>diastereoisómeros</b>; el cis-trans es un caso.</p>" +
    w("q7_quiral") +
    ojo("«Isomería óptica» y «actividad óptica» no son lo mismo: la molécula quiral <i>puede</i> ser ópticamente activa; una mezcla racémica o un compuesto meso <b>no</b> lo son aunque tengan carbonos quirales.")
  );

  B.parte.q2t9a = { secciones: secciones };
})(window);
