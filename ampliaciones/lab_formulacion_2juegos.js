/* ============================================================
   Bachi para Firu · simuladores de formulación inorgánica, segunda parte (Física y Química I, tema 3)
   q3_entrenador · q3_comparador · q3_error · q3_pares · q3_familia · q3_decision
   Usan el motor B.lab.formulacion (lab_formulacion_0motor.js) y sus explicaciones (lab_formulacion_1base.js).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;
  var F = B.lab.formulacion;
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return B.esc(s); }
  function azar(l) { return l[Math.floor(Math.random() * l.length)]; }
  function pasos(l) { return "<ol class='steps'>" + l.map(function (p) { return "<li class='step'><div class='math-line'>" + p + "</div></li>"; }).join("") + "</ol>"; }
  function campoTexto(host, et, ancho, ph) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (ph || "") + '" style="width:' + (ancho || 220) + 'px;max-width:100%" aria-label="' + esc(et.replace(/<[^>]+>/g, "")) + '">';
    host.appendChild(l); return l.querySelector("input");
  }
  var SIS_TXT = { sist: "sistemática", stock: "de Stock", trad: "tradicional", any: "cualquiera" };
  var FAMS = ["oxido", "peroxido", "hidroxido", "hidruroM", "hidruroN", "hidracido", "oxoacido", "salBin", "oxisal", "salAcida", "ion"];
  var FAM_CORTO = { oxido: "Óxidos", peroxido: "Peróxidos", hidroxido: "Hidróxidos", hidruroM: "Hidruros metálicos", hidruroN: "Hidruros no met.", hidracido: "Hidrácidos", oxoacido: "Oxoácidos", salBin: "Sales binarias", oxisal: "Oxisales", salAcida: "Sales ácidas", ion: "Iones" };
  function todos(r) { return F.todosNombres(r); }
  function nom(r, s) { return F.nombre(r, s) || F.nombre(r, "sist"); }
  function solucionHtml(r) {
    var l = [];
    l.push("Fórmula: <b>" + F.html(r) + "</b> · " + F.FAMTXT[r.fam]);
    F.sistemasDe(r).forEach(function (s) { l.push("Nomenclatura " + SIS_TXT[s] + ": <b>" + esc(F.nombres(r, s).join("</b> · <b>")) + "</b>"); });
    return pasos(l.concat(F.explica(r)));
  }

  // ---------- diagnóstico de errores ----------
  function diagNombre(r, sis, txt) {
    var sisOk = F.sistemaDe(r, txt);
    if (sisOk.length && sis !== "any") return "Ese nombre es correcto, pero es de la nomenclatura <b>" + SIS_TXT[sisOk[0]] + "</b>; aquí se pide la <b>" + SIS_TXT[sis] + "</b>.";
    var otro = F.porNombre(txt).filter(function (x) { return x !== r; })[0];
    if (otro) return "Ese nombre corresponde a <b>" + F.html(otro) + "</b>, no a <b>" + F.html(r) + "</b>." + (otro.fam !== r.fam ? " Has confundido la familia: " + F.FAM[r.fam].toLowerCase() + " frente a " + F.FAM[otro.fam].toLowerCase() + "." : (otro.cat === r.cat ? " Mismo elemento, distinta valencia o distinto anión: revisa los números." : ""));
    var k = B.normTexto(txt), c = B.normTexto(nom(r, sis === "any" ? "sist" : sis)), a = k.split(" "), b = c.split(" ");
    if (a[0] === b[0]) return "El principio va bien (" + esc(a[0]) + "…), pero el resto no cuadra. " + F.CONSEJO[r.fam];
    return F.CONSEJO[r.fam];
  }
  function diagFormula(r, txt) {
    var o = F.hallar(txt);
    if (o) return "Esa fórmula es la de <b>" + esc(nom(o, "stock")) + "</b>, no la que se pide.";
    var a = F.atomos(txt), b = F.atomos(r.f);
    if (!a) return "No puedo leer esa fórmula: los símbolos llevan mayúscula inicial y los subíndices son números (Fe2(SO4)3).";
    var ka = Object.keys(a).sort().join(), kb = Object.keys(b).sort().join();
    if (ka === kb && Object.keys(b).every(function (k) { return a[k] === b[k]; })) return "Tienes los mismos átomos, pero la fórmula no está bien escrita: revisa el orden de los símbolos y los paréntesis.";
    if (ka === kb) return "Los elementos son los correctos, pero los subíndices no: cruza las valencias (y simplifica).";
    return F.CONSEJO[r.fam];
  }
  function lineaFormulas(r) { return F.html(r); }

  // ============================================================
  // Q3_ENTRENADOR: fórmula → nombre y nombre → fórmula, con corrección y racha
  // ============================================================
  B.w.q3_entrenador = function (host, args) {
    args = args || {};
    var cuerpo = B.caja(host, "Entrenamiento", args.titulo || "Entrenador: fórmula ⟷ nombre");
    var base = args.fams && args.fams.length ? args.fams : FAMS;
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Ejercicio</span><div data-modo class="chips"></div></div><div class="q3-fila" data-ffam><span class="q3-lab">Familia</span><div data-fam class="chips"></div></div>' +
      '<div class="q3-fila"><span class="q3-lab">Nomenclatura</span><div data-sis class="chips"></div></div><div class="q3-fila"><span class="q3-lab">Nivel</span><div data-niv class="chips"></div></div></div>' +
      '<div class="q3-prob"></div><div data-ctl></div><div class="lectura anch"></div><div class="q3-sol" hidden></div><p class="w-pie">Escribe la fórmula con números normales (H2SO4, Fe2(SO4)3, NH4+ para un ion) o con subíndices; los nombres admiten tildes o no y mayúsculas o no. «Examen» hace 10 preguntas seguidas y te da la nota.</p>';
    var st = { modo: args.modo || "mix", fam: args.fam || (base.length === 1 ? base[0] : "todas"), sis: args.sis || "any", niv: args.niv || 1, r: null, q: null, racha: 0, ac: 0, n: 0, exam: false, ex: null, mejor: B.ls.get("q3:mejor", 0) };
    var prob = cuerpo.querySelector(".q3-prob"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".q3-sol");
    var inp = campoTexto(ctl, "Tu respuesta", 260, "fórmula o nombre"), acc = el("div", "ctl"), btnSig;
    cuerpo.insertBefore(acc, lectura);
    function marcador() {
      var h = fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.ac + " de " + st.n, "pen") + fil("Mejor racha", String(st.mejor), "");
      if (st.exam) h += fil("Examen", (st.ex.n) + " / 10", "red");
      return h;
    }
    function lista() {
      var fams = st.fam === "todas" ? base : [st.fam];
      return F.muestra(fams, st.niv, st.sis === "any" ? null : st.sis);
    }
    function nueva() {
      var L = lista(); if (!L.length) { prob.innerHTML = "<p class='q3-enun'>No hay compuestos con esa combinación (prueba con otra nomenclatura).</p>"; return; }
      var r, c = 0; do { r = azar(L); c++; } while (r === st.r && L.length > 1 && c < 30);
      var modo = st.modo === "mix" ? azar(["fn", "nf"]) : st.modo, sis = r.ion ? "any" : (st.sis === "any" ? azar(F.sistemasDe(r)) : st.sis);
      st.r = r; st.q = { modo: modo, sis: sis };
      var sufijo = r.fam === "hidracido" ? (sis === "trad" ? "(aq)" : "(g)") : "";
      if (modo === "fn") prob.innerHTML = "<p class='q3-enun'>Nombra <b class='q3-big'>" + F.html(r) + sufijo + "</b>" + (r.ion ? "" : " con nomenclatura <b>" + SIS_TXT[sis] + "</b>") + ".</p>";
      else prob.innerHTML = "<p class='q3-enun'>Escribe la fórmula de <b class='q3-big'>" + esc(nom(r, sis === "any" ? "stock" : sis)) + "</b>" + (r.ion ? "" : " <small>(nomenclatura " + SIS_TXT[sis] + ")</small>") + (r.fam === "hidracido" && sis === "trad" ? " <small>(en disolución acuosa)</small>" : "") + ".</p>";
      inp.value = ""; inp.placeholder = modo === "fn" ? "nombre del compuesto" : "fórmula"; sol.hidden = true; sol.innerHTML = ""; lectura.innerHTML = marcador(); st.hecho = false;
      if (btnSig) btnSig.style.display = "none";
    }
    function comprobar() {
      if (st.hecho && st.exam) return;
      var txt = inp.value; if (!txt.trim()) { lectura.innerHTML = marcador() + fil("Escribe algo", "Pon tu respuesta en la casilla.", "red ancho"); return; }
      var r = st.r, q = st.q, ok, msg = "";
      if (q.modo === "fn") { ok = F.compruebaNombre(r, q.sis, txt); if (!ok) msg = diagNombre(r, q.sis, txt); }
      else { ok = F.compruebaFormula(r, txt); if (!ok) msg = diagFormula(r, txt); }
      st.n++; if (ok) { st.ac++; st.racha++; if (st.racha > st.mejor) { st.mejor = st.racha; B.ls.set("q3:mejor", st.mejor); } } else st.racha = 0;
      if (st.exam) { st.ex.n++; if (ok) st.ex.ok++; else st.ex.fallos.push({ r: r, q: q, txt: txt }); }
      lectura.innerHTML = marcador() + fil(ok ? "✓ Correcto" : "✗ Todavía no", ok ? "¡Bien! " : msg, ok ? "ok ancho" : "red ancho");
      if (ok || st.exam) { sol.hidden = false; sol.innerHTML = solucionHtml(r); }
      st.hecho = true;
      if (st.exam) { btnSig.style.display = ""; btnSig.textContent = st.ex.n >= 10 ? "Ver mi nota" : "Siguiente"; }
    }
    function verSol() { sol.hidden = false; sol.innerHTML = solucionHtml(st.r); }
    function siguiente() {
      if (st.exam && st.ex.n >= 10) { fin(); return; }
      nueva();
    }
    function fin() {
      var e = st.ex, nota = e.ok;
      prob.innerHTML = "<p class='q3-enun'><b>Examen terminado:</b> " + nota + " de 10 (" + nota + "/10 → " + (nota >= 9 ? "¡sobresaliente!" : nota >= 7 ? "notable" : nota >= 5 ? "aprobado, a repasar los fallos" : "hay que repasar el tema") + ").</p>" +
        (e.fallos.length ? "<ul class='q3-fallos'>" + e.fallos.map(function (f) { return "<li><b>" + F.html(f.r) + "</b> (" + (f.q.modo === "fn" ? "nombre " + SIS_TXT[f.q.sis] : "fórmula") + "): tú escribiste «" + esc(f.txt) + "»; correcto: <b>" + esc(f.q.modo === "fn" ? nom(f.r, f.q.sis === "any" ? "stock" : f.q.sis) : F.pintar(f.r.f)) + "</b></li>"; }).join("") + "</ul>" : "<p>Ni un fallo.</p>");
      sol.hidden = true; btnSig.style.display = "none"; st.exam = false; st.ex = null; chipsModo(); lectura.innerHTML = marcador();
    }
    U.boton(acc, "Comprobar", comprobar, "btn-comprobar"); U.boton(acc, "Ver solución", verSol); U.boton(acc, "Otro", function () { if (st.exam) return; nueva(); });
    btnSig = U.boton(acc, "Siguiente", siguiente); btnSig.style.display = "none";
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); if (st.hecho && st.exam) siguiente(); else comprobar(); } });
    function chipsModo() {
      U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "mix", t: "Mezcla" }, { k: "fn", t: "Fórmula → nombre" }, { k: "nf", t: "Nombre → fórmula" }, { k: "examen", t: "Examen de 10" }], st.exam ? "examen" : st.modo, function (k) {
        if (k === "examen") { st.exam = true; st.ex = { n: 0, ok: 0, fallos: [] }; st.n = 0; st.ac = 0; st.racha = 0; if (st.modo !== "fn" && st.modo !== "nf") st.modo = "mix"; nueva(); }
        else { st.modo = k; st.exam = false; nueva(); }
      });
    }
    chipsModo();
    if (base.length > 1) U.fichas(cuerpo.querySelector("[data-fam]"), [{ k: "todas", t: "Todas" }].concat(base.map(function (f) { return { k: f, t: FAM_CORTO[f] }; })), st.fam, function (k) { st.fam = k; nueva(); });
    else cuerpo.querySelector("[data-ffam]").style.display = "none";
    U.fichas(cuerpo.querySelector("[data-sis]"), [{ k: "any", t: "Al azar" }, { k: "sist", t: "Sistemática" }, { k: "stock", t: "Stock" }, { k: "trad", t: "Tradicional" }], st.sis, function (k) { st.sis = k; nueva(); });
    U.fichas(cuerpo.querySelector("[data-niv]"), [{ k: "1", t: "Básico (habitual)" }, { k: "2", t: "Todo el catálogo" }], String(st.niv), function (k) { st.niv = +k; nueva(); });
    nueva();
  };

  // ============================================================
  // Q3_COMPARADOR: los tres sistemas de un mismo compuesto
  // ============================================================
  B.w.q3_comparador = function (host, args) {
    args = args || {};
    var cuerpo = B.caja(host, "Pruébalo", "Los tres sistemas de nomenclatura, lado a lado");
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Familia</span><div data-fam class="chips"></div></div><div class="q3-fila"><span class="q3-lab">Compuesto</span><div data-co class="chips q3-lista"></div></div></div>' +
      '<div class="ctl" data-ctl></div><div class="q3-tres"></div><div class="q3-expl"></div><p class="w-pie">Los tres nombres son del mismo compuesto. Hoy se prefiere la sistemática (IUPAC 2005) y la de Stock; la tradicional se conserva sobre todo en los oxoácidos y sus sales (sulfúrico, nitrato…).</p>';
    var fams = args.fams || ["oxido", "peroxido", "hidroxido", "hidruroM", "hidracido", "oxoacido", "salBin", "oxisal", "salAcida"], st = { fam: args.fam || "oxido", r: null };
    var tres = cuerpo.querySelector(".q3-tres"), expl = cuerpo.querySelector(".q3-expl"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), inp = campoTexto(ctl, "o escribe una fórmula", 170, "Fe2O3");
    function muestra(f) { var L = F.porFam(f).filter(function (r) { return r.niv === 1; }); if (f === "oxido") { var vis = {}; L = L.filter(function (r) { var k = r.tipo + (r.tipo === "metal" ? r.cat : r.cat); return (r.tipo === "nometal" && ["C", "S", "N", "P"].indexOf(r.cat) >= 0) || (r.tipo === "metal" && ["Na", "Ca", "Al", "Fe", "Cu", "Pb", "Mg"].indexOf(r.cat) >= 0); }); } else if (L.length > 14) { var keep = ["Na", "Ca", "Al", "Fe", "Cu", "Mg", "Zn", "Ag", "K", "Pb", "NH4"]; L = L.filter(function (r) { return keep.indexOf(r.cat) >= 0; }); var bien = ["SO4", "NO3", "CO3", "PO4", "Cl", "S", "O", "ClO", "ClO3", "HCO3", "HSO4", "H2PO4", "HS", "SO3"]; if (f === "oxisal" || f === "salBin" || f === "salAcida") L = L.filter(function (r) { return bien.indexOf(r.an) >= 0; }); if (L.length > 14) L = L.filter(function (r, i) { return i % Math.ceil(L.length / 14) === 0; }); } return L; }
    function pinta() {
      var r = st.r; if (!r) return;
      var sist = F.nombres(r, "sist"), stock = F.nombres(r, "stock"), trad = F.nombres(r, "trad");
      function tarj(t, cl, nombres, nota) { return "<div class='q3-tj " + cl + "'><small>" + t + "</small><b>" + (nombres.length ? esc(nombres[0]) : "—") + "</b>" + (nombres.length > 1 ? "<span class='q3-alt'>también: " + nombres.slice(1).map(esc).join(" · ") + "</span>" : "") + (nombres.length ? "" : "<span class='q3-alt'>" + nota + "</span>") + "</div>"; }
      tres.innerHTML = "<div class='q3-form'><span class='q3-big'>" + F.html(r) + "</span><small>" + F.FAMTXT[r.fam] + "</small></div>" +
        tarj("Sistemática", "pen", sist, "no se usa") + tarj("De Stock", "ok", stock, "no se usa en esta familia") + tarj("Tradicional", "red", trad, "no existe en esta familia / sin sufijos -oso, -ico");
      expl.innerHTML = pasos(F.explica(r));
    }
    function lista() {
      var L = muestra(st.fam); if (!L.length) return;
      if (!st.r || st.r.fam !== st.fam) st.r = L[0];
      U.fichas(cuerpo.querySelector("[data-co]"), L.map(function (r) { return { k: r.f, t: F.html(r) }; }), st.r.f, function (k) { st.r = F.hallar(k); pinta(); });
    }
    U.fichas(cuerpo.querySelector("[data-fam]"), fams.map(function (f) { return { k: f, t: FAM_CORTO[f] }; }), st.fam, function (k) { st.fam = k; st.r = null; lista(); pinta(); });
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return; e.preventDefault();
      var r = F.hallar(inp.value);
      if (r && r.fam !== "ion") { st.r = r; st.fam = r.fam; U.fichas(cuerpo.querySelector("[data-fam]"), fams.map(function (f) { return { k: f, t: FAM_CORTO[f] }; }), fams.indexOf(r.fam) >= 0 ? r.fam : "", function (k) { st.fam = k; st.r = null; lista(); pinta(); }); cuerpo.querySelector("[data-co]").innerHTML = ""; pinta(); }
      else tres.innerHTML = "<p class='q3-enun'>No encuentro esa fórmula en el catálogo (prueba con Fe2O3, H2SO4, CaCO3, NaHCO3…).</p>";
    });
    lista(); pinta();
  };

  // ============================================================
  // Q3_ERROR: ¿cuál es el error? (generador de fórmulas y nombres mal escritos)
  // ============================================================
  var TIPOS = {
    cruce: "No ha cruzado las valencias (ha puesto la valencia como subíndice del mismo elemento)", simpl: "No ha simplificado los subíndices", parent: "Falta un paréntesis alrededor del grupo", orden: "Ha invertido el orden de los símbolos",
    romano: "El número romano (la valencia del metal) está equivocado", prefijo: "Un prefijo está equivocado: el número de átomos no cuadra", osoico: "Ha cambiado -oso por -ico (o al revés)",
    atoito: "Terminación -ato / -ito equivocada (n.º de oxidación del no metal)", familia: "Ha confundido la familia (óxido, hidróxido, peróxido, hidruro)", uro: "Ha confundido -uro con -ato / -ito (sal binaria frente a oxisal)",
    ninguno: "No hay ningún error: está bien escrito"
  };
  var TF = ["cruce", "simpl", "parent", "orden", "osoico", "atoito"], TN = ["romano", "prefijo", "osoico", "atoito", "familia", "uro"];
  var POR = {
    cruce: "La valencia de cada uno pasa a ser el subíndice <b>del otro</b> (cruce de valencias).", simpl: "Después de cruzar, los subíndices se dividen entre su máximo común divisor.",
    parent: "Un grupo poliatómico (OH, SO₄, NO₃…) que se repite va entre paréntesis.", orden: "Delante va el elemento menos electronegativo (el metal, o el H en los hidrácidos…).",
    romano: "El número romano es la valencia del metal en <b>ese</b> compuesto: se calcula con la suma de cargas = 0.", prefijo: "Los prefijos (mono-, di-, tri-…) cuentan átomos: deben coincidir con los subíndices.",
    osoico: "-oso = la valencia menor; -ico = la mayor.", atoito: "-ico → -ato (más oxígenos) y -oso → -ito (menos oxígenos).", familia: "Hidróxido = grupo OH; óxido = O sin H; peróxido = O₂; hidruro = H con −1.",
    uro: "-uro: anión sin oxígeno (cloruro); -ato / -ito: lleva oxígeno (clorato, hipoclorito).", ninguno: "Comprueba siempre: cargas que suman 0, paréntesis y prefijos."
  };
  function hermano(r, pred) {
    var l = F.CATALOGO.filter(function (x) { return x !== r && !x.ion && pred(x); });
    return l.length ? azar(l) : null;
  }
  function cambiaPrefijo(s) {
    var m = /(^|[ (])(di|tri|tetra|penta|hexa|hepta)(?=[a-záéíóúñ])/.exec(s);
    if (!m) return null;
    var otros = ["di", "tri", "tetra", "penta", "hexa"].filter(function (p) { return p !== m[2]; });
    var n = azar(otros);
    return s.slice(0, m.index) + m[1] + n + s.slice(m.index + m[0].length);
  }
  function crearError(niv, fams) {
    var L = F.muestra(fams || ["oxido", "hidroxido", "hidruroM", "salBin", "oxisal", "oxoacido", "salAcida"], niv).filter(function (r) { return !r.ion; });
    var intentos = 0, r, quiza;
    while (intentos++ < 60) {
      r = azar(L);
      if (Math.random() < 0.13) {                                        // sin error
        if (Math.random() < 0.5 && F.nombres(r, "stock").length) { var s0 = azar(F.sistemasDe(r)); return { tipo: "ninguno", kind: "nombre", r: r, sis: s0, mal: nom(r, s0), bien: nom(r, s0) }; }
        return { tipo: "ninguno", kind: "formula", r: r, sis: "stock", mal: F.pintar(r.f), bien: F.pintar(r.f) };
      }
      var kind = Math.random() < 0.5 ? "formula" : "nombre", tipos = (kind === "formula" ? TF : TN).slice().sort(function () { return Math.random() - 0.5; }), i, t, mal, sib, sis;
      var iónico = r.cat && r.a != null && (r.na != null || r.nx != null) && r.fam !== "hidruroN";
      var nA = r.na != null ? r.na : r.nx;
      for (i = 0; i < tipos.length; i++) {
        t = tipos[i]; mal = null; sis = "stock";
        if (kind === "formula") {
          if (t === "cruce" && iónico && F.gcd(r.v, r.a) === 1 && r.v !== r.a) mal = F.mk(r.cat, r.v) + F.mk(r.an, r.a);
          else if (t === "simpl" && iónico && F.gcd(r.v, r.a) > 1) mal = F.mk(r.cat, r.a) + F.mk(r.an, r.v);
          else if (t === "parent" && iónico && nA > 1 && F.poli(r.an)) mal = r.f.replace(/[()]/g, "");
          else if (t === "orden" && iónico && r.fam !== "oxisal" && r.fam !== "salAcida") mal = F.mk(r.an, nA) + F.mk(r.cat, r.nm);
          else if (t === "osoico" && r.fam === "oxoacido") { sib = hermano(r, function (x) { return x.fam === "oxoacido" && x.cat === r.cat && x.ox !== r.ox && x.nx === 1 && r.nx === 1; }); if (sib) { mal = sib.f; sis = "trad"; } }
          else if (t === "atoito" && r.fam === "oxisal") { sib = hermano(r, function (x) { return x.fam === "oxisal" && x.cat === r.cat && x.v === r.v && x.an !== r.an && F.atomos(x.an) && Object.keys(F.atomos(x.an)).sort().join() === Object.keys(F.atomos(r.an)).sort().join(); }); if (sib) { mal = sib.f; sis = "trad"; } }
          if (mal && mal !== r.f) return { tipo: t, kind: kind, r: r, sis: sis, mal: F.pintar(mal), bien: F.pintar(r.f) };
        } else {
          if (t === "romano" && r.cat && (r.fam === "oxido" || r.fam === "hidroxido" || r.fam === "salBin" || r.fam === "oxisal" || r.fam === "hidruroM") && F.MET[r.cat] && (F.MET[r.cat].v.length > 1)) { sib = hermano(r, function (x) { return x.fam === r.fam && x.cat === r.cat && x.an === r.an && x.v !== r.v; }); if (sib) mal = nom(sib, "stock"); sis = "stock"; }
          else if (t === "prefijo" && F.nombres(r, "sist").length && r.fam !== "hidruroN") { mal = cambiaPrefijo(nom(r, "sist")); sis = "sist"; if (mal && B.normTexto(mal) === B.normTexto(nom(r, "sist"))) mal = null; if (mal && F.porNombre(mal)[0] === r) mal = null; }
          else if (t === "osoico" && r.cat && F.MET[r.cat] && F.MET[r.cat].t && r.fam !== "ion") { sib = hermano(r, function (x) { return x.fam === r.fam && x.cat === r.cat && x.an === r.an && x.v !== r.v && F.nombres(x, "trad").length; }); if (sib && F.nombres(r, "trad").length) mal = nom(sib, "trad"); sis = "trad"; }
          else if (t === "atoito" && r.fam === "oxisal") { sib = hermano(r, function (x) { return x.fam === "oxisal" && x.cat === r.cat && x.v === r.v && x.an !== r.an && Object.keys(F.atomos(x.an)).sort().join() === Object.keys(F.atomos(r.an)).sort().join(); }); if (sib) mal = nom(sib, "stock"); sis = "stock"; }
          else if (t === "familia" && r.cat && (r.fam === "oxido" || r.fam === "hidroxido" || r.fam === "hidruroM")) { sib = hermano(r, function (x) { return x.cat === r.cat && x.v === r.v && x.fam !== r.fam && (x.fam === "oxido" || x.fam === "hidroxido" || x.fam === "hidruroM" || x.fam === "peroxido"); }); if (sib) mal = nom(sib, "stock"); sis = "stock"; }
          else if (t === "uro" && (r.fam === "salBin" || r.fam === "oxisal") && r.cat) { sib = hermano(r, function (x) { return (x.fam === "salBin" || x.fam === "oxisal") && x.fam !== r.fam && x.cat === r.cat && x.v === r.v && ((x.an || "").indexOf("Cl") === 0 || x.an === "Cl") && ((r.an || "").indexOf("Cl") === 0 || r.an === "Cl"); }); if (sib) mal = nom(sib, "stock"); sis = "stock"; }
          if (mal && B.normTexto(mal) !== B.normTexto(nom(r, sis))) return { tipo: t, kind: kind, r: r, sis: sis, mal: mal, bien: nom(r, sis) };
        }
      }
    }
    return null;
  }
  F.crearError = crearError; F.TIPOS_ERROR = TIPOS;
  B.w.q3_error = function (host, args) {
    args = args || {};
    var cuerpo = B.caja(host, "Detective", "¿Cuál es el error?");
    cuerpo.innerHTML = '<p class="w-intro">Un alumno ha escrito una fórmula o un nombre. Descubre qué ha hecho mal (o si no hay error).</p><div class="q3-prob"></div><div class="q3-ops"></div><div class="lectura anch"></div><div class="ctl"><button type="button" class="chip-btn" data-sig>Otro caso</button></div>';
    var st = { e: null, racha: 0, ac: 0, n: 0, hecho: false }, prob = cuerpo.querySelector(".q3-prob"), ops = cuerpo.querySelector(".q3-ops"), lectura = cuerpo.querySelector(".lectura");
    function marcador() { return fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.ac + " de " + st.n, "pen"); }
    function nuevo() {
      var e = crearError(args.niv || 1, args.fams); st.e = e; st.hecho = false;
      if (!e) { prob.innerHTML = "<p>No he podido generar un caso; pulsa otra vez.</p>"; return; }
      var r = e.r;
      if (e.kind === "formula") prob.innerHTML = "<p class='q3-enun'>Un alumno ha escrito <b class='q3-big q3-mal'>" + e.mal + "</b> como la fórmula de «<b>" + esc(nom(r, e.sis)) + "</b>» <small>(" + SIS_TXT[e.sis] + ")</small>. ¿Qué ha hecho mal?</p>";
      else prob.innerHTML = "<p class='q3-enun'>Un alumno ha nombrado <b class='q3-big'>" + F.html(r) + "</b> (nomenclatura " + SIS_TXT[e.sis] + ") como «<b class='q3-mal'>" + esc(e.mal) + "</b>». ¿Qué ha hecho mal?</p>";
      var pool = (e.kind === "formula" ? TF : TN).filter(function (t) { return t !== e.tipo; }), op = [e.tipo];
      pool.sort(function () { return Math.random() - 0.5; }); op = op.concat(pool.slice(0, e.tipo === "ninguno" ? 3 : 2));
      if (e.tipo !== "ninguno") op.push("ninguno");
      op = B.barajar(op.slice(0, 4));
      ops.innerHTML = op.map(function (t) { return '<button type="button" class="q3-op" data-t="' + t + '">' + TIPOS[t] + "</button>"; }).join("");
      lectura.innerHTML = marcador();
    }
    ops.addEventListener("click", function (ev) {
      var b = ev.target.closest(".q3-op"); if (!b || st.hecho || !st.e) return;
      st.hecho = true; st.n++;
      var ok = b.getAttribute("data-t") === st.e.tipo; if (ok) { st.ac++; st.racha++; } else st.racha = 0;
      Array.prototype.forEach.call(ops.children, function (c) { var t = c.getAttribute("data-t"); c.classList.toggle("ok", t === st.e.tipo); c.classList.toggle("mal", c === b && !ok); c.disabled = true; });
      lectura.innerHTML = marcador() + fil(ok ? "✓ Eso es" : "✗ No era eso", (st.e.tipo === "ninguno" ? "Estaba bien escrito: " : "Lo correcto es <b>" + (st.e.kind === "formula" ? st.e.bien : esc(st.e.bien)) + "</b>. ") + POR[st.e.tipo], ok ? "ok ancho" : "red ancho");
    });
    cuerpo.querySelector("[data-sig]").onclick = nuevo;
    nuevo();
  };

  // ============================================================
  // Q3_PARES: empareja fórmulas y nombres
  // ============================================================
  B.w.q3_pares = function (host, args) {
    args = args || {};
    var cuerpo = B.caja(host, "Juego", "Parejas: une cada fórmula con su nombre");
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Familia</span><div data-fam class="chips"></div></div><div class="q3-fila"><span class="q3-lab">Nomenclatura</span><div data-sis class="chips"></div></div></div><div class="q3-pr"><div class="q3-col" data-izq></div><div class="q3-col" data-der></div></div><div class="lectura anch"></div><div class="ctl"><button type="button" class="chip-btn" data-nuevo>Nuevas parejas</button></div>';
    var fams = args.fams || ["oxido", "hidroxido", "hidruroM", "hidracido", "oxoacido", "salBin", "oxisal"], st = { fam: args.fam || "mezcla", sis: args.sis || "stock", sel: null, err: 0, ok: 0, t0: 0, pares: [] };
    var izq = cuerpo.querySelector("[data-izq]"), der = cuerpo.querySelector("[data-der]"), lectura = cuerpo.querySelector(".lectura");
    function nuevo() {
      var L = F.muestra(st.fam === "mezcla" ? fams : [st.fam], 1, st.sis), usados = {}, usadosN = {}, pares = [], c = 0;
      while (pares.length < Math.min(6, L.length) && c++ < 200) {
        var r = azar(L), n = nom(r, st.sis); if (usados[r.f] || usadosN[n]) continue;
        usados[r.f] = 1; usadosN[n] = 1; pares.push({ r: r, f: r.f, n: n });
      }
      st.pares = pares; st.sel = null; st.err = 0; st.ok = 0; st.t0 = Date.now();
      izq.innerHTML = B.barajar(pares).map(function (p) { return '<button type="button" class="q3-pc" data-f="' + p.f + '">' + F.html(p.r) + "</button>"; }).join("");
      der.innerHTML = B.barajar(pares).map(function (p) { return '<button type="button" class="q3-pc nombre" data-f="' + p.f + '">' + esc(p.n) + "</button>"; }).join("");
      lectura.innerHTML = fil("Parejas", "0 de " + pares.length, "pen") + fil("Fallos", "0", "red");
    }
    cuerpo.querySelector(".q3-pr").addEventListener("click", function (ev) {
      var b = ev.target.closest(".q3-pc"); if (!b || b.disabled) return;
      var lado = b.parentNode === izq ? "i" : "d";
      if (!st.sel || st.sel.lado === lado) { if (st.sel) st.sel.b.classList.remove("on"); st.sel = { b: b, lado: lado, f: b.getAttribute("data-f") }; b.classList.add("on"); return; }
      var coincide = st.sel.f === b.getAttribute("data-f");
      if (coincide) { st.sel.b.classList.remove("on"); st.sel.b.classList.add("hecho"); b.classList.add("hecho"); st.sel.b.disabled = true; b.disabled = true; st.ok++; }
      else { st.err++; var otro = st.sel.b; otro.classList.remove("on"); b.classList.add("mal"); otro.classList.add("mal"); setTimeout(function () { b.classList.remove("mal"); otro.classList.remove("mal"); }, 600); }
      st.sel = null;
      var fin = st.ok >= st.pares.length;
      lectura.innerHTML = fil("Parejas", st.ok + " de " + st.pares.length, "pen") + fil("Fallos", String(st.err), st.err ? "red" : "ok") + (fin ? fil("¡Completo!", Math.round((Date.now() - st.t0) / 1000) + " s" + (st.err === 0 ? " · sin fallos" : ""), "ok ancho") : "");
    });
    U.fichas(cuerpo.querySelector("[data-fam]"), [{ k: "mezcla", t: "Mezcla" }].concat(fams.map(function (f) { return { k: f, t: FAM_CORTO[f] }; })), st.fam, function (k) { st.fam = k; nuevo(); });
    U.fichas(cuerpo.querySelector("[data-sis]"), [{ k: "sist", t: "Sistemática" }, { k: "stock", t: "Stock" }, { k: "trad", t: "Tradicional" }], st.sis, function (k) { st.sis = k; nuevo(); });
    cuerpo.querySelector("[data-nuevo]").onclick = nuevo;
    nuevo();
  };

  // ============================================================
  // Q3_FAMILIA: ¿a qué familia pertenece?
  // ============================================================
  B.w.q3_familia = function (host, args) {
    var cuerpo = B.caja(host, "Entrenamiento", "¿A qué familia pertenece este compuesto?");
    cuerpo.innerHTML = '<div class="q3-prob"></div><div class="q3-ops q3-ops2"></div><div class="lectura anch"></div><div class="q3-sol" hidden></div><p class="w-pie">Mira primero qué elementos tiene: ¿hay metal? ¿oxígeno? ¿hidrógeno? ¿el grupo OH? Después decide.</p>';
    var fams = ["oxido", "peroxido", "hidroxido", "hidruroM", "hidruroN", "hidracido", "oxoacido", "salBin", "oxisal", "salAcida"];
    var st = { r: null, racha: 0, ac: 0, n: 0, hecho: false }, prob = cuerpo.querySelector(".q3-prob"), ops = cuerpo.querySelector(".q3-ops"), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".q3-sol");
    ops.innerHTML = fams.map(function (f) { return '<button type="button" class="q3-op" data-f="' + f + '">' + FAM_CORTO[f] + "</button>"; }).join("");
    function marcador() { return fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.ac + " de " + st.n, "pen"); }
    function nuevo() {
      var L = F.muestra(fams, 1), r; do { r = azar(L); } while (r === st.r && L.length > 1);
      st.r = r; st.hecho = false; prob.innerHTML = "<p class='q3-enun'>¿Qué es <b class='q3-big'>" + F.html(r) + "</b>?</p>"; sol.hidden = true;
      Array.prototype.forEach.call(ops.children, function (c) { c.classList.remove("ok", "mal"); c.disabled = false; });
      lectura.innerHTML = marcador();
    }
    ops.addEventListener("click", function (ev) {
      var b = ev.target.closest(".q3-op"); if (!b || st.hecho) return; st.hecho = true; st.n++;
      var ok = b.getAttribute("data-f") === st.r.fam; if (ok) { st.ac++; st.racha++; } else st.racha = 0;
      Array.prototype.forEach.call(ops.children, function (c) { var f = c.getAttribute("data-f"); c.classList.toggle("ok", f === st.r.fam); c.classList.toggle("mal", c === b && !ok); c.disabled = true; });
      lectura.innerHTML = marcador() + fil(ok ? "✓ Correcto" : "✗ No: es " + FAM_CORTO[st.r.fam].toLowerCase().replace(/s$/, ""), F.CONSEJO[st.r.fam], ok ? "ok ancho" : "red ancho");
      sol.hidden = false; sol.innerHTML = solucionHtml(st.r);
      var sig = el("div", "ctl"); sig.innerHTML = '<button type="button" class="chip-btn" data-sig>Siguiente</button>'; sol.appendChild(sig); sig.firstChild.onclick = nuevo;
    });
    nuevo();
  };

  // ============================================================
  // Q3_DECISION: árbol de decisión para reconocer la familia
  // ============================================================
  var R = function (f) { return { fam: f }; };
  var ARBOL = {
    ini: { q: "¿El compuesto contiene algún <b>metal</b> (o el ion amonio NH₄⁺)?", si: "met", no: "nom" },
    met: { q: "¿Contiene <b>oxígeno</b>?", si: "metO", no: "metSinO" },
    metO: { q: "¿Contiene también <b>hidrógeno</b> (sin contar el del ion NH₄⁺)?", si: "metOH", no: "metOsolo" },
    metOH: { q: "¿El hidrógeno forma parte del grupo <b>OH</b> (hidroxilo), sin más oxígeno ni otro elemento?", si: R("hidroxido"), no: R("salAcida") },
    metOsolo: { q: "¿Hay <b>solo metal y oxígeno</b>?", si: "metO2", no: R("oxisal") },
    metO2: { q: "¿El oxígeno forma el grupo <b>O₂</b> (peróxido: subíndice par que no se simplifica, como Na₂O₂)?", si: R("peroxido"), no: R("oxido") },
    metSinO: { q: "¿Contiene <b>hidrógeno</b>?", si: "metH", no: R("salBin") },
    metH: { q: "¿El hidrógeno está unido <b>solo al metal</b> (MHₙ)?", si: R("hidruroM"), no: R("salAcida") },
    nom: { q: "¿Contiene <b>oxígeno</b>?", si: "nomO", no: "nomSinO" },
    nomO: { q: "¿Contiene también <b>hidrógeno</b>?", si: "nomOH", no: R("oxido") },
    nomOH: { q: "¿Es H₂O o H₂O₂ (solo H y O)?", si: "nomHO", no: R("oxoacido") },
    nomHO: { q: "¿Tiene <b>dos</b> átomos de oxígeno (H₂O₂)?", si: R("peroxido"), no: R("oxido") },
    nomSinO: { q: "¿Contiene <b>hidrógeno</b>?", si: "nomH", no: R("salBin") },
    nomH: { q: "¿El otro elemento es <b>F, Cl, Br, I, S, Se o Te</b> (grupos 16 y 17)?", si: R("hidracido"), no: R("hidruroN") }
  };
  B.w.q3_decision = function (host) {
    var cuerpo = B.caja(host, "Guía", "Árbol de decisión: ¿de qué familia es?");
    cuerpo.innerHTML = '<p class="w-intro">Contesta sí o no a lo que ves en la fórmula y llegarás a la familia y a la regla para nombrarla. Puedes pedir un compuesto de prueba.</p><div class="q3-prob"></div><div class="ctl" data-botones></div><div class="q3-ruta"></div><div class="lectura anch"></div><div class="ctl"><button type="button" class="chip-btn" data-prueba>Compuesto de prueba</button><button type="button" class="chip-btn" data-reinicio>Empezar de nuevo</button></div>';
    var st = { n: "ini", ruta: [], r: null }, prob = cuerpo.querySelector(".q3-prob"), bot = cuerpo.querySelector("[data-botones]"), ruta = cuerpo.querySelector(".q3-ruta"), lectura = cuerpo.querySelector(".lectura");
    function pinta() {
      var nodo = typeof st.n === "string" ? ARBOL[st.n] : st.n;
      ruta.innerHTML = st.ruta.map(function (p) { return "<span class='q3-mig'>" + p.q.replace(/<[^>]+>/g, "") + " <b>" + (p.v ? "Sí" : "No") + "</b></span>"; }).join("");
      var pre = st.r ? "<p class='q3-enun'>Compuesto de prueba: <b class='q3-big'>" + F.html(st.r) + "</b></p>" : "";
      if (nodo.q) {
        prob.innerHTML = pre + "<p class='q3-enun'>" + nodo.q + "</p>"; bot.innerHTML = ""; lectura.innerHTML = "";
        U.boton(bot, "Sí", function () { st.ruta.push({ q: nodo.q, v: 1 }); st.n = nodo.si; pinta(); }, "btn-comprobar"); U.boton(bot, "No", function () { st.ruta.push({ q: nodo.q, v: 0 }); st.n = nodo.no; pinta(); });
      } else {
        prob.innerHTML = pre + "<p class='q3-enun'><b>Familia: " + F.FAM[nodo.fam] + "</b></p>"; bot.innerHTML = "";
        var ej = azar(F.muestra([nodo.fam], 1));
        lectura.innerHTML = fil("Regla", F.CONSEJO[nodo.fam], "ok ancho") + fil("Ejemplo", F.html(ej) + " — " + esc(nom(ej, "stock")), "ancho") + (st.r ? fil(nodo.fam === st.r.fam ? "✓ Coincide" : "✗ No coincide", nodo.fam === st.r.fam ? "Has llegado a la familia correcta." : "Era " + F.FAM[st.r.fam].toLowerCase() + ". Revisa la ruta.", nodo.fam === st.r.fam ? "ok ancho" : "red ancho") : "");
      }
    }
    cuerpo.querySelector("[data-reinicio]").onclick = function () { st.n = "ini"; st.ruta = []; pinta(); };
    cuerpo.querySelector("[data-prueba]").onclick = function () { st.r = azar(F.muestra(FAMS.filter(function (f) { return f !== "ion" && (f !== "hidruroN" || Math.random() < 0.3); }), 1)); st.n = "ini"; st.ruta = []; pinta(); };
    pinta();
  };
})(window);
