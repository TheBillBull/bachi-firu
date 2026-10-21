/* ============================================================
   Bachi para Firu · simuladores de formulación inorgánica, primera parte (Física y Química I, tema 3)
   q3_tabla · q3_cruce · q3_ajuste · q3_noxid · q3_oxoacidos · q3_sales
   Usan el motor B.lab.formulacion de lab_formulacion_0motor.js (se consulta al montar cada simulador).
   También se añaden al motor las explicaciones de cada compuesto (F.explica) y un lector de fórmulas (F.atomos).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  var F = B.lab.formulacion;
  var MET = F.MET, NM = F.NM;
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return B.esc(s); }
  function signo(n) { return (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n); }
  function azar(l) { return l[Math.floor(Math.random() * l.length)]; }
  function campoTexto(host, et, ancho, ph) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (ph || "") + '" style="width:' + (ancho || 220) + 'px;max-width:100%" aria-label="' + esc(et.replace(/<[^>]+>/g, "")) + '">';
    host.appendChild(l); return l.querySelector("input");
  }
  function pasos(l) { return "<ol class='steps'>" + l.map(function (p) { return "<li class='step'><div class='math-line'>" + p + "</div></li>"; }).join("") + "</ol>"; }

  // ------------------------------------------------------------
  // Utilidades del motor
  // ------------------------------------------------------------
  // "Fe2(SO4)3" → { Fe: 2, S: 3, O: 12 }
  F.atomos = function (f) {
    function rec(s) {
      var c = {}, i = 0, m, j, n, k;
      while (i < s.length) {
        if (s.charAt(i) === "(") {
          n = 1; j = i + 1;
          while (n && j < s.length) { if (s.charAt(j) === "(") n++; else if (s.charAt(j) === ")") n--; j++; }
          var inner = rec(s.slice(i + 1, j - 1)); m = /^\d+/.exec(s.slice(j)); var mult = m ? +m[0] : 1; j += m ? m[0].length : 0;
          for (k in inner) c[k] = (c[k] || 0) + inner[k] * mult;
          i = j;
        } else {
          m = /^([A-Z][a-z]?)(\d*)/.exec(s.slice(i)); if (!m) return null;
          c[m[1]] = (c[m[1]] || 0) + (m[2] ? +m[2] : 1); i += m[0].length;
        }
      }
      return c;
    }
    return rec(String(F.clave(f)).replace(/\d?[+-]$/, ""));
  };
  F.nombreEl = function (s) { return MET[s] ? MET[s].n : NM[s] ? NM[s].n : s === "NH4" ? "amonio" : s; };
  F.FAMTXT = {
    oxido: "Óxido (elemento + O con −2)", peroxido: "Peróxido (grupo O₂ con −2)", hidroxido: "Hidróxido (metal + grupo OH)", hidruroM: "Hidruro metálico (metal + H con −1)",
    hidruroN: "Hidruro no metálico (grupos 13–15)", hidracido: "Hidrácido (H + F, Cl, Br, I, S, Se, Te)", oxoacido: "Oxoácido (H + no metal + O)", salBin: "Sal binaria (sin oxígeno ni hidrógeno)",
    oxisal: "Oxisal (anión de un oxoácido)", salAcida: "Sal ácida (conserva algún H)", ion: "Ion"
  };
  F.CONSEJO = {
    oxido: "Oxígeno con −2: cruza la valencia del elemento con 2 y simplifica. En Stock, número romano si el elemento tiene varias valencias.",
    peroxido: "El grupo peróxido es O₂ con carga −2 y no se simplifica: Na₂O₂, no NaO. Se nombra «peróxido de…».",
    hidroxido: "Metal + (OH)⁻: tantos OH como valencia del metal, con paréntesis si hay más de uno.",
    hidruroM: "El hidrógeno lleva −1 y se escribe detrás del metal: CaH₂, FeH₃.",
    hidruroN: "Grupos 13–15: el elemento va delante del H (NH₃, CH₄). Nombres propios: amoniaco, metano, silano, fosfina…",
    hidracido: "H delante: HCl, H₂S. Gas: «cloruro de hidrógeno»; en disolución acuosa: «ácido clorhídrico» (-hídrico).",
    oxoacido: "H + no metal + O. Cuenta los O: más O → -ico, menos O → -oso; hipo- (menos aún) y per- (más aún).",
    salBin: "Metal + no metal: «-uro» (cloruro, sulfuro, nitruro). Entre dos no metales, delante va el de la lista IUPAC (…P, N, H, S, I, Br, Cl, O, F).",
    oxisal: "Sale del oxoácido: -ico → -ato, -oso → -ito. El anión se encierra entre paréntesis si hay más de uno.",
    salAcida: "Conserva H en el anión: «hidrogeno» + el nombre del anión (hidrogenocarbonato, dihidrogenofosfato).",
    ion: "Cationes: el nombre del elemento (con la carga o el número romano). Aniones: terminación -uro, -ato, -ito…"
  };

  // Explicación (en líneas de HTML) de cómo se forma y se nombra un compuesto del catálogo
  F.explica = function (r) {
    var L = [], n = F.nombreEl(r.cat);
    if (r.ion) return ["Ion con carga " + signo(r.q) + ": la suma de los números de oxidación de sus átomos es " + signo(r.q) + "."];
    if (r.fam === "oxoacido") {
      L.push("Números de oxidación: H +1 (×" + r.nh + "), O −2 (×" + r.no + "), así que " + n + " = " + signo(r.ox) + " (" + r.nh + "·(+1) + " + (r.nx > 1 ? r.nx + "·" : "") + "x + " + r.no + "·(−2) = 0).");
      L.push("Sistemática: «" + F.PR[r.no] + "oxido»: " + r.no + " átomos de O; «hidrógeno» con prefijo: " + r.nh + " H. Stock: " + ROMn(r.ox) + " = n.º de oxidación de " + n + ".");
      L.push("Tradicional: " + (F.nombre(r, "trad") || "") + " (la serie de " + n + " depende de su número de oxidación).");
      return L;
    }
    if (r.fam === "hidracido") return ["H con +1 y " + F.nombreEl(r.cat) + " con −" + r.nh + " → H" + F.sub(r.nh > 1 ? r.nh : "") + (r.nh > 1 ? "" : "") + r.cat + ".", "Gas: «" + F.nombre(r, "sist") + "». Disuelto en agua: «" + F.nombre(r, "trad") + "» (raíz + -hídrico)."];
    if (r.fam === "hidruroN") return ["El " + n + " (grupo " + ({ N: 15, P: 15, As: 15, Sb: 15, C: 14, Si: 14, B: 13 }[r.cat]) + ") se combina con " + r.nx + " H: " + F.pintar(r.f) + ".", "Nombre sistemático (-ano): «" + F.nombre(r, "sist") + "»; nombre tradicional: «" + F.nombre(r, "trad") + "»."];
    var simpl = r.cat && r.a && F.gcd(r.v, r.a) > 1, nA = r.nx != null ? r.nx : r.na;
    if (r.v != null && r.a != null) {
      var anS = r.an && r.an.length ? F.pintarIon(r.an, -r.a) : "";
      if (r.tipo === "nometal") L.push("Números de oxidación: " + r.cat + " " + signo(r.v) + " y " + r.an + " " + signo(-r.a) + ". Se cruzan: " + F.pintar(F.mk(r.cat, r.a) + F.mk(r.an, r.v)) + (simpl ? " → se simplifica entre " + F.gcd(r.v, r.a) + ": " + F.pintar(r.f) : "") + ".");
      else L.push("Valencias: " + F.pintarIon(r.cat, r.v) + " (" + signo(r.v) + ") y " + anS + " (" + signo(-r.a) + "). Se cruzan: " + F.pintar(F.mk(r.cat, r.a) + F.mk(r.an, r.v)) + (simpl ? " → se simplifica entre " + F.gcd(r.v, r.a) + ": " + F.pintar(r.f) : "") + ".");
      L.push("Comprobación: " + r.nm + "·(" + signo(r.v) + ") + " + nA + "·(" + signo(-r.a) + ") = " + (r.nm * r.v - nA * r.a) + ".");
    }
    if (r.fam === "peroxido") L.push("El grupo O₂ (peróxido) mantiene su carga −2 y no se simplifica. Sistemática: «dióxido…»; Stock: «peróxido de…».");
    else if (r.nm != null && (r.sist || [])[0]) {
      var s = "Sistemática: los prefijos cuentan átomos";
      if (r.nm > 1 || r.nx > 1 || r.na > 1) s += " (" + (r.nx > 1 ? "«" + F.PR[r.nx] + "-»: " + r.nx + " del anión" : "") + (r.nx > 1 && r.nm > 1 ? "; " : "") + (r.nm > 1 ? "«" + F.PR[r.nm] + "-»: " + r.nm + " de " + n : "") + ")";
      L.push(s + ": «" + F.nombre(r, "sist") + "».");
    }
    if (r.cat && (MET[r.cat] || NM[r.cat])) {
      var multi = MET[r.cat] ? (MET[r.cat].v.length + MET[r.cat].vo.length > 1 || MET[r.cat].siempre) : (NM[r.cat].pos || []).length > 1;
      L.push(multi ? "Stock: el número romano (" + F.ROM[r.v] + ") es el n.º de oxidación de " + n + ", que puede tener varios." : "Stock: " + n + " solo tiene una valencia (" + signo(r.v) + "), así que no hace falta número romano.");
      var t = F.nombre(r, "trad"), adj = MET[r.cat] && MET[r.cat].t && MET[r.cat].t[r.v];
      if (t) L.push("Tradicional: «" + t + "»" + (adj ? (/oso$/.test(adj) ? " (-oso: la menor de las dos valencias)" : " (-ico: la mayor de las dos valencias)") : "") + ".");
    }
    return L;
  };
  function ROMn(v) { return "(" + F.ROM[v] + ")"; }

  // ============================================================
  // Q3_TABLA: tabla periódica con los números de oxidación
  // ============================================================
  var POS = [
    ["H", 1, 1], ["He", 1, 18],
    ["Li", 2, 1], ["Be", 2, 2], ["B", 2, 13], ["C", 2, 14], ["N", 2, 15], ["O", 2, 16], ["F", 2, 17], ["Ne", 2, 18],
    ["Na", 3, 1], ["Mg", 3, 2], ["Al", 3, 13], ["Si", 3, 14], ["P", 3, 15], ["S", 3, 16], ["Cl", 3, 17], ["Ar", 3, 18],
    ["K", 4, 1], ["Ca", 4, 2], ["Sc", 4, 3], ["Ti", 4, 4], ["V", 4, 5], ["Cr", 4, 6], ["Mn", 4, 7], ["Fe", 4, 8], ["Co", 4, 9], ["Ni", 4, 10], ["Cu", 4, 11], ["Zn", 4, 12],
    ["Ga", 4, 13], ["Ge", 4, 14], ["As", 4, 15], ["Se", 4, 16], ["Br", 4, 17], ["Kr", 4, 18],
    ["Rb", 5, 1], ["Sr", 5, 2], ["Pd", 5, 10], ["Ag", 5, 11], ["Cd", 5, 12], ["In", 5, 13], ["Sn", 5, 14], ["Sb", 5, 15], ["Te", 5, 16], ["I", 5, 17], ["Xe", 5, 18],
    ["Cs", 6, 1], ["Ba", 6, 2], ["Pt", 6, 10], ["Au", 6, 11], ["Hg", 6, 12], ["Pb", 6, 14]
  ];
  var FUERA = { He: ["helio", "0"], Ne: ["neón", "0"], Ar: ["argón", "0"], Kr: ["kriptón", "0"], Xe: ["xenón", "0"], Sc: ["escandio", "+3"], Ti: ["titanio", "+4, +3"], V: ["vanadio", "+5, +4, +3, +2"],
    Ga: ["galio", "+3"], Ge: ["germanio", "+4"], In: ["indio", "+3"], Pd: ["paladio", "+2, +4"] };
  B.w.q3_tabla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Tabla periódica de los números de oxidación");
    cuerpo.innerHTML = '<p class="w-intro">Toca un elemento: verás los números de oxidación que usamos y los compuestos que forma. Los metales de los grupos 1, 2 y 13 tienen una sola valencia; los de transición, varias.</p>' +
      '<div class="q3-tp" role="group" aria-label="Tabla periódica parcial"></div><div class="q3-leyenda"><span class="q3-k m">metal</span><span class="q3-k n">no metal</span><span class="q3-k g">gas noble</span><span class="q3-k x">no se usa en este tema</span></div>' +
      '<div class="q3-det" aria-live="polite"></div><p class="w-pie">Tabla parcial: solo los elementos que se usan al formular (y algunos vecinos). En los metales de transición el número de oxidación cambia de un compuesto a otro; por eso se indica con números romanos.</p>';
    var tp = cuerpo.querySelector(".q3-tp"), det = cuerpo.querySelector(".q3-det"), sel = null;
    var html = "";
    POS.forEach(function (p) {
      var s = p[0], cls = MET[s] ? "m" : NM[s] ? "n" : (FUERA[s] && FUERA[s][1] === "0" ? "g" : "x");
      html += '<button type="button" class="q3-el ' + cls + '" data-s="' + s + '" style="grid-row:' + p[1] + ";grid-column:" + p[2] + '" aria-label="' + esc(MET[s] ? MET[s].n : NM[s] ? NM[s].n : FUERA[s][0]) + '">' + s + "</button>";
    });
    tp.innerHTML = html;
    function nom(r) { return F.nombre(r, "stock") || F.nombre(r, "sist"); }
    function detalle(s) {
      var h = "", m = MET[s], e = NM[s], r, tr;
      if (m) {
        h = "<h5>" + s + " · " + m.n + " <small>(metal)</small></h5>";
        h += "<p>Números de oxidación: " + m.v.map(function (v) { return "<b>+" + v + "</b>"; }).join(", ") + (m.vo.length ? " (y " + m.vo.map(function (v) { return "<b>+" + v + "</b>"; }).join(", ") + " solo en óxidos y oxoácidos)" : "") + ". " + (m.v.length + m.vo.length > 1 ? "Varias valencias: en Stock hay que indicarla con número romano." : "Una sola valencia: no se escribe número romano.") + "</p>";
        h += "<table class='lam-tabla q3-t'><thead><tr><th>n.º ox.</th><th>Óxido</th><th>Hidróxido</th></tr></thead><tbody>";
        m.v.concat(m.vo).forEach(function (v) {
          var ox = F.hallar(F.mk(s, 2 / F.gcd(v, 2)) + F.mk("O", v / F.gcd(v, 2))), oh = m.vo.indexOf(v) < 0 ? F.hallar(F.mk(s, 1) + F.mk("OH", v)) : null;
          h += "<tr><th scope='row'>+" + v + "</th><td>" + (ox ? F.html(ox) + " — " + nom(ox) + (F.nombre(ox, "trad") && F.nombre(ox, "trad") !== nom(ox) ? " (" + F.nombre(ox, "trad") + ")" : "") : "—") + "</td><td>" + (oh ? F.html(oh) + " — " + nom(oh) : "—") + "</td></tr>";
        });
        h += "</tbody></table>";
      } else if (e) {
        h = "<h5>" + s + " · " + e.n + " <small>(no metal)</small></h5>";
        var pos = e.pos || [];
        h += "<p>Números de oxidación: <b>" + signo(-e.neg) + "</b> (en aniones: " + e.an + ")" + (pos.length ? "; positivos: " + pos.map(function (v) { return "<b>+" + v + "</b>"; }).join(", ") + " (con átomos más electronegativos, sobre todo O)" : (s === "F" ? ". Es el elemento más electronegativo: nunca es positivo." : "")) + ".</p>";
        var filas = [];
        if (s === "H") filas.push(["+1", "H₂O, HCl, NaOH…", "n.º habitual"], ["−1", "NaH, CaH₂", "hidruros metálicos"]);
        if (e.hidr) { r = F.hallar("H" + (e.neg > 1 ? e.neg : "") + s); filas.push([signo(-e.neg), F.html(r), nom(r) + " / " + F.nombre(r, "trad")]); }
        if (NM[s].neg && ["N", "P", "As", "Sb", "C", "Si", "B"].indexOf(s) >= 0) { r = F.porFam("hidruroN").filter(function (x) { return x.cat === s; })[0]; if (r) filas.push([signo(-e.neg), F.html(r), F.nombre(r, "sist") + " / " + F.nombre(r, "trad")]); }
        (e.ox || []).forEach(function (v) { if (s === "H") return; var g = F.gcd(v, 2); r = F.hallar(F.mk(s, 2 / g) + F.mk("O", v / g)); if (r) filas.push([signo(v), F.html(r), F.nombre(r, "stock")]); });
        F.OXO.filter(function (o) { return o.x === s; }).forEach(function (o) { r = F.hallar(o.f); if (r) filas.push([signo(o.ox), F.html(r), F.nombre(r, "trad")]); });
        if (filas.length) h += "<table class='lam-tabla q3-t'><thead><tr><th>n.º ox.</th><th>Compuesto</th><th>Nombre</th></tr></thead><tbody>" + filas.map(function (f) { return "<tr><th scope='row'>" + f[0] + "</th><td>" + f[1] + "</td><td>" + f[2] + "</td></tr>"; }).join("") + "</tbody></table>";
      } else if (FUERA[s]) {
        h = "<h5>" + s + " · " + FUERA[s][0] + "</h5><p>" + (FUERA[s][1] === "0" ? "Gas noble: n.º de oxidación 0; no forma compuestos en Bachillerato." : "Números de oxidación habituales: " + FUERA[s][1] + ". No lo usamos al formular en este tema.") + "</p>";
      }
      det.innerHTML = h;
    }
    tp.addEventListener("click", function (e) {
      var b = e.target.closest(".q3-el"); if (!b) return;
      if (sel) sel.classList.remove("on"); sel = b; b.classList.add("on"); detalle(b.getAttribute("data-s"));
    });
    sel = tp.querySelector('[data-s="Fe"]'); sel.classList.add("on"); detalle("Fe");
  };

  // ============================================================
  // Q3_CRUCE: constructor de compuestos por cruce de valencias
  // ============================================================
  var CATS = ["Li", "Na", "K", "Mg", "Ca", "Ba", "Zn", "Ag", "Al", "Cu", "Fe", "Pb", "Sn", "Au", "Hg", "Ni", "Co", "Cr", "Mn", "NH4"];
  var ANIONES = [
    ["O", 2, "O²⁻ óxido"], ["OH", 1, "OH⁻ hidróxido"], ["H", 1, "H⁻ hidruro"], ["O2", 2, "O₂²⁻ peróxido"],
    ["F", 1, "F⁻"], ["Cl", 1, "Cl⁻"], ["Br", 1, "Br⁻"], ["I", 1, "I⁻"], ["S", 2, "S²⁻"], ["N", 3, "N³⁻"], ["P", 3, "P³⁻"],
    ["SO4", 2, "SO₄²⁻ sulfato"], ["SO3", 2, "SO₃²⁻ sulfito"], ["NO3", 1, "NO₃⁻ nitrato"], ["NO2", 1, "NO₂⁻ nitrito"], ["CO3", 2, "CO₃²⁻ carbonato"], ["PO4", 3, "PO₄³⁻ fosfato"],
    ["ClO", 1, "ClO⁻ hipoclorito"], ["ClO3", 1, "ClO₃⁻ clorato"], ["ClO4", 1, "ClO₄⁻ perclorato"], ["MnO4", 1, "MnO₄⁻ permanganato"], ["CrO4", 2, "CrO₄²⁻ cromato"], ["Cr2O7", 2, "Cr₂O₇²⁻ dicromato"],
    ["HCO3", 1, "HCO₃⁻ hidrogenocarbonato"], ["HSO4", 1, "HSO₄⁻ hidrogenosulfato"], ["H2PO4", 1, "H₂PO₄⁻ dihidrogenofosfato"], ["HS", 1, "HS⁻ hidrogenosulfuro"]
  ];
  function valencias(s) { return s === "NH4" ? [1] : MET[s].v; }
  function nomCat(s) { return s === "NH4" ? "NH₄" : s; }
  function lineaNombres(r) {
    if (!r) return "";
    return fil("Sistemática", esc(F.nombre(r, "sist") || "—"), "pen ancho") + fil("Stock", esc(F.nombre(r, "stock") || "—"), "ok ancho") + fil("Tradicional", esc(F.nombre(r, "trad") || "—"), "red ancho");
  }
  function expl(sym, n) { return (F.poli(sym) ? "(" + F.pintar(sym) + ")" : F.pintar(sym)) + F.sub(n); }
  B.w.q3_cruce = function (host, args) {
    var cuerpo = B.caja(host, "Pruébalo", "Constructor de compuestos por cruce de valencias");
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Catión</span><div data-cat class="chips"></div></div><div class="q3-fila" data-fv><span class="q3-lab">Valencia</span><div data-val class="chips"></div></div>' +
      '<div class="q3-fila"><span class="q3-lab">Anión o grupo</span><div data-an class="chips"></div></div></div>' +
      '<svg class="q3-svg" viewBox="0 0 360 170" role="img" aria-label="Esquema del cruce de valencias"></svg><div class="lectura anch"></div><div class="q3-pasos"></div><p class="w-pie">Regla: la valencia de cada uno pasa a ser el subíndice del otro; si los dos subíndices tienen un divisor común, se simplifican; el grupo poliatómico va entre paréntesis si su subíndice es mayor que 1.</p>';
    var st = { c: args && args.cat || "Fe", v: 3, a: args && args.an || "SO4" }, svg = cuerpo.querySelector("svg"), lectura = cuerpo.querySelector(".lectura"), pasosEl = cuerpo.querySelector(".q3-pasos");
    function ancho(a) { return ANIONES.filter(function (x) { return x[0] === a; })[0]; }
    function pinta() {
      var vs = valencias(st.c); if (vs.indexOf(st.v) < 0) st.v = vs[vs.length - 1];
      cuerpo.querySelector("[data-fv]").style.display = vs.length > 1 ? "" : "none";
      var an = ancho(st.a), a = an[1], cr = F.cruce(st.v, a), f = F.mk(st.c, cr.nCat) + F.mk(st.a, cr.nAn), r = F.hallar(f);
      var cs = nomCat(st.c), catTxt = F.pintarIon(cs.replace("₄", "4"), st.v), anTxt = F.pintarIon(st.a, -a);
      var cG = F.poli(st.c) ? "(" + F.pintar(st.c) + ")" : st.c, aG = F.poli(st.a) ? "(" + F.pintar(st.a) + ")" : F.pintar(st.a);
      svg.innerHTML = '<text class="q3-t1" x="90" y="34" text-anchor="middle">' + catTxt + '</text><text class="q3-t1" x="270" y="34" text-anchor="middle">' + anTxt + '</text>' +
        '<circle class="q3-c cat" cx="90" cy="66" r="14"/><text class="q3-n cat" x="90" y="72" text-anchor="middle">' + st.v + '</text><circle class="q3-c an" cx="270" cy="66" r="14"/><text class="q3-n an" x="270" y="72" text-anchor="middle">' + a + '</text>' +
        '<line class="q3-x cat" x1="90" y1="81" x2="' + (cr.nAn > 0 ? 296 : 296) + '" y2="136"/><line class="q3-x an" x1="270" y1="81" x2="104" y2="136"/>' +
        '<text class="q3-t2" x="76" y="158" text-anchor="middle">' + F.pintar(st.c === "NH4" ? "NH4" : st.c) + '</text><text class="q3-s cat" x="104" y="166" text-anchor="start">' + cr.sinSimplificar[0] + '</text>' +
        '<text class="q3-t2" x="258" y="158" text-anchor="middle">' + F.pintar(st.a) + '</text><text class="q3-s an" x="286" y="166" text-anchor="start">' + cr.sinSimplificar[1] + '</text>' +
        (cr.simpl || cr.simplifica ? '<text class="q3-ok" x="180" y="118" text-anchor="middle">÷ ' + cr.g + ' (se simplifica)</text>' : "");
      lectura.innerHTML = fil("Fórmula", r ? "<span class='q3-big'>" + F.html(r) + "</span>" : "<span class='q3-big'>" + F.pintar(f) + "</span>", "ok") + fil("Familia", r ? F.FAM[r.fam] : "combinación poco habitual", "") +
        (r ? lineaNombres(r) : fil("Nota", "Esa combinación no está en el catálogo (el cruce de valencias funciona, pero el compuesto es poco habitual).", "ancho"));
      var p = ["Valencia del catión: <b>+" + st.v + "</b>; carga del anión: <b>−" + a + "</b>.", "Cruzamos: " + expl(st.c, a) + expl(st.a, st.v) + (cr.simplifica ? " → los subíndices " + a + " y " + st.v + " se dividen entre " + cr.g + " → " + cr.nCat + " y " + cr.nAn + "." : ": " + a + " y " + st.v + " no tienen divisor común."),
        "Fórmula: <b>" + F.pintar(f) + "</b>" + (cr.nAn > 1 && F.poli(st.a) ? " (paréntesis: el grupo se repite " + cr.nAn + " veces)." : "."),
        "Comprobación de cargas: " + cr.nCat + "·(+" + st.v + ") + " + cr.nAn + "·(−" + a + ") = " + (cr.nCat * st.v - cr.nAn * a) + " ✓"];
      pasosEl.innerHTML = pasos(p);
    }
    function chipsCat() { U.fichas(cuerpo.querySelector("[data-cat]"), CATS.map(function (s) { return { k: s, t: F.pintar(nomCat(s) === "NH₄" ? "NH4" : s) }; }), st.c, function (k) { st.c = k; chipsVal(); pinta(); }); }
    function chipsVal() { var vs = valencias(st.c); if (vs.indexOf(st.v) < 0) st.v = vs[vs.length - 1]; U.fichas(cuerpo.querySelector("[data-val]"), vs.map(function (v) { return { k: String(v), t: "+" + v }; }), String(st.v), function (k) { st.v = +k; pinta(); }); }
    chipsCat(); chipsVal();
    U.fichas(cuerpo.querySelector("[data-an]"), ANIONES.map(function (x) { return { k: x[0], t: x[2] }; }), st.a, function (k) { st.a = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q3_AJUSTE: equilibra las cargas de los iones
  // ============================================================
  B.w.q3_ajuste = function (host) {
    var cuerpo = B.caja(host, "Reto", "Equilibra las cargas: ¿cuántos iones hacen falta?");
    cuerpo.innerHTML = '<p class="w-intro">Un compuesto iónico es neutro: las cargas positivas y negativas se compensan. Añade o quita iones hasta que la carga total sea 0 con el menor número posible de iones.</p>' +
      '<div class="q3-aj"><div class="q3-ajl"><span class="q3-lab" data-nc></span><div class="q3-pila" data-pc></div><div class="ctl"><button type="button" class="chip-btn" data-mc>−</button><b data-cc>1</b><button type="button" class="chip-btn" data-pc2>+</button></div></div>' +
      '<div class="q3-ajl"><span class="q3-lab" data-na></span><div class="q3-pila" data-pa></div><div class="ctl"><button type="button" class="chip-btn" data-ma>−</button><b data-ca>1</b><button type="button" class="chip-btn" data-pa2>+</button></div></div></div>' +
      '<div class="lectura anch"></div><div class="ctl"><button type="button" class="chip-btn" data-nuevo>Nuevo reto</button></div><p class="w-pie">Truco: el número de cationes es la carga del anión y el de aniones, la carga del catión (el cruce de valencias), dividido por su máximo común divisor.</p>';
    var PARES = [["Na", 1, "Cl", 1], ["Ca", 2, "Cl", 1], ["Al", 3, "O", 2], ["Mg", 2, "O", 2], ["Fe", 3, "O", 2], ["Al", 3, "SO4", 2], ["Ca", 2, "PO4", 3], ["K", 1, "S", 2], ["Fe", 2, "Cl", 1], ["Cu", 2, "NO3", 1], ["Mg", 2, "N", 3], ["Pb", 4, "O", 2], ["Zn", 2, "OH", 1], ["NH4", 1, "SO4", 2], ["Ba", 2, "PO4", 3], ["Sn", 4, "S", 2]];
    var st = { p: PARES[0], c: 1, a: 1 }, lectura = cuerpo.querySelector(".lectura");
    function ficha(s, q, cls) { return '<span class="q3-ion ' + cls + '">' + F.pintarIon(s, q) + "</span>"; }
    function pinta() {
      var p = st.p, v = p[1], a = p[3], nc = st.c, na = st.a, tot = nc * v - na * a, g = F.gcd(nc, na), minimo = nc * a === na * v && F.gcd(nc, na) === 1;
      cuerpo.querySelector("[data-nc]").innerHTML = "Catión " + F.pintarIon(p[0], v);
      cuerpo.querySelector("[data-na]").innerHTML = "Anión " + F.pintarIon(p[2], -a);
      cuerpo.querySelector("[data-pc]").innerHTML = new Array(nc + 1).join(ficha(p[0], v, "cat"));
      cuerpo.querySelector("[data-pa]").innerHTML = new Array(na + 1).join(ficha(p[2], -a, "an"));
      cuerpo.querySelector("[data-cc]").textContent = nc; cuerpo.querySelector("[data-ca]").textContent = na;
      var f = F.mk(p[0], nc) + F.mk(p[2], na), est = tot === 0 ? (minimo ? "Neutro y mínimo ✓" : "Neutro, pero se puede simplificar") : tot > 0 ? "Sobran cargas +" : "Sobran cargas −";
      lectura.innerHTML = fil("Carga positiva", "+" + nc * v, "red") + fil("Carga negativa", "−" + na * a, "pen") + fil("Carga total", tot === 0 ? "0" : signo(tot), tot === 0 ? "ok" : "red") +
        fil("Estado", est, minimo ? "ok" : "red") + (minimo ? fil("Fórmula", "<span class='q3-big'>" + F.pintar(f) + "</span>", "ok") : "") +
        (tot === 0 && !minimo ? fil("Pista", "Divide los dos números entre " + g + ".", "ancho") : "");
    }
    function nuevo() { var q; do { q = azar(PARES); } while (q === st.p); st.p = q; st.c = 1; st.a = 1; pinta(); }
    cuerpo.querySelector("[data-pc2]").onclick = function () { if (st.c < 8) st.c++; pinta(); };
    cuerpo.querySelector("[data-mc]").onclick = function () { if (st.c > 1) st.c--; pinta(); };
    cuerpo.querySelector("[data-pa2]").onclick = function () { if (st.a < 8) st.a++; pinta(); };
    cuerpo.querySelector("[data-ma]").onclick = function () { if (st.a > 1) st.a--; pinta(); };
    cuerpo.querySelector("[data-nuevo]").onclick = nuevo;
    pinta();
  };

  // ============================================================
  // Q3_NOXID: calculadora de números de oxidación
  // ============================================================
  function ecuacion(r, desconocido) {
    // devuelve { eq: "2·(+1) + x + 4·(−2) = 0", x: valor, partes }
    var tot = r.ion ? r.q : 0, partes = [], suma = 0, x = null, n;
    r.oxs.forEach(function (t) {
      if (t[0] === desconocido) { partes.push((t[1] > 1 ? t[1] + "·" : "") + "x"); n = t[1]; x = t; }
      else { partes.push(t[1] + "·(" + signo(t[2]) + ")"); suma += t[1] * t[2]; }
    });
    var val = (tot - suma) / n;
    return { eq: partes.join(" + ") + " = " + (tot === 0 ? "0" : signo(tot)), x: val, suma: suma, n: n, partes: partes };
  }
  F.ecuacionOx = ecuacion;
  F.desconocido = function (r) {
    // el elemento «interesante»: el no metal central; si no lo hay, el metal; si no, el que no sea O ni H
    var o = r.oxs.map(function (t) { return t[0]; });
    var fijos = ["O", "H"];
    var c = o.filter(function (s) { return fijos.indexOf(s) < 0 && !MET[s] && s !== "NH4"; });
    if (c.length) return c[c.length - 1];
    c = o.filter(function (s) { return fijos.indexOf(s) < 0; });
    return c.length ? c[0] : o[0];
  };
  B.w.q3_noxid = function (host, args) {
    var cuerpo = B.caja(host, "Entrenamiento", "Calculadora de números de oxidación");
    cuerpo.innerHTML = '<div class="q3-prob"></div><div data-ctl></div><div class="lectura anch"></div><div class="q3-sol" hidden></div><p class="w-pie">Reglas: elementos sueltos 0 · O: −2 (peróxidos −1) · H: +1 (−1 en hidruros metálicos) · metales de los grupos 1, 2 y 13: +1, +2, +3 · F: −1 · la suma de todos los n.º de oxidación = carga del compuesto (0) o del ion.</p>';
    var st = { r: null, x: null, racha: 0, ac: 0, n: 0 }, prob = cuerpo.querySelector(".q3-prob"), ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".q3-sol");
    var inp = campoTexto(ctl, "Tu respuesta (nº de oxidación)", 90, "+6"), libre = campoTexto(ctl, "o prueba con tu fórmula", 150, "H2SO4");
    var fams = ["oxido", "oxoacido", "oxisal", "salBin", "hidroxido", "hidruroM", "hidracido", "hidruroN", "salAcida"];
    function marcador() { return fil("Racha", st.racha + " seguidos", "ok") + fil("Aciertos", st.ac + " de " + st.n, "pen"); }
    function carga(r) {
      st.r = r; st.x = F.desconocido(r);
      var e = ecuacion(r, st.x);
      prob.innerHTML = "<p class='q3-enun'>¿Cuál es el número de oxidación de <b>" + F.nombreEl(st.x) + " (" + st.x + ")</b> en <b class='q3-big'>" + F.html(r) + "</b>?</p>";
      inp.value = ""; sol.hidden = true; sol.innerHTML = ""; lectura.innerHTML = marcador();
    }
    function nuevo() {
      var r, c = 0; do { var f = azar(fams); r = azar(F.muestra([f], 1)); c++; } while ((!r || r === st.r) && c < 20);
      carga(r);
    }
    function verSol() {
      var e = ecuacion(st.r, st.x), r = st.r;
      sol.hidden = false;
      sol.innerHTML = pasos(["Fijos: " + r.oxs.filter(function (t) { return t[0] !== st.x; }).map(function (t) { return F.nombreEl(t[0]) + " " + signo(t[2]) + " (×" + t[1] + ")"; }).join(", ") + ".",
        "Suma = " + (r.ion ? "carga del ion (" + signo(r.q) + ")" : "0") + ": " + e.eq + ".", "x = (" + (r.ion ? r.q : 0) + " − (" + signo(e.suma) + "))/" + e.n + " = <b>" + signo(e.x) + "</b>."]) +
        "<div class='result-box'><span class='result-label'>Resultado</span>" + F.nombreEl(st.x) + ": " + signo(e.x) + "</div>";
    }
    function comprobar() {
      var v = B.Mate ? B.Mate.numero(inp.value.replace("−", "-")) : parseFloat(inp.value.replace(",", ".").replace("−", "-")), e = ecuacion(st.r, st.x);
      if (isNaN(v)) { lectura.innerHTML = marcador() + fil("No entiendo tu respuesta", "escribe un número entero, por ejemplo +6 o −3", "red ancho"); return; }
      var ok = v === e.x; st.n++; if (ok) { st.ac++; st.racha++; } else st.racha = 0;
      lectura.innerHTML = marcador() + fil(ok ? "✓ Correcto" : "✗ Todavía no", ok ? "Sí: " + signo(e.x) + "." : "Plantea la suma: " + e.eq + " (la x es lo que buscas). Pulsa «Ver los pasos».", ok ? "ok ancho" : "red ancho");
      if (ok) verSol();
    }
    var acc = el("div", "ctl"); cuerpo.insertBefore(acc, lectura);
    U.boton(acc, "Comprobar", comprobar, "btn-comprobar"); U.boton(acc, "Ver los pasos", verSol); U.boton(acc, "Otro compuesto", nuevo);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); comprobar(); } });
    libre.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return; e.preventDefault();
      var r = F.hallar(libre.value);
      if (r) { carga(r); verSol(); } else lectura.innerHTML = marcador() + fil("No la encuentro", "Prueba con una fórmula habitual: H2SO4, Fe2O3, KMnO4, NH4+…", "red ancho");
    });
    if (args && args.f && F.hallar(args.f)) carga(F.hallar(args.f)); else nuevo();
  };

  // ============================================================
  // Q3_OXOACIDOS: la serie hipo-/-oso/-ico/per-
  // ============================================================
  B.w.q3_oxoacidos = function (host, args) {
    var cuerpo = B.caja(host, "Pruébalo", "Oxoácidos: del óxido al ácido y de la serie hipo-…per-");
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Elemento</span><div data-el class="chips"></div></div><div class="q3-fila"><span class="q3-lab">Nº de oxidación</span><div data-ox class="chips"></div></div><div class="q3-fila" data-fh><span class="q3-lab">Grado de hidratación</span><div data-h class="chips"></div></div></div>' +
      '<div class="q3-ec"></div><div class="lectura anch"></div><div class="q3-serie"></div><p class="w-pie">Óxido + agua → oxoácido. Con 4 estados de oxidación (Cl, Br, I): hipo-…-oso (+1), -oso (+3), -ico (+5), per-…-ico (+7). Con 2 (S, N, P…): -oso (el menor) e -ico (el mayor). El anión sale de cambiar -oso → -ito e -ico → -ato.</p>';
    var ELS = ["Cl", "Br", "I", "S", "Se", "Te", "N", "P", "C", "Si", "B", "Cr", "Mn"], st = { x: args && args.x || "Cl", ox: 7, h: 0 };
    var ec = cuerpo.querySelector(".q3-ec"), lectura = cuerpo.querySelector(".lectura"), serie = cuerpo.querySelector(".q3-serie");
    function ac(x) { return F.OXO.filter(function (o) { return o.x === x && o.nx === 1; }); }
    function oxs(x) { var s = []; ac(x).forEach(function (o) { if (s.indexOf(o.ox) < 0) s.push(o.ox); }); return s; }
    function variantes(x, ox) { return ac(x).filter(function (o) { return o.ox === ox; }); }
    function pinta() {
      var lo = oxs(st.x); if (lo.indexOf(st.ox) < 0) st.ox = lo[lo.length - 1];
      var vs = variantes(st.x, st.ox); if (st.h >= vs.length) st.h = 0;
      cuerpo.querySelector("[data-fh]").style.display = vs.length > 1 ? "" : "none";
      var o = vs[st.h], g = F.gcd(st.ox, 2), oxidoF = F.mk(st.x, 2 / g) + F.mk("O", st.ox / g), oxi = F.hallar(oxidoF), r = F.hallar(o.f), nX = 2 / g;
      var cA = nX / F.gcd(nX, o.nx), w = cA * o.h / 2;
      var unidades = cA * o.nx / nX;
      ec.innerHTML = "<span class='q3-eq'>" + (unidades > 1 ? unidades + " " : "") + F.pintar(oxidoF) + " + " + (w > 1 ? w + " " : "") + "H₂O ⟶ " + (cA > 1 ? cA + " " : "") + "<b>" + F.pintar(o.f) + "</b></span>";
      var serieTxt = ac(st.x).filter(function (q, i, a) { return true; });
      lectura.innerHTML = fil("Ácido", "<span class='q3-big'>" + F.html(r) + "</span>", "ok") + fil("n.º de O", String(o.no), "") +
        fil("Tradicional", esc(F.nombre(r, "trad")), "red ancho") + fil("Sistemática", esc(F.nombre(r, "sist")), "pen ancho") + fil("Stock", esc(F.nombre(r, "stock")), "ok ancho") +
        fil("Anión (sales)", F.pintarIon(o.anf, -o.h) + " · " + esc(o.an), "ancho") + fil("Óxido", F.pintar(oxidoF) + (oxi ? " · " + esc(F.nombre(oxi, "stock")) : ""), "ancho");
      var filas = ac(st.x).map(function (q) { var rr = F.hallar(q.f); return "<tr class='" + (q === o ? "sel" : "") + "'><th scope='row'>" + signo(q.ox) + "</th><td>" + F.pintar(q.f) + "</td><td>" + esc(F.nombre(rr, "trad")) + "</td><td>" + esc(q.an) + "</td></tr>"; }).join("");
      serie.innerHTML = "<table class='lam-tabla q3-t'><thead><tr><th>n.º ox.</th><th>Ácido</th><th>Nombre</th><th>Sal: anión</th></tr></thead><tbody>" + filas + "</tbody></table>";
      var cont = cuerpo.querySelector("[data-ox]"); U.fichas(cont, lo.map(function (v) { return { k: String(v), t: "+" + v }; }), String(st.ox), function (k) { st.ox = +k; st.h = 0; pinta(); });
      var ch = cuerpo.querySelector("[data-h]"); U.fichas(ch, vs.map(function (q, i) { return { k: String(i), t: (q.h > 1 && q.x !== "P" ? "" : "") + F.pintar(q.f) + " · " + (q.adj.indexOf("meta") === 0 ? "meta" : q.adj.indexOf("orto") === 0 ? "orto" : q.x === "P" || q.x === "B" ? "orto (habitual)" : "habitual") }; }), String(st.h), function (k) { st.h = +k; pinta(); });
    }
    U.fichas(cuerpo.querySelector("[data-el]"), ELS.map(function (s) { return { k: s, t: s }; }), st.x, function (k) { st.x = k; var lo = oxs(k); st.ox = lo[lo.length - 1]; st.h = 0; pinta(); });
    st.ox = oxs(st.x)[oxs(st.x).length - 1];
    pinta();
  };

  // ============================================================
  // Q3_SALES: del ácido a la sal (quita H⁺ y pon un metal)
  // ============================================================
  B.w.q3_sales = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Del ácido a la sal: quita H⁺ y añade un metal");
    cuerpo.innerHTML = '<div class="q3-ctr"><div class="q3-fila"><span class="q3-lab">Ácido</span><div data-ac class="chips"></div></div><div class="q3-fila" data-fh><span class="q3-lab">H⁺ que pierde</span><div data-nh class="chips"></div></div><div class="q3-fila"><span class="q3-lab">Metal</span><div data-me class="chips"></div></div><div class="q3-fila" data-fv><span class="q3-lab">Valencia</span><div data-va class="chips"></div></div></div>' +
      '<div class="q3-ec"></div><div class="lectura anch"></div><p class="w-pie">Si el ácido pierde todos sus H⁺ se obtiene una <b>oxisal</b> (sulfato, nitrato…); si conserva alguno, una <b>sal ácida</b> (hidrogenosulfato…). El anión toma una carga negativa igual al número de H⁺ perdidos.</p>';
    var ACIDOS = ["H2SO4", "H2SO3", "HNO3", "HNO2", "H2CO3", "H3PO4", "HClO", "HClO2", "HClO3", "HClO4", "H2CrO4", "HMnO4", "H2S"], METS = ["Na", "K", "Ca", "Mg", "Al", "Zn", "Ag", "Cu", "Fe", "Pb", "NH4"];
    var st = { a: "H2SO4", h: 2, m: "Na", v: 1 }, ec = cuerpo.querySelector(".q3-ec"), lectura = cuerpo.querySelector(".lectura");
    function total(a) { return F.atomos(a).H; }
    function anionDe(a, h) { var at = F.atomos(a), rest = "", k, tot = at.H; for (k in at) if (k !== "H") rest += k + (at[k] > 1 ? at[k] : ""); var quedan = tot - h; return { f: (quedan > 0 ? "H" + (quedan > 1 ? quedan : "") : "") + (a === "H2S" ? "S" : rest), q: -h }; }
    function ordena(a) { return a; }
    function pinta() {
      var T = total(st.a); if (st.h > T) st.h = T;
      var vs = valencias(st.m); if (vs.indexOf(st.v) < 0) st.v = vs[vs.length - 1];
      cuerpo.querySelector("[data-fh]").style.display = T > 1 ? "" : "none"; cuerpo.querySelector("[data-fv]").style.display = vs.length > 1 ? "" : "none";
      var an = a2(st.a, st.h), cr = F.cruce(st.v, st.h), f = F.mk(st.m, cr.nCat) + F.mk(an.f, cr.nAn), r = F.hallar(f), ra = F.hallar(st.a), ia = F.hallar(an.f + (st.h > 1 ? st.h : "") + "-");
      ec.innerHTML = "<span class='q3-eq'>" + F.pintar(st.a) + " − " + (st.h > 1 ? st.h + " " : "") + "H⁺ ⟶ " + F.pintarIon(an.f, -st.h) + ";   " + (cr.nAn > 1 ? cr.nAn + " " : "") + F.pintarIon(an.f, -st.h) + " + " + (cr.nCat > 1 ? cr.nCat + " " : "") + F.pintarIon(st.m, st.v) + " ⟶ <b>" + F.pintar(f) + "</b></span>";
      lectura.innerHTML = fil("Ácido", ra ? esc(F.nombre(ra, "trad")) : st.a, "") + fil("Anión", ia ? F.pintarIon(an.f, -st.h) + " · " + esc((F.nombre(ia, "stock") || "").replace(/^ion /, "")) : F.pintarIon(an.f, -st.h), "pen") +
        fil("Sal", "<span class='q3-big'>" + F.pintar(f) + "</span>", "ok") + fil("Tipo", r ? F.FAM[r.fam] : "—", "") + lineaNombres(r);
    }
    function a2(a, h) { return anionDe(a, h); }
    function cs() { U.fichas(cuerpo.querySelector("[data-ac]"), ACIDOS.map(function (s) { return { k: s, t: F.pintar(s) }; }), st.a, function (k) { st.a = k; st.h = total(k); nh(); pinta(); }); }
    function nh() { var T = total(st.a), l = []; for (var i = 1; i <= T; i++) l.push({ k: String(i), t: String(i) }); U.fichas(cuerpo.querySelector("[data-nh]"), l, String(st.h), function (k) { st.h = +k; pinta(); }); }
    function mv() { var vs = valencias(st.m); if (vs.indexOf(st.v) < 0) st.v = vs[vs.length - 1]; U.fichas(cuerpo.querySelector("[data-va]"), vs.map(function (v) { return { k: String(v), t: "+" + v }; }), String(st.v), function (k) { st.v = +k; pinta(); }); }
    cs(); nh(); mv();
    U.fichas(cuerpo.querySelector("[data-me]"), METS.map(function (s) { return { k: s, t: F.pintar(s) }; }), st.m, function (k) { st.m = k; mv(); pinta(); });
    pinta();
  };
})(window);
