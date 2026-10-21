/* ============================================================
   Física y Química I · ampliaciones · Tema 2: Enlace químico
   (parte A: ampliación de las cinco secciones originales)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t2/" + ref); }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Por qué se enlazan los átomos
  secciones[0] =
    "<h5>Un enlace es un mínimo de energía</h5>" +
    "<p>Dos átomos de hidrógeno muy alejados no se «notan». Al acercarse, cada electrón empieza a sentir también al núcleo del otro átomo: la atracción hace bajar la energía del conjunto. Pero si se acercan demasiado, los dos núcleos (ambos positivos) y las dos nubes electrónicas se repelen con fuerza y la energía se dispara. Entre ambos extremos hay una distancia en la que la energía es <b>mínima</b>: ahí se forma el enlace. Esa distancia es la <b>longitud de enlace</b> y la energía que habría que aportar para separar de nuevo los átomos es la <b>energía de enlace</b>.</p>" +
    "<p>En el H₂ la longitud de enlace es de unos <b>74 pm</b> y la energía de enlace de <b>436 kJ/mol</b>: al formarse un mol de moléculas de H₂ a partir de átomos se <i>desprenden</i> 436 kJ, y para romperlas se necesita aportar la misma cantidad. Por eso los átomos se enlazan: <b>el conjunto enlazado tiene menos energía, y por tanto es más estable, que los átomos sueltos</b>. Lo mismo vale para cualquier enlace; solo cambian los números.</p>" +
    "<h5>Electrones de valencia y símbolos de Lewis</h5>" +
    "<p>Los que participan en el enlace son los <b>electrones de valencia</b>, los del nivel más externo (Tema 1). Gilbert N. Lewis propuso representarlos con puntos alrededor del símbolo del elemento: se colocan primero uno en cada lado y, cuando hay más de cuatro, se aparean. Para los elementos representativos, el número de electrones de valencia es el número del grupo (grupos 1 y 2) o el número del grupo menos 10 (grupos 13 a 18).</p>" +
    tabla(["Grupo", "1", "2", "13", "14", "15", "16", "17", "18"], [
      ["Electrones de valencia", "1", "2", "3", "4", "5", "6", "7", "8 (He: 2)"],
      ["Ejemplo", "Na", "Mg", "Al", "C", "N", "O", "Cl", "Ne"],
      ["Ion que tiende a formar", "+1", "+2", "+3", "(comparte)", "−3", "−2", "−1", "ninguno"],
      ["Enlaces covalentes habituales", "—", "—", "3", "4", "3", "2", "1", "0"]
    ]) +
    "<h5>La regla del octeto y sus excepciones</h5>" +
    "<p>La regla del octeto resume por qué se enlazan los átomos: <b>cada átomo tiende a rodearse de ocho electrones de valencia</b> (un «octeto»), la configuración s²p⁶ de un gas noble. El hidrógeno es la excepción obvia: solo tiene el nivel 1, que se completa con dos electrones (<i>regla del dueto</i>, como el helio). Cuando un átomo no puede ceder, ganar ni compartir lo suficiente, no cumple la regla:</p>" +
    "<ul>" +
    "<li><b>Octeto incompleto</b>: Be en BeCl₂ (4 electrones alrededor) y B en BF₃ (6). Son compuestos muy reactivos porque el átomo central «quiere» más electrones.</li>" +
    "<li><b>Octeto expandido</b>: a partir del periodo 3 hay orbitales d disponibles y el átomo central puede rodearse de más de ocho electrones: PCl₅ (10), SF₆ (12), XeF₄ (12).</li>" +
    "<li><b>Número impar de electrones</b>: radicales como el NO (11 electrones de valencia) o el NO₂, que no pueden emparejar todos sus electrones.</li>" +
    "</ul>" +
    "<h5>Electronegatividad: quién tira más del par de electrones</h5>" +
    "<p>La <b>electronegatividad</b> (χ) mide la tendencia de un átomo a atraer hacia sí los electrones del enlace. Con la escala de Pauling el flúor, el más electronegativo, vale 3,98 y el cesio, uno de los menos, 0,79. Crece hacia arriba y hacia la derecha de la tabla (Tema 1). Lo que decide el tipo de enlace es la <b>diferencia de electronegatividad Δχ</b> entre los dos átomos:</p>" +
    tabla(["Elemento", "H", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Br"], [
      ["χ (Pauling)", "2,20", "2,55", "3,04", "3,44", "3,98", "0,93", "1,31", "1,61", "1,90", "2,19", "2,58", "3,16", "0,82", "2,96"]
    ]) +
    "<p>Con un criterio de aula (las fronteras son orientativas, no leyes de la naturaleza):</p>" +
    tabla(["Δχ", "Entre quién", "Tipo de enlace", "Qué pasa con los electrones", "Ejemplo"], [
      ["≈ 0 (&lt; 0,4)", "dos no metales (o el mismo elemento)", "covalente apolar", "par compartido a partes iguales", "H₂ (Δχ = 0), Cl₂, C–H (0,35)"],
      ["0,4 – 1,7", "dos no metales distintos", "covalente polar", "par desplazado hacia el más electronegativo", "H–Cl (0,96), H–F (1,78), C–O (0,89)"],
      ["≥ 1,7", "metal y no metal", "iónico", "transferencia casi completa", "NaCl (2,23), MgO (2,13)"],
      ["—", "dos metales", "metálico", "electrones deslocalizados en toda la red", "Fe, Cu, bronce"]
    ]) +
    "<p>Ojo con el matiz: la <b>carga parcial</b> no pasa de golpe de 0 a 1. Pauling estimó el <b>carácter iónico</b> de un enlace como 1 − e<sup>−Δχ²/4</sup>: para el NaCl sale un 71 % y para el HCl un 21 %. Ningún enlace es 100 % iónico ni 100 % covalente; son los dos extremos de una escala continua. Pruébalo con el simulador: elige dos elementos cualesquiera y mira dónde cae el par en esa escala.</p>" +
    w("q2_deltaen") +
    ejemplo("Clasificar enlaces con la electronegatividad", "Clasifica los enlaces de KBr, HBr, Br₂ y Fe–Fe.", [
      "<b>KBr</b>: K es metal (χ = 0,82) y Br no metal (2,96): Δχ = 2,14 ≥ 1,7 → <b>iónico</b>.",
      "<b>HBr</b>: dos no metales con Δχ = 2,96 − 2,20 = 0,76 → covalente <b>polar</b> (el Br atrae más el par).",
      "<b>Br₂</b>: mismo elemento, Δχ = 0 → covalente <b>apolar</b>.",
      "<b>Fe–Fe</b>: dos metales → <b>metálico</b>."
    ]) +
    ojo("La regla «metal + no metal = iónico» tiene excepciones: el AlCl₃ (Δχ = 1,55) y el BeCl₂ se comportan en gran parte como covalentes. Usa siempre Δχ y, si dudas, las propiedades de la sustancia.");

  // ---------------------------------------------------------------- 2. Enlace iónico
  secciones[1] =
    "<h5>Cómo se forman los iones y por qué compensa</h5>" +
    "<p>Arrancar un electrón a un átomo <i>cuesta</i> energía (la energía de ionización, Tema 1): para pasar de Na a Na⁺ hay que aportar 496 kJ/mol. Captar un electrón, en cambio, suele desprender algo de energía (el cloro libera 349 kJ/mol al formar Cl⁻). Si el sodio y el cloro solo intercambiasen un electrón, el balance sería desfavorable (+496 − 349 = +147 kJ/mol). ¿Por qué ocurre entonces? Porque los iones no quedan sueltos: <b>al juntarse en un cristal, la atracción entre cargas opuestas desprende una enorme cantidad de energía</b> (la energía reticular), que supera con creces el coste de formar los iones. El enlace iónico es en realidad un fenómeno del conjunto del cristal, no de una pareja de átomos.</p>" +
    "<h5>Qué carga adquiere cada elemento</h5>" +
    "<p>Los metales de los grupos 1, 2 y 13 pierden 1, 2 y 3 electrones y quedan con la configuración del gas noble anterior (Na⁺, Mg²⁺, Al³⁺, todos isoelectrónicos con el Ne). Los no metales de los grupos 15, 16 y 17 ganan 3, 2 y 1 electrones y quedan como el gas noble siguiente (N³⁻, O²⁻, F⁻ también con 10 electrones). Los metales de transición forman cationes de carga variable (Fe²⁺ y Fe³⁺, Cu⁺ y Cu²⁺) porque los electrones 4s y 3d tienen energías parecidas.</p>" +
    "<h5>La fórmula de un compuesto iónico</h5>" +
    "<p>Un compuesto iónico es <b>eléctricamente neutro</b>: las cargas positivas y negativas se compensan. Para hallar la fórmula se intercambian las cargas (se «cruzan») y se simplifica:</p>" +
    tabla(["Catión", "Anión", "Cargas cruzadas", "Fórmula", "Nombre"], [
      ["Na⁺", "Cl⁻", "1 : 1", "NaCl", "cloruro de sodio"],
      ["Ca²⁺", "Cl⁻", "1 : 2", "CaCl₂", "cloruro de calcio"],
      ["Al³⁺", "O²⁻", "2 : 3", "Al₂O₃", "óxido de aluminio"],
      ["Mg²⁺", "N³⁻", "3 : 2", "Mg₃N₂", "nitruro de magnesio"],
      ["Mg²⁺", "O²⁻", "2 : 2 → 1 : 1", "MgO", "óxido de magnesio"],
      ["Fe³⁺", "SO₄²⁻", "2 : 3", "Fe₂(SO₄)₃", "sulfato de hierro(III)"]
    ]) +
    "<p>Una fórmula como NaCl <b>no representa una molécula</b>: es la <i>fórmula empírica</i> o «unidad fórmula», la proporción más sencilla de iones en el cristal. En un grano de sal no hay moléculas de NaCl, solo una red enorme de iones.</p>" +
    "<h5>El cristal iónico: empaquetar iones de distinto tamaño</h5>" +
    "<p>Cada ion se rodea del mayor número posible de iones de signo contrario, sin que los del mismo signo se toquen. Ese número es el <b>índice de coordinación</b>. Depende del cociente de radios r⁺/r⁻: si el catión es pequeño comparado con el anión, caben pocos vecinos; si es grande, caben más.</p>" +
    tabla(["r⁺/r⁻", "Índice de coordinación", "Estructura típica", "Ejemplo"], [
      ["0,225 – 0,414", "4 : 4", "blenda (ZnS)", "ZnS"],
      ["0,414 – 0,732", "6 : 6", "cloruro de sodio (cúbica centrada en las caras)", "NaCl: 102/181 = 0,56"],
      ["≥ 0,732", "8 : 8", "cloruro de cesio (cúbica centrada en el cuerpo)", "CsCl: 167/181 = 0,92"]
    ]) +
    "<h5>Energía reticular: lo que sostiene el cristal</h5>" +
    "<p>La <b>energía reticular</b> U es la energía que se desprende al formarse un mol de cristal iónico a partir de sus iones gaseosos (o, a la inversa, la que hay que aportar para separarlos): Na⁺(g) + Cl⁻(g) → NaCl(s), con U = 787 kJ/mol. Su valor sigue la <b>ley de Coulomb</b>: la fuerza entre dos cargas crece con el producto de las cargas y disminuye con el cuadrado de la distancia, y la energía que sostiene el cristal es proporcional a</p>" +
    "<div class='formula-wrap'><div class='formula'>U ∝ |z⁺ · z⁻| / d     donde d = r⁺ + r⁻</div></div>" +
    "<p>Dos consecuencias muy preguntadas en los exámenes: (1) <b>a mayor carga de los iones, mucha mayor energía reticular</b> (el MgO, con iones 2+ y 2−, tiene U = 3 791 kJ/mol, casi cinco veces la del NaCl); (2) <b>a menor tamaño de los iones, mayor energía reticular</b> (LiF 1 036 &gt; NaF 923 &gt; KF 821). Y la energía reticular manda sobre el punto de fusión y la dureza: MgO funde a 2 852 °C y NaCl a 801 °C.</p>" +
    w("q2_red") +
    "<h5>El ciclo de Born–Haber: cómo se «mide» una energía que no se puede medir</h5>" +
    "<p>No existe un experimento que junte iones gaseosos y mida el calor desprendido, pero sí se puede calcular con la <b>ley de Hess</b>: la formación del cristal desde los elementos (energía conocida, la entalpía de formación) se puede imaginar como una secuencia de pasos cuyas energías sí se miden: sublimar el metal, ionizarlo, romper el enlace del no metal, ganar el electrón y, por fin, formar la red. Como la energía total no depende del camino:</p>" +
    "<div class='formula-wrap'><div class='formula'>ΔH<sub>f</sub> = ΔH<sub>sub</sub> + EI + ½·E<sub>enlace</sub> + AE − U</div></div>" +
    "<p>Para el NaCl (en kJ/mol): sublimación del Na +107, ionización del Na +496, ½ Cl₂ → Cl +122, afinidad del Cl −349 y formación −411. Despejando, U = 107 + 496 + 122 − 349 + 411 = <b>787 kJ/mol</b>. Observa que el último paso es el que «paga» todo lo demás: sin él, el cloruro de sodio no se formaría.</p>" +
    w("q2_bornhaber") +
    "<h5>Propiedades de las sustancias iónicas, explicadas</h5>" +
    "<ul>" +
    "<li><b>Sólidos de punto de fusión alto</b>: hay que vencer la atracción de todos los iones a la vez (NaCl 801 °C, MgO 2 852 °C).</li>" +
    "<li><b>Duros pero frágiles</b>: son duros porque los iones están muy sujetos; pero si un golpe desplaza una capa de iones media distancia entre ellos, quedan enfrentadas cargas del mismo signo, que se repelen, y el cristal se rompe en lugar de deformarse.</li>" +
    "<li><b>No conducen la electricidad en estado sólido</b> (los iones están fijos en la red), <b>pero sí fundidos o disueltos</b>, cuando los iones quedan libres para moverse y transportar la carga.</li>" +
    "<li><b>Muchos se disuelven en agua</b>: las moléculas de agua, polares, rodean a cada ion (interacción ion–dipolo) y compensan la energía reticular. Los muy reticulados (MgO, Al₂O₃) casi no se disuelven.</li>" +
    "</ul>" +
    ojo("Una sal fundida o disuelta conduce porque se mueven <b>iones</b>; un metal conduce porque se mueven <b>electrones</b>. No mezcles los dos mecanismos.");

  // ---------------------------------------------------------------- 3. Enlace covalente
  secciones[2] =
    "<h5>Compartir electrones: enlaces sencillos, dobles y triples</h5>" +
    "<p>Cuando dos átomos comparten un par de electrones, cada uno «cuenta» los dos electrones como propios y así completa su octeto. Dos átomos pueden compartir uno, dos o tres pares, y cuantos más pares comparten, <b>más corto y más fuerte</b> es el enlace. Lo comprobamos con los datos del carbono y del nitrógeno:</p>" +
    tabla(["Enlace", "Orden", "Longitud (pm)", "Energía de enlace (kJ/mol)", "Ejemplo"], [
      ["C–C", "1", "154", "347", "etano"],
      ["C=C", "2", "134", "614", "eteno"],
      ["C≡C", "3", "120", "839", "etino"],
      ["N–N", "1", "145", "160", "hidracina"],
      ["N=N", "2", "125", "418", "azometano"],
      ["N≡N", "3", "110", "945", "nitrógeno, N₂"]
    ]) +
    "<p>La enorme energía del triple enlace del N₂ (945 kJ/mol) explica por qué el nitrógeno del aire es tan poco reactivo: casi nada consigue romper esa molécula. El <b>orden de enlace</b> (1, 2, 3, o valores intermedios como 1,5 cuando hay resonancia) es el número de pares compartidos entre dos átomos.</p>" +
    "<h5>Enlace covalente coordinado (dativo)</h5>" +
    "<p>A veces el par compartido lo pone <b>un solo átomo</b>: se llama enlace covalente coordinado o dativo. Una vez formado es idéntico a cualquier otro enlace covalente. Ejemplos: el ion amonio NH₄⁺ (el N del NH₃ aporta su par libre al H⁺, que no tiene electrones), el ion hidronio H₃O⁺ (el agua aporta un par libre al H⁺) y el monóxido de carbono CO (el oxígeno aporta un par al enlace con el carbono). En el NH₄⁺ los cuatro enlaces N–H son indistinguibles: no se puede decir cuál es el «dativo».</p>" +
    "<h5>Enlace covalente polar y momento dipolar</h5>" +
    "<p>Cuando Δχ ≠ 0 el par compartido pasa más tiempo cerca del átomo más electronegativo, que queda con una <b>carga parcial negativa (δ⁻)</b> y deja al otro con una <b>parcial positiva (δ⁺)</b>. Se representa con una flecha desde δ⁺ hacia δ⁻ (el <b>momento dipolar</b> μ, que se mide en debye, D). Cuanto mayor es Δχ, mayor μ: H–F 1,82 D, H–Cl 1,08 D, H–Br 0,82 D, H–I 0,44 D. Un dipolo se dibuja con una flecha que parte del polo positivo (con una pequeña cruz) y apunta al negativo. Una consecuencia: <b>una molécula puede tener enlaces polares y, a pesar de ello, ser apolar en conjunto</b>, si sus dipolos se cancelan por simetría (CO₂, CH₄, CCl₄). Lo veremos en la sección de geometría.</p>" +
    "<h5>Sustancias covalentes moleculares y reticulares</h5>" +
    "<p>El enlace covalente da lugar a dos tipos de sustancias muy distintas:</p>" +
    tabla(["", "Covalentes moleculares", "Covalentes reticulares (o atómicas)"], [
      ["Qué hay", "moléculas pequeñas e independientes", "una red tridimensional de átomos unidos por enlaces covalentes: una única «macromolécula»"],
      ["Qué hay que romper para fundir", "solo las fuerzas intermoleculares (débiles)", "los propios enlaces covalentes (muy fuertes)"],
      ["Punto de fusión", "bajo (H₂O 0 °C, CO₂ −57 °C, I₂ 114 °C)", "muy alto (diamante 3 550 °C, SiO₂ 1 713 °C, SiC 2 730 °C)"],
      ["Dureza", "blandas", "muy duras (diamante), salvo el grafito"],
      ["Conducción", "no conducen (salvo si se ionizan al disolverse, como el HCl)", "no conducen, salvo el grafito"],
      ["Ejemplos", "H₂O, CO₂, CH₄, sacarosa, I₂", "diamante, grafito, cuarzo (SiO₂), carburo de silicio"]
    ]) +
    "<p>El carbono muestra bien la diferencia entre redes: en el <b>diamante</b> cada C se une a otros cuatro en tetraedro (sp³), y todo el cristal es rígido y duro; en el <b>grafito</b> cada C se une a tres en capas planas (sp²) y le sobra un electrón por átomo, deslocalizado dentro de la capa, lo que explica que sea conductor y que las capas, unidas por fuerzas débiles, resbalen unas sobre otras (es la «mina» del lápiz).</p>";

  // ---------------------------------------------------------------- 4. Enlace metálico
  secciones[3] =
    "<h5>Un mar de electrones alrededor de una red de cationes</h5>" +
    "<p>En un metal, cada átomo ocupa una posición fija en una red regular y aporta sus electrones de valencia a una nube común que se extiende por todo el cristal. Los átomos quedan convertidos en cationes (Na⁺, Cu²⁺…), sumergidos en el «mar» de electrones deslocalizados. El enlace metálico es la atracción entre esos cationes y los electrones libres, por eso no es direccional y no se puede asignar a una pareja concreta de átomos.</p>" +
    "<p>Los metales se empaquetan de forma muy compacta, para tener tantos vecinos como sea posible: en las estructuras más comunes (cúbica centrada en las caras y hexagonal compacta) cada átomo toca a <b>12</b> vecinos; en la cúbica centrada en el cuerpo (Na, Fe a temperatura ambiente), a 8.</p>" +
    "<h5>Propiedades de los metales, explicadas</h5>" +
    "<ul>" +
    "<li><b>Conductividad eléctrica</b>: con un voltaje, los electrones libres derivan en bloque. Al calentar un metal conduce <i>peor</i>, porque la vibración de los cationes estorba a los electrones.</li>" +
    "<li><b>Conductividad térmica</b>: los electrones libres transportan la energía cinética muy deprisa: por eso una cuchara metálica quema en una sopa caliente.</li>" +
    "<li><b>Brillo metálico</b>: los electrones libres absorben y reemiten la luz visible.</li>" +
    "<li><b>Maleabilidad y ductilidad</b> (se convierten en láminas y en hilos): una capa de cationes puede deslizarse sobre otra y, como el mar de electrones se reajusta, el enlace se mantiene. Compara con el cristal iónico, que se rompe.</li>" +
    "<li><b>Puntos de fusión muy variables</b>: Hg −39 °C, Na 98 °C, Cu 1 085 °C, Fe 1 538 °C, W 3 422 °C. Cuantos más electrones aporta cada átomo y más pequeño es el catión, más fuerte es el enlace y más alto el punto de fusión: el sodio (1 e⁻ por átomo) funde a 98 °C y el hierro (varios e⁻ de valencia) a 1 538 °C.</li>" +
    "</ul>" +
    w("q2_metalico") +
    "<h5>Aleaciones: metales mezclados</h5>" +
    "<p>Una <b>aleación</b> es una mezcla homogénea de un metal con otros elementos (a veces no metales). Casi siempre es más dura que el metal puro porque los átomos de distinto tamaño estorban el deslizamiento de las capas. Ejemplos: el <b>latón</b> (Cu + Zn), el <b>bronce</b> (Cu + Sn), el <b>acero</b> (Fe + menos del 2 % de C) y el <b>acero inoxidable</b> (Fe + C + Cr, al menos un 10,5 % de cromo, que forma una capa protectora de óxido).</p>" +
    "<h5>Una idea más fina: las bandas de energía</h5>" +
    "<p>Cuando N átomos se juntan, sus N orbitales de valencia dan N niveles tan próximos entre sí que forman <b>bandas</b> continuas. En un metal la banda de valencia está parcialmente llena (o solapada con la siguiente), así que los electrones pueden subir a niveles vacíos con muy poca energía: conducen. En un <b>aislante</b> la banda de valencia está llena y la siguiente (la de conducción) queda lejos, a una «banda prohibida» ancha. En un <b>semiconductor</b> (silicio, germanio) la banda prohibida es estrecha: con calor o luz algunos electrones saltan a la banda de conducción y el material empieza a conducir, justo al revés que un metal.</p>";

  // ---------------------------------------------------------------- 5. Fuerzas intermoleculares
  secciones[4] =
    "<h5>Cuatro tipos de fuerzas entre moléculas</h5>" +
    "<p>Las fuerzas entre moléculas (o entre átomos de un gas noble) son todas de origen eléctrico, pero de intensidad y origen distintos:</p>" +
    tabla(["Fuerza", "Entre quién", "Origen", "Energía típica (kJ/mol)", "Ejemplo"], [
      ["Ion–dipolo", "un ion y una molécula polar", "el ion atrae al polo de signo contrario", "40 – 600", "Na⁺ rodeado de agua"],
      ["Puente de hidrógeno", "H unido a F, O o N y un par libre de F, O o N vecino", "H muy positivo atraído por un par libre", "10 – 40", "H₂O, NH₃, HF, alcoholes"],
      ["Dipolo–dipolo", "moléculas polares", "δ⁺ de una con δ⁻ de otra", "5 – 25", "HCl, CH₃Cl, propanona"],
      ["London (dispersión)", "todas, la única en las apolares", "dipolos instantáneos por el movimiento de los electrones", "0,05 – 40", "Ar, I₂, CH₄, alcanos"]
    ]) +
    "<p>Para comparar: un enlace covalente normal ronda los 150–1 000 kJ/mol. Por eso, al hervir agua se rompen las fuerzas entre moléculas (≈ 40,7 kJ/mol) pero no los enlaces O–H (463 kJ/mol): sigues teniendo H₂O en el vapor.</p>" +
    "<h5>Fuerzas de London: de dónde salen y de qué dependen</h5>" +
    "<p>Incluso una molécula apolar tiene electrones en continuo movimiento: durante un instante la nube puede estar un poco más cargada en un lado y la molécula se comporta como un dipolo diminuto que <i>induce</i> otro dipolo en la vecina. Esa atracción fugaz es la fuerza de London (o de dispersión). Es la <b>única</b> fuerza entre moléculas apolares y entre átomos de gases nobles, y aumenta con:</p>" +
    "<ul>" +
    "<li>el <b>número de electrones</b> (y por tanto la masa molar): una nube grande se deforma más fácilmente (es más <i>polarizable</i>). Por eso los puntos de ebullición suben al bajar en un grupo: He −269 °C, Ne −246, Ar −186, Kr −153, Xe −108; F₂ −188, Cl₂ −34, Br₂ 59, I₂ 184 °C.</li>" +
    "<li>la <b>superficie de contacto</b>: las moléculas largas se tocan por más puntos que las compactas. El pentano (cadena lineal) hierve a 36 °C, el 2-metilbutano a 28 °C y el 2,2-dimetilpropano (casi esférico) a 9,5 °C, con la misma fórmula C₅H₁₂.</li>" +
    "</ul>" +
    "<h5>El puente de hidrógeno: condiciones y consecuencias</h5>" +
    "<p>Se forma cuando un átomo de H unido a <b>F, O o N</b> (muy electronegativos y pequeños) queda con una gran carga positiva parcial y es atraído por un <b>par de electrones libre</b> de un F, O o N de otra molécula (o de la misma, en moléculas grandes). Hacen falta las dos cosas: un H «ácido» y un par libre disponible. Por eso el CH₄ (H unidos a C, poco polar) no forma puentes de hidrógeno y el H₂S tampoco (el S es poco electronegativo y grande). Cada molécula de agua puede formar hasta cuatro puentes de hidrógeno (dos con sus H y dos con los pares libres del O) y construye una red tridimensional; el NH₃ solo tiene un par libre y el HF un único H, así que forman menos puentes por molécula, y por eso el agua hierve más que ellos.</p>" +
    "<p>El efecto en los puntos de ebullición es espectacular. En el grupo 16 los hidruros siguen la tendencia de London (H₂S −60, H₂Se −41, H₂Te −2 °C) <i>excepto el agua</i>, que hierve a 100 °C: de seguir la tendencia, hervería hacia −90 °C. Lo mismo ocurre con el NH₃ (−33 °C) en el grupo 15 y con el HF (20 °C) en el 17. Y mira los isómeros C₂H₆O: el etanol (CH₃CH₂OH, con O–H) hierve a 78 °C; el éter dimetílico (CH₃OCH₃, sin O–H), a −24 °C, ¡100 °C menos con la misma fórmula!</p>" +
    w("q2_fuerzas") +
    "<h5>Qué explican las fuerzas intermoleculares</h5>" +
    "<ul>" +
    "<li><b>Estado físico y puntos de fusión y ebullición</b>: a más fuerza entre moléculas, más energía hace falta para separarlas.</li>" +
    "<li><b>Solubilidad</b>: «lo semejante disuelve a lo semejante». Las sustancias polares y las que forman puentes de H se disuelven en agua (etanol, azúcar, sal); las apolares se disuelven en disolventes apolares (el aceite en la gasolina) y no en agua: las moléculas de agua prefieren atraerse entre sí.</li>" +
    "<li><b>Densidad del hielo</b>: en el hielo cada molécula forma cuatro puentes de H en una red abierta, con huecos; al fundir, la red se desordena y las moléculas se acercan. Por eso el hielo (0,92 g/cm³) flota sobre el agua líquida (1,00 g/cm³) y los lagos se hielan por arriba.</li>" +
    "<li><b>Tensión superficial y capilaridad</b>: la atracción entre moléculas de agua en la superficie forma una «piel» que sostiene a un insecto.</li>" +
    "<li><b>Biología</b>: las dos hebras del ADN y las proteínas se mantienen en su forma gracias a puentes de hidrógeno; son fuertes en conjunto, pero se pueden romper uno a uno para copiar el ADN.</li>" +
    "</ul>" +
    ejemplo("Ordenar sustancias por punto de ebullición", "Ordena de menor a mayor punto de ebullición: propano (C₃H₈, M = 44), etanal (CH₃CHO, M = 44) y etanol (C₂H₅OH, M = 46).", [
      "Las tres tienen una masa molar casi igual, así que las fuerzas de London son parecidas y la diferencia la marcan las demás fuerzas.",
      "<b>Propano</b>: apolar → solo London. <b>Etanal</b>: polar (C=O) → London + dipolo–dipolo. <b>Etanol</b>: tiene O–H → London + puente de hidrógeno.",
      "Orden creciente de intensidad: London &lt; dipolo–dipolo &lt; puente de H. Por tanto: <b>propano (−42 °C) &lt; etanal (20 °C) &lt; etanol (78 °C)</b>."
    ]) +
    ojo("Los puentes de H son fuerzas <b>entre</b> moléculas, no enlaces dentro de la molécula. Al hervir agua, los puentes se rompen, no los enlaces O–H. Y el H unido a un carbono NO forma puente de hidrógeno.");

  B.parte.t2a = { secciones: secciones };
})(window);
