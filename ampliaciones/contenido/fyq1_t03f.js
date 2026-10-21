/* ============================================================
   Física y Química I · ampliaciones · Tema 3: Formulación y nomenclatura inorgánica
   (parte F: ejercicios y registro del tema)
   Los ejercicios de formulación salen del motor B.lab.formulacion y llevan «verif»: la verificación independiente
   (herramientas/verificar_fyq1_t3.py) comprueba cada fórmula y cada nombre con su propio nombrador.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h;
  var F = B.lab.formulacion, T = B.parte.t3, fm = T.fm, nm = T.nm, bn = T.bn, sg = T.sg, R = T.R, CUENTAS = T.CUENTAS;
  var SIS = { sist: "sistemática", stock: "de Stock", trad: "tradicional" };
  function sinRep(l) { var o = []; l.forEach(function (x) { if (o.indexOf(x) < 0) o.push(x); }); return o; }
  function pistaIon(r) {
    if (r.cat && r.a != null && r.an != null) return "Cargas: " + F.pintarIon(r.cat, r.v) + (r.fam === "salBin" && r.tipo === "nometal" ? "" : "") + " y " + (r.an ? F.pintarIon(r.an, -r.a) : "") + ". Cruza y simplifica.";
    return "Cuenta los átomos de cada elemento y comprueba que la suma de cargas da 0.";
  }
  function pasosDe(r, final) { var l = ["Familia: <b>" + F.FAMTXT[r.fam] + "</b>."].concat(F.explica(r)); l.push(final); return l; }

  // nombre → fórmula
  function ejNF(id, nivel, f, sis, extra) {
    var r = R(f), nombre = nm(f, sis);
    return { id: id, nivel: nivel,
      enunciado: "Escribe la fórmula de «<b>" + nombre + "</b>» (nomenclatura " + SIS[sis] + ")." + (r.fam === "hidracido" && sis === "trad" ? " <small>(en disolución acuosa)</small>" : "") + (extra && extra.nota ? " " + extra.nota : ""),
      check: { tipo: "texto", etiqueta: "Fórmula:", valores: [r.f], formula: true, ph: "p. ej. Fe2(SO4)3" },
      pistas: [F.CONSEJO[r.fam], pistaIon(r)],
      pasos: pasosDe(r, "Fórmula: <b>" + fm(f) + "</b>."), resultado: fm(f),
      verif: [{ f: r.f, q: r.ion ? r.q : 0, sis: sis, dir: "nf", nombre: nombre }] };
  }
  // fórmula → nombre
  function ejFN(id, nivel, f, sis, extra) {
    var r = R(f), val = F.nombres(r, sis).slice(), otras = sinRep(F.todosNombres(r).filter(function (n) { return val.indexOf(n) < 0; }));
    return { id: id, nivel: nivel,
      enunciado: "Nombra <b>" + fm(f) + (r.fam === "hidracido" ? (sis === "trad" ? "(aq)" : "(g)") : "") + "</b> con nomenclatura " + SIS[sis] + "." + (extra && extra.nota ? " " + extra.nota : ""),
      check: { tipo: "texto", etiqueta: "Nombre:", valores: val, otras: otras, ph: "nombre del compuesto" },
      pistas: [F.CONSEJO[r.fam], r.oxs.length > 1 ? "Calcula primero el número de oxidación del elemento que no es fijo (suma de cargas = 0)." : "Mira los elementos."],
      pasos: pasosDe(r, "Nombre (" + SIS[sis] + "): <b>" + val[0] + "</b>."), resultado: "<b>" + val[0] + "</b>",
      verif: [{ f: r.f, q: r.ion ? r.q : 0, sis: sis, dir: "fn" }] };
  }
  function ejOx(id, nivel, f, el, enun) {
    var r = R(f), e = F.ecuacionOx(r, el);
    return { id: id, nivel: nivel, enunciado: enun || "¿Cuál es el número de oxidación de <b>" + F.nombreEl(el) + " (" + el + ")</b> en <b>" + fm(f) + "</b>? <small>(escríbelo con signo: +6, −2…)</small>",
      check: { tipo: "num", etiqueta: "n.º de oxidación =", valor: e.x },
      pistas: ["Usa los valores fijos (O −2, H +1, metales alcalinos +1…) y la suma de cargas.", "Escribe la ecuación con x para el elemento que buscas."],
      pasos: ["Valores fijos: " + r.oxs.filter(function (t) { return t[0] !== el; }).map(function (t) { return F.nombreEl(t[0]) + " " + sg(t[2]) + " (×" + t[1] + ")"; }).join(", ") + ".", "Suma = " + (r.ion ? "carga del ion " + sg(r.q) : "0") + ": " + e.eq + ".", "Despejando: x = " + sg(e.x) + "."],
      resultado: sg(e.x), verif: [{ f: r.f, q: r.ion ? r.q : 0, dir: "oxi", el: el, ox: e.x }] };
  }
  function ejFam(id, nivel, f, correcta, otras) {
    var r = R(f), op = [F.FAM[r.fam]].concat(otras);
    return { id: id, nivel: nivel, enunciado: "¿A qué familia de compuestos pertenece <b>" + fm(f) + "</b>?",
      check: { tipo: "opcion", etiqueta: "Familia:", opciones: op, ok: 0 }, pistas: [F.CONSEJO[r.fam]],
      pasos: pasosDe(r, "Familia: <b>" + F.FAM[r.fam].toLowerCase() + "</b>."), resultado: F.FAM[r.fam], verif: [{ f: r.f, dir: "fam", fam: r.fam }] };
  }

  var E = [];
  // ------------------------------------------------------------ nivel 1
  E.push(ejNF("e1", 1, "MgO", "stock"));
  E.push(ejFN("e2", 1, "Na2O", "stock"));
  E.push(ejNF("e3", 1, "KOH", "stock"));
  E.push(ejFN("e4", 1, "Fe2O3", "sist"));
  E.push(ejNF("e5", 1, "HCl", "trad"));
  E.push(ejFN("e6", 1, "HNO3", "trad"));
  E.push(ejNF("e7", 1, "KCl", "stock"));
  E.push(ejFN("e8", 1, "CO2", "sist"));
  E.push(ejNF("e9", 1, "Na2SO4", "stock"));
  E.push(ejOx("e10", 1, "SO3", "S"));
  E.push(ejFam("e11", 1, "Mg(OH)2", 0, ["Óxidos", "Hidruros metálicos", "Sales binarias"]));
  E.push(ejNF("e12", 1, "FeO", "stock"));
  E.push(ejNF("e13", 1, "CaH2", "stock"));
  E.push(ejFN("e14", 1, "H2SO3", "trad"));
  E.push({ id: "e15", nivel: 1, enunciado: "Al formular el óxido de aluminio (Al<sup>3+</sup> y O<sup>2−</sup>) por cruce de valencias, ¿qué subíndice lleva el oxígeno?",
    check: { tipo: "num", etiqueta: "Subíndice del O =", valor: 3 }, pistas: ["El subíndice del oxígeno es la valencia del aluminio, dividida por el máximo común divisor de 3 y 2."],
    pasos: ["Cruce: Al<sub>2</sub>O<sub>3</sub>: el 3 del aluminio pasa al oxígeno y el 2 del oxígeno, al aluminio.", "2 y 3 no tienen divisor común (mcd = 1), así que no se simplifica.", "Fórmula: " + fm("Al2O3") + " → el subíndice del oxígeno es 3."], resultado: "3 (" + fm("Al2O3") + ")" });
  CUENTAS.push({ py: "3//__import__('math').gcd(3,2)", val: 3 });
  E.push(ejFN("e16", 1, "NaCl", "stock"));

  // ------------------------------------------------------------ nivel 2
  E.push(ejNF("f1", 2, "BaO2", "stock"));
  E.push(ejFN("f2", 2, "Cu2O", "stock"));
  E.push(ejNF("f3", 2, "Pb(OH)4", "stock"));
  E.push(ejFN("f4", 2, "Al2(SO4)3", "sist"));
  E.push(ejNF("f5", 2, "NaClO", "trad"));
  E.push(ejFN("f6", 2, "KMnO4", "stock"));
  E.push(ejNF("f7", 2, "K2Cr2O7", "stock"));
  E.push(ejFN("f8", 2, "NaHCO3", "stock"));
  E.push(ejNF("f9", 2, "Ca3(PO4)2", "stock"));
  (function () {
    var r = R("FeCl3");
    E.push({ id: "f10", nivel: 2, enunciado: "Escribe los tres nombres de <b>" + fm("FeCl3") + "</b>.",
      check: [{ tipo: "texto", etiqueta: "Sistemática:", valores: F.nombres(r, "sist"), ph: "con prefijos" }, { tipo: "texto", etiqueta: "Stock:", valores: F.nombres(r, "stock"), ph: "con romanos" }, { tipo: "texto", etiqueta: "Tradicional:", valores: F.nombres(r, "trad"), ph: "-oso/-ico" }],
      pistas: ["Sistemática: prefijos que cuentan átomos. Stock: número romano del hierro. Tradicional: -oso (menor) o -ico (mayor).", "Fe tiene +3 porque 3 Cl⁻ suman −3."],
      pasos: pasosDe(r, "Sistemática: <b>" + nm("FeCl3", "sist") + "</b>; Stock: <b>" + nm("FeCl3", "stock") + "</b>; tradicional: <b>" + nm("FeCl3", "trad") + "</b>."), resultado: nm("FeCl3", "sist") + " · " + nm("FeCl3", "stock") + " · " + nm("FeCl3", "trad"),
      verif: [{ f: "FeCl3", sis: "sist", dir: "fn", campo: 0 }, { f: "FeCl3", sis: "stock", dir: "fn", campo: 1 }, { f: "FeCl3", sis: "trad", dir: "fn", campo: 2 }] });
  })();
  E.push(ejNF("f11", 2, "HClO4", "trad"));
  E.push(ejFN("f12", 2, "Ca(OH)2", "sist"));
  E.push(ejOx("f13", 2, "KMnO4", "Mn"));
  E.push(ejOx("f14", 2, "K2Cr2O7", "Cr"));
  E.push({ id: "f15", nivel: 2, enunciado: "¿Cuál es el número de oxidación del nitrógeno en el ion amonio, NH<sub>4</sub><sup>+</sup>? <small>(con signo)</small>",
    check: { tipo: "num", etiqueta: "n.º de oxidación =", valor: -3 }, pistas: ["La suma de los números de oxidación de un ion es su carga: +1."],
    pasos: ["H es +1 (×4); el ion tiene carga +1.", "x + 4·(+1) = +1.", "x = 1 − 4 = <b>−3</b> (el N actúa con su valencia negativa: es el mismo que en el NH₃)."], resultado: "−3" });
  CUENTAS.push({ py: "1-4", val: -3 });
  E.push(ejNF("f16", 2, "CCl4", "sist"));
  E.push(ejFN("f17", 2, "PCl5", "stock"));
  E.push(ejFN("f18", 2, "Na2O2", "stock"));
  E.push(ejNF("f19", 2, "Cu(NO3)2", "stock"));
  E.push(ejNF("f20", 2, "NH3", "trad"));
  E.push(ejNF("f21", 2, "Fe2O3", "trad"));
  E.push(ejNF("f22", 2, "HNO2", "trad"));

  // ------------------------------------------------------------ nivel 3
  E.push(ejNF("g1", 3, "Fe(HSO4)3", "stock"));
  E.push(ejFN("g2", 3, "(NH4)2SO4", "sist"));
  E.push(ejNF("g3", 3, "H2Cr2O7", "sist"));
  E.push(ejFN("g4", 3, "Fe2(CO3)3", "stock"));
  (function () {
    var f = ["HBrO", "HBrO2", "HBrO3", "HBrO4"], et = ["+1", "+3", "+5", "+7"];
    E.push({ id: "g5", nivel: 3, enunciado: "El bromo forma cuatro oxoácidos, como el cloro. Escribe la fórmula de cada uno: <b>ácido hipobromoso</b> (Br +1), <b>ácido bromoso</b> (+3), <b>ácido brómico</b> (+5) y <b>ácido perbrómico</b> (+7).",
      check: f.map(function (x, i) { return { tipo: "texto", etiqueta: "Br " + et[i] + ":", valores: [R(x).f], formula: true, ph: "HBrO…" }; }),
      pistas: ["Es la misma serie que la del cloro: 1, 2, 3 y 4 oxígenos.", "Comprobación con cargas: 1 + (n.º de oxidación) − 2·(n.º de O) = 0."],
      pasos: f.map(function (x, i) { return "Br " + et[i] + ": H + Br + " + (i + 1) + " O → <b>" + fm(x) + "</b> (" + nm(x, "trad") + ")."; }), resultado: f.map(function (x) { return fm(x); }).join(" · "),
      verif: f.map(function (x, i) { return { f: R(x).f, sis: "trad", dir: "nf", nombre: nm(x, "trad"), campo: i }; }) });
  })();
  E.push({ id: "g6", nivel: 3, enunciado: "Un óxido de hierro contiene un 69,94 % de Fe en masa. Su fórmula es Fe<sub>2</sub>O<sub><i>x</i></sub>. ¿Cuánto vale <i>x</i>? (A<sub>r</sub>: Fe = 55,845; O = 15,999)",
    check: { tipo: "num", etiqueta: "x =", valor: 3 }, pistas: ["En 100 g hay 69,94 g de Fe y 30,06 g de O: pasa a moles y busca la proporción."],
    pasos: ["Moles de Fe: 69,94/55,845 = 1,2524 mol. Moles de O: 30,06/15,999 = 1,8789 mol.", "Cociente O/Fe = 1,8789/1,2524 = 1,50 → 3 O por cada 2 Fe.", "Fórmula: " + fm("Fe2O3") + " (" + nm("Fe2O3", "stock") + "): x = 3."], resultado: "x = 3" });
  CUENTAS.push({ py: "round(2*55.845/(2*55.845+3*15.999)*100,2)", val: 69.94 });
  (function () {
    var buenas = [["Fe(OH)3", "stock"], ["HClO3", "trad"], ["Na2SO3", "stock"]], mala = ["CaO2", "óxido de calcio"];
    var op = [fm("Fe(OH)3") + " — " + nm("Fe(OH)3", "stock"), fm("CaO2") + " — óxido de calcio", fm("HClO3") + " — " + nm("HClO3", "trad"), fm("Na2SO3") + " — " + nm("Na2SO3", "stock")];
    E.push({ id: "g7", nivel: 3, enunciado: "¿Cuál de estas parejas fórmula–nombre es <b>incorrecta</b>?",
      check: { tipo: "opcion", etiqueta: "Incorrecta:", opciones: op, ok: 1 }, pistas: ["Mira con cuidado la que tiene dos oxígenos con el calcio."],
      pasos: ["Fe(OH)₃ es hidróxido de hierro(III) ✓; HClO₃ es el ácido clórico ✓; Na₂SO₃ es el sulfito de sodio ✓.", "CaO₂ no es el «óxido de calcio» (ese es el CaO): es el <b>peróxido de calcio</b>, " + nm("CaO2", "stock") + "."], resultado: fm("CaO2") + " — óxido de calcio",
      verif: [{ f: "CaO2", dir: "fam", fam: "peroxido" }] });
  })();
  E.push({ id: "g8", nivel: 3, enunciado: "Explica por qué la fórmula del peróxido de sodio es Na<sub>2</sub>O<sub>2</sub> y no NaO, y cómo se distingue del óxido de sodio.",
    check: { tipo: "rubrica", etiqueta: "Tu explicación:", filas: 6, items: [
      { t: "El peróxido contiene el ion O₂²⁻ (grupo peróxido), con carga 2− y cada O con número de oxidación −1.", p: 0.5 },
      { t: "El grupo O₂ es una unidad: no se puede simplificar (dos Na⁺ por cada O₂²⁻).", p: 0.5 },
      { t: "Comprobación de cargas: 2·(+1) + 1·(−2) = 0 (con NaO la carga no cuadra para el ion O²⁻).", p: 0.5 },
      { t: "El óxido de sodio es Na₂O (O²⁻, número de oxidación −2); el peróxido tiene un oxígeno más.", p: 0.5 }] },
    pistas: ["Piensa en el ion peróxido y en su carga."],
    pasos: ["Peróxido: grupo O₂²⁻ (O con −1).", "Cruce con Na⁺: Na₂(O₂)₁ → " + fm("Na2O2") + "; el grupo O₂ no se divide.", "Óxido de sodio: Na₂O (O²⁻). Diferencia: un O más y número de oxidación −1 en vez de −2."], resultado: "Na₂O₂ (peróxido de sodio) frente a Na₂O (óxido de sodio)" });
  E.push({ id: "g9", nivel: 3, enunciado: "Relaciona los ácidos HPO<sub>3</sub>, H<sub>3</sub>PO<sub>4</sub> y H<sub>4</sub>P<sub>2</sub>O<sub>7</sub> con el mismo óxido, P<sub>2</sub>O<sub>5</sub>, y explica sus nombres.",
    check: { tipo: "rubrica", etiqueta: "Tu explicación:", filas: 6, items: [
      { t: "Todos se obtienen de P₂O₅ con distinta cantidad de agua: 1, 3 o 2 H₂O (según el ácido).", p: 0.5 },
      { t: "P₂O₅ + H₂O → 2 HPO₃ (ácido metafosfórico: poca agua, «meta»).", p: 0.5 },
      { t: "P₂O₅ + 3 H₂O → 2 H₃PO₄ (ácido fosfórico u ortofosfórico: la forma habitual, el «orto» se omite).", p: 0.5 },
      { t: "P₂O₅ + 2 H₂O → H₄P₂O₇ (ácido difosfórico): 2 H₃PO₄ − H₂O.", p: 0.5 }] },
    pistas: ["Escribe las tres ecuaciones y compara el agua añadida."],
    pasos: ["P₂O₅ + H₂O → 2 " + fm("HPO3") + " (" + nm("HPO3", "trad") + ").", "P₂O₅ + 3 H₂O → 2 " + fm("H3PO4") + " (" + nm("H3PO4", "trad") + ").", "P₂O₅ + 2 H₂O → " + fm("H4P2O7") + " (" + nm("H4P2O7", "trad") + ")."], resultado: "meta (1 H₂O), orto (3 H₂O), di (2 H₂O)" });
  E.push(ejNF("g10", 3, "Fe2(CO3)3", "sist"));
  E.push({ id: "g11", nivel: 3, enunciado: "¿Cuántos átomos hay en total en una unidad fórmula de Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>?",
    check: { tipo: "num", etiqueta: "Átomos =", valor: 17 }, pistas: ["Multiplica el subíndice del paréntesis por los de dentro."],
    pasos: ["Fe: 2.", "S: 1·3 = 3.", "O: 4·3 = 12.", "Total: 2 + 3 + 12 = <b>17</b>."], resultado: "17 átomos" });
  CUENTAS.push({ py: "2+3+4*3", val: 17 });
  E.push(ejNF("g12", 3, "CaHPO4", "stock"));
  E.push(ejFN("g13", 3, "Mg(ClO4)2", "sist"));
  E.push({ id: "g14", nivel: 3, enunciado: "La neutralización del ácido sulfúrico con el hidróxido de aluminio es H<sub>2</sub>SO<sub>4</sub> + Al(OH)<sub>3</sub> → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O. Ajústala y da la <b>suma de todos los coeficientes</b> (reactivos y productos).",
    check: { tipo: "num", etiqueta: "Suma =", valor: 12 }, pistas: ["Empieza por los grupos sulfato: Al₂(SO₄)₃ pide 3 H₂SO₄ y 2 Al(OH)₃."],
    pasos: ["3 H₂SO₄ + 2 Al(OH)₃ → Al₂(SO₄)₃ + 6 H₂O.", "H: 6 + 6 = 12 ✓ (6 H₂O); O: 12 + 6 = 18 ✓; S: 3 ✓; Al: 2 ✓.", "Suma: 3 + 2 + 1 + 6 = <b>12</b>."], resultado: "12" });
  CUENTAS.push({ py: "3+2+1+6", val: 12 });
  (function () {
    var r = R("Ca(ClO)2");
    E.push({ id: "g15", nivel: 3, enunciado: "El hipoclorito de calcio se usa para desinfectar piscinas. Escribe su fórmula y su nombre en nomenclatura sistemática.",
      check: [{ tipo: "texto", etiqueta: "Fórmula:", valores: [r.f], formula: true, ph: "Ca…" }, { tipo: "texto", etiqueta: "Sistemática:", valores: F.nombres(r, "sist"), ph: "bis(…) de …" }],
      pistas: ["Hipoclorito = ClO⁻ (Cl +1). El calcio es +2.", "Dos grupos ClO entre paréntesis; en sistemática, «bis»."],
      pasos: pasosDe(r, "Fórmula: <b>" + fm("Ca(ClO)2") + "</b>; sistemática: <b>" + nm("Ca(ClO)2", "sist") + "</b>."), resultado: fm("Ca(ClO)2") + " · " + nm("Ca(ClO)2", "sist"),
      verif: [{ f: r.f, sis: "stock", dir: "nf", nombre: "hipoclorito de calcio", campo: 0 }, { f: r.f, sis: "sist", dir: "fn", campo: 1 }] });
  })();
  E.push({ id: "g16", nivel: 3, enunciado: "Se neutraliza ácido clorhídrico con hidróxido de aluminio. ¿Qué sal se forma?",
    check: { tipo: "opcion", etiqueta: "Sal:", opciones: [fm("AlCl3") + " (" + nm("AlCl3", "stock") + ")", fm("Al2(SO4)3") + " (" + nm("Al2(SO4)3", "stock") + ")", "Al(ClO₃)₃ (clorato de aluminio)", "AlOCl (oxicloruro de aluminio)"], ok: 0 },
    pistas: ["El HCl es un hidrácido: su sal es un «-uro»."],
    pasos: ["HCl pierde el H⁺ y queda el anión Cl⁻ (cloruro); Al(OH)₃ aporta Al³⁺.", "Cruce: " + fm("AlCl3") + ".", "Ecuación: 3 HCl + Al(OH)₃ → AlCl₃ + 3 H₂O."], resultado: fm("AlCl3") + ", " + nm("AlCl3", "stock") });
  // el único «incorrecto» de g7 se anota para la verificación: «óxido de calcio» NO es un nombre del CaO₂
  T.USADOS.push({ f: "CaO2", sis: "any", t: "óxido de calcio", q: 0, no: true });
  E.forEach(function (e) { if (e.check && !Array.isArray(e.check) && e.check.tipo === "opcion" && e.verif) e.verif = e.verif.filter(function (v) { return v.dir === "fam"; }); });

  // ------------------------------------------------------------ registro
  var A = B.parte.t3a.secciones, Bb = B.parte.t3b.secciones, secciones = {};
  Object.keys(A).forEach(function (k) { secciones[k] = A[k]; });
  Object.keys(Bb).forEach(function (k) { secciones[k] = Bb[k]; });
  var nuevas = B.parte.t3c.nuevas.concat(B.parte.t3d.nuevas, B.parte.t3e.nuevas);
  // El resaltador de variables matemáticas de la página (clase «mv») tiñe trozos de fórmulas como «O₃» de Fe₂O₃.
  // Una envoltura con la clase «mv» lo hace saltarse este texto (estilos en estilos.css: .mv.q3f no cambia el aspecto).
  function env(h) { return '<div class="mv q3f">' + h + "</div>"; }
  Object.keys(secciones).forEach(function (k) { secciones[k] = env(secciones[k]); });
  nuevas.forEach(function (n) { n.html = env(n.html); });
  var Z = B.parte.t3e;
  B.registrar("fyq1", "t3", { resumen: Z.resumen, secciones: secciones, nuevas: nuevas, datos: Z.datos, ejercicios: E, lamina: Z.lamina, verif: T.USADOS, cuentas: CUENTAS });
})(window);
