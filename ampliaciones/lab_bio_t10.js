/* ============================================================
   Bachi para Firu · Biología II, tema 10 (Genética mendeliana)
   bio_cruce: cuadro de Punnett (monohíbrido, dihíbrido y genes ligados con recombinación), con proporciones exactas.
   bio_abo: cruces de grupos sanguíneos ABO (alelos múltiples y codominancia).
   bio_xlig: herencia ligada al cromosoma X (daltonismo y hemofilia), por sexo.
   bio_pedigri: árboles genealógicos con la deducción del tipo de herencia y de los genotipos.
   Estilos inyectados desde aquí. Las cifras las recalcula herramientas/verificar_bio2_t10.py.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("bio10-estilos")) return;
    var s = document.createElement("style"); s.id = "bio10-estilos";
    s.textContent =
      ".bio10-dato{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}" +
      ".bio10-dato div{padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink);line-height:1.35}" +
      ".bio10-dato b{display:block;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio10-veredicto{margin:6px 0;padding:9px 11px;border-radius:10px;border:1.5px solid var(--pen);background:var(--pen-soft);font-size:15px;color:var(--ink);line-height:1.45}" +
      ".bio10-veredicto.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".bio10-etq{margin:8px 0 2px;font-size:12px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".bio10-gam{margin:8px 0 2px;font-size:13px;color:var(--ink-faint)}" +
      ".bio10-pun{width:100%;table-layout:fixed;border-collapse:collapse;margin:8px 0;font-size:14px;color:var(--ink)}" +
      ".bio10-pun th,.bio10-pun td{border:1.5px solid var(--line);padding:6px 3px;text-align:center;overflow-wrap:anywhere}" +
      ".bio10-pun th{background:var(--sheet-2);font-weight:700}" +
      ".bio10-pun td.c0{background:var(--pen-soft)}.bio10-pun td.c1{background:var(--ok-soft)}.bio10-pun td.c2{background:var(--red-soft)}.bio10-pun td.c3{background:var(--sheet-2)}" +
      ".bio10-tab{width:100%;table-layout:fixed;overflow-wrap:anywhere;border-collapse:collapse;margin:8px 0;font-size:14px;color:var(--ink)}" +
      ".bio10-tab th,.bio10-tab td{border:1.5px solid var(--line);padding:5px 8px;text-align:center}" +
      ".bio10-tab th{background:var(--sheet-2);font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:var(--ink-faint)}" +
      ".bio10-tab td:first-child{text-align:left}" +
      ".bio10-bar{height:14px;border:1.5px solid var(--line);border-radius:7px;background:var(--sheet);overflow:hidden;margin-top:3px}" +
      ".bio10-bar i{display:block;height:100%;background:var(--pen)}" +
      ".bio10-bar i.rec{background:var(--red)}" +
      ".bio10-svg{width:100%;height:auto;max-height:300px;display:block;margin:6px auto}" +
      "@media(max-width:520px){.bio10-tab,.bio10-pun{font-size:12px}.bio10-tab th,.bio10-tab td{padding:4px 3px}.bio10-tab th{font-size:10px;letter-spacing:0}.bio10-dato{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  })();

  // ---------------------------------------------------------------- utilidades de fracciones
  function mcd(a, b) { return b ? mcd(b, a % b) : Math.abs(a); }
  function frac(n, d) {
    if (n === 0) return "0";
    var g = mcd(n, d); n /= g; d /= g;
    return d === 1 ? String(n) : n + "/" + d;
  }
  function razon(cuentas) {
    var g = cuentas.reduce(function (a, c) { return mcd(a, c); }, 0);
    return cuentas.map(function (c) { return c / g; }).join(" : ");
  }

  // ---------------------------------------------------------------- gametos y cruces (genes mendelianos)
  // Un genotipo es una cadena de pares de letras: "AaBb". Devuelve los gametos con repetición (2^n).
  function gametos(g) {
    var res = [""], i, p;
    for (i = 0; i < g.length; i += 2) {
      p = [g.charAt(i), g.charAt(i + 1)];
      res = res.reduce(function (acc, r) { acc.push(r + p[0]); acc.push(r + p[1]); return acc; }, []);
    }
    return res;
  }
  function unicos(lista) {
    var u = [], c = {};
    lista.forEach(function (x) { if (c[x] === undefined) { c[x] = 0; u.push(x); } c[x]++; });
    return u.map(function (x) { return { g: x, c: c[x] }; });
  }
  function unir(g1, g2) {
    var s = "", i, par;
    for (i = 0; i < g1.length; i++) { par = [g1.charAt(i), g2.charAt(i)].sort(); s += par[0] + par[1]; }
    return s;
  }
  var ESP = {
    comp: {
      mono: ["lisa", "rugosa"], di: ["lisa amarilla", "lisa verde", "rugosa amarilla", "rugosa verde"]
    },
    inter: ["roja", "rosa", "blanca"]
  };
  function fenoComp(gen) {   // gen = "AaBb" o "Aa"
    var a = /[A-Z]/.test(gen.charAt(0) + gen.charAt(1)) ? 0 : 1;
    if (gen.length === 2) return a;
    var b = /[A-Z]/.test(gen.charAt(2) + gen.charAt(3)) ? 0 : 1;
    return a * 2 + b;
  }
  function fenoInter(gen) { return gen === "AA" ? 0 : gen === "Aa" ? 1 : 2; }
  function cruce(p1, p2, dom) {
    var u1 = unicos(gametos(p1)), u2 = unicos(gametos(p2)), t1 = 0, t2 = 0, D, geno = {}, feno = {}, ordenG = [], f;
    u1.forEach(function (x) { t1 += x.c; }); u2.forEach(function (x) { t2 += x.c; });
    D = t1 * t2;
    var celdas = u1.map(function (a) {
      return u2.map(function (b) {
        var gen = unir(a.g, b.g), n = a.c * b.c;
        if (geno[gen] === undefined) { geno[gen] = 0; ordenG.push(gen); }
        geno[gen] += n;
        f = dom === "inter" ? fenoInter(gen) : fenoComp(gen);
        feno[f] = (feno[f] || 0) + n;
        return { gen: gen, f: f };
      });
    });
    return { u1: u1, u2: u2, D: D, celdas: celdas, geno: geno, ordenG: ordenG, feno: feno };
  }
  function nombresFeno(len, dom) { return dom === "inter" ? ESP.inter : (len === 2 ? ESP.comp.mono : ESP.comp.di); }

  // ================================================================ CRUCE (PUNNETT)
  var DI = [
    { k: "0", t: "AaBb × AaBb", a: "AaBb", b: "AaBb" },
    { k: "1", t: "AaBb × aabb (cruce prueba)", a: "AaBb", b: "aabb" },
    { k: "2", t: "AABB × aabb (P)", a: "AABB", b: "aabb" },
    { k: "3", t: "AaBb × Aabb", a: "AaBb", b: "Aabb" },
    { k: "4", t: "AaBB × aaBb", a: "AaBB", b: "aaBb" }
  ];
  function ligado(r, fase) {   // r en %, descendientes de un cruce prueba por cada 1000
    var par = (100 - r) * 5, rec = r * 5;
    var clases = fase === "cis"
      ? [{ g: "AB", t: "parental", n: par }, { g: "ab", t: "parental", n: par }, { g: "Ab", t: "recombinante", n: rec }, { g: "aB", t: "recombinante", n: rec }]
      : [{ g: "Ab", t: "parental", n: par }, { g: "aB", t: "parental", n: par }, { g: "AB", t: "recombinante", n: rec }, { g: "ab", t: "recombinante", n: rec }];
    return clases;
  }
  var FENO_LIG = { AB: "lisa amarilla (A_B_)", Ab: "lisa verde (A_bb)", aB: "rugosa amarilla (aaB_)", ab: "rugosa verde (aabb)" };

  B.w.bio_cruce = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cuadro de Punnett: elige el cruce");
    cuerpo.innerHTML = '<p class="w-intro">Elige un tipo de cruce y los progenitores. Verás los gametos, el cuadro de Punnett y las proporciones exactas.</p>' +
      '<div data-modo></div><div data-mono><div class="bio10-etq">Progenitor 1</div><div data-p1></div><div class="bio10-etq">Progenitor 2</div><div data-p2></div><div class="bio10-etq">Tipo de herencia</div><div data-dom></div></div>' +
      '<div data-di style="display:none"></div><div data-lig style="display:none"><div data-fase></div><div data-ctl></div></div>' +
      '<div data-sal></div><p class="w-pie">Dominancia completa: A domina sobre a. Intermedia: el heterocigoto es rosa. Dihíbrido de guisante: A lisa, a rugosa; B amarilla, b verde. En los genes ligados, r es la frecuencia de recombinación (1 % = 1 cM).</p>';
    var o = { modo: "mono", p1: "Aa", p2: "Aa", dom: "comp", di: "0", fase: "cis", r: 10 };
    var sal = cuerpo.querySelector("[data-sal]"), gm = cuerpo.querySelector("[data-mono]"), gd = cuerpo.querySelector("[data-di]"), gl = cuerpo.querySelector("[data-lig]");
    var GEN = [{ k: "AA", t: "AA" }, { k: "Aa", t: "Aa" }, { k: "aa", t: "aa" }];
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "mono", t: "Monohíbrido" }, { k: "di", t: "Dihíbrido" }, { k: "lig", t: "Genes ligados" }], "mono", function (k) { o.modo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-p1]"), GEN, "Aa", function (k) { o.p1 = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-p2]"), GEN, "Aa", function (k) { o.p2 = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-dom]"), [{ k: "comp", t: "Dominancia completa" }, { k: "inter", t: "Dominancia intermedia" }], "comp", function (k) { o.dom = k; pinta(); });
    U.fichas(gd, DI.map(function (d) { return { k: d.k, t: d.t }; }), "0", function (k) { o.di = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-fase]"), [{ k: "cis", t: "Cis: AB / ab" }, { k: "trans", t: "Trans: Ab / aB" }], "cis", function (k) { o.fase = k; pinta(); });
    U.slider(U.ctl(cuerpo.querySelector("[data-ctl]")), { et: "r", etq: "Frecuencia de recombinación", min: 0, max: 50, step: 1, val: 10, fmt: function (v) { return B.fmt(v, 0) + " %"; }, on: function (v) { o.r = Math.round(v); pinta(); } });

    function pinta() {
      gm.style.display = o.modo === "mono" ? "" : "none";
      gd.style.display = o.modo === "di" ? "" : "none";
      gl.style.display = o.modo === "lig" ? "" : "none";
      if (o.modo === "lig") return pintaLig();
      var dd = DI[+o.di], p1 = o.modo === "mono" ? o.p1 : dd.a, p2 = o.modo === "mono" ? o.p2 : dd.b, dom = o.modo === "mono" ? o.dom : "comp";
      var c = cruce(p1, p2, dom), nom = nombresFeno(p1.length, dom), h, cnt, ncol = c.u2.length;
      h = '<div class="bio10-gam">Gametos: ' + p1 + " → " + c.u1.map(function (x) { return x.g + (x.c > 1 ? " (×" + x.c + ")" : ""); }).join(", ") +
        " · " + p2 + " → " + c.u2.map(function (x) { return x.g + (x.c > 1 ? " (×" + x.c + ")" : ""); }).join(", ") + "</div>";
      h += '<table class="bio10-pun" data-pun><tr><th>♀ / ♂</th>' + c.u2.map(function (x) { return "<th>" + x.g + "</th>"; }).join("") + "</tr>";
      c.celdas.forEach(function (fila, i) {
        h += "<tr><th>" + c.u1[i].g + "</th>" + fila.map(function (x) { return '<td class="c' + (dom === "inter" ? x.f : x.f) + '">' + x.gen + "</td>"; }).join("") + "</tr>";
      });
      h += "</table>";
      h += '<table class="bio10-tab" data-prop><tr><th>Fenotipo</th><th>Proporción</th><th>Prob.</th></tr>';
      var ks = Object.keys(c.feno).map(Number).sort(function (a, b) { return a - b; });
      cnt = ks.map(function (k) { return c.feno[k]; });
      ks.forEach(function (k) { h += "<tr><td>" + nom[k] + "</td><td>" + c.feno[k] + " / " + c.D + "</td><td>" + frac(c.feno[k], c.D) + "</td></tr>"; });
      h += "</table>";
      var gk = c.ordenG.slice().sort();
      var dat = "<div><b>Proporción fenotípica</b>" + razon(cnt) + "</div><div><b>Proporción genotípica</b>" + razon(gk.map(function (g) { return c.geno[g]; })) + "</div>" +
        "<div><b>Genotipos distintos</b>" + gk.length + " (" + gk.map(function (g) { return g + " " + frac(c.geno[g], c.D); }).join(" · ") + ")</div><div><b>Casillas</b>" + c.u1.length * ncol + " (" + c.D + " combinaciones)</div>";
      sal.innerHTML = h + '<div class="bio10-dato" data-d>' + dat + "</div>";
    }

    function pintaLig() {
      var cl = ligado(o.r, o.fase), h;
      h = '<div class="bio10-gam">Gametos del doble heterocigoto ' + (o.fase === "cis" ? "AB/ab" : "Ab/aB") + "</div>";
      h += '<table class="bio10-tab" data-prop><tr><th>Gameto</th><th>Tipo</th><th>Frecuencia</th><th>Por cada 1000 hijos</th></tr>';
      cl.forEach(function (x) { h += "<tr><td>" + x.g + " · " + FENO_LIG[x.g] + "</td><td>" + x.t + "</td><td>" + B.fmt(x.n / 10, 1) + " %</td><td>" + x.n + "</td></tr>"; });
      h += "</table>";
      h += cl.map(function (x) { return '<div class="bio10-bar" title="' + x.g + '"><i class="' + (x.t === "recombinante" ? "rec" : "") + '" style="width:' + (x.n / 5) + '%"></i></div>'; }).join("");
      var par = (100 - o.r) / 2, rec = o.r / 2;
      var dat = "<div><b>Distancia genética</b>" + o.r + " cM (unidades de mapa)</div><div><b>Recombinantes</b>" + o.r + " % del total</div>" +
        "<div><b>Cada clase parental</b>" + B.fmt(par, 1) + " %</div><div><b>Cada clase recombinante</b>" + B.fmt(rec, 1) + " %</div>";
      var msg = o.r === 0 ? "Sin recombinación: los dos genes se heredan siempre juntos, solo salen las clases parentales (ligamiento completo)."
        : o.r === 50 ? "Con r = 50 % salen las cuatro clases iguales (1 : 1 : 1 : 1): es lo mismo que si los genes fueran independientes (tercera ley)."
        : "Las clases parentales son las más abundantes: los genes cercanos tienden a heredarse juntos. Cuanto más lejos, más recombinación.";
      sal.innerHTML = h + '<div class="bio10-dato" data-d>' + dat + '</div><div class="bio10-veredicto">' + msg + "</div>";
    }
    pinta();
  };

  // ================================================================ GRUPOS SANGUÍNEOS ABO
  var ABO = [
    { k: "AA", t: "A · I<sup>A</sup>I<sup>A</sup>" }, { k: "AO", t: "A · I<sup>A</sup>i" },
    { k: "BB", t: "B · I<sup>B</sup>I<sup>B</sup>" }, { k: "BO", t: "B · I<sup>B</sup>i" },
    { k: "AB", t: "AB · I<sup>A</sup>I<sup>B</sup>" }, { k: "OO", t: "O · ii" }
  ];
  function aboDisp(g) {
    return g.split("").map(function (a) { return a === "O" ? "i" : "I<sup>" + a + "</sup>"; }).join("");
  }
  function aboGrupo(g) { var a = g.indexOf("A") >= 0, b = g.indexOf("B") >= 0; return a && b ? "AB" : a ? "A" : b ? "B" : "O"; }
  function aboCruce(g1, g2) {
    var g = {}, grupo = { A: 0, B: 0, AB: 0, O: 0 }, orden = [], i, j, c, k;
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      c = [g1.charAt(i), g2.charAt(j)].sort().join("");
      if (g[c] === undefined) { g[c] = 0; orden.push(c); }
      g[c]++; grupo[aboGrupo(c)]++;
    }
    return { geno: g, orden: orden, grupo: grupo };
  }
  B.w.bio_abo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Grupos sanguíneos: ¿qué hijos pueden tener?");
    cuerpo.innerHTML = '<p class="w-intro">Elige el genotipo de cada progenitor. Verás qué grupos sanguíneos pueden tener sus hijos y con qué probabilidad.</p>' +
      '<div class="bio10-etq">Progenitor 1</div><div data-p1></div><div class="bio10-etq">Progenitor 2</div><div data-p2></div><div data-sal></div>' +
      '<p class="w-pie">Alelos I<sup>A</sup> e I<sup>B</sup> codominantes entre sí; ambos dominan sobre i. Cada hijo recibe un alelo de cada progenitor (cada uno, con probabilidad ½).</p>';
    var o = { p1: "AO", p2: "BO" }, sal = cuerpo.querySelector("[data-sal]");
    U.fichas(cuerpo.querySelector("[data-p1]"), ABO, "AO", function (k) { o.p1 = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-p2]"), ABO, "BO", function (k) { o.p2 = k; pinta(); });
    function pinta() {
      var c = aboCruce(o.p1, o.p2), h, a1 = [o.p1.charAt(0), o.p1.charAt(1)], a2 = [o.p2.charAt(0), o.p2.charAt(1)];
      h = '<table class="bio10-pun" data-pun><tr><th></th>' + a2.map(function (a) { return "<th>" + aboDisp(a) + "</th>"; }).join("") + "</tr>";
      a1.forEach(function (x) {
        h += "<tr><th>" + aboDisp(x) + "</th>" + a2.map(function (y) {
          var gg = [x, y].sort().join(""), gr = aboGrupo(gg);
          return '<td class="c' + ({ A: 0, B: 1, AB: 2, O: 3 })[gr] + '">' + aboDisp(gg) + "<br><small>grupo " + gr + "</small></td>";
        }).join("") + "</tr>";
      });
      h += "</table>";
      h += '<table class="bio10-tab" data-prop><tr><th>Grupo del hijo</th><th>Prob.</th></tr>';
      var pos = [];
      ["A", "B", "AB", "O"].forEach(function (g) { if (c.grupo[g]) { pos.push(g); h += "<tr><td>Grupo " + g + "</td><td>" + frac(c.grupo[g], 4) + "</td></tr>"; } });
      h += "</table>";
      var no = ["A", "B", "AB", "O"].filter(function (g) { return !c.grupo[g]; });
      sal.innerHTML = h + '<div class="bio10-veredicto ok">' + (no.length ? "Imposible: " + no.join(", ") + ". " : "Pueden salir los cuatro grupos. ") +
        "Genotipos posibles de los hijos: " + c.orden.slice().sort().map(function (g) { return aboDisp(g) + " (" + frac(c.geno[g], 4) + ")"; }).join(" · ") + ".</div>";
    }
    pinta();
  };

  // ================================================================ HERENCIA LIGADA AL X
  var CARACTER = {
    dal: { n: "D", m: "d", t: "Daltonismo", nombre: "daltónico", f: "daltónica", normal: "visión normal" },
    hem: { n: "H", m: "h", t: "Hemofilia", nombre: "hemofílico", f: "hemofílica", normal: "coagulación normal" }
  };
  B.w.bio_xlig = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Herencia ligada al X: daltonismo y hemofilia");
    cuerpo.innerHTML = '<p class="w-intro">Elige el carácter y el genotipo de la madre y del padre. Fíjate en que los hijos y las hijas no se reparten igual.</p>' +
      '<div data-car></div><div class="bio10-etq">Madre</div><div data-m></div><div class="bio10-etq">Padre</div><div data-p></div><div data-sal></div>' +
      '<p class="w-pie">El gen está en el cromosoma X; el cromosoma Y no lleva el gen. El alelo mutante (recesivo) se escribe con minúscula. Cada hijo tiene probabilidad ½ de ser varón y ½ de ser mujer.</p>';
    var o = { car: "dal", m: "NM", p: "N" }, sal = cuerpo.querySelector("[data-sal]");
    function sup(a) { var c = CARACTER[o.car]; return "X<sup>" + (a === "N" ? c.n : c.m) + "</sup>"; }
    function opcionesM() {
      var c = CARACTER[o.car];
      return [{ k: "NN", t: "Sana: X<sup>" + c.n + "</sup>X<sup>" + c.n + "</sup>" }, { k: "NM", t: "Portadora: X<sup>" + c.n + "</sup>X<sup>" + c.m + "</sup>" }, { k: "MM", t: "Afectada: X<sup>" + c.m + "</sup>X<sup>" + c.m + "</sup>" }];
    }
    function opcionesP() {
      var c = CARACTER[o.car];
      return [{ k: "N", t: "Sano: X<sup>" + c.n + "</sup>Y" }, { k: "M", t: "Afectado: X<sup>" + c.m + "</sup>Y" }];
    }
    function menus() {
      U.fichas(cuerpo.querySelector("[data-m]"), opcionesM(), o.m, function (k) { o.m = k; pinta(); });
      U.fichas(cuerpo.querySelector("[data-p]"), opcionesP(), o.p, function (k) { o.p = k; pinta(); });
    }
    U.fichas(cuerpo.querySelector("[data-car]"), [{ k: "dal", t: "Daltonismo" }, { k: "hem", t: "Hemofilia" }], "dal", function (k) { o.car = k; menus(); pinta(); });
    menus();
    function pinta() {
      var c = CARACTER[o.car], gm = [o.m.charAt(0), o.m.charAt(1)], gp = [o.p, "Y"], h, cl = {};
      function clase(a, b) {   // a: alelo de la madre; b: alelo o Y del padre
        if (b === "Y") return (a === "N" ? "hijo sano" : "hijo " + c.nombre);
        var g = [a, b].sort().join("");
        return g === "NN" ? "hija sana (no portadora)" : g === "MN" ? "hija portadora" : "hija " + c.f;
      }
      h = '<table class="bio10-pun" data-pun><tr><th>Madre / padre</th>' + gp.map(function (b) { return "<th>" + (b === "Y" ? "Y" : sup(b)) + "</th>"; }).join("") + "</tr>";
      gm.forEach(function (a) {
        h += "<tr><th>" + sup(a) + "</th>" + gp.map(function (b) {
          var k = clase(a, b); cl[k] = (cl[k] || 0) + 1;
          var gen = b === "Y" ? sup(a) + "Y" : sup(a) + sup(b);
          return '<td class="c' + (/hijo /.test(k) ? 0 : 1) + '">' + gen + "<br><small>" + k + "</small></td>";
        }).join("") + "</tr>";
      });
      h += "</table>";
      var orden = ["hija sana (no portadora)", "hija portadora", "hija " + c.f, "hijo sano", "hijo " + c.nombre];
      h += '<table class="bio10-tab" data-prop><tr><th>Descendiente</th><th>Del total</th><th>Dentro de su sexo</th></tr>';
      orden.forEach(function (k) { if (cl[k]) h += "<tr><td>" + k + "</td><td>" + frac(cl[k], 4) + "</td><td>" + frac(cl[k], 2) + "</td></tr>"; });
      h += "</table>";
      var afH = cl["hijo " + c.nombre] || 0, afM = cl["hija " + c.f] || 0;
      var msg = afH + afM === 0 ? "Ningún descendiente estará afectado, pero " + (cl["hija portadora"] ? "la mitad de las hijas serán portadoras." : "tampoco habrá portadoras.")
        : "Probabilidad de estar afectado (" + c.nombre + "): " + frac(afH, 2) + " de los hijos varones y " + frac(afM, 2) + " de las hijas. " + (o.p === "M" && o.m === "NN" ? "Un padre afectado da su X a todas las hijas, que serán portadoras, y su Y a los hijos, que quedan sanos." : o.m === "NM" && o.p === "N" ? "Los varones heredan el X de la madre: por eso la mitad de ellos lo manifiesta." : "");
      sal.innerHTML = h + '<div class="bio10-veredicto ok">' + msg + "</div>";
    }
    pinta();
  };

  // ================================================================ ÁRBOLES GENEALÓGICOS
  var PEDS = {
    ar: {
      t: "Autosómico recesivo",
      regla: "Dos progenitores sanos (I-1 e I-2) tienen una hija afectada (II-1): el carácter es <b>recesivo</b> y ambos son portadores. Como el padre es sano, la hija afectada descarta que sea ligado al X (una hija afectada de un gen ligado al X recesivo necesitaría un padre afectado).",
      inds: [
        { id: "I-1", x: 120, g: 0, s: "M", a: 0, gen: "Aa", por: "Sano con una hija aa: ha dado una a, luego es Aa." },
        { id: "I-2", x: 200, g: 0, s: "F", a: 0, gen: "Aa", por: "Sana con una hija aa: también es Aa." },
        { id: "II-1", x: 60, g: 1, s: "F", a: 1, gen: "aa", por: "Afectada: recesivo, solo se manifiesta en aa." },
        { id: "II-2", x: 140, g: 1, s: "M", a: 0, gen: "AA o Aa", por: "Sano, hijo de Aa × Aa: ⅓ AA y ⅔ Aa." },
        { id: "II-3", x: 220, g: 1, s: "F", a: 0, gen: "Aa", por: "Sana, pero su hijo es aa: le dio una a." },
        { id: "II-4", x: 300, g: 1, s: "M", a: 1, gen: "aa", por: "Afectado: aa." },
        { id: "III-1", x: 220, g: 2, s: "M", a: 1, gen: "aa", por: "Afectado: aa." },
        { id: "III-2", x: 300, g: 2, s: "F", a: 0, gen: "Aa", por: "Sana, hija de Aa × aa: recibió a del padre, luego Aa." }
      ],
      fams: [{ p: ["I-1", "I-2"], h: ["II-1", "II-2", "II-3"] }, { p: ["II-3", "II-4"], h: ["III-1", "III-2"] }]
    },
    ad: {
      t: "Autosómico dominante",
      regla: "Todo afectado tiene algún progenitor afectado, no se salta generaciones, y una pareja con un afectado (I-1) y una persona sana (I-2) tiene hijos sanos: el carácter es <b>dominante</b> y el afectado es heterocigoto (Aa). Los sanos son aa.",
      inds: [
        { id: "I-1", x: 120, g: 0, s: "M", a: 1, gen: "Aa", por: "Afectado con un hijo sano (aa): tiene una a, luego es Aa." },
        { id: "I-2", x: 200, g: 0, s: "F", a: 0, gen: "aa", por: "Sana: en un dominante los sanos son aa." },
        { id: "II-1", x: 60, g: 1, s: "F", a: 1, gen: "Aa", por: "Afectada: recibió A del padre y a de la madre." },
        { id: "II-2", x: 140, g: 1, s: "M", a: 0, gen: "aa", por: "Sano: aa." },
        { id: "II-3", x: 220, g: 1, s: "M", a: 1, gen: "Aa", por: "Afectado, hijo de Aa × aa: Aa." },
        { id: "II-4", x: 300, g: 1, s: "F", a: 0, gen: "aa", por: "Sana: aa." },
        { id: "III-1", x: 220, g: 2, s: "M", a: 1, gen: "Aa", por: "Afectado: heredó A del padre afectado." },
        { id: "III-2", x: 300, g: 2, s: "F", a: 0, gen: "aa", por: "Sana: aa." }
      ],
      fams: [{ p: ["I-1", "I-2"], h: ["II-1", "II-2", "II-3"] }, { p: ["II-3", "II-4"], h: ["III-1", "III-2"] }]
    },
    x: {
      t: "Recesivo ligado al X (daltonismo)",
      regla: "Afecta a un varón (II-2) hijo de padre sano y madre sana: el alelo vino de la madre, que es <b>portadora</b>. El carácter es recesivo y ligado al X: los afectados son casi siempre varones, y no pasa de padre a hijo varón.",
      inds: [
        { id: "I-1", x: 120, g: 0, s: "M", a: 0, gen: "X<sup>D</sup>Y", por: "Varón sano: su único X lleva D." },
        { id: "I-2", x: 200, g: 0, s: "F", a: 0, gen: "X<sup>D</sup>X<sup>d</sup>", por: "Sana, pero su hijo II-2 es X<sup>d</sup>Y: es portadora." },
        { id: "II-1", x: 60, g: 1, s: "F", a: 0, gen: "X<sup>D</sup>X<sup>D</sup> o X<sup>D</sup>X<sup>d</sup>", por: "Recibe X<sup>D</sup> del padre; de la madre, X<sup>D</sup> o X<sup>d</sup> (½ y ½)." },
        { id: "II-2", x: 140, g: 1, s: "M", a: 1, gen: "X<sup>d</sup>Y", por: "Varón afectado: un solo X, y lleva d." },
        { id: "II-3", x: 220, g: 1, s: "F", a: 0, gen: "X<sup>D</sup>X<sup>d</sup>", por: "Sana, pero su hijo III-1 es X<sup>d</sup>Y: es portadora." },
        { id: "II-4", x: 300, g: 1, s: "M", a: 0, gen: "X<sup>D</sup>Y", por: "Varón sano." },
        { id: "III-1", x: 220, g: 2, s: "M", a: 1, gen: "X<sup>d</sup>Y", por: "Varón afectado: el X<sup>d</sup> es de su madre." },
        { id: "III-2", x: 300, g: 2, s: "F", a: 0, gen: "X<sup>D</sup>X<sup>D</sup> o X<sup>D</sup>X<sup>d</sup>", por: "Recibe X<sup>D</sup> del padre; de la madre X<sup>D</sup> o X<sup>d</sup>." }
      ],
      fams: [{ p: ["I-1", "I-2"], h: ["II-1", "II-2", "II-3"] }, { p: ["II-3", "II-4"], h: ["III-1", "III-2"] }]
    }
  };
  var GY = [40, 120, 200];
  function svgPed(P) {
    var by = {}, s = '<svg class="bio10-svg" viewBox="0 0 360 250" role="img" aria-label="Árbol genealógico: ' + P.t + '" style="font:11px sans-serif">';
    P.inds.forEach(function (i) { by[i.id] = i; });
    function ln(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:var(--ink);stroke-width:1.6"/>'; }
    P.fams.forEach(function (f) {
      var a = by[f.p[0]], b = by[f.p[1]], y = GY[a.g], xs = [a.x, b.x].sort(function (p, q) { return p - q; }), m = (a.x + b.x) / 2, yb = y + 48;
      s += ln(xs[0] + 14, y, xs[1] - 14, y);
      var hx = f.h.map(function (id) { return by[id].x; });
      s += ln(m, y, m, yb) + ln(Math.min.apply(null, hx), yb, Math.max.apply(null, hx), yb);
      hx.forEach(function (x) { s += ln(x, yb, x, y + 80 - 14); });
    });
    P.inds.forEach(function (i) {
      var y = GY[i.g], st = 'style="stroke:var(--ink);stroke-width:1.8;fill:' + (i.a ? "var(--pen)" : "var(--sheet)") + '"';
      s += i.s === "M" ? '<rect x="' + (i.x - 14) + '" y="' + (y - 14) + '" width="28" height="28" ' + st + "/>" : '<circle cx="' + i.x + '" cy="' + y + '" r="14" ' + st + "/>";
      s += '<text x="' + i.x + '" y="' + (y + 28) + '" text-anchor="middle" style="fill:var(--ink-faint)">' + i.id + "</text>";
    });
    return s + "</svg>";
  }
  B.w.bio_pedigri = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Árboles genealógicos: deduce el tipo de herencia");
    cuerpo.innerHTML = '<p class="w-intro">Elige un árbol. Primero decide tú qué tipo de herencia es; luego pulsa «Ver la deducción» para comprobarlo y ver el genotipo de cada persona.</p>' +
      '<div data-fich></div><div data-svg></div><div data-modo></div><div data-sal></div>' +
      '<p class="w-pie">Cuadrado = varón; círculo = mujer; relleno = afectado; la línea horizontal une a la pareja y la vertical baja a sus hijos.</p>';
    var o = { k: "ar", ver: "no" }, sv = cuerpo.querySelector("[data-svg]"), sal = cuerpo.querySelector("[data-sal]");
    U.fichas(cuerpo.querySelector("[data-fich]"), Object.keys(PEDS).map(function (k) { return { k: k, t: "Árbol " + (k === "ar" ? "1" : k === "ad" ? "2" : "3") }; }), "ar", function (k) { o.k = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "no", t: "Solo el árbol" }, { k: "si", t: "Ver la deducción" }], "no", function (k) { o.ver = k; pinta(); });
    function pinta() {
      var P = PEDS[o.k];
      sv.innerHTML = svgPed(P);
      if (o.ver === "no") { sal.innerHTML = ""; return; }
      var h = '<div class="bio10-veredicto ok" data-regla><b>' + P.t + ".</b> " + P.regla + "</div>";
      h += '<table class="bio10-tab" data-prop><tr><th>Persona</th><th>Genotipo</th><th>Por qué</th></tr>';
      P.inds.forEach(function (i) { h += "<tr><td>" + i.id + (i.a ? " ●" : "") + "</td><td>" + i.gen + "</td><td>" + i.por + "</td></tr>"; });
      sal.innerHTML = h + "</table>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
