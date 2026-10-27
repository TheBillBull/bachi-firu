/* ============================================================
   Bachi para Firu · FyQ I tema 5 (I): estequiometría
   Biblioteca de reacciones · q5_ajuste · q5_tabla · q5_limitante
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;
  var NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) { var e = document.createElementNS(NS, tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function plano(f) { return String(f).replace(/[₀-₉]/g, function (c) { return "₀₁₂₃₄₅₆₇₈₉".indexOf(c); }); }

  // ============================================================
  // BIBLIOTECA DE REACCIONES (cada cadena ya lleva los coeficientes ajustados y el estado físico)
  // ============================================================
  Q.reacciones = [
    { id: "haber", t: "Síntesis del amoníaco (Haber-Bosch)", s: "N2(g) + 3H2(g) -> 2NH3(g)" },
    { id: "agua", t: "Formación del agua líquida", s: "2H2(g) + O2(g) -> 2H2O(l)" },
    { id: "vapor", t: "Mezcla detonante: vapor de agua", s: "2H2(g) + O2(g) -> 2H2O(g)" },
    { id: "metano", t: "Combustión del metano", s: "CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" },
    { id: "propano", t: "Combustión del propano", s: "C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" },
    { id: "butano", t: "Combustión del butano", s: "2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(l)" },
    { id: "etanol", t: "Combustión del etanol", s: "C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)" },
    { id: "glucosa", t: "Respiración: combustión de la glucosa", s: "C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l)" },
    { id: "fermenta", t: "Fermentación alcohólica", s: "C6H12O6(aq) -> 2C2H5OH(aq) + 2CO2(g)" },
    { id: "caliza", t: "Descomposición de la caliza", s: "CaCO3(s) -> CaO(s) + CO2(g)" },
    { id: "magnesio", t: "Magnesio ardiendo", s: "2Mg(s) + O2(g) -> 2MgO(s)" },
    { id: "hierroS", t: "Hierro con azufre", s: "Fe(s) + S(s) -> FeS(s)" },
    { id: "zinc", t: "Zinc con ácido clorhídrico", s: "Zn(s) + 2HCl(aq) -> ZnCl2(aq) + H2(g)" },
    { id: "aluminio", t: "Aluminio con ácido clorhídrico", s: "2Al(s) + 6HCl(aq) -> 2AlCl3(aq) + 3H2(g)" },
    { id: "neut1", t: "Neutralización: HCl con NaOH", s: "HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)" },
    { id: "neut2", t: "Neutralización: H₂SO₄ con NaOH", s: "H2SO4(aq) + 2NaOH(aq) -> Na2SO4(aq) + 2H2O(l)" },
    { id: "agcl", t: "Precipitación del cloruro de plata", s: "AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)" },
    { id: "pbi2", t: "Precipitación del yoduro de plomo(II)", s: "Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)" },
    { id: "caco3pp", t: "Precipitación del carbonato de calcio", s: "CaCl2(aq) + Na2CO3(aq) -> CaCO3(s) + 2NaCl(aq)" },
    { id: "carbonato", t: "Carbonato de calcio con ácido", s: "CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)" },
    { id: "termita", t: "La termita", s: "2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(l)" },
    { id: "altohorno", t: "Alto horno", s: "Fe2O3(s) + 3CO(g) -> 2Fe(s) + 3CO2(g)" },
    { id: "clorato", t: "Descomposición del clorato de potasio", s: "2KClO3(s) -> 2KCl(s) + 3O2(g)" },
    { id: "oxigenada", t: "Descomposición del agua oxigenada", s: "2H2O2(aq) -> 2H2O(l) + O2(g)" },
    { id: "sodio", t: "Sodio en agua", s: "2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g)" },
    { id: "bicarbonato", t: "Bicarbonato sódico al calentar", s: "2NaHCO3(s) -> Na2CO3(s) + H2O(g) + CO2(g)" },
    { id: "cobre", t: "Cobre en nitrato de plata", s: "Cu(s) + 2AgNO3(aq) -> Cu(NO3)2(aq) + 2Ag(s)" },
    { id: "airbag", t: "Airbag: azida de sodio", s: "2NaN3(s) -> 2Na(s) + 3N2(g)" },
    { id: "oxido", t: "Oxidación del hierro", s: "4Fe(s) + 3O2(g) -> 2Fe2O3(s)" },
    { id: "co", t: "Oxidación del monóxido de carbono", s: "2CO(g) + O2(g) -> 2CO2(g)" },
    { id: "carbono", t: "Combustión del carbono", s: "C(s) + O2(g) -> CO2(g)" }
  ];
  var CACHE = {};
  function termino(t) {
    t = t.trim(); var c = 1, e = "", m = /^(\d+)\s*(.*)$/.exec(t); if (m) { c = parseInt(m[1], 10); t = m[2]; }
    var s = /\((g|s|l|aq)\)$/.exec(t); if (s) { e = s[1]; t = t.slice(0, t.length - s[0].length); }
    return { f: t, c: c, e: e };
  }
  Q.parseReac = function (s) {
    var lados = s.split("->"), r = lados[0].split(" + ").map(termino), p = lados[1].split(" + ").map(termino);
    return { r: r, p: p, todas: r.concat(p) };
  };
  Q.reaccion = function (id) {
    if (CACHE[id]) return CACHE[id];
    var d = null; Q.reacciones.forEach(function (x) { if (x.id === id) d = x; });
    if (!d) return null; var R = Q.parseReac(d.s); R.id = id; R.t = d.t; R.s = d.s; return (CACHE[id] = R);
  };
  Q.indiceReac = function (id) { var k = 0; Q.reacciones.forEach(function (x, i) { if (x.id === id) k = i; }); return k; };
  Q.textoReac = function (R) { return Q.textoEcuacion(R.r.map(function (x) { return x.f; }), R.p.map(function (x) { return x.f; }), R.todas.map(function (x) { return x.c; })); };
  Q.nombreEstado = { g: "gas", s: "sólido", l: "líquido", aq: "disolución acuosa", "": "" };
  Q.simboloEstado = function (e) { return e ? "<small class='q5-est'>(" + e + ")</small>" : ""; };
  Q.selector = function (host, etiqueta, opciones, actual, alElegir) {          // <select> accesible con la etiqueta delante
    var l = document.createElement("label"); l.className = "bx-campo q5-selector";
    l.innerHTML = '<span class="bx-et">' + etiqueta + '</span><select aria-label="' + etiqueta.replace(/<[^>]+>/g, "").replace(/:$/, "") + '">' + opciones.map(function (o) { return '<option value="' + o.k + '"' + (o.k === actual ? " selected" : "") + ">" + o.t + "</option>"; }).join("") + "</select>";
    host.appendChild(l); var s = l.querySelector("select"); s.addEventListener("change", function () { alElegir(s.value); }); return s;
  };

  // Gráfico de barras agrupadas «antes / después» (moles)
  Q.grafAntesDespues = function (host, esp, ini, fin, unidad, etq) {
    host.innerHTML = "";
    var W = 520, H = 250, base = 195, alto = 140, mx = 0.0001; ini.concat(fin).forEach(function (v) { if (v > mx) mx = v; }); mx *= 1.18;
    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, "class": "plot q5-graf", role: "img", "aria-label": etq || "Cantidad de cada sustancia antes y después de la reacción" }, host);
    svg("line", { x1: 20, y1: base, x2: W - 10, y2: base, "class": "q5-eje" }, s);
    var n = esp.length, an = (W - 30) / n;
    esp.forEach(function (e, k) {
      var cx = 20 + an * (k + 0.5), bw = Math.min(40, an / 2 - 10), col = Q.color(k), hI = alto * ini[k] / mx, hF = alto * fin[k] / mx, t;
      svg("rect", { x: cx - bw - 3, y: base - hI, width: bw, height: Math.max(hI, 0), "class": "q5-bi", stroke: col, fill: col }, s);
      svg("rect", { x: cx + 3, y: base - hF, width: bw, height: Math.max(hF, 0), "class": "q5-bf", fill: col }, s);
      t = svg("text", { x: cx - bw / 2 - 3, y: base - hI - 5, "text-anchor": "middle", "class": "q5-val" }, s); t.textContent = fmt(ini[k], ini[k] < 10 ? 2 : 1);
      t = svg("text", { x: cx + bw / 2 + 3, y: base - hF - 5, "text-anchor": "middle", "class": "q5-val" }, s); t.textContent = fmt(fin[k], fin[k] < 10 ? 2 : 1);
      t = svg("text", { x: cx, y: base + 19, "text-anchor": "middle", "class": "q5-lbl" }, s); t.textContent = Q.sub(esp[k].f);
      if (esp[k].e) { t = svg("text", { x: cx, y: base + 34, "text-anchor": "middle", "class": "q5-est-t" }, s); t.textContent = "(" + esp[k].e + ")"; }
    });
    svg("rect", { x: W - 170, y: 8, width: 12, height: 12, "class": "q5-bi", stroke: "currentColor", fill: "currentColor" }, s);
    var l1 = svg("text", { x: W - 152, y: 18, "class": "q5-lbl" }, s); l1.textContent = "al empezar";
    svg("rect", { x: W - 85, y: 8, width: 12, height: 12, "class": "q5-bf", fill: "currentColor" }, s);
    var l2 = svg("text", { x: W - 67, y: 18, "class": "q5-lbl" }, s); l2.textContent = "al acabar";
    var u = svg("text", { x: 22, y: 18, "class": "q5-lbl" }, s); u.textContent = unidad || "mol";
  };

  // ============================================================
  // AJUSTE: contar átomos y poner coeficientes
  // ============================================================
  var AJ = ["N2 + H2 -> NH3", "CH4 + O2 -> CO2 + H2O", "C3H8 + O2 -> CO2 + H2O", "Fe + O2 -> Fe2O3", "Al + HCl -> AlCl3 + H2", "KClO3 -> KCl + O2", "Fe2O3 + CO -> Fe + CO2",
    "Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O", "Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", "C6H12O6 + O2 -> CO2 + H2O", "NH3 + O2 -> NO + H2O", "Cu + HNO3 -> Cu(NO3)2 + NO + H2O", "C4H10 + O2 -> CO2 + H2O", "Na2CO3 + HCl -> NaCl + H2O + CO2", "FeS2 + O2 -> Fe2O3 + SO2"];
  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  B.w.q5_ajuste = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ajusta la ecuación contando átomos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="q5-ec" role="group" aria-label="Coeficientes de la ecuación"></div><div class="q5-tabla"></div><div class="ctl q5-acc"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { txt: AJ[0], R: [], P: [], coefs: [], error: null }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ec = cuerpo.querySelector(".q5-ec"), tabla = cuerpo.querySelector(".q5-tabla"), acc = cuerpo.querySelector(".q5-acc"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iE = Q.campo(ctl, "Ecuación:", st.txt, 330);
    function carga(txt) {
      st.txt = txt; var E = Q.ecuacion(txt);
      if (!E.ok) { st.error = E.error; return; }
      var bad = null; E.reactivos.concat(E.productos).forEach(function (f) { var L = Q.leer(f); if (!L.ok && !bad) bad = "«" + f + "»: " + L.error; });
      if (bad) { st.error = bad; return; }
      st.error = null; st.R = E.reactivos; st.P = E.productos; st.coefs = E.reactivos.concat(E.productos).map(function () { return 1; });
    }
    function pinta(foco) {
      if (st.error) { ec.innerHTML = ""; tabla.innerHTML = ""; lectura.innerHTML = fil("Revisa la ecuación", st.error, "red ancho"); pie.innerHTML = "Escribe las fórmulas con números normales (H2O, Ca(OH)2, Al2(SO4)3) separadas por «+» y con una flecha «->»."; return; }
      var todas = st.R.concat(st.P), nR = st.R.length, h = "";
      todas.forEach(function (f, k) {
        if (k === nR) h += "<span class='q5-fl' aria-hidden='true'>⟶</span>"; else if (k > 0) h += "<span class='q5-mas' aria-hidden='true'>+</span>";
        h += "<span class='q5-esp'><span class='q5-paso'><button type='button' data-i='" + k + "' data-d='-1' aria-label='Quitar uno al coeficiente de " + plano(f) + "'>−</button><b aria-live='polite'>" + st.coefs[k] + "</b><button type='button' data-i='" + k + "' data-d='1' aria-label='Sumar uno al coeficiente de " + plano(f) + "'>+</button></span><span class='q5-fo'>" + Q.sub(f) + "</span></span>";
      });
      ec.innerHTML = h;
      if (foco) { var b = ec.querySelector("[data-i='" + foco[0] + "'][data-d='" + foco[1] + "']"); if (b) b.focus(); }
      var rec = Q.recuento(st.R, st.P, st.coefs), ok = rec.every(function (r) { return r.izq === r.der; }), mal = rec.filter(function (r) { return r.izq !== r.der; });
      function pts(n, col) { var m = Math.min(n, 30); return "<span class='q5-pts' style='color:" + col + "' aria-hidden='true'>" + new Array(m + 1).join("●") + (n > 30 ? "…" : "") + "</span>"; }
      tabla.innerHTML = "<table class='fo-t q5-t'><thead><tr><th>Elemento</th><th>Átomos a la izquierda</th><th>Átomos a la derecha</th><th>¿Cuadra?</th></tr></thead><tbody>" +
        rec.map(function (r, k) { var col = Q.color(k), igual = r.izq === r.der; return "<tr class='" + (igual ? "ok" : "mal") + "'><th>" + r.e + "</th><td>" + pts(r.izq, col) + " <b>" + r.izq + "</b></td><td>" + pts(r.der, col) + " <b>" + r.der + "</b></td><td>" + (igual ? "✓" : "✗ " + (r.izq > r.der ? "sobran a la izquierda" : "faltan a la izquierda")) + "</td></tr>"; }).join("") + "</tbody></table>";
      var g = st.coefs.reduce(function (a, b) { return mcd(a, b); }, 0), cn = todas.map(function (f, k) { return (st.coefs[k] === 1 ? "1 mol de " : st.coefs[k] + " mol de ") + Q.sub(f); });
      var lect = fil("Ecuación actual", Q.textoEcuacion(st.R, st.P, st.coefs), ok ? "ok ancho" : "ancho");
      if (ok && g === 1) lect += fil("Estado", "✓ Ajustada, con los coeficientes enteros más pequeños", "ok ancho") + fil("Lectura en moles", cn.slice(0, nR).join(" + ") + " → " + cn.slice(nR).join(" + "), "pen ancho");
      else if (ok) lect += fil("Estado", "Está ajustada, pero todos los coeficientes se pueden dividir entre " + g + ": usa los más pequeños", "red ancho");
      else lect += fil("Estado", "Todavía no: " + mal.map(function (r) { return r.e + " (" + r.izq + " ≠ " + r.der + ")"; }).join(", "), "red ancho");
      lectura.innerHTML = lect;
      pie.innerHTML = "Pulsa − y + para cambiar los <b>coeficientes</b> (los números de delante). Los <b>subíndices</b> de dentro de cada fórmula nunca se tocan. Empieza por los elementos que aparecen en una sola sustancia de cada lado, deja el <b>H</b> y el <b>O</b> para el final y vuelve a contar tras cada cambio.";
    }
    ec.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-i]"); if (!b) return;
      var k = +b.getAttribute("data-i"), d = +b.getAttribute("data-d"); st.coefs[k] = Math.max(1, Math.min(99, st.coefs[k] + d)); pinta([k, d]);
    });
    U.fichas(cuerpo.querySelector("[data-pre]"), AJ.map(function (e, i) { var E = Q.ecuacion(e); return { k: String(i), t: Q.textoEcuacion(E.reactivos, E.productos, null) }; }), "0", function (k) { iE.value = AJ[+k]; carga(AJ[+k]); pinta(); });
    iE.addEventListener("input", function () { carga(iE.value); pinta(); });
    U.boton(acc, "Dame una pista", function () {
      if (st.error) return;
      var rec = Q.recuento(st.R, st.P, st.coefs), mal = rec.filter(function (r) { return r.izq !== r.der; });
      if (!mal.length) { lectura.innerHTML = fil("Pista", "Ya cuadra todo. Comprueba que los coeficientes sean los enteros más pequeños posibles.", "pen ancho"); return; }
      mal.sort(function (a, b) { var p = function (x) { return x.e === "O" ? 2 : x.e === "H" ? 1 : 0; }; return p(a) - p(b); });
      var r = mal[0], lado = r.izq < r.der ? st.R : st.P, off = r.izq < r.der ? 0 : st.R.length, cand = null, quien = r.izq < r.der ? "izquierda" : "derecha";
      lado.forEach(function (f, k) { var L = Q.leer(f); if (!cand && L.ok && L.elems[r.e]) cand = f; });
      lectura.innerHTML = fil("Pista", "Mira el " + r.e + ": hay " + r.izq + " a la izquierda y " + r.der + " a la derecha. Falta por la " + quien + "; prueba a subir el coeficiente de " + Q.sub(cand || "") + " (contiene " + r.e + ") y vuelve a contar el resto de los elementos.", "pen ancho");
    });
    U.boton(acc, "Ajustar automáticamente", function () {
      if (st.error) return; var A = Q.ajustar(st.R, st.P);
      if (!A.ok) { lectura.innerHTML = fil("No se puede ajustar", A.error, "red ancho"); return; }
      st.coefs = A.coefs.slice(); pinta();
    });
    U.boton(acc, "Poner todos a 1", function () { if (st.error) return; st.coefs = st.coefs.map(function () { return 1; }); pinta(); });
    carga(st.txt); pinta();
  };

  // ============================================================
  // TABLA: la ecuación ajustada como tabla de proporciones y cadena de cálculo
  // ============================================================
  B.w.q5_tabla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "De un dato a todo lo demás: la tabla estequiométrica");
    cuerpo.innerHTML = '<div data-ctl></div><div class="q5-ecu"></div><div class="q5-dato-t">Dato conocido</div><div data-dato class="chips"></div><div data-uni class="chips"></div><div class="q5-tabla"></div><div class="q5-dato-t">Quiero calcular</div><div data-obj class="chips"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { id: "haber", j: 1, u: "g", v: "6", k: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".q5-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), ecu = cuerpo.querySelector(".q5-ecu");
    var sel = Q.selector(ctl, "Reacción:", Q.reacciones.map(function (r) { return { k: r.id, t: r.t }; }), st.id, function (k) { st.id = k; st.j = 0; st.k = Math.min(1, Q.reaccion(k).todas.length - 1); st.u = "g"; st.v = "10"; iV.value = "10"; armar(); });
    var iV = Q.campo(ctl, "Cantidad:", st.v, 110); iV.addEventListener("input", function () { st.v = iV.value; pinta(); });
    function armar() {
      var R = Q.reaccion(st.id), todas = R.todas;
      U.fichas(cuerpo.querySelector("[data-dato]"), todas.map(function (x, i) { return { k: String(i), t: Q.sub(x.f) }; }), String(st.j), function (k) { st.j = +k; armarUni(); pinta(); });
      U.fichas(cuerpo.querySelector("[data-obj]"), todas.map(function (x, i) { return { k: String(i), t: Q.sub(x.f) }; }), String(st.k), function (k) { st.k = +k; pinta(); });
      armarUni(); pinta();
    }
    function armarUni() {
      var R = Q.reaccion(st.id), e = R.todas[st.j].e, ops = [{ k: "g", t: "gramos" }, { k: "mol", t: "moles" }];
      if (e === "g") ops.push({ k: "L", t: "litros en CN" });
      ops.push({ k: "N", t: "partículas (·10²³)" });
      if (!ops.some(function (o) { return o.k === st.u; })) st.u = "g";
      U.fichas(cuerpo.querySelector("[data-uni]"), ops, st.u, function (k) { st.u = k; pinta(); });
    }
    function pinta() {
      var R = Q.reaccion(st.id), todas = R.todas, v = Q.num(st.v), d = todas[st.j], Md = Q.masaMolar(d.f), obj = todas[st.k];
      ecu.innerHTML = "<div class='q5-ecuacion'>" + todas.map(function (x, k) { return (k === R.r.length ? "<span class='q5-fl'>⟶</span>" : k ? "<span class='q5-mas'>+</span>" : "") + "<span class='q5-esp q5-solo'><b>" + (x.c === 1 ? "" : x.c) + "</b> " + Q.sub(x.f) + Q.simboloEstado(x.e) + "</span>"; }).join("") + "</div>";
      if (isNaN(v) || v < 0) { tabla.innerHTML = ""; lectura.innerHTML = fil("Revisa la cantidad", "escribe un número positivo (con coma o punto decimal)", "red ancho"); return; }
      var n0 = st.u === "g" ? v / Md : st.u === "mol" ? v : st.u === "L" ? v / Q.VM : v * 1e23 / Q.NA, xi = n0 / d.c, totR = 0, totP = 0;
      tabla.innerHTML = "<table class='fo-t q5-t'><thead><tr><th>Sustancia</th><th>Coef.</th><th>M (g/mol)</th><th>Moles</th><th>Masa (g)</th><th>Volumen CN (L)</th><th>Partículas (·10²³)</th></tr></thead><tbody>" +
        todas.map(function (x, k) {
          var n = xi * x.c, M = Q.masaMolar(x.f), m = n * M; if (k < R.r.length) totR += m; else totP += m;
          return "<tr class='" + (k === st.j ? "izq" : "") + "'><th>" + Q.sub(x.f) + Q.simboloEstado(x.e) + "</th><td>" + x.c + "</td><td>" + fmt(M, 2) + "</td><td>" + fmt(n, 4) + "</td><td>" + fmt(m, 3) + "</td><td>" + (x.e === "g" ? fmt(n * Q.VM, 3) : "—") + "</td><td>" + fmt(n * Q.NA / 1e23, 4) + "</td></tr>";
        }).join("") + "</tbody></table>";
      var paso1 = st.u === "g" ? "n(" + Q.sub(d.f) + ") = m/M = " + fmt(v, 3) + " / " + fmt(Md, 2) + " = " + fmt(n0, 4) + " mol" : st.u === "mol" ? "n(" + Q.sub(d.f) + ") = " + fmt(n0, 4) + " mol (ya viene en moles)" : st.u === "L" ? "n(" + Q.sub(d.f) + ") = V/22,4 = " + fmt(v, 3) + " / 22,4 = " + fmt(n0, 4) + " mol (en CN)" : "n(" + Q.sub(d.f) + ") = N/N<sub>A</sub> = " + fmt(v, 3) + "·10²³ / 6,022·10²³ = " + fmt(n0, 4) + " mol";
      var nO = xi * obj.c, MO = Q.masaMolar(obj.f), pasos = paso1;
      if (st.k !== st.j) pasos += "<br>Proporción de la ecuación: " + obj.c + " mol de " + Q.sub(obj.f) + " por cada " + d.c + " mol de " + Q.sub(d.f) + "<br>n(" + Q.sub(obj.f) + ") = " + fmt(n0, 4) + " · " + obj.c + "/" + d.c + " = " + fmt(nO, 4) + " mol";
      pasos += "<br>m(" + Q.sub(obj.f) + ") = n·M = " + fmt(nO, 4) + " · " + fmt(MO, 2) + " = <b>" + fmt(nO * MO, 3) + " g</b>" + (obj.e === "g" ? "<br>V(CN) = n·22,4 = <b>" + fmt(nO * Q.VM, 3) + " L</b>" : "");
      lectura.innerHTML = fil("Cadena de cálculo", pasos, "pen ancho") + fil("Comprobación de Lavoisier", "masa de reactivos = " + fmt(totR, 3) + " g · masa de productos = " + fmt(totP, 3) + " g " + (Math.abs(totR - totP) < 1e-6 * Math.max(1, totR) ? "✓" : "✗"), "ok ancho");
      pie.innerHTML = "<b>Una sola fila de la tabla</b> basta: pasa tu dato a moles, divide entre su coeficiente (esto es «cuántas veces ocurre la reacción») y multiplica por el coeficiente de la sustancia que buscas. Los <b>moles</b> son los que cumplen la proporción; las masas y los volúmenes salen de ellos.";
    }
    Q.escuchas.push({ el: cuerpo, f: pinta }); armar();
  };

  // ============================================================
  // LIMITANTE: quién se agota primero
  // ============================================================
  var DOS = ["agua", "haber", "metano", "hierroS", "magnesio", "zinc", "carbonato", "termita", "oxido", "agcl", "neut2", "etanol"];
  B.w.q5_limitante = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Reactivo limitante y reactivo en exceso");
    cuerpo.innerHTML = '<div data-ctl></div><div data-uni class="chips"></div><div data-sl></div><div class="q5-ecu"></div><div class="w-plot q5-graf-c"></div><div class="q5-tabla"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { id: "haber", u: "mol", a: 3, b: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), slH = U.ctl(cuerpo.querySelector("[data-sl]")), ecu = cuerpo.querySelector(".q5-ecu"), lienzo = cuerpo.querySelector(".q5-graf-c"), tabla = cuerpo.querySelector(".q5-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.selector(ctl, "Reacción:", DOS.map(function (id) { return { k: id, t: Q.reaccion(id).t }; }), st.id, function (k) { st.id = k; defecto(); armar(); });
    var sA, sB;
    function defecto() { var R = Q.reaccion(st.id); st.u = "mol"; st.a = R.r[0].c * 3; st.b = R.r[1].c * 2; if (R.r[0].c === 1 && R.r[1].c === 1) { st.a = 3; st.b = 2; } }
    function armar() {
      var R = Q.reaccion(st.id); slH.innerHTML = "";
      var opt = st.u === "mol" ? { min: 0, max: 12, step: 0.1, fmt: function (v) { return fmt(v, 1) + " mol"; } } : { min: 0, max: 300, step: 1, fmt: function (v) { return fmt(v, 0) + " g"; } };
      sA = U.slider(slH, { et: "Cantidad de " + Q.sub(R.r[0].f), min: opt.min, max: opt.max, step: opt.step, val: st.a, fmt: opt.fmt, on: function (v) { st.a = v; pinta(); } });
      sB = U.slider(slH, { et: "Cantidad de " + Q.sub(R.r[1].f), min: opt.min, max: opt.max, step: opt.step, val: st.b, fmt: opt.fmt, on: function (v) { st.b = v; pinta(); } });
      U.fichas(cuerpo.querySelector("[data-uni]"), [{ k: "mol", t: "Datos en moles" }, { k: "g", t: "Datos en gramos" }], st.u, function (k) {
        var R2 = Q.reaccion(st.id), M0 = Q.masaMolar(R2.r[0].f), M1 = Q.masaMolar(R2.r[1].f);
        if (k === "g" && st.u === "mol") { st.a = Math.min(300, Math.round(st.a * M0)); st.b = Math.min(300, Math.round(st.b * M1)); } else if (k === "mol" && st.u === "g") { st.a = Math.min(12, Math.round(st.a / M0 * 10) / 10); st.b = Math.min(12, Math.round(st.b / M1 * 10) / 10); }
        st.u = k; armar();
      });
      pinta();
    }
    function pinta() {
      var R = Q.reaccion(st.id), todas = R.todas, nR = R.r.length, M = todas.map(function (x) { return Q.masaMolar(x.f); });
      ecu.innerHTML = "<div class='q5-ecuacion'>" + todas.map(function (x, k) { return (k === nR ? "<span class='q5-fl'>⟶</span>" : k ? "<span class='q5-mas'>+</span>" : "") + "<span class='q5-esp q5-solo'><b>" + (x.c === 1 ? "" : x.c) + "</b> " + Q.sub(x.f) + Q.simboloEstado(x.e) + "</span>"; }).join("") + "</div>";
      var n0 = st.u === "mol" ? [st.a, st.b] : [st.a / M[0], st.b / M[1]], raz = [n0[0] / R.r[0].c, n0[1] / R.r[1].c], xi = Math.min(raz[0], raz[1]), lim = raz[0] === raz[1] ? -1 : raz[0] < raz[1] ? 0 : 1;
      var ini = todas.map(function (x, k) { return k < nR ? n0[k] : 0; }), fin = todas.map(function (x, k) { return k < nR ? Math.max(0, n0[k] - x.c * xi) : x.c * xi; });
      Q.grafAntesDespues(lienzo, todas, ini, fin, "mol");
      tabla.innerHTML = "<table class='fo-t q5-t'><thead><tr><th>Reactivo</th><th>Coef.</th><th>Moles</th><th>Moles ÷ coef.</th><th>Veredicto</th></tr></thead><tbody>" +
        R.r.map(function (x, k) { return "<tr class='" + (k === lim ? "izq" : "") + "'><th>" + Q.sub(x.f) + Q.simboloEstado(x.e) + "</th><td>" + x.c + "</td><td>" + fmt(n0[k], 4) + "</td><td>" + fmt(raz[k], 4) + "</td><td>" + (lim === -1 ? "proporción exacta" : k === lim ? "LIMITANTE (el menor)" : "en exceso") + "</td></tr>"; }).join("") + "</tbody></table>";
      var l = "";
      if (xi <= 0) l = fil("Resultado", "No hay reacción: falta algún reactivo (cantidad cero).", "red ancho");
      else {
        l = fil("Reactivo limitante", lim === -1 ? "ninguno: están en la proporción exacta de la ecuación" : Q.sub(R.r[lim].f), "red") + fil("La reacción ocurre", fmt(xi, 4) + " veces (el menor de los «moles ÷ coeficiente»)", "pen");
        R.p.forEach(function (x, k) { var n = x.c * xi; l += fil("Se forma " + Q.sub(x.f), fmt(n, 4) + " mol = " + fmt(n * M[nR + k], 3) + " g" + (x.e === "g" ? " = " + fmt(n * Q.VM, 2) + " L en CN" : ""), "ok ancho"); });
        if (lim !== -1) { var e = 1 - lim, nSob = fin[e], nNec = R.r[e].c * xi; l += fil("Sobra de " + Q.sub(R.r[e].f), fmt(nSob, 4) + " mol = " + fmt(nSob * M[e], 3) + " g (el exceso es del " + fmt(nNec > 0 ? (n0[e] - nNec) / nNec * 100 : 0, 1) + " % sobre lo necesario)", "ancho"); }
        var mI = n0[0] * M[0] + n0[1] * M[1], mF = 0; todas.forEach(function (x, k) { mF += fin[k] * M[k]; });
        l += fil("Comprobación de masa", "antes: " + fmt(mI, 3) + " g · después: " + fmt(mF, 3) + " g " + (Math.abs(mI - mF) < 1e-6 * Math.max(1, mI) ? "✓" : "✗"), "ancho");
      }
      lectura.innerHTML = l;
      pie.innerHTML = "<b>Truco del limitante:</b> divide los moles de cada reactivo entre su coeficiente. El <b>menor</b> cociente manda: es el reactivo que se agota y marca cuánto producto se forma. Los demás sobran, y lo que sobra es lo que no ha podido encontrar pareja.";
    }
    Q.escuchas.push({ el: cuerpo, f: pinta }); defecto(); armar();
  };
})(window);
