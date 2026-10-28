/* ============================================================
   Química II · ampliaciones · Tema 4: Enlace químico
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Tipo de enlace</b>: metal + no metal → iónico (transferencia); no metal + no metal → covalente (se comparten pares); metal + metal → metálico (electrones deslocalizados). Δχ es una guía (HF, Δχ = 1,78, es covalente).",
    "<b>Lewis</b>: V = electrones de valencia (± carga del ion); enlaces = (8n − V)/2 (H cuenta 2); pares libres = (2V − 8n)/2 hasta completar octetos. CF = valencia − libres − enlaces. Excepciones: BeCl₂, BF₃ (incompleto); PCl₅, SF₆ (periodo 3 en adelante); radicales NO, NO₂.",
    "<b>TRPECV</b>: se cuentan <b>dominios</b> (enlace sencillo, doble o triple = 1; par libre = 1). AX₂ lineal 180° · AX₃ plana 120° · AX₂E angular · AX₄ tetraédrica 109,5° · AX₃E pirámide ≈107° · AX₂E₂ angular ≈104,5°. Los pares libres cierran los ángulos.",
    "<b>Hibridación</b> = nº de dominios: 4 sp³, 3 sp², 2 sp. Enlace doble = 1 σ + 1 π; triple = 1 σ + 2 π. Los π salen de los p puros.",
    "<b>Polaridad</b>: suma vectorial de los dipolos. Se anulan si la geometría es simétrica y los sustituyentes son iguales (CO₂, BF₃, CH₄, CCl₄). Pares libres o sustituyentes distintos → polar (H₂O, NH₃, SO₂, CHCl₃).",
    "<b>Fuerzas intermoleculares</b>: dispersión (todas; crece con el tamaño) &lt; dipolo–dipolo &lt; puente de H (H unido a F, O o N). Explican T<sub>eb</sub> y solubilidad. Hervir no rompe enlaces covalentes.",
    "<b>Iónicos</b>: U ∝ q₊q₋/(r₊+r₋): manda la carga, luego el tamaño. Born–Haber: ΔH<sub>f</sub> = sub + EI + ½E + AE − U. <b>Metales</b>: mar de electrones. <b>Redes covalentes</b>: enlaces fuertes en todo el cristal. <b>Energías de enlace</b>: ΔH ≈ Σ rotos − Σ formados."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«El agua tiene geometría tetraédrica porque el oxígeno tiene cuatro pares de electrones.» ¿Qué falla?",
          op: ["Nada", "Los cuatro <i>pares</i> se disponen en tetraedro, pero la geometría de la <i>molécula</i> solo cuenta los átomos: es angular", "El oxígeno tiene seis pares", "El agua es lineal"], ok: 1,
          porque: "La TRPECV distingue la disposición de los pares (tetraédrica, 4 dominios) de la forma de la molécula (angular, con 2 pares libres que no se «ven»). Ángulo H–O–H ≈ 104,5°." },
        { q: "«El CO₂ es polar porque los enlaces C=O son polares.» ¿Qué falla?",
          op: ["Nada", "Los enlaces son polares, pero la molécula es lineal y los dos dipolos, iguales y opuestos, se anulan: el CO₂ es apolar", "El CO₂ tiene pares libres en el C", "Los enlaces C=O son apolares"], ok: 1,
          porque: "Polaridad del enlace ≠ polaridad de la molécula. Con geometría simétrica y sustituyentes iguales (AX₂ lineal) la suma vectorial es cero. Con el SO₂ (angular) no se anula." },
        { q: "«La sal común sólida no conduce porque no tiene iones.» ¿Qué falla?",
          op: ["Nada", "Sí tiene iones, pero están fijos en la red cristalina; conduce fundida o disuelta, cuando se mueven", "Los iones no tienen carga", "La sal es un metal"], ok: 1,
          porque: "El NaCl es un cristal de Na⁺ y Cl⁻. Para conducir hacen falta cargas <b>móviles</b>: en el sólido están en posiciones fijas; fundido o en disolución, libres." },
        { q: "«MgO tiene menor energía reticular que NaCl porque el Mg²⁺ es mucho más pequeño que el Na⁺ y el O²⁻ que el Cl⁻.» ¿Qué falla?",
          op: ["Nada", "Los iones más pequeños y con más carga atraen más: MgO tiene mayor energía reticular (3791 frente a 787 kJ/mol)", "El tamaño no influye nunca", "El MgO no es iónico"], ok: 1,
          porque: "U ∝ q₊q₋/d. En el MgO el producto de cargas es 4 (frente a 1) y d es menor (212 frente a 283 pm): ambos factores aumentan U." },
        { q: "«Al hervir el agua se rompen los enlaces O–H, por eso hace falta tanta energía.» ¿Qué falla?",
          op: ["Nada", "Se rompen fuerzas intermoleculares (sobre todo puentes de H); los enlaces O–H siguen intactos en el vapor de agua", "Se rompen los enlaces H–H", "El agua no tiene enlaces O–H"], ok: 1,
          porque: "Hervir separa moléculas (≈ 41 kJ/mol); romper un O–H cuesta 463 kJ/mol. Un cambio de estado no cambia la sustancia." },
        { q: "Un alumno calcula los electrones del ion carbonato como 4 + 3·6 = 22 y dibuja el Lewis con 11 pares. ¿Qué falla?",
          op: ["Nada", "Se olvida sumar los 2 electrones de la carga 2−: son 24 e⁻ = 12 pares", "Debía restar 2", "El C aporta 6 electrones"], ok: 1,
          porque: "En un anión se <b>suman</b> tantos electrones como cargas negativas (en un catión se restan). Con 22 no sale una estructura con octetos completos." },
        { q: "«El enlace doble C=C es dos veces más fuerte que el sencillo C–C porque son dos enlaces iguales.» ¿Qué falla?",
          op: ["Nada", "Un doble enlace es 1 σ + 1 π, y el π es más débil: 614 kJ/mol frente a 2·347 = 694", "El C=C es más débil que el C–C", "El C–C no existe"], ok: 1,
          porque: "El enlace σ (solapamiento frontal) es más fuerte que el π (lateral). Por eso los alquenos reaccionan rompiendo el π (adición)." },
        { q: "En un ciclo de Born–Haber para NaCl un alumno suma 243 kJ/mol (la energía completa del enlace Cl–Cl) en el paso de disociación. ¿Qué falla?",
          op: ["Nada", "Por cada NaCl solo se forma un átomo de Cl: se necesita ½ Cl₂, es decir 243/2 = 121,5 kJ/mol", "Debía usar 2·243", "La disociación no se incluye en el ciclo"], ok: 1,
          porque: "Na(s) + ½ Cl₂(g) → NaCl(s). Solo hay que romper medio mol de enlaces Cl–Cl por mol de NaCl. Con CaCl₂ sí se disocia 1 mol de Cl₂ completo." },
        { q: "«El grafito conduce la electricidad, así que es un metal.» ¿Qué falla?",
          op: ["Nada", "Es un sólido covalente: cada C sp² usa 3 electrones en σ y el cuarto (π) queda deslocalizado en la capa", "El grafito no conduce", "Los metales no conducen"], ok: 1,
          porque: "El grafito es una red covalente en capas; los electrones π deslocalizados explican la conducción. Es blando por las fuerzas débiles entre capas, nada que ver con un metal." },
        { q: "«El HF hierve a 20 °C y el HCl a −85 °C: el HF tiene mayor T<sub>eb</sub> porque su masa es mayor.» ¿Qué falla?",
          op: ["Nada", "La masa del HF (20) es menor que la del HCl (36,5): el HF hierve más alto por sus puentes de hidrógeno", "El HCl forma puentes de H", "El HF es apolar"], ok: 1,
          porque: "El F (pequeño y muy electronegativo) forma puentes de hidrógeno fuertes (F–H···F); el Cl, no. Es la excepción a «más masa, más T<sub>eb</sub>»." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Qué tipo de enlace une los átomos en el CaF₂?",
          op: ["Iónico", "Covalente apolar", "Metálico", "Covalente coordinado"], ok: 0, porque: "Metal (Ca, grupo 2) + no metal muy electronegativo (F): se transfieren electrones y se forma un cristal iónico." },
        { q: "¿Cuántos electrones de valencia hay que dibujar en la estructura de Lewis del ion NH₄⁺?",
          op: ["8", "9", "10", "7"], ok: 0, porque: "5 (N) + 4·1 (H) − 1 (carga +) = 8 electrones: 4 enlaces N–H." },
        { q: "Geometría de la molécula de SO₂:",
          op: ["Angular", "Lineal", "Trigonal plana", "Pirámide trigonal"], ok: 0, porque: "S con 2 enlaces y 1 par libre (AX₂E): 3 dominios → angular, ≈ 119°." },
        { q: "¿Qué ángulo H–N–H es el más probable en el NH₃?",
          op: ["≈ 107°", "109,5° exactos", "120°", "180°"], ok: 0, porque: "AX₃E: el par libre cierra el ángulo desde 109,5° a ≈ 107°." },
        { q: "Hibridación del carbono del grupo C=O en el metanal (CH₂O):",
          op: ["sp²", "sp³", "sp", "sp³d"], ok: 0, porque: "3 dominios (2 C–H y C=O, contado como uno) → trigonal plana, sp²." },
        { q: "¿Cuántos enlaces σ y π hay en el eteno, C₂H₄?",
          op: ["5 σ y 1 π", "4 σ y 2 π", "6 σ", "3 σ y 3 π"], ok: 0, porque: "4 C–H (σ) + C=C (1 σ + 1 π) = 5 σ y 1 π." },
        { q: "¿Cuál de estas moléculas es apolar?",
          op: ["BF₃", "NH₃", "H₂O", "SO₂"], ok: 0, porque: "BF₃ es trigonal plana con tres enlaces iguales: los dipolos se anulan. Las otras tienen pares libres y son polares." },
        { q: "¿Qué sustancia forma puentes de hidrógeno entre sus moléculas?",
          op: ["CH₃OH", "CH₄", "HCl", "CH₃OCH₃"], ok: 0, porque: "El H unido al O del –OH es atraído por un par libre de otro O. El HCl (Cl no es F, O ni N) y el éter (sin H en O) no." },
        { q: "Con los radios dados, ¿cuál tiene mayor energía reticular?",
          op: ["MgO", "NaCl", "KBr", "NaF"], ok: 0, porque: "Mayor producto de cargas (2·2 = 4) y menor distancia entre iones." },
        { q: "El ciclo de Born–Haber sirve para calcular…",
          op: ["la energía reticular (con la ley de Hess)", "la geometría molecular", "la polaridad de un enlace", "el punto de ebullición"], ok: 0, porque: "U = ΔH<sub>sub</sub> + EI + ½E + AE − ΔH<sub>f</sub>: se calcula por Hess porque no se mide directamente." },
        { q: "Un sólido no conduce la electricidad, es muy duro, insoluble y funde por encima de 1700 °C. Es…",
          op: ["covalente en red", "iónico", "metálico", "molecular"], ok: 0, porque: "Aislante, durísimo e insoluble con T<sub>f</sub> altísima: red covalente (p. ej. SiO₂)." },
        { q: "¿Por qué un metal es maleable pero un cristal iónico es frágil?",
          op: ["En el metal los planos de cationes deslizan sin enfrentar cargas iguales", "El metal tiene enlaces covalentes", "El cristal iónico tiene electrones libres", "El metal no tiene red cristalina"], ok: 0, porque: "En el iónico un desplazamiento enfrenta iones de igual carga y se rompe; en el metal el mar de electrones sigue envolviendo a los cationes." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: enlace químico",
      cartas: [
        { a: "Método de recuento de Lewis", b: "V = Σ e⁻ de valencia (± carga); enlaces = (8n − V)/2; pares libres = (2V − 8n)/2; luego cargas formales." },
        { a: "Carga formal", b: "CF = e⁻ de valencia − e⁻ en pares libres − nº de enlaces. Su suma es la carga del ion; mejor estructura: CF pequeñas, negativa en el más electronegativo." },
        { a: "Excepciones al octeto", b: "Incompleto: Be y B (BeCl₂, BF₃). Expandido: periodo 3 en adelante (PCl₅, SF₆). Radicales: número impar de e⁻ (NO, NO₂)." },
        { a: "TRPECV", b: "Los dominios de electrones del átomo central (enlaces —uno por enlace múltiple— y pares libres) se repelen y se sitúan lo más lejos posible." },
        { a: "AX₃E y AX₂E₂", b: "AX₃E: pirámide trigonal (NH₃, ≈107°). AX₂E₂: angular (H₂O, ≈104,5°). Ambas con 4 dominios (hibridación sp³)." },
        { a: "Orden de repulsión entre pares", b: "Par libre–par libre &gt; par libre–par de enlace &gt; par de enlace–par de enlace." },
        { a: "Hibridación y dominios", b: "Nº de orbitales híbridos = nº de dominios: 2 → sp (180°), 3 → sp² (120°), 4 → sp³ (109,5°)." },
        { a: "Enlace σ y π", b: "σ: solapamiento frontal (primer enlace). π: lateral, de p puros. Doble = σ + π; triple = σ + 2π." },
        { a: "Molécula polar", b: "Enlaces polares y suma vectorial de dipolos distinta de cero: geometría asimétrica o sustituyentes distintos. CO₂, BF₃, CH₄, CCl₄: apolares." },
        { a: "Puente de hidrógeno", b: "H unido a F, O o N atraído por un par libre de otro F, O o N. 10–40 kJ/mol; explica la alta T<sub>eb</sub> de H₂O, HF, NH₃ y alcoholes." },
        { a: "Energía reticular", b: "Energía para separar 1 mol de sólido iónico en iones gaseosos. U ∝ q₊q₋/(r₊+r₋): manda la carga y luego el tamaño." },
        { a: "Ciclo de Born–Haber", b: "ΔH<sub>f</sub> = ΔH<sub>sub</sub> + EI + ½E + AE − U (ley de Hess). Se usa para calcular U." }
      ]
    },
    emp1: {
      titulo: "Une cada observación con su explicación",
      consigna: "Une cada observación con la explicación que la justifica.",
      pares: [
        ["El CO₂ es apolar con enlaces polares", "Geometría lineal: los dipolos se anulan"],
        ["El NH₃ tiene un ángulo de 107° y no de 109,5°", "El par libre repele más que un par de enlace"],
        ["El eteno es plano, con ángulos de ≈ 120°", "Carbonos sp² (3 dominios)"],
        ["El MgO funde a 2852 °C y el NaCl a 801 °C", "Mayor producto de cargas y menor distancia entre iones"],
        ["El agua hierve a 100 °C y el H₂S a −60 °C", "Puentes de hidrógeno entre moléculas de agua"],
        ["El cobre se estira en hilos", "Los planos de cationes deslizan dentro del mar de electrones"],
        ["El diamante es durísimo y no conduce", "Red covalente tridimensional con electrones localizados"]
      ]
    },
    orden1: {
      titulo: "Ordena por punto de ebullición creciente",
      consigna: "De menor a mayor: CH₄, HCl, NH₃, HF, H₂O.",
      items: [
        { t: "CH₄ (−162 °C)", nota: "Apolar: solo fuerzas de dispersión, débiles (molécula pequeña)." },
        { t: "HCl (−85 °C)", nota: "Polar: dipolo–dipolo; sin puente de H (el Cl no es F, O ni N)." },
        { t: "NH₃ (−33 °C)", nota: "Puentes de H, pero débiles: el N es menos electronegativo y tiene un solo par libre." },
        { t: "HF (20 °C)", nota: "Puentes de H muy fuertes (F–H···F), aunque cada molécula tiene un solo H." },
        { t: "H₂O (100 °C)", nota: "2 H y 2 pares libres por molécula: red de hasta 4 puentes de H." }
      ]
    },
    ordenBH: {
      titulo: "Ordena los pasos del ciclo de Born–Haber del NaCl",
      consigna: "Del primero al último: de Na(s) y ½ Cl₂(g) hasta el NaCl(s).",
      items: [
        { t: "Sublimación del sodio: Na(s) → Na(g)", nota: "+107 kJ/mol." },
        { t: "Ionización del sodio: Na(g) → Na⁺(g) + e⁻", nota: "+496 kJ/mol." },
        { t: "Disociación del cloro: ½ Cl₂(g) → Cl(g)", nota: "+121,5 kJ/mol (½ · 243)." },
        { t: "Afinidad electrónica del cloro: Cl(g) + e⁻ → Cl⁻(g)", nota: "−349 kJ/mol." },
        { t: "Formación de la red: Na⁺(g) + Cl⁻(g) → NaCl(s)", nota: "−U = −787 kJ/mol: el paso que estabiliza el cristal." }
      ]
    },
    clas1: {
      titulo: "Clasifica la sustancia",
      consigna: "Toca cada sustancia y después el tipo al que pertenece.",
      categorias: ["Iónica", "Molecular covalente", "Covalente en red", "Metálica"],
      items: [
        { t: "NaCl", c: 0 }, { t: "MgO", c: 0 }, { t: "CaF₂", c: 0 },
        { t: "H₂O", c: 1 }, { t: "CO₂", c: 1 }, { t: "I₂", c: 1 }, { t: "C₁₂H₂₂O₁₁", c: 1 },
        { t: "SiO₂", c: 2 }, { t: "diamante", c: 2 }, { t: "SiC", c: 2 },
        { t: "Fe", c: 3 }, { t: "Cu", c: 3 }, { t: "Na", c: 3 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS (★ 15 · ★★ 16 · ★★★ 15)
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }

  // ---------------- ★ ----------------
  op("a1", 1, "¿Qué tipo de enlace hay en el bromuro de potasio, KBr?", "Enlace", ["iónico", "covalente apolar", "covalente polar", "metálico"], 0,
    ["Mira si los elementos son metal o no metal."], ["K es un metal (grupo 1) y Br un no metal (grupo 17).", "El K cede un electrón al Br: se forman K⁺ y Br⁻ que se atraen en una red."], "Iónico");
  nu("a2", 1, "¿Cuántos electrones de valencia se dibujan en la estructura de Lewis del amoníaco, NH₃?", "Electrones =", 8,
    ["Suma los de cada átomo: N (grupo 15) y 3 H."], ["N: 5 e⁻; 3 H: 3 · 1 = 3 e⁻.", "Total: 5 + 3 = 8 e⁻ = 4 pares (3 enlaces N–H y 1 par libre)."], "8");
  nu("a3", 1, "¿Cuántos electrones de valencia tiene la molécula de CO₂?", "Electrones =", 16,
    ["C es del grupo 14 y O del grupo 16."], ["C: 4 e⁻; 2 O: 2 · 6 = 12 e⁻.", "Total: 16 e⁻ = 8 pares: O=C=O con 2 pares libres en cada O."], "16");
  op("a4", 1, "¿Qué geometría tiene la molécula de metano, CH₄?", "Geometría", ["tetraédrica", "plana cuadrada", "pirámide trigonal", "angular"], 0,
    ["Cuenta los pares de electrones del C."], ["C con 4 enlaces C–H y ningún par libre: AX₄.", "Cuatro dominios sin pares libres → tetraédrica, H–C–H = 109,5°."], "Tetraédrica");
  op("a5", 1, "¿Cuál es la hibridación de los carbonos del etino, HC≡CH?", "Hibridación", ["sp", "sp²", "sp³", "no hay hibridación"], 0,
    ["Cuenta los dominios de cada C (el triple enlace cuenta como uno)."], ["Cada C: un enlace con H y un triple enlace con el otro C: 2 dominios.", "2 dominios → sp, lineal, 180°."], "sp");
  op("a6", 1, "¿Cuál de estas moléculas es apolar?", "Apolar", ["CO₂", "H₂O", "NH₃", "SO₂"], 0,
    ["Pregunta por la simetría de la geometría."], ["CO₂ es lineal y simétrica: los dos dipolos C=O se anulan.", "H₂O y SO₂ son angulares y NH₃ piramidal: sus dipolos no se anulan."], "CO₂");
  nu("a7", 1, "Calcula la diferencia de electronegatividad en el enlace H–Cl (χ: H 2,20; Cl 3,16).", "Δχ =", 0.96,
    ["Resta la menor de la mayor."], ["Δχ = 3,16 − 2,20 = 0,96.", "Valor intermedio: enlace covalente polar (δ⁺ en el H, δ⁻ en el Cl)."], "0,96");
  op("a8", 1, "¿Cuál de estas sustancias forma puentes de hidrógeno entre sus moléculas?", "Puentes de H", ["H₂O", "CH₄", "HCl", "H₂S"], 0,
    ["Necesitas un H unido a F, O o N."], ["En el H₂O el H está unido al O: se forman puentes O–H···O.", "El CH₄ (C), HCl (Cl) y H₂S (S) no cumplen la condición."], "H₂O");
  nu("a9", 1, "¿Cuántos pares libres tiene el átomo de oxígeno en la molécula de agua?", "Pares libres =", 2,
    ["O tiene 6 electrones de valencia y forma 2 enlaces."], ["O: 6 e⁻ de valencia; 2 se usan en los enlaces con los H.", "Quedan 4 e⁻ = 2 pares libres. 4 dominios en total (2 + 2): angular."], "2");
  op("a10", 1, "Un sólido no conduce la electricidad, pero sí cuando se funde. Es…", "Tipo de sólido", ["iónico", "metálico", "covalente en red", "molecular apolar"], 0,
    ["¿Cuándo hay iones móviles?"], ["Un conductor en estado fundido y no en sólido tiene iones que solo se mueven al fundir la red.", "Es un sólido iónico (p. ej. NaCl)."], "Iónico");
  nu("a11", 1, "¿Cuántos enlaces σ hay en la molécula de eteno, C₂H₄?", "Enlaces σ =", 5,
    ["Cuenta C–H y el σ de C=C."], ["4 enlaces C–H, todos σ.", "El C=C es 1 σ + 1 π: 1 σ más.", "Total: 4 + 1 = 5 σ (y 1 π)."], "5");
  op("a12", 1, "¿Cuál de estos compuestos tiene mayor energía reticular?", "Mayor U", ["MgO", "NaCl", "KCl", "NaBr"], 0,
    ["Fíjate sobre todo en la carga de los iones."], ["MgO: Mg²⁺ y O²⁻ (producto 4). NaCl, KCl y NaBr: 1.", "La carga manda: U(MgO) = 3791 kJ/mol."], "MgO");
  op("a13", 1, "¿Qué sólido tiene mayor punto de fusión?", "Mayor T<sub>f</sub>", ["diamante", "yodo (I₂)", "hielo", "naftaleno"], 0,
    ["Piensa en lo que se rompe al fundir."], ["Diamante: red covalente; hay que romper enlaces C–C (≈ 3550 °C).", "I₂, hielo y naftaleno son moleculares: solo fuerzas intermoleculares."], "Diamante");
  nu("a14", 1, "¿Cuántos enlaces π hay en la molécula de nitrógeno, N₂ (N≡N)?", "Enlaces π =", 2,
    ["Un triple enlace es 1 σ + …"], ["Triple enlace = 1 σ + 2 π.", "Los dos π usan los orbitales p puros de cada N."], "2");
  op("a15", 1, "¿Qué ángulo H–C–H hay en el metano?", "Ángulo", ["109,5°", "90°", "120°", "180°"], 0,
    ["Geometría tetraédrica."], ["Tetraedro regular: arccos(−1/3) = 109,47°.", "Se redondea a 109,5°."], "109,5°");

  // ---------------- ★★ ----------------
  nu("b1", 2, "¿Cuántos electrones de valencia hay que distribuir en el ion carbonato, CO₃²⁻?", "Electrones =", 24,
    ["No olvides la carga del ion."], ["C: 4; 3 O: 3 · 6 = 18; carga 2−: +2.", "Total: 4 + 18 + 2 = 24 e⁻ = 12 pares."], "24");
  ge("b2", 2, "Dibuja la estructura de Lewis del HCN. Indica cuántos enlaces σ y cuántos π tiene.",
    { tipo: "lista", etiqueta: "σ y π =", valores: [2, 2] },
    ["Primero el recuento de electrones: 10."], ["V = 1 + 4 + 5 = 10; H–C≡N con 1 par libre en el N.", "H–C: 1 σ; C≡N: 1 σ + 2 π. Total: 2 σ y 2 π."], "2 σ y 2 π");
  ge("b3", 2, "En la estructura de Lewis del SO₂ con un enlace doble y uno sencillo, ¿cuál es la carga formal del S y la del O unido con enlace sencillo?",
    [{ tipo: "num", etiqueta: "CF del S =", valor: 1 }, { tipo: "num", etiqueta: "CF del O sencillo =", valor: -1 }],
    ["CF = e⁻ de valencia − pares libres (en e⁻) − enlaces."], ["S: 6 − 2 (1 par libre) − 3 (enlaces) = +1.", "O sencillo: 6 − 6 (3 pares libres) − 1 = −1."], "S: +1; O: −1");
  op("b4", 2, "¿Qué geometría tiene el ion sulfito, SO₃²⁻?", "Geometría", ["pirámide trigonal", "trigonal plana", "tetraédrica", "angular"], 0,
    ["Calcula los pares del S: V = 6 + 18 + 2 = 26."], ["13 pares: 3 enlaces S–O + 10 libres → 9 en los O y 1 en el S.", "AX₃E → pirámide trigonal (≠ SO₃, que es plana)."], "Pirámide trigonal");
  op("b5", 2, "Las hibridaciones del átomo central en NH₃ y en BF₃ son, respectivamente:", "Hibridaciones", ["sp³ y sp²", "sp² y sp³", "sp³ y sp³", "sp y sp²"], 0,
    ["Cuenta los dominios de cada átomo central."], ["NH₃: 3 enlaces + 1 par libre = 4 → sp³.", "BF₃: 3 enlaces, sin pares libres = 3 → sp²."], "sp³ y sp²");
  nu("b6", 2, "Estima ΔH (kJ) de H₂(g) + Cl₂(g) → 2 HCl(g) con E(H–H) = 436; E(Cl–Cl) = 243; E(H–Cl) = 431 kJ/mol.", "ΔH (kJ) =", -183,
    ["Rotos − formados."], ["Rotos: 436 + 243 = 679 kJ.", "Formados: 2 · 431 = 862 kJ.", "ΔH ≈ 679 − 862 = −183 kJ (exotérmica)."], "−183 kJ");
  nu("b7", 2, "Estima ΔH (kJ) de la combustión del hidrógeno, 2 H₂(g) + O₂(g) → 2 H₂O(g), con E(H–H) = 436; E(O=O) = 498; E(O–H) = 463 kJ/mol.", "ΔH (kJ) =", -482,
    ["Cada H₂O tiene dos enlaces O–H."], ["Rotos: 2 · 436 + 498 = 1370 kJ.", "Formados: 4 · 463 = 1852 kJ (2 H₂O, 2 enlaces O–H cada una).", "ΔH ≈ 1370 − 1852 = −482 kJ."], "−482 kJ");
  nu("b8", 2, "Calcula la energía reticular del NaF (kJ/mol) con: ΔH<sub>sub</sub>(Na) = 107; EI(Na) = 496; ½E(F–F) = 79; AE(F) = −328; ΔH<sub>f</sub>(NaF) = −574.", "U (kJ/mol) =", 928,
    ["U = sub + EI + ½E + AE − ΔHf."], ["107 + 496 + 79 − 328 = 354 kJ/mol.", "U = 354 − (−574) = 928 kJ/mol."], "928 kJ/mol");
  nu("b9", 2, "Calcula la entalpía de formación del LiF(s) (kJ/mol) con: ΔH<sub>sub</sub>(Li) = 159; EI(Li) = 520; ½E(F–F) = 79; AE(F) = −328; U = 1047 kJ/mol.", "ΔH<sub>f</sub> (kJ/mol) =", -617,
    ["ΔHf = sub + EI + ½E + AE − U."], ["159 + 520 + 79 − 328 = 430 kJ/mol.", "ΔHf = 430 − 1047 = −617 kJ/mol."], "−617 kJ/mol");
  op("b10", 2, "Ordena por punto de ebullición creciente: CH₃OH, CH₃Cl, CH₄.", "Orden", ["CH₄ &lt; CH₃Cl &lt; CH₃OH", "CH₃OH &lt; CH₃Cl &lt; CH₄", "CH₃Cl &lt; CH₄ &lt; CH₃OH", "CH₄ &lt; CH₃OH &lt; CH₃Cl"], 0,
    ["Mira el tipo de fuerza de cada una."], ["CH₄: apolar (dispersión). CH₃Cl: polar (dipolo–dipolo). CH₃OH: puentes de H.", "T<sub>eb</sub>: −162 &lt; −24 &lt; 65 °C."], "CH₄ &lt; CH₃Cl &lt; CH₃OH");
  nu("b11", 2, "Con los radios Mg²⁺ 72 pm, O²⁻ 140 pm, Na⁺ 102 pm y Cl⁻ 181 pm, estima cuántas veces es mayor la energía reticular del MgO que la del NaCl, suponiendo U ∝ q₊q₋/(r₊ + r₋).", "U(MgO)/U(NaCl) ≈", 5.34,
    ["Divide los dos cocientes carga/distancia."], ["MgO: 4 / (72 + 140) = 4/212.", "NaCl: 1 / (102 + 181) = 1/283.", "Cociente: (4/212) / (1/283) = 4 · 283/212 ≈ 5,34 (valor real: 3791/787 = 4,8)."], "≈ 5,3 veces", 0.01);
  op("b12", 2, "Compara CCl₄ y CHCl₃:", "Polaridad", ["CCl₄ es apolar y CHCl₃ polar", "ambos son apolares", "ambos son polares", "CCl₄ es polar y CHCl₃ apolar"], 0,
    ["Los dos son tetraédricos. ¿Se anulan los dipolos?"], ["CCl₄: cuatro enlaces C–Cl iguales en tetraedro → suma nula.", "CHCl₃: el enlace C–H es distinto de los C–Cl: no se anulan → polar."], "CCl₄ apolar; CHCl₃ polar");
  ge("b13", 2, "Para el propeno, CH₃–CH=CH₂, indica el número de enlaces σ y de enlaces π.",
    { tipo: "lista", etiqueta: "σ y π =", valores: [8, 1] },
    ["Cuenta C–H y C–C aparte."], ["C–H: 3 + 1 + 2 = 6 (todos σ). C–C: 1 σ. C=C: 1 σ + 1 π.", "Total: 6 + 1 + 1 = 8 σ y 1 π."], "8 σ y 1 π");
  op("b14", 2, "El grafito conduce la electricidad porque…", "Motivo", ["cada C usa 3 e⁻ en enlaces σ y el cuarto está deslocalizado en la capa", "es un metal", "tiene iones libres", "tiene electrones libres entre capas por enlaces iónicos"], 0,
    ["Recuerda la hibridación del carbono en el grafito."], ["Cada C sp² forma 3 σ; el p restante forma una nube π deslocalizada sobre la capa.", "Esos electrones se mueven: conducción en el plano de la capa."], "Electrones π deslocalizados");
  nu("b15", 2, "¿Cuál es el orden de enlace de cada enlace C–O en el ion carbonato (3 formas resonantes equivalentes)?", "Orden de enlace =", 1.333,
    ["Cada forma tiene un C=O (2) y dos C–O (1): promedia."], ["En total hay 4 «unidades» de enlace repartidas en 3 enlaces C–O.", "Orden = (2 + 1 + 1)/3 = 4/3 ≈ 1,33."], "4/3 ≈ 1,33");
  nu("b16", 2, "¿Qué energía (kJ) hace falta para disociar en átomos 1,0 g de H₂ (E(H–H) = 436 kJ/mol; M(H₂) = 2,016 g/mol)?", "E (kJ) =", 216.3,
    ["Pasa los gramos a moles."], ["n = 1,0 / 2,016 = 0,496 mol.", "E = 0,496 · 436 = 216 kJ."], "≈ 216 kJ");

  // ---------------- ★★★ ----------------
  nu("c1", 3, "Calcula la energía reticular del MgO (kJ/mol): ΔH<sub>sub</sub>(Mg) = 148; EI₁(Mg) = 738; EI₂(Mg) = 1451; ½E(O=O) = 249; AE₁(O) = −141; AE₂(O) = +744; ΔH<sub>f</sub>(MgO) = −602.", "U (kJ/mol) =", 3791,
    ["Suma las dos ionizaciones y las dos afinidades (la segunda es positiva)."], ["148 + (738 + 1451) + 249 + (−141 + 744) = 148 + 2189 + 249 + 603 = 3189 kJ/mol.", "U = 3189 − (−602) = 3791 kJ/mol."], "3791 kJ/mol");
  nu("c2", 3, "Calcula la energía reticular del CaCl₂ (kJ/mol): ΔH<sub>sub</sub>(Ca) = 178; EI₁ = 590; EI₂ = 1145; E(Cl–Cl) = 243; AE(Cl) = −349; ΔH<sub>f</sub>(CaCl₂) = −795.", "U (kJ/mol) =", 2253,
    ["Hay dos Cl: un mol de Cl₂ completo y dos afinidades."], ["178 + (590 + 1145) + 243 + 2 · (−349) = 178 + 1735 + 243 − 698 = 1458.", "U = 1458 + 795 = 2253 kJ/mol."], "2253 kJ/mol");
  nu("c3", 3, "A partir de la energía reticular del NaCl (U = 787 kJ/mol), ΔH<sub>f</sub>(NaCl) = −411, ΔH<sub>sub</sub>(Na) = 107, EI(Na) = 496 y E(Cl–Cl) = 243 kJ/mol, calcula la afinidad electrónica del cloro (kJ/mol).", "AE (kJ/mol) =", -348.5,
    ["Despeja AE en ΔHf = sub + EI + ½E + AE − U."], ["AE = ΔH<sub>f</sub> + U − sub − EI − ½E.", "AE = −411 + 787 − 107 − 496 − 121,5 = −348,5 kJ/mol (negativo: se libera)."], "≈ −349 kJ/mol");
  ge("c4", 3, "(a) Dibuja la estructura de Lewis del SO₂ y del CO₂. (b) Justifica su geometría. (c) Explica por qué el SO₂ es polar y el CO₂ no.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
      { t: "(a) SO₂: V = 18 e⁻; S con un par libre, un S=O y un S–O (resonancia). CO₂: V = 16; O=C=O con dos pares libres en cada O", p: 0.25 },
      { t: "(b) SO₂: 3 dominios en el S (2 enlaces + 1 par libre), AX₂E → angular (≈ 119°)", p: 0.25 },
      { t: "(b) CO₂: 2 dominios en el C (AX₂) → lineal, 180°", p: 0.2 },
      { t: "(c) En el CO₂ los dos dipolos C=O son opuestos y se anulan: apolar; en el SO₂ la forma angular hace que los dipolos S=O se sumen: polar", p: 0.3 }] },
    ["Recuento de electrones y número de dominios del átomo central."],
    ["SO₂: AX₂E, angular, polar (μ = 1,63 D). CO₂: AX₂, lineal, apolar (μ = 0).", "La diferencia es el par libre del S."], "SO₂ angular y polar; CO₂ lineal y apolar");
  ge("c5", 3, "El H₂O hierve a 100 °C y el H₂S, de mayor masa molecular, a −60 °C. Justifícalo.",
    { tipo: "rubrica", etiqueta: "Tu justificación", filas: 5, items: [
      { t: "Ambas moléculas son angulares y polares", p: 0.15 },
      { t: "El O es muy electronegativo y pequeño, y el H unido a O es atraído por un par libre del O de otra molécula: puente de hidrógeno", p: 0.4 },
      { t: "El S es menos electronegativo y mayor: no forma puentes de H; solo dispersión y dipolo–dipolo, más débiles", p: 0.3 },
      { t: "Hervir exige vencer las fuerzas intermoleculares: las del agua son mucho mayores, y por eso su T<sub>eb</sub> es más alta pese a la menor masa", p: 0.15 }] },
    ["Mira el tipo de fuerza intermolecular más fuerte de cada una."],
    ["Agua: dispersión + dipolo–dipolo + puentes de H.", "H₂S: dispersión + dipolo–dipolo (débil)."], "Puentes de hidrógeno en el agua");
  ge("c6", 3, "Ordena por punto de fusión creciente LiF, NaCl y MgO y justifica la ordenación.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
      { t: "Los tres son sólidos iónicos: al fundir se vencen las atracciones de la red; T<sub>f</sub> crece con la energía reticular U", p: 0.2 },
      { t: "U ∝ q₊q₋/(r₊ + r₋): MgO tiene cargas 2+ y 2− (producto 4) y distancia pequeña (≈ 212 pm): mayor U", p: 0.3 },
      { t: "LiF (r₊ + r₋ ≈ 209 pm) y NaCl (≈ 283 pm) tienen carga 1·1: LiF tiene iones más pequeños, mayor U que el NaCl", p: 0.3 },
      { t: "Orden: NaCl &lt; LiF &lt; MgO (801 &lt; 845 &lt; 2852 °C)", p: 0.2 }] },
    ["Compara cargas primero, tamaño después."],
    ["q₊q₋: MgO = 4; LiF y NaCl = 1.", "Misma carga: menor d en LiF (209 pm) que en NaCl (283 pm)."], "NaCl &lt; LiF &lt; MgO");
  nu("c7", 3, "Estima ΔH (kJ) de la hidrogenación del eteno, C₂H₄(g) + H₂(g) → C₂H₆(g), con E(C=C) = 614; E(H–H) = 436; E(C–C) = 347; E(C–H) = 413 kJ/mol.", "ΔH (kJ) =", -123,
    ["Rotos: C=C y H–H. Formados: C–C y 2 C–H."], ["Rotos: 614 + 436 = 1050 kJ.", "Formados: 347 + 2 · 413 = 1173 kJ.", "ΔH ≈ 1050 − 1173 = −123 kJ (experimental ≈ −137): favorable, porque un π débil se cambia por dos σ fuertes."], "−123 kJ");
  op("c8", 3, "El ion clorato, ClO₃⁻, tiene geometría y hibridación del Cl:", "Geometría e hibridación", ["pirámide trigonal; sp³", "trigonal plana; sp²", "tetraédrica; sp³", "angular; sp²"], 0,
    ["V = 7 + 18 + 1 = 26 e⁻ (13 pares)."], ["3 enlaces Cl–O y 1 par libre en el Cl (3 + 1 = 4 dominios).", "AX₃E: pirámide trigonal; 4 dominios → sp³."], "Pirámide trigonal; sp³");
  nu("c9", 3, "Con la estimación ΔH = −802 kJ/mol, ¿cuánta energía (kJ) se libera al quemar 8,0 g de metano? (M(CH₄) = 16 g/mol)", "Energía (kJ) =", 401,
    ["Gramos → moles → kJ."], ["n = 8,0 / 16 = 0,50 mol.", "E = 0,50 · 802 = 401 kJ liberados."], "401 kJ");
  ge("c10", 3, "Justifica por qué el BF₃ es apolar y el NF₃ polar, aunque ambas moléculas tienen un átomo central unido a tres átomos de flúor.",
    { tipo: "rubrica", etiqueta: "Tu justificación", filas: 5, items: [
      { t: "BF₃: B sin pares libres, 3 dominios (AX₃) → trigonal plana, 120°", p: 0.3 },
      { t: "NF₃: N con un par libre, 4 dominios (AX₃E) → pirámide trigonal", p: 0.3 },
      { t: "Los tres dipolos B–F, a 120°, en un plano, se anulan: apolar", p: 0.2 },
      { t: "En el NF₃ los dipolos N–F forman una pirámide: su suma no es cero: polar", p: 0.2 }] },
    ["Cuenta los pares libres del átomo central."],
    ["B: 3 e⁻ de valencia → 3 enlaces, ningún par libre. N: 5 e⁻ → 3 enlaces + 1 par libre."], "La diferencia está en el par libre del N");
  ge("c11", 3, "Para el propino, CH₃–C≡CH, indica el número de enlaces σ y π.",
    { tipo: "lista", etiqueta: "σ y π =", valores: [6, 2] },
    ["Cuenta C–H (4) y los enlaces entre carbonos."], ["C–H: 3 + 1 = 4 σ. C–C: 1 σ. C≡C: 1 σ + 2 π.", "Total: 4 + 1 + 1 = 6 σ y 2 π. Hibridación: CH₃ sp³; los dos carbonos del triple enlace sp."], "6 σ y 2 π");
  op("c12", 3, "Un sólido funde a 1085 °C, conduce la electricidad en estado sólido, es maleable y no se disuelve en agua ni en hexano. Es…", "Tipo de sólido", ["metálico", "iónico", "covalente en red", "molecular polar"], 0,
    ["¿Qué sólido conduce sin fundir?"], ["Conduce en sólido y es maleable: electrones deslocalizados que dejan deslizar los planos.", "Es un metal (p. ej. cobre, T<sub>f</sub> = 1085 °C)."], "Metálico");
  ge("c13", 3, "Para el ion nitrato, NO₃⁻: calcula el número de electrones de valencia y la carga formal del N en la estructura con un enlace doble N=O y dos sencillos.",
    [{ tipo: "num", etiqueta: "Electrones de valencia =", valor: 24 }, { tipo: "num", etiqueta: "CF del N =", valor: 1 }],
    ["V = 5 + 18 + 1."], ["V = 5 + 3 · 6 + 1 = 24 e⁻.", "N con 3 σ + 1 π = 4 enlaces y ningún par libre: CF = 5 − 0 − 4 = +1 (los dos O sencillos tienen −1 y el doble 0: total −1)."], "24 e⁻; CF(N) = +1");
  ge("c14", 3, "El ángulo H–N–H del NH₃ es 107° y el H–P–H del PH₃ es 93°. Explica la tendencia y compárala con el ángulo ideal.",
    { tipo: "rubrica", etiqueta: "Tu explicación", filas: 5, items: [
      { t: "Ambas son AX₃E (pirámide trigonal); el ideal de 4 dominios es 109,5°", p: 0.25 },
      { t: "El par libre repele más que un par de enlace y cierra el ángulo: 107° en el NH₃", p: 0.3 },
      { t: "En el PH₃ el átomo central es mayor y el enlace P–H más largo: los pares de enlace están más lejos entre sí y se repelen menos", p: 0.3 },
      { t: "Por eso el par libre pesa más y el ángulo se acerca a 90° (93°)", p: 0.15 }] },
    ["Compara el tamaño del N y del P."],
    ["Los dos tienen 3 enlaces y 1 par libre.", "En el P, los enlaces son más largos y la repulsión de pares de enlace menor."], "El ángulo se cierra al bajar en el grupo");
  nu("c15", 3, "¿Qué energía (kJ) hay que aportar para separar en iones gaseosos 11,7 g de NaCl(s)? (U = 787 kJ/mol; M(NaCl) = 58,5 g/mol)", "Energía (kJ) =", 157.4,
    ["La energía reticular es por mol de NaCl."], ["n = 11,7 / 58,5 = 0,200 mol.", "E = 0,200 · 787 = 157,4 kJ.", "Es la energía para romper el cristal en Na⁺(g) y Cl⁻(g); una cantidad muy grande, por eso las sales funden a temperaturas altas."], "157 kJ");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Geometría, hibridación y polaridad de un vistazo",
      tabla: { cab: ["Notación", "Geometría", "Ángulo", "Hib.", "Ejemplo"], filas: [
        ["AX₂", "lineal", "180°", "sp", "CO₂, BeCl₂, C₂H₂"],
        ["AX₃", "trigonal plana", "120°", "sp²", "BF₃, SO₃, C₂H₄"],
        ["AX₂E", "angular", "&lt; 120°", "sp²", "SO₂, O₃"],
        ["AX₄", "tetraédrica", "109,5°", "sp³", "CH₄, CCl₄, NH₄⁺"],
        ["AX₃E", "pirámide trigonal", "≈ 107°", "sp³", "NH₃, PCl₃"],
        ["AX₂E₂", "angular", "≈ 104,5°", "sp³", "H₂O, H₂S"]
      ] },
      nota: "Simétrica con sustituyentes iguales (CO₂, BF₃, CH₄, CCl₄) → apolar. Con par libre (NH₃, H₂O, SO₂) → polar." },
    { titulo: "Lewis: método de recuento",
      pasos: ["<b>V</b> = Σ e⁻ de valencia (+ carga negativa, − carga positiva).", "<b>Esqueleto</b>: central = menos electronegativo (no H); enlaces sencillos.", "<b>Enlaces</b> = (8n − V)/2 (H cuenta 2); añade dobles/triples si faltan.", "<b>Pares libres</b> = (2V − 8n)/2, hasta octetos.", "<b>Cargas formales</b>: valencia − libres − enlaces; su suma = carga del ion.", "<b>Resonancia</b> si hay varias estructuras equivalentes."],
      nota: "Excepciones: octeto incompleto (Be, B), expandido (periodo 3 en adelante) y radicales (impares)." },
    { titulo: "Energía reticular y Born–Haber",
      items: [
        { label: "Energía reticular", formula: "U ∝ q₊·q₋ / (r₊ + r₋)", cuando: "Compara sólidos iónicos: manda la carga, luego el tamaño.", ejemplo: "MgO 3791 &gt; LiF 1036 &gt; NaCl 787 kJ/mol." },
        { label: "Ciclo de Born–Haber", formula: "ΔH<sub>f</sub> = ΔH<sub>sub</sub> + EI + ½E + AE − U", cuando: "Calcular U (por Hess) o ΔHf.", ejemplo: "NaCl: 107 + 496 + 121,5 − 349 + 411 = 787.", ojo: "½E por cada átomo de halógeno; todas las EI y AE necesarias." },
        { label: "Energías de enlace", formula: "ΔH ≈ Σ E(rotos) − Σ E(formados)", cuando: "Reacciones en fase gaseosa.", ejemplo: "CH₄ + 2 O₂ → CO₂ + 2 H₂O: 2648 − 3450 = −802 kJ." }
      ],
      nota: "Más orden de enlace = más corto y más fuerte (C–C 347, C=C 614, C≡C 839 kJ/mol)." },
    { titulo: "Propiedades según el tipo de sustancia", ancha: true,
      tabla: { cab: ["Tipo", "Fundir exige…", "T<sub>f</sub>", "Conduce", "Ejemplo"], filas: [
        ["Iónica", "vencer atracciones iónicas", "alta", "fundida/disuelta", "NaCl, MgO"],
        ["Molecular", "vencer fuerzas intermoleculares", "baja", "no", "H₂O, I₂, CO₂"],
        ["Red covalente", "romper enlaces covalentes", "muy alta", "no (grafito sí)", "diamante, SiO₂"],
        ["Metálica", "vencer el enlace metálico", "variable", "sí (sólido y líquido)", "Fe, Cu, Na"]
      ] },
      nota: "Fuerzas intermoleculares: dispersión (todas; crece con el tamaño) &lt; dipolo–dipolo &lt; puente de H (H–F, O, N)." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "El agua es tetraédrica", bien: "Los pares son tetraédricos; la molécula es angular", por: "La geometría molecular solo cuenta átomos." },
        { mal: "CO₂ polar porque C=O es polar", bien: "CO₂ apolar (lineal, dipolos opuestos)", por: "Enlace polar ≠ molécula polar." },
        { mal: "CO₃²⁻ tiene 22 e⁻", bien: "24 e⁻ (suma la carga 2−)", por: "Anión: se suman; catión: se restan." },
        { mal: "Hervir el agua rompe O–H", bien: "Rompe puentes de H", por: "El enlace O–H sigue en el vapor." },
        { mal: "Comparar iónicos solo por tamaño", bien: "Primero la carga, luego el tamaño", por: "U ∝ q₊q₋/d." },
        { mal: "Born–Haber: sumar 243 por un Cl", bien: "½ · 243 por cada átomo de Cl", por: "Solo se forma un Cl por NaCl." },
        { mal: "Doble enlace = dos sencillos", bien: "1 σ + 1 π (el π es más débil)", por: "614 &lt; 2 · 347 kJ/mol." }
      ] }
  ];

  B.registrar("quimica2", "t4", { resumen: resumen, secciones: B.parte.q2t4a.secciones, nuevas: B.parte.q2t4b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
