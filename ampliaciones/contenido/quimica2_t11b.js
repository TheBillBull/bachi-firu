/* ============================================================
   Química II · ampliaciones · Tema 11: Polímeros y macromoléculas
   (parte B: secciones nuevas 5 a 12)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t11/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};

  var nuevas = [
    // ------------------------------------------------------------ 5. Monómero <-> polímero
    {
      h: "5. Del monómero al polímero y al revés",
      html: env(
        "<p>Es la pregunta más repetida del tema: te dan una unidad repetida y piden el monómero (o al revés). Hay dos métodos, uno para cada tipo de polimerización.</p>" +
        "<h5>Polímero de adición → monómero</h5>" +
        "<ol>" +
        "<li>Mira la cadena principal: solo carbonos con enlaces simples.</li>" +
        "<li>Toma <b>dos carbonos consecutivos</b> de la cadena (la unidad repetida) con todo lo que cuelga de ellos.</li>" +
        "<li>Vuelve a escribir entre ellos un <b>doble enlace</b>: ese es el monómero.</li>" +
        "</ol>" +
        ejemplo("Dos monómeros a partir de dos unidades repetidas",
          "Escribe el monómero de a) −[CH₂−CHF]<sub>n</sub>− y b) −[CH₂−C(CH₃)₂]<sub>n</sub>−. ¿Cuál es el nombre de cada uno?",
          ["a) Los dos carbonos de la cadena son CH₂ y CHF. Se restablece el doble enlace: <b>CH₂=CHF</b>, fluoroeteno.",
           "b) Los dos carbonos son CH₂ y C(CH₃)₂: <b>CH₂=C(CH₃)₂</b>, 2-metilpropeno (se llama poliisobutileno)."]) +
        "<p><b>Excepción con dienos</b>: si la unidad repetida tiene <b>cuatro carbonos con un doble enlace en medio</b>, como −CH₂−CH=CH−CH₂−, el monómero era un dieno: buta-1,3-dieno (CH₂=CH−CH=CH₂). Con un grupo metilo colgando sale el isopreno.</p>" +
        "<h5>Polímero de condensación → monómeros</h5>" +
        "<ol>" +
        "<li>Localiza los enlaces <b>amida</b> (−CO−NH−) o <b>éster</b> (−CO−O−) de la cadena.</li>" +
        "<li><b>Rompe</b> cada enlace en el punto de unión (por el enlace C−N de la amida, por el C−O del éster).</li>" +
        "<li>Devuelve el <b>agua</b>: pon un −OH al trozo con el C=O (queda −COOH) y un H al otro trozo (queda −NH₂ o −OH).</li>" +
        "</ol>" +
        ejemplo("Monómeros de un poliéster",
          "El polímero −[O−CH₂−CH₂−O−CO−(CH₂)₂−CO]<sub>n</sub>− contiene enlaces éster. ¿De qué monómeros procede?",
          ["Enlaces éster: −O−CO−. Se rompen por el enlace C−O: a un lado queda el trozo −O−CH₂−CH₂−O−, al otro −CO−(CH₂)₂−CO−.",
           "Se devuelve el agua: el trozo del alcohol recupera dos H (HO−CH₂−CH₂−OH, <b>etano-1,2-diol</b>) y el del acilo recupera dos OH (HOOC−CH₂−CH₂−COOH, <b>ácido butanodioico</b>).",
           "Es un poliéster: diol + diácido, como el PET."]) +
        ejemplo("Un solo monómero",
          "El nailon 6 tiene como unidad repetida −[NH−(CH₂)₅−CO]<sub>n</sub>−. ¿Cuál es el monómero?",
          ["Un único enlace amida por unidad (−NH−CO−): hay un solo monómero con los dos extremos distintos.",
           "Al romper la amida y devolver el agua, un extremo queda −NH₂ y el otro −COOH: <b>H₂N−(CH₂)₅−COOH</b>, ácido 6-aminohexanoico.",
           "(En la industria se fabrica con un monómero cíclico, la caprolactama, pero el resultado es el mismo.)"]) +
        "<h5>Monómeros → polímero</h5>" +
        "<p>Sigue el camino inverso: primero decide si hay doble enlace C=C (adición) o dos grupos reactivos (condensación). En condensación, <b>anota el agua que sale</b>: si lo olvidas, la ecuación no está ajustada.</p>" +
        w("emparejar", "emp1") +
        w("orden", "orden1") +
        ojo("Un error frecuente: dibujar el polímero de adición con el doble enlace dentro de la cadena. Si hay C=C en la unidad repetida, es porque el monómero tenía dos (un dieno), no porque «sobrase» uno.")
      )
    },
    // ------------------------------------------------------------ 6. Estructura y propiedades
    {
      h: "6. Estructura y propiedades: termoplásticos, termoestables y elastómeros",
      html: env(
        "<h5>La forma de las cadenas lo explica casi todo</h5>" +
        "<p>Dos plásticos con el mismo monómero (eteno) pueden ser muy distintos solo por cómo se organizan las cadenas:</p>" +
        tabla(["Estructura", "Cómo son las cadenas", "Propiedades", "Ejemplo"], [
          ["Lineal", "largas y rectas, se apilan juntas", "más denso, rígido y resistente", "polietileno de alta densidad (HDPE): botellas, tuberías"],
          ["Ramificada", "con ramas que impiden apilarlas", "menos denso, blando y flexible", "polietileno de baja densidad (LDPE): bolsas, film"],
          ["Entrecruzada (red)", "cadenas unidas entre sí por enlaces covalentes", "no funde, no se disuelve", "baquelita, vulcanizado"]
        ], "q3t") +
        "<h5>Tres comportamientos frente al calor</h5>" +
        "<ul>" +
        "<li><b>Termoplásticos</b>: cadenas lineales o ramificadas, unidas solo por fuerzas intermoleculares. Al calentar se <b>reblandecen y funden</b>, y al enfriar vuelven a endurecer: se pueden moldear una y otra vez y son <b>reciclables</b> fundiéndolos (PE, PP, PVC, PS, PET, nailon).</li>" +
        "<li><b>Termoestables</b>: red tridimensional con muchos enlaces covalentes entre cadenas. Una vez moldeados <b>no se pueden fundir</b>: al calentar mucho se descomponen y carbonizan (baquelita, melamina de los mangos de sartén, resinas epoxi).</li>" +
        "<li><b>Elastómeros</b>: cadenas largas y flexibles unidas por <b>pocos</b> puentes. Se estiran mucho y, al soltar, los puentes devuelven las cadenas a su sitio (caucho vulcanizado, neopreno, siliconas).</li>" +
        "</ul>" +
        w("q11_red") +
        "<h5>La vulcanización</h5>" +
        "<p>El caucho natural (poliisopreno) sin tratar es blando, pegajoso y se deforma para siempre. En 1839 Goodyear descubrió que calentarlo con <b>azufre</b> lo mejora: el azufre se une a los dobles enlaces que quedan en las cadenas y crea <b>puentes de azufre</b> entre ellas. Con un 1–3 % de azufre se obtiene un elastómero (neumáticos, gomas); con un 30 % queda un termoestable duro, la ebonita.</p>" +
        "<h5>Copolímeros</h5>" +
        "<p>Un <b>homopolímero</b> procede de un solo monómero (PE, PVC, PS). Un <b>copolímero</b> mezcla dos o más monómeros distintos en la misma cadena y combina sus propiedades: el <b>SBR</b> (estireno-butadieno) es el caucho de los neumáticos; el <b>ABS</b> (acrilonitrilo-butadieno-estireno) forma los LEGO® y las carcasas; el nailon 6,6 es, en rigor, un copolímero alternante de dos monómeros (diácido y diamina).</p>" +
        ojo("Termoplástico no es «plástico blando» ni termoestable «plástico duro». Lo que decide es si <b>se puede volver a fundir</b> (termoplástico) o no (termoestable), y el elastómero se define por su capacidad de recuperar la forma tras estirarse.")
      )
    },
    // ------------------------------------------------------------ 7. Sintéticos de interés
    {
      h: "7. Polímeros sintéticos de interés",
      html: env(
        "<p>Para cada polímero debes saber el monómero, el tipo de polimerización y un uso. Pero entender <b>por qué</b> sirve para eso te ahorra memoria.</p>" +
        tabla(["Polímero", "Tipo", "Por qué sirve para…", "Usos"], [
          ["PE (polietileno)", "adición", "solo C−C y C−H: apolar, flexible, no absorbe agua", "bolsas, botellas, juguetes, tuberías"],
          ["PP (polipropileno)", "adición", "más rígido y más resistente al calor que el PE", "envases, tapones, textiles, parachoques"],
          ["PVC", "adición", "el enlace C−Cl es polar: más rígido; con plastificante se vuelve flexible", "tuberías, ventanas, cables, suelos"],
          ["PS (poliestireno)", "adición", "anillos voluminosos: rígido, transparente y quebradizo; espumado, aislante", "yogures, corcho blanco"],
          ["PTFE (teflón)", "adición", "el enlace C−F es muy fuerte y los F protegen la cadena: inerte y antiadherente", "sartenes, juntas, cintas"],
          ["PMMA (metacrilato)", "adición", "transparente y resistente al impacto", "mamparas, lentes, acuarios"],
          ["Nailon 6,6", "condensación (poliamida)", "los grupos −CO−NH− forman enlaces de hidrógeno entre cadenas: fibras muy resistentes", "ropa, cuerdas, piezas mecánicas"],
          ["PET", "condensación (poliéster)", "fuerte, transparente, impermeable a los gases", "botellas, fibras de poliéster"],
          ["Kevlar (aramida)", "condensación (poliamida con anillos)", "cadenas rígidas con muchos enlaces de hidrógeno: más resistente que el acero a igual peso", "chalecos antibalas, cascos"],
          ["Poliuretano", "poliadición (no libera nada)", "según el diol: espumas blandas (colchones) o rígidas (aislante)", "colchones, suelas, aislantes"],
          ["Siliconas", "condensación (cadena Si−O)", "estables a temperaturas extremas; elastómeros", "juntas, moldes, prótesis"]
        ], "q3t") +
        w("clasificar", "clas1") +
        ojo("Los polímeros de adición con C−C pueden verse como «cadenas de alcano» con sustituyentes: no se hidrolizan. Los de condensación (amida, éster) sí se rompen con agua, ácido o base, y eso los hace reciclables químicamente o biodegradables (sección 9).")
      )
    },
    // ------------------------------------------------------------ 8. Cálculos
    {
      h: "8. Problemas numéricos con polímeros",
      html: env(
        "<p>Los problemas de polímeros son estequiometría de siempre con una ventaja: una cadena es una larga repetición. Se resuelven con cuatro herramientas:</p>" +
        "<div class='formula-wrap'><div class='formula'>M(polímero) = n · M(unidad repetida)</div></div>" +
        "<ul>" +
        "<li><b>Adición</b>: M(unidad) = M(monómero). La masa del polímero es igual a la del monómero consumido (por el rendimiento).</li>" +
        "<li><b>Condensación</b>: M(unidad) = M(monómeros) − (nº de H₂O que salen por unidad) · 18. La masa de polímero + la masa de agua liberada = masa de monómeros.</li>" +
        "<li><b>Composición</b>: el % en masa de un elemento sale de la unidad repetida (no hace falta conocer n).</li>" +
        "<li><b>Combustión</b>: se ajusta con la unidad repetida: (CH₂)<sub>n</sub> + 3n/2 O₂ → n CO₂ + n H₂O.</li>" +
        "</ul>" +
        ejemplo("Combustión de polietileno",
          "Se quema por completo 1,00 kg de polietileno. Calcula las masas de CO₂ y de H₂O que se forman. (C = 12; H = 1; O = 16)",
          ["La unidad repetida es CH₂ (M = 14 g/mol): (CH₂)<sub>n</sub> + 3n/2 O₂ → n CO₂ + n H₂O.",
           "n(CH₂) = 1 000 / 14 = 71,43 mol.",
           "CO₂: 71,43 · 44 = 3 143 g = <b>3,14 kg</b>. H₂O: 71,43 · 18 = 1 286 g = <b>1,29 kg</b>.",
           "Comprobación: el O₂ consumido es 71,43 · 1,5 · 32 = 3 429 g; 1 000 + 3 429 = 4 429 g = 3 143 + 1 286. ✓"]) +
        "<p>Un plástico se hace con petróleo y, al quemarse, devuelve su carbono a la atmósfera como CO₂: por cada kilo de polietileno, más de tres kilos de CO₂.</p>" +
        ejemplo("Combustión de PVC: el problema del cloro",
          "¿Qué masa de HCl se libera al quemar 1,00 kg de PVC? (C = 12; H = 1; Cl = 35,5)",
          ["Unidad repetida: C₂H₃Cl (M = 62,5). Al arder, el cloro pasa a HCl: (C₂H₃Cl)<sub>n</sub> + 5n/2 O₂ → 2n CO₂ + n H₂O + n HCl.",
           "n(unidad) = 1 000 / 62,5 = 16,0 mol → 16,0 mol de HCl.",
           "m(HCl) = 16,0 · 36,5 = <b>584 g</b>. Es un gas corrosivo y tóxico: por eso el PVC no se quema sin filtros."]) +
        ejemplo("Un copolímero: el SBR",
          "El caucho SBR tiene, de media, 3 unidades de butadieno (C₄H₆, M = 54) por cada unidad de estireno (C₈H₈, M = 104). ¿Qué % en masa de estireno contiene?",
          ["Masa de 3 butadieno + 1 estireno = 3 · 54 + 104 = 266 g.",
           "% estireno = 104 / 266 · 100 = <b>39,1 %</b>."]) +
        ejemplo("Masa molar media de una mezcla de cadenas",
          "Una muestra tiene 50 cadenas de masa 10 000 g/mol y 50 cadenas de 30 000 g/mol. ¿Cuál es la masa molar media (por número de cadenas)?",
          ["M media = (50 · 10 000 + 50 · 30 000) / 100 = 2 000 000 / 100 = <b>20 000 g/mol</b>.",
           "Por esto se habla de una masa media: nunca todas las cadenas tienen la misma longitud."]) +
        ojo("En un problema de condensación, la masa de polímero que sale es <b>menor</b> que la suma de las masas de los monómeros. Si tu resultado es mayor, te has olvidado del agua.")
      )
    },
    // ------------------------------------------------------------ 9. Reciclaje e impacto
    {
      h: "9. Reciclaje, residuos e impacto ambiental",
      html: env(
        "<h5>Por qué los plásticos persisten</h5>" +
        "<p>Los polímeros de adición solo tienen enlaces C−C y C−H, muy estables y apolares: ni el agua ni los microorganismos los atacan, y tardan siglos en degradarse. Los de condensación (poliésteres, poliamidas) tienen enlaces éster y amida que <b>sí se hidrolizan</b>, aunque despacio. Con la luz y la erosión, los plásticos se fragmentan en <b>microplásticos</b> (menos de 5 mm), que entran en las cadenas tróficas.</p>" +
        "<h5>Qué se puede hacer con un residuo plástico</h5>" +
        tabla(["Vía", "En qué consiste", "Ventajas e inconvenientes"], [
          ["Reutilizar", "volver a usar el objeto", "la mejor opción: no hay que procesarlo"],
          ["Reciclado mecánico", "triturar, lavar y fundir (solo termoplásticos) para moldear de nuevo", "barato, pero la calidad baja en cada ciclo y exige separar tipos de plástico"],
          ["Reciclado químico", "despolimerizar con calor, agua o alcohol hasta recuperar monómeros (PET con glicol o metanol)", "recupera calidad original; más caro; aprovecha polímeros de condensación"],
          ["Valorización energética", "quemarlos para producir energía", "recupera energía, pero emite CO₂ y, con PVC, HCl y dioxinas: exige depuración"],
          ["Vertedero", "enterrarlos", "ocupa espacio y los plásticos permanecen siglos"]
        ], "q3t") +
        "<p>Las <b>tres R</b>: <b>R</b>educir, <b>R</b>eutilizar, <b>R</b>eciclar, por este orden de prioridad. Un termoestable (baquelita) o un elastómero entrecruzado no se pueden fundir: se aprovechan triturados como carga o se queman con recuperación de energía.</p>" +
        "<h5>Los códigos de reciclado</h5>" +
        "<p>En el fondo de los envases hay un triángulo con un número que indica el material:</p>" +
        tabla(["Código", "Siglas", "Polímero", "Ejemplo"], [
          ["1", "PET", "polietilentereftalato", "botella de agua"],
          ["2", "HDPE", "polietileno de alta densidad", "garrafas, botes de champú"],
          ["3", "PVC", "policloruro de vinilo", "tuberías, blísteres"],
          ["4", "LDPE", "polietileno de baja densidad", "bolsas, film"],
          ["5", "PP", "polipropileno", "tapones, envases de yogur"],
          ["6", "PS", "poliestireno", "bandejas, vasos"],
          ["7", "otros", "mezclas y policarbonato", "CDs, biberones antiguos"]
        ], "q3t") +
        w("emparejar", "emp2") +
        "<h5>Bioplásticos y biodegradables: no es lo mismo</h5>" +
        "<ul>" +
        "<li><b>Bioplástico</b> = se fabrica a partir de materias primas renovables (maíz, caña de azúcar). El PLA se obtiene del ácido láctico de la fermentación del almidón.</li>" +
        "<li><b>Biodegradable</b> = los microorganismos lo descomponen en un tiempo razonable (a CO₂, agua y biomasa). El PLA es biodegradable, pero en condiciones industriales de compostaje (60 °C), no en el campo.</li>" +
        "<li>Un plástico puede ser bioplástico y no biodegradable (polietileno hecho con etanol de caña) o biodegradable de origen fósil.</li>" +
        "</ul>" +
        ejemplo("La huella de una botella",
          "Una botella de PET pesa 24,0 g. Si se incinera, ¿cuántos gramos de CO₂ produce? (la unidad repetida es C₁₀H₈O₄, M = 192)",
          ["PET: (C₁₀H₈O₄)<sub>n</sub> + 10n O₂ → 10n CO₂ + 4n H₂O (10 CO₂ + 4 H₂O contienen 24 átomos de O; la unidad aporta 4, así que faltan 20 O = 10 O₂).",
           "n(unidad) = 24,0 / 192 = 0,125 mol → 10 · 0,125 = 1,25 mol de CO₂.",
           "m(CO₂) = 1,25 · 44 = <b>55,0 g</b> (más de dos veces la masa de la botella)."]) +
        w("clasificar", "clas3")
      )
    },
    // ------------------------------------------------------------ 10. EvAU
    {
      h: "10. Cómo se pregunta en la EvAU",
      html: env(
        "<p>En Madrid, los polímeros suelen aparecer como un apartado dentro de una pregunta de química orgánica. Los formatos más típicos:</p>" +
        tabla(["Qué piden", "Cómo se resuelve"], [
          ["Escribe la reacción de polimerización del monómero X y di de qué tipo es", "Mira si hay C=C (adición) o grupos −COOH, −NH₂, −OH (condensación). Escribe n X → −[unidad]<sub>n</sub>−, y en condensación añade el agua."],
          ["Identifica el monómero (o monómeros) del polímero", "Adición: dos C de la cadena + doble enlace. Condensación: rompe las amidas o ésteres y devuelve el agua (sección 5)."],
          ["Diferencia entre polimerización por adición y condensación", "Adición: C=C se abre, no se libera nada, unidad = monómero. Condensación: dos grupos reaccionan, se libera H₂O, unidad &lt; suma de monómeros."],
          ["Termoplástico, termoestable y elastómero", "Entrecruzamiento: ninguno, mucho, poco. Qué pasa al calentar. Un ejemplo de cada uno."],
          ["Polímeros naturales: monómero, enlace y función", "Polisacárido (glucosa, glucosídico), proteína (aminoácido, peptídico), ácido nucleico (nucleótido, fosfodiéster)."],
          ["Problema con masa molar, n o composición", "M = n · M(unidad); en condensación resta el agua (sección 8)."],
          ["Impacto ambiental y reciclaje", "Persistencia (enlaces C−C), microplásticos, 3R, reciclado mecánico y químico, incineración y su CO₂ o HCl."]
        ], "q3t") +
        "<h5>Plantilla para las preguntas teóricas</h5>" +
        "<ul>" +
        "<li>Define con una frase y da <b>un ejemplo concreto con fórmulas</b>: «Polimerización por adición: ... Ejemplo: n CH₂=CH₂ → −[CH₂−CH₂]<sub>n</sub>−».</li>" +
        "<li>Si preguntan una diferencia, hazla con dos columnas o dos frases paralelas (qué se rompe, qué se libera, tipo de monómero).</li>" +
        "<li>Si piden <b>una ventaja y un inconveniente</b> de un plástico: durabilidad (ventaja) y persistencia ambiental (inconveniente), y relaciona la causa con el enlace C−C.</li>" +
        "</ul>" +
        "<h5>Lista de comprobación</h5>" +
        "<ul>" +
        "<li>¿Puse corchetes y el subíndice <i>n</i> en el polímero?</li>" +
        "<li>En adición, ¿desapareció el doble enlace?</li>" +
        "<li>En condensación, ¿escribí el agua (y bien ajustada, 2n − 1 o n − 1)?</li>" +
        "<li>En problemas, ¿usé la masa de la <b>unidad repetida</b> y no la del monómero?</li>" +
        "</ul>"
      )
    },
    // ------------------------------------------------------------ 11. ¿Qué falla aquí?
    {
      h: "11. ¿Qué falla aquí? Errores típicos de polímeros",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente. Detéctalo antes de mirar la explicación.</p>" + w("quiz", "errores")
    },
    // ------------------------------------------------------------ 12. Autocomprobación
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Un test de diez preguntas, tarjetas para fijar definiciones y un juego de clasificar.</p>" + w("quiz", "quiz1") + w("tarjetas", "tarjetas1") + w("clasificar", "clas2")
    }
  ];

  B.parte.q2t11b = { nuevas: nuevas };
})(window);
