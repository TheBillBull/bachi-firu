/* ============================================================
   Química II · ampliaciones · Tema 7: Ácidos y bases
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Brønsted–Lowry</b>: ácido = cede H⁺; base = acepta H⁺. Toda reacción ácido-base tiene <b>dos pares conjugados</b>; el agua es anfótera. Conjugado de un ácido: quita un H⁺; de una base: añade un H⁺.",
    "<b>pH</b> = −log[H⁺]; pOH = −log[OH⁻]; pH + pOH = 14 y K<sub>w</sub> = [H⁺][OH⁻] = 10⁻¹⁴ (a 25 °C; K<sub>w</sub> crece con T). Cada unidad de pH es ×10 en [H⁺]. Ba(OH)₂ y Ca(OH)₂ dan <b>dos</b> OH⁻. Un ácido fuerte con c &lt; 10⁻⁶ mol/L exige contar el agua.",
    "<b>Fuerte</b> = disociación total ([H⁺] = c). <b>Débil</b> = equilibrio con K<sub>a</sub> o K<sub>b</sub>: tabla ICE, K = x²/(c − x); aproximar x = √(K·c) <b>solo si α = x/c &lt; 5 %</b> (si no, ecuación de 2.º grado). Al diluir, α aumenta. K<sub>a</sub>·K<sub>b</sub> = K<sub>w</sub> (pK<sub>a</sub> + pK<sub>b</sub> = 14).",
    "<b>Mezclas</b>: moles de H⁺ y OH⁻ → se restan → exceso ÷ <b>volumen total</b> → pH. Los pH no se promedian. Neutralización: a·C<sub>a</sub>V<sub>a</sub> = b·C<sub>b</sub>V<sub>b</sub> (a, b = nº de H⁺ y OH⁻ por fórmula).",
    "<b>Hidrólisis</b>: solo reacciona el ion que viene de ácido o base <b>débil</b> (CH₃COO⁻, CN⁻, F⁻ → básica; NH₄⁺ → ácida); Na⁺, K⁺, Cl⁻, NO₃⁻ no. K<sub>h</sub> = K<sub>w</sub>/K<sub>(del par)</sub>; luego es un ácido o base débil normal.",
    "<b>Tampón</b> = ácido débil + su base conjugada (o base débil + su ácido): pH = pK<sub>a</sub> + log([base]/[ácido]); eficaz en pK<sub>a</sub> ± 1; no cambia con la dilución; la capacidad crece con la concentración. Al añadir ácido o base fuertes, primero se hace reaccionar y luego se aplica la ecuación.",
    "<b>Valoración</b>: el punto de equivalencia es donde moles H⁺ = moles OH⁻; el salto de pH lo detecta el indicador. pH en la equivalencia: 7 (fuerte–fuerte), &gt; 7 (ácido débil + base fuerte), &lt; 7 (base débil + ácido fuerte). En la semiequivalencia, pH = pK<sub>a</sub>. Se elige el indicador cuyo intervalo de viraje contiene el pH de la equivalencia."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«Una disolución de pH 3 tiene 3 veces más H⁺ que una de pH 6 (porque 6 − 3 = 3).» ¿Qué falla?",
          op: ["Nada", "El pH es logarítmico: tres unidades de diferencia son 10³ = 1000 veces más [H⁺]", "El pH 3 tiene menos H⁺", "Hay que dividir por 3"], ok: 1,
          porque: "[H⁺] = 10<sup>−pH</sup>. Entre pH 3 y pH 6 hay un factor 10⁶⁻³ = 1000, no 3." },
        { q: "«Disuelvo HCl 10⁻⁸ mol/L, así que [H⁺] = 10⁻⁸ y el pH es 8.» ¿Qué falla?",
          op: ["Nada", "A esa concentración el agua aporta más H⁺ (10⁻⁷) que el ácido: pH = 6,98, ácido", "El HCl es débil", "El pH sería 6"], ok: 1,
          porque: "Un ácido nunca vuelve básica el agua. Hay que sumar los H⁺ del agua: [H⁺] = 1,05·10⁻⁷ mol/L → pH = 6,98." },
        { q: "«Para el Ba(OH)₂ 0,01 mol/L, [OH⁻] = 0,01 y pOH = 2.» ¿Qué falla?",
          op: ["Nada", "El Ba(OH)₂ libera 2 OH⁻ por fórmula: [OH⁻] = 0,02 y pOH = 1,70", "Es una base débil", "pOH = 12"], ok: 1,
          porque: "Ba(OH)₂ → Ba²⁺ + 2 OH⁻: hay que multiplicar por 2 (como en el ácido H₂SO₄ para el H⁺)." },
        { q: "«El ácido acético 0,1 mol/L es débil, así que su pH es 7 o casi.» ¿Qué falla?",
          op: ["Nada", "Débil significa que se disocia poco, no que sea neutro: sigue liberando H⁺ y el pH es 2,88", "El ácido acético es fuerte", "El pH es 13"], ok: 1,
          porque: "[H⁺] = √(1,8·10⁻⁵ · 0,1) = 1,3·10⁻³ mol/L → pH ≈ 2,9. «Débil» describe α, no el pH." },
        { q: "«Mezclo 100 mL de HCl 0,1 mol/L con 50 mL de NaOH 0,1 mol/L. Sobran 5 mmol de H⁺ en 100 mL: [H⁺] = 0,05.» ¿Qué falla?",
          op: ["Nada", "Hay que dividir por el volumen total (150 mL): [H⁺] = 5·10⁻³/0,150 = 0,033 mol/L → pH 1,48", "No sobra ácido", "Debe dividirse por 50 mL"], ok: 1,
          porque: "Tras mezclar, el exceso se reparte en <b>todo</b> el volumen: 100 + 50 = 150 mL." },
        { q: "«Una disolución de NaCN es neutra porque es una sal.» ¿Qué falla?",
          op: ["Nada", "El CN⁻ es la base conjugada de un ácido muy débil (HCN): se hidroliza y la disolución es básica (pH ≈ 11)", "Es ácida porque tiene Na⁺", "El Na⁺ se hidroliza"], ok: 1,
          porque: "Un ion de ácido o base débil reacciona con el agua. El Na⁺ viene de una base fuerte y es espectador; el CN⁻ no: CN⁻ + H₂O ⇌ HCN + OH⁻." },
        { q: "«Al diluir 100 veces el ácido acético, su grado de disociación disminuye porque hay menos ácido.» ¿Qué falla?",
          op: ["Nada", "Aumenta: al diluir, el equilibrio se desplaza hacia más iones (Le Châtelier / ley de Ostwald)", "Se queda igual", "Pasa a ser un ácido fuerte"], ok: 1,
          porque: "α = √(K<sub>a</sub>/c): al bajar c, sube α (del 1,3 % al 12,5 % al pasar de 0,1 a 0,001 mol/L). El pH, en cambio, sí sube porque hay menos H⁺ en total." },
        { q: "«En la valoración de ácido acético con NaOH, el punto de equivalencia está en pH 7 porque ya está todo neutralizado.» ¿Qué falla?",
          op: ["Nada", "En la equivalencia solo queda acetato de sodio, una sal que se hidroliza: pH ≈ 8,7", "Está en pH 4,74", "El pH vale 14"], ok: 1,
          porque: "«Neutralizado» (moles de H⁺ = moles de OH⁻) no significa «pH 7»: el anión CH₃COO⁻ es una base débil y deja la disolución algo básica." },
        { q: "«Una mezcla de CH₃COOH y NaCl es una disolución reguladora.» ¿Qué falla?",
          op: ["Nada", "Falta la base conjugada del CH₃COOH (CH₃COO⁻): el Cl⁻ no es su conjugada y no neutraliza el ácido añadido", "El NaCl es una base", "Solo funciona con HCl"], ok: 1,
          porque: "Un tampón necesita las dos formas del <b>mismo</b> par conjugado (CH₃COOH y CH₃COO⁻, p. ej. de CH₃COONa)." },
        { q: "«Para HF 0,1 mol/L, √(K<sub>a</sub>·c) = 8,2·10⁻³ y α = 8,2 %. Como el cálculo está hecho, esta aproximación es correcta.» ¿Qué falla?",
          op: ["Nada", "α &gt; 5 %: la aproximación c − x ≈ c no vale; hay que resolver la ecuación de 2.º grado (x = 7,9·10⁻³)", "α siempre es 100 %", "K<sub>a</sub> es incorrecta"], ok: 1,
          porque: "La aproximación se acepta solo si x/c &lt; 5 %. Aquí es 8,2 %: se resuelve x² + K<sub>a</sub>x − K<sub>a</sub>c = 0." },
        { q: "«En H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O, C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>b</sub>.» ¿Qué falla?",
          op: ["Nada", "El ácido cede 2 H⁺: 2·C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>b</sub> (se igualan moles de H⁺ y de OH⁻)", "Faltan 2 en la base", "Solo vale para ácidos débiles"], ok: 1,
          porque: "El punto de equivalencia iguala moles de H⁺ y de OH⁻: a·C<sub>a</sub>V<sub>a</sub> = b·C<sub>b</sub>V<sub>b</sub>." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "¿Cuál es la base conjugada del H₂CO₃?",
          op: ["HCO₃⁻", "CO₃²⁻", "H₃O⁺", "CO₂"], ok: 0, porque: "La base conjugada se obtiene quitando un H⁺: H₂CO₃ → HCO₃⁻." },
        { q: "En la reacción HCN + H₂O ⇌ CN⁻ + H₃O⁺, el agua actúa como…",
          op: ["base", "ácido", "disolvente inerte", "sal"], ok: 0, porque: "El agua acepta el H⁺ del HCN: es la base (su ácido conjugado es H₃O⁺)." },
        { q: "El pH de una disolución de HNO₃ 0,001 mol/L es…",
          op: ["3", "11", "1", "0,001"], ok: 0, porque: "Ácido fuerte: [H⁺] = 10⁻³ → pH = 3." },
        { q: "¿Qué pH tiene una disolución con [OH⁻] = 10⁻⁴ mol/L?",
          op: ["10", "4", "9", "14"], ok: 0, porque: "pOH = 4 → pH = 14 − 4 = 10." },
        { q: "Una disolución de pH 2 tiene, respecto a una de pH 4,",
          op: ["100 veces más [H⁺]", "2 veces más [H⁺]", "100 veces menos [H⁺]", "la misma [H⁺]"], ok: 0, porque: "Dos unidades de pH = factor 10² = 100 (más ácida)." },
        { q: "K<sub>a</sub> del NH₄⁺, sabiendo que K<sub>b</sub>(NH₃) = 1,8·10⁻⁵, vale…",
          op: ["5,6·10⁻¹⁰", "1,8·10⁻⁵", "1,8·10⁻⁹", "5,6·10⁻⁵"], ok: 0, porque: "K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = 10⁻¹⁴/1,8·10⁻⁵ = 5,6·10⁻¹⁰." },
        { q: "La aproximación [HA] ≈ c en un ácido débil es aceptable si…",
          op: ["α &lt; 5 %", "α &gt; 50 %", "pH &gt; 7", "K<sub>a</sub> &gt; 1"], ok: 0, porque: "Si x/c es menor del 5 %, c − x ≈ c con un error despreciable." },
        { q: "¿Cuál de estas sales da una disolución ácida?",
          op: ["NH₄Cl", "NaCl", "CH₃COONa", "KNO₃"], ok: 0, porque: "El NH₄⁺ es el ácido conjugado del NH₃ (base débil) y se hidroliza; el Cl⁻ no." },
        { q: "Se mezclan 50 mL de HCl 0,2 mol/L y 50 mL de NaOH 0,2 mol/L. El pH es…",
          op: ["7", "1", "13", "0,7"], ok: 0, porque: "Cantidades iguales: neutralización total, queda NaCl (no se hidroliza): pH = 7." },
        { q: "Una disolución reguladora de pH 4,74 se obtiene con…",
          op: ["CH₃COOH 0,1 mol/L + CH₃COONa 0,1 mol/L", "HCl + NaCl", "CH₃COOH solo", "NaOH + NaCl"], ok: 0, porque: "[base] = [ácido] → pH = pK<sub>a</sub> = 4,74 (K<sub>a</sub> = 1,8·10⁻⁵)." },
        { q: "En la valoración de NH₃ con HCl, el pH en el punto de equivalencia es…",
          op: ["menor que 7", "igual a 7", "mayor que 7", "igual a 14"], ok: 0, porque: "Queda NH₄Cl: el NH₄⁺ se hidroliza y da H₃O⁺." },
        { q: "El mejor indicador para valorar CH₃COOH con NaOH es…",
          op: ["fenolftaleína (8,2–10)", "naranja de metilo (3,1–4,4)", "rojo de metilo (4,2–6,3)", "cualquiera"], ok: 0, porque: "El pH de la equivalencia (≈ 8,7) debe caer en el intervalo de viraje." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas: ácidos y bases",
      cartas: [
        { a: "Ácido y base de Brønsted–Lowry", b: "Ácido: cede H⁺. Base: acepta H⁺. Siempre dos pares conjugados: ácido₁ + base₂ ⇌ base₁ + ácido₂." },
        { a: "Sustancia anfótera", b: "Puede actuar como ácido o como base según con quién reaccione: H₂O, HCO₃⁻, HSO₄⁻, H₂PO₄⁻." },
        { a: "K<sub>w</sub>", b: "[H⁺][OH⁻] = 10⁻¹⁴ a 25 °C (crece al subir T). pH + pOH = 14." },
        { a: "pH y pOH", b: "pH = −log[H⁺]; pOH = −log[OH⁻]. Cada unidad de pH = ×10 en [H⁺]." },
        { a: "Ácido fuerte frente a débil", b: "Fuerte: se disocia por completo ([H⁺] = c). Débil: equilibrio con K<sub>a</sub> y α pequeño; pH mayor para la misma c." },
        { a: "Grado de disociación α", b: "α = x/c (mol disociados / mol iniciales). Aumenta al diluir (α = √(K/c) si α es pequeño)." },
        { a: "Ácido débil: pH", b: "K<sub>a</sub> = x²/(c − x). Si α &lt; 5 %: x = √(K<sub>a</sub>·c). Si no, x² + K<sub>a</sub>x − K<sub>a</sub>c = 0." },
        { a: "K<sub>a</sub> · K<sub>b</sub>", b: "= K<sub>w</sub> para un par conjugado: pK<sub>a</sub> + pK<sub>b</sub> = 14. Ácido fuerte ⟹ base conjugada muy débil." },
        { a: "Mezcla fuerte–fuerte", b: "Moles de H⁺ y OH⁻ → se restan → exceso/V<sub>total</sub> → pH. Sin exceso: pH = 7." },
        { a: "Hidrólisis de una sal", b: "Solo reacciona el ion conjugado de un ácido o base débil. Anión de ácido débil: básica; catión de base débil: ácida; fuerte–fuerte: neutra." },
        { a: "Disolución reguladora", b: "Ácido débil + su base conjugada (o inversa). pH = pK<sub>a</sub> + log([base]/[ácido]). Eficaz en pK<sub>a</sub> ± 1." },
        { a: "Punto de equivalencia y semiequivalencia", b: "Equivalencia: moles de H⁺ = moles de OH⁻. Semiequivalencia (ácido débil): [HA] = [A⁻] y pH = pK<sub>a</sub>." },
        { a: "Elegir indicador", b: "Su intervalo de viraje debe contener el pH de la equivalencia: 7 (fuerte–fuerte), &gt; 7 (ácido débil), &lt; 7 (base débil)." }
      ]
    },
    emp1: {
      titulo: "Une cada dato con su significado",
      consigna: "Une cada elemento con la idea que le corresponde.",
      pares: [
        ["CH₃COO⁻", "base conjugada del CH₃COOH"],
        ["NH₄⁺", "ácido conjugado del NH₃"],
        ["K<sub>a</sub>·K<sub>b</sub>", "K<sub>w</sub> = 10⁻¹⁴"],
        ["pH = pK<sub>a</sub>", "tampón 1:1 o semiequivalencia"],
        ["NaCN (aq)", "disolución básica (hidrólisis del anión)"],
        ["NH₄Cl (aq)", "disolución ácida (hidrólisis del catión)"],
        ["Ba(OH)₂ 0,01 mol/L", "[OH⁻] = 0,02 mol/L"]
      ]
    },
    orden1: {
      titulo: "Ordena los pasos para el pH de un ácido débil",
      consigna: "Ordena los pasos del problema «pH de una disolución de ácido débil de concentración c y constante K<sub>a</sub>».",
      items: [
        { t: "Escribir el equilibrio y la expresión de K<sub>a</sub>", nota: "HA + H₂O ⇌ A⁻ + H₃O⁺" },
        { t: "Hacer la tabla inicial / cambio / equilibrio con x", nota: "c − x, x, x" },
        { t: "Sustituir en K<sub>a</sub> = x²/(c − x) y aproximar c − x ≈ c", nota: "x = √(K<sub>a</sub>·c)" },
        { t: "Comprobar que α = x/c es menor del 5 %", nota: "si no, resolver la cuadrática" },
        { t: "Calcular el pH = −log x", nota: "x = [H⁺]" }
      ]
    },
    clas1: {
      titulo: "Clasifica el ácido o la base",
      consigna: "Toca cada sustancia y después su tipo.",
      categorias: ["Ácido fuerte", "Ácido débil", "Base fuerte", "Base débil"],
      items: [
        { t: "HCl", c: 0 }, { t: "HNO₃", c: 0 }, { t: "HClO₄", c: 0 },
        { t: "CH₃COOH", c: 1 }, { t: "HF", c: 1 }, { t: "HCN", c: 1 },
        { t: "NaOH", c: 2 }, { t: "KOH", c: 2 }, { t: "Ba(OH)₂", c: 2 },
        { t: "NH₃", c: 3 }, { t: "CH₃NH₂", c: 3 }
      ]
    },
    clas2: {
      titulo: "¿Cómo es la disolución de esta sal?",
      consigna: "Toca cada sal y después el carácter de su disolución en agua.",
      categorias: ["Neutra (pH ≈ 7)", "Ácida (pH &lt; 7)", "Básica (pH &gt; 7)"],
      items: [
        { t: "NaCl", c: 0 }, { t: "KNO₃", c: 0 }, { t: "Na₂SO₄", c: 0 },
        { t: "NH₄Cl", c: 1 }, { t: "NH₄NO₃", c: 1 },
        { t: "CH₃COONa", c: 2 }, { t: "NaCN", c: 2 }, { t: "NaF", c: 2 }, { t: "KClO", c: 2 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS (★ 15 · ★★ 17 · ★★★ 16)
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  var KW = "K<sub>w</sub> = 10⁻¹⁴ a 25 °C. ";

  // ---------------- ★
  nu("c1", 1, "Calcula el pH de una disolución de HNO₃ 0,02 mol/L.", "pH =", 1.70,
    ["Ácido fuerte: se disocia por completo."], ["HNO₃ → H⁺ + NO₃⁻: [H⁺] = 0,02 mol/L.", "pH = −log 0,02 = 1,70."], "pH = 1,70", 0.01);
  nu("c2", 1, "Calcula el pH de una disolución de NaOH 0,005 mol/L a 25 °C.", "pH =", 11.70,
    ["Base fuerte: primero el pOH."], ["[OH⁻] = 0,005 mol/L → pOH = −log 0,005 = 2,30.", "pH = 14 − 2,30 = 11,70."], "pH = 11,70", 0.01);
  op("c3", 1, "¿Cuál es la base conjugada del ion H₂PO₄⁻?", "Base conjugada", ["HPO₄²⁻", "H₃PO₄", "PO₄³⁻", "H₃O⁺"], 0,
    ["Quita un H⁺ al ácido."], ["Ácido: H₂PO₄⁻. Quitamos un H⁺: HPO₄²⁻ (la carga baja una unidad).", "El H₃PO₄ es su ácido conjugado (le añadiríamos el H⁺)."], "HPO₄²⁻");
  nu("c4", 1, "Una disolución tiene pH = 9,0. ¿Cuánto vale [OH⁻] en mol/L? " + KW + "(Escribe la potencia así: 1*10^-5.)", "[OH⁻] (mol/L) =", 1e-5,
    ["Primero el pOH."], ["pOH = 14 − 9,0 = 5,0.", "[OH⁻] = 10<sup>−5</sup> = 1·10⁻⁵ mol/L."], "[OH⁻] = 1·10⁻⁵ mol/L");
  nu("c5", 1, "Calcula el pH de una disolución de Ba(OH)₂ 0,001 mol/L.", "pH =", 11.30,
    ["Cada fórmula da 2 OH⁻."], ["Ba(OH)₂ → Ba²⁺ + 2 OH⁻: [OH⁻] = 2·10⁻³ mol/L.", "pOH = 2,70 → pH = 11,30."], "pH = 11,30", 0.01);
  nu("c6", 1, "Se diluyen 25 mL de HCl 0,2 mol/L hasta 500 mL. ¿Qué pH tiene la disolución final?", "pH =", 2.00,
    ["Los moles no cambian al diluir."], ["n = 0,025 · 0,2 = 5·10⁻³ mol.", "c = 5·10⁻³ / 0,5 = 0,01 mol/L → pH = 2,00."], "pH = 2,00", 0.01);
  op("c7", 1, "En NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, según Brønsted–Lowry, el agua actúa como…", "El agua es…", ["ácido", "base", "ni ácido ni base", "sal"], 0,
    ["¿Gana o pierde un H⁺?"], ["El NH₃ coge un H⁺ del agua, que se queda en OH⁻.", "El agua <b>cede</b> el protón: es el ácido (y OH⁻ su base conjugada)."], "El agua actúa como ácido");
  nu("c8", 1, "Calcula el pK<sub>b</sub> del ion acetato (CH₃COO⁻), sabiendo que K<sub>a</sub>(CH₃COOH) = 1,8·10⁻⁵.", "pK<sub>b</sub> =", 9.26,
    ["K<sub>a</sub>·K<sub>b</sub> = K<sub>w</sub>, o pK<sub>a</sub> + pK<sub>b</sub> = 14."], ["pK<sub>a</sub> = −log(1,8·10⁻⁵) = 4,74, luego pK<sub>b</sub> = 14 − 4,74 = 9,26.", "Equivale a K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = 5,6·10⁻¹⁰."], "pK<sub>b</sub> = 9,26 (K<sub>b</sub> = 5,6·10⁻¹⁰)", 0.005);
  nu("c9", 1, "Se disuelven 0,73 g de HCl en agua hasta 250 mL. Calcula el pH. (M(HCl) = 36,5 g/mol)", "pH =", 1.10,
    ["Moles, concentración y pH."], ["n = 0,73 / 36,5 = 0,020 mol.", "c = 0,020 / 0,250 = 0,080 mol/L → pH = −log 0,08 = 1,10."], "pH = 1,10", 0.01);
  nu("c10", 1, "¿Qué volumen (mL) de NaOH 0,1 mol/L neutraliza 20 mL de HCl 0,05 mol/L?", "Volumen (mL) =", 10,
    ["Moles de H⁺ = moles de OH⁻."], ["n(H⁺) = 0,020 · 0,05 = 1,0·10⁻³ mol.", "V = 1,0·10⁻³ / 0,1 = 0,010 L = 10 mL."], "10 mL");
  nu("c11", 1, "Una disolución 0,1 mol/L de un ácido monoprótico HA tiene pH = 3,00. Calcula su grado de disociación (en %).", "α (%) =", 1,
    ["[H⁺] = x."], ["[H⁺] = 10⁻³ mol/L = x.", "α = x/c = 10⁻³/0,1 = 0,01 = 1 %."], "α = 1 %", 0.02);
  op("c12", 1, "¿Cuál de estas sales produce una disolución neutra?", "Sal neutra", ["KNO₃", "NH₄Cl", "NaCN", "CH₃COONa"], 0,
    ["Mira si los dos iones vienen de un ácido y una base fuertes."], ["KNO₃: K⁺ (de KOH, fuerte) y NO₃⁻ (de HNO₃, fuerte): ninguno se hidroliza.", "NH₄Cl es ácida; NaCN y CH₃COONa, básicas."], "KNO₃");
  nu("c13", 1, "Una disolución tiene [H⁺] = 3,2·10⁻⁴ mol/L. ¿Cuál es su pH?", "pH =", 3.49,
    ["pH = −log[H⁺]."], ["pH = −log(3,2·10⁻⁴) = 4 − log 3,2 = 4 − 0,505 = 3,49."], "pH = 3,49", 0.01);
  op("c14", 1, "¿Cuál de estos ácidos es fuerte en agua?", "Ácido fuerte", ["HNO₃", "HF", "HCN", "CH₃COOH"], 0,
    ["Los ácidos fuertes se aprenden: HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ (1.ª ionización)."], ["Los otros tres tienen K<sub>a</sub> pequeñas (6,8·10⁻⁴, 4,9·10⁻¹⁰ y 1,8·10⁻⁵)."], "HNO₃");
  nu("c15", 1, "Calcula el pK<sub>a</sub> del ion NH₄⁺, sabiendo que K<sub>b</sub>(NH₃) = 1,8·10⁻⁵.", "pK<sub>a</sub> =", 9.26,
    ["pK<sub>a</sub> + pK<sub>b</sub> = 14."], ["pK<sub>b</sub> = −log(1,8·10⁻⁵) = 4,74.", "pK<sub>a</sub> = 14 − 4,74 = 9,26."], "pK<sub>a</sub> = 9,26", 0.01);

  // ---------------- ★★
  ge("c16", 2, "Calcula el pH y el grado de disociación (en %) de una disolución de CH₃COOH 0,05 mol/L (K<sub>a</sub> = 1,8·10⁻⁵).",
    [{ tipo: "num", etiqueta: "pH =", valor: 3.02, tol: 0.01 }, { tipo: "num", etiqueta: "α (%) =", valor: 1.9, tol: 0.02 }],
    ["Tabla ICE y aproximación."], ["x = √(1,8·10⁻⁵ · 0,05) = 9,49·10⁻⁴ mol/L.", "α = x/c = 1,9 % &lt; 5 %: la aproximación vale.", "pH = −log(9,49·10⁻⁴) = 3,02."], "pH = 3,02; α = 1,9 %");
  ge("c17", 2, "Calcula el pH y el grado de ionización (en %) de una disolución de NH₃ 0,05 mol/L (K<sub>b</sub> = 1,8·10⁻⁵).",
    [{ tipo: "num", etiqueta: "pH =", valor: 10.98, tol: 0.01 }, { tipo: "num", etiqueta: "α (%) =", valor: 1.9, tol: 0.02 }],
    ["Con K<sub>b</sub>, x = [OH⁻]."], ["x = √(1,8·10⁻⁵ · 0,05) = 9,49·10⁻⁴ mol/L = [OH⁻]; α = 1,9 %.", "pOH = 3,02 → pH = 14 − 3,02 = 10,98."], "pH = 10,98; α = 1,9 %");
  nu("c18", 2, "Una disolución 0,1 mol/L de un ácido monoprótico débil HA tiene pH = 2,50. Calcula K<sub>a</sub>. (Escribe la potencia así: 1,03*10^-4.)", "K<sub>a</sub> =", 1.03e-4,
    ["Del pH sale x; [HA] = c − x."], ["x = 10<sup>−2,5</sup> = 3,16·10⁻³ mol/L = [H⁺] = [A⁻].", "[HA] = 0,1 − 0,00316 = 0,0968 mol/L.", "K<sub>a</sub> = x²/[HA] = 1,0·10⁻⁵/0,0968 = 1,03·10⁻⁴."], "K<sub>a</sub> = 1,03·10⁻⁴", 0.02);
  nu("c19", 2, "Se mezclan 100 mL de HCl 0,05 mol/L con 50 mL de NaOH 0,02 mol/L. Calcula el pH.", "pH =", 1.57,
    ["Moles de cada uno, reacción y exceso."], ["n(H⁺) = 0,1 · 0,05 = 5,0 mmol; n(OH⁻) = 0,05 · 0,02 = 1,0 mmol.", "Sobran 4,0 mmol de H⁺ en 150 mL: [H⁺] = 0,0267 mol/L.", "pH = −log 0,0267 = 1,57."], "pH = 1,57", 0.01);
  nu("c20", 2, "Se mezclan 50 mL de KOH 0,1 mol/L con 25 mL de HNO₃ 0,12 mol/L. Calcula el pH.", "pH =", 12.43,
    ["¿De cuál sobran moles?"], ["n(OH⁻) = 5,0 mmol; n(H⁺) = 3,0 mmol → sobran 2,0 mmol de OH⁻ en 75 mL.", "[OH⁻] = 0,0267 mol/L → pOH = 1,57 → pH = 12,43."], "pH = 12,43", 0.01);
  nu("c21", 2, "Calcula el pH de una disolución de CH₃COONa 0,2 mol/L (K<sub>a</sub> del ácido acético = 1,8·10⁻⁵).", "pH =", 9.02,
    ["El anión se hidroliza: K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub>."], ["K<sub>b</sub>(CH₃COO⁻) = 5,56·10⁻¹⁰.", "x = [OH⁻] = √(5,56·10⁻¹⁰ · 0,2) = 1,05·10⁻⁵ mol/L.", "pOH = 4,98 → pH = 9,02."], "pH = 9,02", 0.01);
  nu("c22", 2, "Calcula el pH de una disolución de NH₄NO₃ 0,05 mol/L (K<sub>b</sub> del NH₃ = 1,8·10⁻⁵).", "pH =", 5.28,
    ["El NO₃⁻ no reacciona; el NH₄⁺ sí."], ["K<sub>a</sub>(NH₄⁺) = 5,56·10⁻¹⁰.", "x = [H⁺] = √(5,56·10⁻¹⁰ · 0,05) = 5,27·10⁻⁶ mol/L.", "pH = 5,28."], "pH = 5,28", 0.01);
  nu("c23", 2, "Para neutralizar totalmente 20 mL de H₃PO₄ se gastan 24 mL de NaOH 0,25 mol/L. Calcula la concentración del H₃PO₄ (mol/L).", "C (mol/L) =", 0.1,
    ["El H₃PO₄ cede 3 H⁺."], ["n(OH⁻) = 0,024 · 0,25 = 6,0·10⁻³ mol.", "Cada H₃PO₄ aporta 3 H⁺: n(H₃PO₄) = 6,0·10⁻³/3 = 2,0·10⁻³ mol.", "C = 2,0·10⁻³/0,020 = 0,1 mol/L."], "0,1 mol/L");
  nu("c24", 2, "Calcula el pH de una disolución reguladora con CH₃COOH 0,2 mol/L y CH₃COONa 0,4 mol/L (K<sub>a</sub> = 1,8·10⁻⁵).", "pH =", 5.05,
    ["Henderson–Hasselbalch."], ["pK<sub>a</sub> = 4,74.", "pH = 4,74 + log(0,4/0,2) = 4,74 + 0,30 = 5,05."], "pH = 5,05", 0.01);
  nu("c25", 2, "¿Cuántos gramos de NaOH (M = 40 g/mol) hay que disolver para preparar 500 mL de disolución de pH 12,5?", "Masa (g) =", 0.632,
    ["Del pH al pOH y a [OH⁻]."], ["pOH = 1,5 → [OH⁻] = 10⁻¹·⁵ = 0,0316 mol/L.", "n = 0,0316 · 0,5 = 0,0158 mol.", "m = 0,0158 · 40 = 0,632 g."], "0,63 g", 0.01);
  nu("c26", 2, "Un ácido débil HA, de K<sub>a</sub> = 1,0·10⁻⁵, está 0,01 mol/L. Calcula el pH (resolviendo la ecuación de segundo grado si hace falta).", "pH =", 3.51,
    ["Comprueba α con la aproximación."], ["Aproximado: x = √(10⁻⁵ · 10⁻²) = 3,16·10⁻⁴ → α = 3,2 % &lt; 5 %: vale (pH = 3,50).", "Exacto: x² + 10⁻⁵x − 10⁻⁷ = 0 → x = 3,11·10⁻⁴ → pH = 3,51. Las dos valen."], "pH = 3,51", 0.01);
  op("c27", 2, "De estas disoluciones 0,1 mol/L, ¿cuál tiene el pH más alto?", "Mayor pH", ["CH₃COONa", "NaCl", "NH₄Cl", "HCl"], 0,
    ["Una sal básica, una neutra, una ácida y un ácido."], ["pH aproximados: CH₃COONa 8,9; NaCl 7,0; NH₄Cl 5,1; HCl 1,0."], "CH₃COONa");
  op("c28", 2, "¿Cuál de estas mezclas es una disolución reguladora?", "Reguladora", ["CH₃COOH + CH₃COONa", "HCl + NaCl", "NaOH + NaCl", "CH₃COOH + NaCl"], 0,
    ["Hace falta un ácido débil y su base conjugada."], ["CH₃COOH es un ácido débil y CH₃COO⁻ (de la sal) su base conjugada.", "En las demás, falta uno de los dos: HCl y NaOH son fuertes, y el Cl⁻ no es la base conjugada del CH₃COOH."], "CH₃COOH + CH₃COONa");
  nu("c29", 2, "20 mL de HCl 0,1 mol/L se valoran con NaOH 0,1 mol/L. ¿Qué pH hay después de añadir 15 mL de NaOH?", "pH =", 1.85,
    ["Todavía no se ha llegado a la equivalencia."], ["n(H⁺) = 2,0 mmol; n(OH⁻) = 1,5 mmol → sobran 0,5 mmol de H⁺ en 35 mL.", "[H⁺] = 0,0143 mol/L → pH = 1,85."], "pH = 1,85", 0.01);
  nu("c30", 2, "Calcula el pH de una disolución de HCl 10⁻⁸ mol/L (a 25 °C), contando los H⁺ del agua.", "pH =", 6.98,
    ["[H⁺] = 10⁻⁸ + [OH⁻] = 10⁻⁸ + 10⁻¹⁴/[H⁺]."], ["[H⁺]² − 10⁻⁸[H⁺] − 10⁻¹⁴ = 0 → [H⁺] = 1,05·10⁻⁷ mol/L.", "pH = 6,98: casi neutro (no 8)."], "pH = 6,98", 0.005);
  nu("c31", 2, "Un ácido débil tiene pK<sub>a</sub> = 4,74. ¿Qué cociente [A⁻]/[HA] hace falta para que un tampón tenga pH = 5,74?", "[A⁻]/[HA] =", 10,
    ["pH − pK<sub>a</sub> = log del cociente."], ["5,74 − 4,74 = 1 = log([A⁻]/[HA]).", "Cociente = 10¹ = 10."], "10");
  nu("c32", 2, "Se mezclan 50 mL de H₂SO₄ 0,05 mol/L con 50 mL de NaOH 0,08 mol/L. Calcula el pH (considera el H₂SO₄ totalmente disociado en 2 H⁺).", "pH =", 2.00,
    ["El H₂SO₄ da 2 H⁺."], ["n(H⁺) = 2 · 0,050 · 0,05 = 5,0 mmol; n(OH⁻) = 0,050 · 0,08 = 4,0 mmol.", "Sobra 1,0 mmol de H⁺ en 100 mL → 0,010 mol/L → pH = 2,00."], "pH = 2,00", 0.01);

  // ---------------- ★★★
  ge("c33", 3, "Calcula el pH y el grado de disociación (en %) de HNO₂ 0,02 mol/L (K<sub>a</sub> = 4,5·10⁻⁴). Comprueba antes si vale la aproximación.",
    [{ tipo: "num", etiqueta: "pH =", valor: 2.56, tol: 0.01 }, { tipo: "num", etiqueta: "α (%) =", valor: 13.9, tol: 0.02 }],
    ["Aproximado, α sale mayor del 5 %."], ["Aproximado: x = √(4,5·10⁻⁴ · 0,02) = 3,0·10⁻³ → α = 15 % &gt; 5 %: no vale.", "Exacto: x² + 4,5·10⁻⁴x − 9,0·10⁻⁶ = 0 → x = 2,78·10⁻³ mol/L.", "α = 13,9 % y pH = −log(2,78·10⁻³) = 2,56."], "pH = 2,56; α = 13,9 %");
  nu("c34", 3, "Se mezclan 40 mL de NH₃ 0,1 mol/L con 15 mL de HCl 0,1 mol/L. Calcula el pH (K<sub>b</sub> = 1,8·10⁻⁵).", "pH =", 9.48,
    ["Queda NH₃ sin reaccionar y se forma NH₄⁺: es un tampón."], ["n(NH₃) = 4,0 mmol; n(H⁺) = 1,5 mmol. NH₃ + H⁺ → NH₄⁺: quedan 2,5 mmol de NH₃ y 1,5 mmol de NH₄⁺.", "pK<sub>a</sub>(NH₄⁺) = 9,255.", "pH = 9,255 + log(2,5/1,5) = 9,255 + 0,222 = 9,48."], "pH = 9,48", 0.005);
  nu("c35", 3, "25 mL de HCOOH 0,2 mol/L (K<sub>a</sub> = 1,8·10⁻⁴) se valoran con NaOH 0,2 mol/L. Calcula el pH en el punto de equivalencia.", "pH =", 8.37,
    ["En la equivalencia solo hay formiato de sodio."], ["V<sub>eq</sub> = 25 mL: 5,0 mmol de HCOO⁻ en 50 mL → c = 0,10 mol/L.", "K<sub>b</sub> = 10⁻¹⁴/1,8·10⁻⁴ = 5,56·10⁻¹¹; x = [OH⁻] = √(5,56·10⁻¹¹ · 0,1) = 2,36·10⁻⁶.", "pOH = 5,63 → pH = 8,37."], "pH = 8,37", 0.005);
  op("c36", 3, "Para valorar NH₃ con HCl, ¿qué indicador es más adecuado? (El pH de la equivalencia es ≈ 5,2.)", "Indicador", ["rojo de metilo (4,2–6,3)", "fenolftaleína (8,2–10,0)", "azul de bromotimol (6,0–7,6)", "timolftaleína (9,3–10,5)"], 0,
    ["Su intervalo debe contener el pH de la equivalencia."], ["En la equivalencia hay NH₄Cl, que se hidroliza: pH &lt; 7.", "Solo el rojo de metilo (4,2–6,3) contiene 5,2."], "Rojo de metilo");
  op("c37", 3, "Valoramos CH₃COOH con NaOH. ¿Por qué se usa fenolftaleína y no naranja de metilo?", "Razón", ["El pH de la equivalencia es ≈ 8,7, dentro del viraje de la fenolftaleína", "La fenolftaleína es más barata", "El naranja de metilo reacciona con el NaOH", "En la equivalencia el pH es 4,4"], 0,
    ["¿Cómo es la sal que se forma?"], ["Se forma CH₃COONa: el CH₃COO⁻ se hidroliza y deja pH ≈ 8,7.", "El naranja de metilo vira entre 3,1 y 4,4: lo haría muy pronto, con mucho ácido sin neutralizar."], "pH de equivalencia ≈ 8,7");
  nu("c38", 3, "A 200 mL de un tampón con CH₃COOH 0,2 mol/L y CH₃COONa 0,2 mol/L se añaden 5,0 mmol de HCl (sin cambio de volumen). Calcula el pH.", "pH =", 4.64,
    ["Calcula los mmol de cada componente y haz reaccionar el HCl con el acetato."], ["n(CH₃COOH) = 40 mmol; n(CH₃COO⁻) = 40 mmol.", "CH₃COO⁻ + H⁺ → CH₃COOH: quedan 35 mmol de acetato y 45 de ácido.", "pH = 4,745 + log(35/45) = 4,745 − 0,109 = 4,64."], "pH = 4,64", 0.005);
  nu("c39", 3, "A 100 mL de CH₃COOH 0,4 mol/L se añade NaOH 0,2 mol/L hasta que el pH vale 5,00. ¿Qué volumen (mL) de NaOH se ha añadido? (K<sub>a</sub> = 1,8·10⁻⁵)", "Volumen (mL) =", 128.6,
    ["Si se añaden x mmol de OH⁻, quedan 40 − x de ácido y se forman x de acetato."], ["n(ácido) = 40 mmol. 5,00 = 4,745 + log(x/(40 − x)) → x/(40 − x) = 10<sup>0,255</sup> = 1,80.", "x = 1,80 · 40 / 2,80 = 25,7 mmol de OH⁻.", "V = 25,7 mmol / 0,2 mol/L = 128,6 mL."], "128,6 mL", 0.01);
  nu("c40", 3, "En la valoración de 25 mL de un ácido débil monoprótico con NaOH, tras añadir justo la mitad del volumen de equivalencia el pH es 4,76. Calcula K<sub>a</sub>. (Escribe la potencia así: 1,74*10^-5.)", "K<sub>a</sub> =", 1.74e-5,
    ["En la semiequivalencia [HA] = [A⁻]."], ["En la semiequivalencia, pH = pK<sub>a</sub> → pK<sub>a</sub> = 4,76.", "K<sub>a</sub> = 10<sup>−4,76</sup> = 1,74·10⁻⁵."], "K<sub>a</sub> = 1,74·10⁻⁵", 0.02);
  nu("c41", 3, "Se disuelven 0,4210 g de ftalato ácido de potasio (KHP, ácido monoprótico, M = 204,22 g/mol) y se valoran con NaOH, gastándose 20,5 mL. Calcula la concentración del NaOH (mol/L).", "C (mol/L) =", 0.1006,
    ["Monoprótico: n(NaOH) = n(KHP)."], ["n(KHP) = 0,4210 / 204,22 = 2,061·10⁻³ mol.", "C(NaOH) = 2,061·10⁻³ / 0,0205 = 0,1006 mol/L."], "0,1006 mol/L", 0.005);
  nu("c42", 3, "¿Qué concentración (mol/L) debe tener una disolución de CH₃COOH (K<sub>a</sub> = 1,8·10⁻⁵) para que su pH sea 3,00?", "c (mol/L) =", 0.0566,
    ["De K<sub>a</sub> = x²/(c − x), despeja c."], ["x = [H⁺] = 10⁻³ mol/L.", "c = x²/K<sub>a</sub> + x = 10⁻⁶/1,8·10⁻⁵ + 10⁻³ = 0,0556 + 0,0010 = 0,0566 mol/L."], "c = 0,0566 mol/L", 0.01);
  nu("c43", 3, "Se mezclan 50 mL de NH₃ 0,1 mol/L con 25 mL de HCl 0,1 mol/L. Calcula el pH (K<sub>b</sub> = 1,8·10⁻⁵).", "pH =", 9.26,
    ["Es justo la mitad de la neutralización."], ["n(NH₃) = 5,0 mmol; n(H⁺) = 2,5 mmol → quedan 2,5 mmol de NH₃ y se forman 2,5 mmol de NH₄⁺.", "[base] = [ácido] → pH = pK<sub>a</sub>(NH₄⁺) = 9,26."], "pH = 9,26", 0.005);
  ge("c44", 3, "Calcula el pH y el grado de ionización (en %) de CH₃NH₂ 0,1 mol/L (K<sub>b</sub> = 4,4·10⁻⁴). Justifica si vale la aproximación.",
    [{ tipo: "num", etiqueta: "pH =", valor: 11.81, tol: 0.005 }, { tipo: "num", etiqueta: "α (%) =", valor: 6.4, tol: 0.02 }],
    ["Aproximada, α supera el 5 %."], ["Aproximado: x = √(4,4·10⁻⁴ · 0,1) = 6,6·10⁻³ → α = 6,6 % &gt; 5 %: no vale.", "Exacto: x² + 4,4·10⁻⁴x − 4,4·10⁻⁵ = 0 → x = 6,42·10⁻³ mol/L = [OH⁻]; α = 6,4 %.", "pOH = 2,19 → pH = 11,81."], "pH = 11,81; α = 6,4 %");
  nu("c45", 3, "Calcula el pH de una disolución de NaF 0,5 mol/L (K<sub>a</sub>(HF) = 6,8·10⁻⁴).", "pH =", 8.43,
    ["El F⁻ es la base conjugada de un ácido débil."], ["K<sub>b</sub>(F⁻) = 10⁻¹⁴/6,8·10⁻⁴ = 1,47·10⁻¹¹.", "x = [OH⁻] = √(1,47·10⁻¹¹ · 0,5) = 2,71·10⁻⁶ mol/L.", "pOH = 5,57 → pH = 8,43."], "pH = 8,43", 0.005);
  nu("c46", 3, "A 25 mL de HCl 0,1 mol/L se le añade NaOH 0,1 mol/L. ¿Qué volumen total (mL) de NaOH hay que añadir para que el pH sea 12?", "Volumen (mL) =", 30.6,
    ["pH 12 → [OH⁻] = 0,01 mol/L en el volumen total."], ["Sea V el volumen de NaOH. Exceso de OH⁻ = 0,1 V − 2,5 mmol; volumen total 25 + V.", "(0,1 V − 2,5)/(25 + V) = 0,01 → 0,1 V − 2,5 = 0,25 + 0,01 V → 0,09 V = 2,75.", "V = 30,6 mL."], "30,6 mL", 0.005);
  ge("c47", 3, "Explica por qué una disolución de acetato de sodio (CH₃COONa) es básica y no neutra, a pesar de ser una sal.",
    { tipo: "rubrica", etiqueta: "Tu explicación", filas: 5, items: [
      { t: "Se disocia por completo: CH₃COONa → Na⁺ + CH₃COO⁻", p: 0.2 },
      { t: "El Na⁺ procede de una base fuerte (NaOH): no reacciona con el agua", p: 0.25 },
      { t: "El CH₃COO⁻ es la base conjugada de un ácido débil: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻ (hidrólisis)", p: 0.35 },
      { t: "Se liberan OH⁻ ([OH⁻] &gt; [H⁺]): pH &gt; 7 (≈ 8,9 para 0,1 mol/L)", p: 0.2 }] },
    ["Distingue qué ion reacciona con el agua y cuál no."],
    ["Los dos iones salen de la sal; solo uno viene de un ácido o base débil.", "K<sub>b</sub>(CH₃COO⁻) = K<sub>w</sub>/K<sub>a</sub> = 5,6·10⁻¹⁰: poca hidrólisis, pero suficiente para pH &gt; 7."], "El acetato se hidroliza y libera OH⁻");
  ge("c48", 3, "En la valoración de CH₃COOH 0,1 mol/L con NaOH 0,1 mol/L, describe cómo es el pH al empezar, en la semiequivalencia y en la equivalencia, y justifica el indicador.",
    { tipo: "rubrica", etiqueta: "Tu respuesta", filas: 6, items: [
      { t: "Al empezar: ácido débil, pH ≈ 2,9 (√(K<sub>a</sub>·c))", p: 0.2 },
      { t: "Semiequivalencia: [CH₃COOH] = [CH₃COO⁻] (tampón), pH = pK<sub>a</sub> = 4,74", p: 0.25 },
      { t: "Equivalencia: solo CH₃COO⁻, que se hidroliza: pH ≈ 8,7 &gt; 7", p: 0.3 },
      { t: "Indicador cuyo intervalo de viraje contiene 8,7: fenolftaleína (8,2–10)", p: 0.25 }] },
    ["Recuerda las cuatro zonas de la curva."],
    ["Inicio: ácido débil. Antes de la equivalencia: tampón. Equivalencia: hidrólisis. Después: exceso de NaOH.", "El indicador debe virar dentro del salto, alrededor de pH 8,7."], "Fenolftaleína");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "pH, fuerza y constantes: fórmulas del tema",
      items: [
        { label: "pH y pOH", formula: "pH = −log[H⁺] · pOH = −log[OH⁻] · pH + pOH = 14", cuando: "Siempre a 25 °C.", ejemplo: "[H⁺] = 10⁻⁵ → pH 5 → [OH⁻] = 10⁻⁹.", ojo: "Ba(OH)₂ y Ca(OH)₂ dan 2 OH⁻." },
        { label: "Ácido o base débil", formula: "K = x²/(c − x) ⟹ x = √(K·c) si α &lt; 5 %", cuando: "x = [H⁺] (ácido) o [OH⁻] (base).", ejemplo: "CH₃COOH 0,1 M: x = 1,3·10⁻³ → pH 2,87.", ojo: "Comprueba α = x/c; si α ≥ 5 %, ecuación de 2.º grado." },
        { label: "Par conjugado", formula: "K<sub>a</sub>·K<sub>b</sub> = K<sub>w</sub> · pK<sub>a</sub> + pK<sub>b</sub> = 14", cuando: "Hidrólisis y pares ácido–base.", ejemplo: "K<sub>b</sub>(CH₃COO⁻) = 5,6·10⁻¹⁰." },
        { label: "Tampón", formula: "pH = pK<sub>a</sub> + log([base]/[ácido])", cuando: "Ácido débil + su base conjugada.", ejemplo: "0,2 M ácido y 0,4 M base: 4,74 + log 2 = 5,05.", ojo: "Si se añade ácido o base fuertes, reacciona primero." }
      ],
      nota: "Fuertes: HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ (1.ª). Bases fuertes: hidróxidos de alcalinos y de Ca, Sr, Ba." },
    { titulo: "¿Qué tipo de problema es?", ancha: true,
      tabla: { cab: ["Datos", "Método"], filas: [
        ["ácido o base fuerte + c", "[H⁺] o [OH⁻] = c·(nº H⁺/OH⁻); pH directo"],
        ["ácido o base débil + c + K", "tabla ICE; x = √(K·c); α &lt; 5 %"],
        ["mezcla de ácido y base fuertes", "moles → exceso → ÷ V<sub>total</sub> → pH"],
        ["sal", "¿ion de débil? K<sub>h</sub> = K<sub>w</sub>/K → pH"],
        ["ácido débil + su sal", "tampón: Henderson–Hasselbalch"],
        ["bureta", "a·C·V = b·C·V; pH de equivalencia por hidrólisis"]
      ] },
      nota: "Escribe siempre la reacción y di si cada especie es fuerte o débil." },
    { titulo: "Hidrólisis de sales", ancha: true,
      tabla: { cab: ["Sal de…", "Ejemplo", "Se hidroliza", "pH"], filas: [
        ["ác. fuerte + base fuerte", "NaCl, KNO₃", "nada", "7"],
        ["ác. débil + base fuerte", "CH₃COONa, NaCN, NaF", "el anión", "&gt; 7"],
        ["ác. fuerte + base débil", "NH₄Cl, NH₄NO₃", "el catión", "&lt; 7"],
        ["ác. débil + base débil", "NH₄CN, CH₃COONH₄", "los dos", "según K"]
      ] },
      nota: "«El más fuerte gana». Na⁺, K⁺, Cl⁻ y NO₃⁻ son espectadores." },
    { titulo: "Valoraciones e indicadores", ancha: true,
      tabla: { cab: ["Valoración", "pH en la equivalencia", "Indicador"], filas: [
        ["fuerte + fuerte", "7", "azul de bromotimol (6,0–7,6)"],
        ["ácido débil + base fuerte", "&gt; 7 (≈ 8,7)", "fenolftaleína (8,2–10)"],
        ["base débil + ácido fuerte", "&lt; 7 (≈ 5,3)", "rojo de metilo (4,2–6,3)"]
      ] },
      nota: "Semiequivalencia de un ácido débil: pH = pK<sub>a</sub>. Elige el indicador cuyo viraje contiene el pH de la equivalencia." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "pH 3 → pH 6: «3 veces más ácido»", bien: "1000 veces menos [H⁺]", por: "Escala logarítmica." },
        { mal: "Ba(OH)₂ 0,01 M: [OH⁻] = 0,01", bien: "[OH⁻] = 0,02 (2 OH⁻)", por: "Cuenta los OH⁻ por fórmula." },
        { mal: "HCl 10⁻⁸ M: pH = 8", bien: "pH = 6,98", por: "Hay que sumar el H⁺ del agua." },
        { mal: "Ácido débil: [H⁺] = c", bien: "[H⁺] = x, con K<sub>a</sub> = x²/(c − x)", por: "Solo el fuerte se disocia por completo." },
        { mal: "Dividir por el volumen de un reactivo", bien: "Dividir por el volumen total", por: "Tras mezclar, todo está en la suma." },
        { mal: "NaCN o NH₄Cl: pH 7 (son sales)", bien: "Básica y ácida (hidrólisis)", por: "El ion de ácido o base débil reacciona." },
        { mal: "Equivalencia = pH 7", bien: "Depende de la sal formada", por: "Hidrólisis tras la neutralización." }
      ] }
  ];

  B.registrar("quimica2", "t7", { resumen: resumen, secciones: B.parte.q2t7a.secciones, nuevas: B.parte.q2t7b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
