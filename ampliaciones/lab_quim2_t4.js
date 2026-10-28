/* ============================================================
   Bachi para Firu · Química II, tema 4: Enlace químico
   Reutiliza los simuladores de Física y Química I (q2_lewis, q2_vsepr, q2_polaridad, q2_hibrid, q2_red, q2_bornhaber,
   q2_fuerzas, q2_propiedades, q2_metalico, q2_deltaen) y añade tres:
   q4_angulos (ángulo de enlace y pares libres) · q4_morse (curva de energía de un enlace) · q4_ficha (ficha EvAU de una molécula)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  function fil(r, v, c) { return U.lec(r, v, c); }

  // ============================================================
  // Q4_ANGULOS: el ángulo H–X–H según los pares libres y el tamaño del átomo central
  // ============================================================
  var ANG = {
    p2: { t: "Periodo 2: C, N, O", ideal: 109.5, nota: "Cuatro pares de electrones en los tres casos (tetraedro de pares), pero cada par libre ocupa más espacio que un par de enlace y «aprieta» a los enlaces: el ángulo baja unos 2–3° por cada par libre.",
      pts: [["CH₄", 109.5, 0], ["NH₃", 107, 1], ["H₂O", 104.5, 2]] },
    p3: { t: "Periodo 3: Si, P, S", ideal: 109.5, nota: "Con átomo central del periodo 3 el efecto es mucho mayor: PH₃ y H₂S casi no se desvían de 90°. El átomo es mayor, los enlaces más largos y los pares de enlace están lejos entre sí: la repulsión entre ellos es débil y el par libre casi no se hibrida.",
      pts: [["SiH₄", 109.5, 0], ["PH₃", 93.3, 1], ["H₂S", 92.1, 2]] },
    g15: { t: "Grupo 15: NH₃ … SbH₃", ideal: 109.5, nota: "Mismo tipo AX₃E (pirámide trigonal) en los cuatro: al bajar en el grupo el átomo central crece y el ángulo se acerca a 90°.",
      pts: [["NH₃", 107, 1], ["PH₃", 93.3, 1], ["AsH₃", 92.1, 1], ["SbH₃", 91.7, 1]] },
    sust: { t: "Efecto del sustituyente", ideal: 109.5, nota: "El flúor, muy electronegativo, atrae el par de enlace hacia sí y lo aleja del N: los pares de enlace ocupan menos espacio alrededor del N, el par libre gana terreno y el ángulo se cierra (NF₃ 102°).",
      pts: [["NH₃", 107, 1], ["NF₃", 102.3, 1], ["H₂O", 104.5, 2], ["OF₂", 103.1, 2]] }
  };
  B.w.q4_angulos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ángulo de enlace: ¿cuánto «aprietan» los pares libres?");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "p2", ver: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Mostrar", min: 0, max: 1, step: 1, val: 1, on: function (v) { st.ver = v; pinta(); }, fmt: function (v) { return v ? "con referencias (109,5° y 90°)" : "solo los ángulos"; } });
    function pinta() {
      var S = ANG[st.k], n = S.pts.length, cl = ["c-ok", "c-pen", "c-red", "c-ink"];
      g.rango(0, n + 1, 84, 116); g.limpiar();
      if (st.ver) {
        g.segmento(0.3, 109.5, n + 0.7, 109.5, { clase: "c-faint", dash: "5 4" }); g.texto(n + 0.7, 109.5, "109,5° ideal", { ancla: "end", dy: -5, clase: "faint" });
        g.segmento(0.3, 90, n + 0.7, 90, { clase: "c-faint", dash: "5 4" }); g.texto(n + 0.7, 90, "90°", { ancla: "end", dy: -5, clase: "faint" });
      }
      S.pts.forEach(function (p, i) {
        var s = g.segmento(i + 1, 84, i + 1, p[1], { clase: cl[p[2] % 4] }); s.setAttribute("stroke-width", 3);
        g.punto(i + 1, p[1], { r: 7, clase: cl[p[2] % 4] });
        g.texto(i + 1, p[1], fmt(p[1], p[1] % 1 ? 1 : 0) + "°", { dy: -12, ancla: "middle" });
        g.texto(i + 1, 84, p[0], { dy: -6, ancla: "middle", clase: "faint" });
      });
      var rows = S.pts.map(function (p) { return p[0] + ": " + fmt(p[1], p[1] % 1 ? 1 : 0) + "° · " + p[2] + (p[2] === 1 ? " par libre" : " pares libres") + " · desviación " + fmt(p[1] - 109.5, 1) + "°"; });
      lectura.innerHTML = fil("Serie", S.t, "pen ancho") + fil("Ángulos y pares libres", rows.join("<br>"), "ancho") + fil("Explicación", S.nota, "ancho");
      pie.innerHTML = "Orden de repulsión: <b>par libre–par libre &gt; par libre–par de enlace &gt; par de enlace–par de enlace</b>. Por eso más pares libres significa ángulos de enlace más cerrados. Ángulos experimentales (en °), de tablas; los pares libres están en azul/rojo según su número (0 verde, 1 azul, 2 rojo).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 5, ymin: 84, ymax: 116, w: 620, h: 290, sinX: true, etx: "", ety: "ángulo (°)", etiqueta: "Ángulos de enlace" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(ANG).map(function (k) { return { k: k, t: ANG[k].t }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q4_MORSE: energía potencial de un enlace frente a la distancia internuclear
  //   V(r) = D·[1 − e^(−a(r−r₀))]² − D  (curva de Morse; r₀ y D son datos reales, a es ilustrativo)
  // ============================================================
  var AM = 0.02;   // pm⁻¹
  var BON = {
    c: { t: "C–C · C=C · C≡C", b: [["C–C", 154, 347], ["C=C", 134, 614], ["C≡C", 120, 839]], nota: "A más enlaces compartidos, el enlace es más corto y más fuerte: el orden de enlace sube de 1 a 3." },
    n: { t: "N–N · N=N · N≡N", b: [["N–N", 145, 163], ["N=N", 125, 418], ["N≡N", 110, 945]], nota: "El N₂ es tan poco reactivo porque para romper su enlace triple hacen falta 945 kJ/mol." },
    x: { t: "Halógenos X–X", b: [["F–F", 142, 159], ["Cl–Cl", 199, 243], ["Br–Br", 228, 193], ["I–I", 267, 151]], nota: "Al bajar en el grupo el enlace se alarga y se debilita (Cl–Cl, Br–Br, I–I). El F–F es una excepción: tan corto que los pares libres de los dos átomos se repelen." },
    h: { t: "Enlaces con H", b: [["H–H", 74, 436], ["C–H", 109, 413], ["O–H", 96, 463], ["H–F", 92, 567]], nota: "Los enlaces más fuertes y cortos son los de átomos pequeños y electronegativos (H–F)." }
  };
  B.w.q4_morse = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Curva de energía de un enlace: longitud y energía de enlace");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { k: "c", r: 154 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sl;
    function V(b, r) { var x = 1 - Math.exp(-AM * (r - b[1])); return b[2] * x * x - b[2]; }
    sl = U.slider(ctl, { et: "Distancia r entre núcleos", min: 60, max: 320, step: 1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return v + " pm"; } });
    function pinta() {
      var S = BON[st.k], cl = ["c-pen", "c-ok", "c-red", "c-ink"];
      g.rango(50, 330, -1000, 300); g.limpiar();
      g.segmento(50, 0, 330, 0, { clase: "c-faint", dash: "4 4" }); g.texto(330, 0, "átomos separados", { ancla: "end", dy: -5, clase: "faint" });
      S.b.forEach(function (b, i) {
        g.curva(function (r) { return V(b, r); }, { clase: cl[i], x0: 62, x1: 328 });
        g.punto(b[1], -b[2], { r: 5, clase: cl[i] });
        g.punto(st.r, V(b, st.r), { r: 6, clase: cl[i] });
      });
      lectura.innerHTML = S.b.map(function (b, i) {
        var e = V(b, st.r);
        return fil(b[0], "r₀ = " + b[1] + " pm · D = " + b[2] + " kJ/mol · E(r) = " + fmt(e, 0) + " kJ/mol", ["pen", "ok", "red", "ancho"][i] + " ancho");
      }).join("");
      pie.innerHTML = S.nota + " <b>Mínimo de la curva</b> = longitud de enlace r₀ (donde la atracción y la repulsión se equilibran); <b>profundidad</b> = energía de enlace D (lo que cuesta separar los átomos). A r &lt; r₀ domina la repulsión entre núcleos (la energía sube muy rápido); a r &gt; r₀ los átomos se van soltando. Forma de la curva ilustrativa (Morse); r₀ y D son datos tabulados.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 50, xmax: 330, ymin: -1000, ymax: 300, w: 620, h: 310, etx: "r (pm)", ety: "E (kJ/mol)", etiqueta: "Energía de enlace" });
    U.fichas(cuerpo.querySelector("[data-sel]"), Object.keys(BON).map(function (k) { return { k: k, t: BON[k].t }; }), st.k, function (k) { st.k = k; st.r = BON[k].b[0][1]; sl.set(st.r); pinta(); });
    pinta();
  };

  // ============================================================
  // Q4_FICHA: la «ficha» que se pide en la EvAU: notación AXnEm → geometría → hibridación → polaridad
  // ============================================================
  var FICHA = [
    { f: "H₂O", n: "agua", c: "O", ve: "6 + 2·1 = 8", ax: "AX₂E₂", g: "angular", h: "sp³", p: true, por: "Dos dipolos O–H que apuntan hacia el O y forman 104,5°: su suma no es cero. Molécula polar (μ = 1,85 D)." },
    { f: "NH₃", n: "amoníaco", c: "N", ve: "5 + 3·1 = 8", ax: "AX₃E", g: "pirámide trigonal", h: "sp³", p: true, por: "Los tres dipolos N–H y el par libre empujan la carga hacia el vértice del N: polar (μ = 1,47 D)." },
    { f: "CH₄", n: "metano", c: "C", ve: "4 + 4·1 = 8", ax: "AX₄", g: "tetraédrica", h: "sp³", p: false, por: "Cuatro enlaces C–H casi apolares (Δχ = 0,35) y simetría tetraédrica: la suma de dipolos es cero." },
    { f: "CO₂", n: "dióxido de carbono", c: "C", ve: "4 + 2·6 = 16", ax: "AX₂", g: "lineal", h: "sp", p: false, por: "Dos enlaces C=O polares, pero a 180°: los dipolos se anulan. Apolar." },
    { f: "BF₃", n: "trifluoruro de boro", c: "B", ve: "3 + 3·7 = 24", ax: "AX₃", g: "trigonal plana", h: "sp²", p: false, por: "Tres enlaces B–F muy polares a 120°: simetría trigonal, la suma es cero. Apolar (y el B queda con 6 e⁻)." },
    { f: "SO₂", n: "dióxido de azufre", c: "S", ve: "6 + 2·6 = 18", ax: "AX₂E", g: "angular", h: "sp²", p: true, por: "El par libre del S curva la molécula (≈ 119°): los dipolos S=O no se anulan. Polar (μ = 1,63 D)." },
    { f: "SO₃", n: "trióxido de azufre", c: "S", ve: "6 + 3·6 = 24", ax: "AX₃", g: "trigonal plana", h: "sp²", p: false, por: "Sin pares libres en el S, tres enlaces equivalentes a 120°: apolar." },
    { f: "PCl₃", n: "tricloruro de fósforo", c: "P", ve: "5 + 3·7 = 26", ax: "AX₃E", g: "pirámide trigonal", h: "sp³", p: true, por: "Pirámide: dipolos P–Cl y par libre no se compensan. Polar." },
    { f: "CCl₄", n: "tetracloruro de carbono", c: "C", ve: "4 + 4·7 = 32", ax: "AX₄", g: "tetraédrica", h: "sp³", p: false, por: "Cuatro enlaces C–Cl polares, pero iguales y en tetraedro: se anulan. Apolar." },
    { f: "CHCl₃", n: "cloroformo", c: "C", ve: "4 + 1 + 3·7 = 26", ax: "AX₄", g: "tetraédrica", h: "sp³", p: true, por: "Misma forma que el CCl₄, pero con un H en lugar de un Cl: los cuatro enlaces ya no son iguales, no se anulan. Polar." },
    { f: "BeCl₂", n: "cloruro de berilio", c: "Be", ve: "2 + 2·7 = 16", ax: "AX₂", g: "lineal", h: "sp", p: false, por: "Dos dipolos Be–Cl opuestos en línea recta: se cancelan. Apolar (el Be queda con 4 e⁻)." },
    { f: "CH₂O", n: "metanal", c: "C", ve: "4 + 2·1 + 6 = 12", ax: "AX₃", g: "trigonal plana", h: "sp²", p: true, por: "Plana, pero el enlace C=O es muy polar y los C–H casi no: no hay simetría que anule. Polar (μ = 2,3 D)." },
    { f: "HCN", n: "cianuro de hidrógeno", c: "C", ve: "1 + 4 + 5 = 10", ax: "AX₂", g: "lineal", h: "sp", p: true, por: "Lineal, pero los dos extremos son distintos (H y N): el dipolo C≡N domina. Polar (μ = 2,98 D)." },
    { f: "H₂S", n: "sulfuro de hidrógeno", c: "S", ve: "6 + 2·1 = 8", ax: "AX₂E₂", g: "angular", h: "sp³", p: true, por: "Angular como el agua: los dipolos no se anulan (μ = 0,97 D). Polar, aunque menos que el agua." }
  ];
  var GEOMS = ["lineal", "trigonal plana", "angular", "tetraédrica", "pirámide trigonal"];
  var AXS = ["AX₂", "AX₃", "AX₂E", "AX₄", "AX₃E", "AX₂E₂"];
  var HIBS = ["sp", "sp²", "sp³"];
  B.w.q4_ficha = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ficha EvAU de una molécula: pares, geometría, hibridación y polaridad");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div class="q4-ficha"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, r: {} }, caja = cuerpo.querySelector(".q4-ficha"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var PASOS = [
      { k: "ax", t: "1 · Notación del átomo central (enlaces y pares libres)", ops: AXS },
      { k: "g", t: "2 · Geometría molecular", ops: GEOMS },
      { k: "h", t: "3 · Hibridación del átomo central", ops: HIBS },
      { k: "p", t: "4 · ¿La molécula es polar?", ops: ["polar", "apolar"] }
    ];
    function sol(m, k) { return k === "p" ? (m.p ? "polar" : "apolar") : m[k]; }
    function pinta() {
      var m = FICHA[st.i], h = "<p class='q4-enun'><b>" + m.f + "</b> (" + m.n + "). Átomo central: <b>" + m.c + "</b>. Electrones de valencia: " + m.ve + ". Responde por orden; verás al instante si aciertas.</p>", hecho = 0;
      PASOS.forEach(function (s, j) {
        var r = st.r[s.k], prev = j === 0 || st.r[PASOS[j - 1].k] === sol(m, PASOS[j - 1].k);
        h += "<div class='q4-paso' style='" + (prev ? "" : "opacity:.4") + "'><b>" + s.t + "</b><div class='chips' data-p='" + s.k + "'>" + s.ops.map(function (o) {
          var cls = "chip-btn" + (r === o && o === sol(m, s.k) ? " on" : ""), sty = r === o && o !== sol(m, s.k) ? " style='border-color:var(--red);color:var(--red);background:var(--red-soft)'" : "";
          return "<button type='button' class='" + cls + "'" + sty + " data-o='" + o + "'" + (prev ? "" : " disabled") + ">" + o + "</button>";
        }).join("") + "</div>" + (r ? "<small style='color:var(--" + (r === sol(m, s.k) ? "ok" : "red") + ")'>" + (r === sol(m, s.k) ? "✓ Correcto" : "✗ No: piensa de nuevo (¿cuántos pares hay en total alrededor del " + m.c + "?)") + "</small>" : "") + "</div>";
        if (r === sol(m, s.k)) hecho++;
      });
      caja.innerHTML = h;
      Array.prototype.forEach.call(caja.querySelectorAll("[data-p]"), function (c) {
        c.onclick = function (e) { var b = e.target.closest("[data-o]"); if (!b || b.disabled) return; st.r[c.getAttribute("data-p")] = b.getAttribute("data-o"); pinta(); };
      });
      lectura.innerHTML = hecho === 4 ? fil("Resumen de " + m.f, m.ax + " → " + m.g + " → " + m.h + " → " + (m.p ? "polar" : "apolar"), "ok ancho") + fil("Por qué", m.por, "ancho") : fil("Progreso", hecho + " de 4 pasos correctos", "pen");
      pie.innerHTML = "Orden de trabajo: electrones de valencia → estructura de Lewis → pares (enlaces y libres; un enlace doble o triple cuenta como <b>un solo</b> par a efectos de repulsión) → geometría → hibridación (nº de pares: 2 sp · 3 sp² · 4 sp³) → polaridad (¿se anulan los dipolos?).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), FICHA.map(function (m, i) { return { k: String(i), t: m.f }; }), "0", function (k) { st.i = +k; st.r = {}; pinta(); });
    pinta();
  };
  B.lab = B.lab || {};
  B.lab.q4 = { ANG: ANG, BON: BON, FICHA: FICHA, AM: AM };
})(window);
