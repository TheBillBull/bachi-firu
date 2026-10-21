/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte E: secciones 15 y 16, datos de las actividades, resumen y lámina)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, ejemplo = H.ejemplo, ojo = H.ojo;
  function tabla(c, f) { return H.tabla(c, f, "q3t"); }
  var F = B.lab.formulacion, T = B.parte.t3, fm = T.fm, nm = T.nm, bn = T.bn, sg = T.sg, w = T.w, wa = T.wa;
  function pv(f, sis, i) { var r = T.R(f); return { f: r.f, sis: sis, t: nm(f, sis, i), q: r.ion ? r.q : 0 }; }
  function mal(f, sis, t) { var r = T.R(f); return { f: r.f, sis: sis, t: t, no: true, q: r.ion ? r.q : 0 }; }
  function filaErr(e, malo, f, sis, por) { return [e, malo, sis ? nm(f, sis) : fm(f), por]; }

  // ================================================================ 15. ¿Qué falla aquí?
  var nuevas = [];
  nuevas.push({ h: "15. ¿Qué falla aquí? Los errores que más puntos cuestan", html:
    "<p>Estos doce errores explican casi todos los fallos de un examen de formulación. Cada uno trae el error, la forma correcta y la razón: léelos como una lista de control antes de entregar.</p>" +
    tabla(["Error", "Mal", "Bien", "Por qué"], [
      filaErr("No cruzar las valencias", "Al₃O₂", "Al2O3", null, "El 3 del aluminio va al oxígeno y el 2 del oxígeno, al aluminio."),
      filaErr("No simplificar", "Ca₂O₂", "CaO", null, "Tras cruzar se divide entre el máximo común divisor (2)."),
      filaErr("Olvidar el paréntesis", "CaOH₂ · Ca₃PO₄₂", "Ca(OH)2", null, "Un grupo que se repite va entre paréntesis: Ca(OH)₂, Ca₃(PO₄)₂."),
      filaErr("Simplificar un peróxido", "NaO", "Na2O2", null, "El grupo O₂ es una unidad de carga −2 y no se parte."),
      filaErr("Confundir -ato e -ito", "sulfito de sodio para Na₂SO₄", "Na2SO4", "stock", "Más oxígenos (SO₄) = -ato; menos (SO₃) = -ito."),
      filaErr("Confundir -hídrico con -ico", "ácido clórico para HCl", "HCl", "trad", "-hídrico: sin oxígeno. El ácido clórico es HClO₃."),
      filaErr("Mezclar prefijos y romanos", "tricloruro de hierro(III)", "FeCl3", "stock", "O prefijo (tricloruro de hierro) o romano (cloruro de hierro(III)), pero no los dos."),
      filaErr("Equivocar la valencia del metal", "óxido de hierro(II) para Fe₂O₃", "Fe2O3", "stock", "2·x = 3·2 → x = +3: se calcula con la suma de cargas."),
      filaErr("Escribir al revés", "ClNa · OCa", "NaCl", null, "Delante va el elemento menos electronegativo (el metal)."),
      filaErr("Mayúsculas y minúsculas", "CO ≠ Co · NO ≠ No", "CO", "sist", "El símbolo empieza por mayúscula y sigue en minúscula: CO es monóxido de carbono; Co es cobalto."),
      filaErr("Invertir hipo- y per-", "ácido perclórico para HClO", "HClO4", "trad", "per- = el mayor número de oxidación (+7, 4 O); hipo- = el menor (+1, 1 O)."),
      filaErr("Olvidar cargas de los grupos", "Fe(SO₄)₃ para sulfato de hierro(III)", "Fe2(SO4)3", "stock", "SO₄ tiene carga 2−, no 1−: 2 Fe³⁺ y 3 SO₄²⁻.")
    ]) +
    w("quiz", "errores") + w("q3_error") });

  // ================================================================ 16. Autocomprobación
  nuevas.push({ h: "16. Autocomprobación del tema", html:
    "<p>Dos tests con explicación de cada respuesta, tarjetas para memorizar aniones, parejas, clasificaciones y dos entrenadores que no se agotan. Una pauta eficaz: haz el test, repasa lo fallado en las tarjetas y termina con un «Examen de 10» en el entrenador.</p>" +
    w("quiz", "quiz1") + w("quiz", "quiz2") +
    w("tarjetas", "tarj1") + w("tarjetas", "tarj2") +
    w("emparejar", "par1") + w("emparejar", "par2") +
    w("clasificar", "clas1") + w("clasificar", "clas2") +
    w("orden", "orden1") + w("orden", "orden2") +
    wa("q3_entrenador", { titulo: "Examen: todas las familias, tú eliges la nomenclatura", modo: "mix", niv: 2 }) });

  // ================================================================ datos de las actividades
  var datos = {};

  datos.historia = {
    titulo: "Cómo se fue construyendo la nomenclatura química",
    desde: 1780, hasta: 2010,
    tipos: { fr: ["Lenguaje químico", "var(--pen)"], re: ["Reglas internacionales", "var(--ok)"], es: ["En español", "var(--red)"] },
    eventos: [
      { a: 1787, f: 0.0, m: "", t: "Lavoisier y la nomenclatura racional", tipo: "fr", d: "Lavoisier, Guyton de Morveau, Berthollet y Fourcroy publican el <i>Méthode de nomenclature chimique</i>. Proponen que el nombre de cada sustancia describa su composición: aparecen las terminaciones -uro (cloruro), -ato e -ito (sulfato, sulfito) y -ico y -oso para los ácidos. Es el origen de las tres nomenclaturas que usamos." },
      { a: 1813, f: 0.0, m: "", t: "Berzelius: los símbolos", tipo: "fr", d: "Jöns Jacob Berzelius propone representar los elementos con la inicial de su nombre (latino) y, si hace falta, una segunda letra minúscula: Fe (ferrum), Cu (cuprum), Na (natrium). Los subíndices indican el número de átomos. Es el sistema de símbolos y fórmulas de hoy." },
      { a: 1919, f: 0.0, m: "", t: "Stock y los números romanos", tipo: "fr", d: "El químico alemán Alfred Stock propone indicar el número de oxidación del elemento con números romanos entre paréntesis: óxido de hierro(III). Resuelve la ambigüedad de los sufijos -oso e -ico cuando un elemento tiene más de dos números de oxidación." },
      { a: 1919, f: 0.7, m: "", t: "Nace la IUPAC", tipo: "re", d: "Se funda la Unión Internacional de Química Pura y Aplicada (IUPAC), que desde entonces fija las reglas de nomenclatura de los compuestos químicos, de modo que un mismo nombre signifique lo mismo en cualquier país." },
      { a: 1959, f: 0.0, m: "", t: "El primer «Libro Rojo»", tipo: "re", d: "Aparece la primera edición del <i>Nomenclature of Inorganic Chemistry</i>, conocida como «Libro Rojo» por el color de la cubierta. Es el libro de referencia de la química inorgánica y se revisa cada pocas décadas." },
      { a: 1970, f: 0.0, m: "", t: "Segunda edición", tipo: "re", d: "Se revisa el Libro Rojo (1970). La nomenclatura de Stock y la sistemática con prefijos ganan terreno a la tradicional." },
      { a: 1990, f: 0.0, m: "", t: "Tercera edición", tipo: "re", d: "En 1990 se publica la tercera edición. En español se divulgan los nombres «ácido tetraoxosulfúrico(VI)» y similares, que aún se ven en libros de esa época." },
      { a: 2005, f: 0.0, m: "", t: "Libro Rojo 2005", tipo: "re", d: "La edición de 2005 (cuarta) es la vigente. Recomienda nombres sistemáticos con prefijos, el uso de «oxido» (no «oxo») en los oxoaniones, el prefijo «hidrogeno» en las sales ácidas, y deja la nomenclatura tradicional sólo para unos pocos casos de uso muy extendido." },
      { a: 2007, f: 0.0, m: "", t: "Versión española", tipo: "es", d: "Se publica la versión en español de las recomendaciones de 2005 (<i>Nomenclatura de Química Inorgánica</i>), que es la base de lo que se estudia en el Bachillerato." }
    ]
  };

  datos.errores = {
    titulo: "Encuentra el error",
    intro: "Cada pregunta recoge un razonamiento de un alumno con un fallo. Elige cuál es.",
    verif: [pv("HCl", "trad"), pv("HClO4", "trad"), pv("Na2SO4", "stock"), pv("FeCl3", "stock"), pv("Fe2O3", "stock"), { f: "Al2O3", sis: "formula", t: "", q: 0 }, { f: "Ca(OH)2", sis: "formula", t: "", q: 0 }, { f: "Na2O2", sis: "formula", t: "", q: 0 }, { f: "CaO", sis: "formula", t: "", q: 0 }],
    preguntas: [
      { q: "«El óxido de aluminio es Al₃O₂, porque el aluminio tiene valencia 3 y el oxígeno 2.» ¿Qué falla?",
        op: ["No ha cruzado: la valencia de cada uno es el subíndice <b>del otro</b>", "El aluminio tiene valencia 2", "El oxígeno tiene valencia 3", "Falta un paréntesis"], ok: 0,
        porque: "El cruce da Al₂O₃: el 3 del Al pasa al O y el 2 del O pasa al Al. Con 2 Al³⁺ (+6) y 3 O²⁻ (−6) la suma es 0; con Al₃O₂ sería +9 − 4." },
      { q: "«El óxido de calcio es Ca₂O₂, porque las dos valencias son 2.» ¿Qué falla?",
        op: ["No ha simplificado los subíndices (2 y 2 → 1 y 1)", "El calcio tiene valencia 1", "Debería ser un peróxido", "El oxígeno va delante"], ok: 0,
        porque: "Tras cruzar hay que dividir entre el máximo común divisor: Ca₂O₂ → CaO. La fórmula expresa la proporción más pequeña." },
      { q: "«El peróxido de sodio es NaO, porque Na₂O₂ se simplifica entre 2.» ¿Qué falla?",
        op: ["Un peróxido contiene el grupo O₂, que es una unidad y no se divide", "El sodio tiene valencia 2", "Los peróxidos llevan hidrógeno", "Debería escribirse Na₂O"], ok: 0,
        porque: "El ion peróxido es O₂²⁻; no se puede partir en «O». Con 2 Na⁺ y un O₂²⁻ la carga total es 0: Na₂O₂. El NaO no existe como compuesto neutro con O²⁻." },
      { q: "«El Na₂SO₄ se llama sulfito de sodio.» ¿Qué falla?",
        op: ["Los -ito llevan menos oxígenos: con SO₄ (4 O) es -ato, sulfato", "El sodio debería llevar número romano", "No es una sal", "Debería llamarse sulfuro de sodio"], ok: 0,
        porque: "Sulfato = SO₄²⁻ (del ácido sulfúrico, S +6); sulfito = SO₃²⁻ (del sulfuroso, S +4). Más oxígenos, -ato." },
      { q: "«El HCl en agua es el ácido clórico.» ¿Qué falla?",
        op: ["-hídrico es del hidrácido (sin oxígeno): HCl es el ácido clorhídrico; el clórico es HClO₃", "El HCl no es un ácido", "Debería ser ácido hipocloroso", "Falta el oxígeno en la fórmula"], ok: 0,
        porque: "Los hidrácidos usan la raíz del no metal + -hídrico; los oxoácidos, -oso/-ico." },
      { q: "«El FeCl₃ es el tricloruro de hierro(III).» ¿Qué falla?",
        op: ["Se han mezclado dos sistemas: o «tricloruro de hierro» o «cloruro de hierro(III)»", "El hierro debería ser (II)", "Falta un paréntesis", "Es un óxido"], ok: 0,
        porque: "Sistemática: prefijos. Stock: romanos. Mezclar es redundante e incorrecto." },
      { q: "«El hidróxido de calcio es CaOH₂.» ¿Qué falla?",
        op: ["El grupo OH se repite dos veces y debe ir entre paréntesis: Ca(OH)₂", "El calcio debería llevar (III)", "Falta un oxígeno", "Se simplifica a CaOH"], ok: 0,
        porque: "Ca(OH)₂ tiene 1 Ca, 2 O y 2 H. CaOH₂ tendría un solo oxígeno: es otra fórmula." },
      { q: "«El ácido perclórico es HClO₃.» ¿Qué falla?",
        op: ["per- es el mayor número de oxidación (+7): HClO₄; HClO₃ es el clórico (+5)", "Debería llamarse ácido hipoclórico", "El cloro es +3 en el perclórico", "El perclórico lleva 2 H"], ok: 0,
        porque: "Serie del cloro: HClO (hipocloroso, +1), HClO₂ (cloroso, +3), HClO₃ (clórico, +5), HClO₄ (perclórico, +7). Los oxígenos son 1, 2, 3 y 4." }
    ]
  };

  datos.quiz1 = {
    titulo: "Test 1 · Conceptos: números de oxidación, familias y reglas",
    verif: [{ f: "NaHCO3", fam: "salAcida" }, { f: "Na2CO3", fam: "oxisal" }],
    preguntas: [
      { q: "¿Qué número de oxidación tiene el oxígeno en el H₂O₂?", op: ["−1", "−2", "0", "+1"], ok: 0, porque: "En los peróxidos el oxígeno vale −1: 2·(+1) + 2·x = 0 → x = −1." },
      { q: "¿Cuántos átomos de oxígeno hay en Fe₂(SO₄)₃?", op: ["12", "7", "4", "3"], ok: 0, porque: "3 grupos SO₄ con 4 oxígenos cada uno: 3 × 4 = 12." },
      { q: "El cruce de valencias de Al³⁺ con O²⁻ da…", op: ["Al₂O₃", "Al₃O₂", "AlO", "Al₂O₂"], ok: 0, porque: "El 3 del aluminio pasa al oxígeno y el 2 del oxígeno, al aluminio; 2 y 3 no tienen divisor común." },
      { q: "En un compuesto de dos no metales, se escribe primero…", op: ["El que aparece antes en la lista IUPAC (B, Si, C, Sb, As, P, N, H, Te, Se, S, I, Br, Cl, O, F)", "El que tiene más átomos", "El de mayor masa atómica", "El que se nombra primero"], ok: 0, porque: "Por eso se escribe CCl₄ y SF₆ (y no Cl₄C ni F₆S) aunque se nombre primero el cloro o el flúor («tetracloruro de carbono»)." },
      { q: "De HNO₂ y HNO₃, ¿cuál lleva la terminación -ico?", op: ["HNO₃ (N +5, más oxígeno)", "HNO₂ (N +3)", "Los dos", "Ninguno: se llaman con -hídrico"], ok: 0, porque: "-ico para el mayor número de oxidación: HNO₃ es el ácido nítrico; HNO₂ es el nitroso." },
      { q: "El ácido clorhídrico y el ácido clórico se diferencian en que…", op: ["El primero (HCl) no tiene oxígeno y el segundo (HClO₃) sí", "El primero tiene más oxígeno", "Son el mismo compuesto con dos nombres", "El segundo es una sal"], ok: 0, porque: "-hídrico: hidrácido (H + no metal). -ico/-oso: oxoácido (H + no metal + O)." },
      { q: "¿Cuándo hay que escribir el número romano en la nomenclatura de Stock?", op: ["Cuando el elemento puede tener más de un número de oxidación", "Siempre, incluso con el sodio", "Solo con los no metales", "Nunca: es de la tradicional"], ok: 0, porque: "Si el elemento solo tiene una valencia (Na, Ca, Al…) el número romano no aporta información. (La IUPAC 2005 permite escribirlo siempre, pero en Bachillerato se omite.)" },
      { q: "En «ácido perclórico», el prefijo per- indica…", op: ["El mayor número de oxidación del cloro (+7)", "El menor número de oxidación del cloro (+1)", "Que lleva dos cloros", "Que es una sal"], ok: 0, porque: "Hipo-…-oso (+1), -oso (+3), -ico (+5), per-…-ico (+7)." },
      { q: "Un compuesto es eléctricamente neutro. ¿Qué se cumple siempre?", op: ["La suma de los números de oxidación de todos sus átomos es 0", "Todos los átomos tienen número de oxidación 0", "El metal y el no metal tienen el mismo número de oxidación", "Hay el mismo número de átomos de cada elemento"], ok: 0, porque: "Es la regla 6: sirve para calcular el número de oxidación desconocido y para el cruce de valencias." },
      { q: "Los aniones que terminan en -ato proceden de ácidos que terminan en…", op: ["-ico", "-oso", "-hídrico", "-uro"], ok: 0, porque: "-ico → -ato (sulfúrico → sulfato) y -oso → -ito (sulfuroso → sulfito). Del -hídrico sale -uro (clorhídrico → cloruro)." },
      { q: "¿Cuál de estas fórmulas corresponde a una sal ácida?", op: ["NaHCO₃", "Na₂CO₃", "NaOH", "NaClO"], ok: 0, porque: "El NaHCO₃ (hidrogenocarbonato de sodio) conserva un H en el anión. El Na₂CO₃ es una oxisal, el NaOH un hidróxido y el NaClO una oxisal (hipoclorito)." },
      { q: "En «bis(tetraoxidofosfato) de tricalcio»…", op: ["Hay 2 grupos fosfato y 3 átomos de calcio: Ca₃(PO₄)₂", "Hay 3 grupos fosfato y 2 átomos de calcio", "Hay 2 átomos de fósforo y 3 de oxígeno", "Es un hidrogenofosfato"], ok: 0, porque: "El prefijo bis- cuenta los grupos entre paréntesis (2) y tri- cuenta los átomos de calcio (3). Comprobación: 3·(+2) + 2·(−3) = 0." }
    ]
  };

  function qNombre(q, f, sis, malos, porque) {
    // un «~» delante marca un distractor que es válido en OTRA nomenclatura (se comprueba que no lo sea en la pedida)
    var txt = malos.map(function (m) { return m.charAt(0) === "~" ? m.slice(1) : m; });
    var o = { q: q, op: [nm(f, sis)].concat(txt), ok: 0, porque: porque };
    datos.quiz2.verif.push(pv(f, sis)); malos.forEach(function (m) { var c = m.charAt(0) === "~"; var x = mal(f, c ? sis : "any", c ? m.slice(1) : m); datos.quiz2.verif.push(x); });
    return o;
  }
  datos.quiz2 = { titulo: "Test 2 · Formulación y nomenclatura", verif: [] };
  datos.quiz2.preguntas = [
    qNombre("¿Cómo se llama CaCO₃ (nomenclatura de Stock o tradicional)?", "CaCO3", "stock", ["carbonito de calcio", "óxido de calcio y carbono", "carburo de calcio"], "El anión CO₃²⁻ es el carbonato (del ácido carbónico, -ico → -ato)."),
    { q: "La fórmula del hidróxido de hierro(II) es…", op: [fm("Fe(OH)2"), "FeOH₂", fm("Fe(OH)3"), "Fe₂(OH)"], ok: 0, porque: "Fe con +2 y OH con −1: Fe(OH)₂. Fe(OH)₃ sería el de hierro(III)." },
    qNombre("H₂SO₃ se llama…", "H2SO3", "trad", ["ácido sulfúrico", "ácido sulfhídrico", "ácido hiposulfuroso"], "S con +4 (el menor de sus dos números de oxidación con el oxígeno) → -oso: ácido sulfuroso."),
    qNombre("NaClO se llama…", "NaClO", "trad", ["clorito de sodio", "clorato de sodio", "cloruro de sodio"], "ClO⁻ es el anión hipoclorito (Cl +1 → hipo-…-ito)."),
    { q: "La fórmula del dióxido de carbono es…", op: [fm("CO2"), "CO", "C₂O", "CO₃"], ok: 0, porque: "«Di-» = 2 oxígenos y un carbono (sin prefijo). CO sería el monóxido de carbono." },
    qNombre("N₂O₅ en nomenclatura de Stock…", "N2O5", "stock", ["óxido de nitrógeno(III)", "óxido de nitrógeno(IV)", "óxido de dinitrógeno"], "Cada N tiene +5: 2·x = 5·2 → x = +5."),
    { q: "El peróxido de calcio es…", op: [fm("CaO2"), "CaO", "Ca₂O₂", "Ca(OH)₂"], ok: 0, porque: "Ca²⁺ con O₂²⁻ (peróxido, se cruza el grupo entero): CaO₂." },
    qNombre("Fe₂O₃ en nomenclatura tradicional…", "Fe2O3", "trad", ["óxido ferroso", "~óxido de hierro(III)", "óxido de hierro"], "Fe +3 (el mayor de los dos) → -ico: óxido férrico. «Óxido ferroso» es el FeO (Fe +2). «Óxido de hierro(III)» es de Stock."),
    { q: "La fórmula del ácido sulfhídrico es…", op: [fm("H2S"), "H₂SO₃", "HS", "H₂SO₄"], ok: 0, porque: "Hidrácido: H con S (−2): H₂S. -hídrico, sin oxígeno." },
    qNombre("AgNO₃ se llama…", "AgNO3", "stock", ["nitrito de plata", "nitruro de plata", "nitrato de plata(II)"], "NO₃⁻ es el nitrato (del ácido nítrico); la plata solo tiene valencia +1, así que no lleva romano."),
    qNombre("KMnO₄ se llama…", "KMnO4", "stock", ["manganato de potasio", "permanganito de potasio", "óxido de potasio y manganeso"], "MnO₄⁻ es el permanganato (Mn +7 → per-…-ato): del ácido permangánico."),
    qNombre("Cl₂O₇ en la nomenclatura sistemática…", "Cl2O7", "sist", ["~óxido de cloro(VII)", "dióxido de heptacloro", "heptaóxido de cloro"], "7 oxígenos (hepta-) y 2 cloros (di-): heptaóxido de dicloro.")
  ];
  datos.quiz2.verif.push({ f: "Fe(OH)2", sis: "formula", t: "" }, { f: "CO2", sis: "formula", t: "" }, { f: "CaO2", sis: "formula", t: "" }, { f: "H2S", sis: "formula", t: "" });

  // tarjetas
  function carta(f, sis) { var r = T.R(f); return { a: F.html(r), b: nm(f, sis) + (r.ion ? " · carga " + (Math.abs(r.q) > 1 ? Math.abs(r.q) : "") + (r.q > 0 ? "+" : "−") : "") }; }
  var VER_T1 = [];
  datos.tarj1 = { titulo: "Aniones y cationes para saberse de memoria", cartas: ["SO42-", "SO32-", "NO3-", "NO2-", "CO32-", "PO43-", "ClO-", "ClO2-", "ClO3-", "ClO4-", "MnO4-", "CrO42-", "Cr2O72-", "HCO3-", "OH-", "NH4+"].map(function (f) { VER_T1.push(pv(f, "stock")); return carta(f, "stock"); }), verif: VER_T1 };
  datos.tarj2 = { titulo: "Reglas de la nomenclatura en una tarjeta", cartas: [
    { a: "Número de oxidación de O, H (y excepciones)", b: "O: −2 (−1 en peróxidos). H: +1 (−1 en hidruros metálicos)." },
    { a: "Cruce de valencias", b: "La carga de cada ion es el subíndice del otro; se simplifica; paréntesis para los grupos repetidos." },
    { a: "Serie del cloro: nº de oxígenos", b: "HClO (1), HClO₂ (2), HClO₃ (3), HClO₄ (4): hipo-oso, oso, ico, per-ico." },
    { a: "Anión de un ácido -ico / -oso", b: "-ico → -ato; -oso → -ito (hipo y per se conservan). -hídrico → -uro." },
    { a: "Prefijos multiplicadores", b: "mono, di, tri, tetra, penta, hexa, hepta, octa. Para grupos: bis, tris, tetrakis." },
    { a: "Número romano de Stock", b: "El n.º de oxidación del elemento entre paréntesis, solo si puede tener varios: hierro(III), pero cloruro de sodio." },
    { a: "Orden de la lista IUPAC", b: "B, Si, C, Sb, As, P, N, H, Te, Se, S, I, Br, Cl, O, F (de menos a más electronegativo)." },
    { a: "Hidrácido (gas / en agua)", b: "HCl(g): cloruro de hidrógeno · HCl(aq): ácido clorhídrico." },
    { a: "Sal ácida", b: "El anión conserva H: «hidrogeno» + anión: NaHCO₃, hidrogenocarbonato de sodio." },
    { a: "Hierro: -oso / -ico", b: "Fe²⁺ ferroso (menor); Fe³⁺ férrico (mayor)." },
    { a: "Cobre: -oso / -ico", b: "Cu⁺ cuproso; Cu²⁺ cúprico." },
    { a: "Plomo y estaño", b: "Pb y Sn: +2 (plumboso, estannoso) y +4 (plúmbico, estánnico)." },
    { a: "Peróxido", b: "Grupo O₂ con carga −2 que no se simplifica: Na₂O₂, H₂O₂, CaO₂." },
    { a: "Amonio y oxonio", b: "NH₄⁺ amonio; H₃O⁺ oxonio (hidronio)." }
  ] };

  // emparejar
  var P1 = ["HClO", "HClO3", "H2SO3", "H2SO4", "HNO2", "HNO3", "H3PO4", "H2CO3"];
  datos.par1 = { titulo: "Oxoácidos: fórmula y nombre tradicional", consigna: "Une cada fórmula con su nombre.", pares: P1.map(function (f) { return [fm(f), nm(f, "trad")]; }), verif: P1.map(function (f) { return pv(f, "trad"); }) };
  var P2 = ["FeO", "CuO", "Pb(OH)4", "AuCl", "SnS", "HgO", "Fe(NO3)3"];
  datos.par2 = { titulo: "De la tradicional a Stock", consigna: "Une cada nombre tradicional con su equivalente de Stock.", pares: P2.map(function (f) { return [nm(f, "trad"), nm(f, "stock")]; }), verif: P2.map(function (f) { return pv(f, "trad"); }).concat(P2.map(function (f) { return pv(f, "stock"); })) };

  // clasificar
  var CF = ["Óxido o peróxido", "Hidróxido", "Hidruro o hidrácido", "Oxoácido", "Sal binaria", "Oxisal o sal ácida"];
  var CI = [["Fe2O3", "oxido", 0], ["Na2O2", "peroxido", 0], ["SO3", "oxido", 0], ["Ca(OH)2", "hidroxido", 1], ["Fe(OH)3", "hidroxido", 1], ["LiH", "hidruroM", 2], ["NH3", "hidruroN", 2], ["HCl", "hidracido", 2], ["CaH2", "hidruroM", 2],
    ["H2SO3", "oxoacido", 3], ["HClO4", "oxoacido", 3], ["H3PO4", "oxoacido", 3], ["NaCl", "salBin", 4], ["Al2S3", "salBin", 4], ["CCl4", "salBin", 4], ["Na2CO3", "oxisal", 5], ["NaHCO3", "salAcida", 5], ["Cu(NO3)2", "oxisal", 5], ["KMnO4", "oxisal", 5]];
  datos.clas1 = { titulo: "Clasifica por familia", consigna: "Arrastra o elige: ¿a qué familia pertenece cada compuesto?", categorias: CF, items: CI.map(function (x) { return { t: fm(x[0]), c: x[2], f: x[0], fam: x[1] }; }) };
  var CS = [["H2S", 0, -2], ["SO2", 1, 4], ["SO3", 2, 6], ["Na2SO3", 1, 4], ["Na2SO4", 2, 6], ["Al2S3", 0, -2], ["H2SO4", 2, 6], ["H2SO3", 1, 4], ["FeS", 0, -2], ["CaSO4", 2, 6], ["K2S", 0, -2], ["NaHSO4", 2, 6]];
  datos.clas2 = { titulo: "¿Qué número de oxidación tiene el azufre?", consigna: "Calcula con la suma de cargas y clasifica.", categorias: ["−2", "+4", "+6"], items: CS.map(function (x) { return { t: fm(x[0]), c: x[1], f: x[0], el: "S", ox: x[2] }; }) };

  // orden
  datos.orden1 = { titulo: "Pasos para formular un oxisal (sulfato de hierro(III))", consigna: "Ordena los pasos.", items: [
    { t: "Identifica el anión: sulfato, SO₄²⁻ (del ácido sulfúrico)", nota: "-ato → procede del ácido en -ico." },
    { t: "Identifica el catión: hierro(III), Fe³⁺", nota: "El romano es el número de oxidación." },
    { t: "Cruza las cargas: Fe₂ y SO₄₃", nota: "El 3 del Fe pasa al sulfato y el 2 del sulfato, al Fe." },
    { t: "Simplifica si se puede (aquí 2 y 3 no tienen divisor común)", nota: "Se divide entre el máximo común divisor." },
    { t: "Pon paréntesis al grupo que se repite: Fe₂(SO₄)₃", nota: "Solo si el subíndice del grupo es mayor que 1." },
    { t: "Comprueba la neutralidad: 2·(+3) + 3·(−2) = 0", nota: "Suma de cargas igual a cero." }
  ] };
  datos.orden2 = { titulo: "La serie de los oxoácidos del cloro", consigna: "De menor a mayor número de oxidación del cloro.", items: [
    { t: "HClO · ácido hipocloroso (Cl +1)", nota: "hipo-…-oso: 1 oxígeno." }, { t: "HClO₂ · ácido cloroso (Cl +3)", nota: "-oso: 2 oxígenos." }, { t: "HClO₃ · ácido clórico (Cl +5)", nota: "-ico: 3 oxígenos." }, { t: "HClO₄ · ácido perclórico (Cl +7)", nota: "per-…-ico: 4 oxígenos." }
  ], verif: [pv("HClO", "trad"), pv("HClO2", "trad"), pv("HClO3", "trad"), pv("HClO4", "trad")] };

  // ================================================================ resumen y lámina
  var resumen = [
    "<b>Número de oxidación</b>: carga que tendría el átomo si el enlace fuera iónico. O −2 (−1 en peróxidos), H +1 (−1 en hidruros metálicos); la suma en un compuesto neutro es 0 y en un ion, su carga.",
    "<b>Cruce de valencias</b>: la carga de cada ion es el subíndice del otro; se simplifica y los grupos repetidos van entre paréntesis. Delante, el menos electronegativo (lista IUPAC: …P, N, H, S, I, Br, Cl, O, F).",
    "<b>Tres nomenclaturas</b> de un mismo compuesto: <b>sistemática</b> (mono-, di-, tri-…; bis-, tris- para grupos), <b>Stock</b> (romano solo si hay varios números de oxidación) y <b>tradicional</b> (-oso/-ico, hipo-/per-).",
    "<b>Familias</b>: óxidos (M₂Oₙ), peróxidos (grupo O₂), hidróxidos M(OH)ₙ, hidruros metálicos MHₙ, hidrácidos (HCl, H₂S), hidruros no metálicos (NH₃, CH₄), oxoácidos HₐXO<sub>b</sub>, sales binarias (-uro), oxisales (-ato/-ito) y sales ácidas (hidrogeno-).",
    "<b>Oxoácidos</b>: óxido + agua. Serie del cloro: hipoclor<i>oso</i> HClO, clor<i>oso</i> HClO₂, clór<i>ico</i> HClO₃, <i>per</i>clór<i>ico</i> HClO₄ (1, 2, 3, 4 oxígenos). Anión: -ico → -ato, -oso → -ito, -hídrico → -uro.",
    "<b>Errores típicos</b>: no cruzar, no simplificar, olvidar paréntesis, simplificar un peróxido, confundir -ato/-ito, mezclar prefijos y romanos, equivocar la valencia del Fe o del Cu.",
    "<b>Para estudiar</b>: aprende los 25 aniones con su carga; practica fórmula→nombre y nombre→fórmula en el entrenador hasta tener racha, y revisa siempre con la suma de cargas."
  ];

  var lamina = [
    { titulo: "Números de oxidación que usaremos", tabla: { cab: ["Elementos", "Números de oxidación"], filas: [
      ["H", "+1 · −1 (hidruros metálicos)"], ["O", "−2 · −1 (peróxidos)"], ["F · Cl, Br, I", "−1 · −1, +1, +3, +5, +7"], ["S, Se, Te", "−2, +4, +6"], ["N", "−3, +1, +2, +3, +4, +5"], ["P, As, Sb", "−3, +3, +5"], ["C · Si · B", "−4, +2, +4 · −4, +4 · +3"],
      ["Li, Na, K, Ag", "+1"], ["Be, Mg, Ca, Ba, Zn", "+2"], ["Al", "+3"], ["Cu · Au", "+1, +2 · +1, +3"], ["Fe, Co, Ni", "+2, +3"], ["Sn, Pb, Pt", "+2, +4"], ["Hg", "+2"], ["Cr · Mn", "+2, +3 (+6) · +2, +3, +4 (+6, +7)"]
    ] }, nota: "La suma de los números de oxidación es la carga del compuesto (0) o del ion." },
    { titulo: "Cruce de valencias: método", pasos: [
      "Símbolos con sus cargas: el positivo, delante.", "Cruza los números (sin signo): el del primero es el subíndice del segundo, y al revés.", "Simplifica entre el máximo común divisor. El subíndice 1 no se escribe.", "Paréntesis para los grupos poliatómicos con subíndice > 1: Ca(OH)₂, Fe₂(SO₄)₃.", "Comprueba: suma de cargas = 0."
    ], nota: "Peróxido: el grupo O₂ no se simplifica (Na₂O₂)." },
    { titulo: "Familias y plantillas", tabla: { cab: ["Familia", "Plantilla", "Ejemplo"], filas: [
      ["Óxido", "M₂Oₙ", fm("Fe2O3")], ["Peróxido", "M(O₂)", fm("Na2O2")], ["Hidróxido", "M(OH)ₙ", fm("Ca(OH)2")], ["Hidruro metálico", "MHₙ", fm("CaH2")], ["Hidrácido", "HₙX", fm("HCl")], ["Hidruro no metálico", "XHₙ", fm("NH3")],
      ["Oxoácido", "HₐXO<sub>b</sub>", fm("H2SO4")], ["Sal binaria", "MₓXᵧ", fm("NaCl")], ["Oxisal", "Mₓ(XO<sub>b</sub>)ᵧ", fm("Na2SO4")], ["Sal ácida", "M(HXO<sub>b</sub>)ᵧ", fm("NaHCO3")]
    ] } },
    { titulo: "Prefijos, romanos y sufijos", tabla: { cab: ["Sistema", "Cómo", "Ejemplo"], filas: [
      ["Sistemática", "mono, di, tri, tetra, penta, hexa, hepta · bis, tris, tetrakis", nm("Fe2O3", "sist")], ["Stock", "romano = n.º de oxidación; solo si hay varios", nm("Fe2O3", "stock")], ["Tradicional", "-oso (menor) · -ico (mayor); hipo-, per-", nm("Fe2O3", "trad")]
    ] }, nota: "No mezcles: «tricloruro de hierro» o «cloruro de hierro(III)», no los dos." },
    { titulo: "Serie de oxoácidos (tradicional)", tabla: { cab: ["n.º ox.", "Cl", "S", "N", "P", "C"], filas: [
      ["+1", fm("HClO") + " hipocloroso", "—", "—", "—", "—"], ["+3", fm("HClO2") + " cloroso", "—", fm("HNO2") + " nitroso", fm("H3PO3") + " fosforoso", "—"],
      ["+4", "—", fm("H2SO3") + " sulfuroso", "—", "—", fm("H2CO3") + " carbónico"], ["+5", fm("HClO3") + " clórico", "—", fm("HNO3") + " nítrico", fm("H3PO4") + " fosfórico", "—"],
      ["+6", "—", fm("H2SO4") + " sulfúrico", "—", "—", "—"], ["+7", fm("HClO4") + " perclórico", "—", "—", "—", "—"]
    ] }, nota: "Anión: -ico → -ato; -oso → -ito; los prefijos hipo- y per- se conservan." },
    { titulo: "Aniones imprescindibles", tabla: { cab: ["Ion", "Nombre", "Ion", "Nombre"], filas: [
      [fm("SO42-"), "sulfato", fm("SO32-"), "sulfito"], [fm("NO3-"), "nitrato", fm("NO2-"), "nitrito"], [fm("CO32-"), "carbonato", fm("PO43-"), "fosfato"],
      [fm("ClO-"), "hipoclorito", fm("ClO2-"), "clorito"], [fm("ClO3-"), "clorato", fm("ClO4-"), "perclorato"], [fm("MnO4-"), "permanganato", fm("CrO42-"), "cromato"],
      [fm("Cr2O72-"), "dicromato", fm("OH-"), "hidróxido"], [fm("HCO3-"), "hidrogenocarbonato", fm("NH4+"), "amonio (catión)"]
    ] } },
    { titulo: "Errores típicos", errores: [
      { mal: "Al₃O₂", bien: fm("Al2O3"), por: "Hay que cruzar las valencias." }, { mal: "Ca₂O₂", bien: fm("CaO"), por: "Hay que simplificar." },
      { mal: "NaO", bien: fm("Na2O2"), por: "El grupo O₂ del peróxido no se divide." }, { mal: "sulfito de sodio (Na₂SO₄)", bien: nm("Na2SO4", "stock"), por: "SO₄ es -ato." },
      { mal: "tricloruro de hierro(III)", bien: nm("FeCl3", "stock") + " o " + nm("FeCl3", "sist"), por: "No mezcles prefijos y romanos." }, { mal: "CaOH₂", bien: fm("Ca(OH)2"), por: "Grupo OH repetido: paréntesis." }
    ] }
  ];

  B.parte.t3e = { nuevas: nuevas, datos: datos, resumen: resumen, lamina: lamina };
})(window);
