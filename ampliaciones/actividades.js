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
