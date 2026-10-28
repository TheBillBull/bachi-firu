/* ============================================================
   Bachi para Firu · Química II, tema 9: Química de los compuestos del carbono
   Seis simuladores (el resto del tema reutiliza los de FyQ I: q7_constructor, q7_nombrar, q7_reto, q7_quiral, q7_isomeria,
   q7_insaturacion, q7_serie y q4_empirica):
   q2t9_prioridad (¿qué grupo da el sufijo?) · q2t9_nombre (nombra: éster, amida, nitrilo, éter, halogenados…)
   q2t9_hibrida (hibridación de cada carbono) · q2t9_cistrans (¿existe isomería geométrica?)
   q2t9_espejo (carbono quiral: imagen especular, giro y superposición) · q2t9_fuerzas (fuerzas intermoleculares y punto de ebullición)
   Se apoyan en el motor B.lab.org de FyQ I (grafo SMILES y dibujo).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var Q = B.lab.q9 = {};

  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mezcla(a) { var b = a.slice(), i, j, t; for (i = b.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function O() { return B.lab.org; }

  function estilo() {
    if (document.getElementById("q9-css")) return;
    var s = document.createElement("style"); s.id = "q9-css";
    s.textContent =
      ".q9-esc { display: grid; gap: 4px; margin: 8px 0 2px; }" +
      ".q9-esc div { display: grid; grid-template-columns: 26px 1fr; gap: 8px; align-items: center; padding: 3px 8px; border: 1.5px solid var(--line); border-radius: 8px; font: 500 13.5px var(--body); color: var(--ink-soft); background: var(--sheet-2); }" +
      ".q9-esc div b { font: 700 13px var(--math); color: var(--ink-faint); }" +
      ".q9-esc div.hay { color: var(--ink); border-color: var(--pen); }" +
      ".q9-esc div.hay b { color: var(--pen); }" +
      ".q9-esc div.mand { border-color: var(--ok); background: color-mix(in srgb, var(--ok) 14%, var(--sheet)); color: var(--ink); }" +
      ".q9-esc div.mand b { color: var(--ok); }" +
      ".q9-sel { display: inline-flex; align-items: center; gap: 5px; font: 600 13px var(--body); color: var(--ink-soft); }" +
      ".q9-sel select { font: 500 15px var(--body); color: var(--ink); background: var(--sheet); border: 1.5px solid var(--line); border-radius: 8px; padding: 4px 6px; }" +
      ".q9-sels { display: flex; flex-wrap: wrap; gap: 8px 14px; margin: 6px 0; }" +
      ".q9-barras { margin: 8px 0 0; display: grid; gap: 5px; }" +
      ".q9-fila { display: grid; grid-template-columns: minmax(96px, 150px) 1fr 62px; align-items: center; gap: 8px; padding: 2px 4px; border-radius: 8px; border: 1.5px solid transparent; font: 600 13.5px var(--body); cursor: pointer; background: none; color: var(--ink); text-align: left; }" +
      ".q9-fila.sel { border-color: var(--pen); background: var(--sheet-2); }" +
      ".q9-fila .q9-pista { display: block; height: 18px; border-radius: 5px; min-width: 3px; }" +
      ".q9-fila .q9-t { text-align: right; font-family: var(--math); }" +
      ".q9-L { background: var(--ink-faint); } .q9-D { background: var(--ok); } .q9-H { background: var(--red); }" +
      ".q9-leyenda { display: flex; flex-wrap: wrap; gap: 4px 14px; font: 500 12.5px var(--body); color: var(--ink-soft); margin: 6px 0 0; }" +
      ".q9-leyenda i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }" +
      "@media (max-width: 560px) { .q9-fila { grid-template-columns: 88px 1fr 54px; font-size: 12.5px; } }";
    document.head.appendChild(s);
  }

  // ------------------------------------------------------------------------------------------------
  // Banco de moléculas (SMILES simplificado de B.lab.org). grupos: el primero es el principal (el que da el sufijo).
  // ------------------------------------------------------------------------------------------------
  var ESCALA = ["ácido carboxílico", "éster", "amida", "nitrilo", "aldehído", "cetona", "alcohol", "amina"];
  var SUF = { "ácido carboxílico": "ácido …oico", "éster": "…oato de …ilo", "amida": "…amida", "nitrilo": "…nitrilo", "aldehído": "…al", "cetona": "…ona", "alcohol": "…ol", "amina": "…amina" };
  Q.ESCALA = ESCALA;
  Q.MOLS = [
    { s: "CC(O)CC(=O)O", n: "ácido 3-hidroxibutanoico", g: ["ácido carboxílico", "alcohol"], d: ["ácido 2-hidroxibutanoico", "3-carboxibutan-2-ol", "ácido 1-hidroxibutan-3-oico"] },
    { s: "CC(=O)CC(=O)O", n: "ácido 3-oxobutanoico", g: ["ácido carboxílico", "cetona"], d: ["ácido 2-oxobutanoico", "3-carboxibutan-2-ona", "ácido butan-3-ona-oico"] },
    { s: "OCCC=O", n: "3-hidroxipropanal", g: ["aldehído", "alcohol"], d: ["1-hidroxipropan-3-al", "3-oxopropan-1-ol", "3-hidroxipropanona"] },
    { s: "CC(=O)CCO", n: "4-hidroxibutan-2-ona", g: ["cetona", "alcohol"], d: ["1-hidroxibutan-3-ona", "3-oxobutan-1-ol", "4-hidroxibutanal"] },
    { s: "CC(N)CO", n: "2-aminopropan-1-ol", g: ["alcohol", "amina"], d: ["1-aminopropan-2-ol", "1-hidroxipropan-2-amina", "3-aminopropan-2-ol"] },
    { s: "NCCC(=O)O", n: "ácido 3-aminopropanoico", g: ["ácido carboxílico", "amina"], d: ["ácido 2-aminopropanoico", "ácido 1-aminopropan-3-oico", "3-aminopropan-1-ol"] },
    { s: "N#CCCC(=O)O", n: "ácido 3-cianopropanoico", g: ["ácido carboxílico", "nitrilo"], d: ["ácido 4-cianobutanoico", "3-carboxipropanonitrilo", "ácido 2-cianopropanoico"] },
    { s: "C=CCO", n: "prop-2-en-1-ol", g: ["alcohol", "doble enlace"], d: ["prop-1-en-3-ol", "3-hidroxipropeno", "prop-2-en-1-al"] },
    { s: "C=CC(=O)C", n: "but-3-en-2-ona", g: ["cetona", "doble enlace"], d: ["but-1-en-3-ona", "3-oxobut-1-eno", "but-3-en-2-ol"] },
    { s: "OCC(=O)C", n: "1-hidroxipropan-2-ona", g: ["cetona", "alcohol"], d: ["3-hidroxipropan-2-ona", "2-oxopropan-1-ol", "1-hidroxipropanal"] },
    { s: "CC(O)C(=O)C", n: "3-hidroxibutan-2-ona", g: ["cetona", "alcohol"], d: ["2-hidroxibutan-3-ona", "2-oxobutan-3-ol", "3-hidroxibutanal"] },
    { s: "CC(N)C(=O)O", n: "ácido 2-aminopropanoico", g: ["ácido carboxílico", "amina"], d: ["ácido 3-aminopropanoico", "ácido 1-aminopropanoico", "2-aminopropan-1-ol"] },
    { s: "CC(C)C(O)CC=O", n: "3-hidroxi-4-metilpentanal", g: ["aldehído", "alcohol"], d: ["3-hidroxi-2-metilpentanal", "4-metil-3-hidroxipentanal", "4-hidroxi-3-metilpentanal"] },
    { s: "CC(=O)OCC", n: "etanoato de etilo", g: ["éster"], d: ["propanoato de metilo", "etanoato de metilo", "ácido butanoico"] },
    { s: "CCC(=O)OC", n: "propanoato de metilo", g: ["éster"], d: ["metanoato de propilo", "etanoato de etilo", "butanoato de metilo"] },
    { s: "CC(=O)OC", n: "etanoato de metilo", g: ["éster"], d: ["metanoato de etilo", "etanoato de etilo", "propanoato de metilo"] },
    { s: "CCCC(=O)OCC", n: "butanoato de etilo", g: ["éster"], d: ["etanoato de butilo", "propanoato de etilo", "butanoato de metilo"] },
    { s: "CC(=O)N", n: "etanamida", g: ["amida"], d: ["etanamina", "metanamida", "etanonitrilo"] },
    { s: "CCC(=O)N", n: "propanamida", g: ["amida"], d: ["propan-1-amina", "etanamida", "propanonitrilo"] },
    { s: "CC(C)C(N)=O", n: "2-metilpropanamida", g: ["amida"], d: ["3-metilpropanamida", "butanamida", "N-metilpropanamida"] },
    { s: "CC#N", n: "etanonitrilo", g: ["nitrilo"], d: ["metanonitrilo", "etanamida", "etanamina"] },
    { s: "CC(C)C#N", n: "2-metilpropanonitrilo", g: ["nitrilo"], d: ["3-metilpropanonitrilo", "butanonitrilo", "2-cianopropano"] },
    { s: "CCOCC", n: "etoxietano", g: ["éter"], d: ["metoxipropano", "etoxipropano", "butan-1-ol"] },
    { s: "COCC", n: "metoxietano", g: ["éter"], d: ["etoximetano", "metoxipropano", "etanol"] },
    { s: "CC(Cl)C", n: "2-cloropropano", g: ["derivado halogenado"], d: ["1-cloropropano", "2-clorobutano", "propan-2-cloro"] },
    { s: "CCC(C)Br", n: "2-bromobutano", g: ["derivado halogenado"], d: ["3-bromobutano", "1-bromobutano", "2-bromo-2-metilpropano"] },
    { s: "C=CCCl", n: "3-cloroprop-1-eno", g: ["derivado halogenado", "doble enlace"], d: ["1-cloroprop-2-eno", "2-cloroprop-1-eno", "1-cloropropano"] },
    { s: "OC(=O)CC(=O)O", n: "ácido propanodioico", g: ["ácido carboxílico"], d: ["ácido etanodioico", "ácido butanodioico", "ácido propan-1,3-dioico"] },
    { s: "CC(O)CO", n: "propano-1,2-diol", g: ["alcohol"], d: ["propan-1,2-diol", "propano-1,2-ol", "propano-2,3-diol"] },
    { s: "CCNC", n: "N-metiletanamina", g: ["amina"], d: ["N-etilmetanamina", "N-metilpropanamina", "etanamida"] }
  ];

  function famDe(s) { return s; }
  // todas las moléculas con al menos dos funciones distintas (para el juego de prioridad)
  function poli() { return Q.MOLS.filter(function (m) { return m.g.length >= 2 && m.g[0] !== m.g[1]; }); }

  function dibujaMol(cuerpo, spec, etq) {
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 210, limpio: true, etiqueta: etq || "Molécula" });
    return g;
  }

  // ================================================================
  //  q2t9_prioridad: elige el grupo que manda
  // ================================================================
  B.w.q2t9_prioridad = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Entrénate", "¿Qué grupo funcional da el sufijo?");
    cuerpo.innerHTML = '<div class="w-plot"></div><div class="q7-cond lectura anch"></div><p class="w-pie q9-pregunta"></p><div class="q7-ops" data-ops></div><p class="q7-res" aria-live="polite"></p><div class="q9-esc" data-esc></div><div class="ctl q7-acc"></div>';
    var g = dibujaMol(cuerpo), ops = cuerpo.querySelector("[data-ops]"), res = cuerpo.querySelector(".q7-res"), cond = cuerpo.querySelector(".q7-cond"), esc = cuerpo.querySelector("[data-esc]"), preg = cuerpo.querySelector(".q9-pregunta");
    var st = { m: null, hecho: false, ok: 0, total: 0 }, banco = poli();
    function pintaEscala(marca, mand) {
      esc.innerHTML = ESCALA.map(function (f, i) { return '<div class="' + (f === mand ? "mand" : marca.indexOf(f) >= 0 ? "hay" : "") + '"><b>' + (i + 1) + "</b><span>" + f + (f === mand ? " ← manda: sufijo " + SUF[f] : marca.indexOf(f) >= 0 ? " (prefijo)" : "") + "</span></div>"; }).join("");
    }
    function nuevo() {
      var x = azar(banco), G = O().grafoDeSmiles(x.s);
      st.m = x; st.hecho = false; res.className = "q7-res"; res.textContent = "";
      O().dibujaGrafo(g, G, { min: 1.7 });
      cond.innerHTML = U.lec("Fórmula molecular", B.lab.org.formulaMolecular(O().cuentaGrafo(G)), "pen");
      preg.textContent = "Esta molécula tiene más de un grupo. Toca el que, según la escala de prioridad, se nombra como sufijo.";
      var lista = mezcla(x.g.slice());
      ops.innerHTML = lista.map(function (t) { return '<button type="button" class="chip-btn q7-op" data-t="' + t + '">' + t + "</button>"; }).join("");
      pintaEscala([], "");
    }
    ops.addEventListener("click", function (e) {
      var b = e.target.closest(".q7-op"); if (!b || st.hecho) return;
      var ok = b.getAttribute("data-t") === st.m.g[0]; st.total++; if (ok) st.ok++; st.hecho = true;
      b.classList.add(ok ? "bien" : "mal");
      Array.prototype.forEach.call(ops.querySelectorAll(".q7-op"), function (x) { if (x.getAttribute("data-t") === st.m.g[0]) x.classList.add("bien"); });
      res.className = "q7-res " + (ok ? "ok" : "mal");
      res.innerHTML = (ok ? "<b>✓ Correcto.</b> " : "<b>✗ No.</b> ") + "Es <b>" + st.m.n + "</b>: manda el grupo «" + st.m.g[0] + "» y los demás pasan a prefijo. Llevas " + st.ok + " de " + st.total + ".";
      pintaEscala(st.m.g, st.m.g[0]);
    });
    U.boton(cuerpo.querySelector(".q7-acc"), "Siguiente molécula", nuevo, "btn-comprobar");
    nuevo();
  };

  // ================================================================
  //  q2t9_nombre: nombra moléculas con todas las funciones
  // ================================================================
  B.w.q2t9_nombre = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Entrénate", "Nombra la molécula");
    cuerpo.innerHTML = '<div class="w-plot"></div><div class="q7-cond lectura anch"></div><div class="q7-ops" data-ops></div><p class="q7-res" aria-live="polite"></p><div class="ctl q7-acc"></div><p class="w-pie">Pasos: 1) localiza el grupo de mayor prioridad; 2) cadena más larga que lo contiene; 3) numera para dar al grupo el localizador más bajo; 4) prefijos por orden alfabético.</p>';
    var g = dibujaMol(cuerpo), ops = cuerpo.querySelector("[data-ops]"), res = cuerpo.querySelector(".q7-res"), cond = cuerpo.querySelector(".q7-cond");
    var st = { m: null, hecho: false, ok: 0, total: 0 };
    function nuevo() {
      var x = azar(Q.MOLS), G = O().grafoDeSmiles(x.s);
      st.m = x; st.hecho = false; res.className = "q7-res"; res.textContent = "";
      O().dibujaGrafo(g, G, { min: 1.7 });
      cond.innerHTML = U.lec("Fórmula molecular", O().formulaMolecular(O().cuentaGrafo(G)), "pen") + U.lec("Familia", x.g[0] === "doble enlace" ? "alqueno" : x.g[0], "");
      var lista = mezcla(x.d.slice(0, 3).concat([x.n]));
      ops.innerHTML = lista.map(function (t) { return '<button type="button" class="chip-btn q7-op" data-t="' + t + '">' + t + "</button>"; }).join("");
    }
    ops.addEventListener("click", function (e) {
      var b = e.target.closest(".q7-op"); if (!b || st.hecho) return;
      var ok = b.getAttribute("data-t") === st.m.n; st.total++; if (ok) st.ok++; st.hecho = true;
      b.classList.add(ok ? "bien" : "mal");
      Array.prototype.forEach.call(ops.querySelectorAll(".q7-op"), function (x) { if (x.getAttribute("data-t") === st.m.n) x.classList.add("bien"); });
      res.className = "q7-res " + (ok ? "ok" : "mal");
      res.innerHTML = (ok ? "<b>✓ Correcto.</b> " : "<b>✗ No.</b> ") + "Es <b>" + st.m.n + "</b>. Llevas " + st.ok + " de " + st.total + ".";
    });
    U.boton(cuerpo.querySelector(".q7-acc"), "Siguiente molécula", nuevo, "btn-comprobar");
    nuevo();
  };

  // ================================================================
  //  q2t9_hibrida: hibridación de cada carbono
  // ================================================================
  Q.HIB = [
    { t: "etano", s: "CC", nota: "Cada C tiene 4 enlaces σ: tetraédrico, 109,5°. Rotación libre." },
    { t: "eteno", s: "C=C", nota: "Cada C: 3 σ + 1 π. Molécula plana, 120°. El π impide girar." },
    { t: "etino", s: "C#C", nota: "Cada C: 2 σ + 2 π. Lineal, 180°." },
    { t: "propeno", s: "C=CC", nota: "Los dos C del doble enlace son sp²; el CH₃ es sp³." },
    { t: "propino", s: "CC#C", nota: "Los C del triple enlace son sp; el CH₃, sp³." },
    { t: "propadieno", s: "C=C=C", nota: "El C central, con dos dobles enlaces, es sp (lineal); los extremos, sp²." },
    { t: "but-1-en-3-ino", s: "C=CC#C", nota: "Mezcla de las tres: =CH₂ y =CH– (sp²), –C≡CH (sp)." },
    { t: "propanal", s: "CCC=O", nota: "El C del grupo C=O es sp² (plano, 120°): igual que en un alqueno." },
    { t: "propanona", s: "CC(=O)C", nota: "El C del carbonilo es sp²; los dos CH₃ son sp³." },
    { t: "ácido etanoico", s: "CC(=O)O", nota: "El C del –COOH es sp² (3 σ + 1 π); el CH₃, sp³." },
    { t: "etanonitrilo", s: "CC#N", nota: "El C del –C≡N es sp (lineal); el CH₃, sp³." },
    { t: "but-2-eno", s: "CC=CC", nota: "Dos C sp² en el doble enlace y dos CH₃ sp³." }
  ];
  Q.hibDe = function (G) {
    // devuelve para cada átomo C: { sigma, pi, h: "sp3"|"sp2"|"sp" }
    var ord = G.a.map(function () { return []; });
    G.b.forEach(function (e) { ord[e.i].push(e.o); ord[e.j].push(e.o); });
    return G.a.map(function (at, i) {
      if (at.e !== "C") return null;
      var vecinos = ord[i].length + at.h, pi = ord[i].reduce(function (s, o) { return s + (o - 1); }, 0);
      return { sigma: vecinos, pi: pi, h: vecinos === 4 ? "sp3" : vecinos === 3 ? "sp2" : "sp" };
    });
  };
  var HNOM = { sp3: "sp³", sp2: "sp²", sp: "sp" }, HCLS = { sp3: "c-pen", sp2: "c-ok", sp: "c-red" }, HTXT = { sp3: "pen", sp2: "ok", sp: "red" };
  var HANG = { sp3: "109,5°", sp2: "120°", sp: "180°" }, HGEO = { sp3: "tetraédrica", sp2: "plana triangular", sp: "lineal" };
  B.w.q2t9_hibrida = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Hibridación de cada carbono");
    cuerpo.innerHTML = '<div data-mol class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><div class="ctl q7-acc"></div><p class="w-pie"></p>';
    var st = { k: 0, ver: false }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), boton;
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 210, limpio: true, etiqueta: "Molécula con cada carbono coloreado según su hibridación" });
    function pinta() {
      var x = Q.HIB[st.k], G = O().grafoDeSmiles(x.s), H = Q.hibDe(G), cuenta = { sp3: 0, sp2: 0, sp: 0 }, sig = 0, pi = 0;
      O().dibujaGrafo(g, G, { min: 1.7 });
      G.b.forEach(function (e) { sig += 1; pi += e.o - 1; });
      G.a.forEach(function (at) { sig += at.h; });
      H.forEach(function (h, i) {
        if (!h) return;
        cuenta[h.h]++;
        if (st.ver) { g.punto(G.a[i].x, G.a[i].y, { r: 14, clase: HCLS[h.h] }).setAttribute("fill-opacity", "0.22"); g.texto(G.a[i].x, G.a[i].y, HNOM[h.h], { ancla: "middle", dy: -19, clase: HTXT[h.h] }); }
        else g.punto(G.a[i].x, G.a[i].y, { r: 14, clase: "c-faint" }).setAttribute("fill-opacity", "0.15");
      });
      var fm = O().formulaMolecular(O().cuentaGrafo(G));
      lectura.innerHTML = U.lec("Molécula", "<span class='q7-nombre'>" + x.t + "</span> · " + fm, "ok ancho") +
        U.lec("Enlaces σ · π", sig + " σ · " + pi + " π", "pen") +
        (st.ver ? U.lec("Carbonos sp³ / sp² / sp", cuenta.sp3 + " / " + cuenta.sp2 + " / " + cuenta.sp, "") : U.lec("Carbonos", H.filter(Boolean).length, ""));
      pie.innerHTML = st.ver ? x.nota + " <b>Regla:</b> cuenta los átomos unidos al C (con los H): 4 → sp³ · 3 → sp² · 2 → sp." : "Antes de mirar: ¿cuántos átomos rodean a cada carbono? 4 → sp³, 3 → sp², 2 → sp. Pulsa «Mostrar hibridación» para comprobarlo.";
      if (boton) boton.textContent = st.ver ? "Ocultar hibridación" : "Mostrar hibridación";
    }
    U.fichas(cuerpo.querySelector("[data-mol]"), Q.HIB.map(function (m, i) { return { k: String(i), t: m.t }; }), "0", function (k) { st.k = +k; st.ver = false; pinta(); });
    boton = U.boton(cuerpo.querySelector(".q7-acc"), "Mostrar hibridación", function () { st.ver = !st.ver; pinta(); }, "btn-comprobar");
    pinta();
  };

  // ================================================================
  //  q2t9_cistrans: ¿cuándo hay isomería geométrica?
  // ================================================================
  var SUS = { H: { t: "H", c: "faint" }, CH3: { t: "CH₃", c: "pen" }, Cl: { t: "Cl", c: "ok" }, Br: { t: "Br", c: "red" }, OH: { t: "OH", c: "red" } };
  var SUS_ORD = ["H", "CH3", "Cl", "Br", "OH"];
  Q.CT = [
    { t: "but-2-eno", v: ["H", "CH3", "H", "CH3"], nota: "cis-but-2-eno: Teb 3,7 °C · trans-but-2-eno: 0,9 °C." },
    { t: "propeno", v: ["H", "H", "H", "CH3"], nota: "CH₂=CH–CH₃: el C1 lleva dos H iguales, así que no hay isomería cis-trans." },
    { t: "1,2-dicloroeteno", v: ["H", "Cl", "H", "Cl"], nota: "cis: Teb 60,3 °C (polar, μ ≠ 0) · trans: 47,5 °C (apolar, los dipolos se anulan)." },
    { t: "1,1-dicloroeteno", v: ["Cl", "Cl", "H", "H"], nota: "Dos Cl en el mismo carbono: no hay isomería geométrica." },
    { t: "1-bromo-1-cloroeteno", v: ["Br", "Cl", "H", "H"], nota: "El C1 tiene Br y Cl (distintos) pero el C2 tiene dos H: no existe cis-trans." },
    { t: "1-bromo-2-cloroeteno", v: ["H", "Br", "H", "Cl"], nota: "Los dos carbonos tienen dos grupos distintos: existen dos isómeros (se nombran con Z/E)." },
    { t: "2-metilbut-2-eno", v: ["CH3", "CH3", "H", "CH3"], nota: "El C2 lleva dos CH₃ iguales: no hay isomería geométrica." }
  ];
  Q.hayCT = function (v) { return v[0] !== v[1] && v[2] !== v[3]; };
  B.w.q2t9_cistrans = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "¿Existe isomería cis-trans?");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="q9-sels" data-sels></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { v: Q.CT[0].v.slice(), pre: 0 }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sels = cuerpo.querySelector("[data-sels]"), selects = [];
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -2.4, ymax: 2.4, w: 600, h: 240, limpio: true, etiqueta: "Los dos isómeros posibles del alqueno" });
    g.rangoIso(0, 0.1, 2.4);
    var ETQ = ["C2 arriba", "C2 abajo", "C3 arriba", "C3 abajo"];
    ETQ.forEach(function (e, i) {
      var l = document.createElement("label"); l.className = "q9-sel";
      l.innerHTML = e + '<select aria-label="' + e + '">' + SUS_ORD.map(function (k) { return '<option value="' + k + '">' + SUS[k].t + "</option>"; }).join("") + "</select>";
      sels.appendChild(l); var s = l.querySelector("select"); selects.push(s);
      s.value = st.v[i];
      s.addEventListener("change", function () { st.v[i] = s.value; st.pre = -1; Array.prototype.forEach.call(cuerpo.querySelectorAll("[data-pre] .chip-btn"), function (c) { c.classList.remove("on"); }); pinta(); });
    });
    function molecula(cx, v, rot) {
      // v = [a(arriba izq), b(abajo izq), c(arriba der), d(abajo der)]
      var L = 0.7, dx = 0.62, dy = 1.0, x1 = cx - L, x2 = cx + L;
      [-0.09, 0.09].forEach(function (o) { g.segmento(x1, o, x2, o, { clase: "c-ink" }).setAttribute("stroke-width", 2.4); });
      g.texto(x1, 0, "C", { ancla: "end", dx: -6, dy: 5, clase: "faint" }); g.texto(x2, 0, "C", { ancla: "start", dx: 6, dy: 5, clase: "faint" });
      var pos = [[x1 - dx, dy, v[0]], [x1 - dx, -dy, v[1]], [x2 + dx, dy, v[2]], [x2 + dx, -dy, v[3]]];
      pos.forEach(function (p, i) {
        var xo = i < 2 ? x1 : x2, yo = 0, ux = p[0] - xo, uy = p[1] - yo, ln = Math.hypot(ux, uy);
        g.segmento(xo + ux / ln * 0.12, yo + uy / ln * 0.12, p[0] - ux / ln * 0.3, p[1] - uy / ln * 0.3, { clase: "c-ink" }).setAttribute("stroke-width", 2.2);
        g.texto(p[0], p[1], SUS[p[2]].t, { ancla: "middle", dy: p[1] > 0 ? 0 : 12, clase: SUS[p[2]].c });
      });
    }
    function pinta() {
      var v = st.v, hay = Q.hayCT(v), w2 = [v[0], v[1], v[3], v[2]];
      g.limpiar(); g.rangoIso(0, 0.1, 2.4);
      if (hay) {
        molecula(-3.1, v); molecula(3.1, w2);
        g.segmento(0, -2.1, 0, 2.1, { clase: "c-faint", dash: "4 4" });
      } else molecula(0, v);
      // nombres cis/trans si hay un grupo repetido en ambos carbonos
      var etq1 = "", etq2 = "", compartido = null;
      if (hay) {
        [v[0], v[1]].forEach(function (a) { if ((a === v[2] || a === v[3]) && (compartido === null || (compartido === "H" && a !== "H"))) compartido = a; });
        if (compartido !== null) {
          var ia = v[0] === compartido ? 0 : 1, ic = v[2] === compartido ? 0 : 1;
          etq1 = ia === ic ? "cis" : "trans"; etq2 = ia === ic ? "trans" : "cis";
          g.texto(-3.1, -2.0, etq1, { ancla: "middle", clase: "pen" }); g.texto(3.1, -2.0, etq2, { ancla: "middle", clase: "pen" });
        }
      }
      var razon = hay ? "sí: cada carbono del doble enlace tiene dos grupos distintos" : (v[0] === v[1] ? "no: el C2 tiene dos grupos iguales (" + SUS[v[0]].t + " y " + SUS[v[1]].t + ")" : "no: el C3 tiene dos grupos iguales (" + SUS[v[2]].t + " y " + SUS[v[3]].t + ")");
      lectura.innerHTML = U.lec("¿Isomería geométrica?", razon, hay ? "ok ancho" : "red ancho") +
        U.lec("Isómeros", hay ? "2" + (etq1 ? " · " + etq1 + " y " + etq2 : " · se nombran con Z/E") : "1", "pen");
      pie.innerHTML = st.pre >= 0 ? Q.CT[st.pre].nota : "Condición: <b>cada</b> carbono del doble enlace debe llevar dos sustituyentes <b>distintos</b>. Si uno de los dos carbonos repite el sustituyente, el intercambio no da una molécula nueva.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), Q.CT.map(function (m, i) { return { k: String(i), t: m.t }; }), "0", function (k) {
      st.pre = +k; st.v = Q.CT[st.pre].v.slice(); selects.forEach(function (s, i) { s.value = st.v[i]; }); pinta();
    });
    pinta();
  };

  // ================================================================
  //  q2t9_espejo: carbono quiral, imagen especular y superposición
  // ================================================================
  var POS = [[-1, 1, 0], [1, 1, 0], [1, -1, 1], [-1, -1, -1]];     // arriba-izq, arriba-dcha, abajo-dcha (cuña), abajo-izq (línea discontinua)
  Q.ESP = [
    { t: "CHFClBr", g: ["H", "F", "Cl", "Br"], nota: "Cuatro grupos distintos: el C es quiral y existen dos enantiómeros." },
    { t: "ácido láctico", g: ["H", "OH", "CH₃", "COOH"], nota: "El ácido 2-hidroxipropanoico: C2 con H, OH, CH₃ y COOH. El del músculo cansado es el enantiómero L-(+)." },
    { t: "alanina", g: ["H", "NH₂", "CH₃", "COOH"], nota: "Los aminoácidos naturales (salvo la glicina) son quirales; en las proteínas solo aparece el enantiómero L." },
    { t: "butan-2-ol", g: ["H", "OH", "CH₃", "CH₂CH₃"], nota: "C2 con H, OH, CH₃ y etilo: quiral. Los dos enantiómeros tienen el mismo punto de ebullición (99,5 °C)." },
    { t: "CH₂ClBr", g: ["H", "H", "Cl", "Br"], nota: "Dos H iguales: el carbono NO es quiral. La imagen en el espejo es la misma molécula." }
  ];
  function det3(a, b, c) { return a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]); }
  Q.quiralidad = function (pos) {      // pos[i] = coordenadas del grupo i; signo del triple producto (a−d, b−d, c−d)
    var d = pos[3], f = function (p) { return [p[0] - d[0], p[1] - d[1], p[2] - d[2]]; };
    return det3(f(pos[0]), f(pos[1]), f(pos[2])) > 0 ? 1 : -1;
  };
  B.w.q2t9_espejo = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Imagen en el espejo: ¿se pueden superponer?");
    cuerpo.innerHTML = '<div data-mol class="chips"></div><div class="w-plot"></div><div class="lectura anch"></div><div class="ctl q7-acc"></div><p class="w-pie"></p>';
    var st = { k: 0, giro: false, canje: false }, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), acc = cuerpo.querySelector(".q7-acc");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -2.4, ymax: 2.4, w: 600, h: 240, limpio: true, etiqueta: "Molécula A, espejo y molécula B" });
    function molecula(cx, pos, nombres, rotulo) {
      var orden = [0, 1, 3, 2];          // primero las que van al fondo, la cuña al final
      orden.forEach(function (i) {
        var p = pos[i], px = cx + p[0] * 0.95, py = p[1] * 0.85, z = p[2], ux = px - cx, uy = py, ln = Math.hypot(ux, uy), ex = px - ux / ln * 0.42, ey = py - uy / ln * 0.42, sx = cx + ux / ln * 0.1, sy = uy / ln * 0.1, s;
        if (z > 0) {         // cuña: triángulo lleno que se ensancha hacia el observador
          var nx = -uy / ln * 0.17, ny = ux / ln * 0.17;
          s = g.poligono([[sx, sy], [ex + nx, ey + ny], [ex - nx, ey - ny]], { clase: "z-pen" }); s.style.fill = "var(--ink)"; s.style.stroke = "var(--ink)"; s.style.fillOpacity = "1";
        } else {
          s = g.segmento(sx, sy, ex, ey, { clase: "c-ink" }); s.setAttribute("stroke-width", 2.4);
          if (z < 0) s.setAttribute("stroke-dasharray", "3 3");
        }
        g.texto(px, py, nombres[i], { ancla: "middle", dy: py > 0 ? 0 : 12, clase: nombres[i] === "H" ? "faint" : "pen" });
      });
      g.texto(cx, 0, "C", { ancla: "middle", dy: 5, clase: "red" });
      g.texto(cx, -2.2, rotulo, { ancla: "middle", clase: "faint" });
    }
    function pinta() {
      var x = Q.ESP[st.k], A = POS.map(function (p) { return p.slice(); }), nom = x.g.slice();
      // B = imagen especular de A (x → −x); opcionalmente girada 180° alrededor del eje vertical ((x,z) → (−x,−z)); opcionalmente con dos grupos canjeados
      var Bp = A.map(function (p) { return [-p[0], p[1], p[2]]; });
      if (st.giro) Bp = Bp.map(function (p) { return [-p[0], p[1], -p[2]]; });
      if (st.canje) { var t = Bp[2]; Bp[2] = Bp[3]; Bp[3] = t; }
      var iguales = nom[0] === nom[1] || nom[1] === nom[2] || nom[0] === nom[2] || nom[0] === nom[3] || nom[1] === nom[3] || nom[2] === nom[3];
      var misma = iguales || Q.quiralidad(A) === Q.quiralidad(Bp);
      g.limpiar(); g.rangoIso(0, 0, 2.4);
      molecula(-3.2, A, nom, "A");
      g.segmento(0, -2.1, 0, 2.1, { clase: "c-faint", dash: "4 4" });
      molecula(3.2, Bp, nom, st.giro || st.canje ? "B transformada" : "B (espejo de A)");
      lectura.innerHTML = U.lec("¿C quiral?", iguales ? "no (grupos repetidos)" : "sí (4 grupos distintos)", iguales ? "red" : "ok") +
        U.lec("¿B se superpone con A?", misma ? "sí: es la misma molécula" : "no: es su enantiómero", misma ? "ok ancho" : "red ancho");
      pie.innerHTML = x.nota + (iguales ? "" : (st.giro && !st.canje ? " Tras girar B 180° los grupos de arriba coinciden, pero abajo la cuña y la línea discontinua siguen cruzadas: no hay forma de superponerlas sin romper enlaces." : st.canje ? " Intercambiar dos grupos convierte un enantiómero en el otro: ahora B coincide (o no) con A según cuántos intercambios hayas hecho." : " Un enantiómero y su imagen especular son como las manos: no coinciden por mucho que los gires."));
    }
    U.fichas(cuerpo.querySelector("[data-mol]"), Q.ESP.map(function (m, i) { return { k: String(i), t: m.t }; }), "0", function (k) { st.k = +k; st.giro = false; st.canje = false; pinta(); });
    U.boton(acc, "Girar B 180° (eje vertical)", function () { st.giro = !st.giro; pinta(); }, "btn-comprobar");
    U.boton(acc, "Intercambiar dos grupos de B", function () { st.canje = !st.canje; pinta(); }, "btn-comprobar");
    U.boton(acc, "Volver al espejo", function () { st.giro = false; st.canje = false; pinta(); });
    pinta();
  };

  // ================================================================
  //  q2t9_fuerzas: fuerzas intermoleculares y punto de ebullición
  //  f: L = solo London · D = dipolo permanente · H = puente de hidrógeno
  // ================================================================
  Q.FZ = [
    { t: "M ≈ 60 g/mol", c: [
      { n: "butano", s: "CCCC", pe: -0.5, f: "L", x: "Solo fuerzas de London: molécula apolar." },
      { n: "metoxietano", s: "COCC", pe: 7.4, f: "D", x: "Éter: dipolo débil, sin O–H, no forma puentes de H consigo mismo." },
      { n: "propanal", s: "CCC=O", pe: 48.0, f: "D", x: "C=O polar: atracciones dipolo–dipolo; sin O–H." },
      { n: "propanona", s: "CC(=O)C", pe: 56.1, f: "D", x: "C=O polar: dipolo–dipolo; sin O–H." },
      { n: "propan-1-ol", s: "CCCO", pe: 97.2, f: "H", x: "O–H: puentes de hidrógeno entre moléculas." },
      { n: "ác. etanoico", s: "CC(=O)O", pe: 118.1, f: "H", x: "–COOH: puentes de H (forma dímeros), los más fuertes del grupo." }
    ] },
    { t: "M ≈ 72–74 g/mol", c: [
      { n: "éter dietílico", s: "CCOCC", pe: 34.6, f: "D", x: "Éter: poca polaridad, sin puentes de H." },
      { n: "pentano", s: "CCCCC", pe: 36.1, f: "L", x: "Apolar: solo London (algo más fuertes por la mayor superficie)." },
      { n: "butanal", s: "CCCC=O", pe: 74.8, f: "D", x: "Carbonilo: dipolo–dipolo." },
      { n: "butanona", s: "CCC(=O)C", pe: 79.6, f: "D", x: "Carbonilo: dipolo–dipolo." },
      { n: "butan-1-ol", s: "CCCCO", pe: 117.7, f: "H", x: "O–H: puentes de hidrógeno." },
      { n: "ác. propanoico", s: "CCC(=O)O", pe: 141.1, f: "H", x: "–COOH: puentes de H y dímeros." }
    ] },
    { t: "Ramificación (C₅H₁₂)", c: [
      { n: "pentano", s: "CCCCC", pe: 36.1, f: "L", x: "Cadena lineal: mayor superficie de contacto, mayores fuerzas de London." },
      { n: "2-metilbutano", s: "CC(C)CC", pe: 27.8, f: "L", x: "Un CH₃ lateral: molécula más compacta." },
      { n: "neopentano", s: "CC(C)(C)C", pe: 9.5, f: "L", x: "Casi esférica: mínimo contacto entre moléculas, el menor punto de ebullición." }
    ] },
    { t: "Alcohol frente a éter (C₂H₆O)", c: [
      { n: "dimetil éter", s: "COC", pe: -24.8, f: "D", x: "Sin O–H: no hay puentes de hidrógeno. Es un gas a temperatura ambiente." },
      { n: "etanol", s: "CCO", pe: 78.4, f: "H", x: "O–H: puentes de hidrógeno. Mismo número de átomos, 100 °C más de punto de ebullición." }
    ] }
  ];
  var FNOM = { L: "London (apolar)", D: "dipolo–dipolo", H: "puentes de hidrógeno" };
  B.w.q2t9_fuerzas = function (host) {
    estilo();
    var cuerpo = B.caja(host, "Pruébalo", "Fuerzas intermoleculares y punto de ebullición");
    cuerpo.innerHTML = '<div data-set class="chips"></div><div class="q9-barras" data-bar></div><div class="q9-leyenda"><span><i class="q9-L"></i>solo London</span><span><i class="q9-D"></i>dipolo–dipolo</span><span><i class="q9-H"></i>puentes de H</span></div><div class="lectura anch" data-lec></div><div class="w-plot"></div><p class="w-pie"></p>';
    var st = { s: 0, i: 0 }, bar = cuerpo.querySelector("[data-bar]"), lec = cuerpo.querySelector("[data-lec]"), pie = cuerpo.querySelector(".w-pie");
    var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 6, ymin: -2.2, ymax: 2.6, w: 560, h: 190, limpio: true, etiqueta: "Molécula seleccionada" });
    function masa(c) { var cc = O().cuentaGrafo(O().grafoDeSmiles(c.s)), M = 12.011 * cc.C + 1.008 * cc.H + 15.999 * cc.O; return M; }
    function pinta() {
      var S = Q.FZ[st.s], C = S.c[st.i], pes = S.c.map(function (c) { return c.pe; }), mn = Math.min.apply(null, pes), mx = Math.max.apply(null, pes), rg = (mx - mn) || 1;
      bar.innerHTML = S.c.map(function (c, j) {
        return '<button type="button" class="q9-fila' + (j === st.i ? " sel" : "") + '" data-j="' + j + '"><span>' + c.n + '</span><span><span class="q9-pista q9-' + c.f + '" style="width:' + (6 + 94 * (c.pe - mn) / rg) + '%"></span></span><span class="q9-t">' + fmt(c.pe, 1) + " °C</span></button>";
      }).join("");
      O().dibujaGrafo(g, O().grafoDeSmiles(C.s), { min: 1.7 });
      lec.innerHTML = U.lec("Compuesto", "<span class='q7-nombre'>" + C.n + "</span>", "ok ancho") + U.lec("Masa molar", fmt(masa(C), 1) + " g/mol", "") + U.lec("Fuerza dominante", FNOM[C.f], C.f === "H" ? "red" : C.f === "D" ? "ok" : "pen");
      pie.innerHTML = C.x;
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest("[data-j]"); if (!b) return; st.i = +b.getAttribute("data-j"); pinta(); });
    U.fichas(cuerpo.querySelector("[data-set]"), Q.FZ.map(function (m, i) { return { k: String(i), t: m.t }; }), "0", function (k) { st.s = +k; st.i = 0; pinta(); });
    pinta();
  };
})(window);
