/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte C: secciones nuevas 7 a 10: peróxidos, iones, oxisales y sales ácidas)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function tabla(c, f) { return H.tabla(c, f, "q3t"); }
  var F = B.lab.formulacion, T = B.parte.t3, fm = T.fm, nm = T.nm, bn = T.bn, sg = T.sg, w = T.w, wa = T.wa;
  function fila3(f) { return [fm(f), nm(f, "sist"), nm(f, "stock"), nm(f, "trad")]; }
  function fila2(f) { return [fm(f), nm(f, "sist"), nm(f, "stock")]; }
  var nuevas = [];

  // ================================================================ 7. Peróxidos
  nuevas.push({ h: "7. Peróxidos y la pareja óxido–peróxido", html:
    "<h5>El grupo peróxido: dos oxígenos unidos</h5>" +
    "<p>Hay compuestos del oxígeno en los que dos átomos de oxígeno están unidos entre sí (O–O). Cada uno de ellos tiene número de oxidación <b>−1</b> y el conjunto se comporta como un anión de carga −2, el <b>ion peróxido</b>, O₂²⁻. Para formularlos se cruza con el grupo O₂ <b>sin simplificarlo</b>: cada «O₂» es una unidad. Por eso el peróxido de sodio es <b>Na₂O₂</b> (y no «NaO»), el de calcio es <b>CaO₂</b> y el de hidrógeno, <b>H₂O₂</b>. Si el grupo necesita subíndice mayor que 1, va entre paréntesis: (O₂)₃.</p>" +
    "<p>La nomenclatura es sencilla. En Stock y en tradicional se dice «<b>peróxido de</b> + elemento» (con número romano o -oso/-ico si hace falta). En sistemática hay que contar los átomos de oxígeno: «<b>dióxido de</b> + …», porque son dos O por cada grupo.</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [fila3("H2O2"), fila3("Li2O2"), fila3("Na2O2"), fila3("MgO2"), fila3("CaO2"), fila3("BaO2"), fila3("ZnO2"), fila3("Ag2O2"), fila3("Cu2O2"), fila3("CuO2")]) +
    "<h5>Óxido o peróxido: cómo distinguirlos</h5>" +
    "<p>La fórmula de un peróxido tiene un oxígeno de más que el óxido del mismo metal, y no puedes simplificarla. Compara las parejas:</p>" +
    tabla(["Metal", "Óxido (O con −2)", "Peróxido (O₂ con −2)"], [
      ["Sodio", fm("Na2O") + " · " + nm("Na2O", "stock"), fm("Na2O2") + " · " + nm("Na2O2", "stock")],
      ["Calcio", fm("CaO") + " · " + nm("CaO", "stock"), fm("CaO2") + " · " + nm("CaO2", "stock")],
      ["Bario", fm("BaO") + " · " + nm("BaO", "stock"), fm("BaO2") + " · " + nm("BaO2", "stock")],
      ["Hidrógeno", fm("H2O") + " · " + nm("H2O", "stock"), fm("H2O2") + " · " + nm("H2O2", "stock")],
      ["Cobre(I)", fm("Cu2O") + " · " + nm("Cu2O", "stock"), fm("Cu2O2") + " · " + nm("Cu2O2", "stock")]
    ]) +
    "<p>Con la regla 3 de los números de oxidación se ve la diferencia: en el H₂O₂, 2·(+1) + 2·<i>x</i> = 0 y <i>x</i> = −1 (no −2). Esa es también la razón de que sean oxidantes enérgicos: el oxígeno con −1 «quiere» llegar a −2.</p>" +
    "<p><b>Usos:</b> el agua oxigenada (H₂O₂ al 3 %) desinfecta heridas y blanquea el pelo; en los submarinos y las naves espaciales el peróxido de sodio regenera el aire: 2 Na₂O₂ + 2 CO₂ → 2 Na₂CO₃ + O₂, de modo que absorbe el CO₂ que exhalamos y libera el oxígeno que necesitamos.</p>" +
    ejemplo("Formula el peróxido de bario y el peróxido de cobre(I); nombra el K₂O₂ en los tres sistemas", "Peróxido = grupo O₂ con carga −2; no se simplifica.", [
      "Bario (+2) con O₂ (−2): Ba₂(O₂)₂ → los dos subíndices se simplifican entre 2 porque el grupo O₂ es una unidad: " + fm("BaO2") + ".",
      "Cobre(I) (+1) con O₂ (−2): Cu₂(O₂)₁ → " + fm("Cu2O2") + " (aquí no hay nada que simplificar: 2 y 1).",
      "K₂O₂: sistemática " + bn("K2O2", "sist") + "; Stock " + bn("K2O2", "stock") + "; tradicional " + bn("K2O2", "trad") + "."
    ]) +
    ojo("«Na₂O₂» no se escribe «NaO»: el grupo peróxido O₂ no se puede partir. Pero en el CaO₂ el subíndice 2 del oxígeno es el del grupo O₂ (hay un solo ion Ca²⁺ por cada O₂²⁻), no el de un óxido con dos oxígenos. Si dudas, calcula las cargas: Ca²⁺ + O₂²⁻ = 0.") +
    wa("q3_entrenador", { titulo: "Entrenador: óxidos y peróxidos", fams: ["oxido", "peroxido"], fam: "peroxido" })
  });

  // ================================================================ 8. Iones
  var CAT = ["Li+", "Na+", "K+", "Ag+", "NH4+", "H3O+", "Mg2+", "Ca2+", "Ba2+", "Zn2+", "Cu+", "Cu2+", "Fe2+", "Fe3+", "Al3+", "Pb2+", "Pb4+", "Sn2+", "Sn4+"];
  var ANI = ["Cl-", "S2-", "N3-", "O2-", "H-", "OH-", "O22-", "SO42-", "SO32-", "NO3-", "NO2-", "CO32-", "PO43-", "ClO-", "ClO2-", "ClO3-", "ClO4-", "MnO4-", "CrO42-", "Cr2O72-", "HCO3-", "HSO4-", "H2PO4-", "HPO42-", "HS-"];
  function filaCat(f) { return [fm(f), nm(f, "stock"), nm(f, "sist"), nm(f, "trad")]; }
  function filaAn(f) {
    var r = F.hallar(f), tr = nm(f, "stock");
    return [fm(f), tr.replace(/^ion /, ""), nm(f, "sist")];
  }
  nuevas.push({ h: "8. Iones: cationes y aniones", html:
    "<h5>Las piezas de los compuestos iónicos</h5>" +
    "<p>Un <b>ion</b> es un átomo (o un grupo de átomos) con carga eléctrica. Si ha perdido electrones, es un <b>catión</b> (carga positiva); si los ha ganado, un <b>anión</b> (carga negativa). Los compuestos iónicos son redes de cationes y aniones en proporciones tales que la carga total es cero (Tema 2). Conocer los iones habituales por su nombre, fórmula y carga es la mejor forma de aprender a formular: cada sal es «un catión + un anión» y la fórmula se obtiene igualando las cargas, como en el cruce.</p>" +
    "<h5>Cationes</h5>" +
    "<p>Un catión monoatómico se llama «<b>catión</b> (o <b>ion</b>) + nombre del elemento»; si el elemento tiene varios números de oxidación se añade el romano (Stock) o la carga con su signo (la recomendación IUPAC: «hierro(3+)»). En la tradicional, -oso/-ico: «ion ferroso» (Fe²⁺), «ion férrico» (Fe³⁺). Hay dos cationes poliatómicos muy comunes: el <b>amonio</b>, NH₄⁺, y el <b>oxonio</b> (o hidronio), H₃O⁺, que es el ion que hace ácidas las disoluciones acuosas.</p>" +
    tabla(["Ion", "Nombre (Stock)", "Nombre (IUPAC con carga)", "Tradicional"], CAT.map(filaCat)) +
    "<h5>Aniones</h5>" +
    "<p>Los aniones monoatómicos terminan en <b>-uro</b> (cloruro, sulfuro, nitruro); los de oxígeno y de hidrógeno son <b>óxido</b> (O²⁻) e <b>hidruro</b> (H⁻), y el grupo OH⁻ es el <b>hidróxido</b>. Los aniones poliatómicos que contienen oxígeno (oxoaniones) salen de los oxoácidos quitándoles los H⁺ y cambiando el sufijo: <b>-ico → -ato</b> y <b>-oso → -ito</b>, con los mismos prefijos hipo- y per-. La carga del anión es el número de H⁺ perdidos: H₂SO₄ − 2 H⁺ = SO₄²⁻ (sulfato); H₃PO₄ − 3 H⁺ = PO₄³⁻ (fosfato); HNO₃ − H⁺ = NO₃⁻ (nitrato). Si el ácido conserva algún H, el anión lleva el prefijo «hidrogeno» (HCO₃⁻, hidrogenocarbonato).</p>" +
    tabla(["Ion", "Nombre", "IUPAC (sistemática, con carga)"], ANI.map(filaAn)) +
    "<p>Aprender estos 20 o 25 aniones, de memoria y con su carga, es lo que más tiempo ahorra el día del examen. Un truco con la serie del cloro: <b>ClO⁻, ClO₂⁻, ClO₃⁻, ClO₄⁻</b> son hipoclorito, clorito, clorato y perclorato (1, 2, 3 y 4 oxígenos); todos tienen carga −1 porque proceden de ácidos con un solo H.</p>" +
    ejemplo("Deduce el nombre y la carga del anión que sale del ácido fosfórico al quitarle 1, 2 y 3 H⁺", "H₃PO₄ pierde H⁺ uno a uno; cada H⁺ perdido añade una carga negativa.", [
      "H₃PO₄ − 1 H⁺ → <b>H₂PO₄⁻</b> (carga −1): " + bn("H2PO4-", "stock") + ".",
      "H₃PO₄ − 2 H⁺ → <b>HPO₄²⁻</b> (carga −2): " + bn("HPO42-", "stock") + ".",
      "H₃PO₄ − 3 H⁺ → <b>PO₄³⁻</b> (carga −3): " + bn("PO43-", "stock") + ".",
      "Comprobación del n.º de oxidación del P en los tres: +5 (por ejemplo, en HPO₄²⁻: 1 + <i>x</i> − 8 = −2 → <i>x</i> = +5)."
    ]) +
    w("q3_ajuste") +
    ojo("La carga de un ion no es un subíndice: en SO₄²⁻ el «2−» indica la carga de todo el grupo y el «4» el número de oxígenos. Y el número de oxidación se escribe con el signo delante (+6) mientras que la carga lleva el signo detrás (2−): <b>S</b> tiene +6 y el ion SO₄ tiene 2−.") +
    wa("q3_entrenador", { titulo: "Entrenador de iones", fams: ["ion"], fam: "ion", modo: "mix", sis: "any" })
  });

  // ================================================================ 9. Oxisales
  nuevas.push({ h: "9. Oxisales: las sales de los oxoácidos", html:
    "<h5>Cómo se forman</h5>" +
    "<p>Una <b>oxisal</b> (o sal ternaria) es lo que queda al sustituir <b>todos</b> los hidrógenos de un oxoácido por un metal (o por NH₄⁺). Se obtienen por neutralización de un ácido con un hidróxido: H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O. Su fórmula se escribe con el catión delante y el anión detrás, igualando cargas: " + fm("Na2SO4") + " (2 Na⁺ por cada SO₄²⁻), " + fm("Fe2(SO4)3") + " (2 Fe³⁺ y 3 SO₄²⁻: 6 cargas + y 6 −), " + fm("Ca3(PO4)2") + " (3 Ca²⁺ y 2 PO₄³⁻: 6 y 6).</p>" +
    w("q3_sales") +
    "<h5>Cómo se nombran</h5>" +
    "<ul><li><b>Tradicional</b> (y Stock simplificada): «nombre del anión + de + metal», con el número romano o el -oso/-ico si hay varias valencias: <i>sulfato de sodio</i>, <i>sulfato de hierro(III)</i> o <i>sulfato férrico</i>. El nombre del anión sale del ácido (-ico → -ato, -oso → -ito).</li>" +
    "<li><b>Sistemática</b>: el anión se nombra con la forma «oxido» (<i>tetraoxidosulfato</i>); si hay más de un anión se usan los prefijos <b>bis, tris, tetrakis</b> y el anión va <b>entre paréntesis</b>; el metal lleva prefijo di-, tri-…: <i>tris(tetraoxidosulfato) de dihierro</i>.</li>" +
    "<li><b>Stock completa</b> (IUPAC 2005): se añade el número de oxidación del no metal del anión entre paréntesis y el del metal: <i>tetraoxidosulfato(VI) de hierro(III)</i>. Es larga; en la práctica se usa la forma «sulfato de hierro(III)».</li></ul>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [fila3("Na2SO4"), fila3("CaCO3"), fila3("KNO3"), fila3("AgNO3"), fila3("Fe2(SO4)3"), fila3("FeSO4"), fila3("Cu(NO3)2"), fila3("Ca3(PO4)2"), fila3("Al2(SO4)3"), fila3("(NH4)2SO4"), fila3("Mg(NO3)2"), fila3("Pb(NO3)2")]) +
    "<h5>Las series de los halógenos y del azufre en las sales</h5>" +
    "<p>Cada oxoácido da sus sales con el mismo esquema. Las cuatro del cloro con el sodio, de menos a más oxígeno, son " + fm("NaClO") + " (" + nm("NaClO", "trad") + "), " + fm("NaClO2") + " (" + nm("NaClO2", "trad") + "), " + fm("NaClO3") + " (" + nm("NaClO3", "trad") + ") y " + fm("NaClO4") + " (" + nm("NaClO4", "trad") + "). Del azufre: " + fm("Na2SO3") + " (" + nm("Na2SO3", "trad") + ") y " + fm("Na2SO4") + " (" + nm("Na2SO4", "trad") + "). Del nitrógeno: " + fm("NaNO2") + " (" + nm("NaNO2", "trad") + ") y " + fm("NaNO3") + " (" + nm("NaNO3", "trad") + ").</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [fila3("KMnO4"), fila3("K2Cr2O7"), fila3("K2CrO4"), fila3("NaClO"), fila3("KClO3"), fila3("Mg(ClO4)2"), fila3("Na3PO3"), fila3("Na2SiO3")]) +
    "<p>Ten en cuenta que, en la sistemática, el prefijo «bis-» (2), «tris-» (3) o «tetrakis-» (4) cuenta los grupos del anión; y los prefijos di-, tri-, tetra-, los átomos del metal. En Ca₃(PO₄)₂ hay <i>tres</i> calcios (tri-) y <i>dos</i> fosfatos (bis-): <b>bis(tetraoxidofosfato) de tricalcio</b>.</p>" +
    ejemplo("Formula el sulfato de hierro(II) y el nitrato de cobre(II); nombra el Ca(ClO₃)₂", "Cruza el catión con el anión (con su carga) y pon paréntesis al grupo si se repite.", [
      "Sulfato de hierro(II): Fe²⁺ y SO₄²⁻ → cruce Fe₂(SO₄)₂ → simplifica entre 2 → " + fm("FeSO4") + ".",
      "Nitrato de cobre(II): Cu²⁺ y NO₃⁻ → " + fm("Cu(NO3)2") + " (el grupo nitrato se repite: paréntesis).",
      "Ca(ClO₃)₂: ClO₃⁻ es el clorato (Cl +5). Tradicional/Stock: " + bn("Ca(ClO3)2", "stock") + "; sistemática: " + bn("Ca(ClO3)2", "sist") + "."
    ]) +
    "<p><b>Usos:</b> el hipoclorito de sodio es la lejía; el nitrato de potasio, uno de los componentes de la pólvora y de los abonos; el carbonato de calcio, la caliza y el mármol; el permanganato de potasio, un desinfectante; el fosfato de calcio es el componente principal de huesos y dientes; el sulfato de cobre(II) se usa en fungicidas; el nitrato de plata, en fotografía clásica y en medicina.</p>" +
    ojo("El «nitrito» (NO₂⁻) y el «nitrato» (NO₃⁻), el «sulfito» y el «sulfato» se parecen mucho y se confunden en los exámenes: -ito = menos oxígenos, -ato = más oxígenos. Y no mezcles «-uro» (sin oxígeno: cloruro) con «-ato/-ito» (con oxígeno: clorato, hipoclorito).") +
    wa("q3_entrenador", { titulo: "Entrenador de oxisales", fams: ["oxisal"], fam: "oxisal" })
  });

  // ================================================================ 10. Sales ácidas
  nuevas.push({ h: "10. Sales ácidas: cuando el ácido no pierde todos sus hidrógenos", html:
    "<h5>Un ácido con más de un H puede dar sales a medias</h5>" +
    "<p>Los ácidos con dos o más hidrógenos (H₂SO₄, H₂CO₃, H₃PO₄, H₂S…) no tienen por qué perderlos todos a la vez. Si pierden solo una parte, el anión conserva algún H y las sales resultantes se llaman <b>sales ácidas</b> (o hidrogenosales). El anión se nombra con el prefijo «<b>hidrogeno</b>» (con di-, tri- si son varios) pegado al nombre del anión: HSO₄⁻ <i>hidrogenosulfato</i>, HCO₃⁻ <i>hidrogenocarbonato</i>, H₂PO₄⁻ <i>dihidrogenofosfato</i>, HPO₄²⁻ <i>hidrogenofosfato</i>, HS⁻ <i>hidrogenosulfuro</i>. La carga del anión baja en una unidad por cada H que se conserva: PO₄³⁻ (−3), HPO₄²⁻ (−2), H₂PO₄⁻ (−1).</p>" +
    "<p>Se formulan igual que las oxisales, pero con el anión «ácido» y su carga: Na⁺ con HCO₃⁻ → " + fm("NaHCO3") + "; Ca²⁺ con HCO₃⁻ → " + fm("Ca(HCO3)2") + " (el grupo se repite: paréntesis); K⁺ con H₂PO₄⁻ → " + fm("KH2PO4") + ".</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [fila3("NaHCO3"), fila3("Ca(HCO3)2"), fila3("KHSO4"), fila3("NaHSO3"), fila3("KH2PO4"), fila3("Na2HPO4"), fila3("NaHS"), fila3("Mg(HCO3)2"), fila3("Fe(HSO4)3")]) +
    "<p>En la <b>sistemática</b> el prefijo «hidrogeno» se pega al nombre del anión con oxígenos: «hidrogenotrioxidocarbonato de sodio». Los nombres tradicionales antiguos también se encuentran: «carbonato ácido de sodio», «bicarbonato de sodio» (este último es el que verás en la cocina y en la farmacia), «bisulfato», «bisulfito», «fosfato diácido» (H₂PO₄⁻) y «fosfato monoácido» (HPO₄²⁻). Todos son correctos, pero la recomendación actual es la de hidrógeno- porque indica cuántos H quedan.</p>" +
    "<p><b>Dónde las encuentras:</b> el bicarbonato sódico (NaHCO₃) es la levadura química y un antiácido; el hidrogenocarbonato de calcio disuelto en el agua es el responsable del agua «dura», y al calentarla o al liberar CO₂ vuelve a dar carbonato (Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O), que forma la cal de los grifos y las estalactitas de las cuevas; los dihidrogenofosfatos son abonos y aditivos alimentarios (levaduras, E-340).</p>" +
    ejemplo("Formula el hidrogenosulfato de hierro(III) y el dihidrogenofosfato de calcio; nombra el KHSO₃", "Anión ácido con su carga + catión con su valencia; cruza.", [
      "Hidrogenosulfato de hierro(III): Fe³⁺ y HSO₄⁻ (carga −1) → Fe(HSO₄)₃ = " + fm("Fe(HSO4)3") + " (3 grupos: paréntesis).",
      "Dihidrogenofosfato de calcio: Ca²⁺ y H₂PO₄⁻ (−1) → Ca(H₂PO₄)₂ = " + fm("Ca(H2PO4)2") + ".",
      "KHSO₃: el anión HSO₃⁻ procede del H₂SO₃ (sulfuroso, S +4), así que es el hidrogenosulfito: " + bn("KHSO3", "stock") + ". Sistemática: " + bn("KHSO3", "sist") + "."
    ]) +
    ojo("Si un ácido solo tiene un H (HNO₃, HClO₄, HCl) no puede dar sales ácidas: no existe el «hidrogenonitrato». Y no confundas «hidróxido» (OH⁻) con «hidrogeno-» (un H que se conserva en el anión): el NaOH es una base y el NaHCO₃ es una sal.") +
    wa("q3_entrenador", { titulo: "Entrenador de sales ácidas", fams: ["salAcida", "oxisal"], fam: "salAcida" })
  });

  B.parte.t3c = { nuevas: nuevas };
})(window);
