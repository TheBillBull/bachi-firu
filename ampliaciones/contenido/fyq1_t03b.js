/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte B: ampliación de las secciones 4 a 6: hidruros e hidrácidos, oxoácidos y sales binarias)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function tabla(c, f) { return H.tabla(c, f, "q3t"); }
  var F = B.lab.formulacion, T = B.parte.t3, fm = T.fm, nm = T.nm, bn = T.bn, sg = T.sg, w = T.w, wa = T.wa;
  var secciones = {};

  // ================================================================ 4. Hidruros e hidrácidos
  secciones[3] =
    "<h5>Tres familias según con quién se une el hidrógeno</h5>" +
    "<p>El hidrógeno puede actuar con +1 o con −1, y de eso depende cómo se escribe y se llama el compuesto. Hay <b>tres familias</b>: los hidruros de metales (H⁻, el hidrógeno va detrás), los hidruros de los no metales de los grupos 13, 14 y 15 (el elemento va delante, y tienen nombres propios) y los hidrácidos, con los no metales de los grupos 16 y 17 (el hidrógeno va delante).</p>" +
    "<h5>Hidruros metálicos: MHₙ</h5>" +
    "<p>Aquí el hidrógeno es el más electronegativo y actúa con −1. Se cruza igual que en cualquier compuesto binario: el metal con valencia +<i>n</i> lleva <i>n</i> hidrógenos. Se nombran «hidruro de + metal» (con prefijos en la sistemática y números romanos en Stock).</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [
      [fm("LiH"), nm("LiH", "sist"), nm("LiH", "stock"), nm("LiH", "trad")],
      [fm("NaH"), nm("NaH", "sist"), nm("NaH", "stock"), nm("NaH", "trad")],
      [fm("CaH2"), nm("CaH2", "sist"), nm("CaH2", "stock"), nm("CaH2", "trad")],
      [fm("AlH3"), nm("AlH3", "sist"), nm("AlH3", "stock"), nm("AlH3", "trad")],
      [fm("FeH2"), nm("FeH2", "sist"), nm("FeH2", "stock"), nm("FeH2", "trad")],
      [fm("FeH3"), nm("FeH3", "sist"), nm("FeH3", "stock"), nm("FeH3", "trad")],
      [fm("SnH4"), nm("SnH4", "sist"), nm("SnH4", "stock"), nm("SnH4", "trad")]
    ]) +
    "<p>Son sólidos muy reactivos: el hidruro de calcio reacciona con el agua y desprende hidrógeno (CaH₂ + 2 H₂O → Ca(OH)₂ + 2 H₂), y por eso se usa como fuente de hidrógeno y como desecante.</p>" +
    "<h5>Hidruros de los grupos 13, 14 y 15</h5>" +
    "<p>Con el B, el C, el Si, el N, el P, el As y el Sb el hidrógeno actúa con +1, pero el elemento se escribe <b>delante</b> porque en la lista de la IUPAC va antes que el H. Son compuestos covalentes y sus nombres más usados son los de siempre; la IUPAC recomienda la nomenclatura de sustitución con la terminación <b>-ano</b> (azano, fosfano, silano…). En la sistemática de composición se llaman «trihidruro de nitrógeno», «tetrahidruro de carbono»…</p>" +
    tabla(["Fórmula", "Nombre IUPAC (-ano)", "Sistemática de composición", "Nombre común"], [
      [fm("NH3"), nm("NH3", "sist", 0), nm("NH3", "sist", 1), nm("NH3", "trad")],
      [fm("PH3"), nm("PH3", "sist", 0), nm("PH3", "sist", 1), nm("PH3", "trad")],
      [fm("AsH3"), nm("AsH3", "sist", 0), nm("AsH3", "sist", 1), nm("AsH3", "trad")],
      [fm("SbH3"), nm("SbH3", "sist", 0), nm("SbH3", "sist", 1), nm("SbH3", "trad")],
      [fm("CH4"), nm("CH4", "sist", 0), nm("CH4", "sist", 1), nm("CH4", "trad")],
      [fm("SiH4"), nm("SiH4", "sist", 0), nm("SiH4", "sist", 1), nm("SiH4", "trad")],
      [fm("BH3"), nm("BH3", "sist", 0), nm("BH3", "sist", 1), nm("BH3", "trad")]
    ]) +
    "<p>El amoniaco es la materia prima de los abonos nitrogenados (proceso Haber-Bosch, Tema 5) y el metano es el componente principal del gas natural. El agua (H₂O) y el peróxido de hidrógeno (H₂O₂, el «agua oxigenada») pertenecen a la familia de los óxidos y peróxidos.</p>" +
    "<h5>Hidrácidos: HX y H₂X (grupos 16 y 17)</h5>" +
    "<p>Con el F, Cl, Br, I y con el S, Se y Te el hidrógeno actúa con +1 y se escribe <b>delante</b>: HCl, H₂S. La carga del no metal es −1 (halógenos) o −2 (anfígenos), y por eso el subíndice del H es 1 o 2. Tienen <b>dos nombres</b>, según el estado: en <b>gas puro</b> (o líquido) son compuestos binarios y se nombran como cualquier sal, «cloruro de hidrógeno»; <b>disueltos en agua</b>, donde se ionizan y se comportan como ácidos, se nombran con la raíz del no metal y la terminación <b>-hídrico</b>: «ácido clorhídrico». Para distinguirlos se escribe (g) o (aq): HCl(g), HCl(aq).</p>" +
    tabla(["Fórmula", "Gas (sistemática)", "Gas (Stock)", "En agua (tradicional)"], [
      [fm("HF"), nm("HF", "sist"), nm("HF", "stock"), nm("HF", "trad")],
      [fm("HCl"), nm("HCl", "sist"), nm("HCl", "stock"), nm("HCl", "trad")],
      [fm("HBr"), nm("HBr", "sist"), nm("HBr", "stock"), nm("HBr", "trad")],
      [fm("HI"), nm("HI", "sist"), nm("HI", "stock"), nm("HI", "trad")],
      [fm("H2S"), nm("H2S", "sist"), nm("H2S", "stock"), nm("H2S", "trad")],
      [fm("H2Se"), nm("H2Se", "sist"), nm("H2Se", "stock"), nm("H2Se", "trad")],
      [fm("H2Te"), nm("H2Te", "sist"), nm("H2Te", "stock"), nm("H2Te", "trad")]
    ]) +
    "<p>El ácido clorhídrico es el principal ácido del jugo gástrico (con un pH de 1 a 2) y se vende como «salfumán» para limpiar. El fluorhídrico ataca al vidrio, por lo que se guarda en recipientes de plástico. El sulfuro de hidrógeno huele a huevos podridos y es tóxico.</p>" +
    ejemplo("Formula el ácido bromhídrico, el sulfuro de dihidrógeno y el trihidruro de fósforo", "Decide primero la familia por los elementos: H con grupo 17, H con grupo 16, grupo 15 con H.", [
      "Ácido bromhídrico: hidrácido (Br es del grupo 17, −1): H delante, " + fm("HBr") + " (" + nm("HBr", "trad") + "; en gas, " + nm("HBr", "sist") + ").",
      "Sulfuro de dihidrógeno: hidrácido del azufre (−2): hacen falta dos H, " + fm("H2S") + ".",
      "Trihidruro de fósforo: el fósforo es del grupo 15, va delante y lleva 3 H: " + fm("PH3") + " (" + nm("PH3", "trad") + ")."
    ]) +
    ojo("La posición del H decide la familia: <b>H</b>Cl y <b>H</b>₂S son ácidos (H delante, grupos 16 y 17); N<b>H</b>₃ y C<b>H</b>₄ no son ácidos (el elemento va delante, grupos 13–15). Y el ion hidruro de los metales (NaH) es el único caso con hidrógeno de carga −1.") +
    wa("q3_entrenador", { titulo: "Entrenador de hidruros e hidrácidos", fams: ["hidruroM", "hidruroN", "hidracido"] });

  // ================================================================ 5. Oxoácidos
  var HAL = ["Cl", "Br", "I"];
  function hal(ox) { return HAL.map(function (x) { var o = F.OXO.filter(function (q) { return q.x === x && q.ox === ox; })[0]; return fm(o.f) + " · " + nm(o.f, "trad"); }); }
  function filaOxo(f) { var r = F.hallar(f); return [fm(f), nm(f, "trad"), nm(f, "sist"), nm(f, "stock")]; }
  secciones[4] =
    "<h5>De dónde salen: óxido ácido + agua</h5>" +
    "<p>Un oxoácido es lo que resulta de añadir agua a un óxido de un no metal: SO₃ + H₂O → <b>H₂SO₄</b>; N₂O₅ + H₂O → 2 <b>HNO₃</b>; Cl₂O₇ + H₂O → 2 <b>HClO₄</b>; CO₂ + H₂O → <b>H₂CO₃</b>. Todos tienen la forma H<sub>a</sub>XO<sub>b</sub>: hidrógeno, el no metal X y oxígeno, y el hidrógeno (que es el que da el carácter ácido) va delante. Puedes obtener la fórmula sin conocer el óxido con esta <b>regla práctica</b>:</p>" +
    "<ul><li>Si el número de oxidación de X es <b>impar</b> (+1, +3, +5, +7): <b>HXO</b><sub>(n+1)/2</sub>. Ejemplos: Cl +5 → HClO₃ (3 oxígenos); N +3 → HNO₂ (2 oxígenos).</li>" +
    "<li>Si es <b>par</b> (+2, +4, +6): <b>H₂XO</b><sub>(n+2)/2</sub>. Ejemplos: S +6 → H₂SO₄ (4 oxígenos); C +4 → H₂CO₃ (3 oxígenos).</li>" +
    "<li>Comprobación siempre con la suma de cargas: nº de H·(+1) + X + nº de O·(−2) = 0.</li></ul>" +
    "<p>Las excepciones son el fósforo, el arsénico, el antimonio y el boro (y, en parte, el silicio), que se combinan con <b>más agua</b>: P₂O₅ + 3 H₂O → 2 H₃PO₄. La forma con menos agua se llama <b>meta-</b> (HPO₃, ácido metafosfórico) y la de más agua <b>orto-</b>, que es la habitual y por eso suele omitirse el prefijo: «ácido fosfórico» es el ortofosfórico, H₃PO₄.</p>" +
    w("q3_oxoacidos") +
    "<h5>Nomenclatura tradicional: la serie hipo-, -oso, -ico, per-</h5>" +
    "<p>Cuando un no metal forma varios oxoácidos, se distinguen por el nombre del no metal y un sufijo. Si solo hay <b>dos</b> (azufre, nitrógeno, fósforo…): <b>-oso</b> para el de menor número de oxidación (menos O) y <b>-ico</b> para el de mayor (más O). Si hay <b>cuatro</b> (cloro, bromo, yodo): <b>hipo-…-oso</b> (+1), <b>-oso</b> (+3), <b>-ico</b> (+5) y <b>per-…-ico</b> (+7). Una regla útil con los halógenos: el número de oxígenos es <b>1, 2, 3 y 4</b> en ese orden. Si solo hay uno (carbono, silicio, boro, cromo), lleva -ico.</p>" +
    tabla(["n.º ox.", "Cloro", "Bromo", "Yodo"], [
      ["+1 (hipo-…-oso)"].concat(hal(1)), ["+3 (-oso)"].concat(hal(3)), ["+5 (-ico)"].concat(hal(5)), ["+7 (per-…-ico)"].concat(hal(7))
    ]) +
    tabla(["Fórmula", "Tradicional", "Sistemática (de hidrógeno)", "Stock"], [
      filaOxo("H2SO3"), filaOxo("H2SO4"), filaOxo("H2SeO3"), filaOxo("H2SeO4"), filaOxo("H2TeO3"), filaOxo("H2TeO4"),
      filaOxo("HNO2"), filaOxo("HNO3"), filaOxo("H3PO3"), filaOxo("H3PO4"), filaOxo("HPO3"), filaOxo("H4P2O7"),
      filaOxo("H2CO3"), filaOxo("H2SiO3"), filaOxo("H4SiO4"), filaOxo("H3BO3"), filaOxo("HBO2"),
      filaOxo("H2CrO4"), filaOxo("H2Cr2O7"), filaOxo("HMnO4"), filaOxo("H2MnO4"), filaOxo("H2S2O7")
    ]) +
    "<h5>Nomenclatura sistemática (de hidrógeno) y de Stock</h5>" +
    "<p>La IUPAC 2005 nombra los oxoácidos como si fueran la sal de hidrógeno de su anión: se dice cuántos oxígenos hay con el prefijo (<b>tri-</b>, <b>tetra-</b>…) y la palabra «<b>oxido</b>», se añade la raíz del no metal terminada en <b>-ato</b> y, al final, «de hidrógeno» con el prefijo que cuente los H. Así, " + fm("H2SO4") + " es " + bn("H2SO4", "sist") + ": <i>tetra</i> = 4 O, <i>oxido</i>, <i>sulf</i>-<i>ato</i> y <i>di</i>hidrógeno = 2 H. En <b>Stock</b> se añade entre paréntesis el número de oxidación del no metal: " + bn("H2SO4", "stock") + ". En los libros anteriores a 2005 la forma equivalente era «ácido tetraoxosulfúrico(VI)»; la seguirás viendo (el motor del entrenador también la acepta). Las tres, junto con la tradicional (" + bn("H2SO4", "trad") + "), nombran la misma sustancia.</p>" +
    ejemplo("Formula el ácido perbrómico y nombra el H₃PO₃", "Usa el significado de per- y las reglas de las excepciones (fósforo).", [
      "Per-…-ico en el bromo: n.º ox. +7. Como es impar: HBrO<sub>(7+1)/2</sub> = " + fm("HBrO4") + " (4 O, igual que el perclórico).",
      "Comprobación: 1·(+1) + 7 + 4·(−2) = 0.",
      "H₃PO₃: fósforo con 3 H (orto-). Número de oxidación del P: 3·(+1) + x + 3·(−2) = 0 → x = +3 (el menor de los dos que tiene el P) → <b>-oso</b>: " + bn("H3PO3", "trad") + ".",
      "Sistemática: " + bn("H3PO3", "sist") + "; Stock: " + bn("H3PO3", "stock") + "."
    ]) +
    ojo("«Clorhídrico» y «clórico» no son lo mismo: el ácido clorhídrico es el hidrácido HCl (sin oxígeno); el ácido clórico es el oxoácido HClO₃. Para no confundirlos, recuerda que <b>-hídrico</b> significa «solo hidrógeno y el no metal», y que <b>-ico</b> a secas de los oxoácidos lleva oxígeno.") +
    "<h5>Ácidos «di-» y ácidos de metales de transición</h5>" +
    "<p>Algunos ácidos se forman al unir dos moléculas del ácido y restar una de agua: 2 H₂CrO₄ − H₂O = <b>H₂Cr₂O₇</b> (ácido dicrómico), 2 H₃PO₄ − H₂O = <b>H₄P₂O₇</b> (difosfórico), 2 H₂SO₄ − H₂O = <b>H₂S₂O₇</b> (disulfúrico). El cromo y el manganeso, siendo metales, también forman oxoácidos con números de oxidación altos: " + fm("H2CrO4") + " (" + nm("H2CrO4", "trad") + ", Cr +6), " + fm("HMnO4") + " (" + nm("HMnO4", "trad") + ", Mn +7) y " + fm("H2MnO4") + " (" + nm("H2MnO4", "trad") + ", Mn +6).</p>" +
    wa("q3_entrenador", { titulo: "Entrenador de oxoácidos", fams: ["oxoacido"], fam: "oxoacido" });

  // ================================================================ 6. Sales binarias y los tres sistemas
  var ANIONES_URO = [["F", "fluoruro", 1], ["Cl", "cloruro", 1], ["Br", "bromuro", 1], ["I", "yoduro", 1], ["S", "sulfuro", 2], ["Se", "seleniuro", 2], ["Te", "telururo", 2], ["N", "nitruro", 3], ["P", "fosfuro", 3], ["As", "arseniuro", 3], ["C", "carburo", 4], ["Si", "siliciuro", 4]];
  secciones[5] =
    "<h5>Sales binarias: el anión «-uro»</h5>" +
    "<p>Una sal binaria es un compuesto de <b>un metal y un no metal</b> sin oxígeno ni hidrógeno. El no metal actúa con su carga negativa y el nombre del anión se forma con la raíz del elemento y la terminación <b>-uro</b>: " + ANIONES_URO.map(function (a) { return F.pintarIon(a[0], -a[2]) + " " + a[1]; }).join(", ") + ". Se formulan con el cruce de valencias (metal delante) y se nombran «anión + de + metal». Son las sales de los hidrácidos: HCl + NaOH → NaCl + H₂O.</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [
      [fm("NaCl"), nm("NaCl", "sist"), nm("NaCl", "stock"), nm("NaCl", "trad")],
      [fm("CaF2"), nm("CaF2", "sist"), nm("CaF2", "stock"), nm("CaF2", "trad")],
      [fm("FeCl2"), nm("FeCl2", "sist"), nm("FeCl2", "stock"), nm("FeCl2", "trad")],
      [fm("FeCl3"), nm("FeCl3", "sist"), nm("FeCl3", "stock"), nm("FeCl3", "trad")],
      [fm("Al2S3"), nm("Al2S3", "sist"), nm("Al2S3", "stock"), nm("Al2S3", "trad")],
      [fm("Mg3N2"), nm("Mg3N2", "sist"), nm("Mg3N2", "stock"), nm("Mg3N2", "trad")],
      [fm("Cu2S"), nm("Cu2S", "sist"), nm("Cu2S", "stock"), nm("Cu2S", "trad")],
      [fm("CuS"), nm("CuS", "sist"), nm("CuS", "stock"), nm("CuS", "trad")],
      [fm("Ag2S"), nm("Ag2S", "sist"), nm("Ag2S", "stock"), nm("Ag2S", "trad")],
      [fm("Ca3P2"), nm("Ca3P2", "sist"), nm("Ca3P2", "stock"), nm("Ca3P2", "trad")]
    ]) +
    "<p>La sal más importante, el cloruro de sodio, es la sal común; el fluoruro de calcio es el mineral fluorita y el sulfuro de cinc se usa en pantallas fluorescentes. Los dos prefijos de la sistemática se ven bien en el nitruro de magnesio: <i>di</i>nitruro (2 N) de <i>tri</i>magnesio (3 Mg), es decir, " + fm("Mg3N2") + ".</p>" +
    "<h5>Compuestos de dos no metales</h5>" +
    "<p>Cuando los dos elementos son no metales, el que se escribe <b>primero</b> es el que aparece antes en la lista IUPAC (<b>B, Si, C, Sb, As, P, N, H, Te, Se, S, I, Br, Cl, O, F</b>), que se nombra al final; el otro lleva «-uro». Como los dos pueden tener varios números de oxidación, la <b>sistemática</b> es la más utilizada, con prefijos en los dos. En Stock, el número romano es el del primer elemento (el que actúa con signo positivo).</p>" +
    tabla(["Fórmula", "Sistemática", "Stock"], [
      [fm("CCl4"), nm("CCl4", "sist"), nm("CCl4", "stock")],
      [fm("CS2"), nm("CS2", "sist"), nm("CS2", "stock")],
      [fm("SF6"), nm("SF6", "sist"), nm("SF6", "stock")],
      [fm("PCl3"), nm("PCl3", "sist"), nm("PCl3", "stock")],
      [fm("PCl5"), nm("PCl5", "sist"), nm("PCl5", "stock")],
      [fm("BN"), nm("BN", "sist"), nm("BN", "stock")],
      [fm("SiC"), nm("SiC", "sist"), nm("SiC", "stock")],
      [fm("Si3N4"), nm("Si3N4", "sist"), nm("Si3N4", "stock")],
      [fm("As2S3"), nm("As2S3", "sist"), nm("As2S3", "stock")],
      [fm("ICl"), nm("ICl", "sist"), nm("ICl", "stock")],
      [fm("BrF3"), nm("BrF3", "sist"), nm("BrF3", "stock")]
    ]) +
    "<p>Un detalle del lenguaje: en el nombre aparece primero el anión (el elemento que se escribe a la derecha de la fórmula) y después el otro. Por eso el SF₆ se escribe con el S delante, pero se llama «hexafluoruro de azufre»: se dice primero el flúor. Es la misma regla que en «tetracloruro de carbono» y en «cloruro de sodio».</p>" +
    "<h5>Los tres sistemas, comparados</h5>" +
    tabla(["", "Sistemática", "Stock", "Tradicional"], [
      ["Cómo se construye", "Prefijos que cuentan átomos: mono-, di-, tri-, tetra-, penta-, hexa-, hepta-", "Número de oxidación en romanos entre paréntesis, solo si hay más de uno", "Sufijos -oso/-ico y prefijos hipo-/per- sobre el nombre del elemento"],
      ["Ejemplo con hierro", nm("Fe2O3", "sist"), nm("Fe2O3", "stock"), nm("Fe2O3", "trad")],
      ["Ejemplo con cloro", nm("Cl2O7", "sist"), nm("Cl2O7", "stock"), nm("Cl2O7", "trad")],
      ["Ventaja", "Sin ambigüedad: se deduce la fórmula del nombre", "Más corta; muy extendida", "Conserva nombres históricos: ácido sulfúrico, nitrato"],
      ["Límite", "Nombres largos", "Hay que conocer los números de oxidación", "No distingue más de 2 o 4 estados; en desuso para óxidos e hidróxidos"]
    ]) +
    "<p>Los prefijos y los romanos no se mezclan en un mismo nombre: <i>tricloruro de hierro</i> (sistemática) o <i>cloruro de hierro(III)</i> (Stock), pero no «tricloruro de hierro(III)». Para completar la idea, los prefijos <b>bis-, tris-, tetrakis-</b> se reservan para grupos de átomos que ya tienen su propio prefijo o que son complejos (bis(tetraoxidosulfato)), y se verán con las oxisales.</p>" +
    tabla(["Prefijo", "mono-", "di-", "tri-", "tetra-", "penta-", "hexa-", "hepta-", "octa-"], [["Cuenta", "1", "2", "3", "4", "5", "6", "7", "8"], ["Para grupos", "—", "bis", "tris", "tetrakis", "pentakis", "hexakis", "heptakis", "—"]]) +
    wa("q3_pares", { fams: ["salBin", "oxido", "hidroxido", "hidruroM", "oxoacido", "oxisal"], fam: "salBin" }) +
    wa("q3_entrenador", { titulo: "Entrenador de sales binarias", fams: ["salBin"], fam: "salBin" });

  B.parte.t3b = { secciones: secciones };
})(window);
