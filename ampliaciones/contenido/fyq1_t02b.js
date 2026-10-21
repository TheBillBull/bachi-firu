/* ============================================================
   Física y Química I · ampliaciones · Tema 2
   (parte B: secciones nuevas: historia, Lewis, geometría y polaridad, hibridación,
    energía de los enlaces, tipos de sustancias y problemas resueltos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "fyq1/t2/" + ref); }
  B.parte = B.parte || {};

  var nuevas = [
    // -------------------------------------------------------------- 6
    {
      h: "6. Cómo se descubrió el enlace: de Kossel y Lewis a Pauling",
      html:
        "<p>La idea de que los átomos se unen con electrones es de 1916, cuando el físico alemán <b>Walther Kossel</b> explicó el enlace entre un metal y un halógeno como una transferencia de electrones, y el químico estadounidense <b>Gilbert N. Lewis</b> propuso que el enlace entre no metales es un <b>par de electrones compartido</b>. En 1919 <b>Irving Langmuir</b> popularizó la regla del octeto y el término «covalente». Pero ni Kossel ni Lewis sabían por qué un par de electrones sujeta a dos núcleos: eso exigió la mecánica cuántica (<b>Heitler y London</b>, 1927, con la molécula de H₂) y, sobre todo, el trabajo de <b>Linus Pauling</b>, que en 1931 introdujo la hibridación y la resonancia y en 1932 la escala de electronegatividad. Pauling recibió por ello el Nobel de Química de 1954. Para predecir formas, <b>Gillespie y Nyholm</b> (1957) desarrollaron el modelo de repulsión de pares de electrones (TRPECV) que usarás en este tema.</p>" +
        w("linea", "historia") +
        "<p>Fíjate en que ninguno de estos modelos es «el verdadero»: cada uno es una forma de calcular y predecir. Lewis sirve para contar electrones y dibujar; TRPECV para la forma; la hibridación y los orbitales para entender por qué; la electronegatividad para saber cómo se reparte la carga. Un buen resolutor de problemas usa los cuatro, por orden.</p>"
    },
    // -------------------------------------------------------------- 7
    {
      h: "7. Estructuras de Lewis paso a paso",
      html:
        "<p>Una <b>estructura de Lewis</b> dibuja los átomos de una molécula o ion con sus electrones de valencia: los pares compartidos (enlaces) como rayas y los pares libres como puntos. Es el primer paso para casi cualquier ejercicio de enlace. El método es mecánico y siempre el mismo:</p>" +
        "<ol>" +
        "<li><b>Cuenta los electrones de valencia totales</b>: suma los de cada átomo; si hay carga, añade un electrón por cada carga negativa y resta uno por cada positiva.</li>" +
        "<li><b>Dibuja el esqueleto</b>: el átomo central es el menos electronegativo (nunca el H, que solo forma un enlace); los demás se colocan alrededor, unidos al central con enlaces sencillos (2 e⁻ cada uno).</li>" +
        "<li><b>Completa los octetos de los átomos terminales</b> con pares libres (el H solo tiene su par de enlace).</li>" +
        "<li><b>Reparte los electrones que sobran</b> como pares libres en el átomo central.</li>" +
        "<li>Si al central le falta el octeto, <b>convierte pares libres de un átomo vecino en enlaces dobles o triples</b> hasta completarlo.</li>" +
        "<li>Calcula las <b>cargas formales</b>: CF = e⁻ de valencia − (e⁻ de pares libres + nº de enlaces). La suma debe ser la carga total de la especie. Entre varias estructuras, es mejor la de cargas formales más pequeñas y con las negativas sobre los átomos más electronegativos.</li>" +
        "</ol>" +
        ejemplo("Lewis del CO₂ y del NH₄⁺", "Dibuja la estructura de Lewis del dióxido de carbono y del ion amonio y comprueba las cargas formales.", [
          "<b>CO₂</b>: e⁻ de valencia = 4 + 2·6 = <b>16</b> (8 pares). Esqueleto O–C–O: 2 enlaces sencillos usan 4 e⁻; cada O recibe 3 pares libres (12 e⁻) y quedan 0 en el C, que solo tiene 4 e⁻ a su alrededor. Cada O cede un par libre para formar un doble enlace: <b>O=C=O</b> con 2 pares libres en cada O.",
          "Cargas formales: C = 4 − (0 + 4) = 0; O = 6 − (4 + 2) = 0. Todo cero: estructura excelente.",
          "<b>NH₄⁺</b>: e⁻ de valencia = 5 + 4·1 − 1 = <b>8</b> (4 pares): los cuatro pares son enlaces N–H y no queda ningún par libre. CF(N) = 5 − (0 + 4) = <b>+1</b>; CF(H) = 1 − (0 + 1) = 0; suma = +1 = carga del ion."
        ]) +
        w("q2_lewis") +
        "<h5>Resonancia: cuando una sola estructura no basta</h5>" +
        "<p>El ozono (O₃) tiene 18 electrones de valencia y se puede dibujar con el doble enlace en un lado, O=O–O, o en el otro, O–O=O. Las dos estructuras son equivalentes, y la molécula real no es ninguna de ellas: <b>es un híbrido de resonancia</b>, con los dos enlaces O–O iguales y de <b>orden 1,5</b>, y con los electrones π repartidos por toda la molécula (deslocalizados). No es que la molécula «salte» de una a otra: son dos dibujos imperfectos de una única realidad intermedia. Se escribe con una flecha de dos puntas ↔ entre las estructuras.</p>" +
        ejemplo("Cargas formales y resonancia del SO₂ y del NO₃⁻", "Dibuja el SO₂ y el NO₃⁻ y calcula el orden de enlace S–O y N–O.", [
          "<b>SO₂</b>: 6 + 2·6 = <b>18</b> e⁻. Estructura O=S–O con un par libre en el S: CF(S) = 6 − (2 + 3) = <b>+1</b>; O doble: 6 − (4 + 2) = 0; O sencillo: 6 − (6 + 1) = <b>−1</b>. Suma 0. Hay dos formas equivalentes (el doble enlace a un lado o al otro): <b>orden de enlace S–O = (2 + 1)/2 = 1,5</b>.",
          "<b>NO₃⁻</b>: 5 + 3·6 + 1 = <b>24</b> e⁻. N central con un N=O y dos N–O⁻: CF(N) = 5 − (0 + 4) = <b>+1</b>; O doble 0; cada O sencillo −1. Suma: +1 − 2 = −1 = carga del ion. Tres formas equivalentes (el doble enlace puede estar con cualquiera de los tres O): <b>orden de enlace N–O = (2 + 1 + 1)/3 = 4/3 ≈ 1,33</b>."
        ]) +
        "<h5>Excepciones al octeto en la práctica</h5>" +
        tabla(["Especie", "e⁻ de valencia", "Qué ocurre", "Estructura"], [
          ["BF₃", "3 + 21 = 24", "B con solo 6 e⁻ (octeto incompleto); cargas formales todas 0", "tres enlaces B–F"],
          ["BeCl₂", "2 + 14 = 16", "Be con solo 4 e⁻", "Cl–Be–Cl"],
          ["PCl₅", "5 + 35 = 40", "P con 10 e⁻ (octeto expandido)", "cinco enlaces P–Cl"],
          ["SF₆", "6 + 42 = 48", "S con 12 e⁻", "seis enlaces S–F"],
          ["XeF₂", "8 + 14 = 22", "Xe con 10 e⁻ (3 pares libres)", "F–Xe–F"],
          ["NO", "5 + 6 = 11", "número impar de e⁻: un electrón desapareado", "radical N=O"]
        ]) +
        ojo("Una estructura de Lewis cuyos electrones no suman el total, o en la que el H tiene más de un enlace, está mal. Cuenta siempre primero los electrones y comprueba al final que el total coincide.")
    },
    // -------------------------------------------------------------- 8
    {
      h: "8. Forma de las moléculas (TRPECV) y polaridad molecular",
      html:
        "<p>Las moléculas no son planas ni lineales por capricho: tienen una forma tridimensional que determina propiedades como la polaridad, el punto de ebullición o la reactividad. La <b>teoría de repulsión de pares de electrones de la capa de valencia (TRPECV)</b> lo predice con una sola idea: <b>los pares de electrones alrededor del átomo central se repelen y se colocan lo más lejos posible entre sí</b>. Un enlace sencillo, doble o triple cuenta como <b>un solo dominio</b> de electrones, igual que un par libre.</p>" +
        "<p>El procedimiento: (1) hacer la estructura de Lewis; (2) contar los dominios de electrones alrededor del átomo central (nº estérico = átomos unidos + pares libres); (3) la disposición de los dominios da la geometría de los <i>pares</i>; (4) la geometría de la <i>molécula</i> es la que forman solo los átomos, sin contar los pares libres.</p>" +
        tabla(["Notación", "Nº estérico", "Geometría molecular", "Ángulos", "Hibridación", "Ejemplos"], [
          ["AX₂", "2", "lineal", "180°", "sp", "BeCl₂, CO₂, HCN"],
          ["AX₃", "3", "trigonal plana", "120°", "sp²", "BF₃, SO₃, NO₃⁻, CO₃²⁻"],
          ["AX₂E", "3", "angular", "&lt; 120° (SO₂ ≈ 119°)", "sp²", "SO₂, O₃"],
          ["AX₄", "4", "tetraédrica", "109,5°", "sp³", "CH₄, CCl₄, NH₄⁺, SO₄²⁻"],
          ["AX₃E", "4", "pirámide trigonal", "&lt; 109,5° (NH₃ 107°)", "sp³", "NH₃, PCl₃, H₃O⁺"],
          ["AX₂E₂", "4", "angular", "&lt; 109,5° (H₂O 104,5°)", "sp³", "H₂O, H₂S"],
          ["AX₅", "5", "bipirámide trigonal", "90°, 120°, 180°", "sp³d", "PCl₅"],
          ["AX₄E", "5", "balancín", "&lt; 90°, &lt; 120°", "sp³d", "SF₄"],
          ["AX₃E₂", "5", "forma de T", "&lt; 90°", "sp³d", "ClF₃"],
          ["AX₂E₃", "5", "lineal", "180°", "sp³d", "XeF₂"],
          ["AX₆", "6", "octaédrica", "90°, 180°", "sp³d²", "SF₆"],
          ["AX₅E", "6", "pirámide cuadrada", "&lt; 90°", "sp³d²", "BrF₅"],
          ["AX₄E₂", "6", "plana cuadrada", "90°, 180°", "sp³d²", "XeF₄, ICl₄⁻"]
        ]) +
        "<p>Los <b>pares libres ocupan más espacio</b> que los pares enlazantes (están solo atraídos por un núcleo y su nube es más ancha), de modo que repelen más y cierran los ángulos de enlace. El orden de las repulsiones es <b>par libre–par libre &gt; par libre–par enlazante &gt; par enlazante–par enlazante</b>. Eso explica la serie del mismo ángulo ideal de 109,5°: CH₄ 109,5° (0 pares libres), NH₃ 107° (1) y H₂O 104,5° (2).</p>" +
        w("q2_vsepr") +
        ejemplo("Predecir la geometría", "Predice la geometría y la hibridación del átomo central en H₂O, NH₃, CH₄, CO₂ y ClF₃.", [
          "<b>H₂O</b>: O tiene 6 e⁻ + 2 H → 2 enlaces y 2 pares libres = 4 dominios → tetraédrico de pares, molécula <b>angular</b> (≈ 104,5°), O sp³.",
          "<b>NH₃</b>: 3 enlaces + 1 par libre = 4 dominios → <b>pirámide trigonal</b> (≈ 107°), N sp³.",
          "<b>CH₄</b>: 4 enlaces + 0 pares = 4 dominios → <b>tetraédrica</b> (109,5°), C sp³.",
          "<b>CO₂</b>: O=C=O, 2 dominios (cada doble enlace cuenta como uno) → <b>lineal</b> (180°), C sp.",
          "<b>ClF₃</b>: Cl tiene 7 e⁻ y forma 3 enlaces; 7 − 3 = 4 e⁻ = 2 pares libres → 5 dominios (AX₃E₂). Los pares libres se colocan en el plano ecuatorial de la bipirámide, así que la molécula tiene <b>forma de T</b>, Cl sp³d."
        ]) +
        "<h5>Polaridad molecular: sumar flechas</h5>" +
        "<p>Cada enlace polar es un vector (dipolo de enlace). La molécula será polar si la <b>suma vectorial</b> de todos sus dipolos de enlace (y de los pares libres) <b>no es cero</b>. Así que son necesarias dos preguntas: (1) ¿hay enlaces polares?, y si hay, (2) ¿están colocados de forma simétrica, de modo que se cancelen? Una molécula simétrica con todos los ligandos iguales (AXₙ sin pares libres) es apolar; una con pares libres o con ligandos distintos casi siempre es polar.</p>" +
        tabla(["Molécula", "Geometría", "¿Dipolos de enlace?", "¿Se cancelan?", "Resultado"], [
          ["CO₂", "lineal", "sí (C=O)", "sí, van en sentidos opuestos", "<b>apolar</b>"],
          ["H₂O", "angular", "sí (O–H)", "no, forman 104,5°", "<b>polar</b> (μ = 1,85 D)"],
          ["BF₃", "trigonal plana", "sí (B–F)", "sí, a 120° se anulan", "<b>apolar</b>"],
          ["NH₃", "pirámide trigonal", "sí (N–H)", "no", "<b>polar</b> (1,47 D)"],
          ["CCl₄", "tetraédrica", "sí (C–Cl)", "sí", "<b>apolar</b>"],
          ["CHCl₃", "tetraédrica (ligandos distintos)", "sí", "no", "<b>polar</b>"],
          ["SF₆", "octaédrica", "sí", "sí", "<b>apolar</b>"],
          ["SF₄", "balancín", "sí", "no", "<b>polar</b>"],
          ["XeF₄", "plana cuadrada", "sí", "sí", "<b>apolar</b>"],
          ["SO₂", "angular", "sí", "no", "<b>polar</b> (1,63 D)"]
        ]) +
        w("q2_polaridad") +
        "<p>La polaridad molecular tiene consecuencias directas: las moléculas polares se atraen por fuerzas dipolo–dipolo (puntos de ebullición más altos que las apolares de masa parecida), se disuelven en agua y en disolventes polares, y se orientan en un campo eléctrico (por eso el agua se calienta en un microondas). Las apolares se disuelven en disolventes apolares.</p>" +
        ojo("«Enlaces polares» no es lo mismo que «molécula polar». El CO₂ tiene dos enlaces C=O muy polares y, sin embargo, la molécula es apolar. La polaridad de la molécula depende de la geometría.")
    },
    // -------------------------------------------------------------- 9
    {
      h: "9. Hibridación y enlaces σ y π",
      html:
        "<p>Los orbitales del carbono libre (2s² 2p²) sugerirían dos enlaces a 90° (los dos orbitales p desapareados). Sin embargo, en el metano hay <b>cuatro enlaces idénticos a 109,5°</b>. La explicación de Pauling es la <b>hibridación</b>: durante la formación del enlace, el orbital 2s y los p que hagan falta se «mezclan» y se reorganizan en el mismo número de <b>orbitales híbridos</b>, todos iguales, orientados en la dirección que minimiza la repulsión.</p>" +
        tabla(["Hibridación", "Orbitales que se mezclan", "Orbitales híbridos", "Disposición", "p puros sin hibridar", "Ejemplos"], [
          ["sp", "1 s + 1 p", "2", "lineal, 180°", "2 → enlaces π", "C del etino (C₂H₂), C del CO₂, Be del BeCl₂"],
          ["sp²", "1 s + 2 p", "3", "trigonal plana, 120°", "1 → un enlace π", "C del eteno (C₂H₄), C=O, B del BF₃, C del benceno"],
          ["sp³", "1 s + 3 p", "4", "tetraédrica, 109,5°", "0", "C del metano, N del NH₃, O del H₂O"]
        ]) +
        "<p>Hay un atajo: <b>el número de orbitales híbridos es igual al número de dominios de electrones</b> (átomos unidos + pares libres) del átomo central: 2 → sp, 3 → sp², 4 → sp³, 5 → sp³d, 6 → sp³d². Los pares libres también ocupan orbitales híbridos, por eso el N del NH₃ y el O del H₂O son sp³.</p>" +
        "<h5>Enlaces σ y enlaces π</h5>" +
        "<ul>" +
        "<li>El <b>enlace σ</b> (sigma) resulta del solapamiento frontal de dos orbitales a lo largo del eje que une los núcleos. Es el más fuerte y permite el giro de un grupo respecto a otro. Entre dos átomos unidos solo puede haber un σ.</li>" +
        "<li>El <b>enlace π</b> (pi) resulta del solapamiento lateral de dos orbitales p sin hibridar, dejando la densidad electrónica por encima y por debajo del eje. Es más débil y <b>impide el giro</b> en torno al enlace.</li>" +
        "<li>Un enlace sencillo es 1 σ; un doble es 1 σ + 1 π; un triple es 1 σ + 2 π.</li>" +
        "</ul>" +
        "<p>Esto explica la reactividad: en el eteno el enlace π (más débil y más expuesto) es el que se rompe en las reacciones, y que el doble enlace no gire es el origen de la isomería cis-trans (Tema 7). El enlace doble C=C (614 kJ/mol) no es el doble de fuerte que el sencillo (347): el segundo enlace, el π, solo añade 267 kJ/mol.</p>" +
        w("q2_hibrid") +
        ejemplo("Hibridación, σ y π de una molécula", "Para el propenonitrilo, CH₂=CH–C≡N, indica la hibridación de cada átomo distinto de H, los ángulos aproximados y el número de enlaces σ y π.", [
          "Dominios de cada átomo: C1 (=CH₂): 2 H + doble enlace → 3 dominios → <b>sp²</b>, 120°. C2 (=CH–): 1 H + C1 (doble) + C3 → 3 dominios → <b>sp²</b>, 120°. C3 (–C≡): C2 + triple enlace con N → 2 dominios → <b>sp</b>, 180°. N (≡N): triple enlace + 1 par libre → 2 dominios → <b>sp</b>.",
          "σ: 3 enlaces C–H + C1=C2 (1) + C2–C3 (1) + C3≡N (1) = <b>6 σ</b>. π: 1 (en C=C) + 2 (en C≡N) = <b>3 π</b>.",
          "Comprobación: la molécula tiene 7 átomos y 6 enlaces entre ellos (uno por pareja unida) → 6 σ ✓."
        ])
    },
    // -------------------------------------------------------------- 10
    {
      h: "10. Energía y enlace: energías de enlace, energía reticular y ΔH",
      html:
        "<p>Romper un enlace cuesta energía; formarlo la desprende. Con las <b>energías de enlace medias</b> (la energía necesaria para romper un mol de enlaces en estado gaseoso) se puede estimar el calor de una reacción: <b>ΔH ≈ Σ E(enlaces rotos en los reactivos) − Σ E(enlaces formados en los productos)</b>. Si se desprende más energía al formar los productos de la que se gastó en romper los reactivos, la reacción es exotérmica (ΔH &lt; 0).</p>" +
        tabla(["Enlace", "E (kJ/mol)", "Enlace", "E (kJ/mol)", "Enlace", "E (kJ/mol)"], [
          ["H–H", "436", "C–H", "413", "O=O", "498"],
          ["Cl–Cl", "243", "C–C", "347", "O–H", "463"],
          ["H–Cl", "432", "C=C", "614", "C=O (CO₂)", "799"],
          ["N≡N", "945", "C≡C", "839", "N–H", "391"],
          ["F–F", "158", "C–O", "358", "H–F", "567"]
        ]) +
        ejemplo("ΔH de una reacción con energías de enlace", "Estima ΔH para: a) H₂ + Cl₂ → 2 HCl; b) N₂ + 3 H₂ → 2 NH₃; c) CH₄ + 2 O₂ → CO₂ + 2 H₂O(g).", [
          "<b>a)</b> Rotos: H–H (436) + Cl–Cl (243) = 679 kJ. Formados: 2 · H–Cl = 2 · 432 = 864 kJ. ΔH = 679 − 864 = <b>−185 kJ</b> (el valor experimental es −184,6).",
          "<b>b)</b> Rotos: N≡N (945) + 3 H–H (3 · 436 = 1 308) = 2 253 kJ. Formados: 6 N–H = 6 · 391 = 2 346 kJ. ΔH = 2 253 − 2 346 = <b>−93 kJ</b> (experimental −92 kJ).",
          "<b>c)</b> Rotos: 4 C–H (1 652) + 2 O=O (996) = 2 648 kJ. Formados: 2 C=O (1 598) + 4 O–H (1 852) = 3 450 kJ. ΔH = 2 648 − 3 450 = <b>−802 kJ</b> (con agua en estado gas, como en la ecuación)."
        ]) +
        "<p>Son estimaciones: las energías de enlace son <i>promedios</i> de muchas moléculas (el enlace O–H del agua no vale exactamente lo mismo que el de un alcohol), así que el resultado no coincide al 100 % con el medido. En el Tema 6 verás cómo calcularlo con exactitud con la entalpía de formación y la ley de Hess.</p>" +
        "<h5>La energía reticular: tres maneras de obtenerla</h5>" +
        "<ol>" +
        "<li><b>De tablas</b>: NaCl 787, LiF 1 036, MgO 3 791 kJ/mol…</li>" +
        "<li><b>Con el ciclo de Born–Haber</b> (ley de Hess), sumando los pasos medidos. Para el MgO: sublimación del Mg +148, dos ionizaciones (738 + 1 451 = +2 189), atomización de ½ O₂ +249, primera afinidad del O −141, segunda afinidad +744 (añadir un electrón a O⁻ está desfavorecido por repulsión) y ΔH<sub>f</sub> = −602. Despejando, U = 148 + 2 189 + 249 − 141 + 744 + 602 = <b>3 791 kJ/mol</b>.</li>" +
        "<li><b>Con una fórmula aproximada</b> (Kapustinskii), que solo necesita cargas y radios: U ≈ 120 250 · ν · |z⁺z⁻|/(r⁺ + r⁻) · (1 − 34,5/(r⁺ + r⁻)), con r en pm, U en kJ/mol y ν = número de iones por unidad fórmula.</li>" +
        "</ol>" +
        ejemplo("Estimar la energía reticular del KCl", "Usa la fórmula de Kapustinskii con r(K⁺) = 138 pm y r(Cl⁻) = 181 pm y compárala con el valor de tablas (715 kJ/mol).", [
          "d = r⁺ + r⁻ = 138 + 181 = 319 pm. ν = 2 iones, |z⁺z⁻| = 1.",
          "U = 120 250 · 2 · 1/319 · (1 − 34,5/319) = 753,9 · (1 − 0,1082) = <b>672 kJ/mol</b>.",
          "Frente a 715 kJ/mol de tablas hay un error de un 6 %: suficiente para ordenar sales y entender las tendencias, pero no para cálculos finos."
        ])
    },
    // -------------------------------------------------------------- 11
    {
      h: "11. Deducir el tipo de sustancia por sus propiedades",
      html:
        "<p>Muchos problemas dan unos datos experimentales (punto de fusión, conductividad, solubilidad, dureza) y piden decir de qué tipo de sustancia se trata y por qué. Se resuelven con esta tabla y un pequeño árbol de decisiones.</p>" +
        tabla(["", "Iónica", "Metálica", "Covalente molecular", "Covalente reticular"], [
          ["Partículas", "iones (+) y (−)", "cationes y e⁻ libres", "moléculas", "átomos en una red"],
          ["Qué las mantiene unidas", "atracción electrostática", "mar de electrones", "fuerzas intermoleculares", "enlaces covalentes"],
          ["Punto de fusión", "alto (400–3 000 °C)", "muy variable (−39 a 3 400 °C)", "bajo (suelen ser gases o líquidos, o sólidos blandos)", "muy alto (&gt; 1 500 °C)"],
          ["Dureza", "duras y frágiles", "maleables y dúctiles", "blandas", "muy duras"],
          ["Conducen en estado sólido", "no", "sí", "no", "no (grafito sí)"],
          ["Conducen fundidas o disueltas", "sí", "(funden: sí)", "no", "no se disuelven ni funden fácilmente"],
          ["Solubilidad", "en agua (muchas)", "no (se atacan o forman aleaciones)", "las polares en agua, las apolares en disolventes apolares", "insolubles"],
          ["Ejemplos", "NaCl, MgO, KBr, CaF₂", "Fe, Cu, Na, latón", "H₂O, CO₂, I₂, glucosa, CH₄", "diamante, SiO₂, SiC"]
        ]) +
        "<p><b>Árbol de decisión:</b> 1) ¿Conduce la electricidad en estado <i>sólido</i>? Si sí, es un <b>metal</b> (o grafito). 2) Si no, ¿conduce fundida o disuelta? Si sí, es <b>iónica</b>. 3) Si no conduce de ninguna forma, mira el punto de fusión: si es muy alto y la sustancia muy dura, <b>covalente reticular</b>; si es bajo, <b>covalente molecular</b>, y para ordenarla con otras de su clase hay que decidir qué fuerzas intermoleculares hay (London, dipolo–dipolo, puente de H).</p>" +
        w("q2_propiedades") +
        ejemplo("¿De qué sustancia se trata?", "Se tienen cuatro sustancias sólidas incoloras. A: funde a 801 °C, no conduce sólida y sí fundida. B: funde a 1 085 °C, conduce en estado sólido y se puede laminar. C: funde a 3 550 °C, no conduce y es extremadamente dura. D: funde a 80 °C, no conduce en ningún estado y es muy poco soluble en agua. Clasifícalas.", [
          "<b>A</b>: no conduce sólida pero sí fundida → <b>iónica</b> (NaCl).",
          "<b>B</b>: conduce sólida y es maleable → <b>metálica</b> (cobre).",
          "<b>C</b>: punto de fusión altísimo, dureza extrema, sin conductividad → <b>covalente reticular</b> (diamante).",
          "<b>D</b>: bajo punto de fusión, no conduce, apenas soluble en agua (apolar) → <b>covalente molecular</b> apolar (naftaleno, C₁₀H₈)."
        ])
    },
    // -------------------------------------------------------------- 12
    {
      h: "12. Problemas resueltos tipo examen",
      html:
        "<p>Los problemas de este tema combinan casi siempre las mismas herramientas. Antes de verlos, ordena mentalmente el método de análisis de una molécula (puedes practicarlo con el juego de ordenar de la autocomprobación): electrones → Lewis → dominios → geometría → polaridad.</p>" +
        ejemplo("Problema 1: ordenar sales por punto de fusión", "Ordena de menor a mayor punto de fusión: NaF, NaCl, MgO y KBr. Radios (pm): Na⁺ 102, K⁺ 138, Mg²⁺ 72, F⁻ 133, Cl⁻ 181, Br⁻ 196, O²⁻ 140.", [
          "El punto de fusión de un sólido iónico sigue a la energía reticular, U ∝ |z⁺z⁻|/d, con d = r⁺ + r⁻.",
          "NaF: d = 235 pm → 1/235 = 4,26·10⁻³. NaCl: d = 283 → 3,53·10⁻³. KBr: d = 334 → 2,99·10⁻³. MgO: d = 212, y el producto de cargas es 4 → 4/212 = 18,9·10⁻³.",
          "Orden creciente: <b>KBr &lt; NaCl &lt; NaF &lt; MgO</b> (puntos de fusión reales: 734, 801, 993 y 2 852 °C)."
        ]) +
        ejemplo("Problema 2: BF₃ frente a NF₃", "Compara el BF₃ y el NF₃: electrones de valencia, estructura, geometría, hibridación del átomo central y polaridad.", [
          "<b>BF₃</b>: 3 + 3·7 = 24 e⁻. B con 3 enlaces y 0 pares libres (octeto incompleto): AX₃ → <b>trigonal plana</b>, 120°, B sp², los tres dipolos B–F se cancelan → <b>apolar</b>.",
          "<b>NF₃</b>: 5 + 3·7 = 26 e⁻ (13 pares): 3 enlaces N–F, 9 pares libres en los F y 1 en el N. AX₃E → <b>pirámide trigonal</b>, N sp³ (≈ 102°); el par libre rompe la simetría → <b>polar</b>."
        ]) +
        ejemplo("Problema 3: carácter iónico de un enlace", "El enlace H–Cl tiene un momento dipolar μ = 1,08 D y una longitud de 127 pm. Calcula su carácter iónico (1 D = 3,336·10⁻³⁰ C·m; e = 1,602·10⁻¹⁹ C).", [
          "Si el enlace fuera 100 % iónico (H⁺ y Cl⁻ separados 127 pm), μ = e·d = 1,602·10⁻¹⁹ · 127·10⁻¹² = 2,03·10⁻²⁹ C·m = 6,10 D.",
          "Carácter iónico = μ medido / μ iónico = 1,08/6,10 = 0,177 → <b>17,7 %</b>. Es coherente con la estimación de Pauling a partir de Δχ (21 %): enlace covalente polar."
        ]) +
        ejemplo("Problema 4: CO₂ frente a SO₂", "Ambos son óxidos de un elemento no metálico con enlaces polares. Explica por qué el CO₂ es apolar y el SO₂ polar.", [
          "<b>CO₂</b>: C con 2 dominios (dos dobles enlaces) → AX₂ lineal. Los dos dipolos C=O son iguales y opuestos: suma 0 → apolar.",
          "<b>SO₂</b>: S con un doble enlace, un enlace sencillo (resonancia) y un par libre → 3 dominios → AX₂E angular (≈ 119°). Los dipolos S–O forman un ángulo y no se cancelan → polar (μ = 1,63 D).",
          "Consecuencia: el SO₂ es soluble en agua y se licúa con facilidad (−10 °C), mientras que el CO₂ sublima a −78 °C y es poco soluble."
        ]) +
        ejemplo("Problema 5: disolventes y puentes de hidrógeno", "Explica: a) por qué el etanol (CH₃CH₂OH) es miscible con el agua y el hexano (C₆H₁₄) no; b) por qué el etanol hierve a 78 °C y el éter dimetílico (CH₃OCH₃) a −24 °C.", [
          "<b>a)</b> El etanol tiene un grupo O–H que forma puentes de hidrógeno con el agua: sustituye con ventaja los puentes agua–agua. El hexano es apolar, solo tiene fuerzas de London y no puede romper los puentes de H del agua para mezclarse.",
          "<b>b)</b> Misma fórmula (C₂H₆O). El etanol tiene O–H y forma puentes de H <i>entre sus moléculas</i>; el éter solo tiene fuerzas dipolo–dipolo y London. Hace falta mucha más energía para separar moléculas de etanol: 78 − (−24) = <b>102 °C</b> de diferencia."
        ]) +
        ejemplo("Problema 6: tres isómeros, tres temperaturas", "El pentano, el 2-metilbutano y el 2,2-dimetilpropano (C₅H₁₂) hierven a 36, 28 y 9,5 °C. Asigna cada temperatura y justifícalo.", [
          "Las tres son apolares con la misma masa molar: solo hay fuerzas de London, que dependen de la superficie de contacto entre moléculas.",
          "Cadena lineal (pentano) → mayor contacto → <b>36 °C</b>. Una ramificación (2-metilbutano) → más compacta → <b>28 °C</b>. Casi esférica (2,2-dimetilpropano) → mínimo contacto → <b>9,5 °C</b>."
        ]) +
        ejemplo("Problema 7: halógenos y estados de agregación", "Explica por qué el F₂ y el Cl₂ son gases, el Br₂ un líquido y el I₂ un sólido a temperatura ambiente, si en todos el enlace es covalente apolar.", [
          "Las moléculas X₂ son apolares: solo se atraen por London, que crecen con el número de electrones (F₂: 18, Cl₂: 34, Br₂: 70, I₂: 106).",
          "Puntos de ebullición: F₂ −188 °C, Cl₂ −34 °C, Br₂ 59 °C, I₂ 184 °C. A 25 °C el F₂ y el Cl₂ están por encima de su punto de ebullición: son gases; el Br₂ está entre su punto de fusión (−7 °C) y su ebullición (59 °C): es líquido; el I₂ está por debajo de su punto de fusión (114 °C): es sólido."
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
        "<p>Doce preguntas de test con explicación, tarjetas con las ideas clave y cuatro juegos: unir cada molécula con su geometría, clasificar sustancias por tipo y moléculas por su polaridad, repartir ejemplos entre las fuerzas intermoleculares y ordenar el método de análisis de una molécula.</p>" +
        w("quiz", "quiz1") + w("tarjetas", "tj1") + w("emparejar", "geom") + w("clasificar", "sust") + w("clasificar", "pol") + w("clasificar", "fuerzas") + w("orden", "metodo")
    }
  ];

  B.parte.t2b = { nuevas: nuevas };
})(window);
