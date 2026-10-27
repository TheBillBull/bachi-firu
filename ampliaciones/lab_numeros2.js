/* ============================================================
   Bachi para Firu · laboratorio de números II (Matemáticas I, tema 1)
   generatriz · racionalizar · espiral
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var N2 = B.lab.num2 = {};

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  N2.gcd = gcd;
  function fil(rot, v, cl) { return U.lec(rot, v, cl); }

  // ------------------------------------------------------------
  // Decimal con periodo → fracción. Acepta 3,2(7) · 0,(45) · 12,5 · 7
  // ------------------------------------------------------------
  N2.generatriz = function (txt) {
    var s = String(txt).replace(/\s+/g, "").replace(".", ","), m = /^(-?)(\d+)(?:,(\d*)(?:\((\d+)\))?)?$/.exec(s);
    if (!m) return null;
    var neg = m[1] === "-", ent = m[2], ante = m[3] || "", per = m[4] || "";
    if (ent.length + ante.length + per.length > 15) return null;
    var todo = parseInt(ent + ante + per, 10), sinPer = parseInt(ent + ante || "0", 10), num, den, pasos = [];
    if (!per) { num = sinPer; den = Math.pow(10, ante.length); }
    else { num = todo - sinPer; den = (Math.pow(10, per.length) - 1) * Math.pow(10, ante.length); }
    var g = gcd(num, den), n = num / g, d = den / g;
    if (!per) {
      pasos.push("Decimal exacto con " + ante.length + " cifra" + (ante.length === 1 ? "" : "s") + " decimal" + (ante.length === 1 ? "" : "es") + ": se escribe sobre 10" + (ante.length ? U.sup(ante.length) : "⁰") + ".");
      pasos.push(sinPer + " / " + den + (g > 1 ? " = " + n + " / " + d : ""));
    } else {
      pasos.push("Periodo: " + per + " (" + per.length + " cifra" + (per.length === 1 ? "" : "s") + ")" + (ante ? " · anteperiodo: " + ante + " (" + ante.length + " cifra" + (ante.length === 1 ? "" : "s") + ")" : " · periódico puro"));
      pasos.push("Numerador = (número formado por parte entera + anteperiodo + periodo) − (número formado por parte entera + anteperiodo) = " + todo + " − " + sinPer + " = " + num);
      pasos.push("Denominador = tantos 9 como cifras del periodo, seguidos de tantos 0 como cifras del anteperiodo = " + den);
      pasos.push(num + " / " + den + (g > 1 ? " = " + n + " / " + d + " (dividiendo entre " + g + ")" : " (ya irreducible)"));
    }
    return { n: (neg ? -1 : 1) * n, d: d, pasos: pasos, periodico: !!per };
  };

  // Fracción → desarrollo decimal (anteperiodo y periodo)
  N2.decimal = function (p, q) {
    var neg = (p < 0) !== (q < 0); p = Math.abs(p); q = Math.abs(q);
    var ent = Math.floor(p / q), r = p % q, vistos = {}, dig = [], pos = 0;
    while (r !== 0 && vistos[r] === undefined && dig.length < 80) { vistos[r] = pos++; r *= 10; dig.push(Math.floor(r / q)); r %= q; }
    var ante = "", per = "";
    if (r === 0) ante = dig.join(""); else { ante = dig.slice(0, vistos[r]).join(""); per = dig.slice(vistos[r]).join(""); }
    return { signo: neg ? "−" : "", ent: ent, ante: ante, per: per };
  };
  N2.txtDecimal = function (d) { return d.signo + d.ent + (d.ante || d.per ? "," + d.ante + (d.per ? "(" + d.per + ")" : "") : ""); };

  B.w.generatriz = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Decimales y fracciones: la fracción generatriz");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { modo: "dec", txt: "3,2(7)", p: 1, q: 7 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), pre = cuerpo.querySelector("[data-pre]");
    var el = document.createElement("label"); el.className = "bx-campo"; el.innerHTML = '<span class="bx-et">Decimal:</span><input type="text" autocomplete="off" spellcheck="false" style="width:170px" value="' + st.txt + '" aria-label="decimal">'; ctl.appendChild(el);
    var inp = el.querySelector("input");
    var sp = U.slider(ctl, { et: "Numerador <i>p</i>", min: 1, max: 40, step: 1, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var sq = U.slider(ctl, { et: "Denominador <i>q</i>", min: 2, max: 60, step: 1, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    var DEC = ["0,(3)", "0,(45)", "2,(18)", "0,2(7)", "3,2(7)", "1,0(36)", "0,(9)", "12,5", "0,125"];
    function modo() {
      var d = st.modo === "dec"; el.style.display = d ? "" : "none"; sp.el.style.display = sq.el.style.display = d ? "none" : "";
      U.fichas(pre, d ? DEC.map(function (t) { return { k: t, t: t }; }) : [{ k: "1/7", t: "1/7" }, { k: "1/3", t: "1/3" }, { k: "5/12", t: "5/12" }, { k: "1/8", t: "1/8" }, { k: "22/7", t: "22/7" }, { k: "1/13", t: "1/13" }, { k: "7/30", t: "7/30" }], "", function (k) {
        if (d) { st.txt = k; inp.value = k; } else { var a = k.split("/"); st.p = +a[0]; st.q = +a[1]; sp.set(st.p); sq.set(st.q); }
        pinta();
      });
    }
    function pinta() {
      if (st.modo === "dec") {
        var r = N2.generatriz(st.txt);
        if (!r) { lectura.innerHTML = fil("Revisa lo que has escrito", "usa el formato 3,2(7): lo que va entre paréntesis es el periodo", "red ancho"); pie.innerHTML = ""; return; }
        lectura.innerHTML = fil("Fracción generatriz", (r.n < 0 ? "−" : "") + Math.abs(r.n) + "/" + r.d + (r.d === 1 ? "  (es un entero)" : ""), "ok") + fil("Tipo", r.periodico ? "decimal periódico (racional)" : "decimal exacto (racional)", "") +
          fil("Pasos", "<ol class='lec-ol'>" + r.pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol>", "ancho") + fil("Comprobación", fmt(r.n / r.d, 8) + " ≈ " + st.txt.replace(/[()]/g, ""), "pen");
        pie.innerHTML = "Un decimal es <b>racional</b> si es exacto o periódico: siempre se puede escribir como fracción. Los decimales infinitos <b>sin periodo</b> (como 0,1010010001… o √2) son <b>irracionales</b>.";
      } else {
        var p = st.p, q = st.q, g = gcd(p, q), d = N2.decimal(p, q);
        var tipo = d.per ? "periódico " + (d.ante ? "mixto" : "puro") + " (periodo de " + d.per.length + " cifra" + (d.per.length === 1 ? "" : "s") + ")" : "exacto";
        var qq = q / g, f2 = qq, f5 = 0, a2 = 0, a5 = 0; while (f2 % 2 === 0) { f2 /= 2; a2++; } while (f2 % 5 === 0) { f2 /= 5; a5++; }
        lectura.innerHTML = fil("Fracción irreducible", (p / g) + "/" + qq, "pen") + fil("Desarrollo decimal", N2.txtDecimal(d), "ok") + fil("Tipo", tipo, "") +
          fil("¿Por qué?", f2 === 1 ? "El denominador irreducible (" + qq + ") sólo tiene los factores 2 y/o 5: da decimal <b>exacto</b>." : "El denominador irreducible (" + qq + ") tiene algún factor distinto de 2 y de 5 (" + f2 + "): da decimal <b>periódico</b>.", "ancho");
        pie.innerHTML = "Se divide p entre q: como los restos posibles son menos de q, <b>algún resto tiene que repetirse</b> y entonces los dígitos se repiten: el periodo nunca tiene más de q − 1 cifras. Una fracción irreducible da decimal exacto sólo si su denominador no tiene más factores primos que 2 y 5.";
      }
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "dec", t: "Decimal → fracción" }, { k: "fra", t: "Fracción → decimal" }], "dec", function (k) { st.modo = k; modo(); pinta(); });
    inp.addEventListener("input", function () { st.txt = inp.value; pinta(); });
    modo(); pinta();
  };

  // ------------------------------------------------------------
  // Racionalización
  // ------------------------------------------------------------
  function sq(c) { return "√" + c; }
  function cf(a) { return a === 1 ? "" : a === -1 ? "−" : String(a); }
  N2.racionalizar = function (forma, k, a, b, c, d) {
    var pasos = [], num, den, txt0, conj;
    function signo(v) { return v < 0 ? " − " : " + "; }
    if (forma === 1) {                                   // k / (a√c)
      txt0 = k + "/(" + cf(a) + sq(c) + ")";
      pasos.push("Se multiplica numerador y denominador por √" + c + ".");
      pasos.push("Denominador: " + cf(a) + sq(c) + "·" + sq(c) + " = " + (a * c));
      var g = gcd(k, a * c); k /= g; var dd = a * c / g;
      return { txt0: txt0, res: (k === 1 ? "" : k) + sq(c) + "/" + dd, num: k, den: dd, val: k * Math.sqrt(c) / dd, pasos: pasos.concat(["Resultado: " + (k === 1 ? "" : k) + sq(c) + "/" + dd + " (simplificado)"]) };
    }
    if (forma === 2) {                                   // k / (a + b√c)
      txt0 = k + "/(" + a + signo(b) + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(c) + ")";
      conj = a + (b < 0 ? " + " : " − ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(c);
      den = a * a - b * b * c;
      pasos.push("El conjugado del denominador es " + conj + ". Se multiplica arriba y abajo por él.");
      pasos.push("Denominador (suma por diferencia): " + a + "² − (" + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(c) + ")² = " + (a * a) + " − " + (b * b * c) + " = " + den);
      pasos.push("Numerador: " + k + "·(" + conj + ") = " + (k * a) + (-k * b < 0 ? " − " : " + ") + Math.abs(k * b) + sq(c));
      var n1 = k * a, n2 = -k * b, g2 = gcd(gcd(n1, n2), den); if (den < 0) g2 = -g2;
      n1 /= g2; n2 /= g2; var d2 = den / g2;
      var cuerpoN = n1 + (n2 < 0 ? " − " : " + ") + (Math.abs(n2) === 1 ? "" : Math.abs(n2)) + sq(c);
      return { txt0: txt0, res: d2 === 1 ? cuerpoN : "(" + cuerpoN + ")/" + d2, den: d2, val: k / (a + b * Math.sqrt(c)), pasos: pasos.concat(["Resultado: " + (d2 === 1 ? cuerpoN : "(" + cuerpoN + ")/" + d2)]) };
    }
    // forma 3: k / (a√c + b√d)
    txt0 = k + "/(" + cf(a) + sq(c) + signo(b) + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(d) + ")";
    conj = cf(a) + sq(c) + (b < 0 ? " + " : " − ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(d);
    den = a * a * c - b * b * d;
    pasos.push("El conjugado es " + conj + ". Se multiplica arriba y abajo por él.");
    pasos.push("Denominador: (" + cf(a) + sq(c) + ")² − (" + (Math.abs(b) === 1 ? "" : Math.abs(b)) + sq(d) + ")² = " + (a * a * c) + " − " + (b * b * d) + " = " + den);
    pasos.push("Numerador: " + k + "·(" + conj + ")");
    var m1 = k * a, m2 = -k * b, g3 = gcd(gcd(m1, m2), den); if (den < 0) g3 = -g3;
    m1 /= g3; m2 /= g3; var d3 = den / g3;
    var cN = (m1 === 1 ? "" : m1 === -1 ? "−" : m1) + sq(c) + (m2 < 0 ? " − " : " + ") + (Math.abs(m2) === 1 ? "" : Math.abs(m2)) + sq(d);
    return { txt0: txt0, res: d3 === 1 ? cN : "(" + cN + ")/" + d3, den: d3, val: k / (a * Math.sqrt(c) + b * Math.sqrt(d)), pasos: pasos.concat(["Resultado: " + (d3 === 1 ? cN : "(" + cN + ")/" + d3)]) };
  };
  var racionalizar0 = N2.racionalizar;
  N2.racionalizar = function () { var r = racionalizar0.apply(null, arguments); r.res = r.res.replace(/-/g, "−"); r.txt0 = r.txt0.replace(/-/g, "−"); r.pasos = r.pasos.map(function (t) { return t.replace(/-/g, "−"); }); return r; };
  var NOCUAD = [2, 3, 5, 6, 7, 10, 11];
  B.w.racionalizar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Racionalizar denominadores paso a paso");
    cuerpo.innerHTML = '<div data-forma class="chips"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { forma: 2, k: 4, a: 3, b: 1, c: 2, d: 3 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), S = {};
    function slid(cl, et, mn, mx, fm) { S[cl] = U.slider(ctl, { et: et, min: mn, max: mx, step: 1, val: st[cl], on: function (v) { st[cl] = v; pinta(); }, fmt: fm || function (v) { return fmt(v, 0); } }); }
    slid("k", "Numerador <i>k</i>", 1, 12); slid("a", "<i>a</i>", 1, 6); slid("b", "<i>b</i>", -5, 5); slid("c", "Radicando <i>c</i>", 0, 6, function (v) { return fmt(NOCUAD[v], 0); }); S.c.input.value = 0; slid("d", "Radicando <i>d</i>", 0, 6, function (v) { return fmt(NOCUAD[v], 0); }); S.d.input.value = 1;
    st.c = 0; st.d = 1; S.c.set(0); S.d.set(1);
    function pinta() {
      var c = NOCUAD[st.c], d = NOCUAD[st.d], b = st.b === 0 ? 1 : st.b, forma = st.forma;
      S.b.el.style.display = forma === 1 ? "none" : ""; S.d.el.style.display = forma === 3 ? "" : "none";
      if (forma === 3 && c === d) d = NOCUAD[(st.d + 1) % 7];
      var r = N2.racionalizar(forma, st.k, st.a, b, c, d);
      if (r.den === 0) { lectura.innerHTML = fil("Denominador 0", "elige otros valores: el denominador no puede ser 0", "red ancho"); return; }
      lectura.innerHTML = fil("Expresión", r.txt0, "pen") + fil("Pasos", "<ol class='lec-ol'>" + r.pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol>", "ancho") + fil("Comprobación numérica", fmt(eval0(forma, st.k, st.a, b, c, d), 6) + " = " + fmt(r.val, 6), "ok");
      pie.innerHTML = "<b>Racionalizar</b> es quitar las raíces del denominador sin cambiar el valor. Con una sola raíz se multiplica por esa raíz; con una suma o resta, por el <b>conjugado</b> (la misma expresión con el signo cambiado) para usar (A + B)(A − B) = A² − B².";
    }
    function eval0(f, k, a, b, c, d) { return f === 1 ? k / (a * Math.sqrt(c)) : f === 2 ? k / (a + b * Math.sqrt(c)) : k / (a * Math.sqrt(c) + b * Math.sqrt(d)); }
    U.fichas(cuerpo.querySelector("[data-forma]"), [{ k: "1", t: "k / (a√c)" }, { k: "2", t: "k / (a + b√c)" }, { k: "3", t: "k / (a√c + b√d)" }], "2", function (k) { st.forma = +k; pinta(); });
    pinta();
  };

  // ------------------------------------------------------------
  // Espiral de Pitágoras: √n en la recta
  // ------------------------------------------------------------
  B.w.espiral = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La espiral de Pitágoras: un cateto siempre mide 1");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var st = { n: 8 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Número de triángulos", min: 1, max: 17, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return fmt(v, 0); } });
    function pinta() {
      g.limpiar(); var P = [[0, 0], [1, 0]], k, i;
      for (k = 1; k <= st.n; k++) { var p = P[k], len = Math.sqrt(k); P.push([p[0] - p[1] / len, p[1] + p[0] / len]); }
      for (k = 1; k <= st.n; k++) {
        var a = P[k], b = P[k + 1];
        g.polilinea([[0, 0], a, b, [0, 0]], { clase: k === st.n ? "c-red" : "c-pen" }).setAttribute("stroke-width", k === st.n ? 3 : 1.6);
        g.texto(b[0], b[1], "√" + (k + 1), { dx: 6, dy: -4, clase: k === st.n ? "red" : "pen" });
      }
      var hip = Math.sqrt(st.n + 1);
      lectura.innerHTML = fil("Último triángulo", "catetos √" + st.n + " y 1 → hipotenusa √(" + st.n + " + 1) = √" + (st.n + 1), "red") + fil("Valor", "√" + (st.n + 1) + " ≈ " + fmt(hip, 5), "ok") + fil("¿Es racional?", Math.sqrt(st.n + 1) % 1 === 0 ? "sí: " + (st.n + 1) + " es cuadrado perfecto (hipotenusa " + Math.sqrt(st.n + 1) + ")" : "no: " + (st.n + 1) + " no es cuadrado perfecto, √" + (st.n + 1) + " es irracional", "");
      pie.innerHTML = "Cada triángulo es rectángulo, con un cateto igual a 1 y el otro igual a la hipotenusa del anterior: por Pitágoras, √(n) → √(n + 1). Así se <b>construye con regla y compás</b> √2, √3, √5… y se pueden colocar sobre la recta numérica con un compás. En √4 y √9 y √16 la hipotenusa mide un número entero.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 520, h: 420, sinEjes: true, limpio: true, etiqueta: "Espiral de Pitágoras" });
    g.rangoIso(0, 0, 4.3);
    pinta();
  };
})(window);
