/* ============================================================
   Química II · ampliaciones · Tema 5: Cinética química
   (parte C: actividades, ejercicios, láminas y registro del tema)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;

  var resumen = [
    "<b>Velocidad</b>: v = −(1/a)Δ[A]/Δt = (1/c)Δ[C]/Δt, en mol·L⁻¹·s⁻¹ y siempre positiva. Media = pendiente de la secante; instantánea = pendiente de la tangente. Cada especie varía en proporción a su coeficiente.",
    "<b>Ecuación de velocidad</b>: v = k[A]ⁿ[B]ᵐ. Los órdenes se miden (o salen de la etapa lenta), no de los coeficientes. Cambio de v = (factor de concentración)<sup>orden</sup>. Unidades de k: (mol/L)<sup>1−orden</sup>·s⁻¹ (orden 1 → s⁻¹; orden 2 → L·mol⁻¹·s⁻¹; orden 3 → L²·mol⁻²·s⁻¹).",
    "<b>Órdenes con una tabla</b>: compara dos experimentos donde solo cambie un reactivo; F = fⁿ. Después k = v/([A]ⁿ[B]ᵐ) con unidades y comprobación con otro experimento.",
    "<b>Factores</b>: concentración, superficie y agitación cambian v pero <b>no k</b>; temperatura y catalizador cambian <b>k</b>.",
    "<b>Colisiones y estado de transición</b>: reacciona un choque con E ≥ Eₐ y buena orientación. Eₐ = E(complejo activado) − E(reactivos). Eₐ(inversa) = Eₐ(directa) − ΔH. ΔH y Eₐ son independientes.",
    "<b>Maxwell–Boltzmann</b>: al subir T crece mucho el área con E ≥ Eₐ (≈ e<sup>−Eₐ/RT</sup>) aunque la energía media cambie poco.",
    "<b>Arrhenius</b>: k = A·e<sup>−Eₐ/RT</sup>; ln k = ln A − (Eₐ/R)(1/T); ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂), con T en K, Eₐ en J/mol y R = 8,314 J·mol⁻¹·K⁻¹.",
    "<b>Catalizador</b>: nuevo camino con menor Eₐ en los dos sentidos; aumenta k y v; <b>no</b> cambia ΔH, K ni el rendimiento en el equilibrio, y no hace posible una reacción no espontánea.",
    "<b>Mecanismo</b>: etapas elementales cuya suma da la global; molecularidad (1, 2…) solo para etapas; la etapa lenta (mayor Eₐ) fija la ley de velocidad; intermedio = se forma y se consume; catalizador = se consume y se regenera."
  ];

  // ================================================================
  //  ACTIVIDADES
  // ================================================================
  var datos = {
    errores: {
      titulo: "Encuentra el error",
      intro: "Cada pregunta enseña un razonamiento con un fallo. Elige cuál es.",
      preguntas: [
        { q: "«La reacción 2 A + B → C es de orden 3 porque los coeficientes suman 3.» ¿Qué falla?",
          op: ["Nada", "Los órdenes no se deducen de la ecuación ajustada: se miden o salen de la etapa lenta del mecanismo", "El orden sería 2, no 3", "Los coeficientes solo cuentan si la reacción es exotérmica"], ok: 1,
          porque: "Solo en una reacción elemental (una única etapa) los coeficientes coinciden con los órdenes. En general los órdenes son un dato experimental." },
        { q: "«Al duplicar la concentración de A, la constante de velocidad k se duplica.» ¿Qué falla?",
          op: ["Nada", "k no depende de las concentraciones: lo que se duplica (si el orden es 1) es la velocidad", "k se cuadruplica", "k se reduce a la mitad"], ok: 1,
          porque: "k solo cambia con la temperatura y con un catalizador. Las concentraciones cambian v, no k." },
        { q: "«Un catalizador desplaza el equilibrio hacia los productos porque acelera la reacción directa.» ¿Qué falla?",
          op: ["Nada", "Acelera igual la directa y la inversa (baja Eₐ en los dos sentidos): se alcanza antes el mismo equilibrio, K no cambia", "El catalizador siempre desplaza hacia los reactivos", "El catalizador cambia ΔH"], ok: 1,
          porque: "Kc = k_directa/k_inversa. Un catalizador multiplica ambas constantes por el mismo factor, así que Kc y el rendimiento en el equilibrio no cambian." },
        { q: "«Una reacción muy exotérmica es siempre muy rápida.» ¿Qué falla?",
          op: ["Nada", "La velocidad depende de Eₐ, no de ΔH: una reacción muy exotérmica puede tener una barrera enorme (la combustión del papel necesita una chispa)", "Las exotérmicas son siempre lentas", "ΔH determina k"], ok: 1,
          porque: "ΔH es la diferencia de energía entre productos y reactivos; Eₐ es la altura de la barrera. Son independientes." },
        { q: "«Para calcular la velocidad de reacción a partir de la formación de NH₃ en N₂ + 3 H₂ → 2 NH₃ basta con tomar Δ[NH₃]/Δt.» ¿Qué falla?",
          op: ["Nada", "Hay que dividir entre el coeficiente 2: v = (1/2)·Δ[NH₃]/Δt", "Hay que multiplicar por 2", "Hay que usar la concentración de H₂"], ok: 1,
          porque: "La velocidad de reacción es única y se obtiene dividiendo el ritmo de cada especie entre su coeficiente. Δ[NH₃]/Δt es la velocidad de formación del NH₃, que es el doble de v." },
        { q: "«Como al subir 10 °C la energía cinética media sube solo un 3 %, la velocidad no puede cambiar mucho.» ¿Qué falla?",
          op: ["Nada", "Lo que importa es la fracción de partículas con E ≥ Eₐ, que crece de forma desproporcionada (factor e^(−Eₐ/RT))", "La energía cinética media baja con T", "La velocidad solo depende de los choques"], ok: 1,
          porque: "La cola de Maxwell–Boltzmann es muy sensible a T. Con Eₐ ≈ 50–60 kJ/mol, +10 K suele duplicar k." },
        { q: "«Un catalizador no aparece en la ecuación global, así que no puede influir en la ley de velocidad.» ¿Qué falla?",
          op: ["Nada", "Un catalizador sí puede aparecer en la ley de velocidad (v = k[H₂O₂][I⁻]): interviene en la etapa lenta aunque se regenere", "Un catalizador nunca interviene en ninguna etapa", "La ley solo contiene productos"], ok: 1,
          porque: "El catalizador se consume en una etapa y se regenera en otra; si participa en la etapa lenta, su concentración aparece en la ley." },
        { q: "«La energía de activación de la reacción inversa es siempre igual a la de la directa.» ¿Qué falla?",
          op: ["Nada", "Eₐ(inversa) = Eₐ(directa) − ΔH: solo coinciden si ΔH = 0", "Eₐ(inversa) = Eₐ(directa) + ΔH", "La inversa no tiene energía de activación"], ok: 1,
          porque: "Hay que subir desde el nivel de los productos, que está más arriba o más abajo que el de los reactivos según el signo de ΔH." },
        { q: "«Con T₂ &gt; T₁ en Arrhenius se obtiene una Eₐ negativa; no pasa nada, el signo no importa.» ¿Qué falla?",
          op: ["Nada", "Una Eₐ negativa indica un error de cálculo (paréntesis invertido, °C en vez de K): con T₂ &gt; T₁ debe salir k₂ &gt; k₁ y Eₐ &gt; 0", "Las energías de activación a veces son negativas", "Hay que cambiar R por su signo"], ok: 1,
          porque: "ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂). Si T₂ &gt; T₁, el paréntesis es positivo; hay que usar siempre kelvin." },
        { q: "«La molecularidad de la reacción 2 NO + O₂ → 2 NO₂ es 3, y su orden también.» ¿Qué falla?",
          op: ["Nada", "La molecularidad se define solo para etapas elementales; la global es el resultado de varias etapas y su orden es experimental", "La molecularidad vale siempre 1", "El orden es siempre el doble de la molecularidad"], ok: 1,
          porque: "Un choque simultáneo de tres moléculas es muy improbable. La molecularidad aplica a cada etapa; el orden global se mide." }
      ]
    },
    quiz1: {
      titulo: "Test del tema",
      preguntas: [
        { q: "La velocidad de una reacción se expresa en…",
          op: ["mol·L⁻¹·s⁻¹", "mol·s", "L·mol⁻¹", "s⁻¹ siempre"], ok: 0, porque: "Es una variación de concentración (mol/L) por unidad de tiempo (s)." },
        { q: "En 2 A → B, la velocidad de desaparición de A es 0,040 mol·L⁻¹·s⁻¹. La velocidad de reacción es…",
          op: ["0,020 mol·L⁻¹·s⁻¹", "0,040 mol·L⁻¹·s⁻¹", "0,080 mol·L⁻¹·s⁻¹", "0,010 mol·L⁻¹·s⁻¹"], ok: 0, porque: "v = (1/2)·0,040 = 0,020: se divide entre el coeficiente." },
        { q: "Si v = k[A]²[B] y se duplican a la vez [A] y [B], la velocidad se multiplica por…",
          op: ["8", "4", "6", "2"], ok: 0, porque: "2² · 2 = 8 (orden total 3)." },
        { q: "Las unidades de k en una reacción de segundo orden total son…",
          op: ["L·mol⁻¹·s⁻¹", "s⁻¹", "mol·L⁻¹·s⁻¹", "L²·mol⁻²·s⁻¹"], ok: 0, porque: "k = v/[ ]² = (mol·L⁻¹·s⁻¹)/(mol²·L⁻²) = L·mol⁻¹·s⁻¹." },
        { q: "¿Qué factor de la lista NO modifica la constante k?",
          op: ["La concentración de los reactivos", "La temperatura", "Un catalizador", "La energía de activación"], ok: 0, porque: "k depende de T y del catalizador (a través de Eₐ y A), no de las concentraciones." },
        { q: "La energía de activación es…",
          op: ["La energía mínima de un choque para que sea eficaz (E del complejo activado − E de los reactivos)", "La energía liberada en la reacción", "La energía de los productos", "La diferencia de energía entre reactivos y productos"], ok: 0, porque: "Es la altura de la barrera desde los reactivos hasta el estado de transición. ΔH es la diferencia entre productos y reactivos." },
        { q: "Una reacción tiene ΔH = −40 kJ/mol y Eₐ(directa) = 55 kJ/mol. ¿Cuánto vale Eₐ(inversa)?",
          op: ["95 kJ/mol", "15 kJ/mol", "55 kJ/mol", "−15 kJ/mol"], ok: 0, porque: "Eₐ(inv) = Eₐ(dir) − ΔH = 55 − (−40) = 95 kJ/mol." },
        { q: "Un catalizador…",
          op: ["Disminuye Eₐ y no modifica ΔH", "Disminuye ΔH", "Aumenta la cantidad de producto en el equilibrio", "Se consume al final de la reacción"], ok: 0, porque: "Ofrece un camino con menor barrera; los niveles de reactivos y productos no cambian." },
        { q: "Al elevar la temperatura aumenta la velocidad porque…",
          op: ["Aumenta la fracción de partículas con energía ≥ Eₐ", "Disminuye la energía de activación", "Disminuye ΔH", "Aumenta el orden de reacción"], ok: 0, porque: "La Eₐ de la reacción no cambia; lo que cambia es el área de la cola de Maxwell–Boltzmann por encima de Eₐ." },
        { q: "Un intermedio de reacción es…",
          op: ["Una especie que se forma en una etapa y se consume en otra", "Un catalizador", "El estado de transición", "Un producto final"], ok: 0, porque: "No aparece en la reacción global. A diferencia del estado de transición, sí es una especie con cierta estabilidad (un mínimo en el perfil)." },
        { q: "La ecuación de velocidad experimental de un mecanismo coincide con la de…",
          op: ["La etapa lenta", "La etapa rápida", "La reacción global ajustada", "La última etapa siempre"], ok: 0, porque: "La etapa más lenta limita la velocidad global." },
        { q: "En la ecuación de Arrhenius, la gráfica de ln k frente a 1/T es una recta de pendiente…",
          op: ["−Eₐ/R", "Eₐ·R", "ln A", "Eₐ/(RT)"], ok: 0, porque: "ln k = ln A − (Eₐ/R)(1/T): la pendiente es −Eₐ/R y la ordenada en el origen, ln A." }
      ]
    },
    tarjetas1: {
      titulo: "Tarjetas del tema",
      cartas: [
        { a: "Velocidad de reacción", b: "Variación de concentración por unidad de tiempo, dividida entre el coeficiente: v = −(1/a)Δ[A]/Δt. Unidades: mol·L⁻¹·s⁻¹." },
        { a: "Velocidad media frente a instantánea", b: "Media: pendiente de la secante entre dos instantes. Instantánea: pendiente de la tangente (derivada) en un instante." },
        { a: "Ecuación de velocidad", b: "v = k[A]ⁿ[B]ᵐ. Los exponentes (órdenes parciales) se determinan experimentalmente." },
        { a: "Orden total", b: "Suma de los órdenes parciales (n + m). Determina las unidades de k." },
        { a: "Constante de velocidad k", b: "Velocidad cuando todas las concentraciones valen 1 mol/L. Solo depende de T y del catalizador." },
        { a: "Unidades de k", b: "(mol/L)^(1−orden)·s⁻¹: orden 0 → mol·L⁻¹·s⁻¹; 1 → s⁻¹; 2 → L·mol⁻¹·s⁻¹; 3 → L²·mol⁻²·s⁻¹." },
        { a: "Método de velocidades iniciales", b: "Comparar dos experimentos en los que solo cambia una concentración: F = fⁿ." },
        { a: "Choque eficaz", b: "Choque con energía ≥ Eₐ y orientación adecuada: da lugar a reacción." },
        { a: "Energía de activación", b: "Energía mínima necesaria: E(complejo activado) − E(reactivos). En kJ/mol." },
        { a: "Complejo activado (estado de transición)", b: "Máximo de energía del perfil: especie inestable, intermedia entre reactivos y productos; no se puede aislar." },
        { a: "Eₐ(inversa)", b: "Eₐ(directa) − ΔH." },
        { a: "Ecuación de Arrhenius", b: "k = A·e^(−Eₐ/RT); ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂). T en K, Eₐ en J/mol." },
        { a: "Catalizador", b: "Cambia el mecanismo bajando Eₐ (en los dos sentidos); se regenera; no cambia ΔH ni K ni el rendimiento." },
        { a: "Molecularidad", b: "Número de partículas que intervienen en una etapa elemental (1, 2, raramente 3)." },
        { a: "Etapa lenta", b: "La de mayor Eₐ del mecanismo: fija la velocidad y la ley de velocidad." },
        { a: "Intermedio de reacción", b: "Especie que se forma en una etapa y se consume en otra; no aparece en la global." }
      ]
    },
    emp1: {
      titulo: "Empareja cada concepto con su definición",
      consigna: "Toca un concepto y después su definición.",
      pares: [
        ["Velocidad de reacción", "variación de concentración por tiempo, entre el coeficiente"],
        ["Orden de reacción", "exponente de una concentración en v = k[A]ⁿ, medido experimentalmente"],
        ["Energía de activación", "barrera de energía que deben superar los choques"],
        ["Complejo activado", "máximo de energía del camino de reacción"],
        ["Catalizador", "baja Eₐ y se regenera al final"],
        ["Intermedio", "se forma y se consume dentro del mecanismo"],
        ["Molecularidad", "partículas que chocan en una etapa elemental"],
        ["Factor de frecuencia A", "frecuencia y orientación de los choques en Arrhenius"]
      ]
    },
    orden1: {
      titulo: "Ordena el método de las velocidades iniciales",
      consigna: "Del primer paso al último, para obtener la ley de velocidad a partir de una tabla.",
      items: [
        { t: "Buscar dos experimentos donde cambie solo una concentración", nota: "Las demás deben ser idénticas." },
        { t: "Calcular el cociente de concentraciones f y el cociente de velocidades F", nota: "f = [A]₂/[A]₁ ; F = v₂/v₁." },
        { t: "Deducir el orden con F = fⁿ", nota: "Si f = 2: F = 2 → n = 1; F = 4 → n = 2; F = 1 → n = 0." },
        { t: "Repetir con otro par de experimentos para el otro reactivo", nota: "Así se obtienen todos los órdenes parciales." },
        { t: "Escribir v = k[A]ⁿ[B]ᵐ y despejar k con un experimento", nota: "No olvides las unidades de k según el orden total." },
        { t: "Comprobar con un experimento que no se ha usado", nota: "Si la velocidad calculada no coincide, hay un error." }
      ]
    },
    clas1: {
      titulo: "¿Cambia la constante k?",
      consigna: "Toca cada cambio y después la categoría: si modifica k o si solo modifica la velocidad.",
      categorias: ["Cambia k", "No cambia k (solo v)"],
      items: [
        { t: "Subir la temperatura", c: 0 }, { t: "Añadir un catalizador", c: 0 }, { t: "Añadir un inhibidor", c: 0 },
        { t: "Doblar la concentración de A", c: 1 }, { t: "Pulverizar un reactivo sólido", c: 1 }, { t: "Agitar la mezcla", c: 1 },
        { t: "Reducir el volumen de un gas a la mitad", c: 1 }, { t: "Añadir más reactivo", c: 1 }
      ]
    }
  };

  // ================================================================
  //  EJERCICIOS (★ 15 · ★★ 16 · ★★★ 16)
  // ================================================================
  var E = [];
  function op(id, nivel, enun, etq, ops, ok, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: { tipo: "opcion", etiqueta: etq, opciones: ops, ok: ok }, pistas: pistas, pasos: pasos, resultado: res }); }
  function nu(id, nivel, enun, etq, val, pistas, pasos, res, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; E.push({ id: id, nivel: nivel, enunciado: enun, check: c, pistas: pistas, pasos: pasos, resultado: res }); }
  function ge(id, nivel, enun, check, pistas, pasos, res) { E.push({ id: id, nivel: nivel, enunciado: enun, check: check, pistas: pistas, pasos: pasos, resultado: res }); }
  function N(etq, val, tol) { var c = { tipo: "num", etiqueta: etq, valor: val }; if (tol) c.tol = tol; return c; }

  // ---------------- ★ ----------------
  op("a1", 1, "¿En qué unidades se expresa normalmente la velocidad de una reacción?", "Unidades", ["mol·L⁻¹·s⁻¹", "mol·s⁻¹·L", "L·mol⁻¹·s⁻¹", "s⁻¹"], 0,
    ["Es una concentración dividida entre un tiempo."], ["Concentración: mol/L. Tiempo: s.", "v = Δ[ ]/Δt → mol·L⁻¹·s⁻¹."], "mol·L⁻¹·s⁻¹");
  nu("a2", 1, "La concentración de un reactivo B pasa de 1,20 a 0,90 mol/L en 15 s. Calcula la velocidad media de desaparición de B (en mol·L⁻¹·s⁻¹).", "v (mol/(L·s)) =", 0.020,
    ["Variación de concentración entre tiempo, sin signo."], ["Δ[B] = 0,90 − 1,20 = −0,30 mol/L.", "v = 0,30/15 = 0,020 mol·L⁻¹·s⁻¹ (se quita el signo)."], "0,020 mol·L⁻¹·s⁻¹");
  nu("a3", 1, "En la reacción 2 A → B, la velocidad de desaparición de A es 0,040 mol·L⁻¹·s⁻¹. Calcula la velocidad de reacción.", "v (mol/(L·s)) =", 0.020,
    ["Divide entre el coeficiente de A."], ["Coeficiente de A: 2.", "v = 0,040/2 = 0,020 mol·L⁻¹·s⁻¹."], "0,020 mol·L⁻¹·s⁻¹");
  op("a4", 1, "Para v = k·[A]·[B]², ¿cuál es el orden total de la reacción?", "Orden total", ["3", "2", "1", "4"], 0,
    ["Suma los exponentes."], ["Exponentes: 1 (A) y 2 (B).", "Orden total: 1 + 2 = 3."], "3");
  nu("a5", 1, "Si v = k·[A]², ¿por qué factor se multiplica la velocidad al triplicar [A]?", "Factor =", 9,
    ["Eleva el factor de concentración al orden."], ["Factor de concentración: 3.", "Orden: 2 → 3² = 9."], "×9");
  op("a6", 1, "¿Cuáles son las unidades de k en una reacción de primer orden?", "Unidades de k", ["s⁻¹", "L·mol⁻¹·s⁻¹", "mol·L⁻¹·s⁻¹", "L²·mol⁻²·s⁻¹"], 0,
    ["v = k[A]: despeja k."], ["k = v/[A] = (mol·L⁻¹·s⁻¹)/(mol·L⁻¹).", "Resulta s⁻¹."], "s⁻¹");
  nu("a7", 1, "Para v = k·[A]·[B] con k = 0,50 L·mol⁻¹·s⁻¹, [A] = 0,20 mol/L y [B] = 0,30 mol/L, calcula v (mol·L⁻¹·s⁻¹).", "v (mol/(L·s)) =", 0.030,
    ["Sustituye directamente."], ["v = 0,50 · 0,20 · 0,30 = 0,030 mol·L⁻¹·s⁻¹."], "0,030 mol·L⁻¹·s⁻¹");
  op("a8", 1, "¿Cuál de estos cambios NO modifica la constante de velocidad k?", "No modifica k", ["Aumentar la concentración de un reactivo", "Subir la temperatura", "Añadir un catalizador", "Cambiar de reacción"], 0,
    ["k solo depende de T, de la reacción y del catalizador."], ["La concentración cambia la velocidad v, no la constante k."], "Aumentar la concentración");
  op("a9", 1, "En la teoría de colisiones, ¿qué condiciones debe cumplir un choque para ser eficaz?", "Condiciones", ["Energía ≥ Eₐ y orientación adecuada", "Solo energía ≥ Eₐ", "Solo orientación adecuada", "Que ocurra a presión elevada"], 0,
    ["Son dos requisitos."], ["Hace falta suficiente energía para vencer la barrera.", "Y que los átomos que han de unirse queden orientados correctamente."], "Energía ≥ Eₐ y orientación");
  op("a10", 1, "Un catalizador aumenta la velocidad de una reacción porque…", "Efecto del catalizador", ["reduce la energía de activación", "aumenta ΔH", "reduce ΔH", "aumenta la concentración de reactivos"], 0,
    ["Cambia el camino de la reacción."], ["Proporciona un mecanismo alternativo con menor barrera.", "ΔH, que depende de reactivos y productos, no cambia."], "Reduce Eₐ");
  nu("a11", 1, "Una reacción tiene ΔH = −50 kJ/mol y Eₐ(directa) = 30 kJ/mol. Calcula Eₐ(inversa) en kJ/mol.", "Eₐ inversa (kJ/mol) =", 80,
    ["Eₐ(inv) = Eₐ(dir) − ΔH."], ["Eₐ(inv) = 30 − (−50) = 80 kJ/mol.", "Los productos están 50 kJ por debajo: hay que subir esos 50 más los 30."], "80 kJ/mol");
  op("a12", 1, "Al aumentar la temperatura, la fracción de partículas con energía mayor que Eₐ…", "Fracción", ["aumenta", "disminuye", "no cambia", "se anula"], 0,
    ["Piensa en la cola de la curva de Maxwell–Boltzmann."], ["La curva se ensancha y se aplana al subir T.", "El área a la derecha de Eₐ crece."], "Aumenta");
  op("a13", 1, "En un mecanismo con varias etapas, la velocidad de la reacción global la fija…", "Etapa", ["la etapa más lenta", "la etapa más rápida", "la primera siempre", "la última siempre"], 0,
    ["Como el tramo más estrecho de una tubería."], ["La etapa lenta es la de mayor Eₐ y limita todo el proceso."], "La etapa lenta");
  op("a14", 1, "¿Cómo se llama una especie que se forma en una etapa de un mecanismo y se consume en una etapa posterior?", "Nombre", ["intermedio de reacción", "catalizador", "producto final", "estado de transición"], 0,
    ["No aparece en la reacción global."], ["Aparece en un lado de una etapa y en el contrario de otra, y se cancela al sumar."], "Intermedio de reacción");
  nu("a15", 1, "Para una reacción en fase gaseosa con v = k·[A]·[B], se reduce el volumen del recipiente a la mitad (misma T). ¿Por qué factor se multiplica la velocidad?", "Factor =", 4,
    ["Al reducir V a la mitad, todas las concentraciones se duplican."], ["Concentraciones ×2.", "Orden total 2 → 2² = 4."], "×4");

  // ---------------- ★★ ----------------
  nu("b1", 2, "En 2 N₂O₅ → 4 NO₂ + O₂, la concentración de N₂O₅ baja de 0,600 a 0,420 mol/L en 40 s. Calcula la velocidad media de reacción (mol·L⁻¹·s⁻¹).", "v (mol/(L·s)) =", 0.00225,
    ["Calcula primero la desaparición del N₂O₅ y luego divide entre su coeficiente."], ["Δ[N₂O₅]/Δt = (0,420 − 0,600)/40 = −0,0045 mol·L⁻¹·s⁻¹.", "v = 0,0045/2 = 0,00225 mol·L⁻¹·s⁻¹."], "2,25·10⁻³ mol·L⁻¹·s⁻¹");
  ge("b2", 2, "En N₂ + 3 H₂ → 2 NH₃ la velocidad de reacción es 0,0030 mol·L⁻¹·s⁻¹. Calcula la velocidad de formación del NH₃ y la de desaparición del H₂.", [N("Formación de NH₃ (mol/(L·s)) =", 0.0060), N("Desaparición de H₂ (mol/(L·s)) =", 0.0090)],
    ["Multiplica v por el coeficiente de cada especie."], ["NH₃: coeficiente 2 → 2 · 0,0030 = 0,0060.", "H₂: coeficiente 3 → 3 · 0,0030 = 0,0090 mol·L⁻¹·s⁻¹."], "NH₃: 6,0·10⁻³; H₂: 9,0·10⁻³ mol·L⁻¹·s⁻¹");
  nu("b3", 2, "En dos experimentos con la misma [B], la concentración de A pasa de 0,10 a 0,30 mol/L y la velocidad inicial pasa de 1,0·10⁻³ a 9,0·10⁻³ mol·L⁻¹·s⁻¹. ¿Cuál es el orden respecto a A?", "Orden de A =", 2,
    ["F = fⁿ."], ["f = 0,30/0,10 = 3 ; F = 9,0·10⁻³/1,0·10⁻³ = 9.", "3ⁿ = 9 → n = 2."], "n = 2");
  nu("b4", 2, "Experimentos: (1) [A] = 0,10 y [B] = 0,10 mol/L, v₀ = 3,0·10⁻⁴; (2) [A] = 0,20 y [B] = 0,10, v₀ = 6,0·10⁻⁴; (3) [A] = 0,10 y [B] = 0,20, v₀ = 1,2·10⁻³ (mol·L⁻¹·s⁻¹). Calcula el orden total.", "Orden total =", 3,
    ["Halla el orden de A con (1) y (2) y el de B con (1) y (3)."], ["(1)→(2): [A] ×2 y v ×2 → n = 1.", "(1)→(3): [B] ×2 y v ×4 → m = 2.", "Orden total = 1 + 2 = 3."], "3");
  nu("b5", 2, "Con los datos del ejercicio anterior (v = k[A][B]²), calcula la constante k (L²·mol⁻²·s⁻¹).", "k =", 0.30,
    ["Usa el experimento 1."], ["k = v/([A][B]²) = 3,0·10⁻⁴/(0,10 · 0,10²) = 3,0·10⁻⁴/1,0·10⁻³ = 0,30 L²·mol⁻²·s⁻¹."], "0,30 L²·mol⁻²·s⁻¹");
  nu("b6", 2, "Con la ley v = 0,30·[A]·[B]² (unidades SI), calcula v cuando [A] = 0,40 y [B] = 0,30 mol/L.", "v (mol/(L·s)) =", 0.0108,
    ["Sustituye en la ley."], ["v = 0,30 · 0,40 · 0,30² = 0,30 · 0,40 · 0,090 = 0,0108 mol·L⁻¹·s⁻¹."], "1,08·10⁻² mol·L⁻¹·s⁻¹");
  nu("b7", 2, "Una reacción tiene k = 4,0·10⁻³ s⁻¹ a 300 K y Eₐ = 50 kJ/mol. Calcula k a 310 K (s⁻¹). Usa R = 8,314 J/(mol·K).", "k a 310 K (s⁻¹) =", 7.64e-3,
    ["ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂), con Eₐ en J/mol."], ["(50 000/8,314)(1/300 − 1/310) = 6 014 · 1,0753·10⁻⁴ = 0,6467.", "k₂/k₁ = e^0,6467 = 1,909.", "k₂ = 1,909 · 4,0·10⁻³ = 7,64·10⁻³ s⁻¹."], "7,6·10⁻³ s⁻¹", 0.01);
  nu("b8", 2, "La constante de una reacción es 1,5·10⁻³ s⁻¹ a 290 K y 6,0·10⁻³ s⁻¹ a 310 K. Calcula Eₐ en kJ/mol.", "Eₐ (kJ/mol) =", 51.8,
    ["k₂/k₁ = 4."], ["ln 4 = 1,386 ; (1/290 − 1/310) = 2,2247·10⁻⁴ K⁻¹.", "Eₐ = 8,314 · 1,386/2,2247·10⁻⁴ = 5,18·10⁴ J/mol = 51,8 kJ/mol."], "51,8 kJ/mol", 0.01);
  nu("b9", 2, "Una reacción endotérmica tiene ΔH = +45 kJ/mol y Eₐ(directa) = 85 kJ/mol. Calcula Eₐ(inversa) en kJ/mol.", "Eₐ inversa (kJ/mol) =", 40,
    ["Eₐ(inv) = Eₐ(dir) − ΔH."], ["Eₐ(inv) = 85 − 45 = 40 kJ/mol.", "En una endotérmica, la inversa es más fácil que la directa."], "40 kJ/mol");
  nu("b10", 2, "La constante de velocidad de una reacción vale 3,0·10⁻² L·mol⁻¹·s⁻¹. ¿Cuál es el orden total de la reacción?", "Orden total =", 2,
    ["Mira las unidades de k."], ["Unidades L·mol⁻¹·s⁻¹ corresponden a (mol/L)^(1−n)·s⁻¹ con 1 − n = −1.", "n = 2."], "Orden total 2");
  op("b11", 2, "Mecanismo: etapa 1 (lenta) A + B → X + C ; etapa 2 (rápida) X + B → D. ¿Cuál es la reacción global y la ley de velocidad?", "Global y ley",
    ["A + 2 B → C + D ; v = k[A][B]", "A + B → C + D ; v = k[A][B]", "A + 2 B → C + D ; v = k[X][B]", "A + 2 B → C + D ; v = k[A][B]²"], 0,
    ["Suma las etapas y cancela el intermedio. La ley sale de la etapa lenta."], ["Suma: A + B + X + B → X + C + D → A + 2 B → C + D (X se cancela).", "Etapa lenta (bimolecular): v = k[A][B]."], "A + 2 B → C + D ; v = k[A][B]");
  nu("b12", 2, "Para v = k·[A]²·[B], la concentración de A se duplica y la de B se reduce a la mitad. ¿Por qué factor se multiplica v?", "Factor =", 2,
    ["Multiplica los factores de cada reactivo."], ["A: 2² = 4. B: (1/2)¹ = 0,5.", "Total: 4 · 0,5 = 2."], "×2");
  op("b13", 2, "Dos reacciones tienen la misma Eₐ(directa). La reacción 1 es muy exotérmica (ΔH = −120 kJ/mol) y la reacción 2 es poco exotérmica (ΔH = −10 kJ/mol). ¿Cuál tiene mayor Eₐ en el sentido inverso?", "Mayor Eₐ inversa", ["La reacción 1", "La reacción 2", "Es igual en ambas", "No se puede saber"], 0,
    ["Eₐ(inv) = Eₐ(dir) − ΔH."], ["Eₐ(inv) = Eₐ(dir) + 120 en la reacción 1 y Eₐ(dir) + 10 en la 2.", "La 1 tiene los productos mucho más abajo: la barrera hacia atrás es mayor."], "La reacción 1");
  op("b14", 2, "¿Cuál de estos cambios modifica la constante de velocidad de una reacción?", "Modifica k", ["Subir la temperatura", "Aumentar la presión parcial del reactivo", "Pulverizar el reactivo sólido", "Agitar la mezcla"], 0,
    ["Mira qué cambia en Arrhenius."], ["k = A·e^(−Eₐ/RT) depende de T (y de Eₐ).", "Los demás cambios modifican la velocidad pero no la constante."], "Subir la temperatura");
  nu("b15", 2, "Una reacción de primer orden tiene k = 0,0231 s⁻¹. Calcula su vida media (el tiempo en que la concentración se reduce a la mitad), t½ = ln 2 / k.", "t½ (s) =", 30,
    ["ln 2 = 0,693."], ["t½ = 0,693/0,0231 = 30 s.", "En un primer orden t½ no depende de la concentración inicial."], "30 s", 0.01);
  nu("b16", 2, "Para v = k·[A] con k = 2,0·10⁻³ s⁻¹, calcula v cuando [A] = 0,50 mol/L (mol·L⁻¹·s⁻¹).", "v (mol/(L·s)) =", 1.0e-3,
    ["Primer orden: v = k[A]."], ["v = 2,0·10⁻³ · 0,50 = 1,0·10⁻³ mol·L⁻¹·s⁻¹."], "1,0·10⁻³ mol·L⁻¹·s⁻¹");

  // ---------------- ★★★ ----------------
  ge("c1", 3, "EvAU. Para A + B → C se obtuvieron las velocidades iniciales: (1) [A] = 0,10 y [B] = 0,10 mol/L, v₀ = 2,0·10⁻⁴; (2) [A] = 0,30 y [B] = 0,10, v₀ = 1,8·10⁻³; (3) [A] = 0,10 y [B] = 0,20, v₀ = 4,0·10⁻⁴; (4) [A] = 0,20 y [B] = 0,30, v₀ = 2,4·10⁻³ (mol·L⁻¹·s⁻¹). Halla el orden de A, el de B y k (en L²·mol⁻²·s⁻¹).",
    [N("Orden de A =", 2), N("Orden de B =", 1), N("k =", 0.20)],
    ["Para A usa (1)→(2); para B usa (1)→(3). Comprueba con (4)."], ["(1)→(2): [A] ×3 y v ×9 → n = 2. (1)→(3): [B] ×2 y v ×2 → m = 1.", "k = 2,0·10⁻⁴/(0,10² · 0,10) = 0,20 L²·mol⁻²·s⁻¹.", "Comprobación con (4): 0,20 · 0,20² · 0,30 = 2,4·10⁻³ ✓."], "n = 2, m = 1, k = 0,20 L²·mol⁻²·s⁻¹");
  ge("c2", 3, "EvAU. Para A + B → productos: (1) [A] = 0,50 y [B] = 0,10 mol/L, v₀ = 8,0·10⁻⁴; (2) [A] = 1,00 y [B] = 0,10, v₀ = 8,0·10⁻⁴; (3) [A] = 0,50 y [B] = 0,30, v₀ = 7,2·10⁻³ (mol·L⁻¹·s⁻¹). Halla los órdenes de A y de B, la constante k (L·mol⁻¹·s⁻¹) y la velocidad cuando [B] = 0,25 mol/L.",
    [N("Orden de A =", 0), N("Orden de B =", 2), N("k =", 0.080), N("v (mol/(L·s)) =", 0.0050)],
    ["En (1)→(2) la velocidad no cambia."], ["(1)→(2): [A] ×2 y v ×1 → n = 0 (A no aparece en la ley).", "(1)→(3): [B] ×3 y v ×9 → m = 2.", "v = k[B]² → k = 8,0·10⁻⁴/0,10² = 0,080 L·mol⁻¹·s⁻¹ (orden total 2).", "v = 0,080 · 0,25² = 5,0·10⁻³ mol·L⁻¹·s⁻¹."], "n = 0, m = 2, k = 0,080, v = 5,0·10⁻³");
  nu("c3", 3, "La constante de velocidad de una reacción es 2,0·10⁻⁵ s⁻¹ a 298 K y 8,0·10⁻⁵ s⁻¹ a 318 K. Calcula la energía de activación en kJ/mol.", "Eₐ (kJ/mol) =", 54.6,
    ["k₂/k₁ = 4."], ["ln 4 = 1,386 ; (1/298 − 1/318) = 2,1105·10⁻⁴ K⁻¹.", "Eₐ = 8,314 · 1,386/2,1105·10⁻⁴ = 5,46·10⁴ J/mol = 54,6 kJ/mol."], "54,6 kJ/mol", 0.01);
  nu("c4", 3, "Una reacción tiene Eₐ = 80 kJ/mol. ¿A qué temperatura (en K) hay que llevarla desde 300 K para que su constante de velocidad se triplique? (R = 8,314 J/(mol·K))", "T₂ (K) =", 310.6,
    ["ln 3 = (Eₐ/R)(1/300 − 1/T₂); despeja 1/T₂."], ["ln 3 = 1,0986 ; Eₐ/R = 80 000/8,314 = 9 622 K.", "1/T₂ = 1/300 − 1,0986/9 622 = 0,0033333 − 0,00011417 = 0,0032191 K⁻¹.", "T₂ = 310,6 K (solo unos 10 K más)."], "310,6 K", 0.005);
  nu("c5", 3, "Un catalizador reduce Eₐ de 100 a 70 kJ/mol. Suponiendo el mismo factor A, ¿cuántas veces aumenta k a 350 K? (R = 8,314 J/(mol·K))", "k_cat / k =", 3.0e4,
    ["k_cat/k = e^(ΔEₐ/RT)."], ["ΔEₐ = 30 000 J/mol.", "30 000/(8,314 · 350) = 10,31.", "e^10,31 = 3,0·10⁴."], "≈ 3,0·10⁴ veces", 0.02);
  nu("c6", 3, "Una reacción tiene ΔH = −80 kJ/mol y Eₐ(directa) = 120 kJ/mol. Con un catalizador, Eₐ(inversa) pasa a ser 150 kJ/mol. ¿Cuánto vale Eₐ(directa) con catalizador (kJ/mol)?", "Eₐ directa con cat. (kJ/mol) =", 70,
    ["ΔH no cambia con el catalizador: Eₐ(dir) = Eₐ(inv) + ΔH."], ["Eₐ(dir, cat) = Eₐ(inv, cat) + ΔH = 150 + (−80) = 70 kJ/mol.", "Sin catalizador: Eₐ(inv) = 120 + 80 = 200; la rebaja es de 50 kJ/mol en ambos sentidos (200 → 150 y 120 → 70)."], "70 kJ/mol");
  nu("c7", 3, "Mecanismo: (1) NO₂ + F₂ → NO₂F + F (lenta); (2) NO₂ + F → NO₂F (rápida). Si se triplica [NO₂] y se duplica [F₂], ¿por qué factor se multiplica la velocidad?", "Factor =", 6,
    ["Escribe la ley de la etapa lenta."], ["Etapa lenta bimolecular: v = k[NO₂][F₂].", "Factor: 3¹ · 2¹ = 6."], "×6");
  nu("c8", 3, "Una reacción con Eₐ = 75 kJ/mol se calienta de 298 K a 308 K. ¿Por qué factor aumenta la constante de velocidad?", "k₂ / k₁ =", 2.67,
    ["Arrhenius con dos temperaturas."], ["(75 000/8,314)(1/298 − 1/308) = 9 021 · 1,0895·10⁻⁴ = 0,9829.", "e^0,9829 = 2,67."], "×2,67", 0.01);
  ge("c9", 3, "Una reacción de primer orden respecto a A tiene [A]₀ = 0,500 mol/L; a los 20 s quedan 0,300 mol/L. Calcula k (s⁻¹, de ln[A] = ln[A]₀ − kt) y la concentración a los 50 s (mol/L).",
    [N("k (s⁻¹) =", 0.02554, 0.01), N("[A] a 50 s (mol/L) =", 0.1394, 0.01)],
    ["ln([A]₀/[A]) = kt."], ["k = ln(0,500/0,300)/20 = 0,5108/20 = 0,02554 s⁻¹.", "[A] = 0,500 · e^(−0,02554 · 50) = 0,500 · e^(−1,277) = 0,139 mol/L."], "k = 2,55·10⁻² s⁻¹ ; [A] = 0,139 mol/L");
  nu("c10", 3, "La reacción 2 NO(g) + O₂(g) → 2 NO₂(g) tiene como ley experimental v = k·[NO]²·[O₂]. Si el volumen del recipiente se reduce a la tercera parte (misma T), ¿por qué factor se multiplica la velocidad?", "Factor =", 27,
    ["Todas las concentraciones se triplican."], ["Concentraciones ×3.", "Orden total 3 → 3³ = 27."], "×27");
  ge("c11", 3, "En 2 A → 3 B la concentración de B aumenta a razón de 0,045 mol·L⁻¹·s⁻¹ en un instante dado. Calcula la velocidad de reacción y la velocidad de desaparición de A. Si la reacción es de primer orden respecto a A con [A] = 0,30 mol/L en ese instante, calcula k (s⁻¹).",
    [N("v (mol/(L·s)) =", 0.015), N("Desaparición de A (mol/(L·s)) =", 0.030), N("k (s⁻¹) =", 0.050)],
    ["Divide entre 3 para v; multiplica por 2 para A."], ["v = 0,045/3 = 0,015 mol·L⁻¹·s⁻¹.", "Desaparición de A: 2 · 0,015 = 0,030 mol·L⁻¹·s⁻¹.", "v = k[A] → k = 0,015/0,30 = 0,050 s⁻¹."], "v = 0,015 ; −Δ[A]/Δt = 0,030 ; k = 0,050 s⁻¹");
  nu("c12", 3, "Una reacción tiene k = 3,0·10⁻³ s⁻¹ a 20 °C y Eₐ = 65 kJ/mol. Calcula k a 40 °C (s⁻¹). (T en K = °C + 273.)", "k a 40 °C (s⁻¹) =", 0.0165,
    ["Pasa a kelvin: 293 K y 313 K."], ["(65 000/8,314)(1/293 − 1/313) = 7 818 · 2,1807·10⁻⁴ = 1,705.", "k₂/k₁ = e^1,705 = 5,50 ; k₂ = 5,50 · 3,0·10⁻³ = 1,65·10⁻² s⁻¹."], "1,65·10⁻² s⁻¹", 0.01);
  op("c13", 3, "Un estudiante propone para 2 NO₂ + F₂ → 2 NO₂F la ley v = k[NO₂]²[F₂] por los coeficientes. Experimentalmente la ley es v = k[NO₂][F₂]. ¿Cuál es la conclusión correcta?", "Conclusión",
    ["Los coeficientes no dan los órdenes; la reacción transcurre por un mecanismo cuya etapa lenta tiene un solo NO₂", "El experimento está mal hecho", "La reacción es elemental", "El F₂ es un catalizador"], 0,
    ["Piensa en reacciones elementales frente a mecanismos."], ["Si la global fuese una sola etapa, los órdenes serían 2 y 1.", "El orden experimental distinto demuestra que hay varias etapas y la lenta no incluye dos NO₂."], "No es elemental");
  nu("c14", 3, "Al representar ln k frente a 1/T para una reacción se obtiene una recta de pendiente −7,2·10³ K. Calcula Eₐ en kJ/mol.", "Eₐ (kJ/mol) =", 59.9,
    ["pendiente = −Eₐ/R."], ["Eₐ = −pendiente · R = 7 200 · 8,314 = 59 861 J/mol.", "Eₐ = 59,9 kJ/mol."], "59,9 kJ/mol", 0.01);
  nu("c15", 3, "A 320 K una reacción tiene k = 5,4·10⁻³ s⁻¹ y Eₐ = 60 kJ/mol. Calcula el factor de frecuencia A (s⁻¹).", "A (s⁻¹) =", 3.36e7,
    ["A = k·e^(Eₐ/RT)."], ["Eₐ/RT = 60 000/(8,314 · 320) = 22,55.", "e^22,55 = 6,23·10⁹ ; A = 5,4·10⁻³ · 6,23·10⁹ = 3,4·10⁷ s⁻¹."], "3,4·10⁷ s⁻¹", 0.02);
  op("c16", 3, "El perfil de una reacción muestra que los productos están por encima de los reactivos y que la reacción inversa tiene menor Eₐ que la directa. Si se añade un catalizador…", "Con catalizador",
    ["Disminuyen las dos Eₐ en la misma cantidad; ΔH sigue siendo positivo", "Solo disminuye la Eₐ directa", "ΔH pasa a ser negativo", "La reacción pasa a ser exotérmica"], 0,
    ["El catalizador no cambia los niveles de reactivos y productos."], ["Los niveles de reactivos y productos son los mismos: ΔH no cambia.", "El camino nuevo baja la barrera en ambos sentidos en la misma cantidad."], "Bajan las dos Eₐ por igual; ΔH igual");

  var ejercicios = E;

  // ================================================================
  //  LÁMINAS
  // ================================================================
  var lamina = [
    { titulo: "Ecuación de velocidad y orden",
      items: [
        { label: "Velocidad de reacción", formula: "v = −(1/a)Δ[A]/Δt = (1/c)Δ[C]/Δt", cuando: "Pasar de una especie a otra.", ejemplo: "NH₃: 0,012 → v = 0,0060 mol·L⁻¹·s⁻¹ (÷ 2)." },
        { label: "Ley de velocidad", formula: "v = k[A]ⁿ[B]ᵐ", cuando: "Los órdenes se miden.", ejemplo: "Duplicar [A] con n = 2 → ×4." },
        { label: "Orden desde dos experimentos", formula: "F = fⁿ", cuando: "Solo cambia un reactivo.", ejemplo: "f = 3, F = 9 → n = 2." }
      ],
      nota: "Unidades de k: orden 1 → s⁻¹ · orden 2 → L·mol⁻¹·s⁻¹ · orden 3 → L²·mol⁻²·s⁻¹." },
    { titulo: "Eₐ, ΔH y catalizador", ancha: true,
      tabla: { cab: ["Magnitud", "Sin catalizador", "Con catalizador"], filas: [
        ["Eₐ (directa)", "mayor", "menor"],
        ["Eₐ (inversa)", "mayor", "menor (en la misma cantidad)"],
        ["ΔH", "Eₐ(dir) − Eₐ(inv)", "no cambia"],
        ["k y v", "menores", "mayores"],
        ["K y rendimiento", "—", "no cambian"]
      ] },
      nota: "Eₐ(inversa) = Eₐ(directa) − ΔH. Subir T también acelera, pero por otra vía: más partículas con E ≥ Eₐ." },
    { titulo: "Arrhenius",
      items: [
        { label: "Forma exponencial", formula: "k = A·e^(−Eₐ/RT)", cuando: "A tiene las unidades de k.", ejemplo: "R = 8,314 J·mol⁻¹·K⁻¹." },
        { label: "Forma lineal", formula: "ln k = ln A − (Eₐ/R)(1/T)", cuando: "Gráfica ln k frente a 1/T.", ejemplo: "Pendiente = −Eₐ/R." },
        { label: "Dos temperaturas", formula: "ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂)", cuando: "Calcular k₂ o Eₐ.", ejemplo: "Eₐ = 60 kJ/mol, 300 → 320 K: ×4,5." }
      ],
      nota: "T en kelvin, Eₐ en J/mol. Si sale Eₐ &lt; 0 o k₂ &lt; k₁ con T₂ &gt; T₁, revisa el signo." },
    { titulo: "Mecanismos de reacción",
      pasos: ["Suma las etapas: debe dar la <b>reacción global</b> (se cancelan los intermedios).", "La <b>etapa lenta</b> (mayor Eₐ) fija la ley de velocidad.", "Escribe la ley de esa etapa con los coeficientes como órdenes.", "<b>Intermedio</b>: se forma y se consume. <b>Catalizador</b>: se consume y se regenera.", "<b>Molecularidad</b> = partículas en una etapa (1, 2…); el orden global se mide."],
      nota: "Un mecanismo se descarta si no suma la global o si su ley no coincide con la experimental." },
    { titulo: "Errores típicos del tema", ancha: true,
      errores: [
        { mal: "Orden = suma de coeficientes", bien: "Los órdenes se miden (o salen de la etapa lenta)", por: "Solo en una reacción elemental coinciden." },
        { mal: "Al subir [A] sube k", bien: "Sube v; k no cambia", por: "k solo depende de T y del catalizador." },
        { mal: "El catalizador desplaza el equilibrio", bien: "Lo alcanza antes; K igual", por: "Baja Eₐ directa e inversa por igual." },
        { mal: "Muy exotérmica = muy rápida", bien: "ΔH y Eₐ son independientes", por: "Mira la altura de la barrera." },
        { mal: "v de reacción = Δ[producto]/Δt", bien: "Dividir entre el coeficiente", por: "La v de reacción es única." },
        { mal: "Arrhenius con °C o kJ", bien: "T en K y Eₐ en J/mol", por: "Con R = 8,314 J/(mol·K)." },
        { mal: "Molecularidad de la global", bien: "Solo se define para etapas elementales", por: "El orden global es experimental." }
      ] }
  ];

  B.registrar("quimica2", "t5", { resumen: resumen, secciones: B.parte.q2t5a.secciones, nuevas: B.parte.q2t5b.nuevas, datos: datos, ejercicios: ejercicios, lamina: lamina });
})(window);
