/* ============================================================
   Química II · ampliaciones · Tema 6: Equilibrio químico
   (parte C: resumen, actividades, ejercicios, láminas y registro final de las partes A, B y C)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, H = B.h, fr = H.fr;
  function w(n, ref) { return H.w(n, ref && "quimica2/t6/" + ref); }
  function env(h) { return "<div class='mv q3f'>" + h + "</div>"; }
  var A = B.parte.q2t6a, P = B.parte.q2t6b;

  var resumen = [
    "<b>Equilibrio dinámico</b>: v directa = v inversa; las concentraciones son constantes, no iguales. K depende solo de la temperatura y dice <em>hasta dónde</em> llega la reacción, no lo rápida que es.",
    "<b>K<sub>c</sub> y K<sub>p</sub></b>: productos entre reactivos, cada uno elevado a su coeficiente; sólidos y líquidos puros no figuran. K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup> con Δn solo de gases, T en K y R = 0,082 atm·L·mol⁻¹·K⁻¹. Presiones parciales: p<sub>i</sub> = x<sub>i</sub>·P.",
    "<b>Operar con K</b>: invertir → 1/K; multiplicar coeficientes por n → Kⁿ; sumar reacciones → producto de las K.",
    "<b>Tabla ICE</b>: inicial, cambio (−a·x, +b·x), equilibrio; pasa a mol/L (o a presiones parciales) antes de sustituir. Con α: moles disociados = n₀α. Si sale 2.º grado, resuélvelo (aproximar solo si x &lt; 5 %).",
    "<b>Q frente a K</b>: Q &lt; K → hacia productos; Q &gt; K → hacia reactivos; Q = K → equilibrio. Tras una perturbación, el «inicial» de la nueva tabla es el equilibrio anterior modificado.",
    "<b>Le Chatelier</b>: concentración y volumen/presión cambian Q (K igual); gas inerte a V constante no desplaza, a P constante equivale a bajar la presión; catalizador no desplaza; solo la temperatura cambia K (exotérmica: sube T → K baja; endotérmica: K sube).",
    "<b>Equilibrio heterogéneo</b>: con un solo gas, K<sub>p</sub> = presión de ese gas; hace falta sólido suficiente para alcanzarla.",
    "<b>Solubilidad y K<sub>s</sub></b>: K<sub>s</sub> = [catión]<sup>m</sup>[anión]<sup>n</sup>; AB: s = √K<sub>s</sub>; AB₂ o A₂B: s = ∛(K<sub>s</sub>/4). No compares K<sub>s</sub> de sales de distinta estequiometría: calcula s.",
    "<b>Ion común y precipitación</b>: un ion común disminuye s (K<sub>s</sub> no cambia). Al mezclar, diluye primero (c·V/V<sub>total</sub>) y compara Q con K<sub>s</sub>: Q &gt; K<sub>s</sub> precipita. Precipita primero la sal que necesita menos catión."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = A.datos;
  datos.tarjetas1 = {
    titulo: "Tarjetas del tema",
    cartas: [
      { a: "Equilibrio químico", b: "Estado en que la velocidad de la reacción directa es igual a la de la inversa: las concentraciones no cambian, pero la reacción no se ha parado (es dinámico)." },
      { a: "K<sub>c</sub>", b: "Cociente de las concentraciones de equilibrio de productos y reactivos, cada una elevada a su coeficiente. Sin sólidos ni líquidos puros. Solo depende de T." },
      { a: "K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>", b: "Δn = moles de gas de productos − moles de gas de reactivos. T en K; con R = 0,082, presiones en atm." },
      { a: "Presión parcial", b: "p<sub>i</sub> = x<sub>i</sub>·P<sub>total</sub> = n<sub>i</sub>RT/V. Las parciales suman la total." },
      { a: "Cociente de reacción Q", b: "Se calcula como K pero con las concentraciones de un instante cualquiera. Q &lt; K: hacia productos. Q &gt; K: hacia reactivos." },
      { a: "Tabla ICE", b: "Inicial · Cambio (−a·x, +b·x) · Equilibrio. Se sustituye en K en concentraciones (n/V) o en presiones parciales." },
      { a: "Grado de disociación α", b: "Fracción de moles iniciales que se han disociado: α = moles disociados / n₀. En PCl₅ ⇌ PCl₃ + Cl₂: K<sub>p</sub> = α²P/(1 − α²)." },
      { a: "Le Chatelier", b: "Si se perturba un equilibrio, evoluciona en el sentido que contrarresta la perturbación. Se razona mejor comparando Q con K." },
      { a: "Qué cambia K", b: "Solo la temperatura. Concentración, volumen, presión, gas inerte y catalizador no cambian K." },
      { a: "Gas inerte", b: "A V y T constantes no desplaza el equilibrio. A P y T constantes el volumen crece y se favorece el lado con más moles de gas." },
      { a: "Catalizador y equilibrio", b: "Acelera por igual los dos sentidos: se llega antes al equilibrio, pero K y las concentraciones finales no cambian." },
      { a: "van't Hoff", b: "ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁). Exotérmica: K baja al subir T. Endotérmica: K sube." },
      { a: "Equilibrio heterogéneo", b: "Con sólidos y gases: solo cuentan los gases. CaCO₃ ⇌ CaO + CO₂: K<sub>p</sub> = p(CO₂), una constante a cada T." },
      { a: "Producto de solubilidad K<sub>s</sub>", b: "K<sub>s</sub> = [catión]<sup>m</sup>[anión]<sup>n</sup> de la disolución saturada. AB: K<sub>s</sub> = s². AB₂: K<sub>s</sub> = 4s³." },
      { a: "Efecto del ion común", b: "Un ion que ya forma parte de la sal disminuye su solubilidad (Le Chatelier). K<sub>s</sub> no cambia." },
      { a: "Precipitación", b: "Tras mezclar (¡con el volumen total!) se calcula Q con los iones. Q &gt; K<sub>s</sub>: precipita. Q = K<sub>s</sub>: saturada. Q &lt; K<sub>s</sub>: no precipita." }
    ]
  };

  datos.errores2 = {
    titulo: "Encuentra el error (2)",
    intro: "Más razonamientos con trampa, ahora de K<sub>p</sub>, α, gas inerte y solubilidad.",
    preguntas: [
      { q: "«Para N₂O₄ ⇌ 2 NO₂ a 400 K, K<sub>p</sub> = K<sub>c</sub>(RT)⁻¹ porque hay un mol de N₂O₄.» ¿Qué falla?",
        op: ["Nada", "Δn = 2 − 1 = +1, así que K<sub>p</sub> = K<sub>c</sub>(RT)<sup>+1</sup>", "Δn debería ser 2", "K<sub>p</sub> = K<sub>c</sub> siempre"], ok: 1,
        porque: "Δn = moles de gas de productos − reactivos = 2 − 1 = +1, y el exponente es +1. Aquí K<sub>p</sub> &gt; K<sub>c</sub> numéricamente." },
      { q: "En CaCO₃(s) ⇌ CaO(s) + CO₂(g), un alumno dice: «si pongo el doble de CaCO₃, la presión de CO₂ en el equilibrio será el doble». ¿Qué ocurre en realidad?",
        op: ["Es correcto", "La presión de CO₂ es K<sub>p</sub>, la misma a esa temperatura, con tal de que quede algo de CaCO₃", "La presión se reduce a la mitad", "El CaO la compensa"], ok: 1,
        porque: "K<sub>p</sub> = p(CO₂) y solo depende de T. La cantidad de sólido no altera la presión de equilibrio (mientras no se agote)." },
      { q: "«A volumen constante añado helio; la presión total sube, así que el equilibrio N₂ + 3 H₂ ⇌ 2 NH₃ se desplaza hacia el NH₃.» ¿Qué falla?",
        op: ["Nada", "Las presiones parciales y concentraciones de N₂, H₂ y NH₃ no cambian: Q sigue valiendo K y no hay desplazamiento", "El helio reacciona con el N₂", "El helio es un catalizador"], ok: 1,
        porque: "Solo se desplaza si cambia Q. A V constante el gas inerte no modifica las concentraciones de las sustancias que reaccionan." },
      { q: "Un alumno resuelve el grado de disociación de PCl₅ ⇌ PCl₃ + Cl₂ con K<sub>c</sub> = α²/(1 − α) en un recipiente de 10 L con 1 mol. ¿Qué falta?",
        op: ["Nada", "Falta dividir por el volumen: K<sub>c</sub> = n₀α²/(V(1 − α)), porque Δn = +1", "Falta elevar al cuadrado", "α debería ir en el denominador"], ok: 1,
        porque: "Las concentraciones son n/V. Con Δn ≠ 0 el volumen no se cancela y hay que usarlo." },
      { q: "«K<sub>s</sub>(Ag₂CrO₄) = 1,1·10⁻¹² es menor que K<sub>s</sub>(AgCl) = 1,8·10⁻¹⁰, luego el Ag₂CrO₄ es menos soluble.» ¿Es correcto?",
        op: ["Sí, siempre", "No: con distinta estequiometría hay que calcular s; aquí el cromato (6,5·10⁻⁵ M) es más soluble que el cloruro (1,3·10⁻⁵ M)", "Sí, pero solo a 25 °C", "No: K<sub>s</sub> no se puede comparar nunca"], ok: 1,
        porque: "K<sub>s</sub> se puede comparar directamente solo entre sales del mismo tipo (AB con AB). Una sal A₂B tiene s = ∛(K<sub>s</sub>/4), con otra dependencia." },
      { q: "Se mezclan 50 mL de AgNO₃ 2,0·10⁻³ M con 50 mL de NaCl 2,0·10⁻³ M y un alumno calcula Q = 2,0·10⁻³·2,0·10⁻³. ¿Qué error ha cometido?",
        op: ["Ninguno", "No ha diluido: tras mezclar, cada concentración es la mitad (1,0·10⁻³ M)", "Debería sumar las concentraciones", "Debería usar K<sub>s</sub> en vez de Q"], ok: 1,
        porque: "El volumen total es 100 mL, así que cada concentración se divide entre 2: Q = (1,0·10⁻³)² = 1,0·10⁻⁶." },
      { q: "«Añadimos NaCl a una disolución saturada de AgCl; K<sub>s</sub> disminuye porque precipita AgCl.» ¿Qué falla?",
        op: ["Nada", "K<sub>s</sub> no cambia (solo depende de T); lo que cambia es la cantidad de sal disuelta", "K<sub>s</sub> aumenta", "El NaCl es un catalizador"], ok: 1,
        porque: "Al aumentar [Cl⁻] precipita algo de AgCl hasta que [Ag⁺][Cl⁻] vuelve a valer el mismo K<sub>s</sub>." },
      { q: "Una reacción exotérmica con K<sub>c</sub> = 50 a 300 K. Un alumno afirma que a 500 K «K<sub>c</sub> será mayor, porque a más temperatura todo va más deprisa». ¿Qué falla?",
        op: ["Nada", "Mezcla velocidad con equilibrio: en una exotérmica K disminuye al subir T", "K no depende de T", "Debería ser exactamente 50"], ok: 1,
        porque: "Subir T acelera la reacción (cinética) pero, en una exotérmica, desplaza el equilibrio hacia reactivos y disminuye K." }
    ]
  };

  datos.quiz2 = {
    titulo: "Test final del tema",
    preguntas: [
      { q: "Para 2 SO₂ + O₂ ⇌ 2 SO₃, K<sub>p</sub> = 3,4 a 1000 K. ¿Cuánto vale K<sub>c</sub>? (RT = 82)",
        op: ["3,4", "280", "0,041", "3,4·82²"], ok: 1,
        porque: "Δn = −1: K<sub>c</sub> = K<sub>p</sub>·(RT) = 3,4·82 ≈ 280." },
      { q: "¿Cuál de estas reacciones tiene K<sub>p</sub> = K<sub>c</sub>?",
        op: ["PCl₅ ⇌ PCl₃ + Cl₂", "H₂ + Cl₂ ⇌ 2 HCl", "2 SO₂ + O₂ ⇌ 2 SO₃", "CaCO₃(s) ⇌ CaO(s) + CO₂(g)"], ok: 1,
        porque: "Δn = 0 solo en la segunda (2 − 2)." },
      { q: "A P y T constantes, ¿qué efecto tiene añadir un gas inerte a N₂ + 3 H₂ ⇌ 2 NH₃?",
        op: ["Se desplaza hacia NH₃", "Se desplaza hacia N₂ y H₂", "No hay desplazamiento", "Cambia K"], ok: 1,
        porque: "El volumen aumenta (menos presión parcial de cada gas): se favorece el lado con más moles de gas, los reactivos." },
      { q: "En PCl₅ ⇌ PCl₃ + Cl₂ aumentamos el volumen a T constante. α…",
        op: ["aumenta", "disminuye", "no cambia", "se hace cero"], ok: 0,
        porque: "Δn = +1: menos presión favorece el lado con más moles de gas. K no cambia, pero α sube." },
      { q: "Si Q = 20 y K<sub>c</sub> = 5, el sistema…",
        op: ["evoluciona hacia productos", "evoluciona hacia reactivos", "ya está en equilibrio", "aumenta K"], ok: 1,
        porque: "Q &gt; K: hay «demasiado producto»; retrocede." },
      { q: "En un equilibrio heterogéneo con CO₂(g) como único gas, K<sub>p</sub> es…",
        op: ["p(CO₂) elevada a su coeficiente", "p(CO₂) más las masas de sólidos", "una constante que depende de la cantidad de sólido", "siempre 1"], ok: 0,
        porque: "Solo cuentan los gases; los sólidos no figuran." },
      { q: "La solubilidad en mol/L de una sal AB₂ con K<sub>s</sub> = 4,0·10⁻¹² es…",
        op: ["2,0·10⁻⁶", "1,0·10⁻⁴", "4,0·10⁻¹²", "1,0·10⁻⁶"], ok: 1,
        porque: "K<sub>s</sub> = 4s³ → s³ = 1,0·10⁻¹² → s = 1,0·10⁻⁴ mol/L." },
      { q: "Añadir Na₂SO₄ a una disolución saturada de BaSO₄ provoca…",
        op: ["que aumente la solubilidad del BaSO₄", "que precipite algo de BaSO₄ (ion común)", "que aumente K<sub>s</sub>", "ningún cambio"], ok: 1,
        porque: "El SO₄²⁻ añadido aumenta [SO₄²⁻]; para que [Ba²⁺][SO₄²⁻] siga valiendo K<sub>s</sub>, precipita BaSO₄." },
      { q: "Al mezclar dos disoluciones, para decidir si hay precipitado se compara…",
        op: ["K<sub>s</sub> con las concentraciones iniciales", "Q calculado tras la mezcla (concentraciones diluidas) con K<sub>s</sub>", "las masas molares", "los volúmenes de cada una"], ok: 1,
        porque: "Q usa las concentraciones justo después de mezclar, ya diluidas por el volumen total." },
      { q: "Una endotérmica tiene K<sub>c</sub> = 2 a 300 K. A 400 K, K<sub>c</sub> será…",
        op: ["menor que 2", "igual a 2", "mayor que 2", "no se puede saber"], ok: 2,
        porque: "Endotérmica: subir T favorece el sentido endotérmico (productos) y K aumenta." }
    ]
  };

  datos.emp2 = {
    titulo: "Fórmula ↔ significado",
    consigna: "Une cada expresión con lo que permite calcular.",
    pares: [
      ["K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>", "Pasar de concentraciones a presiones parciales"],
      ["p<sub>i</sub> = x<sub>i</sub>·P", "Presión parcial de un gas de una mezcla"],
      ["K<sub>s</sub> = s² (AB)", "Solubilidad s = √K<sub>s</sub>"],
      ["K<sub>s</sub> = 4s³ (AB₂)", "Solubilidad s = ∛(K<sub>s</sub>/4)"],
      ["Q &gt; K<sub>s</sub>", "Precipita la sal"],
      ["ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁)", "Cambio de K con la temperatura"]
    ]
  };

  datos.clas1 = {
    titulo: "Efecto sobre 2 SO₂ + O₂ ⇌ 2 SO₃ (ΔH &lt; 0)",
    consigna: "Toca cada cambio y después el efecto que produce sobre el equilibrio.",
    categorias: ["Hacia SO₃ (derecha)", "Hacia SO₂ y O₂ (izquierda)", "No desplaza"],
    items: [
      { t: "Comprimir el recipiente", c: 0 }, { t: "Retirar SO₃", c: 0 }, { t: "Añadir O₂", c: 0 }, { t: "Enfriar", c: 0 },
      { t: "Calentar", c: 1 }, { t: "Añadir SO₃", c: 1 }, { t: "Ampliar el volumen", c: 1 },
      { t: "Añadir catalizador", c: 2 }, { t: "Añadir He a V constante", c: 2 }
    ]
  };

  datos.orden1 = {
    titulo: "Ordena la resolución de un problema de precipitación",
    consigna: "Pon los pasos en el orden correcto.",
    items: [
      { t: "Escribe el equilibrio de solubilidad y la expresión de K<sub>s</sub>" },
      { t: "Calcula el volumen total (V₁ + V₂)" },
      { t: "Calcula las concentraciones de los iones tras mezclar: c·V/V<sub>total</sub>" },
      { t: "Calcula Q con los exponentes de los coeficientes" },
      { t: "Compara Q con K<sub>s</sub> y concluye si precipita" }
    ]
  };

  // ================================================================
  //  EJERCICIOS NUEVOS (34): ★ k1–k10 · ★★ k11–k23 y k25 · ★★★ k24 y k26–k34
  // ================================================================
  var E = [];
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  function N(etq, val, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; return c; }

  // ---------------- ★ ----------------
  nu("k1", 1, "En el equilibrio N₂ + 3 H₂ ⇌ 2 NH₃ las presiones parciales son p(N₂) = 0,50 atm, p(H₂) = 1,5 atm y p(NH₃) = 0,30 atm. Calcula K<sub>p</sub>.", "K<sub>p</sub> =", 0.0533,
    ["Productos entre reactivos, cada presión elevada a su coeficiente."],
    ["K<sub>p</sub> = p(NH₃)² / (p(N₂)·p(H₂)³).", "= 0,30² / (0,50 · 1,5³) = 0,090 / (0,50 · 3,375) = 0,090 / 1,6875 = 0,0533."], "K<sub>p</sub> = 0,0533", 0.01);
  nu("k2", 1, "Para 2 SO₂ + O₂ ⇌ 2 SO₃, K<sub>c</sub> = 280 a 1000 K. Calcula K<sub>p</sub> (R = 0,082 atm·L·mol⁻¹·K⁻¹).", "K<sub>p</sub> =", 3.41,
    ["Calcula primero Δn (solo gases)."],
    ["Δn = 2 − (2 + 1) = −1.", "RT = 0,082 · 1000 = 82.", "K<sub>p</sub> = K<sub>c</sub>(RT)⁻¹ = 280/82 = 3,41."], "K<sub>p</sub> = 3,41", 0.01);
  op("k3", 1, "¿En cuál de estas reacciones coinciden K<sub>p</sub> y K<sub>c</sub>?", "Reacción", ["N₂ + 3 H₂ ⇌ 2 NH₃", "PCl₅ ⇌ PCl₃ + Cl₂", "H₂ + Cl₂ ⇌ 2 HCl", "CaCO₃(s) ⇌ CaO(s) + CO₂(g)"], 2,
    ["Coinciden si Δn = 0."], ["Δn: −2, +1, 2 − 2 = 0, +1.", "Solo en H₂ + Cl₂ ⇌ 2 HCl es Δn = 0."], "H₂ + Cl₂ ⇌ 2 HCl");
  ge("k4", 1, "Para H₂ + I₂ ⇌ 2 HI, K<sub>c</sub> = 54. En un instante hay [H₂] = 0,50 M, [I₂] = 0,50 M y [HI] = 2,0 M. Calcula Q e indica hacia dónde evoluciona.",
    [N("Q =", 16), { tipo: "opcion", etiqueta: "Evoluciona", opciones: ["hacia los productos (→)", "hacia los reactivos (←)", "no evoluciona"], ok: 0 }],
    ["Q = [HI]²/([H₂][I₂]). Compárala con 54."],
    ["Q = 2,0² / (0,50·0,50) = 4,0/0,25 = 16.", "Q = 16 &lt; K<sub>c</sub> = 54 → hacia la derecha (se forma HI)."], "Q = 16 &lt; 54: hacia los productos");
  nu("k5", 1, "En el equilibrio C(s) + CO₂(g) ⇌ 2 CO(g) se miden [CO] = 0,40 M y [CO₂] = 0,10 M. Calcula K<sub>c</sub>.", "K<sub>c</sub> =", 1.6,
    ["El carbono es sólido: no aparece."],
    ["K<sub>c</sub> = [CO]²/[CO₂] = 0,40²/0,10 = 0,16/0,10 = 1,6."], "K<sub>c</sub> = 1,6");
  op("k6", 1, "Al añadir un catalizador a un sistema en equilibrio…", "Efecto", ["se desplaza hacia los productos", "se desplaza hacia los reactivos", "no cambia K ni las concentraciones finales; solo se llega antes", "aumenta K"], 2,
    ["Piensa qué hace con las dos velocidades."], ["Reduce la energía de activación directa e inversa por igual.", "Por tanto no cambia K ni la posición; solo el tiempo de llegada."], "No cambia K ni la posición del equilibrio");
  nu("k7", 1, "El producto de solubilidad del AgBr es 5,0·10⁻¹³. Calcula su solubilidad en agua (mol/L).", "s (mol/L) =", 7.07e-7,
    ["AgBr ⇌ Ag⁺ + Br⁻: K<sub>s</sub> = s²."], ["K<sub>s</sub> = s·s = s².", "s = √(5,0·10⁻¹³) = 7,07·10⁻⁷ mol/L."], "s = 7,07·10⁻⁷ mol/L", 0.01);
  nu("k8", 1, "La solubilidad del BaSO₄ en agua es 1,05·10⁻⁵ mol/L. Calcula su K<sub>s</sub>.", "K<sub>s</sub> =", 1.1025e-10,
    ["BaSO₄ ⇌ Ba²⁺ + SO₄²⁻."], ["[Ba²⁺] = [SO₄²⁻] = s.", "K<sub>s</sub> = s² = (1,05·10⁻⁵)² = 1,10·10⁻¹⁰."], "K<sub>s</sub> = 1,10·10⁻¹⁰", 0.01);
  nu("k9", 1, "Se introducen 2,0 mol de N₂O₄ en un recipiente. En el equilibrio N₂O₄ ⇌ 2 NO₂ hay 0,60 mol de NO₂. Calcula el grado de disociación α.", "α =", 0.15,
    ["Por cada mol de N₂O₄ que se disocia salen 2 mol de NO₂."], ["Moles de N₂O₄ disociados = 0,60/2 = 0,30.", "α = 0,30/2,0 = 0,15 (15 %)."], "α = 0,15");
  op("k10", 1, "La reacción 2 NO₂ (pardo) ⇌ N₂O₄ (incoloro) es exotérmica. Si se calienta el recipiente cerrado, el color…", "Color", ["se hace más pardo", "se hace más pálido", "no cambia", "se vuelve verde"], 0,
    ["Calentar favorece el sentido endotérmico."], ["Directa exotérmica ⇒ la inversa (N₂O₄ → 2 NO₂) es endotérmica.", "Al calentar se favorece la inversa: aumenta el NO₂ pardo."], "Más pardo");

  // ---------------- ★★ ----------------
  nu("k11", 2, "En un recipiente de 2,0 L se introducen 0,80 mol de COCl₂ y se alcanza el equilibrio COCl₂ ⇌ CO + Cl₂ con 0,20 mol de CO. Calcula K<sub>c</sub>.", "K<sub>c</sub> =", 0.0333,
    ["Tabla ICE en moles y luego divide entre V."],
    ["Se disocian 0,20 mol: COCl₂ = 0,80 − 0,20 = 0,60 mol; CO = Cl₂ = 0,20 mol.", "Concentraciones (÷ 2,0 L): [COCl₂] = 0,30 M; [CO] = [Cl₂] = 0,10 M.", "K<sub>c</sub> = 0,10·0,10/0,30 = 0,0333."], "K<sub>c</sub> = 0,0333", 0.01);
  nu("k12", 2, "Para PCl₅ ⇌ PCl₃ + Cl₂ se tiene K<sub>c</sub> = 0,0267 a 500 K. Calcula K<sub>p</sub> a esa temperatura.", "K<sub>p</sub> =", 1.09,
    ["Δn = +1."], ["Δn = 2 − 1 = +1; RT = 0,082·500 = 41.", "K<sub>p</sub> = K<sub>c</sub>(RT) = 0,0267·41 = 1,09."], "K<sub>p</sub> = 1,09", 0.01);
  ge("k13", 2, "Se mezclan 2,0 mol de CO y 1,0 mol de H₂O en un recipiente de 10 L. A cierta temperatura, K<sub>c</sub> = 4,0 para CO + H₂O ⇌ CO₂ + H₂. Calcula los moles de H₂ en el equilibrio y el porcentaje de H₂O que se ha convertido.",
    [N("n(H₂) (mol) =", 0.845), N("% de H₂O convertido =", 84.5)],
    ["Δn = 0: el volumen se cancela, puedes usar moles.", "Resuelve la cuadrática y quédate con x &lt; 1."],
    ["Tabla (moles): CO = 2,0 − x · H₂O = 1,0 − x · CO₂ = x · H₂ = x.", "K<sub>c</sub> = x²/((2,0 − x)(1,0 − x)) = 4,0 → x² = 4(2 − 3x + x²) → 3x² − 12x + 8 = 0.", "x = (12 − √(144 − 96))/6 = (12 − 6,928)/6 = 0,845 (la otra raíz, 3,15, supera los moles de H₂O).", "n(H₂) = 0,845 mol; H₂O convertido = 0,845/1,0 = 84,5 %."], "n(H₂) = 0,845 mol · 84,5 %");
  nu("k14", 2, "A 2,0 atm de presión total, el equilibrio N₂O₄ ⇌ 2 NO₂ contiene 0,60 mol de N₂O₄ y 0,80 mol de NO₂. Calcula K<sub>p</sub>.", "K<sub>p</sub> =", 1.524,
    ["Fracciones molares y presiones parciales primero."],
    ["n<sub>total</sub> = 1,40 mol. x(NO₂) = 0,80/1,40 = 0,571; x(N₂O₄) = 0,429.", "p(NO₂) = 2,0·0,571 = 1,143 atm; p(N₂O₄) = 2,0·0,429 = 0,857 atm.", "K<sub>p</sub> = 1,143²/0,857 = 1,52."], "K<sub>p</sub> = 1,52", 0.01);
  ge("k15", 2, "Se introduce HI en un recipiente de 1,0 L con concentración inicial 1,00 M. A 700 K, para H₂ + I₂ ⇌ 2 HI es K<sub>c</sub> = 54. Calcula [H₂] y [HI] cuando se descompone: 2 HI ⇌ H₂ + I₂.",
    [N("[H₂] (M) =", 0.107), N("[HI] (M) =", 0.786)],
    ["La K de la reacción dada es la inversa de la del enunciado.", "Cuadrado perfecto: saca la raíz."],
    ["Para 2 HI ⇌ H₂ + I₂: K′ = 1/54 = 0,0185.", "ICE: HI = 1,00 − 2x · H₂ = I₂ = x. K′ = x²/(1 − 2x)² → x/(1 − 2x) = √0,0185 = 0,136.", "x = 0,136(1 − 2x) → x(1 + 0,272) = 0,136 → x = 0,107.", "[H₂] = 0,107 M; [HI] = 1,00 − 0,214 = 0,786 M."], "[H₂] = 0,107 M · [HI] = 0,786 M");
  nu("k16", 2, "En un recipiente se descompone NH₄Cl(s) ⇌ NH₃(g) + HCl(g). En el equilibrio la presión total es 1,0 atm. Calcula K<sub>p</sub>.", "K<sub>p</sub> =", 0.25,
    ["Los dos gases tienen la misma presión parcial."], ["p(NH₃) = p(HCl) = 1,0/2 = 0,50 atm.", "K<sub>p</sub> = 0,50·0,50 = 0,25."], "K<sub>p</sub> = 0,25");
  nu("k17", 2, "En un recipiente de 5,0 L a 1200 K se alcanza CaCO₃(s) ⇌ CaO(s) + CO₂(g) con p(CO₂) = 0,50 atm. ¿Cuál es la masa mínima de CaCO₃ (en g) que debe haberse puesto para llegar a ese equilibrio? M(CaCO₃) = 100,1 g/mol.", "m (g) =", 2.54,
    ["Moles de CO₂ con la ecuación de los gases ideales."], ["n(CO₂) = pV/RT = 0,50·5,0/(0,082·1200) = 2,5/98,4 = 0,0254 mol.", "Se necesita al menos 0,0254 mol de CaCO₃ descompuesto: 0,0254·100,1 = 2,54 g.", "(Debe quedar algo sin descomponer, así que habría que poner un poco más.)"], "m = 2,54 g (mínimo)", 0.01);
  nu("k18", 2, "Para N₂ + 3 H₂ ⇌ 2 NH₃ (ΔH = −92,2 kJ) K = 0,50 a 400 K. Calcula K a 500 K con la ecuación de van't Hoff (R = 8,314 J·mol⁻¹·K⁻¹).", "K(500 K) =", 1.954e-3,
    ["ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁) con ΔH en J."], ["ΔH/R = −92200/8,314 = −11090 K.", "ln(K₂/K₁) = 11090·(1/500 − 1/400) = 11090·(−5,0·10⁻⁴) = −5,545.", "K₂/K₁ = e<sup>−5,545</sup> = 3,91·10⁻³ → K₂ = 0,50·3,91·10⁻³ = 1,95·10⁻³.", "Coherente: exotérmica y T más alta ⇒ K baja."], "K(500 K) = 1,95·10⁻³", 0.02);
  nu("k19", 2, "Calcula la solubilidad (mol/L) del Ca(OH)₂ si K<sub>s</sub> = 5,5·10⁻⁶.", "s (mol/L) =", 0.01112,
    ["Ca(OH)₂ ⇌ Ca²⁺ + 2 OH⁻: K<sub>s</sub> = s·(2s)²."], ["K<sub>s</sub> = 4s³ → s³ = 5,5·10⁻⁶/4 = 1,375·10⁻⁶.", "s = ∛(1,375·10⁻⁶) = 1,11·10⁻² mol/L."], "s = 1,11·10⁻² mol/L", 0.01);
  nu("k20", 2, "La solubilidad del CaF₂ en agua es 0,0160 g/L. Calcula K<sub>s</sub>. M(CaF₂) = 78,07 g/mol.", "K<sub>s</sub> =", 3.443e-11,
    ["Pasa a mol/L primero. CaF₂ ⇌ Ca²⁺ + 2 F⁻."], ["s = 0,0160/78,07 = 2,05·10⁻⁴ mol/L.", "K<sub>s</sub> = s·(2s)² = 4s³ = 4·(2,05·10⁻⁴)³ = 3,44·10⁻¹¹."], "K<sub>s</sub> = 3,44·10⁻¹¹", 0.02);
  nu("k21", 2, "Calcula la solubilidad del BaSO₄ (K<sub>s</sub> = 1,1·10⁻¹⁰) en una disolución de Na₂SO₄ 0,020 M.", "s (mol/L) =", 5.5e-9,
    ["El ion común es el sulfato: [SO₄²⁻] = 0,020 + s ≈ 0,020."], ["K<sub>s</sub> = [Ba²⁺][SO₄²⁻] = s·(0,020 + s) ≈ 0,020·s.", "s = 1,1·10⁻¹⁰/0,020 = 5,5·10⁻⁹ mol/L (mucho menor que en agua pura, 1,0·10⁻⁵)."], "s = 5,5·10⁻⁹ mol/L", 0.01);
  ge("k22", 2, "Se mezclan 100 mL de AgNO₃ 2,0·10⁻³ M con 100 mL de NaCl 2,0·10⁻⁵ M. Calcula Q e indica si precipita AgCl (K<sub>s</sub> = 1,8·10⁻¹⁰).",
    [N("Q =", 1.0e-8), { tipo: "opcion", etiqueta: "¿Precipita?", opciones: ["Sí", "No", "Queda justo saturada"], ok: 0 }],
    ["Primero el volumen total y la dilución."],
    ["Volumen total 200 mL: [Ag⁺] = 2,0·10⁻³/2 = 1,0·10⁻³ M; [Cl⁻] = 2,0·10⁻⁵/2 = 1,0·10⁻⁵ M.", "Q = 1,0·10⁻³·1,0·10⁻⁵ = 1,0·10⁻⁸.", "Q = 1,0·10⁻⁸ &gt; 1,8·10⁻¹⁰ → precipita."], "Q = 1,0·10⁻⁸ &gt; K<sub>s</sub>: precipita");
  nu("k23", 2, "Calcula el pH de la disolución saturada de Mg(OH)₂ (K<sub>s</sub> = 1,8·10⁻¹¹).", "pH =", 10.52,
    ["[OH⁻] = 2s."], ["K<sub>s</sub> = 4s³ → s = ∛(1,8·10⁻¹¹/4) = 1,65·10⁻⁴ M.", "[OH⁻] = 2s = 3,30·10⁻⁴ M → pOH = 3,48.", "pH = 14 − 3,48 = 10,52."], "pH = 10,52", 0.005);
  ge("k25", 2, "En un recipiente de 2,0 L a 750 K hay 1,0 mol de N₂, 3,0 mol de H₂ y 0,20 mol de NH₃. Para N₂ + 3 H₂ ⇌ 2 NH₃ es K<sub>c</sub> = 0,080. Calcula Q e indica el sentido.",
    [N("Q =", 5.93e-3, 0.01), { tipo: "opcion", etiqueta: "Evoluciona", opciones: ["hacia el NH₃ (→)", "hacia N₂ y H₂ (←)", "está en equilibrio"], ok: 0 }],
    ["Concentraciones = moles/2,0 L."],
    ["[N₂] = 0,50 M; [H₂] = 1,5 M; [NH₃] = 0,10 M.", "Q = 0,10²/(0,50·1,5³) = 0,010/1,6875 = 5,93·10⁻³.", "Q &lt; K<sub>c</sub> = 0,080 → evoluciona hacia la derecha (más NH₃)."], "Q = 5,93·10⁻³ &lt; K<sub>c</sub>: hacia el NH₃");

  // ---------------- ★★★ ----------------
  ge("k24", 3, "EvAU. A 1,0 atm de presión total, el N₂O₄ está disociado en un 20 % en N₂O₄ ⇌ 2 NO₂. Calcula K<sub>p</sub> y el grado de disociación a 4,0 atm (misma temperatura).",
    [N("K<sub>p</sub> =", 0.1667), N("α a 4,0 atm =", 0.1015)],
    ["Con n₀ = 1 mol: N₂O₄ = 1 − α, NO₂ = 2α, n<sub>total</sub> = 1 + α.", "K<sub>p</sub> = 4α²P/(1 − α²)."],
    ["α = 0,20: N₂O₄ = 0,80 mol, NO₂ = 0,40 mol, total 1,20. p(N₂O₄) = 0,667 atm, p(NO₂) = 0,333 atm.", "K<sub>p</sub> = 0,333²/0,667 = 0,167.", "A 4,0 atm: 4α²·4,0/(1 − α²) = 0,167 → 16α² = 0,167(1 − α²) → α²(16 + 0,167) = 0,167 → α² = 0,01031 → α = 0,101.", "Mayor presión ⇒ menor α (Le Chatelier)."], "K<sub>p</sub> = 0,167 · α = 0,101");
  ge("k26", 3, "En un recipiente de 10 L se introduce 1,0 mol de PCl₅ y, a 500 K, se disocia un 40 % (PCl₅ ⇌ PCl₃ + Cl₂). Se amplía el recipiente a 20 L sin cambiar la temperatura. Calcula el nuevo grado de disociación.",
    N("α (20 L) =", 0.511),
    ["Calcula K<sub>c</sub> con el primer dato y úsala en el segundo estado (misma T)."],
    ["Primer estado: PCl₅ 0,60 mol, PCl₃ y Cl₂ 0,40 mol. K<sub>c</sub> = (0,040·0,040)/0,060 = 0,0267.", "Segundo estado, V = 20 L: K<sub>c</sub> = α²/(20(1 − α)) = 0,0267 → α² + 0,533α − 0,533 = 0.", "α = (−0,533 + √(0,284 + 2,133))/2 = (−0,533 + 1,555)/2 = 0,511.", "Al duplicar el volumen, α pasa de 0,40 a 0,51 (Δn = +1)."], "α = 0,51");
  ge("k27", 3, "EvAU. Se introducen 2,0 mol de SO₃ en un recipiente de 5,0 L y se calientan a 1000 K: 2 SO₃ ⇌ 2 SO₂ + O₂. En el equilibrio hay 0,60 mol de SO₂. Calcula K<sub>c</sub>, K<sub>p</sub> y el grado de disociación.",
    [N("K<sub>c</sub> =", 0.01102), N("K<sub>p</sub> =", 0.9036), N("α =", 0.30)],
    ["Se forman 0,60 mol de SO₂: ¿cuántos de O₂ y cuántos de SO₃ quedan?"],
    ["SO₃: 2,0 − 0,60 = 1,40 mol · SO₂ = 0,60 mol · O₂ = 0,30 mol.", "Concentraciones (÷ 5,0 L): [SO₃] = 0,28 M; [SO₂] = 0,12 M; [O₂] = 0,060 M.", "K<sub>c</sub> = [SO₂]²[O₂]/[SO₃]² = 0,12²·0,060/0,28² = 8,64·10⁻⁴/0,0784 = 0,0110.", "Δn = 3 − 2 = +1: K<sub>p</sub> = K<sub>c</sub>·RT = 0,0110·82 = 0,904.", "α = 0,60/2,0 = 0,30."], "K<sub>c</sub> = 0,0110 · K<sub>p</sub> = 0,904 · α = 0,30");
  ge("k28", 3, "Para CO + H₂O ⇌ CO₂ + H₂, K<sub>c</sub> = 4,0. Se parte de 1,0 mol de cada una de las cuatro sustancias en un mismo recipiente. Calcula los moles de CO y de CO₂ en el equilibrio.",
    [N("n(CO) =", 0.667), N("n(CO₂) =", 1.333)],
    ["Q primero: ¿en qué sentido avanza?", "Δn = 0: trabaja con moles."],
    ["Q = (1·1)/(1·1) = 1 &lt; 4: avanza hacia la derecha.", "CO = H₂O = 1 − x · CO₂ = H₂ = 1 + x.", "K<sub>c</sub> = (1 + x)²/(1 − x)² = 4 → (1 + x)/(1 − x) = 2 → 1 + x = 2 − 2x → x = 1/3.", "n(CO) = 1 − 1/3 = 0,667 mol; n(CO₂) = 1 + 1/3 = 1,333 mol."], "n(CO) = 0,667 mol · n(CO₂) = 1,333 mol");
  ge("k29", 3, "Una disolución contiene Cl⁻ 0,010 M y Br⁻ 0,010 M. Se añade AgNO₃ sólido poco a poco. K<sub>s</sub>(AgCl) = 1,8·10⁻¹⁰; K<sub>s</sub>(AgBr) = 5,0·10⁻¹³. Calcula la [Ag⁺] a la que empieza a precipitar el AgBr y la [Br⁻] que queda cuando empieza a precipitar el AgCl.",
    [N("[Ag⁺] inicio AgBr (M) =", 5.0e-11), N("[Br⁻] final (M) =", 2.78e-5)],
    ["Precipita primero la que necesite menos Ag⁺.", "Cuando empieza el AgCl, [Ag⁺] = K<sub>s</sub>(AgCl)/[Cl⁻]."],
    ["AgBr: [Ag⁺] = 5,0·10⁻¹³/0,010 = 5,0·10⁻¹¹ M. AgCl: [Ag⁺] = 1,8·10⁻¹⁰/0,010 = 1,8·10⁻⁸ M. Precipita primero el AgBr.", "Cuando empieza el AgCl, [Ag⁺] = 1,8·10⁻⁸ M y [Br⁻] = 5,0·10⁻¹³/1,8·10⁻⁸ = 2,78·10⁻⁵ M.", "Queda el 0,28 % del bromuro inicial: 99,7 % precipitado antes de que aparezca AgCl."], "5,0·10⁻¹¹ M · 2,78·10⁻⁵ M", 0.01);
  nu("k30", 3, "Una disolución contiene Zn²⁺ 0,010 M. ¿A qué pH empieza a precipitar el Zn(OH)₂ (K<sub>s</sub> = 3,0·10⁻¹⁷)?", "pH =", 6.739,
    ["Zn(OH)₂ ⇌ Zn²⁺ + 2 OH⁻: K<sub>s</sub> = [Zn²⁺][OH⁻]²."], ["[OH⁻]² = 3,0·10⁻¹⁷/0,010 = 3,0·10⁻¹⁵ → [OH⁻] = 5,48·10⁻⁸ M.", "pOH = 7,26 → pH = 14 − 7,26 = 6,74."], "pH = 6,74", 0.005);
  nu("k31", 3, "Calcula la solubilidad del PbI₂ (K<sub>s</sub> = 7,1·10⁻⁹) en una disolución de KI 0,10 M.", "s (mol/L) =", 7.10e-7,
    ["[Pb²⁺] = s; [I⁻] = 0,10 + 2s ≈ 0,10."], ["K<sub>s</sub> = s·(0,10 + 2s)² ≈ s·(0,10)² = 0,010·s.", "s = 7,1·10⁻⁹/0,010 = 7,1·10⁻⁷ mol/L (frente a 1,21·10⁻³ en agua: unas 1.700 veces menos).", "Aproximación válida: 2s ≈ 1,4·10⁻⁶ ≪ 0,10."], "s = 7,1·10⁻⁷ mol/L", 0.01);
  nu("k32", 3, "El NH₃ se descompone: 2 NH₃ ⇌ N₂ + 3 H₂. Partiendo de 1,0 mol de NH₃, con α = 0,20 y presión total 2,0 atm, calcula K<sub>p</sub>.", "K<sub>p</sub> =", 0.01172,
    ["Moles: NH₃ 1 − α · N₂ α/2 · H₂ 3α/2; n<sub>total</sub> = 1 + α."], ["NH₃ = 0,80; N₂ = 0,10; H₂ = 0,30; total = 1,20 mol.", "p: NH₃ = 2,0·0,80/1,20 = 1,333; N₂ = 0,1667; H₂ = 0,5 atm.", "K<sub>p</sub> = p(N₂)·p(H₂)³/p(NH₃)² = 0,1667·0,125/1,778 = 0,01172."], "K<sub>p</sub> = 0,0117", 0.01);
  nu("k33", 3, "Para N₂O₄ ⇌ 2 NO₂ se miden K<sub>c</sub> = 4,6·10⁻³ a 298 K y K<sub>c</sub> = 0,142 a 350 K. Calcula ΔH de la reacción (kJ/mol) y razona su signo.", "ΔH (kJ/mol) =", 57.19,
    ["ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁)."], ["ln(0,142/4,6·10⁻³) = ln 30,87 = 3,430.", "1/350 − 1/298 = −4,986·10⁻⁴ K⁻¹.", "ΔH = −R·3,430/(−4,986·10⁻⁴) = +57.200 J/mol = +57,2 kJ/mol.", "K aumenta con T ⇒ endotérmica (ΔH &gt; 0), como debe ser."], "ΔH = +57,2 kJ/mol", 0.015);
  op("k34", 3, "EvAU. En N₂ + 3 H₂ ⇌ 2 NH₃, una vez alcanzado el equilibrio se añade helio manteniendo constantes la presión total y la temperatura. ¿Qué ocurre?", "Efecto", ["Se forma más NH₃", "Se descompone algo de NH₃ en N₂ y H₂", "No ocurre nada", "K aumenta"], 1,
    ["Si P se mantiene, ¿qué pasa con el volumen?"], ["Para mantener P al añadir He, el volumen aumenta.", "Las concentraciones de N₂, H₂ y NH₃ disminuyen: equivale a bajar la presión.", "Se favorece el lado con más moles de gas: reactivos (4 frente a 2). Se descompone algo de NH₃. K no cambia."], "Se descompone algo de NH₃");

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = A.lamina.concat([
    { titulo: "K<sub>c</sub>, K<sub>p</sub> y Q de un vistazo",
      items: [
        { label: "Constante", formula: "K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / ([A]<sup>a</sup>[B]<sup>b</sup>)", cuando: "Concentraciones de equilibrio; sin sólidos ni líquidos puros.", ejemplo: "CaCO₃ ⇌ CaO + CO₂ → K<sub>c</sub> = [CO₂]." },
        { label: "Con presiones", formula: "K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>", cuando: "Δn solo de gases; T en K; R = 0,082.", ejemplo: "N₂ + 3 H₂ ⇌ 2 NH₃: Δn = −2." },
        { label: "Presión parcial", formula: "p<sub>i</sub> = x<sub>i</sub>·P", cuando: "Mezcla de gases.", ejemplo: "2 mol de 6 a 3 atm → 1,0 atm." },
        { label: "Cociente", formula: "Q &lt; K → →  ·  Q &gt; K → ←  ·  Q = K: equilibrio", cuando: "Mezcla fuera del equilibrio.", ejemplo: "Q = 16 &lt; 54: hacia HI." }
      ],
      nota: "Pregunta clave de cada problema: ¿K<sub>c</sub> o K<sub>p</sub>? ¿Datos en moles (÷ V) o en presiones?" },
    { titulo: "Cómo se resuelve un problema de equilibrio", ancha: true,
      pasos: [
        "Reacción <b>ajustada</b> y expresión de K (sin sólidos).",
        "Si mezclas desde el principio reactivos y productos, calcula <b>Q</b> y decide el sentido.",
        "<b>Tabla ICE</b>: inicial, cambio (−a·x, +b·x), equilibrio.",
        "Usa el <b>dato</b> (moles, α, presión total, K) para fijar x.",
        "Pasa a <b>mol/L</b> (÷ V) o a <b>presiones parciales</b> (x<sub>i</sub>·P) y sustituye en K.",
        "<b>Comprueba</b>: moles positivos y Q = K."
      ],
      nota: "Tras una perturbación, el «inicial» es el equilibrio anterior ± lo añadido; K no cambia salvo que cambie T." },
    { titulo: "Solubilidad y K<sub>s</sub>", ancha: true,
      tabla: { cab: ["Tipo", "K<sub>s</sub>", "s", "Ejemplo"], filas: [
        ["AB", "s²", "√K<sub>s</sub>", "AgCl: s = 1,3·10⁻⁵ M"],
        ["AB₂ / A₂B", "4s³", "∛(K<sub>s</sub>/4)", "PbI₂: s = 1,2·10⁻³ M"],
        ["AB₃ / A₃B", "27s⁴", "⁴√(K<sub>s</sub>/27)", "Fe(OH)₃"],
        ["A₂B₃ / A₃B₂", "108s⁵", "⁵√(K<sub>s</sub>/108)", "Ca₃(PO₄)₂"]
      ] },
      nota: "Ion común: s disminuye (K<sub>s</sub> igual). Precipita si Q &gt; K<sub>s</sub> con las concentraciones <b>tras diluir</b>. No compares K<sub>s</sub> de sales de distinto tipo." },
    { titulo: "Temperatura, ΔH y K", ancha: true,
      tabla: { cab: ["Reacción", "Subir T", "Efecto en K", "Rendimiento"], filas: [
        ["Exotérmica (ΔH &lt; 0)", "favorece la inversa", "K disminuye", "baja"],
        ["Endotérmica (ΔH &gt; 0)", "favorece la directa", "K aumenta", "sube"],
        ["ΔH ≈ 0", "casi nada", "K casi igual", "casi igual"]
      ] },
      nota: "ln(K₂/K₁) = −(ΔH/R)(1/T₂ − 1/T₁). Catalizador, concentración, volumen y gas inerte nunca cambian K." }
  ]);

  // ================================================================
  //  ENSAMBLADO: se reordenan las secciones (errores y autocomprobación al final, renumeradas)
  // ================================================================
  var base = A.nuevas, antes = [], errores, auto;
  base.forEach(function (s) {
    if (/^8\./.test(s.h)) errores = s; else if (/^9\./.test(s.h)) auto = s; else antes.push(s);
  });
  errores.h = "15. ¿Qué falla aquí? Errores típicos de equilibrio";
  errores.html = errores.html + "<p>Y una segunda tanda, sobre K<sub>p</sub>, α, gas inerte y solubilidad:</p>" + w("quiz", "errores2");
  auto.h = "16. Autocomprobación del tema";
  auto.html = "<p>Ocho preguntas, diez más de repaso final, tarjetas, y tres juegos para fijar las ideas clave del tema.</p>" +
    w("quiz", "quiz1") + w("emparejar", "emp1") + w("quiz", "quiz2") + w("tarjetas", "tarjetas1") + w("clasificar", "clas1") + w("emparejar", "emp2") + w("orden", "orden1");
  var nuevas = antes.concat(P.nuevas, [errores, auto]);

  B.registrar("quimica2", "t6", {
    resumen: resumen,
    secciones: A.secciones,
    nuevas: nuevas,
    datos: datos,
    ejercicios: A.ejercicios.concat(E),
    lamina: lamina
  });
})(window);
