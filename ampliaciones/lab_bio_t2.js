/* ============================================================
   Bachi para Firu · Biología (2.º Bach.), tema 2: Glúcidos
   bio2_azucar: un monosacárido en cadena abierta (proyección de Fischer) y en anillo (Haworth), con anómeros α y β.
   bio2_disac: se eligen dos monosacáridos, se unen con enlace O-glucosídico (−H₂O) y sale el disacárido.
   bio2_poli: almidón (amilosa y amilopectina), glucógeno y celulosa dibujados como cadenas de glucosas.
   bio2_lab: tubo de ensayo con reactivo de Fehling o Lugol sobre distintas muestras.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("b2t2-estilos")) return;
    var s = document.createElement("style"); s.id = "b2t2-estilos";
    s.textContent =
      ".b2t2-svg{display:block;width:100%;max-width:420px;height:auto;margin:8px auto 4px;background:var(--sheet)}" +
      ".b2t2-svg text{font-family:var(--body,system-ui,sans-serif);font-size:13px;fill:var(--ink)}" +
      ".b2t2-svg .t-s{font-size:11px;fill:var(--ink-faint)}" +
      ".b2t2-svg .t-b{font-weight:700}" +
      ".b2t2-svg .t-p{fill:var(--pen);font-weight:700}" +
      ".b2t2-svg .t-r{fill:var(--red);font-weight:700}" +
      ".b2t2-svg .l{stroke:var(--ink);stroke-width:1.6;fill:none;stroke-linecap:round}" +
      ".b2t2-svg .l-g{stroke:var(--ink);stroke-width:3.4;fill:none;stroke-linecap:round;stroke-linejoin:round}" +
      ".b2t2-svg .l-f{stroke:var(--ink-faint);stroke-width:1.2;fill:none;stroke-dasharray:3 3}" +
      ".b2t2-svg .l-p{stroke:var(--pen);stroke-width:2.2;fill:none;stroke-linecap:round}" +
      ".b2t2-svg .l-r{stroke:var(--red);stroke-width:2.4;fill:none;stroke-linecap:round}" +
      ".b2t2-svg .ring{stroke:var(--ink);stroke-width:1.6;fill:var(--pen-soft)}" +
      ".b2t2-svg .ring2{stroke:var(--ink);stroke-width:1.6;fill:var(--hl-wash)}" +
      ".b2t2-svg .g1{fill:var(--pen-soft);stroke:var(--pen);stroke-width:1.4}" +
      ".b2t2-svg .g2{fill:var(--hl-wash);stroke:var(--ink-soft);stroke-width:1.4}" +
      ".b2t2-svg .g3{fill:var(--red-soft);stroke:var(--red);stroke-width:1.4}" +
      ".b2t2-lec{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px;margin:8px 0}" +
      ".b2t2-nota{padding:8px 12px;border-left:4px solid var(--pen);background:var(--pen-soft);border-radius:4px 10px 10px 4px;font-size:14.5px;line-height:1.45;color:var(--ink);margin:8px 0}" +
      ".b2t2-nota.ok{border-color:var(--ok);background:var(--ok-soft)}" +
      ".b2t2-nota.mal{border-color:var(--red);background:var(--red-soft)}" +
      ".b2t2-tab{width:100%;border-collapse:collapse;font-size:13.5px;margin:6px 0}" +
      ".b2t2-tab td{padding:5px 8px;border-top:1px solid var(--line);color:var(--ink);vertical-align:top}" +
      ".b2t2-tab td:first-child{font-weight:700;color:var(--ink-soft);white-space:nowrap}" +
      ".b2t2-acc{margin:8px 0;display:flex;gap:8px;flex-wrap:wrap}" +
      ".b2t2-tubos{display:flex;justify-content:center;gap:28px;align-items:flex-end;margin:6px 0}" +
      ".b2t2-tubos figure{margin:0;text-align:center;font-size:12.5px;color:var(--ink-soft)}" +
      ".b2t2-tubos svg{width:70px;height:150px;display:block;margin:0 auto 2px}" +
      "[data-w=bio2_azucar] .chip-btn,[data-w=bio2_disac] .chip-btn,[data-w=bio2_poli] .chip-btn,[data-w=bio2_lab] .chip-btn{white-space:normal;text-align:left;max-width:100%}" +
      "@media(max-width:520px){.b2t2-tubos{gap:14px}}";
    document.head.appendChild(s);
  })();

  function svg(h, vb, aria) {
    return '<svg class="b2t2-svg" viewBox="' + vb + '" role="img" aria-label="' + aria + '">' + h + "</svg>";
  }
  function T(x, y, t, c, anc) {
    return '<text x="' + x + '" y="' + y + '"' + (c ? ' class="' + c + '"' : "") + (anc ? ' text-anchor="' + anc + '"' : "") + ">" + t + "</text>";
  }
  function L(x1, y1, x2, y2, c) {
    return '<line class="' + (c || "l") + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
  }

  /* ======================= 1. bio2_azucar ======================= */
  // fis: cadena de Fischer de arriba abajo. R/L = carbono asimétrico con OH a la derecha/izquierda; texto = grupo terminal o carbono sin OH asimétrico.
  var AZ = [
    { k: "glu", t: "D-glucosa", tipo: "aldohexosa", n: 6, f: "C₆H₁₂O₆", fis: ["CHO", "R", "L", "R", "R", "CH₂OH"], cierre: 5, nota: "Es la fuente de energía de casi todas las células." },
    { k: "gal", t: "D-galactosa", tipo: "aldohexosa", n: 6, f: "C₆H₁₂O₆", fis: ["CHO", "R", "L", "L", "R", "CH₂OH"], cierre: 5, nota: "Epímero de la glucosa en el C4 (cambia solo ese OH). Forma la lactosa con la glucosa." },
    { k: "fru", t: "D-fructosa", tipo: "cetohexosa", n: 6, f: "C₆H₁₂O₆", fis: ["CH₂OH", "C=O", "L", "R", "R", "CH₂OH"], cierre: 5, ani: 2, nota: "Isómero de función de la glucosa: mismo C₆H₁₂O₆, pero con cetona en C2. En anillo forma una furanosa (cinco lados)." },
    { k: "rib", t: "D-ribosa", tipo: "aldopentosa", n: 5, f: "C₅H₁₀O₅", fis: ["CHO", "R", "R", "R", "CH₂OH"], cierre: 4, nota: "Pentosa del ARN y del ATP. En anillo forma una furanosa." },
    { k: "des", t: "2-desoxirribosa", tipo: "aldopentosa", n: 5, f: "C₅H₁₀O₄", fis: ["CHO", "CH₂", "R", "R", "CH₂OH"], cierre: 4, nota: "Como la ribosa pero sin el O del C2 (de ahí «desoxi»): pentosa del ADN." }
  ];
  function quirales(a) { return a.fis.filter(function (x) { return x === "R" || x === "L"; }).length; }

  function fischerSVG(a) {
    var h = "", x0 = 170, y0 = 26, dy = 34, i, y;
    for (i = 0; i < a.n; i++) {
      y = y0 + i * dy;
      if (i < a.n - 1) h += L(x0, y + 11, x0, y + dy - 11);
      var v = a.fis[i];
      h += T(40, y + 4, "C" + (i + 1), "t-s", "end");
      if (v === "R") { h += L(x0, y, x0 + 36, y) + T(x0 + 40, y + 4, "OH", "t-b") + T(x0 - 24, y + 4, "H", "t-s", "middle") + L(x0, y, x0 - 16, y); }
      else if (v === "L") { h += L(x0, y, x0 - 36, y) + T(x0 - 40, y + 4, "HO", "t-b", "end") + T(x0 + 24, y + 4, "H", "t-s", "middle") + L(x0, y, x0 + 16, y); }
      else { h += T(x0, y + 4, v === "CHO" ? "CHO" : v === "C=O" ? "C=O" : v, i === 0 || i === a.n - 1 || v === "C=O" ? "t-r" : "", "middle"); }
    }
    h += T(300, 210, "carbonilo en rojo", "t-s", "end");
    return svg(h, "0 0 340 230", "Proyección de Fischer de la " + a.t);
  }

  // orden de los átomos del anillo: O, y los carbonos desde el anomérico hasta el de cierre
  var POS6 = [[215, 65], [255, 105], [215, 150], [125, 150], [85, 105], [125, 65]];   // O, C1, C2, C3, C4, C5
  var POS5 = [[170, 58], [236, 104], [210, 168], [130, 168], [104, 104]];             // O, C1, C2, C3, C4
  function haworthSVG(a, forma) {
    var fur = a.n === 5 || a.ani === 2, pos = fur ? POS5 : POS6, h = "", i;
    var primero = a.ani || 1, nC = fur ? 4 : 5;          // carbonos del anillo
    var carb = [];
    for (i = 0; i < nC; i++) carb.push(primero + i);
    // anillo
    var pts = pos.map(function (p) { return p[0] + "," + p[1]; }).join(" ");
    h += '<polygon class="ring" points="' + pts + '"/>';
    // borde delantero más grueso
    var fr = fur ? [pos[2], pos[3]] : [pos[2], pos[3]];
    h += '<line class="l-g" x1="' + fr[0][0] + '" y1="' + fr[0][1] + '" x2="' + fr[1][0] + '" y2="' + fr[1][1] + '"/>';
    h += T(pos[0][0], pos[0][1] + 4, "O", "t-b", "middle");
    var ultimo = nC;   // índice (en carb) del carbono de cierre
    for (i = 0; i < nC; i++) {
      var n = carb[i], p = pos[i + 1], lado = a.fis[n - 1], arriba = null, etq = "OH", otro = "H";
      var esAni = i === 0, esCierre = i === ultimo - 1;
      var x = p[0], y = p[1];
      h += T(x + (x > 170 ? 12 : -12), y + (y > 110 ? 14 : -8), "C" + n, "t-s", x > 170 ? "start" : "end");
      var up = {}, dn = {}, dobleH = lado === "CH₂";
      if (esAni) {
        var b = forma === "b";
        if (a.ani === 2) { // fructosa: el OH y el CH2OH (C1)
          up = b ? { t: "OH", c: "t-p" } : { t: "CH₂OH" }; dn = b ? { t: "CH₂OH" } : { t: "OH", c: "t-p" };
        } else { up = b ? { t: "OH", c: "t-p" } : null; dn = b ? null : { t: "OH", c: "t-p" }; }
      } else if (esCierre) {
        up = { t: a.fis[a.n - 1] }; dn = null;
      } else if (lado === "L") { up = { t: "OH" }; dn = null; }
      else if (lado === "R") { up = null; dn = { t: "OH" }; }
      else { up = { t: "H" }; dn = { t: "H" }; }   // C2 de la desoxirribosa: dos H
      var an = "middle";
      if (up) h += L(x, y, x, y - 30, up.c ? "l-p" : "l") + T(x, y - 36, up.t, up.c || (up.t === "H" ? "t-s" : ""), an);
      if (dn) h += L(x, y, x, y + 30, dn.c ? "l-p" : "l") + T(x, y + 46, dn.t, dn.c || (dn.t === "H" ? "t-s" : ""), an);
    }
    h += T(14, 244, forma === "a" ? "anómero α: OH anomérico hacia abajo (los H no se dibujan)" : "anómero β: OH anomérico hacia arriba (los H no se dibujan)", "t-s");
    return svg(h, "0 0 340 254", "Anillo de Haworth de la " + a.t + ", forma " + (forma === "a" ? "alfa" : "beta"));
  }

  B.w.bio2_azucar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un monosacárido: cadena abierta y anillo");
    cuerpo.innerHTML = '<p class="w-intro">Elige un azúcar y una forma. En la cadena abierta (Fischer) cuenta los carbonos asimétricos; al cerrar el anillo (Haworth) el carbono del carbonilo se convierte en <b>anomérico</b>: el OH de ese carbono puede quedar hacia abajo (α) o hacia arriba (β).</p>' +
      '<div data-az></div><div data-fo></div><div class="b2t2-dib"></div><div class="b2t2-lec"></div><div class="b2t2-nota"></div>';
    var az = "glu", fo = "l";
    U.fichas(cuerpo.querySelector("[data-az]"), AZ.map(function (a) { return { k: a.k, t: a.t }; }), az, function (k) { az = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-fo]"), [{ k: "l", t: "Cadena abierta" }, { k: "a", t: "Anillo α" }, { k: "b", t: "Anillo β" }], fo, function (k) { fo = k; pinta(); });
    function pinta() {
      var a = AZ.filter(function (x) { return x.k === az; })[0], q = quirales(a), cic = fo !== "l", nq = q + (cic ? 1 : 0);
      var fur = a.n === 5 || a.ani === 2;
      cuerpo.querySelector(".b2t2-dib").innerHTML = cic ? haworthSVG(a, fo) : fischerSVG(a);
      cuerpo.querySelector(".b2t2-lec").innerHTML =
        U.lec("Tipo", a.tipo + " (" + a.n + " C)") + U.lec("Fórmula", a.f) +
        U.lec("C asimétricos", nq, "n-q") + U.lec("Estereoisómeros posibles", Math.pow(2, nq), "n-e") +
        U.lec("Forma", cic ? (fur ? "furanosa (anillo de 5)" : "piranosa (anillo de 6)") : "lineal");
      var msg = a.nota;
      if (cic) msg += " Al ciclar, el C" + (a.ani || 1) + " pasa a ser asimétrico (" + q + " + 1 = " + nq + ") y aparecen dos anómeros, α y β.";
      cuerpo.querySelector(".b2t2-nota").innerHTML = msg;
    }
    pinta();
  };

  /* ======================= 2. bio2_disac ======================= */
  var PRIM = [
    { k: "aglu", t: "α-D-glucosa", sig: "α-D-glucopiranosa", r: "glucosa", a: "α", pir: true },
    { k: "bglu", t: "β-D-glucosa", sig: "β-D-glucopiranosa", r: "glucosa", a: "β", pir: true },
    { k: "bgal", t: "β-D-galactosa", sig: "β-D-galactopiranosa", r: "galactosa", a: "β", pir: true }
  ];
  var SEG = [{ k: "glu", t: "D-glucosa" }, { k: "fru", t: "D-fructosa" }];
  var DIS = {
    "aglu|glu": { n: "Maltosa", e: "α(1→4)", d: "α-D-glucopiranosil-(1→4)-D-glucopiranosa", red: true, c1: 1, c2: 4, donde: "Se forma al digerir el almidón (malta de la cebada germinada)." },
    "bglu|glu": { n: "Celobiosa", e: "β(1→4)", d: "β-D-glucopiranosil-(1→4)-D-glucopiranosa", red: true, c1: 1, c2: 4, donde: "Unidad que se repite en la celulosa; no es un azúcar de la dieta." },
    "bgal|glu": { n: "Lactosa", e: "β(1→4)", d: "β-D-galactopiranosil-(1→4)-D-glucopiranosa", red: true, c1: 1, c2: 4, donde: "Azúcar de la leche. La lactasa rompe su enlace β." },
    "aglu|fru": { n: "Sacarosa", e: "α(1→β2)", d: "α-D-glucopiranosil-(1→2)-β-D-fructofuranósido", red: false, c1: 1, c2: 2, donde: "El azúcar de mesa (caña y remolacha). Une los dos carbonos anoméricos." }
  };
  function anillo(cx, cy, fur, cl, rotulo, sub) {
    var r = fur ? 34 : 38, n = fur ? 5 : 6, p = [], i, a;
    for (i = 0; i < n; i++) { a = -Math.PI / 2 + i * 2 * Math.PI / n; p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1)); }
    return '<polygon class="' + cl + '" points="' + p.join(" ") + '"/>' + T(cx, cy + 4, rotulo, "t-b", "middle") + T(cx, cy + 62, sub, "t-s", "middle");
  }
  B.w.bio2_disac = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Construye un disacárido");
    cuerpo.innerHTML = '<p class="w-intro">Elige los dos monosacáridos y pulsa <b>Unir</b>: se forma un enlace O-glucosídico y sale una molécula de agua. Prueba también combinaciones que <em>no</em> dan un disacárido habitual.</p>' +
      '<div class="b2t2-rot">1.º monosacárido (aporta su C1 anomérico)</div><div data-p1></div><div class="b2t2-rot">2.º monosacárido</div><div data-p2></div>' +
      '<div class="b2t2-acc"></div><div class="b2t2-dib"></div><div class="b2t2-lec"></div><div class="b2t2-nota"></div>';
    var p1 = "aglu", p2 = "glu", unido = false;
    var cabs = cuerpo.querySelectorAll(".b2t2-rot");
    Array.prototype.forEach.call(cabs, function (c) { c.style.cssText = "font-size:12.5px;color:var(--ink-faint);margin:8px 0 2px"; });
    U.fichas(cuerpo.querySelector("[data-p1]"), PRIM.map(function (a) { return { k: a.k, t: a.t }; }), p1, function (k) { p1 = k; unido = false; pinta(); });
    U.fichas(cuerpo.querySelector("[data-p2]"), SEG, p2, function (k) { p2 = k; unido = false; pinta(); });
    var acc = cuerpo.querySelector(".b2t2-acc");
    var bu = U.boton(acc, "Unir (−H₂O)", function () { unido = true; pinta(); });
    bu.setAttribute("data-unir", "");
    var bh = U.boton(acc, "Hidrolizar (+H₂O)", function () { unido = false; pinta(); });
    bh.setAttribute("data-hidro", "");
    function pinta() {
      var P = PRIM.filter(function (x) { return x.k === p1; })[0], S = SEG.filter(function (x) { return x.k === p2; })[0];
      var d = DIS[p1 + "|" + p2], fru2 = p2 === "fru";
      bu.disabled = unido; bh.disabled = !unido;
      var dib = "";
      if (!unido) {
        dib = anillo(90, 70, false, "ring", "C1", P.t) + T(170, 74, "+", "t-b", "middle") + anillo(250, 70, fru2, "ring2", fru2 ? "C2" : "C4", S.t);
        dib += T(170, 118, "↓ condensación", "t-s", "middle");
      } else {
        dib = anillo(95, 70, false, "ring", "C1", P.t) + anillo(245, 70, fru2, "ring2", fru2 ? "C2" : "C4", S.t) +
          L(130, 70, 148, 70, "l-r") + '<circle cx="170" cy="70" r="11" fill="var(--red-soft)" stroke="var(--red)" stroke-width="1.6"/>' + T(170, 74, "O", "t-r", "middle") + L(192, 70, 210, 70, "l-r") +
          T(170, 24, "enlace O-glucosídico", "t-r", "middle") + T(300, 130, "+ H₂O", "t-p", "middle");
      }
      cuerpo.querySelector(".b2t2-dib").innerHTML = svg(dib, "0 0 340 150", unido ? "Disacárido formado" : "Dos monosacáridos separados");
      var lec = cuerpo.querySelector(".b2t2-lec"), nota = cuerpo.querySelector(".b2t2-nota");
      nota.className = "b2t2-nota";
      if (!unido) {
        lec.innerHTML = U.lec("Antes de unir", "2 monosacáridos") + U.lec("Masa", "180 + 180 g/mol") + U.lec("Fórmula", "2 C₆H₁₂O₆");
        nota.textContent = "Pulsa «Unir» para quitar una molécula de agua entre el OH anomérico del primero y un OH del segundo.";
      } else if (d) {
        lec.innerHTML = U.lec("Disacárido", d.n, "d-n") + U.lec("Enlace", d.e, "d-e") + U.lec("Fórmula", "C₁₂H₂₂O₁₁") + U.lec("Masa molar", "342 g/mol") + U.lec("¿Reductor?", d.red ? "sí (Fehling +)" : "no (Fehling −)", "d-r");
        nota.innerHTML = "<b>" + d.n + "</b> = " + d.d + ". " + d.donde + (d.red ? " Conserva libre el OH anomérico del segundo azúcar: puede abrirse y reducir el Fehling." : " Los dos OH anoméricos están ocupados en el enlace: no hay carbonilo libre, por eso no reduce el Fehling.");
        nota.className = "b2t2-nota ok";
      } else {
        lec.innerHTML = U.lec("Fórmula", "C₁₂H₂₂O₁₁") + U.lec("Masa molar", "342 g/mol") + U.lec("Enlace", "O-glucosídico");
        nota.textContent = "Químicamente es posible, pero no es uno de los disacáridos que hay que conocer (maltosa, celobiosa, lactosa y sacarosa). Prueba con otra pareja.";
        nota.className = "b2t2-nota mal";
      }
    }
    pinta();
  };

  /* ======================= 3. bio2_poli ======================= */
  function circ(x, y, cl) { return '<circle class="' + cl + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="7"/>'; }
  function cadena(x0, y0, n, dx, cl, dyf) {
    var h = "", i;
    for (i = 0; i < n; i++) h += circ(x0 + i * dx, y0 + (dyf ? dyf(i) : 0), cl);
    return h;
  }
  function dibAmilosa() {
    var h = '<path class="l-f" d="', i, pts = [];
    for (i = 0; i < 24; i++) pts.push([30 + i * 12.5, 80 + 38 * Math.sin(i * Math.PI / 3)]);
    h += "M" + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" L") + '"/>';
    pts.forEach(function (p, j) { h += circ(p[0], p[1], j % 2 ? "g1" : "g2"); });
    h += T(170, 150, "hélice: unas 6 glucosas por vuelta, α(1→4)", "t-s", "middle");
    return svg(h, "0 0 340 165", "Amilosa: cadena helicoidal sin ramificar");
  }
  function ramas(y, nPrinc, cadaRama, largoRama, cl, doble) {
    var h = "", i, j, x;
    h += cadena(24, y, nPrinc, 12, cl);
    for (i = cadaRama; i < nPrinc; i += cadaRama) {
      x = 24 + i * 12;
      h += L(x, y + 8, x, y + 22, "l-r");
      for (j = 0; j < largoRama; j++) h += circ(x, y + 30 + j * 15, "g3");
      if (doble) {
        h += L(x + 6, y + 30 + 2 * 15, x + 16, y + 36 + 2 * 15, "l-r");
        for (j = 0; j < 2; j++) h += circ(x + 22 + j * 12, y + 44 + 2 * 15, "g3");
      }
    }
    return h;
  }
  function dibAmilopectina() {
    var h = ramas(40, 22, 7, 5, "g1", false);
    h += T(170, 160, "ramas α(1→6) cada 12–30 glucosas (esquema)", "t-s", "middle");
    return svg(h, "0 0 340 175", "Amilopectina: cadena con ramas");
  }
  function dibGlucogeno() {
    var h = ramas(40, 22, 4, 4, "g1", true);
    h += T(170, 160, "ramas α(1→6) cada 8–12 glucosas: muy ramificado", "t-s", "middle");
    return svg(h, "0 0 340 175", "Glucógeno: muy ramificado");
  }
  function dibCelulosa() {
    var h = "", f, i;
    for (f = 0; f < 3; f++) {
      var y = 34 + f * 46;
      for (i = 0; i < 20; i++) h += circ(24 + i * 15, y + (i % 2 ? 7 : -7), i % 2 ? "g2" : "g1");
      if (f < 2) for (i = 1; i < 20; i += 2) h += L(24 + i * 15, y + 14, 24 + i * 15, y + 32, "l-f");
    }
    h += T(170, 168, "cadenas rectas β(1→4), cada glucosa girada 180°", "t-s", "middle") + T(170, 182, "unidas por puentes de hidrógeno (línea de puntos)", "t-s", "middle");
    return svg(h, "0 0 340 192", "Celulosa: cadenas paralelas unidas por puentes de hidrógeno");
  }
  var POLI = [
    { k: "amilosa", t: "Amilosa", dib: dibAmilosa, d: [["Es", "~20-30 % del almidón"], ["Enlace", "α(1→4)"], ["Forma", "hélice sin ramificar"], ["Dónde", "granos de almidón (amiloplastos) de plantas"], ["Función", "reserva de energía vegetal"], ["¿La digerimos?", "sí (amilasa)"], ["Lugol", "azul intenso"]] },
    { k: "amilopectina", t: "Amilopectina", dib: dibAmilopectina, d: [["Es", "~70-80 % del almidón"], ["Enlace", "α(1→4) y ramas α(1→6)"], ["Forma", "ramificada"], ["Dónde", "granos de almidón de plantas"], ["Función", "reserva de energía vegetal"], ["¿La digerimos?", "sí (amilasa y enzima desramificante)"], ["Lugol", "violeta rojizo"]] },
    { k: "glucogeno", t: "Glucógeno", dib: dibGlucogeno, d: [["Es", "reserva animal y de hongos"], ["Enlace", "α(1→4) y ramas α(1→6)"], ["Forma", "muy ramificado"], ["Dónde", "hígado y músculo"], ["Función", "reserva de energía de acción rápida"], ["¿La digerimos?", "sí"], ["Lugol", "pardo rojizo"]] },
    { k: "celulosa", t: "Celulosa", dib: dibCelulosa, d: [["Es", "polisacárido de la pared vegetal"], ["Enlace", "β(1→4)"], ["Forma", "cadenas rectas en microfibrillas"], ["Dónde", "pared celular de plantas"], ["Función", "estructural (resistencia)"], ["¿La digerimos?", "no (no tenemos celulasa): es fibra"], ["Lugol", "no reacciona"]] }
  ];
  B.w.bio2_poli = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Cuatro polisacáridos de glucosa");
    cuerpo.innerHTML = '<p class="w-intro">Los cuatro están hechos solo de glucosa. Cambia el <b>tipo de enlace</b> (α o β) y la <b>ramificación</b>, y cambian la forma y la función.</p><div data-ctl></div><div class="b2t2-dib"></div><div class="b2t2-tabla"></div>';
    var cur = "amilosa";
    U.fichas(cuerpo.querySelector("[data-ctl]"), POLI.map(function (p) { return { k: p.k, t: p.t }; }), cur, function (k) { cur = k; pinta(); });
    function pinta() {
      var p = POLI.filter(function (x) { return x.k === cur; })[0];
      cuerpo.querySelector(".b2t2-dib").innerHTML = p.dib();
      cuerpo.querySelector(".b2t2-tabla").innerHTML = '<table class="b2t2-tab">' + p.d.map(function (f) { return "<tr><td>" + f[0] + "</td><td>" + f[1] + "</td></tr>"; }).join("") + "</table>";
    }
    pinta();
  };

  /* ======================= 4. bio2_lab ======================= */
  var MU = [
    { k: "glu", t: "Glucosa", fe: true, lu: 0 },
    { k: "fru", t: "Fructosa", fe: true, lu: 0 },
    { k: "lac", t: "Lactosa", fe: true, lu: 0 },
    { k: "sac", t: "Sacarosa", fe: false, lu: 0 },
    { k: "almi", t: "Almidón", fe: false, lu: 1 },
    { k: "cel", t: "Celulosa (algodón)", fe: false, lu: 0 },
    { k: "sach", t: "Sacarosa tras hervir con HCl", fe: true, lu: 0 }
  ];
  var WHY_FE = {
    glu: "La glucosa tiene el grupo aldehído libre (en equilibrio con el anillo): reduce el Cu²⁺ a Cu⁺ y precipita Cu₂O rojo.",
    fru: "La fructosa es cetosa, pero en medio alcalino se isomeriza a aldosa y reduce el Cu²⁺: positivo.",
    lac: "La lactosa conserva libre el OH anomérico de la glucosa: es un disacárido reductor.",
    sac: "La sacarosa tiene bloqueados los dos carbonos anoméricos en el enlace: no hay carbonilo libre, no reduce.",
    almi: "El almidón es un polisacárido: apenas tiene extremos reductores libres, así que no reduce el Fehling.",
    cel: "La celulosa no tiene poder reductor apreciable (y además no se disuelve).",
    sach: "El ácido hidrolizó la sacarosa en glucosa + fructosa (azúcar invertido), ambas reductoras. Hay que neutralizar antes, porque el Fehling funciona en medio básico."
  };
  var WHY_LU = {
    almi: "El yodo se aloja dentro de la hélice de la amilosa y da un color azul-violeta intenso.",
    def: "No hay hélice de amilosa que atrape el yodo: el Lugol conserva su color ámbar."
  };
  function tuboSVG(liq, prec, etq) {
    var h = '<svg viewBox="0 0 70 150" role="img" aria-label="' + etq + '">';
    h += '<path d="M12 8 V118 a23 23 0 0 0 46 0 V8" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>';
    h += '<path d="M12 62 H58 V118 a23 23 0 0 1 -46 0 Z" fill="' + liq + '" opacity=".9"/>';
    if (prec) h += '<path d="M16 126 a19 19 0 0 0 38 0 q-19 -12 -38 0 Z" fill="' + prec + '"/>';
    h += "</svg>";
    return h;
  }
  B.w.bio2_lab = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Reconocer glúcidos en el laboratorio");
    cuerpo.innerHTML = '<p class="w-intro">Elige una muestra y un reactivo y pulsa <b>Realizar la prueba</b>. Fehling: azul → precipitado rojo ladrillo si hay azúcar reductor (se calienta). Lugol: ámbar → azul-violeta si hay almidón.</p>' +
      '<div class="b2t2-rot">Muestra</div><div data-mu></div><div class="b2t2-rot">Reactivo</div><div data-re></div><div class="b2t2-acc"></div><div class="b2t2-tubos"></div><div class="b2t2-nota"></div>';
    Array.prototype.forEach.call(cuerpo.querySelectorAll(".b2t2-rot"), function (c) { c.style.cssText = "font-size:12.5px;color:var(--ink-faint);margin:8px 0 2px"; });
    var mu = "glu", re = "fe", hecho = false;
    U.fichas(cuerpo.querySelector("[data-mu]"), MU.map(function (m) { return { k: m.k, t: m.t }; }), mu, function (k) { mu = k; hecho = false; pinta(); });
    U.fichas(cuerpo.querySelector("[data-re]"), [{ k: "fe", t: "Fehling (con calor)" }, { k: "lu", t: "Lugol" }], re, function (k) { re = k; hecho = false; pinta(); });
    var bt = U.boton(cuerpo.querySelector(".b2t2-acc"), "Realizar la prueba", function () { hecho = true; pinta(); });
    bt.setAttribute("data-prueba", "");
    function pinta() {
      var m = MU.filter(function (x) { return x.k === mu; })[0];
      var ini = re === "fe" ? "#2f6fd8" : "#c98a1c", pos = re === "fe" ? m.fe : !!m.lu;
      var fin, prec = null;
      if (re === "fe") { fin = pos ? "#8a4a3a" : "#2f6fd8"; prec = pos ? "#b3301d" : null; }
      else { fin = pos ? "#2d1f7a" : "#c98a1c"; }
      var tubos = '<figure>' + tuboSVG(ini, null, "Tubo antes de la prueba") + "antes</figure>";
      if (hecho) tubos += '<figure class="b2t2-despues" data-res="' + (pos ? "pos" : "neg") + '">' + tuboSVG(fin, prec, "Tubo después de la prueba") + "después</figure>";
      cuerpo.querySelector(".b2t2-tubos").innerHTML = tubos;
      var nota = cuerpo.querySelector(".b2t2-nota");
      if (!hecho) { nota.className = "b2t2-nota"; nota.textContent = "Todavía no se ha hecho la prueba. ¿Qué esperas que pase?"; return; }
      nota.className = "b2t2-nota " + (pos ? "ok" : "mal");
      nota.innerHTML = "<b>" + (pos ? "Positivo" : "Negativo") + " (" + (re === "fe" ? "Fehling" : "Lugol") + ").</b> " + (re === "fe" ? WHY_FE[mu] : (m.lu ? WHY_LU.almi : WHY_LU.def));
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
