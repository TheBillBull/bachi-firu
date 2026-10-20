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
