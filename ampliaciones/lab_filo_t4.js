/* ============================================================
   Bachi para Firu · Historia de la Filosofía, tema 4 (Aristóteles)
   filo_causas: las cuatro causas de cuatro objetos distintos (estatua, mesa, roble, gato), con la pareja potencia→acto.
   filo_medio: el término medio de cinco virtudes (defecto, virtud, exceso), con una situación cotidiana.
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui;

  (function () {
    if (!global.document || !document.head || document.getElementById("ft4-estilos")) return;
    var s = document.createElement("style"); s.id = "ft4-estilos";
    s.textContent =
      ".ft4-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:12px 0 4px}" +
      ".ft4-c{padding:8px 6px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:13.5px;line-height:1.35;color:var(--ink)}" +
      ".ft4-c b{display:block;font-size:12.5px;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.03em}" +
      ".ft4-c.f{border-color:var(--pen);background:var(--pen-soft)}" +
      ".ft4-pa{margin-top:8px;padding:8px 10px;border-radius:10px;border:1.5px dashed var(--line);font-size:14.5px;color:var(--ink)}" +
      ".ft4-barra{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:12px 0 6px;text-align:center}" +
      ".ft4-b{padding:10px 4px;border:1.5px solid var(--line);border-radius:10px;background:var(--sheet);font-size:14px;color:var(--ink)}" +
      ".ft4-b em{display:block;font-style:normal;font-size:12px;color:var(--ink-faint)}" +
      ".ft4-b.m{border-color:var(--pen);background:var(--pen-soft);font-weight:700}" +
      ".ft4-sit{padding:8px 0;border-top:1px solid var(--line);font-size:15px;line-height:1.45;color:var(--ink)}" +
      "@media(max-width:520px){.ft4-grid{grid-template-columns:1fr 1fr}.ft4-b{font-size:12.5px;padding:8px 2px}}";
    document.head.appendChild(s);
  })();

  var OBJ = [
    { k: 1, t: "Estatua", mat: "Mármol", form: "La figura de Hermes", efi: "El escultor", fin: "Adornar el templo", pot: "El bloque de mármol es la estatua <b>en potencia</b>; al terminarla, lo es <b>en acto</b>." },
    { k: 2, t: "Mesa", mat: "Madera", form: "La forma de mesa", efi: "El carpintero", fin: "Comer o trabajar encima", pot: "Los tablones son la mesa <b>en potencia</b>; montados, mesa <b>en acto</b>." },
    { k: 3, t: "Roble", mat: "Agua y minerales que absorbe", form: "Su esencia de roble", efi: "La bellota de otro roble", fin: "Llegar a ser un roble adulto", pot: "La bellota es roble <b>en potencia</b>; el roble crecido, <b>en acto</b>. El principio del cambio está dentro (naturaleza)." },
    { k: 4, t: "Gato", mat: "El cuerpo (carne, huesos)", form: "El alma: lo que le hace vivir y sentir", efi: "Sus padres", fin: "Vivir y reproducirse como gato", pot: "El gatito es gato adulto <b>en potencia</b>; crecer es pasar al acto." }
  ];
  B.w.filo_causas = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Las cuatro causas de un objeto");
    cuerpo.innerHTML = '<p class="w-intro">Elige un objeto y mira sus cuatro causas. La final, resaltada, es la que da sentido a las demás.</p><div data-ctl></div><div class="ft4-det"></div>';
    var det = cuerpo.querySelector(".ft4-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), OBJ.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = OBJ[cur - 1];
      det.innerHTML = '<div class="ft4-grid">' +
        [["Material", "¿De qué?", o.mat, ""], ["Formal", "¿Qué es?", o.form, ""], ["Eficiente", "¿Quién lo produce?", o.efi, ""], ["Final", "¿Para qué?", o.fin, " f"]].map(function (c) {
          return '<div class="ft4-c' + c[3] + '"><b>' + c[0] + "</b><i>" + c[1] + "</i><br>" + c[2] + "</div>";
        }).join("") + '</div><div class="ft4-pa">' + o.pot + "</div>";
    }
    pinta();
  };

  var VIR = [
    { k: 1, t: "Valentía", def: "Cobardía", vir: "Valentía", exc: "Temeridad", sit: "Un incendio en el edificio. El cobarde huye sin avisar a nadie; el temerario entra sin protección y se juega la vida; el valiente avisa, ayuda y mide el riesgo." },
    { k: 2, t: "Generosidad", def: "Avaricia", vir: "Generosidad", exc: "Derroche", sit: "Cobran el sueldo. El avaro no da nada; el derrochador lo gasta todo invitando; el generoso da lo justo, a quien debe y cuando debe." },
    { k: 3, t: "Templanza", def: "Insensibilidad", vir: "Templanza", exc: "Desenfreno", sit: "Una tarta riquísima. El insensible no disfruta de nada; el desenfrenado se la come entera; el templado disfruta con medida." },
    { k: 4, t: "Veracidad", def: "Falsa modestia", vir: "Veracidad", exc: "Jactancia", sit: "Te preguntan por tu nota. Quien se quita mérito miente por defecto; quien presume, por exceso; el veraz dice lo que es." },
    { k: 5, t: "Amabilidad", def: "Hosquedad", vir: "Amabilidad", exc: "Adulación", sit: "Un amigo te enseña un trabajo flojo. El hosco lo machaca; el adulador lo alaba sin verdad; el amable es sincero y cordial." }
  ];
  B.w.filo_medio = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "El término medio de cada virtud");
    cuerpo.innerHTML = '<p class="w-intro">Elige una virtud. El medio no es «la mitad matemática»: depende de la persona y de la situación.</p><div data-ctl></div><div class="ft4-det"></div>';
    var det = cuerpo.querySelector(".ft4-det"), cur = 1;
    U.fichas(cuerpo.querySelector("[data-ctl]"), VIR.map(function (o) { return { k: o.k, t: o.t }; }), cur, function (k) { cur = +k; pinta(); });
    function pinta() {
      var o = VIR[cur - 1];
      det.innerHTML = '<div class="ft4-barra"><div class="ft4-b"><em>Defecto</em>' + o.def + '</div><div class="ft4-b m"><em>Término medio</em>' + o.vir + '</div><div class="ft4-b"><em>Exceso</em>' + o.exc + '</div></div><div class="ft4-sit">' + o.sit + "</div>";
    }
    pinta();
  };
})(typeof window !== "undefined" ? window : this);
