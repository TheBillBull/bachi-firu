/* ============================================================
   Bachi para Firu · gráficas SVG y evaluador de expresiones
   Sin dependencias. Funciona abriendo el archivo directamente.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI = global.BACHI || {};
  var NS = "http://www.w3.org/2000/svg";
  var contador = 0;

  // ============================================================
  // Formato numérico a la española (coma decimal, signo menos real)
  // ============================================================
  B.fmt = function (n, dec) {
    if (n == null || !isFinite(n)) return "—";
    dec = dec == null ? 2 : dec;
    var f = Math.pow(10, dec);
    var s = (Math.round(n * f) / f).toFixed(dec);
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if (s === "-0") s = "0";
    return s.replace(".", ",").replace("-", "−");
  };

  function svg(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // Paso "bonito" (1, 2, 5 × 10ⁿ) para las marcas de los ejes
  function paso(rango) {
    var raw = rango / 8, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }

  // ============================================================
  // Plot: lienzo cartesiano en SVG
  //   var g = new BACHI.Plot(contenedor, { xmin, xmax, ymin, ymax });
  //   g.curva(f, { clase: "c-pen" }); g.punto(x, y); g.recta(m, x0, y0) ...
  // Las capas: "fijo" (se dibuja una vez) y "din" (se limpia con g.limpiar()).
  // ============================================================
  function Plot(host, o) {
    o = o || {};
    var c = this.c = {
      w: o.w || 640, h: o.h || 380,
      xmin: o.xmin == null ? -5 : o.xmin, xmax: o.xmax == null ? 5 : o.xmax,
      ymin: o.ymin == null ? -5 : o.ymin, ymax: o.ymax == null ? 5 : o.ymax,
      izq: 14, der: 16, arr: 14, abj: 14,
      etx: o.etx === undefined ? "x" : o.etx, ety: o.ety === undefined ? "y" : o.ety,
      sinEjes: !!o.sinEjes || !!o.limpio, sinY: !!o.sinY || !!o.limpio, sinX: !!o.sinX || !!o.limpio, limpio: !!o.limpio
    };
    // En pantallas estrechas el lienzo se dibuja con menos "píxeles virtuales" para que
    // los números y las etiquetas sigan siendo legibles al encogerse
    var ancho = host.clientWidth;
    if (ancho > 0 && ancho < 520) { c.w = Math.round(c.w * 0.68); c.h = Math.round(c.h * 0.84); }
    this.id = "pc" + (++contador);
    this.svg = svg("svg", { viewBox: "0 0 " + c.w + " " + c.h, "class": "plot", role: "img", "aria-label": o.etiqueta || "Gráfica" });
    host.appendChild(this.svg);
    var defs = svg("defs", null, this.svg);
    this.clip = svg("clipPath", { id: this.id }, defs);
    this.clipRect = svg("rect", null, this.clip);
    this.gFondo = svg("g", { "class": "p-fondo" }, this.svg);
    this.gFijo = svg("g", { "class": "p-fijo", "clip-path": "url(#" + this.id + ")" }, this.svg);
    this.gDin = svg("g", { "class": "p-din", "clip-path": "url(#" + this.id + ")" }, this.svg);
    this.gTop = svg("g", { "class": "p-top" }, this.svg); // manejadores y etiquetas, sin recorte
    this.fondo();
  }

  Plot.prototype.px = function (x) { var c = this.c; return c.izq + (x - c.xmin) / (c.xmax - c.xmin) * (c.w - c.izq - c.der); };
  Plot.prototype.py = function (y) { var c = this.c; return c.h - c.abj - (y - c.ymin) / (c.ymax - c.ymin) * (c.h - c.arr - c.abj); };
  Plot.prototype.ix = function (X) { var c = this.c; return c.xmin + (X - c.izq) / (c.w - c.izq - c.der) * (c.xmax - c.xmin); };
  Plot.prototype.iy = function (Y) { var c = this.c; return c.ymin + (c.h - c.abj - Y) / (c.h - c.arr - c.abj) * (c.ymax - c.ymin); };

  // Cambia el rango visible y repinta el fondo (cuadrícula y ejes)
  Plot.prototype.rango = function (xmin, xmax, ymin, ymax) {
    var c = this.c; c.xmin = xmin; c.xmax = xmax; c.ymin = ymin; c.ymax = ymax;
    this.fondo();
  };

  Plot.prototype.fondo = function () {
    var c = this.c, g = this.gFondo;
    while (g.firstChild) g.removeChild(g.firstChild);
    // margen izquierdo según la anchura de las etiquetas
    var sx = paso(c.xmax - c.xmin), sy = paso(c.ymax - c.ymin);
    var maxLab = 1;
    for (var yy = Math.ceil(c.ymin / sy) * sy; yy <= c.ymax + 1e-9; yy += sy) maxLab = Math.max(maxLab, B.fmt(yy, 3).length);
    c.izq = c.limpio ? 14 : 12 + Math.min(maxLab, 6) * 6.2;
    c.abj = c.limpio ? 14 : 26;
    this.clipRect.setAttribute("x", c.izq); this.clipRect.setAttribute("y", c.arr);
    this.clipRect.setAttribute("width", c.w - c.izq - c.der); this.clipRect.setAttribute("height", c.h - c.arr - c.abj);
    svg("rect", { x: c.izq, y: c.arr, width: c.w - c.izq - c.der, height: c.h - c.arr - c.abj, "class": "p-marco" }, g);
    var x0 = Math.min(Math.max(0, c.xmin), c.xmax), y0 = Math.min(Math.max(0, c.ymin), c.ymax);
    var x;
    for (x = Math.ceil(c.xmin / sx) * sx; x <= c.xmax + 1e-9 && !c.sinX; x += sx) {
      if (Math.abs(x) < sx / 1e3) continue;
      svg("line", { x1: this.px(x), x2: this.px(x), y1: c.arr, y2: c.h - c.abj, "class": "p-gr" }, g);
      var t = svg("text", { x: this.px(x), y: this.py(y0) + 15, "text-anchor": "middle", "class": "p-num" }, g);
      t.textContent = B.fmt(x, 3);
    }
    for (var y = Math.ceil(c.ymin / sy) * sy; y <= c.ymax + 1e-9 && !c.sinY; y += sy) {
      if (Math.abs(y) < sy / 1e3) continue;
      svg("line", { y1: this.py(y), y2: this.py(y), x1: c.izq, x2: c.w - c.der, "class": "p-gr" }, g);
      var t2 = svg("text", { x: this.px(x0) - 6, y: this.py(y) + 4, "text-anchor": "end", "class": "p-num" }, g);
      t2.textContent = B.fmt(y, 3);
    }
    if (!c.sinEjes) {
      svg("line", { x1: c.izq, x2: c.w - c.der, y1: this.py(y0), y2: this.py(y0), "class": "p-eje" }, g);
      if (!c.sinY) svg("line", { x1: this.px(x0), x2: this.px(x0), y1: c.arr, y2: c.h - c.abj, "class": "p-eje" }, g);
      if (c.etx) { var lx = svg("text", { x: c.w - c.der - 2, y: this.py(y0) - 6, "text-anchor": "end", "class": "p-et" }, g); lx.textContent = c.etx; }
      if (c.ety && !c.sinY) { var ly = svg("text", { x: this.px(x0) + 7, y: c.arr + 12, "class": "p-et" }, g); ly.textContent = c.ety; }
    }
    // los elementos ya dibujados en la capa fija dejan de ser válidos
    while (this.gFijo.firstChild) this.gFijo.removeChild(this.gFijo.firstChild);
  };

  Plot.prototype.capa = function (o) { return o && o.capa === "fijo" ? this.gFijo : o && o.capa === "top" ? this.gTop : this.gDin; };

  // Borra solo lo dinámico; los manejadores de la capa "top" se crean una vez y se mueven con mover()
  Plot.prototype.limpiar = function () {
    while (this.gDin.firstChild) this.gDin.removeChild(this.gDin.firstChild);
  };

  Plot.prototype.mover = function (elem, x, y) {
    elem.setAttribute("cx", this.px(x)); elem.setAttribute("cy", this.py(y));
  };

  // Dibuja y = f(x). Corta el trazo en asíntotas y huecos del dominio.
  Plot.prototype.curva = function (f, o) {
    o = o || {};
    var c = this.c, n = o.n || 320;
    var xa = o.x0 == null ? c.xmin : o.x0, xb = o.x1 == null ? c.xmax : o.x1;
    var d = "", lapiz = false, prevY = null, prevV = null, alto = c.h - c.arr - c.abj;
    for (var i = 0; i <= n; i++) {
      var x = xa + (xb - xa) * i / n, v;
      try { v = f(x); } catch (e) { v = NaN; }
      if (!isFinite(v) || Math.abs(v) > 1e7) { lapiz = false; prevY = null; continue; }
      var Y = this.py(v);
      if (prevY !== null && Math.abs(Y - prevY) > alto * 0.9 && v * prevV < 0) lapiz = false; // asíntota
      d += (lapiz ? "L" : "M") + this.px(x).toFixed(1) + " " + Math.max(-3000, Math.min(3000, Y)).toFixed(1);
      lapiz = true; prevY = Y; prevV = v;
    }
    var p = svg("path", { d: d, "class": "p-curva " + (o.clase || "c-pen") }, this.capa(o));
    if (o.dash) p.setAttribute("stroke-dasharray", o.dash);
    return p;
  };

  Plot.prototype.segmento = function (x1, y1, x2, y2, o) {
    o = o || {};
    var l = svg("line", { x1: this.px(x1), y1: this.py(y1), x2: this.px(x2), y2: this.py(y2), "class": "p-seg " + (o.clase || "c-red") }, this.capa(o));
    if (o.dash) l.setAttribute("stroke-dasharray", o.dash);
    return l;
  };

  // Recta de pendiente m por (x0, y0), recortada al marco
  Plot.prototype.recta = function (m, x0, y0, o) {
    var c = this.c;
    return this.segmento(c.xmin, y0 + m * (c.xmin - x0), c.xmax, y0 + m * (c.xmax - x0), o);
  };

  // Rectángulo entre (x0, y0) y (x1, y1) en coordenadas de datos (barras, áreas)
  Plot.prototype.rect = function (x0, y0, x1, y1, o) {
    o = o || {};
    var X = Math.min(this.px(x0), this.px(x1)), Y = Math.min(this.py(y0), this.py(y1));
    var r = svg("rect", { x: X, y: Y, width: Math.abs(this.px(x1) - this.px(x0)), height: Math.abs(this.py(y1) - this.py(y0)), "class": "p-zona " + (o.clase || "z-pen") }, this.capa(o));
    if (o.borde) { r.style.stroke = o.borde; r.style.strokeWidth = 1.2; }
    return r;
  };

  // Línea quebrada por una lista de puntos [x, y] (series de datos, simulaciones)
  Plot.prototype.polilinea = function (pts, o) {
    o = o || {};
    var d = "";
    for (var i = 0; i < pts.length; i++) d += (i ? "L" : "M") + this.px(pts[i][0]).toFixed(1) + " " + this.py(pts[i][1]).toFixed(1);
    var p = svg("path", { d: d, "class": "p-curva " + (o.clase || "c-pen") }, this.capa(o));
    if (o.dash) p.setAttribute("stroke-dasharray", o.dash);
    return p;
  };

  Plot.prototype.vertical = function (x, o) { return this.segmento(x, this.c.ymin, x, this.c.ymax, o); };
  Plot.prototype.horizontal = function (y, o) { return this.segmento(this.c.xmin, y, this.c.xmax, y, o); };

  // Polígono cerrado y relleno: pts = [[x, y], ...]
  Plot.prototype.poligono = function (pts, o) {
    o = o || {};
    var d = "";
    for (var i = 0; i < pts.length; i++) d += (i ? "L" : "M") + this.px(pts[i][0]).toFixed(1) + " " + this.py(pts[i][1]).toFixed(1);
    var p = svg("path", { d: d + "Z", "class": "p-zona " + (o.clase || "z-pen") }, this.capa(o));
    if (o.borde) { p.style.stroke = o.borde; p.style.strokeWidth = o.grosor || 1.6; p.style.strokeLinejoin = "round"; }
    if (o.dash) p.setAttribute("stroke-dasharray", o.dash);
    return p;
  };
  // Arco de circunferencia (ángulos en grados, sentido antihorario) en coordenadas del dibujo
  Plot.prototype.arco = function (cx, cy, r, a0, a1, o) {
    var pts = [], n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 3));
    for (var i = 0; i <= n; i++) { var a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return this.polilinea(pts, o);
  };
  // Rango con la misma escala en los dos ejes (para geometría): centro (cx, cy) y semialtura
  Plot.prototype.rangoIso = function (cx, cy, semi) {
    var c = this.c, pw = c.w - c.izq - c.der, ph = c.h - c.arr - c.abj, sw = semi * pw / ph;
    this.rango(cx - sw, cx + sw, cy - semi, cy + semi);
  };
  Plot.prototype.punto = function (x, y, o) {
    o = o || {};
    var p = svg("circle", { cx: this.px(x), cy: this.py(y), r: o.r || 5, "class": "p-punto " + (o.clase || "c-pen") }, this.capa(o));
    return p;
  };

  Plot.prototype.texto = function (x, y, t, o) {
    o = o || {};
    var e = svg("text", { x: this.px(x) + (o.dx || 0), y: this.py(y) + (o.dy || 0), "text-anchor": o.ancla || "start", "class": "p-txt " + (o.clase || "") }, this.capa(o));
    e.textContent = t;
    return e;
  };

  // Zona entre f y el eje (o entre f y g) de a a b
  Plot.prototype.zona = function (f, a, b, o) {
    o = o || {};
    var n = 120, d = "M" + this.px(a) + " " + this.py(o.g ? o.g(a) : 0);
    var i, x;
    for (i = 0; i <= n; i++) { x = a + (b - a) * i / n; d += "L" + this.px(x).toFixed(1) + " " + Math.max(-3000, Math.min(3000, this.py(f(x)))).toFixed(1); }
    for (i = n; i >= 0; i--) { x = a + (b - a) * i / n; d += "L" + this.px(x).toFixed(1) + " " + this.py(o.g ? o.g(x) : 0).toFixed(1); }
    return svg("path", { d: d + "Z", "class": "p-zona " + (o.clase || "z-hl") }, this.capa(o));
  };

  // Hace arrastrable un elemento SVG. cb(x, y) recibe coordenadas de datos.
  // o.eje = "x" fija la y; o.paso = salto con las flechas del teclado.
  Plot.prototype.arrastrar = function (elem, cb, o) {
    o = o || {};
    var self = this;
    elem.classList.add("p-asa");
    elem.setAttribute("tabindex", "0");
    elem.setAttribute("role", "slider");
    elem.setAttribute("aria-label", o.etiqueta || "Punto arrastrable");
    function datos(ev) {
      var pt = self.svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
      var m = self.svg.getScreenCTM(); if (!m) return null;
      var q = pt.matrixTransform(m.inverse());
      return { x: self.ix(q.x), y: self.iy(q.y) };
    }
    elem.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      try { elem.setPointerCapture(ev.pointerId); } catch (e) {}
      elem._arrastrando = true; elem.classList.add("activo");
    });
    elem.addEventListener("pointermove", function (ev) {
      if (!elem._arrastrando) return;
      var p = datos(ev); if (p) cb(p.x, p.y);
    });
    function fin() { elem._arrastrando = false; elem.classList.remove("activo"); }
    elem.addEventListener("pointerup", fin);
    elem.addEventListener("pointercancel", fin);
    elem.addEventListener("keydown", function (ev) {
      var k = ev.key, dx = o.paso || (self.c.xmax - self.c.xmin) / 100;
      if (k !== "ArrowLeft" && k !== "ArrowRight" && k !== "ArrowUp" && k !== "ArrowDown") return;
      ev.preventDefault();
      var s = (k === "ArrowLeft" || k === "ArrowDown") ? -1 : 1;
      cb((o.get ? o.get() : 0) + s * dx, null, true);
    });
  };

  B.Plot = Plot;

  // ============================================================
  // Mate: evaluador de expresiones escritas por el alumno
  //   "12x^3-4x+5", "3(x+1)^2", "sen(2x)", "e^(-x)", "x/(x^2+1)", "√x"
  // No usa eval: analiza la expresión y construye una función.
  // ============================================================
  var Mate = B.Mate = {};
  var FUNCS = {
    sen: Math.sin, sin: Math.sin, cos: Math.cos, tan: Math.tan, tg: Math.tan, ln: Math.log, log: Math.log10,
    exp: Math.exp, sqrt: Math.sqrt, raiz: Math.sqrt, abs: Math.abs,
    arcsen: Math.asin, asin: Math.asin, arccos: Math.acos, acos: Math.acos, arctan: Math.atan, atan: Math.atan, arctg: Math.atan
  };
  var NOMBRES = ["arcsen", "arccos", "arctan", "arctg", "asin", "acos", "atan", "sqrt", "raiz", "sen", "sin", "cos", "tan", "tg", "ln", "log", "exp", "abs"];

  function tokenizar(src) {
    var s = String(src).toLowerCase()
      .replace(/[−–—]/g, "-").replace(/[·×]/g, "*").replace(/÷/g, "/").replace(/\*\*/g, "^")
      .replace(/²/g, "^2").replace(/³/g, "^3").replace(/⁴/g, "^4").replace(/’|′/g, "'");
    var tk = [], i = 0, m;
    while (i < s.length) {
      var ch = s.charAt(i);
      if (/\s/.test(ch)) { i++; continue; }
      if ((m = /^\d+(?:[.,]\d+)?|^[.,]\d+/.exec(s.slice(i)))) { tk.push({ k: "n", v: parseFloat(m[0].replace(",", ".")), s: m[0] }); i += m[0].length; continue; }
      if ("+-*/^()".indexOf(ch) >= 0) { tk.push({ k: ch, s: ch }); i++; continue; }
      if (ch === "√") { tk.push({ k: "r", s: "√" }); i++; continue; }
      if (ch === "π") { tk.push({ k: "c", v: Math.PI, s: "π" }); i++; continue; }
      if (/[a-z]/.test(ch)) {
        var f = null;
        for (var j = 0; j < NOMBRES.length; j++) if (s.indexOf(NOMBRES[j], i) === i) { f = NOMBRES[j]; break; }
        if (f) { tk.push({ k: "f", v: FUNCS[f], s: f }); i += f.length; continue; }
        if (s.indexOf("pi", i) === i) { tk.push({ k: "c", v: Math.PI, s: "π" }); i += 2; continue; }
        if (ch === "e") { tk.push({ k: "c", v: Math.E, s: "e" }); i++; continue; }
        tk.push({ k: "v", s: ch }); i++; continue;
      }
      throw new Error("No entiendo el símbolo «" + ch + "».");
    }
    return tk;
  }

  function mostrar(tk) {
    var o = "";
    for (var i = 0; i < tk.length; i++) {
      var a = tk[i], b = tk[i + 1];
      o += a.s;
      if (a.k === "f" && b && b.k !== "(") o += " ";
      if (b && (a.k === "n" || a.k === "v" || a.k === "c" || a.k === ")") && (b.k === "n" || b.k === "v" || b.k === "c" || b.k === "f" || b.k === "(" || b.k === "r")) o += "·";
    }
    return o.replace(/\*/g, "·").replace(/-/g, "−");
  }

  function analizar(tk) {
    var i = 0;
    function peek() { return tk[i]; }
    function empieza(t) { return t && (t.k === "n" || t.k === "v" || t.k === "c" || t.k === "f" || t.k === "(" || t.k === "r"); }
    function expr() {
      var a = term(), t;
      while ((t = peek()) && (t.k === "+" || t.k === "-")) {
        i++; var b = term();
        a = (function (a, b, op) { return op === "+" ? function (x) { return a(x) + b(x); } : function (x) { return a(x) - b(x); }; })(a, b, t.k);
      }
      return a;
    }
    function term() {
      var a = unario(), t;
      for (;;) {
        t = peek();
        if (t && (t.k === "*" || t.k === "/")) {
          i++; var b = unario();
          a = (function (a, b, op) { return op === "*" ? function (x) { return a(x) * b(x); } : function (x) { return a(x) / b(x); }; })(a, b, t.k);
        } else if (empieza(t)) {
          var c = unario();
          a = (function (a, c) { return function (x) { return a(x) * c(x); }; })(a, c);
        } else break;
      }
      return a;
    }
    function unario() {
      var t = peek();
      if (t && t.k === "-") { i++; var u = unario(); return function (x) { return -u(x); }; }
      if (t && t.k === "+") { i++; return unario(); }
      return potencia();
    }
    function potencia() {
      var a = atomo(), t = peek();
      if (t && t.k === "^") {
        i++; var e = unario();
        return function (x) { return Math.pow(a(x), e(x)); };
      }
      return a;
    }
    function atomo() {
      var t = tk[i++];
      if (!t) throw new Error("La expresión está incompleta.");
      if (t.k === "n") { var v = t.v; return function () { return v; }; }
      if (t.k === "c") { var cv = t.v; return function () { return cv; }; }
      if (t.k === "v") return function (x) { return x; };
      if (t.k === "(") {
        var e = expr();
        if (!peek() || peek().k !== ")") throw new Error("Falta cerrar un paréntesis.");
        i++;
        return e;
      }
      if (t.k === "r") {
        var r = potenciaSinCadena();
        return function (x) { return Math.sqrt(r(x)); };
      }
      if (t.k === "f") {
        var fn = t.v, arg, pot = null;
        // sen²x y sen^2(x) se leen como (sen x)²
        if (peek() && peek().k === "^" && tk[i + 1] && tk[i + 1].k === "n") { pot = tk[i + 1].v; i += 2; }
        if (peek() && peek().k === "(") { i++; arg = expr(); if (!peek() || peek().k !== ")") throw new Error("Falta cerrar un paréntesis."); i++; }
        else {
          var primeroNumero = peek() && peek().k === "n";
          arg = potenciaSinCadena();
          if (primeroNumero && peek() && peek().k === "v") { var otro = potenciaSinCadena(); arg = (function (a, b) { return function (x) { return a(x) * b(x); }; })(arg, otro); }
        }
        if (pot !== null) return function (x) { return Math.pow(fn(arg(x)), pot); };
        return function (x) { return fn(arg(x)); };
      }
      throw new Error("No esperaba «" + t.s + "» aquí.");
    }
    function potenciaSinCadena() { return potencia(); }
    var f = expr();
    if (i < tk.length) throw new Error("No entiendo «" + tk[i].s + "» en esa posición.");
    return f;
  }

  // Devuelve { ok, f, texto } o { ok:false, error }
  Mate.compilar = function (src) {
    try {
      var s = String(src == null ? "" : src);
      // "y = ...", "f'(x) = ..." → se queda con la parte derecha
      if (s.split("=").length === 2 && /^[\sa-zA-Z'’′()]*=/.test(s)) s = s.split("=")[1];
      if (!s.trim()) return { ok: false, error: "Escribe algo primero." };
      var tk = tokenizar(s);
      return { ok: true, f: analizar(tk), texto: mostrar(tk) };
    } catch (e) { return { ok: false, error: e.message }; }
  };

  // Número escrito como lo haría un alumno: "1/2", "-3,5", "2√3", "π/2"
  Mate.numero = function (src) {
    var r = Mate.compilar(src);
    if (!r.ok) return NaN;
    if (/[a-df-z]/i.test(String(src).replace(/pi|sqrt|raiz|sen|sin|cos|tan|tg|ln|log|exp|abs|arc/gi, ""))) return NaN;
    var v = r.f(0);
    return isFinite(v) ? v : NaN;
  };

  // ¿Dan lo mismo las dos funciones? Compara en puntos "feos" del dominio.
  Mate.equivalente = function (f, g, dom) {
    dom = dom || [-3, 3];
    var N = 19, ok = 0;
    for (var i = 0; i < N; i++) {
      var x = dom[0] + (dom[1] - dom[0]) * (i + 0.37) / N, a = f(x), b = g(x);
      if (!isFinite(a) && !isFinite(b)) continue;
      if (!isFinite(a) || !isFinite(b)) return false;
      if (Math.abs(a - b) > 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))) return false;
      ok++;
    }
    return ok >= 6;
  };

  // Derivada numérica centrada (para widgets: no es lo que se enseña, es para dibujar)
  Mate.deriv = function (f, x) { var h = 1e-5 * Math.max(1, Math.abs(x)); return (f(x + h) - f(x - h)) / (2 * h); };

})(window);

/* ============================================================
   Bachi para Firu · núcleo de las ampliaciones
   ------------------------------------------------------------
   El contenido original (pagina.html) no se toca. Cada asignatura
   tiene su archivo en ampliaciones/ y llama a BACHI.registrar().
   Al arrancar, BACHI.fusionar() añade lo nuevo al final de lo que ya hay:
     · secciones   → HTML que se añade al final de una sección existente
     · nuevas      → secciones nuevas al final del tema
     · ejercicios  → ejercicios nuevos, con niveles y comprobación
     · lamina      → bloques nuevos de la lámina resumen
     · simulacros  → exámenes nuevos (BACHI.registrarSimulacros)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI = global.BACHI || {};

  // ============================================================
  // Utilidades
  // ============================================================
  B.esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  // Guardado local (solo comodidad de este navegador; nunca rompe la página)
  var PREF = "bachi-firu:lab:";
  B.ls = {
    get: function (k, def) {
      try { var v = localStorage.getItem(PREF + k); return v == null ? def : JSON.parse(v); } catch (e) { return def; }
    },
    set: function (k, v) { try { localStorage.setItem(PREF + k, JSON.stringify(v)); } catch (e) {} }
  };

  B.barajar = function (arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };

  // ============================================================
  // Ayudantes de maquetación (mismas clases que el resto de la web)
  // ============================================================
  B.h = {
    fr: function (n, d) { return "<span class='frac'><span class='num'>" + n + "</span><span class='den'>" + d + "</span></span>"; },
    raiz: function (c) { return "<span class='radical'><span class='radical-sign'>√</span><span class='radical-body'>" + c + "</span></span>"; },
    formula: function (h) { return "<div class='formula-wrap'><div class='formula'>" + h + "</div></div>"; },
    pasos: function (l) { return "<ol class='steps'>" + l.map(function (p) { return "<li class='step'><div class='math-line'>" + p + "</div></li>"; }).join("") + "</ol>"; },
    ejemplo: function (titulo, enunciado, l) { return "<div class='ejemplo'><b>" + titulo + "</b><p>" + enunciado + "</p>" + B.h.pasos(l) + "</div>"; },
    ojo: function (h) { return "<div class='ojo'><b>Ojo:</b> " + h + "</div>"; },
    // tabla pequeña (por ejemplo, una tabla ICE): cab = ["", "H₂", ...], filas = [["Inicial", "1", ...], ...]
    tabla: function (cab, filas, clase) {
      return "<table class='lam-tabla " + (clase || "") + "'><thead><tr>" + cab.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>" +
        filas.map(function (f) { return "<tr>" + f.map(function (c, i) { return i === 0 ? "<th scope='row'>" + c + "</th>" : "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
    },
    // marcador de una actividad dentro del HTML de un tema
    w: function (nombre, ref) { return "<div data-w='" + nombre + "'" + (ref ? " data-ref='" + ref + "'" : "") + "></div>"; }
  };

  // ============================================================
  // Registro y fusión con el contenido original
  // ============================================================
  B.ampl = {};

  B.registrar = function (asig, tema, def) {
    (B.ampl[asig] = B.ampl[asig] || {})[tema] = def;
  };

  B.registrarSimulacros = function (asig, lista) {
    (B.ampl[asig] = B.ampl[asig] || {})._simulacros = lista;
  };

  // "mates1/t11/quiz1" → B.ampl.mates1.t11.datos.quiz1
  B.dato = function (ref) {
    var p = String(ref).split("/"), d = B.ampl[p[0]] && B.ampl[p[0]][p[1]];
    return d && d.datos ? d.datos[p[2]] : null;
  };

  var fusionado = false;
  B.fusionar = function (data) {
    if (fusionado) return;
    fusionado = true;
    Object.keys(B.ampl).forEach(function (asig) {
      var d = data[asig];
      if (!d) return;
      Object.keys(B.ampl[asig]).forEach(function (tema) {
        var def = B.ampl[asig][tema];
        if (tema === "_simulacros") {
          d.simulacros = (d.simulacros || []).concat(def);
          return;
        }
        var c = d.content[tema];
        if (!c) return;
        var sec = c.secciones.map(function (s, i) {
          var extra = def.secciones && def.secciones[i];
          return extra ? { h: s.h, html: s.html + '<div class="ampl">' + extra + "</div>" } : s;
        });
        (def.nuevas || []).forEach(function (n) { sec.push({ h: n.h, html: '<div class="ampl">' + n.html + "</div>" }); });
        c.secciones = sec;
        (def.ejercicios || []).forEach(function (ex) { ex.ampl = true; });
        d.ejercicios[tema] = (d.ejercicios[tema] || []).concat(def.ejercicios || []);
        (def.lamina || []).forEach(function (b) { b.ampl = true; });
        d.lamina[tema] = (d.lamina[tema] || []).concat(def.lamina || []);
      });
    });
  };

  // ============================================================
  // Cabecera de estudio de cada tema ampliado:
  //   resumen: ["idea 1", ...]  → "En 1 minuto"
  // y una ruta (explora → comprueba → practica → repasa) con accesos directos.
  // El botón "texto largo" oculta o muestra la teoría original (nunca se borra).
  // ============================================================
  B.cabecera = function (asig, tema) {
    var def = B.ampl[asig] && B.ampl[asig][tema];
    if (!def || !def.resumen) return "";
    var html = (def.secciones ? Object.keys(def.secciones).map(function (k) { return def.secciones[k]; }) : []).concat((def.nuevas || []).map(function (n) { return n.html; })).join("");
    var labs = (html.match(/data-w='(?!quiz|tarjetas|emparejar|orden|clasificar|linea)[a-z0-9_]+'/gi) || []).length;
    var paso = function (n, id, t, sub) { return '<button type="button" class="cab-paso" data-bx-ir="' + id + '" data-asig="' + asig + '" data-tema="' + tema + '"><i>' + n + "</i><span><b>" + t + "</b><small>" + sub + "</small></span></button>"; };
    var ne = (def.ejercicios || []).length;
    return '<div class="cab no-print"><div class="cab-1m"><b class="cab-t">En 1 minuto</b><ul>' + def.resumen.map(function (r) { return "<li>" + r + "</li>"; }).join("") + "</ul></div>" +
      '<div class="cab-ruta"><b class="cab-t">Ruta de estudio</b><div class="cab-pasos">' +
      paso(1, "explora", "Explora", labs ? labs + (labs === 1 ? " laboratorio" : " laboratorios") : "diagramas") +
      paso(2, "comprueba", "Comprueba", "test y tarjetas") +
      paso(3, "ejercicios", "Practica", ne + " ejercicios por niveles") +
      paso(4, "lamina", "Repasa", "chuleta del tema") +
      '</div></div></div>';
  };

  document.addEventListener("click", function (e) {
    var ir = e.target.closest("[data-bx-ir]");
    if (!ir) return;
    var destino = ir.getAttribute("data-bx-ir"), det = ir.closest(".tema-detail");
    function scrollA(el) { if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    if (destino === "explora") { scrollA(det && det.querySelector(".w:not(.w-quiz)")); return; }
    if (destino === "comprueba") { scrollA(det && (det.querySelector("[data-w=quiz]:last-of-type") || Array.prototype.slice.call(det.querySelectorAll("[data-w=quiz]")).pop())); return; }
    // ejercicios o lámina: cambia de pestaña y baja hasta el bloque de este tema
    var tab = document.querySelector('.tab[data-panel="' + destino + '"]');
    if (!tab) return;
    var titulo = det && det.previousElementSibling ? det.previousElementSibling.textContent : "";
    tab.click();
    setTimeout(function () {
      var bloques = document.querySelectorAll("#panel-" + destino + " .tema-block"), objetivo = null;
      Array.prototype.forEach.call(bloques, function (b) { var h = b.querySelector(".tema-head"); if (h && titulo && titulo.indexOf(h.textContent.replace(/^Tema\s*\d+/, "").trim()) >= 0) objetivo = b; });
      scrollA(objetivo || document.getElementById("panel-" + destino));
    }, 60);
  });

  // Marca visible en la lista de temas: qué temas llevan ampliación y cuánta
  B.insignia = function (asig, tema) {
    var def = B.ampl[asig] && B.ampl[asig][tema];
    if (!def || tema === "_simulacros") return "";
    var labs = ((def.secciones ? Object.keys(def.secciones).map(function (k) { return def.secciones[k]; }) : []).concat((def.nuevas || []).map(function (n) { return n.html; })).join("").match(/data-w='/g) || []).length;
    var ne = (def.ejercicios || []).length;
    return '<span class="ampliado" title="' + ne + " ejercicios nuevos, " + labs + ' actividades interactivas">Ampliado</span>';
  };
  B.resumenAsig = function (asig) {
    var A = B.ampl[asig];
    if (!A) return "";
    var n = Object.keys(A).filter(function (k) { return k !== "_simulacros"; }).length;
    return n ? n + (n === 1 ? " tema ampliado" : " temas ampliados") : "";
  };

  // ============================================================
  // Láminas resumen ampliadas (chuletas que sirven de verdad)
  // Cada bloque puede llevar: items (fórmula + cuándo + ejemplo + ojo),
  // pasos (método numerado), tabla y errores (mal / bien / por qué).
  // ============================================================
  B.tarjetaLamina = function (b) {
    var h = '<div class="lamina-card lam-ampl' + (b.ancha ? " ancha" : "") + '"><h4>' + b.titulo + "</h4>";
    (b.items || []).forEach(function (it) {
      h += '<div class="formula-row"><div class="formula-label">' + it.label + "</div>" +
        '<div class="formula">' + it.formula + "</div>" +
        (it.cuando ? '<p class="lam-cuando"><b>Cuándo:</b> ' + it.cuando + "</p>" : "") +
        (it.ejemplo ? '<p class="lam-ej"><b>Ej.:</b> ' + it.ejemplo + "</p>" : "") +
        (it.ojo ? '<p class="lam-ojo">⚠ ' + it.ojo + "</p>" : "") +
        (it.nota ? '<p class="formula-nota">' + it.nota + "</p>" : "") + "</div>";
    });
    if (b.pasos) h += '<ol class="lam-pasos">' + b.pasos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ol>";
    if (b.tabla) {
      h += '<table class="lam-tabla"><thead><tr>' + b.tabla.cab.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>" +
        b.tabla.filas.map(function (f) { return "<tr>" + f.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
    }
    if (b.errores) {
      b.errores.forEach(function (e) {
        h += '<div class="lam-err"><div class="mal"><span>✗</span>' + e.mal + '</div><div class="bien"><span>✓</span>' + e.bien + "</div>" +
          (e.por ? '<p class="por">' + e.por + "</p>" : "") + "</div>";
      });
    }
    if (b.nota) h += '<p class="formula-nota">' + b.nota + "</p>";
    return h + "</div>";
  };

  B.barraLamina = function () {
    // dentro de claude.ai el visor bloquea window.print(): el botón solo se ofrece en la web publicada
    if (global.claude && global.claude.use) return "";
    return '<div class="lam-barra no-print"><button type="button" class="chip-btn" data-bx-print>🖨 Imprimir o guardar como PDF</button>' +
      '<span class="hand-note">cada lámina cabe en una hoja: llévatela de chuleta de estudio</span></div>';
  };

  // ============================================================
  // Ejercicios con niveles y comprobación automática
  //   nivel: 1 básico · 2 medio · 3 nivel PAU
  //   check: campo o lista de campos
  //     { tipo: "num",    etiqueta, valor, tol (relativa, 0,005 por defecto), abs, unidad }
  //     { tipo: "expr",   etiqueta, expr: "12x^3-4x", dom: [-2, 2] }
  //     { tipo: "lista",  etiqueta, valores: [0, 2] }
  //     { tipo: "opcion", etiqueta, opciones: [...], ok: índice }
  //     { tipo: "rubrica", etiqueta, items: [{ t, p }] }  (respuesta larga con autoevaluación)
  // ============================================================
  var NIVELES = { 1: ["★", "Básico"], 2: ["★★", "Medio"], 3: ["★★★", "Nivel PAU"] };

  function campoHtml(c, k) {
    var et = c.etiqueta ? '<span class="bx-et">' + c.etiqueta + "</span>" : "";
    if (c.tipo === "opcion") {
      return '<label class="bx-campo">' + et + '<select data-k="' + k + '"><option value="">Elige…</option>' +
        c.opciones.map(function (o, i) { return '<option value="' + i + '">' + o + "</option>"; }).join("") + "</select>" +
        '<span class="bx-mk" aria-hidden="true"></span></label>';
    }
    if (c.tipo === "rubrica") {
      return '<label class="bx-campo bx-largo">' + et + '<textarea data-k="' + k + '" rows="' + (c.filas || 6) + '" placeholder="' + (c.ph || "Escribe aquí tu respuesta…") + '"></textarea></label>' +
        '<p class="wc" data-bx-wc>0 palabras</p>';
    }
    return '<label class="bx-campo">' + et + '<input type="text" data-k="' + k + '" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + (c.ph || "") + '">' +
      (c.unidad ? '<span class="bx-un">' + c.unidad + "</span>" : "") + '<span class="bx-mk" aria-hidden="true"></span></label>';
  }

  B.articulo = function (asig, tema, ex, i, solId) {
    var clave = asig + "/" + tema + "/" + (ex.id || i);
    var hecho = !!(B.ls.get("ej", {})[clave]);
    var nv = NIVELES[ex.nivel];
    var campos = ex.check ? (Array.isArray(ex.check) ? ex.check : [ex.check]) : [];
    var esRubrica = campos.length === 1 && campos[0].tipo === "rubrica";
    var h = '<article class="exercise ex-ampl' + (hecho ? " resuelto" : "") + '" data-bx="' + clave + '">' +
      '<div class="ex-head"><span class="ex-num">' + (i + 1) + "</span>Ejercicio" +
      (nv ? '<span class="ex-nivel n' + ex.nivel + '" title="Dificultad: ' + nv[1] + '"><span aria-hidden="true">' + nv[0] + "</span> " + nv[1] + "</span>" : "") +
      '<span class="ex-ok" aria-hidden="true">✓ resuelto</span></div>' +
      '<div class="exercise-statement">' + ex.enunciado + "</div>";
    if (campos.length) {
      h += '<form class="bx-form" data-bx-form="' + clave + '" novalidate><div class="bx-campos">' +
        campos.map(campoHtml).join("") + '</div><div class="bx-acciones">' +
        '<button type="submit" class="btn-comprobar">' + (esRubrica ? "Autoevaluarme" : "Comprobar") + "</button>" +
        (ex.pistas && ex.pistas.length ? '<button type="button" class="chip-btn" data-bx-pista>💡 Pista</button>' : "") +
        '</div><div class="bx-res" aria-live="polite"></div><div class="bx-pistas"></div></form>';
    }
    h += '<button type="button" class="btn-solucion" data-target="' + solId + '" aria-expanded="false" aria-controls="' + solId + '">Mostrar solución</button>' +
      '<div class="solucion" id="' + solId + '" hidden><ol class="steps">';
    (ex.pasos || []).forEach(function (p) { h += '<li class="step"><div class="math-line">' + p + "</div></li>"; });
    h += "</ol>";
    if (ex.resultado) h += '<div class="result-box"><span class="result-label">Resultado</span>' + ex.resultado + "</div>";
    if (ex.ojo) h += '<div class="callout"><b>Ojo, error típico:</b> ' + ex.ojo + "</div>";
    return h + "</div></article>";
  };

  function datosEjercicio(art) {
    var p = art.getAttribute("data-bx").split("/");
    var lista = B.ampl[p[0]] && B.ampl[p[0]][p[1]] && B.ampl[p[0]][p[1]].ejercicios;
    if (!lista) return null;
    for (var i = 0; i < lista.length; i++) if (String(lista[i].id || "") === p[2]) return lista[i];
    return null;
  }

  // Compara lo escrito con lo esperado. Devuelve { ok, msg }.
  function evaluar(c, el) {
    var Mate = B.Mate, raw = el.value;
    if (c.tipo === "opcion") {
      if (raw === "") return { ok: false, msg: "Elige una opción." };
      return { ok: +raw === c.ok };
    }
    if (!String(raw).trim()) return { ok: false, msg: "Escribe una respuesta." };
    if (c.tipo === "num") {
      var v = Mate.numero(raw);
      if (isNaN(v)) return { ok: false, msg: "No entiendo ese número. Puedes usar coma decimal, fracciones (1/2) o raíces (√2)." };
      var tol = Math.max(c.abs || 0, Math.abs(c.valor) * (c.tol == null ? 0.005 : c.tol));
      if (Math.abs(v - c.valor) <= tol + 1e-12) return { ok: true };
      if (Math.abs(v + c.valor) <= tol && c.valor !== 0) return { ok: false, msg: "El valor absoluto es correcto, pero fíjate en el signo." };
      if (Math.abs(v - c.valor) <= Math.abs(c.valor) * 0.05) return { ok: false, msg: "Muy cerca. Revisa los redondeos (usa más decimales hasta el final)." };
      return { ok: false };
    }
    if (c.tipo === "expr") {
      var r = Mate.compilar(raw);
      if (!r.ok) return { ok: false, msg: r.error };
      var esperado = Mate.compilar(c.expr);
      return { ok: Mate.equivalente(r.f, esperado.f, c.dom), msg: "He leído: " + r.texto };
    }
    if (c.tipo === "lista") {
      var esp = c.valores.slice().sort(function (a, b) { return a - b; });
      // «3, 0,5» → la coma seguida de espacio separa; la coma pegada a una cifra puede ser decimal.
      var partes = String(raw).split(/;|,\s+|\sy\s|\so\s/).map(function (s) { return Mate.numero(s); });
      if (partes.length !== esp.length || partes.some(isNaN)) {
        var alt = String(raw).split(/[;,]|\sy\s|\so\s/).map(function (s) { return Mate.numero(s); });
        if (!alt.some(isNaN) && (alt.length === esp.length || partes.some(isNaN))) partes = alt;
      }
      if (partes.some(isNaN)) return { ok: false, msg: "Escribe los valores separados por comas, por ejemplo: 0, 2." };
      partes.sort(function (a, b) { return a - b; });
      var igual = partes.length === esp.length && partes.every(function (p, i) { return Math.abs(p - esp[i]) <= Math.max(1e-9, Math.abs(esp[i]) * (c.tol == null ? 0.005 : c.tol)); });
      return { ok: igual, msg: igual || partes.length === esp.length ? "" : "Pide " + esp.length + " valor" + (esp.length === 1 ? "" : "es") + "." };
    }
    return { ok: false };
  }

  function marcar(art, clave) {
    art.classList.add("resuelto");
    var h = B.ls.get("ej", {}); h[clave] = true; B.ls.set("ej", h);
  }

  document.addEventListener("submit", function (e) {
    var form = e.target.closest && e.target.closest("[data-bx-form]");
    if (!form) return;
    e.preventDefault();
    var art = form.closest("[data-bx]"), ex = datosEjercicio(art);
    if (!ex) return;
    var campos = Array.isArray(ex.check) ? ex.check : [ex.check];
    var res = form.querySelector(".bx-res");
    if (campos[0].tipo === "rubrica") { rubrica(form, res, campos[0], art); return; }
    var bien = 0, mensajes = [];
    campos.forEach(function (c, k) {
      var el = form.querySelector('[data-k="' + k + '"]'), lab = el.closest(".bx-campo");
      var r = evaluar(c, el);
      lab.classList.toggle("ok", !!r.ok); lab.classList.toggle("mal", !r.ok);
      if (r.ok) bien++;
      if (r.msg) mensajes.push((campos.length > 1 && c.etiqueta ? "<b>" + c.etiqueta + "</b> → " : "") + r.msg);
    });
    var todos = bien === campos.length;
    var cab = todos ? "<b>✓ ¡Correcto!</b>" : (bien ? "<b>Vas bien:</b> " + bien + " de " + campos.length + " campos correctos." : "<b>Todavía no.</b> Revisa el planteamiento y vuelve a probar.");
    res.className = "bx-res " + (todos ? "ok" : "mal");
    res.innerHTML = cab + (mensajes.length ? "<br>" + mensajes.join("<br>") : "");
    if (todos) marcar(art, art.getAttribute("data-bx"));
  });

  // Respuesta larga: el alumno se autoevalúa contra los puntos clave
  function rubrica(form, res, c, art) {
    var total = c.items.reduce(function (a, it) { return a + it.p; }, 0);
    res.className = "bx-res rub";
    res.innerHTML = "<b>Marca lo que ha incluido tu respuesta</b> (sé sincero: es para ti):" +
      '<ul class="bx-rub">' + c.items.map(function (it, i) {
        return '<li><label><input type="checkbox" data-rp="' + it.p + '"> ' + it.t + ' <span class="bx-p">' + B.fmt(it.p, 2) + " pt</span></label></li>";
      }).join("") + '</ul><p class="bx-nota">Tu nota estimada: <b data-rn>0</b> / ' + B.fmt(total, 2) + "</p>";
    res.addEventListener("change", function () {
      var n = 0; res.querySelectorAll("[data-rp]").forEach(function (cb) { if (cb.checked) n += parseFloat(cb.getAttribute("data-rp")); });
      res.querySelector("[data-rn]").textContent = B.fmt(n, 2);
      if (n >= total - 1e-9) marcar(art, art.getAttribute("data-bx"));
    });
  }

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.tagName === "TEXTAREA" && t.closest("[data-bx-form]")) {
      var n = (t.value.trim().match(/\S+/g) || []).length, wc = t.closest("form").querySelector("[data-bx-wc]");
      if (wc) wc.textContent = n + (n === 1 ? " palabra" : " palabras");
    }
    var lab = t.closest && t.closest(".bx-campo");
    if (lab) lab.classList.remove("ok", "mal");
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-bx-print]")) { window.print(); return; }
    var pista = e.target.closest("[data-bx-pista]");
    if (!pista) return;
    var form = pista.closest("[data-bx-form]"), ex = datosEjercicio(form.closest("[data-bx]"));
    if (!ex || !ex.pistas) return;
    var cont = form.querySelector(".bx-pistas"), n = cont.children.length;
    if (n < ex.pistas.length) {
      var p = document.createElement("p"); p.className = "bx-pista";
      p.innerHTML = "<b>Pista " + (n + 1) + ":</b> " + ex.pistas[n];
      cont.appendChild(p);
    }
    if (cont.children.length >= ex.pistas.length) pista.disabled = true;
  });

  // ============================================================
  // Montaje de actividades: <div data-w="nombre" data-ref="asig/tema/clave">
  // ============================================================
  B.w = {};

  // Cabecera común de las actividades
  B.caja = function (host, etiqueta, titulo) {
    host.classList.add("w");
    host.innerHTML = '<div class="w-cab"><span class="w-tag">' + etiqueta + "</span>" + (titulo ? '<b class="w-titulo">' + titulo + "</b>" : "") + '</div><div class="w-cuerpo"></div>';
    return host.querySelector(".w-cuerpo");
  };

  B.montar = function (root) {
    var nodos = root.querySelectorAll("[data-w]");
    Array.prototype.forEach.call(nodos, function (n) {
      if (n.getAttribute("data-ok")) return;
      n.setAttribute("data-ok", "1");
      var f = B.w[n.getAttribute("data-w")];
      if (!f) return;
      var args = {};
      try { args = JSON.parse(n.getAttribute("data-args") || "{}"); } catch (e) {}
      var ref = n.getAttribute("data-ref");
      try { f(n, args, ref ? B.dato(ref) : null, ref); }
      catch (err) { n.innerHTML = '<p class="w-error">No se ha podido cargar esta actividad.</p>'; if (global.console) console.error(err); }
    });
  };

})(window);

/* ============================================================
   Bachi para Firu · utilidades de interfaz para los laboratorios
   (controles, lecturas, animación). Sin dependencias.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var U = B.ui = {};

  // Lectura (tarjeta pequeña con rótulo y valor)
  U.lec = function (rotulo, valor, clase) {
    return '<div class="lec ' + (clase || "") + '"><small>' + rotulo + "</small><b>" + valor + "</b></div>";
  };

  // Fichas para elegir una opción: opciones = [{ k, t }]
  U.fichas = function (host, opciones, actual, alElegir) {
    host.className = (host.className.indexOf("chips") < 0 ? host.className + " chips" : host.className);
    host.innerHTML = opciones.map(function (o) {
      return '<button type="button" class="chip-btn' + (o.k === actual ? " on" : "") + '" data-k="' + o.k + '" aria-pressed="' + (o.k === actual) + '">' + o.t + "</button>";
    }).join("");
    host.onclick = function (e) {
      var b = e.target.closest("[data-k]");
      if (!b) return;
      Array.prototype.forEach.call(host.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      alElegir(b.getAttribute("data-k"));
    };
  };

  // Deslizador con etiqueta y valor: devuelve { el, set(v), get() }
  //   o = { et: "texto o HTML", min, max, step, val, fmt: function(v) -> texto, on: function(v) }
  U.slider = function (host, o) {
    var lab = document.createElement("label");
    lab.innerHTML = (o.et ? '<span class="sl-et">' + o.et + "</span> " : "") + '<input type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || "any") + '" value="' + o.val + '" aria-label="' + B.esc(String(o.etq || o.et || "Valor").replace(/<[^>]+>/g, "")) + '"> <span class="mv sl-v"></span>';
    host.appendChild(lab);
    var inp = lab.querySelector("input"), v = lab.querySelector(".sl-v");
    function pinta() { v.textContent = o.fmt ? o.fmt(parseFloat(inp.value)) : B.fmt(parseFloat(inp.value), 2); }
    inp.addEventListener("input", function () { pinta(); if (o.on) o.on(parseFloat(inp.value)); });
    pinta();
    return { el: lab, input: inp, get: function () { return parseFloat(inp.value); }, set: function (x) { inp.value = x; pinta(); } };
  };

  // Barra de controles <div class="ctl"> dentro de un contenedor
  U.ctl = function (host) { var d = document.createElement("div"); d.className = "ctl"; host.appendChild(d); return d; };

  // Botón normal
  U.boton = function (host, texto, alClic, clase) {
    var b = document.createElement("button");
    b.type = "button"; b.className = clase || "chip-btn"; b.innerHTML = texto;
    b.addEventListener("click", alClic); host.appendChild(b); return b;
  };

  // Bucle de animación con reproducir/pausar/reiniciar. paso(t, dt) recibe segundos simulados.
  //   Se detiene solo si la actividad no se ve (tema plegado o pestaña oculta).
  U.animar = function (host, paso, o) {
    o = o || {};
    var st = { t: 0, corre: !!o.auto, vel: 1, ultimo: null }, barra = document.createElement("div");
    barra.className = "ctl an-barra";
    barra.innerHTML = '<button type="button" class="chip-btn" data-p>' + (st.corre ? "❚❚ Pausa" : "▶ Reproducir") + '</button><button type="button" class="chip-btn" data-r>↺ Reiniciar</button>';
    host.appendChild(barra);
    var bp = barra.querySelector("[data-p]"), br = barra.querySelector("[data-r]");
    function etiqueta() { bp.textContent = st.corre ? "❚❚ Pausa" : "▶ Reproducir"; }
    bp.addEventListener("click", function () { st.corre = !st.corre; st.ultimo = null; etiqueta(); });
    br.addEventListener("click", function () { st.t = 0; st.ultimo = null; paso(0, 0, true); });
    function bucle(ts) {
      if (!host.isConnected) return;
      if (st.corre && host.offsetParent !== null && !document.hidden) {
        if (st.ultimo === null) st.ultimo = ts;
        var dt = Math.min(0.05, (ts - st.ultimo) / 1000) * st.vel; st.ultimo = ts;
        st.t += dt;
        if (paso(st.t, dt, false) === false) { st.corre = false; etiqueta(); }
      } else st.ultimo = null;
      requestAnimationFrame(bucle);
    }
    requestAnimationFrame(bucle);
    paso(0, 0, true);
    st.barra = barra; st.reproducir = function () { st.corre = true; st.ultimo = null; etiqueta(); };
    return st;
  };

  // Ecuación de recta "y = mx + n" bien escrita
  U.recta = function (m, n) {
    var mm = Math.abs(m) < 5e-3 ? 0 : m, nn = Math.abs(n) < 5e-3 ? 0 : n, s = "y = ";
    if (mm === 0) return s + B.fmt(nn, 2);
    s += (mm === 1 ? "" : mm === -1 ? "−" : B.fmt(mm, 2)) + "x";
    if (nn !== 0) s += (nn > 0 ? " + " : " − ") + B.fmt(Math.abs(nn), 2);
    return s;
  };

  U.sup = function (n) {
    var m = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return String(n).split("").map(function (c) { return m[c] || c; }).join("");
  };
  U.sub = function (n) {
    var m = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
    return String(n).split("").map(function (c) { return m[c] || c; }).join("");
  };
  // 6,02·10²³ con exponente real
  U.cient = function (x, d) {
    if (x === 0 || !isFinite(x)) return B.fmt(x, d == null ? 2 : d);
    var e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    if (e >= -2 && e <= 3) return B.fmt(x, d == null ? 3 : d);
    return B.fmt(m, d == null ? 2 : d) + "·10" + U.sup(e);
  };

  // Dibuja un vector (flecha) en un Plot
  U.flecha = function (g, x0, y0, x1, y1, o) {
    o = o || {};
    var l = g.segmento(x0, y0, x1, y1, { clase: o.clase || "c-pen", capa: o.capa });
    l.setAttribute("stroke-width", o.grosor || 3);
    var a = Math.atan2(g.py(y1) - g.py(y0), g.px(x1) - g.px(x0)), px = g.px(x1), py = g.py(y1), s = o.punta || 10;
    var d = "M" + px + " " + py + "L" + (px - s * Math.cos(a - 0.4)) + " " + (py - s * Math.sin(a - 0.4)) + "L" + (px - s * Math.cos(a + 0.4)) + " " + (py - s * Math.sin(a + 0.4)) + "Z";
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d); p.setAttribute("class", "p-punta " + (o.clase || "c-pen"));
    (g.capa({ capa: o.capa })).appendChild(p);
    return l;
  };
})(window);

/* ============================================================
   Bachi para Firu · actividades interactivas genéricas
   test · ordenar · emparejar · tarjetas · línea del tiempo · clase
   Cada una se usa desde el HTML de un tema con:
     <div data-w="quiz" data-ref="asignatura/tema/clave"></div>
   y sus datos viven en el archivo de la asignatura.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var reducido = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animación suave de un valor numérico (si el usuario prefiere menos movimiento, salta)
  B.anima = function (de, a, ms, cb) {
    if (reducido || ms <= 0) { cb(a); return function () {}; }
    var t0 = null, vivo = true;
    function paso(t) {
      if (!vivo) return;
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      cb(de + (a - de) * e);
      if (k < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
    return function () { vivo = false; };
  };

  function mensajeNota(pct) {
    return pct >= 90 ? "¡Dominado! Este bloque lo tienes." : pct >= 60 ? "Bien. Repasa lo que has fallado y repítelo." : "Todavía flojea: vuelve a leer el apartado y prueba otra vez.";
  }

  // ============================================================
  // TEST con explicación de cada respuesta
  //   { titulo, intro, preguntas: [{ q, op: [...], ok: índice, porque, fijo? }] }
  // ============================================================
  B.w.quiz = function (host, args, d, ref) {
    var cuerpo = B.caja(host, "Autocomprobación", d.titulo);
    var clave = "quiz:" + ref;

    function pintar() {
      var estado = d.preguntas.map(function (p) {
        var idx = p.op.map(function (_, i) { return i; });
        return { orden: p.fijo ? idx : B.barajar(idx), hecho: false, bien: false };
      });
      var mejor = B.ls.get(clave, null);
      cuerpo.innerHTML = (d.intro ? '<p class="w-intro">' + d.intro + "</p>" : "") +
        '<div class="qz">' + d.preguntas.map(function (p, qi) {
          return '<fieldset class="qz-p" data-q="' + qi + '"><legend><span class="qz-n">' + (qi + 1) + "</span>" + p.q + "</legend>" +
            '<div class="qz-ops">' + estado[qi].orden.map(function (oi) {
              return '<button type="button" class="qz-op" data-i="' + oi + '">' + p.op[oi] + "</button>";
            }).join("") + '</div><div class="qz-por" hidden></div></fieldset>';
        }).join("") + '</div><div class="qz-fin" hidden></div>' +
        (mejor ? '<p class="w-mejor">Tu mejor resultado: ' + mejor.a + " de " + mejor.n + "</p>" : "");

      cuerpo.querySelector(".qz").addEventListener("click", function (e) {
        var b = e.target.closest(".qz-op");
        if (!b) return;
        var fs = b.closest(".qz-p"), qi = +fs.getAttribute("data-q"), p = d.preguntas[qi];
        if (estado[qi].hecho) return;
        estado[qi].hecho = true;
        var elegida = +b.getAttribute("data-i");
        estado[qi].bien = elegida === p.ok;
        Array.prototype.forEach.call(fs.querySelectorAll(".qz-op"), function (o) {
          var i = +o.getAttribute("data-i");
          o.disabled = true;
          if (i === p.ok) o.classList.add("ok");
          else if (i === elegida) o.classList.add("mal");
        });
        var por = fs.querySelector(".qz-por");
        por.hidden = false;
        por.className = "qz-por " + (estado[qi].bien ? "ok" : "mal");
        por.innerHTML = (estado[qi].bien ? "<b>✓ Correcto.</b> " : "<b>✗ No.</b> ") + (p.porque || "");
        if (estado.every(function (s) { return s.hecho; })) {
          var a = estado.filter(function (s) { return s.bien; }).length, n = estado.length, pct = Math.round(100 * a / n);
          var fin = cuerpo.querySelector(".qz-fin");
          fin.hidden = false;
          fin.innerHTML = "<b>" + a + " de " + n + "</b> · " + mensajeNota(pct) + ' <button type="button" class="chip-btn" data-rep>Repetir con otro orden</button>';
          var m = B.ls.get(clave, null);
          if (!m || a > m.a) B.ls.set(clave, { a: a, n: n });
          fin.querySelector("[data-rep]").addEventListener("click", pintar);
          fin.scrollIntoView({ block: "nearest", behavior: reducido ? "auto" : "smooth" });
        }
      });
    }
    pintar();
  };

  // ============================================================
  // ORDENAR (cronologías, procesos, pasos de un método)
  //   { titulo, consigna, items: [{ t, nota }] }  ← en el orden CORRECTO
  // ============================================================
  B.w.orden = function (host, args, d) {
    var cuerpo = B.caja(host, "Ordena", d.titulo);
    function pintar() {
      var idx = B.barajar(d.items.map(function (_, i) { return i; }));
      if (idx.every(function (v, i) { return v === i; })) idx.reverse();
      cuerpo.innerHTML = '<p class="w-intro">' + (d.consigna || "Pon los elementos en el orden correcto.") + "</p>" +
        '<ol class="or-lista">' + idx.map(function (k) {
          return '<li class="or-it" draggable="true" data-k="' + k + '"><span class="or-n"></span><span class="or-t">' + d.items[k].t + '</span><span class="or-nota"></span>' +
            '<span class="or-b"><button type="button" class="or-mv" data-d="-1" aria-label="Subir">↑</button><button type="button" class="or-mv" data-d="1" aria-label="Bajar">↓</button></span></li>';
        }).join("") + '</ol><div class="or-acc"><button type="button" class="btn-comprobar" data-ok>Comprobar orden</button>' +
        '<button type="button" class="chip-btn" data-bar>Barajar de nuevo</button></div><p class="or-msg" aria-live="polite"></p>';
      var lista = cuerpo.querySelector(".or-lista"), msg = cuerpo.querySelector(".or-msg"), arrastrado = null;

      function numerar() { Array.prototype.forEach.call(lista.children, function (li, i) { li.querySelector(".or-n").textContent = i + 1; }); }
      function limpiarMarcas() { Array.prototype.forEach.call(lista.children, function (li) { li.classList.remove("ok", "mal"); li.querySelector(".or-nota").textContent = ""; }); msg.textContent = ""; }
      numerar();

      lista.addEventListener("click", function (e) {
        var mv = e.target.closest(".or-mv");
        if (!mv) return;
        var li = mv.closest(".or-it"), dir = +mv.getAttribute("data-d");
        if (dir < 0 && li.previousElementSibling) lista.insertBefore(li, li.previousElementSibling);
        else if (dir > 0 && li.nextElementSibling) lista.insertBefore(li.nextElementSibling, li);
        limpiarMarcas(); numerar(); mv.focus();
      });
      lista.addEventListener("dragstart", function (e) { arrastrado = e.target.closest(".or-it"); if (arrastrado) { arrastrado.classList.add("arrastrando"); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", ""); } catch (x) {} } });
      lista.addEventListener("dragover", function (e) {
        e.preventDefault();
        var li = e.target.closest(".or-it");
        if (!arrastrado || !li || li === arrastrado) return;
        var r = li.getBoundingClientRect();
        lista.insertBefore(arrastrado, e.clientY > r.top + r.height / 2 ? li.nextSibling : li);
      });
      lista.addEventListener("dragend", function () { if (arrastrado) arrastrado.classList.remove("arrastrando"); arrastrado = null; limpiarMarcas(); numerar(); });

      cuerpo.querySelector("[data-ok]").addEventListener("click", function () {
        var bien = 0;
        Array.prototype.forEach.call(lista.children, function (li, i) {
          var k = +li.getAttribute("data-k"), ok = k === i;
          li.classList.toggle("ok", ok); li.classList.toggle("mal", !ok);
          if (ok) bien++;
          li.querySelector(".or-nota").textContent = d.items[k].nota || "";
        });
        msg.className = "or-msg " + (bien === d.items.length ? "ok" : "mal");
        msg.textContent = bien === d.items.length ? "✓ ¡Orden perfecto!" : bien + " de " + d.items.length + " en su sitio. Mueve las que están en rojo.";
      });
      cuerpo.querySelector("[data-bar]").addEventListener("click", pintar);
    }
    pintar();
  };

  // ============================================================
  // EMPAREJAR (autor ↔ idea, término ↔ definición, hecho ↔ fecha)
  //   { titulo, consigna, pares: [[izquierda, derecha], ...] }
  // ============================================================
  B.w.emparejar = function (host, args, d) {
    var cuerpo = B.caja(host, "Empareja", d.titulo);
    var clave = "emp:" + (host.getAttribute("data-ref") || d.titulo);
    function pintar() {
      var n = d.pares.length, izq = B.barajar(d.pares.map(function (_, i) { return i; })), der = B.barajar(d.pares.map(function (_, i) { return i; }));
      var sel = null, aciertos = 0, errores = 0, mejor = B.ls.get(clave, null);
      function col(lado, orden, k) {
        return '<div class="em-col">' + orden.map(function (i) { return '<button type="button" class="em-it" data-l="' + lado + '" data-k="' + i + '">' + d.pares[i][k] + "</button>"; }).join("") + "</div>";
      }
      cuerpo.innerHTML = '<p class="w-intro">' + (d.consigna || "Toca un elemento de la izquierda y su pareja de la derecha.") + "</p>" +
        '<div class="em">' + col("a", izq, 0) + col("b", der, 1) + '</div><p class="em-msg" aria-live="polite">0 de ' + n + " parejas" + (mejor != null ? " · récord: " + mejor + (mejor === 1 ? " error" : " errores") : "") + "</p>";
      var msg = cuerpo.querySelector(".em-msg");
      cuerpo.querySelector(".em").addEventListener("click", function (e) {
        var b = e.target.closest(".em-it");
        if (!b || b.disabled) return;
        if (b.getAttribute("data-l") === "a") {
          if (sel) sel.classList.remove("sel");
          sel = (sel === b) ? null : b;
          if (sel) sel.classList.add("sel");
          return;
        }
        if (!sel) { msg.textContent = "Primero toca un elemento de la izquierda."; return; }
        if (sel.getAttribute("data-k") === b.getAttribute("data-k")) {
          sel.classList.remove("sel"); sel.classList.add("ok"); b.classList.add("ok"); sel.disabled = b.disabled = true; sel = null; aciertos++;
          msg.textContent = aciertos + " de " + n + " parejas" + (errores ? " · " + errores + (errores === 1 ? " error" : " errores") : "");
          if (aciertos === n) {
            msg.className = "em-msg ok";
            msg.innerHTML = "✓ ¡Completado con " + errores + (errores === 1 ? " error" : " errores") + '! <button type="button" class="chip-btn" data-rep>Otra vez</button>';
            if (mejor == null || errores < mejor) B.ls.set(clave, errores);
            msg.querySelector("[data-rep]").addEventListener("click", pintar);
          }
        } else {
          errores++;
          var a = sel; b.classList.add("mal"); a.classList.add("mal");
          setTimeout(function () { b.classList.remove("mal"); a.classList.remove("mal", "sel"); }, 550);
          sel = null;
          msg.textContent = aciertos + " de " + n + " parejas · " + errores + (errores === 1 ? " error" : " errores");
        }
      });
    }
    pintar();
  };

  // ============================================================
  // CLASIFICAR (causa / consecuencia, autor / idea, rasgos de dos corrientes…)
  //   { titulo, consigna, categorias: ["Causas", "Consecuencias"],
  //     items: [{ t: "texto", c: índice de la categoría correcta }] }
  // Se toca un elemento y después la categoría a la que pertenece.
  // ============================================================
  B.w.clasificar = function (host, args, d) {
    var cuerpo = B.caja(host, "Clasifica", d.titulo);
    function pintar() {
      var orden = B.barajar(d.items.map(function (_, i) { return i; }));
      var lugar = {}, sel = null, comprobado = false;
      cuerpo.innerHTML = '<p class="w-intro">' + (d.consigna || "Toca un elemento y después la categoría a la que pertenece.") + "</p>" +
        '<div class="cf-pool" aria-label="Elementos por clasificar"></div><div class="cf-cats">' + d.categorias.map(function (c, j) {
          return '<div class="cf-cat"><button type="button" class="cf-cat-b" data-c="' + j + '">' + c + '</button><div class="cf-lista" data-l="' + j + '"></div></div>';
        }).join("") + '</div><div class="or-acc"><button type="button" class="btn-comprobar" data-ok>Comprobar</button><button type="button" class="chip-btn" data-rei>Empezar de nuevo</button></div><p class="or-msg" aria-live="polite"></p>';
      var pool = cuerpo.querySelector(".cf-pool"), msg = cuerpo.querySelector(".or-msg");
      function chip(i, estado) {
        return '<button type="button" class="cf-it' + (sel === i ? " sel" : "") + (estado ? " " + estado : "") + '" data-i="' + i + '">' + d.items[i].t + "</button>";
      }
      function repinta() {
        pool.innerHTML = orden.filter(function (i) { return lugar[i] == null; }).map(function (i) { return chip(i); }).join("") || '<span class="hint">¡Todo clasificado! Pulsa «Comprobar».</span>';
        d.categorias.forEach(function (_, j) {
          cuerpo.querySelector('[data-l="' + j + '"]').innerHTML = orden.filter(function (i) { return lugar[i] === j; }).map(function (i) {
            return chip(i, comprobado ? (d.items[i].c === j ? "ok" : "mal") : "");
          }).join("");
        });
      }
      cuerpo.addEventListener("click", function (e) {
        var it = e.target.closest(".cf-it"), cat = e.target.closest(".cf-cat-b, .cf-lista");
        if (it) {
          var i = +it.getAttribute("data-i");
          if (lugar[i] != null) { delete lugar[i]; sel = i; } else sel = (sel === i ? null : i);
          comprobado = false; msg.textContent = ""; repinta(); return;
        }
        if (cat && sel != null) {
          lugar[sel] = +(cat.getAttribute("data-c") != null ? cat.getAttribute("data-c") : cat.getAttribute("data-l"));
          sel = null; comprobado = false; msg.textContent = ""; repinta();
        }
      });
      cuerpo.querySelector("[data-ok]").addEventListener("click", function () {
        var n = Object.keys(lugar).length;
        if (n < d.items.length) { msg.className = "or-msg mal"; msg.textContent = "Te faltan " + (d.items.length - n) + " por clasificar."; return; }
        var bien = d.items.filter(function (it, i) { return lugar[i] === it.c; }).length;
        comprobado = true; repinta();
        msg.className = "or-msg " + (bien === d.items.length ? "ok" : "mal");
        msg.textContent = bien === d.items.length ? "✓ ¡Todo correcto!" : bien + " de " + d.items.length + " bien. Toca los marcados en rojo para moverlos.";
      });
      cuerpo.querySelector("[data-rei]").addEventListener("click", pintar);
      repinta();
    }
    pintar();
  };

  // ============================================================
  // TARJETAS de repaso (conceptos, autores, fechas, definiciones)
  //   { titulo, cartas: [{ a: anverso, b: reverso }] }
  // ============================================================
  B.w.tarjetas = function (host, args, d, ref) {
    var cuerpo = B.caja(host, "Tarjetas de repaso", d.titulo);
    var clave = "tj:" + ref;
    var sabidas = B.ls.get(clave, []);
    var cola, volteada = false;

    function reiniciaCola() {
      cola = [];
      d.cartas.forEach(function (c, i) { if (sabidas.indexOf(c.a) < 0) cola.push(i); });
    }
    function pintar() {
      var total = d.cartas.length, hechas = total - cola.length;
      if (!cola.length) {
        cuerpo.innerHTML = '<div class="tj-fin"><b>✓ Has dominado las ' + total + ' tarjetas.</b><p>Vuelve a repasarlas dentro de unos días: lo que se repasa en intervalos se queda.</p><button type="button" class="chip-btn" data-reset>Empezar de cero</button></div>';
        cuerpo.querySelector("[data-reset]").addEventListener("click", function () { sabidas = []; B.ls.set(clave, sabidas); reiniciaCola(); pintar(); });
        return;
      }
      var c = d.cartas[cola[0]];
      cuerpo.innerHTML = '<button type="button" class="tj-carta' + (volteada ? " vuelta" : "") + '" aria-live="polite"><span class="tj-lado">' + (volteada ? "Respuesta" : "Pregunta") + '</span><span class="tj-txt">' + (volteada ? c.b : c.a) + '</span><span class="tj-hint">' + (volteada ? "" : "toca para ver la respuesta") + "</span></button>" +
        '<div class="tj-acc"' + (volteada ? "" : " hidden") + '><button type="button" class="chip-btn" data-a="rep">Repasar luego ↻</button><button type="button" class="btn-comprobar" data-a="ok">La sabía ✓</button></div>' +
        '<div class="tj-barra"><span style="width:' + Math.round(100 * hechas / total) + '%"></span></div><p class="tj-prog">Dominadas ' + hechas + " de " + total + "</p>";
      cuerpo.querySelector(".tj-carta").addEventListener("click", function () { volteada = !volteada; pintar(); });
      Array.prototype.forEach.call(cuerpo.querySelectorAll("[data-a]"), function (b) {
        b.addEventListener("click", function () {
          var i = cola.shift();
          if (b.getAttribute("data-a") === "ok") { sabidas.push(d.cartas[i].a); B.ls.set(clave, sabidas); } else cola.push(i);
          volteada = false; pintar();
        });
      });
    }
    reiniciaCola(); pintar();
  };

  // ============================================================
  // LÍNEA DEL TIEMPO desplazable, con detalle al tocar un hecho
  //   { desde, hasta, tipos: { clave: ["Nombre", "color css"] },
  //     eventos: [{ a: año, m: "mes", t: "título corto", tipo, d: "explicación" }] }
  // ============================================================
  B.w.linea = function (host, args, d) {
    var cuerpo = B.caja(host, "Línea del tiempo", d.titulo);
    var PPA = 78, ANCHO = 142, ALTO_SLOT = 70, maxFila = 1;
    var total = (d.hasta - d.desde + 1) * PPA + 60;
    var ev = d.eventos.slice().sort(function (a, b) { return (a.a + (a.f || 0)) - (b.a + (b.f || 0)); });
    var slots = [-1, 1, -2, 2, -3, 3], ultimo = {};
    var leyenda = Object.keys(d.tipos).map(function (k) { return '<span class="tl-ley"><i style="background:' + d.tipos[k][1] + '"></i>' + d.tipos[k][0] + "</span>"; }).join("");
    var marcas = "";
    for (var y = d.desde; y <= d.hasta; y++) {
      marcas += '<span class="tl-año' + (y % 5 === 0 ? " grande" : "") + '" style="left:' + ((y - d.desde) * PPA + 30) + 'px">' + (y % 5 === 0 || y === d.desde || y === d.hasta ? y : "") + "</span>";
    }
    var piezas = ev.map(function (e, i) {
      var x = (e.a + (e.f || 0) - d.desde) * PPA + 30, slot = null;
      for (var s = 0; s < slots.length; s++) { if ((ultimo[slots[s]] == null) || x - ultimo[slots[s]] > ANCHO + 8) { slot = slots[s]; break; } }
      if (slot == null) slot = slots[i % slots.length];
      ultimo[slot] = x;
      var arriba = slot < 0, alto = Math.abs(slot) * ALTO_SLOT;
      maxFila = Math.max(maxFila, Math.abs(slot));
      var color = d.tipos[e.tipo] ? d.tipos[e.tipo][1] : "var(--pen)";
      return '<span class="tl-tallo ' + (arriba ? "arriba" : "abajo") + '" style="left:' + x + "px;height:" + (alto - 6) + 'px;background:' + color + '"></span>' +
        '<button type="button" class="tl-ev ' + (arriba ? "arriba" : "abajo") + '" data-i="' + i + '" style="left:' + (x - ANCHO / 2) + "px;" + (arriba ? "bottom" : "top") + ":calc(50% + " + (alto - 6) + "px);--c:" + color + '">' +
        '<b>' + e.a + (e.m ? " · " + e.m : "") + "</b><span>" + e.t + "</span></button>" +
        '<span class="tl-punto" style="left:' + x + "px;background:" + color + '"></span>';
    }).join("");
    cuerpo.innerHTML = '<div class="tl-leyenda">' + leyenda + '</div><div class="tl-scroll" tabindex="0" aria-label="Línea del tiempo, desplázate hacia los lados"><div class="tl-pista" style="width:' + total + "px;height:" + (2 * (maxFila * ALTO_SLOT + 56)) + 'px"><span class="tl-eje"></span>' + marcas + piezas +
      '</div></div><div class="tl-det" aria-live="polite"><p class="hand-note">toca un hecho para ver qué pasó y por qué importa</p></div>';
    var det = cuerpo.querySelector(".tl-det"), sc = cuerpo.querySelector(".tl-scroll"), previo = null;
    cuerpo.querySelector(".tl-pista").addEventListener("click", function (e) {
      var b = e.target.closest(".tl-ev");
      if (!b) return;
      if (previo) previo.classList.remove("sel");
      b.classList.add("sel"); previo = b;
      var x = ev[+b.getAttribute("data-i")];
      det.innerHTML = '<h5><span class="tl-det-año">' + x.a + (x.m ? " · " + x.m : "") + "</span> " + x.t + "</h5><p>" + x.d + "</p>";
    });
    // empieza centrado en el primer hecho, para que se vea que se desliza
    sc.scrollLeft = 0;
  };

  // ============================================================
  // CLASE INTERACTIVA (el escenario fijo cambia al avanzar por los pasos)
  //   { titulo, intro, montar(contenedor) → { set(estado) }, pasos: [{ h, html, estado }] }
  // ============================================================
  B.w.clase = function (host, args, d) {
    host.classList.add("w", "w-ancho");
    var lb = host.closest(".lesson-block");
    if (lb) lb.classList.add("ancho");
    host.innerHTML = '<div class="w-cab"><span class="w-tag">Clase interactiva</span><b class="w-titulo">' + d.titulo + "</b></div>" +
      (d.intro ? '<p class="w-intro">' + d.intro + "</p>" : "") +
      '<div class="cl"><div class="cl-escena"><div class="cl-marco"><div class="cl-lienzo"></div>' +
      '<div class="cl-pie"><button type="button" class="cl-nav" data-d="-1" aria-label="Paso anterior">‹</button><span class="cl-paso-n"></span>' +
      '<button type="button" class="cl-nav" data-d="1" aria-label="Paso siguiente">›</button></div></div></div>' +
      '<div class="cl-pasos">' + d.pasos.map(function (p, i) {
        return '<section class="cl-paso" data-i="' + i + '"><h4>' + p.h + "</h4>" + p.html + "</section>";
      }).join("") + "</div></div>";
    var api = d.montar(host.querySelector(".cl-lienzo"));
    var pasos = host.querySelectorAll(".cl-paso"), n = pasos.length, actual = -1;
    var rotulo = host.querySelector(".cl-paso-n");

    function ir(i) {
      if (i === actual) return;
      actual = i;
      Array.prototype.forEach.call(pasos, function (p, k) { p.classList.toggle("activo", k === i); });
      rotulo.textContent = "Paso " + (i + 1) + " de " + n;
      api.set(d.pasos[i].estado || {}, i);
    }
    ir(0);
    if ("IntersectionObserver" in global) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) { if (en.isIntersecting) ir(+en.target.getAttribute("data-i")); });
      }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
      Array.prototype.forEach.call(pasos, function (p) { obs.observe(p); });
    }
    host.querySelector(".cl-pie").addEventListener("click", function (e) {
      var b = e.target.closest(".cl-nav");
      if (!b) return;
      var j = Math.max(0, Math.min(n - 1, actual + (+b.getAttribute("data-d"))));
      pasos[j].scrollIntoView({ block: "center", behavior: reducido ? "auto" : "smooth" });
      ir(j);
    });
  };

})(window);

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

/* ============================================================
   Bachi para Firu · laboratorio de análisis (Matemáticas)
   secante · tangente · f y f′ enlazadas · optimización · entrenador de derivadas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, Mate = B.Mate, fmt = B.fmt;
  B.lab = B.lab || {};

  // ---------- funciones de demostración ----------
  var FUN = {
    par: { t: "x² − 2x + 3", f: function (x) { return x * x - 2 * x + 3; }, df: function (x) { return 2 * x - 2; }, r: [-1.5, 5.5, -1.5, 12], a: 1, b: 4 },
    cub: { t: "x³ − 3x", f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, r: [-3, 3, -5, 5], a: -1.5, b: 1.5 },
    sen: { t: "sen x", f: Math.sin, df: Math.cos, r: [-4.5, 4.5, -2, 2], a: -1, b: 2 },
    exp: { t: "eˣ", f: Math.exp, df: Math.exp, r: [-3, 3, -1.5, 12], a: -1, b: 1.5 }
  };
  var ORDEN_FUN = ["par", "cub", "sen", "exp"];

  function fichas(host, opciones, actual, alElegir) {
    host.innerHTML = opciones.map(function (o) {
      return '<button type="button" class="chip-btn' + (o.k === actual ? " on" : "") + '" data-k="' + o.k + '" aria-pressed="' + (o.k === actual) + '">' + o.t + "</button>";
    }).join("");
    host.onclick = function (e) {
      var b = e.target.closest("[data-k]");
      if (!b) return;
      Array.prototype.forEach.call(host.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      alElegir(b.getAttribute("data-k"));
    };
  }

  function lec(rotulo, valor, clase) { return '<div class="lec ' + (clase || "") + '"><small>' + rotulo + "</small><b>" + valor + "</b></div>"; }

  function recta(m, n) {
    var mm = Math.abs(m) < 5e-3 ? 0 : m, nn = Math.abs(n) < 5e-3 ? 0 : n, s = "y = ";
    if (mm === 0) return s + fmt(nn, 2);
    s += (mm === 1 ? "" : mm === -1 ? "−" : fmt(mm, 2)) + "x";
    if (nn !== 0) s += (nn > 0 ? " + " : " − ") + fmt(Math.abs(nn), 2);
    return s;
  }

  function opcionesFun() { return ORDEN_FUN.map(function (k) { return { k: k, t: "f(x) = " + FUN[k].t }; }); }

  // ============================================================
  // SECANTE: arrastra A y B; la pendiente de la secante es la TVM
  // ============================================================
  B.w.secante = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Secante y tasa de variación media");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot"></div><div class="lectura"></div>' +
      '<p class="hint">Arrastra los puntos A y B por la curva (o usa las flechas del teclado). La pendiente de la secante es la TVM.</p>';
    var elPlot = cuerpo.querySelector(".w-plot"), elLec = cuerpo.querySelector(".lectura");
    var st = { k: "par", a: 1, b: 4 }, g, hA, hB;

    function limita(x) { var F = FUN[st.k]; return Math.max(F.r[0] + 0.1, Math.min(F.r[1] - 0.1, x)); }

    function pintar() {
      var F = FUN[st.k], a = st.a, b = st.b, fa = F.f(a), fb = F.f(b), dx = b - a, dy = fb - fa;
      g.limpiar();
      if (Math.abs(dx) > 1e-6) {
        g.recta(dy / dx, a, fa, { clase: "c-red" });
        g.segmento(a, fa, b, fa, { clase: "c-faint", dash: "5 4" });
        g.segmento(b, fa, b, fb, { clase: "c-faint", dash: "5 4" });
        g.texto((a + b) / 2, fa, "Δx = " + fmt(dx, 2), { dy: 17, ancla: "middle", clase: "faint" });
        g.texto(b, (fa + fb) / 2, "Δy = " + fmt(dy, 2), { dx: 8, clase: "faint" });
      }
      g.mover(hA, a, fa); g.mover(hB, b, fb);
      g.texto(a, fa, "A", { dx: -16, dy: -10, clase: "pen" });
      g.texto(b, fb, "B", { dx: 10, dy: -10, clase: "red" });
      elLec.innerHTML = lec("a → b", fmt(a, 2) + " → " + fmt(b, 2)) + lec("f(a) → f(b)", fmt(fa, 2) + " → " + fmt(fb, 2)) +
        lec("Δy ÷ Δx", Math.abs(dx) > 1e-6 ? fmt(dy, 2) + " ÷ " + fmt(dx, 2) : "—") +
        lec("TVM = pendiente", Math.abs(dx) > 1e-6 ? fmt(dy / dx, 3) : "A = B: sin secante", "red");
    }

    function montar() {
      var F = FUN[st.k];
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: F.r[0], xmax: F.r[1], ymin: F.r[2], ymax: F.r[3], w: 640, h: 340, etiqueta: "Gráfica de f(x) = " + F.t + " con una secante" });
      g.curva(F.f, { capa: "fijo" });
      hA = g.punto(0, 0, { capa: "top", r: 9, clase: "c-pen" });
      hB = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      var paso = (F.r[1] - F.r[0]) / 80;
      g.arrastrar(hA, function (x) { st.a = limita(x); pintar(); }, { get: function () { return st.a; }, paso: paso, etiqueta: "Punto A" });
      g.arrastrar(hB, function (x) { st.b = limita(x); pintar(); }, { get: function () { return st.b; }, paso: paso, etiqueta: "Punto B" });
      st.a = F.a; st.b = F.b;
      pintar();
    }
    fichas(cuerpo.querySelector(".chips"), opcionesFun(), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // TANGENTE: la derivada en un punto es la pendiente de la tangente
  // ============================================================
  B.w.tangente = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La derivada es la pendiente de la tangente");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot"></div>' +
      '<div class="ctl"><label>Punto <span class="mv">a</span> <input type="range" step="0.01" aria-label="Posición del punto a"> <span class="mv" data-av></span></label></div>' +
      '<div class="lectura"></div><p class="w-pie"></p>';
    var elPlot = cuerpo.querySelector(".w-plot"), elLec = cuerpo.querySelector(".lectura"), rng = cuerpo.querySelector("input"), av = cuerpo.querySelector("[data-av]"), pie = cuerpo.querySelector(".w-pie");
    var st = { k: "par", a: 2 }, g, h;

    function pintar() {
      var F = FUN[st.k], a = st.a, fa = F.f(a), m = F.df(a), n = fa - m * a;
      g.limpiar();
      g.recta(m, a, fa, { clase: m > 0.005 ? "c-ok" : m < -0.005 ? "c-red" : "c-ink" });
      g.mover(h, a, fa);
      g.texto(a, fa, "(" + fmt(a, 2) + ", " + fmt(fa, 2) + ")", { dx: 12, dy: -12, clase: "pen" });
      av.textContent = fmt(a, 2); rng.value = a;
      elLec.innerHTML = lec("f(a)", fmt(fa, 3)) + lec("f′(a) = pendiente", fmt(m, 3), m > 0.005 ? "ok" : m < -0.005 ? "red" : "") + lec("recta tangente", recta(m, n), "pen");
      pie.textContent = m > 0.005 ? "f′(a) > 0: la tangente sube, así que f crece en este punto." : m < -0.005 ? "f′(a) < 0: la tangente baja, así que f decrece en este punto." : "f′(a) = 0: la tangente es horizontal. Posible máximo o mínimo.";
    }

    function montar() {
      var F = FUN[st.k];
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: F.r[0], xmax: F.r[1], ymin: F.r[2], ymax: F.r[3], w: 640, h: 340, etiqueta: "Gráfica de f(x) = " + F.t + " con su tangente" });
      g.curva(F.f, { capa: "fijo" });
      h = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      g.arrastrar(h, function (x) { st.a = Math.max(F.r[0] + 0.05, Math.min(F.r[1] - 0.05, x)); pintar(); }, { get: function () { return st.a; }, paso: (F.r[1] - F.r[0]) / 100, etiqueta: "Punto de tangencia" });
      rng.min = F.r[0] + 0.05; rng.max = F.r[1] - 0.05;
      st.a = st.k === "par" ? 2 : st.k === "cub" ? 1.5 : st.k === "sen" ? 0.8 : 0.5;
      pintar();
    }
    rng.addEventListener("input", function () { st.a = parseFloat(rng.value); pintar(); });
    fichas(cuerpo.querySelector(".chips"), opcionesFun(), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // f y f′ ENLAZADAS: el signo de la derivada manda sobre la gráfica
  // ============================================================
  var PRE = {
    c3: { t: "x³ − 3x", f: function (x) { return x * x * x - 3 * x; }, df: function (x) { return 3 * x * x - 3; }, crit: [-1, 1], x: [-2.6, 2.6], yf: [-4.5, 4.5], yd: [-4, 8] },
    pa: { t: "x² − 4x + 3", f: function (x) { return x * x - 4 * x + 3; }, df: function (x) { return 2 * x - 4; }, crit: [2], x: [-1, 5], yf: [-2, 9], yd: [-7, 7] },
    c1: { t: "x³", f: function (x) { return x * x * x; }, df: function (x) { return 3 * x * x; }, crit: [0], x: [-2, 2], yf: [-8, 8], yd: [-2, 12] },
    c4: { t: "x⁴ − 2x²", f: function (x) { return Math.pow(x, 4) - 2 * x * x; }, df: function (x) { return 4 * x * x * x - 4 * x; }, crit: [-1, 0, 1], x: [-2, 2], yf: [-2, 8], yd: [-9, 9] },
    ex: { t: "x·e⁻ˣ", f: function (x) { return x * Math.exp(-x); }, df: function (x) { return (1 - x) * Math.exp(-x); }, crit: [1], x: [-1, 5], yf: [-3, 1], yd: [-1.5, 6] }
  };

  B.w.fprima = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Mira f y f′ a la vez");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot top"></div><div class="w-plot bot"></div>' +
      '<div class="ctl"><label>Punto <span class="mv">x</span> <input type="range" step="0.01" aria-label="Posición de x"> <span class="mv" data-av></span></label></div>' +
      '<div class="lectura"></div><div class="fp-tabla"></div>';
    var pTop = cuerpo.querySelector(".w-plot.top"), pBot = cuerpo.querySelector(".w-plot.bot"), elLec = cuerpo.querySelector(".lectura"), tabla = cuerpo.querySelector(".fp-tabla");
    var rng = cuerpo.querySelector("input"), av = cuerpo.querySelector("[data-av]");
    var st = { k: "c3", x: 0.5 }, g1, g2, h1;

    function intervalos(P) {
      var lim = [P.x[0]].concat(P.crit, [P.x[1]]), it = [];
      for (var i = 0; i < lim.length - 1; i++) it.push({ a: lim[i], b: lim[i + 1], s: P.df((lim[i] + lim[i + 1]) / 2) > 0 ? 1 : -1 });
      return it;
    }
    function nombreInt(it, i, n) { return "(" + (i === 0 ? "−∞" : fmt(it.a, 2)) + ", " + (i === n - 1 ? "+∞" : fmt(it.b, 2)) + ")"; }

    function pintarTabla(P) {
      var it = intervalos(P), n = it.length, concl = [];
      var fila1 = it.map(function (v) { return "<td>" + (v.s > 0 ? "+" : "−") + "</td>"; }).join("");
      var fila2 = it.map(function (v) { return "<td>" + (v.s > 0 ? "↗ crece" : "↘ decrece") + "</td>"; }).join("");
      P.crit.forEach(function (c, i) {
        var antes = it[i].s, despues = it[i + 1].s;
        concl.push(antes > 0 && despues < 0 ? "<b>x = " + fmt(c, 2) + "</b>: f′ pasa de + a − → <b>máximo relativo</b>, f(" + fmt(c, 2) + ") = " + fmt(P.f(c), 3) + "." :
          antes < 0 && despues > 0 ? "<b>x = " + fmt(c, 2) + "</b>: f′ pasa de − a + → <b>mínimo relativo</b>, f(" + fmt(c, 2) + ") = " + fmt(P.f(c), 3) + "." :
          "<b>x = " + fmt(c, 2) + "</b>: f′ = 0 pero <b>no cambia de signo</b> → no hay máximo ni mínimo.");
      });
      tabla.innerHTML = '<table class="lam-tabla"><thead><tr><th></th>' + it.map(function (v, i) { return "<th>" + nombreInt(v, i, n) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        "<tr><td>signo de f′</td>" + fila1 + "</tr><tr><td>f</td>" + fila2 + "</tr></tbody></table><p class=\"w-pie\">" + concl.join("<br>") + "</p>";
    }

    function pintar() {
      var P = PRE[st.k], x = st.x, fx = P.f(x), dx = P.df(x);
      g1.limpiar(); g2.limpiar();
      var it = intervalos(P);
      it.forEach(function (v) {
        g1.curva(P.f, { x0: v.a, x1: v.b, clase: v.s > 0 ? "c-ok" : "c-red" });
        g2.zona(P.df, v.a, v.b, { clase: v.s > 0 ? "z-ok" : "z-red" });
      });
      g2.curva(P.df, { clase: "c-ink" });
      P.crit.forEach(function (c, i) {
        var antes = it[i].s, despues = it[i + 1].s, et = antes > 0 && despues < 0 ? "máx" : antes < 0 && despues > 0 ? "mín" : "sin extremo";
        g1.punto(c, P.f(c), { r: 6, clase: et === "sin extremo" ? "c-faint" : "c-pen" });
        g1.texto(c, P.f(c), et, { dy: antes > 0 && despues < 0 ? -12 : 20, ancla: "middle", clase: et === "sin extremo" ? "faint" : "pen" });
        g2.punto(c, 0, { r: 5, clase: "c-pen" });
      });
      var w = (P.x[1] - P.x[0]) * 0.07;
      g1.segmento(x - w, fx - dx * w, x + w, fx + dx * w, { clase: "c-ink" });
      g1.mover(h1, x, fx);
      g2.vertical(x, { clase: "c-faint", dash: "4 4" });
      g2.punto(x, dx, { r: 6, clase: dx > 0 ? "c-ok" : "c-red" });
      g2.texto(x, dx, "f′ = " + fmt(dx, 2), { dx: 10, dy: dx >= 0 ? -10 : 18, clase: dx > 0 ? "ok" : "red" });
      av.textContent = fmt(x, 2); rng.value = x;
      elLec.innerHTML = lec("x", fmt(x, 2)) + lec("f(x)", fmt(fx, 3)) + lec("f′(x)", fmt(dx, 3), dx > 0.005 ? "ok" : dx < -0.005 ? "red" : "") +
        lec("f en este punto", dx > 0.005 ? "crece ↗" : dx < -0.005 ? "decrece ↘" : "tangente horizontal");
    }

    function montar() {
      var P = PRE[st.k];
      pTop.innerHTML = ""; pBot.innerHTML = "";
      g1 = new B.Plot(pTop, { xmin: P.x[0], xmax: P.x[1], ymin: P.yf[0], ymax: P.yf[1], w: 640, h: 260, ety: "f", etiqueta: "Gráfica de f(x) = " + P.t });
      g2 = new B.Plot(pBot, { xmin: P.x[0], xmax: P.x[1], ymin: P.yd[0], ymax: P.yd[1], w: 640, h: 190, ety: "f′", etiqueta: "Gráfica de la derivada de f" });
      h1 = g1.punto(0, 0, { capa: "top", r: 8, clase: "c-red" });
      g1.arrastrar(h1, function (x) { st.x = Math.max(P.x[0] + 0.02, Math.min(P.x[1] - 0.02, x)); pintar(); }, { get: function () { return st.x; }, paso: (P.x[1] - P.x[0]) / 100, etiqueta: "Punto x" });
      rng.min = P.x[0] + 0.02; rng.max = P.x[1] - 0.02;
      st.x = P.x[0] + (P.x[1] - P.x[0]) * 0.3;
      pintarTabla(P); pintar();
    }
    rng.addEventListener("input", function () { st.x = parseFloat(rng.value); pintar(); });
    fichas(cuerpo.querySelector(".chips"), Object.keys(PRE).map(function (k) { return { k: k, t: "f(x) = " + PRE[k].t }; }), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // OPTIMIZACIÓN: encuentra el óptimo a mano y compruébalo con la derivada
  // ============================================================
  var PROB = {
    rect: {
      t: "Rectángulo de perímetro 20 m", obj: "Área", un: "m²", max: true, x: [0, 10], yr: [0, 30], opt: 5, xn: "base x (m)",
      g: function (x) { return x * (10 - x); },
      datos: function (x) { return [["base", fmt(x, 2) + " m"], ["altura", fmt(10 - x, 2) + " m"]]; },
      enun: "Entre todos los rectángulos de perímetro 20 m, ¿cuál tiene el área máxima?",
      dib: function (x) {
        var w = x * 17, hh = (10 - x) * 17;
        return '<rect class="dib-a" x="10" y="10" width="' + w + '" height="' + hh + '"/><text class="dib-t" x="' + (10 + w / 2) + '" y="' + (hh + 28) + '" text-anchor="middle">x</text><text class="dib-t" x="' + (w + 16) + '" y="' + (10 + hh / 2 + 4) + '">10 − x</text>';
      },
      sol: "A(x) = x(10 − x) = 10x − x² → A′(x) = 10 − 2x = 0 → x = 5. Base 5, altura 5: es un cuadrado de área 25 m². Como A′ pasa de + a −, es un máximo."
    },
    caja: {
      t: "Caja sin tapa a partir de una lámina de 30×30 cm", obj: "Volumen", un: "cm³", max: true, x: [0, 15], yr: [0, 2400], opt: 5, xn: "lado del recorte x (cm)",
      g: function (x) { return x * (30 - 2 * x) * (30 - 2 * x); },
      datos: function (x) { return [["recorte", fmt(x, 2) + " cm"], ["base", fmt(30 - 2 * x, 2) + " × " + fmt(30 - 2 * x, 2) + " cm"]]; },
      enun: "Se recorta un cuadrado de lado x en cada esquina de una lámina cuadrada de 30 cm y se doblan los lados para hacer una caja sin tapa. ¿Qué x da el mayor volumen?",
      dib: function (x) {
        var s = 150, c = x * 5;
        return '<rect class="dib-l" x="10" y="10" width="' + s + '" height="' + s + '"/>' +
          [[10, 10], [10 + s - c, 10], [10, 10 + s - c], [10 + s - c, 10 + s - c]].map(function (p) { return '<rect class="dib-b" x="' + p[0] + '" y="' + p[1] + '" width="' + c + '" height="' + c + '"/>'; }).join("") +
          '<text class="dib-t" x="' + (10 + c / 2) + '" y="' + (26 + c) + '" text-anchor="middle">x</text>';
      },
      sol: "V(x) = x(30 − 2x)² → V′(x) = (30 − 2x)² − 4x(30 − 2x) = (30 − 2x)(30 − 6x) = 0 → x = 15 (la lámina desaparece, V = 0) o x = 5. Con x = 5: V = 5·20² = 2000 cm³. V′ pasa de + a − en x = 5: máximo."
    },
    corral: {
      t: "Corral junto a una pared (200 m²)", obj: "Longitud de valla", un: "m", max: false, x: [3, 25], yr: [30, 90], opt: 10, xn: "lado perpendicular a la pared x (m)",
      g: function (x) { return 2 * x + 200 / x; },
      datos: function (x) { return [["x", fmt(x, 2) + " m"], ["y = 200/x", fmt(200 / x, 2) + " m"]]; },
      enun: "Quieres vallar un corral rectangular de 200 m² aprovechando una pared como uno de los lados (ese no se valla). ¿Qué dimensiones usan la menor cantidad de valla?",
      dib: function (x) {
        var w = Math.min(190, (200 / x) * 3), hh = x * 3;
        return '<line class="dib-pared" x1="4" y1="14" x2="196" y2="14"/><rect class="dib-a" x="10" y="14" width="' + w + '" height="' + hh + '"/>' +
          '<text class="dib-t" x="' + (10 + w / 2) + '" y="' + (14 + hh + 15) + '" text-anchor="middle">y</text><text class="dib-t" x="' + (w + 15) + '" y="' + (14 + hh / 2 + 4) + '">x</text><text class="dib-t" x="196" y="9" text-anchor="end">pared</text>';
      },
      sol: "Con x (los dos lados perpendiculares) e y (el paralelo a la pared): x·y = 200 → y = 200/x. Valla: L(x) = 2x + y = 2x + 200/x → L′(x) = 2 − 200/x² = 0 → x² = 100 → x = 10 (y = 20). L′ pasa de − a +: mínimo, L = 40 m."
    }
  };

  B.w.optimizar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Encuentra el óptimo");
    cuerpo.innerHTML = '<div class="chips"></div><p class="w-intro" data-enun></p><div class="op-fila"><svg class="dib" viewBox="0 0 200 170" role="img" aria-label="Dibujo del problema"></svg><div class="w-plot"></div></div>' +
      '<div class="ctl"><label><span class="mv">x</span> <input type="range" step="0.01" aria-label="Valor de x"> <span class="mv" data-xv></span></label></div>' +
      '<div class="lectura"></div><div class="ctl"><button type="button" class="btn-comprobar" data-rev>Comprobar con la derivada</button></div><div class="op-sol" hidden></div>';
    var enun = cuerpo.querySelector("[data-enun]"), dib = cuerpo.querySelector(".dib"), elPlot = cuerpo.querySelector(".w-plot"), rng = cuerpo.querySelector("input"), xv = cuerpo.querySelector("[data-xv]");
    var elLec = cuerpo.querySelector(".lectura"), sol = cuerpo.querySelector(".op-sol");
    var st = { k: "rect", x: 2, mejor: null, rev: false }, g, h;

    function pintar() {
      var P = PROB[st.k], x = st.x, v = P.g(x);
      if (st.mejor === null || (P.max ? v > st.mejor : v < st.mejor)) st.mejor = v;
      g.limpiar();
      if (st.rev) {
        g.vertical(P.opt, { clase: "c-ok", dash: "5 4" });
        g.punto(P.opt, P.g(P.opt), { r: 7, clase: "c-ok" });
        g.texto(P.opt, P.g(P.opt), (P.max ? "máximo " : "mínimo ") + fmt(P.g(P.opt), 2), { dy: P.max ? -14 : 24, ancla: "middle", clase: "ok" });
      }
      g.mover(h, x, v);
      g.texto(x, v, fmt(v, 2) + " " + P.un, { dx: 12, dy: -12, clase: "pen" });
      dib.innerHTML = P.dib(x);
      xv.textContent = fmt(x, 2); rng.value = x;
      elLec.innerHTML = P.datos(x).map(function (d) { return lec(d[0], d[1]); }).join("") + lec(P.obj, fmt(v, 2) + " " + P.un, "pen") + lec(P.max ? "El mayor que has visto" : "El menor que has visto", fmt(st.mejor, 2) + " " + P.un, "ok");
    }

    function montar() {
      var P = PROB[st.k];
      enun.innerHTML = P.enun + " <b>Mueve x</b> y busca el " + (P.max ? "máximo" : "mínimo") + " a ojo; luego compruébalo con la derivada.";
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: P.x[0], xmax: P.x[1], ymin: P.yr[0], ymax: P.yr[1], w: 460, h: 300, etx: "x", ety: P.obj.toLowerCase(), etiqueta: "Gráfica de la función a optimizar" });
      g.curva(P.g, { capa: "fijo" });
      h = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
      g.arrastrar(h, function (x) { st.x = Math.max(P.x[0] + 0.02, Math.min(P.x[1] - 0.02, x)); pintar(); }, { get: function () { return st.x; }, paso: (P.x[1] - P.x[0]) / 100, etiqueta: "Valor de x" });
      rng.min = P.x[0] + 0.02; rng.max = P.x[1] - 0.02;
      st.x = P.x[0] + (P.x[1] - P.x[0]) * 0.2; st.mejor = null; st.rev = false;
      sol.hidden = true; sol.innerHTML = "";
      pintar();
    }
    rng.addEventListener("input", function () { st.x = parseFloat(rng.value); pintar(); });
    cuerpo.querySelector("[data-rev]").addEventListener("click", function () {
      st.rev = true; sol.hidden = false; sol.innerHTML = '<div class="result-box"><span class="result-label">Con la derivada</span>' + PROB[st.k].sol + "</div>";
      pintar();
    });
    fichas(cuerpo.querySelector(".chips"), Object.keys(PROB).map(function (k) { return { k: k, t: PROB[k].t }; }), st.k, function (k) { st.k = k; montar(); });
    montar();
  };

  // ============================================================
  // ENTRENADOR DE DERIVADAS (por niveles, corrige expresiones libres)
  //   h: cómo se ve · e: derivada correcta · f: función original · p: pista
  // ============================================================
  var BANCO = {
    1: { nombre: "Potencias y sumas", items: [
      { h: "4x³ − 5x² + 2x − 7", f: "4x^3-5x^2+2x-7", e: "12x^2-10x+2", p: "Deriva cada sumando con (xⁿ)′ = n·xⁿ⁻¹. La constante desaparece." },
      { h: "3√x", f: "3sqrt(x)", e: "3/(2sqrt(x))", dom: [0.3, 5], p: "√x = x^(1/2). Baja el exponente: (1/2)·x^(−1/2) = 1/(2√x)." },
      { h: "6/x²", f: "6/x^2", e: "-12/x^3", p: "6/x² = 6·x⁻². Baja el −2 y resta 1 al exponente." },
      { h: "x⁵/5 − 2x", f: "x^5/5-2x", e: "x^4-2", p: "(x⁵/5)′ = 5x⁴/5 = x⁴." },
      { h: "7 − 2/x", f: "7-2/x", e: "2/x^2", p: "−2/x = −2·x⁻¹, y su derivada es +2·x⁻²." },
      { h: "(x³ + 4x)/2", f: "(x^3+4x)/2", e: "(3x^2+4)/2", p: "Dividir entre 2 es multiplicar por ½: el número sale fuera." }
    ] },
    2: { nombre: "Producto y cociente", items: [
      { h: "x²·eˣ", f: "x^2e^x", e: "(2x+x^2)e^x", p: "Producto: f′g + fg′ con f = x², g = eˣ." },
      { h: "(x + 1)(2x − 3)", f: "(x+1)(2x-3)", e: "4x-1", p: "Puedes usar producto o multiplicar antes: 2x² − x − 3." },
      { h: "x·ln x", f: "x ln(x)", e: "ln(x)+1", dom: [0.3, 4], p: "Producto: 1·ln x + x·(1/x)." },
      { h: "(x − 1)/(x + 2)", f: "(x-1)/(x+2)", e: "3/(x+2)^2", p: "Cociente: (f′g − fg′)/g². El numerador se simplifica mucho." },
      { h: "eˣ/x", f: "e^x/x", e: "e^x(x-1)/x^2", dom: [0.3, 4], p: "Cociente: (eˣ·x − eˣ·1)/x². Saca eˣ factor común." },
      { h: "sen x · cos x", f: "sen(x)cos(x)", e: "cos(x)^2-sen(x)^2", p: "Producto: cos x·cos x + sen x·(−sen x)." },
      { h: "x²/(x² + 1)", f: "x^2/(x^2+1)", e: "2x/(x^2+1)^2", p: "Cociente: (2x(x²+1) − x²·2x)/(x²+1)². Simplifica el numerador." }
    ] },
    3: { nombre: "Regla de la cadena", items: [
      { h: "(3x − 2)⁵", f: "(3x-2)^5", e: "15(3x-2)^4", p: "Fuera: (algo)⁵ → 5·(algo)⁴. Dentro: 3x − 2 → 3." },
      { h: "sen(5x)", f: "sen(5x)", e: "5cos(5x)", p: "Fuera: sen → cos. Dentro: 5x → 5." },
      { h: "e^(x²)", f: "e^(x^2)", e: "2x e^(x^2)", p: "Fuera: eᵘ → eᵘ. Dentro: x² → 2x." },
      { h: "ln(x² + 4)", f: "ln(x^2+4)", e: "2x/(x^2+4)", p: "(ln u)′ = u′/u con u = x² + 4." },
      { h: "√(x² + 1)", f: "sqrt(x^2+1)", e: "x/sqrt(x^2+1)", p: "(√u)′ = u′/(2√u) con u′ = 2x: el 2 se simplifica." },
      { h: "cos(2x + 1)", f: "cos(2x+1)", e: "-2sen(2x+1)", p: "Fuera: cos → −sen. Dentro: 2x + 1 → 2." },
      { h: "(x² + 1)³", f: "(x^2+1)^3", e: "6x(x^2+1)^2", p: "3·(x²+1)²·2x = 6x(x²+1)²." }
    ] },
    4: { nombre: "Mezcla (nivel examen)", items: [
      { h: "x²·sen(3x)", f: "x^2 sen(3x)", e: "2x sen(3x)+3x^2 cos(3x)", p: "Producto, y al derivar sen(3x) aparece la cadena (×3)." },
      { h: "e^(2x)/(x + 1)", f: "e^(2x)/(x+1)", e: "e^(2x)(2x+1)/(x+1)^2", p: "Cociente. Derivada de e^(2x) = 2e^(2x) (cadena). Saca e^(2x) factor común." },
      { h: "ln x / x²", f: "ln(x)/x^2", e: "(1-2ln(x))/x^3", dom: [0.3, 4], p: "Cociente: ((1/x)·x² − ln x·2x)/x⁴. Simplifica dividiendo por x." },
      { h: "x·√(x + 1)", f: "x sqrt(x+1)", e: "(3x+2)/(2sqrt(x+1))", dom: [-0.8, 4], p: "Producto y cadena: √(x+1) + x/(2√(x+1)). Común denominador 2√(x+1)." },
      { h: "(sen x)²", f: "sen(x)^2", e: "2sen(x)cos(x)", p: "Cadena: fuera ( )² → 2( ); dentro sen x → cos x." },
      { h: "(eˣ + e⁻ˣ)/2", f: "(e^x+e^(-x))/2", e: "(e^x-e^(-x))/2", p: "(e⁻ˣ)′ = −e⁻ˣ (cadena con u = −x)." }
    ] }
  };
  B.lab.banco = BANCO; // para verificación automática desde herramientas/

  B.w.derivador = function (host) {
    var cuerpo = B.caja(host, "Entrenador", "Deriva y te corrijo al momento");
    var clave = "derivador";
    var prog = B.ls.get(clave, {});
    cuerpo.innerHTML = '<p class="w-intro">Escribe la derivada como quieras: <code>12x^3-4x</code>, <code>2x e^(x^2)</code>, <code>(x^2+1)/(x-1)</code>, <code>sen(2x)</code>… Da igual la forma, mientras sea equivalente.</p>' +
      '<div class="chips"></div><div class="dv-enun"></div>' +
      '<form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">f′(x) =</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Tu derivada"><span class="bx-mk" aria-hidden="true"></span></label>' +
      '<button type="submit" class="btn-comprobar">Comprobar</button><button type="button" class="chip-btn" data-pista>💡 Pista</button><button type="button" class="chip-btn" data-ver>Ver solución</button></form>' +
      '<p class="dv-lee"></p><div class="bx-res" aria-live="polite"></div><p class="dv-pie"></p>';
    var enun = cuerpo.querySelector(".dv-enun"), form = cuerpo.querySelector(".dv-form"), inp = form.querySelector("input"), lee = cuerpo.querySelector(".dv-lee"), res = cuerpo.querySelector(".bx-res"), pie = cuerpo.querySelector(".dv-pie");
    var campo = form.querySelector(".bx-campo");
    var st = { n: "1", i: 0, racha: 0, resuelto: false };

    function hechos(n) { return prog[n] || []; }
    function siguiente() {
      var b = BANCO[st.n].items, pend = [], i;
      for (i = 0; i < b.length; i++) if (hechos(st.n).indexOf(i) < 0) pend.push(i);
      var pool = pend.length ? pend : b.map(function (_, k) { return k; });
      if (pool.length > 1) pool = pool.filter(function (k) { return k !== st.i; });
      st.i = pool[Math.floor(Math.random() * pool.length)];
      st.resuelto = false; st.pistas = false;
      inp.value = ""; inp.disabled = false; campo.classList.remove("ok", "mal"); lee.textContent = ""; res.className = "bx-res"; res.innerHTML = "";
      pintar();
    }
    function pintar() {
      var it = BANCO[st.n].items[st.i], hh = hechos(st.n).length, tot = BANCO[st.n].items.length;
      enun.innerHTML = '<span class="dv-lab">f(x) =</span> <span class="dv-f">' + it.h + "</span>";
      pie.textContent = "Racha: " + st.racha + " · Nivel «" + BANCO[st.n].nombre + "»: " + hh + " de " + tot + " superadas";
    }
    function evalua() {
      var it = BANCO[st.n].items[st.i], r = Mate.compilar(inp.value);
      if (!r.ok) { res.className = "bx-res mal"; res.textContent = r.error; return; }
      var ok = Mate.equivalente(r.f, Mate.compilar(it.e).f, it.dom);
      campo.classList.toggle("ok", ok); campo.classList.toggle("mal", !ok);
      if (ok) {
        st.racha++; st.resuelto = true; inp.disabled = true;
        var h = hechos(st.n); if (h.indexOf(st.i) < 0) { h = h.concat([st.i]); prog[st.n] = h; B.ls.set(clave, prog); }
        res.className = "bx-res ok"; res.innerHTML = '<b>✓ ¡Correcto!</b> <button type="button" class="btn-comprobar" data-sig>Siguiente →</button>';
        pintar();
      } else {
        st.racha = 0; res.className = "bx-res mal";
        res.innerHTML = "<b>Todavía no.</b> Revisa el método (pulsa «Pista» si quieres) y vuelve a probar."; pintar();
      }
    }
    inp.addEventListener("input", function () {
      campo.classList.remove("ok", "mal");
      var r = inp.value.trim() ? Mate.compilar(inp.value) : null;
      lee.textContent = r ? (r.ok ? "He leído: " + r.texto : "") : "";
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); if (!st.resuelto) evalua(); });
    cuerpo.addEventListener("click", function (e) {
      if (e.target.closest("[data-sig]")) { siguiente(); return; }
      var it = BANCO[st.n].items[st.i];
      if (e.target.closest("[data-pista]")) { res.className = "bx-res"; res.innerHTML = '<div class="bx-pista"><b>Pista:</b> ' + it.p + "</div>"; }
      if (e.target.closest("[data-ver]")) {
        var r = Mate.compilar(it.e);
        st.racha = 0; res.className = "bx-res";
        res.innerHTML = '<div class="bx-pista"><b>Método:</b> ' + it.p + "</div><div class=\"bx-pista\"><b>Solución:</b> f′(x) = " + r.texto + ' <button type="button" class="btn-comprobar" data-sig>Otra →</button></div>';
        pintar();
      }
    });
    fichas(cuerpo.querySelector(".chips"), Object.keys(BANCO).map(function (k) { return { k: k, t: k + ". " + BANCO[k].nombre }; }), st.n, function (k) { st.n = k; st.racha = 0; siguiente(); });
    siguiente();
  };

  // ============================================================
  // CLASE: de la secante a la tangente (f(x) = x² en a = 1)
  // ============================================================
  B.lab.claseSecante = function (host) {
    host.innerHTML = '<div class="w-plot"></div><div class="lectura"></div>' +
      '<div class="ctl"><label>h <input type="range" min="-2" max="3" step="0.01" value="2" aria-label="Distancia h entre los dos puntos"> <span class="mv" data-hv></span></label></div>';
    var f = function (x) { return x * x; }, a = 1;
    var g = new B.Plot(host.querySelector(".w-plot"), { xmin: -1, xmax: 4.4, ymin: -1.5, ymax: 12, w: 560, h: 340, etiqueta: "Gráfica de f(x) = x² con una secante que se acerca a la tangente" });
    g.curva(f, { capa: "fijo" });
    var elLec = host.querySelector(".lectura"), rng = host.querySelector("input"), hv = host.querySelector("[data-hv]");
    var st = { h: 2, tang: false }, parar = null;

    function pintar() {
      var h = st.h, xb = a + h, yb = f(xb);
      g.limpiar();
      if (st.tang) g.recta(2 * a, a, f(a), { clase: "c-ok", dash: "7 5" });
      if (Math.abs(h) > 0.004) g.recta(2 + h, a, f(a), { clase: "c-red" });
      g.punto(a, f(a), { r: 7, clase: "c-pen" });
      g.texto(a, f(a), "A(1, 1)", { dx: -8, dy: 20, ancla: "end", clase: "pen" });
      if (Math.abs(h) > 0.004) {
        g.punto(xb, yb, { r: 7, clase: "c-red" });
        g.texto(xb, yb, "B", { dx: 11, dy: -9, clase: "red" });
      }
      hv.textContent = fmt(h, 3); rng.value = h;
      elLec.innerHTML = lec("h = x_B − 1", fmt(h, 3)) + lec("TVM = (f(1+h) − 1) ÷ h", Math.abs(h) > 0.004 ? fmt(2 + h, 3) : "→ 2", "red") + lec("f′(1)", "2", st.tang ? "ok" : "");
    }
    rng.addEventListener("input", function () { if (parar) parar(); st.h = parseFloat(rng.value); pintar(); });
    pintar();
    return {
      set: function (e) {
        if (e.tang != null) st.tang = !!e.tang;
        if (e.h != null && e.h !== st.h) {
          if (parar) parar();
          var de = st.h;
          parar = B.anima(de, e.h, 800, function (v) { st.h = v; pintar(); });
        } else pintar();
      }
    };
  };

})(window);

/* ============================================================
   Bachi para Firu · laboratorio de números complejos (Matemáticas I, tema 6)
   motor B.lab.cx + potenciasi · operaciones · plano · conversor
   raices · lugar · mandelbrot
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var C = B.lab.cx = {};
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }

  // ------------------------------------------------------------
  // Aritmética: z = { a, b } (a + bi)
  // ------------------------------------------------------------
  function z(a, b) { return { a: a, b: b }; }
  C.z = z;
  C.suma = function (p, q) { return z(p.a + q.a, p.b + q.b); };
  C.resta = function (p, q) { return z(p.a - q.a, p.b - q.b); };
  C.mul = function (p, q) { return z(p.a * q.a - p.b * q.b, p.a * q.b + p.b * q.a); };
  C.conj = function (p) { return z(p.a, -p.b); };
  C.div = function (p, q) { var d = q.a * q.a + q.b * q.b; return z((p.a * q.a + p.b * q.b) / d, (p.b * q.a - p.a * q.b) / d); };
  C.mod = function (p) { return Math.hypot(p.a, p.b); };
  C.arg = function (p) { var t = Math.atan2(cero(p.b), cero(p.a)) / R; t = ((t % 360) + 360) % 360; return Math.abs(t - 360) < 1e-9 ? 0 : t; };
  C.polar = function (r, tDeg) { return z(cero(r * Math.cos(tDeg * R)), cero(r * Math.sin(tDeg * R))); };
  C.pot = function (p, n) { var r = Math.pow(C.mod(p), n), t = C.arg(p) * n; return C.polar(r, t); };
  C.raices = function (r, tDeg, n) {
    var out = [], m = Math.pow(r, 1 / n);
    for (var k = 0; k < n; k++) out.push({ r: m, t: ((tDeg + 360 * k) / n) % 360 });
    return out;
  };

  // Escritura bonita de un complejo en forma binómica
  C.txt = function (p, d) {
    d = d == null ? 3 : d;
    var a = cero(Math.round(p.a * Math.pow(10, d)) / Math.pow(10, d)), b = cero(Math.round(p.b * Math.pow(10, d)) / Math.pow(10, d));
    if (b === 0) return fmt(a, d);
    var bs = Math.abs(b) === 1 ? "" : fmt(Math.abs(b), d);
    if (a === 0) return (b < 0 ? "−" : "") + bs + "i";
    return fmt(a, d) + (b < 0 ? " − " : " + ") + bs + "i";
  };
  C.txtPolar = function (p, d) { d = d == null ? 3 : d; return fmt(C.mod(p), d) + "<sub>" + fmt(C.arg(p), 2) + "°</sub>"; };

  // Lectura de un complejo escrito por el usuario: "3-2i", "-i", "2i", "1/2+sqrt(3)/2 i", "(1+i)"
  C.leer = function (src) {
    var s = String(src).replace(/\s+/g, "").replace(/[−–—]/g, "-").replace(/,/g, ".").replace(/√/g, "sqrt").replace(/[()]/g, function (c) { return c; });
    if (!s) return null;
    s = s.replace(/^\((.*)\)$/, "$1");
    var im = /i$/.test(s), cuerpo = im ? s.slice(0, -1) : s, corte = -1, nivel = 0;
    for (var k = cuerpo.length - 1; k > 0; k--) {
      var ch = cuerpo.charAt(k);
      if (ch === ")") nivel++; else if (ch === "(") nivel--;
      if (nivel === 0 && (ch === "+" || ch === "-") && !/[eE*\/^(]/.test(cuerpo.charAt(k - 1))) { corte = k; break; }
    }
    function num(t, defecto) {
      if (t === "" || t === "+") return defecto;
      if (t === "-") return -defecto;
      var v = B.Mate.numero(t.replace(/\*$/, ""));
      return v;
    }
    var a, b;
    if (!im) { a = num(cuerpo, NaN); b = 0; }
    else if (corte < 0) { a = 0; b = num(cuerpo, 1); }
    else { a = num(cuerpo.slice(0, corte), NaN); b = num(cuerpo.slice(corte), 1); }
    if (isNaN(a) || isNaN(b)) return null;
    return z(a, b);
  };

  function campo(host, et, val, ancho, aria) {
    var l = document.createElement("label"); l.className = "bx-campo";
    l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + (ancho || 120) + 'px" value="' + val + '" aria-label="' + (aria || et.replace(/<[^>]+>/g, "")) + '">';
    host.appendChild(l); return l.querySelector("input");
  }

  // ============================================================
  // POTENCIASI: las potencias de i dan vueltas de 90° en el plano
  // ============================================================
  B.w.potenciasi = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las potencias de i: un ciclo de cuatro");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { n: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Exponente <i>n</i>", min: 0, max: 40, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    var VAL = ["1", "i", "−1", "−i"], PTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    var an = U.animar(ctl, function (t, dt) { if (dt) { st.t = (st.t || 0) + dt; if (st.t > 0.7) { st.t = 0; st.n = (st.n + 1) % 41; sl.set(st.n); pinta(); } } }, { auto: false });
    function pinta() {
      var n = st.n, r = n % 4;
      g.limpiar();
      for (var k = 0; k <= Math.min(n, 40); k++) {
        var p = PTS[k % 4], rad = 0.78 + 0.04 * Math.floor(k / 4);
        if (k === n) g.punto(p[0], p[1], { r: 9, clase: "c-red" }); else g.punto(p[0] * 1, p[1] * 1, { r: 3, clase: "c-faint" });
      }
      g.segmento(0, 0, PTS[r][0], PTS[r][1], { clase: "c-red" }).setAttribute("stroke-width", 3);
      g.arco(0, 0, 0.35, 0, 90 * n, { clase: "c-hl" });
      g.texto(PTS[r][0] * 1.2, PTS[r][1] * 1.2, "i" + U.sup(n) + " = " + VAL[r], { ancla: "middle", dy: 5, clase: "red" });
      lectura.innerHTML = U.lec("n", n) + U.lec("Resto de n entre 4", r, "pen") + U.lec("i" + U.sup(n), VAL[r], "red") + U.lec("Ángulo girado", (90 * n) + "° = " + (n % 4 === 0 ? "" : "") + Math.floor(n / 4) + " vueltas y " + (90 * r) + "°");
      pie.innerHTML = "Multiplicar por i es <b>girar 90°</b>: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, i⁴ = 1 y vuelta a empezar. Por eso, para calcular iⁿ, se divide n entre 4 y se mira el <b>resto</b>: resto 0 → 1; 1 → i; 2 → −1; 3 → −i.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 360, h: 340, limpio: true, etiqueta: "Las potencias de i en el plano complejo" });
    g.rangoIso(0, 0, 1.55);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo", dash: "3 5" });
    g.segmento(-1.45, 0, 1.45, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.45, 0, 1.45, { clase: "c-ink", capa: "fijo" });
    g.texto(1.4, 0, "Re", { dy: -6, ancla: "end", clase: "faint", capa: "fijo" }); g.texto(0, 1.4, "Im", { dx: 8, dy: 4, clase: "faint", capa: "fijo" });
    pinta();
  };

  // ============================================================
  // OPERACIONES: calculadora con pasos
  // ============================================================
  B.w.operaciones = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Calculadora de complejos con los pasos");
    cuerpo.innerHTML = '<div data-op class="chips"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot rd-circ"></div>';
    var st = { op: "mul", p: "3+2i", q: "1-4i", n: 3 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var iP = campo(ctl, "z₁ =", st.p, 130), iQ = campo(ctl, "z₂ =", st.q, 130), iN = campo(ctl, "n =", "3", 50);
    var PRES = [["3+2i", "1-4i"], ["3+2i", "1-i"], ["1+i", "1-i"], ["2-3i", "-1+i"], ["i", "i"]];
    var lblQ = iQ.closest("label"), lblN = iN.closest("label");
    function T(p) { return "(" + C.txt(p) + ")"; }
    function pinta() {
      var p = C.leer(st.p), q = C.leer(st.q), n = Math.round(parseFloat(String(iN.value).replace(",", ".")));
      lblQ.style.display = st.op === "pot" || st.op === "conj" ? "none" : ""; lblN.style.display = st.op === "pot" ? "" : "none";
      if (!p || (!q && st.op !== "pot" && st.op !== "conj")) { lectura.innerHTML = U.lec("Revisa lo que has escrito", "usa la forma a + bi, por ejemplo 3-2i, 5i, −1 o 1/2+i", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
      var res, h = "<ol class='w-ol'>", sig = st.op === "res" ? -1 : 1;
      if (st.op === "suma" || st.op === "res") {
        res = sig > 0 ? C.suma(p, q) : C.resta(p, q);
        h += "<li>Se operan por separado las partes reales y las imaginarias: " + T(p) + (sig > 0 ? " + " : " − ") + T(q) + " = (" + fmt(p.a, 3) + (sig > 0 ? " + " : " − ") + (q.a < 0 ? "(" + fmt(q.a, 3) + ")" : fmt(q.a, 3)) + ") + (" + fmt(p.b, 3) + (sig > 0 ? " + " : " − ") + (q.b < 0 ? "(" + fmt(q.b, 3) + ")" : fmt(q.b, 3)) + ")i.</li><li>Resultado: <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "mul") {
        res = C.mul(p, q);
        h += "<li>Distributiva: (a + bi)(c + di) = ac + adi + bci + bdi².</li><li>Con a = " + fmt(p.a, 3) + ", b = " + fmt(p.b, 3) + ", c = " + fmt(q.a, 3) + ", d = " + fmt(q.b, 3) + ": parte real = ac − bd = " + fmt(p.a * q.a, 3) + " − (" + fmt(p.b * q.b, 3) + ") = " + fmt(p.a * q.a - p.b * q.b, 3) + " (se usó i² = −1) y parte imaginaria = ad + bc = " + fmt(p.a * q.b, 3) + " + " + fmt(p.b * q.a, 3) + " = " + fmt(p.a * q.b + p.b * q.a, 3) + ".</li><li>Resultado: <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "div") {
        if (q.a === 0 && q.b === 0) { lectura.innerHTML = U.lec("Error", "no se puede dividir entre 0", "red"); pasos.innerHTML = ""; return; }
        res = C.div(p, q); var d = q.a * q.a + q.b * q.b, num = C.mul(p, C.conj(q));
        h += "<li>Se multiplica numerador y denominador por el <b>conjugado</b> del denominador, " + T(C.conj(q)) + ".</li><li>Denominador: " + T(q) + T(C.conj(q)) + " = c² + d² = " + fmt(q.a * q.a, 3) + " + " + fmt(q.b * q.b, 3) + " = <b>" + fmt(d, 3) + "</b> (¡un número real!).</li><li>Numerador: " + T(p) + T(C.conj(q)) + " = " + C.txt(num) + ".</li><li>Resultado: (" + C.txt(num) + ")/" + fmt(d, 3) + " = <b>" + C.txt(res) + "</b>.</li>";
      } else if (st.op === "conj") {
        res = C.conj(p);
        h += "<li>El conjugado cambia el signo de la parte imaginaria: <b>" + C.txt(res) + "</b>.</li><li>Además z·z̄ = a² + b² = " + fmt(p.a * p.a + p.b * p.b, 3) + " = |z|² y z + z̄ = 2a = " + fmt(2 * p.a, 3) + ".</li>";
      } else {
        if (!(n >= 0 && n <= 8)) { lectura.innerHTML = U.lec("Revisa", "usa un exponente entero entre 0 y 8", "red"); pasos.innerHTML = ""; return; }
        res = z(1, 0); var cur = z(1, 0), tr = [C.txt(cur)];
        for (var k = 0; k < n; k++) { cur = C.mul(cur, p); tr.push(C.txt(cur)); }
        res = cur;
        h += "<li>Se multiplica z por sí mismo " + n + " veces (o se usa la forma polar con De Moivre, que es más rápido): " + tr.map(function (t, i) { return "z" + U.sup(i) + " = " + t; }).join("; ") + ".</li><li>Resultado: <b>z" + U.sup(n) + " = " + C.txt(res) + "</b>.</li>";
      }
      h += "</ol>";
      pasos.innerHTML = h;
      lectura.innerHTML = U.lec("Resultado (binómica)", C.txt(res), "ok") + U.lec("Resultado (polar)", C.txtPolar(res), "pen") + U.lec("Módulo", fmt(C.mod(res), 4)) + U.lec("Argumento", fmt(C.arg(res), 2) + "°");
      g.limpiar();
      var m = Math.max(3, Math.abs(p.a), Math.abs(p.b), Math.abs(res.a), Math.abs(res.b), q ? Math.abs(q.a) : 0, q ? Math.abs(q.b) : 0) * 1.25;
      g.rangoIso(0, 0, m);
      function vec(w, cl, et) { U.flecha(g, 0, 0, w.a, w.b, { clase: cl }); g.texto(w.a, w.b, et, { dx: 6, dy: -6, clase: cl === "c-pen" ? "pen" : cl === "c-red" ? "red" : "ok" }); }
      vec(p, "c-pen", "z₁"); if (q && st.op !== "pot" && st.op !== "conj") vec(q, "c-red", "z₂"); vec(res, "c-ok", "resultado");
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 420, h: 360, etx: "Re", ety: "Im", etiqueta: "Los números y el resultado en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-op]"), [{ k: "suma", t: "z₁ + z₂" }, { k: "res", t: "z₁ − z₂" }, { k: "mul", t: "z₁ · z₂" }, { k: "div", t: "z₁ / z₂" }, { k: "conj", t: "conjugado" }, { k: "pot", t: "potencia zⁿ" }], st.op, function (k) { st.op = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRES.map(function (p, i) { return { k: String(i), t: p[0].replace("-", "−") + " y " + p[1].replace("-", "−") }; }), "", function (k) { st.p = PRES[+k][0]; st.q = PRES[+k][1]; iP.value = st.p; iQ.value = st.q; pinta(); });
    iP.addEventListener("input", function () { st.p = iP.value; pinta(); }); iQ.addEventListener("input", function () { st.q = iQ.value; pinta(); }); iN.addEventListener("input", pinta);
    pinta();
  };

  // ============================================================
  // PLANO: arrastra dos números y mira suma, producto y cociente
  // ============================================================
  B.w.plano = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Plano complejo: arrastra z₁ y z₂");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "mul", p: z(2, 1), q: z(1, 2) }, g, h1, h2, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function ajusta(v) { return Math.round(v * 10) / 10; }
    function pinta() {
      var p = st.p, q = st.q, m = st.modo, res;
      if (m === "suma") res = C.suma(p, q); else if (m === "mul") res = C.mul(p, q); else if (m === "div") res = C.mod(q) < 1e-9 ? z(0, 0) : C.div(p, q); else res = C.conj(p);
      var grande = Math.max(Math.abs(res.a), Math.abs(res.b), Math.abs(p.a), Math.abs(p.b), Math.abs(q.a), Math.abs(q.b));
      g.rangoIso(0, 0, Math.max(4.4, Math.ceil(grande * 1.25 / 2) * 2));
      g.limpiar();
      g.mover(h1, p.a, p.b); g.mover(h2, q.a, q.b);
      // vectores desde el origen
      U.flecha(g, 0, 0, p.a, p.b, { clase: "c-pen" });
      if (m !== "conj") U.flecha(g, 0, 0, q.a, q.b, { clase: "c-red" });
      if (m === "suma") { g.segmento(p.a, p.b, res.a, res.b, { clase: "c-red", dash: "4 4" }); g.segmento(q.a, q.b, res.a, res.b, { clase: "c-pen", dash: "4 4" }); }
      U.flecha(g, 0, 0, res.a, res.b, { clase: "c-ok" });
      g.texto(res.a, res.b, m === "suma" ? "z₁+z₂" : m === "mul" ? "z₁·z₂" : m === "div" ? "z₁/z₂" : "z̄₁", { dx: 8, dy: -8, clase: "ok" });
      if (m === "mul" || m === "div") { g.arco(0, 0, 0.7, 0, C.arg(p), { clase: "c-pen" }); g.arco(0, 0, 0.9, 0, C.arg(q), { clase: "c-red" }); g.arco(0, 0, 1.1, 0, C.arg(res), { clase: "c-ok" }); }
      lectura.innerHTML = U.lec("z₁", C.txt(p, 2) + "  =  " + C.txtPolar(p, 2), "pen") + (m !== "conj" ? U.lec("z₂", C.txt(q, 2) + "  =  " + C.txtPolar(q, 2), "red") : "") +
        U.lec(m === "suma" ? "z₁ + z₂" : m === "mul" ? "z₁ · z₂" : m === "div" ? "z₁ / z₂" : "conjugado de z₁", C.txt(res, 2) + "  =  " + C.txtPolar(res, 2), "ok") +
        (m === "mul" ? U.lec("Comprobación", "|z₁|·|z₂| = " + fmt(C.mod(p) * C.mod(q), 2) + " · θ₁ + θ₂ = " + fmt((C.arg(p) + C.arg(q)) % 360, 1) + "°") : m === "div" ? U.lec("Comprobación", "|z₁|/|z₂| = " + fmt(C.mod(p) / C.mod(q), 2) + " · θ₁ − θ₂ = " + fmt(((C.arg(p) - C.arg(q)) % 360 + 360) % 360, 1) + "°") : "");
      pie.innerHTML = m === "suma" ? "La suma es la <b>diagonal del paralelogramo</b> que forman z₁ y z₂ (como la suma de vectores)." : m === "mul" ? "Al multiplicar, <b>los módulos se multiplican y los argumentos se suman</b>: z₁·z₂ es z₁ girado el ángulo de z₂ y estirado |z₂| veces. Mira cómo el arco verde (resultado) es la suma de los arcos azul y rojo." : m === "div" ? "Al dividir, <b>los módulos se dividen y los argumentos se restan</b>: z₁/z₂ es z₁ girado hacia atrás el ángulo de z₂ y encogido |z₂| veces." : "El conjugado es el <b>reflejo respecto del eje real</b>: mismo módulo, argumento opuesto.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: 640, h: 380, etx: "Re", ety: "Im", etiqueta: "Plano complejo con z₁ y z₂ arrastrables" });
    g.rangoIso(0, 0, 4.4);
    h1 = g.punto(0, 0, { capa: "top", r: 9, clase: "c-pen" }); h2 = g.punto(0, 0, { capa: "top", r: 9, clase: "c-red" });
    g.arrastrar(h1, function (x, y, tecla) { if (tecla) return; st.p = z(ajusta(Math.max(-8, Math.min(8, x))), ajusta(Math.max(-8, Math.min(8, y)))); pinta(); }, { get: function () { return st.p.a; }, paso: 0.5, etiqueta: "Número z₁" });
    g.arrastrar(h2, function (x, y, tecla) { if (tecla) return; st.q = z(ajusta(Math.max(-8, Math.min(8, x))), ajusta(Math.max(-8, Math.min(8, y)))); pinta(); }, { get: function () { return st.q.a; }, paso: 0.5, etiqueta: "Número z₂" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "Suma" }, { k: "mul", t: "Producto" }, { k: "div", t: "Cociente" }, { k: "conj", t: "Conjugado" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // CONVERSOR: binómica ⇄ polar con el razonamiento del cuadrante
  // ============================================================
  B.w.conversor = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Conversor binómica ⇄ polar");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div><div class="w-plot rd-circ"></div>';
    var st = { modo: "bp" }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var iZ = campo(ctl, "z =", "-1+i", 150), iR = campo(ctl, "módulo r =", "2", 70), iT = campo(ctl, "ángulo θ (°) =", "150", 70);
    var lz = iZ.closest("label"), lr = iR.closest("label"), lt = iT.closest("label");
    var PRE = { bp: ["-1+i", "-sqrt(3)-i", "-2i", "3", "1+i", "3-4i", "4-4sqrt(3)i"], pb: [["2", "30"], ["4", "60"], ["3", "150"], ["1", "225"], ["5", "300"], ["2", "90"]] };
    function pinta() {
      lz.style.display = st.modo === "bp" ? "" : "none"; lr.style.display = lt.style.display = st.modo === "pb" ? "" : "none";
      var p, h = "<ol class='w-ol'>";
      if (st.modo === "bp") {
        p = C.leer(iZ.value);
        if (!p || (p.a === 0 && p.b === 0)) { lectura.innerHTML = U.lec("Revisa", "escribe un complejo distinto de 0, por ejemplo -1+i", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
        var r = C.mod(p), t = C.arg(p), ref = Math.atan(Math.abs(p.b) / Math.abs(p.a || 1e-12)) / R;
        var cu = p.a > 0 && p.b > 0 ? 1 : p.a < 0 && p.b > 0 ? 2 : p.a < 0 && p.b < 0 ? 3 : p.a > 0 && p.b < 0 ? 4 : 0;
        h += "<li>Módulo: |z| = √(a² + b²) = √(" + fmt(p.a * p.a, 3) + " + " + fmt(p.b * p.b, 3) + ") = √" + fmt(p.a * p.a + p.b * p.b, 3) + " = <b>" + fmt(r, 4) + "</b>.</li>";
        if (cu) h += "<li>El afijo (" + fmt(p.a, 3) + ", " + fmt(p.b, 3) + ") está en el <b>" + cu + ".º cuadrante</b>. El ángulo de referencia es arctan(|b|/|a|) = arctan(" + fmt(Math.abs(p.b / p.a), 4) + ") = " + fmt(ref, 2) + "°.</li><li>Argumento: " + ({ 1: "θ = " + fmt(ref, 2) + "°", 2: "θ = 180° − " + fmt(ref, 2) + "° = " + fmt(180 - ref, 2) + "°", 3: "θ = 180° + " + fmt(ref, 2) + "° = " + fmt(180 + ref, 2) + "°", 4: "θ = 360° − " + fmt(ref, 2) + "° = " + fmt(360 - ref, 2) + "°" }[cu]) + ".</li>";
        else h += "<li>El afijo está sobre un eje: el argumento se lee directamente (0° en el eje real positivo, 90° en el imaginario positivo, 180° en el real negativo, 270° en el imaginario negativo): <b>" + fmt(t, 2) + "°</b>.</li>";
        h += "<li>Forma polar: <b>z = " + fmt(r, 3) + "<sub>" + fmt(t, 2) + "°</sub></b> = " + fmt(r, 3) + "·(cos " + fmt(t, 2) + "° + i·sen " + fmt(t, 2) + "°).</li>";
        lectura.innerHTML = U.lec("Módulo", fmt(r, 4), "pen") + U.lec("Argumento", fmt(t, 3) + "°", "red") + U.lec("Forma polar", C.txtPolar(p, 3), "ok");
      } else {
        var rr = B.Mate.numero(iR.value), tt = B.Mate.numero(iT.value);
        if (isNaN(rr) || isNaN(tt) || rr < 0) { lectura.innerHTML = U.lec("Revisa", "el módulo debe ser ≥ 0 y el ángulo un número", "red"); pasos.innerHTML = ""; g.limpiar(); return; }
        p = C.polar(rr, tt);
        h += "<li>Parte real: a = r·cos θ = " + fmt(rr, 3) + "·cos " + fmt(tt, 3) + "° = " + fmt(rr, 3) + "·" + fmt(Math.cos(tt * R), 4) + " = <b>" + fmt(p.a, 4) + "</b>.</li><li>Parte imaginaria: b = r·sen θ = " + fmt(rr, 3) + "·sen " + fmt(tt, 3) + "° = " + fmt(rr, 3) + "·" + fmt(Math.sin(tt * R), 4) + " = <b>" + fmt(p.b, 4) + "</b>.</li><li>Forma binómica: <b>z = " + C.txt(p, 4) + "</b>.</li>";
        lectura.innerHTML = U.lec("Parte real", fmt(p.a, 4), "pen") + U.lec("Parte imaginaria", fmt(p.b, 4), "red") + U.lec("Forma binómica", C.txt(p, 4), "ok");
      }
      pasos.innerHTML = h + "</ol>";
      g.limpiar();
      var m = Math.max(1.5, Math.abs(p.a), Math.abs(p.b)) * 1.3; g.rangoIso(0, 0, m);
      g.arco(0, 0, C.mod(p), 0, 360, { clase: "c-faint", dash: "3 5" });
      g.segmento(p.a, 0, p.a, p.b, { clase: "c-red", dash: "4 3" }); g.segmento(0, p.b, p.a, p.b, { clase: "c-pen", dash: "4 3" });
      U.flecha(g, 0, 0, p.a, p.b, { clase: "c-ok" }); g.punto(p.a, p.b, { r: 6, clase: "c-ok" });
      g.arco(0, 0, Math.min(0.4 * C.mod(p), 0.8), 0, C.arg(p), { clase: "c-hl" });
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, w: 420, h: 360, etx: "Re", ety: "Im", etiqueta: "El afijo en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "bp", t: "binómica → polar" }, { k: "pb", t: "polar → binómica" }], st.modo, function (k) { st.modo = k; armaPre(); pinta(); });
    function armaPre() {
      var arr = PRE[st.modo];
      U.fichas(cuerpo.querySelector("[data-pre]"), arr.map(function (v, i) { return { k: String(i), t: st.modo === "bp" ? v.replace("sqrt(3)", "√3").replace("-", "−") : v[0] + "_" + v[1] + "°" }; }), "", function (k) {
        if (st.modo === "bp") iZ.value = arr[+k]; else { iR.value = arr[+k][0]; iT.value = arr[+k][1]; } pinta();
      });
    }
    iZ.addEventListener("input", pinta); iR.addEventListener("input", pinta); iT.addEventListener("input", pinta);
    armaPre(); pinta();
  };

  // ============================================================
  // RAICES: raíces n-ésimas, un polígono regular
  // ============================================================
  B.w.raices = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Raíces n-ésimas de un complejo");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><div class="w-pasos"></div>';
    var st = { n: 3, r: 8, t: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pasos = cuerpo.querySelector(".w-pasos");
    var sN = U.slider(ctl, { et: "Índice <i>n</i>", min: 2, max: 12, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    var sR = U.slider(ctl, { et: "Módulo de <i>w</i>", min: 1, max: 32, step: 1, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: String });
    var sT = U.slider(ctl, { et: "Argumento de <i>w</i>", min: 0, max: 359, step: 1, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var n = st.n, rs = C.raices(st.r, st.t, n), rad = rs[0].r, w = C.polar(st.r, st.t);
      g.limpiar();
      var m = Math.max(rad, 1) * 1.45; g.rangoIso(0, 0, m);
      g.arco(0, 0, rad, 0, 360, { clase: "c-faint", dash: "3 5" });
      var pts = rs.map(function (q) { var c = C.polar(q.r, q.t); return [c.a, c.b]; });
      g.poligono(pts, { clase: "z-pen", borde: "var(--pen)" });
      pts.forEach(function (c, k) { g.segmento(0, 0, c[0], c[1], { clase: "c-faint", dash: "2 4" }); g.punto(c[0], c[1], { r: 6, clase: "c-red" }); if (n <= 8) g.texto(c[0], c[1], "z" + U.sub(k), { dx: 8, dy: -6, clase: "red" }); });
      var wm = Math.min(C.mod(w), m * 0.97), wk = wm / (C.mod(w) || 1); g.punto(w.a * wk, w.b * wk, { r: 6, clase: "c-ok" }); g.texto(w.a * wk, w.b * wk, "w", { dx: 8, dy: -6, clase: "ok" });
      var lado = 2 * rad * Math.sin(Math.PI / n);
      lectura.innerHTML = U.lec("Número w", fmt(st.r, 0) + "<sub>" + st.t + "°</sub>", "ok") + U.lec("Módulo de las raíces ⁿ√r", fmt(rad, 4), "pen") + U.lec("Separación entre raíces", fmt(360 / n, 2) + "°", "red") + U.lec("Lado del polígono", fmt(lado, 4));
      pasos.innerHTML = "<ol class='w-ol'><li>Las <b>" + n + " raíces " + n + "-ésimas</b> de w = " + st.r + "<sub>" + st.t + "°</sub> tienen módulo ⁿ√r = " + fmt(rad, 4) + " y argumentos (θ + 360°·k)/n, para k = 0, 1, …, " + (n - 1) + ".</li><li>" + rs.slice(0, 8).map(function (q, k) { var c = C.polar(q.r, q.t); return "k = " + k + ": " + fmt(q.r, 3) + "<sub>" + fmt(q.t, 2) + "°</sub> = " + C.txt(c, 3); }).join("<br>") + (n > 8 ? "<br>…" : "") + "</li><li>Están sobre una circunferencia y forman un <b>polígono regular de " + n + " lados</b>: cada raíz es la anterior girada " + fmt(360 / n, 2) + "°.</li></ol>";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 3, ymin: -3, ymax: 3, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Las raíces n-ésimas forman un polígono regular" });
    var PRE = [[3, 8, 0, "∛8"], [2, 4, 180, "√(−4)"], [4, 16, 180, "⁴√(−16)"], [6, 1, 0, "⁶√1"], [5, 1, 0, "⁵√1"], [3, 27, 90, "∛(27i)"]];
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[3] }; }), "", function (k) { var p = PRE[+k]; st.n = p[0]; st.r = p[1]; st.t = p[2]; sN.set(p[0]); sR.set(p[1]); sT.set(p[2]); pinta(); });
    pinta();
  };

  // ============================================================
  // LUGAR: curvas y regiones del plano descritas con complejos
  // ============================================================
  B.w.lugar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Lugares geométricos con números complejos");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "circ", cx: 1, cy: 2, r: 2, k: 2, al: 45, ax: -2, ay: 0, bx: 2, by: 2 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var S = {};
    function sl(k, et, mn, mx, stp) { S[k] = U.slider(ctl, { et: et, min: mn, max: mx, step: stp, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    sl("cx", "Centro (Re)", -4, 4, 0.5); sl("cy", "Centro (Im)", -4, 4, 0.5); sl("r", "Radio", 0.5, 5, 0.5); sl("k", "Valor k", -4, 4, 0.5); sl("al", "Ángulo α", 0, 360, 15);
    sl("ax", "a (Re)", -4, 4, 0.5); sl("ay", "a (Im)", -4, 4, 0.5); sl("bx", "b (Re)", -4, 4, 0.5); sl("by", "b (Im)", -4, 4, 0.5);
    var MOSTRAR = { circ: ["cx", "cy", "r"], re: ["k"], im: ["k"], arg: ["al"], med: ["ax", "ay", "bx", "by"] };
    function pinta() {
      Object.keys(S).forEach(function (k) { S[k].el.style.display = MOSTRAR[st.modo].indexOf(k) >= 0 ? "" : "none"; });
      g.limpiar();
      var txt, cart, desc;
      if (st.modo === "circ") {
        g.arco(st.cx, st.cy, st.r, 0, 360, { clase: "c-red" }).setAttribute("stroke-width", 3); g.punto(st.cx, st.cy, { r: 5, clase: "c-pen" }); g.texto(st.cx, st.cy, "c", { dx: 7, dy: -7, clase: "pen" });
        txt = "|z − (" + C.txt(z(st.cx, st.cy), 1) + ")| = " + fmt(st.r, 1); cart = "(x " + (st.cx > 0 ? "− " + fmt(st.cx, 1) : st.cx < 0 ? "+ " + fmt(-st.cx, 1) : "") + ")² + (y " + (st.cy > 0 ? "− " + fmt(st.cy, 1) : st.cy < 0 ? "+ " + fmt(-st.cy, 1) : "") + ")² = " + fmt(st.r * st.r, 2); desc = "Circunferencia de centro c y radio r: los puntos a distancia r de c.";
      } else if (st.modo === "re") { g.segmento(st.k, -8, st.k, 8, { clase: "c-red" }).setAttribute("stroke-width", 3); txt = "Re(z) = " + fmt(st.k, 1); cart = "x = " + fmt(st.k, 1); desc = "Recta vertical: todos los complejos con la misma parte real."; }
      else if (st.modo === "im") { g.segmento(-8, st.k, 8, st.k, { clase: "c-red" }).setAttribute("stroke-width", 3); txt = "Im(z) = " + fmt(st.k, 1); cart = "y = " + fmt(st.k, 1); desc = "Recta horizontal: todos los complejos con la misma parte imaginaria."; }
      else if (st.modo === "arg") { var a = st.al * R; g.segmento(0, 0, 9 * Math.cos(a), 9 * Math.sin(a), { clase: "c-red" }).setAttribute("stroke-width", 3); g.arco(0, 0, 0.9, 0, st.al, { clase: "c-hl" }); txt = "arg(z) = " + st.al + "°"; cart = Math.abs(Math.cos(a)) < 1e-9 ? "x = 0, y > 0 o y < 0 según α" : "y = " + fmt(Math.tan(a), 3) + "·x  (con x " + (Math.cos(a) > 0 ? "> 0" : "< 0") + ")"; desc = "Semirrecta que sale del origen con el ángulo α (el origen no cuenta: su argumento no está definido)."; }
      else {
        var A = z(st.ax, st.ay), Bq = z(st.bx, st.by), mx = (A.a + Bq.a) / 2, my = (A.b + Bq.b) / 2, dx = Bq.a - A.a, dy = Bq.b - A.b;
        if (dx === 0 && dy === 0) { lectura.innerHTML = U.lec("Los dos puntos coinciden", "elige a ≠ b", "red"); return; }
        g.punto(A.a, A.b, { r: 6, clase: "c-pen" }); g.texto(A.a, A.b, "a", { dx: 7, dy: -7, clase: "pen" }); g.punto(Bq.a, Bq.b, { r: 6, clase: "c-pen" }); g.texto(Bq.a, Bq.b, "b", { dx: 7, dy: -7, clase: "pen" });
        g.segmento(A.a, A.b, Bq.a, Bq.b, { clase: "c-faint", dash: "3 4" }); g.punto(mx, my, { r: 4, clase: "c-ok" });
        g.segmento(mx - 9 * dy, my + 9 * dx, mx + 9 * dy, my - 9 * dx, { clase: "c-red" }).setAttribute("stroke-width", 3);
        txt = "|z − a| = |z − b|"; cart = fmt(2 * dx, 1) + "·x + " + fmt(2 * dy, 1) + "·y = " + fmt(Bq.a * Bq.a + Bq.b * Bq.b - A.a * A.a - A.b * A.b, 1); desc = "Mediatriz del segmento ab: los puntos que equidistan de a y de b.";
      }
      var m = 5.5; g.rangoIso(0, 0, m);
      lectura.innerHTML = U.lec("Condición", txt, "ok") + U.lec("En coordenadas (z = x + yi)", cart, "pen") + U.lec("Qué dibuja", desc);
      pie.innerHTML = "Una condición sobre el módulo, la parte real, la parte imaginaria o el argumento de z describe una figura del plano. Escribiendo z = x + yi y operando, se obtiene su ecuación cartesiana.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -5, xmax: 5, ymin: -5, ymax: 5, w: 420, h: 380, etx: "Re", ety: "Im", etiqueta: "Lugar geométrico en el plano complejo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "circ", t: "|z − c| = r" }, { k: "re", t: "Re z = k" }, { k: "im", t: "Im z = k" }, { k: "arg", t: "arg z = α" }, { k: "med", t: "|z − a| = |z − b|" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // MANDELBROT: z → z² + c, un fractal con complejos
  // ============================================================
  B.w.mandelbrot = function (host) {
    var cuerpo = B.caja(host, "Curiosidad", "El conjunto de Mandelbrot: z → z² + c");
    cuerpo.innerHTML = '<div class="mb-fila"><canvas class="mb-cv" width="360" height="270" role="img" aria-label="Conjunto de Mandelbrot: toca un punto para ver su órbita"></canvas><div class="w-plot mb-orb"></div></div><div class="lectura"></div><p class="w-pie"></p>';
    var cv = cuerpo.querySelector("canvas"), ctx = cv.getContext && cv.getContext("2d"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var X0 = -2.2, X1 = 0.8, Y0 = -1.125, Y1 = 1.125, MAXI = 60, st = { c: z(-0.2, 0.5) }, g;
    function iter(c, max) { var zz = z(0, 0), i = 0; while (i < max && zz.a * zz.a + zz.b * zz.b <= 4) { zz = z(zz.a * zz.a - zz.b * zz.b + c.a, 2 * zz.a * zz.b + c.b); i++; } return i; }
    function dibuja() {
      if (!ctx) return;
      var w = cv.width, h = cv.height, img = ctx.createImageData(w, h);
      for (var py = 0; py < h; py++) for (var px = 0; px < w; px++) {
        var c = z(X0 + (X1 - X0) * px / w, Y1 - (Y1 - Y0) * py / h), n = iter(c, MAXI), o = (py * w + px) * 4;
        if (n >= MAXI) { img.data[o] = 20; img.data[o + 1] = 24; img.data[o + 2] = 50; } else { var t = n / MAXI; img.data[o] = 240 * Math.min(1, t * 4); img.data[o + 1] = 200 * Math.min(1, t * 3); img.data[o + 2] = 120 + 135 * (1 - t); }
        img.data[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
    function marca() {
      if (!ctx) return;
      var px = (st.c.a - X0) / (X1 - X0) * cv.width, py = (Y1 - st.c.b) / (Y1 - Y0) * cv.height;
      ctx.beginPath(); ctx.arc(px, py, 6, 0, 2 * Math.PI); ctx.fillStyle = "#e0245e"; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    }
    function pinta() {
      dibuja(); marca();
      var zz = z(0, 0), orb = [zz], i = 0;
      while (i < 40 && zz.a * zz.a + zz.b * zz.b <= 100) { zz = z(zz.a * zz.a - zz.b * zz.b + st.c.a, 2 * zz.a * zz.b + st.c.b); orb.push(zz); i++; }
      var escapa = zz.a * zz.a + zz.b * zz.b > 4;
      g.limpiar();
      var m = 2.2; g.rangoIso(0, 0, m);
      var pts = orb.map(function (q) { return [Math.max(-9, Math.min(9, q.a)), Math.max(-9, Math.min(9, q.b))]; });
      g.polilinea(pts, { clase: "c-faint" });
      pts.forEach(function (q, k) { g.punto(q[0], q[1], { r: k === 0 ? 5 : 3.5, clase: k === 0 ? "c-ok" : escapa ? "c-red" : "c-pen" }); });
      lectura.innerHTML = U.lec("c elegido", C.txt(st.c, 3), "red") + U.lec("¿La órbita escapa?", escapa ? "sí: tras " + orb.length + " pasos |z| &gt; 2" : "no: se queda cerca del origen (c ∈ conjunto)", escapa ? "red" : "ok") + U.lec("z₁ · z₂ · z₃", orb.slice(1, 4).map(function (q) { return C.txt(q, 2); }).join(" ; "));
      pie.innerHTML = "Se parte de z₀ = 0 y se repite z → z² + c con el complejo c que tocas. Si los valores se mantienen acotados, c pertenece al <b>conjunto de Mandelbrot</b> (la zona oscura); si se escapan hacia infinito, se colorea según la rapidez con que lo hacen. Toda esa belleza sale de multiplicar y sumar números complejos.";
    }
    cv.addEventListener("pointerdown", function (e) {
      var rc = cv.getBoundingClientRect(), px = (e.clientX - rc.left) / rc.width, py = (e.clientY - rc.top) / rc.height;
      st.c = z(Math.round((X0 + (X1 - X0) * px) * 1000) / 1000, Math.round((Y1 - (Y1 - Y0) * py) * 1000) / 1000); pinta();
    });
    g = new B.Plot(cuerpo.querySelector(".mb-orb"), { xmin: -2.5, xmax: 2.5, ymin: -2.2, ymax: 2.2, w: 360, h: 270, etx: "Re", ety: "Im", etiqueta: "Órbita de 0 con la regla z → z² + c" });
    pinta();
  };
})(window);

/* ============================================================
   Bachi para Firu · laboratorio de equilibrio químico
   eqtiempo: cinética real (v directa = v inversa)
   equilibrio: simulador de perturbaciones (Le Chatelier con Q y Kc)
   El motor numérico (B.lab.eq) no toca el DOM: se puede comprobar aparte.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, fmt = B.fmt;
  B.lab = B.lab || {};
  var R_GAS = 8.314; // J/(mol·K)

  // ---------- reacciones de demostración (datos didácticos) ----------
  // nu < 0 reactivos, nu > 0 productos · dH en kJ por mol de reacción tal como está escrita
  var REAC = {
    nh3: { t: "N₂ + 3 H₂ ⇌ 2 NH₃", esp: [{ n: "N₂", nu: -1 }, { n: "H₂", nu: -3 }, { n: "NH₃", nu: 2 }],
      dH: -92.2, T0: 750, Kc0: 0.08, ini: [1, 3, 0], V0: 2, Tr: [600, 900, 5], Vr: [0.5, 4, 0.05], dn: 0.5, puntos: 10,
      nota: "Síntesis de Haber-Bosch: exotérmica (ΔH = −92,2 kJ). K<sub>c</sub> = 0,08 a 750 K (valor didáctico)." },
    hi: { t: "H₂ + I₂ ⇌ 2 HI", esp: [{ n: "H₂", nu: -1 }, { n: "I₂", nu: -1 }, { n: "HI", nu: 2 }],
      dH: -9.4, T0: 700, Kc0: 54, ini: [1, 1, 0], V0: 2, Tr: [500, 900, 5], Vr: [0.5, 4, 0.05], dn: 0.5, puntos: 20,
      nota: "Δn(gas) = 0: cambiar el volumen no desplaza el equilibrio. K<sub>c</sub> = 54 a 700 K, ΔH = −9,4 kJ (casi térmica neutra)." },
    no2: { t: "N₂O₄ ⇌ 2 NO₂", esp: [{ n: "N₂O₄", nu: -1 }, { n: "NO₂", nu: 2 }],
      dH: 57.2, T0: 298, Kc0: 4.6e-3, ini: [0.1, 0], V0: 1, Tr: [280, 400, 2], Vr: [0.25, 2, 0.05], dn: 0.05, puntos: 400,
      nota: "Endotérmica (ΔH = +57,2 kJ). N₂O₄ es incoloro y NO₂ pardo: ¡el color te chiva el equilibrio! K<sub>c</sub> = 4,6·10⁻³ a 298 K." }
  };
  var ORDEN = ["nh3", "hi", "no2"];

  // ============================================================
  // Motor numérico
  // ============================================================
  function Kc(R, T) { return R.Kc0 * Math.exp(-(R.dH * 1000 / R_GAS) * (1 / T - 1 / R.T0)); } // van 't Hoff
  function lnQ(R, n, V) {
    var s = 0;
    for (var i = 0; i < R.esp.length; i++) s += R.esp[i].nu * Math.log(Math.max(n[i] / V, 1e-300));
    return s;
  }
  // Avance ξ (mol) que lleva el sistema a Q = Kc. Q crece con ξ, así que basta bisección.
  function avance(R, n, V, T) {
    var lk = Math.log(Kc(R, T)), lo = -Infinity, hi = Infinity, i, lim;
    for (i = 0; i < R.esp.length; i++) {
      lim = -n[i] / R.esp[i].nu;
      if (R.esp[i].nu > 0) lo = Math.max(lo, lim); else hi = Math.min(hi, lim);
    }
    for (var k = 0; k < 200; k++) {
      var mid = (lo + hi) / 2, nn = n.map(function (v, j) { return v + R.esp[j].nu * mid; });
      if (lnQ(R, nn, V) < lk) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }
  function equilibrioDe(R, n, V, T) { var xi = avance(R, n, V, T); return n.map(function (v, i) { return Math.max(1e-9, v + R.esp[i].nu * xi); }); }
  function dnGas(R) { return R.esp.reduce(function (a, e) { return a + e.nu; }, 0); }
  B.lab.eq = { REAC: REAC, Kc: Kc, lnQ: lnQ, avance: avance, equilibrioDe: equilibrioDe, dnGas: dnGas };

  function sup(n) {
    var m = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return String(n).split("").map(function (c) { return m[c]; }).join("");
  }
  function fmtK(k) {
    if (k >= 0.01 && k < 1000) return fmt(k, k < 1 ? 4 : 2);
    var e = Math.floor(Math.log10(k)), m = k / Math.pow(10, e);
    return fmt(m, 2) + "·10" + sup(e);
  }
  function lec(r, v, c) { return '<div class="lec ' + (c || "") + '"><small>' + r + "</small><b>" + v + "</b></div>"; }
  var CLASES = ["c-pen", "c-red", "c-ok"];

  // ============================================================
  // EQTIEMPO: cinética real de H₂ + I₂ ⇌ 2HI (V = 1 L, 700 K)
  //   dξ/dt = k_d·[H₂][I₂] − k_i·[HI]²,  con k_i = k_d / K_c
  // ============================================================
  B.w.eqtiempo = function (host) {
    var cuerpo = B.caja(host, "Míralo", "El equilibrio se alcanza desde los dos lados");
    cuerpo.innerHTML = '<div class="chips"></div><div class="w-plot top"></div><div class="w-plot bot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var chips = cuerpo.querySelector(".chips"), pT = cuerpo.querySelector(".w-plot.top"), pB = cuerpo.querySelector(".w-plot.bot"), elLec = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var KC = 54, KD = 0.5, KI = KD / KC, TMAX = 18;
    var ESC = { r: { t: "Parto solo de reactivos (1 mol de H₂ y 1 mol de I₂)", c0: [1, 1, 0] }, p: { t: "Parto solo de producto (2 mol de HI)", c0: [0, 0, 2] } };

    function simular(c0) {
      var c = c0.slice(), t = 0, dt = 0.01, out = [];
      for (var i = 0; i <= TMAX / dt; i++) {
        var vd = KD * c[0] * c[1], vi = KI * c[2] * c[2];
        if (i % 10 === 0) out.push({ t: t, c: c.slice(), vd: vd, vi: vi });
        var xi = (vd - vi) * dt; c[0] -= xi; c[1] -= xi; c[2] += 2 * xi; t += dt;
      }
      return out;
    }
    function pinta(k) {
      var S = simular(ESC[k].c0), ult = S[S.length - 1];
      pT.innerHTML = ""; pB.innerHTML = "";
      var g1 = new B.Plot(pT, { xmin: 0, xmax: TMAX, ymin: 0, ymax: 2.1, w: 640, h: 230, etx: "t (s)", ety: "[ ] mol/L", etiqueta: "Concentraciones frente al tiempo" });
      var g2 = new B.Plot(pB, { xmin: 0, xmax: TMAX, ymin: 0, ymax: 0.55, w: 640, h: 190, etx: "t (s)", ety: "velocidad", etiqueta: "Velocidades de reacción directa e inversa" });
      [0, 1, 2].forEach(function (j) {
        if (j === 1) return; // [H₂] = [I₂]: se dibuja una sola
        g1.polilinea(S.map(function (s) { return [s.t, s.c[j]]; }), { clase: CLASES[j] });
        g1.horizontal(ult.c[j], { clase: "c-faint", dash: "3 5", capa: "fijo" });
      });
      g1.texto(0.4, 1.0, "[H₂] = [I₂]", { dy: -8, clase: "pen" }); g1.texto(TMAX - 0.3, ult.c[2], "[HI]", { dy: -8, ancla: "end", clase: "ok" });
      g2.polilinea(S.map(function (s) { return [s.t, s.vd]; }), { clase: "c-pen" });
      g2.polilinea(S.map(function (s) { return [s.t, s.vi]; }), { clase: "c-red" });
      g2.texto(1.1, S[110].vd, "v directa", { dx: 4, dy: -6, clase: "pen" }); g2.texto(TMAX - 0.3, ult.vi, "v inversa", { dy: -12, ancla: "end", clase: "red" });
      var ig = S.findIndex(function (s) { return s.t > 0.5 && Math.abs(s.vd - s.vi) < 0.03 * s.vd; });
      if (ig > 0) { g2.vertical(S[ig].t, { clase: "c-ok", dash: "5 4" }); g2.texto(S[ig].t, 0.38, "ya casi iguales", { dx: 6, clase: "ok" }); }
      var kfin = ult.c[2] * ult.c[2] / (ult.c[0] * ult.c[1]);
      elLec.innerHTML = lec("[H₂] = [I₂] final", fmt(ult.c[0], 3) + " mol/L", "pen") + lec("[HI] final", fmt(ult.c[2], 3) + " mol/L", "ok") + lec("v en el equilibrio (las dos)", fmt(ult.vd, 3), "") + lec("K<sub>c</sub> con los valores finales", fmt(kfin, 1), "red");
      pie.innerHTML = "Las concentraciones <b>dejan de cambiar</b> cuando v directa = v inversa. No son iguales entre sí: son constantes. Pruébalo desde el otro lado y comprueba que K<sub>c</sub> sale igual.";
    }
    var cur = "r";
    chips.innerHTML = Object.keys(ESC).map(function (k) { return '<button type="button" class="chip-btn' + (k === cur ? " on" : "") + '" data-k="' + k + '" aria-pressed="' + (k === cur) + '">' + ESC[k].t + "</button>"; }).join("");
    chips.onclick = function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      cur = b.getAttribute("data-k");
      Array.prototype.forEach.call(chips.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      pinta(cur);
    };
    pinta(cur);
  };

  // ============================================================
  // EQUILIBRIO: simulador de perturbaciones
  // ============================================================
  B.w.equilibrio = function (host) {
    var cuerpo = B.caja(host, "Laboratorio", "Perturba el equilibrio y mira qué pasa");
    cuerpo.innerHTML = '<div class="chips" data-reac></div><p class="eq-ec" data-ec></p>' +
      '<div class="eq-fila"><div class="eq-cil"><svg class="eq-svg" viewBox="0 0 170 205" role="img" aria-label="Recipiente con émbolo y partículas de cada sustancia"></svg></div><div class="eq-esp" data-esp></div></div>' +
      '<div class="ctl eq-ctl"><label>Temperatura <input type="range" data-T aria-label="Temperatura"> <span class="mv" data-Tv></span></label>' +
      '<label>Volumen <input type="range" data-V aria-label="Volumen del recipiente"> <span class="mv" data-Vv></span></label>' +
      '<button type="button" class="chip-btn" data-reset>↺ Reiniciar</button></div>' +
      '<div class="lectura" data-lec></div><div class="eq-gauge" aria-hidden="true"><span class="eq-g-et izq"><span class="eq-g-largo">Q &lt; K<sub>c</sub> → </span>productos</span><span class="eq-g-et cen">equilibrio</span><span class="eq-g-et der">reactivos<span class="eq-g-largo"> ← Q &gt; K<sub>c</sub></span></span><i class="eq-g-marca"></i></div>' +
      '<p class="eq-porque" data-porque aria-live="polite"></p><div class="w-plot"></div><p class="hint" data-nota></p>';
    var q = function (s) { return cuerpo.querySelector(s); };
    var elReac = q("[data-reac]"), elEc = q("[data-ec]"), elEsp = q("[data-esp]"), svgEl = q(".eq-svg"), sT = q("[data-T]"), sV = q("[data-V]"), vT = q("[data-Tv]"), vV = q("[data-Vv]");
    var elLec = q("[data-lec]"), marca = q(".eq-g-marca"), porque = q("[data-porque]"), elPlot = q(".w-plot"), nota = q("[data-nota]");
    var TAU = 1.5, VENTANA = 36, NS = "http://www.w3.org/2000/svg";
    var S, g, dots = [], ultimoDibujo = 0, ultimoT = null;

    // ----- estado -----
    function nAhora(t) {
      var k = 1 - Math.exp(-(t - S.tp) / TAU);
      return S.n0.map(function (v, i) { return v + (S.nT[i] - v) * k; });
    }
    function muestra(t, n, V, forzar) {
      var u = S.hist[S.hist.length - 1];
      if (!forzar && u && t - u.t < 0.08) return;
      S.hist.push({ t: t, c: n.map(function (v) { return v / V; }) });
      if (S.hist.length > 1500) S.hist.shift();
    }
    function inicia(k) {
      var R = REAC[k];
      S = { k: k, R: R, V: R.V0, T: R.T0, t: 0, tp: 0, n0: R.ini.map(function (v) { return Math.max(v, 1e-6); }), hist: [], marcas: [] };
      S.nT = equilibrioDe(R, S.n0, S.V, S.T);
      muestra(0, S.n0, S.V, true);
      S.porque = "<b>Empiezas solo con reactivos:</b> Q = 0 es menor que K<sub>c</sub>, así que el sistema evoluciona hacia los productos hasta que Q = K<sub>c</sub>.";
    }
    function sentido(n, V, T) {
      var d = lnQ(S.R, n, V) - Math.log(Kc(S.R, T));
      return Math.abs(d) < 0.01 ? 0 : d < 0 ? 1 : -1;
    }
    function frase(dir) {
      return dir > 0 ? "Ahora Q &lt; K<sub>c</sub>: el sistema evoluciona hacia los <b>productos</b> (→)." : dir < 0 ? "Ahora Q &gt; K<sub>c</sub>: el sistema evoluciona hacia los <b>reactivos</b> (←)." : "Q = K<sub>c</sub>: sigue en equilibrio.";
    }

    function perturba(ev, conMarca) {
      var R = S.R, t = S.t, antes = { n: nAhora(t), V: S.V, T: S.T }, txt, causa;
      muestra(t, antes.n, S.V, true);
      S.n0 = antes.n.slice();
      if (ev.tipo === "esp") {
        var e = R.esp[ev.i]; S.n0[ev.i] = Math.max(1e-6, S.n0[ev.i] + ev.d);
        txt = (ev.d > 0 ? "+" : "−") + fmt(Math.abs(ev.d), 2) + " mol " + e.n;
        causa = (ev.d > 0 ? "Has añadido " : "Has retirado ") + e.n + ": su concentración cambia y con ella Q.";
      } else if (ev.tipo === "V") {
        S.V = ev.v; txt = "V = " + fmt(ev.v, 2) + " L";
        var dn = dnGas(R);
        causa = (ev.v < antes.V ? "Has comprimido el recipiente (más presión)." : "Has ampliado el recipiente (menos presión).") +
          (dn === 0 ? " Como Δn(gas) = 0, Q no cambia: <b>no hay desplazamiento</b>." : " Δn(gas) = " + dn + " (" + (dn < 0 ? "menos" : "más") + " moles de gas en los productos), así que Q cambia.");
      } else {
        S.T = ev.v; txt = "T = " + Math.round(ev.v) + " K";
        var sube = Kc(R, ev.v) > Kc(R, antes.T);
        causa = (ev.v > antes.T ? "Has subido T." : "Has bajado T.") + " La reacción es " + (R.dH < 0 ? "exotérmica" : "endotérmica") + ", así que K<sub>c</sub> " + (sube ? "aumenta" : "disminuye") + " (Q no cambia en el instante).";
      }
      S.tp = t; S.nT = equilibrioDe(R, S.n0, S.V, S.T);
      muestra(t, S.n0, S.V, true);
      if (conMarca) { S.marcas.push({ t: t, txt: txt }); if (S.marcas.length > 12) S.marcas.shift(); }
      var yaEstabaEnEq = Math.abs(lnQ(R, antes.n, antes.V) - Math.log(Kc(R, antes.T))) < 0.05;
      S.porque = "<b>" + causa + "</b> " + frase(sentido(S.n0, S.V, S.T)) +
        (yaEstabaEnEq ? "" : " <small>(el sistema todavía no había terminado de llegar al equilibrio; espera unos segundos antes de perturbar para verlo limpio)</small>");
    }

    // ----- dibujo -----
    function svgEl_(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
    function montarSvg() {
      svgEl.innerHTML = "";
      S.cil = {};
      S.cil.fondo = svgEl_("rect", { x: 20, y: 10, width: 120, height: 170, "class": "eq-cuerpo" }, svgEl);
      S.cil.gas = svgEl_("rect", { x: 20, "class": "eq-gas", width: 120 }, svgEl);
      dots = S.R.esp.map(function (_, i) {
        var arr = [], semilla = (i + 1) * 7919;
        for (var j = 0; j < 70; j++) {
          semilla = (semilla * 16807) % 2147483647; var u = semilla / 2147483647;
          semilla = (semilla * 16807) % 2147483647; var v = semilla / 2147483647;
          arr.push({ u: u, v: v, el: svgEl_("circle", { r: 3.6, "class": "eq-dot d" + i }, svgEl) });
        }
        return arr;
      });
      S.cil.piston = svgEl_("rect", { x: 14, width: 132, height: 9, rx: 2, "class": "eq-piston" }, svgEl);
      S.cil.varilla = svgEl_("line", { x1: 80, x2: 80, y1: 2, "class": "eq-varilla" }, svgEl);
      S.cil.asa = svgEl_("line", { x1: 60, x2: 100, y1: 2, y2: 2, "class": "eq-varilla" }, svgEl);
      svgEl_("path", { d: "M20 10 V180 H140 V10", "class": "eq-pared" }, svgEl);
      S.cil.txtV = svgEl_("text", { x: 146, "class": "eq-txt", "text-anchor": "start", "font-size": 11 }, svgEl);
      S.cil.txtT = svgEl_("text", { x: 80, y: 198, "class": "eq-txt", "text-anchor": "middle" }, svgEl);
    }
    function pintaSvg(n) {
      var R = S.R, Hmax = 165, Hmin = 50, f = (S.V - R.Vr[0]) / (R.Vr[1] - R.Vr[0]), H = Hmin + (Hmax - Hmin) * f, yTop = 180 - H;
      S.cil.gas.setAttribute("y", yTop); S.cil.gas.setAttribute("height", H);
      S.cil.piston.setAttribute("y", yTop - 9); S.cil.varilla.setAttribute("y2", yTop - 9); S.cil.varilla.setAttribute("y1", 3); S.cil.asa.setAttribute("y1", 3); S.cil.asa.setAttribute("y2", 3);
      S.cil.txtV.setAttribute("y", yTop + 4); S.cil.txtV.textContent = fmt(S.V, 2) + " L";
      S.cil.txtT.textContent = "T = " + Math.round(S.T) + " K";
      // el NO₂ es pardo: el gas se oscurece al formarse
      var esNO2 = S.k === "no2";
      S.cil.gas.setAttribute("class", "eq-gas" + (esNO2 ? " pardo" : ""));
      S.cil.gas.style.fillOpacity = esNO2 ? Math.min(0.92, (n[1] / S.V) / 0.12) : 1;
      dots.forEach(function (arr, i) {
        var cnt = Math.min(70, Math.round(n[i] * R.puntos));
        arr.forEach(function (d, j) {
          if (j < cnt) { d.el.setAttribute("cx", 28 + d.u * 104); d.el.setAttribute("cy", 180 - 8 - d.v * (H - 16)); d.el.style.display = ""; } else d.el.style.display = "none";
        });
      });
    }
    function pintaEsp(n) {
      var R = S.R, cs = n.map(function (v) { return v / S.V; }), mx = Math.max.apply(null, cs) * 1.15 || 1;
      elEsp.innerHTML = R.esp.map(function (e, i) {
        return '<div class="eq-it"><i class="eq-pt d' + i + '"></i><span class="eq-nom">' + e.n + '</span><span class="eq-barra"><i class="d' + i + '" style="width:' + Math.min(100, 100 * cs[i] / mx) + '%"></i></span><b class="eq-c">' + fmt(cs[i], 3) + ' <small>mol/L</small></b>' +
          '<button type="button" class="chip-btn" data-add="' + i + '" data-s="-1" aria-label="Retirar ' + fmt(R.dn, 2) + ' mol de ' + e.n + '">−</button><button type="button" class="chip-btn" data-add="' + i + '" data-s="1" aria-label="Añadir ' + fmt(R.dn, 2) + ' mol de ' + e.n + '">+</button></div>';
      }).join("") + '<p class="eq-dn">Cada botón añade o retira ' + fmt(R.dn, 2) + " mol.</p>";
    }
    // pinta las barras sin reconstruir los botones (para no perder el foco mientras se anima)
    function actualizaBarras(n) {
      var cs = n.map(function (v) { return v / S.V; }), mx = Math.max.apply(null, cs) * 1.15 || 1, filas = elEsp.querySelectorAll(".eq-it");
      Array.prototype.forEach.call(filas, function (f, i) {
        f.querySelector(".eq-barra i").style.width = Math.min(100, 100 * cs[i] / mx) + "%";
        f.querySelector(".eq-c").innerHTML = fmt(cs[i], 3) + " <small>mol/L</small>";
      });
    }
    function pintaLec(n) {
      var Q = Math.exp(lnQ(S.R, n, S.V)), K = Kc(S.R, S.T), d = Math.log(Q / K);
      elLec.innerHTML = lec("Q", fmtK(Q), "pen") + lec("K<sub>c</sub> a " + Math.round(S.T) + " K", fmtK(K), "red") + lec("Δn (gas)", String(dnGas(S.R))) +
        lec("Tendencia", Math.abs(d) < 0.01 ? "equilibrio" : d < 0 ? "→ productos" : "← reactivos", Math.abs(d) < 0.01 ? "ok" : "");
      var pos = 50 + 50 * Math.max(-1, Math.min(1, d / 3));
      marca.style.left = pos + "%"; // Q pequeña (hacia productos) a la izquierda
    }
    function pintaGrafica(t, n) {
      var R = S.R, t0 = Math.max(0, t - VENTANA), t1 = Math.max(VENTANA, t), vis = S.hist.filter(function (h) { return h.t >= t0 - 1; });
      var mx = 0; vis.forEach(function (h) { h.c.forEach(function (c) { mx = Math.max(mx, c); }); });
      var ahora = n.map(function (v) { return v / S.V; }); ahora.forEach(function (c) { mx = Math.max(mx, c); });
      var paso = mx < 0.5 ? 0.1 : mx < 1 ? 0.2 : mx < 2.5 ? 0.5 : 1;
      var ymax = Math.max(paso * 2, Math.ceil(mx * 1.15 / paso) * paso);
      if (!S.ymax || Math.abs(S.ymax - ymax) / ymax > 0.02 || S.t0 !== Math.round(t0)) { S.ymax = ymax; S.t0 = Math.round(t0); g.rango(t0, t1, 0, ymax); }
      g.limpiar();
      S.marcas.forEach(function (m, i) {
        if (m.t < t0) return;
        g.vertical(m.t, { clase: "c-faint", dash: "3 4" });
        g.texto(m.t, ymax, m.txt, { dx: 4, dy: 14 + 15 * (i % 2), clase: "faint" });
      });
      R.esp.forEach(function (e, i) {
        var pts = vis.map(function (h) { return [h.t, h.c[i]]; }); pts.push([t, ahora[i]]);
        g.polilinea(pts, { clase: CLASES[i] });
        g.texto(t, ahora[i], e.n, { dx: -4, dy: -7, ancla: "end", clase: i === 0 ? "pen" : i === 1 ? "red" : "ok" });
      });
    }

    function configurarControles() {
      var R = S.R;
      sT.min = R.Tr[0]; sT.max = R.Tr[1]; sT.step = R.Tr[2]; sT.value = S.T;
      sV.min = R.Vr[0]; sV.max = R.Vr[1]; sV.step = R.Vr[2]; sV.value = S.V;
      vT.textContent = Math.round(S.T) + " K"; vV.textContent = fmt(S.V, 2) + " L";
      elEc.innerHTML = '<span class="eq-reac">' + R.t + "</span> <small>" + R.nota + "</small>";
      nota.innerHTML = R.dH < 0 ? "Prueba: sube la temperatura, comprime el recipiente, añade un reactivo… ¿hacia dónde se desplaza? Mira siempre Q y K<sub>c</sub>. (Espera a que se asiente antes de cada cambio.)" : "Prueba: sube la temperatura y fíjate en el color del gas (más NO₂ = más pardo). Comprime el recipiente: ¿qué lado tiene menos moles de gas?";
    }
    function reinicia(k) {
      inicia(k); montarSvg();
      elPlot.innerHTML = "";
      g = new B.Plot(elPlot, { xmin: 0, xmax: VENTANA, ymin: 0, ymax: 2, w: 640, h: 250, etx: "t", ety: "[ ] mol/L", etiqueta: "Concentraciones frente al tiempo" });
      S.ymax = 0; S.t0 = -1;
      configurarControles(); pintaEsp(nAhora(0));
      porque.innerHTML = S.porque;
    }

    // ----- eventos -----
    elReac.innerHTML = ORDEN.map(function (k, i) { return '<button type="button" class="chip-btn' + (i === 0 ? " on" : "") + '" data-k="' + k + '" aria-pressed="' + (i === 0) + '">' + REAC[k].t + "</button>"; }).join("");
    elReac.onclick = function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      Array.prototype.forEach.call(elReac.children, function (c) { var on = c === b; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
      reinicia(b.getAttribute("data-k"));
    };
    elEsp.addEventListener("click", function (e) {
      var b = e.target.closest("[data-add]"); if (!b) return;
      perturba({ tipo: "esp", i: +b.getAttribute("data-add"), d: +b.getAttribute("data-s") * S.R.dn }, true);
      porque.innerHTML = S.porque;
    });
    sT.addEventListener("input", function () { vT.textContent = Math.round(+sT.value) + " K"; perturba({ tipo: "T", v: +sT.value }, false); porque.innerHTML = S.porque; });
    sT.addEventListener("change", function () { S.marcas.push({ t: S.t, txt: "T = " + Math.round(+sT.value) + " K" }); });
    sV.addEventListener("input", function () { vV.textContent = fmt(+sV.value, 2) + " L"; perturba({ tipo: "V", v: +sV.value }, false); porque.innerHTML = S.porque; });
    sV.addEventListener("change", function () { S.marcas.push({ t: S.t, txt: "V = " + fmt(+sV.value, 2) + " L" }); });
    q("[data-reset]").addEventListener("click", function () { reinicia(S.k); });

    // ----- bucle de animación (se detiene si la actividad no se ve) -----
    function bucle(ts) {
      if (!host.isConnected) return;
      if (host.offsetParent !== null && !document.hidden) {
        if (ultimoT === null) ultimoT = ts;
        var dt = Math.min(0.1, (ts - ultimoT) / 1000); ultimoT = ts;
        S.t += dt;
        var n = nAhora(S.t);
        muestra(S.t, n, S.V);
        pintaSvg(n); actualizaBarras(n); pintaLec(n);
        if (ts - ultimoDibujo > 90) { ultimoDibujo = ts; pintaGrafica(S.t, n); porque.innerHTML = S.porque; }
      } else ultimoT = null;
      requestAnimationFrame(bucle);
    }
    reinicia("nh3");
    requestAnimationFrame(bucle);
  };

})(window);

/* ============================================================
   Bachi para Firu · laboratorio de números (Matemáticas I, tema 1)
   intervalos · opintervalos · valorabs · radicales · cientifica · errabs
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};

  // ---------- álgebra de intervalos (para operar y escribir) ----------
  // Un intervalo es { lo, hi, lc, hc }: extremos y si están incluidos (lc, hc). ±Infinity cuenta como abierto.
  function vacio(i) { return i.lo > i.hi || (i.lo === i.hi && !(i.lc && i.hc)); }
  function inter(a, b) {
    var lo, lc, hi, hc;
    if (a.lo > b.lo) { lo = a.lo; lc = a.lc; } else if (a.lo < b.lo) { lo = b.lo; lc = b.lc; } else { lo = a.lo; lc = a.lc && b.lc; }
    if (a.hi < b.hi) { hi = a.hi; hc = a.hc; } else if (a.hi > b.hi) { hi = b.hi; hc = b.hc; } else { hi = a.hi; hc = a.hc && b.hc; }
    return { lo: lo, hi: hi, lc: lc, hc: hc };
  }
  function une(a, b) {
    if (vacio(a)) return vacio(b) ? [] : [b];
    if (vacio(b)) return [a];
    var p = a.lo <= b.lo ? a : b, q = p === a ? b : a;                // p empieza antes
    var toca = q.lo < p.hi || (q.lo === p.hi && (p.hc || q.lc));
    if (!toca) return [p, q];
    var lo = Math.min(a.lo, b.lo), lc = a.lo === b.lo ? a.lc || b.lc : (a.lo < b.lo ? a.lc : b.lc);
    var hi = Math.max(a.hi, b.hi), hc = a.hi === b.hi ? a.hc || b.hc : (a.hi > b.hi ? a.hc : b.hc);
    return [{ lo: lo, hi: hi, lc: lc, hc: hc }];
  }
  function num(x) { return x === Infinity ? "+∞" : x === -Infinity ? "−∞" : fmt(x, 2); }
  function txt(i) {
    if (vacio(i)) return "∅";
    return (i.lc && isFinite(i.lo) ? "[" : "(") + num(i.lo) + ", " + num(i.hi) + (i.hc && isFinite(i.hi) ? "]" : ")");
  }
  function desig(i) {
    if (vacio(i)) return "sin solución";
    var l = isFinite(i.lo), r = isFinite(i.hi);
    if (l && r) return fmt(i.lo, 2) + (i.lc ? " ≤ " : " &lt; ") + "x" + (i.hc ? " ≤ " : " &lt; ") + fmt(i.hi, 2);
    if (l) return "x " + (i.lc ? "≥ " : "&gt; ") + fmt(i.lo, 2);
    if (r) return "x " + (i.hc ? "≤ " : "&lt; ") + fmt(i.hi, 2);
    return "cualquier x";
  }
  B.lab.intervalo = { inter: inter, une: une, txt: txt, vacio: vacio };

  // Punto de la recta: relleno si está incluido, hueco si no
  function punto(g, x, y, cerrado, color, o) {
    var p = g.punto(x, y, { r: (o && o.r) || 8, clase: "c-pen", capa: (o && o.capa) || "din" });
    p.style.fill = cerrado ? color : "var(--sheet)"; p.style.stroke = color; p.style.strokeWidth = 3;
    return p;
  }
  function tramo(g, a, b, y, color) {
    var l = g.segmento(a, y, b, y, { clase: "c-pen" });
    l.style.stroke = color; l.setAttribute("stroke-width", 9); l.style.strokeLinecap = "butt"; l.style.opacity = ".55";
    return l;
  }

  // ============================================================
  // INTERVALOS: arrastra los extremos y cambia si entran o no
  // ============================================================
  B.w.intervalos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Un intervalo en la recta real");
    cuerpo.innerHTML = '<div data-tipo></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { tipo: "acot", a: -2, b: 5, ca: true, cb: false, x0: 1 }, g, ha, hb;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), pie = cuerpo.querySelector(".w-pie"), lectura = cuerpo.querySelector(".lectura");
    var bA = U.boton(ctl, "", function () { st.ca = !st.ca; pinta(); }), bB = U.boton(ctl, "", function () { st.cb = !st.cb; pinta(); });
    var sl = U.slider(ctl, { et: "Un punto <i>x</i>", min: -8, max: 8, step: 0.1, val: st.x0, on: function (v) { st.x0 = v; pinta(); } });

    function intervalo() {
      return { lo: st.tipo === "izq" ? -Infinity : st.a, hi: st.tipo === "der" ? Infinity : st.b, lc: st.ca, hc: st.cb };
    }
    function pinta() {
      var I = intervalo(), color = "var(--ok)";
      g.limpiar();
      var xa = isFinite(I.lo) ? I.lo : -8, xb = isFinite(I.hi) ? I.hi : 8;
      tramo(g, xa, xb, 0, color);
      if (isFinite(I.lo)) { g.mover(ha, st.a, 0); ha.style.fill = st.ca ? color : "var(--sheet)"; ha.style.stroke = color; ha.style.display = ""; } else ha.style.display = "none";
      if (isFinite(I.hi)) { g.mover(hb, st.b, 0); hb.style.fill = st.cb ? color : "var(--sheet)"; hb.style.stroke = color; hb.style.display = ""; } else hb.style.display = "none";
      if (!isFinite(I.hi)) g.texto(7.6, 0, "+∞ →", { dy: -18, ancla: "end", clase: "ok" });
      if (!isFinite(I.lo)) g.texto(-7.6, 0, "← −∞", { dy: -18, ancla: "start", clase: "ok" });
      var dentro = !vacio(I) && (st.x0 > I.lo || (st.x0 === I.lo && I.lc)) && (st.x0 < I.hi || (st.x0 === I.hi && I.hc));
      g.punto(st.x0, 0.55, { r: 6, clase: dentro ? "c-ok" : "c-red" });
      g.texto(st.x0, 0.55, "x = " + fmt(st.x0, 1), { dy: -12, ancla: "middle", clase: dentro ? "ok" : "red" });
      bA.textContent = "Extremo izquierdo: " + (st.ca ? "cerrado [" : "abierto (");
      bB.textContent = "Extremo derecho: " + (st.cb ? "cerrado ]" : "abierto )");
      bA.style.display = st.tipo === "izq" ? "none" : ""; bB.style.display = st.tipo === "der" ? "none" : "";
      lectura.innerHTML = U.lec("Intervalo", txt(I), "pen") + U.lec("Desigualdad", desig(I)) + U.lec("En conjuntos", "{x ∈ ℝ : " + desig(I) + "}") +
        U.lec("¿x pertenece?", dentro ? "sí ✓" : "no ✗", dentro ? "ok" : "red");
      pie.textContent = "Círculo relleno = el extremo SÍ entra (corchete). Círculo hueco = NO entra (paréntesis). El infinito nunca entra: siempre va con paréntesis.";
    }
    function montar() {
      var el = cuerpo.querySelector(".w-plot"); el.innerHTML = "";
      g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -1.2, ymax: 1.2, w: 640, h: 150, sinY: true, etx: "", etiqueta: "Recta real con un intervalo marcado" });
      ha = g.punto(0, 0, { capa: "top", r: 10, clase: "c-pen" }); hb = g.punto(0, 0, { capa: "top", r: 10, clase: "c-pen" });
      ha.style.strokeWidth = 3; hb.style.strokeWidth = 3;
      g.arrastrar(ha, function (x) { st.a = Math.max(-7.5, Math.min(st.b - 0.5, Math.round(x * 2) / 2)); pinta(); }, { get: function () { return st.a; }, paso: 0.5, etiqueta: "Extremo izquierdo" });
      g.arrastrar(hb, function (x) { st.b = Math.min(7.5, Math.max(st.a + 0.5, Math.round(x * 2) / 2)); pinta(); }, { get: function () { return st.b; }, paso: 0.5, etiqueta: "Extremo derecho" });
      pinta();
    }
    U.fichas(cuerpo.querySelector("[data-tipo]"), [{ k: "acot", t: "(a, b) acotado" }, { k: "der", t: "(a, +∞) semirrecta →" }, { k: "izq", t: "(−∞, b) semirrecta ←" }], st.tipo, function (k) { st.tipo = k; pinta(); });
    void sl; montar();
  };

  // ============================================================
  // OPINTERVALOS: unión e intersección de dos intervalos
  // ============================================================
  B.w.opintervalos = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Unión e intersección de intervalos");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var A = { lo: -2, hi: 3, lc: true, hc: false }, Bb = { lo: 0, hi: 5, lc: false, hc: true }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura");
    var tg = [["A", A, "lc", "A: extremo izq."], ["A", A, "hc", "A: extremo der."], ["B", Bb, "lc", "B: extremo izq."], ["B", Bb, "hc", "B: extremo der."]].map(function (t) {
      var b = U.boton(ctl, "", function () { t[1][t[2]] = !t[1][t[2]]; pinta(); }); b._t = t; return b;
    });
    var ctl2 = U.ctl(cuerpo.querySelector("[data-ctl]"));
    function sli(et, I, k) { return U.slider(ctl2, { et: et, min: -7, max: 7, step: 0.5, val: I[k], on: function (v) { I[k] = v; if (I.lo > I.hi) { if (k === "lo") I.hi = v; else I.lo = v; } pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    var s = [sli("A desde", A, "lo"), sli("A hasta", A, "hi"), sli("B desde", Bb, "lo"), sli("B hasta", Bb, "hi")];
    function fila(I, y, color, nombre) {
      if (vacio(I)) { g.texto(-7.6, y, nombre + " = ∅", { dx: 0, dy: -10, clase: "faint" }); return; }
      tramo(g, I.lo, I.hi, y, color); punto(g, I.lo, y, I.lc, color, { r: 7 }); punto(g, I.hi, y, I.hc, color, { r: 7 });
      g.texto(-7.6, y, nombre, { dy: -12, clase: "faint" });
    }
    function pinta() {
      var I = inter(A, Bb), U2 = une(A, Bb);
      g.limpiar();
      fila(A, 2.4, "var(--pen)", "A"); fila(Bb, 1.3, "var(--red)", "B");
      fila(I, -0.9, "var(--ok)", "A ∩ B"); U2.forEach(function (u, i) { fila(u, -2.1, "var(--ok)", i ? "" : "A ∪ B"); });
      tg.forEach(function (b) { var t = b._t; b.textContent = t[3] + ": " + (t[1][t[2]] ? "incluido" : "no incluido"); });
      lectura.innerHTML = U.lec("A", txt(A), "pen") + U.lec("B", txt(Bb), "red") + U.lec("A ∩ B (en los dos)", vacio(I) ? "∅" : txt(I), "ok") + U.lec("A ∪ B (en alguno)", U2.length ? U2.map(txt).join(" ∪ ") : "∅", "ok");
    }
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -3, ymax: 3.2, w: 640, h: 270, sinY: true, etx: "", etiqueta: "Dos intervalos y su unión e intersección" });
    void s; pinta();
    cuerpo.querySelector(".w-pie").textContent = "Intersección: puntos que están en A y en B a la vez. Unión: puntos que están en A o en B (o en los dos). Un extremo solo entra si entra en todos los intervalos que lo comparten.";
  };

  // ============================================================
  // VALORABS: |x − a| como distancia
  // ============================================================
  B.w.valorabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El valor absoluto es una distancia");
    cuerpo.innerHTML = '<div data-ops></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { op: "lt", a: 2, k: 3, x0: 0 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sa = U.slider(ctl, { et: "Centro <i>a</i>", min: -5, max: 5, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sk = U.slider(ctl, { et: "Radio <i>k</i>", min: 0, max: 6, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sx = U.slider(ctl, { et: "Un punto <i>x</i>", min: -10, max: 10, step: 0.1, val: st.x0, on: function (v) { st.x0 = v; pinta(); } });
    var SIGNO = { eq: "=", lt: "&lt;", le: "≤", gt: "&gt;", ge: "≥" };
    function solucion() {
      var a = st.a, k = st.k, op = st.op, I = null;
      if (op === "lt") I = [{ lo: a - k, hi: a + k, lc: false, hc: false }];
      else if (op === "le") I = [{ lo: a - k, hi: a + k, lc: true, hc: true }];
      else if (op === "gt") I = [{ lo: -Infinity, hi: a - k, lc: false, hc: false }, { lo: a + k, hi: Infinity, lc: false, hc: false }];
      else if (op === "ge") I = [{ lo: -Infinity, hi: a - k, lc: false, hc: true }, { lo: a + k, hi: Infinity, lc: true, hc: false }];
      return I;
    }
    function cumple(x) {
      var d = Math.abs(x - st.a), e = 1e-9;
      return st.op === "eq" ? Math.abs(d - st.k) < e : st.op === "lt" ? d < st.k - e : st.op === "le" ? d <= st.k + e : st.op === "gt" ? d > st.k + e : d >= st.k - e;
    }
    function pinta() {
      var a = st.a, k = st.k, color = "var(--ok)", I = solucion();
      g.limpiar();
      g.segmento(a, 0.9, a + k, 0.9, { clase: "c-red" }); g.segmento(a, 0.9, a - k, 0.9, { clase: "c-red", dash: "5 4" });
      g.texto(a + k / 2, 0.9, "k = " + fmt(k, 1), { dy: -8, ancla: "middle", clase: "red" });
      if (st.op === "eq") { [a - k, a + k].forEach(function (x) { punto(g, x, 0, true, color); }); }
      else I.forEach(function (i) { tramo(g, Math.max(i.lo, -10), Math.min(i.hi, 10), 0, color); if (isFinite(i.lo)) punto(g, i.lo, 0, i.lc, color); if (isFinite(i.hi)) punto(g, i.hi, 0, i.hc, color); });
      g.punto(a, 0, { r: 5, clase: "c-ink" }); g.texto(a, 0, "a = " + fmt(a, 1), { dy: 40, ancla: "middle", clase: "faint" });
      var ok = cumple(st.x0), d = Math.abs(st.x0 - a);
      g.punto(st.x0, -0.65, { r: 6, clase: ok ? "c-ok" : "c-red" });
      g.segmento(a, -0.65, st.x0, -0.65, { clase: ok ? "c-ok" : "c-red", dash: "4 4" });
      g.texto(st.x0, -0.65, "x = " + fmt(st.x0, 1), { dy: 20, ancla: "middle", clase: ok ? "ok" : "red" });
      var sol = st.op === "eq" ? "x = " + fmt(a - k, 1) + "  ó  x = " + fmt(a + k, 1) : I.map(txt).join(" ∪ ");
      var ec = "|x " + (a < 0 ? "+ " + fmt(-a, 1) : a > 0 ? "− " + fmt(a, 1) : "") + "| " + SIGNO[st.op] + " " + fmt(k, 1);
      lectura.innerHTML = U.lec("Ecuación o inecuación", ec, "pen") + U.lec("Solución", sol, "ok") + U.lec("Distancia de x a a", fmt(d, 2)) + U.lec("¿x la cumple?", ok ? "sí ✓" : "no ✗", ok ? "ok" : "red");
      pie.innerHTML = st.op === "eq" ? "Dos puntos a distancia <b>k</b> de <b>a</b>: uno a cada lado." : (st.op === "lt" || st.op === "le") ? "«Distancia pequeña»: los puntos <b>cerca</b> de a forman un intervalo (entre a−k y a+k)." : "«Distancia grande»: los puntos <b>lejos</b> de a forman dos semirrectas.";
    }
    U.fichas(cuerpo.querySelector("[data-ops]"), [{ k: "eq", t: "|x − a| = k" }, { k: "lt", t: "|x − a| &lt; k" }, { k: "le", t: "|x − a| ≤ k" }, { k: "gt", t: "|x − a| &gt; k" }, { k: "ge", t: "|x − a| ≥ k" }], st.op, function (k) { st.op = k; pinta(); });
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -10, xmax: 10, ymin: -1.3, ymax: 1.5, w: 640, h: 190, sinY: true, etx: "", etiqueta: "Recta real: puntos a distancia k del centro a" });
    void sa; void sk; void sx; pinta();
  };

  // ============================================================
  // GRAFABS: y = |a·x − b| + c  (la «V» y sus trozos)
  // ============================================================
  B.w.grafabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La gráfica de y = |a·x − b| + c");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 2, b: 4, c: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function sl(et, k, mn, mx) { return U.slider(ctl, { et: et, min: mn, max: mx, step: 0.5, val: st[k], on: function (v) { st[k] = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } }); }
    sl("a", "a", -3, 3); sl("b", "b", -6, 6); sl("c", "c", -4, 4);
    function f(x) { return Math.abs(st.a * x - st.b) + st.c; }
    function pinta() {
      g.limpiar();
      g.curva(f, { clase: "c-pen" });
      var a = st.a, b = st.b, c = st.c, xv = a === 0 ? null : b / a;
      if (xv !== null) { g.punto(xv, c, { r: 6, clase: "c-red" }); g.texto(xv, c, "vértice (" + fmt(xv, 2) + ", " + fmt(c, 2) + ")", { dx: 10, dy: 22, clase: "red" }); g.vertical(xv, { clase: "c-faint", dash: "4 4" }); }
      var trozo1 = a === 0 ? "" : (a > 0 ? "x ≥ " : "x ≤ ") + fmt(xv, 2), trozo2 = a === 0 ? "" : (a > 0 ? "x &lt; " : "x &gt; ") + fmt(xv, 2);
      var lin = function (m, n) { return U.recta(m, n).replace("y = ", ""); };
      lectura.innerHTML = U.lec("Función", "|" + (a === 1 ? "" : a === -1 ? "−" : fmt(a, 1)) + "x " + (b < 0 ? "+ " + fmt(-b, 1) : "− " + fmt(b, 1)) + "|" + (c ? (c > 0 ? " + " : " − ") + fmt(Math.abs(c), 1) : ""), "pen") +
        (a === 0 ? U.lec("Es constante", fmt(Math.abs(b) + c, 1)) : U.lec("Trozo 1 (" + trozo1 + ")", lin(a, c - b), "ok") + U.lec("Trozo 2 (" + trozo2 + ")", lin(-a, c + b), "red"));
      pie.innerHTML = a === 0 ? "Con a = 0 no hay «V»: es una recta horizontal." : "El vértice está donde se anula lo de dentro: <b>x = b/a</b>. A la derecha (si a &gt; 0) se quitan las barras tal cual; a la izquierda se cambia el signo de lo de dentro. El parámetro <b>c</b> sube o baja la «V».";
    }
    var el = cuerpo.querySelector(".w-plot");
    g = new B.Plot(el, { xmin: -8, xmax: 8, ymin: -5, ymax: 11, w: 640, h: 300, etiqueta: "Gráfica de y = |a x − b| + c" });
    pinta();
  };

  // ============================================================
  // RADICALES: entrenador con ejercicios infinitos
  // ============================================================
  function mcd(a, b) { return b ? mcd(b, a % b) : a; }
  function azar(l) { return l[Math.floor(Math.random() * l.length)]; }
  var LIBRES = [2, 3, 5, 6, 7, 10, 11];
  var GEN = {
    simplificar: function () {
      var f = azar([2, 3, 4, 5, 6, 7]), g = azar(LIBRES.slice(0, 6)), n = f * f * g;
      return { enun: "Simplifica √" + n, campos: [{ et: "a =", v: f }, { et: "b =", v: g }], forma: "El resultado es a√b, con b sin cuadrados dentro.",
        pasos: ["Descomponemos " + n + " buscando un cuadrado perfecto: " + n + " = " + (f * f) + " · " + g + " = " + f + "² · " + g, "√" + n + " = √(" + f + "²·" + g + ") = " + f + "·√" + g, "<b>√" + n + " = " + f + "√" + g + "</b>"] };
    },
    racionalizar: function () {
      var b = azar([2, 3, 5, 6, 7]), a = azar([2, 3, 4, 5, 6, 8, 9, 10, 12]), d = mcd(a, b), p = a / d, q = b / d;
      return { enun: "Racionaliza " + a + "/√" + b + " y escríbelo como (p/q)·√" + b, campos: [{ et: "p =", v: p }, { et: "q =", v: q }], forma: "Fracción irreducible p/q (si q = 1, escribe 1).",
        pasos: ["Multiplicamos arriba y abajo por √" + b + ": " + a + "/√" + b + " = (" + a + "·√" + b + ")/(√" + b + "·√" + b + ") = " + a + "√" + b + "/" + b, "Simplificamos la fracción " + a + "/" + b + (d > 1 ? " dividiendo entre " + d + ": " + p + "/" + q : " (ya es irreducible)"), "<b>" + a + "/√" + b + " = " + (q === 1 ? p : p + "/" + q) + "√" + b + "</b>"] };
    },
    suma: function () {
      var g = azar([2, 3, 5]), fs = [azar([1, 2, 3]), azar([2, 3, 4]), azar([3, 4, 5])], cs = [azar([1, 2, 3]), azar([1, 2, 3]), azar([1, 2, 3])], sg = [1, azar([1, -1]), azar([1, -1])], tot = 0, t = [], pasos1 = [], pasos2 = [];
      for (var i = 0; i < 3; i++) {
        var n = fs[i] * fs[i] * g;
        t.push((i ? (sg[i] > 0 ? " + " : " − ") : "") + (cs[i] === 1 ? "" : cs[i]) + "√" + n);
        pasos1.push((cs[i] === 1 ? "" : cs[i] + "·") + "√" + n + " = " + (cs[i] === 1 ? "" : cs[i] + "·") + fs[i] + "√" + g + " = " + (cs[i] * fs[i]) + "√" + g);
        tot += sg[i] * cs[i] * fs[i];
        pasos2.push((i ? (sg[i] > 0 ? "+ " : "− ") : "") + (cs[i] * fs[i]));
      }
      return { enun: "Calcula " + t.join(""), campos: [{ et: "a =", v: tot }, { et: "b =", v: g }], forma: "El resultado es a√b (a puede ser negativo).",
        pasos: ["Simplificamos cada raíz hasta que todas tengan √" + g + ":<br>" + pasos1.join("<br>"), "Sumamos los coeficientes (radicales semejantes): " + pasos2.join(" ") + " = " + tot, "<b>Resultado: " + tot + "√" + g + "</b>"] };
    }
  };
  B.lab.radicalesGen = GEN;

  B.w.radicales = function (host) {
    var cuerpo = B.caja(host, "Entrenador", "Radicales: simplificar, sumar y racionalizar");
    cuerpo.innerHTML = '<div data-modo></div><div class="dv-enun"></div><form class="dv-form" novalidate><div class="bx-campos" data-campos></div><button type="submit" class="btn-comprobar">Comprobar</button><button type="button" class="chip-btn" data-ver>Ver pasos</button><button type="button" class="chip-btn" data-nuevo>Otro ejercicio</button></form><p class="dv-lee" data-forma></p><div class="bx-res" aria-live="polite"></div><p class="dv-pie"></p>';
    var st = { modo: "simplificar", ej: null, racha: 0, ok: 0 }, enun = cuerpo.querySelector(".dv-enun"), campos = cuerpo.querySelector("[data-campos]"), res = cuerpo.querySelector(".bx-res"), pie = cuerpo.querySelector(".dv-pie"), forma = cuerpo.querySelector("[data-forma]");
    function nuevo() {
      st.ej = GEN[st.modo](); res.className = "bx-res"; res.innerHTML = "";
      enun.innerHTML = '<span class="dv-f">' + st.ej.enun + "</span>";
      campos.innerHTML = st.ej.campos.map(function (c, i) { return '<label class="bx-campo"><span class="bx-et">' + c.et + '</span><input type="text" data-k="' + i + '" autocomplete="off" inputmode="numeric" style="width:90px"><span class="bx-mk" aria-hidden="true"></span></label>'; }).join("");
      forma.textContent = st.ej.forma; pinta();
    }
    function pinta() { pie.textContent = "Racha: " + st.racha + " · Acertados en esta sesión: " + st.ok; }
    cuerpo.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var bien = 0;
      st.ej.campos.forEach(function (c, i) {
        var inp = cuerpo.querySelector('[data-k="' + i + '"]'), v = B.Mate.numero(inp.value), ok = !isNaN(v) && Math.abs(v - c.v) < 1e-9, lab = inp.closest(".bx-campo");
        lab.classList.toggle("ok", ok); lab.classList.toggle("mal", !ok); if (ok) bien++;
      });
      if (bien === st.ej.campos.length) { st.racha++; st.ok++; res.className = "bx-res ok"; res.innerHTML = "<b>✓ ¡Correcto!</b> <button type=\"button\" class=\"btn-comprobar\" data-nuevo>Siguiente →</button>"; }
      else { st.racha = 0; res.className = "bx-res mal"; res.innerHTML = "<b>Todavía no.</b> Pulsa «Ver pasos» si te atascas."; }
      pinta();
    });
    cuerpo.addEventListener("click", function (e) {
      if (e.target.closest("[data-nuevo]")) nuevo();
      if (e.target.closest("[data-ver]")) { st.racha = 0; res.className = "bx-res"; res.innerHTML = '<div class="bx-pista">' + st.ej.pasos.map(function (p, i) { return "<b>Paso " + (i + 1) + ":</b> " + p; }).join("<br>") + "</div>"; pinta(); }
    });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "simplificar", t: "Simplificar √n" }, { k: "suma", t: "Sumar radicales" }, { k: "racionalizar", t: "Racionalizar a/√b" }], st.modo, function (k) { st.modo = k; nuevo(); });
    nuevo();
  };

  // ============================================================
  // CIENTIFICA: notación científica con órdenes de magnitud reales
  // ============================================================
  var ORDENES = [
    [-10, "el tamaño de un átomo (≈ 10⁻¹⁰ m)"], [-7, "la longitud de onda de la luz visible (≈ 5·10⁻⁷ m)"], [-5, "un glóbulo rojo (≈ 8·10⁻⁶ m)"],
    [-3, "una hormiga (≈ 4·10⁻³ m)"], [0, "una persona (≈ 1,7 m)"], [3, "el Everest (≈ 8,8·10³ m)"], [6, "el radio de la Tierra (≈ 6,4·10⁶ m)"],
    [8, "la distancia Tierra–Luna (≈ 3,8·10⁸ m)"], [11, "la distancia Tierra–Sol (≈ 1,5·10¹¹ m)"], [16, "un año luz (≈ 9,5·10¹⁵ m)"]
  ];
  function decimal(a, n) {          // a·10ⁿ escrito en decimal (a con una cifra decimal)
    var m = String(Math.round(a * 10)), e = n - 1, ent, dec = "";
    if (e >= 0) ent = m + new Array(e + 1).join("0");
    else if (-e < m.length) { ent = m.slice(0, m.length + e); dec = m.slice(m.length + e); }
    else { ent = "0"; dec = new Array(-e - m.length + 1).join("0") + m; }
    dec = dec.replace(/0+$/, "");
    return ent.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? "," + dec : "");
  }
  B.w.cientifica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Notación científica: mueve la coma");
    cuerpo.innerHTML = '<div data-ctl></div><div class="cs-num"></div><div class="lectura"></div><p class="w-pie"></p><hr class="cs-hr"><p class="w-intro"><b>Al revés:</b> escribe un número decimal y te lo paso a notación científica.</p><form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">Número</span><input type="text" autocomplete="off" inputmode="decimal" placeholder="por ejemplo 0,00032 ó 45000000"></label><button type="submit" class="btn-comprobar">Convertir</button></form><div class="bx-res cs-res" aria-live="polite"></div>';
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), big = cuerpo.querySelector(".cs-num"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var st = { a: 4.5, n: 7 };
    U.slider(ctl, { et: "Mantisa <i>a</i>", min: 1, max: 9.9, step: 0.1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Exponente <i>n</i>", min: -10, max: 16, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: function (v) { return String(v); } });
    function pinta() {
      var a = Math.round(st.a * 10) / 10, n = st.n, cerca = ORDENES.reduce(function (m, o) { return Math.abs(o[0] - n) < Math.abs(m[0] - n) ? o : m; });
      big.innerHTML = '<div class="cs-linea"><span class="cs-lab">Científica</span><b>' + fmt(a, 1) + " × 10<sup>" + n + "</sup></b></div><div class=\"cs-linea\"><span class=\"cs-lab\">Decimal</span><b class=\"cs-dec\">" + decimal(a, n) + "</b></div>";
      lectura.innerHTML = U.lec("Coma", n === 0 ? "sin mover" : (n > 0 ? "→ " + n + " lugares a la derecha" : "← " + (-n) + " lugares a la izquierda")) + U.lec("Cifras significativas", String(String(Math.round(a * 10)).replace(/0+$/, "").length)) + U.lec("Orden de magnitud", "10" + U.sup(n + (a >= 5 ? 1 : 0)), "pen");
      pie.innerHTML = "Orden de magnitud parecido a: <b>" + cerca[1] + "</b>.";
    }
    pinta();
    cuerpo.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var raw = cuerpo.querySelector("input[type=text]").value.replace(/\./g, "").replace(",", "."), v = parseFloat(raw), r = cuerpo.querySelector(".cs-res");
      if (!isFinite(v) || v === 0) { r.className = "bx-res mal cs-res"; r.textContent = "Escribe un número distinto de 0 (con coma decimal si quieres)."; return; }
      var n = Math.floor(Math.log10(Math.abs(v)) + 1e-12), a = v / Math.pow(10, n);
      r.className = "bx-res ok cs-res";
      r.innerHTML = "<b>" + fmt(a, 6) + " × 10<sup>" + n + "</sup></b> — la coma se ha movido " + Math.abs(n) + " lugares hacia la " + (n > 0 ? "izquierda (exponente positivo: número grande)" : n < 0 ? "derecha (exponente negativo: número pequeño)" : "izquierda… 0 lugares") + ". La mantisa cumple 1 ≤ a &lt; 10.";
    });
  };

  // ============================================================
  // ERRABS: error absoluto y relativo
  // ============================================================
  B.w.errabs = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Error absoluto y error relativo");
    cuerpo.innerHTML = '<div data-pre></div><form class="dv-form" novalidate><label class="bx-campo"><span class="bx-et">Valor real</span><input type="text" data-r autocomplete="off" style="width:130px"></label><label class="bx-campo"><span class="bx-et">Aproximación</span><input type="text" data-m autocomplete="off" style="width:130px"></label><button type="submit" class="btn-comprobar">Calcular</button></form><div class="lectura"></div><p class="w-pie"></p>';
    var PRE = [
      { k: "cuerda", t: "Cuerda de 10 m, medida 9,8 m", r: "10", m: "9,8" },
      { k: "viaje", t: "Madrid–Barcelona 505 km, medido 504 km", r: "505", m: "504" },
      { k: "pi", t: "π ≈ 22/7", r: "pi", m: "22/7" },
      { k: "raiz", t: "√2 ≈ 1,41", r: "sqrt(2)", m: "1,41" }
    ];
    var form = cuerpo.querySelector("form"), ir = form.querySelector("[data-r]"), im = form.querySelector("[data-m]"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function calcula() {
      var R = B.Mate.numero(ir.value), M = B.Mate.numero(im.value);
      if (isNaN(R) || isNaN(M) || R === 0) { lectura.innerHTML = U.lec("Revisa", "los valores no son válidos"); return; }
      var ea = Math.abs(R - M), er = ea / Math.abs(R);
      lectura.innerHTML = U.lec("Valor real", fmt(R, 6)) + U.lec("Aproximación", fmt(M, 6)) + U.lec("Error absoluto |real − aprox.|", fmt(ea, 6), "red") + U.lec("Error relativo (÷ real)", fmt(er, 6), "pen") + U.lec("En porcentaje", fmt(er * 100, 4) + " %", "pen");
      pie.innerHTML = "El <b>error relativo</b> compara el error con el tamaño de lo que mides: " + (er < 0.005 ? "es muy pequeño (menos del 0,5 %): buena aproximación." : er < 0.05 ? "es pequeño (menos del 5 %)." : "es notable (más del 5 %): la aproximación es floja.");
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p) { return { k: p.k, t: p.t }; }), "cuerda", function (k) {
      var p = PRE.filter(function (x) { return x.k === k; })[0]; ir.value = p.r; im.value = p.m; calcula();
    });
    ir.value = "10"; im.value = "9,8";
    form.addEventListener("submit", function (e) { e.preventDefault(); calcula(); });
    ir.addEventListener("input", calcula); im.addEventListener("input", calcula);
    calcula();
  };

})(window);

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

/* ============================================================
   Bachi para Firu · laboratorio de sucesiones (Matemáticas I, tema 2)
   sucesion · aritmetica · geometrica · rebote · fibonacci
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, Mate = B.Mate;
  B.lab = B.lab || {};

  // Evalúa los n primeros términos de una sucesión definida por una expresión de n
  function terminos(f, n) { var t = []; for (var i = 1; i <= n; i++) { var v = f(i); t.push(isFinite(v) ? v : NaN); } return t; }
  function monotonia(t) {
    var cre = true, dec = true, eps = 1e-12;
    for (var i = 1; i < t.length; i++) { if (isNaN(t[i]) || isNaN(t[i - 1])) return "no definida"; if (t[i] < t[i - 1] - eps) cre = false; if (t[i] > t[i - 1] + eps) dec = false; }
    return cre && dec ? "constante" : cre ? "creciente" : dec ? "decreciente" : "no monótona";
  }
  B.lab.sucesiones = { terminos: terminos, monotonia: monotonia };

  // ============================================================
  // SUCESION: explorador general
  // ============================================================
  B.w.sucesion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Explora una sucesión");
    cuerpo.innerHTML = '<div data-modo></div><div data-pre class="chips"></div><div data-ctl></div><div class="w-plot"></div><div class="lectura"></div><p class="w-pie"></p>';
    var PRE = [["2n+1", "2n + 1"], ["n^2", "n²"], ["(-1)^n", "(−1)ⁿ"], ["n/(n+1)", "n/(n+1)"], ["1/n", "1/n"], ["(2n-1)/(n+1)", "(2n−1)/(n+1)"], ["2^n", "2ⁿ"], ["(1+1/n)^n", "(1 + 1/n)ⁿ"], ["n*(-1)^n", "n·(−1)ⁿ"]];
    var st = { modo: "general", expr: "n/(n+1)", N: 15, a1: 2, p: 1, q: 3 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var campoExpr = document.createElement("label"); campoExpr.className = "bx-campo";
    campoExpr.innerHTML = '<span class="bx-et">aₙ =</span><input type="text" autocomplete="off" spellcheck="false" style="width:210px" value="' + st.expr + '" aria-label="Término general aₙ">';
    ctl.appendChild(campoExpr);
    var inp = campoExpr.querySelector("input");
    var sN = U.slider(ctl, { et: "Términos <i>N</i>", min: 5, max: 30, step: 1, val: st.N, on: function (v) { st.N = v; pinta(); }, fmt: function (v) { return String(v); } });
    var sA = U.slider(ctl, { et: "a₁", min: -5, max: 5, step: 0.5, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sP = U.slider(ctl, { et: "p", min: -2, max: 2, step: 0.1, val: st.p, on: function (v) { st.p = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    var sQ = U.slider(ctl, { et: "q", min: -5, max: 5, step: 0.5, val: st.q, on: function (v) { st.q = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });

    function serie(n) {
      if (st.modo === "general") { var r = Mate.compilar(st.expr); if (!r.ok) return { error: r.error }; return { t: terminos(r.f, n) }; }
      var t = [], a = st.a1;
      if (st.modo === "fib") { t = [1, 1]; for (var i = 2; i < n; i++) t.push(t[i - 1] + t[i - 2]); return { t: t.slice(0, n) }; }
      for (var k = 0; k < n; k++) { t.push(a); a = st.p * a + st.q; }
      return { t: t };
    }
    function pinta() {
      campoExpr.style.display = st.modo === "general" ? "" : "none"; cuerpo.querySelector("[data-pre]").style.display = st.modo === "general" ? "" : "none";
      [sA, sP, sQ].forEach(function (s) { s.el.style.display = st.modo === "rec" ? "" : "none"; });
      sN.el.style.display = "";
      var res = serie(st.N);
      if (res.error) { lectura.innerHTML = U.lec("Error", res.error, "red"); return; }
      var t = res.t, largo = serie(400).t, vals = t.filter(isFinite);
      var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), pad = (mx - mn || 1) * 0.15;
      g.rango(0, st.N + 1, Math.min(mn, 0) - pad, Math.max(mx, 0) + pad);
      g.limpiar();
      t.forEach(function (v, i) { if (isFinite(v)) g.punto(i + 1, v, { r: 5, clase: "c-pen" }); });
      var m = monotonia(largo.slice(0, 60)), lv = largo.filter(isFinite), nfin = lv.length === largo.length;
      var max100 = Math.max.apply(null, largo.slice(0, 100).filter(isFinite).map(Math.abs)), max400 = Math.max.apply(null, lv.map(Math.abs));
      var acot = nfin && max400 <= 2 * max100 + 1e-9, cmax = Math.max.apply(null, lv), cmin = Math.min.apply(null, lv);
      var l4 = largo[399], l3 = largo[398], l2 = largo[199], conv = nfin && Math.abs(l4 - l3) < 1e-2 * Math.max(1, Math.abs(l4)) && Math.abs(l4 - l2) < 1e-2 * Math.max(1, Math.abs(l4));
      var l8 = serie(800).t[799];
      var diverge = !conv && (!nfin || (Math.abs(l4) > 100 && Math.abs(l4) > 1.5 * Math.abs(l2)));
      if (conv) g.horizontal(l8, { clase: "c-red", dash: "5 4" });
      lectura.innerHTML = U.lec("Primeros términos", t.slice(0, 6).map(function (v) { return fmt(v, 3); }).join(", ") + "…") + U.lec("Monotonía", m, m.indexOf("no") === 0 ? "red" : "ok") +
        U.lec("¿Acotada?", acot ? "parece que sí: entre " + fmt(cmin, 2) + " y " + fmt(cmax, 2) : "no (crece sin límite)", acot ? "pen" : "red") + U.lec("Tendencia", conv ? "converge a ≈ " + fmt(l8, 2) : (diverge ? "diverge (no se aquieta)" : "no converge (oscila)"), conv ? "ok" : "red");
      pie.innerHTML = st.modo === "rec" ? "Cada término sale del anterior: <b>aₙ₊₁ = p·aₙ + q</b>. Con p = 1 es una progresión aritmética (d = q); con q = 0 es geométrica (r = p)." : st.modo === "fib" ? "Fibonacci: cada término es la suma de los dos anteriores (1, 1, 2, 3, 5, 8, …)." : "Escribe cualquier expresión con <b>n</b>, por ejemplo <code>2n+1</code> o <code>(-1)^n</code>. Monotonía, cotas y tendencia se estiman con los primeros 400 términos: son una pista, no una demostración.";
    }
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "general", t: "Término general aₙ" }, { k: "rec", t: "Por recurrencia" }, { k: "fib", t: "Fibonacci" }], st.modo, function (k) { st.modo = k; pinta(); });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p) { return { k: p[0], t: p[1] }; }), st.expr, function (k) { st.expr = k; inp.value = k; pinta(); });
    inp.addEventListener("input", function () { st.expr = inp.value; pinta(); });
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 16, ymin: -1, ymax: 2, w: 640, h: 300, etx: "n", ety: "aₙ", etiqueta: "Términos de la sucesión" });
    pinta();
  };

  // ============================================================
  // ARITMETICA: la demostración visual de Gauss
  // ============================================================
  B.w.aritmetica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La suma de una progresión aritmética (el truco de Gauss)");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a1: 2, d: 2, n: 8 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Primer término <i>a₁</i>", min: 1, max: 10, step: 1, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Diferencia <i>d</i>", min: 0, max: 4, step: 1, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Términos <i>n</i>", min: 2, max: 16, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    function pinta() {
      var a1 = st.a1, d = st.d, n = st.n, an = a1 + (n - 1) * d, tope = a1 + an, S = n * tope / 2;
      g.rango(0, n + 1, 0, tope * 1.12);
      g.limpiar();
      for (var i = 1; i <= n; i++) {
        var ai = a1 + (i - 1) * d, bi = a1 + (n - i) * d;     // término i y el que lo completa (el de la posición n+1−i)
        g.rect(i - 0.42, 0, i + 0.42, ai, { clase: "z-pen", borde: "var(--pen)" });
        g.rect(i - 0.42, ai, i + 0.42, ai + bi, { clase: "z-red", borde: "var(--red)" });
      }
      g.horizontal(tope, { clase: "c-ok", dash: "5 4" });
      g.texto(n + 0.4, tope, "a₁ + aₙ = " + tope, { dx: -4, dy: -8, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("aₙ = a₁ + (n−1)·d", an, "pen") + U.lec("Cada columna (azul + rojo)", tope, "ok") + U.lec("Dos copias = n·(a₁+aₙ)", n + " × " + tope + " = " + (n * tope)) + U.lec("Sₙ = n·(a₁+aₙ)/2", S, "red");
      pie.innerHTML = "Las barras <b style='color:var(--pen)'>azules</b> son los términos. Pegándoles encima la misma lista <b style='color:var(--red)'>al revés</b>, todas las columnas miden lo mismo (a₁ + aₙ), y sale un rectángulo de <b>n × (a₁+aₙ)</b>. Como ese rectángulo contiene la suma <em>dos veces</em>, Sₙ es su mitad.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 9, ymin: 0, ymax: 10, w: 640, h: 300, etx: "n", ety: "", etiqueta: "Barras de una progresión aritmética y su copia invertida" });
    pinta();
  };

  // ============================================================
  // GEOMETRICA: términos y sumas parciales
  // ============================================================
  B.w.geometrica = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Progresión geométrica: términos y suma");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a1: 4, r: 0.5, n: 12 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Primer término <i>a₁</i>", min: -8, max: 8, step: 1, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Razón <i>r</i>", min: -1.5, max: 1.5, step: 0.1, val: st.r, on: function (v) { st.r = Math.round(v * 10) / 10; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Términos <i>n</i>", min: 3, max: 25, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    function pinta() {
      var a1 = st.a1, r = st.r, n = st.n, t = [], S = [], s = 0, i;
      for (i = 0; i < n; i++) { var a = a1 * Math.pow(r, i); t.push(a); s += a; S.push(s); }
      var vals = t.concat(S), mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), inf = Math.abs(r) < 1 ? a1 / (1 - r) : null;
      if (inf !== null) { mn = Math.min(mn, inf); mx = Math.max(mx, inf); }
      var pad = (mx - mn || 1) * 0.15;
      g.rango(0, n + 1, Math.min(mn, 0) - pad, Math.max(mx, 0) + pad);
      g.limpiar();
      if (inf !== null) { g.horizontal(inf, { clase: "c-ok", dash: "6 4" }); g.texto(n + 0.5, inf, "S∞ = " + fmt(inf, 3), { dy: -8, ancla: "end", clase: "ok" }); }
      g.polilinea(S.map(function (v, k) { return [k + 1, v]; }), { clase: "c-red" });
      t.forEach(function (v, k) { g.punto(k + 1, v, { r: 5, clase: "c-pen" }); g.punto(k + 1, S[k], { r: 3.5, clase: "c-red" }); });
      var Sn = r === 1 ? a1 * n : a1 * (Math.pow(r, n) - 1) / (r - 1);
      lectura.innerHTML = U.lec("aₙ = a₁·rⁿ⁻¹", U.cient(t[n - 1], 4), "pen") + U.lec("Sₙ = a₁(rⁿ−1)/(r−1)", U.cient(Sn, 4), "red") +
        U.lec("Suma de infinitos términos", inf === null ? "no existe (|r| ≥ 1)" : "a₁/(1−r) = " + fmt(inf, 4), inf === null ? "" : "ok");
      pie.innerHTML = inf === null ? "Con |r| ≥ 1 los términos no se hacen pequeños y la suma no se estabiliza." : "Con |r| &lt; 1 los puntos <b style='color:var(--pen)'>azules</b> (términos) se acercan a 0 y la línea <b style='color:var(--red)'>roja</b> (suma parcial) se aprieta contra su límite <b style='color:var(--ok)'>S∞</b>." + (r < 0 ? " Con r negativa los términos alternan de signo y la suma oscila antes de asentarse." : "");
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 13, ymin: -1, ymax: 10, w: 640, h: 300, etx: "n", etiqueta: "Términos y sumas parciales de una progresión geométrica" });
    pinta();
  };

  // ============================================================
  // REBOTE: la pelota que rebota (serie geométrica)
  // ============================================================
  B.w.rebote = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "La pelota que rebota");
    cuerpo.innerHTML = '<div class="reb-fila"><div class="w-plot reb-pelota"></div><div class="w-plot reb-alturas"></div></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { h0: 10, e: 0.6 }, G = 9.8, gP, gA, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Altura inicial <i>h₀</i> (m)", min: 2, max: 20, step: 1, val: st.h0, on: function (v) { st.h0 = v; pintaAlturas(); anim.t = 0; frame(0, 0, true); }, fmt: String });
    U.slider(ctl, { et: "Fracción que sube <i>e</i>", min: 0.2, max: 0.9, step: 0.05, val: st.e, on: function (v) { st.e = v; pintaAlturas(); anim.t = 0; frame(0, 0, true); }, fmt: function (v) { return fmt(v, 2); } });
    var bola;
    function tramos() {            // [tInicio, tFin, alturaMáx, esCaida]
      var t = 0, out = [], h = st.h0, k = 0;
      out.push([0, Math.sqrt(2 * h / G), h, true]); t = Math.sqrt(2 * h / G);
      for (k = 1; k <= 14; k++) { h *= st.e; var d = 2 * Math.sqrt(2 * h / G); out.push([t, t + d, h, false]); t += d; }
      return out;
    }
    function alturaEn(t) {
      var tr = tramos();
      for (var i = 0; i < tr.length; i++) {
        if (t <= tr[i][1]) {
          var T = tr[i][1] - tr[i][0], s = t - tr[i][0];
          return tr[i][3] ? st.h0 - 0.5 * G * s * s : tr[i][2] - 0.5 * G * Math.pow(s - T / 2, 2);
        }
      }
      return 0;
    }
    function recorrido(k) { var d = st.h0; for (var i = 1; i <= k; i++) d += 2 * st.h0 * Math.pow(st.e, i); return d; }
    function pintaAlturas() {
      var N = 12, pts = [], D = st.h0 * (1 + st.e) / (1 - st.e), i;
      gA.rango(0, N + 1, 0, D * 1.15); gA.limpiar();
      gA.horizontal(D, { clase: "c-ok", dash: "6 4" }); gA.texto(N + 0.5, D, "límite = " + fmt(D, 2) + " m", { dy: -8, ancla: "end", clase: "ok" });
      for (i = 0; i <= N; i++) { pts.push([i, recorrido(i)]); gA.rect(i - 0.3, 0, i + 0.3, st.h0 * Math.pow(st.e, i), { clase: "z-pen", borde: "var(--pen)" }); }
      gA.polilinea(pts, { clase: "c-red" }); pts.forEach(function (p) { gA.punto(p[0], p[1], { r: 3.5, clase: "c-red" }); });
      lectura.innerHTML = U.lec("Altura tras k rebotes", "h₀·eᵏ", "pen") + U.lec("Distancia total tras k rebotes", "h₀ + 2h₀(e + … + eᵏ)", "red") + U.lec("Distancia total (infinitos rebotes)", "h₀·(1+e)/(1−e) = " + fmt(D, 2) + " m", "ok");
      pie.innerHTML = "Después del primer golpe, cada rebote sube y baja <b>2·h₀·eᵏ</b>: esas distancias forman una progresión geométrica de razón e, que se puede sumar entera. Total = h₀ + 2·h₀·e/(1−e) = <b>h₀(1+e)/(1−e)</b>. Con h₀ = 10 y e = 0,6 sale 40 m.";
    }
    var anim, caidas = 0;
    function frame(t, dt, reinicio) {
      if (reinicio) caidas = 0;
      var h = alturaEn(t);
      gP.limpiar(); gP.punto(0.5, h, { r: 9, clase: "c-red" }); gP.segmento(0.1, 0, 0.9, 0, { clase: "c-ink" });
      var fin = t > tramos()[tramos().length - 1][1];
      return fin ? false : undefined;
    }
    var elP = cuerpo.querySelector(".reb-pelota"), elA = cuerpo.querySelector(".reb-alturas");
    gP = new B.Plot(elP, { xmin: 0, xmax: 1, ymin: -0.5, ymax: 21, w: 200, h: 300, sinEjes: true, sinX: true, etiqueta: "Pelota botando" });
    gA = new B.Plot(elA, { xmin: 0, xmax: 13, ymin: 0, ymax: 45, w: 440, h: 300, etx: "rebote k", etiqueta: "Altura de cada rebote y distancia total recorrida" });
    gP.rango(0, 1, -0.5, st.h0 + 1);
    pintaAlturas();
    anim = U.animar(cuerpo, function (t, dt, reinicio) { gP.rango(0, 1, -0.5, st.h0 + 1); return frame(t, dt, reinicio); }, { auto: false });
    anim.reproducir();
  };

  // ============================================================
  // FIBONACCI y la razón áurea
  // ============================================================
  B.w.fibonacci = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Fibonacci y la razón áurea");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var N0 = 14, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var PHI = (1 + Math.sqrt(5)) / 2;
    U.slider(ctl, { et: "Términos <i>N</i>", min: 5, max: 25, step: 1, val: N0, on: function (v) { pinta(v); }, fmt: String });
    function pinta(N) {
      var F = [1, 1], i; for (i = 2; i <= N + 1; i++) F.push(F[i - 1] + F[i - 2]);
      var razones = []; for (i = 0; i < N; i++) razones.push(F[i + 1] / F[i]);
      g.rango(0, N + 1, 0.9, 2.1); g.limpiar();
      g.horizontal(PHI, { clase: "c-ok", dash: "6 4" }); g.texto(N + 0.5, PHI, "φ = " + fmt(PHI, 6), { dy: -8, ancla: "end", clase: "ok" });
      g.polilinea(razones.map(function (r, k) { return [k + 1, r]; }), { clase: "c-faint" });
      razones.forEach(function (r, k) { g.punto(k + 1, r, { r: 4.5, clase: "c-pen" }); });
      lectura.innerHTML = U.lec("Términos", F.slice(0, 10).join(", ") + (N > 10 ? "…" : "")) + U.lec("aₙ₊₁ / aₙ (último)", fmt(razones[N - 1], 6), "pen") + U.lec("φ = (1+√5)/2", fmt(PHI, 6), "ok") + U.lec("Diferencia", fmt(Math.abs(razones[N - 1] - PHI), 8), "red");
      pie.innerHTML = "El cociente de dos términos consecutivos <b>se acerca a φ ≈ 1,618</b> (el número áureo) aunque la sucesión de partida no es geométrica. Es una de las sucesiones más famosas: aparece en las espirales de las piñas, los girasoles y las conchas.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 15, ymin: 0.9, ymax: 2.1, w: 640, h: 270, etx: "n", ety: "aₙ₊₁/aₙ", etiqueta: "Cociente de términos consecutivos de Fibonacci" });
    pinta(N0);
  };

  // ============================================================
  // INTERES: interés compuesto con aportaciones (progresión geométrica)
  // ============================================================
  B.w.interes = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Interés compuesto: tu dinero como progresión geométrica");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { c0: 1000, r: 5, n: 10, a: 0 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Capital inicial", min: 0, max: 5000, step: 100, val: st.c0, on: function (v) { st.c0 = v; pinta(); }, fmt: function (v) { return B.fmt(v, 0) + " €"; } });
    U.slider(ctl, { et: "Interés anual", min: 0, max: 10, step: 0.5, val: st.r, on: function (v) { st.r = v; pinta(); }, fmt: function (v) { return fmt(v, 1) + " %"; } });
    U.slider(ctl, { et: "Años", min: 1, max: 40, step: 1, val: st.n, on: function (v) { st.n = v; pinta(); }, fmt: String });
    U.slider(ctl, { et: "Aportación al empezar cada año", min: 0, max: 2000, step: 100, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return B.fmt(v, 0) + " €"; } });
    function pinta() {
      var q = 1 + st.r / 100, cap = [st.c0], aport = [st.c0], i;
      for (i = 1; i <= st.n; i++) { cap.push((cap[i - 1] + st.a) * q); aport.push(aport[i - 1] + st.a); }
      var fin = cap[st.n], mx = Math.max(fin, 1) * 1.1;
      g.rango(0, st.n + 1, 0, mx); g.limpiar();
      g.polilinea(aport.map(function (v, k) { return [k, v]; }), { clase: "c-faint", dash: "5 4" });
      g.polilinea(cap.map(function (v, k) { return [k, v]; }), { clase: "c-ok" });
      cap.forEach(function (v, k) { if (st.n <= 20 || k % 5 === 0) g.punto(k, v, { r: 3.5, clase: "c-ok" }); });
      g.texto(st.n, fin, B.fmt(fin, 0) + " €", { dx: -6, dy: -10, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("Capital final", B.fmt(fin, 2) + " €", "ok") + U.lec("Dinero puesto por ti", B.fmt(aport[st.n], 2) + " €") + U.lec("Intereses ganados", B.fmt(fin - aport[st.n], 2) + " €", "pen") + U.lec("Factor por año", fmt(q, 4));
      pie.innerHTML = st.a === 0 ? "Sin aportaciones: <b>C·(1 + r/100)ⁿ</b>. Cada año el capital se multiplica por " + fmt(q, 4) + " (razón de una progresión geométrica). La línea discontinua es lo que habrías puesto tú." : "Con aportaciones al <em>inicio</em> de cada año, el capital es una suma de progresiones geométricas: <b>C·qⁿ + a·q·(qⁿ−1)/(q−1)</b>, con q = " + fmt(q, 4) + ".";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 11, ymin: 0, ymax: 2000, w: 640, h: 280, etx: "años", ety: "€", etiqueta: "Evolución del capital con interés compuesto" });
    pinta();
  };

})(window);

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

/* ============================================================
   Bachi para Firu · laboratorio de fórmulas trigonométricas (Matemáticas I, tema 5)
   formulas · identidad · ecuaciontrig · amplitud
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt, T = B.lab.trig;
  var R = Math.PI / 180;
  function rad(d) { return d * R; }
  function sen(d) { return Math.sin(rad(d)); }
  function cos(d) { return Math.cos(rad(d)); }
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }
  function mod360(d) { return ((d % 360) + 360) % 360; }

  // ============================================================
  // FORMULAS: las fórmulas de suma, diferencia, doble y mitad con números
  // ============================================================
  B.w.formulas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Comprueba las fórmulas con números");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="fo-fila"><div class="w-plot fo-circ"></div><div class="fo-tabla"></div></div><div data-ctl></div><p class="w-pie"></p>';
    var st = { modo: "suma", a: 50, b: 30 }, g;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), tabla = cuerpo.querySelector(".fo-tabla"), pie = cuerpo.querySelector(".w-pie");
    var sa = U.slider(ctl, { et: "Ángulo <i>a</i>", min: 0, max: 360, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    var sb = U.slider(ctl, { et: "Ángulo <i>b</i>", min: 0, max: 360, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function fila(etq, v, clase, nota) { return "<tr class='" + (clase || "") + "'><th>" + etq + "</th><td>" + fmt(v, 4) + "</td><td>" + (nota || "") + "</td></tr>"; }
    function par(etq1, v1, etq2, v2, malo) {
      var iguales = Math.abs(v1 - v2) < 1e-9;
      return fila(etq1, v1, "izq") + fila(etq2, v2, iguales ? "ok" : "mal", iguales ? "✓ igual" : "≠");
    }
    function punto(ang, clase, etq, rad_) {
      var r = rad_ || 1;
      g.segmento(0, 0, r * cos(ang), r * sen(ang), { clase: clase }).setAttribute("stroke-width", 2.5);
      g.punto(r * cos(ang), r * sen(ang), { r: 5, clase: clase });
      g.texto(1.12 * cos(ang), 1.12 * sen(ang), etq, { ancla: "middle", dy: 4, clase: clase === "c-pen" ? "pen" : clase === "c-red" ? "red" : "ok" });
    }
    function pinta() {
      var a = st.a, b = st.b, m = st.modo, h = "<table class='fo-t'><tbody>";
      sb.el.style.display = (m === "suma" || m === "resta") ? "" : "none";
      g.limpiar();
      if (m === "suma" || m === "resta") {
        var sg = m === "suma" ? 1 : -1, ab = a + sg * b;
        g.arco(0, 0, 0.3, 0, a, { clase: "c-pen" }); g.arco(0, 0, 0.42, a, ab, { clase: "c-red" });
        punto(a, "c-pen", "a"); punto(sg * b + a, "c-ok", "a" + (sg > 0 ? "+" : "−") + "b");
        h += par("sen(a " + (sg > 0 ? "+" : "−") + " b)", sen(ab), "sen a·cos b " + (sg > 0 ? "+" : "−") + " cos a·sen b", sen(a) * cos(b) + sg * cos(a) * sen(b));
        h += par("cos(a " + (sg > 0 ? "+" : "−") + " b)", cos(ab), "cos a·cos b " + (sg > 0 ? "−" : "+") + " sen a·sen b", cos(a) * cos(b) - sg * sen(a) * sen(b));
        if (Math.abs(cos(a) * cos(b)) > 1e-9 && Math.abs(cos(ab)) > 1e-9) {
          var ta = sen(a) / cos(a), tb = sen(b) / cos(b);
          h += par("tan(a " + (sg > 0 ? "+" : "−") + " b)", sen(ab) / cos(ab), "(tan a " + (sg > 0 ? "+" : "−") + " tan b)/(1 " + (sg > 0 ? "−" : "+") + " tan a·tan b)", (ta + sg * tb) / (1 - sg * ta * tb));
        }
        h += fila("Error típico: sen a " + (sg > 0 ? "+" : "−") + " sen b", sen(a) + sg * sen(b), Math.abs(sen(a) + sg * sen(b) - sen(ab)) < 1e-9 ? "ok" : "mal", Math.abs(sen(a) + sg * sen(b) - sen(ab)) < 1e-9 ? "(coincide por casualidad)" : "✗ no vale");
        pie.innerHTML = "Las fórmulas se cumplen para <b>cualquier</b> par de ángulos (muévelos). En cambio, «sen(a + b) = sen a + sen b» <b>casi nunca</b> es cierto: sólo coincide por casualidad en algunos valores sueltos.";
      } else if (m === "doble") {
        g.arco(0, 0, 0.3, 0, a, { clase: "c-pen" }); g.arco(0, 0, 0.42, 0, 2 * a, { clase: "c-red" });
        punto(a, "c-pen", "a"); punto(2 * a, "c-ok", "2a");
        h += par("sen 2a", sen(2 * a), "2·sen a·cos a", 2 * sen(a) * cos(a));
        h += par("cos 2a", cos(2 * a), "cos²a − sen²a", cos(a) * cos(a) - sen(a) * sen(a));
        h += par("cos 2a", cos(2 * a), "2·cos²a − 1", 2 * cos(a) * cos(a) - 1);
        h += par("cos 2a", cos(2 * a), "1 − 2·sen²a", 1 - 2 * sen(a) * sen(a));
        if (Math.abs(cos(2 * a)) > 1e-9 && Math.abs(cos(a)) > 1e-9) h += par("tan 2a", sen(2 * a) / cos(2 * a), "2·tan a/(1 − tan²a)", 2 * (sen(a) / cos(a)) / (1 - Math.pow(sen(a) / cos(a), 2)));
        h += fila("Error típico: 2·sen a", 2 * sen(a), Math.abs(2 * sen(a) - sen(2 * a)) < 1e-9 ? "ok" : "mal", Math.abs(2 * sen(a) - sen(2 * a)) < 1e-9 ? "(casualidad)" : "✗ no vale");
        pie.innerHTML = "Las tres formas de cos 2a son <b>la misma</b> expresión escrita de tres maneras (se pasa de una a otra con sen²a + cos²a = 1). Elige la que use el dato que te dan.";
      } else {
        var cu = Math.floor(mod360(a / 2) / 90) + 1, sS = mod360(a / 2) < 180 ? 1 : -1, sC = (mod360(a / 2) < 90 || mod360(a / 2) > 270) ? 1 : -1;
        g.arco(0, 0, 0.3, 0, a / 2, { clase: "c-pen" }); g.arco(0, 0, 0.42, 0, a, { clase: "c-red" });
        punto(a / 2, "c-pen", "a/2"); punto(a, "c-ok", "a");
        h += par("sen(a/2)", sen(a / 2), (sS > 0 ? "+" : "−") + "√((1 − cos a)/2)", sS * Math.sqrt((1 - cos(a)) / 2));
        h += par("cos(a/2)", cos(a / 2), (sC > 0 ? "+" : "−") + "√((1 + cos a)/2)", sC * Math.sqrt((1 + cos(a)) / 2));
        h += fila("Signo elegido", 0, "izq", "a/2 está en el " + (cu > 4 ? 4 : cu) + ".º cuadrante: sen " + (sS > 0 ? "+" : "−") + ", cos " + (sC > 0 ? "+" : "−"));
        h += fila("Error típico: sen a / 2", sen(a) / 2, Math.abs(sen(a) / 2 - sen(a / 2)) < 1e-9 ? "ok" : "mal", Math.abs(sen(a) / 2 - sen(a / 2)) < 1e-9 ? "(casualidad)" : "✗ no vale");
        pie.innerHTML = "En las fórmulas del ángulo mitad el signo ± <b>no se elige a capricho</b>: lo decide el cuadrante en el que cae <b>a/2</b>. Con a entre 0° y 360°, a/2 está siempre entre 0° y 180°, así que sen(a/2) es siempre positivo y cos(a/2) cambia de signo en a = 180°.";
      }
      tabla.innerHTML = h + "</tbody></table>";
    }
    g = new B.Plot(cuerpo.querySelector(".fo-circ"), { xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, w: 340, h: 340, limpio: true, etiqueta: "Los ángulos sobre la circunferencia" });
    g.rangoIso(0, 0, 1.45);
    g.arco(0, 0, 1, 0, 360, { clase: "c-faint", capa: "fijo" });
    g.segmento(-1.4, 0, 1.4, 0, { clase: "c-ink", capa: "fijo" }); g.segmento(0, -1.4, 0, 1.4, { clase: "c-ink", capa: "fijo" });
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "Suma a + b" }, { k: "resta", t: "Diferencia a − b" }, { k: "doble", t: "Ángulo doble" }, { k: "mitad", t: "Ángulo mitad" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // IDENTIDAD: ¿son iguales dos expresiones? (con gráficas)
  // ============================================================
  B.w.identidad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Identidad o ecuación? Compara dos expresiones");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="lectura"></div><div class="w-plot"></div><p class="w-pie"></p>';
    var PRE = [["sen(2x)", "2 sen(x) cos(x)", "sen 2x = 2 sen x cos x"], ["cos(2x)", "2cos(x)^2-1", "cos 2x = 2cos²x − 1"], ["sen(x+pi/2)", "cos(x)", "sen(x + 90°) = cos x"], ["tan(x)+1/tan(x)", "2/sen(2x)", "tan x + cotan x = 2/sen 2x"], ["sen(x)/(1+cos(x))", "(1-cos(x))/sen(x)", "sen x/(1+cos x) = (1−cos x)/sen x"], ["sen(2x)", "2 sen(x)", "sen 2x = 2 sen x (¡falso!)"], ["sen(x+pi/3)", "sen(x)+sen(pi/3)", "sen(x + 60°) = sen x + sen 60° (¡falso!)"], ["sen(x)", "cos(x)", "sen x = cos x (sólo una ecuación)"]];
    var st = { f: PRE[0][0], g: PRE[0][1] }, grf;
    var ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function campo(et, val, ancho) {
      var l = document.createElement("label"); l.className = "bx-campo";
      l.innerHTML = '<span class="bx-et">' + et + '</span><input type="text" autocomplete="off" spellcheck="false" style="width:' + ancho + 'px" value="' + val + '" aria-label="' + et + '">'; ctl.appendChild(l); return l.querySelector("input");
    }
    var iF = campo("Izquierda", st.f, 190), iG = campo("Derecha", st.g, 190);
    function pinta() {
      var f = B.Mate.compilar(st.f), gg = B.Mate.compilar(st.g);
      if (!f.ok || !gg.ok) { lectura.innerHTML = U.lec("Revisa lo que has escrito", f.ok ? gg.error : f.error, "red"); grf.limpiar(); return; }
      var N = 720, iguales = 0, total = 0, maxd = 0, pts = [], vals = [];
      for (var i = 1; i < N; i++) {
        var x = 2 * Math.PI * i / N, a, b;
        try { a = f.f(x); b = gg.f(x); } catch (e) { continue; }
        if (!isFinite(a) || !isFinite(b) || Math.abs(a) > 1e6 || Math.abs(b) > 1e6) continue;
        total++;
        var d = Math.abs(a - b), esc = Math.max(1, Math.abs(a), Math.abs(b));
        if (d / esc < 1e-8) { iguales++; if (pts.length < 8 && (!pts.length || Math.abs(pts[pts.length - 1] - x) > 0.3)) pts.push(x); }
        maxd = Math.max(maxd, d / esc);
        if (Math.abs(a) < 6) vals.push(a); if (Math.abs(b) < 6) vals.push(b);
      }
      var veredicto, cl;
      if (total < 10) { veredicto = "no hay puntos para comparar"; cl = "red"; }
      else if (iguales === total) { veredicto = "coinciden en los " + total + " puntos probados: parece una <b>identidad</b>"; cl = "ok"; }
      else if (iguales === 0) { veredicto = "no coinciden en ningún punto"; cl = "red"; }
      else { veredicto = "coinciden en " + iguales + " de " + total + " puntos: es una <b>ecuación</b> (sólo se cumple para algunos x)"; cl = "pen"; }
      lectura.innerHTML = U.lec("Resultado de la prueba", veredicto, cl) + U.lec("Mayor diferencia observada", fmt(maxd, 6)) + U.lec("Valores de x donde coinciden (ejemplos, en rad)", iguales && iguales < total ? pts.map(function (p) { return fmt(p, 3); }).join(", ") : iguales === total ? "todos" : "ninguno");
      var mn = Math.min.apply(null, vals.concat([-1])), mx = Math.max.apply(null, vals.concat([1])), pad = (mx - mn) * 0.12;
      grf.rango(0, 2 * Math.PI, mn - pad, mx + pad);
      grf.limpiar();
      [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2, 2 * Math.PI].forEach(function (a2, k) { grf.texto(a2, 0, ["0", "π/2", "π", "3π/2", "2π"][k], { dy: 16, dx: k === 4 ? -14 : k === 0 ? 10 : 0, ancla: "middle", clase: "faint" }); });
      grf.curva(f.f, { clase: "c-pen", n: 600 });
      grf.curva(gg.f, { clase: "c-red", dash: "7 5", n: 600 });
      pie.innerHTML = "Curva <b style='color:var(--pen)'>azul</b> = lado izquierdo, <b style='color:var(--red)'>roja discontinua</b> = lado derecho. Si se superponen siempre, es una identidad. <b>Ojo:</b> esta prueba es sólo una <i>comprobación numérica</i>; en un examen hay que <b>demostrar</b> la igualdad con álgebra.";
    }
    grf = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 6.28, ymin: -2, ymax: 2, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "Los dos lados de la igualdad" });
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE.map(function (p, i) { return { k: String(i), t: p[2] }; }), "", function (k) { st.f = PRE[+k][0]; st.g = PRE[+k][1]; iF.value = st.f; iG.value = st.g; pinta(); });
    iF.addEventListener("input", function () { st.f = iF.value; pinta(); });
    iG.addEventListener("input", function () { st.g = iG.value; pinta(); });
    pinta();
  };

  // ============================================================
  // ECUACIONTRIG: sen(m·x) = k, cos(m·x) = k, tan(m·x) = k en [0°, 360°)
  // ============================================================
  T.soluciones = function (fn, m, k) {
    var base = [], res = [], n, a;
    if (fn === "sen") { if (Math.abs(k) > 1 + 1e-12) return { base: [], x: [] }; a = Math.asin(Math.max(-1, Math.min(1, k))) / R; base = [a, 180 - a]; }
    else if (fn === "cos") { if (Math.abs(k) > 1 + 1e-12) return { base: [], x: [] }; a = Math.acos(Math.max(-1, Math.min(1, k))) / R; base = [a, -a]; }
    else { a = Math.atan(k) / R; base = [a]; }
    var per = fn === "tan" ? 180 : 360;
    base.forEach(function (b) { for (n = -2 * m - 2; n <= 2 * m + 2; n++) { var x = (b + per * n) / m; x = Math.round(x * 1e8) / 1e8; if (x >= -1e-9 && x < 360 - 1e-9) res.push(Math.abs(x) < 1e-9 ? 0 : x); } });
    res.sort(function (p, q) { return p - q; });
    var u = []; res.forEach(function (x) { if (!u.length || Math.abs(x - u[u.length - 1]) > 1e-6) u.push(x); });
    return { base: base, x: u };
  };

  B.w.ecuaciontrig = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Resuelve sen(m·x) = k, cos(m·x) = k o tan(m·x) = k");
    cuerpo.innerHTML = '<div data-fn class="chips"></div><div data-m class="chips"></div><div data-kk class="chips"></div><div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { fn: "sen", m: 1, k: 0.5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Valor <i>k</i>", min: -1.2, max: 1.2, step: 0.01, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    var NOTK = { sen: [[-1, "−1"], [-Math.sqrt(3) / 2, "−√3/2"], [-Math.sqrt(2) / 2, "−√2/2"], [-0.5, "−1/2"], [0, "0"], [0.5, "1/2"], [Math.sqrt(2) / 2, "√2/2"], [Math.sqrt(3) / 2, "√3/2"], [1, "1"]], tan: [[-Math.sqrt(3), "−√3"], [-1, "−1"], [-Math.sqrt(3) / 3, "−√3/3"], [0, "0"], [Math.sqrt(3) / 3, "√3/3"], [1, "1"], [Math.sqrt(3), "√3"]] };
    NOTK.cos = NOTK.sen;
    function eligeK() {
      var arr = NOTK[st.fn];
      U.fichas(cuerpo.querySelector("[data-kk]"), arr.map(function (p, i) { return { k: String(i), t: "k = " + p[1] }; }), "", function (i) { st.k = arr[+i][0]; sl.set(Math.round(st.k * 100) / 100); pinta(); });
      var lim = st.fn === "tan" ? 4 : 1.2; sl.input.min = -lim; sl.input.max = lim;
      if (Math.abs(st.k) > lim) st.k = Math.max(-lim, Math.min(lim, st.k)); sl.set(Math.round(st.k * 100) / 100);
    }
    function f(x) { var a = st.m * x; return st.fn === "sen" ? sen(a) : st.fn === "cos" ? cos(a) : Math.tan(rad(a)); }
    function pinta() {
      var sol = T.soluciones(st.fn, st.m, st.k), tit = st.fn + " " + (st.m === 1 ? "x" : st.m + "x");
      var lim = st.fn === "tan" ? 4 : 1.5;
      g.rango(0, 360, -lim, lim);
      g.limpiar();
      [0, 90, 180, 270, 360].forEach(function (a) { g.segmento(a, -lim, a, lim, { clase: "c-faint", dash: "2 5" }); g.texto(a, 0, a + "°", { dy: 15, dx: a === 360 ? -14 : a === 0 ? 14 : 0, ancla: "middle", clase: "faint" }); });
      g.curva(f, { clase: "c-pen", n: 720 });
      g.horizontal(st.k, { clase: "c-red", dash: "6 4" });
      sol.x.forEach(function (x) { g.punto(x, st.k, { r: 6, clase: "c-ok" }); g.segmento(x, 0, x, st.k, { clase: "c-ok", dash: "3 3" }); });
      var gen;
      if (!sol.base.length) gen = "no tiene solución (|k| &gt; 1)";
      else {
        var ar = st.m === 1 ? "x" : st.m + "x";
        gen = st.fn === "sen" ? ar + " = " + fmt(sol.base[0], 2) + "° + 360°n  ó  " + ar + " = " + fmt(sol.base[1], 2) + "° + 360°n" : st.fn === "cos" ? ar + " = ±" + fmt(sol.base[0], 2) + "° + 360°n" : ar + " = " + fmt(sol.base[0], 2) + "° + 180°n";
        if (st.m > 1) gen += "  ⇒  x = (…)/" + st.m;
      }
      lectura.innerHTML = U.lec("Ecuación", tit + " = " + fmt(st.k, 2)) + U.lec("Soluciones generales", gen, "pen") + U.lec("En [0°, 360°)", sol.x.length ? sol.x.map(function (x) { return fmt(x, 2) + "°"; }).join(" · ") : "ninguna", sol.x.length ? "ok" : "red") + U.lec("Número de soluciones", sol.x.length);
      pie.innerHTML = "Las soluciones son los cortes de la curva con la recta horizontal y = k. Con <b>m = " + st.m + "</b> la curva se repite " + st.m + " vez" + (st.m === 1 ? "" : "es") + " en una vuelta, así que " + (st.fn === "tan" ? "hay " + st.m + " soluciones" : "hay hasta " + 2 * st.m + " soluciones") + ". Para despejar x hay que <b>dividir entre m <i>todo</i></b>, incluido el «+360°n».";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 360, ymin: -1.5, ymax: 1.5, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "La curva y la recta y = k" });
    U.fichas(cuerpo.querySelector("[data-fn]"), [{ k: "sen", t: "seno" }, { k: "cos", t: "coseno" }, { k: "tan", t: "tangente" }], st.fn, function (k) { st.fn = k; st.k = k === "tan" ? 1 : 0.5; eligeK(); pinta(); });
    U.fichas(cuerpo.querySelector("[data-m]"), [{ k: "1", t: "ángulo x" }, { k: "2", t: "ángulo 2x" }, { k: "3", t: "ángulo 3x" }], "1", function (k) { st.m = +k; pinta(); });
    eligeK(); pinta();
  };

  // ============================================================
  // AMPLITUD: a·sen x + b·cos x = R·sen(x + φ)
  // ============================================================
  B.w.amplitud = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "a·sen x + b·cos x = R·sen(x + φ)");
    cuerpo.innerHTML = '<div class="w-plot"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { a: 3, b: 4 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Coeficiente <i>a</i> (de sen x)", min: -5, max: 5, step: 0.5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Coeficiente <i>b</i> (de cos x)", min: -5, max: 5, step: 0.5, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var a = st.a, b = st.b, Rr = Math.hypot(a, b), ph = Math.atan2(b, a) / R;
      g.limpiar();
      g.curva(function (x) { return a * sen(x) + b * cos(x); }, { clase: "c-pen", n: 360 });
      if (Rr > 1e-9) g.curva(function (x) { return Rr * sen(x + ph); }, { clase: "c-red", dash: "7 5", n: 360 });
      g.horizontal(Rr, { clase: "c-ok", dash: "3 4" }); g.horizontal(-Rr, { clase: "c-ok", dash: "3 4" });
      g.texto(355, Rr, "R = " + fmt(Rr, 3), { dy: -6, ancla: "end", clase: "ok" });
      lectura.innerHTML = U.lec("Amplitud R = √(a² + b²)", fmt(Rr, 4), "ok") + U.lec("Desfase φ (tan φ = b/a)", fmt(ph, 2) + "°", "red") + U.lec("a·sen x + b·cos x =", Rr < 1e-9 ? "0" : fmt(Rr, 3) + "·sen(x " + (ph < 0 ? "−" : "+") + " " + fmt(Math.abs(ph), 2) + "°)", "pen") + U.lec("Valor máximo · mínimo", fmt(Rr, 3) + " · " + fmt(-Rr, 3));
      pie.innerHTML = "La suma de un seno y un coseno <b>del mismo ángulo</b> es siempre otra onda senoidal: la curva azul (suma) y la roja discontinua (R·sen(x + φ)) coinciden. Se obtiene con sen(x + φ) = sen x·cos φ + cos x·sen φ comparando coeficientes: R·cos φ = a y R·sen φ = b. Útil para resolver «a·sen x + b·cos x = c» y para hallar máximos.";
    }
    g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin: 0, xmax: 360, ymin: -7.5, ymax: 7.5, w: 640, h: 270, sinX: true, etx: "x", ety: "", etiqueta: "Suma de seno y coseno" });
    [0, 90, 180, 270, 360].forEach(function (a) { g.segmento(a, -7.5, a, 7.5, { clase: "c-faint", dash: "2 5", capa: "fijo" }); g.texto(a, 0, a + "°", { dy: 15, dx: a === 360 ? -14 : a === 0 ? 14 : 0, ancla: "middle", clase: "faint", capa: "fijo" }); });
    pinta();
  };
})(window);

/* ============================================================
   Bachi para Firu · laboratorio de vectores (Matemáticas I, tema 7; también sirve a Física)
   vectores · escalar · combinacion · segmento · baricentro · fuerzas · trabajo
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var V = B.lab.vec = {};
  var R = Math.PI / 180;
  function cero(x) { return Math.abs(x) < 1e-12 ? 0 : x; }

  V.mod = function (u) { return Math.hypot(u[0], u[1]); };
  V.dot = function (u, v) { return u[0] * v[0] + u[1] * v[1]; };
  V.det = function (u, v) { return u[0] * v[1] - u[1] * v[0]; };
  V.ang = function (u, v) { var c = V.dot(u, v) / (V.mod(u) * V.mod(v)); return Math.acos(Math.max(-1, Math.min(1, c))) / R; };
  V.txt = function (u, d) { d = d == null ? 2 : d; return "(" + fmt(cero(u[0]), d) + ", " + fmt(cero(u[1]), d) + ")"; };
  function snap(v, lim) { v = Math.round(v * 2) / 2; return Math.max(-lim, Math.min(lim, v)); }

  // Punto asible con ajuste a la cuadrícula de 0,5
  function asa(g, get, set, clase, etq, lim) {
    var h = g.punto(0, 0, { capa: "top", r: 9, clase: clase });
    g.arrastrar(h, function (x, y, tecla) {
      if (tecla) set(snap(x, lim), get()[1]); else set(snap(x, lim), snap(y, lim));
    }, { get: function () { return get()[0]; }, paso: 0.5, etiqueta: etq });
    return h;
  }
  function campoPlot(host, o) {
    var g = new B.Plot(host, { xmin: -6, xmax: 6, ymin: -5, ymax: 5, w: o.w || 520, h: o.h || 380, etx: "x", ety: "y", etiqueta: o.etiqueta });
    g.rangoIso(o.cx || 0, o.cy || 0, o.semi || 5);
    return g;
  }
  function etiqueta(g, p, t, clase, dx, dy) { g.texto(p[0], p[1], t, { dx: dx == null ? 8 : dx, dy: dy == null ? -8 : dy, clase: clase }); }

  // ============================================================
  // VECTORES: suma, resta, producto por un número, módulo
  // ============================================================
  B.w.vectores = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Operaciones con vectores");
    cuerpo.innerHTML = '<div data-modo class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { modo: "suma", u: [3, 1], v: [1, 3], k: 2 }, g, h1, h2, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sk = U.slider(ctl, { et: "Número <i>k</i>", min: -3, max: 3, step: 0.5, val: st.k, on: function (v) { st.k = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var u = st.u, v = st.v, m = st.modo, k = st.k, res, tit;
      sk.el.style.display = m === "esc" ? "" : "none";
      g.limpiar(); g.mover(h1, u[0], u[1]); g.mover(h2, v[0], v[1]);
      h2.style.display = m === "esc" || m === "mod" ? "none" : "";
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); etiqueta(g, u, "u", "pen");
      if (m !== "esc" && m !== "mod") { U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" }); etiqueta(g, v, "v", "red"); }
      if (m === "suma") {
        res = [u[0] + v[0], u[1] + v[1]]; tit = "u + v";
        g.segmento(u[0], u[1], res[0], res[1], { clase: "c-red", dash: "4 4" }); g.segmento(v[0], v[1], res[0], res[1], { clase: "c-pen", dash: "4 4" });
        U.flecha(g, 0, 0, res[0], res[1], { clase: "c-ok" }); etiqueta(g, res, "u + v", "ok");
        pie.innerHTML = "<b>Regla del paralelogramo</b>: u + v es la diagonal del paralelogramo de lados u y v. Equivale a la <b>regla del triángulo</b>: se coloca el origen de v en el extremo de u (línea discontinua roja) y el vector suma va del origen de u al extremo de v.";
      } else if (m === "res") {
        res = [u[0] - v[0], u[1] - v[1]]; tit = "u − v";
        U.flecha(g, v[0], v[1], u[0], u[1], { clase: "c-ok" }); etiqueta(g, [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2], "u − v", "ok", 6, -8);
        pie.innerHTML = "<b>u − v</b> es el vector que va del <b>extremo de v al extremo de u</b> (verde). Es la forma de calcular el vector AB entre dos puntos: AB = B − A (extremo menos origen).";
      } else if (m === "esc") {
        res = [k * u[0], k * u[1]]; tit = "k·u";
        if (k !== 0) { U.flecha(g, 0, 0, res[0], res[1], { clase: "c-ok" }); etiqueta(g, res, "k·u", "ok"); }
        pie.innerHTML = "Multiplicar por k estira o encoge u: el módulo se multiplica por |k|. Si <b>k es negativo</b>, el sentido se invierte; si k = 0 se obtiene el vector nulo. Todos los múltiplos de u son <b>paralelos</b> a u.";
      } else {
        res = u; tit = "u";
        g.segmento(0, 0, u[0], 0, { clase: "c-red" }).setAttribute("stroke-width", 3); g.segmento(u[0], 0, u[0], u[1], { clase: "c-ok" }).setAttribute("stroke-width", 3);
        g.texto(u[0] / 2, 0, "u₁ = " + fmt(u[0], 1), { dy: 16, ancla: "middle", clase: "red" }); g.texto(u[0], u[1] / 2, "u₂ = " + fmt(u[1], 1), { dx: 8, clase: "ok" });
        pie.innerHTML = "Las componentes u₁ y u₂ son los <b>catetos</b> de un triángulo rectángulo y el vector es la hipotenusa: |u| = √(u₁² + u₂²) (Pitágoras).";
      }
      lectura.innerHTML = U.lec("u", V.txt(u), "pen") + (m !== "esc" && m !== "mod" ? U.lec("v", V.txt(v), "red") : "") + U.lec(tit, V.txt(res), "ok") + U.lec("Módulo de " + tit, fmt(V.mod(res), 3)) + (m === "mod" ? U.lec("Vector unitario u/|u|", V.mod(u) > 0 ? V.txt([u[0] / V.mod(u), u[1] / V.mod(u)], 3) : "—") : "");
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Vectores en el plano", semi: 6.5 });
    h1 = asa(g, function () { return st.u; }, function (x, y) { st.u = [x, y]; pinta(); }, "c-pen", "Extremo de u", 7);
    h2 = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-red", "Extremo de v", 7);
    U.fichas(cuerpo.querySelector("[data-modo]"), [{ k: "suma", t: "u + v" }, { k: "res", t: "u − v" }, { k: "esc", t: "k·u" }, { k: "mod", t: "módulo" }], st.modo, function (k) { st.modo = k; pinta(); });
    pinta();
  };

  // ============================================================
  // ESCALAR: producto escalar, ángulo y proyección
  // ============================================================
  B.w.escalar = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Producto escalar, ángulo y proyección");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { u: [4, 1], v: [2, 3] }, g, h1, h2, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var u = st.u, v = st.v, d = V.dot(u, v), mu = V.mod(u), mv = V.mod(v);
      g.limpiar(); g.mover(h1, u[0], u[1]); g.mover(h2, v[0], v[1]);
      if (mu < 1e-9 || mv < 1e-9) { lectura.innerHTML = U.lec("Vector nulo", "mueve u y v para que no sean nulos", "red"); return; }
      var ang = V.ang(u, v), cr = V.det(u, v), proy = d / (mu * mu), pp = [proy * u[0], proy * u[1]];
      var tipo = Math.abs(d) < 1e-9 ? "perpendiculares (u·v = 0)" : Math.abs(cr) < 1e-9 ? (d > 0 ? "paralelos, mismo sentido" : "paralelos, sentido contrario") : d > 0 ? "ángulo agudo (u·v &gt; 0)" : "ángulo obtuso (u·v &lt; 0)";
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" });
      etiqueta(g, u, "u", "pen"); etiqueta(g, v, "v", "red");
      g.segmento(v[0], v[1], pp[0], pp[1], { clase: "c-faint", dash: "4 4" });
      g.segmento(0, 0, pp[0], pp[1], { clase: "c-ok" }).setAttribute("stroke-width", 5);
      g.arco(0, 0, 0.8, Math.atan2(u[1], u[0]) / R, Math.atan2(u[1], u[0]) / R + (cr >= 0 ? ang : -ang), { clase: "c-hl" });
      lectura.innerHTML = U.lec("u · v = u₁v₁ + u₂v₂", fmt(u[0], 1) + "·" + fmt(v[0], 1) + " + " + fmt(u[1], 1) + "·" + fmt(v[1], 1) + " = " + fmt(d, 2), "ok") + U.lec("|u| · |v| · cos α", fmt(mu, 3) + " · " + fmt(mv, 3) + " · " + fmt(Math.cos(ang * R), 4) + " = " + fmt(mu * mv * Math.cos(ang * R), 2)) + U.lec("Ángulo α", fmt(ang, 2) + "°", "red") + U.lec("Posición", tipo, "pen") + U.lec("Proyección de v sobre u (longitud con signo)", fmt(d / mu, 3), "ok");
      pie.innerHTML = "Arrastra los extremos de u y v. El producto escalar es un <b>número</b> (no un vector): vale 0 cuando son perpendiculares, es positivo si el ángulo es agudo y negativo si es obtuso. El segmento verde es la <b>proyección ortogonal</b> de v sobre u: su longitud es (u·v)/|u|.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Dos vectores, su ángulo y la proyección", semi: 5.5 });
    h1 = asa(g, function () { return st.u; }, function (x, y) { st.u = [x, y]; pinta(); }, "c-pen", "Extremo de u", 6);
    h2 = asa(g, function () { return st.v; }, function (x, y) { st.v = [x, y]; pinta(); }, "c-red", "Extremo de v", 6);
    pinta();
  };

  // ============================================================
  // COMBINACION: bases y coordenadas
  // ============================================================
  B.w.combinacion = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Bases: cualquier vector es una combinación lineal");
    cuerpo.innerHTML = '<div data-base class="chips"></div><div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var BASES = { can: [[1, 0], [0, 1], "base canónica i = (1, 0), j = (0, 1)"], b1: [[2, 1], [-1, 1], "u = (2, 1), v = (−1, 1)"], b2: [[1, 1], [1, -1], "u = (1, 1), v = (1, −1)"], b3: [[3, 1], [1, 2], "u = (3, 1), v = (1, 2)"] };
    var st = { base: "b1", w: [3, 4] }, g, hw, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var b = BASES[st.base], u = b[0], v = b[1], w = st.w, D = V.det(u, v), a = V.det(w, v) / D, c = V.det(u, w) / D;
      g.limpiar(); g.mover(hw, w[0], w[1]);
      var au = [a * u[0], a * u[1]], cv = [c * v[0], c * v[1]];
      g.segmento(au[0], au[1], w[0], w[1], { clase: "c-red", dash: "4 4" }); g.segmento(cv[0], cv[1], w[0], w[1], { clase: "c-pen", dash: "4 4" });
      U.flecha(g, 0, 0, au[0], au[1], { clase: "c-pen" }); U.flecha(g, 0, 0, cv[0], cv[1], { clase: "c-red" });
      U.flecha(g, 0, 0, u[0], u[1], { clase: "c-pen" }); U.flecha(g, 0, 0, v[0], v[1], { clase: "c-red" });
      g.texto(u[0], u[1], "u", { dx: 8, dy: -8, clase: "pen" }); g.texto(v[0], v[1], "v", { dx: 8, dy: -8, clase: "red" });
      U.flecha(g, 0, 0, w[0], w[1], { clase: "c-ok" }); g.texto(w[0], w[1], "w", { dx: 8, dy: -8, clase: "ok" });
      lectura.innerHTML = U.lec("Base elegida", BASES[st.base][2]) + U.lec("w (coordenadas habituales)", V.txt(w), "ok") + U.lec("w = a·u + b·v", "a = " + fmt(a, 3) + " · b = " + fmt(c, 3), "pen") + U.lec("Comprobación", fmt(a, 2) + "·" + V.txt(u, 0) + " + " + fmt(c, 2) + "·" + V.txt(v, 0) + " = " + V.txt([a * u[0] + c * v[0], a * u[1] + c * v[1]], 2));
      pie.innerHTML = "Dos vectores <b>no paralelos</b> forman una <b>base</b>: cualquier vector w se escribe de forma única como a·u + b·v (a y b son sus coordenadas en esa base). Con la base canónica (i, j) las coordenadas son las de siempre. Arrastra w y cambia de base.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Un vector como combinación lineal de dos vectores de la base", semi: 6 });
    hw = asa(g, function () { return st.w; }, function (x, y) { st.w = [x, y]; pinta(); }, "c-ok", "Extremo de w", 8);
    U.fichas(cuerpo.querySelector("[data-base]"), Object.keys(BASES).map(function (k) { return { k: k, t: BASES[k][2] }; }), st.base, function (k) { st.base = k; pinta(); });
    pinta();
  };

  // ============================================================
  // SEGMENTO: punto medio, simétrico y división en una razón
  // ============================================================
  B.w.segmento = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Puntos de un segmento: P = A + t·AB");
    cuerpo.innerHTML = '<div data-t class="chips"></div><div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-3, -2], B: [4, 3], t: 0.5 }, g, hA, hB, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var sl = U.slider(ctl, { et: "Parámetro <i>t</i>", min: -1, max: 2, step: 0.05, val: st.t, on: function (v) { st.t = v; pinta(); }, fmt: function (v) { return fmt(v, 2); } });
    function pinta() {
      var A = st.A, Bq = st.B, t = st.t, AB = [Bq[0] - A[0], Bq[1] - A[1]], P = [A[0] + t * AB[0], A[1] + t * AB[1]];
      g.limpiar(); g.mover(hA, A[0], A[1]); g.mover(hB, Bq[0], Bq[1]);
      g.segmento(-9 * AB[0] + A[0], -9 * AB[1] + A[1], 9 * AB[0] + A[0], 9 * AB[1] + A[1], { clase: "c-faint", dash: "3 5" });
      g.segmento(A[0], A[1], Bq[0], Bq[1], { clase: "c-pen" }).setAttribute("stroke-width", 3);
      g.punto(A[0], A[1], { r: 5, clase: "c-pen" }); g.punto(Bq[0], Bq[1], { r: 5, clase: "c-pen" });
      etiqueta(g, A, "A", "pen"); etiqueta(g, Bq, "B", "pen");
      g.punto(P[0], P[1], { r: 7, clase: "c-red" }); etiqueta(g, P, "P", "red");
      var razon = Math.abs(1 - t) < 1e-9 ? "∞ (P = B)" : fmt(t / (1 - t), 3);
      lectura.innerHTML = U.lec("AB = B − A", V.txt(AB), "pen") + U.lec("P = A + t·AB", V.txt(P, 3), "red") + U.lec("AP/PB", razon) + U.lec("Dónde está P", t < 0 ? "fuera, antes de A" : t > 1 ? "fuera, después de B" : t === 0 ? "en A" : t === 1 ? "en B" : Math.abs(t - 0.5) < 1e-9 ? "en el punto medio" : "dentro del segmento", "ok");
      pie.innerHTML = "Cada punto de la recta AB se obtiene como P = A + t·AB. Con <b>t = 1/2</b> sale el <b>punto medio</b> M = ((a₁ + b₁)/2, (a₂ + b₂)/2). Con t entre 0 y 1, P está en el segmento; con <b>t = 2</b>, P es el <b>simétrico de A respecto de B</b>. Si P divide al segmento en la razón AP/PB = r, entonces t = r/(1 + r).";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Segmento AB y un punto P = A + t·AB", semi: 6 });
    hA = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Punto A", 8);
    hB = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Punto B", 8);
    U.fichas(cuerpo.querySelector("[data-t]"), [{ k: "0.5", t: "punto medio (t = 1/2)" }, { k: "0.3333333333333333", t: "t = 1/3" }, { k: "0.6666666666666666", t: "t = 2/3" }, { k: "0.25", t: "t = 1/4" }, { k: "2", t: "simétrico de A respecto de B (t = 2)" }, { k: "-1", t: "simétrico de B respecto de A (t = −1)" }], "", function (k) { st.t = parseFloat(k); sl.set(Math.round(st.t * 100) / 100); pinta(); });
    pinta();
  };

  // ============================================================
  // BARICENTRO: tres puntos, las medianas y el área
  // ============================================================
  B.w.baricentro = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Triángulo: baricentro, medianas y área");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { A: [-4, -2], B: [4, -1], C: [0, 4] }, g, hs = {}, lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    function pinta() {
      var A = st.A, Bq = st.B, Cq = st.C;
      g.limpiar(); ["A", "B", "C"].forEach(function (k) { g.mover(hs[k], st[k][0], st[k][1]); });
      var G = [(A[0] + Bq[0] + Cq[0]) / 3, (A[1] + Bq[1] + Cq[1]) / 3], MA = [(Bq[0] + Cq[0]) / 2, (Bq[1] + Cq[1]) / 2], MB = [(A[0] + Cq[0]) / 2, (A[1] + Cq[1]) / 2], MC = [(A[0] + Bq[0]) / 2, (A[1] + Bq[1]) / 2];
      var AB = [Bq[0] - A[0], Bq[1] - A[1]], AC = [Cq[0] - A[0], Cq[1] - A[1]], area = Math.abs(V.det(AB, AC)) / 2;
      g.poligono([A, Bq, Cq], { clase: "z-pen", borde: "var(--pen)" });
      [[A, MA], [Bq, MB], [Cq, MC]].forEach(function (p) { g.segmento(p[0][0], p[0][1], p[1][0], p[1][1], { clase: "c-ok", dash: "5 4" }); });
      [MA, MB, MC].forEach(function (m) { g.punto(m[0], m[1], { r: 4, clase: "c-ok" }); });
      g.punto(G[0], G[1], { r: 7, clase: "c-red" }); etiqueta(g, G, "G", "red");
      etiqueta(g, A, "A", "pen"); etiqueta(g, Bq, "B", "pen"); etiqueta(g, Cq, "C", "pen");
      lectura.innerHTML = U.lec("Baricentro G = (A + B + C)/3", V.txt(G, 3), "red") + U.lec("Puntos medios de los lados", V.txt(MA, 1) + " · " + V.txt(MB, 1) + " · " + V.txt(MC, 1), "ok") + U.lec("Área = ½·|det(AB, AC)|", fmt(area, 3), "pen") + U.lec("¿Están alineados?", area < 1e-9 ? "sí (área 0)" : "no");
      pie.innerHTML = "El <b>baricentro</b> es la media de los tres vértices y es el punto donde se cortan las <b>medianas</b> (rectas del vértice al punto medio del lado opuesto, en verde). Divide cada mediana en dos trozos en razón 2 : 1. El área se calcula con el determinante de dos lados: S = ½·|AB₁·AC₂ − AB₂·AC₁|.";
    }
    g = campoPlot(cuerpo.querySelector(".rd-circ"), { etiqueta: "Triángulo con sus medianas y su baricentro", semi: 6 });
    hs.A = asa(g, function () { return st.A; }, function (x, y) { st.A = [x, y]; pinta(); }, "c-pen", "Vértice A", 8);
    hs.B = asa(g, function () { return st.B; }, function (x, y) { st.B = [x, y]; pinta(); }, "c-pen", "Vértice B", 8);
    hs.C = asa(g, function () { return st.C; }, function (x, y) { st.C = [x, y]; pinta(); }, "c-pen", "Vértice C", 8);
    pinta();
  };

  // ============================================================
  // FUERZAS: composición de dos fuerzas y equilibrio
  // ============================================================
  B.w.fuerzas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Suma de fuerzas: la resultante y la equilibrante");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { f1: 6, a1: 20, f2: 5, a2: 110 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "|F₁| (N)", min: 0, max: 10, step: 0.5, val: st.f1, on: function (v) { st.f1 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo de F₁", min: 0, max: 360, step: 5, val: st.a1, on: function (v) { st.a1 = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "|F₂| (N)", min: 0, max: 10, step: 0.5, val: st.f2, on: function (v) { st.f2 = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo de F₂", min: 0, max: 360, step: 5, val: st.a2, on: function (v) { st.a2 = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var F1 = [st.f1 * Math.cos(st.a1 * R), st.f1 * Math.sin(st.a1 * R)], F2 = [st.f2 * Math.cos(st.a2 * R), st.f2 * Math.sin(st.a2 * R)], Rs = [F1[0] + F2[0], F1[1] + F2[1]];
      g.limpiar();
      g.segmento(F1[0], F1[1], Rs[0], Rs[1], { clase: "c-red", dash: "4 4" }); g.segmento(F2[0], F2[1], Rs[0], Rs[1], { clase: "c-pen", dash: "4 4" });
      U.flecha(g, 0, 0, F1[0], F1[1], { clase: "c-pen" }); U.flecha(g, 0, 0, F2[0], F2[1], { clase: "c-red" });
      etiqueta(g, F1, "F₁", "pen"); etiqueta(g, F2, "F₂", "red");
      U.flecha(g, 0, 0, Rs[0], Rs[1], { clase: "c-ok" }); etiqueta(g, Rs, "R", "ok");
      if (V.mod(Rs) > 1e-9) { U.flecha(g, 0, 0, -Rs[0], -Rs[1], { clase: "c-faint" }); etiqueta(g, [-Rs[0], -Rs[1]], "E", "faint"); }
      var angR = ((Math.atan2(Rs[1], Rs[0]) / R) + 360) % 360;
      lectura.innerHTML = U.lec("F₁", V.txt(F1) + " N", "pen") + U.lec("F₂", V.txt(F2) + " N", "red") + U.lec("Resultante R = F₁ + F₂", V.txt(Rs) + " N", "ok") + U.lec("|R| y ángulo", fmt(V.mod(Rs), 3) + " N · " + (V.mod(Rs) < 1e-9 ? "—" : fmt(angR, 1) + "°")) + U.lec("Equilibrante E = −R", V.txt([-Rs[0], -Rs[1]]) + " N") + U.lec("Ángulo entre F₁ y F₂", st.f1 > 0 && st.f2 > 0 ? fmt(V.ang(F1, F2), 1) + "°" : "—");
      pie.innerHTML = "La fuerza neta es la <b>suma vectorial</b> de las fuerzas. Para que el cuerpo esté en equilibrio hace falta una tercera fuerza, la <b>equilibrante</b> E = −R, con el mismo módulo y sentido contrario (flecha gris). Prueba: dos fuerzas iguales a 120° dan una resultante igual a cada una de ellas.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -10, xmax: 10, ymin: -10, ymax: 10, w: 460, h: 380, etx: "x (N)", ety: "y (N)", etiqueta: "Fuerzas sobre un cuerpo" });
    g.rangoIso(0, 0, 11);
    pinta();
  };

  // ============================================================
  // TRABAJO: W = F·d = |F||d|cos α
  // ============================================================
  B.w.trabajo = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El trabajo es un producto escalar");
    cuerpo.innerHTML = '<div class="w-plot rd-circ"></div><div data-ctl></div><div class="lectura"></div><p class="w-pie"></p>';
    var st = { F: 8, a: 35, d: 5 }, g, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "|F| (N)", min: 1, max: 12, step: 0.5, val: st.F, on: function (v) { st.F = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    U.slider(ctl, { et: "Ángulo α", min: 0, max: 180, step: 5, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "|d| (m)", min: 1, max: 8, step: 0.5, val: st.d, on: function (v) { st.d = v; pinta(); }, fmt: function (v) { return fmt(v, 1); } });
    function pinta() {
      var F = [st.F * Math.cos(st.a * R), st.F * Math.sin(st.a * R)], d = [st.d, 0], W = V.dot(F, d), Fp = F[0];
      g.limpiar();
      g.segmento(0, 0, st.d, 0, { clase: "c-ink" }).setAttribute("stroke-width", 4); U.flecha(g, 0, 0, st.d, 0, { clase: "c-ink", grosor: 4 }); g.texto(st.d, 0, "desplazamiento d", { dy: 20, ancla: "end", clase: "faint" });
      U.flecha(g, 0, 0, F[0], F[1], { clase: "c-red" }); etiqueta(g, F, "F", "red");
      g.segmento(F[0], F[1], F[0], 0, { clase: "c-faint", dash: "4 4" });
      g.segmento(0, 0, Fp, 0, { clase: W >= 0 ? "c-ok" : "c-red" }).setAttribute("stroke-width", 6);
      g.arco(0, 0, 1.2, 0, st.a, { clase: "c-hl" });
      lectura.innerHTML = U.lec("W = F·d = |F|·|d|·cos α", fmt(st.F, 1) + "·" + fmt(st.d, 1) + "·" + fmt(Math.cos(st.a * R), 3) + " = " + fmt(W, 2) + " J", W >= 0 ? "ok" : "red") + U.lec("Componente de F en la dirección de d", fmt(Fp, 3) + " N") + U.lec("Signo del trabajo", st.a < 90 ? "positivo (la fuerza ayuda al movimiento)" : st.a === 90 ? "cero (fuerza perpendicular: no trabaja)" : "negativo (la fuerza frena)");
      pie.innerHTML = "El trabajo de una fuerza constante es el producto escalar de la fuerza por el desplazamiento: sólo cuenta la <b>componente de F en la dirección del movimiento</b> (la proyección verde). Con α = 90° la fuerza no trabaja (por ejemplo, la normal o el peso en un suelo horizontal). Es lo que verás en Física de 1.º, tema de trabajo y energía.";
    }
    g = new B.Plot(cuerpo.querySelector(".rd-circ"), { xmin: -3, xmax: 14, ymin: -8, ymax: 8, w: 520, h: 330, etx: "", ety: "", limpio: true, etiqueta: "Fuerza, desplazamiento y trabajo" });
    g.rangoIso(4, 0, 6.5);
    pinta();
  };
})(window);

/* ============================================================
   Historia de España · ampliaciones
   Tema 7: La Restauración borbónica (1874-1902)
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var H = B.h, ojo = H.ojo;
  var NS = "http://www.w3.org/2000/svg";
  function w(nombre, ref) { return H.w(nombre, ref && "historia_esp/t7/" + ref); }
  function svg(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }

  // ============================================================
  // TEORÍA (se añade al final de cada sección existente)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Antes de Sagunto: por qué se «restaura» la monarquía</h5>" +
    "<p>Entre 1868 y 1874, en el <b>Sexenio Democrático</b>, España lo probó casi todo: la Revolución de 1868 destronó a Isabel II, hubo una monarquía democrática con Amadeo de Saboya (1871-1873) y después la Primera República (1873-1874), todo ello en medio de la tercera guerra carlista, de la insurrección cantonal y de la guerra de Cuba (iniciada en 1868). A los grandes propietarios, a la Iglesia y al ejército aquello les parecía puro caos. La Restauración nace para ofrecerles <b>orden y estabilidad</b>.</p>" +
    "<p>El plan de Cánovas era devolver el trono a los Borbones por una vía que <em>no</em> pareciera un simple golpe militar, sino la voluntad del país. En diciembre de 1874, Alfonso, hijo de Isabel II y con solo 17 años, firmó desde la academia militar británica de Sandhurst un manifiesto redactado por Cánovas, en el que se presentaba como un rey constitucional, católico y conciliador. Pocos días después, el <b>29 de diciembre</b>, el general Martínez Campos se pronunció en Sagunto y lo proclamó rey. Alfonso XII llegó a España en enero de 1875.</p>" +
    "<h5>El periodo de un vistazo</h5>" +
    "<p>Antes de entrar al detalle, recorre la línea del tiempo de 1874 a 1902. Toca cada hecho para ver qué pasó y por qué importa; los colores separan política, guerras, sociedad y nacionalismos.</p>" +
    w("linea", "linea1");

  secciones[1] =
    "<h5>La Constitución de 1876 en seis ideas</h5>" +
    "<ol><li><b>Soberanía compartida</b> entre el Rey y las Cortes (no la soberanía nacional de 1869).</li>" +
    "<li><b>Cortes bicamerales</b>: Congreso de los Diputados (elegido) y Senado (una parte por derecho propio o vitalicio, y otra electiva).</li>" +
    "<li><b>Amplios poderes de la Corona</b>: nombra y cesa a los ministros, puede disolver las Cortes y sanciona las leyes.</li>" +
    "<li><b>Confesionalidad católica</b> con tolerancia privada de otros cultos (art. 11).</li>" +
    "<li><b>Derechos reconocidos, pero desarrollados por leyes ordinarias</b>: el sufragio, por ejemplo, no queda fijado en la Constitución y cambia según quién gobierne.</li>" +
    "<li><b>Flexibilidad</b>: cabían conservadores y liberales sin tener que reformarla, y por eso duró 47 años, hasta 1923.</li></ol>" +
    "<div class='cita'><p>«La religión católica, apostólica, romana, es la del Estado. La Nación se obliga a mantener el culto y sus ministros. Nadie será molestado en territorio español por sus opiniones religiosas, ni por el ejercicio de su respectivo culto, salvo el respeto debido a la moral cristiana. No se permitirán, sin embargo, otras ceremonias ni manifestaciones públicas que las de la religión del Estado.»</p><cite>Constitución de 1876, artículo 11</cite></div>" +
    "<h5>Cómo se comenta una fuente como esta</h5>" +
    "<ol><li><b>Clasifica</b>: ¿qué tipo de texto es (jurídico, político, periodístico…)? ¿Primario o secundario? ¿Quién lo escribe, cuándo y con qué intención?</li>" +
    "<li><b>Idea principal y análisis</b>: ¿qué dice? Resúmelo con tus palabras y señala las ideas clave.</li>" +
    "<li><b>Contextualiza</b>: ¿en qué momento se escribe y qué lo explica?</li>" +
    "<li><b>Conclusión</b>: ¿qué importancia tuvo y qué consecuencias?</li></ol>" +
    "<p>Pon en práctica la guía con este mismo artículo en el ejercicio de <b>comentario guiado</b> (pestaña Ejercicios): te dará la lista de puntos que debería tener tu comentario.</p>";

  secciones[2] =
    "<h5>El turno en imagen</h5>" +
    "<p>Mira quién gobierna cada año. Fíjate en lo regular que es la alternancia: no hay ninguna crisis política que la explique, y eso es precisamente lo que revela que estaba <b>pactada</b>.</p>" +
    w("turno") +
    "<h5>Lo que dice la ley y lo que ocurría</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Soberanía compartida</td><td>El rey elegía al presidente del gobierno, y <em>después</em> se «hacían» las elecciones para darle mayoría.</td></tr>" +
    "<tr><td>Cortes representativas</td><td>Las mayorías estaban pactadas antes de votar.</td></tr>" +
    "<tr><td>Competencia entre partidos</td><td>Dos partidos de notables, con intereses sociales casi idénticos, que se turnaban.</td></tr>" +
    "<tr><td>Elecciones libres</td><td>Fraude sistemático, sobre todo en el campo.</td></tr>" +
    "</tbody></table>" +
    "<p>Hay un momento clave en el que el sistema estuvo a punto de romperse: la muerte prematura de Alfonso XII, el <b>25 de noviembre de 1885</b>, sin heredero varón (Alfonso XIII nacería meses después, en mayo de 1886). Cánovas y Sagasta firmaron entonces el <b>Pacto del Pardo</b>: Cánovas cedía el gobierno a Sagasta y ambos se comprometían a respetar la regencia de María Cristina y a seguir turnándose. Los liberales gobernaron hasta 1890 (el llamado <b>«Parlamento largo»</b>) y aprobaron reformas que ampliaban derechos: Ley de Asociaciones (1887), Ley del Jurado (1888), Código Civil (1889) y <b>sufragio universal masculino</b> (1890).</p>" +
    ojo("el sufragio universal masculino de 1890 no democratizó el sistema: el caciquismo seguía controlando el voto, así que hubo más electores, pero no más libertad al votar.");

  secciones[3] =
    "<h5>Una pirámide de favores</h5>" +
    "<p>El caciquismo no era un invento de unos cuantos corruptos: era una <b>estructura</b> que unía Madrid con cada pueblo. Toca cada piso de la pirámide:</p>" +
    w("piramide") +
    "<h5>Cómo se «fabricaba» una elección</h5>" +
    "<p>El proceso seguía siempre los mismos pasos. Ponlos en orden:</p>" +
    w("orden", "proceso") +
    "<h5>Vocabulario imprescindible</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Encasillado</td><td>Lista de candidatos que el Ministerio de la Gobernación asignaba a cada distrito antes de las elecciones.</td></tr>" +
    "<tr><td>Pucherazo</td><td>Manipulación de las actas o de los votos para dar el resultado previsto.</td></tr>" +
    "<tr><td>Cunero</td><td>Candidato sin ninguna relación con el distrito, impuesto desde Madrid.</td></tr>" +
    "<tr><td>Votos «de los muertos»</td><td>Votos emitidos a nombre de personas fallecidas.</td></tr>" +
    "<tr><td>Oligarquía y caciquismo</td><td>Expresión de Joaquín Costa (1901): los políticos de Madrid (oligarquía) y la red local que les daba los votos (caciquismo).</td></tr>" +
    "</tbody></table>";

  secciones[4] =
    "<h5>De Zanjón al Grito de Baire: cómo se llegó a la guerra</h5>" +
    "<p>La <b>Paz de Zanjón</b> (1878) puso fin a la guerra de los Diez Años, pero no resolvió los problemas de fondo de Cuba: la falta de autonomía política y la esclavitud, que no se abolió hasta 1886. En <b>febrero de 1895</b> estalló de nuevo la insurrección (el <b>Grito de Baire</b>), organizada por el Partido Revolucionario Cubano de José Martí, con Máximo Gómez y Antonio Maceo al mando de las fuerzas. España envió a Cuba al general <b>Weyler</b> (1896), que aplicó una dura estrategia de guerra, incluida la «reconcentración» de la población rural, y fue duramente criticado en el extranjero.</p>" +
    "<p>Estados Unidos, con grandes intereses económicos en la isla (azúcar y comercio) y con una prensa sensacionalista que atizaba la opinión pública, vigilaba el conflicto. El <b>15 de febrero de 1898</b> el acorazado estadounidense <em>Maine</em> explotó en el puerto de La Habana, con más de 250 marinos muertos. EE. UU. culpó a España y, en abril, declaró la guerra.</p>" +
    "<p>La guerra fue breve y desigual. El <b>1 de mayo</b> la escuadra española de Montojo fue destruida en <b>Cavite</b> (Filipinas) y el <b>3 de julio</b> la de Cervera, al salir de <b>Santiago de Cuba</b>. Por el <b>Tratado de París</b> (10 de diciembre de 1898), España renunció a Cuba y cedió a EE. UU. <b>Puerto Rico, Guam y Filipinas</b>. En 1899 vendió a Alemania las islas Carolinas, Marianas y Palaos.</p>" +
    "<h5>Consecuencias: más allá del mapa</h5>" +
    "<ul><li><b>Económicas</b>: pérdida de mercados coloniales protegidos y regreso de capitales desde las colonias, que animaron la inversión en la Península.</li>" +
    "<li><b>Políticas y militares</b>: el sistema de la Restauración sobrevivió, pero muy desprestigiado; creció el malestar del ejército hacia los políticos y la prensa.</li>" +
    "<li><b>Ideológicas y culturales</b>: <b>regeneracionismo</b> (Joaquín Costa: «escuela y despensa», «doble llave al sepulcro del Cid») y <b>Generación del 98</b> (Unamuno, Azorín, Baroja, Machado…).</li>" +
    "<li><b>Nacionalismos periféricos</b>: se refuerza la crítica al Estado central, sobre todo en Cataluña y el País Vasco.</li></ul>" +
    "<p>Ahora clasifica tú: ¿es una causa o una consecuencia del Desastre?</p>" +
    w("clasificar", "clas98");

  // ============================================================
  // SECCIONES NUEVAS
  // ============================================================
  var nuevas = [
    {
      h: "5. Los que quedaban fuera del sistema",
      html:
        "<p>El turnismo y el caciquismo dejaban sin voz real a todos los que no eran notables de alguno de los dos partidos dinásticos. Fuera del sistema quedaban:</p>" +
        "<ul><li><b>Republicanos</b>: divididos tras el fracaso de 1873-74 y poco representados por el fraude.</li>" +
        "<li><b>Carlistas</b>: derrotados en 1876, mantuvieron su base social, sobre todo en el norte.</li>" +
        "<li><b>Movimiento obrero</b>: el <b>PSOE</b> (Pablo Iglesias, 1879) y la <b>UGT</b> (1888) por la vía socialista; y el <b>anarquismo</b>, muy extendido entre jornaleros andaluces y obreros catalanes.</li>" +
        "<li><b>Nacionalismos periféricos</b>: en Cataluña, las <b>Bases de Manresa</b> (1892); en el País Vasco, el <b>PNV</b> (1895) de Sabino Arana.</li></ul>" +
        "<p>Pon a prueba tus asociaciones: une cada personaje con su papel.</p>" +
        w("emparejar", "emp1")
    },
    {
      h: "6. Esquema para un tema de desarrollo",
      html:
        "<p>Si te piden «La Restauración borbónica (1874-1902)» en un examen, no escribas todo lo que sabes: <b>organízalo</b>. Un esquema que funciona:</p>" +
        "<ol><li><b>Introducción</b> (2-3 líneas): el contexto del Sexenio, las fechas clave (1874-1902) y la idea central: un sistema de estabilidad para las élites.</li>" +
        "<li><b>Los inicios</b>: Sandhurst, Sagunto, Alfonso XII y Cánovas, y la Constitución de 1876.</li>" +
        "<li><b>El funcionamiento</b>: turnismo (Cánovas y Sagasta, Pacto del Pardo) y caciquismo (encasillado, pucherazo, pirámide).</li>" +
        "<li><b>Oposición al sistema</b>: republicanos, carlistas, movimiento obrero y nacionalismos.</li>" +
        "<li><b>La crisis del 98</b>: Cuba, guerra con EE. UU., Tratado de París y consecuencias.</li>" +
        "<li><b>Conclusión</b>: un sistema estable pero fraudulento, que sobrevivió al 98 pero llegó a 1902 con una gran crisis de legitimidad.</li></ol>" +
        "<p>Cuida estas tres cosas: <b>fechas</b> (da cada una con su hecho), <b>vocabulario</b> (turnismo, caciquismo, pucherazo, encasillado) y <b>relación causa-consecuencia</b> (no te quedes solo en describir). Repasa el vocabulario con las tarjetas:</p>" +
        w("tarjetas", "tj1")
    },
    {
      h: "7. ¿Qué falla aquí? Errores típicos de este tema",
      html: "<p>Cada pregunta enseña una frase con un fallo frecuente. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "8. Autocomprobación del tema",
      html: "<p>Ocho preguntas para saber si el tema está en su sitio y un reto de cronología para fijar las fechas clave.</p>" + w("quiz", "quiz1") + w("orden", "cronologia")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    linea1: {
      titulo: "La Restauración, año a año",
      desde: 1874, hasta: 1902,
      tipos: { pol: ["Política", "var(--pen)"], gue: ["Guerras y colonias", "var(--red)"], soc: ["Sociedad y movimiento obrero", "var(--ok)"], nac: ["Nacionalismos e ideas", "#B58AF0"] },
      eventos: [
        { a: 1874, f: 0.92, m: "dic", t: "Manifiesto de Sandhurst", tipo: "pol", d: "Alfonso, de 17 años, hijo de Isabel II, se presenta como rey constitucional. El texto lo redacta Cánovas: prepara el regreso de los Borbones como una restauración «legal» y no como un golpe de fuerza." },
        { a: 1874, f: 0.99, m: "29 dic", t: "Pronunciamiento de Sagunto", tipo: "pol", d: "El general Martínez Campos proclama rey a Alfonso XII. Pone fin al Sexenio Democrático y a la Primera República, y abre la Restauración. Cánovas dirige un ministerio-regencia hasta la llegada del rey." },
        { a: 1876, f: 0.1, m: "feb", t: "Fin de la tercera guerra carlista", tipo: "gue", d: "Carlos VII cruza la frontera francesa. Termina la guerra civil que duraba desde 1872 y el Estado liberal respira tras décadas de conflicto." },
        { a: 1876, f: 0.5, m: "30 jun", t: "Constitución de 1876", tipo: "pol", d: "Soberanía compartida entre Rey y Cortes, confesionalidad católica con tolerancia privada y flexibilidad para conservadores y liberales. Estará en vigor hasta 1923, la más duradera de la historia de España." },
        { a: 1878, f: 0.12, m: "feb", t: "Paz de Zanjón", tipo: "gue", d: "Cierra la guerra de los Diez Años en Cuba (iniciada en 1868). Promete reformas que no se cumplen del todo, lo que deja el conflicto latente." },
        { a: 1879, f: 0.35, m: "mayo", t: "Fundación del PSOE", tipo: "soc", d: "Pablo Iglesias funda el Partido Socialista Obrero Español, primera gran organización obrera de ámbito estatal." },
        { a: 1881, f: 0.1, m: "feb", t: "Primer turno: gobierno de Sagasta", tipo: "pol", d: "Alfonso XII encarga el gobierno a los liberales de Sagasta. Es el primer cambio pacífico de partido: el turnismo echa a andar." },
        { a: 1885, f: 0.9, m: "25 nov", t: "Muerte de Alfonso XII · Pacto del Pardo", tipo: "pol", d: "Muere sin heredero varón. Cánovas y Sagasta pactan respetar la regencia de María Cristina y seguir turnándose, salvando el sistema." },
        { a: 1886, f: 0.4, m: "mayo", t: "Nace Alfonso XIII", tipo: "pol", d: "Nace el hijo póstumo de Alfonso XII, que será rey desde su nacimiento. Su madre, María Cristina, ejercerá la regencia hasta 1902." },
        { a: 1888, f: 0.6, m: "ago", t: "Fundación de la UGT", tipo: "soc", d: "Se constituye en Barcelona la Unión General de Trabajadores, el sindicato vinculado al PSOE." },
        { a: 1890, f: 0.45, m: "jun", t: "Sufragio universal masculino", tipo: "pol", d: "El gobierno liberal de Sagasta aprueba el voto para todos los varones mayores de 25 años. Amplía el cuerpo electoral, pero el caciquismo sigue controlando los resultados." },
        { a: 1892, f: 0.2, m: "mar", t: "Bases de Manresa", tipo: "nac", d: "La Unió Catalanista aprueba un programa de autonomía política para Cataluña: es un hito del catalanismo político." },
        { a: 1895, f: 0.15, m: "24 feb", t: "Grito de Baire: guerra de Cuba", tipo: "gue", d: "Comienza la insurrección cubana definitiva, organizada por José Martí. España envía miles de soldados a la isla." },
        { a: 1895, f: 0.58, m: "jul", t: "Sabino Arana funda el PNV", tipo: "nac", d: "Nace el Partido Nacionalista Vasco, que defiende la identidad y los derechos del pueblo vasco." },
        { a: 1897, f: 0.6, m: "8 ago", t: "Asesinato de Cánovas", tipo: "pol", d: "El anarquista italiano Michele Angiolillo mata a Cánovas en el balneario de Santa Águeda (Guipúzcoa). El sistema pierde a su gran artífice." },
        { a: 1898, f: 0.13, m: "15 feb", t: "Hundimiento del Maine", tipo: "gue", d: "Explota el acorazado estadounidense Maine en La Habana. EE. UU. culpa a España y la prensa sensacionalista presiona a favor de la guerra." },
        { a: 1898, f: 0.5, m: "may-jul", t: "Cavite y Santiago de Cuba", tipo: "gue", d: "En pocas semanas son destruidas las escuadras españolas de Montojo (Filipinas, 1 mayo) y de Cervera (Cuba, 3 julio)." },
        { a: 1898, f: 0.93, m: "10 dic", t: "Tratado de París", tipo: "gue", d: "España renuncia a Cuba y cede Puerto Rico, Guam y Filipinas a EE. UU. Es el «Desastre del 98»." },
        { a: 1899, f: 0.5, m: "", t: "Venta de las Carolinas, Marianas y Palaos", tipo: "gue", d: "España vende a Alemania lo que le quedaba del Pacífico: acaba su imperio colonial." },
        { a: 1901, f: 0.5, m: "", t: "«Oligarquía y caciquismo», de Costa", tipo: "nac", d: "Joaquín Costa presenta su estudio sobre el sistema político de la Restauración: la voz más famosa del regeneracionismo." },
        { a: 1902, f: 0.4, m: "17 may", t: "Alfonso XIII jura la Constitución", tipo: "pol", d: "Alfonso XIII, con 16 años, asume el trono y termina la regencia de su madre. Marca el final de la etapa clásica de la Restauración." }
      ]
    },

    proceso: {
      titulo: "Cómo se fabricaba una elección",
      consigna: "Ordena los pasos, del primero al último, de un cambio de gobierno en la Restauración.",
      items: [
        { t: "El gobierno pierde apoyos o desgaste, y el rey encarga formar gobierno al jefe del otro partido dinástico", nota: "Primero: el turno lo decide la Corona, no las urnas." },
        { t: "El nuevo gobierno disuelve las Cortes y convoca elecciones", nota: "Segundo: ya está en el poder y quiere una mayoría." },
        { t: "El Ministerio de la Gobernación elabora el encasillado: quién será diputado en cada distrito", nota: "Tercero: el resultado se decide antes de votar." },
        { t: "Gobernadores civiles y caciques movilizan a sus clientelas en cada provincia", nota: "Cuarto: la red local entra en acción." },
        { t: "El día de las elecciones se compran votos y se amañan las actas (pucherazo)", nota: "Quinto: se fabrica el resultado pactado." },
        { t: "Se constituyen unas Cortes con amplia mayoría para el gobierno entrante", nota: "Sexto: el círculo se cierra hasta el siguiente turno." }
      ]
    },

    cronologia: {
      titulo: "Reto de cronología",
      consigna: "Ordena estos seis hitos, del más antiguo al más reciente.",
      items: [
        { t: "Pronunciamiento de Martínez Campos en Sagunto", nota: "29 de diciembre de 1874" },
        { t: "Promulgación de la Constitución de 1876", nota: "30 de junio de 1876" },
        { t: "Pacto del Pardo tras la muerte de Alfonso XII", nota: "Noviembre de 1885" },
        { t: "Sufragio universal masculino", nota: "1890" },
        { t: "Grito de Baire: comienza la guerra de Cuba", nota: "24 de febrero de 1895" },
        { t: "Tratado de París: se pierden Cuba, Puerto Rico y Filipinas", nota: "10 de diciembre de 1898" }
      ]
    },

    clas98: {
      titulo: "Desastre del 98: ¿causa o consecuencia?",
      consigna: "Toca un hecho y después la categoría. Cuidado: hay que distinguir lo que lleva al Desastre de lo que viene después.",
      categorias: ["Causas (antes del Tratado de París)", "Consecuencias (después)"],
      items: [
        { t: "Insurrección cubana de 1895 (Grito de Baire)", c: 0 },
        { t: "Intereses económicos de EE. UU. en Cuba", c: 0 },
        { t: "Hundimiento del Maine (1898)", c: 0 },
        { t: "Inferioridad de la escuadra española", c: 0 },
        { t: "Pérdida de Cuba, Puerto Rico y Filipinas", c: 1 },
        { t: "Regeneracionismo y Generación del 98", c: 1 },
        { t: "Regreso de capitales a la Península", c: 1 },
        { t: "Venta de las islas del Pacífico a Alemania (1899)", c: 1 }
      ]
    },

    emp1: {
      titulo: "¿Quién es quién?",
      consigna: "Toca un personaje de la izquierda y su papel a la derecha.",
      pares: [
        ["Antonio Cánovas del Castillo", "Arquitecto del sistema; líder conservador"],
        ["Práxedes Mateo Sagasta", "Líder liberal; sufragio universal masculino (1890)"],
        ["Arsenio Martínez Campos", "General del pronunciamiento de Sagunto (1874)"],
        ["Pablo Iglesias", "Fundador del PSOE (1879) y de la UGT (1888)"],
        ["Sabino Arana", "Fundador del PNV (1895)"],
        ["Joaquín Costa", "Regeneracionismo; «Oligarquía y caciquismo» (1901)"],
        ["María Cristina de Habsburgo-Lorena", "Regente durante la minoría de Alfonso XIII"]
      ]
    },

    tj1: {
      titulo: "Vocabulario de la Restauración",
      cartas: [
        { a: "Pronunciamiento de Sagunto", b: "29 de diciembre de 1874. El general Martínez Campos proclama rey a Alfonso XII y abre la Restauración." },
        { a: "Turnismo", b: "Alternancia pactada en el gobierno entre conservadores (Cánovas) y liberales (Sagasta), con elecciones manipuladas." },
        { a: "Caciquismo", b: "Red de notables locales (caciques) que controlaban el voto a cambio de favores del poder." },
        { a: "Encasillado", b: "Reparto de distritos y candidatos hecho desde el Ministerio de la Gobernación antes de las elecciones." },
        { a: "Pucherazo", b: "Manipulación de los resultados electorales: actas falsas, votos comprados o a nombre de muertos." },
        { a: "Pacto del Pardo", b: "Noviembre de 1885. Tras la muerte de Alfonso XII, Cánovas y Sagasta pactan apoyar la regencia y seguir turnándose." },
        { a: "Constitución de 1876", b: "Soberanía compartida Rey-Cortes, Estado católico con tolerancia privada. Estuvo vigente hasta 1923." },
        { a: "Desastre del 98", b: "Pérdida de Cuba, Puerto Rico y Filipinas (Tratado de París, 10 de diciembre de 1898) tras la guerra con EE. UU." },
        { a: "Regeneracionismo", b: "Movimiento que, tras el 98, pide reformas para modernizar España. Su figura clave es Joaquín Costa." },
        { a: "Soberanía compartida", b: "Principio de 1876: el poder lo comparten el Rey y las Cortes (frente a la soberanía nacional de 1869)." }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña una afirmación con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«El turnismo funcionaba porque las elecciones eran libres y los españoles votaban alternativamente a conservadores y liberales.»",
          op: ["Es correcto", "Falso: el turno estaba pactado de antemano y las elecciones se manipulaban para darle mayoría al gobierno entrante", "Falso: solo gobernaban los conservadores", "Falso: no había elecciones"], ok: 1,
          porque: "En la Restauración se «hacía» primero el gobierno (por decisión del rey) y después las elecciones. El fraude y el caciquismo garantizaban la mayoría del gobierno de turno." },
        { q: "«La Constitución de 1876 establecía la soberanía nacional, como la de 1869.»",
          op: ["Es correcto", "Falso: establecía una soberanía compartida entre el Rey y las Cortes", "Falso: establecía la soberanía del Rey en exclusiva", "Falso: no incluía ninguna declaración sobre soberanía"], ok: 1,
          porque: "Cánovas buscaba un punto medio entre la Constitución moderada de 1845 y la democrática de 1869: el poder lo compartían Rey y Cortes." },
        { q: "«Sagasta fue el líder del Partido Conservador y Cánovas el del Liberal.»",
          op: ["Es correcto", "Falso: es al revés. Cánovas dirigía a los conservadores y Sagasta a los liberales", "Falso: ambos eran conservadores", "Falso: eran republicanos"], ok: 1,
          porque: "Cánovas del Castillo: Partido Liberal-Conservador. Práxedes Mateo Sagasta: Partido Liberal-Fusionista." },
        { q: "«El sufragio universal masculino de 1890 lo aprobó Cánovas y acabó con el caciquismo.»",
          op: ["Es correcto", "Falso: lo aprobó el gobierno liberal de Sagasta, y el caciquismo siguió controlando el voto", "Falso: era sufragio femenino", "Falso: lo aprobó la Primera República"], ok: 1,
          porque: "Fue una ley liberal (1890). Amplió el censo electoral, pero la estructura de caciques mantuvo el control de los resultados." },
        { q: "«Con el Desastre del 98 cayó inmediatamente el sistema político de la Restauración.»",
          op: ["Es correcto", "Falso: el sistema sobrevivió, aunque muy desprestigiado, hasta 1923", "Falso: cayó en 1895", "Falso: lo reforzó por completo"], ok: 1,
          porque: "La crisis del 98 provocó un gran examen de conciencia (regeneracionismo), pero el turnismo y el caciquismo continuaron hasta el golpe de Primo de Rivera (1923)." },
        { q: "«Los caciques eran funcionarios del Estado nombrados por el rey.»",
          op: ["Es correcto", "Falso: eran notables locales (propietarios, abogados…) con influencia social, no cargos oficiales", "Falso: eran militares", "Falso: eran clérigos"], ok: 1,
          porque: "El cacique tenía poder por su riqueza, sus relaciones y su capacidad de dar o negar favores. Hacía de intermediario entre el gobierno y los electores." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Qué ocurrió el 29 de diciembre de 1874?",
          op: ["La proclamación de la Primera República", "El pronunciamiento de Sagunto, que proclama rey a Alfonso XII", "La promulgación de la Constitución de 1876", "La muerte de Alfonso XII"], ok: 1,
          porque: "El general Martínez Campos se pronunció en Sagunto y proclamó rey a Alfonso XII: así empezó la Restauración." },
        { q: "¿Quién fue el principal arquitecto político de la Restauración?",
          op: ["Sagasta", "Pablo Iglesias", "Cánovas del Castillo", "Martínez Campos"], ok: 2,
          porque: "Cánovas diseñó el sistema: manifiesto de Sandhurst, Constitución de 1876 y turnismo." },
        { q: "¿Qué tipo de soberanía establecía la Constitución de 1876?",
          op: ["Soberanía nacional", "Soberanía compartida entre el Rey y las Cortes", "Soberanía exclusiva del Rey", "Soberanía popular directa"], ok: 1,
          porque: "Un punto intermedio entre la Constitución moderada de 1845 y la democrática de 1869." },
        { q: "El «encasillado» consistía en…",
          op: ["Repartir los escaños de antemano, distrito a distrito, desde el Ministerio de la Gobernación", "Encerrar a los opositores", "Clasificar a los electores por su renta", "Fijar el censo de población"], ok: 0,
          porque: "Era el reparto previo de candidatos y distritos que garantizaba la mayoría al gobierno entrante." },
        { q: "El Pacto del Pardo (1885) sirvió para…",
          op: ["Reconocer la independencia de Cuba", "Garantizar la regencia de María Cristina y mantener el turno entre los dos partidos", "Aprobar el sufragio universal", "Terminar la tercera guerra carlista"], ok: 1,
          porque: "Tras la muerte de Alfonso XII, Cánovas y Sagasta pactaron salvar el sistema." },
        { q: "Por el Tratado de París de 1898, España…",
          op: ["Ganó Cuba, Puerto Rico y Filipinas", "Renunció a Cuba y cedió Puerto Rico, Guam y Filipinas a EE. UU.", "Perdió solo Filipinas", "Compró Florida a EE. UU."], ok: 1,
          porque: "Cuba pasó a la tutela de EE. UU. e inició su independencia; Puerto Rico, Guam y Filipinas fueron cedidas." },
        { q: "El regeneracionismo fue…",
          op: ["Un partido político dinástico", "Un movimiento intelectual que, tras el 98, pedía reformas para modernizar España", "Una insurrección armada", "Un sindicato obrero"], ok: 1,
          porque: "Joaquín Costa fue su figura más conocida: «escuela y despensa» y el análisis de la «oligarquía y caciquismo»." },
        { q: "¿Qué organización fundó Pablo Iglesias en 1879?",
          op: ["La UGT", "El PNV", "El PSOE", "El Partido Conservador"], ok: 2,
          porque: "Fundó el PSOE en 1879 y la UGT en 1888." }
      ]
    }
  };

  // ============================================================
  // WIDGETS PROPIOS DE ESTE TEMA (diagramas SVG)
  // ============================================================

  // El turno en imagen: gobiernos conservadores y liberales, año a año (años redondeados)
  var GOBIERNOS = [
    { a: 1875, b: 1881, p: "C", t: "Cánovas", d: "Gobiernos conservadores de Cánovas (con un breve gobierno de Martínez Campos en 1879). Se consolida la Restauración: Constitución de 1876, fin de la guerra carlista, Paz de Zanjón." },
    { a: 1881, b: 1884, p: "L", t: "Sagasta", d: "Primer turno pacífico (1881): el rey encarga el gobierno a Sagasta. Los liberales gobiernan hasta 1884, con un gobierno de Posada Herrera de la izquierda dinástica." },
    { a: 1884, b: 1885, p: "C", t: "", d: "Vuelve Cánovas hasta la muerte de Alfonso XII, en noviembre de 1885." },
    { a: 1885, b: 1890, p: "L", t: "Sagasta", d: "Pacto del Pardo y «Parlamento largo»: Ley de Asociaciones (1887), Ley del Jurado (1888), Código Civil (1889) y sufragio universal masculino (1890)." },
    { a: 1890, b: 1892, p: "C", t: "Cánovas", d: "Gobierno conservador de Cánovas, con el arancel proteccionista de 1891 (favorece a la industria textil catalana y al trigo castellano)." },
    { a: 1892, b: 1895, p: "L", t: "Sagasta", d: "Gobierno liberal. En febrero de 1895 estalla la insurrección cubana (Grito de Baire)." },
    { a: 1895, b: 1897, p: "C", t: "Cánovas", d: "Cánovas dirige la respuesta militar a Cuba (Weyler, 1896) y es asesinado por el anarquista Angiolillo en agosto de 1897." },
    { a: 1897, b: 1899, p: "L", t: "Sagasta", d: "Sagasta concede la autonomía a Cuba (1897), demasiado tarde. Guerra con EE. UU. y Desastre del 98." },
    { a: 1899, b: 1901, p: "C", t: "Silvela", d: "Gobiernos conservadores de Silvela y Azcárraga, en pleno clima regeneracionista." },
    { a: 1901, b: 1902, p: "L", t: "", d: "Sagasta, ya anciano, gobierna hasta finales de 1902. Ese año, Alfonso XIII jura la Constitución y termina la regencia de María Cristina." }
  ];

  B.w.turno = function (host) {
    var cuerpo = B.caja(host, "Mira", "El turno en imagen");
    cuerpo.innerHTML = '<div class="tn-leyenda"><span><i class="tn-c"></i>Gobiernos conservadores</span><span><i class="tn-l"></i>Gobiernos liberales</span></div><div class="tn-fig"></div><div class="tn-det" aria-live="polite"><p class="hint">toca un tramo para ver qué pasó</p></div><p class="w-pie">Fechas redondeadas al año. Fíjate en la regularidad de la alternancia.</p>';
    var cont = cuerpo.querySelector(".tn-fig"), det = cuerpo.querySelector(".tn-det");
    var W = 640, Hh = 150, x0 = 18, x1 = W - 18, A0 = 1875, A1 = 1902;
    function X(a) { return x0 + (a - A0) / (A1 - A0) * (x1 - x0); }
    var s = svg("svg", { viewBox: "0 0 " + W + " " + Hh, "class": "tn-svg", role: "img", "aria-label": "Barra con los gobiernos conservadores y liberales de 1875 a 1902" }, cont);
    for (var a = A0; a <= A1; a++) {
      var grande = a % 5 === 0 || a === A1;
      svg("line", { x1: X(a), x2: X(a), y1: 86, y2: grande ? 98 : 92, "class": "tn-marca" }, s);
      if (grande) { var t = svg("text", { x: X(a), y: 114, "text-anchor": "middle", "class": "tn-num" }, s); t.textContent = a; }
    }
    var hitos = [[1885, "Pacto del Pardo"], [1890, "Sufragio univ. masc."], [1898, "Desastre del 98"]];
    hitos.forEach(function (h, i) {
      svg("line", { x1: X(h[0]), x2: X(h[0]), y1: 24 + 14 * (i % 2), y2: 62, "class": "tn-hito" }, s);
      var tx = svg("text", { x: X(h[0]), y: 18 + 14 * (i % 2), "text-anchor": h[0] > 1895 ? "end" : "middle", "class": "tn-et" }, s);
      tx.textContent = h[1];
    });
    var previo = null;
    GOBIERNOS.forEach(function (g) {
      var r = svg("rect", { x: X(g.a) + 1, y: 62, width: X(g.b) - X(g.a) - 2, height: 24, rx: 4, "class": "tn-seg " + (g.p === "C" ? "tn-c" : "tn-l"), tabindex: 0, role: "button", "aria-label": (g.p === "C" ? "Conservadores " : "Liberales ") + g.a + " a " + g.b }, s);
      if (X(g.b) - X(g.a) > 44) { var l = svg("text", { x: (X(g.a) + X(g.b)) / 2, y: 78, "text-anchor": "middle", "class": "tn-ini" }, s); l.textContent = g.p === "C" ? "C" : "L"; }
      function elige() {
        if (previo) previo.classList.remove("sel");
        r.classList.add("sel"); previo = r;
        det.innerHTML = "<h5>" + (g.p === "C" ? "Conservadores" : "Liberales") + " · " + g.a + "–" + g.b + (g.t ? " · " + g.t : "") + "</h5><p>" + g.d + "</p>";
      }
      r.addEventListener("click", elige);
      r.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elige(); } });
    });
  };

  // La pirámide del caciquismo
  var NIVELES = [
    { t: "Gobierno de Madrid", d: "El gobierno de turno y su ministro de la Gobernación diseñan el resultado: reparten el encasillado y deciden quién será diputado. Dan empleos, obras públicas y favores a cambio de apoyo." },
    { t: "Gobernadores civiles", d: "Nombrados por el gobierno, transmiten sus órdenes a las provincias, destituyen ayuntamientos poco fiables y supervisan las elecciones. Son el eslabón entre Madrid y los caciques." },
    { t: "Caciques locales", d: "Notables de cada comarca (grandes propietarios, abogados, prestamistas…). Controlan el voto de su zona a cambio de favores: cargos, exenciones, obras, influencia ante la Administración." },
    { t: "Electores", d: "La mayoría de la población: dependiente del cacique por trabajo, deudas o favores, o coaccionada. Muchos no votaban o votaban lo que se les indicaba." }
  ];
  B.w.piramide = function (host) {
    var cuerpo = B.caja(host, "Diagrama", "La pirámide del caciquismo");
    cuerpo.innerHTML = '<div class="pi-fig"></div><div class="tn-det" aria-live="polite"><p class="hint">toca un piso de la pirámide</p></div>';
    var cont = cuerpo.querySelector(".pi-fig"), det = cuerpo.querySelector(".tn-det");
    var s = svg("svg", { viewBox: "0 0 640 330", "class": "pi-svg", role: "img", "aria-label": "Pirámide de cuatro pisos: gobierno, gobernadores civiles, caciques y electores, con flechas de favores hacia abajo y votos hacia arriba" }, cont);
    var defs = svg("defs", null, s);
    ["f", "v"].forEach(function (id) { var m = svg("marker", { id: "pi-fl-" + id, viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, defs); svg("path", { d: "M0 0 L10 5 L0 10 z", "class": "pi-punta " + id }, m); });
    var cx = 320, y = 14, h = 72, wTop = 196, paso = 52, previo = null;
    NIVELES.forEach(function (n, i) {
      var w1 = wTop + paso * i, w2 = wTop + paso * (i + 1), y1 = y + h * i, y2 = y1 + h - 4;
      var pol = svg("polygon", { points: (cx - w1 / 2) + "," + y1 + " " + (cx + w1 / 2) + "," + y1 + " " + (cx + w2 / 2) + "," + y2 + " " + (cx - w2 / 2) + "," + y2, "class": "pi-piso p" + i, tabindex: 0, role: "button", "aria-label": n.t }, s);
      var t = svg("text", { x: cx, y: y1 + h / 2 + 2, "text-anchor": "middle", "class": "pi-txt t" + i }, s); t.textContent = n.t;
      function elige() { if (previo) previo.classList.remove("sel"); pol.classList.add("sel"); previo = pol; det.innerHTML = "<h5>" + n.t + "</h5><p>" + n.d + "</p>"; }
      pol.addEventListener("click", elige); t.addEventListener("click", elige);
      pol.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elige(); } });
      t.style.cursor = "pointer";
    });
    svg("line", { x1: 74, y1: 28, x2: 74, y2: 270, "class": "pi-flecha f", "marker-end": "url(#pi-fl-f)" }, s);
    var tf = svg("text", { x: 14, y: 150, "class": "pi-et f", transform: "rotate(-90 14 150)", "text-anchor": "middle" }, s); tf.textContent = "favores: empleos, obras, exenciones";
    svg("line", { x1: 566, y1: 270, x2: 566, y2: 28, "class": "pi-flecha v", "marker-end": "url(#pi-fl-v)" }, s);
    var tv = svg("text", { x: 626, y: 150, "class": "pi-et v", transform: "rotate(90 626 150)", "text-anchor": "middle" }, s); tv.textContent = "votos y obediencia";
  };

  // ============================================================
  // EJERCICIOS NUEVOS (nivel 1 ★ · 2 ★★ · 3 ★★★ PAU) con comprobación o autoevaluación
  // ============================================================
  var ejercicios = [
    { id: "h1", nivel: 1,
      enunciado: "¿Cuándo se produjo el pronunciamiento del general Martínez Campos en Sagunto, que proclamó rey a Alfonso XII?",
      check: { tipo: "opcion", etiqueta: "Fecha", opciones: ["29 de diciembre de 1874", "3 de enero de 1874", "30 de junio de 1876", "25 de noviembre de 1885"], ok: 0 },
      pistas: ["Fue a finales del año 1874, justo antes de la llegada del rey a España en enero de 1875."],
      pasos: ["El pronunciamiento de Sagunto fue el <b>29 de diciembre de 1874</b>.", "El 3 de enero de 1874 fue el golpe del general Pavía contra la Primera República; el 30 de junio de 1876, la Constitución; el 25 de noviembre de 1885, la muerte de Alfonso XII."],
      resultado: "29 de diciembre de 1874" },
    { id: "h2", nivel: 1,
      enunciado: "Alfonso XIII nació en 1886, hijo póstumo de Alfonso XII, y juró la Constitución en 1902 al terminar la regencia de su madre. ¿Cuántos años tenía entonces?",
      check: { tipo: "num", etiqueta: "Edad =", valor: 16, unidad: "años" },
      pistas: ["Resta el año de nacimiento al año de la jura."],
      pasos: ["1902 − 1886 = 16", "Nació el 17 de mayo de 1886 y juró el 17 de mayo de 1902: justo 16 años."],
      resultado: "16 años" },
    { id: "h3", nivel: 2,
      enunciado: "Indica si cada afirmación sobre la Restauración es verdadera o falsa.",
      check: [
        { tipo: "opcion", etiqueta: "a) El turnismo se basaba en elecciones libres", opciones: ["Verdadero", "Falso"], ok: 1 },
        { tipo: "opcion", etiqueta: "b) Cánovas y Sagasta dirigían los dos partidos dinásticos", opciones: ["Verdadero", "Falso"], ok: 0 },
        { tipo: "opcion", etiqueta: "c) La Constitución de 1876 estuvo vigente hasta 1923", opciones: ["Verdadero", "Falso"], ok: 0 },
        { tipo: "opcion", etiqueta: "d) El sufragio universal masculino (1890) acabó con el fraude electoral", opciones: ["Verdadero", "Falso"], ok: 1 },
        { tipo: "opcion", etiqueta: "e) El Desastre del 98 provocó la caída inmediata de la monarquía", opciones: ["Verdadero", "Falso"], ok: 1 }
      ],
      pistas: ["Recuerda: el turno estaba pactado de antemano y el caciquismo seguía funcionando.", "El sistema sobrevivió al 98, aunque desprestigiado."],
      pasos: ["a) <b>Falso</b>: el turno estaba pactado y las elecciones se manipulaban.", "b) <b>Verdadero</b>: Cánovas (conservadores) y Sagasta (liberales).", "c) <b>Verdadero</b>: de 1876 a 1923.", "d) <b>Falso</b>: se amplió el censo, pero el caciquismo siguió controlando el voto.", "e) <b>Falso</b>: el sistema sobrevivió hasta 1923, aunque muy debilitado."],
      resultado: "a) F · b) V · c) V · d) F · e) F" },
    { id: "h4", nivel: 2,
      enunciado: "Define «turnismo» y «caciquismo» y explica cómo se relacionan entre sí. Responde con tus palabras, en 5-8 líneas.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Define el turnismo: alternancia pactada en el gobierno entre conservadores y liberales", p: 0.5 },
        { t: "Cita a los líderes de los dos partidos (Cánovas y Sagasta)", p: 0.5 },
        { t: "Define el caciquismo: red de notables locales que controlaban el voto", p: 0.5 },
        { t: "Relaciona ambos: el caciquismo y el pucherazo garantizaban el resultado que exigía el turno", p: 0.5 }
      ] },
      pasos: ["El <b>turnismo</b> era la alternancia pactada en el gobierno entre los dos partidos dinásticos, el Conservador de Cánovas y el Liberal de Sagasta.", "El <b>caciquismo</b> era la red de notables locales (caciques) que controlaban el voto en cada distrito mediante favores, presiones o fraude (pucherazo).", "<b>Relación</b>: para que el turno funcionara, el gobierno entrante necesitaba mayoría en las Cortes. El caciquismo fabricaba esas mayorías, así que sin él el turnismo no habría podido mantenerse."],
      resultado: "El turnismo (pacto de alternancia) necesitaba del caciquismo (fraude y control local del voto) para producir mayorías previsibles." },
    { id: "h5", nivel: 3,
      enunciado: "Comentario guiado. Comenta el siguiente texto siguiendo los cuatro pasos (clasificación, idea principal y análisis, contexto, conclusión).<div class='cita'><p>«La religión católica, apostólica, romana, es la del Estado. La Nación se obliga a mantener el culto y sus ministros. Nadie será molestado en territorio español por sus opiniones religiosas, ni por el ejercicio de su respectivo culto, salvo el respeto debido a la moral cristiana. No se permitirán, sin embargo, otras ceremonias ni manifestaciones públicas que las de la religión del Estado.»</p><cite>Constitución de 1876, art. 11</cite></div>",
      check: { tipo: "rubrica", etiqueta: "Tu comentario", filas: 9, items: [
        { t: "Clasifica: texto jurídico-político, fuente primaria, artículo 11 de la Constitución de 1876", p: 0.5 },
        { t: "Idea principal: Estado confesional católico con tolerancia solo en el ámbito privado", p: 0.5 },
        { t: "Análisis: el Estado mantiene el culto, no se molesta por las creencias, pero se prohíben manifestaciones públicas de otros cultos", p: 1 },
        { t: "Contexto: reacción frente a la libertad de cultos de 1869 y búsqueda del apoyo de la Iglesia y los conservadores en la Restauración", p: 0.5 },
        { t: "Conclusión: solución de compromiso entre confesionalidad y tolerancia, que contribuyó a la estabilidad del sistema", p: 0.5 }
      ] },
      pasos: ["<b>Clasificación</b>: texto jurídico-político, fuente primaria. Es el artículo 11 de la Constitución de 1876, redactado en el marco del sistema de Cánovas.", "<b>Idea principal y análisis</b>: se declara a la religión católica como la oficial del Estado, que se compromete a mantener el culto y sus ministros. Al mismo tiempo, nadie será molestado por sus creencias ni por practicar su culto, pero solo en privado: no se permiten ceremonias ni manifestaciones públicas de otros cultos.", "<b>Contexto</b>: el Sexenio Democrático (Constitución de 1869) había proclamado la libertad de cultos. La Restauración busca el apoyo de la Iglesia y de los sectores conservadores, así que recupera la confesionalidad, pero con un gesto de tolerancia hacia otras creencias para no romper con los liberales.", "<b>Conclusión</b>: es una fórmula de compromiso entre la confesionalidad y la tolerancia. Reconoce una libertad de conciencia limitada, y encaja con el espíritu conciliador del sistema canovista."],
      resultado: "Estado confesional católico con tolerancia privada: compromiso entre 1845 y 1869, típico del sistema canovista." },
    { id: "h6", nivel: 3,
      enunciado: "Explica las causas y las consecuencias del Desastre del 98. Redáctalo como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 9, items: [
        { t: "Causa: la insurrección cubana desde 1895 y el desgaste militar y económico de la guerra", p: 0.5 },
        { t: "Causa: los intereses de EE. UU. en Cuba y el incidente del Maine (1898) como detonante", p: 0.5 },
        { t: "Cita los hechos principales: Cavite, Santiago de Cuba y el Tratado de París (10 dic. 1898)", p: 0.5 },
        { t: "Consecuencia territorial: pérdida de Cuba, Puerto Rico, Filipinas (y venta de las islas del Pacífico en 1899)", p: 0.5 },
        { t: "Consecuencias políticas y militares: desprestigio del sistema y malestar del ejército", p: 0.5 },
        { t: "Consecuencias intelectuales: regeneracionismo y Generación del 98 (con un nombre)", p: 0.5 }
      ] },
      pasos: ["<b>Causas</b>: la insurrección cubana de 1895 desgastó al ejército y a la Hacienda españolas. EE. UU., con intereses económicos en Cuba, intervino tras la explosión del <em>Maine</em> (febrero de 1898) con el apoyo de una prensa belicista, y se encontró con una flota española anticuada.", "<b>Desarrollo</b>: destrucción de la escuadra de Montojo en Cavite (1 mayo) y de la de Cervera en Santiago de Cuba (3 julio). Tratado de París, 10 de diciembre de 1898.", "<b>Consecuencias territoriales</b>: España pierde Cuba, Puerto Rico y Filipinas; en 1899 vende el resto del Pacífico a Alemania.", "<b>Consecuencias políticas y económicas</b>: el sistema de la Restauración sobrevive, pero queda desacreditado; malestar en el ejército; regreso de capitales a la Península.", "<b>Consecuencias intelectuales</b>: el regeneracionismo de Joaquín Costa y la Generación del 98 (Unamuno, Baroja, Machado…) examinan las causas del atraso de España."],
      resultado: "Causas: guerra de Cuba, intereses de EE. UU., Maine. Consecuencias: pérdida del imperio, crisis del sistema, regeneracionismo." },
    { id: "h7", nivel: 3,
      enunciado: "Explica cómo funcionaba realmente el sistema político de la Restauración: qué decía la Constitución y qué ocurría en la práctica.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 8, items: [
        { t: "Constitución de 1876: soberanía compartida entre Rey y Cortes, con amplios poderes de la Corona", p: 0.5 },
        { t: "El rey encargaba el gobierno al jefe de un partido dinástico (turnismo)", p: 0.5 },
        { t: "Elecciones a posteriori: el nuevo gobierno disolvía las Cortes y organizaba el resultado (encasillado)", p: 0.5 },
        { t: "El caciquismo y el pucherazo aseguraban la mayoría", p: 0.5 },
        { t: "Concluye que el sistema era estable pero no democrático: dejaba fuera a republicanos, obreros y nacionalistas", p: 0.5 }
      ] },
      pasos: ["<b>Teoría</b>: la Constitución de 1876 establecía una soberanía compartida entre el Rey y las Cortes. El Rey nombraba y cesaba a los ministros y podía disolver las Cortes.", "<b>Práctica</b>: el Rey encargaba el gobierno al jefe de uno de los dos partidos dinásticos (turnismo). El nuevo gobierno disolvía las Cortes y convocaba elecciones, cuyo resultado se pactaba antes mediante el encasillado.", "<b>Mecanismo</b>: gobernadores civiles y caciques locales compraban o coaccionaban votos y falseaban actas (pucherazo), para dar la mayoría al gobierno entrante.", "<b>Valoración</b>: el sistema aportó estabilidad (se acabaron los pronunciamientos), pero a costa de falsear la voluntad popular y de excluir a republicanos, movimiento obrero y nacionalismos periféricos."],
      resultado: "Estabilidad conseguida con elecciones falseadas: un sistema formalmente constitucional, pero no democrático." }
  ];

  // ============================================================
  // LÁMINA RESUMEN
  // ============================================================
  var lamina = [
    { titulo: "Cronología de la Restauración", ancha: true,
      tabla: { cab: ["Año", "Hecho"], filas: [
        ["1874", "29 dic.: pronunciamiento de Sagunto. Manifiesto de Sandhurst (dic.)"],
        ["1876", "Fin de la guerra carlista (feb.) · Constitución (30 jun.)"],
        ["1878", "Paz de Zanjón: fin de la guerra de los Diez Años en Cuba"],
        ["1879 · 1888", "Fundación del PSOE (1879) y de la UGT (1888)"],
        ["1881", "Primer turno: gobierno de Sagasta"],
        ["1885", "Muerte de Alfonso XII (nov.) · Pacto del Pardo · regencia de María Cristina"],
        ["1890", "Sufragio universal masculino (Sagasta)"],
        ["1892 · 1895", "Bases de Manresa (1892) · Fundación del PNV (1895)"],
        ["1895", "Grito de Baire: guerra de Cuba"],
        ["1897", "Asesinato de Cánovas (Angiolillo)"],
        ["1898", "Maine (feb.) · Cavite y Santiago (may.-jul.) · Tratado de París (10 dic.)"],
        ["1901 · 1902", "Costa: «Oligarquía y caciquismo» (1901) · Alfonso XIII jura la Constitución (1902)"]
      ] } },
    { titulo: "Cómo funcionaba el sistema",
      pasos: ["El rey encarga el gobierno al otro partido dinástico.", "Se disuelven las Cortes y se convocan elecciones.", "Gobernación fija el <b>encasillado</b> (candidatos por distrito).", "Gobernadores y <b>caciques</b> movilizan el voto.", "<b>Pucherazo</b> y compra de votos.", "Cortes con mayoría para el nuevo gobierno."],
      nota: "Primero el gobierno, después las elecciones." },
    { titulo: "Constitución de 1876",
      pasos: ["<b>Soberanía compartida</b> Rey-Cortes.", "Cortes bicamerales (Congreso y Senado).", "Amplios poderes de la Corona.", "Estado católico con tolerancia privada (art. 11).", "Sufragio a cargo de leyes ordinarias.", "Flexible: vigente hasta 1923."] },
    { titulo: "Vocabulario clave", ancha: true,
      tabla: { cab: ["Término", "Significado"], filas: [
        ["Turnismo", "Alternancia pactada conservadores-liberales"],
        ["Caciquismo", "Red de notables locales que controlaban el voto"],
        ["Encasillado", "Reparto previo de distritos y candidatos"],
        ["Pucherazo", "Manipulación de actas y votos"],
        ["Cunero", "Candidato impuesto sin relación con el distrito"],
        ["Pacto del Pardo", "1885: salvar el sistema tras la muerte de Alfonso XII"],
        ["Regeneracionismo", "Movimiento del 98 que pide modernizar España"]
      ] } },
    { titulo: "Desastre del 98", ancha: true,
      tabla: { cab: ["Causas", "Consecuencias"], filas: [
        ["Insurrección cubana (1895) y desgaste", "Pérdida de Cuba, Puerto Rico, Guam y Filipinas"],
        ["Intereses de EE. UU. en la isla", "Venta de las islas del Pacífico a Alemania (1899)"],
        ["Hundimiento del Maine (1898)", "Regreso de capitales y crisis de mercados coloniales"],
        ["Flota española anticuada", "Desprestigio del sistema y malestar militar"],
        ["", "Regeneracionismo y Generación del 98"]
      ] } },
    { titulo: "Cómo comentar una fuente histórica",
      pasos: ["<b>Clasifica</b>: tipo de texto, autor, fecha, destinatario, intención.", "<b>Idea principal</b> y análisis de las ideas clave.", "<b>Contextualiza</b>: ¿qué momento histórico lo explica?", "<b>Conclusión</b>: importancia y consecuencias."],
      nota: "Sirve para cualquier texto histórico, no solo para este tema." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "El turnismo se basaba en elecciones libres", bien: "El turno estaba pactado y las elecciones se manipulaban", por: "El gobierno se decidía antes que las urnas." },
        { mal: "Sagasta, líder conservador", bien: "Cánovas = conservadores · Sagasta = liberales", por: "Fácil de confundir: apréndelo en pareja." },
        { mal: "1876 = soberanía nacional", bien: "Soberanía compartida Rey-Cortes", por: "La soberanía nacional es de 1869." },
        { mal: "El 98 acabó con la Restauración", bien: "El sistema sobrevivió, desprestigiado, hasta 1923", por: "Hubo crisis, no derrumbe inmediato." }
      ] }
  ];

  B.registrar("historia_esp", "t7", { secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 1: Números reales
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, formula = H.formula, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t1/" + ref); }

  var resumen = [
    "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. <b>Racional</b> = decimal exacto o periódico (se puede escribir como fracción); <b>irracional</b> = infinitos decimales sin patrón.",
    "Un intervalo se escribe de tres formas (notación, desigualdad, recta). Corchete: el extremo <b>entra</b>; paréntesis: <b>no entra</b>.",
    "|x − a| es la <b>distancia</b> entre x y a. «&lt; k» da un intervalo; «&gt; k» da dos semirrectas.",
    "Radicales: saca los cuadrados perfectos y <b>racionaliza</b>; si el denominador tiene una suma o resta con raíces, multiplica por el <b>conjugado</b>.",
    "Notación científica a·10ⁿ con 1 ≤ a &lt; 10. Error relativo = error absoluto ÷ valor real."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Clasificación
  secciones[0] =
    "<h5>Decimal ⇄ fracción: la prueba de que un número es racional</h5>" +
    "<p>La definición de racional («se puede escribir como fracción») es poco práctica si no sabes <em>cómo</em> escribirlo. Por suerte hay un criterio muy cómodo: <b>un número es racional si y solo si su expresión decimal es exacta o periódica</b>. Y siempre se puede pasar de un decimal a una fracción con un truco: multiplicar por una potencia de 10 y restar para que desaparezca la parte que se repite.</p>" +
    "<p>Se distinguen tres casos:</p>" +
    "<ul><li><b>Decimal exacto</b> (por ejemplo 1,24): se escribe con una potencia de 10 en el denominador y se simplifica. 1,24 = 124/100 = 31/25.</li>" +
    "<li><b>Periódico puro</b> (el periodo empieza justo tras la coma, por ejemplo 0,4545…): se multiplica por 10 elevado al número de cifras del periodo y se resta.</li>" +
    "<li><b>Periódico mixto</b> (hay cifras antes del periodo, por ejemplo 3,2777…): se multiplica dos veces, una para llevar la coma justo antes del periodo y otra para llevarla justo después, y se resta.</li></ul>" +
    ejemplo("Periódico puro", "Escribe 0,4545… como fracción.", [
      "Llamamos x = 0,4545… El periodo (45) tiene 2 cifras, así que multiplicamos por 10² = 100.",
      "100x = 45,4545…   y   x = 0,4545…",
      "Restamos: 100x − x = 45,4545… − 0,4545… = 45, y por tanto 99x = 45.",
      "Despejamos y simplificamos: x = 45/99 = <b>5/11</b>.",
      "Comprobación: 5 ÷ 11 = 0,454545… ✓"
    ]) +
    ejemplo("Periódico mixto", "Escribe 3,2777… como fracción.", [
      "Llamamos x = 3,2777… Antes del periodo (7) hay una cifra (el 2), así que primero multiplicamos por 10 para que la coma quede justo antes del periodo: 10x = 32,777…",
      "Ahora multiplicamos por 100 para que la coma quede justo después de un periodo: 100x = 327,777…",
      "Restamos las dos: 100x − 10x = 327,777… − 32,777… = 295, es decir, 90x = 295.",
      "x = 295/90 = <b>59/18</b>.",
      "Regla rápida: <b>(número entero sin coma) − (parte que no se repite)</b> sobre tantos 9 como cifras tiene el periodo, seguidos de tantos 0 como cifras tiene la parte decimal que no se repite. Aquí (327 − 32)/90 ✓"
    ]) +
    "<h5>Fracción → decimal: cómo saber de antemano qué sale</h5>" +
    "<p>Al dividir el numerador entre el denominador, la división se corta o se repite. Hay un criterio para saberlo sin dividir: <b>simplifica la fracción</b> y descompón el denominador en factores primos. Si solo aparecen el 2 y el 5, el decimal es <b>exacto</b>; si aparece cualquier otro primo, es <b>periódico</b>.</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>7/20</td><td>20 = 2²·5 → solo 2 y 5 → exacto: 0,35</td></tr>" +
    "<tr><td>5/12</td><td>12 = 2²·3 → aparece el 3 → periódico mixto: 0,41666…</td></tr>" +
    "<tr><td>4/9</td><td>9 = 3² → periódico puro: 0,444…</td></tr>" +
    "<tr><td>1/7</td><td>7 → periódico puro con un periodo de 6 cifras: 0,142857142857…</td></tr>" +
    "</tbody></table>" +
    "<h5>Qué pasa al operar con racionales e irracionales</h5>" +
    "<p>Dentro de ℚ puedes sumar, restar, multiplicar y dividir (salvo por 0) y el resultado sigue siendo racional. Con irracionales hay que ir con cuidado:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>racional + racional</td><td>siempre racional: 1/2 + 1/3 = 5/6</td></tr>" +
    "<tr><td>racional + irracional</td><td>siempre irracional: 1 + √2</td></tr>" +
    "<tr><td>racional (≠ 0) · irracional</td><td>siempre irracional: 3·π</td></tr>" +
    "<tr><td>irracional + irracional</td><td><b>puede ser cualquiera</b>: √2 + (−√2) = 0 es racional, pero √2 + √3 es irracional</td></tr>" +
    "<tr><td>irracional · irracional</td><td><b>puede ser cualquiera</b>: √2·√2 = 2 es racional, pero √2·√3 = √6 es irracional</td></tr>" +
    "</tbody></table>" +
    "<p>Ahora juega: clasifica cada número en el conjunto <em>más pequeño</em> al que pertenece.</p>" +
    w("clasificar", "clasnum");

  // ---------------------------------------------------------------- 2. Recta e intervalos
  secciones[1] =
    "<h5>Tres maneras de escribir lo mismo</h5>" +
    "<p>Un mismo conjunto de números se puede describir con notación de intervalo, con una desigualdad o dibujándolo en la recta. En los problemas tienes que pasar de una a otra sin pensar:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>[−2, 5)</td><td>−2 ≤ x &lt; 5</td><td>círculo relleno en −2, hueco en 5, y todo lo de en medio</td></tr>" +
    "<tr><td>(−3, 1]</td><td>−3 &lt; x ≤ 1</td><td>hueco en −3, relleno en 1</td></tr>" +
    "<tr><td>[0, 4]</td><td>0 ≤ x ≤ 4</td><td>relleno en los dos extremos</td></tr>" +
    "<tr><td>(2, +∞)</td><td>x &gt; 2</td><td>hueco en 2 y flecha hacia la derecha</td></tr>" +
    "<tr><td>(−∞, 3]</td><td>x ≤ 3</td><td>relleno en 3 y flecha hacia la izquierda</td></tr>" +
    "<tr><td>(−∞, +∞)</td><td>cualquier x</td><td>toda la recta (es ℝ)</td></tr>" +
    "</tbody></table>" +
    "<p>Regla de oro: <b>±∞ siempre lleva paréntesis</b>, porque el infinito no es un número y por tanto nunca «entra». Mueve los extremos y observa cómo cambia cada forma de escritura:</p>" +
    w("intervalos") +
    "<h5>Desigualdades: la regla que más se olvida</h5>" +
    "<p>Las inecuaciones se resuelven igual que las ecuaciones, con una excepción importante: <b>si multiplicas o divides los dos lados por un número negativo, el sentido de la desigualdad se invierte</b>. Lo ves con números: 2 &lt; 5 es verdad, pero al multiplicar por −1 queda −2 &gt; −5, no −2 &lt; −5.</p>" +
    ejemplo("Inecuación de primer grado", "Resuelve 5 − 3x ≤ 11 y escribe la solución como intervalo.", [
      "Restamos 5 en los dos lados: −3x ≤ 6.",
      "Dividimos entre −3. Como es negativo, <b>invertimos</b> el sentido: x ≥ −2.",
      "Solución: <b>[−2, +∞)</b>.",
      "Comprobación con x = 0 (que está en la solución): 5 − 0 = 5 ≤ 11 ✓. Con x = −3 (fuera): 5 + 9 = 14 ≤ 11 es falso ✓."
    ]) +
    ejemplo("Sistema de inecuaciones", "Resuelve a la vez: 2x − 1 &lt; 7   y   3x + 2 ≥ −4.", [
      "Primera: 2x &lt; 8 → x &lt; 4, es decir, (−∞, 4).",
      "Segunda: 3x ≥ −6 → x ≥ −2, es decir, [−2, +∞).",
      "Como se piden las dos a la vez, se hace la <b>intersección</b>: (−∞, 4) ∩ [−2, +∞) = <b>[−2, 4)</b>."
    ]) +
    "<h5>Unión e intersección de intervalos</h5>" +
    "<p>La <b>intersección</b> A ∩ B son los números que están en A <em>y</em> en B. La <b>unión</b> A ∪ B son los que están en A <em>o</em> en B (o en los dos). Ayúdate de la recta: dibuja A arriba y B debajo, y mira dónde coinciden o dónde cubren.</p>" +
    w("opintervalos") +
    ejemplo("Dos operaciones", "Sean A = [−2, 3) y B = (0, 5]. Calcula A ∩ B y A ∪ B.", [
      "Dibujamos A: de −2 (incluido) a 3 (no incluido). Dibujamos B: de 0 (no incluido) a 5 (incluido).",
      "Intersección: empieza donde empieza el más a la derecha (0, que no entra porque B no lo incluye) y acaba donde acaba el más a la izquierda (3, que no entra porque A no lo incluye): <b>A ∩ B = (0, 3)</b>.",
      "Unión: empieza en el más pequeño (−2, que entra porque A lo incluye) y acaba en el más grande (5, que entra porque B lo incluye); como se solapan, no queda hueco: <b>A ∪ B = [−2, 5]</b>."
    ]) +
    ojo("si dos intervalos se tocan en un punto, mira si ese punto entra en alguno. (0, 2) ∪ (2, 5) <em>no</em> contiene el 2 y son dos trozos; pero (0, 2) ∪ [2, 5) = (0, 5) sí es un solo intervalo.") +
    "<h5>Entornos</h5>" +
    "<p>El <b>entorno</b> de centro a y radio r es E(a, r) = (a − r, a + r) = {x : |x − a| &lt; r}. El <b>entorno reducido</b> E*(a, r) es lo mismo pero sin el centro: (a − r, a) ∪ (a, a + r). Ejemplo: E(3; 0,5) = (2,5; 3,5). Los entornos serán la herramienta para definir límites y continuidad en el Tema 10.</p>";

  // ---------------------------------------------------------------- 3. Valor absoluto
  secciones[2] =
    "<h5>Valor absoluto = distancia</h5>" +
    "<p>La mejor forma de entender |x − a| es leerlo como «la distancia entre x y a». Con esa idea, las ecuaciones e inecuaciones se resuelven <em>mirando</em> la recta. Experimenta cambiando el centro, el radio y el signo de la desigualdad:</p>" +
    w("valorabs") +
    "<h5>Propiedades útiles</h5>" +
    "<ul><li>|a| ≥ 0 siempre, y |a| = 0 solo si a = 0.</li>" +
    "<li>|a·b| = |a|·|b| y |a/b| = |a|/|b| (b ≠ 0).</li>" +
    "<li>|a| = √(a²). Por eso √(a²) = |a| y no «a».</li>" +
    "<li><b>Desigualdad triangular</b>: |a + b| ≤ |a| + |b|. (Con a = 3 y b = −5: |−2| = 2 ≤ 3 + 5 = 8.) Nunca se puede decir que |a + b| = |a| + |b| salvo que a y b tengan el mismo signo.</li></ul>" +
    "<h5>El valor absoluto como función a trozos</h5>" +
    "<p>Para quitar las barras sin la ayuda de la recta se estudia el signo del interior: |A| = A cuando A ≥ 0, y |A| = −A cuando A &lt; 0. Por ejemplo, f(x) = |2x − 4| vale 2x − 4 si 2x − 4 ≥ 0, es decir, si x ≥ 2; y vale −(2x − 4) = 4 − 2x si x &lt; 2. Su gráfica es una «V» con vértice en (2, 0).</p>" +
    w("grafabs") +
    "<h5>Ecuaciones con valor absoluto</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>|A| = k  con k &gt; 0</td><td>dos casos: A = k  ó  A = −k</td></tr>" +
    "<tr><td>|A| = 0</td><td>una sola: A = 0</td></tr>" +
    "<tr><td>|A| = k  con k &lt; 0</td><td><b>no tiene solución</b> (una distancia nunca es negativa)</td></tr>" +
    "<tr><td>|A| = |B|</td><td>A = B  ó  A = −B</td></tr>" +
    "<tr><td>|A| = B  (B es una expresión con x)</td><td>exige B ≥ 0; se resuelven los dos casos y <b>se comprueban</b> las soluciones</td></tr>" +
    "</tbody></table>" +
    ejemplo("Ecuación con una expresión a la derecha", "Resuelve |x − 1| = 2x + 3.", [
      "Como un valor absoluto no puede ser negativo, es necesario que 2x + 3 ≥ 0, es decir, x ≥ −3/2. Esa es la condición que hay que comprobar al final.",
      "Caso 1: x − 1 = 2x + 3 → −x = 4 → x = −4. Pero −4 &lt; −3/2, así que no cumple la condición: <b>se descarta</b>.",
      "Caso 2: x − 1 = −(2x + 3) → x − 1 = −2x − 3 → 3x = −2 → x = −2/3. Cumple −2/3 ≥ −3/2: <b>vale</b>.",
      "Comprobación: |−2/3 − 1| = 5/3 y 2·(−2/3) + 3 = 5/3 ✓. Solución única: <b>x = −2/3</b>."
    ]) +
    ejemplo("Igualdad de dos valores absolutos", "Resuelve |x − 1| = |2x + 3|.", [
      "Dos números tienen el mismo valor absoluto cuando son iguales u opuestos: x − 1 = 2x + 3  ó  x − 1 = −(2x + 3).",
      "Primera: x − 1 = 2x + 3 → x = −4.",
      "Segunda: x − 1 = −2x − 3 → 3x = −2 → x = −2/3.",
      "En este tipo no hace falta comprobar el signo, porque los dos lados ya son valores absolutos. Soluciones: <b>x = −4 y x = −2/3</b>."
    ]) +
    "<h5>Inecuaciones con valor absoluto</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>|A| &lt; k  (k &gt; 0)</td><td>−k &lt; A &lt; k: <b>un intervalo</b></td></tr>" +
    "<tr><td>|A| ≤ k</td><td>−k ≤ A ≤ k</td></tr>" +
    "<tr><td>|A| &gt; k  (k &gt; 0)</td><td>A &lt; −k  ó  A &gt; k: <b>dos semirrectas</b> (unión)</td></tr>" +
    "<tr><td>|A| ≥ k</td><td>A ≤ −k  ó  A ≥ k</td></tr>" +
    "<tr><td>|A| &lt; k  con k ≤ 0</td><td>sin solución (|A| &lt; 0 es imposible; |A| &lt; 0 nunca)</td></tr>" +
    "<tr><td>|A| &gt; k  con k &lt; 0</td><td>toda la recta (siempre es verdad)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Tipo «menor que»", "Resuelve |2x − 1| &lt; 5.", [
      "−5 &lt; 2x − 1 &lt; 5 (se quita el valor absoluto con la doble desigualdad).",
      "Sumamos 1 a las tres partes: −4 &lt; 2x &lt; 6.",
      "Dividimos entre 2 (positivo, no cambia el sentido): −2 &lt; x &lt; 3.",
      "Solución: <b>(−2, 3)</b>. Interpretación: los x cuya distancia a 1/2 es menor que 5/2."
    ]) +
    ejemplo("Tipo «mayor que»", "Resuelve |x + 2| ≥ 3.", [
      "|x + 2| ≥ 3 significa x + 2 ≤ −3  ó  x + 2 ≥ 3.",
      "Primera: x ≤ −5. Segunda: x ≥ 1.",
      "Solución: <b>(−∞, −5] ∪ [1, +∞)</b>. Fíjate en que ahora es una <em>unión</em>, no una intersección."
    ]) +
    ejemplo("Con una expresión en el lado derecho", "Resuelve |x − 1| &lt; 2x.", [
      "Para que |x − 1| &lt; 2x pueda cumplirse hace falta 2x &gt; 0, es decir, x &gt; 0.",
      "La desigualdad equivale a −2x &lt; x − 1 &lt; 2x. Se separa en dos: (a) x − 1 &lt; 2x → x &gt; −1; (b) −2x &lt; x − 1 → 1 &lt; 3x → x &gt; 1/3.",
      "Se cumplen a la vez (a), (b) y x &gt; 0: la más exigente es x &gt; 1/3.",
      "Solución: <b>(1/3, +∞)</b>. Comprobación con x = 1: |0| = 0 &lt; 2 ✓; con x = 0,3: |−0,7| = 0,7 &lt; 0,6 es falso ✓."
    ]);

  // ---------------------------------------------------------------- 4. Potencias y radicales
  secciones[3] =
    "<h5>Potencias: cuidado con los signos y con las fracciones</h5>" +
    "<ul><li><b>Base negativa</b>: (−2)⁴ = 16 pero (−2)³ = −8. Un exponente par vuelve positivo el resultado.</li>" +
    "<li><b>Paréntesis</b>: (−3)² = 9, pero −3² = −9 (el cuadrado solo afecta al 3).</li>" +
    "<li><b>Base fraccionaria</b>: (a/b)ⁿ = aⁿ/bⁿ, y con exponente negativo se da la vuelta: (2/3)⁻² = (3/2)² = 9/4.</li>" +
    "<li><b>Mismo exponente</b>: aⁿ·bⁿ = (a·b)ⁿ. Por ejemplo, 2⁵·5⁵ = 10⁵.</li></ul>" +
    ejemplo("Simplificar con letras", "Simplifica " + fr("a³·b⁻²", "a⁻¹·b") + " y deja los exponentes positivos.", [
      "Se resta el exponente del denominador al del numerador, letra por letra: a³⁻⁽⁻¹⁾ = a⁴ y b⁻²⁻¹ = b⁻³.",
      "Queda a⁴·b⁻³. Para tener exponentes positivos, b⁻³ = 1/b³: <b>a⁴/b³</b>."
    ]) +
    "<h5>Radicales de cualquier índice</h5>" +
    "<p>Un radical ⁿ√a es lo mismo que a<sup>1/n</sup>. Esa equivalencia es la llave de todas las propiedades: los radicales se manejan con las reglas de las potencias.</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>ⁿ√(a·b) = ⁿ√a · ⁿ√b</td><td>raíz de un producto</td></tr>" +
    "<tr><td>ⁿ√(a/b) = ⁿ√a / ⁿ√b</td><td>raíz de un cociente</td></tr>" +
    "<tr><td>ᵐ√(ⁿ√a) = ᵐⁿ√a</td><td>raíz de una raíz: se multiplican los índices</td></tr>" +
    "<tr><td>ⁿ√(aᵐ) = a<sup>m/n</sup></td><td>pasar a potencia de exponente fraccionario</td></tr>" +
    "<tr><td>ⁿ√(aⁿ) = a (si a ≥ 0)</td><td>sale directamente; con índice par, ⁿ√(aⁿ) = |a|</td></tr>" +
    "</tbody></table>" +
    "<p><b>No existen</b> reglas parecidas para sumas: √(a + b) ≠ √a + √b. Por ejemplo, √(9 + 16) = 5, pero √9 + √16 = 7.</p>" +
    ejemplo("Extraer factores de la raíz", "Simplifica ³√54 y √(18x³) con x ≥ 0.", [
      "Para ³√54 buscamos cubos perfectos: 54 = 27·2 = 3³·2, así que ³√54 = ³√(3³)·³√2 = <b>3·³√2</b>.",
      "Para √(18x³): 18 = 9·2 = 3²·2 y x³ = x²·x, así que √(18x³) = √(3²·2·x²·x) = <b>3x·√(2x)</b>."
    ]) +
    ejemplo("Producto de radicales con distinto índice", "Calcula √2 · ³√2 como un solo radical.", [
      "Pasamos a potencias: √2 = 2<sup>1/2</sup> y ³√2 = 2<sup>1/3</sup>.",
      "Sumamos exponentes: 1/2 + 1/3 = 3/6 + 2/6 = 5/6, es decir, 2<sup>5/6</sup>.",
      "Volvemos a radical: <b>⁶√(2⁵) = ⁶√32</b>. (El truco es reducir a índice común, aquí 6 = m.c.m. de 2 y 3.)"
    ]) +
    "<h5>Suma de radicales: solo se suman los semejantes</h5>" +
    "<p>Dos radicales son <b>semejantes</b> si tienen el mismo índice y el mismo radicando; solo entonces se suman o restan los coeficientes: 5√3 − 2√3 = 3√3. Si no lo parecen, primero hay que simplificar (sacar factores) a ver si se vuelven semejantes.</p>" +
    ejemplo("Suma con simplificación", "Calcula 3√12 − √27 + √75.", [
      "Simplificamos cada uno: √12 = √(4·3) = 2√3; √27 = √(9·3) = 3√3; √75 = √(25·3) = 5√3.",
      "Sustituimos: 3·2√3 − 3√3 + 5√3 = 6√3 − 3√3 + 5√3.",
      "Son semejantes: se suman los coeficientes 6 − 3 + 5 = 8. Resultado: <b>8√3</b>."
    ]) +
    "<h5>Racionalizar: los cuatro casos</h5>" +
    "<p>Racionalizar es eliminar las raíces del denominador sin cambiar el valor de la fracción (se multiplica arriba y abajo por lo mismo).</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>a/√b</td><td>multiplica por √b: a√b / b</td></tr>" +
    "<tr><td>a/(c·√b)</td><td>multiplica por √b: a√b / (c·b)</td></tr>" +
    "<tr><td>a/ⁿ√(bᵐ)</td><td>multiplica por ⁿ√(bⁿ⁻ᵐ) para completar bⁿ dentro de la raíz</td></tr>" +
    "<tr><td>a/(√b ± √c)</td><td>multiplica por el <b>conjugado</b> (√b ∓ √c): (√b + √c)(√b − √c) = b − c</td></tr>" +
    "</tbody></table>" +
    ejemplo("Con una suma en el denominador", "Racionaliza " + fr("4", "√5 − 1") + ".", [
      "El conjugado de √5 − 1 es √5 + 1. Multiplicamos arriba y abajo: " + fr("4(√5 + 1)", "(√5 − 1)(√5 + 1)") + ".",
      "Abajo es una suma por diferencia: (√5)² − 1² = 5 − 1 = 4.",
      "Queda " + fr("4(√5 + 1)", "4") + " = <b>√5 + 1</b>."
    ]) +
    ejemplo("Con raíz cúbica", "Racionaliza " + fr("1", "³√2") + ".", [
      "Queremos que dentro de la raíz aparezca 2³ para que salga entera. Tenemos 2¹; nos faltan 2²: multiplicamos arriba y abajo por ³√(2²) = ³√4.",
      "Abajo: ³√2·³√4 = ³√8 = 2. Arriba: ³√4.",
      "Resultado: <b>³√4 / 2</b>."
    ]) +
    ejemplo("Cociente de dos sumas con raíces", "Racionaliza " + fr("√3 + 1", "√3 − 1") + ".", [
      "Multiplicamos por el conjugado del denominador, √3 + 1: " + fr("(√3 + 1)²", "(√3)² − 1²") + ".",
      "Numerador: (√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3. Denominador: 3 − 1 = 2.",
      "Queda " + fr("4 + 2√3", "2") + " = <b>2 + √3</b>."
    ]) +
    ojo("(a + b)² = a² + 2ab + b², y nunca a² + b². Es el fallo más repetido al racionalizar: el término del medio 2ab aquí es 2·√3·1 = 2√3.") +
    "<p>Practica con ejercicios generados al azar (nunca se acaban):</p>" +
    w("radicales");

  // ---------------------------------------------------------------- 5. Notación científica y errores
  secciones[4] =
    "<h5>Mueve la coma y mira qué pasa</h5>" +
    "<p>Prueba a cambiar la mantisa y el exponente. Fíjate en que el exponente positivo da números grandes y el negativo, pequeños, y compáralos con medidas reales:</p>" +
    w("cientifica") +
    "<h5>Operar en notación científica</h5>" +
    "<ul><li><b>Multiplicar</b>: se multiplican las mantisas y se <em>suman</em> los exponentes. Si la mantisa sale ≥ 10, se ajusta.</li>" +
    "<li><b>Dividir</b>: se dividen las mantisas y se <em>restan</em> los exponentes.</li>" +
    "<li><b>Sumar o restar</b>: primero hay que dejar <em>el mismo exponente</em> en los dos números (se mueve la coma) y después se suman las mantisas.</li></ul>" +
    ejemplo("Producto y cociente", "Calcula (3,2·10⁵)·(4·10⁻²) / (1,6·10³).", [
      "Producto: 3,2·4 = 12,8 y 10⁵·10⁻² = 10³, así que el numerador es 12,8·10³ = 1,28·10⁴.",
      "Cociente: (1,28·10⁴)/(1,6·10³) = (1,28/1,6)·10⁴⁻³ = 0,8·10¹.",
      "Ajustamos la mantisa (debe estar entre 1 y 10): 0,8·10¹ = <b>8 = 8·10⁰</b>."
    ]) +
    ejemplo("Suma", "Calcula 3,5·10⁴ + 4,2·10³.", [
      "Igualamos exponentes: 4,2·10³ = 0,42·10⁴.",
      "Sumamos las mantisas: 3,5 + 0,42 = 3,92, con el mismo 10⁴.",
      "Resultado: <b>3,92·10⁴</b> = 39.200."
    ]) +
    "<h5>Aproximaciones: redondeo, truncamiento y cifras significativas</h5>" +
    "<ul><li><b>Truncar</b> es cortar el decimal sin más: π ≈ 3,14 (es una aproximación <em>por defecto</em>, queda por debajo del valor real).</li>" +
    "<li><b>Redondear</b> es dejar la cifra más cercana: π ≈ 3,142 (aquí queda por encima, <em>por exceso</em>). Si la cifra siguiente es 5 o más, la anterior sube una unidad.</li>" +
    "<li><b>Cifras significativas</b> son las que aportan información: en 0,00320 (si el último 0 es medido) hay 3 (el 3, el 2 y el 0). Los ceros de la izquierda solo sitúan la coma y no cuentan.</li></ul>" +
    "<h5>Error absoluto y error relativo con ejemplos</h5>" +
    "<p>Si la medida es M y el valor real R, el <b>error absoluto</b> es E<sub>a</sub> = |R − M| y el <b>error relativo</b> es E<sub>r</sub> = E<sub>a</sub>/|R| (multiplicado por 100 es el error en %). Mira por qué el relativo es el que dice la <em>calidad</em> de una medida:</p>" +
    w("errabs") +
    ejemplo("Dos medidas, ¿cuál es mejor?", "Un alumno mide una cuerda de 10 m y obtiene 9,8 m. Otro mide una distancia de 505 km y obtiene 504 km. ¿Quién ha medido mejor?", [
      "Cuerda: E<sub>a</sub> = |10 − 9,8| = 0,2 m; E<sub>r</sub> = 0,2/10 = 0,02 = <b>2 %</b>.",
      "Distancia: E<sub>a</sub> = |505 − 504| = 1 km; E<sub>r</sub> = 1/505 ≈ 0,00198 = <b>0,198 %</b>.",
      "El error absoluto de la segunda es mayor (1 km frente a 20 cm), pero el relativo es 10 veces menor: la segunda medida es <b>mucho mejor</b> en proporción a lo que se mide."
    ]) +
    "<p>Si dicen que una medida es 12,3 cm «con un error máximo de 0,1», significa que el valor real está en el intervalo [12,2; 12,4]. Es otra aplicación directa de los intervalos y del valor absoluto: |R − 12,3| ≤ 0,1.</p>";

  // ---------------------------------------------------------------- Secciones nuevas
  var nuevas = [
    {
      h: "6. Para pensar: tres resultados que sorprenden",
      html:
        "<p>Estos resultados no suelen preguntarse tal cual, pero entenderlos es lo que separa «saberse las reglas» de «saber matemáticas».</p>" +
        ejemplo("√2 no es racional", "Demuestra que √2 no se puede escribir como fracción.", [
          "Razonamos por <b>reducción al absurdo</b>: suponemos lo contrario y llegamos a una contradicción.",
          "Supongamos √2 = p/q con p y q enteros <b>sin factores comunes</b> (fracción irreducible).",
          "Elevamos al cuadrado: 2 = p²/q², es decir, p² = 2q². Luego p² es par, y por tanto p es par (el cuadrado de un impar es impar). Escribimos p = 2k.",
          "Sustituimos: (2k)² = 2q² → 4k² = 2q² → q² = 2k². Luego q² es par y q también es par.",
          "Entonces p y q son pares: tienen el factor 2 en común. Esto contradice que la fracción fuera irreducible.",
          "La suposición era falsa: <b>√2 es irracional</b>. (La misma idea sirve para √3, √5 y, en general, para la raíz de cualquier entero que no sea cuadrado perfecto.)"
        ]) +
        ejemplo("0,999… es exactamente 1", "Demuestra que 0,999… = 1.", [
          "Sea x = 0,999… Multiplicamos por 10: 10x = 9,999…",
          "Restamos: 10x − x = 9,999… − 0,999… = 9, es decir, 9x = 9.",
          "x = 1. Así que <b>0,999… y 1 son el mismo número</b> escrito de dos formas: no hay ningún número entre ellos."
        ]) +
        "<p><b>Los racionales y los irracionales están «mezclados»</b>: entre dos números reales distintos, por muy cerca que estén, siempre hay infinitos racionales y también infinitos irracionales. Por ejemplo, entre 1 y 2 están 3/2, 7/5, 1,41 (racionales) y √2, 1 + 1/π (irracionales). Y a pesar de eso, ℚ tiene «agujeros» (√2, π…) que ℝ rellena. Por eso la recta real no tiene huecos y los números racionales por sí solos no bastan para medir una diagonal.</p>"
    },
    {
      h: "7. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo y entenderás por qué se comete.</p>" + w("quiz", "errores")
    },
    {
      h: "8. Autocomprobación del tema",
      html: "<p>Ocho preguntas de test con la explicación de cada respuesta, y tarjetas para memorizar las propiedades clave.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  // ---------------------------------------------------------------- Datos de las actividades
  var datos = {
    clasnum: {
      titulo: "¿A qué conjunto pertenece?",
      consigna: "Toca un número y después el conjunto <b>más pequeño</b> al que pertenece.",
      categorias: ["ℕ · naturales", "ℤ pero no ℕ · enteros negativos", "ℚ pero no ℤ · fracciones y decimales exactos o periódicos", "𝕀 · irracionales"],
      items: [
        { t: "0", c: 0 }, { t: "√49", c: 0 }, { t: "−8", c: 1 }, { t: "−√16", c: 1 },
        { t: "3/4", c: 2 }, { t: "0,75", c: 2 }, { t: "0,2777… (el 7 se repite)", c: 2 }, { t: "−7/3", c: 2 },
        { t: "√10", c: 3 }, { t: "π + 1", c: 3 }, { t: "2√2", c: 3 }, { t: "0,1010010001… (cada vez un 0 más)", c: 3 }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«√(a²) = a para cualquier número real a.»",
          op: ["Es correcto", "Falso: √(a²) = |a|, y si a es negativo sale −a", "Falso: es siempre a²", "Falso: es siempre 0"], ok: 1,
          porque: "La raíz cuadrada es no negativa. Por ejemplo √((−3)²) = √9 = 3 = |−3|, no −3." },
        { q: "«√2 + √3 = √5».",
          op: ["Es correcto", "Falso: la raíz de una suma no es la suma de las raíces (√2 + √3 ≈ 3,15 y √5 ≈ 2,24)", "Falso: es √6", "Es correcto solo con números positivos"], ok: 1,
          porque: "Las raíces se separan en productos y cocientes, no en sumas. Para sumar radicales deben ser semejantes: √2 + √3 no se puede simplificar." },
        { q: "«|x − 3| &lt; 2 equivale a x &lt; 5 ó x &gt; 1».",
          op: ["Es correcto", "Falso: debe ser «y»: 1 &lt; x &lt; 5. Es una intersección, un intervalo", "Falso: equivale a x &lt; 1", "Falso: equivale a x &gt; 5"], ok: 1,
          porque: "«Distancia menor que 2» da los puntos <em>cerca</em> de 3: el intervalo (1, 5). El «ó» corresponde a «mayor que»: |x − 3| &gt; 2 ⇔ x &lt; 1 ó x &gt; 5." },
        { q: "Al resolver −2x &gt; 6 un alumno escribe x &gt; −3.",
          op: ["Está bien", "Ha olvidado invertir el sentido al dividir entre un negativo: x &lt; −3", "Debería haber escrito x = −3", "Ha restado mal"], ok: 1,
          porque: "Dividir entre −2 invierte la desigualdad: x &lt; −3. Comprobación: x = −4 → −2(−4) = 8 &gt; 6 ✓; x = 0 → 0 &gt; 6 es falso." },
        { q: "«2⁻³ = −8».",
          op: ["Es correcto", "Falso: un exponente negativo invierte, no cambia el signo: 2⁻³ = 1/2³ = 1/8", "Falso: 2⁻³ = −6", "Falso: 2⁻³ = 6"], ok: 1,
          porque: "a⁻ⁿ = 1/aⁿ. El signo del exponente no afecta al signo del resultado." },
        { q: "«0,333… no es racional, porque sus decimales no terminan nunca».",
          op: ["Es correcto", "Falso: los decimales periódicos son racionales (0,333… = 1/3)", "Falso: es irracional porque es mayor que 0,3", "Es correcto: solo los decimales exactos son racionales"], ok: 1,
          porque: "Racional = decimal exacto <em>o periódico</em>. Que no termine no es lo mismo que no tenga patrón: el 3 se repite siempre." },
        { q: "«−3² = 9».",
          op: ["Es correcto", "Falso: −3² = −9; el cuadrado solo afecta al 3. (−3)² sí vale 9", "Falso: −3² = −6", "Falso: −3² = 6"], ok: 1,
          porque: "Sin paréntesis, primero se eleva y luego se aplica el signo: −(3²) = −9." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Cuál es la fracción generatriz de 0,222…?",
          op: ["2/10", "2/9", "22/99", "1/5"], ok: 1,
          porque: "x = 0,222… → 10x = 2,222… → 9x = 2 → x = 2/9." },
        { q: "¿Cuál de estos números es irracional?",
          op: ["√36", "0,5", "√8", "−7/3"], ok: 2,
          porque: "√36 = 6 y 0,5 y −7/3 son racionales. √8 = 2√2 no sale exacta: es irracional." },
        { q: "La solución de x ≥ −2 y x &lt; 4 a la vez es…",
          op: ["(−2, 4)", "[−2, 4)", "[−2, 4]", "(−2, 4]"], ok: 1,
          porque: "−2 entra (≥) y 4 no entra (&lt;): [−2, 4)." },
        { q: "|x − 5| = 2 tiene como soluciones…",
          op: ["x = 3 y x = 7", "x = 3 solamente", "x = 7 solamente", "x = −3 y x = −7"], ok: 0,
          porque: "x − 5 = 2 → x = 7 y x − 5 = −2 → x = 3: dos puntos a distancia 2 de 5." },
        { q: "¿Cuánto vale ³√54 simplificado?",
          op: ["3³√2", "2³√3", "6³√3", "27³√2"], ok: 0,
          porque: "54 = 27·2 = 3³·2, así que ³√54 = 3·³√2." },
        { q: "Racionalizar 1/(√3 + 1) da…",
          op: ["(√3 − 1)/2", "(√3 + 1)/2", "√3 − 1", "1/2"], ok: 0,
          porque: "Multiplicando por el conjugado: (√3 − 1)/((√3)² − 1) = (√3 − 1)/2." },
        { q: "La notación científica de 0,00045 es…",
          op: ["4,5·10⁻⁴", "4,5·10⁻³", "45·10⁻⁵", "0,45·10⁻³"], ok: 0,
          porque: "La coma se mueve 4 lugares a la derecha para llegar a 4,5 (mantisa entre 1 y 10), así que el exponente es −4." },
        { q: "Aproximando 10 por 9,5, el error relativo es…",
          op: ["0,5", "5 %", "0,5 %", "9,5 %"], ok: 1,
          porque: "E<sub>a</sub> = |10 − 9,5| = 0,5; E<sub>r</sub> = 0,5/10 = 0,05 = 5 %." }
      ]
    },

    tj1: {
      titulo: "Propiedades que hay que tener a mano",
      cartas: [
        { a: "Fracción generatriz de un periódico puro", b: "Si el periodo es ab: x = ab/99. Ejemplo: 0,4545… = 45/99 = 5/11." },
        { a: "¿Cuándo una fracción irreducible da un decimal exacto?", b: "Cuando el denominador solo tiene los factores primos 2 y 5." },
        { a: "Intervalo cerrado [a, b]", b: "a ≤ x ≤ b. Los dos extremos entran." },
        { a: "|x − a| &lt; k", b: "a − k &lt; x &lt; a + k: un intervalo (los puntos cercanos a a)." },
        { a: "|x − a| &gt; k", b: "x &lt; a − k ó x &gt; a + k: dos semirrectas (los puntos lejanos)." },
        { a: "√(a²)", b: "|a|, no «a». Sale −a si a es negativo." },
        { a: "Racionalizar 1/(√a + √b)", b: "Multiplica arriba y abajo por el conjugado (√a − √b): el denominador queda a − b." },
        { a: "Notación científica", b: "a·10ⁿ con 1 ≤ a &lt; 10. Exponente positivo: número grande. Negativo: pequeño." },
        { a: "Error relativo", b: "|valor real − aproximación| ÷ |valor real|. En % se multiplica por 100." },
        { a: "Multiplicar una desigualdad por un número negativo", b: "Se invierte el sentido: −2x &gt; 6 ⇒ x &lt; −3." }
      ]
    }
  };

  // ---------------------------------------------------------------- Ejercicios
  var ejercicios = [
    // ---------- ★ ----------
    { id: "n1", nivel: 1,
      enunciado: "Escribe como intervalo el conjunto de los números que cumplen −2 ≤ x &lt; 5.",
      check: { tipo: "opcion", etiqueta: "Intervalo", opciones: ["[−2, 5)", "(−2, 5]", "[−2, 5]", "(−2, 5)"], ok: 0 },
      pistas: ["El ≤ del −2 significa que el −2 SÍ entra: corchete.", "El &lt; del 5 significa que el 5 NO entra: paréntesis."],
      pasos: ["−2 ≤ x: el extremo izquierdo se incluye → corchete «[−2».", "x &lt; 5: el extremo derecho no se incluye → paréntesis «5)».", "Intervalo: <b>[−2, 5)</b>."],
      resultado: "[−2, 5)" },
    { id: "n2", nivel: 1,
      enunciado: "Calcula |−9| + |4| − |−3|.",
      check: { tipo: "num", etiqueta: "Resultado =", valor: 10 },
      pistas: ["El valor absoluto quita el signo: |−9| = 9."],
      pasos: ["|−9| = 9, |4| = 4 y |−3| = 3.", "9 + 4 − 3 = 10."],
      resultado: "10" },
    { id: "n3", nivel: 1,
      enunciado: "Simplifica √50 y escríbelo como a√b, con b lo menor posible.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 5 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["Busca un cuadrado perfecto dentro de 50: 25·2."],
      pasos: ["50 = 25·2 = 5²·2.", "√50 = √(5²·2) = 5·√2."],
      resultado: "√50 = 5√2" },
    { id: "n4", nivel: 1,
      enunciado: "Escribe 0,000072 en notación científica a·10ⁿ.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 7.2 }, { tipo: "num", etiqueta: "n =", valor: -5 }],
      pistas: ["Mueve la coma hasta dejar una sola cifra distinta de cero delante.", "Si la coma se mueve hacia la derecha, el exponente es negativo."],
      pasos: ["Movemos la coma 5 lugares a la derecha: 0,000072 → 7,2.", "Como hemos movido la coma a la derecha, el exponente es negativo: −5.", "0,000072 = 7,2·10⁻⁵."],
      resultado: "7,2·10⁻⁵" },
    { id: "n5", nivel: 1,
      enunciado: "¿Cuál de estos números es racional?",
      check: { tipo: "opcion", etiqueta: "Es racional", opciones: ["√2", "π", "0,333… (el 3 se repite siempre)", "√5 + 1"], ok: 2 },
      pistas: ["Racional = decimal exacto o periódico."],
      pasos: ["√2 y π son irracionales; √5 + 1 también (un racional más un irracional es irracional).", "0,333… es periódico: = 1/3. <b>Es racional</b>."],
      resultado: "0,333… = 1/3" },
    { id: "n6", nivel: 1,
      enunciado: "Calcula la fracción generatriz de 0,454545… (el 45 se repite). Escríbela en la forma p/q.",
      check: { tipo: "num", etiqueta: "x =", valor: 5 / 11, tol: 0.001, ph: "p/q" },
      pistas: ["x = 0,4545… El periodo tiene 2 cifras: multiplica por 100.", "100x − x = 45."],
      pasos: ["x = 0,4545…  →  100x = 45,4545…", "100x − x = 45 → 99x = 45", "x = 45/99 = 5/11."],
      resultado: "5/11" },
    // ---------- ★★ ----------
    { id: "n7", nivel: 2,
      enunciado: "Resuelve |x − 4| &lt; 3 y expresa la solución como intervalo.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(1, 7)", "[1, 7]", "(−∞, 1) ∪ (7, +∞)", "(−7, −1)"], ok: 0 },
      pistas: ["«Distancia a 4 menor que 3»: los puntos de 4 − 3 a 4 + 3."],
      pasos: ["|x − 4| &lt; 3 ⇔ −3 &lt; x − 4 &lt; 3.", "Sumamos 4: 1 &lt; x &lt; 7.", "Intervalo abierto: <b>(1, 7)</b>."],
      resultado: "(1, 7)" },
    { id: "n8", nivel: 2,
      enunciado: "Resuelve la ecuación |2x + 1| = 7. Escribe las soluciones separadas por comas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-4, 3], ph: "por ejemplo: 1, 2" },
      pistas: ["Dos casos: 2x + 1 = 7  y  2x + 1 = −7."],
      pasos: ["Caso 1: 2x + 1 = 7 → 2x = 6 → x = 3.", "Caso 2: 2x + 1 = −7 → 2x = −8 → x = −4.", "Comprobación: |2·3 + 1| = 7 ✓ y |2·(−4) + 1| = |−7| = 7 ✓."],
      resultado: "x = −4 y x = 3" },
    { id: "n9", nivel: 2,
      enunciado: "Racionaliza " + fr("10", "√5") + " y escríbelo como (p/q)·√5 con la fracción irreducible.",
      check: [{ tipo: "num", etiqueta: "p =", valor: 2 }, { tipo: "num", etiqueta: "q =", valor: 1 }],
      pistas: ["Multiplica arriba y abajo por √5."],
      pasos: ["10/√5 = (10·√5)/(√5·√5) = 10√5/5.", "Simplificamos 10/5 = 2: <b>2√5</b> (p = 2, q = 1)."],
      resultado: "2√5" },
    { id: "n10", nivel: 2,
      enunciado: "Calcula 3√12 − √27 + √75 y expresa el resultado como a√b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 8 }, { tipo: "num", etiqueta: "b =", valor: 3 }],
      pistas: ["Simplifica cada raíz hasta que todas tengan √3."],
      pasos: ["√12 = 2√3, √27 = 3√3 y √75 = 5√3.", "3·2√3 − 3√3 + 5√3 = 6√3 − 3√3 + 5√3.", "Suma de coeficientes: 6 − 3 + 5 = 8. Resultado: 8√3."],
      resultado: "8√3" },
    { id: "n11", nivel: 2,
      enunciado: "Sean A = [−2, 3) y B = (0, 5]. ¿Cuánto vale A ∩ B?",
      check: { tipo: "opcion", etiqueta: "A ∩ B =", opciones: ["(0, 3)", "[−2, 5]", "[0, 3]", "(0, 3]"], ok: 0 },
      pistas: ["Dibuja A y B, y mira dónde están los dos a la vez.", "El 0 no entra porque B no lo incluye; el 3 no entra porque A no lo incluye."],
      pasos: ["Los dos a la vez: desde 0 (el mayor de los dos extremos izquierdos) hasta 3 (el menor de los dos derechos).", "El 0 no está en B (paréntesis) y el 3 no está en A: ambos quedan fuera.", "A ∩ B = (0, 3)."],
      resultado: "A ∩ B = (0, 3)" },
    { id: "n12", nivel: 2,
      enunciado: "Calcula la fracción generatriz de 3,2777… (el 7 se repite) y escríbela como p/q.",
      check: { tipo: "num", etiqueta: "x =", valor: 59 / 18, tol: 0.001, ph: "p/q" },
      pistas: ["Es periódico mixto. Multiplica por 10 y por 100 y resta.", "100x − 10x = 327,777… − 32,777…"],
      pasos: ["x = 3,2777…  →  10x = 32,777…  →  100x = 327,777…", "100x − 10x = 295 → 90x = 295", "x = 295/90 = 59/18."],
      resultado: "59/18" },
    { id: "n13", nivel: 2,
      enunciado: "Calcula (3,2·10⁵)·(4·10⁻²) / (1,6·10³) y da el resultado como un número decimal.",
      check: { tipo: "num", etiqueta: "Resultado =", valor: 8 },
      pistas: ["Mantisas por un lado y potencias de 10 por otro."],
      pasos: ["Numerador: 3,2·4 = 12,8 y 10⁵·10⁻² = 10³ → 12,8·10³.", "Cociente: (12,8·10³)/(1,6·10³) = 12,8/1,6 = 8.", "Las potencias de 10 se simplifican por completo: resultado 8."],
      resultado: "8" },
    // ---------- ★★★ (nivel PAU) ----------
    { id: "n14", nivel: 3,
      enunciado: "Resuelve |x − 2| ≥ 3 y escribe la solución como unión de intervalos.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−∞, −1] ∪ [5, +∞)", "[−1, 5]", "(−∞, −1) ∪ (5, +∞)", "(−1, 5)"], ok: 0 },
      pistas: ["«Distancia a 2 mayor o igual que 3»: los puntos lejos de 2."],
      pasos: ["|x − 2| ≥ 3 ⇔ x − 2 ≤ −3  ó  x − 2 ≥ 3.", "x ≤ −1  ó  x ≥ 5.", "Como el ≥ incluye el extremo: (−∞, −1] ∪ [5, +∞)."],
      resultado: "(−∞, −1] ∪ [5, +∞)" },
    { id: "n15", nivel: 3,
      enunciado: "Racionaliza " + fr("4", "√5 − 1") + " y simplifica al máximo.",
      check: { tipo: "expr", etiqueta: "Resultado =", expr: "sqrt(5)+1", ph: "puedes escribir sqrt(5) o √5" },
      pistas: ["Multiplica arriba y abajo por el conjugado: √5 + 1.", "(√5 − 1)(√5 + 1) = 5 − 1 = 4."],
      pasos: ["Conjugado de √5 − 1: √5 + 1.", "4(√5 + 1) / ((√5)² − 1²) = 4(√5 + 1)/4.", "Simplificamos el 4: <b>√5 + 1</b>."],
      resultado: "√5 + 1" },
    { id: "n16", nivel: 3,
      enunciado: "Resuelve |x − 1| = 2x + 3. Recuerda comprobar las soluciones.",
      check: { tipo: "num", etiqueta: "x =", valor: -2 / 3, tol: 0.001, ph: "solución única" },
      pistas: ["Hace falta 2x + 3 ≥ 0, es decir, x ≥ −3/2.", "Dos casos: x − 1 = 2x + 3  y  x − 1 = −(2x + 3)."],
      pasos: ["Condición: 2x + 3 ≥ 0 → x ≥ −3/2.", "Caso 1: x − 1 = 2x + 3 → x = −4 → no cumple x ≥ −3/2: se descarta.", "Caso 2: x − 1 = −2x − 3 → 3x = −2 → x = −2/3 → sí cumple.", "Comprobación: |−2/3 − 1| = 5/3 = 2·(−2/3) + 3 ✓."],
      resultado: "x = −2/3",
      ojo: "x = −4 sale al resolver, pero si lo sustituyes: |−5| = 5 y 2·(−4) + 3 = −5. No son iguales. En las ecuaciones |A| = B <b>siempre hay que comprobar</b>." },
    { id: "n17", nivel: 3,
      enunciado: "Resuelve la inecuación |x − 1| &lt; 2x.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(1/3, +∞)", "(−1/3, 1)", "(−∞, 1/3)", "(−1, +∞)"], ok: 0 },
      pistas: ["Equivale a −2x &lt; x − 1 &lt; 2x. Resuelve cada desigualdad por separado."],
      pasos: ["|x − 1| &lt; 2x ⇔ −2x &lt; x − 1 &lt; 2x.", "x − 1 &lt; 2x → x &gt; −1.", "−2x &lt; x − 1 → 1 &lt; 3x → x &gt; 1/3.", "Se deben cumplir las dos (y 2x &gt; 0): la más exigente es x &gt; 1/3.", "Solución: (1/3, +∞)."],
      resultado: "(1/3, +∞)" },
    { id: "n18", nivel: 3,
      enunciado: "Se aproxima π ≈ 3,141592654 por 22/7. Calcula el error absoluto y el error relativo (en %).",
      check: [{ tipo: "num", etiqueta: "Error absoluto =", valor: 0.001264, tol: 0.01 }, { tipo: "num", etiqueta: "Error relativo (%) =", valor: 0.04025, tol: 0.01 }],
      pistas: ["22/7 = 3,142857143.", "E<sub>r</sub> = E<sub>a</sub> / valor real, y para el porcentaje se multiplica por 100."],
      pasos: ["22/7 ≈ 3,142857143.", "E<sub>a</sub> = |π − 22/7| = |3,141592654 − 3,142857143| ≈ 0,001264.", "E<sub>r</sub> = 0,001264/3,141592654 ≈ 0,0004025.", "En porcentaje: 0,0004025·100 ≈ 0,04025 %."],
      resultado: "E<sub>a</sub> ≈ 0,001264 · E<sub>r</sub> ≈ 0,04 %" },
    { id: "n19", nivel: 3,
      enunciado: "Racionaliza " + fr("√3 + 1", "√3 − 1") + " y simplifica.",
      check: { tipo: "expr", etiqueta: "Resultado =", expr: "2+sqrt(3)", ph: "puedes escribir sqrt(3) o √3" },
      pistas: ["Multiplica por el conjugado del denominador: √3 + 1.", "(√3 + 1)² = 3 + 2√3 + 1."],
      pasos: ["Multiplicamos por (√3 + 1)/(√3 + 1).", "Numerador: (√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3.", "Denominador: (√3)² − 1² = 3 − 1 = 2.", "(4 + 2√3)/2 = 2 + √3."],
      resultado: "2 + √3",
      ojo: "el desarrollo (√3 + 1)² = (√3)² + 2·√3·1 + 1², no 3 + 1. Falta el doble producto." },
    { id: "n20", nivel: 3,
      enunciado: "Demuestra que √2 es un número irracional. Redáctalo como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 8, items: [
        { t: "Plantea reducción al absurdo: supone √2 = p/q con la fracción irreducible", p: 0.5 },
        { t: "Eleva al cuadrado y llega a p² = 2q²", p: 0.5 },
        { t: "Deduce que p² es par y, por tanto, p es par; escribe p = 2k", p: 0.5 },
        { t: "Sustituye y deduce que q también es par", p: 0.5 },
        { t: "Concluye la contradicción: p y q tendrían el factor 2 en común, y la fracción no era irreducible", p: 0.5 }
      ] },
      pasos: ["Supongamos que √2 es racional: √2 = p/q con p, q enteros y la fracción irreducible (sin factores comunes).", "Elevando al cuadrado: 2 = p²/q², es decir, p² = 2q². Entonces p² es par, y por tanto p es par (si p fuera impar, p² sería impar). Escribimos p = 2k.", "Sustituyendo: 4k² = 2q² → q² = 2k². Luego q² es par y q también es par.", "Así p y q son pares: tienen el factor 2 en común, lo que contradice que la fracción fuera irreducible.", "Por tanto la suposición es falsa y √2 es irracional."],
      resultado: "√2 es irracional (demostración por reducción al absurdo)." }
  ];

  // ---------------------------------------------------------------- Lámina resumen
  var lamina = [
    { titulo: "Fracción generatriz en 3 pasos",
      pasos: ["Llama x al número y escribe sus decimales.", "Multiplica por 10ⁿ (n = cifras del periodo) hasta colocar la coma justo detrás de un periodo. Si es mixto, hazlo dos veces (antes y después del periodo).", "<b>Resta</b> las dos expresiones para que desaparezca la parte que se repite, despeja x y simplifica."],
      nota: "Atajo: (número sin coma − parte que no se repite) / (tantos 9 como cifras del periodo y tantos 0 como cifras de la parte decimal no periódica)." },
    { titulo: "Intervalos: tres formas", ancha: true,
      tabla: { cab: ["Intervalo", "Desigualdad", "Recta"], filas: [
        ["[a, b]", "a ≤ x ≤ b", "●────●"], ["(a, b)", "a &lt; x &lt; b", "○────○"], ["[a, b)", "a ≤ x &lt; b", "●────○"],
        ["(a, +∞)", "x &gt; a", "○────→"], ["(−∞, b]", "x ≤ b", "←────●"]
      ] },
      nota: "Corchete = entra. Paréntesis = no entra. El infinito siempre lleva paréntesis. Multiplicar por un negativo invierte la desigualdad." },
    { titulo: "Valor absoluto", ancha: true,
      tabla: { cab: ["Expresión", "Se resuelve como"], filas: [
        ["|A| = k  (k &gt; 0)", "A = k  ó  A = −k"], ["|A| &lt; k", "−k &lt; A &lt; k  (un intervalo)"], ["|A| &gt; k", "A &lt; −k  ó  A &gt; k  (dos semirrectas)"],
        ["|A| = |B|", "A = B  ó  A = −B"], ["|A| = B", "B ≥ 0 y dos casos; comprobar siempre"], ["|A| = k  con k &lt; 0", "sin solución"]
      ] },
      nota: "Leer |x − a| como «distancia entre x y a» ayuda a no equivocarse." },
    { titulo: "Potencias y radicales",
      items: [
        { label: "Raíz como potencia", formula: "ⁿ√(aᵐ) = a<sup>m/n</sup>", cuando: "Para operar con radicales de distinto índice.", ejemplo: "√2·³√2 = 2<sup>1/2 + 1/3</sup> = 2<sup>5/6</sup> = ⁶√32" },
        { label: "Raíz de un producto", formula: "√(a·b) = √a · √b", cuando: "Para sacar factores de la raíz.", ejemplo: "√72 = √(36·2) = 6√2", ojo: "√(a + b) ≠ √a + √b." },
        { label: "Raíz de un cuadrado", formula: "√(a²) = |a|", ojo: "No es «a» si a es negativo." }
      ] },
    { titulo: "Racionalizar", ancha: true,
      tabla: { cab: ["Denominador", "Multiplica por", "Resultado"], filas: [
        ["√b", "√b", "queda b"], ["ⁿ√(bᵐ)", "ⁿ√(bⁿ⁻ᵐ)", "queda b"], ["√b + √c", "√b − √c (conjugado)", "queda b − c"], ["√b − √c", "√b + √c (conjugado)", "queda b − c"]
      ] },
      nota: "Siempre se multiplica arriba y abajo por lo mismo: así la fracción vale igual." },
    { titulo: "Notación científica y errores",
      pasos: ["a·10ⁿ con 1 ≤ a &lt; 10. Coma a la izquierda → n positivo; a la derecha → n negativo.", "Multiplicar: mantisas × y exponentes +. Dividir: mantisas ÷ y exponentes −. Sumar: mismo exponente primero.", "Error absoluto = |real − aproximado|. Error relativo = error absoluto ÷ |real| (×100 para el %)."],
      nota: "El error relativo dice la calidad de la medida: 1 km de error en 500 km es mejor que 20 cm en 10 m." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "√(a²) = a", bien: "√(a²) = |a|", por: "Si a es negativo la raíz sale positiva." },
        { mal: "√2 + √3 = √5", bien: "√2 + √3 no se simplifica", por: "La raíz de una suma no es la suma de raíces." },
        { mal: "−2x &gt; 6 ⇒ x &gt; −3", bien: "−2x &gt; 6 ⇒ x &lt; −3", por: "Dividir entre un negativo invierte el sentido." },
        { mal: "|x − 3| &lt; 2 ⇒ x &lt; 5 ó x &gt; 1", bien: "1 &lt; x &lt; 5", por: "«Menor que» es una intersección (un intervalo)." },
        { mal: "−3² = 9", bien: "−3² = −9 y (−3)² = 9", por: "El paréntesis decide a qué afecta el cuadrado." }
      ] }
  ];

  B.registrar("mates1", "t1", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 2: Sucesiones
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t2/" + ref); }

  var resumen = [
    "Una sucesión es una lista ordenada de números a₁, a₂, a₃… Se da por su <b>término general</b> aₙ o por <b>recurrencia</b>.",
    "<b>Aritmética</b>: se suma siempre d → aₙ = a₁ + (n−1)d y Sₙ = n(a₁ + aₙ)/2.",
    "<b>Geométrica</b>: se multiplica siempre por r → aₙ = a₁·rⁿ⁻¹ y Sₙ = a₁(rⁿ − 1)/(r − 1).",
    "Si |r| &lt; 1 se pueden sumar infinitos términos: <b>S = a₁/(1 − r)</b>.",
    "Para estudiar monotonía: signo de aₙ₊₁ − aₙ. El interés compuesto es una progresión geométrica."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Concepto
  secciones[0] =
    "<h5>Tres maneras de dar una sucesión</h5>" +
    "<ul><li><b>Término general</b>: una fórmula en n. Sirve para saltar directamente a cualquier posición. Ejemplo: aₙ = 3n − 1 da 2, 5, 8, 11…</li>" +
    "<li><b>Recurrencia</b>: el primer término y una regla que usa los anteriores. Ejemplo: a₁ = 2 y aₙ₊₁ = aₙ + 3 da la misma lista 2, 5, 8, 11… Para calcular a₁₀₀ habría que ir paso a paso, así que interesa encontrar la fórmula.</li>" +
    "<li><b>Descripción</b>: «los números primos» (2, 3, 5, 7, 11…). No hay una fórmula sencilla, pero también es una sucesión.</li></ul>" +
    "<h5>Cómo encontrar el término general</h5>" +
    "<p>No hay un método único, pero estas pistas resuelven casi todos los casos de examen:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>3, 5, 7, 9, …</td><td>Los términos suben siempre 2 → es 2n más algo. Con n = 1 sale 2, y el primero es 3, así que aₙ = <b>2n + 1</b>.</td></tr>" +
    "<tr><td>1/2, 2/3, 3/4, 4/5, …</td><td>El numerador es n y el denominador es n + 1 → aₙ = <b>n/(n+1)</b>.</td></tr>" +
    "<tr><td>2, 5, 10, 17, 26, …</td><td>Compara con los cuadrados 1, 4, 9, 16, 25: cada término es uno más → aₙ = <b>n² + 1</b>.</td></tr>" +
    "<tr><td>−1, 1, −1, 1, …</td><td>Los signos se alternan: la potencia (−1)ⁿ → aₙ = <b>(−1)ⁿ</b>.</td></tr>" +
    "<tr><td>2, 4, 8, 16, …</td><td>Cada término es el doble del anterior → aₙ = <b>2ⁿ</b>.</td></tr>" +
    "</tbody></table>" +
    "<p>Para alternar signos se usa (−1)ⁿ si el primero es negativo, y (−1)ⁿ⁺¹ si el primero es positivo. Para saber de qué tipo es una sucesión conviene mirar las <b>diferencias</b> aₙ₊₁ − aₙ y los <b>cocientes</b> aₙ₊₁/aₙ (lo verás en la sección 5).</p>" +
    ejemplo("Pasar de recurrencia a término general", "Halla el término general de a₁ = 3, aₙ₊₁ = 2·aₙ.", [
      "Calculamos los primeros términos: a₁ = 3, a₂ = 6, a₃ = 12, a₄ = 24, …",
      "Cada término es el doble del anterior: se multiplica siempre por 2. Es una progresión geométrica de razón 2.",
      "El término general es a₁·2ⁿ⁻¹, es decir, <b>aₙ = 3·2ⁿ⁻¹</b>. Comprobación: a₄ = 3·2³ = 24 ✓."
    ]) +
    "<p>Escribe tú el término general que quieras (con la letra n) y mira qué hace la sucesión. También puedes definirla por recurrencia. Observa la monotonía, las cotas y si se «aquieta» en un valor:</p>" +
    w("sucesion");

  // ---------------------------------------------------------------- 2. Monotonía y acotación
  secciones[1] =
    "<h5>Cómo estudiar la monotonía</h5>" +
    "<p>Hay dos herramientas, y cada una tiene su sitio:</p>" +
    "<ul><li><b>Diferencia</b> aₙ₊₁ − aₙ: si es ≥ 0 para todo n, la sucesión es creciente; si es ≤ 0, decreciente. Sirve siempre, y es la más segura.</li>" +
    "<li><b>Cociente</b> aₙ₊₁/aₙ (solo si los términos son positivos): si es ≥ 1, creciente; si es ≤ 1, decreciente. Es cómoda con potencias y factoriales.</li></ul>" +
    ejemplo("Con una fracción", "Estudia la monotonía y la acotación de aₙ = (2n − 1)/(n + 1).", [
      "Calculamos aₙ₊₁ = (2n + 1)/(n + 2) y restamos: aₙ₊₁ − aₙ = (2n+1)/(n+2) − (2n−1)/(n+1).",
      "Común denominador (n+1)(n+2): numerador = (2n+1)(n+1) − (2n−1)(n+2) = (2n² + 3n + 1) − (2n² + 3n − 2) = 3.",
      "aₙ₊₁ − aₙ = 3/((n+1)(n+2)) &gt; 0 para todo n: la sucesión es <b>estrictamente creciente</b>.",
      "Acotación: dividiendo, aₙ = (2n − 1)/(n + 1) = 2 − 3/(n + 1). Como 3/(n+1) &gt; 0, aₙ &lt; 2: <b>cota superior 2</b>. Como es creciente, el menor término es a₁ = 1/2: <b>cota inferior 1/2</b>.",
      "Conclusión: creciente y acotada, con 1/2 ≤ aₙ &lt; 2. Es de esperar que se aquiete cerca de 2 (de hecho, converge a 2)."
    ]) +
    ejemplo("Con el cociente", "Estudia la monotonía de aₙ = n/2ⁿ.", [
      "Todos los términos son positivos, así que podemos usar el cociente: aₙ₊₁/aₙ = [(n+1)/2ⁿ⁺¹] · [2ⁿ/n] = (n+1)/(2n).",
      "(n+1)/(2n) ≤ 1 ⇔ n + 1 ≤ 2n ⇔ n ≥ 1, que es siempre cierto.",
      "Por tanto la sucesión es <b>decreciente</b> (a₁ = 1/2, a₂ = 1/2, a₃ = 3/8, …). Está acotada: 0 &lt; aₙ ≤ 1/2."
    ]) +
    "<h5>Acotación con más detalle</h5>" +
    "<ul><li>K es <b>cota superior</b> si aₙ ≤ K para todo n; k es <b>cota inferior</b> si aₙ ≥ k para todo n. Si hay una, hay infinitas (cualquier número mayor que K también sirve).</li>" +
    "<li>La menor cota superior se llama <b>supremo</b> y la mayor cota inferior, <b>ínfimo</b>. Si el supremo es uno de los términos, es el <b>máximo</b>.</li>" +
    "<li>Una sucesión puede estar acotada sin ser monótona: (−1)ⁿ = −1, 1, −1, 1… está acotada entre −1 y 1 y va saltando.</li>" +
    "<li>Una sucesión puede ser monótona sin estar acotada: n² crece sin techo.</li></ul>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>aₙ = 1/n</td><td>decreciente · acotada (0 &lt; aₙ ≤ 1) · converge a 0</td></tr>" +
    "<tr><td>aₙ = n²</td><td>creciente · acotada inferiormente, no superiormente · diverge (+∞)</td></tr>" +
    "<tr><td>aₙ = (−1)ⁿ</td><td>no monótona · acotada · no converge (oscila entre −1 y 1)</td></tr>" +
    "<tr><td>aₙ = (n+1)/n</td><td>decreciente · acotada (1 &lt; aₙ ≤ 2) · converge a 1</td></tr>" +
    "</tbody></table>" +
    "<p><b>Teorema útil</b>: toda sucesión monótona y acotada converge (se acerca a un valor concreto). Por ejemplo, aₙ = (1 + 1/n)ⁿ es creciente y está acotada por 3, y por eso converge: su límite es el número e ≈ 2,718. En el Tema 10 verás cómo se calcula el límite.</p>";

  // ---------------------------------------------------------------- 3. Aritméticas
  secciones[2] =
    "<h5>Por qué funcionan las fórmulas</h5>" +
    "<p><b>Término general</b>: para llegar de a₁ a aₙ hay que dar n − 1 saltos de tamaño d, así que aₙ = a₁ + (n − 1)d. Más en general, entre dos términos cualesquiera: <b>aₙ = aₘ + (n − m)·d</b>. Esta forma es la que más se usa en los problemas, porque rara vez te dan el primer término.</p>" +
    "<p><b>Suma</b>: Gauss, con 10 años, sumó 1 + 2 + … + 100 emparejando los extremos: 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101… Hay 50 parejas, así que la suma es 50 · 101 = 5050. En general, <b>los términos equidistantes de los extremos suman lo mismo</b>: a₁ + aₙ = a₂ + aₙ₋₁ = …, y hay n/2 parejas, así que Sₙ = n(a₁ + aₙ)/2. Míralo con barras: pegando la progresión al revés sobre sí misma sale un rectángulo.</p>" +
    w("aritmetica") +
    "<p>Dos consecuencias muy útiles:</p>" +
    "<ul><li><b>Media aritmética</b>: cada término es la media de sus vecinos: aₙ = (aₙ₋₁ + aₙ₊₁)/2. En particular, <em>tres números a, b, c están en progresión aritmética si y solo si 2b = a + c</em>.</li>" +
    "<li>Para tres términos consecutivos conviene llamarlos <b>a − d, a, a + d</b>: al sumarlos desaparece la d.</li></ul>" +
    ejemplo("Hallar a₁ y d con dos términos", "En una progresión aritmética a₅ = 17 y a₁₂ = 45. Calcula a₁, d, a₂₀ y S₂₀.", [
      "Entre los términos 5 y 12 hay 12 − 5 = 7 saltos: a₁₂ = a₅ + 7d → 45 = 17 + 7d → d = 28/7 = <b>4</b>.",
      "a₅ = a₁ + 4d → 17 = a₁ + 16 → a₁ = <b>1</b>.",
      "a₂₀ = a₁ + 19d = 1 + 76 = <b>77</b>.",
      "S₂₀ = 20·(1 + 77)/2 = 10·78 = <b>780</b>."
    ]) +
    ejemplo("Sumar los múltiplos de 7 que hay entre 100 y 500", "Calcula la suma de todos los múltiplos de 7 mayores que 100 y menores que 500.", [
      "El primer múltiplo de 7 mayor que 100 es 105 (= 7·15) y el último menor que 500 es 497 (= 7·71).",
      "Forman una progresión aritmética con a₁ = 105, d = 7 y aₙ = 497. Número de términos: 497 = 105 + (n − 1)·7 → n − 1 = 56 → n = 57.",
      "S = 57·(105 + 497)/2 = 57·301 = <b>17.157</b>."
    ]) +
    ejemplo("Interpolar medios aritméticos", "Intercala 4 números entre 3 y 18 para que los 6 formen una progresión aritmética.", [
      "Ahora el primer término es 3 y el sexto es 18, así que a₆ = a₁ + 5d → 18 = 3 + 5d → d = 3.",
      "Regla: para intercalar k números entre a y b, <b>d = (b − a)/(k + 1)</b>. Aquí (18 − 3)/5 = 3.",
      "La progresión es 3, <b>6, 9, 12, 15</b>, 18."
    ]) +
    ejemplo("Cuántos términos hay que sumar", "¿Cuántos términos de la progresión 5, 9, 13, … hay que sumar para que la suma sea 495?", [
      "a₁ = 5 y d = 4. Sₙ = n·(2a₁ + (n − 1)d)/2 = n·(10 + 4n − 4)/2 = n·(4n + 6)/2 = 2n² + 3n.",
      "Igualamos a 495: 2n² + 3n − 495 = 0.",
      "n = (−3 ± √(9 + 3960))/4 = (−3 ± 63)/4. La raíz positiva es n = 60/4 = <b>15</b> (la otra, −16,5, no tiene sentido).",
      "Comprobación: a₁₅ = 5 + 14·4 = 61 y S₁₅ = 15·(5 + 61)/2 = 495 ✓."
    ]) +
    ojo("al hallar el número de términos n, sale una ecuación de segundo grado, y <b>hay que descartar</b> la solución negativa o no entera. n siempre es un entero positivo.");

  // ---------------------------------------------------------------- 4. Geométricas
  secciones[3] =
    "<h5>De dónde sale la fórmula de la suma</h5>" +
    "<p>Escribimos Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹ y multiplicamos por r: r·Sₙ = a₁r + a₁r² + … + a₁rⁿ. Restando las dos igualdades se cancelan casi todos los términos: Sₙ − r·Sₙ = a₁ − a₁rⁿ, es decir, Sₙ(1 − r) = a₁(1 − rⁿ). De ahí:</p>" +
    "<div class='formula-wrap'><div class='formula'>Sₙ = " + fr("a₁(rⁿ − 1)", "r − 1") + "  (si r ≠ 1)</div></div>" +
    "<p>Si r = 1, todos los términos son iguales y simplemente Sₙ = n·a₁. Si |r| &lt; 1, rⁿ se hace diminuto al crecer n y queda <b>S = a₁/(1 − r)</b>. Con sumas parciales se ve cómo se apretan contra su límite:</p>" +
    w("geometrica") +
    "<h5>Propiedades que se preguntan</h5>" +
    "<ul><li><b>Media geométrica</b>: aₙ² = aₙ₋₁·aₙ₊₁. Tres números positivos a, b, c están en progresión geométrica si y solo si b² = a·c.</li>" +
    "<li><b>Producto de los n primeros términos</b>: Pₙ = (a₁·aₙ)<sup>n/2</sup>. (Es el mismo truco de las parejas de los extremos: a₁·aₙ = a₂·aₙ₋₁ = …)</li>" +
    "<li><b>Cualquier término</b>: aₙ = aₘ·rⁿ⁻ᵐ.</li>" +
    "<li><b>Interpolación</b>: para intercalar k términos entre a y b, <b>r = (b/a)<sup>1/(k+1)</sup></b>.</li></ul>" +
    ejemplo("Hallar r y a₁", "En una progresión geométrica a₃ = 12 y a₆ = 96. Calcula r, a₁ y S₈.", [
      "Entre los términos 3 y 6 hay 3 pasos: a₆ = a₃·r³ → 96 = 12·r³ → r³ = 8 → <b>r = 2</b>.",
      "a₃ = a₁·r² → 12 = a₁·4 → <b>a₁ = 3</b>.",
      "S₈ = 3·(2⁸ − 1)/(2 − 1) = 3·255 = <b>765</b>."
    ]) +
    ejemplo("Un decimal periódico como suma infinita", "Escribe 0,666… como suma de infinitos términos y calcula su valor.", [
      "0,666… = 0,6 + 0,06 + 0,006 + … Es una progresión geométrica con a₁ = 0,6 y r = 0,1.",
      "Como |r| = 0,1 &lt; 1, la suma existe: S = a₁/(1 − r) = 0,6/0,9 = 6/9 = <b>2/3</b>.",
      "Es otra forma de obtener la fracción generatriz del Tema 1: 0,666… = 2/3 ✓."
    ]) +
    ejemplo("Producto de términos", "Calcula el producto de los 5 primeros términos de 2, 6, 18, 54, …", [
      "a₁ = 2 y r = 3. El quinto término es a₅ = 2·3⁴ = 162.",
      "P₅ = (a₁·a₅)<sup>5/2</sup> = (2·162)<sup>5/2</sup> = 324<sup>5/2</sup> = (√324)⁵ = 18⁵ = <b>1.889.568</b>.",
      "Comprobación directa: 2·6·18·54·162 = 1.889.568 ✓."
    ]) +
    "<h5>Un clásico: la pelota que rebota</h5>" +
    "<p>Una pelota se deja caer desde 10 m y en cada rebote sube el 60 % de la altura anterior. ¿Qué distancia recorre en total hasta quedarse quieta? La distancia es una <b>serie geométrica</b>: primero baja 10 m y después, en cada rebote, sube y baja la misma altura. Pruébalo con tus propios valores:</p>" +
    w("rebote") +
    ejemplo("La distancia total", "Calcula la distancia total recorrida por una pelota que se deja caer desde 10 m y en cada rebote alcanza el 60 % de la altura anterior.", [
      "Cae primero 10 m. Después, en el rebote k, sube y baja 10·0,6ᵏ m, es decir, 2·10·0,6ᵏ en total.",
      "Distancia = 10 + 2·(10·0,6 + 10·0,6² + 10·0,6³ + …) = 10 + 2·(6 + 3,6 + 2,16 + …).",
      "Entre paréntesis hay una serie geométrica con a₁ = 6 y r = 0,6, que suma 6/(1 − 0,6) = 15.",
      "Distancia total = 10 + 2·15 = <b>40 m</b>. (Fórmula general: h₀·(1 + e)/(1 − e).)"
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "5. ¿Aritmética, geométrica o ninguna? Cómo decidirlo",
      html:
        "<p>Ante una lista de números, el primer paso es mirar qué se repite:</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>aₙ₊₁ − aₙ constante</td><td>progresión <b>aritmética</b> (la constante es d)</td></tr>" +
        "<tr><td>aₙ₊₁ / aₙ constante</td><td>progresión <b>geométrica</b> (la constante es r)</td></tr>" +
        "<tr><td>ninguna de las dos</td><td>mira las diferencias de las diferencias, o busca una fórmula (cuadrados, alternancia de signos…)</td></tr>" +
        "</tbody></table>" +
        ejemplo("Tres listas", "Clasifica: (a) 5, 8, 11, 14…  (b) 2, 6, 18, 54…  (c) 2, 5, 10, 17, 26…", [
          "(a) Diferencias: 3, 3, 3 → <b>aritmética</b> con d = 3. Término general: aₙ = 5 + 3(n−1) = 3n + 2.",
          "(b) Cocientes: 6/2 = 3, 18/6 = 3, 54/18 = 3 → <b>geométrica</b> con r = 3. Término general: aₙ = 2·3ⁿ⁻¹.",
          "(c) Diferencias: 3, 5, 7, 9 (no constantes). Cocientes: 2,5; 2; 1,7 (tampoco). Diferencias de las diferencias: 2, 2, 2 → constante. Cuando la <b>segunda</b> diferencia es constante, el término general es un polinomio de grado 2, aquí aₙ = n² + 1."
        ]) +
        ojo("una lista con todos los términos iguales (5, 5, 5, 5…) es a la vez aritmética (d = 0) y geométrica (r = 1). Y una sucesión como 1, 3, 7, 15 (cada término es el doble del anterior más 1) no es ni lo uno ni lo otro: es 2ⁿ − 1.")
    },
    {
      h: "6. Aplicaciones: dinero, depreciación y poblaciones",
      html:
        "<p>Casi todo lo que crece o decrece un tanto por ciento cada periodo es una progresión geométrica. La clave es el <b>factor</b>: un aumento del r % multiplica por <b>1 + r/100</b> y una bajada del r % multiplica por <b>1 − r/100</b>.</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Capital al 5 % anual</td><td>factor 1,05 → C·1,05ⁿ</td></tr>" +
        "<tr><td>Un coche que pierde el 12 % de valor al año</td><td>factor 0,88 → V·0,88ⁿ</td></tr>" +
        "<tr><td>Una población que crece un 2 % anual</td><td>factor 1,02 → P·1,02ⁿ</td></tr>" +
        "</tbody></table>" +
        w("interes") +
        ejemplo("Interés compuesto", "Se ingresan 1.000 € al 5 % de interés compuesto anual. ¿Cuánto habrá al cabo de 10 años?", [
          "Cada año el capital se multiplica por 1,05: es una progresión geométrica de razón 1,05.",
          "C₁₀ = 1.000·1,05¹⁰ = 1.000·1,62889… = <b>1.628,89 €</b>.",
          "Intereses ganados: 1.628,89 − 1.000 = 628,89 €."
        ]) +
        ejemplo("Ahorro periódico", "Se ingresan 1.000 € al principio de cada año durante 10 años, al 5 % anual. ¿Qué capital hay al final del décimo año?", [
          "El primer ingreso genera intereses durante 10 años (factor 1,05¹⁰), el segundo durante 9, …, el último durante 1 año (factor 1,05).",
          "Capital = 1.000·(1,05 + 1,05² + … + 1,05¹⁰): suma de una progresión geométrica con a₁ = 1,05, r = 1,05 y 10 términos.",
          "S₁₀ = 1,05·(1,05¹⁰ − 1)/(1,05 − 1) = 1,05·0,62889/0,05 = 13,2068…",
          "Capital = 1.000·13,2068 = <b>13.206,79 €</b>. Has puesto 10.000 € y los intereses son 3.206,79 €."
        ]) +
        "<p>Si hay una cantidad que se reduce siempre por el mismo factor y quieres saber cuándo llegará a cierto valor, hay que resolver una ecuación exponencial (con logaritmos): por ejemplo, 1.000·1,05ⁿ = 2.000 → n = log 2/log 1,05 ≈ 14,2 años: el dinero se duplica en poco más de 14 años.</p>"
    },
    {
      h: "7. Fibonacci y el número áureo",
      html:
        "<p>La sucesión de Fibonacci (1, 1, 2, 3, 5, 8, 13, 21…) se define por recurrencia: cada término es la suma de los dos anteriores. No es aritmética ni geométrica, pero tiene una propiedad sorprendente: el cociente de dos términos consecutivos <b>tiende al número áureo φ = (1 + √5)/2 ≈ 1,618</b>. Compruébalo:</p>" +
        w("fibonacci") +
        "<p>¿Por qué? Si aₙ₊₁/aₙ se acerca a un valor φ, entonces aₙ₊₂ = aₙ₊₁ + aₙ implica, dividiendo entre aₙ₊₁, que 1 + 1/φ = φ, es decir φ² = φ + 1, cuya raíz positiva es φ = (1 + √5)/2.</p>"
    },
    {
      h: "8. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "9. Autocomprobación del tema",
      html: "<p>Ocho preguntas de test con explicación y tarjetas para memorizar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe, para una progresión aritmética, aₙ = a₁ + n·d. ¿Qué falla?",
          op: ["Nada, es la fórmula correcta", "Debe ser (n − 1)·d: de a₁ a aₙ solo hay n − 1 saltos", "Debe ser a₁·dⁿ", "Debe ser n·(a₁ + d)"], ok: 1,
          porque: "Para llegar de a₁ a aₙ hay que dar n − 1 saltos. Con n = 1 la fórmula debe dar a₁: a₁ + 0·d = a₁ ✓; con «n·d» daría a₁ + d." },
        { q: "Un alumno calcula la suma de los 20 primeros términos como S₂₀ = 20·(a₁ + a₂₀). ¿Qué ha olvidado?",
          op: ["Nada", "Dividir entre 2", "Multiplicar por d", "Restar a₁"], ok: 1,
          porque: "Sₙ = n·(a₁ + aₙ)/2. Sin el 2, estaría contando cada pareja de extremos dos veces: es justo el rectángulo doble de la demostración de Gauss." },
        { q: "Un alumno suma 1 + 2 + 4 + 8 + … con la fórmula S = a₁/(1 − r) y obtiene 1/(1 − 2) = −1. ¿Qué falla?",
          op: ["Nada, es la suma", "La fórmula de la suma infinita solo vale si |r| &lt; 1; aquí r = 2 y la suma crece sin límite", "Debía dividir entre r", "Debía usar la fórmula aritmética"], ok: 1,
          porque: "Con |r| ≥ 1 los términos no tienden a 0 y la suma diverge: no existe. Una suma de números positivos nunca puede dar un número negativo." },
        { q: "Un alumno dice que la razón de 3, 6, 12, 24 es r = 3 porque 6 − 3 = 3. ¿Qué falla?",
          op: ["Nada", "La razón es un cociente: 6/3 = 2. La diferencia 3 sería la d de una progresión aritmética", "La razón es siempre 1", "La razón es 12/3"], ok: 1,
          porque: "r = aₙ₊₁/aₙ. Con 3, 6, 12, 24 los cocientes valen 2 (geométrica); las diferencias (3, 6, 12) no son constantes." },
        { q: "«aₙ = 1/n es creciente porque el denominador crece».",
          op: ["Es correcto", "Falso: cuanto mayor es el denominador, menor es la fracción; la sucesión es decreciente", "Falso: es constante", "Falso: no es monótona"], ok: 1,
          porque: "aₙ₊₁ − aₙ = 1/(n+1) − 1/n = −1/(n(n+1)) &lt; 0: decrece (hacia 0)." },
        { q: "«Toda sucesión acotada converge».",
          op: ["Es correcto", "Falso: (−1)ⁿ está acotada entre −1 y 1 y no converge (oscila)", "Falso: solo converge si es creciente", "Es correcto solo si es de números enteros"], ok: 1,
          porque: "Hace falta además que sea monótona. Teorema correcto: <em>monótona y acotada ⇒ convergente</em>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "En una progresión aritmética a₁ = 7 y d = −2. ¿Cuánto vale a₁₀?",
          op: ["−11", "−13", "27", "−9"], ok: 0,
          porque: "a₁₀ = 7 + 9·(−2) = 7 − 18 = −11." },
        { q: "¿Cuál es la razón de la progresión 81, 27, 9, 3, …?",
          op: ["−54", "3", "1/3", "−1/3"], ok: 2,
          porque: "27/81 = 1/3, 9/27 = 1/3, 3/9 = 1/3: r = 1/3." },
        { q: "¿Cuánto vale 1 + 2 + 3 + … + 50?",
          op: ["1.275", "2.550", "1.250", "1.326"], ok: 0,
          porque: "S₅₀ = 50·(1 + 50)/2 = 25·51 = 1.275." },
        { q: "La suma infinita 6 + 2 + 2/3 + 2/9 + … vale…",
          op: ["8", "9", "12", "no existe"], ok: 1,
          porque: "a₁ = 6, r = 1/3 (|r| &lt; 1): S = 6/(1 − 1/3) = 6/(2/3) = 9." },
        { q: "La sucesión aₙ = (−1)ⁿ…",
          op: ["es creciente y acotada", "es decreciente y no acotada", "está acotada y no es monótona", "converge a 0"], ok: 2,
          porque: "Sus términos son −1, 1, −1, 1…: siempre entre −1 y 1, y sube y baja alternativamente." },
        { q: "Para intercalar 3 medios geométricos entre 1 y 16, la razón es…",
          op: ["2", "3", "4", "5"], ok: 0,
          porque: "r = (16/1)<sup>1/(3+1)</sup> = 16<sup>1/4</sup> = 2: la progresión es 1, 2, 4, 8, 16." },
        { q: "¿Cuál de estas listas es una progresión geométrica?",
          op: ["2, 4, 6, 8", "1, 3, 9, 27", "1, 4, 9, 16", "1, 2, 4, 6"], ok: 1,
          porque: "1, 3, 9, 27 tiene cociente constante 3. La primera es aritmética, la tercera son cuadrados y la cuarta no tiene regla de este tipo." },
        { q: "2.000 € al 3 % de interés compuesto anual durante 5 años se convierten en…",
          op: ["2.300,00 €", "2.318,55 €", "2.309,10 €", "2.600,00 €"], ok: 1,
          porque: "2.000·1,03⁵ = 2.000·1,159274 = 2.318,55 €. El interés simple daría 2.300 €." }
      ]
    },
    tj1: {
      titulo: "Fórmulas de sucesiones",
      cartas: [
        { a: "Progresión aritmética: término general", b: "aₙ = a₁ + (n − 1)·d  ·  en general aₙ = aₘ + (n − m)·d" },
        { a: "Progresión aritmética: suma de n términos", b: "Sₙ = n·(a₁ + aₙ)/2. Los términos equidistantes de los extremos suman lo mismo." },
        { a: "Progresión geométrica: término general", b: "aₙ = a₁·rⁿ⁻¹  ·  en general aₙ = aₘ·rⁿ⁻ᵐ" },
        { a: "Progresión geométrica: suma de n términos", b: "Sₙ = a₁·(rⁿ − 1)/(r − 1)  (r ≠ 1). Si r = 1, Sₙ = n·a₁." },
        { a: "¿Cuándo existe la suma de infinitos términos?", b: "Cuando |r| &lt; 1. Entonces S = a₁/(1 − r)." },
        { a: "Interpolación aritmética de k términos entre a y b", b: "d = (b − a)/(k + 1)" },
        { a: "Interpolación geométrica de k términos entre a y b", b: "r = (b/a)<sup>1/(k+1)</sup>" },
        { a: "Producto de los n primeros términos de una geométrica", b: "Pₙ = (a₁·aₙ)<sup>n/2</sup>" },
        { a: "Tres números a, b, c en progresión aritmética", b: "2b = a + c (b es la media aritmética). Se pueden escribir a − d, a, a + d." },
        { a: "Tres números a, b, c en progresión geométrica", b: "b² = a·c (b es la media geométrica). Se pueden escribir a/r, a, a·r." },
        { a: "Interés compuesto", b: "C·(1 + r/100)ⁿ. Cada periodo el capital se multiplica por 1 + r/100." },
        { a: "Criterio de monotonía", b: "Signo de aₙ₊₁ − aₙ (o cociente aₙ₊₁/aₙ comparado con 1, si los términos son positivos)." }
      ]
    }
  };

  var ejercicios = [
    // ---------- ★ ----------
    { id: "s1", nivel: 1,
      enunciado: "Halla el término general de la sucesión 3, 5, 7, 9, 11, …",
      check: { tipo: "expr", etiqueta: "aₙ =", expr: "2n+1", ph: "usa la letra n, por ejemplo 2n+1" },
      pistas: ["Los términos suben siempre lo mismo: es una progresión aritmética.", "aₙ = a₁ + (n − 1)·d con a₁ = 3 y d = 2."],
      pasos: ["Diferencia constante: 5 − 3 = 2 = d. Es aritmética con a₁ = 3.", "aₙ = 3 + (n − 1)·2 = 3 + 2n − 2 = 2n + 1.", "Comprobación: a₁ = 3 ✓, a₅ = 11 ✓."],
      resultado: "aₙ = 2n + 1" },
    { id: "s2", nivel: 1,
      enunciado: "En una progresión aritmética a₁ = 4 y d = −3. Calcula a₈.",
      check: { tipo: "num", etiqueta: "a₈ =", valor: -17 },
      pistas: ["aₙ = a₁ + (n − 1)·d."],
      pasos: ["a₈ = 4 + 7·(−3) = 4 − 21 = −17."],
      resultado: "a₈ = −17" },
    { id: "s3", nivel: 1,
      enunciado: "Calcula la razón de la progresión geométrica 5, 10, 20, 40, …",
      check: { tipo: "num", etiqueta: "r =", valor: 2 },
      pistas: ["La razón es el cociente de dos términos consecutivos."],
      pasos: ["r = 10/5 = 2. Comprobación: 20/10 = 2 y 40/20 = 2."],
      resultado: "r = 2" },
    { id: "s4", nivel: 1,
      enunciado: "Calcula la suma de los 10 primeros términos de la progresión aritmética 2, 5, 8, 11, …",
      check: { tipo: "num", etiqueta: "S₁₀ =", valor: 155 },
      pistas: ["Primero necesitas a₁₀ = a₁ + 9d.", "Sₙ = n·(a₁ + aₙ)/2."],
      pasos: ["a₁ = 2 y d = 3. a₁₀ = 2 + 9·3 = 29.", "S₁₀ = 10·(2 + 29)/2 = 5·31 = 155."],
      resultado: "S₁₀ = 155" },
    { id: "s5", nivel: 1,
      enunciado: "Estudia la monotonía de la sucesión aₙ = 3n − 2.",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["creciente", "decreciente", "constante", "no monótona"], ok: 0 },
      pistas: ["Calcula aₙ₊₁ − aₙ."],
      pasos: ["aₙ₊₁ = 3(n + 1) − 2 = 3n + 1.", "aₙ₊₁ − aₙ = (3n + 1) − (3n − 2) = 3 &gt; 0 para todo n.", "Es estrictamente <b>creciente</b> (es una progresión aritmética de diferencia 3)."],
      resultado: "creciente" },
    { id: "s6", nivel: 1,
      enunciado: "La sucesión de Fibonacci empieza con a₁ = 1, a₂ = 1 y cumple aₙ = aₙ₋₁ + aₙ₋₂. Calcula a₉.",
      check: { tipo: "num", etiqueta: "a₉ =", valor: 34 },
      pistas: ["Ve sumando de dos en dos: 1, 1, 2, 3, 5, …"],
      pasos: ["a₃ = 2, a₄ = 3, a₅ = 5, a₆ = 8, a₇ = 13, a₈ = 21, a₉ = 13 + 21 = 34."],
      resultado: "a₉ = 34" },
    // ---------- ★★ ----------
    { id: "s7", nivel: 2,
      enunciado: "En una progresión aritmética a₅ = 17 y a₁₂ = 45. Halla a₁ y la diferencia d.",
      check: [{ tipo: "num", etiqueta: "a₁ =", valor: 1 }, { tipo: "num", etiqueta: "d =", valor: 4 }],
      pistas: ["Entre los términos 5 y 12 hay 7 saltos de tamaño d: a₁₂ = a₅ + 7d."],
      pasos: ["a₁₂ = a₅ + 7d → 45 = 17 + 7d → d = 4.", "a₅ = a₁ + 4d → 17 = a₁ + 16 → a₁ = 1.", "Comprobación: a₁₂ = 1 + 11·4 = 45 ✓."],
      resultado: "a₁ = 1 y d = 4" },
    { id: "s8", nivel: 2,
      enunciado: "Calcula la suma de todos los múltiplos de 7 mayores que 100 y menores que 500.",
      check: { tipo: "num", etiqueta: "Suma =", valor: 17157 },
      pistas: ["Primer múltiplo: 105. Último: 497. Calcula cuántos hay.", "Sₙ = n·(a₁ + aₙ)/2."],
      pasos: ["a₁ = 105 y aₙ = 497 con d = 7. 497 = 105 + (n − 1)·7 → n = 57.", "S = 57·(105 + 497)/2 = 57·301 = 17.157."],
      resultado: "17.157" },
    { id: "s9", nivel: 2,
      enunciado: "Intercala 4 números entre 3 y 18 para que los 6 formen una progresión aritmética. Indica la diferencia y el tercer número intercalado.",
      check: [{ tipo: "num", etiqueta: "d =", valor: 3 }, { tipo: "num", etiqueta: "tercer intercalado =", valor: 12 }],
      pistas: ["d = (b − a)/(k + 1) con k = 4."],
      pasos: ["d = (18 − 3)/(4 + 1) = 3.", "La progresión: 3, 6, 9, 12, 15, 18. Los intercalados son 6, 9, 12, 15; el tercero es 12."],
      resultado: "d = 3 · intercalados: 6, 9, 12, 15" },
    { id: "s10", nivel: 2,
      enunciado: "En una progresión geométrica a₃ = 12 y a₆ = 96. Calcula r, a₁ y S₈.",
      check: [{ tipo: "num", etiqueta: "r =", valor: 2 }, { tipo: "num", etiqueta: "a₁ =", valor: 3 }, { tipo: "num", etiqueta: "S₈ =", valor: 765 }],
      pistas: ["a₆ = a₃·r³.", "Sₙ = a₁·(rⁿ − 1)/(r − 1)."],
      pasos: ["96 = 12·r³ → r³ = 8 → r = 2.", "a₃ = a₁·r² → 12 = 4a₁ → a₁ = 3.", "S₈ = 3·(2⁸ − 1)/(2 − 1) = 3·255 = 765."],
      resultado: "r = 2, a₁ = 3, S₈ = 765" },
    { id: "s11", nivel: 2,
      enunciado: "Calcula la suma de infinitos términos 9 + 3 + 1 + 1/3 + 1/9 + …",
      check: { tipo: "num", etiqueta: "S =", valor: 13.5 },
      pistas: ["Es geométrica con a₁ = 9. Calcula la razón."],
      pasos: ["r = 3/9 = 1/3, y |r| &lt; 1: la suma existe.", "S = a₁/(1 − r) = 9/(1 − 1/3) = 9/(2/3) = 27/2 = 13,5."],
      resultado: "S = 27/2 = 13,5" },
    { id: "s12", nivel: 2,
      enunciado: "Se depositan 1.000 € al 5 % de interés compuesto anual. ¿Cuánto dinero hay al cabo de 10 años? (Redondea a céntimos.)",
      check: { tipo: "num", etiqueta: "Capital =", valor: 1628.89, unidad: "€", tol: 0.0005 },
      pistas: ["Cada año el capital se multiplica por 1,05."],
      pasos: ["C₁₀ = 1.000·1,05¹⁰.", "1,05¹⁰ ≈ 1,628895.", "C₁₀ ≈ 1.628,89 €."],
      resultado: "≈ 1.628,89 €" },
    { id: "s13", nivel: 2,
      enunciado: "Estudia la sucesión aₙ = (2n − 1)/(n + 1): ¿cómo es su monotonía y su acotación?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["creciente y acotada superiormente por 2", "decreciente y acotada inferiormente por 2", "creciente y no acotada", "no monótona"], ok: 0 },
      pistas: ["Calcula aₙ₊₁ − aₙ.", "Escribe aₙ = 2 − 3/(n+1)."],
      pasos: ["aₙ₊₁ − aₙ = (2n+1)/(n+2) − (2n−1)/(n+1) = 3/((n+1)(n+2)) &gt; 0 → creciente.", "aₙ = 2 − 3/(n+1) &lt; 2 → acotada superiormente por 2 (y inferiormente por a₁ = 1/2)."],
      resultado: "Creciente y acotada: 1/2 ≤ aₙ &lt; 2" },
    { id: "s14", nivel: 2,
      enunciado: "Calcula el producto de los 5 primeros términos de la progresión geométrica 2, 6, 18, 54, …",
      check: { tipo: "num", etiqueta: "P₅ =", valor: 1889568 },
      pistas: ["Pₙ = (a₁·aₙ)<sup>n/2</sup>. Calcula antes a₅.", "También puedes multiplicar directamente los cinco términos."],
      pasos: ["a₅ = 2·3⁴ = 162.", "P₅ = (2·162)<sup>5/2</sup> = 324<sup>5/2</sup> = 18⁵ = 1.889.568.", "Comprobación: 2·6·18·54·162 = 1.889.568."],
      resultado: "P₅ = 1.889.568" },
    // ---------- ★★★ ----------
    { id: "s15", nivel: 3,
      enunciado: "Una pelota se deja caer desde 10 m. En cada rebote sube el 60 % de la altura anterior. ¿Qué distancia total recorre hasta pararse?",
      check: { tipo: "num", etiqueta: "Distancia =", valor: 40, unidad: "m" },
      pistas: ["Primero baja 10 m. Después, cada rebote sube y baja.", "Serie geométrica de razón 0,6."],
      pasos: ["Distancia = 10 + 2·(6 + 3,6 + 2,16 + …).", "La serie tiene a₁ = 6 y r = 0,6: suma = 6/(1 − 0,6) = 15.", "Distancia total = 10 + 2·15 = 40 m."],
      resultado: "40 m" },
    { id: "s16", nivel: 3,
      enunciado: "¿Cuántos términos de la progresión aritmética 5, 9, 13, … hay que sumar para que la suma sea 495?",
      check: { tipo: "num", etiqueta: "n =", valor: 15 },
      pistas: ["Sₙ = n·(2a₁ + (n − 1)d)/2 = 2n² + 3n.", "Resuelve 2n² + 3n = 495 y descarta la solución negativa."],
      pasos: ["S<sub>n</sub> = n·(10 + 4(n − 1))/2 = 2n² + 3n = 495 → 2n² + 3n − 495 = 0.", "n = (−3 ± √(9 + 3960))/4 = (−3 ± 63)/4 → n = 15 o n = −16,5.", "n debe ser entero positivo: n = 15."],
      resultado: "n = 15" },
    { id: "s17", nivel: 3,
      enunciado: "Se ingresan 1.000 € al principio de cada año durante 10 años, a un 5 % anual de interés compuesto. ¿Qué capital hay al final del décimo año?",
      check: { tipo: "num", etiqueta: "Capital =", valor: 13206.79, unidad: "€", tol: 0.001 },
      pistas: ["El primer ingreso gana intereses durante 10 años y el último durante 1.", "Suma geométrica: 1.000·(1,05 + 1,05² + … + 1,05¹⁰)."],
      pasos: ["Capital = 1.000·(1,05 + 1,05² + … + 1,05¹⁰).", "Es una suma geométrica: a₁ = 1,05, r = 1,05, n = 10: S = 1,05·(1,05¹⁰ − 1)/0,05 = 1,05·12,5779 = 13,2068.", "Capital ≈ 13.206,79 €."],
      resultado: "≈ 13.206,79 €" },
    { id: "s18", nivel: 3,
      enunciado: "Expresa 0,636363… (el 63 se repite) como suma de infinitos términos de una progresión geométrica y calcula su valor como fracción.",
      check: { tipo: "num", etiqueta: "Valor =", valor: 7 / 11, tol: 0.001, ph: "p/q" },
      pistas: ["0,6363… = 0,63 + 0,0063 + 0,000063 + …", "a₁ = 0,63 y r = 0,01."],
      pasos: ["0,636363… = 0,63 + 0,0063 + 0,000063 + … con a₁ = 0,63 y r = 0,01.", "S = 0,63/(1 − 0,01) = 0,63/0,99 = 63/99 = 7/11.", "Coincide con la fracción generatriz del Tema 1."],
      resultado: "7/11" },
    { id: "s19", nivel: 3,
      enunciado: "Calcula la suma infinita 1 − 1/2 + 1/4 − 1/8 + … (los signos alternan).",
      check: { tipo: "num", etiqueta: "S =", valor: 2 / 3, tol: 0.001, ph: "p/q" },
      pistas: ["Es geométrica con razón negativa."],
      pasos: ["a₁ = 1 y r = −1/2, con |r| &lt; 1.", "S = a₁/(1 − r) = 1/(1 + 1/2) = 1/(3/2) = 2/3."],
      resultado: "S = 2/3" },
    { id: "s20", nivel: 3,
      enunciado: "Tres números están en progresión aritmética. Suman 21 y su producto es 315. Calcula el menor y el mayor.",
      check: [{ tipo: "num", etiqueta: "menor =", valor: 5 }, { tipo: "num", etiqueta: "mayor =", valor: 9 }],
      pistas: ["Llámalos a − d, a, a + d: al sumarlos desaparece d.", "(a − d)·a·(a + d) = a·(a² − d²)."],
      pasos: ["Suma: (a − d) + a + (a + d) = 3a = 21 → a = 7.", "Producto: (7 − d)·7·(7 + d) = 7·(49 − d²) = 315 → 49 − d² = 45 → d² = 4 → d = ±2.", "Los números son 5, 7, 9 (o 9, 7, 5)."],
      resultado: "5, 7 y 9" },
    { id: "s21", nivel: 3,
      enunciado: "Tres números están en progresión geométrica. Suman 14 y su producto es 64. Calcula el menor y el mayor.",
      check: [{ tipo: "num", etiqueta: "menor =", valor: 2 }, { tipo: "num", etiqueta: "mayor =", valor: 8 }],
      pistas: ["Llámalos a/r, a, a·r: al multiplicarlos desaparece r.", "Producto: a³ = 64."],
      pasos: ["Producto: (a/r)·a·(a·r) = a³ = 64 → a = 4.", "Suma: 4/r + 4 + 4r = 14 → 4/r + 4r = 10 → 4 + 4r² = 10r → 2r² − 5r + 2 = 0.", "r = (5 ± 3)/4 → r = 2 o r = 1/2.", "Con r = 2: 2, 4, 8 (con r = 1/2: 8, 4, 2). Menor 2 y mayor 8."],
      resultado: "2, 4 y 8" },
    { id: "s22", nivel: 3,
      enunciado: "Demuestra la fórmula de la suma de los n primeros términos de una progresión geométrica, Sₙ = a₁(rⁿ − 1)/(r − 1), para r ≠ 1.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹", p: 0.5 },
        { t: "Multiplica por r y escribe r·Sₙ = a₁r + a₁r² + … + a₁rⁿ", p: 0.5 },
        { t: "Resta las dos igualdades y observa que casi todos los términos se cancelan: Sₙ − r·Sₙ = a₁ − a₁rⁿ", p: 0.5 },
        { t: "Saca factor común y despeja: Sₙ(1 − r) = a₁(1 − rⁿ) → Sₙ = a₁(rⁿ − 1)/(r − 1)", p: 0.5 }
      ] },
      pasos: ["Sₙ = a₁ + a₁r + a₁r² + … + a₁rⁿ⁻¹.", "Multiplicando por r: r·Sₙ = a₁r + a₁r² + … + a₁rⁿ⁻¹ + a₁rⁿ.", "Restando: Sₙ − r·Sₙ = a₁ − a₁rⁿ (se cancelan todos los términos intermedios).", "Sₙ(1 − r) = a₁(1 − rⁿ) → Sₙ = a₁(1 − rⁿ)/(1 − r) = a₁(rⁿ − 1)/(r − 1)."],
      resultado: "Sₙ = a₁(rⁿ − 1)/(r − 1)" }
  ];

  var lamina = [
    { titulo: "Progresión aritmética (se SUMA d)",
      items: [
        { label: "Término general", formula: "aₙ = a₁ + (n − 1)·d", cuando: "Para llegar a cualquier término.", ejemplo: "3, 7, 11… (d = 4) → a₁₀ = 3 + 9·4 = 39", ojo: "Son n − 1 saltos, no n." },
        { label: "Entre dos términos", formula: "aₙ = aₘ + (n − m)·d", cuando: "Cuando te dan dos términos y no el primero.", ejemplo: "a₅ = 17, a₁₂ = 45 → 7d = 28 → d = 4" },
        { label: "Suma de n términos", formula: "Sₙ = " + fr("n·(a₁ + aₙ)", "2"), cuando: "Siempre que conozcas a₁ y aₙ.", ejemplo: "1 + 2 + … + 100 = 100·101/2 = 5050", ojo: "No olvides el «÷ 2»." },
        { label: "Interpolar k términos entre a y b", formula: "d = " + fr("b − a", "k + 1") }
      ] },
    { titulo: "Progresión geométrica (se MULTIPLICA por r)",
      items: [
        { label: "Término general", formula: "aₙ = a₁·rⁿ⁻¹", ejemplo: "3, 6, 12… (r = 2) → a₆ = 3·2⁵ = 96", ojo: "La razón es un cociente, no una diferencia." },
        { label: "Suma de n términos", formula: "Sₙ = " + fr("a₁·(rⁿ − 1)", "r − 1"), ojo: "Si r = 1, Sₙ = n·a₁." },
        { label: "Suma infinita (|r| &lt; 1)", formula: "S = " + fr("a₁", "1 − r"), cuando: "Solo si |r| &lt; 1.", ejemplo: "4 + 2 + 1 + … = 4/(1 − 1/2) = 8" },
        { label: "Producto de n términos", formula: "Pₙ = (a₁·aₙ)<sup>n/2</sup>" },
        { label: "Interpolar k términos entre a y b", formula: "r = (b/a)<sup>1/(k+1)</sup>" }
      ] },
    { titulo: "¿Aritmética o geométrica?", ancha: true,
      tabla: { cab: ["Mira…", "Si es constante", "Entonces"], filas: [
        ["Diferencias aₙ₊₁ − aₙ", "sí", "aritmética (d)"], ["Cocientes aₙ₊₁ / aₙ", "sí", "geométrica (r)"], ["Segunda diferencia", "sí", "polinomio de grado 2 (n² …)"], ["Tres números a, b, c", "2b = a + c", "aritmética"], ["Tres números a, b, c", "b² = a·c", "geométrica"]
      ] },
      nota: "Para 3 números aritméticos usa a − d, a, a + d. Para geométricos, a/r, a, a·r." },
    { titulo: "Monotonía y acotación",
      pasos: ["Calcula aₙ₊₁ − aₙ y estudia su signo (≥ 0 creciente, ≤ 0 decreciente).", "Con términos positivos, también vale aₙ₊₁/aₙ ≷ 1.", "Cota superior K: aₙ ≤ K ∀n. Cota inferior k: aₙ ≥ k ∀n.", "Monótona y acotada ⇒ converge."],
      nota: "(−1)ⁿ está acotada, no es monótona y no converge." },
    { titulo: "Interés compuesto",
      items: [
        { label: "Capital tras n años", formula: "Cₙ = C·(1 + r/100)ⁿ", ejemplo: "1.000 € al 5 % durante 10 años → 1.628,89 €", cuando: "Los intereses se suman al capital cada año." },
        { label: "Ahorro al inicio de cada año", formula: "C·q·(qⁿ − 1)/(q − 1)", cuando: "Con q = 1 + r/100 y una aportación C anual." }
      ],
      nota: "Aumento del r %: factor 1 + r/100. Disminución del r %: factor 1 − r/100." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "aₙ = a₁ + n·d", bien: "aₙ = a₁ + (n − 1)·d", por: "De a₁ a aₙ hay n − 1 saltos." },
        { mal: "Sₙ = n·(a₁ + aₙ)", bien: "Sₙ = n·(a₁ + aₙ)/2", por: "Cada pareja se cuenta una vez, no dos." },
        { mal: "1 + 2 + 4 + 8 + … = 1/(1 − 2) = −1", bien: "La suma diverge", por: "La fórmula solo vale si |r| &lt; 1." },
        { mal: "r = aₙ₊₁ − aₙ", bien: "r = aₙ₊₁ ÷ aₙ", por: "La diferencia es d (aritmética)." },
        { mal: "Toda sucesión acotada converge", bien: "Monótona y acotada converge", por: "(−1)ⁿ está acotada y oscila." }
      ] }
  ];

  B.registrar("mates1", "t2", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 3: Álgebra
   (polinomios, ecuaciones y sistemas)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t3/" + ref); }

  var resumen = [
    "Un <b>polinomio</b> se suma, resta y multiplica término a término; se divide con la división larga o, si el divisor es x − a, con <b>Ruffini</b>.",
    "<b>Teorema del resto</b>: el resto de dividir P(x) entre (x − a) es P(a). <b>Teorema del factor</b>: (x − a) es factor de P ⇔ P(a) = 0.",
    "Para <b>factorizar</b>: factor común → identidad notable → Ruffini con las raíces candidatas (divisores de a₀) → ecuación de 2.º grado.",
    "ax² + bx + c = 0 se resuelve con la fórmula; el <b>discriminante</b> Δ = b² − 4ac dice cuántas soluciones reales hay. Las bicuadradas se resuelven con t = x².",
    "Con raíces, denominadores o logaritmos hay que <b>comprobar siempre</b> las soluciones: pueden aparecer soluciones falsas.",
    "Las inecuaciones se resuelven con una <b>tabla de signos</b>: ceros del numerador, ceros del denominador (que nunca entran) y un valor de prueba en cada intervalo."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Polinomios
  secciones[0] =
    "<h5>El vocabulario que hay que dominar</h5>" +
    "<p>Antes de operar conviene tener claras las palabras, porque los enunciados las usan sin explicarlas:</p>" +
    tabla(["Palabra", "Qué es", "En P(x) = 4x³ − x² + 7"], [
      ["Monomio", "un número por una potencia de x: a·xⁿ", "4x³, −x² y 7 son monomios"],
      ["Coeficiente", "el número que acompaña a cada potencia de x", "4, −1 y 7 (el de x² es −1, aunque no se escriba el 1)"],
      ["Grado", "el exponente más alto con coeficiente distinto de 0", "grado 3"],
      ["Coeficiente principal", "el coeficiente del término de mayor grado", "4"],
      ["Término independiente", "el que no lleva x (es P(0))", "7"],
      ["Polinomio mónico", "su coeficiente principal es 1", "x² − 5x + 6 sí lo es; P no"],
      ["Polinomio completo", "tiene todas las potencias, de la mayor a x⁰", "P no lo es (falta el término en x)"]
    ]) +
    "<p>Dos polinomios son <b>iguales</b> cuando tienen el mismo grado y los mismos coeficientes en cada potencia. Esa idea sirve para resolver problemas del tipo «halla a y b para que x² + ax + b = (x − 1)(x + 4)»: se desarrolla el segundo miembro (x² + 3x − 4) y se comparan coeficientes: a = 3 y b = −4.</p>" +
    "<h5>Operar con polinomios, sin errores</h5>" +
    ejemplo("Suma y resta", "Dados P(x) = 3x³ − 2x² + 5x − 1 y Q(x) = −x³ + 4x² − x + 7, calcula P + Q y P − Q.", [
      "Se colocan los términos del mismo grado en columnas y se opera columna a columna.",
      "<b>P + Q</b>: x³: 3 + (−1) = 2 · x²: −2 + 4 = 2 · x: 5 + (−1) = 4 · independiente: −1 + 7 = 6. Resultado: <b>2x³ + 2x² + 4x + 6</b>.",
      "<b>P − Q</b>: se restan los coeficientes, es decir, se <i>cambia el signo de todo Q</i> y se suma: x³: 3 − (−1) = 4 · x²: −2 − 4 = −6 · x: 5 − (−1) = 6 · independiente: −1 − 7 = −8. Resultado: <b>4x³ − 6x² + 6x − 8</b>."
    ]) +
    ojo("al restar, el signo «−» afecta a <b>todos</b> los términos del segundo polinomio. Escribir P − Q como 3x³ − 2x² + 5x − 1 − x³ + 4x² − x + 7 es un error muy típico: hay que poner paréntesis, −(−x³ + 4x² − x + 7) = x³ − 4x² + x − 7.") +
    ejemplo("Producto", "Calcula (2x² − 3x + 1)·(x² + 4x − 2).", [
      "Cada término del primero se multiplica por cada término del segundo (6 productos en total) y se suman los exponentes de x:",
      "2x²·(x² + 4x − 2) = 2x⁴ + 8x³ − 4x²",
      "−3x·(x² + 4x − 2) = −3x³ − 12x² + 6x",
      "1·(x² + 4x − 2) = x² + 4x − 2",
      "Sumando los términos semejantes: 2x⁴ + (8 − 3)x³ + (−4 − 12 + 1)x² + (6 + 4)x − 2 = <b>2x⁴ + 5x³ − 15x² + 10x − 2</b>.",
      "Comprobación rápida: el grado es 2 + 2 = 4 ✓ y, con x = 1, (2 − 3 + 1)·(1 + 4 − 2) = 0·3 = 0 y 2 + 5 − 15 + 10 − 2 = 0 ✓."
    ]) +
    "<p><b>Truco de comprobación</b>: sustituir x = 1 en una operación entre polinomios es muy rápido, porque P(1) es la suma de todos los coeficientes. Si tu resultado no cumple (P·Q)(1) = P(1)·Q(1), te has equivocado.</p>" +
    "<h5>La división de polinomios</h5>" +
    "<p>Dividir polinomios es igual que dividir números enteros: dado un dividendo P y un divisor Q (con grado de Q ≤ grado de P) existen un único <b>cociente C</b> y un único <b>resto R</b> tales que</p>" +
    H.formula("P(x) = Q(x) · C(x) + R(x)     con grado de R &lt; grado de Q") +
    "<p>Si R = 0, la división es <b>exacta</b> y Q es un factor de P. Se hace con el mismo algoritmo que la división larga de números: (1) divides el término de mayor grado del dividendo entre el de mayor grado del divisor; (2) multiplicas ese resultado por todo el divisor; (3) restas; (4) repites con lo que queda hasta que su grado sea menor que el del divisor.</p>" +
    ejemplo("División exacta", "Divide P(x) = x³ − 2x² − 5x + 6 entre Q(x) = x² + x − 2.", [
      "x³ ÷ x² = <b>x</b>. Multiplicamos x·(x² + x − 2) = x³ + x² − 2x y lo restamos: (x³ − 2x² − 5x + 6) − (x³ + x² − 2x) = −3x² − 3x + 6.",
      "−3x² ÷ x² = <b>−3</b>. Multiplicamos −3·(x² + x − 2) = −3x² − 3x + 6 y restamos: (−3x² − 3x + 6) − (−3x² − 3x + 6) = 0.",
      "Cociente <b>C = x − 3</b>, resto <b>R = 0</b>: la división es exacta. Es decir, x³ − 2x² − 5x + 6 = (x² + x − 2)(x − 3)."
    ]) +
    ejemplo("División con resto", "Divide P(x) = 2x³ − x² + 3x − 4 entre Q(x) = x² + 1.", [
      "2x³ ÷ x² = <b>2x</b>. 2x·(x² + 1) = 2x³ + 2x. Resta: (2x³ − x² + 3x − 4) − (2x³ + 2x) = −x² + x − 4.",
      "−x² ÷ x² = <b>−1</b>. −1·(x² + 1) = −x² − 1. Resta: (−x² + x − 4) − (−x² − 1) = x − 3.",
      "El resto x − 3 tiene grado 1, menor que el grado 2 del divisor: hemos terminado. <b>C = 2x − 1</b> y <b>R = x − 3</b>.",
      "Prueba de la división: Q·C + R = (x² + 1)(2x − 1) + (x − 3) = 2x³ − x² + 2x − 1 + x − 3 = 2x³ − x² + 3x − 4 = P ✓."
    ]) +
    "<p>Si dejas que la calculadora de abajo haga las operaciones, fíjate en lo que cambia con el grado: <b>grado(P·Q) = grado P + grado Q</b>, y en una división <b>grado(C) = grado P − grado Q</b>, mientras que el resto es siempre de grado menor que el divisor.</p>" +
    w("polinomios");

  // ---------------------------------------------------------------- 2. Identidades notables
  secciones[1] =
    "<h5>Por qué (a + b)² no es a² + b²: míralo como un área</h5>" +
    "<p>Un cuadrado de lado a + b tiene área (a + b)². Pero si lo cortas, aparecen cuatro piezas: un cuadrado a², un cuadrado b² y <b>dos rectángulos ab</b>. Esos dos rectángulos son justo el «término del medio» 2ab que tanta gente olvida. Cambia los valores de a y b y comprueba que las piezas siempre encajan:</p>" +
    w("notable") +
    "<h5>La familia completa de identidades notables</h5>" +
    tabla(["Nombre", "Identidad", "Cómo se reconoce al factorizar"], [
      ["Cuadrado de una suma", "(a + b)² = a² + 2ab + b²", "dos extremos cuadrados y el central con signo + y doble producto"],
      ["Cuadrado de una diferencia", "(a − b)² = a² − 2ab + b²", "igual, pero con el central negativo"],
      ["Suma por diferencia", "(a + b)(a − b) = a² − b²", "una <b>resta</b> de dos cuadrados"],
      ["Cubo de una suma", "(a + b)³ = a³ + 3a²b + 3ab² + b³", "cuatro términos con coeficientes 1, 3, 3, 1"],
      ["Cubo de una diferencia", "(a − b)³ = a³ − 3a²b + 3ab² − b³", "los signos alternan: + − + −"],
      ["Suma de cubos", "a³ + b³ = (a + b)(a² − ab + b²)", "suma de dos cubos"],
      ["Diferencia de cubos", "a³ − b³ = (a − b)(a² + ab + b²)", "resta de dos cubos"]
    ]) +
    "<p>Los coeficientes 1, 3, 3, 1 del cubo y 1, 2, 1 del cuadrado forman las filas del <b>triángulo de Pascal</b>: cada número es la suma de los dos que tiene encima (1 · 1 1 · 1 2 1 · 1 3 3 1 · 1 4 6 4 1…). La fila n da los coeficientes de (a + b)ⁿ: por ejemplo (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.</p>" +
    "<h5>Cómo se usan</h5>" +
    ejemplo("Desarrollar con una identidad", "Desarrolla (3x − 5)² y (x − 2)³.", [
      "(3x − 5)² = (3x)² − 2·(3x)·5 + 5² = <b>9x² − 30x + 25</b>. Ojo: el primer término se eleva <i>entero</i>: (3x)² = 9x², no 3x².",
      "(x − 2)³ = x³ − 3·x²·2 + 3·x·2² − 2³ = <b>x³ − 6x² + 12x − 8</b>."
    ]) +
    ejemplo("Cálculo mental con identidades", "Calcula sin calculadora 99², 101·99 y 1002².", [
      "99² = (100 − 1)² = 10.000 − 200 + 1 = <b>9.801</b>.",
      "101·99 = (100 + 1)(100 − 1) = 100² − 1² = <b>9.999</b>.",
      "1002² = (1000 + 2)² = 1.000.000 + 4.000 + 4 = <b>1.004.004</b>."
    ]) +
    ejemplo("Reconocer un trinomio cuadrado perfecto", "Factoriza x² + 10x + 25, 4x² − 12x + 9 y 9x² + 6xy + y².", [
      "x² + 10x + 25: los extremos son x² y 5²; el doble producto es 2·x·5 = 10x ✓. Es <b>(x + 5)²</b>.",
      "4x² − 12x + 9: extremos (2x)² y 3²; el doble producto 2·2x·3 = 12x, y el central es negativo. Es <b>(2x − 3)²</b>.",
      "9x² + 6xy + y²: extremos (3x)² e y²; 2·3x·y = 6xy ✓. Es <b>(3x + y)²</b>.",
      "Si el término central <i>no</i> coincide con el doble producto (por ejemplo x² + 8x + 25), no es un cuadrado perfecto."
    ]) +
    ejemplo("Combinar factor común y notable", "Factoriza 3x³ − 12x y x⁴ − 16.", [
      "3x³ − 12x: factor común 3x → 3x(x² − 4) = <b>3x(x − 2)(x + 2)</b> (la diferencia de cuadrados se factoriza otra vez).",
      "x⁴ − 16 = (x²)² − 4² = (x² − 4)(x² + 4) = <b>(x − 2)(x + 2)(x² + 4)</b>. El factor x² + 4 es una <i>suma</i> de cuadrados: ya no se puede descomponer con números reales."
    ]) +
    ejemplo("Sumas y diferencias de cubos", "Factoriza x³ + 8 y 8x³ − 27.", [
      "x³ + 8 = x³ + 2³ = (x + 2)(x² − 2x + 4).",
      "8x³ − 27 = (2x)³ − 3³ = (2x − 3)((2x)² + 2x·3 + 3²) = <b>(2x − 3)(4x² + 6x + 9)</b>.",
      "Para recordar los signos: en el primer paréntesis va el mismo signo que hay en el problema, y en el segundo «+ − +» si es suma y «+ + +» si es resta."
    ]) +
    "<h5>Dos aplicaciones que ya usarás en otros temas</h5>" +
    "<ul><li><b>Racionalizar</b>: multiplicar por el conjugado usa (a + b)(a − b) = a² − b². Por ejemplo, 1/(√5 − 2) = (√5 + 2)/((√5 − 2)(√5 + 2)) = (√5 + 2)/(5 − 4) = √5 + 2.</li>" +
    "<li><b>Completar el cuadrado</b>: x² + 6x + 5 = (x² + 6x + 9) − 9 + 5 = (x + 3)² − 4. Es el primer paso para deducir la fórmula de la ecuación de segundo grado (sección 5) y para encontrar el vértice de una parábola (Tema 9).</li></ul>" +
    ojo("(a + b)² ≠ a² + b² y (a − b)³ ≠ a³ − b³. Y cuidado con los signos: (x − 3)² = x² − 6x + 9, no x² − 6x − 9; el último término siempre es positivo porque (−3)² = +9.");

  // ---------------------------------------------------------------- 3. Ruffini
  secciones[2] =
    "<h5>Por qué funciona Ruffini</h5>" +
    "<p>Ruffini no es magia: es la división larga con el divisor x − a, pero sin escribir las x. Cuando divides entre x − a, en cada paso multiplicas el coeficiente que acabas de obtener por <b>a</b> y se lo sumas al siguiente coeficiente. Esa operación es exactamente lo que hace la tabla. Solo sirve cuando el divisor es de la forma <b>x − a</b> (grado 1 y coeficiente principal 1); para otros divisores hay que usar la división larga.</p>" +
    w("ruffini") +
    "<h5>Los casos que hay que saber manejar</h5>" +
    ejemplo("Faltan términos y el divisor es x + a", "Divide x³ + 2x² − 5x − 6 entre (x + 3).", [
      "x + 3 = x − (−3): hay que usar <b>a = −3</b>. Es el error más frecuente: el valor de a es el que anula el divisor.",
      "Coeficientes: 1, 2, −5, −6. Bajamos el 1. 1·(−3) = −3 → 2 + (−3) = −1. −1·(−3) = 3 → −5 + 3 = −2. −2·(−3) = 6 → −6 + 6 = 0.",
      "Cociente <b>x² − x − 2</b>, resto <b>0</b>. Entonces x³ + 2x² − 5x − 6 = (x + 3)(x² − x − 2) y, como x² − x − 2 = (x − 2)(x + 1), queda (x + 3)(x − 2)(x + 1)."
    ]) +
    ejemplo("Cuando falta un término hay que escribir un 0", "Divide 2x⁴ − 3x² + x − 6 entre (x − 2).", [
      "Falta el término en x³. Los coeficientes en orden de grado son <b>2, 0, −3, 1, −6</b>: el 0 ocupa el lugar del x³ que no aparece (si lo olvidas, toda la tabla sale mal).",
      "Bajamos 2. 2·2 = 4 → 0 + 4 = 4. 4·2 = 8 → −3 + 8 = 5. 5·2 = 10 → 1 + 10 = 11. 11·2 = 22 → −6 + 22 = 16.",
      "Cociente <b>2x³ + 4x² + 5x + 11</b> y resto <b>16</b>. Comprobación con el teorema del resto: P(2) = 2·16 − 3·4 + 2 − 6 = 32 − 12 + 2 − 6 = 16 ✓."
    ]) +
    ejemplo("Un divisor de la forma (ax − b)", "Divide 2x³ + 3x² + 4x − 3 entre (2x − 1).", [
      "2x − 1 = 2(x − 1/2). Dividimos primero entre x − 1/2 con Ruffini (a = 1/2): coeficientes 2, 3, 4, −3.",
      "Bajamos 2. 2·½ = 1 → 3 + 1 = 4. 4·½ = 2 → 4 + 2 = 6. 6·½ = 3 → −3 + 3 = 0. Cociente provisional 2x² + 4x + 6, resto 0.",
      "Como el divisor real es 2·(x − 1/2), el cociente se divide entre 2: <b>C = x² + 2x + 3</b>. (El resto no cambia; aquí es 0.)",
      "Comprobación: (2x − 1)(x² + 2x + 3) = 2x³ + 4x² + 6x − x² − 2x − 3 = 2x³ + 3x² + 4x − 3 ✓."
    ]) +
    "<h5>Teorema del resto y teorema del factor</h5>" +
    "<p>Si dividimos P(x) entre (x − a), por la prueba de la división se cumple P(x) = (x − a)·C(x) + R, con R un número (porque su grado es menor que 1). Sustituyendo x = a, el sumando (x − a)·C(x) se anula y queda <b>P(a) = R</b>. Eso es el <b>teorema del resto</b>: el resto de dividir entre x − a es P(a), y no hace falta dividir para saberlo. Su consecuencia inmediata es el <b>teorema del factor</b>: (x − a) divide exactamente a P ⇔ R = 0 ⇔ P(a) = 0.</p>" +
    "<p>Además, Ruffini es la forma más rápida de <b>evaluar un polinomio</b>: el último número de la tabla es P(a), con muchas menos multiplicaciones que calcular las potencias a mano (es el método de Horner).</p>" +
    ejemplo("Hallar un parámetro", "¿Para qué valor de k es divisible P(x) = x³ + kx² − 4x + 4 por x − 2?", [
      "Que sea divisible por x − 2 significa que el resto es 0, es decir, P(2) = 0.",
      "P(2) = 8 + 4k − 8 + 4 = 4k + 4 = 0 → <b>k = −1</b>.",
      "Comprobación: con k = −1, P(x) = x³ − x² − 4x + 4 = x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4) = (x − 1)(x − 2)(x + 2). ✓"
    ]) +
    ejemplo("Dos parámetros", "Halla a y b para que P(x) = x³ + ax² + bx + 6 sea divisible por (x − 1) y por (x + 2).", [
      "Divisible por x − 1 → P(1) = 0 → 1 + a + b + 6 = 0 → a + b = −7.",
      "Divisible por x + 2 → P(−2) = 0 → −8 + 4a − 2b + 6 = 0 → 4a − 2b = 2 → 2a − b = 1.",
      "Sumando las dos ecuaciones: 3a = −6 → a = −2, y b = −7 − a = −5.",
      "<b>a = −2 y b = −5</b>. El polinomio es x³ − 2x² − 5x + 6 = (x − 1)(x + 2)(x − 3)."
    ]) +
    ejemplo("Resto sin dividir", "Calcula el resto de dividir x⁴ − 3x² + 2x + 5 entre (x + 2).", [
      "x + 2 = x − (−2). Por el teorema del resto, el resto es P(−2) = 16 − 12 − 4 + 5 = <b>5</b>."
    ]) +
    ojo("el teorema del resto habla de dividir entre <b>x − a</b>, y el número que se sustituye es <b>a</b>. Para el divisor x + 3 hay que evaluar P(−3), no P(3). Y para un divisor como 2x − 1, se evalúa en x = 1/2.");

  // ---------------------------------------------------------------- 4. Factorización
  secciones[3] =
    "<h5>Un método que siempre funciona (con los números de los exámenes)</h5>" +
    "<p>Factorizar «al tun tun» es perder el tiempo. Sigue este orden; en cada paso, si ya has terminado, paras:</p>" +
    "<ol><li><b>Factor común</b>: ¿hay un número o una potencia de x que se repite en todos los términos? Si el término independiente es 0, sale al menos un factor x.</li>" +
    "<li><b>Identidad notable</b>: ¿es una diferencia de cuadrados, un cuadrado perfecto, una suma o resta de cubos?</li>" +
    "<li><b>Ruffini</b>: busca raíces enteras entre los divisores del término independiente y, si el coeficiente principal no es 1, también fracciones. Cada vez que el resto sea 0 has sacado un factor (x − a); vuelve a probar con el cociente (¡puede repetirse la misma raíz!).</li>" +
    "<li><b>Ecuación de 2.º grado</b>: cuando el cociente sea de grado 2, resuélvelo con la fórmula. Si Δ &lt; 0, ese factor es <i>irreducible</i> y ahí te quedas.</li></ol>" +
    "<h5>El teorema de las raíces racionales: no pruebes al azar</h5>" +
    "<p>Si un polinomio de <b>coeficientes enteros</b> tiene una raíz racional p/q (fracción irreducible), entonces <b>p divide al término independiente a₀</b> y <b>q divide al coeficiente principal aₙ</b>. Con raíces enteras (q = 1) basta con probar los divisores de a₀, con signo + y con signo −.</p>" +
    ejemplo("Lista de candidatos", "Busca las raíces racionales posibles de 2x³ − 3x² − 3x + 2.", [
      "a₀ = 2 → p ∈ {1, 2}. aₙ = 2 → q ∈ {1, 2}.",
      "Candidatos p/q: ±1, ±2, ±1/2 (±2/2 = ±1 ya está en la lista).",
      "P(1) = 2 − 3 − 3 + 2 = −2 ≠ 0. P(−1) = −2 − 3 + 3 + 2 = 0 ✓. Primera raíz: x = −1.",
      "Ruffini con a = −1: 2, −3, −3, 2 → bajar 2; 2·(−1) = −2 → −3 − 2 = −5; −5·(−1) = 5 → −3 + 5 = 2; 2·(−1) = −2 → 2 − 2 = 0. Cociente 2x² − 5x + 2.",
      "2x² − 5x + 2 = 0 → x = (5 ± √(25 − 16))/4 = (5 ± 3)/4 → x = 2 o x = 1/2.",
      "<b>2x³ − 3x² − 3x + 2 = 2(x + 1)(x − 2)(x − 1/2) = (x + 1)(x − 2)(2x − 1)</b>."
    ]) +
    w("factorizar") +
    "<h5>Raíces múltiples: cuando una raíz se repite</h5>" +
    "<p>A veces la misma raíz sale varias veces. Se dice que es una raíz de <b>multiplicidad</b> 2, 3… Por ejemplo, x³ − 3x² + 4 = (x + 1)(x − 2)²: la raíz x = 2 es doble. En la gráfica se nota: en una raíz de multiplicidad par la curva <b>toca el eje sin atravesarlo</b> (rebota), y en una de multiplicidad impar lo atraviesa. Para detectarlo, tras sacar una raíz con Ruffini, <i>vuelve a probar con el mismo valor</i> en el cociente.</p>" +
    ejemplo("Raíz doble", "Factoriza x³ − 3x² + 4.", [
      "a₀ = 4 → candidatos ±1, ±2, ±4. P(−1) = −1 − 3 + 4 = 0 ✓.",
      "Ruffini con −1: 1, −3, 0, 4 → 1; −1 → −4; 4 → 4; −4 → 0. Cociente x² − 4x + 4.",
      "x² − 4x + 4 es un cuadrado perfecto: (x − 2)². Por tanto <b>x³ − 3x² + 4 = (x + 1)(x − 2)²</b>, con la raíz 2 doble.",
      "Comprobación: la gráfica corta el eje en −1 y toca el eje en 2 sin atravesarlo."
    ]) +
    "<h5>Polinomios con las raíces dadas, y relaciones de Cardano–Vieta</h5>" +
    "<p>Al revés también se puede: un polinomio con raíces r₁, r₂, r₃ es k·(x − r₁)(x − r₂)(x − r₃). Por ejemplo, con raíces 1, 2 y −3 se obtiene (x − 1)(x − 2)(x + 3) = x³ − 7x + 6 (con k = 1). Observa que el coeficiente de x² es 0 = −(1 + 2 − 3), el de x es −7 = 1·2 + 1·(−3) + 2·(−3) y el término independiente es 6 = −(1·2·(−3)). Son las <b>relaciones de Cardano–Vieta</b>: en un polinomio de grado n, la suma de las raíces es −aₙ₋₁/aₙ y el producto es (−1)ⁿ·a₀/aₙ. En el grado 2 son las conocidas «suma = −b/a y producto = c/a» de la sección siguiente.</p>" +
    ejemplo("Descomponer un polinomio de grado 4", "Factoriza P(x) = x⁴ − 2x³ − 7x² + 8x + 12.", [
      "a₀ = 12: candidatos ±1, ±2, ±3, ±4, ±6, ±12. P(−1) = 1 + 2 − 7 − 8 + 12 = 0 ✓.",
      "Ruffini con a = −1 y coeficientes 1, −2, −7, 8, 12: bajamos 1; 1·(−1) = −1 → −2 − 1 = −3; −3·(−1) = 3 → −7 + 3 = −4; −4·(−1) = 4 → 8 + 4 = 12; 12·(−1) = −12 → 12 − 12 = 0. Cociente x³ − 3x² − 4x + 12.",
      "En el cociente: x³ − 3x² − 4x + 12 = x²(x − 3) − 4(x − 3) = (x − 3)(x² − 4) = (x − 3)(x − 2)(x + 2) (sacando factor común por grupos).",
      "<b>P(x) = (x + 1)(x − 3)(x − 2)(x + 2)</b>. Las raíces son −2, −1, 2 y 3; su suma es 2 = −(−2)/1 ✓ y su producto es 12 = a₀ ✓."
    ]) +
    ojo("«factorizar» no es «encontrar las raíces»: debe escribirse el producto de factores, y además no olvides el coeficiente principal. 2x² − 5x + 2 = 2(x − 2)(x − 1/2) = (x − 2)(2x − 1), pero no (x − 2)(x − 1/2), que es la mitad.");

  // ---------------------------------------------------------------- 5. Segundo grado
  secciones[4] =
    "<h5>De dónde sale la fórmula (completando el cuadrado)</h5>" +
    "<p>Saber demostrar la fórmula ayuda a recordarla bien. Partimos de ax² + bx + c = 0 con a ≠ 0.</p>" +
    "<ol><li>Dividimos entre a: x² + (b/a)x + c/a = 0.</li>" +
    "<li>Pasamos el término independiente: x² + (b/a)x = −c/a.</li>" +
    "<li>Para completar el cuadrado, sumamos a los dos lados (b/2a)²: x² + (b/a)x + b²/4a² = b²/4a² − c/a.</li>" +
    "<li>El primer miembro es (x + b/2a)² (cuadrado de una suma), y el segundo, con denominador común 4a², es (b² − 4ac)/4a².</li>" +
    "<li>Hacemos la raíz cuadrada de los dos lados: x + b/2a = ±√(b² − 4ac)/2a.</li>" +
    "<li>Despejamos: <b>x = (−b ± √(b² − 4ac))/2a</b>. El «±» aparece porque un número positivo tiene dos raíces cuadradas.</li></ol>" +
    "<p>Fíjate en lo que muestra el paso 5: si b² − 4ac &lt; 0 no se puede hacer la raíz y no hay solución real; si vale 0, el «±» no cambia nada y hay una sola solución. Mueve los coeficientes y comprueba cómo la gráfica y la fórmula cuentan lo mismo:</p>" +
    w("parabola") +
    "<h5>Ecuaciones incompletas: no hace falta la fórmula</h5>" +
    ejemplo("Las tres formas incompletas", "Resuelve 5x² − 20x = 0, 3x² − 27 = 0 y x² + 4 = 0.", [
      "<b>Falta c</b> (ax² + bx = 0): factor común. 5x(x − 4) = 0 → x = 0 o x = 4. Una solución es siempre 0.",
      "<b>Falta b</b> (ax² + c = 0): se despeja. 3x² = 27 → x² = 9 → x = ±3.",
      "x² + 4 = 0 → x² = −4: no hay solución real (un cuadrado nunca es negativo)."
    ]) +
    ojo("en 5x² − 20x = 0 <b>no se puede dividir entre x</b> para simplificar: perderías la solución x = 0. Siempre se saca factor común y se iguala a cero cada factor.") +
    "<h5>Las ecuaciones que no vienen en forma general</h5>" +
    "<p>Muchos enunciados traen la ecuación disfrazada. Lo primero siempre es pasar todo a un lado hasta tener ax² + bx + c = 0, quitando paréntesis y denominadores.</p>" +
    ejemplo("Desarrollar y ordenar", "Resuelve x(x + 5) = 3(x + 4).", [
      "Quitamos paréntesis: x² + 5x = 3x + 12. Pasamos todo al primer miembro: x² + 2x − 12 = 0.",
      "Δ = 4 + 48 = 52 → √52 = 2√13. x = (−2 ± 2√13)/2 = <b>−1 ± √13</b> (≈ 2,606 y −4,606)."
    ]) +
    "<h5>Suma y producto de las soluciones</h5>" +
    "<p>Si x₁ y x₂ son las soluciones de ax² + bx + c = 0, entonces ax² + bx + c = a(x − x₁)(x − x₂), y al desarrollar y comparar coeficientes se obtiene:</p>" +
    H.formula("x₁ + x₂ = " + fr("−b", "a") + "         x₁ · x₂ = " + fr("c", "a")) +
    "<p>Sirve para tres cosas: <b>(1)</b> comprobar tus soluciones sin sustituir; <b>(2)</b> factorizar: ax² + bx + c = a(x − x₁)(x − x₂); y <b>(3)</b> construir una ecuación con soluciones dadas: x² − (suma)x + (producto) = 0. Con soluciones 3 y −5: suma −2, producto −15 → x² + 2x − 15 = 0.</p>" +
    ejemplo("Discriminante con parámetro", "Halla k para que x² + kx + 9 = 0 tenga una solución doble, y para que x² − 4x + k = 0 no tenga soluciones reales.", [
      "Solución doble ⇔ Δ = 0: k² − 36 = 0 → <b>k = 6 o k = −6</b> (con k = 6 la ecuación es (x + 3)² = 0).",
      "Sin soluciones reales ⇔ Δ &lt; 0: 16 − 4k &lt; 0 → 4k &gt; 16 → <b>k &gt; 4</b>."
    ]) +
    ejemplo("Un problema geométrico", "Un rectángulo tiene perímetro 30 m y área 56 m². Calcula sus lados.", [
      "Si un lado mide x, el otro mide 15 − x (semiperímetro 15). Área: x(15 − x) = 56.",
      "15x − x² = 56 → x² − 15x + 56 = 0 → x = (15 ± √(225 − 224))/2 = (15 ± 1)/2 → x = 8 o x = 7.",
      "Las dos soluciones dan el mismo rectángulo: <b>7 m × 8 m</b> (comprobación: 2·(7 + 8) = 30 ✓ y 7·8 = 56 ✓)."
    ]) +
    "<h5>Ecuaciones bicuadradas y otros cambios de variable</h5>" +
    "<p>La bicuadrada ax⁴ + bx² + c = 0 puede tener <b>4, 3, 2, 1 o 0</b> soluciones reales: depende de cuántos valores de t = x² salgan y de que sean positivos. Con t &gt; 0 hay dos x (±√t); con t = 0, una; con t &lt; 0, ninguna. Prueba con las plantillas:</p>" +
    w("bicuadrada") +
    ejemplo("Dos soluciones de t, una descartada", "Resuelve x⁴ + x² − 6 = 0.", [
      "t = x²: t² + t − 6 = 0 → t = (−1 ± √25)/2 → t = 2 o t = −3.",
      "t = 2 → x = ±√2. t = −3 → ningún x real (x² no puede ser negativo): se descarta.",
      "<b>x = √2 y x = −√2</b> (solo dos soluciones)."
    ]) +
    ejemplo("Cambios de variable similares", "Resuelve x⁶ − 7x³ − 8 = 0 y x − 5√x + 6 = 0.", [
      "x⁶ − 7x³ − 8 = 0: ahora t = x³ → t² − 7t − 8 = 0 → t = 8 o t = −1 → x = ∛8 = 2 y x = ∛(−1) = −1. Una raíz cúbica de un negativo sí existe: <b>x = 2 y x = −1</b>.",
      "x − 5√x + 6 = 0: t = √x (t ≥ 0) → t² − 5t + 6 = 0 → t = 2 o t = 3 → x = t² = 4 o 9. Comprobación: 4 − 10 + 6 = 0 ✓ y 9 − 15 + 6 = 0 ✓. <b>x = 4 y x = 9</b>."
    ]);

  // ---------------------------------------------------------------- 6. Sistemas
  secciones[5] =
    "<h5>Cada ecuación es una recta: el sistema como corte de gráficas</h5>" +
    "<p>La ecuación lineal a x + b y = c representa una <b>recta</b> en el plano. Resolver un sistema de dos ecuaciones es buscar los puntos que están a la vez en las dos rectas. Hay tres posibilidades:</p>" +
    tabla(["Posición de las rectas", "Soluciones", "Nombre", "Cómo se nota al resolver"], [
      ["Se cortan en un punto", "exactamente una", "Compatible determinado (SCD)", "sale x = …, y = …"],
      ["Coinciden", "infinitas", "Compatible indeterminado (SCI)", "queda 0 = 0"],
      ["Son paralelas", "ninguna", "Incompatible (SI)", "queda algo imposible como 0 = 5"]
    ]) +
    w("sistema2x2") +
    "<h5>El mismo sistema con los tres métodos</h5>" +
    "<p>Resolvemos x + 2y = 7, 3x − y = 7 de tres formas distintas para ver que todas llevan a la misma solución, x = 3 e y = 2.</p>" +
    ejemplo("Sustitución", "Despeja una incógnita y sustitúyela en la otra ecuación.", [
      "De la 1.ª: x = 7 − 2y.",
      "En la 2.ª: 3(7 − 2y) − y = 7 → 21 − 6y − y = 7 → −7y = −14 → <b>y = 2</b>.",
      "x = 7 − 2·2 = <b>3</b>."
    ]) +
    ejemplo("Igualación", "Despeja la misma incógnita en las dos y iguala.", [
      "De la 1.ª: x = 7 − 2y. De la 2.ª: 3x = 7 + y → x = (7 + y)/3.",
      "Igualamos: 7 − 2y = (7 + y)/3 → 21 − 6y = 7 + y → 14 = 7y → <b>y = 2</b> y x = 7 − 4 = <b>3</b>."
    ]) +
    ejemplo("Reducción", "Multiplica para que una incógnita tenga coeficientes opuestos y suma.", [
      "Multiplicamos la 2.ª por 2: 6x − 2y = 14. La 1.ª es x + 2y = 7.",
      "Sumando: 7x = 21 → <b>x = 3</b>. Sustituyendo en la 1.ª: 3 + 2y = 7 → <b>y = 2</b>.",
      "Se elige este método cuando los coeficientes se pueden igualar con facilidad; sustitución cuando una incógnita tiene coeficiente 1."
    ]) +
    ejemplo("Un parámetro", "¿Para qué valores de k el sistema x + 2y = 4, 2x + 4y = k es compatible indeterminado? ¿Y incompatible?", [
      "Las dos ecuaciones tienen los mismos coeficientes de x e y salvo por el factor 2: la 2.ª es 2·(x + 2y) = k.",
      "Si k = 8, la 2.ª equivale a x + 2y = 4, que es la 1.ª: <b>infinitas soluciones</b> (SCI).",
      "Si k ≠ 8, la 2.ª pide x + 2y = k/2 mientras la 1.ª pide x + 2y = 4: contradicción, <b>sin solución</b> (incompatible)."
    ]) +
    "<h5>Cuando una de las ecuaciones no es lineal</h5>" +
    "<p>Se resuelve casi siempre por <b>sustitución</b>: despeja en la ecuación lineal y sustituye en la otra, que se convierte en una ecuación de segundo grado. Habrá, como mucho, dos soluciones (recta y parábola o circunferencia se cortan como mucho en dos puntos).</p>" +
    ejemplo("Suma y producto", "Resuelve x + y = 5, x·y = 6.", [
      "y = 5 − x. En la 2.ª: x(5 − x) = 6 → x² − 5x + 6 = 0 → x = 2 o x = 3.",
      "Si x = 2, y = 3. Si x = 3, y = 2. <b>Soluciones: (2, 3) y (3, 2)</b>."
    ]) +
    ejemplo("Recta y circunferencia", "Resuelve x² + y² = 25, x − y = 1.", [
      "De la lineal: x = y + 1. En la otra: (y + 1)² + y² = 25 → 2y² + 2y − 24 = 0 → y² + y − 12 = 0 → y = 3 o y = −4.",
      "y = 3 → x = 4. y = −4 → x = −3. <b>Soluciones: (4, 3) y (−3, −4)</b>.",
      "Comprobación: 16 + 9 = 25 ✓ y 9 + 16 = 25 ✓."
    ]) +
    "<h5>Tres ecuaciones con tres incógnitas: el método de Gauss</h5>" +
    "<p>La idea es la de la reducción, pero repetida con orden para obtener un sistema <b>escalonado</b> (triangular): se elimina x de la 2.ª y 3.ª ecuación, después se elimina y de la 3.ª, y se resuelve de abajo hacia arriba.</p>" +
    ejemplo("Gauss paso a paso", "Resuelve x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2.", [
      "<b>E₂ ← E₂ − 2·E₁</b>: (2x − y + z) − 2(x + y + z) = 3 − 12 → −3y − z = −9.",
      "<b>E₃ ← E₃ − E₁</b>: (x + 2y − z) − (x + y + z) = 2 − 6 → y − 2z = −4.",
      "Ahora eliminamos y de la tercera: <b>E₃ ← 3·E₃ + E₂</b>: (3y − 6z) + (−3y − z) = −12 − 9 → −7z = −21 → <b>z = 3</b>.",
      "De E₂: −3y − 3 = −9 → <b>y = 2</b>. De E₁: x + 2 + 3 = 6 → <b>x = 1</b>.",
      "Comprobación en la E₂ original: 2·1 − 2 + 3 = 3 ✓. Solución: <b>(x, y, z) = (1, 2, 3)</b>. Si en el proceso aparece 0 = 0 hay infinitas soluciones; si aparece 0 = k ≠ 0, el sistema es incompatible."
    ]);


  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "7. Fracciones algebraicas",
      html:
        "<p>Una <b>fracción algebraica</b> es un cociente de dos polinomios, como (x² − 9)/(x² + x − 6). Se manejan igual que las fracciones numéricas, con una diferencia importante: el denominador no puede valer 0, así que cada fracción lleva asociada una lista de valores <b>prohibidos</b> para x (las raíces del denominador).</p>" +
        "<h5>Simplificar: factoriza arriba y abajo</h5>" +
        "<p>Sólo se pueden tachar <b>factores</b> (cosas que multiplican), nunca sumandos. Por eso lo primero es factorizar numerador y denominador con lo que sabes de las secciones 2–4.</p>" +
        ejemplo("Simplificar", "Simplifica (x² − 9)/(x² + x − 6) e indica los valores prohibidos.", [
          "Numerador: x² − 9 = (x − 3)(x + 3) (diferencia de cuadrados).",
          "Denominador: x² + x − 6 = 0 → x = (−1 ± 5)/2 = 2 o −3 → x² + x − 6 = (x − 2)(x + 3).",
          "La fracción es (x − 3)(x + 3)/[(x − 2)(x + 3)]. Tachamos el factor común (x + 3): <b>(x − 3)/(x − 2)</b>.",
          "Valores prohibidos de la fracción original: los que anulan el denominador, <b>x = 2 y x = −3</b>. Ojo: aunque (x + 3) desaparezca al simplificar, x = −3 sigue estando prohibido en la fracción original."
        ]) +
        w("fracalg") +
        "<h5>Operar con fracciones algebraicas</h5>" +
        "<ul><li><b>Producto</b>: se multiplican numeradores y denominadores (conviene simplificar antes).</li>" +
        "<li><b>Cociente</b>: se multiplica la primera por la inversa de la segunda.</li>" +
        "<li><b>Suma y resta</b>: hace falta un denominador común. Lo mejor es factorizar los denominadores y tomar el <b>mínimo común múltiplo</b>: cada factor, con su mayor exponente.</li></ul>" +
        ejemplo("Suma con denominadores distintos", "Calcula 1/(x − 1) + 2/(x + 1).", [
          "Los denominadores son (x − 1) y (x + 1): el mcm es (x − 1)(x + 1) = x² − 1.",
          "1/(x − 1) = (x + 1)/[(x − 1)(x + 1)] y 2/(x + 1) = 2(x − 1)/[(x − 1)(x + 1)].",
          "Sumamos numeradores: (x + 1) + 2(x − 1) = 3x − 1. Resultado: <b>(3x − 1)/(x² − 1)</b>, con x ≠ ±1."
        ]) +
        ejemplo("Resta con un denominador que se puede factorizar", "Calcula x/(x − 2) − 2/(x² − 2x).", [
          "x² − 2x = x(x − 2): el mcm de (x − 2) y x(x − 2) es x(x − 2).",
          "x/(x − 2) = x·x/[x(x − 2)] = x²/[x(x − 2)]. El segundo sumando ya está bien.",
          "Restamos: (x² − 2)/[x(x − 2)]. <b>Resultado: (x² − 2)/(x(x − 2))</b>, con x ≠ 0, 2."
        ]) +
        ejemplo("Producto y cociente", "Calcula (x² − 4)/(x + 1) · (x + 1)/(x − 2) y después x/(x + 2) ÷ (x − 1)/(x + 2)².", [
          "Producto: (x − 2)(x + 2)/(x + 1) · (x + 1)/(x − 2) = x + 2 (tachamos x + 1 y x − 2), con x ≠ −1 y x ≠ 2.",
          "Cociente: x/(x + 2) · (x + 2)²/(x − 1) = x(x + 2)/(x − 1), con x ≠ −2 y x ≠ 1."
        ]) +
        ojo("(x + 3)/x <b>no</b> se simplifica a 3, ni (x² + 1)/(x² − 1) a «−1». Sólo se tachan factores. Compruébalo con x = 1: (1 + 3)/1 = 4, que no es 3.")
    },
    {
      h: "8. Ecuaciones racionales e irracionales",
      html:
        "<p>Una ecuación <b>racional</b> tiene la incógnita en un denominador; una <b>irracional</b>, bajo una raíz. En las dos, el método de resolución puede <b>inventar</b> soluciones que no son de la ecuación original. Por eso la comprobación forma parte de la solución, no es un adorno.</p>" +
        "<h5>Racionales: multiplica por el mcm de los denominadores</h5>" +
        "<ol><li>Factoriza los denominadores y busca el mcm (indica los valores que lo anulan, que están prohibidos).</li><li>Multiplica <i>todos</i> los términos por el mcm: los denominadores desaparecen.</li><li>Resuelve la ecuación polinómica resultante.</li><li>Descarta las soluciones prohibidas y comprueba las demás.</li></ol>" +
        ejemplo("Sin soluciones falsas", "Resuelve 1/x + 1/(x + 2) = 3/4.", [
          "Prohibidos: x = 0 y x = −2. El mcm de x, x + 2 y 4 es 4x(x + 2).",
          "Multiplicamos todo: 4(x + 2) + 4x = 3x(x + 2) → 8x + 8 = 3x² + 6x → 3x² − 2x − 8 = 0.",
          "Δ = 4 + 96 = 100 → x = (2 ± 10)/6 → <b>x = 2 o x = −4/3</b>. Ninguno es 0 ni −2: las dos valen.",
          "Comprobación con x = 2: 1/2 + 1/4 = 3/4 ✓."
        ]) +
        ejemplo("Con una solución falsa", "Resuelve x/(x − 1) − 2/(x + 1) = 2/(x² − 1).", [
          "Prohibidos: x = 1 y x = −1 (porque x² − 1 = (x − 1)(x + 1)). El mcm es x² − 1.",
          "Multiplicamos: x(x + 1) − 2(x − 1) = 2 → x² + x − 2x + 2 = 2 → x² − x = 0 → x(x − 1) = 0.",
          "Salen x = 0 y x = 1. Pero <b>x = 1 está prohibido</b> (anula un denominador): se descarta.",
          "<b>Solución: x = 0</b>. Comprobación: 0/(−1) − 2/1 = −2 y 2/(−1) = −2 ✓."
        ]) +
        "<h5>Irracionales: aísla la raíz, eleva al cuadrado y comprueba</h5>" +
        "<ol><li>Deja una raíz sola en un miembro.</li><li>Eleva al cuadrado los <b>dos miembros</b> (si el otro miembro es una suma, usa la identidad notable).</li><li>Si queda otra raíz, repite desde el paso 1.</li><li>Resuelve y <b>comprueba</b> las soluciones en la ecuación original: al elevar al cuadrado se pueden colar soluciones que hacen la raíz «negativa».</li></ol>" +
        ejemplo("Una raíz", "Resuelve √(x + 6) = x.", [
          "Elevamos al cuadrado: x + 6 = x² → x² − x − 6 = 0 → x = 3 o x = −2.",
          "Comprobamos: x = 3 → √9 = 3 ✓. x = −2 → √4 = 2, pero el segundo miembro vale −2 ≠ 2 ✗.",
          "<b>Solución: x = 3</b>. La falsa x = −2 aparece porque (−2)² = 2², es decir, elevar al cuadrado no distingue el signo."
        ]) +
        ejemplo("Dos raíces", "Resuelve √(x + 7) − √(x − 2) = 1.", [
          "Aislamos una raíz: √(x + 7) = 1 + √(x − 2).",
          "Elevamos al cuadrado (el segundo miembro es una suma, ¡desarrolla con la identidad!): x + 7 = 1 + 2√(x − 2) + (x − 2) → 8 = 2√(x − 2) → √(x − 2) = 4.",
          "Elevamos otra vez: x − 2 = 16 → <b>x = 18</b>.",
          "Comprobación: √25 − √16 = 5 − 4 = 1 ✓."
        ]) +
        "<p>Mira la ecuación como dos funciones: las soluciones verdaderas son los cortes de las dos gráficas. Una solución falsa del álgebra simplemente no aparece en el dibujo. Prueba con √(x+6) = x, y con las demás:</p>" +
        w("igualar") +
        ojo("después de elevar al cuadrado el signo se «pierde», así que es obligatorio comprobar. También en las racionales: una solución que anula un denominador original <b>nunca</b> vale.")
    },
    {
      h: "9. Ecuaciones exponenciales y logarítmicas",
      html:
        "<h5>Lo imprescindible sobre logaritmos</h5>" +
        "<p>El logaritmo en base b de un número N es el exponente al que hay que elevar b para obtener N:</p>" +
        H.formula("log<sub>b</sub> N = y  ⇔  bʸ = N     (b &gt; 0, b ≠ 1, N &gt; 0)") +
        "<p>Ejemplos: log₂ 8 = 3 (porque 2³ = 8), log₁₀ 0,001 = −3, log₃ 81 = 4, log₂ 1 = 0 y log_b b = 1. Con la base 10 se escribe log y con la base e ≈ 2,718 se escribe ln. <b>El logaritmo sólo existe para números positivos</b>: eso es la fuente de las soluciones falsas.</p>" +
        tabla(["Propiedad", "Fórmula", "Ejemplo"], [
          ["Producto", "log(A·B) = log A + log B", "log 6 = log 2 + log 3"],
          ["Cociente", "log(A/B) = log A − log B", "log 5 = log 10 − log 2"],
          ["Potencia", "log(Aᵏ) = k·log A", "log 8 = 3 log 2"],
          ["Cambio de base", "log_b N = log N / log b", "log₂ 5 = log 5 / log 2 ≈ 2,3219"],
          ["Inversas", "b^(log_b N) = N  y  log_b(bˣ) = x", "ln(e²) = 2"]
        ]) +
        w("logaritmos") +
        "<h5>Exponenciales: tres técnicas</h5>" +
        ejemplo("Igualar bases", "Resuelve 3ˣ⁻¹ = 27.", [
          "Escribimos 27 = 3³. Como la función exponencial es inyectiva, los exponentes tienen que coincidir: x − 1 = 3 → <b>x = 4</b>."
        ]) +
        ejemplo("Sacar factor común", "Resuelve 2ˣ⁺¹ + 2ˣ = 12.", [
          "2ˣ⁺¹ = 2·2ˣ. Sacamos factor común 2ˣ: 2ˣ(2 + 1) = 12 → 2ˣ = 4 = 2² → <b>x = 2</b>."
        ]) +
        ejemplo("Cambio de variable", "Resuelve 4ˣ − 3·2ˣ − 4 = 0.", [
          "4ˣ = (2²)ˣ = (2ˣ)². Llamamos t = 2ˣ (siempre t &gt; 0): t² − 3t − 4 = 0 → t = 4 o t = −1.",
          "t = −1 no vale (2ˣ nunca es negativo). t = 4 → 2ˣ = 4 → <b>x = 2</b>."
        ]) +
        ejemplo("Cuando no se pueden igualar bases", "Resuelve 5ˣ = 7.", [
          "Tomamos logaritmos: x·log 5 = log 7 → x = log 7 / log 5 = 0,8451/0,6990 ≈ <b>1,209</b>.",
          "Comprobación: 5^1,209 ≈ 7 ✓."
        ]) +
        "<h5>Logarítmicas: reduce a un solo logaritmo y comprueba el dominio</h5>" +
        ejemplo("Suma de logaritmos", "Resuelve log₂(x + 3) + log₂(x − 3) = 4.", [
          "Dominio: x + 3 &gt; 0 y x − 3 &gt; 0, es decir, x &gt; 3.",
          "log₂[(x + 3)(x − 3)] = 4 → x² − 9 = 2⁴ = 16 → x² = 25 → x = ±5.",
          "x = −5 no está en el dominio (daría logaritmos de números negativos). <b>Solución: x = 5</b>. Comprobación: log₂ 8 + log₂ 2 = 3 + 1 = 4 ✓."
        ]) +
        ejemplo("Igualando logaritmos", "Resuelve 2·log x = log(x + 6).", [
          "2·log x = log x² (propiedad de la potencia). La ecuación es log x² = log(x + 6) → x² = x + 6 → x = 3 o x = −2.",
          "x = −2 no está en el dominio de log x. <b>Solución: x = 3</b>."
        ]) +
        ejemplo("Definición", "Resuelve log₃(2x − 1) = 2.", [
          "Por definición, 2x − 1 = 3² = 9 → 2x = 10 → <b>x = 5</b>. Dominio: 2·5 − 1 = 9 &gt; 0 ✓."
        ]) +
        ojo("log(A + B) <b>no</b> es log A + log B; log(A·B) sí lo es. Y al resolver una ecuación logarítmica, calcula siempre el dominio antes (o comprueba al final): las soluciones que anulan o vuelven negativos los argumentos se descartan.")
    },
    {
      h: "10. Inecuaciones",
      html:
        "<p>Una inecuación es como una ecuación pero con &lt;, &gt;, ≤ o ≥. Su solución no es un número sino un <b>intervalo</b> (o unión de intervalos), y se escribe con la notación del Tema 1.</p>" +
        "<h5>Primer grado: las mismas reglas que las ecuaciones, con una excepción</h5>" +
        "<p>Puedes sumar o restar lo mismo a los dos lados, y multiplicar o dividir por un número <b>positivo</b>. Pero si multiplicas o divides por un número <b>negativo</b>, la desigualdad se <b>invierte</b>: −2x ≥ −6 → x ≤ 3.</p>" +
        ejemplo("Primer grado", "Resuelve 3x − 7 &lt; 2x + 5 y −2x + 6 ≥ 0.", [
          "3x − 7 &lt; 2x + 5 → 3x − 2x &lt; 5 + 7 → <b>x &lt; 12</b> → (−∞, 12).",
          "−2x + 6 ≥ 0 → −2x ≥ −6 → (dividimos entre −2 e invertimos) <b>x ≤ 3</b> → (−∞, 3]."
        ]) +
        "<h5>Segundo grado, polinómicas y racionales: la tabla de signos</h5>" +
        "<p>Para cualquier inecuación P(x) &gt; 0 (o &lt;, ≥, ≤) el método es el mismo, y funciona también con fracciones:</p>" +
        "<ol><li>Pasa todo a un miembro, para que el otro sea 0.</li><li>Factoriza, y calcula los <b>ceros del numerador</b> y los <b>ceros del denominador</b>.</li><li>Dibuja una recta con esos valores: quedan varios intervalos. En cada uno, el signo de la expresión no cambia, así que <b>basta probar un valor</b> de cada intervalo.</li><li>Elige los intervalos con el signo pedido.</li><li>Decide los extremos: los ceros del numerador entran si la desigualdad es ≤ o ≥; los del denominador <b>nunca</b> entran.</li></ol>" +
        ejemplo("Segundo grado", "Resuelve x² − 3x − 4 ≥ 0.", [
          "x² − 3x − 4 = 0 → x = 4 o x = −1, así que x² − 3x − 4 = (x − 4)(x + 1).",
          "Intervalos: (−∞, −1), (−1, 4), (4, +∞). Probamos x = −2: (−6)(−1) = + · x = 0: (−4)(1) = − · x = 5: (1)(6) = +.",
          "Queremos ≥ 0, es decir, signo + o cero: <b>(−∞, −1] ∪ [4, +∞)</b>. Es lo que la gráfica de la parábola muestra: está por encima del eje X fuera de las raíces."
        ]) +
        ejemplo("Racional", "Resuelve (x − 1)/(x + 2) &gt; 0.", [
          "Cero del numerador: x = 1. Cero del denominador: x = −2 (prohibido).",
          "Intervalos: (−∞, −2): x = −3 → (−4)/(−1) = + · (−2, 1): x = 0 → (−1)/2 = − · (1, +∞): x = 2 → 1/4 = +.",
          "&gt; 0 pide signo +: <b>(−∞, −2) ∪ (1, +∞)</b>. El 1 no entra (la desigualdad es estricta) y el −2 tampoco (es un hueco)."
        ]) +
        ejemplo("Racional con ≤", "Resuelve (x² − 4)/(x² − 1) ≤ 0.", [
          "Numerador: x² − 4 = (x − 2)(x + 2), ceros ±2. Denominador: x² − 1 = (x − 1)(x + 1), ceros ±1 (prohibidos).",
          "Valores críticos ordenados: −2, −1, 1, 2. Signos en los cinco intervalos: (−∞, −2) +, (−2, −1) −, (−1, 1) +, (1, 2) −, (2, +∞) +.",
          "≤ 0 pide signo − o cero: <b>[−2, −1) ∪ (1, 2]</b>. Los extremos ±2 son ceros del numerador y entran; ±1 son huecos y no."
        ]) +
        w("signos") +
        "<h5>Sistemas de inecuaciones</h5>" +
        "<p>Se resuelve cada inecuación por separado y se hace la <b>intersección</b> de las soluciones (los x que cumplen todas a la vez).</p>" +
        ejemplo("Dos condiciones", "Resuelve el sistema 2x − 1 &gt; 3 y x² &lt; 25.", [
          "2x − 1 &gt; 3 → 2x &gt; 4 → x &gt; 2 → (2, +∞).",
          "x² &lt; 25 → (x − 5)(x + 5) &lt; 0 → −5 &lt; x &lt; 5 → (−5, 5).",
          "Intersección: <b>(2, 5)</b>."
        ]) +
        ojo("no elimines un factor que contiene la incógnita «dividiendo» en una inecuación: no sabes si es positivo o negativo y podrías invertir mal el sentido (o perder soluciones). Pasa todo al mismo lado y usa la tabla de signos.")
    },
    {
      h: "11. Problemas: de la frase a la ecuación",
      html:
        "<p>Casi todos los problemas de álgebra se resuelven con el mismo protocolo. Lo que cuesta no es resolver, sino <b>plantear</b>:</p>" +
        "<ol><li><b>Lee y subraya</b> qué se pregunta. Esa es la incógnita (o las incógnitas).</li><li><b>Pon nombre</b> a la incógnita («sea x = …») y expresa lo demás con ella.</li><li><b>Busca la igualdad</b>: ¿dos cosas que valen lo mismo? ¿Un total? ¿Un perímetro, una velocidad por un tiempo?</li><li><b>Resuelve</b>.</li><li><b>Comprueba en el enunciado</b>, no en tu ecuación (así detectas errores de planteamiento) y <b>contesta con una frase y unidades</b>.</li></ol>" +
        ejemplo("Números consecutivos", "Tres números impares consecutivos suman 111. ¿Cuáles son?", [
          "Sea x el menor; los siguientes impares son x + 2 y x + 4.",
          "x + (x + 2) + (x + 4) = 111 → 3x + 6 = 111 → x = 35.",
          "Los números son <b>35, 37 y 39</b> (35 + 37 + 39 = 111 ✓)."
        ]) +
        ejemplo("Edades", "Una madre tiene el triple de edad que su hija. Dentro de 10 años tendrá el doble. ¿Qué edades tienen ahora?", [
          "Hija: x. Madre: 3x. Dentro de 10 años: x + 10 y 3x + 10.",
          "3x + 10 = 2(x + 10) → 3x + 10 = 2x + 20 → x = 10.",
          "<b>La hija tiene 10 años y la madre 30</b>. Dentro de 10 años: 20 y 40 ✓."
        ]) +
        ejemplo("Mezclas (sistema)", "Se mezclan dos aceites, uno de 4 €/L y otro de 6 €/L, para obtener 20 L de mezcla a 5,20 €/L. ¿Cuántos litros hay de cada uno?", [
          "x = litros del barato, y = litros del caro. Volumen: x + y = 20. Dinero: 4x + 6y = 5,2·20 = 104.",
          "Con y = 20 − x: 4x + 6(20 − x) = 104 → 120 − 2x = 104 → x = 8.",
          "<b>8 L de 4 €/L y 12 L de 6 €/L</b> (8·4 + 12·6 = 32 + 72 = 104 ✓)."
        ]) +
        ejemplo("Móviles: alcance", "Un coche sale a 60 km/h. Dos horas después sale tras él otro a 90 km/h. ¿Cuándo lo alcanza y a qué distancia?", [
          "Sea t las horas que viaja el segundo. El primero lleva t + 2 horas. Se encuentran cuando ambos han recorrido lo mismo: 60(t + 2) = 90t.",
          "120 = 30t → t = 4. Lo alcanza <b>4 horas después de salir</b> y a 90·4 = <b>360 km</b> (el primero: 60·6 = 360 ✓)."
        ]) +
        ejemplo("Trabajo en común", "Un grifo llena un depósito en 6 h y otro en 3 h. ¿Cuánto tardan si se abren los dos a la vez?", [
          "Cada grifo llena una fracción del depósito por hora: 1/6 y 1/3.",
          "Juntos: 1/6 + 1/3 = 1/2 del depósito por hora → lo llenan en <b>2 horas</b>."
        ]) +
        ejemplo("Trabajo con desagüe", "Un grifo llena un depósito en 4 h, pero hay un desagüe que lo vaciaría en 12 h. Si se abren los dos a la vez, ¿cuánto tarda en llenarse?", [
          "El grifo llena 1/4 del depósito por hora y el desagüe vacía 1/12 por hora (resta, no suma).",
          "Cada hora se gana 1/4 − 1/12 = 3/12 − 1/12 = 1/6 del depósito → tarda <b>6 horas</b>."
        ]) +
        ejemplo("Dibujo geométrico", "El largo de un rectángulo mide 3 m más que el ancho y su área es 40 m². Halla las dimensiones.", [
          "Ancho x, largo x + 3. Área: x(x + 3) = 40 → x² + 3x − 40 = 0 → x = (−3 ± 13)/2 → x = 5 o x = −8.",
          "Una longitud no puede ser negativa: <b>5 m de ancho y 8 m de largo</b> (5·8 = 40 ✓)."
        ]) +
        ejemplo("Dos incógnitas", "En un concierto se vendieron 120 entradas, de adulto a 8 € y de niño a 5 €, y se recaudaron 810 €. ¿Cuántas de cada tipo?", [
          "a = adultos, n = niños. a + n = 120 y 8a + 5n = 810. Sustituimos n = 120 − a: 8a + 600 − 5a = 810 → 3a = 210 → a = 70.",
          "<b>70 entradas de adulto y 50 de niño</b> (8·70 + 5·50 = 560 + 250 = 810 ✓)."
        ])
    },
    {
      h: "12. ¿Qué método uso? Mapa de decisiones",
      html:
        "<p>En un examen la dificultad suele ser decidir <i>qué herramienta</i> tocar, no hacer la cuenta. Practica ese reflejo: relaciona cada problema con el primer paso que harías.</p>" +
        w("emparejar", "metodos") +
        "<p>Y ahora, clasifica estas ecuaciones por su tipo para ver cuáles necesitan una comprobación final:</p>" +
        w("clasificar", "tipos")
    },
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "14. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas para memorizar las fórmulas y los criterios del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe (x + 5)² = x² + 25. ¿Qué falla?",
          op: ["Nada, es correcto", "Falta el doble producto: (x + 5)² = x² + 10x + 25", "Debía ser x² − 25", "Debía ser x² + 5x + 25"], ok: 1,
          porque: "(a + b)² = a² + 2ab + b². Con a = x y b = 5 el término central es 2·x·5 = 10x. Pruébalo con x = 1: (1 + 5)² = 36, mientras que 1 + 25 = 26." },
        { q: "Para dividir x³ + 2x² − 5x − 6 entre (x + 3) por Ruffini, un alumno usa a = 3. ¿Qué falla?",
          op: ["Nada", "Debe usar a = −3, porque x + 3 = x − (−3)", "Debe usar a = 6", "Ruffini no se puede aplicar a x + 3"], ok: 1,
          porque: "Ruffini divide entre x − a. El divisor x + 3 se anula en x = −3, así que a = −3. Con a = 3 se estaría dividiendo entre x − 3." },
        { q: "En 5x² = 20x, un alumno divide entre x y obtiene 5x = 20, es decir, x = 4. ¿Qué ha perdido?",
          op: ["Nada: 4 es la única solución", "La solución x = 0, al dividir entre una incógnita que puede valer 0", "La solución x = −4", "El signo del resultado"], ok: 1,
          porque: "Correcto es pasar todo a un lado y sacar factor común: 5x² − 20x = 5x(x − 4) = 0 → x = 0 o x = 4. Dividir entre x supone x ≠ 0 y elimina una solución." },
        { q: "Resolviendo √(x + 6) = x, un alumno obtiene x = 3 y x = −2 y da las dos como solución. ¿Qué falla?",
          op: ["Nada", "No ha comprobado: x = −2 da √4 = 2, que no es −2. Es una solución falsa", "Debía obtener solo x = −2", "Debía obtener x = 6"], ok: 1,
          porque: "Elevar al cuadrado no distingue el signo, por lo que se pueden colar soluciones falsas. Hay que sustituir en la ecuación original: √9 = 3 ✓ pero √4 = 2 ≠ −2." },
        { q: "Un alumno resuelve −2x &gt; 6 y escribe x &gt; −3. ¿Qué falla?",
          op: ["Nada", "Al dividir entre un número negativo hay que invertir la desigualdad: x &lt; −3", "Debía salir x &gt; 3", "Debía salir x &lt; 3"], ok: 1,
          porque: "−2x &gt; 6 → x &lt; 6/(−2) = −3. Compruébalo con x = −4: −2·(−4) = 8 &gt; 6 ✓ mientras que x = 0 (que cumple x &gt; −3) da 0 &gt; 6 falso." },
        { q: "Un alumno escribe log(x + 3) = log x + log 3. ¿Qué falla?",
          op: ["Nada, es la propiedad de la suma", "log(A·B) = log A + log B, pero log(A + B) no se descompone así", "Debía ser log x · log 3", "Debía ser log(x − 3)"], ok: 1,
          porque: "La propiedad es sobre productos: log(3x) = log 3 + log x. Para una suma dentro del logaritmo no hay ninguna propiedad. Con x = 7: log 10 = 1, pero log 7 + log 3 = log 21 ≈ 1,32." },
        { q: "Un alumno «simplifica» (x² + 1)/(x² − 1) = −1 tachando los x² y los 1. ¿Qué falla?",
          op: ["Nada", "Solo se tachan factores, no sumandos: esa fracción no se puede simplificar", "Debía salir 1", "Debía salir 0"], ok: 1,
          porque: "En x² + 1 el x² y el 1 están sumando, no multiplicando. Con x = 3: (9 + 1)/(9 − 1) = 10/8, no −1." },
        { q: "Un alumno resuelve x² − 4x + 5 = 0: Δ = 16 − 20 = −4 y escribe x = (4 ± √−4)/2 = 2 ± 2. ¿Qué falla?",
          op: ["Nada", "Con Δ &lt; 0 no existe √Δ entre los reales: no hay solución real", "Δ está mal calculado", "Las soluciones son 2 y 0"], ok: 1,
          porque: "No existe √(−4) como número real. La parábola y = x² − 4x + 5 tiene su vértice en (2, 1), por encima del eje X, y nunca vale 0." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El resto de dividir x³ − 2x + 1 entre (x − 1) es…",
          op: ["0", "1", "−1", "2"], ok: 0,
          porque: "Teorema del resto: P(1) = 1 − 2 + 1 = 0. Por eso x − 1 es factor de P." },
        { q: "¿Cuál es la factorización de x³ − 2x² − 5x + 6?",
          op: ["(x − 1)(x − 3)(x + 2)", "(x + 1)(x + 3)(x − 2)", "(x − 1)(x + 3)(x + 2)", "(x − 6)(x + 1)"], ok: 0,
          porque: "Las raíces son 1, 3 y −2 (P(1) = 0, P(3) = 27 − 18 − 15 + 6 = 0, P(−2) = −8 − 8 + 10 + 6 = 0)." },
        { q: "El discriminante de x² − 4x + 4 = 0 vale…",
          op: ["0 (una solución doble)", "8", "−16", "16"], ok: 0,
          porque: "Δ = 16 − 16 = 0: la ecuación tiene la solución doble x = 2, pues x² − 4x + 4 = (x − 2)²." },
        { q: "¿Cuántas soluciones reales tiene x⁴ + 4 = 0?",
          op: ["Ninguna", "Dos", "Cuatro", "Una"], ok: 0,
          porque: "x⁴ = −4 es imposible: una potencia par de un número real nunca es negativa." },
        { q: "El sistema x + 2y = 4, 2x + 4y = 9 es…",
          op: ["Incompatible", "Compatible determinado", "Compatible indeterminado", "Imposible de clasificar"], ok: 0,
          porque: "La 2.ª ecuación equivale a x + 2y = 4,5, que contradice a la 1.ª: las rectas son paralelas y no se cortan." },
        { q: "Para resolver 4ˣ − 3·2ˣ − 4 = 0 conviene el cambio…",
          op: ["t = 2ˣ", "t = x²", "t = 4ˣ + 2ˣ", "No hay cambio posible"], ok: 0,
          porque: "4ˣ = (2ˣ)², así que con t = 2ˣ queda t² − 3t − 4 = 0, de la que solo vale la solución t &gt; 0." },
        { q: "log₂ 32 vale…",
          op: ["5", "16", "6", "4"], ok: 0,
          porque: "2⁵ = 32, así que el exponente buscado es 5." },
        { q: "La solución de (x − 1)/(x + 2) &gt; 0 es…",
          op: ["(−∞, −2) ∪ (1, +∞)", "(−2, 1)", "(1, +∞)", "[−2, 1]"], ok: 0,
          porque: "Los ceros son 1 (numerador) y −2 (denominador). El signo es + en (−∞, −2), − en (−2, 1) y + en (1, +∞)." },
        { q: "Si las soluciones de una ecuación de segundo grado son 3 y −5, la ecuación (con a = 1) es…",
          op: ["x² + 2x − 15 = 0", "x² − 2x − 15 = 0", "x² + 2x + 15 = 0", "x² − 8x − 15 = 0"], ok: 0,
          porque: "x² − (suma)x + (producto): suma = −2, producto = −15 → x² + 2x − 15 = 0." },
        { q: "¿Qué valor de k hace que x³ + kx² − 4x + 4 sea divisible por (x − 2)?",
          op: ["k = −1", "k = 1", "k = 2", "k = −2"], ok: 0,
          porque: "P(2) = 8 + 4k − 8 + 4 = 4k + 4 = 0 → k = −1." }
      ]
    },
    tj1: {
      titulo: "Fórmulas y criterios de álgebra",
      cartas: [
        { a: "Teorema del resto", b: "El resto de dividir P(x) entre (x − a) es P(a)." },
        { a: "Teorema del factor", b: "(x − a) es factor de P(x) ⇔ P(a) = 0 ⇔ a es una raíz de P." },
        { a: "Raíces racionales posibles de un polinomio de coeficientes enteros", b: "Fracciones p/q con p divisor del término independiente a₀ y q divisor del coeficiente principal aₙ (con signo + y −)." },
        { a: "Prueba de la división de polinomios", b: "P = Q·C + R, con grado de R &lt; grado de Q." },
        { a: "Fórmula de la ecuación de 2.º grado", b: "x = (−b ± √(b² − 4ac)) / 2a" },
        { a: "Discriminante y número de soluciones", b: "Δ = b² − 4ac. Δ &gt; 0: dos soluciones. Δ = 0: una doble. Δ &lt; 0: ninguna real." },
        { a: "Suma y producto de las soluciones de ax² + bx + c = 0", b: "x₁ + x₂ = −b/a y x₁·x₂ = c/a. La ecuación con soluciones dadas es x² − (suma)x + (producto) = 0." },
        { a: "Cómo se resuelve ax⁴ + bx² + c = 0", b: "Cambio t = x²: at² + bt + c = 0. Cada t &gt; 0 da x = ±√t; t = 0 da x = 0; t &lt; 0 no da solución." },
        { a: "Las tres clases de sistemas lineales", b: "Compatible determinado (una solución, rectas que se cortan), compatible indeterminado (infinitas, rectas coincidentes) e incompatible (ninguna, rectas paralelas)." },
        { a: "Cómo se simplifica una fracción algebraica", b: "Factorizando numerador y denominador y tachando los factores comunes. Los valores que anulan el denominador original siguen prohibidos." },
        { a: "Ecuación irracional: protocolo", b: "Aislar la raíz → elevar al cuadrado los dos miembros → resolver → comprobar todas las soluciones en la ecuación original." },
        { a: "Propiedades de los logaritmos", b: "log(AB) = log A + log B · log(A/B) = log A − log B · log(Aᵏ) = k·log A · log_b N = log N / log b" },
        { a: "Dominio de log_b(f(x))", b: "f(x) &gt; 0. Las soluciones que hagan f(x) ≤ 0 se descartan." },
        { a: "Pasos para resolver una inecuación de grado mayor que 1", b: "Pasar todo a un lado → ceros del numerador y del denominador → recta con intervalos → signo de un valor de prueba en cada uno → elegir y decidir extremos (los ceros del denominador nunca entran)." },
        { a: "¿Cuándo se invierte una desigualdad?", b: "Al multiplicar o dividir los dos miembros por un número negativo: −2x &gt; 6 ⇒ x &lt; −3." }
      ]
    },
    metodos: {
      titulo: "¿Con qué empiezo?",
      consigna: "Une cada problema con el primer paso que darías.",
      pares: [
        ["x³ − 7x + 6 = 0 (busca raíces enteras)", "Probar con Ruffini los divisores de 6"],
        ["x⁴ − 10x² + 9 = 0", "Cambio t = x² (bicuadrada)"],
        ["√(x + 6) = x", "Aislar la raíz, elevar al cuadrado y comprobar"],
        ["1/x + 1/(x + 2) = 3/4", "Multiplicar por el mcm y descartar valores prohibidos"],
        ["4ˣ − 3·2ˣ − 4 = 0", "Cambio t = 2ˣ"],
        ["log(x + 3) + log(x − 3) = 1", "Juntar en un solo logaritmo y comprobar el dominio"],
        ["(x − 1)/(x + 2) &gt; 0", "Tabla de signos"],
        ["5x² − 20x = 0", "Sacar factor común (no dividir entre x)"],
        ["x + y = 5 y x·y = 6", "Despejar en la lineal y sustituir"]
      ]
    },
    tipos: {
      titulo: "¿Hay que comprobar?",
      consigna: "Toca una ecuación y después el grupo al que pertenece según la comprobación que exige.",
      categorias: ["Polinómica o exponencial sencilla: no suele haber soluciones falsas", "Con raíces o denominadores: comprobar siempre", "Con logaritmos: comprobar el dominio"],
      items: [
        { t: "x² − 5x + 6 = 0", c: 0 }, { t: "x⁴ − 5x² + 4 = 0", c: 0 }, { t: "2ˣ⁺¹ = 16", c: 0 }, { t: "5x³ − 10x² = 0", c: 0 },
        { t: "√(2x + 1) = x − 1", c: 1 }, { t: "3/(x − 1) = 2/(x + 1)", c: 1 }, { t: "x/(x − 3) = 2", c: 1 }, { t: "√x + 3 = 8", c: 1 },
        { t: "ln x + ln(x − 1) = ln 6", c: 2 }, { t: "log₂(x − 5) = 3", c: 2 }, { t: "2·log x = log(x + 6)", c: 2 }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "e1", nivel: 1,
      enunciado: "Calcula el valor numérico de P(x) = 3x⁴ − 2x + 5 para x = −1.",
      check: { tipo: "num", etiqueta: "P(−1) =", valor: 10 },
      pistas: ["Sustituye x por −1 con paréntesis: (−1)⁴ = 1."],
      pasos: ["P(−1) = 3·(−1)⁴ − 2·(−1) + 5 = 3·1 + 2 + 5 = 10."],
      resultado: "P(−1) = 10",
      ojo: "(−1)⁴ = +1; si escribes −1⁴ te sale −1." },
    { id: "e2", nivel: 1,
      enunciado: "Dados P(x) = 2x² − 3x + 1 y Q(x) = x² + 5x − 4, calcula P(x) − Q(x). Indica sus tres coeficientes.",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 1 }, { tipo: "num", etiqueta: "coef. de x =", valor: -8 }, { tipo: "num", etiqueta: "término independiente =", valor: 5 }],
      pistas: ["Al restar, cambia el signo de todos los términos de Q."],
      pasos: ["P − Q = (2x² − 3x + 1) − (x² + 5x − 4) = 2x² − 3x + 1 − x² − 5x + 4.", "x²: 2 − 1 = 1 · x: −3 − 5 = −8 · independiente: 1 + 4 = 5.", "P − Q = x² − 8x + 5."],
      resultado: "x² − 8x + 5" },
    { id: "e3", nivel: 1,
      enunciado: "Desarrolla (x + 4)² y escribe los coeficientes de x y del término independiente.",
      check: [{ tipo: "num", etiqueta: "coef. de x =", valor: 8 }, { tipo: "num", etiqueta: "término independiente =", valor: 16 }],
      pistas: ["(a + b)² = a² + 2ab + b²."],
      pasos: ["(x + 4)² = x² + 2·x·4 + 4² = x² + 8x + 16."],
      resultado: "x² + 8x + 16" },
    { id: "e4", nivel: 1,
      enunciado: "¿Cuál es la factorización de x² − 49?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["(x − 7)(x + 7)", "(x − 7)²", "(x + 7)²", "No se puede factorizar"], ok: 0 },
      pistas: ["Es una diferencia de cuadrados: a² − b² = (a + b)(a − b)."],
      pasos: ["x² − 49 = x² − 7² = (x + 7)(x − 7)."],
      resultado: "(x − 7)(x + 7)" },
    { id: "e5", nivel: 1,
      enunciado: "Divide x³ − 4x² + x + 6 entre (x − 2) con la regla de Ruffini. ¿Cuánto vale el resto?",
      check: { tipo: "num", etiqueta: "Resto =", valor: 0 },
      pistas: ["Coeficientes 1, −4, 1, 6 y a = 2.", "También vale el teorema del resto: P(2)."],
      pasos: ["Ruffini con a = 2: bajar 1 · 1·2 = 2 → −4 + 2 = −2 · −2·2 = −4 → 1 − 4 = −3 · −3·2 = −6 → 6 − 6 = 0.", "Cociente x² − 2x − 3, resto 0. Con el teorema del resto: P(2) = 8 − 16 + 2 + 6 = 0 ✓."],
      resultado: "Resto 0 (cociente x² − 2x − 3)" },
    { id: "e6", nivel: 1,
      enunciado: "Resuelve la ecuación x² − 5x + 6 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [2, 3], ph: "dos valores separados por comas" },
      pistas: ["Δ = 25 − 24 = 1.", "O bien busca dos números que sumen 5 y multipliquen 6."],
      pasos: ["x = (5 ± √(25 − 24))/2 = (5 ± 1)/2 → x = 3 o x = 2.", "Comprobación con Vieta: 3 + 2 = 5 ✓ y 3·2 = 6 ✓."],
      resultado: "x = 2 y x = 3" },
    { id: "e7", nivel: 1,
      enunciado: "Resuelve 3x² − 12 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2] },
      pistas: ["Falta el término en x: despeja x²."],
      pasos: ["3x² = 12 → x² = 4 → x = ±2."],
      resultado: "x = 2 y x = −2" },
    { id: "e8", nivel: 1,
      enunciado: "Resuelve el sistema x + y = 10, x − y = 2.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 6 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["Suma las dos ecuaciones: se cancela y."],
      pasos: ["Sumando: 2x = 12 → x = 6.", "y = 10 − 6 = 4. Comprobación: 6 − 4 = 2 ✓."],
      resultado: "x = 6, y = 4" },
    { id: "e9", nivel: 1,
      enunciado: "Resuelve la inecuación 2x − 3 &gt; 7.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(5, +∞)", "[5, +∞)", "(−∞, 5)", "(−∞, 2)"], ok: 0 },
      pistas: ["Pasa el −3 sumando y divide entre 2 (positivo: no se invierte)."],
      pasos: ["2x &gt; 10 → x &gt; 5. El 5 no entra, porque la desigualdad es estricta: (5, +∞)."],
      resultado: "(5, +∞)" },
    { id: "e10", nivel: 1,
      enunciado: "Calcula log₂ 32 y resuelve 2ˣ = 16.",
      check: [{ tipo: "num", etiqueta: "log₂ 32 =", valor: 5 }, { tipo: "num", etiqueta: "x =", valor: 4 }],
      pistas: ["log₂ 32 es el exponente al que hay que elevar 2 para obtener 32."],
      pasos: ["2⁵ = 32 → log₂ 32 = 5.", "16 = 2⁴ → 2ˣ = 2⁴ → x = 4."],
      resultado: "log₂ 32 = 5 y x = 4" },
    // ================= ★★ medio =================
    { id: "e11", nivel: 2,
      enunciado: "Desarrolla (x − 2)(x² + 2x + 4). Escribe los coeficientes de x², de x y el término independiente (¡sale una identidad notable!).",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 0 }, { tipo: "num", etiqueta: "coef. de x =", valor: 0 }, { tipo: "num", etiqueta: "término independiente =", valor: -8 }],
      pistas: ["x·(x² + 2x + 4) − 2·(x² + 2x + 4)."],
      pasos: ["(x − 2)(x² + 2x + 4) = x³ + 2x² + 4x − 2x² − 4x − 8 = x³ − 8.", "Es la diferencia de cubos al revés: a³ − b³ = (a − b)(a² + ab + b²)."],
      resultado: "x³ − 8" },
    { id: "e12", nivel: 2,
      enunciado: "Divide 2x³ + x² − 5x + 2 entre x² + x − 2. Escribe el cociente (ax + b) y el resto.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 2 }, { tipo: "num", etiqueta: "b =", valor: -1 }, { tipo: "num", etiqueta: "resto =", valor: 0 }],
      pistas: ["2x³ ÷ x² = 2x. Multiplica 2x por todo el divisor y resta."],
      pasos: ["2x·(x² + x − 2) = 2x³ + 2x² − 4x. Resta: (2x³ + x² − 5x + 2) − (2x³ + 2x² − 4x) = −x² − x + 2.", "−x² ÷ x² = −1. (−1)(x² + x − 2) = −x² − x + 2. Resta: 0.", "Cociente 2x − 1, resto 0."],
      resultado: "Cociente 2x − 1, resto 0" },
    { id: "e13", nivel: 2,
      enunciado: "Halla las raíces de P(x) = x³ − 6x² + 11x − 6.",
      check: { tipo: "lista", etiqueta: "Raíces:", valores: [1, 2, 3] },
      pistas: ["Prueba los divisores de 6: ±1, ±2, ±3, ±6.", "P(1) = 0."],
      pasos: ["P(1) = 1 − 6 + 11 − 6 = 0. Ruffini con 1: 1, −5, 6, resto 0.", "x² − 5x + 6 = 0 → x = 2 o x = 3.", "P(x) = (x − 1)(x − 2)(x − 3)."],
      resultado: "x = 1, 2 y 3" },
    { id: "e14", nivel: 2,
      enunciado: "Factoriza x³ − x² − 4x + 4 y escribe sus raíces.",
      check: { tipo: "lista", etiqueta: "Raíces:", valores: [-2, 1, 2] },
      pistas: ["Prueba sacar factor común por grupos: x²(x − 1) − 4(x − 1)."],
      pasos: ["x³ − x² − 4x + 4 = x²(x − 1) − 4(x − 1) = (x − 1)(x² − 4) = (x − 1)(x − 2)(x + 2).", "Raíces: 1, 2 y −2."],
      resultado: "(x − 1)(x − 2)(x + 2)" },
    { id: "e15", nivel: 2,
      enunciado: "Halla k para que P(x) = x³ + 3x² + kx − 6 sea divisible por (x + 3).",
      check: { tipo: "num", etiqueta: "k =", valor: -2 },
      pistas: ["Divisible por x + 3 significa P(−3) = 0."],
      pasos: ["P(−3) = −27 + 27 − 3k − 6 = −3k − 6 = 0 → k = −2.", "Con k = −2: x³ + 3x² − 2x − 6 = x²(x + 3) − 2(x + 3) = (x + 3)(x² − 2)."],
      resultado: "k = −2" },
    { id: "e16", nivel: 2,
      enunciado: "Calcula, sin dividir, el resto de dividir x⁵ − 2x³ + x − 7 entre (x + 1).",
      check: { tipo: "num", etiqueta: "Resto =", valor: -7 },
      pistas: ["Teorema del resto con a = −1."],
      pasos: ["P(−1) = (−1)⁵ − 2(−1)³ + (−1) − 7 = −1 + 2 − 1 − 7 = −7."],
      resultado: "Resto −7" },
    { id: "e17", nivel: 2,
      enunciado: "Resuelve 2x² − 7x + 3 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [3, 0.5], ph: "por ejemplo 3, 1/2" },
      pistas: ["Δ = 49 − 24."],
      pasos: ["Δ = 49 − 24 = 25. x = (7 ± 5)/4 → x = 3 o x = 1/2.", "Comprobación: 3 + 1/2 = 7/2 = −b/a ✓ y 3·1/2 = 3/2 = c/a ✓."],
      resultado: "x = 3 y x = 1/2" },
    { id: "e18", nivel: 2,
      enunciado: "¿Para qué valor de k la ecuación x² − 6x + k = 0 tiene una solución doble?",
      check: { tipo: "num", etiqueta: "k =", valor: 9 },
      pistas: ["Solución doble ⇔ Δ = 0."],
      pasos: ["Δ = 36 − 4k = 0 → k = 9. La ecuación es (x − 3)² = 0."],
      resultado: "k = 9" },
    { id: "e19", nivel: 2,
      enunciado: "Resuelve la ecuación bicuadrada x⁴ − 13x² + 36 = 0.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-3, -2, 2, 3] },
      pistas: ["Cambio t = x²: t² − 13t + 36 = 0."],
      pasos: ["t = (13 ± √(169 − 144))/2 = (13 ± 5)/2 → t = 9 o t = 4.", "x = ±3 y x = ±2."],
      resultado: "x = −3, −2, 2 y 3" },
    { id: "e20", nivel: 2,
      enunciado: "Resuelve el sistema 2x + 3y = 13, 3x − y = 3.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["En la segunda, y = 3x − 3: sustituye."],
      pasos: ["2x + 3(3x − 3) = 13 → 11x − 9 = 13 → x = 2.", "y = 3·2 − 3 = 3. Comprobación en la 1.ª: 4 + 9 = 13 ✓."],
      resultado: "x = 2, y = 3" },
    { id: "e21", nivel: 2,
      enunciado: "Resuelve 1/x + 1/(x + 2) = 3/4. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [2, -4 / 3], ph: "por ejemplo 2, -4/3" },
      pistas: ["Multiplica por el mcm 4x(x + 2).", "Termina en 3x² − 2x − 8 = 0."],
      pasos: ["4(x + 2) + 4x = 3x(x + 2) → 8x + 8 = 3x² + 6x → 3x² − 2x − 8 = 0.", "x = (2 ± 10)/6 → x = 2 o x = −4/3. Ninguna anula un denominador."],
      resultado: "x = 2 y x = −4/3" },
    { id: "e22", nivel: 2,
      enunciado: "Resuelve √(2x − 1) + 2 = x. Da la solución válida.",
      check: { tipo: "num", etiqueta: "x =", valor: 5 },
      pistas: ["Aísla la raíz: √(2x − 1) = x − 2.", "Comprueba las dos soluciones obtenidas."],
      pasos: ["Elevamos al cuadrado: 2x − 1 = x² − 4x + 4 → x² − 6x + 5 = 0 → x = 5 o x = 1.", "x = 5: √9 + 2 = 5 ✓. x = 1: √1 + 2 = 3 ≠ 1 ✗.", "Solución: x = 5."],
      resultado: "x = 5",
      ojo: "x = 1 es una solución falsa: aparece al elevar al cuadrado, pero no cumple la ecuación." },
    { id: "e23", nivel: 2,
      enunciado: "Resuelve 2²ˣ − 5·2ˣ + 4 = 0. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 2] },
      pistas: ["2²ˣ = (2ˣ)². Cambio t = 2ˣ."],
      pasos: ["t² − 5t + 4 = 0 → t = 1 o t = 4.", "2ˣ = 1 → x = 0. 2ˣ = 4 → x = 2."],
      resultado: "x = 0 y x = 2" },
    { id: "e24", nivel: 2,
      enunciado: "Resuelve log₃(x + 2) + log₃(x − 4) = 3. Da la solución válida.",
      check: { tipo: "num", etiqueta: "x =", valor: 7 },
      pistas: ["Junta los logaritmos: log₃[(x + 2)(x − 4)] = 3.", "Dominio: x &gt; 4."],
      pasos: ["(x + 2)(x − 4) = 3³ = 27 → x² − 2x − 8 = 27 → x² − 2x − 35 = 0 → x = 7 o x = −5.", "x = −5 no está en el dominio (x &gt; 4). Solución x = 7: log₃ 9 + log₃ 3 = 2 + 1 = 3 ✓."],
      resultado: "x = 7" },
    { id: "e25", nivel: 2,
      enunciado: "Resuelve la inecuación x² − x − 6 &lt; 0.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−2, 3)", "(−∞, −2) ∪ (3, +∞)", "[−2, 3]", "(−3, 2)"], ok: 0 },
      pistas: ["Raíces: x² − x − 6 = (x − 3)(x + 2).", "Una parábola con a &gt; 0 es negativa entre sus raíces."],
      pasos: ["Raíces: −2 y 3. Probamos x = 0: −6 &lt; 0 ✓ (el intervalo central es solución).", "La desigualdad es estricta: (−2, 3)."],
      resultado: "(−2, 3)" },
    { id: "e26", nivel: 2,
      enunciado: "La suma de un número y su inverso es 10/3. ¿Cuáles son los dos números posibles?",
      check: { tipo: "lista", etiqueta: "x =", valores: [3, 1 / 3], ph: "por ejemplo 3, 1/3" },
      pistas: ["x + 1/x = 10/3. Multiplica por 3x."],
      pasos: ["3x² + 3 = 10x → 3x² − 10x + 3 = 0 → x = (10 ± 8)/6 → x = 3 o x = 1/3.", "Cada uno es el inverso del otro, así que son la misma pareja: 3 y 1/3."],
      resultado: "3 y 1/3" },
    // ================= ★★★ nivel PAU =================
    { id: "e27", nivel: 3,
      enunciado: "Halla a y b para que P(x) = x³ + ax² + bx − 6 sea divisible por (x − 1) y por (x + 3).",
      check: [{ tipo: "num", etiqueta: "a =", valor: 4 }, { tipo: "num", etiqueta: "b =", valor: 1 }],
      pistas: ["P(1) = 0 y P(−3) = 0: dos ecuaciones con a y b."],
      pasos: ["P(1) = 1 + a + b − 6 = 0 → a + b = 5.", "P(−3) = −27 + 9a − 3b − 6 = 0 → 9a − 3b = 33 → 3a − b = 11.", "Sumando: 4a = 16 → a = 4, b = 1.", "P(x) = x³ + 4x² + x − 6 = (x − 1)(x + 2)(x + 3)."],
      resultado: "a = 4 y b = 1" },
    { id: "e28", nivel: 3,
      enunciado: "Factoriza P(x) = x⁴ − 3x³ − 3x² + 11x − 6. Indica sus raíces distintas y la raíz doble.",
      check: [{ tipo: "lista", etiqueta: "Raíces distintas:", valores: [-2, 1, 3] }, { tipo: "num", etiqueta: "Raíz doble =", valor: 1 }],
      pistas: ["P(1) = 0. Después de dividir, vuelve a probar con x = 1."],
      pasos: ["P(1) = 1 − 3 − 3 + 11 − 6 = 0. Ruffini con 1: 1, −2, −5, 6 y resto 0 → x³ − 2x² − 5x + 6.", "Otra vez P(1) = 1 − 2 − 5 + 6 = 0: Ruffini con 1 → 1, −1, −6 → x² − x − 6 = (x − 3)(x + 2).", "P(x) = (x − 1)²(x − 3)(x + 2). Raíces: 1 (doble), 3 y −2."],
      resultado: "P(x) = (x − 1)²(x − 3)(x + 2)" },
    { id: "e29", nivel: 3,
      enunciado: "Simplifica (x³ − x)/(x² − 2x + 1).",
      check: { tipo: "opcion", etiqueta: "Resultado", opciones: ["x(x + 1)/(x − 1)", "x/(x − 1)", "(x + 1)/(x − 1)", "x(x − 1)/(x + 1)"], ok: 0 },
      pistas: ["Factoriza: x³ − x = x(x² − 1) y x² − 2x + 1 = (x − 1)²."],
      pasos: ["x³ − x = x(x − 1)(x + 1). x² − 2x + 1 = (x − 1)².", "Tachando un factor (x − 1): x(x + 1)/(x − 1), con x ≠ 1."],
      resultado: "x(x + 1)/(x − 1)  (x ≠ 1)" },
    { id: "e30", nivel: 3,
      enunciado: "Resuelve x + 3/(x − 3) = 3 + 3/(x − 3).",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["x = 3", "x = 0", "x = −3", "No tiene solución"], ok: 3 },
      pistas: ["Prohibido: x = 3. Multiplica por x − 3."],
      pasos: ["Multiplicando por (x − 3): x(x − 3) + 3 = 3(x − 3) + 3 → x² − 3x = 3x − 9 → x² − 6x + 9 = 0 → x = 3.", "Pero x = 3 anula el denominador: es una solución falsa.", "La ecuación no tiene solución."],
      resultado: "No tiene solución (la única candidata, x = 3, está prohibida)" },
    { id: "e31", nivel: 3,
      enunciado: "Resuelve √(2x + 3) − √(x + 1) = 1. Escribe las soluciones válidas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-1, 3] },
      pistas: ["Aísla una raíz: √(2x + 3) = 1 + √(x + 1).", "Tras elevar al cuadrado queda x + 1 = 2√(x + 1). Llama s = √(x + 1)."],
      pasos: ["Elevamos: 2x + 3 = 1 + 2√(x + 1) + x + 1 → x + 1 = 2√(x + 1).", "Con s = √(x + 1) ≥ 0: s² = 2s → s = 0 o s = 2 → x = −1 o x = 3.", "Comprobación: x = −1 → √1 − √0 = 1 ✓. x = 3 → √9 − √4 = 3 − 2 = 1 ✓."],
      resultado: "x = −1 y x = 3" },
    { id: "e32", nivel: 3,
      enunciado: "Resuelve 2ˣ + 2¹⁻ˣ = 3. Escribe las dos soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 1] },
      pistas: ["2¹⁻ˣ = 2/2ˣ. Cambio t = 2ˣ y multiplica por t."],
      pasos: ["t + 2/t = 3 → t² − 3t + 2 = 0 → t = 1 o t = 2.", "2ˣ = 1 → x = 0. 2ˣ = 2 → x = 1."],
      resultado: "x = 0 y x = 1" },
    { id: "e33", nivel: 3,
      enunciado: "Resuelve log(x² − 4) − log(x + 2) = 1 (logaritmos decimales).",
      check: { tipo: "num", etiqueta: "x =", valor: 12 },
      pistas: ["x² − 4 = (x − 2)(x + 2). Dominio: x &gt; 2.", "log A − log B = log(A/B)."],
      pasos: ["log[(x² − 4)/(x + 2)] = 1 → log(x − 2) = 1 (con x ≠ −2) → x − 2 = 10 → x = 12.", "Dominio x &gt; 2 ✓. Comprobación: log 140 − log 14 = log 10 = 1 ✓."],
      resultado: "x = 12" },
    { id: "e34", nivel: 3,
      enunciado: "Resuelve (x² − x − 6)/(x − 1) ≤ 0.",
      check: { tipo: "opcion", etiqueta: "Solución", opciones: ["(−∞, −2] ∪ (1, 3]", "[−2, 1) ∪ [3, +∞)", "(−∞, −2) ∪ (1, 3)", "[−2, 3]"], ok: 0 },
      pistas: ["Numerador: (x − 3)(x + 2). Denominador: x − 1 (prohibido).", "Signos en (−∞,−2), (−2,1), (1,3), (3,+∞)."],
      pasos: ["Ceros: −2 y 3 (numerador, entran porque es ≤) y 1 (denominador, no entra).", "Signos: (−∞, −2): (+)/(−) = − · (−2, 1): (−)/(−) = + · (1, 3): (−)/(+) = − · (3, +∞): +.", "≤ 0: (−∞, −2] ∪ (1, 3]."],
      resultado: "(−∞, −2] ∪ (1, 3]" },
    { id: "e35", nivel: 3,
      enunciado: "Resuelve x² + y² = 34, x − y = 2. Escribe los valores de x y los de y.",
      check: [{ tipo: "lista", etiqueta: "valores de x:", valores: [5, -3] }, { tipo: "lista", etiqueta: "valores de y:", valores: [3, -5] }],
      pistas: ["De la lineal: x = y + 2.", "Sustituye y obtendrás una ecuación de segundo grado en y."],
      pasos: ["(y + 2)² + y² = 34 → 2y² + 4y − 30 = 0 → y² + 2y − 15 = 0 → y = 3 o y = −5.", "y = 3 → x = 5. y = −5 → x = −3.", "Soluciones: (5, 3) y (−3, −5)."],
      resultado: "(5, 3) y (−3, −5)" },
    { id: "e36", nivel: 3,
      enunciado: "Dos grifos llenan juntos un depósito en 6 horas. Si el primero lo llenara solo, tardaría 5 horas menos que el segundo solo. ¿Cuánto tarda el segundo solo?",
      check: { tipo: "num", etiqueta: "Segundo grifo:", valor: 15, unidad: "h" },
      pistas: ["Sea x lo que tarda el segundo. El primero tarda x − 5.", "Cada hora llenan 1/x + 1/(x − 5) = 1/6 del depósito."],
      pasos: ["1/x + 1/(x − 5) = 1/6 → 6(x − 5) + 6x = x(x − 5) → 12x − 30 = x² − 5x → x² − 17x + 30 = 0.", "x = (17 ± 13)/2 → x = 15 o x = 2.", "Con x = 2, el primero tardaría −3 h: absurdo. Por tanto x = 15 h (y el primero, 10 h: 1/15 + 1/10 = 1/6 ✓)."],
      resultado: "15 horas" },
    { id: "e37", nivel: 3,
      enunciado: "¿Para qué valores de m la ecuación x² + mx + 4 = 0 tiene dos soluciones reales distintas?",
      check: { tipo: "opcion", etiqueta: "m ∈", opciones: ["(−∞, −4) ∪ (4, +∞)", "(−4, 4)", "[−4, 4]", "{−4, 4}"], ok: 0 },
      pistas: ["Δ &gt; 0.", "m² − 16 &gt; 0 es una inecuación de segundo grado."],
      pasos: ["Δ = m² − 16 &gt; 0 → (m − 4)(m + 4) &gt; 0.", "La parábola en m es positiva fuera de sus raíces: m &lt; −4 o m &gt; 4.", "En m = ±4 hay solución doble (Δ = 0) y entre −4 y 4 no hay soluciones reales."],
      resultado: "m &lt; −4 o m &gt; 4" },
    { id: "e38", nivel: 3,
      enunciado: "Resuelve por el método de Gauss: x + y + z = 6, 2x − y + z = 6, x + 2y − z = 1.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 1 }, { tipo: "num", etiqueta: "z =", valor: 3 }],
      pistas: ["E₂ − 2E₁ elimina x de la 2.ª; E₃ − E₁ lo elimina de la 3.ª."],
      pasos: ["E₂ ← E₂ − 2E₁: −3y − z = −6. E₃ ← E₃ − E₁: y − 2z = −5.", "Eliminamos y: 3E₃ + E₂ → (3y − 6z) + (−3y − z) = −15 − 6 → −7z = −21 → z = 3.", "De y − 2z = −5: y = 1. De la 1.ª: x = 6 − 1 − 3 = 2.", "Comprobación en la 2.ª: 4 − 1 + 3 = 6 ✓."],
      resultado: "(x, y, z) = (2, 1, 3)" },
    { id: "e39", nivel: 3,
      enunciado: "Demuestra que si x₁ y x₂ son las soluciones de ax² + bx + c = 0, entonces x₁ + x₂ = −b/a y x₁·x₂ = c/a.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe las soluciones de la fórmula: x₁ = (−b + √Δ)/2a y x₂ = (−b − √Δ)/2a", p: 0.5 },
        { t: "Suma: los términos con √Δ se cancelan y queda −2b/2a = −b/a", p: 0.5 },
        { t: "Multiplica: (−b)² − (√Δ)² = b² − Δ en el numerador, sobre 4a²", p: 0.5 },
        { t: "Sustituye Δ = b² − 4ac: (b² − b² + 4ac)/4a² = c/a", p: 0.5 }
      ] },
      pasos: ["x₁ = (−b + √Δ)/(2a) y x₂ = (−b − √Δ)/(2a) con Δ = b² − 4ac.", "Suma: x₁ + x₂ = (−b + √Δ − b − √Δ)/(2a) = −2b/(2a) = −b/a.", "Producto: x₁x₂ = [(−b)² − (√Δ)²]/(4a²) = (b² − Δ)/(4a²) = (b² − b² + 4ac)/(4a²) = c/a."],
      resultado: "x₁ + x₂ = −b/a y x₁·x₂ = c/a" },
    { id: "e40", nivel: 3,
      enunciado: "Halla un polinomio de tercer grado con coeficiente principal 2 y raíces 1, −2 y 1/2. Escribe sus coeficientes de x², x y el término independiente.",
      check: [{ tipo: "num", etiqueta: "coef. de x² =", valor: 1 }, { tipo: "num", etiqueta: "coef. de x =", valor: -5 }, { tipo: "num", etiqueta: "término independiente =", valor: 2 }],
      pistas: ["P(x) = 2(x − 1)(x + 2)(x − 1/2) = (x − 1)(x + 2)(2x − 1)."],
      pasos: ["(x − 1)(x + 2) = x² + x − 2.", "(x² + x − 2)(2x − 1) = 2x³ − x² + 2x² − x − 4x + 2 = 2x³ + x² − 5x + 2.", "Comprobación con Cardano–Vieta: suma de las raíces = 1 − 2 + 1/2 = −1/2 y −b/a = −1/2 ✓; producto = 1·(−2)·(1/2) = −1 y −a₀/a₃ = −2/2 = −1 ✓."],
      resultado: "2x³ + x² − 5x + 2" }
  ];

  var lamina = [
    { titulo: "Polinomios: operar y dividir",
      items: [
        { label: "Valor numérico y suma de coeficientes", formula: "P(a)  ·  P(1) = suma de los coeficientes", cuando: "Para comprobar cualquier operación entre polinomios.", ejemplo: "P(x) = x³ − 2x² − 5x + 6 → P(1) = 1 − 2 − 5 + 6 = 0" },
        { label: "Grados", formula: "gr(P·Q) = gr P + gr Q  ·  gr(P ± Q) ≤ máx", ojo: "gr(C) = gr P − gr Q en una división, y gr(R) &lt; gr(Q)." },
        { label: "Prueba de la división", formula: "P = Q·C + R", cuando: "Siempre que dividas: comprueba que sale." }
      ],
      pasos: ["Divide el término de mayor grado entre el de mayor grado del divisor.", "Multiplica ese resultado por todo el divisor y réstalo (cambia todos los signos).", "Repite hasta que el grado del resto sea menor que el del divisor."],
      nota: "Los polinomios incompletos se completan con coeficientes 0 antes de dividir." },
    { titulo: "Identidades notables", ancha: true,
      tabla: { cab: ["Identidad", "Para factorizar, mira si es…"], filas: [
        ["(a + b)² = a² + 2ab + b²", "trinomio con dos cuadrados y el doble producto"],
        ["(a − b)² = a² − 2ab + b²", "igual con el central negativo"],
        ["(a + b)(a − b) = a² − b²", "una <b>resta</b> de cuadrados"],
        ["(a + b)³ = a³ + 3a²b + 3ab² + b³", "cuatro términos 1-3-3-1"],
        ["a³ + b³ = (a + b)(a² − ab + b²)", "suma de cubos"],
        ["a³ − b³ = (a − b)(a² + ab + b²)", "resta de cubos"]
      ] },
      nota: "La suma de cuadrados a² + b² NO se factoriza con números reales." },
    { titulo: "Ruffini y teoremas",
      items: [
        { label: "Teorema del resto", formula: "resto de P ÷ (x − a) = P(a)", ejemplo: "resto de x⁴ − 3x² + 2x + 5 ÷ (x + 2) = P(−2) = 5" },
        { label: "Teorema del factor", formula: "(x − a) es factor ⇔ P(a) = 0", ejemplo: "P(x) = x³ + kx² − 4x + 4 divisible por x − 2 → P(2) = 0 → k = −1" },
        { label: "Raíces racionales", formula: "p/q con p | a₀ y q | aₙ", cuando: "Para elegir qué valores probar.", ojo: "Prueba cada divisor con signo + y con signo −." }
      ],
      pasos: ["Escribe los coeficientes de mayor a menor grado, con 0 donde falte un término.", "Baja el primero. Multiplica por a y suma al siguiente. Repite.", "El último número es el resto; los demás, el cociente."],
      nota: "Para dividir entre x + 3 usa a = −3. Para (ax − b), usa a = b/a y divide el cociente entre a." },
    { titulo: "Cómo factorizar (en este orden)",
      pasos: ["Factor común (número y/o potencia de x).", "Identidad notable (diferencia de cuadrados, cuadrado perfecto, cubos).", "Ruffini con los divisores de a₀ (y fracciones p/q si aₙ ≠ 1). Repite con la misma raíz por si es múltiple.", "Cuando quede grado 2, resuelve con la fórmula. Δ &lt; 0 ⇒ factor irreducible.", "Comprueba: suma de raíces = −aₙ₋₁/aₙ y producto = (−1)ⁿ a₀/aₙ."],
      nota: "No olvides el coeficiente principal: 2x² − 5x + 2 = (x − 2)(2x − 1)." },
    { titulo: "Ecuación de segundo grado",
      items: [
        { label: "Fórmula general", formula: "x = " + fr("−b ± " + raiz("b² − 4ac"), "2a"), ejemplo: "2x² − 3x − 2 = 0 → x = (3 ± 5)/4 → x = 2 y x = −1/2" },
        { label: "Discriminante", formula: "Δ = b² − 4ac", cuando: "Δ &gt; 0: dos soluciones · Δ = 0: una doble · Δ &lt; 0: ninguna real." },
        { label: "Suma y producto", formula: "x₁ + x₂ = −b/a  ·  x₁x₂ = c/a", ejemplo: "soluciones 3 y −5 → x² + 2x − 15 = 0" },
        { label: "Incompletas", formula: "ax² + bx = 0 → x(ax + b) = 0  ·  ax² + c = 0 → x = ±√(−c/a)", ojo: "No dividas entre x: pierdes la solución x = 0." }
      ] },
    { titulo: "Bicuadradas y cambios de variable", ancha: true,
      tabla: { cab: ["Ecuación", "Cambio", "Después"], filas: [
        ["ax⁴ + bx² + c = 0", "t = x²", "cada t &gt; 0 → x = ±√t; t &lt; 0 se descarta"],
        ["ax⁶ + bx³ + c = 0", "t = x³", "x = ∛t (acepta t negativos)"],
        ["x − 5√x + 6 = 0", "t = √x ≥ 0", "x = t²"],
        ["4ˣ − 3·2ˣ − 4 = 0", "t = 2ˣ &gt; 0", "x = log₂ t"]
      ] },
      nota: "Una bicuadrada tiene 4, 3, 2, 1 o 0 soluciones reales." },
    { titulo: "Sistemas de ecuaciones",
      tabla: { cab: ["Rectas", "Soluciones", "Al resolver"], filas: [["se cortan", "una (SCD)", "x = …, y = …"], ["coinciden", "infinitas (SCI)", "0 = 0"], ["paralelas", "ninguna (SI)", "0 = k ≠ 0"]] },
      pasos: ["Lineal con lineal: reducción (coeficientes opuestos) o sustitución.", "Lineal con no lineal: despeja en la lineal y sustituye.", "Tres ecuaciones: Gauss (escalonar y resolver de abajo arriba).", "Comprueba en las dos ecuaciones originales."] },
    { titulo: "Fracciones algebraicas y ecuaciones con raíces o denominadores", ancha: true,
      pasos: ["Simplificar: factoriza numerador y denominador y tacha factores (nunca sumandos).", "Sumar: mcm de los denominadores (cada factor con su mayor exponente).", "Ecuación racional: multiplica todo por el mcm, resuelve, descarta las soluciones que anulen un denominador.", "Ecuación irracional: aísla la raíz, eleva al cuadrado, resuelve y comprueba SIEMPRE."],
      nota: "Una solución falsa aparece cuando elevar al cuadrado (o multiplicar por algo que puede ser 0) añade soluciones nuevas." },
    { titulo: "Exponenciales y logaritmos",
      items: [
        { label: "Definición", formula: "log<sub>b</sub> N = y ⇔ bʸ = N", cuando: "N &gt; 0 siempre.", ejemplo: "log₂ 8 = 3 porque 2³ = 8" },
        { label: "Propiedades", formula: "log AB = log A + log B · log A/B = log A − log B · log Aᵏ = k log A", ojo: "log(A + B) no se descompone." },
        { label: "Cambio de base", formula: "log<sub>b</sub> N = " + fr("log N", "log b"), ejemplo: "log₂ 5 = log 5 / log 2 ≈ 2,32" }
      ],
      pasos: ["Exponencial: iguala bases, saca factor común o cambia t = aˣ.", "Si no se pueden igualar bases, toma logaritmos: x = log N / log b.", "Logarítmica: junta en un solo logaritmo, quita el log y comprueba el dominio."] },
    { titulo: "Inecuaciones", ancha: true,
      pasos: ["Pasa todo a un miembro (el otro es 0) y factoriza.", "Ceros del numerador y del denominador → recta con intervalos.", "Prueba un valor de cada intervalo para el signo.", "Elige los intervalos con el signo pedido.", "Extremos: ceros del numerador entran con ≤ o ≥; ceros del denominador nunca entran."],
      nota: "Al multiplicar o dividir por un número negativo, la desigualdad se invierte. Un sistema de inecuaciones es la intersección de las soluciones." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(x + 5)² = x² + 25", bien: "(x + 5)² = x² + 10x + 25", por: "Falta el doble producto 2ab." },
        { mal: "Dividir entre x + 3 con a = 3", bien: "a = −3", por: "x + 3 = x − (−3)." },
        { mal: "5x² = 20x → 5x = 20 → x = 4", bien: "5x(x − 4) = 0 → x = 0 y x = 4", por: "Dividir entre x pierde la solución 0." },
        { mal: "√(x + 6) = x → x = 3 y x = −2", bien: "Solo x = 3", por: "x = −2 es solución falsa: hay que comprobar." },
        { mal: "−2x &gt; 6 → x &gt; −3", bien: "x &lt; −3", por: "Al dividir por un negativo se invierte la desigualdad." },
        { mal: "log(x + 3) = log x + log 3", bien: "log(3x) = log 3 + log x", por: "La propiedad es para productos." },
        { mal: "(x² + 1)/(x² − 1) = −1", bien: "No se puede simplificar", por: "Solo se tachan factores." }
      ] }
  ];

  B.registrar("mates1", "t3", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 4: Trigonometría
   (razones y resolución de triángulos)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t4/" + ref); }

  var resumen = [
    "En un triángulo rectángulo: <b>sen α = opuesto/hipotenusa</b>, <b>cos α = adyacente/hipotenusa</b>, <b>tan α = opuesto/adyacente</b>. La razón sólo depende del ángulo, no del tamaño.",
    "Los ángulos se miden en grados o en <b>radianes</b> (π rad = 180°). En la circunferencia de radio 1, el punto de ángulo θ es <b>(cos θ, sen θ)</b>.",
    "<b>sen²θ + cos²θ = 1</b>. Valores a saber: sen 30° = 1/2, sen 45° = √2/2, sen 60° = √3/2 (y los cosenos, al revés).",
    "Cualquier ángulo se <b>reduce al primer cuadrante</b> con su ángulo de referencia y el signo del cuadrante.",
    "<b>Teorema del seno</b>: a/sen A = b/sen B = c/sen C. <b>Teorema del coseno</b>: a² = b² + c² − 2bc·cos A.",
    "¿Cuál usar? Ángulo opuesto a un lado conocido → seno (¡cuidado con el caso ambiguo!). Dos lados y el ángulo entre ellos, o tres lados → coseno. Área = ½·b·c·sen A."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Ángulos y razones
  secciones[0] =
    "<h5>Medir ángulos: grados, minutos y segundos</h5>" +
    "<p>Un grado (1°) se divide en 60 minutos (60′) y un minuto en 60 segundos (60″), igual que las horas. Las calculadoras trabajan con decimales, así que hay que saber pasar de un sistema al otro:</p>" +
    "<ul><li><b>De grados-minutos a decimal</b>: 35° 27′ = 35 + 27/60 = 35,45°.</li>" +
    "<li><b>De decimal a grados-minutos</b>: 12,3° → 12° y 0,3° = 0,3·60′ = 18′, es decir, 12° 18′.</li></ul>" +
    "<p>Dos nombres que se usan mucho: ángulos <b>complementarios</b> son los que suman 90°, y <b>suplementarios</b> los que suman 180°. En todo triángulo los tres ángulos suman 180°; por eso, en un triángulo rectángulo, los dos ángulos agudos son complementarios.</p>" +
    "<h5>Las tres razones y cómo no confundirlas</h5>" +
    "<p>Siempre se nombran desde el ángulo α que miras: el <b>opuesto</b> es el cateto que no toca a α, el <b>adyacente</b> el cateto que sí lo toca, y la <b>hipotenusa</b> el lado largo. Un truco para recordar las fórmulas en el orden correcto es la frase <b>SOH · CAH · TOA</b> (<i>Seno = Opuesto/Hipotenusa, Coseno = Adyacente/Hipotenusa, Tangente = Opuesto/Adyacente</i>). Como la hipotenusa es siempre el lado más largo, el seno y el coseno de un ángulo agudo siempre están entre 0 y 1; la tangente, en cambio, puede valer cualquier número positivo.</p>" +
    "<p>Mira qué pasa si cambias el tamaño del triángulo sin cambiar el ángulo:</p>" +
    w("rectangulo") +
    "<h5>Las razones inversas</h5>" +
    "<p>A veces se usan sus inversos: la <b>cosecante</b> cosec α = 1/sen α, la <b>secante</b> sec α = 1/cos α y la <b>cotangente</b> cotan α = 1/tan α = cos α/sen α. No son nuevas razones, solo escrituras cómodas (aparecerán, por ejemplo, en la relación 1 + tan²α = 1/cos²α).</p>" +
    "<h5>Resolver triángulos rectángulos</h5>" +
    "<p>«Resolver» un triángulo es calcular todos sus lados y ángulos. En uno rectángulo basta con conocer <b>dos datos</b> (aparte del ángulo recto) y que uno sea un lado. El método: dibuja, rotula (opuesto, adyacente, hipotenusa respecto del ángulo que uses) y elige la razón que relaciona lo que tienes con lo que buscas.</p>" +
    ejemplo("Hipotenusa y un ángulo", "En un triángulo rectángulo la hipotenusa mide 12 y un ángulo agudo mide 35°. Resuélvelo.", [
      "El otro ángulo agudo es 90° − 35° = <b>55°</b>.",
      "El cateto opuesto a 35°: sen 35° = opuesto/12 → opuesto = 12·sen 35° = 12·0,5736 = <b>6,88</b>.",
      "El cateto adyacente: cos 35° = adyacente/12 → adyacente = 12·cos 35° = 12·0,8192 = <b>9,83</b>.",
      "Comprobación con Pitágoras: 6,88² + 9,83² = 47,4 + 96,6 = 144 = 12² ✓."
    ]) +
    ejemplo("Dos catetos", "Los catetos de un triángulo rectángulo miden 5 y 12. Calcula la hipotenusa y los ángulos.", [
      "Hipotenusa: √(5² + 12²) = √169 = <b>13</b>.",
      "El ángulo α opuesto al cateto de 5: tan α = 5/12 = 0,4167 → α = arctan(0,4167) = <b>22,62°</b> (en la calculadora, la tecla tan⁻¹).",
      "El otro ángulo es 90° − 22,62° = <b>67,38°</b>."
    ]) +
    ejemplo("Cateto y ángulo", "Un cateto adyacente mide 8 y el ángulo es 40°. Halla el cateto opuesto y la hipotenusa.", [
      "Opuesto: tan 40° = opuesto/8 → opuesto = 8·tan 40° = 8·0,8391 = <b>6,71</b>.",
      "Hipotenusa: cos 40° = 8/hipotenusa → hipotenusa = 8/cos 40° = 8/0,7660 = <b>10,44</b>."
    ]) +
    "<h5>Ángulos de elevación y de depresión</h5>" +
    "<p>El <b>ángulo de elevación</b> es el que forma la horizontal con la visual hacia un punto <i>más alto</i> que el observador; el de <b>depresión</b>, hacia uno más bajo. Los dos se miden respecto de la horizontal (nunca de la vertical). Casi todos los problemas de altura y distancia son un triángulo rectángulo con el ángulo en el suelo.</p>" +
    ejemplo("La pendiente de una carretera", "Una señal indica «pendiente del 8 %». ¿Qué ángulo forma la carretera con la horizontal? Y una rampa de 10° de inclinación, ¿qué porcentaje de pendiente tiene?", [
      "Una pendiente del 8 % significa que se sube 8 m por cada 100 m <i>en horizontal</i>: tan α = 8/100 = 0,08 → α = arctan 0,08 = <b>4,57°</b>.",
      "Con 10°: pendiente = tan 10° = 0,1763 → <b>17,6 %</b>. (La pendiente no es el seno: 100 m «de carretera» no son 100 m en horizontal.)"
    ]) +
    ejemplo("Una escalera", "Una escalera de 5 m se apoya en una pared formando 65° con el suelo. ¿A qué altura llega y a qué distancia de la pared está su pie?", [
      "La escalera es la hipotenusa (5 m) y el ángulo con el suelo es 65°.",
      "Altura (cateto opuesto): 5·sen 65° = 5·0,9063 = <b>4,53 m</b>. Distancia (adyacente): 5·cos 65° = 5·0,4226 = <b>2,11 m</b>."
    ]) +
    ojo("la calculadora tiene dos modos para los ángulos, <b>DEG</b> (grados) y <b>RAD</b> (radianes). Si trabajas en grados y está en RAD, sen 30 te dará −0,988 en lugar de 0,5. Mira siempre la «D» o la «DEG» de la pantalla antes de empezar. Y para calcular un ángulo a partir de una razón usa las teclas sin⁻¹, cos⁻¹ y tan⁻¹ (por ejemplo, sin⁻¹(0,6) = 36,87°).");

  // ---------------------------------------------------------------- 2. Circunferencia goniométrica y radianes
  secciones[1] =
    "<h5>Por qué el punto es (cos θ, sen θ)</h5>" +
    "<p>Si el radio es 1, el triángulo rectángulo que forma el punto de la circunferencia con el eje X tiene hipotenusa 1. Entonces cos θ = adyacente/1 = <b>abscisa</b> del punto y sen θ = opuesto/1 = <b>ordenada</b>. Lo bueno es que esa definición ya <i>no necesita un triángulo</i>: tiene sentido para cualquier ángulo, también mayor de 90°, negativo o de varias vueltas. Y la tangente es la longitud del segmento que la visual de θ recorta sobre la recta vertical x = 1 (de ahí su nombre: es el trozo de tangente a la circunferencia). Arrastra el punto rojo:</p>" +
    w("goniometrica") +
    "<h5>Ángulos negativos y de más de una vuelta</h5>" +
    "<p>Los ángulos <b>positivos</b> se miden en sentido contrario a las agujas del reloj, y los <b>negativos</b> en el sentido de las agujas: −60° es lo mismo que 300°. Pasar una vuelta completa (360°) no cambia el punto: <b>sen(θ + 360°·k) = sen θ</b> y lo mismo para el coseno y la tangente (esta última se repite incluso cada 180°). Se dice que son funciones <b>periódicas</b>. Por eso, 1110° = 3·360° + 30° tiene las mismas razones que 30°.</p>" +
    "<h5>Cuándo es positiva cada razón</h5>" +
    "<p>Por las coordenadas del punto: el seno es positivo arriba (cuadrantes I y II), el coseno es positivo a la derecha (I y IV) y la tangente, cociente de los dos, es positiva cuando seno y coseno tienen el mismo signo (I y III). Una regla para recordarlo, recorriendo los cuadrantes I, II, III y IV: <b>«Todas, Seno, Tangente, Coseno»</b>: en el I son positivas todas, en el II sólo el seno, en el III sólo la tangente y en el IV sólo el coseno.</p>" +
    tabla(["Cuadrante", "Ángulos", "sen", "cos", "tan"], [
      ["I", "0° – 90°", "+", "+", "+"], ["II", "90° – 180°", "+", "−", "−"], ["III", "180° – 270°", "−", "−", "+"], ["IV", "270° – 360°", "−", "+", "−"]
    ]) +
    "<p>En los ejes: tan 90° y tan 270° <b>no existen</b> (el coseno vale 0 y no se puede dividir entre 0); en esos ángulos la visual es vertical y nunca corta a la recta x = 1.</p>" +
    "<h5>Radianes: otra manera de medir ángulos</h5>" +
    "<p>Los grados son un invento antiguo (360 viene de los babilonios y su sistema de base 60). Para hacer matemáticas con ángulos se usa la unidad que simplifica todas las fórmulas: el <b>radián</b>. Un radián es el ángulo que, en cualquier circunferencia, abarca un arco <b>de longitud igual al radio</b>. Como la circunferencia mide 2πr, caben 2π radios en ella: una vuelta completa son <b>2π rad</b> y media vuelta <b>π rad</b>. De ahí sale toda la conversión:</p>" +
    H.formula("180° = π rad        grados × π/180 = radianes        radianes × 180/π = grados") +
    w("radianes") +
    tabla(["Grados", "0°", "30°", "45°", "60°", "90°", "120°", "135°", "150°", "180°", "270°", "360°"], [
      ["Radianes", "0", "π/6", "π/4", "π/3", "π/2", "2π/3", "3π/4", "5π/6", "π", "3π/2", "2π"]
    ]) +
    "<p>Los radianes hacen muy cómodo el cálculo de arcos y sectores: la <b>longitud de un arco</b> es <b>s = θ·r</b> y el <b>área de un sector</b> es <b>A = ½·r²·θ</b> (con θ en radianes). Con grados las dos fórmulas se llenan de factores π/180.</p>" +
    ejemplo("Conversiones y arco", "Pasa 135° a radianes y 5π/6 rad a grados. Después calcula la longitud del arco de un ángulo de 2 rad en una circunferencia de 5 cm de radio, y el área de ese sector.", [
      "135° · π/180 = 135π/180 = <b>3π/4 rad</b> (≈ 2,356 rad).",
      "5π/6 · 180/π = 5·180/6 = <b>150°</b> (el π se cancela).",
      "Arco: s = θ·r = 2·5 = <b>10 cm</b>. Sector: A = ½·r²·θ = ½·25·2 = <b>25 cm²</b>."
    ]) +
    ojo("«π» no vale 3,14 en las respuestas exactas: 3π/4 rad es una cantidad exacta y 2,36 es su aproximación. Y no mezcles unidades: si escribes sen(π/6) debes poner la calculadora en RAD y sen(30°) en DEG; ambas valen 0,5.");

  // ---------------------------------------------------------------- 3. Relación fundamental y notables
  secciones[2] =
    "<h5>De dónde salen los valores notables</h5>" +
    "<p>No son números que haya que «creer»: se pueden deducir con Pitágoras en dos triángulos muy sencillos.</p>" +
    "<ul><li><b>El cuadrado de lado 1 cortado por su diagonal</b>: es un triángulo rectángulo isósceles de catetos 1 e hipotenusa √2 (Pitágoras: 1 + 1 = 2). Los ángulos son 45° y 45°, así que sen 45° = 1/√2 = <b>√2/2</b>, cos 45° = √2/2 y tan 45° = 1.</li>" +
    "<li><b>El triángulo equilátero de lado 2 cortado por su altura</b>: queda un triángulo rectángulo de hipotenusa 2, un cateto 1 (la mitad de la base) y el otro √(4 − 1) = √3 (la altura). Los ángulos son 30° (frente al cateto 1) y 60° (frente a √3). Entonces sen 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3 = <b>√3/3</b>; sen 60° = √3/2, cos 60° = 1/2 y tan 60° = <b>√3</b>.</li></ul>" +
    "<h5>Una regla para no memorizar nada</h5>" +
    "<p>Los senos de 0°, 30°, 45°, 60° y 90° son <b>√0/2, √1/2, √2/2, √3/2 y √4/2</b> (es decir, 0, 1/2, √2/2, √3/2, 1). Los cosenos son los mismos números en orden inverso. La tangente es sen/cos.</p>" +
    tabla(["", "0°", "30°", "45°", "60°", "90°"], [
      ["sen", "0", "1/2", "√2/2", "√3/2", "1"],
      ["cos", "1", "√3/2", "√2/2", "1/2", "0"],
      ["tan", "0", "√3/3", "1", "√3", "no existe"]
    ]) +
    "<h5>Usar la relación fundamental para hallar las demás razones</h5>" +
    "<p>Si conoces <b>una</b> razón y el <b>cuadrante</b>, puedes calcular las demás con sen²α + cos²α = 1. El cuadrante decide el signo de la raíz cuadrada que aparece. Además, dividiendo la relación fundamental entre cos²α se obtiene otra muy útil: <b>1 + tan²α = 1/cos²α</b>.</p>" +
    ejemplo("Conozco el seno", "Si sen α = 3/5 y α está en el 2.º cuadrante, calcula cos α y tan α.", [
      "cos²α = 1 − sen²α = 1 − 9/25 = 16/25 → cos α = ±4/5.",
      "En el 2.º cuadrante el coseno es negativo: <b>cos α = −4/5</b>.",
      "tan α = sen α/cos α = (3/5)/(−4/5) = <b>−3/4</b>."
    ]) +
    ejemplo("Conozco la tangente", "Si tan α = 2 y α está en el 3.er cuadrante, calcula sen α y cos α.", [
      "1 + tan²α = 1/cos²α → 1 + 4 = 5 = 1/cos²α → cos²α = 1/5 → cos α = ±1/√5 = ±√5/5.",
      "En el 3.er cuadrante, seno y coseno son negativos: <b>cos α = −√5/5 ≈ −0,447</b>.",
      "sen α = tan α·cos α = 2·(−√5/5) = <b>−2√5/5 ≈ −0,894</b>. Comprobación: 0,2 + 0,8 = 1 ✓."
    ]) +
    ejemplo("Otra versión: el coseno", "Si cos α = −5/13 y α está en el 3.er cuadrante, calcula sen α y tan α.", [
      "sen²α = 1 − 25/169 = 144/169 → sen α = ±12/13. En el 3.er cuadrante es negativo: <b>sen α = −12/13</b>.",
      "tan α = (−12/13)/(−5/13) = <b>12/5</b> (positiva en el 3.er cuadrante, como debe ser)."
    ]) +
    ojo("al despejar con la relación fundamental, la raíz cuadrada da <b>dos</b> valores, ± el número. No olvides quedarte con el signo que corresponde al cuadrante; con un ángulo agudo, ambos son positivos.");

  // ---------------------------------------------------------------- 4. Reducción
  secciones[3] =
    "<h5>El método en cuatro pasos (sirve para cualquier ángulo)</h5>" +
    "<ol><li><b>Reduce a una vuelta</b>: resta o suma 360° hasta quedar entre 0° y 360° (o 2π en radianes).</li><li><b>Identifica el cuadrante</b> y apunta el signo de la razón que te piden (con la regla «Todas, Seno, Tangente, Coseno»).</li><li><b>Halla el ángulo de referencia</b>: el ángulo agudo que forma el lado final con el eje horizontal. Es α en 180° − α, 180° + α o 360° − α.</li><li><b>Calcula</b> la razón del ángulo de referencia (valor notable) y pon el signo del paso 2.</li></ol>" +
    w("reductor") +
    ejemplo("Cuatro reducciones", "Calcula el valor exacto de sen 210°, cos 315°, tan 120° y sen 1110°.", [
      "<b>sen 210°</b>: está en el 3.er cuadrante (seno negativo) y 210° = 180° + 30°, así que el ángulo de referencia es 30°. sen 210° = −sen 30° = <b>−1/2</b>.",
      "<b>cos 315°</b>: 4.º cuadrante (coseno positivo), 315° = 360° − 45°. cos 315° = cos 45° = <b>√2/2</b>.",
      "<b>tan 120°</b>: 2.º cuadrante (tangente negativa), 120° = 180° − 60°. tan 120° = −tan 60° = <b>−√3</b>.",
      "<b>sen 1110°</b>: 1110° − 3·360° = 1110° − 1080° = 30°. sen 1110° = sen 30° = <b>1/2</b>."
    ]) +
    ejemplo("Con radianes y ángulos negativos", "Calcula sen(11π/6), cos(−60°) y cos(7π/3).", [
      "11π/6 está justo antes de 2π: 2π − π/6, en el 4.º cuadrante (seno negativo). sen(11π/6) = −sen(π/6) = <b>−1/2</b>.",
      "cos(−60°) = cos 60° = <b>1/2</b> (el coseno es una función <i>par</i>: cos(−α) = cos α).",
      "7π/3 = 2π + π/3. Quitamos una vuelta: cos(7π/3) = cos(π/3) = <b>1/2</b>."
    ]) +
    "<h5>Todas las equivalencias en una tabla</h5>" +
    tabla(["Ángulo", "sen", "cos", "tan"], [
      ["180° − α", "+ sen α", "− cos α", "− tan α"], ["180° + α", "− sen α", "− cos α", "+ tan α"], ["360° − α  (ó −α)", "− sen α", "+ cos α", "− tan α"],
      ["90° − α  (complementario)", "+ cos α", "+ sen α", "+ 1/tan α"], ["90° + α", "+ cos α", "− sen α", "− 1/tan α"]
    ]) +
    "<p>Las dos últimas filas son las que mezclan seno y coseno: el seno de un ángulo es el coseno de su <b>complementario</b>. Por ejemplo, sen 70° = cos 20°. Para entenderlas basta recordar que en el triángulo rectángulo, el cateto opuesto a α es el adyacente de 90° − α.</p>" +
    "<h5>Ángulos con una razón dada: dos soluciones por vuelta</h5>" +
    "<p>Con lo anterior, puedes responder a «¿para qué ángulos sen x = 1/2?» (esto es una ecuación trigonométrica; la estudiarás a fondo en el Tema 5). En una vuelta hay <b>dos</b> ángulos con el mismo seno: el de referencia y su suplementario. Con sen x = 1/2: x = 30° y x = 150°. Con cos x = 1/2: x = 60° y x = 300°, y con tan x = 1: x = 45° y x = 225°.</p>" +
    ojo("al pedir arcsen, la calculadora devuelve siempre un solo ángulo (entre −90° y 90°). Pero un seno positivo también corresponde al 2.º cuadrante: sen⁻¹(0,5) = 30° y también hay solución en 150°. Haz siempre el dibujo del cuadrante.");

  // ---------------------------------------------------------------- 5. Teorema del seno
  secciones[4] =
    "<h5>De dónde sale</h5>" +
    "<p>Dibuja una altura <b>h</b> desde el vértice C sobre el lado c. Forma dos triángulos rectángulos: en uno, h = b·sen A; en el otro, h = a·sen B. Igualando: b·sen A = a·sen B → <b>a/sen A = b/sen B</b>. Repitiendo con otra altura se obtiene la tercera igualdad. Además, ese cociente común tiene un significado geométrico bonito: es el <b>diámetro de la circunferencia circunscrita</b>:</p>" +
    H.formula(fr("a", "sen A") + " = " + fr("b", "sen B") + " = " + fr("c", "sen C") + " = 2R") +
    "<p>Por ejemplo, si un lado mide 10 y el ángulo opuesto es 30°, entonces 2R = 10/sen 30° = 20 y el radio de la circunferencia circunscrita es R = 10.</p>" +
    "<h5>Cuándo se usa</h5>" +
    "<p>Hace falta conocer <b>un lado y su ángulo opuesto</b> (la «pareja» conocida) y un dato más. Hay dos situaciones típicas:</p>" +
    "<ul><li><b>Dos ángulos y un lado</b> (ALA o AAL): el tercer ángulo sale de la suma de 180°, y luego el teorema da los otros dos lados. Siempre hay una única solución.</li>" +
    "<li><b>Dos lados y el ángulo opuesto a uno de ellos</b> (LLA): se calcula el seno del otro ángulo… y aquí aparece un problema, el <b>caso ambiguo</b>.</li></ul>" +
    ejemplo("Dos ángulos y un lado", "Resuelve el triángulo con A = 40°, B = 65° y c = 12.", [
      "Tercer ángulo: C = 180° − 40° − 65° = <b>75°</b>.",
      "Parejas: c/sen C = 12/sen 75° = 12/0,9659 = 12,423.",
      "a = 12,423·sen 40° = 12,423·0,6428 = <b>7,99</b>.",
      "b = 12,423·sen 65° = 12,423·0,9063 = <b>11,26</b>. Comprobación: el lado mayor es c = 12 y está frente al ángulo mayor, C = 75° ✓."
    ]) +
    "<h5>El caso ambiguo (lado, lado, ángulo opuesto)</h5>" +
    "<p>Cuando conoces a, b y el ángulo A opuesto a a, el teorema da sen B = b·sen A/a. Y a partir de un seno hay <b>dos ángulos</b> entre 0° y 180°: B y 180° − B. A veces los dos sirven, y entonces existen dos triángulos distintos con los mismos datos. Para visualizar por qué, mueve los deslizadores: se traza una circunferencia de radio a con centro en C, y los puntos donde corta a la línea base son las posiciones posibles de B.</p>" +
    w("ambiguo") +
    "<p>El resumen, con A agudo y h = b·sen A (la altura desde C):</p>" +
    tabla(["Valor de a", "Triángulos", "Por qué"], [
      ["a &lt; h", "0", "a es demasiado corto para llegar a la base (sen B &gt; 1)"],
      ["a = h", "1", "es un triángulo rectángulo en B (sen B = 1)"],
      ["h &lt; a &lt; b", "2", "la circunferencia corta a la base en dos puntos"],
      ["a ≥ b", "1", "un corte queda «detrás» de A y no vale"]
    ]) +
    "<p>Si el ángulo A es obtuso (o recto), sólo hay una solución si a &gt; b y ninguna si a ≤ b (un triángulo no puede tener dos ángulos obtusos).</p>" +
    ejemplo("Dos soluciones", "Resuelve el triángulo con a = 8, b = 10 y A = 40°.", [
      "h = b·sen A = 10·sen 40° = 6,43. Como h &lt; a &lt; b (6,43 &lt; 8 &lt; 10), habrá <b>dos</b> triángulos.",
      "sen B = b·sen A/a = 10·0,6428/8 = 0,8035 → B₁ = 53,46° o B₂ = 180° − 53,46° = 126,54°.",
      "Triángulo 1: C₁ = 180° − 40° − 53,46° = 86,54° y c₁ = a·sen C₁/sen A = 8·0,9982/0,6428 = <b>12,42</b>.",
      "Triángulo 2: C₂ = 180° − 40° − 126,54° = 13,46° y c₂ = 8·0,2328/0,6428 = <b>2,90</b>.",
      "Los dos cumplen los datos: por eso, con «lado, lado, ángulo opuesto» hay que examinar siempre la ambigüedad."
    ]) +
    ejemplo("Sin solución y con una solución", "Con A = 40° y b = 10: ¿qué ocurre si a = 5? ¿Y si a = 12?", [
      "a = 5 &lt; h = 6,43: sen B = 10·0,6428/5 = 1,286 &gt; 1 → <b>no existe ningún triángulo</b>.",
      "a = 12 ≥ b = 10: sen B = 0,5357 → B = 32,39° (la otra opción, 147,61°, sumada a 40° da 187,61° &gt; 180°, no vale). <b>Un solo triángulo</b>."
    ]) +
    ojo("si el ángulo que buscas puede ser obtuso (si es opuesto al lado mayor, por ejemplo), no lo calcules con el seno: <b>usa el teorema del coseno</b>, que da el ángulo sin ambigüedad (el coseno de un obtuso sale negativo). Con el seno, siempre tendrías que decidir entre B y 180° − B.");

  // ---------------------------------------------------------------- 6. Teorema del coseno
  secciones[5] =
    "<h5>De dónde sale</h5>" +
    "<p>Coloca el triángulo con A en el origen y el lado c sobre el eje X. Entonces B = (c, 0) y, por la definición de seno y coseno, C = (b·cos A, b·sen A). La distancia entre B y C es el lado a:</p>" +
    "<p>a² = (b·cos A − c)² + (b·sen A)² = b²cos²A − 2bc·cos A + c² + b²sen²A = b²(cos²A + sen²A) − 2bc·cos A + c² = <b>b² + c² − 2bc·cos A</b>.</p>" +
    "<p>Las otras dos versiones salen girando las letras: b² = a² + c² − 2ac·cos B y c² = a² + b² − 2ab·cos C. Si A = 90° el último término se anula y queda Pitágoras.</p>" +
    "<h5>Usos</h5>" +
    "<ul><li><b>Tercer lado</b> conociendo dos lados y el ángulo que forman (LAL).</li>" +
    "<li><b>Un ángulo</b> conociendo los tres lados (LLL), despejando: <b>cos A = (b² + c² − a²)/(2bc)</b>.</li></ul>" +
    "<p>Una propiedad curiosa: el signo de b² + c² − a² dice qué tipo de ángulo es A. Si b² + c² &gt; a², cos A &gt; 0 y A es <b>agudo</b>; si es igual, A es recto (Pitágoras); si b² + c² &lt; a², A es <b>obtuso</b>. Así, un triángulo de lados 4, 5 y 8 es obtusángulo porque 4² + 5² = 41 &lt; 64 = 8².</p>" +
    ejemplo("Tres lados", "Resuelve el triángulo de lados a = 7, b = 5 y c = 8.", [
      "El ángulo A (frente a 7): cos A = (b² + c² − a²)/(2bc) = (25 + 64 − 49)/80 = 40/80 = 0,5 → <b>A = 60°</b>.",
      "El ángulo B (frente a 5): cos B = (a² + c² − b²)/(2ac) = (49 + 64 − 25)/112 = 88/112 = 0,7857 → <b>B = 38,21°</b>.",
      "El tercer ángulo: C = 180° − 60° − 38,21° = <b>81,79°</b>.",
      "Comprobación: el ángulo mayor (81,79°) está frente al lado mayor (8) ✓."
    ]) +
    ejemplo("Dos lados y el ángulo entre ellos", "Resuelve el triángulo con b = 7, c = 5 y A = 60°.", [
      "a² = 49 + 25 − 2·7·5·cos 60° = 74 − 70·0,5 = 39 → <b>a = √39 ≈ 6,24</b>.",
      "Para el siguiente ángulo, el coseno otra vez: cos B = (a² + c² − b²)/(2ac) = (39 + 25 − 49)/(2·6,245·5) = 0,2402 → <b>B = 76,10°</b>.",
      "<b>C = 180° − 60° − 76,10° = 43,90°</b>. Comprobación con el teorema del seno: c/sen C = 5/0,6934 = 7,21 y a/sen A = 6,245/0,8660 = 7,21 ✓."
    ]) +
    "<p>Prueba con tus propios datos. El resolutor elige el teorema que corresponde a los datos y muestra los pasos con todos los números:</p>" +
    w("triangulo") +
    ojo("después de hallar el tercer lado con el coseno, <b>sigue con el coseno</b> (o con el seno, sólo si el ángulo que buscas es seguro agudo, es decir, si no es el opuesto al lado mayor). Y no olvides la raíz cuadrada: el teorema da a², no a.");

  // ---------------------------------------------------------------- 7. Área
  secciones[6] =
    "<h5>Todas las fórmulas del área de un triángulo</h5>" +
    tabla(["Datos", "Fórmula", "Ejemplo"], [
      ["base y altura", "½·b·h", "base 10, altura 4 → 20"],
      ["dos lados y el ángulo entre ellos", "½·b·c·sen A", "lados 8 y 11, ángulo 40° → ½·88·0,6428 = 28,28"],
      ["los tres lados (Herón)", "√( s(s−a)(s−b)(s−c) ),  s = (a+b+c)/2", "13, 14, 15 → s = 21 → √(21·8·7·6) = 84"],
      ["los tres lados y el radio R", "a·b·c / (4R)", "—"]
    ]) +
    "<p>La fórmula ½·b·c·sen A sale de la básica: la altura sobre el lado c es h = b·sen A, así que ½·c·h = ½·b·c·sen A. La de Herón se obtiene del teorema del coseno y es útil cuando no tienes ningún ángulo.</p>" +
    ejemplo("Dos fórmulas, mismo resultado", "Calcula el área del triángulo de lados 7, 5 y 8 de dos maneras.", [
      "Con el ángulo A = 60° entre los lados b = 5 y c = 8: S = ½·5·8·sen 60° = 20·(√3/2) = <b>10√3 ≈ 17,32</b>.",
      "Con Herón: s = (7 + 5 + 8)/2 = 10 → S = √(10·3·5·2) = √300 = 10√3 ≈ 17,32 ✓."
    ]) +
    ejemplo("Un paralelogramo y un hexágono", "Calcula el área de un paralelogramo de lados 6 y 9 que forman 50°, y la de un hexágono regular de lado 6.", [
      "Un paralelogramo se divide en dos triángulos iguales: S = 2·½·6·9·sen 50° = 54·0,7660 = <b>41,37</b>.",
      "Un hexágono regular se divide en 6 triángulos equiláteros de lado 6: cada uno tiene área ½·6·6·sen 60° = 18·(√3/2) = 9√3. En total <b>54√3 ≈ 93,53</b>."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Aplicaciones: alturas, distancias y navegación",
      html:
        "<p>Los topógrafos, los marinos y los arquitectos llevan siglos calculando distancias que no se pueden medir con una cinta: la altura de una torre, la anchura de un río, la distancia entre dos barcos. La idea es siempre la misma: <b>medir un ángulo y una distancia fácil, y calcular el resto con un triángulo</b>.</p>" +
        ejemplo("Una sombra", "Un poste de 3 m proyecta su sombra cuando el Sol está a 40° sobre el horizonte. ¿Cuánto mide la sombra?", [
          "El poste y la sombra son los catetos de un triángulo rectángulo; el ángulo en el extremo de la sombra es 40°.",
          "tan 40° = 3/sombra → sombra = 3/tan 40° = 3/0,8391 = <b>3,58 m</b>."
        ]) +
        ejemplo("Altura de una torre con dos observaciones", "Desde un punto del suelo se ve la cima de una torre bajo un ángulo de elevación de 30°. Acercándose 50 m hacia la torre, el ángulo pasa a ser 45°. ¿Qué altura tiene la torre?", [
          "Sea h la altura y x la distancia desde el segundo punto (el más cercano) a la base. Entonces tan 45° = h/x → x = h.",
          "Desde el primer punto la distancia es x + 50: tan 30° = h/(x + 50) → h/(h + 50) = 1/√3.",
          "√3·h = h + 50 → h(√3 − 1) = 50 → h = 50/(√3 − 1) = 50/0,7321 = <b>68,30 m</b>.",
          "Observa que no hizo falta conocer la distancia a la base: con <b>dos ángulos y la distancia entre las dos observaciones</b> se resuelve."
        ]) +
        ejemplo("Distancia a un punto inaccesible", "Para medir la distancia a un punto C al otro lado de un río, se miden en la orilla dos puntos A y B separados 100 m, y los ángulos CAB = 62° y CBA = 75°. Calcula AC y BC.", [
          "Es el caso ALA: el tercer ángulo, en C, vale 180° − 62° − 75° = 43°.",
          "Teorema del seno: AC/sen 75° = BC/sen 62° = 100/sen 43°. Como 100/sen 43° = 100/0,6820 = 146,63:",
          "AC = 146,63·sen 75° = <b>141,63 m</b> y BC = 146,63·sen 62° = <b>129,46 m</b>."
        ]) +
        ejemplo("Dos barcos que salen del mismo puerto", "Dos barcos salen a la vez de un puerto con rumbos que forman 80°, a 12 y 16 km/h. ¿A qué distancia están al cabo de 3 horas?", [
          "En 3 horas recorren 36 km y 48 km: son dos lados de un triángulo con el ángulo de 80° entre ellos (LAL).",
          "d² = 36² + 48² − 2·36·48·cos 80° = 1296 + 2304 − 3456·0,17365 = 3600 − 600,13 = 2999,87.",
          "d = √2999,87 = <b>54,77 km</b>."
        ]) +
        ejemplo("Un acantilado", "Desde lo alto de un acantilado de 80 m se ven dos barcos alineados con la base, con ángulos de depresión de 25° y 40°. ¿Qué distancia hay entre ellos?", [
          "El ángulo de depresión desde arriba es igual al ángulo de elevación desde el barco hacia arriba (ángulos alternos internos). Distancia a la base: 80/tan 25° = 171,55 m (el barco más lejano) y 80/tan 40° = 95,34 m (el más cercano).",
          "Separación: 171,55 − 95,34 = <b>76,2 m</b>."
        ]) +
        ojo("un fallo clásico: usar como ángulo el que forma la visual con la <b>vertical</b> en vez de con la horizontal. Lee con cuidado «elevación/depresión» (siempre respecto de la horizontal) y haz un dibujo antes de elegir sen, cos o tan.")
    },
    {
      h: "9. ¿Qué teorema uso? Protocolo para resolver cualquier triángulo",
      html:
        "<p>Para elegir herramienta, fíjate en <b>qué datos tienes</b>. Hay cuatro situaciones; la clave es ver si conoces una «pareja» lado-ángulo opuesto:</p>" +
        tabla(["Datos", "Nombre", "Primer paso", "Soluciones"], [
          ["tres lados", "LLL", "teorema del coseno para el ángulo mayor", "una (si cumple la desigualdad triangular)"],
          ["dos lados y el ángulo entre ellos", "LAL", "teorema del coseno para el tercer lado", "una"],
          ["dos ángulos y un lado", "ALA / AAL", "tercer ángulo = 180° − A − B; después teorema del seno", "una"],
          ["dos lados y un ángulo opuesto a uno", "LLA", "teorema del seno (¡caso ambiguo!)", "0, 1 o 2"],
          ["tres ángulos", "AAA", "no basta: hay infinitos triángulos semejantes", "infinitas"]
        ]) +
        "<p>Un detalle práctico: en un triángulo, el <b>lado mayor está frente al ángulo mayor</b> y el menor frente al menor. Es una comprobación rápida de todos los resultados.</p>" +
        "<p>Ordena los pasos para resolver el triángulo con a = 7, b = 5 y c = 8:</p>" +
        w("orden", "proceso") +
        "<p>Y ahora decide el teorema para cada enunciado:</p>" +
        w("clasificar", "cual")
    },
    {
      h: "10. Los valores notables, para que se queden",
      html:
        "<p>Con una semana de práctica estos valores se saben solos. Prueba con las dos actividades de repaso: la primera es una clasificación (con ángulos que hay que reducir) y la segunda, tarjetas de «ida y vuelta».</p>" +
        w("clasificar", "notables") + w("tarjetas", "tj1")
    },
    {
      h: "11. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "12. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación para saber si el tema está firme.</p>" + w("quiz", "quiz1")
    }
  ];

  var datos = {
    proceso: {
      titulo: "Resolver el triángulo a = 7, b = 5, c = 8",
      consigna: "Ordena los pasos de la resolución.",
      items: [
        { t: "Identificar los datos: tres lados (caso LLL)", nota: "No hay ningún ángulo conocido, así que el teorema del seno no se puede empezar." },
        { t: "Teorema del coseno para el ángulo A: cos A = (b² + c² − a²)/(2bc) = 0,5", nota: "Se puede empezar por cualquiera; lo mejor es el ángulo opuesto al lado mayor." },
        { t: "A = 60°", nota: "arccos(0,5) = 60°." },
        { t: "Teorema del coseno para B: cos B = (a² + c² − b²)/(2ac) = 0,7857 → B = 38,21°" },
        { t: "C = 180° − 60° − 38,21° = 81,79°", nota: "El último ángulo sale restando de 180°." },
        { t: "Comprobar: el ángulo mayor (81,79°) está frente al lado mayor (8)", nota: "Una comprobación rápida que detecta errores de cálculo." }
      ]
    },
    cual: {
      titulo: "¿Qué teorema necesito primero?",
      consigna: "Toca un enunciado y después el teorema con el que empezarías.",
      categorias: ["Teorema del coseno", "Teorema del seno", "Basta Pitágoras o las razones del triángulo rectángulo"],
      items: [
        { t: "Dos lados (7 y 5) y el ángulo entre ellos (60°); piden el tercer lado", c: 0 },
        { t: "Los tres lados (4, 6 y 9); piden un ángulo", c: 0 },
        { t: "Dos lados (8 y 6) y el ángulo que forman (110°); piden el tercer lado", c: 0 },
        { t: "Dos ángulos (40° y 65°) y un lado (12); piden los otros lados", c: 1 },
        { t: "a = 9, A = 35° y b = 12; piden el ángulo B", c: 1 },
        { t: "Un lado y su ángulo opuesto (a = 10 y A = 30°); piden el radio circunscrito", c: 1 },
        { t: "Triángulo con un ángulo recto: catetos 5 y 12; piden la hipotenusa", c: 2 },
        { t: "Escalera de 5 m apoyada formando 65° con el suelo; piden la altura que alcanza", c: 2 }
      ]
    },
    notables: {
      titulo: "¿Cuánto vale?",
      consigna: "Toca una razón y después su valor exacto. Algunas requieren reducir al primer cuadrante.",
      categorias: ["1/2", "√2/2", "√3/2", "√3/3", "1", "√3", "−1/2", "−√3/2"],
      items: [
        { t: "sen 30°", c: 0 }, { t: "cos 60°", c: 0 }, { t: "sen 150°", c: 0 },
        { t: "sen 45°", c: 1 }, { t: "cos 315°", c: 1 },
        { t: "sen 60°", c: 2 }, { t: "cos 30°", c: 2 }, { t: "sen 120°", c: 2 },
        { t: "tan 30°", c: 3 },
        { t: "tan 45°", c: 4 }, { t: "tan 225°", c: 4 }, { t: "sen 90°", c: 4 },
        { t: "tan 60°", c: 5 }, { t: "tan 240°", c: 5 },
        { t: "sen 210°", c: 6 }, { t: "cos 120°", c: 6 },
        { t: "cos 150°", c: 7 }, { t: "cos 210°", c: 7 }, { t: "sen 240°", c: 7 }
      ]
    },
    tj1: {
      titulo: "Trigonometría: ida y vuelta",
      cartas: [
        { a: "Definición de sen α, cos α y tan α en el triángulo rectángulo", b: "sen α = opuesto/hipotenusa · cos α = adyacente/hipotenusa · tan α = opuesto/adyacente (SOH-CAH-TOA)." },
        { a: "Relación fundamental", b: "sen²α + cos²α = 1. Y de ella: 1 + tan²α = 1/cos²α." },
        { a: "Un radián", b: "Es el ángulo cuyo arco mide lo mismo que el radio. π rad = 180° ⇒ 1 rad ≈ 57,3°." },
        { a: "Longitud de un arco y área de un sector (θ en radianes)", b: "s = θ·r y A = ½·r²·θ." },
        { a: "¿Qué signo tienen sen, cos y tan en cada cuadrante?", b: "I: todas +. II: sólo sen +. III: sólo tan +. IV: sólo cos +." },
        { a: "sen 30°, sen 45°, sen 60°", b: "1/2, √2/2, √3/2 (los cosenos, en orden inverso)." },
        { a: "tan 30°, tan 45°, tan 60°", b: "√3/3, 1, √3." },
        { a: "Reducción al primer cuadrante: 180° − α, 180° + α, 360° − α", b: "sen(180° − α) = sen α, cos(180° − α) = −cos α · sen(180° + α) = −sen α, cos(180° + α) = −cos α · sen(360° − α) = −sen α, cos(360° − α) = cos α." },
        { a: "Complementarios", b: "sen(90° − α) = cos α y cos(90° − α) = sen α." },
        { a: "Teorema del seno", b: "a/sen A = b/sen B = c/sen C = 2R (R = radio de la circunferencia circunscrita)." },
        { a: "Teorema del coseno", b: "a² = b² + c² − 2bc·cos A. Despejando: cos A = (b² + c² − a²)/(2bc)." },
        { a: "Caso ambiguo (a, b, A)", b: "Con A agudo y h = b·sen A: a &lt; h → 0; a = h → 1; h &lt; a &lt; b → 2; a ≥ b → 1." },
        { a: "Área de un triángulo con trigonometría", b: "S = ½·b·c·sen A (dos lados y el ángulo entre ellos). Herón: S = √(s(s−a)(s−b)(s−c))." },
        { a: "Resolver un triángulo: cuándo seno y cuándo coseno", b: "Hay un lado y su ángulo opuesto conocidos → seno. Dos lados y el ángulo entre ellos, o los tres lados → coseno." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula sen 30° con la calculadora en modo radianes y obtiene −0,988. ¿Qué ha hecho mal?",
          op: ["Nada: sen 30° vale −0,988", "La calculadora estaba en RAD; en grados (DEG) sale 0,5", "Debía usar cos", "El seno de 30° es 0,866"], ok: 1,
          porque: "En modo RAD, «30» se interpreta como 30 radianes. En modo DEG, sen 30° = 0,5. Mira siempre el indicador D/DEG de la pantalla." },
        { q: "Un alumno escribe sen 150° = −sen 30°. ¿Qué falla?",
          op: ["Nada", "150° es del 2.º cuadrante, donde el seno es positivo: sen 150° = +sen 30° = 1/2", "Debía ser cos 30°", "Debía ser −cos 30°"], ok: 1,
          porque: "150° = 180° − 30° y el seno es positivo en el 2.º cuadrante. El signo menos aparece con 180° + 30° = 210° (3.er cuadrante)." },
        { q: "Si sen α = 3/5 y α está en el 2.º cuadrante, un alumno afirma cos α = +4/5. ¿Qué falla?",
          op: ["Nada", "En el 2.º cuadrante el coseno es negativo: cos α = −4/5", "El seno sería 4/5", "cos α = 2/5"], ok: 1,
          porque: "La raíz cuadrada da ±4/5 y el cuadrante decide el signo. En el 2.º cuadrante la abscisa del punto es negativa." },
        { q: "Un alumno resuelve un triángulo con a = 5, b = 10 y A = 40° y calcula sen B = 1,286, pero escribe B = 90° «porque es lo máximo». ¿Qué falla?",
          op: ["Nada", "Un seno no puede valer más de 1: ese triángulo no existe", "Debía usar la tangente", "B = 51,4°"], ok: 1,
          porque: "El seno de un ángulo vale como máximo 1. Si sale mayor, el lado a es demasiado corto: el caso es el de «0 soluciones» del caso ambiguo (a &lt; h = 6,43)." },
        { q: "En un triángulo con A = 100°, un alumno halla B con el teorema del seno y obtiene 40°. ¿Cuándo hay que sospechar?",
          op: ["Nunca", "Si B es opuesto al lado mayor o ya hay un ángulo obtuso, el seno puede dar un ángulo equivocado: mejor el coseno", "Siempre que A sea menor de 90°", "Cuando el resultado es exacto"], ok: 1,
          porque: "El seno de un ángulo y el de su suplementario son iguales, así que la calculadora no distingue un agudo de un obtuso. El coseno sí: el de un obtuso sale negativo." },
        { q: "Un alumno escribe a² = b² + c² − 2bc·sen A. ¿Qué falla?",
          op: ["Nada", "El teorema del coseno lleva cos A: a² = b² + c² − 2bc·cos A", "El signo debería ser +", "Falta una raíz cuadrada"], ok: 1,
          porque: "Si A = 90°, cos A = 0 y sale Pitágoras; con sen A saldría 2bc: ¡un absurdo! Comprueba siempre con A = 90°." },
        { q: "Un alumno convierte 150° a radianes y escribe 150π. ¿Qué falla?",
          op: ["Nada", "Hay que multiplicar por π/180: 150°·π/180 = 5π/6 rad", "150° son 3π rad", "Son 150/π rad"], ok: 1,
          porque: "El factor de conversión es π/180 (porque 180° = π rad). 150π sería dar 75 vueltas." },
        { q: "Un alumno dice que, como sen 30° = 1/2, entonces sen 60° = 2·sen 30° = 1. ¿Qué falla?",
          op: ["Nada", "El seno no es proporcional al ángulo: sen 60° = √3/2 ≈ 0,866", "sen 60° = 1/4", "sen 60° = 0,5"], ok: 1,
          porque: "sen(2α) ≠ 2·sen α. La razón entre ángulo y seno no es constante: el seno crece cada vez más despacio al acercarse a 90°." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "En un triángulo rectángulo, el cateto opuesto a α mide 3 y la hipotenusa 5. ¿Cuánto vale tan α?",
          op: ["3/4", "3/5", "4/5", "4/3"], ok: 0,
          porque: "El otro cateto mide √(25 − 9) = 4, así que tan α = opuesto/adyacente = 3/4." },
        { q: "¿Cuántos radianes son 135°?",
          op: ["3π/4", "2π/3", "5π/6", "π/4"], ok: 0,
          porque: "135·π/180 = 3π/4." },
        { q: "El valor exacto de cos 210° es…",
          op: ["−√3/2", "√3/2", "−1/2", "1/2"], ok: 0,
          porque: "210° = 180° + 30°: cos 210° = −cos 30° = −√3/2." },
        { q: "Si cos α = 0,6 y α es agudo, tan α vale…",
          op: ["4/3", "3/4", "0,8", "5/3"], ok: 0,
          porque: "sen α = √(1 − 0,36) = 0,8 y tan α = 0,8/0,6 = 4/3." },
        { q: "Un ángulo de 1110° tiene las mismas razones que…",
          op: ["30°", "150°", "210°", "60°"], ok: 0,
          porque: "1110° − 3·360° = 30°." },
        { q: "En un triángulo, A = 30°, a = 10. ¿Cuánto vale el radio de la circunferencia circunscrita?",
          op: ["10", "20", "5", "10√3"], ok: 0,
          porque: "2R = a/sen A = 10/0,5 = 20 → R = 10." },
        { q: "Un triángulo de lados 4, 5 y 8 es…",
          op: ["obtusángulo", "acutángulo", "rectángulo", "no existe"], ok: 0,
          porque: "4² + 5² = 41 &lt; 64 = 8²: el ángulo opuesto al lado 8 es obtuso. Existe, porque 8 &lt; 4 + 5." },
        { q: "Con A = 40°, b = 10 y a = 8, ¿cuántos triángulos existen?",
          op: ["2", "0", "1", "3"], ok: 0,
          porque: "h = 10·sen 40° = 6,43 &lt; 8 &lt; 10 = b: dos triángulos." },
        { q: "¿Cuál es el área de un triángulo con dos lados de 8 y 11 que forman 40°?",
          op: ["28,3", "44", "56,6", "34,0"], ok: 0,
          porque: "S = ½·8·11·sen 40° = 44·0,6428 = 28,28." },
        { q: "Desde un punto a 30 m de la base de una torre, el ángulo de elevación a su cima es de 60°. La torre mide…",
          op: ["52 m", "30 m", "17,3 m", "60 m"], ok: 0,
          porque: "h = 30·tan 60° = 30·√3 = 51,96 ≈ 52 m." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "g1", nivel: 1,
      enunciado: "Los catetos de un triángulo rectángulo miden 5 y 12. Calcula la hipotenusa y la tangente del ángulo α opuesto al cateto de 5.",
      check: [{ tipo: "num", etiqueta: "hipotenusa =", valor: 13 }, { tipo: "num", etiqueta: "tan α =", valor: 5 / 12, tol: 0.002, ph: "p/q o decimal" }],
      pistas: ["Pitágoras: h² = 5² + 12².", "tan α = opuesto/adyacente."],
      pasos: ["h = √(25 + 144) = √169 = 13.", "tan α = 5/12 ≈ 0,4167 (α ≈ 22,62°)."],
      resultado: "hipotenusa 13 · tan α = 5/12" },
    { id: "g2", nivel: 1,
      enunciado: "Si sen α = 0,6 y α es un ángulo agudo, calcula cos α y tan α.",
      check: [{ tipo: "num", etiqueta: "cos α =", valor: 0.8 }, { tipo: "num", etiqueta: "tan α =", valor: 0.75 }],
      pistas: ["sen²α + cos²α = 1."],
      pasos: ["cos²α = 1 − 0,36 = 0,64 → cos α = 0,8 (agudo: positivo).", "tan α = 0,6/0,8 = 0,75."],
      resultado: "cos α = 0,8 · tan α = 0,75" },
    { id: "g3", nivel: 1,
      enunciado: "Pasa 135° a radianes y 5π/6 rad a grados.",
      check: [{ tipo: "num", etiqueta: "135° =", valor: 3 * Math.PI / 4, unidad: "rad", tol: 0.002, ph: "decimal (o 3pi/4)" }, { tipo: "num", etiqueta: "5π/6 rad =", valor: 150, unidad: "°" }],
      pistas: ["grados × π/180 = radianes. radianes × 180/π = grados."],
      pasos: ["135·π/180 = 3π/4 ≈ 2,356 rad.", "5π/6·180/π = 150°."],
      resultado: "3π/4 rad y 150°" },
    { id: "g4", nivel: 1,
      enunciado: "Calcula el valor exacto de sen 60°·cos 30° + cos 60°·sen 30°.",
      check: { tipo: "num", etiqueta: "valor =", valor: 1 },
      pistas: ["Sustituye los valores notables."],
      pasos: ["(√3/2)·(√3/2) + (1/2)·(1/2) = 3/4 + 1/4 = 1.", "(Es el seno de 60° + 30° = 90°: la fórmula del Tema 5.)"],
      resultado: "1" },
    { id: "g5", nivel: 1,
      enunciado: "El ángulo 200° está en…",
      check: { tipo: "opcion", etiqueta: "Cuadrante y signos", opciones: ["3.er cuadrante: sen y cos negativos", "2.º cuadrante: sen positivo y cos negativo", "3.er cuadrante: sen positivo y cos negativo", "4.º cuadrante: sen negativo y cos positivo"], ok: 0 },
      pistas: ["Los cuadrantes: 0°–90°, 90°–180°, 180°–270°, 270°–360°."],
      pasos: ["200° está entre 180° y 270°: 3.er cuadrante.", "Allí el punto de la circunferencia tiene x e y negativos: cos y sen negativos (tan positiva)."],
      resultado: "3.er cuadrante: sen y cos negativos" },
    { id: "g6", nivel: 1,
      enunciado: "Calcula sen 150°.",
      check: { tipo: "num", etiqueta: "sen 150° =", valor: 0.5, ph: "decimal o 1/2" },
      pistas: ["150° = 180° − 30°."],
      pasos: ["sen(180° − α) = sen α → sen 150° = sen 30° = 1/2."],
      resultado: "1/2" },
    { id: "g7", nivel: 1,
      enunciado: "Desde un punto a 30 m de la base de una torre, el ángulo de elevación de su cima es 60°. ¿Qué altura tiene la torre?",
      check: { tipo: "num", etiqueta: "altura =", valor: 51.96, unidad: "m" },
      pistas: ["Cateto adyacente 30 m, ángulo 60°, se pide el opuesto."],
      pasos: ["tan 60° = h/30 → h = 30·tan 60° = 30·√3 = 51,96 m."],
      resultado: "≈ 52 m" },
    { id: "g8", nivel: 1,
      enunciado: "Si cos α = 0,6 y α es agudo, calcula sen α.",
      check: { tipo: "num", etiqueta: "sen α =", valor: 0.8 },
      pistas: ["sen²α = 1 − cos²α."],
      pasos: ["sen²α = 1 − 0,36 = 0,64 → sen α = 0,8."],
      resultado: "0,8" },
    { id: "g9", nivel: 1,
      enunciado: "Una escalera de 4 m forma 70° con el suelo. ¿A qué altura de la pared llega y a qué distancia está su pie de la pared?",
      check: [{ tipo: "num", etiqueta: "altura =", valor: 3.76, unidad: "m" }, { tipo: "num", etiqueta: "distancia =", valor: 1.37, unidad: "m" }],
      pistas: ["La escalera es la hipotenusa."],
      pasos: ["Altura: 4·sen 70° = 4·0,9397 = 3,76 m.", "Distancia: 4·cos 70° = 4·0,3420 = 1,37 m."],
      resultado: "3,76 m y 1,37 m" },
    { id: "g10", nivel: 1,
      enunciado: "En una circunferencia de 5 cm de radio, un ángulo central mide 2 rad. Calcula la longitud del arco y el área del sector.",
      check: [{ tipo: "num", etiqueta: "arco =", valor: 10, unidad: "cm" }, { tipo: "num", etiqueta: "área =", valor: 25, unidad: "cm²" }],
      pistas: ["s = θ·r y A = ½·r²·θ (θ en radianes)."],
      pasos: ["s = 2·5 = 10 cm.", "A = ½·25·2 = 25 cm²."],
      resultado: "arco 10 cm · sector 25 cm²" },
    // ================= ★★ medio =================
    { id: "g11", nivel: 2,
      enunciado: "Si sen α = 3/5 y α está en el 2.º cuadrante, calcula cos α y tan α.",
      check: [{ tipo: "num", etiqueta: "cos α =", valor: -0.8 }, { tipo: "num", etiqueta: "tan α =", valor: -0.75 }],
      pistas: ["En el 2.º cuadrante el coseno es negativo."],
      pasos: ["cos²α = 1 − 9/25 = 16/25 → cos α = −4/5 (2.º cuadrante).", "tan α = (3/5)/(−4/5) = −3/4."],
      resultado: "cos α = −4/5 · tan α = −3/4" },
    { id: "g12", nivel: 2,
      enunciado: "Si tan α = 2 y α está en el 3.er cuadrante, calcula sen α y cos α (decimales).",
      check: [{ tipo: "num", etiqueta: "sen α =", valor: -0.8944, tol: 0.002 }, { tipo: "num", etiqueta: "cos α =", valor: -0.4472, tol: 0.002 }],
      pistas: ["1 + tan²α = 1/cos²α.", "En el 3.er cuadrante, sen y cos son negativos."],
      pasos: ["1 + 4 = 5 = 1/cos²α → cos²α = 1/5 → cos α = −1/√5 ≈ −0,447.", "sen α = tan α·cos α = 2·(−1/√5) = −2/√5 ≈ −0,894.", "Comprobación: 0,2 + 0,8 = 1."],
      resultado: "cos α ≈ −0,447 · sen α ≈ −0,894" },
    { id: "g13", nivel: 2,
      enunciado: "Calcula el valor exacto de cos 210°·sen 300° (da el resultado como decimal).",
      check: { tipo: "num", etiqueta: "valor =", valor: 0.75, ph: "decimal o 3/4" },
      pistas: ["210° = 180° + 30° y 300° = 360° − 60°."],
      pasos: ["cos 210° = −cos 30° = −√3/2. sen 300° = −sen 60° = −√3/2.", "Producto: (−√3/2)(−√3/2) = 3/4 = 0,75."],
      resultado: "3/4" },
    { id: "g14", nivel: 2,
      enunciado: "Calcula sen(11π/6) y cos(7π/3).",
      check: [{ tipo: "num", etiqueta: "sen(11π/6) =", valor: -0.5 }, { tipo: "num", etiqueta: "cos(7π/3) =", valor: 0.5 }],
      pistas: ["11π/6 = 2π − π/6. 7π/3 = 2π + π/3."],
      pasos: ["11π/6 es del 4.º cuadrante: sen = −sen(π/6) = −1/2.", "7π/3 − 2π = π/3: cos(7π/3) = cos(π/3) = 1/2."],
      resultado: "−1/2 y 1/2" },
    { id: "g15", nivel: 2,
      enunciado: "Halla los ángulos x entre 0° y 360° que cumplen sen x = 1/2.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 150], unidad: "°" },
      pistas: ["En una vuelta hay dos ángulos con el mismo seno: el de referencia y 180° − el de referencia."],
      pasos: ["sen 30° = 1/2, ángulo de referencia 30°.", "El seno también es positivo en el 2.º cuadrante: x = 180° − 30° = 150°."],
      resultado: "x = 30° y x = 150°" },
    { id: "g16", nivel: 2,
      enunciado: "En un triángulo A = 40°, B = 65° y c = 12. Calcula los lados a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 7.99 }, { tipo: "num", etiqueta: "b =", valor: 11.26 }],
      pistas: ["C = 180° − A − B.", "Teorema del seno con la pareja c, C."],
      pasos: ["C = 75°. c/sen C = 12/0,9659 = 12,423.", "a = 12,423·sen 40° = 7,99. b = 12,423·sen 65° = 11,26."],
      resultado: "a ≈ 7,99 · b ≈ 11,26" },
    { id: "g17", nivel: 2,
      enunciado: "En un triángulo b = 9, c = 6 y el ángulo que forman es A = 50°. Calcula el lado a.",
      check: { tipo: "num", etiqueta: "a =", valor: 6.8977 },
      pistas: ["Teorema del coseno: a² = b² + c² − 2bc·cos A."],
      pasos: ["a² = 81 + 36 − 2·9·6·cos 50° = 117 − 108·0,6428 = 117 − 69,42 = 47,58.", "a = √47,58 ≈ 6,90."],
      resultado: "a ≈ 6,90" },
    { id: "g18", nivel: 2,
      enunciado: "Los lados de un triángulo miden 6, 7 y 9. Calcula el ángulo mayor.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 87.27, unidad: "°" },
      pistas: ["El ángulo mayor es el opuesto al lado mayor (9).", "cos A = (b² + c² − a²)/(2bc)."],
      pasos: ["cos A = (36 + 49 − 81)/(2·6·7) = 4/84 = 0,0476.", "A = arccos(0,0476) = 87,27°."],
      resultado: "≈ 87,27°" },
    { id: "g19", nivel: 2,
      enunciado: "Calcula el área de un triángulo con dos lados de 8 y 11 que forman un ángulo de 40°.",
      check: { tipo: "num", etiqueta: "área =", valor: 28.28 },
      pistas: ["S = ½·b·c·sen A."],
      pasos: ["S = ½·8·11·sen 40° = 44·0,6428 = 28,28."],
      resultado: "≈ 28,28" },
    { id: "g20", nivel: 2,
      enunciado: "Calcula el área de un triángulo de lados 13, 14 y 15 con la fórmula de Herón.",
      check: { tipo: "num", etiqueta: "área =", valor: 84 },
      pistas: ["s = (13 + 14 + 15)/2 = 21."],
      pasos: ["S = √(21·(21 − 13)·(21 − 14)·(21 − 15)) = √(21·8·7·6) = √7056 = 84."],
      resultado: "84" },
    { id: "g21", nivel: 2,
      enunciado: "Desde un punto del suelo se ve la cima de una torre con ángulo de elevación 30°. Acercándose 50 m, el ángulo es 45°. ¿Qué altura tiene la torre?",
      check: { tipo: "num", etiqueta: "altura =", valor: 68.3, unidad: "m" },
      pistas: ["Con 45° la distancia a la base es igual a la altura h.", "tan 30° = h/(h + 50)."],
      pasos: ["tan 45° = h/x → x = h. tan 30° = h/(h + 50) = 1/√3.", "√3·h = h + 50 → h = 50/(√3 − 1) = 68,30 m."],
      resultado: "≈ 68,30 m" },
    { id: "g22", nivel: 2,
      enunciado: "Tres pueblos A, B y C. De A a B hay 12 km, de B a C hay 9 km y el ángulo en B es 110°. ¿Qué distancia hay entre A y C?",
      check: { tipo: "num", etiqueta: "AC =", valor: 17.29, unidad: "km" },
      pistas: ["Dos lados y el ángulo que forman: teorema del coseno."],
      pasos: ["AC² = 12² + 9² − 2·12·9·cos 110° = 144 + 81 + 216·0,3420 = 225 + 73,88 = 298,88.", "AC = 17,29 km."],
      resultado: "≈ 17,29 km" },
    { id: "g23", nivel: 2,
      enunciado: "Calcula el área de un paralelogramo de lados 6 y 9 que forman 50°.",
      check: { tipo: "num", etiqueta: "área =", valor: 41.37 },
      pistas: ["Un paralelogramo son dos triángulos iguales."],
      pasos: ["S = 6·9·sen 50° = 54·0,7660 = 41,37."],
      resultado: "≈ 41,37" },
    { id: "g24", nivel: 2,
      enunciado: "Una carretera tiene una pendiente del 8 %. ¿Qué ángulo forma con la horizontal? Y una rampa de 10°, ¿qué pendiente tiene (en %)?",
      check: [{ tipo: "num", etiqueta: "ángulo =", valor: 4.57, unidad: "°" }, { tipo: "num", etiqueta: "pendiente =", valor: 17.63, unidad: "%" }],
      pistas: ["La pendiente es la tangente del ángulo."],
      pasos: ["tan α = 0,08 → α = arctan 0,08 = 4,57°.", "tan 10° = 0,1763 → 17,63 %."],
      resultado: "4,57° y 17,63 %" },
    // ================= ★★★ nivel PAU =================
    { id: "g25", nivel: 3,
      enunciado: "Resuelve el triángulo con a = 8, b = 10 y A = 40°. Indica cuántos triángulos hay y los dos valores posibles de c.",
      check: [{ tipo: "num", etiqueta: "nº de triángulos =", valor: 2 }, { tipo: "lista", etiqueta: "valores de c:", valores: [12.42, 2.9], tol: 0.01, ph: "dos valores" }],
      pistas: ["Calcula h = b·sen A y compáralo con a.", "sen B = b·sen A/a y mira B y 180° − B."],
      pasos: ["h = 10·sen 40° = 6,43 &lt; a = 8 &lt; b = 10 → dos triángulos.", "sen B = 0,8035 → B₁ = 53,46° o B₂ = 126,54°.", "C₁ = 86,54° → c₁ = 8·sen 86,54°/sen 40° = 12,42. C₂ = 13,46° → c₂ = 8·sen 13,46°/sen 40° = 2,90."],
      resultado: "dos triángulos: c = 12,42 y c = 2,90" },
    { id: "g26", nivel: 3,
      enunciado: "Con A = 40° y b = 10, ¿entre qué valores de a (opuesto a A) existen dos triángulos? Escribe el extremo inferior y el superior.",
      check: [{ tipo: "num", etiqueta: "extremo inferior =", valor: 6.428 }, { tipo: "num", etiqueta: "extremo superior =", valor: 10 }],
      pistas: ["La condición es h &lt; a &lt; b con h = b·sen A."],
      pasos: ["h = 10·sen 40° = 6,43. Para a &gt; h la circunferencia corta la base, y para a &lt; b los dos cortes quedan a la derecha de A.", "Dos triángulos si 6,43 &lt; a &lt; 10."],
      resultado: "6,43 &lt; a &lt; 10" },
    { id: "g27", nivel: 3,
      enunciado: "En un triángulo, a = 10 y A = 60°. Calcula el radio R de la circunferencia circunscrita.",
      check: { tipo: "num", etiqueta: "R =", valor: 5.7735 },
      pistas: ["a/sen A = 2R."],
      pasos: ["2R = 10/sen 60° = 10/(√3/2) = 20/√3 = 11,547.", "R = 10/√3 = 5,77."],
      resultado: "R = 10/√3 ≈ 5,77" },
    { id: "g28", nivel: 3,
      enunciado: "Demuestra el teorema del coseno: a² = b² + c² − 2bc·cos A.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Coloca el triángulo con A en el origen y B sobre el eje X: B = (c, 0)", p: 0.5 },
        { t: "Determina C = (b·cos A, b·sen A)", p: 0.5 },
        { t: "Escribe a² como la distancia al cuadrado entre B y C: (b·cos A − c)² + (b·sen A)²", p: 0.5 },
        { t: "Desarrolla y usa sen²A + cos²A = 1 para llegar a b² + c² − 2bc·cos A", p: 0.5 }
      ] },
      pasos: ["A = (0, 0), B = (c, 0) y C = (b·cos A, b·sen A).", "a² = |BC|² = (b·cos A − c)² + (b·sen A)².", "= b²cos²A − 2bc·cos A + c² + b²sen²A = b²(cos²A + sen²A) − 2bc·cos A + c².", "= b² + c² − 2bc·cos A."],
      resultado: "a² = b² + c² − 2bc·cos A" },
    { id: "g29", nivel: 3,
      enunciado: "Para medir la distancia a un punto C al otro lado de un río, se toman A y B en la orilla con AB = 100 m, y se miden CAB = 62° y CBA = 75°. Calcula AC y BC.",
      check: [{ tipo: "num", etiqueta: "AC =", valor: 141.63, unidad: "m" }, { tipo: "num", etiqueta: "BC =", valor: 129.46, unidad: "m" }],
      pistas: ["Ángulo en C = 180° − 62° − 75°.", "AB/sen C = AC/sen B = BC/sen A."],
      pasos: ["C = 43°. 100/sen 43° = 146,63.", "AC = 146,63·sen 75° = 141,63 m. BC = 146,63·sen 62° = 129,46 m."],
      resultado: "AC ≈ 141,63 m · BC ≈ 129,46 m" },
    { id: "g30", nivel: 3,
      enunciado: "Dos barcos salen de un puerto con rumbos que forman un ángulo de 80°, a 12 y 16 km/h. ¿A qué distancia están tras 3 horas?",
      check: { tipo: "num", etiqueta: "distancia =", valor: 54.77, unidad: "km" },
      pistas: ["Recorren 36 km y 48 km: dos lados con el ángulo entre ellos."],
      pasos: ["d² = 36² + 48² − 2·36·48·cos 80° = 3600 − 3456·0,17365 = 2999,87.", "d = 54,77 km."],
      resultado: "≈ 54,77 km" },
    { id: "g31", nivel: 3,
      enunciado: "Un triángulo isósceles tiene dos lados iguales de 10 cm y un ángulo de 36° en el vértice desigual. Calcula la base y la altura sobre ella.",
      check: [{ tipo: "num", etiqueta: "base =", valor: 6.18, unidad: "cm" }, { tipo: "num", etiqueta: "altura =", valor: 9.51, unidad: "cm" }],
      pistas: ["La altura sobre la base lo divide en dos triángulos rectángulos con ángulo de 18°."],
      pasos: ["Cada mitad: hipotenusa 10 y ángulo 18°. Media base = 10·sen 18° = 3,09 → base = 6,18 cm.", "Altura = 10·cos 18° = 9,51 cm.", "(Curiosidad: 10/6,18 = 1,618, el número áureo.)"],
      resultado: "base ≈ 6,18 cm · altura ≈ 9,51 cm" },
    { id: "g32", nivel: 3,
      enunciado: "Desde lo alto de un acantilado de 80 m se ven dos barcos alineados con su base. Los ángulos de depresión son 25° y 40°. ¿Qué distancia hay entre los barcos?",
      check: { tipo: "num", etiqueta: "distancia =", valor: 76.22, unidad: "m" },
      pistas: ["Cada barco forma un triángulo rectángulo con la base y la cima."],
      pasos: ["Barco lejano: 80/tan 25° = 171,55 m. Barco cercano: 80/tan 40° = 95,34 m.", "Separación = 171,55 − 95,34 = 76,2 m."],
      resultado: "≈ 76,2 m" },
    { id: "g33", nivel: 3,
      enunciado: "Calcula el área de un hexágono regular de lado 6 cm.",
      check: { tipo: "num", etiqueta: "área =", valor: 93.53, unidad: "cm²" },
      pistas: ["Se divide en 6 triángulos equiláteros."],
      pasos: ["Cada triángulo: ½·6·6·sen 60° = 18·(√3/2) = 9√3.", "Área = 6·9√3 = 54√3 ≈ 93,53 cm²."],
      resultado: "54√3 ≈ 93,53 cm²" },
    { id: "g34", nivel: 3,
      enunciado: "En un triángulo rectángulo de hipotenusa 10 se cumple sen α·cos α = 12/25 (α agudo). Calcula los dos catetos.",
      check: { tipo: "lista", etiqueta: "catetos:", valores: [6, 8] },
      pistas: ["(sen α + cos α)² = 1 + 2·sen α·cos α.", "Los catetos son 10·sen α y 10·cos α."],
      pasos: ["(sen α + cos α)² = 1 + 24/25 = 49/25 → sen α + cos α = 7/5.", "sen α y cos α son las raíces de t² − (7/5)t + 12/25 = 0 → t = 3/5 y t = 4/5.", "Catetos: 10·3/5 = 6 y 10·4/5 = 8."],
      resultado: "6 y 8" },
    { id: "g35", nivel: 3,
      enunciado: "Las diagonales de un rectángulo de 12 × 5 se cortan formando un ángulo agudo. Calcula su medida.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 45.24, unidad: "°" },
      pistas: ["La diagonal forma con el lado mayor un ángulo α con tan α = 5/12.", "El ángulo entre las dos diagonales es 2α."],
      pasos: ["tan α = 5/12 → α = 22,62°.", "Las diagonales son simétricas respecto del eje horizontal: el ángulo entre ellas es 2α = 45,24°."],
      resultado: "≈ 45,24°" },
    { id: "g36", nivel: 3,
      enunciado: "Demuestra que 1 + tan²α = 1/cos²α a partir de la relación fundamental.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Parte de sen²α + cos²α = 1", p: 0.5 },
        { t: "Divide los dos miembros entre cos²α (indicando que cos α ≠ 0)", p: 0.5 },
        { t: "Reconoce sen²α/cos²α = tan²α y cos²α/cos²α = 1", p: 0.5 },
        { t: "Concluye tan²α + 1 = 1/cos²α", p: 0.5 }
      ] },
      pasos: ["sen²α + cos²α = 1.", "Dividiendo entre cos²α (con cos α ≠ 0): sen²α/cos²α + 1 = 1/cos²α.", "Como sen α/cos α = tan α: tan²α + 1 = 1/cos²α."],
      resultado: "1 + tan²α = 1/cos²α" }
  ];

  var lamina = [
    { titulo: "Razones en el triángulo rectángulo",
      items: [
        { label: "Las tres razones", formula: "sen α = " + fr("opuesto", "hipotenusa") + "   cos α = " + fr("adyacente", "hipotenusa") + "   tan α = " + fr("opuesto", "adyacente"), cuando: "Triángulo con un ángulo recto. Recuerda SOH-CAH-TOA.", ejemplo: "hipotenusa 13, opuesto 5 → sen α = 5/13" },
        { label: "Relaciones fundamentales", formula: "sen²α + cos²α = 1  ·  tan α = sen α/cos α  ·  1 + tan²α = 1/cos²α", ojo: "Al despejar, ± la raíz; el signo lo da el cuadrante." },
        { label: "Complementarios", formula: "sen(90° − α) = cos α  ·  cos(90° − α) = sen α" }
      ],
      pasos: ["Dibuja y rotula: opuesto, adyacente, hipotenusa respecto del ángulo.", "Elige la razón que relacione tu dato con tu incógnita.", "Calcula (modo DEG). Comprueba con Pitágoras."],
      nota: "Pendiente de una carretera (%) = 100·tan α." },
    { titulo: "Ángulos: grados y radianes",
      items: [
        { label: "Conversión", formula: "180° = π rad  ·  rad = grados·π/180", ejemplo: "135° = 3π/4 rad · 5π/6 rad = 150°" },
        { label: "Arco y sector", formula: "s = θ·r  ·  A = ½·r²·θ", cuando: "θ en radianes." }
      ],
      tabla: { cab: ["Grados", "0°", "30°", "45°", "60°", "90°", "180°", "270°", "360°"], filas: [["Radianes", "0", "π/6", "π/4", "π/3", "π/2", "π", "3π/2", "2π"]] },
      nota: "1 rad ≈ 57,3°. Un grado = 60′ y un minuto = 60″." },
    { titulo: "Valores notables", ancha: true,
      tabla: { cab: ["", "0°", "30°", "45°", "60°", "90°"], filas: [
        ["sen", "0", "1/2", "√2/2", "√3/2", "1"], ["cos", "1", "√3/2", "√2/2", "1/2", "0"], ["tan", "0", "√3/3", "1", "√3", "no existe"]
      ] },
      nota: "sen = √0/2, √1/2, √2/2, √3/2, √4/2. Los cosenos van al revés." },
    { titulo: "Circunferencia goniométrica y signos",
      items: [
        { label: "El punto de ángulo θ", formula: "P = (cos θ, sen θ)  ·  tan θ = recorte sobre x = 1", cuando: "Define las razones para cualquier ángulo." },
        { label: "Periodicidad", formula: "sen(θ + 360°) = sen θ  ·  tan(θ + 180°) = tan θ" }
      ],
      tabla: { cab: ["Cuadrante", "sen", "cos", "tan"], filas: [["I (0–90°)", "+", "+", "+"], ["II (90–180°)", "+", "−", "−"], ["III (180–270°)", "−", "−", "+"], ["IV (270–360°)", "−", "+", "−"]] },
      nota: "«Todas, Seno, Tangente, Coseno»: lo positivo en I, II, III y IV." },
    { titulo: "Reducción al primer cuadrante",
      pasos: ["Resta o suma vueltas de 360° hasta quedar entre 0° y 360°.", "Cuadrante → signo de la razón.", "Ángulo de referencia: 180° − θ, θ − 180° o 360° − θ.", "Razón del ángulo de referencia con su signo."],
      tabla: { cab: ["Ángulo", "sen", "cos", "tan"], filas: [["180° − α", "sen α", "−cos α", "−tan α"], ["180° + α", "−sen α", "−cos α", "tan α"], ["−α", "−sen α", "cos α", "−tan α"], ["90° + α", "cos α", "−sen α", "−1/tan α"]] },
      nota: "Con radianes: π − α, π + α, 2π − α." },
    { titulo: "Teoremas del seno y del coseno",
      items: [
        { label: "Teorema del seno", formula: fr("a", "sen A") + " = " + fr("b", "sen B") + " = " + fr("c", "sen C") + " = 2R", cuando: "Hay una pareja lado-ángulo opuesto conocida.", ojo: "Con dos lados y un ángulo opuesto puede haber 0, 1 o 2 triángulos." },
        { label: "Teorema del coseno", formula: "a² = b² + c² − 2bc·cos A", cuando: "Dos lados y el ángulo entre ellos (para el tercer lado), o tres lados (para un ángulo).", ejemplo: "cos A = (b² + c² − a²)/(2bc)" },
        { label: "Área", formula: "S = ½·b·c·sen A  ·  Herón: √(s(s−a)(s−b)(s−c))" }
      ],
      nota: "El lado mayor está frente al ángulo mayor. Si b² + c² &lt; a², el ángulo A es obtuso." },
    { titulo: "Caso ambiguo (a, b, A) con A agudo", ancha: true,
      tabla: { cab: ["Condición (h = b·sen A)", "Triángulos"], filas: [["a &lt; h", "0"], ["a = h", "1 (rectángulo)"], ["h &lt; a &lt; b", "2"], ["a ≥ b", "1"]] },
      nota: "Con A obtuso: 1 triángulo si a &gt; b y ninguno si a ≤ b. Para un ángulo que pueda ser obtuso usa el coseno." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "Calculadora en RAD con ángulos en grados", bien: "Modo DEG: sen 30° = 0,5", por: "En RAD, «30» son 30 radianes." },
        { mal: "sen 150° = −sen 30°", bien: "sen 150° = +sen 30°", por: "El 2.º cuadrante tiene seno positivo." },
        { mal: "sen(2α) = 2·sen α", bien: "No es lineal: sen 60° ≠ 2·sen 30°", por: "El seno no es proporcional al ángulo." },
        { mal: "a² = b² + c² − 2bc·sen A", bien: "a² = b² + c² − 2bc·cos A", por: "Con A = 90° debe salir Pitágoras." },
        { mal: "150° = 150π rad", bien: "150° = 5π/6 rad", por: "Se multiplica por π/180." },
        { mal: "sen B = 1,2 → B = 90°", bien: "No existe el triángulo", por: "Un seno vale como mucho 1." }
      ] }
  ];

  B.registrar("mates1", "t4", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 5: Fórmulas trigonométricas
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t5/" + ref); }

  var resumen = [
    "<b>Suma y diferencia</b>: sen(a ± b) = sen a·cos b ± cos a·sen b · cos(a ± b) = cos a·cos b ∓ sen a·sen b. Con ellas se sacan <b>todas</b> las demás.",
    "<b>Ángulo doble</b>: sen 2a = 2·sen a·cos a · cos 2a = cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a.",
    "<b>Ángulo mitad</b>: sen(a/2) = ±√((1 − cos a)/2) · cos(a/2) = ±√((1 + cos a)/2). El signo lo decide el cuadrante de a/2.",
    "Una <b>ecuación</b> trigonométrica tiene infinitas soluciones (+360°·n); en un examen se piden las de [0°, 360°).",
    "Una <b>identidad</b> se demuestra transformando <i>un</i> lado hasta llegar al otro (nunca «pasando cosas» de un lado a otro).",
    "Técnicas: factor común (sin dividir entre sen o cos), cambio de variable t = sen x, ángulo doble, pasar sumas a productos."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Suma y diferencia
  secciones[0] =
    "<h5>De dónde sale: la distancia entre dos puntos de la circunferencia</h5>" +
    "<p>Las fórmulas de suma no son una invención: se deducen con lo que ya sabes. Dibuja en la circunferencia goniométrica dos puntos, P = (cos a, sen a) y Q = (cos b, sen b). Calculamos su distancia al cuadrado de dos formas:</p>" +
    "<ul><li><b>Con las coordenadas</b>: |PQ|² = (cos a − cos b)² + (sen a − sen b)² = (cos²a + sen²a) + (cos²b + sen²b) − 2(cos a·cos b + sen a·sen b) = 2 − 2(cos a·cos b + sen a·sen b).</li>" +
    "<li><b>Con el teorema del coseno</b> en el triángulo OPQ (dos lados de longitud 1 que forman el ángulo a − b): |PQ|² = 1 + 1 − 2·1·1·cos(a − b) = 2 − 2·cos(a − b).</li></ul>" +
    "<p>Igualando: <b>cos(a − b) = cos a·cos b + sen a·sen b</b>. El resto se deduce en cadena:</p>" +
    "<ul><li>Cambiando b por −b (cos(−b) = cos b y sen(−b) = −sen b): <b>cos(a + b) = cos a·cos b − sen a·sen b</b>.</li>" +
    "<li>Como sen x = cos(90° − x): sen(a + b) = cos(90° − a − b) = cos((90° − a) − b) = cos(90° − a)·cos b + sen(90° − a)·sen b = <b>sen a·cos b + cos a·sen b</b>.</li>" +
    "<li>Cambiando b por −b: <b>sen(a − b) = sen a·cos b − cos a·sen b</b>.</li>" +
    "<li>Dividiendo sen(a + b) entre cos(a + b) y dividiendo todo entre cos a·cos b: <b>tan(a + b) = (tan a + tan b)/(1 − tan a·tan b)</b>.</li></ul>" +
    "<p>Moraleja práctica: de memoria sólo hacen falta <b>las dos primeras</b>, la del coseno de la suma y la del seno de la suma; todas las demás se deducen. Comprueba con números que las fórmulas funcionan (y que las «falsas» tentadoras no):</p>" +
    w("formulas") +
    "<h5>Cómo recordar los signos</h5>" +
    "<p>En el <b>seno</b> el signo del medio es el <i>mismo</i> que el de dentro del paréntesis (sen(a + b) lleva +, sen(a − b) lleva −). En el <b>coseno</b> el signo del medio es el <i>contrario</i> (cos(a + b) lleva −, cos(a − b) lleva +). En la tangente, el numerador conserva el signo y el denominador lo cambia.</p>" +
    "<h5>Ángulos que se descomponen en notables</h5>" +
    ejemplo("Valores exactos de 75°, 15° y 105°", "Calcula sen 75°, cos 15° y tan 105° sin calculadora.", [
      "<b>sen 75°</b> = sen(45° + 30°) = sen 45°·cos 30° + cos 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ <b>0,9659</b>.",
      "<b>cos 15°</b> = cos(45° − 30°) = cos 45°·cos 30° + sen 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4. Es el mismo valor que sen 75°, como debe ser (75° y 15° son complementarios).",
      "<b>tan 105°</b> = tan(60° + 45°) = (√3 + 1)/(1 − √3·1) = (√3 + 1)/(1 − √3). Multiplicamos arriba y abajo por (1 + √3): (√3 + 1)²/(1 − 3) = (4 + 2√3)/(−2) = <b>−(2 + √3) ≈ −3,732</b> (negativa porque 105° está en el 2.º cuadrante)."
    ]) +
    ejemplo("Conozco otras razones", "Si sen a = 4/5 (a en el 2.º cuadrante) y cos b = −12/13 (b en el 3.er cuadrante), calcula sen(a − b) y cos(a + b).", [
      "Primero se completan las razones que faltan, con la relación fundamental y los signos de cada cuadrante: cos a = −3/5 (2.º cuadrante) y sen b = −5/13 (3.er cuadrante).",
      "sen(a − b) = sen a·cos b − cos a·sen b = (4/5)(−12/13) − (−3/5)(−5/13) = −48/65 − 15/65 = <b>−63/65</b>.",
      "cos(a + b) = cos a·cos b − sen a·sen b = (−3/5)(−12/13) − (4/5)(−5/13) = 36/65 + 20/65 = <b>56/65</b>.",
      "Comprobación con la calculadora: a = 126,87° y b = 202,62°, así que a − b = −75,75° y a + b = 329,49°; sen(−75,75°) = −0,9692 = −63/65 ✓ y cos 329,49° = 0,8615 = 56/65 ✓."
    ]) +
    ojo("sen(a + b) <b>no</b> es sen a + sen b. Por ejemplo, sen(30° + 60°) = sen 90° = 1, pero sen 30° + sen 60° = 0,5 + 0,866 = 1,366. Y el coseno de una suma no es la suma de cosenos. La <b>suma</b> de ángulos entra en las fórmulas, no los separa.") +
    "<h5>Consecuencias inmediatas (las reducciones del Tema 4)</h5>" +
    "<p>Si en las fórmulas pones ángulos como 90° o 180°, recuperas las identidades del tema anterior: sen(x + 90°) = sen x·cos 90° + cos x·sen 90° = cos x, y sen(180° − x) = sen 180°·cos x − cos 180°·sen x = sen x. Por eso <b>no tienes que memorizar</b> las tablas de reducción: salen de aquí.</p>";

  // ---------------------------------------------------------------- 2. Ángulo doble
  secciones[1] =
    "<h5>Es la fórmula de la suma con b = a</h5>" +
    "<p>Si en sen(a + b) pones b = a: sen 2a = sen a·cos a + cos a·sen a = <b>2·sen a·cos a</b>. Y en cos(a + b): cos 2a = cos²a − sen²a. Usando sen²a + cos²a = 1 hay dos formas más de escribirlo: cambiando sen²a = 1 − cos²a queda <b>2cos²a − 1</b>, y cambiando cos²a = 1 − sen²a queda <b>1 − 2sen²a</b>. La tangente sale de la fórmula de la suma: tan 2a = 2·tan a/(1 − tan²a).</p>" +
    ejemplo("Conozco una razón y quiero el doble", "Si sen a = 5/13 y a es agudo, calcula sen 2a, cos 2a y tan 2a.", [
      "cos a = √(1 − 25/169) = 12/13 (agudo → positivo).",
      "sen 2a = 2·(5/13)·(12/13) = <b>120/169</b> ≈ 0,710.",
      "cos 2a = cos²a − sen²a = 144/169 − 25/169 = <b>119/169</b> ≈ 0,704. (Con la otra forma: 1 − 2·25/169 = 119/169 ✓.)",
      "tan 2a = sen 2a/cos 2a = <b>120/119</b>."
    ]) +
    "<h5>Para pasar de grado 2 a grado 1: las fórmulas de reducción de potencias</h5>" +
    "<p>Despejando cos²a y sen²a de las formas «2cos²a − 1» y «1 − 2sen²a» se obtienen unas fórmulas muy usadas en cálculo (para integrar potencias de seno y coseno, en 2.º de Bachillerato) y para resolver ecuaciones:</p>" +
    H.formula("cos²a = " + fr("1 + cos 2a", "2") + "          sen²a = " + fr("1 − cos 2a", "2")) +
    "<h5>Y el ángulo triple, por si te lo preguntan</h5>" +
    "<p>Sin fórmula nueva: sen 3a = sen(2a + a) = sen 2a·cos a + cos 2a·sen a = 2sen a·cos²a + (1 − 2sen²a)·sen a = 2sen a(1 − sen²a) + sen a − 2sen³a = <b>3·sen a − 4·sen³a</b>. De la misma forma cos 3a = 4cos³a − 3cos a.</p>" +
    ejemplo("Comprobación del seno del triple", "Si sen a = 0,6, calcula sen 3a con la fórmula y comprueba con la calculadora.", [
      "sen 3a = 3·0,6 − 4·0,6³ = 1,8 − 4·0,216 = 1,8 − 0,864 = <b>0,936</b>.",
      "Comprobación: a = arcsen 0,6 = 36,87° → 3a = 110,61° → sen 110,61° = 0,936 ✓."
    ]) +
    ojo("sen 2a <b>no</b> es 2·sen a. Para a = 30°: sen 60° = 0,866, pero 2·sen 30° = 1. Es el mismo error de «sacar el 2 fuera» que con la suma: el seno no es una función lineal.");

  // ---------------------------------------------------------------- 3. Ángulo mitad
  secciones[2] =
    "<h5>Cómo se obtiene y por qué lleva ±</h5>" +
    "<p>De cos 2x = 1 − 2sen²x se despeja sen²x = (1 − cos 2x)/2. Si llamamos a = 2x (es decir, x = a/2), queda sen²(a/2) = (1 − cos a)/2, y al hacer la raíz cuadrada hay dos signos posibles. El mismo razonamiento con cos 2x = 2cos²x − 1 da cos²(a/2) = (1 + cos a)/2. Dividiendo, aparece una versión de la tangente <b>sin signo</b>:</p>" +
    H.formula("tan(a/2) = " + fr("1 − cos a", "sen a") + " = " + fr("sen a", "1 + cos a")) +
    "<p>Esta última tiene la ventaja de que no necesita elegir un signo (el signo lo lleva el propio sen a). El signo en las otras dos lo decide el cuadrante de a/2; se ve con la tabla de signos del Tema 4.</p>" +
    ejemplo("El cuadrante decide el signo", "Si cos a = −4/5 y a está en el 3.er cuadrante (180° &lt; a &lt; 270°), calcula sen(a/2), cos(a/2) y tan(a/2).", [
      "Si 180° &lt; a &lt; 270°, entonces 90° &lt; a/2 &lt; 135°: a/2 está en el <b>2.º cuadrante</b> (seno positivo, coseno negativo).",
      "sen(a/2) = +√((1 − cos a)/2) = √((1 + 4/5)/2) = √(9/10) = <b>3/√10 ≈ 0,949</b>.",
      "cos(a/2) = −√((1 + cos a)/2) = −√((1 − 4/5)/2) = −√(1/10) = <b>−1/√10 ≈ −0,316</b>.",
      "tan(a/2) = sen(a/2)/cos(a/2) = <b>−3</b>. Comprobación con la forma sin signo: sen a = −3/5 (3.er cuadrante) → tan(a/2) = sen a/(1 + cos a) = (−3/5)/(1/5) = −3 ✓."
    ]) +
    ejemplo("Un valor exacto nuevo", "Calcula sen 22,5° y cos 22,5° con las fórmulas del ángulo mitad.", [
      "22,5° = 45°/2, y 22,5° está en el 1.er cuadrante (todo positivo).",
      "sen 22,5° = √((1 − cos 45°)/2) = √((1 − √2/2)/2) = √((2 − √2)/4) = <b>√(2 − √2)/2 ≈ 0,3827</b>.",
      "cos 22,5° = √((1 + cos 45°)/2) = <b>√(2 + √2)/2 ≈ 0,9239</b>."
    ]) +
    ojo("el ± de las fórmulas del ángulo mitad <b>no</b> se deja sin decidir: hay que elegir el signo. Un error muy frecuente es calcular a/2 mal (olvidar dividir entre 2 el intervalo de a) y elegir el signo con el cuadrante de a. Escribe siempre la desigualdad de a/2 antes de decidir.");

  // ---------------------------------------------------------------- 4. Ecuaciones
  secciones[3] =
    "<h5>Ecuaciones básicas y cómo ver sus soluciones</h5>" +
    "<p>Una ecuación trigonométrica es una igualdad que se cumple sólo para <i>algunos</i> ángulos. Como las razones son periódicas hay infinitas soluciones, pero en los problemas se pide casi siempre las de una vuelta, [0°, 360°). La gráfica lo hace transparente: las soluciones son los cortes de la curva con la recta horizontal y = k. Cambia la función, el ángulo (x, 2x, 3x) y el valor k:</p>" +
    w("ecuaciontrig") +
    "<p>Resumen de lo que ves: <b>sen x = k</b> (con |k| ≤ 1) tiene dos soluciones por vuelta (α y 180° − α); <b>cos x = k</b> también dos (α y −α, que en [0°, 360°) es 360° − α); <b>tan x = k</b> tiene siempre una (α) y la otra por vuelta es α + 180°.</p>" +
    "<h5>Cuando el ángulo es 2x, 3x, x/2…</h5>" +
    "<p>Primero se resuelve para el ángulo completo (todo lo que está dentro del seno) y al final se despeja x, <b>dividiendo también el «+360°·n»</b>. Esto multiplica el número de soluciones por vuelta.</p>" +
    ejemplo("sen 2x = 1/2 en [0°, 360°)", "Resuelve sen 2x = 1/2.", [
      "2x = 30° + 360°·n  ó  2x = 150° + 360°·n.",
      "Dividimos entre 2: x = 15° + 180°·n  ó  x = 75° + 180°·n.",
      "En [0°, 360°): n = 0 y n = 1 en cada familia → <b>x = 15°, 75°, 195°, 255°</b> (cuatro soluciones: el doble que con sen x = 1/2)."
    ]) +
    "<h5>Ecuaciones que hay que transformar primero</h5>" +
    "<p>El truco es siempre conseguir <b>una sola razón</b> y <b>un solo ángulo</b> (o un producto igual a 0). Se usan: sen²x + cos²x = 1 (para dejar todo en sen o en cos), el ángulo doble (para eliminar el 2x) y el factor común.</p>" +
    ejemplo("Segundo grado en coseno", "Resuelve 2cos²x − 3cos x + 1 = 0 en [0°, 360°).", [
      "Cambio t = cos x: 2t² − 3t + 1 = 0 → t = (3 ± 1)/4 → t = 1 o t = 1/2.",
      "cos x = 1 → x = 0°. cos x = 1/2 → x = 60° o x = 300°.",
      "<b>x = 0°, 60°, 300°</b>."
    ]) +
    ejemplo("Pasar a una sola razón", "Resuelve 2sen²x + cos x − 1 = 0 en [0°, 360°).", [
      "Sustituimos sen²x = 1 − cos²x: 2(1 − cos²x) + cos x − 1 = 0 → −2cos²x + cos x + 1 = 0 → 2cos²x − cos x − 1 = 0.",
      "t = cos x: t = (1 ± 3)/4 → t = 1 o t = −1/2.",
      "cos x = 1 → x = 0°. cos x = −1/2 → x = 120° o 240°. <b>x = 0°, 120°, 240°</b>."
    ]) +
    ejemplo("Con el ángulo doble: no dividas", "Resuelve sen 2x = cos x en [0°, 360°).", [
      "sen 2x = 2·sen x·cos x. La ecuación queda 2·sen x·cos x = cos x → 2·sen x·cos x − cos x = 0 → cos x·(2·sen x − 1) = 0.",
      "Un producto es 0 si algún factor lo es: cos x = 0 → x = 90° o 270°; 2·sen x − 1 = 0 → sen x = 1/2 → x = 30° o 150°.",
      "<b>x = 30°, 90°, 150°, 270°</b>. Si «simplificases» dividiendo entre cos x perderías las soluciones 90° y 270°."
    ]) +
    ejemplo("Una ecuación con tangente", "Resuelve tan x = 2·sen x en [0°, 360°).", [
      "Condición: cos x ≠ 0. Escribimos tan x = sen x/cos x: sen x/cos x = 2·sen x → sen x = 2·sen x·cos x → sen x(1 − 2cos x) = 0.",
      "sen x = 0 → x = 0° o 180°. 1 − 2cos x = 0 → cos x = 1/2 → x = 60° o 300°.",
      "Ninguna de las soluciones hace cos x = 0: <b>x = 0°, 60°, 180°, 300°</b>."
    ]) +
    "<h5>Cuando aparecen elevados al cuadrado: comprueba</h5>" +
    ejemplo("Solución falsa", "Resuelve sen x + cos x = 1 en [0°, 360°).", [
      "Elevamos al cuadrado: sen²x + 2·sen x·cos x + cos²x = 1 → 1 + sen 2x = 1 → sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°.",
      "Comprobamos en la ecuación original: x = 0° → 0 + 1 = 1 ✓ · x = 90° → 1 + 0 = 1 ✓ · x = 180° → 0 − 1 = −1 ✗ · x = 270° → −1 + 0 = −1 ✗.",
      "<b>x = 0° y x = 90°</b>. Al elevar al cuadrado se perdió el signo y aparecieron dos soluciones falsas (como en las ecuaciones irracionales del Tema 3)."
    ]) +
    "<p>Unas pautas para no perderse: <b>(1)</b> reduce a una razón y un ángulo; <b>(2)</b> si te sale un producto, iguala cada factor a 0, nunca simplifiques una razón; <b>(3)</b> resuelve la ecuación básica con los dos ángulos por vuelta; <b>(4)</b> si había ángulo 2x, 3x…, divide al final; <b>(5)</b> da las soluciones del intervalo pedido y, si elevaste al cuadrado, comprueba.</p>" +
    ojo("al resolver sen x = 0,5 la calculadora da <b>un solo</b> ángulo (30°), pero siempre hay otro en la misma vuelta (150°). Con el coseno, la otra solución es 360° − α. Haz el dibujo de la circunferencia: te recuerda que son dos.");

  // ---------------------------------------------------------------- 5. Identidades
  secciones[4] =
    "<h5>Tu caja de herramientas</h5>" +
    "<p>Para demostrar una identidad se usan siempre las mismas piezas; conviene tenerlas a mano:</p>" +
    "<ul><li><b>sen²x + cos²x = 1</b>, y sus versiones 1 − cos²x = sen²x y 1 − sen²x = cos²x.</li>" +
    "<li><b>tan x = sen x/cos x</b>, cotan x = cos x/sen x, y 1 + tan²x = 1/cos²x.</li>" +
    "<li>Ángulo doble, suma y mitad.</li>" +
    "<li>Álgebra: factor común, <b>(1 − cos x)(1 + cos x) = 1 − cos²x = sen²x</b>, denominador común, multiplicar por el conjugado.</li></ul>" +
    "<h5>Cuatro estrategias que funcionan</h5>" +
    "<ol><li><b>Pasar todo a seno y coseno</b>. Si hay tangentes, cotangentes, secantes… escríbelas con sen y cos: casi siempre simplifica.</li>" +
    "<li><b>Denominador común</b> cuando hay sumas de fracciones, y después simplificar con sen² + cos² = 1.</li>" +
    "<li><b>Multiplicar por el conjugado</b> cuando aparece 1 ± cos x o 1 ± sen x en un denominador (es el truco del ejemplo del tema).</li>" +
    "<li><b>Trabajar el lado más complicado</b> hasta llegar al otro, anotando cada paso. Nunca se opera en los dos lados a la vez.</li></ol>" +
    "<p>Antes de empezar una demostración, puedes comprobar numéricamente si la igualdad es plausible: prueba la identidad (y otras que no lo son) en el comprobador. <b>Pero ojo</b>, comprobar con números no es demostrar: un examen exige el álgebra.</p>" +
    w("identidad") +
    ejemplo("Convertir a seno y coseno", "Demuestra que tan x + 1/tan x = 2/sen 2x.", [
      "Lado izquierdo: tan x + cotan x = sen x/cos x + cos x/sen x = (sen²x + cos²x)/(sen x·cos x) = 1/(sen x·cos x).",
      "Lado derecho: 2/sen 2x = 2/(2·sen x·cos x) = 1/(sen x·cos x).",
      "Los dos lados son iguales a 1/(sen x·cos x). ∎ (Aquí hemos llevado los dos lados a una misma expresión intermedia: es una forma válida de demostrar, siempre que cada paso sea una igualdad.)"
    ]) +
    ejemplo("Suma de fracciones", "Demuestra que sen x/(1 + cos x) + (1 + cos x)/sen x = 2/sen x.", [
      "Denominador común sen x·(1 + cos x): [sen²x + (1 + cos x)²]/[sen x·(1 + cos x)].",
      "Numerador: sen²x + 1 + 2cos x + cos²x = (sen²x + cos²x) + 1 + 2cos x = 2 + 2cos x = 2(1 + cos x).",
      "Queda 2(1 + cos x)/[sen x·(1 + cos x)] = 2/sen x. ∎"
    ]) +
    ejemplo("Con tangentes y ángulo doble", "Demuestra que cos 2x = (1 − tan²x)/(1 + tan²x).", [
      "Partimos del lado derecho. Como 1 + tan²x = 1/cos²x, el denominador es 1/cos²x.",
      "Numerador: 1 − tan²x = (cos²x − sen²x)/cos²x. Entonces el cociente es [(cos²x − sen²x)/cos²x]·cos²x = cos²x − sen²x = cos 2x. ∎"
    ]) +
    "<p>Y una advertencia sobre lo que <b>no</b> se debe hacer: pasar términos de un lado al otro, multiplicar los dos lados en cruz o elevar al cuadrado «para ver si sale». Esas operaciones son válidas para resolver una ecuación, pero en una identidad suponen dar ya por cierto lo que quieres demostrar.</p>";

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "6. Transformar sumas en productos (y al revés)",
      html:
        "<p>Las fórmulas de suma y diferencia, sumadas o restadas entre sí, producen unas identidades muy cómodas para resolver ecuaciones, porque convierten una <b>suma</b> de razones (difícil de igualar a 0) en un <b>producto</b> (fácil: cada factor a 0). Por ejemplo, sumando sen(x + y) = sen x·cos y + cos x·sen y y sen(x − y) = sen x·cos y − cos x·sen y queda sen(x + y) + sen(x − y) = 2·sen x·cos y. Llamando A = x + y y B = x − y (x = (A + B)/2, y = (A − B)/2):</p>" +
        tabla(["Suma", "Producto"], [
          ["sen A + sen B", "2·sen((A + B)/2)·cos((A − B)/2)"],
          ["sen A − sen B", "2·cos((A + B)/2)·sen((A − B)/2)"],
          ["cos A + cos B", "2·cos((A + B)/2)·cos((A − B)/2)"],
          ["cos A − cos B", "−2·sen((A + B)/2)·sen((A − B)/2)"]
        ]) +
        "<p>Y al revés (producto a suma): sen A·cos B = ½[sen(A + B) + sen(A − B)], cos A·cos B = ½[cos(A + B) + cos(A − B)] y sen A·sen B = ½[cos(A − B) − cos(A + B)]. No hace falta memorizarlas todas: se deducen de las de suma en un renglón.</p>" +
        ejemplo("Un valor exacto", "Calcula sen 75° + sen 15° sin calculadora.", [
          "sen 75° + sen 15° = 2·sen((75° + 15°)/2)·cos((75° − 15°)/2) = 2·sen 45°·cos 30° = 2·(√2/2)(√3/2) = <b>√6/2 ≈ 1,2247</b>.",
          "Comprobación con los valores de la sección 1: 0,9659 + 0,2588 = 1,2247 ✓."
        ]) +
        ejemplo("Ecuación con una suma de senos", "Resuelve sen 3x + sen x = 0 en [0°, 360°).", [
          "Transformamos: sen 3x + sen x = 2·sen((3x + x)/2)·cos((3x − x)/2) = 2·sen 2x·cos x = 0.",
          "sen 2x = 0 → 2x = 0°, 180°, 360°, 540° → x = 0°, 90°, 180°, 270°. cos x = 0 → x = 90°, 270° (ya están).",
          "<b>x = 0°, 90°, 180°, 270°</b>."
        ]) +
        ejemplo("Ecuación con dos sumas", "Resuelve sen x + sen 3x = cos x + cos 3x en [0°, 360°).", [
          "Transformamos cada lado: 2·sen 2x·cos x = 2·cos 2x·cos x → 2·cos x·(sen 2x − cos 2x) = 0.",
          "cos x = 0 → x = 90° o 270°. sen 2x = cos 2x → tan 2x = 1 → 2x = 45° + 180°·n → x = 22,5° + 90°·n → x = 22,5°, 112,5°, 202,5°, 292,5°.",
          "<b>Seis soluciones: x = 22,5°, 90°, 112,5°, 202,5°, 270°, 292,5°</b>. (No dividimos entre cos x: perderíamos 90° y 270°.)"
        ])
    },
    {
      h: "7. Combinar seno y coseno en una sola onda",
      html:
        "<p>La suma a·sen x + b·cos x aparece mucho (ondas, corrientes alternas, movimiento armónico) y se puede escribir como <b>una sola</b> función seno con amplitud y desfase. Se busca R y φ tales que R·sen(x + φ) = R·cos φ·sen x + R·sen φ·cos x sea igual a a·sen x + b·cos x. Comparando coeficientes: R·cos φ = a y R·sen φ = b. Elevando al cuadrado y sumando: R² = a² + b² y tan φ = b/a.</p>" +
        H.formula("a·sen x + b·cos x = R·sen(x + φ)       con R = √(a² + b²) y tan φ = b/a") +
        w("amplitud") +
        ejemplo("Valor máximo", "¿Cuál es el valor máximo de f(x) = sen x + cos x y en qué ángulo de [0°, 360°) se alcanza?", [
          "a = b = 1: R = √2 y tan φ = 1 → φ = 45°. Entonces f(x) = √2·sen(x + 45°).",
          "El seno vale 1 como máximo, así que el máximo de f es <b>√2 ≈ 1,414</b>, cuando x + 45° = 90°, es decir, en <b>x = 45°</b>."
        ]) +
        ejemplo("Ecuación a·sen x + b·cos x = c", "Resuelve sen x − √3·cos x = 1 en [0°, 360°).", [
          "a = 1 y b = −√3: R = √(1 + 3) = 2 y tan φ = −√3 (con a &gt; 0) → φ = −60°. Así sen x − √3·cos x = 2·sen(x − 60°).",
          "2·sen(x − 60°) = 1 → sen(x − 60°) = 1/2 → x − 60° = 30° o 150° (+360°·n).",
          "<b>x = 90° o x = 210°</b>. Comprobación: sen 90° − √3·cos 90° = 1 ✓ y sen 210° − √3·cos 210° = −0,5 + 1,5 = 1 ✓."
        ]) +
        ejemplo("Amplitud de 3·sen x + 4·cos x", "Escribe 3·sen x + 4·cos x como R·sen(x + φ).", [
          "R = √(9 + 16) = 5 y tan φ = 4/3 → φ = arctan(4/3) = 53,13°.",
          "Por tanto 3·sen x + 4·cos x = <b>5·sen(x + 53,13°)</b>: oscila entre −5 y 5."
        ])
    },
    {
      h: "8. Mapa de fórmulas: qué hay que memorizar y qué se deduce",
      html:
        "<p>Muchos alumnos tienen la sensación de que «hay cientos de fórmulas». En realidad, todo parte de dos o tres:</p>" +
        "<ul><li>sen²x + cos²x = 1 (Pitágoras en la circunferencia) y tan x = sen x/cos x.</li>" +
        "<li>La suma de ángulos: cos(a − b) = cos a·cos b + sen a·sen b (y de ella, las otras tres).</li></ul>" +
        "<p>De la suma salen el doble (b = a), el triple (suma de 2a y a), las reducciones de ángulos (con 90° y 180°) y, despejando, el mitad y las transformaciones. Une cada resultado con su fórmula:</p>" +
        w("emparejar", "formulas") +
        "<p>Y ahora decide si cada igualdad es una identidad, una ecuación (cierta sólo para algunos ángulos) o directamente falsa:</p>" +
        w("clasificar", "tipos") +
        "<p>Ordena los pasos de la demostración de una identidad:</p>" +
        w("orden", "demo")
    },
    {
      h: "9. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "10. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas para memorizar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    formulas: {
      titulo: "Cada resultado con su fórmula",
      consigna: "Une cada expresión con su desarrollo.",
      pares: [
        ["sen 2a", "2·sen a·cos a"],
        ["cos 2a (en función de cos a)", "2cos²a − 1"],
        ["cos 2a (en función de sen a)", "1 − 2sen²a"],
        ["cos(a − b)", "cos a·cos b + sen a·sen b"],
        ["sen(a + b)", "sen a·cos b + cos a·sen b"],
        ["tan 2a", "2tan a/(1 − tan²a)"],
        ["sen²a", "(1 − cos 2a)/2"],
        ["sen(a/2) (con signo)", "±√((1 − cos a)/2)"],
        ["sen 3a", "3·sen a − 4·sen³a"]
      ]
    },
    tipos: {
      titulo: "¿Identidad, ecuación o falsa?",
      consigna: "Toca una igualdad y después la categoría correcta.",
      categorias: ["Identidad (siempre cierta)", "Ecuación (cierta sólo para algunos x)", "Falsa en general"],
      items: [
        { t: "sen²x + cos²x = 1", c: 0 }, { t: "cos 2x = 2cos²x − 1", c: 0 }, { t: "sen(x + 90°) = cos x", c: 0 }, { t: "1 + tan²x = 1/cos²x", c: 0 },
        { t: "sen x = 1/2", c: 1 }, { t: "sen 2x = sen x", c: 1 }, { t: "sen x + cos x = 1", c: 1 }, { t: "(sen x + cos x)² = 1", c: 1 },
        { t: "sen(a + b) = sen a + sen b", c: 2 }, { t: "cos 2x = 2cos x", c: 2 }, { t: "sen(2x) = 2 sen x", c: 2 }
      ]
    },
    demo: {
      titulo: "Demostrar sen x/(1 + cos x) = (1 − cos x)/sen x",
      consigna: "Ordena los pasos de la demostración.",
      items: [
        { t: "Partimos del lado izquierdo: sen x/(1 + cos x)", nota: "Se trabaja un solo lado." },
        { t: "Multiplicamos numerador y denominador por (1 − cos x)", nota: "Es multiplicar por 1: no cambia el valor." },
        { t: "El denominador es una diferencia de cuadrados: (1 + cos x)(1 − cos x) = 1 − cos²x", nota: "Identidad notable del Tema 3." },
        { t: "Por la relación fundamental, 1 − cos²x = sen²x", nota: "sen²x + cos²x = 1." },
        { t: "Queda sen x·(1 − cos x)/sen²x; simplificamos un factor sen x", nota: "Se tachan factores, no sumandos." },
        { t: "Llegamos a (1 − cos x)/sen x, que es el lado derecho. ∎", nota: "Fin: hemos pasado del lado izquierdo al derecho con igualdades." }
      ]
    },
    tj1: {
      titulo: "Fórmulas trigonométricas",
      cartas: [
        { a: "sen(a ± b)", b: "sen a·cos b ± cos a·sen b" },
        { a: "cos(a ± b)", b: "cos a·cos b ∓ sen a·sen b (el signo del medio es el CONTRARIO)" },
        { a: "tan(a ± b)", b: "(tan a ± tan b)/(1 ∓ tan a·tan b)" },
        { a: "sen 2a", b: "2·sen a·cos a" },
        { a: "cos 2a (tres formas)", b: "cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a" },
        { a: "tan 2a", b: "2·tan a/(1 − tan²a)" },
        { a: "Reducción de potencias", b: "cos²a = (1 + cos 2a)/2 · sen²a = (1 − cos 2a)/2" },
        { a: "sen(a/2) y cos(a/2)", b: "±√((1 − cos a)/2) y ±√((1 + cos a)/2). El signo lo da el cuadrante de a/2." },
        { a: "tan(a/2) sin signo", b: "(1 − cos a)/sen a = sen a/(1 + cos a)" },
        { a: "sen 3a y cos 3a", b: "3·sen a − 4·sen³a · 4·cos³a − 3·cos a" },
        { a: "Suma de senos a producto", b: "sen A + sen B = 2·sen((A + B)/2)·cos((A − B)/2)" },
        { a: "Soluciones de sen x = k, cos x = k, tan x = k", b: "sen: α + 360°n y 180° − α + 360°n · cos: ±α + 360°n · tan: α + 180°n" },
        { a: "a·sen x + b·cos x", b: "R·sen(x + φ), R = √(a² + b²), tan φ = b/a" },
        { a: "Cómo se demuestra una identidad", b: "Se transforma UN lado (a sen y cos, denominador común, conjugado) hasta obtener el otro. No se pasan términos de un lado a otro." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula sen 75° = sen 45° + sen 30° = 0,707 + 0,5 = 1,207. ¿Qué falla?",
          op: ["Nada", "sen(a + b) ≠ sen a + sen b: hay que usar sen a·cos b + cos a·sen b = 0,9659", "Debía restar", "El resultado correcto es 1"], ok: 1,
          porque: "Un seno nunca puede ser mayor que 1, así que 1,207 es imposible. La fórmula correcta da (√2/2)(√3/2) + (√2/2)(1/2) = 0,9659." },
        { q: "Un alumno escribe cos(a + b) = cos a·cos b + sen a·sen b. ¿Qué falla?",
          op: ["Nada", "El signo del medio en el coseno de una suma es −: cos a·cos b − sen a·sen b", "Falta un 2", "Debía llevar tangentes"], ok: 1,
          porque: "Prueba con a = b = 90°: cos 180° = −1 y la fórmula correcta da 0·0 − 1·1 = −1, pero la errónea daría +1." },
        { q: "Un alumno resuelve sen 2x = cos x dividiendo entre cos x y obtiene 2 sen x = 1, es decir, x = 30° y 150°. ¿Qué ha perdido?",
          op: ["Nada", "Las soluciones x = 90° y 270°, donde cos x = 0: no se puede dividir entre una expresión que puede valer 0", "La solución x = 0°", "La solución x = 180°"], ok: 1,
          porque: "Debió factorizar: cos x(2 sen x − 1) = 0. De cos x = 0 salen 90° y 270°; de sen x = 1/2, 30° y 150°." },
        { q: "Para resolver sen x = 0,5 en [0°, 360°), un alumno da sólo x = 30° porque «la calculadora da 30°». ¿Qué falla?",
          op: ["Nada", "También x = 150° (180° − 30°): en una vuelta, el seno toma cada valor en dos ángulos", "También x = 330°", "También x = 210°"], ok: 1,
          porque: "El seno es positivo en los cuadrantes I y II; en el 2.º cuadrante el ángulo de referencia 30° da 180° − 30° = 150°." },
        { q: "Al resolver sen 2x = 1/2, un alumno escribe 2x = 30° + 360°n y concluye x = 30° + 360°n. ¿Qué falla?",
          op: ["Nada", "Al despejar x hay que dividir también la parte 360°n entre 2: x = 15° + 180°n", "Falta multiplicar por 2", "El resultado es x = 60° + 360°n"], ok: 1,
          porque: "Si 2x = 30° + 360°n, entonces x = 15° + 180°n. (Y además falta la segunda familia, 2x = 150° + 360°n.)" },
        { q: "Un alumno «demuestra» una identidad pasando términos de un lado a otro hasta llegar a algo evidente. ¿Qué falla?",
          op: ["Nada: es un método válido", "Pasar términos supone dar la igualdad por cierta, que es lo que se debe demostrar", "Debe multiplicar en cruz", "Falta una constante"], ok: 1,
          porque: "En una identidad se parte de un lado y se transforma con igualdades hasta llegar al otro. «Pasar cosas» es una técnica de las ecuaciones." },
        { q: "Si cos a = 0,6 con a agudo, un alumno calcula sen(a/2) = −√((1 − 0,6)/2) = −0,447. ¿Qué falla?",
          op: ["Nada", "a/2 está en el 1.er cuadrante, donde el seno es positivo: sen(a/2) = +0,447", "Debía ser √((1 + 0,6)/2)", "El valor es 0,2"], ok: 1,
          porque: "Si 0° &lt; a &lt; 90°, entonces 0° &lt; a/2 &lt; 45°: primer cuadrante, seno positivo. El signo lo decide a/2, no a." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "El valor exacto de sen 75° es…",
          op: ["(√6 + √2)/4", "(√6 − √2)/4", "√3/2", "(√3 + 1)/2"], ok: 0,
          porque: "sen(45° + 30°) = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ 0,966." },
        { q: "Si sen a = 3/5 y a es agudo, sen 2a vale…",
          op: ["24/25", "6/5", "7/25", "3/10"], ok: 0,
          porque: "cos a = 4/5, sen 2a = 2·(3/5)·(4/5) = 24/25." },
        { q: "cos 2a, escrito en función de sen a, es…",
          op: ["1 − 2sen²a", "2sen²a − 1", "1 + 2sen²a", "2sen a·cos a"], ok: 0,
          porque: "cos 2a = cos²a − sen²a = 1 − sen²a − sen²a = 1 − 2sen²a." },
        { q: "Las soluciones de sen x = 1/2 en [0°, 360°) son…",
          op: ["30° y 150°", "30° y 330°", "60° y 120°", "30° y 210°"], ok: 0,
          porque: "sen 30° = 1/2 y también sen(180° − 30°) = sen 150° = 1/2." },
        { q: "El número de soluciones de sen 2x = 1/2 en [0°, 360°) es…",
          op: ["4", "2", "1", "8"], ok: 0,
          porque: "2x = 30° + 360°n o 150° + 360°n → x = 15° + 180°n o 75° + 180°n: cuatro en una vuelta." },
        { q: "Si cos a = 0,8 y a es agudo, ¿cuánto vale cos(a/2)?",
          op: ["√0,9 ≈ 0,949", "√0,1 ≈ 0,316", "0,4", "√0,4 ≈ 0,632"], ok: 0,
          porque: "cos(a/2) = +√((1 + 0,8)/2) = √0,9 ≈ 0,949 (a/2 es agudo: positivo)." },
        { q: "tan(45° + 30°) es igual a…",
          op: ["2 + √3", "1 + √3/3", "√3", "(√3 − 1)/2"], ok: 0,
          porque: "(1 + √3/3)/(1 − 1·√3/3) = (3 + √3)/(3 − √3) = (3 + √3)²/6 = (12 + 6√3)/6 = 2 + √3." },
        { q: "Para resolver 2cos²x − 3cos x + 1 = 0 el cambio adecuado es…",
          op: ["t = cos x", "t = 2x", "t = cos²x", "t = tan x"], ok: 0,
          porque: "Con t = cos x queda 2t² − 3t + 1 = 0, una ecuación de segundo grado normal." },
        { q: "Al demostrar una identidad trigonométrica, lo correcto es…",
          op: ["Transformar un lado hasta llegar al otro", "Pasar todos los términos a un lado", "Elevar al cuadrado los dos lados", "Sustituir x por un valor"], ok: 0,
          porque: "Probar con un valor no demuestra nada, y las demás operaciones suponen cierta la igualdad." },
        { q: "El valor máximo de sen x + cos x es…",
          op: ["√2", "2", "1", "√3"], ok: 0,
          porque: "sen x + cos x = √2·sen(x + 45°), cuyo máximo es √2 ≈ 1,414." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "h1", nivel: 1,
      enunciado: "Calcula sen 75° como suma de dos ángulos notables. Da el valor decimal.",
      check: { tipo: "num", etiqueta: "sen 75° =", valor: 0.9659, tol: 0.001 },
      pistas: ["75° = 45° + 30°."],
      pasos: ["sen(45° + 30°) = sen 45°·cos 30° + cos 45°·sen 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4 ≈ 0,9659."],
      resultado: "(√6 + √2)/4 ≈ 0,9659" },
    { id: "h2", nivel: 1,
      enunciado: "Calcula cos 105° como cos(60° + 45°). Da el valor decimal.",
      check: { tipo: "num", etiqueta: "cos 105° =", valor: -0.2588, tol: 0.002 },
      pistas: ["cos(a + b) = cos a·cos b − sen a·sen b."],
      pasos: ["cos 105° = cos 60°·cos 45° − sen 60°·sen 45° = (1/2)(√2/2) − (√3/2)(√2/2) = (√2 − √6)/4 ≈ −0,2588.", "Es negativo, como corresponde al 2.º cuadrante."],
      resultado: "(√2 − √6)/4 ≈ −0,2588" },
    { id: "h3", nivel: 1,
      enunciado: "Si sen a = 5/13 y a es agudo, calcula sen 2a y cos 2a (decimales).",
      check: [{ tipo: "num", etiqueta: "sen 2a =", valor: 120 / 169, tol: 0.002 }, { tipo: "num", etiqueta: "cos 2a =", valor: 119 / 169, tol: 0.002 }],
      pistas: ["Primero cos a = √(1 − sen²a)."],
      pasos: ["cos a = 12/13.", "sen 2a = 2·(5/13)(12/13) = 120/169 ≈ 0,710.", "cos 2a = (12/13)² − (5/13)² = 119/169 ≈ 0,704."],
      resultado: "sen 2a = 120/169 · cos 2a = 119/169" },
    { id: "h4", nivel: 1,
      enunciado: "Calcula tan 75° = tan(45° + 30°). Da el valor decimal.",
      check: { tipo: "num", etiqueta: "tan 75° =", valor: 3.732, tol: 0.002 },
      pistas: ["tan(a + b) = (tan a + tan b)/(1 − tan a·tan b) con tan 45° = 1 y tan 30° = √3/3."],
      pasos: ["tan 75° = (1 + √3/3)/(1 − √3/3) = (3 + √3)/(3 − √3).", "Racionalizando: (3 + √3)²/6 = (12 + 6√3)/6 = 2 + √3 ≈ 3,732."],
      resultado: "2 + √3 ≈ 3,732" },
    { id: "h5", nivel: 1,
      enunciado: "Resuelve sen x = √3/2 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [60, 120], unidad: "°" },
      pistas: ["sen 60° = √3/2. El otro ángulo con el mismo seno es 180° − 60°."],
      pasos: ["x = 60° (1.er cuadrante) y x = 180° − 60° = 120° (2.º cuadrante)."],
      resultado: "x = 60° y x = 120°" },
    { id: "h6", nivel: 1,
      enunciado: "Resuelve cos x = −1/2 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [120, 240], unidad: "°" },
      pistas: ["cos 60° = 1/2: ángulo de referencia 60°, con coseno negativo (cuadrantes II y III)."],
      pasos: ["2.º cuadrante: 180° − 60° = 120°. 3.er cuadrante: 180° + 60° = 240°."],
      resultado: "x = 120° y x = 240°" },
    { id: "h7", nivel: 1,
      enunciado: "Resuelve tan x = 1 para x en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [45, 225], unidad: "°" },
      pistas: ["La tangente se repite cada 180°."],
      pasos: ["tan 45° = 1. Sumando 180°: x = 225°."],
      resultado: "x = 45° y x = 225°" },
    { id: "h8", nivel: 1,
      enunciado: "Si cos a = 7/25 y a es agudo, calcula sen(a/2).",
      check: { tipo: "num", etiqueta: "sen(a/2) =", valor: 0.6 },
      pistas: ["a/2 también es agudo: signo positivo."],
      pasos: ["sen(a/2) = √((1 − cos a)/2) = √((1 − 7/25)/2) = √(18/50) = √(9/25) = 3/5 = 0,6."],
      resultado: "3/5" },
    { id: "h9", nivel: 1,
      enunciado: "Calcula sen 50°·cos 40° + cos 50°·sen 40° sin calculadora.",
      check: { tipo: "num", etiqueta: "valor =", valor: 1 },
      pistas: ["Es el desarrollo de una fórmula de suma."],
      pasos: ["sen a·cos b + cos a·sen b = sen(a + b) con a = 50° y b = 40°: sen 90° = 1."],
      resultado: "1" },
    { id: "h10", nivel: 1,
      enunciado: "Calcula cos²15° − sen²15° sin calculadora (valor decimal).",
      check: { tipo: "num", etiqueta: "valor =", valor: 0.866, tol: 0.002 },
      pistas: ["Es cos 2a con a = 15°."],
      pasos: ["cos²a − sen²a = cos 2a → cos 30° = √3/2 ≈ 0,866."],
      resultado: "√3/2" },
    // ================= ★★ medio =================
    { id: "h11", nivel: 2,
      enunciado: "Si sen a = 4/5 (a en el 2.º cuadrante) y cos b = −12/13 (b en el 3.er cuadrante), calcula sen(a − b) y cos(a + b).",
      check: [{ tipo: "num", etiqueta: "sen(a − b) =", valor: -63 / 65, tol: 0.002, ph: "p/q o decimal" }, { tipo: "num", etiqueta: "cos(a + b) =", valor: 56 / 65, tol: 0.002 }],
      pistas: ["cos a = −3/5 y sen b = −5/13 (por los cuadrantes)."],
      pasos: ["sen(a − b) = (4/5)(−12/13) − (−3/5)(−5/13) = −48/65 − 15/65 = −63/65.", "cos(a + b) = (−3/5)(−12/13) − (4/5)(−5/13) = 36/65 + 20/65 = 56/65."],
      resultado: "sen(a − b) = −63/65 · cos(a + b) = 56/65" },
    { id: "h12", nivel: 2,
      enunciado: "Si tan a = 2 y tan b = 3, calcula tan(a + b).",
      check: { tipo: "num", etiqueta: "tan(a + b) =", valor: -1 },
      pistas: ["tan(a + b) = (tan a + tan b)/(1 − tan a·tan b)."],
      pasos: ["(2 + 3)/(1 − 2·3) = 5/(−5) = −1."],
      resultado: "−1" },
    { id: "h13", nivel: 2,
      enunciado: "Si tan a = 3/4 y a es agudo, calcula sen 2a, cos 2a y tan 2a.",
      check: [{ tipo: "num", etiqueta: "sen 2a =", valor: 0.96 }, { tipo: "num", etiqueta: "cos 2a =", valor: 0.28 }, { tipo: "num", etiqueta: "tan 2a =", valor: 24 / 7, tol: 0.002 }],
      pistas: ["tan a = 3/4 → catetos 3 y 4, hipotenusa 5: sen a = 3/5 y cos a = 4/5."],
      pasos: ["sen 2a = 2·(3/5)(4/5) = 24/25 = 0,96.", "cos 2a = 16/25 − 9/25 = 7/25 = 0,28.", "tan 2a = (24/25)/(7/25) = 24/7. (Con la fórmula: 2·(3/4)/(1 − 9/16) = (3/2)/(7/16) = 24/7.)"],
      resultado: "sen 2a = 24/25 · cos 2a = 7/25 · tan 2a = 24/7" },
    { id: "h14", nivel: 2,
      enunciado: "Si sen a = 0,6, calcula sen 3a con la fórmula del seno del triple, sen 3a = 3·sen a − 4·sen³a.",
      check: { tipo: "num", etiqueta: "sen 3a =", valor: 0.936 },
      pistas: ["Sustituye sen a = 0,6 en la fórmula."],
      pasos: ["sen 3a = 3·0,6 − 4·0,216 = 1,8 − 0,864 = 0,936."],
      resultado: "0,936" },
    { id: "h15", nivel: 2,
      enunciado: "Si cos a = −4/5 y 180° &lt; a &lt; 270°, calcula sen(a/2) y cos(a/2).",
      check: [{ tipo: "num", etiqueta: "sen(a/2) =", valor: 0.9487, tol: 0.002 }, { tipo: "num", etiqueta: "cos(a/2) =", valor: -0.3162, tol: 0.002 }],
      pistas: ["Si 180° &lt; a &lt; 270°, entonces 90° &lt; a/2 &lt; 135°: 2.º cuadrante."],
      pasos: ["sen(a/2) = +√((1 + 4/5)/2) = √(9/10) = 3/√10 ≈ 0,949.", "cos(a/2) = −√((1 − 4/5)/2) = −√(1/10) ≈ −0,316."],
      resultado: "sen(a/2) = 3/√10 · cos(a/2) = −1/√10" },
    { id: "h16", nivel: 2,
      enunciado: "Calcula el valor exacto de sen 22,5° como decimal usando el ángulo mitad de 45°.",
      check: { tipo: "num", etiqueta: "sen 22,5° =", valor: 0.3827, tol: 0.002 },
      pistas: ["22,5° = 45°/2, en el 1.er cuadrante."],
      pasos: ["sen 22,5° = √((1 − cos 45°)/2) = √((1 − 0,7071)/2) = √0,14645 = 0,3827 (= √(2 − √2)/2)."],
      resultado: "√(2 − √2)/2 ≈ 0,3827" },
    { id: "h17", nivel: 2,
      enunciado: "Resuelve sen 2x = 1/2 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [15, 75, 195, 255], unidad: "°" },
      pistas: ["2x = 30° + 360°n ó 150° + 360°n. Divide entre 2."],
      pasos: ["x = 15° + 180°n ó x = 75° + 180°n.", "En [0°, 360°): 15°, 195°, 75°, 255°."],
      resultado: "x = 15°, 75°, 195°, 255°" },
    { id: "h18", nivel: 2,
      enunciado: "Resuelve 2cos²x − 3cos x + 1 = 0 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 60, 300], unidad: "°" },
      pistas: ["Cambio t = cos x."],
      pasos: ["2t² − 3t + 1 = 0 → t = 1 o t = 1/2.", "cos x = 1 → x = 0°. cos x = 1/2 → x = 60° o 300°."],
      resultado: "x = 0°, 60°, 300°" },
    { id: "h19", nivel: 2,
      enunciado: "Resuelve sen 2x = cos x en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 90, 150, 270], unidad: "°" },
      pistas: ["Escribe sen 2x = 2 sen x cos x y saca factor común cos x. No dividas entre cos x."],
      pasos: ["cos x(2 sen x − 1) = 0.", "cos x = 0 → 90°, 270°. sen x = 1/2 → 30°, 150°."],
      resultado: "x = 30°, 90°, 150°, 270°" },
    { id: "h20", nivel: 2,
      enunciado: "Resuelve 2sen²x + cos x − 1 = 0 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 120, 240], unidad: "°" },
      pistas: ["Sustituye sen²x = 1 − cos²x para tener una sola razón."],
      pasos: ["2(1 − cos²x) + cos x − 1 = 0 → 2cos²x − cos x − 1 = 0 → cos x = 1 o −1/2.", "x = 0°; x = 120° o 240°."],
      resultado: "x = 0°, 120°, 240°" },
    { id: "h21", nivel: 2,
      enunciado: "Resuelve tan x = 2·sen x en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 60, 180, 300], unidad: "°" },
      pistas: ["tan x = sen x/cos x (con cos x ≠ 0). Llega a sen x(1 − 2cos x) = 0."],
      pasos: ["sen x = 2 sen x cos x → sen x(1 − 2cos x) = 0.", "sen x = 0 → 0°, 180°. cos x = 1/2 → 60°, 300°. Ninguna con cos x = 0."],
      resultado: "x = 0°, 60°, 180°, 300°" },
    { id: "h22", nivel: 2,
      enunciado: "Resuelve cos 2x + 3sen x − 2 = 0 en [0°, 360°). Escribe las tres soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 90, 150], unidad: "°" },
      pistas: ["cos 2x = 1 − 2sen²x deja la ecuación sólo en sen x."],
      pasos: ["1 − 2sen²x + 3sen x − 2 = 0 → 2sen²x − 3sen x + 1 = 0 → sen x = 1 o 1/2.", "sen x = 1 → 90°; sen x = 1/2 → 30° y 150°."],
      resultado: "x = 30°, 90°, 150°" },
    { id: "h23", nivel: 2,
      enunciado: "Resuelve sen x = −√3/2 para x en [0, 2π) (en radianes). Escribe las dos soluciones en decimales.",
      check: { tipo: "lista", etiqueta: "x =", valores: [4 * Math.PI / 3, 5 * Math.PI / 3], unidad: "rad", tol: 0.002, ph: "decimales (o 4pi/3, 5pi/3)" },
      pistas: ["sen es negativo en los cuadrantes III y IV; el ángulo de referencia es π/3."],
      pasos: ["III: π + π/3 = 4π/3 ≈ 4,189. IV: 2π − π/3 = 5π/3 ≈ 5,236."],
      resultado: "x = 4π/3 y x = 5π/3" },
    { id: "h24", nivel: 2,
      enunciado: "Escribe sen 3x + sen x como un producto y calcula su valor para x = 30°.",
      check: { tipo: "num", etiqueta: "valor en x = 30° =", valor: 1.5, tol: 0.002 },
      pistas: ["sen A + sen B = 2 sen((A + B)/2) cos((A − B)/2)."],
      pasos: ["sen 3x + sen x = 2·sen 2x·cos x.", "Con x = 30°: 2·sen 60°·cos 30° = 2·(√3/2)(√3/2) = 3/2 = 1,5. (Directo: sen 90° + sen 30° = 1 + 0,5 = 1,5 ✓.)"],
      resultado: "2·sen 2x·cos x → 1,5" },
    // ================= ★★★ nivel PAU =================
    { id: "h25", nivel: 3,
      enunciado: "Demuestra que tan x + 1/tan x = 2/sen 2x.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe tan x y 1/tan x en función de sen x y cos x", p: 0.5 },
        { t: "Suma las fracciones con denominador común sen x·cos x", p: 0.5 },
        { t: "Usa sen²x + cos²x = 1 en el numerador y obtiene 1/(sen x·cos x)", p: 0.5 },
        { t: "Aplica sen 2x = 2·sen x·cos x al lado derecho y comprueba que coincide", p: 0.5 }
      ] },
      pasos: ["tan x + 1/tan x = sen x/cos x + cos x/sen x = (sen²x + cos²x)/(sen x·cos x) = 1/(sen x·cos x).", "2/sen 2x = 2/(2·sen x·cos x) = 1/(sen x·cos x). Iguales. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h26", nivel: 3,
      enunciado: "Demuestra que sen x/(1 + cos x) + (1 + cos x)/sen x = 2/sen x.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Reduce a denominador común sen x·(1 + cos x)", p: 0.5 },
        { t: "Desarrolla (1 + cos x)² en el numerador", p: 0.5 },
        { t: "Usa sen²x + cos²x = 1 para obtener 2 + 2cos x = 2(1 + cos x)", p: 0.5 },
        { t: "Simplifica el factor (1 + cos x) y llega a 2/sen x", p: 0.5 }
      ] },
      pasos: ["[sen²x + (1 + cos x)²]/[sen x(1 + cos x)] = [sen²x + 1 + 2cos x + cos²x]/[sen x(1 + cos x)] = (2 + 2cos x)/[sen x(1 + cos x)] = 2/sen x. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h27", nivel: 3,
      enunciado: "Demuestra que cos 2x = (1 − tan²x)/(1 + tan²x).",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe tan²x = sen²x/cos²x en numerador y denominador", p: 0.5 },
        { t: "Reduce a común denominador: (cos²x − sen²x)/cos²x entre (cos²x + sen²x)/cos²x", p: 0.5 },
        { t: "Usa cos²x + sen²x = 1 en el denominador", p: 0.5 },
        { t: "Reconoce cos²x − sen²x = cos 2x", p: 0.5 }
      ] },
      pasos: ["(1 − tan²x)/(1 + tan²x) = [(cos²x − sen²x)/cos²x]/[(cos²x + sen²x)/cos²x] = (cos²x − sen²x)/(cos²x + sen²x) = cos²x − sen²x = cos 2x. ∎"],
      resultado: "Identidad demostrada" },
    { id: "h28", nivel: 3,
      enunciado: "Deduce la fórmula de cos(a + b) a partir de cos(a − b) = cos a·cos b + sen a·sen b.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 5, items: [
        { t: "Escribe a + b = a − (−b)", p: 0.5 },
        { t: "Aplica la fórmula de cos(a − b) cambiando b por −b", p: 0.5 },
        { t: "Usa cos(−b) = cos b y sen(−b) = −sen b", p: 0.5 },
        { t: "Obtiene cos(a + b) = cos a·cos b − sen a·sen b", p: 0.5 }
      ] },
      pasos: ["cos(a + b) = cos(a − (−b)) = cos a·cos(−b) + sen a·sen(−b).", "Como cos(−b) = cos b y sen(−b) = −sen b: cos(a + b) = cos a·cos b − sen a·sen b."],
      resultado: "cos(a + b) = cos a·cos b − sen a·sen b" },
    { id: "h29", nivel: 3,
      enunciado: "Resuelve sen x + cos x = 1 en [0°, 360°) y comprueba las soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 90], unidad: "°" },
      pistas: ["Eleva al cuadrado: 1 + sen 2x = 1.", "Comprueba cada candidata en la ecuación original."],
      pasos: ["sen²x + 2sen x cos x + cos²x = 1 → sen 2x = 0 → x = 0°, 90°, 180°, 270°.", "x = 180°: 0 − 1 ≠ 1 ✗. x = 270°: −1 + 0 ≠ 1 ✗.", "Válidas: 0° y 90°."],
      resultado: "x = 0° y x = 90°" },
    { id: "h30", nivel: 3,
      enunciado: "Resuelve sen 3x + sen x = 0 en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [0, 90, 180, 270], unidad: "°" },
      pistas: ["Transforma la suma en un producto: 2 sen 2x cos x."],
      pasos: ["2·sen 2x·cos x = 0.", "sen 2x = 0 → x = 0°, 90°, 180°, 270°. cos x = 0 → 90°, 270°."],
      resultado: "x = 0°, 90°, 180°, 270°" },
    { id: "h31", nivel: 3,
      enunciado: "Resuelve sen x + sen 3x = cos x + cos 3x en [0°, 360°). Escribe las seis soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [22.5, 90, 112.5, 202.5, 270, 292.5], unidad: "°", ph: "seis valores" },
      pistas: ["Transforma las dos sumas en productos y saca factor común cos x."],
      pasos: ["2 sen 2x cos x = 2 cos 2x cos x → cos x (sen 2x − cos 2x) = 0.", "cos x = 0 → 90°, 270°. tan 2x = 1 → 2x = 45° + 180°n → x = 22,5° + 90°n: 22,5°, 112,5°, 202,5°, 292,5°."],
      resultado: "x = 22,5°, 90°, 112,5°, 202,5°, 270°, 292,5°" },
    { id: "h32", nivel: 3,
      enunciado: "Resuelve 4sen²x − 1 = 0 en [0°, 360°). Escribe las cuatro soluciones.",
      check: { tipo: "lista", etiqueta: "x =", valores: [30, 150, 210, 330], unidad: "°" },
      pistas: ["sen x = ±1/2: ¡las dos raíces cuadradas!"],
      pasos: ["sen²x = 1/4 → sen x = 1/2 o sen x = −1/2.", "sen x = 1/2 → 30°, 150°. sen x = −1/2 → 210°, 330°."],
      resultado: "x = 30°, 150°, 210°, 330°" },
    { id: "h33", nivel: 3,
      enunciado: "Halla el valor máximo de f(x) = sen x + cos x y el ángulo de [0°, 360°) en el que se alcanza.",
      check: [{ tipo: "num", etiqueta: "máximo =", valor: Math.SQRT2, tol: 0.002 }, { tipo: "num", etiqueta: "en x =", valor: 45, unidad: "°" }],
      pistas: ["Escribe f(x) = R·sen(x + φ) con R = √(a² + b²)."],
      pasos: ["R = √2 y φ = 45°: f(x) = √2·sen(x + 45°).", "Máximo √2 ≈ 1,414 cuando x + 45° = 90° → x = 45°."],
      resultado: "√2 en x = 45°" },
    { id: "h34", nivel: 3,
      enunciado: "Escribe 3·sen x + 4·cos x = R·sen(x + φ) y da R y φ (en grados).",
      check: [{ tipo: "num", etiqueta: "R =", valor: 5 }, { tipo: "num", etiqueta: "φ =", valor: 53.13, unidad: "°" }],
      pistas: ["R = √(a² + b²), tan φ = b/a."],
      pasos: ["R = √(9 + 16) = 5. tan φ = 4/3 → φ = 53,13° (a y b positivos: 1.er cuadrante)."],
      resultado: "5·sen(x + 53,13°)" },
    { id: "h35", nivel: 3,
      enunciado: "Resuelve sen x − √3·cos x = 1 en [0°, 360°).",
      check: { tipo: "lista", etiqueta: "x =", valores: [90, 210], unidad: "°" },
      pistas: ["R = 2 y φ = −60°: sen x − √3 cos x = 2 sen(x − 60°)."],
      pasos: ["2·sen(x − 60°) = 1 → sen(x − 60°) = 1/2 → x − 60° = 30° o 150°.", "x = 90° o x = 210°. Comprobación: sen 90° − √3·0 = 1 ✓ y sen 210° − √3·cos 210° = −0,5 + 1,5 = 1 ✓."],
      resultado: "x = 90° y x = 210°" },
    { id: "h36", nivel: 3,
      enunciado: "Si tan a = 1/2 y tan b = 1/3, con a y b agudos, ¿cuánto vale a + b (en grados)?",
      check: { tipo: "num", etiqueta: "a + b =", valor: 45, unidad: "°" },
      pistas: ["Calcula tan(a + b) con la fórmula de la suma."],
      pasos: ["tan(a + b) = (1/2 + 1/3)/(1 − 1/6) = (5/6)/(5/6) = 1.", "Como a y b son agudos y tan a, tan b &lt; 1, ambos son menores de 45°, luego a + b &lt; 90°: a + b = 45°."],
      resultado: "45°" }
  ];

  var lamina = [
    { titulo: "Suma y diferencia de ángulos", ancha: true,
      items: [
        { label: "Seno", formula: "sen(a ± b) = sen a·cos b ± cos a·sen b", ojo: "El signo del medio es el MISMO que en el paréntesis." },
        { label: "Coseno", formula: "cos(a ± b) = cos a·cos b ∓ sen a·sen b", ojo: "El signo del medio es el CONTRARIO." },
        { label: "Tangente", formula: "tan(a ± b) = " + fr("tan a ± tan b", "1 ∓ tan a·tan b"), ejemplo: "tan 75° = (1 + √3/3)/(1 − √3/3) = 2 + √3" }
      ],
      nota: "Ejemplo: sen 75° = sen(45° + 30°) = (√6 + √2)/4. Y sen(a + b) NO es sen a + sen b." },
    { titulo: "Ángulo doble y reducción de potencias",
      items: [
        { label: "Seno y coseno del doble", formula: "sen 2a = 2·sen a·cos a · cos 2a = cos²a − sen²a", ejemplo: "sen a = 5/13 → sen 2a = 120/169" },
        { label: "Tres formas de cos 2a", formula: "cos²a − sen²a = 2cos²a − 1 = 1 − 2sen²a", cuando: "Elige la que use el dato (cos o sen)." },
        { label: "Tangente", formula: "tan 2a = " + fr("2·tan a", "1 − tan²a") },
        { label: "Potencias", formula: "cos²a = (1 + cos 2a)/2 · sen²a = (1 − cos 2a)/2" }
      ],
      nota: "Triple: sen 3a = 3sen a − 4sen³a · cos 3a = 4cos³a − 3cos a." },
    { titulo: "Ángulo mitad",
      items: [
        { label: "Seno y coseno", formula: "sen(a/2) = ±" + raiz(fr("1 − cos a", "2")) + "   cos(a/2) = ±" + raiz(fr("1 + cos a", "2")), cuando: "El signo lo decide el cuadrante de a/2.", ojo: "Escribe la desigualdad de a/2 antes de elegir el signo." },
        { label: "Tangente sin signo", formula: "tan(a/2) = " + fr("1 − cos a", "sen a") + " = " + fr("sen a", "1 + cos a") }
      ] },
    { titulo: "Ecuaciones trigonométricas",
      tabla: { cab: ["Ecuación", "Soluciones (n entero)"], filas: [
        ["sen x = k", "x = α + 360°n  ó  x = 180° − α + 360°n"],
        ["cos x = k", "x = ±α + 360°n"],
        ["tan x = k", "x = α + 180°n"],
        ["sen 2x = k", "2x = α + 360°n ó 180° − α + 360°n → divide TODO entre 2"]
      ] },
      pasos: ["Reduce a una sola razón y un solo ángulo (sen² + cos² = 1, ángulo doble).", "Si sale un producto, iguala cada factor a 0. NO dividas entre una razón.", "Cambio t = sen x (o cos x) si hay segundo grado.", "Da las soluciones del intervalo; si elevaste al cuadrado, comprueba."],
      nota: "Con la calculadora sale un solo ángulo: dibuja la circunferencia para encontrar el otro." },
    { titulo: "Cómo demostrar una identidad", ancha: true,
      pasos: ["Elige el lado más complicado.", "Pasa todo a seno y coseno (tan = sen/cos…).", "Denominador común / multiplica por el conjugado: (1 + cos)(1 − cos) = 1 − cos² = sen².", "Usa sen² + cos² = 1 y las fórmulas del ángulo doble.", "Llega al otro lado. ∎ Nunca pases términos de un lado a otro."],
      nota: "Comprobar con un valor no es demostrar. En un examen hay que hacerlo con álgebra." },
    { titulo: "Sumas y productos", ancha: true,
      tabla: { cab: ["Suma", "Producto"], filas: [
        ["sen A + sen B", "2·sen((A+B)/2)·cos((A−B)/2)"], ["sen A − sen B", "2·cos((A+B)/2)·sen((A−B)/2)"], ["cos A + cos B", "2·cos((A+B)/2)·cos((A−B)/2)"], ["cos A − cos B", "−2·sen((A+B)/2)·sen((A−B)/2)"]
      ] },
      nota: "a·sen x + b·cos x = R·sen(x + φ) con R = √(a²+b²) y tan φ = b/a." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "sen(a + b) = sen a + sen b", bien: "sen a·cos b + cos a·sen b", por: "sen 30° + sen 60° = 1,37 > 1: imposible." },
        { mal: "cos(a + b) = cos a·cos b + sen a·sen b", bien: "… − sen a·sen b", por: "El signo del coseno de la suma es el contrario." },
        { mal: "sen 2a = 2·sen a", bien: "sen 2a = 2·sen a·cos a", por: "El seno no es lineal." },
        { mal: "Dividir entre cos x en sen 2x = cos x", bien: "Factor común: cos x(2sen x − 1) = 0", por: "Dividir pierde las soluciones con cos x = 0." },
        { mal: "sen 2x = 1/2 → x = 30° + 360°n", bien: "x = 15° + 180°n y 75° + 180°n", por: "Al despejar x se divide también el período." },
        { mal: "Pasar términos para demostrar una identidad", bien: "Transformar un solo lado", por: "Dar por cierta la igualdad es hacer trampa." }
      ] }
  ];

  B.registrar("mates1", "t5", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 6: Números complejos
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t6/" + ref); }

  var resumen = [
    "La <b>unidad imaginaria</b> i cumple i² = −1. Un complejo es <b>z = a + bi</b> (parte real a, parte imaginaria b). Las potencias de i se repiten de 4 en 4.",
    "Se suma y se resta por partes; se multiplica con la distributiva (i² = −1); se divide <b>multiplicando por el conjugado</b> del denominador.",
    "En el plano complejo z es el punto (a, b). <b>Módulo</b> |z| = √(a² + b²); <b>argumento</b> θ con tan θ = b/a (¡mira el cuadrante!).",
    "Forma polar: <b>z = r<sub>θ</sub> = r(cos θ + i·sen θ)</b>. Multiplicar: módulos × y argumentos +. Dividir: módulos ÷ y argumentos −.",
    "<b>De Moivre</b>: zⁿ = rⁿ·(cos nθ + i·sen nθ). Las <b>raíces n-ésimas</b> son n puntos de un polígono regular: ⁿ√r con argumentos (θ + 360°k)/n.",
    "Toda ecuación polinómica de grado n tiene n raíces complejas (contando repeticiones)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Por qué
  secciones[0] =
    "<h5>Una pequeña historia: los complejos nacieron de las ecuaciones de tercer grado</h5>" +
    "<p>Los números imaginarios no surgieron de la ecuación x² + 1 = 0 (esa se descartaba diciendo «no tiene solución»), sino de una sorpresa en el siglo XVI. Cuando Cardano (1545) publicó la fórmula para resolver las ecuaciones de tercer grado, ocurrió algo extraño: ecuaciones como x³ = 15x + 4, que tienen una solución real evidente (x = 4), obligaban en la fórmula a pasar por raíces cuadradas de números negativos. Bombelli (1572) tuvo la idea de operar con esos símbolos «imposibles» como si fueran números, y al final del cálculo los trozos imaginarios se cancelaban y salía el 4. Había que aceptarlos: eran un puente necesario. Euler les dio la letra <b>i</b> (siglo XVIII) y Gauss los dibujó en un plano (hacia 1800).</p>" +
    "<h5>Cuidado con √(−1)</h5>" +
    "<p>Se puede escribir i = √−1, pero las propiedades de las raíces de reales positivos <b>no</b> siguen valiendo con negativos. Por ejemplo, √(−4)·√(−9) = (2i)(3i) = 6i² = <b>−6</b>, y en cambio √((−4)(−9)) = √36 = 6. Por eso conviene escribir siempre primero √(−a) = √a·i y operar después: √(−4) = 2i, √(−9) = 3i, √(−5) = i√5.</p>" +
    "<h5>Las potencias de i dan vueltas de 90°</h5>" +
    "<p>Calculando: i⁰ = 1, i¹ = i, i² = −1, i³ = i²·i = −i, i⁴ = i²·i² = 1, i⁵ = i⁴·i = i… ¡se repite cada 4! Así que para calcular iⁿ basta dividir n entre 4 y mirar el <b>resto</b>: resto 0 → 1; resto 1 → i; resto 2 → −1; resto 3 → −i. (Multiplicar por i equivale a girar 90°, como se ve en el plano complejo.)</p>" +
    w("potenciasi") +
    ejemplo("Potencias grandes", "Calcula i²⁵, i¹⁰² y i⁻³, y la suma 1 + i + i² + i³ + … + i⁹⁹.", [
      "25 = 4·6 + 1 → i²⁵ = i¹ = <b>i</b>.",
      "102 = 4·25 + 2 → i¹⁰² = i² = <b>−1</b>.",
      "i⁻³ = 1/i³ = 1/(−i) = i/(−i·i) = i/1 = <b>i</b>. (También: −3 + 4 = 1 → i¹ = i, porque sumar un múltiplo de 4 al exponente no cambia el resultado.)",
      "Cada cuatro potencias seguidas suman 1 + i − 1 − i = 0. La suma de i⁰ a i⁹⁹ tiene 100 términos = 25 bloques de 4 → <b>0</b>."
    ]) +
    "<h5>Ecuaciones de segundo grado que antes «no tenían solución»</h5>" +
    "<p>Con i, la fórmula de la ecuación de segundo grado funciona siempre: si Δ = b² − 4ac es negativo, √Δ = i·√|Δ| y las soluciones son dos complejos <b>conjugados</b>.</p>" +
    ejemplo("Δ negativo", "Resuelve x² + 2x + 5 = 0 y x² + x + 1 = 0.", [
      "x² + 2x + 5 = 0: Δ = 4 − 20 = −16 → √Δ = 4i → x = (−2 ± 4i)/2 = <b>−1 ± 2i</b>. (Comprobación: la suma −2 = −b/a y el producto (−1)² + 2² = 5 = c/a ✓.)",
      "x² + x + 1 = 0: Δ = 1 − 4 = −3 → √Δ = i√3 → x = <b>(−1 ± i√3)/2</b>. Son los números llamados «raíces cúbicas de la unidad» (ya aparecerán en este tema)."
    ]) +
    "<h5>El teorema fundamental del álgebra</h5>" +
    "<p>Con los complejos se cierra el círculo: <b>toda ecuación polinómica de grado n tiene exactamente n raíces complejas</b> (contando cada raíz tantas veces como su multiplicidad). Por eso x² + 1 tiene dos (i y −i), x³ − 1 tiene tres, etc. No hace falta inventar ningún número más. Además, si el polinomio tiene coeficientes reales, las raíces no reales vienen siempre <b>por parejas de conjugados</b>: si 3 − 2i es raíz, 3 + 2i también.</p>";

  // ---------------------------------------------------------------- 2. Binómica
  secciones[1] =
    "<h5>Igualdad, conjugado y opuesto</h5>" +
    "<ul><li><b>Dos complejos son iguales</b> cuando tienen la misma parte real y la misma parte imaginaria: a + bi = c + di ⇔ a = c y b = d. Es la propiedad más usada para <i>resolver ecuaciones</i>: una igualdad entre complejos equivale a <b>dos igualdades entre reales</b>.</li>" +
    "<li>El <b>opuesto</b> de a + bi es −a − bi. El <b>conjugado</b> es a − bi (se cambia sólo el signo de la parte imaginaria).</li>" +
    "<li>Un número es <b>real</b> si b = 0, <b>imaginario puro</b> si a = 0 y b ≠ 0. Un complejo es igual a su conjugado si y sólo si es real.</li></ul>" +
    ejemplo("Hallar x e y reales", "Halla x e y para que (2x − y) + (x + 3y)i = 5 + 6i.", [
      "Igualamos partes reales: 2x − y = 5. Igualamos partes imaginarias: x + 3y = 6.",
      "Despejando y = 2x − 5 en la segunda: x + 3(2x − 5) = 6 → 7x = 21 → x = 3, y = 1.",
      "<b>x = 3 e y = 1</b>. Comprobación: (6 − 1) + (3 + 3)i = 5 + 6i ✓."
    ]) +
    ejemplo("Parte real e imaginaria", "Indica Re(z), Im(z) y el conjugado de z = −2 + 5i, w = 7i y u = 4.", [
      "z = −2 + 5i: Re = −2, Im = 5 (el 5, no «5i»), conjugado −2 − 5i.",
      "w = 7i: Re = 0, Im = 7, imaginario puro, conjugado −7i.",
      "u = 4: Re = 4, Im = 0, real puro, conjugado 4 (igual a sí mismo)."
    ]);

  // ---------------------------------------------------------------- 3. Operaciones
  secciones[2] =
    "<h5>Las reglas, con una calculadora que muestra los pasos</h5>" +
    "<p>Prueba con tus números y mira cómo se desarrolla cada operación, y dónde aparece cada resultado en el plano:</p>" +
    w("operaciones") +
    "<h5>Propiedades del conjugado (lo que más se usa)</h5>" +
    "<ul><li><b>z + z̄ = 2a</b> (siempre un número real) y <b>z − z̄ = 2bi</b> (imaginario puro).</li>" +
    "<li><b>z·z̄ = a² + b² = |z|²</b> (siempre un real ≥ 0). Es la clave de la división.</li>" +
    "<li>El conjugado de una suma, producto o cociente es la suma, producto o cociente de los conjugados: conj(z·w) = z̄·w̄.</li></ul>" +
    ejemplo("División con el conjugado", "Calcula (3 − 2i)/(1 + 2i).", [
      "Multiplicamos arriba y abajo por el conjugado del denominador, 1 − 2i.",
      "Denominador: (1 + 2i)(1 − 2i) = 1 + 4 = 5.",
      "Numerador: (3 − 2i)(1 − 2i) = 3 − 6i − 2i + 4i² = 3 − 8i − 4 = −1 − 8i.",
      "(−1 − 8i)/5 = <b>−1/5 − (8/5)i</b> = −0,2 − 1,6i."
    ]) +
    ejemplo("Potencias de un complejo en binómica", "Calcula (1 + i)² y (2 − i)³.", [
      "(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = <b>2i</b> (es la identidad notable (a + b)² con i² = −1).",
      "(2 − i)² = 4 − 4i + i² = 3 − 4i. Entonces (2 − i)³ = (3 − 4i)(2 − i) = 6 − 3i − 8i + 4i² = 6 − 11i − 4 = <b>2 − 11i</b>."
    ]) +
    ejemplo("Despejar un complejo", "Resuelve (1 + 2i)·z = 3 − i.", [
      "z = (3 − i)/(1 + 2i). Multiplicamos por el conjugado del denominador: (3 − i)(1 − 2i)/5 = (3 − 6i − i + 2i²)/5 = (1 − 7i)/5.",
      "<b>z = 1/5 − (7/5)i</b> = 0,2 − 1,4i. Comprobación: (1 + 2i)(0,2 − 1,4i) = 0,2 − 1,4i + 0,4i − 2,8i² = 0,2 + 2,8 − i = 3 − i ✓."
    ]) +
    ojo("al multiplicar, no te olvides de que <b>i² = −1</b>: el producto (a + bi)(c + di) tiene parte real ac − bd, con un <b>menos</b>. Y no «dejes» una i en el denominador: siempre se multiplica por el conjugado hasta que el denominador sea real.");

  // ---------------------------------------------------------------- 4. Plano
  secciones[3] =
    "<h5>Dos números en el plano: suma, producto y cociente</h5>" +
    "<p>El plano complejo no es sólo una forma de dibujar: las operaciones tienen un significado geométrico. Arrastra los puntos y observa. La <b>suma</b> es la diagonal del paralelogramo (como sumar vectores). El <b>conjugado</b> es el reflejo respecto del eje real. El <b>opuesto</b>, el simétrico respecto del origen. Y el <b>producto</b> y el <b>cociente</b> son giros y estiramientos:</p>" +
    w("plano") +
    "<p>Una consecuencia importante: <b>multiplicar por i</b> es girar 90° (porque i tiene módulo 1 y argumento 90°). Por ejemplo, el punto 2 + i, al multiplicarlo por i, pasa a ser (2 + i)·i = 2i + i² = −1 + 2i: es el mismo punto girado 90° alrededor del origen en sentido antihorario.</p>" +
    ejemplo("Un giro de 90° y la suma", "El triángulo con vértices 0, 4 y 4 + 3i: gíralo 90° alrededor del origen. ¿Dónde caen 4 y 4 + 3i?", [
      "Girar 90° es multiplicar por i: 4·i = <b>4i</b> y (4 + 3i)·i = 4i + 3i² = <b>−3 + 4i</b>.",
      "El vértice 0 no se mueve. Comprobamos que las distancias se conservan: |4 + 3i| = 5 y |−3 + 4i| = 5 ✓."
    ]);

  // ---------------------------------------------------------------- 5. Módulo y argumento
  secciones[4] =
    "<h5>Cómo calcular el argumento sin equivocarse de cuadrante</h5>" +
    "<p>La calculadora, con tan⁻¹(b/a), sólo devuelve ángulos entre −90° y 90° (cuadrantes I y IV). Si el afijo está en el II o III, el ángulo sale equivocado en 180°. El método seguro:</p>" +
    "<ol><li>Dibuja (o razona) en qué <b>cuadrante</b> está el punto (a, b).</li><li>Calcula el <b>ángulo de referencia</b> α = arctan(|b|/|a|) (siempre agudo).</li><li>El argumento es α (cuadrante I), 180° − α (II), 180° + α (III) o 360° − α (IV). Si está sobre un eje, se lee directamente.</li></ol>" +
    ejemplo("Un argumento en cada cuadrante", "Calcula módulo y argumento de 1 + i, −1 + i, −√3 − i y 2 − 2√3 i.", [
      "<b>1 + i</b>: |z| = √2. 1.er cuadrante, α = arctan(1) = 45° → θ = <b>45°</b>.",
      "<b>−1 + i</b>: |z| = √2. 2.º cuadrante, α = 45° → θ = 180° − 45° = <b>135°</b>.",
      "<b>−√3 − i</b>: |z| = √(3 + 1) = 2. 3.er cuadrante, α = arctan(1/√3) = 30° → θ = 180° + 30° = <b>210°</b>.",
      "<b>2 − 2√3 i</b>: |z| = √(4 + 12) = 4. 4.º cuadrante, α = arctan(2√3/2) = arctan √3 = 60° → θ = 360° − 60° = <b>300°</b> (o −60°)."
    ]) +
    ejemplo("Sobre los ejes", "Argumento de 3, −2, 5i y −4i.", [
      "<b>3</b>: eje real positivo → 0°. <b>−2</b>: eje real negativo → 180°. <b>5i</b>: eje imaginario positivo → 90°. <b>−4i</b>: eje imaginario negativo → 270° (o −90°)."
    ]) +
    "<h5>Propiedades del módulo</h5>" +
    "<ul><li>|z|² = z·z̄ y |z̄| = |−z| = |z|.</li><li>|z·w| = |z|·|w| y |z/w| = |z|/|w|.</li><li>Desigualdad triangular: |z + w| ≤ |z| + |w| (el lado de un triángulo no supera a la suma de los otros dos).</li><li>|z − w| es la <b>distancia entre los puntos</b> z y w. Esto permite describir circunferencias y mediatrices (sección 9).</li></ul>" +
    "<p>El argumento no es único: si θ es un argumento, θ + 360°·k también. Se suele tomar el <b>argumento principal</b>, el que está en [0°, 360°) (o en (−180°, 180°], según el libro). También se mide en radianes: arg(−1 + i) = 3π/4.</p>";

  // ---------------------------------------------------------------- 6. Polar
  secciones[5] =
    "<h5>Cuatro formas de escribir el mismo número</h5>" +
    tabla(["Forma", "Escritura", "Ejemplo (z = 1 + i)"], [
      ["Binómica", "a + bi", "1 + i"],
      ["Polar", "r<sub>θ</sub>", "√2<sub>45°</sub>"],
      ["Trigonométrica", "r(cos θ + i·sen θ)", "√2(cos 45° + i·sen 45°)"],
      ["Exponencial (Euler)", "r·e<sup>iθ</sup> (θ en radianes)", "√2·e<sup>iπ/4</sup>"]
    ]) +
    "<p>La última (fórmula de Euler, e<sup>iθ</sup> = cos θ + i·sen θ) aparece en cursos de ingeniería y física: la verás en 2.º y en la universidad. Una consecuencia famosa: e<sup>iπ</sup> + 1 = 0, que une los cinco números más importantes de las matemáticas.</p>" +
    w("conversor") +
    ejemplo("De binómica a polar", "Escribe z = −1 + i y w = 4 − 4√3 i en forma polar.", [
      "z = −1 + i: |z| = √2 y θ = 135° (2.º cuadrante). <b>z = √2<sub>135°</sub></b>.",
      "w = 4 − 4√3 i: |w| = √(16 + 48) = 8. α = arctan(4√3/4) = 60°, 4.º cuadrante → θ = 300°. <b>w = 8<sub>300°</sub></b>."
    ]) +
    ejemplo("De polar a binómica", "Pasa a binómica 3<sub>150°</sub> y 2<sub>90°</sub>.", [
      "3<sub>150°</sub> = 3(cos 150° + i·sen 150°) = 3(−√3/2 + i/2) = <b>−3√3/2 + (3/2)i ≈ −2,598 + 1,5i</b>.",
      "2<sub>90°</sub> = 2(cos 90° + i·sen 90°) = 2(0 + i) = <b>2i</b>."
    ]) +
    "<p>Algunos números tienen formas polares que conviene reconocer: 1 = 1<sub>0°</sub>, i = 1<sub>90°</sub>, −1 = 1<sub>180°</sub>, −i = 1<sub>270°</sub>; y cualquier real positivo r = r<sub>0°</sub>, real negativo −r = r<sub>180°</sub>.</p>";

  // ---------------------------------------------------------------- 7. Mult, div, potencias
  secciones[6] =
    "<h5>Por qué en polar se multiplican los módulos y se suman los argumentos</h5>" +
    "<p>Es una consecuencia directa de las fórmulas de suma de ángulos del Tema 5. Sea z = r(cos α + i·sen α) y w = s(cos β + i·sen β). Entonces:</p>" +
    "<p>z·w = rs[(cos α·cos β − sen α·sen β) + i(sen α·cos β + cos α·sen β)] = rs[<b>cos(α + β) + i·sen(α + β)</b>] = (rs)<sub>α+β</sub>.</p>" +
    "<p>Dividir es lo inverso: (r/s)<sub>α−β</sub>. Y la potencia, repetir el producto n veces, da el <b>teorema de De Moivre</b>: (r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>.</p>" +
    ejemplo("Producto, cociente y potencia", "Calcula 2<sub>30°</sub>·5<sub>75°</sub>, 12<sub>200°</sub>/3<sub>50°</sub> y (3<sub>20°</sub>)⁴.", [
      "Producto: módulos 2·5 = 10, argumentos 30° + 75° = 105°. <b>10<sub>105°</sub></b>.",
      "Cociente: módulos 12/3 = 4, argumentos 200° − 50° = 150°. <b>4<sub>150°</sub></b>.",
      "Potencia: módulo 3⁴ = 81, argumento 4·20° = 80°. <b>81<sub>80°</sub></b>."
    ]) +
    ejemplo("Una potencia grande, sin desarrollar", "Calcula (1 + i)⁸ y (√3 + i)¹⁰.", [
      "1 + i = √2<sub>45°</sub>. (1 + i)⁸ = ((√2)⁸)<sub>8·45°</sub> = 16<sub>360°</sub> = 16<sub>0°</sub> = <b>16</b>.",
      "√3 + i = 2<sub>30°</sub>. (√3 + i)¹⁰ = (2¹⁰)<sub>300°</sub> = 1024(cos 300° + i·sen 300°) = 1024(1/2 − (√3/2)i) = <b>512 − 512√3 i ≈ 512 − 886,8i</b>."
    ]) +
    ejemplo("Combinar forma polar y binómica", "Calcula (1 + i)²⁰/(1 − i)¹⁰.", [
      "1 + i = √2<sub>45°</sub> → (1 + i)²⁰ = ((√2)²⁰)<sub>900°</sub> = 1024<sub>180°</sub> = −1024.",
      "1 − i = √2<sub>315°</sub> → (1 − i)¹⁰ = ((√2)¹⁰)<sub>3150°</sub> = 32<sub>270°</sub> (3150° − 8·360° = 270°) = −32i.",
      "Cociente: (−1024)/(−32i) = 32/i = −32i. En polar: <b>32<sub>270°</sub></b>."
    ]) +
    ojo("al multiplicar en polar, los argumentos se <b>suman</b> (no se multiplican) y al elevar a n el módulo se eleva a n pero el argumento <b>se multiplica</b> por n. Y recuerda reducir el argumento resultante a [0°, 360°).");

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Raíces n-ésimas de un número complejo",
      html:
        "<p>Calcular una raíz n-ésima de w es encontrar todos los z con zⁿ = w. En ℂ hay <b>exactamente n</b>. Con De Moivre se encuentran fácilmente: si w = r<sub>θ</sub>, buscamos z = ρ<sub>φ</sub> con ρⁿ = r y nφ = θ + 360°·k (el argumento de zⁿ sólo se conoce salvo vueltas completas). Despejando:</p>" +
        H.formula("ⁿ√(r<sub>θ</sub>) = ( ⁿ√r )<sub>(θ + 360°·k)/n</sub>          k = 0, 1, 2, …, n − 1") +
        "<p>Esos n números tienen el <b>mismo módulo</b> y sus argumentos se separan 360°/n: son los vértices de un <b>polígono regular de n lados</b> inscrito en una circunferencia. Cambia el índice y el número:</p>" +
        w("raices") +
        ejemplo("Raíces cúbicas de 8", "Halla las raíces cúbicas de 8.", [
          "8 = 8<sub>0°</sub>. Módulo de las raíces: ∛8 = 2. Argumentos: (0° + 360°·k)/3 = 0°, 120°, 240°.",
          "<b>2<sub>0°</sub> = 2</b>, <b>2<sub>120°</sub> = −1 + √3 i</b> y <b>2<sub>240°</sub> = −1 − √3 i</b>. Forman un triángulo equilátero de radio 2; sólo una de las tres es real."
        ]) +
        ejemplo("Raíces cuadradas de −4", "Halla las raíces cuadradas de −4.", [
          "−4 = 4<sub>180°</sub>. Módulo: √4 = 2. Argumentos: (180° + 360°k)/2 = 90°, 270°.",
          "<b>2<sub>90°</sub> = 2i</b> y <b>2<sub>270°</sub> = −2i</b>. (Se comprueba: (2i)² = 4i² = −4 ✓.)"
        ]) +
        ejemplo("Raíces cuartas de −16", "Halla las raíces cuartas de −16.", [
          "−16 = 16<sub>180°</sub>. Módulo: ⁴√16 = 2. Argumentos: (180° + 360°k)/4 = 45°, 135°, 225°, 315°.",
          "Las cuatro raíces son 2<sub>45°</sub>, 2<sub>135°</sub>, 2<sub>225°</sub> y 2<sub>315°</sub>, es decir, <b>±√2 ± √2 i</b> (los vértices de un cuadrado). Su suma es 0, como la de las raíces de cualquier z<sup>n</sup> − w con n ≥ 2."
        ]) +
        ejemplo("Raíces de la unidad", "Halla las raíces sextas de 1 y el lado del polígono que forman.", [
          "1 = 1<sub>0°</sub>: módulo 1 y argumentos 0°, 60°, 120°, 180°, 240°, 300°: z = 1, (1 + √3 i)/2, (−1 + √3 i)/2, −1, (−1 − √3 i)/2, (1 − √3 i)/2.",
          "Forman un hexágono regular inscrito en la circunferencia de radio 1, y por eso el lado mide <b>1</b> (en un hexágono regular, el lado es igual al radio). En general, el lado es 2·sen(180°/n)."
        ]) +
        ojo("no te quedes con una sola raíz: cuando se pide «las raíces», hay que dar las <b>n</b>. Y comprueba con tu calculadora que (raíz)ⁿ vuelve a w.")
    },
    {
      h: "9. Ecuaciones en ℂ",
      html:
        "<p>Casi todas las ecuaciones con complejos se resuelven con una de estas técnicas:</p>" +
        "<ul><li><b>Ecuaciones polinómicas</b> con las fórmulas del Tema 3 (la ecuación de segundo grado con Δ &lt; 0 da dos conjugados).</li>" +
        "<li><b>Ecuaciones binomias</b> zⁿ = w: raíces n-ésimas en polar.</li>" +
        "<li><b>Con z y z̄ a la vez</b>: se escribe z = x + yi (x, y reales), se desarrolla y se iguala parte real con parte real y parte imaginaria con parte imaginaria.</li></ul>" +
        ejemplo("Con z y su conjugado", "Resuelve z + 2z̄ = 3 + 2i.", [
          "Sea z = x + yi, con lo que z̄ = x − yi. Entonces z + 2z̄ = (x + yi) + (2x − 2yi) = 3x − yi.",
          "Igualando con 3 + 2i: 3x = 3 y −y = 2 → x = 1, y = −2.",
          "<b>z = 1 − 2i</b>. Comprobación: (1 − 2i) + 2(1 + 2i) = 3 + 2i ✓."
        ]) +
        ejemplo("Raíz cuadrada en binómica", "Halla las raíces cuadradas de −3 + 4i sin pasar a polar.", [
          "Buscamos z = x + yi con z² = −3 + 4i, es decir, (x² − y²) + 2xy·i = −3 + 4i → x² − y² = −3 y 2xy = 4.",
          "De la segunda, y = 2/x. En la primera: x² − 4/x² = −3 → x⁴ + 3x² − 4 = 0 (bicuadrada) → x² = 1 (la otra, x² = −4, no es real) → x = ±1, y = ±2.",
          "Raíces: <b>1 + 2i</b> y <b>−1 − 2i</b>. Comprobación: (1 + 2i)² = 1 + 4i − 4 = −3 + 4i ✓."
        ]) +
        ejemplo("z² = z̄", "Halla todos los complejos que cumplen z² = z̄.", [
          "Con z = x + yi: (x² − y²) + 2xy·i = x − yi → x² − y² = x y 2xy = −y.",
          "De la segunda: y(2x + 1) = 0 → y = 0 o x = −1/2.",
          "Si y = 0: x² = x → x = 0 o x = 1. Si x = −1/2: 1/4 − y² = −1/2 → y² = 3/4 → y = ±√3/2.",
          "<b>Cuatro soluciones</b>: 0, 1 y (−1 ± √3 i)/2 (las dos últimas son 1<sub>120°</sub> y 1<sub>240°</sub>)."
        ]) +
        ejemplo("Sistema con complejos", "Resuelve z + w = 4 + i y z − w = 2 + 3i.", [
          "Sumando: 2z = 6 + 4i → z = 3 + 2i. Restando: 2w = 2 − 2i → w = 1 − i.",
          "<b>z = 3 + 2i y w = 1 − i</b>. (Mismas técnicas de reducción que con reales.)"
        ])
    },
    {
      h: "10. Geometría con complejos: lugares geométricos y giros",
      html:
        "<p>Como |z − a| es la distancia de z al punto a, muchas figuras se describen con una condición sencilla sobre z. Escribiendo z = x + yi se pasa a la ecuación cartesiana de siempre. Prueba las cinco condiciones más típicas:</p>" +
        w("lugar") +
        ejemplo("Pasar a coordenadas", "Describe el conjunto |z − 2i| = 3 y el conjunto |z − 1| = |z + i|.", [
          "|z − 2i| = 3: z = x + yi → |x + (y − 2)i| = 3 → x² + (y − 2)² = 9. Es la <b>circunferencia de centro (0, 2) y radio 3</b>.",
          "|z − 1| = |z + i|: la distancia a 1 es igual a la distancia a −i: es la <b>mediatriz</b> del segmento que une 1 con −i. En coordenadas: (x − 1)² + y² = x² + (y + 1)² → −2x + 1 = 2y + 1 → <b>y = −x</b>."
        ]) +
        "<h5>Giros, homotecias y movimientos con complejos</h5>" +
        "<p>Multiplicar por un complejo r<sub>α</sub> es hacer un <b>giro de ángulo α</b> alrededor del origen y una <b>homotecia de razón r</b>. Si r = 1, es un giro puro. Para girar respecto de otro centro c, se resta c, se gira y se vuelve a sumar: z' = c + (z − c)·1<sub>α</sub>.</p>" +
        ejemplo("Un giro de 60°", "Gira el punto 2 + i un ángulo de 60° alrededor del origen.", [
          "Multiplicamos por 1<sub>60°</sub> = cos 60° + i·sen 60° = 1/2 + (√3/2)i.",
          "(2 + i)(1/2 + (√3/2)i) = 1 + √3 i + i/2 + (√3/2)i² = (1 − √3/2) + (√3 + 1/2)i ≈ <b>0,134 + 2,232i</b>.",
          "Comprobación: |2 + i| = √5 = 2,236 y |0,134 + 2,232i| = 2,236 ✓ (el giro conserva el módulo)."
        ]) +
        ejemplo("Un cuadrado con complejos", "Un cuadrado tiene un vértice en 1 + i y centro en el origen. ¿Cuáles son los otros vértices?", [
          "Girar 90° alrededor del centro es multiplicar por i: los vértices son z, iz, −z y −iz.",
          "Con z = 1 + i: i(1 + i) = −1 + i; −z = −1 − i; −i(1 + i) = 1 − i.",
          "<b>Vértices: 1 + i, −1 + i, −1 − i, 1 − i</b>."
        ]) +
        ejemplo("Área de un triángulo", "Calcula el área del triángulo de vértices 0, 1 + 2i y 3 + i.", [
          "Con z₁ = 1 + 2i y z₂ = 3 + i, el área es ½·|Im(z̄₁·z₂)| = ½·|x₁y₂ − x₂y₁| = ½·|1·1 − 3·2| = ½·5 = <b>2,5</b>.",
          "(Es el módulo del producto vectorial: la misma fórmula del determinante que verás en el tema de vectores.)"
        ])
    },
    {
      h: "11. Una curiosidad: el conjunto de Mandelbrot",
      html:
        "<p>No cae en el examen, pero sirve para ver que sumar y multiplicar complejos esconde mundos enteros. Para cada número complejo c se repite la regla <b>z → z² + c</b> partiendo de z = 0. Si el resultado se mantiene acotado, c <b>pertenece</b> al conjunto de Mandelbrot (la mancha oscura); si se dispara, se colorea según la rapidez. Toca un punto de la imagen y mira la órbita que genera:</p>" +
        w("mandelbrot")
    },
    {
      h: "12. ¿Qué forma uso? Mapa de decisiones",
      html:
        "<p>Cada operación tiene una forma preferida. Decide con qué empezarías cada problema:</p>" +
        w("clasificar", "forma") +
        "<p>Une también cada situación con la técnica que la resuelve:</p>" +
        w("emparejar", "tecnicas")
    },
    {
      h: "13. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "14. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas para fijar las fórmulas.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    forma: {
      titulo: "¿Binómica o polar?",
      consigna: "Toca una operación y después la forma con la que resulta más cómoda.",
      categorias: ["Forma binómica (a + bi)", "Forma polar (r<sub>θ</sub>)"],
      items: [
        { t: "Sumar (3 + 2i) + (1 − 4i)", c: 0 }, { t: "Restar dos complejos", c: 0 }, { t: "Dividir (3 + 2i)/(1 − i)", c: 0 }, { t: "Multiplicar dos complejos pequeños: (2 + i)(1 − 3i)", c: 0 },
        { t: "Calcular (1 + i)²⁰", c: 1 }, { t: "Hallar las raíces cúbicas de 8", c: 1 }, { t: "Multiplicar 5<sub>40°</sub> · 2<sub>80°</sub>", c: 1 }, { t: "Calcular (√3 + i)¹⁰", c: 1 },
        { t: "Hallar el conjugado de 4 − 7i", c: 0 }, { t: "Raíz cuarta de −16", c: 1 }
      ]
    },
    tecnicas: {
      titulo: "¿Cómo se resuelve?",
      consigna: "Une cada situación con la técnica adecuada.",
      pares: [
        ["Un cociente de complejos en binómica", "Multiplicar numerador y denominador por el conjugado del denominador"],
        ["Una potencia grande como (1 + i)¹⁵", "Pasar a polar y usar De Moivre"],
        ["Una ecuación con z y z̄", "Escribir z = x + yi e igualar partes real e imaginaria"],
        ["Calcular iⁿ para n grande", "Dividir n entre 4 y mirar el resto"],
        ["Raíces n-ésimas de un complejo", "Módulo ⁿ√r y argumentos (θ + 360°k)/n"],
        ["Ecuación de 2.º grado con Δ &lt; 0", "Fórmula con √Δ = i·√|Δ|: dos soluciones conjugadas"],
        ["Un giro de 90° alrededor del origen", "Multiplicar por i"],
        ["Dos complejos iguales", "Igualar partes reales y partes imaginarias"]
      ]
    },
    tj1: {
      titulo: "Números complejos",
      cartas: [
        { a: "Unidad imaginaria", b: "i² = −1 · potencias: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, y se repite cada 4." },
        { a: "Forma binómica", b: "z = a + bi · Re(z) = a, Im(z) = b (el coeficiente, sin la i) · conjugado z̄ = a − bi." },
        { a: "Suma y producto", b: "(a + bi) ± (c + di) = (a ± c) + (b ± d)i · (a + bi)(c + di) = (ac − bd) + (ad + bc)i" },
        { a: "Cociente", b: "Se multiplica por el conjugado del denominador: (a + bi)/(c + di) = (a + bi)(c − di)/(c² + d²)" },
        { a: "Conjugado: propiedades", b: "z + z̄ = 2a · z·z̄ = a² + b² = |z|² · conj(z·w) = z̄·w̄" },
        { a: "Módulo y argumento", b: "|z| = √(a² + b²) · tan θ = b/a, eligiendo el cuadrante con el signo de a y de b." },
        { a: "Forma polar y trigonométrica", b: "z = r<sub>θ</sub> = r(cos θ + i·sen θ) · a = r·cos θ, b = r·sen θ" },
        { a: "Producto y cociente en polar", b: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub> · r<sub>α</sub>/s<sub>β</sub> = (r/s)<sub>α−β</sub>" },
        { a: "Teorema de De Moivre", b: "(r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub> = rⁿ(cos nθ + i·sen nθ)" },
        { a: "Raíces n-ésimas de r<sub>θ</sub>", b: "n raíces: módulo ⁿ√r y argumentos (θ + 360°·k)/n, con k = 0, …, n − 1. Forman un polígono regular." },
        { a: "Multiplicar por i", b: "Es un giro de 90° (antihorario) alrededor del origen." },
        { a: "|z − a|", b: "Es la distancia entre z y a. |z − a| = r es una circunferencia; |z − a| = |z − b| es una mediatriz." },
        { a: "Teorema fundamental del álgebra", b: "Un polinomio de grado n tiene n raíces complejas (contadas con multiplicidad). Si los coeficientes son reales, las no reales vienen en pares conjugados." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno calcula (2 + 3i)(1 − i) multiplicando sólo «real por real» e «imaginario por imaginario»: 2·1 + 3i·(−i) = 2 + 3 = 5. ¿Qué falla?",
          op: ["Nada: el resultado es 5", "Faltan los productos cruzados: (2 + 3i)(1 − i) = 5 + i", "i² vale +1", "El resultado es 6i"], ok: 1,
          porque: "(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i (con i² = −1)." },
        { q: "Un alumno escribe (1 + i)² = 1² + i² = 1 − 1 = 0. ¿Qué falla?",
          op: ["Nada", "Falta el doble producto: (1 + i)² = 1 + 2i + i² = 2i", "i² = 1", "El resultado es 2"], ok: 1,
          porque: "Es la identidad notable (a + b)² = a² + 2ab + b² del Tema 3, también válida con complejos. Resultado 2i." },
        { q: "Para dividir (3 + 2i)/(1 − i), un alumno multiplica sólo el denominador por 1 + i. ¿Qué falla?",
          op: ["Nada", "Hay que multiplicar numerador y denominador (si no, cambia el valor de la fracción)", "Debía multiplicar por 1 − i", "Debía restar"], ok: 1,
          porque: "Multiplicar sólo el denominador cambia el valor. (3 + 2i)(1 + i)/[(1 − i)(1 + i)] = (1 + 5i)/2." },
        { q: "El argumento de −1 + i lo calcula un alumno como arctan(1/(−1)) = −45°, y lo da como argumento. ¿Qué falla?",
          op: ["Nada", "El punto está en el 2.º cuadrante: el argumento es 135°. La calculadora no distingue cuadrantes", "El argumento es 45°", "El argumento es 225°"], ok: 1,
          porque: "tan 135° = −1 y tan(−45°) = −1: la tangente es la misma en los dos. Sólo el cuadrante decide." },
        { q: "Un alumno calcula (3<sub>20°</sub>)⁴ como 12<sub>80°</sub>. ¿Qué falla?",
          op: ["Nada", "El módulo se ELEVA a 4: 3⁴ = 81, el resultado es 81<sub>80°</sub>", "El argumento no cambia", "El argumento debía ser 24°"], ok: 1,
          porque: "De Moivre: (r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>. Se eleva el módulo y se multiplica el argumento por n." },
        { q: "Un alumno dice «√(−4)·√(−9) = √36 = 6». ¿Qué falla?",
          op: ["Nada", "Con radicandos negativos no vale √a·√b = √(ab): (2i)(3i) = −6", "El resultado es 36", "El resultado es 6i"], ok: 1,
          porque: "Hay que pasar primero a imaginarios: √(−4) = 2i y √(−9) = 3i, y 2i·3i = 6i² = −6." },
        { q: "Un alumno da como raíces cúbicas de 8 sólo el número 2. ¿Qué falla?",
          op: ["Nada", "En ℂ hay 3 raíces cúbicas: 2, −1 + √3 i y −1 − √3 i", "Hay 2 raíces", "Sólo hay una, porque 8 es real"], ok: 1,
          porque: "Son los vértices de un triángulo equilátero: 2<sub>0°</sub>, 2<sub>120°</sub> y 2<sub>240°</sub>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Cuánto vale i⁷⁵?",
          op: ["−i", "i", "1", "−1"], ok: 0,
          porque: "75 = 4·18 + 3 → i⁷⁵ = i³ = −i." },
        { q: "(3 + 2i)(1 − 4i) =",
          op: ["11 − 10i", "−5 − 10i", "3 − 8i", "11 + 10i"], ok: 0,
          porque: "3 − 12i + 2i − 8i² = 3 − 10i + 8 = 11 − 10i." },
        { q: "El conjugado de 5 − 3i es…",
          op: ["5 + 3i", "−5 + 3i", "−5 − 3i", "3 − 5i"], ok: 0,
          porque: "Se cambia el signo de la parte imaginaria." },
        { q: "El módulo de 3 − 4i vale…",
          op: ["5", "7", "1", "25"], ok: 0,
          porque: "√(9 + 16) = 5." },
        { q: "El argumento de −√3 − i es…",
          op: ["210°", "30°", "150°", "330°"], ok: 0,
          porque: "3.er cuadrante, ángulo de referencia 30°: 180° + 30° = 210°." },
        { q: "2<sub>30°</sub> · 3<sub>60°</sub> =",
          op: ["6<sub>90°</sub>", "5<sub>90°</sub>", "6<sub>1800°</sub>", "5<sub>1800°</sub>"], ok: 0,
          porque: "Módulos se multiplican (6) y argumentos se suman (90°)." },
        { q: "(1 + i)⁴ =",
          op: ["−4", "4", "4i", "−4i"], ok: 0,
          porque: "(1 + i)² = 2i → (2i)² = 4i² = −4. Con polar: (√2)⁴ = 4 y 4·45° = 180°: 4<sub>180°</sub> = −4." },
        { q: "¿Cuántas raíces cuartas distintas tiene cualquier número complejo no nulo?",
          op: ["4", "1", "2", "Infinitas"], ok: 0,
          porque: "Siempre hay n raíces n-ésimas distintas." },
        { q: "Multiplicar un complejo por i equivale a…",
          op: ["girar 90° alrededor del origen", "girarlo 180°", "reflejarlo respecto al eje real", "duplicar su módulo"], ok: 0,
          porque: "i = 1<sub>90°</sub>: módulo 1 (no cambia la longitud) y argumento +90°." },
        { q: "Las soluciones de x² − 2x + 5 = 0 son…",
          op: ["1 ± 2i", "−1 ± 2i", "2 ± i", "1 ± 4i"], ok: 0,
          porque: "Δ = 4 − 20 = −16 → x = (2 ± 4i)/2 = 1 ± 2i." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "j1", nivel: 1,
      enunciado: "Calcula i⁴⁵ y escribe su parte real y su parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1 }],
      pistas: ["Divide el exponente entre 4 y mira el resto."],
      pasos: ["45 = 4·11 + 1 → i⁴⁵ = i¹ = i: parte real 0 y parte imaginaria 1."],
      resultado: "i" },
    { id: "j2", nivel: 1,
      enunciado: "Calcula (2 − 3i) + (5 + i). Escribe la parte real y la imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 7 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -2 }],
      pistas: ["Se suman partes reales y partes imaginarias por separado."],
      pasos: ["(2 + 5) + (−3 + 1)i = 7 − 2i."],
      resultado: "7 − 2i" },
    { id: "j3", nivel: 1,
      enunciado: "Calcula (2 + 3i)(4 − i).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 11 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 10 }],
      pistas: ["Distributiva, y sustituye i² por −1."],
      pasos: ["(2 + 3i)(4 − i) = 8 − 2i + 12i − 3i² = 8 + 10i + 3 = 11 + 10i."],
      resultado: "11 + 10i" },
    { id: "j4", nivel: 1,
      enunciado: "Para z = 3 − 4i, calcula su módulo y la parte imaginaria de su conjugado.",
      check: [{ tipo: "num", etiqueta: "|z| =", valor: 5 }, { tipo: "num", etiqueta: "Im(z̄) =", valor: 4 }],
      pistas: ["|z| = √(a² + b²). El conjugado cambia el signo de la parte imaginaria."],
      pasos: ["|z| = √(9 + 16) = 5.", "z̄ = 3 + 4i, con parte imaginaria 4."],
      resultado: "|z| = 5 · z̄ = 3 + 4i" },
    { id: "j5", nivel: 1,
      enunciado: "Calcula (1 + i)².",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2 }],
      pistas: ["(a + b)² = a² + 2ab + b², con i² = −1."],
      pasos: ["(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i."],
      resultado: "2i" },
    { id: "j6", nivel: 1,
      enunciado: "Resuelve x² + 4 = 0 en ℂ. Las soluciones son ±bi: ¿cuánto vale b?",
      check: { tipo: "num", etiqueta: "b =", valor: 2 },
      pistas: ["x² = −4."],
      pasos: ["x² = −4 → x = ±√(−4) = ±2i."],
      resultado: "x = 2i y x = −2i" },
    { id: "j7", nivel: 1,
      enunciado: "Calcula (4 + 2i)/(1 + i).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 3 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1 }],
      pistas: ["Multiplica arriba y abajo por 1 − i."],
      pasos: ["(4 + 2i)(1 − i)/[(1 + i)(1 − i)] = (4 − 4i + 2i − 2i²)/2 = (6 − 2i)/2 = 3 − i."],
      resultado: "3 − i" },
    { id: "j8", nivel: 1,
      enunciado: "Escribe z = 2i en forma polar: módulo y argumento (en grados).",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "argumento =", valor: 90, unidad: "°" }],
      pistas: ["El afijo (0, 2) está en el eje imaginario positivo."],
      pasos: ["|z| = 2 y el argumento es 90°: z = 2<sub>90°</sub>."],
      resultado: "2<sub>90°</sub>" },
    { id: "j9", nivel: 1,
      enunciado: "Escribe en forma binómica el número 4<sub>60°</sub>. Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 3.4641, tol: 0.002 }],
      pistas: ["a = r·cos θ y b = r·sen θ."],
      pasos: ["a = 4·cos 60° = 2. b = 4·sen 60° = 4·(√3/2) = 2√3 ≈ 3,464.", "4<sub>60°</sub> = 2 + 2√3 i."],
      resultado: "2 + 2√3 i" },
    { id: "j10", nivel: 1,
      enunciado: "Calcula el módulo de −5 + 12i.",
      check: { tipo: "num", etiqueta: "módulo =", valor: 13 },
      pistas: ["Pitágoras con a = −5 y b = 12."],
      pasos: ["√(25 + 144) = √169 = 13."],
      resultado: "13" },
    // ================= ★★ medio =================
    { id: "j11", nivel: 2,
      enunciado: "Calcula la suma 1 + i + i² + i³ + … + i⁹⁹ (100 términos).",
      check: { tipo: "num", etiqueta: "suma =", valor: 0 },
      pistas: ["Cada bloque de 4 potencias consecutivas suma 0."],
      pasos: ["1 + i − 1 − i = 0. Hay 100 términos = 25 bloques de 4: la suma es 25·0 = 0."],
      resultado: "0" },
    { id: "j12", nivel: 2,
      enunciado: "Resuelve x² − 2x + 5 = 0 en ℂ. Las soluciones son a ± bi con b &gt; 0: da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 1 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["Δ = 4 − 20 = −16."],
      pasos: ["x = (2 ± √(−16))/2 = (2 ± 4i)/2 = 1 ± 2i."],
      resultado: "x = 1 ± 2i" },
    { id: "j13", nivel: 2,
      enunciado: "Calcula (3 − 2i)/(1 + 2i). Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -0.2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1.6 }],
      pistas: ["Multiplica por el conjugado 1 − 2i."],
      pasos: ["(3 − 2i)(1 − 2i) = 3 − 6i − 2i + 4i² = −1 − 8i. Denominador: 5.", "(−1 − 8i)/5 = −0,2 − 1,6i."],
      resultado: "−1/5 − (8/5)i" },
    { id: "j14", nivel: 2,
      enunciado: "Resuelve (1 + 2i)·z = 3 − i. Da la parte real e imaginaria de z (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0.2 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -1.4 }],
      pistas: ["z = (3 − i)/(1 + 2i)."],
      pasos: ["z = (3 − i)(1 − 2i)/5 = (3 − 6i − i + 2i²)/5 = (1 − 7i)/5 = 0,2 − 1,4i."],
      resultado: "z = (1 − 7i)/5" },
    { id: "j15", nivel: 2,
      enunciado: "Halla los reales x e y que cumplen (2x − y) + (x + 3y)i = 5 + 6i.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 3 }, { tipo: "num", etiqueta: "y =", valor: 1 }],
      pistas: ["Dos complejos son iguales si lo son sus partes real e imaginaria."],
      pasos: ["2x − y = 5 y x + 3y = 6.", "y = 2x − 5 → x + 6x − 15 = 6 → x = 3, y = 1."],
      resultado: "x = 3 e y = 1" },
    { id: "j16", nivel: 2,
      enunciado: "Calcula el módulo y el argumento (en grados) de −1 + i.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 1.4142, tol: 0.002 }, { tipo: "num", etiqueta: "argumento =", valor: 135, unidad: "°" }],
      pistas: ["El afijo (−1, 1) está en el 2.º cuadrante."],
      pasos: ["|z| = √2. Ángulo de referencia 45° → 180° − 45° = 135°."],
      resultado: "√2<sub>135°</sub>" },
    { id: "j17", nivel: 2,
      enunciado: "Calcula el módulo y el argumento (en grados, entre 0° y 360°) de −√3 − i.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "argumento =", valor: 210, unidad: "°" }],
      pistas: ["3.er cuadrante: 180° + ángulo de referencia."],
      pasos: ["|z| = √(3 + 1) = 2. α = arctan(1/√3) = 30°.", "θ = 180° + 30° = 210°."],
      resultado: "2<sub>210°</sub>" },
    { id: "j18", nivel: 2,
      enunciado: "Escribe en binómica 3<sub>150°</sub>. Da la parte real y la imaginaria (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -2.598, tol: 0.002 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1.5 }],
      pistas: ["cos 150° = −√3/2 y sen 150° = 1/2."],
      pasos: ["a = 3·(−√3/2) = −3√3/2 ≈ −2,598. b = 3·(1/2) = 1,5."],
      resultado: "−3√3/2 + (3/2)i" },
    { id: "j19", nivel: 2,
      enunciado: "Calcula 2<sub>30°</sub> · 5<sub>75°</sub> en forma polar: módulo y argumento.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 10 }, { tipo: "num", etiqueta: "argumento =", valor: 105, unidad: "°" }],
      pistas: ["Se multiplican los módulos y se suman los argumentos."],
      pasos: ["Módulo 2·5 = 10. Argumento 30° + 75° = 105°."],
      resultado: "10<sub>105°</sub>" },
    { id: "j20", nivel: 2,
      enunciado: "Calcula 12<sub>200°</sub> / 3<sub>50°</sub> en forma polar: módulo y argumento.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 4 }, { tipo: "num", etiqueta: "argumento =", valor: 150, unidad: "°" }],
      pistas: ["Se dividen los módulos y se restan los argumentos."],
      pasos: ["Módulo 12/3 = 4. Argumento 200° − 50° = 150°."],
      resultado: "4<sub>150°</sub>" },
    { id: "j21", nivel: 2,
      enunciado: "Calcula (1 − i)⁶ en forma binómica: parte real y parte imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 8 }],
      pistas: ["1 − i = √2<sub>315°</sub>. O bien (1 − i)² = −2i."],
      pasos: ["(1 − i)² = 1 − 2i + i² = −2i. Entonces (1 − i)⁶ = (−2i)³ = −8i³ = −8·(−i) = 8i.", "En polar: (√2)⁶ = 8 y 6·315° = 1890° = 5·360° + 90°: 8<sub>90°</sub> = 8i."],
      resultado: "8i" },
    { id: "j22", nivel: 2,
      enunciado: "Calcula (√3 + i)¹⁰ en forma binómica (decimales): parte real e imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 512 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -886.81, tol: 0.001 }],
      pistas: ["√3 + i = 2<sub>30°</sub>."],
      pasos: ["(2<sub>30°</sub>)¹⁰ = 1024<sub>300°</sub> = 1024(cos 300° + i·sen 300°) = 1024(1/2 − (√3/2)i).", "= 512 − 512√3 i ≈ 512 − 886,81i."],
      resultado: "512 − 512√3 i" },
    { id: "j23", nivel: 2,
      enunciado: "Halla las raíces cuadradas de −4. Escribe la parte imaginaria de cada una.",
      check: { tipo: "lista", etiqueta: "partes imaginarias:", valores: [2, -2] },
      pistas: ["−4 = 4<sub>180°</sub>."],
      pasos: ["Módulo √4 = 2, argumentos 90° y 270°: 2i y −2i."],
      resultado: "2i y −2i" },
    { id: "j24", nivel: 2,
      enunciado: "Halla las raíces cúbicas de 8. Escribe la parte real e imaginaria de la que tiene argumento 120°.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: -1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 1.7321, tol: 0.002 }],
      pistas: ["8 = 8<sub>0°</sub>: módulo 2 y argumentos 0°, 120°, 240°."],
      pasos: ["2<sub>120°</sub> = 2(cos 120° + i·sen 120°) = 2(−1/2 + (√3/2)i) = −1 + √3 i."],
      resultado: "−1 + √3 i (y 2, y −1 − √3 i)" },
    { id: "j25", nivel: 2,
      enunciado: "Halla las raíces cuadradas de −3 + 4i. Da la de parte real positiva: parte real e imaginaria.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2 }],
      pistas: ["Sea z = x + yi con z² = −3 + 4i: x² − y² = −3 y 2xy = 4."],
      pasos: ["y = 2/x → x⁴ + 3x² − 4 = 0 → x² = 1 → x = ±1.", "Raíces: 1 + 2i y −1 − 2i."],
      resultado: "±(1 + 2i)" },
    // ================= ★★★ nivel PAU =================
    { id: "j26", nivel: 3,
      enunciado: "Resuelve z + 2z̄ = 3 + 2i. Da la parte real e imaginaria de z.",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 1 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: -2 }],
      pistas: ["Sea z = x + yi y z̄ = x − yi."],
      pasos: ["z + 2z̄ = 3x − yi = 3 + 2i → x = 1 e y = −2.", "z = 1 − 2i."],
      resultado: "z = 1 − 2i" },
    { id: "j27", nivel: 3,
      enunciado: "Calcula las raíces cuartas de −16. ¿Cuál es su módulo común y cuánto suman las cuatro?",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 2 }, { tipo: "num", etiqueta: "suma =", valor: 0 }],
      pistas: ["−16 = 16<sub>180°</sub>: argumentos (180° + 360°k)/4."],
      pasos: ["Módulo ⁴√16 = 2. Argumentos 45°, 135°, 225°, 315°: ±√2 ± √2 i.", "Están a 90° unas de otras (un cuadrado centrado en el origen): la suma es 0."],
      resultado: "módulo 2 · suma 0" },
    { id: "j28", nivel: 3,
      enunciado: "¿Qué figura describe |z − 2i| = 3?",
      check: { tipo: "opcion", etiqueta: "Es", opciones: ["una circunferencia de centro (0, 2) y radio 3", "una circunferencia de centro (2, 0) y radio 3", "una recta horizontal", "una circunferencia de centro (0, −2) y radio 3"], ok: 0 },
      pistas: ["|z − a| es la distancia entre z y a."],
      pasos: ["z = x + yi: |x + (y − 2)i| = 3 → x² + (y − 2)² = 9: circunferencia de centro (0, 2) y radio 3."],
      resultado: "circunferencia de centro (0, 2) y radio 3" },
    { id: "j29", nivel: 3,
      enunciado: "Gira el punto 2 + i un ángulo de 60° alrededor del origen (sentido antihorario). Da la parte real e imaginaria del resultado (decimales).",
      check: [{ tipo: "num", etiqueta: "parte real =", valor: 0.134, tol: 0.01 }, { tipo: "num", etiqueta: "parte imaginaria =", valor: 2.232, tol: 0.002 }],
      pistas: ["Multiplica por cos 60° + i·sen 60°."],
      pasos: ["(2 + i)(1/2 + (√3/2)i) = 1 + √3 i + i/2 + (√3/2)i² = (1 − √3/2) + (√3 + 1/2)i.", "≈ 0,134 + 2,232i."],
      resultado: "≈ 0,134 + 2,232i" },
    { id: "j30", nivel: 3,
      enunciado: "Las raíces sextas de 1 forman un hexágono regular. ¿Cuánto mide su lado?",
      check: { tipo: "num", etiqueta: "lado =", valor: 1 },
      pistas: ["Las raíces están en la circunferencia de radio 1; el lado de un polígono regular de n lados inscrito en radio r es 2r·sen(180°/n)."],
      pasos: ["Lado = 2·1·sen 30° = 1. En el hexágono regular el lado coincide con el radio."],
      resultado: "1" },
    { id: "j31", nivel: 3,
      enunciado: "Demuestra que, para todo complejo z = a + bi, se cumple z·z̄ = |z|².",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 5, items: [
        { t: "Escribe z·z̄ = (a + bi)(a − bi)", p: 0.5 },
        { t: "Desarrolla: a² − abi + abi − b²i²", p: 0.5 },
        { t: "Usa i² = −1 y simplifica a a² + b²", p: 0.5 },
        { t: "Reconoce a² + b² = |z|² (módulo al cuadrado)", p: 0.5 }
      ] },
      pasos: ["z·z̄ = (a + bi)(a − bi) = a² − abi + abi − b²i² = a² − b²·(−1) = a² + b² = |z|². ∎"],
      resultado: "z·z̄ = |z|²" },
    { id: "j32", nivel: 3,
      enunciado: "Demuestra con las fórmulas del seno y del coseno de la suma que r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Escribe r(cos α + i·sen α)·s(cos β + i·sen β) y desarrolla la distributiva", p: 0.5 },
        { t: "Agrupa la parte real: cos α·cos β − sen α·sen β (usando i² = −1)", p: 0.5 },
        { t: "Agrupa la parte imaginaria: sen α·cos β + cos α·sen β", p: 0.5 },
        { t: "Reconoce cos(α + β) y sen(α + β) y concluye rs·[cos(α + β) + i·sen(α + β)]", p: 0.5 }
      ] },
      pasos: ["rs[(cos α·cos β − sen α·sen β) + i(sen α·cos β + cos α·sen β)].", "Las dos expresiones son cos(α + β) y sen(α + β). ∎"],
      resultado: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>" },
    { id: "j33", nivel: 3,
      enunciado: "Halla todos los complejos que cumplen z² = z̄. ¿Cuántas soluciones hay y cuánto suman todas?",
      check: [{ tipo: "num", etiqueta: "nº de soluciones =", valor: 4 }, { tipo: "num", etiqueta: "suma =", valor: 0 }],
      pistas: ["z = x + yi. x² − y² = x y 2xy = −y."],
      pasos: ["De 2xy = −y: y = 0 o x = −1/2.", "y = 0 → x² = x → x = 0 o 1. x = −1/2 → y = ±√3/2.", "Soluciones: 0, 1, −1/2 ± (√3/2)i. Suma: 0 + 1 − 1/2 − 1/2 = 0."],
      resultado: "0, 1 y (−1 ± √3 i)/2 → cuatro, suma 0" },
    { id: "j34", nivel: 3,
      enunciado: "Calcula el área del triángulo de vértices 0, 1 + 2i y 3 + i.",
      check: { tipo: "num", etiqueta: "área =", valor: 2.5 },
      pistas: ["Área = ½·|x₁y₂ − x₂y₁|."],
      pasos: ["½·|1·1 − 3·2| = ½·5 = 2,5."],
      resultado: "2,5" },
    { id: "j35", nivel: 3,
      enunciado: "Las raíces quintas de 1 forman un pentágono regular. ¿Cuánto mide su lado (decimal)?",
      check: { tipo: "num", etiqueta: "lado =", valor: 1.1756, tol: 0.002 },
      pistas: ["Radio 1 y 5 lados: lado = 2·sen(180°/5)."],
      pasos: ["Lado = 2·sen 36° = 2·0,5878 = 1,1756."],
      resultado: "≈ 1,1756" },
    { id: "j36", nivel: 3,
      enunciado: "Calcula (1 + i)²⁰/(1 − i)¹⁰ y da su módulo y su argumento (en grados entre 0° y 360°).",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 32 }, { tipo: "num", etiqueta: "argumento =", valor: 270, unidad: "°" }],
      pistas: ["Pasa cada base a polar: 1 + i = √2<sub>45°</sub> y 1 − i = √2<sub>315°</sub>."],
      pasos: ["(1 + i)²⁰ = 1024<sub>900°</sub> = 1024<sub>180°</sub>. (1 − i)¹⁰ = 32<sub>3150°</sub> = 32<sub>270°</sub>.", "Cociente: módulo 1024/32 = 32 y argumento 180° − 270° = −90° ≡ 270°."],
      resultado: "32<sub>270°</sub> = −32i" }
  ];

  var lamina = [
    { titulo: "Unidad imaginaria y forma binómica",
      items: [
        { label: "Definición", formula: "i² = −1  ·  z = a + bi", cuando: "Re(z) = a, Im(z) = b (sin la i).", ejemplo: "z = 3 − 2i → Re = 3, Im = −2" },
        { label: "Potencias de i", formula: "i⁰ = 1, i¹ = i, i² = −1, i³ = −i", cuando: "Divide el exponente entre 4: el resto decide.", ejemplo: "i²⁵ = i · i¹⁰² = −1" },
        { label: "Conjugado", formula: "z̄ = a − bi  ·  z·z̄ = a² + b² = |z|²", ejemplo: "z + z̄ = 2a" }
      ],
      nota: "Dos complejos son iguales si lo son sus partes real e imaginaria." },
    { titulo: "Operaciones en binómica", ancha: true,
      tabla: { cab: ["Operación", "Cómo se hace"], filas: [
        ["Suma / resta", "partes reales con reales, imaginarias con imaginarias"],
        ["Producto", "(a+bi)(c+di) = (ac − bd) + (ad + bc)i   (i² = −1)"],
        ["Cociente", "multiplicar arriba y abajo por el conjugado del denominador"],
        ["Potencias pequeñas", "(1 + i)² = 2i · usar (a ± b)² con i² = −1"]
      ] },
      nota: "Nunca dejes una i en el denominador." },
    { titulo: "Módulo, argumento y forma polar",
      items: [
        { label: "Módulo", formula: "|z| = √(a² + b²)", ejemplo: "|3 − 4i| = 5" },
        { label: "Argumento", formula: "tan θ = b/a  (según el cuadrante)", ojo: "La calculadora sólo da cuadrantes I y IV: corrige con 180°." },
        { label: "Forma polar y trigonométrica", formula: "z = r<sub>θ</sub> = r(cos θ + i·sen θ)", ejemplo: "−1 + i = √2<sub>135°</sub>" }
      ],
      pasos: ["Dibuja el afijo y mira el cuadrante.", "Ángulo de referencia α = arctan(|b|/|a|).", "θ = α (I), 180° − α (II), 180° + α (III), 360° − α (IV)."] },
    { titulo: "Operaciones en polar y raíces", ancha: true,
      items: [
        { label: "Producto y cociente", formula: "r<sub>α</sub>·s<sub>β</sub> = (rs)<sub>α+β</sub>  ·  r<sub>α</sub>/s<sub>β</sub> = (r/s)<sub>α−β</sub>" },
        { label: "De Moivre", formula: "(r<sub>θ</sub>)ⁿ = (rⁿ)<sub>nθ</sub>", ejemplo: "(1 + i)⁸ = (√2)⁸<sub>360°</sub> = 16" },
        { label: "Raíces n-ésimas", formula: "ⁿ√(r<sub>θ</sub>) = (ⁿ√r)<sub>(θ + 360°k)/n</sub>, k = 0 … n − 1", cuando: "Hay n raíces: un polígono regular de n lados.", ejemplo: "∛8: 2<sub>0°</sub>, 2<sub>120°</sub>, 2<sub>240°</sub>" }
      ],
      nota: "Multiplicar por i = girar 90°. Multiplicar por 1<sub>α</sub> = girar α." },
    { titulo: "Ecuaciones y geometría",
      pasos: ["Ecuación de 2.º grado con Δ < 0: x = (−b ± i√|Δ|)/2a (conjugados).", "Con z y z̄: z = x + yi e igualar partes real e imaginaria.", "zⁿ = w: raíces n-ésimas en polar.", "|z − a| = r: circunferencia. |z − a| = |z − b|: mediatriz. Re z = k, Im z = k: rectas."],
      nota: "Teorema fundamental del álgebra: grado n ⇒ n raíces en ℂ." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(1 + i)² = 1 + i² = 0", bien: "(1 + i)² = 1 + 2i + i² = 2i", por: "Falta el doble producto." },
        { mal: "√(−4)·√(−9) = √36 = 6", bien: "(2i)(3i) = −6", por: "Con radicandos negativos no vale √a·√b = √ab." },
        { mal: "arg(−1 + i) = arctan(−1) = −45°", bien: "135°", por: "Hay que mirar el cuadrante." },
        { mal: "(3<sub>20°</sub>)⁴ = 12<sub>80°</sub>", bien: "81<sub>80°</sub>", por: "El módulo se ELEVA a 4." },
        { mal: "Raíz cúbica de 8 = 2 (solo)", bien: "2, −1 ± √3 i", por: "En ℂ hay n raíces n-ésimas." },
        { mal: "Re(3 − 2i) = −2i", bien: "Re = 3 · Im = −2", por: "La parte imaginaria es −2, sin la i." }
      ] }
  ];

  B.registrar("mates1", "t6", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 7: Vectores en el plano
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t7/" + ref); }

  var resumen = [
    "Un vector tiene <b>módulo, dirección y sentido</b>. Con coordenadas: AB = B − A (extremo menos origen); |v| = √(v₁² + v₂²).",
    "Se suman y restan por componentes; k·u multiplica cada componente. Dos vectores no paralelos forman una <b>base</b>.",
    "<b>Producto escalar</b>: u·v = u₁v₁ + u₂v₂ = |u||v|cos α. Es un <b>número</b>; si vale 0, los vectores son perpendiculares.",
    "<b>Paralelos</b> si u₁/v₁ = u₂/v₂ (o det = 0); <b>perpendiculares</b> si u·v = 0. Un perpendicular a (a, b) es (−b, a).",
    "Punto medio: ((a₁+b₁)/2, (a₂+b₂)/2). Baricentro: ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3). Área del triángulo: ½|det(AB, AC)|.",
    "Las fuerzas, velocidades y desplazamientos son vectores: se suman con la regla del paralelogramo y el trabajo es W = F·d."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué es un vector
  secciones[0] =
    "<h5>Magnitudes escalares y vectoriales</h5>" +
    "<p>Algunas magnitudes se dicen con un número (la masa, la temperatura, el tiempo, la energía): son <b>escalares</b>. Otras necesitan además una dirección y un sentido (la fuerza, la velocidad, la aceleración, el desplazamiento): son <b>vectoriales</b>. La diferencia es práctica: dos fuerzas de 5 N no se «suman» como 5 + 5 = 10 N, sino que depende de hacia dónde tiren (en el mismo sentido, 10 N; en sentidos opuestos, 0; en perpendicular, 7,07 N).</p>" +
    tabla(["Magnitud", "Tipo", "Por qué"], [
      ["Temperatura (20 °C)", "escalar", "basta un número"], ["Masa (3 kg)", "escalar", "basta un número"],
      ["Fuerza (5 N hacia el este)", "vectorial", "hay que decir hacia dónde"], ["Velocidad (80 km/h hacia el norte)", "vectorial", "dirección y sentido importan"],
      ["Desplazamiento (3 m a la derecha, 4 m arriba)", "vectorial", "no es lo mismo que la distancia recorrida"]
    ]) +
    "<h5>Vector fijo y vector libre</h5>" +
    "<p>Un <b>vector fijo</b> AB tiene un origen A y un extremo B concretos. Dos vectores fijos son <b>equipolentes</b> si tienen el mismo módulo, dirección y sentido; todos los equipolentes a uno dado forman un <b>vector libre</b>. En el curso trabajamos con vectores libres: «el vector (3, 4)» es el mismo se dibuje donde se dibuje; sólo cuenta cómo es.</p>" +
    "<ul><li>El <b>vector nulo</b> 0 = (0, 0) tiene módulo 0 y no tiene dirección ni sentido.</li><li>El <b>opuesto</b> de v, −v, tiene el mismo módulo y dirección pero sentido contrario. Además AB y BA son vectores opuestos.</li></ul>" +
    "<p>Dibuja y mueve vectores aquí. Los extremos son arrastrables (se ajustan a la cuadrícula) y verás la suma, la resta, el producto por un número y el módulo:</p>" +
    w("vectores");

  // ---------------------------------------------------------------- 2. Coordenadas
  secciones[1] =
    "<h5>Las componentes y la base canónica</h5>" +
    "<p>Las coordenadas de un vector dicen <b>cuánto hay que avanzar en horizontal y en vertical</b> para ir del origen al extremo. Se puede escribir v = (v₁, v₂), pero también v = v₁·<b>i</b> + v₂·<b>j</b>, donde i = (1, 0) y j = (0, 1) son los vectores unitarios de los ejes (la <b>base canónica</b>). Por ejemplo (3, −2) = 3i − 2j.</p>" +
    "<h5>De puntos a vectores y de vectores a puntos</h5>" +
    "<ul><li><b>Vector entre dos puntos</b>: AB = B − A. Con A = (1, 2) y B = (4, 6): AB = (3, 4).</li>" +
    "<li><b>Extremo a partir del origen</b>: B = A + AB. Con A = (2, 5) y AB = (−3, 1): B = (−1, 6).</li>" +
    "<li><b>Origen a partir del extremo</b>: A = B − AB.</li></ul>" +
    ejemplo("El cuarto vértice de un paralelogramo", "Tres vértices de un paralelogramo ABCD son A = (1, 1), B = (5, 2) y C = (6, 5). Halla D.", [
      "En un paralelogramo los lados opuestos son <b>equipolentes</b>: AB = DC (mismo vector).",
      "AB = B − A = (4, 1). Entonces DC = C − D = (4, 1) → D = C − (4, 1) = (6 − 4, 5 − 1) = <b>(2, 4)</b>.",
      "Comprobación: AD = (1, 3) y BC = (1, 3) ✓ (el otro par de lados opuestos también coincide)."
    ]) +
    ejemplo("Un vector con origen y extremo desconocidos", "El vector AB = (−3, 4) tiene su extremo en B = (2, 1). Halla A y el vector BA.", [
      "A = B − AB = (2 − (−3), 1 − 4) = <b>(5, −3)</b>.",
      "BA = −AB = <b>(3, −4)</b> (mismo módulo, sentido contrario)."
    ]) +
    ojo("el orden importa: AB = B − A, es decir, <b>extremo menos origen</b>. Si te equivocas de orden, te sale el opuesto BA. Y no confundas el <i>punto</i> A = (1, 2) con el <i>vector</i> OA = (1, 2): tienen las mismas coordenadas pero son objetos distintos.");

  // ---------------------------------------------------------------- 3. Suma, resta, escalares
  secciones[2] =
    "<h5>Propiedades de las operaciones</h5>" +
    "<p>La suma de vectores es <b>conmutativa</b> (u + v = v + u) y <b>asociativa</b>; el nulo es el elemento neutro y cada vector tiene su opuesto. El producto por un número cumple k(u + v) = ku + kv y (k + m)u = ku + mu. En total, los vectores se manejan casi como los números, y por eso se puede hablar de «despejar» un vector: si 2x + u = v, entonces x = (v − u)/2.</p>" +
    ejemplo("Despejar un vector", "Con u = (1, −2) y v = (5, 4), halla x tal que 2x + u = v.", [
      "2x = v − u = (5 − 1, 4 + 2) = (4, 6) → x = (4, 6)/2 = <b>(2, 3)</b>.",
      "Comprobación: 2·(2, 3) + (1, −2) = (4, 6) + (1, −2) = (5, 4) = v ✓."
    ]) +
    "<h5>Combinaciones lineales y bases</h5>" +
    "<p>Una <b>combinación lineal</b> de u y v es cualquier vector de la forma a·u + b·v. Si u y v <b>no son paralelos</b>, todo vector del plano se puede escribir de una única manera como combinación lineal de ellos: se dice que {u, v} es una <b>base</b>, y los números (a, b) son las <b>coordenadas</b> del vector en esa base. Arrastra w y mira cómo cambian a y b según la base:</p>" +
    w("combinacion") +
    ejemplo("Coordenadas en otra base", "Escribe w = (5, 1) como combinación lineal de u = (1, 1) y v = (1, −1).", [
      "Buscamos a y b con (5, 1) = a(1, 1) + b(1, −1) = (a + b, a − b).",
      "Igualando componentes: a + b = 5 y a − b = 1 → sumando, 2a = 6 → a = 3 y b = 2.",
      "<b>w = 3u + 2v</b>. Las coordenadas de w en la base {u, v} son (3, 2)."
    ]) +
    ejemplo("¿Forman base?", "¿Es {(2, 3), (4, 6)} una base? ¿Y {(2, 3), (4, 5)}?", [
      "(4, 6) = 2·(2, 3): son <b>paralelos</b> (uno es múltiplo del otro): no forman base (no «generan» todo el plano).",
      "(2, 3) y (4, 5): 2/4 ≠ 3/5 (o: 2·5 − 3·4 = −2 ≠ 0), no son paralelos: <b>sí forman base</b>."
    ]);

  // ---------------------------------------------------------------- 4. Módulo
  secciones[3] =
    "<h5>Vectores unitarios y vectores con módulo dado</h5>" +
    "<p>Para <b>normalizar</b> un vector se divide entre su módulo: v/|v| es unitario, con la misma dirección y sentido que v. Y al revés, para obtener un vector de módulo m en la dirección de v se hace m·v/|v|.</p>" +
    ejemplo("Normalizar y escalar", "Con v = (3, −4), calcula el vector unitario con su misma dirección y sentido, y un vector de módulo 10 con sentido contrario.", [
      "|v| = √(9 + 16) = 5. Unitario: v/5 = <b>(3/5, −4/5) = (0,6, −0,8)</b> (módulo 1: 0,36 + 0,64 = 1 ✓).",
      "De módulo 10 y sentido contrario: −10·v/5 = −2·v = <b>(−6, 8)</b> (módulo 10 ✓)."
    ]) +
    "<h5>El ángulo de dirección: un vector es un número complejo</h5>" +
    "<p>El ángulo θ que forma un vector con el eje X positivo cumple v = |v|·(cos θ, sen θ), y tan θ = v₂/v₁ (eligiendo el cuadrante con los signos). Es la misma «forma polar» de los números complejos del Tema 6: un vector del plano y un número complejo se manejan con las mismas ideas. Por ejemplo, el vector (1, √3) tiene módulo 2 y ángulo 60°: (1, √3) = 2(cos 60°, sen 60°).</p>" +
    ejemplo("Descomponer una fuerza", "Una fuerza de 20 N forma un ángulo de 30° con la horizontal. Halla sus componentes.", [
      "F = 20·(cos 30°, sen 30°) = 20·(√3/2, 1/2) = <b>(10√3, 10) ≈ (17,32, 10) N</b>.",
      "Es el mismo cálculo que en los problemas de plano inclinado y proyectiles de Física."
    ]) +
    "<p>Dos propiedades del módulo: |k·v| = |k|·|v| y la <b>desigualdad triangular</b> |u + v| ≤ |u| + |v| (en un triángulo, un lado nunca es mayor que la suma de los otros dos; sólo hay igualdad si u y v tienen la misma dirección y sentido).</p>";

  // ---------------------------------------------------------------- 5. Producto escalar
  secciones[4] =
    "<h5>Por qué las dos fórmulas dan lo mismo</h5>" +
    "<p>La forma geométrica u·v = |u||v|cos α es la definición; la algebraica u₁v₁ + u₂v₂ es un cálculo más cómodo. Equivalen gracias al teorema del coseno: en el triángulo de lados u, v y u − v, |u − v|² = |u|² + |v|² − 2|u||v|cos α. Pero también |u − v|² = (u₁ − v₁)² + (u₂ − v₂)² = |u|² + |v|² − 2(u₁v₁ + u₂v₂). Igualando se obtiene la relación entre las dos formas.</p>" +
    "<p>Mueve los vectores y observa cómo cambia el producto, el ángulo y la proyección:</p>" +
    w("escalar") +
    "<h5>Propiedades y significado</h5>" +
    "<ul><li><b>Conmutativo</b> (u·v = v·u) y <b>distributivo</b> (u·(v + w) = u·v + u·w).</li><li><b>u·u = |u|²</b>: el producto de un vector por sí mismo es el cuadrado de su módulo.</li><li>El <b>signo</b> informa del ángulo: u·v &gt; 0 si α es agudo, u·v = 0 si α = 90°, u·v &lt; 0 si α es obtuso.</li><li>La <b>proyección ortogonal</b> de v sobre u es el vector (u·v/|u|²)·u, de longitud (u·v)/|u| (con signo).</li></ul>" +
    ejemplo("El ángulo entre dos vectores", "Calcula el ángulo que forman u = (1, 2) y v = (3, −1).", [
      "u·v = 1·3 + 2·(−1) = 3 − 2 = 1. |u| = √5 y |v| = √10.",
      "cos α = u·v/(|u||v|) = 1/(√5·√10) = 1/√50 = 0,1414 → α = arccos 0,1414 = <b>81,87°</b> (agudo, porque u·v &gt; 0)."
    ]) +
    ejemplo("Proyección ortogonal", "Calcula la proyección de v = (2, 3) sobre u = (4, 1).", [
      "u·v = 8 + 3 = 11 y |u|² = 17.",
      "Vector proyección: (11/17)·(4, 1) = (44/17, 11/17) ≈ <b>(2,59, 0,65)</b>. Su longitud (con signo) es u·v/|u| = 11/√17 = 2,67.",
      "La diferencia v − proyección = (2 − 2,59, 3 − 0,65) = (−0,59, 2,35) es perpendicular a u: (−0,59)·4 + 2,35·1 = 0 ✓."
    ]) +
    ejemplo("El ángulo de un triángulo", "Calcula el ángulo en A del triángulo de vértices A = (0, 0), B = (4, 0) y C = (1, 3).", [
      "AB = (4, 0) y AC = (1, 3). AB·AC = 4. |AB| = 4 y |AC| = √10.",
      "cos A = 4/(4·√10) = 1/√10 = 0,3162 → A = <b>71,57°</b>."
    ]) +
    ojo("el producto escalar es un <b>número</b>, no un vector. No escribas u·v = (3, 5) ni «u·v = 0 ⇒ u = 0 o v = 0»: dos vectores no nulos pueden tener producto escalar 0 (si son perpendiculares). Tampoco se «simplifica»: de u·v = u·w no se deduce v = w.");

  // ---------------------------------------------------------------- 6. Paralelos y perpendiculares
  secciones[5] =
    "<h5>Tres formas de decir «paralelos»</h5>" +
    "<p>Los vectores u y v son <b>paralelos</b> si v = k·u. En coordenadas esto se detecta de tres maneras equivalentes: componentes proporcionales (u₁/v₁ = u₂/v₂), <b>determinante nulo</b> (u₁v₂ − u₂v₁ = 0, que evita las divisiones y los ceros), o ángulo 0° o 180°.</p>" +
    "<h5>Perpendiculares y el vector perpendicular</h5>" +
    "<p>u ⊥ v si u·v = 0. Para <b>fabricar</b> un vector perpendicular a (a, b) basta intercambiar las componentes y cambiar el signo de una: <b>(−b, a)</b> (es girar 90°; y (b, −a) gira −90°). Se comprueba: (a, b)·(−b, a) = −ab + ab = 0.</p>" +
    ejemplo("Valores de k", "Con u = (2, 3), halla k para que v = (k, −6) sea paralelo a u y k para que v = (k, −4) sea perpendicular a u.", [
      "Paralelos: 2/k = 3/(−6) → 3k = −12 → <b>k = −4</b> (v = (−4, −6) = −2u).",
      "Perpendiculares (con v = (k, −4)): u·v = 2k − 12 = 0 → <b>k = 6</b>."
    ]) +
    ejemplo("Un vector perpendicular y unitario", "Halla un vector unitario perpendicular a (3, −2).", [
      "Un perpendicular: (2, 3) (o (−2, −3)). Comprobación: 3·2 + (−2)·3 = 0 ✓.",
      "Su módulo es √13. Unitario: (2/√13, 3/√13) ≈ <b>(0,555, 0,832)</b>. (El otro, (−0,555, −0,832), también vale.)"
    ]) +
    ejemplo("Puntos alineados", "¿Están alineados A = (1, 2), B = (3, 5) y C = (7, 11)?", [
      "Tres puntos están alineados si AB y AC son paralelos. AB = (2, 3) y AC = (6, 9).",
      "Determinante: 2·9 − 3·6 = 18 − 18 = 0 → son paralelos: <b>los tres puntos están alineados</b> (AC = 3·AB)."
    ]);

  // ---------------------------------------------------------------- 7. Punto medio
  secciones[6] =
    "<h5>De punto medio a cualquier punto del segmento</h5>" +
    "<p>El punto medio es el caso particular de una idea más general: el punto P con AP = t·AB es P = A + t·AB = (1 − t)A + tB. Para t = 1/2 se obtiene el punto medio; para t = 1/3 o 2/3, los puntos que dividen el segmento en tres partes iguales; y con t fuera de [0, 1], puntos de la recta fuera del segmento. Mueve A, B y t:</p>" +
    w("segmento") +
    ejemplo("Punto que divide en una razón", "Halla el punto P del segmento AB, con A = (1, 2) y B = (7, 8), tal que AP/PB = 2.", [
      "AP/PB = 2 significa que AP es el doble de PB, es decir, AP = (2/3)·AB (t = r/(1 + r) = 2/3).",
      "AB = (6, 6). P = A + (2/3)·AB = (1 + 4, 2 + 4) = <b>(5, 6)</b>. Comprobación: AP = (4, 4) y PB = (2, 2): razón 2 ✓."
    ]) +
    ejemplo("El simétrico de un punto", "Halla el simétrico de A = (1, 3) respecto de M = (4, −1).", [
      "M es el punto medio entre A y su simétrico A': M = (A + A')/2 → A' = 2M − A = (8 − 1, −2 − 3) = <b>(7, −5)</b>."
    ]) +
    "<h5>El baricentro de un triángulo</h5>" +
    "<p>Las tres medianas de un triángulo (rectas que unen un vértice con el punto medio del lado opuesto) se cortan en un punto, el <b>baricentro</b> G, que es la media de los tres vértices: <b>G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)</b>. Divide cada mediana en dos partes en razón 2 : 1 (el trozo del vértice al baricentro es el doble del que va al lado). Es el punto de equilibrio de un triángulo de cartón. Mueve los vértices:</p>" +
    w("baricentro") +
    ejemplo("Baricentro y diagonales", "Calcula el baricentro del triángulo A = (−4, −2), B = (4, −1), C = (0, 4). ¿Qué punto es el punto medio de las diagonales de un paralelogramo ABCD con A = (1, 1), B = (5, 2), C = (6, 5), D = (2, 4)?", [
      "G = ((−4 + 4 + 0)/3, (−2 − 1 + 4)/3) = <b>(0, 1/3)</b>.",
      "Punto medio de AC: ((1 + 6)/2, (1 + 5)/2) = (3,5; 3). Punto medio de BD: ((5 + 2)/2, (2 + 4)/2) = (3,5; 3). <b>Coinciden</b>: las diagonales de un paralelogramo se cortan en su punto medio (y se usa para hallar el cuarto vértice: A + C = B + D)."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Áreas con vectores: el determinante",
      html:
        "<p>El <b>determinante</b> de dos vectores, det(u, v) = u₁v₂ − u₂v₁, mide el área (con signo) del paralelogramo que forman. Es muy cómodo para áreas y para saber si tres puntos están alineados:</p>" +
        H.formula("Área del paralelogramo = |u₁v₂ − u₂v₁|          Área del triángulo = ½·|u₁v₂ − u₂v₁|") +
        "<p>Por qué: el área de un paralelogramo es base × altura = |u|·|v|·sen α, y u₁v₂ − u₂v₁ = |u||v|·sen α (con signo según el giro de u a v). Si det = 0, el área es 0: los vectores son paralelos (los puntos están alineados). El triángulo ABC es la mitad del paralelogramo que forman AB y AC.</p>" +
        ejemplo("Área de un triángulo", "Calcula el área del triángulo A = (1, 1), B = (5, 2), C = (3, 6).", [
          "AB = (4, 1) y AC = (2, 5). det(AB, AC) = 4·5 − 1·2 = 18.",
          "Área del triángulo = ½·|18| = <b>9</b> (el paralelogramo correspondiente tendría área 18)."
        ]) +
        ejemplo("Área de un polígono", "Calcula el área del cuadrilátero A = (0, 0), B = (4, 0), C = (5, 3), D = (1, 4).", [
          "Se divide en dos triángulos con la diagonal AC. Triángulo ABC: AB = (4, 0), AC = (5, 3): det = 12 → área 6.",
          "Triángulo ACD: AC = (5, 3), AD = (1, 4): det = 20 − 3 = 17 → área 8,5.",
          "Total: 6 + 8,5 = <b>14,5</b>."
        ]) +
        ejemplo("¿Para qué valor de k están alineados?", "Halla k para que A = (1, 2), B = (3, 5) y C = (5, k) estén alineados.", [
          "AB = (2, 3) y AC = (4, k − 2). Alineados ⇔ det(AB, AC) = 0: 2(k − 2) − 3·4 = 0 → 2k − 4 − 12 = 0 → <b>k = 8</b>.",
          "Comprobación: AC = (4, 6) = 2·AB ✓."
        ])
    },
    {
      h: "9. Vectores y Física: fuerzas, velocidades y trabajo",
      html:
        "<p>La mayor parte de las aplicaciones de los vectores está en la Física. Las magnitudes vectoriales se suman con la regla del paralelogramo: la <b>fuerza resultante</b> es la suma de las fuerzas, la <b>velocidad resultante</b> es la suma de velocidades, y el <b>trabajo</b> de una fuerza es su producto escalar por el desplazamiento.</p>" +
        w("fuerzas") +
        ejemplo("Dos fuerzas perpendiculares", "Sobre un cuerpo actúan F₁ = 10 N a 30° y F₂ = 6 N a 120°. Calcula la resultante.", [
          "F₁ y F₂ forman 90°, así que |R| = √(10² + 6²) = √136 = <b>11,66 N</b>.",
          "Dirección: forma con F₁ el ángulo arctan(6/10) = 30,96°, luego R está a 30° + 30,96° = <b>60,96°</b> del eje X.",
          "En componentes: F₁ = (8,66, 5), F₂ = (−3, 5,196) → R = (5,66, 10,196), con módulo 11,66 ✓."
        ]) +
        ejemplo("Un barco que cruza un río", "Un barco apunta perpendicularmente a la orilla a 12 km/h y la corriente le arrastra a 5 km/h. ¿Cuál es su velocidad respecto de tierra y cuánto se desvía?", [
          "Velocidad del barco (0, 12) y corriente (5, 0): resultante (5, 12), módulo √(25 + 144) = <b>13 km/h</b>.",
          "Desviación respecto de la perpendicular: tan α = 5/12 → <b>α = 22,6°</b> (aguas abajo)."
        ]) +
        ejemplo("Equilibrio", "Una lámpara de 50 N cuelga de dos cables simétricos que forman 60° con la horizontal. ¿Qué tensión soporta cada cable?", [
          "Equilibrio: la suma vectorial de las tres fuerzas es cero. Cada cable tira con una tensión T en un ángulo de 60° con la horizontal.",
          "Componente vertical: 2·T·sen 60° = 50 (el peso) → T = 50/(2·0,866) = <b>28,87 N</b>. Las componentes horizontales (±T cos 60°) se cancelan."
        ]) +
        "<h5>El trabajo como producto escalar</h5>" +
        "<p>Cuando una fuerza constante F desplaza su punto de aplicación un vector d, realiza el trabajo <b>W = F·d = |F||d|cos α</b>. Sólo trabaja la componente de la fuerza que va en la dirección del desplazamiento (fuerza perpendicular: no trabaja).</p>" +
        w("trabajo") +
        ejemplo("Trabajo con componentes", "Una fuerza F = (3, 4) N desplaza un cuerpo d = (5, 2) m. Calcula el trabajo y el ángulo entre F y d.", [
          "W = F·d = 3·5 + 4·2 = <b>23 J</b>.",
          "|F| = 5 N, |d| = √29 = 5,385 m → cos α = 23/(5·5,385) = 0,8542 → <b>α = 31,4°</b> (agudo: el trabajo es positivo)."
        ])
    },
    {
      h: "10. Demostrar con vectores",
      html:
        "<p>Muchos teoremas de geometría se demuestran con unas pocas líneas usando el producto escalar. La receta: elige dos vectores del dibujo, exprésalo todo con ellos y usa u·v = 0 para la perpendicularidad.</p>" +
        ejemplo("Las diagonales de un rombo son perpendiculares", "Demuestra que en un rombo las diagonales se cortan en ángulo recto.", [
          "Sea el rombo con lados u y v desde un vértice: como todos los lados son iguales, |u| = |v|. Las diagonales son u + v y u − v.",
          "(u + v)·(u − v) = u·u − u·v + v·u − v·v = |u|² − |v|² = 0 porque |u| = |v|.",
          "Producto escalar nulo ⇒ las diagonales son perpendiculares. ∎"
        ]) +
        ejemplo("Un ángulo inscrito en una semicircunferencia es recto", "Demuestra el teorema de Tales: si AB es un diámetro y C está en la circunferencia, el ángulo en C es recto.", [
          "Coloquemos el centro O en el origen: B = −A y |A| = |C| = r. Los vectores CA = A − C y CB = B − C = −A − C.",
          "CA·CB = (A − C)·(−A − C) = −A·A − A·C + C·A + C·C = −|A|² + |C|² = −r² + r² = 0.",
          "Producto nulo ⇒ CA ⊥ CB: el ángulo en C es de 90°. ∎"
        ]) +
        ejemplo("Un teorema de Pitágoras vectorial", "Demuestra que si u ⊥ v, entonces |u + v|² = |u|² + |v|².", [
          "|u + v|² = (u + v)·(u + v) = u·u + 2u·v + v·v = |u|² + 2u·v + |v|².",
          "Si u ⊥ v, u·v = 0 y queda |u|² + |v|². ∎ (Es el teorema de Pitágoras, y el teorema del coseno con ángulo recto.)"
        ])
    },
    {
      h: "11. ¿Escalar o vector? Mapa de resultados",
      html:
        "<p>Un fallo muy típico es no darse cuenta de qué clase de objeto sale de cada operación. Clasifícalas:</p>" +
        w("clasificar", "tipo") +
        w("emparejar", "formulas")
    },
    {
      h: "12. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "13. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas con las fórmulas del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    tipo: {
      titulo: "¿Qué sale: un número o un vector?",
      consigna: "Toca una operación y después el tipo de resultado.",
      categorias: ["Un vector", "Un número (escalar)", "Un punto"],
      items: [
        { t: "u + v", c: 0 }, { t: "3·u", c: 0 }, { t: "B − A", c: 0 }, { t: "u/|u|", c: 0 },
        { t: "u · v (producto escalar)", c: 1 }, { t: "|u|", c: 1 }, { t: "El ángulo entre u y v", c: 1 }, { t: "det(u, v)", c: 1 }, { t: "El trabajo W = F·d", c: 1 },
        { t: "El punto medio de AB", c: 2 }, { t: "El baricentro de ABC", c: 2 }, { t: "A + AB", c: 2 }
      ]
    },
    formulas: {
      titulo: "Cada fórmula con su significado",
      consigna: "Une cada fórmula con lo que calcula.",
      pares: [
        ["B − A", "Vector AB entre dos puntos"],
        ["√(v₁² + v₂²)", "Módulo del vector"],
        ["u₁v₁ + u₂v₂", "Producto escalar"],
        ["u·v / (|u||v|)", "Coseno del ángulo entre u y v"],
        ["(−b, a)", "Vector perpendicular a (a, b)"],
        ["((a₁ + b₁)/2, (a₂ + b₂)/2)", "Punto medio de AB"],
        ["½·|u₁v₂ − u₂v₁|", "Área del triángulo de lados u y v"],
        ["(u·v / |u|²)·u", "Proyección ortogonal de v sobre u"]
      ]
    },
    tj1: {
      titulo: "Vectores en el plano",
      cartas: [
        { a: "Vector entre dos puntos", b: "AB = B − A (extremo menos origen). BA = −AB." },
        { a: "Módulo y vector unitario", b: "|v| = √(v₁² + v₂²) · unitario: v/|v|" },
        { a: "Suma, resta y producto por un número", b: "(u₁ ± v₁, u₂ ± v₂) · k·(u₁, u₂) = (ku₁, ku₂). Si k &lt; 0, cambia el sentido." },
        { a: "Producto escalar", b: "u·v = u₁v₁ + u₂v₂ = |u||v|cos α. Es un número. u·u = |u|²." },
        { a: "Ángulo entre dos vectores", b: "cos α = u·v/(|u||v|). Agudo si u·v &gt; 0, recto si = 0, obtuso si &lt; 0." },
        { a: "Vectores paralelos", b: "u₁/v₁ = u₂/v₂ (o det(u, v) = 0). Uno es múltiplo del otro." },
        { a: "Vectores perpendiculares", b: "u·v = 0. Un perpendicular a (a, b) es (−b, a)." },
        { a: "Base de vectores", b: "Dos vectores no paralelos: todo vector es a·u + b·v, con a y b únicos." },
        { a: "Punto medio y punto en una razón", b: "M = ((a₁ + b₁)/2, (a₂ + b₂)/2) · P = A + t·AB con t = r/(1 + r) si AP/PB = r" },
        { a: "Baricentro", b: "G = (A + B + C)/3. Divide las medianas en razón 2 : 1." },
        { a: "Proyección de v sobre u", b: "Vector: (u·v/|u|²)·u · longitud con signo: u·v/|u|" },
        { a: "Área del triángulo con vectores", b: "S = ½·|det(AB, AC)| = ½·|AB₁·AC₂ − AB₂·AC₁|" },
        { a: "Trabajo de una fuerza constante", b: "W = F·d = |F||d|cos α (julios). Perpendicular → 0." },
        { a: "Cuarto vértice de un paralelogramo ABCD", b: "AB = DC → D = A + C − B. Las diagonales comparten punto medio." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Con A = (1, 2) y B = (4, 6), un alumno calcula AB = (1 − 4, 2 − 6) = (−3, −4). ¿Qué falla?",
          op: ["Nada", "AB es extremo menos origen: B − A = (3, 4). Él ha calculado BA", "Debía sumar", "Debía dividir"], ok: 1,
          porque: "Para ir de A a B hay que avanzar 3 en horizontal y 4 en vertical: AB = (3, 4). El vector (−3, −4) es el opuesto, BA." },
        { q: "Un alumno escribe u·v = (2, −1)·(3, 5) = (6, −5). ¿Qué falla?",
          op: ["Nada", "El producto escalar es un número: 2·3 + (−1)·5 = 1", "Debía ser (5, 4)", "Debía ser (6, 5)"], ok: 1,
          porque: "u·v = u₁v₁ + u₂v₂ es un escalar. Multiplicar componente a componente no es el producto escalar." },
        { q: "Un alumno dice: «u·v = 0, luego u = 0 o v = 0». ¿Qué falla?",
          op: ["Nada", "Pueden ser dos vectores no nulos perpendiculares, como (1, 0) y (0, 1)", "Sólo ocurre en la recta", "Debía ser u = v"], ok: 1,
          porque: "A diferencia de los números reales, el producto escalar puede ser 0 con dos vectores no nulos: es la condición de perpendicularidad." },
        { q: "Un alumno comprueba que u = (2, 3) y v = (4, 5) son paralelos porque 2 &lt; 4 y 3 &lt; 5. ¿Qué falla?",
          op: ["Nada", "Paralelos significa proporcionales: 2/4 = 0,5 ≠ 3/5 = 0,6, luego no lo son", "Debía restar", "Son perpendiculares"], ok: 1,
          porque: "u ∥ v ⇔ u₁v₂ − u₂v₁ = 0. Aquí 2·5 − 3·4 = −2 ≠ 0." },
        { q: "Un alumno calcula el módulo de (3, 4) como 3 + 4 = 7. ¿Qué falla?",
          op: ["Nada", "El módulo se calcula con Pitágoras: √(9 + 16) = 5", "Es 12", "Es 25"], ok: 1,
          porque: "|v| = √(v₁² + v₂²). Sumar componentes no mide la longitud de la flecha (la hipotenusa)." },
        { q: "Un alumno halla el punto medio de A = (2, 6) y B = (8, 2) como (2 + 8, 6 + 2) = (10, 8). ¿Qué falla?",
          op: ["Nada", "Hay que dividir entre 2: ((2 + 8)/2, (6 + 2)/2) = (5, 4)", "Debía restar", "Debía multiplicar"], ok: 1,
          porque: "El punto medio es la media de cada coordenada. (10, 8) está fuera del segmento." },
        { q: "Un alumno afirma que si u·v &gt; 0 entonces los vectores tienen el mismo sentido. ¿Qué falla?",
          op: ["Nada", "u·v &gt; 0 sólo dice que el ángulo es agudo, no que sean paralelos", "u·v &gt; 0 significa perpendiculares", "u·v &gt; 0 significa que son opuestos"], ok: 1,
          porque: "Con (1, 0) y (1, 1), u·v = 1 &gt; 0 pero forman 45°. El mismo sentido exige además que sean paralelos (α = 0°)." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Con A = (−1, 3) y B = (4, −2), el vector AB es…",
          op: ["(5, −5)", "(−5, 5)", "(3, 1)", "(3, −5)"], ok: 0,
          porque: "AB = B − A = (4 − (−1), −2 − 3) = (5, −5)." },
        { q: "El módulo del vector (−6, 8) es…",
          op: ["10", "2", "14", "48"], ok: 0,
          porque: "√(36 + 64) = √100 = 10." },
        { q: "u = (2, 5) y v = (−5, k) son perpendiculares si k vale…",
          op: ["2", "−2", "5", "−5/2"], ok: 0,
          porque: "u·v = −10 + 5k = 0 → k = 2." },
        { q: "El ángulo entre u = (1, 0) y v = (1, 1) es…",
          op: ["45°", "90°", "0°", "60°"], ok: 0,
          porque: "cos α = 1/(1·√2) = √2/2 → α = 45°." },
        { q: "El punto medio de A = (2, −4) y B = (6, 10) es…",
          op: ["(4, 3)", "(8, 6)", "(2, 7)", "(4, 6)"], ok: 0,
          porque: "((2 + 6)/2, (−4 + 10)/2) = (4, 3)." },
        { q: "¿Cuál es un vector perpendicular a (3, −2)?",
          op: ["(2, 3)", "(−3, 2)", "(3, 2)", "(2, −3)"], ok: 0,
          porque: "3·2 + (−2)·3 = 0 ✓. (−3, 2) es el opuesto (paralelo)." },
        { q: "El baricentro del triángulo (0, 0), (6, 0), (0, 9) es…",
          op: ["(2, 3)", "(3, 4,5)", "(6, 9)", "(1, 2)"], ok: 0,
          porque: "((0 + 6 + 0)/3, (0 + 0 + 9)/3) = (2, 3)." },
        { q: "El área del triángulo de vértices (0, 0), (4, 0) y (0, 3) es…",
          op: ["6", "12", "7", "3,5"], ok: 0,
          porque: "½·|4·3 − 0·0| = 6." },
        { q: "El vector unitario en la dirección de (3, −4) es…",
          op: ["(0,6, −0,8)", "(3, −4)", "(1, −1)", "(0,8, −0,6)"], ok: 0,
          porque: "(3, −4)/5 = (0,6, −0,8)." },
        { q: "Una fuerza F = (3, 4) N desplaza un cuerpo d = (2, −1) m. El trabajo es…",
          op: ["2 J", "10 J", "−2 J", "5 J"], ok: 0,
          porque: "W = 3·2 + 4·(−1) = 6 − 4 = 2 J." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "v1", nivel: 1,
      enunciado: "Con A = (−2, 5) y B = (3, −1), calcula el vector AB y su módulo.",
      check: [{ tipo: "num", etiqueta: "AB₁ =", valor: 5 }, { tipo: "num", etiqueta: "AB₂ =", valor: -6 }, { tipo: "num", etiqueta: "|AB| =", valor: 7.8102, tol: 0.002 }],
      pistas: ["AB = B − A (extremo menos origen)."],
      pasos: ["AB = (3 − (−2), −1 − 5) = (5, −6).", "|AB| = √(25 + 36) = √61 ≈ 7,81."],
      resultado: "AB = (5, −6) · |AB| = √61" },
    { id: "v2", nivel: 1,
      enunciado: "Con u = (4, −3) y v = (−2, 5), calcula 2u − 3v.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 14 }, { tipo: "num", etiqueta: "componente y =", valor: -21 }],
      pistas: ["Primero 2u = (8, −6) y 3v = (−6, 15)."],
      pasos: ["2u − 3v = (8 + 6, −6 − 15) = (14, −21)."],
      resultado: "(14, −21)" },
    { id: "v3", nivel: 1,
      enunciado: "Calcula el módulo del vector (−6, 8).",
      check: { tipo: "num", etiqueta: "módulo =", valor: 10 },
      pistas: ["Pitágoras con los dos catetos 6 y 8."],
      pasos: ["√(36 + 64) = √100 = 10."],
      resultado: "10" },
    { id: "v4", nivel: 1,
      enunciado: "Calcula el vector unitario con la dirección y sentido de v = (3, −4).",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 0.6 }, { tipo: "num", etiqueta: "componente y =", valor: -0.8 }],
      pistas: ["Divide cada componente entre el módulo."],
      pasos: ["|v| = 5 → v/5 = (3/5, −4/5) = (0,6, −0,8)."],
      resultado: "(0,6, −0,8)" },
    { id: "v5", nivel: 1,
      enunciado: "Calcula el producto escalar de u = (2, 5) y v = (−1, 3).",
      check: { tipo: "num", etiqueta: "u·v =", valor: 13 },
      pistas: ["u₁v₁ + u₂v₂."],
      pasos: ["2·(−1) + 5·3 = −2 + 15 = 13."],
      resultado: "13" },
    { id: "v6", nivel: 1,
      enunciado: "Halla k para que u = (2, 5) y v = (−5, k) sean perpendiculares.",
      check: { tipo: "num", etiqueta: "k =", valor: 2 },
      pistas: ["Perpendiculares ⇔ producto escalar 0."],
      pasos: ["u·v = 2·(−5) + 5k = −10 + 5k = 0 → k = 2."],
      resultado: "k = 2" },
    { id: "v7", nivel: 1,
      enunciado: "Halla k para que u = (3, −6) y v = (k, 4) sean paralelos.",
      check: { tipo: "num", etiqueta: "k =", valor: -2 },
      pistas: ["Componentes proporcionales: 3/k = −6/4."],
      pasos: ["3·4 = −6·k → k = −2. (v = (−2, 4) = −(2/3)·u.)"],
      resultado: "k = −2" },
    { id: "v8", nivel: 1,
      enunciado: "Calcula el punto medio del segmento de extremos A = (2, −4) y B = (6, 10).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["La media de cada coordenada."],
      pasos: ["M = ((2 + 6)/2, (−4 + 10)/2) = (4, 3)."],
      resultado: "M = (4, 3)" },
    { id: "v9", nivel: 1,
      enunciado: "Tres vértices de un paralelogramo ABCD son A = (0, 0), B = (4, 1) y C = (6, 5). Halla D.",
      check: [{ tipo: "num", etiqueta: "D₁ =", valor: 2 }, { tipo: "num", etiqueta: "D₂ =", valor: 4 }],
      pistas: ["AB = DC → D = A + C − B."],
      pasos: ["D = (0 + 6 − 4, 0 + 5 − 1) = (2, 4).", "Comprobación: AD = (2, 4) y BC = (2, 4) ✓."],
      resultado: "D = (2, 4)" },
    { id: "v10", nivel: 1,
      enunciado: "Halla un vector perpendicular a (4, −1) cuya primera componente sea 1. ¿Cuánto vale su segunda componente?",
      check: { tipo: "num", etiqueta: "segunda componente =", valor: 4 },
      pistas: ["(4, −1)·(1, y) = 0."],
      pasos: ["4·1 + (−1)·y = 0 → y = 4. El vector es (1, 4)."],
      resultado: "(1, 4)" },
    // ================= ★★ medio =================
    { id: "v11", nivel: 2,
      enunciado: "Calcula el ángulo que forman u = (1, 2) y v = (3, −1).",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 81.87, unidad: "°" },
      pistas: ["cos α = u·v/(|u||v|)."],
      pasos: ["u·v = 3 − 2 = 1. |u| = √5 y |v| = √10.", "cos α = 1/√50 = 0,1414 → α = 81,87°."],
      resultado: "≈ 81,87°" },
    { id: "v12", nivel: 2,
      enunciado: "Calcula el ángulo entre u = (2, 2) y v = (−1, 3).",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 63.43, unidad: "°" },
      pistas: ["u·v = −2 + 6 = 4."],
      pasos: ["|u| = 2√2 = 2,828 y |v| = √10 = 3,162.", "cos α = 4/8,944 = 0,4472 → α = 63,43°."],
      resultado: "≈ 63,43°" },
    { id: "v13", nivel: 2,
      enunciado: "Calcula el vector proyección ortogonal de v = (2, 3) sobre u = (4, 1) (decimales).",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 2.588, tol: 0.003 }, { tipo: "num", etiqueta: "componente y =", valor: 0.647, tol: 0.005 }],
      pistas: ["Proyección = (u·v/|u|²)·u."],
      pasos: ["u·v = 11 y |u|² = 17. (11/17)·(4, 1) = (44/17, 11/17) ≈ (2,588, 0,647)."],
      resultado: "(44/17, 11/17)" },
    { id: "v14", nivel: 2,
      enunciado: "Escribe w = (7, −1) como combinación lineal a·(1, 1) + b·(1, −1). Da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 3 }, { tipo: "num", etiqueta: "b =", valor: 4 }],
      pistas: ["(a + b, a − b) = (7, −1)."],
      pasos: ["a + b = 7 y a − b = −1 → a = 3, b = 4.", "Comprobación: 3·(1, 1) + 4·(1, −1) = (7, −1) ✓."],
      resultado: "w = 3·(1, 1) + 4·(1, −1)" },
    { id: "v15", nivel: 2,
      enunciado: "Escribe w = (4, 5) como a·(2, 1) + b·(−1, 1). Da a y b.",
      check: [{ tipo: "num", etiqueta: "a =", valor: 3 }, { tipo: "num", etiqueta: "b =", valor: 2 }],
      pistas: ["(2a − b, a + b) = (4, 5)."],
      pasos: ["2a − b = 4 y a + b = 5 → sumando 3a = 9 → a = 3 y b = 2."],
      resultado: "a = 3, b = 2" },
    { id: "v16", nivel: 2,
      enunciado: "Halla el punto P del segmento AB, con A = (−2, 1) y B = (6, 5), tal que AP/PB = 3.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["AP = (3/4)·AB (t = r/(1 + r))."],
      pasos: ["AB = (8, 4). P = A + (3/4)·AB = (−2 + 6, 1 + 3) = (4, 4).", "Comprobación: AP = (6, 3) y PB = (2, 1): razón 3 ✓."],
      resultado: "P = (4, 4)" },
    { id: "v17", nivel: 2,
      enunciado: "Halla el simétrico de A = (−3, 2) respecto del punto M = (1, 1).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 5 }, { tipo: "num", etiqueta: "y =", valor: 0 }],
      pistas: ["M es el punto medio entre A y A': A' = 2M − A."],
      pasos: ["A' = (2 + 3, 2 − 2) = (5, 0)."],
      resultado: "A' = (5, 0)" },
    { id: "v18", nivel: 2,
      enunciado: "Calcula el baricentro del triángulo A = (−1, 2), B = (5, −4), C = (2, 8).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 2 }],
      pistas: ["La media de las coordenadas de los tres vértices."],
      pasos: ["G = ((−1 + 5 + 2)/3, (2 − 4 + 8)/3) = (2, 2)."],
      resultado: "G = (2, 2)" },
    { id: "v19", nivel: 2,
      enunciado: "Calcula el área del triángulo de vértices A = (2, 1), B = (7, 3) y C = (4, 8).",
      check: { tipo: "num", etiqueta: "área =", valor: 15.5 },
      pistas: ["½·|det(AB, AC)|."],
      pasos: ["AB = (5, 2) y AC = (2, 7). det = 5·7 − 2·2 = 31.", "Área = 31/2 = 15,5."],
      resultado: "15,5" },
    { id: "v20", nivel: 2,
      enunciado: "Halla k para que A = (−1, 0), B = (2, 3) y C = (5, k) estén alineados.",
      check: { tipo: "num", etiqueta: "k =", valor: 6 },
      pistas: ["AB ∥ AC: determinante nulo."],
      pasos: ["AB = (3, 3) y AC = (6, k). 3k − 18 = 0 → k = 6.", "AC = (6, 6) = 2·AB ✓."],
      resultado: "k = 6" },
    { id: "v21", nivel: 2,
      enunciado: "Calcula el ángulo en C del triángulo A = (1, 1), B = (5, 1), C = (3, 5).",
      check: { tipo: "num", etiqueta: "ángulo C =", valor: 53.13, unidad: "°" },
      pistas: ["Usa los vectores CA y CB."],
      pasos: ["CA = (−2, −4) y CB = (2, −4). CA·CB = −4 + 16 = 12. |CA| = |CB| = √20.", "cos C = 12/20 = 0,6 → C = 53,13°."],
      resultado: "≈ 53,13°" },
    { id: "v22", nivel: 2,
      enunciado: "Una fuerza F = (6, −2) N desplaza un cuerpo d = (4, 3) m. Calcula el trabajo.",
      check: { tipo: "num", etiqueta: "W =", valor: 18, unidad: "J" },
      pistas: ["W = F·d."],
      pasos: ["W = 6·4 + (−2)·3 = 24 − 6 = 18 J."],
      resultado: "18 J" },
    { id: "v23", nivel: 2,
      enunciado: "Dos fuerzas perpendiculares de 8 N y 6 N actúan sobre un cuerpo. Calcula el módulo de la resultante y el ángulo que forma con la fuerza de 8 N.",
      check: [{ tipo: "num", etiqueta: "|R| =", valor: 10, unidad: "N" }, { tipo: "num", etiqueta: "ángulo =", valor: 36.87, unidad: "°" }],
      pistas: ["Pitágoras y tan α = 6/8."],
      pasos: ["|R| = √(64 + 36) = 10 N.", "tan α = 6/8 → α = 36,87°."],
      resultado: "10 N, a 36,87° de la de 8 N" },
    { id: "v24", nivel: 2,
      enunciado: "Con u = (1, −2) y v = (0, 4), halla el vector x tal que 3x − u = 2v.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 1 / 3, tol: 0.002, ph: "decimal o 1/3" }, { tipo: "num", etiqueta: "componente y =", valor: 2 }],
      pistas: ["3x = 2v + u."],
      pasos: ["3x = (0, 8) + (1, −2) = (1, 6) → x = (1/3, 2)."],
      resultado: "x = (1/3, 2)" },
    // ================= ★★★ nivel PAU =================
    { id: "v25", nivel: 3,
      enunciado: "Halla k para que u = (k, 2) y v = (3, −1) formen un ángulo de 45°.",
      check: { tipo: "num", etiqueta: "k =", valor: 4 },
      pistas: ["cos 45° = u·v/(|u||v|). Eleva al cuadrado y descarta la solución que da un coseno negativo."],
      pasos: ["(3k − 2)/(√(k² + 4)·√10) = √2/2 → elevando: 2(3k − 2)² = 10(k² + 4) → k² − 3k − 4 = 0 → k = 4 o k = −1.", "Con k = −1, 3k − 2 = −5 &lt; 0 (ángulo de 135°): se descarta. <b>k = 4</b>."],
      resultado: "k = 4" },
    { id: "v26", nivel: 3,
      enunciado: "Halla un vector de módulo 10 perpendicular a (3, 4), con primera componente positiva. Da sus componentes.",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: 8 }, { tipo: "num", etiqueta: "componente y =", valor: -6 }],
      pistas: ["Un perpendicular a (3, 4) es (−4, 3), de módulo 5. Multiplica por ±2."],
      pasos: ["(−4, 3) tiene módulo 5. Para módulo 10: ±2·(−4, 3) = (−8, 6) o (8, −6).", "Con primera componente positiva: (8, −6)."],
      resultado: "(8, −6)" },
    { id: "v27", nivel: 3,
      enunciado: "Un triángulo equilátero tiene vértices A = (0, 0) y B = (4, 0). Halla el tercer vértice C con ordenada positiva.",
      check: [{ tipo: "num", etiqueta: "C₁ =", valor: 2 }, { tipo: "num", etiqueta: "C₂ =", valor: 3.4641, tol: 0.002 }],
      pistas: ["C está sobre la mediatriz de AB (x = 2) y a distancia 4 de A."],
      pasos: ["C = (2, y) con 2² + y² = 16 → y = √12 = 2√3 ≈ 3,464.", "(También: ángulo de 60° en A: C = 4(cos 60°, sen 60°) = (2, 2√3).)"],
      resultado: "C = (2, 2√3)" },
    { id: "v28", nivel: 3,
      enunciado: "Demuestra con vectores que las diagonales de un rombo son perpendiculares.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Llama u y v a dos lados consecutivos y observa que |u| = |v| por ser un rombo", p: 0.5 },
        { t: "Expresa las diagonales como u + v y u − v", p: 0.5 },
        { t: "Calcula el producto escalar (u + v)·(u − v) = |u|² − |v|²", p: 0.5 },
        { t: "Concluye que vale 0 y, por tanto, las diagonales son perpendiculares", p: 0.5 }
      ] },
      pasos: ["(u + v)·(u − v) = u·u − u·v + v·u − v·v = |u|² − |v|² = 0.", "Producto escalar nulo ⇒ perpendiculares. ∎"],
      resultado: "Diagonales perpendiculares" },
    { id: "v29", nivel: 3,
      enunciado: "Demuestra que en todo paralelogramo, la suma de los cuadrados de las diagonales es igual a la suma de los cuadrados de los cuatro lados.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 6, items: [
        { t: "Llama u y v a los lados; las diagonales son u + v y u − v", p: 0.5 },
        { t: "Desarrolla |u + v|² = |u|² + 2u·v + |v|²", p: 0.5 },
        { t: "Desarrolla |u − v|² = |u|² − 2u·v + |v|²", p: 0.5 },
        { t: "Suma: 2|u|² + 2|v|², que es la suma de los cuadrados de los cuatro lados", p: 0.5 }
      ] },
      pasos: ["|u + v|² + |u − v|² = (|u|² + 2u·v + |v|²) + (|u|² − 2u·v + |v|²) = 2|u|² + 2|v|².", "Los cuatro lados valen |u|, |v|, |u|, |v|: la suma de sus cuadrados es 2|u|² + 2|v|². ∎"],
      resultado: "Ley del paralelogramo" },
    { id: "v30", nivel: 3,
      enunciado: "Calcula el área del cuadrilátero A = (0, 0), B = (5, 0), C = (6, 4), D = (1, 5) dividiéndolo en dos triángulos.",
      check: { tipo: "num", etiqueta: "área =", valor: 23 },
      pistas: ["Triángulos ABC y ACD, con la diagonal AC."],
      pasos: ["ABC: AB = (5, 0), AC = (6, 4): det = 20 → área 10.", "ACD: AC = (6, 4), AD = (1, 5): det = 30 − 4 = 26 → área 13.", "Total: 10 + 13 = 23."],
      resultado: "23" },
    { id: "v31", nivel: 3,
      enunciado: "Calcula la distancia del punto P = (5, 1) a la recta que pasa por el origen y por A = (3, 4).",
      check: { tipo: "num", etiqueta: "distancia =", valor: 3.4 },
      pistas: ["La distancia es la altura del paralelogramo formado por OA y OP: |det(OA, OP)|/|OA|."],
      pasos: ["det(OA, OP) = 3·1 − 4·5 = −17. |OA| = 5.", "Distancia = 17/5 = 3,4."],
      resultado: "3,4" },
    { id: "v32", nivel: 3,
      enunciado: "Un avión vuela con una velocidad propia de 200 km/h hacia el norte y sopla un viento de 50 km/h hacia el este. Calcula su velocidad respecto del suelo (módulo) y la desviación respecto del norte.",
      check: [{ tipo: "num", etiqueta: "módulo =", valor: 206.16, unidad: "km/h" }, { tipo: "num", etiqueta: "desviación =", valor: 14.04, unidad: "°" }],
      pistas: ["Velocidades: (0, 200) y (50, 0)."],
      pasos: ["v = (50, 200): |v| = √(2500 + 40000) = 206,16 km/h.", "tan δ = 50/200 → δ = 14,04° hacia el este."],
      resultado: "206,16 km/h, 14,04° al este del norte" },
    { id: "v33", nivel: 3,
      enunciado: "Un cuadro de 100 N cuelga de dos cables simétricos que forman 40° con la horizontal. Calcula la tensión de cada cable.",
      check: { tipo: "num", etiqueta: "tensión =", valor: 77.79, unidad: "N" },
      pistas: ["Las componentes verticales de las dos tensiones equilibran el peso: 2T·sen 40° = 100."],
      pasos: ["T = 100/(2·sen 40°) = 100/(2·0,6428) = 77,79 N."],
      resultado: "≈ 77,8 N" },
    { id: "v34", nivel: 3,
      enunciado: "Halla el punto del eje X que equidista de A = (1, 2) y B = (5, 4).",
      check: { tipo: "num", etiqueta: "x =", valor: 4.5 },
      pistas: ["P = (x, 0). Iguala |PA|² y |PB|²."],
      pasos: ["(x − 1)² + 4 = (x − 5)² + 16 → x² − 2x + 5 = x² − 10x + 41 → 8x = 36 → x = 4,5."],
      resultado: "P = (4,5, 0)" },
    { id: "v35", nivel: 3,
      enunciado: "En el triángulo A = (1, 0), B = (5, 0), C = (3, 4), calcula la longitud de la mediana que sale de A.",
      check: { tipo: "num", etiqueta: "longitud =", valor: 3.6056, tol: 0.002 },
      pistas: ["La mediana va de A al punto medio de BC."],
      pasos: ["Punto medio de BC: ((5 + 3)/2, (0 + 4)/2) = (4, 2).", "Mediana: (4 − 1, 2 − 0) = (3, 2), de longitud √13 ≈ 3,606."],
      resultado: "√13 ≈ 3,606" },
    { id: "v36", nivel: 3,
      enunciado: "Gira el vector (3, 1) un ángulo de 90° en sentido antihorario. ¿Cuáles son las componentes del vector girado?",
      check: [{ tipo: "num", etiqueta: "componente x =", valor: -1 }, { tipo: "num", etiqueta: "componente y =", valor: 3 }],
      pistas: ["Girar 90° (a, b) → (−b, a)."],
      pasos: ["(a, b) = (3, 1) → (−1, 3). Comprobación: perpendicular al original: 3·(−1) + 1·3 = 0 y del mismo módulo √10 ✓."],
      resultado: "(−1, 3)" }
  ];

  var lamina = [
    { titulo: "Vector: coordenadas y módulo",
      items: [
        { label: "Entre dos puntos", formula: "AB = B − A = (b₁ − a₁, b₂ − a₂)", ejemplo: "A = (1, 2), B = (4, 6) → AB = (3, 4)", ojo: "Extremo menos origen. BA = −AB." },
        { label: "Módulo", formula: "|v| = √(v₁² + v₂²)", ejemplo: "|(3, 4)| = 5" },
        { label: "Unitario", formula: "u = v/|v|", ejemplo: "(3, −4) → (0,6, −0,8)" },
        { label: "Con ángulo", formula: "v = |v|·(cos θ, sen θ)" }
      ] },
    { titulo: "Operaciones",
      items: [
        { label: "Suma y resta", formula: "(u₁ ± v₁, u₂ ± v₂)", cuando: "Regla del paralelogramo o del triángulo." },
        { label: "Producto por un número", formula: "k·(u₁, u₂) = (k·u₁, k·u₂)", ojo: "Si k &lt; 0 cambia el sentido." },
        { label: "Combinación lineal y base", formula: "w = a·u + b·v", cuando: "Si u y v no son paralelos, a y b son únicos." }
      ] },
    { titulo: "Producto escalar",
      items: [
        { label: "Fórmula algebraica", formula: "u·v = u₁v₁ + u₂v₂", ojo: "Es un NÚMERO, no un vector." },
        { label: "Fórmula geométrica", formula: "u·v = |u|·|v|·cos α", cuando: "Para el ángulo: cos α = u·v/(|u||v|)." },
        { label: "Proyección de v sobre u", formula: "(u·v/|u|²)·u", ejemplo: "longitud con signo: u·v/|u|" }
      ],
      nota: "u·v &gt; 0: ángulo agudo · u·v = 0: perpendiculares · u·v &lt; 0: ángulo obtuso." },
    { titulo: "Paralelos y perpendiculares",
      tabla: { cab: ["Condición", "Fórmula"], filas: [["u ∥ v", "u₁/v₁ = u₂/v₂  ·  det(u, v) = u₁v₂ − u₂v₁ = 0"], ["u ⊥ v", "u·v = 0"], ["Perpendicular a (a, b)", "(−b, a)"], ["Tres puntos alineados", "AB ∥ AC (det = 0)"]] },
      nota: "Con det no hay divisiones ni problemas con los ceros." },
    { titulo: "Puntos y áreas", ancha: true,
      items: [
        { label: "Punto medio", formula: "M = ((a₁ + b₁)/2, (a₂ + b₂)/2)" },
        { label: "Punto de AB en una razón AP/PB = r", formula: "P = A + t·AB con t = r/(1 + r)", ejemplo: "r = 2: t = 2/3" },
        { label: "Simétrico de A respecto de M", formula: "A' = 2M − A" },
        { label: "Baricentro", formula: "G = ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)", cuando: "Divide cada mediana en razón 2 : 1." },
        { label: "Área del triángulo", formula: "S = ½·|det(AB, AC)|", ejemplo: "AB = (4, 1), AC = (2, 5) → S = ½·18 = 9" }
      ],
      nota: "Cuarto vértice del paralelogramo ABCD: D = A + C − B." },
    { titulo: "Vectores en Física",
      items: [
        { label: "Resultante", formula: "R = F₁ + F₂ + …", cuando: "Equilibrio: R = 0.", ejemplo: "8 N y 6 N perpendiculares → 10 N" },
        { label: "Trabajo", formula: "W = F·d = |F||d|cos α", ojo: "Fuerza perpendicular al movimiento: W = 0." },
        { label: "Componentes", formula: "F = |F|(cos θ, sen θ)", ejemplo: "20 N a 30° → (17,3; 10) N" }
      ] },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "AB = A − B", bien: "AB = B − A", por: "Extremo menos origen." },
        { mal: "u·v = (6, −5)", bien: "u·v = 1 (un número)", por: "El producto escalar es un escalar." },
        { mal: "u·v = 0 ⇒ u = 0 ó v = 0", bien: "puede ser u ⊥ v", por: "Dos vectores no nulos pueden ser perpendiculares." },
        { mal: "|(3, 4)| = 3 + 4", bien: "|(3, 4)| = 5", por: "Pitágoras." },
        { mal: "Punto medio = (a₁ + b₁, a₂ + b₂)", bien: "…dividido entre 2", por: "Es una media." },
        { mal: "Paralelos si 2 < 4 y 3 < 5", bien: "Paralelos si son proporcionales", por: "2/4 ≠ 3/5." }
      ] }
  ];

  B.registrar("mates1", "t7", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones · Tema 8: Geometría analítica (rectas)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr, raiz = H.raiz, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(n, ref) { return H.w(n, ref && "mates1/t8/" + ref); }

  var resumen = [
    "Una recta se determina con <b>un punto y un vector director</b> (o con dos puntos: v = AB). Tiene muchas ecuaciones equivalentes.",
    "<b>Vectorial</b> (x, y) = P + t·v · <b>paramétricas</b> x = p₁ + tv₁, y = p₂ + tv₂ · <b>continua</b> (x − p₁)/v₁ = (y − p₂)/v₂ · <b>general</b> Ax + By + C = 0 · <b>explícita</b> y = mx + n.",
    "En la general, <b>(A, B) es un vector normal</b> (perpendicular) y <b>(−B, A) es un vector director</b>. La pendiente es m = −A/B = tan α.",
    "Posición de dos rectas: secantes (A/A′ ≠ B/B′), paralelas (A/A′ = B/B′ ≠ C/C′) o coincidentes. Perpendiculares: AA′ + BB′ = 0 (m₁m₂ = −1).",
    "<b>Distancia punto–recta</b>: |Ap₁ + Bp₂ + C|/√(A² + B²). La <b>mediatriz</b> de AB pasa por el punto medio y es perpendicular a AB.",
    "Los puntos notables de un triángulo salen de cortar medianas (G), alturas (H), mediatrices (O) o bisectrices (I)."
  ];

  var secciones = {};

  // ---------------------------------------------------------------- 1. Qué hace falta
  secciones[0] =
    "<h5>Cuatro maneras de dar una recta</h5>" +
    "<p>Una recta queda determinada por cualquiera de estos datos mínimos; cada uno lleva de forma natural a una ecuación:</p>" +
    tabla(["Datos", "Qué se usa", "Ecuación natural"], [
      ["un punto y un vector director", "P y v", "vectorial / paramétricas / continua"],
      ["dos puntos A y B", "A y v = AB", "continua o punto-pendiente"],
      ["un punto y la pendiente", "P y m", "punto-pendiente  y − p₂ = m(x − p₁)"],
      ["un punto y un vector normal", "P y n = (A, B)", "general  A(x − p₁) + B(y − p₂) = 0"]
    ]) +
    "<p>La última merece atención: si conoces un vector <b>perpendicular</b> a la recta, el producto escalar da directamente la ecuación: un punto X = (x, y) está en la recta si PX es perpendicular a n, es decir, n·PX = 0: A(x − p₁) + B(y − p₂) = 0.</p>" +
    ejemplo("Cuatro rectas, un mismo punto", "Escribe una ecuación de la recta que pasa por P = (2, 3) y (a) tiene vector director (1, −2); (b) pasa también por Q = (4, 7); (c) tiene pendiente −1/2; (d) es perpendicular al vector (3, 1).", [
      "(a) Continua: (x − 2)/1 = (y − 3)/(−2) → −2(x − 2) = y − 3 → <b>2x + y − 7 = 0</b>.",
      "(b) v = PQ = (2, 4) → (x − 2)/2 = (y − 3)/4 → 4(x − 2) = 2(y − 3) → <b>2x − y − 1 = 0</b>.",
      "(c) Punto-pendiente: y − 3 = −1/2·(x − 2) → 2y − 6 = −x + 2 → <b>x + 2y − 8 = 0</b>.",
      "(d) Normal n = (3, 1): 3(x − 2) + 1·(y − 3) = 0 → <b>3x + y − 9 = 0</b>."
    ]) +
    "<p>Y para comprobar si un punto pertenece a una recta, se sustituye en la ecuación: si la cumple, está en la recta. Así, el punto (3, 4) está en 2x − 3y + 6 = 0 (6 − 12 + 6 = 0 ✓), pero (1, 2) no (2 − 6 + 6 = 2 ≠ 0).</p>";

  // ---------------------------------------------------------------- 2. Vectorial y paramétricas
  secciones[1] =
    "<h5>El parámetro t: moverse a lo largo de la recta</h5>" +
    "<p>En (x, y) = (p₁, p₂) + t·(v₁, v₂), el parámetro t es como un «reloj»: en t = 0 estás en P; en t = 1 has avanzado exactamente un vector v; en t = −1, un vector v hacia atrás; en t = 1/2, la mitad. Si A y B son los dos puntos y v = AB, entonces t = 0 es A, <b>t = 1 es B</b> y t = 1/2 es el punto medio: es exactamente el P = A + t·AB del Tema 7. Arrastra A y B, y mira cómo todas las ecuaciones describen la misma recta:</p>" +
    w("recta2p") +
    ejemplo("Pasar de dos puntos a las ecuaciones", "Halla las ecuaciones vectorial y paramétricas de la recta que pasa por A = (1, −2) y B = (4, 2). ¿Para qué valor de t se obtiene el punto (7, 6)?", [
      "v = AB = (3, 4). Vectorial: <b>(x, y) = (1, −2) + t·(3, 4)</b>. Paramétricas: <b>x = 1 + 3t, y = −2 + 4t</b>.",
      "Para (7, 6): 1 + 3t = 7 → t = 2 y −2 + 4t = 6 → t = 2. Los dos t coinciden: el punto está en la recta (con t = 2).",
      "¿Y (5, 3)? 1 + 3t = 5 → t = 4/3 pero −2 + 4t = 3 → t = 5/4. No coinciden: (5, 3) <b>no</b> está en la recta."
    ]) +
    ojo("las ecuaciones paramétricas <b>no son únicas</b>: puedes elegir cualquier punto de la recta como P y cualquier vector paralelo como v (por ejemplo, (6, 8) vale igual que (3, 4)). Dos alumnos pueden dar ecuaciones distintas de la misma recta y estar los dos bien: para comprobarlo, pasa ambas a la forma general y compáralas.");

  // ---------------------------------------------------------------- 3. Continua y general
  secciones[2] =
    "<h5>Casos especiales: rectas verticales y horizontales</h5>" +
    "<p>Si una componente del vector director es 0 la ecuación continua tiene un denominador 0 (que no se puede escribir): <b>v = (0, v₂)</b> es una recta <b>vertical</b>, x = p₁; <b>v = (v₁, 0)</b> es una recta <b>horizontal</b>, y = p₂. En una recta vertical la pendiente no existe (se dice que es infinita) y no se puede escribir como y = mx + n.</p>" +
    "<h5>Pasar de la forma general a las demás</h5>" +
    "<ul><li><b>Vector normal</b>: (A, B). <b>Vector director</b>: (−B, A) o (B, −A): basta intercambiar los coeficientes y cambiar un signo (¡comprueba que son perpendiculares: A·(−B) + B·A = 0!).</li>" +
    "<li><b>Un punto</b>: da un valor a x (o a y) y despeja el otro.</li>" +
    "<li><b>Cortes con los ejes</b>: con y = 0, x = −C/A (corta al eje X); con x = 0, y = −C/B (corta al eje Y).</li>" +
    "<li><b>Pendiente</b>: m = −A/B (de despejar y). </li></ul>" +
    ejemplo("De la general a las demás", "Dada r: 2x − 3y + 6 = 0, halla un vector director, un vector normal, la pendiente, los cortes con los ejes y las ecuaciones paramétricas.", [
      "Normal: n = (2, −3). Director: (−B, A) = (3, 2).",
      "Pendiente: m = −A/B = 2/3. Explícita: y = (2/3)x + 2.",
      "Cortes: y = 0 → x = −3 → (−3, 0); x = 0 → y = 2 → (0, 2).",
      "Paramétricas con el punto (0, 2): <b>x = 3t, y = 2 + 2t</b>."
    ]) +
    "<p>Hay otra forma muy visual, la <b>ecuación segmentaria</b> (o canónica), que usa los cortes con los ejes (a, 0) y (0, b): <b>x/a + y/b = 1</b>. Por ejemplo, la recta que pasa por (4, 0) y (0, 2) es x/4 + y/2 = 1, que equivale a x + 2y − 4 = 0. Sólo existe si la recta no pasa por el origen ni es paralela a un eje.</p>" +
    "<p>Escribe tú mismo una ecuación (en cualquier forma: con paréntesis, fracciones, x e y en los dos lados…) y se convertirá a todas las demás; en el dibujo verás el vector director (rojo) y el normal (azul):</p>" +
    w("ecgeneral") +
    ojo("el vector normal es (A, B), el director es (−B, A). Cambiarlos entre sí es el error más común: ¡recuerda que el normal es perpendicular a la recta! En 4x − 3y + 2 = 0, el director es (3, 4), no (4, −3).");

  // ---------------------------------------------------------------- 4. Pendiente
  secciones[3] =
    "<h5>Pendiente y ángulo: m = tan α</h5>" +
    "<p>Si α es el ángulo que forma la recta con el semieje X positivo (entre 0° y 180°), la pendiente es m = tan α. Por eso: una recta con ángulo agudo tiene pendiente positiva (sube hacia la derecha), con ángulo obtuso la tiene negativa (baja), horizontal m = 0 y vertical (α = 90°) no tiene pendiente (la tangente de 90° no existe).</p>" +
    ejemplo("De un ángulo a la ecuación", "Halla la ecuación de la recta que pasa por P = (1, 2) y forma 60° con el eje X. ¿Y si forma 135°?", [
      "m = tan 60° = √3. Punto-pendiente: y − 2 = √3(x − 1) → y = √3x + (2 − √3) ≈ 1,732x + 0,268.",
      "Con 135°: m = tan 135° = −1. y − 2 = −(x − 1) → y = −x + 3 → <b>x + y − 3 = 0</b>."
    ]) +
    ejemplo("Dos puntos, pendiente y ángulo", "Calcula la pendiente, el ángulo y la ecuación de la recta por A = (−1, 3) y B = (5, 0).", [
      "m = (0 − 3)/(5 − (−1)) = −3/6 = −1/2.",
      "El ángulo: tan α = −1/2 → α = 180° − arctan(1/2) = 180° − 26,57° = <b>153,43°</b> (obtuso, la recta baja).",
      "Punto-pendiente con B: y − 0 = −1/2(x − 5) → <b>x + 2y − 5 = 0</b>."
    ]) +
    "<p>La pendiente también da el significado de la recta: m = 2 significa «por cada unidad que avanzas en horizontal, subes 2»; es una <b>tasa de variación constante</b> (idea que aparecerá en las funciones lineales del Tema 9 y en las derivadas del Tema 11: la derivada de una recta es su pendiente).</p>";

  // ---------------------------------------------------------------- 5. Posiciones
  secciones[4] =
    "<h5>Con las ecuaciones generales no hace falta despejar</h5>" +
    "<p>Dadas r: Ax + By + C = 0 y s: A′x + B′y + C′ = 0, la posición se lee de los coeficientes:</p>" +
    tabla(["Condición", "Posición"], [
      ["A/A′ ≠ B/B′ (equivale a AB′ − A′B ≠ 0)", "secantes: un punto común"],
      ["A/A′ = B/B′ ≠ C/C′", "paralelas: ninguno"],
      ["A/A′ = B/B′ = C/C′", "coincidentes: todos"]
    ]) +
    "<p>Para las secantes, el punto de corte se halla resolviendo el sistema de las dos ecuaciones (Tema 3). Prueba con tus propias rectas:</p>" +
    w("posiciones") +
    "<h5>El ángulo entre dos rectas</h5>" +
    "<p>El ángulo entre dos rectas es el ángulo (agudo, entre 0° y 90°) que forman sus vectores directores (o sus vectores normales, da lo mismo). Con el producto escalar del Tema 7:</p>" +
    H.formula("cos θ = " + fr("|u·v|", "|u|·|v|") + "         o con pendientes:         tan θ = " + fr("|m₂ − m₁|", "1 + m₁·m₂")) +
    ejemplo("Ángulo entre dos rectas", "Calcula el ángulo entre r: y = 2x + 1 y s: y = −x/3 + 4.", [
      "Pendientes: m₁ = 2 y m₂ = −1/3. 1 + m₁m₂ = 1 − 2/3 = 1/3 (no es 0).",
      "tan θ = |(−1/3 − 2)/(1/3)| = |(−7/3)/(1/3)| = 7 → θ = arctan 7 = <b>81,87°</b>."
    ]) +
    ejemplo("Perpendiculares", "Halla k para que 2x + 3y − 1 = 0 y kx − 6y + 5 = 0 sean perpendiculares, y para que sean paralelas.", [
      "Perpendiculares: AA′ + BB′ = 0 → 2k + 3·(−6) = 0 → <b>k = 9</b>.",
      "Paralelas: A/A′ = B/B′ → 2/k = 3/(−6) = −1/2 → <b>k = −4</b> (y entonces C/C′ = −1/5 ≠ −1/2: son paralelas distintas, no coincidentes)."
    ]) +
    "<h5>Rectas por un punto: paralela y perpendicular</h5>" +
    "<p>Para trazar por P la <b>paralela</b> a r: Ax + By + C = 0 se conserva (A, B) y se cambia C: Ax + By + k = 0, con k fijado al sustituir P. Para la <b>perpendicular</b> se intercambian los coeficientes: Bx − Ay + k = 0.</p>" +
    ejemplo("Paralela y perpendicular por un punto", "Halla la paralela y la perpendicular a r: 3x − 2y + 5 = 0 por P = (2, −1).", [
      "Paralela: 3x − 2y + k = 0; con P: 6 + 2 + k = 0 → k = −8 → <b>3x − 2y − 8 = 0</b>.",
      "Perpendicular: 2x + 3y + k = 0; con P: 4 − 3 + k = 0 → k = −1 → <b>2x + 3y − 1 = 0</b>."
    ]) +
    "<h5>Haz de rectas</h5>" +
    "<p>Todas las rectas que pasan por un mismo punto forman un <b>haz</b>. Si el punto es la intersección de r y s, el haz es r + k·s = 0 (con k variable). Ejemplo: las rectas que pasan por (2, 2), intersección de x + y − 4 = 0 y x − y = 0, son (x + y − 4) + k(x − y) = 0. Para la que pasa por (1, 0): (1 − 4) + k(1) = 0 → k = 3 → 4x − 2y − 4 = 0, es decir, 2x − y − 2 = 0.</p>";

  // ---------------------------------------------------------------- 6. Distancias
  secciones[5] =
    "<h5>De dónde sale la fórmula de la distancia a una recta</h5>" +
    "<p>Sea A un punto cualquiera de la recta y n = (A, B) su vector normal. La distancia de P a la recta es la <b>proyección</b> del vector AP sobre la dirección normal: d = |AP·n|/|n|. Como A está en la recta, A·a₁ + B·a₂ = −C, y AP·n = A(p₁ − a₁) + B(p₂ − a₂) = Ap₁ + Bp₂ + C. Por tanto:</p>" +
    H.formula("d(P, r) = " + fr("|A·p₁ + B·p₂ + C|", "√(A² + B²)")) +
    "<p>Mueve el punto P y la recta, y observa la distancia, el pie H de la perpendicular y el simétrico P′:</p>" +
    w("distpunto") +
    ejemplo("Distancia punto-recta y entre paralelas", "Calcula la distancia de P = (2, −1) a r: 5x − 12y + 3 = 0, y la distancia entre las paralelas 3x + 4y − 6 = 0 y 3x + 4y + 9 = 0.", [
      "d(P, r) = |5·2 − 12·(−1) + 3|/√(25 + 144) = |10 + 12 + 3|/13 = 25/13 ≈ <b>1,92</b>.",
      "Entre paralelas: se toma un punto de una y se mide a la otra, o directamente d = |C − C′|/√(A² + B²) (con los mismos A y B): |−6 − 9|/5 = <b>3</b>."
    ]) +
    ejemplo("Simétrico de un punto respecto de una recta", "Halla el simétrico de P = (0, 0) respecto de r: x + y − 4 = 0.", [
      "Recta perpendicular a r por P: x − y = 0. Su intersección con r: x = y, 2x = 4 → H = (2, 2) (el pie de la perpendicular).",
      "H es el punto medio entre P y P′: P′ = 2H − P = <b>(4, 4)</b>.",
      "Comprobación: la distancia de P′ a r es |4 + 4 − 4|/√2 = 4/√2 = 2√2, igual que la de P (|−4|/√2) ✓."
    ]) +
    ojo("el valor absoluto del numerador es imprescindible, y la ecuación tiene que estar en <b>forma general</b> (todo en un lado). Si usas y = 2x + 1 sin pasarla a 2x − y + 1 = 0, la fórmula no funciona.");

  // ---------------------------------------------------------------- 7. Mediatriz
  secciones[6] =
    "<h5>La mediatriz como lugar geométrico</h5>" +
    "<p>La mediatriz del segmento AB es el <b>conjunto de los puntos que están a la misma distancia de A que de B</b>. Eso da otra forma de obtenerla: se escribe |XA| = |XB| con X = (x, y) y se desarrolla. Por ejemplo, con A = (1, 2) y B = (5, 6): (x − 1)² + (y − 2)² = (x − 5)² + (y − 6)² → −2x − 4y + 5 = −10x − 12y + 61 → 8x + 8y − 56 = 0 → <b>x + y − 7 = 0</b>. Coincide con el método geométrico: pasa por M = (3, 4) y su vector normal es AB = (4, 4) → 4(x − 3) + 4(y − 4) = 0 → x + y − 7 = 0.</p>" +
    w("mediatriz") +
    "<h5>Bisectriz de dos rectas</h5>" +
    "<p>La bisectriz es el lugar geométrico de los puntos <b>equidistantes de dos rectas</b>: |Ax + By + C|/√(A² + B²) = |A′x + B′y + C′|/√(A′² + B′²). Quitando el valor absoluto se obtienen dos rectas (+ y −), las dos bisectrices de los cuatro ángulos que forman, y son perpendiculares entre sí.</p>" +
    ejemplo("Las bisectrices", "Halla las bisectrices de las rectas 3x + 4y − 5 = 0 y 5x − 12y + 7 = 0.", [
      "Se iguala |3x + 4y − 5|/5 = |5x − 12y + 7|/13, es decir, 13(3x + 4y − 5) = ±5(5x − 12y + 7).",
      "Con el signo +: 39x + 52y − 65 = 25x − 60y + 35 → <b>14x + 112y − 100 = 0</b>, o sea, 7x + 56y − 50 = 0.",
      "Con el signo −: 39x + 52y − 65 = −25x + 60y − 35 → <b>64x − 8y − 30 = 0</b>, o sea, 32x − 4y − 15 = 0.",
      "Comprobación: son perpendiculares: 7·32 + 56·(−4) = 224 − 224 = 0 ✓."
    ]);

  // ---------------------------------------------------------------- Nuevas
  var nuevas = [
    {
      h: "8. Rectas y puntos notables de un triángulo",
      html:
        "<p>Con lo anterior se pueden calcular los cuatro puntos notables de un triángulo, cada uno como intersección de tres rectas:</p>" +
        tabla(["Rectas", "Qué son", "Punto", "Qué significa"], [
          ["Medianas", "vértice → punto medio del lado opuesto", "Baricentro G", "centro de gravedad; divide cada mediana en 2 : 1"],
          ["Alturas", "vértice ⊥ lado opuesto", "Ortocentro H", "puede quedar fuera si el triángulo es obtusángulo"],
          ["Mediatrices", "⊥ por el punto medio de cada lado", "Circuncentro O", "centro de la circunferencia que pasa por los vértices"],
          ["Bisectrices", "dividen los ángulos en dos iguales", "Incentro I", "centro de la circunferencia inscrita"]
        ]) +
        w("ptosnotables") +
        ejemplo("Un triángulo completo", "Calcula G, H y O del triángulo A = (0, 0), B = (6, 0), C = (2, 4). Comprueba que están alineados.", [
          "<b>G</b> = ((0 + 6 + 2)/3, (0 + 0 + 4)/3) = (8/3, 4/3).",
          "<b>H</b>: la altura desde C es perpendicular a AB (horizontal): x = 2. La altura desde A es perpendicular a BC = (−4, 4) (pendiente −1): su pendiente es 1 → y = x. Se cortan en H = (2, 2).",
          "<b>O</b>: la mediatriz de AB es x = 3. La de AC pasa por (1, 2) y es perpendicular a AC = (2, 4) (pendiente 2): pendiente −1/2 → y − 2 = −(x − 1)/2; con x = 3: y = 1. O = (3, 1).",
          "Los tres están en una misma recta, la <b>recta de Euler</b>: HG = (2/3, −2/3) y GO = (1/3, −1/3), con HG = 2·GO ✓ (siempre G divide a HO en razón 2 : 1)."
        ]) +
        ejemplo("Circunferencia circunscrita", "Halla el radio de la circunferencia que pasa por los vértices del triángulo anterior.", [
          "El centro es el circuncentro O = (3, 1). Radio = |OA| = √(9 + 1) = <b>√10 ≈ 3,16</b>. (Comprueba con B: √(9 + 1) ✓ y con C: √(1 + 9) ✓.)"
        ])
    },
    {
      h: "9. Áreas con coordenadas y problemas de rectas",
      html:
        "<p>Tres herramientas para calcular áreas: (1) <b>base × altura / 2</b>, midiendo la altura como la distancia de un vértice a la recta del lado opuesto; (2) el <b>determinante</b> ½·|det(AB, AC)| del Tema 7; (3) para polígonos, dividirlos en triángulos.</p>" +
        ejemplo("Tres formas de calcular el mismo área", "Calcula el área del triángulo A = (0, 0), B = (6, 0), C = (2, 4).", [
          "Base AB = 6 (sobre el eje X) y altura = ordenada de C = 4: área = 6·4/2 = <b>12</b>.",
          "Con el determinante: AB = (6, 0), AC = (2, 4): ½·|24 − 0| = 12 ✓.",
          "Con la distancia de C a la recta AB (y = 0): d = 4; |AB| = 6 → 12 ✓."
        ]) +
        ejemplo("Una recta que forma un triángulo de área dada", "Halla la recta que pasa por P = (3, 2) y forma con los semiejes positivos un triángulo de área 12.", [
          "Sea x/a + y/b = 1 (cortes a y b). Pasa por P: 3/a + 2/b = 1. Área: ab/2 = 12 → ab = 24.",
          "Multiplicando 3/a + 2/b = 1 por ab: 3b + 2a = ab = 24. Sustituyendo a = 24/b: 3b + 48/b = 24 → 3b² − 24b + 48 = 0 → b² − 8b + 16 = 0 → b = 4.",
          "Entonces a = 6 y la recta es x/6 + y/4 = 1 → <b>2x + 3y − 12 = 0</b>. (Es la única: el discriminante es 0.)"
        ]) +
        ejemplo("Un rayo de luz y un espejo", "Un rayo sale de A = (1, 3), se refleja en el espejo y = 0 (el eje X) y pasa por B = (5, 1). ¿En qué punto del espejo rebota?", [
          "Truco: la imagen de A en el espejo es A′ = (1, −3). El rayo reflejado va como si saliese de A′ en línea recta hasta B.",
          "Recta A′B: v = (4, 4) → pendiente 1: y + 3 = x − 1 → y = x − 4. Corta al eje X (y = 0) en x = 4: <b>el punto (4, 0)</b>.",
          "Comprobación: la longitud del camino es |A′B| = √(16 + 16) = 4√2 ≈ 5,66, y con el punto (4, 0): |A(4, 0)| = 3√2 y |(4, 0)B| = √2, que suman 4√2 ✓."
        ]) +
        ejemplo("Un lugar geométrico", "Halla los puntos del eje Y que están a distancia 5 de la recta 3x + 4y − 10 = 0.", [
          "P = (0, y): d = |4y − 10|/5 = 5 → |4y − 10| = 25 → 4y − 10 = 25 o 4y − 10 = −25.",
          "y = 35/4 = 8,75 o y = −15/4 = −3,75. <b>Dos puntos: (0; 8,75) y (0; −3,75)</b>."
        ])
    },
    {
      h: "10. Semiplanos: una recta divide el plano",
      html:
        "<p>Una recta Ax + By + C = 0 divide el plano en <b>dos semiplanos</b>: en uno la expresión Ax + By + C es positiva y en el otro negativa. Para saber qué lado es solución de una inecuación, se prueba <b>un punto</b> (normalmente el origen, si la recta no pasa por él). La recta pertenece a la región si la desigualdad es ≤ o ≥, y no si es &lt; o &gt;. Un <b>sistema de inecuaciones</b> es la intersección de los semiplanos; si sale un polígono, sus vértices son los cortes de las rectas.</p>" +
        ejemplo("Un semiplano", "Dibuja la región 2x + 3y ≤ 12.", [
          "La recta 2x + 3y = 12 pasa por (6, 0) y (0, 4).",
          "Probamos el origen: 0 + 0 = 0 ≤ 12 ✓. La región es el lado de la recta <b>donde está el origen</b>, incluyendo la recta."
        ]) +
        ejemplo("Un triángulo como sistema", "Escribe el sistema de inecuaciones que describe el triángulo de vértices (0, 0), (4, 0) y (0, 4).", [
          "Los lados son: y = 0 (eje X), x = 0 (eje Y) y la recta que pasa por (4, 0) y (0, 4): x + y = 4.",
          "El interior está sobre el eje X (y ≥ 0), a la derecha del eje Y (x ≥ 0) y por debajo de x + y = 4 (x + y ≤ 4, el origen lo cumple).",
          "<b>Sistema: x ≥ 0, y ≥ 0, x + y ≤ 4</b>."
        ]) +
        w("region") +
        ojo("al multiplicar una inecuación por un número negativo, la desigualdad se invierte (−2x + y ≥ 4 equivale a 2x − y ≤ −4). Y recuerda que las desigualdades estrictas dejan la recta fuera (se dibuja discontinua).")
    },
    {
      h: "11. Mapa de formas de la ecuación",
      html:
        "<p>Cada forma de la ecuación tiene su momento: la <b>paramétrica</b> para recorrer puntos, la <b>explícita</b> para dibujar y ver m, la <b>general</b> para distancias y posiciones. Une cada nombre con su ecuación para la recta que pasa por (1, 2) con vector director (3, 4):</p>" +
        w("emparejar", "formas") +
        w("clasificar", "datos")
    },
    {
      h: "12. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "13. Autocomprobación del tema",
      html: "<p>Diez preguntas de test con explicación y tarjetas con las fórmulas del tema.</p>" + w("quiz", "quiz1") + w("tarjetas", "tj1")
    }
  ];

  var datos = {
    formas: {
      titulo: "La misma recta de cinco formas",
      consigna: "Recta por P = (1, 2) con vector director (3, 4). Une cada nombre con su ecuación.",
      pares: [
        ["Vectorial", "(x, y) = (1, 2) + t·(3, 4)"],
        ["Paramétricas", "x = 1 + 3t, y = 2 + 4t"],
        ["Continua", "(x − 1)/3 = (y − 2)/4"],
        ["General", "4x − 3y + 2 = 0"],
        ["Explícita", "y = (4/3)x + 2/3"],
        ["Punto-pendiente", "y − 2 = (4/3)(x − 1)"]
      ]
    },
    datos: {
      titulo: "¿Con qué datos empiezo?",
      consigna: "Toca un enunciado y después la ecuación que usarías primero.",
      categorias: ["Continua o punto-pendiente (puntos / pendiente)", "General con vector normal", "Fórmula de la distancia punto-recta", "Mediatriz: punto medio + perpendicular"],
      items: [
        { t: "La recta pasa por A = (1, 2) y B = (4, 6)", c: 0 }, { t: "La recta pasa por P y tiene pendiente −1/2", c: 0 },
        { t: "La recta pasa por P y es perpendicular al vector (3, 1)", c: 1 }, { t: "Una paralela a 3x − 2y + 5 = 0 por un punto", c: 1 },
        { t: "Calcular a qué distancia está P de la recta 5x − 12y + 3 = 0", c: 2 }, { t: "Altura de un triángulo desde un vértice sobre la recta del lado opuesto", c: 2 },
        { t: "Hallar los puntos equidistantes de A y B", c: 3 }, { t: "Hallar el circuncentro de un triángulo", c: 3 }
      ]
    },
    tj1: {
      titulo: "Rectas en el plano",
      cartas: [
        { a: "Ecuación vectorial y paramétricas", b: "(x, y) = (p₁, p₂) + t(v₁, v₂) · x = p₁ + tv₁, y = p₂ + tv₂" },
        { a: "Ecuación continua", b: "(x − p₁)/v₁ = (y − p₂)/v₂. Si v₁ = 0: x = p₁ (vertical). Si v₂ = 0: y = p₂ (horizontal)." },
        { a: "Ecuación general y vectores", b: "Ax + By + C = 0 · normal (A, B) · director (−B, A) · pendiente m = −A/B" },
        { a: "Pendiente", b: "m = (b₂ − a₂)/(b₁ − a₁) = v₂/v₁ = tan α. La vertical no tiene pendiente." },
        { a: "Explícita y punto-pendiente", b: "y = mx + n (n = ordenada en el origen) · y − p₂ = m(x − p₁)" },
        { a: "Posición de dos rectas generales", b: "A/A′ ≠ B/B′: secantes · A/A′ = B/B′ ≠ C/C′: paralelas · los tres iguales: coincidentes" },
        { a: "Perpendiculares", b: "AA′ + BB′ = 0 · m₁·m₂ = −1" },
        { a: "Ángulo entre dos rectas", b: "cos θ = |u·v|/(|u||v|) · tan θ = |m₂ − m₁|/(1 + m₁m₂)" },
        { a: "Distancia de un punto a una recta", b: "d = |Ap₁ + Bp₂ + C|/√(A² + B²) · entre paralelas: |C − C′|/√(A² + B²)" },
        { a: "Mediatriz de AB", b: "Pasa por M (punto medio) y es perpendicular a AB. Equidista de A y B." },
        { a: "Recta paralela y perpendicular por un punto", b: "Paralela: misma (A, B) y C nuevo. Perpendicular: Bx − Ay + k = 0." },
        { a: "Puntos notables del triángulo", b: "Medianas → G (media de vértices) · Alturas → H · Mediatrices → O · Bisectrices → I" },
        { a: "Área del triángulo", b: "½·|det(AB, AC)| = base·altura/2" },
        { a: "Semiplano", b: "Ax + By + C ≥ 0: lado de la recta que contiene los puntos que cumplen la desigualdad (se prueba un punto)." }
      ]
    },
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Para la recta 4x − 3y + 2 = 0, un alumno dice que el vector director es (4, −3). ¿Qué falla?",
          op: ["Nada", "(4, −3) es el vector normal; el director es (3, 4) (o (−3, −4))", "El director es (−4, 3)", "El director es (4, 3)"], ok: 1,
          porque: "En Ax + By + C = 0, (A, B) es perpendicular a la recta. El director es (−B, A) = (3, 4). Comprobación: 4·3 − 3·4 = 0." },
        { q: "Un alumno calcula la pendiente de la recta por A = (1, 3) y B = (4, 9) como (4 − 1)/(9 − 3) = 1/2. ¿Qué falla?",
          op: ["Nada", "Ha invertido el cociente: m = (9 − 3)/(4 − 1) = 2", "Debía sumar", "La pendiente es 12"], ok: 1,
          porque: "La pendiente es «cuánto sube partido por cuánto avanza»: m = Δy/Δx = 6/3 = 2." },
        { q: "Un alumno dice que 3x + 2y − 5 = 0 y 2x − 3y + 1 = 0 son paralelas porque «los números están cruzados». ¿Qué falla?",
          op: ["Nada", "Son perpendiculares: 3·2 + 2·(−3) = 0. Paralelas exigiría A/A′ = B/B′", "Son coincidentes", "Son secantes oblicuas"], ok: 1,
          porque: "AA′ + BB′ = 6 − 6 = 0 → perpendiculares. Paralelas: 3/2 ≠ 2/(−3), no lo son." },
        { q: "Para calcular la distancia de P = (1, 2) a la recta y = 2x + 1, un alumno sustituye en |2·1 + 1 − 2|/√(4 + 1)... ¿Qué falla?",
          op: ["Nada", "Hay que pasar la recta a forma general (2x − y + 1 = 0) y usar |2·1 − 2 + 1|/√5 = 1/√5", "Debía dividir entre 2", "Debía restar los dos puntos"], ok: 1,
          porque: "La fórmula pide Ax + By + C = 0 con todo a un lado: A = 2, B = −1, C = 1. Con ello d = |2 − 2 + 1|/√5 = 0,447." },
        { q: "Un alumno halla la perpendicular a 3x − 2y + 5 = 0 por (2, −1) como 3x − 2y + k = 0. ¿Qué falla?",
          op: ["Nada", "Esa es la paralela. La perpendicular es 2x + 3y + k = 0", "Debe ser −3x + 2y + k = 0", "Debe ser 3x + 2y + k = 0"], ok: 1,
          porque: "Perpendicular: se intercambian los coeficientes y se cambia un signo: (A, B) → (B, −A). Con 3x − 2y: 2x + 3y + k = 0." },
        { q: "Un alumno dice que la recta x = 3 tiene pendiente 0. ¿Qué falla?",
          op: ["Nada", "x = 3 es una recta vertical: no tiene pendiente (la pendiente 0 es la de las horizontales)", "Su pendiente es 3", "Su pendiente es 1"], ok: 1,
          porque: "La recta vertical forma 90° con el eje X, y tan 90° no existe. La horizontal, como y = 3, sí tiene pendiente 0." },
        { q: "Un alumno halla el punto medio de AB y lo da como «la mediatriz». ¿Qué falla?",
          op: ["Nada", "La mediatriz es una recta: la que pasa por el punto medio y es perpendicular a AB", "Es el segmento AB", "Es el baricentro"], ok: 1,
          porque: "El punto medio es un punto. La mediatriz es la recta perpendicular a AB por ese punto." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La recta por A = (1, 2) y B = (3, 8) tiene pendiente…",
          op: ["3", "1/3", "6", "−3"], ok: 0,
          porque: "m = (8 − 2)/(3 − 1) = 6/2 = 3." },
        { q: "Un vector director de 5x − 2y + 7 = 0 es…",
          op: ["(2, 5)", "(5, −2)", "(5, 2)", "(−5, 2)"], ok: 0,
          porque: "(−B, A) = (2, 5). El vector (5, −2) es el normal." },
        { q: "Las rectas 2x + 3y − 6 = 0 y 4x + 6y + 1 = 0 son…",
          op: ["paralelas", "coincidentes", "secantes", "perpendiculares"], ok: 0,
          porque: "2/4 = 3/6 = 1/2 y −6/1 ≠ 1/2: paralelas distintas." },
        { q: "Una recta perpendicular a y = 2x + 1 tiene pendiente…",
          op: ["−1/2", "2", "1/2", "−2"], ok: 0,
          porque: "m₁·m₂ = −1 → m₂ = −1/2." },
        { q: "La distancia de (1, 2) a 3x + 4y − 6 = 0 es…",
          op: ["1", "5", "3", "0,2"], ok: 0,
          porque: "|3 + 8 − 6|/5 = 5/5 = 1." },
        { q: "La mediatriz del segmento de extremos (0, 0) y (6, 4) es…",
          op: ["3x + 2y − 13 = 0", "2x − 3y = 0", "3x + 2y = 0", "x + y − 5 = 0"], ok: 0,
          porque: "Pasa por (3, 2) con normal AB = (6, 4) ∥ (3, 2): 3(x − 3) + 2(y − 2) = 0 → 3x + 2y − 13 = 0." },
        { q: "La ecuación de la recta que pasa por (0, 2) con pendiente −3 es…",
          op: ["y = −3x + 2", "y = 3x + 2", "y = −3x − 2", "y = 2x − 3"], ok: 0,
          porque: "Pendiente −3 y ordenada en el origen 2." },
        { q: "El ángulo entre y = x e y = 3x es…",
          op: ["26,57°", "63,43°", "45°", "18,43°"], ok: 0,
          porque: "tan θ = |3 − 1|/(1 + 3) = 0,5 → θ = 26,57°." },
        { q: "El baricentro del triángulo (0, 0), (6, 0), (0, 6) es…",
          op: ["(2, 2)", "(3, 3)", "(6, 6)", "(1, 1)"], ok: 0,
          porque: "La media de los vértices: ((0 + 6 + 0)/3, (0 + 0 + 6)/3) = (2, 2)." },
        { q: "El punto (3, 4) pertenece a la recta…",
          op: ["2x − 3y + 6 = 0", "2x + 3y − 6 = 0", "x − y + 2 = 0", "3x − 4y = 0"], ok: 0,
          porque: "2·3 − 3·4 + 6 = 0 ✓. Las demás no se anulan: 6 + 12 − 6 = 12; 3 − 4 + 2 = 1; 9 − 16 = −7." }
      ]
    }
  };

  var ejercicios = [
    // ================= ★ básico =================
    { id: "r1", nivel: 1,
      enunciado: "Halla la ecuación general de la recta que pasa por P = (2, 1) con vector director v = (1, 3). Da A, B y C con A &gt; 0.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 3 }, { tipo: "num", etiqueta: "B =", valor: -1 }, { tipo: "num", etiqueta: "C =", valor: -5 }],
      pistas: ["Continua: (x − 2)/1 = (y − 1)/3. Multiplica en cruz."],
      pasos: ["3(x − 2) = 1·(y − 1) → 3x − 6 = y − 1 → 3x − y − 5 = 0."],
      resultado: "3x − y − 5 = 0" },
    { id: "r2", nivel: 1,
      enunciado: "Halla la pendiente y la ordenada en el origen de la recta que pasa por A = (0, 2) y B = (3, 8).",
      check: [{ tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 2 }],
      pistas: ["m = (b₂ − a₂)/(b₁ − a₁). El punto A está en el eje Y."],
      pasos: ["m = (8 − 2)/(3 − 0) = 2. La ordenada en el origen es la y de A: n = 2.", "y = 2x + 2."],
      resultado: "y = 2x + 2" },
    { id: "r3", nivel: 1,
      enunciado: "Halla un vector director de 3x − 5y + 2 = 0 (con primera componente positiva) y escribe sus componentes.",
      check: [{ tipo: "num", etiqueta: "v₁ =", valor: 5 }, { tipo: "num", etiqueta: "v₂ =", valor: 3 }],
      pistas: ["(−B, A)."],
      pasos: ["A = 3 y B = −5: (−B, A) = (5, 3). (El normal es (3, −5).)"],
      resultado: "(5, 3)" },
    { id: "r4", nivel: 1,
      enunciado: "Estudia la posición de r: 2x + y − 3 = 0 y s: 4x + 2y + 1 = 0.",
      check: { tipo: "opcion", etiqueta: "Son", opciones: ["paralelas", "coincidentes", "secantes", "perpendiculares"], ok: 0 },
      pistas: ["Compara A/A′, B/B′ y C/C′."],
      pasos: ["2/4 = 1/2 y 1/2 = 1/2, pero −3/1 ≠ 1/2: paralelas (no coincidentes)."],
      resultado: "paralelas" },
    { id: "r5", nivel: 1,
      enunciado: "Una recta tiene pendiente 3. ¿Qué pendiente tiene cualquier recta perpendicular a ella?",
      check: { tipo: "num", etiqueta: "m′ =", valor: -1 / 3, tol: 0.002, ph: "−1/3" },
      pistas: ["m·m′ = −1."],
      pasos: ["m′ = −1/3."],
      resultado: "−1/3" },
    { id: "r6", nivel: 1,
      enunciado: "Calcula la distancia del punto P = (3, 1) a la recta 4x − 3y + 2 = 0.",
      check: { tipo: "num", etiqueta: "d =", valor: 2.2 },
      pistas: ["d = |Ap₁ + Bp₂ + C|/√(A² + B²)."],
      pasos: ["d = |12 − 3 + 2|/√(16 + 9) = 11/5 = 2,2."],
      resultado: "11/5 = 2,2" },
    { id: "r7", nivel: 1,
      enunciado: "¿Pertenece el punto (−1, 4) a la recta 3x + 2y − 5 = 0?",
      check: { tipo: "opcion", etiqueta: "Respuesta", opciones: ["Sí", "No"], ok: 0 },
      pistas: ["Sustituye x e y."],
      pasos: ["3·(−1) + 2·4 − 5 = −3 + 8 − 5 = 0: sí pertenece."],
      resultado: "Sí" },
    { id: "r8", nivel: 1,
      enunciado: "Halla los puntos de corte de 2x + 3y − 12 = 0 con el eje X y con el eje Y. Da la abscisa del primero y la ordenada del segundo.",
      check: [{ tipo: "num", etiqueta: "corte con el eje X: x =", valor: 6 }, { tipo: "num", etiqueta: "corte con el eje Y: y =", valor: 4 }],
      pistas: ["Eje X: y = 0. Eje Y: x = 0."],
      pasos: ["y = 0: 2x = 12 → x = 6. x = 0: 3y = 12 → y = 4. Puntos (6, 0) y (0, 4)."],
      resultado: "(6, 0) y (0, 4)" },
    { id: "r9", nivel: 1,
      enunciado: "¿Qué ángulo forma con el eje X la recta y = √3·x + 1?",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 60, unidad: "°" },
      pistas: ["m = tan α."],
      pasos: ["tan α = √3 → α = 60°."],
      resultado: "60°" },
    { id: "r10", nivel: 1,
      enunciado: "Halla la recta paralela a y = 2x − 3 que pasa por (1, 5). Da su pendiente y su ordenada en el origen.",
      check: [{ tipo: "num", etiqueta: "m =", valor: 2 }, { tipo: "num", etiqueta: "n =", valor: 3 }],
      pistas: ["Misma pendiente: y − 5 = 2(x − 1)."],
      pasos: ["y − 5 = 2x − 2 → y = 2x + 3."],
      resultado: "y = 2x + 3" },
    // ================= ★★ medio =================
    { id: "r11", nivel: 2,
      enunciado: "La recta que pasa por A = (1, −2) y B = (4, 2) tiene ecuaciones x = 1 + 3t, y = −2 + 4t. ¿Para qué valor de t se obtiene el punto (7, 6)?",
      check: { tipo: "num", etiqueta: "t =", valor: 2 },
      pistas: ["Resuelve 1 + 3t = 7 y comprueba con la otra ecuación."],
      pasos: ["1 + 3t = 7 → t = 2. Comprobación: −2 + 4·2 = 6 ✓."],
      resultado: "t = 2" },
    { id: "r12", nivel: 2,
      enunciado: "Pasa la recta (x − 3)/2 = (y + 1)/(−4) a la forma explícita y = mx + n. Da m y n.",
      check: [{ tipo: "num", etiqueta: "m =", valor: -2 }, { tipo: "num", etiqueta: "n =", valor: 5 }],
      pistas: ["Multiplica en cruz y despeja y."],
      pasos: ["−4(x − 3) = 2(y + 1) → −4x + 12 = 2y + 2 → y = −2x + 5."],
      resultado: "y = −2x + 5" },
    { id: "r13", nivel: 2,
      enunciado: "Halla la perpendicular a r: 3x − 2y + 5 = 0 que pasa por P = (2, −1). Da A, B y C (con A &gt; 0).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 2 }, { tipo: "num", etiqueta: "B =", valor: 3 }, { tipo: "num", etiqueta: "C =", valor: -1 }],
      pistas: ["Perpendicular: se intercambian los coeficientes: 2x + 3y + k = 0."],
      pasos: ["2x + 3y + k = 0; con P: 4 − 3 + k = 0 → k = −1.", "2x + 3y − 1 = 0."],
      resultado: "2x + 3y − 1 = 0" },
    { id: "r14", nivel: 2,
      enunciado: "Calcula el ángulo agudo entre r: y = 2x + 1 y s: y = −x/3 + 4.",
      check: { tipo: "num", etiqueta: "ángulo =", valor: 81.87, unidad: "°" },
      pistas: ["tan θ = |m₂ − m₁|/(1 + m₁m₂)."],
      pasos: ["tan θ = |(−1/3 − 2)/(1 − 2/3)| = |(−7/3)/(1/3)| = 7 → θ = 81,87°."],
      resultado: "≈ 81,87°" },
    { id: "r15", nivel: 2,
      enunciado: "Halla k para que 2x + 3y − 1 = 0 y kx − 6y + 5 = 0 sean perpendiculares.",
      check: { tipo: "num", etiqueta: "k =", valor: 9 },
      pistas: ["AA′ + BB′ = 0."],
      pasos: ["2k + 3·(−6) = 0 → k = 9."],
      resultado: "k = 9" },
    { id: "r16", nivel: 2,
      enunciado: "Calcula la distancia entre las rectas paralelas 3x + 4y − 6 = 0 y 3x + 4y + 9 = 0.",
      check: { tipo: "num", etiqueta: "d =", valor: 3 },
      pistas: ["d = |C − C′|/√(A² + B²)."],
      pasos: ["d = |−6 − 9|/√(9 + 16) = 15/5 = 3."],
      resultado: "3" },
    { id: "r17", nivel: 2,
      enunciado: "Halla la mediatriz del segmento de extremos A = (1, 2) y B = (5, 6). Da A, B y C (con A = 1).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 1 }, { tipo: "num", etiqueta: "B =", valor: 1 }, { tipo: "num", etiqueta: "C =", valor: -7 }],
      pistas: ["Pasa por M = (3, 4) y tiene como vector normal AB = (4, 4)."],
      pasos: ["4(x − 3) + 4(y − 4) = 0 → x + y − 7 = 0."],
      resultado: "x + y − 7 = 0" },
    { id: "r18", nivel: 2,
      enunciado: "Halla el simétrico de P = (0, 0) respecto de la recta x + y − 4 = 0. Da sus coordenadas.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 4 }],
      pistas: ["Pie de la perpendicular H y P′ = 2H − P."],
      pasos: ["Perpendicular por P: x − y = 0. Corta a r en H = (2, 2). P′ = 2H − P = (4, 4)."],
      resultado: "(4, 4)" },
    { id: "r19", nivel: 2,
      enunciado: "Halla el punto de corte de r: 2x − y + 1 = 0 y s: x + y − 4 = 0.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 1 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["Resuelve el sistema (suma las dos ecuaciones)."],
      pasos: ["Sumando: 3x − 3 = 0 → x = 1 y y = 3. Comprobación: 2 − 3 + 1 = 0 y 1 + 3 − 4 = 0."],
      resultado: "(1, 3)" },
    { id: "r20", nivel: 2,
      enunciado: "Halla la recta que pasa por P = (2, 3) y es perpendicular al vector n = (3, 1). Da A, B y C.",
      check: [{ tipo: "num", etiqueta: "A =", valor: 3 }, { tipo: "num", etiqueta: "B =", valor: 1 }, { tipo: "num", etiqueta: "C =", valor: -9 }],
      pistas: ["Si n es perpendicular a la recta, n = (A, B): A(x − 2) + B(y − 3) = 0."],
      pasos: ["3(x − 2) + 1·(y − 3) = 0 → 3x + y − 9 = 0."],
      resultado: "3x + y − 9 = 0" },
    { id: "r21", nivel: 2,
      enunciado: "Calcula el área del triángulo que forma la recta 3x + 4y − 12 = 0 con los ejes de coordenadas.",
      check: { tipo: "num", etiqueta: "área =", valor: 6 },
      pistas: ["Halla los cortes con los ejes."],
      pasos: ["Cortes: (4, 0) y (0, 3). Triángulo rectángulo de catetos 4 y 3: área = 4·3/2 = 6."],
      resultado: "6" },
    { id: "r22", nivel: 2,
      enunciado: "Calcula la distancia del punto P = (2, −1) a la recta 5x − 12y + 3 = 0 (decimal).",
      check: { tipo: "num", etiqueta: "d =", valor: 1.9231, tol: 0.002 },
      pistas: ["√(25 + 144) = 13."],
      pasos: ["d = |10 + 12 + 3|/13 = 25/13 ≈ 1,923."],
      resultado: "25/13" },
    { id: "r23", nivel: 2,
      enunciado: "Halla el ortocentro del triángulo A = (0, 0), B = (6, 0), C = (2, 4).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 2 }, { tipo: "num", etiqueta: "y =", valor: 2 }],
      pistas: ["Altura desde C: perpendicular a AB (vertical). Altura desde A: perpendicular a BC."],
      pasos: ["Altura desde C: x = 2. BC = (−4, 4): pendiente −1; la altura desde A tiene pendiente 1: y = x.", "H = (2, 2)."],
      resultado: "H = (2, 2)" },
    { id: "r24", nivel: 2,
      enunciado: "Halla el circuncentro del mismo triángulo A = (0, 0), B = (6, 0), C = (2, 4).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 3 }, { tipo: "num", etiqueta: "y =", valor: 1 }],
      pistas: ["Mediatriz de AB: x = 3. Mediatriz de AC: por (1, 2), perpendicular a (2, 4)."],
      pasos: ["Mediatriz de AB: x = 3. Mediatriz de AC: 2(x − 1) + 4(y − 2) = 0 → x + 2y − 5 = 0.", "Con x = 3: y = 1. O = (3, 1)."],
      resultado: "O = (3, 1)" },
    // ================= ★★★ nivel PAU =================
    { id: "r25", nivel: 3,
      enunciado: "Halla la recta que pasa por P = (3, 2) y forma con los semiejes positivos un triángulo de área 12. Da A, B y C (con A &gt; 0 y sin factor común).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 2 }, { tipo: "num", etiqueta: "B =", valor: 3 }, { tipo: "num", etiqueta: "C =", valor: -12 }],
      pistas: ["x/a + y/b = 1, con 3/a + 2/b = 1 y ab = 24."],
      pasos: ["3b + 2a = ab = 24 y a = 24/b → 3b + 48/b = 24 → b² − 8b + 16 = 0 → b = 4, a = 6.", "x/6 + y/4 = 1 → 2x + 3y − 12 = 0."],
      resultado: "2x + 3y − 12 = 0" },
    { id: "r26", nivel: 3,
      enunciado: "Un rayo de luz sale de A = (1, 3), se refleja en el espejo y = 0 y pasa por B = (5, 1). ¿En qué punto del espejo rebota? Da su abscisa.",
      check: { tipo: "num", etiqueta: "x =", valor: 4 },
      pistas: ["Usa la imagen de A en el espejo: A′ = (1, −3). La recta A′B corta al espejo en el punto de rebote."],
      pasos: ["A′B: v = (4, 4): y = x − 4. Con y = 0: x = 4. El punto de rebote es (4, 0)."],
      resultado: "(4, 0)" },
    { id: "r27", nivel: 3,
      enunciado: "Halla la bisectriz «con signo +» de 3x + 4y − 5 = 0 y 5x − 12y + 7 = 0, es decir, 13(3x + 4y − 5) = 5(5x − 12y + 7). Da A, B y C (A &gt; 0, sin factor común).",
      check: [{ tipo: "num", etiqueta: "A =", valor: 7 }, { tipo: "num", etiqueta: "B =", valor: 56 }, { tipo: "num", etiqueta: "C =", valor: -50 }],
      pistas: ["Desarrolla: 39x + 52y − 65 = 25x − 60y + 35."],
      pasos: ["14x + 112y − 100 = 0 → dividiendo entre 2: 7x + 56y − 50 = 0."],
      resultado: "7x + 56y − 50 = 0" },
    { id: "r28", nivel: 3,
      enunciado: "Halla los puntos del eje Y que están a distancia 5 de la recta 3x + 4y − 10 = 0. Escribe sus ordenadas.",
      check: { tipo: "lista", etiqueta: "y =", valores: [8.75, -3.75], ph: "dos valores" },
      pistas: ["P = (0, y): |4y − 10|/5 = 5."],
      pasos: ["|4y − 10| = 25 → 4y − 10 = 25 o 4y − 10 = −25 → y = 35/4 = 8,75 o y = −15/4 = −3,75."],
      resultado: "(0; 8,75) y (0; −3,75)" },
    { id: "r29", nivel: 3,
      enunciado: "Las rectas del haz (x + y − 4) + k(x − y) = 0 pasan por el punto (2, 2). ¿Qué valor de k da la que pasa también por (1, 0)?",
      check: { tipo: "num", etiqueta: "k =", valor: 3 },
      pistas: ["Sustituye (1, 0) en la ecuación del haz."],
      pasos: ["(1 + 0 − 4) + k(1 − 0) = 0 → k = 3. La recta: 4x − 2y − 4 = 0, es decir, 2x − y − 2 = 0."],
      resultado: "k = 3" },
    { id: "r30", nivel: 3,
      enunciado: "Calcula la altura desde A = (1, 1) sobre el lado BC del triángulo de vértices B = (7, 1) y C = (4, 5).",
      check: { tipo: "num", etiqueta: "altura =", valor: 4.8 },
      pistas: ["Recta BC: vector director (−3, 4) → 4x + 3y − 31 = 0."],
      pasos: ["BC: 4(x − 7) + 3(y − 1) = 0 → 4x + 3y − 31 = 0.", "h = d(A, BC) = |4 + 3 − 31|/5 = 24/5 = 4,8. (Área = ½·5·4,8 = 12.)"],
      resultado: "4,8" },
    { id: "r31", nivel: 3,
      enunciado: "Halla las pendientes de las rectas que pasan por P = (1, 2) y forman un ángulo de 45° con la recta y = 2x.",
      check: { tipo: "lista", etiqueta: "pendientes:", valores: [-3, 1 / 3], ph: "dos valores" },
      pistas: ["tan 45° = 1 = |(m − 2)/(1 + 2m)|: dos casos, + y −."],
      pasos: ["(m − 2)/(1 + 2m) = 1 → m − 2 = 1 + 2m → m = −3.", "(m − 2)/(1 + 2m) = −1 → m − 2 = −1 − 2m → m = 1/3.", "Rectas: 3x + y − 5 = 0 y x − 3y + 5 = 0."],
      resultado: "m = −3 y m = 1/3" },
    { id: "r32", nivel: 3,
      enunciado: "Deduce la fórmula de la distancia de un punto P = (p₁, p₂) a la recta Ax + By + C = 0 usando el vector normal.",
      check: { tipo: "rubrica", etiqueta: "Tu deducción", filas: 7, items: [
        { t: "Toma un punto X = (x₀, y₀) de la recta, de modo que Ax₀ + By₀ + C = 0", p: 0.5 },
        { t: "Explica que la distancia es la proyección de XP sobre el vector normal n = (A, B): d = |XP·n|/|n|", p: 0.5 },
        { t: "Calcula XP·n = A(p₁ − x₀) + B(p₂ − y₀) y usa Ax₀ + By₀ = −C", p: 0.5 },
        { t: "Llega a d = |Ap₁ + Bp₂ + C|/√(A² + B²)", p: 0.5 }
      ] },
      pasos: ["XP·n = A(p₁ − x₀) + B(p₂ − y₀) = Ap₁ + Bp₂ − (Ax₀ + By₀) = Ap₁ + Bp₂ + C.", "|n| = √(A² + B²). Por tanto d = |Ap₁ + Bp₂ + C|/√(A² + B²). ∎"],
      resultado: "d = |Ap₁ + Bp₂ + C|/√(A² + B²)" },
    { id: "r33", nivel: 3,
      enunciado: "Demuestra que el lugar geométrico de los puntos X = (x, y) que equidistan de A = (a₁, a₂) y B = (b₁, b₂) es una recta perpendicular a AB que pasa por su punto medio.",
      check: { tipo: "rubrica", etiqueta: "Tu demostración", filas: 7, items: [
        { t: "Escribe |XA|² = |XB|² y desarrolla las dos distancias", p: 0.5 },
        { t: "Cancela los términos x² e y² y obtiene una ecuación de primer grado en x e y", p: 0.5 },
        { t: "Reordena como 2(b₁ − a₁)x + 2(b₂ − a₂)y = |B|² − |A|², donde (b₁ − a₁, b₂ − a₂) = AB es el vector normal", p: 0.5 },
        { t: "Comprueba que el punto medio la cumple (o que la recta es perpendicular a AB)", p: 0.5 }
      ] },
      pasos: ["(x − a₁)² + (y − a₂)² = (x − b₁)² + (y − b₂)² → −2a₁x − 2a₂y + |A|² = −2b₁x − 2b₂y + |B|².", "2(b₁ − a₁)x + 2(b₂ − a₂)y = |B|² − |A|²: recta con vector normal AB (perpendicular a AB).", "El punto medio M cumple: (b₁ − a₁)(a₁ + b₁) + (b₂ − a₂)(a₂ + b₂) = b₁² − a₁² + b₂² − a₂² = |B|² − |A|². ∎"],
      resultado: "La mediatriz de AB" },
    { id: "r34", nivel: 3,
      enunciado: "En el triángulo A = (0, 0), B = (6, 0), C = (2, 4), comprueba la recta de Euler: calcula el cociente |HG|/|GO| entre las distancias del baricentro al ortocentro y al circuncentro.",
      check: { tipo: "num", etiqueta: "|HG|/|GO| =", valor: 2 },
      pistas: ["G = (8/3, 4/3), H = (2, 2), O = (3, 1)."],
      pasos: ["HG = G − H = (2/3, −2/3) y GO = O − G = (1/3, −1/3).", "HG = 2·GO: la razón es 2."],
      resultado: "2" },
    { id: "r35", nivel: 3,
      enunciado: "Calcula el área de la región definida por x ≥ 0, y ≥ 0 y x + 2y ≤ 8.",
      check: { tipo: "num", etiqueta: "área =", valor: 16 },
      pistas: ["Es un triángulo con vértices en los ejes y en la recta."],
      pasos: ["Vértices: (0, 0), (8, 0) (y = 0 → x = 8) y (0, 4) (x = 0 → y = 4).", "Área = 8·4/2 = 16."],
      resultado: "16" },
    { id: "r36", nivel: 3,
      enunciado: "Halla el simétrico de P = (2, 5) respecto de la recta x − y + 1 = 0. Da sus coordenadas.",
      check: [{ tipo: "num", etiqueta: "x =", valor: 4 }, { tipo: "num", etiqueta: "y =", valor: 3 }],
      pistas: ["Perpendicular por P: x + y − 7 = 0. Corta a r en H."],
      pasos: ["Perpendicular por P: x + y = 7. Con x − y = −1: 2x = 6 → x = 3, y = 4: H = (3, 4).", "P′ = 2H − P = (6 − 2, 8 − 5) = (4, 3)."],
      resultado: "P′ = (4, 3)" }
  ];

  var lamina = [
    { titulo: "Formas de la ecuación de una recta", ancha: true,
      tabla: { cab: ["Forma", "Ecuación", "Cuándo usarla"], filas: [
        ["Vectorial", "(x, y) = (p₁, p₂) + t(v₁, v₂)", "recorrer puntos"],
        ["Paramétricas", "x = p₁ + tv₁ · y = p₂ + tv₂", "puntos concretos (t = 0, 1, …)"],
        ["Continua", "(x − p₁)/v₁ = (y − p₂)/v₂", "con dos puntos o punto y vector"],
        ["General", "Ax + By + C = 0", "distancias, posiciones"],
        ["Explícita", "y = mx + n", "dibujar, ver la pendiente"],
        ["Punto-pendiente", "y − p₂ = m(x − p₁)", "con punto y pendiente"],
        ["Segmentaria", "x/a + y/b = 1", "cortes con los ejes"]
      ] },
      nota: "Normal (A, B) ⊥ recta · director (−B, A) · pendiente m = −A/B = tan α." },
    { titulo: "Pendiente y ángulo",
      items: [
        { label: "Con dos puntos", formula: "m = " + fr("b₂ − a₂", "b₁ − a₁"), ejemplo: "A = (1, 3), B = (4, 9) → m = 6/3 = 2" },
        { label: "Con el ángulo", formula: "m = tan α", ejemplo: "α = 60° → m = √3 · 135° → m = −1" },
        { label: "Vertical y horizontal", formula: "x = k (sin pendiente) · y = k (m = 0)" }
      ] },
    { titulo: "Posiciones relativas y ángulos",
      tabla: { cab: ["Condición", "Rectas"], filas: [["A/A′ ≠ B/B′", "secantes"], ["A/A′ = B/B′ ≠ C/C′", "paralelas"], ["A/A′ = B/B′ = C/C′", "coincidentes"], ["AA′ + BB′ = 0  ·  m₁m₂ = −1", "perpendiculares"]] },
      items: [{ label: "Ángulo entre rectas", formula: "tan θ = |m₂ − m₁|/(1 + m₁m₂)", cuando: "θ agudo.", ejemplo: "y = x e y = 3x: tan θ = 2/4 → 26,57°" }],
      nota: "Paralela por P: mismo (A, B), C nuevo. Perpendicular por P: Bx − Ay + k = 0." },
    { titulo: "Distancias y mediatriz",
      items: [
        { label: "Entre dos puntos", formula: "d(A, B) = √((b₁ − a₁)² + (b₂ − a₂)²)" },
        { label: "Punto-recta", formula: "d = " + fr("|Ap₁ + Bp₂ + C|", "√(A² + B²)"), ejemplo: "(1, 2) y 3x + 4y − 6 = 0 → 5/5 = 1", ojo: "La recta debe estar en forma general." },
        { label: "Entre paralelas", formula: "d = |C − C′|/√(A² + B²)" },
        { label: "Mediatriz de AB", formula: "pasa por M y es ⊥ AB (normal = AB)" }
      ],
      nota: "Simétrico de P respecto de r: H = pie de la perpendicular; P′ = 2H − P." },
    { titulo: "Puntos notables del triángulo",
      tabla: { cab: ["Punto", "Rectas", "Cálculo"], filas: [["Baricentro G", "medianas", "media de los vértices"], ["Ortocentro H", "alturas", "cortar dos alturas"], ["Circuncentro O", "mediatrices", "cortar dos mediatrices"], ["Incentro I", "bisectrices", "(a·A + b·B + c·C)/(a + b + c)"]] },
      nota: "G, H y O están alineados (recta de Euler) y HG = 2·GO." },
    { titulo: "Áreas y regiones",
      items: [
        { label: "Triángulo", formula: "S = ½·|det(AB, AC)| = ½·base·altura", ejemplo: "A = (0,0), B = (6,0), C = (2,4) → 12" },
        { label: "Semiplano", formula: "Ax + By + C ≥ 0", cuando: "Prueba el origen para elegir el lado.", ojo: "Estricta (<, >): la recta no entra." }
      ],
      nota: "Sistema de inecuaciones = intersección de semiplanos; los vértices son cortes de las rectas." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "En 4x − 3y + 2 = 0, el director es (4, −3)", bien: "El director es (3, 4)", por: "(A, B) es la normal." },
        { mal: "m = Δx/Δy", bien: "m = Δy/Δx", por: "Sube partido por avanza." },
        { mal: "Perpendicular a 3x − 2y + 5 = 0: 3x − 2y + k = 0", bien: "2x + 3y + k = 0", por: "Esa es la paralela." },
        { mal: "Distancia a y = 2x + 1: |2·1 + 1 − 2|/√5", bien: "Pasar a 2x − y + 1 = 0 primero", por: "La fórmula pide la forma general." },
        { mal: "x = 3 tiene pendiente 0", bien: "No tiene pendiente (vertical)", por: "tan 90° no existe." },
        { mal: "Mediatriz = punto medio", bien: "Mediatriz = recta ⊥ AB por M", por: "Es una recta, no un punto." }
      ] }
  ];

  B.registrar("mates1", "t8", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

/* ============================================================
   Matemáticas I · ampliaciones
   Tema 11: Derivadas y aplicaciones
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos, bloques de la lámina
   y un simulacro nuevo.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  // ---------- ayudantes de maquetación (compartidos en nucleo.js) ----------
  var H = B.h, fr = H.fr, raiz = H.raiz, formula = H.formula, ejemplo = H.ejemplo, ojo = H.ojo;
  function w(nombre, ref) { return H.w(nombre, ref && "mates1/t11/" + ref); }

  // ============================================================
  // TEORÍA: se añade al final de cada sección existente (índice 0 = sección 1)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Velocidad media y ritmo medio de cambio</h5>" +
    "<p>Si f(t) es la posición de un coche (en metros) en el instante t (en segundos), la TVM entre t₁ y t₂ es justo su <b>velocidad media</b>: metros recorridos entre segundos transcurridos. Con cualquier otra magnitud (temperatura, beneficios, población…) la TVM es su <b>ritmo medio de cambio</b>: cuánto sube o baja de media por cada unidad de x. Por eso la TVM siempre lleva unidades: las de f entre las de x.</p>" +
    ejemplo("Ejemplo resuelto", "La posición de un coche que arranca es s(t) = 5t² (s en metros, t en segundos). ¿Cuál es su velocidad media entre t = 2 s y t = 4 s?", [
      "s(2) = 5·2² = 20 m   y   s(4) = 5·4² = 80 m",
      "TVM[2,4] = " + fr("s(4) − s(2)", "4 − 2") + " = " + fr("80 − 20", "2") + " = " + fr("60", "2") + " = 30",
      "Unidades: metros entre segundos → <b>30 m/s</b>. Es la pendiente de la secante que une (2, 20) y (4, 80)."
    ]) +
    ojo("La TVM puede ser negativa (la función baja de media) o cero. Que TVM[a,b] = 0 <em>no</em> significa que f sea constante entre a y b: solo que f(a) = f(b). Una pelota lanzada hacia arriba vuelve a la altura de partida con velocidad media cero, y sin embargo se ha movido.") +
    w("secante");

  secciones[1] =
    "<p>Antes de ponerle fórmula, <b>míralo</b>. Desplázate por los pasos de esta clase: la gráfica de la izquierda cambia a medida que lees.</p>" +
    w("clase", "clase1") +
    "<h5>La definición con «h»: la forma que usarás en los ejercicios</h5>" +
    "<p>Si llamas h a la distancia entre los dos puntos (b = a + h), decir «b tiende a a» es lo mismo que decir «h tiende a 0». La definición queda así, y es la que se pide cuando un ejercicio dice «calcula <em>por la definición</em>»:</p>" +
    formula("f'(a) = lim<sub>h→0</sub> " + fr("f(a + h) − f(a)", "h")) +
    "<p>Siempre sale una indeterminación 0/0 (numerador y denominador tienden a 0). El truco, igual que en el Tema 10, es <b>simplificar h antes de hacer el límite</b>.</p>" +
    ejemplo("Ejemplo resuelto 1", "Calcula por la definición la derivada de f(x) = x² en a = 3.", [
      "f(3 + h) − f(3) = (3 + h)² − 9 = 9 + 6h + h² − 9 = 6h + h²",
      "Dividimos entre h y simplificamos: " + fr("6h + h²", "h") + " = 6 + h",
      "lim<sub>h→0</sub> (6 + h) = 6   →   <b>f'(3) = 6</b>",
      "Comprobación con la regla de la potencia: (x²)' = 2x, y 2·3 = 6 ✓"
    ]) +
    ejemplo("Ejemplo resuelto 2", "Calcula por la definición la derivada de f(x) = 1/x en a = 2.", [
      "f(2 + h) − f(2) = " + fr("1", "2 + h") + " − " + fr("1", "2") + " = " + fr("2 − (2 + h)", "2(2 + h)") + " = " + fr("−h", "2(2 + h)"),
      "Dividimos entre h: " + fr("−1", "2(2 + h)"),
      "lim<sub>h→0</sub> " + fr("−1", "2(2 + h)") + " = " + fr("−1", "4") + "   →   <b>f'(2) = −1/4</b>",
      "Comprobación: (x⁻¹)' = −x⁻², y −1/2² = −1/4 ✓"
    ]) +
    "<h5>La derivada como velocidad instantánea</h5>" +
    "<p>Lo que acabas de ver con las secantes es exactamente lo que hace el velocímetro de un coche: no mide la velocidad media de todo el viaje, sino la TVM calculada en un intervalo de tiempo diminuto. Por eso f'(a) se llama <b>razón de cambio instantánea</b> de f en a, y se mide con las mismas unidades que la TVM (por ejemplo, m/s).</p>" +
    "<h5>¿Siempre existe la derivada?</h5>" +
    "<p>No. Para que exista f'(a), la pendiente de las secantes tiene que acercarse al <em>mismo</em> valor tanto si B se acerca a A por la derecha (h &gt; 0) como por la izquierda (h &lt; 0). Esos dos límites se llaman <b>derivadas laterales</b>. El ejemplo clásico es f(x) = |x| en x = 0: por la derecha la pendiente es 1 y por la izquierda −1, así que hay un «pico» y no hay tangente. Dos ideas que conviene tener claras:</p>" +
    "<ul><li><b>Derivable ⇒ continua</b>: si hay tangente, no puede haber un salto.</li><li><b>Continua no implica derivable</b>: |x| es continua en 0 y no es derivable.</li></ul>";

  secciones[2] =
    w("tangente") +
    "<p>Fíjate en lo que has visto: el <b>signo</b> de la pendiente te dice si la función sube o baja en ese punto, y su <b>valor</b> te dice lo deprisa que lo hace. Una pendiente grande (positiva o negativa) es una gráfica muy empinada; una pendiente cercana a 0, una gráfica casi plana.</p>" +
    "<h5>La recta normal</h5>" +
    "<p>La <b>recta normal</b> a la gráfica en x = a es la perpendicular a la tangente por el mismo punto. Dos rectas perpendiculares tienen pendientes que cumplen m₁·m₂ = −1 (Tema 8), así que si la tangente tiene pendiente f'(a), la normal tiene pendiente −1/f'(a):</p>" +
    formula("y − f(a) = " + fr("−1", "f'(a)") + " · (x − a)") +
    ejemplo("Ejemplo resuelto", "Halla la tangente y la normal a f(x) = x² en el punto de abscisa x = 1.", [
      "f(1) = 1, así que el punto es (1, 1). Además f'(x) = 2x, luego f'(1) = 2",
      "Tangente: y − 1 = 2(x − 1) → <b>y = 2x − 1</b>",
      "Normal: pendiente −1/2. y − 1 = −½(x − 1) → <b>y = −½x + 3/2</b>"
    ]) +
    "<p>Si f'(a) = 0 la tangente es horizontal (y = f(a)) y la normal es la recta vertical x = a, que no tiene pendiente.</p>";

  secciones[3] =
    "<h5>Truco: la última operación manda</h5>" +
    "<p>Para decidir qué regla usar, imagina que calculas f(x) con la calculadora y mira cuál es la <b>última</b> operación que haces:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>x³ + sen x</td><td>Suma</td><td>Derivas cada sumando por separado</td></tr>" +
    "<tr><td>5x²</td><td>Número · función</td><td>El número sale fuera: 5·(x²)'</td></tr>" +
    "<tr><td>x²·eˣ</td><td>Producto</td><td>f'g + fg'</td></tr>" +
    "<tr><td>(x+1)/(x−2)</td><td>Cociente</td><td>(f'g − fg')/g²</td></tr>" +
    "<tr><td>sen(3x)</td><td>Función dentro de otra</td><td>Regla de la cadena (siguiente apartado)</td></tr>" +
    "</tbody></table>" +
    ejemplo("Regla del producto", "Deriva f(x) = (x² + 1)(3x − 2).", [
      "Última operación: producto de u = x² + 1 y v = 3x − 2. Sus derivadas: u' = 2x, v' = 3",
      "f'(x) = u'v + uv' = 2x(3x − 2) + (x² + 1)·3",
      "= 6x² − 4x + 3x² + 3 = <b>9x² − 4x + 3</b>",
      "Comprobación: multiplicando antes, f(x) = 3x³ − 2x² + 3x − 2, y derivando sale 9x² − 4x + 3 ✓"
    ]) +
    ejemplo("Regla del cociente", "Deriva f(x) = " + fr("x² + 1", "x − 1") + ".", [
      "u = x² + 1 → u' = 2x   ·   v = x − 1 → v' = 1",
      "f'(x) = " + fr("u'v − uv'", "v²") + " = " + fr("2x(x − 1) − (x² + 1)·1", "(x − 1)²"),
      "Numerador: 2x² − 2x − x² − 1 = x² − 2x − 1",
      "<b>f'(x) = " + fr("x² − 2x − 1", "(x − 1)²") + "</b>"
    ]) +
    ejemplo("Raíces y fracciones: reescribe como potencia", "Deriva f(x) = " + fr("5", "x³") + " + 4√x.", [
      "Reescribe: f(x) = 5x⁻³ + 4x<sup>1/2</sup>",
      "Deriva: 5·(−3)x⁻⁴ + 4·½·x<sup>−1/2</sup> = −15x⁻⁴ + 2x<sup>−1/2</sup>",
      "Vuelve a la forma de partida: <b>f'(x) = " + fr("−15", "x⁴") + " + " + fr("2", "√x") + "</b>"
    ]) +
    ojo("antes de usar la regla del cociente, ¿se puede simplificar? Por ejemplo f(x) = (x⁴ − 3x²)/x² = x² − 3 (para x ≠ 0), y su derivada es simplemente 2x. Es más rápido y se falla menos.");

  secciones[4] =
    "<h5>Todas las derivadas, ya con la cadena incluida</h5>" +
    "<p>Si en vez de x tienes una función u(x), la derivada es la de siempre <b>multiplicada por u'</b>. Esta es la tabla que usarás en los exámenes:</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>(uⁿ)'</td><td>n·uⁿ⁻¹·u'</td></tr>" +
    "<tr><td>(eᵘ)'</td><td>eᵘ·u'</td></tr>" +
    "<tr><td>(ln u)'</td><td>" + fr("u'", "u") + "</td></tr>" +
    "<tr><td>(sen u)'</td><td>cos u · u'</td></tr>" +
    "<tr><td>(cos u)'</td><td>−sen u · u'</td></tr>" +
    "<tr><td>(tg u)'</td><td>" + fr("u'", "cos² u") + " = (1 + tg² u)·u'</td></tr>" +
    "<tr><td>(√u)'</td><td>" + fr("u'", "2√u") + "</td></tr>" +
    "<tr><td>(aᵘ)'</td><td>aᵘ·ln a·u'</td></tr>" +
    "</tbody></table>" +
    "<h5>Derivar «de fuera hacia dentro»</h5>" +
    "<p>Imagina la función como una cebolla, con capas una dentro de otra. Derivas la capa exterior dejando lo de dentro tal cual, y multiplicas por la derivada de la capa siguiente, hasta llegar a x.</p>" +
    ejemplo("Ejemplo 1: sen de algo", "Deriva f(x) = sen(3x²).", [
      "Capa de fuera: sen( ) → cos( ), dejando 3x² dentro: cos(3x²)",
      "Capa de dentro: 3x² → 6x",
      "<b>f'(x) = 6x·cos(3x²)</b>"
    ]) +
    ejemplo("Ejemplo 2: exponencial", "Deriva f(x) = e<sup>x² − x</sup>.", [
      "Fuera: e<sup>u</sup> → e<sup>u</sup>, igual que antes: e<sup>x² − x</sup>",
      "Dentro: u = x² − x → u' = 2x − 1",
      "<b>f'(x) = (2x − 1)·e<sup>x² − x</sup></b>"
    ]) +
    ejemplo("Ejemplo 3: logaritmo y raíz", "Deriva f(x) = ln(x² + 1) y g(x) = " + raiz("3x + 1") + ".", [
      "(ln u)' = u'/u con u = x² + 1 → <b>f'(x) = " + fr("2x", "x² + 1") + "</b>",
      "(√u)' = u'/(2√u) con u = 3x + 1 → <b>g'(x) = " + fr("3", "2" + raiz("3x + 1")) + "</b>"
    ]) +
    ejemplo("Ejemplo 4: cadena dentro de un producto", "Deriva f(x) = x·e⁻ˣ.", [
      "Última operación: producto de u = x y v = e⁻ˣ. Ya sabemos u' = 1",
      "v' = e⁻ˣ·(−1) = −e⁻ˣ (cadena: dentro es −x, cuya derivada es −1)",
      "f'(x) = u'v + uv' = 1·e⁻ˣ + x·(−e⁻ˣ) = <b>(1 − x)·e⁻ˣ</b>"
    ]) +
    w("derivador");

  secciones[5] =
    ejemplo("Tangente en un punto", "Halla la recta tangente a f(x) = x³ − 2x en x = 1.", [
      "f(1) = 1 − 2 = −1 → punto de tangencia (1, −1)",
      "f'(x) = 3x² − 2 → f'(1) = 3 − 2 = 1 → pendiente m = 1",
      "y − (−1) = 1·(x − 1) → y + 1 = x − 1 → <b>y = x − 2</b>"
    ]) +
    ejemplo("Tangente con una condición", "¿En qué punto de f(x) = x² − 4x la tangente es paralela a la recta y = 2x + 1? Escribe esa tangente.", [
      "Rectas paralelas tienen la misma pendiente: buscamos los x con f'(x) = 2",
      "f'(x) = 2x − 4 = 2 → x = 3",
      "f(3) = 9 − 12 = −3 → punto de tangencia (3, −3)",
      "y + 3 = 2(x − 3) → <b>y = 2x − 9</b>"
    ]) +
    ojo("la tangente se escribe con el <em>punto</em> (a, f(a)) y la <em>pendiente</em> f'(a). Dos errores muy habituales: usar f(a) como pendiente, y usar a (en lugar de f(a)) como coordenada y del punto.");

  secciones[6] =
    "<h5>El método en 5 pasos</h5>" +
    "<ol><li>Halla el <b>dominio</b> de f.</li><li>Calcula <b>f'(x)</b>.</li><li>Resuelve <b>f'(x) = 0</b> (y mira dónde f' no existe): son los <b>puntos críticos</b>.</li><li><b>Tabla de signos</b>: elige un valor de prueba en cada intervalo entre puntos críticos y mira el signo de f'.</li><li><b>Conclusión</b>: crece donde f' &gt; 0 y decrece donde f' &lt; 0. Hay máximo si f' pasa de + a −, y mínimo si pasa de − a +. Calcula también la coordenada y.</li></ol>" +
    ejemplo("Ejemplo completo", "Estudia el crecimiento y los extremos de f(x) = x³ − 3x.", [
      "Dominio: todo ℝ (es un polinomio).",
      "f'(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1)",
      "f'(x) = 0 → x = −1 y x = 1 (puntos críticos)",
      "Valores de prueba: f'(−2) = 9 &gt; 0 · f'(0) = −3 &lt; 0 · f'(2) = 9 &gt; 0",
      "Creciente en (−∞, −1) ∪ (1, +∞) y decreciente en (−1, 1)",
      "En x = −1 pasa de + a −: <b>máximo</b> en (−1, 2), porque f(−1) = −1 + 3 = 2. En x = 1 pasa de − a +: <b>mínimo</b> en (1, −2)."
    ]) +
    ojo("f'(a) = 0 <em>no</em> garantiza un extremo. Mira f(x) = x³: f'(x) = 3x² vale 0 en x = 0, pero es positiva a los dos lados, así que f sigue creciendo y no hay ni máximo ni mínimo. Por eso hay que mirar siempre el <b>cambio de signo</b> (compruébalo abajo con x³).") +
    w("fprima");

  // ============================================================
  // SECCIONES NUEVAS al final del tema
  // ============================================================
  var nuevas = [
    {
      h: "8. Problemas de optimización: máximos y mínimos con sentido",
      html:
        "<p>Es el problema más «de examen» de todo el tema: te dan una situación (una caja, una valla, un coste) y te piden <em>la mejor</em> opción. Se resuelve con lo que ya sabes; solo hay que ordenar los pasos:</p>" +
        "<ol><li><b>Dibuja y nombra</b> las incógnitas (x, y…).</li><li>Escribe la <b>función objetivo</b>: lo que quieres hacer máximo o mínimo (área, volumen, coste).</li><li>Usa la <b>condición</b> del enunciado (un perímetro fijo, un volumen dado) para dejar la función en <b>una sola variable</b>.</li><li>Deriva, iguala a 0 y <b>comprueba</b> que es máximo o mínimo (signo de f') y que está dentro del dominio.</li><li><b>Responde</b> a lo que preguntan, con unidades.</li></ol>" +
        ejemplo("Ejemplo 1: máximo", "Con 40 m de valla quieres cercar un campo rectangular de área máxima. ¿Qué dimensiones debe tener?", [
          "Incógnitas: base x y altura y. Perímetro: 2x + 2y = 40 → y = 20 − x",
          "Función objetivo: A = x·y = x(20 − x) = 20x − x², con 0 &lt; x &lt; 20",
          "A'(x) = 20 − 2x = 0 → x = 10",
          "Signo: A' &gt; 0 si x &lt; 10 y A' &lt; 0 si x &gt; 10 → pasa de + a −: <b>máximo</b>",
          "x = 10 → y = 10. <b>Es un cuadrado de 10 × 10 m, con área 100 m².</b>"
        ]) +
        ejemplo("Ejemplo 2: mínimo", "Halla dos números positivos cuyo producto sea 36 y cuya suma sea la menor posible.", [
          "Números x e y, con x·y = 36 → y = 36/x",
          "Función objetivo: S(x) = x + " + fr("36", "x") + ", con x &gt; 0",
          "S'(x) = 1 − " + fr("36", "x²") + " = 0 → x² = 36 → x = 6 (la solución x = −6 no vale: pedimos positivos)",
          "Signo: S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → pasa de − a +: <b>mínimo</b>",
          "x = 6 → y = 6. <b>Los números son 6 y 6, con suma mínima 12.</b>"
        ]) +
        "<p>Ahora experimenta tú. Mueve x a ojo para buscar el óptimo y después compruébalo con la derivada:</p>" +
        w("optimizar") +
        ojo("tres fallos típicos: (1) dar la x cuando preguntan por el área o el volumen máximo; (2) no comprobar si el punto crítico es máximo o mínimo; (3) dar una solución que se sale del dominio (una longitud negativa, por ejemplo)."),
    },
    {
      h: "9. ¿Qué falla aquí? Los errores que más puntos cuestan",
      html:
        "<p>Casi todos los fallos en derivadas son siempre los mismos. Leerlos una vez no basta: hay que <b>detectarlos</b> en un ejercicio ya hecho. Cada pregunta muestra un razonamiento con un error; elige cuál es.</p>" +
        w("quiz", "errores")
    },
    {
      h: "10. Autocomprobación del tema",
      html:
        "<p>Ocho preguntas para saber si el tema está en su sitio, y un juego de parejas para fijar las derivadas más usadas. Si fallas alguna, la explicación te dice por qué.</p>" +
        w("quiz", "quiz1") +
        w("emparejar", "emp1")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    clase1: {
      titulo: "De la secante a la tangente",
      montar: function (host) { return B.lab.claseSecante(host); },
      pasos: [
        { h: "Dos puntos, una secante", estado: { h: 2, tang: false },
          html: "<p>Tomamos f(x) = x² y el punto <b>A = (1, 1)</b>. Elegimos otro punto B de la gráfica, a distancia <b>h = 2</b> de A en horizontal: B = (3, 9).</p><p>La recta que pasa por A y B es la <b>secante</b>. Su pendiente es la TVM:</p><p><b>(9 − 1) ÷ 2 = 4</b></p>" },
        { h: "Acercamos B", estado: { h: 1 },
          html: "<p>Ahora h = 1, así que B = (2, 4). La secante cambia: su pendiente ya no es 4.</p><p><b>(4 − 1) ÷ 1 = 3</b></p><p>Fíjate en que la secante se va «tumbando» hacia la curva.</p>" },
        { h: "Más cerca todavía", estado: { h: 0.5 },
          html: "<p>Con h = 0,5 tenemos B = (1,5; 2,25).</p><p><b>(2,25 − 1) ÷ 0,5 = 2,5</b></p><p>Cada vez que acercas B, la pendiente baja… pero cada vez baja menos.</p>" },
        { h: "Muy cerca", estado: { h: 0.1 },
          html: "<p>Para h = 0,1 la pendiente es 2,1; para h = 0,01 será 2,01. Estas son las pendientes que hemos ido obteniendo:</p><table class='lam-tabla'><thead><tr><th>h</th><th>B</th><th>TVM</th></tr></thead><tbody><tr><td>2</td><td>3</td><td>4</td></tr><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>0,5</td><td>1,5</td><td>2,5</td></tr><tr><td>0,1</td><td>1,1</td><td>2,1</td></tr><tr><td>→ 0</td><td>→ 1</td><td>→ <b>2</b></td></tr></tbody></table>" },
        { h: "El límite es la tangente", estado: { h: 0.002, tang: true },
          html: "<p>Cuando B casi se funde con A, la secante es casi idéntica a la <b>tangente</b> (línea verde discontinua). La pendiente se acerca a 2.</p><p>Eso es exactamente <b>f'(1) = 2</b>: el límite de la TVM cuando h → 0.</p>" },
        { h: "¿Por qué sale 2?", estado: { h: 0.002, tang: true },
          html: "<p>Con álgebra, para cualquier h ≠ 0:</p><p><b>TVM = ((1 + h)² − 1) ÷ h = (2h + h²) ÷ h = 2 + h</b></p><p>Y cuando h → 0, 2 + h → 2. Por eso la tabla se acercaba a 2: las pendientes eran 2 + h.</p>" },
        { h: "Pruébalo tú", estado: { h: -1, tang: true },
          html: "<p>Usa el deslizador <b>h</b> de la gráfica. Prueba valores negativos: B pasa al lado izquierdo de A y la pendiente es <b>2 + h</b> también (por ejemplo, h = −1 da 1).</p><p>Da igual por qué lado te acerques: tiende a 2. Por eso f tiene derivada en x = 1.</p>" }
      ]
    },

    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno deriva f(x) = x²·eˣ y escribe f'(x) = 2x·eˣ. ¿Qué ha hecho mal?",
          op: ["Ha derivado el producto como producto de las derivadas", "Ha olvidado que (eˣ)' = eˣ", "Debió usar la regla de la cadena", "Está bien"], ok: 0,
          porque: "El producto <b>no</b> se deriva factor a factor. Lo correcto es (x²·eˣ)' = 2x·eˣ + x²·eˣ = (2x + x²)eˣ." },
        { q: "Un alumno deriva f(x) = sen(3x) y escribe f'(x) = cos(3x). ¿Qué falta?",
          op: ["Cambiar el signo", "Multiplicar por la derivada de lo de dentro, que es 3", "Derivar también el 3x como si fuese x²", "Nada, está bien"], ok: 1,
          porque: "Regla de la cadena: derivas la función de fuera (sen → cos) <b>y multiplicas por la derivada de lo de dentro</b> (3x → 3). Resultado correcto: f'(x) = 3cos(3x)." },
        { q: "«f(x) = x³ cumple f'(0) = 0, así que tiene un mínimo en x = 0.» ¿Es correcto?",
          op: ["Sí: si f' = 0 siempre hay un mínimo", "No: f' vale 0 pero no cambia de signo en x = 0, así que no hay extremo", "No: f'(0) no vale 0", "Sí, pero es un máximo"], ok: 1,
          porque: "f'(x) = 3x² es positiva a ambos lados de 0, así que f sigue creciendo: no hay máximo ni mínimo. f' = 0 solo da un <em>candidato</em>; hay que comprobar el cambio de signo." },
        { q: "Tangente a f(x) = x² en x = 3. Un alumno escribe «y − 3 = 6(x − 3)». ¿Cuál es el fallo?",
          op: ["La pendiente debería ser 3", "Ha usado a = 3 como coordenada y, en vez de f(3) = 9", "Falta derivar otra vez", "No hay fallo"], ok: 1,
          porque: "El punto de tangencia es (3, f(3)) = (3, 9), no (3, 3). La recta correcta es y − 9 = 6(x − 3), es decir, y = 6x − 9." },
        { q: "Para f(x) = (x² + 1)/x, un alumno deriva arriba y abajo por separado y obtiene f'(x) = 2x/1 = 2x. ¿Qué ha fallado?",
          op: ["Nada: es la regla del cociente", "El cociente tiene su propia regla: (u'v − uv')/v², no se deriva numerador y denominador por separado", "Debía usar la regla del producto", "Debía integrar"], ok: 1,
          porque: "Correcto: f'(x) = (2x·x − (x² + 1)·1)/x² = (x² − 1)/x² = 1 − 1/x². (Se ve más fácil reescribiendo f(x) = x + 1/x.)" },
        { q: "«La derivada de 5x² + 7 es 10x + 7.» ¿Qué error hay?",
          op: ["La derivada de 5x² es 5x", "Las constantes se derivan a 0: (7)' = 0", "Hay que dividir entre 2", "Está bien"], ok: 1,
          porque: "Una constante no cambia nunca, así que su derivada es 0. Lo correcto es (5x² + 7)' = 10x." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La TVM de f en [1, 3] vale 4. ¿Qué significa?",
          op: ["La secante que une los puntos de abscisas 1 y 3 tiene pendiente 4", "f'(2) = 4", "f(3) − f(1) = 4", "f es creciente en todo [1, 3]"], ok: 0,
          porque: "TVM = (f(3) − f(1)) ÷ 2 = 4, así que f(3) − f(1) = 8 (no 4). Y no dice nada sobre f'(2) ni sobre si crece siempre: es una media." },
        { q: "Si f'(a) &lt; 0, la recta tangente en x = a…",
          op: ["Sube de izquierda a derecha", "Es horizontal", "Baja de izquierda a derecha: f decrece en a", "No existe"], ok: 2,
          porque: "La derivada es la pendiente de la tangente: negativa significa que la tangente (y la función, localmente) baja al avanzar hacia la derecha." },
        { q: "La derivada de f(x) = e<sup>2x</sup> es…",
          op: ["e<sup>2x</sup>", "2x·e<sup>2x−1</sup>", "2e<sup>2x</sup>", "2e<sup>x</sup>"], ok: 2,
          porque: "Cadena: (e<sup>u</sup>)' = e<sup>u</sup>·u' con u = 2x, u' = 2. Por tanto f'(x) = 2e<sup>2x</sup>." },
        { q: "La recta tangente a f(x) = x² en x = 2 es…",
          op: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = 2x − 4"], ok: 1,
          porque: "f(2) = 4 y f'(2) = 4. Entonces y − 4 = 4(x − 2) → y = 4x − 4." },
        { q: "Si f' pasa de negativa a positiva en x = a, entonces en a hay…",
          op: ["un máximo relativo", "un mínimo relativo", "un punto sin derivada", "ningún extremo siempre"], ok: 1,
          porque: "Antes f decrece (f' &lt; 0) y después crece (f' &gt; 0): baja, toca fondo y sube. Eso es un mínimo relativo." },
        { q: "¿Cuál es la derivada de f(x) = ln(5x)?",
          op: ["1/(5x)", "1/x", "5/x", "ln 5"], ok: 1,
          porque: "(ln u)' = u'/u = 5/(5x) = 1/x. (También: ln(5x) = ln 5 + ln x, y ln 5 es una constante.)" },
        { q: "En un problema de optimización, después de escribir la función objetivo, ¿qué haces antes de derivar?",
          op: ["Nada: se deriva directamente", "Usar la condición del enunciado para dejarla en una sola variable", "Calcular el límite en infinito", "Dibujar la tangente"], ok: 1,
          porque: "La función objetivo suele tener dos variables (x, y). La condición del enunciado (perímetro fijo, volumen dado…) permite despejar una en función de la otra." },
        { q: "La derivada de f(x) = x/(x + 1) es…",
          op: ["1/(x + 1)²", "1/(x + 1)", "x/(x + 1)²", "1"], ok: 0,
          porque: "Cociente: ((x + 1)·1 − x·1)/(x + 1)² = 1/(x + 1)²." }
      ]
    },

    emp1: {
      titulo: "Función ↔ derivada",
      consigna: "Toca una función de la izquierda y su derivada de la derecha.",
      pares: [
        ["x³", "3x²"],
        ["e<sup>2x</sup>", "2e<sup>2x</sup>"],
        ["ln(x² + 1)", "2x ÷ (x² + 1)"],
        ["sen(x²)", "2x·cos(x²)"],
        ["x/(x + 1)", "1 ÷ (x + 1)²"],
        ["√x", "1 ÷ (2√x)"]
      ]
    }
  };

  // ============================================================
  // EJERCICIOS NUEVOS: por niveles y con comprobación automática
  // nivel 1 ★ básico · 2 ★★ medio · 3 ★★★ nivel PAU
  // ============================================================
  var ejercicios = [
    // ---------- ★ ----------
    { id: "d1", nivel: 1,
      enunciado: "Calcula la tasa de variación media de f(x) = x² − 2x + 3 en el intervalo [1, 4].",
      check: { tipo: "num", etiqueta: "TVM =", valor: 3 },
      pistas: ["Calcula primero f(1) y f(4).", "TVM = (f(4) − f(1)) ÷ (4 − 1)."],
      pasos: ["f(1) = 1 − 2 + 3 = 2", "f(4) = 16 − 8 + 3 = 11", "TVM[1,4] = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3"],
      resultado: "TVM[1,4] = 3" },
    { id: "d2", nivel: 1,
      enunciado: "Deriva f(x) = 5x³ − 4x² + 7x − 9.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "15x^2-8x+7" },
      pistas: ["Deriva cada sumando con (xⁿ)' = n·xⁿ⁻¹.", "La constante −9 desaparece."],
      pasos: ["5x³ → 3·5x² = 15x²", "−4x² → 2·(−4)x = −8x", "7x → 7", "−9 → 0"],
      resultado: "f'(x) = 15x² − 8x + 7" },
    { id: "d3", nivel: 1,
      enunciado: "Deriva f(x) = 4√x.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2/sqrt(x)", dom: [0.3, 5], ph: "puedes escribir sqrt(x) o √x" },
      pistas: ["Escribe √x como x elevado a 1/2.", "(x<sup>1/2</sup>)' = ½·x<sup>−1/2</sup>."],
      pasos: ["f(x) = 4x<sup>1/2</sup>", "f'(x) = 4·½·x<sup>−1/2</sup> = 2x<sup>−1/2</sup>", "Volvemos a la raíz: 2x<sup>−1/2</sup> = " + fr("2", "√x")],
      resultado: "f'(x) = " + fr("2", "√x") },
    { id: "d4", nivel: 1,
      enunciado: "Calcula la pendiente de la recta tangente a f(x) = x³ − x en el punto de abscisa x = 2.",
      check: { tipo: "num", etiqueta: "m =", valor: 11 },
      pistas: ["La pendiente de la tangente es f'(2).", "f'(x) = 3x² − 1."],
      pasos: ["f'(x) = 3x² − 1", "f'(2) = 3·4 − 1 = 11"],
      resultado: "m = f'(2) = 11" },
    // ---------- ★★ ----------
    { id: "d5", nivel: 2,
      enunciado: "Deriva f(x) = (2x − 1)·eˣ.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(2x+1)e^x" },
      pistas: ["Es un producto de u = 2x − 1 y v = eˣ.", "f' = u'v + uv' = 2·eˣ + (2x − 1)·eˣ."],
      pasos: ["u = 2x − 1 → u' = 2   ·   v = eˣ → v' = eˣ", "f'(x) = u'v + uv' = 2eˣ + (2x − 1)eˣ", "Sacamos eˣ factor común: eˣ(2 + 2x − 1) = (2x + 1)eˣ"],
      resultado: "f'(x) = (2x + 1)·eˣ",
      ojo: "(f·g)' no es f'·g'. Si hubieras puesto 2·eˣ, te falta el término u·v'." },
    { id: "d6", nivel: 2,
      enunciado: "Deriva f(x) = " + fr("x² + 1", "x − 3") + " y simplifica el numerador.",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "(x^2-6x-1)/(x-3)^2", dom: [-2, 2.5] },
      pistas: ["Regla del cociente: (u'v − uv') ÷ v².", "u' = 2x, v' = 1."],
      pasos: ["u = x² + 1 → u' = 2x   ·   v = x − 3 → v' = 1", "f'(x) = " + fr("2x(x − 3) − (x² + 1)·1", "(x − 3)²"), "Numerador: 2x² − 6x − x² − 1 = x² − 6x − 1"],
      resultado: "f'(x) = " + fr("x² − 6x − 1", "(x − 3)²") },
    { id: "d7", nivel: 2,
      enunciado: "Deriva f(x) = sen(x² + 1).",
      check: { tipo: "expr", etiqueta: "f'(x) =", expr: "2x cos(x^2+1)" },
      pistas: ["Función de fuera: sen. Función de dentro: x² + 1.", "(sen u)' = cos u · u'."],
      pasos: ["Fuera: sen( ) → cos( ), dejando x² + 1 dentro", "Dentro: (x² + 1)' = 2x", "Multiplicamos: cos(x² + 1)·2x"],
      resultado: "f'(x) = 2x·cos(x² + 1)" },
    { id: "d8", nivel: 2,
      enunciado: "Halla la pendiente y la ecuación de la recta tangente a f(x) = x³ − 3x² + 2 en x = 3.",
      check: [{ tipo: "num", etiqueta: "pendiente m =", valor: 9 }, { tipo: "expr", etiqueta: "tangente: y =", expr: "9x-25", ph: "9x-25" }],
      pistas: ["Necesitas el punto (3, f(3)) y la pendiente f'(3).", "f(3) = 27 − 27 + 2 = 2 y f'(x) = 3x² − 6x."],
      pasos: ["f(3) = 27 − 27 + 2 = 2 → punto de tangencia (3, 2)", "f'(x) = 3x² − 6x → f'(3) = 27 − 18 = 9", "y − 2 = 9(x − 3) → y = 9x − 27 + 2 = 9x − 25"],
      resultado: "m = 9 · tangente: y = 9x − 25" },
    { id: "d9", nivel: 2,
      enunciado: "Halla los puntos donde la gráfica de f(x) = x³ − 12x + 5 tiene tangente horizontal. Escribe los valores de x separados por comas.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "por ejemplo: 1, 3" },
      pistas: ["Tangente horizontal significa pendiente 0: f'(x) = 0.", "f'(x) = 3x² − 12."],
      pasos: ["f'(x) = 3x² − 12", "3x² − 12 = 0 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, f(−2)) = (−2, 21) y (2, f(2)) = (2, −11)"],
      resultado: "x = −2 y x = 2" },
    { id: "d10", nivel: 2,
      enunciado: "¿En qué intervalo es creciente la función f(x) = x² − 6x + 5?",
      check: { tipo: "opcion", etiqueta: "Crece en", opciones: ["(−∞, 3)", "(3, +∞)", "(−∞, −3)", "(−3, +∞)"], ok: 1 },
      pistas: ["Una función crece donde f' &gt; 0.", "f'(x) = 2x − 6 &gt; 0 ⇔ x &gt; 3."],
      pasos: ["f'(x) = 2x − 6", "2x − 6 = 0 → x = 3", "f'(0) = −6 &lt; 0 y f'(4) = 2 &gt; 0", "f decrece en (−∞, 3) y crece en (3, +∞); en x = 3 hay un mínimo, f(3) = −4"],
      resultado: "Creciente en (3, +∞)" },
    // ---------- ★★★ (nivel PAU) ----------
    { id: "d11", nivel: 3,
      enunciado: "Halla los valores de a y b para que la función f(x) = x³ + ax² + bx tenga extremos relativos en x = 1 y en x = 2.",
      check: [{ tipo: "num", etiqueta: "a =", valor: -4.5 }, { tipo: "num", etiqueta: "b =", valor: 6 }],
      pistas: ["Si hay extremo en x = 1 y en x = 2, entonces f'(1) = 0 y f'(2) = 0.", "f'(x) = 3x² + 2ax + b. Te quedan dos ecuaciones con a y b."],
      pasos: ["f'(x) = 3x² + 2ax + b", "f'(1) = 0 → 3 + 2a + b = 0", "f'(2) = 0 → 12 + 4a + b = 0", "Restamos la 1ª a la 2ª: 9 + 2a = 0 → a = −9/2 = −4,5", "Sustituimos: b = −3 − 2a = −3 + 9 = 6", "Comprobación: f'(x) = 3x² − 9x + 6 = 3(x − 1)(x − 2) ✓"],
      resultado: "a = −9/2, b = 6" },
    { id: "d12", nivel: 3,
      enunciado: "La gráfica de f(x) = x³ − 3x tiene dos puntos en los que la tangente es paralela a la recta y = 9x − 2. Halla las abscisas de esos puntos.",
      check: { tipo: "lista", etiqueta: "x =", valores: [-2, 2], ph: "dos valores separados por comas" },
      pistas: ["Rectas paralelas tienen la misma pendiente: f'(x) = 9.", "3x² − 3 = 9."],
      pasos: ["Pendiente de la recta dada: 9. Buscamos f'(x) = 9", "f'(x) = 3x² − 3 = 9 → x² = 4 → x = −2 o x = 2", "Los puntos son (−2, −2) y (2, 2) (comprobación: f(2) = 8 − 6 = 2)"],
      resultado: "x = −2 y x = 2" },
    { id: "d13", nivel: 3,
      enunciado: "Dos números positivos suman 12. ¿Cuánto vale el menor valor posible de la suma de sus cuadrados? Indica también el valor de x (uno de los números).",
      check: [{ tipo: "num", etiqueta: "x =", valor: 6 }, { tipo: "num", etiqueta: "suma mínima =", valor: 72 }],
      pistas: ["Números x y 12 − x. Función objetivo: S(x) = x² + (12 − x)².", "S'(x) = 2x − 2(12 − x) = 4x − 24."],
      pasos: ["Números x y 12 − x, con 0 &lt; x &lt; 12", "S(x) = x² + (12 − x)² = 2x² − 24x + 144", "S'(x) = 4x − 24 = 0 → x = 6", "S' &lt; 0 si x &lt; 6 y S' &gt; 0 si x &gt; 6 → mínimo", "S(6) = 36 + 36 = 72"],
      resultado: "x = 6 (los dos números son 6); suma mínima = 72" },
    { id: "d14", nivel: 3,
      enunciado: "Un granjero tiene 120 m de valla para cercar un corral rectangular junto a un río. El lado del río no necesita valla. ¿Qué dimensiones dan el corral de mayor área? ¿Cuál es esa área?",
      check: [{ tipo: "num", etiqueta: "lado perpendicular al río x =", valor: 30, unidad: "m" }, { tipo: "num", etiqueta: "lado paralelo y =", valor: 60, unidad: "m" }, { tipo: "num", etiqueta: "área =", valor: 1800, unidad: "m²" }],
      pistas: ["Hay dos lados de longitud x y uno de longitud y: 2x + y = 120.", "A(x) = x(120 − 2x) = 120x − 2x²."],
      pasos: ["Valla: 2x + y = 120 → y = 120 − 2x, con 0 &lt; x &lt; 60", "Área: A(x) = x·y = x(120 − 2x) = 120x − 2x²", "A'(x) = 120 − 4x = 0 → x = 30, y entonces y = 60", "A' pasa de + a −: es un máximo. A(30) = 30·60 = 1800"],
      resultado: "x = 30 m, y = 60 m · área máxima = 1800 m²",
      ojo: "el enunciado pide el <b>área</b>: no te quedes en x = 30. Responde a lo que preguntan, con unidades." },
    { id: "d15", nivel: 3,
      enunciado: "Para f(x) = " + fr("x", "x² + 1") + ": (a) halla los puntos críticos y (b) decide qué hay en x = 1.",
      check: [{ tipo: "lista", etiqueta: "puntos críticos x =", valores: [-1, 1], ph: "valores separados por comas" }, { tipo: "opcion", etiqueta: "en x = 1 hay un", opciones: ["mínimo relativo", "máximo relativo", "ningún extremo"], ok: 1 }],
      pistas: ["Regla del cociente: f'(x) = ((x² + 1)·1 − x·2x) ÷ (x² + 1)².", "El numerador queda 1 − x²."],
      pasos: ["f'(x) = " + fr("(x² + 1)·1 − x·2x", "(x² + 1)²") + " = " + fr("1 − x²", "(x² + 1)²"), "El denominador es siempre positivo, así que el signo lo da 1 − x²: f'(x) = 0 → x = −1 y x = 1", "Signo: f' &lt; 0 en (−∞, −1), f' &gt; 0 en (−1, 1), f' &lt; 0 en (1, +∞)", "En x = 1 pasa de + a −: <b>máximo</b>, f(1) = 1/2. En x = −1 pasa de − a +: mínimo, f(−1) = −1/2."],
      resultado: "Puntos críticos x = −1 (mínimo) y x = 1 (máximo, f(1) = ½)" },
    { id: "d16", nivel: 3,
      enunciado: "Explica por qué f(x) = x³ cumple f'(0) = 0 y, sin embargo, no tiene ningún máximo ni mínimo en x = 0. Redacta tu respuesta como lo harías en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
        { t: "Calcula la derivada f'(x) = 3x² y comprueba que f'(0) = 0", p: 0.5 },
        { t: "Estudia el signo de f' a ambos lados de 0 (es positiva en los dos)", p: 0.5 },
        { t: "Concluye que f es creciente a ambos lados, sin cambio de signo, así que no hay máximo ni mínimo", p: 0.5 },
        { t: "Aclara que f'(a) = 0 es condición necesaria pero no suficiente: solo da candidatos", p: 0.5 }
      ] },
      pasos: ["f'(x) = 3x², y f'(0) = 0: x = 0 es un punto crítico.", "Pero 3x² ≥ 0 para todo x: f' es positiva a la izquierda (x &lt; 0) y a la derecha (x &gt; 0) de 0.", "Como f' no cambia de signo en x = 0, la función es creciente a ambos lados y no hay máximo ni mínimo (es un punto de tangente horizontal sin extremo).", "Conclusión general: f'(a) = 0 es condición <em>necesaria</em> para un extremo, pero no <em>suficiente</em>; hay que comprobar el cambio de signo."],
      resultado: "f'(0) = 0 pero f' no cambia de signo → no hay extremo en x = 0." }
  ];

  // ============================================================
  // LÁMINA RESUMEN: bloques nuevos (chuletas que se pueden imprimir)
  // ============================================================
  var lamina = [
    { titulo: "¿Qué regla uso? La última operación manda", ancha: true,
      tabla: { cab: ["Última operación", "Regla", "Ejemplo"], filas: [
        ["Suma o resta", "(f ± g)' = f' ± g'", "x³ + sen x → 3x² + cos x"],
        ["Número · función", "(k·f)' = k·f'", "5x² → 10x"],
        ["Producto", "(f·g)' = f'g + fg'", "x²eˣ → (2x + x²)eˣ"],
        ["Cociente", "(f/g)' = (f'g − fg') ÷ g²", "(x + 1)/(x − 2) → −3/(x − 2)²"],
        ["Función dentro de otra", "Cadena: f'(g)·g'", "sen(3x) → 3cos(3x)"]
      ] },
      nota: "Truco: si se puede simplificar o reescribir como potencia, hazlo antes de derivar." },
    { titulo: "Derivadas con la cadena (u = u(x))", ancha: true,
      tabla: { cab: ["Función", "Derivada"], filas: [
        ["uⁿ", "n·uⁿ⁻¹·u'"], ["eᵘ", "eᵘ·u'"], ["ln u", "u' ÷ u"], ["sen u", "cos u·u'"], ["cos u", "−sen u·u'"],
        ["tg u", "u' ÷ cos²u"], ["√u", "u' ÷ (2√u)"], ["aᵘ", "aᵘ·ln a·u'"]
      ] },
      nota: "Siempre: «la de fuera sin tocar lo de dentro, por la derivada de lo de dentro»." },
    { titulo: "Tangente y normal",
      items: [
        { label: "Tangente en x = a", formula: "y − f(a) = f'(a)·(x − a)", cuando: "«Halla la recta tangente en x = a»", ejemplo: "f = x², a = 1 → y − 1 = 2(x − 1)", ojo: "La pendiente es f'(a), no f(a)." },
        { label: "Normal en x = a", formula: "y − f(a) = " + fr("−1", "f'(a)") + "·(x − a)", cuando: "Perpendicular a la tangente", ojo: "Si f'(a) = 0 la normal es vertical: x = a." },
        { label: "Tangente con una condición", formula: "f'(x) = m", cuando: "Paralela a y = mx + n (misma pendiente)", ejemplo: "Perpendicular a esa recta: f'(x) = −1/m." }
      ] },
    { titulo: "Monotonía y extremos en 5 pasos",
      pasos: ["Dominio de f.", "Calcula f'(x).", "Resuelve f'(x) = 0 (puntos críticos).", "Tabla de signos de f' con un valor de prueba por intervalo.", "f' &gt; 0: crece · f' &lt; 0: decrece · de + a −: <b>máximo</b> · de − a +: <b>mínimo</b>. Da también la coordenada y."],
      nota: "f'(a) = 0 no basta: x³ tiene f'(0) = 0 y no tiene extremo." },
    { titulo: "Optimización en 5 pasos",
      pasos: ["Dibuja y nombra las incógnitas.", "Escribe la función objetivo (lo que se maximiza o minimiza).", "Usa la condición del enunciado para dejarla en una sola variable.", "Deriva, iguala a 0, comprueba máximo o mínimo y el dominio.", "Responde a lo que pregunten, con unidades."],
      nota: "Clásicos: rectángulo de perímetro fijo → cuadrado; caja de volumen fijo → mínimo material." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "(x²·eˣ)' = 2x·eˣ", bien: "(x²·eˣ)' = 2x·eˣ + x²·eˣ", por: "El producto no se deriva factor a factor." },
        { mal: "(sen 3x)' = cos 3x", bien: "(sen 3x)' = 3·cos 3x", por: "Falta multiplicar por la derivada de lo de dentro." },
        { mal: "(5x² + 7)' = 10x + 7", bien: "(5x² + 7)' = 10x", por: "La derivada de una constante es 0." },
        { mal: "f'(0) = 0 ⇒ hay un extremo en 0", bien: "Solo si f' cambia de signo", por: "Contraejemplo: f(x) = x³." },
        { mal: "Tangente a x² en 3: y − 3 = 6(x − 3)", bien: "y − 9 = 6(x − 3)", por: "El punto es (3, f(3)), no (3, 3)." }
      ] }
  ];

  var resumen = [
    "f'(a) es la <b>pendiente de la tangente</b> en a: el límite de la TVM cuando h → 0.",
    "Qué regla usar: mira la <b>última operación</b> (suma, producto, cociente o cadena).",
    "Tangente en a: <b>y − f(a) = f'(a)·(x − a)</b>.",
    "f' &gt; 0 crece · f' &lt; 0 decrece · extremo si f' <b>cambia de signo</b>.",
    "Optimización: función objetivo en una variable → derivar → comprobar."
  ];

  B.registrar("mates1", "t11", { resumen: resumen, secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

  // ============================================================
  // SIMULACRO NUEVO: monográfico de derivadas (5 bloques × 2 puntos)
  // ============================================================
  B.registrarSimulacros("mates1", [{
    id: "sim8", titulo: "Simulacro 8 · Derivadas", tipo: "ciencias",
    bloques: [
      { titulo: "Derivada por la definición", puntos: 2,
        enunciado: "Calcula, usando la definición de derivada, f'(2) para f(x) = 3x² − x.",
        solucion: "f'(2) = lim<sub>h→0</sub> [f(2 + h) − f(2)]/h. f(2) = 12 − 2 = 10. f(2 + h) = 3(2 + h)² − (2 + h) = 12 + 12h + 3h² − 2 − h = 10 + 11h + 3h². Entonces f(2 + h) − f(2) = 11h + 3h², y dividiendo entre h: 11 + 3h. Cuando h → 0, el límite es 11. Por tanto f'(2) = 11 (coincide con la regla: f'(x) = 6x − 1, f'(2) = 11)." },
      { titulo: "Reglas de derivación", puntos: 2,
        enunciado: "Deriva: a) f(x) = (3x² − 1)·eˣ  b) g(x) = ln(x² + 1)  c) h(x) = (x² + 1)/(x + 2).",
        solucion: "a) Producto: f'(x) = 6x·eˣ + (3x² − 1)eˣ = (3x² + 6x − 1)eˣ. b) Cadena: g'(x) = 2x/(x² + 1). c) Cociente: h'(x) = [2x(x + 2) − (x² + 1)·1]/(x + 2)² = (2x² + 4x − x² − 1)/(x + 2)² = (x² + 4x − 1)/(x + 2)²." },
      { titulo: "Tangente y normal", puntos: 2,
        enunciado: "Halla la ecuación de la recta tangente y la de la recta normal a f(x) = x² − 3x + 1 en el punto de abscisa x = 1.",
        solucion: "f(1) = 1 − 3 + 1 = −1, así que el punto es (1, −1). f'(x) = 2x − 3, luego f'(1) = −1. Tangente: y + 1 = −1·(x − 1) → y = −x. Normal: pendiente 1/1 = 1 (opuesta de la inversa de −1): y + 1 = 1·(x − 1) → y = x − 2." },
      { titulo: "Monotonía y extremos", puntos: 2,
        enunciado: "Estudia el crecimiento y decrecimiento de f(x) = x³ − 6x² + 9x + 1 y calcula sus máximos y mínimos relativos.",
        solucion: "f'(x) = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3). Puntos críticos: x = 1 y x = 3. Signo de f': positivo en (−∞, 1), negativo en (1, 3), positivo en (3, +∞). Por tanto f crece en (−∞, 1) ∪ (3, +∞) y decrece en (1, 3). En x = 1 hay un máximo relativo, f(1) = 1 − 6 + 9 + 1 = 5, es decir (1, 5). En x = 3 hay un mínimo relativo, f(3) = 27 − 54 + 27 + 1 = 1, es decir (3, 1)." },
      { titulo: "Optimización", puntos: 2,
        enunciado: "Se quiere construir una caja sin tapa, de base cuadrada y volumen 32 m³. Halla las dimensiones que minimizan la cantidad de material (superficie).",
        solucion: "Sea x el lado de la base y h la altura. Volumen: x²h = 32 → h = 32/x². Superficie (base + 4 caras laterales): S(x) = x² + 4xh = x² + 128/x, con x > 0. S'(x) = 2x − 128/x² = 0 → x³ = 64 → x = 4. S' < 0 si x < 4 y S' > 0 si x > 4: mínimo. Entonces h = 32/16 = 2. La caja de menor superficie tiene base 4 × 4 m y altura 2 m, con S = 16 + 32 = 48 m²." }
    ]
  }]);

})(window);

/* ============================================================
   Química II · ampliaciones
   Tema 6: Equilibrio químico
   Lo original de pagina.html no se toca: esto se añade al final de cada
   sección, como secciones nuevas, ejercicios nuevos y bloques de lámina.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo, tabla = H.tabla;
  function w(nombre, ref) { return H.w(nombre, ref && "quimica2/t6/" + ref); }

  // ============================================================
  // TEORÍA (se añade al final de cada sección existente)
  // ============================================================
  var secciones = {};

  secciones[0] =
    "<h5>Cómo se ve un equilibrio</h5>" +
    "<p>Mira la gráfica: partimos de 1 mol de H₂ y 1 mol de I₂ (solo reactivos). Al principio la reacción directa es rápida, porque hay mucho reactivo, y la inversa casi no existe, porque aún no hay HI. A medida que se forma HI, la directa se ralentiza y la inversa se acelera… hasta que <b>las dos velocidades se igualan</b>. Desde ese momento, las concentraciones se quedan quietas.</p>" +
    w("eqtiempo") +
    "<p>Tres ideas que conviene grabarse:</p>" +
    "<ul><li>Es un equilibrio <b>dinámico</b>: las moléculas siguen reaccionando en ambos sentidos, pero a la misma velocidad, así que no se nota nada por fuera.</li>" +
    "<li>Se llega al <b>mismo equilibrio</b> partiendo de reactivos o de productos (a la misma temperatura): compruébalo con los dos botones.</li>" +
    "<li>En el equilibrio las concentraciones son <b>constantes</b>, no <em>iguales</em>. Es un error muy común pensar que [reactivos] = [productos].</li></ul>" +
    ejemplo("Un equilibrio que se ve", "El tetraóxido de dinitrógeno (N₂O₄, incoloro) y el dióxido de nitrógeno (NO₂, pardo) se interconvierten: N₂O₄ ⇌ 2 NO₂. ¿Cómo puedes «ver» el equilibrio?", [
      "Un tubo cerrado con la mezcla tiene un color pardo <b>constante</b> mientras no lo perturbes: la proporción de NO₂ no cambia, aunque las moléculas sigan reaccionando.",
      "Si lo calientas el color se oscurece (se forma más NO₂); si lo enfrías se aclara (se forma más N₂O₄).",
      "Es la prueba visual de que el equilibrio <b>se desplaza</b> cuando cambian las condiciones. Más abajo lo simulas tú."
    ]);

  secciones[1] =
    "<h5>Cómo escribir K<sub>c</sub> sin fallar</h5>" +
    "<p>Siempre igual: <b>productos arriba, reactivos abajo</b>, cada concentración elevada a su <b>coeficiente estequiométrico</b>. Solo cuentan las sustancias que están en disolución o en fase gas (más abajo verás por qué los sólidos no aparecen).</p>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>N₂ + 3 H₂ ⇌ 2 NH₃</td><td>K<sub>c</sub> = " + fr("[NH₃]²", "[N₂]·[H₂]³") + "</td></tr>" +
    "<tr><td>H₂ + I₂ ⇌ 2 HI</td><td>K<sub>c</sub> = " + fr("[HI]²", "[H₂]·[I₂]") + "</td></tr>" +
    "<tr><td>2 SO₂ + O₂ ⇌ 2 SO₃</td><td>K<sub>c</sub> = " + fr("[SO₃]²", "[SO₂]²·[O₂]") + "</td></tr>" +
    "</tbody></table>" +
    "<h5>Qué te dice el valor de K</h5>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>K ≫ 1</td><td>En el equilibrio hay sobre todo <b>productos</b>: la reacción está muy desplazada a la derecha.</td></tr>" +
    "<tr><td>K ≈ 1</td><td>Hay cantidades comparables de reactivos y productos.</td></tr>" +
    "<tr><td>K ≪ 1</td><td>En el equilibrio hay sobre todo <b>reactivos</b>: casi no se forma producto.</td></tr>" +
    "</tbody></table>" +
    "<p>Pero cuidado: K habla de <em>cuánto</em> producto hay al final, no de <em>lo rápido</em> que se llega. Una reacción con K enorme puede ser lentísima.</p>" +
    ejemplo("Ejemplo resuelto: calcular K<sub>c</sub>", "En el equilibrio 2 SO₂ + O₂ ⇌ 2 SO₃ las concentraciones son [SO₂] = 0,20 M, [O₂] = 0,10 M y [SO₃] = 0,40 M. Calcula K<sub>c</sub>.", [
      "Escribimos la expresión: K<sub>c</sub> = " + fr("[SO₃]²", "[SO₂]²·[O₂]"),
      "Sustituimos: K<sub>c</sub> = " + fr("0,40²", "0,20²·0,10") + " = " + fr("0,16", "0,04·0,10") + " = " + fr("0,16", "0,004"),
      "<b>K<sub>c</sub> = 40</b> (mol/L)⁻¹. Es mayor que 1: hay más producto que reactivo."
    ]) +
    "<h5>De K<sub>c</sub> a K<sub>p</sub></h5>" +
    "<p>Para gases, la presión parcial de cada uno es pᵢ = cᵢ·R·T. Al sustituir en K<sub>p</sub> sale la relación que ya conoces, K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup>, donde Δn es la suma de coeficientes de los <b>gases</b> productos menos la de los gases reactivos. Con R = 0,082 atm·L/(mol·K) y T en kelvin:</p>" +
    ejemplo("Ejemplo resuelto: K<sub>p</sub>", "Para N₂O₄ ⇌ 2 NO₂ a 298 K, K<sub>c</sub> = 4,6·10⁻³. Calcula K<sub>p</sub>.", [
      "Δn = 2 − 1 = +1",
      "RT = 0,082 · 298 = 24,4 atm·L/mol",
      "K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup> = 4,6·10⁻³ · 24,4 ≈ <b>0,112</b>",
      "Si Δn fuera 0, K<sub>p</sub> = K<sub>c</sub> (como en H₂ + I₂ ⇌ 2 HI): las unidades de presión y de concentración se cancelan."
    ]) +
    ojo("T siempre en kelvin (K = °C + 273) y R con las unidades que correspondan. Y no escribas K<sub>p</sub> = K<sub>c</sub> por inercia: solo es verdad si Δn = 0.");

  secciones[2] =
    ejemplo("Ejemplo resuelto: ¿hacia dónde va?", "A cierta temperatura, K<sub>c</sub> = 54 para H₂ + I₂ ⇌ 2 HI. En un instante las concentraciones son [H₂] = 0,50 M, [I₂] = 0,50 M y [HI] = 2,0 M. ¿Está en equilibrio? Si no, ¿hacia dónde evoluciona?", [
      "Calculamos Q con la misma fórmula que K<sub>c</sub>: Q = " + fr("[HI]²", "[H₂]·[I₂]") + " = " + fr("2,0²", "0,50·0,50") + " = " + fr("4", "0,25") + " = <b>16</b>",
      "Comparamos: Q = 16 &lt; K<sub>c</sub> = 54",
      "Q es menor que K: faltan productos para llegar al equilibrio → el sistema evoluciona <b>hacia la derecha</b> (se forma más HI)."
    ]) +
    "<p>La idea de fondo: <b>K es la «meta»</b> y Q es dónde estás ahora. Si estás por debajo, avanzas hacia los productos; si te has pasado, retrocedes. Esta idea te va a explicar todo Le Chatelier en el apartado siguiente.</p>";

  secciones[3] =
    "<h5>Le Chatelier sin memorizar: usa Q y K</h5>" +
    "<p>No hace falta aprenderse una lista de efectos: casi todo sale de comparar Q con K justo después de perturbar.</p>" +
    "<ul><li><b>Cambias una concentración</b> (añades o quitas algo): K no cambia, pero Q sí. Si añades reactivo, Q baja por debajo de K → derecha.</li>" +
    "<li><b>Cambias el volumen o la presión</b>: cambian las concentraciones de todos los gases, y Q cambia salvo que Δn = 0.</li>" +
    "<li><b>Cambias la temperatura</b>: aquí cambia <b>K</b> (¡es lo único que la modifica!), y Q se queda como estaba.</li></ul>" +
    "<table class='lamina-table'><tbody>" +
    "<tr><td>Añadir reactivo o retirar producto</td><td>Q &lt; K → <b>derecha</b></td></tr>" +
    "<tr><td>Añadir producto o retirar reactivo</td><td>Q &gt; K → <b>izquierda</b></td></tr>" +
    "<tr><td>Comprimir (↑ presión)</td><td>Hacia el lado con <b>menos moles de gas</b> (si Δn = 0, no se desplaza)</td></tr>" +
    "<tr><td>Expandir (↓ presión)</td><td>Hacia el lado con <b>más moles de gas</b></td></tr>" +
    "<tr><td>Subir T, reacción exotérmica</td><td>K baja → <b>izquierda</b></td></tr>" +
    "<tr><td>Subir T, reacción endotérmica</td><td>K sube → <b>derecha</b></td></tr>" +
    "<tr><td>Añadir un catalizador</td><td>No cambia K ni Q: <b>no desplaza</b>, solo llega antes al equilibrio</td></tr>" +
    "<tr><td>Añadir un gas inerte (V y T constantes)</td><td>Las concentraciones no cambian: <b>no desplaza</b></td></tr>" +
    "</tbody></table>" +
    "<p>Ahora experimenta tú. Prueba a perturbar cada reacción y, <b>antes de mirar</b>, predice hacia dónde irá. Fíjate también en lo que marca el indicador Q/K<sub>c</sub>: es la explicación de todo.</p>" +
    w("equilibrio") +
    ojo("el catalizador acelera la reacción directa y la inversa por igual. Cambia <em>cuándo</em> se llega al equilibrio, no <em>cómo es</em> el equilibrio. Si en un problema aparece un catalizador, ¡no desplaza nada!");

  // ============================================================
  // SECCIONES NUEVAS
  // ============================================================
  var nuevas = [
    {
      h: "5. Equilibrios heterogéneos y operaciones con K",
      html:
        "<h5>Los sólidos y líquidos puros no figuran en K</h5>" +
        "<p>En un equilibrio <b>heterogéneo</b> hay sustancias en distintas fases. Un sólido o un líquido puro tiene una concentración constante (depende de su densidad, no de cuánto haya), así que se «absorbe» en el valor de K y <b>no se escribe</b>.</p>" +
        ejemplo("Dos equilibrios heterogéneos", "Escribe K<sub>c</sub> y K<sub>p</sub> para CaCO₃(s) ⇌ CaO(s) + CO₂(g), y K<sub>c</sub> para C(s) + CO₂(g) ⇌ 2 CO(g).", [
          "CaCO₃ y CaO son sólidos: no aparecen. Solo queda el gas: <b>K<sub>c</sub> = [CO₂]</b> y <b>K<sub>p</sub> = p(CO₂)</b>.",
          "En el segundo, C es sólido y no aparece: <b>K<sub>c</sub> = " + fr("[CO]²", "[CO₂]") + "</b>",
          "Para K<sub>p</sub> solo cuentan los <em>gases</em>, y Δn también: en el segundo, Δn = 2 − 1 = +1."
        ]) +
        "<h5>Operar con constantes de equilibrio</h5>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Inviertes la reacción</td><td>K′ = " + fr("1", "K") + "</td></tr>" +
        "<tr><td>Multiplicas los coeficientes por n</td><td>K′ = Kⁿ</td></tr>" +
        "<tr><td>Sumas dos reacciones</td><td>K = K₁ · K₂</td></tr>" +
        "</tbody></table>" +
        ejemplo("Ejemplo resuelto", "Para N₂ + 3 H₂ ⇌ 2 NH₃, K<sub>c</sub> = 0,08. Calcula la K<sub>c</sub> de (a) 2 NH₃ ⇌ N₂ + 3 H₂ y (b) ½ N₂ + 3/2 H₂ ⇌ NH₃.", [
          "(a) Es la reacción inversa: K′ = 1/0,08 = <b>12,5</b>",
          "(b) Todos los coeficientes divididos entre 2, es decir, elevados a ½: K′ = 0,08<sup>1/2</sup> = √0,08 ≈ <b>0,283</b>"
        ]),
    },
    {
      h: "6. La tabla ICE paso a paso",
      html:
        "<p>Es la herramienta que resuelve casi todos los problemas de equilibrio de Selectividad. ICE significa <b>I</b>nicial, <b>C</b>ambio, <b>E</b>quilibrio.</p>" +
        "<ol><li>Escribe la reacción ajustada y la expresión de K.</li><li>Haz la tabla con las cantidades <b>iniciales</b>.</li><li>En la fila de <b>cambio</b> pon −a·x para los reactivos y +b·x para los productos (a y b son los coeficientes; x es lo que avanza la reacción).</li><li>La fila de <b>equilibrio</b> es inicial + cambio.</li><li>Sustituye en K (¡con concentraciones, no con moles!) y resuelve x.</li><li>Comprueba que ninguna cantidad sale negativa y que K sale bien.</li></ol>" +
        ejemplo("Ejemplo 1: calcular el equilibrio a partir de K", "En un recipiente de 1 L se introducen 1 mol de H₂ y 1 mol de I₂ a 700 K, donde K<sub>c</sub> = 54. Calcula las concentraciones en el equilibrio.", [
          "Tabla ICE (en mol/L, porque V = 1 L):" + tabla(["", "H₂", "I₂", "HI"], [["Inicial", "1", "1", "0"], ["Cambio", "−x", "−x", "+2x"], ["Equilibrio", "1 − x", "1 − x", "2x"]], "ice"),
          "K<sub>c</sub> = " + fr("(2x)²", "(1 − x)(1 − x)") + " = 54  →  " + fr("2x", "1 − x") + " = √54 = 7,35 (cuadrado perfecto: sacamos raíz)",
          "2x = 7,35 − 7,35x  →  x = " + fr("7,35", "9,35") + " = 0,786",
          "<b>[H₂] = [I₂] = 1 − 0,786 = 0,214 mol/L</b> · <b>[HI] = 2·0,786 = 1,57 mol/L</b>",
          "Comprobación: " + fr("1,57²", "0,214²") + " = " + fr("2,47", "0,0458") + " ≈ 54 ✓"
        ]) +
        ejemplo("Ejemplo 2: con grado de disociación (α)", "En un recipiente de 10 L se introduce 1,0 mol de PCl₅ y se calienta. En el equilibrio se ha disociado el 40 % (α = 0,4): PCl₅ ⇌ PCl₃ + Cl₂. Calcula K<sub>c</sub>.", [
          "El grado de disociación α es la fracción de moles iniciales que se han disociado: moles disociados = n₀·α = 1,0·0,4 = 0,4 mol.",
          "Tabla ICE en <b>moles</b>:" + tabla(["", "PCl₅", "PCl₃", "Cl₂"], [["Inicial", "1,0", "0", "0"], ["Cambio", "−0,4", "+0,4", "+0,4"], ["Equilibrio", "0,6", "0,4", "0,4"], ["[ ] = n/10 L", "0,06", "0,04", "0,04"]], "ice"),
          "K<sub>c</sub> = " + fr("[PCl₃][Cl₂]", "[PCl₅]") + " = " + fr("0,04·0,04", "0,06") + " ≈ <b>0,0267</b>",
          "Ojo: aquí Δn = +1, así que el <b>volumen sí importa</b>. Si hubieras usado moles en vez de concentraciones saldría otro valor."
        ]) +
        ejemplo("Ejemplo 3: cuando sale una ecuación de segundo grado", "En un recipiente de 1 L se introduce N₂O₄ con concentración inicial 0,10 M a 298 K, donde K<sub>c</sub> = 4,6·10⁻³ para N₂O₄ ⇌ 2 NO₂. Calcula [NO₂] y α en el equilibrio.", [
          "Tabla ICE (mol/L):" + tabla(["", "N₂O₄", "NO₂"], [["Inicial", "0,10", "0"], ["Cambio", "−x", "+2x"], ["Equilibrio", "0,10 − x", "2x"]], "ice"),
          "K<sub>c</sub> = " + fr("(2x)²", "0,10 − x") + " = 4,6·10⁻³  →  4x² = 4,6·10⁻³(0,10 − x)  →  4x² + 4,6·10⁻³x − 4,6·10⁻⁴ = 0",
          "Fórmula de la ecuación de 2º grado, nos quedamos con la raíz positiva: x = " + fr("−4,6·10⁻³ + √((4,6·10⁻³)² + 16·4,6·10⁻⁴)", "8") + " ≈ 0,0102",
          "<b>[NO₂] = 2x ≈ 0,0203 mol/L</b> · [N₂O₄] = 0,10 − 0,0102 ≈ 0,0898 mol/L",
          "<b>α = x/0,10 ≈ 0,10</b>, es decir, un 10 % del N₂O₄ se ha disociado."
        ]) +
        ojo("a veces se puede <em>aproximar</em> 0,10 − x ≈ 0,10 para evitar la ecuación de 2º grado, pero solo si x es menos del 5 % del valor inicial. Aquí x es el 10 %, así que habría que resolverla entera. Si dudas, resuelve la cuadrática: nunca falla."),
    },
    {
      h: "7. El equilibrio en la industria: la síntesis del amoniaco",
      html:
        "<p>El proceso Haber-Bosch fabrica amoniaco para fertilizantes: N₂ + 3 H₂ ⇌ 2 NH₃, con ΔH = −92,2 kJ. Es un ejemplo perfecto de cómo Le Chatelier y la cinética compiten entre sí, y una pregunta clásica de examen.</p>" +
        "<table class='lamina-table'><tbody>" +
        "<tr><td>Presión alta (150–300 atm)</td><td>Δn = −2: la presión desplaza el equilibrio hacia el lado con menos moles de gas, los productos.</td></tr>" +
        "<tr><td>Temperatura baja</td><td>La reacción es exotérmica: bajar T aumenta K y favorece el NH₃. <b>Pero</b> a baja T la reacción es lentísima (Tema 5).</td></tr>" +
        "<tr><td>Temperatura «intermedia» (400–500 °C)</td><td>Compromiso: se pierde algo de rendimiento en el equilibrio a cambio de una velocidad razonable.</td></tr>" +
        "<tr><td>Catalizador de hierro</td><td>Acelera la reacción sin cambiar K: permite no tener que subir más la temperatura.</td></tr>" +
        "<tr><td>Se licúa y retira el NH₃</td><td>Al quitar producto, Q &lt; K y el equilibrio se desplaza a la derecha: se reciclan N₂ y H₂ sin reaccionar.</td></tr>" +
        "</tbody></table>" +
        "<p>La idea que se pide en los exámenes: <b>termodinámica</b> (el equilibrio, que quiere T baja) y <b>cinética</b> (la velocidad, que quiere T alta) se enfrentan, y la industria busca el mejor compromiso.</p>"
    },
    {
      h: "8. ¿Qué falla aquí? Errores típicos de equilibrio",
      html: "<p>Cada pregunta enseña un razonamiento con un fallo muy frecuente. Detéctalo.</p>" + w("quiz", "errores")
    },
    {
      h: "9. Autocomprobación del tema",
      html: "<p>Ocho preguntas para saber si el tema está en su sitio y un juego de parejas para fijar las ideas clave.</p>" + w("quiz", "quiz1") + w("emparejar", "emp1")
    }
  ];

  // ============================================================
  // ACTIVIDADES (datos)
  // ============================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "Un alumno escribe, para CaCO₃(s) ⇌ CaO(s) + CO₂(g): K<sub>c</sub> = [CaO][CO₂] / [CaCO₃]. ¿Qué error ha cometido?",
          op: ["Ha incluido sólidos puros, que no aparecen en K", "Ha invertido el cociente", "Le falta elevar al cuadrado", "Nada, está bien"], ok: 0,
          porque: "Los sólidos y líquidos puros tienen concentración constante y no figuran en K. Lo correcto es K<sub>c</sub> = [CO₂]." },
        { q: "Para N₂ + 3 H₂ ⇌ 2 NH₃ escribe K<sub>c</sub> = [NH₃] / ([N₂][H₂]). ¿Qué falta?",
          op: ["Nada, es correcto", "Los exponentes: cada concentración va elevada a su coeficiente estequiométrico", "Sumar en vez de multiplicar", "Poner los reactivos arriba"], ok: 1,
          porque: "K<sub>c</sub> = [NH₃]² / ([N₂]·[H₂]³): el 2 y el 3 son los coeficientes de la reacción ajustada." },
        { q: "«La síntesis de NH₃ es exotérmica; al subir la temperatura el equilibrio se desplaza hacia el NH₃ porque la reacción necesita más energía.» ¿Es correcto?",
          op: ["Sí", "No: en una reacción exotérmica, subir T disminuye K y desplaza el equilibrio hacia los reactivos", "No: la temperatura nunca influye", "Sí, pero solo a presión alta"], ok: 1,
          porque: "Subir T favorece el sentido endotérmico, que aquí es la reacción inversa (descomposición del NH₃). K<sub>c</sub> baja y el rendimiento en NH₃ también." },
        { q: "«Añadimos un catalizador, así que el equilibrio se desplaza hacia los productos.» ¿Qué tiene de erróneo?",
          op: ["Nada", "El catalizador acelera por igual la reacción directa y la inversa: no cambia K ni la posición del equilibrio", "El catalizador solo actúa si sube la presión", "El catalizador consume parte de los reactivos"], ok: 1,
          porque: "Un catalizador reduce la energía de activación en ambos sentidos. El equilibrio se alcanza antes, pero con las mismas concentraciones." },
        { q: "«Para cualquier reacción en fase gas, K<sub>p</sub> = K<sub>c</sub>.» ¿Es cierto?",
          op: ["Sí, siempre", "No: K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>, y solo coinciden si Δn = 0", "Solo a 25 °C", "Solo si hay más productos que reactivos"], ok: 1,
          porque: "Si Δn ≠ 0, el factor (RT)<sup>Δn</sup> no vale 1. Por ejemplo, para N₂ + 3H₂ ⇌ 2NH₃, Δn = −2." },
        { q: "En N₂ + 3 H₂ ⇌ 2 NH₃, a V y T constantes añadimos helio. Un alumno dice: «aumenta la presión total, así que se desplaza hacia menos moles de gas». ¿Qué falla?",
          op: ["Nada", "El helio no reacciona y V no cambia: las concentraciones de los reactivos y productos siguen igual, y Q = K", "El helio es un reactivo", "El helio baja la temperatura"], ok: 1,
          porque: "A volumen constante, el gas inerte aumenta la presión total pero no las concentraciones (ni las presiones parciales) de las sustancias que reaccionan. No hay desplazamiento." },
        { q: "«Como K<sub>c</sub> = 54, la reacción es muy rápida.» ¿Qué error hay?",
          op: ["Ninguno", "K<sub>c</sub> habla de las cantidades en el equilibrio, no de la velocidad (cinética)", "K<sub>c</sub> debería ser menor que 1", "Falta multiplicar por RT"], ok: 1,
          porque: "K dice hasta dónde llega la reacción, no cuánto tarda. Hay reacciones con K enorme y muy lentas." }
      ]
    },

    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "Una reacción tiene K<sub>c</sub> = 2·10⁻⁵ a cierta T. ¿Qué significa?",
          op: ["En el equilibrio predominan los reactivos", "En el equilibrio predominan los productos", "La reacción es muy rápida", "La reacción no se produce nunca"], ok: 0,
          porque: "K muy pequeña: el numerador (productos) es diminuto frente al denominador (reactivos). Hay sobre todo reactivos al llegar al equilibrio." },
        { q: "Para N₂ + 3 H₂ ⇌ 2 NH₃, ¿cuánto vale Δn en K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>?",
          op: ["+2", "−2", "−4", "0"], ok: 1,
          porque: "Δn = moles de gas de productos − moles de gas de reactivos = 2 − (1 + 3) = −2." },
        { q: "Si en un instante Q &gt; K<sub>c</sub>, el sistema…",
          op: ["Ya está en equilibrio", "Evoluciona hacia los productos", "Evoluciona hacia los reactivos", "No evoluciona porque K cambia"], ok: 2,
          porque: "Q mayor que K significa «demasiado producto»: para llegar a Q = K el sistema retrocede, formando más reactivos." },
        { q: "Si invierto una reacción cuya constante es K, la nueva constante vale…",
          op: ["K", "−K", "1/K", "K²"], ok: 2,
          porque: "Al invertir, productos y reactivos cambian de sitio en la expresión: K′ = 1/K." },
        { q: "Una reacción es endotérmica. Al aumentar la temperatura…",
          op: ["K disminuye y se desplaza hacia los reactivos", "K aumenta y se desplaza hacia los productos", "K no cambia", "Solo cambia la velocidad"], ok: 1,
          porque: "Subir T favorece el sentido que absorbe calor (el endotérmico, hacia los productos). Aumenta K." },
        { q: "En el equilibrio, la velocidad de la reacción directa es…",
          op: ["mayor que la de la inversa", "menor que la de la inversa", "igual que la de la inversa", "cero"], ok: 2,
          porque: "Es un equilibrio dinámico: ambas reacciones continúan, a la misma velocidad. Por eso las concentraciones son constantes." },
        { q: "¿Qué factor es el único que modifica el valor de K<sub>c</sub>?",
          op: ["La concentración de un reactivo", "La presión", "La temperatura", "Un catalizador"], ok: 2,
          porque: "Concentración, presión y volumen desplazan el equilibrio cambiando Q, pero K permanece. Solo la temperatura cambia K." },
        { q: "En H₂ + I₂ ⇌ 2 HI comprimimos el recipiente a temperatura constante. ¿Qué ocurre?",
          op: ["Se forma más HI", "Se forma más H₂ e I₂", "No hay desplazamiento (Δn = 0)", "Cambia K"], ok: 2,
          porque: "Hay 2 moles de gas a cada lado, así que comprimir cambia las concentraciones de todos por igual y Q sigue valiendo K. No hay desplazamiento." }
      ]
    },

    emp1: {
      titulo: "Situación ↔ consecuencia",
      consigna: "Toca una situación de la izquierda y su consecuencia a la derecha.",
      pares: [
        ["Q &lt; K<sub>c</sub>", "Evoluciona hacia los productos (→)"],
        ["Q &gt; K<sub>c</sub>", "Evoluciona hacia los reactivos (←)"],
        ["Q = K<sub>c</sub>", "El sistema está en equilibrio"],
        ["Subir T en una reacción exotérmica", "K<sub>c</sub> disminuye"],
        ["Añadir un catalizador", "No cambia K ni la posición del equilibrio"],
        ["Comprimir con Δn(gas) &lt; 0", "Hacia el lado con menos moles de gas"]
      ]
    }
  };

  // ============================================================
  // EJERCICIOS NUEVOS (nivel 1 ★ · 2 ★★ · 3 ★★★ PAU) con comprobación
  // ============================================================
  var ejercicios = [
    { id: "q1", nivel: 1,
      enunciado: "En un recipiente de 2 L se alcanza el equilibrio H₂ + I₂ ⇌ 2 HI con 0,4 mol de H₂, 0,4 mol de I₂ y 2,4 mol de HI. Calcula K<sub>c</sub>.",
      check: { tipo: "num", etiqueta: "K<sub>c</sub> =", valor: 36 },
      pistas: ["Pasa los moles a concentraciones dividiendo entre 2 L.", "K<sub>c</sub> = [HI]² / ([H₂]·[I₂])."],
      pasos: ["[H₂] = 0,4/2 = 0,2 M · [I₂] = 0,4/2 = 0,2 M · [HI] = 2,4/2 = 1,2 M", "K<sub>c</sub> = " + fr("[HI]²", "[H₂][I₂]") + " = " + fr("1,2²", "0,2·0,2") + " = " + fr("1,44", "0,04") + " = 36"],
      resultado: "K<sub>c</sub> = 36",
      ojo: "En este caso Δn = 0 y el volumen se cancela, pero no lo hagas por costumbre: en otros equilibrios hay que usar concentraciones, no moles." },
    { id: "q2", nivel: 1,
      enunciado: "Para el equilibrio heterogéneo CaCO₃(s) ⇌ CaO(s) + CO₂(g), ¿cuál es la expresión correcta de K<sub>c</sub>?",
      check: { tipo: "opcion", etiqueta: "K<sub>c</sub> =", opciones: ["[CaO][CO₂] / [CaCO₃]", "[CO₂]", "[CO₂] / [CaCO₃]", "[CaO][CO₂]"], ok: 1 },
      pistas: ["¿Qué sustancias están en estado sólido? Esas no aparecen en K."],
      pasos: ["CaCO₃ y CaO son sólidos puros: su concentración es constante y no figura en la expresión.", "Solo queda el gas: K<sub>c</sub> = [CO₂] (y K<sub>p</sub> = p<sub>CO₂</sub>)."],
      resultado: "K<sub>c</sub> = [CO₂]" },
    { id: "q3", nivel: 1,
      enunciado: "Para N₂ + 3 H₂ ⇌ 2 NH₃, K<sub>c</sub> = 0,08 a cierta temperatura. ¿Cuánto vale K<sub>c</sub> para la reacción inversa, 2 NH₃ ⇌ N₂ + 3 H₂?",
      check: { tipo: "num", etiqueta: "K<sub>c</sub>′ =", valor: 12.5 },
      pistas: ["Al invertir una reacción, productos y reactivos cambian de sitio en la expresión de K."],
      pasos: ["K′ = 1/K = 1/0,08 = 12,5"],
      resultado: "K<sub>c</sub>′ = 12,5" },
    { id: "q4", nivel: 2,
      enunciado: "Para 2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g), K<sub>c</sub> = 280 a 1000 K. Calcula K<sub>p</sub> (R = 0,082 atm·L/(mol·K)).",
      check: { tipo: "num", etiqueta: "K<sub>p</sub> =", valor: 3.41, unidad: "atm⁻¹" },
      pistas: ["K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>. Calcula primero Δn.", "Δn = 2 − (2 + 1) = −1. RT = 0,082·1000 = 82."],
      pasos: ["Δn = 2 − 3 = −1", "RT = 0,082 · 1000 = 82 atm·L/mol", "K<sub>p</sub> = 280 · 82<sup>−1</sup> = 280/82 ≈ 3,41"],
      resultado: "K<sub>p</sub> ≈ 3,41 atm⁻¹" },
    { id: "q5", nivel: 2,
      enunciado: "Se introducen 2,0 mol de H₂ y 2,0 mol de I₂ en un recipiente de 4 L a 700 K, donde K<sub>c</sub> = 54 para H₂ + I₂ ⇌ 2 HI. Calcula las concentraciones en el equilibrio.",
      check: [{ tipo: "num", etiqueta: "[H₂] =", valor: 0.107, unidad: "mol/L" }, { tipo: "num", etiqueta: "[HI] =", valor: 0.786, unidad: "mol/L" }],
      pistas: ["Concentraciones iniciales: 2,0/4 = 0,50 M de H₂ y de I₂. Haz la tabla ICE.", "(2x)²/(0,5 − x)² = 54 → 2x/(0,5 − x) = √54 ≈ 7,35."],
      pasos: ["Concentraciones iniciales: [H₂] = [I₂] = 2,0/4 = 0,50 M · [HI] = 0", "Tabla ICE: H₂: 0,5 − x · I₂: 0,5 − x · HI: 2x", "K<sub>c</sub> = (2x)²/(0,5 − x)² = 54 → 2x/(0,5 − x) = 7,35 → 2x = 3,674 − 7,35x → x = 3,674/9,35 = 0,393", "[H₂] = [I₂] = 0,5 − 0,393 = 0,107 M · [HI] = 2·0,393 = 0,786 M", "Comprobación: 0,786²/0,107² = 0,618/0,01145 ≈ 54 ✓"],
      resultado: "[H₂] = [I₂] ≈ 0,107 mol/L · [HI] ≈ 0,786 mol/L" },
    { id: "q6", nivel: 2,
      enunciado: "Se introducen 2,0 mol de PCl₅ en un recipiente de 10 L. Cuando se alcanza el equilibrio PCl₅ ⇌ PCl₃ + Cl₂ quedan 1,2 mol de PCl₅. Calcula el grado de disociación α y K<sub>c</sub>.",
      check: [{ tipo: "num", etiqueta: "α =", valor: 0.4 }, { tipo: "num", etiqueta: "K<sub>c</sub> =", valor: 0.0533, tol: 0.01 }],
      pistas: ["Moles disociados = 2,0 − 1,2. Por cada PCl₅ que se disocia se forma 1 PCl₃ y 1 Cl₂.", "Concentraciones: divide los moles de equilibrio entre 10 L."],
      pasos: ["Moles disociados: 2,0 − 1,2 = 0,8 mol → α = 0,8/2,0 = 0,4 (un 40 %)", "En equilibrio: n(PCl₅) = 1,2 · n(PCl₃) = 0,8 · n(Cl₂) = 0,8 mol", "Concentraciones (V = 10 L): 0,12 · 0,08 · 0,08 mol/L", "K<sub>c</sub> = " + fr("0,08·0,08", "0,12") + " = " + fr("0,0064", "0,12") + " ≈ 0,0533"],
      resultado: "α = 0,4 · K<sub>c</sub> ≈ 0,0533" },
    { id: "q7", nivel: 3,
      enunciado: "Para PCl₅ ⇌ PCl₃ + Cl₂, K<sub>c</sub> = 0,04 mol/L a cierta temperatura. Se introducen 0,40 mol de PCl₅ en un recipiente de 2 L. Calcula la concentración de PCl₃ en el equilibrio y el grado de disociación.",
      check: [{ tipo: "num", etiqueta: "[PCl₃] =", valor: 0.0717, unidad: "mol/L" }, { tipo: "num", etiqueta: "α =", valor: 0.358 }],
      pistas: ["[PCl₅]₀ = 0,40/2 = 0,20 M. Tabla ICE con x = lo que se disocia.", "x²/(0,20 − x) = 0,04 → x² + 0,04x − 0,008 = 0 (ecuación de 2º grado)."],
      pasos: ["[PCl₅]₀ = 0,40/2 = 0,20 M. ICE: PCl₅: 0,20 − x · PCl₃: x · Cl₂: x", "K<sub>c</sub> = " + fr("x·x", "0,20 − x") + " = 0,04 → x² = 0,04(0,20 − x) → x² + 0,04x − 0,008 = 0", "x = " + fr("−0,04 + √(0,04² + 4·0,008)", "2") + " = " + fr("−0,04 + 0,1833", "2") + " ≈ 0,0717", "[PCl₃] = [Cl₂] = x ≈ 0,0717 mol/L · [PCl₅] = 0,20 − 0,0717 ≈ 0,128 mol/L", "α = x/[PCl₅]₀ = 0,0717/0,20 ≈ 0,358 (un 35,8 %)"],
      resultado: "[PCl₃] ≈ 0,0717 mol/L · α ≈ 0,358",
      ojo: "aproximar 0,20 − x ≈ 0,20 daría x ≈ 0,0894, un error del 25 %: aquí α es muy grande para aproximar. Resuelve la cuadrática." },
    { id: "q8", nivel: 3,
      enunciado: "La síntesis del amoniaco, N₂ + 3 H₂ ⇌ 2 NH₃ (ΔH &lt; 0), está en equilibrio. Indica hacia dónde se desplaza al hacer cada cambio.",
      check: [
        { tipo: "opcion", etiqueta: "a) Aumentar la temperatura", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 1 },
        { tipo: "opcion", etiqueta: "b) Comprimir el recipiente", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "c) Añadir un catalizador", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 2 },
        { tipo: "opcion", etiqueta: "d) Añadir N₂ (V y T constantes)", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "e) Retirar NH₃", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 0 },
        { tipo: "opcion", etiqueta: "f) Añadir He (V y T constantes)", opciones: ["→ hacia el NH₃", "← hacia N₂ y H₂", "no se desplaza"], ok: 2 }
      ],
      pistas: ["Piensa en Q y K: ¿qué cambia con cada perturbación, Q o K?", "Δn(gas) = −2. La reacción es exotérmica."],
      pasos: ["a) Exotérmica: al subir T baja K → Q &gt; K → <b>izquierda</b>.", "b) Comprimir: favorece el lado con menos moles de gas (2 frente a 4) → <b>derecha</b>.", "c) El catalizador no cambia K ni Q → <b>no se desplaza</b>.", "d) Más reactivo: Q &lt; K → <b>derecha</b>.", "e) Menos producto: Q &lt; K → <b>derecha</b>.", "f) Gas inerte a V y T constantes: las concentraciones no cambian → <b>no se desplaza</b>."],
      resultado: "a) ← · b) → · c) no · d) → · e) → · f) no" },
    { id: "q9", nivel: 3,
      enunciado: "A cierta temperatura, K<sub>c</sub> = 0,08 para N₂ + 3 H₂ ⇌ 2 NH₃. En un recipiente de 1 L hay 0,5 mol de N₂, 1,0 mol de H₂ y 0,3 mol de NH₃. Calcula Q e indica hacia dónde evoluciona el sistema.",
      check: [{ tipo: "num", etiqueta: "Q =", valor: 0.18 }, { tipo: "opcion", etiqueta: "Evoluciona", opciones: ["hacia los productos (→)", "hacia los reactivos (←)", "está en equilibrio"], ok: 1 }],
      pistas: ["Como V = 1 L, los moles coinciden con las concentraciones.", "Q = [NH₃]² / ([N₂][H₂]³)."],
      pasos: ["Concentraciones (V = 1 L): [N₂] = 0,5 · [H₂] = 1,0 · [NH₃] = 0,3", "Q = " + fr("[NH₃]²", "[N₂][H₂]³") + " = " + fr("0,3²", "0,5·1,0³") + " = " + fr("0,09", "0,5") + " = 0,18", "Q = 0,18 &gt; K<sub>c</sub> = 0,08 → hay «demasiado producto» → el sistema evoluciona hacia los <b>reactivos</b> (←)."],
      resultado: "Q = 0,18 &gt; K<sub>c</sub> → evoluciona hacia la izquierda (se descompone NH₃)" },
    { id: "q10", nivel: 3,
      enunciado: "Explica por qué la síntesis industrial del amoniaco (N₂ + 3 H₂ ⇌ 2 NH₃, ΔH &lt; 0) se realiza a presión alta y a una temperatura intermedia (400–500 °C) y con catalizador. Redáctalo como en un examen.",
      check: { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 7, items: [
        { t: "Presión alta: hay menos moles de gas en los productos (2 frente a 4), así que se favorece el NH₃", p: 0.5 },
        { t: "La reacción es exotérmica: bajar la temperatura aumenta K y el rendimiento del equilibrio", p: 0.5 },
        { t: "Pero a temperatura baja la reacción es muy lenta (cinética): hay que subirla para tener una velocidad razonable", p: 0.5 },
        { t: "Habla de compromiso, y dice que el catalizador acelera sin cambiar K ni el equilibrio", p: 0.5 }
      ] },
      pasos: ["Presión alta: Δn(gas) = 2 − 4 = −2, así que, por Le Chatelier, aumentar la presión desplaza el equilibrio hacia el lado con menos moles de gas, el NH₃.", "Temperatura: la reacción es exotérmica, y el rendimiento en el equilibrio mejora al bajar T (K aumenta).", "Pero a baja T la velocidad de reacción es demasiado pequeña. Hay que elegir una T intermedia que combine rendimiento y velocidad aceptables.", "El catalizador (hierro) acelera la reacción directa y la inversa por igual: reduce el tiempo en alcanzar el equilibrio sin modificar K, y permite trabajar a una T no demasiado alta."],
      resultado: "Compromiso termodinámica–cinética: presión alta (más NH₃ en el equilibrio), T intermedia (velocidad vs rendimiento) y catalizador (más velocidad sin cambiar K)." }
  ];

  // ============================================================
  // LÁMINA RESUMEN
  // ============================================================
  var lamina = [
    { titulo: "Kc, Kp y Q: cómo se calculan",
      items: [
        { label: "Constante de equilibrio (aA + bB ⇌ cC + dD)", formula: "K<sub>c</sub> = " + fr("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>"), cuando: "Concentraciones <b>en el equilibrio</b> (mol/L).", ojo: "Sólidos y líquidos puros no aparecen." },
        { label: "De K<sub>c</sub> a K<sub>p</sub>", formula: "K<sub>p</sub> = K<sub>c</sub>·(RT)<sup>Δn</sup>", cuando: "Reacciones con gases. T en kelvin; R = 0,082 atm·L/(mol·K).", ejemplo: "Δn = moles gas productos − moles gas reactivos.", ojo: "Si Δn = 0, K<sub>p</sub> = K<sub>c</sub>." },
        { label: "Cociente de reacción", formula: "Q = " + fr("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>"), cuando: "Misma fórmula, pero con las concentraciones de <b>cualquier instante</b>.", ejemplo: "Q &lt; K → derecha · Q &gt; K → izquierda · Q = K → equilibrio." }
      ] },
    { titulo: "Operar con constantes",
      tabla: { cab: ["Operación", "Nueva K"], filas: [["Invertir la reacción", "1/K"], ["Multiplicar los coeficientes por n", "Kⁿ"], ["Sumar dos reacciones", "K₁·K₂"]] },
      nota: "Ejemplo: K = 0,08 → inversa 12,5 → mitad de coeficientes √0,08 ≈ 0,28." },
    { titulo: "Tabla ICE en 6 pasos", ancha: true,
      pasos: ["Reacción ajustada y expresión de K.", "Cantidades <b>iniciales</b> (en mol/L: divide entre V).", "Fila de <b>cambio</b>: −a·x los reactivos, +b·x los productos.", "Fila de <b>equilibrio</b> = inicial + cambio.", "Sustituye en K y despeja x (a veces, ecuación de 2º grado).", "Comprueba que nada sale negativo. Con α: moles disociados = n₀·α."],
      nota: "Aproximar «c₀ − x ≈ c₀» solo si x es menos del 5 % de c₀." },
    { titulo: "Le Chatelier: qué pasa si…", ancha: true,
      tabla: { cab: ["Perturbación", "¿Cambia K?", "Desplazamiento"], filas: [
        ["Añadir reactivo / retirar producto", "No", "→ derecha"],
        ["Añadir producto / retirar reactivo", "No", "← izquierda"],
        ["Comprimir (↑ P)", "No", "hacia el lado con menos moles de gas (Δn = 0: nada)"],
        ["Subir T, exotérmica", "Baja", "← izquierda"],
        ["Subir T, endotérmica", "Sube", "→ derecha"],
        ["Catalizador", "No", "ninguno (solo más rápido)"],
        ["Gas inerte, V y T constantes", "No", "ninguno"]
      ] },
      nota: "Truco: razona siempre con Q y K. Solo la temperatura cambia K." },
    { titulo: "Errores típicos", ancha: true,
      errores: [
        { mal: "K<sub>c</sub> = [CaO][CO₂] / [CaCO₃]", bien: "K<sub>c</sub> = [CO₂]", por: "Los sólidos puros no figuran en K." },
        { mal: "K<sub>c</sub> = [NH₃] / ([N₂][H₂])", bien: "K<sub>c</sub> = [NH₃]² / ([N₂][H₂]³)", por: "Cada concentración, elevada a su coeficiente." },
        { mal: "El catalizador desplaza el equilibrio a la derecha", bien: "No desplaza: solo acelera", por: "Actúa igual en los dos sentidos." },
        { mal: "En el equilibrio [reactivos] = [productos]", bien: "Las concentraciones son constantes, no iguales", por: "Es v directa = v inversa." },
        { mal: "K<sub>p</sub> = K<sub>c</sub> siempre", bien: "K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>", por: "Solo coinciden si Δn = 0." }
      ] }
  ];

  B.registrar("quimica2", "t6", { secciones: secciones, nuevas: nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });

})(window);

