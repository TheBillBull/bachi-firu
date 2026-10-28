/* ============================================================
   Química II · ampliaciones · Tema 10: Reactividad de los compuestos del carbono
   (parte A: se añade al final de las secciones originales 1 a 4)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t10/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Tipos de reacciones
  secciones[0] = env(
    "<h5>Cómo se rompe un enlace: la clave de todo el tema</h5>" +
    "<p>Una reacción orgánica es, al final, <b>romper unos enlaces y formar otros</b>. Lo que decide el camino es cómo se rompe el enlace:</p>" +
    "<ul>" +
    "<li><b>Ruptura homolítica</b>: cada átomo se queda con un electrón del par. Se forman <b>radicales libres</b> (partículas neutras con un electrón desapareado, muy reactivas). Ocurre con luz UV o calor y en enlaces poco polares: Cl−Cl → 2 Cl•.</li>" +
    "<li><b>Ruptura heterolítica</b>: el par de electrones se lo queda uno de los átomos, el más electronegativo. Se forman <b>iones</b>: un <b>carbocatión</b> (C⁺) y un anión, o un <b>carbanión</b> (C⁻) y un catión. Ocurre en enlaces polares y en disolventes polares: (CH₃)₃C−Br → (CH₃)₃C⁺ + Br⁻.</li>" +
    "</ul>" +
    "<p>Los reactivos se clasifican por lo que buscan: un <b>nucleófilo</b> («amigo del núcleo») tiene un par de electrones que ceder y ataca zonas con déficit de electrones (HO⁻, NH₃, H₂O, CN⁻, Cl⁻); un <b>electrófilo</b> («amigo de los electrones») busca un par y ataca zonas ricas en electrones (H⁺, NO₂⁺, Br⁺, AlCl₃, carbocationes). Los veremos con detalle en la sección 8.</p>" +
    "<h5>Los seis tipos de un vistazo</h5>" +
    tabla(["Tipo", "Qué le pasa a la molécula", "Típico de", "Ejemplo"], [
      ["Sustitución", "un átomo o grupo se cambia por otro", "alcanos, halogenuros de alquilo, benceno", "CH₃−CH₂−Br + OH⁻ → CH₃−CH₂−OH + Br⁻"],
      ["Adición", "se rompe un enlace π y se añaden dos grupos", "alquenos, alquinos, carbonilo", "CH₂=CH₂ + Br₂ → CH₂Br−CH₂Br"],
      ["Eliminación", "se pierden dos grupos de carbonos vecinos y aparece un enlace π", "alcoholes, halogenuros de alquilo", "CH₃−CH₂OH → CH₂=CH₂ + H₂O"],
      ["Condensación", "dos moléculas se unen y sueltan una pequeña (H₂O, HCl…)", "ácidos, alcoholes, aminas", "CH₃COOH + CH₃OH ⇌ CH₃COOCH₃ + H₂O"],
      ["Oxidación-reducción", "cambia el número de oxidación del carbono (ganar O o perder H = oxidar)", "alcoholes, aldehídos, alquenos", "CH₃CH₂OH → CH₃CHO → CH₃COOH"],
      ["Combustión", "oxidación total con O₂: todo el C pasa a CO₂ y el H a H₂O", "todos los compuestos orgánicos", "CH₄ + 2 O₂ → CO₂ + 2 H₂O"]
    ], "q3t") +
    ojo("La <b>hidrólisis</b> («rotura por agua») y la <b>esterificación</b> son condensación o sustitución según cómo se mire. En la EvAU basta con identificar bien qué grupos entran y salen. Truco: si la molécula pasa de tener enlace múltiple a no tenerlo es adición; si pasa de no tenerlo a tenerlo es eliminación; si el esqueleto conserva el mismo grado de insaturación es sustitución.") +
    "<h5>Reconocer el tipo antes de predecir el producto</h5>" +
    "<p>Pregúntate tres cosas, en este orden: ¿hay un enlace múltiple en los reactivos o en los productos?, ¿qué grupo funcional hay (o aparece)?, ¿qué reactivo inorgánico y qué condiciones (UV, H₂SO₄, KOH alcohólico, K₂Cr₂O₇…) se dan? Casi siempre el reactivo ya «canta» el tipo. Practica con esta clasificación:</p>" +
    w("clasificar", "clas1") +
    "<h5>¿Qué familia reacciona de qué manera?</h5>" +
    tabla(["Familia", "Reacciones características"], [
      ["Alcanos (solo C−C y C−H sencillos)", "combustión; sustitución radicalaria por halógenos (luz UV)"],
      ["Alquenos y alquinos (C=C, C≡C)", "adición (H₂, X₂, HX, H₂O); combustión; oxidación fuerte; polimerización"],
      ["Benceno y aromáticos", "<b>sustitución</b> (halogenación, nitración); la adición destruiría el sistema aromático estable"],
      ["Halogenuros de alquilo (R−X)", "sustitución nucleófila (por OH⁻, NH₃, CN⁻…); eliminación de HX"],
      ["Alcoholes (R−OH)", "deshidratación (eliminación); oxidación; esterificación; sustitución del OH por X"],
      ["Aldehídos y cetonas (C=O)", "oxidación (solo los aldehídos); reducción a alcohol; adición al C=O"],
      ["Ácidos carboxílicos y derivados", "esterificación; hidrólisis; formación de amidas; neutralización"]
    ], "q3t")
  );

  // ---------------------------------------------------------------- 2. Sustitución
  secciones[1] = env(
    "<h5>Sustitución radicalaria de los alcanos</h5>" +
    "<p>Los alcanos son poco reactivos: sus enlaces C−C y C−H son fuertes y casi apolares, y no hay ni zonas ricas ni pobres en electrones. Sin embargo, con <b>luz ultravioleta</b> reaccionan con Cl₂ o Br₂ mediante una <b>reacción en cadena</b> de tres fases:</p>" +
    "<ol>" +
    "<li><b>Iniciación</b>: la luz rompe homolíticamente el halógeno: Cl₂ → 2 Cl•.</li>" +
    "<li><b>Propagación</b>: Cl• + CH₄ → HCl + CH₃• y después CH₃• + Cl₂ → CH₃Cl + Cl•. El radical Cl• se regenera: por eso un solo fotón provoca miles de reacciones.</li>" +
    "<li><b>Terminación</b>: se encuentran dos radicales y se anulan: Cl• + Cl• → Cl₂; CH₃• + CH₃• → C₂H₆; CH₃• + Cl• → CH₃Cl.</li>" +
    "</ol>" +
    "<p>Como la sustitución puede repetirse, con exceso de Cl₂ se obtiene una <b>mezcla</b>: CH₃Cl, CH₂Cl₂, CHCl₃ y CCl₄ (clorometano, diclorometano, triclorometano o cloroformo, tetraclorometano). Y en alcanos con más de un tipo de carbono hay varios <b>isómeros de posición</b>: el propano da 1-cloropropano y 2-cloropropano. El Cl• arranca con más facilidad el H de un carbono terciario que el de uno secundario, y este antes que el de uno primario (el radical resultante es más estable); además hay más H primarios que secundarios, así que el reparto final combina las dos cosas.</p>" +
    ejemplo("Monocloración del propano: ¿qué proporción de cada isómero?",
      "El propano (CH₃−CH₂−CH₃) tiene 6 H primarios y 2 H secundarios. A 25 °C el H secundario es unas 3,8 veces más reactivo que el primario frente al Cl•. Calcula el porcentaje de cada monoclorado.",
      ["Productos: 1-cloropropano (se sustituye un H primario) y 2-cloropropano (un H secundario).",
       "Peso de cada uno = nº de H × reactividad relativa: 1-cloro: 6 · 1 = 6; 2-cloro: 2 · 3,8 = 7,6. Total = 13,6.",
       "1-cloropropano: 6/13,6 = 44,1 %. 2-cloropropano: 7,6/13,6 = 55,9 %.",
       "El isómero «más sustituido» predomina, pero con el cloro la diferencia es pequeña; el bromo es mucho más selectivo."]) +
    w("q7_reacciones") +
    "<h5>Sustitución nucleófila de los halogenuros de alquilo</h5>" +
    "<p>En R−X el enlace C−X está polarizado: el carbono tiene una carga parcial positiva (δ⁺) porque el halógeno es más electronegativo. Un <b>nucleófilo</b> (un par de electrones libre) ataca ese carbono y desplaza al halogenuro, que sale como X⁻ («grupo saliente»):</p>" +
    "<div class='formula-wrap'><div class='formula'>R−X + Nu⁻ → R−Nu + X⁻</div></div>" +
    tabla(["Nucleófilo / condiciones", "Producto", "Ejemplo"], [
      ["NaOH o KOH <b>acuoso</b> (OH⁻)", "alcohol", "CH₃CH₂Br + NaOH → CH₃CH₂OH + NaBr"],
      ["NH₃ (en exceso)", "amina", "CH₃CH₂Br + 2 NH₃ → CH₃CH₂NH₂ + NH₄Br"],
      ["KCN", "nitrilo (alarga la cadena en un C)", "CH₃CH₂Br + KCN → CH₃CH₂CN + KBr"],
      ["R'O⁻ (alcóxido)", "éter", "CH₃CH₂Br + CH₃ONa → CH₃CH₂OCH₃ + NaBr"]
    ], "q3t") +
    ojo("Con la <b>misma</b> base la reacción depende del disolvente: NaOH <b>acuoso</b> → sustitución (alcohol); KOH <b>disuelto en etanol</b> y en caliente → eliminación (alqueno). Es una pregunta clásica: lee siempre las condiciones.") +
    "<h5>Sustitución en el benceno</h5>" +
    "<p>El benceno tiene seis electrones π deslocalizados que le dan una gran estabilidad. Una adición rompería esa estabilidad, así que el benceno <b>sustituye un H</b> y conserva el anillo. Ataca un <b>electrófilo</b> (la nube π es rica en electrones). Las reacciones que hay que saber son:</p>" +
    tabla(["Reacción", "Reactivos y catalizador", "Producto"], [
      ["Halogenación", "C₆H₆ + Cl₂ (o Br₂), con FeCl₃ (o FeBr₃)", "clorobenceno + HCl"],
      ["Nitración", "C₆H₆ + HNO₃, con H₂SO₄ conc.", "nitrobenceno + H₂O"],
      ["Alquilación de Friedel-Crafts", "C₆H₆ + CH₃Cl, con AlCl₃", "metilbenceno (tolueno) + HCl"]
    ], "q3t") +
    ejemplo("Del benceno al nitrobenceno",
      "Escribe y clasifica la reacción del benceno con ácido nítrico en medio sulfúrico. ¿Qué masa de nitrobenceno (M = 123) se obtiene de 7,8 g de benceno (M = 78) con un rendimiento del 80 %?",
      ["C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O (H₂SO₄ como catalizador). Se sustituye un H del anillo por −NO₂: <b>sustitución</b> (el electrófilo es el ion nitronio NO₂⁺).",
       "n(C₆H₆) = 7,8/78 = 0,10 mol → 0,10 mol de nitrobenceno teórico (relación 1 : 1).",
       "Masa teórica = 0,10 · 123 = 12,3 g; con el 80 %: 12,3 · 0,80 = 9,84 g."])
  );

  // ---------------------------------------------------------------- 3. Adición
  secciones[2] = env(
    "<h5>Por qué los alquenos y alquinos «adicionan»</h5>" +
    "<p>El doble enlace C=C es un enlace σ (fuerte) más un enlace π (más débil, con la nube de electrones fuera del eje). Esa nube π es accesible y rica en electrones: ataca a los electrófilos. Al reaccionar se <b>rompe el π y se forman dos enlaces σ nuevos</b>: es energéticamente favorable, por eso la adición es tan fácil en los alquenos y no en los alcanos.</p>" +
    tabla(["Reactivo", "Condiciones", "Producto con el eteno / propeno"], [
      ["H₂ (hidrogenación)", "catalizador Pt, Pd o Ni", "alcano: CH₂=CH₂ → CH₃−CH₃"],
      ["X₂ (Cl₂, Br₂)", "temperatura ambiente, CCl₄", "dihalogenuro vecinal: CH₂=CH₂ → CH₂Br−CH₂Br"],
      ["HX (HCl, HBr)", "sin más", "halogenuro de alquilo (Markovnikov)"],
      ["H₂O (hidratación)", "H₂SO₄ o H₃PO₄ diluido, calor", "alcohol (Markovnikov)"]
    ], "q3t") +
    "<p>El <b>bromo</b> sirve de ensayo: una disolución marrón-naranja de Br₂ se <b>decolora</b> al añadirla a un alqueno o alquino (se consume en la adición), pero no con un alcano. Con los <b>alquinos</b> se puede añadir uno o dos equivalentes de reactivo: CH≡CH + HCl → CH₂=CHCl (cloroeteno) y con otro HCl, CH₃−CHCl₂ (1,1-dicloroetano; el segundo Cl va al mismo carbono, otra vez por Markovnikov).</p>" +
    "<h5>Markovnikov, con su porqué</h5>" +
    "<p>La adición de HX es en dos pasos: (1) el H⁺ se une a uno de los dos carbonos y deja un <b>carbocatión</b> en el otro; (2) el X⁻ ataca al carbocatión. Como el primer paso es el lento, manda el carbocatión <b>más estable</b>. Los grupos alquilo empujan electrones hacia el carbono cargado (efecto inductivo +I) y lo estabilizan: <b>terciario &gt; secundario &gt; primario</b>. Por eso el H se queda en el carbono que ya tenía más H: así la carga positiva aparece en el carbono con más sustituyentes alquilo.</p>" +
    w("q10_markov") +
    ejemplo("Producto y masa de una adición de HBr",
      "Se hacen reaccionar 5,0 g de propeno con HBr en exceso. (a) Escribe la reacción y nombra el producto mayoritario. (b) Calcula la masa que se obtiene si el rendimiento es del 80 %. (Datos: C = 12; H = 1; Br = 80.)",
      ["(a) CH₃−CH=CH₂ + HBr → CH₃−CHBr−CH₃. El C2 (=CH−) tiene 1 H; el C1 (=CH₂) tiene 2 H. Markovnikov: el H al C1 (con más H) y el Br al C2. Producto principal: <b>2-bromopropano</b> (el 1-bromopropano es el minoritario).",
       "(b) M(C₃H₆) = 42 g/mol: n = 5,0/42 = 0,119 mol. Relación 1 : 1 → 0,119 mol teóricos de C₃H₇Br.",
       "M(C₃H₇Br) = 3·12 + 7 + 80 = 123 g/mol: masa teórica = 0,119 · 123 = 14,6 g.",
       "Con el rendimiento: 14,6 · 0,80 = <b>11,7 g</b> de 2-bromopropano."]) +
    ejemplo("Cuántos dobles enlaces tiene un hidrocarburo (índice de bromo)",
      "Un hidrocarburo de M = 42 g/mol decolora el bromo. Se comprueba que 2,1 g del compuesto consumen exactamente 8,0 g de Br₂ (M = 160). ¿Cuántos dobles enlaces C=C hay por molécula?",
      ["n(hidrocarburo) = 2,1/42 = 0,050 mol. n(Br₂) = 8,0/160 = 0,050 mol.",
       "Relación 1 : 1 → un solo enlace π por molécula: es un alqueno (C₃H₆, propeno). Si hubiera consumido el doble de Br₂, sería un dieno o un alquino."]) +
    "<h5>Otras adiciones y la polimerización</h5>" +
    "<p>La adición se repite miles de veces en la <b>polimerización de adición</b>: n CH₂=CH₂ → (−CH₂−CH₂−)ₙ (polietileno); con cloroeteno se obtiene PVC y con propeno, polipropileno. El benceno, en cambio, solo adiciona en condiciones extremas (H₂ a presión con catalizador da ciclohexano). Por último, el <b>doble enlace C=O</b> de aldehídos y cetonas también adiciona (por ejemplo, H₂ con Ni o con LiAlH₄ da el alcohol): lo veremos como reducción en la sección 6.</p>"
  );

  // ---------------------------------------------------------------- 4. Eliminación
  secciones[3] = env(
    "<h5>Dos formas de eliminar y una regla</h5>" +
    "<p>La eliminación es la reacción inversa de la adición: de dos carbonos vecinos salen dos átomos y aparece un doble enlace. Hay que saber dos casos:</p>" +
    "<ul>" +
    "<li><b>Deshidratación de alcoholes</b>: se pierde H₂O. Con H₂SO₄ concentrado y calor (≈ 170 °C): CH₃CH₂OH → CH₂=CH₂ + H₂O. (A temperatura más baja, ≈ 140 °C, dos alcoholes pueden formar un éter, una sustitución: 2 CH₃CH₂OH → CH₃CH₂OCH₂CH₃ + H₂O.)</li>" +
    "<li><b>Deshidrohalogenación</b>: se pierde HX. Con KOH <b>en etanol</b> y calor: CH₃CH₂Br + KOH → CH₂=CH₂ + KBr + H₂O.</li>" +
    "</ul>" +
    "<h5>Regla de Saytzeff (o Zaitsev)</h5>" +
    "<p>Cuando hay dos formas posibles de eliminar, el alqueno mayoritario es el <b>más sustituido</b> (el que tiene más grupos alquilo en el doble enlace), que es el más estable. En la práctica: <b>el H que sale es el del carbono vecino que tiene menos H</b> (es lo contrario que en Markovnikov: allí el H se <i>añadía</i> al carbono que más tenía; aquí se <i>quita</i> al que menos tiene).</p>" +
    ejemplo("Eliminación con dos posibilidades",
      "Deshidrata el butan-2-ol con H₂SO₄ concentrado y calor. ¿Qué alquenos se forman y cuál predomina?",
      ["CH₃−CH₂−CH(OH)−CH₃. El OH está en el C2; los carbonos vecinos son C1 (CH₃, 3 H) y C3 (CH₂, 2 H).",
       "Si sale el H del C1 se forma but-1-eno (CH₂=CH−CH₂−CH₃); si sale el del C3, but-2-eno (CH₃−CH=CH−CH₃).",
       "Saytzeff: el H sale del carbono con menos H (el C3) → <b>but-2-eno</b>, doble enlace con dos sustituyentes alquilo, es el producto principal (≈ 80 %); but-1-eno, minoritario.",
       "Además el but-2-eno tiene isomería geométrica: se forman <i>cis</i>- y <i>trans</i>-but-2-eno, con predominio del <i>trans</i>. En total: tres alquenos distintos."]) +
    w("q7_reacciones") +
    "<h5>Sustitución o eliminación: ¿qué elige el reactivo?</h5>" +
    tabla(["Condición", "Favorece", "Ejemplo con 2-bromopropano"], [
      ["OH⁻ en <b>agua</b>, temperatura moderada", "sustitución", "→ propan-2-ol"],
      ["OH⁻ en <b>etanol</b>, calor, base concentrada", "eliminación", "→ propeno"],
      ["halogenuro primario", "sustitución (casi siempre)", "bromoetano + NaOH(aq) → etanol"],
      ["halogenuro terciario", "eliminación (si la base es fuerte y hay calor)", "2-bromo-2-metilpropano + KOH/etanol → 2-metilpropeno"]
    ], "q3t")
  );

  B.parte.q2t10a = { secciones: secciones };
})(window);
