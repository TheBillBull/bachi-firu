/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte D: secciones nuevas 11 a 14: método general, vida cotidiana, historia y problemas resueltos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function tabla(c, f) { return H.tabla(c, f, "q3t"); }
  var F = B.lab.formulacion, T = B.parte.t3, fm = T.fm, nm = T.nm, bn = T.bn, sg = T.sg, w = T.w, wa = T.wa, ecOx = T.ecOx;
  var nuevas = [], CUENTAS = [];
  T.CUENTAS = CUENTAS;
  function lista(fs, sis) { return fs.map(function (f) { return fm(f) + " → " + bn(f, sis); }).join("<br>"); }

  // ================================================================ 11. Método general
  nuevas.push({ h: "11. Un método para formular y nombrar cualquier compuesto", html:
    "<h5>La palabra clave del nombre te dice la familia (y la plantilla de la fórmula)</h5>" +
    "<p>Hay muy pocas familias y cada una deja una huella en el nombre. Si sabes leer esa huella, ya tienes la mitad de la fórmula. Esta tabla es el mapa del tema entero.</p>" +
    tabla(["En el nombre aparece…", "Familia", "Plantilla de la fórmula", "Ejemplo"], [
      ["«óxido de»", "Óxido", "M₂Oₙ (simplificada) · XₐO<sub>b</sub>", fm("Fe2O3") + " · " + fm("SO3")],
      ["«peróxido de» o «dióxido de»…", "Peróxido", "M<sub>x</sub>(O₂)<sub>y</sub>", fm("Na2O2")],
      ["«hidróxido de»", "Hidróxido", "M(OH)ₙ", fm("Ca(OH)2")],
      ["«hidruro de» + metal", "Hidruro metálico", "MHₙ", fm("CaH2")],
      ["metano, amoniaco, silano…", "Hidruro no metálico", "XHₙ", fm("NH3") + " · " + fm("CH4")],
      ["«ácido …-hídrico» o «…uro de hidrógeno»", "Hidrácido", "HₙX", fm("HCl") + " · " + fm("H2S")],
      ["«ácido …-oso / -ico» (con hipo-, per-)", "Oxoácido", "H<sub>a</sub>XO<sub>b</sub>", fm("H2SO4") + " · " + fm("HClO4")],
      ["«…uro de» + metal", "Sal binaria", "M<sub>x</sub>X<sub>y</sub>", fm("NaCl") + " · " + fm("Al2S3")],
      ["«…ato / …ito de»", "Oxisal", "M<sub>x</sub>(XO<sub>b</sub>)<sub>y</sub>", fm("Na2SO4") + " · " + fm("Ca3(PO4)2")],
      ["«hidrogeno…» + ato/ito/uro", "Sal ácida", "M(HXO<sub>b</sub>)<sub>y</sub>", fm("NaHCO3")]
    ]) +
    "<h5>De la fórmula al nombre</h5>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Identifica la familia</b> mirando los elementos: ¿hay un metal (o NH₄)? ¿hay oxígeno? ¿hay hidrógeno, y dónde? ¿hay un grupo OH o un grupo con carga como SO₄ o NO₃? (El árbol de abajo lo hace por ti.)</li>" +
    "<li><b>Calcula el número de oxidación</b> del elemento que no sea fijo: la suma de cargas es 0.</li>" +
    "<li><b>Elige el sistema</b> que te piden y construye el nombre: prefijos = subíndices; romano = número de oxidación; sufijos = serie del ácido.</li>" +
    "<li><b>Compruébalo</b> formulando de vuelta tu nombre: debes obtener la fórmula de partida.</li>" +
    "</ol>" +
    "<h5>Del nombre a la fórmula</h5>" +
    "<ol class='lam-pasos'>" +
    "<li><b>Lee la palabra clave</b> (óxido, hidróxido, -uro, -ato…): es la familia.</li>" +
    "<li><b>Escribe los símbolos</b> con sus números de oxidación: los prefijos (di-, tri-…) son subíndices ya dados; un romano es la valencia; -oso/-ico/hipo-/per- te dan el número de oxidación a partir de la serie.</li>" +
    "<li><b>Cruza y simplifica</b> (si el nombre no trae prefijos); pon paréntesis a los grupos que se repiten.</li>" +
    "<li><b>Comprueba las cargas</b>: suma 0.</li>" +
    "</ol>" +
    ejemplo("Formula el sulfato de hierro(III) y nombra el compuesto Fe₂(SO₄)₃ en sistemática", "El mismo compuesto, recorrido en los dos sentidos.", [
      "Nombre → fórmula: «-ato» → oxisal; sulfato = SO₄²⁻ (del ácido sulfúrico, S +6); hierro(III) = Fe³⁺.",
      "Cruce: Fe₂(SO₄)₃ (2 y 3 no se simplifican; el grupo sulfato se repite 3 veces, con paréntesis): " + fm("Fe2(SO4)3") + ".",
      "Comprobación: 2·(+3) + 3·(−2) = 0 ✓.",
      "Fórmula → nombre sistemático: hay 3 grupos SO₄ (<i>tris</i>, con paréntesis) y 2 átomos de Fe (<i>di</i>): " + bn("Fe2(SO4)3", "sist") + "."
    ]) +
    ejemplo("Formula el ácido hipocloroso y nombra el compuesto HClO₃ en las tres nomenclaturas", "Recuerda que el cloro tiene 1, 3, 5 y 7 con el oxígeno.", [
      "Hipo-…-oso es el menor número de oxidación (+1): HClO (1 O): " + fm("HClO") + ". Comprobación: 1 + 1 − 2 = 0.",
      "HClO₃: 1 + <i>x</i> − 6 = 0 → Cl = +5 → -ico: tradicional " + bn("HClO3", "trad") + ".",
      "Sistemática: " + bn("HClO3", "sist") + ". Stock: " + bn("HClO3", "stock") + "."
    ]) +
    w("q3_decision") + w("q3_familia") });

  // ================================================================ 12. Vida cotidiana
  function filaVida(f, sis, comun, uso) { return [fm(f), nm(f, sis), comun, uso]; }
  nuevas.push({ h: "12. Compuestos de la vida cotidiana", html:
    "<h5>Los nombres de la cocina, la farmacia y la industria, con su fórmula</h5>" +
    "<p>Casi todas las sustancias que usas cada día tienen una fórmula del tipo que acabas de aprender. Los nombres comunes («sal», «lejía», «sosa») son útiles, pero la fórmula y el nombre sistemático son los que permiten saber qué es de verdad y qué puede hacer.</p>" +
    tabla(["Fórmula", "Nombre (Stock/tradicional)", "Nombre común", "Para qué se usa"], [
      filaVida("NaCl", "stock", "sal común", "alimentación, conservante, materia prima de la industria química"),
      filaVida("NaClO", "stock", "lejía", "desinfectante y blanqueante (el hipoclorito oxida a los microbios)"),
      filaVida("NaHCO3", "stock", "bicarbonato", "levadura química, antiácido, extintores"),
      filaVida("CaCO3", "stock", "caliza, mármol, cáscara de huevo", "construcción, cemento, antiácido, abono"),
      filaVida("CaO", "stock", "cal viva", "cemento, siderurgia, depuración de aguas"),
      filaVida("Ca(OH)2", "stock", "cal apagada", "pintura a la cal, mortero, tratamiento de aguas y suelos ácidos"),
      filaVida("NaOH", "stock", "sosa cáustica", "jabones, destapa tuberías, fabricación de papel"),
      filaVida("HCl", "trad", "salfumán", "limpieza de azulejos y metales (disolución acuosa); ácido gástrico"),
      filaVida("H2SO4", "trad", "ácido de baterías", "baterías de plomo, abonos; es el compuesto que más se fabrica en el mundo"),
      filaVida("HNO3", "trad", "agua fuerte", "abonos nitrogenados, explosivos"),
      filaVida("H3PO4", "trad", "ácido ortofosfórico", "refrescos de cola (acidulante), desoxidantes, abonos"),
      filaVida("NH3", "trad", "amoniaco", "abonos (urea, nitrato de amonio), limpiadores, refrigeración"),
      filaVida("H2O2", "stock", "agua oxigenada", "antiséptico, decoloración del pelo y del papel"),
      filaVida("KMnO4", "stock", "permanganato", "desinfectante, análisis volumétrico"),
      filaVida("Al2O3", "stock", "alúmina (corindón)", "abrasivos; el rubí y el zafiro son corindón con impurezas"),
      filaVida("SiO2", "stock", "cuarzo, arena, sílice", "vidrio, cerámica, chips electrónicos (silicio puro)"),
      filaVida("Fe2O3", "stock", "hematites", "mena de hierro y pigmento rojo (el «óxido» o herrumbre es Fe₂O₃ hidratado)"),
      filaVida("AgNO3", "stock", "nitrato de plata", "fotografía clásica, cauterizante, espejos"),
      filaVida("CuSO4", "stock", "sulfato de cobre", "fungicida (caldo bordelés), electrólisis y pilas"),
      filaVida("MgSO4", "stock", "sal de Epsom", "laxante, baños relajantes"),
      filaVida("NaNO3", "stock", "nitrato de Chile, salitre", "abono, conservante (E-251), explosivos"),
      filaVida("CO2", "sist", "dióxido de carbono, gas carbónico", "gas de los refrescos, extintores, hielo seco (sólido)")
    ]) +
    "<p>Los nombres de las columnas 2 y 3 no compiten: el primero es el que aparece en el examen y el segundo, el que oirás en la droguería. Observa cuántas veces se repite el mismo patrón: <b>«carbonato de calcio»</b>, <b>«hidróxido de sodio»</b>, <b>«nitrato de plata»</b>… Con la lista de aniones de la sección 8 y los cationes más habituales, puedes nombrar centenares de sales sin haberlas visto nunca.</p>" +
    ojo("«Óxido» tiene tres sentidos en la vida diaria: el compuesto químico de oxígeno con un elemento, la herrumbre del hierro (en realidad, óxido de hierro(III) hidratado) y, de forma coloquial, cualquier capa de corrosión. En formulación solo cuenta el primero: un óxido es un compuesto binario del oxígeno (con n.º de oxidación −2).") +
    wa("q3_entrenador", { titulo: "Entrenador mezclado: de todo un poco", modo: "mix", niv: 1 }) });

  // ================================================================ 13. Historia
  nuevas.push({ h: "13. Cómo se llegó a esta nomenclatura", html:
    "<h5>Del lenguaje de los alquimistas a las recomendaciones de 2005</h5>" +
    "<p>Hasta finales del siglo XVIII los compuestos se llamaban por su aspecto, su origen o su descubridor: «vitriolo azul», «sal de Glauber», «aceite de vitriolo» (el ácido sulfúrico), «cal viva». No había forma de deducir la composición de un nombre. Antoine Lavoisier y otros tres químicos franceses propusieron en 1787 un lenguaje nuevo, en el que <b>el nombre describe la composición</b>: de ahí vienen las terminaciones -uro («cloruro»), -ato e -ito («sulfato», «sulfito»), -ico y -oso. Es el mismo principio de las tres nomenclaturas de este tema.</p>" +
    "<p>En 1919, Alfred Stock propuso indicar el número de oxidación con números romanos, y ese mismo año se fundó la IUPAC, la unión internacional que fija las reglas. Su «Libro Rojo» (<i>Nomenclature of Inorganic Chemistry</i>) se ha revisado varias veces; la edición de 2005, con la versión en español, es la que da pie a lo que estudias en el instituto: nombres sistemáticos con prefijos, el uso de «oxido» y «hidrogeno» para los oxoácidos y sus sales, y un papel menor para la tradicional.</p>" +
    w("linea", "historia") +
    "<p>Estos cambios no son un capricho: cada versión intenta que el nombre sirva para escribir la fórmula sin ambigüedad. Es lo que consiguen los prefijos de la sistemática, y la razón por la que se prefieren cuando hay dudas. Un ejemplo es el «óxido nitroso»: en la nomenclatura tradicional el nombre se prestaba a confusión (¿qué número de oxidación?) y la sistemática lo resuelve: «monóxido de dinitrógeno» solo puede ser N₂O.</p>" });

  // ================================================================ 14. Problemas resueltos
  function composicion() {
    var pFe = 69.94, pO = 100 - pFe, mFe = 55.845, mO = 15.999;
    var nFe = pFe / mFe, nO = pO / mO;
    CUENTAS.push({ py: "abs((100-69.94)/15.999/(69.94/55.845)-1.5)<0.01", val: 1 });
    return { nFe: nFe, nO: nO, r: nO / nFe };
  }
  var comp = composicion();
  function fx(x, d) { return B.fmt(x, d); }
  nuevas.push({ h: "14. Problemas resueltos tipo examen", html:
    "<p>Seis problemas completos, de los que se plantean en un examen de este tema. Resuélvelos primero tú y compara los pasos.</p>" +
    ejemplo("Problema 1 · Formulación directa", "Formula: (a) óxido de plomo(IV); (b) hidróxido de aluminio; (c) ácido sulfhídrico; (d) hidruro de litio; (e) cloruro de cobre(II); (f) ácido nítrico; (g) nitrato de plata; (h) hidrogenocarbonato de calcio; (i) trióxido de azufre; (j) peróxido de litio.", [
      "(a) Pb (+4) con O (−2): Pb₂O₄ → simplifica entre 2 → " + fm("PbO2") + ".",
      "(b) Al (+3) con OH (−1): " + fm("Al(OH)3") + " (3 grupos, paréntesis).",
      "(c) Hidrácido del azufre (−2): " + fm("H2S") + ".",
      "(d) Hidruro metálico del litio (+1): " + fm("LiH") + ".",
      "(e) Cu (+2) con Cl (−1): " + fm("CuCl2") + ".",
      "(f) Oxoácido del N con +5 (impar): HNO₍₅₊₁₎/₂ = " + fm("HNO3") + ".",
      "(g) Ag (+1) con NO₃⁻: " + fm("AgNO3") + ".",
      "(h) Ca²⁺ con HCO₃⁻: " + fm("Ca(HCO3)2") + ".",
      "(i) Prefijos: 1 S y 3 O: " + fm("SO3") + ".",
      "(j) Peróxido (grupo O₂²⁻) con Li⁺: " + fm("Li2O2") + "."
    ]) +
    ejemplo("Problema 2 · Nombrar en los tres sistemas", "Nombra, cuando existan, en sistemática, Stock y tradicional: (a) Cu₂O; (b) Fe(OH)₂; (c) Na₂CO₃; (d) HClO₂; (e) SnCl₄; (f) K₂Cr₂O₇.", [
      "(a) " + fm("Cu2O") + ": " + bn("Cu2O", "sist") + " · " + bn("Cu2O", "stock") + " · " + bn("Cu2O", "trad") + ".",
      "(b) " + fm("Fe(OH)2") + ": " + bn("Fe(OH)2", "sist") + " · " + bn("Fe(OH)2", "stock") + " · " + bn("Fe(OH)2", "trad") + ".",
      "(c) " + fm("Na2CO3") + ": " + bn("Na2CO3", "sist") + " · " + bn("Na2CO3", "stock") + ".",
      "(d) " + fm("HClO2") + ": Cl +3 → " + bn("HClO2", "trad") + " · " + bn("HClO2", "sist") + " · " + bn("HClO2", "stock") + ".",
      "(e) " + fm("SnCl4") + ": Sn +4 → " + bn("SnCl4", "sist") + " · " + bn("SnCl4", "stock") + " · " + bn("SnCl4", "trad") + ".",
      "(f) " + fm("K2Cr2O7") + ": " + bn("K2Cr2O7", "sist") + " · " + bn("K2Cr2O7", "stock") + "."
    ]) +
    ejemplo("Problema 3 · Números de oxidación y familia", "En el compuesto KClO₃: (a) halla el número de oxidación de cada elemento; (b) di a qué familia pertenece; (c) nómbralo y escribe el ácido del que procede.", [
      "(a) K +1 y O −2 son fijos; " + ecOx("KClO3", "Cl").eq + " → Cl = <b>" + sg(ecOx("KClO3", "Cl").x) + "</b>.",
      "(b) Tiene metal, oxígeno y un no metal: es una <b>oxisal</b> (anión clorato, ClO₃⁻).",
      "(c) " + bn("KClO3", "stock") + " (sistemática: " + bn("KClO3", "sist") + "). El anión clorato viene del ácido clórico, " + fm("HClO3") + " (-ico → -ato)."
    ]) +
    ejemplo("Problema 4 · Fórmula de un óxido a partir de su composición", "Un óxido de hierro contiene un " + fx(69.94, 2) + " % de Fe en masa. Deduce su fórmula y nómbralo (A<sub>r</sub>: Fe = 55,845; O = 15,999).", [
      "En 100 g hay 69,94 g de Fe y " + fx(100 - 69.94, 2) + " g de O.",
      "Moles: Fe = 69,94/55,845 = " + fx(comp.nFe, 3) + " mol; O = 30,06/15,999 = " + fx(comp.nO, 3) + " mol.",
      "Cociente O/Fe = " + fx(comp.nO, 3) + "/" + fx(comp.nFe, 3) + " = " + fx(comp.r, 2) + " ≈ 3/2: por cada 2 Fe hay 3 O → " + fm("Fe2O3") + ".",
      "Es el " + nm("Fe2O3", "stock") + " (tradicional: " + nm("Fe2O3", "trad") + "; sistemática: " + nm("Fe2O3", "sist") + "). Comprobación: el Fe con +3 y el O con −2 → 2·3 = 3·2."
    ]) +
    ejemplo("Problema 5 · De la neutralización a la sal", "Se hace reaccionar ácido sulfúrico con hidróxido de aluminio. Formula la reacción, ajústala y nombra todas las sustancias.", [
      "Reactivos: " + bn("H2SO4", "trad") + " (" + fm("H2SO4") + ") e " + bn("Al(OH)3", "stock") + " (" + fm("Al(OH)3") + ").",
      "Sal que se forma: el catión Al³⁺ con el anión SO₄²⁻ → " + fm("Al2(SO4)3") + ": " + bn("Al2(SO4)3", "stock") + " (sistemática: " + bn("Al2(SO4)3", "sist") + "). El otro producto es agua.",
      "Sin ajustar: H₂SO₄ + Al(OH)₃ → Al₂(SO₄)₃ + H₂O. Para tener 2 Al y 3 SO₄ hacen falta <b>3 H₂SO₄</b> y <b>2 Al(OH)₃</b>.",
      "Los H: 3·2 + 2·3 = 12 → <b>6 H₂O</b>. Ecuación: 3 H₂SO₄ + 2 Al(OH)₃ → Al₂(SO₄)₃ + 6 H₂O.",
      "Comprobación de O: 12 + 6 = 18 en reactivos y 12 + 6 = 18 en productos ✓."
    ]) +
    ejemplo("Problema 6 · La serie del cloro: del óxido a la sal", "Formula y nombra el óxido de cloro(V), el ácido que forma con el agua, y la sal de sodio de ese ácido.", [
      "Óxido: Cl (+5) con O (−2) → " + fm("Cl2O5") + ": " + bn("Cl2O5", "stock") + " (sistemática: " + bn("Cl2O5", "sist") + ").",
      "Con agua: Cl₂O₅ + H₂O → 2 HClO₃. Ácido: " + fm("HClO3") + ", " + bn("HClO3", "trad") + ".",
      "Sal sódica: pierde el H⁺ → anión ClO₃⁻ (clorato) + Na⁺ → " + fm("NaClO3") + ": " + bn("NaClO3", "stock") + " (sistemática: " + bn("NaClO3", "sist") + ").",
      "Comprobación del n.º de oxidación del cloro en las tres sustancias: +5 en todas (óxido, ácido y sal): al pasar de una a otra no cambia."
    ]) +
    wa("q3_noxid", { f: "K2Cr2O7" }) });

  B.parte.t3d = { nuevas: nuevas };
})(window);
