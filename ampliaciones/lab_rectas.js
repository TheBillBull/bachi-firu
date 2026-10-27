/* ============================================================
   Bachi para Firu · laboratorio de rectas (Matemáticas I, tema 8)
   motor B.lab.recta + recta2p · ecgeneral · posiciones · distpunto
   mediatriz · ptosnotables · region
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, AL = B.lab.alg, Q = AL.Q, qtxt = AL.qtxt, qnum = AL.qnum;
  B.lab = B.lab || {};
  var L = B.lab.recta = {};
  var R = Math.PI / 180;

  // ------------------------------------------------------------
  // Fracciones sencillas
  // ------------------------------------------------------------
  function qadd(a, b) { return Q(a.n * b.d + b.n * a.d, a.d * b.d); }
  function qsub(a, b) { return Q(a.n * b.d - b.n * a.d, a.d * b.d); }
  function qmul(a, b) { return Q(a.n * b.n, a.d * b.d); }
  function qdiv(a, b) { return Q(a.n * b.d, a.d * b.n); }
  function qneg(a) { return Q(-a.n, a.d); }
  function qcero(a) { return a.n === 0; }
  function fq(x) { return Q(Math.round(x * 2), 2); }           // coordenadas con arrastre a 0,5
  function mcm(a, b) { return a / AL.gcd(a, b) * b; }

  // ------------------------------------------------------------
  // Una recta Ax + By + C = 0 con coeficientes enteros primitivos
  // ------------------------------------------------------------
  function normaliza(A, B_, C) {
    var d = mcm(mcm(A.d, B_.d), C.d), a = A.n * (d / A.d), b = B_.n * (d / B_.d), c = C.n * (d / C.d), g = AL.gcd(AL.gcd(a, b), c) || 1;
    a /= g; b /= g; c /= g;
    if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
    return { A: a, B: b, C: c };
  }
  L.desdePuntos = function (P, Qp) {                       // puntos como pares de fracciones
    var v = [qsub(Qp[0], P[0]), qsub(Qp[1], P[1])];
    if (qcero(v[0]) && qcero(v[1])) return null;
    var A = v[1], B_ = qneg(v[0]), C = qneg(qadd(qmul(A, P[0]), qmul(B_, P[1])));
    var r = normaliza(A, B_, C); r.P = P; r.v = v; return r;
  };
  L.desdeGeneral = function (A, B_, C) {
    if (A === 0 && B_ === 0) return null;
    var r = { A: A, B: B_, C: C };
    // punto y vector director a partir de la general
    var P = A !== 0 ? [Q(-C, A), Q(0)] : [Q(0), Q(-C, B_)];
    r.P = P; r.v = [Q(-B_), Q(A)];
    return r;
  };
  function signo(n) { return n < 0 ? " − " : " + "; }
  function coef(n, v) { var a = Math.abs(n); return (a === 1 ? "" : String(a)) + v; }
  L.txtGeneral = function (r) {
    var s = "";
    if (r.A !== 0) s += (r.A < 0 ? "−" : "") + coef(r.A, "x");
    if (r.B !== 0) s += (s ? signo(r.B) : (r.B < 0 ? "−" : "")) + coef(r.B, "y");
    if (r.C !== 0) s += (s ? signo(r.C) : (r.C < 0 ? "−" : "")) + Math.abs(r.C);
    return s + " = 0";
  };
  function monomio(q, v, primero) {
    if (qcero(q)) return "";
    var neg = q.n < 0, ab = neg ? qneg(q) : q, c = (ab.n === 1 && ab.d === 1 && v) ? "" : (ab.d === 1 ? String(ab.n) : (v ? "(" + ab.n + "/" + ab.d + ")" : ab.n + "/" + ab.d));
    return (primero ? (neg ? "−" : "") : (neg ? " − " : " + ")) + c + v;
  }
  L.pendiente = function (r) { return r.B === 0 ? null : Q(-r.A, r.B); };
  L.txtExplicita = function (r) {
    if (r.B === 0) return "x = " + qtxt(Q(-r.C, r.A));
    var m = Q(-r.A, r.B), n = Q(-r.C, r.B), s = monomio(m, "x", true);
    s += monomio(n, "", !s);
    return "y = " + (s || "0");
  };
  L.angulo = function (r) { if (r.B === 0) return 90; var t = Math.atan(-r.A / r.B) / R; return t < 0 ? t + 180 : t; };
  function par(P) { return "(" + qtxt(P[0]) + ", " + qtxt(P[1]) + ")"; }
  function xmenos(c, v) { return qcero(c) ? v : "(" + v + (c.n > 0 ? " − " + qtxt(c) : " + " + qtxt(qneg(c))) + ")"; }
  function sumaT(c, v, t) { var s = qcero(c) ? "" : qtxt(c); var vt = qcero(v) ? "" : (v.n === 1 && v.d === 1 ? "t" : v.n === -1 && v.d === 1 ? "−t" : qtxt(v, true) + "t"); return (s ? s + (vt ? (v.n < 0 ? " − " + (vt.charAt(0) === "−" ? vt.slice(1) : vt) : " + " + vt) : "") : vt) || "0"; }
  L.formas = function (r) {
    var P = r.P, v = r.v, f = {};
    f.vectorial = "(x, y) = " + par(P) + " + t·" + par(v);
    f.parametricas = "x = " + sumaT(P[0], v[0]) + " · y = " + sumaT(P[1], v[1]);
    f.continua = qcero(v[0]) ? "x = " + qtxt(P[0]) : qcero(v[1]) ? "y = " + qtxt(P[1]) : "(x " + (P[0].n > 0 ? "− " + qtxt(P[0]) : P[0].n < 0 ? "+ " + qtxt(qneg(P[0])) : "") + ")/" + qtxt(v[0], true) + " = (y " + (P[1].n > 0 ? "− " + qtxt(P[1]) : P[1].n < 0 ? "+ " + qtxt(qneg(P[1])) : "") + ")/" + qtxt(v[1], true);
    f.continua = f.continua.replace("(x )", "x").replace("(y )", "y");
    f.general = L.txtGeneral(r);
    f.explicita = L.txtExplicita(r);
    var m = L.pendiente(r);
    f.pendiente = m ? qtxt(m) : "no tiene (recta vertical)";
    f.puntoPendiente = m ? "y " + (P[1].n > 0 ? "− " + qtxt(P[1]) : P[1].n < 0 ? "+ " + qtxt(qneg(P[1])) : "") + " = " + qtxt(m, true) + "·(x " + (P[0].n > 0 ? "− " + qtxt(P[0]) : P[0].n < 0 ? "+ " + qtxt(qneg(P[0])) : "") + ")" : "—";
    f.puntoPendiente = f.puntoPendiente.replace("y  =", "y =").replace("(x )", "x");
    function den(q) { return q.d === 1 && q.n > 0 ? String(q.n) : "(" + qtxt(q) + ")"; }
    f.segmentaria = (r.A !== 0 && r.B !== 0 && r.C !== 0) ? "x/" + den(Q(-r.C, r.A)) + " + y/" + den(Q(-r.C, r.B)) + " = 1" : "no existe (pasa por el origen o es paralela a un eje)";
    function ent(n) { return String(n).replace("-", "−"); }
    f.normal = "(" + ent(r.A) + ", " + ent(r.B) + ")";
    f.director = "(" + ent(-r.B) + ", " + ent(r.A) + ")";
    f.corteX = r.A !== 0 ? "(" + qtxt(Q(-r.C, r.A)) + ", 0)" : "no corta al eje X";
    f.corteY = r.B !== 0 ? "(0, " + qtxt(Q(-r.C, r.B)) + ")" : "no corta al eje Y";
    return f;
  };

  // Lectura de una expresión lineal en x e y: devuelve [c, a, b] (c + a·x + b·y) con fracciones exactas
  function limpia(src) {
    var s = String(src).replace(/\s+/g, "").replace(/[−–—]/g, "-").replace(/[·×]/g, "*").replace(/,/g, ".").replace(/X/g, "x").replace(/Y/g, "y");
    if (/[^0-9xy+\-*\/().=]/.test(s)) throw new Error("solo se admiten números, x, y y los signos + − * / ( ) =");
    return s;
  }
  L.lineal = function (src) {
    var t = limpia(src), i = 0;
    if (!t) throw new Error("falta una expresión");
    function peek() { return t.charAt(i); }
    function expr() { var r = term(); while (peek() === "+" || peek() === "-") { var op = t.charAt(i++), q = term(); r = suma(r, q, op === "+" ? 1 : -1); } return r; }
    function suma(a, b, sg) { var sq = Q(sg); return [qadd(a[0], qmul(b[0], sq)), qadd(a[1], qmul(b[1], sq)), qadd(a[2], qmul(b[2], sq))]; }
    function es(a) { return qcero(a[1]) && qcero(a[2]); }
    function mul(a, b) { if (es(a)) return [qmul(a[0], b[0]), qmul(a[0], b[1]), qmul(a[0], b[2])]; if (es(b)) return [qmul(b[0], a[0]), qmul(b[0], a[1]), qmul(b[0], a[2])]; throw new Error("la ecuación debe ser de primer grado (no se puede multiplicar x por y ni elevar al cuadrado)"); }
    function term() {
      var r = unario();
      for (;;) {
        var c = peek();
        if (c === "*") { i++; r = mul(r, unario()); }
        else if (c === "/") { i++; var d = unario(); if (!es(d) || qcero(d[0])) throw new Error("solo se puede dividir entre un número distinto de 0"); r = [qdiv(r[0], d[0]), qdiv(r[1], d[0]), qdiv(r[2], d[0])]; }
        else if (c === "x" || c === "y" || c === "(") r = mul(r, atomo());
        else break;
      }
      return r;
    }
    function unario() { if (peek() === "-") { i++; var u = unario(); return [qneg(u[0]), qneg(u[1]), qneg(u[2])]; } if (peek() === "+") { i++; return unario(); } return atomo(); }
    function atomo() {
      var c = peek();
      if (c === "(") { i++; var r = expr(); if (peek() !== ")") throw new Error("falta cerrar un paréntesis"); i++; return r; }
      if (c === "x") { i++; return [Q(0), Q(1), Q(0)]; }
      if (c === "y") { i++; return [Q(0), Q(0), Q(1)]; }
      var m = /^[0-9]+(\.[0-9]+)?/.exec(t.slice(i)); if (!m) throw new Error("no entiendo «" + (t.slice(i, i + 3) || "el final") + "»");
      i += m[0].length; var p = m[0].split("."), dec = p[1] ? p[1].length : 0;
      return [Q(parseInt(p[0] + (p[1] || ""), 10), Math.pow(10, dec)), Q(0), Q(0)];
    }
    var r = expr(); if (i < t.length) throw new Error("no entiendo «" + t.slice(i, i + 3) + "»");
    return r;
  };
  // Ecuación completa «lado = lado» → recta con coeficientes enteros primitivos
  L.leer = function (src) {
    var s = limpia(src);
    if (!s) throw new Error("escribe una ecuación");
    var partes = s.split("="); if (partes.length > 2) throw new Error("hay más de un signo =");
    var a = L.lineal(partes[0]), b = partes.length === 2 ? L.lineal(partes[1]) : [Q(0), Q(0), Q(0)];
    var C = qsub(a[0], b[0]), Ax = qsub(a[1], b[1]), By = qsub(a[2], b[2]);
    if (qcero(Ax) && qcero(By)) throw new Error(qcero(C) ? "esa igualdad es 0 = 0 (no define una recta)" : "eso no es la ecuación de una recta");
    var r = normaliza(Ax, By, C);
    return L.desdeGeneral(r.A, r.B, r.C);
  };

  // Intersección de dos rectas generales: { tipo, punto }
  L.posicion = function (r, s) {
    var D = r.A * s.B - s.A * r.B;
    if (D !== 0) { return { tipo: "secantes", punto: [Q(r.B * s.C - s.B * r.C, D), Q(s.A * r.C - r.A * s.C, D)] }; }
    var prop = r.A * s.C === s.A * r.C && r.B * s.C === s.B * r.C;
    return { tipo: prop ? "coincidentes" : "paralelas" };
  };
  L.distPuntoRecta = function (p, r) { return Math.abs(r.A * p[0] + r.B * p[1] + r.C) / Math.hypot(r.A, r.B); };
  L.pie = function (p, r) { var k = (r.A * p[0] + r.B * p[1] + r.C) / (r.A * r.A + r.B * r.B); return [p[0] - r.A * k, p[1] - r.B * k]; };

  // ------------------------------------------------------------
  // Auxiliares de interfaz
  // ------------------------------------------------------------
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }
  function asa(g, get, set, clase, etq, lim) {
    var h = g.punto(0, 0, { capa: "top", r: 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) { if (tecla) set(snap(x, lim), get()[1]); else set(snap(x, lim), snap(y, lim)); }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function plano(host, etq, semi, w, h) {
    var g = new B.Plot(host, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: w || 520, h: h || 380, etx: "x", ety: "y", etiqueta: etq });
    g.rangoIso(0, 0, semi || 6.5); return g;
  }
  function recta(g, r, clase, dash) {         // dibuja la recta completa
    var e = 40, x0 = -e, x1 = e;
    if (r.B === 0) return g.segmento(-r.C / r.A, -e, -r.C / r.A, e, { clase: clase, dash: dash });
    return g.segmento(x0, (-r.A * x0 - r.C) / r.B, x1, (-r.A * x1 - r.C) / r.B, { clase: clase, dash: dash });
  }
  function campo(host, et, val, ancho) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 180) + 'px" value="' + val + '" aria-label="' + et.replace(/<[^>]+>/g, "") + '">';
    host.appendChild(l); return l.querySelector("input");
  }
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function etq(g, p, t, clase, dx, dy) { g.texto(p[0], p[1], t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase }); }

  // ============================================================
  // RECTA2P: todas las ecuaciones de una recta a partir de dos puntos
  // ============================================================
  B.w.recta2p = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Todas las ecuaciones de una recta");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="rc-tabla"></div><p class="w-pie"></p>';
    var st = { A: [1, 1], B: [3, 5] }, g, hA, hB, tabla = cuerpo.querySelector(".rc-tabla"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      g.limpiar(); g.mover(hA, st.A[0], st.A[1]); g.mover(hB, st.B[0], st.B[1]);
      var r = L.desdePuntos([fq(st.A[0]), fq(st.A[1])], [fq(st.B[0]), fq(st.B[1])]);
      if (!r) { tabla.innerHTML = "<p class='red'>Los dos puntos coinciden: mueve uno de ellos para definir una recta.</p>"; return; }
      var f = L.formas(r);
      recta(g, r, "c-ok").setAttribute("stroke-width", 3);
      g.punto(st.A[0], st.A[1], { r: 5, clase: "c-pen" }); g.punto(st.B[0], st.B[1], { r: 5, clase: "c-pen" });
      U.flecha(g, st.A[0], st.A[1], st.A[0] + qnum(r.v[0]), st.A[1] + qnum(r.v[1]), { clase: "c-red" });
      etq(g, st.A, "A", "pen"); etq(g, st.B, "B", "pen");
      tabla.innerHTML = "<table class='fo-t rc-t'><tbody>" +
        [["Vector director", par(r.v)], ["Ecuación vectorial", f.vectorial], ["Ecuaciones paramétricas", f.parametricas], ["Ecuación continua", f.continua], ["Ecuación general", f.general], ["Pendiente m", f.pendiente], ["Ecuación explícita", f.explicita], ["Punto-pendiente", f.puntoPendiente], ["Ecuación segmentaria", f.segmentaria], ["Vector normal (A, B)", f.normal], ["Cortes con los ejes", f.corteX + " · " + f.corteY], ["Ángulo con el eje X", fmt(L.angulo(r), 2) + "°"]].map(function (a, i) { return "<tr class='" + (i === 4 || i === 6 ? "ok" : "") + "'><th>" + a[0] + "</th><td>" + a[1] + "</td></tr>"; }).join("") + "</tbody></table>";
      pie.innerHTML = "Arrastra <b>A</b> y <b>B</b>: la recta pasa por los dos y todas las ecuaciones describen <b>la misma recta</b>. El vector director es AB = B − A (flecha roja, dibujada desde A).";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Recta por dos puntos", 6.5);
    hA = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Punto A", 7); hB = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Punto B", 7);
    pinta();
  };

  // ============================================================
  // ECGENERAL: escribe una ecuación y se obtiene todo lo demás
  // ============================================================
  B.w.ecgeneral = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Pasa de una forma a otra: escribe tu ecuación");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot rd-circ"></div><p class="w-pie"></p>';
    var PRE = ["3x+4y-6=0", "y=2x-1", "y-2=-1/2(x-1)", "(x-1)/3=(y-2)/4", "x=3", "2y-4=0", "x/4+y/2=1", "2(x+1)=3y-5"];
    var st = { txt: PRE[0] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var inp = campo(ctl, "Recta:", st.txt, 260);
    function pinta() {
      var r; try { r = L.leer(st.txt); } catch (e) { lectura.innerHTML = fil("Revisa lo que has escrito", e.message, "red"); g.limpiar(); return; }
      g.limpiar();
      var f = L.formas(r);
      recta(g, r, "c-ok").setAttribute("stroke-width", 3);
      var pP = [qnum(r.P[0]), qnum(r.P[1])]; g.punto(pP[0], pP[1], { r: 5, clase: "c-pen" });
      U.flecha(g, pP[0], pP[1], pP[0] + r.v[0].n / r.v[0].d, pP[1] + r.v[1].n / r.v[1].d, { clase: "c-red" });
      var nrm = Math.hypot(r.A, r.B); U.flecha(g, pP[0], pP[1], pP[0] + r.A / nrm * 1.5, pP[1] + r.B / nrm * 1.5, { clase: "c-pen" });
      lectura.innerHTML = fil("Ecuación general", f.general, "ok") + fil("Explícita", f.explicita, "pen") + fil("Pendiente", f.pendiente) + fil("Vector director", par(r.v), "red") + fil("Vector normal (A, B)", f.normal, "pen") + fil("Paramétricas", f.parametricas) + fil("Continua", f.continua) + fil("Cortes con los ejes", f.corteX + " · " + f.corteY) + fil("Segmentaria", f.segmentaria);
      pie.innerHTML = "En el dibujo: el vector <b style='color:var(--red)'>director</b> (rojo) va a lo largo de la recta y el <b style='color:var(--pen)'>normal</b> (azul, (A, B)) es <b>perpendicular</b> a ella. Puedes escribir la ecuación en cualquier forma (con paréntesis, fracciones o con x e y en ambos lados).";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "La recta y sus vectores", 6.5);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p }; }), "", function (k) { st.txt = PRE[+k]; inp.value = st.txt; pinta(); });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    pinta();
  };

  // ============================================================
  // POSICIONES: dos rectas
  // ============================================================
  B.w.posiciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Posición relativa de dos rectas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot rd-circ"></div><p class="w-pie"></p>';
    var PRE = [["2x-y+1=0", "x+y-4=0", "secantes"], ["2x-y+1=0", "2x-y-4=0", "paralelas"], ["2x-y+1=0", "4x-2y+2=0", "coincidentes"], ["2x-y+1=0", "x+2y-6=0", "perpendiculares"], ["y=x", "y=-x", "perpendiculares (45°)"]];
    var st = { r: PRE[0][0], s: PRE[0][1] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iR = campo(ctl, "r:", st.r, 170), iS = campo(ctl, "s:", st.s, 170);
    function pinta() {
      var r, s; try { r = L.leer(st.r); s = L.leer(st.s); } catch (e) { lectura.innerHTML = fil("Revisa lo que has escrito", e.message, "red"); g.limpiar(); return; }
      g.limpiar(); recta(g, r, "c-pen").setAttribute("stroke-width", 3); recta(g, s, "c-red").setAttribute("stroke-width", 3);
      var pos = L.posicion(r, s), ang = Math.acos(Math.min(1, Math.abs(r.A * s.A + r.B * s.B) / (Math.hypot(r.A, r.B) * Math.hypot(s.A, s.B)))) / R, perp = r.A * s.A + r.B * s.B === 0;
      var txt = pos.tipo === "secantes" ? "se cortan en (" + qtxt(pos.punto[0]) + ", " + qtxt(pos.punto[1]) + ")" : pos.tipo === "paralelas" ? "paralelas: no se cortan" : "coincidentes: son la misma recta";
      if (pos.tipo === "secantes") { g.punto(qnum(pos.punto[0]), qnum(pos.punto[1]), { r: 7, clase: "c-ok" }); }
      var mr = L.pendiente(r), ms = L.pendiente(s);
      lectura.innerHTML = fil("r", L.txtGeneral(r), "pen") + fil("s", L.txtGeneral(s), "red") + fil("Posición", pos.tipo, "ok") + fil("Resultado", txt) + fil("Pendientes", (mr ? qtxt(mr) : "∞ (vertical)") + " y " + (ms ? qtxt(ms) : "∞ (vertical)") + (mr && ms ? "  →  m₁·m₂ = " + qtxt(qmul(mr, ms)) : "")) + fil("Ángulo entre las rectas", pos.tipo === "secantes" ? fmt(ang, 2) + "°" + (perp ? " (perpendiculares)" : "") : "0°") + fil("Comparación A/A′, B/B′, C/C′", (s.A ? qtxt(Q(r.A, s.A)) : "—") + " , " + (s.B ? qtxt(Q(r.B, s.B)) : "—") + " , " + (s.C ? qtxt(Q(r.C, s.C)) : "—"));
      pie.innerHTML = "Con las ecuaciones generales: si <b>A/A′ ≠ B/B′</b> las rectas son secantes; si <b>A/A′ = B/B′ ≠ C/C′</b> son paralelas; si los tres cocientes coinciden, son la misma recta. Son perpendiculares si <b>AA′ + BB′ = 0</b> (o m₁·m₂ = −1).";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Dos rectas en el plano", 6.5);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.r = PRE[+k][0]; st.s = PRE[+k][1]; iR.value = st.r; iS.value = st.s; pinta(); });
    iR.addEventListener("input", function () { st.r = iR.value; pinta(); }); iS.addEventListener("input", function () { st.s = iS.value; pinta(); });
    pinta();
  };

  // ============================================================
  // DISTPUNTO: distancia de un punto a una recta
  // ============================================================
  B.w.distpunto = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Distancia de un punto a una recta");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-3, -1], B: [3, 3], P: [2, -2] }, g, hA, hB, hP, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      g.limpiar(); g.mover(hA, st.A[0], st.A[1]); g.mover(hB, st.B[0], st.B[1]); g.mover(hP, st.P[0], st.P[1]);
      var r = L.desdePuntos([fq(st.A[0]), fq(st.A[1])], [fq(st.B[0]), fq(st.B[1])]);
      if (!r) { lectura.innerHTML = fil("A y B coinciden", "mueve uno de los dos puntos", "red"); return; }
      var d = L.distPuntoRecta(st.P, r), H = L.pie(st.P, r), val = r.A * st.P[0] + r.B * st.P[1] + r.C, sim = [2 * H[0] - st.P[0], 2 * H[1] - st.P[1]];
      recta(g, r, "c-pen").setAttribute("stroke-width", 3);
      g.segmento(st.P[0], st.P[1], H[0], H[1], { clase: "c-red" }).setAttribute("stroke-width", 3);
      g.punto(H[0], H[1], { r: 5, clase: "c-ok" }); etq(g, H, "H", "ok"); etq(g, st.P, "P", "red");
      g.punto(sim[0], sim[1], { r: 4, clase: "c-faint" }); etq(g, sim, "P′", "faint"); g.segmento(st.P[0], st.P[1], sim[0], sim[1], { clase: "c-faint", dash: "3 4" });
      lectura.innerHTML = fil("Recta r (general)", L.txtGeneral(r), "pen") + fil("d(P, r) = |Ap₁ + Bp₂ + C| / √(A² + B²)", "|" + r.A + "·" + fmt(st.P[0], 1) + " + " + r.B + "·" + fmt(st.P[1], 1) + " + " + r.C + "| / √" + (r.A * r.A + r.B * r.B) + " = " + fmt(Math.abs(val), 2) + "/" + fmt(Math.hypot(r.A, r.B), 3) + " = " + fmt(d, 3), "ok") + fil("Pie de la perpendicular H", "(" + fmt(H[0], 3) + ", " + fmt(H[1], 3) + ")") + fil("Simétrico P′ de P respecto de r", "(" + fmt(sim[0], 3) + ", " + fmt(sim[1], 3) + ")") + fil("¿De qué lado está P?", val === 0 ? "sobre la recta" : val > 0 ? "lado donde Ax + By + C > 0" : "lado donde Ax + By + C < 0");
      pie.innerHTML = "La distancia más corta de P a la recta se mide en <b>perpendicular</b> (segmento rojo, que termina en H). El <b>simétrico</b> P′ está al otro lado a la misma distancia: P′ = 2H − P. El signo de Ax + By + C indica en qué semiplano está P.";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Un punto y una recta", 6.5);
    hA = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Punto A de la recta", 7);
    hB = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Punto B de la recta", 7);
    hP = asa(g, function () { return st.P; }, function (x, y) { st.P = [x, y]; pinta(); }, "c-red", "Punto P", 7);
    pinta();
  };

  // ============================================================
  // MEDIATRIZ de un segmento
  // ============================================================
  B.w.mediatriz = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La mediatriz: puntos que equidistan de A y B");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-3, 1], B: [3, 3], s: 0 }, g, hA, hB, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Posición de Q", min: -6, max: 6, step: 0.25, val: st.s, on: function (v) { st.s = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      g.limpiar(); g.mover(hA, st.A[0], st.A[1]); g.mover(hB, st.B[0], st.B[1]);
      var A = st.A, Bq = st.B, v = [Bq[0] - A[0], Bq[1] - A[1]];
      if (v[0] === 0 && v[1] === 0) { lectura.innerHTML = fil("A y B coinciden", "mueve uno de los dos puntos", "red"); return; }
      var M = [(A[0] + Bq[0]) / 2, (A[1] + Bq[1]) / 2], n = [-v[1], v[0]], nn = Math.hypot(n[0], n[1]);
      var r = L.desdePuntos([fq(M[0]), fq(M[1])], [fq(M[0] + n[0]), fq(M[1] + n[1])]);
      var Qp = [M[0] + st.s * n[0] / nn, M[1] + st.s * n[1] / nn];
      g.segmento(A[0], A[1], Bq[0], Bq[1], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      if (r) recta(g, r, "c-ok").setAttribute("stroke-width", 3);
      g.punto(M[0], M[1], { r: 5, clase: "c-ok" }); etq(g, M, "M", "ok");
      g.segmento(Qp[0], Qp[1], A[0], A[1], { clase: "c-red", dash: "4 4" }); g.segmento(Qp[0], Qp[1], Bq[0], Bq[1], { clase: "c-red", dash: "4 4" });
      g.punto(Qp[0], Qp[1], { r: 6, clase: "c-red" }); etq(g, Qp, "Q", "red"); etq(g, A, "A", "pen"); etq(g, Bq, "B", "pen");
      var dA = Math.hypot(Qp[0] - A[0], Qp[1] - A[1]), dB = Math.hypot(Qp[0] - Bq[0], Qp[1] - Bq[1]);
      lectura.innerHTML = fil("Vector AB", "(" + fmt(v[0], 1) + ", " + fmt(v[1], 1) + ")", "pen") + fil("Punto medio M", "(" + fmt(M[0], 2) + ", " + fmt(M[1], 2) + ")", "ok") + fil("Mediatriz (general)", r ? L.txtGeneral(r) : "—", "ok") + fil("Distancias QA y QB", fmt(dA, 3) + "  y  " + fmt(dB, 3), "red");
      pie.innerHTML = "La mediatriz pasa por el <b>punto medio M</b> y es <b>perpendicular a AB</b> (su vector director es (−v₂, v₁), el de AB girado 90°; su vector normal es el propio AB). Mueve Q: todos sus puntos están a la misma distancia de A que de B.";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Mediatriz de un segmento", 6.5);
    hA = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Punto A", 7); hB = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Punto B", 7);
    pinta();
  };

  // ============================================================
  // PTOSNOTABLES: rectas y puntos notables del triángulo
  // ============================================================
  B.w.ptosnotables = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Rectas y puntos notables de un triángulo");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "med", A: [-4, -2], B: [4, -1], C: [0, 4] }, g, hs = {}, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function inter(p, v, q, w) { var D = v[0] * w[1] - v[1] * w[0]; if (Math.abs(D) < 1e-12) return null; var t = ((q[0] - p[0]) * w[1] - (q[1] - p[1]) * w[0]) / D; return [p[0] + t * v[0], p[1] + t * v[1]]; }
    function pinta() {
      var P = [st.A, st.B, st.C]; g.limpiar(); ["A", "B", "C"].forEach(function (k) { g.mover(hs[k], st[k][0], st[k][1]); });
      var area = Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[1][1] - P[0][1]) * (P[2][0] - P[0][0])) / 2;
      g.poligono(P, { clase: "z-pen", borde: "var(--pen)" }); ["A", "B", "C"].forEach(function (k, i) { etq(g, P[i], k, "pen"); });
      if (area < 1e-9) { lectura.innerHTML = fil("Triángulo degenerado", "los tres puntos están alineados", "red"); return; }
      var m = st.modo, lados = [[P[1], P[2]], [P[0], P[2]], [P[0], P[1]]], punto, desc, nom;
      if (m === "med") {
        var M = lados.map(function (l) { return [(l[0][0] + l[1][0]) / 2, (l[0][1] + l[1][1]) / 2]; });
        P.forEach(function (v, i) { g.segmento(v[0], v[1], M[i][0], M[i][1], { clase: "c-ok", dash: "5 4" }); g.punto(M[i][0], M[i][1], { r: 4, clase: "c-ok" }); });
        punto = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3]; nom = "Baricentro G"; desc = "Medianas: del vértice al punto medio del lado opuesto. G = media de los vértices; divide cada mediana en razón 2 : 1.";
      } else if (m === "alt") {
        var ps = P.map(function (v, i) { var l = lados[i], dl = [l[1][0] - l[0][0], l[1][1] - l[0][1]]; return { v: v, d: [-dl[1], dl[0]], base: l[0], dl: dl }; });
        ps.forEach(function (a) { var pie = inter(a.v, a.d, a.base, a.dl); g.segmento(a.v[0], a.v[1], pie[0], pie[1], { clase: "c-ok", dash: "5 4" }); g.segmento(a.v[0] - 6 * a.d[0] / Math.hypot(a.d[0], a.d[1]), a.v[1] - 6 * a.d[1] / Math.hypot(a.d[0], a.d[1]), a.v[0] + 6 * a.d[0] / Math.hypot(a.d[0], a.d[1]), a.v[1] + 6 * a.d[1] / Math.hypot(a.d[0], a.d[1]), { clase: "c-faint", dash: "2 5" }); g.punto(pie[0], pie[1], { r: 3, clase: "c-ok" }); });
        punto = inter(ps[0].v, ps[0].d, ps[1].v, ps[1].d); nom = "Ortocentro H"; desc = "Alturas: del vértice, perpendiculares al lado opuesto. Se cortan en el ortocentro (fuera del triángulo si es obtusángulo).";
      } else if (m === "mdt") {
        var ms = lados.map(function (l) { var mp = [(l[0][0] + l[1][0]) / 2, (l[0][1] + l[1][1]) / 2], dl = [l[1][0] - l[0][0], l[1][1] - l[0][1]]; return { mp: mp, d: [-dl[1], dl[0]] }; });
        ms.forEach(function (a) { var n = Math.hypot(a.d[0], a.d[1]); g.segmento(a.mp[0] - 12 * a.d[0] / n, a.mp[1] - 12 * a.d[1] / n, a.mp[0] + 12 * a.d[0] / n, a.mp[1] + 12 * a.d[1] / n, { clase: "c-ok", dash: "5 4" }); g.punto(a.mp[0], a.mp[1], { r: 3, clase: "c-ok" }); });
        punto = inter(ms[0].mp, ms[0].d, ms[1].mp, ms[1].d); nom = "Circuncentro O"; desc = "Mediatrices: perpendiculares por el punto medio. Se cortan en el circuncentro, centro de la circunferencia que pasa por los 3 vértices.";
        if (punto) { var rr = Math.hypot(punto[0] - P[0][0], punto[1] - P[0][1]); g.arco(punto[0], punto[1], rr, 0, 360, { clase: "c-red", dash: "4 4" }); }
      } else {
        var a = Math.hypot(P[1][0] - P[2][0], P[1][1] - P[2][1]), b = Math.hypot(P[0][0] - P[2][0], P[0][1] - P[2][1]), c = Math.hypot(P[0][0] - P[1][0], P[0][1] - P[1][1]);
        punto = [(a * P[0][0] + b * P[1][0] + c * P[2][0]) / (a + b + c), (a * P[0][1] + b * P[1][1] + c * P[2][1]) / (a + b + c)];
        P.forEach(function (v) { g.segmento(v[0], v[1], punto[0], punto[1], { clase: "c-ok", dash: "5 4" }); });
        var rin = 2 * area / (a + b + c); g.arco(punto[0], punto[1], rin, 0, 360, { clase: "c-red" });
        nom = "Incentro I"; desc = "Bisectrices de los ángulos. Se cortan en el incentro, centro de la circunferencia inscrita (tangente a los tres lados). I = (a·A + b·B + c·C)/(a + b + c).";
      }
      if (punto) { g.punto(punto[0], punto[1], { r: 7, clase: "c-red" }); etq(g, punto, m === "med" ? "G" : m === "alt" ? "H" : m === "mdt" ? "O" : "I", "red"); }
      lectura.innerHTML = fil(nom, punto ? "(" + fmt(punto[0], 3) + ", " + fmt(punto[1], 3) + ")" : "—", "red") + fil("Área del triángulo", fmt(area, 3), "pen");
      pie.innerHTML = desc;
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Triángulo y sus puntos notables", 7);
    ["A", "B", "C"].forEach(function (k) { hs[k] = asa(g, function () { return st[k]; }, function (x, y) { st[k] = [x, y]; pinta(); }, "c-pen", "Vértice " + k, 8); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "med", t: "Medianas · baricentro" }, { k: "alt", t: "Alturas · ortocentro" }, { k: "mdt", t: "Mediatrices · circuncentro" }, { k: "bis", t: "Bisectrices · incentro" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // REGION: semiplanos y sistemas de inecuaciones lineales
  // ============================================================
  B.w.region = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Semiplanos y regiones del plano");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot rd-circ"></div><p class="w-pie"></p>';
    var PRE = [["x+y<=4; x>=0; y>=0", "triángulo de vértices (0,0), (4,0), (0,4)"], ["y>=x; y<=6-x", "ángulo con vértice (3, 3)"], ["x>=1; x<=5; y>=1; y<=4", "rectángulo"], ["2x-y<=2; x+2y<=8; x>=0; y>=0", "cuadrilátero"], ["y>x+1; y<x-1", "región vacía"]];
    var st = { txt: PRE[0][0] }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var inp = campo(ctl, "Condiciones (separadas por ;):", st.txt, 330);
    // «izq OP der» → { c, a, b, op } con c + a·x + b·y OP 0
    function condicion(c) {
      var m = /(<=|>=|≤|≥|<|>)/.exec(c); if (!m) throw new Error("falta el signo ≤, ≥, < o > en «" + c + "»");
      var op = m[1].replace("≤", "<=").replace("≥", ">="), p = c.split(m[1]);
      if (p.length !== 2) throw new Error("condición mal escrita: «" + c + "»");
      var a = L.lineal(p[0]), b = L.lineal(p[1]);
      var k = { c: qnum(qsub(a[0], b[0])), a: qnum(qsub(a[1], b[1])), b: qnum(qsub(a[2], b[2])), op: op };
      if (k.a === 0 && k.b === 0) throw new Error("«" + c + "» no depende de x ni de y");
      return k;
    }
    function cumple(k, x, y) { var v = k.c + k.a * x + k.b * y; return k.op === "<=" ? v <= 1e-9 : k.op === ">=" ? v >= -1e-9 : k.op === "<" ? v < -1e-9 : v > 1e-9; }
    function pinta() {
      var conds;
      try { conds = st.txt.split(";").map(function (s) { return s.trim(); }).filter(Boolean).map(condicion); if (!conds.length) throw new Error("escribe al menos una condición"); } catch (e) { lectura.innerHTML = fil("Revisa lo que has escrito", e.message, "red"); g.limpiar(); return; }
      g.limpiar();
      var c = g.c, NX = 66, NY = 54, n = NX * NY, cnt = 0;
      for (var i = 0; i < NX; i++) for (var j = 0; j < NY; j++) {
        var x0 = c.xmin + (c.xmax - c.xmin) * i / NX, x1 = c.xmin + (c.xmax - c.xmin) * (i + 1) / NX, y0 = c.ymin + (c.ymax - c.ymin) * j / NY, y1 = c.ymin + (c.ymax - c.ymin) * (j + 1) / NY;
        if (conds.every(function (k) { return cumple(k, (x0 + x1) / 2, (y0 + y1) / 2); })) { cnt++; g.rect(x0, y0, x1, y1, { clase: "z-ok" }); }
      }
      conds.forEach(function (k) { var r = L.desdeGeneral(k.a, k.b, k.c); if (!r) return; r.A = k.a; r.B = k.b; r.C = k.c; recta(g, r, "c-red", /^[<>]$/.test(k.op) ? "6 4" : null); });
      lectura.innerHTML = fil("Condiciones", conds.length) + fil("Región solución", cnt === 0 ? "vacía (ningún punto cumple todas)" : cnt === n ? "todo el plano visible" : "la zona verde", cnt === 0 ? "red" : "ok") + fil("Fracción del plano visible", fmt(100 * cnt / n, 1) + " %");
      pie.innerHTML = "Cada desigualdad lineal es un <b>semiplano</b>: la recta Ax + By + C = 0 lo limita (continua si incluye ≤ o ≥, discontinua si es estricta) y se elige el lado probando <b>un punto</b> (por ejemplo el origen). El sistema de inecuaciones es la <b>intersección</b> de todos los semiplanos.";
    }
    g = plano(cuerpo.querySelector(".rd-circ"), "Región del plano que cumple las desigualdades", 6, 520, 380);
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[1] }; }), "", function (k) { st.txt = PRE[+k][0]; inp.value = st.txt; pinta(); });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    pinta();
  };
})(window);
