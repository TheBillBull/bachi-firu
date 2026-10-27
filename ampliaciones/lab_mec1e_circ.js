/* ============================================================
   Bachi para Firu · mecánica I (Física y Química 1.º, tema 9: movimiento circular III)
   f9_honda
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, M = B.lab.mec1, C = M.circ, lec = M.lec, f2 = M.f;
  var TAU = 2 * Math.PI, R = Math.PI / 180;

  // ============================================================
  // F9_HONDA: una piedra atada a una cuerda; al soltarla sale por la tangente
  // ============================================================
  B.w.f9_honda = function (host) {
    var cuerpo = B.caja(host, "Experimento", "La honda: ¿hacia dónde sale la piedra cuando se suelta la cuerda?");
    cuerpo.innerHTML = '<div class="f9-disco f9-honda"></div><div data-ctl></div><div class="lectura anch"></div><p class="w-pie"></p>';
    var SEMI = 5, st = { r: 2, w: 3, th: 0, suelta: null, tv: 0 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    var g = C.disco(cuerpo.querySelector(".f9-disco"), SEMI, 520, 440), btn;
    U.slider(ctl, { et: "Longitud de la cuerda r (m)", min: 0.5, max: 3, step: 0.1, val: st.r, on: function (v) { if (!st.suelta) { st.r = v; pinta(); } }, fmt: function (v) { return f2(v, 1) + " m"; } });
    U.slider(ctl, { et: "Velocidad angular ω (rad/s)", min: -6, max: 6, step: 0.5, val: st.w, on: function (v) { if (!st.suelta) { st.w = v; pinta(); } }, fmt: function (v) { return f2(v, 1); } });
    var an = U.animar(ctl, function (t, dt, reinicio) {
      if (reinicio) { st.th = 0; st.suelta = null; st.tv = 0; if (btn) btn.disabled = false; pinta(); return; }
      if (!dt) return;
      if (st.suelta) {
        st.tv += dt; pinta();
        var q = pos(); if (Math.abs(q[0]) > SEMI * 0.98 || Math.abs(q[1]) > SEMI * 0.98) return false;
      } else { st.th += st.w * dt; pinta(); }
    }, { auto: false });
    btn = U.boton(an.barra, "✂ Soltar la cuerda", function () {
      if (st.suelta) return;
      var th = st.th, v = st.w * st.r;
      st.suelta = { x: st.r * Math.cos(th), y: st.r * Math.sin(th), vx: -v * Math.sin(th), vy: v * Math.cos(th), th: th }; st.tv = 0; btn.disabled = true; an.reproducir(); pinta();
    }, "chip-btn");
    function pos() {
      if (!st.suelta) return [st.r * Math.cos(st.th), st.r * Math.sin(st.th)];
      return [st.suelta.x + st.suelta.vx * st.tv, st.suelta.y + st.suelta.vy * st.tv];
    }
    function pinta() {
      var r = st.r, w = st.w, v = w * r, p = pos(), s = st.suelta;
      g.limpiar(); C.ejes(g, SEMI * 0.95); C.circ(g, r, "c-ink").setAttribute("stroke-width", 2);
      g.punto(0, 0, { r: 5, clase: "c-ink" });
      if (!s) {
        g.segmento(0, 0, p[0], p[1], { clase: "c-ink" }).setAttribute("stroke-width", 2.5);
        if (Math.abs(v) > 1e-9) U.flecha(g, p[0], p[1], p[0] - Math.sin(st.th) * Math.sign(w) * Math.abs(v) * 0.35, p[1] + Math.cos(st.th) * Math.sign(w) * Math.abs(v) * 0.35, { clase: "c-ok" });
      } else {
        // la tangente (trayectoria futura) y el camino recorrido tras soltar
        var L = 12 / Math.max(1e-6, Math.hypot(s.vx, s.vy));
        g.segmento(s.x - s.vx * L * 0.15, s.y - s.vy * L * 0.15, s.x + s.vx * L, s.y + s.vy * L, { clase: "c-ok", dash: "5 5" });
        g.segmento(s.x, s.y, p[0], p[1], { clase: "c-red" }).setAttribute("stroke-width", 3);
        g.segmento(0, 0, s.x, s.y, { clase: "c-faint", dash: "3 4" });
      }
      g.punto(p[0], p[1], { r: 9, clase: s ? "c-red" : "c-pen" });
      var ang = Math.atan2(s ? s.vy : (w >= 0 ? Math.cos(st.th) : -Math.cos(st.th)), s ? s.vx : (w >= 0 ? -Math.sin(st.th) : Math.sin(st.th))) / R;
      var tg = ((ang % 360) + 360) % 360, th0 = s ? s.th : st.th, rad0 = ((th0 / R % 360) + 360) % 360;
      lectura.innerHTML = lec("Posición angular θ", f2(rad0, 0) + "°", "pen") + lec("Velocidad v = ω·r", f2(Math.abs(v), 2) + " m/s", "ok") +
        lec("Dirección de v (tangente)", Math.abs(v) < 1e-9 ? "—" : f2(tg, 0) + "° (= θ " + (w >= 0 ? "+ 90°" : "− 90°") + ")", "ok") +
        lec("Estado", s ? "Sin cuerda: MRU. Recorrido " + f2(Math.hypot(p[0] - s.x, p[1] - s.y), 2) + " m a " + f2(Math.abs(v), 2) + " m/s" : "Con cuerda: a<sub>c</sub> = ω²·r = " + f2(w * w * r, 2) + " m/s² hacia el centro", s ? "red" : "pen");
      pie.innerHTML = s ? "Al desaparecer la fuerza de la cuerda (la fuerza centrípeta), nada curva ya la trayectoria: la piedra sigue en <b>línea recta</b> con la velocidad que tenía en ese instante, <b>tangente</b> a la circunferencia y no radial. Es la primera ley de Newton (Tema 10)." : "Pulsa <b>▶ Reproducir</b>, deja que la piedra gire y después <b>✂ Soltar la cuerda</b>. Prueba a soltarla en distintos puntos y con distinto sentido de giro: saldrá siempre por la tangente.";
    }
    pinta();
  };
})(window);
