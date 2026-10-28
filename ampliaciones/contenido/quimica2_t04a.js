/* ============================================================
   Química II · ampliaciones · Tema 4: Enlace químico
   (parte A: se añade al final de las secciones originales 1 a 5)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "quimica2/t4/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  B.parte = B.parte || {};
  var secciones = {};

  // ---------------------------------------------------------------- 1. Repaso: tipos de enlace
  secciones[0] = env(
    "<h5>Por qué se unen los átomos</h5>" +
    "<p>Dos átomos se enlazan cuando, al juntarse, el conjunto tiene <b>menos energía</b> que los átomos por separado. A la distancia de enlace, la atracción entre los núcleos y los electrones compensa la repulsión entre los núcleos y entre los electrones: ese equilibrio es el mínimo de energía del enlace. El modelo más sencillo para predecir cómo se enlazan es la <b>regla del octeto</b>: los átomos tienden a quedar con 8 electrones en su capa de valencia (2 en el caso del H y el He), la configuración de un gas noble. Solo intervienen los <b>electrones de valencia</b>, los de la capa más externa (Tema 3).</p>" +
    "<h5>Los tres tipos de enlace</h5>" +
    "<p>Según los elementos que se combinan, el octeto se alcanza de tres maneras:</p>" +
    tabla(["Enlace", "¿Quién se combina?", "¿Qué hacen los electrones?", "Ejemplo"], [
      ["Iónico", "metal + no metal (Δχ grande)", "se <b>transfieren</b>: el metal da electrones al no metal y se forman iones que se atraen", "NaCl, MgO, CaF₂"],
      ["Covalente", "no metal + no metal", "se <b>comparten</b> pares de electrones", "H₂O, CO₂, CH₄, N₂"],
      ["Metálico", "metal + metal", "los electrones de valencia se <b>deslocalizan</b> por todo el metal", "Fe, Cu, Na, latón"]
    ], "q3t") +
    "<h5>La electronegatividad dice cuánto se comparte</h5>" +
    "<p>La diferencia de electronegatividad Δχ entre los dos átomos (Tema 3) es la guía más rápida: con Δχ ≈ 0 el par se reparte por igual (<b>covalente apolar</b>, como en Cl₂ o H₂); con Δχ intermedia el par queda más cerca del átomo más electronegativo (<b>covalente polar</b>, como en HCl); con Δχ grande la transferencia es casi completa (<b>iónico</b>). No hay una frontera nítida: es un continuo. Como regla orientativa, Δχ &gt; 1,7–2 se trata como iónico y Δχ &lt; 0,4 como apolar; pero el criterio decisivo en el examen es la <b>naturaleza de los elementos</b> (metal/no metal) y el comportamiento de la sustancia.</p>" +
    w("q2_deltaen") +
    ejemplo("Ejemplo resuelto: clasificar el enlace", "Clasifica el enlace en NaCl, MgO, HF y O₂ a partir de las electronegatividades (χ: Na 0,93; Mg 1,31; O 3,44; H 2,20; F 3,98; Cl 3,16).", [
      "NaCl: Δχ = 3,16 − 0,93 = <b>2,23</b>; metal + no metal → <b>iónico</b>.",
      "MgO: Δχ = 3,44 − 1,31 = <b>2,13</b>; metal + no metal → <b>iónico</b>.",
      "HF: Δχ = 3,98 − 2,20 = <b>1,78</b>. Es no metal + no metal: es <b>covalente muy polar</b>, aunque Δχ supere 1,7. (Por eso Δχ es una guía, no una ley.)",
      "O₂: Δχ = 0; dos átomos iguales comparten el par por igual → <b>covalente apolar</b> (doble enlace)."
    ]) +
    "<h5>Un cuarto caso: el enlace covalente coordinado (dativo)</h5>" +
    "<p>En un enlace covalente normal cada átomo aporta un electrón al par compartido. En el <b>enlace coordinado o dativo</b> el par lo aporta <b>un solo átomo</b>: el amoníaco, con un par libre en el N, se une a un H⁺ (sin electrones) y forma NH₄⁺. Una vez formado, los cuatro enlaces N–H son <b>idénticos</b>; el origen del par no deja huella. Lo mismo ocurre en H₃O⁺ o en el monóxido de carbono (CO).</p>" +
    ojo("«Sustancia con un metal» no siempre es iónica, ni «dos no metales» siempre molecular: el diamante o el cuarzo son no metales unidos por enlaces covalentes en una red gigante, y por eso se comportan como un sólido de punto de fusión altísimo (apartado 9).")
  );

  // ---------------------------------------------------------------- 2. Lewis
  secciones[1] = env(
    "<h5>Un método que siempre funciona: el recuento de electrones</h5>" +
    "<p>Dibujar estructuras «a ojo» falla en cuanto la molécula tiene más de tres átomos. Hay un método de recuento que da la estructura correcta casi siempre y que es lo que se espera en la EvAU:</p>" +
    "<ol>" +
    "<li><b>Electrones de valencia disponibles (V)</b>: suma los de todos los átomos; <b>suma 1 por cada carga negativa y resta 1 por cada carga positiva</b> del ion.</li>" +
    "<li><b>Esqueleto</b>: el átomo central es el menos electronegativo (nunca el H, que solo forma un enlace); los demás se colocan alrededor, unidos al central con enlaces sencillos.</li>" +
    "<li><b>Electrones necesarios (N)</b>: 8 por cada átomo (2 para el H) si todos cumplieran el octeto. Los <b>electrones compartidos</b> son N − V, y el número de <b>enlaces</b> es (N − V)/2.</li>" +
    "<li><b>Reparte</b>: si el esqueleto tiene menos enlaces de los calculados, se añaden enlaces dobles o triples; los electrones que no son de enlace, V − (N − V) = 2V − N, se colocan como <b>pares libres</b> hasta completar el octeto de cada átomo.</li>" +
    "<li><b>Cargas formales</b>: CF = (e⁻ de valencia del átomo libre) − (e⁻ de sus pares libres) − (nº de enlaces). Su suma debe ser la carga del ion.</li>" +
    "</ol>" +
    w("q2_lewis") +
    ejemplo("Ejemplo resuelto: HCN", "Dibuja la estructura de Lewis del cianuro de hidrógeno y calcula las cargas formales.", [
      "V = 1 (H) + 4 (C) + 5 (N) = <b>10 e⁻</b>. Esqueleto: H–C–N (el C, menos electronegativo y que no es H, es el central).",
      "N = 2 (H) + 8 (C) + 8 (N) = 18. Compartidos = 18 − 10 = 8 e⁻ → <b>4 enlaces</b>. El esqueleto tiene 2: faltan 2 → entre C y N hay un <b>enlace triple</b>: H–C≡N.",
      "Pares libres: 10 − 8 = 2 e⁻ = <b>1 par</b>, en el N (el N queda con 6 + 2 = 8 e⁻; el C con 8; el H con 2).",
      "CF: H = 1 − 0 − 1 = 0; C = 4 − 0 − 4 = 0; N = 5 − 2 − 3 = 0. Todas nulas: estructura correcta."
    ]) +
    ejemplo("Ejemplo resuelto: ion carbonato CO₃²⁻ (resonancia)", "Escribe las estructuras de Lewis del ion carbonato y explica por qué los tres enlaces C–O son iguales.", [
      "V = 4 (C) + 3·6 (O) + 2 (carga) = <b>24 e⁻</b>. Esqueleto: C en el centro con tres O.",
      "N = 4·8 = 32; compartidos = 32 − 24 = 8 → <b>4 enlaces</b>. El esqueleto tiene 3: falta 1 → <b>un doble enlace</b> C=O.",
      "Pares libres: (24 − 8)/2 = <b>8 pares</b>: 2 en el O del doble enlace y 3 en cada uno de los otros dos O.",
      "CF: C = 4 − 0 − 4 = 0; O (=) = 6 − 4 − 2 = 0; cada O (–) = 6 − 6 − 1 = <b>−1</b>. Suma: 0 + 0 − 1 − 1 = −2 ✓.",
      "El doble enlace puede estar en cualquiera de los tres O: hay <b>3 formas resonantes</b> equivalentes. La estructura real es un <b>híbrido</b> de las tres (no un cambio rápido de una a otra): los tres enlaces C–O son iguales, de orden 4/3 ≈ 1,33 y de longitud intermedia (≈ 129 pm, entre C–O 143 y C=O 122), y cada O soporta −2/3."
    ]) +
    ejemplo("Ejemplo resuelto: dióxido de azufre SO₂", "Estructura de Lewis, cargas formales y resonancia del SO₂.", [
      "V = 6 + 2·6 = <b>18 e⁻</b>. Esqueleto: O–S–O. N = 3·8 = 24; compartidos = 6 → <b>3 enlaces</b>: falta 1 → un doble enlace S=O y un sencillo S–O.",
      "Pares libres: (18 − 6)/2 = 6 pares: 1 en el S, 2 en el O del doble enlace y 3 en el O del enlace sencillo.",
      "CF: S = 6 − 2 − 3 = <b>+1</b>; O (=) = 6 − 4 − 2 = 0; O (–) = 6 − 6 − 1 = <b>−1</b>. Suma 0 ✓.",
      "Hay <b>dos formas resonantes</b> (el doble enlace puede estar en cualquiera de los dos O): ambos enlaces S–O son iguales (orden 1,5)."
    ]) +
    "<h5>Cargas formales: qué estructura es mejor</h5>" +
    "<p>Cuando hay varias estructuras posibles, es preferible la que tiene <b>cargas formales más pequeñas</b> (idealmente todas 0), y si hay cargas, la <b>negativa sobre el átomo más electronegativo</b>. La carga formal no es la carga real de los átomos: es un recurso contable para decidir entre estructuras. En los oxoaniones del periodo 3 (SO₄²⁻, PO₄³⁻, ClO₄⁻) se pueden dibujar con todo enlaces sencillos (S +2, cada O −1) o con dobles enlaces (S 0): ambas se aceptan en bachillerato; las dobles dan cargas formales menores, pero implican 12 electrones alrededor del S.</p>" +
    "<h5>Cuando el octeto no se cumple</h5>" +
    "<ul>" +
    "<li><b>Octeto incompleto</b>: BeCl₂ (4 e⁻ en el Be) y BF₃ o BH₃ (6 e⁻ en el B). Son moléculas deficientes en electrones, muy ávidas de un par: el BF₃ se une al NH₃ con un enlace dativo (F₃B←NH₃).</li>" +
    "<li><b>Octeto expandido</b>: elementos del periodo 3 o posterior pueden rodearse de más de 8 e⁻: PCl₅ (10), SF₆ (12), SF₄ (10). En el bachillerato se atribuye a la disponibilidad de orbitales 3d vacíos. <b>Los del periodo 2 nunca</b>: el N forma NF₃ pero no NF₅.</li>" +
    "<li><b>Número impar de electrones (radicales)</b>: NO (11 e⁻), NO₂ (17 e⁻): un electrón queda desapareado. Son muy reactivos y paramagnéticos.</li>" +
    "</ul>" +
    ojo("Un fallo muy repetido: contar «6 + 6 = 12» como si cada O aportara 6 y olvidar la <b>carga del ion</b>. El carbonato tiene 24 electrones, no 22. Y el N del NO₃⁻ no puede tener 10 e⁻ (periodo 2): en el nitrato aparece un enlace dativo/carga formal +1 sobre el N, nunca un octeto expandido.")
  );

  // ---------------------------------------------------------------- 3. TRPECV
  secciones[2] = env(
    "<h5>Cómo se aplica el modelo</h5>" +
    "<p>La TRPECV (en inglés VSEPR) dice que los pares de electrones de la capa de valencia del <b>átomo central</b> se colocan lo más separados posible. Procedimiento:</p>" +
    "<ol>" +
    "<li>Escribe la estructura de Lewis.</li>" +
    "<li>Cuenta los <b>dominios de electrones</b> alrededor del átomo central: cada <b>enlace cuenta como uno, sea sencillo, doble o triple</b>, y cada <b>par libre</b> como uno. Es lo que se llama <b>número estérico</b>.</li>" +
    "<li>El número estérico da la <b>disposición de los pares</b>: 2 lineal · 3 trigonal plana · 4 tetraédrica · 5 bipirámide trigonal · 6 octaédrica.</li>" +
    "<li>La <b>geometría molecular</b> describe solo la posición de los <b>átomos</b>, no la de los pares libres.</li>" +
    "</ol>" +
    tabla(["Notación", "Enlaces + libres", "Disposición de pares", "Geometría molecular", "Ángulo", "Ejemplos"], [
      ["AX₂", "2 + 0", "lineal", "lineal", "180°", "BeCl₂, CO₂, HCN, C₂H₂"],
      ["AX₃", "3 + 0", "trigonal plana", "trigonal plana", "120°", "BF₃, SO₃, CO₃²⁻, C₂H₄"],
      ["AX₂E", "2 + 1", "trigonal plana", "angular", "&lt; 120° (SO₂ ≈ 119°)", "SO₂, O₃"],
      ["AX₄", "4 + 0", "tetraédrica", "tetraédrica", "109,5°", "CH₄, CCl₄, NH₄⁺, SO₄²⁻"],
      ["AX₃E", "3 + 1", "tetraédrica", "pirámide trigonal", "≈ 107° (NH₃)", "NH₃, PCl₃, H₃O⁺, SO₃²⁻"],
      ["AX₂E₂", "2 + 2", "tetraédrica", "angular", "≈ 104,5° (H₂O)", "H₂O, H₂S, OF₂"]
    ], "q3t") +
    w("q2_vsepr") +
    "<h5>Por qué los ángulos no son exactamente los ideales</h5>" +
    "<p>Un <b>par libre</b> está sujeto a un solo núcleo y se extiende más en el espacio que un par de enlace (que está «estirado» entre dos núcleos). Ocupa más sitio y empuja a los pares de enlace hacia el resto. La jerarquía de repulsión es:</p>" +
    "<div class='formula-wrap'><div class='formula'>par libre–par libre &gt; par libre–par de enlace &gt; par de enlace–par de enlace</div></div>" +
    "<p>Por eso en la serie de pares tetraédricos el ángulo se cierra con cada par libre: <b>CH₄ 109,5° → NH₃ 107° → H₂O 104,5°</b>. Del mismo modo, en una molécula AX₃ un enlace doble ocupa algo más de sitio que uno sencillo: en el eteno el ángulo H–C–H (≈ 117°) es menor que 120° y el H–C=C mayor (≈ 121°).</p>" +
    w("q4_angulos") +
    ejemplo("Ejemplo resuelto: geometría de cuatro especies", "Determina la geometría de PCl₃, SO₃, SO₃²⁻ y NH₄⁺.", [
      "<b>PCl₃</b>: V = 5 + 21 = 26 e⁻ → 13 pares; 3 enlaces P–Cl, cada Cl con 3 pares libres (9) y 1 par libre en el P. Notación <b>AX₃E</b>: 4 dominios → pares tetraédricos → <b>pirámide trigonal</b>, ángulo algo menor de 109,5° (≈ 100°).",
      "<b>SO₃</b>: V = 6 + 18 = 24 e⁻. Con tres dobles enlaces S=O (cargas formales 0) el S no tiene pares libres: <b>AX₃</b> → <b>trigonal plana</b>, 120°.",
      "<b>SO₃²⁻</b>: V = 6 + 18 + 2 = 26 e⁻. Tres enlaces S–O y un par libre en el S: <b>AX₃E</b> → <b>pirámide trigonal</b>. Fíjate: SO₃ (plana) y SO₃²⁻ (piramidal) tienen la misma proporción átomo a átomo, pero el par libre cambia la forma.",
      "<b>NH₄⁺</b>: V = 5 + 4 − 1 = 8 e⁻ → 4 enlaces N–H sin pares libres: <b>AX₄</b> → <b>tetraédrica</b>, 109,5°."
    ]) +
    "<h5>Ampliación: cinco y seis dominios</h5>" +
    "<p>Con elementos del periodo 3 o posterior aparecen estructuras con 5 o 6 dominios, que raramente se piden pero se resuelven con la misma lógica: AX₅ bipirámide trigonal (PCl₅, ángulos 90° y 120°) · AX₄E balancín (SF₄) · AX₃E₂ forma de T (ClF₃) · AX₂E₃ lineal (XeF₂) · AX₆ octaédrica (SF₆, 90°) · AX₅E pirámide cuadrada (BrF₅) · AX₄E₂ plana cuadrada (XeF₄). Los pares libres se colocan primero en las posiciones ecuatoriales de la bipirámide, donde tienen más espacio, y en posiciones opuestas en el octaedro.</p>" +
    ojo("«La geometría del agua es tetraédrica» es un error: <b>los pares</b> se disponen en tetraedro, pero la molécula (los átomos) es <b>angular</b>. Y el ángulo de 109,5° solo vale cuando los cuatro dominios son iguales (CH₄, CCl₄, NH₄⁺).")
  );

  // ---------------------------------------------------------------- 4. Hibridación
  secciones[3] = env(
    "<h5>Por qué hace falta la hibridación</h5>" +
    "<p>La configuración del carbono, 2s² 2p², parece indicar solo dos enlaces (los dos electrones p desapareados). Sin embargo el carbono forma cuatro enlaces idénticos en el metano, a 109,5°. La explicación: el átomo <b>promociona</b> un electrón 2s a un 2p (cuesta algo de energía), obtiene 4 electrones desapareados, y los orbitales 2s y 2p se <b>mezclan</b> (hibridan) en orbitales nuevos, todos iguales y dirigidos según la geometría que pide la TRPECV. La energía que se gana al formar cuatro enlaces compensa de sobra la que cuesta promocionar.</p>" +
    tabla(["Hibridación", "Orbitales mezclados", "Orbitales híbridos", "Orbitales p puros", "Geometría", "Ángulo"], [
      ["sp³", "1 s + 3 p", "4", "0", "tetraédrica", "109,5°"],
      ["sp²", "1 s + 2 p", "3", "1", "trigonal plana", "120°"],
      ["sp", "1 s + 1 p", "2", "2", "lineal", "180°"]
    ], "q3t") +
    "<p>Se cumple siempre: <b>nº de orbitales híbridos = nº de dominios de electrones (número estérico)</b> = enlaces σ + pares libres del átomo. Con 4 dominios: sp³; con 3: sp²; con 2: sp. Esto sirve también para N y O: en el NH₃ (3 enlaces + 1 par libre) el N es sp³, y en el H₂O el O es sp³; el par libre ocupa un orbital híbrido.</p>" +
    "<h5>Enlaces σ y enlaces π</h5>" +
    "<ul>" +
    "<li><b>σ (sigma)</b>: solapamiento <b>frontal</b> de orbitales a lo largo del eje que une los núcleos. Es el primer enlace entre dos átomos y es el más fuerte; lo forman los orbitales híbridos (o el s del H).</li>" +
    "<li><b>π (pi)</b>: solapamiento <b>lateral</b> de dos orbitales p puros paralelos, por encima y por debajo del eje. Es más débil y es lo que impide la rotación libre alrededor de un doble enlace.</li>" +
    "</ul>" +
    "<p>Un enlace sencillo es 1 σ; uno doble, 1 σ + 1 π; uno triple, 1 σ + 2 π. Los orbitales p puros que sobran tras hibridar son los que forman los enlaces π: el carbono sp² tiene 1 p puro (para 1 π), el sp tiene 2 (para 2 π).</p>" +
    w("q2_hibrid") +
    ejemplo("Ejemplo resuelto: σ, π e hibridación del eteno, el etino y el HCN", "Indica cuántos enlaces σ y π hay en C₂H₄, C₂H₂ y HCN y la hibridación de cada carbono.", [
      "<b>C₂H₄</b>: H₂C=CH₂. Cada C: 2 enlaces C–H (σ) + C=C (1 σ + 1 π) → 3 σ en cada C = 3 dominios → <b>sp²</b>. Total: 4 σ(C–H) + 1 σ(C–C) = <b>5 σ</b> y <b>1 π</b>. Geometría plana, ≈ 120°.",
      "<b>C₂H₂</b>: H–C≡C–H. Cada C: 1 σ(C–H) + 1 σ(C–C) → 2 dominios → <b>sp</b>. Total: 2 + 1 = <b>3 σ</b> y <b>2 π</b>. Lineal, 180°.",
      "<b>HCN</b>: H–C≡N. El C: 1 σ(C–H) + 1 σ(C–N) → <b>sp</b>. El N: 1 σ + 1 par libre → <b>sp</b>. Total: <b>2 σ</b> y <b>2 π</b>. Lineal."
    ]) +
    ejemplo("Ejemplo resuelto: ácido etanoico CH₃COOH", "Cuenta los enlaces σ y π y asigna la hibridación a cada carbono del ácido etanoico (acético).", [
      "Estructura: CH₃–C(=O)–O–H. Enlaces: 3 C–H, 1 C–C, 1 C=O, 1 C–O, 1 O–H.",
      "σ: 3 + 1 + 1 (de C=O) + 1 + 1 = <b>7 σ</b>; π: 1 (de C=O) → <b>1 π</b>.",
      "C del CH₃: 4 enlaces σ → <b>sp³</b> (tetraédrico). C del grupo carboxilo: 3 enlaces σ (C–C, C=O, C–O) y 1 π → <b>sp²</b> (plano, 120°). El O del –OH tiene 2 σ + 2 pares libres → sp³ (angular)."
    ]) +
    ojo("«Un doble enlace son dos enlaces iguales»: no. Es un σ y un π, y el π es más débil. Por eso la energía del C=C (614 kJ/mol) es menor que el doble de la del C–C (2 · 347 = 694): romper el π cuesta ≈ 267 kJ/mol, y por eso los alquenos dan reacciones de adición (Tema 10).") +
    "<p>Esta idea será clave en los Temas 9 y 10: la hibridación del carbono determina la geometría de una cadena orgánica (sp³ en alcanos, sp² en alquenos y compuestos con C=O, sp en alquinos y nitrilos).</p>"
  );

  // ---------------------------------------------------------------- 5. Polaridad e intermoleculares
  secciones[4] = env(
    "<h5>De los enlaces a la molécula: la suma de dipolos</h5>" +
    "<p>Cada enlace polar se puede representar con un <b>vector dipolo</b> que apunta hacia el átomo más electronegativo (δ⁻), de módulo μ = q·d. La molécula es polar si la <b>suma vectorial</b> de todos los dipolos de enlace (y de los pares libres) no es cero. Tres pasos:</p>" +
    "<ol><li>¿Hay <b>enlaces polares</b>? (Δχ ≠ 0). Si no (H₂, Cl₂, P₄), la molécula es apolar.</li>" +
    "<li>Mira la <b>geometría</b> (TRPECV): ¿los vectores se pueden cancelar?</li>" +
    "<li>Se cancelan solo si la geometría es <b>simétrica y los átomos exteriores son iguales</b>: lineal AX₂, trigonal AX₃, tetraédrica AX₄ con 4 sustituyentes iguales. Un par libre en el átomo central rompe la simetría (NH₃, H₂O, SO₂): la molécula es polar.</li></ol>" +
    w("q2_polaridad") +
    tabla(["Molécula", "Enlaces", "Geometría", "Dipolos", "Molécula"], [
      ["CO₂", "C=O polares", "lineal", "opuestos: se anulan", "<b>apolar</b>"],
      ["BF₃", "B–F muy polares", "trigonal plana", "a 120°: se anulan", "<b>apolar</b>"],
      ["CCl₄", "C–Cl polares", "tetraédrica", "iguales: se anulan", "<b>apolar</b>"],
      ["CHCl₃", "C–Cl y C–H distintos", "tetraédrica", "no se anulan", "<b>polar</b>"],
      ["H₂O", "O–H polares", "angular", "no se anulan", "<b>polar</b>"],
      ["NH₃", "N–H polares", "pirámide", "no se anulan", "<b>polar</b>"]
    ], "q3t") +
    "<p>Una molécula apolar puede tener enlaces polares, y un enlace apolar no puede dar una molécula polar. La <b>polaridad</b> (μ, en debye) condiciona las fuerzas entre moléculas y la solubilidad: «lo semejante disuelve a lo semejante» (el agua disuelve sustancias polares e iónicas; el hexano, apolares).</p>" +
    "<h5>Las fuerzas intermoleculares</h5>" +
    "<p>Entre moléculas actúan fuerzas mucho más débiles que un enlace (10–100 veces), pero deciden si una sustancia es gas, líquido o sólido y su punto de ebullición:</p>" +
    "<ul>" +
    "<li><b>Fuerzas de dispersión (London)</b>: actúan entre <b>todas</b> las moléculas, polares o no. Nacen de dipolos instantáneos de la nube electrónica; crecen con el <b>tamaño y el número de electrones</b> (más polarizable) y con la superficie de contacto. Son las únicas en gases nobles, X₂ y alcanos.</li>" +
    "<li><b>Dipolo–dipolo</b>: entre moléculas polares; se suman a las de dispersión.</li>" +
    "<li><b>Puente de hidrógeno</b>: un H unido a F, O o N (muy electronegativos y pequeños) es atraído por un par libre de otro F, O o N. Es la más fuerte (10–40 kJ/mol) y explica las «anomalías»: la alta T<sub>eb</sub> del agua, HF y NH₃, la solubilidad del etanol en agua, o que el hielo flote (red abierta con huecos).</li>" +
    "<li><b>Ion–dipolo</b>: la responsable de que una sal se disuelva (Na⁺ rodeado por los O del agua, Cl⁻ por sus H).</li>" +
    "</ul>" +
    w("q2_fuerzas") +
    ejemplo("Ejemplo resuelto: ordenar por punto de ebullición", "Ordena de menor a mayor punto de ebullición y justifica: Ar (−186 °C), HCl (−85 °C), CH₃OH (65 °C) y H₂O (100 °C).", [
      "<b>Ar</b>: átomos, sin dipolo; solo fuerzas de dispersión (18 e⁻): la menor T<sub>eb</sub>.",
      "<b>HCl</b>: polar (Δχ = 0,96); dispersión + dipolo–dipolo. No hay puente de H (el Cl no es F, O ni N): T<sub>eb</sub> mayor que el Ar.",
      "<b>CH₃OH</b>: tiene un grupo –OH: puentes de hidrógeno (1 H capaz de donar). Mucho más alto que el HCl.",
      "<b>H₂O</b>: 2 H y 2 pares libres por molécula → hasta 4 puentes de H por molécula (red tridimensional); el CH₃OH, con un solo H, forma menos. Orden: <b>Ar &lt; HCl &lt; CH₃OH &lt; H₂O</b>."
    ]) +
    ejemplo("Ejemplo resuelto: dos sustancias con la misma fórmula", "El etanol (CH₃CH₂OH, T<sub>eb</sub> = 78 °C) y el éter dimetílico (CH₃OCH₃, T<sub>eb</sub> = −24 °C) tienen la misma fórmula, C₂H₆O. Explica la diferencia.", [
      "Misma masa molecular, así que las fuerzas de dispersión son parecidas.",
      "El etanol tiene un H unido a O: forma <b>puentes de hidrógeno</b> entre moléculas.",
      "En el éter el H está unido solo a C: es polar (dipolo–dipolo) pero no puede formar puentes de H consigo mismo → 100 °C menos."
    ]) +
    ojo("Al hervir agua se rompen <b>puentes de hidrógeno y fuerzas intermoleculares</b>, no los enlaces O–H de la molécula (que siguen intactos en el vapor). Y la T<sub>eb</sub> crece con la masa solo si la polaridad y los puentes son comparables: el HF (M = 20) hierve a 20 °C y el HCl (M = 36,5) a −85 °C.")
  );

  B.parte.q2t4a = { secciones: secciones };
})(window);
