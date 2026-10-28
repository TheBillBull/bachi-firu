/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 11 (Cálculo de primitivas)
   m2_familia (la familia F(x)+C y la primitiva que pasa por un punto) ·
   m2_partes (elegir u y dv: la consecuencia de elegir mal) ·
   m2_fracciones (descomposición en fracciones simples, paso a paso, con tu propia A, B, C).
   Reutiliza el motor de Matemáticas I: B.Plot, B.lab.fun (lecturas, puntos, etiquetas) y los controles de B.ui.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, F = B.lab.fun;
  var fil = F.fil, pto = F.pto, etq = F.etq;

  (function () {
    if (!global.document || !document.head || document.getElementById("m2t11-estilos")) return;
    var s = document.createElement("style"); s.id = "m2t11-estilos";
    s.textContent =
      ".m11-pasos{margin:6px 0 0;padding:0 0 0 1.2em;font-size:14.5px;line-height:1.6}" +
      ".m11-pasos li{margin:3px 0;overflow-wrap:anywhere}" +
      ".m11-int{font:600 17px var(--math);margin:2px 0 8px;overflow-wrap:anywhere}" +
      ".m11-opc{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}" +
      ".m11-opc .chip-btn{text-align:left;white-space:normal}" +
      ".m11-veredicto{margin:8px 0 0;padding:8px 10px;border-radius:8px;font-size:14.5px;line-height:1.5;border:1px solid var(--line,rgba(128,128,128,.3))}" +
      ".m11-veredicto.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,transparent)}" +
      ".m11-veredicto.mal{border-color:var(--red);background:color-mix(in srgb,var(--red) 10%,transparent)}" +
      ".m11-alpes{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 8px;font-size:13px}" +
      ".m11-alpes span{padding:2px 8px;border-radius:999px;border:1px solid var(--line,rgba(128,128,128,.35))}" +
      ".m11-alpes b{color:var(--ok)}";
    document.head.appendChild(s);
  })();

  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 3).replace(/,000$/, "").replace(/(,\d\d)0$/, "$1").replace(/(,\d)0$/, "$1"); }
  function sg(x) { return x < 0 ? "−" + n2(-x) : n2(x); }
  function lista(arr) { return "<ol class='m11-pasos'>" + arr.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>"; }

  // ============================================================
  // FAMILIA F(x) + C: una primitiva más una constante cualquiera
  // ============================================================
  var FAM = [
    { t: "2x − 3", f: function (x) { return 2 * x - 3; }, F: function (x) { return x * x - 3 * x; }, Ft: "x² − 3x", rg: [-1, 4, -8, 10], x0: 2, y0: 1 },
    { t: "3x² − 4x + 1", f: function (x) { return 3 * x * x - 4 * x + 1; }, F: function (x) { return x * x * x - 2 * x * x + x; }, Ft: "x³ − 2x² + x", rg: [-1, 3, -8, 10], x0: 1, y0: 3 },
    { t: "cos x", f: Math.cos, F: Math.sin, Ft: "sen x", rg: [-4, 4, -6, 6], x0: 0, y0: 2 },
    { t: "1/x  (x &gt; 0)", f: function (x) { return 1 / x; }, F: Math.log, Ft: "ln x", rg: [0.2, 6, -6, 6], x0: 1, y0: 2 },
    { t: "x·eˣ", f: function (x) { return x * Math.exp(x); }, F: function (x) { return (x - 1) * Math.exp(x); }, Ft: "(x − 1)·eˣ", rg: [-4, 2, -6, 8], x0: 0, y0: 1 }
  ];
  B.w.m2_familia = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Una primitiva es una familia: F(x) + C");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-plot m11-g1"></div><div class="w-plot m11-g2"></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { i: 0, C: 0, x0: 2, y0: 1 }, g1, g2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), sC, sX, sY;
    sC = U.slider(ctl, { et: "Constante <i>C</i>", min: -10, max: 10, step: 0.1, val: 0, on: function (v) { st.C = v; pinta(); }, fmt: function (v) { return sg(v); } });
    sX = U.slider(ctl, { et: "Punto <i>x</i>₀", min: -1, max: 4, step: 0.05, val: 2, on: function (v) { st.x0 = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    sY = U.slider(ctl, { et: "Altura pedida <i>y</i>₀", min: -5, max: 5, step: 0.5, val: 1, on: function (v) { st.y0 = v; pinta(); }, fmt: function (v) { return sg(v); } });
    U.boton(ctl, "Ajustar C para que pase por (x₀, y₀)", function () {
      var P = FAM[st.i], c = st.y0 - P.F(st.x0);
      sC.set(Math.max(-10, Math.min(10, Math.round(c * 10) / 10))); st.C = sC.get(); pinta();
    }, "btn-comprobar");
    function carga(i) {
      var P = FAM[i], R = P.rg; st.i = i; st.C = 0; sC.set(0);
      sX.input.min = R[0] + (R[1] - R[0]) * 0.05; sX.input.max = R[1] - (R[1] - R[0]) * 0.05; sX.input.step = 0.05;
      st.x0 = P.x0; sX.set(P.x0); st.y0 = P.y0; sY.set(P.y0); pinta();
    }
    function pinta() {
      var P = FAM[st.i], R = P.rg, x0 = st.x0, C = st.C, k;
      var Fc = function (x) { return P.F(x) + C; };
      g1.rango(R[0], R[1], R[2], R[3]); g1.limpiar(); g2.rango(R[0], R[1], R[2] / 2, R[3] / 2); g2.limpiar();
      for (k = -4; k <= 4; k += 2) g1.curva(function (x) { return P.F(x) + k; }, { clase: "c-faint", n: 240 });
      g1.curva(Fc, { clase: "c-pen", n: 300 }).setAttribute("stroke-width", 3);
      g2.horizontal(0, { clase: "c-faint" });
      g2.curva(P.f, { clase: "c-ok", n: 300 }).setAttribute("stroke-width", 2.5);
      var m = P.f(x0), fx = Fc(x0), W = (R[1] - R[0]) * 0.1;
      g1.segmento(x0 - W, fx - m * W, x0 + W, fx + m * W, { clase: "c-red", dash: "5 4" });
      pto(g1, x0, fx, "c-red", false, 7);
      pto(g1, x0, st.y0, "c-faint", true, 6); etq(g1, x0, st.y0, "(x₀, y₀)", "", 8, -8);
      pto(g2, x0, m, "c-red", false, 6);
      var cNec = st.y0 - P.F(x0), pasa = Math.abs(fx - st.y0) < 0.06;
      lectura.innerHTML =
        fil("Función f (la que integras)", P.t, "ok") +
        fil("Una primitiva F", P.Ft + " + C", "pen") +
        fil("F(x₀) con tu C", n2(fx), "pen") +
        fil("Pendiente de F en x₀ = f(x₀)", sg(m), "red") +
        fil("C que hace pasar por (x₀, y₀)", "C = y₀ − F(x₀) = " + sg(cNec), "pen") +
        fil("¿Pasa por el punto?", pasa ? "Sí: esta es LA primitiva buscada" : "Aún no: |diferencia| = " + n2(Math.abs(fx - st.y0)), pasa ? "ok" : "red");
      pie.innerHTML = "Arriba, la familia F + C: todas las curvas son la misma <b>desplazada en vertical</b>. Abajo, f: en cada x la pendiente (línea roja) es la misma para todas (siempre f(x)), por eso son primitivas de la misma f.";
    }
    g1 = new B.Plot(cuerpo.querySelector(".m11-g1"), { xmin: -1, xmax: 4, ymin: -8, ymax: 10, w: 600, h: 260, etx: "x", ety: "", etiqueta: "Primitivas F + C" });
    g2 = new B.Plot(cuerpo.querySelector(".m11-g2"), { xmin: -1, xmax: 4, ymin: -4, ymax: 5, w: 600, h: 150, etx: "x", ety: "", etiqueta: "La función f" });
    U.fichas(cuerpo.querySelector("[data-pre]"), FAM.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // PARTES: elige u y mira qué pasa
  // ============================================================
  var PT = [
    { t: "x·eˣ", int: "∫ x·eˣ dx",
      op: [
        { u: "x", dv: "eˣ dx", du: "dx", v: "eˣ", nueva: "∫ eˣ dx", bien: true, nota: "El polinomio baja de grado al derivarlo: queda la integral inmediata ∫eˣdx." },
        { u: "eˣ", dv: "x dx", du: "eˣ dx", v: "x²/2", nueva: "∫ (x²/2)·eˣ dx", bien: false, nota: "Peor: el polinomio ha SUBIDO de grado (x² en vez de x). Cada vez se complica más." }
      ],
      pasos: ["u = x ⟹ du = dx;  dv = eˣdx ⟹ v = eˣ.", "∫x·eˣdx = x·eˣ − ∫eˣdx = x·eˣ − eˣ + C."], res: "(x − 1)·eˣ + C" },
    { t: "x·ln x", int: "∫ x·ln x dx",
      op: [
        { u: "ln x", dv: "x dx", du: "dx/x", v: "x²/2", nueva: "∫ (x²/2)·(1/x) dx = ∫ x/2 dx", bien: true, nota: "El logaritmo desaparece al derivarlo (ALPES: L antes que P). Queda un polinomio." },
        { u: "x", dv: "ln x dx", du: "dx", v: "x·ln x − x", nueva: "∫ (x·ln x − x) dx", bien: false, nota: "Círculo vicioso: para tener v ya hay que integrar ln x (¡por partes!), y la integral nueva vuelve a contener x·ln x." }
      ],
      pasos: ["u = ln x ⟹ du = dx/x;  dv = x dx ⟹ v = x²/2.", "∫x·ln x dx = (x²/2)·ln x − ∫(x/2)dx = (x²/2)·ln x − x²/4 + C."], res: "(x²/2)·ln x − x²/4 + C" },
    { t: "x²·sen x", int: "∫ x²·sen x dx",
      op: [
        { u: "x²", dv: "sen x dx", du: "2x dx", v: "−cos x", nueva: "−x²cos x + 2∫ x·cos x dx", bien: true, nota: "Baja de x² a x: hay que repetir las partes una vez más (partes reiteradas) y se acaba." },
        { u: "sen x", dv: "x² dx", du: "cos x dx", v: "x³/3", nueva: "∫ (x³/3)·cos x dx", bien: false, nota: "Peor: el grado sube de 2 a 3. Elegir mal empeora la integral en vez de simplificarla." }
      ],
      pasos: ["Primera pasada: u = x², dv = sen x dx ⟹ ∫ = −x²cos x + 2∫x·cos x dx.", "Segunda pasada (misma regla): u = x, dv = cos x dx ⟹ ∫x·cos x dx = x·sen x − ∫sen x dx = x·sen x + cos x.", "Total: −x²cos x + 2x·sen x + 2cos x + C."], res: "−x²·cos x + 2x·sen x + 2cos x + C" },
    { t: "arctg x", int: "∫ arctg x dx",
      op: [
        { u: "arctg x", dv: "dx", du: "dx/(1 + x²)", v: "x", nueva: "∫ x/(1 + x²) dx", bien: true, nota: "Truco: la función «sola» se integra tomando dv = dx. La arcotangente (A de ALPES) se deriva en algo racional, y ∫x/(1+x²) es de tipo f′/f." },
        { u: "1", dv: "arctg x dx", du: "0", v: "?", nueva: "(no se puede empezar)", bien: false, nota: "Para tener v habría que integrar arctg x, que es justo lo que te piden. Callejón sin salida." }
      ],
      pasos: ["u = arctg x ⟹ du = dx/(1+x²);  dv = dx ⟹ v = x.", "∫ = x·arctg x − ∫x/(1+x²)dx = x·arctg x − ½ln(1+x²) + C."], res: "x·arctg x − ½·ln(1 + x²) + C" },
    { t: "eˣ·cos x", int: "∫ eˣ·cos x dx",
      op: [
        { u: "cos x", dv: "eˣ dx", du: "−sen x dx", v: "eˣ", nueva: "eˣcos x + ∫ eˣ·sen x dx", bien: true, nota: "Aquí valen las dos elecciones, pero hay que mantener la MISMA en las dos pasadas: la integral reaparece y se despeja (cíclica)." },
        { u: "eˣ", dv: "cos x dx", du: "eˣ dx", v: "sen x", nueva: "eˣsen x − ∫ eˣ·sen x dx", bien: true, nota: "También vale. Lo que arruina el método es cambiar de criterio a mitad: entonces la 2.ª pasada deshace la 1.ª y sale 0 = 0." }
      ],
      pasos: ["Sea I = ∫eˣcos x dx. Con u = cos x, dv = eˣdx: I = eˣcos x + ∫eˣsen x dx.", "Segunda pasada, misma elección (u = sen x, dv = eˣdx): ∫eˣsen x dx = eˣsen x − I.", "Luego I = eˣcos x + eˣsen x − I ⟹ 2I = eˣ(sen x + cos x) ⟹ I = ½eˣ(sen x + cos x) + C."], res: "½·eˣ·(sen x + cos x) + C" }
  ];
  B.w.m2_partes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Integración por partes: elige u y mira qué pasa");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="m11-int"></div>' +
      '<div class="m11-alpes"><span><b>A</b>rcos</span><span><b>L</b>ogaritmos</span><span><b>P</b>olinomios</span><span><b>E</b>xponenciales</span><span><b>S</b>eno/coseno</span></div>' +
      '<p class="m9-enun" style="margin:0">¿Qué eliges como <b>u</b>? (el resto es dv)</p><div class="m11-opc"></div><div class="lectura anch"></div><div class="m11-veredicto" hidden></div><div class="m11-sol"></div><p class="w-pie"></p>';
    var st = { i: 0, o: -1 }, intEl = cuerpo.querySelector(".m11-int"), opc = cuerpo.querySelector(".m11-opc"), lectura = cuerpo.querySelector(".lectura"), ver = cuerpo.querySelector(".m11-veredicto"), sol = cuerpo.querySelector(".m11-sol"), pie = cuerpo.querySelector(".w-pie");
    function carga(i) {
      st.i = i; st.o = -1; var P = PT[i];
      intEl.innerHTML = P.int;
      opc.innerHTML = P.op.map(function (o, k) { return '<button type="button" class="chip-btn" data-o="' + k + '">u = ' + o.u + "</button>"; }).join("");
      pinta();
    }
    opc.addEventListener("click", function (e) {
      var b = e.target.closest("[data-o]"); if (!b) return;
      st.o = +b.getAttribute("data-o"); pinta();
    });
    function pinta() {
      var P = PT[st.i], o = P.op[st.o];
      Array.prototype.forEach.call(opc.children, function (c, k) { c.classList.toggle("on", k === st.o); c.setAttribute("aria-pressed", k === st.o); });
      if (!o) {
        lectura.innerHTML = ""; ver.hidden = true; sol.innerHTML = "";
        pie.innerHTML = "Regla <b>ALPES</b>: u es lo que aparezca antes en la lista (Arcos, Logaritmos, Polinomios, Exponenciales, Seno/coseno). Pulsa una opción para ver el resultado de elegirla.";
        return;
      }
      lectura.innerHTML = fil("u", o.u, "pen") + fil("dv", o.dv, "pen") + fil("du", o.du, "pen") + fil("v", o.v, "pen") + fil("Integral que queda", o.nueva, o.bien ? "ok anch" : "red anch");
      ver.hidden = false; ver.className = "m11-veredicto " + (o.bien ? "ok" : "mal");
      ver.innerHTML = (o.bien ? "<b>Buena elección.</b> " : "<b>Mala elección.</b> ") + o.nota;
      sol.innerHTML = o.bien ? lista(P.pasos) + '<p class="m11-int">Resultado: ' + P.res + "</p>" : "";
      pie.innerHTML = o.bien ? "Comprueba siempre derivando el resultado." : "Prueba con la otra opción: la buena hace que la integral nueva sea <b>más fácil</b> que la de partida.";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PT.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };

  // ============================================================
  // FRACCIONES SIMPLES: descomposición con tus propios A, B, C
  // ============================================================
  var FR = [
    { t: "Raíces simples", txt: "(5x + 1)/((x − 1)(x + 2))", nom: ["A", "B"], sol: [2, 3],
      orig: function (x) { return (5 * x + 1) / ((x - 1) * (x + 2)); },
      forma: function (x, p) { return p[0] / (x - 1) + p[1] / (x + 2); },
      ftxt: "A/(x − 1) + B/(x + 2)",
      pista: "Quita denominadores: 5x + 1 = A(x + 2) + B(x − 1). Sustituye x = 1 y x = −2.",
      pasos: ["Grado del numerador (1) menor que el del denominador (2): no hay que dividir.",
        "Raíces del denominador: x = 1 y x = −2, las dos simples ⟹ (5x+1)/((x−1)(x+2)) = <b>A/(x−1) + B/(x+2)</b>.",
        "Se quitan denominadores: 5x + 1 = A(x+2) + B(x−1).",
        "x = 1: 6 = 3A ⟹ <b>A = 2</b>.  x = −2: −9 = −3B ⟹ <b>B = 3</b>.",
        "Se integra cada fracción: <b>2·ln|x−1| + 3·ln|x+2| + C</b>."] },
    { t: "Hay que dividir", txt: "(x² + 1)/(x² − x)", nom: ["Q", "A", "B"], sol: [1, -1, 2],
      orig: function (x) { return (x * x + 1) / (x * x - x); },
      forma: function (x, p) { return p[0] + p[1] / x + p[2] / (x - 1); },
      ftxt: "Q + A/x + B/(x − 1)",
      pista: "Divide primero: x² + 1 = 1·(x² − x) + (x + 1). Luego (x+1)/(x(x−1)) = A/x + B/(x−1): x = 0 y x = 1.",
      pasos: ["Los grados son iguales (2 y 2): <b>hay que dividir</b>. x² + 1 = 1·(x² − x) + (x + 1) ⟹ cociente Q = 1, resto x + 1.",
        "Queda 1 + (x+1)/(x(x−1)), con raíces simples 0 y 1: (x+1)/(x(x−1)) = <b>A/x + B/(x−1)</b>.",
        "x + 1 = A(x−1) + B·x.",
        "x = 0: 1 = −A ⟹ <b>A = −1</b>.  x = 1: 2 = B ⟹ <b>B = 2</b>.",
        "∫ = <b>x − ln|x| + 2·ln|x−1| + C</b>."] },
    { t: "Raíz doble", txt: "(x² + 1)/((x − 1)²(x + 1))", nom: ["A", "B", "C"], sol: [0.5, 1, 0.5],
      orig: function (x) { return (x * x + 1) / ((x - 1) * (x - 1) * (x + 1)); },
      forma: function (x, p) { return p[0] / (x - 1) + p[1] / ((x - 1) * (x - 1)) + p[2] / (x + 1); },
      ftxt: "A/(x − 1) + B/(x − 1)² + C/(x + 1)",
      pista: "x² + 1 = A(x−1)(x+1) + B(x+1) + C(x−1)². x = 1 da B; x = −1 da C; para A compara el coeficiente de x² (o usa x = 0).",
      pasos: ["Grado 2 &lt; 3: no se divide.",
        "La raíz doble x = 1 da <b>dos</b> términos (A/(x−1) y B/(x−1)²); la simple x = −1 da C/(x+1).",
        "x² + 1 = A(x−1)(x+1) + B(x+1) + C(x−1)².",
        "x = 1: 2 = 2B ⟹ <b>B = 1</b>.  x = −1: 2 = 4C ⟹ <b>C = ½</b>.  Coeficiente de x²: 1 = A + C ⟹ <b>A = ½</b>.",
        "∫ = <b>½·ln|x−1| − 1/(x−1) + ½·ln|x+1| + C</b> (∫(x−1)⁻²dx = −1/(x−1))."] },
    { t: "Raíz doble en 0", txt: "(2x + 1)/(x²(x + 1))", nom: ["A", "B", "C"], sol: [1, 1, -1],
      orig: function (x) { return (2 * x + 1) / (x * x * (x + 1)); },
      forma: function (x, p) { return p[0] / x + p[1] / (x * x) + p[2] / (x + 1); },
      ftxt: "A/x + B/x² + C/(x + 1)",
      pista: "2x + 1 = A·x(x+1) + B(x+1) + C·x². x = 0 da B; x = −1 da C; el coeficiente de x² da A.",
      pasos: ["Grado 1 &lt; 3: no se divide.",
        "Raíz doble x = 0: A/x + B/x². Raíz simple x = −1: C/(x+1).",
        "2x + 1 = A·x(x+1) + B(x+1) + C·x².",
        "x = 0: 1 = B ⟹ <b>B = 1</b>.  x = −1: −1 = C ⟹ <b>C = −1</b>.  Coeficiente de x²: 0 = A + C ⟹ <b>A = 1</b>.",
        "∫ = <b>ln|x| − 1/x − ln|x+1| + C</b>."] },
    { t: "Denominador irreducible", txt: "4/((x − 1)(x² + 1))", nom: ["A", "B", "C"], sol: [2, -2, -2],
      orig: function (x) { return 4 / ((x - 1) * (x * x + 1)); },
      forma: function (x, p) { return p[0] / (x - 1) + (p[1] * x + p[2]) / (x * x + 1); },
      ftxt: "A/(x − 1) + (Bx + C)/(x² + 1)",
      pista: "4 = A(x²+1) + (Bx + C)(x − 1). x = 1 da A; luego el coeficiente de x² da B y el término independiente da C.",
      pasos: ["x² + 1 no tiene raíces reales (Δ &lt; 0): es <b>irreducible</b> y su numerador es de grado 1: (Bx + C)/(x²+1).",
        "4 = A(x²+1) + (Bx+C)(x−1).",
        "x = 1: 4 = 2A ⟹ <b>A = 2</b>.  Coeficiente de x²: 0 = A + B ⟹ <b>B = −2</b>.  Término independiente: 4 = A − C ⟹ <b>C = −2</b>.",
        "4/((x−1)(x²+1)) = 2/(x−1) − (2x + 2)/(x² + 1).",
        "∫ = 2·ln|x−1| − ∫2x/(x²+1)dx − ∫2/(x²+1)dx = <b>2·ln|x−1| − ln(x²+1) − 2·arctg x + C</b>."] }
  ];
  B.w.m2_fracciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Fracciones simples: pon tú A, B y C");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="m11-int"></div><p class="m9-enun" style="margin:0"></p><div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><div class="ctl m11-acc"></div><div class="m11-sol"></div><p class="w-pie"></p>';
    var st = { i: 0, p: [0, 0, 0], n: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), acc = cuerpo.querySelector(".m11-acc"), lectura = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".m11-sol"), pie = cuerpo.querySelector(".w-pie"),
      intEl = cuerpo.querySelector(".m11-int"), enun = cuerpo.querySelector(".m9-enun"), sl = [], g;
    var nombres = ["A", "B", "C"];
    nombres.forEach(function (nm, k) {
      sl.push(U.slider(ctl, { et: "<i>" + nm + "</i>", min: -4, max: 4, step: 0.5, val: 0, on: function (v) { st.p[k] = v; pinta(); }, fmt: function (v) { return sg(v); } }));
    });
    U.boton(acc, "Siguiente paso", function () { st.n = Math.min(FR[st.i].pasos.length, st.n + 1); pinta(); }, "btn-comprobar");
    U.boton(acc, "Ver todos los pasos", function () { st.n = FR[st.i].pasos.length; pinta(); });
    U.boton(acc, "Reiniciar", function () { st.n = 0; st.p = [0, 0, 0]; sl.forEach(function (s) { s.set(0); }); pinta(); });
    function carga(i) {
      var P = FR[i]; st.i = i; st.n = 0; st.p = [0, 0, 0];
      sl.forEach(function (s, k) { s.set(0); s.el.hidden = k >= P.nom.length; s.el.querySelector(".sl-et").innerHTML = "<i>" + (P.nom[k] || "") + "</i>"; });
      intEl.innerHTML = "∫ " + P.txt + " dx";
      enun.innerHTML = "Descomposición: " + P.txt + " = " + P.ftxt + ". <b>Encuentra</b> " + P.nom.join(", ") + " con los deslizadores; la curva discontinua debe cubrir a la azul.";
      pinta();
    }
    function pinta() {
      var P = FR[st.i], p = st.p, k, pts = [-3.3, -1.4, -0.4, 0.35, 2.6, 3.9, 5.2], err = 0;
      var forma = function (x) { return P.forma(x, p); };
      g.limpiar();
      g.horizontal(0, { clase: "c-faint" });
      g.curva(P.orig, { clase: "c-pen", n: 500 }).setAttribute("stroke-width", 3);
      g.curva(forma, { clase: "c-red", dash: "6 4", n: 500 });
      for (k = 0; k < pts.length; k++) { var d = Math.abs(P.orig(pts[k]) - forma(pts[k])); if (isFinite(d)) err = Math.max(err, d); }
      var bien = err < 1e-6;
      lectura.innerHTML =
        fil("Tu descomposición", P.nom.map(function (nm, j) { return nm + " = " + sg(p[j]); }).join(" · "), "pen") +
        fil("Diferencia máxima con la fracción", bien ? "0 ⟶ ¡coincide!" : n2(err), bien ? "ok" : "red") +
        fil("Valor correcto", bien ? P.nom.map(function (nm, j) { return nm + " = " + sg(P.sol[j]); }).join(" · ") : "Aún no. " + P.pista, bien ? "ok anch" : "pen anch");
      sol.innerHTML = st.n ? lista(P.pasos.slice(0, st.n)) : "";
      pie.innerHTML = "Azul: la fracción original. Rojo discontinuo: tu descomposición. Si coinciden en <b>todo</b> x, la descomposición es correcta. «Siguiente paso» enseña cómo se hace con papel y lápiz.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -4, xmax: 6, ymin: -8, ymax: 8, w: 600, h: 250, etx: "x", ety: "", etiqueta: "Fracción y descomposición" });
    U.fichas(cuerpo.querySelector("[data-pre]"), FR.map(function (p, i) { return { k: String(i), t: p.t }; }), "0", function (k) { carga(+k); });
    carga(0);
  };
})(window);
