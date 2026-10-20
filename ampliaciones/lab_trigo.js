/* ============================================================
   Bachi para Firu · laboratorio de trigonometría (Matemáticas I, temas 4 y 5)
   motor B.lab.trig + rectangulo · goniometrica · radianes · reductor
   ambiguo · triangulo
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var T = B.lab.trig = {};
  var R = Math.PI / 180;
  function rad(d) { return d * R; }
  function deg(r) { return r / R; }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function cero(x) { return Math.abs(x) < 1e-9 ? 0 : x; }
  T.rad = rad; T.deg = deg;

  // Grados → «7π/6» cuando el ángulo es un múltiplo racional sencillo de π; si no, radianes decimales
  T.piTxt = function (d) {
    var dd = Math.round(d * 1000) / 1000;
    if (Math.abs(d - dd) > 1e-9 || dd !== Math.round(dd)) return fmt(rad(d), 3) + " rad";
    var n = dd, m = 180, g = gcd(n, m) || 1; n /= g; m /= g;
    if (n === 0) return "0";
    var num = n === 1 ? "π" : n === -1 ? "−π" : (n < 0 ? "−" : "") + Math.abs(n) + "π";
    return m === 1 ? num : num + "/" + m;
  };

  var EXS = { 0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1" };
  var EXC = { 0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0" };
  var EXT = { 0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: null };
  T.EX = { sen: EXS, cos: EXC, tan: EXT };

  // Reducción de cualquier ángulo (en grados) a una vuelta y a un ángulo de referencia agudo
  T.reducir = function (d) {
    var v = ((d % 360) + 360) % 360; v = Math.round(v * 1e9) / 1e9; if (v === 360) v = 0;
    var q, ref, eje = null;
    if (v === 0 || v === 180) { eje = v === 0 ? "+x" : "−x"; ref = 0; q = v === 0 ? 0 : 2; }
    else if (v === 90 || v === 270) { eje = v === 90 ? "+y" : "−y"; ref = 90; q = v === 90 ? 1 : 3; }
    else if (v < 90) { q = 1; ref = v; }
    else if (v < 180) { q = 2; ref = 180 - v; }
    else if (v < 270) { q = 3; ref = v - 180; }
    else { q = 4; ref = 360 - v; }
    var s = cero(Math.sin(rad(v))), c = cero(Math.cos(rad(v)));
    return { v: v, q: q, ref: ref, eje: eje, sen: s, cos: c, tan: c === 0 ? NaN : s / c, sSen: s > 0 ? 1 : s < 0 ? -1 : 0, sCos: c > 0 ? 1 : c < 0 ? -1 : 0 };
  };
  // Valor exacto (cadena) de sen, cos o tan de un ángulo, o null si no es de los notables
  T.exacto = function (fn, r) {
    var ref = Math.round(r.ref * 1e6) / 1e6, base = fn === "sen" ? EXS[ref] : fn === "cos" ? EXC[ref] : EXT[ref];
    if (ref !== 0 && ref !== 30 && ref !== 45 && ref !== 60 && ref !== 90) return null;
    var val = r[fn];
    if (fn === "tan" && r.cos === 0) return "no existe";
    if (val === 0) return "0";
    return (val < 0 ? "−" : "") + base;
  };

  // ------------------------------------------------------------
  // Resolución de triángulos: caso + datos → lista de soluciones
  //   lll: a, b, c · lal: b, c, A · ala: A, B, a · lla: a, b, A
  // ------------------------------------------------------------
  function ang(a, b, c) { var v = (b * b + c * c - a * a) / (2 * b * c); return deg(Math.acos(Math.max(-1, Math.min(1, v)))); }
  function area(b, c, A) { return 0.5 * b * c * Math.sin(rad(A)); }
  T.area = area;
  T.resolver = function (caso, v) {
    var sols = [], pasos = [], err = null, a, b, c, A, B, C;
    function sol(a, b, c, A, B, C) { sols.push({ a: a, b: b, c: c, A: A, B: B, C: C }); }
    if (caso === "lll") {
      a = v.a; b = v.b; c = v.c;
      if (!(a > 0 && b > 0 && c > 0)) err = "Los lados deben ser positivos.";
      else if (a >= b + c || b >= a + c || c >= a + b) err = "No existe ese triángulo: cada lado tiene que ser menor que la suma de los otros dos (aquí no se cumple la desigualdad triangular).";
      else {
        A = ang(a, b, c); B = ang(b, a, c); C = 180 - A - B;
        pasos.push("Teorema del coseno despejando el ángulo: cos A = (b² + c² − a²)/(2bc) = (" + fmt(b * b, 3) + " + " + fmt(c * c, 3) + " − " + fmt(a * a, 3) + ")/" + fmt(2 * b * c, 3) + " = " + fmt((b * b + c * c - a * a) / (2 * b * c), 4) + " → <b>A = " + fmt(A, 2) + "°</b>.");
        pasos.push("Igual con B: cos B = (a² + c² − b²)/(2ac) = " + fmt((a * a + c * c - b * b) / (2 * a * c), 4) + " → <b>B = " + fmt(B, 2) + "°</b>.");
        pasos.push("El tercer ángulo sale de que suman 180°: C = 180° − " + fmt(A, 2) + "° − " + fmt(B, 2) + "° = <b>" + fmt(C, 2) + "°</b>.");
        sol(a, b, c, A, B, C);
      }
    } else if (caso === "lal") {
      b = v.b; c = v.c; A = v.A;
      if (!(b > 0 && c > 0)) err = "Los lados deben ser positivos.";
      else if (!(A > 0 && A < 180)) err = "El ángulo debe estar entre 0° y 180°.";
      else {
        a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad(A)));
        B = ang(b, a, c); C = 180 - A - B;
        pasos.push("Teorema del coseno: a² = b² + c² − 2bc·cos A = " + fmt(b * b, 3) + " + " + fmt(c * c, 3) + " − 2·" + fmt(b, 3) + "·" + fmt(c, 3) + "·cos " + fmt(A, 2) + "° = " + fmt(a * a, 4) + " → <b>a = " + fmt(a, 3) + "</b>.");
        pasos.push("Para el siguiente ángulo conviene usar otra vez el coseno (el seno podría confundirte entre un ángulo agudo y uno obtuso): cos B = (a² + c² − b²)/(2ac) = " + fmt((a * a + c * c - b * b) / (2 * a * c), 4) + " → <b>B = " + fmt(B, 2) + "°</b>.");
        pasos.push("C = 180° − " + fmt(A, 2) + "° − " + fmt(B, 2) + "° = <b>" + fmt(C, 2) + "°</b>.");
        sol(a, b, c, A, B, C);
      }
    } else if (caso === "ala") {
      A = v.A; B = v.B; a = v.a;
      if (!(a > 0)) err = "El lado debe ser positivo.";
      else if (!(A > 0 && B > 0 && A + B < 180)) err = "Los dos ángulos deben ser positivos y sumar menos de 180°.";
      else {
        C = 180 - A - B; b = a * Math.sin(rad(B)) / Math.sin(rad(A)); c = a * Math.sin(rad(C)) / Math.sin(rad(A));
        pasos.push("El tercer ángulo: C = 180° − " + fmt(A, 2) + "° − " + fmt(B, 2) + "° = <b>" + fmt(C, 2) + "°</b>.");
        pasos.push("Teorema del seno: b = a·sen B / sen A = " + fmt(a, 3) + "·" + fmt(Math.sin(rad(B)), 4) + "/" + fmt(Math.sin(rad(A)), 4) + " = <b>" + fmt(b, 3) + "</b>.");
        pasos.push("Igualmente: c = a·sen C / sen A = " + fmt(a, 3) + "·" + fmt(Math.sin(rad(C)), 4) + "/" + fmt(Math.sin(rad(A)), 4) + " = <b>" + fmt(c, 3) + "</b>.");
        sol(a, b, c, A, B, C);
      }
    } else if (caso === "lla") {
      a = v.a; b = v.b; A = v.A;
      if (!(a > 0 && b > 0)) err = "Los lados deben ser positivos.";
      else if (!(A > 0 && A < 180)) err = "El ángulo debe estar entre 0° y 180°.";
      else {
        var sB = b * Math.sin(rad(A)) / a;
        pasos.push("Teorema del seno: sen B = b·sen A / a = " + fmt(b, 3) + "·" + fmt(Math.sin(rad(A)), 4) + "/" + fmt(a, 3) + " = " + fmt(sB, 4) + ".");
        if (sB > 1 + 1e-9) { err = "sen B sale mayor que 1: el lado a es demasiado corto y no llega a cerrar el triángulo. No hay ninguna solución."; }
        else {
          var B1 = deg(Math.asin(Math.min(1, sB))), B2 = 180 - B1, n = 0;
          [B1, B2].forEach(function (Bx, i) {
            if (i === 1 && Math.abs(B1 - 90) < 1e-7) return;
            if (A + Bx >= 180 - 1e-9) { pasos.push("B" + (i ? "₂" : "₁") + " = " + fmt(Bx, 2) + "° no vale: junto con A = " + fmt(A, 2) + "° pasaría de 180°."); return; }
            var Cx = 180 - A - Bx, cx = a * Math.sin(rad(Cx)) / Math.sin(rad(A));
            n++;
            pasos.push("Solución " + n + ": B = " + fmt(Bx, 2) + "°, C = " + fmt(Cx, 2) + "° y c = a·sen C/sen A = <b>" + fmt(cx, 3) + "</b>.");
            sol(a, b, cx, A, Bx, Cx);
          });
          if (!sols.length) err = "Ninguna de las dos posibilidades cierra el triángulo.";
        }
      }
    }
    return { sols: sols, pasos: pasos, err: err };
  };

  // ============================================================
  // RECTANGULO: triángulos semejantes y razones
  // ============================================================
  B.w.rectangulo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Dos triángulos rectángulos con el mismo ángulo");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 35, L: 9, k: 0.55 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Ángulo <i>α</i>", min: 5, max: 85, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Tamaño (grande)", min: 4, max: 10, step: 0.5, val: st.L, on: function (v) { st.L = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Tamaño (pequeño)", min: 0.2, max: 0.9, step: 0.05, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return "× " + fmt(v, 2); } });
    function tri(L, a, clase, borde, etiquetas) {
      var X = L * Math.cos(rad(a)), Y = L * Math.sin(rad(a));
      g.poligono([[0, 0], [X, 0], [X, Y]], { clase: clase, borde: borde });
      var m = Math.min(X, Y) * 0.14; g.polilinea([[X - m, 0], [X - m, m], [X, m]], { clase: "c-ink" });
      if (etiquetas) {
        g.texto(X + 0.15, Y / 2, "opuesto", { clase: "red", dy: 4 });
        g.texto(X / 2, -0.55, "adyacente", { clase: "pen", ancla: "middle" });
        g.texto(X / 2 - 0.25, Y / 2 + 0.2, "hipotenusa", { clase: "ok", ancla: "end" });
      }
      return { op: Y, ad: X, hip: L };
    }
    function pinta() {
      var a = st.a, L = st.L, L2 = L * st.k;
      g.rangoIso(L * 0.5, L * 0.32, L * 0.62);
      g.limpiar();
      var G = tri(L, a, "z-pen", "var(--pen)", true), P = tri(L2, a, "z-red", "var(--red)", false);
      g.arco(0, 0, L * 0.12, 0, a, { clase: "c-ink" });
      g.texto(L * 0.14, L * 0.04, "α = " + a + "°", { dx: 4, dy: -4, clase: "" });
      function fila(nombre, t) { return U.lec(nombre, "op " + fmt(t.op, 2) + " · hip " + fmt(t.hip, 2) + " · ady " + fmt(t.ad, 2)); }
      lectura.innerHTML = fila("Grande", G) + fila("Pequeño", P) +
        U.lec("sen α = opuesto/hipotenusa", fmt(G.op / G.hip, 4) + "  y  " + fmt(P.op / P.hip, 4), "red") +
        U.lec("cos α = adyacente/hipotenusa", fmt(G.ad / G.hip, 4) + "  y  " + fmt(P.ad / P.hip, 4), "pen") +
        U.lec("tan α = opuesto/adyacente", fmt(G.op / G.ad, 4) + "  y  " + fmt(P.op / P.ad, 4), "ok");
      pie.innerHTML = "Los dos triángulos tienen el mismo ángulo α, así que son <b>semejantes</b>: uno es una ampliación del otro. Las medidas de los lados cambian al mover los deslizadores de tamaño, pero <b>los cocientes (las razones) no</b>. Eso es lo que hace útil a la trigonometría: la razón sólo depende del ángulo.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 11, ymin: -1, ymax: 6, w: 640, h: 330, limpio: true, etiqueta: "Dos triángulos rectángulos semejantes con el mismo ángulo" });
    pinta();
  };

  // ============================================================
  // GONIOMETRICA: circunferencia y ondas de seno y coseno
  // ============================================================
  B.w.goniometrica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La circunferencia goniométrica");
    cuerpo.innerHTML = '<div class="gn-fila"><div class="w-plot gn-circ"></div><div class="gn-lect"><div class="lectura"></div></div></div><div data-chips class="chips"></div><div data-ctl></div><div class="w-plot gn-onda"></div><p class="w-pie"></p>';
    var st = { th: 50 }, g, g2, h, sl, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var NOT = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
    sl = U.slider(ctl, { et: "Ángulo <i>θ</i>", min: -360, max: 720, step: 1, val: st.th, on: function (v) { st.th = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    var an = U.animar(ctl, function (t, dt) { if (dt) { st.th = ((st.th + 36 * dt + 360) % 1080) - 360; sl.set(Math.round(st.th)); pinta(); } }, { auto: false });
    function pinta() {
      var th = st.th, r = T.reducir(th), s = Math.sin(rad(th)), c = Math.cos(rad(th)), t = Math.tan(rad(th));
      g.limpiar();
      g.arco(0, 0, 0.26, 0, th, { clase: "c-hl" });
      g.segmento(0, 0, c, s, { clase: "c-ink" });
      g.segmento(c, 0, c, s, { clase: "c-red" }).setAttribute("stroke-width", 4);
      g.segmento(0, 0, c, 0, { clase: "c-pen" }).setAttribute("stroke-width", 4);
      if (r.cos !== 0) { g.segmento(0, 0, 1, t, { clase: "c-ok", dash: "4 4" }); g.segmento(1, 0, 1, t, { clase: "c-ok" }).setAttribute("stroke-width", 4); }
      g.mover(h, c, s);
      g.texto(c, s / 2, "sen", { dx: c >= 0 ? 8 : -8, ancla: c >= 0 ? "start" : "end", clase: "red" });
      g.texto(c / 2, 0, "cos", { dy: s >= 0 ? 16 : -8, ancla: "middle", clase: "pen" });
      // onda
      g2.limpiar();
      var v = r.v;
      g2.segmento(v, -1.5, v, 1.5, { clase: "c-ink", dash: "4 4" });
      g2.punto(v, s, { r: 6, clase: "c-red" }); g2.punto(v, c, { r: 6, clase: "c-pen" });
      var exS = T.exacto("sen", r), exC = T.exacto("cos", r), exT = T.exacto("tan", r);
      lectura.innerHTML = U.lec("Ángulo", th + "° = " + T.piTxt(th) + (Math.abs(th) >= 360 ? " (≡ " + r.v + "° tras reducir)" : "")) +
        U.lec("Cuadrante", r.eje ? "sobre el eje " + r.eje : r.q + ".º cuadrante") +
        U.lec("sen θ (altura)", fmt(s, 4) + (exS && exS !== fmt(s, 4) ? "  =  " + exS : ""), "red") +
        U.lec("cos θ (abscisa)", fmt(c, 4) + (exC && exC !== fmt(c, 4) ? "  =  " + exC : ""), "pen") +
        U.lec("tan θ = sen/cos", r.cos === 0 ? "no existe" : fmt(t, 4) + (exT && exT !== fmt(t, 4) ? "  =  " + exT : ""), "ok");
      pie.innerHTML = "Arrastra el punto rojo por la circunferencia (o usa el deslizador). El punto es <b>(cos θ, sen θ)</b>: su abscisa es el coseno y su altura el seno. La recta vertical x = 1 recoge la <b>tangente</b>. Debajo ves cómo sen y cos se repiten cada 360° al dar vueltas.";
    }
    function fijoCirculo() {
      g.segmento(-1.5, 0, 1.5, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.5, 0, 1.5, { clase: "c-ink", capa: "fijo" });
      g.arco(0, 0, 1, 0, 360, { clase: "c-ink", capa: "fijo" });
      [[1, 0, "1"], [-1, 0, "−1"], [0, 1, "1"], [0, -1, "−1"]].forEach(function (p) { g.texto(p[0], p[1], p[2], { dx: p[0] === 1 ? 5 : p[0] === -1 ? -18 : 6, dy: p[1] === 1 ? 4 : p[1] === -1 ? 14 : 14, clase: "faint", capa: "fijo" }); });
      g.segmento(1, -1.5, 1, 1.5, { clase: "c-faint", dash: "3 5", capa: "fijo" });
      [["I", 0.62, 0.62], ["II", -0.62, 0.62], ["III", -0.62, -0.62], ["IV", 0.62, -0.62]].forEach(function (q) { g.texto(q[1], q[2], q[0], { ancla: "middle", dy: 5, clase: "faint", capa: "fijo" }); });
    }
    function fijoOnda() {
      g2.curva(function (x) { return Math.sin(rad(x)); }, { clase: "c-red", capa: "fijo", n: 240 });
      g2.curva(function (x) { return Math.cos(rad(x)); }, { clase: "c-pen", capa: "fijo", n: 240 });
      [0, 90, 180, 270, 360].forEach(function (a) { g2.segmento(a, -1.5, a, 1.5, { clase: "c-faint", dash: "2 5", capa: "fijo" }); g2.texto(a, 0, a + "°", { dy: 15, dx: a === 360 ? -14 : a === 0 ? 14 : 0, ancla: "middle", clase: "faint", capa: "fijo" }); });
      g2.texto(120, 1.2, "sen", { clase: "red", capa: "fijo" }); g2.texto(300, 0.9, "cos", { clase: "pen", capa: "fijo" });
    }
    g = new B.Plot(cuerpo.querySelector(".gn-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 360, h: 360, limpio: true, etiqueta: "Circunferencia goniométrica" });
    g.rangoIso(0, 0, 1.55);
    fijoCirculo();
    h = g.punto(1, 0, { capa: "top", r: 10, clase: "c-red" });
    g.arrastrar(h, function (x, y, tecla) {
      var nuevo;
      if (tecla) nuevo = Math.round(x);
      else { var raw = deg(Math.atan2(y, x)), k = Math.round((st.th - raw) / 360); nuevo = raw + 360 * k; }
      st.th = Math.max(-360, Math.min(720, Math.round(nuevo))); sl.set(st.th); pinta();
    }, { get: function () { return st.th; }, paso: 5, etiqueta: "Ángulo en la circunferencia" });
    g2 = new B.Plot(cuerpo.querySelector(".gn-onda"), { xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, w: 640, h: 230, sinX: true, etx: "θ", ety: "", etiqueta: "Gráfica de seno y coseno" });
    fijoOnda();
    U.fichas(cuerpo.querySelector("[data-chips]"), NOT.map(function (a) { return { k: String(a), t: a + "°" }; }), "", function (k) { st.th = +k; sl.set(st.th); pinta(); });
    pinta();
  };

  // ============================================================
  // RADIANES: el arco igual al radio
  // ============================================================
  B.w.radianes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un radián: el arco que mide lo mismo que el radio");
    cuerpo.innerHTML = '<div data-chips class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { n: 1 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Ángulo en radianes", min: 0.1, max: 6.28, step: 0.01, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var n = st.n, d = deg(n);
      g.limpiar();
      var k = 0;
      while (k < n) {
        var a0 = k, a1 = Math.min(k + 1, n);
        g.arco(0, 0, 1, deg(a0), deg(a1), { clase: k % 2 ? "c-red" : "c-pen" }).setAttribute("stroke-width", 6);
        var ang = rad(deg(a0));
        g.segmento(0, 0, Math.cos(ang), Math.sin(ang), { clase: "c-faint", dash: "3 4" });
        k++;
      }
      var af = rad(d); g.segmento(0, 0, Math.cos(af), Math.sin(af), { clase: "c-ink" });
      g.texto(0.5 * Math.cos(rad(deg(Math.min(n, 1)) / 2)), 0.5 * Math.sin(rad(deg(Math.min(n, 1)) / 2)), "r", { clase: "pen", ancla: "middle" });
      var pi_ = d / 180;
      lectura.innerHTML = U.lec("Ángulo en radianes", fmt(n, 3) + " rad") + U.lec("En grados", fmt(d, 2) + "°", "pen") + U.lec("Como múltiplo de π", fmt(pi_, 3) + "·π (= " + T.piTxt(Math.round(d * 100) / 100) + ")") + U.lec("Longitud del arco con r = 1", fmt(n, 3) + " (= ángulo en rad · r)", "ok") + U.lec("Veces que cabe el radio en el arco", fmt(n, 2), "red");
      pie.innerHTML = "<b>1 radián</b> es el ángulo cuyo arco mide exactamente lo mismo que el radio (≈ 57,3°). Una vuelta entera, cuyo arco mide 2π radios, son <b>2π rad = 360°</b>; por eso <b>π rad = 180°</b>. Para convertir: grados × π/180 = radianes, y radianes × 180/π = grados.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 360, h: 340, limpio: true, etiqueta: "Arcos de longitud igual al radio sobre una circunferencia" });
    g.rangoIso(0, 0, 1.45);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo" });
    g.segmento(-1.4, 0, 1.4, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.4, 0, 1.4, { clase: "c-ink", capa: "fijo" });
    U.fichas(cuerpo.querySelector("[data-chips]"), [{ k: "1", t: "1 rad" }, { k: String(Math.PI / 6), t: "π/6" }, { k: String(Math.PI / 4), t: "π/4" }, { k: String(Math.PI / 3), t: "π/3" }, { k: String(Math.PI / 2), t: "π/2" }, { k: String(Math.PI), t: "π" }, { k: String(1.5 * Math.PI), t: "3π/2" }, { k: String(2 * Math.PI), t: "2π" }], "", function (k) { st.n = parseFloat(k); sl.set(st.n); pinta(); });
    pinta();
  };

  // ============================================================
  // REDUCTOR: reducir cualquier ángulo al primer cuadrante
  // ============================================================
  B.w.reductor = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Reductor al primer cuadrante");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot rd-circ"></div>';
    var st = { txt: "210", unidad: "deg" }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var lab = document.createElement("label"); lab.className = "bx-campo";
    lab.innerHTML = '<span class="bx-et">Ángulo =</span><input type="text" autocomplete="off" spellcheck="false" style="width:150px" value="210" aria-label="Ángulo">';
    ctl.appendChild(lab); var inp = lab.querySelector("input");
    var uni = document.createElement("div"); ctl.appendChild(uni);
    var PRE = [["210", "deg"], ["315", "deg"], ["120", "deg"], ["-60", "deg"], ["1110", "deg"], ["150", "deg"], ["7pi/6", "rad"], ["5pi/3", "rad"], ["-pi/4", "rad"], ["11pi/2", "rad"]];
    function pinta() {
      var x = B.Mate.numero(st.txt);
      if (isNaN(x)) { lectura.innerHTML = U.lec("Revisa lo que has escrito", "usa un número (210, -60) o π en radianes (7pi/6)", "red"); pasos.innerHTML = ""; return; }
      var d = st.unidad === "rad" ? deg(x) : x;
      d = Math.round(d * 1e7) / 1e7;
      var r = T.reducir(d), h = "<ol class='w-ol'>";
      var vueltas = Math.floor(d / 360 + 1e-12);
      if (st.unidad === "rad") h += "<li>Pasamos a grados: " + fmt(x, 4) + " rad × 180/π = <b>" + fmt(d, 2) + "°</b>.</li>";
      if (d < 0 || d >= 360) h += "<li>Reducimos a una sola vuelta (sumando o restando 360°): " + fmt(d, 2) + "° ≡ <b>" + fmt(r.v, 2) + "°</b>" + (d >= 360 ? " (se han quitado " + vueltas + " vuelta" + (vueltas === 1 ? "" : "s") + ")" : " (se ha sumado " + Math.ceil(-d / 360) + " vuelta" + (Math.ceil(-d / 360) === 1 ? "" : "s") + ")") + ".</li>";
      if (r.eje) h += "<li>El ángulo cae justo sobre el eje " + r.eje + ": no hay triángulo; se leen las coordenadas del punto de la circunferencia: (cos, sen) = (" + fmt(r.cos, 0) + ", " + fmt(r.sen, 0) + ").</li>";
      else {
        h += "<li>Está en el <b>" + r.q + ".º cuadrante</b>, donde sen es " + (r.sSen > 0 ? "positivo" : "negativo") + " y cos es " + (r.sCos > 0 ? "positivo" : "negativo") + " (y tan " + (r.sSen * r.sCos > 0 ? "positiva" : "negativa") + ").</li>";
        h += "<li>El <b>ángulo de referencia</b> (el agudo que forma con el eje X) es " + ({ 1: fmt(r.v, 2) + "°", 2: "180° − " + fmt(r.v, 2) + "° = " + fmt(r.ref, 2) + "°", 3: fmt(r.v, 2) + "° − 180° = " + fmt(r.ref, 2) + "°", 4: "360° − " + fmt(r.v, 2) + "° = " + fmt(r.ref, 2) + "°" }[r.q]) + ".</li>";
        h += "<li>Entonces sen = " + (r.sSen < 0 ? "−" : "+") + "sen " + fmt(r.ref, 2) + "°, cos = " + (r.sCos < 0 ? "−" : "+") + "cos " + fmt(r.ref, 2) + "° y tan = " + (r.sSen * r.sCos < 0 ? "−" : "+") + "tan " + fmt(r.ref, 2) + "°.</li>";
      }
      h += "</ol>";
      pasos.innerHTML = h;
      var eS = T.exacto("sen", r), eC = T.exacto("cos", r), eT = T.exacto("tan", r);
      lectura.innerHTML = U.lec("Ángulo reducido", fmt(r.v, 2) + "° = " + T.piTxt(r.v)) + U.lec("sen", (eS ? eS + "  ≈ " : "") + fmt(r.sen, 4), "red") + U.lec("cos", (eC ? eC + "  ≈ " : "") + fmt(r.cos, 4), "pen") + U.lec("tan", r.cos === 0 ? "no existe" : (eT ? eT + "  ≈ " : "") + fmt(r.tan, 4), "ok");
      g.limpiar();
      g.arco(0, 0, 0.3, 0, r.v || 0.001, { clase: "c-hl" });
      g.segmento(0, 0, r.cos, r.sen, { clase: "c-ink" }).setAttribute("stroke-width", 3);
      if (!r.eje) { g.segmento(r.cos, 0, r.cos, r.sen, { clase: "c-red", dash: "4 3" }); g.segmento(0, 0, r.cos, 0, { clase: "c-pen" }).setAttribute("stroke-width", 3); }
      g.punto(r.cos, r.sen, { r: 6, clase: "c-red" });
      if (!r.eje) {
        var m = r.q === 1 ? 0 : r.q === 2 ? 180 : r.q === 3 ? 180 : 360, a0 = Math.min(r.v, m), a1 = Math.max(r.v, m);
        g.arco(0, 0, 0.5, a0, a1, { clase: "c-ok" }).setAttribute("stroke-width", 4);
        g.texto(0.62 * Math.cos(rad((a0 + a1) / 2)), 0.62 * Math.sin(rad((a0 + a1) / 2)), "ref " + fmt(r.ref, 1) + "°", { ancla: "middle", dy: 4, clase: "ok" });
      }
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 360, h: 340, limpio: true, etiqueta: "El ángulo en la circunferencia y su ángulo de referencia" });
    g.rangoIso(0, 0, 1.45);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo" });
    g.segmento(-1.4, 0, 1.4, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.4, 0, 1.4, { clase: "c-ink", capa: "fijo" });
    U.fichas(uni, [{ k: "deg", t: "grados" }, { k: "rad", t: "radianes" }], st.unidad, function (k) { st.unidad = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[0].replace("pi", "π").replace("-", "−") + (p[1] === "deg" ? "°" : " rad") }; }), "", function (k) {
      var p = PRE[+k]; st.txt = p[0]; st.unidad = p[1]; inp.value = p[0];
      Array.prototype.forEach.call(uni.children, function (c) { var on = c.getAttribute("data-k") === st.unidad; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      pinta();
    });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // AMBIGUO: el caso «lado, lado, ángulo opuesto»
  // ============================================================
  B.w.ambiguo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El caso ambiguo: ¿cuántos triángulos salen?");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: 35, b: 8, a: 6 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Ángulo <i>A</i>", min: 15, max: 150, step: 1, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Lado <i>b</i> (pegado a A)", min: 3, max: 10, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Lado <i>a</i> (opuesto a A)", min: 1, max: 12, step: 0.1, val: st.a, on: function (v) { st.a = Math.round(v * 10) / 10; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var A = st.A, b = st.b, a = st.a, Cx = b * Math.cos(rad(A)), Cy = b * Math.sin(rad(A)), h = Cy;
      g.rangoIso(4.2, 3.2, 6.3);
      g.limpiar();
      g.segmento(-1, 0, 16, 0, { clase: "c-ink" });
      g.arco(Cx, Cy, a, 0, 360, { clase: "c-faint", dash: "5 4" });
      g.segmento(0, 0, Cx, Cy, { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.segmento(Cx, Cy, Cx, 0, { clase: "c-ok", dash: "3 4" });
      g.texto(Cx, Cy / 2, "h", { dx: 6, clase: "ok" });
      g.arco(0, 0, 0.9, 0, A, { clase: "c-hl" }); g.texto(1.0, 0.25, "A", { clase: "" });
      g.punto(0, 0, { r: 5, clase: "c-ink" }); g.texto(0, 0, "A", { dx: -14, dy: 18 });
      g.punto(Cx, Cy, { r: 5, clase: "c-pen" }); g.texto(Cx, Cy, "C", { dx: -4, dy: -10 });
      var D = a * a - h * h, xs = [], sols = [];
      if (D >= -1e-9) { var q = Math.sqrt(Math.max(D, 0)); xs = D < 1e-9 ? [Cx] : [Cx - q, Cx + q]; }
      var validas = 0;
      xs.forEach(function (x, i) {
        var ok = x > 1e-6;
        if (ok) validas++;
        g.polilinea([[0, 0], [x, 0], [Cx, Cy]], { clase: ok ? (i ? "c-red" : "c-ok") : "c-faint", dash: ok ? null : "3 4" });
        g.punto(x, 0, { r: 6, clase: ok ? (i ? "c-red" : "c-ok") : "c-faint" });
        g.texto(x, 0, ok ? "B" : "×", { dx: 0, dy: 20, ancla: "middle", clase: ok ? (i ? "red" : "ok") : "faint" });
      });
      var cual, cl;
      if (validas === 0) { cual = D < 0 ? "ninguno (a es más corto que la altura h)" : "ninguno (el punto B caería «detrás» de A)"; cl = "red"; }
      else if (validas === 1) { cual = Math.abs(D) < 1e-6 ? "uno (rectángulo en B: a = h)" : "uno"; cl = "ok"; }
      else { cual = "dos"; cl = "pen"; }
      var hTxt = fmt(h, 3), cond = A < 90 ? (a < h - 1e-9 ? "a &lt; h" : Math.abs(a - h) < 1e-9 ? "a = h" : a < b ? "h &lt; a &lt; b" : "a ≥ b") : (a <= b ? "a ≤ b (A obtuso)" : "a &gt; b (A obtuso)");
      lectura.innerHTML = U.lec("Altura h = b·sen A", hTxt, "ok") + U.lec("Situación", cond) + U.lec("Triángulos posibles", cual, cl) + U.lec("sen B = b·sen A / a", fmt(b * Math.sin(rad(A)) / a, 4), b * Math.sin(rad(A)) / a > 1 ? "red" : "");
      pie.innerHTML = "Se conocen el ángulo <b>A</b>, el lado <b>b</b> (que sale de A hacia C) y el lado <b>a</b> (opuesto a A). Para colocar B se traza una circunferencia de radio a alrededor de C: <b>donde corta a la línea base está B</b>. Puede cortar en 0, 1 o 2 puntos. Con A agudo: si a &lt; h no hay triángulo, si a = h hay uno (rectángulo), si h &lt; a &lt; b hay <b>dos</b> y si a ≥ b hay uno. Si A es obtuso, solo vale a &gt; b (uno).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -2, xmax: 12, ymin: -3, ymax: 8, w: 640, h: 340, limpio: true, etiqueta: "Construcción del caso ambiguo del teorema del seno" });
    pinta();
  };

  // ============================================================
  // TRIANGULO: resolutor de triángulos con dibujo
  // ============================================================
  B.w.triangulo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Resuelve un triángulo cualquiera");
    cuerpo.innerHTML = '<div data-caso class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura"></div><div class="w-pasos"></div>';
    var CASOS = {
      lll: { t: "Tres lados", campos: [["a", "a", 7], ["b", "b", 5], ["c", "c", 8]] },
      lal: { t: "Dos lados y el ángulo entre ellos", campos: [["b", "b", 7], ["c", "c", 5], ["A", "A (°)", 60]] },
      ala: { t: "Dos ángulos y un lado", campos: [["A", "A (°)", 30], ["B", "B (°)", 45], ["a", "a", 6]] },
      lla: { t: "Dos lados y un ángulo opuesto a uno", campos: [["a", "a", 8], ["b", "b", 10], ["A", "A (°)", 40]] }
    };
    var st = { caso: "lal", v: {} }, g, entradas = {};
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    function montaCampos() {
      ctl.innerHTML = ""; entradas = {};
      CASOS[st.caso].campos.forEach(function (c) {
        var l = document.createElement("label"); l.className = "bx-campo";
        l.innerHTML = '<span class="bx-et">' + c[1] + ' =</span><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" style="width:80px" value="' + c[2] + '" aria-label="' + c[1] + '">';
        ctl.appendChild(l);
        var i = l.querySelector("input"); entradas[c[0]] = i; i.addEventListener("input", pinta);
      });
    }
    function pinta() {
      var v = {}, malo = null;
      CASOS[st.caso].campos.forEach(function (c) { var x = B.Mate.numero(entradas[c[0]].value); if (isNaN(x)) malo = c[1]; v[c[0]] = x; });
      g.limpiar();
      if (malo) { lectura.innerHTML = U.lec("Revisa", "escribe un número en «" + malo + "»", "red"); pasos.innerHTML = ""; return; }
      var res = T.resolver(st.caso, v);
      if (res.err) { lectura.innerHTML = U.lec("No hay triángulo", res.err, "red"); pasos.innerHTML = ""; return; }
      var xs = [], ys = [];
      res.sols.forEach(function (s) {
        var Cx = s.b * Math.cos(rad(s.A)), Cy = s.b * Math.sin(rad(s.A));
        xs.push(0, s.c, Cx); ys.push(0, Cy);
      });
      var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2, cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
      var ancho = (Math.max.apply(null, xs) - Math.min.apply(null, xs)), alto = Math.max.apply(null, ys) - Math.min.apply(null, ys);
      g.rangoIso(cx, cy, Math.max(alto * 0.75, ancho * 0.75 * 0.52, 1) + 0.6);
      res.sols.forEach(function (s, i) {
        var Cx = s.b * Math.cos(rad(s.A)), Cy = s.b * Math.sin(rad(s.A)), cl = i ? "z-red" : "z-pen", bd = i ? "var(--red)" : "var(--pen)";
        g.poligono([[0, 0], [s.c, 0], [Cx, Cy]], { clase: cl, borde: bd, dash: i ? "6 4" : null });
        if (i === 0 || res.sols.length === 1) {
          g.texto(0, 0, "A " + fmt(s.A, 1) + "°", { dx: 4, dy: 16 }); g.texto(s.c, 0, "B " + fmt(s.B, 1) + "°", { dx: -4, dy: 16, ancla: "end" });
          g.texto(Cx, Cy, "C " + fmt(s.C, 1) + "°", { dy: -8, ancla: "middle" });
          g.texto(s.c / 2, 0, "c = " + fmt(s.c, 2), { dy: 30, ancla: "middle", clase: "ok" });
          g.texto((s.c + Cx) / 2, Cy / 2, "a = " + fmt(s.a, 2), { dx: 12, clase: "red" });
          g.texto(Cx / 2, Cy / 2, "b = " + fmt(s.b, 2), { dx: -12, ancla: "end", clase: "pen" });
        }
      });
      lectura.innerHTML = res.sols.map(function (s, i) {
        var S = T.area(s.b, s.c, s.A), p = (s.a + s.b + s.c) / 2, her = Math.sqrt(Math.max(0, p * (p - s.a) * (p - s.b) * (p - s.c)));
        return (res.sols.length > 1 ? U.lec("Solución " + (i + 1), "") : "") + U.lec("Lados a · b · c", fmt(s.a, 3) + " · " + fmt(s.b, 3) + " · " + fmt(s.c, 3), "pen") + U.lec("Ángulos A · B · C", fmt(s.A, 2) + "° · " + fmt(s.B, 2) + "° · " + fmt(s.C, 2) + "°", "red") + U.lec("Área ½·b·c·sen A", fmt(S, 3), "ok") + U.lec("Área (fórmula de Herón)", fmt(her, 3));
      }).join("");
      pasos.innerHTML = "<ol class='w-ol'>" + res.pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol>" + (res.sols.length === 2 ? "<p>Hay <b>dos triángulos</b> porque el dato es «lado, lado, ángulo opuesto a uno de ellos»: el ángulo B puede ser agudo o su suplementario (obtuso). El segundo se dibuja discontinuo.</p>" : "");
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -1, xmax: 12, ymin: -2, ymax: 8, w: 640, h: 340, limpio: true, etiqueta: "Triángulo resuelto" });
    U.fichas(cuerpo.querySelector("[data-caso]"), Object.keys(CASOS).map(function (k) { return { k: k, t: CASOS[k].t }; }), st.caso, function (k) { st.caso = k; montaCampos(); pinta(); });
    montaCampos(); pinta();
  };
})(window);
