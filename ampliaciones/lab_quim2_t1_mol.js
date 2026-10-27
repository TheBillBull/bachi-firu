/* ============================================================
   Bachi para Firu · Química II, tema 1 («La química y sus cálculos»)
   Cuatro laboratorios nuevos (el resto se reutiliza de FyQ I: lab_qmol_*.js):
     qq1_mapa      el mol como estación central: g · partículas · L de gas · mL de disolución
     qq1_mezcla    mezcla de dos sustancias: la recta que convierte «lo medido» en composición
     qq1_densidad  densidad y masa molar de los gases: d = P·M / (R·T)
     qq1_curvalim  cuánto producto, cuánto sobra, según se añade el reactivo B
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Q = B.lab.qmol, fil = Q.fil;

  function estilo(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement("style"); s.id = id; s.textContent = css; document.head.appendChild(s);
  }
  estilo("qq1-css",
    ".qm-mapa{display:grid;grid-template-columns:minmax(0,1fr) 54px minmax(0,1.15fr) 54px minmax(0,1fr);grid-template-rows:auto 40px auto 40px auto;gap:2px 6px;align-items:center;margin:10px 0}" +
    ".qm-nodo{position:relative;text-align:left;border:2px solid var(--line);background:var(--sheet-2);color:var(--ink);border-radius:12px;padding:8px 10px;font:inherit;cursor:pointer;min-width:0}" +
    ".qm-nodo:hover:not([disabled]){border-color:var(--pen)}" +
    ".qm-nodo.dato{border-color:var(--pen);background:color-mix(in srgb,var(--pen) 11%,var(--sheet));box-shadow:0 0 0 2px color-mix(in srgb,var(--pen) 35%,transparent)}" +
    ".qm-nodo[disabled]{opacity:.5;cursor:not-allowed}" +
    ".qm-nodo small{display:block;font:700 11px/1.2 var(--body);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft)}" +
    ".qm-val{display:block;font:700 17px/1.3 var(--math);margin-top:2px;overflow-wrap:anywhere}" +
    ".qm-nodo em{display:block;font:500 12px/1.3 var(--body);font-style:normal;color:var(--ink-faint);margin-top:2px}" +
    ".qm-nodo input{width:100%;box-sizing:border-box;font:700 17px var(--math);color:var(--ink);background:var(--sheet);border:1.5px solid var(--pen);border-radius:8px;padding:3px 6px;margin-top:3px}" +
    ".qm-flecha{text-align:center;font:600 11px/1.15 var(--body);color:var(--ink-soft)}" +
    ".qm-flecha b{display:block;font:700 20px/1 var(--body);color:var(--ink-faint)}" +
    ".qm-centro{border-color:var(--ok)}.qm-centro.dato{border-color:var(--pen)}" +
    "@media(max-width:560px){.qm-mapa{display:flex;flex-direction:column;align-items:stretch;gap:8px}.qm-flecha{display:none}.qm-mapa>.qm-nodo{order:2}.qm-mapa>.qm-centro{order:1}}" +
    ".qd-fila{display:grid;grid-template-columns:62px 1fr 150px;align-items:center;gap:8px;margin:4px 0;font:600 14px var(--math)}" +
    ".qd-fila .qd-b{display:block;height:20px;border-radius:6px}" +
    ".qd-fila.aire{outline:2px solid var(--ink-soft);outline-offset:2px;border-radius:6px}" +
    ".qd-fila small{font:500 11.5px/1.2 var(--body);color:var(--ink-soft)}" +
    "@media(max-width:560px){.qd-fila{grid-template-columns:50px 1fr 96px;font-size:13px}.qd-fila small{font-size:10.5px}}");

  // ============================================================
  // QQ1_MAPA: el mol como estación central
  // ============================================================
  var SUST = [
    { f: "H2O", t: "H₂O", gas: false, sol: false, v: "36" }, { f: "CO2", t: "CO₂", gas: true, sol: false, v: "11" },
    { f: "NH3", t: "NH₃", gas: true, sol: true, v: "8.5" }, { f: "HCl", t: "HCl", gas: true, sol: true, v: "3.65" },
    { f: "NaCl", t: "NaCl", gas: false, sol: true, v: "5.85" }, { f: "H2SO4", t: "H₂SO₄", gas: false, sol: true, v: "49" },
    { f: "C6H12O6", t: "Glucosa", gas: false, sol: true, v: "18" }
  ];
  B.w.qq1_mapa = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El mapa del mol: todo pasa por la cantidad de sustancia");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-mm class="chips"></div><div data-ctl></div><div data-cond class="chips"></div><div data-sl></div><div class="qm-mapa"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { f: "H2O", dato: "m", v: "36", cond: "cn", T: 25, P: 1, c: 1 };
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), sl = U.ctl(cuerpo.querySelector("[data-sl]")), mapa = cuerpo.querySelector(".qm-mapa"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iF = Q.campo(ctl, "Sustancia:", st.f, 130);
    Q.fichasModo(cuerpo.querySelector("[data-mm]"), function () { pinta(); });
    var sT = U.slider(sl, { et: "Temperatura del gas", min: -20, max: 150, step: 5, val: st.T, on: function (v) { st.T = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " °C (" + fmt(v + 273, 0) + " K)"; } });
    var sP = U.slider(sl, { et: "Presión del gas", min: 0.5, max: 4, step: 0.1, val: st.P, on: function (v) { st.P = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " atm"; } });
    U.slider(sl, { et: "Concentración de la disolución", min: 0.1, max: 12, step: 0.1, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " mol/L"; } });
    // tarjetas
    var DEF = [
      { k: "m", pos: "left", tit: "Masa", u: "g" }, { k: "n", pos: "center", tit: "Cantidad de sustancia", u: "mol" },
      { k: "N", pos: "top", tit: "Partículas", u: "moléculas" }, { k: "V", pos: "right", tit: "Volumen de gas", u: "L" },
      { k: "D", pos: "bottom", tit: "Volumen de disolución", u: "mL" }
    ];
    var CELDA = { left: [3, 1], center: [3, 3], top: [1, 3], right: [3, 5], bottom: [5, 3] }, nodos = {}, inputs = {};
    DEF.forEach(function (d) {
      var b = document.createElement("button"); b.type = "button"; b.className = "qm-nodo" + (d.k === "n" ? " qm-centro" : ""); b.setAttribute("data-k", d.k);
      b.style.gridRow = CELDA[d.pos][0]; b.style.gridColumn = CELDA[d.pos][1];
      b.innerHTML = "<small>" + d.tit + '</small><span class="qm-val"></span><em></em>';
      mapa.appendChild(b); nodos[d.k] = b;
    });
    var FL = [[3, 2, "÷ M<br>× M"], [3, 4, "× 22,4<br>(RT/P)"], [2, 3, "× N<sub>A</sub><br>÷ N<sub>A</sub>"], [4, 3, "÷ c<br>× c"]];
    FL.forEach(function (f) { var d = document.createElement("div"); d.className = "qm-flecha"; d.style.gridRow = f[0]; d.style.gridColumn = f[1]; d.innerHTML = "<b>⇄</b>" + f[2]; mapa.appendChild(d); });
    function sust() { var r = null; SUST.forEach(function (s) { if (s.f === st.f) r = s; }); return r; }
    function permitido(k) { var s = sust(); if (!s) return true; return k === "V" ? s.gas : k === "D" ? s.sol : true; }
    mapa.addEventListener("click", function (e) {
      var b = e.target.closest(".qm-nodo"); if (!b || e.target.tagName === "INPUT") return;
      var k = b.getAttribute("data-k"); if (b.disabled || k === st.dato) return;
      var v = valores(); if (v && isFinite(v[k])) { st.v = String(Math.round(v[k] * 1e5) / 1e5).replace(".", ","); st.dato = k; pinta(); }
    });
    function valores() {
      var L = Q.leer(st.f); if (!L.ok) return null;
      var M = Q.masaMolar(st.f), x = Q.num(st.v); if (isNaN(x) || x < 0) return null;
      var TK = st.T + 273, n, volGas = function (nn) { return st.cond === "cn" ? nn * Q.VM : nn * Q.R * TK / st.P; };
      if (st.dato === "m") n = x / M; else if (st.dato === "n") n = x; else if (st.dato === "N") n = x / Q.NA;
      else if (st.dato === "V") n = st.cond === "cn" ? x / Q.VM : x * st.P / (Q.R * TK); else n = st.c * x / 1000;
      return { M: M, n: n, m: n * M, N: n * Q.NA, V: volGas(n), D: n / st.c * 1000, L: L, TK: TK };
    }
    function pinta() {
      var s = sust(), v = valores(), L = Q.leer(st.f);
      Object.keys(nodos).forEach(function (k) { var ok = permitido(k); nodos[k].disabled = !ok; });
      if (!permitido(st.dato)) { st.dato = "m"; st.v = s.v; }
      var idx = ["m", "n", "N", "V", "D"];
      if (!L.ok || !v) {
        lectura.innerHTML = fil("Revisa los datos", L.ok ? "escribe una cantidad positiva en la casilla azul" : L.error, "red ancho");
      }
      idx.forEach(function (k) {
        var b = nodos[k], val = b.querySelector(".qm-val"), em = b.querySelector("em"), esDato = k === st.dato;
        b.classList.toggle("dato", esDato); b.setAttribute("aria-pressed", esDato);
        var d = DEF.filter(function (x) { return x.k === k; })[0];
        if (esDato) {
          val.innerHTML = '<input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="' + d.tit + ' (dato)" value="' + st.v + '">';
          var inp = val.querySelector("input"); inp.addEventListener("input", function () { st.v = inp.value; pinta2(); });
          inp.addEventListener("keydown", function (e) { e.stopPropagation(); });
          em.textContent = d.u + " · esto es el dato; pulsa otra tarjeta para cambiarlo";
          return;
        }
        if (!permitido(k)) { val.textContent = "—"; em.textContent = k === "V" ? "no es un gas en estas condiciones" : "no se disuelve (no es soluto)"; return; }
        if (!v) { val.textContent = "—"; em.textContent = d.u; return; }
        var txt = k === "m" ? fmt(v.m, 4) : k === "n" ? fmt(v.n, 5) : k === "N" ? Q.sci(v.N, 3) : k === "V" ? fmt(v.V, 3) : fmt(v.D, 2);
        val.textContent = txt;
        em.textContent = d.u + (k === "N" ? " (" + Q.sci(v.N * Q.nAtomos(st.f), 3) + " átomos)" : k === "V" ? (st.cond === "cn" ? " en CN" : " a " + fmt(st.P, 1) + " atm y " + fmt(v.TK, 0) + " K") : "");
      });
      pinta2();
    }
    function pinta2() {
      var v = valores(), L = Q.leer(st.f);
      if (!v || !L.ok) { return; }
      var f = L.formula, d = st.dato, pasos = [];
      var TK = v.TK, cn = st.cond === "cn";
      if (d === "m") pasos.push(fil("1) A moles  n = m / M", fmt(Q.num(st.v), 4) + " g / " + fmt(v.M, 2) + " g/mol = " + fmt(v.n, 5) + " mol", "pen ancho"));
      else if (d === "n") pasos.push(fil("1) Ya está en moles", "n = " + fmt(v.n, 5) + " mol", "pen ancho"));
      else if (d === "N") pasos.push(fil("1) A moles  n = N / N<sub>A</sub>", Q.sci(Q.num(st.v), 3) + " / 6,022·10²³ = " + fmt(v.n, 5) + " mol", "pen ancho"));
      else if (d === "V") pasos.push(cn ? fil("1) A moles  n = V / 22,4", fmt(Q.num(st.v), 3) + " L / 22,4 L/mol = " + fmt(v.n, 5) + " mol", "pen ancho") : fil("1) A moles  n = PV / RT", fmt(st.P, 1) + " · " + fmt(Q.num(st.v), 3) + " / (0,082 · " + fmt(TK, 0) + ") = " + fmt(v.n, 5) + " mol", "pen ancho"));
      else pasos.push(fil("1) A moles  n = c · V", fmt(st.c, 1) + " mol/L · " + fmt(Q.num(st.v) / 1000, 4) + " L = " + fmt(v.n, 5) + " mol", "pen ancho"));
      if (d !== "m") pasos.push(fil("2) Masa  m = n · M", fmt(v.n, 5) + " · " + fmt(v.M, 2) + " = " + fmt(v.m, 4) + " g", "ok"));
      if (d !== "N") pasos.push(fil("2) Partículas  N = n · N<sub>A</sub>", Q.sci(v.N, 3) + " moléculas de " + f, "ok"));
      if (d !== "V" && permitido("V")) pasos.push(fil("2) Volumen de gas", cn ? "V = n · 22,4 = " + fmt(v.V, 3) + " L" : "V = nRT/P = " + fmt(v.V, 3) + " L", "ok"));
      if (d !== "D" && permitido("D")) pasos.push(fil("2) Volumen de disolución  V = n / c", fmt(v.n, 5) + " / " + fmt(st.c, 1) + " = " + fmt(v.D / 1000, 5) + " L = " + fmt(v.D, 2) + " mL", "ok"));
      pasos.push(fil("Masa molar de " + f, fmt(v.M, 3) + " g/mol", ""));
      lectura.innerHTML = pasos.join("");
      pie.innerHTML = "<b>Regla:</b> cada tarjeta se cambia por <b>moles</b> en un solo paso. Una masa se pasa a volumen de gas <b>pasando antes por los moles</b>: nunca hay un atajo «gramos → litros» sin la masa molar. Pulsa otra tarjeta para cambiar el dato y comprobarlo en sentido contrario.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), SUST.map(function (s) { return { k: s.f, t: s.t }; }), st.f, function (k) { var s = SUST.filter(function (x) { return x.f === k; })[0]; st.f = k; iF.value = k; st.dato = "m"; st.v = s.v; pinta(); });
    U.fichas(cuerpo.querySelector("[data-cond]"), [{ k: "cn", t: "Gas en condiciones normales (22,4 L/mol)" }, { k: "lib", t: "Gas a otra presión y temperatura (PV = nRT)" }], st.cond, function (k) { st.cond = k; sT.el.style.display = sP.el.style.display = k === "lib" ? "" : "none"; pinta(); });
    sT.el.style.display = sP.el.style.display = "none";
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta });
    pinta();
  };

  // ============================================================
  // QQ1_MEZCLA: dos sustancias, un dato medido
  // ============================================================
  var MEZ = [
    { id: "carb", t: "CaCO₃ + MgCO₃ al calentar → CO₂", A: "CaCO3", B: "MgCO3", nA: 1, nB: 1, prod: "CO₂", tipo: "gas", rotulo: "V de CO₂ en CN (L)", expA: "CaCO₃ → CaO + CO₂", expB: "MgCO₃ → MgO + CO₂" },
    { id: "met", t: "Zn + Al con HCl → H₂", A: "Zn", B: "Al", nA: 1, nB: 1.5, prod: "H₂", tipo: "gas", rotulo: "V de H₂ en CN (L)", expA: "Zn + 2 HCl → ZnCl₂ + H₂", expB: "2 Al + 6 HCl → 2 AlCl₃ + 3 H₂" },
    { id: "cl", t: "NaCl + KCl con AgNO₃ → AgCl", A: "NaCl", B: "KCl", nA: 1, nB: 1, prod: "AgCl", tipo: "masa", M: "AgCl", rotulo: "m de AgCl (g)", expA: "NaCl + AgNO₃ → AgCl + NaNO₃", expB: "KCl + AgNO₃ → AgCl + KNO₃" }
  ];
  B.w.qq1_mezcla = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Una mezcla de dos sustancias: de lo medido a la composición");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-mm class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, mT: 10, xA: 40 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.fichasModo(cuerpo.querySelector("[data-mm]"), function () { pinta(); });
    U.slider(ctl, { et: "Masa de la mezcla", min: 2, max: 20, step: 0.5, val: st.mT, on: function (v) { st.mT = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " g"; } });
    U.slider(ctl, { et: "Porcentaje (en masa) de la sustancia A", min: 0, max: 100, step: 1, val: st.xA, on: function (v) { st.xA = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " % de A"; } });
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 100, ymin: 0, ymax: 10, w: 600, h: 290, etx: "% de A", ety: "", etiqueta: "Producto obtenido según la composición de la mezcla" });
    function datos() {
      var P = MEZ[st.i], MA = Q.masaMolar(P.A), MB = Q.masaMolar(P.B), f = P.tipo === "gas" ? Q.VM : Q.masaMolar(P.M);
      var cA = P.nA * f / MA, cB = P.nB * f / MB;                       // unidad de producto por gramo de A y por gramo de B
      var a = st.mT * st.xA / 100, b = st.mT - a, y = a * cA + b * cB;
      return { P: P, MA: MA, MB: MB, f: f, cA: cA, cB: cB, a: a, b: b, y: y };
    }
    function pinta() {
      var d = datos(), P = d.P, u = P.tipo === "gas" ? "L" : "g", lo = Math.min(d.cA, d.cB) * st.mT, hi = Math.max(d.cA, d.cB) * st.mT, sp = hi - lo, cortado = sp < 0.5 * hi;
      if (cortado) g.rango(0, 100, Math.max(0, lo - 0.9 * sp), hi + 0.7 * sp); else g.rango(0, 100, 0, hi * 1.12);
      g.limpiar();
      g.segmento(0, st.mT * d.cB, 100, st.mT * d.cA, { clase: "c-pen" }).setAttribute("stroke-width", 3.2);
      g.punto(0, st.mT * d.cB, { clase: "c-faint", r: 4 }); g.punto(100, st.mT * d.cA, { clase: "c-faint", r: 4 });
      g.texto(2, st.mT * d.cB, "solo " + Q.sub(P.B), { dy: -9, clase: "faint" }); g.texto(98, st.mT * d.cA, "solo " + Q.sub(P.A), { dy: -9, ancla: "end", clase: "faint" });
      g.segmento(st.xA, 0, st.xA, d.y, { clase: "c-ok", dash: "3 4" }); g.segmento(0, d.y, st.xA, d.y, { clase: "c-red", dash: "3 4" });
      g.punto(st.xA, d.y, { clase: "c-red", r: 6 });
      g.texto(st.xA, d.y, fmt(d.y, 2) + " " + u, { dx: st.xA > 70 ? -10 : 10, dy: st.xA > 70 ? 18 : -10, ancla: st.xA > 70 ? "end" : "start", clase: "red" });
      var nA = d.a / d.MA, nB = d.b / d.MB;
      lectura.innerHTML =
        fil("Lo que se mide  (" + P.rotulo + ")", fmt(d.y, 3) + " " + u, "red") +
        fil("Masas molares", Q.sub(P.A) + " = " + fmt(d.MA, 2) + " · " + Q.sub(P.B) + " = " + fmt(d.MB, 2) + " g/mol", "") +
        fil("Ecuación 1 (masas)", "x + y = " + fmt(st.mT, 1) + "   (x = g de " + Q.sub(P.A) + ", y = g de " + Q.sub(P.B) + ")", "pen ancho") +
        fil("Ecuación 2 (producto)", fmt(d.cA, 4) + "·x + " + fmt(d.cB, 4) + "·y = " + fmt(d.y, 3) + "   (cada gramo da " + fmt(d.cA, 4) + " o " + fmt(d.cB, 4) + " " + u + ")", "pen ancho") +
        fil("Solución del sistema", "x = " + fmt(d.a, 2) + " g de " + Q.sub(P.A) + " (" + fmt(st.xA, 1) + " %) · y = " + fmt(d.b, 2) + " g de " + Q.sub(P.B) + " (" + fmt(100 - st.xA, 1) + " %)", "ok ancho") +
        fil("Moles de cada una", fmt(nA, 4) + " mol de " + Q.sub(P.A) + " · " + fmt(nB, 4) + " mol de " + Q.sub(P.B), "ancho");
      pie.innerHTML = "<b>Dos incógnitas, dos ecuaciones:</b> una de masas (lo que pesa la mezcla) y otra del producto medido (cada sustancia aporta lo suyo por gramo). Gráficamente, todo lo posible está en la <b>recta</b> que une «solo B» con «solo A»: el valor medido corta la recta justo en la composición real. Si lo medido cae fuera de la recta, los datos son incoherentes." + (cortado ? " (El eje vertical no empieza en cero, para que se vea la pendiente: cuanto más inclinada, más fácil es averiguar la composición.)" : "") + " Reacciones: " + P.expA + " · " + P.expB + ".";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), MEZ.map(function (m, i) { return { k: String(i), t: m.t }; }), "0", function (k) { st.i = +k; pinta(); });
    Q.escuchas.push({ el: cuerpo, f: pinta });
    pinta();
  };

  // ============================================================
  // QQ1_DENSIDAD: densidad de los gases
  // ============================================================
  var GASES = [["H2", "H₂"], ["He", "He"], ["CH4", "CH₄"], ["NH3", "NH₃"], ["N2", "N₂"], ["aire", "aire"], ["O2", "O₂"], ["CO2", "CO₂"], ["Cl2", "Cl₂"]];
  B.w.qq1_densidad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Densidad de los gases: d = P·M / (R·T)");
    cuerpo.innerHTML = '<div data-mm class="chips"></div><div data-cond class="chips"></div><div data-ctl></div><div class="qd-barras"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { T: 25, P: 1, d: "1,80" }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), barras = cuerpo.querySelector(".qd-barras"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    Q.fichasModo(cuerpo.querySelector("[data-mm]"), function () { pinta(); });
    var sT = U.slider(ctl, { et: "Temperatura", min: -50, max: 200, step: 5, val: st.T, on: function (v) { st.T = v; pinta(); }, fmt: function (v) { return fmt(v, 0) + " °C (" + fmt(v + 273, 0) + " K)"; } });
    var sP = U.slider(ctl, { et: "Presión", min: 0.5, max: 4, step: 0.1, val: st.P, on: function (v) { st.P = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " atm"; } });
    var iD = Q.campo(ctl, "Densidad medida (g/L):", st.d, 90); iD.addEventListener("input", function () { st.d = iD.value; pinta(); });
    function masa(f) { return f === "aire" ? 29 : Q.masaMolar(f); }
    function pinta() {
      var TK = st.T + 273, P = st.P, aire = P * 29 / (Q.R * TK), filas = GASES.map(function (g) { var M = masa(g[0]); return { f: g[0], t: g[1], M: M, d: P * M / (Q.R * TK) }; });
      var mx = Math.max.apply(null, filas.map(function (x) { return x.d; }));
      barras.innerHTML = filas.map(function (x) {
        var tag = x.f === "aire" ? "referencia" : x.d < aire ? "flota en el aire" : "cae en el aire";
        return "<div class='qd-fila" + (x.f === "aire" ? " aire" : "") + "'><span>" + x.t + "</span><span><span class='qd-b' style='width:" + Math.max(2, x.d / mx * 100) + "%;background:" + (x.f === "aire" ? "var(--ink-faint)" : x.d < aire ? "var(--pen)" : "var(--red)") + "'></span></span><span>" + fmt(x.d, 3) + " g/L<br><small>M = " + fmt(x.M, 1) + " · " + tag + "</small></span></div>";
      }).join("");
      var d = Q.num(st.d), l = fil("Aire a esas condiciones  (M ≈ 29)", fmt(aire, 3) + " g/L", "ancho");
      l += fil("Densidad de un gas con M = 44", fmt(P * 44 / (Q.R * TK), 3) + " g/L  (d = " + fmt(P, 1) + "·44 / (0,082·" + fmt(TK, 0) + "))", "pen ancho");
      if (!isNaN(d) && d > 0) {
        var M = d * Q.R * TK / P, cerca = filas.slice().sort(function (a, b) { return Math.abs(a.M - M) - Math.abs(b.M - M); })[0];
        l += fil("Masa molar desde la densidad  M = d·R·T / P", fmt(d, 3) + " · 0,082 · " + fmt(TK, 0) + " / " + fmt(P, 1) + " = " + fmt(M, 2) + " g/mol", "ok ancho");
        l += fil("Se parece a", Math.abs(cerca.M - M) / M < 0.05 ? cerca.t + " (M = " + fmt(cerca.M, 1) + ")" : "ninguno de la lista (el más próximo: " + cerca.t + ")", "ancho");
      } else l += fil("Masa molar desde la densidad", "escribe una densidad positiva en g/L", "red ancho");
      lectura.innerHTML = l;
      pie.innerHTML = "<b>d = m/V = n·M/V = P·M/(R·T)</b>: a la misma P y T, la densidad es proporcional a la masa molar (por eso el CO₂ cae y el helio sube). Si subes la temperatura la densidad baja; si subes la presión, aumenta. En condiciones normales, d = M / 22,4. Para hallar M con un dato de densidad, despeja: <b>M = d·R·T / P</b>.";
    }
    U.fichas(cuerpo.querySelector("[data-cond]"), [{ k: "cn", t: "Condiciones normales (0 °C, 1 atm)" }, { k: "amb", t: "25 °C y 1 atm" }, { k: "frio", t: "Aire frío (−20 °C)" }, { k: "cal", t: "Aire caliente (100 °C)" }], "amb", function (k) {
      var v = { cn: [0, 1], amb: [25, 1], frio: [-20, 1], cal: [100, 1] }[k]; sT.set(v[0]); sP.set(v[1]); st.T = v[0]; st.P = v[1]; pinta();
    });
    Q.escuchas.push({ el: cuerpo, f: pinta });
    pinta();
  };

  // ============================================================
  // QQ1_CURVALIM: producto y sobrante según se añade B
  // ============================================================
  var LIM = ["haber", "agua", "neut2", "zinc", "pbi2"];
  B.w.qq1_curvalim = function (host) {
    var cuerpo = B.caja(host, "Simulador", "Añadiendo reactivo B: producto, sobrante y punto estequiométrico");
    cuerpo.innerHTML = '<div data-ctl></div><div data-sl></div><div class="q5-ecu"></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { id: "haber", A: 2, b: 3 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), sl = U.ctl(cuerpo.querySelector("[data-sl]")), ecu = cuerpo.querySelector(".q5-ecu"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sB;
    Q.selector(ctl, "Reacción:", LIM.map(function (id) { return { k: id, t: Q.reaccion(id).t }; }), st.id, function (k) { st.id = k; st.b = Math.min(st.b, 10); pinta(); });
    U.slider(sl, { et: "Cantidad fija de A", min: 0.5, max: 4, step: 0.5, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " mol"; } });
    sB = U.slider(sl, { et: "B añadido", min: 0, max: 12, step: 0.1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " mol"; } });
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 12, ymin: 0, ymax: 6, w: 600, h: 300, etx: "B añadido (mol)", ety: "mol", etiqueta: "Producto, A y B que quedan según la cantidad de B añadida" });
    function pinta() {
      var R = Q.reaccion(st.id), a = R.r[0], bR = R.r[1], p = R.p[0], A = st.A, b = st.b;
      var xs = A * bR.c / a.c, xmax = Math.max(xs * 2, 4), pmax = A * p.c / a.c;            // xs = moles de B en la proporción exacta
      sB.input.max = xmax; if (b > xmax) { b = xmax; sB.set(b); st.b = b; }
      var prod = function (x) { return Math.min(A / a.c, x / bR.c) * p.c; }, restoA = function (x) { return Math.max(0, A - x * a.c / bR.c); }, restoB = function (x) { return Math.max(0, x - A * bR.c / a.c); };
      ecu.innerHTML = "<div class='q5-ecuacion'>" + R.todas.map(function (x, k) { return (k === R.r.length ? "<span class='q5-fl'>⟶</span>" : k ? "<span class='q5-mas'>+</span>" : "") + "<span class='q5-esp q5-solo'><b>" + (x.c === 1 ? "" : x.c) + "</b> " + Q.sub(x.f) + "</span>"; }).join("") + "</div>";
      var top = Math.max(A, xmax - xs, pmax) * 1.12;
      g.rango(0, xmax, 0, top); g.limpiar();
      g.vertical(xs, { clase: "c-faint", dash: "5 5" }); g.texto(xs, top * 0.95, "proporción exacta", { dx: 6, clase: "faint" });
      g.curva(prod, { clase: "c-ok", n: 240 }).setAttribute("stroke-width", 3.2); g.curva(restoA, { clase: "c-pen", n: 240 }); g.curva(restoB, { clase: "c-red", n: 240 });
      g.texto(xmax * 0.99, pmax, Q.sub(p.f) + " formado", { dy: -8, ancla: "end", clase: "ok" });
      g.texto(0.01 * xmax, A, Q.sub(a.f) + " que queda", { dx: 4, dy: -8, clase: "pen" });
      g.texto(xmax * 0.99, restoB(xmax), Q.sub(bR.f) + " que sobra", { dy: -8, ancla: "end", clase: "red" });
      g.segmento(b, 0, b, Math.max(prod(b), restoA(b), restoB(b)), { clase: "c-ink", dash: "2 4" });
      g.punto(b, prod(b), { clase: "c-ok", r: 6 }); g.punto(b, restoA(b), { clase: "c-pen", r: 5 }); g.punto(b, restoB(b), { clase: "c-red", r: 5 });
      var lim = Math.abs(b - xs) < 1e-9 ? "ninguno: proporción exacta" : b < xs ? Q.sub(bR.f) + " (B se agota)" : Q.sub(a.f) + " (A se agota)";
      lectura.innerHTML = fil("Reactivo limitante ahora", lim, "red ancho") + fil("Proporción exacta de B", "B = " + fmt(A, 1) + " · " + bR.c + "/" + a.c + " = " + fmt(xs, 2) + " mol", "pen") +
        fil("Se forma " + Q.sub(p.f), fmt(prod(b), 3) + " mol", "ok") + fil("Queda sin reaccionar de " + Q.sub(a.f), fmt(restoA(b), 3) + " mol", "") + fil("Queda sin reaccionar de " + Q.sub(bR.f), fmt(restoB(b), 3) + " mol", "") +
        fil("Producto máximo posible", fmt(pmax, 3) + " mol (cuando A se agota)", "ancho");
      pie.innerHTML = "A la <b>izquierda</b> de la línea discontinua falta B: B se gasta entero, A sobra y el producto <b>crece</b> con B. A la <b>derecha</b> sobra B: el producto ya no sube (<b>meseta</b>), lo manda A. El punto de cambio es la proporción de la ecuación. Esta misma gráfica es la de una <b>valoración</b>: el punto de equivalencia es la proporción exacta.";
    }
    Q.escuchas.push({ el: cuerpo, f: pinta });
    pinta();
  };
})(window);
