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
