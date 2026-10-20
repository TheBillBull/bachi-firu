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
    valor = String(valor).replace(/→/g, "⟶").replace(/←/g, "⟵");   // la flecha corta se ve diminuta con la tipografía matemática
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
