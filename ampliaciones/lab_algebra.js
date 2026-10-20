/* ============================================================
   Bachi para Firu · laboratorio de álgebra (Matemáticas I, tema 3)
   Motor de polinomios con fracciones exactas + actividades:
   polinomios · notable · ruffini · factorizar · parabola · bicuadrada
   sistema2x2 · signos · fracalg · igualar
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var A = B.lab.alg = {};

  // ============================================================
  // Fracciones exactas {n, d} (d > 0, irreducibles)
  // ============================================================
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function Q(n, d) {
    if (d === undefined) d = 1;
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  }
  var q0 = Q(0), q1 = Q(1);
  function qadd(a, b) { return Q(a.n * b.d + b.n * a.d, a.d * b.d); }
  function qsub(a, b) { return Q(a.n * b.d - b.n * a.d, a.d * b.d); }
  function qmul(a, b) { return Q(a.n * b.n, a.d * b.d); }
  function qdiv(a, b) { return Q(a.n * b.d, a.d * b.n); }
  function qneg(a) { return Q(-a.n, a.d); }
  function qcero(a) { return a.n === 0; }
  function qigual(a, b) { return a.n === b.n && a.d === b.d; }
  function qnum(a) { return a.n / a.d; }
  function qtxt(a, par) {
    if (a.d === 1) return (a.n < 0 ? "−" : "") + Math.abs(a.n);
    var t = (a.n < 0 ? "−" : "") + Math.abs(a.n) + "/" + a.d;
    return par ? "(" + t + ")" : t;
  }
  A.Q = Q; A.qtxt = qtxt; A.qnum = qnum; A.gcd = gcd;

  // Decimal escrito por el usuario ("0,5", "2.25") → fracción exacta
  function decimal(s) {
    s = s.replace(",", ".");
    var p = s.split("."), dec = p[1] ? p[1].length : 0;
    if (dec > 6) throw new Error("demasiados decimales");
    return Q(parseInt((p[0] || "0") + (p[1] || ""), 10), Math.pow(10, dec));
  }

  // ============================================================
  // Polinomios: arrays de fracciones, índice = grado
  // ============================================================
  function norm(p) { var r = p.slice(); while (r.length && qcero(r[r.length - 1])) r.pop(); return r; }
  function grado(p) { return norm(p).length - 1; }          // el polinomio 0 tiene grado −1
  function padd(a, b) { var n = Math.max(a.length, b.length), r = []; for (var i = 0; i < n; i++) r.push(qadd(a[i] || q0, b[i] || q0)); return norm(r); }
  function pneg(a) { return a.map(qneg); }
  function psub(a, b) { return padd(a, pneg(b)); }
  function pmul(a, b) {
    if (!a.length || !b.length) return [];
    var r = []; for (var i = 0; i < a.length + b.length - 1; i++) r.push(q0);
    for (i = 0; i < a.length; i++) for (var j = 0; j < b.length; j++) r[i + j] = qadd(r[i + j], qmul(a[i], b[j]));
    return norm(r);
  }
  function pesc(a, k) { return norm(a.map(function (c) { return qmul(c, k); })); }
  function ppot(a, n) { var r = [q1]; for (var i = 0; i < n; i++) r = pmul(r, a); return r; }
  // División larga: devuelve cociente, resto y el registro de pasos
  function pdivmod(a, b, log) {
    b = norm(b);
    if (!b.length) throw new Error("división entre cero");
    var r = norm(a), c = [], db = b.length - 1, lb = b[db];
    for (var i = 0; i <= Math.max(r.length - 1 - db, 0); i++) c.push(q0);
    while (r.length - 1 >= db && r.length) {
      var dr = r.length - 1, k = qdiv(r[dr], lb), e = dr - db, mono = [];
      for (var j = 0; j < e; j++) mono.push(q0); mono.push(k);
      c[e] = k;
      var prod = pmul(mono, b), nuevo = psub(r, prod);
      if (log) log.push({ dr: dr, k: k, e: e, mono: mono, prod: prod, resto: nuevo });
      r = nuevo;
    }
    return { c: norm(c), r: r };
  }
  function peval(p, x) { var s = q0; for (var i = p.length - 1; i >= 0; i--) s = qadd(qmul(s, x), p[i]); return s; }
  function pevalN(p, x) { var s = 0; for (var i = p.length - 1; i >= 0; i--) s = s * x + qnum(p[i]); return s; }
  function pder(p) { var r = []; for (var i = 1; i < p.length; i++) r.push(qmul(p[i], Q(i))); return norm(r); }
  function pgcd(a, b) {            // mcd mónico
    a = norm(a); b = norm(b);
    while (b.length) { var r = pdivmod(a, b).r; a = b; b = r; }
    return a.length ? pesc(a, qdiv(q1, a[a.length - 1])) : a;
  }
  // Polinomio primitivo: coeficientes enteros sin factor común y coef. principal positivo
  function primitivo(p) {
    p = norm(p); if (!p.length) return { c: q0, p: [] };
    var mcm = 1; p.forEach(function (c) { mcm = mcm * c.d / gcd(mcm, c.d); });
    var ent = p.map(function (c) { return c.n * (mcm / c.d); }), g = 0; ent.forEach(function (v) { g = gcd(g, v); });
    var s = p[p.length - 1].n < 0 ? -1 : 1;
    return { c: Q(s * g, mcm), p: ent.map(function (v) { return Q(s * v / g); }) };
  }
  function pigual(a, b) { a = norm(a); b = norm(b); if (a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (!qigual(a[i], b[i])) return false; return true; }

  // ----- texto -----
  function monomio(c, e, v, primero) {
    var neg = c.n < 0, ab = neg ? qneg(c) : c, signo = primero ? (neg ? "−" : "") : (neg ? " − " : " + "), cuerpo;
    var coef = (ab.n === 1 && ab.d === 1 && e > 0) ? "" : (ab.d === 1 ? String(ab.n) : "(" + ab.n + "/" + ab.d + ")");
    cuerpo = e === 0 ? (coef || "1") : e === 1 ? coef + v : coef + v + U.sup(e);
    return signo + cuerpo;
  }
  function ptxt(p, v) {
    v = v || "x"; p = norm(p);
    if (!p.length) return "0";
    var s = "", prim = true;
    for (var i = p.length - 1; i >= 0; i--) { if (qcero(p[i])) continue; s += monomio(p[i], i, v, prim); prim = false; }
    return s;
  }
  A.ptxt = ptxt;

  // ----- lectura de un polinomio escrito por el usuario -----
  function leer(src) {
    var s = String(src).replace(/\s+/g, "").replace(/[−–—]/g, "-").replace(/[·×]/g, "*").replace(/X/g, "x")
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, function (m) { var mp = "⁰¹²³⁴⁵⁶⁷⁸⁹"; return "^" + m.split("").map(function (c) { return mp.indexOf(c); }).join(""); });
    if (!s) throw new Error("escribe un polinomio");
    if (/[^0-9x+\-*\/^().,]/.test(s)) throw new Error("solo se admiten números, la letra x y los signos + − * / ^ ( )");
    var i = 0;
    function peek() { return s.charAt(i); }
    function expr() {
      var r = term();
      while (peek() === "+" || peek() === "-") { var op = s.charAt(i++), t = term(); r = op === "+" ? padd(r, t) : psub(r, t); }
      return r;
    }
    function term() {
      var r = unario();
      for (;;) {
        var c = peek();
        if (c === "*") { i++; r = pmul(r, unario()); }
        else if (c === "/") {
          i++; var d = unario();
          if (d.length !== 1) throw new Error("solo se puede dividir entre un número");
          if (qcero(d[0])) throw new Error("división entre cero");
          r = pesc(r, qdiv(q1, d[0]));
        }
        else if (c === "x" || c === "(") r = pmul(r, potencia());
        else break;
      }
      return r;
    }
    function unario() {
      if (peek() === "-") { i++; return pneg(unario()); }
      if (peek() === "+") { i++; return unario(); }
      return potencia();
    }
    function potencia() {
      var b = atomo();
      if (peek() === "^") {
        i++;
        var neg = false; if (peek() === "-") { neg = true; i++; }
        var m = /^[0-9]+/.exec(s.slice(i));
        if (!m) throw new Error("el exponente debe ser un número entero");
        i += m[0].length;
        var n = parseInt(m[0], 10);
        if (neg) throw new Error("el exponente no puede ser negativo");
        if (n > 12) throw new Error("exponente demasiado grande");
        b = ppot(b, n);
      }
      return b;
    }
    function atomo() {
      var c = peek();
      if (c === "(") { i++; var r = expr(); if (peek() !== ")") throw new Error("falta cerrar un paréntesis"); i++; return r; }
      if (c === "x") { i++; return [q0, q1]; }
      var m = /^[0-9]+([.,][0-9]+)?/.exec(s.slice(i));
      if (!m) throw new Error("no entiendo «" + (s.slice(i, i + 3) || "el final") + "»");
      i += m[0].length;
      var v = decimal(m[0]);
      return qcero(v) ? [] : [v];
    }
    var r = expr();
    if (i < s.length) throw new Error("no entiendo «" + s.slice(i, i + 3) + "»");
    return r;
  }
  function leerQ(src) {   // un número racional: "3", "-1/2", "0,25"
    var s = String(src).replace(/\s+/g, "").replace(/[−–—]/g, "-");
    var m = /^(-?[0-9]+(?:[.,][0-9]+)?)(?:\/(-?[0-9]+(?:[.,][0-9]+)?))?$/.exec(s);
    if (!m) throw new Error("escribe un número, por ejemplo 2, −1/2 o 0,5");
    var a = decimal(m[1]), b = m[2] ? decimal(m[2]) : q1;
    if (qcero(b)) throw new Error("denominador cero");
    return qdiv(a, b);
  }

  // ----- Ruffini -----
  function ruffini(p, a) {
    var co = []; for (var i = p.length - 1; i >= 0; i--) co.push(p[i]);   // de mayor a menor grado
    var abajo = [co[0]], prod = [];
    for (i = 1; i < co.length; i++) { var m = qmul(abajo[i - 1], a); prod.push(m); abajo.push(qadd(co[i], m)); }
    return { co: co, prod: prod, abajo: abajo, resto: abajo[abajo.length - 1], cociente: abajo.slice(0, -1) };
  }

  // ----- raíces racionales -----
  function divisores(n) {
    n = Math.abs(n); var r = [];
    for (var i = 1; i * i <= n; i++) if (n % i === 0) { r.push(i); if (i * i !== n) r.push(n / i); }
    return r.sort(function (a, b) { return a - b; });
  }
  function candidatos(pEnt) {      // pEnt: polinomio de coeficientes enteros con término independiente ≠ 0
    var a0 = Math.abs(pEnt[0].n), an = Math.abs(pEnt[pEnt.length - 1].n), seen = {}, lista = [];
    divisores(a0).forEach(function (p) { divisores(an).forEach(function (q) {
      var f = Q(p, q), k = f.n + "/" + f.d;
      if (!seen[k]) { seen[k] = 1; lista.push(f); }
    }); });
    lista.sort(function (a, b) { return qnum(a) - qnum(b); });
    var res = []; lista.forEach(function (f) { res.push(f); res.push(qneg(f)); });
    return res;
  }

  // Factorización sobre los racionales mediante raíces. Devuelve
  //   { c: constante, factores: [{ p: polinomio primitivo, m: multiplicidad, raiz?: Q }], traza: [...] }
  function factorizar(p) {
    p = norm(p);
    var traza = [], factores = [], pr = primitivo(p), c = pr.c, r = pr.p;
    function anota(f) {
      for (var i = 0; i < factores.length; i++) if (pigual(factores[i].p, f.p)) { factores[i].m += f.m; return; }
      factores.push(f);
    }
    // raíz 0 (factor común x^k)
    var k = 0; while (r.length > 1 && qcero(r[0])) { r = r.slice(1); k++; }
    if (k) { anota({ p: [q0, q1], m: k, raiz: q0 }); traza.push({ tipo: "comun", k: k, resto: r.slice() }); }
    var seguir = true;
    while (seguir && r.length > 2) {          // grado ≥ 2
      seguir = false;
      var cand = candidatos(r);
      for (var i = 0; i < cand.length; i++) {
        if (qcero(peval(r, cand[i]))) {
          var fac = [qneg(Q(cand[i].n)), Q(cand[i].d)];            // (d·x − n)
          var div = pdivmod(r, fac);
          traza.push({ tipo: "raiz", raiz: cand[i], rf: ruffini(r, cand[i]), antes: r.slice(), despues: div.c.slice() });
          anota({ p: fac, m: 1, raiz: cand[i] });
          var pc = primitivo(div.c); c = qmul(c, pc.c); r = pc.p;
          seguir = true; break;
        }
      }
    }
    if (r.length === 2) {       // factor lineal que queda: (a x + b)
      var pl = primitivo(r); c = qmul(c, pl.c);
      anota({ p: pl.p, m: 1, raiz: qdiv(qneg(pl.p[0]), pl.p[1]) });
    } else if (r.length > 2) {
      var pr2 = primitivo(r); c = qmul(c, pr2.c);
      anota({ p: pr2.p, m: 1, irreducible: true });
    } else if (r.length === 1) c = qmul(c, r[0]);
    // ordenar: lineales por raíz, luego el resto
    factores.sort(function (a, b) {
      var ra = a.raiz ? (qcero(a.raiz) ? -Infinity : qnum(a.raiz)) : 1e18, rb = b.raiz ? (qcero(b.raiz) ? -Infinity : qnum(b.raiz)) : 1e18;
      return ra === rb ? 0 : ra < rb ? -1 : 1;
    });
    return { c: c, factores: factores, traza: traza };
  }
  function factorTxt(f, o) {
    o = o || {};
    var t = f.factores.map(function (fa) {
      var base = ptxt(fa.p);
      if (fa.p.length === 2 && qigual(fa.p[1], q1) && qcero(fa.p[0])) base = "x";
      var conPar = fa.p.length > 2 || (fa.p.length === 2 && !(qcero(fa.p[0]) && qigual(fa.p[1], q1)));
      return (conPar ? "(" + base + ")" : base) + (fa.m > 1 ? U.sup(fa.m) : "");
    }).join("");
    var c = f.c;
    if (qigual(c, q1)) return t || "1";
    if (qigual(c, Q(-1))) return "−" + (t || "1");
    return qtxt(c, true) + (t ? (t.charAt(0) === "(" || t.charAt(0) === "x" ? "" : "·") + t : "");
  }
  A.factorizar = function (src) { var p = leer(src); return factorizar(p); };
  A.factorTxt = factorTxt;
  A.leer = leer; A.leerQ = leerQ;

  // ----- raíces reales (numéricas) por recursión sobre la derivada -----
  function raicesReales(p) {
    p = norm(p);
    if (p.length <= 1) return [];
    var sf = pdivmod(p, pgcd(p, pder(p))).c;       // parte libre de cuadrados
    function rec(q) {
      q = norm(q);
      var d = q.length - 1;
      if (d <= 0) return [];
      if (d === 1) return [-qnum(q[0]) / qnum(q[1])];
      var cr = rec(pder(q)), cota = 0, an = qnum(q[d]);
      for (var i = 0; i < d; i++) cota = Math.max(cota, Math.abs(qnum(q[i]) / an));
      cota += 1;
      var pts = [-cota].concat(cr).concat([cota]), res = [];
      for (i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], fa = pevalN(q, a), fb = pevalN(q, b);
        if (Math.abs(fa) < 1e-12) { if (!res.length || Math.abs(res[res.length - 1] - a) > 1e-9) res.push(a); continue; }
        if (fa * fb < 0) {
          for (var it = 0; it < 80; it++) { var m = (a + b) / 2, fm = pevalN(q, m); if (fa * fm <= 0) { b = m; } else { a = m; fa = fm; } }
          res.push((a + b) / 2);
        }
      }
      if (Math.abs(pevalN(q, pts[pts.length - 1])) < 1e-12) res.push(pts[pts.length - 1]);
      return res;
    }
    return rec(sf).sort(function (a, b) { return a - b; });
  }

  A.p = { norm: norm, grado: grado, add: padd, sub: psub, mul: pmul, divmod: pdivmod, eval: peval, evalN: pevalN, der: pder, gcd: pgcd, txt: ptxt, leer: leer, igual: pigual, primitivo: primitivo, raices: raicesReales, ruffini: ruffini };

  // Número de intervalos: ayudante de formato para raíces y valores decimales
  function num(x) { return fmt(Math.abs(x) < 1e-9 ? 0 : x, 3); }
  function numQ(x) { return qtxt(x); }
  A.num = num;

  // ============================================================
  // Utilidad: campo de texto
  // ============================================================
  function campo(host, etiqueta, valor, ancho, aria) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + etiqueta + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 180) + 'px" value="' + valor + '" aria-label="' + (aria || etiqueta.replace(/<[^>]+>/g, "")) + '">';
    host.appendChild(l);
    return l.querySelector("input");
  }
  // Rango razonable para dibujar un polinomio: contiene sus raíces reales y sus puntos críticos
  function rangoPoli(p, extra) {
    var pts = raicesReales(p).concat(raicesReales(pder(p))).concat(extra || []);
    var lo = Math.min.apply(null, pts.concat([-1])), hi = Math.max.apply(null, pts.concat([1]));
    var m = Math.max(1, (hi - lo) * 0.25);
    return [lo - m, hi + m];
  }
  function rangoY(f, x0, x1) {
    var mn = Infinity, mx = -Infinity;
    for (var i = 0; i <= 120; i++) { var v = f(x0 + (x1 - x0) * i / 120); if (isFinite(v) && Math.abs(v) < 1e6) { mn = Math.min(mn, v); mx = Math.max(mx, v); } }
    if (!isFinite(mn)) { mn = -1; mx = 1; }
    mn = Math.min(mn, 0); mx = Math.max(mx, 0);
    var pad = (mx - mn || 2) * 0.12;
    return [mn - pad, mx + pad];
  }
  A.rangoPoli = rangoPoli; A.rangoY = rangoY;

  // ============================================================
  // POLINOMIOS: calculadora con todos los pasos
  // ============================================================
  B.w.polinomios = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora de polinomios");
    cuerpo.innerHTML = '<div data-ops></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["x^3-2x^2-5x+6", "x+2", "x³ − 2x² − 5x + 6 y x + 2"], ["2x^2+3x-1", "x^2-x+4", "2x² + 3x − 1 y x² − x + 4"], ["x^4-3x^2+2x-5", "x^2+1", "x⁴ − 3x² + 2x − 5 y x² + 1"], ["6x^3+x^2-5x+2", "2x-1", "6x³ + x² − 5x + 2 y 2x − 1"]];
    var st = { op: "div", P: PRE[0][0], Q: PRE[0][1] }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
    var iP = campo(ctl, "P(x) =", st.P, 220), iQ = campo(ctl, "Q(x) =", st.Q, 170);
    var lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var P, Qp;
      try { P = leer(st.P); Qp = leer(st.Q); } catch (e) { lectura.innerHTML = U.lec("Revisa lo que has escrito", e.message, "red"); pasos.innerHTML = ""; g.limpiar(); return; }
      var res, lec = "", pas = "", R = null, C = null;
      var dP = grado(P), dQ = grado(Qp);
      if (st.op === "sum") { res = padd(P, Qp); pas = "Se agrupan los términos del mismo grado: <b>" + ptxt(P) + "</b> + <b>" + ptxt(Qp) + "</b> = <b>" + ptxt(res) + "</b>."; }
      else if (st.op === "res") { res = psub(P, Qp); pas = "Al restar, se cambia el signo de <i>todos</i> los términos de Q: <b>" + ptxt(P) + "</b> − (" + ptxt(Qp) + ") = <b>" + ptxt(res) + "</b>."; }
      else if (st.op === "mul") {
        res = pmul(P, Qp);
        pas = "Cada término de P se multiplica por cada término de Q (se multiplican coeficientes y se <b>suman</b> exponentes) y después se agrupan los semejantes. Resultado: <b>" + ptxt(res) + "</b>.";
      } else {
        if (!Qp.length) { lectura.innerHTML = U.lec("Q(x) = 0", "No se puede dividir entre cero", "red"); pasos.innerHTML = ""; return; }
        var log = [], dv = pdivmod(P, Qp, log); C = dv.c; R = dv.r; res = C;
        pas = "<ol class='w-ol'>" + (log.length ? log.map(function (s) {
          return "<li>Divide el término de mayor grado del dividendo entre el de Q: <b>" + monomio(s.k, s.e, "x", true) + "</b>. Multiplica ese término por Q → <b>" + ptxt(s.prod) + "</b> y réstalo: queda <b>" + ptxt(s.resto) + "</b>.</li>";
        }).join("") : "<li>El grado de P es menor que el de Q: no hay nada que dividir. Cociente 0 y resto P.</li>") + "</ol>";
        pas += "<p>Cociente <b>C(x) = " + ptxt(C) + "</b> y resto <b>R(x) = " + ptxt(R) + "</b>. Prueba de la división: <b>P = Q·C + R</b> → " + (pigual(padd(pmul(Qp, C), R), P) ? "<span class='ok'>se cumple ✓</span>" : "<span class='red'>no se cumple</span>") + ".</p>";
      }
      var dRes = grado(res);
      lec = U.lec("P(x)", ptxt(P) + " (grado " + (dP < 0 ? "—" : dP) + ")") + U.lec("Q(x)", ptxt(Qp) + " (grado " + (dQ < 0 ? "—" : dQ) + ")");
      if (st.op === "div") lec += U.lec("Cociente", ptxt(C), "ok") + U.lec("Resto", ptxt(R), R && R.length ? "red" : "ok");
      else lec += U.lec({ sum: "P + Q", res: "P − Q", mul: "P · Q" }[st.op], ptxt(res), "ok") + U.lec("Grado del resultado", dRes < 0 ? "—" : dRes);
      lectura.innerHTML = lec;
      pasos.innerHTML = pas;
      pie.innerHTML = st.op === "mul" ? "Fíjate: <b>grado(P·Q) = grado P + grado Q</b> (aquí " + dP + " + " + dQ + " = " + (dP + dQ) + ")." : st.op === "div" ? "En una división, <b>grado(C) = grado P − grado Q</b> y el resto siempre tiene grado <b>menor</b> que Q. Si el resto es 0, la división es exacta y Q es factor de P." : "Al sumar o restar, el grado del resultado nunca supera al mayor de los dos (y puede bajar si se cancelan los términos principales).";
      // gráfica
      var rp = rangoPoli(P.length ? P : [q1], Qp.length ? raicesReales(Qp) : []), x0 = Math.max(-12, rp[0]), x1 = Math.min(12, rp[1]);
      var fP = function (x) { return pevalN(P, x); }, fQ = function (x) { return pevalN(Qp, x); }, fR = function (x) { return pevalN(st.op === "div" ? C : res, x); };
      var ry = rangoY(function (x) { return Math.max(Math.min(fP(x), 1e5), -1e5); }, x0, x1);
      g.rango(x0, x1, Math.max(ry[0], -60), Math.min(ry[1], 60));
      g.limpiar();
      g.curva(fP, { clase: "c-pen" });
      g.curva(fQ, { clase: "c-red", dash: "6 4" });
      g.curva(fR, { clase: "c-ok" });
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 5, ymin: -10, ymax: 10, w: 640, h: 280, etx: "x", ety: "y", etiqueta: "Gráficas de P (azul), Q (rojo, discontinua) y el resultado (verde)" });
    U.fichas(cuerpo.querySelector("[data-ops]"), [{ k: "sum", t: "P + Q" }, { k: "res", t: "P − Q" }, { k: "mul", t: "P · Q" }, { k: "div", t: "P ÷ Q" }], st.op, function (k) { st.op = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.P = PRE[+k][0]; st.Q = PRE[+k][1]; iP.value = st.P; iQ.value = st.Q; pinta(); });
    iP.addEventListener("input", function () { st.P = iP.value; pinta(); });
    iQ.addEventListener("input", function () { st.Q = iQ.value; pinta(); });
    pinta();
  };

  // ============================================================
  // NOTABLE: identidades notables como áreas
  // ============================================================
  B.w.notable = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las identidades notables, vistas como áreas");
    cuerpo.innerHTML = '<div data-modo></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "suma", a: 5, b: 2 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Lado <i>a</i>", min: 1, max: 8, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Lado <i>b</i>", min: 0.5, max: 6, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var a = st.a, b = st.b, t = "", l = "", ex;
      if (st.modo === "dif" && b >= a) b = a - 0.5;
      if (st.modo === "cuad" && b >= a) b = a - 0.5;
      g.limpiar();
      if (st.modo === "suma") {
        g.rango(-0.5, a + b + 0.5, -0.5, a + b + 0.5);
        g.rect(0, 0, a, a, { clase: "z-pen", borde: "var(--pen)" });
        g.rect(a, a, a + b, a + b, { clase: "z-red", borde: "var(--red)" });
        g.rect(a, 0, a + b, a, { clase: "z-ok", borde: "var(--ok)" });
        g.rect(0, a, a, a + b, { clase: "z-ok", borde: "var(--ok)" });
        g.texto(a / 2, a / 2, "a²", { clase: "pen", ancla: "middle" }); g.texto(a + b / 2, a + b / 2, "b²", { clase: "red", ancla: "middle" });
        g.texto(a + b / 2, a / 2, "ab", { clase: "ok", ancla: "middle" }); g.texto(a / 2, a + b / 2, "ab", { clase: "ok", ancla: "middle" });
        ex = (a + b) * (a + b);
        lectura.innerHTML = U.lec("(a + b)²", "(" + fmt(a, 1) + " + " + fmt(b, 1) + ")² = " + fmt(ex, 2), "pen") + U.lec("a² + 2ab + b²", fmt(a * a, 2) + " + " + fmt(2 * a * b, 2) + " + " + fmt(b * b, 2) + " = " + fmt(a * a + 2 * a * b + b * b, 2), "ok") + U.lec("Error típico a² + b²", fmt(a * a + b * b, 2) + " (¡falta " + fmt(2 * a * b, 2) + "!)", "red");
        pie.innerHTML = "El cuadrado grande tiene de lado <b>a + b</b>, así que su área es (a + b)². Pero está formado por cuatro piezas: un cuadrado a², un cuadrado b² y <b>dos rectángulos ab</b>. Por eso (a+b)² = a² + 2ab + b² y no a² + b².";
      } else if (st.modo === "dif") {
        g.rango(-0.5, a + 0.5, -0.5, a + 0.5);
        g.rect(0, 0, a - b, a - b, { clase: "z-pen", borde: "var(--pen)" });
        g.rect(a - b, 0, a, a, { clase: "z-red", borde: "var(--red)" });
        g.rect(0, a - b, a - b, a, { clase: "z-red", borde: "var(--red)" });
        g.texto((a - b) / 2, (a - b) / 2, "(a−b)²", { clase: "pen", ancla: "middle" });
        g.texto(a - b / 2, a / 2, "b·a", { clase: "red", ancla: "middle" });
        g.texto((a - b) / 2, a - b / 2, "b(a−b)", { clase: "red", ancla: "middle" });
        ex = (a - b) * (a - b);
        lectura.innerHTML = U.lec("(a − b)²", "(" + fmt(a, 1) + " − " + fmt(b, 1) + ")² = " + fmt(ex, 2), "pen") + U.lec("a² − 2ab + b²", fmt(a * a, 2) + " − " + fmt(2 * a * b, 2) + " + " + fmt(b * b, 2) + " = " + fmt(a * a - 2 * a * b + b * b, 2), "ok");
        pie.innerHTML = "Partimos del cuadrado de lado <b>a</b> (área a²). Le quitamos dos franjas de ancho b (en rojo): cada una tiene área a·b, pero el cuadradito b² de la esquina superior derecha se ha quitado <b>dos veces</b>. Hay que devolverlo una vez: a² − 2ab + b². Lo que queda (azul) es el cuadrado de lado a − b.";
      } else {
        g.rango(-0.5, a + b + 0.5, -1.3, a + 0.5);
        // cuadrado a×a sin la esquina b×b; la pieza superior izquierda se recoloca a la derecha
        g.rect(0, 0, a, a - b, { clase: "z-pen", borde: "var(--pen)" });
        g.rect(0, a - b, a - b, a, { clase: "z-red", borde: "var(--red)" });
        g.rect(a - b, a - b, a, a, { clase: "z-hl", borde: "var(--hl)", dash: "4 3" });
        g.rect(a, 0, a + b, a - b, { clase: "z-red", borde: "var(--red)", dash: "5 4" });
        g.texto(a / 2, (a - b) / 2, "a(a − b)", { clase: "pen", ancla: "middle" });
        g.texto((a - b) / 2, a - b / 2, "b(a − b)", { clase: "red", ancla: "middle" });
        g.texto(a + b / 2, (a - b) / 2, "b(a − b)", { clase: "red", ancla: "middle" });
        g.texto(a - b / 2, a - b / 2, "b²", { clase: "", ancla: "middle" });
        g.segmento(0, -0.45, a + b, -0.45, { clase: "c-ok" });
        g.texto((a + b) / 2, -0.45, "a + b", { clase: "ok", ancla: "middle", dy: 18 });
        ex = (a + b) * (a - b);
        lectura.innerHTML = U.lec("(a + b)(a − b)", "(" + fmt(a + b, 1) + ")·(" + fmt(a - b, 1) + ") = " + fmt(ex, 2), "pen") + U.lec("a² − b²", fmt(a * a, 2) + " − " + fmt(b * b, 2) + " = " + fmt(a * a - b * b, 2), "ok");
        pie.innerHTML = "Al cuadrado de lado a le quitamos el cuadradito b² de una esquina (amarillo). Lo que queda tiene forma de L. Si cortas la pieza <b style='color:var(--red)'>roja</b> y la mueves a la derecha (recuadro discontinuo), el resultado es un <b>rectángulo de lados (a + b) y (a − b)</b>. Mismas piezas, misma área: a² − b² = (a + b)(a − b).";
      }
      if (st.modo === "dif" && b < 0.5) b = 0.5;
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -0.5, xmax: 8, ymin: -0.5, ymax: 8, w: 520, h: 360, etx: "", ety: "", sinEjes: true, etiqueta: "Áreas que explican las identidades notables" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "(a + b)²" }, { k: "dif", t: "(a − b)²" }, { k: "cuad", t: "a² − b²" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // RUFFINI: paso a paso
  // ============================================================
  B.w.ruffini = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Regla de Ruffini, paso a paso");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="w-ruf"></div><div class="lectura"></div><p class="w-pie"></p>';
    var PRE = [["x^3-2x^2-5x+6", "1", "x³ − 2x² − 5x + 6 entre x − 1"], ["x^3-2x^2-5x+6", "2", "el mismo entre x − 2 (resto ≠ 0)"], ["2x^3+3x^2-8x+3", "1", "2x³ + 3x² − 8x + 3 entre x − 1"], ["x^4-5x^2+4", "-1", "x⁴ − 5x² + 4 entre x + 1 (faltan términos)"], ["x^3-27", "3", "x³ − 27 entre x − 3"]];
    var st = { P: PRE[0][0], a: PRE[0][1], paso: 0 };
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), zona = cuerpo.querySelector(".w-ruf"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iP = campo(ctl, "P(x) =", st.P, 220), iA = campo(ctl, "a =", st.a, 70, "Valor de a (divisor x − a)");
    var bSig = U.boton(ctl, "Siguiente paso ▸", function () { st.paso++; pinta(); });
    var bTodo = U.boton(ctl, "Ver todo", function () { st.paso = 999; pinta(); });
    U.boton(ctl, "↺ Reiniciar", function () { st.paso = 0; pinta(); });
    function pinta() {
      var P, a;
      try { P = leer(st.P); a = leerQ(st.a); if (P.length < 2) throw new Error("el polinomio debe tener grado 1 o más"); } catch (e) { zona.innerHTML = ""; lectura.innerHTML = U.lec("Revisa lo que has escrito", e.message, "red"); pie.innerHTML = ""; return; }
      var R = ruffini(P, a), n = R.co.length, total = 1 + (n - 1);   // paso 0: planteamiento; luego 1 por columna
      var paso = Math.min(st.paso, total);
      var d = grado(P);
      // coeficientes con ceros marcados
      var cab = "<tr><td class='ruf-vacia'></td>" + R.co.map(function (c, i) { var e = d - i; return "<td class='ruf-co" + (qcero(c) ? " ruf-cero" : "") + "' title='coeficiente de x" + (e > 1 ? U.sup(e) : e === 1 ? "" : "⁰ (término independiente)") + "'>" + qtxt(c) + "</td>"; }).join("") + "</tr>";
      var f2 = "<tr><td class='ruf-a'>" + qtxt(a) + "</td><td class='ruf-vacia'></td>" + R.prod.map(function (m, i) { return "<td class='ruf-prod" + (i + 1 <= paso - 1 ? "" : " ruf-oculto") + "'>" + qtxt(m) + "</td>"; }).join("") + "</tr>";
      var f3 = "<tr class='ruf-linea'><td class='ruf-vacia'></td>" + R.abajo.map(function (s, i) {
        var visible = i + 1 <= paso, ultimo = i === n - 1;
        return "<td class='ruf-res" + (visible ? "" : " ruf-oculto") + (ultimo ? " ruf-resto" : "") + "'>" + qtxt(s) + "</td>";
      }).join("") + "</tr>";
      zona.innerHTML = "<table class='ruf'>" + cab + f2 + f3 + "</table>";
      var txt = "";
      if (paso === 0) txt = "Escribimos los coeficientes de P ordenados de mayor a menor grado <b>(con un 0 donde falta algún término)</b> y a la izquierda el valor <b>a = " + qtxt(a) + "</b> (se divide entre x − a" + (qcero(a) ? "" : (a.n < 0 ? ", es decir, x + " + qtxt(qneg(a)) : "")) + ").";
      else if (paso === 1) txt = "<b>Bajamos</b> el primer coeficiente tal cual: " + qtxt(R.abajo[0]) + ".";
      else if (paso <= total) { var i = paso - 1; txt = "Multiplicamos lo último que hemos bajado por a: " + qtxt(R.abajo[i - 1], true) + "·" + qtxt(a, true) + " = <b>" + qtxt(R.prod[i - 1]) + "</b>. Lo escribimos debajo del siguiente coeficiente y <b>sumamos</b>: " + qtxt(R.co[i], true) + " + " + qtxt(R.prod[i - 1], true) + " = <b>" + qtxt(R.abajo[i]) + "</b>."; if (i === n - 1) txt += " Este último número es el <b>resto</b>."; }
      pie.innerHTML = txt;
      if (paso >= total) {
        var cocT = ptxt(R.cociente.slice().reverse()), pa = peval(P, a);
        lectura.innerHTML = U.lec("Cociente", cocT, "ok") + U.lec("Resto", qtxt(R.resto), qcero(R.resto) ? "ok" : "red") + U.lec("P(" + qtxt(a) + ") — teorema del resto", qtxt(pa), qigual(pa, R.resto) ? "pen" : "red") +
          U.lec("Conclusión", qcero(R.resto) ? "x − " + qtxt(a, true) + " es factor de P: P = (x − " + qtxt(a, true) + ")·(" + cocT + ")" : "la división no es exacta: P = (x − " + qtxt(a, true) + ")·(" + cocT + ") + " + qtxt(R.resto), qcero(R.resto) ? "ok" : "");
      } else lectura.innerHTML = U.lec("Paso", (paso) + " de " + total) + U.lec("Pista", paso === 0 ? "pulsa «Siguiente paso»" : "multiplica y suma");
      bSig.disabled = paso >= total; bTodo.disabled = paso >= total;
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.P = PRE[+k][0]; st.a = PRE[+k][1]; iP.value = st.P; iA.value = st.a; st.paso = 0; pinta(); });
    iP.addEventListener("input", function () { st.P = iP.value; st.paso = 0; pinta(); });
    iA.addEventListener("input", function () { st.a = iA.value; st.paso = 0; pinta(); });
    pinta();
  };

  // ============================================================
  // FACTORIZAR: raíces, Ruffini y gráfica
  // ============================================================
  B.w.factorizar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Factorizador: busca las raíces y factoriza");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["x^3-2x^2-5x+6", "x³ − 2x² − 5x + 6"], ["x^3-6x^2+11x-6", "x³ − 6x² + 11x − 6"], ["x^4-5x^2+4", "x⁴ − 5x² + 4"], ["2x^3-3x^2-3x+2", "2x³ − 3x² − 3x + 2"], ["x^3-3x^2+3x-1", "x³ − 3x² + 3x − 1 (raíz triple)"], ["x^3+x^2+x+1", "x³ + x² + x + 1"], ["x^4+x^2-2", "x⁴ + x² − 2"], ["x^5-x", "x⁵ − x"]];
    var st = { P: PRE[0][0] }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos"), pie = cuerpo.querySelector(".w-pie");
    var iP = campo(ctl, "P(x) =", st.P, 260);
    function pinta() {
      var P;
      try { P = leer(st.P); if (P.length < 2) throw new Error("escribe un polinomio de grado 1 o más"); if (P.length > 9) throw new Error("grado máximo: 8"); } catch (e) { lectura.innerHTML = U.lec("Revisa lo que has escrito", e.message, "red"); pasos.innerHTML = ""; g.limpiar(); return; }
      var f = factorizar(P), h = "<ol class='w-ol'>", pr = primitivo(P);
      if (!qigual(pr.c, q1)) h += "<li>Sacamos el <b>factor común numérico</b> " + qtxt(pr.c) + ": P = " + qtxt(pr.c, true) + "·(" + ptxt(pr.p) + ").</li>";
      f.traza.forEach(function (t) {
        if (t.tipo === "comun") h += "<li>No hay término independiente: sacamos <b>factor común " + (t.k === 1 ? "x" : "x" + U.sup(t.k)) + "</b>. Queda " + (t.resto.length > 1 ? "(" + ptxt(t.resto) + ")" : "") + ".</li>";
        else {
          var rf = t.rf, cd = rf.co.length;
          var cand = t.raiz;
          h += "<li>Probamos <b>x = " + qtxt(cand) + "</b> (P(" + qtxt(cand) + ") = 0): Ruffini → coeficientes del cociente <b>" + rf.cociente.map(function (c) { return qtxt(c); }).join(", ") + "</b> y resto <b>0</b>. Factor <b>(" + (cand.d === 1 ? "x " + (cand.n < 0 ? "+ " + (-cand.n) : "− " + cand.n) : ptxt([qneg(Q(cand.n)), Q(cand.d)])) + ")</b>.</li>";
        }
      });
      var irr = f.factores.filter(function (x) { return x.irreducible; });
      if (irr.length) h += "<li>Queda <b>" + ptxt(irr[0].p) + "</b>: no tiene más raíces racionales" + (irr[0].p.length === 3 ? " (su discriminante " + (function () { var p = irr[0].p, D = qnum(p[1]) * qnum(p[1]) - 4 * qnum(p[2]) * qnum(p[0]); return D < 0 ? "es negativo: no tiene raíces reales" : "no es un cuadrado perfecto: sus raíces son irracionales"; })() + ")" : "") + ", así que no se puede factorizar más con números racionales.</li>";
      h += "</ol>";
      var rr = raicesReales(P);
      lectura.innerHTML = U.lec("Factorización", factorTxt(f), "ok") + U.lec("Raíces reales", rr.length ? rr.map(num).join(", ") : "ninguna", rr.length ? "pen" : "red") + U.lec("Grado", grado(P)) + U.lec("Término independiente", qtxt(P[0]));
      pasos.innerHTML = h;
      var pp = primitivo(P).p, k0 = 0; while (k0 < pp.length - 1 && qcero(pp[k0])) k0++;
      var cand = pp.length - k0 > 2 ? candidatos(pp.slice(k0)) : [];
      pie.innerHTML = cand.length ? "Candidatos a raíz racional (±divisores de a₀ entre divisores de aₙ): " + cand.filter(function (c) { return c.n > 0; }).slice(0, 18).map(function (c) { return qcero(peval(P, c)) || qcero(peval(P, qneg(c))) ? "<b style='color:var(--ok)'>±" + qtxt(c) + "</b>" : "±" + qtxt(c); }).join(", ") + (cand.length > 36 ? "…" : "") + ". En verde, los que resultan ser raíz." : "";
      var x0 = rangoPoli(P), ry;
      var fP = function (x) { return pevalN(P, x); };
      ry = rangoY(fP, x0[0], x0[1]);
      var cap = Math.max(Math.abs(ry[0]), Math.abs(ry[1]));
      g.rango(x0[0], x0[1], Math.max(ry[0], -cap), Math.min(ry[1], cap));
      g.limpiar();
      g.curva(fP, { clase: "c-pen" });
      rr.forEach(function (r) { g.punto(r, 0, { r: 6, clase: "c-red" }); g.texto(r, 0, num(r), { dy: 18, ancla: "middle", clase: "red" }); });
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -4, xmax: 4, ymin: -10, ymax: 10, w: 640, h: 300, etx: "x", ety: "P(x)", etiqueta: "Gráfica del polinomio con sus raíces reales" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[1] }; }), "", function (k) { st.P = PRE[+k][0]; iP.value = st.P; pinta(); });
    iP.addEventListener("input", function () { st.P = iP.value; pinta(); });
    pinta();
  };

  // ax² + bx + c escrito sin coeficientes 1 ni sumandos nulos (con decimales)
  function eq2(a, b, c) {
    function mono(k, suf, primero) {
      if (k === 0) return "";
      var ab = Math.abs(k), signo = primero ? (k < 0 ? "−" : "") : (k < 0 ? " − " : " + ");
      return signo + (ab === 1 && suf ? "" : fmt(ab, 2)) + suf;
    }
    var t = mono(a, "x²", true) + mono(b, "x", !a) + mono(c, "", !a && !b);
    return t || "0";
  }

  // ============================================================
  // PARABOLA: ax² + bx + c y su discriminante
  // ============================================================
  B.w.parabola = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La ecuación de segundo grado y su gráfica");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 1, b: -3, c: 2 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = function (et, k, mn, mx) { return U.slider(ctl, { et: et, min: mn, max: mx, step: 0.5, val: st[k], on: function (v) { if (k === "a" && Math.abs(v) < 0.25) v = v < 0 ? -0.5 : 0.5; st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); };
    var sa = sl("<i>a</i>", "a", -4, 4); sl("<i>b</i>", "b", -8, 8); sl("<i>c</i>", "c", -8, 8);
    function pinta() {
      var a = st.a === 0 ? 0.5 : st.a, b = st.b, c = st.c, D = b * b - 4 * a * c, xv = -b / (2 * a), yv = a * xv * xv + b * xv + c;
      var f = function (x) { return a * x * x + b * x + c; };
      var cx = [xv, 0], cy = [yv, 0, c];
      if (D >= 0) { var s0 = Math.sqrt(D); cx.push((-b - s0) / (2 * a), (-b + s0) / (2 * a)); }
      var xlo = Math.min.apply(null, cx) - 2, xhi = Math.max.apply(null, cx) + 2;
      if (xhi - xlo < 7) { var mid = (xlo + xhi) / 2; xlo = mid - 3.5; xhi = mid + 3.5; }
      var ylo = Math.min.apply(null, cy), yhi = Math.max.apply(null, cy), span = Math.max(yhi - ylo, 2);
      g.rango(xlo, xhi, ylo - span * 0.35 - 0.5, yhi + span * 0.35 + 0.5);
      g.limpiar();
      g.vertical(xv, { clase: "c-ok", dash: "5 4" });
      g.curva(f, { clase: "c-pen" });
      g.punto(xv, yv, { r: 5, clase: "c-ok" }); g.texto(xv, yv, "vértice", { dx: 8, dy: a > 0 ? 18 : -10, clase: "ok" });
      g.punto(0, c, { r: 4, clase: "c-ink" }); g.texto(0, c, "c = " + fmt(c, 1), { dx: 8, dy: -8 });
      var raices = "", cl = "", nota = "";
      if (D > 0) {
        var s1 = Math.sqrt(D), x1 = (-b - s1) / (2 * a), x2 = (-b + s1) / (2 * a);
        g.punto(x1, 0, { r: 6, clase: "c-red" }); g.punto(x2, 0, { r: 6, clase: "c-red" });
        raices = "x₁ = " + fmt(Math.min(x1, x2), 3) + " · x₂ = " + fmt(Math.max(x1, x2), 3); cl = "ok";
        nota = "<b>Δ &gt; 0</b>: la parábola corta al eje X en dos puntos.";
      } else if (D === 0) { g.punto(xv, 0, { r: 6, clase: "c-red" }); raices = "x = " + fmt(xv, 3) + " (doble)"; cl = "pen"; nota = "<b>Δ = 0</b>: el vértice toca el eje X; hay una solución doble."; }
      else { raices = "no hay soluciones reales"; cl = "red"; nota = "<b>Δ &lt; 0</b>: la parábola no llega a cortar el eje X " + (a > 0 ? "(está toda por encima)" : "(está toda por debajo)") + "."; }
      var suma = -b / a, prod = c / a;
      lectura.innerHTML = U.lec("Ecuación", eq2(a, b, c) + " = 0") + U.lec("Discriminante Δ = b² − 4ac", fmt(D, 2), D > 0 ? "ok" : D === 0 ? "pen" : "red") + U.lec("Soluciones", raices, cl) + U.lec("Vértice", "(" + fmt(xv, 2) + " , " + fmt(yv, 2) + ")") + (D >= 0 ? U.lec("Suma · producto", "x₁+x₂ = " + fmt(suma, 2) + " · x₁·x₂ = " + fmt(prod, 2)) : "");
      pie.innerHTML = nota + " La parábola se abre hacia " + (a > 0 ? "arriba (a &gt; 0)" : "abajo (a &lt; 0)") + ". El eje de simetría es <b>x = −b/2a = " + fmt(xv, 2) + "</b> y las soluciones están a la misma distancia a ambos lados.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 7, ymin: -5, ymax: 10, w: 640, h: 300, etx: "x", ety: "y", etiqueta: "Parábola y = ax² + bx + c" });
    pinta();
  };

  // ============================================================
  // BICUADRADA: el cambio t = x²
  // ============================================================
  B.w.bicuadrada = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Ecuación bicuadrada: el cambio t = x²");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 1, b: -5, c: 4 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sa = U.slider(ctl, { et: "<i>a</i>", min: -2, max: 2, step: 1, val: 1, on: function (v) { st.a = v === 0 ? 1 : v; pinta(); }, fmt: function (v) { return String(v === 0 ? 1 : v); } });
    var sb = U.slider(ctl, { et: "<i>b</i>", min: -10, max: 10, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: String });
    var sc = U.slider(ctl, { et: "<i>c</i>", min: -12, max: 12, step: 1, val: st.c, on: function (v) { st.c = v; pinta(); }, fmt: String });
    var PRE = [[1, -5, 4, "x⁴ − 5x² + 4 (4 soluciones)"], [1, 1, -2, "x⁴ + x² − 2 (2 soluciones)"], [1, 2, 1, "x⁴ + 2x² + 1 (sin soluciones)"], [1, -4, 4, "x⁴ − 4x² + 4 (doble)"], [1, 0, -16, "x⁴ − 16"], [1, -10, 9, "x⁴ − 10x² + 9"]];
    function pinta() {
      var a = st.a, b = st.b, c = st.c, D = b * b - 4 * a * c, ts = [], xs = [];
      if (D >= 0) { var s = Math.sqrt(D); ts = D === 0 ? [-b / (2 * a)] : [(-b - s) / (2 * a), (-b + s) / (2 * a)]; }
      var txt = ts.map(function (t) {
        if (t > 1e-12) { xs.push(-Math.sqrt(t), Math.sqrt(t)); return "t = " + fmt(t, 3) + " &gt; 0 ⇒ x = ±" + fmt(Math.sqrt(t), 3); }
        if (Math.abs(t) <= 1e-12) { xs.push(0); return "t = 0 ⇒ x = 0"; }
        return "t = " + fmt(t, 3) + " &lt; 0 ⇒ <span class='red'>se descarta</span>";
      });
      xs.sort(function (p, q) { return p - q; });
      var f = function (x) { return a * Math.pow(x, 4) + b * x * x + c; };
      var lim = xs.length ? Math.max(2, Math.max.apply(null, xs.map(Math.abs)) * 1.5) : 3.5;
      var ys = rangoY(f, -lim, lim);
      g.rango(-lim, lim, Math.max(ys[0], -30), Math.min(ys[1], 30));
      g.limpiar();
      g.curva(f, { clase: "c-pen", n: 400 });
      xs.forEach(function (x) { g.punto(x, 0, { r: 6, clase: "c-red" }); });
      lectura.innerHTML = U.lec("Ecuación", ptxt([Q(c), Q(0), Q(b), Q(0), Q(a)]) + " = 0") + U.lec("Con t = x²  (Δ = " + D + ")", ptxt([Q(c), Q(b), Q(a)], "t") + " = 0", D < 0 ? "red" : "pen") +
        U.lec("Soluciones en t", txt.length ? txt.join("<br>") : "ninguna real (Δ &lt; 0)", ts.length ? "pen" : "red") + U.lec("Soluciones en x", xs.length ? xs.map(function (x) { return fmt(x, 3); }).join(", ") : "ninguna", xs.length ? "ok" : "red");
      pie.innerHTML = "Una bicuadrada puede tener <b>4, 3, 2, 1 o 0</b> soluciones reales. Cada <i>t</i> positivo da dos soluciones (±√t), t = 0 da una, y cada <i>t</i> negativo no da ninguna.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3.5, xmax: 3.5, ymin: -10, ymax: 12, w: 640, h: 280, etx: "x", ety: "y", etiqueta: "Gráfica de ax⁴ + bx² + c" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[3] }; }), "", function (k) { var p = PRE[+k]; st.a = p[0]; st.b = p[1]; st.c = p[2]; sa.set(p[0]); sb.set(p[1]); sc.set(p[2]); pinta(); });
    pinta();
  };

  // ============================================================
  // SISTEMA 2×2: dos rectas
  // ============================================================
  B.w.sistema2x2 = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Sistema de dos ecuaciones: dos rectas");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a1: 2, b1: 3, c1: 12, a2: 1, b2: -1, c2: 1 }, g, sls = {};
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    [["a1", "a₁"], ["b1", "b₁"], ["c1", "c₁"], ["a2", "a₂"], ["b2", "b₂"], ["c2", "c₂"]].forEach(function (p) {
      sls[p[0]] = U.slider(ctl, { et: "<i>" + p[1] + "</i>", min: -9, max: 12, step: 1, val: st[p[0]], on: function (v) { st[p[0]] = v; pinta(); }, fmt: String });
    });
    var PRE = [[2, 3, 12, 1, -1, 1, "Compatible determinado (una solución)"], [1, 2, 4, 2, 4, 8, "Compatible indeterminado (infinitas)"], [1, 2, 4, 2, 4, 3, "Incompatible (ninguna)"], [1, 1, 6, 1, -1, 2, "x + y = 6, x − y = 2"]];
    function lin(a, b, c) {
      var s = (a === 0 ? "" : (a === 1 ? "" : a === -1 ? "−" : a) + "x") + (b === 0 ? "" : (a === 0 ? (b === 1 ? "" : b === -1 ? "−" : b) : (b < 0 ? " − " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b))) + "y");
      return (s || "0") + " = " + c;
    }
    function pinta() {
      var a1 = st.a1, b1 = st.b1, c1 = st.c1, a2 = st.a2, b2 = st.b2, c2 = st.c2, det = a1 * b2 - a2 * b1;
      g.limpiar();
      function traza(a, b, c, cl) {
        if (b !== 0) g.curva(function (x) { return (c - a * x) / b; }, { clase: cl });
        else if (a !== 0) g.vertical(c / a, { clase: cl });
      }
      var tipo, cl, sol = "";
      var rango = (a1 === 0 && b1 === 0) || (a2 === 0 && b2 === 0);
      if (det !== 0) {
        var x = (c1 * b2 - c2 * b1) / det, y = (a1 * c2 - a2 * c1) / det;
        tipo = "Compatible determinado: una única solución"; cl = "ok"; sol = "x = " + fmt(x, 3) + " , y = " + fmt(y, 3);
        g.rango(Math.min(-6, x - 5), Math.max(8, x + 5), Math.min(-6, y - 5), Math.max(8, y + 5));
        g.limpiar(); traza(a1, b1, c1, "c-pen"); traza(a2, b2, c2, "c-red");
        g.punto(x, y, { r: 7, clase: "c-ok" }); g.texto(x, y, "(" + fmt(x, 2) + " , " + fmt(y, 2) + ")", { dx: 10, dy: -10, clase: "ok" });
      } else {
        g.rango(-6, 8, -6, 8); g.limpiar();
        var prop = (a1 * b2 === a2 * b1) && (a1 * c2 === a2 * c1) && (b1 * c2 === b2 * c1);
        var nul1 = a1 === 0 && b1 === 0, nul2 = a2 === 0 && b2 === 0;
        if (nul1 || nul2) {
          var ok1 = nul1 ? c1 === 0 : true, ok2 = nul2 ? c2 === 0 : true;
          if (!ok1 || !ok2) { tipo = "Incompatible: una de las ecuaciones es 0 = " + (nul1 ? c1 : c2) + ", imposible"; cl = "red"; }
          else { tipo = "Compatible indeterminado: una ecuación es 0 = 0 y solo queda una condición"; cl = "pen"; }
          if (!nul1) traza(a1, b1, c1, "c-pen"); if (!nul2) traza(a2, b2, c2, "c-red");
        } else if (prop) { tipo = "Compatible indeterminado: las dos ecuaciones son la misma recta (infinitas soluciones)"; cl = "pen"; traza(a1, b1, c1, "c-pen"); traza(a2, b2, c2, "c-red"); }
        else { tipo = "Incompatible: rectas paralelas, no se cortan (ninguna solución)"; cl = "red"; traza(a1, b1, c1, "c-pen"); traza(a2, b2, c2, "c-red"); }
        sol = "—";
      }
      lectura.innerHTML = U.lec("Ecuación 1 (azul)", lin(a1, b1, c1), "pen") + U.lec("Ecuación 2 (roja)", lin(a2, b2, c2), "red") + U.lec("Determinante a₁b₂ − a₂b₁", fmt(det, 0), det === 0 ? "red" : "") + U.lec("Clasificación", tipo, cl) + U.lec("Solución", sol, cl);
      pie.innerHTML = "<b>Cada ecuación es una recta</b> y resolver el sistema es encontrar sus puntos comunes. Si el determinante a₁b₂ − a₂b₁ vale 0, las rectas tienen la misma dirección: o coinciden (infinitas soluciones) o son paralelas (ninguna).";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 8, ymin: -6, ymax: 8, w: 520, h: 360, etx: "x", ety: "y", etiqueta: "Las dos rectas del sistema" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[6] }; }), "", function (k) { var p = PRE[+k]; ["a1", "b1", "c1", "a2", "b2", "c2"].forEach(function (n, j) { st[n] = p[j]; sls[n].set(p[j]); }); pinta(); });
    pinta();
  };

  // ============================================================
  // SIGNOS: inecuaciones polinómicas y racionales (tabla de signos)
  // ============================================================
  B.w.signos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Inecuaciones: la tabla de signos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div data-rel class="chips"></div><div class="w-tabla"></div><div class="lectura"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["x^2-3x-4", "1", "ge", "x² − 3x − 4 ≥ 0"], ["(x-1)(x+2)(x-4)", "1", "lt", "(x−1)(x+2)(x−4) &lt; 0"], ["x-1", "x+2", "gt", "(x−1)/(x+2) &gt; 0"], ["x^2-4", "x^2-1", "le", "(x²−4)/(x²−1) ≤ 0"], ["x^2+1", "1", "gt", "x² + 1 &gt; 0"], ["(x-2)^2", "1", "gt", "(x−2)² &gt; 0"]];
    var st = { N: PRE[0][0], D: PRE[0][1], rel: PRE[0][2] }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".w-tabla"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iN = campo(ctl, "Numerador", st.N, 200), iD = campo(ctl, "Denominador", st.D, 160);
    var REL = { gt: ">", ge: "≥", lt: "<", le: "≤" };
    function pinta() {
      var N, D;
      try { N = leer(st.N); D = leer(st.D); if (!D.length) throw new Error("el denominador no puede ser 0"); if (!N.length) throw new Error("el numerador es 0: la inecuación es trivial"); } catch (e) { tabla.innerHTML = ""; lectura.innerHTML = U.lec("Revisa lo que has escrito", e.message, "red"); g.limpiar(); return; }
      var rN = raicesReales(N), rD = raicesReales(D);
      // puntos críticos ordenados y etiquetados
      var pts = [];
      rN.forEach(function (r) { pts.push({ x: r, tipo: "cero" }); });
      rD.forEach(function (r) { var ya = pts.filter(function (p) { return Math.abs(p.x - r) < 1e-9; })[0]; if (ya) ya.tipo = "polo"; else pts.push({ x: r, tipo: "polo" }); });
      pts.sort(function (a, b) { return a.x - b.x; });
      var f = function (x) { return pevalN(N, x) / pevalN(D, x); };
      var tests = [], ints = [];
      if (!pts.length) ints.push({ a: -Infinity, b: Infinity, t: 0 });
      else {
        ints.push({ a: -Infinity, b: pts[0].x, t: pts[0].x - 1 });
        for (var i = 0; i < pts.length - 1; i++) ints.push({ a: pts[i].x, b: pts[i + 1].x, t: (pts[i].x + pts[i + 1].x) / 2 });
        ints.push({ a: pts[pts.length - 1].x, b: Infinity, t: pts[pts.length - 1].x + 1 });
      }
      ints.forEach(function (it) { it.s = f(it.t) > 0 ? 1 : -1; });
      var rel = st.rel, quiere = (rel === "gt" || rel === "ge") ? 1 : -1, cierra = rel === "ge" || rel === "le";
      // intervalos solución (fusionando vecinos)
      var sol = [];
      ints.forEach(function (it) { if (it.s === quiere) sol.push({ a: it.a, b: it.b, ca: false, cb: false }); });
      // puntos aislados / cierres en ceros
      pts.forEach(function (p) {
        if (p.tipo !== "cero" || !cierra) return;
        var tocados = sol.filter(function (s) { return Math.abs(s.a - p.x) < 1e-9 || Math.abs(s.b - p.x) < 1e-9; });
        tocados.forEach(function (s) { if (Math.abs(s.a - p.x) < 1e-9) s.ca = true; if (Math.abs(s.b - p.x) < 1e-9) s.cb = true; });
        if (!tocados.length) sol.push({ a: p.x, b: p.x, ca: true, cb: true });
      });
      sol.sort(function (a, b) { return a.a - b.a; });
      // fusionar intervalos contiguos que comparten un extremo cerrado
      var fus = [];
      sol.forEach(function (s) {
        var u = fus[fus.length - 1];
        if (u && Math.abs(u.b - s.a) < 1e-9 && (u.cb || s.ca)) { u.b = s.b; u.cb = s.cb; }
        else fus.push({ a: s.a, b: s.b, ca: s.ca, cb: s.cb });
      });
      function e(v) { return !isFinite(v) ? (v < 0 ? "−∞" : "+∞") : num(v); }
      var solT = fus.length ? fus.map(function (s) { return s.a === s.b ? "{" + e(s.a) + "}" : (s.ca && isFinite(s.a) ? "[" : "(") + e(s.a) + ", " + e(s.b) + (s.cb && isFinite(s.b) ? "]" : ")"); }).join(" ∪ ") : "∅ (ninguna solución)";
      // tabla de signos
      var cols = [], fila = "<tr><th>x</th>";
      var cab = "", s1 = "<tr><th>signo</th>";
      var h = "<table class='tsig'><thead><tr><th></th>";
      ints.forEach(function (it, i) { h += "<th>" + (isFinite(it.a) ? e(it.a) : "−∞") + " , " + (isFinite(it.b) ? e(it.b) : "+∞") + "</th>"; if (i < pts.length) h += "<th class='tsig-p " + pts[i].tipo + "'>" + e(pts[i].x) + "</th>"; });
      h += "</tr></thead><tbody><tr><th>f(x) = N/D</th>";
      ints.forEach(function (it, i) { h += "<td class='" + (it.s > 0 ? "mas" : "menos") + "'>" + (it.s > 0 ? "+" : "−") + "</td>"; if (i < pts.length) h += "<td class='tsig-p " + pts[i].tipo + "'>" + (pts[i].tipo === "cero" ? "0" : "∄") + "</td>"; });
      h += "</tr></tbody></table>";
      tabla.innerHTML = h;
      lectura.innerHTML = U.lec("Ceros del numerador", rN.length ? rN.map(num).join(", ") : "ninguno") + U.lec("Ceros del denominador (huecos)", rD.length ? rD.map(num).join(", ") : "ninguno") + U.lec("Inecuación", "N/D " + REL[rel] + " 0") + U.lec("Solución", solT, fus.length ? "ok" : "red");
      pie.innerHTML = "Los ceros del <b>numerador</b> se incluyen si la desigualdad es ≤ o ≥. Los ceros del <b>denominador</b> nunca se incluyen: ahí la fracción no existe (∄). En la tabla sólo hace falta probar <b>un valor</b> de cada intervalo para saber su signo.";
      // gráfica
      var x0 = pts.length ? pts[0].x - 2 : -4, x1 = pts.length ? pts[pts.length - 1].x + 2 : 4;
      var ry = rangoY(function (x) { var v = f(x); return Math.abs(v) > 30 ? NaN : v; }, x0, x1);
      g.rango(x0, x1, Math.max(ry[0], -12), Math.min(ry[1], 12));
      g.limpiar();
      fus.forEach(function (s) { if (s.a === s.b) g.punto(s.a, 0, { r: 6, clase: "c-ok" }); });
      fus.forEach(function (s) { if (s.a !== s.b) { var a = isFinite(s.a) ? s.a : x0, b = isFinite(s.b) ? s.b : x1; g.segmento(a, 0, b, 0, { clase: "c-ok" }).setAttribute("stroke-width", 7); } });
      g.curva(f, { clase: "c-pen", n: 500 });
      pts.forEach(function (p) { g.punto(p.x, 0, { r: 5, clase: p.tipo === "cero" ? "c-red" : "c-pen" }); });
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 7, ymin: -10, ymax: 10, w: 640, h: 280, etx: "x", ety: "f(x)", etiqueta: "f(x) = N/D y, en verde, el conjunto solución sobre el eje X" });
    U.fichas(cuerpo.querySelector("[data-rel]"), [{ k: "gt", t: "&gt; 0" }, { k: "ge", t: "≥ 0" }, { k: "lt", t: "&lt; 0" }, { k: "le", t: "≤ 0" }], st.rel, function (k) { st.rel = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[3] }; }), "", function (k) { var p = PRE[+k]; st.N = p[0]; st.D = p[1]; st.rel = p[2]; iN.value = st.N; iD.value = st.D; var bs = cuerpo.querySelector("[data-rel]"); Array.prototype.forEach.call(bs.children, function (c) { var on = c.getAttribute("data-k") === st.rel; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); }); pinta(); });
    iN.addEventListener("input", function () { st.N = iN.value; pinta(); });
    iD.addEventListener("input", function () { st.D = iD.value; pinta(); });
    pinta();
  };
  A.solInecuacion = null;

  // ============================================================
  // FRACALG: simplificar fracciones algebraicas
  // ============================================================
  B.w.fracalg = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Simplifica una fracción algebraica");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><p class="w-pie"></p>';
    var PRE = [["x^2-9", "x^2+x-6", "(x²−9)/(x²+x−6)"], ["x^3-x", "x^2-2x+1", "(x³−x)/(x²−2x+1)"], ["2x^2-8", "x^3-8", "(2x²−8)/(x³−8)"], ["x^2+2x+1", "x^2-1", "(x²+2x+1)/(x²−1)"], ["x^2+1", "x^2-1", "(x²+1)/(x²−1) (no se simplifica)"]];
    var st = { N: PRE[0][0], D: PRE[0][1] };
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos"), pie = cuerpo.querySelector(".w-pie");
    var iN = campo(ctl, "Numerador", st.N, 200), iD = campo(ctl, "Denominador", st.D, 200);
    function pinta() {
      var N, D;
      try { N = leer(st.N); D = leer(st.D); if (!D.length) throw new Error("el denominador no puede ser 0"); if (!N.length) throw new Error("el numerador es 0"); } catch (e) { lectura.innerHTML = U.lec("Revisa lo que has escrito", e.message, "red"); pasos.innerHTML = ""; return; }
      var fN = factorizar(N), fD = factorizar(D), comunes = [], restoN = [], restoD = fD.factores.map(function (x) { return { p: x.p, m: x.m, raiz: x.raiz, irreducible: x.irreducible }; });
      fN.factores.forEach(function (x) {
        var y = restoD.filter(function (z) { return pigual(z.p, x.p); })[0];
        if (!y) { restoN.push({ p: x.p, m: x.m, raiz: x.raiz, irreducible: x.irreducible }); return; }
        var k = Math.min(x.m, y.m); comunes.push({ p: x.p, m: k, raiz: x.raiz });
        if (x.m > k) restoN.push({ p: x.p, m: x.m - k, raiz: x.raiz, irreducible: x.irreducible });
        y.m -= k;
      });
      restoD = restoD.filter(function (z) { return z.m > 0; });
      var c = qdiv(fN.c, fD.c);
      var tN = factorTxt(fN), tD = factorTxt(fD);
      var rn = factorTxt({ c: Q(c.n), factores: restoN }), rd = factorTxt({ c: Q(c.d), factores: restoD });
      var res = rd === "1" ? rn : rn + " / " + rd, resH = rd === "1" ? rn : B.h.fr(rn, rd);
      var excl = rD_text(D);
      lectura.innerHTML = U.lec("Numerador factorizado", tN, "pen") + U.lec("Denominador factorizado", tD, "pen") + U.lec("Factores comunes", comunes.length ? comunes.map(function (x) { return "(" + ptxt(x.p) + ")" + (x.m > 1 ? U.sup(x.m) : ""); }).join(" · ") : "ninguno", comunes.length ? "ok" : "red") + U.lec("Fracción simplificada", resH, "ok") + U.lec("Valores prohibidos (denominador = 0)", excl, "red");
      pasos.innerHTML = "<ol class='w-ol'><li>Factorizamos el numerador: <b>" + tN + "</b>.</li><li>Factorizamos el denominador: <b>" + tD + "</b>.</li><li>" + (comunes.length ? "Tachamos los factores comunes: <b>" + comunes.map(function (x) { return "(" + ptxt(x.p) + ")" + (x.m > 1 ? U.sup(x.m) : ""); }).join(", ") + "</b>." : "No hay factores comunes: la fracción ya es irreducible.") + "</li><li>Resultado: <b>" + res + "</b>, válido para x distinto de " + excl + ".</li></ol>";
      pie.innerHTML = "Sólo se pueden simplificar <b>factores</b> (cosas que multiplican), nunca <b>sumandos</b>. (x² − 9)/(x² + x − 6) se simplifica porque después de factorizar aparece el mismo factor arriba y abajo; en cambio (x + 3)/x no se simplifica a «3».";
    }
    function rD_text(D) { var r = raicesReales(D); return r.length ? r.map(num).join(", ") : "ninguno (el denominador no se anula nunca)"; }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.N = PRE[+k][0]; st.D = PRE[+k][1]; iN.value = st.N; iD.value = st.D; pinta(); });
    iN.addEventListener("input", function () { st.N = iN.value; pinta(); });
    iD.addEventListener("input", function () { st.D = iD.value; pinta(); });
    pinta();
  };

  // ============================================================
  // IGUALAR: solución gráfica de ecuaciones f(x) = g(x)
  // ============================================================
  function interseca(f, g, a, b, n) {
    var r = [], prev = null, xp = a;
    for (var i = 0; i <= n; i++) {
      var x = a + (b - a) * i / n, d;
      try { d = f(x) - g(x); } catch (e) { d = NaN; }
      if (isFinite(d)) {
        if (Math.abs(d) < 1e-11) { if (!r.length || Math.abs(r[r.length - 1] - x) > 1e-6) r.push(x); }
        else if (prev !== null && prev * d < 0 && Math.abs(d) < 1e6 && Math.abs(prev) < 1e6) {
          var lo = xp, hi = x, flo = prev;
          for (var k = 0; k < 70; k++) { var m = (lo + hi) / 2, fm = f(m) - g(m); if (!isFinite(fm)) break; if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; } }
          var xr = (lo + hi) / 2, dd = f(xr) - g(xr);
          if (isFinite(dd) && Math.abs(dd) < 1e-5 && (!r.length || Math.abs(r[r.length - 1] - xr) > 1e-6)) r.push(xr);
        }
        prev = d; xp = x;
      } else prev = null;
    }
    return r;
  }
  A.interseca = interseca;

  B.w.igualar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Resolver una ecuación con la gráfica (y detectar las soluciones falsas)");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["sqrt(x+6)", "x", "√(x+6) = x"], ["x+2/(x-1)", "4", "x + 2/(x−1) = 4"], ["2^x", "8", "2ˣ = 8"], ["ln(x)", "1", "ln x = 1"], ["sqrt(2x+3)+x", "6", "√(2x+3) + x = 6"], ["3/(x-1)", "2/(x+1)", "3/(x−1) = 2/(x+1)"], ["2^(x+1)", "3^x", "2ˣ⁺¹ = 3ˣ"]];
    var st = { L: PRE[0][0], R: PRE[0][1], sq: false }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var iL = campo(ctl, "Izquierda", st.L, 190), iR = campo(ctl, "Derecha", st.R, 160);
    var bSq = U.boton(ctl, "Elevar al cuadrado los dos lados", function () { st.sq = !st.sq; bSq.classList.toggle("on", st.sq); bSq.setAttribute("aria-pressed", st.sq); pinta(); });
    bSq.setAttribute("aria-pressed", "false");
    function pinta() {
      var L = B.Mate.compilar(st.L), R = B.Mate.compilar(st.R);
      if (!L.ok || !R.ok) { lectura.innerHTML = U.lec("Revisa lo que has escrito", L.ok ? R.error : L.error, "red"); g.limpiar(); return; }
      var sols = interseca(L.f, R.f, -10, 10, 4000), sols2 = [], falsas = [];
      if (st.sq) {
        sols2 = interseca(function (x) { var v = L.f(x); return v * v; }, function (x) { var v = R.f(x); return v * v; }, -10, 10, 4000);
        falsas = sols2.filter(function (x) { return !sols.some(function (y) { return Math.abs(x - y) < 1e-4; }); });
      }
      var xs = sols.concat(sols2).concat([0]), lo = Math.min.apply(null, xs.concat([-3])) - 2, hi = Math.max.apply(null, xs.concat([3])) + 2;
      var yl = [];
      for (var i = 0; i <= 80; i++) { var x = lo + (hi - lo) * i / 80, a = L.f(x), b = R.f(x); [a, b].forEach(function (v) { if (isFinite(v) && Math.abs(v) < 12) { yl.push(v); } }); }
      var mn = yl.length ? Math.min.apply(null, yl.concat([0])) : -5, mx = yl.length ? Math.max.apply(null, yl.concat([0])) : 5, pad = (mx - mn || 2) * 0.15;
      g.rango(lo, hi, mn - pad, mx + pad);
      g.limpiar();
      if (st.sq) {
        g.curva(function (x) { var v = L.f(x); return v * v; }, { clase: "c-ok", n: 500 });
        g.curva(function (x) { var v = R.f(x); return v * v; }, { clase: "c-ok", n: 500, dash: "2 5" });
      }
      g.curva(L.f, { clase: "c-pen", n: 500 }); g.curva(R.f, { clase: "c-red", n: 500, dash: "6 4" });
      falsas.forEach(function (x) { g.vertical(x, { clase: "c-red", dash: "4 4" }); g.texto(x, 0, "falsa x = " + num(x), { dy: -10, ancla: "middle", clase: "red" }); });
      sols.forEach(function (s) { var y = L.f(s); g.punto(s, y, { r: 6, clase: "c-ok" }); g.vertical(s, { clase: "c-ok", dash: "3 4" }); g.texto(s, y, "x = " + num(s), { dx: 8, dy: -10, clase: "ok" }); });
      lectura.innerHTML = U.lec("Ecuación", st.L + " = " + st.R) + U.lec("Cortes de las dos gráficas", sols.length ? sols.map(num).join(" · ") : "ninguno en [−10, 10]", sols.length ? "ok" : "red") + U.lec("¿Cuántas soluciones?", sols.length) +
        (st.sq ? U.lec("Cortes al elevar al cuadrado", sols2.length ? sols2.map(num).join(" · ") : "ninguno", "pen") + U.lec("Soluciones falsas", falsas.length ? falsas.map(num).join(" · ") : "ninguna", falsas.length ? "red" : "ok") : "");
      pie.innerHTML = (st.sq ? "<b>Al elevar al cuadrado</b> (curvas verdes) aparecen cortes nuevos: esos son los que el álgebra te da, pero las gráficas originales (azul y roja) no se cortan ahí. Son las <b>soluciones falsas</b> y hay que descartarlas. " : "") + "Cada corte entre la curva <b style='color:var(--pen)'>azul</b> (lado izquierdo) y la <b style='color:var(--red)'>roja</b> (lado derecho) es una solución <b>verdadera</b>. Cuando resuelves por álgebra una ecuación con raíces, denominadores o logaritmos puedes obtener valores que <i>no</i> aparecen aquí: son <b>soluciones extrañas</b> y hay que descartarlas comprobando en la ecuación original.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 8, ymin: -4, ymax: 10, w: 640, h: 300, etx: "x", ety: "y", etiqueta: "Las dos partes de la ecuación como funciones" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.L = PRE[+k][0]; st.R = PRE[+k][1]; iL.value = st.L; iR.value = st.R; pinta(); });
    iL.addEventListener("input", function () { st.L = iL.value; pinta(); });
    iR.addEventListener("input", function () { st.R = iR.value; pinta(); });
    pinta();
  };

  // ============================================================
  // LOGARITMOS: propiedades como longitudes
  // ============================================================
  B.w.logaritmos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Logaritmos: producto → suma");
    cuerpo.innerHTML = '<div data-base></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { base: "2", A: 4, B: 8, k: 3 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Número <i>A</i>", min: 0.5, max: 20, step: 0.5, val: st.A, on: function (v) { st.A = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Número <i>B</i>", min: 0.5, max: 20, step: 0.5, val: st.B, on: function (v) { st.B = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Exponente <i>k</i>", min: 1, max: 5, step: 1, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: String });
    function lg(x) { var b = st.base === "e" ? Math.E : parseFloat(st.base); return Math.log(x) / Math.log(b); }
    function barra(x0, x1, y, clase, txt) {
      var a = Math.min(x0, x1), b = Math.max(x0, x1);
      g.rect(a, y - 0.32, b, y + 0.32, { clase: clase, borde: clase === "z-pen" ? "var(--pen)" : clase === "z-red" ? "var(--red)" : "var(--ok)" });
      g.texto((a + b) / 2, y, txt, { ancla: "middle", dy: 4, clase: clase === "z-pen" ? "pen" : clase === "z-red" ? "red" : "ok" });
    }
    function pinta() {
      var A = st.A, B2 = st.B, k = st.k, la = lg(A), lb = lg(B2), lab = lg(A * B2), lc = lg(A / B2), lp = lg(Math.pow(A, k));
      var nb = st.base === "e" ? "ln" : st.base === "10" ? "log" : "log" + U.sub(st.base);
      var xs = [0, la, lb, la + lb, lab, la + lb], mn = Math.min.apply(null, xs), mx = Math.max.apply(null, xs), pad = (mx - mn || 1) * 0.12;
      g.rango(mn - pad, mx + pad, 0, 4);
      g.limpiar();
      barra(0, la, 3, "z-pen", nb + " A = " + fmt(la, 3));
      barra(la, la + lb, 2, "z-red", nb + " B = " + fmt(lb, 3));
      barra(0, lab, 1, "z-ok", nb + "(A·B) = " + fmt(lab, 3));
      g.segmento(la, 3.4, la, 1.0 - 0.5, { clase: "c-ok", dash: "3 4" });
      var base = st.base === "e" ? "e" : st.base;
      lectura.innerHTML = U.lec(nb + " A", fmt(la, 4) + " (porque " + base + "<sup>" + fmt(la, 3) + "</sup> = " + fmt(A, 1) + ")") + U.lec(nb + " B", fmt(lb, 4)) +
        U.lec(nb + "A + " + nb + "B", fmt(la + lb, 4), "pen") + U.lec(nb + "(A·B)", fmt(lab, 4), "ok") +
        U.lec(nb + "A − " + nb + "B  =  " + nb + "(A/B)", fmt(la - lb, 4) + "  =  " + fmt(lc, 4), "pen") + U.lec("k·" + nb + "A  =  " + nb + "(A<sup>k</sup>)", fmt(k * la, 4) + "  =  " + fmt(lp, 4), "pen") +
        U.lec("Cambio de base: ln A / ln " + (st.base === "e" ? "e" : st.base), fmt(Math.log(A) / Math.log(st.base === "e" ? Math.E : parseFloat(st.base)), 4), "ok");
      pie.innerHTML = "La barra azul mide log A, la roja log B; puestas una a continuación de otra miden lo mismo que la barra verde, log(A·B). <b>Multiplicar números equivale a sumar longitudes</b>: por eso las reglas de cálculo y los logaritmos transformaron el producto en una suma. Con A &lt; 1 el logaritmo es negativo y la barra va hacia la izquierda.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -3, xmax: 10, ymin: 0, ymax: 4, w: 640, h: 220, sinY: true, etx: "", ety: "", etiqueta: "Longitudes de log A, log B y log (A·B)" });
    U.fichas(cuerpo.querySelector("[data-base]"), [{ k: "2", t: "base 2" }, { k: "10", t: "base 10 (log)" }, { k: "e", t: "base e (ln)" }, { k: "3", t: "base 3" }], st.base, function (k) { st.base = k; pinta(); });
    pinta();
  };
})(window);
