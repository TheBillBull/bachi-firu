/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte A: ayudantes y ampliación de las secciones 1 a 3: valencia, óxidos e hidróxidos)
   Todo nombre y toda fórmula que aparece en la teoría sale del motor B.lab.formulacion (verificado aparte
   con herramientas/verificar_fyq1_t3.py): cada uso queda anotado en USADOS y se comprueba de forma independiente.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function tabla(c, f) { return H.tabla(c, f, "q3t"); }
  var F = B.lab.formulacion;
  B.parte = B.parte || {};
  var USADOS = [];

  // ------------------------------------------------------------ ayudantes
  function R(f) { var r = F.hallar(f); if (!r && global.console) console.error("tema 3: compuesto fuera del catálogo: " + f); return r; }
  function reg(f, sis, t, q) { USADOS.push({ f: F.hallar(f) ? F.hallar(f).f : f, sis: sis, t: t || "", q: q || 0 }); }
  function fm(f) { var r = R(f); if (!r) return F.pintar(f); reg(f, "formula", "", r.ion ? r.q : 0); return F.html(r); }          // fórmula con subíndices
  function nm(f, sis, i) {                                                                                                    // nombre del motor
    var r = R(f), n = r ? F.nombres(r, sis)[i || 0] : null;
    if (!n) { if (global.console) console.error("tema 3: sin nombre " + sis + " para " + f); return String(f); }
    reg(f, sis, n, r.ion ? r.q : 0); return n;
  }
  function bn(f, sis, i) { return "<b>" + nm(f, sis, i) + "</b>"; }
  function sg(n) { return (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n); }
  // ecuación de números de oxidación de un compuesto con el elemento x desconocido (pasos para un ejemplo)
  function ecOx(f, x) { var r = R(f), e = F.ecuacionOx(r, x); reg(f, "formula", "", r.ion ? r.q : 0); return { eq: e.eq, x: e.x }; }
  function w(n, ref) { return H.w(n, ref && "fyq1/t3/" + ref); }
  function wa(n, args) { return "<div data-w='" + n + "' data-args='" + JSON.stringify(args) + "'></div>"; }
  B.parte.t3 = { R: R, reg: reg, fm: fm, nm: nm, bn: bn, sg: sg, ecOx: ecOx, w: w, wa: wa, USADOS: USADOS };

  var secciones = {};

  // ================================================================ 1. La valencia
  secciones[0] =
    "<h5>Valencia y número de oxidación: dos nombres para una misma idea</h5>" +
    "<p>En los libros de Bachillerato verás las dos palabras casi como sinónimas. Conviene distinguir el matiz. La <b>valencia</b> es la «capacidad de combinación» de un átomo: un número sin signo. El <b>número de oxidación</b> (n.º de oxidación) es la carga que tendría el átomo si todos sus enlaces fueran iónicos: lleva <b>signo</b>, positivo para el que cede electrones y negativo para el que los gana. Para formular necesitamos el signo, porque nos dice quién hace de catión (el que se escribe primero) y quién de anión. Por eso, en lo que sigue, trabajamos con números de oxidación: Na = +1, Ca = +2, O = −2, Cl = −1.</p>" +
    "<p>Las <b>recomendaciones de la IUPAC de 2005</b> (el «Libro Rojo» de la química inorgánica) son la referencia actual. Admiten tres formas de nombrar un mismo compuesto, y las tres se estudian en este tema: la <b>sistemática</b> (con prefijos que cuentan átomos), la de <b>Stock</b> (con el número de oxidación en romanos) y la <b>tradicional</b> (con los sufijos -oso e -ico y los prefijos hipo- y per-).</p>" +
    "<h5>Seis reglas para asignar números de oxidación</h5>" +
    "<ol>" +
    "<li><b>Un elemento sin combinar</b> tiene n.º de oxidación 0: Na, Fe, O₂, S₈, Cl₂.</li>" +
    "<li>En un <b>ion monoatómico</b> es su carga: Cl⁻ = −1, Fe³⁺ = +3, S²⁻ = −2.</li>" +
    "<li>El <b>oxígeno</b> es −2 (salvo en los peróxidos, donde vale −1, y en su compuesto con el flúor).</li>" +
    "<li>El <b>hidrógeno</b> es +1 (salvo en los hidruros metálicos, donde vale −1).</li>" +
    "<li>El <b>flúor</b> es siempre −1; los metales alcalinos (+1), los alcalinotérreos (+2) y el aluminio (+3) tienen un único valor.</li>" +
    "<li>La <b>suma</b> de los números de oxidación de todos los átomos es la <b>carga</b> de la especie: 0 en un compuesto neutro, la carga del ion en un ion.</li>" +
    "</ol>" +
    "<p>La regla 6 es la herramienta de cálculo: si conoces todos los números menos uno, lo despejas. Y es también la razón de fondo del cruce de valencias.</p>" +
    ejemplo("Calcula el número de oxidación del azufre en H₂SO₄ y del manganeso en KMnO₄", "Aplica la regla 6 con los valores fijos: H +1, O −2, K +1.", [
      "H₂SO₄ (neutro): " + ecOx("H2SO4", "S").eq + " → S = <b>" + sg(ecOx("H2SO4", "S").x) + "</b>.",
      "KMnO₄ (neutro): " + ecOx("KMnO4", "Mn").eq + " → Mn = <b>" + sg(ecOx("KMnO4", "Mn").x) + "</b>.",
      "Un ion, Cr₂O₇²⁻: la suma vale −2: " + ecOx("Cr2O72-", "Cr").eq + " → Cr = <b>" + sg(ecOx("Cr2O72-", "Cr").x) + "</b>."
    ]) +
    w("q3_noxid") +
    "<h5>Los números de oxidación que usaremos</h5>" +
    "<p>Los <b>metales de los grupos 1, 2 y 13</b> (y la plata y el cinc) tienen un solo número de oxidación y no hay que aclararlo. Los metales de transición, y el estaño y el plomo, tienen varios: en esos casos hay que decir cuál se usa (con números romanos en la nomenclatura de Stock, con -oso/-ico en la tradicional). Los no metales actúan con signo negativo cuando son el elemento más electronegativo del compuesto (cloruro, sulfuro, óxido) y con signo positivo cuando se combinan con otros más electronegativos (sobre todo con el oxígeno).</p>" +
    tabla(["Tipo", "Elementos", "Números de oxidación"], [
      ["Metales de valencia única", "Li, Na, K, Rb, Cs, Ag<br>Be, Mg, Ca, Sr, Ba, Zn, Cd<br>Al", "+1<br>+2<br>+3"],
      ["Metales de valencia variable", "Cu · Au<br>Fe · Co · Ni<br>Sn · Pb · Pt<br>Hg<br>Cr · Mn", "+1, +2 · +1, +3<br>+2, +3<br>+2, +4<br>+2 (el Hg₂²⁺ no se usa aquí)<br>+2, +3 (y +6 en CrO₃) · +2, +3, +4 (y +6, +7 en oxoácidos)"],
      ["Hidrógeno", "H", "+1 (con no metales) · −1 (con metales)"],
      ["Halógenos", "F · Cl, Br, I", "−1 · −1, +1, +3, +5, +7 (con O)"],
      ["Anfígenos (grupo 16)", "O · S, Se, Te", "−2 (−1 en peróxidos) · −2, +2, +4, +6"],
      ["Nitrogenoideos (grupo 15)", "N · P, As, Sb", "−3, +1, +2, +3, +4, +5 · −3, +3, +5"],
      ["Grupos 13 y 14", "C · Si · B", "−4, +2, +4 · −4, +4 · +3 (−3)"]
    ]) +
    w("q3_tabla") +
    "<h5>El cruce de valencias, paso a paso (y por qué funciona)</h5>" +
    "<p>Un compuesto es neutro: las cargas positivas y las negativas se compensan. Si el catión tiene carga +<i>m</i> y el anión −<i>n</i>, hacen falta <i>n</i> cationes por cada <i>m</i> aniones para que la suma sea cero: <i>n</i>·(+<i>m</i>) + <i>m</i>·(−<i>n</i>) = 0. Eso es exactamente lo que hace el «cruce»: la carga de cada uno pasa a ser el subíndice del otro. Después, si los dos subíndices se pueden dividir por el mismo número, se simplifican, porque la fórmula expresa la proporción más pequeña.</p>" +
    "<ol class='lam-pasos'>" +
    "<li>Escribe los símbolos con sus números de oxidación: el que actúa con signo positivo, delante.</li>" +
    "<li>Cruza los números (sin signo): el del primero será el subíndice del segundo, y al revés.</li>" +
    "<li>Simplifica si los dos subíndices tienen un divisor común. El subíndice 1 no se escribe.</li>" +
    "<li>Si un grupo de átomos (OH, SO₄, NO₃…) necesita subíndice mayor que 1, ponlo entre paréntesis.</li>" +
    "<li>Comprueba la suma de cargas: debe dar 0.</li>" +
    "</ol>" +
    tabla(["Combinación", "Cruce", "¿Se simplifica?", "Fórmula"], [
      ["Ca (+2) con O (−2)", "Ca₂O₂", "sí, entre 2", fm("CaO")],
      ["Al (+3) con O (−2)", "Al₂O₃", "no (2 y 3)", fm("Al2O3")],
      ["Fe (+3) con Cl (−1)", "Fe₁Cl₃", "no", fm("FeCl3")],
      ["Sn (+4) con O (−2)", "Sn₂O₄", "sí, entre 2", fm("SnO2")],
      ["Ca (+2) con OH (−1)", "Ca₁(OH)₂", "no; el grupo OH va entre paréntesis", fm("Ca(OH)2")],
      ["Al (+3) con SO₄ (−2)", "Al₂(SO₄)₃", "no", fm("Al2(SO4)3")],
      ["Ca (+2) con PO₄ (−3)", "Ca₃(PO₄)₂", "no", fm("Ca3(PO4)2")]
    ]) +
    w("q3_ajuste") + w("q3_cruce") +
    ojo("Cruzar no es lo mismo que «poner la valencia de subíndice». Con Al³⁺ y O²⁻ la fórmula es Al₂O₃ (el 3 del aluminio acaba en el oxígeno y el 2 del oxígeno, en el aluminio), no Al₃O₂. Y con Ca²⁺ y O²⁻ no es Ca₂O₂: tras cruzar hay que simplificar, y queda CaO.") +
    "<h5>Qué se escribe primero (y cómo se lee una fórmula)</h5>" +
    "<p>En una fórmula, delante va el elemento <b>menos electronegativo</b> (el que actúa con número de oxidación positivo): el metal en las sales y óxidos metálicos (NaCl, CaO), el hidrógeno en los ácidos (HCl, H₂SO₄), el no metal en un óxido de no metal (CO₂). Cuando se combinan dos no metales, la IUPAC da un orden de referencia: <b>B, Si, C, Sb, As, P, N, H, Te, Se, S, I, Br, Cl, O, F</b>. El que aparece antes en esa lista se escribe antes y se nombra al final («tetracloruro de <i>carbono</i>», «hexafluoruro de <i>azufre</i>»). Los subíndices indican cuántos átomos hay de cada elemento: en Fe₂(SO₄)₃ hay 2 Fe, 3 S y 12 O (3 × 4), un total de 17 átomos.</p>";

  // ================================================================ 2. Óxidos
  secciones[1] =
    "<h5>Formulación: cruce con el oxígeno (−2)</h5>" +
    "<p>La fórmula general es M₂Oₙ cuando el elemento tiene número de oxidación +<i>n</i> y <i>n</i> es impar, y MO<sub><i>n</i>/2</sub> cuando es par. Así: " + fm("Na2O") + " (+1), " + fm("CaO") + " (+2), " + fm("Al2O3") + " (+3), " + fm("SnO2") + " (+4), " + fm("P2O5") + " (+5), " + fm("SO3") + " (+6), " + fm("Cl2O7") + " (+7). Los óxidos de los metales se llaman <b>óxidos básicos</b> y los de los no metales, <b>óxidos ácidos</b>, porque al reaccionar con agua dan, respectivamente, hidróxidos y oxoácidos (por eso la sección 4 empieza en ellos).</p>" +
    "<h5>Los tres sistemas de nomenclatura de los óxidos</h5>" +
    "<p>La <b>sistemática</b> cuenta átomos con los prefijos <b>mono-, di-, tri-, tetra-, penta-, hexa-, hepta-</b>: se nombra «prefijo + óxido de prefijo + elemento». El «mono-» se puede omitir si no hay ambigüedad, pero se mantiene en el monóxido de carbono para distinguirlo del dióxido. La de <b>Stock</b> escribe «óxido de + elemento» y, entre paréntesis y en romanos, el número de oxidación del elemento <b>solo si tiene más de uno</b>. La <b>tradicional</b> añade al nombre latino del metal -oso (número de oxidación menor) o -ico (mayor).</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [
      [fm("Na2O"), nm("Na2O", "sist"), nm("Na2O", "stock"), nm("Na2O", "trad")],
      [fm("CaO"), nm("CaO", "sist"), nm("CaO", "stock"), nm("CaO", "trad")],
      [fm("FeO"), nm("FeO", "sist"), nm("FeO", "stock"), nm("FeO", "trad")],
      [fm("Fe2O3"), nm("Fe2O3", "sist"), nm("Fe2O3", "stock"), nm("Fe2O3", "trad")],
      [fm("Cu2O"), nm("Cu2O", "sist"), nm("Cu2O", "stock"), nm("Cu2O", "trad")],
      [fm("CuO"), nm("CuO", "sist"), nm("CuO", "stock"), nm("CuO", "trad")],
      [fm("Al2O3"), nm("Al2O3", "sist"), nm("Al2O3", "stock"), nm("Al2O3", "trad")],
      [fm("PbO2"), nm("PbO2", "sist"), nm("PbO2", "stock"), nm("PbO2", "trad")]
    ]) +
    "<p>Los nombres latinos de la tradicional son: <b>ferr-</b> (hierro), <b>cupr-</b> (cobre), <b>aur-</b> (oro), <b>estann-</b> (estaño), <b>plumb-</b> (plomo), <b>mercur-</b> (mercurio), <b>cobalt-</b> y <b>niquel-</b>. Para los metales que solo tienen una valencia se usa el nombre normal («óxido de calcio»); en los libros antiguos verás «óxido cálcico», «óxido sódico»: es la misma idea con la terminación -ico.</p>" +
    w("q3_comparador") +
    "<h5>Óxidos de no metales</h5>" +
    "<p>Los no metales forman varios óxidos y por eso en Stock casi siempre llevan número romano. En la sistemática, los prefijos son indispensables para distinguirlos: " + nm("CO", "sist") + " y " + nm("CO2", "sist") + "; " + nm("N2O", "sist") + ", " + nm("NO", "sist") + " y " + nm("NO2", "sist") + ".</p>" +
    tabla(["Fórmula", "n.º ox.", "Sistemática", "Stock"], [
      [fm("CO"), "+2", nm("CO", "sist"), nm("CO", "stock")],
      [fm("CO2"), "+4", nm("CO2", "sist"), nm("CO2", "stock")],
      [fm("SO2"), "+4", nm("SO2", "sist"), nm("SO2", "stock")],
      [fm("SO3"), "+6", nm("SO3", "sist"), nm("SO3", "stock")],
      [fm("N2O"), "+1", nm("N2O", "sist"), nm("N2O", "stock")],
      [fm("NO"), "+2", nm("NO", "sist"), nm("NO", "stock")],
      [fm("N2O3"), "+3", nm("N2O3", "sist"), nm("N2O3", "stock")],
      [fm("NO2"), "+4", nm("NO2", "sist"), nm("NO2", "stock")],
      [fm("N2O5"), "+5", nm("N2O5", "sist"), nm("N2O5", "stock")],
      [fm("P2O5"), "+5", nm("P2O5", "sist"), nm("P2O5", "stock")],
      [fm("SiO2"), "+4", nm("SiO2", "sist"), nm("SiO2", "stock")],
      [fm("H2O"), "+1", "óxido de dihidrógeno (agua)", nm("H2O", "stock")]
    ]) +
    "<p>Los halógenos (Cl, Br, I) tienen cuatro números de oxidación positivos con el oxígeno, y la nomenclatura tradicional los distingue con los prefijos <b>hipo-</b> y <b>per-</b>: " + nm("Cl2O", "trad") + " (+1), " + nm("Cl2O3", "trad") + " (+3), " + nm("Cl2O5", "trad") + " (+5) y " + nm("Cl2O7", "trad") + " (+7). Es la misma serie que veremos en los oxoácidos. (En los libros anteriores a 1990 los óxidos de los no metales se llaman «anhídridos»: anhídrido sulfúrico es el SO₃; hoy se dice «óxido».) En el nitrógeno la tradicional no se usa para los óxidos (el «óxido nítrico» de los libros de biología es el NO y el «óxido nitroso» es el N₂O): ahí manda la sistemática.</p>" +
    ejemplo("Formula y nombra el óxido de un elemento con número de oxidación +5 (fósforo) y el de +7 (cloro)", "Cruza con el oxígeno (−2) y simplifica.", [
      "Fósforo (+5): P₂O₅ (2 y 5 no se simplifican). Sistemática: " + bn("P2O5", "sist") + "; Stock: " + bn("P2O5", "stock") + ".",
      "Cloro (+7): Cl₂O₇. Sistemática: " + bn("Cl2O7", "sist") + "; Stock: " + bn("Cl2O7", "stock") + "; tradicional: " + bn("Cl2O7", "trad") + ".",
      "Comprobación de cargas: 2·(+5) + 5·(−2) = 0 y 2·(+7) + 7·(−2) = 0."
    ]) +
    ojo("El NO₂ y el N₂O₄ son dos sustancias distintas: la fórmula empírica que sale del cruce de +4 con −2 es NO₂ (que es la que usamos, «dióxido de nitrógeno»); el N₂O₄ existe en la realidad como dímero, pero en formulación de Bachillerato se escribe siempre la fórmula simplificada.") +
    wa("q3_entrenador", { titulo: "Entrenador de óxidos", fams: ["oxido"], fam: "oxido" });

  // ================================================================ 3. Hidróxidos
  secciones[2] =
    "<h5>De dónde salen: óxido básico + agua</h5>" +
    "<p>Un óxido metálico se combina con el agua y da el hidróxido correspondiente: Na₂O + H₂O → 2 NaOH; CaO + H₂O → Ca(OH)₂ (la cal apagada que usan los albañiles); Fe₂O₃ + 3 H₂O → 2 Fe(OH)₃. El grupo característico es el <b>hidroxilo</b> o <b>hidróxido</b>, OH⁻, que mantiene siempre su carga −1 y se trata como una unidad: si hace falta más de uno, se pone entre paréntesis. El número de grupos OH es igual al número de oxidación del metal.</p>" +
    "<h5>Los tres sistemas</h5>" +
    "<p>En la sistemática se cuentan los grupos hidróxido con prefijos: «dihidróxido de calcio», «trihidróxido de hierro»; para un solo grupo se dice simplemente «hidróxido de sodio». En Stock, «hidróxido de + metal» con el número romano cuando el metal tiene varias valencias; y en la tradicional, -oso e -ico.</p>" +
    tabla(["Fórmula", "Sistemática", "Stock", "Tradicional"], [
      [fm("NaOH"), nm("NaOH", "sist"), nm("NaOH", "stock"), nm("NaOH", "trad")],
      [fm("Ca(OH)2"), nm("Ca(OH)2", "sist"), nm("Ca(OH)2", "stock"), nm("Ca(OH)2", "trad")],
      [fm("Al(OH)3"), nm("Al(OH)3", "sist"), nm("Al(OH)3", "stock"), nm("Al(OH)3", "trad")],
      [fm("Fe(OH)2"), nm("Fe(OH)2", "sist"), nm("Fe(OH)2", "stock"), nm("Fe(OH)2", "trad")],
      [fm("Fe(OH)3"), nm("Fe(OH)3", "sist"), nm("Fe(OH)3", "stock"), nm("Fe(OH)3", "trad")],
      [fm("Cu(OH)2"), nm("Cu(OH)2", "sist"), nm("Cu(OH)2", "stock"), nm("Cu(OH)2", "trad")],
      [fm("Pb(OH)4"), nm("Pb(OH)4", "sist"), nm("Pb(OH)4", "stock"), nm("Pb(OH)4", "trad")]
    ]) +
    "<h5>Carácter básico y ejemplos de la vida diaria</h5>" +
    "<p>Los hidróxidos son <b>bases</b>: al disolverse en agua liberan iones OH⁻, que hacen subir el pH. El hidróxido de sodio (sosa cáustica) se usa para destapar tuberías y fabricar jabón; el hidróxido de calcio, en la construcción; el hidróxido de magnesio (la «leche de magnesia») y el de aluminio son antiácidos, porque neutralizan el exceso de ácido clorhídrico del estómago. Con un ácido, un hidróxido forma una sal y agua: NaOH + HCl → NaCl + H₂O. Esa reacción de <b>neutralización</b> te explica la sección de sales: cada sal es el resultado de «un ácido al que se le han quitado los H y se ha puesto un metal».</p>" +
    ejemplo("Formula el hidróxido de hierro(III) y deduce de qué óxido procede", "Fe con número de oxidación +3 y el grupo OH (−1).", [
      "Cruce: Fe₁(OH)₃ → " + fm("Fe(OH)3") + ": un hierro y tres grupos hidróxido (con paréntesis).",
      "Comprobación: 1·(+3) + 3·(−1) = 0.",
      "Formalmente procede del " + nm("Fe2O3", "stock") + ": Fe₂O₃ + 3 H₂O → 2 Fe(OH)₃ (en la práctica este óxido no reacciona con el agua; la ecuación sirve para entender de dónde sale la fórmula).",
      "Nombres: sistemática " + bn("Fe(OH)3", "sist") + "; Stock " + bn("Fe(OH)3", "stock") + "; tradicional " + bn("Fe(OH)3", "trad") + "."
    ]) +
    ojo("Los paréntesis son parte de la fórmula: Ca(OH)₂ tiene dos O y dos H; «CaOH₂» tendría un solo O y dos H y no es el hidróxido de calcio. Y el grupo OH no se simplifica: no existe «Ca₂(OH)₄», la fórmula es Ca(OH)₂.");
  secciones[2] += wa("q3_entrenador", { titulo: "Entrenador de hidróxidos", fams: ["hidroxido"], fam: "hidroxido" });

  B.parte.t3a = { secciones: secciones };
})(window);
