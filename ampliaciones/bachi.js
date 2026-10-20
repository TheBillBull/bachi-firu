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
      sinEjes: !!o.sinEjes, sinY: !!o.sinY
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
    c.izq = 12 + Math.min(maxLab, 6) * 6.2;
    c.abj = 26;
    this.clipRect.setAttribute("x", c.izq); this.clipRect.setAttribute("y", c.arr);
    this.clipRect.setAttribute("width", c.w - c.izq - c.der); this.clipRect.setAttribute("height", c.h - c.arr - c.abj);
    svg("rect", { x: c.izq, y: c.arr, width: c.w - c.izq - c.der, height: c.h - c.arr - c.abj, "class": "p-marco" }, g);
    var x0 = Math.min(Math.max(0, c.xmin), c.xmax), y0 = Math.min(Math.max(0, c.ymin), c.ymax);
    var x;
    for (x = Math.ceil(c.xmin / sx) * sx; x <= c.xmax + 1e-9; x += sx) {
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
      var partes = String(raw).split(/[;,]|\sy\s|\so\s/).map(function (s) { return Mate.numero(s); });
      if (partes.some(isNaN)) return { ok: false, msg: "Escribe los valores separados por comas, por ejemplo: 0, 2." };
      partes.sort(function (a, b) { return a - b; });
      var esp = c.valores.slice().sort(function (a, b) { return a - b; });
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

