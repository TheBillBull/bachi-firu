/* ============================================================
   Bachi para Firu · laboratorio de Matemáticas II, tema 5 (Puntos, rectas y planos en el espacio)
   esp_rectas (dos rectas en 3D, con rangos) · esp_planos (recta-plano y plano-plano en 3D) ·
   esp_formas (de una ecuación a otra, paso a paso).
   Reutiliza el álgebra de vectores (B.lab.vec, tema 4) y las fracciones exactas (B.lab.mt, tema 1).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, V = B.lab.vec, T = B.lab.mt;
  var E = B.lab.esp = {};

  (function () {
    if (!global.document || !document.head || document.getElementById("esp-estilos")) return;
    var s = document.createElement("style"); s.id = "esp-estilos";
    s.textContent =
      ".esp-svg{touch-action:pan-y;cursor:grab}" +
      ".esp-eqs{margin:8px 0 0;padding:0;list-style:none;font-size:14.5px;line-height:1.6}" +
      ".esp-eqs li{padding:5px 0;border-top:1px solid var(--line,rgba(128,128,128,.25));overflow-wrap:anywhere}" +
      ".esp-eqs li>b:first-child{display:block;font-size:12px;color:var(--ink-faint);font-weight:600}" +
      ".esp-fila{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:6px 0}" +
      ".esp-fila .esp-nom{font:700 16px var(--math);min-width:1.6em}" +
      ".esp-fila input[type=number]{width:62px;padding:5px 6px;font:15px var(--math);border:1px solid var(--line,rgba(128,128,128,.4));border-radius:8px;background:var(--sheet-2);color:var(--ink)}" +
      "@media(max-width:520px){.esp-fila input[type=number]{width:52px}.esp-eqs{font-size:13.5px}}";
    document.head.appendChild(s);
  })();

  // ---------- utilidades ----------
  function n2(x) { return fmt(Math.round(x * 1e9) / 1e9, 2).replace(/,00$/, "").replace(/(,\d)0$/, "$1"); }
  function sg(n) { return n < 0 ? "−" + (-n) : String(n); }
  function par(n) { return n < 0 ? "(−" + (-n) + ")" : String(n); }
  function resta(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function mas(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function nulo(a) { return a[0] === 0 && a[1] === 0 && a[2] === 0; }
  function det3(a, b, c) { return V.mixto(a, b, c); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  // simplifica un vector entero dividiendo por el mcd y deja la primera componente no nula positiva
  function simp(v) {
    var g = gcd(gcd(v[0], v[1]), v[2]); if (!g) return v.slice();
    var w = v.map(function (x) { return x / g; }), k = w.filter(function (x) { return x !== 0; })[0];
    return k < 0 ? w.map(function (x) { return -x; }) : w;
  }
  // término lineal a·x con signo, para ecuaciones del tipo Ax + By + Cz + D = 0
  function eqPlano(n, d) { // n·X = d  →  "Ax + By + Cz + D = 0"
    var s = "", nom = ["x", "y", "z"];
    for (var i = 0; i < 3; i++) {
      var a = n[i]; if (!a) continue;
      s += (s ? (a < 0 ? " − " : " + ") : (a < 0 ? "−" : "")) + (Math.abs(a) === 1 ? "" : Math.abs(a)) + nom[i];
    }
    if (!s) s = "0";
    return s + (d === 0 ? "" : (d > 0 ? " − " : " + ") + Math.abs(d)) + " = 0";
  }
  function pt(p) { return "(" + p.map(function (x) { return n2(x); }).join(", ") + ")"; }
  function ptF(p) { return "(" + p.map(function (f) { return T.txt(f); }).join(", ") + ")"; }
  E.simp = simp; E.eqPlano = eqPlano;

  // ---------- vista 3D común (misma proyección que vec_3d del tema 4) ----------
  var L = 4; // caja [-L, L]^3
  function vista(cuerpo, plotEl, etiqueta) {
    var st = { az: 35, el: 22 }, g;
    g = new B.Plot(plotEl, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 600, h: 400, limpio: true, etx: "", ety: "", etiqueta: etiqueta });
    g.svg.classList.add("esp-svg");
    var o = { st: st, g: g, azS: null, elS: null, pinta: function () {} };
    function proy(p) {
      var a = st.az * Math.PI / 180, e = st.el * Math.PI / 180;
      var xr = p[0] * Math.cos(a) - p[1] * Math.sin(a), yr = p[0] * Math.sin(a) + p[1] * Math.cos(a);
      return [xr, p[2] * Math.cos(e) - yr * Math.sin(e)];
    }
    o.P2 = proy;
    o.seg = function (a, b, clase, dash) { var A = proy(a), Q = proy(b), s = g.segmento(A[0], A[1], Q[0], Q[1], { clase: clase || "c-faint" }); if (dash) s.setAttribute("stroke-dasharray", dash); return s; };
    o.caja = function () {
      var c = [-L, L], i, j, k;
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        o.seg([-L, c[i], c[j]], [L, c[i], c[j]], "c-faint", "2 5");
        o.seg([c[i], -L, c[j]], [c[i], L, c[j]], "c-faint", "2 5");
        o.seg([c[i], c[j], -L], [c[i], c[j], L], "c-faint", "2 5");
      }
      [[[L + 1, 0, 0], "x"], [[0, L + 1, 0], "y"], [[0, 0, L + 1], "z"]].forEach(function (e) {
        o.seg([0, 0, 0], e[0], "c-faint"); var q = proy(e[0]); g.texto(q[0], q[1], e[1], { dx: 5, dy: -4, clase: "faint" });
      });
    };
    // recta P + t·v recortada a la caja
    o.recta = function (P, v, clase, nombre) {
      var t0 = -1e9, t1 = 1e9, i;
      for (i = 0; i < 3; i++) {
        if (Math.abs(v[i]) < 1e-12) { if (Math.abs(P[i]) > L) return null; continue; }
        var a = (-L - P[i]) / v[i], b = (L - P[i]) / v[i];
        t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
      }
      if (t0 >= t1) return null;
      var A = [P[0] + t0 * v[0], P[1] + t0 * v[1], P[2] + t0 * v[2]], Q = [P[0] + t1 * v[0], P[1] + t1 * v[1], P[2] + t1 * v[2]];
      var s = o.seg(A, Q, clase); s.setAttribute("stroke-width", "2.6");
      if (nombre) { var q = proy(Q); g.texto(q[0], q[1], nombre, { dx: 8, dy: -8, clase: clase.replace("c-", "") }); }
      return [A, Q];
    };
    // plano n·X = d recortado a la caja (polígono convexo)
    o.plano = function (n, d, clase, nombre) {
      var pts = [], c = [-L, L], i, j, k, a, b;
      function arista(A, Bq) {
        var fa = V.dot(n, A) - d, fb = V.dot(n, Bq) - d;
        if (Math.abs(fa) < 1e-9) pts.push(A);
        if (fa * fb < 0) { var t = fa / (fa - fb); pts.push([A[0] + t * (Bq[0] - A[0]), A[1] + t * (Bq[1] - A[1]), A[2] + t * (Bq[2] - A[2])]); }
      }
      for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
        arista([-L, c[i], c[j]], [L, c[i], c[j]]); arista([c[i], -L, c[j]], [c[i], L, c[j]]); arista([c[i], c[j], -L], [c[i], c[j], L]);
      }
      // quitar duplicados
      var u = [];
      pts.forEach(function (p) { if (!u.some(function (q) { return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) < 1e-6; })) u.push(p); });
      if (u.length < 3) return null;
      var cen = [0, 0, 0]; u.forEach(function (p) { cen = mas(cen, p); }); cen = cen.map(function (x) { return x / u.length; });
      var e1 = resta(u[0], cen), e2 = V.cruz(n, e1);
      u.sort(function (p, q) {
        var pp = resta(p, cen), qq = resta(q, cen);
        return Math.atan2(V.dot(pp, e2), V.dot(pp, e1)) - Math.atan2(V.dot(qq, e2), V.dot(qq, e1));
      });
      g.poligono(u.map(proy), { clase: clase, borde: "var(--ink-faint)" });
      if (nombre) { var q2 = proy(u[0]); g.texto(q2[0], q2[1], nombre, { dx: 6, dy: -6, clase: "faint" }); }
      return u;
    };
    o.punto = function (p, clase, nombre) {
      var q = proy(p); g.punto(q[0], q[1], { r: 6, clase: clase }); if (nombre) g.texto(q[0], q[1], nombre, { dx: 9, dy: 15, clase: clase.replace("c-", "") });
    };
    o.mark = function (p, nombre) { var q = proy(p); g.punto(q[0], q[1], { r: 3.5, clase: "c-faint" }); if (nombre) g.texto(q[0], q[1], nombre, { dx: 6, dy: 13, clase: "faint" }); };
    o.limites = function () { g.rangoIso(0, 0, 5.5); };
    // controles de vista y arrastre
    o.controles = function (ctl2) {
      o.azS = U.slider(ctl2, { et: "Giro", etq: "Giro horizontal de la vista", min: -180, max: 180, step: 5, val: st.az, on: function (x) { st.az = x; o.pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
      o.elS = U.slider(ctl2, { et: "Altura", etq: "Altura de la vista", min: -80, max: 80, step: 5, val: st.el, on: function (x) { st.el = x; o.pinta(); }, fmt: function (x) { return fmt(x, 0) + "°"; } });
      U.boton(ctl2, "Vista inicial", function () { st.az = 35; st.el = 22; o.azS.set(35); o.elS.set(22); o.pinta(); });
      var d = null;
      g.svg.addEventListener("pointerdown", function (ev) { d = { x: ev.clientX, y: ev.clientY, az: st.az, el: st.el, t: ev.pointerType }; try { g.svg.setPointerCapture(ev.pointerId); } catch (e) {} });
      g.svg.addEventListener("pointermove", function (ev) {
        if (!d) return;
        st.az = Math.round(Math.max(-180, Math.min(180, d.az + (ev.clientX - d.x) * 0.6)) / 5) * 5; o.azS.set(st.az);
        if (d.t !== "touch") { st.el = Math.round(Math.max(-80, Math.min(80, d.el + (ev.clientY - d.y) * 0.4)) / 5) * 5; o.elS.set(st.el); }
        o.pinta();
      });
      var fin = function () { d = null; };
      g.svg.addEventListener("pointerup", fin); g.svg.addEventListener("pointercancel", fin);
    };
    return o;
  }

  // ============================================================
  // POSICIÓN RELATIVA DE DOS RECTAS
  // r: A + t·u (fija)  ·  s: Q + λ·v (editable)
  // ============================================================
  var R_A = [1, 0, 0], R_U = [1, 1, 1];
  var PRE_R = [
    { k: "0", t: "Se cruzan", Q: [0, 1, 1], v: [1, -1, 0] },
    { k: "1", t: "Se cortan", Q: [2, 1, 1], v: [1, -1, 0] },
    { k: "2", t: "Paralelas", Q: [0, 1, 0], v: [2, 2, 2] },
    { k: "3", t: "Coincidentes", Q: [2, 1, 1], v: [-1, -1, -1] }
  ];
  E.PRE_R = PRE_R; E.R_A = R_A; E.R_U = R_U;
  // clasifica: devuelve { caso, r1, r2, d, AQ, punto }
  E.dosRectas = function (A, u, Q, v) {
    var AQ = resta(Q, A), r1 = V.rango([u, v]), r2 = V.rango([u, v, AQ]), d = det3(u, v, AQ), caso, punto = null;
    if (r1 === 1) caso = r2 === 1 ? "coincidentes" : "paralelas";
    else if (r2 === 2) caso = "secantes"; else caso = "cruzan";
    if (caso === "secantes") {
      var c = V.cruz(u, v), den = V.dot(c, c), num = V.dot(V.cruz(AQ, v), c);
      punto = [0, 1, 2].map(function (i) { return T.add(T.F(A[i]), T.F(num * u[i], den)); });
    }
    return { caso: caso, r1: r1, r2: r2, d: d, AQ: AQ, punto: punto };
  };

  B.w.esp_rectas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Dos rectas en el espacio: ¿se cruzan o se cortan?");
    cuerpo.innerHTML = '<div data-pre></div><div class="w-plot"></div><div data-ctl></div><div data-ctl2></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { Q: PRE_R[0].Q.slice(), v: PRE_R[0].v.slice() }, sls = {};
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ctl2 = U.ctl(cuerpo.querySelector("[data-ctl2]"));
    var vw = vista(cuerpo, cuerpo.querySelector(".w-plot"), "Dos rectas r y s en el espacio");
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_R.map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) {
      var p = PRE_R[+k]; st.Q = p.Q.slice(); st.v = p.v.slice();
      ["Q", "v"].forEach(function (n) { sls[n].forEach(function (s, i) { s.set(st[n][i]); }); }); pinta();
    });
    ["Q", "v"].forEach(function (n) {
      sls[n] = [0, 1, 2].map(function (i) {
        return U.slider(ctl, { et: (n === "Q" ? "Q" : "v") + "<sub>" + "xyz"[i] + "</sub>", etq: (n === "Q" ? "Coordenada " : "Componente ") + "xyz"[i] + (n === "Q" ? " del punto Q de s" : " del director de s"), min: -3, max: 3, step: 1, val: st[n][i], on: function (x) { st[n][i] = x; pinta(); }, fmt: function (x) { return fmt(x, 0); } });
      });
    });
    vw.controles(ctl2);
    function pinta() {
      var g = vw.g, c = E.dosRectas(R_A, R_U, st.Q, st.v), nuloV = nulo(st.v);
      vw.limites(); g.limpiar(); vw.caja();
      vw.recta(R_A, R_U, "c-pen", "r");
      if (!nuloV) vw.recta(st.Q, st.v, "c-red", "s");
      vw.mark(R_A, "A"); vw.mark(st.Q, "Q");
      if (c.punto) vw.punto(c.punto.map(T.val), "c-ok", "P");
      if (nuloV) { lectura.innerHTML = U.lec("Aviso", "v = (0, 0, 0) no es un vector director", "mal"); pie.innerHTML = "Un vector director no puede ser nulo: cambia alguna componente de v."; return; }
      var col = { cruzan: "mal", secantes: "ok", paralelas: "", coincidentes: "" }[c.caso];
      lectura.innerHTML =
        U.lec("r", "A(1, 0, 0), u = (1, 1, 1)") + U.lec("s", "Q" + pt(st.Q) + ", v = " + pt(st.v)) +
        U.lec("AQ = Q − A", pt(c.AQ)) +
        U.lec("rango {u, v}", String(c.r1), c.r1 === 2 ? "ok" : "") + U.lec("rango {u, v, AQ}", String(c.r2), c.r2 === 3 ? "mal" : "ok") +
        U.lec("det (u, v, AQ)", n2(c.d), c.d === 0 ? "ok" : "mal") +
        U.lec("Posición", c.caso, col) + (c.punto ? U.lec("Punto de corte", ptF(c.punto), "ok") : "");
      pie.innerHTML = {
        cruzan: "<b>Se cruzan</b>: u y v no son paralelos (rango 2) y además u, v, AQ no son coplanarios (rango 3, det ≠ 0): las rectas no están en un mismo plano y nunca se tocan.",
        secantes: "<b>Se cortan</b> en el punto verde: u y v no son paralelos (rango 2), pero u, v, AQ sí son coplanarios (rango 2, det = 0): están en un mismo plano.",
        paralelas: "<b>Paralelas</b>: u y v son proporcionales (rango 1) y AQ no lo es con ellos (rango 2): mismas direcciones, rectas distintas.",
        coincidentes: "<b>Coincidentes</b>: u, v y AQ son todos proporcionales (rango 1): es la misma recta con otra ecuación."
      }[c.caso] + " Mueve los deslizadores de Q y v y gira la vista: una recta que parece cortar a la otra puede pasar por detrás.";
    }
    vw.pinta = pinta; pinta();
  };

  // ============================================================
  // RECTA-PLANO y PLANO-PLANO
  // ============================================================
  var PRE_P = {
    rp: [
      { k: "0", t: "Secantes", n: [1, 1, 1], d: 3, v: [1, -1, 2] },
      { k: "1", t: "Paralelos", n: [1, 1, 1], d: 5, v: [1, -1, 0] },
      { k: "2", t: "Recta contenida", n: [1, 1, 1], d: 1, v: [1, -1, 0] },
      { k: "3", t: "Perpendiculares", n: [1, 1, 1], d: 3, v: [1, 1, 1] }
    ],
    pp: [
      { k: "0", t: "Secantes", n: [1, -1, 2], d: 2 },
      { k: "1", t: "Paralelos", n: [2, 2, 2], d: 2 },
      { k: "2", t: "Coincidentes", n: [2, 2, 2], d: 6 },
      { k: "3", t: "Perpendiculares", n: [1, -1, 0], d: 0 }
    ]
  };
  E.PRE_P = PRE_P;
  var RP_P = [0, 0, 1]; // punto de la recta del modo recta-plano (para "contenida": n·P = 1 con d = 1)
  var PP_N1 = [1, 1, 1], PP_D1 = 3;
  E.rectaPlano = function (P, v, n, d) {
    var vn = V.dot(v, n), pn = V.dot(P, n), caso, t = null;
    if (vn !== 0) { caso = "secantes"; t = T.F(d - pn, vn); }
    else caso = pn === d ? "contenida" : "paralelos";
    return { vn: vn, pn: pn, caso: caso, t: t };
  };
  E.dosPlanos = function (n1, d1, n2v, d2) {
    var r1 = V.rango([n1, n2v]);
    var cr = V.cruz(n1, n2v), caso;
    if (!nulo(cr)) caso = "secantes";
    else { var coin = (n1[0] * d2 === n2v[0] * d1) && (n1[1] * d2 === n2v[1] * d1) && (n1[2] * d2 === n2v[2] * d1); caso = coin ? "coincidentes" : "paralelos"; }
    return { r1: r1, caso: caso, dir: cr };
  };

  B.w.esp_planos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Recta y plano, o dos planos: cómo se cortan");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div class="w-plot"></div><div data-ctl></div><div data-ctl2></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var ref = host.getAttribute("data-ref") || "", m0 = /planos$/.test(ref) ? "pp" : "rp";
    var st = { modo: m0, n: PRE_P[m0][0].n.slice(), d: PRE_P[m0][0].d, v: PRE_P.rp[0].v.slice() }, sls = {};
    var lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), ctl2 = U.ctl(cuerpo.querySelector("[data-ctl2]"));
    var vw = vista(cuerpo, cuerpo.querySelector(".w-plot"), "Recta y plano, o dos planos, en el espacio");
    function aplica(p) { st.n = p.n.slice(); st.d = p.d; if (p.v) st.v = p.v.slice(); sync(); }
    function sync() {
      sls.n.forEach(function (s, i) { s.set(st.n[i]); }); sls.d.set(st.d); sls.v.forEach(function (s, i) { s.set(st.v[i]); });
    }
    function armaPre() {
      U.fichas(cuerpo.querySelector("[data-pre]"), PRE_P[st.modo].map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) { aplica(PRE_P[st.modo][+k]); pinta(); });
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "rp", t: "Recta y plano" }, { k: "pp", t: "Dos planos" }], m0, function (k) {
      st.modo = k; armaPre(); aplica(PRE_P[k][0]); armaVis(); pinta();
    });
    sls.v = [0, 1, 2].map(function (i) {
      return U.slider(ctl, { et: "v<sub>" + "xyz"[i] + "</sub>", etq: "Componente " + "xyz"[i] + " del director de la recta", min: -3, max: 3, step: 1, val: st.v[i], on: function (x) { st.v[i] = x; pinta(); }, fmt: function (x) { return fmt(x, 0); } });
    });
    sls.n = [0, 1, 2].map(function (i) {
      return U.slider(ctl, { et: "n<sub>" + "xyz"[i] + "</sub>", etq: "Componente " + "xyz"[i] + " de la normal del plano", min: -3, max: 3, step: 1, val: st.n[i], on: function (x) { st.n[i] = x; pinta(); }, fmt: function (x) { return fmt(x, 0); } });
    });
    sls.d = U.slider(ctl, { et: "d", etq: "Término independiente del plano n·X = d", min: -6, max: 6, step: 1, val: st.d, on: function (x) { st.d = x; pinta(); }, fmt: function (x) { return fmt(x, 0); } });
    function armaVis() { // ocultar los deslizadores de v en modo dos planos
      var labs = ctl.querySelectorAll("label");
      Array.prototype.forEach.call(labs, function (l, i) { if (i < 3) l.style.display = st.modo === "rp" ? "" : "none"; });
    }
    vw.controles(ctl2);
    function pinta() {
      var g = vw.g, lec = "", nota = "";
      vw.limites(); g.limpiar(); vw.caja();
      if (nulo(st.n)) { lectura.innerHTML = U.lec("Aviso", "n = (0, 0, 0) no define un plano", "mal"); pie.innerHTML = "Un plano necesita un vector normal distinto de cero."; return; }
      if (st.modo === "rp") {
        if (nulo(st.v)) { lectura.innerHTML = U.lec("Aviso", "v = (0, 0, 0) no es un vector director", "mal"); pie.innerHTML = "Cambia alguna componente de v."; return; }
        var c = E.rectaPlano(RP_P, st.v, st.n, st.d);
        vw.plano(st.n, st.d, c.caso === "contenida" ? "z-ok" : "z-pen", "π");
        vw.recta(RP_P, st.v, "c-red", "r"); vw.mark(RP_P, "P");
        if (c.t) vw.punto([RP_P[0] + T.val(c.t) * st.v[0], RP_P[1] + T.val(c.t) * st.v[1], RP_P[2] + T.val(c.t) * st.v[2]], "c-ok", "X");
        lec = U.lec("r", "P(0, 0, 1), v = " + pt(st.v)) + U.lec("π", eqPlano(st.n, st.d)) +
          U.lec("v · n", String(c.vn), c.vn === 0 ? "ok" : "") + U.lec("¿P cumple π?", c.pn === st.d ? "sí (n·P = " + c.pn + ")" : "no (n·P = " + c.pn + " ≠ " + st.d + ")") +
          U.lec("Posición", c.caso === "secantes" ? "secantes" : c.caso === "contenida" ? "la recta está contenida" : "paralelos (sin tocarse)", c.caso === "paralelos" ? "mal" : "ok") +
          (c.t ? U.lec("Valor de t", T.txt(c.t)) + U.lec("Punto de corte", ptF([0, 1, 2].map(function (i) { return T.add(T.F(RP_P[i]), T.mul(c.t, T.F(st.v[i]))); })), "ok") : "");
        nota = c.caso === "secantes" ? "<b>v · n ≠ 0</b>: la recta no es paralela al plano y lo atraviesa en un único punto (verde): se sustituye (P + t·v) en la ecuación del plano y se despeja t."
          : c.caso === "contenida" ? "<b>v · n = 0</b> y P está en el plano: <b>toda</b> la recta está dentro del plano (verde)."
          : "<b>v · n = 0</b> pero P no cumple la ecuación: la recta es paralela al plano y nunca lo toca. Cambia d hasta que n·P = d y pasará a estar contenida.";
      } else {
        var n2v = st.n, c2 = E.dosPlanos(PP_N1, PP_D1, n2v, st.d);
        vw.plano(PP_N1, PP_D1, "z-pen", "π₁");
        vw.plano(n2v, st.d, c2.caso === "coincidentes" ? "z-ok" : "z-red", "π₂");
        if (c2.caso === "secantes") {
          // punto de la recta intersección: resolver con z elegida entre las coordenadas libres
          var cr = c2.dir, k = Math.abs(cr[0]) >= Math.abs(cr[1]) && Math.abs(cr[0]) >= Math.abs(cr[2]) ? 0 : Math.abs(cr[1]) >= Math.abs(cr[2]) ? 1 : 2;
          var i1 = (k + 1) % 3, i2 = (k + 2) % 3, a11 = PP_N1[i1], a12 = PP_N1[i2], a21 = n2v[i1], a22 = n2v[i2], dt = a11 * a22 - a12 * a21;
          var P0 = [0, 0, 0]; P0[i1] = (PP_D1 * a22 - a12 * st.d) / dt; P0[i2] = (a11 * st.d - PP_D1 * a21) / dt;
          vw.recta(P0, cr, "c-ok", "r");
        }
        lec = U.lec("π₁", eqPlano(PP_N1, PP_D1)) + U.lec("π₂", eqPlano(n2v, st.d)) +
          U.lec("rango de (n₁, n₂)", String(c2.r1), c2.r1 === 2 ? "ok" : "") +
          U.lec("Posición", c2.caso, c2.caso === "paralelos" ? "mal" : "ok") +
          (c2.caso === "secantes" ? U.lec("Recta común: director n₁ × n₂", pt(simp(c2.dir)), "ok") : "");
        nota = c2.caso === "secantes" ? "Las normales <b>no son proporcionales</b>: los planos se cortan en una <b>recta</b> (verde), cuyo vector director es n₁ × n₂."
          : c2.caso === "paralelos" ? "Las normales son proporcionales pero los términos independientes no siguen la proporción: planos <b>paralelos</b>, sin ningún punto común."
          : "Todos los coeficientes (incluido el término independiente) son proporcionales: es el <b>mismo plano</b> escrito de otra forma.";
      }
      lectura.innerHTML = lec; pie.innerHTML = nota;
    }
    vw.pinta = pinta; armaPre(); armaVis(); pinta();
  };

  // ============================================================
  // DE UNA ECUACIÓN A OTRA, paso a paso (recta y plano)
  // ============================================================
  // ecuaciones de la recta (P, v enteros) → { vect, param, cont, impl:[[n,d],[n,d]] }
  E.formasRecta = function (P, v) {
    var cr = [V.cruz(v, [1, 0, 0]), V.cruz(v, [0, 1, 0]), V.cruz(v, [0, 0, 1])].filter(function (n) { return !nulo(n); }), pl = [];
    for (var i = 0; i < cr.length && pl.length < 2; i++) {
      var ni = simp(cr[i]);
      if (!pl.length || !nulo(V.cruz(pl[0][0], ni))) pl.push([ni, V.dot(ni, P)]);
    }
    return { impl: pl };
  };
  E.formasPlano = function (A, Bp, C) {
    var u = resta(Bp, A), w = resta(C, A), n = V.cruz(u, w);
    if (nulo(n)) return null;
    var s = simp(n); return { u: u, w: w, n: n, ns: s, d: V.dot(s, A) };
  };
  function campos(el, nombre, vals, cb) {
    el.innerHTML = '<span class="esp-nom">' + nombre + '</span>' + vals.map(function (x, i) {
      return '<input type="number" step="1" value="' + x + '" aria-label="' + "xyz"[i] + ' de ' + nombre + '">';
    }).join("");
    Array.prototype.forEach.call(el.querySelectorAll("input"), function (inp, i) {
      inp.addEventListener("input", function () { var x = Math.round(parseFloat(String(inp.value).replace(",", "."))); vals[i] = isFinite(x) ? x : 0; cb(); });
    });
    return el.querySelectorAll("input");
  }
  function cE(a, p, v) { // numerador (x − p) con signos limpios
    return p === 0 ? a : "(" + a + (p > 0 ? " − " + p : " + " + (-p)) + ")";
  }
  B.w.esp_formas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "De una ecuación a otra: recta y plano paso a paso");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre></div><div class="esp-fila" data-f1></div><div class="esp-fila" data-f2></div><div class="esp-fila" data-f3></div><ul class="esp-eqs"></ul><div class="lectura anch"></div><p class="w-pie"></p>';
    var ref = host.getAttribute("data-ref") || "", st = { modo: /plano$/.test(ref) ? "p" : "r", P: [1, 2, 3], v: [2, 1, -1], A: [1, 0, 2], Bp: [2, 1, 2], C: [1, 1, 3] };
    var lista = cuerpo.querySelector(".esp-eqs"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var f1 = cuerpo.querySelector("[data-f1]"), f2 = cuerpo.querySelector("[data-f2]"), f3 = cuerpo.querySelector("[data-f3]");
    var PR = { r: [{ k: "0", t: "Ejemplo", P: [1, 2, 3], v: [2, 1, -1] }, { k: "1", t: "Con una componente 0", P: [1, 0, 2], v: [0, 3, 1] }, { k: "2", t: "Eje OZ", P: [0, 0, 0], v: [0, 0, 1] }],
      p: [{ k: "0", t: "Ejemplo", A: [1, 0, 2], Bp: [2, 1, 2], C: [1, 1, 3] }, { k: "1", t: "Puntos en los ejes", A: [1, 0, 0], Bp: [0, 1, 0], C: [0, 0, 1] }, { k: "2", t: "Alineados (sin plano)", A: [1, 1, 1], Bp: [2, 2, 2], C: [3, 3, 3] }] };
    var inps = [];
    function monta() {
      inps = [];
      if (st.modo === "r") {
        inps.push(campos(f1, "P =", st.P, pinta)); inps.push(campos(f2, "v =", st.v, pinta)); f3.innerHTML = ""; f3.style.display = "none";
      } else {
        inps.push(campos(f1, "A =", st.A, pinta)); inps.push(campos(f2, "B =", st.Bp, pinta)); f3.style.display = ""; inps.push(campos(f3, "C =", st.C, pinta));
      }
    }
    function armaPre() {
      U.fichas(cuerpo.querySelector("[data-pre]"), PR[st.modo].map(function (p) { return { k: p.k, t: p.t }; }), "0", function (k) {
        var p = PR[st.modo][+k]; ["P", "v", "A", "Bp", "C"].forEach(function (n) { if (p[n]) st[n] = p[n].slice(); }); monta(); pinta();
      });
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "r", t: "Recta" }, { k: "p", t: "Plano por tres puntos" }], st.modo, function (k) {
      st.modo = k; var p = PR[k][0]; ["P", "v", "A", "Bp", "C"].forEach(function (n) { if (p[n]) st[n] = p[n].slice(); }); armaPre(); monta(); pinta();
    });
    function pinta() {
      var L2 = [], lec = "", nota = "";
      function it(t, h) { L2.push("<li><b>" + t + "</b>" + h + "</li>"); }
      if (st.modo === "r") {
        var P = st.P, v = st.v;
        if (nulo(v)) { lista.innerHTML = ""; lectura.innerHTML = U.lec("Aviso", "v no puede ser nulo", "mal"); pie.innerHTML = ""; return; }
        it("Vectorial", "(x, y, z) = (" + P.join(", ") + ") + t·(" + v.join(", ") + ")");
        it("Paramétricas", "x = " + P[0] + (v[0] < 0 ? " − " : " + ") + (Math.abs(v[0]) === 1 ? "" : Math.abs(v[0])) + "t,&nbsp; y = " + P[1] + (v[1] < 0 ? " − " : " + ") + (Math.abs(v[1]) === 1 ? "" : Math.abs(v[1])) + "t,&nbsp; z = " + P[2] + (v[2] < 0 ? " − " : " + ") + (Math.abs(v[2]) === 1 ? "" : Math.abs(v[2])) + "t");
        var nombres = ["x", "y", "z"], partes = [], extra = [];
        for (var i = 0; i < 3; i++) {
          var nu = P[i] === 0 ? nombres[i] : "(" + nombres[i] + (P[i] > 0 ? " − " + P[i] : " + " + (-P[i])) + ")";
          if (v[i] === 0) extra.push(nombres[i] + " = " + P[i]); else partes.push(nu + " / " + par(v[i]));
        }
        it("Continua", partes.join(" = ") + (extra.length ? " &nbsp;con&nbsp; " + extra.join(", ") : "") + (extra.length ? "<br><span style='color:var(--ink-faint)'>Si una componente de v es 0 no se puede dividir: esa coordenada queda fija.</span>" : ""));
        var f = E.formasRecta(P, v);
        it("Implícita (dos planos)", f.impl.map(function (q) { return eqPlano(q[0], q[1]); }).join(" &nbsp;&nbsp;y&nbsp;&nbsp; "));
        it("Cómo sale la implícita", "Se buscan dos vectores perpendiculares a v = " + pt(v) + " que no sean paralelos entre sí (por ejemplo n = v × i, v × j, v × k) y se impone que el plano pase por P: " +
          f.impl.map(function (q, j) { return "n" + (j + 1) + " = " + pt(q[0]) + ", n" + (j + 1) + "·P = " + q[1]; }).join("; ") + ". Su producto vectorial n₁ × n₂ vuelve a dar la dirección de la recta: " + pt(simp(V.cruz(f.impl[0][0], f.impl[1][0]))) + ".");
        lec = U.lec("Director v", pt(v)) + U.lec("Punto para t = 1", pt(mas(P, v))) + U.lec("n₁ × n₂ ∥ v", nulo(V.cruz(V.cruz(f.impl[0][0], f.impl[1][0]), v)) ? "sí" : "no", "ok");
        nota = "Cambia P y v (enteros) y comprueba las cuatro formas de la misma recta.";
      } else {
        var p = E.formasPlano(st.A, st.Bp, st.C);
        if (!p) { lista.innerHTML = ""; lectura.innerHTML = U.lec("Aviso", "A, B y C están alineados: no determinan un plano", "mal"); pie.innerHTML = "AB y AC son proporcionales, así que AB × AC = 0 (los puntos no son coplanarios con un cuarto cualquiera; hay infinitos planos que los contienen)."; return; }
        it("Vectores", "AB = B − A = " + pt(p.u) + " · AC = C − A = " + pt(p.w));
        it("Normal", "n = AB × AC = " + pt(p.n) + (p.ns.join() !== p.n.join() ? " ∥ " + pt(p.ns) + " (simplificado)" : ""));
        it("Ecuación general", "n·(X − A) = 0 ⟹ " + eqPlano(p.ns, p.d));
        it("Comprobación", "A: " + V.dot(p.ns, st.A) + " ✓ · B: " + V.dot(p.ns, st.Bp) + " ✓ · C: " + V.dot(p.ns, st.C) + " ✓ (los tres deben dar " + p.d + ")");
        it("Paramétrica", "X = " + pt(st.A) + " + λ·" + pt(p.u) + " + μ·" + pt(p.w));
        lec = U.lec("n", pt(p.ns)) + U.lec("Plano", eqPlano(p.ns, p.d), "ok");
        nota = "Mueve los puntos (enteros). Si A, B y C están alineados, AB × AC = 0 y no hay un único plano.";
      }
      lista.innerHTML = L2.join(""); lectura.innerHTML = lec; pie.innerHTML = nota;
    }
    armaPre(); monta(); pinta();
  };
})(window);
