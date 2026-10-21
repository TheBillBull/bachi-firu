/* ============================================================
   Bachi para Firu · laboratorio del enlace químico, segunda parte (Física y Química I, tema 2)
   q2_red · q2_bornhaber · q2_propiedades · q2_fuerzas · q2_metalico · q2_hibrid
   Usa el motor B.lab.enlace de lab_enlace.js (se consulta al montar cada simulador).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  function f2(x) { return fmt(x, 2); }
  function sup(n) { return U.sup(n); }
  function ion(sym, q) { return sym + (q === 1 ? "⁺" : sup(q) + "⁺"); }
  function anion(sym, q) { return sym + (q === 1 ? "⁻" : sup(q) + "⁻"); }
  function miles(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace("-", "−"); }

  // ============================================================
  // Q2_RED: energía reticular según carga y tamaño de los iones
  // ============================================================
  var SERIES_RED = [
    { t: "Haluros de sodio", f: ["NaF", "NaCl", "NaBr", "NaI"] }, { t: "Haluros de litio", f: ["LiF", "LiCl", "LiBr", "LiI"] }, { t: "Cloruros alcalinos", f: ["LiCl", "NaCl", "KCl", "RbCl", "CsCl"] },
    { t: "Óxidos del grupo 2", f: ["MgO", "CaO", "SrO", "BaO"] }, { t: "Más carga", f: ["NaF", "MgO", "Al2O3"] }
  ];
  B.w.q2_red = function (host) {
    var E = B.lab.enlace, Q = B.lab.quim, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "Energía reticular: el efecto de la carga y del tamaño de los iones");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><div data-ser class="chips"></div><div class="w-plot"></div><p class="q2-leyenda"><span><i style="background:var(--pen)"></i>valor de tablas</span><span><i style="background:var(--red)"></i>estimación de Kapustinskii</span></p><p class="w-pie"></p>';
    var st = { c: 1, a: 1, ser: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g, sc, sa;
    sc = U.slider(ctl, { et: "Catión", min: 0, max: E.CATIONES.length - 1, step: 1, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { var c = E.CATIONES[v]; return ion(c[0], c[1]) + " · " + c[2] + " pm"; } });
    sa = U.slider(ctl, { et: "Anión", min: 0, max: E.ANIONES.length - 1, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { var a = E.ANIONES[v]; return anion(a[0], a[1]) + " · " + a[2] + " pm"; } });
    var CN = { 3: "triangular (CN 3)", 4: "blenda de cinc, ZnS (CN 4:4)", 6: "tipo NaCl (CN 6:6)", 8: "tipo CsCl (CN 8:8)", 12: "empaquetamiento compacto (CN 12)" };
    function pinta() {
      var s = E.sal(st.c, st.a), c = E.CATIONES[st.c], a = E.ANIONES[st.a];
      lectura.innerHTML = fil("Compuesto", Q.sub(s.f) + "  (" + s.x + " " + ion(c[0], c[1]) + " + " + s.y + " " + anion(a[0], a[1]) + ")", "pen ancho") + fil("Distancia d = r₊ + r₋", s.d + " pm") + fil("q₊·q₋ / d (relativo)", fmt(s.ind * 1000, 2) + " · 10⁻³ pm⁻¹", "red") +
        fil("Energía reticular estimada (Kapustinskii)", miles(s.kap) + " kJ/mol", "ok") + fil("Energía reticular de tablas", s.ref ? miles(s.ref[0]) + " kJ/mol" : "no incluida en la tabla", "ancho") + fil("Punto de fusión", s.ref ? s.ref[1] + " °C" : "—") +
        fil("Razón de radios r₊/r₋", f2(s.razon) + " → " + CN[s.cn], "ancho");
      pie.innerHTML = "<b>Ley de Coulomb</b>: la atracción entre dos iones es proporcional a q₊·q₋/d. Cuanto <b>mayor carga</b> y <b>menor tamaño</b> (menor d), mayor energía reticular y, por tanto, <b>mayor punto de fusión y dureza</b>. La estimación de Kapustinskii (U ≈ 1,2025·10⁵ · ν · |z₊z₋| / d · (1 − 34,5/d), con d en pm) suele quedar un 2–8 % por debajo del valor de tablas. La razón de radios predice cuántos aniones caben alrededor de un catión (índice de coordinación).";
    }
    function serie() {
      var S = SERIES_RED[st.ser], ys = [], n = S.f.length;
      S.f.forEach(function (f) { var ic = -1, ia = -1; E.CATIONES.forEach(function (c, i) { E.ANIONES.forEach(function (a, j) { var q = E.sal(i, j); if (q.f === f) { ic = i; ia = j; } }); }); ys.push(E.sal(ic, ia)); });
      var mx = Math.max.apply(null, ys.map(function (s) { return Math.max(s.ref[0], s.kap); })) * 1.15;
      g.rango(0, n + 1, 0, mx); g.limpiar();
      ys.forEach(function (s, i) {
        g.rect(i + 0.62, 0, i + 0.98, s.ref[0], { clase: "z-pen" }); g.rect(i + 1.02, 0, i + 1.38, s.kap, { clase: "z-red" });
        g.texto(i + 1, 0, Q.sub(S.f[i]), { dy: 16, ancla: "middle" }); g.texto(i + 0.8, s.ref[0], miles(s.ref[0]), { dy: -5, ancla: "middle", clase: "pen" });
        g.texto(i + 1.2, s.kap, miles(s.kap), { dy: -5, ancla: "middle", clase: "red" });
      });
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 5, ymin: 0, ymax: 1000, w: 640, h: 270, sinX: true, etx: "", ety: "U (kJ/mol)", etiqueta: "Energías reticulares" });
    U.fichas(cuerpo.querySelector("[data-pre]"), [["NaCl", 1, 1], ["LiF", 0, 0], ["CsCl", 4, 1], ["KI", 2, 3], ["MgO", 5, 4], ["CaF₂", 6, 0], ["Al₂O₃", 9, 4]].map(function (p, i) { return { k: String(i), t: p[0] }; }), "0", function (k) {
      var p = [[1, 1], [0, 0], [4, 1], [2, 3], [5, 4], [6, 0], [9, 4]][+k]; st.c = p[0]; st.a = p[1]; sc.set(st.c); sa.set(st.a); pinta();
    });
    U.fichas(cuerpo.querySelector("[data-ser]"), SERIES_RED.map(function (s, i) { return { k: String(i), t: s.t }; }), "0", function (k) { st.ser = +k; serie(); });
    pinta(); serie();
  };

  // ============================================================
  // Q2_BORNHABER: ciclo de Born–Haber
  // ============================================================
  B.w.q2_bornhaber = function (host) {
    var E = B.lab.enlace, Q = B.lab.quim, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "Ciclo de Born–Haber: la energía reticular por la ley de Hess");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="q2-pasos"></div><div class="lectura anch"></div><div class="q2-juego"></div><p class="w-pie"></p>';
    var st = { i: 0, k: 99 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".q2-pasos"), pie = cuerpo.querySelector(".w-pie"), juego = cuerpo.querySelector(".q2-juego"), g, sl;
    sl = U.slider(ctl, { et: "Pasos del ciclo", min: 0, max: 7, step: 1, val: 7, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { var n = E.BH[st.i].pasos.length; return v === 0 ? "ninguno" : v <= n ? v + " de " + n : v === n + 1 ? "+ red cristalina" : "+ formación (cierre del ciclo)"; } });
    function pinta() {
      var c = E.BH[st.i], n = c.pasos.length, niv = [0], U_ = E.bhU(c), j, k = Math.min(st.k, n + 2);
      sl.input.max = n + 2; if (st.k > n + 2) { st.k = n + 2; sl.set(st.k); }
      c.pasos.forEach(function (p) { niv.push(niv[niv.length - 1] + p[1]); });
      var top = niv[n], mx = Math.max.apply(null, niv.concat([0])) * 1.18 + 40, mn = Math.min.apply(null, niv.concat([c.hf, 0])) * 1.25 - 40;
      g.rango(0, n + 3.2, mn, mx); g.limpiar();
      g.segmento(0.4, 0, n + 3, 0, { clase: "c-faint", dash: "4 4" }); g.texto(n + 3, 0, "elementos", { ancla: "end", dy: -5, clase: "faint" });
      for (j = 0; j < n; j++) {
        if (j >= k) break;
        var v = c.pasos[j][1], col = v >= 0 ? "c-red" : "c-pen", sg = g.segmento(j + 1, niv[j], j + 1, niv[j + 1], { clase: col }); sg.setAttribute("stroke-width", 4);
        g.segmento(j + 1, niv[j + 1], j + 2, niv[j + 1], { clase: "c-faint", dash: "3 4" });
        g.texto(j + 1, (niv[j] + niv[j + 1]) / 2, (v > 0 ? "+" : "−") + miles(Math.abs(v)), { dx: 8, dy: 4, clase: v >= 0 ? "red" : "pen" }); g.texto(j + 1, niv[j + 1], "①②③④⑤"[j], { dy: v >= 0 ? -8 : 16, ancla: "middle", clase: "faint" });
      }
      if (k >= n + 1) { var s2 = g.segmento(n + 1.6, top, n + 1.6, c.hf, { clase: "c-ok" }); s2.setAttribute("stroke-width", 4); g.texto(n + 1.6, (top + c.hf) / 2, "−U = −" + miles(U_), { dx: 8, dy: 4, clase: "ok" }); g.segmento(n + 1, top, n + 1.6, top, { clase: "c-faint", dash: "3 4" }); g.texto(n + 1.6, top, "iones gaseosos", { dy: -8, ancla: "middle", clase: "faint" }); }
      if (k >= n + 2) { var s3 = g.segmento(n + 2.5, 0, n + 2.5, c.hf, { clase: "c-ink" }); s3.setAttribute("stroke-width", 4); g.texto(n + 2.5, c.hf / 2, "ΔHf = " + miles(c.hf), { dx: -8, dy: 4, ancla: "end" }); g.segmento(n + 1.6, c.hf, n + 2.5, c.hf, { clase: "c-faint", dash: "3 4" }); g.texto(n + 2.5, c.hf, "sólido iónico", { dy: 16, ancla: "middle", clase: "faint" }); }
      var suma = 0; for (j = 0; j < Math.min(k, n); j++) suma += c.pasos[j][1];
      pasos.innerHTML = "<ol class='q2-lista'>" + c.pasos.map(function (p, i) { return "<li" + (i < k ? "" : " style='opacity:.35'") + ">" + p[0] + " &nbsp;<b>" + (p[1] > 0 ? "+" : "−") + miles(Math.abs(p[1])) + " kJ/mol</b></li>"; }).join("") + "<li" + (k >= n + 1 ? "" : " style='opacity:.35'") + ">Formación de la red a partir de los iones gaseosos: <b>−U</b></li><li" + (k >= n + 2 ? "" : " style='opacity:.35'") + ">Formación directa del sólido a partir de los elementos: <b>ΔH<sub>f</sub> = " + miles(c.hf) + " kJ/mol</b> (dato experimental)</li></ol>";
      var ref = E.RET[c.f];
      lectura.innerHTML = fil("Compuesto", Q.sub(c.f) + " · " + c.n, "pen ancho") + fil("Suma de los pasos hasta los iones gaseosos", miles(niv[n]) + " kJ/mol", "red") + fil("Ley de Hess", "ΔH<sub>f</sub> = Σ pasos − U  ⟹  U = Σ pasos − ΔH<sub>f</sub>", "ancho") +
        fil("Energía reticular U", miles(U_) + " kJ/mol", "ok") + fil("Valor de tablas", ref ? miles(ref[0]) + " kJ/mol (diferencias del orden del 1 % por los datos redondeados)" : "—", "ancho");
      pie.innerHTML = "El sólido iónico se forma aunque separar y ionizar los átomos <b>cuesta mucha energía</b> (pasos ①–⑤ suben): lo que lo hace estable es la enorme energía que se desprende al atraerse los iones en la red. La segunda afinidad electrónica del oxígeno es positiva (poner un 2.º electrón en O⁻ cuesta energía), y aun así el MgO es muy estable porque su U es gigantesca (carga 2+ y 2−).";
      juego.innerHTML = "<p><b>Calcúlala tú:</b> con los datos de la lista y ΔH<sub>f</sub> = " + miles(c.hf) + " kJ/mol, ¿cuánto vale la energía reticular U de " + Q.sub(c.f) + "?</p><div class='q2-reto'><label>U (kJ/mol) <input type='text' inputmode='decimal' data-u autocomplete='off'></label><button type='button' class='chip-btn' data-c>Comprobar</button></div><p class='q2-msg' aria-live='polite'></p>";
      juego.querySelector("[data-c]").onclick = function () {
        var v = B.Mate.numero(juego.querySelector("[data-u]").value), msg = juego.querySelector(".q2-msg");
        if (isNaN(v)) { msg.innerHTML = "Escribe un número."; return; }
        msg.innerHTML = Math.abs(v - U_) <= Math.abs(U_) * 0.005 + 0.5 ? "<b style='color:var(--ok)'>✓ Correcto.</b> U = Σ pasos − ΔH<sub>f</sub> = " + miles(niv[n]) + " − (" + miles(c.hf) + ") = " + miles(U_) + " kJ/mol." : (Math.abs(v + U_) <= Math.abs(U_) * 0.005 + 0.5 ? "<b style='color:var(--red)'>El signo.</b> U se define como positiva (energía que hay que dar para separar la red); el paso del ciclo es −U." : "<b style='color:var(--red)'>Todavía no.</b> Suma todos los pasos (con su signo) y resta ΔH<sub>f</sub>: U = Σ − ΔH<sub>f</sub>. Cuidado con ΔH<sub>f</sub> negativo.");
      };
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 8, ymin: -800, ymax: 1000, w: 640, h: 330, sinX: true, etx: "", ety: "kJ/mol", etiqueta: "Ciclo de Born–Haber" });
    U.fichas(cuerpo.querySelector("[data-sel]"), E.BH.map(function (c, i) { return { k: String(i), t: Q.sub(c.f) }; }), "0", function (k) { st.i = +k; st.k = 99; sl.set(sl.input.max); pinta(); });
    pinta();
  };

  // ============================================================
  // Q2_PROPIEDADES: ¿qué tipo de sustancia es?
  // ============================================================
  B.w.q2_propiedades = function (host) {
    var E = B.lab.enlace, Q = B.lab.quim, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "¿Iónica, covalente o metálica? Deduce el tipo de sustancia por sus propiedades");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="q2-sw"></div><div class="lectura anch"></div><div class="q2-razon"></div><p class="w-pie"></p>';
    var st = { cs: false, cf: true, m: false, tf: 801, sel: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), sw = cuerpo.querySelector(".q2-sw"), lectura = cuerpo.querySelector(".lectura"), razon = cuerpo.querySelector(".q2-razon"), pie = cuerpo.querySelector(".w-pie"), slTf;
    slTf = U.slider(ctl, { et: "Punto de fusión", min: -200, max: 4000, step: 1, val: st.tf, on: function (v) { st.tf = v; st.sel = -1; pinta(); }, fmt: function (v) { return v + " °C"; } });
    sw.innerHTML = '<div class="q2-opc"><span>¿Conduce la electricidad en estado <b>sólido</b>?</span><span data-o="cs"></span></div><div class="q2-opc"><span>¿Conduce <b>fundida</b> (líquida)?</span><span data-o="cf"></span></div><div class="q2-opc"><span>¿Se puede <b>laminar</b> y estirar (maleable)?</span><span data-o="m"></span></div>';
    ["cs", "cf", "m"].forEach(function (k) {
      U.fichas(sw.querySelector('[data-o="' + k + '"]'), [{ k: "1", t: "sí" }, { k: "0", t: "no" }], st[k] ? "1" : "0", function (v) { st[k] = v === "1"; st.sel = -1; pinta(); });
    });
    function razona(p) {
      var r = [];
      if (p.cs) r.push(p.m ? "Conduce en estado sólido y es maleable: tiene electrones libres que se mueven por toda la red → <b>metal</b>." : "Conduce en estado sólido pero NO es maleable (es blando y se exfolia): es el caso del <b>grafito</b>, un sólido covalente en capas con electrones π deslocalizados.");
      else {
        r.push("No conduce en estado sólido: no hay electrones libres, así que no es un metal.");
        if (p.cf) r.push("Pero fundida conduce: al fundirse, los iones de la red quedan libres para moverse → <b>sólido iónico</b>.");
        else { r.push("Tampoco conduce fundida: no hay iones ni electrones móviles → <b>sustancia covalente</b>."); r.push(p.tf > 1500 ? "Su punto de fusión es muy alto (> 1 500 °C): para fundirla habría que romper enlaces covalentes en toda la red → <b>sólido covalente reticular</b> (diamante, SiO₂…)." : "Su punto de fusión es bajo: solo hay que vencer fuerzas intermoleculares → <b>sustancia covalente molecular</b>."); }
      }
      return r;
    }
    function pinta() {
      var cl = E.clasifica(st), tipos = { ionico: "Sólido iónico", molecular: "Sustancia covalente molecular", reticular: "Sólido covalente (red)", metalico: "Metal" };
      Array.prototype.forEach.call(sw.querySelectorAll("[data-o]"), function (h) { var k = h.getAttribute("data-o"); Array.prototype.forEach.call(h.children, function (b) { var on = (b.getAttribute("data-k") === "1") === st[k]; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); }); });
      var coinc = E.SUST.filter(function (s) { return s.tipo === cl; }).map(function (s) { return Q.sub(s.f); });
      lectura.innerHTML = fil("Tipo de sustancia", tipos[cl], (cl === "ionico" ? "red" : cl === "metalico" ? "ok" : "pen") + " ancho") + fil("Datos", "Tf = " + st.tf + " °C · conduce sólido: " + (st.cs ? "sí" : "no") + " · fundida: " + (st.cf ? "sí" : "no") + " · maleable: " + (st.m ? "sí" : "no"), "ancho") + fil("Ejemplos de esta clase", coinc.join(", "), "ancho");
      razon.innerHTML = "<ol class='q2-lista'>" + razona(st).map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>";
      var s = st.sel >= 0 ? E.SUST[st.sel] : null;
      pie.innerHTML = s ? "<b>" + Q.sub(s.f) + " (" + s.n + ")</b>: " + s.dur + ". Temperatura de ebullición: " + (s.teb == null ? "—" : s.teb + " °C") + ". Solubilidad en agua: " + s.sa + "." + (s.f === "HCl" ? " <b>Ojo:</b> el HCl es molecular (el HCl líquido no conduce), pero disuelto en agua se ioniza y la disolución conduce; por eso el criterio fiable es conducir <i>fundido</i>, no «disuelto»." : "") + (s.f === "C (grafito)" ? " Conduce porque en cada capa sobra un electrón π por átomo de C, deslocalizado." : "") : "Los criterios se aplican en este orden: 1) ¿conduce en sólido? 2) ¿conduce fundida? 3) ¿qué punto de fusión tiene? Elige una sustancia real o cambia los datos a mano.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), E.SUST.map(function (s, i) { return { k: String(i), t: Q.sub(s.f) }; }), "0", function (k) {
      var s = E.SUST[+k]; st.cs = s.cs; st.cf = s.cf; st.m = s.m; st.tf = s.tf; st.sel = +k; slTf.set(s.tf); pinta();
    });
    pinta();
  };

  // ============================================================
  // Q2_FUERZAS: fuerzas intermoleculares y puntos de ebullición
  // ============================================================
  B.w.q2_fuerzas = function (host) {
    var E = B.lab.enlace, Q = B.lab.quim, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "Fuerzas intermoleculares y punto de ebullición");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="w-plot"></div><div class="q2-otro"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "g16" }, plot = cuerpo.querySelector(".w-plot"), otro = cuerpo.querySelector(".q2-otro"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), g;
    var ORDEN = ["g14", "g15", "g16", "g17", "nobles", "halogenos", "alcanos"];
    var COLK = { g14: "#2E86DE", g15: "#13804B", g16: "#C23B4E", g17: "#E2A400", nobles: "#8A8F9C", halogenos: "#7A55B8", alcanos: "#2E86DE" };
    function extrapola(S) {
      var n = S.y.length, xs = S.per.slice(1), ys = S.y.slice(1), mx = xs.reduce(function (a, b) { return a + b; }, 0) / xs.length, my = ys.reduce(function (a, b) { return a + b; }, 0) / ys.length, num = 0, den = 0;
      xs.forEach(function (x, i) { num += (x - mx) * (ys[i] - my); den += (x - mx) * (x - mx); });
      var m = num / den, b = my - m * mx; return { m: m, b: b, y2: b + m * S.per[0] };
    }
    E.extrapola = extrapola;
    function pinta() {
      if (st.k === "iso" || st.k === "ener") {
        plot.style.display = "none"; otro.style.display = "";
        if (st.k === "iso") {
          otro.innerHTML = E.ISOMEROS.map(function (grupo) { var mx = Math.max.apply(null, grupo.d.map(function (x) { return x[1]; })), mn = Math.min.apply(null, grupo.d.map(function (x) { return x[1]; })), span = mx - mn || 1; return "<h5>" + grupo.t + "</h5>" + grupo.d.map(function (x) { return "<div class='q2-fila-b'><span>" + x[0] + "</span><span class='q2-b'><i style='width:" + (8 + 92 * (x[1] - mn) / span) + "%'></i></span><b>" + fmt(x[1], 1) + " °C</b></div>"; }).join("") + "<p class='w-pie'>" + grupo.nota + "</p>"; }).join("");
          lectura.innerHTML = ""; pie.innerHTML = "Con la misma fórmula o masa casi igual, lo que cambia el punto de ebullición es el tipo de fuerza y la superficie de contacto entre moléculas.";
        } else {
          otro.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Interacción</th><th>Energía (kJ/mol)</th><th>Dónde actúa / ejemplo</th></tr></thead><tbody>" + E.ENERGIAS.map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>"; }).join("") + "</tbody></table>";
          lectura.innerHTML = ""; pie.innerHTML = "Un enlace covalente es 10–100 veces más fuerte que una fuerza intermolecular. Por eso al <b>hervir</b> el agua se separan moléculas (≈ 41 kJ/mol) pero no se rompen sus enlaces O–H (463 kJ/mol).";
        }
        return;
      }
      plot.style.display = ""; otro.style.display = "none";
      var S = E.FZA[st.k], n = S.y.length, lo = Math.min.apply(null, S.y), hi = Math.max.apply(null, S.y), ext = st.k === "g15" || st.k === "g16" || st.k === "g17" || st.k === "g14" ? extrapola(S) : null;
      if (ext) { lo = Math.min(lo, ext.y2); hi = Math.max(hi, ext.y2); }
      var pad = (hi - lo) * 0.18 + 10;
      g.rango(0, n + 1, lo - pad, hi + pad); g.limpiar();
      g.segmento(0, 0, n + 1, 0, { clase: "c-faint", dash: "4 4" });
      var pts = S.y.map(function (y, i) { return [i + 1, y]; });
      g.polilinea(pts, { clase: "c-faint" });
      if (ext) { g.segmento(1, ext.b + ext.m * S.per[0], n, ext.b + ext.m * S.per[n - 1], { clase: "c-faint", dash: "6 5" }); }
      S.y.forEach(function (y, i) { var p = g.punto(i + 1, y, { r: 6, clase: "c-pen" }); p.style.fill = COLK[st.k]; g.texto(i + 1, y, (st.k === "alcanos" ? "C" + U.sub(i + 1) : S.x[i]) + " " + fmt(y, 0), { dy: y >= 0 || i % 2 ? -10 : 18, ancla: "middle" }); });
      var anom = "";
      if (ext) { var d = S.y[0] - ext.y2; anom = fil("Tendencia de los tres últimos (recta)", "predice " + fmt(ext.y2, 0) + " °C para " + S.x[0], "ancho") + fil("Diferencia con el valor real", (d >= 0 ? "+" : "") + fmt(d, 0) + " °C", d > 40 ? "red ancho" : "ok ancho"); }
      lectura.innerHTML = fil("Serie", S.t, "pen ancho") + anom;
      pie.innerHTML = S.nota + (ext && S.y[0] - ext.y2 > 40 ? " <b>El primer elemento hierve mucho más alto de lo que predice la tendencia: puentes de hidrógeno.</b>" : "") + " (Punto de ebullición normal, a 1 atm; los puntos están unidos solo para guiar la vista.)";
    }
    g = new B.Plot(plot, { xmin: 0, xmax: 5, ymin: -200, ymax: 200, w: 640, h: 300, sinX: true, etx: "", ety: "T_eb (°C)", etiqueta: "Puntos de ebullición" });
    var opts = ORDEN.map(function (k) { return { k: k, t: E.FZA[k].t }; }).concat([{ k: "iso", t: "Isómeros y grupo O–H" }, { k: "ener", t: "Energías de cada fuerza" }]);
    U.fichas(cuerpo.querySelector("[data-sel]"), opts, st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q2_METALICO: mar de electrones, conducción, deformación y fragilidad
  // ============================================================
  B.w.q2_metalico = function (host) {
    var E = B.lab.enlace, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "Metal frente a cristal iónico: conducir y deformar");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-ctl></div><div class="q2-lienzo q2-mt"></div><div class="q2-anim"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "a", V: 4, d: 0.5 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q2-mt"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), slV, slD;
    var W = 300, H = 170, SP = 38, X0 = 36, els = [], t0 = 0, i;
    for (i = 0; i < 26; i++) els.push({ x: 20 + Math.random() * (W - 40), y: 14 + Math.random() * (H - 28), vx: 0, vy: 0 });
    slV = U.slider(ctl, { et: "Tensión aplicada", min: 0, max: 10, step: 1, val: st.V, on: function (v) { st.V = v; pinta(); }, fmt: function (v) { return v + " V"; } });
    slD = U.slider(ctl, { et: "Desplazamiento de las capas superiores", min: 0, max: 100, step: 1, val: 50, on: function (v) { st.d = v / 100; pinta(); }, fmt: function (v) { return v + " % de la distancia entre iones"; } });
    function filas() { return [0, 1, 2, 3]; }
    function pinta() {
      slV.el.style.display = st.modo === "a" ? "" : "none"; slD.el.style.display = st.modo === "a" ? "none" : "";
      var s = '<svg viewBox="0 0 ' + W + " " + H + '" class="q2-svg" role="img" aria-label="Modelo de red">', fila, col, malas = 0, desp = st.d * SP;
      if (st.modo === "a" || st.modo === "b") {
        // metal: cationes en una red cuadrada con electrones deslocalizados
        for (fila = 0; fila < 5; fila++) for (col = 0; col < 7; col++) {
          var x = X0 + col * SP + (fila < 2 && st.modo === "b" ? desp : 0), y = 24 + fila * 30;
          s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="11" class="q2-cat"/><text x="' + x.toFixed(1) + '" y="' + (y + 4) + '" text-anchor="middle" class="q2-sup">+</text>';
        }
        if (st.modo === "b") s += '<rect x="2" y="2" width="' + (W - 4) + '" height="' + (H - 4) + '" class="q2-mar"/>';
        if (st.modo === "a") s += '<g class="q2-es">' + els.map(function (e, k) { return '<circle cx="' + e.x.toFixed(1) + '" cy="' + e.y.toFixed(1) + '" r="2.8" class="q2-e"/>'; }).join("") + "</g>";
        else for (i = 0; i < 26; i++) s += '<circle cx="' + (15 + ((i * 53) % 100) / 100 * (W - 30)).toFixed(1) + '" cy="' + (12 + ((i * 37) % 100) / 100 * (H - 24)).toFixed(1) + '" r="2.8" class="q2-e"/>';
        if (st.modo === "a") s += '<text x="12" y="' + (H - 6) + '" class="q2-pie">–  polo negativo</text><text x="' + (W - 12) + '" y="' + (H - 6) + '" text-anchor="end" class="q2-pie">polo positivo  +</text>';
      } else {
        for (fila = 0; fila < 5; fila++) for (col = 0; col < 7; col++) {
          var x2 = X0 + col * SP + (fila < 2 ? desp : 0), y2 = 24 + fila * 30, signo = (fila + col) % 2 === 0 ? 1 : -1;
          s += '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="' + (signo > 0 ? 11 : 14) + '" class="' + (signo > 0 ? "q2-cat" : "q2-ani") + '"/><text x="' + x2.toFixed(1) + '" y="' + (y2 + 4) + '" text-anchor="middle" class="q2-sup">' + (signo > 0 ? "+" : "−") + "</text>";
        }
        // contactos entre la fila 1 y la 2: cuando el desplazamiento acerca iones del mismo signo
        for (col = 0; col < 7; col++) {
          var xs = X0 + col * SP + desp, y1 = 24 + 30, ya = 24 + 60, sa = ((1 + col) % 2 === 0 ? 1 : -1);
          for (var c2 = 0; c2 < 7; c2++) { var xi = X0 + c2 * SP, sb = ((2 + c2) % 2 === 0 ? 1 : -1); if (Math.abs(xs - xi) < SP * 0.3) { if (sa === sb) { malas++; s += '<path d="M' + xs + " " + (y1 + 14) + "L" + xi + " " + (ya - 14) + '" class="q2-rep"/>'; } } }
        }
      }
      lienzo.innerHTML = s + "</svg>";
      var ley;
      if (st.modo === "a") ley = fil("Tensión", st.V + " V", "pen") + fil("Intensidad (relativa)", fmt(st.V / 10 * 100, 0) + " %", "red") + fil("Qué pasa", st.V === 0 ? "los electrones se agitan al azar: no hay corriente neta" : "los electrones libres derivan hacia el polo positivo: I ∝ V (ley de Ohm)", "ancho");
      else if (st.modo === "b") ley = fil("Desplazamiento", fmt(st.d * 100, 0) + " % de la distancia entre iones", "pen") + fil("Estado del enlace", "intacto: el mar de electrones sigue envolviendo a todos los cationes", "ok ancho") + fil("Consecuencia", "el metal se deforma sin romperse → maleable y dúctil", "red ancho");
      else ley = fil("Desplazamiento", fmt(st.d * 100, 0) + " % de la distancia entre iones", "pen") + fil("Contactos entre iones del mismo signo", String(malas), malas ? "red" : "ok") + fil("Estado del cristal", malas ? "¡repulsión entre cargas iguales! Se rompe → frágil" : (st.d === 0 ? "intacto" : "las capas se han desplazado pero todavía no se enfrentan cargas iguales (sigue desplazando hasta el 100 %)"), (malas ? "red" : "ok") + " ancho");
      lectura.innerHTML = ley;
      pie.innerHTML = st.modo === "a" ? "En un <b>metal</b>, los electrones de valencia no pertenecen a ningún átomo: forman un «mar» que se mueve libremente entre los cationes. Al aplicar una tensión todos derivan en el mismo sentido: <b>conductividad eléctrica</b> (y térmica). Al subir la temperatura los cationes vibran más, chocan más con los electrones y la conductividad <i>baja</i>." : st.modo === "b" ? "Si se desplazan unas capas de cationes sobre otras, el mar de electrones se reajusta y sigue manteniendo la cohesión: los metales son <b>maleables</b> (se laminan) y <b>dúctiles</b> (se estiran en hilos)." : "En un <b>cristal iónico</b> los iones están alternados. Basta desplazar una capa media distancia entre iones para que queden enfrentados iones del mismo signo: las repulsiones rompen el cristal. Por eso los sólidos iónicos son <b>duros pero frágiles</b> y no conducen en estado sólido (los iones no se mueven), aunque sí fundidos o disueltos.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "a", t: "Metal · corriente eléctrica" }, { k: "b", t: "Metal · deformación" }, { k: "c", t: "Cristal iónico · golpe" }], "a", function (k) { st.modo = k; if (k === "b") { st.d = 0.5; slD.set(50); } if (k === "c") { st.d = 0; slD.set(0); } pinta(); });
    U.animar(cuerpo.querySelector(".q2-anim"), function (t, dt, reset) {
      if (st.modo !== "a") return;
      var drift = st.V * 14;
      els.forEach(function (e) {
        e.vx = (Math.random() - 0.5) * 120; e.vy = (Math.random() - 0.5) * 120;
        e.x += (e.vx + drift) * dt; e.y += e.vy * dt;
        if (e.x > W - 8) e.x = 8; if (e.x < 8) e.x = W - 8; if (e.y < 8) e.y = 8; if (e.y > H - 8) e.y = H - 8;
      });
      var cs = lienzo.querySelectorAll(".q2-e"); els.forEach(function (e, k) { if (cs[k]) { cs[k].setAttribute("cx", e.x.toFixed(1)); cs[k].setAttribute("cy", e.y.toFixed(1)); } });
    }, { auto: true });
    pinta();
  };

  // ============================================================
  // Q2_HIBRID: hibridación sp, sp² y sp³ y enlaces σ y π
  // ============================================================
  function caja(f) { return '<span class="q1-orb">' + f + "</span>"; }
  B.w.q2_hibrid = function (host) {
    var E = B.lab.enlace, Q = B.lab.quim, fil = E.fil;
    var cuerpo = B.caja(host, "Pruébalo", "Hibridación del carbono y enlaces σ y π");
    cuerpo.innerHTML = '<div data-hib class="chips"></div><div class="q2-orbs"></div><div class="q2-fila"><div class="q2-lienzo q2-hb"></div><div class="lectura anch"></div></div><h5>Cuenta de enlaces σ y π</h5><div data-mol class="chips"></div><div class="q2-sp"></div><div class="q2-juego"></div><p class="w-pie"></p>';
    var st = { h: 2, m: 2 }, orbs = cuerpo.querySelector(".q2-orbs"), lienzo = cuerpo.querySelector(".q2-hb"), lectura = cuerpo.querySelector(".lectura"), sp = cuerpo.querySelector(".q2-sp"), juego = cuerpo.querySelector(".q2-juego"), pie = cuerpo.querySelector(".w-pie");
    function dibujo(h) {
      var cx = 120, cy = 90, R = 62, s = '<svg viewBox="0 0 240 180" class="q2-svg" role="img" aria-label="Orbitales híbridos ' + E.HIB[h].k + '">', angs = h === 0 ? [0, 180] : h === 1 ? [90, 210, 330] : [90, 210, 330, 0];
      if (h === 2) { // sp³: proyección de un tetraedro
        var v = E.GEOM["4,0"].pos; angs = null;
        v.forEach(function (p) { var r = E.gira(p, 0.7, 0.35), x = cx + R * r[0], y = cy - R * r[1]; s += '<ellipse cx="' + (cx + (x - cx) / 2).toFixed(1) + '" cy="' + (cy + (y - cy) / 2).toFixed(1) + '" rx="' + (R / 2 + 4) + '" ry="13" transform="rotate(' + (Math.atan2(y - cy, x - cx) * 180 / Math.PI).toFixed(1) + " " + (cx + (x - cx) / 2).toFixed(1) + " " + (cy + (y - cy) / 2).toFixed(1) + ')" class="q2-lob" fill-opacity="' + (0.3 + 0.2 * (r[2] + 1) / 2).toFixed(2) + '"/>'; });
      } else angs.forEach(function (a) { var x = cx + R * Math.cos(a * Math.PI / 180), y = cy - R * Math.sin(a * Math.PI / 180); s += '<ellipse cx="' + (cx + (x - cx) / 2).toFixed(1) + '" cy="' + (cy + (y - cy) / 2).toFixed(1) + '" rx="' + (R / 2 + 4) + '" ry="13" transform="rotate(' + (-a) + " " + (cx + (x - cx) / 2).toFixed(1) + " " + (cy + (y - cy) / 2).toFixed(1) + ')" class="q2-lob"/>'; });
      if (h === 0) s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="10" ry="46" class="q2-lobp"/><text x="' + (cx + 14) + '" y="' + (cy - 44) + '" class="q2-pie">p puro (π)</text>';
      if (h === 1) s += '<circle cx="' + cx + '" cy="' + cy + '" r="20" class="q2-lobp"/><text x="8" y="172" class="q2-pie">círculo discontinuo: p puro perpendicular al papel (forma el π)</text>';
      return s + '<circle cx="' + cx + '" cy="' + cy + '" r="6" class="q2-central"/></svg>';
    }
    function pintaH() {
      var H = E.HIB[st.h], ocup = "↑", esp = "";
      orbs.innerHTML = '<div class="q2-orbfila"><b>Estado fundamental</b>' + caja("2s ↑↓") + caja("2p ↑") + caja("2p ↑") + caja("2p") + "</div>" +
        '<div class="q2-orbfila"><b>Excitado (se promociona un e⁻)</b>' + caja("2s ↑") + caja("2p ↑") + caja("2p ↑") + caja("2p ↑") + "</div>" +
        '<div class="q2-orbfila"><b>Hibridado: ' + H.k + "</b>" + Array.apply(null, Array(H.n)).map(function () { return caja(H.k + " ↑"); }).join("") + Array.apply(null, Array(H.puros)).map(function () { return caja("2p ↑"); }).join("") + "</div>";
      lienzo.innerHTML = dibujo(st.h);
      lectura.innerHTML = fil("Hibridación", H.k, "red") + fil("Orbitales híbridos", String(H.n)) + fil("Orbitales p sin hibridar", String(H.puros) + (H.puros ? " → forman enlaces π" : "")) + fil("Ángulo entre híbridos", H.ang, "ok") + fil("Geometría", H.geom, "pen ancho") + fil("Ejemplos", H.ej, "ancho") + fil("Proceso", H.conf, "ancho");
    }
    function pintaM() {
      var m = E.SIGPI[st.m], r = E.sigpi(m), cnt = {}, fil2 = "";
      m.enl.forEach(function (e) { var k = e[0] + "–" + e[1] + " (orden " + (e[2] === 1.5 ? "1,5" : e[2]) + ")"; cnt[k] = (cnt[k] || 0) + 1; });
      var tabla = Object.keys(cnt).map(function (k) { var o = k.match(/orden ([\d,]+)/)[1]; var ord = parseFloat(o.replace(",", ".")); return "<tr><td>" + k.replace(/ \(orden.*/, "") + "</td><td>" + cnt[k] + "</td><td>" + o + "</td><td>" + cnt[k] + "</td><td>" + fmt(cnt[k] * (ord - 1), 1) + "</td></tr>"; }).join("");
      sp.innerHTML = "<table class='fo-t ac-t'><thead><tr><th>Enlace</th><th>Cuántos</th><th>Orden</th><th>σ</th><th>π</th></tr></thead><tbody>" + tabla + "<tr><td colspan='3'><b>Total en " + Q.sub(m.f) + "</b></td><td><b>" + r.sigma + "</b></td><td><b>" + fmt(r.pi, 0) + "</b></td></tr></tbody></table><p class='w-pie'>Hibridación de los átomos centrales: " + Object.keys(m.hib).map(function (k) { return k + ": " + m.hib[k]; }).join(" · ") + (m.f === "C6H6" ? ". En el benceno cada C usa tres orbitales sp² (dos σ C–C y uno σ C–H) y su p puro forma, junto a los otros cinco, una nube π deslocalizada: 3 enlaces π «repartidos» entre los seis C–C (orden 1,5)." : ".") + "</p>";
      juego.innerHTML = "<p><b>Reto:</b> ¿cuántos enlaces σ y cuántos π hay en una molécula de <b>" + Q.sub(m.f) + "</b>?</p><div class='q2-reto'><label>σ <input type='text' inputmode='numeric' data-s autocomplete='off'></label><label>π <input type='text' inputmode='numeric' data-p autocomplete='off'></label><button type='button' class='chip-btn' data-c>Comprobar</button></div><p class='q2-msg' aria-live='polite'></p>";
      juego.querySelector("[data-c]").onclick = function () {
        var s = parseInt(juego.querySelector("[data-s]").value, 10), p = parseInt(juego.querySelector("[data-p]").value, 10), msg = juego.querySelector(".q2-msg");
        if (isNaN(s) || isNaN(p)) { msg.innerHTML = "Escribe los dos números."; return; }
        msg.innerHTML = s === r.sigma && p === r.pi ? "<b style='color:var(--ok)'>✓ Correcto.</b> Cada enlace simple es 1 σ; en uno doble hay 1 σ + 1 π; en uno triple, 1 σ + 2 π." : "<b style='color:var(--red)'>Todavía no.</b> Regla: todo enlace tiene exactamente un σ; los π son «orden − 1» en cada enlace. Mira la tabla de arriba.";
      };
    }
    U.fichas(cuerpo.querySelector("[data-hib]"), E.HIB.map(function (h, i) { return { k: String(i), t: h.k }; }), String(st.h), function (k) { st.h = +k; pintaH(); });
    U.fichas(cuerpo.querySelector("[data-mol]"), E.SIGPI.map(function (m, i) { return { k: String(i), t: Q.sub(m.f) }; }), String(st.m), function (k) { st.m = +k; pintaM(); });
    pintaH(); pintaM();
  };
})(window);
